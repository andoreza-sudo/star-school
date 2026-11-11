/* ---------- Brain Teasers: Patterns, matrices, odd one out (P3-09; BRAIN_TEASERS.md 5.5, 7) ----------
   One registered type, `pattern`. A puzzle is a short set of items (band A 3, bands B-D 4); each item is one question with choices:
     seq  "What comes next?"  a row of pictures and a "?" box; 4 choices
     num  "What comes next?"  a row of numbers; 4 choices
     odd  "Which one does not belong?"  4 pictures, one attribute splits them 3-1; the pictures are the choices
     ana  2x2 "A is to B as C is to ?"; 4 choices (band B)
     mat  3x3 matrix, the bottom-right cell missing; 6 choices: 4 differ from the answer in one attribute, 1 in two (bands C, D)
   Bands (levels 1-4 / 5-8 / 9-12 are tiers 0 / 1 / 2; the rule count grows 1 -> 2 -> 3 over the tiers, section 7):
     A  seq (AB, ABC, AAB, ABB, AABB cycles), odd (shape, then size or count, then with a distracting 2-2 split), seq
     B  num (+n, -n), seq (cycles, +1 count, turns of 45 or 90 degrees, up to 3 attributes), ana (1 then 2 changes), odd
     C  mat (1-2 changing attributes), num (x2, x3, +a/+b alternating, squares, big +n), seq, mat
     D  mat (2-3 changing attributes), num (xa+b, Fibonacci-style, triangular, two interleaved), seq (two or three attributes
        with different cycle lengths), mat
   A picture tile is {s shape 0-6 (6 = arrow), c colour 0-5, z size 0-2, n count 1-5, r turn 0-7 in 45 degree steps, arrows only}.
   Colour is never an attribute of its own: within an item it follows one other attribute (shape, size or count) or stays the
   same, so two tiles of different colours always differ in something a colour-blind child can see too.
   Uniqueness (by construction, then checked): every attribute of the shown part must allow exactly one next value under the rule
   library (a cycle of 1-4 seen at least once, steady growth; numbers: + - x, xa+b, second differences, Fibonacci, alternating,
   interleaved, growing differences), and every distractor must fail it; matrices are read by rows or by columns, attribute by
   attribute. tools/test.js re-checks every item with its own independent checker.
   Hints (per item; the frame counts them): 1 names the attribute to watch, 2 states the rule for one row, 3 removes two wrong
   choices. A wrong tap counts a mistake, the choice turns amber and stays out; the child always finishes.
   State (api.saveState): {i item, miss, h hint tier of this item, x wrong taps, g choices removed by hint 3}.
   Drawing: tiles are inline SVG, light from the top left (shadow, shade, base moved toward the light, white gloss), colours
   from the --ill-* tokens through classes in src/css/49-bt-pattern.css; no ids, filters or gradients. */
