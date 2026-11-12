'use strict';
// Robot Path worlds for bands C and D: templates, layout, the exact shortest-program search and the bank builder
// (P3-13, BRAIN_TEASERS 5.8). Dev-time only. Run through build-banks.js: `node tools/puzzles/build-banks.js robot` writes
// src/data/d-puz-robot.js. Bands A and B need no bank: their worlds are made at run time (src/js/81-bt-robot.js, a BFS over cells).
//
// Why a bank for C and D: a C or D world's par is the fewest blocks of ANY program that reaches the goal, loops included. Finding
// it needs the search below (tens of milliseconds to a second per world on a desktop), far too heavy for a tablet, so the worlds are
// made and proven here (BRAIN_TEASERS 1, "no heavy search at runtime"; decision A8). The app turns and mirrors them at run time.
//
// A world is a corridor: an n x n grid (C 6x6, D 8x8) where only the cells of one path from the start to the goal are open
// (everything else is a wall block), and no two path cells touch unless they follow each other on the path, so the robot can only
// drive along it.
//
// Templates (each gives the path as moves F, L, R and the program a child would write, the "intended" program):
//   C line       F x 5 (level 2: the robot starts turned away)     repeat 5 [forward]
//   C turn       F x a, turn, F x b                                repeat a [forward], turn, repeat b [forward]
//                                                                  (level 6, b <= a: repeat 2 [repeat a [forward], turn])
//   C ring       3 or 4 sides of a square                          repeat k [repeat s [forward], turn]
//   C stairs     (F x r, turn, F x u, turn back) x n               repeat n [forward x r, turn, forward x u, turn back]
//                (level 5: maybe a first turn; levels 8-9: a run or a rise of 2)
//   C stairsRun  stairs, then a straight run                       repeat n [...], repeat m [forward]
//   C rect       a, turn, b, turn, a                               repeat 2 [repeat a [forward], turn, repeat b [forward], turn]
//   D ringU      3 or 4 sides of a rectangle (sides differ)        repeat k [repeat until wall [forward], turn]
//   D spiral     a square spiral inward, one wall between rings    repeat k [repeat until wall [forward], turn]
//   D stairsU    runs of 1-3 that differ, rises of 1               repeat n [repeat until wall [forward], turn, forward, turn back]
//                (level 9: the robot starts turned away, one turn first)
//   D hills      stairs a, a straight bit m, stairs c > a          function [forward, turn, forward, turn back];
//                                                                  repeat a [function], forward x m, repeat c [function]
//                (level 12: the robot starts turned away, one turn first)
// Each band D level adds one block to forward, turns and repeat (the "kit", stored with the world): levels 1-9 "repeat until wall",
// levels 10-12 the function. One at a time on purpose: with "repeat until wall" a robot can follow almost any corridor in 6-8
// blocks by spinning tricks (the search finds them), so the function would never be needed next to it.
// A world is kept only when the search proves the intended program is a shortest one (so par = its blocks, and solve() and the
// hints follow a program a child would write), when no program of plain blocks fits the slots (a loop is required; slots = par + 2
// in C, par + 1 in D) and, on a function level, when every program without the function is longer.
//
// Blocks and the rules the app enforces (the search follows exactly the same rules):
//   forward, turn left, turn right; repeat N [ ] (N 2-9); repeat until wall [ ] (D: the body runs while the cell ahead is open,
//   at most 40 times, more is "dizzy", a failed run); the function (D: one, its body holds only forward and turns, up to 4 blocks;
//   a call is one block). Only the blocks of the world's kit are offered. Loops nest two deep at most. The run stops with a win the moment the robot reaches the goal; it fails
//   when the robot bumps into a wall or the edge, or the program ends somewhere else. Blocks counted: every block once (a loop
//   is one block plus its body; the function's body counts once, each call one).
//
// The search (shortest program, exact under those rules): states are (open cell, facing); the effect of a piece of program is a
// table state -> state, "win" or "crash". Effects are built bottom-up by cost and kept once each (cheapest first): Q0 = loop-free
// sequences, L1 = loops whose body is in Q0, Q1 = sequences of blocks and L1 loops, L2 = loops whose body is in Q1. A program is
// a sequence of top-level blocks, so its shortest length is a shortest path from the start state over the edges "one block or
// loop of L2 (which contains L1)" (Dijkstra with integer costs). The function: a call that appears once can be replaced by its
// body (one block cheaper, and plain bodies keep the nesting), so a function only helps when called twice or more; every plain
// body of 2-4 blocks (by effect) is tried as an extra one-block command.
//
// Bank: PUZ.robot[band] = [36 worlds], 3 per level in level order (BRAIN_TEASERS 7: steps, shortest to longest). A world is
//   'n|cells|start|facing|goal|par|kit|main|fn|template': cells n*n characters ('.' open, '#' wall) in reading order; facing
//   0 up, 1 right, 2 down, 3 left; kit '' (C), 'u' or 'f'; main and fn the intended program as space-separated tokens (fw tl tr,
//   r2..r9 repeat N, uw until wall, en end of a loop, fn call the function).
//
// Exports: search(world, opts), loopFree(world, fn), run(world, prog), cost(prog), layout(...), makeWorld(band, tpl, r),
//          buildBank(seed, log), fileText(bank, seed), encode(w), decode(str), PER_BAND, PLAN

