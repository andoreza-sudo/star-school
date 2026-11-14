/* Star School gen v155. BUILT by tools/build.py from 23-viz.js, 30-gen-math.js, 31-gen-math-early.js, 32-gen-read.js, 33-gen-math-mid.js, 34-gen-es.js: never edit by hand.
   index.html v155 loads this file with <script src="gen.v155.js"> after its own code, before data.v155.js. */
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
     rayLine(o)                   P2-14: an inequality (x > k, x < k) on a number line (o.min -5, o.max 5, every value labelled, o.w 290):
                                  a thick ray from o.at to the end of the line, o.dir 'right' (default) or 'left', and a hollow dot
                                  at o.at (the number itself is not in the answer)
     solid(parts, o)              P2-12: boxes in 3D, parts [{l, h, c2}] side by side along the length, o.w their width (all to 12);
                                  o.grid draws the unit cubes, o.lab prints l, w, h on the edges (for volume)
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

  // ---- inequality on a number line (P2-14) ----
  // The numLine with every value labelled, then the ray and the end dot on top. Same geometry as numLine (P = 24, Y = 28).
  function rayLine(o = {}) {
    const min = def(o.min, -5), max = def(o.max, 5), w = def(o.w, 290), P = 24, Y = 28;
    const X = v => P + (v - min) / (max - min) * w, x0 = X(o.at), right = o.dir != 'left';
    const x1 = right ? P + w + 8 : P - 8;
    const add = `<path class="vray" d="M${f(x0)} ${Y}H${f(x1)}"/><circle class="vm" cx="${f(x0)}" cy="${Y}" r="9"/>`;
    return numLine({min, max, labels: 'all', w}).replace('</svg>', add + '</svg>');
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
    // with tap targets the picture keeps 24 units free above and to the right, so the targets at the edge are whole 48 x 48 squares
    const tp = tapPts.length > 0, top = tp ? 24 : 14;
    const ox = 28 + (four ? mx * p : 0), oy = top + mx * p, W = 28 + span * p + (tp ? 24 : 18), H = top + (four ? 2 : 1) * mx * p + 26;
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
      // a name sits up and to the right of its point; on the right or top edge of the grid it goes left or below so it stays inside
      pts.filter(q => q[2]).map(q => {
        const right = q[0] < mx, top = q[1] < mx;
        return `<text class="${right ? 'vts' : 'vta'}" x="${X(q[0]) + (right ? 10 : -10)}" y="${Y(q[1]) + (top ? -9 : 18)}">${ex(q[2])}</text>`;
      }).join('');
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

  // ---- boxes in 3D (P2-12): rectangular prisms for volume ----
  // parts [{l, h, c2?}]: boxes of the same width o.w, side by side along the length; the array order is the draw order, so each
  // box is in front of the one before. o.grid draws the unit cubes on the three visible faces; o.lab prints l, w, h on the edges.
  // Corner (x, y, z) goes to the screen as x along the lower right, y along the lower left, z up. Faces reuse .vsl / .s1 .s2 .s3.
  function solid(parts, o = {}) {
    parts = (parts || []).slice(0, 3).map(p => ({l: clamp(Math.round(p.l), 1, 12), h: clamp(Math.round(p.h), 1, 12), c2: !!p.c2}));
    const w = clamp(Math.round(def(o.w, 3)), 1, 12), L = parts.reduce((s, p) => s + p.l, 0), H = Math.max(1, ...parts.map(p => p.h));
    const s = f(Math.min(28, 300 / ((L + w) * 0.866), 210 / ((L + w) * 0.5 + H))), c = 0.866 * s, e = 0.5 * s, lab = !!o.lab;
    const ox = (lab ? 34 : 14) + w * c, oy = 14 + H * s;
    const P = (x, y, z) => `${f(ox + (x - y) * c)} ${f(oy + (x + y) * e - z * s)}`;
    const poly = pts => 'M' + pts.map(q => P(...q)).join('L') + 'z';
    const W = ox + L * c + (lab ? 34 : 14), Hh = oy + (L + w) * e + (lab ? 36 : 14);
    let body = '', x0 = 0;
    parts.forEach((p, n) => {
      const x1 = x0 + p.l, h = p.h;
      let g = '', gt = ''; // grid lines: on the sides (light lines) and on the top (dark lines)
      if (o.grid) {
        for (let i = 1; i < p.l; i++) {
          gt += `M${P(x0 + i, 0, h)}L${P(x0 + i, w, h)}`;
          g += `M${P(x0 + i, w, 0)}L${P(x0 + i, w, h)}`;
        }
        for (let j = 1; j < w; j++) {
          gt += `M${P(x0, j, h)}L${P(x1, j, h)}`;
          g += `M${P(x1, j, 0)}L${P(x1, j, h)}`;
        }
        for (let k = 1; k < h; k++) g += `M${P(x0, w, k)}L${P(x1, w, k)}L${P(x1, 0, k)}`;
      }
      body += `<g class="vsl${p.c2 ? ' c2' : ''}"><path class="s2" d="${poly([[x0, 0, h], [x1, 0, h], [x1, w, h], [x0, w, h]])}"/>` +
        `<path class="s1" d="${poly([[x0, w, 0], [x1, w, 0], [x1, w, h], [x0, w, h]])}"/>` +
        `<path class="s3" d="${poly([[x1, w, 0], [x1, 0, 0], [x1, 0, h], [x1, w, h]])}"/>` +
        `${gt ? `<path class="vcg vct" d="${gt}"/>` : ''}${g ? `<path class="vcg" d="${g}"/>` : ''}</g>`;
      if (lab) {
        const [bx, by] = P((x0 + x1) / 2, w, 0).split(' ').map(Number);
        body += `<text x="${f(bx - 12)}" y="${f(by + 20)}">${p.l}</text>`;
        const [hx, hy] = (n == 0 ? P(x0, w, h / 2) : P(x1, 0, h / 2)).split(' ').map(Number);
        body += `<text x="${f(n == 0 ? hx - 14 : hx + 14)}" y="${f(hy + 5)}">${h}</text>`;
      }
      x0 = x1;
    });
    if (lab) {
      const [wx, wy] = P(L, w / 2, 0).split(' ').map(Number);
      body += `<text x="${f(wx + 14)}" y="${f(wy + 18)}">${w}</text>`;
    }
    return svg('box', W, Hh, body, 'box made of cubes');
  }

  return {tenFrame, base10, numLine, fracBar, fracCircle, clock, array, dots,
    ruler, barGraph, pictograph, linePlot, shape, shapeNames, areaGrid, rectSides, angle, coordGrid, balance, coinSVG, tally, tableInOut, solid, rayLine};
})();
/* ---------- math generators ---------- */
function genAdd(lv){let a,b;
  if(lv==1){const s=R(2,10);a=R(0,s);b=s-a}
  else if(lv==2){const k=pick([9,9,8,10,'d']);if(k=='d'){a=b=R(1,9)}else{a=k;b=R(1,9)}if(coin())[a,b]=[b,a]}
  else{a=R(2,9);b=R(2,9)}
  return mathQ(a,'+',b,a+b,'c',coin(),lv==1?{}:{hint:factHint(a,'+',b,a+b,'c')})}
function genMiss(lv){let c,a;
  if(lv==1){c=R(3,10);a=R(0,c)}
  else{[a,c]=factPair();c+=a} // R-01m: every fact with a sum of 10 to 18 equally often
  const blank=coin()?'a':'b';
  return mathQ(a,'+',c-a,c,blank,false,lv==1?{}:{hint:factHint(a,'+',c-a,c,blank)})}
function genSub(lv){let a,b;
  if(lv==1){a=R(2,10);b=R(0,a)}else if(lv==2){const [x,y]=factPair();a=x+y;b=y} // R-01m: every take-away fact from 10 to 18 equally often
  else if(lv==3){const a1=R(1,9),b1=R(0,a1),a2=R(2,9),b2=R(1,a2-1);a=a2*10+a1;b=b2*10+b1;
    return mathQ(a,'-',b,a-b,'c',true,{hint:{k:'text',s:`Ones first: ${a1} − ${b1}. Then tens: ${a2} − ${b2}.`}})}
  else{const a1=R(0,8),b1=R(a1+1,9),a2=R(3,9),b2=R(1,a2-2);a=a2*10+a1;b=b2*10+b1;
    return mathQ(a,'-',b,a-b,'c',true,{hint:{k:'text',s:`${a1} − ${b1}? Too small! Borrow a ten: ${a1+10} − ${b1} = ${a1+10-b1}. Now the tens: ${a2-1} − ${b2}.`}})}
  return mathQ(a,'-',b,a-b,'c',coin(),lv==2?{hint:factHint(a,'-',b,a-b,'c')}:{})}

/* ---------- R-01m: fact strategy hints (add 2 "+9 & Doubles", add 3 "All the Facts", miss 2, sub 2) ----------
   First graders learn the facts to 20 through strategies, not by counting every block (CCSS 1.OA.6): count on from the bigger
   number for +1, +2, +3; doubles and near doubles; ten pairs; make a ten; +9 as +10 then take 1 away; think addition for
   take away and missing numbers. factHint picks one strategy per fact (the same one every time, so a rebuilt question shows
   the same hint) and draws it with ten frames or a number line. The words are short and are read aloud (w). The hint never
   says the final answer: the child does the last small step. hint.st names the strategy (tools/test.js checks it). */
const FACT_PAIRS=[];for(let x=1;x<=9;x++)for(let y=1;y<=9;y++)if(x+y>=10)FACT_PAIRS.push([x,y]); // the 45 facts that cross 10
const factPair=()=>pick(FACT_PAIRS);
function factHint(a,op,b,c,blank){
  const two=(f1,f2)=>`<div class="fh-frs">${f1}${f2}</div>`;
  const tf=(n,o)=>VIZ.tenFrame(n,10,o||{});
  // a number line from lo to hi with hops [[from, to, label]]; hide: values shown as a "?" box
  const line=(lo,hi,hops,hide)=>VIZ.numLine({min:lo,max:hi,step:1,labels:'all',hops,hide});
  const ones=(from,n,dir)=>Array.from({length:n},(_,i)=>[from+dir*i,from+dir*(i+1),dir>0?'+1':'−1']);
  const out=(st,pic,txt,w)=>({k:'html',st,html:`<div class="fhint">${pic}<div class="fh-t">${txt}</div></div>`,w:w||txt.replace(/ \+ /g,' plus ').replace(/ − /g,' minus ')});
  if(op=='+'&&blank=='c'){
    const big=Math.max(a,b),sm=Math.min(a,b);
    if(a==b){
      if(a<=5)return out('double',VIZ.array(2,a),`Doubles! Two rows of ${a}. Count the pairs by 2s.`);
      return out('double',two(tf(a,{b:a-5}),tf(a,{b:a-5})),`Doubles! Each ${a} is 5 and ${a-5}. 5 + 5 is 10. Then add ${a-5} + ${a-5}.`);
    }
    if(big==10)return out('ten',two(tf(10),tf(sm,{b:sm})),`One full ten and ${sm} more. Ten and ${sm} make a teen number.`);
    if(sm<=3)return out('counton',line(big-1,big+sm+1,ones(big,sm,1),[c]),`Start at the bigger number, ${big}. Count on ${sm}.`);
    if(big-sm==1)return out('near',two(tf(sm),tf(big,{b:1})),`${sm} + ${big} is next to a double. ${sm} + ${sm} is ${sm*2}. Then 1 more.`);
    if(c==10)return out('tenpair',tf(10,{b:sm}),`${big} and ${sm} fill the ten frame. How many in a full ten frame?`);
    if(big==9)return out('nine',two(tf(10,{fade:1}),tf(sm,{b:sm})),`9 is 10 take away 1. 10 + ${sm} is ${10+sm}. Then take 1 away.`);
    const need=10-big;
    return out('make10',two(tf(10,{b:need}),tf(sm-need,{b:sm-need})),`Make a ten! ${big} needs ${need} more. Take ${need} from the ${sm}. Now it is 10 + ${sm-need}.`);
  }
  if(op=='+'){ // a missing number: known + ? = c (think addition: count up to c)
    const k=blank=='a'?b:a;
    if(c==10)return out('tenpair',tf(k),`What goes with ${k} to make 10? Count the empty boxes.`);
    if(c-k<=3)return out('countup',line(k-1,c+1,ones(k,c-k,1),[]),`Start at ${k}. Count up to ${c}. How many jumps?`);
    return out('thinkadd',line(k-1,c+1,[[k,10],[10,c]],[]),`What goes with ${k} to make ${c}? Jump from ${k} to 10, then to ${c}. Add the jumps.`);
  }
  // take away: a − b = ?
  if(b<=3)return out('countback',line(a-b-1,a+1,ones(a,b,-1),[c]),`Start at ${a}. Count back ${b}.`);
  if(a==10)return out('tenpair',tf(b),`Think addition: ${b} + ? = 10. Count the empty boxes.`,`Think addition: ${b} plus what makes 10? Count the empty boxes.`);
  if(c<=3)return out('countup',line(b-1,a+1,ones(b,c,1),[]),`${b} and ${a} are close. Count up from ${b} to ${a}. How many jumps?`);
  return out('thinkadd',line(b-1,a+1,[[b,10],[10,a]],[]),`Think: ${b} + ? = ${a}. Jump from ${b} to 10, then to ${a}. Add the jumps.`,
    `Think addition: ${b} plus what makes ${a}? Jump from ${b} to 10, then to ${a}. Add the jumps.`);
}
function genBig(lv){let a,b,s;
  if(lv==1){const m=coin()?10:100,x=R(1,8),y=R(1,9-x);a=x*m;b=y*m;
    const u=m==10?'ten':'hundred';s=`Think: ${qN(x,u)} + ${qN(y,u)}.`}
  else if(lv==2){const a1=R(0,8),b1=R(0,9-a1),a2=R(1,8),b2=R(1,9-a2);a=a2*10+a1;b=b2*10+b1;s=`Ones first: ${a1} + ${b1}. Then tens: ${a2} + ${b2}.`}
  else if(lv==4){const x=[R(1,8),R(0,9),R(0,9)],y=[R(1,9-x[0]),R(0,9-x[1]),R(0,9-x[2])];a=x[0]*100+x[1]*10+x[2];b=y[0]*100+y[1]*10+y[2];s='Add each column: ones, then tens, then hundreds.'}
  else{const a1=R(2,9),b1=R(10-a1,9),a2=R(1,7),b2=R(1,8-a2);a=a2*10+a1;b=b2*10+b1;s=`Ones first: ${a1} + ${b1} = ${a1+b1}. Write ${(a1+b1)%10}, carry the 1 to the tens!`}
  return mathQ(a,'+',b,a+b,'c',true,{hint:{k:'text',s}})}
function genEO(lv){const n=lv==1?R(0,20):R(21,99);
  return{kind:'choice',html:`<div>${n}</div><div class="sub">Even or odd?</div>`,say:`Is ${n} even or odd?`,ans:n%2?'odd':'even',
    choices:[{l:'Even',v:'even'},{l:'Odd',v:'odd'}],hint:{k:'pairs',n},label:`${n} even/odd`}}
function genCnt(lv){let step,start;
  if(lv==1){step=pick([1,10]);start=step==1?R(0,25):10*R(0,5)}
  else if(lv==2){step=pick([2,5,10]);start=step==2?2*R(0,10):step==5?5*R(0,10):10*R(0,5)}
  else{step=pick([1,2,5,10]);start=step==1?R(95,115):step==2?2*R(10,40):step==5?5*R(10,20):R(1,9)+10*R(0,3)}
  const seq=[0,1,2,3,4].map(i=>start+i*step),bi=R(1,4);
  return{kind:'num',html:`<div class="seq">${seq.map((n,i)=>i==bi?SLOT:n).join(', ')}</div><div class="sub">Count by ${step}s</div>`,
    say:`Count by ${step}s. `+seq.map((n,i)=>i==bi?'what':n).join(', '),ans:String(seq[bi]),
    hint:{k:'text',s:`Add ${step} each time. What comes after ${seq[bi-1]}?`},label:seq.map((n,i)=>i==bi?'_':n).join(',')}}
// [plural, emoji, singular, drawing name (the singular when left out)]; story levels 4-6 read [0] (the plural) only
const THINGS=[['apples','🍎','apple'],['cookies','🍪','cookie'],['ducks','🦆','duck'],['balls','⚽','ball'],['stickers','⭐','sticker','star'],
  ['toy cars','🚗','toy car','car'],['fish','🐟','fish'],['crayons','🖍️','crayon'],['pencils','✏️','pencil']];
const NAMES=['Sam','Mia','Leo','Ava','Ben','Zoe'];
/* ---------- story 1-3 (Number Meadow K, Candy Canyon 1, Ocean Reef 1) ----------
   R-01m: the problem types of CCSS Table 1 (K.OA.2, 1.OA.1, 2.OA.1), by level. Kinds and their share of a level:
     join   add to / put together, result unknown        a + b = ?        sep    take from, result unknown          a − b = ?
     chg    add to, change unknown                       a + ? = c        chgS   take from, change unknown          c − ? = a
     part   put together, one part unknown               a + ? = c        cmpD   compare: how many more / fewer?    x − y = ?
     start  add to, start unknown                        ? + b = c        startS take from, start unknown           ? − b = a
     cmpB   compare: the bigger one ("b more than")      y + d = ?        cmpS   compare: the smaller one ("d fewer") x − d = ?
   Level 1 (K, within 10) has a picture of the story in the prompt, for children who cannot read it yet.
   The hint draws the objects for that kind (story* helpers) and is read aloud. The label is "story <kind> <equation>". */
const STORY_KINDS={1:[['join',.6],['sep',.4]],
  2:[['join',.25],['sep',.2],['chg',.15],['chgS',.1],['part',.1],['cmpD',.2]],
  3:[['join',.15],['sep',.15],['start',.15],['startS',.1],['cmpB',.15],['cmpS',.15],['cmpD',.15]]};
// n objects of thing th; cls: ' st-x' faded (gone or not known yet), ' st-n' new (a dashed ring), ' st-sm' small, ' st-e' an empty place
const storyObj=(th,n,cls='')=>Array.from({length:n},()=>`<span class="st-o${cls}">${cls==' st-e'?'':picFor(th[3]||th[2],th[1])}</span>`).join('');
const storyRow=(n,body)=>`<div class="st-row" style="--n:${Math.max(n,5)}">${body}</div>`;
function storyHint(st,th,pic,txt){return{k:'html',st,html:`<div class="st-h">${pic}</div><div>${esc(txt)}</div>`,w:txt}}
function genStory(lv){
  const me=S.name||'Sam',n2=pick([S.buddy,S.buddy,petN(),...NAMES].filter(n=>n&&n!==me));
  const th=pick(THINGS),pl=th[0],N=k=>qN(k,th[2],pl);
  const who=pick([me,n2]),other=who==me?n2:me;
  let r=rnd(),kind;
  for(const [k,p] of STORY_KINDS[lv]){kind=k;if((r-=p)<0)break}
  let t,ans,eq,hint,pic='';
  const O=(n,c)=>storyObj(th,n,c);
  if(kind=='join'){
    let a,b;
    if(lv==1){const s=R(3,10);a=R(1,s-1);b=s-a}else if(lv==2){a=R(4,9);b=R(3,9)}else{a=R(6,12);b=R(4,8)}
    t=pick([`${who} has ${N(a)}. ${other} gives ${who} ${b} more. How many ${pl} does ${who} have now?`,
      `${who} found ${N(a)} in the yard and ${b} more by the door. How many ${pl} in all?`,
      `${who} got ${N(a)} on Monday and ${N(b)} on Tuesday. How many ${pl} is that?`]);
    ans=a+b;eq=`${a} + ${b} = ?`;
    pic=`<div class="st-pic"><span class="st-g">${O(a)}</span><b class="st-op">+</b><span class="st-g">${O(b)}</span></div>`;
    hint=storyHint('join',th,storyRow(a+b+1,O(a)+'<b class="st-op">+</b>'+O(b)),`Count them all. Start at ${Math.max(a,b)} and count on ${Math.min(a,b)}.`);
  }else if(kind=='sep'){
    let a,b;
    if(lv==1){a=R(3,10);b=R(1,a-1)}else if(lv==2){a=R(4,10);b=R(1,a-1)}else{a=R(10,18);b=R(2,9)}
    t=pick([`${who} had ${N(a)}. ${who} gave ${b} to ${other}. How many ${pl} are left?`,
      `There were ${N(a)} on the table. ${b} fell off. How many are still on the table?`]);
    ans=a-b;eq=`${a} − ${b} = ?`;
    pic=`<div class="st-pic"><span class="st-g">${O(a-b)}${O(b,' st-x')}</span></div>`;
    hint=storyHint('sep',th,storyRow(a,O(a-b)+O(b,' st-x')),`${b} went away. They are the pale ones. Count the ones that are left.`);
  }else if(kind=='chg'){
    const a=R(3,9),b=R(2,9),c=a+b;
    t=pick([`${who} has ${N(a)}. ${other} gives ${who} some more. Now ${who} has ${N(c)}. How many ${pl} did ${other} give ${who}?`,
      `${who} had ${N(a)}. ${who} found some more. Now ${who} has ${N(c)}. How many ${pl} did ${who} find?`]);
    ans=b;eq=`${a} + ? = ${c}`;
    hint=storyHint('chg',th,storyRow(c,O(a)+O(b,' st-n')),`Start at ${a}. Count on until you get to ${c}. How many did you count?`);
  }else if(kind=='chgS'){
    const c=R(6,15),b=R(2,c-2),a=c-b;
    t=`${who} had ${N(c)}. ${who} gave some to ${other}. Now ${who} has ${N(a)}. How many ${pl} did ${who} give away?`;
    ans=b;eq=`${c} − ? = ${a}`;
    hint=storyHint('chgS',th,storyRow(c,O(a)+O(b,' st-x')),`${c} at the start. ${a} are still here. How many went away?`);
  }else if(kind=='part'){
    const c=R(6,15),a=R(2,c-2);
    t=`${who} has ${N(c)}. ${a} are big and the rest are small. How many small ${pl} does ${who} have?`;
    ans=c-a;eq=`${a} + ? = ${c}`;
    hint=storyHint('part',th,storyRow(c,O(a)+O(c-a,' st-sm')),`${c} in all. ${a} are big. Take them away. How many small ones are left?`);
  }else if(kind=='cmpD'){
    const x=lv==2?R(5,15):R(8,18),y=lv==2?R(2,x-1):R(3,x-2),fewer=coin();
    t=fewer?`${who} has ${N(x)}. ${other} has ${N(y)}. How many fewer ${pl} does ${other} have than ${who}?`
      :`${who} has ${N(x)}. ${other} has ${N(y)}. How many more ${pl} does ${who} have than ${other}?`;
    ans=x-y;eq=`${x} − ${y} = ?`;
    hint=storyHint('cmpD',th,storyRow(x,O(x))+storyRow(x,O(y)+O(x-y,' st-e')),`Top row: ${who}. Bottom row: ${other}. Line them up. How many in the top row have no partner?`);
  }else if(kind=='start'){
    const a=R(3,10),b=R(2,9),c=a+b;
    t=`${who} had some ${pl}. Then ${other} gave ${who} ${b} more. Now ${who} has ${N(c)}. How many ${pl} did ${who} have at the start?`;
    ans=a;eq=`? + ${b} = ${c}`;
    hint=storyHint('start',th,storyRow(c,O(a,' st-x')+O(b)),`Think: what and ${b} make ${c}? Take the ${b} new ones away from ${c}.`);
  }else if(kind=='startS'){
    const a=R(3,9),b=R(2,9),c=a+b;
    t=`${who} had some ${pl}. ${who} gave ${b} to ${other}. Now ${who} has ${N(a)} left. How many ${pl} did ${who} have at the start?`;
    ans=c;eq=`? − ${b} = ${a}`;
    hint=storyHint('startS',th,storyRow(c,O(a)+O(b,' st-x')),`Put them back together: ${a} left and ${b} given away. How many in all?`);
  }else if(kind=='cmpB'){
    const y=R(3,10),d=R(2,8);
    t=`${other} has ${N(y)}. ${who} has ${d} more than ${other}. How many ${pl} does ${who} have?`;
    ans=y+d;eq=`${y} + ${d} = ?`;
    hint=storyHint('cmpB',th,storyRow(y+d,O(y))+storyRow(y+d,O(y)+O(d,' st-x')),`Top row: ${other}. Bottom row: ${who}. ${who} has the same, and ${d} more.`);
  }else{ // cmpS
    const x=R(8,18),d=R(2,x-3);
    t=`${who} has ${N(x)}. ${other} has ${d} fewer than ${who}. How many ${pl} does ${other} have?`;
    ans=x-d;eq=`${x} − ${d} = ?`;
    hint=storyHint('cmpS',th,storyRow(x,O(x))+storyRow(x,O(x-d)+O(d,' st-e')),`Top row: ${who}. Bottom row: ${other}. ${other} has ${d} fewer. Take ${d} away from ${x}.`);
  }
  return{kind:'num',html:`<p class="story">${words(t)}</p>${lv==1?pic:''}<div>${SLOT}</div>`,say:t,auto:true,ans:String(ans),
    hint,label:`story ${kind} ${eq}`}}
/* ---------- Pre-K math generators: world Tiny Town (P2-01; CURRICULUM M-PK) ----------
   Skills: pk_count 1-2, pk_num 1-2, pk_more 1, sort 1-2, shape 1, pat 1. Every question is audio-first (CURRICULUM 1.4):
   q.pk = true (the round engine speaks q.say on its own and draws a big replay button), the prompt is a picture, the answers are
   pictures or numerals, and any words on screen sit in an element with class "pktxt" (the debug flag html.notext hides them).
   Pictures of things go through picFor; coloured shapes are drawn here (tokens only, no hex). Randomness: rnd() helpers only.
   Later chunks (P2-02 K math) add levels to the same skill ids in this file. */
