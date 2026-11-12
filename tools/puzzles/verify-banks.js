'use strict';
// Re-checks every stored puzzle in the committed banks (P3-02, BRAIN_TEASERS 6). Called from tools/test.js; also runs alone:
//   node tools/puzzles/verify-banks.js
//
// Uniqueness is proved with countSimple() below: a plain backtracking counter that shares no code with csp.js (the solver
// the generator uses), so a bug in the generator's solver cannot hide a bad puzzle. The grade is re-computed with human.js.
//
// MathDoku (P3-04) is checked the same way with countCages(), its own plain cage counter.
// Logic grids (P3-06) with countLogic(), which tries every assignment with its own clue reading (not logic.js's holds()).
//
// Exports: loadBank(file) -> the PUZ object the data file builds; verifySudoku(bank) -> {problems, counts};
//          countSimple(givens, n, bw, bh, limit); verifyMathdoku(bank) -> {problems, counts}; countCages(N, cages, limit);
//          verifyLogic(bank) -> {problems, counts}; countLogic(p, clues, limit) -> {count, first}

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const human = require('./human');
const sudoku = require('./sudoku');
const mathdoku = require('./mathdoku');
const logic = require('./logic');

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

// Number of solutions of an N x N MathDoku, stopping at `limit`. cages: [{cells, op, t}] (op '=' is a given cell).
// Cells are filled in reading order; a value must be new in its row and column, and when it completes a cage the cage's
// arithmetic must give the target (a + or * cage is also cut off early once its partial sum or product overshoots).
// Shares no code with csp.js or mathdoku.js.
function countCages(N, cages, limit) {
  const g = new Array(N * N).fill(0);
  const cageOf = [];
  cages.forEach((cg, i) => cg.cells.forEach(c => (cageOf[c] = i)));
  const value = (op, vals) => {
    if (op === '+' || op === '=') return vals.reduce((a, v) => a + v, 0);
    if (op === '*') return vals.reduce((a, v) => a * v, 1);
    const [a, b] = vals[0] > vals[1] ? vals : [vals[1], vals[0]];
    if (op === '-') return a - b;
    return a % b ? -1 : a / b;
  };
  const ok = c => {
    const cg = cages[cageOf[c]];
    const vals = cg.cells.map(x => g[x]).filter(v => v);
    if (vals.length === cg.cells.length) return value(cg.op, vals) === cg.t;
    if (cg.op === '+') return value('+', vals) < cg.t;
    if (cg.op === '*') return cg.t % value('*', vals) === 0;
    return true;
  };
  let count = 0;
  const rec = c => {
    if (c === N * N) {
      count++;
      return;
    }
    const r = Math.floor(c / N);
    const k = c % N;
    for (let v = 1; v <= N && count < limit; v++) {
      let clash = false;
      for (let j = 0; j < N; j++) if (g[r * N + j] === v || g[j * N + k] === v) clash = true;
      if (clash) continue;
      g[c] = v;
      if (ok(c)) rec(c + 1);
      g[c] = 0;
    }
  };
  rec(0);
  return count;
}