const {rng: makeRng} = require('./rng');

const DX = [0, 1, 0, -1], DY = [-1, 0, 1, 0];
const PER_BAND = 36;
const UW_CAP = 40; // "repeat until wall" runs its body at most this often; more is a failed run
const FN_MAX = 4; // blocks in the function's body

// ---- programs as flat tokens ----
const isLoop = t => /^r[2-9]$/.test(t) || t == 'uw';
const cost = prog => [...prog.m, ...(prog.f || [])].filter(t => t != 'en').length;
// tokens -> tree [{t} | {loop: N (0 = until), b: [...]}]
function parse(tokens) {
  const root = [], stack = [root];
  for (const t of tokens) {
    if (isLoop(t)) {
      const node = {loop: t == 'uw' ? 0 : +t[1], b: []};
      stack[stack.length - 1].push(node);
      stack.push(node.b);
    } else if (t == 'en') {
      if (stack.length < 2) throw new Error('unbalanced end');
      stack.pop();
    } else stack[stack.length - 1].push({t});
  }
  if (stack.length != 1) throw new Error('unclosed loop');
  return root;
}
// tree (as the search returns it) -> tokens
function flat(seq, out = []) {
  for (const s of seq) {
    if (typeof s == 'string') out.push(s);
    else { out.push(s.n ? 'r' + s.n : 'uw'); flat(s.b, out); out.push('en'); }
  }
  return out;
}

// ---- the simulator (the same rules as RB.run in src/js/81-bt-robot.js) ----
function front(w, c, d) {
  const n = w.n, x = c % n + DX[d], y = Math.floor(c / n) + DY[d];
  if (x < 0 || y < 0 || x >= n || y >= n) return -1;
  const k = y * n + x;
  return w.cells[k] == '.' ? k : -1;
}
// -> {out: 'win' | 'bump' | 'short' | 'dizzy', c, d, steps}
function run(w, prog) {
  const st = {c: w.s, d: w.d, steps: 0, out: null};
  const fn = parse(prog.f || []);
  const exec = seq => {
    for (const s of seq) {
      if (st.out) return;
      if (s.t == 'fn') { exec(fn); continue; }
      if (s.t) {
        if (++st.steps > 1000) { st.out = 'dizzy'; return; }
        if (s.t == 'tl') st.d = (st.d + 3) % 4;
        else if (s.t == 'tr') st.d = (st.d + 1) % 4;
        else {
          const k = front(w, st.c, st.d);
          if (k < 0) { st.out = 'bump'; return; }
          st.c = k;
          if (k == w.g) { st.out = 'win'; return; }
        }
      } else if (s.loop) {
        for (let i = 0; i < s.loop && !st.out; i++) exec(s.b);
      } else if (s.b.length) {
        for (let i = 0; !st.out && front(w, st.c, st.d) >= 0; i++) {
          if (i >= UW_CAP) { st.out = 'dizzy'; return; }
          exec(s.b);
        }
      }
    }
  };
  exec(parse(prog.m));
  return {out: st.out || 'short', c: st.c, d: st.d, steps: st.steps};
}

