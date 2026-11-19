/* ---------- TEACH-6M: the workbench of the grade 6 math lessons (part teach6, after teach35; TEACH-PLAN-2 batch 5, grade 6) ----------
   The 6th grade stops of Sky City and Galaxy Core (ratios, rates, percents, integers, dividing fractions, exponents, expressions,
   equations, area of triangles and trapezoids, four quadrants, GCF and LCM, mean and median, rate and percent stories) get their
   lessons in 52v-lessons6.js. They are grade 3-6 lessons like TEACH-3's (lsDraft3, LS_B35: every TEACH-3 check runs them too); their
   models are keys of K2MM (49b-kinds2.js), added from here like TEACH-3b's (52n-bench3b.js); Practice never uses them. Every model is
   drawn from the shared tokens (src/css/52u-teach6.css), every control is a 48 px button with its own spoken name, and each is a
   "raw" model: the lesson submits its state, the goal (LSGOAL) checks it, and a value a misconception predicts is turned back into a
   state (of) where a build can show it.
     rtab   a ratio table: two rows (a for every b); a stepper adds a column (one more group of a and b)
     iline  a number line from -10 to 10: a stepper moves the dot (by 1 or 5); a start mark and a hop from it when the lesson has one
     pct    a percent: a hundred grid (squares of one hundred) or a bar of a whole cut into ten boxes; a stepper shades by 1, 5 or 10
     eqbar  an equation as a bar model: a known bar against x copies of the unknown (and a known part); a stepper sets x, the bars show
            when both sides are the same length
     pow    an exponent: a base and how many times it is multiplied (the square or the cube drawn)
     xy4    a point on the four-quadrant grid: steppers across and up, from -5 to 5
     tri    a triangle, a parallelogram or a trapezoid on a grid, in its dashed rectangle: steppers for the base and the height
     mults  two rows of hops (multiples of a and of b): a stepper a row, until both land on the same number (the LCM)
     gcf    two numbers as bars cut into equal groups: a stepper sets the group size, what is left over shows (the GCF)
     lev    towers of blocks and a level line: a stepper moves the line until what is above it fills the gaps below (the mean)
     fit    a fraction bar with groups of the divisor's parts marked over the shaded part: how many groups fit (dividing fractions) */
