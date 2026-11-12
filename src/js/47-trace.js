/* ---------- tracing engine (P2-16; CURRICULUM E-trace) ----------
   Kind 'trace': the child traces a glyph (a digit now; letters from P2-17) with a finger on a board, stroke by stroke, in
   handwriting order. Glyph data: TRACE in src/data/d-trace.js (format in its header). This file reads TRACE only inside
   functions (the data file loads after all code).

   Question fields (made by genTrace, below):
     kind 'trace', set (TRACE.sets key: 'digit'), g (glyph key: '3'), ans 'done', passes (guide levels, default [1, 2, 3]),
     tol (optional; default 14 box units for Pre-K, 10 for K and up: CURRICULUM E-trace), pk true (spoken, no reading needed).
   One question is one glyph, traced once per pass:
     level 1  watch the demo (the pen draws every stroke), then trace over the solid guide: outlined strokes, numbered start
              dots, arrows along the stroke to trace
     level 2  dotted guide, the start dot of the stroke to trace and one arrow at its start
     level 3  start dot only (the prompt card shows the glyph to copy)
   A stroke is done when the trace passes the checker (TR.check). Lifting the finger part way keeps what was traced: the next
   touch near the end of it carries on (or a touch on the start dot starts the stroke again). A miss never shows red: the ink
   fades, the start dot pulses and the arrows run along the stroke; a soft sound and a spoken tip. Misses on one stroke raise the
   hint by themselves: 2 misses play the stroke (hint tier 1), 3 show a moving dot to follow (tier 2) over a dotted guide.
   Help does the same, one tier per tap. When every pass is traced the glyph earns stars (3 = no misses, 2 = one or two, 1 =
   more) and the answer 'done' is submitted. A glyph with fewer than 2 stars counts as "needed another try" in the round (no
   star point, amber dot), so 5 glyphs with at most 2 misses each give a 3-star stop.

   The checker (TR.track / TR.check), in box units (the glyph box is 100 x 100), for one stroke and tolerance tol:
     - the stroke is the dense centre line (points 1 unit apart) of its curve; the finger's points are joined into a line and
       walked in steps of at most 2 units
     - start: the first touch must be within 1.5 tol of the stroke's start (or of where a lifted trace stopped)
     - progress: each step looks for the nearest point of the stroke in a window from tol behind to 2.5 tol ahead of the
       progress so far; within tol it is "on" and moves the progress forward (never back), else it is "off". So the finger
       has to go along the stroke in its direction: reversed, out-of-order and off-path traces make no progress
     - ok when: progress reaches within 0.8 tol of the stroke's end, at most 25% of the trace length is off, and the trace is
       no longer than 2.5 x the stroke (plus 3 tol): a scribble fails even when it covers the stroke
     - results (why): '' ok; 'part' started right, stayed on, lifted before the end (carry on later); 'tap' a touch too
       short to count, or a start-dot tap (ignored: no miss); 'start' began away from the start; 'off' wandered off or went the
       wrong way; 'scribble' far too long
     - a one-point stroke is a dot: a touch within 1.5 tol of it, moving no further away, is ok
   Palms: a touch wider than 60 px is ignored, one finger is followed at a time, and a second touch replaces the first only
   while the first has not moved and the second is nearer the start dot. touch-action: none on the board. */
const TR = {
  N: 5,                 // glyphs in a round (CURRICULUM E-trace)
  LV: { 1: 'digit', 2: 'upper', 3: 'lower' }, // level -> TRACE set (P2-17: letters in ABC Beach, CURRICULUM E-trace)
  START: 1.5,           // start radius, in tol
  BACK: 1, AHEAD: 2.5,  // progress search window behind / ahead, in tol
  END: 0.8,             // the end must be reached within END tol
  OFF: 0.25,            // largest share of the trace that may be off the stroke
  SCRIB: 2.5,           // a trace longer than SCRIB x the stroke (+ 3 tol) is a scribble
  PART: 8,              // progress (units) that makes a lifted trace worth keeping
  TAP: 4,               // a touch shorter than this is a tap
  DOT: 2,               // a stroke shorter than this is a dot
  PALM: 60,             // css px: a wider touch is a palm
  geoC: {},             // geometry cache: 'set:key' -> {s: [stroke geometry]}
  cur: null,            // the board on screen
};

