/* ---------- Brain Teasers: Unscramble (P3-15; BRAIN_TEASERS.md 5.10, 7, 8) ----------
   One registered type, `scramble`, bands B C D. The letters of a word are mixed up on tiles; the child taps them into order.
     B (1-2)  a picture (picture words of 20-words.js that have a drawing): 3 words of 3 letters (levels 1-4), 3 of 4 (5-8), 4 of 4
     C (3-4)  a sentence with a gap (spelling levels 4-5, d-spell.js): 3 words of 5 letters, 4 of 5-6, 4 of 6
     D (5-6)  a sentence with a gap (spelling levels 6-7): 3 words of 7 letters, 4 of 7-8, 4 of 8-9
   One answer: a word is used only when no other real word has the same letters (the app's word lists and BTW.more, d-words-bt.js;
   tools/test.js checks against every word in the app's lists). The tiles never start in the word's order, never spell another
   word or a rude run, and in a word of 4 or more letters at least half the letters start out of place.
   Play: tap a tile and it goes to the first empty box; tap a box to send its tile back. When every box is full the word is checked:
   right, it turns green and is spoken; wrong, one mistake (allow 2): the letters in the wrong boxes go back and the right ones stay.
   Hints, per word (5.10: hint 2 places the first letter): 1 names the first and last letters (band B also says the word), 2 puts
   the first letter in its box, 3 puts the next letter in, and each press after that the next one, so a child can always finish.
   Letters a hint placed stay put (they are marked with a star-yellow edge).
   State (api.saveState): {i: word, sl: the tile in each box or -1, lk: boxes a hint filled, miss, h: hint tier of this word};
   US.fit rejects a state that does not belong to the puzzle. */
