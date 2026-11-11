'use strict';
// Human-style sudoku grader (P3-02, BRAIN_TEASERS 5.1 step 4 and 6). Dev-time only.
// Solves the way a child would, one step at a time, always with the easiest technique that makes progress, and reports the
// hardest technique it needed. Works on any "houses" puzzle (rows, columns, boxes or jigsaw regions of N cells holding 1..N
// once each), so a jigsaw or other variant needs only its own house list.
//
//   const human = require('./human');
//   const r = human.grade({size: 9, houses: csp.sudokuGroups(9, 3, 3), givens: [0, 5, ...]});
//   r.solved  -> true when the techniques below finish the grid (false = it would need guessing or a harder technique)
//   r.grade   -> hardest technique used (an index into human.TECH, 1..5; 0 when nothing was empty; 99 when not solved)
//   r.grid    -> the grid as far as it got (n values, 0 = still empty)
//   r.used    -> {technique index: steps that used it}
//   r.steps   -> [{t, cell, v}] for placements, [{t, elim: [[cell, v], ...]}] for eliminations, in order
//
// Techniques, easiest first (the grade is the index):
//   1 last cell          a house with one empty cell: it takes the missing value (needs no candidate thinking)
//   2 naked single       a cell where only one value is not already in its row, column or box
//   3 hidden single      a value that fits in only one cell of a house
//   4 locked candidates  in house A a value's cells all lie inside house B too, so it leaves the rest of B
//                        (pointing and claiming are both this, for any two houses that overlap in 2 or more cells)
//   5 naked pair         two cells of a house with the same two candidates: those two values leave the rest of the house
// Candidates are the values not seen in a cell's houses, minus eliminations made by techniques 4 and 5.

const TECH = [null, 'last cell', 'naked single', 'hidden single', 'locked candidates', 'naked pair'];
const NOT_SOLVED = 99;

const pop = m => {
  let c = 0;
  while (m) {
    m &= m - 1;
    c++;
  }
  return c;
};
const bitIndex = b => 31 - Math.clz32(b);

function grade(p) {
  const size = p.size;
  const full = (1 << size) - 1;
  const houses = p.houses.filter(h => h.length === size);
  const n = p.givens.length;
  const grid = Array.from(p.givens);
  const housesOf = Array.from({length: n}, () => []);
  houses.forEach((h, i) => h.forEach(c => housesOf[c].push(i)));
  const peers = Array.from({length: n}, (_, c) => {
    const s = new Set();
    for (const hi of housesOf[c]) for (const q of houses[hi]) if (q !== c) s.add(q);
    return [...s].sort((a, b) => a - b);
  });
  // overlapping house pairs for locked candidates: [a, b, inter (Set)]
  const overlaps = [];
  for (let a = 0; a < houses.length; a++) {
    for (let b = 0; b < houses.length; b++) {
      if (a === b) continue;
      const hb = new Set(houses[b]);
      const inter = houses[a].filter(c => hb.has(c));
      if (inter.length >= 2 && inter.length < size) overlaps.push([a, b, new Set(inter)]);
    }
  }
  const cand = new Array(n).fill(0);
  for (let c = 0; c < n; c++) {
    if (grid[c]) continue;
    let m = full;
    for (const q of peers[c]) if (grid[q]) m &= ~(1 << (grid[q] - 1));
    cand[c] = m;
  }
  const steps = [];
  const used = {};
  let top = 0;
  let broken = false;
  const note = t => {
    used[t] = (used[t] || 0) + 1;
    if (t > top) top = t;
  };
  const place = (c, v, t) => {
    if (!(cand[c] & (1 << (v - 1)))) broken = true; // the value is not a candidate: givens contradict
    grid[c] = v;
    cand[c] = 0;
    const b = 1 << (v - 1);
    for (const q of peers[c]) cand[q] &= ~b;
    steps.push({t, cell: c, v});
    note(t);
    return true;
  };
  const eliminate = (list, t) => {
    for (const [c, v] of list) cand[c] &= ~(1 << (v - 1));
    steps.push({t, elim: list});
    note(t);
    return true;
  };

  const lastCell = () => {
    for (const h of houses) {
      let empty = -1;
      let count = 0;
      let seen = 0;
      for (const c of h) {
        if (grid[c]) seen |= 1 << (grid[c] - 1);
        else {
          empty = c;
          count++;
        }
      }
      if (count === 1) {
        const miss = full & ~seen;
        if (pop(miss) !== 1) {
          broken = true;
          return false;
        }
        return place(empty, bitIndex(miss) + 1, 1);
      }
    }
    return false;
  };
  const nakedSingle = () => {
    for (let c = 0; c < n; c++) if (!grid[c] && pop(cand[c]) === 1) return place(c, bitIndex(cand[c]) + 1, 2);
    return false;
  };
  const hiddenSingle = () => {
    for (const h of houses) {
      for (let v = 1; v <= size; v++) {
        const b = 1 << (v - 1);
        let where = -1;
        let count = 0;
        let placed = false;
        for (const c of h) {
          if (grid[c] === v) placed = true;
          else if (!grid[c] && cand[c] & b) {
            where = c;
            count++;
          }
        }
        if (!placed && count === 1) return place(where, v, 3);
      }
    }
    return false;
  };
  const lockedCandidates = () => {
    for (const [a, b, inter] of overlaps) {
      for (let v = 1; v <= size; v++) {
        const bit = 1 << (v - 1);
        let inside = 0;
        let outside = 0;
        for (const c of houses[a]) {
          if (grid[c] || !(cand[c] & bit)) continue;
          if (inter.has(c)) inside++;
          else outside++;
        }
        if (!inside || outside) continue;
        const elim = [];
        for (const c of houses[b]) if (!inter.has(c) && !grid[c] && cand[c] & bit) elim.push([c, v]);
        if (elim.length) return eliminate(elim, 4);
      }
    }
    return false;
  };
  const nakedPair = () => {
    for (const h of houses) {
      for (let i = 0; i < h.length; i++) {
        const ci = h[i];
        if (grid[ci] || pop(cand[ci]) !== 2) continue;
        for (let j = i + 1; j < h.length; j++) {
          const cj = h[j];
          if (grid[cj] || cand[cj] !== cand[ci]) continue;
          const m = cand[ci];
          const elim = [];
          for (const c of h) {
            if (c === ci || c === cj || grid[c]) continue;
            for (let v = 1; v <= size; v++) if (cand[c] & m & (1 << (v - 1))) elim.push([c, v]);
          }
          if (elim.length) return eliminate(elim, 5);
        }
      }
    }
    return false;
  };
  const techniques = [lastCell, nakedSingle, hiddenSingle, lockedCandidates, nakedPair];

  for (;;) {
    if (broken) break;
    if (grid.every(v => v)) break;
    if (grid.some((v, c) => !v && !cand[c])) {
      broken = true;
      break;
    }
    let moved = false;
    for (const t of techniques) {
      if (t()) {
        moved = true;
        break;
      }
    }
    if (!moved) break;
  }
  const solved = !broken && grid.every(v => v);
  return {solved, grade: solved ? top : NOT_SOLVED, grid, used, steps};
}

module.exports = {grade, TECH, NOT_SOLVED};
