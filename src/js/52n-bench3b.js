/* ---------- TEACH-3b: the workbench of the grade 3-5 lessons that had no fitting model (part teach35, after 52j; TEACH-PLAN-2 batch 3) ----------
   The stops TEACH-3 left out (story problems, graphs, shapes, angles, the coordinate grid, scales, elapsed time, in and out tables, dividing
   by a 2-digit number, mixed numbers, unit fraction division, converting both ways) get their lessons in 52o-lessons3b.js. Their models
   are keys of K2MM (49b-kinds2.js), added from here like bars2 and pvc (52i-bench35.js); Practice never uses them. Every model is drawn
   from the shared tokens (src/css/52n-teach3b.css), every control is a 48 px button with its own spoken name, and each is a "raw" model:
   the lesson submits its state, the goal (LSGOAL) checks it, and a value a misconception predicts is turned back into a state (of) to
   draw the pet's build in Check me.
     graph   a bar graph with a fixed scale; one bar (or every bar, in Explore) has a stepper (a line of the scale a step)
     plot    a line plot of lengths (fourths, halves or eighths): a stepper a mark puts its dots on
     ang     an angle the child opens with steppers (5 and 15 degrees), plain or on a protractor with its two scales
     xy      a point on a coordinate grid: steppers across and up
     dial    a kitchen scale or a measuring jug: a stepper moves the needle (or the water) one mark
     tape    a bar model: equal boxes of a story, a stepper for the boxes and one for what is in each (an extra box for a second step)
     left    a bar model of a division story: the full groups the child counts, and what is left over
     rule    an in and out rule: a sign (+ − × ÷) and a number; the table works the child's rule out beside the real outs
     props   a quadrilateral and four facts to tap (four sides, all sides equal, four right angles, both pairs of sides parallel)
     sym     a shape and four fold lines to tap (up and down, across, the two slants)
     qtry    dividing by a 2-digit number: try how many fit (a stepper of ones and tens); the work below says too much, more fits, or right
     mixb    mixed numbers as whole bars and parts, with a trade (parts into a whole) and a break (a whole into parts)
     cut     whole bars cut into equal parts: a stepper sets how many parts each bar is cut into */
