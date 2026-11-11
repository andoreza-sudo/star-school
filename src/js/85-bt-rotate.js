/* ---------- Brain Teasers: Turn It (P3-16; BRAIN_TEASERS.md 5.11, 7) ----------
   One registered type, `rotate`, bands A B C D. A puzzle is a few shapes made of squares (polyominoes); for each one the child taps
   the choice that is the same shape turned.
     A (PK-K)  "Which shadow matches?": the shape in colour and 3 dark shadows, one of them its own. 4 squares, 5 from level 9; the
               shadow is not turned on levels 1-6 and turned from level 7. The wrong shadows are other shapes. The question is spoken.
     B (1-2)   2D turn: 4 choices, one the shape turned (a quarter, half or three-quarter turn), three with one square moved.
               4 squares on levels 1-4, 5 after.
     C (3-4)   turn vs mirror: the shape is chiral (its mirror image cannot be turned to match it), the choices are the shape turned,
               its mirror image (turned too) and two with one square moved. 5 squares, 6 from level 7.
     D (5-6)   harder shapes: 6 squares, 7 from level 7; the choices are the shape turned, its mirror image, one with a square moved and
               that one's mirror image.
   Exactly one choice is the shape turned, checked in make() by comparing canonical forms over the 4 turns (and over all 8 turns
   and flips for "another shape"); tools/test.js checks it again with its own transforms.
   All the pieces of an item are one colour, so colour never tells the answer; every choice is drawn at the same square size.
   Play: tap a choice. A wrong one turns amber, stays out and counts one mistake (allow 1); the line says so gently, and says when
   the tapped one was the mirror image. The right one turns green and the next shape comes.
   Hints (per shape; the frame counts tiers): 1 a nudge in words; 2 shows the shape in all four turns next to it (A: takes one wrong
   shadow away); 3 takes away two wrong choices (A: the other one). After that the shape has no more hints.
   State (api.saveState): {i item, miss, h hint tier of this item, x wrong taps, g choices a hint took away}; ROT.fit checks it. */
