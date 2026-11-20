/* Star School teach6 v189. BUILT by tools/build.py from 52u-teach6.css, 52u-bench6.js, 52v-lessons6.js: never edit by hand.
   index.html v189 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v189.js. */
(function(){var s=document.createElement('style');s.id='css-teach6';s.textContent="/* TEACH-6M: the models of the grade 6 lessons (52u-bench6.js): the ratio table, the number line from -10 to 10, the hundred grid and the\n   percent bar, equations as bars, powers, the four-quadrant grid, shapes in their rectangles, hops of multiples, equal groups, level\n   towers, groups over a fraction bar. Tokens only; every button is at least var(--tap); text at least 16 px. */\n.ls6m-rt{border-collapse:separate;border-spacing:2px;margin:0 auto;font-weight:700}\n.ls6m-rt th{font-size:var(--fs-2);color:var(--ink-2);background:var(--surface-2);border-radius:var(--r-chip);padding:2px var(--s-2);text-align:left}\n.ls6m-rt td{font-size:var(--fs-3);color:var(--ink);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line);border-radius:var(--r-chip);text-align:center;padding:2px var(--s-2);min-width:2.4em}\n.ls6m-rt td.ls6m-last{background:var(--math-tint);box-shadow:inset 0 0 0 3px var(--math)}\n.ls6m-rt td.ls6m-gap{background:none;box-shadow:none;color:var(--ink-3);min-width:1em}\n.viz .ls6m-gl{fill:none;stroke:var(--ink-3);stroke-width:1;opacity:.55}\n.viz .ls6m-box{fill:none;stroke:var(--ink-2);stroke-width:2}\n.viz .ls6m-eq{fill:none;stroke:var(--good);stroke-width:4}\n.viz .ls6m-ht{stroke-dasharray:5 4}\n.viz text.ls6m-sl{fill:var(--ink-2)}\n.viz .ls6m-left{fill:var(--surface-2);stroke:var(--ink-2);stroke-width:2;stroke-dasharray:5 4}\n.viz .ls6m-gap6{fill:none;stroke:var(--play-shade);stroke-width:2;stroke-dasharray:4 3}\n.viz .ls6m-lv{fill:none;stroke:var(--brand-shade);stroke-width:4;stroke-dasharray:9 5}\n.viz .ls6m-br{fill:none;stroke:var(--math-shade);stroke-width:3}\n.viz .ls6m-br.ls6m-b2{stroke:var(--play-shade)}\n.viz .ls6m-far{fill:none;stroke:var(--try-ink);stroke-width:3;stroke-dasharray:6 4}\n.ls6m-pv{font-size:var(--fs-4)}\n.ls6m-st{display:flex;flex-wrap:wrap;justify-content:center;gap:var(--s-2);font-weight:700;font-size:var(--fs-2)}\n.ls6m-st span{padding:2px var(--s-2);border-radius:var(--r-pill);background:var(--surface-2);color:var(--ink)}\n.ls6m-st .ls6m-up{box-shadow:inset 0 0 0 2px var(--play-shade)}\n.ls6m-st .ls6m-dn{box-shadow:inset 0 0 0 2px var(--math-shade)}\n.ls6m-hops{display:flex;flex-direction:column;gap:var(--s-1);align-items:flex-start;max-width:100%;overflow:hidden}\n.ls6m-hr{display:flex;flex-wrap:wrap;gap:4px;align-items:center}\n.ls6m-hl{font-weight:700;color:var(--ink-2);min-width:2.6em;font-size:var(--fs-2)}\n.ls6m-ch{font-weight:700;font-size:var(--fs-2);min-width:2.2em;text-align:center;padding:2px 4px;border-radius:var(--r-chip);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line);color:var(--ink)}\n.ls6m-ch.l1{background:var(--math-tint);box-shadow:inset 0 0 0 3px var(--math)}\n.ls6m-ch.l2{background:var(--play-tint);box-shadow:inset 0 0 0 3px var(--play-shade)}\n.ls6m-ch.ok{background:var(--good-tint);box-shadow:inset 0 0 0 3px var(--good)}\n.ls6m-lists{display:flex;flex-direction:column;gap:var(--s-1);font-weight:700;font-size:var(--fs-3);color:var(--ink);text-align:center;margin:0 auto var(--s-1)}\n.ls6m-pow{display:flex;flex-direction:column;align-items:center;gap:var(--s-1)}\n.ls6m-pow .viz{max-height:150px;max-width:100%;height:auto}\n.ls6m-pow .eq{font-size:var(--fs-3)}\n.viz.ls6m-xy text{font-size:22px}\n.viz.ls6m-xyq text{font-size:30px}\n.viz.ls6m-nl text{font-size:18px}\n.viz-pbar text,.viz text.ls6m-sm{font-size:18px}\n.viz-tow text{font-size:19px}\n.ls6m-pow sup,.mm-pow sup{font-size:max(16px,.7em)}\n.mm-iline .mmv .viz,.mm-fit .mmv .viz,.mm-eqbar .mmv .viz,.mm-gcf .mmv .viz{max-width:100%;height:auto}\n.mm-pct .mmv .viz{max-height:200px;max-width:100%;height:auto}\n.mm-xy4 .mmv .viz{max-height:250px;max-width:100%;height:auto}\n.mm-tri .mmv .viz{max-height:220px;max-width:100%;height:auto}\n.mm-lev .mmv .viz{max-height:210px;max-width:100%;height:auto}\n@media (max-width:420px){.mm-xy4 .mmv .viz{max-height:250px}.mm-tri .mmv .viz,.mm-lev .mmv .viz{max-height:180px}.mm-pct .mmv .viz{max-height:170px}}\n";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)
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
/* ---------- TEACH-6M: the grade 6 math lessons (part teach6, after 52u-bench6.js; TEACH-PLAN-2 batch 5, grade 6) ----------
   Each is a drafted lesson like the TEACH-3 ones (lsDraft3, 52i-bench35.js): its code here chooses every number, question, model and
   misconception code; its words are a draft in docs/drafts/<stop>.md that the owner reads (docs/drafts/BATCH6M-READ.md, the read-through
   of batch '6m'); until the owner approves a draft the lesson runs on its hand-written fallback words (the idea, tonight's question, a
   Name it line with the child's own numbers, each code's reason). D.b6m marks the lessons of this batch (tools/author.js --read --batch 6m).
   They are grade 3-6 lessons (LS_B35), so the TEACH-3 checks run them too; the 6th grader hears the teen-like partner (lsAge).
   The stages, as in TEACH-3: 0 build on the model, 1 a picture and a typed answer, 2 the symbols or the story alone; the show-me items
   and Show are typed (never a choice). No picture shows the answer: the part asked for is a "?" (v184 review rule). Check me is the
   pet's own answer on a stage 1 question (petSt), wrong by the child's held idea or the lesson's codes (lsPetItem35); the equation and
   expression lessons also show the pet's written steps and take "your problem" (D.fix, D.mine, as TEACH-3's Order of Operations). */
const ls6mL = (id, t, g, o) => Object.assign(ls3(id, t, g, o), {b6m: 1});
// a typed number that may be negative (the pad's plus-or-minus key; said "negative 4")
const ls6mQ = (D, st, ans, html, say, o) => lsDq(D, st, Object.assign({kind: 'num', ans, html, say, pad: 'neg', max: 3, vsay: ls6mSay}, o));
// every question's label names its own numbers (the default label is the stop and the answer, so two questions with the same answer
// would look the same to a resumed Show, which asks fresh items: fix179)
const ls6mLab = D => { const q0 = D.q; D.q = (st, r) => { const q = q0(st, r); q.label = `${D.sk}${D.lv} ${st} ${q.say} #${ls6mHash(q.html)}`; return q; }; return D; };
const ls6mHash = t => { let h = 5381; for (let i = 0; i < t.length; i++) h = (h * 33 + t.charCodeAt(i)) >>> 0; return h.toString(36); };
const ls6mSt = t => `<p class="story">${esc(t)}</p>`;
const ls6mPk = (r, a) => a[Math.floor(r() * a.length)];
// a sum warm-up (the mean lesson), a take-away warm-up (the equation lessons)
const ls6mWarmSub = D => r => { const a = lsRi(r, 12, 60), b = lsRi(r, 5, a - 2); return lsDq(D, 0, {kind: 'num', ans: a - b, html: lsEq(`${a} − ${b} = ${SLOT}`), say: `${a} minus ${b} equals what?`,
  sl: {a, b}, hint: {k: 'text', s: `Count up from ${b} to ${a}.`}, bug: {}}); };
const LS6M_REM = {remember: ['a', 'b']};

/* ---- Sky City: Ratios and Tables (a ratio table grows by groups), Unit Rates (a bar model shares the cost) ---- */
const LS6M_RATIO = [['Red', 'Blue', 'red beads', 'blue beads'], ['Cats', 'Dogs', 'cats', 'dogs'], ['Apples', 'Pears', 'apples', 'pears'], ['Laps', 'Minutes', 'laps', 'minutes']];
const LS6M_BRIEF_RT = `Explore: a ratio table of red and blue beads (2 red for every 3 blue); the child adds groups (columns) with a stepper.
Name it: the table they built; lines on it (slots {k}: the groups, {a}: the red beads, {b}: the blue beads) and the idea: a ratio table grows by multiplying both rows by the same number, never by adding the same amount.
Together (no slots: the numbers are on the screen and the app says them): line 1 before building a ratio table out to a given amount, line 2 before a table with one empty box (they type it), line 3 before a ratio in words only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two ratio questions to type, no help, inside a small job in the world (no slots).`;
function ls6mRatio1(id, t, g, idea, home) {
  const D = ls6mL(id, t, g, {petSt: 1, bugs: ['addRat', 'ratSwap'], brief: LS6M_BRIEF_RT, idea, home, fb: '{k} groups make {a} red and {b} blue.', test: 2,
    slots: {remember: ['a', 'b'], explore: [], name: ['k', 'a', 'b'], together: [], check: ['ans'], show: []}});
  D.q = (st, r) => {
    const [na, nb, wa, wb] = ls6mPk(r, LS6M_RATIO);
    let a, b; do { a = lsRi(r, 2, 6); b = lsRi(r, 2, 7); } while (a == b || ls6mGcd(a, b) > 1);
    const k = lsRi(r, 3, 6), back = st == 2 && r() < .4;
    // the amount given is in one row; the other row is asked (back: the b row is given, the a row asked)
    const ans = back ? k * a : k * b, giv = back ? k * b : k * a, bug = back ? {addRat: [a + (k * b - b)], ratSwap: [k * b]} : {addRat: [b + (k * a - a)], ratSwap: [k * a]};
    const T = `${a} ${wa} for every ${b} ${wb}.`, hint = {k: 'text', s: back ? `${k * b} is ${b} × ${k}. Multiply ${a} by ${k} too.` : `${k * a} is ${a} × ${k}. Multiply ${b} by ${k} too.`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'rtab', m: {a, b, na, nb, target: k * b, ka: k * a}, goal: 'value', eq: 'value', ans: k * b, sl: {}, bug: {addRat: [b + (k * a - a)]}, hint,
      ansSay: `${k * a} ${wa} and ${k * b} ${wb}`, html: ls6mSt(T) + lsCap(`Add groups until there are ${k * a} ${wa}.`), say: `${T} Add groups until there are ${k * a} ${wa}.`});
    const ask = back ? `How many ${wa} go with ${giv} ${wb}?` : `How many ${wb} go with ${giv} ${wa}?`;
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans, sl: {}, bug, hint, html: ls6mSt(T) + `<div class="pkq">${ls6mRatio(a, b, k, na, nb, {hideB: 1})}</div>` + lsCap(ask) + lsEq(SLOT), say: `${T} ${ask}`});
    return lsDq(D, 2, {kind: 'num', ans, sl: {}, bug, hint, html: ls6mSt(T) + lsCap(ask) + lsEq(SLOT), say: `${T} ${ask}`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'rtab', m: {a: 2, b: 3, na: 'Red', nb: 'Blue', target: 9, ka: 6}, goal: 'moved', eq: 'value', ans: 9, raw: 1, sl: {}, demo: [4],
    html: ls6mSt('2 red beads for every 3 blue beads.') + lsCap('Add as many groups as you like.'), say: '2 red beads for every 3 blue beads. Add as many groups as you like.'}), nudge: 'Add a group, then check.',
  react: v => { const k = Array.isArray(v) ? v[0] : Math.round(+v / 3) || 4; return {ctx: {k, a: 2 * k, b: 3 * k}, lines: [`${qN(k, 'group', 'groups')}: ${2 * k} red and ${3 * k} blue.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls6mRatio(2, 3, c.k, 'Red', 'Blue', {mark: false})}</div>` + lsEq(`2 : 3 = ${c.a} : ${c.b}`), sl: c});
  return D;
}
// a rate story: [the story for n and T, the question for 1, the question for m, one, the thing]
const LS6M_RATE = [[(n, T) => `${n} bags of rice cost ${T} dollars.`, 'How many dollars for 1 bag?', m => `How many dollars for ${m} bags?`, 'bag'],
  [(n, T) => `${n} tickets cost ${T} dollars.`, 'How many dollars for 1 ticket?', m => `How many dollars for ${m} tickets?`, 'ticket'],
  [(n, T) => `A train goes ${T} miles in ${n} hours at a steady speed.`, 'How many miles in 1 hour?', m => `How many miles in ${m} hours?`, 'hour'],
  [(n, T) => `${n} boxes hold ${T} pencils, the same in each.`, 'How many pencils in 1 box?', m => `How many pencils in ${m} boxes?`, 'box']];