const PK = {
  // colours: [name spoken, token]. Shapes carry an outline, so colour is never the only cue where it is not the point.
  COL: [['red', '--danger'], ['blue', '--math'], ['green', '--good'], ['yellow', '--star'], ['purple', '--bt'], ['orange', '--play']],
  // counting things: [singular, plural, emoji fallback]
  OBJ: [['duck', 'ducks', '🦆'], ['apple', 'apples', '🍎'], ['star', 'stars', '⭐'], ['fish', 'fish', '🐟'], ['cookie', 'cookies', '🍪'],
    ['ball', 'balls', '⚽'], ['car', 'cars', '🚗'], ['balloon', 'balloons', '🎈'], ['flower', 'flowers', '🌸'], ['frog', 'frogs', '🐸']],
  NUM: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
  // outlines on a 40 x 40 grid, upright: name -> [points, closed polygon]
  SHP: {
    triangle: [[20, 4], [37, 35], [3, 35]],
    square: [[5, 5], [35, 5], [35, 35], [5, 35]],
    rectangle: [[2, 10], [38, 10], [38, 30], [2, 30]],
    diamond: [[20, 2], [37, 20], [20, 38], [3, 20]],
    star: [[20, 2], [25, 14], [38, 15], [28, 24], [31, 37], [20, 30], [9, 37], [12, 24], [2, 15], [15, 14]],
  },
  // one object, as picFor draws it; d = animation delay in seconds (hints that pulse one at a time)
  o(ob, d) { return `<span class="pko"${d == null ? '' : ` style="--d:${d}s"`}>${picFor(ob[0], ob[2])}</span>`; },
  row(n, ob, pulse) { return Array.from({ length: n }, (_, i) => PK.o(ob, pulse ? i * 0.8 : null)).join(''); },
  // n objects scattered over a 5 x 2 grid of cells (cells are wider than an object, so nothing overlaps), each nudged a little
  scatter(n, ob) {
    const cells = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, n).sort((a, b) => a - b);
    return `<div class="pkscat">${cells.map(c => {
      const dx = R(-5, 5), dy = R(-4, 4);
      return `<span class="pko" style="grid-column:${c % 5 + 1};grid-row:${(c / 5 | 0) + 1};transform:translate(${dx}px,${dy}px)">${picFor(ob[0], ob[2])}</span>`;
    }).join('')}</div>`;
  },
  // a coloured shape as an inline svg (40 x 40); ci = index in COL; name = circle or a key of SHP
  shp(name, ci) {
    const c = `style="--c:var(${PK.COL[ci][1]})"`;
    const body = name == 'circle' ? '<circle class="pkf" cx="20" cy="20" r="17"/>'
      : `<polygon class="pkf" points="${PK.SHP[name].map(p => p.join(',')).join(' ')}"/>`;
    return `<svg class="pks" viewBox="0 0 40 40" ${c} aria-hidden="true" focusable="false">${body}</svg>`;
  },
  // the sides of a shape, lighting one after another (the shape hint); circle has none
  sides(name) {
    const P = PK.SHP[name], n = P.length;
    const ls = P.map((p, i) => {
      const q = P[(i + 1) % n];
      return `<line class="pkside" style="--d:${(i * 0.8).toFixed(1)}s;--T:${(n * 0.8).toFixed(1)}s" x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}"/>`;
    }).join('');
    return `<svg class="pks pkbig" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><polygon class="pkf pkdim" points="${P.map(p => p.join(',')).join(' ')}"/>${ls}</svg>`;
  },
  // one bar of a given length in px (horizontal, a crayon) or n blocks stacked (a tower)
  bar(len, ci) {
    return `<svg class="pkbar" viewBox="0 0 ${len} 24" width="${len}" height="24" style="--c:var(${PK.COL[ci][1]})" aria-hidden="true" focusable="false">`
      + `<rect class="pkf" x="2" y="2" width="${len - 4}" height="20" rx="8"/></svg>`;
  },
  tower(n, ci) {
    let b = '';
    for (let i = 0; i < n; i++) b += `<rect class="pkf" x="2" y="${2 + (n - 1 - i) * 18}" width="36" height="16" rx="4"/>`;
    return `<svg class="pkbar" viewBox="0 0 40 ${n * 18 + 4}" width="40" height="${n * 18 + 4}" style="--c:var(${PK.COL[ci][1]})" aria-hidden="true" focusable="false">${b}</svg>`;
  },
  // R-01m: colour-blind children (about 1 boy in 12 confuses red and green) must be able to solve every item.
  // cols(): the colour indices in a random order, without red or green (whichever comes later), so the two never meet.
  cols() {
    const cs = shuffle([0, 1, 2, 3, 4, 5]), drop = cs.indexOf(0) > cs.indexOf(2) ? 0 : 2;
    return cs.filter(c => c != drop);
  },
  // colour pairs that differ in more than hue for red-green colour blindness: blue or purple against a warm colour, or
  // yellow against red (light against dark). "Which one is different" by colour uses only these.
  SAFE: [[1, 0], [1, 2], [1, 3], [1, 5], [4, 0], [4, 2], [4, 3], [4, 5], [3, 0]],
  // a hint panel: html is trusted markup; w is spoken when it opens (never the only way to learn it)
  hint(html, w) { return { k: 'html', html, w }; },
  num: n => PK.NUM[n],
};
const pkTxt = t => `<div class="sub pktxt">${t}</div>`; // words on screen: hidden by html.notext
const pkEar = () => `<div class="pkear">${ico('speak', 56)}</div>`; // the picture for a listening task
const pkQ = o => Object.assign({ pk: true, auto: true }, o);
// numeral choices (strings, so answer and values compare strictly)
const pkNums = (n, ds) => shuffle([n, ...ds]).map(x => ({ l: String(x), v: String(x) }));

function genPkCount(lv) {
  const ob = pick(PK.OBJ), top = lv == 1 ? 5 : 10, n = R(1, top);
  let ds;
  if (lv == 1) {
    const a = pick([n - 1, n + 1].filter(x => x >= 1 && x <= 5));
    ds = [a, pick([1, 2, 3, 4, 5].filter(x => x != n && x != a))];
  } else {
    const a = pick([n - 1, n + 1].filter(x => x >= 1 && x <= 10));
    ds = [a, pick([n - 2, n + 2].filter(x => x >= 1 && x <= 10 && x != a))];
  }
  const words = Array.from({ length: n }, (_, i) => PK.num(i + 1)).join(', ');
  return pkQ({
    kind: 'choice', cls: 'syms', ans: String(n), choices: pkNums(n, ds),
    html: `<div class="pkq">${lv == 1 ? `<div class="pkrow">${PK.row(n, ob)}</div>` : PK.scatter(n, ob)}</div>${pkTxt(`How many ${ob[1]}?`)}`,
    say: `How many ${ob[1]}?`, after: `${PK.num(n)} ${n == 1 ? ob[0] : ob[1]}`,
    hint: PK.hint(`<div class="pkhint"><div class="pkrow pulse">${PK.row(n, ob, true)}</div></div>`, `Count with me. ${words}.`),
    label: `count ${n} ${ob[1]}${lv == 2 ? ' (scatter)' : ''}`,
  });
}

function genPkNum(lv) {
  const top = lv == 1 ? 5 : 10, n = R(0, top);
  const look = { 6: 9, 9: 6, 1: 7, 7: 1, 2: 5, 5: 2, 3: 8, 8: 3 }; // look-alike numerals
  const used = new Set([n]), ds = [];
  const add = x => { if (x >= 0 && x <= top && !used.has(x)) { used.add(x); ds.push(x); return true; } return false; };
  if (lv == 2 && look[n] != null) add(look[n]);
  while (ds.length < 2) {
    if (ds.length == 0 || coin()) { if (!add(pick([n - 1, n + 1]))) add(R(0, top)); } else add(R(0, top));
  }
  return pkQ({
    kind: 'choice', cls: 'syms', ans: String(n), choices: pkNums(n, ds), auto: 'must',
    html: `<div class="pkq">${pkEar()}</div>${pkTxt(`Tap the number ${PK.num(n)}.`)}`,
    say: `Tap the number ${PK.num(n)}.`,
    hint: n == 0
      ? PK.hint(`<div class="pkhint">${pkTxt('Zero means none. No dots at all!')}</div>`, 'Zero means none. No dots at all!')
      : PK.hint(`<div class="pkhint">${VIZ.dots(n, 'row')}</div>`, `Count the dots. ${Array.from({ length: n }, (_, i) => PK.num(i + 1)).join(', ')}.`),
    label: lv == 1 ? `tap ${n}` : `tap ${n} to ten`,
  });
}

// two groups, tap the one with more; the difference is at least 2
const PK_PLATES = [['plate', ['cookie', 'cookies', '🍪']], ['bowl', ['apple', 'apples', '🍎']], ['basket', ['ball', 'balls', '⚽']],
  ['pond', ['duck', 'ducks', '🦆']], ['box', ['car', 'cars', '🚗']]];
function genPkMore() {
  const [cn, ob] = pick(PK_PLATES);
  const hi = R(3, 5), lo = R(1, hi - 2), big = coin() ? 'l' : 'r';
  const [a, b] = big == 'l' ? [hi, lo] : [lo, hi];
  const plate = (n, v) => `<div class="pkplate" data-v="${v}" aria-label="${cn}"><div class="pkpl">${PK.row(n, ob)}</div></div>`;
  return pkQ({
    kind: 'tap', ans: big,
    html: `<div class="pkpair">${plate(a, 'l')}${plate(b, 'r')}</div>${pkTxt(`Which ${cn} has more ${ob[1]}?`)}`,
    say: `Which ${cn} has more ${ob[1]}?`, ansSay: 'This one has more.',
    hint: PK.hint(`<div class="pkhint"><div class="pkline">${PK.row(a, ob)}</div><div class="pkline">${PK.row(b, ob)}</div>${pkTxt('Line them up. Which row is longer?')}</div>`,
      'Line them up in two rows. Which row is longer?'),
    label: `more ${a} or ${b} ${ob[1]}`,
  });
}

// sort 1: three alike by colour or by shape, one different
function genSort1() {
  const byColour = coin(), SH = ['circle', 'square', 'triangle', 'star', 'diamond'];
  const sh = shuffle(SH), cs = shuffle([0, 1, 2, 3, 4, 5]);
  if (byColour) { // R-01m: the odd colour against the others is a pair colour-blind children can tell apart
    const pr = pick(PK.SAFE), flip = coin();
    cs[0] = pr[flip ? 1 : 0];
    cs[1] = pr[flip ? 0 : 1];
  }
  let items, odd; // items: [shape, colour index]
  if (byColour) {
    items = [[sh[0], cs[0]], [sh[1], cs[0]], [sh[2], cs[0]]]; // same colour, three different shapes
    odd = [pick(sh), cs[1]];
  } else {
    items = [[sh[0], cs[0]], [sh[0], cs[1]], [sh[0], cs[2]]]; // same shape, three different colours
    odd = [sh[1], pick(cs.slice(0, 5))];
  }
  const all = shuffle([...items.map(x => ({ x, odd: false })), { x: odd, odd: true }]);
  const oi = all.findIndex(a => a.odd);
  const cn = i => PK.COL[i][0];
  const label = byColour ? `odd ${cn(odd[1])} ${odd[0]} in ${cn(cs[0])}: ${items.map(i => i[0]).join(',')}`
    : `odd ${odd[0]} in ${items[0][0]}: ${items.map(i => cn(i[1])).join(',')}`;
  return pkQ({
    kind: 'choice', cls: 'pics pk4', ans: String(oi),
    choices: all.map((a, i) => ({ l: PK.shp(a.x[0], a.x[1]), v: String(i), h: true })),
    html: `<div class="pkq pkask">?</div>${pkTxt('Which one does not belong?')}`, say: 'Which one does not belong?',
    hint: PK.hint(`<div class="pkhint">${pkTxt(byColour ? 'Look at the colours.' : 'Look at the shapes.')}</div>`,
      byColour ? 'Look at the colours. Three are the same.' : 'Look at the shapes. Three are the same.'),
    label,
  });
}

// sort 2: biggest / smallest ball, longest / shortest crayon, tallest / shortest tower; 2 or 3 pictures
function genSort2() {
  const kind = pick(['size', 'length', 'height']), n = R(2, 3), top = coin();
  const ci = R(0, 5), pool = kind == 'size' ? [0.5, 0.75, 1, 1.35] : kind == 'length' ? [36, 62, 88, 114] : [1, 2, 3, 4];
  const vals = shuffle(pool).slice(0, n);
  const want = top ? Math.max(...vals) : Math.min(...vals);
  const ob = pick(PK.OBJ.filter(o => o[0] != 'fish'));
  const adj = kind == 'size' ? (top ? ['biggest', 'bigger'] : ['smallest', 'smaller'])
    : kind == 'length' ? (top ? ['longest', 'longer'] : ['shortest', 'shorter']) : (top ? ['tallest', 'taller'] : ['shortest', 'shorter']);
  const noun = kind == 'size' ? ob[0] : kind == 'length' ? 'crayon' : 'tower';
  const a = n == 2 ? adj[1] : adj[0], sayT = `Tap the ${a} ${noun}.`;
  const choices = vals.map((v, i) => ({
    v: String(i), h: true,
    l: kind == 'size' ? `<span class="pkcell"><span class="pkscale" style="font-size:${v}em">${picFor(ob[0], ob[2])}</span></span>`
      : kind == 'length' ? `<span class="pkcell pkleft">${PK.bar(v, ci)}</span>` : `<span class="pkcell">${PK.tower(v, ci)}</span>`,
  }));
  const HOW = {
    size: ['Look at all of them. Which one takes up the most room?', 'Look at all of them. Which one takes up the least room?'],
    length: ['Line them up on the left. Which one reaches farthest?', 'Line them up on the left. Which one stops first?'],
    height: ['Stand them on the floor. Which one reaches highest?', 'Stand them on the floor. Which one is lowest?'],
  };
  const how2 = HOW[kind][top ? 0 : 1];
  return pkQ({
    kind: 'choice', cls: `pics pk${n}${kind == 'length' ? ' pkcol' : ''}`, ans: String(vals.indexOf(want)), choices,
    html: `<div class="pkq pkask">?</div>${pkTxt(sayT)}`, say: sayT,
    hint: PK.hint(`<div class="pkhint">${pkTxt(how2)}</div>`, how2),
    label: `${a} ${noun} ${vals.join('/')}`,
  });
}
function genSort(lv) { return lv == 1 ? genSort1() : genSort2(); }

// shape 1: hear a shape name, tap it among 3 (random colours, upright)
function genPkShape() {
  const names = ['circle', 'square', 'triangle', 'rectangle'], sh = shuffle(names).slice(0, 3), ans = pick(sh);
  const cs = shuffle([0, 1, 2, 3, 4, 5]);
  const facts = { circle: 'A circle is round. It has no corners.', square: 'A square has 4 sides. They are all the same.',
    triangle: 'A triangle has 3 sides.', rectangle: 'A rectangle has 4 sides. Two are long and two are short.' };
  const hint = ans == 'circle' ? PK.hint(`<div class="pkhint">${PK.shp('circle', cs[0]).replace('class="pks"', 'class="pks pkbig"')}${pkTxt(facts[ans])}</div>`, facts[ans])
    : PK.hint(`<div class="pkhint">${PK.sides(ans)}${pkTxt(facts[ans])}</div>`, facts[ans]);
  return pkQ({
    kind: 'choice', cls: 'pics', ans, auto: 'must', choices: sh.map((s, i) => ({ l: PK.shp(s, cs[i]), v: s, h: true })),
    html: `<div class="pkq">${pkEar()}</div>${pkTxt(`Tap the ${ans}.`)}`, say: `Tap the ${ans}.`, hint, label: `tap the ${ans}`,
  });
}

// pat 1: an AB pattern of 5, pick the 6th (colours, each with its own shape; or shapes in one colour)
function genPkPat() {
  const byColour = coin(), cs = PK.cols(), sh = shuffle(['circle', 'square', 'triangle', 'star', 'diamond']);
  // R-01m: a colour pattern gives each colour its own shape too, so it is never colour-only (and never red with green)
  const A = { s: sh[0], c: cs[0] };
  const B = byColour ? { s: sh[1], c: cs[1] } : { s: sh[1], c: cs[0] };
  const seq = [A, B, A, B, A], nm = x => byColour ? PK.COL[x.c][0] : x.s;
  const other = byColour ? { s: sh[2], c: cs[2] } : { s: sh[2], c: cs[0] };
  const n = R(2, 3), opts = shuffle(n == 2 ? [B, A] : [B, A, other]);
  const draw = x => PK.shp(x.s, x.c), names = seq.map(nm).join(', ');
  const chant = `${names}. What comes next?`;
  return pkQ({
    kind: 'choice', cls: `pics pk${n}`, ans: String(opts.indexOf(B)), choices: opts.map((x, i) => ({ l: draw(x), v: String(i), h: true })),
    html: `<div class="pkq pkpat">${seq.map(draw).join('')}<span class="pkunk">?</span></div>${pkTxt('What comes next?')}`, say: chant,
    hint: PK.hint(`<div class="pkhint"><div class="pkpat pulse">${seq.map((x, i) => `<span class="pko" style="--d:${i * 0.8}s">${draw(x)}</span>`).join('')}</div>`
      + `${pkTxt('Say it with me.')}</div>`, `${names}, what comes next?`),
    label: `pattern ${names}`,
  });
}

// ---- P2-02 Shape Garden (K) ----
/* Kindergarten math, world Shape Garden (CURRICULUM M-K). New levels of existing skills: pk_count 3, pk_num 3, pk_more 2, shape 2-3,
   add 4, pat 2, cnt 4, sort 3; new skills tenf 1-3, pos 1, meas 1. The SK table (38-skills.js) points at the *K wrappers below,
   which call the older generators for the levels that already existed. Same audio-first presentation as Tiny Town (pkQ, pkTxt,
   q.pk): pictures and numerals carry the question, words sit in .pktxt. Pictures of things go through picFor; shapes are VIZ.shape.
   Styles: src/css/31-sg.css. Randomness: rnd() helpers only. */
const SGN = n => (n <= 10 ? PK.NUM[n] : ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen',
  'nineteen', 'twenty'][n - 11]);
const sgEq = h => `<div class="eq">${h}</div>`;

// n objects in ten-frames (rows of 5): the first frame is a full ten; pulse = hint (the second frame counts on one at a time)
function sgFrames(n, ob, pulse) {
  const frame = (k, first) => `<div class="sgfr${first ? ' sgten' : ''}">${Array.from({ length: 10 }, (_, i) => `<span class="sgc">${
    i < k ? PK.o(ob, pulse ? (first ? 0 : i * 0.6 + 0.8) : null) : ''}</span>`).join('')}</div>`;
  return `<div class="sgfrs${pulse ? ' pulse' : ''}">${frame(10, 1)}${frame(n - 10, 0)}</div>`;
}
function genSgCount() {
  const ob = pick(PK.OBJ), n = R(11, 20), w = n == 20 ? 'Two full tens.' : `One full ten and ${n - 10} more.`; // R-01m: 20 is two tens
  return pkQ({
    kind: 'num', ans: String(n), html: `<div class="pkq">${sgFrames(n, ob)}</div>${pkTxt(`How many ${ob[1]}?`)}${sgEq(SLOT)}`,
    say: `How many ${ob[1]}?`, after: `${SGN(n)} ${ob[1]}`,
    hint: PK.hint(`<div class="pkhint">${sgFrames(n, ob, true)}${pkTxt(w)}</div>`, w),
    label: `count ${n} ${ob[1]} (frames)`,
  });
}

// pk_num 3: hear a number 11-20; look-alike numerals are the reversed number (12 / 21) and the "ty" number (13 / 30)
function genSgNum() {
  const n = R(11, 20), rev = +String(n).split('').reverse().join(''), pri = [];
  if (rev != n && rev >= 10) pri.push(rev);
  if (n >= 13 && n <= 19) pri.push((n - 10) * 10);
  if (n == 20) pri.push(12);
  if (n == 12) pri.push(20);
  const pool = shuffle([n - 1, n + 1, n - 2, n + 2, ...Array.from({ length: 10 }, (_, i) => 11 + i)]).filter(x => x >= 10 && x <= 20);
  const ds = [];
  for (const x of [...pri, ...pool]) if (x != n && !ds.includes(x) && ds.length < 3) ds.push(x);
  const w = n == 20 ? 'Count the dots. Two full tens.' : `Count the dots. One full ten, and ${n - 10} more.`; // R-01m: 20 is two tens
  return pkQ({
    kind: 'choice', cls: 'syms pk4', ans: String(n), choices: pkNums(n, ds), auto: 'must',
    html: `<div class="pkq">${pkEar()}</div>${pkTxt(`Tap the number ${SGN(n)}.`)}`, say: `Tap the number ${SGN(n)}.`,
    hint: PK.hint(`<div class="pkhint">${VIZ.dots(n, 'ten')}${pkTxt(w)}</div>`, w),
    label: `tap ${n} (teens)`,
  });
}

// pk_more 2: groups of 1-10; more, fewer (tap a plate) or "are they the same?" (15% of items; yes or no)
function genSgMore() {
  const [cn, ob] = pick(PK_PLATES), same = rnd() < 0.15, ask = same ? 'same' : coin() ? 'more' : 'fewer';
  let a = R(1, 10), b;
  if (same) b = rnd() < 2 / 3 ? a : (a == 10 || (a > 1 && coin()) ? a - 1 : a + 1);
  else { b = R(1, 10); if (b == a) b = a == 10 ? 9 : a + 1; }
  const plate = (n, v) => `<div class="pkplate sgpl" ${v ? `data-v="${v}" ` : ''}aria-label="${cn}"><div class="pkpl sgp10">${PK.row(n, ob)}</div></div>`;
  const pairs = Array.from({ length: Math.max(a, b) }, (_, i) => `<div class="sgpr${i >= Math.min(a, b) ? ' sgx' : ''}">`
    + `<span class="sgs">${i < a ? PK.o(ob) : ''}</span><span class="sgs">${i < b ? PK.o(ob) : ''}</span></div>`).join('');
  const w = a == b ? 'Pair them up. Nobody is left over, so they are the same.' : 'Pair them up, one with one. Who has some left over?';
  const hint = PK.hint(`<div class="pkhint"><div class="sgpairs">${pairs}</div>${pkTxt(w)}</div>`, w);
  const nm = ob[1], lab = `${ask} ${a} or ${b} ${nm}`;
  if (same) {
    return pkQ({
      kind: 'choice', cls: 'syms pk2', ans: a == b ? 'yes' : 'no', hint, label: lab,
      choices: [{ l: ico('check', 56), v: 'yes', h: true }, { l: ico('close', 56), v: 'no', h: true }],
      html: `<div class="pkpair">${plate(a)}${plate(b)}</div>${pkTxt('Do they have the same number?')}`, say: 'Do they have the same number?',
      after: a == b ? 'Yes, the same.' : 'No, not the same.',
    });
  }
  const win = (ask == 'more') == (a > b) ? 'l' : 'r';
  return pkQ({
    kind: 'tap', ans: win, hint, label: lab,
    html: `<div class="pkpair">${plate(a, 'l')}${plate(b, 'r')}</div>${pkTxt(`Which ${cn} has ${ask} ${nm}?`)}`,
    say: `Which ${cn} has ${ask} ${nm}?`, ansSay: `This one has ${ask}.`,
  });
}

// shapes: a choice picture is a VIZ.shape inside a span that names it (data-shape), so tests can check what is drawn
const SG_FACT = {
  hexagon: 'A hexagon has 6 sides.', rhombus: 'A rhombus has 4 sides, all the same length. It looks like a diamond.',
  trapezoid: 'A trapezoid has 4 sides. Two sides run the same way.', oval: 'An oval is a squished circle. It has no corners.',
  cube: 'A cube has 6 flat faces. They are all squares.', sphere: 'A sphere is round all over, like a ball. It has no flat face.',
  cone: 'A cone has a point on top and one round flat end.', cylinder: 'A cylinder has two flat round ends.',
};
function sgShp(name, solid) {
  const c = coin() ? 1 : 2;
  if (solid) return `<span class="sgsh" data-shape="${name}">${VIZ.shape(name, { c })}</span>`;
  const bent = ['hexagon', 'rhombus', 'trapezoid', 'oval'].includes(name); // the new shapes turn and stretch; the old ones only turn in right angles
  const o = bent ? { c, rot: pick([0, 25, 50, 90, 155, 180, 205, 270, 315, 335]), st: R(85, 130) / 100 } : { c, rot: pick([0, 90, 180, 270]), st: R(90, 125) / 100 };
  return `<span class="sgsh" data-shape="${name}">${VIZ.shape(name, o)}</span>`;
}
function genSgShape2() {
  const ans = pick(['hexagon', 'rhombus', 'trapezoid', 'oval']);
  let pool = ['hexagon', 'rhombus', 'trapezoid', 'oval', 'circle', 'square', 'triangle', 'rectangle'].filter(n => n != ans);
  if (ans == 'rhombus') pool = pool.filter(n => n != 'square'); // a square is a rhombus too
  const names = shuffle([ans, ...shuffle(pool).slice(0, 3)]), w = SG_FACT[ans];
  return pkQ({
    kind: 'choice', cls: 'pics pk4', ans, auto: 'must', choices: names.map(n => ({ l: sgShp(n), v: n, h: true })),
    html: `<div class="pkq">${pkEar()}</div>${pkTxt(`Tap the ${ans}.`)}`, say: `Tap the ${ans}.`,
    hint: PK.hint(`<div class="pkhint sgbigshape">${VIZ.shape(ans, { c: 1, dots: ans != 'oval' })}${pkTxt(w)}</div>`, w), label: `tap the ${ans}`,
  });
}

// shape 3: solids. Name -> picture, and a real thing -> the solid it is shaped like
const SG_THINGS3 = [['ball', 'ball', '⚽', 'sphere', 'a ball', 'It is round all over. It rolls any way.'],
  ['tennis ball', 'ball', '🎾', 'sphere', 'a tennis ball', 'It is round all over. It rolls any way.'],
  ['basketball', 'ball', '🏀', 'sphere', 'a basketball', 'It is round all over. It rolls any way.'],
  ['can', 'can', '🥫', 'cylinder', 'a can', 'It has two flat round ends and stands tall.'],
  ['drum', 'drum', '🥁', 'cylinder', 'a drum', 'It has two flat round ends and stands tall.'],
  ['box', 'box', '📦', 'cube', 'a box', 'It has flat square sides and sharp corners.'],
  ['dice', 'dice', '🎲', 'cube', 'a die', 'It has flat square sides and sharp corners.'],
  ['ice cream cone', 'cone', '🍦', 'cone', 'an ice cream cone', 'It has a point on top and a round flat end.']];
