/* ---------- Brain Teasers: Cube Count (P3-16; BRAIN_TEASERS.md 5.11, 7) ----------
   One registered type, `cubes`, bands B C D. A puzzle is 3 stacks of cubes drawn in isometric view; the child counts each one and
   types the number on the number pad.
   A stack is a height map hm[x][y] (cubes stand in columns on a floor tray, nothing floats), so every cube is either seen or sits
   under a cube that is seen. The viewer looks from +x +y +z: x runs down to the right, y down to the left, the top faces are lit.
   A stack is only used when the drawing shows every column's height: the top face of every column is fully in view, and every
   empty floor square shows at least 40% of its floor (so no column can hide there). The count is then the sum of the heights.
   make() builds a stack from the front to the back: a column's view depends only on the columns in front of it, so each column gets
   a height that keeps its top (or its floor) in view.
     B (1-2)  up to 2 x 2 x 2: levels 1-4 one layer, 5-8 two layers, 9-12 two layers with a hidden cube
     C (3-4)  up to 3 x 3 x 3      D (5-6)  up to 4 x 4 x 4     (section 7: smallest to largest over the levels; more hidden cubes)
   Play: type a number, tap the tick. A wrong number counts one mistake (allow 1) and the line says so gently (try-ink, never red).
   Hints (per stack; the frame counts the tiers): 1 a nudge in words, 2 shows the stack layer by layer (5.11), each layer drawn
   on its own, 3 puts the number of cubes under each layer ("Add the layers: 4 + 2."). After that the stack has no more hints.
   Drawing: inline SVG, tokens only (src/css/49-bt-cubes.css): top face light (-1), left face base, right face shade (-2), edges deep
   (-3), on a grey floor tray with a white grid; light from the top left. Faces that touch another cube are left out.
   State (api.saveState): {i stack, miss, h hint tier of this stack}; CUB.fit rejects a state that does not belong to the puzzle. */