// the misconception codes of these lessons (TEACH-PLAN-2 system C): what the pet says when it repairs the idea, the reason the child builds
// from tiles (LS_WHY: its last three words are the tiles) and the line a grown-up reads (LSREP.NOTE)
Object.assign(BUGS, {
  addRat: {d: 'adds the same amount to both parts of a ratio instead of multiplying both', say: 'A ratio grows by times, not by adding the same.'},
  ratSwap: {d: 'mixes up which amount of a ratio goes with which', say: 'Keep each amount in its own row of the table.'},
  rateFlip: {d: 'divides the wrong way for a unit rate', say: 'For one item, share the cost by the number of items.'},
  negBig: {d: 'thinks a negative number with a bigger size is greater (-7 more than -3)', say: 'Further left on the line is less, even with a bigger size.'},
  negSide: {d: 'puts a negative number on the positive side of zero', say: 'Negative numbers sit to the left of zero.'},
  absNeg: {d: 'keeps the minus sign in an absolute value or a distance', say: 'A distance is never negative.'},
  absDist: {d: 'takes the sizes away when the two numbers are on both sides of zero', say: 'Across zero, add the two distances to zero.'},
  negDir: {d: 'moves the wrong way on the number line: takes away as adding, or adding as taking away', say: 'Adding moves right. Taking away moves left.'},
  negIgn: {d: 'drops the minus sign of a negative number', say: 'Keep the minus sign. It tells which side of zero.'},
  pctNum: {d: 'gives the percent itself as the answer instead of that part of the number', say: 'Percent means out of a hundred. Find that part of the whole.'},
  pct10: {d: 'finds ten percent (one tenth) and stops there', say: 'Ten percent is one tenth. Take as many tenths as you need.'},
  pctTop: {d: 'writes the top number of a fraction as the percent', say: 'Make the bottom a hundred first, then read the top.'},
  pctCat: {d: 'writes the top and the bottom side by side as a percent (3/5 as 35%)', say: 'Not two numbers stuck together. Rename it out of a hundred.'},
  noRename: {d: 'divides the top numbers without making the parts the same size', say: 'Make the parts the same size first.'},
  powMul: {d: 'multiplies the base by the exponent (4 cubed as 12)', say: 'The small number says how many times to use the base.'},
  undo: {d: 'does the operation of an equation instead of undoing it', say: 'Undo it: do the opposite to both sides.'},
  catVar: {d: 'reads 3x as the digits 3 and x side by side (35 for x = 5)', say: 'A number next to a letter means times.'},
  stop1: {d: 'stops after the first step of a two-step equation', say: 'Finish both steps. Get x all alone.'},
  noHalf: {d: 'forgets to halve: finds the rectangle around a triangle', say: 'A triangle is half of its rectangle.'},
  slant: {d: 'uses the slanted side instead of the height', say: 'The height stands straight up from the base.'},
  signFlip: {d: 'drops a minus sign on the four-quadrant grid', say: 'Left of zero and below zero are negative.'},
  gcfLcm: {d: 'gives the least common multiple for the greatest common factor, or the other way round', say: 'A factor goes into the number. A multiple is made from it.'},
  mulAll: {d: 'multiplies the two numbers for the least common multiple every time', say: 'Look for a smaller shared multiple first.'},
  meanSum: {d: 'gives the total instead of sharing it out equally', say: 'Share the total equally. Divide by how many numbers.'},
  medSort: {d: 'takes the middle of the list without putting it in order', say: 'Put the numbers in order first.'},
});
Object.assign(LS_WHY, {
  addRat: 'Ratios grow by multiplying', ratSwap: 'Keep each row in order', rateFlip: 'Share the cost by items', negBig: 'Further left is less',
  negSide: 'Negatives go left of zero', absNeg: 'Distance is never negative', absDist: 'Across zero add both', negDir: 'Taking away moves left',
  negIgn: 'Keep the minus sign', pctNum: 'Percent means out of hundred', pct10: 'Take as many tenths', pctTop: 'Make the bottom a hundred',
  pctCat: 'Rename it out of hundred', noRename: 'Make same size parts first', powMul: 'Use the base again', undo: 'Do the opposite operation',
  catVar: 'Next to means times', stop1: 'Get x all alone', noHalf: 'Take half the rectangle', slant: 'Height goes straight up',
  signFlip: 'Left and down are negative', gcfLcm: 'Factors divide into numbers', mulAll: 'Find the first shared multiple', meanSum: 'Share the total out',
  medSort: 'Order the numbers first',
});
if (typeof LSREP != 'undefined') Object.assign(LSREP.NOTE, {
  addRat: 'sometimes adds the same amount to both parts of a ratio', ratSwap: 'sometimes mixes up which amount of a ratio goes with which',
  rateFlip: 'sometimes divides the wrong way for a unit rate', negBig: 'sometimes thinks -7 is more than -3', negSide: 'sometimes puts negative numbers right of zero',
  absNeg: 'sometimes keeps the minus sign in a distance', absDist: 'sometimes takes the sizes away across zero instead of adding them',
  negDir: 'sometimes moves the wrong way when adding or taking away negatives', negIgn: 'sometimes drops the minus sign of a negative number',
  pctNum: 'sometimes gives the percent itself as the answer', pct10: 'sometimes finds ten percent and stops', pctTop: 'sometimes writes the top of a fraction as the percent',
  pctCat: 'sometimes writes 3/5 as 35%', noRename: 'sometimes divides fractions without making the parts the same size', powMul: 'sometimes multiplies the base by the exponent',
  undo: 'sometimes does the operation of an equation instead of undoing it', catVar: 'sometimes reads 3x as 35 when x is 5', stop1: 'sometimes stops after one step of a two-step equation',
  noHalf: 'sometimes forgets to halve for the area of a triangle', slant: 'sometimes uses a slanted side as the height', signFlip: 'sometimes drops a minus sign on the grid',
  gcfLcm: 'sometimes mixes up the greatest common factor and the least common multiple', mulAll: 'sometimes multiplies the two numbers for their least common multiple',
  meanSum: 'sometimes gives the total instead of the mean', medSort: 'sometimes takes the middle number without putting the list in order',
});

/* ---- numbers: shown with a real minus sign, said as "negative" ---- */
const ls6mN = v => (+v < 0 ? '−' + -v : String(v));
const ls6mSay = v => { const t = String(v).trim(); return /^-\d/.test(t) ? 'negative ' + t.slice(1) : t; };
const ls6mF = v => Math.round(v * 10) / 10;
const ls6mSvg = (k, w, h, body, label) => `<svg class="viz viz-${k}" viewBox="0 0 ${ls6mF(w)} ${ls6mF(h)}" style="--vw:${ls6mF(w)}" role="img" aria-label="${label}">${body}</svg>`;
const ls6mGcd = (a, b) => (b ? ls6mGcd(b, a % b) : a);
const ls6mLcm = (a, b) => a / ls6mGcd(a, b) * b;