// ---- geometry ----
// cubic segments [a, c1, c2, b] of a stroke (uniform Catmull-Rom through the points; corners and ends get chord tangents)
TR.segs = pts => {
  const n = pts.length, out = [];
  const closed = n > 2 && Math.hypot(pts[0][0] - pts[n - 1][0], pts[0][1] - pts[n - 1][1]) < 0.5;
  for (let i = 0; i < n - 1; i++) {
    const a = pts[i], b = pts[i + 1];
    const p0 = i == 0 ? (closed ? pts[n - 2] : a) : (a[2] ? a : pts[i - 1]);
    const p3 = i == n - 2 ? (closed ? pts[1] : b) : (b[2] ? b : pts[i + 2]);
    out.push([a, [a[0] + (b[0] - p0[0]) / 6, a[1] + (b[1] - p0[1]) / 6], [b[0] - (p3[0] - a[0]) / 6, b[1] - (p3[1] - a[1]) / 6], b]);
  }
  return out;
};
// one stroke: dense centre line p (points 1 unit apart), length L, svg path d
TR.stroke = pts => {
  const f = v => +v.toFixed(2);
  if (pts.length == 1) return { p: [[pts[0][0], pts[0][1]]], L: 0, d: `M${pts[0][0]} ${pts[0][1]}h0`, dot: true };
  const segs = TR.segs(pts), raw = [[pts[0][0], pts[0][1]]];
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (const [a, c1, c2, b] of segs) {
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${b[0]} ${b[1]}`;
    for (let k = 1; k <= 32; k++) {
      const t = k / 32, u = 1 - t, w0 = u * u * u, w1 = 3 * u * u * t, w2 = 3 * u * t * t, w3 = t * t * t;
      raw.push([w0 * a[0] + w1 * c1[0] + w2 * c2[0] + w3 * b[0], w0 * a[1] + w1 * c1[1] + w2 * c2[1] + w3 * b[1]]);
    }
  }
  // resample to 1 unit steps (the last step is shorter)
  const p = [raw[0]];
  let L = 0, carry = 0;
  for (let i = 1; i < raw.length; i++) {
    const [ax, ay] = raw[i - 1], [bx, by] = raw[i], seg = Math.hypot(bx - ax, by - ay);
    let t = 1 - carry;
    while (t <= seg) { p.push([ax + (bx - ax) * t / seg, ay + (by - ay) * t / seg]); t += 1; }
    carry = seg - (t - 1);
    L += seg;
  }
  const last = raw[raw.length - 1];
  if (Math.hypot(p[p.length - 1][0] - last[0], p[p.length - 1][1] - last[1]) > 1e-6) p.push(last);
  return { p, L, d };
};
TR.glyph = (set, key) => (TRACE.sets[set] || { glyphs: {} }).glyphs[key];
TR.geo = (set, key) => {
  const id = set + ':' + key;
  if (!TR.geoC[id]) TR.geoC[id] = { s: TR.glyph(set, key).s.map(TR.stroke) };
  return TR.geoC[id];
};
// the point at arc length s of a stroke, and the unit direction there
TR.at = (st, s) => {
  const i = Math.max(0, Math.min(st.p.length - 1, Math.round(s)));
  return st.p[i];
};
TR.dir = (st, s) => {
  const a = TR.at(st, s - 1.5), b = TR.at(st, s + 1.5), d = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  return [(b[0] - a[0]) / d, (b[1] - a[1]) / d];
};
// svg path of a stroke from its start to arc length s (the filled part)
TR.partD = (st, s) => {
  const n = Math.max(2, Math.min(st.p.length, Math.round(s) + 1));
  return 'M' + st.p.slice(0, n).map(([x, y]) => x.toFixed(1) + ' ' + y.toFixed(1)).join('L');
};

// ---- checker ----
// A tracker for one touch along stroke st: add(x, y) per finger point (box units), res() gives the verdict (see the header).
TR.track = (st, tol, s0 = 0) => {
  const P = st.p, N = P.length;
  const t = { s: s0, s0, first: null, last: null, len: 0, on: 0, off: 0, far: 0 };
  const visit = (x, y, w) => {
    if (st.dot) {
      t.far = Math.max(t.far, Math.hypot(P[0][0] - x, P[0][1] - y));
      return;
    }
    const lo = Math.max(0, Math.floor(t.s - tol * TR.BACK)), hi = Math.min(N - 1, Math.ceil(t.s + tol * TR.AHEAD));
    let bd = Infinity, bi = -1;
    for (let i = lo; i <= hi; i++) {
      const dx = P[i][0] - x, dy = P[i][1] - y, d = dx * dx + dy * dy;
      if (d < bd) { bd = d; bi = i; }
    }
    if (Math.sqrt(bd) <= tol) {
      t.on += w;
      t.s = Math.max(t.s, Math.min(st.L, bi));
    } else t.off += w;
  };
  t.add = (x, y) => {
    if (!t.first) {
      t.first = t.last = [x, y];
      visit(x, y, 0);
      return;
    }
    const [ax, ay] = t.last, dx = x - ax, dy = y - ay, d = Math.hypot(dx, dy);
    if (d < 1e-6) return;
    const k = Math.ceil(d / 2);
    for (let i = 1; i <= k; i++) visit(ax + dx * i / k, ay + dy * i / k, d / k);
    t.len += d;
    t.last = [x, y];
  };
  t.res = () => {
    const o = { ok: false, why: 'tap', s: t.s0, len: t.len, off: t.on + t.off ? t.off / (t.on + t.off) : 0 };
    if (!t.first) return o;
    const a = TR.at(st, t.s0), sd = Math.hypot(t.first[0] - a[0], t.first[1] - a[1]), r = TR.START * tol;
    if (st.dot) {
      if (sd <= r && t.far <= r) return Object.assign(o, { ok: true, why: '', s: 0 });
      return Object.assign(o, { why: t.len < TR.TAP ? 'tap' : 'start' });
    }
    if (sd > r) return Object.assign(o, { why: t.len < TR.TAP ? 'tap' : 'start' });
    if (t.len > TR.SCRIB * (st.L - t.s0) + 3 * tol) return Object.assign(o, { why: 'scribble' });
    if (o.off > TR.OFF) return Object.assign(o, { why: 'off' });
    o.s = t.s;
    if (t.s >= st.L - TR.END * tol) return Object.assign(o, { ok: true, why: '' });
    return Object.assign(o, { why: t.s - t.s0 >= TR.PART ? 'part' : 'tap', s: t.s - t.s0 >= TR.PART ? t.s : t.s0 });
  };
  return t;
};
// verdict for a whole list of finger points [[x, y], ...] on stroke st
TR.check = (st, pts, tol, s0 = 0) => {
  const t = TR.track(st, tol, s0);
  for (const [x, y] of pts) t.add(x, y);
  return t.res();
};
// the tolerance for this child: Pre-K 14, K and up 10 (or the question's own)
TR.tol = q => q.tol || (gradeOf() < 0 ? 14 : 10);

// ---- data checks (kind validate; tools/test.js adds the handwriting rules) ----
TR.glyphProblems = (set, key) => {
  const S0 = TRACE.sets[set], p = [];
  if (!S0) return ['trace: no set ' + set];
  const g = S0.glyphs[key];
  if (!g) return ['trace: no glyph ' + set + ' ' + key];
  if (!g.say) p.push('trace ' + key + ': no spoken name');
  if (!Array.isArray(g.s) || g.s.length < 1 || g.s.length > 4) return p.concat('trace ' + key + ': 1 to 4 strokes');
  g.s.forEach((s, i) => {
    const w = 'trace ' + key + ' stroke ' + (i + 1);
    if (!Array.isArray(s) || !s.length) { p.push(w + ': no points'); return; }
    for (const pt of s) {
      if (!Array.isArray(pt) || pt.length < 2 || pt.length > 3 || !pt.slice(0, 2).every(v => typeof v == 'number' && isFinite(v)))
        p.push(w + ': bad point ' + JSON.stringify(pt));
      else if (pt[0] < 0 || pt[0] > 100 || pt[1] < 0 || pt[1] > 100) p.push(w + ': point outside the box ' + pt);
      else if (pt.length == 3 && pt[2] !== 1) p.push(w + ': the third value of a point must be 1 (a corner)');
    }
    for (let k = 1; k < s.length; k++) if (Math.hypot(s[k][0] - s[k - 1][0], s[k][1] - s[k - 1][1]) < 2) p.push(w + ': two points closer than 2');
  });
  return p;
};
TR.qProblems = q => {
  const p = [];
  if (!q.set || !q.g) return ['trace: no set or glyph'];
  p.push(...TR.glyphProblems(q.set, q.g));
  if (q.ans !== 'done') p.push('trace: ans must be done');
  const ps = q.passes || [1, 2, 3];
  if (!Array.isArray(ps) || !ps.length || ps.some(v => ![1, 2, 3].includes(v))) p.push('trace: passes must be guide levels 1-3');
  if (q.tol != null && !(q.tol >= 4 && q.tol <= 25)) p.push('trace: tol out of range');
  return p;
};
TR.name = q => {
  const g = TR.glyph(q.set, q.g);
  return g ? g.say : String(q.g);
};

// ---- generator: skill 'trace' (level 1 digits in Tiny Town) ----
function genTrace(lv) {
  const set = TR.LV[lv] || 'digit', S0 = TRACE.sets[set], key = pick(S0.order), g = S0.glyphs[key];
  // spoken: "the little letter A" (a letter's name is its capital, as abc 1 says it); shown: "the little letter a" (P2-17)
  const what = S0.n + ' ' + g.say, shown = S0.n + ' ' + (set == 'digit' ? g.say : key);
  return pkQ({
    kind: 'trace', set, g: key, ans: 'done', passes: [1, 2, 3],
    html: `<div class="trq">${TR.pic(set, key)}</div>${pkTxt(`Trace the ${esc(shown)}.`)}`,
    say: `Let's write the ${what}! Watch, then trace it with your finger.`,
    hint: { k: 'trace' },
    label: `trace ${set} ${key}`,
  });
}
// the prompt picture: the glyph to copy, and for a digit its number of dots (zero: an empty face)
TR.pic = (set, key) => TR.glyphSVG(set, key, 'trq-g') + (set == 'digit' ? `<span class="trq-d">${VIZ.dots(+key, 'dice')}</span>` : '');
// a glyph drawn from its strokes (the same model the child traces, not the font's), cropped to its strokes and the set's lines
TR.glyphSVG = (set, key, cls) => {
  const geo = TR.geo(set, key), L = TRACE.sets[set].lines, xs = geo.s.flatMap(s => s.p.map(p => p[0]));
  const x0 = Math.floor(Math.min(...xs) - 6), x1 = Math.ceil(Math.max(...xs) + 6), y0 = L.top - 6, y1 = (L.desc || L.base) + 6;
  return `<svg class="${cls}" viewBox="${x0} ${y0} ${x1 - x0} ${y1 - y0}" aria-hidden="true" focusable="false">`
    + geo.s.map(s => `<path d="${s.d}"/>`).join('') + '</svg>';
};
// a round: TR.N different glyphs of the level, in teaching order; each is genQ-reproducible (sk, lv, seed)
function traceRound(lv) {
  const order = TRACE.sets[TR.LV[lv] || 'digit'].order;
  const keys = shuffle(order.slice()).slice(0, TR.N).sort((a, b) => order.indexOf(a) - order.indexOf(b));
  return keys.map(k => {
    let q = null;
    for (let s = R(1, 2e9), t = 0; t < 400 && !(q && q.g === k); t++, s++) q = genQ('trace', lv, s >>> 0);
    return q;
  });
}

