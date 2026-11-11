'use strict';
// Logic grid ("who has which") generator, grader and bank builder (P3-06, BRAIN_TEASERS 5.3). Dev-time only.
// Run through build-banks.js: `node tools/puzzles/build-banks.js logic` writes src/data/d-puz-logic.js.
//
// The puzzle: n children (category 0, the names) and K other categories of n items each (a pet, a snack, an age ...).
// Every child has exactly one item of each category and no two children share one. Clues say who has what; the child
// finds the one way to match everything. Bands (BRAIN_TEASERS 5.3):
//   B  3 children x 1 category with pictures, clues "is" / "is not" (2-3 clues), solved by direct elimination
//   C  3 children x 2 categories, + link clues between the two categories (4-5 clues), elimination only (no guessing)
//   D  4 children x 2 categories, the second one ordered (age, house number, race place), + "or", comparison and
//      one-apart clues (5-8 clues), elimination plus at most one short chain (a "what if" that fails within CHAIN steps)
//
// Steps for one puzzle:
//   1. pick the categories (theme(): PICTURE, UNORDERED, ORDERED, never two from CLASH), n items of each (in vocabulary
//      order; ordered categories keep all their items in order) and n names with different first letters; pick a random
//      solution (a permutation per category)
//   2. build the pool of every true clue of the types the band allows whose sentence is short enough (MAX_WORDS)
//   3. add clues from the pool at random (weights per band and tier; a clue that rules nothing more out is skipped) until
//      exactly one assignment fits. The counter enumerates every assignment (at most 24 x 24 = 576) and keeps the ones
//      every clue holds for
//   4. minimize: try removing each clue (random order); leave it out while the puzzle stays unique. So no stored clue is
//      redundant: without any one of them there are at least two answers
//   5. grade with the human-style solver grade() below; keep the puzzle only if the band allows its grade, chains and clue
//      count, band C has a link clue (between the two categories), band D a comparison or one-apart clue, and no earlier
//      bank puzzle has the same shape (bankKey)
// Tiers: slots 0-11 of a band are easy, 12-23 medium, 24-35 hard. The tier sets the clue weights (harder: more negatives,
// links, comparisons) and, in band D, a lowest grade: the hard third must need one chain (BANDS.minGrade).
//
// Human-style grader (the marks a child makes on the grid; a tick always crosses the rest of its row and column in its
// block, as the UI does). Techniques, easiest first; the grade is the hardest one needed:
//   1 clue mark        a clue that says "is" or "is not" outright: put the tick or the cross
//   2 only place left  a row or column of a block with one open cell left: tick it
//   3 link             through a tick between two categories, copy marks to the third block ("Mia has the cat and the cat's
//                      owner likes red, so Mia likes red"; also crosses)
//   4 two-way clue     an "or", comparison or one-apart clue crosses what it rules out with the marks so far ("Mia is older
//                      than Leo, so Mia is not the youngest"), and the two people it names are different children
//   5 chain            "what if": tick an open cell, apply techniques 1-4 for at most CHAIN steps, and a contradiction
//                      (a line with every cell crossed, or two ticks) shows the cell must be a cross
//   99                 not solved: the techniques get stuck
// score() = grade * 100 + effort (the sum of the technique numbers of every step), so a band sorts first by the hardest
// idea needed, then by how much work it takes. Level L (1-12) of a band is entries 3(L-1) to 3L-1.
//
// Bank format (see fileText): PUZ.logic = {cats: {...}, B: [...], C: [...], D: [...]}. A puzzle is an array:
//   ['Mia,Leo,Sam|pet=cat,dog,fish|201|2|206', clue, clue, ...]
//   head = names | categories (id=item,item,...; several joined by ';') | solution (per category the item index of each
//          child in name order, categories joined by ';') | grade | score
//   clue = [kind, ...indexes, sentence]. An entity is a pair (category, item): category 0 = the children (item = name index),
//          1.. = the categories in head order.
//     ['is',  c1, i1, c2, i2, text]    entity (c1,i1) and (c2,i2) belong to the same child ("Mia has the fish.")
//     ['not', c1, i1, c2, i2, text]    they belong to different children ("Leo does not have the cat.")
//     ['or',  c, i, d, j1, j2, text]   entity (c,i) goes with item j1 or item j2 of category d ("Mia is 7 or 9."; one is
//                                      true; numbers and places in order, other items in random order)
//     ['gt',  c1, i1, c2, i2, text]    in the ordered category, (c1,i1)'s item index is bigger than (c2,i2)'s
//                                      ("Mia is older than Leo."; for race places a bigger index finishes behind)
//     ['lt',  c1, i1, c2, i2, text]    smaller ("Mia is younger than the cat's owner.")
//     ['nx',  c1, i1, c2, i2, text]    the item indexes differ by one ("Mia and Leo are one year apart.")
//   The first entity is the sentence's subject. Sentences are render() of the clue, word for word.
//   cats[id] = {label, pics: {item: emoji}} (emoji fallbacks for picFor(item, emoji); every one is in tools/emoji-allow.txt)
//   and ordered: 1 for the ordered categories.
//
// Determinism: every bank slot (band, index) has its own rng seeded `${seed}|${band}|${index}`; slots are generated in order
// (B, C, D; index ascending), each avoiding the shapes before it, then each band is sorted by score.
//
// Exports: BANDS, ORDER, PER_BAND, CATS, NAMES, TECH, CHAIN, MAX_WORDS, makePuzzle(band, tier, rng), genSlot(seed, band, index,
//          avoid), buildBank(seed, log), holds(clue, A, O), assignments(n, K), countSolutions(p, limit), grade(p), score(g),
//          solutionOf(state, n, K), render(p, clue), words(text), encode(p), decode(entry), bankKey(p), fileText(bank, seed)