// ---- the search ----
// opts: {K: most blocks to look for, until: bool, fn: bool (the function may be used), loops: bool (default true)}
// -> {cost, m: tokens, f: tokens} of a shortest program with at most K blocks, or null
function search(w, opts) {
  const n = w.n, open = [];
  for (let c = 0; c < n * n; c++) if (w.cells[c] == '.') open.push(c);
  const id = new Int16Array(n * n).fill(-1);
  open.forEach((c, i) => { id[c] = i; });
  const NX = open.length * 4, CR = -1, WIN = -2;
  const FR = new Int8Array(NX), fw = new Int16Array(NX), tl = new Int16Array(NX), tr = new Int16Array(NX), ident = new Int16Array(NX);
  for (let i = 0; i < NX; i++) {
    const c = open[i >> 2], d = i & 3, k = front(w, c, d);
    FR[i] = k < 0 ? 0 : 1;
    fw[i] = k < 0 ? CR : k == w.g ? WIN : (id[k] << 2) | d;
    tl[i] = (i & ~3) | ((d + 3) & 3);
    tr[i] = (i & ~3) | ((d + 1) & 3);
    ident[i] = i;
  }
  const comp = (a, b) => { // a then b; null when it crashes from every state
    const e = new Int16Array(NX);
    let live = false;
    for (let i = 0; i < NX; i++) { const v = a[i], x = v < 0 ? v : b[v]; e[i] = x; if (x != CR) live = true; }
    return live ? e : null;
  };
  const until = b => {
    const e = new Int16Array(NX);
    let live = false;
    for (let i = 0; i < NX; i++) {
      let x = i, it = 0;
      while (x >= 0 && FR[x] && it < UW_CAP) { x = b[x]; it++; }
      if (x >= 0 && FR[x]) x = CR;
      e[i] = x;
      if (x != CR) live = true;
    }
    return live ? e : null;
  };
  const key = e => Buffer.from(e.buffer).toString('latin1');
  // sequences of statements [cost, effect, tree] up to Kmax, each effect once at its lowest cost
  const seqs = (stmts, Kmax) => {
    const Q = [[[ident, []]]], seen = new Set([key(ident)]);
    for (let k = 1; k <= Kmax; k++) {
      Q[k] = [];
      for (const [c, se, sd] of stmts) {
        if (c > k) continue;
        for (const [re, rd] of Q[k - c]) {
          const e = comp(se, re);
          if (!e) continue;
          const h = key(e);
          if (seen.has(h)) continue;
          seen.add(h);
          Q[k].push([e, [sd].concat(rd)]);
        }
      }
    }
    return Q;
  };
  const loopsOf = (Q, Kmax) => {
    const L = [], seen = new Set();
    for (let k = 1; k + 1 <= Kmax; k++) for (const [b, bd] of Q[k] || []) {
      let e = b;
      for (let N = 2; N <= 9 && e; N++) {
        e = comp(e, b);
        if (!e) break;
        const h = key(e);
        if (!seen.has(h)) { seen.add(h); L.push([k + 1, e, {n: N, b: bd}]); }
      }
      if (opts.until) {
        const u = until(b);
        if (u) { const h = key(u); if (!seen.has(h)) { seen.add(h); L.push([k + 1, u, {n: 0, b: bd}]); } }
      }
    }
    return L;
  };
  const s0 = (id[w.s] << 2) | w.d;
  const best = (atoms, K) => {
    if (K < 1) return null;
    let stm = atoms;
    if (opts.loops !== false) {
      const Q0 = seqs(atoms, Math.max(0, K - 2)), L1 = loopsOf(Q0, K - 1);
      const Q1 = seqs(atoms.concat(L1), Math.max(0, K - 1)), L2 = loopsOf(Q1, K);
      stm = atoms.concat(L2).sort((a, b) => a[0] - b[0]); // L2 holds every L1 effect too (Q1 contains Q0)
    }
    const dist = new Int16Array(NX).fill(999), prev = new Array(NX), B = [[s0]];
    dist[s0] = 0;
    let bestC = K + 1, end = null;
    for (let dc = 0; dc < bestC; dc++) {
      for (const x of B[dc] || []) {
        if (dist[x] != dc) continue;
        for (const [c, e, d] of stm) {
          const nd = dc + c;
          if (nd >= bestC) break;
          const y = e[x];
          if (y == CR) continue;
          if (y == WIN) { bestC = nd; end = [x, d]; break; }
          if (dist[y] > nd) { dist[y] = nd; prev[y] = [x, d]; (B[nd] = B[nd] || []).push(y); }
        }
      }
    }
    if (!end) return null;
    const seq = [end[1]];
    for (let x = end[0]; x != s0; x = prev[x][0]) seq.unshift(prev[x][1]);
    return {cost: bestC, m: flat(seq)};
  };
  const atoms = [[1, fw, 'fw'], [1, tl, 'tl'], [1, tr, 'tr']];
  let r = best(atoms, opts.K);
  if (r) r.f = [];
  if (opts.fn) {
    // a function helps only when called at least twice: main has 2 calls and at least one more block, so the body has at most
    // K - 3 blocks; plain bodies of 2..FN_MAX blocks, each effect once
    let bound = r ? r.cost - 1 : opts.K;
    const Qf = seqs(atoms, Math.min(FN_MAX, Math.max(0, bound - 3)));
    for (let cf = 2; cf <= Math.min(FN_MAX, bound - 3); cf++) {
      for (const [fe, fd] of Qf[cf] || []) {
        if (cf > bound - 3) break;
        const rr = best(atoms.concat([[1, fe, 'fn']]), bound - cf);
        if (rr && rr.cost + cf <= bound) {
          r = {cost: rr.cost + cf, m: rr.m, f: flat(fd)};
          bound = r.cost - 1;
        }
      }
    }
  }
  return r;
}
// fewest blocks of a program with no loop (the function allowed when fn): what a child would need without loops
function loopFree(w, fn, K = 60) {
  const r = search(w, {K, loops: false, fn});
  return r ? r.cost : Infinity;
}

