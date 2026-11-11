'use strict';
// MathDoku (KenKen-style) generator, grader and bank builder (P3-04, BRAIN_TEASERS 5.2). Dev-time only.
// Run through build-banks.js: `node tools/puzzles/build-banks.js mathdoku` writes src/data/d-puz-mathdoku.js.
//
// Rules of the puzzle: an N x N grid, each row and column holds 1..N once; every cage (a connected group of cells) shows a
// target and an operation, and the cage's numbers make that target: + sum, * product, - difference (2 cells: larger minus
// smaller), / quotient (2 cells: larger divided by smaller, no remainder), = a single cell holding the target (a given).
// Numbers may repeat inside a cage when the cells are in different rows and columns (an L-shaped cage).
//
// Steps for one puzzle (BRAIN_TEASERS 5.2 "Dev-time generator"):
//   1. a random Latin square of size N (csp.solve with a seeded rng)
//   2. cells are partitioned into cages by random growth: cells are visited in random order, each free cell starts a cage of a
//      random size (BANDS weights) that grows into random free orthogonal neighbours. Too many single-cell cages are merged
//      into a neighbouring cage with room; too few (band B needs 2) means a new partition.
//   3. every cage gets an operation the band allows (- and / only on 2 cells, / only when one value divides the other,
//      * only while the product is at most MAX_MUL) and its target from the Latin square
//   4. count solutions with csp.js (stops at 2). If not unique, the largest cage on which two solutions differ is repaired:
//      a 2-cell cage first gets another operation, a bigger cage is split into two connected parts (or a 2-cell cage into two
//      single cells) while the band's single-cell limit allows, and otherwise gets another operation. Up to MAX_REPAIRS times,
//      then the puzzle is discarded.
//   5. grade with the cage-aware human-style solver grade() below; a puzzle it cannot finish (it would need guessing) is
//      discarded. The difficulty score is score() below. Duplicates (equal under the 8 rotations and mirrors the UI may
//      apply) are discarded.
// The bank holds PER_BAND puzzles per band, sorted by score (band D: all 5x5 first, then all 6x6), so level L of a band is
// entries 3(L-1)..3L-1 (BRAIN_TEASERS 7: 12 levels of 3).
//
// Human-style grader (cage-aware; the grade is the hardest technique needed, as in human.js for sudoku):
//   1 last cell        a row or column with one empty cell, or a cage with one empty cell whose value the arithmetic forces
//   2 cage single      a cell left with one candidate. Candidates: values not yet in the cell's row or column, then kept only
//                      if some way of filling the cage (with its target, the other cells' candidates, and no repeat in a
//                      row or column) uses them there ("6 x in two cells: 1 and 6, or 2 and 3")
//   3 hidden single    a value that fits in only one cell of a row or column
//   4 cage in a line   a value that every way of filling a cage puts in the cage's cells of one row (column) leaves the rest
//                      of that row (column)
//   5 naked pair       two cells of a row or column with the same two candidates: those values leave the rest of the line
//   99                 not solved: the techniques above get stuck
// score(): the solver's search nodes with propagation only (csp.js stats.nodes; 1 = propagation alone solves it), times
//   1000, plus the human-style effort (sum of the technique numbers of every step), so ties in nodes sort by effort.
//
// Determinism: every bank slot (band, grid size, index) has its own rng seeded `${seed}|${band}|${N}|${index}`; slots are
// generated in a fixed order (bands B, C, D; sizes ascending; index ascending), each avoiding the puzzles before it, then each
// band is sorted. genSlot() regenerates any one slot.
//
// Exports: BANDS, ORDER, PER_BAND, TECH, makePuzzle(band, N, rng), genSlot(seed, band, N, index, avoid), buildBank(seed, log),
//          problemOf(N, cages), grade(N, cages), score(N, cages, g), encode(p), decode(str), canon(N, cages), bankKey(N, cages),
//          fileText(bank, seed), calc(op, vals), SYMS

const csp = require('./csp');
const {rng: makeRng} = require('./rng');

