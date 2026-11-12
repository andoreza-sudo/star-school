/* ---------- Brain Teasers: MathDoku (P3-05; BRAIN_TEASERS.md 5.2, 7, 8) ----------
   One type, `mdoku` ("MathDoku"), bands B-D, 12 levels a band (then the framework's Endless). The puzzles come from the
   pre-verified bank PUZ.mathdoku (src/data/d-puz-mathdoku.js, P3-04; read only inside functions, A11):
   PUZ.mathdoku[band] = [36 strings 'N|cages|solution|grade|score'], sorted by difficulty, level L = entries 3(L-1)..3L-1.
     Band  Grid               Operations     What the child does
     B     3x3                +              tap a square, tap 1-3; Erase, Undo (no notes: three numbers need none)
     C     4x4                + − ×          as B with 1-4, plus Notes
     D     5x5 (levels 1-6),  + − × ÷        as C with 1-5 or 1-6
           6x6 (levels 7-12)
   A cage is cells (one base-36 character each, ascending, so the first is the top-left cell where the label goes) + op + target.
   Single-cell cages ('=') are givens: their number is printed in the square from the start.
   Variety (5.2): the seeded rnd (type|band|level|day) picks one of the level's three bank puzzles and one of the 8 rotations and
   mirrors of the grid. Numbers are never relabelled (the arithmetic would break); a turned or mirrored cage keeps its target, and
   − and ÷ do not care about order. The 12 levels of a day use 12 different bank puzzles, so a grid never repeats across levels.
   The puzzle stores the result (cg cages [{c: cells, o: op, t: target}], s solution), the bank index k and the transform x.
   Mistakes: never judged right or wrong while playing. A number that is already in its row or column is a clash: both squares
   amber with a dashed ring and a warning mark (never red, never colour alone). A full cage that does not make its target turns its
   label amber with a warning mark, and the line says why in words ("2 + 3 = 5, but this cage needs 6."). Each counts one mistake.
   Hints (5.2; the frame passes 1, 2, 3 and repeats 3): 1 points at a cage (or a row or column) that can be finished, 2 names the
   square and says why, listing the number sets that make the cage ("6× in two squares: 1 and 6, or 2 and 3. ..."), 3 fills that
   one square. A number that is not right is found first. Tiers 1 and 2 never change the board; 3 fills exactly one square.
   The hint steps follow the bank grader (tools/puzzles/mathdoku.js): last square of a cage or a line, cage single, hidden single,
   cage in a line, naked pair; the grader proved every bank puzzle finishes with these, so no hint has to guess.
   State (api.saveState after every move): {v: entries as a digit string ('0' empty or given), m: notes bit masks per cell ([] when
   none), sel, miss, hn: squares filled by hints (locked), h: undo steps [[cell, old value, old notes], ...], nt: notes on}.
   The pure rules (make, enter, erase, note, undo, hint, solve) live in MD so tools/test.js runs them without a page. */