// ---- layout ----
// Lay the moves `acts` (F L R) on an n x n grid from cell (x, y) facing d. Returns the path cells or null when it leaves the grid,
// crosses itself or touches itself (two path cells side by side that do not follow each other).
function layout(n, acts, x, y, d) {
  const path = [y * n + x];
  for (const a of acts) {
    if (a == 'L') d = (d + 3) % 4;
    else if (a == 'R') d = (d + 1) % 4;
    else {
      x += DX[d];
      y += DY[d];
      if (x < 0 || y < 0 || x >= n || y >= n) return null;
      const c = y * n + x;
      if (path.includes(c)) return null;
      path.push(c);
    }
  }
  const at = new Map(path.map((c, i) => [c, i]));
  for (const [c, i] of at) for (let k = 0; k < 4; k++) {
    const xx = c % n + DX[k], yy = Math.floor(c / n) + DY[k];
    const j = xx < 0 || yy < 0 || xx >= n || yy >= n ? undefined : at.get(yy * n + xx);
    if (j !== undefined && Math.abs(j - i) > 1) return null;
  }
  return path;
}
// Put a template on the grid: random starts and facings until the path fits. Returns a world {n, cells, s, d, g} or null.
// first: 'L' or 'R' when the robot starts turned away from its first move (it then needs that turn first), 'B' facing back.
function place(n, acts, r, first) {
  for (let t = 0; t < 200; t++) {
    const x = r.int(n), y = r.int(n), d = r.int(4);
    const path = layout(n, acts, x, y, d);
    if (!path) continue;
    const cells = Array(n * n).fill('#');
    path.forEach(c => { cells[c] = '.'; });
    const d0 = first == 'L' ? (d + 1) % 4 : first == 'R' ? (d + 3) % 4 : first == 'B' ? (d + 2) % 4 : d;
    return {n, cells: cells.join(''), s: path[0], d: d0, g: path[path.length - 1]};
  }
  return null;
}

