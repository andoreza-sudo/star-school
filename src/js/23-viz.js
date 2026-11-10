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
   New visuals: add a function inside this block and to the returned object; use svg(), f() and counters(). */
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

  // Counters at points [[x, y], ...]. The last o.b are the second colour, the last o.fade are faded.
  function counters(pts, r, o = {}) {
    const n = pts.length;
    const b = o.b || 0;
    const x = o.fade || 0;
    const groups = {};
    pts.forEach(([cx, cy], i) => {
      const k = (i >= n - b ? 'v2' : 'v1') + (i >= n - x ? ' vx' : '');
      groups[k] = (groups[k] || '') + `<circle cx="${f(cx)}" cy="${f(cy)}" r="${r}"/>`;
    });
    return Object.keys(groups).map(k => `<g class="${k}">${groups[k]}</g>`).join('');
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
      body += `<rect class="vo" x="${P}" y="${y0}" width="${5 * C}" height="${fh}" rx="8"/><path class="vl" d="${d}"/>`;
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
    const body = bg ? `<path class="vb" d="${bg}"/><path class="vc" stroke-width="${c}" stroke-dasharray="${c} 1" d="${cells}"/>` : '';
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
    const P = 24, Y = 28, den = o.den;
    const X = v => P + (v - min) / (max - min) * w;
    const W = w + 2 * P, Hh = den ? 84 : 68;
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
    if (o.marks) body += `<g class="v1">${o.marks.map(v => `<circle cx="${f(X(v))}" cy="${Y}" r="8"/>`).join('')}</g>`;
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
      for (let i = 0; i < d; i++) {
        const idx = b * d + i, on = idx < n;
        const x0 = P + i * pw + (i ? 0 : 1.5), x1 = P + (i + 1) * pw - (i < d - 1 ? 0 : 1.5);
        const cls = 'vp' + (on ? ' vs' : '');
        const attr = o.tap ? tapAttr(idx, cls) : `class="${cls}"`;
        body += `<rect ${attr} x="${f(x0)}" y="${y + 1.5}" width="${f(x1 - x0)}" height="${h - 3}"/>`;
        if (o.unit && pw >= 30) body += fracText(P + (i + 0.5) * pw, y + h / 2 + 1, 1, d, on ? ' vw' : '');
      }
      body += `<rect class="ve" x="${P}" y="${y}" width="${f(w)}" height="${h}" rx="6"/>`;
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
      body += `<circle class="ve" cx="${cx}" cy="${cy}" r="${r}"/>`;
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
    let body = `<circle class="vrim" cx="${c}" cy="${c}" r="54"/>` + ring(48.5, 60, 1.2, 'vt1') + ring(47.8, 12, 2.6, 'vt5');
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
      `<path class="vdd" stroke-dasharray="0 ${s}" d="${d}"/><path class="vd" stroke-dasharray="0 ${s}" d="${d}"/>`;
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
        body += `<rect class="vo" x="${x0}" y="${P}" width="${F}" height="${F}" rx="16"/>`;
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

  return {tenFrame, base10, numLine, fracBar, fracCircle, clock, array, dots};
})();
