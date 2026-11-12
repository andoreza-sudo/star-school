/* ---------- Brain Teasers: Copy Cat (P3-14; BRAIN_TEASERS.md 5.9, 7) ----------
   One registered type, `copycat`. The cat lights big pads one after the other, each with its own note (SFX.key); the child taps them
   back in the same order. Each round the sequence grows by one; the puzzle is won when the child copies the level's target length.
   Pads differ by shape, colour, place and sound (never colour alone): red circle, blue square, yellow triangle, green star, then
   purple heart and orange diamond.
     band  pads  start  target length, levels 1-4 / 5-8 / 9-12   light on + gap (ms, a little faster each level of a tier)
     A     4     1      3 / 4 / 4                                700 + 320
     B     4     2      4 / 5 / 5        (faster)                520 + 240
     C     6     2      5 / 5 / 6                                480 + 220
     D     6     3      6 / 4 / 5        levels 5-12 backwards   440 + 200
   R-01b: the targets stay within the typical span for the age plus about one, so the top levels are a stretch, not out of reach
   (spatial span norms, Gathercole, Pickering, Ambridge & Wearing 2004; Farrell Pagulayan et al. 2006; as quoted in the R-01 review:
   forward about 3-4 at age 5, about 5 at 8-9, 5-6 at 11; backward about 4-5 at 11). Pre-K/K top 4 (was 5), grades 1-2 top 5 (was 6),
   grades 3-4 top 6 (was 7), grades 5-6 forward 6 (was 7) and backward 4 then 5 (was 5 then 6). The sequence of a level is the
   same as before, only shorter (the first pads of the old one).
   (BRAIN_TEASERS 5.9 "star thresholds 4 / 6 / 8, scaled by band" became these target lengths: the frame's stars follow hints and
   mistakes, so the length is what a level asks for, and it grows with the band and the level, section 7 "steps".)
   The sequence is made once from the seeded rnd (same for a band, level and day): bands A and B never light the same pad twice in a
   row, C and D never three times. CC.expect(p, r) is what round r asks for (the first r pads, reversed in backwards mode) and
   CC.check(p, r, taps) says 'ok' (all of it), 'go' (right so far) or 'no'.
   A wrong pad: the pad rings amber, the line says "Oops! Watch again." with a soft sound, and the round is shown again a little
   slower (one mistake; allow 2). Hints (tier 1, 2, 3, then 3 again): 1 shows the round again, slower (the child starts the round
   again), 2 rings the next pad to tap, 3 taps the next pad for the child. Hints work while it is the child's turn.
   State (api.saveState after each round and each mistake): {r the round (its length), miss}; a resume shows that round again. */
