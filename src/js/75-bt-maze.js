/* ---------- Brain Teasers: Mazes (P3-08; BRAIN_TEASERS.md 5.4, 7, 8) ----------
   A perfect maze (one path between any two cells) from a recursive backtracker; start and goal are the two cells farthest apart
   (two BFS passes), so the way is always long for the size. Built at runtime from the seeded rnd, solvable by construction and
   checked again by a state BFS (the par).

   Bands and levels (MZ.size; four levels per size step; on a phone capped by MZ.cap so squares stay 28 px or more, R-01b):
     A  5x5 (levels 1-6), then 6x6; strong bias toward long straight corridors; wide paths.
     B  8x8, 9x9, 10x10.
     C  12x12, 13x13, 14x14 + 3 stars in dead ends off the way; the flag's gate opens when all 3 are picked up.
     D  16x16, 17x17, 18x18 + keys and doors (1 key on levels 1-6, 2 keys on 7-12). A door sits on the way; its key is at the end
        of a side branch that leaves the way before that door (key 2's branch after door 1). Steps counter with a par.
   The par is the shortest walk that wins: a BFS over (cell, items held), so it includes trips into the star and key branches.

   Puzzle (JSON): {b band, w, h, o: one hex digit per cell, the open sides (1 up, 2 right, 4 down, 8 left), s start, g goal,
     stars: [cells] (C), keys: [cells] and doors: [cells] (D, key i opens door i), par}.
   State (api.saveState): {t: the trail from s (cells), m: items held (bit i = star or key i), dead: dead ends found, steps, mis}.

   Input (one canvas, touch-action none): drag from the bear; the trail follows cell to cell toward the finger and never crosses a
   wall; dragging back over the trail erases it; lifting the finger keeps the place. A tap on a cell in a straight open line from
   the bear walks there, a tap on the trail goes back to that spot. The Arrows button shows a 4-arrow pad (remembered in
   S.bt.maze.pad); the keyboard arrows work too. Items picked up stay picked up when the trail is erased.
   Mistakes: each dead end reached that holds nothing (start, flag, stars and keys are not mistakes). The type allows 2.
   Hints: 1) an arrow flashes toward the next thing to reach (the flag, or the next star or key). 2) dots on the next 5 cells of the
   route. 3) dots on the route through the next junction and one cell past it (at least as many as tier 2). Hints never show the
   cell the route ends on, so a hint never draws the whole way.
   Drawing: a static layer (floor and walls, merged into long strokes, three passes: shade, base, highlight; light from the top
   left) is drawn once per size; each move redraws only the dynamic layer over it. Colours are read from the tokens. */