// Band specs (BRAIN_TEASERS 5.2): grid sizes, operations, largest cage, [fewest, most] single-cell cages, and the weights of
// cage sizes 1..4 when a cage starts growing.
const BANDS = {
  B: {sizes: [3], ops: '+', maxCage: 3, single: [2, 3], weights: [3, 4, 3, 0]},
  C: {sizes: [4], ops: '+-*', maxCage: 3, single: [1, 2], weights: [1, 5, 4, 0]},
  D: {sizes: [5, 6], ops: '+-*/', maxCage: 4, single: [0, 1], weights: [0.3, 4, 3.5, 2.2]},
};
const ORDER = ['B', 'C', 'D'];
const PER_BAND = 36; // 12 levels x 3 (BRAIN_TEASERS 5.2 step 6); band D: 18 of 5x5 and 18 of 6x6
const MAX_MUL = 144; // largest * target (12 x 12: the times tables)
const MAX_REPAIRS = 30;
const MAX_TRIES = 20000;
const TECH = [null, 'last cell', 'cage single', 'hidden single', 'cage in a line', 'naked pair'];
const NOT_SOLVED = 99;

const pop = csp.pop;
const bitIndex = b => 31 - Math.clz32(b);

// The value a cage's numbers make with an operation (NaN when the operation does not apply: / with a remainder).
function calc(op, vals) {
  if (op === '=') return vals[0];
  if (op === '+') return vals.reduce((a, v) => a + v, 0);
  if (op === '*') return vals.reduce((a, v) => a * v, 1);
  const hi = Math.max(vals[0], vals[1]);
  const lo = Math.min(vals[0], vals[1]);
  if (op === '-') return hi - lo;
  if (op === '/') return hi % lo ? NaN : hi / lo;
  return NaN;
}

const neighbours = (N, c) => {
  const r = Math.floor(c / N);
  const k = c % N;
  const out = [];
  if (r > 0) out.push(c - N);
  if (k > 0) out.push(c - 1);
  if (k < N - 1) out.push(c + 1);
  if (r < N - 1) out.push(c + N);
  return out;
};
function connected(N, cells) {
  const set = new Set(cells);
  const seen = new Set([cells[0]]);
  const stack = [cells[0]];
  while (stack.length) for (const y of neighbours(N, stack.pop())) if (set.has(y) && !seen.has(y)) seen.add(y), stack.push(y);
  return seen.size === cells.length;
}
const sameLine = (N, a, b) => Math.floor(a / N) === Math.floor(b / N) || a % N === b % N;

function pickWeighted(weights, rng) {
  const total = weights.reduce((a, w) => a + w, 0);
  let x = rng() * total;
  for (let i = 0; i < weights.length; i++) {
    x -= weights[i];
    if (x < 0) return i;
  }
  return weights.length - 1;
}

// Step 2: cells of an N x N grid split into connected cages (arrays of sorted cells, cages sorted by first cell), or null.
function partition(N, spec, rng) {
  const n = N * N;
  const owner = new Array(n).fill(-1);
  const cages = [];
  const order = rng.shuffle(Array.from({length: n}, (_, i) => i));
  for (const c of order) {
    if (owner[c] >= 0) continue;
    const size = pickWeighted(spec.weights.slice(0, spec.maxCage), rng) + 1;
    const cells = [c];
    owner[c] = cages.length;
    while (cells.length < size) {
      const front = [];
      for (const x of cells) for (const y of neighbours(N, x)) if (owner[y] < 0 && !front.includes(y)) front.push(y);
      if (!front.length) break;
      front.sort((a, b) => a - b);
      const y = rng.pick(front);
      owner[y] = cages.length;
      cells.push(y);
    }
    cages.push(cells);
  }
  // too many single cells: merge one into a neighbouring cage that still has room
  for (;;) {
    const singles = cages.filter(cg => cg && cg.length === 1);
    if (singles.length <= spec.single[1]) break;
    const s = singles[0];
    const k = owner[s[0]];
    const room = [];
    for (const y of neighbours(N, s[0])) {
      const j = owner[y];
      if (j !== k && cages[j].length < spec.maxCage && !room.includes(j)) room.push(j);
    }
    if (!room.length) return null;
    room.sort((a, b) => a - b);
    const j = rng.pick(room);
    cages[j].push(s[0]);
    owner[s[0]] = j;
    cages[k] = null;
  }
  const out = cages.filter(cg => cg).map(cg => cg.slice().sort((a, b) => a - b));
  if (out.filter(cg => cg.length === 1).length < spec.single[0]) return null;
  return out.sort((a, b) => a[0] - b[0]);
}