function genSgShape3() {
  const solids = shuffle(['cube', 'sphere', 'cone', 'cylinder']), choices = solids.map(n => ({ l: sgShp(n, 1), v: n, h: true }));
  if (coin()) {
    const ans = pick(solids), w = SG_FACT[ans];
    return pkQ({
      kind: 'choice', cls: 'pics pk4', ans, auto: 'must', choices,
      html: `<div class="pkq">${pkEar()}</div>${pkTxt(`Tap the ${ans}.`)}`, say: `Tap the ${ans}.`,
      hint: PK.hint(`<div class="pkhint">${pkTxt(w)}</div>`, w), label: `solid ${ans}`,
    });
  }
  const [nm, art, em, ans, sp, fact] = pick(SG_THINGS3);
  return pkQ({
    kind: 'choice', cls: 'pics pk4', ans, choices,
    html: `<div class="pkq"><span class="sgobj">${picFor(art, em)}</span></div>${pkTxt(`Which one is shaped like ${sp}?`)}`,
    say: `Which one is shaped like ${sp}?`,
    hint: PK.hint(`<div class="pkhint"><span class="sgobj">${picFor(art, em)}</span>${pkTxt(fact)}</div>`, fact), label: `solid like ${nm}`,
  });
}
function genShapeK(lv) { return lv == 1 ? genPkShape() : lv == 2 ? genSgShape2() : genSgShape3(); }

// add 4: sums within 5, with dots (the first group blue, the added group orange), including + 0
function genSgAdd() {
  const s = R(1, 5), a = R(0, s), b = s - a, q = mathQ(a, '+', b, s, 'c', false);
  return pkQ(Object.assign(q, { html: `<div class="pkq">${VIZ.dots(s, 'row', { b })}</div>` + q.html + pkTxt('How many in all?') }));
}

// cnt 4: count on or back by 1 within 0-20; one blank among 5 numbers; 40% backward
function genSgCnt() {
  const back = rnd() < 0.4, s = back ? R(4, 20) : R(0, 16), d = back ? -1 : 1;
  const seq = [0, 1, 2, 3, 4].map(i => s + i * d), bi = R(1, 3);
  const w = back ? 'Counting back: one less each time.' : 'Counting on: one more each time.';
  return pkQ({
    kind: 'num', ans: String(seq[bi]), html: `<div class="seq">${seq.map((n, i) => (i == bi ? SLOT : n)).join(', ')}</div>${pkTxt(back ? 'Count back.' : 'Count on.')}`,
    say: `${back ? 'Count back' : 'Count on'}. ${seq.map((n, i) => (i == bi ? 'what' : n)).join(', ')}`,
    hint: PK.hint(`<div class="pkhint">${pkTxt(w)}</div>`, w), label: seq.map((n, i) => (i == bi ? '_' : n)).join(','),
  });
}

// pat 2: AAB, ABB or ABC (a colour pattern with a shape per colour, or a shape pattern in one colour), 6-7 shown; pick the next
function genSgPat() {
  const kind = pick(['AAB', 'ABB', 'ABC']), byColour = coin(), cs = PK.cols(), sh = shuffle(['circle', 'square', 'triangle', 'star', 'diamond']);
  // R-01m: in a colour pattern each colour has its own shape too (never colour-only, never red with green)
  const tok = i => (byColour ? { s: sh[i], c: cs[i] } : { s: sh[i], c: cs[0] }), T = [tok(0), tok(1), tok(2)];
  const unit = [...kind].map(ch => T['ABC'.indexOf(ch)]), L = R(6, 7);
  const seq = Array.from({ length: L }, (_, i) => unit[i % 3]), next = unit[L % 3];
  const key = x => x.c + '|' + x.s, others = T.filter(x => key(x) != key(next));
  const opts = shuffle([next, others[0], coin() ? others[1] : tok(3)]);
  const nm = x => (byColour ? PK.COL[x.c][0] : x.s), draw = x => PK.shp(x.s, x.c), names = seq.map(nm).join(', ');
  const short = seq.map(x => nm(x).slice(0, 2)).join(','); // colours re bl gr ye pu or, shapes ci sq tr st di: never the same
  return pkQ({
    kind: 'choice', cls: 'pics pk3', ans: String(opts.findIndex(x => key(x) == key(next))), choices: opts.map((x, i) => ({ l: draw(x), v: String(i), h: true })),
    html: `<div class="pkq pkpat sgpat">${seq.map(draw).join('')}<span class="pkunk">?</span></div>${pkTxt('What comes next?')}`, say: `${names}. What comes next?`,
    hint: PK.hint(`<div class="pkhint"><div class="pkpat sgpat pulse">${seq.map((x, i) => `<span class="pko" style="--d:${i * 0.6}s">${draw(x)}</span>`).join('')}</div>`
      + `${pkTxt('Find the part that repeats.')}</div>`, `${names}. Find the part that repeats. What comes next?`),
    label: `${kind} ${short}`,
  });
}

// sort 3: three of one kind (animals, food, vehicles, clothes) and one that is not
const SG_CATS = {
  animals: [['dog', '🐶'], ['cat', '🐱'], ['pig', '🐷'], ['frog', '🐸'], ['duck', '🦆'], ['fish', '🐟'], ['hen', '🐔'], ['fox', '🦊']],
  food: [['apple', '🍎'], ['banana', '🍌'], ['cookie', '🍪'], ['cake', '🎂'], ['milk', '🥛'], ['grapes', '🍇'], ['pizza', '🍕'], ['bread', '🍞']],
  vehicles: [['car', '🚗'], ['bus', '🚌'], ['bike', '🚲'], ['ship', '🚢'], ['plane', '✈'], ['train', '🚂'], ['truck', '🚚'], ['boat', '⛵']],
  clothes: [['hat', '🧢'], ['coat', '🧥'], ['socks', '🧦'], ['shirt', '👔'], ['boots', '👢']],
};
function genSgSort() {
  const [c1, c2] = shuffle(Object.keys(SG_CATS)).slice(0, 2), three = shuffle(SG_CATS[c1]).slice(0, 3), odd = pick(SG_CATS[c2]);
  const all = shuffle([...three.map(x => ({ x, odd: false })), { x: odd, odd: true }]), w = `Three of these are ${c1}.`;
  return pkQ({
    kind: 'choice', cls: 'pics pk4', ans: String(all.findIndex(a => a.odd)),
    choices: all.map((a, i) => ({ l: `<span class="pkcell">${picFor(a.x[0], a.x[1])}</span>`, v: String(i), h: true })),
    html: `<div class="pkq pkask">?</div>${pkTxt('Which one does not belong?')}`, say: 'Which one does not belong?',
    hint: PK.hint(`<div class="pkhint">${pkTxt(w)}</div>`, w), label: `odd ${odd[0]} (${c2}) in ${c1}: ${three.map(x => x[0]).join(',')}`,
  });
}

// tenf: ten frames (VIZ.tenFrame)
function genTenf(lv) {
  if (lv == 1) {
    const n = R(0, 10), w = n == 0 ? 'Zero. The frame is empty.' : n > 5 ? 'Five on top. Then count on.' : 'Count the counters, one by one.';
    return pkQ({
      kind: 'num', ans: String(n), html: `<div class="pkq">${VIZ.tenFrame(n)}</div>${pkTxt('How many counters?')}${sgEq(SLOT)}`,
      say: 'How many counters?', hint: PK.hint(`<div class="pkhint">${VIZ.tenFrame(n, 10, { b: Math.max(0, n - 5) })}${pkTxt(w)}</div>`, w), label: `frame ${n}`,
    });
  }
  if (lv == 2) {
    const n = R(1, 9), w = 'Count the empty boxes. Those are the ones you need.';
    return pkQ({
      kind: 'num', ans: String(10 - n), html: `<div class="pkq">${VIZ.tenFrame(n)}</div>${pkTxt('How many more to make ten?')}${sgEq(SLOT)}`,
      say: 'How many more to make ten?', hint: PK.hint(`<div class="pkhint">${VIZ.tenFrame(10, 10, { b: 10 - n })}${pkTxt(w)}</div>`, w), label: `${n} and ? make 10`,
    });
  }
  const n = R(1, 9), tens = `<div class="sgfrs">${VIZ.tenFrame(10)}${VIZ.tenFrame(n)}</div>`;
  if (coin()) {
    const w = 'One full ten. Then count on.';
    return pkQ({
      kind: 'num', ans: String(10 + n), html: `<div class="pkq">${tens}</div>${pkTxt('How many in all?')}${sgEq(SLOT)}`, say: 'How many in all?',
      hint: PK.hint(`<div class="pkhint">${tens}${pkTxt(w)}</div>`, w), label: `10 and ${n}`,
    });
  }
  const w = `Start at ten. Count on to ${SGN(10 + n)}.`;
  return pkQ({
    kind: 'num', ans: String(n), html: `<div class="pkq">${VIZ.tenFrame(10)}</div>${sgEq(`10 + ${SLOT} = ${10 + n}`)}${pkTxt(`Ten and how many make ${SGN(10 + n)}?`)}`,
    say: `Ten and how many more make ${SGN(10 + n)}?`,
    hint: PK.hint(`<div class="pkhint"><div class="sgfrs">${VIZ.tenFrame(10)}${VIZ.tenFrame(n, 10, { b: n })}</div>${pkTxt(w)}</div>`, w), label: `10 + ? = ${10 + n}`,
  });
}

// pos 1: where is it? above, below, beside, in front of, behind, between. Tap the right one.
const SG_ANI = [['cat', '🐱'], ['dog', '🐶'], ['pig', '🐷'], ['duck', '🦆'], ['frog', '🐸'], ['hen', '🐔'], ['fox', '🦊'], ['bug', '🐛']];
const SG_REF = [['box', '📦'], ['bed', '🛏'], ['house', '🏠'], ['tree', '🌳'], ['car', '🚗'], ['bus', '🚌']];
function genPos() {
  const kind = pick(['above', 'below', 'beside', 'in front of', 'behind', 'between']), ani = shuffle(SG_ANI), ref = pick(SG_REF);
  const pic = a => picFor(a[0], a[1]), tp = (a, v) => `<span class="sgt" data-v="${v}" aria-label="${a[0]}">${pic(a)}</span>`;
  const rf = `<span class="sgref">${pic(ref)}</span>`, A = ani[0], B = ani[1], C = ani[2];
  let html, ans, say, hint, lab;
  if (kind == 'above' || kind == 'below') {
    html = `<div class="sgscene sgcol">${tp(A, 'a')}${rf}${tp(B, 'b')}</div>`; ans = kind == 'above' ? 'a' : 'b';
    say = `Tap the one ${kind} the ${ref[0]}.`; lab = `${kind} the ${ref[0]}: ${A[0]} up, ${B[0]} down`;
    hint = kind == 'above' ? 'Above means higher up. Look at the top.' : 'Below means lower down. Look at the bottom.';
  } else if (kind == 'beside') {
    const flip = coin();
    html = `<div class="sgscene sggrid${flip ? ' sgflip' : ''}">${rf}${tp(A, 'a')}${tp(B, 'b')}</div>`; ans = 'a';
    say = `Tap the one beside the ${ref[0]}.`; lab = `beside the ${ref[0]}: ${A[0]} next to it, ${B[0]} below${flip ? ' (flipped)' : ''}`;
    hint = 'Beside means right next to it, on the same line.';
  } else if (kind == 'between') {
    html = `<div class="sgscene sgrow">${tp(A, 'a')}${tp(C, 'c')}${tp(B, 'b')}</div>`; ans = 'c';
    say = `Tap the one between the ${A[0]} and the ${B[0]}.`; lab = `between ${A[0]} and ${B[0]}: ${C[0]}`;
    hint = 'Between means in the middle, with one on each side.';
  } else {
    const front = kind == 'in front of';
    html = `<div class="sgscene sgdepth"><span class="sgbk">${tp(A, 'a')}</span>${rf}<span class="sgfk">${tp(B, 'b')}</span></div>`;
    ans = front ? 'b' : 'a'; say = `Tap the one ${kind} the ${ref[0]}.`; lab = `${kind} the ${ref[0]}: ${A[0]} back, ${B[0]} front`;
    hint = front ? 'In front means closer to you. It hides part of the other one.' : 'Behind means farther away. Part of it is hidden.';
  }
  return pkQ({ kind: 'tap', ans, html: `<div class="pkq">${html}</div>${pkTxt(say)}`, say, ansSay: 'This one.', hint: PK.hint(`<div class="pkhint">${pkTxt(hint)}</div>`, hint), label: lab });
}

// meas 1: compare two or three things: longer / shorter (bars), taller / shorter (towers), heavier / lighter (a tipped scale)
function genMeas() {
  const kind = pick(['length', 'height', 'weight']), top = coin(), ci = R(0, 5);
  if (kind == 'weight') {
    const a = R(1, 9);
    let b = R(1, 9);
    if (Math.abs(a - b) < 2) b = a <= 4 ? a + 2 + R(0, 3) : a - 2 - R(0, 3);
    const heavy = a > b ? 'l' : 'r', win = top ? heavy : heavy == 'l' ? 'r' : 'l', adj = top ? 'heavier' : 'lighter';
    const w = top ? 'The heavy side goes down.' : 'The light side goes up.';
    return pkQ({
      kind: 'tap', ans: win, label: `${adj} ${a} or ${b}`, say: `Tap the ${adj} side.`, ansSay: `This side is ${adj}.`,
      html: `<div class="pkq"><div class="sgbal" data-l="${a}" data-r="${b}">${VIZ.balance(a, b)}<i data-v="l" aria-label="left side"></i><i data-v="r" aria-label="right side"></i></div></div>${pkTxt(`Tap the ${adj} side.`)}`,
      hint: PK.hint(`<div class="pkhint">${pkTxt(w)}</div>`, w),
    });
  }
  const n = R(2, 3);
  if (kind == 'length') {
    const lens = shuffle([60, 90, 120, 150, 180]).slice(0, n), aligned = coin();
    const offs = lens.map(() => (aligned ? 0 : R(0, 50))), want = top ? Math.max(...lens) : Math.min(...lens), adj = top ? 'longer' : 'shorter';
    const bars = lens.map((l, i) => `<span class="sgt sgbarrow" data-v="${i}" style="margin-left:${offs[i]}px" aria-label="crayon">${PK.bar(l, ci)}</span>`).join('');
    const same = lens.map(l => `<span class="sgbarrow">${PK.bar(l, ci)}</span>`).join('');
    const w = 'Line them up at the start. Which one reaches farther?', nm = n == 2 ? adj : top ? 'longest' : 'shortest';
    return pkQ({
      kind: 'tap', ans: String(lens.indexOf(want)), say: `Tap the ${nm} crayon.`, ansSay: `This crayon is ${nm}.`, label: `${nm} crayon ${lens.join('/')}${aligned ? '' : ' (not lined up)'}`,
      html: `<div class="pkq"><div class="sgcol sgbars">${bars}</div></div>${pkTxt(`Tap the ${nm} crayon.`)}`,
      hint: PK.hint(`<div class="pkhint"><div class="sgcol sgbars sgaligned">${same}</div>${pkTxt(w)}</div>`, w),
    });
  }
  const hs = shuffle([1, 2, 3, 4, 5]).slice(0, n), want = top ? Math.max(...hs) : Math.min(...hs), adj = top ? 'taller' : 'shorter';
  const nm = n == 2 ? adj : top ? 'tallest' : 'shortest', w = 'Stand them on the floor. Which one reaches higher?';
  const towers = hs.map((h, i) => `<span class="sgt" data-v="${i}" aria-label="tower">${PK.tower(h, ci)}</span>`).join('');
  return pkQ({
    kind: 'tap', ans: String(hs.indexOf(want)), say: `Tap the ${nm} tower.`, ansSay: `This tower is ${nm}.`, label: `${nm} tower ${hs.join('/')}`,
    html: `<div class="pkq"><div class="sgrow sgtowers">${towers}</div></div>${pkTxt(`Tap the ${nm} tower.`)}`,
    hint: PK.hint(`<div class="pkhint">${pkTxt(w)}</div>`, w),
  });
}

// the older skills with levels added here: each wrapper sends the new level to the code above and the old ones to the old generator
const genPkCountK = lv => (lv >= 3 ? genSgCount() : genPkCount(lv));
const genPkNumK = lv => (lv >= 3 ? genSgNum() : genPkNum(lv));
const genPkMoreK = lv => (lv >= 2 ? genSgMore() : genPkMore());
const genSortK = lv => (lv == 3 ? genSgSort() : genSort(lv));
const genPatK = lv => (lv >= 2 ? genSgPat() : genPkPat());
const genAddK = lv => (lv == 4 ? genSgAdd() : genAdd(lv));
const genCntK = lv => (lv == 4 ? genSgCnt() : genCnt(lv));

// ---- P2-03 Clock Tower (1st) ----
/* Grade 1 gaps (CURRICULUM M-1): pv 1, add 5-6, meas 2, data 1, shape 4, frac 1, world Clock Tower (m_clock).
   Pictures are VIZ.* (base10, pictograph, shape) or small drawings below that use the same viz classes (32-viz.css, tokens only).
   Randomness: R, rnd, pick, shuffle, coin only. Later chunks add pv 2-3 (P2-04), meas 3, data 2 and frac 2+ to the same skill ids. */
const CT = {
  // svg root with the same classes as VIZ (no ids, no defs); w, h: viewBox size
  root(name, w, h, body, label) {
    return `<svg class="viz viz-${name}" viewBox="0 0 ${w} ${h}" style="--vw:${w}" role="img" aria-label="${label}">${body}</svg>`;
  },
  // outlines on a 40 x 40 grid for the six grade 1 shapes (regular ones computed, rounded to one decimal)
  reg(n, off) {
    return Array.from({length: n}, (_, i) => {
      const a = 2 * Math.PI * (i + off) / n;
      return [Math.round((20 + 17 * Math.sin(a)) * 10) / 10, Math.round((21 - 17 * Math.cos(a)) * 10) / 10];
    });
  },
  // the sides of one polygon lighting one after another (the sides hint); uses the pk classes from 31-pk.css
  sides(name) {
    const P = CT.SHP[name], n = P.length;
    const ls = P.map((p, i) => {
      const q = P[(i + 1) % n];
      return `<line class="pkside" style="--d:${(i * 0.8).toFixed(1)}s;--T:${(n * 0.8).toFixed(1)}s" x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}"/>`;
    }).join('');
    return `<svg class="pks pkbig" viewBox="0 0 40 40" role="img" aria-label="shape"><polygon class="pkf pkdim" points="${P.map(p => p.join(',')).join(' ')}"/>${ls}</svg>`;
  },
  // a row of n unit cubes with an object lying above it (meas 2); o.nums writes 1..n in the cubes (the hint)
  cubes(n, obj, o = {}) {
    const s = 24, P = 8, w = n * s, H = 76;
    let b = '';
    if (obj == 'pencil' && n >= 2) {
      b += `<path class="vpt" d="M${P} 22L${P + 22} 10v24z"/><path class="vpin" d="M${P} 22l5-3v6z"/>`
        + `<rect class="v2" x="${P + 22}" y="10" width="${w - 22}" height="24" rx="3"/>`;
    } else b += `<rect class="v1" x="${P}" y="10" width="${w}" height="24" rx="5"/>`;
    b += `<path class="vgd" d="M${P} 36V44M${P + w} 36V44"/>`;
    for (let i = 0; i < n; i++) {
      b += `<rect class="vwg" x="${P + i * s}" y="44" width="${s}" height="${s}" rx="3"/>`;
      if (o.nums) b += `<text class="vcn" x="${P + i * s + s / 2}" y="62">${i + 1}</text>`;
    }
    return CT.root('cub', w + 2 * P, H, b, 'unit cubes');
  },
  // a circle or rectangle cut into d parts (2 or 4), equal or not (frac 1). 100 x 80 box. Direction of the cuts is random.
  cut(shape, d, eq) {
    const cx = 50, cy = 40, r = 36, x0 = 6, x1 = 94, y0 = 8, y1 = 72, W = x1 - x0, Ht = y1 - y0;
    const f1 = x => Math.round(x * 10) / 10;
    const sgn = coin() ? 1 : -1, sgn2 = coin() ? 1 : -1, horiz = coin();
    const vl = x => { const dy = Math.sqrt(r * r - (x - cx) * (x - cx)); return `M${f1(x)} ${f1(cy - dy)}V${f1(cy + dy)}`; };
    const hl = y => { const dx = Math.sqrt(r * r - (y - cy) * (y - cy)); return `M${f1(cx - dx)} ${f1(y)}H${f1(cx + dx)}`; };
    const rv = x => `M${f1(x)} ${y0}V${y1}`, rh = y => `M${x0} ${f1(y)}H${x1}`;
    let out, ln = '';
    if (shape == 'circle') {
      out = `<circle class="vp" cx="${cx}" cy="${cy}" r="${r}"/>`;
      if (d == 2) ln = horiz ? hl(cy + (eq ? 0 : sgn * 14)) : vl(cx + (eq ? 0 : sgn * 14));
      else ln = eq ? vl(cx) + hl(cy) : vl(cx + sgn * 13) + hl(cy + sgn2 * 11);
    } else {
      out = `<rect class="vp" x="${x0}" y="${y0}" width="${W}" height="${Ht}" rx="4"/>`;
      const at = e => e ? .5 : sgn > 0 ? .3 : .7;
      if (d == 2) ln = horiz ? rh(y0 + Ht * at(eq)) : rv(x0 + W * at(eq));
      else if (eq) {
        const k = pick([0, 1, 2]);
        ln = k == 0 ? rv(x0 + W * .25) + rv(x0 + W * .5) + rv(x0 + W * .75)
          : k == 1 ? rh(y0 + Ht * .25) + rh(y0 + Ht * .5) + rh(y0 + Ht * .75) : rv(x0 + W * .5) + rh(y0 + Ht * .5);
      } else ln = horiz ? rv(x0 + W * .15) + rv(x0 + W * .45) + rv(x0 + W * .65)
        : rv(x0 + W * (sgn > 0 ? .35 : .65)) + rh(y0 + Ht * (sgn2 > 0 ? .35 : .65));
    }
    return CT.root('cut', 100, 80, `${out}<path class="ve" d="${ln}"/>`, shape == 'circle' ? 'a circle cut into parts' : 'a rectangle cut into parts');
  },
};
CT.SHP = {
  triangle: [[20, 5], [36, 35], [4, 35]], square: [[6, 6], [34, 6], [34, 34], [6, 34]], rectangle: [[2, 10], [38, 10], [38, 30], [2, 30]],
  pentagon: CT.reg(5, 0), hexagon: CT.reg(6, 0.5), trapezoid: [[11, 10], [29, 10], [38, 32], [2, 32]],
};
CT.NS = {triangle: 3, square: 4, rectangle: 4, pentagon: 5, hexagon: 6, trapezoid: 4};

// pv 1: base-ten picture -> number; "How many tens in 47?"; "30 + 6 = ?"  (tens 1-9, ones 0-9; the three forms mixed evenly)
function genPv1() {
  const t = R(1, 9), form = pick(['pic', 'tens', 'sum']);
  if (form == 'pic') {
    const u = R(0, 9), n = t * 10 + u;
    return {kind: 'num', html: `${VIZ.base10(n)}<div class="sub">How many in all?</div>${SLOT}`,
      say: 'How many blocks in all? Count the rods by tens, then the little cubes by ones.', ans: String(n),
      label: `pv picture ${t} tens ${u} ones`, hint: {k: 'text', s: 'Count the rods by tens first.'}};
  }
  if (form == 'tens') {
    const n = t * 10 + R(0, 9);
    return {kind: 'num', html: `<div class="eq">${n}</div><div class="sub">How many tens?</div>${SLOT}`,
      say: `How many tens are in ${n}?`, ans: String(t), label: `pv tens in ${n}`,
      hint: {k: 'text', s: `The first digit tells the tens. In ${n}, look at the ${t}.`}};
  }
  const u = R(1, 9), n = t * 10 + u;
  return {kind: 'num', html: `<div class="eq">${t * 10} + ${u} = ${SLOT}</div>`, say: `${t * 10} plus ${u} equals what?`,
    ans: String(n), label: `${t * 10} + ${u} = ?`, hint: {k: 'text', s: `${qN(t, 'ten')} is ${t * 10}. Put the ${qN(u, 'one')} with it.`}};
}

// add 5: three addends, sum <= 20; two of them make ten or are a double in 60% of the items, the rest have neither
function genAdd5() {
  const hasTen = v => v[0] + v[1] == 10 || v[0] + v[2] == 10 || v[1] + v[2] == 10;
  const hasDbl = v => v[0] == v[1] || v[0] == v[2] || v[1] == v[2];
  const special = rnd() < 0.6;
  let v;
  do v = [R(1, 9), R(1, 9), R(1, 9)];
  while (v[0] + v[1] + v[2] > 20 || (special ? !(hasTen(v) || hasDbl(v)) : hasTen(v) || hasDbl(v)));
  const s = v[0] + v[1] + v[2];
  const hint = hasTen(v) ? 'Look for a pair that makes 10.' : hasDbl(v) ? 'Look for a double, like 4 + 4.' : 'Add two numbers first. Then add the last one.';
  v = shuffle(v);
  return {kind: 'num', html: `<div class="eq">${v[0]} + ${v[1]} + ${v[2]} = ${SLOT}</div>`, say: `${v[0]} plus ${v[1]} plus ${v[2]} equals what?`,
    ans: String(s), label: `${v[0]} + ${v[1]} + ${v[2]} = ?`, hint: {k: 'text', s: hint}};
}

// add 6: mental two-digit: +10, -10, + a multiple of 10 (sum <= 99), and +/- inside the same ten (34 + 5)
function genAdd6() {
  const f = pick(['p10', 'm10', 'pm', 'pu', 'mu']);
  const T = s => ({hint: {k: 'text', s}});
  if (f == 'p10') { const n = R(10, 89); return mathQ(n, '+', 10, n + 10, 'c', false, T('Only the tens digit changes. One more ten.')); }
  if (f == 'm10') { const n = R(20, 99); return mathQ(n, '-', 10, n - 10, 'c', false, T('Only the tens digit changes. One less ten.')); }
  if (f == 'pm') {
    const k = R(2, 8), n = R(10, 99 - 10 * k);
    return mathQ(n, '+', k * 10, n + k * 10, 'c', false, T(`Only the tens digit changes. Add ${k} tens.`));
  }
  const t = R(1, 9);
  if (f == 'pu') {
    const a = R(0, 8), u = R(1, 9 - a), n = t * 10 + a;
    return mathQ(n, '+', u, n + u, 'c', false, T(`The tens stay the same. Add the ones: ${a} + ${u}.`));
  }
  const a = R(1, 9), u = R(1, a), n = t * 10 + a;
  return mathQ(n, '-', u, n - u, 'c', false, T(`The tens stay the same. Take away from the ones: ${a} - ${u}.`));
}

