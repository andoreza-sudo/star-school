/* ---------- Brain Teasers: Mirror (P3-16; BRAIN_TEASERS.md 5.11, 7) ----------
   One registered type, `mirror`, bands B C D. Half of a picture sits on a square grid; the child taps squares on the other side to
   finish it so the two halves match.
     B (1-2)  6 x 6, a line down the middle (left-right mirror); 3-5 / 5-7 / 7-9 squares to fill over levels 1-4 / 5-8 / 9-12
     C (3-4)  8 x 8, a line across the middle (up-down mirror) on levels 1-4, the slanted corner-to-corner line on 5-8, either on 9-12;
              5-8 / 8-11 / 10-14 squares
     D (5-6)  half-turn about the centre dot (the picture looks the same upside down): 6 x 6 on levels 1-4, then 8 x 8;
              6-9 / 9-13 / 12-17 squares
   The given half is grown as one piece that touches the line (or the centre), so the whole picture is one shape. The answer is the
   exact mirror image of the given half (by construction; tools/test.js mirrors it again on its own). On the slanted line the squares
   the line runs through are their own twins: they are given and cannot be tapped.
   Play: tap a square on the empty side. A square of the mirror image fills in; any other square shakes amber, stays empty and counts
   one mistake (allow 2); the line says so gently. The picture is done when every twin is filled.
   Hints (the frame passes 1, 2, 3, then 3 again): 1 says how the mirror works and the line glows; 2 rings a square of the picture
   whose twin is still missing; 3 fills that twin (star-yellow), and each press after that fills the next one, so a child can always
   finish. Grid squares are at least 44 px (BRAIN_TEASERS 8, dense grids); the board is the largest square that fits.
   State (api.saveState): {on: filled squares, hn: the ones a hint filled, miss, h: hint tier shown, mk: ringed square or -1};
   MRR.fit rejects a state that does not belong to the puzzle. */