// Step 3: an operation for a cage (cells) on the solution, from the band's operations, avoiding `not` (ops already tried).
function chooseOp(spec, cells, sol, rng, not = '') {
  if (cells.length === 1) return '=';
  const vals = cells.map(c => sol[c]);
  const w = {};
  if (cells.length === 2) {
    w['+'] = 2;
    w['-'] = 3;
    w['*'] = 2;
    const hi = Math.max(vals[0], vals[1]);
    const lo = Math.min(vals[0], vals[1]);
    if (hi % lo === 0) w['/'] = lo === 1 ? 2 : 5;
  } else {
    w['+'] = 5;
    w['*'] = 4;
  }
  if (calc('*', vals) > MAX_MUL) delete w['*'];
  const ops = Object.keys(w).filter(op => spec.ops.includes(op) && !not.includes(op));
  if (!ops.length) return null;
  return ops[pickWeighted(ops.map(op => w[op]), rng)];
}
const makeCage = (cells, op, sol) => ({cells, op, t: calc(op, cells.map(c => sol[c])), tried: op});

// The csp.js problem of a puzzle: Latin rows and columns, single cells as givens, the other cages as custom constraints.
function problemOf(N, cages) {
  const givens = new Array(N * N).fill(0);
  const cons = [];
  for (const cg of cages) {
    if (cg.op === '=') givens[cg.cells[0]] = cg.t;
    else cons.push({cells: cg.cells, test: vals => calc(cg.op, vals) === cg.t});
  }
  return {n: N * N, size: N, groups: csp.latinGroups(N), cons, givens};
}

// Step 4: repair one ambiguous cage in place. Returns false when nothing is left to try.
function repair(N, spec, cages, k, sol, rng) {
  const cg = cages[k];
  const singles = cages.filter(c => c.cells.length === 1).length;
  const reOp = () => {
    const op = chooseOp(spec, cg.cells, sol, rng, cg.tried);
    if (!op) return false;
    cages[k] = Object.assign(makeCage(cg.cells, op, sol), {tried: cg.tried + op});
    return true;
  };
  if (cg.cells.length === 2 && reOp()) return true;
  // splits into two connected parts (subsets holding the first cell), best first: no single cells, then within the limit
  const m = cg.cells.length;
  const splits = [];
  for (let mask = 1; mask < 1 << m; mask += 2) {
    if (mask === (1 << m) - 1) continue;
    const a = cg.cells.filter((_, i) => mask & (1 << i));
    const b = cg.cells.filter((_, i) => !(mask & (1 << i)));
    if (!connected(N, a) || !connected(N, b)) continue;
    const ones = (a.length === 1) + (b.length === 1);
    if (singles + ones <= spec.single[1]) splits.push([ones, a, b]);
  }
  if (splits.length) {
    const fewest = Math.min(...splits.map(s => s[0]));
    const [, a, b] = rng.pick(splits.filter(s => s[0] === fewest));
    const parts = [a, b].map(cells => makeCage(cells, chooseOp(spec, cells, sol, rng), sol));
    cages.splice(k, 1, ...parts);
    cages.sort((x, y) => x.cells[0] - y.cells[0]);
    return true;
  }
  return reOp();
}

