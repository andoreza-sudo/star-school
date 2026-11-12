/* ---------- Brain Teasers: Word Search (P3-15; BRAIN_TEASERS.md 5.10, 7, 8) ----------
   One registered type, `wsearch`, bands B C D. Words from the child's spelling lists (SPELL_WORDS, d-spell.js) hide in a letter grid.
     B (1-2)  spelling levels 1-3; 5 x 5 with 5 words across (levels 1-4), across and down (5-8), 6 x 6 with 6 words (9-12)
     C (3-4)  spelling levels 4-5; 7 x 7, 6 words across, down and on the down slant (1-4); 8 x 8, + the up slant, 7 / 8 words
     D (5-6)  spelling levels 5-7; every direction, backwards too: 9 x 9 with 8 words, 10 x 10 with 9 / 10 words
   make() places the longest word first, picking a direction the band allows and then a spot (two words may share one letter where
   they cross), then fills the other squares with letters weighted by English frequency. Checks before a grid is kept: every listed
   word reads exactly once in the grid in any of the 8 directions (its own place), and no word of the rude list (BTW.rude,
   d-words-bt.js) reads anywhere in any direction; a filler square in a bad run is drawn again until both hold. Words that hold a
   rude run, palindromes, and words that hold another listed word (or its reverse) are never put in one grid.
   Play: drag across a word (touch or mouse; the line snaps to the 8 directions), or tap its first letter and then its last. Either
   end may come first. A found word gets a soft coloured band in the grid and is struck through with a tick in the list (never
   colour alone) and spoken. A line of 3 or more letters that is not a word counts one mistake (allow 3); shorter slips do not.
   Hints, per word (the first word not found yet): 1 rings its first letter, 2 shades its row, column or slanted line, 3 finds it
   (a star-yellow band); the next press starts on the next word. Grid squares are at least 44 px where the screen allows
   (BRAIN_TEASERS 8; a 10 x 10 grid on a 380 px phone is 36 px, as section 8 allows for 9 x 9 on a phone).
   State (api.saveState): {f: found word indexes, hf: the ones a hint found, miss, hw: hint word or -1, h: its tier, pk: first
   tapped square or -1}; WS.fit rejects a state that does not belong to the puzzle. */