/* ---- drawings ---- */
// a ratio table: rows na and nb, a column for each group from 1 to k (a long table keeps its first two and last two columns)
function ls6mRatio(a, b, k, na, nb, o = {}) {
  const ks = k <= 5 ? Array.from({length: k}, (_, i) => i + 1) : [1, 2, 0, k - 1, k];
  const cell = (j, v) => (j ? `<td class="${j == k && o.mark !== false ? 'ls6m-last' : ''}">${o.hide && j == k ? '?' : v}</td>` : '<td class="ls6m-gap">…</td>');
  return `<table class="ls6m-rt"><tr><th scope="row">${esc(na)}</th>${ks.map(j => cell(j, j * a)).join('')}</tr>`
    + `<tr><th scope="row">${esc(nb)}</th>${ks.map(j => cell(j, o.hideB && j == k ? '?' : j * b)).join('')}</tr></table>`;
}
// a number line from min to max with a dot at v (null: none), a start mark s0 and a hop from it (label: the hop's label)
function ls6mLine(v, o = {}) {
  const min = o.min != null ? o.min : -10, max = o.max != null ? o.max : 10, hops = o.from != null && v != null && v !== o.from ? [[o.from, v, o.lab == null ? '' : o.lab]] : [];
  const labs = []; for (let x = min; x <= max; x++) if (x % 5 == 0 || o.all) labs.push(x);
  return VIZ.numLine({min, max, step: 1, labels: labs, marks: [o.from, v].filter(x => x != null), hops, hide: o.hide || [], w: 300}).replace('class="viz ', 'class="viz ls6m-nl ');
}
// the four-quadrant grid with a point (the model's bigger labels: ls6m-xy)
const ls6mXY = (x, y, max = 5) => VIZ.coordGrid({quadrants: 4, max, points: [[x, y, 'A']]}).replace('viz viz-grid', 'viz viz-grid ls6m-xy');
// the same grid as a question's picture (shrunk to fit above the number pad): the axes labelled at the even numbers only, in bigger type
const ls6mXYq = (x, y) => ls6mXY(x, y).replace('ls6m-xy', 'ls6m-xyq').replace(/<text class="vcn[^"]*"[^>]*>−?[13]<\/text>/g, '');
// a hundred grid with p squares shaded, row by row
function ls6mGrid(p) {
  const c = 19, P = 4;
  let on = '', g = '';
  for (let i = 0; i < 100; i++) if (i < p) on += `M${P + (i % 10) * c} ${P + Math.floor(i / 10) * c}h${c}v${c}h-${c}z`;
  for (let k = 0; k <= 10; k++) g += `M${P} ${P + k * c}h${10 * c}M${P + k * c} ${P}v${10 * c}`;
  return ls6mSvg('pgrid', 10 * c + 2 * P, 10 * c + 2 * P, `<rect class="vo" x="${P}" y="${P}" width="${10 * c}" height="${10 * c}"/>${on ? `<path class="v1" d="${on}"/>` : ''}<path class="ls6m-gl" d="${g}"/>`, 'hundred grid');
}
// a bar for a whole T cut into ten boxes (each T/10, written when o.each), p percent shaded; o.q: the shaded part's value is a "?"
function ls6mPBar(T, p, o = {}) {
  const W = 290, X = 6, Y = 34, H = 46, bw = (W - 2 * X) / 10;
  let body = `<path class="vk" d="M${X} ${Y - 6}v-10H${W - X}v10"/><text x="${W / 2}" y="${Y - 20}">${T}</text>`;
  if (p > 0) body += `<rect class="v1" x="${X}" y="${Y}" width="${ls6mF(bw * p / 10)}" height="${H}"/>`;
  for (let i = 0; i < 10; i++) body += `<rect class="ls6m-box" x="${ls6mF(X + i * bw)}" y="${Y}" width="${ls6mF(bw)}" height="${H}"/>`
    + (o.each ? `<text class="${i < Math.floor(p / 10) ? 'vw' : ''} ls6m-sm" x="${ls6mF(X + i * bw + bw / 2)}" y="${Y + 29}">${T / 10}</text>` : '');
  const px = X + bw * p / 10;
  if (o.q && p > 0) body += `<path class="vk" d="M${X} ${Y + H + 6}v8H${ls6mF(px)}v-8"/><text x="${ls6mF((X + px) / 2)}" y="${Y + H + 32}">?</text>`;
  body += `<text class="ls6m-sm vts" x="${X}" y="${Y + H + (o.q ? 52 : 22)}">0%</text><text class="ls6m-sm vta" x="${W - X}" y="${Y + H + (o.q ? 52 : 22)}">100%</text>`;
  return ls6mSvg('pbar', W, Y + H + (o.q ? 58 : 28), body, 'percent bar');
}
// an equation as two bars: top (a value, or 'x' with the child's value), bottom: g boxes of x and the known parts; scale: the longer side
function ls6mEqBars(top, parts, o = {}) {
  const W = 290, X = 6, H = 40, sum = parts.reduce((s, p) => s + p[0], 0), T = Math.max(top[0], sum, 1), k = (W - 2 * X) / T;
  const row = (y, ps) => { let x = X, b = ''; for (const [v, lab, cls] of ps) { const w = Math.max(v * k, 0); if (w > 0) b += `<rect class="${cls}" x="${ls6mF(x)}" y="${y}" width="${ls6mF(w)}" height="${H}" rx="4"/>`
    + (w >= 22 ? `<text class="${cls == 'v1' ? 'vw' : ''}" x="${ls6mF(x + w / 2)}" y="${y + 27}">${lab}</text>` : ''); x += w; } return b; };
  const same = Math.abs(top[0] - sum) < 1e-9 && o.show;
  return ls6mSvg('eqb', W, 2 * H + 22, row(6, [[top[0], top[1], top[2] || 'vo ls6m-tot']]) + row(H + 16, parts)
    + (same ? `<path class="ls6m-eq" d="M${X} ${H + 11}H${W - X}"/>` : ''), 'bar model of the equation');
}
// a shape on a grid: tri (base b, height h, top point at off), par (b, h, slant off), trap (bottom b, top tp, h, off); the dashed rectangle around it
function ls6mShape(sh, b, h, o = {}) {
  const c = o.c || 22, off = o.off != null ? o.off : Math.max(1, Math.round(b / 3)), tp = o.tp || 0, GW = Math.max(b + (sh == 'par' ? off : 0), (sh == 'trap' ? off + tp : 0)) + 1, GH = h + 1;
  const P = 10, Y = v => P + (GH - v) * c, Xx = v => P + v * c;
  let g = '';
  for (let i = 0; i <= GW; i++) g += `M${Xx(i)} ${P}V${P + GH * c}`;
  for (let j = 0; j <= GH; j++) g += `M${P} ${P + j * c}H${Xx(GW)}`;
  const pts = sh == 'tri' ? [[0, 0], [b, 0], [off, h]] : sh == 'par' ? [[0, 0], [b, 0], [b + off, h], [off, h]] : [[0, 0], [b, 0], [off + tp, h], [off, h]];
  const RW = sh == 'par' ? b + off : b;
  let body = `<path class="ls6m-gl" d="${g}"/>`;
  if (o.rect !== false) body += `<rect class="vgd" x="${Xx(0)}" y="${Y(h)}" width="${RW * c}" height="${h * c}"/>`;
  body += `<path class="vpo" d="M${pts.map(p => Xx(p[0]) + ' ' + Y(p[1])).join('L')}z"/>`;
  body += `<path class="vk ls6m-ht" d="M${Xx(off)} ${Y(0)}V${Y(h)}"/>`;
  if (o.lab !== false) body += `<text x="${Xx(b / 2)}" y="${Y(0) + 22}">${o.qb ? '?' : b}</text><text class="vts" x="${Xx(off) + 8}" y="${Y(h / 2) + 6}">${o.qh ? '?' : h}</text>`
    + (sh == 'trap' ? `<text x="${Xx(off + tp / 2)}" y="${Y(h) - 8}">${tp}</text>` : '')
    // the slanted side's length: the right side of a parallelogram, the left side of a triangle
    + (o.side ? (sh == 'par' ? `<text class="ls6m-sl vts" x="${Xx(b + off / 2) + 12}" y="${Y(h / 2) + 6}">${o.side}</text>`
      : `<text class="ls6m-sl vta" x="${Xx(off / 2) - 10}" y="${Y(h / 2) + 6}">${o.side}</text>`) : '');
  return ls6mSvg('shp6', GW * c + 2 * P, GH * c + 2 * P + 18, body, {tri: 'triangle', par: 'parallelogram', trap: 'trapezoid'}[sh] + ' on a grid');
}
// two rows of hops: the multiples of a (i of them) and of b (j of them), the last of each marked; equal last numbers are marked
function ls6mHops(a, b, i, j) {
  const meet = a * i == b * j, row = (k, n, cls) => `<div class="ls6m-hr"><span class="ls6m-hl">${k}s</span>${Array.from({length: n}, (_, x) => `<span class="ls6m-ch${x == n - 1 ? ' ' + cls + (meet ? ' ok' : '') : ''}">${k * (x + 1)}</span>`).join('')}</div>`;
  return `<div class="ls6m-hops">${row(a, i, 'l1')}${row(b, j, 'l2')}</div>`;
}
// a number as a bar cut into groups of k (what is left over dashed): two numbers one above the other, the same scale
function ls6mGroups(a, b, k) {
  const W = 290, X = 6, H = 34, s = (W - 2 * X - 50) / Math.max(a, b);
  const row = (n, y) => { let x = X, out = `<text class="vta" x="${X + 40}" y="${y + 24}">${n}</text>`; x += 46;
    for (let t = 0; t + k <= n; t += k) { out += `<rect class="v1" x="${ls6mF(x)}" y="${y}" width="${ls6mF(k * s - 2)}" height="${H}" rx="3"/>` + (k * s >= 20 ? `<text class="vw" x="${ls6mF(x + k * s / 2 - 1)}" y="${y + 23}">${k}</text>` : ''); x += k * s; }
    const l = n % k; if (l) out += `<rect class="ls6m-left" x="${ls6mF(x)}" y="${y}" width="${ls6mF(l * s - 2)}" height="${H}" rx="3"/>` + (l * s >= 16 ? `<text x="${ls6mF(x + l * s / 2 - 1)}" y="${y + 23}">${l}</text>` : '');
    return out; };
  return ls6mSvg('grp6', W, 2 * H + 18, row(a, 4) + row(b, H + 12), 'two numbers in equal groups');
}
// towers of blocks (the values) and a level line at L: what is above the line, and the gaps below it, counted
function ls6mTowers(vals, L, o = {}) {
  const c = 16, P = 8, n = vals.length, top = Math.max(10, ...vals), cw = 40, W = n * cw + 2 * P + 4, Hh = top * c + 2 * P + 22;
  let body = '';
  vals.forEach((v, i) => { const x = P + i * cw + 6; for (let k = 0; k < v; k++) body += `<rect class="${o.line !== false && k >= L ? 'v2' : 'v1'}" x="${x}" y="${P + (top - k - 1) * c}" width="${cw - 12}" height="${c - 2}" rx="2"/>`;
    if (o.line !== false) for (let k = v; k < L; k++) body += `<rect class="ls6m-gap6" x="${x}" y="${P + (top - k - 1) * c}" width="${cw - 12}" height="${c - 2}" rx="2"/>`;
    body += `<text x="${x + (cw - 12) / 2}" y="${P + top * c + 18}">${o.q ? '' : v}</text>`; });
  if (o.line !== false) body += `<path class="ls6m-lv" d="M${P} ${P + (top - L) * c}H${W - P}"/>`;
  return ls6mSvg('tow', W, Hh, body, 'towers of blocks');
}
const ls6mAbove = (vals, L) => vals.reduce((s, v) => s + Math.max(0, v - L), 0);
const ls6mGaps = (vals, L) => vals.reduce((s, v) => s + Math.max(0, L - v), 0);
// a fraction bar of d parts, a shaded, with g groups of b parts marked above it (a group past the shaded part is marked as too far)
function ls6mFit(d, a, b, g, o = {}) {
  const W = 290, X = 6, Y = 30, H = 44, pw = (W - 2 * X) / d;
  let body = '';
  for (let i = 0; i < d; i++) body += `<rect class="${i < a ? 'v1' : 'vo'}" x="${ls6mF(X + i * pw)}" y="${Y}" width="${ls6mF(pw)}" height="${H}"/>`;
  for (let k = 0; k < g; k++) { const x0 = X + k * b * pw, x1 = x0 + b * pw, far = (k + 1) * b > a;
    body += `<path class="${far ? 'ls6m-far' : 'ls6m-br'}${k % 2 ? ' ls6m-b2' : ''}" d="M${ls6mF(x0 + 3)} ${Y - 4}v-12H${ls6mF(x1 - 3)}v12"/>` + `<text class="ls6m-sm" x="${ls6mF((x0 + x1) / 2)}" y="${Y - 20}">${k + 1}</text>`; }
  if (o.one) { const x1 = X + b * pw; body += `<path class="ls6m-br" d="M${X + 3} ${Y + H + 4}v12H${ls6mF(x1 - 3)}v-12"/><text class="ls6m-sm" x="${ls6mF((X + x1) / 2)}" y="${Y + H + 34}">${o.one}</text>`; }
  return ls6mSvg('fit', W, Y + H + (o.one ? 40 : 8), body, 'fraction bar with groups');
}