function verifyMathdoku(bank) {
  const problems = [];
  const bad = (where, m) => {
    if (problems.length < 60) problems.push(where + ': ' + m);
  };
  const counts = {};
  const seen = new Map();
  if (!bank || typeof bank !== 'object') return {problems: ['PUZ.mathdoku missing'], counts};
  const re = /^([3-6])\|((?:[0-9a-z]+[-+*/=]\d+,)*[0-9a-z]+[-+*/=]\d+)\|([1-6]+)\|([1-5])\|(\d+)$/;
  for (const band of mathdoku.ORDER) {
    const spec = mathdoku.BANDS[band];
    const list = bank[band];
    counts[band] = Array.isArray(list) ? list.length : 0;
    if (!Array.isArray(list) || list.length !== mathdoku.PER_BAND) {
      bad(band, 'expected ' + mathdoku.PER_BAND + ' puzzles, found ' + (list ? list.length : 'none'));
      if (!Array.isArray(list)) continue;
    }
    const per = mathdoku.PER_BAND / spec.sizes.length;
    let prev = null;
    list.forEach((str, i) => {
      const at = band + ' #' + i;
      if (typeof str !== 'string' || !re.test(str)) return bad(at, 'bad format: ' + str);
      const p = mathdoku.decode(str);
      const N = p.n;
      // grid size: band D holds the 5x5 puzzles first, then the 6x6
      if (N !== spec.sizes[Math.min(Math.floor(i / per), spec.sizes.length - 1)]) bad(at, N + 'x' + N + ' is not the size for this place in band ' + band);
      if (p.solution.length !== N * N) return bad(at, 'solution has ' + p.solution.length + ' cells');
      // the solution is a Latin square
      for (let r = 0; r < N; r++) {
        const row = new Set();
        const col = new Set();
        for (let c = 0; c < N; c++) {
          row.add(p.solution[r * N + c]);
          col.add(p.solution[c * N + r]);
        }
        if (row.size !== N || col.size !== N || p.solution.some(v => v < 1 || v > N)) {
          bad(at, 'solution is not a Latin square');
          break;
        }
      }
      // cages: cover every cell once, ascending cells, ordered by first cell, connected, band sizes and operations
      const owner = new Array(N * N).fill(-1);
      let singles = 0;
      let broken = false; // the cage layout itself is wrong: skip the solving checks
      p.cages.forEach((cg, k) => {
        const where = at + ' cage ' + str.split('|')[1].split(',')[k];
        for (const c of cg.cells) {
          if (c >= N * N) bad(where, 'cell ' + c + ' outside the grid');
          else if (owner[c] >= 0) bad(where, 'cell ' + c + ' is in two cages');
          else owner[c] = k;
          if (c >= N * N || owner[c] !== k) broken = true;
        }
        if (cg.cells.some((c, j) => j && c <= cg.cells[j - 1])) bad(where, 'cells not ascending');
        if (k && cg.cells[0] <= p.cages[k - 1].cells[0]) bad(where, 'cages not ordered by first cell');
        const set = new Set(cg.cells);
        const reach = new Set([cg.cells[0]]);
        const stack = [cg.cells[0]];
        while (stack.length) {
          const c = stack.pop();
          for (const d of [c - N, c + N, c % N ? c - 1 : -1, (c + 1) % N ? c + 1 : -1]) if (set.has(d) && !reach.has(d)) reach.add(d), stack.push(d);
        }
        if (reach.size !== cg.cells.length) bad(where, 'cage cells are not connected');
        const m = cg.cells.length;
        if (m > spec.maxCage) bad(where, 'cage of ' + m + ' cells, band allows ' + spec.maxCage);
        if (cg.op === '=') singles++;
        else if (!spec.ops.includes(cg.op)) bad(where, 'operation ' + cg.op + ' not allowed in band ' + band);
        if ((cg.op === '=') !== (m === 1)) bad(where, 'a single cell must be = and only a single cell');
        if ((cg.op === '-' || cg.op === '/') && m !== 2) bad(where, cg.op + ' needs exactly 2 cells');
        const vals = cg.cells.map(c => p.solution[c]);
        if (mathdoku.calc(cg.op, vals) !== cg.t) bad(where, 'target ' + cg.t + ' but the solution gives ' + mathdoku.calc(cg.op, vals));
        if (cg.op === '*' && cg.t > mathdoku.MAX_MUL) bad(where, 'product over ' + mathdoku.MAX_MUL);
      });
      if (owner.some(o => o < 0)) {
        bad(at, 'some cells are in no cage');
        broken = true;
      }
      if (singles < spec.single[0] || singles > spec.single[1]) bad(at, singles + ' single-cell cages, band allows ' + spec.single.join('-'));
      if (broken) return;
      // exactly one solution (independent counter)
      const sols = countCages(N, p.cages, 2);
      if (sols !== 1) bad(at, sols + ' solutions');
      // grade and score match the grader; sorted by score inside each grid size
      const g = mathdoku.grade(N, p.cages);
      if (!g.solved) bad(at, 'human-style grader cannot finish it');
      else if (g.grid.join('') !== p.solution.join('')) bad(at, 'grader finished a different grid');
      if (g.grade !== p.grade) bad(at, 'stored grade ' + p.grade + ', grader says ' + g.grade);
      const sc = mathdoku.score(N, p.cages, g);
      if (sc !== p.score) bad(at, 'stored score ' + p.score + ', computed ' + sc);
      if (prev && prev.n === N && prev.score > p.score) bad(at, 'not sorted by score');
      prev = p;
      const key = mathdoku.bankKey(N, p.cages);
      if (seen.has(key)) bad(at, 'same puzzle as ' + seen.get(key) + ' (up to rotation and mirror)');
      else seen.set(key, at);
    });
  }
  return {problems, counts};
}

