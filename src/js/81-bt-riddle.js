/* ---------- Brain Teasers: Riddles (P3-14; BRAIN_TEASERS.md 5.9, 7) ----------
   One registered type, `riddle`. The bank is RIDDLES in src/data/d-riddles.js (A11: read only inside functions), 36 riddles per band,
   easiest first. A puzzle is 3 riddles: level L plays bank riddles 3(L-1) to 3L-1, so the band's whole set is used before any riddle
   comes back (Endless replays levels 9-12, as the framework does). The seeded rnd shuffles the choices.
     A (PK-K)  "Who am I?" with 3 picture choices (picFor); the riddle is read aloud by itself, nothing needs reading
     B (1-2)   simple riddles, 4 choices, each a picture with its word
     C (3-4)   wordplay, 4 word choices          D (5-6)  lateral thinking and number riddles, 4 choices
   Every riddle has one clear answer; the wrong choices are not also fair answers (tools/test.js checks what it can: the answer is not
   in the riddle or its hints, choices are all different, reading length per band, BAD, pictures allow-listed).
   Play: tap a choice. A wrong choice turns amber, stays out and counts one mistake (allow 1: one slip still earns 3 stars); the line
   under the riddle says so gently. The right one turns green, the line says the answer, and the next riddle comes after a moment.
   Hints (per riddle; the frame counts the tiers): 1 a nudge, 2 a strong clue (both shown in the yellow hint line and spoken),
   3 takes away the wrong choices but one. After that the riddle has no more hints (hint() returns false).
   State (api.saveState): {i riddle, miss, h hint tier of this riddle, x wrong taps, g choices a hint took away}; RDL.fit rejects a
   state that does not belong to the puzzle (it then starts fresh). */