// ---- templates ----
const rep = (k, body) => k == 1 ? body : ['r' + k, ...body, 'en'];
const fwN = k => k == 1 ? ['fw'] : rep(k, ['fw']);
const T = t => t == 'L' ? 'tl' : 'tr';
const O = t => t == 'L' ? 'R' : 'L';
// each template: (r, level) -> {acts, m, f?, first?} with r a seeded rng
const TPL = {
  line(r, lv) {
    const first = lv == 1 ? r.pick(['', '', 'L', 'R']) : r.pick(['L', 'R', 'B']);
    return {acts: 'FFFFF', m: [...(first == 'B' ? ['tl', 'tl'] : first ? [T(first)] : []), ...fwN(5)], first};
  },
  turn(r, lv) {
    const t = r.pick(['L', 'R']);
    let a, b;
    do { a = 2 + r.int(4); b = 2 + r.int(4); } while (a + b < 7 || (lv < 6) == (b <= a));
    const m = b <= a ? rep(2, [...fwN(a), T(t)]) : [...fwN(a), T(t), ...fwN(b)];
    return {acts: 'F'.repeat(a) + t + 'F'.repeat(b), m};
  },
  ring(r) {
    const t = r.pick(['L', 'R']), k = r.pick([3, 4]), s = 3 + r.int(3);
    const segs = Array(k).fill(s);
    if (k == 4) segs[3] = s - 2;
    return {acts: segs.map(x => 'F'.repeat(x)).join(t), m: rep(k, [...fwN(s), T(t)])};
  },
  stairs(r, lv) {
    const t = r.pick(['L', 'R']), run = lv >= 8 && r() < 0.5 ? 2 : 1, rise = lv >= 8 && run == 1 ? 2 : 1;
    const nmax = Math.floor(5 / Math.max(run, rise)), n = run + rise > 2 ? 2 : 3 + r.int(nmax - 2);
    const first = lv == 5 && r() < 0.5 ? r.pick(['L', 'R']) : '';
    const step = 'F'.repeat(run) + t + 'F'.repeat(rise) + O(t);
    return {acts: step.repeat(n).slice(0, -1), first, m: [...(first ? [T(first)] : []),
      ...rep(n, [...(run == 1 ? ['fw'] : ['fw', 'fw']), T(t), ...(rise == 1 ? ['fw'] : ['fw', 'fw']), T(O(t))])]};
  },
  stairsRun(r) {
    const t = r.pick(['L', 'R']), n = 2 + r.int(2), m = 2 + r.int(4 - n);
    const step = 'F' + t + 'F' + O(t);
    return {acts: step.repeat(n) + 'F'.repeat(m), m: [...rep(n, ['fw', T(t), 'fw', T(O(t))]), ...fwN(m)]};
  },
  rect(r) {
    const t = r.pick(['L', 'R']);
    let a, b;
    do { a = 2 + r.int(4); b = 2 + r.int(4); } while (a == b);
    return {acts: 'F'.repeat(a) + t + 'F'.repeat(b) + t + 'F'.repeat(a), m: rep(2, [...fwN(a), T(t), ...fwN(b), T(t)])};
  },
  ringU(r) {
    const t = r.pick(['L', 'R']), k = r.pick([3, 4]);
    let a, b;
    do { a = 3 + r.int(5); b = 3 + r.int(5); } while (a == b);
    const segs = k == 3 ? [a, b, a] : [a, b, a, b - 2];
    return {acts: segs.map(x => 'F'.repeat(x)).join(t), m: rep(k, ['uw', 'fw', 'en', T(t)])};
  },
  spiral(r) {
    const t = r.pick(['L', 'R']), a = 5 + r.int(3), segs = [a, a];
    for (let s = a; s - 2 >= 1; s -= 2) segs.push(s, s - 2 >= 1 ? s - 2 : 0);
    const L = segs.filter(x => x > 0).slice(0, 4 + r.int(3));
    return {acts: L.map(x => 'F'.repeat(x)).join(t), m: rep(L.length, ['uw', 'fw', 'en', T(t)])};
  },
  stairsU(r, lv) {
    const t = r.pick(['L', 'R']), n = 3 + r.int(3), runs = [], first = lv >= 9 ? r.pick(['L', 'R']) : '';
    for (let i = 0; i <= n; i++) runs.push(1 + r.int(3));
    let acts = '';
    for (let i = 0; i < n; i++) acts += 'F'.repeat(runs[i]) + t + 'F' + O(t);
    acts += 'F'.repeat(runs[n]);
    return {acts, first, m: [...(first ? [T(first)] : []), ...rep(n + 1, ['uw', 'fw', 'en', T(t), 'fw', T(O(t))])]};
  },
  hills(r, lv) {
    const t = r.pick(['L', 'R']);
    const [a, c, m] = r.pick(lv == 10 ? [[1, 3, 1], [1, 3, 2], [1, 4, 1]] : [[2, 4, 1], [1, 4, 2], [1, 5, 1], [2, 3, 2]]);
    const first = lv == 12 ? r.pick(['L', 'R']) : '';
    const step = 'F' + t + 'F' + O(t);
    return {acts: step.repeat(a) + 'F'.repeat(m) + step.repeat(c).slice(0, -1), first,
      m: [...(first ? [T(first)] : []), ...rep(a, ['fn']), ...fwN(m), ...rep(c, ['fn'])], f: ['fw', T(t), 'fw', T(O(t))]};
  },
};
// Levels 1-12 of each band: the templates, three worlds a level, steps from shortest to longest (BRAIN_TEASERS 7)
const PLAN = {
  C: ['line', 'line', 'turn', 'stairs', 'stairs', 'turn', 'ring', 'stairs', 'stairs', 'stairsRun', 'rect', 'rect'],
  D: ['ringU', 'ringU', 'spiral', 'spiral', 'stairsU', 'stairsU', 'stairsU', 'stairsU', 'stairsU', 'hills', 'hills', 'hills'],
};
const BAND = {C: {n: 6, extra: 2}, D: {n: 8, extra: 1}};
// the blocks a template's levels add to forward, turns and repeat: u = repeat until wall, f = the function
const KIT = {ringU: 'u', spiral: 'u', stairsU: 'u', hills: 'f'};

