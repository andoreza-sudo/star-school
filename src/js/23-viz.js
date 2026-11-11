/* ---------- math visuals (P1-10; P1-11 adds part 2 in this same file) ----------
   Every VIZ.* function returns one inline <svg> string for a question's html (or a hint). No ids, no defs, no filters,
   no Math.random: the same arguments always give the same markup, so a question rebuilt from its seed looks the same.

   Using one in a generator:
     html: VIZ.tenFrame(7) + '<div class="sub">How many?</div>' + SLOT
   The svg goes inside the prompt; its size follows the prompt's --k (fit() shrinks pictures and text together).

   Sizing: the viewBox is in px at phone scale (1 unit = 1 px at 380 wide); .viz in 32-viz.css sets
   width = --vw x --vz x --k, where --vw is written on the svg (the drawing's natural width), --vz is 1 on phones and
   1.3 on tablets, and max-width is 100%. Interactive visuals (class vi) ignore --k so tap targets keep their size.

   Visual language (set here; P1-11 and Phase 2 follow it). Colours are classes in 32-viz.css, all tokens:
     structure   frames and cells .vo/.vl (--ink-3, 2 units); axes, ticks, part edges .va/.vk/.vp (--ink-2, 2 to 3 units)
     quantity    counters and shaded parts .v1 / .vs: --math fill, --math-shade rim (counters: r 13 to 15, rim 2)
     second set  .v2: --play fill, --play-shade rim (the "added" or "other" group; blue and orange stay apart for
                 colour-blind children)
     faded       .vx: opacity .3 (taken away, crossed off, not chosen)
     unknown     .vq box: --surface-2 with a dashed --brand edge and a "?" (.vqt)
     text        Andika 700, 16 units (fractions 14), --ink; white (.vw) on shaded parts
     joins/caps  always round (set on .viz), except base-ten cells, which are square
   Tap targets (for the `tap` kind): an element with class "vt" and data-v="<value>" (number-line spot, fraction part).
   Targets are at least 48 units wide and tall. A line or bar wider than the phone (about 340 units) is scaled down by
   max-width, so keep tap visuals to at most 6 evenly spaced number-line targets or fraction parts on phones. The kind adds these classes to show state:
     .sel  selected (--brand)     .right  correct (--good)     .wrong  try again (--try)     .vx  faded
   Labels in aria-label never say the answer ("ten frame", not "ten frame with 7").

   API (n, d, h, m, rows, cols are whole numbers; o is an optional options object):
     tenFrame(n, total = 10, o)   total 5, 10 or 20 cells; n counters fill row by row.  o.b: the last b counters
                                  are the second colour; o.fade: the last `fade` counters are faded (taken away)
     base10(n)                    flats, rods and units for 0..999 (bigger cells below 100)
     numLine(o)                   o.min = 0, o.max = 10, o.step = 1 (tick spacing), o.labels: values to label, 'all',
                                  or left out for automatic (every tick when it fits, else multiples of 2/5/10..);
                                  o.marks: values shown as a dot; o.hide: values whose label is a "?" box;
                                  o.tapValues: values that become tap targets; o.den: fraction labels in
                                  denominator den (0, 1/4, 2/4 ... whole numbers stay whole); o.w: line length (290)
     fracBar(n, d, o)             a bar in d equal parts, the first n shaded; n > d draws more bars.
                                  o.unit: write 1/d in each part; o.tap: every part is a target (data-v = 0..);
                                  o.w: bar length (280; at least 48 per part when tap)
     fracCircle(n, d, o)          a circle in d equal parts from 12 o'clock clockwise; n > d draws more circles. o.tap
     clock(h, m, o)               analogue clock, short red hour hand, long blue minute hand. o.nums = false hides 1-12
     array(rows, cols)            rows x cols counters for multiplication
     dots(n, layout, o)           counting dots, never overlapping. layout: 'row' (fives, 10 per row), 'ten'
                                  (ten-frame rows of 5), 'dice' (1-6 one face; 7-10 two faces, 5 + rest),
                                  'scatter' (o.seed picks the arrangement). o.b and o.fade as in tenFrame
     numLine also takes o.hops: [[from, to, label?], ...] arcs above the line (label '+3' by default, '' none, '?' box)
   Part 2 (P1-11). Same rules; labels from generators are escaped. Widths: all fit 340 units except where noted.
     ruler(len, unit, obj, o)     object of length len on a 'cm' or 'in' ruler; obj 'bar' (default), 'pencil', 'none';
                                  o.from: where the object starts (0), o.max: ruler length, o.guide = false: no guide lines
     barGraph(data, scale, o)     data [[label, value, set?], ...] (max 8; set 2 = second colour); scale = value per grid
                                  line (auto when left out); o.vals prints values; o.tap: bars are targets (data-v = 0..,
                                  48 wide: at most 6 bars)
     pictograph(data, o)          data [[label, count], ...] (max 6 rows); o.per: count per picture (1; a half picture for
                                  a half step), o.key: key text after "=" (shown when per > 1 or key is set)
     linePlot(values, o)          a circle per value stacked over a number line; o.min, o.max, o.step (1), o.den (fraction
                                  labels), o.w, o.tapValues as numLine
     shape(name, o)               VIZ.shapeNames: circle oval square rectangle triangle rhombus trapezoid pentagon hexagon
                                  octagon, solids cube prism cylinder cone sphere. 100 x 100 always. o.c = 2 second colour,
                                  o.rot degrees, o.st stretch across (not circle or square), o.dots dots on corners
     areaGrid(w, h, o)            w x h unit squares (max 12); o.n: only the first n are filled
     rectSides(w, h, labels, o)   rectangle (not to scale); labels {w, h}: number, text, '?' (box) or null;
                                  o.all labels all four sides, o.unit adds a unit
     angle(deg, o)                a ray along +x and one deg counter-clockwise; o.rot turns it, o.label text or '?' on the
                                  arc, o.proto draws a protractor (deg up to 180); right angles get a square mark
     coordGrid(o)                 o.quadrants 1 or 4, o.max (6 / 5), o.points [[x, y, 'A'?]], o.join (and o.close) lines
                                  through them, o.tapPts [[x, y], ...] targets (data-v "x,y"; spacing 48, so max 5 / 3)
     balance(left, right, o)      counters on a scale (left blue, right orange); a side may be {n, q: true} (n counters plus
                                  a "?" box); tilts to the heavier side unless o.tilt (-1, 0, 1); o.nums or more than 10
                                  shows a number block
     coinSVG(v, o)                v cents or a list: coins 1 5 10 25 50, bills 100 500 1000 2000; o.face = false hides values
     tally(n)                     tally marks, 0..50, groups of five
     tableInOut(rows, o)          rows [[in, out], ...] ('?' = unknown box); o.head: ['In', 'Out']
   New visuals: add a function inside this block and to the returned object; use svg(), f() and counters().

   Depth (P4-18). The visuals share the light of the object art (DESIGN_SYSTEM 6.5): light from the top left, a shade tone on
   the lower right, a white highlight on the upper left, a soft ledge under boards. Still no gradients, filters or ids.
     counters      the circle is the shade tone with a deep rim; vol() adds a base-tone spot moved toward the light (.vbs,
                   so a shade crescent shows on the lower right) and a short white gloss (.vsp). Spots are zero-length
                   round-capped strokes, so every counter is still exactly one <circle>
     boards        ten frames, dice faces, fraction bars and circles, the clock sit on a .vld ledge (--ledge-soft, 3 units down)
     gloss         .vgs white band (fraction bars, graph bars), .vgc white arc (fraction circles, clock rim, coins);
                   decorations never take taps (pointer-events: none), so tap targets and data-v stay as they were
     blocks        base-ten blocks get a deep-tone ledge (.vbd) under the shade block; coins a shade crescent (.vcs) */