// Cage-aware human-style solver. Returns {solved, grade, grid, used, steps} like human.js.
function grade(N, cages) {
  const n = N * N;
  const full = (1 << N) - 1;
  const grid = new Array(n).fill(0);
  const elim = new Array(n).fill(0);
  const lines = [];
  for (let r = 0; r < N; r++) lines.push(Array.from({length: N}, (_, c) => r * N + c));
  for (let c = 0; c < N; c++) lines.push(Array.from({length: N}, (_, r) => r * N + c));
  const lineOf = c => [Math.floor(c / N), N + (c % N)];
  const cageOf = new Array(n);
  cages.forEach((cg, i) => cg.cells.forEach(c => (cageOf[c] = i)));
  for (const cg of cages) if (cg.op === '=') grid[cg.cells[0]] = cg.t;
  const used = {};
  const steps = [];
  let top = 0;
  let broken = false;
  const note = t => {
    used[t] = (used[t] || 0) + 1;
    if (t > top) top = t;
  };
  const place = (c, v, t) => {
    grid[c] = v;
    steps.push({t, cell: c, v});
    note(t);
  };

  for (;;) {
    if (grid.every(v => v)) break;
    // basic candidates: not in the row or column, not eliminated
    const base = new Array(n).fill(0);
    for (let c = 0; c < n; c++) {
      if (grid[c]) continue;
      let m = full & ~elim[c];
      for (const li of lineOf(c)) for (const q of lines[li]) if (grid[q]) m &= ~(1 << (grid[q] - 1));
      base[c] = m;
    }
    // 1 last cell: a line with one empty cell, or a cage with one empty cell forced by the arithmetic
    let moved = false;
    for (const L of lines) {
      const empty = L.filter(c => !grid[c]);
      if (empty.length !== 1) continue;
      let seen = 0;
      for (const c of L) if (grid[c]) seen |= 1 << (grid[c] - 1);
      const miss = full & ~seen;
      if (pop(miss) !== 1) broken = true;
      else place(empty[0], bitIndex(miss) + 1, 1);
      moved = true;
      break;
    }
    if (broken) break;
    if (!moved) {
      for (const cg of cages) {
        const empty = cg.cells.filter(c => !grid[c]);
        if (empty.length !== 1) continue;
        const fits = [];
        for (let v = 1; v <= N; v++) if (calc(cg.op, cg.cells.map(c => grid[c] || v)) === cg.t) fits.push(v);
        if (fits.length !== 1) continue;
        if (!(base[empty[0]] & (1 << (fits[0] - 1)))) broken = true;
        else place(empty[0], fits[0], 1);
        moved = true;
        break;
      }
    }
    if (broken) break;
    if (moved) continue;
    // cage filter: every way of filling each cage with the current candidates
    const cand = new Array(n).fill(0);
    const must = []; // [cage index, line index, mask of values every fill puts in the cage's empty cells of that line]
    cages.forEach((cg, ci) => {
      const empty = cg.cells.filter(c => !grid[c]);
      if (!empty.length) return;
      const vals = cg.cells.map(c => grid[c]);
      const at = empty.map(c => cg.cells.indexOf(c));
      const support = new Array(empty.length).fill(0);
      const lineIds = [...new Set(empty.flatMap(lineOf))];
      const inter = lineIds.map(() => full);
      const rec = i => {
        if (i === empty.length) {
          if (calc(cg.op, vals) !== cg.t) return;
          for (let j = 0; j < empty.length; j++) support[j] |= 1 << (vals[at[j]] - 1);
          lineIds.forEach((li, k) => {
            let m = 0;
            empty.forEach((c, j) => {
              if (lineOf(c).includes(li)) m |= 1 << (vals[at[j]] - 1);
            });
            inter[k] &= m;
          });
          return;
        }
        let d = base[empty[i]];
        while (d) {
          const b = d & -d;
          d ^= b;
          const v = bitIndex(b) + 1;
          let clash = false;
          for (let j = 0; j < i; j++) if (vals[at[j]] === v && sameLine(N, empty[j], empty[i])) clash = true;
          if (clash) continue;
          vals[at[i]] = v;
          rec(i + 1);
        }
        vals[at[i]] = 0;
      };
      rec(0);
      empty.forEach((c, j) => (cand[c] = support[j]));
      lineIds.forEach((li, k) => {
        if (inter[k] && support.some(s => s)) must.push([ci, li, inter[k]]);
      });
    });
    if (grid.some((v, c) => !v && !cand[c])) {
      broken = true;
      break;
    }
    // 2 cage single
    for (let c = 0; c < n && !moved; c++) {
      if (!grid[c] && pop(cand[c]) === 1) {
        place(c, bitIndex(cand[c]) + 1, 2);
        moved = true;
      }
    }
    if (moved) continue;
    // 3 hidden single
    for (const L of lines) {
      for (let v = 1; v <= N && !moved; v++) {
        const b = 1 << (v - 1);
        if (L.some(c => grid[c] === v)) continue;
        const where = L.filter(c => !grid[c] && cand[c] & b);
        if (where.length === 1) {
          place(where[0], v, 3);
          moved = true;
        }
      }
      if (moved) break;
    }
    if (moved) continue;
    // 4 cage in a line
    const eliminate = (list, t) => {
      for (const [c, v] of list) elim[c] |= 1 << (v - 1);
      steps.push({t, elim: list});
      note(t);
      moved = true;
    };
    for (const [ci, li, m] of must) {
      const list = [];
      for (const c of lines[li]) {
        if (grid[c] || cageOf[c] === ci) continue;
        for (let v = 1; v <= N; v++) if (m & cand[c] & (1 << (v - 1))) list.push([c, v]);
      }
      if (list.length) {
        eliminate(list, 4);
        break;
      }
    }
    if (moved) continue;
    // 5 naked pair
    for (const L of lines) {
      for (let i = 0; i < N && !moved; i++) {
        const a = L[i];
        if (grid[a] || pop(cand[a]) !== 2) continue;
        for (let j = i + 1; j < N && !moved; j++) {
          const b = L[j];
          if (grid[b] || cand[b] !== cand[a]) continue;
          const list = [];
          for (const c of L) {
            if (c === a || c === b || grid[c]) continue;
            for (let v = 1; v <= N; v++) if (cand[c] & cand[a] & (1 << (v - 1))) list.push([c, v]);
          }
          if (list.length) eliminate(list, 5);
        }
      }
      if (moved) break;
    }
    if (!moved) break;
  }
  // a finished grid must also satisfy every line and cage
  let solved = !broken && grid.every(v => v);
  if (solved) {
    for (const L of lines) if (new Set(L.map(c => grid[c])).size !== N) solved = false;
    for (const cg of cages) if (calc(cg.op, cg.cells.map(c => grid[c])) !== cg.t) solved = false;
  }
  return {solved, grade: solved ? top : NOT_SOLVED, grid, used, steps};
}

