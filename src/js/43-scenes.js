/* ---------- Map and world scenes (P4-09, DESIGN_SYSTEM 7; CSS 47-scenes.css; props, themes, world table: src/data/d-scenes.js) ----------
   A world band = a sky-to-ground CSS gradient (scene tokens) + one SVG: sun or moon, clouds, stars, rays, garland, horizon ridges,
   rolling ground, a landmark, props down the sides, ground marks. Props go only where the band's stops, labels, title, Test out
   banner, pet and trail are not. Decoration only (aria-hidden, no taps, no motion), tokens only, deterministic. */
const SCN = {
  memo: {},
  HUE: { r: 'red', o: 'orange', y: 'yellow', g: 'green', c: 'aqua', b: 'blue', v: 'purple', p: 'pink', n: 'brown', t: 'tan',
    s: 'skin', m: 'cream', e: 'grey', w: 'white', k: 'ink' },
};
const scR = n => Math.round(n * 10) / 10;

// a tone: 'g2' -> var(--ill-green-2), 'w' -> var(--ill-white), a word -> var(--sc-word)
SCN.col = t => {
  const m = /^([a-z])(\d?)$/.exec(t);
  return m ? `var(--ill-${SCN.HUE[m[1]]}${m[2] ? '-' + m[2] : ''})` : `var(--sc-${t})`;
};

/* Props are stamped into shared layers: one <path> per shape position and look for all props of a scene (every tree crown is one
   path), so a scene stays a few dozen elements. Each shape becomes path data once and is stamped by scaling and moving its numbers. */
SCN.ell = (cx, cy, rx, ry, a) => {
  const c = scR(Math.cos(a * Math.PI / 180) * rx), s = scR(Math.sin(a * Math.PI / 180) * rx);
  const A = `a${rx} ${ry} ${a} 1 0 `;
  return `M${scR(cx - c)} ${scR(cy - s)}${A}${2 * c} ${2 * s}${A}${-2 * c} ${-2 * s}Z`;
};
SCN.rect = (x, y, w, h, r) => {
  if (!r) return `M${x} ${y}h${w}v${h}h${-w}Z`;
  const A = `a${r} ${r} 0 0 1 `, iw = scR(w - 2 * r), ih = scR(h - 2 * r);
  return `M${scR(x + r)} ${y}h${iw}${A}${r} ${r}v${ih}${A}${-r} ${r}h${-iw}${A}${-r} ${-r}v${-ih}${A}${r} ${-r}Z`;
};
// path data ready to stamp: p = command letters, null for each number; kind of each number: 0 x, 1 y, 2 scale only, 3 keep
SCN.CMD = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };
SCN.segs = d => {
  const p = [], num = [], kind = [];
  let U = '', rel = false, j = 0;
  for (const t of d.match(/[a-zA-Z]|-?(?:\d+\.?\d*|\.\d+)/g)) {
    if (/[a-zA-Z]/.test(t)) {
      p.push(t);
      U = t.toUpperCase();
      rel = t != U;
      j = 0;
      continue;
    }
    const i = j++ % (SCN.CMD[U] || 1);
    let c = U == 'H' ? 0 : U == 'V' ? 1 : U == 'A' ? (i < 2 ? 2 : i < 5 ? 3 : i == 5 ? 0 : 1) : i % 2;
    if (rel && c < 2) c = 2;
    p.push(null);
    num.push(+t);
    kind.push(c);
  }
  return { p, num, kind };
};
SCN.xf = (q, k, x, y) => { // scaled by k, moved to x, y
  let d = '', n = 0, gap = false;
  for (const p of q.p) {
    if (p) {
      d += p;
      gap = false;
      continue;
    }
    const v = q.num[n], c = q.kind[n++];
    d += (gap ? ' ' : '') + Math.round((c == 3 ? v : c == 2 ? v * k : v * k + (c ? y : x)) * 10) / 10;
    gap = true;
  }
  return d;
};
// one shape "tone [opacity] kind numbers... [@deg]" (d-scenes.js header) -> {st look, sw stroke width, da dash, segs}
SCN.shape = src => {
  const t = src.trim().split(/\s+/);
  const c = SCN.col(t.shift());
  const op = /^[\d.]+$/.test(t[0]) ? ` opacity="${t.shift()}"` : '';
  const k = t.shift();
  const rot = t.length && t[t.length - 1][0] == '@' ? +t.pop().slice(1) : 0;
  const [sw, da] = k == 'l' || k == 'o' ? t.shift().split('/') : [0, ''];
  const n = t.map(Number);
  let d = t.join(' ');
  if (k == 'c') d = SCN.ell(n[0], n[1], n[2], n[2], 0);
  if (k == 'e' || k == 'o') d = SCN.ell(n[0], n[1], n[2], n[3], rot);
  if (k == 'r') d = SCN.rect(n[0], n[1], n[2], n[3], n[4] || 0);
  const st = sw ? `fill="none" stroke="${c}" stroke-linecap="round" stroke-linejoin="round"${op}` : `fill="${c}"${op}`;
  return { st, sw: +sw, da: da ? da.split(',').map(Number) : null, segs: SCN.segs(d) };
};
// a prop by name (a variant swaps one hue): {hw, hh, sh}, built once
SCN.prop = name => {
  if (SCN.memo[name]) return SCN.memo[name];
  const v = SCN_V[name];
  let src = SCN_P[v ? v[0] : name];
  if (!src) return null;
  if (v) src = src.replace(new RegExp(`(^|[|;])${v[1]}(\\d?) `, 'g'), `$1${v[2]}$2 `);
  const [box, body] = src.split('|');
  const [hw, hh] = box.split(' ').map(Number);
  return (SCN.memo[name] = { hw, hh, sh: body.split(';').map(SCN.shape) });
};