const {rng: makeRng} = require('./rng');

// ---- vocabulary ----
// Names: short, easy to read, from many places; no common English words, none ending in s (no awkward possessives).
const NAMES = [
  'Mia', 'Leo', 'Sam', 'Ava', 'Ben', 'Zoe', 'Max', 'Tom', 'Kim', 'Eli', 'Nia', 'Raj', 'Ana', 'Omar', 'Finn', 'Ella', 'Noah',
  'Maya', 'Owen', 'Kai', 'Ada', 'Luca', 'Nora', 'Hugo', 'Lena', 'Ravi', 'Yuki', 'Amir', 'Tara', 'Theo', 'Dev', 'Zara', 'Ivan', 'Jun',
];

// Categories. An item is [word, emoji, verb, negative verb, object]; missing parts come from the category (v, nv, obj).
// The word is also the picture name for picFor(word, emoji). who(item) is the item as a sentence subject ("the cat's owner").
// Ordered categories (band D) keep their items in order; their comparison wording is in cmp.
const CATS = {
  pet: {
    label: 'Pet', v: 'has', nv: 'does not have', who: it => 'the ' + it.w + '\'s owner',
    items: [['cat', '🐱'], ['dog', '🐶'], ['fish', '🐟'], ['rabbit', '🐰'], ['bird', '🐦'], ['frog', '🐸'], ['turtle', '🐢'], ['mouse', '🐭']],
  },
  snack: {
    label: 'Snack', v: 'eats', nv: 'does not eat',
    items: [['apple', '🍎'], ['banana', '🍌'], ['grapes', '🍇'], ['cheese', '🧀'], ['cookie', '🍪'], ['cupcake', '🧁'], ['pizza', '🍕'],
      ['watermelon', '🍉']],
  },
  sport: {
    label: 'Sport', v: 'plays', nv: 'does not play', obj: it => it.w,
    items: [['soccer', '⚽'], ['tennis', '🎾'], ['basketball', '🏀'], ['swim', '🏊', 'swims', 'does not swim', ''],
      ['skate', '⛸️', 'skates', 'does not skate', '']],
  },
  hobby: {
    label: 'Hobby',
    items: [['paint', '🎨', 'paints', 'does not paint', ''], ['read', '📖', 'reads', 'does not read', ''],
      ['draw', '✏️', 'draws', 'does not draw', ''], ['puzzle', '🧩', 'does', 'does not do', 'puzzles']],
  },
  music: {
    label: 'Music', v: 'plays', nv: 'does not play',
    items: [['drum', '🥁'], ['guitar', '🎸'], ['trumpet', '🎺']],
  },
  ride: {
    label: 'Ride', v: 'rides', nv: 'does not ride',
    items: [['bike', '🚲'], ['bus', '🚌'], ['train', '🚂'], ['boat', '⛵'], ['tractor', '🚜']],
  },
  colour: {
    label: 'Colour', v: 'likes', nv: 'does not like', obj: it => it.w,
    items: [['red'], ['blue'], ['green'], ['yellow'], ['purple'], ['orange']],
  },
  age: {
    label: 'Age', ordered: true, v: 'is', nv: 'is not', obj: it => it.w, who: it => 'the ' + it.w + '-year-old',
    items: [['6'], ['7'], ['8'], ['9']],
    cmp: {
      gt: (a, b) => a + ' is older than ' + b, lt: (a, b) => a + ' is younger than ' + b,
      nx: (a, b) => a + ' and ' + b + ' are one year apart',
    },
  },
  house: {
    label: 'House', ordered: true, v: 'lives at', nv: 'does not live at', obj: it => 'number ' + it.w,
    who: it => 'the child at number ' + it.w,
    items: [['1'], ['2'], ['3'], ['4']],
    cmp: {
      gt: (a, b) => a + ' lives at a bigger number than ' + b, lt: (a, b) => a + ' lives at a smaller number than ' + b,
      nx: (a, b) => a + ' lives next door to ' + b,
    },
  },
  race: {
    label: 'Race', ordered: true, v: 'came', nv: 'did not come', obj: it => it.w, who: it => 'the child who came ' + it.w,
    items: [['first'], ['second'], ['third'], ['fourth']],
    cmp: {
      gt: (a, b) => a + ' finished behind ' + b, lt: (a, b) => a + ' finished ahead of ' + b,
      nx: (a, b) => a + ' and ' + b + ' finished one place apart',
    },
  },
};
for (const [id, cat] of Object.entries(CATS)) {
  cat.id = id;
  cat.items = cat.items.map(([w, pic, v, nv, o]) => {
    const it = {w, pic: pic || '', v: v || cat.v, nv: nv || cat.nv};
    it.o = o !== undefined ? o : cat.obj ? cat.obj(it) : 'the ' + w;
    return it;
  });
  for (const it of cat.items) it.who = cat.who ? cat.who(it) : 'the child who ' + (it.v + ' ' + it.o).trim();
}