// meas 2: an object above a row of unit cubes, 1 to 12 cubes long. Level 1 is reserved for P2-02 (K) and asks the same until it ships.
function genMeas2(lv) {
  const n = R(1, 12), obj = n >= 2 && coin() ? 'pencil' : 'strip', name = obj == 'pencil' ? 'pencil' : 'paper strip';
  return {kind: 'num', html: `${CT.cubes(n, obj)}<div class="sub">How many cubes long is the ${name}?</div>${SLOT}`,
    say: `How many cubes long is the ${name}?`, ans: String(n), label: `meas ${name} ${n} cubes`,
    hint: {k: 'html', html: `<div class="pkhint">${CT.cubes(n, obj, {nums: true})}<div class="sub">Count the cubes under it, one by one.</div></div>`,
      w: 'Count the cubes under it, one by one.'}};
}

// data 1: picture graph, 3 categories, values 1-8 (all different), one symbol = 1; five question forms
const CT_DATA = [['Our pets', ['Cats', 'Dogs', 'Fish', 'Birds']], ['Favorite fruit', ['Apples', 'Pears', 'Plums', 'Grapes']],
  ['Playground fun', ['Swings', 'Slides', 'Tag', 'Ball']], ['Favorite colors', ['Red', 'Blue', 'Green', 'Pink']]];
function genData1() {
  const [title, pool] = pick(CT_DATA), names = shuffle(pool).slice(0, 3), vals = shuffle([1, 2, 3, 4, 5, 6, 7, 8]).slice(0, 3);
  const g = `<div class="sub"><b>${esc(title)}</b></div>${VIZ.pictograph(names.map((x, i) => [x, vals[i]]), {key: 1})}`;
  const form = pick(['count', 'most', 'least', 'more', 'sum']);
  const i = R(0, 2), lc = k => names[k].toLowerCase(), gist = names.map((x, k) => `${x} ${vals[k]}`).join(' ');
  const num = (ask, ans, label, hint) => ({kind: 'num', html: `${g}<div class="sub">${ask}</div>${SLOT}`, say: ask, ans: String(ans), label, hint: {k: 'text', s: hint}});
  if (form == 'count') return num(`How many ${lc(i)}?`, vals[i], `data count ${names[i]}: ${gist}`, 'Count the circles in that row. Touch each one.');
  if (form == 'most' || form == 'least') {
    const most = form == 'most', want = most ? Math.max(...vals) : Math.min(...vals), a = vals.indexOf(want);
    return {kind: 'choice', html: `${g}<div class="sub">Which has the ${most ? 'most' : 'least'}?</div>`, say: `Which has the ${most ? 'most' : 'least'}?`,
      ans: names[a], after: `${names[a]} has the ${most ? 'most' : 'least'}`, choices: names.map(x => ({l: x, v: x})),
      label: `data ${form}: ${gist}`, hint: {k: 'text', s: `Count each row. The row with the ${most ? 'longest' : 'shortest'} line wins.`}};
  }
  const j = pick([0, 1, 2].filter(x => x != i));
  if (form == 'more') {
    const [hi, lo] = vals[i] > vals[j] ? [i, j] : [j, i];
    return num(`How many more ${lc(hi)} than ${lc(lo)}?`, vals[hi] - vals[lo], `data more ${names[hi]} than ${names[lo]}: ${gist}`,
      'Count each row, then find the difference.');
  }
  return num(`How many ${lc(i)} and ${lc(j)} in all?`, vals[i] + vals[j], `data total ${names[i]} ${names[j]}: ${gist}`, 'Count each row, then add the two numbers.');
}

// shape 4: sides, corners and "which shape has 4 sides?". Levels 2-3 are K (P2-02) and ask the Pre-K shape question until it ships.
const CT_SH = ['triangle', 'square', 'rectangle', 'pentagon', 'hexagon', 'trapezoid'];
function genShape(lv) {
  if (lv < 4) return genPkShape(lv);
  const form = pick(['sides', 'corners', 'which']);
  if (form == 'which') {
    const ans = pick(['square', 'rectangle', 'trapezoid']), ch = [ans, ...shuffle(['triangle', 'pentagon', 'hexagon']).slice(0, 2)];
    return {kind: 'choice', cls: 'pics', ans, choices: shuffle(ch).map(x => ({l: VIZ.shape(x), v: x, h: true})),
      html: '<div class="pkq pkask">4</div><div class="sub">Which shape has 4 sides?</div>', say: 'Which shape has 4 sides?',
      after: `A ${ans} has 4 sides`, label: `which has 4 sides: ${ch.join(' ')}`,
      hint: {k: 'html', html: `<div class="pkhint">${CT.sides(ans)}<div class="sub">Count the sides. Which shape has 4?</div></div>`, w: 'Count the sides. Which shape has 4?'}};
  }
  const name = pick(CT_SH), word = form == 'sides' ? 'sides' : 'corners';
  const hint = form == 'sides'
    ? {k: 'html', html: `<div class="pkhint">${CT.sides(name)}<div class="sub">Count the sides as they light up.</div></div>`, w: 'Count the sides as they light up.'}
    : {k: 'html', html: `<div class="pkhint">${VIZ.shape(name, {dots: true})}<div class="sub">A corner is where two sides meet. Count the dots.</div></div>`,
      w: 'A corner is where two sides meet. Count the dots.'};
  return {kind: 'num', html: `${VIZ.shape(name)}<div class="sub">How many ${word}?</div>${SLOT}`, say: `How many ${word} does this shape have?`,
    ans: String(CT.NS[name]), label: `${word} of ${name}`, hint};
}

// frac 1: circles and rectangles cut in 2 or 4 parts, equal or not. "Which shows halves?" "Which shows fourths?" "Is it cut into equal parts?"
function genFrac1() {
  const shape = coin() ? 'circle' : 'rect', form = pick(['halves', 'fourths', 'equal']);
  if (form == 'equal') {
    const d = pick([2, 4]), eq = coin();
    return {kind: 'choice', cls: 'syms', html: `${CT.cut(shape, d, eq)}<div class="sub">Is it cut into equal parts?</div>`, say: 'Is it cut into equal parts?',
      ans: eq ? 'yes' : 'no', after: eq ? 'Yes, the parts are all the same size' : 'No, the parts are not the same size',
      choices: [{l: 'Yes', v: 'yes'}, {l: 'No', v: 'no'}], label: `equal parts? ${shape} ${d} ${eq ? 'yes' : 'no'}`,
      hint: {k: 'text', s: 'Equal shares are the same size. Could you lay one part on top of another?'}};
  }
  const d = form == 'halves' ? 2 : 4;
  const spec = [[d, true], ...shuffle([[2, true], [2, false], [4, true], [4, false]].filter(x => !(x[0] == d && x[1]))).slice(0, 2)];
  const items = shuffle(spec.map((s, i) => ({s, right: i == 0})));
  const at = items.findIndex(x => x.right);
  return {kind: 'choice', cls: 'pics', ans: String(at), choices: items.map((x, i) => ({l: CT.cut(shape, x.s[0], x.s[1]), v: String(i), h: true})),
    html: `<div class="sub">Which one shows ${form}?</div>`, say: `Which one shows ${form}?`, after: `That one shows ${form}`,
    label: `which shows ${form}: ${shape} ${spec.slice(1).map(x => x[0] + (x[1] ? 'eq' : 'un')).sort().join(' ')}`,
    hint: {k: 'text', s: `Equal shares are the same size. ${form == 'halves' ? 'Halves are 2 equal parts.' : 'Fourths are 4 equal parts.'}`}};
}

// ---- P2-04 Treasure Bay (2nd) ----
/* Grade 2 gaps (CURRICULUM M-2): pv 2-3, big 5, sub 5, time 4, coins 4-5, meas 3, data 2, arr 1, cnt 5, story 4, pat 3, world Treasure Bay (m_bay).
   Pictures are VIZ.* (base10, clock, coinSVG, ruler, barGraph, array). Hints with several steps are a numbered list (class hsteps, 10-components.css).
   Randomness: R, rnd, pick, shuffle, coin only. Each function below is one level; 38-skills.js calls it for that level and the old generator for the rest. */
const BAY = {
  // a numbered list hint; w (spoken) defaults to the steps read one after another
  steps(list, w) {
    return {k: 'html', html: `<ol class="hsteps">${list.map(s => `<li>${esc(s)}</li>`).join('')}</ol>`, w: w || list.join(' ')};
  },
  txt: s => ({k: 'text', s}),
  // "$3.45" from cents
  money: c => '$' + (c / 100).toFixed(2),
  // the right value plus distractors in the order given (shuffled), then fill-ins, up to 4 unique values
  pick4(ans, bad, fill = []) {
    const out = [ans];
    for (const x of [...shuffle(bad), ...shuffle(fill)]) if (out.length < 4 && !out.includes(x)) out.push(x);
    return out;
  },
};

// pv 2: base-ten picture with flats, rods and units (100-999; zero tens or ones in 30% of the items) -> number; or "What is the value of the 5 in 352?"
function genBayPv2() {
  if (rnd() < 0.55) {
    const h = R(1, 9), z = rnd() < 0.3 ? pick(['t', 'o', 'to']) : '';
    const t = z.includes('t') ? 0 : R(1, 9), u = z.includes('o') ? 0 : R(1, 9), n = h * 100 + t * 10 + u;
    return {kind: 'num', html: `${VIZ.base10(n)}<div class="sub">How many in all?</div>${SLOT}`,
      say: 'How many blocks in all? Count the flats by hundreds, the rods by tens, then the little cubes by ones.', ans: String(n),
      label: `pv picture ${n}`, hint: BAY.steps(['Count the flats. Each flat is 100.', 'Count the rods. Each rod is 10.', 'Count the little cubes. Each is 1.'])};
  }
  let d;
  do d = [R(1, 9), R(1, 9), R(1, 9)]; while (new Set(d).size < 3);
  const p = R(0, 2), n = d[0] * 100 + d[1] * 10 + d[2], place = ['hundreds', 'tens', 'ones'][p], val = d[p] * [100, 10, 1][p];
  const shown = d.map((x, i) => (i == p ? `<b><u>${x}</u></b>` : x)).join('');
  return {kind: 'choice', html: `<div class="eq">${shown}</div><div class="sub">What is the value of the ${d[p]} in ${n}?</div>`,
    say: `What is the value of the ${d[p]} in ${n}?`, ans: String(val), after: `The ${d[p]} is in the ${place} place, so it is worth ${val}`,
    choices: [d[p], d[p] * 10, d[p] * 100].map(x => ({l: String(x), v: String(x)})),
    label: `value of ${d[p]} in ${n}`,
    hint: BAY.txt('Look at which place the digit is in: hundreds, tens or ones. The place tells how much it is worth.')};
}

// pv 3: expanded form to 999: "400 + 30 + 7 = ?", "600 + ? + 2 = 652", "Which is 508?"
function genBayPv3() {
  const form = pick(['exp', 'miss', 'which']);
  const parts = (h, t, u) => [h * 100, t * 10, u].filter(x => x > 0);
  const hint = BAY.txt('Hundreds, then tens, then ones.');
  if (form == 'exp') {
    const h = R(1, 9), t = rnd() < 0.2 ? 0 : R(1, 9), u = rnd() < 0.2 ? 0 : R(1, 9), p = parts(h, t, u), n = h * 100 + t * 10 + u;
    return {kind: 'num', html: `<div class="eq">${p.join(' + ')} = ${SLOT}</div>`, say: `${p.join(' plus ')} equals what?`,
      ans: String(n), label: `${p.join(' + ')} = ?`, hint};
  }
  if (form == 'miss') {
    const d = [R(1, 9), R(1, 9), R(1, 9)], b = pick([0, 1, 1, 1, 2]), v = [d[0] * 100, d[1] * 10, d[2]], n = v[0] + v[1] + v[2];
    return {kind: 'num', html: `<div class="eq">${v.map((x, i) => (i == b ? SLOT : x)).join(' + ')} = ${n}</div>`,
      say: `${v.map((x, i) => (i == b ? 'what' : x)).join(' plus ')} equals ${n}`, ans: String(v[b]),
      label: `${v.map((x, i) => (i == b ? '?' : x)).join(' + ')} = ${n}`, hint};
  }
  let h, t, u, ch, ans;
  for (;;) {
    h = R(1, 9); t = rnd() < 0.5 ? 0 : R(1, 9); u = R(1, 9);
    ans = parts(h, t, u).join(' + ');
    ch = BAY.pick4(ans, [parts(h, u, t).join(' + '), parts(t, h, u).join(' + '), [h, t, u].filter(x => x > 0).join(' + '),
      parts(u, t, h).join(' + ')]);
    if (ch.length == 4) break;
  }
  const n = h * 100 + t * 10 + u;
  return {kind: 'choice', cls: 'wide', html: `<div class="sub">Which one is ${n}?</div>`, say: `Which one is ${n}?`, ans, after: `${ans} makes ${n}`,
    choices: shuffle(ch).map(x => ({l: x, v: x})), label: `which is ${n}`, hint};
}

// big 5: 3-digit + 3-digit, regrouping in the ones, the tens or both, sum <= 999, vertical
function genBayBig5() {
  const kind = pick(['ones', 'tens', 'both']);
  let d;
  for (;;) {
    d = [R(1, 8), R(0, 9), R(0, 9), R(1, 8), R(0, 9), R(0, 9)]; // a2 a1 a0 b2 b1 b0
    const c0 = d[2] + d[5] >= 10 ? 1 : 0, c1 = d[1] + d[4] + c0 >= 10 ? 1 : 0;
    if (d[0] + d[3] + c1 > 9) continue;
    if ((kind == 'ones' && c0 && !c1) || (kind == 'tens' && !c0 && c1) || (kind == 'both' && c0 && c1)) break;
  }
  const a = d[0] * 100 + d[1] * 10 + d[2], b = d[3] * 100 + d[4] * 10 + d[5];
  // P2-08: column steps, one per tap (ones, tens, then the hundreds with a "?")
  return mathQ(a, '+', b, a + b, 'c', true, {hint: stepsAdd(a, b), label: `${a} + ${b} = ?`});
}

// sub 5: 3-digit - 3-digit, no regrouping, vertical
function genBaySub5() {
  const d = [R(2, 9), R(0, 9), R(0, 9)], e = [R(1, d[0] - 1), R(0, d[1]), R(0, d[2])];
  const a = d[0] * 100 + d[1] * 10 + d[2], b = e[0] * 100 + e[1] * 10 + e[2];
  const hint = BAY.steps([`Ones first: ${d[2]} - ${e[2]}.`, `Then the tens: ${d[1]} - ${e[1]}.`, `Then the hundreds: ${d[0]} - ${e[0]}.`]);
  return mathQ(a, '-', b, a - b, 'c', true, {hint, label: `${a} - ${b} = ?`});
}

// time 4: analog clock to the nearest 5 minutes -> the digital time (hands swapped, next hour and 5-minute neighbour as distractors)
function genBayTime4() {
  const h = R(1, 12), m = rnd() < 0.75 ? pick([5, 10, 20, 25, 35, 40, 50, 55]) : pick([0, 15, 30, 45]);
  const hh = x => ((x + 11) % 12) + 1, ans = tstr(h, m);
  const swap = tstr(hh(m / 5), (h * 5) % 60), next = tstr(hh(h + 1), m), nb = tstr(h, m == 55 ? 50 : m + 5), nb2 = m ? tstr(h, m - 5) : tstr(h, 5);
  const ch = BAY.pick4(ans, [swap, next, nb, nb2], [tstr(hh(h - 1), m), tstr(hh(h + 2), m), tstr(h, (m + 30) % 60)]);
  return {kind: 'choice', html: `${VIZ.clock(h, m)}<div class="sub">What time is it?</div>`, say: 'What time does the clock show?', ans,
    after: `It's ${ans}`, choices: shuffle(ch).map(x => ({l: x, v: x})), label: `clock to 5 min ${ans}`,
    hint: BAY.txt('The short pink hand shows the hour. The long blue hand shows the minutes: count by 5s from the 12.')};
}

// coins 4: dollar bills (1, 5) and coins up to $9.99. How much? (four amounts like $3.45)
function genBayCoins4() {
  let list, tot;
  do {
    const b5 = pick([0, 0, 1]), b1 = R(b5 ? 0 : 1, 4), cs = Array.from({length: R(1, 4)}, () => pick([25, 10, 5, 1])).sort((x, y) => y - x);
    list = [...Array(b5).fill(500), ...Array(b1).fill(100), ...cs];
    tot = list.reduce((x, y) => x + y, 0);
  } while (tot > 999 || list.length > 8);
  const hasFive = list.includes(500);
  const ch = BAY.pick4(tot, [tot + 10, tot - 10, tot + 100, tot - 100, tot + 5, tot - 5, hasFive ? tot - 400 : tot + 25].filter(x => x > 0 && x <= 1100));
  return {kind: 'choice', cls: 'wide', html: `${VIZ.coinSVG(list)}<div class="sub">How much money?</div>`, say: 'How much money is this?', ans: BAY.money(tot),
    after: `That is ${BAY.money(tot)}`, choices: shuffle(ch).map(x => ({l: BAY.money(x), v: BAY.money(x)})), label: `money ${list.join('+')}`,
    hint: BAY.txt('Count the bills first, biggest to smallest. Then count on with the coins, biggest to smallest.')};
}

// coins 5: making change. Pay $1.00 for a price of 5 to 95 cents, or pay $5 for whole dollars and 50 cents. Change in cents.
const BAY_ITEMS = [['apple', '🍎'], ['cookie', '🍪'], ['ball', '⚽'], ['toy car', '🚗'], ['crayon', '🖍️'], ['pencil', '✏️'], ['fish', '🐟']];
function genBayCoins5() {
  const [it, e] = pick(BAY_ITEMS), art = `<div class="eq">${picFor(it, e)}</div>`, ex = /^[aeiou]/.test(it) ? 'An' : 'A';
  if (coin()) {
    const p = 5 * R(1, 19), t = `${ex} ${it} costs ${p} cents. You pay 1 dollar. How many cents do you get back?`;
    return {kind: 'num', html: `${art}<p class="story">${esc(t)}</p><div class="eq" style="font-size:.7em">${SLOT}¢</div>`, say: t, auto: true,
      ans: String(100 - p), label: `change from 100 for ${p}`, hint: BAY.txt(`Count up from ${p} to 100. How many cents is that?`)};
  }
  const d = R(1, 4), p = d * 100 + 50, t = `${ex} ${it} costs $${d}.50. You pay 5 dollars. How many cents do you get back?`;
  return {kind: 'num', html: `${art}<p class="story">${esc(t)}</p><div class="eq" style="font-size:.7em">${SLOT}¢</div>`,
    say: `${ex} ${it} costs ${qN(d, 'dollar')} and 50 cents. You pay 5 dollars. How many cents do you get back?`, auto: true, ans: String(500 - p),
    label: `change from 500 for ${p}`, hint: BAY.txt(`Count up from $${d}.50 to the next dollar, then on to $5.00. Add the two jumps.`)};
}

// meas 3: ruler (inches 0-12 or cm 0-15), object from 0 (70%) or from another mark (30%). How long?
function genBayMeas3() {
  const unit = coin() ? 'in' : 'cm', max = unit == 'in' ? 12 : 15, from = rnd() < 0.3 ? R(1, 6) : 0, len = R(2, max - from);
  const obj = coin() ? 'pencil' : 'bar', name = obj == 'pencil' ? 'pencil' : 'paper strip', word = unit == 'in' ? 'inches' : 'cm';
  const q = `How long is the ${name}?`;
  return {kind: 'num', html: `${VIZ.ruler(len, unit, obj, {from, max})}<div class="sub">${q}</div><div class="eq" style="font-size:.7em">${SLOT} ${word}</div>`,
    say: `${q} Say how many ${unit == 'in' ? 'inches' : 'centimeters'}.`, ans: String(len), label: `ruler ${unit} from ${from} to ${from + len}`,
    hint: BAY.txt(from ? 'The object does not start at 0. Subtract where it starts from where it ends.' : 'The left end sits at 0. Read the number where the right end is.')};
}

// data 2: bar graph, 4 categories, scale 1, values 0-10 (all different); count, most, least, how many more, two together, all together
function genBayData2() {
  const [title, pool] = pick(CT_DATA), names = shuffle(pool), vals = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 4);
  const g = `<div class="sub"><b>${esc(title)}</b></div>${VIZ.barGraph(names.map((x, i) => [x, vals[i]]), 1)}`;
  const form = pick(['count', 'most', 'least', 'more', 'two', 'all']), gist = names.map((x, k) => x.slice(0, 2) + vals[k]).join(' ');
  const lc = k => names[k].toLowerCase(), i = R(0, 3);
  const num = (ask, ans, label, hint) => ({kind: 'num', html: `${g}<div class="sub">${ask}</div>${SLOT}`, say: ask, ans: String(ans), label, hint: BAY.txt(hint)});
  if (form == 'count') return num(`How many ${lc(i)}?`, vals[i], `bar count ${names[i]}: ${gist}`, 'Find the top of the bar. Read the number on the side.');
  if (form == 'most' || form == 'least') {
    const most = form == 'most', a = vals.indexOf(most ? Math.max(...vals) : Math.min(...vals));
    return {kind: 'choice', html: `${g}<div class="sub">Which has the ${most ? 'most' : 'least'}?</div>`, say: `Which has the ${most ? 'most' : 'least'}?`,
      ans: names[a], after: `${names[a]} has the ${most ? 'most' : 'least'}`, choices: names.map(x => ({l: x, v: x})), label: `bar ${form}: ${gist}`,
      hint: BAY.txt(`The ${most ? 'tallest' : 'shortest'} bar is the one with the ${most ? 'most' : 'least'}.`)};
  }
  if (form == 'all') return num('How many in all?', vals.reduce((x, y) => x + y, 0), `bar total: ${gist}`, 'Read each bar, then add all four numbers.');
  const j = pick([0, 1, 2, 3].filter(x => x != i));
  if (form == 'more') {
    const [hi, lo] = vals[i] > vals[j] ? [i, j] : [j, i];
    return num(`How many more ${lc(hi)} than ${lc(lo)}?`, vals[hi] - vals[lo], `bar more ${names[hi]} than ${names[lo]}: ${gist}`, 'Read both bars, then find the difference.');
  }
  return num(`How many ${lc(i)} and ${lc(j)} in all?`, vals[i] + vals[j], `bar two ${names[i]} ${names[j]}: ${gist}`, 'Read both bars, then add the two numbers.');
}

// arr 1: array of dots, r and c in 2-5, with "3 rows of 4" shown; how many in all?
function genBayArr1() {
  const r = R(2, 5), c = R(2, 5);
  return {kind: 'num', html: `${VIZ.array(r, c)}<div class="sub">${r} rows of ${c}</div><div class="sub">How many in all?</div>${SLOT}`,
    say: `${r} rows of ${c}. How many in all?`, ans: String(r * c), label: `array ${r} rows of ${c}`,
    hint: BAY.txt(`Each row has ${c}. Add ${Array(r).fill(c).join(' + ')}.`)};
}

// cnt 5: skip count by 3s, 4s or 100s; 5 terms within 1000, one blank
function genBayCnt5() {
  const step = pick([3, 4, 100]), start = step == 100 ? 100 * R(0, 6) : step * R(0, 30), bi = R(1, 4);
  const seq = [0, 1, 2, 3, 4].map(i => start + i * step);
  return {kind: 'num', html: `<div class="seq">${seq.map((n, i) => (i == bi ? SLOT : n)).join(', ')}</div><div class="sub">Count by ${step}s</div>`,
    say: `Count by ${step}s. ` + seq.map((n, i) => (i == bi ? 'what' : n)).join(', '), ans: String(seq[bi]),
    hint: BAY.txt(`Add ${step} each time. What comes after ${seq[bi - 1]}?`), label: `skip ${seq.map((n, i) => (i == bi ? '_' : n)).join(',')}`};
}

// story 4: two-step add/subtract within 100 (get some then lose some, lose then get, compare then total)
function genBayStory4() {
  const me = S.name || 'Sam', n2 = pick([S.buddy, S.buddy, petN(), ...NAMES].filter(n => n && n !== me));
  const th = pick(THINGS)[0], who = pick([me, n2]), other = who == me ? n2 : me;
  let t, ans, label, hint;
  const form = pick(['gl', 'lg', 'more', 'fewer']);
  if (form == 'gl' || form == 'lg') {
    const a = R(15, 50), b = R(10, 40), c = R(5, Math.min(a + b - 5, 40));
    if (form == 'gl') {
      t = pick([`${who} has ${a} ${th}. ${other} gives ${who} ${b} more. Then ${who} gives away ${c}. How many ${th} does ${who} have now?`,
        `${who} had ${a} ${th}. ${who} found ${b} more and then lost ${c}. How many ${th} are left?`]);
      ans = a + b - c; label = `2-step ${a} + ${b} - ${c}`;
      hint = BAY.steps([`First find how many ${who} has after getting ${b} more.`, `Then take away ${c} from that number.`], 'Do one step at a time.');
    } else {
      const c2 = Math.min(c, a - 1);
      t = `${who} had ${a} ${th}. ${who} gave ${c2} to ${other}. Then ${who} got ${b} more. How many ${th} does ${who} have now?`;
      ans = a - c2 + b; label = `2-step ${a} - ${c2} + ${b}`;
      hint = BAY.steps([`First take away the ${c2} ${who} gave.`, `Then add the ${b} more.`], 'Do one step at a time.');
    }
  } else if (form == 'more') {
    const a = R(10, 40), b = R(5, Math.min(25, 100 - 2 * a));
    t = `${who} has ${a} ${th}. ${other} has ${b} more than ${who}. How many ${th} do they have together?`;
    ans = 2 * a + b; label = `2-step ${a} + (${a} + ${b})`;
    hint = BAY.steps([`First find how many ${other} has: ${b} more than ${a}.`, `Then add ${who}'s ${th} and ${other}'s ${th}.`], 'Do one step at a time.');
  } else {
    const a = R(15, 50), b = R(5, 20);
    t = `${who} has ${a} ${th}. ${other} has ${b} fewer than ${who}. How many ${th} do they have together?`;
    ans = 2 * a - b; label = `2-step ${a} + (${a} - ${b})`;
    hint = BAY.steps([`First find how many ${other} has: ${b} fewer than ${a}.`, `Then add ${who}'s ${th} and ${other}'s ${th}.`], 'Do one step at a time.');
  }
  return {kind: 'num', html: `<p class="story">${words(t)}</p><div>${SLOT}</div>`, say: t, auto: true, ans: String(ans), hint, label};
}