// Number of ways to match a logic grid (decoded puzzle p: n children, K categories, O = the ordered category or 0) that
// make every clue in `clues` true, stopping at `limit`; `first` is the first one found (per category, each child's item).
// Tries every assignment, category by category and child by child. Shares no code with logic.js.
function countLogic(p, clues, limit) {
  const {n, K, O} = p;
  const has = [null];
  for (let c = 1; c <= K; c++) has.push(new Array(n).fill(-1));
  const who = (c, i) => (c === 0 ? i : has[c].indexOf(i)); // the child that entity (c, i) is
  const val = (e, d) => (d === 0 ? who(e[0], e[1]) : has[d][who(e[0], e[1])]); // that child's item in category d
  const ok = q => {
    if (q.k === 'is') return who(...q.a) === who(...q.b);
    if (q.k === 'not') return who(...q.a) !== who(...q.b);
    if (q.k === 'or') return q.j.includes(val(q.a, q.d));
    const x = val(q.a, O);
    const y = val(q.b, O);
    if (q.k === 'gt') return x > y;
    if (q.k === 'lt') return x < y;
    if (q.k === 'nx') return x - y === 1 || y - x === 1;
    return false;
  };
  let count = 0;
  let first = null;
  const fill = (c, kid, used) => {
    if (count >= limit) return;
    if (c > K) {
      if (clues.every(ok)) {
        count++;
        if (!first) first = has.slice(1).map(r => r.slice());
      }
      return;
    }
    if (kid === n) return fill(c + 1, 0, 0);
    for (let i = 0; i < n; i++) {
      if (used & (1 << i)) continue;
      has[c][kid] = i;
      fill(c, kid + 1, used | (1 << i));
    }
    has[c][kid] = -1;
  };
  fill(1, 0, 0);
  return {count, first};
}