// One world for a band and level from rng r, or null (the caller tries again). Checks: the intended program wins in the
// simulator, the search finds nothing shorter (so par = its blocks), and no program without loops fits the slots.
function makeWorld(band, level, r) {
  const B = BAND[band], tpl = PLAN[band][level - 1], T0 = TPL[tpl](r, level), kit = KIT[tpl] || '';
  const w = place(B.n, T0.acts, r, T0.first);
  if (!w) return null;
  const prog = {m: T0.m, f: T0.f || []}, par = cost(prog);
  if (run(w, prog).out != 'win') return null;
  const best = search(w, {K: par, until: kit.includes('u'), fn: kit.includes('f')});
  if (!best || best.cost != par) return null;
  // a function level needs the function: without it the shortest program is longer
  if (kit.includes('f') && search(w, {K: par, until: false, fn: false})) return null;
  const slots = par + B.extra;
  // no program of plain blocks (moves and turns, no loop, no function) fits the slots
  if (loopFree(w, false, slots + 1) <= slots) return null;
  return Object.assign(w, {par, slots, kit, m: prog.m, f: prog.f, tpl});
}

const encode = w => [w.n, w.cells, w.s, w.d, w.g, w.par, w.kit, w.m.join(' '), w.f.join(' '), w.tpl].join('|');
function decode(str) {
  const [n, cells, s, d, g, par, kit, m, f, tpl] = str.split('|');
  return {n: +n, cells, s: +s, d: +d, g: +g, par: +par, kit, m: m ? m.split(' ') : [], f: f ? f.split(' ') : [], tpl};
}
// the 8 turns and mirrors of a world (cells, start, facing, goal) as one string, to spot the same world twice
function canon(w) {
  const n = w.n, out = [];
  for (let k = 0; k < 8; k++) {
    const map = c => {
      let x = c % n, y = Math.floor(c / n);
      for (let i = 0; i < k % 4; i++) [x, y] = [n - 1 - y, x];
      if (k >= 4) x = n - 1 - x;
      return y * n + x;
    };
    let d = (w.d + k) % 4; // a quarter turn clockwise turns the facing clockwise
    if (k >= 4) d = (4 - d) % 4; // a left-right mirror swaps right and left
    const cells = Array(n * n);
    for (let c = 0; c < n * n; c++) cells[map(c)] = w.cells[c];
    out.push(cells.join('') + map(w.s) + ',' + d + ',' + map(w.g));
  }
  return out.sort()[0];
}

