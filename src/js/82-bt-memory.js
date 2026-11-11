/* ---------- Brain Teasers: Memory Match (P3-14; BRAIN_TEASERS.md 5.9, 7) ----------
   One registered type, `memory`. Cards lie face down in a grid; tap two to turn them over; a pair stays up, two that do not match
   turn back after a moment (or at the next tap). Word lists are MEMW (src/data/d-memory.js) and SPN (34-gen-es.js); pictures go
   through picFor with the emoji fallback in RIDDLES.pics (read only inside functions, A11).
   Pairs and kinds per band (levels 1-4 / 5-8 / 9-12):
     A (PK-K)  3 pairs (levels 1-6), 4 pairs (7-12): the same picture twice (levels 1-8), then a big letter and its small letter
     B (1-2)   6 pairs: a number and its dots (1-6), a word and its picture, a number and its dots (4-10; 7-10 on two dice faces)
     C (3-4)   8 pairs: a fraction and its picture, a Spanish word and the English word, two words that mean the same
     D (5-6)   10 pairs: equal fractions, a fraction / decimal / percent of the same value, a word root and its meaning
   Every card has exactly one partner: the values, words and roots of a puzzle are all different (tools/test.js checks it).
   The layout is made from the seeded rnd, so it is the same for a band, level and day. A face-down card's face is not in the page
   (it is drawn only while the card is up) and the saved state names cards by place, never by what is on them.
   Mistakes: a "slip" is a pair that did not match although the child had already seen where the first card's partner was, or had
   already seen the second card (an unseen card was the better try). The first few slips of a band are free (A 0, B 1, C 2, D 3);
   the win reports the slips over that, and allow is 1, so a perfect memory is not needed for 3 stars.
   Hints (tier 1, 2, 3, then 3 again): 1 peeks at one card for a moment (the partner of the card that is up, else the unseen partner
   of a card the child has seen, else an unseen card), 2 shows one pair for a moment, 3 matches one pair (it stays up, ringed in star
   yellow). Tiers 1 and 2 change only what counts as seen.
   State (api.saveState after every turn): {m matched card places, hm the ones a hint matched, seen, turns, slips}; MM.fit rejects a
   state that does not belong to the puzzle. A card left up in the middle of a turn is face down again after a resume. */