// ---- the board ----
const TR_SAY = {
  turn: 'Your turn! Start at the green dot.',
  p2: 'Great! Now trace the dots.',
  p3: 'Now you write it! Start at the green dot.',
  start: 'Start at the green dot.',
  off: 'Follow the arrow.',
  part: 'Keep going!',
  watch: 'Watch the pen.',
  lead: 'Follow the yellow ball.',
};
// markup of the input area: the board (svg in box units) with the handwriting lines, pass pips, glyph stars
TR.board = q => {
  const S0 = TRACE.sets[q.set], L = S0.lines, nm = esc(S0.n + ' ' + TR.name(q));
  const ln = (y, c) => `<line class="${c}" x1="0" y1="${y}" x2="100" y2="${y}"/>`;
  const lines = ln(L.top, 'tr-l') + ln(L.mid, 'tr-l tr-lm') + ln(L.base, 'tr-l tr-lb') + (L.desc ? ln(L.desc, 'tr-l tr-lm') : '');
  const pips = (q.passes || [1, 2, 3]).map((v, i) => `<i data-i="${i}"></i>`).join('');
  return `<div class="trw" id="trw" data-g="${esc(q.g)}"><svg class="trb" id="trb" viewBox="0 0 100 100" role="img" aria-label="Trace the ${nm}">`
    + `<g class="tr-ln" aria-hidden="true">${lines}</g><g id="trg"></g><g id="trd" class="tr-dn"></g><g id="trx"></g><g id="tri"></g>`
    + `<g id="tra"></g><g id="trs"></g><circle id="trp" class="tr-pen" r="4.4" cx="0" cy="0" style="display:none"/></svg>`
    + `<div class="tr-pips" aria-hidden="true">${pips}</div><div class="tr-stars" id="trst" aria-hidden="true"></div></div>`;
};
TR.stop = () => {
  const c = TR.cur;
  if (!c) return;
  c.dead = true;
  c.timers.forEach(clearTimeout);
  if (c.raf) cancelAnimationFrame(c.raf);
  TR.cur = null;
};
// a timeout that dies with the board
TR.later = (c, f, ms) => {
  const id = setTimeout(() => { if (!c.dead && TR.cur === c) f(); }, ms);
  c.timers.push(id);
  return id;
};
TR.bind = (q, st, submit) => {
  TR.stop();
  const svg = $('#trb');
  if (!svg) return;
  const geo = TR.geo(q.set, q.g);
  const c = TR.cur = {
    q, st, submit, svg, geo, tol: TR.tol(q), passes: q.passes || [1, 2, 3], pass: 0, level: 1, k: 0, part: 0,
    misses: 0, sm: 0, tier: 0, arr: false, ptr: null, busy: false, timers: [], raf: 0, anim: null, tok: 0, dead: false,
  };
  const play = svg.closest('.play');
  if (play) play.classList.add('tr-play');
  svg.onpointerdown = e => TR.down(c, e);
  svg.onpointermove = e => TR.move(c, e);
  svg.onpointerup = e => TR.up(c, e, false);
  svg.onpointercancel = e => TR.up(c, e, true);
  svg.onlostpointercapture = e => { if (c.ptr && c.ptr.id === e.pointerId) TR.up(c, e, true); };
  svg.oncontextmenu = e => e.preventDefault();
  TR.startPass(c, 0);
};
TR.startPass = (c, i) => {
  c.pass = i;
  c.level = c.passes[i];
  c.k = 0; c.part = 0; c.sm = 0; c.tier = 0; c.arr = false; c.busy = false;
  $('#trd').innerHTML = '';
  $$('.tr-pips i').forEach((e, j) => { e.className = j < i ? 'dn' : j == i ? 'on' : ''; });
  TR.draw(c);
  if (c.level == 1) {
    c.busy = true;
    const tok = c.tok;
    TR.later(c, () => c.busy && c.tok === tok && TR.demo(c, c.geo.s.map((_, j) => j), () => {
      c.busy = false;
      TR.draw(c);
      TR.bounce(c);
      if (i == 0) say(TR_SAY.turn, null, null, true);
    }), 700);
  } else {
    say(c.level == 2 ? TR_SAY.p2 : TR_SAY.p3);
    TR.bounce(c);
  }
};
// redraw guide, done strokes, arrows and start dots for the current state
TR.draw = c => {
  const st = c.geo.s, lv = c.level, k = c.k, ns = st.length;
  // guide: level 1 outlined strokes, level 2 dotted; tier 2 dots the stroke to trace even at level 3
  let g = '';
  st.forEach((s, j) => {
    if (lv == 1) g += `<path class="tr-band" d="${s.d}"/><path class="tr-bandi" d="${s.d}"/>`;
    else if (lv == 2 || (j == k && c.tier >= 2)) g += `<path class="tr-dot" d="${s.d}"/>`;
  });
  $('#trg').innerHTML = g;
  // done strokes of this pass, and the part of the current one already traced
  let d = '';
  for (let j = 0; j < Math.min(k, ns); j++) d += TR.fillHTML(st[j].d, j == k - 1 && c.justDone ? ' in' : '');
  if (k < ns && c.part > 0) d += TR.fillHTML(TR.partD(st[k], c.part), ' part');
  $('#trd').innerHTML = d;
  c.justDone = false;
  // arrows along the rest of the stroke to trace: all along it at level 1 (or after a miss / with the tier-1 hint), one at its
  // start at level 2; none while the tier-2 ball shows the way (levels 2 and 3)
  let a = '';
  const lead = c.tier >= 2 && lv > 1;
  if (k < ns && !st[k].dot && !lead && (lv <= 2 || c.arr || c.tier)) {
    const s = st[k], L = s.L, at = [], x0 = c.part + Math.min(13, (L - c.part) / 2);
    if (lv == 1 || c.arr || c.tier) for (let x = x0; x < L - 6 || !at.length; x += 24) at.push(x);
    else at.push(x0);
    a = at.map((x, i) => {
      const [px, py] = TR.at(s, x), [dx, dy] = TR.dir(s, x), ang = Math.atan2(dy, dx) * 180 / Math.PI;
      return `<g transform="translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${ang.toFixed(0)})"><path class="tr-arr" style="--i:${i}" d="M-2.2 -3.2L1.8 0L-2.2 3.2"/></g>`;
    }).join('');
  }
  $('#tra').innerHTML = a;
  // start dots: the stroke to trace (big, numbered); at level 1 also the later strokes (small), unless one sits on an earlier dot
  let sd = '';
  for (let j = ns - 1; j >= k; j--) {
    if (j > k && lv > 1) continue;
    const p0 = j == k && c.part > 0 ? TR.at(st[j], c.part) : st[j].p[0];
    const hidden = st.slice(k, j).some(o => Math.hypot(o.p[0][0] - p0[0], o.p[0][1] - p0[1]) < 9);
    if (j > k && hidden) continue;
    const on = j == k, r = on ? 6.4 : 4.6;
    sd += `<g class="tr-sd${on ? ' on' : ''}" data-j="${j}" transform="translate(${p0[0].toFixed(1)} ${p0[1].toFixed(1)})">`
      + `<g class="tr-sdi">${on ? '<circle class="tr-sdr" r="9"/>' : ''}<circle class="tr-sdc" r="${r}"/>`
      + (ns > 1 && !(on && c.part > 0) ? `<text class="tr-sdt${on ? '' : ' sm'}" y="0.35">${j + 1}</text>` : '') + '</g></g>';
  }
  $('#trs').innerHTML = sd;
};
TR.fillHTML = (d, cls) => `<path class="tr-fl${cls}" d="${d}" transform="translate(0 1.3)"/><path class="tr-f${cls}" d="${d}"/>`;
// a gentle one-time hop of the start dot (your turn)
TR.bounce = c => {
  const e = $('#trs .tr-sd.on .tr-sdi');
  if (!e) return;
  e.classList.remove('hop', 'pulse');
  void e.getBoundingClientRect();
  e.classList.add('hop');
};