// pat 3: growing number pattern, rule +2..+10 or -2..-10, start 0-50, 4 terms shown, give the 5th
function genBayPat3() {
  const d = R(2, 10), up = coin(), start = up ? R(0, 50) : R(4 * d, Math.max(4 * d, 50)), s = up ? d : -d;
  const seq = [0, 1, 2, 3, 4].map(i => start + i * s);
  return {kind: 'num', html: `<div class="seq">${seq.slice(0, 4).join(', ')}, ${SLOT}</div><div class="sub">What comes next?</div>`,
    say: `${seq.slice(0, 4).join(', ')}, what comes next?`, ans: String(seq[4]), label: `grow ${seq.slice(0, 4).join(',')}`,
    hint: BAY.txt(`What is ${up ? 'added' : 'taken away'} each time? Look at ${seq[0]} and ${seq[1]}.`)};
}
/* ---------- reading generators ---------- */
function words(t){return t.split(' ').map(w=>`<span class="w" data-w="${esc(w.replace(/[^A-Za-z']/g,''))}">${esc(w)}</span>`).join(' ')}
function genSight(lv){const L=DOL[lv-1],w=pick(L),hw=sameSound(w);
  const sim=x=>(x[0].toLowerCase()==w[0].toLowerCase()?2:0)+(x.length==w.length?1:0);
  // R-01r: never a word that sounds the same as the one heard (to / two, right / write): the child could not tell which is meant
  const d=shuffle(shuffle(L.filter(x=>x!==w&&!hw.includes(x.toLowerCase()))).sort((x,y)=>sim(y)-sim(x)).slice(0,6)).slice(0,3);
  return{kind:'choice',html:`<button class="btn hear" data-say="${esc(w)}">🔊</button><div class="sub">Tap the word you hear</div>`,
    say:w,auto:'must',ans:w,choices:shuffle([w,...d]).map(x=>({l:x,v:x})),hint:{k:'say',s:`Listen again. It starts with “${w[0]}”.`,w},label:`hear “${w}”`}}
// R-01r: three real words from the word's checked contrast set (PWC in 20-words.js: cap / cape, boat / boot). Letters are never
// changed at random any more: that made impossible spellings (snakb) and, about one time in 50, a slur or a rude word.
// The blocklist check stays as a second guard.
function variants(w){
  return shuffle((PWC[w]||[]).filter(x=>x!==w&&!BAD.test(x)&&!ksBad(x,true))).slice(0,3)}
function genPic(lv){const [w,e]=pick(WL(lv));
  return{kind:'choice',html:`<div class="emo">${picFor(w,e)}</div><div class="sub">Which word is this?</div>`,say:'Which word is this?',after:w,ans:w,
    choices:shuffle([w,...variants(w)]).map(x=>({l:x,v:x})),hint:{k:'say',s:'Listen! Now find it.',w},label:`read “${w}”`}}
function genBuild(lv){const [w,e]=pick(WL(lv)),abc='abcdefghijklmnoprstuw';
  const extra=shuffle([...abc].filter(c=>!w.includes(c))).slice(0,2);
  return{kind:'build',word:w,tiles:shuffle([...w,...extra]),html:`<div class="emo">${picFor(w,e)}</div><div class="lslots">${[...w].map((_,i)=>`<span class="ls" id="ls${i}"></span>`).join('')}</div>`,
    say:w,auto:true,ans:w,hint:{k:'next'},label:`spell “${w}”`}}
const T1=['I see {a} {w}.','Look at the {w}!','Here is {a} {w}.','I like the {w}.','Can you see the {w}?','The {w} is big.','The {w} is little.','Where is the {w}?'];
const T2=['Mom and I see {a} {w} by the door.','We can play with the {w} today.','Look! The {w} is up on the hill.','My friend said, "I want {a} {w}."','Come and find the {w} with me.','The little {w} went down the road.','She saw {a} {w} at the park.','Did you get {a} {w} too?'];
// R-01r: "I see the sun", "some milk", never "a sun" or "a milk"
const SENT_ART={sun:'the',milk:'some'};
function genSent(lv){const [w,e]=pick(lv==1?NOUNS.filter(x=>CVC.includes(x)):NOUNS);
  let pool=NOUNS.filter(x=>x[0]!==w);
  if(lv==2){const near=pool.filter(x=>x[0][0]==w[0]||x[0].slice(-2)==w.slice(-2));if(near.length>=2)pool=near}
  const d=shuffle(pool).slice(0,2),t=pick(lv==1?T1:T2).replace('{a}',SENT_ART[w]||art(w)).replace('{w}',w);
  // R-01r: pictures go through picFor (drawings where they exist) and are named aloud, so a child knows what each one is meant to be
  const ch=shuffle([[w,e],...d]),names=ch.map(x=>x[0]);
  return{kind:'choice',cls:'pics',html:`<div class="sent">${words(t)}</div><div class="sub">Tap the picture that matches</div>`,
    say:`Read it, then tap the picture that matches: ${names.slice(0,-1).join(', ')} or ${names[names.length-1]}.`,
    ans:w,after:t,choices:ch.map(x=>({l:picFor(x[0],x[1]),v:x[0],h:true})),hint:{k:'say',s:'Tap any word to hear it!',w:'Tap any word to hear it.'},label:`“${t}”`}}

function genCmp(lv){let a,b;
  if(lv==1){a=R(0,20);b=R(0,20)}else if(lv==2){a=R(10,99);b=coin()?Math.floor(a/10)*10+R(0,9):R(10,99)}else{a=R(100,999);b=coin()?Math.floor(a/100)*100+R(0,99):R(100,999)}
  if(rnd()<.15)b=a;const ans=a>b?'>':a<b?'<':'=',w={'>':'greater than','<':'less than','=':'equal to'};
  return{kind:'choice',cls:'syms',html:`<div class="eq">${a} ${SLOT} ${b}</div><div class="sub">Bigger, smaller, or the same?</div>`,
    say:`Is ${a} greater than, less than, or equal to ${b}?`,ans,after:`${a} is ${w[ans]} ${b}`,choices:['<','=','>'].map(x=>({l:x,v:x})),
    hint:{k:'text',s:lv==1?'The hungry alligator mouth opens toward the BIGGER number! 🐊':`Look at the ${lv==2?'tens':'hundreds'} first. The alligator eats the bigger number! 🐊`},label:`${a} ? ${b}`}}
const tstr=(h,m)=>`${h}:${String(m).padStart(2,'0')}`;
function genTime(lv){const h=R(1,12),m=lv==1?0:lv==2?pick([0,30]):pick([0,15,30,45]),ans=tstr(h,m),c=new Set([ans]);
  const hh=x=>((x+11)%12)+1;
  const cand=[tstr(hh(h+1),m),tstr(hh(h-1),m),m?tstr(h,(m+30)%60):tstr(h,30),m?tstr(hh(h+1),m):tstr(12,h*5%60),tstr(hh(h+R(2,5)),m),tstr(h,pick([0,15,30,45]))];
  for(const x of shuffle(cand)){if(c.size>=4)break;if(lv==1&&!x.endsWith(':00'))continue;c.add(x)}
  while(c.size<4)c.add(tstr(R(1,12),lv==1?0:pick([0,30])));
  const spoken=m==0?`${h} o'clock`:m==30?`half past ${h}`:m==15?`quarter past ${h}`:`quarter to ${hh(h+1)}`;
  return{kind:'choice',html:`${VIZ.clock(h,m)}<div class="sub">What time is it?</div>`,say:'What time does the clock show?',ans,after:`It's ${spoken}!`,
    choices:shuffle([...c]).map(x=>({l:x,v:x})),hint:{k:'text',s:m==0?'The short pink hand shows the hour. The long blue hand on 12 means o\'clock.':'Short pink hand = hour. Long blue hand: on 3 is :15, on 6 is :30, on 9 is :45.'},label:`clock ${ans}`}}
const COIN={1:['1¢','penny','#c2703d',1],5:['5¢','nickel','#b8bcc2',1.2],10:['10¢','dime','#c9cdd3',.95],25:['25¢','quarter','#aeb3b9',1.35]};
function genCoins(lv){const types=lv==1?[5,1]:lv==2?[10,5,1]:[25,10,5,1];let cs;
  do{cs=Array.from({length:R(lv==1?2:3,lv==1?5:6)},()=>pick(types)).sort((a,b)=>b-a)}while(cs.reduce((a,b)=>a+b,0)>99);
  const tot=cs.reduce((a,b)=>a+b,0),run=[];cs.reduce((a,b)=>(run.push(a+b),a+b),0);
  return{kind:'num',html:`<div class="coins">${cs.map(v=>`<span class="cn" style="--c:${COIN[v][2]};--s:${COIN[v][3]}">${COIN[v][0]}</span>`).join('')}</div><div class="eq" style="font-size:.7em">${SLOT}¢</div>`,
    say:'How many cents?',ans:String(tot),hint:{k:'text',s:`Start with the biggest coin and count on: ${run.slice(0,Math.min(2,run.length-1)).join(', ')}, ...`},label:`coins ${cs.join('+')}`}}
const FRUIT=['🍎','🍓','🍪','⭐','🐟','🌸','🍩','🐞'];
function genMult(lv){const g=R(2,lv==1?4:5),n=lv==1?pick([2,5,10]):R(2,5),e=pick(FRUIT);
  return{kind:'num',html:`<div class="groups">${Array.from({length:g},()=>`<span class="grp" style="--c:${n>5?5:n}">${`<i style="font-style:normal">${e}</i>`.repeat(n)}</span>`).join('')}</div><div class="eq" style="font-size:.7em">${g} groups of ${n} = ${SLOT}</div>`,
    say:`${g} groups of ${n}. How many in all?`,ans:String(g*n),hint:{k:'text',s:`Count by ${n}s: ${[1,2].map(i=>i*n).join(', ')}, ...`},label:`${g} × ${n}`}}
const STORIES=[[
 ['Sam has a red ball. He kicks it to Pam.','Who did Sam kick the ball to?','Pam',['Mom','Dad']],
 ['The cat sat on the mat. The cat is fat and black.','What color is the cat?','black',['red','white']],
 ['I have a big dog. My dog likes to run and jump.','What does the dog like to do?','run and jump',['eat and sleep','swim and dig']],
 ['Ben got a pet fish. He named it Bob.','What is the fish named?','Bob',['Ben','Max']],
 ['Mom made a cake. It was for my birthday.','Why did Mom make a cake?','for a birthday',['for the dog','for school']],
 ['We went to the park. I went down the big slide.','Where did they go?','the park',['the store','the zoo']],
 ['The sun is hot. Let us play in the pool!','Where will they play?','in the pool',['in the snow','in the house']],
 ['A frog sat on a log. It jumped into the pond.','Where did the frog jump?','into the pond',['into a tree','onto a bus']],
 ['Liz has three red pens and one blue pen.','How many red pens does Liz have?','three',['one','four']],
 ['It is raining. I need my boots and a hat.','What is the weather like?','rainy',['sunny','snowy']],
 ['The duck is in the van. The van goes fast!','What is in the van?','a duck',['a pig','a cat']],
 ['Tim fed the hen. The hen gave him an egg.','What did the hen give Tim?','an egg',['a nut','a bug']]],[
 ['Mia wanted to bake cookies. She got flour, sugar, and eggs. When the cookies were done, she gave one to her little brother.','Who got a cookie from Mia?','her little brother',['her mom','her teacher']],
 ['The class went on a trip to the farm. They saw cows, pigs, and a horse. Jake liked the pigs best because they were muddy.','Why did Jake like the pigs?','they were muddy',['they were big','they ran fast']],
 ['Ana planted a seed in a pot. She gave it water every day. After two weeks, a little green sprout came up.','What did Ana do every day?','gave it water',['sang to it','dug it up']],
 ['It was snowing outside. Leo put on his coat, hat, and mittens. Then he built a big snowman with a carrot nose.','What was the snowman\'s nose?','a carrot',['a stick','a rock']],
 ['Grandpa took Emma fishing at the lake. They sat in the boat for a long time. At last, Emma caught a fish!','Where did they go fishing?','at the lake',['at the sea','in a pool']],
 ['Max lost his blue sock. He looked under the bed and in the closet. He found it in the dog\'s bed!','Where was the sock?','in the dog\'s bed',['under the bed','in the closet']],
 ['The bus was late. The kids waited and waited. When it came, they were glad to get out of the cold.','How did the kids feel when the bus came?','glad',['sad','angry']],
 ['Owls sleep in the day and hunt at night. They have big eyes to help them see in the dark.','When do owls hunt?','at night',['in the morning','at lunch']],
 ['Sara and her dad made a bird house. They painted it yellow. The next day, two birds moved in.','What color was the bird house?','yellow',['red','blue']],
 ['Kim had a loose tooth. She wiggled it all day. At dinner, it fell out when she bit an apple!','When did the tooth fall out?','at dinner',['at school','in bed']],
 ['Bees fly from flower to flower. They take nectar back to the hive. They use it to make honey.','What do bees make?','honey',['milk','juice']],
 ['Noah had five crayons. He gave two to his friend. Then he drew a picture with the rest.','How many crayons did Noah keep?','three',['five','two']]]];
function genComp(lv){const [t,qq,a,d]=pick(STORIES[Math.min(lv,2)-1]);
  return{kind:'choice',cls:'wide',html:`<p class="story">${words(t)}</p><p class="story" style="color:#1d4ed8">${words(qq)}</p>`,say:t+' '+qq,auto:true,ans:a,
    choices:shuffle([a,...d]).map(x=>({l:x,v:x})),hint:{k:'say',s:'Listen to the story again. Tap any word to hear it.',w:t},label:qq}}


/* ---------- ABC Beach (P2-15): letters, middle vowels, digraphs, syllables ---------- */
const ABC_LOW='abcdefghijklmnopqrstuvwxyz',ABC_UP=ABC_LOW.toUpperCase();
// Wrong letters: look-alikes first, then any other letter. Returns n shuffled options that include L.
function abcOpts(L,groups,n,all){
  const near=[]; // members of the first group that holds L come first (b: d p q before the other groups)
  for(const g of groups.filter(g=>g.includes(L)))for(const c of shuffle([...g].filter(x=>x!=L)))if(!near.includes(c))near.push(c);
  const rest=shuffle([...all].filter(x=>x!=L&&!near.includes(x)));
  return shuffle([L,...near.concat(rest).slice(0,n-1)])}
const HEARBTN=w=>`<button class="btn hear" data-say="${esc(w)}">${ico('speak','1em')}</button>`;
function genAbc(lv){
  const AL=ABC_LOW;
  if(lv<=2){ // hear a letter name, tap the big (1) or little (2) letter
    const L=pick(ABCP),low=lv==2,ans=low?L.toLowerCase():L,w=LETW[L],size=low?'little':'big',s=`Find the ${size} letter ${L}.`;
    const opts=abcOpts(ans,low?LOOKL:LOOKU,low?4:3,low?ABC_LOW:ABC_UP);
    return{kind:'choice',cls:low?'syms sym4':'syms',html:`${HEARBTN(s)}<div class="sub">Tap the ${size} letter you hear</div>`,
      say:s,auto:'must',ans,after:`${ans}. ${L} is for ${w}!`,choices:opts.map(x=>({l:x,v:x})),
      hint:{k:'say',w:`${L}. ${L} is for ${w}.`,s:`${low?L.toLowerCase()+' and '+L:L} is for ${w}. Look for the ${size} ${ans}.`},label:`${size} ${L}`}}
  if(lv==3){ // match 4 big letters to their little letters
    const Ls=[];while(Ls.length<4){const x=pick(ABCP);if(!Ls.includes(x))Ls.push(x)}
    const items=Ls.map(x=>({v:x,l:x})),opts=shuffle(Ls.map(x=>({v:x,l:x.toLowerCase()})));
    return{kind:'match',html:'<div class="sub">Match each big letter to its little letter</div>',say:'Match each big letter to its little letter.',
      items,opts,ans:[...Ls].sort().join('|'),after:'Big and little letters are partners!',
      hint:{k:'say',s:'Tap a big letter, then tap the little letter that is its partner. They often look alike.',
        w:'Tap a big letter, then tap the little letter that is its partner. They often look alike.'},label:`match ${[...Ls].sort().join('')}`}}
  // lv 4: what comes after a letter (choice) or fill the gap in a run of four (build)
  const up=coin(),f=s=>up?s.toUpperCase():s;
  if(coin()){
    const i=R(0,24),L=AL[i],ans=AL[i+1];
    const d=shuffle([AL[i-1],AL[i+2],AL[i+3],AL[i-2]].filter(x=>x&&x!=ans&&x!=L)).slice(0,2);
    return{kind:'choice',cls:'syms',html:`<div class="emo">${f(L)}</div><div class="sub">What letter comes next in the ABC?</div>`,
      say:`What letter comes after ${L}?`,auto:true,ans:f(ans),after:`${f(L)}, ${f(ans)}!`,choices:shuffle([ans,...d]).map(x=>({l:f(x),v:f(x)})),
      hint:{k:'say',w:AL.slice(Math.max(0,i-3),i+1).split('').join(', '),s:`Sing the ABC song up to ${f(L)}. The very next letter is the answer.`},label:`after ${f(L)}`}}
  const s=R(1,22),g=R(1,2),miss=AL[s+g],word=f(miss);
  // 3 wrong tiles: letters just outside the run (never one that is shown in it), topped up with others
  const wrong=[AL[s-1],AL[s+4],AL[s-2],AL[s+5]].filter(x=>x&&x!=miss);
  const fill=shuffle([...AL].filter(x=>!AL.slice(s,s+4).includes(x)&&!wrong.includes(x)));
  const tiles=shuffle([word,...[...new Set(wrong.concat(fill))].slice(0,3).map(f)]);
  const run=[0,1,2,3].map(k=>k==g?'<span class="ls" id="ls0"></span>':`<span class="ab-l">${f(AL[s+k])}</span>`).join('');
  const sp=[0,1,2,3].map(k=>k==g?'blank':AL[s+k]).join(', ');
  return{kind:'build',word,tiles,html:`<div class="lslots">${run}</div><div class="sub">Which letter is missing?</div>`,say:`Which letter is missing? ${sp}.`,auto:true,ans:word,
    hint:{k:'next'},label:`gap ${f(AL[s])}${g}`}}

// sound 3 (K): the middle vowel of a picture word. sound 4 (1st): digraph at the start or end of a picture word.
function genSoundB(lv){
  if(lv==3){
    const v=pick([...'aeiou']),[w,e]=pick(CVCM.filter(x=>x[0][1]==v)),mid=w[1]; // R-01r: each vowel as often as the others
    const opts=shuffle([mid,...shuffle([...'aeiou'].filter(x=>x!=mid)).slice(0,2)]);
    return{kind:'choice',cls:'syms',html:`<div class="emo">${picFor(w,e)}</div><div class="sub">Which vowel is in the middle?</div><div class="sent">${w[0]} ${SLOT} ${w[2]}</div>`,
      say:`${w}. Which vowel is in the middle of ${w}?`,auto:true,ans:mid,after:`${w}!`,choices:opts.map(x=>({l:x,v:x})),
      hint:{k:'say',w:`${w}... ${w}`,s:'Say it slowly. Listen to the sound in the middle.'},label:`middle: ${w}`}}
  const dg=pick(['sh','ch','th','ck','sh','ch','th','ck','wh']),[w,e,,pos]=pick(DIGR.filter(x=>x[2]==dg)),st=pos=='s';
  const pool=st?['sh','ch','th','wh']:['sh','ch','th','ck'];
  // R-01r: the word is spoken (Hear it replays it), never printed: printing it showed the answer letters
  return{kind:'choice',cls:'syms sym4',html:`<div class="emo">${picFor(w,e)}</div><div class="sub">Which letters ${st?'start':'end'} this word?</div>`,
    say:`${w}. Which letters ${st?'start':'end'} ${w}?`,auto:true,ans:dg,after:`${w}: ${dg}!`,choices:shuffle(pool).map(x=>({l:x,v:x})),
    hint:{k:'say',w:`${w}... ${w}`,s:`Two letters work together to make one sound. Listen to the ${st?'start':'end'} of ${w}.`},label:`${st?'starts':'ends'} ${dg}: ${w}`}}

// syl 1 (K): picture words, 1-3 claps. syl 2 (1st): printed words, 1-4 claps. Buttons show the number and that many clap stars.
function sylChoices(max){
  return Array.from({length:max},(_,i)=>({v:String(i+1),h:true,
    l:`<b>${i+1}</b><span class="clp">${ico('star','1em').repeat(i+1)}</span>`}))}
function genSyl(lv){
  if(lv==1){
    const n=R(1,3),[w,e]=pick(SYLP.filter(x=>x[2]==n));
    return{kind:'choice',cls:'syms clps',html:`<div class="emo">${picFor(w,e)}</div><div class="sub">How many claps in <b>${w}</b>?</div>`,say:`${w}. How many claps in ${w}?`,
      auto:true,ans:String(n),after:`${w} has ${n} ${n==1?'clap':'claps'}!`,choices:sylChoices(3),
      hint:{k:'say',w:`${w}... ${w}`,s:'Clap each beat as you say the word slowly.'},label:`claps: ${w}`}}
  const n=R(1,4),w=pick(SYLW[n-1]);
  return{kind:'choice',cls:'syms sym4 clps',html:`${HEARBTN(w)}<div class="sent">${esc(w)}</div><div class="sub">How many claps?</div>`,say:`${w}. How many claps in ${w}?`,
    auto:true,ans:String(n),after:`${w} has ${n} ${n==1?'clap':'claps'}!`,choices:sylChoices(4),
    hint:{k:'say',w:`${w}... ${w}`,s:'Clap each beat as you say the word slowly.'},label:`syllables: ${w}`}}

// ---- P2-18 phonics 1st-2nd ----
// pic 5-6 and build 5-6 (CURRICULUM E-phon): r-controlled vowels and vowel teams. sight 4-5 use genSight with DOL[3] and DOL[4].
// Wrong choices swap the r-vowel or team inside the same word: bird / bard / berd / burd.
function phonVariants(w,pair,pool){
  const i=w.indexOf(pair),endW=i+pair.length==w.length;
  const out=pool.filter(p=>p!==pair&&!(p=='oy'&&!endW&&!/^[aeiou]/.test(w.slice(i+pair.length)))&&!((p=='ou'||p=='oi')&&endW)) // oy ends a word or meets a vowel (toy, royal)
    .map(p=>w.slice(0,i)+p+w.slice(i+pair.length)).filter(x=>x!==w&&!BAD.test(x)&&!PHBAD.test(x)&&!RVW.concat(VTW).some(r=>r[0]===x)) // never another picture word of these levels
    .filter(x=>!ksBad(x,true)&&ksLegal(x)); // R-01r: the blocklist (coin never gives a slur) and English spelling rules
  return shuffle(out).slice(0,3)}
const phonList=lv=>lv==5?RVW:VTW,phonPool=lv=>lv==5?RVP:VTP;
function genPicP(lv){const [w,e,pr]=pick(phonList(lv));
  return{kind:'choice',html:`<div class="emo">${picFor(w,e)}</div><div class="sub">Which word is this?</div>`,say:'Which word is this?',after:w,ans:w,
    choices:shuffle([w,...phonVariants(w,pr,phonPool(lv))]).map(x=>({l:x,v:x})),
    hint:{k:'say',s:`Listen! Look for “${pr}” in the word.`,w},label:`read “${w}”`}}
function genBuildP(lv){const [w,e]=pick(phonList(lv));
  // two spare tiles: vowels that are not in the word first (they tempt a wrong r-vowel or team), then any other letter
  const V=shuffle([...'aeiou'].filter(c=>!w.includes(c))),O=shuffle([...'bcdfghklmnpstw'].filter(c=>!w.includes(c)));
  return{kind:'build',word:w,tiles:shuffle([...w,...[...V,...O].slice(0,2)]),
    html:`<div class="emo">${picFor(w,e)}</div><div class="lslots">${[...w].map((_,i)=>`<span class="ls" id="ls${i}"></span>`).join('')}</div>`,
    say:w,auto:true,ans:w,hint:{k:'next'},label:`spell “${w}”`}}

// ---- P2-24 sentences (sent 3-5) ----
// Level 3 unscramble (order), level 4 cloze (choice), level 5 picture sentence (choice wide) and story order (order).
// Each unscramble sentence carries a role string (D determiner, J adjective, N noun, V verb, A adverb or particle, P pronoun,
// M name, C is/are, Y very, X can/will/do, R preposition, O me/us/you, T to, F please, W question word). tools/test.js
// shuffles every sentence and proves that only the written order fits the role patterns, so there is one right order.
const SENT_UN=[
  ['The dog runs fast.','DNVA'],['The little bird flew away.','DJNVA'],['A red bus went by.','DJNVA'],['My hat is very big.','DNCYJ'],
  ['I see a red kite.','PVDJN'],['We like to play.','PVTV'],['I can jump high.','PXVA'],['She can run fast.','PXVA'],
  ['Ben has a new bike.','MVDJN'],['Mia sees a rainbow.','MVDN'],['They can see the stars.','PXVDN'],['He ate a big lunch.','PVDJN'],
  ['We sat on the rug.','PVRDN'],['The frog can hop far.','DNXVA'],['Dad made a big cake.','MVDJN'],['Please wash your hands.','FVDN'],
  ['Look at the moon!','VRDN'],['Put on your hat.','VADN'],['We are very happy.','PCYJ'],['Mom is very kind.','MCYJ'],
  ['Our class is fun.','DNCJ'],['The dog ran to me.','DNVRO'],['The bird sang for us.','DNVRO'],['They will come home.','PXVA'],
  ['I will help you.','PXVO'],['We can help Dad.','PXVM'],['She is my best friend.','PCDJN'],['It is a sunny day.','PCDJN'],
  ['The grass is green.','DNCJ'],['I love my red hat.','PVDJN'],['We have a new pet.','PVDJN'],['Birds can fly high.','NXVA'],
  ['Fish can swim fast.','NXVA'],['Can you see the sun?','XPVDN'],['Where is the cat?','WCDN'],['Is the sun hot?','CDNJ'],
  ['Do you like red hats?','XPVJN'],['What can you see?','WXPV'],['Where is my red hat?','WCDJN'],['Who can help me?','WXVO']];
