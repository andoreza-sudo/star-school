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
  if (lv == 1) {a = pick(MF_KEYS[0]); b = R(0, 10)}
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
      say: `${fcSay(n, d)} equals how many ${FC_NAMES[D]}s?`, ans: String(n * m), hint, label: `frac eq ${n}/${d} = ?/${D}`};
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
  let s;
  if (half(n1, d1) * half(n2, d2) == -1) {
    s = `Think about one half. ${n1}/${d1} is ${half(n1, d1) < 0 ? 'less' : 'more'} than a half and ${n2}/${d2} is ${half(n2, d2) < 0 ? 'less' : 'more'} than a half.`;
  } else {
    s = `Make the bottom numbers match. Both can have ${L} on the bottom: ${n1}/${d1} = ${n1 * L / d1}/${L} and ${n2}/${d2} = ${n2 * L / d2}/${L}.`;
  }
  return {kind: 'choice', cls: 'syms', html: `<div class="sub">Which is true?</div><div class="eq">${fcFr(n1, d1)} ${SLOT} ${fcFr(n2, d2)}</div>`,
    say: `Is ${fcSay(n1, d1)} less than, equal to, or greater than ${fcSay(n2, d2)}?`, ans, choices: FC_SYM.map(c => ({...c})),
    hint: {k: 'text', s}, label: `frac cmp2 ${n1}/${d1} ? ${n2}/${d2}`};
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
      say: `${w} and ${fcSay(n, d)} equals how many ${FC_NAMES[d]}s?`, ans: String(top),
      hint: {k: 'text', s: `Each whole is ${d} ${FC_NAMES[d]}s. ${w} wholes make ${w * d}. Then add the ${n} more.`}, label: `frac to improper ${w} ${n}/${d}`};
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