// Category choices per band. B: one picture category. C: two unordered categories that do not share a verb.
// D: one unordered category with at least 4 items, then one ordered category.
const PICTURE = ['pet', 'snack', 'sport', 'hobby', 'music', 'ride'];
const UNORDERED = ['pet', 'snack', 'sport', 'hobby', 'music', 'ride', 'colour'];
const CLASH = [['sport', 'music']]; // both "plays": too easy to mix up in one puzzle
const ORDERED = ['age', 'house', 'race'];

// Band specs: children n, categories K, [fewest, most] clues, highest grade, chains allowed, clue pick weights per tier
// (is/not between a child and an item; lis/lnot the same between two categories ("links"); or; cmp = gt or lt; nx).
// Tiers 0-2 (easy, medium, hard) each fill a third of a band's slots. minGrade per tier: band D's hard third must need
// a chain (grade 5). The bank is then sorted by score, so levels follow the grader, not the tier.
const BANDS = {
  B: {n: 3, K: 1, clues: [2, 3], maxGrade: 2, chains: 0, weights: [{is: 2, not: 2}, {is: 1, not: 3}, {is: 0.4, not: 4}]},
  C: {
    n: 3, K: 2, clues: [4, 5], maxGrade: 3, chains: 0, needLink: true,
    weights: [{is: 2, not: 2, lis: 2, lnot: 1}, {is: 1, not: 3, lis: 1.5, lnot: 2}, {is: 0.5, not: 3, lis: 1, lnot: 3}],
  },
  D: {
    n: 4, K: 2, clues: [5, 8], maxGrade: 5, chains: 1, needOrder: true, minGrade: [0, 0, 5],
    weights: [
      {is: 2, not: 2, lis: 1.5, lnot: 1, or: 0.6, cmp: 1.5, nx: 1},
      {is: 1, not: 2, lis: 1, lnot: 1.5, or: 0.8, cmp: 2, nx: 1.5},
      {is: 0.3, not: 2, lis: 0.5, lnot: 1.5, or: 1, cmp: 2.5, nx: 2},
    ],
  },
};
const ORDER = ['B', 'C', 'D'];
const PER_BAND = 36; // 12 levels x 3 (BRAIN_TEASERS 5.3 step 6, 7)
const MAX_WORDS = {B: 6, C: 11, D: 14}; // longest clue sentence per band, in words
const CHAIN = 2; // a chain must reach its contradiction within this many steps after the "what if" tick
const MAX_TRIES = 5000;
const TECH = [null, 'clue mark', 'only place left', 'link', 'two-way clue', 'chain'];
const NOT_SOLVED = 99;

// ---- assignments and clue truth ----
function perms(n) {
  if (n === 1) return [[0]];
  const out = [];
  for (const p of perms(n - 1)) for (let k = 0; k <= p.length; k++) out.push([...p.slice(0, k), n - 1, ...p.slice(k)]);
  return out;
}
// Every assignment for n children and K categories: A.f[c][child] = item, A.g[c][item] = child (c = 1..K; index 0 unused).
const assignCache = {};
function assignments(n, K) {
  const key = n + ':' + K;
  if (assignCache[key]) return assignCache[key];
  const P = perms(n);
  const inv = p => p.reduce((a, v, i) => ((a[v] = i), a), []);
  let out = [{f: [null], g: [null]}];
  for (let c = 1; c <= K; c++) {
    const next = [];
    for (const a of out) for (const p of P) next.push({f: [...a.f, p], g: [...a.g, inv(p)]});
    out = next;
  }
  return (assignCache[key] = out);
}
const child = (A, c, i) => (c ? A.g[c][i] : i); // which child entity (c, i) is
const itemOf = (A, c, i, d) => (d ? A.f[d][child(A, c, i)] : child(A, c, i)); // entity (c, i)'s item in category d