// Cloze: [sentence with ___, right word, wrong word, wrong word]; the three words share a part of speech and only one fits.
const SENT_CL=[
  ['A ___ can bark and wag its tail.','dog','bird','fish'],['We use ___ to cut paper.','scissors','crayons','pillows'],
  ['A ___ gives us milk.','cow','hen','pig'],['Birds build a ___ in a tree.','nest','bed','boat'],
  ['I wear a ___ on my head when it is cold.','hat','shoe','glove'],['We read a ___ at bedtime.','book','rock','spoon'],
  ['The warm ___ shines on us at noon.','sun','snow','rain'],['A fish lives in the ___.','water','tree','barn'],
  ['We drink ___ when we are thirsty.','water','sand','glue'],['A baby cow is called a ___.','calf','chick','cub'],
  ['You can ride a ___ on the road.','bus','boat','plane'],['I put on my ___ to keep my feet warm.','socks','hats','belts'],
  ['The ___ hops and says ribbit.','frog','cow','duck'],['A ___ has a long trunk.','elephant','rabbit','turtle'],
  ['We eat soup with a ___.','spoon','sock','chair'],['The teacher wrote on the ___.','board','tree','pond'],
  ['Fish ___ in the sea.','swim','climb','bark'],['Birds can ___ in the sky.','fly','bark','dig'],
  ['We ___ our teeth every day.','brush','kick','bake'],['Mom will ___ a cake for the party.','bake','ride','hop'],
  ['I ___ with my eyes.','see','hear','taste'],['She ___ the ball to her friend.','threw','ate','slept'],
  ['The baby will ___ in her bed tonight.','sleep','swim','drive'],['Please ___ the door when you come in.','close','sing','hop'],
  ['The cat likes to ___ on the sofa.','sit','fly','bark'],['Ice is very ___.','cold','hot','sweet'],
  ['A feather is ___.','light','heavy','loud'],['The soup is too ___ to eat, so I blow on it.','hot','cold','short'],
  ['The elephant is very ___.','big','tiny','thin'],['It is ___ outside, so we need coats.','cold','hot','dry'],
  ['A turtle is ___, but a rabbit is fast.','slow','quick','loud'],['The night sky is dark, but the sun is ___.','bright','dark','sad'],
  ['I feel ___ when I get a gift.','happy','angry','sick'],['The two dogs ___ happy.','are','is','am'],
  ['My sister ___ six years old.','is','are','am'],['I ___ a little frog.','am','is','are'],
  ['We ___ going to the park.','are','is','am'],['Yesterday we ___ to the zoo.','went','go','going'],
  ['Every day my dad ___ to work.','goes','go','going'],['Yesterday it ___ all day.','rained','rain','raining']];
// Level 5 stories: three sentences in the right order (a cue word or a thing that must happen first makes it one order).
const SENT_ST=[
  ['First, Mia got a seed.','Next, she put it in the dirt.','At last, a flower grew.'],
  ['First, Ana got a bowl.','Then, she added the milk.','Last, she ate her cereal.'],
  ['First, we got in the car.','Next, we drove to the lake.','Last, we went for a swim.'],
  ['At first, the sky was gray.','Then it began to rain.','Later, a rainbow came out.'],
  ['First, Sam made a card.','Then he drew a star on it.','Last, he gave it to Gran.'],
  ['First, the pup was asleep.','Then it heard a noise.','Last, it jumped up and ran.'],
  ['Dad put the bread in the toaster.','The toast popped up.','Dad ate the toast with jam.'],
  ['Mia put on her coat.','She went out in the snow.','She came inside and drank hot milk.'],
  ['Ben filled the tub with water.','He got in the tub.','He washed with soap.'],
  ['I put on my shoes.','I walked to school.','I sat at my desk.'],
  ['We planted a seed.','We gave it water.','Soon a tall plant grew.'],
  ['Tom got a ball.','He kicked it hard.','It flew over the fence.']];
// Nouns safe to show in pictures: one clear picture, no look-alikes.
const SENT_PIC=['dog','cat','pig','hen','fox','frog','duck','fish','crab','ship','bus','truck','bell','drum','hat','sock','gift','flag','tent','clock','star','egg','bed','cup','bag'];
const SENT_TPL=['The {a} is by the {b}.','The {a} is next to the {b}.','I see the {a} and the {b}.'];
function sentOrder(items,ans,say,hint,label){
  let it=shuffle(items);for(let t=0;t<9&&it.every((x,i)=>x.v===ans[i]);t++)it=shuffle(items); // never hand over the right order
  return{kind:'order',html:`<div class="sub">${say.html}</div>`,say:say.say,items:it,ans,hint,label,after:ans.join(' ')}}
function genSentUn(){
  const [s]=pick(SENT_UN),ws=s.split(' ');
  return sentOrder(ws.map(w=>({v:w,l:w})),ws,{html:'Tap the words to make a sentence',say:'Tap the words in the right order to make a sentence.'},
    {k:'text',s:`Start with the word that has a capital letter: “${ws[0]}”. The last word has the end mark.`},`unscramble “${s}”`)}
function genSentCl(){
  const [s,a,x,y]=pick(SENT_CL),[pre,post]=s.split('___'),full=s.replace('___',a);
  return{kind:'choice',html:`<div class="sent">${words(pre.trim())} ${SLOT}${/^[.,!?]/.test(post)?"":" "}${words(post.trim())}</div><div class="sub">Which word fits?</div>`,
    say:`${s.replace('___','blank')} Which word fits?`,ans:a,after:full,choices:shuffle([a,x,y]).map(w=>({l:w,v:w})),
    hint:{k:'text',s:'Read the sentence with each word in the blank. Which one makes sense?'},label:`gap “${a}”: ${s}`.slice(0,58)}}
function genSentPic(){
  const P=SENT_PIC.map(w=>NOUNS.find(n=>n[0]==w)).filter(Boolean),[a,b,c,d]=shuffle(P),tp=pick(SENT_TPL);
  const mk=(x,y)=>tp.replace('{a}',x[0]).replace('{b}',y[0]),ans=mk(a,b);
  return{kind:'choice',cls:'wide',html:`<div class="emo">${picFor(a[0],a[1])} ${picFor(b[0],b[1])}</div><div class="sub">Which sentence tells about the pictures?</div>`,
    say:'Look at the pictures. Which sentence tells about them?',ans,after:ans,choices:shuffle([ans,mk(a,c),mk(d,b)]).map(x=>({l:x,v:x})),
    hint:{k:'text',s:`Look at both pictures: ${a[0]} and ${b[0]}. Pick the sentence that names both.`},label:`pictures “${ans}”`}}
function genSentStory(){
  const st=pick(SENT_ST);
  return sentOrder(st.map(x=>({v:x,l:'<span class="sl">'+esc(x)+'</span>',h:true})),st,{html:'Tap the sentences in the order they happen',say:'Tap the sentences in the order they happen, to tell the story.'},
    {k:'text',s:'What happens first? What happens last? Look for words like First, Then and Last.'},`story “${st[0]}”`.slice(0,58))}
function genSentB(lv){return lv==3?genSentUn():lv==4?genSentCl():coin()?genSentPic():genSentStory()}
/* ---------- mid-grade math generators (P2-05: Multiply Mountain, CURRICULUM M-3a) ----------
   arr 2        arrays: pick the multiplication sentence, or the swapped fact (4 x 6 = 6 x ?)
   mfact 1-4    multiplication facts, by key factor, then all of them (level 4 adds missing factors)
   dfact 1-4    division facts (dividend = divisor x answer), level 4 adds missing numbers
   mbig 1       one digit times a multiple of 10 or 100
   story 5      one-step multiply or divide word problems within 100 (levels 1-3 stay in genStory, 30-gen-math.js)
   Levels arr 1 and story 4 belong to P2-04 (Treasure Bay). Until that ships, arr 1 asks like arr 2 and story 4 like story 5. */

const MF_KEYS = [[0, 1, 2, 5, 10], [3, 4], [6, 7, 8, 9]]; // key factors taught at mfact levels 1, 2, 3
const DF_KEYS = [[1, 2, 5, 10], [3, 4], [6, 7, 8, 9]];    // divisors taught at dfact levels 1, 2, 3

// One fact question. op is '×' or '÷'; blank is the part the child types ('a', 'b' or 'c').
function facQ(a, op, b, c, blank, vert, hint) {
  const v = {a, b, c}, f = k => k === blank ? SLOT : v[k];
  const html = vert && op == '×' && blank == 'c'
    ? `<div class="veq"><div>${a}</div><div><span class="op">${op}</span>${b}</div><div class="bar"></div><div>${SLOT}</div></div>`
    : `<div class="eq">${f('a')} ${op} ${f('b')} = ${f('c')}</div>`;
  const w = op == '×' ? 'times' : 'divided by', sw = k => k === blank ? 'what' : v[k];
  return {kind: 'num', html, say: `${sw('a')} ${w} ${sw('b')} equals ${sw('c')}?`, ans: String(v[blank]), hint,
    label: `${blank == 'a' ? '?' : a} ${op} ${blank == 'b' ? '?' : b} = ${blank == 'c' ? '?' : c}`};
}

// Hint for a times fact: skip-count row, or a neighbour fact for the hard 6-9 facts.
function mfHint(a, b) {
  const x = Math.max(a, b), y = Math.min(a, b);
  if (y == 0) return {k: 'text', s: 'Zero groups, or groups of zero. How many is that?'};
  if (y == 1) return {k: 'text', s: `Just one group of ${x}. How many is that?`};
  if (y <= 5 || x == 10) {
    const row = Array.from({length: y - 1}, (_, i) => x * (i + 1)).join(', ');
    return {k: 'text', s: `Skip count by ${x}s, ${y} times: ${row}, ?`};
  }
  return {k: 'text', s: `Use a fact you know: ${y} × ${x - 1} = ${y * (x - 1)}. One more ${y} makes ${y} × ${x}.`};
}

function genMfact(lv) {
  if (lv > 1 && lv < 4 && rnd() < .2) lv = R(1, lv - 1); // 20% review of the easier levels
  let a, b;
  if (lv == 4 && rnd() < .35) { // missing factor: 6 × ? = 42 (both factors at least 2, so the answer is the only one)
    a = R(2, 10); b = R(2, 10);
    const blank = coin() ? 'b' : 'a', known = blank == 'b' ? a : b;
    return facQ(a, '×', b, a * b, blank, false, {k: 'text', s: `Think: ${known} times what makes ${a * b}? Count by ${known}s.`});
  }
  if (lv == 1) { // R-01m: times 0 is one rule, so it comes 1 time in 12 (it was more than 1 in 4)
    if (rnd() < 1 / 12) {a = 0; b = R(0, 10)} else {a = pick([1, 2, 5, 10]); b = R(1, 10)}
  }
  else if (lv == 2) {a = pick(MF_KEYS[1]); b = R(0, 10)}
  else if (lv == 3) {a = pick(MF_KEYS[2]); b = R(2, 10)}
  else {a = R(0, 10); b = R(0, 10)}
  if (coin()) [a, b] = [b, a];
  return facQ(a, '×', b, a * b, 'c', coin(), mfHint(a, b));
}

function genDfact(lv) {
  const d = pick(lv < 4 ? DF_KEYS[lv - 1] : [2, 3, 4, 5, 6, 7, 8, 9, 10]), q = R(1, 10), n = d * q;
  if (lv == 4 && rnd() < .35) {
    if (coin()) return facQ(n, '÷', d, q, 'a', false, {k: 'text', s: `Think: ${d} times ${q} makes the number we want. What is it?`});
    return facQ(n, '÷', d, q, 'b', false, {k: 'text', s: `Think: what times ${q} makes ${n}?`});
  }
  return facQ(n, '÷', d, q, 'c', false, {k: 'text', s: `Think: ${d} times what makes ${n}?`});
}

function genMbig(lv) {
  const a = R(2, 9), t = R(1, 9), tens = coin(), b = t * (tens ? 10 : 100);
  const hint = {k: 'text', s: `Do ${a} × ${t} first. Then add ${tens ? 'one zero' : 'two zeros'} on the end.`};
  if (coin()) return facQ(a, '×', b, a * b, 'c', true, hint);
  const q = facQ(b, '×', a, a * b, 'c', coin(), hint); // big number first: 40 × 6
  return q;
}

// Arrays: the multiplication sentence, or the swapped fact.
function genArr(lv) {
  const r = R(2, 6);
  let c = R(2, 9);
  if (c == r) c = c == 9 ? 8 : c + 1;
  if (coin()) { // swapped fact: r rows of c dots, r × c = c × ?
    return {kind: 'num', html: `${VIZ.array(r, c)}<div class="eq" style="font-size:.7em">${r} × ${c} = ${c} × ${SLOT}</div>`,
      say: `${r} times ${c} equals ${c} times what?`, ans: String(r), label: `${r} × ${c} = ${c} × ?`,
      hint: {k: 'text', s: `Turn the array on its side. ${c} rows of ${r}. How many dots in each row now?`}};
  }
  const sent = [`${r} × ${c} = ${r * c}`, `${r} + ${c} = ${r + c}`, `${r + 1} × ${c} = ${(r + 1) * c}`, `${r} × ${r} = ${r * r}`];
  const seen = new Set(), ch = [];
  for (const s of sent) if (!seen.has(s)) {seen.add(s); ch.push({l: s, v: s})}
  return {kind: 'choice', html: `${VIZ.array(r, c)}<div class="sub">Which sentence matches the array?</div>`,
    say: `There are ${r} rows of ${c} dots. Which sentence matches the array?`, ans: sent[0], choices: shuffle(ch),
    hint: {k: 'text', s: `Count the rows: ${r}. Count the dots in one row. Rows times dots in a row.`}, label: `array ${r} × ${c}`};
}

// One-step times or divide stories within 100: equal groups, arrays, sharing (4 templates each).
function genStoryMul(lv) {
  const me = S.name || 'Sam', n2 = pick([S.buddy, S.buddy, petN(), ...NAMES].filter(n => n && n !== me));
  const th = pick(THINGS)[0], who = pick([me, n2]);
  let t, ans, hint, label;
  if (coin()) { // times: a groups of b
    const a = R(2, 9), b = R(2, Math.min(10, Math.floor(100 / a)));
    t = pick([
      `${who} has ${a} bags. Each bag has ${b} ${th}. How many ${th} in all?`,
      `${who} puts ${th} in ${a} rows. There are ${b} in each row. How many ${th} in all?`,
      `${a} friends each get ${b} ${th}. How many ${th} do they have all together?`,
      `A box holds ${b} ${th}. ${who} has ${a} boxes. How many ${th} does ${who} have?`]);
    ans = a * b; label = `story ${a} × ${b}`;
    hint = {k: 'text', s: `Make ${a} groups of ${b}. Count by ${b}s, ${a} times.`};
  } else { // divide: n shared into d groups
    const d = R(2, 10), q = R(2, Math.min(10, Math.floor(100 / d))), n = d * q;
    t = pick([
      `${n} ${th} are shared equally by ${d} friends. How many ${th} does each friend get?`,
      `${who} puts ${n} ${th} into bags, ${d} in each bag. How many bags is that?`,
      `There are ${n} ${th} in ${d} equal rows. How many ${th} are in each row?`,
      `${who} has ${n} ${th} and makes ${d} equal groups. How many ${th} are in each group?`]);
    ans = q; label = `story ${n} ÷ ${d}`;
    hint = {k: 'text', s: `Think: ${d} times what makes ${n}?`};
  }
  return {kind: 'num', html: `<p class="story">${words(t)}</p><div>${SLOT}</div>`, say: t, auto: true, ans: String(ans), hint, label};
}
const genStoryAll = lv => lv <= 3 ? genStory(lv) : genStoryMul(lv);

// ---- P2-06 fractions core ----
/* Fractions, CURRICULUM M-frac: frac 2-8 (frac 1 is the grade-1 halves and fourths level from P2-03, in 31-gen-math-early.js).
   frac 2  name the shaded fraction (bar or circle), or pick the picture for a named fraction
   frac 3  number line 0 to 1 (sometimes 0 to 2): tap the point, or read the marked point
   frac 4  compare with bars: same bottom number or same top number
   frac 5  equivalent fractions: 1/2 = ?/8, or which fraction equals 2/3 (bars shown)
   frac 6  compare unlike fractions, no picture (benchmark 1/2 or a common bottom number)
   frac 7  simplest form (GCF 2 to 6, bottom number up to 48)
   frac 8  mixed numbers and improper fractions, both ways
   Stops for levels 2-5 are in Fraction Forest (m_frac). Levels 6-8 have no stop until P2-10 (Decimal Desert); they are listed
   as RESERVED in the "every level is reachable" check of tools/test.js. */

const fcGcd = (a, b) => b ? fcGcd(b, a % b) : a;
const fcLcm = (a, b) => a / fcGcd(a, b) * b;
// stacked fraction as HTML (numerator over a bar over denominator); a or b may be a SLOT
const fcFr = (a, b) => `<span class="fr"><span class="fn">${a}</span><span class="fd">${b}</span></span>`;
const FC_NAMES = ['', 'whole', 'half', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth'];
// spoken: "3 fourths", "1 half", "2 halves"
const fcSay = (n, d) => d == 2 && n != 1 ? `${n} halves` : `${n} ${FC_NAMES[d]}${n == 1 ? '' : 's'}`;
const fcPl = d => (d == 2 ? 'halves' : FC_NAMES[d] + 's'); // R-01m: "how many halves", never "halfs"
const FC_SYM = [{v: '<', l: '<'}, {v: '=', l: '='}, {v: '>', l: '>'}];
const fcCmp = (n1, d1, n2, d2) => n1 * d2 < n2 * d1 ? '<' : n1 * d2 == n2 * d1 ? '=' : '>';
const fcHintBars = (n, d) => ({k: 'html', html: `${VIZ.fracBar(n, d, {unit: true, w: 240})}<div>${n} of the ${d} equal parts are shaded.</div>`,
  w: `${n} of the ${d} equal parts are shaded.`});

// level 2: name the fraction that is shaded, or choose the picture that shows a named fraction
function fracName() {
  const d = pick([2, 3, 4, 6, 8]), n = R(1, d - 1);
  if (rnd() < .6) {
    const circle = coin(), pic = circle ? VIZ.fracCircle(n, d) : VIZ.fracBar(n, d);
    return {kind: 'num', pad: 'frac', html: `${pic}<div class="sub">What fraction is shaded?</div><div class="eq">${SLOT_FRAC}</div>`,
      say: `The shape has ${d} equal parts. What fraction is shaded?`, ans: `${n}/${d}`, hint: fcHintBars(n, d),
      label: `frac ${n}/${d} ${circle ? 'circle' : 'bar'}`};
  }
  // three pictures, no two equal in value
  const opts = [[n, d]];
  const cand = shuffle([[R(1, d - 1), d], [R(1, d - 1), d], [n, pick([2, 3, 4, 6, 8])], [R(1, 7), pick([2, 3, 4, 6, 8])]]);
  for (const [a, b] of cand) {
    if (opts.length < 3 && a < b && opts.every(([x, y]) => x * b != a * y)) opts.push([a, b]);
  }
  for (const [a, b] of [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 6], [5, 6], [1, 8]]) { // fill up from a fixed list
    if (opts.length < 3 && opts.every(([x, y]) => x * b != a * y)) opts.push([a, b]);
  }
  return {kind: 'choice', html: `<div class="sub">Which picture shows</div><div class="eq">${fcFr(n, d)}</div>`,
    say: `Which picture shows ${fcSay(n, d)}?`, ans: `${n}/${d}`, cls: 'wide',
    choices: shuffle(opts.map(([a, b]) => ({v: `${a}/${b}`, l: VIZ.fracBar(a, b, {w: 200}), h: true}))),
    hint: {k: 'text', s: `The bottom number ${d} says how many equal parts. The top number ${n} says how many are shaded. Count the parts in each picture.`},
    label: `frac pic ${n}/${d}`};
}

// level 3: number line from 0 to 1 (or to 2): tap the point, or read the marked point
function fracLine() {
  if (rnd() < .35) { // tap: at most 6 points so every target is 48 px wide
    const d = pick([2, 3, 4, 5]), n = R(1, d - 1);
    const taps = Array.from({length: d + 1}, (_, k) => k / d);
    return {kind: 'tap', html: `<div class="sub">Tap the point for</div><div class="eq">${fcFr(n, d)}</div>`
        + VIZ.numLine({max: 1, step: 1 / d, den: d, labels: [0, 1], tapValues: taps}),
      say: `Tap the point for ${fcSay(n, d)} on the number line.`, ans: String(n / d), ansSay: fcSay(n, d),
      hint: {k: 'text', s: `The line from 0 to 1 is cut into ${d} equal jumps. Start at 0 and count ${n} jump${n == 1 ? '' : 's'}.`},
      label: `frac tap ${n}/${d}`};
  }
  const two = rnd() < .25, d = two ? pick([2, 3, 4]) : pick([2, 3, 4, 5, 6, 8]);
  let n = R(1, d - 1);
  if (two) {n = R(1, 2 * d - 1); if (n == d) n = d + 1}
  const max = two ? 2 : 1;
  return {kind: 'num', pad: 'frac', eq: 'value',
    html: `${VIZ.numLine({max, step: 1 / d, den: d, labels: Array.from({length: max + 1}, (_, k) => k), marks: [n / d]})}`
      + `<div class="sub">What fraction is marked?</div><div class="eq">${SLOT_FRAC}</div>`,
    say: `The line from 0 to ${max} is cut into ${d * max} equal jumps. What fraction is marked?`, ans: `${n}/${d}`,
    hint: {k: 'text', s: `Count the jumps from 0 to the dot. That is the top number. Each jump is ${fcSay(1, d)}, so the bottom number is ${d}.`},
    label: `frac read ${n}/${d}${two ? ' to 2' : ''}`};
}

// level 4: compare with bars, same bottom number or same top number
function fracCompare() {
  let n1, d1, n2, d2, hint;
  if (coin()) { // same denominator
    d1 = d2 = R(3, 8); n1 = R(1, d1 - 1);
    do n2 = R(1, d1 - 1); while (n2 == n1);
    hint = {k: 'text', s: 'The parts are the same size. Which fraction has more parts shaded?'};
  } else { // same numerator: more parts means smaller parts
    n1 = n2 = R(1, 5);
    d1 = R(n1 + 1, 8);
    do d2 = R(n1 + 1, 8); while (d2 == d1);
    hint = {k: 'text', s: `Both have ${n1} part${n1 == 1 ? '' : 's'}. Look at the bars: when the bottom number is bigger, each part is smaller.`};
  }
  const ans = fcCmp(n1, d1, n2, d2);
  return {kind: 'choice', cls: 'syms', html: `${VIZ.fracBar(n1, d1, {w: 220})}${VIZ.fracBar(n2, d2, {w: 220})}`
      + `<div class="eq">${fcFr(n1, d1)} ${SLOT} ${fcFr(n2, d2)}</div>`,
    say: `Is ${fcSay(n1, d1)} less than, equal to, or greater than ${fcSay(n2, d2)}?`, ans, choices: FC_SYM.map(c => ({...c})), hint,
    label: `frac cmp ${n1}/${d1} ? ${n2}/${d2}`};
}

// level 5: equivalent fractions
function fracEquiv() {
  const d = R(2, 6), n = R(1, d - 1), m = R(2, Math.min(4, Math.floor(12 / d))), D = d * m;
  const hint = {k: 'html', html: `${VIZ.fracBar(n, d, {w: 220})}${VIZ.fracBar(n * m, D, {w: 220})}<div>Cut every part into ${m} smaller parts. `
      + `Multiply the top and the bottom by ${m}.</div>`, w: `Multiply the top and the bottom by ${m}.`};
  if (rnd() < .55) {
    const pic = coin() ? `${VIZ.fracBar(n, d, {w: 220})}${VIZ.fracBar(n * m, D, {w: 220})}` : '';
    return {kind: 'num', html: `${pic}<div class="eq">${fcFr(n, d)} = ${fcFr(SLOT, D)}</div>`,
      say: `${fcSay(n, d)} equals how many ${fcPl(D)}?`, ans: String(n * m), hint, label: `frac eq ${n}/${d} = ?/${D}`};
  }
  const seen = new Set([`${n * m}/${D}`]), opts = [[n * m, D]];
  const bad = shuffle([[n + m, d + m], [n * m, D + m], [n * m + 1, D], [n + m, D], [n, D], [n * m, d + m]]);
  for (const [a, b] of bad) {
    if (opts.length < 3 && b <= 12 && a < b && a * d != n * b && !seen.has(`${a}/${b}`)) {seen.add(`${a}/${b}`); opts.push([a, b])}
  }
  return {kind: 'choice', cls: 'syms', html: `${VIZ.fracBar(n, d, {w: 220})}<div class="sub">Which fraction is equal to</div><div class="eq">${fcFr(n, d)}</div>`,
    say: `Which fraction is equal to ${fcSay(n, d)}?`, ans: `${n * m}/${D}`,
    choices: shuffle(opts.map(([a, b]) => ({v: `${a}/${b}`, l: fcFr(a, b), h: true}))), hint,
    label: `frac which ${n}/${d} = ${n * m}/${D}`};
}

// level 6: compare unlike fractions, no picture
function fracUnlike() {
  let n1, d1, n2, d2;
  if (rnd() < .15) { // equal fractions with different bottoms
    d1 = R(2, 6); n1 = R(1, d1 - 1);
    const m = R(2, Math.floor(12 / d1));
    n2 = n1 * m; d2 = d1 * m;
    if (coin()) [n1, d1, n2, d2] = [n2, d2, n1, d1];
  } else {
    do {
      d1 = R(2, 12); d2 = R(2, 12); n1 = R(1, d1 - 1); n2 = R(1, d2 - 1);
    } while (d1 == d2 || n1 == n2 || n1 * d2 == n2 * d1);
  }
  const ans = fcCmp(n1, d1, n2, d2), L = fcLcm(d1, d2);
  const half = (n, d) => 2 * n < d ? -1 : 2 * n > d ? 1 : 0;
  let s, hint;
  if (half(n1, d1) * half(n2, d2) == -1) {
    s = `Think about one half. ${n1}/${d1} is ${half(n1, d1) < 0 ? 'less' : 'more'} than a half and ${n2}/${d2} is ${half(n2, d2) < 0 ? 'less' : 'more'} than a half.`;
    hint = {k: 'text', s};
  } else {
    hint = stepsCommonDen(n1, d1, n2, d2, 'cmp'); // P2-10: step hint (common bottom, rename both, compare the tops)
  }
  return {kind: 'choice', cls: 'syms', html: `<div class="sub">Which is true?</div><div class="eq">${fcFr(n1, d1)} ${SLOT} ${fcFr(n2, d2)}</div>`,
    say: `Is ${fcSay(n1, d1)} less than, equal to, or greater than ${fcSay(n2, d2)}?`, ans, choices: FC_SYM.map(c => ({...c})),
    hint, label: `frac cmp2 ${n1}/${d1} ? ${n2}/${d2}`};
}