function buildBank(seed, log = () => {}) {
  const bank = {};
  for (const band of ['C', 'D']) {
    const list = [], seen = new Set();
    for (let lv = 1; lv <= 12; lv++) {
      for (let i = 0; i < 3; i++) {
        const r = makeRng(`${seed}|${band}|${lv}|${i}`);
        let w = null;
        for (let t = 0; t < 400 && !w; t++) {
          w = makeWorld(band, lv, r);
          if (w && seen.has(canon(w))) w = null;
        }
        if (!w) throw new Error('robot: no world for ' + band + lv + ' #' + i);
        seen.add(canon(w));
        list.push(encode(w));
        log(`${band}${lv}.${i} ${w.tpl} par ${w.par} slots ${w.slots} kit '${w.kit}' ${w.m.join(' ')}${w.f.length ? ' / fn ' + w.f.join(' ') : ''}`);
      }
    }
    bank[band] = list;
  }
  return bank;
}

function fileText(bank, seed) {
  const L = [];
  L.push('/* Robot Path worlds for bands C and D (P3-13, BRAIN_TEASERS 5.8). GENERATED by `node tools/puzzles/build-banks.js robot` from');
  L.push('   seed \'' + seed + '\': do not edit by hand; change the generator (tools/puzzles/robot.js) and rerun it. Same seed, same file.');
  L.push('   PUZ.robot[band] = [36 worlds], 3 per level in level order (level L is entries 3(L-1) to 3L-1). Each world is');
  L.push('   \'n|cells|start|facing|goal|par|kit|main|fn|template\': cells n*n characters (. open, # wall) in reading order; facing');
  L.push('   0 up, 1 right, 2 down, 3 left; kit = blocks added to forward, turns and repeat (u repeat until wall, f the function);');
  L.push('   main and fn = the intended program, a shortest one (fw tl tr, r2..r9 repeat N, uw repeat until wall, en end of a loop,');
  L.push('   fn call the function); par = its blocks. tools/test.js proves par with its own search. */');
  L.push('var PUZ = PUZ || {};');
  L.push('PUZ.robot = {');
  for (const band of ['C', 'D']) {
    L.push('  ' + band + ': [');
    for (const e of bank[band]) L.push('    \'' + e + '\',');
    L.push('  ],');
  }
  L.push('};');
  return L.join('\n') + '\n';
}

module.exports = {PER_BAND, PLAN, TPL, UW_CAP, FN_MAX, search, loopFree, run, cost, parse, flat, layout, place, makeWorld, buildBank,
  fileText, encode, decode, canon, front};