const CUB = (() => {
  const N = 3, C30 = Math.sqrt(3) / 2, K = 40;
  // per band, levels 1-4 / 5-8 / 9-12: [nx, ny, highest, fewest cubes, most cubes, fewest hidden cubes]
  const TIER = {
    B: [[2, 2, 1, 2, 4, 0], [2, 2, 2, 3, 6, 0], [2, 2, 2, 5, 8, 1]],
    C: [[2, 3, 2, 4, 9, 0], [3, 3, 2, 6, 13, 1], [3, 3, 3, 9, 20, 2]],
    D: [[3, 3, 3, 8, 17, 1], [3, 4, 3, 12, 24, 3], [4, 4, 4, 16, 36, 5]],
  };
  const tierOf = level => Math.min(2, Math.floor((Math.max(1, Math.min(12, level | 0 || 1)) - 1) / 4));
  const count = hm => hm.reduce((s, col) => s + col.reduce((a, b) => a + b, 0), 0);
  const H = (hm, x, y) => (x >= 0 && y >= 0 && x < hm.length && y < hm[0].length) ? hm[x][y] : 0;

  /* ---------- what the viewer sees (rays toward +x +y +z) ---------- */
  // does the ray from point (px, py, pz) toward the viewer enter a cube of the stack?
  function blocked(hm, px, py, pz) {
    for (let x = 0; x < hm.length; x++) for (let y = 0; y < hm[0].length; y++) {
      const h = hm[x][y];
      if (!h || x + 1 <= px || y + 1 <= py) continue;
      const lo = Math.max(x - px, y - py, 1e-6), hi = Math.min(x + 1 - px, y + 1 - py, h - pz);
      if (hi - lo > 1e-9) return true;
    }
    return false;
  }
  const SAMP = [0.08, 0.3, 0.5, 0.7, 0.92];
  // a point grid on the top face of column (x, y) at height z (or on its floor when z is 0): how many points are in view
  function seen(hm, x, y, z) {
    let n = 0;
    for (const s of SAMP) for (const t of SAMP) if (!blocked(hm, x + s, y + t, z)) n++;
    return n;
  }
  const ALL = SAMP.length * SAMP.length;
  // the floor of an empty square: points off its diagonal (a column in front covers one side of the diagonal exactly)
  function floorSeen(hm, x, y) {
    let n = 0;
    for (const s of SAMP) for (const t of SAMP) if (s != t && !blocked(hm, x + s, y + t, 0)) n++;
    return n;
  }
  // column (x, y) is readable: its top fully in view, or (empty) at least 40% of its floor in view
  const readable = (hm, x, y) => hm[x][y] ? seen(hm, x, y, hm[x][y]) == ALL : floorSeen(hm, x, y) >= 8;
  const valid = hm => hm.every((col, x) => col.every((_, y) => readable(hm, x, y)));
  // cubes with no face in view (they are there because they hold up the cubes above them)
  function hidden(hm) {
    let n = 0;
    for (let x = 0; x < hm.length; x++) for (let y = 0; y < hm[0].length; y++) for (let z = 0; z < hm[x][y]; z++) {
      // the three faces the viewer could see: top (z+1), right (x+1), left (y+1); a face against another cube is covered
      const top = z + 1 < hm[x][y] ? 0 : seen(hm, x, y, z + 1);
      let side = 0;
      for (const s of SAMP) for (const t of SAMP) {
        if (H(hm, x + 1, y) <= z && !blocked(hm, x + 1, y + s, z + t)) side++;
        if (H(hm, x, y + 1) <= z && !blocked(hm, x + s, y + 1, z + t)) side++;
      }
      if (!top && !side) n++;
    }
    return n;
  }

  /* ---------- make ---------- */
  // a stack nx x ny, columns up to hi tall, built from the front (big x + y) to the back
  function build(rnd, nx, ny, hi, q) {
    const hm = Array.from({ length: nx }, () => Array(ny).fill(0));
    const cells = [];
    for (let x = 0; x < nx; x++) for (let y = 0; y < ny; y++) cells.push([x, y]);
    cells.sort((a, b) => (b[0] + b[1]) - (a[0] + a[1]) || b[0] - a[0]);
    for (const [x, y] of cells) {
      const ok = [];
      for (let h = 0; h <= hi; h++) {
        hm[x][y] = h;
        if (readable(hm, x, y)) ok.push(h);
      }
      // the lowest height that keeps the column in view is likeliest (each step up halves the chance), an empty square is rarer
      const m = Math.min(...ok.filter(h => h > 0)), w = ok.map(h => h == 0 ? 0.3 : Math.pow(q, h - m)), tot = w.reduce((a, b) => a + b, 0);
      let r = rnd() * tot, k = 0;
      while (k < ok.length - 1 && (r -= w[k]) > 0) k++;
      hm[x][y] = ok[k];
    }
    return hm;
  }
  // the stack fills its footprint: some cube in the last row and in the last column (so a 3 x 3 stack is not really 2 x 2)
  const fills = hm => hm[hm.length - 1].some(h => h) && hm.some(col => col[col.length - 1]) && hm[0].some(h => h) && hm.some(col => col[0]);
  function stack(rnd, band, level, avoid) {
    const [nx, ny, hi, lo, most, hid] = TIER[band][tierOf(level)];
    let best = null;
    for (let t = 0; t < 400; t++) {
      // swap the footprint sides sometimes so a 3 x 4 tray also shows as 4 x 3
      const flip = nx != ny && rnd() < 0.5, hm = build(rnd, flip ? ny : nx, flip ? nx : ny, hi, 0.35 + 0.4 * rnd());
      const n = count(hm);
      if (!fills(hm) || n < lo || n > most || avoid.includes(JSON.stringify(hm))) continue;
      if (Math.max(...hm.map(c => Math.max(...c))) < hi) continue; // reach the band's height
      const hd = hidden(hm);
      if (hd >= hid) return { hm, n, hid: hd };
      if (!best) best = { hm, n, hid: hd };
    }
    return best;
  }
  function make(band, level, rnd) {
    const items = [], seen_ = [];
    for (let i = 0; i < N; i++) {
      const s = stack(rnd, band, level, seen_);
      seen_.push(JSON.stringify(s.hm));
      items.push({ hm: s.hm, n: s.n, hid: s.hid, c: Math.floor(rnd() * 6) });
    }
    // the stacks of a puzzle get three different colours
    for (let i = 1; i < N; i++) while (items.slice(0, i).some(o => o.c == items[i].c)) items[i].c = (items[i].c + 1) % 6;
    return { band, items };
  }
  const solve = p => p.items.map(it => it.n);
  // the layers bottom first: how many cubes each layer has
  const layers = hm => {
    const top = Math.max(...hm.map(c => Math.max(...c))), out = [];
    for (let z = 0; z < top; z++) out.push(hm.reduce((s, c) => s + c.filter(h => h > z).length, 0));
    return out;
  };
  const fresh = () => ({ i: 0, miss: 0, h: 0 });
  function fit(p, s) {
    if (!s || typeof s != 'object' || Array.isArray(s)) return false;
    const int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
    return int(s.i, 0, p.items.length - 1) && int(s.miss, 0, 999) && int(s.h, 0, 3);
  }
  const HINT1 = 'Count one layer at a time, from the bottom up. Cubes under the ones you see are there too.';
  function hintText(it, t) {
    if (t == 1) return HINT1;
    if (t == 2) return 'Here is each layer on its own. Count the cubes in each one.';
    const L = layers(it.hm);
    return L.length == 1 ? `There is one layer of ${L[0]} cubes.` : `Add the layers: ${L.join(' + ')}.`;
  }

  /* ---------- drawing ---------- */
  const f1 = v => Math.round(v * 10) / 10;
  const pt = (x, y, z) => f1((x - y) * C30 * K) + ' ' + f1(((x + y) / 2 - z) * K);
  const poly = (cls, ps) => `<path class="${cls}" d="M${ps.map(p => pt(...p)).join('L')}Z"/>`;
  // the box around a footprint nx x ny, up to height top, in SVG units (tray included)
  function box(nx, ny, top) {
    const T = 0.3, xs = [-ny * C30 * K, nx * C30 * K], ys = [-top * K, ((nx + ny) / 2 + T) * K], pad = 4;
    return `${f1(xs[0] - pad)} ${f1(ys[0] - pad)} ${f1(xs[1] - xs[0] + 2 * pad)} ${f1(ys[1] - ys[0] + 2 * pad)}`;
  }
  function tray(nx, ny) {
    const T = 0.3;
    let g = poly('cb-ft', [[0, 0, 0], [nx, 0, 0], [nx, ny, 0], [0, ny, 0]]) +
      poly('cb-fr', [[nx, 0, 0], [nx, ny, 0], [nx, ny, -T], [nx, 0, -T]]) +
      poly('cb-fl', [[0, ny, 0], [nx, ny, 0], [nx, ny, -T], [0, ny, -T]]);
    let d = '';
    for (let x = 1; x < nx; x++) d += `M${pt(x, 0, 0)}L${pt(x, ny, 0)}`;
    for (let y = 1; y < ny; y++) d += `M${pt(0, y, 0)}L${pt(nx, y, 0)}`;
    return g + (d ? `<path class="cb-fg" d="${d}"/>` : '');
  }
  // the cubes back to front (x + y + z grows toward the viewer); a face against another cube is not drawn
  function cubes(hm) {
    const list = [];
    hm.forEach((col, x) => col.forEach((h, y) => { for (let z = 0; z < h; z++) list.push([x, y, z]); }));
    list.sort((a, b) => (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]) || a[2] - b[2]);
    return list.map(([x, y, z]) => {
      let s = '';
      if (H(hm, x + 1, y) <= z) s += poly('cb-r', [[x + 1, y, z + 1], [x + 1, y + 1, z + 1], [x + 1, y + 1, z], [x + 1, y, z]]);
      if (H(hm, x, y + 1) <= z) s += poly('cb-l', [[x, y + 1, z + 1], [x + 1, y + 1, z + 1], [x + 1, y + 1, z], [x, y + 1, z]]);
      if (z + 1 >= hm[x][y]) s += poly('cb-t', [[x, y, z + 1], [x + 1, y, z + 1], [x + 1, y + 1, z + 1], [x, y + 1, z + 1]]);
      return s;
    }).join('');
  }
  function svg(hm, c, cls, top, label) {
    const nx = hm.length, ny = hm[0].length;
    return `<svg class="${cls}" viewBox="${box(nx, ny, top)}" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}>` +
      `<g class="cb-c${c}">${tray(nx, ny)}${cubes(hm)}</g></svg>`;
  }
  const draw = (it, label) => svg(it.hm, it.c, 'cb-svg', Math.max(...it.hm.map(c => Math.max(...c))), label);
  // layer z alone: the columns at least z + 1 tall, one cube high, drawn at the same scale as the other layers
  const layerSvg = (it, z) => svg(it.hm.map(c => c.map(h => h > z ? 1 : 0)), it.c, 'cb-lsvg', 1, '');

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState();
    if (!fit(p, st)) st = fresh();
    let typed = '', busy = 0, alive = true, msg = '', mk = '';
    const N_ = p.items.length;
    const say = (t, kind, speak) => {
      msg = t;
      mk = kind || '';
      const m = el.querySelector('.cb-msg');
      if (m) { m.textContent = t; m.className = 'cb-msg' + (mk ? ' ' + mk : ''); }
      if (speak) api.say(t);
    };
    const boxTxt = () => {
      const b = el.querySelector('.cb-box');
      if (b) { b.textContent = typed || '?'; b.classList.toggle('on', !!typed); }
    };
    function layersHTML(it) {
      if (st.h < 2) return '';
      const L = layers(it.hm);
      return `<div class="cb-layers" role="img" aria-label="The stack layer by layer">` + L.map((n, z) =>
        `<figure class="cb-ly">${layerSvg(it, z)}<figcaption>${z == 0 ? 'Bottom' : z == L.length - 1 ? 'Top' : 'Layer ' + (z + 1)}` +
        `${st.h >= 3 ? `<b>${n}</b>` : ''}</figcaption></figure>`).join('') + '</div>';
    }
    function render() {
      const it = p.items[st.i];
      const dots = p.items.map((_, i) => `<i class="${i < st.i ? 'on' : i == st.i ? 'now' : ''}"></i>`).join('');
      const pad = padHTML('', false).replace('class="keys qpad pad"', 'class="keys qpad pad cb-pad"');
      el.innerHTML = `<div class="cb cb-${p.band}"><div class="cb-say"><p class="cb-msg" aria-live="polite"></p>` +
        `${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'cb-spk' })}</div>` +
        `<div class="cb-main"><div class="cb-board">${draw(it, 'A stack of cubes')}</div>` +
        `<div class="cb-side">${layersHTML(it)}<div class="cb-ans"><span class="cb-dots" role="img" aria-label="Stack ${st.i + 1} of ${N_}">${dots}</span>` +
        `<span class="cb-box" aria-live="polite">?</span><span class="cb-unit">cubes</span></div>${pad}</div></div></div>`;
      el.querySelector('.cb-spk').onclick = () => api.say(msg);
      el.querySelectorAll('.cb-pad .k[data-k]').forEach(b => b.onclick = () => key(b.dataset.k));
      typed = '';
      boxTxt();
      say(msg || 'How many cubes are in the stack?', mk);
    }
    function key(k) {
      if (busy || !alive) return;
      if (k == 'del') { SFX.del(); typed = typed.slice(0, -1); return boxTxt(); }
      if (k != 'go') {
        if (typed.length >= 2 || typed == '0') return;
        SFX.key(+k);
        typed += k;
        return boxTxt();
      }
      if (!typed) return say('Type how many cubes, then tap the tick.', 'try');
      const it = p.items[st.i], b = el.querySelector('.cb-box');
      if (+typed !== it.n) {
        st.miss++;
        api.saveState(st);
        api.sfx.wrong();
        say(+typed < it.n ? `Not ${typed}. Some cubes are hiding. Count again!` : `Not ${typed}. Count each cube just once.`, 'try');
        typed = '';
        boxTxt();
        b.classList.remove('no');
        void b.offsetWidth;
        b.classList.add('no');
        return;
      }
      b.classList.add('ok');
      api.sfx.right(st.i + 3);
      el.querySelector('.cb-board').classList.add('got');
      say(`Yes! ${it.n} cubes.`, 'good');
      const last = st.i == N_ - 1;
      st = { i: st.i + 1, miss: st.miss, h: 0 };
      if (last) {
        api.win({ mistakes: st.miss, note: p.items.map((t, n) => `Stack ${n + 1}: ${t.n} cubes`) });
        return;
      }
      api.saveState(st);
      busy = setTimeout(() => { busy = 0; if (alive) { msg = ''; mk = ''; render(); } }, 1200);
    }
    const hw = e => {
      if (!el.isConnected || document.querySelector('.bt-win,.sheet')) return;
      const k = /^\d$/.test(e.key) ? e.key : e.key == 'Backspace' ? 'del' : e.key == 'Enter' ? 'go' : null;
      if (k) { e.preventDefault(); key(k); }
    };
    document.addEventListener('keydown', hw);
    if (st.h) msg = hintText(p.items[st.i], st.h), mk = 'hint';
    render();
    return {
      hint() {
        if (busy || st.i >= N_ || st.h >= 3) return false;
        st.h++;
        api.saveState(st);
        const it = p.items[st.i];
        if (st.h >= 2) {
          const side = el.querySelector('.cb-side'), old = side.querySelector('.cb-layers');
          if (old) old.remove();
          side.insertAdjacentHTML('afterbegin', layersHTML(it));
        }
        say(hintText(it, st.h), 'hint', true);
        return true;
      },
      destroy() { alive = false; clearTimeout(busy); document.removeEventListener('keydown', hw); },
    };
  }

  return { make, solve, mount, fit, fresh, layers, hintText, count, hidden, valid, readable, TIER, tierOf };
})();

BT.reg({
  id: 'cubes', name: 'Cubes', icon: 'cubes', bands: 'BCD', allow: 1,
  rules: 'Count every cube in the stack, even the ones hiding underneath.',
  make: CUB.make, mount: CUB.mount, solve: CUB.solve,
});