const MD = (() => {
  const SIGN = { '+': '+', '*': '×', '-': '−', '/': '÷' };
  const MAXCELL = { 3: 96, 4: 88, 5: 76, 6: 68 };
  const FP = 6; // the tray's padding around the grid (px); must match .md-board in the CSS
  // the 8 rotations and mirrors as cell maps: (r, c) of the bank grid goes to the returned [r, c] (as tools/puzzles/mathdoku.js SYMS)
  const SYMS = [
    (r, c, N) => [r, c],
    (r, c, N) => [c, N - 1 - r],
    (r, c, N) => [N - 1 - r, N - 1 - c],
    (r, c, N) => [N - 1 - c, r],
    (r, c, N) => [r, N - 1 - c],
    (r, c, N) => [N - 1 - r, c],
    (r, c, N) => [c, r],
    (r, c, N) => [N - 1 - c, N - 1 - r],
  ];
  const range = k => Array.from({ length: k }, (_, i) => i);
  const nums = s => Array.from(s, ch => +ch);
  const bit = v => 1 << (v - 1);
  const one = m => m && !(m & (m - 1));
  const valOf = m => 32 - Math.clz32(m);
  const popc = m => { let k = 0; while (m) { m &= m - 1; k++; } return k; };
  const bits = m => range(7).map(i => i + 1).filter(v => m & bit(v));
  const list = (a, w) => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' ' + (w || 'and') + ' ' + a[a.length - 1]);
  const WORD = ['no', 'one', 'two', 'three', 'four', 'five', 'six'];
  const aN = v => (v == 8 || v == 11 || v == 18 ? 'an ' : 'a ') + v;

  // a cage's value for these numbers (− and ÷ take the bigger first; NaN when ÷ does not come out even)
  function calc(op, vals) {
    if (op == '=') return vals[0];
    if (op == '+') return vals.reduce((a, v) => a + v, 0);
    if (op == '*') return vals.reduce((a, v) => a * v, 1);
    const hi = Math.max(vals[0], vals[1]), lo = Math.min(vals[0], vals[1]);
    if (op == '-') return hi - lo;
    return hi % lo ? NaN : hi / lo;
  }
  const label = cg => cg.t + SIGN[cg.o];
  // the cage's numbers as a sum written out: "2 + 3 = 5"; ÷ that does not come out even says so
  function sumText(cg, vals) {
    if (cg.o == '+' || cg.o == '*') return vals.join(cg.o == '+' ? ' + ' : ' × ') + ' = ' + calc(cg.o, vals);
    const hi = Math.max(...vals), lo = Math.min(...vals), r = calc(cg.o, vals);
    return `${hi} ${SIGN[cg.o]} ${lo}` + (r === r ? ` = ${r}` : ' does not come out even');
  }

  /* ---------- geometry: rows, columns, peers ---------- */
  const GEO = {};
  function geo(n) {
    if (GEO[n]) return GEO[n];
    const rows = range(n).map(r => range(n).map(c => r * n + c)), cols = range(n).map(c => range(n).map(r => r * n + c));
    const at = range(n * n).map(c => ({ r: Math.floor(c / n), c: c % n }));
    const lines = rows.map((cells, i) => ({ k: 'row', i, cells })).concat(cols.map((cells, i) => ({ k: 'column', i, cells })));
    const lineIds = at.map(a => [a.r, n + a.c]);
    const peers = at.map((a, c) => rows[a.r].concat(cols[a.c]).filter(q => q != c));
    return GEO[n] = { n, rows, cols, at, lines, lineIds, peers };
  }
  const sameLine = (n, a, b) => Math.floor(a / n) == Math.floor(b / n) || a % n == b % n;
  // per puzzle: which cage each square is in, the givens
  function info(p) {
    if (p._i && p._i.cg === p.cg) return p._i;
    const N = p.n * p.n, cageAt = new Array(N).fill(-1), giv = new Array(N).fill(0);
    p.cg.forEach((cg, i) => { cg.c.forEach(c => (cageAt[c] = i)); if (cg.o == '=') giv[cg.c[0]] = cg.t; });
    const out = { cg: p.cg, cageAt, giv };
    Object.defineProperty(p, '_i', { value: out, enumerable: false, configurable: true, writable: true });
    return out;
  }

  /* ---------- make: a bank puzzle by level, turned or mirrored ---------- */
  function decode(str) {
    const [n, cs, sol, gr] = str.split('|');
    const cg = cs.split(',').map(s => {
      const m = s.match(/^([0-9a-z]+)([-+*/=])(\d+)$/);
      return { c: Array.from(m[1], ch => parseInt(ch, 36)), o: m[2], t: +m[3] };
    });
    return { n: +n, cg, s: sol, gr: +gr };
  }
  // the bank puzzle under symmetry x: every cell moves, cages keep their op and target, the label goes to the new top-left cell
  function transform(n, cg, sol, x) {
    const f = SYMS[x], map = c => { const [r, k] = f(Math.floor(c / n), c % n, n); return r * n + k; };
    const out = cg.map(g => ({ c: g.c.map(map).sort((a, b) => a - b), o: g.o, t: g.t })).sort((a, b) => a.c[0] - b.c[0]);
    const s = new Array(n * n);
    for (let c = 0; c < n * n; c++) s[map(c)] = sol[c];
    return { cg: out, s: s.join('') };
  }
  // the bank entries of a level: 3(L-1) .. 3L-1 (band D: levels 1-6 are 5x5, 7-12 are 6x6, as the bank is sorted)
  function slot(band, level) {
    const L = Math.max(1, Math.min(12, +level || 1)), list = PUZ.mathdoku[band];
    return { list, lo: Math.min(list.length - 1, 3 * (L - 1)), per: 3 };
  }
  function make(band, level, rnd) {
    const o = slot(band, level), k = Math.min(o.list.length - 1, o.lo + Math.floor(rnd() * o.per)), x = Math.floor(rnd() * 8);
    const d = decode(o.list[k]), t = transform(d.n, d.cg, d.s, x);
    return { b: band, n: d.n, k, x, gr: d.gr, cg: t.cg, s: t.s };
  }

  /* ---------- state and moves (pure: they change st and return what happened) ---------- */
  const notesOn = p => p.b != 'B'; // three numbers need no pencil marks
  function fresh(p) {
    const g = info(p).giv;
    return { v: '0'.repeat(p.n * p.n), m: [], sel: Math.max(0, g.indexOf(0)), miss: 0, hn: [], h: [], nt: 0 };
  }
  // does a saved state belong to this puzzle?
  function fit(p, st) {
    const N = p.n * p.n, g = info(p).giv, int = (x, lo, hi) => Number.isInteger(x) && x >= lo && x <= hi;
    if (!st || typeof st != 'object' || typeof st.v != 'string' || st.v.length != N) return false;
    if (!new RegExp('^[0-' + p.n + ']*$').test(st.v) || g.some((x, i) => x && st.v[i] != '0')) return false;
    if (!Array.isArray(st.m) || (st.m.length && st.m.length != N) || !st.m.every(x => int(x, 0, (1 << p.n) - 1))) return false;
    if (!int(st.sel, 0, N - 1) || !int(st.miss, 0, 1e6) || !Array.isArray(st.hn) || !st.hn.every(c => int(c, 0, N - 1) && !g[c])) return false;
    if (st.nt != null && st.nt !== 0 && st.nt !== 1) return false;
    return Array.isArray(st.h) && st.h.every(s => Array.isArray(s) && s.length && s.every(e => Array.isArray(e) && e.length == 3 && int(e[0], 0, N - 1)
      && int(e[1], 0, p.n) && int(e[2], 0, (1 << p.n) - 1)));
  }
  const vals = (p, st) => { const e = nums(st.v); return info(p).giv.map((x, i) => x || e[i]); };
  const setV = (st, c, v) => { st.v = st.v.slice(0, c) + v + st.v.slice(c + 1); };
  const noteOf = (st, c) => st.m[c] | 0;
  function setNote(p, st, c, m) {
    if (!st.m.length) { if (!m) return; st.m = new Array(p.n * p.n).fill(0); }
    st.m[c] = m;
    if (st.m.every(x => !x)) st.m = [];
  }
  const won = (p, st) => vals(p, st).join('') == p.s;
  const locked = (p, st, c) => !!info(p).giv[c] || st.hn.includes(c);
  // every square whose number is also somewhere else in its row or column
  function conflicts(p, b) {
    const out = new Set();
    for (const L of geo(p.n).lines) {
      const seen = {};
      for (const c of L.cells) if (b[c]) (seen[b[c]] = seen[b[c]] || []).push(c);
      for (const v in seen) if (seen[v].length > 1) seen[v].forEach(c => out.add(c));
    }
    return out;
  }
  // the cages that are full and do not make their target (indexes)
  function misses(p, b) {
    return p.cg.map((cg, i) => (cg.o != '=' && cg.c.every(c => b[c]) && calc(cg.o, cg.c.map(c => b[c])) !== cg.t ? i : -1)).filter(i => i >= 0);
  }
  // the first line of c that already has v somewhere else: {k, cell}
  function clash(p, b, c, v) {
    const G = geo(p.n), a = G.at[c];
    for (const [k, cells] of [['row', G.rows[a.r]], ['column', G.cols[a.c]]]) {
      const q = cells.find(x => x != c && b[x] == v);
      if (q != null) return { k, cell: q };
    }
    return null;
  }
  // a value goes in: the square's notes go, and so does that number from the notes of its row and column
  function place(p, st, c, v, step) {
    if (step) step.push([c, +st.v[c], noteOf(st, c)]);
    setV(st, c, v);
    setNote(p, st, c, 0);
    if (!v) return;
    for (const q of geo(p.n).peers[c]) if (noteOf(st, q) & bit(v)) {
      if (step) step.push([q, +st.v[q], noteOf(st, q)]);
      setNote(p, st, q, noteOf(st, q) & ~bit(v));
    }
  }
  const pushStep = (st, step) => { st.h.push(step); if (st.h.length > 60) st.h.shift(); };
  // a number tapped for square c: {ign} or {ok, conf: [squares it clashes with], cage: index of the cage it filled
  // (made: true when the cage makes its target), miss: one mistake counted, won}
  function enter(p, st, c, v) {
    if (locked(p, st, c)) return { ign: 'locked' };
    if (+st.v[c] == v) return { ign: 'same' };
    const step = [];
    place(p, st, c, v, step);
    pushStep(st, step);
    const b = vals(p, st), conf = geo(p.n).peers[c].filter(q => b[q] == v), ci = info(p).cageAt[c], cg = p.cg[ci];
    const full = cg.c.every(q => b[q]), made = full && calc(cg.o, cg.c.map(q => b[q])) === cg.t;
    const miss = conf.length > 0 || (full && !made);
    if (miss) st.miss++;
    return { ok: true, conf, cage: full ? ci : -1, made, miss, won: !miss && won(p, st) };
  }
  // Erase: the number, or else the notes, of square c
  function erase(p, st, c) {
    if (locked(p, st, c) || (!+st.v[c] && !noteOf(st, c))) return { ign: true };
    const step = [[c, +st.v[c], noteOf(st, c)]];
    if (+st.v[c]) setV(st, c, 0); else setNote(p, st, c, 0);
    pushStep(st, step);
    return { ok: true };
  }
  // a pencil mark on or off (C, D; only on an empty square)
  function note(p, st, c, v) {
    if (!notesOn(p) || locked(p, st, c) || +st.v[c] || v < 1 || v > p.n) return { ign: true };
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
    const v = +p.s[c];
    place(p, st, c, v);
    if (!st.hn.includes(c)) st.hn.push(c);
    st.h = st.h.filter(s => !s.some(e => e[0] == c));
    return v;
  }

  /* ---------- hints: the next square a child can fill, and why ---------- */
  // Candidates as the grader has them: not in the row or column (and not taken away by an elimination), and kept only when some
  // way of filling the cage (its target, the other squares' candidates, no number twice in a line) uses them.
  // -> {cand, fills: [ways per cage], must: [[cage, line id, values every way puts in the cage's squares of that line]]}
  function analyse(p, b, elim) {
    const n = p.n, G = geo(n), full = (1 << n) - 1, I = info(p);
    const base = b.map((v, c) => {
      if (v) return 0;
      let m = full & ~(elim ? elim[c] : 0);
      for (const q of G.peers[c]) if (b[q]) m &= ~bit(b[q]);
      return m;
    });
    const cand = new Array(n * n).fill(0), fills = [], must = [];
    I.cg.forEach((cg, ci) => {
      fills[ci] = 0;
      const empty = cg.c.filter(c => !b[c]);
      if (!empty.length) return;
      const v = cg.c.map(c => b[c]), at = empty.map(c => cg.c.indexOf(c)), sup = empty.map(() => 0);
      const lids = [...new Set([].concat(...empty.map(c => G.lineIds[c])))], inter = lids.map(() => full);
      const rec = i => {
        if (i == empty.length) {
          if (calc(cg.o, v) !== cg.t) return;
          fills[ci]++;
          empty.forEach((c, j) => (sup[j] |= bit(v[at[j]])));
          lids.forEach((li, k) => {
            let m = 0;
            empty.forEach((c, j) => { if (G.lineIds[c].includes(li)) m |= bit(v[at[j]]); });
            inter[k] &= m;
          });
          return;
        }
        for (let x = 1; x <= n; x++) {
          if (!(base[empty[i]] & bit(x))) continue;
          let bad = false;
          for (let j = 0; j < i; j++) if (v[at[j]] == x && sameLine(n, empty[j], empty[i])) bad = true;
          if (bad) continue;
          v[at[i]] = x;
          rec(i + 1);
        }
        v[at[i]] = 0;
      };
      rec(0);
      empty.forEach((c, j) => (cand[c] = sup[j]));
      lids.forEach((li, k) => { if (fills[ci] && inter[k]) must.push([ci, li, inter[k]]); });
    });
    return { cand, fills, must };
  }
  // what the cage alone allows in square c (its arithmetic and the numbers already in the cage; rows and columns not looked at)
  // -> {opts: mask for c, sets: the number sets that make the cage as sorted lists (only when the cage is still empty)}
  function cageOpts(p, b, ci, c) {
    const n = p.n, cg = p.cg[ci], v = cg.c.map(q => b[q]), at = cg.c.indexOf(c), sets = new Set();
    const empty = cg.c.map((q, i) => (b[q] ? -1 : i)).filter(i => i >= 0);
    let opts = 0;
    const rec = j => {
      if (j == empty.length) {
        if (calc(cg.o, v) !== cg.t) return;
        opts |= bit(v[at]);
        sets.add(v.slice().sort((x, y) => x - y).join(','));
        return;
      }
      const i = empty[j];
      for (let x = 1; x <= n; x++) {
        let bad = false;
        for (let k = 0; k < cg.c.length; k++) if (k != i && v[k] == x && sameLine(n, cg.c[k], cg.c[i])) bad = true;
        if (bad) continue;
        v[i] = x;
        rec(j + 1);
      }
      v[i] = 0;
    };
    rec(0);
    return { opts, sets: empty.length == cg.c.length ? [...sets].map(s => s.split(',').map(Number)) : null };
  }
  // why square c of cage ci holds v: the number sets of the cage, then what its row and column take away
  function cageWhy(p, b, ci, c, v) {
    const cg = p.cg[ci], o = cageOpts(p, b, ci, c), lab = label(cg), size = WORD[cg.c.length] + ' squares';
    const have = cg.c.map(q => b[q]).filter(Boolean);
    let head;
    if (o.sets && o.sets.length <= 4) {
      const ss = o.sets.map(s => list(s));
      head = o.sets.length == 1 ? `Only ${ss[0]} make ${lab} in ${size}.` : `${lab} in ${size} can be ${ss.join(', or ')}.`;
    } else if (have.length) head = `${lab} with ${list(have)} in: this square can be ${list(bits(o.opts), 'or')}.`;
    else head = `For ${lab} this square can be ${list(bits(o.opts), 'or')}.`;
    const G = geo(p.n), inLine = new Set(G.peers[c].map(q => b[q]).filter(Boolean));
    const gone = bits(o.opts).filter(x => inLine.has(x)), left = bits(o.opts).filter(x => !inLine.has(x));
    if (gone.length && left.length == 1 && left[0] == v)
      return `${head} ${list(gone)} ${gone.length > 1 ? 'are' : 'is'} already in this square's row or column, so it is ${v}.`;
    if (bits(o.opts).length == 1) return `${head} So this square is ${v}.`;
    return `${head} Try each one: only ${v} fits here with its row, its column and the rest of the cage.`;
  }

  // The next step: {kind, cell, v, house (squares hint 1 points at), also (squares hint 2 marks besides the cell), say1, say2, say3}
  function nextStep(p, st) {
    const n = p.n, G = geo(n), I = info(p), b = vals(p, st), sol = nums(p.s), e = nums(st.v);
    if (b.join('') == p.s) return null;
    const cageOf = c => p.cg[I.cageAt[c]];
    const say3 = v => `${v} goes here.`;
    // 1. a number that is not right: one that clashes first, then one in a cage that misses, then any
    const wrong = e.map((x, c) => (x && x != sol[c] ? c : -1)).filter(c => c >= 0);
    if (wrong.length) {
      const cf = conflicts(p, b), ms = new Set([].concat(...misses(p, b).map(i => p.cg[i].c)));
      const c = wrong.find(x => cf.has(x)) ?? wrong.find(x => ms.has(x)) ?? wrong[0];
      return { kind: 'wrong', cell: c, v: sol[c], house: cageOf(c).c, also: [],
        say1: 'One number in this cage is not right yet.', say2: `This ${e[c]} does not belong here. Another number goes in this square.`, say3: say3(sol[c]) };
    }
    // 2. a cage with one empty square that its arithmetic fixes
    for (const cg of p.cg) {
      const empty = cg.c.filter(c => !b[c]);
      if (empty.length != 1 || cg.o == '=') continue;
      const fits = range(n).map(i => i + 1).filter(x => calc(cg.o, cg.c.map(c => b[c] || x)) === cg.t);
      if (fits.length != 1) continue;
      const c = empty[0], v = fits[0], have = cg.c.filter(q => q != c).map(q => b[q]), all = cg.c.map(q => b[q] || v);
      const how = { '+': `The numbers in this cage add up to ${cg.t}`, '*': `The numbers in this cage multiply to ${cg.t}`,
        '-': `In this cage the two numbers are ${cg.t} apart`, '/': `In this cage one number is ${cg.t} times the other` }[cg.o];
      return { kind: 'cagelast', cell: c, v, house: cg.c, also: [],
        say1: `This ${label(cg)} cage needs just one more number.`,
        say2: `${how}. It has ${list(have)}, so the last number is ${v}: ${sumText(cg, all)}.`, say3: say3(v) };
    }
    // 3. a row or column with one gap
    for (const L of G.lines) {
      const gaps = L.cells.filter(c => !b[c]);
      if (gaps.length != 1) continue;
      const have = new Set(L.cells.map(c => b[c])), v = range(n).map(i => i + 1).find(x => !have.has(x));
      return { kind: 'last', cell: gaps[0], v, house: L.cells, also: [],
        say1: `This ${L.k} has just one empty square.`, say2: `Only ${v} is missing from this ${L.k}.`, say3: say3(v) };
    }
    // 4. a cage single: a square with one candidate left; the cage with the fewest ways to make it first
    const a = analyse(p, b);
    const single = an => {
      let best = -1;
      for (let c = 0; c < n * n; c++) if (!b[c] && one(an.cand[c]) && (best < 0 || an.fills[I.cageAt[c]] < an.fills[I.cageAt[best]])) best = c;
      if (best >= 0) return { kind: 'cage', cell: best, v: valOf(an.cand[best]) };
      for (const L of G.lines) for (let v = 1; v <= n; v++) {
        if (L.cells.some(c => b[c] == v)) continue;
        const where = L.cells.filter(c => !b[c] && an.cand[c] & bit(v));
        if (where.length == 1) return { kind: 'hidden', cell: where[0], v, L };
      }
      return null;
    };
    const hiddenWhy = s => `${s.v} can only go here: no other empty square of this ${s.L.k} can be ${s.v}, because of its ${s.L.k == 'row' ? 'column' : 'row'} or its cage.`;
    let s = single(a);
    if (s && s.kind == 'cage') {
      const cg = cageOf(s.cell);
      return { kind: 'cage', cell: s.cell, v: s.v, house: cg.c, also: [],
        say1: `Look at the ${label(cg)} cage. Which numbers can make it?`, say2: cageWhy(p, b, I.cageAt[s.cell], s.cell, s.v), say3: say3(s.v) };
    }
    if (s) return { kind: 'hidden', cell: s.cell, v: s.v, house: s.L.cells, also: [],
      say1: `Look at this ${s.L.k}. Where can ${s.v} go?`, say2: hiddenWhy(s), say3: say3(s.v) };
    // 5. take candidates away (a cage in a line, a naked pair) until a single shows
    const elim = new Array(n * n).fill(0);
    let first = null, an = a;
    for (let it = 0; it < 60; it++) {
      let x = null;
      for (const [ci, li, m] of an.must) {
        const L = G.lines[li], out = [];
        for (const c of L.cells) if (!b[c] && I.cageAt[c] != ci) for (const v of bits(m & an.cand[c])) out.push([c, v]);
        if (out.length) { x = { kind: 'inline', ci, L, v: out[0][1], at: p.cg[ci].c.filter(c => !b[c] && G.lineIds[c].includes(li)), out }; break; }
      }
      if (!x) for (const L of G.lines) {
        for (let i = 0; i < n && !x; i++) {
          const c1 = L.cells[i];
          if (b[c1] || popc(an.cand[c1]) != 2) continue;
          for (let j = i + 1; j < n && !x; j++) {
            const c2 = L.cells[j];
            if (b[c2] || an.cand[c2] != an.cand[c1]) continue;
            const out = [];
            for (const c of L.cells) if (c != c1 && c != c2 && !b[c]) for (const v of bits(an.cand[c] & an.cand[c1])) out.push([c, v]);
            if (out.length) x = { kind: 'pair', L, vs: bits(an.cand[c1]), at: [c1, c2], out };
          }
        }
        if (x) break;
      }
      if (!x) break;
      for (const [c, v] of x.out) elim[c] |= bit(v);
      if (!first) first = x;
      an = analyse(p, b, elim);
      s = single(an);
      if (s) {
        const k = first.L.k;
        const pre = first.kind == 'inline'
          ? `Every way to make ${label(p.cg[first.ci])} puts ${aN(first.v)} in the marked squares of this ${k}, so no other square of the ${k} can be ${first.v}. Now `
          : `The marked squares can only be ${first.vs[0]} and ${first.vs[1]}, so no other square of this ${k} can be. Now `;
        const tail = s.kind == 'cage' ? `only ${s.v} fits here.` : `${s.v} can only go here in its ${s.L.k}.`;
        return { kind: first.kind, cell: s.cell, v: s.v, house: first.L.cells, also: first.at,
          say1: first.kind == 'inline' ? `Look at the ${label(p.cg[first.ci])} cage and this ${k}.` : `Look at this ${k}. Which numbers can each square be?`,
          say2: pre + tail, say3: say3(s.v) };
      }
    }
    // 6. never stuck: the empty square with the fewest choices
    let c = -1;
    for (let i = 0; i < b.length; i++) if (!b[i] && (c < 0 || popc(a.cand[i]) < popc(a.cand[c]))) c = i;
    return { kind: 'guess', cell: c, v: sol[c], house: cageOf(c).c, also: [],
      say1: 'Try this square.', say2: 'Look at its row, its column and its cage.', say3: say3(sol[c]) };
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
  // words for the voice: "12×" -> "12 times", "2 + 3 = 5" -> "2 plus 3 equals 5"
  const spoken = t => String(t).replace(/ \+ /g, ' plus ').replace(/ × /g, ' times ').replace(/ − /g, ' minus ').replace(/ ÷ /g, ' divided by ')
    .replace(/ = /g, ' equals ').replace(/(\d)\+/g, '$1 plus').replace(/(\d)×/g, '$1 times').replace(/(\d)−/g, '$1 minus').replace(/(\d)÷/g, '$1 divide');

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    const G = geo(p.n), I = info(p), n = p.n, N = n * n, giv = I.giv, nt = notesOn(p);
    let st = api.loadState();
    if (!fit(p, st)) st = fresh(p);
    const timers = [];
    const later = (f, ms) => timers.push(setTimeout(f, ms));
    let marks = { house: [], cell: [] }, msg = '', done = false;
    const ops = [...new Set(p.cg.map(g => g.o).filter(o => o != '='))].sort((x, y) => '+-*/'.indexOf(x) - '+-*/'.indexOf(y));
    const intro = p.b == 'B'
      ? `Each row and column needs 1, 2 and 3 once. The numbers in a cage add up to its number. Tap a square, then a number.`
      : `Each row and column needs 1 to ${n} once. The numbers in a cage make its number with its sign (${ops.map(o => SIGN[o]).join(' ')}). Tap a square, then a number.`;
    const labAt = new Array(N).fill(-1);
    p.cg.forEach((g, i) => { if (g.o != '=') labAt[g.c[0]] = i; });

    // the cage lines: thin between squares of one cage, thick between cages (viewBox units = squares; the grid's edge is its CSS ring)
    let thin = '', thick = '';
    for (let c = 0; c < N; c++) {
      const r = Math.floor(c / n), k = c % n;
      if (k < n - 1) { const d = `M${k + 1} ${r}V${r + 1}`; if (I.cageAt[c] == I.cageAt[c + 1]) thin += d; else thick += d; }
      if (r < n - 1) { const d = `M${k} ${r + 1}H${k + 1}`; if (I.cageAt[c] == I.cageAt[c + n]) thin += d; else thick += d; }
    }
    const lines = `<svg class="md-lines" viewBox="0 0 ${n} ${n}" preserveAspectRatio="none" aria-hidden="true">` +
      (thin ? `<path class="md-thin" d="${thin}"/>` : '') + (thick ? `<path class="md-thick" d="${thick}"/>` : '') + '</svg>';
    const cells = range(N).map(c => `<button class="md-c" data-c="${c}"></button>`).join('');
    const pad = padHTML('', false).replace('class="keys qpad pad"', 'class="keys qpad pad md-pad"');
    el.innerHTML = `<div class="md md-n${n} md-${p.b}" style="--n:${n}">` +
      `<div class="md-say">${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'md-spk' })}<p class="md-msg" aria-live="polite"></p></div>` +
      `<div class="md-main"><div class="md-board" role="group" aria-label="MathDoku, ${n} by ${n}"><div class="md-grid">${cells}</div>${lines}</div></div>` +
      `<div class="md-ctl">${pad}</div></div>`;
    const root = el.querySelector('.md'), board = root.querySelector('.md-board'), padEl = root.querySelector('.md-pad');
    const say_ = root.querySelector('.md-say'), ctl = root.querySelector('.md-ctl'), main = root.querySelector('.md-main');
    const cellEl = range(N).map(c => board.querySelector(`[data-c="${c}"]`));
    // the pad: 1..n with dots for how many are left; Erase and Undo, and Notes in bands C and D
    padEl.querySelectorAll('.k').forEach(k => { const d = k.dataset.k; if (d == '0' || d == 'go' || +d > n) k.remove(); });
    for (let v = 1; v <= n; v++) {
      const k = padEl.querySelector(`.k[data-k="${v}"]`);
      k.innerHTML = `<span class="md-kf">${v}</span><small class="md-left"></small>`;
      k.classList.add('md-sym');
    }
    const del = padEl.querySelector('.k[data-k="del"]');
    del.setAttribute('aria-label', 'Erase');
    del.classList.add('t');
    del.insertAdjacentHTML('beforeend', '<span>Erase</span>');
    padEl.append(del);
    padEl.insertAdjacentHTML('beforeend', (nt ? `<button class="key k t md-ntk" data-k="notes" aria-label="Notes" aria-pressed="false">${ico('edit')}<span>Notes</span></button>` : '') +
      `<button class="key k t" data-k="undo" aria-label="Undo">${ico('undo')}<span>Undo</span></button>`);
    const tools = padEl.querySelectorAll('.key.t').length;

    function tell(text, kind, speak) {
      msg = text;
      const m = root.querySelector('.md-msg');
      m.textContent = text;
      m.className = 'md-msg' + (kind ? ' ' + kind : '');
      if (speak) api.say(spoken(text));
    }
    root.querySelector('.md-spk').onclick = () => { try { say(spoken(msg)); } catch (e) {} };

    /* ---------- drawing ---------- */
    function draw() {
      const b = vals(p, st), cf = conflicts(p, b), ms = new Set(misses(p, b)), s = G.at[st.sel], selV = b[st.sel];
      for (let c = 0; c < N; c++) {
        const v = b[c], given = !!giv[c], hn = st.hn.includes(c), m = noteOf(st, c), a = G.at[c], li = labAt[c];
        let cls = 'md-c' + (given ? ' giv' : v ? (hn ? ' ent hn' : ' ent') : '');
        if (c == st.sel) cls += ' sel';
        else if (a.r == s.r || a.c == s.c) cls += ' rc';
        if (selV && v == selV && c != st.sel) cls += ' same';
        if (cf.has(c)) cls += ' cf';
        if (marks.cell.includes(c)) cls += ' hl';
        else if (marks.house.includes(c)) cls += ' hh';
        if (li >= 0) cls += ' lab';
        let html = '', lab = v ? String(v) : 'empty';
        if (li >= 0) {
          const miss = ms.has(li);
          html += `<span class="md-lab${miss ? ' miss' : ''}">${miss ? ico('warning', 14) : ''}${label(p.cg[li])}</span>`;
        }
        if (v) html += `<b class="md-v">${v}</b>` + (cf.has(c) && !given ? `<span class="md-wn">${ico('warning', 16)}</span>` : '');
        else if (m) {
          html += `<i class="md-nts">${range(n).map(i => `<span>${m & bit(i + 1) ? i + 1 : ''}</span>`).join('')}</i>`;
          lab = 'notes ' + range(n).filter(i => m & bit(i + 1)).map(i => i + 1).join(' ');
        }
        if (given) lab += ', given';
        if (cf.has(c)) lab += ', clashes';
        const cg = p.cg[I.cageAt[c]];
        const cage = cg.o == '=' ? '' : `, cage ${spoken(label(cg))}${ms.has(I.cageAt[c]) ? ' does not make its number' : ''}`;
        if (cellEl[c].className != cls) cellEl[c].className = cls;
        if (cellEl[c]._h !== html) { cellEl[c].innerHTML = html; cellEl[c]._h = html; }
        cellEl[c].setAttribute('aria-label', `Row ${a.r + 1}, column ${a.c + 1}: ${lab}${cage}`);
      }
      for (let v = 1; v <= n; v++) {
        const k = padEl.querySelector(`.k[data-k="${v}"]`), left = n - b.filter(x => x == v).length;
        // one dot for each one left (a count that cannot be read as a power), a tick when none are left
        const lf = k.querySelector('.md-left'), t = left > 0 ? '<i></i>'.repeat(Math.min(n, left)) : ico('check', 14);
        if (lf._h !== t) { lf.innerHTML = t; lf._h = t; }
        k.classList.toggle('zero', left <= 0);
        k.setAttribute('aria-label', `${v}, ${Math.max(0, left)} left`);
      }
      const nk = padEl.querySelector('[data-k="notes"]'), uk = padEl.querySelector('[data-k="undo"]');
      if (nk) { nk.classList.toggle('on', !!st.nt); nk.setAttribute('aria-pressed', st.nt ? 'true' : 'false'); }
      uk.disabled = !st.h.length || done;
      root.classList.toggle('nt', !!st.nt);
    }

    /* ---------- layout: the board is a square sized to the space that is left (section 8) ----------
       portrait: talk line, board, pad; landscape: board, then a side column with the talk line and the pad.
       The pad is a grid of 60 narrow columns, so the digits and the tools can each share a row evenly (60 = 3 x 4 x 5). */
    const side = document.createElement('div');
    side.className = 'md-side';
    root.append(side);
    let lastW = 0, lastH = 0;
    function arrange(land) {
      if (land) { root.append(main, side); side.append(say_, ctl); }
      else root.append(say_, main, ctl);
      root.classList.toggle('land', land);
    }
    // the digits in one row when each key can be 48 px wide, else two rows; the tools (with their words) in the row below
    function setPad(w) {
      const ds = 60 / ((w - n * 8) / n >= 48 ? n : Math.ceil(n / 2)), ts = 60 / tools;
      padEl.style.setProperty('--ds', Math.floor(ds));
      padEl.style.setProperty('--ts', Math.floor(ts));
      // a tool key too narrow for its word shows the icon only (its aria-label still says it)
      padEl.classList.toggle('tight', (w * ts) / 60 - 8 < 104);
    }
    function layout() {
      if (!el.isConnected) return;
      const ps = getComputedStyle(el);
      const aw = el.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
      const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
      lastW = aw; lastH = ah;
      const land = aw > ah * 1.15 && aw >= 640, gap = 12;
      let bs;
      arrange(land);
      if (land) {
        setPad(side.offsetWidth);
        bs = Math.min(ah, aw - side.offsetWidth - 2 * gap);
      } else {
        setPad(aw);
        bs = Math.min(aw, ah - say_.offsetHeight - ctl.offsetHeight - 2 * gap);
      }
      const cs = Math.min(MAXCELL[n] || 64, Math.floor((Math.max(120, bs) - 2 * FP) / n));
      root.style.setProperty('--cs', Math.max(28, cs) + 'px');
      draw();
    }
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { if (el.clientWidth != lastW || el.clientHeight != lastH) layout(); }, 120); };
    window.addEventListener('resize', onResize);

    /* ---------- moves ---------- */
    const store = () => api.saveState(st);
    const speakB = p.b == 'B';
    function finish() {
      done = true;
      marks = { house: [], cell: [] };
      draw();
      root.classList.add('win');
      tell('Solved! Every row and column has each number once, and every cage makes its number.', 'good', speakB);
      api.win({ mistakes: st.miss });
    }
    function pick(c) {
      if (done || c == null || c < 0 || c >= N) return;
      st.sel = c;
      SFX.click();
      store();
      draw();
    }
    const msgAfter = () => {
      const b = vals(p, st);
      if (conflicts(p, b).size) return 'Some numbers still clash. The amber squares show where.';
      if (misses(p, b).length) return 'A cage with an amber number does not make it yet.';
      return 'Keep going!';
    };
    function pop(cs) {
      for (const c of cs) {
        const e = cellEl[c];
        e.classList.remove('pop');
        void e.offsetWidth;
        e.classList.add('pop');
      }
    }
    function sym(v) {
      if (done) return;
      const c = st.sel;
      if (st.nt && nt) {
        const r = note(p, st, c, v);
        if (r.ign) return tell(+st.v[c] || locked(p, st, c) ? 'Notes go in empty squares.' : 'Tap an empty square first.', 'try');
        SFX.key(v);
        store();
        return draw();
      }
      const r = enter(p, st, c, v);
      if (r.ign) {
        if (r.ign == 'same') return;
        return tell(giv[c] ? 'That one was there from the start. Tap an empty square.' : 'A hint filled that one. Tap another square.', 'try', speakB);
      }
      marks = { house: [], cell: [] };
      store();
      draw();
      if (r.conf.length) {
        SFX.rattle();
        const k = clash(p, vals(p, st), c, v);
        return tell(`Two ${v}s in this ${k ? k.k : 'row'}. Change one of them.`, 'try', speakB);
      }
      const cg = p.cg[r.cage];
      if (cg && !r.made) {
        SFX.rattle();
        const b = vals(p, st);
        return tell(`${sumText(cg, cg.c.map(q => b[q]))}, but this cage needs ${cg.t}. Change a number.`, 'try', speakB);
      }
      SFX.pop(1);
      if (r.won) return finish();
      if (cg && r.made) { pop(cg.c); return tell(`${sumText(cg, cg.c.map(q => vals(p, st)[q]))}. That cage works!`, 'good'); }
      tell(msgAfter(), '');
    }
    function act(k) {
      if (done) return;
      if (k == 'del') {
        const r = erase(p, st, st.sel);
        if (r.ign) return tell(locked(p, st, st.sel) ? 'That one stays. Pick a square you filled.' : 'That square is already empty.', 'try');
        SFX.del();
        tell(msgAfter(), '');
      } else if (k == 'notes') {
        st.nt = st.nt ? 0 : 1;
        SFX.click();
        tell(st.nt ? 'Notes are on: tap numbers to jot them small. Tap Notes again to write big.' : 'Notes are off: numbers go in big.', '');
      } else if (k == 'undo') {
        const c = undo(p, st);
        if (c == null) return;
        st.sel = c;
        SFX.whoosh();
        marks = { house: [], cell: [] };
        tell(msgAfter(), '');
      } else return sym(+k);
      store();
      draw();
    }
    board.onclick = e => { const b = e.target.closest('.md-c'); if (b) pick(+b.dataset.c); };
    padEl.querySelectorAll('.k[data-k]').forEach(b => b.onclick = () => act(b.dataset.k));
    // hardware keys: digits, Backspace or Delete, arrows to move, N for notes
    const keyd = e => {
      if (!el.isConnected || done || document.querySelector('.bt-win,.sheet')) return;
      const a = G.at[st.sel], mv = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[e.key];
      if (/^[1-9]$/.test(e.key) && +e.key <= n) { e.preventDefault(); act(e.key); }
      else if (e.key == 'Backspace' || e.key == 'Delete') { e.preventDefault(); act('del'); }
      else if ((e.key == 'n' || e.key == 'N') && nt) act('notes');
      else if (mv) { e.preventDefault(); pick(((a.r + mv[0] + n) % n) * n + ((a.c + mv[1] + n) % n)); }
    };
    document.addEventListener('keydown', keyd);

    /* ---------- start ---------- */
    const fresh_ = !st.v.replace(/0/g, '') && !st.m.length;
    tell(fresh_ ? intro : 'Keep going! Tap an empty square.', '', fresh_ && speakB);
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
          pop([h.fill[0]]);
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

  return { SIGN, SYMS, calc, label, decode, transform, slot, make, geo, info, fresh, fit, vals, conflicts, misses, enter, erase, note, undo,
    fill, won, notesOn, analyse, nextStep, hint, solve, spoken, mount, nums };
})();

BT.reg({
  id: 'mdoku', name: 'MathDoku', icon: 'mdoku', bands: 'BCD',
  rules: 'Every row and every column has each number once. The numbers in each cage make the cage\'s number with its sign.',
  make: (band, level, rnd) => MD.make(band, level, rnd),
  mount: (el, p, api) => MD.mount(el, p, api),
  solve: p => MD.solve(p),
});