// level 7: simplest form (the answer is typed exactly: 12/18 -> 2/3)
function fracSimplest() {
  let a, b, g;
  do {
    g = R(2, 6); b = R(2, Math.floor(48 / g)); a = R(1, b - 1);
  } while (fcGcd(a, b) != 1);
  const n = a * g, d = b * g;
  return {kind: 'num', pad: 'frac', html: `<div class="sub">Write in simplest form</div><div class="eq">${fcFr(n, d)} = ${SLOT_FRAC}</div>`,
    say: `Write ${n} over ${d} in simplest form.`, ans: `${a}/${b}`,
    hint: {k: 'text', s: `Find a number that goes into both ${n} and ${d}. Divide the top and the bottom by it. Stop when only 1 goes into both.`},
    label: `frac simplest ${n}/${d}`};
}

// level 8: mixed numbers and improper fractions, both ways
function fracMixed() {
  let d, n;
  do {d = R(2, 12); n = R(1, d - 1)} while (fcGcd(n, d) != 1);
  const w = R(1, 5), top = w * d + n;
  if (coin()) {
    return {kind: 'num', html: `<div class="eq">${w} ${fcFr(n, d)} = ${fcFr(SLOT, d)}</div>`,
      say: `${w} and ${fcSay(n, d)} equals how many ${fcPl(d)}?`, ans: String(top),
      hint: {k: 'text', s: `Each whole is ${d} ${fcPl(d)}. ${qN(w, 'whole')} ${w == 1 ? 'makes' : 'make'} ${w * d}. Then add the ${n} more.`}, label: `frac to improper ${w} ${n}/${d}`};
  }
  return {kind: 'num', pad: 'frac', sep: 'mix', html: `<div class="sub">Write as a mixed number</div><div class="eq">${fcFr(top, d)} = ${SLOT_MIX}</div>`,
    say: `Write ${top} over ${d} as a whole number and a fraction.`, ans: `${w} ${n}/${d}`,
    hint: {k: 'text', s: `How many groups of ${d} fit in ${top}? That is the whole number. What is left over is the top of the fraction.`},
    label: `frac to mixed ${top}/${d}`};
}

// frac 1 (halves and fourths) belongs to P2-03; until it ships, level 1 asks like level 2
function genFracCore(lv) {
  if (lv <= 2) return fracName();
  return [null, null, null, fracLine, fracCompare, fracEquiv, fracUnlike, fracSimplest, fracMixed][lv]();
}

// ---- P2-07 Fraction Forest (3rd) ----
/* CURRICULUM M-3b: the other stops of Fraction Forest (m_frac), all written with the prefix ff.
   round 1-2   round to the nearest 10 / 100          sub 6-7    3-digit subtraction with regrouping, across zeros
   time 5-6    clock to the minute, elapsed time      geo 1-2    perimeter, area of rectangles
   shape 5     classify polygons                      data 3     scaled bar graphs and picture graphs
   meas 4      ruler to 1/4 inch, mass and volume     story 6    two-step stories with all four operations
   Levels that belong to P2-04 (Treasure Bay: sub 5, time 4, data 2, meas 3) have no stop yet; until it ships they ask like the next
   level up, and tools/test.js lists them as RESERVED. Seeded randomness only (R, pick, shuffle, coin, rnd). */

const ffComma = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const ffHH = x => ((x % 12) + 11) % 12 + 1; // hour on a clock face: 0 -> 12, 13 -> 1
const ffSayT = (h, m) => m == 0 ? `${h} o'clock` : m < 10 ? `${h} oh ${m}` : `${h} ${m}`;
const FF_UNIT = {cm: 'centimeters', m: 'meters', in: 'inches', ft: 'feet'};
const FF_UNIT1 = {cm: 'centimeter', m: 'meter', in: 'inch', ft: 'foot'}; // R-01m: "1 centimeter wide"
const FF_SQ = {cm: 'square cm', m: 'square m', in: 'square in', ft: 'square ft'};
// n distinct values from a candidate list, never the answer
const ffOthers = (cand, ans, n) => {
  const out = [];
  for (const c of shuffle(cand)) if (c != ans && !out.includes(c) && out.length < n) out.push(c);
  return out;
};

// round 1: nearest 10 (2- and 3-digit); round 2: nearest 100 (3- and 4-digit). The hint is a number line between the two neighbours.
// R-01m: the rule names exactly halfway (135 rounds up to 140), so following the hint always gives the answer
const FF_HALF = 'Halfway or more? Round up. Less than halfway? Round down.';
function ffRound(lv) {
  const p = lv == 1 ? 10 : 100;
  let n;
  if (lv == 1) do n = rnd() < .5 ? R(11, 99) : R(101, 999); while (n % 10 == 0);
  else do n = rnd() < .45 ? R(101, 999) : R(1001, 9949); while (n % 100 == 0);
  const lo = Math.floor(n / p) * p, hi = lo + p, ans = Math.floor((n + p / 2) / p) * p;
  return {kind: 'num', html: `<div class="sub">Round ${ffComma(n)} to the nearest ${p}.</div><div class="eq">${SLOT}</div>`,
    say: `Round ${n} to the nearest ${p}.`, ans: String(ans), label: `round ${n} to ${p}`,
    hint: {k: 'html', html: `${VIZ.numLine({min: lo, max: hi, step: p / 10, labels: [lo, hi], marks: [n]})}`
      + `<div>${ffComma(n)} is between ${ffComma(lo)} and ${ffComma(hi)}. Halfway is ${ffComma(lo + p / 2)}. ${FF_HALF}</div>`,
      w: `${n} is between ${lo} and ${hi}. Halfway is ${lo + p / 2}. ${FF_HALF}`}};
}

// sub 6: 3-digit - 3-digit, regrouping in one or two places, no zeros in the top number (vertical)
function ffSub6() {
  let a1, a2, a3, b1, b2, b3, a, b, first, borrows;
  for (;;) {
    a1 = R(1, 9); a2 = R(1, 9); a3 = R(2, 9); b1 = R(0, 9); b2 = R(0, 9); b3 = R(1, a3);
    a = a3 * 100 + a2 * 10 + a1; b = b3 * 100 + b2 * 10 + b1;
    if (a <= b) continue;
    let t = a2;
    first = '';
    borrows = 0;
    if (a1 < b1) {first = `${a1} is too small for ${b1}. Borrow a ten: ${a1 + 10} − ${b1} = ${a1 + 10 - b1}.`; t--; borrows++}
    if (t < b2) {if (!first) first = `${qN(t, 'ten')} is too small for ${qN(b2, 'ten')}. Borrow a hundred: ${t + 10} − ${b2} = ${t + 10 - b2} tens.`; borrows++}
    if (borrows >= 1 && borrows <= 2) break;
  }
  return mathQ(a, '-', b, a - b, 'c', true, {hint: {k: 'text', s: `${first} Then do the other columns, one at a time.`}});
}

// sub 7: subtract across zeros: X00, X0Y, or 1,000 on top
function ffSub7() {
  const f = rnd(), X = R(2, 9);
  let a, b, s;
  if (f < .4) {
    a = X * 100;
    do b = R(101, a - 1); while (b % 10 == 0); // a ones digit, so the borrow runs across both zeros
    s = `${a} is ${X} hundreds, 0 tens, 0 ones. Take 1 hundred: ${qN(X - 1, 'hundred')} and 10 tens. Take 1 ten: 9 tens and 10 ones. Now subtract each column.`;
  } else if (f < .85) {
    const Y = R(1, 8);
    a = X * 100 + Y;
    do b = R(100, a - 1); while (b % 10 <= Y);
    s = `${qN(Y, 'one')} is too small, and the tens place is 0. Borrow from the hundreds: ${qN(X - 1, 'hundred')} and 10 tens. Then borrow a ten: 9 tens and ${Y + 10} ones.`;
  } else {
    a = 1000;
    do b = R(101, 999); while (b % 10 == 0);
    s = '1,000 is the same as 9 hundreds, 9 tens and 10 ones. Now subtract each column.';
  }
  return mathQ(a == 1000 ? '1,000' : a, '-', b, a - b, 'c', true, {hint: {k: 'text', s}});
}

// time 5: clock to the minute -> digital (4 choices); half of the items go the other way: digital -> pick the clock
function ffTime5() {
  const h = R(1, 12), m = R(0, 59), ans = tstr(h, m);
  const sw = [ffHH(Math.round(m / 5) || 12), h * 5 % 60]; // the two hands read the wrong way round
  const pairs = [[h, (m + 5) % 60], [h, (m + 55) % 60], [ffHH(h + 1), m], [ffHH(h - 1), m], sw];
  const fine = [[h, (m + 1) % 60], [h, (m + 59) % 60]]; // one minute off: only for the digital choices
  if (coin()) {
    const far = pairs.filter(p => p[0] != h || Math.min(Math.abs(p[1] - m), 60 - Math.abs(p[1] - m)) >= 5); // clocks must look different
    const bad = ffOthers(far.map(p => tstr(p[0], p[1])), ans, 3);
    const ch = [ans, ...bad].map(x => {const [hh, mm] = x.split(':').map(Number); return {v: x, l: VIZ.clock(hh, mm), h: true}});
    return {kind: 'choice', cls: 'ffc', html: `<div class="eq">${ans}</div><div class="sub">Which clock shows this time?</div>`,
      say: `Which clock shows ${ffSayT(h, m)}?`, ans, choices: shuffle(ch),
      hint: {k: 'text', s: `The long hand shows the minutes: count by 5s from the 12 to ${Math.floor(m / 5) * 5}${m % 5 ? `, then ${m % 5} more little marks` : ''}. The short hand shows the hour, ${h}.`},
      label: `clock5 pick ${ans}`};
  }
  const bad = ffOthers(pairs.concat(fine).map(p => tstr(p[0], p[1])), ans, 3);
  return {kind: 'choice', html: `${VIZ.clock(h, m)}<div class="sub">What time is it?</div>`, say: 'What time does the clock show?',
    ans, choices: shuffle([ans, ...bad].map(x => ({v: x, l: x}))),
    hint: {k: 'text', s: 'The short hand shows the hour. The long hand shows the minutes: count by 5s from the 12, then add the little marks.'},
    label: `clock5 read ${ans}`};
}

// time 6: elapsed time (clocks or digital times, answer in minutes up to 120), or "what time will it be 45 minutes after 2:30?"
function ffTime6() {
  const form = pick(['clocks', 'digital', 'after', 'before']);
  const h = R(1, 12), m = 5 * (form == 'before' ? R(1, 11) : R(0, 11)), nh = tstr(ffHH(h + 1), 0), s = tstr(h, m);
  const base = (h % 12) * 60 + m, at = x => {const t = ((x % 720) + 720) % 720; return [ffHH(Math.floor(t / 60)), t % 60]};
  if (form == 'clocks' || form == 'digital') {
    const d = 5 * R(3, 24), [eh, em] = at(base + d), e = tstr(eh, em);
    const art = form == 'clocks'
      ? `<div class="ffrow"><div>${VIZ.clock(h, m)}<div>Start</div></div><div>${VIZ.clock(eh, em)}<div>End</div></div></div>`
      : `<div class="eq"><div>Start <b>${s}</b></div><div>End <b>${e}</b></div></div>`;
    const hint = m + d < 60 ? `Both times are in the same hour. Subtract the minutes: ${em} − ${m}.`
      : m + d == 60 ? `Count the minutes from ${s} up to the next hour, ${e}. How many minutes is that?`
      : m > 0 ? `From ${s} to ${nh} is ${60 - m} minutes. Then count the minutes from ${nh} to ${e}.`
      : `From ${s} to ${nh} is 60 minutes. Then count the minutes from ${nh} to ${e}.`;
    return {kind: 'num', html: `${art}<div class="sub">How many minutes passed?</div><div class="eq">${SLOT} minutes</div>`,
      say: `The time starts at ${ffSayT(h, m)} and ends at ${ffSayT(eh, em)}. How many minutes passed?`, ans: String(d),
      hint: {k: 'text', s: hint}, label: `time6 ${s} to ${e}`};
  }
  const d = 5 * R(2, 18), after = form == 'after', [ah, am] = at(base + (after ? d : -d)), ans = tstr(ah, am);
  const cand = [-60, -10, -5, 5, 10, 60, after ? -d : d].map(k => at(base + (after ? d : -d) + k)).map(p => tstr(p[0], p[1]));
  const bad = ffOthers(cand, ans, 3);
  let hint;
  if (after) hint = m + d < 60 ? `Stay in the same hour. Add the minutes: ${m} + ${d}.`
    : m > 0 && m + d == 60 ? `Count up from ${s} to the next hour. How many minutes is that?`
    : m > 0 ? `From ${s} to ${nh} is ${60 - m} minutes. Then add the ${d - (60 - m)} minutes that are left.`
    : `60 minutes make 1 hour. Add the hour first, then the ${d - 60} minutes that are left.`;
  else hint = d <= m ? `Stay in the same hour. Subtract the minutes: ${m} − ${d}.`
    : `Go back to ${tstr(h, 0)} first: that is ${m} minutes. Then go back ${d - m} more minutes.`;
  return {kind: 'choice', html: `<div class="sub">What time ${after ? 'will it be' : 'was it'} ${d} minutes ${after ? 'after' : 'before'}</div><div class="eq">${s}</div>`,
    say: `What time ${after ? 'will it be' : 'was it'} ${d} minutes ${after ? 'after' : 'before'} ${ffSayT(h, m)}?`, ans,
    choices: shuffle([ans, ...bad].map(x => ({v: x, l: x}))), hint: {k: 'text', s: hint}, label: `time6 ${d} ${form} ${s}`};
}

// A polygon of 3 to 6 sides, each side labelled outside (not drawn to scale)
function ffPoly(sides, unit) {
  const n = sides.length, cx = 130, cy = 100, r = 60, off = n % 2 ? 0 : Math.PI / n;
  const pt = (i, rr) => [cx + rr * Math.cos(-Math.PI / 2 + off + 2 * Math.PI * i / n), cy + rr * Math.sin(-Math.PI / 2 + off + 2 * Math.PI * i / n)];
  const P = sides.map((_, i) => pt(i, r)), fx = v => Math.round(v * 10) / 10;
  let lab = '';
  sides.forEach((v, i) => {
    const mid = pt(i + .5, r * Math.cos(Math.PI / n) + 24);
    lab += `<text x="${fx(mid[0])}" y="${fx(mid[1] + 5)}">${v}${unit ? ' ' + unit : ''}</text>`;
  });
  const body = `<path class="vpo" d="M${P.map(p => fx(p[0]) + ' ' + fx(p[1])).join('L')}z"/>${lab}`;
  return `<svg class="viz viz-poly" viewBox="0 0 260 200" style="--vw:260" role="img" aria-label="shape with side lengths">${body}</svg>`;
}

// geo 1: perimeter of rectangles (two sides given) and other polygons (every side given)
function ffGeo1() {
  const unit = pick(['cm', 'm', 'in', 'ft']), U = FF_UNIT[unit];
  if (rnd() < .4) {
    let w = R(1, 20), h = R(1, 20);
    if (w == h) h = h == 20 ? 19 : h + 1;
    return {kind: 'num', html: `${VIZ.rectSides(w, h, {w, h}, {unit})}<div class="sub">Find the perimeter of the rectangle.</div><div class="eq">${SLOT} ${unit}</div>`,
      say: `A rectangle is ${qN(w, FF_UNIT1[unit], U)} long and ${qN(h, FF_UNIT1[unit], U)} wide. What is the perimeter?`, ans: String(2 * (w + h)),
      hint: {k: 'html', html: `${VIZ.rectSides(w, h, {w, h}, {unit, all: true})}<div>A rectangle has two pairs of equal sides. Add all 4 sides: ${w} + ${h} + ${w} + ${h}.</div>`,
        w: `Add all 4 sides: ${w} plus ${h} plus ${w} plus ${h}.`}, label: `geo1 rect ${w}x${h} ${unit}`};
  }
  const n = R(3, 6), name = ['', '', '', 'triangle', 'shape with 4 sides', 'pentagon', 'hexagon'][n];
  let s;
  do s = Array.from({length: n}, () => R(1, 20)); while (n == 3 && (s[0] + s[1] <= s[2] || s[0] + s[2] <= s[1] || s[1] + s[2] <= s[0]) || s.every(x => x == 1));
  while (s[n - 1] == 1) s.unshift(s.pop()); // R-01m: the unit follows the last side, so it is never "1 meters" (the same polygon, turned)
  const sum = s.reduce((x, y) => x + y, 0);
  return {kind: 'num', html: `${ffPoly(s, unit)}<div class="sub">Find the perimeter of the ${name}.</div><div class="eq">${SLOT} ${unit}</div>`,
    say: `A ${name} has sides of ${s.join(', ')} ${U}. What is the perimeter?`, ans: String(sum),
    hint: {k: 'text', s: `The perimeter is the distance all the way around. Add every side: ${s.join(' + ')}.`}, label: `geo1 ${n} sides ${s.join(',')} ${unit}`};
}

// geo 2: area of rectangles: count the squares of a grid (to 6 by 8), or length times width with labels (to 12 by 12)
function ffGeo2() {
  if (rnd() < .4) {
    const r = R(2, 6), c = R(2, 8);
    return {kind: 'num', html: `${VIZ.areaGrid(c, r)}<div class="sub">Each square is 1 square unit. What is the area?</div><div class="eq">${SLOT} square units</div>`,
      say: `The rectangle is covered with ${r} rows of ${c} squares. Each square is 1 square unit. What is the area?`, ans: String(r * c),
      hint: {k: 'text', s: `Count one row: ${c} squares. There are ${r} rows. Count by ${c}s, or multiply ${r} × ${c}.`}, label: `geo2 grid ${c}x${r}`};
  }
  const l = R(2, 12), w = R(2, 12), unit = pick(['cm', 'm', 'in', 'ft']);
  return {kind: 'num', html: `${VIZ.rectSides(l, w, {w: l, h: w}, {unit})}<div class="sub">What is the area of the rectangle?</div><div class="eq">${SLOT} ${FF_SQ[unit]}</div>`,
    say: `A rectangle is ${qN(l, FF_UNIT1[unit], FF_UNIT[unit])} long and ${qN(w, FF_UNIT1[unit], FF_UNIT[unit])} wide. What is its area?`, ans: String(l * w),
    hint: {k: 'html', html: `${VIZ.areaGrid(l, w)}<div>${w} rows of ${l} squares. Area is length × width: ${l} × ${w}.</div>`, w: `${w} rows of ${l} squares. Multiply ${l} times ${w}.`},
    label: `geo2 ${l}x${w} ${unit}`};
}

// shape 5: families of polygons (quadrilaterals, rhombuses), right angles, and sides of pentagons, hexagons, octagons
function ffShape5() {
  const form = pick(['quad', 'notquad', 'notrhom', 'right', 'sides', 'name', 'whichn']);
  const QUAD = ['square', 'rectangle', 'rhombus', 'trapezoid'], NONQ = ['triangle', 'pentagon', 'hexagon', 'octagon'];
  const pics = (names, ask, ans, hint, label) => ({kind: 'choice', cls: 'pics', html: `<div class="sub">${ask}</div>`, say: ask, ans,
    choices: shuffle(names.map(x => ({v: x, l: VIZ.shape(x), h: true}))), hint: {k: 'text', s: hint}, label});
  if (form == 'quad') {
    const a = pick(QUAD), o = shuffle(NONQ).slice(0, 2);
    return pics([a, ...o], 'Which shape is a quadrilateral?', a, 'A quadrilateral has 4 sides. Count the sides of each shape.', `shape5 quad ${[a, ...o].join(' ')}`);
  }
  if (form == 'notquad') {
    const a = pick(NONQ), o = shuffle(QUAD).slice(0, 2);
    return pics([a, ...o], 'Which shape is NOT a quadrilateral?', a, 'A quadrilateral has 4 sides. Find the shape that does not have 4 sides.', `shape5 notquad ${[a, ...o].join(' ')}`);
  }
  if (form == 'notrhom') {
    const a = pick(['rectangle', 'trapezoid', 'triangle', 'pentagon', 'hexagon']);
    return pics([a, 'rhombus', 'square'], 'Which shape is NOT a rhombus?', a, 'A rhombus has 4 sides that are all the same length. A square does too.', `shape5 notrhom ${a}`);
  }
  if (form == 'whichn') {
    const a = pick(['pentagon', 'hexagon', 'octagon']), o = shuffle(['pentagon', 'hexagon', 'octagon', 'triangle'].filter(x => x != a)).slice(0, 2);
    const art = a == 'octagon' ? 'an' : 'a', sd = {pentagon: 5, hexagon: 6, octagon: 8}[a];
    return pics([a, ...o], `Which shape is ${art} ${a}?`, a, `${art == 'an' ? 'An' : 'A'} ${a} has ${sd} sides. Count the sides of each shape.`, `shape5 which ${a} ${[a, ...o].join(' ')}`);
  }
  if (form == 'right') {
    const name = pick(['square', 'rectangle', 'square', 'rectangle', 'rhombus', 'triangle', 'trapezoid', 'hexagon']);
    const ans = name == 'square' || name == 'rectangle' ? 4 : 0;
    return {kind: 'num', html: `${VIZ.shape(name)}<div class="sub">How many right angles does it have?</div>${SLOT}`,
      say: `How many right angles does this ${name} have?`, ans: String(ans), label: `shape5 right angles ${name}`,
      hint: {k: 'text', s: 'A right angle is a square corner, like the corner of a book. Check each corner of the shape.'}};
  }
  if (form == 'sides') {
    const name = pick(['pentagon', 'hexagon', 'octagon']), n = {pentagon: 5, hexagon: 6, octagon: 8}[name];
    return {kind: 'num', html: `${VIZ.shape(name)}<div class="sub">How many sides does it have?</div>${SLOT}`, say: 'How many sides does this shape have?',
      ans: String(n), label: `shape5 sides ${name}`,
      hint: {k: 'html', html: `${VIZ.shape(name, {dots: true})}<div>Each dot is a corner. A shape has as many sides as corners.</div>`, w: 'Each dot is a corner. A shape has as many sides as corners.'}};
  }
  const name = pick(['pentagon', 'hexagon', 'octagon']), names = ['pentagon', 'hexagon', 'octagon', 'quadrilateral'];
  return {kind: 'choice', html: `${VIZ.shape(name)}<div class="sub">What is this shape called?</div>`, say: 'What is this shape called?', ans: name,
    choices: shuffle(names.map(x => ({v: x, l: x[0].toUpperCase() + x.slice(1)}))),
    hint: {k: 'text', s: 'Count the sides. Quadrilateral 4, pentagon 5, hexagon 6, octagon 8.'}, label: `shape5 name ${name}`};
}

// data 3: scaled bar graph or picture graph (scale 2, 5 or 10; half symbols for scales 2 and 10): read, compare, total
const FF_DATA = [['Favorite fruit', ['Apples', 'Pears', 'Plums', 'Grapes']], ['Favorite pets', ['Cats', 'Dogs', 'Fish', 'Birds']],
  ['Favorite sports', ['Soccer', 'Tennis', 'Swim', 'Bike']], ['Favorite colors', ['Red', 'Blue', 'Green', 'Purple']]];
function ffData3() {
  const [title, pool] = pick(FF_DATA), names = shuffle(pool), sc = pick([2, 5, 10]), bar = coin();
  const half = !bar && sc != 5, units = shuffle(half ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] : [1, 2, 3, 4, 5, 6, 7, 8]).slice(0, 4);
  const vals = bar ? shuffle([1, 2, 3, 4, 5]).slice(0, 4).map(k => k * sc) : units.map(u => half ? u * sc / 2 : u * sc);
  const g = `<div class="sub"><b>${esc(title)}</b></div>` + (bar ? VIZ.barGraph(names.map((x, i) => [x, vals[i]]), sc)
    : VIZ.pictograph(names.map((x, i) => [x, vals[i]]), {per: sc, key: `${sc} children`}));
  const hint = bar ? `Each line on the side goes up by ${sc}. Find where the top of the bar reaches.`
    : `Look at the key: each circle stands for ${sc} children${half ? `, and a half circle stands for ${sc / 2}` : ''}. Count the circles, then count by ${sc}s.`;
  const form = pick(['read', 'more', 'total2', 'all']), i = R(0, 3), j = (i + R(1, 3)) % 4, lc = k => names[k].toLowerCase();
  let ask, ans, tag;
  if (form == 'read') {ask = `How many children chose ${lc(i)}?`; ans = vals[i]; tag = `read ${i + 1}`}
  else if (form == 'more') {
    const [hi, lo] = vals[i] > vals[j] ? [i, j] : [j, i];
    ask = `How many more children chose ${lc(hi)} than ${lc(lo)}?`; ans = vals[hi] - vals[lo]; tag = `more ${hi + 1} ${lo + 1}`;
  } else if (form == 'total2') {ask = `How many children chose ${lc(i)} and ${lc(j)} in all?`; ans = vals[i] + vals[j]; tag = `total ${i + 1} ${j + 1}`}
  else {ask = 'How many children voted in all?'; ans = vals.reduce((x, y) => x + y, 0); tag = 'all'}
  return {kind: 'num', html: `${g}<div class="sub">${ask}</div>${SLOT}`, say: ask, ans: String(ans), hint: {k: 'text', s: hint},
    label: `data3 ${bar ? 'bar' : 'pic'} ${sc} ${tag}: ${vals.join(',')}`};
}