const MM = (() => {
  const PAIRS = { A: L => (L <= 6 ? 3 : 4), B: () => 6, C: () => 8, D: () => 10 };
  const GRACE = { A: 0, B: 1, C: 2, D: 3 };
  const KINDS = { A: ['pic', 'pic', 'abc'], B: ['dots', 'word', 'dots10'], C: ['frac', 'es', 'syn'], D: ['eqf', 'fdp', 'root'] };
  const ASK = {
    pic: 'Find two pictures that are the same.', abc: 'Match each big letter to its small letter.', dots: 'Match each number to its dots.',
    dots10: 'Match each number to its dots.', word: 'Match each word to its picture.', frac: 'Match each fraction to its picture.',
    es: 'Match each Spanish word to its English word.', syn: 'Match the two words that mean the same.',
    eqf: 'Match the fractions that are equal.', fdp: 'Match the numbers that are worth the same.', root: 'Match each word root to its meaning.',
  };
  const LETTERS = 'ABDEFGHJKMNQRTY'; // letters whose two forms are easy to tell from other letters (no I and l, no C/c O/o S/s ...)
  const tier = L => (L <= 4 ? 0 : L <= 8 ? 1 : 2);
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const pics = () => (typeof RIDDLES != 'undefined' && RIDDLES.pics) || {};
  const nameOf = w => ((typeof RIDDLES != 'undefined' && RIDDLES.names) || {})[w] || w;

  function shuffle(a, rnd) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const take = (a, n, rnd) => shuffle(a.slice(), rnd).slice(0, n);
  // reduced fractions n/d with d in ds, 0 < n < d (all different values)
  const fracs = ds => ds.flatMap(d => Array.from({ length: d - 1 }, (_, i) => [i + 1, d]).filter(([n]) => gcd(n, d) == 1));
  const dec = v => String(Math.round(v * 1000) / 1000);
  const FDP = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [9, 10]];

  // the pairs of a kind: [[face, face], ...]; a face is {t: kind of face, ...}
  function pairsOf(kind, n, rnd) {
    if (kind == 'pic') {
      const th = MEMW.themes, keys = Object.keys(th), w = take(th[keys[Math.floor(rnd() * keys.length)]], n, rnd);
      return w.map(x => [{ t: 'pic', w: x }, { t: 'pic', w: x }]);
    }
    if (kind == 'abc') return take(LETTERS.split(''), n, rnd).map(c => [{ t: 'let', s: c }, { t: 'let', s: c.toLowerCase() }]);
    if (kind == 'dots' || kind == 'dots10') {
      const top = kind == 'dots' ? 6 : 10, ns = Array.from({ length: top }, (_, i) => i + 1);
      return take(kind == 'dots' ? ns : ns.slice(3), n, rnd).map(v => [{ t: 'num', s: String(v) }, { t: 'dots', n: v }]);
    }
    if (kind == 'word') {
      const all = [].concat(...Object.values(MEMW.themes)).filter(x => nameOf(x).length <= 5 && /^[a-z]+$/.test(nameOf(x)));
      return take(all, n, rnd).map(x => [{ t: 'txt', s: nameOf(x) }, { t: 'pic', w: x }]);
    }
    if (kind == 'frac') return take(fracs([2, 3, 4, 5, 6, 8]), n, rnd).map(([a, b]) => [{ t: 'fr', n: a, d: b }, { t: 'fpic', n: a, d: b }]);
    if (kind == 'es') {
      const all = SPN.animal.concat(SPN.food).filter(x => x[1].length <= 9);
      return take(all, n, rnd).map(x => [{ t: 'txt', s: x[0], es: 1 }, { t: 'txt', s: x[1] }]);
    }
    if (kind == 'syn') return take(MEMW.syn, n, rnd).map(([a, b]) => [{ t: 'txt', s: a }, { t: 'txt', s: b }]);
    if (kind == 'eqf') {
      return take(fracs([2, 3, 4, 5, 6]), n, rnd).map(([a, b]) => {
        const k1 = 1 + Math.floor(rnd() * 2), k2 = k1 + 1 + Math.floor(rnd() * 2); // 1-2, then 1-2 more
        return [{ t: 'fr', n: a * k1, d: b * k1 }, { t: 'fr', n: a * k2, d: b * k2 }];
      });
    }
    if (kind == 'fdp') {
      return take(FDP, n, rnd).map(([a, b]) => {
        const f = [{ t: 'fr', n: a, d: b }, { t: 'dec', s: dec(a / b) }, { t: 'pct', s: dec(100 * a / b) + '%' }];
        const skip = Math.floor(rnd() * 3); // two of the three forms
        return f.filter((_, i) => i != skip);
      });
    }
    if (kind == 'root') return take(MEMW.roots, n, rnd).map(([a, b]) => [{ t: 'txt', s: a, root: 1 }, { t: 'txt', s: b }]);
    throw new Error('memory: no kind ' + kind);
  }

  function make(band, level, rnd) {
    const L = Math.max(1, Math.min(12, level | 0 || 1)), n = PAIRS[band](L), kind = KINDS[band][tier(L)];
    const faces = pairsOf(kind, n, rnd);
    const cards = shuffle(faces.flatMap((_, k) => [[k, 0], [k, 1]]), rnd);
    return { band, kind, n, faces, cards };
  }
  // the winning moves: the two places of each pair, pair by pair
  const solve = p => p.faces.map((_, k) => p.cards.map((c, i) => (c[0] == k ? i : -1)).filter(i => i >= 0));
  const pairOf = (p, i) => p.cards[i][0];
  const partner = (p, i) => p.cards.findIndex((c, j) => j != i && c[0] == p.cards[i][0]);

  /* ---------- the rules (pure; the screen and the tests use the same functions) ---------- */
  const fresh = () => ({ m: [], hm: [], seen: [], up: [], turns: 0, slips: 0 });
  // tap card i. Returns {s: the new state, ev: 'none' | 'first' | 'match' | 'miss', slip}. A miss leaves both cards in s.up;
  // settle() turns them back (the screen does that after a moment or at the next tap).
  function pick(p, s0, i) {
    const s = JSON.parse(JSON.stringify(s0));
    if (s.up.length == 2) s.up = [];
    if (!(i >= 0 && i < p.cards.length) || s.m.includes(i) || s.up.includes(i)) return { s, ev: 'none', slip: false };
    if (!s.up.length) {
      s.up = [i];
      if (!s.seen.includes(i)) s.seen.push(i);
      return { s, ev: 'first', slip: false };
    }
    const a = s.up[0];
    s.turns++;
    if (pairOf(p, a) == pairOf(p, i)) {
      s.m.push(a, i);
      s.up = [];
      if (!s.seen.includes(i)) s.seen.push(i);
      return { s, ev: 'match', slip: false };
    }
    const slip = s.seen.includes(partner(p, a)) || s.seen.includes(i);
    if (slip) s.slips++;
    s.up = [a, i];
    if (!s.seen.includes(i)) s.seen.push(i);
    return { s, ev: 'miss', slip };
  }
  const settle = s0 => Object.assign(JSON.parse(JSON.stringify(s0)), { up: [] });
  const done = (p, s) => s.m.length == p.cards.length;
  // the pair a hint is about: the pair of the card that is up, else a pair with one card seen, else the first open pair
  function hintPair(p, s) {
    const open = p.cards.map((_, i) => i).filter(i => !s.m.includes(i));
    if (!open.length) return -1;
    if (s.up.length == 1) return pairOf(p, s.up[0]);
    const half = open.find(i => s.seen.includes(i) && !s.seen.includes(partner(p, i)));
    return pairOf(p, half != null ? half : open[0]);
  }
  // hint tier t: {s, show: [card places to show for a moment], match: [places matched by the hint]} or null when nothing is left
  function hint(p, s0, t) {
    const s = settle(s0);
    if (s0.up.length == 1) s.up = s0.up.slice();
    const k = hintPair(p, s);
    if (k < 0) return null;
    const both = p.cards.map((c, i) => (c[0] == k ? i : -1)).filter(i => i >= 0);
    if (t == 1) {
      const one = both.find(i => !s.up.includes(i) && !s.seen.includes(i));
      const show = [one != null ? one : both.find(i => !s.up.includes(i))];
      show.forEach(i => { if (!s.seen.includes(i)) s.seen.push(i); });
      return { s, show, match: [] };
    }
    both.forEach(i => { if (!s.seen.includes(i)) s.seen.push(i); });
    if (t == 2) return { s, show: both.filter(i => !s.up.includes(i)), match: [] };
    s.m.push(...both);
    s.hm.push(...both);
    s.up = [];
    return { s, show: [], match: both };
  }
  // does a saved state belong to this puzzle?
  function fit(p, s) {
    if (!s || typeof s != 'object' || Array.isArray(s)) return false;
    const n = p.cards.length, places = a => Array.isArray(a) && a.every(i => Number.isInteger(i) && i >= 0 && i < n) && new Set(a).size == a.length;
    if (!places(s.m) || !places(s.hm) || !places(s.seen) || !places(s.up || [])) return false;
    if (!Number.isInteger(s.turns) || s.turns < 0 || !Number.isInteger(s.slips) || s.slips < 0 || s.slips > s.turns) return false;
    if (s.m.some(i => !s.m.includes(partner(p, i))) || s.hm.some(i => !s.m.includes(i)) || s.m.some(i => !s.seen.includes(i))) return false;
    return (s.m.length - s.hm.length) / 2 <= s.turns;
  }
  const mistakes = (p, s) => Math.max(0, s.slips - GRACE[p.band]);

  /* ---------- drawing ---------- */
  const frac = (n, d) => `<span class="mm-fr"><b>${n}</b><b>${d}</b></span>`;
  function faceHTML(f) {
    if (f.t == 'pic') return `<span class="mm-pic">${picFor(f.w, pics()[f.w] || '')}</span>`;
    if (f.t == 'let') return `<b class="mm-let">${esc(f.s)}</b>`;
    if (f.t == 'num') return `<b class="mm-num">${esc(f.s)}</b>`;
    if (f.t == 'dots') return `<span class="mm-viz">${VIZ.dots(f.n, 'dice')}</span>`;
    if (f.t == 'fpic') return `<span class="mm-viz">${VIZ.fracCircle(f.n, f.d)}</span>`;
    if (f.t == 'fr') return frac(f.n, f.d);
    if (f.t == 'dec' || f.t == 'pct') return `<b class="mm-num">${esc(f.s)}</b>`;
    const len = f.s.length;
    return `<span class="mm-txt${f.es ? ' mm-es' : ''}${f.root ? ' mm-root' : ''}${len > 6 ? ' long' : ''}"${f.es ? ' lang="es"' : ''}>${esc(f.s)}</span>`;
  }
  // what a face-up card is called (for its aria-label)
  function faceName(f) {
    if (f.t == 'pic') return nameOf(f.w);
    if (f.t == 'dots') return f.n + (f.n == 1 ? ' dot' : ' dots');
    if (f.t == 'fpic') return 'a circle with ' + f.n + ' of ' + f.d + ' parts shaded';
    if (f.t == 'fr') return f.n + ' over ' + f.d;
    if (f.t == 'let') return (f.s == f.s.toUpperCase() ? 'big ' : 'small ') + f.s;
    return f.s;
  }
  const back = () => `<span class="mm-back" aria-hidden="true"><i></i>${ico('star', 26)}</span>`;

  // the cards per row and the card size that fit w x h; ratio = height / width (4:5 cards, square ones on a wide, short screen)
  function fitGrid(n, w, h, gap, ratio = 1.25) {
    let best = { cols: 1, cw: 0 };
    for (let cols = 2; cols <= Math.min(n, 8); cols++) {
      const rows = Math.ceil(n / cols), cw = Math.min((w - (cols - 1) * gap) / cols, ((h - (rows - 1) * gap) / rows) / ratio);
      // prefer an even grid (no short last row) when it costs less than 8 percent of the card size
      const even = n % cols == 0 ? 1.08 : 1;
      if (cw * even > best.cw * (best.even || 1)) best = { cols, cw, even };
    }
    return { cols: best.cols, cw: Math.max(40, Math.floor(Math.min(best.cw, 150))) };
  }

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState();
    st = fit(p, st) ? Object.assign(st, { up: [] }) : fresh();
    let alive = true, back_ = 0, lastW = 0, lastH = 0, peekT = 0, winT = 0;
    const band = api.band || p.band, timers = new Set();
    const later = (f, ms) => { const t = setTimeout(() => { timers.delete(t); if (alive) f(); }, ms); timers.add(t); return t; };
    const SHOW = band == 'A' ? 1500 : 1100; // how long two cards that do not match stay up
    el.innerHTML = `<div class="mm mm-${band}"><div class="mm-say"><p class="mm-msg" role="status" aria-live="polite"></p>` +
      `${UI.ibtn('speak', 'Hear what to do', { size: 'sm', cls: 'mm-spk' })}</div>` +
      `<div class="mm-bar"><span class="mm-got" role="img"></span><span class="mm-turns"></span></div>` +
      `<div class="mm-area"><div class="mm-grid" role="group" aria-label="Cards">` +
      p.cards.map((_, i) => `<button class="mm-c" data-i="${i}" aria-label="Card ${i + 1}, face down"><span class="mm-in">${back()}<span class="mm-face"></span></span></button>`).join('') +
      `</div></div></div>`;
    const root = el.firstChild, grid = root.querySelector('.mm-grid'), area = root.querySelector('.mm-area'), cardEl = [...grid.children];
    const msgEl = root.querySelector('.mm-msg');
    const msg = (t, cls) => { msgEl.textContent = t; msgEl.className = 'mm-msg' + (cls ? ' ' + cls : ''); };
    root.querySelector('.mm-spk').onclick = () => api.say(ASK[p.kind]);
    function layout() {
      if (!el.isConnected) return;
      const ps = getComputedStyle(el);
      const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
      root.style.height = Math.max(300, ah) + 'px';
      const w = area.clientWidth, h = area.clientHeight;
      lastW = el.clientWidth; lastH = el.clientHeight;
      const ratio = w > h * 1.6 ? 1 : 1.25, g = fitGrid(p.cards.length, w, h, w < 520 ? 8 : 12, ratio);
      grid.style.setProperty('--cols', g.cols);
      grid.style.setProperty('--cw', g.cw + 'px');
      grid.style.setProperty('--ch', Math.floor(g.cw * ratio) + 'px');
      grid.style.setProperty('--gap', (w < 520 ? 8 : 12) + 'px');
    }
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { if (el.clientWidth != lastW || el.clientHeight != lastH) layout(); }, 120); };
    window.addEventListener('resize', onResize);
    // turn a card up or down (its face is put in only while it is up, and taken out once it has turned back)
    function show(i, up, cls) {
      const c = cardEl[i], f = p.faces[p.cards[i][0]][p.cards[i][1]], fe = c.querySelector('.mm-face');
      if (up) {
        if (!c.classList.contains('up')) fe.innerHTML = faceHTML(f);
        c.classList.add('up');
        c.setAttribute('aria-label', faceName(f));
      } else {
        c.classList.remove('up', 'no', 'peek');
        c.setAttribute('aria-label', `Card ${i + 1}, face down`);
        later(() => { if (!c.classList.contains('up')) fe.innerHTML = ''; }, 400);
      }
      if (cls) c.classList.add(cls);
    }
    function bar() {
      const got = st.m.length / 2;
      const b = root.querySelector('.mm-got');
      b.innerHTML = p.faces.map((_, k) => `<i class="${k < got ? 'on' : ''}"></i>`).join('');
      b.setAttribute('aria-label', `${got} of ${p.n} pairs found`);
      root.querySelector('.mm-turns').textContent = st.turns == 1 ? '1 turn' : st.turns + ' turns';
    }
    function paint() { // the whole board from the state (mount, resume)
      cardEl.forEach((c, i) => {
        const m = st.m.includes(i);
        if (m) show(i, true, st.hm.includes(i) ? 'hint' : 'got'); else show(i, false);
        c.disabled = m;
      });
      bar();
    }
    function flipBack() {
      clearTimeout(back_);
      back_ = 0;
      if (st.up.length == 2) st.up.forEach(i => show(i, false));
      st = settle(st);
    }
    function tap(i) {
      if (!alive || st.m.includes(i) || winT) return;
      if (st.up.length == 2) flipBack();
      if (peekT) endPeek();
      const r = pick(p, st, i);
      if (r.ev == 'none') return;
      st = r.s;
      show(i, true);
      api.sfx.click();
      if (r.ev == 'first') {
        api.saveState(Object.assign({}, st, { up: [] }));
        return msg(band == 'A' ? 'Now find its partner!' : 'Now find the one that goes with it.', '');
      }
      if (r.ev == 'match') {
        const [a, b] = st.m.slice(-2);
        [a, b].forEach(x => { cardEl[x].classList.add('got'); cardEl[x].disabled = true; });
        api.sfx.right(st.m.length / 2 + 2);
        msg(done(p, st) ? 'You found them all!' : pick1([['A pair!', 'They match!', 'Well done!', 'Great memory!'], st.turns]), 'good');
      } else {
        st.up.forEach(x => cardEl[x].classList.add('no'));
        api.sfx.del();
        msg(r.slip ? 'Not a pair. You have seen one of these before!' : 'Not a pair. Remember where they are.', 'try');
        back_ = later(flipBack, SHOW);
      }
      api.saveState(Object.assign({}, st, { up: [] }));
      bar();
      if (done(p, st)) finish();
    }
    const pick1 = ([a, n]) => a[n % a.length];
    function finish() {
      const note = [`You found ${p.n} pairs in ${st.turns} ${st.turns == 1 ? 'turn' : 'turns'}.`];
      if (!['pic', 'abc', 'dots', 'dots10', 'word', 'frac'].includes(p.kind)) {
        p.faces.slice(0, 3).forEach(f => note.push(faceName(f[0]).replace(' over ', '/') + ' = ' + faceName(f[1]).replace(' over ', '/')));
      }
      winT = later(() => api.win({ mistakes: mistakes(p, st), note }), 500);
    }
    function endPeek() {
      clearTimeout(peekT);
      peekT = 0;
      cardEl.forEach((c, i) => { if (c.classList.contains('peek') && !st.m.includes(i) && !st.up.includes(i)) show(i, false); });
    }
    cardEl.forEach((c, i) => { c.onclick = () => tap(i); });
    layout();
    paint();
    msg(ASK[p.kind], '');
    if (band == 'A') api.say(ASK[p.kind]);
    return {
      hint(t) {
        if (!alive || winT || done(p, st)) return false;
        if (st.up.length == 2) flipBack();
        if (peekT) endPeek();
        const r = hint(p, st, Math.min(3, t || 1));
        if (!r) return false;
        st = r.s;
        if (r.match.length) {
          r.match.forEach(i => { show(i, true, 'hint'); cardEl[i].disabled = true; });
          api.sfx.right(st.m.length / 2 + 2);
          msg('Here is a pair for you.', 'hint');
        } else {
          r.show.forEach(i => show(i, true, 'peek'));
          msg(r.show.length == 1 ? 'Peek! Remember where it is.' : 'Here is a pair. Remember where they are!', 'hint');
          peekT = later(() => { peekT = 0; endPeek(); }, band == 'A' ? 2200 : 1700);
        }
        api.say(msgEl.textContent);
        api.saveState(Object.assign({}, st, { up: [] }));
        bar();
        if (done(p, st)) finish();
        return true;
      },
      destroy() {
        alive = false;
        timers.forEach(clearTimeout);
        timers.clear();
        clearTimeout(rz);
        window.removeEventListener('resize', onResize);
      },
    };
  }

  return { make, solve, mount, fresh, pick, settle, done, hint, hintPair, fit, mistakes, partner, faceName, faceHTML, fitGrid, PAIRS, GRACE, KINDS };
})();

BT.reg({
  id: 'memory', name: 'Memory', icon: 'memory', bands: 'ABCD', allow: 1,
  rules: 'Turn over two cards at a time. Find all the pairs.',
  make: MM.make, mount: MM.mount, solve: MM.solve,
});