const CC = (() => {
  const CFG = {
    A: { pads: 4, start: 1, len: [3, 4, 4], on: 700, gap: 320, rev: [0, 0, 0], run: 1 },
    B: { pads: 4, start: 2, len: [4, 5, 5], on: 520, gap: 240, rev: [0, 0, 0], run: 1 },
    C: { pads: 6, start: 2, len: [5, 5, 6], on: 480, gap: 220, rev: [0, 0, 0], run: 2 },
    D: { pads: 6, start: 3, len: [6, 4, 5], on: 440, gap: 200, rev: [0, 1, 1], run: 2 },
  };
  const NAMES = ['red circle', 'blue square', 'yellow triangle', 'green star', 'purple heart', 'orange diamond'];
  const TONE = { 4: [0, 2, 4, 7], 6: [0, 1, 2, 4, 5, 7] }; // SFX.key steps: C E G C, or C D E G A C
  const tier = L => (L <= 4 ? 0 : L <= 8 ? 1 : 2);

  function make(band, level, rnd) {
    const c = CFG[band], L = Math.max(1, Math.min(12, level | 0 || 1)), t = tier(L), len = c.len[t], seq = [];
    while (seq.length < len) {
      const v = Math.floor(rnd() * c.pads), n = seq.length;
      // no pad more than c.run times in a row
      if (n >= c.run && seq.slice(n - c.run).every(x => x == v)) continue;
      seq.push(v);
    }
    const fast = 15 * ((L - 1) % 4);
    return { band, pads: c.pads, start: Math.min(c.start, len), len, seq, rev: !!c.rev[t], on: c.on - fast, gap: c.gap - Math.round(fast / 3) };
  }
  // what round r asks for, and how a list of taps compares with it
  const expect = (p, r) => { const s = p.seq.slice(0, r); return p.rev ? s.reverse() : s; };
  function check(p, r, taps) {
    const e = expect(p, r);
    if (taps.length > e.length || taps.some((v, i) => v !== e[i])) return 'no';
    return taps.length == e.length ? 'ok' : 'go';
  }
  // every round's taps, from the first round to the target (tests and the smoke bot)
  const solve = p => { const out = []; for (let r = p.start; r <= p.len; r++) out.push(expect(p, r)); return out; };
  const fresh = p => ({ r: p.start, miss: 0 });
  const fit = (p, s) => !!s && typeof s == 'object' && !Array.isArray(s) && Number.isInteger(s.r) && s.r >= p.start && s.r <= p.len &&
    Number.isInteger(s.miss) && s.miss >= 0 && s.miss < 1000 && Object.keys(s).every(k => k == 'r' || k == 'miss');

  /* ---------- drawing: a shape on a pad, light from the top left (shadow, shade, base toward the light, gloss) ---------- */
  const f1 = x => Math.round(x * 10) / 10;
  const STAR = (() => {
    let d = '';
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 17 : 38;
      d += (i ? 'L' : 'M') + f1(r * Math.cos(a)) + ' ' + f1(r * Math.sin(a) + 3);
    }
    return d + 'Z';
  })();
  const SHAPES = [
    { d: 'M-34 0A34 34 0 1 1 34 0A34 34 0 1 1 -34 0Z', g: 'M-21 -14A24 24 0 0 1 -8 -24' },
    { d: 'M-29 -29H29V29H-29Z', g: 'M-20 -20H-6' },
    { d: 'M0 -33L35 29H-35Z', g: 'M-8 -12L-16 3' },
    { d: STAR, g: 'M-9 -9L-4 -21' },
    { d: 'M0 33C-44 6 -38 -31 -17 -31C-7 -31 -1 -24 0 -17C1 -24 7 -31 17 -31C38 -31 44 6 0 33Z', g: 'M-26 -9C-27 -18 -22 -23 -15 -24' },
    { d: 'M0 -38L35 0L0 38L-35 0Z', g: 'M-20 -8L-9 -20' },
  ];
  const shape = i => {
    const s = SHAPES[i];
    return `<svg class="cc-sh" viewBox="-50 -50 100 100" aria-hidden="true"><path class="cc-sw" transform="translate(4 5)" d="${s.d}"/>` +
      `<path class="cc-sd" d="${s.d}"/><path class="cc-sb" transform="translate(-3 -3) scale(.86)" d="${s.d}"/>` +
      `<path class="cc-sg" transform="translate(-3 -3) scale(.86)" d="${s.g}"/></svg>`;
  };
  const cat = () => (typeof ART != 'undefined' && ART.cat ? picArt('cat', 44) : ico('paw', 32));

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState();
    if (!fit(p, st)) st = fresh(p);
    let alive = true, phase = 'wait', taps = [], lastW = 0, lastH = 0;
    const band = api.band || p.band, timers = new Set();
    const later = (f, ms) => { const t = setTimeout(() => { timers.delete(t); if (alive) f(); }, ms); timers.add(t); return t; };
    const stopAll = () => { timers.forEach(clearTimeout); timers.clear(); };
    const ASK = p.rev ? 'Watch the cat. Then tap the pads backwards: the last one first.' : 'Watch the cat. Then tap the pads in the same order.';
    el.innerHTML = `<div class="cc cc-n${p.pads}${p.rev ? ' cc-rev' : ''}"><div class="cc-say"><span class="cc-cat" aria-hidden="true">${cat()}</span>` +
      `<p class="cc-msg" role="status" aria-live="polite"></p>${UI.ibtn('speak', 'Hear what to do', { size: 'sm', cls: 'cc-spk' })}</div>` +
      `<div class="cc-bar"><span class="cc-rounds" role="img"></span>${p.rev ? UI.tag('Backwards', 'info', 'arrow-left') : ''}<span class="cc-steps" aria-hidden="true"></span></div>` +
      `<div class="cc-area"><div class="cc-pads" role="group" aria-label="Pads">` +
      Array.from({ length: p.pads }, (_, i) => `<button class="cc-pad cc-c${i}" data-p="${i}" aria-label="${NAMES[i]}"><span class="cc-lit"></span>${shape(i)}</button>`).join('') +
      `</div></div></div>`;
    const root = el.firstChild, padsEl = root.querySelector('.cc-pads'), area = root.querySelector('.cc-area'), pad = [...padsEl.children];
    const msgEl = root.querySelector('.cc-msg');
    const msg = (t, cls) => { msgEl.textContent = t; msgEl.className = 'cc-msg' + (cls ? ' ' + cls : ''); };
    root.querySelector('.cc-spk').onclick = () => api.say(ASK);
    function layout() {
      if (!el.isConnected) return;
      const ps = getComputedStyle(el);
      root.style.height = Math.max(300, el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom)) + 'px';
      lastW = el.clientWidth; lastH = el.clientHeight;
      const w = area.clientWidth, h = area.clientHeight, gap = 16;
      let best = { cols: 2, s: 0 };
      for (const cols of p.pads == 4 ? [2, 4] : [2, 3]) {
        const rows = Math.ceil(p.pads / cols), s = Math.min((w - (cols - 1) * gap) / cols, (h - (rows - 1) * gap) / rows);
        if (s > best.s) best = { cols, s };
      }
      padsEl.style.setProperty('--cols', best.cols);
      padsEl.style.setProperty('--ps', Math.max(64, Math.floor(Math.min(best.s, 230))) + 'px');
    }
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { if (el.clientWidth != lastW || el.clientHeight != lastH) layout(); }, 120); };
    window.addEventListener('resize', onResize);
    function bar() {
      const b = root.querySelector('.cc-rounds'), n = p.len - p.start + 1, k = st.r - p.start;
      b.innerHTML = Array.from({ length: n }, (_, i) => `<i class="${i < k ? 'on' : i == k ? 'now' : ''}"></i>`).join('');
      b.setAttribute('aria-label', `Round ${k + 1} of ${n}: ${st.r} ${st.r == 1 ? 'pad' : 'pads'}`);
      root.querySelector('.cc-steps').innerHTML = Array.from({ length: st.r }, (_, i) => `<i class="${i < taps.length ? 'on' : ''}"></i>`).join('');
    }
    function light(i, ms, cls = 'on') {
      const b = pad[i];
      b.classList.add(cls);
      if (cls == 'on') api.sfx.key(TONE[p.pads][i]);
      later(() => b.classList.remove(cls), ms);
    }
    const setTurn = on => { padsEl.classList.toggle('wait', !on); pad.forEach(b => b.setAttribute('aria-disabled', on ? 'false' : 'true')); };
    // show round st.r: the pads light one by one, then it is the child's turn
    function showRound(slow = 1) {
      stopAll();
      phase = 'show';
      taps = [];
      setTurn(false);
      pad.forEach(b => b.classList.remove('on', 'tip', 'no'));
      bar();
      msg(slow > 1.3 ? 'Watch slowly...' : 'Watch me!', '');
      const on = Math.round(p.on * slow), step = Math.round((p.on + p.gap) * slow);
      p.seq.slice(0, st.r).forEach((v, j) => later(() => light(v, on), 450 + j * step));
      later(() => {
        phase = 'input';
        setTurn(true);
        const w = p.rev ? (st.r > 1 ? 'Your turn! Backwards: last one first.' : 'Your turn!') : 'Your turn!';
        msg(w, 'turn');
        if (band == 'A') api.say('Your turn!');
      }, 450 + st.r * step);
    }
    function tap(i, byHint) {
      if (!alive || phase != 'input') return;
      pad.forEach(x => x.classList.remove('tip'));
      taps.push(i);
      light(i, 260);
      const r = check(p, st.r, taps);
      bar();
      if (r == 'no') {
        phase = 'wait';
        setTurn(false);
        st.miss++;
        api.saveState(st);
        pad[i].classList.add('no');
        api.sfx.del();
        msg('Oops! Watch again.', 'try');
        later(() => showRound(1.2), 1100);
        return;
      }
      if (byHint) pad[i].classList.add('tip');
      if (r == 'go') return;
      phase = 'wait';
      setTurn(false);
      if (st.r >= p.len) {
        msg(`You copied all ${p.len}!`, 'good');
        later(() => api.sfx.right(st.r), 300);
        later(() => api.win({ mistakes: st.miss, note: [`You copied ${p.len} pads in a row${p.rev ? ', backwards' : ''}.`] }), 600);
        return;
      }
      st.r++;
      api.saveState(st);
      msg(['Yes!', 'Well done!', 'Great copying!', 'Super!'][st.r % 4] + ` Now ${st.r}.`, 'good');
      later(() => api.sfx.right(st.r), 300);
      later(() => showRound(), 1300);
    }
    pad.forEach((b, i) => { b.onclick = () => tap(i); });
    layout();
    bar();
    setTurn(false);
    msg(ASK, '');
    if (band == 'A' || (band == 'B' && st.r == p.start && !st.miss)) api.say(ASK); // R-01b: band B speaks its first instruction too
    later(() => showRound(), band == 'A' || band == 'B' ? 2400 : 1200); // time to hear it before the cat starts
    return {
      hint(t) {
        if (!alive || phase != 'input') return false;
        const tier_ = Math.min(3, t || 1), next = expect(p, st.r)[taps.length];
        if (tier_ == 1) { showRound(1.7); return true; }
        if (tier_ == 2) {
          pad.forEach(b => b.classList.remove('tip'));
          pad[next].classList.add('tip');
          msg('Tap the ringed pad next.', 'hint');
          api.say('Tap the ' + NAMES[next] + ' next.');
          return true;
        }
        msg('Here is the next one.', 'hint');
        tap(next, true);
        return true;
      },
      destroy() {
        alive = false;
        stopAll();
        clearTimeout(rz);
        window.removeEventListener('resize', onResize);
      },
      // for the smoke bot and the shots: what is happening now
      now: () => ({ phase, r: st.r, taps: taps.slice() }),
    };
  }

  return { make, expect, check, solve, fresh, fit, mount, shape, CFG, NAMES, TONE };
})();

BT.reg({
  id: 'copycat', name: 'Copy Cat', icon: 'copycat', bands: 'ABCD', allow: 2,
  rules: 'Watch the pads light up, then tap them in the same order.',
  make: CC.make, mount: CC.mount, solve: CC.solve,
});