const LS6M_BRIEF_UR = `Explore: a bar model of equal boxes; the child picks how many boxes and how many in each with steppers; the app says the total.
Name it: the bar they built; lines on it (slots {a}: the boxes, {b}: how many in each, {sum}: the total) and the idea: a unit rate is how much for one; share the total equally by the number of items, then multiply for more items.
Together (no slots: each story has its own numbers and the app reads it out): line 1 before building the story's bar model, line 2 before a bar model with the total and a "?" in each box (they type the rate for one), line 3 before a story alone that uses the rate for more items.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two rate questions to type, no help, inside a small job in the world (no slots).`;
function ls6mRatio2(id, t, g, idea, home) {
  const D = ls6mL(id, t, g, {petSt: 1, bugs: ['wrongOp', 'addRat'], brief: LS6M_BRIEF_UR, idea, home, fb: '{a} boxes of {b} make {sum}.', test: 2,
    slots: {remember: ['a', 'b'], explore: [], name: ['a', 'b', 'sum'], together: [], check: ['ans'], show: []}});
  D.q = (st, r) => {
    const [story, ask1, askM, one] = ls6mPk(r, LS6M_RATE), n = lsRi(r, 2, 8), u = lsRi(r, 2, 12), T = n * u, S0 = story(n, T);
    const hint = {k: 'text', s: `Share ${T} equally into ${n}: ${T} ÷ ${n}.`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'tape', m: {g: n, n: u}, goal: 'groups', eq: 'value', ans: T, ansSay: `${n} boxes of ${u}`, sl: {}, bug: {}, hint,
      html: ls6mSt(S0) + lsCap(`Build the bar: one box for each ${one}. What goes in each?`), say: `${S0} Build the bar: one box for each ${one}.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: u, sl: {}, bug: {wrongOp: [T * n, T - n, T + n], addRat: [T - (n - 1)]}, hint,
      html: ls6mSt(S0) + `<div class="pkq">${ls3bTape(n, u, {tot: T, q: 1})}</div>` + lsCap(ask1) + lsEq(SLOT), say: `${S0} ${ask1}`});
    let m; do m = lsRi(r, 2, 15); while (m == n);
    const ans = m * u, ask = askM(m);
    return lsDq(D, 2, {kind: 'num', ans, sl: {}, bug: {addRat: [T + (m - n)], wrongOp: [T * m, T + m]}, hint: {k: 'text', s: `First the rate for 1: ${T} ÷ ${n}. Then times ${m}.`},
      html: ls6mSt(S0) + lsCap(ask) + lsEq(SLOT), say: `${S0} ${ask}`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'tape', m: {g: 3, n: 4}, goal: 'moved', eq: 'value', ans: 12, raw: 1, sl: {}, demo: [4, 5],
    html: lsCap('Build any bar of equal boxes.'), say: 'Build any bar you like: pick the boxes, and how many go in each.'}), nudge: 'Change the boxes or how many in each, then check.',
  react: v => { const [a, b] = Array.isArray(v) ? v : [4, 5]; return {ctx: {a, b, sum: a * b}, lines: [`${qN(a, 'box', 'boxes')} of ${b} ${qW(a, 'makes', 'make')} ${a * b}. One box is ${b}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls3bTape(c.a, c.b, {tot: c.sum})}</div>` + lsEq(`${c.sum} ÷ ${c.a} = ${c.b}`), sl: c});
  return D;
}

/* ---- Sky City: Integers on a Line, Absolute Value, Integer Add & Subtract (a number line from -10 to 10) ---- */
const LS6M_INT = [['temp', n => `It is ${ls6mN(n)} degrees.`, n => `${ls6mSay(n)} degrees`], ['floor', n => (n < 0 ? `The lift is ${-n} floors below the ground.` : `The lift is ${n} floors above the ground.`), n => `floor ${ls6mSay(n)}`],
  ['sea', n => (n < 0 ? `A diver is ${-n} meters below the sea.` : `A bird is ${n} meters above the sea.`), n => `${ls6mSay(n)} meters`]];
const LS6M_BRIEF_INT1 = `Explore: a number line from negative ten to ten; the child moves a dot anywhere with steppers.
Name it: the dot they placed; lines on it (slots {x}: where the dot is, {n}: how many steps from zero) and the idea: negative numbers sit to the left of zero, and further left is always less.
Together (no slots: the number is on the screen and the app says it): line 1 before putting a dot on a number (a temperature, a floor or a depth), line 2 before reading a dot on the line (they type the number), line 3 before comparing two numbers in words only (they type the greater one).
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two questions to type, no help, inside a small job in the world (no slots).`;
function ls6mInt1(id, t, g, idea, home) {
  const D = ls6mL(id, t, g, {petSt: 1, bugs: ['negSide', 'negBig'], brief: LS6M_BRIEF_INT1, idea, home, fb: 'Your dot is at {x}, {n} steps from zero.', test: 2,
    slots: {remember: ['a', 'b'], explore: [], name: ['x', 'n'], together: [], check: ['ans'], show: []}});
  const hint = {k: 'text', s: 'Negative numbers are left of zero. Further left is less.'};
  D.q = (st, r) => {
    let n; do n = lsRi(r, -9, 9); while (!n || n % 5 == 0 || n > 0 && r() < .65);
    if (st == 0) { const [, txt, sy] = ls6mPk(r, LS6M_INT);
      return lsDq(D, 0, {kind: 'make', model: 'iline', m: {min: -10, max: 10, target: n, s0: 0}, goal: 'value', eq: 'value', ans: n, sl: {}, bug: {negSide: [-n]}, hint, vsay: ls6mSay,
        ansSay: sy(n), html: ls6mSt(txt(n)) + lsEq(ls6mN(n)) + lsCap('Put the dot on the number.'), say: `${txt(n).replace(/−(\d)/, 'negative $1')} Put the dot on ${ls6mSay(n)}.`}); }
    if (st == 1) return ls6mQ(D, 1, n, `<div class="pkq">${ls6mLine(n)}</div>` + lsCap('What number is the dot on?') + lsEq(SLOT), 'What number is the dot on?', {sl: {}, bug: {negSide: [-n]}, hint});
    let m; do m = lsRi(r, -9, 9); while (m == n || m == -n || m >= 0 && n >= 0);
    const big = Math.max(n, m), small = Math.min(n, m), bug = {negBig: [small]};
    if (small < 0 && big < 0) bug.negSide = [-small];
    return ls6mQ(D, 2, big, lsCap(`Which is greater: ${ls6mN(n)} or ${ls6mN(m)}? Type it.`) + lsEq(SLOT), `Which is greater, ${ls6mSay(n)} or ${ls6mSay(m)}? Type it.`, {sl: {}, bug, hint});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'iline', m: {min: -10, max: 10, target: -3, s0: 0}, goal: 'moved', eq: 'value', ans: -3, raw: 1, sl: {}, demo: [-4], vsay: ls6mSay,
    html: lsCap('Move the dot anywhere on the line.'), say: 'Move the dot anywhere you like on the line.'}), nudge: 'Move the dot, then check.',
  react: v => { const x = Array.isArray(v) ? v[0] : +v; return {ctx: {x, n: Math.abs(x)}, lines: [x ? `${ls6mSay(x)} is ${qN(Math.abs(x), 'step', 'steps')} ${x < 0 ? 'left' : 'right'} of zero.` : 'Zero is in the middle.']}; }});
  D.name = c => ({html: `<div class="pkq">${ls6mLine(c.x)}</div>` + lsEq(c.x < 0 ? `${ls6mN(c.x)} < 0` : c.x > 0 ? `${c.x} > 0` : '0'), sl: c});
  return D;
}
const LS6M_BRIEF_INT2 = `Explore: a number line from negative ten to ten with a hop drawn from zero to a dot; the child moves the dot anywhere.
Name it: the hop they made; lines on it (slots {x}: where the dot is, {n}: how long the hop is) and the idea: the absolute value is the distance from zero, so it is never negative; across zero, add the two distances.
Together (no slots: the numbers are on the screen and the app says them): line 1 before putting a dot on a number with the hop from zero, line 2 before a hop from zero to a dot (they type how far), line 3 before an absolute value or a distance between two numbers in symbols or words only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two distances to type, no help, inside a small job in the world (no slots).`;
function ls6mInt2(id, t, g, idea, home) {
  const D = ls6mL(id, t, g, {petSt: 1, bugs: ['absNeg', 'absDist'], brief: LS6M_BRIEF_INT2, idea, home, fb: 'Your dot is at {x}, a hop of {n} from zero.', test: 2,
    slots: {remember: ['a', 'b'], explore: [], name: ['x', 'n'], together: [], check: ['ans'], show: []}});
  const hint = {k: 'text', s: 'Count the steps from zero. A distance is never negative.'};
  D.q = (st, r) => {
    let n; do n = lsRi(r, -9, 9); while (!n || n % 5 == 0 || n > 0 && r() < .75);
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'iline', m: {min: -10, max: 10, from: 0, target: n}, goal: 'value', eq: 'value', ans: n, sl: {}, bug: {absNeg: [Math.abs(n)].filter(x => x != n)}, hint, vsay: ls6mSay,
      ansSay: `${ls6mSay(n)}: ${qN(Math.abs(n), 'step', 'steps')} from zero`, html: lsEq(`|${ls6mN(n)}|`) + lsCap(`Hop from zero to ${ls6mN(n)}.`), say: `The absolute value of ${ls6mSay(n)}. Hop from zero to ${ls6mSay(n)}.`});
    if (st == 1) return ls6mQ(D, 1, Math.abs(n), `<div class="pkq">${ls6mLine(n, {from: 0, lab: '?'})}</div>` + lsCap('How far is the dot from zero?') + lsEq(`|${ls6mN(n)}| = ${SLOT}`),
      `How far is ${ls6mSay(n)} from zero?`, {sl: {}, bug: {absNeg: [n].filter(x => x < 0)}, hint});
    if (r() < .5) return ls6mQ(D, 2, Math.abs(n), lsEq(`|${ls6mN(n)}| = ${SLOT}`), `The absolute value of ${ls6mSay(n)} equals what?`, {sl: {}, bug: {absNeg: [n].filter(x => x < 0)}, hint});
    const a = -lsRi(r, 1, 8), b = lsRi(r, 1, 9), ans = b - a;
    return ls6mQ(D, 2, ans, lsCap(`How far apart are ${ls6mN(a)} and ${b} on the line?`) + lsEq(SLOT), `How far apart are ${ls6mSay(a)} and ${b}?`,
      {sl: {}, bug: {absDist: [Math.abs(b + a)].filter(x => x != ans), absNeg: [-ans]}, hint: {k: 'text', s: `From ${ls6mN(a)} to zero, then from zero to ${b}: add the two.`}});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'iline', m: {min: -10, max: 10, from: 0, target: -4}, goal: 'moved', eq: 'value', ans: -4, raw: 1, sl: {}, demo: [-6], vsay: ls6mSay,
    html: lsCap('Move the dot anywhere. The hop starts at zero.'), say: 'Move the dot anywhere you like. The hop starts at zero.'}), nudge: 'Move the dot, then check.',
  react: v => { const x = Array.isArray(v) ? v[0] : +v; return {ctx: {x, n: Math.abs(x)}, lines: [`${ls6mSay(x)} is a hop of ${Math.abs(x)} from zero.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls6mLine(c.x, {from: 0, lab: String(c.n)})}</div>` + lsEq(`|${ls6mN(c.x)}| = ${c.n}`), sl: c});
  return D;
}
const LS6M_BRIEF_INT3 = `Explore: a number line from negative ten to ten with a start mark at negative three; the child moves the dot anywhere and the hop is drawn.
Name it: the hop they made; lines on it (slots {x}: where they ended, {n}: how many steps they moved) and the idea: adding moves right, taking away moves left; adding a negative number moves left too.
Together (no slots: the numbers are on the screen and the app says them): line 1 before moving from a start number by an amount on the line, line 2 before a line with only the start marked (they type where they land), line 3 before a sum or a difference in symbols only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two sums or differences to type, no help, inside a small job in the world (no slots).`;
function ls6mInt3(id, t, g, idea, home) {
  const D = ls6mL(id, t, g, {petSt: 1, bugs: ['negDir', 'negIgn'], brief: LS6M_BRIEF_INT3, idea, home, fb: 'From negative three you moved {n} steps to {x}.', test: 2,
    slots: {remember: ['a', 'b'], explore: [], name: ['x', 'n'], together: [], check: ['ans'], show: []}});
  const pick = (r, lim) => { for (;;) { const a = lsRi(r, -lim + 1, lim - 1), b = lsRi(r, 2, 9), f = lsRi(r, 0, 2), ans = f == 1 ? a - b : a + (f == 2 ? -b : b);
    if (a && Math.abs(ans) <= lim && (a < 0 || ans < 0)) return [a, b, f, ans]; } };
  const ex = (a, b, f) => `${ls6mN(a)} ${f == 1 ? '−' : '+'} ${f == 2 ? `(−${b})` : b}`, ey = (a, b, f) => `${ls6mSay(a)} ${f == 1 ? 'minus' : 'plus'} ${f == 2 ? 'negative ' : ''}${b}`;
  const bugOf = (a, b, f, ans) => ({negDir: [f == 1 || f == 2 ? a + b : a - b].filter(x => x != ans), negIgn: a < 0 ? [f == 0 ? -a + b : -a - b].filter(x => x != ans) : []});
  D.q = (st, r) => {
    const [a, b, f, ans] = pick(r, st < 2 ? 10 : 15), hint = {k: 'text', s: `Start at ${ls6mN(a)}. ${f == 0 ? 'Adding moves right' : 'Taking away, or adding a negative, moves left'} ${b} steps.`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'iline', m: {min: -10, max: 10, from: a, target: ans}, goal: 'value', eq: 'value', ans, sl: {}, bug: bugOf(a, b, f, ans), hint, vsay: ls6mSay,
      ansSay: ls6mSay(ans), html: lsEq(ex(a, b, f)) + lsCap(`Start at ${ls6mN(a)}. Move the dot.`), say: `${ey(a, b, f)}. Start at ${ls6mSay(a)} and move the dot.`});
    if (st == 1) return ls6mQ(D, 1, ans, `<div class="pkq">${ls6mLine(null, {from: a})}</div>` + lsEq(`${ex(a, b, f)} = ${SLOT}`), `${ey(a, b, f)} equals what? Start at the mark.`, {sl: {}, bug: bugOf(a, b, f, ans), hint});
    return ls6mQ(D, 2, ans, lsEq(`${ex(a, b, f)} = ${SLOT}`), `${ey(a, b, f)} equals what?`, {sl: {}, bug: bugOf(a, b, f, ans), hint});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'iline', m: {min: -10, max: 10, from: -3, target: 2}, goal: 'moved', eq: 'value', ans: 2, raw: 1, sl: {}, demo: [4], vsay: ls6mSay,
    html: lsCap('Start at −3. Move the dot anywhere.'), say: 'Start at negative 3. Move the dot anywhere you like.'}), nudge: 'Move the dot, then check.',
  react: v => { const x = Array.isArray(v) ? v[0] : +v, n = Math.abs(x + 3); return {ctx: {x, n}, lines: [`From negative 3 you moved ${n} ${x > -3 ? 'right' : 'left'} to ${ls6mSay(x)}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls6mLine(c.x, {from: -3, lab: (c.x >= -3 ? '+' : '−') + c.n})}</div>` + lsEq(c.x >= -3 ? `−3 + ${c.n} = ${ls6mN(c.x)}` : `−3 − ${c.n} = ${ls6mN(c.x)}`), sl: c});
  return D;
}

/* ---- Sky City: Percent of a Number (a bar of a whole in ten boxes), Fractions and Percents (a hundred grid) ---- */
const LS6M_BRIEF_PCT = `Explore: a bar for 60 cut into ten boxes (each box is ten percent); the child shades any percent with steppers.
Name it: the bar they shaded; lines on it (slots {n}: the percent, {k}: the whole, {a}: that part of the whole) and the idea: percent means out of a hundred; ten percent is one tenth, so find one tenth and take as many as the percent says.
Together (no slots: the numbers are on the screen and the app says them): line 1 before shading a percent of a bar, line 2 before a shaded bar with the whole on top (they type the part), line 3 before a percent of a number in symbols only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two percents of numbers to type, no help, inside a small job in the world (no slots).`;
function ls6mRatio3(id, t, g, idea, home) {
  const D = ls6mL(id, t, g, {petSt: 1, bugs: ['pctNum', 'pct10'], brief: LS6M_BRIEF_PCT, idea, home, fb: '{n} percent of {k} is {a}.', test: 2,
    slots: {remember: ['a', 'b'], explore: [], name: ['n', 'k', 'a'], together: [], check: ['ans'], show: []}});
  D.q = (st, r) => {
    const T = 20 * lsRi(r, 1, 10), p = ls6mPk(r, [20, 30, 40, 60, 70, 80, 90, 25, 75, 50]), ans = T * p / 100;
    const bug = {pctNum: [p], pct10: [T / 10]}, hint = {k: 'text', s: `One box is ten percent: ${T} ÷ 10 = ${T / 10}. ${p % 10 ? 'A half box is half of that.' : `Take ${p / 10} boxes.`}`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'pct', m: {T, target: p}, goal: 'value', eq: 'value', ans: p, sl: {}, bug: {pct10: [10]}, hint,
      ansSay: `${p} percent of ${T} is ${ans}`, html: lsEq(`${p}% of ${T}`) + lsCap(`Shade ${p}% of the bar.`), say: `${p} percent of ${T}. Shade ${p} percent of the bar.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans, sl: {}, bug, hint, html: `<div class="pkq">${ls6mPBar(T, p, {q: 1})}</div>` + lsEq(`${p}% of ${T} = ${SLOT}`), say: `${p} percent of ${T} equals what?`});
    return lsDq(D, 2, {kind: 'num', ans, sl: {}, bug, hint, html: lsEq(`${p}% of ${T} = ${SLOT}`), say: `${p} percent of ${T} equals what?`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'pct', m: {T: 60, target: 30}, goal: 'moved', eq: 'value', ans: 30, raw: 1, sl: {}, demo: [40],
    html: lsCap('This bar is 60. Shade any percent of it.'), say: 'This bar is 60, cut into ten boxes. Shade any percent you like.'}), nudge: 'Shade some of the bar, then check.',
  react: v => { const n = Array.isArray(v) ? v[0] : +v; return {ctx: {n, k: 60, a: 60 * n / 100}, lines: [`${n} percent of 60 is ${60 * n / 100}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls6mPBar(c.k, c.n, {each: 1})}</div>` + lsEq(`${c.n}% of ${c.k} = ${c.a}`), sl: c});
  return D;
}
const LS6M_FR = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [9, 10], [1, 20], [3, 20], [7, 20], [1, 25], [2, 25], [1, 50], [3, 50]];
const LS6M_BRIEF_FP = `Explore: a hundred grid (one hundred squares); the child shades any number of squares with steppers.
Name it: the grid they shaded; lines on it (slots {n}: the squares shaded, the percent) and the idea: percent means out of a hundred, so rename a fraction with a bottom of a hundred and read the top.
Together (no slots: the fraction is on the screen and the app says it): line 1 before shading a fraction on the hundred grid, line 2 before a fraction bar (they type the percent), line 3 before a fraction in symbols only.
Remember: a warm-up: name a shaded fraction (no slots).
Show: two fractions to write as percents, no help, inside a small job in the world (no slots).`;
function ls6mRatio4(id, t, g, idea, home) {
  const D = ls6mL(id, t, g, {petSt: 1, bugs: ['pctTop', 'pctCat'], brief: LS6M_BRIEF_FP, idea, home, fb: '{n} squares out of a hundred is {n} percent.', test: 2,
    slots: {remember: [], explore: [], name: ['n'], together: [], check: ['ans'], show: []}});
  D.q = (st, r) => {
    const [n, d] = ls6mPk(r, LS6M_FR), p = n * 100 / d, cat = +`${n}${d}`, F = ls3Fr(n, d), Fs = ls3Frs(n, d);
    const bug = {pctTop: [n], pctCat: cat <= 100 ? [cat] : []}, hint = {k: 'text', s: `Out of a hundred: ${d} × ${100 / d} = 100, so ${n} × ${100 / d}.`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'pct', m: {grid: 1, target: p}, goal: 'value', eq: 'value', ans: p, sl: {}, bug, hint, ansSay: `${Fs} is ${p} percent`,
      html: lsEq(F) + lsCap('Shade the same amount of the hundred grid.'), say: `${Fs}. Shade the same amount of the hundred grid.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: p, sl: {}, bug, hint, html: `<div class="pkq">${VIZ.fracBar(n, d, {w: 280})}</div>` + lsEq(`${F} = ${SLOT}%`), say: `${Fs} is what percent?`});
    return lsDq(D, 2, {kind: 'num', ans: p, sl: {}, bug, hint, html: lsEq(`${F} = ${SLOT}%`), say: `${Fs} is what percent?`});
  };
  D.warm = ls3bFrWarm(D);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'pct', m: {grid: 1, target: 30}, goal: 'moved', eq: 'value', ans: 30, raw: 1, sl: {}, demo: [45],
    html: lsCap('Shade any number of squares.'), say: 'This grid has one hundred squares. Shade as many as you like.'}), nudge: 'Shade some squares, then check.',
  react: v => { const n = Array.isArray(v) ? v[0] : +v; return {ctx: {n}, lines: [`${n} out of 100 squares: ${n} percent.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls6mGrid(c.n)}</div>` + lsEq(`${ls3Fr(c.n, 100)} = ${c.n}%`), sl: c});
  return D;
}

/* ---- Sky City: Divide Fractions (how many groups of the divisor's parts fit in the shaded part) ---- */
const LS6M_BRIEF_FOP7 = `Explore: a bar cut into eighths with six eighths shaded; the child marks any number of groups of two eighths over it.
Name it: the groups they marked; lines on it (slots {n}: the groups, {a}: the eighths they cover) and the idea: dividing by a fraction counts how many of it fit; make the parts the same size first, then divide the tops.
Together (no slots: the problem is on the screen and the app says it): line 1 before marking groups on a bar, line 2 before a bar in the same size parts with one group marked (they type how many fit), line 3 before the division in symbols only.
Remember: a warm-up: name a shaded fraction (no slots).
Show: two divisions to type, no help, inside a small job in the world (no slots).`;
function ls6mFop7(id, t, g, idea, home) {
  const D = ls6mL(id, t, g, {petSt: 1, bugs: ['noRename', 'flipDiv'], brief: LS6M_BRIEF_FOP7, idea, home, fb: '{n} groups cover {a} eighths.', test: 2,
    slots: {remember: [], explore: [], name: ['n', 'a'], together: [], check: ['ans'], show: []}});
  // p/q ÷ b/(q·m): renamed, p·m parts ÷ b parts; the tops divided without renaming give p ÷ b
  const pick = r => { for (;;) { const q = lsRi(r, 2, 5), m = lsRi(r, 2, 3), R = q * m, p = lsRi(r, 1, q - 1), b = lsRi(r, 1, 3); const k = p * m / b;
    if (R <= 12 && b < R && Number.isInteger(k) && k >= 2 && k != p / b) return [p, q, b, R, m, k]; } };
  D.q = (st, r) => {
    if (st == 0) { const d = lsRi(r, 6, 10), b = lsRi(r, 1, 3), k = lsRi(r, 2, Math.floor(d / b)), a = k * b;
      return lsDq(D, 0, {kind: 'make', model: 'fit', m: {d, a, b, target: k}, goal: 'value', eq: 'value', ans: k, sl: {}, bug: {flipDiv: [`1/${k}`]}, hint: {k: 'text', s: `Each group is ${b} ${ccPl(d)}. Count the groups that fit.`},
        ansSay: `${k} groups`, html: lsEq(`${ls3Fr(a, d)} ÷ ${ls3Fr(b, d)}`) + lsCap(`How many groups of ${ls3Fr(b, d)} fit in ${ls3Fr(a, d)}?`),
        say: `${ls3Frs(a, d)} divided by ${ls3Frs(b, d)}. How many groups of ${ls3Frs(b, d)} fit?`}); }
    const [p, q, b, R, m, k] = pick(r), e = `${ls3Fr(p, q)} ÷ ${ls3Fr(b, R)}`, se = `${ls3Frs(p, q)} divided by ${ls3Frs(b, R)}`;
    const bug = {noRename: [p / b].filter(Number.isInteger), flipDiv: [`1/${k}`]}, hint = {k: 'text', s: `${ls3Fr(p, q)} is ${ls3Fr(p * m, R)}. How many groups of ${b} ${ccPl(R)} fit in ${p * m}?`};
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: k, sl: {}, bug, hint, max: 2, html: `<div class="pkq">${ls6mFit(R, p * m, b, 0, {one: ls3Fr(b, R)})}</div>` + lsEq(`${e} = ${SLOT}`), say: `${se} equals what?`});
    return lsDq(D, 2, {kind: 'num', ans: k, sl: {}, bug, hint, max: 2, html: lsEq(`${e} = ${SLOT}`), say: `${se} equals what?`});
  };
  D.warm = ls3bFrWarm(D);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'fit', m: {d: 8, a: 6, b: 2, target: 2}, goal: 'moved', eq: 'value', ans: 2, raw: 1, sl: {}, demo: [3],
    html: lsEq(`${ls3Fr(6, 8)} ÷ ${ls3Fr(2, 8)}`) + lsCap('Mark groups of two eighths, as many as you like.'), say: 'Mark groups of two eighths over the bar, as many as you like.'}), nudge: 'Mark a group, then check.',
  react: v => { const n = Array.isArray(v) ? v[0] : +v; return {ctx: {n, a: 2 * n}, lines: [`${qN(n, 'group', 'groups')} of two eighths ${qW(n, 'covers', 'cover')} ${2 * n} eighths.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls6mFit(8, 6, 2, Math.min(c.n, 4))}</div>` + lsEq(`${ls3Fr(6, 8)} ÷ ${ls3Fr(2, 8)} = 6 ÷ 2 = 3`), sl: c});
  return D;
}

/* ---- Galaxy Core: Exponents (a base used again and again: the square, the cube) ---- */
const LS6M_BRIEF_POW = `Explore: a base and how many times it is used, with steppers; the app writes the multiplication, its value, and draws the square or the cube.
Name it: what they built; lines on it (slots {a}: the base, {n}: how many times it is used, {sum}: the value) and the idea: the exponent says how many times to use the base as a factor, so four cubed is four times four times four, not four times three.
Together (no slots: the numbers are on the screen and the app says them): line 1 before building a power with the steppers, line 2 before a square or a cube drawn (they type its value), line 3 before an expression with a power, done in order.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two problems with powers to type, no help, inside a small job in the world (no slots).`;
function ls6mOoo2(id, t, g, idea, home) {
  const D = ls6mL(id, t, g, {petSt: 1, bugs: ['powMul', 'order'], brief: LS6M_BRIEF_POW, idea, home, fb: '{a} used {n} times makes {sum}.', test: 2,
    slots: {remember: ['a', 'b'], explore: [], name: ['a', 'n', 'sum'], together: [], check: ['ans'], show: []}});
  const sayP = (b, e) => (e == 2 ? `${b} squared` : e == 3 ? `${b} cubed` : `${b} to the power ${e}`), hint = {k: 'text', s: 'The small number says how many times the base is a factor.'};
  const pick = r => { for (;;) { const e = lsRi(r, 2, 3), b = lsRi(r, 2, e == 3 ? 5 : 10); if (!(b == 2 && e == 2)) return [b, e]; } };
  D.q = (st, r) => {
    const [b, e] = pick(r), v = Math.pow(b, e), P = `${b}<sup>${e}</sup>`;
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'pow', m: {b, e}, goal: 'pow', eq: 'value', ans: v, sl: {}, bug: {powMul: [b * e]}, hint, ansSay: `${sayP(b, e)} is ${v}`,
      html: lsEq(P) + lsCap('Set the base and how many times it is used.'), say: `${sayP(b, e)}. Set the base, and how many times it is used.`});
    if (st == 1) { const pic = e == 2 ? VIZ.areaGrid(b, b) : VIZ.solid([{l: b, h: b}], {w: b, grid: 1});
      return lsDq(D, 1, {kind: 'num', ans: v, sl: {}, bug: {powMul: [b * e]}, hint, html: `<div class="pkq">${pic}</div>` + lsEq(`${P} = ${SLOT}`), say: `${sayP(b, e)} equals what?`}); }
    // an expression with a power: a × b² + c, or (a + c)² − b
    const a = lsRi(r, 2, 5), c = lsRi(r, 1, 9), s = lsRi(r, 2, 6), f = r() < .5;
    if (f) return lsDq(D, 2, {kind: 'num', ans: a * s * s + c, sl: {}, bug: {order: [(a * s) * (a * s) + c], powMul: [a * s * 2 + c]}, hint: {k: 'text', s: 'The power first, then times, then plus.'},
      html: lsEq(`${a} × ${s}<sup>2</sup> + ${c} = ${SLOT}`), say: `${a} times ${s} squared plus ${c} equals what?`});
    const k = lsRi(r, 2, 4), x = Math.min(k + lsRi(r, 1, 9), 12), y = x - k;
    return lsDq(D, 2, {kind: 'num', ans: x * x - s, sl: {}, bug: {order: [k + y * y - s].filter(z => z >= 0), powMul: [x * 2 - s].filter(z => z >= 0)}, hint: {k: 'text', s: 'Brackets first, then the power, then take away.'},
      html: lsEq(`(${k} + ${x - k})<sup>2</sup> − ${s} = ${SLOT}`), say: `${k} plus ${x - k}, in brackets, squared, minus ${s} equals what?`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'pow', m: {b: 3, e: 2}, goal: 'moved', eq: 'value', ans: 9, raw: 1, sl: {}, demo: [3, 3],
    html: lsCap('Pick a base and how many times to use it.'), say: 'Pick a base, and how many times to use it as a factor.'}), nudge: 'Change a number, then check.',
  react: v => { const [a, n] = Array.isArray(v) ? v : [3, 3], s = Math.pow(a, n); return {ctx: {a, n, sum: s}, lines: [n == 1 ? `${a} used once is ${a}.` : `${a} used ${n} times: ${Array(n).fill(a).join(' times ')} makes ${s}.`]}; }});
  D.name = c => ({html: ls6mPowDraw(c.a, c.n), sl: c});
  return D;
}

/* ---- Galaxy Core: equations as bar models: One-Step Equations, Solve with × and ÷, Two-Step Equations ---- */
const LS6M_BRIEF_EQ1 = `Explore: an equation x + 8 = 20 as two bars (20 on top, x and 8 below); the child sets x with steppers and sees the bars.
Name it: their x; lines on it (slots {x}: their x, {sum}: x and 8 together) and the idea: an equation is two equal amounts; undo what is done to x by doing the opposite to both sides.
Together (no slots: the equation is on the screen and the app says it): line 1 before setting x so both bars are the same length, line 2 before a bar model with x as a "?" (they type x), line 3 before the equation in symbols only.
Remember: a warm-up: a take-away fact (slots {a} {b}).
Show: two equations to solve, no help, inside a small job in the world (no slots).`;
function ls6mAlg1(id, t, g, idea, home) {
  const D = ls6mL(id, t, g, {petSt: 1, bugs: ['undo', 'slip'], brief: LS6M_BRIEF_EQ1, idea, home, fb: 'With x as {x}, the bottom bar is {sum}.', test: 2,
    slots: {remember: ['a', 'b'], explore: [], name: ['x', 'sum'], together: [], check: ['ans'], show: []}});
  // [x, a, the sign, b]: x + a = b, or x − a = b (x = a + b)
  const pick = r => { const a = lsRi(r, 2, 40); if (r() < .4) { const b = lsRi(r, 2, 50); return [a + b, a, '−', b]; } const x = lsRi(r, 3, 50); return [x, a, '+', x + a]; };
  D.q = (st, r) => {
    const [x, a, o, b] = pick(r);
    const e = `x ${o} ${a} = ${b}`, se = `x ${o == '+' ? 'plus' : 'minus'} ${a} equals ${b}`, bug = {undo: [o == '+' ? b + a : b - a].filter(y => y >= 0 && y != x), slip: [x + 1, x - 1]};
    const hint = {k: 'text', s: o == '+' ? `Undo the plus: ${b} − ${a}.` : `Undo the minus: ${b} + ${a}.`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'eqbar', m: o == '+' ? {g: 1, c: a, tot: b, target: x, hi: 99} : {parts: [b, a], target: x, hi: 99}, goal: 'value', eq: 'value', ans: x, sl: {}, bug, hint,
      ansSay: `x is ${x}`, html: lsEq(e) + lsCap('Set x so both bars are the same length.'), say: `${se}. Set x so both bars are the same length.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: x, sl: {}, bug, hint, html: `<div class="pkq">${o == '+' ? ls6mEqBars([b, b], [[x, 'x', 'v1'], [a, a, 'v2']]) : ls6mEqBars([x, 'x', 'v1'], [[b, b, 'vo'], [a, a, 'v2']])}</div>`
      + lsEq(`${e}<br>x = ${SLOT}`), say: `${se}. What is x?`});
    return lsDq(D, 2, {kind: 'num', ans: x, sl: {}, bug, hint, html: lsEq(`${e}<br>x = ${SLOT}`), say: `${se}. What is x?`});
  };
  D.warm = ls6mWarmSub(D);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'eqbar', m: {g: 1, c: 8, tot: 20, target: 12, hi: 30}, goal: 'moved', eq: 'value', ans: 12, raw: 1, sl: {}, demo: [12],
    html: lsEq('x + 8 = 20') + lsCap('Set x to any number. Watch the bars.'), say: 'x plus 8 equals 20. Set x to any number, and watch the two bars.'}), nudge: 'Change x, then check.',
  react: v => { const x = Array.isArray(v) ? v[0] : +v; return {ctx: {x, sum: x + 8}, lines: [x + 8 == 20 ? `${x} and 8 make 20. The bars match.` : `${x} and 8 make ${x + 8}, not 20.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls6mEqDraw({g: 1, c: 8, tot: 20}, c.x, true)}</div>` + lsEq('x + 8 = 20<br>x = 20 − 8 = 12'), sl: c});
  D.fix = {fn: k2FixAlg, nums: r => { const [, a, o, b] = pick(r); return [a, b, o == '+' ? 0 : 1]; },
    label: ([a, b, s]) => (s ? `alg1 x − ${a} = ${b}` : `alg1 x + ${a} = ${b}`), sl: () => ({}), code: {same: 'undo'}};
  D.mine = ls3Mine([8, 20, 0], [1, 2, 0], [40, 90, 1], [[1, 10], [1, 10], [1]], ['Number', 'Total', 'Plus or minus'], s => `x ${s[2] ? '−' : '+'} ${s[0]} = ${s[1]}`, s => s[2] || s[1] > s[0]);
  return D;
}
const LS6M_BRIEF_EQ2 = `Explore: a bar model of equal boxes; the child picks how many boxes and what is in each (x) with steppers; the app says the total.
Name it: the bar they built; lines on it (slots {a}: the boxes, {x}: what is in each, {sum}: the total) and the idea: in 6x = 54 the boxes share the total, so divide; in x ÷ 6 = 9, x is the whole bar, so multiply.
Together (no slots: the equation is on the screen and the app says it): line 1 before building the bar of an equation, line 2 before a bar model with x as a "?" (they type x), line 3 before the equation in symbols only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two equations to solve, no help, inside a small job in the world (no slots).`;
function ls6mAlg2(id, t, g, idea, home) {
  const D = ls6mL(id, t, g, {petSt: 1, bugs: ['undo', 'slip'], brief: LS6M_BRIEF_EQ2, idea, home, fb: '{a} boxes of {x} make {sum}.', test: 2,
    slots: {remember: ['a', 'b'], explore: [], name: ['a', 'x', 'sum'], together: [], check: ['ans'], show: []}});
  // [a, n, dv]: a·x = a·n (x = n), or x ÷ a = n (x = a·n, at most 99)
  const pick = r => { for (;;) { const a = lsRi(r, 2, 9), n = lsRi(r, 2, 12), dv = r() < .4; if (!dv || a * n <= 99) return [a, n, dv ? 1 : 0]; } };
  D.q = (st, r) => {
    const [a, n, dv] = pick(r);
    // dv: x ÷ a = n (x = a·n, the whole bar); else a·x = a·n (x = n, each box)
    const x = dv ? a * n : n, rhs = dv ? n : a * n, e = dv ? `x ÷ ${a} = ${rhs}` : `${a}x = ${rhs}`, se = dv ? `x divided by ${a} equals ${rhs}` : `${a} x equals ${rhs}`;
    const bug = {undo: [dv ? (rhs % a ? null : rhs / a) : rhs * a].filter(y => y != null && y != x && y > 0), slip: [x + 1, x - 1]}, hint = {k: 'text', s: dv ? `x is ${a} boxes of ${rhs}: ${a} × ${rhs}.` : `${a} equal boxes make ${rhs}: ${rhs} ÷ ${a}.`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'tape', m: {g: a, n}, goal: 'groups', eq: 'value', ans: a * n, ansSay: `${a} boxes of ${n}, so x is ${x}`, sl: {}, bug: {}, hint,
      html: lsEq(e) + lsCap(dv ? `x is cut into ${a} equal boxes of ${rhs}. Build it.` : `${a} boxes of x make ${rhs}. Build it.`), say: `${se}. Build the bar.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: x, sl: {}, bug, hint, html: `<div class="pkq">${dv ? ls3bTape(a, rhs, {tot: 'x'}) : ls3bTape(a, n, {tot: rhs, q: 1})}</div>` + lsEq(`${e}<br>x = ${SLOT}`), say: `${se}. What is x?`});
    return lsDq(D, 2, {kind: 'num', ans: x, sl: {}, bug, hint, html: lsEq(`${e}<br>x = ${SLOT}`), say: `${se}. What is x?`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'tape', m: {g: 3, n: 4}, goal: 'moved', eq: 'value', ans: 12, raw: 1, sl: {}, demo: [4, 6],
    html: lsCap('Build any bar of equal boxes.'), say: 'Build any bar you like: pick the boxes, and what goes in each.'}), nudge: 'Change the boxes or what is in each, then check.',
  react: v => { const [a, x] = Array.isArray(v) ? v : [4, 6]; return {ctx: {a, x, sum: a * x}, lines: [`${qN(a, 'box', 'boxes')} of ${x} ${qW(a, 'makes', 'make')} ${a * x}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls3bTape(c.a, c.x, {tot: c.sum})}</div>` + lsEq(`${c.a}x = ${c.sum}<br>x = ${c.sum} ÷ ${c.a} = ${c.x}`), sl: c});
  D.fix = {fn: k2FixAlg, nums: r => { const [a, n, dv] = pick(r); return [a, dv ? n : a * n, dv]; }, label: ([a, b, dv]) => (dv ? `alg2 x ÷ ${a} = ${b}` : `alg2 ${a}x = ${b}`), sl: () => ({}), code: {same: 'undo'}};
  D.mine = ls3Mine([6, 54, 0], [2, 2, 0], [9, 99, 1], [[1], [1, 10], [1]], ['Number', 'Total', 'Times or divide'], s => (s[2] ? `x ÷ ${s[0]} = ${s[1]}` : `${s[0]}x = ${s[1]}`),
    s => (s[2] ? s[0] * s[1] <= 999 : s[1] % s[0] == 0));
  return D;
}
const LS6M_BRIEF_EQ3 = `Explore: an equation 2x + 4 = 20 as two bars (20 on top; two boxes of x and a 4 below); the child sets x with steppers and sees the bars.
Name it: their x; lines on it (slots {x}: their x, {sum}: the bottom bar's total) and the idea: undo the steps in reverse order: first take away the number added, then divide by the number of boxes.
Together (no slots: the equation is on the screen and the app says it): line 1 before setting x so both bars are the same length, line 2 before a bar model with x as a "?" (they type x), line 3 before the equation in symbols only.
Remember: a warm-up: a one-step equation (no slots).
Show: two equations to solve, no help, inside a small job in the world (no slots).`;
function ls6mAlg3(id, t, g, idea, home) {
  const D = ls6mL(id, t, g, {petSt: 1, bugs: ['stop1', 'undo', 'slip'], brief: LS6M_BRIEF_EQ3, idea, home, fb: 'With x as {x}, the bottom bar is {sum}.', test: 2,
    slots: {remember: [], explore: [], name: ['x', 'sum'], together: [], check: ['ans'], show: []}});
  const pick = r => { for (;;) { const a = lsRi(r, 2, 5), x = lsRi(r, 2, 12), c = lsRi(r, 1, 20), sub = r() < .3, t = sub ? a * x - c : a * x + c; if (t >= 2 && t <= 99) return [a, x, c, sub, t]; } };
  const bugOf = (a, x, c, sub, t) => ({stop1: [sub ? t + c : t - c], undo: [(sub ? t - c : t + c) / a].filter(y => Number.isInteger(y) && y > 0 && y != x), slip: [x + 1, x - 1]});
  D.q = (st, r) => {
    const [a, x, c, sub, t] = pick(r), e = `${a}x ${sub ? '−' : '+'} ${c} = ${t}`, se = `${a} x ${sub ? 'minus' : 'plus'} ${c} equals ${t}`, bug = bugOf(a, x, c, sub, t);
    const hint = {k: 'text', s: `Step 1: ${sub ? `add ${c}` : `take away ${c}`}: ${a}x = ${sub ? t + c : t - c}. Step 2: divide by ${a}.`};
    // the bars: a boxes of x (and the c added) against t; with a minus, a boxes of x against t and the c taken away
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'eqbar', m: sub ? {g: a, c: 0, tot: t + c, lab: `${t} + ${c}`, target: x, hi: 40} : {g: a, c, tot: t, target: x, hi: 40}, goal: 'value', eq: 'value', ans: x, sl: {}, bug, hint,
      ansSay: `x is ${x}`, html: lsEq(e) + lsCap('Set x so both bars are the same length.'), say: `${se}. Set x so both bars are the same length.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: x, sl: {}, bug, hint, html: `<div class="pkq">${ls6mEqBars([sub ? t + c : t, sub ? `${t} + ${c}` : t], Array.from({length: a}, () => [x, 'x', 'v1']).concat(sub ? [] : [[c, c, 'v2']]))}</div>`
      + lsEq(`${e}<br>x = ${SLOT}`), say: `${se}. What is x?`});
    return lsDq(D, 2, {kind: 'num', ans: x, sl: {}, bug, hint, html: lsEq(`${e}<br>x = ${SLOT}`), say: `${se}. What is x?`});
  };
  D.warm = r => { const a = lsRi(r, 2, 9), x = lsRi(r, 2, 9); return lsDq(D, 0, {kind: 'num', ans: x, html: lsEq(`${a}x = ${a * x}<br>x = ${SLOT}`), say: `${a} x equals ${a * x}. What is x?`, sl: {},
    hint: {k: 'text', s: `Divide ${a * x} by ${a}.`}, bug: {undo: [a * a * x]}}); };
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'eqbar', m: {g: 2, c: 4, tot: 20, target: 8, hi: 20}, goal: 'moved', eq: 'value', ans: 8, raw: 1, sl: {}, demo: [8],
    html: lsEq('2x + 4 = 20') + lsCap('Set x to any number. Watch the bars.'), say: '2 x plus 4 equals 20. Set x to any number, and watch the two bars.'}), nudge: 'Change x, then check.',
  react: v => { const x = Array.isArray(v) ? v[0] : +v; return {ctx: {x, sum: 2 * x + 4}, lines: [2 * x + 4 == 20 ? `Two boxes of ${x} and 4 make 20. The bars match.` : `Two boxes of ${x} and 4 make ${2 * x + 4}, not 20.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls6mEqDraw({g: 2, c: 4, tot: 20}, c.x, true)}</div>` + lsEq('2x + 4 = 20<br>2x = 16<br>x = 8'), sl: c});
  D.fix = {fn: k2FixAlg, nums: r => { const [a, , c, sub, t] = pick(r); return [a, c, sub ? 1 : 0, t]; }, label: ([a, c, s, t]) => `alg3 ${a}x ${s ? '−' : '+'} ${c} = ${t}`, sl: () => ({}), code: {same: 'undo'}};
  D.mine = ls3Mine([3, 4, 0, 19], [2, 1, 0, 2], [5, 20, 1, 99], [[1], [1], [1], [1, 10]], ['Boxes', 'Number', 'Plus or minus', 'Total'], s => `${s[0]}x ${s[2] ? '−' : '+'} ${s[1]} = ${s[3]}`,
    s => { const y = (s[2] ? s[3] + s[1] : s[3] - s[1]) / s[0]; return Number.isInteger(y) && y > 0; });
  return D;
}