const US = (() => {
  // per band, levels 1-4 / 5-8 / 9-12: [words, shortest, longest]
  const TIER = {
    B: [[3, 3, 3], [3, 4, 4], [4, 4, 4]],
    C: [[3, 5, 5], [4, 5, 6], [4, 6, 6]],
    D: [[3, 7, 7], [4, 7, 8], [4, 8, 9]],
  };
  const SRC = { C: [4, 5], D: [6, 7] }; // spelling levels
  const tierOf = level => Math.min(2, Math.floor((Math.max(1, Math.min(12, level | 0 || 1)) - 1) / 4));
  const key = w => [...w].sort().join('');
  let dictK = null;
  const cache = {};
  // letters (sorted) -> the real words the app knows with those letters
  function dict() {
    if (dictK) return dictK;
    const all = BTW.more.split(' ');
    for (const lv in SPELL_WORDS) for (const ln of SPELL_WORDS[lv].split('\n')) all.push(ln.split('|')[0]);
    for (const l of DOL) all.push(...l);
    for (const L of [CVC, BLEND, MAGICE, TEAMS, DIGR, RVW, VTW, SYLP]) for (const x of L) all.push(x[0]);
    for (const l of SYLW) all.push(...l);
    dictK = {};
    for (const w of all) if (/^[a-z]+$/.test(w)) (dictK[key(w)] = dictK[key(w)] || new Set()).add(w);
    return dictK;
  }
  const alone = w => dict()[key(w)].size == 1;
  const rudeIn = s => BTW.rude.split(' ').some(r => s.includes(r));
  // the words a band can use: {w, c: the clue sentence with a gap (C, D)}
  function pool(band) {
    if (cache[band]) return cache[band];
    const lo = TIER[band][0][1], hi = TIER[band][2][2], out = [], seen = new Set(), add = (w, c) => {
      if (!/^[a-z]+$/.test(w) || w.length < lo || w.length > hi || seen.has(w) || BAD.test(w)) return;
      seen.add(w);
      if (dict()[key(w)] && alone(w)) out.push(c ? { w, c } : { w });
    };
    if (band == 'B') {
      for (const L of [CVC, BLEND, MAGICE, TEAMS, DIGR, RVW, VTW]) for (const x of L) if (ART[x[0]]) add(x[0]);
    } else {
      for (const lv of SRC[band]) for (const ln of SPELL_WORDS[lv].split('\n')) {
        const [w, s] = ln.split('|'), re = new RegExp('\\b' + w + '\\b', 'i');
        if (s && re.test(s)) add(w, s.replace(re, '___'));
      }
    }
    return cache[band] = out;
  }
  // mix the letters: never the word itself, never another word, no rude run; 4+ letters: at least half out of place
  function mix(w, rnd) {
    const a = [...w];
    for (let t = 0; t < 400; t++) {
      for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
      const s = a.join(''), moved = a.filter((ch, i) => ch != w[i]).length;
      if (s != w && !dict()[key(w)].has(s) && !rudeIn(s) && (w.length < 4 || moved * 2 >= w.length)) return s;
    }
    throw new Error('unscramble: cannot mix ' + w);
  }
  function make(band, level, rnd) {
    const [k, lo, hi] = TIER[band][tierOf(level)];
    const cand = pool(band).filter(x => x.w.length >= lo && x.w.length <= hi);
    for (let i = cand.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [cand[i], cand[j]] = [cand[j], cand[i]]; }
    // a spread of lengths when the tier allows two (the longer ones last)
    const pick = cand.slice(0, k).sort((x, y) => x.w.length - y.w.length);
    return { b: band, items: pick.map(x => Object.assign({ s: mix(x.w, rnd) }, x)) };
  }
  // the tiles in order for every word (indexes into the scrambled letters): what the smoke bot taps
  function order(it) {
    const used = [];
    return [...it.w].map(ch => { const t = [...it.s].findIndex((c, j) => c == ch && !used.includes(j)); used.push(t); return t; });
  }
  const solve = p => p.items.map(order);
  const fresh = p => ({ i: 0, sl: Array(p.items[0].w.length).fill(-1), lk: 0, miss: 0, h: 0 });
  function fit(p, s) {
    if (!s || typeof s != 'object' || Array.isArray(s)) return false;
    const int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
    if (!int(s.i, 0, p.items.length - 1) || !int(s.miss, 0, 999) || !int(s.h, 0, 3)) return false;
    const it = p.items[s.i], L = it.w.length;
    if (!Array.isArray(s.sl) || s.sl.length != L || !int(s.lk, 0, L - 1)) return false;
    const t = s.sl.filter(x => x >= 0);
    if (!s.sl.every(x => int(x, -1, L - 1)) || new Set(t).size != t.length || t.length == L) return false;
    for (let k = 0; k < s.lk; k++) if (s.sl[k] < 0 || it.s[s.sl[k]] != it.w[k]) return false;
    return true;
  }
  // put tile t in box k (a hint): whatever sat in box k goes back, t leaves the box it was in
  function placeAt(s, k, t) {
    const was = s.sl.indexOf(t);
    if (was >= 0) s.sl[was] = -1;
    s.sl[k] = t;
  }
  // the tile a hint puts in box k: one with the right letter, preferably still in the tray (never one a hint locked)
  function hintTile(it, s, k) {
    const ok = [...it.s].map((c, j) => j).filter(j => it.s[j] == it.w[k] && !(s.sl.indexOf(j) >= 0 && s.sl.indexOf(j) < s.lk));
    const free = ok.filter(j => s.sl.indexOf(j) < 0);
    return (free.length ? free : ok)[0];
  }
  // check a full row: 'ok', or the boxes whose letters are wrong
  function check(it, s) {
    const got = s.sl.map(t => it.s[t]).join('');
    return got == it.w ? 'ok' : s.sl.map((t, k) => it.s[t] != it.w[k] ? k : -1).filter(k => k >= 0);
  }
  const cap = ch => ch.toUpperCase();
  function hintText(p, s, t) {
    const it = p.items[s.i], f = cap(it.w[0]), l = cap(it.w[it.w.length - 1]);
    if (t == 1) return (p.b == 'B' ? `Say it slowly: ${it.w}. ` : '') + `It starts with ${f} and ends with ${l}.`;
    if (t == 2) return `${f} goes first.`;
    return 'Here is the next letter.';
  }
  const ASK = { B: 'Put the letters in order to spell the picture.', C: 'Put the letters in order to make the missing word.', D: 'Put the letters in order to make the missing word.' };

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState();
    if (!fit(p, st)) st = fresh(p);
    let alive = true, msg = '', mk = '', done = false, busy = false, tmo = 0;
    const say = (t, kind, speak) => {
      msg = t;
      mk = kind || '';
      const m = el.querySelector('.us-msg');
      if (m) { m.textContent = t; m.className = 'us-msg' + (mk ? ' ' + mk : ''); }
      if (speak) api.say(t);
    };
    const it = () => p.items[st.i];
    const clueTxt = () => p.b == 'B' ? ASK.B : it().c.replace('___', 'blank');
    function card() {
      const x = it(), dots = p.items.map((_, k) => `<i class="${k < st.i ? 'on' : k == st.i ? 'now' : ''}"></i>`).join('');
      const body = p.b == 'B' ? `<div class="us-pic">${picFor(x.w, '')}</div>` :
        `<p class="us-clue">${esc(x.c).replace('___', '<span class="us-gap" aria-label="blank"></span>')}</p>`;
      return `<div class="us-card"><div class="us-dots" aria-label="Word ${st.i + 1} of ${p.items.length}">${dots}</div>${body}` +
        `${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'us-spk' })}</div>`;
    }
    function boxes() {
      const x = it();
      return st.sl.map((t, k) => t < 0 ? `<button class="us-box" data-k="${k}" aria-label="Box ${k + 1}, empty"></button>` :
        `<button class="us-box full${k < st.lk ? ' lk' : ''}" data-k="${k}" aria-label="Box ${k + 1}: ${cap(x.s[t])}"${k < st.lk ? ' disabled' : ''}>` +
        `<span>${cap(x.s[t])}</span></button>`).join('');
    }
    function tiles() {
      const x = it();
      return [...x.s].map((ch, t) => st.sl.includes(t) ? `<span class="us-tile gone" aria-hidden="true"></span>` :
        `<button class="us-tile" data-t="${t}" aria-label="Letter ${cap(ch)}"><span>${cap(ch)}</span></button>`).join('');
    }
    function render() {
      const L = it().w.length;
      el.innerHTML = `<div class="us us-${p.b}${L > 6 ? ' long' : ''}" style="--len:${L}">${card()}<p class="us-msg" aria-live="polite"></p>` +
        `<div class="us-row us-boxes" role="group" aria-label="Your word">${boxes()}</div>` +
        `<div class="us-row us-tray" role="group" aria-label="Letters">${tiles()}</div></div>`;
      el.querySelector('.us-spk').onclick = () => api.say(p.b == 'B' ? msg : clueTxt());
      el.querySelectorAll('.us-tile[data-t]').forEach(b => b.onclick = () => tapTile(+b.dataset.t));
      el.querySelectorAll('.us-box.full:not(.lk)').forEach(b => b.onclick = () => tapBox(+b.dataset.k));
      say(msg || ASK[p.b], mk);
      fitRows();
    }
    // as many tiles in a row as fit, the rows balanced (8 letters on a phone: 4 and 4, not 6 and 2)
    function fitRows() {
      const u = el.querySelector('.us'), m = el.querySelector('.us-msg');
      if (!u || !m.clientWidth) return;
      const ts = parseFloat(getComputedStyle(u).getPropertyValue('--ts')) || 56, L = it().w.length;
      const fit = Math.max(1, Math.floor((m.clientWidth - 20 + 8) / (ts + 8))), rows = Math.ceil(L / fit);
      u.style.setProperty('--cols', Math.ceil(L / rows));
    }
    const onResize = () => { if (alive) fitRows(); };
    addEventListener('resize', onResize);
    function tapTile(t) {
      if (!alive || done || busy || st.sl.includes(t)) return;
      const k = st.sl.indexOf(-1);
      if (k < 0) return;
      st.sl[k] = t;
      SFX.key(1 + (k % 8));
      after();
    }
    function tapBox(k) {
      if (!alive || done || busy || k < st.lk || st.sl[k] < 0) return;
      st.sl[k] = -1;
      api.sfx.click();
      api.saveState(st);
      render();
    }
    // after a tile goes in: a full row is checked
    function after() {
      if (st.sl.includes(-1)) { api.saveState(st); return render(); }
      const r = check(it(), st);
      if (r == 'ok') return solved();
      st.miss++;
      api.sfx.wrong();
      busy = true;
      render(); // the full row, its wrong boxes shaking, for a moment
      el.querySelectorAll('.us-box').forEach(b => { b.disabled = true; if (r.includes(+b.dataset.k)) b.classList.add('no'); });
      say(r.length == st.sl.length - st.lk ? 'Not quite. Try another order!' : 'Not quite. The letters that fit stay in their boxes.', 'try');
      r.forEach(k => { st.sl[k] = -1; }); // saved at once, so leaving mid-shake resumes with them back in the tray
      api.saveState(st);
      tmo = setTimeout(() => { busy = false; if (alive) render(); }, 700);
    }
    function solved() {
      const x = it();
      busy = true;
      render();
      el.querySelector('.us-boxes').classList.add('ok');
      el.querySelectorAll('.us-box').forEach(b => { b.disabled = true; });
      api.sfx.right();
      say(`Yes! ${x.w.toUpperCase()}`, 'good');
      api.say(x.w);
      if (st.i == p.items.length - 1) {
        done = true;
        api.win({ mistakes: st.miss, note: [p.items.map(y => y.w).join(', ')] });
        return;
      }
      st.i++;
      st.sl = Array(it().w.length).fill(-1);
      st.lk = 0;
      st.h = 0;
      api.saveState(st);
      tmo = setTimeout(() => {
        busy = false;
        if (!alive) return;
        msg = '';
        mk = '';
        render();
      }, 1100);
    }
    if (st.h) { msg = hintText(p, st, st.h); mk = 'hint'; }
    render();
    if (api.band == 'B' && st.i == 0 && !st.sl.some(t => t >= 0) && !st.h) api.say(ASK.B);
    return {
      hint() {
        if (done || !alive || busy) return false;
        const t = Math.min(3, st.h + 1), x = it();
        if (t == 1) {
          st.h = 1;
          api.saveState(st);
          say(hintText(p, st, 1), 'hint', true);
          return true;
        }
        const k = st.lk;
        if (k >= x.w.length) return false;
        placeAt(st, k, hintTile(x, st, k));
        st.lk = k + 1;
        st.h = t;
        say(hintText(p, st, t), 'hint', true);
        if (!st.sl.includes(-1) && check(x, st) == 'ok') { solved(); return true; }
        if (!st.sl.includes(-1)) { // full but wrong: the boxes after the hint go back
          for (let j = st.lk; j < st.sl.length; j++) if (x.s[st.sl[j]] != x.w[j]) st.sl[j] = -1;
        }
        api.saveState(st);
        render();
        return true;
      },
      destroy() { alive = false; clearTimeout(tmo); removeEventListener('resize', onResize); },
    };
  }

  return { make, solve, mount, fit, fresh, pool, dict, mix, order, check, placeAt, hintTile, hintText, TIER, SRC, tierOf, key };
})();

BT.reg({
  id: 'scramble', name: 'Unscramble', icon: 'scramble', bands: 'BCD', allow: 2,
  rules: 'Tap the letters in order to spell the word.',
  make: US.make, mount: US.mount, solve: US.solve,
});