// the misconception codes of these lessons (TEACH-PLAN-2 system C): what the pet says when it repairs the idea, the reason the child builds
// from tiles (LS_WHY: its last three words are the tiles) and the line a grown-up reads (LSREP.NOTE)
Object.assign(BUGS, {
  scale: {d: 'counts the squares or pictures of a graph, not what each one stands for', say: 'Each line stands for more than one. Count by the scale.'},
  dotsVal: {d: 'counts the dots of a line plot instead of adding their lengths', say: 'Each dot has a length. Add the lengths.'},
  angSw: {d: 'mixes up acute and obtuse angles', say: 'Acute is less than a square corner. Obtuse is more.'},
  rtAng: {d: 'calls an angle close to a square corner a right angle', say: 'A right angle is exactly a square corner.'},
  proto: {d: 'reads the other scale of the protractor', say: 'Start from the zero on the side the angle starts.'},
  sup: {d: 'takes a part from the wrong whole (a straight angle for a right angle)', say: 'Check the whole first: a square corner or a straight line.'},
  swapXY: {d: 'swaps across and up on the coordinate grid', say: 'Go across first, then up.'},
  gridOff: {d: 'counts the grid lines from one instead of from zero', say: 'The corner is zero. Count the jumps from there.'},
  mark1: {d: 'counts each small mark of a scale as one', say: 'Each mark is a step of the scale. Count by the step.'},
  rEnd: {d: 'reads the end of the ruler mark when the object does not start at zero', say: 'Start where the object starts, not at the end.'},
  hr100: {d: 'counts an hour as a hundred minutes', say: 'Count up to the next hour first. An hour has sixty minutes.'},
  minOnly: {d: 'takes away only the minutes and forgets the hour', say: 'Count the minutes to the hour, then past it.'},
  wrongOp: {d: 'uses the wrong operation for the story', say: 'Picture the story first. Then choose what to do.'},
  oneStep: {d: 'stops after the first step of a two-step story', say: 'This story has two steps. Finish both.'},
  remDrop: {d: 'leaves out the leftovers: gives the full groups whatever the story asks', say: 'Read the question again. What happens to the leftovers?'},
  remUp: {d: 'counts a group for leftovers that cannot fill one', say: 'Only full groups count here. The leftovers are not enough.'},
  unitOnly: {d: 'finds one part of the amount but not all the parts asked for', say: 'Find one part, then take as many parts as the top says.'},
  fracTop: {d: 'multiplies by the top number only', say: 'Divide by the bottom number too.'},
  rowJump: {d: 'follows the jump down the out column instead of the rule from in to out', say: 'The rule goes across, from in to out.'},
  propMix: {d: 'mixes up which shapes have equal sides and which have right angles', say: 'Check the sides and the corners one at a time.'},
  diag: {d: 'thinks every slanted line through a shape folds it in half', say: 'Fold it in your mind. Both halves must match.'},
  axis: {d: 'counts only the up and down and the across fold lines', say: 'Slanted lines can fold a shape too.'},
  flipDiv: {d: 'divides the wrong way round with a unit fraction', say: 'How many small pieces fit? Count them.'},
  mulFrac: {d: 'multiplies when the problem divides by a fraction', say: 'Dividing cuts into pieces. Count the pieces.'},
  mixSub: {d: 'takes the smaller part from the bigger one instead of breaking a whole', say: 'Not enough parts? Break one whole into parts.'},
  convDir: {d: 'multiplies when changing to a bigger unit', say: 'A bigger unit needs fewer of it. Divide.'},
});
Object.assign(LS_WHY, {
  scale: 'Count by the scale', dotsVal: 'Add the lengths of the dots', angSw: 'Acute is less than a right angle', rtAng: 'A right angle is exactly square',
  proto: 'Count up from the zero', sup: 'Check which whole it is', swapXY: 'Go across before up', gridOff: 'Start counting at zero',
  mark1: 'Count by the step size', rEnd: 'Start where it starts', hr100: 'Count to the hour first', minOnly: 'Count the hour too',
  wrongOp: 'Picture the story first', oneStep: 'Finish the second step', remDrop: 'Think about the leftovers', remUp: 'Only full groups count',
  unitOnly: 'Take as many parts', fracTop: 'Divide by the bottom', rowJump: 'The rule goes across', propMix: 'Check sides and corners',
  diag: 'Both halves must match', axis: 'Slanted lines can fold', flipDiv: 'Count the pieces that fit', mulFrac: 'Cut it into pieces',
  mixSub: 'Break a whole into parts', convDir: 'Bigger units need fewer',
});
if (typeof LSREP != 'undefined') Object.assign(LSREP.NOTE, {
  scale: 'sometimes counts the squares of a graph instead of reading its scale', dotsVal: 'sometimes counts the dots of a line plot instead of adding the lengths',
  angSw: 'sometimes mixes up acute and obtuse angles', rtAng: 'sometimes calls an angle close to a square corner a right angle',
  proto: 'sometimes reads the other scale of a protractor', sup: 'sometimes takes an angle from the wrong whole (180 for 90)',
  swapXY: 'sometimes swaps across and up on a grid', gridOff: 'sometimes counts grid lines from 1 instead of 0', mark1: 'sometimes counts each mark of a scale as one',
  rEnd: 'sometimes reads a ruler at the end without checking where the object starts', hr100: 'sometimes counts an hour as 100 minutes',
  minOnly: 'sometimes takes away only the minutes of two times', wrongOp: 'sometimes uses the wrong operation in a story problem',
  oneStep: 'sometimes stops after the first step of a two-step story', remDrop: 'sometimes forgets the leftovers in a division story',
  remUp: 'sometimes counts an extra group for leftovers', unitOnly: 'sometimes finds one part of an amount but not the fraction asked for',
  fracTop: 'sometimes multiplies by the top of a fraction and forgets the bottom', rowJump: 'sometimes follows the out column instead of the rule',
  propMix: 'sometimes mixes up the sides and the angles of shapes', diag: 'sometimes thinks every slanted line is a line of symmetry',
  axis: 'sometimes misses slanted lines of symmetry', flipDiv: 'sometimes divides by a unit fraction the wrong way round',
  mulFrac: 'sometimes multiplies when dividing by a fraction', mixSub: 'sometimes takes the smaller part from the bigger in mixed numbers',
  convDir: 'sometimes multiplies when changing to a bigger unit',
});

