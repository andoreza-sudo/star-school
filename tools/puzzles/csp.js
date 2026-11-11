'use strict';
// Small constraint solver for grid puzzles (P3-02, BRAIN_TEASERS 6). Dev-time only: never shipped in the app.
// Used by the sudoku generator now, and meant for MathDoku (P3-04) and any other "fill cells with values" puzzle.
//
// A problem is plain data:
//   {
//     n:      number of cells (cells are 0..n-1; for a grid, cell = row * width + col)
//     size:   number of values; cell values are 1..size (at most 30)
//     groups: [[cell, ...], ...]   all-different groups: rows, columns, boxes, jigsaw regions. A group with exactly `size`
//             cells is a "house": it must hold every value once, which also enables hidden-single propagation.
//     cons:   [{cells:[cell, ...], test(vals)}, ...]   custom constraints (MathDoku cages, sums, comparisons).
//             vals[k] is the value of cells[k]. test() must return true when the values satisfy the constraint.
//             The solver enumerates the cells' current candidates to prune (generalized arc consistency) while the
//             product of their candidate counts is at most `enumLimit` (default 4096), so test() then only ever sees
//             full assignments. Above that limit it calls test() with 0 for unassigned cells; it must then return
//             false only when no completion can work (returning true when unsure is fine).
//     givens: optional array of n values, 0 = empty
//     dom:    optional array of n candidate bitmasks (bit v-1 = value v allowed); default all values
//     enumLimit: optional, see cons
//   }
//
// Calls (each takes the problem; options are optional):
//   countSolutions(p, limit = 2, {stats})  -> number of solutions, stopping at `limit` (2 is enough to prove uniqueness)
//   solve(p, {rng})                        -> first solution as an array of n values (1..size), or null. With rng (see
//                                             rng.js) candidate values are tried in random order: a random full grid.
//   solutions(p, limit = 10)               -> up to `limit` solutions
//   stats: pass {} and read stats.nodes (search nodes) afterwards: a difficulty score with propagation only
// Helpers:
//   sudokuGroups(N, bw, bh) -> rows, columns, then boxes of bw columns x bh rows (N x N grid)
//   latinGroups(N)          -> rows, then columns
//   pop(mask), bits(mask)   -> number of set bits, list of values (1-based) in a mask
//
// Propagation at every search node: an assigned value is removed from every peer (cells sharing a group); a cell left with
// one candidate is assigned; in a house, a value with one possible cell is assigned there (hidden single); custom
// constraints prune by enumeration. Search picks the unassigned cell with the fewest candidates (lowest index on ties).

const pop = m => {
  let c = 0;
  while (m) {
    m &= m - 1;
    c++;
  }
  return c;
};
const lowBit = m => m & -m;
const bitIndex = b => 31 - Math.clz32(b); // index of a single-bit mask
const bits = m => {
  const out = [];
  for (let v = 1; m; v++, m >>>= 1) if (m & 1) out.push(v);
  return out;
};

function sudokuGroups(N, bw, bh) {
  const g = [];
  for (let r = 0; r < N; r++) g.push(Array.from({length: N}, (_, c) => r * N + c));
  for (let c = 0; c < N; c++) g.push(Array.from({length: N}, (_, r) => r * N + c));
  for (let br = 0; br < N; br += bh) {
    for (let bc = 0; bc < N; bc += bw) {
      const box = [];
      for (let r = br; r < br + bh; r++) for (let c = bc; c < bc + bw; c++) box.push(r * N + c);
      g.push(box);
    }
  }
  return g;
}

function latinGroups(N) {
  return sudokuGroups(N, N, 1).slice(0, 2 * N);
}

// Precompute peers, houses and constraint lookups once per problem (cached on the problem object as _csp).
function compile(p) {
  if (p._csp) return p._csp;
  const n = p.n;
  const size = p.size;
  if (!(size >= 1 && size <= 30)) throw new Error('csp: size must be 1..30');
  const full = size === 30 ? 0x3fffffff : (1 << size) - 1;
  const groups = p.groups || [];
  const peerSets = Array.from({length: n}, () => new Set());
  for (const g of groups) for (const a of g) for (const b of g) if (a !== b) peerSets[a].add(b);
  const peers = peerSets.map(s => Int32Array.from([...s].sort((a, b) => a - b)));
  const houses = groups.filter(g => g.length === size).map(g => Int32Array.from(g));
  const cons = (p.cons || []).map(c => {
    // pairs of cells inside the constraint that are peers: enumeration skips equal values there
    const cells = c.cells;
    const peerIn = cells.map((a, i) => cells.slice(0, i).map((b, j) => (peerSets[a].has(b) ? j : -1)).filter(j => j >= 0));
    return {cells, test: c.test, peerIn};
  });
  const consOf = Array.from({length: n}, () => []);
  cons.forEach((c, k) => c.cells.forEach(cell => consOf[cell].push(k)));
  p._csp = {n, size, full, peers, houses, cons, consOf, enumLimit: p.enumLimit || 4096};
  return p._csp;
}