// ---- animations (requestAnimationFrame, one at a time; TR.stop cancels) ----
TR.anim = (c, step, done) => {
  if (c.raf) cancelAnimationFrame(c.raf);
  const t0 = performance.now();
  const f = () => { // performance.now(), not the frame time: the smoke clock speeds up performance.now
    if (c.dead) return;
    if (step(performance.now() - t0)) c.raf = requestAnimationFrame(f);
    else { c.raf = 0; if (done) done(); }
  };
  c.raf = requestAnimationFrame(f);
};
TR.pen = (p, show) => {
  const e = $('#trp');
  if (!e) return;
  e.style.display = show ? '' : 'none';
  if (p) e.setAttribute('transform', `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})`);
};
// the pen draws strokes js (indexes) in order: speed 60 units a second, a short rest between strokes; then fades
TR.demo = (c, js, done) => {
  const x = $('#trx'), st = c.geo.s, tok = ++c.tok;
  c.anim = 'demo';
  x.innerHTML = '';
  x.classList.remove('fade');
  let j = 0, path = null;
  const next = () => {
    if (c.tok !== tok) return;
    if (j >= js.length) {
      TR.pen(null, false);
      x.classList.add('fade');
      TR.later(c, () => {
        if (c.tok !== tok) return;
        x.innerHTML = '';
        x.classList.remove('fade');
        c.anim = null;
        if (done) done();
      }, 450);
      return;
    }
    const s = st[js[j]], dur = Math.max(500, s.L / 60 * 1000);
    x.insertAdjacentHTML('beforeend', `<path class="tr-demo" d="M${s.p[0][0]} ${s.p[0][1]}"/>`);
    path = x.lastElementChild;
    TR.anim(c, ms => {
      const u = Math.min(1, ms / dur), at = u * s.L;
      path.setAttribute('d', s.dot ? s.d : TR.partD(s, at));
      TR.pen(TR.at(s, at), true);
      return u < 1;
    }, () => { j++; TR.later(c, next, 260); });
  };
  next();
};
TR.stopAnim = c => {
  c.tok++; // pending steps of a demo see the new token and stop
  if (c.raf) cancelAnimationFrame(c.raf);
  c.raf = 0;
  c.anim = null;
  const x = $('#trx');
  if (x) x.innerHTML = '';
  TR.pen(null, false);
};
// tier 2: the yellow ball runs along the stroke (and back to its start), and while the finger traces it stays just ahead
TR.lead = c => {
  const s = c.geo.s[c.k];
  if (!s || s.dot) return;
  c.anim = 'lead';
  c.tok++;
  let auto = c.part, wait = 0, last = 0;
  TR.anim(c, ms => {
    const dt = Math.min(64, ms - last);
    last = ms;
    if (c.ptr && c.ptr.t) auto = Math.min(s.L, Math.max(auto - 0.5, c.ptr.t.s + 12));
    else if (wait > 0) { wait -= dt; if (wait <= 0) auto = c.part; }
    else { auto += dt / 1000 * 40; if (auto >= s.L) { auto = s.L; wait = 700; } }
    TR.pen(TR.at(s, auto), true);
    return true;
  });
};