const MZ = {
  DX: [0, 1, 0, -1], DY: [-1, 0, 1, 0], BIT: [1, 2, 4, 8], DIR: ['up', 'right', 'down', 'left'],
  HEX: '0123456789abcdef',
  BIAS: { A: 0.7, B: 0.35, C: 0.2, D: 0.12 }, // chance to keep going straight while carving
  HUE: { A: 'green', B: 'green', C: 'blue', D: 'purple' }, // wall colour by band
  KEY_HUE: ['yellow', 'aqua'],
  cur: null, // the maze on screen (for the smoke bot): {p, st, at(cell), draw()}

  size(band, level) {
    const l = Math.max(1, Math.min(12, +level || 1));
    if (band == 'A') return l <= 6 ? 5 : 6;
    const base = { B: 8, C: 12, D: 16 }[band] || 8;
    return base + Math.floor((l - 1) / 4);
  },
  // R-01b: on a phone a maze is never so big that its squares are under MIN_PX (BRAIN_TEASERS 8: 28 px). make() caps the side by
  // the screen: the board gets about the short side less 40 px (portrait) or the height less 130 px (landscape), with an 8 px
  // margin on each side. At 380 x 780 that is 11 squares (bands C and D are 12-18). Tablets (short side 600 px and up) and the
  // tests (no screen) keep the level's size. The puzzle is stored whole, so a turned phone does not change a maze in play.
  MIN_PX: 28,
  cap() {
    if (typeof innerWidth != 'number' || typeof innerHeight != 'number' || !(innerWidth > 0) || !(innerHeight > 0)) return 99;
    const w = innerWidth, h = innerHeight;
    if (Math.min(w, h) >= 600) return 99;
    const bs = h >= w ? w - 40 : h - 130;
    return Math.max(5, Math.floor((bs - 16) / MZ.MIN_PX));
  },
  pop: m => (m & 1) + (m >> 1 & 1) + (m >> 2 & 1) + (m >> 3 & 1),
  decode: s => Array.from(s, c => parseInt(c, 16)),

  // Recursive backtracker (iterative). Returns the open-sides bitmask of every cell.
  carve(w, h, rnd, bias) {
    const N = w * h, o = new Array(N).fill(0), seen = new Uint8Array(N);
    const first = Math.floor(rnd() * N), stack = [first], last = [-1];
    seen[first] = 1;
    while (stack.length) {
      const c = stack[stack.length - 1], x = c % w, y = (c - x) / w, opts = [];
      for (let d = 0; d < 4; d++) {
        const nx = x + MZ.DX[d], ny = y + MZ.DY[d];
        if (nx >= 0 && ny >= 0 && nx < w && ny < h && !seen[ny * w + nx]) opts.push(d);
      }
      if (!opts.length) { stack.pop(); last.pop(); continue; }
      const ld = last[last.length - 1];
      const d = ld >= 0 && opts.includes(ld) && rnd() < bias ? ld : opts[Math.floor(rnd() * opts.length)];
      const n = c + MZ.DX[d] + MZ.DY[d] * w;
      o[c] |= MZ.BIT[d];
      o[n] |= MZ.BIT[(d + 2) % 4];
      seen[n] = 1;
      stack.push(n);
      last.push(d);
    }
    return o;
  },
  // neighbours through open sides
  nbrs(o, w, c) {
    const out = [];
    for (let d = 0; d < 4; d++) if (o[c] & MZ.BIT[d]) out.push(c + MZ.DX[d] + MZ.DY[d] * w);
    return out;
  },
  // plain BFS: {dist, prev}
  bfs(o, w, from) {
    const N = o.length, dist = new Array(N).fill(-1), prev = new Array(N).fill(-1), q = [from];
    dist[from] = 0;
    for (let i = 0; i < q.length; i++) {
      const c = q[i];
      for (const n of MZ.nbrs(o, w, c)) if (dist[n] < 0) { dist[n] = dist[c] + 1; prev[n] = c; q.push(n); }
    }
    return { dist, prev };
  },
  far(dist) { let b = 0; for (let i = 1; i < dist.length; i++) if (dist[i] > dist[b]) b = i; return b; },

  items: p => p.stars || p.keys || [],

  // Shortest winning walk from `from` holding items `mask`: a BFS over (cell, items held). Returns the cells (from first) or null.
  // Rules: door i needs key i; in band C the flag's cell opens when every star is held; stepping on an item picks it up.
  route(p, o, from = p.s, mask = 0) {
    const w = p.w, N = w * p.h, items = MZ.items(p), M = 1 << items.length, full = M - 1;
    const itemAt = new Array(N).fill(-1), doorAt = new Array(N).fill(-1);
    items.forEach((c, i) => { itemAt[c] = i; });
    (p.doors || []).forEach((c, i) => { doorAt[c] = i; });
    const m0 = mask | (itemAt[from] >= 0 ? 1 << itemAt[from] : 0), prev = new Int32Array(N * M).fill(-2), q = [from * M + m0];
    prev[q[0]] = -1;
    for (let i = 0; i < q.length; i++) {
      const s = q[i], c = Math.floor(s / M), m = s % M;
      if (c == p.g && (!p.stars || m == full)) {
        const out = [];
        for (let t = s; t >= 0; t = prev[t]) out.push(Math.floor(t / M));
        return out.reverse();
      }
      for (const n of MZ.nbrs(o, w, c)) {
        if (doorAt[n] >= 0 && !(m >> doorAt[n] & 1)) continue;
        if (p.stars && n == p.g && m != full) continue;
        const nm = m | (itemAt[n] >= 0 ? 1 << itemAt[n] : 0), ns = n * M + nm;
        if (prev[ns] != -2) continue;
        prev[ns] = s;
        q.push(ns);
      }
    }
    return null;
  },

  // Build a level. Returns the puzzle or null (the caller carves again with the next numbers from rnd).
  build(band, level, rnd) {
    const n = Math.min(MZ.size(band, level), MZ.cap()), w = n, h = n, N = w * h;
    const o = MZ.carve(w, h, rnd, Math.max(0.05, MZ.BIAS[band] - (level - 1) * 0.01));
    let s = MZ.far(MZ.bfs(o, w, 0).dist);
    const b1 = MZ.bfs(o, w, s);
    let g = MZ.far(b1.dist);
    const xy = c => c % w + Math.floor(c / w);
    if (xy(g) < xy(s)) [s, g] = [g, s]; // the start is the end nearer the top left
    const way = [];
    for (let c = MZ.bfs(o, w, s).prev, t = g; t >= 0; t = c[t]) way.push(t);
    way.reverse();
    // every cell off the way: where its branch leaves the way (index on the way) and how deep it lies
    const at = new Array(N).fill(-1), dep = new Array(N).fill(0), q = way.slice();
    way.forEach((c, i) => { at[c] = i; });
    for (let i = 0; i < q.length; i++) for (const nb of MZ.nbrs(o, w, q[i])) if (at[nb] < 0) { at[nb] = at[q[i]]; dep[nb] = dep[q[i]] + 1; q.push(nb); }
    const leaves = [];
    for (let c = 0; c < N; c++) if (MZ.pop(o[c]) == 1 && c != s && c != g) leaves.push(c);
    const p = { b: band, w, h, o: o.map(m => MZ.HEX[m]).join(''), s, g };
    // closest to a wanted depth, with a little seeded jitter
    const byDepth = (cs, want) => cs.map(c => [Math.abs(dep[c] - want) + rnd() * 1.5, c]).sort((a, b) => a[0] - b[0]).map(e => e[1]);
    if (band == 'C') {
      const cand = byDepth(leaves, 1.5 + level * 0.55), md = (a, b) => Math.abs(a % w - b % w) + Math.abs(Math.floor(a / w) - Math.floor(b / w));
      let stars = null;
      for (const [minDep, gap, ownBranch] of [[2, 3, true], [2, 2, false], [1, 1, false]]) {
        const got = [];
        for (const c of cand) {
          if (dep[c] < minDep || got.some(x => md(x, c) < gap || (ownBranch && at[x] == at[c]))) continue;
          got.push(c);
          if (got.length == 3) break;
        }
        if (got.length == 3) { stars = got; break; }
      }
      if (!stars) return null;
      p.stars = stars.sort((a, b) => a - b);
    }
    if (band == 'D') {
      const L = way.length, nk = level <= 6 ? 1 : 2, spans = nk == 1 ? [[0.45, 0.7]] : [[0.3, 0.45], [0.65, 0.82]];
      const keys = [], doors = [];
      let lo = 0;
      for (const [a, b] of spans) {
        const idx = [];
        for (let i = Math.max(2, Math.ceil(L * a)); i <= Math.min(L - 3, Math.floor(L * b)); i++) if (MZ.pop(o[way[i]]) == 2) idx.push(i);
        let ok = false;
        for (const i of idx.map(i => [rnd(), i]).sort((x, y) => x[0] - y[0]).map(e => e[1])) {
          const cand = byDepth(leaves.filter(c => at[c] >= lo && at[c] < i && dep[c] >= 2), 2 + level * 0.5);
          if (!cand.length) continue;
          keys.push(cand[0]);
          doors.push(way[i]);
          lo = i + 1;
          ok = true;
          break;
        }
        if (!ok) return null;
      }
      p.keys = keys;
      p.doors = doors;
    }
    const r = MZ.route(p, o);
    if (!r) return null;
    p.par = r.length - 1;
    return p;
  },

  // the cells a hint draws for tier 2 or 3, from a route (head first); never the route's last cell
  hintCells(o, route, tier) {
    const end = route.length - 1;
    if (end < 2) return [];
    let n = 6;
    if (tier >= 3) {
      let j = 1;
      while (j < end && MZ.pop(o[route[j]]) < 3) j++;
      n = Math.max(6, j + 2);
    }
    return route.slice(1, Math.min(n, end));
  },
  // what tier 1 points at: the first star or key still to pick up on the route, else the flag
  target(p, route, mask) {
    const items = MZ.items(p);
    for (let i = 1; i < route.length; i++) {
      const k = items.indexOf(route[i]);
      if (k >= 0 && !(mask >> k & 1)) return { c: route[i], kind: p.stars ? 'star' : 'key', k };
    }
    return { c: p.g, kind: 'flag', k: -1 };
  },
  // a saved state that fits this puzzle, or null
  fit(sv, p, o) {
    if (!sv || !Array.isArray(sv.t) || !sv.t.length || sv.t[0] !== p.s) return null;
    for (let i = 1; i < sv.t.length; i++) if (!MZ.nbrs(o, p.w, sv.t[i - 1]).includes(sv.t[i])) return null;
    return { t: sv.t.slice(), m: +sv.m | 0, dead: Array.isArray(sv.dead) ? sv.dead.filter(c => c >= 0 && c < o.length) : [], steps: +sv.steps | 0, mis: +sv.mis | 0 };
  },

  // small inline pictures for the side panel (tokens only)
  keySvg(k, on) {
    const hu = MZ.KEY_HUE[k] || 'yellow', bow = k ? '<rect x="4" y="9" width="12" height="12" rx="3" fill="none" stroke-width="5"/>'
      : '<circle cx="10" cy="15" r="6" fill="none" stroke-width="5"/>';
    return `<svg class="mz-key${on ? ' on' : ''}" viewBox="0 0 40 30" width="40" height="30" aria-hidden="true"><g stroke="var(--ill-${hu}-3)" ` +
      `transform="translate(1 1.5)">${bow}<path d="M16 15H36M30 15V22M35 15V20" fill="none" stroke-width="5" stroke-linecap="round"/></g>` +
      `<g stroke="var(--ill-${hu})">${bow}<path d="M16 15H36M30 15V22M35 15V20" fill="none" stroke-width="5" stroke-linecap="round"/></g></svg>`;
  },
  flagSvg() {
    return '<svg class="mz-fl" viewBox="0 0 30 30" width="30" height="30" aria-hidden="true"><ellipse cx="11" cy="26" rx="8" ry="3" fill="var(--ill-green-2)"/>' +
      '<path d="M9 26V4" stroke="var(--ill-grey-3)" stroke-width="3" stroke-linecap="round"/><path d="M10 4H25L21 9.5L25 15H10Z" fill="var(--ill-red-2)"/>' +
      '<path d="M10 4H24L20.5 9H10Z" fill="var(--ill-red)"/></svg>';
  },
};

