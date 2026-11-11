'use strict';
// Sudoku generator and bank builder (P3-02, BRAIN_TEASERS 5.1). Dev-time only.
// Run through build-banks.js: `node tools/puzzles/build-banks.js sudoku` writes src/data/d-puz-sudoku.js.
//
// Steps for one puzzle (BRAIN_TEASERS 5.1 "Dev-time generator"):
//   1. fill a full valid grid by randomized backtracking (csp.solve with a seeded rng)
//   2. remove givens in random order (180-degree symmetric pairs for 9x9); after each removal count solutions (csp, stops at
//      2) and put the given back unless the count is exactly 1
//   3. stop at the tier's number of givens (start again with a new grid if the removals get stuck above it)
//   4. grade with the human-style solver (human.js); reject it if it cannot finish or needs a technique the band does not
//      allow (TIERS below). Band D hard must also need locked candidates or a naked pair, so it is harder than medium.
//   Duplicates are rejected too: for 4x4 and 6x6 two puzzles count as the same when one of the runtime transforms
//   (symbol relabel, row swaps in a band, band swaps, the same for columns, transpose) turns one into the other.
//
// Determinism: every bank slot (band, tier, index) has its own rng seeded with `${seed}|${band}|${tier}|${index}`, and the
// slots are generated in a fixed order, each avoiding the puzzles before it. genSlot() regenerates any one slot from the
// bank entries before it (tools/test.js does this for a sample).
//
// Exports: TIERS, BANDS, ORDER, makePuzzle(band, tier, rng), genSlot(seed, band, tier, index, avoid), buildBank(seed, count),
//          encode(p), decode(str, n), canon(givens, spec), bankKey(givens, spec), fileText(bank, seed), groupsFor(spec)

const csp = require('./csp');
const human = require('./human');
const {rng: makeRng} = require('./rng');

// Band specs: grid N, box bw columns x bh rows, and per tier the number of givens and the allowed grades (human.TECH index).
const TIERS = ['easy', 'medium', 'hard'];
const BANDS = {
  A: {n: 4, bw: 2, bh: 2, sym: false, tiers: {easy: [10, 1, 1], medium: [9, 1, 1], hard: [8, 1, 1]}},
  B: {n: 4, bw: 2, bh: 2, sym: false, tiers: {easy: [8, 1, 3], medium: [6, 1, 3], hard: [5, 1, 3]}},
  C: {n: 6, bw: 3, bh: 2, sym: false, tiers: {easy: [22, 1, 3], medium: [18, 1, 3], hard: [14, 1, 3]}},
  D: {n: 9, bw: 3, bh: 3, sym: true, tiers: {easy: [42, 1, 3], medium: [36, 1, 3], hard: [31, 4, 5]}},
};
// tiers[t] = [givens, lowest grade, highest grade]
const ORDER = ['A', 'B', 'C', 'D'];
const MAX_TRIES = 20000;

const groupCache = {};
function groupsFor(spec) {
  const key = spec.n + 'x' + spec.bw + 'x' + spec.bh;
  if (!groupCache[key]) groupCache[key] = csp.sudokuGroups(spec.n, spec.bw, spec.bh);
  return groupCache[key];
}

// One attempt at a puzzle for band/tier with the given rng. Returns {givens, solution, grade} or null.
function makePuzzle(band, tier, rng) {
  const spec = BANDS[band];
  const [target, lo, hi] = spec.tiers[tier];
  const N = spec.n;
  const cells = N * N;
  const groups = groupsFor(spec);
  const solution = csp.solve({n: cells, size: N, groups}, {rng});
  const givens = solution.slice();
  const prob = {n: cells, size: N, groups, givens};
  // removal units: single cells, or symmetric pairs (cell and its 180-degree twin; the centre cell alone)
  const units = [];
  for (let c = 0; c < cells; c++) {
    const twin = cells - 1 - c;
    if (!spec.sym) units.push([c]);
    else if (twin > c) units.push([c, twin]);
    else if (twin === c) units.push([c]);
  }
  rng.shuffle(units);
  let count = cells;
  for (const u of units) {
    if (count === target) break;
    if (count - u.length < target) continue;
    for (const c of u) givens[c] = 0;
    if (csp.countSolutions(prob, 2) === 1) count -= u.length;
    else for (const c of u) givens[c] = solution[c];
  }
  if (count !== target) return null;
  const g = human.grade({size: N, houses: groups, givens});
  if (!g.solved || g.grade < lo || g.grade > hi) return null;
  return {givens, solution, grade: g.grade};
}