const MRR = (() => {
  // per band, levels 1-4 / 5-8 / 9-12: [grid side, fewest, most squares to fill]
  const TIER = {
    B: [[6, 3, 5], [6, 5, 7], [6, 7, 9]],
    C: [[8, 5, 8], [8, 8, 11], [8, 10, 14]],
    D: [[6, 6, 9], [8, 9, 13], [8, 12, 17]],
  };
  const tierOf = level => Math.min(2, Math.floor((Math.max(1, Math.min(12, level | 0 || 1)) - 1) / 4));
  // the twin of square (r, c) for a kind: v left-right, h up-down, d the slanted line (top left to bottom right), r half-turn
  const twin = (k, n, r, c) => k == 'v' ? [r, n - 1 - c] : k == 'h' ? [n - 1 - r, c] : k == 'd' ? [c, r] : [n - 1 - r, n - 1 - c];
  // which side a square is on: 'g' the given half, 't' the half to fill, 'l' on the line (slanted line only)
  function side(p, r, c) {
    const n = p.n, h = n / 2;
    if (p.k == 'v') return (c < h) == (p.s == 0) ? 'g' : 't';
    if (p.k == 'h') return (r < h) == (p.s == 0) ? 'g' : 't';
    if (p.k == 'd') return r == c ? 'l' : (r > c) == (p.s == 0) ? 'g' : 't';
    return r < h ? 'g' : 't';
  }
  const want = p => p.on.filter(i => side(p, Math.floor(i / p.n), i % p.n) == 'g').map(i => {
    const [r, c] = twin(p.k, p.n, Math.floor(i / p.n), i % p.n);
    return r * p.n + c;
  }).sort((a, b) => a - b);

  /* ---------- make ---------- */
  function make(band, level, rnd) {
    const L = Math.max(1, Math.min(12, level | 0 || 1)), T = tierOf(L), [n, lo, hi] = TIER[band][T];
    const k = band == 'B' ? 'v' : band == 'D' ? 'r' : T == 0 ? 'h' : T == 1 ? 'd' : rnd() < 0.5 ? 'h' : 'd';
    const p = { band, n, k, s: k == 'r' ? 0 : Math.floor(rnd() * 2), c: Math.floor(rnd() * 6), on: [] };
    const f = lo + Math.floor(rnd() * (hi - lo + 1));
    const h = n / 2, okCell = (r, c) => r >= 0 && c >= 0 && r < n && c < n && side(p, r, c) != 't';
    // a first square next to the line (half-turn: next to the middle, near the centre)
    let seed;
    if (k == 'v') seed = [Math.floor(rnd() * n), p.s == 0 ? h - 1 : h];
    else if (k == 'h') seed = [p.s == 0 ? h - 1 : h, Math.floor(rnd() * n)];
    else if (k == 'd') { const a = 1 + Math.floor(rnd() * (n - 2)); seed = p.s == 0 ? [a, a - 1] : [a - 1, a]; }
    else seed = [h - 1, h - 2 + Math.floor(rnd() * 3)];
    const pic = [seed], key = (r, c) => r * n + c, inPic = (r, c) => pic.some(q => q[0] == r && q[1] == c);
    const offLine = () => pic.filter(([r, c]) => side(p, r, c) == 'g').length;
    // grow one piece: a square next to the picture, likelier where it touches more of the picture (blobby, not stringy)
    for (let t = 0; t < 400 && offLine() < f; t++) {
      const cand = [];
      for (const [r, c] of pic) for (const [dr, dc] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
        const q = [r + dr, c + dc];
        if (!okCell(...q) || inPic(...q) || cand.some(o => o[0] == q[0] && o[1] == q[1])) continue;
        // the slanted line: at most a few of its own squares
        if (k == 'd' && side(p, ...q) == 'l' && pic.filter(([a, b]) => a == b).length >= 3) continue;
        cand.push(q);
      }
      if (!cand.length) break;
      const w = cand.map(([r, c]) => 1 + 2 * [[0, 1], [1, 0], [0, -1], [-1, 0]].filter(([dr, dc]) => inPic(r + dr, c + dc)).length);
      let x = rnd() * w.reduce((a, b) => a + b, 0), i = 0;
      while (i < cand.length - 1 && (x -= w[i]) > 0) i++;
      pic.push(cand[i]);
    }
    p.on = pic.map(([r, c]) => key(r, c)).sort((a, b) => a - b);
    return p;
  }
  const solve = p => want(p);
  const fresh = () => ({ on: [], hn: [], miss: 0, h: 0, mk: -1 });
  function fit(p, s) {
    if (!s || typeof s != 'object' || Array.isArray(s)) return false;
    const W = want(p), int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
    if (!Array.isArray(s.on) || !Array.isArray(s.hn) || !int(s.miss, 0, 999) || !int(s.h, 0, 3) || !int(s.mk, -1, p.n * p.n - 1)) return false;
    if (!s.on.every(i => W.includes(i)) || new Set(s.on).size != s.on.length) return false;
    if (!s.hn.every(i => s.on.includes(i)) || new Set(s.hn).size != s.hn.length) return false;
    return s.mk < 0 || p.on.includes(s.mk);
  }
  // the next twin still missing, and the square of the picture it belongs to
  function next(p, s) {
    const W = want(p).filter(i => !s.on.includes(i));
    if (!W.length) return null;
    const t = W[0], [r, c] = twin(p.k, p.n, Math.floor(t / p.n), t % p.n);
    return { t, g: r * p.n + c };
  }
  const ASK = {
    v: 'Finish the picture. Both sides of the line must match.',
    h: 'Finish the picture. It must match above and below the line.',
    d: 'Finish the picture. It must match on both sides of the slanted line.',
    r: 'Finish the picture. It must look the same upside down.',
  };
  const HINT1 = {
    v: 'Each square has a twin on the other side of the line, just as far from it.',
    h: 'Each square has a twin on the other side of the line, just as far from it.',
    d: 'Fold the grid along the slanted line. Each square lands on its twin.',
    r: 'Turn the grid upside down around the dot. Each square lands on its twin.',
  };
  function hintText(p, t) {
    if (t == 1) return HINT1[p.k];
    if (t == 2) return 'Look at the ringed square. Where is its twin?';
    return 'Here is one twin. Can you find the rest?';
  }

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState();
    if (!fit(p, st)) st = fresh();
    let alive = true, msg = '', mk = '', done = false;
    const n = p.n, W = want(p);
    const say = (t, kind, speak) => {
      msg = t;
      mk = kind || '';
      const m = el.querySelector('.mr-msg');
      if (m) { m.textContent = t; m.className = 'mr-msg' + (mk ? ' ' + mk : ''); }
      if (speak) api.say(t);
    };
    function cell(i) {
      const r = Math.floor(i / n), c = i % n, sd = side(p, r, c);
      if (sd != 't') {
        const on = p.on.includes(i);
        return `<span class="mr-cell ${sd}${on ? ' on' : ''}${st.mk == i ? ' ring' : ''}"${on ? '' : ''}></span>`;
      }
      const on = st.on.includes(i);
      return `<button class="mr-cell t${on ? ' on' : ''}${st.hn.includes(i) ? ' hn' : ''}" data-i="${i}" aria-label="Row ${r + 1}, square ${c + 1}${on ? ', filled' : ''}"></button>`;
    }
    function line() {
      const h = n / 2, s = 'class="mr-ln"';
      const d = p.k == 'v' ? `<path ${s} d="M${h} -0.15V${n + 0.15}"/>` : p.k == 'h' ? `<path ${s} d="M-0.15 ${h}H${n + 0.15}"/>` :
        p.k == 'd' ? `<path ${s} d="M-0.1 -0.1L${n + 0.1} ${n + 0.1}"/>` :
          `<circle class="mr-dot" cx="${h}" cy="${h}" r="0.24"/><circle class="mr-dotc" cx="${h - 0.05}" cy="${h - 0.05}" r="0.08"/>`;
      return `<svg class="mr-line${st.h >= 1 ? ' glow' : ''}" viewBox="0 0 ${n} ${n}" aria-hidden="true">${d}</svg>`;
    }
    const left = () => W.length - st.on.length;
    const countTxt = () => left() ? `${left()} ${left() == 1 ? 'square' : 'squares'} to go` : 'Done!';
    function render() {
      const cells = [];
      for (let i = 0; i < n * n; i++) cells.push(cell(i));
      el.innerHTML = `<div class="mr mr-${p.k} mr-n${n}"><div class="mr-say"><p class="mr-msg" aria-live="polite"></p>` +
        `${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'mr-spk' })}</div>` +
        `<div class="mr-main"><div class="mr-board mr-c${p.c}" style="--n:${n}" role="group" aria-label="Picture grid">${cells.join('')}${line()}</div>` +
        `<p class="mr-count"><span class="mr-ct">${countTxt()}</span></p></div></div>`;
      el.querySelector('.mr-spk').onclick = () => api.say(msg);
      el.querySelectorAll('.mr-cell.t').forEach(b => b.onclick = () => tap(+b.dataset.i, b));
      say(msg || ASK[p.k], mk);
      size();
    }
    // the board: the largest square that fits the stage with the talk line (beside it on a wide screen), squares at least 44 px
    function size() {
      const b = el.querySelector('.mr-board'), mr = el.querySelector('.mr');
      if (!b || !el.clientWidth) return;
      const cs = getComputedStyle(el), px = v => parseFloat(v) || 0;
      const w = el.clientWidth - px(cs.paddingLeft) - px(cs.paddingRight), h = el.clientHeight - px(cs.paddingTop) - px(cs.paddingBottom);
      const wide = innerWidth >= 700 && innerWidth > innerHeight * 1.2;
      mr.classList.toggle('wide', wide);
      const talk = el.querySelector('.mr-say').offsetHeight, ct = el.querySelector('.mr-count').offsetHeight;
      const side_ = wide ? Math.min(w - 320, h - ct - 20) : Math.min(w + 12, h - talk - ct - 24, 560);
      b.style.setProperty('--cs', Math.max(44, Math.floor(side_ / n)) + 'px');
    }
    const onResize = () => { if (alive) size(); };
    addEventListener('resize', onResize);
    function fill(i, hinted) {
      st.on.push(i);
      if (hinted) st.hn.push(i);
      st.mk = -1;
      api.saveState(st);
      const b = el.querySelector(`.mr-cell.t[data-i="${i}"]`);
      if (b) { b.classList.add('on'); if (hinted) b.classList.add('hn'); b.setAttribute('aria-label', b.getAttribute('aria-label') + ', filled'); }
      el.querySelectorAll('.mr-cell.ring').forEach(x => x.classList.remove('ring'));
      el.querySelector('.mr-ct').textContent = countTxt();
      if (!left()) {
        done = true;
        el.querySelector('.mr-board').classList.add('won');
        say('The picture matches!', 'good', true);
        api.win({ mistakes: st.miss, note: [`${W.length} squares mirrored`] });
      }
    }
    function tap(i, b) {
      if (!alive || done || st.on.includes(i)) return;
      if (!W.includes(i)) {
        st.miss++;
        api.saveState(st);
        api.sfx.wrong();
        b.classList.remove('no');
        void b.offsetWidth;
        b.classList.add('no');
        say(p.k == 'r' ? 'Not that square. Turn the picture in your head and try again!' : 'Not that square. Find its twin across the line!', 'try');
        return;
      }
      SFX.key(1 + (st.on.length % 8));
      fill(i, false);
      if (!done && mk == 'try') say(ASK[p.k], '');
    }
    if (st.h) { msg = hintText(p, st.h); mk = 'hint'; }
    render();
    if (api.band == 'B' && !st.on.length && !st.h) api.say(ASK[p.k]);
    return {
      hint(tier) {
        if (done || !alive) return false;
        const nx = next(p, st);
        if (!nx) return false;
        const t = Math.max(1, Math.min(3, tier | 0));
        st.h = Math.max(st.h, t);
        if (t == 1) {
          el.querySelector('.mr-line').classList.add('glow');
        } else if (t == 2) {
          st.mk = nx.g;
          el.querySelectorAll('.mr-cell.ring').forEach(x => x.classList.remove('ring'));
          el.querySelector('.mr-board').children[nx.g].classList.add('ring');
        }
        say(hintText(p, t), 'hint', true);
        if (t == 3) fill(nx.t, true);
        else api.saveState(st);
        return true;
      },
      destroy() { alive = false; removeEventListener('resize', onResize); },
    };
  }

  return { make, solve, mount, fit, fresh, want, twin, side, next, hintText, TIER, tierOf };
})();

BT.reg({
  id: 'mirror', name: 'Mirror', icon: 'flip', bands: 'BCD', allow: 2,
  rules: 'Tap squares to finish the picture so it matches across the line.',
  make: MRR.make, mount: MRR.mount, solve: MRR.solve,
});
