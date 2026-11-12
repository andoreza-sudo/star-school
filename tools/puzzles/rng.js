'use strict';
// Seeded randomness for the dev-time puzzle generators (P3-02). Never use Math.random in tools/puzzles/: banks must be
// reproducible byte for byte from their seed.
//
//   const {rng} = require('./rng');
//   const r = rng('sudoku-1|D|hard|7');   // any string seed
//   r()            -> float in [0, 1)
//   r.int(n)       -> integer 0..n-1
//   r.shuffle(a)   -> shuffles a in place (Fisher-Yates) and returns it
//   r.pick(a)      -> one element of a

// xmur3 string hash: turns a seed string into a 32-bit state
function hash(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^= h >>> 16) >>> 0;
}

// mulberry32: small, fast, good enough for shuffling puzzle cells
function rng(seed) {
  let a = hash(String(seed));
  const r = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  r.int = n => Math.floor(r() * n);
  r.shuffle = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = r.int(i + 1);
      const t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  };
  r.pick = arr => arr[r.int(arr.length)];
  return r;
}

module.exports = {rng, hash};
