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