// Does clue q hold in assignment A? q = {k, a: [c, i], b: [c, i], d, j: [j1, j2]}; p.O = the ordered category (D).
function holds(q, A, O) {
  if (q.k === 'is') return child(A, ...q.a) === child(A, ...q.b);
  if (q.k === 'not') return child(A, ...q.a) !== child(A, ...q.b);
  if (q.k === 'or') {
    const x = itemOf(A, ...q.a, q.d);
    return x === q.j[0] || x === q.j[1];
  }
  const x = itemOf(A, ...q.a, O);
  const y = itemOf(A, ...q.b, O);
  if (q.k === 'gt') return x > y;
  if (q.k === 'lt') return x < y;
  return Math.abs(x - y) === 1; // nx
}

// Number of assignments every clue holds for, stopping at limit. p = {n, K, O, clues}.
function countSolutions(p, limit = 2) {
  let c = 0;
  for (const A of assignments(p.n, p.K)) {
    if (p.clues.every(q => holds(q, A, p.O)) && ++c >= limit) break;
  }
  return c;
}
function solutionsOf(list, clues, O) {
  return list.filter(A => clues.every(q => holds(q, A, O)));
}

// ---- sentences ----
function itemAt(p, c, i) {
  return c ? CATS[p.cats[c - 1]].items[p.items[c - 1][i]] : {w: p.names[i], v: 'is', nv: 'is not', o: p.names[i], who: p.names[i]};
}
const cap = s => s[0].toUpperCase() + s.slice(1);
// The sentence for a clue, from its structure only.
function render(p, q) {
  const subj = itemAt(p, ...q.a).who;
  let s;
  if (q.k === 'is' || q.k === 'not') {
    const it = itemAt(p, ...q.b);
    s = subj + ' ' + ((q.k === 'is' ? it.v : it.nv) + ' ' + it.o).trim();
  } else if (q.k === 'or') {
    const x = itemAt(p, q.d, q.j[0]);
    const y = itemAt(p, q.d, q.j[1]);
    // one verb when both share it ("has the cat or the dog"), else both ("paints or does puzzles")
    const both = x.v === y.v && x.o && y.o ? x.v + ' ' + x.o + ' or ' + y.o : (x.v + ' ' + x.o).trim() + ' or ' + (y.v + ' ' + y.o).trim();
    s = subj + ' ' + both;
  } else {
    s = CATS[p.cats[p.O - 1]].cmp[q.k](subj, itemAt(p, ...q.b).who);
  }
  return cap(s) + '.';
}
const words = text => text.replace(/[.,]/g, '').split(/\s+/).filter(Boolean);

// ---- human-style grader ----
// Marks: block (a, b) with a < b is an n x n Int8Array, cell i * n + j for item i of a and item j of b: 0 open, 1 tick, -1 cross.
function newState(n, K) {
  const m = {};
  for (let a = 0; a <= K; a++) for (let b = a + 1; b <= K; b++) m[a + ',' + b] = new Int8Array(n * n);
  return {n, K, m, bad: false};
}
const copyState = st => {
  const m = {};
  for (const k in st.m) m[k] = st.m[k].slice();
  return {n: st.n, K: st.K, m, bad: st.bad};
};
function get(st, a, i, b, j) {
  return a < b ? st.m[a + ',' + b][i * st.n + j] : st.m[b + ',' + a][j * st.n + i];
}
function put(st, a, i, b, j, v) {
  if (a < b) st.m[a + ',' + b][i * st.n + j] = v;
  else st.m[b + ',' + a][j * st.n + i] = v;
}
// Set one mark; a tick crosses the rest of its row and column. Returns true when anything changed; sets st.bad on a clash.
function mark(st, a, i, b, j, v) {
  const cur = get(st, a, i, b, j);
  if (cur === v) return false;
  if (cur !== 0) {
    st.bad = true;
    return true;
  }
  put(st, a, i, b, j, v);
  if (v === 1) {
    for (let k = 0; k < st.n; k++) {
      if (k !== j) mark(st, a, i, b, k, -1);
      if (k !== i) mark(st, a, k, b, j, -1);
    }
  }
  return true;
}
// A line (row or column of a block) with every cell crossed, or two ticks, is a contradiction.
function broken(st) {
  if (st.bad) return true;
  const n = st.n;
  for (const blk of Object.values(st.m)) {
    for (let x = 0; x < n; x++) {
      let rc = 0, cc = 0, rt = 0, ct = 0;
      for (let y = 0; y < n; y++) {
        const r = blk[x * n + y], c = blk[y * n + x];
        if (r < 0) rc++;
        if (r > 0) rt++;
        if (c < 0) cc++;
        if (c > 0) ct++;
      }
      if (rc === n || cc === n || rt > 1 || ct > 1) return true;
    }
  }
  return false;
}
function solvedState(st) {
  for (const blk of Object.values(st.m)) if (blk.reduce((s, v) => s + (v > 0), 0) !== st.n) return false;
  return true;
}
const cand = (st, e, d) => {
  const out = [];
  for (let k = 0; k < st.n; k++) if (get(st, e[0], e[1], d, k) !== -1) out.push(k);
  return out;
};