// Difficulty score: csp.js search nodes (propagation only) x 1000 + the human-style effort (sum of technique numbers).
function score(N, cages, g) {
  const stats = {};
  csp.countSolutions(problemOf(N, cages), 2, {stats});
  const effort = (g || grade(N, cages)).steps.reduce((a, s) => a + s.t, 0);
  return (stats.nodes || 0) * 1000 + effort;
}

// One attempt at a puzzle of size N for a band. Returns {n, cages, solution, grade, score, repairs} or null.
function makePuzzle(band, N, rng) {
  const spec = BANDS[band];
  const sol = csp.solve({n: N * N, size: N, groups: csp.latinGroups(N)}, {rng});
  const parts = partition(N, spec, rng);
  if (!parts) return null;
  const cages = parts.map(cells => makeCage(cells, chooseOp(spec, cells, sol, rng), sol));
  let repairs = 0;
  for (;;) {
    const sols = csp.solutions(problemOf(N, cages), 2);
    if (sols.length === 1) break;
    if (repairs === MAX_REPAIRS) return null;
    repairs++;
    const [a, b] = sols;
    let k = -1;
    cages.forEach((cg, i) => {
      if (cg.cells.some(c => a[c] !== b[c]) && (k < 0 || cg.cells.length > cages[k].cells.length)) k = i;
    });
    if (!repair(N, spec, cages, k, sol, rng)) return null;
  }
  const singles = cages.filter(cg => cg.op === '=').length;
  if (singles < spec.single[0] || singles > spec.single[1]) return null;
  const out = cages.map(cg => ({cells: cg.cells, op: cg.op, t: cg.t}));
  const g = grade(N, out);
  if (!g.solved || g.grid.join('') !== sol.join('')) return null;
  return {n: N, cages: out, solution: sol, grade: g.grade, score: score(N, out, g), repairs};
}

// The 8 rotations and mirrors of an N x N grid as cell maps (BRAIN_TEASERS 5.2 "Runtime variety").
const SYMS = [
  (r, c, N) => [r, c],
  (r, c, N) => [c, N - 1 - r],
  (r, c, N) => [N - 1 - r, N - 1 - c],
  (r, c, N) => [N - 1 - c, r],
  (r, c, N) => [r, N - 1 - c],
  (r, c, N) => [N - 1 - r, c],
  (r, c, N) => [c, r],
  (r, c, N) => [N - 1 - c, N - 1 - r],
];
// Canonical text of a puzzle's cages under the 8 symmetries: two puzzles a child could see as the same get the same key.
function canon(N, cages) {
  let best = null;
  for (const f of SYMS) {
    const map = c => {
      const [r, k] = f(Math.floor(c / N), c % N, N);
      return r * N + k;
    };
    const s = cages
      .map(cg => cg.cells.map(map).sort((a, b) => a - b))
      .map((cells, i) => [cells, cages[i]])
      .sort((x, y) => x[0][0] - y[0][0])
      .map(([cells, cg]) => cells.join('.') + cg.op + cg.t)
      .join(',');
    if (best === null || s < best) best = s;
  }
  return best;
}
const bankKey = (N, cages) => N + ':' + canon(N, cages);