const RDL = (() => {
  const N = 3, NCH = { A: 3, B: 4, C: 4, D: 4 };
  const THE = ['sun', 'moon'], NONE = ['cheese', 'bread', 'milk'];
  const pic = w => picFor(w, (RIDDLES.pics || {})[w] || '');
  const nameOf = w => (RIDDLES.names || {})[w] || w;
  const art = w => THE.includes(w) ? 'the ' : NONE.includes(w) ? '' : /^[aeiou]/.test(nameOf(w)) ? 'an ' : 'a ';
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  // the answer said in words: "a cow", "an egg", "the sun", "a piano", "63"
  const said = (p, c) => p.pic ? art(c) + nameOf(c) : c;
  const ASK = { A: 'Listen to the riddle. Tap the answer.', B: 'Read the riddle. Tap the answer.' };

  function shuffle(a, rnd) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // level L of a band: its three bank riddles, each with its choices shuffled
  function make(band, level, rnd) {
    const bank = RIDDLES[band], L = Math.max(1, Math.min(12, level | 0 || 1)), items = [];
    for (let j = 0; j < N; j++) {
      const k = (N * (L - 1) + j) % bank.length, r = bank[k];
      const ch = shuffle([r.a].concat(r.d.slice(0, NCH[band] - 1)), rnd);
      items.push({ k, q: r.q, ch, a: ch.indexOf(r.a), h: r.h.slice(0, 2) });
    }
    return { band, pic: band == 'A' || band == 'B', items };
  }
  const solve = p => p.items.map(it => it.a);

  const fresh = () => ({ i: 0, miss: 0, h: 0, x: [], g: [] });
  // does a saved state belong to this puzzle?
  function fit(p, s) {
    if (!s || typeof s != 'object' || Array.isArray(s)) return false;
    const n = p.items.length, int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
    if (!int(s.i, 0, n - 1) || !int(s.miss, 0, 999) || !int(s.h, 0, 3)) return false;
    if (!Array.isArray(s.x) || !Array.isArray(s.g)) return false;
    const it = p.items[s.i], all = s.x.concat(s.g);
    if (!all.every(c => int(c, 0, it.ch.length - 1) && c !== it.a) || new Set(all).size !== all.length) return false;
    if (s.g.length && s.h < 3) return false; // only hint 3 takes choices away
    return all.length <= it.ch.length - 1;
  }
  // hint tier t (1-3) of item it in state s: {text} for tiers 1 and 2, {take: [choice indexes]} for tier 3
  function hintFor(it, s, t) {
    if (t < 3) return { text: it.h[t - 1] };
    const left = it.ch.map((_, c) => c).filter(c => c !== it.a && !s.x.includes(c) && !s.g.includes(c));
    return { take: left.slice(0, Math.max(0, left.length - 1)) };
  }

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState();
    if (!fit(p, st)) st = fresh();
    let busy = 0, alive = true;
    const band = api.band || p.band;
    const face = c => p.pic ? `<span class="rd-pic">${pic(c)}</span>${band == 'B' ? `<span class="rd-w">${esc(nameOf(c))}</span>` : ''}` : `<span class="rd-t">${esc(c)}</span>`;
    function draw() {
      const it = p.items[st.i];
      const dots = p.items.map((_, i) => `<i class="${i < st.i ? 'on' : i == st.i ? 'now' : ''}"></i>`).join('');
      const chs = it.ch.map((c, i) => {
        const x = st.x.includes(i), g = st.g.includes(i);
        return `<button class="choice rd-ch${p.pic ? ' pic' : ''}${x ? ' wrong' : ''}${g ? ' off' : ''}" data-c="${i}" aria-label="${esc(p.pic ? nameOf(c) : c)}"` +
          `${x || g ? ' disabled' : ''}>${face(c)}</button>`;
      }).join('');
      const tip = st.h && st.h < 3 ? it.h[st.h - 1] : '';
      el.innerHTML = `<div class="rd rd-${band}"><div class="rd-card"><span class="rd-badge" aria-hidden="true">${ico('question', 30)}</span>` +
        `<div class="rd-body"><span class="rd-dots" role="img" aria-label="Riddle ${st.i + 1} of ${p.items.length}">${dots}</span>` +
        `<p class="rd-q">${esc(it.q)}</p></div>${UI.ibtn('speak', 'Hear the riddle', { size: 'sm', cls: 'rd-say' })}</div>` +
        `<p class="rd-tip" role="status"${tip ? '' : ' hidden'}>${ico('hint', 24)}<span>${esc(tip)}</span></p>` +
        `<p class="rd-msg" role="status" aria-live="polite"></p>` +
        `<div class="rd-chs n${it.ch.length}">${chs}</div></div>`;
      el.querySelector('.rd-say').onclick = () => api.say(it.q);
      el.querySelectorAll('.rd-ch').forEach(b => b.onclick = () => tap(+b.dataset.c, b));
      if (band == 'A') api.say(it.q);
    }
    const msg = (t, cls) => { const m = el.querySelector('.rd-msg'); if (m) { m.textContent = t; m.className = 'rd-msg' + (cls ? ' ' + cls : ''); } };
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
        msg(st.x.length == 1 ? 'Not that one. Think again!' : 'Not that one either. You can do it!', 'try');
        return;
      }
      b.classList.add('right');
      el.querySelectorAll('.rd-ch').forEach(x => { x.disabled = true; });
      const w = 'Yes! ' + cap(said(p, it.ch[it.a])) + '.';
      msg(w, 'good');
      api.sfx.right(st.i + 3);
      if (band == 'A' || band == 'B') api.say(w);
      const last = st.i == p.items.length - 1;
      st = { i: st.i + 1, miss: st.miss, h: 0, x: [], g: [] };
      if (last) {
        api.win({ mistakes: st.miss, note: p.items.map((t, n) => `Riddle ${n + 1}: ${said(p, t.ch[t.a])}`) });
        return;
      }
      api.saveState(st);
      busy = setTimeout(() => { busy = 0; if (alive) draw(); }, 1300);
    }
    draw();
    if (ASK[band] && st.i == 0 && !st.miss && !st.h) msg(ASK[band]);
    return {
      hint() {
        if (busy || st.i >= p.items.length || st.h >= 3) return false;
        const it = p.items[st.i], t = st.h + 1, r = hintFor(it, st, t);
        if (t < 3) {
          st.h = t;
          api.saveState(st);
          const tip = el.querySelector('.rd-tip');
          tip.querySelector('span').textContent = r.text;
          tip.hidden = false;
          api.say(r.text);
          return true;
        }
        if (!r.take.length) return false;
        st.h = 3;
        st.g.push(...r.take);
        api.saveState(st);
        r.take.forEach(c => { const b = el.querySelector(`.rd-ch[data-c="${c}"]`); b.classList.add('off'); b.disabled = true; });
        el.querySelector('.rd-tip').hidden = true;
        msg('Just two left. Which one is it?', '');
        return true;
      },
      destroy() { alive = false; clearTimeout(busy); },
    };
  }

  return { make, solve, mount, fit, fresh, hintFor, said, nameOf, NCH };
})();

BT.reg({
  id: 'riddle', name: 'Riddles', icon: 'riddle', bands: 'ABCD', allow: 1,
  rules: 'Listen to the riddle, then tap the answer.',
  make: RDL.make, mount: RDL.mount, solve: RDL.solve,
});