/* ---- drawings (the shared viz classes of src/css/32-viz.css; numbers are drawn at the viz text size) ---- */
const ls3bF = v => Math.round(v * 10) / 10;
const ls3bSvg = (k, w, h, body, label) => `<svg class="viz viz-${k}" viewBox="0 0 ${ls3bF(w)} ${ls3bF(h)}" style="--vw:${ls3bF(w)}" role="img" aria-label="${label}">${body}</svg>`;
// a bar graph with a fixed number of lines (top), so the axis does not change while a bar is built; ed: the bars being built (second colour)
function ls3bGraph(names, vals, sc, top, ed = []) {
  const n = names.length, rh = Math.max(16, Math.min(26, Math.floor(170 / top))), pitch = Math.min(70, Math.floor(268 / n)), L = 40, T = 12, base = T + top * rh;
  const w = L + n * pitch + 8, bw = Math.round(pitch * .58);
  let g = '', y = '', b = '';
  for (let k = 0; k <= top; k++) {
    g += `M${L} ${base - k * rh}h${n * pitch + 4}`;
    if (top <= 6 || k % 2 == 0) y += `<text class="vta" x="${L - 6}" y="${base - k * rh + 5}">${k * sc}</text>`;
  }
  names.forEach((nm, i) => {
    const x = L + i * pitch + (pitch - bw) / 2, h = vals[i] / sc * rh;
    if (h > 0) b += `<rect class="${ed.includes(i) ? 'v2' : 'v1'} vbar" x="${ls3bF(x)}" y="${ls3bF(base - h)}" width="${bw}" height="${ls3bF(h)}" rx="3"/>`;
    b += `<text x="${ls3bF(x + bw / 2)}" y="${base + 21}">${esc(nm)}</text>`;
  });
  return ls3bSvg('bar3b', w, base + 30, `<path class="vgl" d="${g}"/><path class="va" d="M${L} ${T - 4}V${base}H${w - 2}"/>${y}${b}`, 'bar graph');
}
// a protractor with its two scales (outer: 0 on the right; inner: 0 on the left), an angle of deg whose first side is on the right
// (left false) or the left; o.ray: draw the angle (false: only the protractor)
function ls3bProto(deg, left) {
  const cx = 150, cy = 146, R = 124, at = (a, r) => [ls3bF(cx + r * Math.cos(a * Math.PI / 180)), ls3bF(cy - r * Math.sin(a * Math.PI / 180))];
  let t = '', tx = '';
  for (let a = 0; a <= 180; a += 10) {
    const m = a % 30 == 0, [x1, y1] = at(a, R - (m ? 16 : 9)), [x2, y2] = at(a, R);
    t += `M${x1} ${y1}L${x2} ${y2}`;
    if (m) { const b = Math.min(172, Math.max(8, a)), [ox, oy] = at(b, R - 30), [ix, iy] = at(b, R - 56);
      tx += `<text class="ls3b-lab" x="${ox}" y="${ls3bF(oy + 6)}">${a}</text><text class="ls3b-lab ls3b-in" x="${ix}" y="${ls3bF(iy + 6)}">${180 - a}</text>`; }
  }
  const a0 = left ? 180 : 0, a1 = left ? 180 - deg : deg, [p0x, p0y] = at(a0, R + 14), [p1x, p1y] = at(a1, R + 14), [w0x, w0y] = at(a0, 34), [w1x, w1y] = at(a1, 34);
  const wedge = `<path class="vwg" d="M${cx} ${cy}L${w0x} ${w0y}A34 34 0 0 ${left ? 1 : 0} ${w1x} ${w1y}z"/>`;
  return ls3bSvg('ang', 300, 160, `<path class="vru" d="M${cx - R - 8} ${cy}A${R + 8} ${R + 8} 0 0 1 ${cx + R + 8} ${cy}z"/><path class="vk" d="${t}"/>${wedge}`
    + `<path class="va ls3b-ray" d="M${p0x} ${p0y}L${cx} ${cy}L${p1x} ${p1y}"/>${tx}<circle class="vpin" cx="${cx}" cy="${cy}" r="5"/>`, 'protractor');
}
// a bar model (tape): g equal boxes each holding n (n shown, or '?'), o.ex: one more box of another colour (a second step: [value, '+' | '−']),
// o.tot: the whole above the tape (a number or '?'), o.q: the boxes' numbers hidden ('?')
function ls3bTape(g, n, o = {}) {
  const ex = o.ex, W = 290, X = 6, Y = o.tot != null ? 34 : 8, H = 46, k = o.rest ? 4 : g + (ex ? 1.4 : 0), bw = (W - 2 * X) / Math.max(k, 1);
  let body = '';
  for (let i = 0; i < g; i++) body += `<rect class="v1" x="${ls3bF(X + i * bw)}" y="${Y}" width="${ls3bF(bw)}" height="${H}" rx="4"/>`
    + (bw >= 26 ? `<text class="vw" x="${ls3bF(X + i * bw + bw / 2)}" y="${Y + 30}">${o.q ? '?' : n}</text>` : '');
  if (o.rest) body += `<rect class="vo ls3b-rest" x="${ls3bF(X + bw)}" y="${Y}" width="${ls3bF(W - 2 * X - bw)}" height="${H}" rx="4"/><text x="${ls3bF((W + bw) / 2)}" y="${Y + 30}">?</text>`;
  if (ex) body += `<rect class="${ex[1] == '−' ? 'vo ls3b-take' : 'v2'}" x="${ls3bF(X + g * bw)}" y="${Y}" width="${ls3bF(1.4 * bw)}" height="${H}" rx="4"/>`
    + `<text x="${ls3bF(X + g * bw + .7 * bw)}" y="${Y + 30}">${ex[1]}${ex[0]}</text>`;
  const tw = o.rest ? W - 2 * X : g * bw;
  if (o.tot != null) body += `<path class="vk" d="M${X} ${Y - 6}v-10H${ls3bF(X + tw)}v10"/><text x="${ls3bF(X + tw / 2)}" y="${Y - 20}">${o.tot}</text>`;
  return ls3bSvg('tape', W, Y + H + 6, body, 'bar model');
}
// a division story's bar model: g full groups of s, and the leftover of T (or the groups that do not fit, marked)
function ls3bLeft(T, s, g) {
  const W = 290, X = 4, Y = 8, H = 44, n = Math.max(g, Math.ceil(T / s)), bw = Math.min(56, (W - 2 * X) / Math.max(n, 1));
  let body = '', left = T;
  for (let i = 0; i < n; i++) {
    const full = left >= s, have = Math.max(0, Math.min(s, left)), inG = i < g;
    left -= s;
    const cls = !inG ? 'vo ls3b-take' : full ? 'v1' : have ? 'v2' : 'vo';
    body += `<rect class="${cls}" x="${ls3bF(X + i * bw)}" y="${Y}" width="${ls3bF(bw - 4)}" height="${H}" rx="4"/>`
      + `<text class="${cls == 'v1' ? 'vw' : ''}" x="${ls3bF(X + i * bw + bw / 2 - 2)}" y="${Y + 29}">${inG ? have : have || ''}</text>`;
  }
  return ls3bSvg('tape', W, Y + H + 6, body, 'groups and leftovers');
}
// a bar cut into d boxes, each holding T / d, the first n shaded (fraction of an amount)
function ls3bFracTape(T, d, n) {
  const W = 290, X = 6, Y = 34, H = 46, bw = (W - 2 * X) / d;
  let body = `<path class="vk" d="M${X} ${Y - 6}v-10H${W - X}v10"/><text x="${W / 2}" y="${Y - 20}">${T}</text>`;
  for (let i = 0; i < d; i++) body += `<rect class="${i < n ? 'v1' : 'vo'}" x="${ls3bF(X + i * bw)}" y="${Y}" width="${ls3bF(bw)}" height="${H}" rx="4"/>`
    + `<text class="${i < n ? 'vw' : ''}" x="${ls3bF(X + i * bw + bw / 2)}" y="${Y + 30}">?</text>`;
  return ls3bSvg('tape', W, Y + H + 6, body, 'bar model');
}
// a quadrilateral (or a triangle) for the shape lessons, in a 120 by 100 box; right angles get their square marks; lines: fold lines
// to draw through the middle [up and down, across, slant up, slant down]
const LS3B_SH = {
  square: [[20, 10], [100, 10], [100, 90], [20, 90]], rectangle: [[6, 24], [114, 24], [114, 76], [6, 76]], rhombus: [[60, 4], [98, 50], [60, 96], [22, 50]],
  parallelogram: [[32, 22], [114, 22], [88, 78], [6, 78]], trapezoid: [[36, 22], [84, 22], [112, 78], [8, 78]], kite: [[60, 4], [92, 34], [60, 96], [28, 34]],
};
const LS3B_RT = {square: [0, 1, 2, 3], rectangle: [0, 1, 2, 3]};
const LS3B_SHN = {square: 'square', rectangle: 'rectangle', rhombus: 'rhombus', parallelogram: 'parallelogram', trapezoid: 'trapezoid', kite: 'kite'};
function ls3bShape(name, lines = [0, 0, 0, 0], o = {}) {
  const P = LS3B_SH[name], c = [60, 50];
  let body = `<path class="vpo" d="M${P.map(p => p.join(' ')).join('L')}z"/>`;
  for (const i of LS3B_RT[name] || []) {
    const p = P[i], a = P[(i + 1) % 4], b = P[(i + 3) % 4], u = [(a[0] - p[0]) / Math.hypot(a[0] - p[0], a[1] - p[1]) * 9, (a[1] - p[1]) / Math.hypot(a[0] - p[0], a[1] - p[1]) * 9],
      v = [(b[0] - p[0]) / Math.hypot(b[0] - p[0], b[1] - p[1]) * 9, (b[1] - p[1]) / Math.hypot(b[0] - p[0], b[1] - p[1]) * 9];
    body += `<path class="vk" d="M${ls3bF(p[0] + u[0])} ${ls3bF(p[1] + u[1])}l${ls3bF(v[0])} ${ls3bF(v[1])}l${ls3bF(-u[0])} ${ls3bF(-u[1])}"/>`;
  }
  const L = [[[60, -4], [60, 104]], [[-6, 50], [126, 50]], [[8, 102], [112, -2]], [[8, -2], [112, 102]]];
  lines.forEach((on, i) => { if (+on) body += `<path class="ls3b-fold" d="M${L[i][0].join(' ')}L${L[i][1].join(' ')}"/>`; });
  const said = ['up and down', 'across', 'slanted up', 'slanted down'].filter((x, i) => +lines[i]);
  return ls3bSvg('shp', 120, 100, body, LS3B_SHN[name] + (said.length ? ', fold lines: ' + said.join(', ') : '')).replace('viewBox="0 0 120 100"', 'viewBox="-8 -8 136 116"').replace('--vw:120', '--vw:' + (o.w || 170));
}
// an in and out table as HTML (head, rows [in, out]); o.mine: the outs the child's rule gives, beside them, a tick or a cross a row
function ls3bTable(head, rows, o = {}) {
  const th = `<tr><th scope="col">${esc(head[0])}</th><th scope="col">${esc(head[1])}</th>${o.mine ? `<th scope="col">${esc(o.mineHead || 'Your rule')}</th>` : ''}</tr>`;
  return `<table class="ls3b-tab">${th}${rows.map((r, i) => `<tr><td>${r[0]}</td><td>${r[1]}</td>${o.mine ? `<td class="${o.mine[i] === r[1] ? 'ok' : 'no'}">${o.mine[i] == null ? '–' : o.mine[i]}`
    + `<span class="a11y-h">${o.mine[i] === r[1] ? ' matches' : ' does not match'}</span></td>` : ''}</tr>`).join('')}</table>`;
}
const LS3B_OPS = ['+', '−', '×', '÷'];
const ls3bApply = (o, k, x) => (o == 0 ? x + k : o == 1 ? x - k : o == 2 ? x * k : x % k ? null : x / k);
const LS3B_OPSAY = ['plus', 'minus', 'times', 'divided by'];
// a mixed number of bars: w whole bars and p parts of d (p may be d or more before a trade: the parts spill onto more bars)
function ls3bMixBars(w, p, d) {
  const bars = [];
  for (let i = 0; i < w; i++) bars.push(VIZ.fracBar(d, d, {w: 120}));
  let left = p;
  while (left > 0) { bars.push(VIZ.fracBar(Math.min(d, left), d, {w: 120}).replace('class="viz', 'class="viz ls3b-parts')); left -= d; }
  return `<div class="ls3b-bars">${bars.join('') || VIZ.fracBar(0, d, {w: 120})}</div>`;
}

