/* ---------- wearables (P4-07; DESIGN_SYSTEM.md 6.4 has the rules) ----------
   Drawings WEAR / WEAR_EMB / names WEAR_NAME live in src/data/d-wear.js, keyed by the item ids the save stores (the emoji in SHOP
   and BPRIZE); an id without a drawing still shows its emoji. The helpers build them while d-wear.js loads. */
const wr1 = v => Math.round(v * 10) / 10;
const wF = c => `fill="var(--a-${c})"`;


// ---- path helpers: absolute commands only (M L C Q Z), so every number pair is a point ----
// apply f([x, y]) to every point of a path
function wMap(d, f) {
  let out = '', n = [];
  for (const t of d.match(/[MLCQZ]|-?\d*\.?\d+/g)) {
    if (/[A-Z]/.test(t)) { out += t; continue; }
    n.push(+t);
    if (n.length == 2) {
      const [x, y] = f(n);
      out += (/[A-Z]$/.test(out) ? '' : ' ') + wr1(x) + ' ' + wr1(y);
      n = [];
    }
  }
  return out;
}
// [x0, y0, x1, y1] of a path's points (control points included, so the curve is inside)
function wBoxD(d) {
  const b = [1e9, 1e9, -1e9, -1e9];
  wMap(d, ([x, y]) => { b[0] = Math.min(b[0], x); b[1] = Math.min(b[1], y); b[2] = Math.max(b[2], x); b[3] = Math.max(b[3], y); return [x, y]; });
  return b;
}
// rotate a path by a degrees about (cx, cy)
const wRot = (d, a, cx = 32, cy = 32) => {
  const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180);
  return wMap(d, ([x, y]) => [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c]);
};
// mirror a path left-right about x = 32
const wFlip = d => wMap(d, ([x, y]) => [64 - x, y]);
// volume: the shape in the shade tone, then the same shape shrunk by k and nudged toward the light (top left) in the base tone,
// so a crescent of shade shows on the lower right
function wVol(d, sh, base, k = .92, dx = -1.2, dy = -1.4) {
  const b = wBoxD(d), cx = (b[0] + b[2]) / 2, cy = (b[1] + b[3]) / 2;
  return `<path ${wF(sh)} d="${wMap(d, p => p)}"/><path ${wF(base)} d="${wMap(d, ([x, y]) => [cx + (x - cx) * k + dx, cy + (y - cy) * k + dy])}"/>`;
}
// a shaded ball of hue h (h2 shade, h base, h1 highlight, a white glint)
const wBall = (x, y, r, h, glint = .8) => `<circle cx="${wr1(x)}" cy="${wr1(y)}" r="${wr1(r)}" ${wF(h + '2')}/>` +
  `<circle cx="${wr1(x - r * .09)}" cy="${wr1(y - r * .11)}" r="${wr1(r * .87)}" ${wF(h)}/>` +
  `<ellipse cx="${wr1(x - r * .36)}" cy="${wr1(y - r * .38)}" rx="${wr1(r * .34)}" ry="${wr1(r * .2)}" transform="rotate(-40 ${wr1(x - r * .36)} ${wr1(y - r * .38)})" ${wF(h + '1')}/>` +
  (glint ? `<circle cx="${wr1(x - r * .5)}" cy="${wr1(y - r * .2)}" r="${wr1(Math.max(1.4, r * .12))}" ${wF('w')} opacity="${glint}"/>` : '');