// Canonical key of a puzzle under the runtime transforms (BRAIN_TEASERS 5.1 "Runtime variety"), for 4x4 and 6x6.
function permutations(a) {
  if (a.length <= 1) return [a.slice()];
  const out = [];
  a.forEach((x, i) => {
    for (const rest of permutations(a.slice(0, i).concat(a.slice(i + 1)))) out.push([x].concat(rest));
  });
  return out;
}
// all orders of N lines grouped in blocks of `per` lines: blocks permuted, lines permuted inside each block
function lineOrders(N, per) {
  const blocks = N / per;
  const inner = permutations(Array.from({length: per}, (_, i) => i));
  let out = [[]];
  for (const order of permutations(Array.from({length: blocks}, (_, i) => i))) {
    let partial = [[]];
    for (const b of order) {
      const next = [];
      for (const pre of partial) for (const p of inner) next.push(pre.concat(p.map(i => b * per + i)));
      partial = next;
    }
    out = out.concat(partial);
  }
  return out.filter(o => o.length === N);
}
const orderCache = {};
function canon(givens, spec) {
  const N = spec.n;
  const key = N + 'x' + spec.bw + 'x' + spec.bh;
  if (!orderCache[key]) orderCache[key] = {rows: lineOrders(N, spec.bh), cols: lineOrders(N, spec.bw)};
  const {rows, cols} = orderCache[key];
  let best = null;
  const tryGrid = g => {
    for (const ro of rows) {
      for (const co of cols) {
        const map = {};
        let next = 1;
        let s = '';
        for (const r of ro) {
          for (const c of co) {
            const v = g[r * N + c];
            if (!v) s += '.';
            else {
              if (!map[v]) map[v] = next++;
              s += map[v];
            }
          }
        }
        if (best === null || s < best) best = s;
      }
    }
  };
  tryGrid(givens);
  if (spec.bw === spec.bh) tryGrid(givens.map((_, i) => givens[(i % N) * N + Math.floor(i / N)]));
  return best;
}
function bankKey(givens, spec) {
  return spec.n <= 6 ? spec.n + ':' + canon(givens, spec) : spec.n + ':' + givens.join('');
}

// One bank slot. avoid: Set of bankKey()s of the puzzles before it. Returns {givens, solution, grade, tries}.
function genSlot(seed, band, tier, index, avoid) {
  const spec = BANDS[band];
  const rng = makeRng(seed + '|' + band + '|' + tier + '|' + index);
  for (let tries = 1; tries <= MAX_TRIES; tries++) {
    const p = makePuzzle(band, tier, rng);
    if (p && !avoid.has(bankKey(p.givens, spec))) return Object.assign(p, {tries});
  }
  throw new Error('sudoku: no puzzle for ' + band + ' ' + tier + ' ' + index + ' after ' + MAX_TRIES + ' tries');
}

const encode = p => p.givens.map(v => (v ? v : '.')).join('') + '|' + p.solution.join('') + '|' + p.grade;
function decode(str, n) {
  const [g, s, gr] = str.split('|');
  const cell = ch => (ch === '.' ? 0 : parseInt(ch, 36));
  return {givens: [...g].map(cell), solution: [...s].map(cell), grade: Number(gr), n};
}

// The whole bank: {A: {easy: [encoded, ...], medium, hard}, B, C, D}, `count` puzzles per band and tier.
function buildBank(seed, count, log) {
  const avoid = new Set();
  const bank = {};
  for (const band of ORDER) {
    bank[band] = {};
    for (const tier of TIERS) {
      bank[band][tier] = [];
      const t0 = Date.now();
      let tries = 0;
      for (let i = 0; i < count; i++) {
        const p = genSlot(seed, band, tier, i, avoid);
        avoid.add(bankKey(p.givens, BANDS[band]));
        tries += p.tries;
        bank[band][tier].push(encode(p));
      }
      if (log) log(band + ' ' + tier + ': ' + count + ' puzzles, ' + tries + ' attempts, ' + (Date.now() - t0) + ' ms');
    }
  }
  return bank;
}

// The data file. Keep it plain: data only, loaded after all of src/js (CONTRIBUTING 3.2).
function fileText(bank, seed) {
  const lines = [];
  lines.push('/* Sudoku banks (P3-02, BRAIN_TEASERS 5.1). GENERATED by `node tools/puzzles/build-banks.js sudoku` from seed \'' + seed + '\':');
  lines.push('   do not edit by hand; change the generator (tools/puzzles/sudoku.js) and rerun it. Same seed, same file, byte for byte.');
  lines.push('   PUZ.sudoku[band] = {n, bw, bh, easy: [...], medium: [...], hard: [...]}: band A 4x4 (pictures), B 4x4, C 6x6, D 9x9;');
  lines.push('   boxes are bw columns x bh rows. Each puzzle is \'givens|solution|grade\': n*n cells in reading order, \'.\' = empty,');
  lines.push('   symbols 1..n; grade = hardest technique the human-style grader (tools/puzzles/human.js) needs: 1 last empty cell,');
  lines.push('   2 naked single, 3 hidden single, 4 locked candidates, 5 naked pair. Every puzzle has exactly one solution, and');
  lines.push('   tools/test.js proves it with its own counter. PUZ is shared by all puzzle banks: never declare it with const or let. */');
  lines.push('var PUZ = PUZ || {};');
  lines.push('PUZ.sudoku = {');
  for (const band of ORDER) {
    const s = BANDS[band];
    lines.push('  ' + band + ': {n: ' + s.n + ', bw: ' + s.bw + ', bh: ' + s.bh + ',');
    for (const tier of TIERS) {
      lines.push('    ' + tier + ': [');
      for (const e of bank[band][tier]) lines.push('      \'' + e + '\',');
      lines.push('    ],');
    }
    lines.push('  },');
  }
  lines.push('};');
  return lines.join('\n') + '\n';
}

module.exports = {TIERS, BANDS, ORDER, makePuzzle, genSlot, buildBank, encode, decode, canon, bankKey, fileText, groupsFor};
