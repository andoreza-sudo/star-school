'use strict';
// Writes the pre-verified puzzle banks into src/data/d-puz-<type>.js (P3-02, BRAIN_TEASERS 6). Dev-time only.
//
//   node tools/puzzles/build-banks.js            all types
//   node tools/puzzles/build-banks.js sudoku     one type (sudoku, mathdoku, logic, robot)
//   node tools/puzzles/build-banks.js --check    regenerate in memory and compare with the committed files (exit 1 if different)
//
// Each type has a fixed seed, so the same generator gives the same file byte for byte. The files are committed: a normal
// build needs no Node step. Regenerate only when a generator changes, then run `node tools/test.js` (it re-verifies every
// puzzle through verify-banks.js). A new puzzle type adds its entry to TYPES (P3-04 mathdoku, P3-06 logic, P3-13 robot).

const fs = require('fs');
const path = require('path');
const sudoku = require('./sudoku');
const mathdoku = require('./mathdoku');
const logic = require('./logic');
const robot = require('./robot');

const DATA = path.join(__dirname, '..', '..', 'src', 'data');

const TYPES = {
  sudoku: {
    file: 'd-puz-sudoku.js',
    seed: 'star-school-sudoku-1',
    count: 20, // puzzles per band and tier: 4 bands x 3 tiers x 20 = 240 (BRAIN_TEASERS 5.1 step 5)
    text(log) {
      return sudoku.fileText(sudoku.buildBank(this.seed, this.count, log), this.seed);
    },
  },
  mathdoku: {
    file: 'd-puz-mathdoku.js',
    seed: 'star-school-mathdoku-1',
    count: mathdoku.PER_BAND, // puzzles per band: 3 bands x 36 = 108 (BRAIN_TEASERS 5.2 step 6; band D 18 of 5x5 + 18 of 6x6)
    text(log) {
      return mathdoku.fileText(mathdoku.buildBank(this.seed, log), this.seed);
    },
  },
  logic: {
    file: 'd-puz-logic.js',
    seed: 'star-school-logic-1',
    count: logic.PER_BAND, // puzzles per band: 3 bands x 36 = 108 (BRAIN_TEASERS 5.3 step 6)
    text(log) {
      return logic.fileText(logic.buildBank(this.seed, log), this.seed);
    },
  },
  robot: {
    file: 'd-puz-robot.js',
    seed: 'star-school-robot-1',
    count: robot.PER_BAND, // worlds per band: bands C and D x 36 (12 levels x 3); bands A and B are made at run time (P3-13)
    text(log) {
      return robot.fileText(robot.buildBank(this.seed, log), this.seed);
    },
  },
};

function main(args) {
  const check = args.includes('--check');
  const names = args.filter(a => !a.startsWith('--'));
  const list = names.length ? names : Object.keys(TYPES);
  let bad = 0;
  for (const name of list) {
    const t = TYPES[name];
    if (!t) {
      console.error('unknown puzzle type: ' + name + ' (known: ' + Object.keys(TYPES).join(', ') + ')');
      process.exitCode = 1;
      return;
    }
    const t0 = Date.now();
    const text = t.text(line => console.log('  ' + name + ' ' + line));
    const file = path.join(DATA, t.file);
    if (check) {
      const same = fs.existsSync(file) && fs.readFileSync(file, 'utf8') === text;
      console.log((same ? 'same    ' : 'DIFFERS ') + 'src/data/' + t.file);
      if (!same) bad++;
    } else {
      fs.writeFileSync(file, text);
      console.log('wrote src/data/' + t.file + ' (' + Buffer.byteLength(text) + ' bytes, ' + (Date.now() - t0) + ' ms)');
    }
  }
  if (bad) process.exitCode = 1;
}

if (require.main === module) main(process.argv.slice(2));

module.exports = {TYPES};
