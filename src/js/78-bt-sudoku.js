/* ---------- Brain Teasers: Sudoku (P3-03; BRAIN_TEASERS.md 5.1, 7, 8) ----------
   One type, `sudoku`, bands A-D, 12 levels a band (then the framework's Endless). The puzzles come from the pre-verified bank
   PUZ.sudoku (src/data/d-puz-sudoku.js, P3-02; read only inside functions, A11): PUZ.sudoku[band] = {n, bw, bh, easy, medium, hard},
   each puzzle 'givens|solution|grade'.
     Band  Grid  Boxes        Symbols            Givens e / m / h   What is checked
     A     4x4   2x2          4 animals (drawn)  10 / 9 / 8         a wrong animal wiggles and bounces out (a mistake)
     B     4x4   2x2          1-4                8 / 6 / 5          a wrong number wiggles and bounces out (a mistake)
     C     6x6   3 cols x 2   1-6                22 / 18 / 14       clashes are tinted amber with a warning mark; Notes; Undo
     D     9x9   3x3          1-9                42 / 36 / 31       as C; hard levels need locked candidates or a naked pair
   Levels (section 7, givens from most to fewest): 1-4 easy, 5-8 medium, 9-12 hard. Each level owns a quarter of its tier's list
   (5 of 20), so the 12 levels of a day are 12 different bank puzzles; the seeded rnd (type|band|level|day) picks one of the five
   and a transform, so the same level tomorrow is a different puzzle or the same one in another form.
   Runtime variety (5.1, all keep the one solution and the grade): symbols relabelled, rows swapped inside a band of boxes, bands
   swapped, the same for columns and stacks, and a transpose when the boxes are square (4x4, 9x9). The puzzle stores the result
   (g givens, s solution, '.' empty) and the transform x, so a saved puzzle never needs the bank again.
   Mistakes: A and B check every entry against the solution (5.1); C and D never say right or wrong, but an entry that clashes
   with a number already in its row, column or box is tinted amber (never red, never colour alone: a dashed ring and a warning mark
   too) and counts one mistake. A full board with no clash is the solution (the puzzle has exactly one).
   Hints (5.1; the frame passes 1, 2, 3 and repeats 3): 1 points at a row, column or box (a house with one gap, or "look at this
   box"), 2 points at the square and says why ("Only 3 fits here: 1, 2 and 4 are already in its row, column or box."), 3 fills that
   square. A number that is not right is found first (C and D). Tiers 1 and 2 never change the board; 3 fills exactly one square.
   Phone and 9x9: the board is a square sized to the space left (section 8). When a 9x9 cell would be under 46 px (a phone in
   portrait, about 37 px at 380 px wide; section 8 allows 36 px there), a zoom box beside the pad shows the selected square's 3x3
   box at 48 px squares: a tap on the board picks a square and brings its box into the zoom box, where a near miss is put right with
   one big tap (every square has a 48 px target there), and the notes are easy to read.
   State (api.saveState after every move): {v: entries as a digit string ('0' empty, givens '0'), m: notes bit masks per cell
   ([] when none), sel, miss, hn: squares filled by hints (locked), h: undo steps [[cell, old value, old notes], ...], nt: notes on}.
   The pure rules (make, enter, erase, note, undo, hint, solve) live in SD so tools/test.js runs them without a page. */