// Prune one custom constraint. Returns false on contradiction. Narrowed cells that become single go on the queue.
function pruneCon(m, con, dom, val, queue) {
  const cells = con.cells;
  const k = cells.length;
  let product = 1;
  for (let i = 0; i < k; i++) product *= pop(dom[cells[i]]);
  if (product === 0) return false;
  const vals = new Array(k).fill(0);
  if (product > m.enumLimit) {
    for (let i = 0; i < k; i++) vals[i] = val[cells[i]];
    return !!con.test(vals);
  }
  const support = new Array(k).fill(0);
  const rec = i => {
    if (i === k) {
      if (con.test(vals)) for (let j = 0; j < k; j++) support[j] |= 1 << (vals[j] - 1);
      return;
    }
    let d = dom[cells[i]];
    while (d) {
      const b = lowBit(d);
      d ^= b;
      const v = bitIndex(b) + 1;
      let clash = false;
      for (const j of con.peerIn[i]) if (vals[j] === v) clash = true;
      if (clash) continue;
      vals[i] = v;
      rec(i + 1);
    }
    vals[i] = 0;
  };
  rec(0);
  for (let j = 0; j < k; j++) {
    const c = cells[j];
    const nd = dom[c] & support[j];
    if (!nd) return false;
    if (nd !== dom[c]) {
      dom[c] = nd;
      if (pop(nd) === 1 && !val[c]) queue.push(c);
    }
  }
  return true;
}

// Run propagation to a fixpoint. queue holds cells whose domain is a single value but that are not yet assigned.
function propagate(m, dom, val, queue) {
  const touched = new Set();
  for (;;) {
    while (queue.length) {
      const c = queue.pop();
      if (val[c]) continue;
      const d = dom[c];
      if (pop(d) !== 1) return false;
      val[c] = bitIndex(d) + 1;
      const ps = m.peers[c];
      for (let i = 0; i < ps.length; i++) {
        const q = ps[i];
        if (!(dom[q] & d)) continue;
        if (val[q]) return false;
        const nd = dom[q] & ~d;
        if (!nd) return false;
        dom[q] = nd;
        if (pop(nd) === 1) queue.push(q);
      }
      for (const k of m.consOf[c]) touched.add(k);
    }
    if (touched.size) {
      const list = [...touched];
      touched.clear();
      for (const k of list) if (!pruneCon(m, m.cons[k], dom, val, queue)) return false;
      if (queue.length) continue;
    }
    // hidden singles in houses
    for (const h of m.houses) {
      let once = 0;
      let twice = 0;
      for (let i = 0; i < h.length; i++) {
        const d = dom[h[i]];
        twice |= once & d;
        once |= d;
      }
      if (once !== m.full) return false;
      let uniq = once & ~twice;
      while (uniq) {
        const b = lowBit(uniq);
        uniq ^= b;
        for (let i = 0; i < h.length; i++) {
          const c = h[i];
          if (!(dom[c] & b)) continue;
          if (dom[c] !== b) {
            dom[c] = b;
            queue.push(c);
          }
          break;
        }
      }
    }
    if (!queue.length) return true;
  }
}

// Initial state: domains from p.dom and p.givens (read on every call, so a generator may change givens between calls on
// the same problem object; the groups and cons must not change), everything single propagated. Null when they contradict.
function start(m, p) {
  const dom = new Int32Array(m.n);
  for (let i = 0; i < m.n; i++) {
    let d = p.dom ? p.dom[i] & m.full : m.full;
    const g = p.givens ? p.givens[i] : 0;
    if (g) d &= 1 << (g - 1);
    dom[i] = d;
  }
  const val = new Int8Array(m.n);
  const queue = [];
  for (let i = 0; i < m.n; i++) if (pop(dom[i]) === 1) queue.push(i);
  for (let i = 0; i < m.n; i++) if (!dom[i]) return null;
  // constraints with no assigned cell yet still prune once at the start
  for (const con of m.cons) if (!pruneCon(m, con, dom, val, queue)) return null;
  if (!propagate(m, dom, val, queue)) return null;
  return {dom, val};
}

// Depth-first search. onSolution(val) returns true to stop.
function search(m, dom, val, opts, onSolution) {
  if (opts.stats) opts.stats.nodes = (opts.stats.nodes || 0) + 1;
  let best = -1;
  let bc = 99;
  for (let i = 0; i < m.n; i++) {
    if (val[i]) continue;
    const pc = pop(dom[i]);
    if (pc < bc) {
      bc = pc;
      best = i;
      if (pc === 2) break;
    }
  }
  if (best < 0) return onSolution(val);
  const choices = bits(dom[best]);
  if (opts.rng) opts.rng.shuffle(choices);
  for (const v of choices) {
    const d2 = Int32Array.from(dom);
    const v2 = Int8Array.from(val);
    d2[best] = 1 << (v - 1);
    if (propagate(m, d2, v2, [best]) && search(m, d2, v2, opts, onSolution)) return true;
  }
  return false;
}

function countSolutions(p, limit = 2, opts = {}) {
  const m = compile(p);
  const s = start(m, p);
  if (!s) return 0;
  let count = 0;
  search(m, s.dom, s.val, opts, () => ++count >= limit);
  return count;
}

function solutions(p, limit = 10, opts = {}) {
  const m = compile(p);
  const s = start(m, p);
  const out = [];
  if (!s) return out;
  search(m, s.dom, s.val, opts, v => {
    out.push(Array.from(v));
    return out.length >= limit;
  });
  return out;
}

function solve(p, opts = {}) {
  return solutions(p, 1, opts)[0] || null;
}

module.exports = {countSolutions, solutions, solve, sudokuGroups, latinGroups, pop, bits};
