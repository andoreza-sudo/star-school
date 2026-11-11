'use strict';
// Re-checks every stored puzzle in the committed banks (P3-02, BRAIN_TEASERS 6). Called from tools/test.js; also runs alone:
//   node tools/puzzles/verify-banks.js
//
// Uniqueness is proved with countSimple() below: a plain backtracking counter that shares no code with csp.js (the solver
// the generator uses), so a bug in the generator's solver cannot hide a bad puzzle. The grade is re-computed with human.js.
//
// Exports: loadBank(file) -> the PUZ object the data file builds; verifySudoku(bank) -> {problems, counts};
//          countSimple(givens, n, bw, bh, limit)

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const human = require('./human');
const sudoku = require('./sudoku');

const DATA = path.join(__dirname, '..', '..', 'src', 'data');

// Evaluate a data file on its own, the way the app does (plain script, global PUZ).
function loadBank(file) {
  const ctx = {};
  vm.runInNewContext(fs.readFileSync(path.join(DATA, file), 'utf8'), ctx, {filename: file});
  return ctx.PUZ;
}

// Number of solutions of an n x n sudoku with boxes of bw columns x bh rows, stopping at `limit`.
// Fills the empty cell with the fewest possible values first (only to keep 9x9 fast); every value is checked against
// its row, column and box by scanning the grid.
function countSimple(givens, n, bw, bh, limit) {
  const g = givens.slice();
  const fits = (i, v) => {
    const r = Math.floor(i / n);
    const c = i % n;
    for (let k = 0; k < n; k++) if (g[r * n + k] === v || g[k * n + c] === v) return false;
    const r0 = r - (r % bh);
    const c0 = c - (c % bw);
    for (let rr = r0; rr < r0 + bh; rr++) for (let cc = c0; cc < c0 + bw; cc++) if (g[rr * n + cc] === v) return false;
    return true;
  };
  let count = 0;
  const rec = () => {
    let best = -1;
    let bestVals = null;
    for (let i = 0; i < n * n; i++) {
      if (g[i]) continue;
      const vals = [];
      for (let v = 1; v <= n; v++) if (fits(i, v)) vals.push(v);
      if (!vals.length) return;
      if (best < 0 || vals.length < bestVals.length) {
        best = i;
        bestVals = vals;
      }
      if (vals.length === 1) break;
    }
    if (best < 0) {
      count++;
      return;
    }
    for (const v of bestVals) {
      g[best] = v;
      rec();
      g[best] = 0;
      if (count >= limit) return;
    }
  };
  rec();
  return count;
}

// Rows, columns and boxes as cell lists (written out here, not taken from csp.js).
function units(n, bw, bh) {
  const u = [];
  for (let r = 0; r < n; r++) u.push([...Array(n).keys()].map(c => r * n + c));
  for (let c = 0; c < n; c++) u.push([...Array(n).keys()].map(r => r * n + c));
  for (let br = 0; br < n; br += bh) {
    for (let bc = 0; bc < n; bc += bw) {
      const box = [];
      for (let r = br; r < br + bh; r++) for (let c = bc; c < bc + bw; c++) box.push(r * n + c);
      u.push(box);
    }
  }
  return u;
}

function verifySudoku(bank) {
  const problems = [];
  const bad = (where, m) => {
    if (problems.length < 60) problems.push(where + ': ' + m);
  };
  const counts = {};
  const seen = new Map();
  if (!bank || typeof bank !== 'object') return {problems: ['PUZ.sudoku missing'], counts};
  const want = require('./build-banks').TYPES.sudoku.count;
  for (const band of sudoku.ORDER) {
    const spec = sudoku.BANDS[band];
    const b = bank[band];
    if (!b) {
      bad(band, 'band missing');
      continue;
    }
    if (b.n !== spec.n || b.bw !== spec.bw || b.bh !== spec.bh) bad(band, 'n/bw/bh ' + [b.n, b.bw, b.bh] + ' expected ' + [spec.n, spec.bw, spec.bh]);
    const {n, bw, bh} = spec;
    const us = units(n, bw, bh);
    const sym = new RegExp('^[1-' + n + ']$');
    const cellRe = new RegExp('^[.1-' + n + ']{' + n * n + '}\\|[1-' + n + ']{' + n * n + '}\\|[1-5]$');
    for (const tier of sudoku.TIERS) {
      const list = b[tier];
      const [target, lo, hi] = spec.tiers[tier];
      counts[band + ' ' + tier] = list ? list.length : 0;
      if (!Array.isArray(list) || list.length !== want) bad(band + ' ' + tier, 'expected ' + want + ' puzzles, found ' + (list ? list.length : 'none'));
      (list || []).forEach((str, i) => {
        const at = band + ' ' + tier + ' #' + i;
        if (typeof str !== 'string' || !cellRe.test(str)) return bad(at, 'bad format: ' + str);
        const p = sudoku.decode(str, n);
        const given = p.givens.filter(v => v).length;
        if (given !== target) bad(at, given + ' givens, tier needs ' + target);
        // the solution is a full valid grid
        for (const u of us) {
          const vals = u.map(c => p.solution[c]).sort().join('');
          if (vals !== [...Array(n).keys()].map(k => k + 1).join('')) bad(at, 'solution breaks a row, column or box');
        }
        if (!p.solution.every(v => sym.test(String(v)))) bad(at, 'solution has a bad symbol');
        // givens agree with the solution and do not clash with each other
        p.givens.forEach((v, c) => {
          if (v && v !== p.solution[c]) bad(at, 'given at cell ' + c + ' differs from the solution');
        });
        for (const u of us) {
          const vals = u.map(c => p.givens[c]).filter(v => v);
          if (new Set(vals).size !== vals.length) bad(at, 'givens repeat a symbol in a row, column or box');
        }
        // 9x9 givens are symmetric under a half turn
        if (spec.sym && p.givens.some((v, c) => !v !== !p.givens[n * n - 1 - c])) bad(at, 'givens not symmetric');
        // exactly one solution (independent counter)
        const sols = countSimple(p.givens, n, bw, bh, 2);
        if (sols !== 1) bad(at, sols + ' solutions');
        // grade matches the human-style grader and the band allows it
        const g = human.grade({size: n, houses: us, givens: p.givens});
        if (!g.solved) bad(at, 'human-style grader cannot finish it');
        else if (g.grid.join('') !== p.solution.join('')) bad(at, 'grader finished a different grid');
        if (g.grade !== p.grade) bad(at, 'stored grade ' + p.grade + ', grader says ' + g.grade);
        if (p.grade < lo || p.grade > hi) bad(at, 'grade ' + p.grade + ' outside ' + lo + '-' + hi + ' for this tier');
        const key = sudoku.bankKey(p.givens, spec);
        if (seen.has(key)) bad(at, 'same puzzle as ' + seen.get(key) + ' (up to the runtime transforms)');
        else seen.set(key, at);
      });
    }
  }
  return {problems, counts};
}

if (require.main === module) {
  const r = verifySudoku((loadBank('d-puz-sudoku.js') || {}).sudoku);
  console.log(Object.entries(r.counts).map(([k, v]) => k + ' ' + v).join(', '));
  for (const p of r.problems) console.log('  - ' + p);
  console.log(r.problems.length ? 'FAIL: ' + r.problems.length + ' problems' : 'sudoku bank OK');
  process.exitCode = r.problems.length ? 1 : 0;
}

module.exports = {loadBank, verifySudoku, countSimple};