const SD = (() => {
  const PICS = ['duck', 'frog', 'pig', 'fish']; // band A: symbol v is ART[PICS[v - 1]]; the four differ in shape as well as colour
  const TIERS = ['easy', 'medium', 'hard'];
  const MAXCELL = { 4: 96, 6: 80, 9: 64 };
  const tierOf = level => TIERS[Math.floor((Math.max(1, Math.min(12, +level || 1)) - 1) / 4)];
  const range = k => Array.from({ length: k }, (_, i) => i);
  const shuf = (rnd, a) => {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  };
  const nums = s => Array.from(s, ch => (ch == '.' ? 0 : +ch));
  const bit = v => 1 << (v - 1);
  const list = a => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]);

  /* ---------- geometry: houses (rows, columns, boxes), peers, box-line overlaps ---------- */
  const GEO = {};
  function geo(n, bw, bh) {
    const key = n + ':' + bw + ':' + bh;
    if (GEO[key]) return GEO[key];
    const bx = n / bw, rows = [], cols = [], boxes = [], at = [];
    for (let i = 0; i < n; i++) { rows.push([]); cols.push([]); boxes.push([]); }
    for (let c = 0; c < n * n; c++) {
      const r = Math.floor(c / n), k = c % n, b = Math.floor(r / bh) * bx + Math.floor(k / bw);
      rows[r].push(c);
      cols[k].push(c);
      boxes[b].push(c);
      at.push({ r, c: k, b });
    }
    const houses = rows.map((cells, i) => ({ k: 'row', i, cells }))
      .concat(cols.map((cells, i) => ({ k: 'column', i, cells })), boxes.map((cells, i) => ({ k: 'box', i, cells })));
    const peers = at.map((a, c) => {
      const s = new Set(rows[a.r].concat(cols[a.c], boxes[a.b]));
      s.delete(c);
      return [...s];
    });
    // a box and a line that share 2 or more squares: [house A, house B, the shared squares]
    const over = [];
    for (const A of houses) for (const B of houses) {
      if (A === B || (A.k != 'box') == (B.k != 'box')) continue;
      const inter = A.cells.filter(c => B.cells.includes(c));
      if (inter.length >= 2) over.push([A, B, inter]);
    }
    return GEO[key] = { n, bw, bh, bx, rows, cols, boxes, houses, at, peers, over };
  }
  const gp = p => geo(p.n, p.bw, p.bh);

  /* ---------- make: a bank puzzle by level, in a seeded form ---------- */
  // all lines in blocks of `per`: the blocks in a random order, the lines inside each block too
  const lineOrder = (rnd, n, per) => [].concat(...shuf(rnd, range(n / per)).map(b => shuf(rnd, range(per)).map(i => b * per + i)));
  function transform(rnd, n, bw, bh) {
    return { r: lineOrder(rnd, n, bh), c: lineOrder(rnd, n, bw), t: bw == bh && rnd() < 0.5 ? 1 : 0, s: shuf(rnd, range(n)).map(i => i + 1) };
  }
  // out(r, c) = in(x.r[r], x.c[c]), read across when transposed; symbol v becomes x.s[v - 1]
  function applyX(str, x, n) {
    let out = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      const rr = x.t ? c : r, cc = x.t ? r : c, ch = str[x.r[rr] * n + x.c[cc]];
      out += ch == '.' ? '.' : x.s[+ch - 1];
    }
    return out;
  }
  // the bank entry a level uses: its tier, and a quarter of that tier's list per level (k is picked by rnd inside it)
  function slot(band, level) {
    const list = PUZ.sudoku[band][tierOf(level)], per = Math.max(1, Math.floor(list.length / 4));
    const q = (Math.max(1, Math.min(12, +level || 1)) - 1) % 4;
    return { tier: tierOf(level), list, lo: Math.min(list.length - 1, q * per), per };
  }
  function make(band, level, rnd) {
    const sp = PUZ.sudoku[band], o = slot(band, level), k = Math.min(o.list.length - 1, o.lo + Math.floor(rnd() * o.per));
    const [g, s, gr] = o.list[k].split('|');
    const x = transform(rnd, sp.n, sp.bw, sp.bh);
    return { b: band, n: sp.n, bw: sp.bw, bh: sp.bh, tier: o.tier, k, gr: +gr, x, g: applyX(g, x, sp.n), s: applyX(s, x, sp.n) };
  }

  /* ---------- state and moves (pure: they change st and return what happened) ---------- */
  const checked = p => p.b == 'A' || p.b == 'B'; // 5.1: bands A and B bounce a wrong symbol out
  function fresh(p) {
    const sel = nums(p.g).indexOf(0);
    return { v: '0'.repeat(p.n * p.n), m: [], sel: Math.max(0, sel), miss: 0, hn: [], h: [], nt: 0 };
  }
  // does a saved state belong to this puzzle?
  function fit(p, st) {
    const N = p.n * p.n, g = nums(p.g), int = (x, lo, hi) => Number.isInteger(x) && x >= lo && x <= hi;
    if (!st || typeof st != 'object' || typeof st.v != 'string' || st.v.length != N) return false;
    if (!new RegExp('^[0-' + p.n + ']*$').test(st.v) || g.some((x, i) => x && st.v[i] != '0')) return false;
    if (!Array.isArray(st.m) || (st.m.length && st.m.length != N) || !st.m.every(x => int(x, 0, (1 << p.n) - 1))) return false;
    if (!int(st.sel, 0, N - 1) || !int(st.miss, 0, 1e6) || !Array.isArray(st.hn) || !st.hn.every(c => int(c, 0, N - 1) && !g[c])) return false;
    return Array.isArray(st.h) && st.h.every(s => Array.isArray(s) && s.every(e => Array.isArray(e) && e.length == 3 && int(e[0], 0, N - 1)));
  }
  const vals = (p, st) => { const e = nums(st.v); return nums(p.g).map((x, i) => x || e[i]); };
  const setV = (st, c, v) => { st.v = st.v.slice(0, c) + v + st.v.slice(c + 1); };
  const noteOf = (st, c) => st.m[c] | 0;
  function setNote(p, st, c, m) {
    if (!st.m.length) { if (!m) return; st.m = new Array(p.n * p.n).fill(0); }
    st.m[c] = m;
    if (st.m.every(x => !x)) st.m = [];
  }
  const won = (p, st) => { const b = vals(p, st), s = nums(p.s); return b.every((x, i) => x == s[i]); };
  const locked = (p, st, c) => !!nums(p.g)[c] || st.hn.includes(c);
  // every square whose number is also somewhere else in one of its houses
  function conflicts(p, b) {
    const out = new Set();
    for (const h of gp(p).houses) {
      const seen = {};
      for (const c of h.cells) if (b[c]) (seen[b[c]] = seen[b[c]] || []).push(c);
      for (const v in seen) if (seen[v].length > 1) seen[v].forEach(c => out.add(c));
    }
    return out;
  }
  // the first house of c that already has v somewhere else: {k, cell}
  function clash(p, b, c, v) {
    const G = gp(p), a = G.at[c];
    for (const [k, cells] of [['row', G.rows[a.r]], ['column', G.cols[a.c]], ['box', G.boxes[a.b]]]) {
      const q = cells.find(x => x != c && b[x] == v);
      if (q != null) return { k, cell: q };
    }
    return null;
  }
  // a value goes in: the square's notes go, and so does that number from the notes of its row, column and box
  function place(p, st, c, v, step) {
    if (step) step.push([c, +st.v[c], noteOf(st, c)]);
    setV(st, c, v);
    setNote(p, st, c, 0);
    if (!v) return;
    for (const q of gp(p).peers[c]) if (noteOf(st, q) & bit(v)) {
      if (step) step.push([q, +st.v[q], noteOf(st, q)]);
      setNote(p, st, q, noteOf(st, q) & ~bit(v));
    }
  }
  const pushStep = (st, step) => { st.h.push(step); if (st.h.length > 60) st.h.shift(); };
  // a symbol tapped for square c: {ign}, {bounce, why} (A, B), or {ok, conf: [squares it clashes with], won}
  function enter(p, st, c, v) {
    if (locked(p, st, c)) return { ign: 'locked' };
    const cur = +st.v[c];
    if (checked(p)) {
      if (cur) return { ign: 'done' };
      if (v != nums(p.s)[c]) { st.miss++; return { bounce: true, why: clash(p, vals(p, st), c, v) }; }
      place(p, st, c, v);
      return { ok: true, conf: [], won: won(p, st) };
    }
    if (cur == v) return { ign: 'same' };
    const step = [];
    place(p, st, c, v, step);
    pushStep(st, step);
    const b = vals(p, st), conf = gp(p).peers[c].filter(q => b[q] == v);
    if (conf.length) st.miss++;
    return { ok: true, conf, won: !conf.length && won(p, st) };
  }
  // Erase (C, D): the number, or else the notes, of square c
  function erase(p, st, c) {
    if (checked(p) || locked(p, st, c) || (!+st.v[c] && !noteOf(st, c))) return { ign: true };
    const step = [[c, +st.v[c], noteOf(st, c)]];
    if (+st.v[c]) setV(st, c, 0); else setNote(p, st, c, 0);
    pushStep(st, step);
    return { ok: true };
  }
  // a pencil mark on or off (C, D; only on an empty square)
  function note(p, st, c, v) {
    if (checked(p) || locked(p, st, c) || +st.v[c]) return { ign: true };
    pushStep(st, [[c, 0, noteOf(st, c)]]);
    setNote(p, st, c, noteOf(st, c) ^ bit(v));
    return { ok: true, on: !!(noteOf(st, c) & bit(v)) };
  }
  function undo(p, st) {
    const step = st.h.pop();
    if (!step) return null;
    for (let i = step.length - 1; i >= 0; i--) {
      const [c, v, m] = step[i];
      if (locked(p, st, c)) continue;
      setV(st, c, v);
      setNote(p, st, c, m);
    }
    return step[0][0];
  }
  // a hint fills square c with its number; the square locks (drawn star-yellow) and no undo step can touch it again
  function fill(p, st, c) {
    const v = nums(p.s)[c];
    place(p, st, c, v);
    if (!st.hn.includes(c)) st.hn.push(c);
    st.h = st.h.filter(s => !s.some(e => e[0] == c));
    return v;
  }

  /* ---------- hints: the next square a child can fill, and why ---------- */
  const name = (p, v) => (p.b == 'A' ? 'the ' + PICS[v - 1] : String(v));
  const Name = (p, v) => (p.b == 'A' ? 'The ' + PICS[v - 1] : String(v));
  const aName = (p, v) => (p.b == 'A' ? 'a ' + PICS[v - 1] : (v == 8 ? 'an ' : 'a ') + v);
  const plural = (p, v) => (p.b == 'A' ? PICS[v - 1] + (PICS[v - 1] == 'fish' ? '' : 's') : v + 's');
  // candidates of every empty square (bit masks) from what is on the board
  function cands(p, b) {
    const G = gp(p), full = (1 << p.n) - 1;
    return b.map((v, c) => {
      if (v) return 0;
      let m = full;
      for (const q of G.peers[c]) if (b[q]) m &= ~bit(b[q]);
      return m;
    });
  }
  const one = m => m && !(m & (m - 1));
  const valOf = m => 32 - Math.clz32(m);
  function lastGap(p, b) {
    for (const h of gp(p).houses) {
      const gaps = h.cells.filter(c => !b[c]);
      if (gaps.length == 1) {
        const have = new Set(h.cells.map(c => b[c]));
        const v = range(p.n).map(i => i + 1).find(x => !have.has(x));
        return { kind: 'last', cell: gaps[0], v, h };
      }
    }
    return null;
  }
  const nakedSingle = (p, cand) => { const c = cand.findIndex(one); return c < 0 ? null : { kind: 'naked', cell: c, v: valOf(cand[c]) }; };
  function hiddenSingle(p, cand, b) {
    const H = gp(p).houses, byBox = H.filter(h => h.k == 'box').concat(H.filter(h => h.k != 'box')); // boxes first: easiest to see
    for (const h of byBox) for (let v = 1; v <= p.n; v++) {
      if (h.cells.some(c => b[c] == v)) continue;
      const where = h.cells.filter(c => cand[c] & bit(v));
      if (where.length == 1) return { kind: 'hidden', cell: where[0], v, h };
    }
    return null;
  }
  // locked candidates: in house A the value's squares all lie in house B, so it leaves the rest of B
  function lockedCands(p, cand, b) {
    for (const [A, B, inter] of gp(p).over) for (let v = 1; v <= p.n; v++) {
      if (A.cells.some(c => b[c] == v)) continue;
      const where = A.cells.filter(c => cand[c] & bit(v));
      if (where.length < 2 || where.some(c => !inter.includes(c))) continue;
      const elim = B.cells.filter(c => !inter.includes(c) && cand[c] & bit(v)).map(c => [c, v]);
      if (elim.length) return { kind: 'locked', A, B, v, at: where, elim };
    }
    return null;
  }
  // naked pair: two squares of a house with the same two candidates; those two leave the rest of the house
  function nakedPair(p, cand) {
    for (const h of gp(p).houses) {
      const two = h.cells.filter(c => popc(cand[c]) == 2);
      for (let i = 0; i < two.length; i++) for (let j = i + 1; j < two.length; j++) {
        const m = cand[two[i]];
        if (cand[two[j]] != m) continue;
        const elim = [];
        for (const c of h.cells) if (c != two[i] && c != two[j] && cand[c] & m) for (let v = 1; v <= p.n; v++) if (cand[c] & m & bit(v)) elim.push([c, v]);
        if (elim.length) return { kind: 'pair', A: h, at: [two[i], two[j]], vs: [valOf(m & -m), valOf(m)], elim };
      }
    }
    return null;
  }
  function popc(m) { let k = 0; while (m) { m &= m - 1; k++; } return k; }

  // The next step: {kind, cell, v, house (squares hint 1 points at), also (squares hint 2 marks besides the cell), say1, say2, say3}
  function nextStep(p, st) {
    const G = gp(p), b = vals(p, st), sol = nums(p.s), e = nums(st.v);
    if (b.every((x, i) => x == sol[i])) return null;
    const boxOf = c => G.boxes[G.at[c].b];
    const say3 = (c, v) => `${Name(p, v)} goes here.`;
    // 1. a number that is not right (only C and D can have one): one that clashes first
    const wrong = e.map((x, c) => (x && x != sol[c] ? c : -1)).filter(c => c >= 0);
    if (wrong.length) {
      const cf = conflicts(p, b), c = wrong.find(x => cf.has(x)) != null ? wrong.find(x => cf.has(x)) : wrong[0];
      return { kind: 'wrong', cell: c, v: sol[c], house: boxOf(c), also: [],
        say1: 'One number in this box is not right yet.', say2: `This ${e[c]} does not belong here. Another number goes in this square.`, say3: say3(c, sol[c]) };
    }
    // 2. a house with one gap
    const lg = lastGap(p, b);
    if (lg) return { kind: 'last', cell: lg.cell, v: lg.v, house: lg.h.cells, also: [],
      say1: `This ${lg.h.k} has just one empty square.`, say2: `Only ${name(p, lg.v)} is missing from this ${lg.h.k}.`, say3: say3(lg.cell, lg.v) };
    // 3. singles from what is on the board
    let cand = cands(p, b);
    const single = () => {
      const ns = nakedSingle(p, cand);
      if (ns) return ns;
      return hiddenSingle(p, cand, b);
    };
    const why = (s, pre) => {
      if (s.kind == 'naked') {
        const seen = [...new Set(G.peers[s.cell].map(q => b[q]).filter(Boolean))].sort((x, y) => x - y);
        return `${pre || ''}Only ${name(p, s.v)} fits here: ${list(seen.map(v => name(p, v)))} ${seen.length > 1 ? 'are' : 'is'} already in its row, column or box.`;
      }
      const hk = s.h.k;
      const other = { row: 'column or box', column: 'row or box', box: 'row or column' }[hk];
      return `${pre || ''}${Name(p, s.v)} can only go here: the other empty squares of this ${hk} already have ${aName(p, s.v)} in their ${other}.`;
    };
    let s = single();
    if (s) return { kind: s.kind, cell: s.cell, v: s.v, house: s.kind == 'hidden' ? s.h.cells : boxOf(s.cell), also: [],
      say1: s.kind == 'hidden' ? `Look at this ${s.h.k}. Where can ${name(p, s.v)} go?` : 'Look at this box. One square can be filled now.',
      say2: why(s), say3: say3(s.cell, s.v) };
    // 4. band D hard: take candidates away (locked candidates, naked pairs) until a single shows
    let first = null;
    for (let it = 0; it < 60; it++) {
      const x = lockedCands(p, cand, b) || nakedPair(p, cand);
      if (!x) break;
      for (const [c, v] of x.elim) cand[c] &= ~bit(v);
      if (!first) first = x;
      s = single();
      if (s) {
        const pre = first.kind == 'locked'
          ? `In this ${first.A.k}, ${aName(p, first.v)} can only go in the marked squares, so no other square of that ${first.B.k} can be ${aName(p, first.v)}. Now `
          : `The marked squares can only be ${first.vs[0]} and ${first.vs[1]}, so no other square of this ${first.A.k} can be. Now `;
        const tail = s.kind == 'naked' ? `only ${name(p, s.v)} fits here.` : `${name(p, s.v)} can only go here in its ${s.h.k}.`;
        return { kind: first.kind, cell: s.cell, v: s.v, house: first.A.cells, also: first.at,
          say1: `Look at this ${first.A.k}. Where can ${first.kind == 'locked' ? name(p, first.v) : 'each number'} go?`, say2: pre + tail, say3: say3(s.cell, s.v) };
      }
    }
    // 5. never stuck: the empty square with the fewest choices
    cand = cands(p, b);
    let c = -1;
    for (let i = 0; i < b.length; i++) if (!b[i] && (c < 0 || popc(cand[i]) < popc(cand[c]))) c = i;
    return { kind: 'guess', cell: c, v: sol[c], house: [c], also: [],
      say1: 'Try this square.', say2: 'Look at its row, its column and its box.', say3: say3(c, sol[c]) };
  }
  // hint(p, st, tier): {tier, kind, cell, v, house, mark, say, fill ([cell, value] on tier 3 only)}; null when solved. Pure.
  function hint(p, st, tier) {
    const s = nextStep(p, st);
    if (!s) return null;
    const t = Math.max(1, Math.min(3, tier | 0));
    return { tier: t, kind: s.kind, cell: s.cell, v: s.v, house: t == 3 ? [] : s.house, mark: t == 1 ? [] : [s.cell].concat(t == 2 ? s.also : []),
      say: t == 1 ? s.say1 : t == 2 ? s.say2 : s.say3, fill: t == 3 ? [s.cell, s.v] : null };
  }
  // the moves that win, in the order the hints would give them: [[cell, value], ...]
  function solve(p) {
    const st = fresh(p), out = [];
    for (let i = 0; i < p.n * p.n; i++) {
      const s = nextStep(p, st);
      if (!s) break;
      place(p, st, s.cell, s.v);
      out.push([s.cell, s.v]);
    }
    return out;
  }

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    const G = gp(p), n = p.n, N = n * n, giv = nums(p.g), A = p.b == 'A', chk = checked(p);
    let st = api.loadState();
    if (!fit(p, st)) st = fresh(p);
    const timers = [];
    const later = (f, ms) => timers.push(setTimeout(f, ms));
    let marks = { house: [], cell: [] }, bounce = null, glow = -1, msg = '', done = false, zoomOn = false;
    const face = (v, size) => (A ? picArt(PICS[v - 1], size || '74%', 'sd-pic') : `<b>${v}</b>`);
    const spoken = v => (A ? PICS[v - 1] : String(v));
    const intro = A ? 'Each row, each column and each box needs every animal once. Tap a square, then tap an animal.'
      : `Each row, column and box needs ${list(range(n).map(i => i + 1))} once. Tap a square, then tap a number.`;

    // board: boxes in reading order, squares inside each box in reading order
    const boxes = G.boxes.map(cells => `<div class="sd-box">${cells.map(c => `<button class="sd-c" data-c="${c}"></button>`).join('')}</div>`).join('');
    const pad = padHTML('', false).replace('class="keys qpad pad"', 'class="keys qpad pad sd-pad"');
    el.innerHTML = `<div class="sd sd-n${n} sd-${p.b}" style="--n:${n};--bw:${p.bw};--bx:${n / p.bw}">` +
      `<div class="sd-say">${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'sd-spk' })}<p class="sd-msg" aria-live="polite"></p></div>` +
      `<div class="sd-main"><div class="sd-board" role="group" aria-label="Sudoku, ${n} by ${n}">${boxes}</div></div>` +
      `<div class="sd-ctl"><div class="sd-zoom" role="group" aria-label="The selected box, big" hidden>` +
      `${range(9).map(i => `<button class="sd-c sd-zc" data-z="${i}"></button>`).join('')}</div>${pad}</div></div>`;
    const root = el.querySelector('.sd'), board = root.querySelector('.sd-board'), zoom = root.querySelector('.sd-zoom');
    const padEl = root.querySelector('.sd-pad'), say_ = root.querySelector('.sd-say'), ctl = root.querySelector('.sd-ctl');
    const cellEl = range(N).map(c => board.querySelector(`[data-c="${c}"]`));
    // the pad: symbols 1..n with a count of how many are left; Erase, Notes and Undo in bands C and D
    padEl.querySelectorAll('.k').forEach(k => {
      const d = k.dataset.k;
      if (d == '0' || d == 'go' || +d > n || (d == 'del' && chk)) k.remove();
    });
    for (let v = 1; v <= n; v++) {
      const k = padEl.querySelector(`.k[data-k="${v}"]`);
      k.innerHTML = `<span class="sd-kf">${A ? picArt(PICS[v - 1], '1em', 'sd-pic') : v}</span><small class="sd-left"></small>`;
      k.classList.add('sd-sym');
    }
    if (!chk) {
      const del = padEl.querySelector('.k[data-k="del"]');
      del.setAttribute('aria-label', 'Erase');
      del.classList.add('t');
      padEl.insertAdjacentHTML('beforeend', `<button class="key k t sd-ntk" data-k="notes" aria-label="Notes" aria-pressed="false">${ico('edit')}<span>Notes</span></button>` +
        `<button class="key k t" data-k="undo" aria-label="Undo">${ico('undo')}<span>Undo</span></button>`);
    }
    padEl.classList.add(chk ? 'sd-p' + n : 'sd-pt');

    function tell(text, kind, speak) {
      msg = text;
      const m = root.querySelector('.sd-msg');
      m.textContent = text;
      m.className = 'sd-msg' + (kind ? ' ' + kind : '');
      if (speak) api.say(text);
    }
    root.querySelector('.sd-spk').onclick = () => { try { say(msg); } catch (e) {} };

    /* ---------- drawing ---------- */
    function cellParts(c, b, cf) {
      const v = b[c], given = !!giv[c], hn = st.hn.includes(c), m = noteOf(st, c), a = G.at[c], s = G.at[st.sel];
      const selV = b[st.sel];
      let cls = given ? ' giv' : v ? (hn ? ' ent hn' : ' ent') : '';
      if (c == st.sel) cls += ' sel';
      else if (a.r == s.r || a.c == s.c || a.b == s.b) cls += ' rc';
      if (selV && v == selV && c != st.sel) cls += ' same';
      if (cf.has(c)) cls += ' cf';
      if (c == glow) cls += ' cl';
      if (marks.cell.includes(c)) cls += ' hl';
      else if (marks.house.includes(c)) cls += ' hh';
      let html = '', lab = v ? spoken(v) : 'empty';
      if (bounce && bounce.c == c) { cls += ' bad'; html = face(bounce.v); lab = spoken(bounce.v) + ', does not fit'; }
      else if (v) html = face(v) + (cf.has(c) && !given ? `<span class="sd-wn">${ico('warning', 16)}</span>` : '');
      else if (m) {
        html = `<i class="sd-nts">${range(n).map(i => `<span>${m & bit(i + 1) ? i + 1 : ''}</span>`).join('')}</i>`;
        lab = 'notes ' + range(n).filter(i => m & bit(i + 1)).map(i => i + 1).join(' ');
      }
      if (given) lab += ', given';
      if (cf.has(c)) lab += ', clashes';
      return { cls, html, lab: `Row ${a.r + 1}, column ${a.c + 1}: ${lab}` };
    }
    function draw() {
      const b = vals(p, st), cf = chk ? new Set() : conflicts(p, b);
      for (let c = 0; c < N; c++) {
        const q = cellParts(c, b, cf), e = cellEl[c], cls = 'sd-c' + q.cls;
        if (e.className != cls) e.className = cls;
        if (e._h !== q.html) { e.innerHTML = q.html; e._h = q.html; }
        e.setAttribute('aria-label', q.lab);
      }
      if (zoomOn) {
        const cells = G.boxes[G.at[st.sel].b];
        zoom.querySelectorAll('.sd-zc').forEach((z, i) => {
          const c = cells[i], q = cellParts(c, b, cf);
          z.className = 'sd-c sd-zc' + q.cls;
          z.dataset.c = c;
          if (z._h !== q.html) { z.innerHTML = q.html; z._h = q.html; }
          z.setAttribute('aria-label', q.lab);
        });
      }
      // how many of each symbol are left to place
      for (let v = 1; v <= n; v++) {
        const k = padEl.querySelector(`.k[data-k="${v}"]`), left = n - b.filter(x => x == v).length;
        // one dot for each one left (a count that cannot be read as a power), a tick when none are left
        const lf = k.querySelector('.sd-left'), t = left > 0 ? '<i></i>'.repeat(Math.min(n, left)) : ico('check', 14);
        if (lf._h !== t) { lf.innerHTML = t; lf._h = t; }
        k.classList.toggle('zero', left <= 0);
        if (chk) k.disabled = left <= 0 || done;
        k.setAttribute('aria-label', `${spoken(v)}, ${Math.max(0, left)} left`);
      }
      const nk = padEl.querySelector('[data-k="notes"]'), uk = padEl.querySelector('[data-k="undo"]');
      if (nk) { nk.classList.toggle('on', !!st.nt); nk.setAttribute('aria-pressed', st.nt ? 'true' : 'false'); }
      if (uk) uk.disabled = !st.h.length || done;
      root.classList.toggle('nt', !!st.nt);
    }

    /* ---------- layout: the board is a square sized to the space that is left (section 8) ----------
       portrait: talk line, board, controls; landscape: board, then a side column with the talk line and the controls.
       9x9 under 46 px a square: the zoom box comes on. On a phone (portrait) it shares a row with the talk line between the board
       and the pad, and the pad goes to two rows of six (1-5 Erase, 6-9 Notes Undo), so the board keeps 36 px squares at 380x780. */
    const FR = n == 9 ? { pad: 4, box: 4, cell: 1 } : { pad: 6, box: 5, cell: 2 }; // must match --fp, --fb, --fc in the CSS
    root.style.cssText += `;--fp:${FR.pad}px;--fb:${FR.box}px;--fc:${FR.cell}px`;
    const frame = Math.max(2 * FR.pad + (n / p.bw - 1) * FR.box + (n - n / p.bw) * FR.cell, 2 * FR.pad + (n / p.bh - 1) * FR.box + (n - n / p.bh) * FR.cell);
    const main = root.querySelector('.sd-main'), zrow = document.createElement('div'), side = document.createElement('div');
    zrow.className = 'sd-zrow';
    side.className = 'sd-side';
    root.append(zrow, side);
    let lastW = 0, lastH = 0;
    function arrange(mode, padMode) {
      if (mode == 'land') { root.append(main, side); side.append(say_, ctl); ctl.prepend(zoom); }
      else if (mode == 'zm') { root.append(main, zrow, ctl); zrow.append(zoom, say_); }
      else { root.append(say_, main, ctl); ctl.prepend(zoom); }
      root.classList.toggle('land', mode == 'land');
      zoomOn = mode == 'zm' || (mode == 'land' && padMode == 'zoom');
      root.classList.toggle('zm', zoomOn);
      zoom.hidden = !zoomOn;
    }
    function setPad(m) { for (const k of ['row', 'g3', 'r6']) padEl.classList.toggle(k, k == m); }
    function layout() {
      if (!el.isConnected) return;
      const ps = getComputedStyle(el);
      const aw = el.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
      const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
      lastW = aw; lastH = ah;
      const land = aw > ah * 1.15 && aw >= 640, gap = 12;
      // the pad in one row when every key can be 50 px wide, else three across (two rows of six for 9x9 on a phone)
      const oneRow = w => (w - (n - 1) * 8) / n >= 50;
      const cellFor = bs => Math.min(MAXCELL[n] || 64, Math.floor((Math.max(120, bs) - frame) / n));
      let cs;
      if (land) {
        arrange('land');
        setPad(oneRow(side.offsetWidth) ? 'row' : 'g3');
        const bs = () => Math.min(ah, aw - side.offsetWidth - 2 * gap);
        cs = cellFor(bs());
        if (n == 9 && cs < 46) { arrange('land', 'zoom'); cs = cellFor(bs()); }
      } else {
        arrange('port');
        setPad(oneRow(aw) ? 'row' : n == 9 ? 'r6' : 'g3');
        cs = cellFor(Math.min(aw, ah - say_.offsetHeight - ctl.offsetHeight - 2 * gap));
        if (n == 9 && cs < 46) {
          arrange('zm');
          setPad('r6');
          cs = cellFor(Math.min(aw, ah - zrow.offsetHeight - ctl.offsetHeight - 2 * 8));
        }
      }
      root.style.setProperty('--cs', Math.max(28, cs) + 'px');
      draw();
    }
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { if (el.clientWidth != lastW || el.clientHeight != lastH) layout(); }, 120); };
    window.addEventListener('resize', onResize);

    /* ---------- moves ---------- */
    const store = () => api.saveState(st);
    function finish() {
      done = true;
      marks = { house: [], cell: [] };
      draw();
      root.classList.add('win');
      tell(A ? 'You did it! Every row, column and box has every animal.' : 'Solved! Every row, column and box is complete.', 'good', A);
      api.win({ mistakes: st.miss });
    }
    function pick(c) {
      if (done || c == null || c < 0 || c >= N) return;
      st.sel = c;
      SFX.click();
      store();
      draw();
    }
    function sym(v) {
      if (done) return;
      const c = st.sel;
      if (st.nt && !chk) {
        const r = note(p, st, c, v);
        if (r.ign) return tell(+st.v[c] || locked(p, st, c) ? 'Notes go in empty squares.' : 'Tap an empty square first.', 'try');
        SFX.key(v);
        store();
        return draw();
      }
      const r = enter(p, st, c, v);
      if (r.ign) {
        if (r.ign == 'same') return;
        tell(giv[c] ? 'That one was there from the start. Tap an empty square.' : 'That square is done. Tap an empty one.', 'try', A);
        return;
      }
      marks = { house: [], cell: [] };
      if (r.bounce) {
        SFX.wrong();
        bounce = { c, v };
        glow = r.why ? r.why.cell : -1;
        store();
        draw();
        const t = r.why ? `There is already ${aName(p, v)} in this ${r.why.k}. Try another one.` : `${Name(p, v)} goes somewhere else. Try another one.`;
        tell(t, 'try', A);
        later(() => { bounce = null; draw(); }, 650);
        later(() => { glow = -1; draw(); }, 1600);
        return;
      }
      store();
      draw();
      if (r.conf.length) {
        SFX.rattle();
        const k = clash(p, vals(p, st), c, v);
        tell(`Two ${plural(p, v)} in this ${k ? k.k : 'row'}. Change one of them.`, 'try');
        return;
      }
      if (chk) { SFX.right(); popCell(c); } else SFX.pop(1);
      if (r.won) return finish();
      tell(chk ? (A ? pickR(['Yes!', 'Good one!', 'That fits!']) : pickR(['Yes!', 'That fits!', 'Right!'])) : msgAfter(), chk ? 'good' : '', false);
    }
    const pickR = a => a[Math.floor(Math.random() * a.length)];
    const msgAfter = () => (conflicts(p, vals(p, st)).size ? 'Some numbers still clash. The amber squares show where.' : 'Keep going!');
    function popCell(c) {
      const e = cellEl[c];
      e.classList.remove('pop');
      void e.offsetWidth;
      e.classList.add('pop');
    }
    function act(k) {
      if (done) return;
      if (k == 'del') {
        const r = erase(p, st, st.sel);
        if (r.ign) return tell(locked(p, st, st.sel) ? 'That one stays. Pick a square you filled.' : 'That square is already empty.', 'try');
        SFX.del();
      } else if (k == 'notes') {
        st.nt = st.nt ? 0 : 1;
        SFX.click();
        tell(st.nt ? 'Notes are on: tap numbers to jot them small. Tap Notes again to write big.' : 'Notes are off: numbers go in big.', '');
      } else if (k == 'undo') {
        const c = undo(p, st);
        if (c == null) return;
        st.sel = c;
        SFX.whoosh();
      } else return sym(+k);
      store();
      draw();
    }
    board.onclick = e => { const b = e.target.closest('.sd-c'); if (b) pick(+b.dataset.c); };
    zoom.onclick = e => { const b = e.target.closest('.sd-c'); if (b) pick(+b.dataset.c); };
    padEl.querySelectorAll('.k[data-k]').forEach(b => b.onclick = () => act(b.dataset.k));
    // hardware keys: digits, Backspace or Delete, arrows to move, N for notes
    const keyd = e => {
      if (!el.isConnected || done || document.querySelector('.bt-win,.sheet')) return;
      const a = G.at[st.sel], mv = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[e.key];
      if (/^[1-9]$/.test(e.key) && +e.key <= n) { e.preventDefault(); act(e.key); }
      else if ((e.key == 'Backspace' || e.key == 'Delete') && !chk) { e.preventDefault(); act('del'); }
      else if ((e.key == 'n' || e.key == 'N') && !chk) act('notes');
      else if (mv) { e.preventDefault(); pick(((a.r + mv[0] + n) % n) * n + ((a.c + mv[1] + n) % n)); }
    };
    document.addEventListener('keydown', keyd);

    /* ---------- start ---------- */
    const fresh_ = !st.v.replace(/0/g, '') && !st.m.length;
    tell(fresh_ ? intro : A ? 'Keep going! Tap an empty square.' : 'Keep going! Tap an empty square.', '', fresh_ && A);
    layout();
    // the stage can still be settling (fonts, the frame's top bar): look again once
    later(layout, 60);
    return {
      hint(tier) {
        if (done) return false;
        const h = hint(p, st, tier);
        if (!h) return false;
        marks = { house: h.house, cell: h.mark };
        if (h.fill) {
          fill(p, st, h.fill[0]);
          st.sel = h.fill[0];
          store();
          draw();
          popCell(h.fill[0]);
          tell(h.say, 'hint', true);
          if (won(p, st)) finish();
          return true;
        }
        if (h.tier == 2) st.sel = h.cell;
        store();
        draw();
        tell(h.say, 'hint', true);
        return true;
      },
      destroy() {
        timers.forEach(clearTimeout);
        clearTimeout(rz);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('keydown', keyd);
      },
    };
  }

  return { PICS, TIERS, tierOf, geo, slot, make, transform, applyX, fresh, fit, vals, conflicts, enter, erase, note, undo, fill, won,
    nextStep, hint, solve, mount, checked, nums };
})();

BT.reg({
  id: 'sudoku', name: 'Sudoku', icon: 'sudoku', bands: 'ABCD',
  rules: 'Fill the grid so every row, every column and every box has each number (or animal) just once.',
  make: (band, level, rnd) => SD.make(band, level, rnd),
  mount: (el, p, api) => SD.mount(el, p, api),
  solve: p => SD.solve(p),
});