// a gloss stroke (highlight line) or any open stroke
const wLn = (d, c, w, o = 1) => `<path fill="none" stroke="var(--a-${c})" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${o < 1 ? ` opacity="${o}"` : ''} d="${d}"/>`;
// a soft highlight ellipse
const wHi = (x, y, rx, ry, rot, c = 'w', o = .55) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ''} ${wF(c)}${o < 1 ? ` opacity="${o}"` : ''}/>`;
// a rounded, shaded gold star (shade with a round stroke, base nudged to the light, a highlight dot)
const wStar = (x, y, R, h = 'y') => `<path ${wF(h + '2')} stroke="var(--a-${h}2)" stroke-width="${wr1(R * .3)}" stroke-linejoin="round" d="${rwStarD(x, y, R, R * .5)}"/>` +
  `<path ${wF(h)} stroke="var(--a-${h})" stroke-width="${wr1(R * .2)}" stroke-linejoin="round" d="${rwStarD(x - R * .08, y - R * .1, R * .88, R * .44)}"/>` +
  `<circle cx="${wr1(x - R * .22)}" cy="${wr1(y - R * .34)}" r="${wr1(R * .16)}" ${wF(h + '1')}/>`;
// the soft dark accent where a hat meets the head (it falls on the pet, so the hat sits instead of floating)
const wContact = (rx = 20, y = 61) => `<ellipse cx="32" cy="${y}" rx="${rx}" ry="3.4" ${wF('k')} opacity=".2"/>`;

// ---- lookups ----
const wearArt = id => (typeof WEAR != 'undefined' && WEAR[id]) || '';
// what petSVG gets for a saved item: its drawing, or the id itself (an emoji, drawn as text) when it has none
const wearOf = id => wearArt(id) || id || '';
const wearName = id => (typeof WEAR_NAME != 'undefined' && WEAR_NAME[id]) || 'Prize';

// bounding box [x0, y0, x1, y1] of drawing markup (shapes, absolute paths, group and rotate transforms, half the stroke width)
function wearBox(svg) {
  const b = [1e9, 1e9, -1e9, -1e9], stack = [[1, 0, 0, 1, 0, 0]];
  const mul = (m, n) => [m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1], m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3],
    m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5]];
  const tf = s => {
    let m = [1, 0, 0, 1, 0, 0];
    for (const t of (s || '').matchAll(/(translate|scale|rotate)\(([^)]*)\)/g)) {
      const v = t[2].trim().split(/[\s,]+/).map(Number);
      if (t[1] == 'translate') m = mul(m, [1, 0, 0, 1, v[0], v[1] || 0]);
      else if (t[1] == 'scale') m = mul(m, [v[0], 0, 0, v.length > 1 ? v[1] : v[0], 0, 0]);
      else {
        const a = v[0] * Math.PI / 180, c = Math.cos(a), s2 = Math.sin(a), cx = v[1] || 0, cy = v[2] || 0;
        m = mul(m, [1, 0, 0, 1, cx, cy]);
        m = mul(m, [c, s2, -s2, c, 0, 0]);
        m = mul(m, [1, 0, 0, 1, -cx, -cy]);
      }
    }
    return m;
  };
  const add = (m, x, y) => {
    const X = m[0] * x + m[2] * y + m[4], Y = m[1] * x + m[3] * y + m[5];
    b[0] = Math.min(b[0], X); b[1] = Math.min(b[1], Y); b[2] = Math.max(b[2], X); b[3] = Math.max(b[3], Y);
  };
  for (const t of svg.matchAll(/<(\/?)(g|path|circle|ellipse|rect)\b([^>]*?)(\/?)>/g)) {
    if (t[1]) { stack.pop(); continue; }
    const at = k => { const r = t[3].match(new RegExp('\\s' + k + '="([^"]*)"')); return r ? r[1] : null; };
    const m = mul(stack[stack.length - 1], tf(at('transform')));
    if (t[2] == 'g') { if (!t[4]) stack.push(m); continue; }
    const sw = at('stroke') && at('stroke') != 'none' ? (+at('stroke-width') || 1) / 2 : 0, n = k => +(at(k) || 0);
    let box;
    if (t[2] == 'circle') box = [n('cx') - n('r'), n('cy') - n('r'), n('cx') + n('r'), n('cy') + n('r')];
    else if (t[2] == 'ellipse') box = [n('cx') - n('rx'), n('cy') - n('ry'), n('cx') + n('rx'), n('cy') + n('ry')];
    else if (t[2] == 'rect') box = [n('x'), n('y'), n('x') + n('width'), n('y') + n('height')];
    else box = wBoxD(at('d') || 'M0 0');
    box = [box[0] - sw, box[1] - sw, box[2] + sw, box[3] + sw];
    for (const [x, y] of [[box[0], box[1]], [box[2], box[1]], [box[0], box[3]], [box[2], box[3]]]) add(m, x, y);
  }
  return b.map(wr1);
}

// an item's picture (decorative): the drawing in a square viewBox around it
function wearPic(id, size = '1em', cls = '') {
  const a = wearArt(id);
  if (!a) return `<span class="wr-emo">${esc(id)}</span>`;
  const b = wearBox(a), s = Math.max(b[2] - b[0], b[3] - b[1]) + 4, x = (b[0] + b[2] - s) / 2, y = (b[1] + b[3] - s) / 2;
  return `<svg class="art wr-pic${cls ? ' ' + cls : ''}" width="${size}" height="${size}" viewBox="${wr1(x)} ${wr1(y)} ${wr1(s)} ${wr1(s)}" ` +
    `aria-hidden="true" focusable="false">${a}</svg>`;
}
// a prize emblem alone (64 grid), e.g. in the reward rosette; '' when there is none
const wearEmb = id => (typeof WEAR_EMB != 'undefined' && WEAR_EMB[id]) || '';