const ROT = (() => {
  /* ---------- polyominoes: a list of [row, col] squares ---------- */
  const norm = cs => {
    const r0 = Math.min(...cs.map(c => c[0])), c0 = Math.min(...cs.map(c => c[1]));
    return cs.map(([r, c]) => [r - r0, c - c0]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  };
  const key = cs => norm(cs).map(c => c.join(',')).join(' ');
  const turn = (cs, k) => { let o = cs; for (let i = 0; i < (k & 3); i++) o = o.map(([r, c]) => [c, -r]); return norm(o); }; // a quarter turn clockwise
  const flip = cs => norm(cs.map(([r, c]) => [r, -c])); // left-right mirror
  const canonR = cs => [0, 1, 2, 3].map(k => key(turn(cs, k))).sort()[0];
  const canonF = cs => [canonR(cs), canonR(flip(cs))].sort()[0];
  const chiral = cs => canonR(cs) !== canonR(flip(cs));
  const dims = cs => { const n = norm(cs); return [Math.max(...n.map(c => c[0])) + 1, Math.max(...n.map(c => c[1])) + 1]; };
  const NB = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  const has = (cs, r, c) => cs.some(q => q[0] == r && q[1] == c);
  function connected(cs) {
    if (!cs.length) return false;
    const seen = [cs[0]], todo = [cs[0]];
    while (todo.length) {
      const [r, c] = todo.pop();
      for (const [dr, dc] of NB) {
        const q = cs.find(o => o[0] == r + dr && o[1] == c + dc);
        if (q && !seen.includes(q)) { seen.push(q); todo.push(q); }
      }
    }
    return seen.length == cs.length;
  }
  // a random shape of n squares that fits in a box of side most
  function grow(rnd, n, most) {
    for (let t = 0; t < 200; t++) {
      const cs = [[0, 0]];
      while (cs.length < n) {
        const [r, c] = cs[Math.floor(rnd() * cs.length)], [dr, dc] = NB[Math.floor(rnd() * 4)];
        if (!has(cs, r + dr, c + dc)) cs.push([r + dr, c + dc]);
      }
      const d = dims(cs);
      if (Math.max(...d) <= most) return norm(cs);
    }
    return null;
  }
  // the shape with one square moved: it is still one piece, has the same size, and is a different shape (not turned, not flipped)
  function moved(rnd, cs, most, avoid) {
    for (let t = 0; t < 80; t++) {
      const i = Math.floor(rnd() * cs.length), rest = cs.filter((_, j) => j != i);
      if (!connected(rest)) continue;
      const free = [];
      for (const [r, c] of rest) for (const [dr, dc] of NB) {
        const q = [r + dr, c + dc];
        if (!has(rest, ...q) && !(q[0] == cs[i][0] && q[1] == cs[i][1]) && !has(free, ...q)) free.push(q);
      }
      const o = norm(rest.concat([free[Math.floor(rnd() * free.length)]]));
      if (Math.max(...dims(o)) > most || avoid.includes(canonF(o))) continue;
      return o;
    }
    return null;
  }

  /* ---------- make ---------- */
  // per band: items, choices, squares on levels 1-6 / 7-12 (A: 1-8 / 9-12, B: 1-4 / 5-12), the largest box side
  const BAND = {
    A: { items: 3, n: L => L <= 8 ? 4 : 5, most: 3 },
    B: { items: 4, n: L => L <= 4 ? 4 : 5, most: 4 },
    C: { items: 4, n: L => L <= 6 ? 5 : 6, most: 4 },
    D: { items: 4, n: L => L <= 6 ? 6 : 7, most: 4 },
  };
  const shuffle = (a, rnd) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  // one item: {t target, ch [{s squares, k kind: r right, f mirror image, m one square moved}], a answer index, turn}
  function item(rnd, band, L, used) {
    const B = BAND[band], n = B.n(L);
    for (let t = 0; t < 300; t++) {
      const s = grow(rnd, n, B.most);
      if (!s || used.slice(-2).includes(canonF(s))) continue; // not the shape of the last two items
      if (band != 'A' && band != 'B' && !chiral(s)) continue;
      // the right answer is turned so that it looks different from the shape (band A, levels 1-6: not turned)
      const ks = band == 'A' && L <= 6 ? [0] : [1, 2, 3].filter(k => key(turn(s, k)) !== key(s));
      if (!ks.length) continue;
      const k = ks[Math.floor(rnd() * ks.length)], ch = [{ s: turn(s, k), k: 'r' }];
      const avoid = [canonF(s)];
      if (band == 'A') {
        // other shapes of the same size as shadows
        for (let j = 0; j < 2; j++) {
          let o = null;
          for (let u = 0; u < 60 && !o; u++) { const g = grow(rnd, n, B.most); if (g && !avoid.includes(canonF(g))) o = g; }
          if (!o) break;
          avoid.push(canonF(o));
          ch.push({ s: L <= 6 ? o : turn(o, Math.floor(rnd() * 4)), k: 'm' });
        }
      } else {
        if (band != 'B') ch.push({ s: turn(flip(s), Math.floor(rnd() * 4)), k: 'f' });
        const want = band == 'B' ? 3 : 2;
        let m1 = null;
        for (let g = 0; g < 40 && ch.length < 1 + (band == 'B' ? 0 : 1) + want; g++) {
          if (band == 'D' && m1) { ch.push({ s: turn(flip(m1), Math.floor(rnd() * 4)), k: 'm' }); break; }
          const o = moved(rnd, s, B.most, avoid);
          if (!o) break;
          // D: the moved shape and its mirror image are both choices, so the moved shape must be chiral too
          if (band == 'D' && !chiral(o)) continue;
          avoid.push(canonF(o));
          m1 = o;
          ch.push({ s: turn(o, Math.floor(rnd() * 4)), k: 'm' });
        }
      }
      if (ch.length !== (band == 'A' ? 3 : 4)) continue;
      // exactly one choice is the shape turned (A, levels 1-6: exactly one is the very same shadow), and no two choices look the same
      const cr = canonR(s), same = ch.filter(c => band == 'A' && L <= 6 ? key(c.s) == key(s) : canonR(c.s) == cr);
      if (same.length !== 1 || same[0].k !== 'r') continue;
      if (new Set(ch.map(c => key(c.s))).size !== ch.length) continue;
      shuffle(ch, rnd);
      return { t: s, ch, a: ch.findIndex(c => c.k == 'r'), turn: k };
    }
    return null;
  }
  function make(band, level, rnd) {
    const L = Math.max(1, Math.min(12, level | 0 || 1)), items = [], used = [];
    for (let i = 0; i < BAND[band].items; i++) {
      const it = item(rnd, band, L, used);
      used.push(canonF(it.t));
      it.c = Math.floor(rnd() * 5);
      items.push(it);
    }
    for (let i = 1; i < items.length; i++) if (items[i].c == items[i - 1].c) items[i].c = (items[i].c + 1) % 5;
    return { band, level: L, shadow: band == 'A', items };
  }
  const solve = p => p.items.map(it => it.a);
  const fresh = () => ({ i: 0, miss: 0, h: 0, x: [], g: [] });
  function fit(p, s) {
    if (!s || typeof s != 'object' || Array.isArray(s)) return false;
    const n = p.items.length, int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
    if (!int(s.i, 0, n - 1) || !int(s.miss, 0, 999) || !int(s.h, 0, 3) || !Array.isArray(s.x) || !Array.isArray(s.g)) return false;
    const it = p.items[s.i], all = s.x.concat(s.g);
    if (!all.every(c => int(c, 0, it.ch.length - 1) && c !== it.a) || new Set(all).size !== all.length) return false;
    return all.length <= it.ch.length - 1;
  }
  const ASK = { A: 'Which shadow matches the shape?', B: 'Which one is the same shape, turned?', C: 'Which one is the same shape, turned?', D: 'Which one is the same shape, turned?' };
  const HINT1 = {
    A: 'Look at the bumps and corners of the shape. The right shadow has the same ones.',
    B: 'Turn the shape in your head. Watch where its corner goes.',
    C: 'One choice is the shape flipped, like in a mirror. Turning can never make that one.',
    D: 'Two choices are flipped, like in a mirror. Turn the shape in your head and check every square.',
  };
  function hintText(p, it, t) {
    if (t == 1) return HINT1[p.band];
    if (t == 2) return p.shadow ? 'One shadow is gone. Look at the two that are left.' : 'The shape in all four turns. Find one below.';
    return p.shadow ? 'Only one shadow is left. That is the one!' : 'Two wrong ones are gone. Which one is left?';
  }
  // hint 2 (shadows) or 3: which choices it takes away (wrong ones still in play: one for shadows, else two)
  function takeFor(p, it, s, t) {
    const left = it.ch.map((_, c) => c).filter(c => c !== it.a && !s.x.includes(c) && !s.g.includes(c));
    if (p.shadow) return t >= 2 ? left.slice(0, 1) : [];
    return t >= 3 ? left.slice(0, 2) : [];
  }

  /* ---------- drawing ---------- */
  const f1 = v => Math.round(v * 10) / 10;
  // a piece in a 100 x 100 box at square size u, centred; the light comes from the top left
  function piece(cs, u, cls, look) {
    const [h, w] = dims(cs), ox = (100 - w * u) / 2, oy = (100 - h * u) / 2;
    const at = (r, c) => [f1(ox + c * u), f1(oy + r * u)];
    if (look == 'shadow') {
      // a dark flat shadow: the squares merge into one silhouette
      return `<g class="ro-sh">${cs.map(([r, c]) => { const [x, y] = at(r, c); return `<rect x="${x - 0.5}" y="${y - 0.5}" width="${f1(u + 1)}" height="${f1(u + 1)}"/>`; }).join('')}</g>`;
    }
    const q = f1(u * 0.14), b = f1(u * 0.84), gl = f1(u * 0.24);
    let s = `<g class="${cls}"><g class="ro-lg">`;
    s += cs.map(([r, c]) => { const [x, y] = at(r, c); return `<rect x="${f1(x + u * 0.06)}" y="${f1(y + u * 0.1)}" width="${f1(u)}" height="${f1(u)}" rx="${q}"/>`; }).join('');
    s += '</g>';
    for (const [r, c] of cs) {
      const [x, y] = at(r, c);
      s += `<rect class="ro-sd" x="${x}" y="${y}" width="${f1(u)}" height="${f1(u)}" rx="${q}"/>` +
        `<rect class="ro-bs" x="${f1(x + u * 0.04)}" y="${f1(y + u * 0.04)}" width="${b}" height="${b}" rx="${q}"/>` +
        `<path class="ro-gl" d="M${f1(x + u * 0.2)} ${f1(y + u * 0.2)}H${f1(x + u * 0.2 + gl)}"/>`;
    }
    return s + '</g>';
  }
  const tile = (cs, u, c, look, label) => `<svg class="ro-t" viewBox="0 0 100 100" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}>` +
    piece(cs, u, 'ro-c' + c, look) + '</svg>';
  // the square size for an item: every piece of it (target, turns, choices) at the same size
  const unit = it => 92 / Math.max(...[it.t].concat(it.ch.map(c => c.s)).map(s => Math.max(...dims(s))), 3);

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState();
    if (!fit(p, st)) st = fresh();
    let busy = 0, alive = true, msg = '', mk = '';
    const N = p.items.length;
    const say = (t, kind, speak) => {
      msg = t;
      mk = kind || '';
      const m = el.querySelector('.ro-msg');
      if (m) { m.textContent = t; m.className = 'ro-msg' + (mk ? ' ' + mk : ''); }
      if (speak) api.say(t);
    };
    const turnsHTML = it => !p.shadow && st.h >= 2 ? `<div class="ro-turns" role="img" aria-label="The shape in all four turns">` +
      [0, 1, 2, 3].map(k => `<span class="ro-tn">${tile(turn(it.t, k), unit(it), it.c, '', '')}</span>`).join('') + '</div>' : '';
    function render() {
      const it = p.items[st.i], u = unit(it);
      const dots = p.items.map((_, i) => `<i class="${i < st.i ? 'on' : i == st.i ? 'now' : ''}"></i>`).join('');
      const chs = it.ch.map((c, i) => {
        const x = st.x.includes(i), g = st.g.includes(i);
        return `<button class="choice ro-ch${x ? ' wrong' : ''}${g ? ' off' : ''}" data-c="${i}" aria-label="${p.shadow ? 'Shadow' : 'Shape'} ${i + 1}"` +
          `${x || g ? ' disabled' : ''}>${tile(c.s, u, it.c, p.shadow ? 'shadow' : '', '')}</button>`;
      }).join('');
      el.innerHTML = `<div class="ro ro-${p.band}"><div class="ro-say"><span class="ro-dots" role="img" aria-label="Shape ${st.i + 1} of ${N}">${dots}</span>` +
        `<p class="ro-msg" aria-live="polite"></p>${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'ro-spk' })}</div>` +
        `<div class="ro-main"><div class="ro-top"><div class="ro-card"><span class="ro-tag">${ico(p.shadow ? 'eye' : 'rotate', 22)}</span>` +
        `${tile(it.t, u, it.c, '', 'The shape')}</div>${turnsHTML(it)}</div>` +
        `<div class="ro-chs n${it.ch.length}">${chs}</div></div></div>`;
      el.querySelector('.ro-spk').onclick = () => api.say(msg);
      el.querySelectorAll('.ro-ch').forEach(b => b.onclick = () => tap(+b.dataset.c, b));
      say(msg || ASK[p.band], mk);
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
        const f = it.ch[i].k == 'f';
        say(p.shadow ? 'Not that shadow. Look at the shape again!' : f ? 'That one is flipped, like in a mirror. Try another!' : 'That one has a square in another place. Try again!', 'try', p.band == 'A');
        return;
      }
      b.classList.add('right');
      el.querySelectorAll('.ro-ch').forEach(x => { x.disabled = true; });
      el.querySelector('.ro-card').classList.add('got');
      api.sfx.right(st.i + 3);
      say(p.shadow ? 'Yes! That is its shadow.' : 'Yes! The same shape, turned.', 'good', p.band == 'A');
      const last = st.i == N - 1;
      st = { i: st.i + 1, miss: st.miss, h: 0, x: [], g: [] };
      if (last) { api.win({ mistakes: st.miss }); return; }
      api.saveState(st);
      busy = setTimeout(() => {
        busy = 0;
        if (!alive) return;
        msg = '';
        mk = '';
        render();
        if (p.band == 'A') api.say(ASK.A);
      }, 1200);
    }
    if (st.h) { msg = hintText(p, p.items[st.i], st.h); mk = 'hint'; }
    render();
    if (p.band == 'A' && !st.h) api.say(ASK.A);
    return {
      hint() {
        if (busy || st.i >= N || st.h >= 3) return false;
        const it = p.items[st.i], t = st.h + 1, go = takeFor(p, it, st, t);
        if (t >= 2 && (p.shadow || t == 3) && !go.length) return false; // nothing left to take away
        st.h = t;
        st.g.push(...go);
        api.saveState(st);
        go.forEach(c => { const b = el.querySelector(`.ro-ch[data-c="${c}"]`); b.classList.add('off'); b.disabled = true; });
        if (t == 2 && !p.shadow) el.querySelector('.ro-top').insertAdjacentHTML('beforeend', turnsHTML(it));
        say(hintText(p, it, t), 'hint', true);
        return true;
      },
      destroy() { alive = false; clearTimeout(busy); },
    };
  }

  return { make, solve, mount, fit, fresh, hintText, takeFor, norm, key, turn, flip, canonR, canonF, chiral, connected, dims, BAND };
})();

BT.reg({
  id: 'rotate', name: 'Turn It', icon: 'rotate', bands: 'ABCD', allow: 1,
  rules: 'Find the same shape, turned. A flipped shape is not the same!',
  make: ROT.make, mount: ROT.mount, solve: ROT.solve,
});