/* ---- the models (keys of K2MM) ---- */
if (typeof K2MM != 'undefined') {
  // a ratio table: m {a, b, na, nb, target (the b row's value wanted)}; state: [groups]
  K2MM.rtab = {
    raw: true,
    s0: () => [1],
    val: (q, s) => s[0] * q.m.b,
    ans: q => [q.m.target / q.m.b],
    step: (q, s, i, d) => (s[0] + d < 1 || s[0] + d > 12 ? null : [s[0] + d]),
    draw: (q, s) => ls6mRatio(q.m.a, q.m.b, s[0], q.m.na, q.m.nb),
    ctl: () => `<div class="mmc mmcol">${mmRow('Groups', 0, true)}</div>`,
    of: (q, v) => [Math.round(+v / q.m.b)],
    fits: (q, v) => Number.isInteger(+v / q.m.b) && +v / q.m.b >= 1 && +v / q.m.b <= 12,
    miss: (q, s) => (s[0] * q.m.a > q.m.ka ? `Too many groups. The ${q.m.na.toLowerCase()} row goes past ${q.m.ka}.` : `Not enough groups. The ${q.m.na.toLowerCase()} row should reach ${q.m.ka}.`),
  };
  // a number line: m {min, max, from (a start mark, or null), target, s0}; state: [where the dot is]
  K2MM.iline = {
    raw: true,
    s0: q => [q.m.s0 != null ? q.m.s0 : q.m.from != null ? q.m.from : 0],
    val: (q, s) => s[0],
    ans: q => [q.m.target],
    step: (q, s, i, d) => (s[0] + d < q.m.min || s[0] + d > q.m.max ? null : [s[0] + d]),
    draw: (q, s) => ls6mLine(s[0], {min: q.m.min, max: q.m.max, from: q.m.from}),
    ctl: () => `<div class="mmc mmcol">${mmRow('Move the dot', 0, true, [1, 5])}</div>`,
    of: (q, v) => [+v],
    fits: (q, v) => Number.isInteger(+v) && +v >= q.m.min && +v <= q.m.max,
    miss: (q, s) => (s[0] > q.m.target ? 'Too far right. Move it left.' : 'Too far left. Move it right.'),
  };
  // a percent: m {grid (a hundred grid) | T (a bar of T in ten boxes), target}; state: [percent]
  K2MM.pct = {
    raw: true,
    s0: () => [0],
    val: (q, s) => s[0],
    ans: q => [q.m.target],
    step: (q, s, i, d) => (s[0] + d < 0 || s[0] + d > 100 ? null : [s[0] + d]),
    draw: (q, s) => (q.m.grid ? ls6mGrid(s[0]) : ls6mPBar(q.m.T, s[0], {each: 1})) + `<div class="eq ls6m-pv">${s[0]}%</div>`,
    ctl: q => `<div class="mmc mmcol">${mmRow('Percent', 0, false, q.m.grid ? [1, 10] : [5, 10])}</div>`,
    of: (q, v) => [+v],
    fits: (q, v) => Number.isInteger(+v) && +v >= 0 && +v <= 100 && (!!q.m.grid || +v % 5 == 0),
    miss: (q, s) => (s[0] > q.m.target ? 'Too much shaded. Take some off.' : 'Not enough shaded yet.'),
  };
  // an equation as bars: m {g (copies of x), c (a known part), tot (the known whole) | parts (x is the whole: the known parts), target, hi}; state: [x]
  K2MM.eqbar = {
    raw: true,
    s0: q => [q.m.s0 != null ? q.m.s0 : 1],
    val: (q, s) => s[0],
    ans: q => [q.m.target],
    step: (q, s, i, d) => (s[0] + d < 0 || s[0] + d > (q.m.hi || 99) ? null : [s[0] + d]),
    draw: (q, s) => ls6mEqDraw(q.m, s[0], true),
    ctl: () => `<div class="mmc mmcol">${mmRow('x', 0, true, [1, 10])}</div>`,
    of: (q, v) => [+v],
    fits: (q, v) => Number.isInteger(+v) && +v >= 0 && +v <= (q.m.hi || 99),
    miss: (q, s) => { const m = q.m, bot = m.parts ? m.parts.reduce((a, b) => a + b, 0) : (m.g || 1) * s[0] + (m.c || 0), top = m.parts ? s[0] : m.tot;
      return (m.parts ? top > bot : bot > top) ? 'Too long. Make x smaller.' : 'Too short. Make x bigger.'; },
  };
  // an exponent: m {b, e}; state: [base, how many times]
  K2MM.pow = {
    raw: true,
    s0: () => [2, 1],
    val: (q, s) => Math.pow(s[0], s[1]),
    ans: q => [q.m.b, q.m.e],
    step: (q, s, i, d) => { const o = s.slice(); o[i] += d; return o[0] < 1 || o[0] > 10 || o[1] < 1 || o[1] > 3 ? null : o; },
    draw: (q, s) => ls6mPowDraw(s[0], s[1]),
    ctl: () => `<div class="mmc mmcol">${mmRow('Base', 0, true)}${mmRow('Times used', 1, true)}</div>`,
    miss: (q, s) => (s[0] != q.m.b ? 'Check the base: the big number.' : 'Check the small number: how many times.'),
  };
  // a point on the four-quadrant grid: m {max, target 'x,y'}; state: [across, up]
  K2MM.xy4 = {
    raw: true,
    s0: () => [0, 0],
    val: (q, s) => s.join(','),
    ans: q => q.m.target.split(',').map(Number),
    step: (q, s, i, d) => { const o = s.slice(); o[i] += d; return Math.abs(o[i]) > q.m.max ? null : o; },
    draw: (q, s) => ls6mXY(s[0], s[1], q.m.max),
    ctl: () => `<div class="mmc mmcol">${mmRow('Across', 0, true)}${mmRow('Up', 1, true)}</div>`,
    of: (q, v) => String(v).split(',').map(Number),
    fits: (q, v) => /^-?\d+,-?\d+$/.test(String(v)) && String(v).split(',').every(x => Math.abs(+x) <= q.m.max),
    miss: (q, s) => { const [x, y] = K2MM.xy4.ans(q); return s[0] == y && s[1] == x ? 'Across first, then up.' : s[0] == -x && s[0] ? 'Check the sign: left of zero is negative.'
      : s[1] == -y && s[1] ? 'Check the sign: below zero is negative.' : s[0] != x ? 'Check how far across.' : 'Check how far up.'; },
  };
  // a shape's base and height: m {sh, b, h, tp, off}; state: [base, height]
  K2MM.tri = {
    raw: true,
    s0: () => [2, 2],
    val: (q, s) => ls6mArea(q.m.sh, s[0], s[1], q.m.tp),
    ans: q => [q.m.b, q.m.h],
    step: (q, s, i, d) => { const o = s.slice(); o[i] += d; return o[0] < 1 || o[0] > 10 || o[1] < 1 || o[1] > 8 ? null : o; },
    draw: (q, s) => ls6mShape(q.m.sh, s[0], s[1], {tp: q.m.tp, off: ls6mOff(q.m, s[0])}),
    ctl: () => `<div class="mmc mmcol">${mmRow('Base', 0, true)}${mmRow('Height', 1, true)}</div>`,
    miss: (q, s) => (s[0] != q.m.b ? 'Check the base: the bottom side.' : 'Check the height: straight up.'),
  };
  // hops of a and of b: m {a, b, target (the least common multiple)}; state: [hops of a, hops of b]
  K2MM.mults = {
    raw: true,
    s0: () => [1, 1],
    val: (q, s) => (q.m.a * s[0] == q.m.b * s[1] ? q.m.a * s[0] : 0),
    ans: q => [q.m.target / q.m.a, q.m.target / q.m.b],
    step: (q, s, i, d) => { const o = s.slice(); o[i] += d; return o[i] < 1 || o[i] > 12 ? null : o; },
    draw: (q, s) => ls6mHops(q.m.a, q.m.b, s[0], s[1]),
    ctl: q => `<div class="mmc mmcol">${mmRow('Hops of ' + q.m.a, 0, false)}${mmRow('Hops of ' + q.m.b, 1, false)}</div>`,
    of: (q, v) => [+v / q.m.a, +v / q.m.b],
    fits: (q, v) => +v > 0 && +v % q.m.a == 0 && +v % q.m.b == 0 && +v / q.m.a <= 12 && +v / q.m.b <= 12,
    miss: (q, s) => { const x = q.m.a * s[0], y = q.m.b * s[1]; return x == y ? 'They meet. Is there an earlier place they meet?' : x < y ? `Hop more ${q.m.a}s.` : `Hop more ${q.m.b}s.`; },
  };
  // equal groups of both numbers: m {a, b, target (the greatest common factor)}; state: [group size]
  K2MM.gcf = {
    raw: true,
    s0: () => [1],
    val: (q, s) => s[0],
    ans: q => [q.m.target],
    step: (q, s, i, d) => (s[0] + d < 1 || s[0] + d > Math.min(q.m.a, q.m.b) ? null : [s[0] + d]),
    draw: (q, s) => ls6mGroups(q.m.a, q.m.b, s[0]),
    ctl: () => `<div class="mmc mmcol">${mmRow('Group size', 0, true)}</div>`,
    of: (q, v) => [+v],
    fits: (q, v) => Number.isInteger(+v) && +v >= 1 && +v <= Math.min(q.m.a, q.m.b),
    miss: (q, s) => (q.m.a % s[0] || q.m.b % s[0] ? 'Something is left over. Try another size.' : 'Both split evenly. Is there a bigger size?'),
  };
  // the level line: m {vals, target (the mean)}; state: [level]
  K2MM.lev = {
    raw: true,
    s0: q => [q.m.s0 != null ? q.m.s0 : 1],
    val: (q, s) => s[0],
    ans: q => [q.m.target],
    step: (q, s, i, d) => (s[0] + d < 0 || s[0] + d > 10 ? null : [s[0] + d]),
    draw: (q, s) => ls6mTowers(q.m.vals, s[0]) + `<div class="ls6m-st"><span class="ls6m-up">Above the line: ${ls6mAbove(q.m.vals, s[0])}</span><span class="ls6m-dn">Gaps below: ${ls6mGaps(q.m.vals, s[0])}</span></div>`,
    ctl: () => `<div class="mmc mmcol">${mmRow('Level', 0, true)}</div>`,
    of: (q, v) => [+v],
    fits: (q, v) => Number.isInteger(+v) && +v >= 0 && +v <= 10,
    miss: (q, s) => (ls6mAbove(q.m.vals, s[0]) > ls6mGaps(q.m.vals, s[0]) ? 'More above than gaps. Raise the line.' : 'More gaps than blocks above. Lower the line.'),
  };
  // groups of b parts over a parts of d: m {d, a, b, target}; state: [groups]
  K2MM.fit = {
    raw: true,
    s0: () => [1],
    val: (q, s) => s[0],
    ans: q => [q.m.target],
    step: (q, s, i, d) => (s[0] + d < 1 || (s[0] + d) * q.m.b > q.m.d ? null : [s[0] + d]),
    draw: (q, s) => ls6mFit(q.m.d, q.m.a, q.m.b, s[0]),
    ctl: () => `<div class="mmc mmcol">${mmRow('Groups', 0, true)}</div>`,
    of: (q, v) => [+v],
    fits: (q, v) => Number.isInteger(+v) && +v >= 1 && +v * q.m.b <= q.m.d,
    miss: (q, s) => (s[0] * q.m.b > q.m.a ? 'Too many. A group goes past the shaded part.' : 'More groups fit in the shaded part.'),
  };
}
// where the top of a shape starts across, for a base b (a triangle's top point stays over its base; a trapezoid's top fits over it)
const ls6mOff = (m, b) => (m.sh == 'tri' ? Math.min(m.off || 1, b) : m.sh == 'trap' ? Math.max(0, Math.min(m.off || 0, b - (m.tp || 0))) : m.off || 1);
// the area of a shape (tri, par, trap with top tp) of base b and height h
const ls6mArea = (sh, b, h, tp) => (sh == 'tri' ? b * h / 2 : sh == 'par' ? b * h : (b + (tp || 0)) * h / 2);
// the equation bars of m with x = v; ok: mark the two bars when they are the same length
function ls6mEqDraw(m, v, ok) {
  if (m.parts) return ls6mEqBars([v, 'x = ' + v, 'v1'], m.parts.map((p, i) => [p, p, i ? 'v2' : 'vo']), {show: ok});
  const ps = Array.from({length: m.g || 1}, () => [v, m.g > 1 || m.c ? v : 'x = ' + v, 'v1']);
  if (m.c) ps.push([m.c, m.c, 'v2']);
  return ls6mEqBars([m.tot, m.lab || m.tot], ps, {show: ok});
}
// an exponent: the base written that many times, and its square or cube drawn
function ls6mPowDraw(b, e) {
  const w = Array(e).fill(b).join(' × '), v = Math.pow(b, e);
  const pic = e == 2 && b <= 10 ? VIZ.areaGrid(b, b) : e == 3 && b <= 5 ? VIZ.solid([{l: b, h: b}], {w: b, grid: 1}) : '';
  return `<div class="ls6m-pow">${pic}<div class="eq">${b}<sup>${e}</sup> = ${e > 1 ? w + ' = ' : ''}${v}</div></div>`;
}
// the checkers (LSGOAL, 52b-know.js): a raw state, or a value as text
Object.assign(LSGOAL, {
  pow: (q, v) => (Array.isArray(v) ? v[0] == q.m.b && v[1] == q.m.e : +v == Math.pow(q.m.b, q.m.e) && q.m.b > 1),
  bh: (q, v) => (Array.isArray(v) ? v[0] == q.m.b && v[1] == q.m.h : +v == ls6mArea(q.m.sh, q.m.b, q.m.h, q.m.tp)),
  xy4: (q, v) => (Array.isArray(v) ? v.join(',') : String(v)) === q.m.target,
});