/* ---- Galaxy Core: Evaluate Expressions (3x + 4 when x = 5: boxes of x and a known part) ---- */
const LS6M_BRIEF_EV = `Explore: a bar of equal boxes and one more box of 4; the child picks how many boxes and what is in each (x) with steppers; the app says the total.
Name it: the bar they built; lines on it (slots {a}: the boxes, {x}: what is in each, {sum}: the total with the 4) and the idea: put the number in for x, and a number next to x means times: 3x is 3 times x.
Together (no slots: the expression and the value of x are on the screen and the app says them): line 1 before building an expression's bar for a value of x, line 2 before a bar with x filled in (they type the value), line 3 before an expression in symbols only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two expressions to work out, no help, inside a small job in the world (no slots).`;
function ls6mOoo3(id, t, g, idea, home) {
  const D = ls6mL(id, t, g, {petSt: 1, bugs: ['catVar', 'order', 'slip'], brief: LS6M_BRIEF_EV, idea, home, fb: '{a} boxes of {x} and 4 more make {sum}.', test: 2,
    slots: {remember: ['a', 'b'], explore: [], name: ['a', 'x', 'sum'], together: [], check: ['ans'], show: []}});
  const pick = r => [lsRi(r, 2, 6), lsRi(r, 2, 9), lsRi(r, 1, 12)];
  D.q = (st, r) => {
    const [a, x, c] = pick(r), ans = a * x + c, e = `${a}x + ${c}`, bug = {catVar: [+`${a}${x}` + c], order: [a * (x + c)], slip: [ans + 1, ans - 1]};
    const hint = {k: 'text', s: `${a}x means ${a} × ${x}. Then add ${c}.`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'tape', m: {g: a, n: x, ex: [c, '+']}, goal: 'groups', eq: 'value', ans: a * x, ansSay: `${a} boxes of ${x} and ${c} more`, sl: {}, bug: {}, hint,
      html: lsEq(e) + lsCap(`x = ${x}. Build ${a} boxes of x. The ${c} is there.`), say: `${a} x plus ${c}, when x is ${x}. Build ${a} boxes of x.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans, sl: {}, bug, hint, html: `<div class="pkq">${ls3bTape(a, x, {ex: [c, '+'], tot: '?'})}</div>` + lsEq(`${e} = ${SLOT}`) + lsCap(`when x = ${x}`), say: `${a} x plus ${c}, when x is ${x}. What is it?`});
    if (r() < .3) { const y = lsRi(r, 2, 9), A = a * x + y; return lsDq(D, 2, {kind: 'num', ans: A, sl: {}, bug: {catVar: [+`${a}${x}` + y], order: [a * (x + y)], slip: [A + 1, A - 1]}, hint: {k: 'text', s: `${a} × ${x}, then add ${y}.`},
      html: lsEq(`${a}x + y = ${SLOT}`) + lsCap(`when x = ${x} and y = ${y}`), say: `${a} x plus y, when x is ${x} and y is ${y}. What is it?`}); }
    return lsDq(D, 2, {kind: 'num', ans, sl: {}, bug, hint, html: lsEq(`${e} = ${SLOT}`) + lsCap(`when x = ${x}`), say: `${a} x plus ${c}, when x is ${x}. What is it?`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'tape', m: {g: 3, n: 4, ex: [4, '+']}, goal: 'moved', eq: 'value', ans: 12, raw: 1, sl: {}, demo: [3, 5],
    html: lsCap('Build any boxes of x. One more box of 4 is there.'), say: 'Build any equal boxes of x. One more box of 4 is there too.'}), nudge: 'Change the boxes or x, then check.',
  react: v => { const [a, x] = Array.isArray(v) ? v : [3, 5]; return {ctx: {a, x, sum: a * x + 4}, lines: [`${qN(a, 'box', 'boxes')} of ${x} and 4 more make ${a * x + 4}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls3bTape(c.a, c.x, {ex: [4, '+'], tot: c.sum})}</div>` + lsEq(`${c.a}x + 4 = ${c.a} × ${c.x} + 4 = ${c.sum}`), sl: c});
  D.fix = {fn: k2FixOoo, nums: r => pick(r), label: ([a, x, c]) => `${a} × ${x} + ${c} = ?`, sl: () => ({}), code: {order: 'order'}};
  D.mine = ls3Mine([3, 5, 4], [2, 1, 1], [9, 12, 20], [[1], [1], [1]], ['Times x', 'x', 'Plus'], s => `${s[0]}x + ${s[2]}, x = ${s[1]}`, () => true);
  return D;
}

/* ---- Galaxy Core: Triangles & Trapezoids (a shape in its rectangle on a grid: half the rectangle) ---- */
const LS6M_SHN = {tri: 'triangle', par: 'parallelogram', trap: 'trapezoid'};
const LS6M_BRIEF_GEO = `Explore: a triangle in its dashed rectangle on a grid; the child sets the base and the height with steppers; the app says the area.
Name it: the triangle they made; lines on it (slots {a}: the base, {b}: the height, {sum}: the triangle's area, {n}: the rectangle's area) and the idea: a triangle is half of its rectangle, base times height then half; a parallelogram is base times height; a trapezoid is the two bases added, times the height, then half.
Together (no slots: the shape and its numbers are on the screen and the app says them): line 1 before building a shape with a given base and height, line 2 before a drawn shape with its base and height (they type the area), line 3 before a shape told in words only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two areas to type, no help, inside a small job in the world (no slots).`;
function ls6mGeo5(id, t, g, idea, home) {
  const D = ls6mL(id, t, g, {petSt: 1, bugs: ['noHalf', 'slant'], brief: LS6M_BRIEF_GEO, idea, home, fb: 'Base {a}, height {b}: the triangle is {sum}, half of {n}.', test: 2,
    slots: {remember: ['a', 'b'], explore: [], name: ['a', 'b', 'sum', 'n'], together: [], check: ['ans'], show: []}});
  // the shape: tri (b·h even), par, trap (top tp, (b + tp)·h even); a 3-4-5 slant side on some triangles and parallelograms
  const pick = r => { for (;;) {
    const sh = ls6mPk(r, ['tri', 'tri', 'par', 'trap']), b = lsRi(r, 3, 9), h = lsRi(r, 2, 6), tp = sh == 'trap' ? lsRi(r, 1, b - 2) : 0;
    if ((sh == 'tri' ? b * h : sh == 'trap' ? (b + tp) * h : 2) % 2) continue;
    // a slanted side of 5 (3 across, 4 up) on some triangles and parallelograms, so the slanted side has a whole length to mix up with the height
    const s345 = sh != 'trap' && h == 4 && r() < .6;
    return {sh, b, h, tp, off: sh == 'trap' ? Math.min(1, b - tp) : s345 ? 3 : Math.max(1, Math.round(b / 3)), side: s345 ? 5 : 0}; } };
  D.q = (st, r) => {
    const s = pick(r), A = ls6mArea(s.sh, s.b, s.h, s.tp), nm = LS6M_SHN[s.sh], bug = {noHalf: s.sh == 'par' ? [] : [s.sh == 'trap' ? (s.b + s.tp) * s.h : s.b * s.h], slant: s.side ? [s.sh == 'tri' ? s.b * s.side / 2 : s.b * s.side].filter(Number.isInteger) : []};
    const hint = {k: 'text', s: s.sh == 'tri' ? `Base × height, then half: ${s.b} × ${s.h} ÷ 2.` : s.sh == 'par' ? `Base × height: ${s.b} × ${s.h}.` : `Add the two bases, times the height, then half: (${s.b} + ${s.tp}) × ${s.h} ÷ 2.`};
    const words = s.sh == 'trap' ? `A trapezoid has bases ${s.b} and ${s.tp} and height ${s.h}.` : `A ${nm} has base ${s.b} and height ${s.h}.`;
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'tri', m: {sh: s.sh, b: s.b, h: s.h, tp: s.tp, off: s.off}, goal: 'bh', eq: 'value', ans: A, sl: {}, bug: {noHalf: bug.noHalf}, hint, ansSay: `base ${s.b}, height ${s.h}: area ${A}`,
      html: lsCap(`Make a ${nm} with base ${s.b} and height ${s.h}.`) + (s.sh == 'trap' ? lsCap(`Its top is ${s.tp}.`) : ''), say: `Make a ${nm} with base ${s.b} and height ${s.h}.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: A, sl: {}, bug, hint, html: `<div class="pkq">${ls6mShape(s.sh, s.b, s.h, {tp: s.tp, off: s.off, side: s.side, rect: false})}</div>` + lsCap(`What is the area of the ${nm}?`) + lsEq(SLOT),
      say: `What is the area of the ${nm}? The base is ${s.b} and the height is ${s.h}.`});
    return lsDq(D, 2, {kind: 'num', ans: A, sl: {}, bug: {noHalf: bug.noHalf}, hint, html: ls6mSt(words) + lsCap('What is its area?') + lsEq(SLOT), say: `${words} What is its area?`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'tri', m: {sh: 'tri', b: 6, h: 4, off: 2}, goal: 'moved', eq: 'value', ans: 12, raw: 1, sl: {}, demo: [6, 4],
    html: lsCap('Make any triangle: set the base and the height.'), say: 'Make any triangle you like: set the base and the height.'}), nudge: 'Change the base or the height, then check.',
  react: v => { const [a, b] = Array.isArray(v) ? v : [6, 4]; return {ctx: {a, b, sum: a * b / 2, n: a * b}, lines: [`Base ${a}, height ${b}: the rectangle is ${a * b}, the triangle half of it, ${a * b / 2}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls6mShape('tri', c.a, c.b, {off: Math.max(1, Math.round(c.a / 3))})}</div>` + lsEq(`${c.a} × ${c.b} ÷ 2 = ${c.sum}`), sl: c});
  return D;
}