const PAT = (() => {
  const SHAPES = ['circle', 'square', 'triangle', 'diamond', 'star', 'heart', 'arrow'];
  const ARROW = 6;
  const COLS = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];
  const SIZES = ['small', 'medium', 'big'];
  const DIRS = ['right', 'down and right', 'down', 'down and left', 'left', 'up and left', 'up', 'up and right'];
  const KEYS = ['s', 'z', 'n', 'r']; // what a colour-blind child sees
  const KIND = { s: 'nom', c: 'nom', z: 'lin', n: 'lin', r: 'rot' };
  const DOM = { s: [0, 1, 2, 3, 4, 5], z: [0, 1, 2], n: [1, 2, 3, 4, 5], r: [0, 1, 2, 3, 4, 5, 6, 7] };
  const range = n => Array.from({ length: n }, (_, i) => i);
  const same = (a, b) => KEYS.every(k => a[k] === b[k]);
  // a tile can be drawn readably: four or five copies only at the big size
  const okTile = t => t.n <= 3 || t.z == 2;

  /* ---------- the rule library ---------- */
  const stepOf = (a, b, kind) => kind == 'rot' ? (a - b + 8) & 7 : a - b;
  // values a rule allows after the list v: a cycle of length p (1-4) seen at least once (v longer than p), or steady growth
  function seqNext(v, kind) {
    const L = v.length, out = new Set();
    for (let p = 1; p <= 4 && p < L; p++) if (v.every((x, i) => i < p || x === v[i - p])) out.add(v[L - p]);
    if (kind != 'nom' && L >= 3) {
      const d = stepOf(v[1], v[0], kind);
      if (d && v.every((x, i) => i == 0 || stepOf(x, v[i - 1], kind) === d)) out.add(kind == 'rot' ? (v[L - 1] + d) & 7 : v[L - 1] + d);
    }
    return out;
  }
  // numbers: every rule that explains the shown list (with at least one term more than it needs) and the next value it gives
  function numNext(v) {
    const L = v.length, out = new Set(), d = v.slice(1).map((x, i) => x - v[i]);
    const put = x => { if (Number.isInteger(x)) out.add(x); };
    for (let p = 1; p <= 4 && p < L; p++) if (v.every((x, i) => i < p || x === v[i - p])) put(v[L - p]);
    if (L >= 3 && d[0] && d.every(x => x === d[0])) put(v[L - 1] + d[0]);
    if (L >= 3 && v[0] && v[1] !== v[0]) {
      const q = v[1] / v[0];
      if (v.every((x, i) => i == 0 || x === v[i - 1] * q)) put(v[L - 1] * q);
    }
    if (L >= 4 && v[1] !== v[0]) { // x a + b
      const a = (v[2] - v[1]) / (v[1] - v[0]), b = v[1] - a * v[0];
      if (Number.isInteger(a) && Number.isInteger(b) && v.every((x, i) => i == 0 || x === a * v[i - 1] + b)) put(a * v[L - 1] + b);
    }
    if (L >= 4) { // the differences grow steadily (squares, triangular numbers)
      const dd = d.slice(1).map((x, i) => x - d[i]);
      if (dd[0] && dd.every(x => x === dd[0])) put(v[L - 1] + d[L - 2] + dd[0]);
    }
    if (L >= 4 && d[0] && d.slice(1).every((x, i) => x === d[i] * (d[1] / d[0]))) put(v[L - 1] + d[L - 2] * d[1] / d[0]); // x r differences
    if (L >= 3 && v.every((x, i) => i < 2 || x === v[i - 1] + v[i - 2])) put(v[L - 1] + v[L - 2]); // Fibonacci-style
    if (L >= 4 && d[0] !== d[1] && d.every((x, i) => i < 2 || x === d[i - 2])) put(v[L - 1] + d[L - 3]); // +a, +b, +a, ...
    if (L >= 6) { // two sequences take turns, each growing steadily
      const e = [v[2] - v[0], v[3] - v[1]];
      if (v.every((x, i) => i < 2 || x - v[i - 2] === e[i % 2])) put(v[L - 2] + e[L % 2]);
    }
    return out;
  }
  // matrices: an attribute fits when every row (or every column) is constant, or holds the same three different values,
  // or grows by the same step
  function linesOk(lines, kind) {
    if (lines.every(l => l[0] === l[1] && l[1] === l[2])) return true;
    const key = l => l.slice().sort((a, b) => a - b).join();
    if (lines.every(l => new Set(l).size == 3 && key(l) == key(lines[0]))) return true;
    if (kind != 'nom') {
      const d = stepOf(lines[0][1], lines[0][0], kind);
      if (d && lines.every(l => stepOf(l[1], l[0], kind) === d && stepOf(l[2], l[1], kind) === d)) return true;
    }
    return false;
  }
  function gridOk(v, kind) {
    const rows = [0, 1, 2].map(i => v.slice(i * 3, i * 3 + 3)), cols = [0, 1, 2].map(j => [v[j], v[j + 3], v[j + 6]]);
    return linesOk(rows, kind) || linesOk(cols, kind);
  }
  const matFits = (cells, t, keys) => keys.every(k => gridOk(cells.concat([t]).map(x => x[k]), KIND[k]));
  // 2x2: each attribute keeps A->B in C->D, or A->C in B->D, or (numbers, turns) changes by the same step
  function anaOk(A, B, C, D, k) {
    if (A[k] === B[k] && C[k] === D[k]) return true;
    if (A[k] === C[k] && B[k] === D[k]) return true;
    return KIND[k] != 'nom' && stepOf(D[k], C[k], KIND[k]) === stepOf(B[k], A[k], KIND[k]);
  }
  const anaFits = (sh, t, keys) => keys.every(k => anaOk(sh[0], sh[1], sh[2], t, k));
  const seqFits = (sh, t, keys) => keys.every(k => seqNext(sh.map(x => x[k]), KIND[k]).has(t[k]));
  // odd one out: the tiles that are alone against three by some attribute
  function oddSet(ts, keys) {
    const out = new Set();
    for (const k of keys) {
      const m = {};
      ts.forEach(t => { m[t[k]] = (m[t[k]] || 0) + 1; });
      const vs = Object.values(m);
      if (vs.length == 2 && vs.includes(1) && vs.includes(3)) out.add(ts.findIndex(t => m[t[k]] == 1));
    }
    return out;
  }
  // does the item have exactly one choice that fits (with and without colour)? Used by make() before an item is kept.
  function unique(it) {
    for (const keys of [KEYS.concat('c'), KEYS]) {
      let fit;
      if (it.k == 'num') { const nx = numNext(it.show); fit = it.ch.map(x => nx.has(x)); }
      else if (it.k == 'odd') { const o = oddSet(it.ch, keys); fit = it.ch.map((_, i) => o.has(i)); }
      else if (it.k == 'seq') fit = it.ch.map(t => seqFits(it.show, t, keys));
      else if (it.k == 'ana') fit = it.ch.map(t => anaFits(it.show, t, keys));
      else fit = it.ch.map(t => matFits(it.show, t, keys));
      if (fit.filter(Boolean).length != 1 || !fit[it.a]) return false;
    }
    return true;
  }

  /* ---------- making items ---------- */
  // tier 0 / 1 / 2 = levels 1-4 / 5-8 / 9-12
  const tierOf = level => level <= 4 ? 0 : level <= 8 ? 1 : 2;
  // sequences: per attribute a cycle unit ('AB', 'AAB' ...) or growth ('+1', '-2'); one option is picked per item
  const SEQ = {
    A1: [[{ s: 'AB' }], [{ s: 'ABC' }], [{ s: 'AAB' }, { s: 'ABB' }, { s: 'AABB' }]],
    A2: [[{ z: 'AB' }, { n: 'AB' }], [{ s: 'AAB' }, { s: 'ABB' }, { z: 'ABC' }], [{ n: '+1' }, { s: 'AB', z: 'AB' }, { s: 'AB', n: 'AB' }]],
    B: [[{ s: 'ABC' }, { n: '+1' }, { n: '-1' }, { r: '+2' }], [{ s: 'AB', n: '+1' }, { r: '+2', z: 'AB' }, { s: 'ABC', z: 'ABC' }],
      [{ r: '+1', z: 'AB' }, { r: '-2', z: 'AB', n: 'AB' }, { s: 'AB', z: 'ABC', n: 'AB' }]],
    C: [[{ r: '+1' }, { r: '-1' }, { s: 'AB', n: '+1' }], [{ r: '+2', z: 'ABC' }, { s: 'ABC', n: 'AB' }, { r: '-1', n: 'AB' }],
      [{ r: '+1', z: 'AB', n: 'ABC' }, { s: 'AB', z: 'ABC', n: 'AB' }, { s: 'ABB', z: 'AB', n: 'ABC' }]],
    D: [[{ s: 'AB', z: 'ABC' }, { s: 'ABC', n: 'AB' }, { r: '+1', z: 'ABC' }], [{ s: 'AAB', z: 'AB', n: 'ABC' }, { r: '-1', z: 'AB', n: 'ABC' }],
      [{ s: 'ABB', z: 'AB', n: 'AABC' }, { r: '+2', z: 'ABC', n: 'AAB' }, { s: 'AABC', z: 'AB', n: 'ABC' }]],
  };
  // number rules per band and tier
  const NUM = {
    B: [['add1'], ['add', 'sub1'], ['sub', 'addbig']],
    C: [['addbig', 'mul2'], ['mul', 'alt'], ['sq', 'alt', 'mul']],
    D: [['affine', 'tri'], ['fib', 'inter', 'sqoff'], ['affine', 'fib', 'inter', 'tri']],
  };

  function maker(rnd) {
    const R = (a, b) => a + Math.floor(rnd() * (b - a + 1));
    const pick = a => a[Math.floor(rnd() * a.length)];
    const shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

    // colour follows attribute ck (or stays c0); returns a painter for tiles
    const painter = (ck, cmap, c0) => t => Object.assign(t, { c: ck ? cmap[t[ck] % 6] : c0 });
    // pick the colour link: the first attribute (in random order) whose colours still fit the item's own rule, else one colour
    function paintItem(it, cands, fits) {
      const cmap = shuf(range(6)), c0 = pick(range(6)), all = () => it.show.concat(it.ch || [], it.ans ? [it.ans] : []);
      for (const ck of shuf(cands).concat([null])) {
        const p = painter(ck, cmap, c0);
        all().forEach(p);
        if (!ck || fits()) return p;
      }
    }
    // tiles that differ from t in exactly the attributes `ks`, drawable; s and r only change where they make sense
    function variants(t, ks) {
      let out = [Object.assign({}, t)];
      for (const k of ks) {
        if (k == 'r' && t.s != ARROW) return [];
        if (k == 's' && t.s == ARROW) return [];
        out = out.flatMap(x => DOM[k].filter(v => v !== t[k]).map(v => Object.assign({}, x, { [k]: v })));
      }
      return out.filter(okTile);
    }
    const pairs = ks => ks.flatMap((a, i) => ks.slice(i + 1).map(b => [a, b]));
    // distractor pool: one-off and two-off variants not fitting the rule, scored by plausibility
    function pool(ans, ch, seen, fits, n1, n2) {
      const score = (x, ks) => ks.reduce((a, k) => a + (ch.includes(k) ? 3 : 0) + (seen(k).includes(x[k]) ? 2 : 0), 0) + rnd();
      const one = KEYS.flatMap(k => variants(ans, [k]).map(x => ({ x, ks: [k], sc: score(x, [k]) })));
      const two = pairs(KEYS).flatMap(ks => variants(ans, ks).map(x => ({ x, ks, sc: score(x, ks) })));
      const ok = o => !fits(o.x);
      const by = a => a.filter(ok).sort((p, q) => q.sc - p.sc);
      const take = (a, n, out) => {
        const per = {};
        for (const o of a) {
          if (out.length >= n) break;
          const kk = o.ks.join();
          if ((per[kk] || 0) >= 2 || out.some(p => same(p.x, o.x))) continue;
          per[kk] = (per[kk] || 0) + 1;
          out.push(o);
        }
        return out;
      };
      const got = take(by(one), n1, []);
      if (got.length < n1) return null;
      const all = take(by(two), n1 + n2, got.slice());
      return all.length < n1 + n2 ? null : all.map(o => o.x);
    }

    // ---- what comes next (pictures) ----
    function seq(opts) {
      const spec = pick(opts), ch = Object.keys(spec);
      const zch = 'z' in spec, nGrow = /^[+-]/.test(spec.n || '');
      const base = {
        s: 'r' in spec ? ARROW : R(0, 5), z: nGrow ? 2 : pick([1, 2]),
        n: zch ? 1 : pick([1, 1, 2]), r: 0,
      };
      if (zch && !('n' in spec)) base.n = pick([1, 2]);
      const vals = {}; // attribute -> function(i)
      for (const k of ch) {
        const u = spec[k];
        if (/^[+-]/.test(u)) {
          const d = +u;
          if (k == 'n') { const s0 = d > 0 ? 1 : 5; vals.n = i => s0 + i * d; }
          else { const s0 = R(0, 7); vals.r = i => (s0 + i * (d + 8)) & 7; }
        } else {
          const letters = [...new Set(u)], dom = k == 'n' ? (zch ? [1, 2, 3] : [1, 2, 3, 4, 5]) : k == 'r' ? [0, 2, 4, 6] : DOM[k];
          const m = {}, pl = shuf(dom);
          letters.forEach((l, i) => { m[l] = pl[i]; });
          vals[k] = i => m[u[i % u.length]];
        }
      }
      // the shortest row (4 to 7 shown) in which every changing attribute allows exactly one next value
      const okAt = L => ch.every(k => {
        const v = range(L + 1).map(vals[k]);
        if (v.some(x => !DOM[k].includes(x))) return false;
        const nx = seqNext(v.slice(0, L), KIND[k]);
        return nx.size == 1 && nx.has(v[L]);
      });
      // a cycle is shown once whole and two more (AB AB, ABC AB, AAB AAB); growth from 4 pictures
      const L0 = Math.max(4, ...ch.map(k => /^[+-]/.test(spec[k]) ? 4 : spec[k].length + 2));
      let L = 0;
      for (let l = L0; l <= 7 && !L; l++) if (okAt(l)) L = l;
      if (!L) return null;
      if (L < 6 && okAt(L + 1) && rnd() < 0.5) L++;
      const tiles = range(L + 1).map(i => { const t = Object.assign({}, base); for (const k of ch) t[k] = vals[k](i); return t; });
      if (!tiles.every(okTile)) return null;
      const it = { k: 'seq', show: tiles.slice(0, L), ans: tiles[L], at: ch, spec };
      const seen = k => it.show.map(t => t[k]);
      const ds = pool(it.ans, ch, seen, t => seqFits(it.show, t, KEYS), 2, 1);
      if (!ds) return null;
      it.ch = ds;
      const p = paintItem(it, ch.filter(k => k != 'r' && !/^[+-]/.test(spec[k])), () => seqFits(it.show, it.ans, ['c']));
      return finish(it, p);
    }
    // put the answer among the distractors at a random place
    function finish(it, p) {
      const ch = shuf(it.ch.concat([it.ans]));
      if (p) ch.forEach(p);
      it.a = ch.findIndex(t => t === it.ans);
      it.ch = ch;
      delete it.ans;
      return unique(it) ? it : null;
    }

    // ---- odd one out ----
    function odd(X, noise) {
      const ys = shuf(['s', 'z', 'n'].filter(k => k != X)).slice(0, noise);
      const t0 = { s: R(0, 5), z: 2, n: 1, r: 0 };
      if (X == 'z' || ys.includes('z')) { t0.z = R(0, 2); t0.n = pick([1, 2]); }
      if (X == 'n' || ys.includes('n')) t0.n = R(1, 3);
      const ts = range(4).map(() => Object.assign({}, t0)), o = R(0, 3);
      ts[o][X] = pick(DOM[X].filter(v => v !== t0[X] && (X != 'n' || v <= 4)));
      for (const y of ys) {
        const v2 = pick(DOM[y].filter(v => v !== t0[y] && (y != 'n' || v <= 3))), two = shuf(range(4)).slice(0, 2);
        two.forEach(i => { ts[i][y] = v2; });
      }
      if (!ts.every(okTile)) return null;
      const it = { k: 'odd', show: [], ch: ts, a: o, at: [X], noise: ys };
      const p = paintItem(it, [X].concat(ys), () => { const s = oddSet(ts, ['c']); return !s.size || (s.size == 1 && s.has(o)); });
      ts.forEach(p);
      return unique(it) ? it : null;
    }

    // ---- 2x2: A is to B as C is to ? ----
    function ana(kx, close) {
      const ks = shuf(['s', 'z', 'n']), X = ks.slice(0, kx), Y = ks.slice(kx, kx + 1);
      const A = { s: R(0, 5), z: R(0, 2), n: R(1, 2), r: 0 };
      if (!X.includes('z') && !Y.includes('z')) A.z = 2;
      const chg = (t, k) => {
        // sizes jump between small and big where they can, so the change is easy to see next to a count
        const dom = k == 'n' ? [1, 2, 3].filter(v => v != t.n) : k == 'z' ? (t.z == 1 ? [0, 2] : [2 - t.z]) : DOM[k].filter(v => v !== t[k]);
        return Object.assign({}, t, { [k]: pick(dom) });
      };
      let B = A;
      for (const k of X) B = chg(B, k);
      let C = A;
      for (const k of Y) C = chg(C, k);
      const D = Object.assign({}, B);
      for (const k of Y) D[k] = C[k];
      if (![A, B, C, D].every(okTile)) return null;
      const it = { k: 'ana', show: [A, B, C], ans: D, at: X.concat(Y), x: X, y: Y };
      const fits = t => anaFits(it.show, t, KEYS);
      const seen = k => it.show.map(t => t[k]);
      let ds = pool(D, X.concat(Y), seen, fits, 3, 0);
      if (!ds) return null;
      // the copy mistakes (the picture above or beside the box) are the most tempting ones on easy levels
      if (!close) for (const t of [B, C]) if (!fits(t) && !ds.some(x => same(x, t)) && KEYS.filter(k => t[k] !== D[k]).length <= 2) ds[ds.length - 1] = Object.assign({}, t);
      ds = ds.filter((x, i) => ds.findIndex(y => same(x, y)) == i);
      if (ds.length < 3) return null;
      it.ch = ds;
      const p = paintItem(it, X.concat(Y), () => anaFits(it.show, it.ans, ['c']));
      return finish(it, p);
    }

    // ---- 3x3 matrix ----
    function mat(nch, rules) {
      const useR = nch < 3 ? rnd() < 0.3 : rnd() < 0.25, ch = shuf(useR ? ['r', 'z', 'n'] : ['s', 'z', 'n']).slice(0, nch);
      const zch = ch.includes('z');
      const cst = { s: useR ? ARROW : R(0, 5), z: 2, n: pick([1, 2]), r: 0 };
      if (!zch && !ch.includes('n')) cst.z = pick([1, 2]);
      const g = range(9).map(() => Object.assign({}, cst)), rl = {};
      for (const k of ch) {
        const opts = rules.filter(x => !(x == 'prog' && k == 's'));
        const rule = rl[k] = pick(opts);
        let put;
        if (rule == 'prog') {
          if (k == 'z') { const v = pick([[0, 1, 2], [2, 1, 0]]); put = (i, j) => v[j]; }
          else if (k == 'n') {
            const d = pick([1, -1]), st = !zch && rnd() < 0.5 ? (d > 0 ? [1, 2, 3] : [5, 4, 3]) : (d > 0 ? [1, 1, 1] : [3, 3, 3]);
            put = (i, j) => st[i] + j * d;
          } else { const d = pick([1, 2, 6, 7]), st = range(3).map(() => R(0, 7)); put = (i, j) => (st[i] + j * d) & 7; }
        } else {
          const dom = k == 'n' ? (zch ? [1, 2, 3] : [1, 2, 3, 4]) : k == 'r' ? [0, 2, 4, 6] : DOM[k];
          const v = shuf(dom).slice(0, 3), sh = pick([1, 2]);
          put = rule == 'rowc' ? (i => v[i]) : ((i, j) => v[(j + i * sh) % 3]);
        }
        range(9).forEach(c => { g[c][k] = put(Math.floor(c / 3), c % 3); });
      }
      if (!g.every(okTile)) return null;
      const it = { k: 'mat', show: g.slice(0, 8), ans: g[8], at: ch, rules: rl };
      const seen = k => it.show.map(t => t[k]);
      const ds = pool(it.ans, ch, seen, t => matFits(it.show, t, KEYS), 4, 1);
      if (!ds) return null;
      it.ch = ds;
      const p = paintItem(it, ch.filter(k => k != 'r'), () => matFits(it.show, it.ans, ['c']));
      return finish(it, p);
    }

    // ---- numbers ----
    function num(rules, max) {
      const rule = pick(rules);
      let v, n = 5;
      const ar = (s, d, m) => range(m).map(i => s + i * d);
      switch (rule) {
        case 'add1': v = ar(R(0, 10), R(1, 3), n); break;
        case 'add': v = ar(R(1, 20), pick([2, 3, 4, 5, 10]), n); break;
        case 'sub1': { const d = R(1, 3); v = ar(R(4 * d + 1, 20), -d, n); break; }
        case 'sub': { const d = pick([2, 3, 4, 5, 10]); v = ar(R(5 * d + 1, Math.min(100, 5 * d + 40)), -d, n); break; }
        case 'addbig': v = ar(R(10, 40), R(6, 12), n); break;
        case 'mul2': { const s = R(1, 5); v = range(n).map(i => s * 2 ** i); break; }
        case 'mul': { const q = pick([2, 3]), s = q == 2 ? R(1, 6) : R(1, 3); v = range(n).map(i => s * q ** i); break; }
        case 'alt': { const a = R(1, 5), b = pick([2, 3, 4, 5, 6, 8, 10].filter(x => x != a)); let x = R(1, 15); v = [x]; for (let i = 1; i < n; i++) v.push(x += i % 2 ? a : b); break; }
        case 'sq': { const s = R(1, 4); v = range(n).map(i => (s + i) ** 2); break; }
        case 'sqoff': { const s = R(1, 4), o = pick([-1, 1, 2, 3]); v = range(n).map(i => (s + i) ** 2 + o); break; }
        case 'tri': { const s = R(1, 4); v = range(n).map(i => (s + i) * (s + i + 1) / 2); break; }
        case 'affine': { const a = pick([2, 2, 3]), b = pick(a == 2 ? [-1, 1, 2, 3] : [-1, 1]); let x = R(a == 2 ? 2 : 1, a == 2 ? 6 : 3); v = [x]; for (let i = 1; i < n; i++) v.push(x = a * x + b); break; }
        case 'fib': { let a = R(1, 4), b = R(a, a + 4); v = [a, b]; while (v.length < n) v.push(v[v.length - 1] + v[v.length - 2]); break; }
        case 'inter': {
          n = 6;
          const s0 = R(1, 10), e0 = pick([1, 2, 3, 5]), s1 = R(20, 40), e1 = -pick([1, 2, 3, 4]);
          v = range(n + 1).map(i => i % 2 ? s1 + ((i - 1) / 2) * e1 : s0 + (i / 2) * e0);
          break;
        }
      }
      if (rule != 'inter') {
        // the next term of the same rule
        const nx = numNext(v);
        if (nx.size != 1) return null;
        v.push([...nx][0]);
      }
      const ans = v[n], show = v.slice(0, n);
      if (v.some(x => x < 0 || x > 999) || ans > max) return null;
      const nx = numNext(show);
      if (nx.size != 1 || !nx.has(ans)) return null;
      const last = show[n - 1], dl = last - show[n - 2], d0 = show[1] - show[0];
      const cands = [last + dl, ans + 1, ans - 1, ans + 2, ans - 2, last + d0, ans + dl, ans - dl, ans + 10, ans - 10, last * 2, last + dl + 1]
        .filter((x, i, a) => x > 0 && x !== ans && a.indexOf(x) == i && !nx.has(x) && Math.abs(x - ans) <= Math.max(12, ans * 0.6) && x <= max);
      if (cands.length < 3) return null;
      // the copy mistake (the same step again) first, then the near misses in random order
      const ds = [cands[0]].concat(shuf(cands.slice(1)).slice(0, 2));
      const ch = shuf(ds.concat([ans]));
      const it = { k: 'num', show, ch, a: ch.indexOf(ans), rule, at: ['v'] };
      return unique(it) ? it : null;
    }

    return { seq, odd, ana, mat, num, pick, R, shuf };
  }

  // the items of a puzzle: band and tier choose the kinds and how many attributes change
  function make(band, level, rnd) {
    const m = maker(rnd), t = tierOf(level);
    const plan = {
      A: [() => m.seq(SEQ.A1[t]), () => m.odd(t == 0 ? 's' : m.pick(t == 1 ? ['z', 'n'] : ['s', 'z', 'n']), t == 2 ? 1 : 0), () => m.seq(SEQ.A2[t])],
      B: [() => m.num(NUM.B[t], 100), () => m.seq(SEQ.B[t]), () => m.ana(t == 2 ? 2 : 1, t > 0), () => m.odd(m.pick(['s', 'z', 'n']), t == 2 ? 2 : 1)],
      C: [() => m.mat(t == 0 ? 1 : 2, ['latin', 'prog', 'rowc']), () => m.num(NUM.C[t], 999), () => m.seq(SEQ.C[t]), () => m.mat(t == 0 ? 1 : 2, ['latin', 'prog', 'rowc'])],
      D: [() => m.mat(t == 0 ? 2 : 3, ['latin', 'prog', 'rowc']), () => m.num(NUM.D[t], 999), () => m.seq(SEQ.D[t]), () => m.mat(t == 0 ? 2 : 3, t == 2 ? ['latin', 'prog'] : ['latin', 'prog', 'rowc'])],
    }[band];
    // band B mixes the order of its four kinds by level
    const order = band == 'B' ? range(4).map(i => (i + level) % 4) : range(plan.length);
    const items = order.map(i => {
      for (let tries = 0; tries < 400; tries++) { const it = plan[i](); if (it) return it; }
      throw new Error('pattern: no item for ' + band + level);
    });
    return { v: 1, band, level, items };
  }
  const solve = p => p.items.map(it => it.a);

  /* ---------- words: prompts and hints ---------- */
  const ASK = { seq: 'What comes next?', num: 'What number comes next?', odd: 'Which one does not belong?', ana: 'Which one goes in the box?', mat: 'Which one goes in the box?' };
  const WATCH = { s: 'the shapes', z: 'the sizes', n: 'how many there are', r: 'where the arrow points' };
  const and = a => a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
  const val = (k, v) => k == 's' ? SHAPES[v] : k == 'z' ? SIZES[v] : k == 'n' ? String(v) : DIRS[v];
  const turnWords = d => {
    const dd = d > 4 ? d - 8 : d, a = Math.abs(dd);
    return `turns ${a == 2 ? 'a quarter turn' : a == 1 ? 'an eighth of a turn' : a + ' eighths of a turn'} ${dd > 0 ? 'the way clock hands go' : 'the other way'}`;
  };
  // the words of a tile, for aria labels: "2 small red circles"
  function say(t) {
    const nm = SHAPES[t.s] + (t.n > 1 ? 's' : ''), dir = t.s == ARROW ? ` pointing ${DIRS[t.r]}` : '';
    return `${t.n > 1 ? t.n + ' ' : ''}${SIZES[t.z]} ${COLS[t.c]} ${nm}${dir}`;
  }
  const NUMRULE = {
    add1: v => `Each number is ${v[1] - v[0]} more than the one before.`,
    add: v => `Each number is ${v[1] - v[0]} more than the one before.`,
    addbig: v => `Each number is ${v[1] - v[0]} more than the one before.`,
    sub1: v => `Each number is ${v[0] - v[1]} less than the one before.`,
    sub: v => `Each number is ${v[0] - v[1]} less than the one before.`,
    mul2: () => 'Each number is double the one before.',
    mul: v => v[1] / v[0] == 2 ? 'Each number is double the one before.' : 'Each number is 3 times the one before.',
    alt: v => `It goes up ${v[1] - v[0]}, then ${v[2] - v[1]}, then ${v[1] - v[0]}, then ${v[2] - v[1]}.`,
    sq: v => `They are square numbers: ${Math.sqrt(v[0])} x ${Math.sqrt(v[0])}, ${Math.sqrt(v[1])} x ${Math.sqrt(v[1])}, and so on.`,
    sqoff: v => `It goes up ${v[1] - v[0]}, ${v[2] - v[1]}, ${v[3] - v[2]}: each jump is 2 more than the last.`,
    tri: v => `It goes up ${v[1] - v[0]}, ${v[2] - v[1]}, ${v[3] - v[2]}: each jump is 1 more than the last.`,
    affine: v => { const a = (v[2] - v[1]) / (v[1] - v[0]), b = v[1] - a * v[0]; return `Times ${a}, then ${b < 0 ? 'take away ' + -b : 'add ' + b}.`; },
    fib: () => 'Each number is the two numbers before it added together.',
    inter: v => `Two patterns take turns: ${v[0]}, ${v[2]}, ${v[4]} and ${v[1]}, ${v[3]}, ${v[5]}.`,
  };
  const NUMWATCH = { fib: 'Look at the two numbers before each one.', inter: 'Look at every other number.' };
  // the rule of one attribute of a sequence, in words
  function seqRule(it, k) {
    const u = it.spec[k];
    if (/^[+-]/.test(u)) return k == 'n' ? (+u > 0 ? 'There is one more each time.' : 'There is one less each time.') : `The arrow ${turnWords(+u)} each time.`;
    const v = it.show.slice(0, u.length).map(t => val(k, t[k]));
    const nm = { s: 'The shapes go', z: 'The sizes go', n: 'The numbers of shapes go', r: 'The arrow points' }[k];
    return `${nm} ${v.join(', ')}, then again.`;
  }
  function matRule(it, k) {
    const r = it.rules[k], row = it.show.slice(0, 3).map(t => t[k]);
    if (r == 'rowc') return { s: 'In each row, the shapes are the same.', z: 'In each row, the sizes are the same.', n: 'In each row, every picture has the same number of shapes.', r: 'In each row, the arrows point the same way.' }[k];
    const srt = row.slice().sort((a, b) => a - b);
    if (r == 'latin') return {
      s: `In each row there is one ${and(row.map(v => SHAPES[v]))}.`.replace(/, /g, ', one ').replace(' and ', ' and one '),
      z: 'In each row there is one small, one medium and one big picture.',
      n: `In each row there are pictures with ${and(srt.map(String))} shapes.`,
      r: `In each row the arrows point ${and(row.map(v => DIRS[v]))}, in some order.`,
    }[k];
    if (k == 'z') return row[0] < row[1] ? 'In each row, the shapes get bigger.' : 'In each row, the shapes get smaller.';
    if (k == 'n') return row[0] < row[1] ? 'In each row, there is one more shape each time.' : 'In each row, there is one less shape each time.';
    return `In each row, the arrow ${turnWords((row[1] - row[0] + 8) & 7)} each time.`;
  }
  function anaRule(it) {
    const [A, B] = it.show;
    return 'From the first picture to the second, ' + and(it.x.map(k => k == 's' ? `the ${SHAPES[A.s]} turns into a ${SHAPES[B.s]}`
      : k == 'z' ? `it gets ${B.z > A.z ? 'bigger' : 'smaller'}` : `${A.n} ${A.n > 1 ? 'shapes become' : 'shape becomes'} ${B.n}`)) + '.';
  }
  // the hint words of tier 1 and 2
  function hintText(it, tier) {
    if (it.k == 'num') return tier == 1 ? (NUMWATCH[it.rule] || 'Look at how each number changes from the one before.') : NUMRULE[it.rule](it.show);
    if (tier == 1) return 'Look at ' + and(it.at.map(k => WATCH[k])) + '.';
    const k = it.at[0];
    if (it.k == 'seq') return it.at.map(a => seqRule(it, a)).join(' ');
    if (it.k == 'mat') return it.at.map(a => matRule(it, a)).join(' ');
    if (it.k == 'ana') return anaRule(it);
    const t = it.ch[(it.a + 1) % 4];
    return { s: `Three of them are ${SHAPES[t.s]}s.`, z: `Three of them are ${SIZES[t.z]}.`, n: `Three of them have ${t.n} ${t.n > 1 ? 'shapes' : 'shape'}.` }[k];
  }

  /* ---------- drawing ---------- */
  const f1 = x => Math.round(x * 10) / 10;
  const STAR = (() => {
    let d = '';
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 16 : 37;
      d += (i ? 'L' : 'M') + f1(r * Math.cos(a)) + ' ' + f1(r * Math.sin(a) + 3);
    }
    return d + 'Z';
  })();
  // shapes in a box of about -38..38 around 0,0 (the arrow points right); g: a gloss stroke on the side toward the light
  const SP = [
    { d: 'M-35 0A35 35 0 1 1 35 0A35 35 0 1 1 -35 0Z', g: 'M-22 -14A25 25 0 0 1 -8 -25' },
    { d: 'M-29 -29H29V29H-29Z', g: 'M-20 -20H-6' },
    { d: 'M0 -33L35 29H-35Z', g: 'M-8 -12L-16 3' },
    { d: 'M0 -38L35 0L0 38L-35 0Z', g: 'M-20 -8L-9 -20' },
    { d: STAR, g: 'M-9 -9L-4 -21' },
    { d: 'M0 33C-44 6 -38 -31 -17 -31C-7 -31 -1 -24 0 -17C1 -24 7 -31 17 -31C38 -31 44 6 0 33Z', g: 'M-26 -9C-27 -18 -22 -23 -15 -24' },
    { d: 'M-34 -12H2V-30L36 0L2 30V12H-34Z', g: 'M-27 -5H-5', turn: true },
  ];
  // copies of a shape: where they sit (in a 100 x 100 tile) and how big, by count
  const SPOT = {
    1: [[50, 50]], 2: [[28, 50], [72, 50]], 3: [[50, 28], [28, 71], [72, 71]], 4: [[29, 29], [71, 29], [29, 71], [71, 71]],
    5: [[26, 26], [74, 26], [50, 50], [26, 74], [74, 74]],
  };
  const SCALE = { 1: 1.08, 2: 0.54, 3: 0.52, 4: 0.48, 5: 0.4 }, ZF = [0.54, 0.77, 1];
  function copy(t, x, y, k) {
    const s = SP[t.s], rot = s.turn ? ` rotate(${t.r * 45})` : '';
    return `<g transform="translate(${x} ${y}) scale(${f1(k * 100) / 100})">` +
      `<path class="pt-sw" transform="translate(4 5)${rot}" d="${s.d}"/>` +
      `<path class="pt-sd"${rot ? ` transform="${rot.trim()}"` : ''} d="${s.d}"/>` +
      `<path class="pt-sb" transform="translate(-3 -3)${rot} scale(.86)" d="${s.d}"/>` +
      `<path class="pt-sg" transform="translate(-3 -3)${rot} scale(.86)" d="${s.g}"/></g>`;
  }
  function tile(t) {
    const k = SCALE[t.n] * ZF[t.z];
    return `<svg class="pt-t" viewBox="0 0 100 100" aria-hidden="true"><g class="pt-c${t.c}">` +
      SPOT[t.n].map(([x, y]) => copy(t, x, y, k)).join('') + '</g></svg>';
  }

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState() || { i: 0, miss: 0, h: 0, x: [], g: [] }, busy = 0, alive = true;
    const N = p.items.length;
    const face = (it, c) => it.k == 'num' ? `<b class="pt-nm">${c}</b>` : tile(c);
    const cell = (inner, cls) => `<span class="pt-cell${cls ? ' ' + cls : ''}">${inner}</span>`;
    const qbox = '<span class="pt-cell pt-q" aria-label="The missing one"><b>?</b></span>';
    function board(it) {
      if (it.k == 'odd') return '';
      if (it.k == 'num') return `<div class="pt-board pt-row pt-nrow" style="--n:${it.show.length + 1}">${it.show.map(v => cell(`<b class="pt-nm">${v}</b>`)).join('')}${qbox}</div>`;
      if (it.k == 'seq') {
        const n = it.show.length + 1;
        return `<div class="pt-board pt-row${n > 6 ? ' pt-wrap' : ''}" style="--n:${n};--n2:${Math.ceil(n / 2)}" role="img" aria-label="A row of pictures">` +
          it.show.map(t => cell(tile(t))).join('') + qbox + '</div>';
      }
      const w = it.k == 'mat' ? 3 : 2;
      return `<div class="pt-board pt-grid g${w}" role="img" aria-label="${w} by ${w} pictures">${it.show.map(t => cell(tile(t))).join('')}${qbox}</div>`;
    }
    function draw() {
      const it = p.items[st.i];
      const dots = range(N).map(i => `<i class="${i < st.i ? 'on' : i == st.i ? 'now' : ''}"></i>`).join('');
      const chs = it.ch.map((c, i) => {
        const x = st.x.includes(i), g = st.g.includes(i);
        const lab = it.k == 'num' ? String(c) : say(c);
        return `<button class="choice pt-ch${x ? ' wrong' : ''}${g ? ' off' : ''}" data-c="${i}" aria-label="${esc(lab)}"${x || g ? ' disabled' : ''}>${face(it, c)}</button>`;
      }).join('');
      el.innerHTML = `<div class="pt pt-${it.k}"><div class="pt-head"><span class="pt-dots" role="img" aria-label="Question ${st.i + 1} of ${N}">${dots}</span>` +
        `<p class="pt-ask">${esc(ASK[it.k])}</p>${UI.ibtn('speak', 'Hear the question', { size: 'sm', cls: 'pt-say' })}</div>` +
        `<div class="pt-main">${board(it)}<div class="pt-side"><p class="pt-tip" role="status"${st.h && st.h < 3 ? '' : ' hidden'}>${ico('hint', 24)}<span>${st.h && st.h < 3 ? esc(hintText(it, st.h)) : ''}</span></p>` +
        `<div class="pt-chs n${it.ch.length}">${chs}</div></div></div></div>`;
      el.querySelector('.pt-say').onclick = () => api.say(ASK[it.k]);
      el.querySelectorAll('.pt-ch').forEach(b => b.onclick = () => tap(+b.dataset.c, b));
    }
    function tap(i, b) {
      const it = p.items[st.i];
      if (busy || !alive || st.x.includes(i) || st.g.includes(i)) return;
      if (i !== it.a) {
        st.miss++;
        st.x.push(i);
        api.saveState(st);
        b.classList.add('wrong');
        b.disabled = true;
        api.sfx.wrong();
        return;
      }
      b.classList.add('right');
      el.querySelectorAll('.pt-ch').forEach(x => { x.disabled = true; });
      const q = el.querySelector('.pt-q');
      if (q) { q.classList.remove('pt-q'); q.classList.add('pt-got'); q.innerHTML = face(it, it.ch[it.a]); q.removeAttribute('aria-label'); }
      api.sfx.right(st.i + 3);
      const last = st.i == N - 1;
      st = { i: st.i + 1, miss: st.miss, h: 0, x: [], g: [] };
      if (last) { api.win({ mistakes: st.miss }); return; }
      api.saveState(st);
      busy = setTimeout(() => { busy = 0; if (alive) { draw(); if (api.band == 'A') api.say(ASK[p.items[st.i].k]); } }, 1100);
    }
    draw();
    if (api.band == 'A') api.say(ASK[p.items[st.i].k]);
    return {
      hint() {
        if (busy || st.i >= N) return false;
        const it = p.items[st.i];
        if (st.h >= 3) return false; // this item's hints are used up
        if (st.h < 2) {
          st.h++;
          api.saveState(st);
          const tip = el.querySelector('.pt-tip'), w = hintText(it, st.h);
          tip.querySelector('span').textContent = w;
          tip.hidden = false;
          api.say(w);
          return true;
        }
        // tier 3: two wrong choices go away (fewer when fewer are left)
        const left = it.ch.map((_, i) => i).filter(i => i !== it.a && !st.x.includes(i) && !st.g.includes(i));
        if (!left.length) return false;
        st.h = 3;
        const go = left.slice(0, 2);
        st.g.push(...go);
        api.saveState(st);
        go.forEach(i => { const b = el.querySelector(`.pt-ch[data-c="${i}"]`); b.classList.add('off'); b.disabled = true; });
        el.querySelector('.pt-tip').hidden = true;
        return true;
      },
      destroy() { alive = false; clearTimeout(busy); },
    };
  }

  return { make, solve, mount, hintText, tile, say, seqNext, numNext, unique, SHAPES, COLS };
})();

BT.reg({
  id: 'pattern', name: 'Patterns', icon: 'skill-pattern', bands: 'ABCD', allow: 1,
  rules: 'Find the picture or number that fits the pattern.',
  make: PAT.make, mount: PAT.mount, solve: PAT.solve,
});