// One step of technique t (the first application that changes something). Returns true if it made a step.
function step(st, p, t, used) {
  const n = st.n;
  const K = st.K;
  if (t === 1) {
    for (let x = 0; x < p.clues.length; x++) {
      const q = p.clues[x];
      if ((q.k !== 'is' && q.k !== 'not') || used.has(x)) continue;
      used.add(x);
      if (mark(st, ...q.a, ...q.b, q.k === 'is' ? 1 : -1)) return true;
    }
    return false;
  }
  if (t === 2) {
    for (let a = 0; a <= K; a++) {
      for (let b = a + 1; b <= K; b++) {
        for (let x = 0; x < n; x++) {
          for (const row of [true, false]) {
            let open = -1, cnt = 0, tick = false;
            for (let y = 0; y < n; y++) {
              const v = row ? get(st, a, x, b, y) : get(st, a, y, b, x);
              if (v > 0) tick = true;
              if (v === 0) open = y, cnt++;
            }
            if (!tick && cnt === 1) return mark(st, a, row ? x : open, b, row ? open : x, 1);
          }
        }
      }
    }
    return false;
  }
  if (t === 3) {
    for (let a = 0; a <= K; a++) {
      for (let b = a + 1; b <= K; b++) {
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            if (get(st, a, i, b, j) !== 1) continue;
            for (let c = 0; c <= K; c++) {
              if (c === a || c === b) continue;
              let ch = false;
              for (let k = 0; k < n; k++) {
                const x = get(st, a, i, c, k);
                const y = get(st, b, j, c, k);
                if (x && !y) ch = mark(st, b, j, c, k, x) || ch;
                else if (y && !x) ch = mark(st, a, i, c, k, y) || ch;
              }
              if (ch) return true;
            }
          }
        }
      }
    }
    return false;
  }
  if (t === 4) {
    for (const q of p.clues) {
      if (q.k === 'is' || q.k === 'not') continue;
      let ch = false;
      if (q.k === 'or') {
        for (let k = 0; k < n; k++) if (k !== q.j[0] && k !== q.j[1]) ch = mark(st, ...q.a, q.d, k, -1) || ch;
      } else {
        const rel = q.k === 'gt' ? (v, w) => v > w : q.k === 'lt' ? (v, w) => v < w : (v, w) => Math.abs(v - w) === 1;
        const c1 = cand(st, q.a, p.O);
        const c2 = cand(st, q.b, p.O);
        for (const v of c1) if (!c2.some(w => rel(v, w))) ch = mark(st, ...q.a, p.O, v, -1) || ch;
        for (const w of c2) if (!c1.some(v => rel(v, w))) ch = mark(st, ...q.b, p.O, w, -1) || ch;
        if (q.a[0] !== q.b[0]) ch = mark(st, ...q.a, ...q.b, -1) || ch; // two different children
      }
      if (ch) return true;
    }
    return false;
  }
  if (t === 5) {
    for (let a = 0; a <= K; a++) {
      for (let b = a + 1; b <= K; b++) {
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            if (get(st, a, i, b, j) !== 0) continue;
            const trial = copyState(st);
            mark(trial, a, i, b, j, 1);
            const tu = new Set(used);
            let fails = broken(trial);
            for (let s = 0; s < CHAIN && !fails; s++) {
              let moved = false;
              for (let tt = 1; tt <= 4 && !moved; tt++) moved = step(trial, p, tt, tu);
              if (!moved) break;
              fails = broken(trial);
            }
            if (fails) return mark(st, a, i, b, j, -1);
          }
        }
      }
    }
    return false;
  }
  return false;
}

// Grade a puzzle p = {n, K, O, clues}: {solved, grade, steps: [technique per step], chains, effort, st}.
function grade(p) {
  const st = newState(p.n, p.K);
  const used = new Set();
  const steps = [];
  while (!solvedState(st) && !broken(st)) {
    let t = 1;
    while (t <= 5 && !step(st, p, t, used)) t++;
    if (t > 5) break;
    steps.push(t);
  }
  const solved = solvedState(st) && !broken(st);
  return {
    solved, grade: solved ? Math.max(...steps) : NOT_SOLVED, steps, chains: steps.filter(t => t === 5).length,
    effort: steps.reduce((a, t) => a + t, 0), st,
  };
}
const score = g => g.grade * 100 + g.effort;