BT.reg({
  id: 'maze', name: 'Mazes', icon: 'maze', bands: 'ABCD', allow: 2,
  rules: 'Drag the bear along the paths to the flag. Walls block the way.',
  make(band, level, rnd) {
    for (let t = 0; t < 40; t++) {
      const p = MZ.build(band, level, rnd);
      if (p) return p;
    }
    throw new Error('maze: no layout for ' + band + level);
  },
  solve(p) { return MZ.route(p, MZ.decode(p.o)); },

  mount(el, p, api) {
    const band = p.b || api.band, w = p.w, h = p.h, o = MZ.decode(p.o), items = MZ.items(p), full = (1 << items.length) - 1;
    const doorAt = c => (p.doors || []).indexOf(c), itemAt = c => items.indexOf(c);
    const st = MZ.fit(api.loadState(), p, o) || { t: [p.s], m: 0, dead: [], steps: 0, mis: 0 };
    const padOn = !!(BT.st().maze && BT.st().maze.pad);
    let won = false, dirty = false, raf = 0, hintT = 0, arrowT = 0, hint = [], drag = null, flash = -1;
    const timers = new Set(), later = (f, ms) => { const t = setTimeout(() => { timers.delete(t); f(); }, ms); timers.add(t); return t; };

    // ---- markup ----
    const goalLine = p.stars ? `<span class="mz-sts">${p.stars.map((c, i) => ico('star', 30, 'mz-st' + (st.m >> i & 1 ? ' on' : ''))).join('')}</span><b class="mz-n"></b>`
      : p.keys ? `<span class="mz-keys">${p.keys.map((c, i) => MZ.keySvg(i, st.m >> i & 1)).join('')}</span><span class="mz-steps">Steps <b class="mz-sn">0</b> <i>Par ${p.par}</i></span>`
      : `${MZ.flagSvg()}<b class="mz-n">Get to the flag</b>`;
    const ab = (d, ic) => UI.ibtn(ic, 'Go ' + MZ.DIR[d], { cls: 'mz-ab', attrs: `data-d="${d}"` });
    el.innerHTML = `<div class="mz mz-${band}"><div class="mz-board"><canvas class="mz-cv" role="img" aria-label="Maze"></canvas>` +
      `<span class="mz-arrow" hidden></span></div><div class="mz-side"><div class="mz-stat">${goalLine}</div>` +
      `<p class="mz-msg" role="status" aria-live="polite"></p><div class="mz-ctl">` +
      `${UI.btn('Arrows', { icon: 'gamepad', cls: 'mz-tog', attrs: `aria-pressed="${padOn}"` })}` +
      `<div class="mz-pad"${padOn ? '' : ' hidden'}>${ab(0, 'arrow-up')}${ab(3, 'arrow-left')}${ab(2, 'arrow-down')}${ab(1, 'arrow-right')}</div></div></div></div>`;
    const root = el.querySelector('.mz'), cv = root.querySelector('.mz-cv'), ctx = cv.getContext('2d'), msgEl = root.querySelector('.mz-msg');
    const arrow = root.querySelector('.mz-arrow'), side = root.querySelector('.mz-side'), pad = root.querySelector('.mz-pad');
    const css = getComputedStyle(document.documentElement), tok = n => css.getPropertyValue('--' + n).trim() || 'gray';
    const hue = MZ.HUE[band] || 'green';
    const C = {
      floor: tok('ill-cream-1'), floor2: tok('ill-cream'), w1: tok(`ill-${hue}-1`), w: tok(`ill-${hue}`), w2: tok(`ill-${hue}-2`), w3: tok(`ill-${hue}-3`),
      trail: tok('ill-orange'), trail1: tok('ill-orange-1'), trail2: tok('ill-orange-2'), drop: tok('drop'), ink: tok('ill-ink'), white: tok('ill-white'),
      b: tok('ill-brown'), b1: tok('ill-brown-1'), b2: tok('ill-brown-2'), b3: tok('ill-brown-3'), tan: tok('ill-tan-1'), pink: tok('ill-pink'),
      y: tok('ill-yellow'), y1: tok('ill-yellow-1'), y3: tok('ill-yellow-3'), red: tok('ill-red'), red2: tok('ill-red-2'), red1: tok('ill-red-1'),
      g1: tok('ill-green-1'), g: tok('ill-green'), g2: tok('ill-green-2'), grey: tok('ill-grey-1'), grey2: tok('ill-grey-2'), grey3: tok('ill-grey-3'),
      try: tok('try'), tryt: tok('try-tint'), star: tok('star'), starS: tok('star-shade'),
    };
    const KC = MZ.KEY_HUE.map(k => ({ c1: tok(`ill-${k}-1`), c: tok(`ill-${k}`), c2: tok(`ill-${k}-2`), c3: tok(`ill-${k}-3`) }));

    // ---- geometry ----
    let cs = 40, M0 = 10, size = 0, dpr = 1, bg = null;
    const head = () => st.t[st.t.length - 1];
    const cx = c => M0 + (c % w + 0.5) * cs, cy = c => M0 + (Math.floor(c / w) + 0.5) * cs;
    function layout() {
      const ps = getComputedStyle(el), aw = el.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
      const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
      const land = aw > ah * 1.25;
      root.classList.toggle('land', land);
      let bs = land ? Math.min(ah, aw - side.offsetWidth - 16) : Math.min(aw, ah - side.offsetHeight - 12); // the board's side
      bs = Math.max(150, Math.min(bs, 760));
      M0 = bs < 400 ? 8 : 12;
      cs = Math.min(96, Math.floor((bs - 2 * M0) / Math.max(w, h)));
      size = cs * Math.max(w, h) + 2 * M0;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.style.width = cv.style.height = size + 'px';
      cv.width = cv.height = Math.round(size * dpr);
      bg = null;
      draw();
    }
    // the static layer: floor and walls
    function paintBg() {
      bg = document.createElement('canvas');
      bg.width = bg.height = cv.width;
      const g = bg.getContext('2d');
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.fillStyle = C.floor;
      g.fillRect(0, 0, size, size);
      // a soft warm band along the lower right inside edge, so the floor sits below the outer wall
      g.fillStyle = C.floor2;
      g.fillRect(M0, size - M0 - cs * 0.18, size - 2 * M0, cs * 0.18);
      g.fillRect(size - M0 - cs * 0.18, M0, cs * 0.18, size - 2 * M0);
      // walls merged into long runs
      const segs = [], X = i => M0 + i * cs;
      for (let y = 0; y <= h; y++) {
        let s0 = -1;
        for (let x = 0; x <= w; x++) {
          const on = x < w && (y == 0 || y == h || !(o[(y - 1) * w + x] & 4));
          if (on && s0 < 0) s0 = x;
          if (!on && s0 >= 0) { segs.push([X(s0), X(y), X(x), X(y)]); s0 = -1; }
        }
      }
      for (let x = 0; x <= w; x++) {
        let s0 = -1;
        for (let y = 0; y <= h; y++) {
          const on = y < h && (x == 0 || x == w || !(o[y * w + x - 1] & 2));
          if (on && s0 < 0) s0 = y;
          if (!on && s0 >= 0) { segs.push([X(x), X(s0), X(x), X(y)]); s0 = -1; }
        }
      }
      const t = Math.max(4, Math.min(12, cs * 0.22));
      const stroke = (dx, dy, lw, col) => {
        g.beginPath();
        for (const s of segs) { g.moveTo(s[0] + dx, s[1] + dy); g.lineTo(s[2] + dx, s[3] + dy); }
        g.lineWidth = lw;
        g.strokeStyle = col;
        g.stroke();
      };
      g.lineCap = g.lineJoin = 'round';
      stroke(t * 0.3, t * 0.45, t * 1.15, C.drop); // contact shadow on the floor
      stroke(t * 0.16, t * 0.24, t, C.w3); // shade side (lower right)
      stroke(0, 0, t, C.w); // base
      stroke(-t * 0.16, -t * 0.18, t * 0.38, C.w1); // highlight (upper left)
    }

    // ---- drawing helpers (dynamic layer) ----
    const circ = (x, y, r, col) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill(); };
    const ell = (x, y, rx, ry, col) => { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill(); };
    const rrect = (x, y, ww, hh, r, col) => {
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, ww, hh, r); else ctx.rect(x, y, ww, hh);
      ctx.fillStyle = col;
      ctx.fill();
    };
    function starPath(x, y, r) {
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.48 : r;
        ctx[i ? 'lineTo' : 'moveTo'](x + Math.cos(a) * rr, y + Math.sin(a) * rr);
      }
      ctx.closePath();
    }
    function star(x, y, r) {
      ctx.lineJoin = 'round';
      ctx.lineWidth = r * 0.22;
      starPath(x + r * 0.1, y + r * 0.14, r);
      ctx.fillStyle = ctx.strokeStyle = C.y3;
      ctx.fill(); ctx.stroke();
      starPath(x, y, r);
      ctx.fillStyle = ctx.strokeStyle = C.y;
      ctx.fill(); ctx.stroke();
      ell(x - r * 0.22, y - r * 0.2, r * 0.2, r * 0.13, C.y1);
    }
    function key(x, y, r, k) {
      const K = KC[k] || KC[0], lw = Math.max(2.5, r * 0.36);
      const one = (dx, dy, col) => {
        ctx.save();
        ctx.translate(x + dx, y + dy);
        ctx.rotate(-Math.PI / 4);
        ctx.strokeStyle = col;
        ctx.lineWidth = lw;
        ctx.lineCap = ctx.lineJoin = 'round';
        ctx.beginPath();
        if (k) ctx.rect(-r * 0.95, -r * 0.38, r * 0.76, r * 0.76); else ctx.arc(-r * 0.58, 0, r * 0.38, 0, Math.PI * 2);
        ctx.moveTo(-r * 0.2, 0); ctx.lineTo(r * 0.95, 0);
        ctx.moveTo(r * 0.55, 0); ctx.lineTo(r * 0.55, r * 0.4);
        ctx.moveTo(r * 0.9, 0); ctx.lineTo(r * 0.9, r * 0.3);
        ctx.stroke();
        ctx.restore();
      };
      one(r * 0.1, r * 0.14, K.c3);
      one(0, 0, K.c);
    }
    function door(c, k, open) {
      const K = KC[k] || KC[0], x = M0 + (c % w) * cs, y = M0 + Math.floor(c / w) * cs, i = cs * 0.1, s = cs - 2 * i;
      if (open) {
        ctx.globalAlpha = 0.35;
        rrect(x + i, y + i, s, s, cs * 0.14, K.c1);
        ctx.globalAlpha = 1;
        return;
      }
      rrect(x + i + cs * 0.04, y + i + cs * 0.06, s, s, cs * 0.14, K.c3);
      rrect(x + i, y + i, s, s, cs * 0.14, K.c2);
      rrect(x + i + s * 0.1, y + i + s * 0.08, s * 0.8, s * 0.8, cs * 0.1, K.c);
      ctx.fillStyle = K.c3;
      for (const f of [0.36, 0.64]) ctx.fillRect(x + i + s * f - cs * 0.02, y + i + s * 0.12, cs * 0.04, s * 0.72);
      // the keyhole has the shape of its key's bow (round or square), so colour is not the only cue
      const kx = x + cs / 2, ky = y + cs / 2 - cs * 0.04;
      ctx.fillStyle = C.ink;
      if (k) rrect(kx - cs * 0.13, ky - cs * 0.15, cs * 0.26, cs * 0.26, cs * 0.04, C.ink); else circ(kx, ky - cs * 0.02, cs * 0.14, C.ink);
      ctx.fillStyle = C.ink;
      ctx.fillRect(kx - cs * 0.04, ky + cs * 0.04, cs * 0.08, cs * 0.18);
    }
    function flag(c, locked) {
      const x = cx(c), y = cy(c), r = cs * 0.5;
      circ(x, y, cs * 0.4, C.g1);
      ell(x, y + r * 0.62, r * 0.85, r * 0.32, C.g2);
      ell(x - r * 0.06, y + r * 0.56, r * 0.72, r * 0.24, C.g);
      ctx.strokeStyle = C.grey3;
      ctx.lineCap = 'round';
      ctx.lineWidth = Math.max(2, r * 0.16);
      ctx.beginPath(); ctx.moveTo(x - r * 0.35, y + r * 0.6); ctx.lineTo(x - r * 0.35, y - r * 0.85); ctx.stroke();
      const fl = (dx, dy, col) => {
        ctx.beginPath();
        ctx.moveTo(x - r * 0.3 + dx, y - r * 0.85 + dy); ctx.lineTo(x + r * 0.75 + dx, y - r * 0.85 + dy);
        ctx.lineTo(x + r * 0.45 + dx, y - r * 0.5 + dy); ctx.lineTo(x + r * 0.75 + dx, y - r * 0.12 + dy); ctx.lineTo(x - r * 0.3 + dx, y - r * 0.12 + dy);
        ctx.closePath(); ctx.fillStyle = col; ctx.fill();
      };
      fl(r * 0.06, r * 0.08, C.red2);
      fl(0, 0, C.red);
      ell(x, y - r * 0.68, r * 0.22, r * 0.08, C.red1);
      if (locked) { // the gate: bars across the cell until every star is picked up
        ctx.strokeStyle = C.grey3;
        ctx.lineWidth = Math.max(2, cs * 0.08);
        ctx.beginPath();
        for (const f of [-0.3, 0, 0.3]) { ctx.moveTo(x + f * cs, y - cs * 0.4); ctx.lineTo(x + f * cs, y + cs * 0.4); }
        ctx.moveTo(x - cs * 0.4, y - cs * 0.12); ctx.lineTo(x + cs * 0.4, y - cs * 0.12);
        ctx.stroke();
        ctx.strokeStyle = C.grey;
        ctx.lineWidth = Math.max(1, cs * 0.03);
        ctx.beginPath();
        for (const f of [-0.3, 0, 0.3]) { ctx.moveTo(x + f * cs - cs * 0.02, y - cs * 0.38); ctx.lineTo(x + f * cs - cs * 0.02, y + cs * 0.38); }
        ctx.stroke();
      }
    }
    // the bear cub (light from the top left: shade crescent lower right, highlight upper left)
    function cub(x, y, r) {
      ell(x + r * 0.1, y + r * 0.95, r * 0.8, r * 0.22, C.drop);
      for (const s of [-1, 1]) { circ(x + s * r * 0.66 + r * 0.05, y - r * 0.62 + r * 0.06, r * 0.36, C.b3); circ(x + s * r * 0.66, y - r * 0.62, r * 0.33, C.b2); circ(x + s * r * 0.66, y - r * 0.62, r * 0.16, C.tan); }
      circ(x + r * 0.06, y + r * 0.08, r, C.b2);
      circ(x - r * 0.04, y - r * 0.02, r * 0.9, C.b);
      ell(x - r * 0.38, y - r * 0.5, r * 0.26, r * 0.14, C.b1);
      ell(x, y + r * 0.34, r * 0.44, r * 0.32, C.tan);
      ell(x, y + r * 0.2, r * 0.15, r * 0.11, C.ink);
      for (const s of [-1, 1]) {
        circ(x + s * r * 0.34, y - r * 0.1, r * 0.13, C.ink);
        circ(x + s * r * 0.34 - r * 0.04, y - r * 0.15, r * 0.05, C.white);
        ctx.globalAlpha = 0.55;
        circ(x + s * r * 0.62, y + r * 0.22, r * 0.12, C.pink);
        ctx.globalAlpha = 1;
      }
    }

    function draw() {
      if (!size) return 0;
      const t0 = performance.now();
      if (!bg) paintBg();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(bg, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // start pad
      circ(cx(p.s) + cs * 0.03, cy(p.s) + cs * 0.05, cs * 0.4, C.grey2);
      circ(cx(p.s), cy(p.s), cs * 0.38, C.grey);
      circ(cx(p.s), cy(p.s), cs * 0.25, C.g1);
      // dead ends found (amber, kind)
      for (const c of st.dead) {
        const x = M0 + (c % w) * cs, y = M0 + Math.floor(c / w) * cs;
        rrect(x + cs * 0.14, y + cs * 0.14, cs * 0.72, cs * 0.72, cs * 0.16, c == flash ? C.try : C.tryt);
      }
      (p.doors || []).forEach((c, k) => door(c, k, st.m >> k & 1));
      items.forEach((c, k) => {
        if (st.m >> k & 1) return;
        if (p.stars) star(cx(c), cy(c), cs * 0.44); else key(cx(c), cy(c), cs * 0.5, k);
      });
      flag(p.g, p.stars && st.m != full);
      // the trail: a round tube with a highlight toward the light
      if (st.t.length > 1) {
        ctx.lineCap = ctx.lineJoin = 'round';
        const line = (dx, dy, lw, col) => {
          ctx.beginPath();
          st.t.forEach((c, i) => ctx[i ? 'lineTo' : 'moveTo'](cx(c) + dx, cy(c) + dy));
          ctx.lineWidth = lw;
          ctx.strokeStyle = col;
          ctx.stroke();
        };
        line(cs * 0.04, cs * 0.06, cs * 0.34, C.trail2);
        line(0, 0, cs * 0.3, C.trail);
        line(-cs * 0.05, -cs * 0.05, cs * 0.09, C.trail1);
      }
      // hint dots
      hint.forEach((c, i) => {
        circ(cx(c) + cs * 0.03, cy(c) + cs * 0.04, cs * 0.17, C.starS);
        circ(cx(c), cy(c), cs * (i == hint.length - 1 ? 0.17 : 0.14), C.star);
      });
      cub(cx(head()), cy(head()), cs * 0.5);
      return performance.now() - t0;
    }
    const redraw = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; draw(); }); };

    // ---- status line ----
    const msg = t => { msgEl.textContent = t; };
    function status() {
      if (p.stars) {
        const n = items.filter((c, k) => st.m >> k & 1).length;
        root.querySelectorAll('.mz-st').forEach((e, k) => e.classList.toggle('on', !!(st.m >> k & 1)));
        root.querySelector('.mz-n').textContent = `${n} of ${items.length}`;
      }
      if (p.keys) {
        root.querySelectorAll('.mz-key').forEach((e, k) => e.classList.toggle('on', !!(st.m >> k & 1)));
        root.querySelector('.mz-sn').textContent = st.steps;
      }
    }
    const intro = { A: 'Drag the bear to the flag.', B: 'Drag the bear to the flag.', C: 'Pick up the 3 stars. Then the gate opens.',
      D: items.length > 1 ? 'Find the keys. Each one opens its own door.' : 'Find the key to open the door.' }[band];

    // ---- moving ----
    const save = () => { if (!won) { dirty = false; api.saveState(st); } };
    const nbIn = (c, d) => (o[c] & MZ.BIT[d]) ? c + MZ.DX[d] + MZ.DY[d] * w : -1;
    let told = '';
    function tell(t, speak) { if (told == t) return; told = t; msg(t); if (speak) api.say(t); }
    // one step in direction d: 'ok', 'wall', 'shut' (a door or the gate) or 'won'
    function move(d) {
      if (won) return 'won';
      const c = head(), n = nbIn(c, d);
      if (n < 0) return 'wall';
      arrow.hidden = true; // the hint arrow points from where the bear was
      if (st.t.length > 1 && st.t[st.t.length - 2] == n) { // back over the trail: erase
        st.t.pop();
        dirty = true;
        redraw();
        return 'ok';
      }
      const dk = doorAt(n);
      if (dk >= 0 && !(st.m >> dk & 1)) {
        api.sfx.rattle();
        tell(items.length > 1 ? `This door needs key ${dk + 1}.` : 'This door needs the key.', true);
        return 'shut';
      }
      if (p.stars && n == p.g && st.m != full) {
        api.sfx.rattle();
        tell('Pick up all 3 stars to open the gate.', true);
        return 'shut';
      }
      st.t.push(n);
      st.steps++;
      dirty = true;
      const ik = itemAt(n);
      if (ik >= 0 && !(st.m >> ik & 1)) {
        st.m |= 1 << ik;
        if (p.stars) { api.sfx.coin(); tell(st.m == full ? 'All the stars! The gate is open.' : 'You found a star!'); }
        else { api.sfx.magic(); tell(items.length > 1 ? `You found key ${ik + 1}!` : 'You found the key!'); }
      } else if (dk >= 0) { api.sfx.open(); tell('The door opens!'); }
      else if (MZ.pop(o[n]) == 1 && n != p.g && ik < 0 && !st.dead.includes(n)) {
        st.dead.push(n);
        st.mis++;
        flash = n;
        later(() => { flash = -1; redraw(); }, 700);
        api.sfx.wrong();
        tell('Dead end. Go back!');
      }
      status();
      redraw();
      if (n == p.g) {
        won = true;
        hint = [];
        api.saveState(st);
        msg('You made it!');
        api.win({ mistakes: st.mis });
        return 'won';
      }
      return 'ok';
    }
    // walk toward cell T along open sides, one cell at a time, never away from it (the finger leads the bear)
    function toward(T) {
      for (let k = 0; k < 64 && !won; k++) {
        const c = head();
        if (c == T) return;
        const dx = T % w - c % w, dy = Math.floor(T / w) - Math.floor(c / w);
        const hx = dx ? (dx > 0 ? 1 : 3) : -1, vy = dy ? (dy > 0 ? 2 : 0) : -1;
        let moved = false;
        for (const d of Math.abs(dx) >= Math.abs(dy) ? [hx, vy] : [vy, hx]) {
          if (d < 0) continue;
          const r = move(d);
          if (r == 'ok' || r == 'won') { moved = true; break; }
        }
        if (!moved) return;
      }
    }
    const cellAt = e => {
      const r = cv.getBoundingClientRect(), x = Math.floor((e.clientX - r.left - M0) / cs), y = Math.floor((e.clientY - r.top - M0) / cs);
      return x < 0 || y < 0 || x >= w || y >= h ? -1 : y * w + x;
    };
    const nearHead = e => {
      const r = cv.getBoundingClientRect(), x = e.clientX - r.left - cx(head()), y = e.clientY - r.top - cy(head());
      return Math.hypot(x, y) <= Math.max(cs * 1.25, 34);
    };
    // a tap: back to a spot on the trail, or along a straight open corridor
    function tap(T) {
      if (T < 0 || T == head()) return;
      const i = st.t.indexOf(T);
      if (i >= 0) { while (head() != T) move(dirTo(head(), st.t[st.t.length - 2])); return; }
      const c = head(), dx = T % w - c % w, dy = Math.floor(T / w) - Math.floor(c / w);
      if (dx && dy) return tell('Drag the bear, or tap a spot in a straight line.');
      const d = dx > 0 ? 1 : dx < 0 ? 3 : dy > 0 ? 2 : 0;
      for (let k = c; k != T; k = nbIn(k, d)) if (nbIn(k, d) < 0) return tell('A wall is in the way.');
      while (head() != T && !won) if (move(d) != 'ok' && !won) break;
    }
    const dirTo = (a, b) => b - a == 1 ? 1 : b - a == -1 ? 3 : b > a ? 2 : 0;

    cv.addEventListener('pointerdown', e => {
      if (won || drag) return;
      e.preventDefault();
      try { cv.setPointerCapture(e.pointerId); } catch (er) {}
      told = '';
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, on: nearHead(e), moved: false };
      if (drag.on) { const T = cellAt(e); if (T >= 0) toward(T); }
    });
    cv.addEventListener('pointermove', e => {
      if (!drag || e.pointerId != drag.id) return;
      if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 8) drag.moved = true;
      if (drag.on) { const T = cellAt(e); if (T >= 0) toward(T); }
    });
    const up = e => {
      if (!drag || e.pointerId != drag.id) return;
      const d = drag;
      drag = null;
      if (!d.on && !d.moved && e.type == 'pointerup') tap(cellAt(e));
      else if (!d.on && d.moved) tell('Start the drag on the bear.');
      if (dirty) save();
    };
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', up);
    root.querySelectorAll('.mz-ab').forEach(b => b.onclick = () => { told = ''; move(+b.dataset.d); if (dirty) save(); });
    const keyd = e => {
      const d = { ArrowUp: 0, ArrowRight: 1, ArrowDown: 2, ArrowLeft: 3 }[e.key];
      if (d == null || !cv.isConnected || $('.ovl')) return;
      e.preventDefault();
      told = '';
      move(d);
      if (dirty) save();
    };
    document.addEventListener('keydown', keyd);
    root.querySelector('.mz-tog').onclick = () => {
      const on = pad.hidden;
      pad.hidden = !on;
      root.querySelector('.mz-tog').setAttribute('aria-pressed', on);
      const t = BT.st();
      BT.rec('maze', band, true);
      t.maze.pad = on ? 1 : 0;
      api.sfx.click();
      layout();
      save();
    };
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(layout, 120); };
    window.addEventListener('resize', onResize);

    // ---- hints ----
    function hintNow(tier) {
      if (won) return false;
      const r = MZ.route(p, o, head(), st.m);
      if (!r || r.length < 2) return false;
      clearTimeout(hintT);
      clearTimeout(arrowT);
      const cells = tier >= 2 ? MZ.hintCells(o, r, tier) : [];
      if (tier == 1 || !cells.length) {
        const tg = MZ.target(p, r, st.m), c = head(), dx = tg.c % w - c % w, dy = Math.floor(tg.c / w) - Math.floor(c / w);
        const d = Math.abs(dx) >= Math.abs(dy) ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0);
        const what = tg.kind == 'flag' ? 'The flag' : tg.kind == 'star' ? 'The next star' : items.length > 1 ? `Key ${tg.k + 1}` : 'The key';
        const where = ['up', 'to the right', 'down', 'to the left'][d];
        const off = cs * 0.5 + 30, lim = v => Math.max(28, Math.min(size - 28, v)); // beside the bear, inside the board
        const ax = lim(cx(c) + MZ.DX[d] * off), ay = lim(cy(c) + MZ.DY[d] * off);
        arrow.innerHTML = ico(['arrow-up', 'arrow-right', 'arrow-down', 'arrow-left'][d], 40);
        arrow.style.left = ax + 'px';
        arrow.style.top = ay + 'px';
        arrow.dataset.d = MZ.DIR[d];
        arrow.hidden = false;
        arrow.classList.remove('on');
        void arrow.offsetWidth;
        arrow.classList.add('on');
        arrowT = later(() => { arrow.hidden = true; }, 4500);
        tell(`${what} is ${where}.`, true);
        return true;
      }
      arrow.hidden = true;
      hint = cells;
      redraw();
      hintT = later(() => { hint = []; redraw(); }, 9000);
      tell(tier == 2 ? 'Follow the dots.' : 'Follow the dots past the next turn.', true);
      return true;
    }

    // ---- start ----
    msg(intro);
    status();
    layout();
    if (st.t.length == 1 && (band == 'A' || band == 'B')) api.say(intro); // R-01b: band B speaks its first instruction too
    const inst = {
      hint: hintNow,
      destroy() {
        timers.forEach(clearTimeout);
        timers.clear();
        clearTimeout(rz);
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        window.removeEventListener('resize', onResize);
        document.removeEventListener('keydown', keyd);
        if (dirty) save();
        if (MZ.cur && MZ.cur.inst === inst) MZ.cur = null;
      },
    };
    MZ.cur = {
      inst, p, st, o,
      at: c => { const r = cv.getBoundingClientRect(); return { x: r.left + cx(c), y: r.top + cy(c) }; },
      draw: () => { bg = null; return draw(); },
      cell: () => cs, hint: () => hint.slice(), head,
    };
    return inst;
  },
});