/* ---- the models (keys of K2MM) ---- */
if (typeof K2MM != 'undefined') {
  const bit = (i, l, ic) => `<button class="mmb ls3b-tg" data-i="${i}" data-d="1" aria-label="${esc(l)}">${ic || esc(l)}</button>`;
  const flip = (s, i) => s.map((x, j) => (j == i ? 1 - x : x));
  // a bar graph: m {names, vals (every bar's value), sc (the scale), top (lines), ed (the bars with a stepper)}; state: the lines of each ed bar
  K2MM.graph = {
    raw: true,
    s0: q => q.m.ed.map(() => 0),
    val: (q, s) => (q.m.ed.length == 1 ? s[0] * q.m.sc : s.map(x => x * q.m.sc).join(',')),
    ans: q => q.m.ed.map(i => q.m.vals[i] / q.m.sc),
    step: (q, s, i, d) => { const o = s.slice(); o[i] += d; return o[i] < 0 || o[i] > q.m.top ? null : o; },
    draw: (q, s) => ls3bGraph(q.m.names, q.m.vals.map((v, i) => (q.m.ed.includes(i) ? s[q.m.ed.indexOf(i)] * q.m.sc : v)), q.m.sc, q.m.top, q.m.ed),
    ctl: q => `<div class="mmc mmcol">${q.m.ed.map((b, i) => mmRow(q.m.names[b], i, false)).join('')}</div>`,
    of: (q, v) => String(v).split(',').map(x => Math.round(+x / q.m.sc)),
    fits: (q, v) => String(v).split(',').length == q.m.ed.length && String(v).split(',').every(x => +x >= 0 && +x % q.m.sc == 0 && +x / q.m.sc <= q.m.top),
    miss: (q, s) => (s[0] * q.m.sc > q.m.target ? 'Too tall. Each line counts ' + q.m.sc + '.' : 'Not tall enough. Each line counts ' + q.m.sc + '.'),
  };
  // a line plot: m {den, ks (the marks' numerators, four of them), target (the counts)}; state: the dots on each mark
  K2MM.plot = {
    raw: true,
    s0: q => q.m.ks.map(() => 0),
    val: (q, s) => s.join(','),
    ans: q => q.m.target.slice(),
    step: (q, s, i, d) => { const o = s.slice(); o[i] += d; return o[i] < 0 || o[i] > 6 ? null : o; },
    draw: (q, s) => VIZ.linePlot(q.m.ks.flatMap((k, i) => Array(s[i]).fill(k / q.m.den)), {min: 0, max: q.m.ks[q.m.ks.length - 1] / q.m.den, step: 1 / q.m.den, den: q.m.den, w: 250}),
    ctl: q => `<div class="mmc mmcol">${q.m.ks.map((k, i) => mmRow(ls3bFrTxt(k, q.m.den), i, true)).join('')}</div>`,
    of: (q, v) => String(v).split(',').map(Number),
    fits: (q, v) => String(v).split(',').length == q.m.ks.length && String(v).split(',').every(x => +x >= 0 && +x <= 6),
    miss: () => 'Count the lengths for each mark again.',
  };
  // an angle: m {proto, left, show (write the degrees), kind | target}; state: [degrees], 5 to 180
  K2MM.ang = {
    raw: true,
    s0: q => [q.m.s0 || 30],
    val: (q, s) => s[0],
    ans: q => [q.m.target || {acute: 45, right: 90, obtuse: 135, straight: 180}[q.m.kind]],
    step: (q, s, i, d) => (s[0] + d < 5 || s[0] + d > 180 ? null : [s[0] + d]),
    draw: (q, s) => (q.m.proto ? ls3bProto(s[0], q.m.left) : VIZ.angle(s[0], {rot: q.m.rot || 0, label: q.m.show ? s[0] + '°' : ''})),
    ctl: q => `<div class="mmc mmcol">${mmRow(q.m.show ? 'Open' : 'Turn', 0, false, [5, 15])}</div>`,
    of: (q, v) => [+v],
    fits: (q, v) => Number.isInteger(+v) && +v >= 5 && +v <= 180 && +v % 5 == 0,
    miss: (q, s) => (q.m.kind ? `That is ${ls3bKind(s[0])}. Open or close it.` : s[0] > q.m.target ? 'Too wide. Close it a little.' : 'Not wide enough. Open it a little.'),
  };
  // a point on a coordinate grid: m {max, target 'x,y'}; state: [across, up]
  K2MM.xy = {
    raw: true,
    s0: () => [0, 0],
    val: (q, s) => s.join(','),
    ans: q => q.m.target.split(',').map(Number),
    step: (q, s, i, d) => { const o = s.slice(); o[i] += d; return o[i] < 0 || o[i] > q.m.max ? null : o; },
    draw: (q, s) => VIZ.coordGrid({max: q.m.max, points: [[s[0], s[1], 'A']]}).replace('viz viz-grid', 'viz viz-grid ls3b-xy'),
    ctl: () => `<div class="mmc mmcol">${mmRow('Across', 0, true)}${mmRow('Up', 1, true)}</div>`,
    of: (q, v) => String(v).split(',').map(Number),
    fits: (q, v) => /^\d+,\d+$/.test(String(v)) && String(v).split(',').every(x => +x <= q.m.max),
    miss: (q, s) => { const [x, y] = K2MM.xy.ans(q); return s[0] == y && s[1] == x ? 'Across first, then up.' : s[0] != x ? 'Check how far across.' : 'Check how far up.'; },
  };
  // a scale or a jug: m {jug, max, step, unit, target}; state: [marks]
  K2MM.dial = {
    raw: true,
    s0: () => [0],
    val: (q, s) => s[0] * q.m.step,
    ans: q => [q.m.target / q.m.step],
    step: (q, s, i, d) => (s[0] + d < 0 || (s[0] + d) * q.m.step > q.m.max ? null : [s[0] + d]),
    draw: (q, s) => (q.m.jug ? ffJug : ffDial)(s[0] * q.m.step, q.m.max, q.m.step, q.m.unit),
    ctl: q => `<div class="mmc mmcol">${mmRow(q.m.jug ? 'Water' : 'Needle', 0, false)}</div>`,
    of: (q, v) => [+v / q.m.step],
    fits: (q, v) => Number.isInteger(+v / q.m.step) && +v >= 0 && +v <= q.m.max,
    miss: (q, s) => (s[0] * q.m.step > q.m.target ? `Too much. Each mark is ${q.m.step}.` : `Not enough yet. Each mark is ${q.m.step}.`),
  };
  // a bar model: m {g, n, ex, hiN}; state: [boxes, in each box]
  K2MM.tape = {
    raw: true,
    s0: () => [1, 1],
    val: (q, s) => s[0] * s[1],
    ans: q => [q.m.g, q.m.n],
    step: (q, s, i, d) => { const o = s.slice(); o[i] += d; return o[i] < 1 || o[i] > (i ? q.m.hiN || 12 : 10) ? null : o; },
    draw: (q, s) => ls3bTape(s[0], s[1], {ex: q.m.ex, tot: '?'}),
    ctl: () => `<div class="mmc mmcol">${mmRow('Boxes', 0, true)}${mmRow('In each box', 1, true)}</div>`,
    of: (q, v) => [q.m.g, Math.round(+v / q.m.g)],
    fits: (q, v) => Number.isInteger(+v / q.m.g) && +v / q.m.g >= 1 && +v / q.m.g <= (q.m.hiN || 12),
    miss: (q, s) => (s[0] != q.m.g ? 'Check how many boxes the story has.' : 'Check how many go in each box.'),
  };
  // a division story's groups: m {T, s, target}; state: [groups]
  K2MM.left = {
    raw: true,
    s0: () => [1],
    val: (q, s) => s[0],
    ans: q => [q.m.target],
    step: (q, s, i, d) => (s[0] + d < 1 || s[0] + d > 12 ? null : [s[0] + d]),
    draw: (q, s) => ls3bLeft(q.m.T, q.m.s, s[0]),
    ctl: () => `<div class="mmc mmcol">${mmRow('Groups', 0, true)}</div>`,
    of: (q, v) => [+v],
    fits: (q, v) => Number.isInteger(+v) && +v >= 1 && +v <= 12,
    miss: (q, s) => (s[0] > q.m.target ? 'One group too many. Read the question again.' : 'Not enough yet. Read the question again.'),
  };
  // an in and out rule: m {head, rows [[in, out]], target 'op k'}; state: [sign 0-3, number 1-12]
  K2MM.rule = {
    raw: true,
    s0: () => [0, 1],
    val: (q, s) => LS3B_OPS[s[0]] + s[1],
    ans: q => [LS3B_OPS.indexOf(q.m.target[0]), +q.m.target.slice(1)],
    step: (q, s, i, d) => { if (i == 0) return [(s[0] + d + 4) % 4, s[1]]; const k = s[1] + d; return k < 1 || k > 12 ? null : [s[0], k]; },
    draw: (q, s) => `<div class="eq ls3b-rule">${LS3B_OPS[s[0]]} ${s[1]}</div>` + ls3bTable(q.m.head, q.m.rows, {mine: q.m.rows.map(r => ls3bApply(s[0], s[1], r[0])), mineHead: LS3B_OPS[s[0]] + ' ' + s[1]}),
    ctl: () => `<div class="mmc mmcol"><div class="mms"><span class="mml">Sign</span>${LS3B_OPS.map((o, i) => `<button class="mmb ls3b-op" data-i="0" data-d="${i}" aria-label="${LS3B_OPSAY[i]}">${o}</button>`).join('')}</div>${mmRow('Number', 1, true)}</div>`,
    of: (q, v) => [LS3B_OPS.indexOf(String(v)[0]), +String(v).slice(1)],
    fits: (q, v) => /^[+−×÷]([1-9]|1[0-2])$/.test(String(v)),
    miss: () => 'Try your rule on every row.',
  };
  // the sign buttons set the sign (data-op) rather than step it
  const step0 = K2MM.rule.step;
  K2MM.rule.step = (q, s, i, d) => (i == 0 && d >= 0 && d <= 3 ? (s[0] == d ? null : [d, s[1]]) : step0(q, s, i, d));
  // the facts of a quadrilateral: m {shape}; state: four bits (four sides, all sides equal, four right angles, both pairs parallel)
  K2MM.props = {
    raw: true,
    s0: () => [0, 0, 0, 0],
    val: (q, s) => s.join(''),
    ans: q => LS3B_PROPS[q.m.shape].slice(),
    step: (q, s, i) => flip(s, i),
    draw: (q, s) => `<div class="ls3b-prop">${ls3bShape(q.m.shape)}<ul class="ls3b-facts">${LS3B_FACT.map((f, i) => `<li class="${s[i] ? 'on' : ''}">${ico(s[i] ? 'check-circle' : 'close', 20)}<span>${f}</span>`
      + `<span class="a11y-h">${s[i] ? ' tapped' : ' not tapped'}</span></li>`).join('')}</ul></div>`,
    ctl: () => `<div class="mmc ls3b-tgs">${LS3B_FACT.map((f, i) => bit(i, f)).join('')}</div>`,
    of: (q, v) => String(v).split('').map(Number),
    fits: (q, v) => /^[01]{4}$/.test(String(v)),
    miss: () => 'Check the sides, then the corners.',
  };
  // fold lines: m {shape}; state: four bits (up and down, across, slant up, slant down)
  const foldIc = i => `<svg class="ls3b-fic" viewBox="0 0 24 24" aria-hidden="true"><path d="${['M12 2V22', 'M2 12H22', 'M3 21L21 3', 'M3 3L21 21'][i]}"/></svg>`;
  K2MM.sym = {
    raw: true,
    s0: () => [0, 0, 0, 0],
    val: (q, s) => s.join(''),
    ans: q => LS3B_SYM[q.m.shape].slice(),
    step: (q, s, i) => flip(s, i),
    draw: (q, s) => ls3bShape(q.m.shape, s, {w: 200}),
    ctl: () => `<div class="mmc ls3b-tgs">${['Fold line up and down', 'Fold line across', 'Fold line slanted up', 'Fold line slanted down'].map((l, i) => bit(i, l, foldIc(i))).join('')}</div>`,
    of: (q, v) => String(v).split('').map(Number),
    fits: (q, v) => /^[01]{4}$/.test(String(v)),
    miss: () => 'Fold it in your mind: both halves must match.',
  };
  // dividing by a 2-digit number: m {n, d, target}; state: [how many fit]
  K2MM.qtry = {
    raw: true,
    s0: () => [1],
    val: (q, s) => s[0],
    ans: q => [q.m.target],
    step: (q, s, i, d) => (s[0] + d < 1 || s[0] + d > 99 ? null : [s[0] + d]),
    draw: (q, s) => { const p = q.m.d * s[0], l = q.m.n - p, st = l < 0 ? 'Too much' : l >= q.m.d ? 'More fit' : 'Fits';
      return `<div class="ls3b-try"><div class="eq">${q.m.d} × ${s[0]} = ${p}</div><div class="eq">${q.m.n} − ${p} = ${l < 0 ? '−' + -l : l}</div>`
        + `<div class="ls3b-st ${l < 0 || l >= q.m.d ? 'no' : 'ok'}">${ico(l < 0 || l >= q.m.d ? 'close' : 'check-circle', 22)}<span>${st}</span></div></div>`; },
    ctl: () => `<div class="mmc mmcol">${mmRow('How many fit', 0, true, [1, 10])}</div>`,
    of: (q, v) => [+v],
    fits: (q, v) => Number.isInteger(+v) && +v >= 1 && +v <= 99,
    miss: (q, s) => (q.m.d * s[0] > q.m.n ? 'Too much. Try fewer.' : 'More fit. Try more.'),
  };
  // mixed numbers: m {d, target (a value as text)}; state: [wholes, parts]; trade d parts for a whole (i 2, d 1) or break one (d -1)
  const trade = (d, l) => `<button class="mmb ls-tr" data-i="2" data-d="${d}" aria-label="${l}">${esc(l)}</button>`;
  K2MM.mixb = {
    raw: true,
    s0: q => (q.m.s0 || [0, 0]).slice(),
    val: (q, s) => ls3bMixTxt(s[0], s[1], q.m.d),
    ans: q => { const v = ls3bMixOf(q.m.target, q.m.d); return [v[0], v[1]]; },
    step: (q, s, i, d) => {
      const D = q.m.d, o = s.slice();
      if (i == 2) { if (d > 0) { if (o[1] < D) return null; o[1] -= D; o[0]++; } else { if (o[0] < 1) return null; o[0]--; o[1] += D; } return o; }
      o[i] += d;
      return o[i] < 0 || o[0] > 9 || o[1] > 2 * D ? null : o;
    },
    draw: (q, s) => ls3bMixBars(s[0], s[1], q.m.d) + `<div class="eq">${s[0]} ${fcFr(s[1], q.m.d)}</div>`,
    ctl: q => `<div class="mmc mmcol">${mmRow('Wholes', 0, true)}${mmRow(FC_NAMES[q.m.d][0].toUpperCase() + FC_NAMES[q.m.d].slice(1) + 's', 1, true)}<div class="mms ls-trs">`
      + trade(1, `${q.m.d} parts → 1 whole`) + trade(-1, `1 whole → ${q.m.d} parts`) + '</div></div>',
    of: (q, v) => ls3bMixOf(v, q.m.d),
    fits: (q, v) => { const o = ls3bMixOf(v, q.m.d); return !!o && o[0] <= 9 && o[1] < q.m.d; },
    miss: (q, s) => (s[1] >= q.m.d ? 'Trade parts for a whole.' : 'Check the wholes and the parts.'),
  };
  // whole bars cut into parts: m {w, target (pieces)}; state: [parts in each bar]
  K2MM.cut = {
    raw: true,
    s0: () => [1],
    val: (q, s) => q.m.w * s[0],
    ans: q => [q.m.target / q.m.w],
    step: (q, s, i, d) => (s[0] + d < 1 || s[0] + d > 8 ? null : [s[0] + d]),
    draw: (q, s) => ccBars(q.m.w, s[0]),
    ctl: () => `<div class="mmc mmcol">${mmRow('Parts in each bar', 0, true)}</div>`,
    of: (q, v) => [+v / q.m.w],
    fits: (q, v) => Number.isInteger(+v / q.m.w) && +v / q.m.w >= 1 && +v / q.m.w <= 8,
    miss: (q, s) => (s[0] * q.m.w > q.m.target ? 'Pieces too small. Cut fewer.' : 'Cut more pieces.'),
  };
  // the make kind's first-miss words for these models (their own line), the rest as before
  const MK = KIND.make, r1 = MK.retry;
  MK.retry = (q, st) => {
    const M = K2MM[q.model];
    if (!M || !M.miss) return r1(q, st);
    fb(M.miss(q, st.mm), 'again');
    st.mmMoved = false;
    MK.draw(q, st);
    const w = $('.mmw');
    if (!w) return;
    w.classList.add('wrong');
    k2Shake(w);
    setTimeout(() => w.classList.remove('wrong'), 900);
  };
}
// the facts of each shape (four sides, all sides equal, four right angles, both pairs of sides parallel) and its fold lines
const LS3B_FACT = ['Four sides', 'All sides equal', 'Four right angles', 'Both pairs of sides parallel'];
const LS3B_PROPS = {square: [1, 1, 1, 1], rectangle: [1, 0, 1, 1], rhombus: [1, 1, 0, 1], parallelogram: [1, 0, 0, 1], trapezoid: [1, 0, 0, 0], kite: [1, 0, 0, 0]};
const LS3B_SYM = {square: [1, 1, 1, 1], rectangle: [1, 1, 0, 0], rhombus: [1, 1, 0, 0], kite: [1, 0, 0, 0], trapezoid: [1, 0, 0, 0], parallelogram: [0, 0, 0, 0]};
const ls3bKind = d => (d < 90 ? 'acute' : d == 90 ? 'right' : d < 180 ? 'obtuse' : 'straight');
const ls3bFrTxt = (k, d) => (k % d ? `${k}/${d}` : String(k / d));
const ls3bMixTxt = (w, p, d) => (p ? `${w} ${p}/${d}` : String(w));
// "2 3/4", "3/4" or "5" as [wholes, parts] of d (null when it is not a number of d parts)
function ls3bMixOf(v, d) {
  const t = String(v).trim();
  let m = /^(\d+)$/.exec(t);
  if (m) return [+m[1], 0];
  if (!(m = /^(?:(\d+) )?(\d+)\/(\d+)$/.exec(t)) || !+m[3] || d % +m[3]) return null;
  return [+(m[1] || 0), +m[2] * d / +m[3]];
}
// the checkers (LSGOAL, 52b-know.js): a raw state, or a value as text (a misconception's prediction, a simulated child)
Object.assign(LSGOAL, {
  akind: (q, v) => ls3bKind(+(Array.isArray(v) ? v[0] : v)) == q.m.kind,
  xy: (q, v) => (Array.isArray(v) ? v.join(',') : String(v)) === q.m.target,
  plot: (q, v) => (Array.isArray(v) ? v.join(',') : String(v)) === q.m.target.join(','),
  rule: (q, v) => { const s = Array.isArray(v) ? v : K2MM.rule.of(q, v); return s[0] >= 0 && q.m.rows.every(r => ls3bApply(s[0], s[1], r[0]) === r[1]); },
  props: (q, v) => (Array.isArray(v) ? v.join('') : String(v)) === LS3B_PROPS[q.m.shape].join(''),
  sym: (q, v) => (Array.isArray(v) ? v.join('') : String(v)) === LS3B_SYM[q.m.shape].join(''),
  mixv: (q, v) => { const s = Array.isArray(v) ? v : ls3bMixOf(v, q.m.d); const t = ls3bMixOf(q.m.target, q.m.d); return !!s && s[1] < q.m.d && s[0] * q.m.d + s[1] == t[0] * q.m.d + t[1]; },
  some2: (q, v) => (Array.isArray(v) ? v : String(v).split(',').map(Number)).some(x => x > 0),
});