// ---- the finger ----
TR.pt = (c, e) => {
  const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(c.inv);
  return [p.x, p.y];
};
TR.palm = e => e.pointerType == 'touch' && Math.max(e.width || 0, e.height || 0) > TR.PALM;
TR.down = (c, e) => {
  if (c.dead || c.st.lock || c.k >= c.geo.s.length) return;
  if (e.pointerType == 'mouse' && e.button !== 0) return;
  if (TR.palm(e)) return;
  e.preventDefault();
  c.inv = c.svg.getScreenCTM().inverse();
  const p = TR.pt(c, e), s = c.geo.s[c.k];
  const want = c.part > 0 ? TR.at(s, c.part) : s.p[0], dist = q => Math.hypot(q[0] - want[0], q[1] - want[1]);
  if (c.ptr) {
    // a second touch: take it instead only if the first has not moved and this one is nearer the dot (a palm came first)
    if (c.ptr.t.len < 3 && dist(p) < dist(c.ptr.p0)) TR.drop(c);
    else return;
  }
  if (c.busy || c.anim == 'demo') { TR.stopAnim(c); c.busy = false; TR.draw(c); }
  // carry on from a lifted trace, or start the stroke again from its start dot
  let s0 = 0;
  if (c.part > 0) {
    if (dist(p) <= TR.START * c.tol) s0 = c.part;
    else if (Math.hypot(p[0] - s.p[0][0], p[1] - s.p[0][1]) <= TR.START * c.tol) { c.part = 0; TR.draw(c); }
    else s0 = c.part;
  }
  const t = TR.track(s, c.tol, s0);
  t.add(p[0], p[1]);
  $('#tri').insertAdjacentHTML('beforeend', '<path class="tr-ink" d=""/>');
  c.ptr = { id: e.pointerId, t, p0: p, pts: [p], el: $('#tri').lastElementChild };
  try { c.svg.setPointerCapture(e.pointerId); } catch (er) { /* a synthetic pointer */ }
  TR.ink(c);
};
TR.move = (c, e) => {
  if (!c.ptr || c.ptr.id !== e.pointerId) return;
  e.preventDefault();
  const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [];
  for (const ev of evs.length ? evs : [e]) {
    const p = TR.pt(c, ev);
    c.ptr.t.add(p[0], p[1]);
    c.ptr.pts.push(p);
  }
  TR.ink(c);
};
TR.ink = c => {
  const pts = c.ptr.pts;
  c.ptr.el.setAttribute('d', 'M' + pts.map(([x, y]) => x.toFixed(1) + ' ' + y.toFixed(1)).join('L') + (pts.length == 1 ? 'h0' : ''));
};
// the finger's ink fades away (after a stroke is done, missed or dropped)
TR.fadeInk = (c, el) => {
  el.classList.add('fade');
  TR.later(c, () => el.remove(), 420);
};
TR.drop = c => {
  if (!c.ptr) return;
  TR.fadeInk(c, c.ptr.el);
  try { c.svg.releasePointerCapture(c.ptr.id); } catch (er) { /* already released */ }
  c.ptr = null;
};
TR.up = (c, e, cancel) => {
  if (!c.ptr || c.ptr.id !== e.pointerId || c.dead) return;
  const ptr = c.ptr;
  c.ptr = null;
  TR.fadeInk(c, ptr.el);
  if (cancel) return;
  TR.result(c, ptr.t.res());
};
// what a finished touch did
TR.result = (c, r) => {
  const st = c.geo.s;
  if (r.ok) {
    c.k++;
    c.part = 0; c.sm = 0; c.tier = 0; c.arr = false; c.justDone = true;
    TR.stopAnim(c);
    SFX.key(Math.min(9, c.k + c.pass * 2));
    TR.draw(c);
    if (c.k >= st.length) TR.passDone(c);
    else TR.bounce(c);
    return;
  }
  if (r.why == 'part') {
    c.part = r.s;
    TR.draw(c);
    if (c.tier >= 2) TR.lead(c);
    say(TR_SAY.part);
    return;
  }
  if (r.why == 'tap') {
    TR.pulse(c, false);
    return;
  }
  // a miss: never red. The dot pulses, the arrows run along the stroke, a soft sound and a tip; hints rise by themselves
  c.misses++;
  c.sm++;
  c.arr = true;
  SFX.del();
  if (c.sm >= 3 && c.tier < 2) TR.hintTier(c, 2);
  else if (c.sm == 2 && c.tier < 1) TR.hintTier(c, 1);
  else {
    TR.draw(c);
    if (c.tier >= 2) TR.lead(c);
    say(r.why == 'start' ? TR_SAY.start : TR_SAY.off);
  }
  TR.pulse(c, true);
};
// the start dot pulses; with arrows: they run along the stroke
TR.pulse = (c, arrows) => {
  const e = $('#trs .tr-sd.on .tr-sdi');
  if (e) { e.classList.remove('hop', 'pulse'); void e.getBoundingClientRect(); e.classList.add('pulse'); }
  if (arrows) $$('#tra .tr-arr').forEach(a => { a.classList.remove('go'); void a.getBoundingClientRect(); a.classList.add('go'); });
};
TR.passDone = c => {
  c.busy = true;
  const dn = $('#trd');
  dn.classList.remove('pop');
  void dn.getBoundingClientRect();
  dn.classList.add('pop');
  if (c.pass + 1 < c.passes.length) {
    SFX.magic();
    TR.later(c, () => TR.startPass(c, c.pass + 1), 1000);
  } else TR.later(c, () => TR.finish(c), 450);
};
// every pass traced: the glyph's stars, then the answer (fewer than 2 stars counts as a second try in the round)
TR.finish = c => {
  const stars = c.misses == 0 ? 3 : c.misses <= 2 ? 2 : 1;
  c.stars = stars;
  $$('.tr-pips i').forEach(e => { e.className = 'dn'; });
  const box = $('#trst');
  if (box) box.innerHTML = [0, 1, 2].map(i => `<span class="tr-star${i < stars ? ' lit' : ''}" style="--i:${i}">${ico('star', 40)}</span>`).join('');
  if (stars < 2 && !c.st.tries) c.st.tries = 1;
  TR.later(c, () => c.submit('done', null), 700);
};