const VIZ = (() => {
  // one decimal keeps the markup small
  const f = x => Math.round(x * 10) / 10;
  const def = (v, d) => (v == null ? d : v);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  // printed numbers: a real minus sign
  const num = v => (v < 0 ? '−' + -v : '' + v);
  // floating point clean-up for number-line values (0.1 + 0.2)
  const clean = v => Math.round(v * 1e6) / 1e6;

  // Root element. w, h: viewBox size. dw: natural display width in px (defaults to w). tap: has tap targets.
  function svg(name, w, h, body, label, tap, dw) {
    return `<svg class="viz viz-${name}${tap ? ' vi' : ''}" viewBox="0 0 ${f(w)} ${f(h)}" style="--vw:${f(def(dw, w))}" ` +
      `role="${tap ? 'group' : 'img'}" aria-label="${label}">${body}</svg>`;
  }

  // attributes that make an element a tap target
  const tapAttr = (v, cls) => `class="vt${cls ? ' ' + cls : ''}" data-v="${v}" role="button" aria-label="${v}"`;

  // Volume for round counters of radius r at pts (P4-18, see the header): base-tone spots toward the light, then a gloss.
  function vol(pts, r) {
    if (!pts.length) return '';
    const d = r * 0.1, bw = f(2 * (r + 0.7 - d * 1.42)), g = r * 0.4, a = r * 0.15;
    let b = '', s = '';
    for (const [x, y] of pts) {
      b += `M${f(x - d)} ${f(y - d)}h0`;
      s += `M${f(x - g - a)} ${f(y - g + a)}l${f(2 * a)} ${f(-2 * a)}`;
    }
    return `<path class="vbs" stroke-width="${bw}" d="${b}"/><path class="vsp" stroke-width="${f(r * 0.28)}" d="${s}"/>`;
  }

  // The lower-right crescent of the circle (cx, cy, R): what the same circle moved k toward the top left does not cover.
  function cres(cx, cy, R, k) {
    const u = Math.sqrt(R * R - k * k / 2) / Math.SQRT2, mx = cx - k / 2, my = cy - k / 2;
    const p1 = `${f(mx + u)} ${f(my - u)}`, p2 = `${f(mx - u)} ${f(my + u)}`;
    return `M${p1}A${R} ${R} 0 1 1 ${p2}A${R} ${R} 0 0 0 ${p1}z`;
  }

  // A gloss arc on the upper left of a circle (cx, cy), radius R, from 8 o'clock round to 11 o'clock.
  const glossArc = (cx, cy, R) => `M${f(cx - R * 0.94)} ${f(cy + R * 0.34)}A${f(R)} ${f(R)} 0 0 1 ${f(cx - R * 0.34)} ${f(cy - R * 0.94)}`;

  // Counters at points [[x, y], ...]. The last o.b are the second colour, the last o.fade are faded.
  function counters(pts, r, o = {}) {
    const n = pts.length;
    const b = o.b || 0;
    const x = o.fade || 0;
    const groups = {}, at = {};
    pts.forEach(([cx, cy], i) => {
      const k = (i >= n - b ? 'v2' : 'v1') + (i >= n - x ? ' vx' : '');
      groups[k] = (groups[k] || '') + `<circle cx="${f(cx)}" cy="${f(cy)}" r="${r}"/>`;
      (at[k] = at[k] || []).push([cx, cy]);
    });
    return Object.keys(groups).map(k => `<g class="${k}">${groups[k]}${vol(at[k], r)}</g>`).join('');
  }

  // Stacked fraction a/b centred on x; y is the fraction bar. cls ' vw' makes it white (on a shaded part).
  function fracText(x, y, a, b, cls = '') {
    const half = Math.max(String(a).length, String(b).length) * 4.5 + 3;
    return `<text class="vfr${cls}" x="${f(x)}" y="${f(y - 4)}">${a}</text>` +
      `<path class="vfb${cls}" d="M${f(x - half)} ${f(y)}h${f(2 * half)}"/>` +
      `<text class="vfr${cls}" x="${f(x)}" y="${f(y + 15)}">${b}</text>`;
  }

  // ---- ten frame: 40-unit cells, 5 per row ----
  function tenFrame(n, total = 10, o = {}) {
    total = total == 5 || total == 20 ? total : 10;
    n = clamp(Math.round(n) || 0, 0, total);
    const C = 40, P = 4, G = 12;
    const rows = total == 5 ? 1 : 2;
    const frames = total == 20 ? 2 : 1;
    const fh = rows * C;
    let body = '';
    for (let fi = 0; fi < frames; fi++) {
      const y0 = P + fi * (fh + G);
      let d = '';
      for (let c = 1; c < 5; c++) d += `M${P + c * C} ${y0}v${fh}`;
      if (rows == 2) d += `M${P} ${y0 + C}h${5 * C}`;
      body += `<rect class="vld" x="${P}" y="${y0 + 3}" width="${5 * C}" height="${fh}" rx="8"/>` +
        `<rect class="vo" x="${P}" y="${y0}" width="${5 * C}" height="${fh}" rx="8"/><path class="vl" d="${d}"/>`;
    }
    const pts = [];
    for (let i = 0; i < n; i++) {
      const fi = Math.floor(i / 10), j = i % 10;
      pts.push([P + (j % 5) * C + C / 2, P + fi * (fh + G) + Math.floor(j / 5) * C + C / 2]);
    }
    body += counters(pts, 15, o);
    return svg('ten', 5 * C + 2 * P, frames * fh + (frames - 1) * G + 2 * P, body, 'ten frame');
  }

  // ---- base-ten blocks ----
  // Each block is a --math-shade rectangle with square --math cells drawn by one dashed stroke per row of cells
  // (cell c units, 1-unit grid line). Flats wrap 3 per row; rods get a gap after 5; units stack in columns of 5.
  function base10(n) {
    n = clamp(Math.round(n) || 0, 0, 999);
    const H = Math.floor(n / 100), T = Math.floor(n / 10) % 10, U = n % 10;
    const p = n < 100 ? 10 : 7;       // cell pitch
    const c = p - 1;                  // cell size
    const S = 10 * p + 1;             // long side of a flat or rod
    const g = p, sg = Math.round(p / 2), G = 3 * p, P = 2;
    const fc = Math.min(H, 3), fr = Math.ceil(H / 3);
    const uc = Math.ceil(U / 5), ur = Math.min(U, 5);
    const groups = [
      [H, fc * S + (fc - 1) * g, fr * S + (fr - 1) * g],
      [T, T * (p + 1) + (T - 1) * sg + (T > 5 ? p : 0), S],
      [U, uc * (p + 1) + (uc - 1) * sg, ur * (p + 1) + (ur - 1) * sg],
    ].filter(gr => gr[0] > 0);
    const h = Math.max(p + 1, ...groups.map(gr => gr[2]));
    const bottom = P + h;
    let bg = '', cells = '', x = P;
    const block = (bx, by, bw, bh) => { bg += `M${f(bx)} ${f(by)}h${bw}v${bh}h${-bw}z`; };
    if (H) {
      const top = bottom - groups[0][2];
      for (let i = 0; i < H; i++) {
        const bx = x + (i % 3) * (S + g), by = top + Math.floor(i / 3) * (S + g);
        block(bx, by, S, S);
        for (let r = 0; r < 10; r++) cells += `M${bx + 1} ${f(by + 1 + r * p + c / 2)}h${10 * p}`;
      }
      x += groups[0][1] + G;
    }
    if (T) {
      for (let i = 0; i < T; i++) {
        const bx = x + i * (p + 1 + sg) + (i >= 5 ? p : 0);
        block(bx, bottom - S, p + 1, S);
        cells += `M${f(bx + 1 + c / 2)} ${bottom - S + 1}v${10 * p}`;
      }
      x += T * (p + 1) + (T - 1) * sg + (T > 5 ? p : 0) + G;
    }
    if (U) {
      for (let i = 0; i < U; i++) {
        const bx = x + Math.floor(i / 5) * (p + 1 + sg), by = bottom - (i % 5 + 1) * (p + 1) - (i % 5) * sg;
        block(bx, by, p + 1, p + 1);
        cells += `M${bx + 1} ${f(by + 1 + c / 2)}h${p}`;
      }
      x += uc * (p + 1) + (uc - 1) * sg + G;
    }
    const w = Math.max(x - G + P, 2 * P + p + 1);
    const body = bg ? `<path class="vbd" transform="translate(1.5 1.5)" d="${bg}"/><path class="vb" d="${bg}"/><path class="vc" stroke-width="${c}" stroke-dasharray="${c} 1" d="${cells}"/>` : '';
    return svg('b10', w, h + 2 * P, body, 'base ten blocks');
  }

  // ---- number line ----
  function numLine(o = {}) {
    const min = def(o.min, 0), max = def(o.max, 10), step = def(o.step, 1);
    const nT = Math.max(1, Math.round((max - min) / step));
    const vals = [];
    for (let k = 0; k <= nT; k++) vals.push(clean(min + k * step));
    const tap = (o.tapValues || []).map(Number).sort((a, b) => a - b);
    let w = def(o.w, 290);
    // tap targets: at least 48 units between neighbouring values
    for (let i = 1; i < tap.length; i++) w = Math.max(w, 48 * (max - min) / Math.max(tap[i] - tap[i - 1], 1e-9));
    const hops = o.hops || [], top = hops.length ? 34 : 0;
    const P = 24, Y = 28 + top, den = o.den;
    const X = v => P + (v - min) / (max - min) * w;
    const W = w + 2 * P, Hh = (den ? 84 : 68) + top;
    // fraction labels: k/den, whole numbers stay whole
    const lab = v => {
      const k = Math.round(v * den);
      return k % den ? [k, den] : num(k / den);
    };
    // which ticks get a label
    let labeled;
    const hide = (o.hide || []).map(Number);
    if (Array.isArray(o.labels)) labeled = o.labels.map(Number);
    else if (o.labels == 'all') labeled = vals;
    else {
      // a "?" box is 28 wide, so lines with hidden labels need 32 between labels
      const need = Math.max(hide.length ? 32 : 0, ...vals.map(v => (den ? 24 : num(v).length * 9 + 10)));
      const sp = w / nT;
      const ks = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000];
      const k = ks.find(q => q * sp >= need) || nT;
      labeled = vals.filter(v => (((Math.round(v / step) % k) + k) % k) == 0);
    }
    const has = (a, v) => a.some(x => Math.abs(x - v) < 1e-6);
    let ticks = '', text = '';
    for (const v of vals) {
      const big = has(labeled, v) || has(hide, v);
      ticks += `M${f(X(v))} ${Y - (big ? 8 : 5)}v${big ? 16 : 10}`;
    }
    for (const v of labeled.filter(v => !has(hide, v)).concat(hide)) {
      const x = X(v);
      if (has(hide, v)) {
        const bh = den ? 38 : 28;
        text += `<rect class="vq" x="${f(x - 14)}" y="${Y + 14}" width="28" height="${bh}" rx="7"/>` +
          `<text class="vqt" x="${f(x)}" y="${Y + 14 + bh / 2 + 6}">?</text>`;
        continue;
      }
      const t = den ? lab(v) : num(v);
      text += Array.isArray(t) ? fracText(x, Y + 31, t[0], t[1]) : `<text x="${f(x)}" y="${Y + (den ? 36 : 32)}">${t}</text>`;
    }
    let body = `<path class="va" d="M${P - 14} ${Y}H${f(P + w + 14)}"/>` +
      `<path class="vr" d="M${P - 20} ${Y}l7-5v10zM${f(P + w + 20)} ${Y}l-7-5v10z"/>` +
      `<path class="vk" d="${ticks}"/>${text}`;
    if (hops.length) {
      let arcs = '', tips = '', txt = '';
      for (const h of hops) {
        const x1 = X(h[0]), x2 = X(h[1]), mid = (x1 + x2) / 2, ch = clamp(Math.abs(x2 - x1) * 0.5, 22, 40), y0 = Y - 11;
        const t = h[2] === undefined ? (h[1] >= h[0] ? '+' : '') + num(clean(h[1] - h[0])) : h[2];
        arcs += `M${f(x1)} ${y0}Q${f(mid)} ${f(y0 - ch)} ${f(x2)} ${y0}`;
        tips += `M${f(x2)} ${y0 + 3}l-5-7h10z`;
        txt += t == '?' ? `<rect class="vq" x="${f(mid - 14)}" y="${f(y0 - ch / 2 - 28)}" width="28" height="24" rx="7"/><text class="vqt" x="${f(mid)}" y="${f(y0 - ch / 2 - 10)}">?</text>`
          : t ? `<text x="${f(mid)}" y="${f(y0 - ch / 2 - 6)}">${t}</text>` : '';
      }
      body += `<path class="vhop" d="${arcs}"/><path class="vhoa" d="${tips}"/>${txt}`;
    }
    if (o.marks) body += `<g class="v1">${o.marks.map(v => `<circle cx="${f(X(v))}" cy="${Y}" r="8"/>`).join('')}${vol(o.marks.map(v => [X(v), Y]), 8)}</g>`;
    // tap targets reach halfway to their neighbours (24 units past the ends) and cover the labels
    tap.forEach((v, i) => {
      const l = i ? (X(v) - X(tap[i - 1])) / 2 : 24;
      const r = i < tap.length - 1 ? (X(tap[i + 1]) - X(v)) / 2 : 24;
      body += `<g ${tapAttr(v)}><rect class="vh" x="${f(X(v) - l)}" y="0" width="${f(l + r)}" height="${Hh}"/>` +
        `<circle class="vm" cx="${f(X(v))}" cy="${Y}" r="10"/></g>`;
    });
    return svg('nl', W, Hh, body, 'number line', tap.length > 0);
  }

  // ---- fraction bar ----
  // Parts are rects with --ink-2 edges (neighbours share an edge); a rounded outline (.ve) goes on top.
  function fracBar(n, d, o = {}) {
    d = clamp(Math.round(d) || 1, 1, 12);
    n = Math.max(0, Math.round(n) || 0);
    const w = o.tap ? Math.max(def(o.w, 280), d * 48) : def(o.w, 280);
    const h = 56, P = 3, G = 14, pw = w / d;
    const bars = Math.max(1, Math.ceil(n / d));
    let body = '';
    for (let b = 0; b < bars; b++) {
      const y = P + b * (h + G);
      body += `<rect class="vld" x="${P}" y="${y + 3}" width="${f(w)}" height="${h}" rx="6"/>`;
      for (let i = 0; i < d; i++) {
        const idx = b * d + i, on = idx < n;
        const x0 = P + i * pw + (i ? 0 : 1.5), x1 = P + (i + 1) * pw - (i < d - 1 ? 0 : 1.5);
        const cls = 'vp' + (on ? ' vs' : '');
        const attr = o.tap ? tapAttr(idx, cls) : `class="${cls}"`;
        body += `<rect ${attr} x="${f(x0)}" y="${y + 1.5}" width="${f(x1 - x0)}" height="${h - 3}"/>`;
        if (o.unit && pw >= 30) body += fracText(P + (i + 0.5) * pw, y + h / 2 + 1, 1, d, on ? ' vw' : '');
      }
      body += `<rect class="vgs" x="${P + 4}" y="${y + 5}" width="${f(w - 8)}" height="10" rx="5"/>` +
        `<rect class="ve" x="${P}" y="${y}" width="${f(w)}" height="${h}" rx="6"/>`;
    }
    return svg('fb', w + 2 * P, bars * h + (bars - 1) * G + 2 * P, body, 'fraction bar', !!o.tap);
  }

  // ---- fraction circle ----
  function fracCircle(n, d, o = {}) {
    d = clamp(Math.round(d) || 1, 1, 12);
    n = Math.max(0, Math.round(n) || 0);
    const r = o.tap ? 70 : 54, P = 4, G = 14;
    const count = Math.max(1, Math.ceil(n / d));
    const pt = (cx, cy, a) => `${f(cx + r * Math.sin(a))} ${f(cy - r * Math.cos(a))}`;
    let body = '';
    for (let k = 0; k < count; k++) {
      const cx = P + r + k * (2 * r + G), cy = P + r;
      body += `<circle class="vld" cx="${cx}" cy="${cy + 3}" r="${r}"/>`;
      for (let i = 0; i < d; i++) {
        const idx = k * d + i, on = idx < n;
        const cls = `vp${on ? ' vs' : ''}`;
        const attr = o.tap ? tapAttr(idx, cls) : `class="${cls}"`;
        if (d == 1) body += `<circle ${attr} cx="${cx}" cy="${cy}" r="${r}"/>`;
        else {
          const a0 = i / d * 2 * Math.PI, a1 = (i + 1) / d * 2 * Math.PI;
          body += `<path ${attr} d="M${cx} ${cy}L${pt(cx, cy, a0)}A${r} ${r} 0 0 1 ${pt(cx, cy, a1)}z"/>`;
        }
      }
      body += `<path class="vgc" stroke-width="${f(r * 0.12)}" d="${glossArc(cx, cy, r * 0.8)}"/><circle class="ve" cx="${cx}" cy="${cy}" r="${r}"/>`;
    }
    return svg('fc', count * 2 * r + (count - 1) * G + 2 * P, 2 * r + 2 * P, body, 'fraction circle', !!o.tap);
  }

  // ---- clock ----
  // Minute and hour ticks are two dashed circles (one dash per tick), so the face stays small.
  // The minute hand stops at the numbers, so it points at a number instead of covering it.
  function clock(h, m, o = {}) {
    h = ((Math.round(h) || 0) % 12 + 12) % 12;
    m = clamp(Math.round(m) || 0, 0, 59);
    const c = 58;
    const ring = (r, n, dash, cls) => {
      const per = 2 * Math.PI * r / n;
      return `<circle class="${cls}" cx="${c}" cy="${c}" r="${r}" stroke-dasharray="${dash} ${(per - dash).toFixed(3)}" ` +
        `stroke-dashoffset="${dash / 2}"/>`;
    };
    const hand = (a, len, cls) => {
      const t = a * Math.PI / 180;
      return `<path class="${cls}" d="M${c} ${c}L${f(c + len * Math.sin(t))} ${f(c - len * Math.cos(t))}"/>`;
    };
    let body = `<circle class="vld" cx="${c}" cy="${c + 2}" r="55"/><circle class="vrim" cx="${c}" cy="${c}" r="54"/>` +
      `<path class="vfs" d="${cres(c, c, 52, 4)}"/><path class="vgc" stroke-width="1.6" d="${glossArc(c, c, 54)}"/>` + ring(48.5, 60, 1.2, 'vt1') + ring(47.8, 12, 2.6, 'vt5');
    if (def(o.nums, true)) {
      for (let i = 1; i <= 12; i++) {
        const a = i * Math.PI / 6;
        body += `<text class="vcn" x="${f(c + 35 * Math.sin(a))}" y="${f(c - 35 * Math.cos(a) + 4.5)}">${i}</text>`;
      }
    }
    body += hand((h + m / 60) * 30, 18, 'vhh') + hand(m * 6, 27, 'vmh') + `<circle class="vpin" cx="${c}" cy="${c}" r="4.5"/>`;
    return svg('clk', 2 * c, 2 * c, body, 'clock', false, 180);
  }

  // ---- array: rows x cols counters ----
  // Each row is one path: zero-length dashes with round caps draw the dots (rim path under the fill path).
  function array(rows, cols) {
    rows = clamp(Math.round(rows) || 1, 1, 12);
    cols = clamp(Math.round(cols) || 1, 1, 12);
    const s = 30, P = 6;
    let d = '';
    for (let r = 0; r < rows; r++) d += `M${P + s / 2} ${P + s / 2 + r * s}h${f((cols - 1) * s + 0.1)}`;
    const W = cols * s + 2 * P, H = rows * s + 2 * P;
    const body = `<rect class="vbg" width="${W}" height="${H}" rx="10"/>` +
      `<path class="vdd" stroke-dasharray="0 ${s}" d="${d}"/><path class="vd" stroke-dasharray="0 ${s}" transform="translate(-1.2 -1.2)" d="${d}"/>` +
      `<path class="vsp" stroke-width="5" stroke-dasharray="0 ${s}" transform="translate(-4.5 -4.5)" d="${d}"/>`;
    return svg('arr', W, H, body, 'array of dots');
  }

  // ---- counting dots ----
  // pip positions on a dice face (thirds of the face), 1..6
  const PIPS = ['4', '08', '048', '0268', '02468', '023568'];
  function dots(n, layout = 'row', o = {}) {
    n = clamp(Math.round(n) || 0, 0, 20);
    const r = 13, s = 34, P = 4;
    const pts = [];
    let W, H, body = '';
    if (layout == 'dice') {
      n = Math.min(n, 10);
      const F = 96, G = 14;
      const faces = n <= 6 ? [n] : [5, n - 5];
      faces.forEach((k, fi) => {
        const x0 = P + fi * (F + G);
        body += `<rect class="vld" x="${x0}" y="${P + 3}" width="${F}" height="${F}" rx="16"/><rect class="vo" x="${x0}" y="${P}" width="${F}" height="${F}" rx="16"/>`;
        for (const ch of PIPS[k - 1] || '') pts.push([x0 + (ch % 3 + 0.5) * F / 3, P + (Math.floor(ch / 3) + 0.5) * F / 3]);
      });
      W = faces.length * F + (faces.length - 1) * G + 2 * P;
      H = F + 2 * P;
    } else if (layout == 'scatter') {
      // one dot per cell of a grid, cells picked and dots nudged by a small seeded generator (not rnd(): a
      // picture must not change the generator's sequence). Cells are 44 wide and dots 26, so dots never touch.
      const C = 44, cols = Math.max(1, Math.ceil(Math.sqrt(n * 1.5))), rows = Math.max(1, Math.ceil(n * 1.3 / cols));
      let t = (n * 7919 + def(o.seed, 1) * 104729) >>> 0;
      const rand = () => {
        t = (t + 0x6D2B79F5) >>> 0;
        let z = Math.imul(t ^ (t >>> 15), 1 | t);
        z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z;
        return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
      };
      const cells = [...Array(rows * cols).keys()];
      for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [cells[i], cells[j]] = [cells[j], cells[i]];
      }
      const jit = C / 2 - r - 2;
      cells.slice(0, n).sort((a, b) => a - b).forEach(k => {
        pts.push([P + (k % cols + 0.5) * C + (rand() * 2 - 1) * jit, P + (Math.floor(k / cols) + 0.5) * C + (rand() * 2 - 1) * jit]);
      });
      W = cols * C + 2 * P;
      H = rows * C + 2 * P;
    } else if (layout == 'ten') {
      // rows of 5, a ten is two rows; tens stack downwards
      for (let i = 0; i < n; i++) {
        const j = i % 10;
        pts.push([P + r + (j % 5) * s, P + r + Math.floor(i / 10) * (2 * s + 14) + Math.floor(j / 5) * s]);
      }
    } else {
      // row: 10 per row with a gap after each 5
      for (let i = 0; i < n; i++) {
        const j = i % 10;
        pts.push([P + r + j * s + (j >= 5 ? 10 : 0), P + r + Math.floor(i / 10) * (s + 8)]);
      }
    }
    if (W == null) {
      // row and ten: the box around the dots
      W = Math.max(P, ...pts.map(q => q[0])) + r + P;
      H = Math.max(P, ...pts.map(q => q[1])) + r + P;
    }
    body += counters(pts, layout == 'dice' ? 10 : r, o);
    return svg('dots', W, H, body, 'dots to count');
  }


  // ======== part 2 (P1-11) ========
  // text from a generator, escaped
  const ex = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  // "?" box (the unknown) centred on (x, y)
  const qbox = (x, y, w = 28, h = 28) => `<rect class="vq" x="${f(x - w / 2)}" y="${f(y - h / 2)}" width="${w}" height="${h}" rx="7"/>` +
    `<text class="vqt" x="${f(x)}" y="${f(y + 6)}">?</text>`;
  // value label at baseline y: '?' draws the box, null or '' nothing, else text. cls ' vts' left-aligned, ' vta' right-aligned.
  const lbl = (x, y, v, cls = '') => (v == '?' ? qbox(x + (cls == ' vts' ? 14 : cls == ' vta' ? -14 : 0), y - 6) :
    v == null || v === '' ? '' : `<text${cls ? ` class="${cls.trim()}"` : ''} x="${f(x)}" y="${f(y)}">${ex(v)}</text>`);

  // ---- ruler ----
  // An object of length len along a cm or inch ruler (the object's ends have dashed guide lines to the ruler).
  function ruler(len, unit = 'cm', obj = 'bar', o = {}) {
    const inch = unit == 'in';
    len = Math.max(0, +len || 0);
    const from = Math.max(0, def(o.from, 0));
    const max = clamp(Math.round(def(o.max, Math.ceil(len + from) + 1)), inch ? 4 : 6, inch ? 12 : 15);
    const s = Math.floor(clamp(300 / max, 18, 34)), P = 20, RY = 58, RH = 48;
    const x0 = P + from * s, x1 = x0 + len * s, w = max * s;
    let body = '';
    if (obj == 'pencil' && len * s >= 40) {
      body += `<path class="vpt" d="M${f(x0)} 28L${f(x0 + 22)} 16v24z"/><path class="vpin" d="M${f(x0)} 28l5-3v6z"/>` +
        `<rect class="v2" x="${f(x0 + 22)}" y="16" width="${f(x1 - x0 - 22)}" height="24" rx="3"/>`;
    } else if (obj != 'none') body += `<rect class="v1" x="${f(x0)}" y="16" width="${f(len * s)}" height="24" rx="5"/>`;
    if (obj != 'none' && o.guide !== false) body += `<path class="vgd" d="M${f(x0)} 44V${RY}M${f(x1)} 44V${RY}"/>`;
    const per = inch ? 4 : 2;
    let t = '', lab = '';
    for (let k = 0; k <= max * per; k++) {
      const x = P + k / per * s;
      t += `M${f(x)} ${RY}v${k % per == 0 ? 16 : inch && k % 2 == 0 ? 12 : inch ? 8 : 10}`;
      if (k % per == 0) lab += `<text class="vcn" x="${f(x)}" y="${RY + 31}">${k / per}</text>`;
    }
    body += `<rect class="vru" x="${P}" y="${RY}" width="${w}" height="${RH}" rx="4"/><path class="vk" d="${t}"/>${lab}` +
      `<text class="vcn" x="${f(P + w - 18)}" y="${RY + RH - 5}">${inch ? 'in' : 'cm'}</text>`;
    return svg('rul', w + 2 * P, RY + RH + 4, body, 'ruler');
  }

  // ---- bar graph ----
  function barGraph(data, scale, o = {}) {
    data = (data || []).slice(0, 8).map(d => [d[0], Math.max(0, +d[1] || 0), d[2]]);
    const n = Math.max(1, data.length), top = Math.max(1, ...data.map(d => d[1]));
    const ks = [1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000];
    let sc = scale > 0 ? scale : ks.find(k => top / k <= 8) || 1000;
    if (top / sc > 10) sc = ks.find(k => k > sc && top / k <= 10) || sc;
    const rows = Math.max(1, Math.ceil(top / sc)), rh = clamp(Math.floor(170 / rows), 14, 28);
    const pitch = o.tap ? 48 : clamp(Math.floor(270 / n), 30, 56), L = 34, T = 14, base = T + rows * rh;
    const w = L + n * pitch + 6, bw = Math.round(pitch * 0.6);
    let grid = '', ylab = '', body = '';
    for (let k = 0; k <= rows; k++) {
      grid += `M${L} ${base - k * rh}h${n * pitch + 4}`;
      if (rows < 6 || k % 2 == 0) ylab += `<text class="vta" x="${L - 7}" y="${base - k * rh + 5}">${clean(k * sc)}</text>`;
    }
    body += `<path class="vgl" d="${grid}"/><path class="va" d="M${L} ${T - 4}V${base}H${w - 2}"/>${ylab}`;
    data.forEach(([name, v, set], i) => {
      const x = L + i * pitch + (pitch - bw) / 2, h = v / sc * rh;
      const bar = h > 0 ? `<rect class="${set == 2 ? 'v2' : 'v1'} vbar" x="${f(x)}" y="${f(base - h)}" width="${bw}" height="${f(h)}" rx="3"/>` +
        (h > 12 ? `<rect class="vgs" x="${f(x + 4)}" y="${f(base - h + 4)}" width="${f(bw * 0.2)}" height="${f(h - 8)}" rx="2"/>` : '') : '';
      const val = o.vals && h > 0 ? `<text class="vcn" x="${f(x + bw / 2)}" y="${f(base - h - 5)}">${clean(v)}</text>` : '';
      const lab = `<text class="vcn" x="${f(x + bw / 2)}" y="${base + 18}">${ex(String(name).slice(0, 8))}</text>`;
      body += o.tap ? `<g ${tapAttr(i)}><rect class="vh" x="${L + i * pitch}" y="0" width="${pitch}" height="${base + 28}"/>${bar}${lab}</g>` : bar + val + lab;
    });
    return svg('bar', w, base + 28, body, 'bar graph', !!o.tap);
  }

  // ---- pictograph ----
  function pictograph(data, o = {}) {
    data = (data || []).slice(0, 6).map(d => [d[0], Math.max(0, +d[1] || 0)]);
    const per = def(o.per, 1), r = 10, pc = 26;
    const LW = Math.min(88, Math.max(...data.map(d => String(d[0]).length), 3) * 8 + 8);
    const most = clamp(Math.ceil(Math.max(1, ...data.map(d => d[1])) / per), 1, 12);
    const w = LW + 12 + most * pc, rh = 34, key = per > 1 || o.key;
    const full = [];
    let half = '', body = '', grid = '';
    data.forEach(([name, v], i) => {
      const y = i * rh + rh / 2 + 2, k = v / per;
      body += `<text class="vta" x="${LW}" y="${y + 5}">${ex(name)}</text>`;
      grid += `M4 ${(i + 1) * rh + 2}h${f(w - 4)}`;
      for (let j = 0; j < Math.floor(k); j++) full.push([LW + 12 + j * pc + r + 2, y]);
      if (k % 1 >= 0.5) {
        const cx = LW + 12 + Math.floor(k) * pc + r + 2;
        half += `M${f(cx)} ${y - r}A${r} ${r} 0 0 0 ${f(cx)} ${y + r}z`;
      }
    });
    const H = data.length * rh + 4 + (key ? 34 : 0);
    body = `<path class="vgl" d="${grid}"/>` + body + counters(full, r) + (half ? `<path class="v1" d="${half}"/>` : '');
    if (key) body += counters([[LW + 12 + r + 2, H - 17]], r) + `<text class="vts" x="${LW + 12 + 2 * r + 10}" y="${H - 12}">= ${ex(def(o.key, per))}</text>`;
    return svg('pic', w, H, body, 'picture graph');
  }

  // ---- line plot: one circle per value, stacked over a number line ----
  function linePlot(data, o = {}) {
    data = (data || []).map(Number).filter(v => v == v).slice(0, 30);
    const min = def(o.min, Math.floor(Math.min(0, ...data))), step = def(o.step, 1);
    const max = def(o.max, Math.max(min + step, Math.ceil(Math.max(...data, 0))));
    const nT = Math.max(1, Math.round((max - min) / step)), den = o.den;
    const tap = (o.tapValues || []).map(Number).sort((a, b) => a - b);
    let w = def(o.w, 280);
    for (let i = 1; i < tap.length; i++) w = Math.max(w, 48 * (max - min) / Math.max(tap[i] - tap[i - 1], 1e-9));
    const P = 24, X = v => P + (v - min) / (max - min) * w;
    const stack = {};
    data.forEach(v => { const k = clean(Math.round((v - min) / step) * step + min); stack[k] = (stack[k] || 0) + 1; });
    const m = Math.min(8, Math.max(1, ...Object.values(stack))), Y = 14 + m * 19 + 10;
    const sp = w / nT, k = [1, 2, 5, 10].find(q => q * sp >= (den ? 26 : 22)) || 10;
    let ticks = '', text = '';
    for (let j = 0; j <= nT; j++) {
      const v = clean(min + j * step), x = X(v), lab = j % k == 0;
      ticks += `M${f(x)} ${Y - (lab ? 8 : 5)}v${lab ? 16 : 10}`;
      if (!lab) continue;
      const q = Math.round(v * den);
      text += den && q % den ? fracText(x, Y + 31, q, den) : `<text x="${f(x)}" y="${Y + (den ? 36 : 32)}">${num(den ? q / den : v)}</text>`;
    }
    let body = `<path class="va" d="M${P - 14} ${Y}H${f(P + w + 14)}"/><path class="vk" d="${ticks}"/>${text}`;
    const pts = [];
    for (const kk of Object.keys(stack)) for (let j = 0; j < Math.min(stack[kk], 8); j++) pts.push([X(+kk), Y - 16 - j * 19]);
    body += counters(pts, 8);
    tap.forEach((v, i) => {
      const l = i ? (X(v) - X(tap[i - 1])) / 2 : 24, r = i < tap.length - 1 ? (X(tap[i + 1]) - X(v)) / 2 : 24;
      body += `<g ${tapAttr(v)}><rect class="vh" x="${f(X(v) - l)}" y="0" width="${f(l + r)}" height="${Y + 48}"/>` +
        `<circle class="vm" cx="${f(X(v))}" cy="${Y}" r="10"/></g>`;
    });
    return svg('lp', w + 2 * P, Y + (den ? 52 : 40), body, 'line plot', tap.length > 0);
  }

  // ---- shapes ----
  // Outlines as points in -1..1 (y down); regular ones are generated. Everything is drawn in a 100 x 100 box.
  const reg = (n, off) => [...Array(n).keys()].map(i => [Math.sin(2 * Math.PI * (i + off) / n), -Math.cos(2 * Math.PI * (i + off) / n)]);
  const POLY = {
    triangle: [[0, -1], [1, 0.8], [-1, 0.8]], square: [[-1, -1], [1, -1], [1, 1], [-1, 1]],
    rectangle: [[-1, -0.6], [1, -0.6], [1, 0.6], [-1, 0.6]], rhombus: [[0, -1], [0.7, 0], [0, 1], [-0.7, 0]],
    trapezoid: [[-0.55, -0.6], [0.55, -0.6], [1, 0.6], [-1, 0.6]],
    pentagon: reg(5, 0), hexagon: reg(6, 0.5), octagon: reg(8, 0.5),
  };
  // solids: s1 front, s2 top or light, s3 side or shade (colours in 32-viz.css)
  const SOLIDS = {
    cube: '<path class="s1" d="M15 38h48v48h-48z"/><path class="s2" d="M15 38L37 16h48L63 38z"/><path class="s3" d="M63 38L85 16v48L63 86z"/>',
    prism: '<path class="s1" d="M8 42h60v40h-60z"/><path class="s2" d="M8 42L30 20h60L68 42z"/><path class="s3" d="M68 42L90 20v40L68 82z"/>',
    cylinder: '<path class="s1" d="M22 22V78A28 9 0 0 0 78 78V22z"/><ellipse class="s2" cx="50" cy="22" rx="28" ry="9"/>',
    cone: '<path class="s1" d="M50 12L18 78A32 10 0 0 0 82 78z"/>',
    sphere: '<circle class="s1" cx="50" cy="50" r="40"/><path class="s0" d="M10 50A40 12 0 0 0 90 50"/>' +
      '<ellipse class="s2" cx="36" cy="33" rx="12" ry="7" transform="rotate(-35 36 33)"/>',
  };
  const shapeNames = Object.keys(POLY).concat(['circle', 'oval'], Object.keys(SOLIDS));
  function shape(name, o = {}) {
    const c = o.c == 2 ? 'v2' : 'v1', B = 100;
    if (SOLIDS[name]) return svg('shp', B, B, `<g class="vsl${o.c == 2 ? ' c2' : ''}">${SOLIDS[name]}</g>`, 'solid');
    const th = (def(o.rot, 0) % 360) * Math.PI / 180, st = name == 'circle' || name == 'square' ? 1 : def(o.st, 1);
    const cs = Math.cos(th), sn = Math.sin(th);
    let body;
    if (name == 'circle' || name == 'oval') {
      const a = name == 'oval' ? 1.4 * st : 1;
      const k = 45 / Math.max(Math.hypot(a * cs, sn), Math.hypot(a * sn, cs));
      body = `<ellipse class="${c}" cx="50" cy="50" rx="${f(a * k)}" ry="${f(k)}" transform="rotate(${f(th * 180 / Math.PI)} 50 50)"/>`;
    } else {
      let pts = (POLY[name] || POLY.square).map(([x, y]) => [x * st * cs - y * sn, x * st * sn + y * cs]);
      const k = 45 / Math.max(...pts.map(p => Math.max(Math.abs(p[0]), Math.abs(p[1]))));
      pts = pts.map(p => [50 + p[0] * k, 50 + p[1] * k]);
      body = `<path class="${c}" d="M${pts.map(p => f(p[0]) + ' ' + f(p[1])).join('L')}z"/>`;
      if (o.dots) body += `<g class="vdt">${pts.map(p => `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="4"/>`).join('')}</g>`;
    }
    return svg('shp', B, B, body, 'shape');
  }

  // ---- area grid (cells drawn like base-ten cells: one dashed stroke per row) ----
  function areaGrid(w, h, o = {}) {
    w = clamp(Math.round(w) || 1, 1, 12);
    h = clamp(Math.round(h) || 1, 1, 12);
    const n = clamp(Math.round(def(o.n, w * h)), 0, w * h);
    const p = clamp(Math.floor(Math.min(300 / w, 240 / h)), 14, 34), c = p - 2, P = 3;
    let on = '', off = '';
    for (let r = 0; r < h; r++) {
      const k = clamp(n - r * w, 0, w), y = f(P + r * p + p / 2);
      if (k) on += `M${P + 1} ${y}h${k * p - 2}`;
      if (k < w) off += `M${P + 1 + k * p} ${y}h${(w - k) * p - 2}`;
    }
    const d = `stroke-width="${c}" stroke-dasharray="${c} 2"`;
    const body = `<rect class="vb" x="${P}" y="${P}" width="${w * p}" height="${h * p}" rx="3"/>` +
      (off ? `<path class="vce" ${d} d="${off}"/>` : '') + (on ? `<path class="vc" ${d} d="${on}"/>` : '');
    return svg('area', w * p + 2 * P, h * p + 2 * P, body, 'grid of squares');
  }

  // ---- rectangle with side labels (not to scale: only the ratio is followed) ----
  function rectSides(w, h, labels = {}, o = {}) {
    const k = Math.min(190 / Math.max(w, 1), 100 / Math.max(h, 1));
    const rw = clamp(w * k, 70, 190), rh = clamp(h * k, 44, 100), X = 56, Y = 30;
    const u = v => (v == '?' || v == null ? v : v + (o.unit ? ' ' + o.unit : ''));
    const lw = u(labels.w), lh = u(labels.h);
    let d = '';
    for (const [x, y, sx, sy] of [[X, Y, 1, 1], [X + rw, Y, -1, 1], [X + rw, Y + rh, -1, -1], [X, Y + rh, 1, -1]])
      d += `M${x + 10 * sx} ${y}v${10 * sy}h${-10 * sx}`;
    const body = `<rect class="vpo" x="${X}" y="${Y}" width="${rw}" height="${rh}" rx="2"/><path class="vk" d="${d}"/>` +
      lbl(X + rw / 2, Y + rh + 24, lw) + (o.all ? lbl(X + rw / 2, Y - 10, lw) : '') +
      lbl(X + rw + 10, Y + rh / 2 + 5, lh, ' vts') + (o.all ? lbl(X - 10, Y + rh / 2 + 5, lh, ' vta') : '');
    return svg('rect', rw + 2 * X, rh + Y + 36, body, 'rectangle with sides');
  }

  // ---- angle ----
  function angle(deg, o = {}) {
    deg = clamp(Math.round(deg) || 0, 1, o.proto ? 180 : 359);
    const rot = o.proto ? 0 : def(o.rot, 0), R = o.proto ? 120 : 96, ar = o.proto ? 34 : 28;
    const at = (a, r) => [Math.cos(a * Math.PI / 180) * r, -Math.sin(a * Math.PI / 180) * r];
    const a0 = rot, a1 = rot + deg;
    const pts = [[0, 0], at(a0, R), at(a1, R)];
    for (let a = a0; a <= a1; a += 10) pts.push(at(a, ar + 14));
    if (o.proto) pts.push([-R - 12, 0], [R + 12, 0], [0, -R - 12]);
    const x0 = Math.min(...pts.map(p => p[0])) - 14, y0 = Math.min(...pts.map(p => p[1])) - 14;
    const W = Math.max(...pts.map(p => p[0])) + 14 - x0, H = Math.max(...pts.map(p => p[1])) + 14 - y0;
    const T = (x, y) => `${f(x - x0)} ${f(y - y0)}`;
    const P1 = at(a0, ar), P2 = at(a1, ar);
    let body = '';
    if (o.proto) {
      let t = '', tx = '';
      for (let a = 0; a <= 180; a += 10) {
        const m = a % 30 == 0;
        t += `M${T(...at(a, R - (m ? 14 : 8)))}L${T(...at(a, R))}`;
        if (m) tx += `<text class="vcn" x="${f(at(a, R - 26)[0] - x0)}" y="${f(at(a, R - 26)[1] - y0 + 4)}">${a}</text>`;
      }
      body += `<path class="vru" d="M${T(-R - 8, 0)}A${R + 8} ${R + 8} 0 0 1 ${T(R + 8, 0)}z"/><path class="vk" d="${t}"/>${tx}`;
    }
    body += `<path class="${o.proto ? 'vwg' : 'v1'}" d="M${T(0, 0)}L${T(...P1)}A${ar} ${ar} 0 ${deg > 180 ? 1 : 0} 0 ${T(...P2)}z"/>` +
      `<path class="va" d="M${T(...at(a0, R))}L${T(0, 0)}L${T(...at(a1, R))}"/>`;
    if (deg == 90) {
      const u = at(a0, 14), v = at(a1, 14);
      body += `<path class="vk" d="M${T(...u)}L${T(u[0] + v[0], u[1] + v[1])}L${T(...v)}"/>`;
    }
    if (o.label != null && o.label !== '') {
      const m = at(a0 + deg / 2, ar + (deg < 40 ? 26 : 18));
      body += o.label == '?' ? qbox(m[0] - x0, m[1] - y0, 26, 26) : `<text x="${f(m[0] - x0)}" y="${f(m[1] - y0 + 5)}">${ex(o.label)}</text>`;
    }
    return svg('ang', W, H, body, 'angle');
  }

  // ---- coordinate grid ----
  function coordGrid(o = {}) {
    const four = o.quadrants == 4, tapPts = o.tapPts || [];
    const mx = clamp(Math.round(def(o.max, tapPts.length ? (four ? 3 : 5) : (four ? 5 : 6))), 1, 10);
    const span = four ? 2 * mx : mx, lo = four ? -mx : 0;
    const p = tapPts.length ? 48 : clamp(Math.floor(270 / span), 16, 40);
    const ox = 28 + (four ? mx * p : 0), oy = 14 + mx * p, W = 28 + span * p + 18, H = 14 + (four ? 2 : 1) * mx * p + 26;
    const X = x => ox + x * p, Y = y => oy - y * p;
    let g = '', lab = '';
    for (let k = lo; k <= mx; k++) {
      g += `M${X(k)} ${Y(mx)}V${Y(lo)}M${X(lo)} ${Y(k)}H${X(mx)}`;
      if (k) lab += `<text class="vcn" x="${X(k)}" y="${oy + 18}">${num(k)}</text><text class="vcn vta" x="${ox - 7}" y="${Y(k) + 5}">${num(k)}</text>`;
    }
    lab += `<text class="vcn vta" x="${ox - 7}" y="${oy + 18}">0</text>`;
    let body = `<path class="vgl" d="${g}"/><path class="va" d="M${X(lo) - 6} ${oy}H${X(mx) + 10}M${ox} ${Y(lo) + 6}V${Y(mx) - 10}"/>` +
      `<path class="vr" d="M${X(mx) + 16} ${oy}l-7-5v10zM${ox} ${Y(mx) - 16}l-5 7h10z"/>${lab}`;
    const pts = o.points || [];
    if (o.join && pts.length > 1) body += `<path class="vjn" d="M${pts.map(q => X(q[0]) + ' ' + Y(q[1])).join('L')}${o.close ? 'z' : ''}"/>`;
    if (pts.length) body += `<g class="v1">${pts.map(q => `<circle cx="${X(q[0])}" cy="${Y(q[1])}" r="7"/>`).join('')}${vol(pts.map(q => [X(q[0]), Y(q[1])]), 7)}</g>` +
      pts.filter(q => q[2]).map(q => `<text class="vts" x="${X(q[0]) + 10}" y="${Y(q[1]) - 9}">${ex(q[2])}</text>`).join('');
    tapPts.forEach(q => {
      body += `<g ${tapAttr(q[0] + ',' + q[1])}><rect class="vh" x="${X(q[0]) - 24}" y="${Y(q[1]) - 24}" width="48" height="48"/>` +
        `<circle class="vm" cx="${X(q[0])}" cy="${Y(q[1])}" r="9"/></g>`;
    });
    return svg('grid', W, H, body, 'coordinate grid', tapPts.length > 0);
  }

  // ---- balance scale ----
  function balance(left, right, o = {}) {
    const side = v => (v && typeof v == 'object' ? v : {n: v});
    const L = side(left), R = side(right);
    const ln = clamp(Math.round(L.n) || 0, 0, 99), rn = clamp(Math.round(R.n) || 0, 0, 99);
    const tilt = o.tilt != null ? o.tilt : L.q || R.q ? 0 : Math.sign(ln - rn);
    const th = tilt * 8 * Math.PI / 180, cx = 150, py = 70, half = 100;
    const ends = [[cx - half * Math.cos(th), py + half * Math.sin(th)], [cx + half * Math.cos(th), py - half * Math.sin(th)]];
    let body = `<path class="vst" d="M${cx} ${py + 8}L${cx - 28} 194h56z"/>`;
    [[L, ln, 0], [R, rn, 1]].forEach(([sd, n, i]) => {
      const [x, y] = ends[i], yp = y + 80;
      body += `<path class="vsr" d="M${f(x)} ${f(y)}L${f(x - 40)} ${f(yp)}M${f(x)} ${f(y)}L${f(x + 40)} ${f(yp)}"/>` +
        `<path class="vpan" d="M${f(x - 44)} ${f(yp)}h88a44 14 0 0 1-88 0z"/>`;
      let stackH;
      if (n > 10 || o.nums) {
        body += `<rect class="${i ? 'vwr' : 'vwl'}" x="${f(x - 30)}" y="${f(yp - 36)}" width="60" height="36" rx="8"/>` +
          `<text x="${f(x)}" y="${f(yp - 12)}">${n}</text>`;
        stackH = 36;
      } else {
        const pts = [];
        for (let k = 0; k < n; k++) pts.push([x + (k % 5 - (Math.min(n, 5) - 1) / 2) * 17, yp - 10 - Math.floor(k / 5) * 17]);
        body += counters(pts, 8).replace('class="v1"', i ? 'class="v2"' : 'class="v1"');
        stackH = Math.ceil(n / 5) * 17 + 2;
      }
      if (sd.q) body += qbox(x, yp - stackH - 16);
    });
    body += `<path class="vbm" d="M${f(ends[0][0])} ${f(ends[0][1])}L${f(ends[1][0])} ${f(ends[1][1])}"/><circle class="vpin" cx="${cx}" cy="${py}" r="7"/>`;
    return svg('bal', 300, 200, body, 'balance scale');
  }

  // ---- coins and bills ----
  const COIN = {1: 18.6, 5: 20.7, 10: 17.4, 25: 23.7, 50: 30};
  function coinSVG(v, o = {}) {
    const list = (Array.isArray(v) ? v : [v]).slice(0, 16).map(x => (COIN[x] || [100, 500, 1000, 2000].includes(x) ? x : 1));
    const face = o.face !== false;
    let x = 4, y = 0, mx = 0, row = '';
    for (const c of list) {
      const d = COIN[c] ? 2 * COIN[c] : 90;
      if (x + d > 300 && row) { mx = Math.max(mx, x); x = 4; y += 64; }
      const cx = x + d / 2, cy = y + 32, r = COIN[c];
      row += r
        ? `<circle class="${c == 1 ? 'vcu' : 'vsv'}" cx="${f(cx)}" cy="${cy}" r="${r}"/><path class="vcs${c == 1 ? ' vcp' : ''}" d="${cres(cx, cy, r - 1.5, f(r * 0.16))}"/>` +
          `<path class="vgc" stroke-width="2.6" d="${glossArc(cx, cy, r - 3.5)}"/><circle class="vci${c == 1 ? ' vcp' : ''}" cx="${f(cx)}" cy="${cy}" r="${f(r - 4)}"/>` +
          (face ? `<text class="vcc${c == 1 ? ' vcp' : ''}" x="${f(cx)}" y="${cy + 5}">${c}¢</text>` : '')
        : `<rect class="vld" x="${f(x)}" y="${cy - 19}" width="90" height="44" rx="5"/><rect class="vbl" x="${f(x)}" y="${cy - 22}" width="90" height="44" rx="5"/><rect class="vbi" x="${f(x + 5)}" y="${cy - 17}" width="80" height="34" rx="3"/>` +
          (face ? `<text class="vcb" x="${f(cx)}" y="${cy + 7}">$${c / 100}</text>` : '');
      x += d + 8;
    }
    mx = Math.max(mx, x);
    return svg('coin', Math.max(mx - 4, 12), y + 64, row, 'money');
  }

  // ---- tally marks ----
  function tally(n) {
    n = clamp(Math.round(n) || 0, 0, 50);
    const gp = 52, groups = Math.floor(n / 5), rest = n % 5, total = groups + (rest ? 1 : 0);
    let d = '';
    for (let g = 0; g < total; g++) {
      const x = 10 + (g % 5) * gp, y = 6 + Math.floor(g / 5) * 50, k = g < groups ? 4 : rest;
      for (let i = 0; i < k; i++) d += `M${x + i * 9} ${y}v38`;
      if (g < groups) d += `M${x - 6} ${y + 31}L${x + 33} ${y + 7}`;
    }
    return svg('tal', Math.min(Math.max(total, 1), 5) * gp - 4, Math.max(1, Math.ceil(total / 5)) * 50 + 2, `<path class="vtk" d="${d}"/>`, 'tally marks');
  }

  // ---- in/out table ----
  function tableInOut(rows, o = {}) {
    rows = (rows || []).slice(0, 8);
    const head = o.head || ['In', 'Out'], cw = 84, hh = 36, rh = 40, P = 3, H = hh + rows.length * rh;
    let body = `<rect class="vo" x="${P}" y="${P}" width="${2 * cw}" height="${H}" rx="8"/>` +
      `<path class="v1" d="M${P + 8} ${P}h${2 * cw - 16}a8 8 0 0 1 8 8v${hh - 8}h${-2 * cw}v${8 - hh}a8 8 0 0 1 8-8z"/>` +
      `<text class="vw" x="${P + cw / 2}" y="${P + 24}">${ex(head[0])}</text><text class="vw" x="${P + cw * 1.5}" y="${P + 24}">${ex(head[1])}</text>`;
    let d = `M${P + cw} ${P}v${H}`;
    rows.forEach((r, i) => {
      const y = P + hh + i * rh;
      if (i) d += `M${P} ${y}h${2 * cw}`;
      body += lbl(P + cw / 2, y + 26, r[0]) + lbl(P + cw * 1.5, y + 26, r[1]);
    });
    return svg('tio', 2 * cw + 2 * P, H + 2 * P, body + `<path class="vl" d="${d}"/>`, 'in out table');
  }

  return {tenFrame, base10, numLine, fracBar, fracCircle, clock, array, dots,
    ruler, barGraph, pictograph, linePlot, shape, shapeNames, areaGrid, rectSides, angle, coordGrid, balance, coinSVG, tally, tableInOut};
})();