SCN.hash = s => {
  let h = 7;
  for (const ch of String(s)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
};
// a world's theme (SCN_W by id; a world not in it, like smoke's fake worlds, gets one by a hash); null without the data file
SCN.theme = w => {
  if (typeof SCN_T == 'undefined') return null;
  let e = SCN_W[w.id];
  if (!e) {
    const ids = Object.keys(SCN_W);
    e = SCN_W[ids[SCN.hash(w.id) % ids.length]];
  }
  const [k, o] = Array.isArray(e) ? e : [e, {}];
  return SCN_T[k] ? { key: k, ...SCN_T[k], ...o } : null;
};
// a horizon ridge: q hills, l peaks, b blocks, a puffs; unit u, heights hs; closed down to end, or (top) up to 0 (cave ceiling)
SCN.ridge = (W, base, end, [k, u, hs, tone, top], off) => {
  const x0 = -(off % u);
  let d = `M${x0} ${base}`, x = x0;
  for (let i = 0; x < W; i++, x += u) {
    const h = hs[i % hs.length];
    if (k == 'q') d += `Q${scR(x + u / 2)} ${base - 2 * h} ${x + u} ${base}`;
    else if (k == 'l') d += `L${scR(x + u / 2)} ${base - h}L${x + u} ${base}`;
    else if (k == 'b') d += `V${base - h}H${scR(x + u * .8)}V${base}H${x + u}`;
    else d += `A${u / 2} ${h} 0 0 1 ${x + u} ${base}`;
  }
  d += top ? `V0H${x0}Z` : `V${end}H${x0}Z`;
  const [c, op] = tone.split(' ');
  return `<path d="${d}" fill="${SCN.col(c)}"${op ? ` opacity="${op}"` : ''}/>`;
};
// small marks, many in one path: tuft, dot, spark, bub (bubble), dash (sprinkle)
SCN.mark = (k, x, y, r) => {
  x = scR(x);
  y = scR(y);
  if (k == 'tuft') return `M${x - 3} ${y}l-1.2 -5M${x} ${y}v-6.5M${x + 3} ${y}l1.2 -5`;
  if (k == 'dot') return `M${x - 1.8} ${y}a1.8 1.8 0 1 0 3.6 0a1.8 1.8 0 1 0 -3.6 0`;
  if (k == 'spark') return `M${x} ${y - 5}Q${x} ${y} ${x + 4} ${y}Q${x} ${y} ${x} ${y + 5}Q${x} ${y} ${x - 4} ${y}Q${x} ${y} ${x} ${y - 5}Z`;
  if (k == 'bub') return `M${x - 3.2} ${y}a3.2 3.2 0 1 0 6.4 0a3.2 3.2 0 1 0 -6.4 0`;
  return r < .5 ? `M${x} ${y}l3.4 -2` : `M${x} ${y}l3.4 2`;
};

/* The band of world w, W wide, at top, h tall (map px). o = {test: Test out shown, stops: [[x, y, label, boss, isNew]...],
   trail: points along the trail, pet: [x, y] or null}, all in map px. A plain band in the world colour without the data file.
   Scenes are cached by what they depend on (in band px), so moving between worlds redraws known scenes for free. */
SCN.cache = new Map();
SCN.band = (w, W, top, h, o) => {
  const T = SCN.theme(w);
  if (!T) return `<div class="wband" style="top:${top}px;height:${h}px;background:${w.c}" aria-hidden="true"></div>`;
  const stops = o.stops.map(([x, y, lab, boss, isNew]) => [scR(x), y - top, lab.length, boss ? 1 : 0, isNew ? 1 : 0]);
  const trail = o.trail.filter(q => q[1] > top - 30 && q[1] < top + h + 30).map(([x, y]) => [Math.round(x), Math.round(y - top)]);
  const pet = o.pet && [Math.round(o.pet[0]), Math.round(o.pet[1] - top)];
  const key = JSON.stringify([w.id, w.n, W, h, o.test ? 1 : 0, stops, trail, pet]);
  let inner = SCN.cache.get(key);
  if (!inner) {
    inner = SCN.draw(w, T, W, h, o.test, stops, trail, pet);
    SCN.cache.set(key, inner);
    if (SCN.cache.size > 12) SCN.cache.delete(SCN.cache.keys().next().value);
  }
  return `<div class="wband scn sc-${T.key}" data-scene="${T.key}" style="top:${top}px;${inner}`;
};
SCN.draw = (w, T, W, h, test, stops, trail, pet) => {
  let seed = SCN.hash(w.id) || 1;
  const rnd = () => (seed = seed * 16807 % 2147483647) / 2147483647;
  const hz = test ? 124 : 76; // the horizon, under the title (and the Test out banner)
  // keep clear [x0, y0, x1, y1]; placed = the props drawn, [name, box] (tools/test.js checks them)
  const occ = [], placed = SCN.placed = [];
  const tw = 64 + w.n.length * 12.5;
  occ.push([(W - tw) / 2, 8, (W + tw) / 2, 68]);
  if (test) occ.push([W / 2 - 145, 52, W / 2 + 145, 112]);
  for (const [x, y, n, boss, isNew] of stops) {
    const r = boss ? 52 : 46, lw = Math.min(140, n * 7.6 + 18);
    occ.push([x - r, y - r, x + r, y + r + 6], [x - lw / 2 - 4, y + 38, x + lw / 2 + 4, y + 86]);
    if (isNew) occ.push([x - 28, y - 64, x + 28, y - 28]);
  }
  for (const [x, y] of trail) occ.push([x - 18, y - 18, x + 18, y + 18]);
  if (pet) occ.push([pet[0] - 38, pet[1] - 70, pet[0] + 38, pet[1] + 22]);
  const free = (a, b, c, d) => a > 2 && c < W - 2 && b > -2 && d < h + 2 && !occ.some(q => a < q[2] && c > q[0] && b < q[3] && d > q[1]);

  let s = '';
  // layers: key -> [pass, shape position, attributes, path data]; pass 0 sky, 1 landmarks and props, 2 companions (in front).
  // Props never overlap, so drawing layer by layer in shape order keeps each prop's own order.
  const layers = new Map();
  const stamp = (P, x, y, k, pass) => P.sh.forEach((q, i) => {
    const a = !q.sw ? q.st : (q.at = q.at || {})[k] ||
      (q.at[k] = q.st + ` stroke-width="${scR(q.sw * k)}"${q.da ? ` stroke-dasharray="${q.da.map(v => scR(v * k)).join(' ')}"` : ''}`);
    const key = pass + ' ' + i + a, L = layers.get(key), d = SCN.xf(q.segs, k, x, y);
    if (L) L[3] += d;
    else layers.set(key, [pass, i, a, d]);
  });
  const flush = pass => [...layers.values()].filter(L => L[0] == pass).sort((a, b) => a[1] - b[1])
    .map(L => `<path d="${L[3]}" ${L[2]}/>`).join('');
  // sky: sun or moon top left (where the light comes from), stars, clouds, rays, a papel picado garland
  if (T.sun == 'sun') s += `<circle cx="34" cy="34" r="25" fill="${SCN.col('y1')}" opacity=".35"/><circle cx="34" cy="34" r="15" fill="${SCN.col('y2')}"/>` +
    `<circle cx="32.5" cy="32.5" r="13" fill="${SCN.col('y')}"/><circle cx="28" cy="28" r="4.5" fill="${SCN.col('y1')}" opacity=".85"/>`;
  if (T.sun == 'moon') s += `<circle cx="34" cy="32" r="22" fill="${SCN.col('w')}" opacity=".12"/>` +
    `<path d="M38 18A14 14 0 1 0 48 40A11 11 0 0 1 38 18Z" fill="${SCN.col('m')}"/><circle cx="29" cy="30" r="2.4" fill="${SCN.col('m2')}" opacity=".7"/>`;
  if (T.st) {
    let d = '';
    for (let i = 0; i < T.st; i++) d += SCN.mark(i % 3 ? 'dot' : 'spark', 60 + rnd() * (W - 80), 8 + rnd() * (hz - 40), 0);
    s += `<path d="${d}" fill="${SCN.col('w')}" opacity=".85"/>`;
  }
  if (T.cl) stamp(SCN.prop('cloud'), W - 46, 40, .9, 0);
  if (T.cl > 1) stamp(SCN.prop('cloud'), W * .3, 26, .9, 0);
  if (T.rays) {
    let d = '';
    for (const f of [.18, .52, .8]) d += `M${scR(W * f)} 0h${scR(W * .08)}L${scR(W * f + W * .2)} ${scR(h * .55)}h${scR(-W * .2)}Z`;
    s += `<path d="${d}" fill="${SCN.col('w')}" opacity=".22"/>`;
  }
  if (T.pp) {
    const ds = T.pp.map(() => '');
    for (let i = 0, x = 10; x < W - 10; i++, x += 22) {
      ds[i % ds.length] += `M${scR(x - 6)} ${scR(8 + 14 * Math.sin(Math.PI * x / W))}h12v13l-3 -2.5l-3 2.5l-3 -2.5l-3 2.5z`;
    }
    s += `<path d="M0 8Q${W / 2} 36 ${W} 8" fill="none" stroke="${SCN.col('k2')}" stroke-width="1" opacity=".4"/>`;
    s += ds.map((d, i) => `<path d="${d}" fill="${SCN.col(T.pp[i])}" opacity=".9"/>`).join('');
  }
  s += flush(0);
  // horizon ridges back to front (the front one is the ground colour; a 6th value moves a ridge up: the sea behind a beach)
  const off = SCN.hash(w.id + 'x');
  T.hz.forEach((r, i) => { s += SCN.ridge(W, r[4] ? 4 : hz - (i ? 2 : 16) + (r[5] || 0), hz + 8, r, off >> (i * 3)); });
  // rolling ground: a crest every 200-260 px, every other layer a shade deeper, a light rim on each crest
  const crests = []; // [left y, control y 1, control y 2, right y]
  for (let y = hz + 150 + rnd() * 50; y < h - 90; y += 200 + rnd() * 60) {
    const a = scR(y + (rnd() - .5) * 50), b = scR(y + (rnd() - .5) * 50), up = rnd() > .5 ? 40 : -40;
    crests.push([a, scR(a - up), scR(b + up * .85), b]);
  }
  const x1 = scR(W * .3), x2 = scR(W * .62);
  let rim = '';
  crests.forEach(([a, c1, c2, b], i) => {
    const fwd = `M0 ${a}C${x1} ${c1} ${x2} ${c2} ${W} ${b}`, nx = crests[i + 1];
    rim += fwd;
    if (i % 2) return;
    const back = nx ? `V${nx[3]}C${x2} ${nx[2]} ${x1} ${nx[1]} 0 ${nx[0]}Z` : `V${h}H0Z`;
    s += `<path d="${fwd}${back}" fill="${SCN.col(T.g[1])}" opacity=".55"/>`;
  });
  if (rim) s += `<path d="${rim}" fill="none" stroke="${SCN.col('w')}" stroke-width="3" opacity=".55"/>`;
  const place = (name, x, y, k, pass = 1) => {
    const P = SCN.prop(name);
    if (!P) return false;
    x = Math.min(Math.max(x, P.hw * k + 4), W - P.hw * k - 4);
    const box = [x - P.hw * k - 3, y - P.hh * k - 3, x + P.hw * k + 3, y + 5];
    if (!free(...box)) return false;
    occ.push(box);
    placed.push([name, box]);
    stamp(P, x, y, k, pass);
    return true;
  };
  // landmarks on the horizon, the first on the side away from the first stop (lower or smaller when there is no room)
  const big = W >= 480 ? 1.3 : 1.1, f0 = stops[0], sides = !f0 || f0[0] > W / 2 ? [.12, .88] : [.88, .12];
  T.lm.forEach((name, i) => {
    const k = big * (i ? .9 : 1.15);
    [[22, 1], [70, 1], [22, .8], [120, 1], [70, .8]].some(([dy, f]) => place(name, W * sides[i % 2], hz + dy, k * f));
  });
  // props down the sides where there is room: a column by each edge and one where the trail swings out (free when the stops are
  // on the other side); wide screens two loose columns a side. At most 24, one size per kind (its strokes share a layer).
  const amp = Math.min(W * .3, 200), z = W / 2 - amp - 40, wide = W >= 480;
  const cols = z > 150 ? [z * .3 + 10, z * .78 + 10] : [Math.max(26, z * .5)];
  if (z <= 150 && W / 2 - amp * .9 - cols[0] > 40) cols.push(W / 2 - amp * .9);
  const xs = cols.flatMap(c => [c, W - c]), last = xs.map(() => -1e9);
  let n = 0;
  for (let y = hz + 84; y < h - 12 && n < 24; y += 30) {
    xs.forEach((x0, ci) => {
      if (y - last[ci] < (wide ? 110 : 92) || n >= 24) return;
      const name = T.pr[n % T.pr.length];
      const k = scR((wide ? 13 : 10) * (.88 + SCN.hash(name) % 25 / 100)) / 10;
      const x = x0 + (rnd() - .5) * (wide ? 70 : 16);
      if (!place(name, x, y, k)) return;
      last[ci] = y + (wide ? rnd() * 50 : 0);
      n++;
      // now and then a small companion in front (towards the middle), so things stand in groups; it may overlap its own prop
      const P = SCN.prop(name), sm = T.sm || [];
      if (sm.length && rnd() < .6) {
        const own = occ.pop();
        place(sm[n % sm.length], x + (x < W / 2 ? 1 : -1) * P.hw * k * .95, y + 7, wide ? .8 : .72, 2);
        occ.push(own);
      }
    });
  }
  s += flush(1) + flush(2);
  // ground marks on free ground, one path per kind
  for (const [k, tone] of T.tx || []) {
    let d = '';
    for (let y = hz + 26; y < h - 10; y += 26) {
      const x = 12 + rnd() * (W - 24);
      if (free(x - 7, y - 8, x + 7, y + 4)) d += SCN.mark(k, x, y, rnd());
    }
    if (!d) continue;
    s += k == 'tuft' || k == 'bub' || k == 'dash'
      ? `<path d="${d}" fill="none" stroke="${SCN.col(tone)}" stroke-width="${k == 'dash' ? 2.4 : 1.6}" stroke-linecap="round" opacity=".7"/>`
      : `<path d="${d}" fill="${SCN.col(tone)}" opacity=".7"/>`;
  }
  // the band markup after its top (SCN.band adds the start)
  return `height:${h}px;background:linear-gradient(var(--sc-${T.sky[0]}),var(--sc-${T.sky[1]}) ${hz}px,var(--sc-${T.g[0]}) ${hz}px);` +
    `box-shadow:0 6px 0 var(--sc-${T.g[1]})" aria-hidden="true"><svg class="scn-art" width="${W}" height="${h}" focusable="false">${s}</svg></div>`;
};

// the trail's curve between stops a and b (drawMap's: leave and arrive straight down) at t
SCN.bez = ([ax, ay], [bx, by], t) => {
  const u = 1 - t;
  return [u * u * (u + 3 * t) * ax + t * t * (3 * u + t) * bx, u * u * u * ay + 3 * u * u * t * (ay + 55) + 3 * u * t * t * (by - 55) + t * t * t * by];
};
SCN.trailPts = pts => { // points along the trail, for SCN.band
  const out = [];
  for (let k = 1; k < pts.length; k++) for (let t = .1; t < .95; t += .1) out.push(SCN.bez(pts[k - 1], pts[k], t));
  return out;
};
/* The trail: a worn path (rim, pale bed) with stepping stones, gold up to the current stop (the first kw points), and a little
   bridge over each gap between two world bands (gaps = their y). */
SCN.trail = (W, H, pts, kw, gaps) => {
  let d = pts.length ? `M${scR(pts[0][0])} ${pts[0][1]}` : '', walked = '';
  for (let k = 1; k < pts.length; k++) {
    const [px, py] = pts[k - 1], [x, y] = pts[k];
    d += ` C${scR(px)} ${py + 55} ${scR(x)} ${y - 55} ${scR(x)} ${y}`;
    if (k == kw - 1) walked = d;
  }
  const p = c => `<path class="tr ${c}" d="${d}"/>`;
  let br = '';
  for (const g of gaps) {
    const k = pts.findIndex(q => q[1] > g);
    if (k < 1) continue;
    let lo = 0, hi = 1; // where the curve crosses the gap (y grows along a stretch), and which way it runs there
    for (let i = 0; i < 14; i++) { const mid = (lo + hi) / 2; if (SCN.bez(pts[k - 1], pts[k], mid)[1] < g) lo = mid; else hi = mid; }
    const [x, y] = SCN.bez(pts[k - 1], pts[k], lo), [x2, y2] = SCN.bez(pts[k - 1], pts[k], Math.min(1, lo + .02));
    br += `<g transform="translate(${scR(x)} ${scR(y)}) rotate(${scR(Math.atan2(y2 - y, x2 - x) * 180 / Math.PI - 90)})">` +
      '<rect class="tr-plank-sh" x="-14" y="-23" width="32" height="50" rx="3"/><rect class="tr-plank" x="-16" y="-25" width="32" height="50" rx="3"/>' +
      '<path class="tr-seam" d="M-16 -15H16M-16 -5H16M-16 5H16M-16 15H16"/><path class="tr-rail" d="M-17 -27V27M17 -27V27"/></g>';
  }
  const gold = walked ? `<path class="tr tr-gs" transform="translate(0 3)" d="${walked}"/><path class="tr tr-go" d="${walked}"/>` : '';
  return `<svg class="mp-trail" width="${W}" height="${H}" aria-hidden="true" focusable="false">${p('tr-rim')}${p('tr-bed')}${br}` +
    `<path class="tr tr-sh" transform="translate(0 3)" d="${d}"/>${p('tr-st')}${gold}<path class="tr tr-hi" transform="translate(-2 -2.5)" d="${d}"/></svg>`;
};