// One bank slot. avoid: Set of bankKey()s of the puzzles before it.
function genSlot(seed, band, N, index, avoid) {
  const rng = makeRng(seed + '|' + band + '|' + N + '|' + index);
  for (let tries = 1; tries <= MAX_TRIES; tries++) {
    const p = makePuzzle(band, N, rng);
    if (p && !avoid.has(bankKey(N, p.cages))) return Object.assign(p, {tries});
  }
  throw new Error('mathdoku: no puzzle for ' + band + ' ' + N + 'x' + N + ' ' + index + ' after ' + MAX_TRIES + ' tries');
}

// 'N|cages|solution|grade|score'; a cage is its cells (one base-36 character each, ascending) + op + target; cages are
// comma-separated, ordered by their first cell (the top-left cell, where the label goes).
const encode = p =>
  [p.n, p.cages.map(cg => cg.cells.map(c => c.toString(36)).join('') + cg.op + cg.t).join(','), p.solution.join(''), p.grade, p.score].join('|');
function decode(str) {
  const [n, cs, sol, gr, sc] = str.split('|');
  const cages = cs.split(',').map(s => {
    const m = s.match(/^([0-9a-z]+)([-+*/=])(\d+)$/);
    return m ? {cells: [...m[1]].map(ch => parseInt(ch, 36)), op: m[2], t: Number(m[3])} : null;
  });
  return {n: Number(n), cages, solution: [...sol].map(Number), grade: Number(gr), score: Number(sc)};
}

// The whole bank: {B: [encoded, ...], C, D}, each band sorted by grid size, then score (then text, for a stable order).
function buildBank(seed, log) {
  const avoid = new Set();
  const bank = {};
  for (const band of ORDER) {
    const spec = BANDS[band];
    const list = [];
    for (const N of spec.sizes) {
      const t0 = Date.now();
      let tries = 0;
      const per = PER_BAND / spec.sizes.length;
      for (let i = 0; i < per; i++) {
        const p = genSlot(seed, band, N, i, avoid);
        avoid.add(bankKey(N, p.cages));
        tries += p.tries;
        list.push(p);
      }
      if (log) log(band + ' ' + N + 'x' + N + ': ' + per + ' puzzles, ' + tries + ' attempts, ' + (Date.now() - t0) + ' ms');
    }
    list.sort((a, b) => a.n - b.n || a.score - b.score || (encode(a) < encode(b) ? -1 : 1));
    bank[band] = list.map(encode);
  }
  return bank;
}

// The data file. Keep it plain: data only, loaded after all of src/js (CONTRIBUTING 3.3).
function fileText(bank, seed) {
  const lines = [];
  lines.push('/* MathDoku banks (P3-04, BRAIN_TEASERS 5.2). GENERATED by `node tools/puzzles/build-banks.js mathdoku` from seed \'' + seed + '\':');
  lines.push('   do not edit by hand; change the generator (tools/puzzles/mathdoku.js) and rerun it. Same seed, same file, byte for byte.');
  lines.push('   PUZ.mathdoku[band] = [36 puzzles]: band B 3x3 (+), C 4x4 (+ - *), D 5x5 then 6x6 (+ - * /), sorted by difficulty score');
  lines.push('   (D: the 18 5x5 first), so level L (1-12) is entries 3(L-1) to 3L-1. Each puzzle is \'N|cages|solution|grade|score\':');
  lines.push('   cages comma-separated, each = its cells (one base-36 character per cell index, row * N + col, ascending; the first is');
  lines.push('   the top-left cell, where the label goes) + operation (+ - * / or = for a single given cell) + target, e.g. \'01+3\';');
  lines.push('   solution = N*N digits in reading order; grade = hardest technique of the cage-aware grader in tools/puzzles/mathdoku.js');
  lines.push('   (1 last cell, 2 cage single, 3 hidden single, 4 cage in a line, 5 naked pair); score = solver nodes x 1000 + effort.');
  lines.push('   Every puzzle has exactly one solution (tools/test.js proves it with its own counter). PUZ is shared by all puzzle banks. */');
  lines.push('var PUZ = PUZ || {};');
  lines.push('PUZ.mathdoku = {');
  for (const band of ORDER) {
    lines.push('  ' + band + ': [');
    for (const e of bank[band]) lines.push('    \'' + e + '\',');
    lines.push('  ],');
  }
  lines.push('};');
  return lines.join('\n') + '\n';
}

module.exports = {
  BANDS, ORDER, PER_BAND, TECH, NOT_SOLVED, MAX_MUL, makePuzzle, genSlot, buildBank, problemOf, grade, score, encode, decode,
  canon, bankKey, fileText, calc, SYMS, partition,
};