// The solved grid as a solution: for each category c >= 1 the item of each child.
function solutionOf(st, n, K) {
  const out = [];
  for (let c = 1; c <= K; c++) {
    const row = [];
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (get(st, 0, i, c, j) === 1) row[i] = j;
    out.push(row);
  }
  return out;
}

// ---- generator ----
function pickWeighted(list, weight, rng) {
  const total = list.reduce((a, x) => a + weight(x), 0);
  let x = rng() * total;
  for (let i = 0; i < list.length; i++) {
    x -= weight(list[i]);
    if (x < 0) return i;
  }
  return list.length - 1;
}

// Step 1: categories, items, names and a random solution.
function theme(band, rng) {
  const spec = BANDS[band];
  let cats;
  if (band === 'B') cats = [rng.pick(PICTURE)];
  else if (band === 'C') {
    do cats = rng.shuffle(UNORDERED.slice()).slice(0, 2);
    while (CLASH.some(([x, y]) => cats.includes(x) && cats.includes(y)));
  } else cats = [rng.pick(UNORDERED.filter(c => CATS[c].items.length >= spec.n)), rng.pick(ORDERED)];
  const items = cats.map(c => {
    const all = CATS[c].items.map((_, i) => i);
    return CATS[c].ordered ? all : rng.shuffle(all.slice()).slice(0, spec.n).sort((x, y) => x - y);
  });
  const names = [];
  const pool = rng.shuffle(NAMES.filter(x => band !== 'B' || x.length <= 4));
  for (const x of pool) if (names.length < spec.n && !names.some(y => y[0] === x[0])) names.push(x);
  const sol = cats.map(() => rng.shuffle([...Array(spec.n).keys()]));
  return {band, n: spec.n, K: spec.K, cats, items, names, sol, O: band === 'D' ? 2 : 0};
}

// Step 2: every true clue the band allows, each with its pick class (for the weights).
function pool(p, rng) {
  const {n, K} = p;
  const A = {f: [null, ...p.sol], g: [null, ...p.sol.map(s => s.reduce((a, v, i) => ((a[v] = i), a), []))]};
  const out = [];
  const add = (cls, q) => {
    q.text = render(p, q);
    if (words(q.text).length <= MAX_WORDS[p.band]) out.push({cls, q});
  };
  const ents = [];
  for (let c = 0; c <= K; c++) for (let i = 0; i < n; i++) ents.push([c, i]);
  for (const a of ents) {
    for (const b of ents) {
      if (a[0] >= b[0]) continue;
      // the subject: a child if there is one, else either category at random
      const [x, y] = a[0] === 0 || rng() < 0.5 ? [a, b] : [b, a];
      const same = child(A, ...a) === child(A, ...b);
      const link = a[0] !== 0;
      add((link ? 'l' : '') + (same ? 'is' : 'not'), {k: same ? 'is' : 'not', a: x, b: y});
    }
  }
  if (p.band !== 'D') return out;
  for (const e of ents) {
    for (let d = 0; d <= K; d++) {
      if (d === e[0]) continue;
      const t = itemOf(A, ...e, d);
      // the two choices in random order; numbers and places in their own order ("is 7 or 9")
      const ord = d && CATS[p.cats[d - 1]].ordered;
      for (let k = 0; k < n; k++) if (k !== t) add('or', {k: 'or', a: e, d, j: (ord ? t < k : rng() < 0.5) ? [t, k] : [k, t]});
    }
  }
  const people = ents.filter(e => e[0] !== p.O);
  for (const a of people) {
    for (const b of people) {
      if (child(A, ...a) === child(A, ...b) || (a[0] > b[0] || (a[0] === b[0] && a[1] >= b[1]))) continue;
      const x = itemOf(A, ...a, p.O);
      const y = itemOf(A, ...b, p.O);
      const [s, o] = rng() < 0.5 ? [a, b] : [b, a];
      add('cmp', {k: (s === a ? x > y : y > x) ? 'gt' : 'lt', a: s, b: o});
      if (Math.abs(x - y) === 1) add('nx', {k: 'nx', a, b}); // a child's name first ("Mia and the cat's owner are ...")
    }
  }
  return out;
}