// meas 4: ruler to the half or quarter inch, or a dial (g, kg) or jug (mL, L) with marks to count
function ffMeasRuler() {
  const quarter = coin(), steps = quarter ? 2 * R(2, 11) + 1 : 2 * R(2, 12);
  const mk = q => { // q: length in quarter inches; "3 1/2", "2 1/4", "5"
    const w = Math.floor(q / 4), r = q % 4;
    if (!r) return {v: String(w), l: `${w} in`};
    return {v: `${w} ${r == 2 ? '1/2' : r + '/4'}`, l: `${w} ${r == 2 ? fcFr(1, 2) : fcFr(r, 4)} in`};
  };
  const ks = quarter ? [1, 2, 3] : [2, 4, 6];
  const bad = ffOthers(ks.flatMap(k => [steps + k, steps - k]).filter(q => q >= 4 && q <= 28), steps, 3);
  const obj = coin() ? 'pencil' : 'bar', name = obj == 'pencil' ? 'pencil' : 'paper strip';
  return {kind: 'choice', cls: 'ffc', html: `${VIZ.ruler(steps / 4, 'in', obj)}<div class="sub">How long is the ${name}?</div>`,
    say: `How long is the ${name}? The ruler is in inches.`, ans: mk(steps).v,
    choices: shuffle([steps, ...bad].map(q => ({...mk(q), h: true}))),
    hint: {k: 'text', s: `Each inch is cut into ${quarter ? '4 small steps, called quarters' : '2 steps, called halves'}. Count the whole inches first. Then count the small steps after the last whole number.`},
    label: `meas4 ruler ${steps}/4 in`};
}
// a round scale with a needle: ticks every `step`, a label on every tick (or every second tick when there are more than 6)
function ffDial(val, max, step, unit) {
  const n = max / step, fx = v => Math.round(v * 10) / 10, c = 70, at = (i, rr) => {
    const a = (-135 + 270 * i / n) * Math.PI / 180;
    return [fx(c + rr * Math.sin(a)), fx(c - rr * Math.cos(a))];
  };
  let ticks = '', labs = '';
  for (let i = 0; i <= n; i++) {
    const [x1, y1] = at(i, 53), [x2, y2] = at(i, 61), [lx, ly] = at(i, 41);
    ticks += `M${x1} ${y1}L${x2} ${y2}`;
    if (n <= 6 || i % 2 == 0) labs += `<text class="vcn" x="${lx}" y="${fx(ly + 4)}">${i * step}</text>`;
  }
  const [nx, ny] = at(val / step, 31);
  return `<svg class="viz viz-ffd" viewBox="0 0 140 140" style="--vw:170" role="img" aria-label="scale with a needle"><circle class="vrim" cx="${c}" cy="${c}" r="66"/>`
    + `<path class="vk" d="${ticks}"/>${labs}<text class="vcn" x="${c}" y="124">${unit}</text><path class="vmh" d="M${c} ${c}L${nx} ${ny}"/><circle class="vpin" cx="${c}" cy="${c}" r="4.5"/></svg>`;
}
// a measuring jug with water up to `val`
function ffJug(val, max, step, unit) {
  const n = max / step, fx = v => Math.round(v * 10) / 10, y = i => fx(150 - 130 * i / n);
  let ticks = '', labs = '';
  for (let i = 0; i <= n; i++) {
    ticks += `M34 ${y(i)}h-8`;
    if (n <= 6 || i % 2 == 0) labs += `<text class="vcn vta" x="22" y="${fx(y(i) + 5)}">${i * step}</text>`;
  }
  const top = y(val / step);
  return `<svg class="viz viz-ffj" viewBox="0 0 130 170" style="--vw:150" role="img" aria-label="measuring jug"><rect class="v1" x="35" y="${top}" width="46" height="${fx(150 - top)}"/>`
    + `<path class="vl" d="M34 18V150H82V18"/><path class="vk" d="${ticks}"/>${labs}<text class="vcn vts" x="88" y="40">${unit}</text></svg>`;
}
const FF_DIAL = [['g', 1000, 100], ['g', 500, 50], ['g', 500, 100], ['kg', 10, 1], ['kg', 5, 1], ['kg', 20, 2]];
const FF_JUG = [['mL', 1000, 100], ['mL', 500, 50], ['mL', 500, 100], ['L', 5, 1], ['L', 10, 2], ['L', 10, 1]];
function ffMeasScale(dial) {
  const [unit, max, step] = pick(dial ? FF_DIAL : FF_JUG), n = max / step, K = R(1, n - 1), val = K * step;
  const bad = ffOthers([K - 1, K + 1, K - 2, K + 2, K - 3, K + 3].filter(k => k >= 1 && k <= n), K, 3);
  const ask = dial ? 'How heavy is the bag on the scale?' : 'How much water is in the jug?';
  return {kind: 'choice', cls: 'ffc', html: `${dial ? ffDial(val, max, step, unit) : ffJug(val, max, step, unit)}<div class="sub">${ask}</div>`,
    say: `${ask} Each little mark is ${step} ${unit}.`, ans: String(val),
    choices: shuffle([K, ...bad].map(k => ({v: String(k * step), l: `${k * step} ${unit}`}))),
    hint: {k: 'text', s: dial ? `Each mark is ${step} ${unit}. Find the last number the needle has passed, then count the marks after it.`
      : `Each mark is ${step} ${unit}. Find the top of the water and count the marks up from the bottom.`},
    label: `meas4 ${dial ? 'scale' : 'jug'} ${val} ${unit}`};
}
function ffMeas4() {
  const f = rnd();
  return f < .5 ? ffMeasRuler() : ffMeasScale(f < .75);
}

// story 6: two steps with all four operations within 1,000
function ffStory6() {
  const me = S.name || 'Sam', n2 = pick([S.buddy, S.buddy, petN(), ...NAMES].filter(n => n && n !== me));
  const T = pick(THINGS), th = T[0], who = pick([me, n2]), other = who == me ? n2 : me;
  const f = R(1, 5);
  let t, ans, s, label;
  if (f == 1) { // multiply, then add
    const a = R(2, 9), b = coin() ? R(2, 9) : 10 * R(1, 9), c = R(5, 99);
    t = `${who} has ${a} bags with ${b} ${th} in each bag. ${other} gives ${who} ${c} more ${th}. How many ${th} does ${who} have now?`;
    ans = a * b + c; s = `Step 1: ${a} × ${b}. Step 2: add ${c}.`; label = `story6 ${a} × ${b} + ${c}`;
  } else if (f == 2) { // multiply, then take away
    const a = R(2, 9), b = coin() ? R(3, 9) : 10 * R(2, 9), c = R(3, Math.min(99, a * b - 1));
    t = `A shop has ${a} boxes with ${b} ${th} in each box. It sells ${c} ${th}. How many ${th} are left?`;
    ans = a * b - c; s = `Step 1: ${a} × ${b}. Step 2: take away ${c}.`; label = `story6 ${a} × ${b} − ${c}`;
  } else if (f == 3) { // add, then share
    const d = R(2, 9), q = R(2, 10), total = d * q, a = R(1, total - 1), b = total - a;
    t = `${who} has ${qN(a, T[2], th)}. ${other} gives ${who} ${b} more. Then ${who} shares them equally among ${d} friends. How many ${th} does each friend get?`;
    ans = q; s = `Step 1: add ${a} + ${b}. Step 2: share the total into ${d} equal groups.`; label = `story6 (${a} + ${b}) ÷ ${d}`;
  } else if (f == 4) { // divide, then take away
    const d = R(2, 9), q = R(4, 12), g = R(1, q - 1);
    t = `${who} packs ${d * q} ${th}, ${d} in each bag. Then ${who} gives away ${qN(g, 'bag')}. How many bags are left?`;
    ans = q - g; s = `Step 1: ${d * q} ÷ ${d}. Step 2: take away ${g}.`; label = `story6 ${d * q} ÷ ${d} − ${g}`;
  } else { // take away, then multiply
    const n = R(12, 60), k = R(2, n - 6), m = R(2, 9);
    t = `${who} has ${n} ${th}, but ${k} are too small to sell. ${who} sells the rest for ${m} cents each. How many cents does ${who} get?`;
    ans = (n - k) * m; s = `Step 1: ${n} − ${k}. Step 2: multiply by ${m}.`; label = `story6 (${n} − ${k}) × ${m}`;
  }
  return {kind: 'num', html: `<p class="story">${words(t)}</p><div>${SLOT}</div>`, say: t, auto: true, ans: String(ans),
    hint: {k: 'text', s: `Do one step at a time. ${s}`}, label};
}
/* ---------- Spanish ---------- */
// The words live in src/data/d-es.js (ES_UNITS, SPN). Read them only inside functions: the data file loads after this one.
const esFull=it=>it[3]?it[3]+' '+it[0]:it[0]; // 'la casa' for display and speech; the bare word is what level 3 asks you to spell
function picHTML(it,cap){const p=it[2];const h=p.startsWith('c:')?`<span class="swatch" style="--sw:${p.slice(2)}"></span>`:p.startsWith('n:')?`<span class="numpic">${p.slice(2)}</span>`:p.startsWith('k:')?`<span class="clkpic">${VIZ.clock(+p.split(':')[1],+p.split(':')[2],{nums:true})}</span>`:`<span>${picFor(it[4]||'',p)}</span>`;
  return cap?`<span class="pcap">${h}<small>${esc(it[1])}</small></span>`:h}
// P2-30: a unit from d-es.js becomes the skill es_<id> unless 38-skills.js already has it; spell:1 units go up to level 3
function esReg(u){const id='es_'+u.id;if(!SK[id])SK[id]={t:u.t,e:u.e,area:'es',max:u.spell?3:2,gen:lv=>genEs(u.id,lv)};else if(u.spell)SK[id].max=3}
const esSpellable=it=>/^[a-zñáéíóúü]{1,12}$/.test(it[0]);
// R-01s: a unit's cap is 1 (the English under every picture) or a list of the words whose picture alone is not enough (weather: hot,
// cold, cool); confuse lists pairs of words that are never offered together (two right answers by picture or by ear: hace sol / hace
// calor, nieva / hace frío, hace fresco / hace viento, feliz / tranquilo, feliz / emocionado)
const esCap=(u,it)=>!!u&&(u.cap===1||Array.isArray(u.cap)&&u.cap.includes(it[0]));
const esClash=(u,a,b)=>!!(u&&u.confuse&&u.confuse.some(p=>p.includes(a[0])&&p.includes(b[0])));
// two wrong items for `it`: neither clashes with it or with the other (a unit with no confuse list draws exactly as before R-01s)
function esWrong(u,it,pool){const out=[];
  for(const x of shuffle(pool.filter(x=>x!==it&&!esClash(u,it,x)))){if(out.length==2)break;if(!out.some(y=>esClash(u,x,y)))out.push(x)}
  return out}
const esSay=it=>it[5]||esFull(it);
function genEs(set,lv){const sn=set=='mix'?pick(ES_UNITS.filter(u=>u.mix).map(u=>u.id)):set,un=ES_UNITS.find(u=>u.id==sn),items=SPN[sn],
  pool=lv==1&&set!='mix'&&un.l1?items.slice(0,un.l1):items;
  if(lv==3){const w=pick(items.filter(esSpellable)),a=w[3],f=esFull(w);
    return{kind:'spell',lang:'es',word:w[0],ans:w[0],auto:'must',after:f,afterLang:'es',say:w[5]||f,
      html:`<div class="emo">${picHTML(w,false)}</div><div class="sub">Spell it in Spanish: ${a?esc(a)+' … ':''}<b>${esc(w[1])}</b></div>`
        +`<div class="lslots">${[...w[0]].map((_,i)=>`<span class="ls" id="ls${i}"></span>`).join('')}</div>`,
      hint:{k:'say',lang:'es',w:w[0],s:`It has ${[...w[0]].length} letters and starts with “${w[0][0]}”.`},label:`${w[0]} (spell)`}}
  const it=pick(pool),f=esFull(it),sy=esSay(it),opts=shuffle([it,...esWrong(un,it,pool)]);
  // R-01s hints never give the answer: level 1 replays the word slowly (no English meaning, which the captions would match);
  // level 2 reads the three choices aloud (the child still has to know which one names the picture), no first letter
  if(lv==1)return{kind:'choice',cls:'pics',lang:'es',html:`<button class="btn hear" data-sayes="${esc(sy)}">🔊</button><div class="sub">Tap the picture for “${esc(f)}”</div>`,
    say:sy,auto:'must',ans:f,choices:opts.map(x=>({l:picHTML(x,esCap(un,x)),v:esFull(x),h:1})),after:f,afterLang:'es',
    hint:{k:'say',lang:'es',w:sy,slow:.75,s:`Listen again, slowly: “${f}”. Which picture is it?`},label:`${f} (listen)`};
  const wide=opts.some(x=>/ \/ /.test(x[0])); // R-01s: "sorprendido / sorprendida" needs a whole row
  return{kind:'choice',...(wide?{cls:'wide'}:{}),lang:'es',html:`<div class="emo">${picHTML(it,esCap(un,it))}</div><div class="sub">How do you say it in Spanish?</div>`,ans:f,
    choices:opts.map(x=>({l:esFull(x),v:esFull(x)})),after:f,afterLang:'es',
    hint:{k:'say',lang:'es',w:opts.map(esSay).join('. '),s:'Say each word out loud. Which word names the picture?'},label:`${f} (read)`}}
/* ---------- P2-34 phrases and grammar (CURRICULUM S-gram): es_phrase, es_art, es_ser, es_gusta, es_sent ----------
   Data: ES_GRAM in src/data/d-es-gram.js (that file makes the five skills). Every question has one right answer:
   a phrase has one meaning; a noun has one article; a subject fixes the verb form; a noun is one or many; a sentence has one order
   (the first tile is capitalised and the last carries the dot). Hints teach the rule in English and never give the answer.
   What is read out never gives the answer away: a listening question says its Spanish (lang 'es', auto 'must': with no Spanish voice
   12-speech.js hides the button and the text on screen is enough); a question whose Spanish holds the answer says the English or the noun. */
const gSub=t=>`<div class="sub">${t}</div>`;
const gSay=sp=>({lang:'es',auto:'must',say:sp,after:sp,afterLang:'es'}); // reads the Spanish on show and after the answer
const gPlArt=a=>a=='el'?'los':a=='la'?'las':a;
function genEsPhrase(lv){const G=ES_GRAM;
  if(lv==1){const it=pick(G.phrases),opts=shuffle([it,...shuffle(G.phrases.filter(x=>x!==it)).slice(0,2)]);
    return{kind:'choice',cls:'wide',...gSay(it[0]),html:`<div class="sent">${esc(it[0])}</div>${gSub('What does it mean?')}`,ans:it[1],
      choices:opts.map(x=>({l:x[1],v:x[1]})),hint:{k:'say',lang:'es',w:it[0],s:it[2]},label:`${it[0]} (meaning)`}}
  const qa=pick(G.qa),right=pick(qa.ok),types=shuffle([...new Set(G.qa.map(x=>x.t))].filter(t=>t!=qa.t&&!qa.no.includes(t))),
    wrong=types.slice(0,2).map(t=>pick(pick(G.qa.filter(x=>x.t==t)).ok));
  return{kind:'choice',cls:'wide',...gSay(qa.q),after:right,html:`<div class="sent">${esc(qa.q)}</div>${gSub('Which reply fits?')}`,ans:right,
    choices:shuffle([right,...wrong]).map(x=>({l:x,v:x})),hint:{k:'text',s:qa.h},label:`${qa.q} (reply)`}}
// article: -o words are el / un, -a words are la / una (level 1 and the "a" half of level 2); the plural half of level 2 is los / las + -s / -es
function genEsArt(lv){const N=ES_GRAM.nouns,regular=N.filter(n=>/[oa]$/.test(n[0]));
  if(lv==2&&R(0,1)){ // plurals: the right article for the gender AND the right ending
    const n=pick(N),art=gPlArt(n[3]),oth=art=='los'?'las':'los',right=`${art} ${n[4]}`,vowel=/[aeiou]$/.test(n[0]),
      bad=vowel?pick([n[0],n[0]+'es']):pick([n[0],n[0]+'s']),opts=shuffle([right,`${oth} ${n[4]}`,`${art} ${bad}`]);
    // R-01s: "More than one dog!" (singular after "one") and "the beaches" (enPlural, 22-qhelpers.js), in the voice and on screen
    return{kind:'choice',cls:'wide',say:`More than one ${n[1]}! How do you say the ${enPlural(n[1])}?`,after:right,afterLang:'es',
      html:`<div class="emo">${picFor('',n[2])}${picFor('',n[2])}</div>${gSub(`More than one! How do you say “the ${esc(enPlural(n[1]))}”?`)}`,
      ans:right,choices:opts.map(x=>({l:x,v:x})),
      hint:{k:'text',s:'Many things: change the ending (a vowel at the end takes -s, a consonant takes -es), and use the small word that goes with boy words or girl words.'},label:`${right} (plural)`}}
  const n=pick(regular),a=lv==2?(n[3]=='el'?'un':'una'):n[3],ch=lv==2?['un','una']:['el','la'],
    hint=(/o$/.test(n[0])?'This word ends in -o. Words that end in -o are usually “boy” words (masculine).':'This word ends in -a. Words that end in -a are usually “girl” words (feminine).')
      +(lv==2?' The word for “a” has a boy form and a girl form too.':'');
  return{kind:'choice',cls:'syms',lang:'es',auto:'must',say:n[0],after:a+' '+n[0],afterLang:'es',
    html:`<div class="emo">${picFor('',n[2])}</div><div class="sent">${SLOT} ${esc(n[0])}</div>${gSub(`“${lv==2?'a':'the'} ${esc(n[1])}”: which word goes in the blank?`)}`,
    ans:a,choices:ch.map(x=>({l:x,v:x})),hint:{k:'text',s:hint},label:`${a} ${n[0]}`}}
// ser (level 1), estar (2), tener (3): the subject fixes the form, so one answer fits. The English line says what the sentence means and is
// what "Hear it" reads (the Spanish sentence holds the answer); the Spanish sentence is said after the answer
const ES_FORMS=[null,{1:'soy',2:'eres',3:'es'},{1:'estoy',2:'estás',3:'está',6:'están'},{1:'tengo',2:'tienes',3:'tiene'}];
const ES_SER_HINT=[null,'Who is the sentence about? One form goes with “yo” (I), another with “tú” (you), and a third with he, she, it or a name.',
  'Match the person: I, you, he or she, or more than one. This verb is for how you feel and where you are.',
  'Spanish says “I have hunger” where English says “I am hungry”. Match the form to the person: I, you, or he or she.'];
function genEsSer(lv){const it=pick(ES_GRAM.ser[lv]),F=ES_FORMS[lv],a=F[it[1]],opts=shuffle([a,...shuffle(Object.values(F).filter(x=>x!=a)).slice(0,2)]),
  sp=`${it[0]} ${a} ${it[2]}.`;
  return{kind:'choice',cls:'wide',say:it[3],after:sp,afterLang:'es',html:`<div class="sent">${esc(it[0])} ${SLOT} ${esc(it[2])}.</div>${gSub(esc(it[3]))}`,
    ans:a,choices:opts.map(x=>({l:x,v:x})),hint:{k:'text',s:ES_SER_HINT[lv]},label:`${it[0]} ___ ${it[2]}`}}
// R-01s: animals ('an') are liked in the plural only ("Me gusta el cerdo" means "I like pork"): level 1 asks food, level 2 says "Me gustan los cerdos"
// gusta: level 1 hear "Me gusta + one thing" or "No me gusta ...", tap the picture with the right face; level 2 gusta or gustan
const gFace=(f,p)=>`<span class="gcd"><i>${f}</i><b>${p}</b></span>`;
function genEsGusta(lv){const L=ES_GRAM.likes;
  if(lv==1){const sg=L.filter(x=>x[4]!='pl'&&x[4]!='an'),it=pick(sg),neg=R(0,1)==1,sp=(neg?'No me gusta ':'Me gusta ')+it[0]+' '+it[1]+'.',oth=pick(sg.filter(x=>x!==it)),
      face=neg?'😢':'😊',key=(x,f)=>x[1]+(f=='😊'?'+':'-'),opts=shuffle([[it,face],[it,face=='😊'?'😢':'😊'],[oth,face]]);
    return{kind:'choice',cls:'pics',...gSay(sp),html:`<div class="sent">${esc(sp)}</div>${gSub('Tap the picture that matches.')}`,ans:key(it,face),
      choices:opts.map(([x,f])=>({l:gFace(f,picFor('',x[3])),v:key(x,f),h:1})),
      hint:{k:'text',s:'Is there a “no” at the start of the sentence? Then the person does not like it. Check the face and the picture.'},label:`${sp} (picture)`}}
  const it=pick(L),pl=it[4]=='pl'||it[4]=='an'||(it[4]!='sg'&&R(0,1)==1),neg=R(0,9)<3,np=pl?gPlArt(it[0])+' '+it[2]:it[0]+' '+it[1],a=pl?'gustan':'gusta',
    sp=`${neg?'No me':'Me'} ${a} ${np}.`;
  return{kind:'choice',cls:'wide',lang:'es',auto:'must',say:np,after:sp,afterLang:'es',
    html:`<div class="emo">${picFor('',it[3])}${pl?picFor('',it[3]):''}</div><div class="sent">${neg?'No me':'Me'} ${SLOT} ${esc(np)}.</div>${gSub('Which word fits?')}`,
    ans:a,choices:['gusta','gustan'].map(x=>({l:x,v:x})),hint:{k:'text',s:'Look at the thing in the sentence. Is it one thing or more than one? The verb has to match the number.'},label:`me ___ ${np}`}}
// sentence tiles. R-01s: the tiles are lower case (a name keeps its capital) and the dot sits after the last slot (q.end), so neither the
// capital nor the dot pins a tile and the describing word's place is really tested; the agreement of el / la with the noun keeps one order
const ES_SENT_HINT=[null,'In Spanish a describing word, like a color or a size, comes after the thing it describes. Start with who or what the sentence is about.',
  'Say who it is, then what they do, then where it happens.'];
const esTiles=s=>s.replace(/\.$/,'').split(' ').map((w,i)=>i||ES_STORY.people[w]?w:w.toLowerCase());
function genEsSent(lv){const it=pick(ES_GRAM.sent[lv]),ws=esTiles(it[0]),items=ws.map(w=>({v:w,l:w}));
  return{...sentOrder(items,ws,{html:`Put the words in order: “${esc(it[2])}”`,say:'Put the words in order: '+it[2]},{k:'text',s:ES_SENT_HINT[lv]},it[0]),after:it[0],afterLang:'es',end:'.'}}
/* ---------- P2-35 mini dialogues (CURRICULUM S-story): es_story ----------
   Data: ES_STORY in src/data/d-es-story.js (that file makes the skill). A round is two dialogues, each with its three questions in order
   (esStoryRound, the SK round hook). The dialogue stays in the passage panel above every question (q.ctx with html: bankCtx in 37-bank.js):
   speaker names, the Spanish text, and a speak button per line that uses the Spanish voice. With no Spanish voice the buttons go and the
   text on screen is all there is (esQFix in 12-speech.js). Level 1: the question and the answers in English. Level 2: the question in
   Spanish, the answers are pictures (a who answer is a face with the name under it). Level 3: the question and the answers in Spanish.
   The right answer is always in the line the question points to, and no wrong answer is. A hint points at the line and never gives the answer. */
const ST_ORD=['first','second','third','fourth','fifth','sixth'];
const stNorm=t=>t.toLowerCase().replace(/[.¡!¿?,«»“”]/g,'').replace(/\s+/g,' ').trim();
// the words that must be in the line for this answer (or are not in it for a wrong one): the Spanish without the small words, split at " y "
const stKeys=o=>(o[3]||stNorm(o[0]).replace(/^((en|un|una|el|la|los|las) )+/,'')).split(' y ');
const stOpt=(q,x)=>q.t=='who'?[x,x,ES_STORY.people[x],stNorm(x)]:x;
function stHint(q){const o=ST_ORD[q.line];
  if(q.t=='who')return `Find the line that says “${q.k}”. Who is talking in that line?`;
  const tail={where:'Which place do you find in it?',how:'Which word tells how someone is, or what it is like?',reply:'Which words does that person say?',
    what:'Which words answer the question?'}[q.t];
  return `Read the ${o} line again. ${tail}`}
function stPanel(D){const sp=[...new Set(D.lines.map(l=>l[0]))];
  return D.lines.map(([s,t])=>`<div class="dl-l s${sp.indexOf(s)%2}"><button class="dl-b" data-sayes="${esc(t)}" aria-label="Hear this line">${ico('speak',22)}</button>`
    +`<span class="dl-t"><b class="dl-n">${esc(s)}:</b>${esc(t)}</span></div>`).join('')}
// one question: dialogue di, question qi, level lv (uses the current RNG for the choices)
function stQ(lv,di,qi){const D=ES_STORY.dialogues[di],q=D.qs[qi],right=stOpt(q,q.t=='who'?q.a[0]:q.a),
  wrong=shuffle(q.d.map(x=>stOpt(q,x))).slice(0,2),opts=shuffle([right,...wrong]),line=D.lines[q.line][1],
  pic=o=>{const p=picHTML([o[0],o[1],o[2],'',''],false);return q.t=='who'?`<span class="pcap"><span>${p}</span><small>${esc(o[0])}</small></span>`:p},
  choices=opts.map(o=>lv==1?{l:o[1],v:o[1]}:lv==2?{l:pic(o),v:o[0],h:1}:{l:o[0],v:o[0]}),
  text=lv==1?q.en:q.es,ans=lv==1?right[1]:right[0];
  const o={kind:'choice',cls:lv==2?'pics dlg':'wide bpass',dl:1,ans,choices,after:line,afterLang:'es',
    html:`<div class="bq">${esc(text)}</div>`,hint:{k:'text',s:stHint(q)},label:`${D.title}: question ${qi+1}`,
    ctx:{title:D.title,text:D.lines.map(l=>l[0]+': '+l[1]).join(' '),html:stPanel(D)}};
  if(lv>1)Object.assign(o,{lang:'es',auto:'must',say:text}); // the Spanish question is read aloud (no Spanish voice: the text on screen is enough)
  else o.say=q.t=='who'?'Who says the line in the question? Find it in the story.':text; // English; the Spanish quote of a who question is not read in the English voice
  return o}
function genEsStory(lv){const D=ES_STORY.dialogues,di=R(0,D.length-1);return stQ(lv,di,R(0,D[di].qs.length-1))}
function esStoryRound(lv){const D=ES_STORY.dialogues,s0=bankSeed(),out=[];let pool=D.map((_,i)=>i);
  for(let k=0;k<2;k++){const di=bankChoose('S:es_story',pool,bankSub(s0,k));pool=pool.filter(i=>i!=di);
    D[di].qs.forEach((_,qi)=>{const q=bankWith(bankSub(s0,di*8+qi),()=>stQ(lv,di,qi));q.sk='es_story';q.lv=lv;out.push(q)})}
  return out}

var GEN_VER='v155'; // last line: the whole file ran (checked by dataReady() before the app starts)
