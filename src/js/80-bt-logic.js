/* ---------- Brain Teasers: Logic grids (P3-07; BRAIN_TEASERS.md 5.3, 7, 8; details in PROGRESS.md) ----------
   Type `logic`, bands B (3 children x 1 picture category), C (3 x 2) and D (4 x 2, the second ordered). Level L uses bank entries
   3(L-1)..3L-1 of PUZ.logic[band] (P3-06; read only inside functions, A11); the seeded rnd picks one and swaps the children's names
   (a name appears in a sentence only as itself, so every clue stays true). A tap cycles blank -> cross -> tick -> blank; a tick
   crosses the open squares of its row and column in its block (auto-cross, D can turn it off). A mark that breaks a rule the child
   can see is shown in amber at once and not counted; Check counts wrong marks (each once). Hints follow the grader's techniques
   (tools/puzzles/logic.js): a wrong mark, a tick's lines, clue mark, only place left, link, two-way clue, chain; tier 1 points,
   tier 2 explains, tier 3 places that one mark. State: {v: '0' blank '1' tick '2' cross per square of blocks (0,1), (0,2), (1,2)
   (row = item of the first category), a: auto-crosses, h: undo steps, miss, u: struck clues, hn: hint marks, seen, ac, hu, tab}. */
const LG = (() => {
  // the generator's names (tools/puzzles/logic.js NAMES), for the runtime swap
  const NAMES = ['Mia', 'Leo', 'Sam', 'Ava', 'Ben', 'Zoe', 'Max', 'Tom', 'Kim', 'Eli', 'Nia', 'Raj', 'Ana', 'Omar', 'Finn', 'Ella', 'Noah',
    'Maya', 'Owen', 'Kai', 'Ada', 'Luca', 'Nora', 'Hugo', 'Lena', 'Ravi', 'Yuki', 'Amir', 'Tara', 'Theo', 'Dev', 'Zara', 'Ivan', 'Jun'];
  // words for hints and the summary (the generator's CATS; test.js checks they rebuild every is / is-not sentence of the bank)
  const VB = { pet: 'has|does not have', snack: 'eats|does not eat', sport: 'plays|does not play', music: 'plays|does not play',
    ride: 'rides|does not ride', colour: 'likes|does not like', age: 'is|is not', house: 'lives at|does not live at', race: 'came|did not come' };
  const OWN = { swim: 'swims|does not swim|', skate: 'skates|does not skate|', paint: 'paints|does not paint|', read: 'reads|does not read|',
    draw: 'draws|does not draw|', puzzle: 'does|does not do|puzzles' };
  const NOUN = { pet: 'pet', snack: 'snack', sport: 'sport', hobby: 'hobby', music: 'instrument', ride: 'ride', colour: 'colour', age: 'age',
    house: 'house', race: 'place' };
  const BASE = { age: 'be', house: 'live at', race: 'come' };
  const EXT = { age: ['the youngest', 'the oldest'], house: ['at the smallest number', 'at the biggest number'], race: ['first', 'last'] };
  const ORD = ['1st', '2nd', '3rd', '4th'];
  const CHAIN = 2; // as the grader: a what-if must break within 2 steps
  const range = k => Array.from({ length: k }, (_, i) => i);
  const cap = s => s[0].toUpperCase() + s.slice(1);
  const lcf = s => (s.startsWith('The ') ? 't' + s.slice(1) : s);
  const list = a => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + (a.length > 2 ? ',' : '') + ' or ' + a[a.length - 1]);

  /* ---------- words ---------- */
  const catOf = (p, c) => p.cats[c - 1];
  const wordOf = (p, c, i) => (c ? p.items[c - 1][i] : p.names[i]);
  function verb(cat, w) { // [verb, negative verb, object]
    if ((cat == 'sport' || cat == 'hobby') && OWN[w]) return OWN[w].split('|');
    const [v, nv] = VB[cat].split('|');
    return [v, nv, cat == 'sport' || cat == 'colour' || cat == 'age' || cat == 'race' ? w : cat == 'house' ? 'number ' + w : 'the ' + w];
  }
  function who(cat, w) { // an item as a sentence subject
    if (cat == 'pet') return `the ${w}'s owner`;
    if (cat == 'age') return `the ${w}-year-old`;
    if (cat == 'house') return 'the child at number ' + w;
    const [v, , o] = verb(cat, w);
    return ('the child who ' + v + ' ' + o).trim();
  }
  const ref = (p, e) => (e[0] ? who(catOf(p, e[0]), wordOf(p, ...e)) : p.names[e[1]]);
  function vp(p, e, neg) {
    if (!e[0]) return (neg ? 'is not ' : 'is ') + p.names[e[1]];
    const [v, nv, o] = verb(catOf(p, e[0]), wordOf(p, ...e));
    return ((neg ? nv : v) + ' ' + o).trim();
  }
  // "Ben paints", "The child who paints is 7", "The cat's owner is not Mia": the lower category is the subject
  const sent = (p, e1, e2, neg) => cap(ref(p, e1) + ' ' + vp(p, e2, neg));
  const fact = (p, e1, e2, neg) => (e1[0] > e2[0] ? sent(p, e2, e1, neg) : sent(p, e1, e2, neg));
  // short names for "the square for Ben and paint"
  function lab(p, c, i) {
    if (!c) return p.names[i];
    const cat = catOf(p, c), w = wordOf(p, c, i);
    if (cat == 'age') return 'age ' + w;
    if (cat == 'house') return 'number ' + w;
    if (cat == 'race' || cat == 'sport' || cat == 'hobby' || cat == 'colour') return w == 'puzzle' ? 'puzzles' : w;
    return 'the ' + w;
  }
  const noun = (p, c) => (c ? NOUN[catOf(p, c)] : 'child');

  /* ---------- make: a bank puzzle by level, with the names swapped ---------- */
  function decode(entry) {
    const [names, cats, sol, gr, sc] = entry[0].split('|');
    const cs = cats.split(';').map(s => s.split('='));
    return { names: names.split(','), cats: cs.map(x => x[0]), items: cs.map(x => x[1].split(',')),
      sol: sol.split(';').map(s => Array.from(s, Number)), gr: +gr, sc: +sc, cl: entry.slice(1) };
  }
  function pickNames(rnd, n, maxLen) {
    const pool = NAMES.filter(x => x.length <= maxLen), out = [];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    for (const x of pool) if (out.length < n && !out.some(y => y[0] == x[0])) out.push(x);
    return out;
  }
  // bank puzzle k of a band with these names (every name of the puzzle replaced at once, as whole words)
  function build(band, k, names) {
    const d = decode(PUZ.logic[band][k]), old = d.names, n = old.length;
    const nm = names || old, re = new RegExp('\\b(' + old.join('|') + ')\\b', 'g');
    const cl = d.cl.map(q => q.slice(0, -1).concat(q[q.length - 1].replace(re, m => nm[old.indexOf(m)])));
    const O = d.cats.findIndex(c => PUZ.logic.cats[c] && PUZ.logic.cats[c].ordered) + 1;
    return { b: band, k, n, K: d.cats.length, O, names: nm.slice(0, n), cats: d.cats, items: d.items, sol: d.sol, gr: d.gr, sc: d.sc, cl };
  }
  function make(band, level, rnd) {
    const L = Math.max(1, Math.min(12, +level || 1)), list = PUZ.logic[band];
    const k = Math.min(list.length - 1, 3 * (L - 1) + Math.floor(rnd() * 3));
    const n = decode(list[k]).names.length;
    return build(band, k, pickNames(rnd, n, band == 'B' ? 4 : 9));
  }

  /* ---------- geometry: blocks (0,1), (0,2), (1,2); square = block * n*n + row * n + column ---------- */
  const CX = new WeakMap();
  function ctx(p) {
    if (CX.has(p)) return CX.get(p);
    const n = p.n, nn = n * n, B = p.K == 1 ? [[0, 1]] : [[0, 1], [0, 2], [1, 2]];
    // ch[c][i]: the child of entity (c, i)
    const ch = [range(n)].concat(p.sol.map(s => { const r = []; s.forEach((it, kid) => { r[it] = kid; }); return r; }));
    const cl = p.cl.map((q, qi) => (q[0] == 'or' ? { k: 'or', qi, a: [q[1], q[2]], d: q[3], j: [q[4], q[5]], t: q[6] }
      : { k: q[0], qi, a: [q[1], q[2]], b: [q[3], q[4]], t: q[5] }));
    const lines = [];
    B.forEach((bl, k) => {
      for (let x = 0; x < n; x++) for (const row of [1, 0]) lines.push({ k, x, row, cells: range(n).map(y => k * nn + (row ? x * n + y : y * n + x)) });
    });
    const x = { p, n, nn, B, K: p.K, O: p.O, ch, cl, N: B.length * nn, lines };
    CX.set(p, x);
    return x;
  }
  const bix = (a, b) => (a == 0 ? b - 1 : 2);
  const at = (x, a, i, b, j) => (a < b ? bix(a, b) * x.nn + i * x.n + j : bix(b, a) * x.nn + j * x.n + i);
  const pos = (x, c) => { const k = Math.floor(c / x.nn), r = c % x.nn; return [x.B[k][0], Math.floor(r / x.n), x.B[k][1], r % x.n]; };
  const solv = (x, c) => { const [a, i, b, j] = pos(x, c); return x.ch[a][i] == x.ch[b][j] ? 1 : -1; };
  const lineOf = (x, c, row) => x.lines.find(L => L.row == row && L.cells.includes(c));
  const lineEnt = (x, L) => (L.row ? [x.B[L.k][0], L.x] : [x.B[L.k][1], L.x]); // whose line it is
  const lineCross = (x, L) => (L.row ? x.B[L.k][1] : x.B[L.k][0]); // the category along it
  // block (1,2) is drawn turned (rows = the second category), so its engine rows are columns on screen
  const rowcol = (x, L) => ((x.B[L.k][0] == 1) == !!L.row ? 'column' : 'row');

  /* ---------- the grader's marks (tools/puzzles/logic.js), on an Int8Array: 0 open, 1 tick, -1 cross ---------- */
  const gnew = (x, m) => ({ x, m: m || new Int8Array(x.N), bad: false });
  const gcopy = g => ({ x: g.x, m: g.m.slice(), bad: g.bad });
  const get = (g, a, i, b, j) => g.m[at(g.x, a, i, b, j)];
  // a tick crosses the rest of its row and column; a mark over the opposite one is a clash (g.bad)
  function mark(g, a, i, b, j, v) {
    const c = at(g.x, a, i, b, j), cur = g.m[c];
    if (cur == v) return false;
    if (cur) { g.bad = true; return true; }
    g.m[c] = v;
    if (v == 1) for (let k = 0; k < g.x.n; k++) {
      if (k != j) mark(g, a, i, b, k, -1);
      if (k != i) mark(g, a, k, b, j, -1);
    }
    return true;
  }
  function broken(g) {
    if (g.bad) return { why: 'bad' };
    for (const L of g.x.lines) {
      let cr = 0, tk = 0;
      for (const c of L.cells) { if (g.m[c] < 0) cr++; else if (g.m[c] > 0) tk++; }
      if (cr == g.x.n || tk > 1) return { why: tk > 1 ? 'two' : 'empty', L };
    }
    return null;
  }
  const cand = (g, e, d) => range(g.x.n).filter(k => get(g, e[0], e[1], d, k) != -1);
  const REL = { gt: (v, w) => v > w, lt: (v, w) => v < w, nx: (v, w) => Math.abs(v - w) == 1 };
  // every application of technique t, in the grader's order: {t, marks: [[a, i, b, j, v, why]], ...}
  function* apps(g, t, used) {
    const x = g.x, n = x.n;
    if (t == 1) {
      for (const q of x.cl) {
        if (q.k != 'is' && q.k != 'not') continue;
        if (used) { if (used.has(q.qi)) continue; used.add(q.qi); }
        yield { t, q, marks: [[...q.a, ...q.b, q.k == 'is' ? 1 : -1]] };
      }
    } else if (t == 2) {
      for (const L of x.lines) {
        let open = -1, cnt = 0, tick = false;
        for (const c of L.cells) { if (g.m[c] > 0) tick = true; if (!g.m[c]) { open = c; cnt++; } }
        if (!tick && cnt == 1) yield { t, L, marks: [[...pos(x, open), 1]] };
      }
    } else if (t == 3) {
      for (let c = 0; c < x.N; c++) {
        if (g.m[c] != 1) continue;
        const [a, i, b, j] = pos(x, c);
        for (let d = 0; d <= x.K; d++) {
          if (d == a || d == b) continue;
          const marks = [];
          for (let k = 0; k < n; k++) {
            const u = get(g, a, i, d, k), w = get(g, b, j, d, k);
            if (u && !w) marks.push([b, j, d, k, u, [a, i, d, k, u]]);
            else if (w && !u) marks.push([a, i, d, k, w, [b, j, d, k, w]]);
          }
          yield { t, tick: [a, i, b, j], marks };
        }
      }
    } else if (t == 4) {
      for (const q of x.cl) {
        if (q.k == 'is' || q.k == 'not') continue;
        const marks = [];
        if (q.k == 'or') {
          for (let k = 0; k < n; k++) if (!q.j.includes(k)) marks.push([...q.a, q.d, k, -1, 'or']);
        } else {
          const rel = REL[q.k], c1 = cand(g, q.a, x.O), c2 = cand(g, q.b, x.O);
          for (const v of c1) if (!c2.some(w => rel(v, w))) marks.push([...q.a, x.O, v, -1, ['a', c2]]);
          for (const w of c2) if (!c1.some(v => rel(v, w))) marks.push([...q.b, x.O, w, -1, ['b', c1]]);
          if (q.a[0] != q.b[0]) marks.push([...q.a, ...q.b, -1, 'diff']);
        }
        yield { t, q, marks };
      }
    } else if (t == 5) {
      const used2 = new Set(x.cl.filter(q => q.k == 'is' || q.k == 'not').map(q => q.qi));
      for (let c = 0; c < x.N; c++) {
        if (g.m[c]) continue;
        const tr = gcopy(g), tu = new Set(used2), steps = [];
        mark(tr, ...pos(x, c), 1);
        let br = broken(tr);
        for (let s = 0; s < CHAIN && !br; s++) {
          let moved = null;
          for (let tt = 1; tt <= 4 && !moved; tt++) moved = step(tr, tt, tu);
          if (!moved) break;
          steps.push(moved);
          br = broken(tr);
        }
        if (br) yield { t, marks: [[...pos(x, c), -1]], steps, br };
      }
    }
  }
  // the grader's step: the first application that changes something, applied whole; returns it with its first new mark (m)
  function step(g, t, used) {
    for (const ap of apps(g, t, used)) {
      let first = null;
      for (const m of ap.marks) if (get(g, ...m.slice(0, 4)) != m[4] && !first) first = m;
      let ch = false;
      for (const m of ap.marks) ch = mark(g, ...m.slice(0, 5)) || ch;
      if (ch) return Object.assign(ap, { m: first || ap.marks[0] });
    }
    return null;
  }
  // the first new mark technique t can make (nothing is changed)
  function find(g, t) {
    for (const ap of apps(g, t, null)) for (const m of ap.marks) if (get(g, ...m.slice(0, 4)) != m[4]) return Object.assign(ap, { m });
    return null;
  }

  /* ---------- the child's state ---------- */
  const val = (st, c) => (st.v[c] == '1' ? 1 : st.v[c] == '2' ? -1 : 0);
  function fresh(p) {
    const N = ctx(p).N;
    return { v: '0'.repeat(N), a: '0'.repeat(N), h: [], miss: 0, u: [], hn: [], seen: [], ac: 1, hu: 0, tab: 0 };
  }
  function fit(p, st) {
    const x = ctx(p), N = x.N, int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi, sq = a => Array.isArray(a) && a.every(c => int(c, 0, N - 1));
    if (!st || typeof st != 'object' || typeof st.v != 'string' || typeof st.a != 'string' || st.v.length != N || st.a.length != N) return false;
    if (!/^[012]*$/.test(st.v) || !/^[01]*$/.test(st.a) || !int(st.miss, 0, 1e6) || !sq(st.hn) || !sq(st.seen)) return false;
    if (!Array.isArray(st.u) || !st.u.every(q => int(q, 0, p.cl.length - 1)) || !int(st.ac, 0, 1) || !int(st.hu, 0, 1) || !int(st.tab, 0, x.B.length - 1)) return false;
    return Array.isArray(st.h) && st.h.every(s => Array.isArray(s) && s.length && s.every(e => Array.isArray(e) && e.length == 3 && int(e[0], 0, N - 1) &&
      /^[012]$/.test(e[1]) && /^[01]$/.test(e[2])));
  }
  function setC(st, c, v, a, step) {
    if (step) step.push([c, st.v[c], st.a[c]]);
    st.v = st.v.slice(0, c) + v + st.v.slice(c + 1);
    st.a = st.a.slice(0, c) + a + st.a.slice(c + 1);
  }
  const lines2 = (x, c) => [lineOf(x, c, 1), lineOf(x, c, 0)];
  // a tick in: auto-cross the open squares of its row and column
  function tickIn(p, st, c, step) {
    const x = ctx(p);
    setC(st, c, '1', '0', step);
    if (st.ac) for (const L of lines2(x, c)) for (const q of L.cells) if (q != c && st.v[q] == '0') setC(st, q, '2', '1', step);
  }
  // a tick out: the crosses it put in go too, unless another tick in their line still needs them
  function tickOut(p, st, c, step) {
    const x = ctx(p);
    setC(st, c, '0', '0', step);
    for (const L of lines2(x, c)) for (const q of L.cells) {
      if (st.a[q] != '1' || st.hn.includes(q)) continue;
      if (lines2(x, q).some(M => M.cells.some(r => st.v[r] == '1'))) continue;
      setC(st, q, '0', '0', step);
    }
  }
  const pushStep = (st, s) => { if (s.length) { st.h.push(s); if (st.h.length > 60) st.h.shift(); } };
  const won = (p, st) => { const x = ctx(p); return range(x.N).every(c => (val(st, c) == 1) == (solv(x, c) == 1)); };
  // a tap on square c: blank -> cross -> tick -> blank. {ign} or {ok, now, won}
  function tap(p, st, c) {
    if (st.hn.includes(c)) return { ign: 'hint' };
    const s = [], cur = st.v[c];
    if (cur == '0') setC(st, c, '2', '0', s);
    else if (cur == '2') tickIn(p, st, c, s);
    else tickOut(p, st, c, s);
    pushStep(st, s);
    return { ok: true, now: st.v[c], won: won(p, st) };
  }
  function undo(p, st) {
    const s = st.h.pop();
    if (!s) return null;
    for (let i = s.length - 1; i >= 0; i--) if (!st.hn.includes(s[i][0])) setC(st, s[i][0], s[i][1], s[i][2]);
    return s[0][0];
  }
  // Check: the marks that are not right; the new ones count as mistakes
  function check(p, st) {
    const x = ctx(p), bad = range(x.N).filter(c => val(st, c) && val(st, c) != solv(x, c)), add = bad.filter(c => !st.seen.includes(c));
    st.miss += add.length;
    st.seen = st.seen.concat(add);
    return { bad, add: add.length };
  }
  // a hint's mark goes in and locks (no tap or undo takes it)
  function place(p, st, c, v) {
    const s = [];
    if (st.v[c] == '1' && v < 0) tickOut(p, st, c, s);
    if (v > 0) tickIn(p, st, c, s); else setC(st, c, '2', '0', s);
    if (!st.hn.includes(c)) st.hn.push(c);
    st.h = st.h.filter(e => !e.some(q => q[0] == c));
  }

  /* ---------- what the child can see is wrong: Map square -> why ---------- */
  function conflicts(p, st) {
    const x = ctx(p), out = new Map(), add = (c, w) => { if (!out.has(c)) out.set(c, w); }, V = c => val(st, c);
    for (const L of x.lines) {
      const t = L.cells.filter(c => V(c) > 0);
      if (t.length > 1) t.forEach(c => add(c, { k: 'two', L }));
      if (L.cells.every(c => V(c) < 0)) L.cells.forEach(c => add(c, { k: 'empty', L }));
    }
    const ordOf = e => range(x.n).find(k => V(at(x, ...e, x.O, k)) > 0);
    for (const q of x.cl) {
      if (q.k == 'is' || q.k == 'not') {
        const c = at(x, ...q.a, ...q.b);
        if (V(c) == (q.k == 'is' ? -1 : 1)) add(c, { k: 'clue', q });
      } else if (q.k == 'or') {
        for (let k = 0; k < x.n; k++) if (!q.j.includes(k) && V(at(x, ...q.a, q.d, k)) > 0) add(at(x, ...q.a, q.d, k), { k: 'clue', q });
        const cs = q.j.map(k => at(x, ...q.a, q.d, k));
        if (cs.every(c => V(c) < 0)) cs.forEach(c => add(c, { k: 'clue', q }));
      } else {
        if (q.a[0] != q.b[0] && V(at(x, ...q.a, ...q.b)) > 0) add(at(x, ...q.a, ...q.b), { k: 'clue', q });
        const u = ordOf(q.a), w = ordOf(q.b);
        if (u != null && w != null && !REL[q.k](u, w)) [at(x, ...q.a, x.O, u), at(x, ...q.b, x.O, w)].forEach(c => add(c, { k: 'clue', q }));
      }
    }
    for (let c = 0; c < x.N; c++) {
      if (V(c) != 1) continue;
      const [a, i, b, j] = pos(x, c);
      for (let d = 0; d <= x.K; d++) {
        if (d == a || d == b) continue;
        for (let k = 0; k < x.n; k++) {
          const c1 = at(x, a, i, d, k), c2 = at(x, b, j, d, k);
          if (V(c1) && V(c2) && V(c1) != V(c2)) { add(c1, { k: 'link', tick: c }); add(c2, { k: 'link', tick: c }); }
        }
      }
    }
    return out;
  }
  const pair = (p, c) => { const [a, i, b, j] = pos(ctx(p), c); return lab(p, a, i) + ' and ' + lab(p, b, j); };
  const mfact = (p, m, v) => fact(p, [m[0], m[1]], [m[2], m[3]], (v == null ? m[4] : v) < 0); // a mark as a sentence
  const cfact = (p, c, v) => mfact(p, pos(ctx(p), c), v);
  function why(p, w) { // a conflict in words
    const x = ctx(p);
    if (w.k == 'clue') return `That does not fit clue ${w.q.qi + 1}: ${w.q.t}`;
    if (w.k == 'link') return `That does not fit your tick for ${pair(p, w.tick)}: ${cfact(p, w.tick, 1)}.`;
    const e = lineEnt(x, w.L), d = lineCross(x, w.L), where = `the ${rowcol(x, w.L)} for ${lab(p, ...e)}`;
    if (w.k == 'empty') return `Every square in ${where} is crossed. One of them needs a tick.`;
    return `Two ticks in ${where}. ` + (d ? `${cap(ref(p, e))} has just one ${noun(p, d)}.` : `Only one child ${vp(p, e)}.`);
  }

  /* ---------- hints: the next mark a child can make, and why ---------- */
  const mk = v => (v > 0 ? 'a tick' : 'a cross');
  const say3 = (p, c, v) => `${cap(mk(v))} for ${pair(p, c)}.`;
  // {kind, cell, v, q (clue index or -1), line (squares tier 1 shades), also (squares tier 2 rings besides the cell), say1, say2, say3}
  function nextStep(p, st) {
    const x = ctx(p);
    if (won(p, st)) return null;
    const base = (kind, cell, v, o) => Object.assign({ kind, cell, v, q: -1, line: [], also: [], say3: say3(p, cell, v) }, o);
    // 1. a mark that is not right (one the child can see clashing first)
    const wrong = range(x.N).filter(c => val(st, c) && val(st, c) != solv(x, c));
    if (wrong.length) {
      const cf = conflicts(p, st), c = wrong.find(q => cf.has(q)) ?? wrong[0];
      return base('wrong', c, solv(x, c), { line: lineOf(x, c, 1).cells,
        say1: 'One mark in the yellow line is not right yet.', say2: `This ${val(st, c) > 0 ? 'tick' : 'cross'} is not right: ${cfact(p, c, solv(x, c))}.` });
    }
    const g = gnew(x, Int8Array.from(range(x.N), c => val(st, c)));
    // 2. auto-cross off: the rest of a tick's lines
    for (let c = 0; c < x.N; c++) {
      if (g.m[c] != 1) continue;
      const q = lines2(x, c).flatMap(L => L.cells).find(r => !g.m[r]);
      if (q != null) return base('line', q, -1, { line: [c], also: [c], say1: `Look at your tick for ${pair(p, c)}.`,
        say2: `${cfact(p, c, 1)}, so ${lcf(cfact(p, q, -1))}.` });
    }
    // 3. the grader's techniques, easiest first
    for (let t = 1; t <= 5; t++) {
      const r = find(g, t);
      if (!r) continue;
      const m = r.m, cell = at(x, ...m.slice(0, 4)), v = m[4];
      if (t == 1) {
        return base('clue', cell, v, { q: r.q.qi, say1: `Look at clue ${r.q.qi + 1}: ${r.q.t}`,
          say2: `Clue ${r.q.qi + 1} says: ${r.q.t} So put ${mk(v)} for ${pair(p, cell)}.` });
      }
      if (t == 2) {
        const e = lineEnt(x, r.L);
        return base('only', cell, v, { line: r.L.cells, say1: `Look at the ${rowcol(x, r.L)} for ${lab(p, ...e)}.`,
          say2: `Every other ${noun(p, lineCross(x, r.L))} is crossed out for ${ref(p, e)}, so ${lcf(mfact(p, m))}.` });
      }
      if (t == 3) {
        const tick = at(x, ...r.tick), src = m[5];
        return base('link', cell, v, { line: [tick], also: [tick, at(x, ...src.slice(0, 4))], say1: `Look at the tick for ${pair(p, tick)}.`,
          say2: `${cfact(p, tick, 1)}. ${mfact(p, src)}, so ${lcf(mfact(p, m))}${v > 0 ? ' too' : ' either'}.` });
      }
      if (t == 4) {
        const q = r.q, w = m[5], pre = `Clue ${q.qi + 1} says: ${q.t} `;
        let s2;
        if (w == 'or') s2 = `${pre}So ${lcf(mfact(p, m))}.`;
        else if (w == 'diff') s2 = `Clue ${q.qi + 1} is about two different children, so ${lcf(mfact(p, m))}.`;
        else {
          const other = w[0] == 'a' ? q.b : q.a, cat = catOf(p, x.O), objs = w[1].map(k => verb(cat, wordOf(p, x.O, k))[2]);
          s2 = w[1].length == x.n ? `${pre}So ${ref(p, [m[0], m[1]])} cannot be ${EXT[cat][m[3] ? 1 : 0]}: ${lcf(mfact(p, m))}.`
            : `${pre}${cap(ref(p, other))} can only ${BASE[cat]} ${list(objs)}, so ${lcf(mfact(p, m))}.`;
        }
        return base('two-way', cell, v, { q: q.qi, say1: `Look at clue ${q.qi + 1} again: ${q.t}`, say2: s2 });
      }
      // 5. a what-if that breaks
      const then = r.steps.map(s => lcf(mfact(p, s.m)) + (s.q ? ` (clue ${s.q.qi + 1})` : '')), br = r.br;
      let end = 'that breaks a rule';
      if (br.L) {
        const e = lineEnt(x, br.L), d = lineCross(x, br.L);
        end = br.why == 'two' ? `two ticks would be in the ${rowcol(x, br.L)} for ${lab(p, ...e)}`
          : d ? `${ref(p, e)} would have no ${noun(p, d)} left` : `nobody would be left for ${lab(p, ...e)}`;
      }
      return base('chain', cell, v, { line: [cell], say1: `Look at the square for ${pair(p, cell)}. What if it had a tick?`,
        say2: `What if ${lcf(cfact(p, cell, 1))}? Then ${then.concat(end).join(', and ')}. That cannot be, so ${lcf(cfact(p, cell, -1))}.` });
    }
    // 4. never stuck (never needed by the bank: tools/test.js)
    const c = range(x.N).find(q => !g.m[q]);
    return base('guess', c, solv(x, c), { line: [c], say1: 'Try this square.', say2: 'Read the clues about this square again.' });
  }
  // hint(p, st, tier): {tier, kind, cell, v, q, line, mark, say, put ([cell, v] on tier 3)}; null when solved. Pure.
  function hint(p, st, tier) {
    const s = nextStep(p, st);
    if (!s) return null;
    const t = Math.max(1, Math.min(3, tier | 0));
    return { tier: t, kind: s.kind, cell: s.cell, v: s.v, q: t < 3 ? s.q : -1, line: t == 1 ? s.line : [], mark: t == 2 ? [s.cell].concat(s.also) : [],
      say: t == 1 ? s.say1 : t == 2 ? s.say2 : s.say3, put: t == 3 ? [s.cell, s.v] : null };
  }
  // the moves that win: the squares to tick, in the order the hints find them
  function solve(p) {
    const st = fresh(p), out = [];
    for (let i = 0; i < 400 && !won(p, st); i++) {
      const s = nextStep(p, st);
      place(p, st, s.cell, s.v);
      if (s.v > 0) out.push(s.cell);
    }
    return out;
  }
  // the answer in words: "Raj eats the cupcake and is 7."
  const summary = p => range(p.n).map(kid => p.names[kid] + ' ' + p.sol.map((s, c) => vp(p, [c + 1, s[kid]])).join(' and ') + '.');

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    const x = ctx(p), n = p.n, K = p.K, N = x.N, B = p.b == 'B', cats = PUZ.logic.cats;
    let st = api.loadState();
    if (!fit(p, st)) st = fresh(p);
    const timers = [];
    let marks = { line: [], cell: [], q: -1 }, msg = '', done = false, view = '', flash = [], sel = -1, pend = -1, pt = 0;
    // views of a two-category grid: all three blocks; the children's two blocks + the third (tabs); one block a tab
    const GROUPS = { full: [[0, 1, 2]], pair: [[0, 1], [2]], one: [[0], [1], [2]] };
    const group = () => (K == 1 ? [0] : GROUPS[view].find(g => g.includes(st.tab)));
    // a picture, a colour swatch, or the number for an item; c = 0 is a child's name
    function face(c, i, row) {
      if (!c) return `<b class="lg-nm">${esc(p.names[i])}</b>`;
      const cat = catOf(p, c), w = wordOf(p, c, i), pics = (cats[cat] || {}).pics;
      if (pics && pics[w]) return `<span class="lg-pic">${picFor(w, pics[w])}</span>`;
      if (cat == 'colour') return `<span class="lg-col"><i style="background:var(--ill-${esc(w)})"></i><small>${esc(w)}</small></span>`;
      if (cat == 'house') return `<span class="lg-num">${ico('home', 16)}${esc(w)}</span>`;
      if (cat == 'race') return `<span class="lg-num">${ORD[i]}</span>`;
      return `<span class="lg-num">${row ? '<small>Age</small>' : ''}${esc(w)}</span>`;
    }
    const aria = (c, i) => (c ? wordOf(p, c, i) : p.names[i]);
    const cats2 = K == 1 ? `${noun(p, 1)}` : `${noun(p, 1)} and ${noun(p, 2)}`;
    const intro = `Find each child's ${cats2}. Tap a square once for a cross (no), twice for a tick (yes).`;

    // clue cards: band B draws child + picture + tick or cross, every band has the sentence and a speak button
    const clueHTML = p.cl.map((q, qi) => {
      let pic = '';
      if (B) {
        const kid = q[1] ? q[4] : q[2], it = q[1] ? q[2] : q[4];
        pic = `<span class="lg-qp"><b class="lg-nm">${esc(p.names[kid])}</b>${face(1, it)}<i class="lg-qm ${q[0] == 'is' ? 'yes' : 'no'}">` +
          `${ico(q[0] == 'is' ? 'check' : 'close', 22)}</i></span>`;
      }
      return `<li class="lg-q" data-q="${qi}"><button class="lg-qb" data-q="${qi}" aria-pressed="false"><b class="lg-qn">${qi + 1}</b>` +
        `<span class="lg-qt">${pic}<span class="lg-qs">${esc(q[q.length - 1])}</span></span></button>` +
        `${UI.ibtn('speak', 'Read clue ' + (qi + 1), { size: 'sm', cls: 'lg-qsp', attrs: `data-s="${qi}"` })}</li>`;
    }).join('');
    const tools = UI.btn('Undo', { icon: 'undo', id: 'lgundo', size: 'sm' }) + UI.btn('Check', { icon: 'check-circle', id: 'lgcheck', size: 'sm' }) +
      (p.b == 'D' ? `<button class="btn soft sm lg-tb lg-ac" id="lgac" aria-label="Auto-cross" aria-pressed="true">${ico('close')}<span>Auto</span></button>` : '');
    const cl_ = c => cats[catOf(p, c)].label; // the grid's own category names ("Music", "Race")
    const tabName = g => (g.length == 2 ? 'Children' : g[0] < 2 ? cl_(x.B[g[0]][1]) : cl_(1) + ' + ' + cl_(2).toLowerCase());
    el.innerHTML = `<div class="lg lg-${p.b}" style="--n:${n}">` +
      `<div class="lg-say">${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'lg-spk' })}<p class="lg-msg" aria-live="polite"></p></div>` +
      `<div class="lg-board"><div class="lg-tabs" hidden></div><div class="lg-grid" role="group" aria-label="Logic grid"></div></div>` +
      `<div class="lg-tools">${tools}</div><ol class="lg-clues" aria-label="Clues">${clueHTML}</ol></div>`;
    const root = el.querySelector('.lg'), grid = root.querySelector('.lg-grid'), clues = root.querySelector('.lg-clues');
    const say_ = root.querySelector('.lg-say'), tabsEl = root.querySelector('.lg-tabs'), toolsEl = root.querySelector('.lg-tools');
    let cellEl = [];

    // the grid: column heads over each block, row heads left of each block row; block (1,2) is drawn turned (rows = 2nd category)
    function gridHTML() {
      const show = group();
      const blk = k => {
        const [a, b] = x.B[k];
        let h = '';
        for (let r = 0; r < n; r++) for (let q = 0; q < n; q++) {
          const c = a == 1 ? k * x.nn + q * n + r : k * x.nn + r * n + q;
          h += `<button class="lg-c" data-c="${c}"></button>`;
        }
        return `<div class="lg-blk" data-k="${k}">${h}</div>`;
      };
      const colsOf = k => x.B[k][a1(k)], rowsOf = k => x.B[k][1 - a1(k)];
      function a1(k) { return x.B[k][0] == 1 ? 0 : 1; } // which end of block k runs along the columns
      const hd = c => `<div class="lg-hd"><span class="lg-cat">${esc(cats[catOf(p, c)].label)}</span><span class="lg-hs">` +
        range(n).map(i => `<span class="lg-h" data-h="${c}-${i}" aria-label="${esc(aria(c, i))}">${face(c, i)}</span>`).join('') + '</span></div>';
      const rh = c => `<div class="lg-rhs">${range(n).map(i => `<span class="lg-h lg-r" data-h="${c}-${i}" aria-label="${esc(aria(c, i))}">${face(c, i, 1)}</span>`).join('')}</div>`;
      let h = '<i class="lg-corner"></i>';
      if (show.length == 1) return h + hd(colsOf(show[0])) + rh(rowsOf(show[0])) + blk(show[0]);
      if (show.length == 2) return h + hd(1) + hd(2) + rh(0) + blk(0) + blk(1);
      h += hd(1) + (K == 2 ? hd(2) : '') + rh(0) + blk(0) + (K == 2 ? blk(1) + rh(2) + blk(2) +
        `<div class="lg-key" aria-hidden="true"><span>${ico('close', 20)}</span>${ico('arrow-right', 16)}<span>${ico('check', 20)}</span></div>` : '');
      return h;
    }
    function buildGrid() {
      grid.innerHTML = gridHTML();
      const g = group();
      grid.className = 'lg-grid' + (g.length == 3 ? ' lg-g2' : g.length == 2 ? ' lg-gp' : '');
      tabsEl.hidden = K == 1 || view == 'full';
      if (!tabsEl.hidden) {
        tabsEl.innerHTML = UI.seg(GROUPS[view].map(gr => [gr[0], tabName(gr)]), g[0], { id: 'lgtabs', label: 'Part of the grid' });
        UI.segOn(tabsEl.firstChild, v => { st.tab = +v; SFX.click(); buildGrid(); store(); draw(); });
      }
      cellEl = [];
      grid.querySelectorAll('.lg-c').forEach(e => { cellEl[+e.dataset.c] = e; });
    }
    function tell(text, kind, speak) {
      msg = text;
      const m = root.querySelector('.lg-msg');
      m.textContent = text;
      m.className = 'lg-msg' + (kind ? ' ' + kind : '');
      if (speak) api.say(text);
    }
    root.querySelector('.lg-spk').onclick = () => { try { say(msg); } catch (e) {} };

    /* ---------- drawing ---------- */
    function draw() {
      const cf = conflicts(p, st), hs = new Set(), on = sel >= 0 ? pos(x, sel) : null;
      if (pend >= 0) cf.delete(pend);
      for (let c = 0; c < N; c++) {
        const e = cellEl[c];
        if (!e) continue;
        const v = st.v[c], [a, i, b, j] = pos(x, c);
        let cls = 'lg-c' + (v == '1' ? ' tk' : v == '2' ? ' cr' : '');
        if (st.hn.includes(c)) cls += ' hn';
        if (cf.has(c)) cls += ' cf';
        if (flash.includes(c)) cls += ' wr';
        if (marks.cell.includes(c)) cls += ' hl';
        else if (marks.line.includes(c)) cls += ' hh';
        if (c == sel) cls += ' sel';
        if (e.className != cls) e.className = cls;
        const html = (v == '1' ? ico('check') : v == '2' ? ico('close') : '') + (cf.has(c) ? `<span class="lg-wn">${ico('warning', 14)}</span>` : '');
        if (e._h !== html) { e.innerHTML = html; e._h = html; }
        e.setAttribute('aria-label', `${lab(p, a, i)} and ${lab(p, b, j)}: ${v == '1' ? 'tick' : v == '2' ? 'cross' : 'empty'}${cf.has(c) ? ', does not fit' : ''}`);
        if (on && c == sel) { hs.add(a + '-' + i); hs.add(b + '-' + j); }
      }
      grid.querySelectorAll('.lg-h').forEach(h => h.classList.toggle('on', hs.has(h.dataset.h)));
      clues.querySelectorAll('.lg-q').forEach(li => {
        const qi = +li.dataset.q, used = st.u.includes(qi), bad = [...cf.values()].some(w => w.q && w.q.qi == qi);
        li.className = 'lg-q' + (used ? ' used' : '') + (marks.q == qi ? ' hl' : '') + (bad ? ' cf' : '');
        li.querySelector('.lg-qb').setAttribute('aria-pressed', used ? 'true' : 'false');
      });
      const u = root.querySelector('#lgundo'), ac = root.querySelector('#lgac');
      u.disabled = !st.h.length || done;
      root.querySelector('#lgcheck').disabled = done;
      if (ac) { ac.setAttribute('aria-pressed', st.ac ? 'true' : 'false'); ac.classList.toggle('on', !!st.ac); }
      if (!tabsEl.hidden) tabsEl.querySelectorAll('button').forEach(b => {
        const gr = GROUPS[view].find(g => g[0] == +b.dataset.v);
        b.classList.toggle('lg-tcf', [...cf.keys()].some(c => gr.includes(Math.floor(c / x.nn))));
      });
    }

    /* ---------- layout: the grid is sized to the space left (section 8) ----------
       FR: the pieces the CSS adds around the squares (block padding 3 and square gap 2, head row height, gaps 6); must match the CSS. */
    const RH = B ? 76 : 52, MAX = B ? 92 : n == 3 ? 60 : 56, GAP = 6, MIN = 44;
    let lastW = 0, lastH = 0;
    const headH = cs => Math.max(44, Math.min(60, Math.round(cs * 0.75) + 16));
    // width and height of the grid at square size cs: across and down = blocks side by side and stacked; tabs adds the tab row
    function dims(cs, across, down, tabs) {
      const bw = n * cs + (n - 1) * 2 + 6;
      return { w: RH + across * (bw + GAP), h: headH(cs) + down * (bw + GAP) + (tabs ? 60 : 0) };
    }
    const fitCs = (w, h, a, d, t) => { let cs = MAX; while (cs > 30 && (dims(cs, a, d, t).w > w || dims(cs, a, d, t).h > h)) cs--; return cs; };
    function layout() {
      if (!el.isConnected) return;
      const ps = getComputedStyle(el);
      const aw = el.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
      const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
      lastW = aw; lastH = ah;
      const land = aw > ah * 1.15 && aw >= 640;
      root.classList.toggle('land', land);
      root.style.height = Math.max(320, ah) + 'px';
      // the talk line keeps two lines and the clue list at least about two clues (it scrolls; a long talk line takes from it)
      const w = land ? aw - 340 : aw, h = land ? ah : ah - 64 - toolsEl.offsetHeight - (B ? 3 * 60 : 140) - 3 * 12;
      let cs = fitCs(w, h, K, K, false), v = 'full';
      if (K == 2 && cs < MIN) { v = 'pair'; cs = fitCs(w, h, 2, 1, true); }
      if (K == 2 && cs < MIN) { v = 'one'; cs = fitCs(w, h, 1, 1, true); }
      if (v != view || !cellEl.length) { view = v; buildGrid(); }
      root.style.setProperty('--cs', cs + 'px');
      root.style.setProperty('--rh', RH + 'px');
      root.style.setProperty('--hh', headH(cs) + 'px');
      draw();
    }
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { if (el.clientWidth != lastW || el.clientHeight != lastH) layout(); }, 120); };
    window.addEventListener('resize', onResize);
    function showTab(c) {
      const k = Math.floor(c / x.nn);
      if (K == 1 || group().includes(k)) return;
      st.tab = k;
      buildGrid();
    }

    /* ---------- moves ---------- */
    const store = () => api.saveState(st);
    function finish() {
      done = true;
      marks = { line: [], cell: [], q: -1 };
      for (let c = 0; c < N; c++) if (st.v[c] == '0') setC(st, c, '2', '1');
      draw();
      root.classList.add('win');
      const sum = summary(p);
      tell('Solved! ' + sum.join(' '), 'good', B);
      api.win({ mistakes: st.miss, note: sum });
    }
    // what a mark breaks, in words (after the pause)
    function judge(c, quiet) {
      if (done) return;
      draw();
      const cf = conflicts(p, st);
      if (cf.has(c)) { if (!quiet) SFX.rattle(); tell(why(p, cf.get(c)), 'try'); }
    }
    function tapNow(c, before) {
      const r = tap(p, st, c);
      sel = c;
      if (r.ign) { draw(); return tell('A hint put that mark there. It stays.', 'try'); }
      marks = { line: [], cell: [], q: -1 };
      flash = [];
      store();
      draw();
      if (r.won) return finish();
      const cf = conflicts(p, st);
      if (pend == c) cf.delete(c);
      if (cf.has(c) || cf.size > before) {
        SFX.rattle();
        return tell(why(p, cf.get(c) || [...cf.values()][0]), 'try');
      }
      r.now == '1' ? SFX.pop(1) : SFX.click();
      const ticks = (st.v.match(/1/g) || []).length;
      if (ticks >= x.B.length * n) return tell('Every line has a tick, but something is not right yet. Tap Check, or ask for a hint.', 'try');
      if (msg && /does not fit|Two ticks|Every square/.test(msg) && !cf.size) tell('That fits again. Keep going!', '');
    }
    // a cross on its way to a tick (blank -> cross -> tick) is judged only when the child stops on it
    function tapCell(c) {
      if (done || c == null || !(c >= 0 && c < N)) return;
      clearTimeout(pt);
      const was = pend;
      pend = -1;
      if (was >= 0 && was != c) judge(was, true);
      const before = conflicts(p, st).size;
      if (st.v[c] == '0' && !st.hn.includes(c)) {
        pend = c;
        pt = setTimeout(() => { pend = -1; judge(c, false); }, 900);
      }
      tapNow(c, before);
    }
    grid.onclick = e => { const b = e.target.closest('.lg-c'); if (b) tapCell(+b.dataset.c); };
    clues.onclick = e => {
      const s = e.target.closest('[data-s]');
      if (s) { try { say(p.cl[+s.dataset.s].slice(-1)[0]); } catch (er) {} return; }
      const b = e.target.closest('.lg-qb');
      if (!b || done) return;
      const qi = +b.dataset.q;
      st.u = st.u.includes(qi) ? st.u.filter(q => q != qi) : st.u.concat(qi);
      SFX.click();
      store();
      draw();
    };
    root.querySelector('#lgundo').onclick = () => {
      if (done) return;
      const c = undo(p, st);
      if (c == null) return;
      SFX.whoosh();
      sel = c;
      flash = [];
      showTab(c);
      store();
      draw();
      tell(conflicts(p, st).size ? 'Undone. Some marks still do not fit: the amber squares.' : 'Undone.', '');
    };
    root.querySelector('#lgcheck').onclick = () => {
      if (done) return;
      const r = check(p, st);
      store();
      if (!r.bad.length) {
        SFX.right();
        flash = [];
        draw();
        return tell(/[12]/.test(st.v) ? 'Every mark so far is right. Keep going!' : 'Put some marks in first, then check.', 'good');
      }
      SFX.wrong();
      // the wrong marks are shown only after a hint (5.3)
      flash = st.hu ? r.bad : [];
      if (st.hu) showTab(r.bad[0]);
      draw();
      const many = r.bad.length == 1 ? 'One mark is' : r.bad.length + ' marks are';
      tell(`${many} not right yet.` + (st.hu ? ' They have an amber ring.' : ' Look again, or ask for a hint.'), 'try');
    };
    const acB = root.querySelector('#lgac');
    if (acB) acB.onclick = () => {
      if (done) return;
      st.ac = st.ac ? 0 : 1;
      SFX.click();
      store();
      draw();
      tell(st.ac ? 'Auto-cross is on: a tick crosses the rest of its row and column.' : 'Auto-cross is off: put every cross in yourself.', '');
    };

    /* ---------- start ---------- */
    const isNew = !/[12]/.test(st.v);
    tell(isNew ? intro : 'Keep going! Tap a square: once for a cross, twice for a tick.', '', isNew && B);
    layout();
    timers.push(setTimeout(layout, 60)); // the stage can still be settling (fonts, the frame's top bar)
    return {
      hint(tier) {
        if (done) return false;
        const h = hint(p, st, tier);
        if (!h) return false;
        st.hu = 1;
        flash = [];
        marks = { line: h.line, cell: h.mark, q: h.q };
        if (h.line.length || h.mark.length || h.put) showTab(h.put ? h.put[0] : (h.mark[0] ?? h.line[0]));
        if (h.put) {
          place(p, st, h.put[0], h.put[1]);
          sel = h.put[0];
          marks = { line: [], cell: [h.put[0]], q: -1 };
        }
        store();
        draw();
        const li = h.q >= 0 && clues.querySelector(`.lg-q[data-q="${h.q}"]`);
        if (li && li.scrollIntoView) li.scrollIntoView({ block: 'nearest' });
        tell(h.say, 'hint', true);
        if (h.put && won(p, st)) finish();
        return true;
      },
      destroy() {
        timers.forEach(clearTimeout);
        clearTimeout(rz);
        clearTimeout(pt);
        window.removeEventListener('resize', onResize);
      },
    };
  }

  return { NAMES, decode, build, make, pickNames, ctx, at, pos, solv, fresh, fit, tap, undo, check, place, won, conflicts, why, nextStep, hint,
    solve, summary, fact, sent, mount };
})();

BT.reg({
  id: 'logic', name: 'Logic', icon: 'logic', bands: 'BCD',
  rules: 'Read the clues. Tick who has what, and cross what cannot be.',
  make: (band, level, rnd) => LG.make(band, level, rnd),
  mount: (el, p, api) => LG.mount(el, p, api),
  solve: p => LG.solve(p),
});