// ---- hints: tier 1 the pen draws the stroke to trace, tier 2 a ball to follow over a dotted guide ----
TR.hintTier = (c, tier) => {
  c.tier = Math.max(c.tier, tier);
  c.arr = true;
  TR.stopAnim(c);
  TR.draw(c);
  if (c.tier >= 2) {
    say(TR_SAY.lead);
    TR.lead(c);
  } else {
    say(TR_SAY.watch);
    c.busy = true;
    TR.demo(c, [c.k], () => { c.busy = false; TR.draw(c); TR.bounce(c); });
  }
};
// hintHTML (39-hints.js) for kind trace: the hint happens on the board; the hint panel stays empty
TR.hint = q => {
  const c = TR.cur;
  if (!c || c.q !== q || c.dead || c.k >= c.geo.s.length) return '';
  TR.hintTier(c, Math.min(2, c.tier + 1));
  return '';
};
// the engine's reveal (never reached: a glyph always ends right) and retry: show the whole glyph / start the pass again
TR.reveal = () => {
  const c = TR.cur;
  if (c) TR.demo(c, c.geo.s.map((_, j) => j));
};
TR.retry = () => {
  const c = TR.cur;
  if (c) TR.startPass(c, c.pass);
};
// the entry of the question-kind registry (49-kinds.js: KIND.trace)
const TRK = {
  render: q => TR.board(q),
  bind: (q, st, submit) => TR.bind(q, st, submit),
  right: () => { const w = $('#trw'); if (w) w.classList.add('ok'); },
  retry: (q, st, ready) => { TR.retry(); if (ready) ready(); },
  reveal: () => TR.reveal(),
  spoken: q => TR.name(q),
  validate: q => TR.qProblems(q),
};