function verifyLogic(bank) {
  const problems = [];
  const bad = (where, m) => {
    if (problems.length < 60) problems.push(where + ': ' + m);
  };
  const counts = {};
  const seen = new Map();
  if (!bank || typeof bank !== 'object') return {problems: ['PUZ.logic missing'], counts};
  // the category table: every category a puzzle uses, with its label, ordered flag and pictures as in logic.js
  const cats = bank.cats || {};
  for (const [id, c] of Object.entries(cats)) {
    const v = logic.CATS[id];
    if (!v) {
      bad('cats', 'unknown category ' + id);
      continue;
    }
    if (c.label !== v.label || !!c.ordered !== !!v.ordered) bad('cats', id + ' label or ordered flag differs from logic.js');
    const pics = {};
    for (const it of v.items) if (it.pic) pics[it.w] = it.pic;
    if (JSON.stringify(c.pics || {}) !== JSON.stringify(pics)) bad('cats', id + ' pictures differ from logic.js');
  }
  const headRe = /^[A-Z][a-z]+(,[A-Z][a-z]+)+\|[a-z]+=[a-z0-9]+(,[a-z0-9]+)+(;[a-z]+=[a-z0-9]+(,[a-z0-9]+)+)*\|\d+(;\d+)*\|[1-5]\|\d+$/;
  for (const band of logic.ORDER) {
    const spec = logic.BANDS[band];
    const list = bank[band];
    counts[band] = Array.isArray(list) ? list.length : 0;
    if (!Array.isArray(list) || list.length !== logic.PER_BAND) {
      bad(band, 'expected ' + logic.PER_BAND + ' puzzles, found ' + (list ? list.length : 'none'));
      if (!Array.isArray(list)) continue;
    }
    let prev = null;
    list.forEach((entry, idx) => {
      const at = band + ' #' + idx;
      if (!Array.isArray(entry) || typeof entry[0] !== 'string' || !headRe.test(entry[0])) {
        return bad(at, 'bad head: ' + JSON.stringify(entry && entry[0]));
      }
      const p = logic.decode(entry);
      const {n, K} = p;
      // children: the band's number, known names, different first letters
      if (n !== spec.n) bad(at, n + ' children, band needs ' + spec.n);
      if (p.names.some(x => !logic.NAMES.includes(x))) bad(at, 'a name not in the name list');
      if (new Set(p.names.map(x => x[0])).size !== n) bad(at, 'two names start with the same letter');
      // categories for the band, items known, different, in vocabulary order (ordered categories: all, in order)
      if (K !== spec.K) return bad(at, K + ' categories, band needs ' + spec.K);
      let broken = false;
      p.cats.forEach((c, k) => {
        const v = logic.CATS[c];
        if (!v || !cats[c]) {
          bad(at, 'category ' + c + ' unknown or missing from PUZ.logic.cats');
          broken = true;
          return;
        }
        const it = p.items[k];
        if (it.length !== n || it.some(i => i < 0) || it.some((i, j) => j && i <= it[j - 1])) {
          bad(at, c + ' items unknown, repeated or out of order');
          broken = true;
        }
        if (v.ordered && it.join() !== [...Array(n).keys()].join()) bad(at, c + ' must list all its items in order');
        const s = p.sol[k] || [];
        if (s.length !== n || [...s].sort().join() !== [...Array(n).keys()].join()) {
          bad(at, c + ' solution is not one item per child');
          broken = true;
        }
      });
      const allowed =
        band === 'B' ? logic.PICTURE.includes(p.cats[0])
          : band === 'C' ? p.cats.every(c => logic.UNORDERED.includes(c)) && p.cats[0] !== p.cats[1] &&
            !logic.CLASH.some(([x, y]) => p.cats.includes(x) && p.cats.includes(y))
            : logic.UNORDERED.includes(p.cats[0]) && logic.ORDERED.includes(p.cats[1]);
      if (!allowed) bad(at, 'categories ' + p.cats.join(',') + ' not allowed in band ' + band);
      if (broken) return;
      // clues: kinds and indexes allowed for the band, true of the stored solution, sentence = render(), short enough
      const kinds = band === 'D' ? ['is', 'not', 'or', 'gt', 'lt', 'nx'] : ['is', 'not'];
      const inRange = (c, i) => Number.isInteger(c) && c >= 0 && c <= K && Number.isInteger(i) && i >= 0 && i < n;
      const solve = {n, K, O: p.O};
      const truth = countLogic(solve, [], 1e9).count; // n!^K assignments
      if (truth !== (n === 3 ? 6 : 24) ** K) bad(at, 'own counter sees ' + truth + ' assignments');
      let cluesOk = true;
      p.clues.forEach((q, x) => {
        const cw = at + ' clue ' + (x + 1);
        const raw = entry[x + 1];
        if (!kinds.includes(q.k)) return (cluesOk = false), bad(cw, 'kind ' + q.k + ' not allowed in band ' + band);
        if (raw.length !== (q.k === 'or' ? 7 : 6)) return (cluesOk = false), bad(cw, 'wrong length');
        if (q.k === 'or') {
          if (!inRange(...q.a) || !inRange(q.d, q.j[0]) || !inRange(q.d, q.j[1]) || q.d === q.a[0] || q.j[0] === q.j[1]) {
            return (cluesOk = false), bad(cw, 'bad indexes');
          }
        } else {
          const sameEnt = q.a[0] === q.b[0] && q.a[1] === q.b[1];
          if (!inRange(...q.a) || !inRange(...q.b) || sameEnt) return (cluesOk = false), bad(cw, 'bad indexes');
          if ((q.k === 'is' || q.k === 'not') && q.a[0] === q.b[0]) return (cluesOk = false), bad(cw, 'is/not inside one category');
          if (band === 'B' && q.a[0] !== 0) bad(cw, 'band B clues name a child first');
          if (q.k !== 'is' && q.k !== 'not' && (q.a[0] === p.O || q.b[0] === p.O)) {
            return (cluesOk = false), bad(cw, 'comparison of an ordered item');
          }
        }
        const one = {n, K, O: p.O};
        const f = countLogic(one, [q], 1e9);
        // the clue holds in the stored solution: count with the solution fixed as an extra "is" for every child and item
        const fixed = [];
        for (let c = 1; c <= K; c++) for (let i = 0; i < n; i++) fixed.push({k: 'is', a: [0, i], b: [c, p.sol[c - 1][i]]});
        if (countLogic(one, [...fixed, q], 2).count !== 1) bad(cw, 'not true of the stored solution: ' + q.text);
        if (!f.count) bad(cw, 'never true');
        if (q.text !== logic.render(p, q)) bad(cw, 'sentence "' + q.text + '" is not "' + logic.render(p, q) + '"');
        const w = logic.words(q.text).length;
        if (w > logic.MAX_WORDS[band]) bad(cw, w + ' words, band allows ' + logic.MAX_WORDS[band]);
      });
      if (!cluesOk) return;
      const m = p.clues.length;
      if (m < spec.clues[0] || m > spec.clues[1]) bad(at, m + ' clues, band allows ' + spec.clues.join('-'));
      const link = q => (q.k === 'is' || q.k === 'not') && q.a[0] && q.b[0];
      if (spec.needLink && !p.clues.some(link)) bad(at, 'no link clue between the two categories');
      if (spec.needOrder && !p.clues.some(q => ['gt', 'lt', 'nx'].includes(q.k))) bad(at, 'no comparison or one-apart clue');
      // exactly one solution (independent counter), the stored one; no clue can be left out
      const solKey = p.sol.map(r => r.join('')).join(';');
      const all = countLogic({n, K, O: p.O}, p.clues, 2);
      if (all.count !== 1) bad(at, all.count + ' solutions');
      else if (all.first.map(r => r.join('')).join(';') !== solKey) bad(at, 'the only solution is not the stored one');
      p.clues.forEach((q, x) => {
        const without = countLogic({n, K, O: p.O}, p.clues.filter(y => y !== q), 2).count;
        if (without < 2) bad(at + ' clue ' + (x + 1), 'redundant: the puzzle is unique without it');
      });
      // grade and score match the grader, which finishes on the stored solution; band limits; sorted by score
      const g = logic.grade(p);
      if (!g.solved) bad(at, 'human-style grader cannot finish it');
      else if (logic.solutionOf(g.st, n, K).map(r => r.join('')).join(';') !== solKey) bad(at, 'grader finished a different grid');
      if (g.grade !== p.grade) bad(at, 'stored grade ' + p.grade + ', grader says ' + g.grade);
      if (logic.score(g) !== p.score) bad(at, 'stored score ' + p.score + ', computed ' + logic.score(g));
      if (p.grade > spec.maxGrade) bad(at, 'grade ' + p.grade + ' over the band limit ' + spec.maxGrade);
      if (g.chains > spec.chains) bad(at, g.chains + ' chains, band allows ' + spec.chains);
      if (prev && prev.score > p.score) bad(at, 'not sorted by score');
      prev = p;
      const key = logic.bankKey(p);
      if (seen.has(key)) bad(at, 'same puzzle as ' + seen.get(key) + ' (children renamed)');
      else seen.set(key, at);
    });
  }
  return {problems, counts};
}

if (require.main === module) {
  let fails = 0;
  const report = (name, r) => {
    console.log(name + ': ' + Object.entries(r.counts).map(([k, v]) => k + ' ' + v).join(', '));
    for (const p of r.problems) console.log('  - ' + p);
    console.log(r.problems.length ? 'FAIL: ' + r.problems.length + ' problems' : name + ' bank OK');
    fails += r.problems.length;
  };
  report('sudoku', verifySudoku((loadBank('d-puz-sudoku.js') || {}).sudoku));
  report('mathdoku', verifyMathdoku((loadBank('d-puz-mathdoku.js') || {}).mathdoku));
  report('logic', verifyLogic((loadBank('d-puz-logic.js') || {}).logic));
  process.exitCode = fails ? 1 : 0;
}

module.exports = {loadBank, verifySudoku, countSimple, verifyMathdoku, countCages, verifyLogic, countLogic};