// Steps 3-5 for one candidate puzzle; null when it does not meet the band's rules.
function makePuzzle(band, tier, rng) {
  const spec = BANDS[band];
  const p = theme(band, rng);
  const avail = pool(p, rng);
  const w = spec.weights[tier];
  const all = assignments(p.n, p.K);
  let live = all;
  const chosen = [];
  while (live.length > 1 && avail.length) {
    const k = pickWeighted(avail, x => w[x.cls] || 0, rng);
    const c = avail.splice(k, 1)[0];
    if (!(w[c.cls] > 0)) break;
    const next = live.filter(A => holds(c.q, A, p.O));
    if (next.length === live.length) continue; // tells nothing new: skip
    live = next;
    chosen.push(c.q);
  }
  if (live.length !== 1) return null;
  // minimize
  for (const q of rng.shuffle(chosen.slice())) {
    const rest = chosen.filter(x => x !== q);
    if (solutionsOf(all, rest, p.O).length === 1) chosen.splice(chosen.indexOf(q), 1);
  }
  p.clues = chosen;
  if (chosen.length < spec.clues[0] || chosen.length > spec.clues[1]) return null;
  if (spec.needLink && !chosen.some(q => q.a[0] !== 0 && q.b && q.b[0] !== 0 && (q.k === 'is' || q.k === 'not'))) return null;
  if (spec.needOrder && !chosen.some(q => q.k === 'gt' || q.k === 'lt' || q.k === 'nx')) return null;
  const g = grade(p);
  if (!g.solved || g.grade > spec.maxGrade || g.chains > spec.chains) return null;
  if (spec.minGrade && g.grade < spec.minGrade[tier]) return null;
  p.grade = g.grade;
  p.score = score(g);
  return p;
}

// Shape of a puzzle for the duplicate check: categories, item words, and the clues with every unordered item replaced by
// the child who has it, minimized over all orders of the children. Two puzzles with the same key are the same puzzle with
// the children renamed (and their items handed round), so a bank never holds both.
function bankKey(p) {
  const n = p.n;
  const ordered = c => c && CATS[p.cats[c - 1]].ordered;
  const owner = (c, i) => (c === 0 ? i : p.sol[c - 1].indexOf(i));
  let best = null;
  for (const pi of perms(n)) {
    const ent = (c, i) => (ordered(c) ? c + ':' + i : c + '@' + pi[owner(c, i)]);
    const cl = p.clues.map(q => {
      if (q.k === 'or') {
        const js = q.j.map(j => ent(q.d, j)).sort();
        return 'or ' + ent(...q.a) + ' ' + js.join(' ');
      }
      let a = ent(...q.a);
      let b = ent(...q.b);
      let k = q.k;
      if (k === 'lt') [a, b, k] = [b, a, 'gt'];
      if (k !== 'gt' && b < a) [a, b] = [b, a];
      return k + ' ' + a + ' ' + b;
    }).sort().join(',');
    if (best === null || cl < best) best = cl;
  }
  return p.cats.map((c, k) => c + '=' + p.items[k].map(i => CATS[c].items[i].w).join(',')).join(';') + '|' + best;
}

// One bank slot: deterministic from (seed, band, index), never a shape in `avoid`.
function genSlot(seed, band, index, avoid) {
  const tier = Math.floor((index * 3) / PER_BAND);
  const rng = makeRng(seed + '|' + band + '|' + index);
  for (let tries = 1; tries <= MAX_TRIES; tries++) {
    const p = makePuzzle(band, tier, rng);
    if (p && !avoid.has(bankKey(p))) {
      p.tries = tries;
      return p;
    }
  }
  throw new Error('logic: no puzzle for ' + band + ' #' + index + ' after ' + MAX_TRIES + ' tries');
}

// ---- encoding ----
const CLUE_ARGS = q =>
  q.k === 'or' ? [...q.a, q.d, ...q.j] : [...q.a, ...q.b];
function encode(p) {
  const head = [
    p.names.join(','),
    p.cats.map((c, k) => c + '=' + p.items[k].map(i => CATS[c].items[i].w).join(',')).join(';'),
    p.sol.map(s => s.join('')).join(';'),
    p.grade,
    p.score,
  ].join('|');
  return [head, ...p.clues.map(q => [q.k, ...CLUE_ARGS(q), q.text || render(p, q)])];
}
function decode(entry) {
  const [head, ...clues] = entry;
  const [names, cats, sol, gr, sc] = head.split('|');
  const cs = cats.split(';').map(s => s.split('='));
  const p = {
    names: names.split(','),
    cats: cs.map(x => x[0]),
    items: cs.map(([c, list]) => list.split(',').map(w => CATS[c] ? CATS[c].items.findIndex(it => it.w === w) : -1)),
    sol: sol.split(';').map(s => [...s].map(Number)),
    grade: +gr,
    score: +sc,
  };
  p.n = p.names.length;
  p.K = p.cats.length;
  p.O = p.cats.findIndex(c => CATS[c] && CATS[c].ordered) + 1;
  p.clues = clues.map(a => {
    const k = a[0];
    const text = a[a.length - 1];
    if (k === 'or') return {k, a: [a[1], a[2]], d: a[3], j: [a[4], a[5]], text};
    return {k, a: [a[1], a[2]], b: [a[3], a[4]], text};
  });
  return p;
}