/* ---- Galaxy Core: Four Quadrants (across, then up, from zero; left and down are negative) ---- */
const LS6M_BRIEF_XY4 = `Explore: a point on a grid with all four quadrants (negative ten is not used: five each way); the child moves it anywhere with across and up steppers.
Name it: the point they placed; lines on it (slots {x}: across, {y}: up) and the idea: across first, then up; left of zero and below zero are negative, and the signs tell the quadrant.
Together (no slots: the point is on the screen and the app says it): line 1 before placing a point with negative numbers, line 2 before reading one number of a point (they type it), line 3 before a quadrant or a reflection told in words only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two points to read, no help, inside a small job in the world (no slots).`;
const ls6mQd = (x, y) => (x > 0 ? (y > 0 ? 1 : 4) : y > 0 ? 2 : 3);
function ls6mCoord2(id, t, g, idea, home) {
  const D = ls6mL(id, t, g, {petSt: 1, bugs: ['signFlip', 'swapXY'], brief: LS6M_BRIEF_XY4, idea, home, fb: 'Your point is {x} across and {y} up.', test: 1,
    slots: {remember: ['a', 'b'], explore: [], name: ['x', 'y'], together: [], check: ['ans'], show: []}});
  const vs = v => { const [x, y] = String(v).split(',').map(Number); return `${ls6mSay(x)}, ${ls6mSay(y)}`; }, hint = {k: 'text', s: 'Across first, then up. Left of zero and below zero are negative.'};
  D.q = (st, r) => {
    let x, y; do { x = lsRi(r, -5, 5); y = lsRi(r, -5, 5); } while (!x || !y || x > 0 && y > 0 || Math.abs(x) == Math.abs(y));
    if (st == 0) { const ans = `${x},${y}`; return lsDq(D, 0, {kind: 'make', model: 'xy4', m: {max: 5, target: ans}, goal: 'xy4', eq: 'value', ans, sl: {}, hint, vsay: vs, ansSay: vs(ans),
      bug: {signFlip: [`${-x},${y}`, `${x},${-y}`, `${Math.abs(x)},${Math.abs(y)}`].filter(v => v != ans), swapXY: [`${y},${x}`]},
      html: lsEq(`(${ls6mN(x)}, ${ls6mN(y)})`) + lsCap('Put point A there.'), say: `Put point A at ${vs(ans)}. Across first, then up.`}); }
    if (st == 1) { const wx = r() < .5, ans = wx ? x : y;
      return ls6mQ(D, 1, ans, `<div class="pkq">${ls6mXYq(x, y)}</div>` + lsCap(wx ? 'Point A: how far across? (x)' : 'Point A: how far up? (y)') + lsEq(SLOT),
        wx ? 'How far across is point A? That is its x.' : 'How far up is point A? That is its y.', {sl: {}, bug: {signFlip: [-ans], swapXY: [wx ? y : x].filter(v => v != ans)}, hint}); }
    if (r() < .5) { const q = ls6mQd(x, y);
      return lsDq(D, 2, {kind: 'num', ans: q, sl: {}, bug: {signFlip: [1].filter(v => v != q), swapXY: [ls6mQd(y, x)].filter(v => v != q)}, hint: {k: 'text', s: 'Quadrant 1 is top right, then count around: 2 top left, 3 bottom left, 4 bottom right.'},
        html: lsCap(`Which quadrant is (${ls6mN(x)}, ${ls6mN(y)}) in? Type 1, 2, 3 or 4.`) + lsEq(SLOT), say: `Which quadrant is the point ${vs(`${x},${y}`)} in? Type 1, 2, 3 or 4.`}); }
    const ax = r() < .5, ans = ax ? -y : y;
    return ls6mQ(D, 2, ans, lsCap(`Point (${ls6mN(x)}, ${ls6mN(y)}) is reflected across the ${ax ? 'x' : 'y'}-axis. What is its new y?`) + lsEq(SLOT),
      `The point ${vs(`${x},${y}`)} is reflected across the ${ax ? 'x' : 'y'} axis. What is its new y?`, {sl: {}, bug: {signFlip: [-ans], swapXY: [ax ? -x : x].filter(v => v != ans)},
        hint: {k: 'text', s: ax ? 'Across the x-axis: up becomes down, so y changes sign.' : 'Across the y-axis: left becomes right; y stays.'}});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'xy4', m: {max: 5, target: '-3,2'}, goal: 'moved', eq: 'value', ans: '-3,2', raw: 1, sl: {}, demo: [-3, 2], vsay: vs,
    html: lsCap('Put point A anywhere on the grid.'), say: 'Move point A anywhere you like on the grid.'}), nudge: 'Move the point, then check.',
  react: v => { const [x, y] = Array.isArray(v) ? v : String(v).split(',').map(Number); return {ctx: {x, y}, lines: [`Your point is ${ls6mSay(x)} across and ${ls6mSay(y)} up.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls6mXY(c.x, c.y)}</div>` + lsEq(`(${ls6mN(c.x)}, ${ls6mN(c.y)})`), sl: c});
  return D;
}