const WS = (() => {
  // directions [row step, column step]: 0-3 read forwards (right, down, down slant, up slant), 4-7 are the same lines backwards
  const DIRS = [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1]];
  const ALL = [0, 1, 2, 3, 4, 5, 6, 7];
  // per band, levels 1-4 / 5-8 / 9-12: [grid side, words, directions, shortest word, longest word]
  const TIER = {
    B: [[5, 5, [0], 3, 5], [5, 5, [0, 1], 3, 5], [6, 6, [0, 1], 3, 6]],
    C: [[7, 6, [0, 1, 2], 4, 7], [8, 7, [0, 1, 2, 3], 4, 8], [8, 8, [0, 1, 2, 3], 4, 8]],
    D: [[9, 8, ALL, 5, 8], [10, 9, ALL, 5, 9], [10, 10, ALL, 5, 9]],
  };
  const SRC = { B: [1, 2, 3], C: [4, 5], D: [5, 6, 7] }; // spelling levels per band
  // filler letters, weighted by how often they appear in English (no j, q, x, z)
  const FILL = 'eeeeeeeeeeeettttttttttaaaaaaaaaooooooooiiiiiiinnnnnnnsssssshhhhhhrrrrrrddddlllluuuuccmmmwwffggyyppbbvk';
  const tierOf = level => Math.min(2, Math.floor((Math.max(1, Math.min(12, level | 0 || 1)) - 1) / 4));
  const rev = w => [...w].reverse().join('');
  const rude = () => BTW.rude.split(' ');
  const cache = {};
  // the words a band can use (spelling words, a-z, no BAD, no rude run either way, no palindrome)
  function pool(band) {
    if (cache[band]) return cache[band];
    const R = rude(), out = [];
    for (const lv of SRC[band]) for (const ln of SPELL_WORDS[lv].split('\n')) {
      const w = ln.split('|')[0];
      if (!/^[a-z]+$/.test(w) || out.includes(w) || BAD.test(w) || w == rev(w) || R.some(r => w.includes(r) || rev(w).includes(r))) continue;
      out.push(w);
    }
    return cache[band] = out;
  }
  const cellsOf = (n, r, c, d, len) => Array.from({ length: len }, (_, k) => (r + DIRS[d][0] * k) * n + c + DIRS[d][1] * k);
  const wcells = (p, i) => { const x = p.w[i]; return cellsOf(p.n, x.r, x.c, x.d, x.t.length); };
  // every place a word reads in the grid string g: [[r, c, d], ...] over all 8 directions
  function finds(g, n, w) {
    const out = [], L = w.length;
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      if (g[r * n + c] != w[0]) continue;
      for (let d = 0; d < 8; d++) {
        const er = r + DIRS[d][0] * (L - 1), ec = c + DIRS[d][1] * (L - 1);
        if (er < 0 || ec < 0 || er >= n || ec >= n) continue;
        let k = 1;
        while (k < L && g[(r + DIRS[d][0] * k) * n + c + DIRS[d][1] * k] == w[k]) k++;
        if (k == L) out.push([r, c, d]);
      }
    }
    return out;
  }

  /* ---------- make ---------- */
  function pickWords(band, T, rnd) {
    const [n, k, , lo, hi] = T, cand = pool(band).filter(w => w.length >= lo && w.length <= Math.min(hi, n));
    for (let i = cand.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [cand[i], cand[j]] = [cand[j], cand[i]]; }
    const out = [];
    for (const w of cand) {
      if (out.length >= k) break;
      if (!out.some(o => o.includes(w) || w.includes(o) || o.includes(rev(w)) || rev(w).includes(o))) out.push(w);
    }
    return out;
  }
  function place(n, words, dirs, rnd) {
    const g = Array(n * n).fill(''), placed = [];
    for (const w of words.slice().sort((a, b) => b.length - a.length)) {
      const by = {};
      for (const d of dirs) for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
        const er = r + DIRS[d][0] * (w.length - 1), ec = c + DIRS[d][1] * (w.length - 1);
        if (er < 0 || ec < 0 || er >= n || ec >= n) continue;
        const cs = cellsOf(n, r, c, d, w.length);
        let ov = 0, ok = true;
        cs.forEach((i, k) => { if (g[i]) { if (g[i] == w[k]) ov++; else ok = false; } });
        if (ok && ov <= 1) (by[d] = by[d] || []).push([r, c, ov]); // two words share at most the one letter where they cross
      }
      const ds = Object.keys(by);
      if (!ds.length) return null;
      const d = +ds[Math.floor(rnd() * ds.length)], all = by[d], cross = all.filter(o => o[2]);
      const use = cross.length && rnd() < 0.45 ? cross : all, [r, c] = use[Math.floor(rnd() * use.length)];
      cellsOf(n, r, c, d, w.length).forEach((i, k) => { g[i] = w[k]; });
      placed.push({ t: w, r, c, d });
    }
    return { g, placed };
  }
  // fill the empty squares; then redraw filler squares that make a listed word read twice or a rude run read anywhere
  function fill(n, g, placed, rnd) {
    const own = new Set();
    placed.forEach(x => cellsOf(n, x.r, x.c, x.d, x.t.length).forEach(i => own.add(i)));
    for (let i = 0; i < n * n; i++) if (!g[i]) g[i] = FILL[Math.floor(rnd() * FILL.length)];
    const R = rude();
    for (let t = 0; t < 400; t++) {
      const s = g.join('');
      let badRun = null;
      for (const x of placed) {
        const f = finds(s, n, x.t).filter(([r, c, d]) => !(r == x.r && c == x.c && d == x.d));
        if (f.length) { badRun = cellsOf(n, ...f[0], x.t.length); break; }
      }
      if (!badRun) for (const w of R) { const f = finds(s, n, w); if (f.length) { badRun = cellsOf(n, ...f[0], w.length); break; } }
      if (!badRun) return true;
      const free = badRun.filter(i => !own.has(i));
      if (!free.length) return false;
      g[free[Math.floor(rnd() * free.length)]] = FILL[Math.floor(rnd() * FILL.length)];
    }
    return false;
  }
  function make(band, level, rnd) {
    const T = TIER[band][tierOf(level)], [n, k, dirs] = T;
    for (let a = 0; a < 200; a++) {
      const words = pickWords(band, T, rnd);
      if (words.length < k) continue;
      const pl = place(n, words, dirs, rnd);
      if (!pl || !fill(n, pl.g, pl.placed, rnd)) continue;
      return { b: band, n, dirs: dirs.slice(), g: pl.g.join(''), w: pl.placed.sort((x, y) => x.t < y.t ? -1 : 1) };
    }
    throw new Error('word search: no grid');
  }
  // the squares from a to b when they are in one straight line (any of the 8 directions), else null
  function line(n, a, b) {
    const r0 = Math.floor(a / n), c0 = a % n, dr = Math.floor(b / n) - r0, dc = b % n - c0;
    if (dr && dc && Math.abs(dr) != Math.abs(dc)) return null;
    const L = Math.max(Math.abs(dr), Math.abs(dc)), sr = Math.sign(dr), sc = Math.sign(dc);
    return Array.from({ length: L + 1 }, (_, k) => (r0 + sr * k) * n + c0 + sc * k);
  }
  // the word whose first and last letters are a and b (either way round), or -1
  function match(p, a, b) {
    for (let i = 0; i < p.w.length; i++) {
      const cs = wcells(p, i), f = cs[0], l = cs[cs.length - 1];
      if ((a == f && b == l) || (a == l && b == f)) return i;
    }
    return -1;
  }
  const solve = p => p.w.map((_, i) => { const cs = wcells(p, i); return [cs[0], cs[cs.length - 1]]; });
  const fresh = () => ({ f: [], hf: [], miss: 0, hw: -1, h: 0, pk: -1 });
  function fit(p, s) {
    if (!s || typeof s != 'object' || Array.isArray(s)) return false;
    const N = p.w.length, int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi, idx = a => Array.isArray(a) && a.every(i => int(i, 0, N - 1)) && new Set(a).size == a.length;
    if (!idx(s.f) || !idx(s.hf) || !s.hf.every(i => s.f.includes(i)) || s.f.length >= N) return false;
    if (!int(s.miss, 0, 999) || !int(s.hw, -1, N - 1) || !int(s.h, 0, 3) || !int(s.pk, -1, p.n * p.n - 1)) return false;
    return (s.hw < 0) == (s.h == 0) && !s.f.includes(s.hw);
  }
  // the word a hint works on: the one already hinted, else the first word not found yet
  const hintWord = (p, s) => s.hw >= 0 && !s.f.includes(s.hw) ? s.hw : p.w.findIndex((_, i) => !s.f.includes(i));
  const lineName = d => d % 4 == 0 ? 'row' : d % 4 == 1 ? 'column' : 'slanted line';
  function hintText(p, i, t) {
    const W = p.w[i].t.toUpperCase();
    if (t == 1) return `${W} starts at the ringed letter.`;
    if (t == 2) return `${W} is in the shaded ${lineName(p.w[i].d)}.`;
    return `Here is ${W}!`;
  }
  const ASK = {
    0: 'Find the words. They go across. Drag over a word, or tap its first and last letter.',
    1: 'Find the words. They go across and down. Drag over a word, or tap its first and last letter.',
    2: 'Find the words: across, down and slanted. Drag over a word, or tap its first and last letter.',
    3: 'Find the words. They can go any way, even backwards!',
  };
  const ask = p => ASK[p.dirs.length > 4 ? 3 : p.dirs.length > 2 ? 2 : p.dirs.length - 1];
  const COLS = ['yellow', 'green', 'aqua', 'pink', 'purple', 'orange', 'blue'];

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState();
    if (!fit(p, st)) st = fresh();
    let alive = true, msg = '', mk = '', done = false, drag = null, tmo = 0, cs = 44;
    const n = p.n, N = p.w.length;
    const say = (t, kind, speak) => {
      msg = t;
      mk = kind || '';
      const m = el.querySelector('.ws-msg');
      if (m) { m.textContent = t; m.className = 'ws-msg' + (mk ? ' ' + mk : ''); }
      if (speak) api.say(t);
    };
    const ctr = i => [i % n + 0.5, Math.floor(i / n) + 0.5];
    const seg = (a, b, cls) => { const [x1, y1] = ctr(a), [x2, y2] = ctr(b); return `<line class="${cls}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`; };
    const colOf = i => COLS[st.f.indexOf(i) % COLS.length];
    // the drawing under the letters: found bands, the hint marks, the line being drawn, the first tapped letter
    function overlay() {
      let h = '';
      const hw = st.hw;
      if (hw >= 0 && st.h >= 2) {
        const x = p.w[hw], [dr, dc] = DIRS[x.d];
        let a = x.r * n + x.c, b = a, r = x.r, c = x.c;
        while (r - dr >= 0 && r - dr < n && c - dc >= 0 && c - dc < n) { r -= dr; c -= dc; a = r * n + c; }
        r = x.r; c = x.c;
        while (r + dr >= 0 && r + dr < n && c + dc >= 0 && c + dc < n) { r += dr; c += dc; b = r * n + c; }
        h += seg(a, b, 'ws-hl');
      }
      for (const i of st.f) { const c = wcells(p, i); h += seg(c[0], c[c.length - 1], 'ws-band wk-' + (st.hf.includes(i) ? 'hint' : colOf(i))); }
      if (hw >= 0 && st.h >= 1) { const [x, y] = ctr(wcells(p, hw)[0]); h += `<circle class="ws-ring" cx="${x}" cy="${y}" r=".44"/>`; }
      if (st.pk >= 0) { const [x, y] = ctr(st.pk); h += `<circle class="ws-pk" cx="${x}" cy="${y}" r=".42"/>`; }
      h += '<line class="ws-live" x1="0" y1="0" x2="0" y2="0" style="display:none"/>';
      el.querySelector('.ws-ov').innerHTML = h;
    }
    function list() {
      return p.w.map((x, i) => {
        const got = st.f.includes(i);
        return `<li class="ws-w${got ? ' got wk-' + (st.hf.includes(i) ? 'hint' : colOf(i)) : ''}" data-w="${i}"${got ? ` aria-label="${esc(x.t)}, found"` : ''}>` +
          `<span class="ws-t">${esc(x.t.toUpperCase())}</span>${got ? ico('check', 18) : ''}</li>`;
      }).join('');
    }
    const countTxt = () => `${st.f.length} of ${N} found`;
    function render() {
      const cells = [];
      for (let i = 0; i < n * n; i++) cells.push(`<span class="ws-c">${esc(p.g[i].toUpperCase())}</span>`);
      el.innerHTML = `<div class="ws ws-${p.b}"><div class="ws-say"><p class="ws-msg" aria-live="polite"></p>` +
        `${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'ws-spk' })}</div>` +
        `<div class="ws-main"><div class="ws-board" style="--n:${n}" role="img" aria-label="Letter grid, ${n} by ${n}">` +
        `<svg class="ws-ov" viewBox="0 0 ${n} ${n}" aria-hidden="true"></svg>${cells.join('')}</div>` +
        `<div class="ws-side"><p class="ws-count">${countTxt()}</p><ul class="ws-list" aria-label="Words to find">${list()}</ul></div></div></div>`;
      el.querySelector('.ws-spk').onclick = () => api.say(msg);
      overlay();
      say(msg || ask(p), mk);
      size();
      wire();
    }
    function refresh() {
      overlay();
      el.querySelector('.ws-list').innerHTML = list();
      el.querySelector('.ws-count').textContent = countTxt();
    }
    // the board: the largest square that fits beside (wide screens) or above the word list, squares at least 44 px when possible
    function size() {
      const b = el.querySelector('.ws-board'), ws = el.querySelector('.ws');
      if (!b || !el.clientWidth) return;
      const css = getComputedStyle(el), px = v => parseFloat(v) || 0;
      const w = el.clientWidth - px(css.paddingLeft) - px(css.paddingRight), h = el.clientHeight - px(css.paddingTop) - px(css.paddingBottom);
      const wide = innerWidth >= 700 && innerWidth > innerHeight * 1.2;
      ws.classList.toggle('wide', wide);
      const talk = el.querySelector('.ws-say').offsetHeight, side = el.querySelector('.ws-side').offsetHeight;
      const room = wide ? Math.min(w - 300, h - 8) : Math.min(w + 12, h - talk - side - 28, 600);
      cs = Math.max(30, Math.min(72, Math.floor((room - 8) / n)));
      b.style.setProperty('--cs', cs + 'px');
    }
    const onResize = () => { if (alive) size(); };
    addEventListener('resize', onResize);
    // pointer -> square; while dragging the line snaps to the nearest of the 8 directions and stays inside the grid
    function at(e) {
      const r = el.querySelector('.ws-c').getBoundingClientRect();
      return [(e.clientX - r.left) / cs - 0.5, (e.clientY - r.top) / cs - 0.5]; // in squares, from the centre of the top-left one
    }
    const clampI = v => Math.max(0, Math.min(n - 1, Math.round(v)));
    function snap(a, x, y) {
      const r0 = Math.floor(a / n), c0 = a % n, dx = x - c0, dy = y - r0;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 0.5) return a;
      const ang = Math.round(Math.atan2(dy, dx) / (Math.PI / 4)), sc = Math.round(Math.cos(ang * Math.PI / 4)), sr = Math.round(Math.sin(ang * Math.PI / 4));
      let L = Math.round(Math.max(Math.abs(dx), Math.abs(dy)));
      while (L > 0 && (r0 + sr * L < 0 || r0 + sr * L >= n || c0 + sc * L < 0 || c0 + sc * L >= n)) L--;
      return (r0 + sr * L) * n + c0 + sc * L;
    }
    function live(a, b, cls) {
      const l = el.querySelector('.ws-live');
      if (!l) return;
      const [x1, y1] = ctr(a), [x2, y2] = ctr(b);
      l.setAttribute('x1', x1); l.setAttribute('y1', y1); l.setAttribute('x2', x2); l.setAttribute('y2', y2);
      l.setAttribute('class', 'ws-live' + (cls ? ' ' + cls : ''));
      l.style.display = '';
    }
    const hideLive = () => { const l = el.querySelector('.ws-live'); if (l) l.style.display = 'none'; };
    function wire() {
      const b = el.querySelector('.ws-board');
      b.addEventListener('pointerdown', e => {
        if (done || !alive || (e.pointerType == 'mouse' && e.button)) return;
        e.preventDefault();
        try { b.setPointerCapture(e.pointerId); } catch (er) {}
        clearTimeout(tmo);
        const [x, y] = at(e), a = clampI(y) * n + clampI(x);
        drag = { id: e.pointerId, a, b: a };
        live(a, a);
      });
      b.addEventListener('pointermove', e => {
        if (!drag || e.pointerId != drag.id) return;
        const [x, y] = at(e), nb = snap(drag.a, x, y);
        if (nb != drag.b) { drag.b = nb; live(drag.a, nb); }
      });
      const up = e => {
        if (!drag || e.pointerId != drag.id) return;
        const d = drag;
        drag = null;
        if (e.type == 'pointercancel') { hideLive(); return; }
        if (d.a == d.b) tap(d.a);
        else { st.pk = -1; pick(d.a, d.b); }
      };
      b.addEventListener('pointerup', up);
      b.addEventListener('pointercancel', up);
    }
    // tap-then-tap: the first tap rings a letter, the second picks the line to it (another letter not in line starts again there)
    function tap(i) {
      if (st.pk < 0 || st.pk == i || !line(n, st.pk, i)) {
        st.pk = st.pk == i ? -1 : i;
        api.saveState(st);
        overlay();
        if (st.pk >= 0) { SFX.key(3); say('Now tap the last letter of the word.', ''); } else say(ask(p), '');
        return;
      }
      const a = st.pk;
      st.pk = -1;
      pick(a, i);
    }
    function pick(a, b) {
      const i = match(p, a, b), L = line(n, a, b).length;
      if (i >= 0 && !st.f.includes(i)) return found(i, false);
      if (i >= 0) {
        overlay();
        say(`You found ${p.w[i].t.toUpperCase()} already.`, '');
      } else if (L >= 3) {
        st.miss++;
        api.sfx.wrong();
        overlay();
        live(a, b, 'no');
        tmo = setTimeout(hideLive, 900);
        say('That is not one of the words. Try again!', 'try');
      } else {
        overlay();
        say(ask(p), '');
      }
      api.saveState(st);
    }
    function found(i, hinted) {
      st.f.push(i);
      if (hinted) st.hf.push(i);
      if (st.hw == i) { st.hw = -1; st.h = 0; }
      st.pk = -1;
      api.saveState(st);
      refresh();
      const W = p.w[i].t;
      if (st.f.length == N) {
        done = true;
        el.querySelector('.ws-board').classList.add('won');
        say('You found every word!', 'good', true);
        api.win({ mistakes: st.miss, note: [`${N} words found`] });
        return;
      }
      api.sfx.right();
      if (!hinted) say(`${W.toUpperCase()}! ${N - st.f.length} to go.`, 'good');
      api.say(W);
    }
    if (st.h && st.hw >= 0) { msg = hintText(p, st.hw, st.h); mk = 'hint'; }
    render();
    if (api.band == 'B' && !st.f.length && !st.h) api.say(ask(p));
    return {
      hint() {
        if (done || !alive) return false;
        const i = hintWord(p, st);
        if (i < 0) return false;
        const t = st.hw == i ? Math.min(3, st.h + 1) : 1;
        st.hw = i;
        st.h = t;
        st.pk = -1;
        say(hintText(p, i, t), 'hint', true);
        if (t == 3) found(i, true);
        else { api.saveState(st); overlay(); }
        return true;
      },
      destroy() { alive = false; clearTimeout(tmo); removeEventListener('resize', onResize); },
    };
  }

  return { make, solve, mount, fit, fresh, match, line, finds, wcells, pool, hintWord, hintText, TIER, SRC, DIRS, tierOf, rev };
})();

BT.reg({
  id: 'wsearch', name: 'Word Search', icon: 'wsearch', bands: 'BCD', allow: 3,
  rules: 'Find every word in the grid. Drag across it, or tap its first and last letter.',
  make: WS.make, mount: WS.mount, solve: WS.solve,
});