function buildBank(seed, log) {
  const avoid = new Set();
  const bank = {};
  for (const band of ORDER) {
    const t0 = Date.now();
    let tries = 0;
    const list = [];
    for (let i = 0; i < PER_BAND; i++) {
      const p = genSlot(seed, band, i, avoid);
      avoid.add(bankKey(p));
      tries += p.tries;
      list.push(p);
    }
    if (log) log(band + ': ' + PER_BAND + ' puzzles, ' + tries + ' attempts, ' + (Date.now() - t0) + ' ms');
    list.sort((a, b) => a.score - b.score || (JSON.stringify(encode(a)) < JSON.stringify(encode(b)) ? -1 : 1));
    bank[band] = list.map(encode);
  }
  return bank;
}

// ---- the data file ----
const q1 = s => '\'' + String(s).replace(/\\/g, '\\\\').replace(/'/g, '\\\'') + '\'';
function fileText(bank, seed) {
  const used = new Set();
  for (const band of ORDER) for (const e of bank[band]) for (const c of decode(e).cats) used.add(c);
  const lines = [];
  lines.push('/* Logic grid banks (P3-06, BRAIN_TEASERS 5.3). GENERATED by `node tools/puzzles/build-banks.js logic` from seed \'' + seed + '\':');
  lines.push('   do not edit by hand; change the generator (tools/puzzles/logic.js) and rerun it. Same seed, same file, byte for byte.');
  lines.push('   PUZ.logic[band] = [36 puzzles]: B 3 children x 1 picture category, C 3 x 2 categories, D 4 x 2 (the second ordered),');
  lines.push('   sorted by score, so level L (1-12) is entries 3(L-1) to 3L-1. A puzzle is [head, clue, clue, ...]:');
  lines.push('   head = \'names|cat=item,item,...[;cat=...]|solution|grade|score\'; solution = per category (joined by ;) the item index of');
  lines.push('   each child in name order. An entity is (category, item): category 0 = the children (item = name index), 1.. = head order.');
  lines.push('   Clues (the sentence is last; the first entity is its subject):');
  lines.push('     [\'is\', c1, i1, c2, i2, text]   same child            [\'not\', c1, i1, c2, i2, text]  different children');
  lines.push('     [\'or\', c, i, d, j1, j2, text]  (c,i) has item j1 or j2 of category d');
  lines.push('     [\'gt\' | \'lt\' | \'nx\', c1, i1, c2, i2, text]  in the ordered category, (c1,i1)\'s item index is bigger / smaller /');
  lines.push('     one apart (race places: a smaller index finished ahead).');
  lines.push('   grade = hardest technique of the grader in tools/puzzles/logic.js (1 clue mark, 2 only place left, 3 link, 4 two-way');
  lines.push('   clue, 5 chain); score = grade x 100 + effort. Every puzzle has exactly one solution and no clue can be left out');
  lines.push('   (tools/test.js proves both with its own counter). cats[id] = {label, ordered, pics: {item: emoji fallback for');
  lines.push('   picFor(item, emoji)}}. PUZ is shared by all puzzle banks. */');
  lines.push('var PUZ = PUZ || {};');
  lines.push('PUZ.logic = {');
  lines.push('  cats: {');
  for (const id of Object.keys(CATS)) {
    if (!used.has(id)) continue;
    const c = CATS[id];
    const pics = c.items.filter(it => it.pic).map(it => it.w + ': ' + q1(it.pic));
    const extra = (c.ordered ? ', ordered: 1' : '') + (pics.length ? ', pics: {' + pics.join(', ') + '}' : '');
    lines.push('    ' + id + ': {label: ' + q1(c.label) + extra + '},');
  }
  lines.push('  },');
  for (const band of ORDER) {
    lines.push('  ' + band + ': [');
    for (const e of bank[band]) {
      lines.push('    [' + q1(e[0]) + ',');
      for (const c of e.slice(1)) lines.push('      [' + c.map(x => (typeof x === 'string' ? q1(x) : x)).join(', ') + '],');
      lines.push('    ],');
    }
    lines.push('  ],');
  }
  lines.push('};');
  return lines.join('\n') + '\n';
}

module.exports = {
  BANDS, ORDER, PER_BAND, CATS, NAMES, TECH, CHAIN, MAX_WORDS, NOT_SOLVED, PICTURE, UNORDERED, ORDERED, CLASH, makePuzzle, genSlot,
  buildBank, holds, assignments, countSolutions, grade, score, solutionOf, render, words, encode, decode, bankKey, fileText, perms,
};