/* ---- Galaxy Core: GCF and LCM (the biggest equal groups of both; the first place two hops meet) ---- */
const LS6M_GCF = [[12, 18], [18, 24], [16, 24], [20, 30], [15, 25], [24, 36], [12, 30], [21, 28], [27, 36], [20, 32], [18, 30], [14, 21], [30, 45]];
const LS6M_LCM = [[4, 6], [6, 8], [6, 9], [4, 10], [8, 12], [6, 10], [9, 12], [10, 15], [4, 14], [6, 15], [5, 4], [3, 7]];
const LS6M_BRIEF_FACT = `Explore: two numbers, 12 and 18, as bars; the child sets a group size with a stepper and sees whether both split into equal groups with nothing left over.
Name it: the group size they tried; lines on it (slots {k}: the group size, {a} {b}: the two numbers) and the idea: the greatest common factor is the biggest group size that splits both numbers evenly; the least common multiple is the first number both count by to.
Together (no slots: the two numbers are on the screen and the app says them): line 1 before finding the biggest group size or the first place two hops meet, line 2 before lists of factors or multiples (they type the answer), line 3 before a greatest common factor or a least common multiple in symbols only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two to type, no help, inside a small job in the world (no slots).`;
function ls6mFact3(id, t, g, idea, home) {
  const D = ls6mL(id, t, g, {petSt: 1, bugs: ['gcfLcm', 'mulAll'], brief: LS6M_BRIEF_FACT, idea, home, fb: 'Groups of {k}: {a} and {b} both split evenly.', test: 2,
    slots: {remember: ['a', 'b'], explore: [], name: ['k', 'a', 'b'], together: [], check: ['ans'], show: []}});
  const fl = n => Array.from({length: n}, (_, i) => i + 1).filter(k => n % k == 0), ml = (n, k) => Array.from({length: k}, (_, i) => n * (i + 1));
  D.q = (st, r) => {
    const lcm = r() < .5;
    if (lcm) {
      const [a, b] = ls6mPk(r, LS6M_LCM), L = ls6mLcm(a, b), G = ls6mGcd(a, b), bug = {gcfLcm: [G].filter(v => v != L), mulAll: [a * b].filter(v => v != L)}, hint = {k: 'text', s: `Count by ${a}s and by ${b}s. The first number in both is the LCM.`};
      if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'mults', m: {a, b, target: L}, goal: 'value', eq: 'value', ans: L, sl: {}, bug, hint, ansSay: `they meet first at ${L}`,
        html: lsEq(`LCM(${a}, ${b})`) + lsCap(`Hop by ${a}s and by ${b}s until both land on the same number first.`), say: `The least common multiple of ${a} and ${b}. Hop by ${a}s and by ${b}s until they meet.`});
      if (st == 1) return lsDq(D, 1, {kind: 'num', ans: L, sl: {}, bug, hint, html: `<div class="ls6m-lists"><div>${a}: ${ml(a, L / a + 2).join(', ')} …</div><div>${b}: ${ml(b, L / b + 2).join(', ')} …</div></div>` + lsEq(`LCM(${a}, ${b}) = ${SLOT}`),
        say: `Look at the multiples. What is the least common multiple of ${a} and ${b}?`});
      return lsDq(D, 2, {kind: 'num', ans: L, sl: {}, bug, hint, html: lsEq(`LCM(${a}, ${b}) = ${SLOT}`), say: `What is the least common multiple of ${a} and ${b}?`});
    }
    const [a, b] = ls6mPk(r, LS6M_GCF), G = ls6mGcd(a, b), bug = {gcfLcm: [ls6mLcm(a, b)]}, hint = {k: 'text', s: `Find the biggest number that goes into both ${a} and ${b}.`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'gcf', m: {a, b, target: G}, goal: 'value', eq: 'value', ans: G, sl: {}, bug: {}, hint, ansSay: `groups of ${G}`,
      html: lsEq(`GCF(${a}, ${b})`) + lsCap('Find the biggest group size that splits both with nothing left.'), say: `The greatest common factor of ${a} and ${b}. Find the biggest group size that splits both.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: G, sl: {}, bug, hint, html: `<div class="ls6m-lists"><div>${a}: ${fl(a).join(', ')}</div><div>${b}: ${fl(b).join(', ')}</div></div>` + lsEq(`GCF(${a}, ${b}) = ${SLOT}`),
      say: `Look at the factors. What is the greatest common factor of ${a} and ${b}?`});
    return lsDq(D, 2, {kind: 'num', ans: G, sl: {}, bug, hint, html: lsEq(`GCF(${a}, ${b}) = ${SLOT}`), say: `What is the greatest common factor of ${a} and ${b}?`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'gcf', m: {a: 12, b: 18, target: 6}, goal: 'moved', eq: 'value', ans: 6, raw: 1, sl: {}, demo: [3],
    html: lsCap('Try any group size for 12 and 18.'), say: 'Here are 12 and 18. Try any group size you like.'}), nudge: 'Change the group size, then check.',
  react: v => { const k = Array.isArray(v) ? v[0] : +v; return {ctx: {k, a: 12, b: 18}, lines: [12 % k || 18 % k ? `Groups of ${k}: something is left over.` : `Groups of ${k}: 12 and 18 both split evenly.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls6mGroups(12, 18, c.k)}</div>` + lsEq('GCF(12, 18) = 6'), sl: c});
  return D;
}

/* ---- Galaxy Core: Mean, Median, Mode (level the towers; the middle of the ordered list) ---- */
const LS6M_BRIEF_DATA = `Explore: four towers of blocks (2, 5, 3 and 6) and a level line; the child moves the line with a stepper; the app counts the blocks above the line and the gaps below it.
Name it: the line they set; lines on it (slots {k}: the line's level, {a}: the blocks above, {b}: the gaps below) and the idea: the mean is the level where the blocks above fill the gaps exactly, the total shared equally; the median is the middle of the numbers in order.
Together (no slots: the numbers are on the screen and the app says them): line 1 before moving the level line to the mean, line 2 before towers with their numbers (they type the mean or the median), line 3 before a list in words only (the mean, median, mode or range).
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two to type, no help, inside a small job in the world (no slots).`;
function ls6mData5(id, t, g, idea, home) {
  const D = ls6mL(id, t, g, {petSt: 1, bugs: ['meanSum', 'medSort'], brief: LS6M_BRIEF_DATA, idea, home, fb: 'At {k}, there are {a} blocks above and {b} gaps below.', test: 2,
    slots: {remember: ['a', 'b'], explore: [], name: ['k', 'a', 'b'], together: [], check: ['ans'], show: []}});
  // n numbers 1..9 with a whole mean, not all the same
  const pick = (r, n) => { for (;;) { const v = Array.from({length: n}, () => lsRi(r, 1, 9)), s = v.reduce((a, b) => a + b, 0); if (s % n == 0 && new Set(v).size > 2) return v; } };
  const med = v => { const s = v.slice().sort((a, b) => a - b); return s[(s.length - 1) / 2]; };
  D.q = (st, r) => {
    const v = pick(r, st == 0 ? 4 : r() < .5 ? 5 : 3), n = v.length, sum = v.reduce((a, b) => a + b, 0), M = sum / n, hintM = {k: 'text', s: `Add them: ${sum}. Share by ${n}: ${sum} ÷ ${n}.`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'lev', m: {vals: v, target: M, s0: M > 4 ? 1 : 9}, goal: 'value', eq: 'value', ans: M, sl: {}, bug: {meanSum: [sum]}, hint: {k: 'text', s: 'Move the line until the blocks above fill the gaps below.'},
      ansSay: `the mean is ${M}`, html: lsCap('Move the line until the blocks above fill every gap below.'), say: 'Move the level line until the blocks above it fill every gap below it.'});
    const odd = n % 2 == 1, md = odd ? med(v) : null, mid = odd ? v[(n - 1) / 2] : null, askMed = odd && md != mid && r() < .5, list = v.join(', ');
    const medQ = (st1) => lsDq(D, st1, {kind: 'num', ans: md, sl: {}, bug: {medSort: [mid], meanSum: [sum].filter(x => x != md)}, hint: {k: 'text', s: 'Put them in order first. The median is the middle one.'},
      html: (st1 == 1 ? `<div class="pkq">${ls6mTowers(v, 0, {line: false})}</div>` : lsCap(`The numbers: ${list}.`)) + lsEq(`median = ${SLOT}`), say: `The numbers are ${list}. What is the median?`});
    const meanQ = (st1) => lsDq(D, st1, {kind: 'num', ans: M, sl: {}, bug: {meanSum: [sum]}, hint: hintM,
      html: (st1 == 1 ? `<div class="pkq">${ls6mTowers(v, 0, {line: false})}</div>` : lsCap(`The numbers: ${list}.`)) + lsEq(`mean = ${SLOT}`), say: `The numbers are ${list}. What is the mean?`});
    if (st == 1 || askMed) return askMed ? medQ(st) : meanQ(1);
    const kind = r();
    if (kind < .2) { // the range: the biggest take away the smallest
      const R0 = Math.max(...v) - Math.min(...v);
      return lsDq(D, 2, {kind: 'num', ans: R0, sl: {}, bug: {meanSum: [sum].filter(x => x != R0)}, hint: {k: 'text', s: 'The biggest take away the smallest.'},
        html: lsCap(`The numbers: ${list}.`) + lsEq(`range = ${SLOT}`), say: `The numbers are ${list}. What is the range?`});
    }
    if (kind < .4) { // the mode: four different numbers and one of them again
      const w = []; while (w.length < 4) { const x = lsRi(r, 1, 9); if (!w.includes(x)) w.push(x); }
      const mo = w[lsRi(r, 0, 3)], u = w.concat(mo), s2 = u.reduce((a, b) => a + b, 0);
      return lsDq(D, 2, {kind: 'num', ans: mo, sl: {}, bug: {meanSum: [s2]}, hint: {k: 'text', s: 'The mode is the number that comes up most often.'},
        html: lsCap(`The numbers: ${u.join(', ')}.`) + lsEq(`mode = ${SLOT}`), say: `The numbers are ${u.join(', ')}. What is the mode?`});
    }
    return meanQ(2);
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'lev', m: {vals: [2, 5, 3, 6], target: 4, s0: 1}, goal: 'moved', eq: 'value', ans: 4, raw: 1, sl: {}, demo: [5],
    html: lsCap('Move the level line anywhere.'), say: 'Move the level line anywhere you like. Watch the blocks above and the gaps below.'}), nudge: 'Move the line, then check.',
  react: v => { const k = Array.isArray(v) ? v[0] : +v, V = [2, 5, 3, 6], a = ls6mAbove(V, k), b = ls6mGaps(V, k); return {ctx: {k, a, b}, lines: [a == b ? `At ${k}, the blocks above fill the gaps exactly.` : `At ${k}, ${a} blocks above and ${b} gaps below.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls6mTowers([2, 5, 3, 6], c.k)}</div>` + lsEq('2 + 5 + 3 + 6 = 16<br>16 ÷ 4 = 4'), sl: c});
  return D;
}

/* ---- Galaxy Core: Rate & Percent Stories (a ratio table for a rate; a percent bar for a sale or a score) ---- */
// a rate story: [the story for a and b, the question for k·a, the rows' names, the words for the asked amount]
const LS6M_RSTORY = [[(a, b) => `Zoe swims ${a} laps in ${b} minutes.`, x => `How many minutes for ${x} laps?`, 'Laps', 'Minutes', 'laps', 'minutes'],
  [(a, b) => `A recipe uses ${a} cups of water for ${b} cups of rice.`, x => `How much rice for ${x} cups of water?`, 'Water', 'Rice', 'cups of water', 'cups of rice'],
  [(a, b) => `Leo reads ${a} pages in ${b} minutes.`, x => `How many minutes for ${x} pages?`, 'Pages', 'Minutes', 'pages', 'minutes']];
const LS6M_PSTORY = [['A jacket costs', 'dollars. It is', 'percent off. How many dollars off?'], ['A class has', 'kids.', 'percent walk to school. How many walk?'], ['A tank holds', 'liters. It is', 'percent full. How many liters?']];
const LS6M_BRIEF_ST9 = `Explore: a bar for 80 cut into ten boxes (each box is ten percent); the child shades any percent with steppers.
Name it: the bar they shaded; lines on it (slots {n}: the percent, {a}: that part of 80) and the idea: picture the story first: a rate story grows by equal groups in a table; a percent story takes tenths of the whole.
Together (no slots: each story has its own numbers and the app reads it out): line 1 before building a rate table or shading a percent bar for a story, line 2 before a table or a bar with a "?" (they type the answer), line 3 before a story alone.
Remember: a warm-up: ten percent of a number (no slots).
Show: two stories to solve, no help, inside a small job in the world (no slots).`;
function ls6mStory9(id, t, g, idea, home) {
  const D = ls6mL(id, t, g, {petSt: 1, bugs: ['addRat', 'pctNum', 'wrongOp'], brief: LS6M_BRIEF_ST9, idea, home, fb: '{n} percent of 80 is {a}.', test: 2,
    slots: {remember: [], explore: [], name: ['n', 'a'], together: [], check: ['ans'], show: []}});
  D.q = (st, r) => {
    if (r() < .5) { // a rate story on a ratio table
      const [story, askOf, na, nb, wa, wb] = ls6mPk(r, LS6M_RSTORY); let a, b; do { a = lsRi(r, 2, 5); b = lsRi(r, 2, 9); } while (a == b);
      const k = lsRi(r, 3, 6), S = story(a, b), ask = askOf(k * a), ans = k * b, bug = {addRat: [b + (k * a - a)], wrongOp: [k * a * b, k * a + b]};
      const hint = {k: 'text', s: `${k * a} is ${k} groups of ${a}. So ${k} groups of ${b}.`};
      if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'rtab', m: {a, b, na, nb, target: ans, ka: k * a}, goal: 'value', eq: 'value', ans, sl: {}, bug: {addRat: bug.addRat}, hint, ansSay: `${k * a} ${wa}, ${ans} ${wb}`,
        html: ls6mSt(S) + lsCap(`Add groups up to ${k * a} ${wa}.`), say: `${S} Add groups up to ${k * a} ${wa}.`});
      if (st == 1) return lsDq(D, 1, {kind: 'num', ans, sl: {}, bug, hint, html: ls6mSt(S) + `<div class="pkq">${ls6mRatio(a, b, k, na, nb, {hideB: 1})}</div>` + lsCap(ask) + lsEq(SLOT), say: `${S} ${ask}`});
      return lsDq(D, 2, {kind: 'num', ans, sl: {}, bug, hint, html: ls6mSt(S) + lsCap(ask) + lsEq(SLOT), say: `${S} ${ask}`});
    }
    // a percent story on a percent bar
    const [s1, s2, s3] = ls6mPk(r, LS6M_PSTORY), T = 20 * lsRi(r, 2, 10), p = ls6mPk(r, [10, 20, 30, 40, 60, 25, 75]), ans = T * p / 100, S = `${s1} ${T} ${s2} ${p} ${s3}`;
    const bug = {pctNum: [p], wrongOp: [T - ans, T + p].filter(v => v != ans)}, hint = {k: 'text', s: `Ten percent of ${T} is ${T / 10}. ${p} percent is ${p / 10} of those.`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'pct', m: {T, target: p}, goal: 'value', eq: 'value', ans: p, sl: {}, bug: {}, hint, ansSay: `${p} percent of ${T} is ${ans}`,
      html: ls6mSt(S) + lsCap(`Shade ${p}% of the bar.`), say: `${S} Shade ${p} percent of the bar.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans, sl: {}, bug, hint, html: ls6mSt(S) + `<div class="pkq">${ls6mPBar(T, p, {q: 1})}</div>` + lsEq(SLOT), say: S});
    return lsDq(D, 2, {kind: 'num', ans, sl: {}, bug, hint, html: ls6mSt(S) + lsEq(SLOT), say: S});
  };
  D.warm = r => { const T = 10 * lsRi(r, 2, 12); return lsDq(D, 0, {kind: 'num', ans: T / 10, html: lsEq(`10% of ${T} = ${SLOT}`), say: `10 percent of ${T} equals what?`, sl: {},
    hint: {k: 'text', s: `Ten percent is one tenth: ${T} ÷ 10.`}, bug: {pctNum: [10]}}); };
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'pct', m: {T: 80, target: 30}, goal: 'moved', eq: 'value', ans: 30, raw: 1, sl: {}, demo: [25],
    html: lsCap('This bar is 80. Shade any percent of it.'), say: 'This bar is 80, cut into ten boxes. Shade any percent you like.'}), nudge: 'Shade some of the bar, then check.',
  react: v => { const n = Array.isArray(v) ? v[0] : +v; return {ctx: {n, a: 80 * n / 100}, lines: [`${n} percent of 80 is ${80 * n / 100}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls6mPBar(80, c.n, {each: 1})}</div>` + lsEq(`${c.n}% of 80 = ${c.a}`), sl: c});
  return D;
}

// map order (CURRICULUM 2.1: Sky City, then Galaxy Core). The idea and tonight's question are the fallback; a reviewed draft's replace them.
// The codes these lessons borrow from teach35 (52i, 52n) must be in: a teach35 that stopped part way (a test loads the parts without
// gen2, where the app refuses to start) registers nothing here instead of throwing.
if (['wrongOp', 'order', 'slip', 'swapXY', 'flipDiv'].every(c => BUGS[c])) {
  lsDraft3('ratio1', ls6mLab(ls6mRatio1('ratio1', 'Ratios and Tables', 6, 'A ratio table grows by multiplying both rows by the same number.', 'Ask {name}: "3 red for every 5 blue. How many blue with 12 red?"')));
  lsDraft3('ratio2', ls6mLab(ls6mRatio2('ratio2', 'Unit Rates', 6, 'A unit rate is how much for one: share the total by the number of items.', 'Ask {name}: "4 pounds cost $12. How much is 1 pound? And 7 pounds?"')));
  lsDraft3('int1', ls6mLab(ls6mInt1('int1', 'Integers on a Line', 6, 'Negative numbers sit left of zero, and further left is always less.', 'Ask {name}: "Which is colder, -3 degrees or -8 degrees?"')));
  lsDraft3('ratio3', ls6mLab(ls6mRatio3('ratio3', 'Percent of a Number', 6, 'Percent means out of a hundred: find one tenth, then take as many tenths as you need.', 'Ask {name}: "What is 30% of 70?"')));
  lsDraft3('int2', ls6mLab(ls6mInt2('int2', 'Absolute Value', 6, 'Absolute value is the distance from zero, so it is never negative.', 'Ask {name}: "How far apart are -4 and 5 on a number line?"')));
  lsDraft3('ratio4', ls6mLab(ls6mRatio4('ratio4', 'Fractions and Percents', 6, 'To write a fraction as a percent, rename it out of a hundred.', 'Ask {name}: "What percent is 3/4? And 2/5?"')));
  lsDraft3('fop7', ls6mLab(ls6mFop7('fop7', 'Divide Fractions', 6, 'Dividing by a fraction counts how many of it fit: same size parts first.', 'Ask {name}: "How many 1/6 cups fit in 2/3 of a cup?"')));
  lsDraft3('int3', ls6mLab(ls6mInt3('int3', 'Integer Add & Subtract', 6, 'Adding moves right on the line; taking away, or adding a negative, moves left.', 'Ask {name}: "It is -4 degrees, then 9 degrees warmer. What now?"')));
  lsDraft3('ooo2', ls6mLab(ls6mOoo2('ooo2', 'Exponents', 6, 'The exponent says how many times the base is used as a factor.', 'Ask {name}: "Is 4 cubed the same as 4 times 3? Why not?"')));
  lsDraft3('alg1', ls6mLab(ls6mAlg1('alg1', 'One-Step Equations', 6, 'Undo what is done to x: do the opposite to both sides.', 'Ask {name}: "x + 17 = 42. What is x? How do you know?"')));
  lsDraft3('ooo3', ls6mLab(ls6mOoo3('ooo3', 'Evaluate Expressions', 6, 'Put the number in for x; a number next to x means times.', 'Ask {name}: "What is 3x + 4 when x is 5?"')));
  lsDraft3('alg2', ls6mLab(ls6mAlg2('alg2', 'Solve with × and ÷', 6, 'Equal boxes share a total, so divide; a whole cut into boxes, so multiply.', 'Ask {name}: "6x = 54. What is x?"')));
  lsDraft3('geo5', ls6mLab(ls6mGeo5('geo5', 'Triangles & Trapezoids', 6, 'A triangle is half of its rectangle: base times height, then half.', 'Ask {name}: "A triangle has base 8 and height 5. What is its area?"')));
  lsDraft3('coord2', ls6mLab(ls6mCoord2('coord2', 'Four Quadrants', 6, 'Across first, then up; left of zero and below zero are negative.', 'Ask {name}: "Which quadrant is (-2, 3) in?"')));
  lsDraft3('fact3', ls6mLab(ls6mFact3('fact3', 'GCF and LCM', 6, 'The GCF is the biggest number that divides both; the LCM is the first number both count to.', 'Ask {name}: "GCF of 18 and 24? LCM of 4 and 6?"')));
  lsDraft3('data5', ls6mLab(ls6mData5('data5', 'Mean, Median, Mode', 6, 'The mean shares the total equally; the median is the middle of the numbers in order.', 'Ask {name}: "What is the mean of 2, 5, 3 and 6?"')));
  lsDraft3('alg3', ls6mLab(ls6mAlg3('alg3', 'Two-Step Equations', 6, 'Undo the steps in reverse: take away the number added, then divide.', 'Ask {name}: "3x + 4 = 19. What is x?"')));
  lsDraft3('story9', ls6mLab(ls6mStory9('story9', 'Rate & Percent Stories', 6, 'Picture the story first: a rate grows by equal groups, a percent takes tenths of the whole.', 'Ask {name}: "A $40 jacket is 25% off. How much do you save?"')));
}

var TEACH6_VER='v189'; // last line: the whole file ran (checked by dataReady() before the app starts)
