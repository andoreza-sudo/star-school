/* Upper-grade math generators (4th grade and up). One marked block per chunk, so parallel chunks merge by appending.
   Seeded randomness only (R, pick, shuffle, coin, rnd). Step hints come from 39b-steps.js. */

// ---- P2-09 Factor Factory ----
/* CURRICULUM M-4a: whole numbers, 4th grade (world m_factory). All names start with fy.
   mfact 5   facts with 11 and 12, then all facts to 12 x 12 (30% missing factor)
   pv 4      numbers to 999,999: value of a digit, expanded form, words -> digits, compare
   mbig 2-4  2-digit x 1-digit, 3- and 4-digit x 1-digit, 2-digit x 2-digit (vertical, partial products)
   big 6-7   add two 4-digit numbers; add 5- and 6-digit numbers, some with three addends
   sub 8     subtract 4- to 6-digit numbers with regrouping, zeros included
   dbig 1-3  long division by one digit: no remainder, with remainder (R pad), 3- and 4-digit dividends
   fact 1-2  factors and multiples; prime or composite
   round 3   round to any place up to the hundred thousands */

const fyComma = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const FY_PLACE = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands'];

// spoken words for 0..999,999: 472019 -> "four hundred seventy-two thousand, nineteen"
const FY_ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen',
  'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const FY_TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function fyWords3(n) { // 1..999
  const h = Math.floor(n / 100), r = n % 100, out = [];
  if (h) out.push(FY_ONES[h] + ' hundred');
  if (r) out.push(r < 20 ? FY_ONES[r] : FY_TENS[Math.floor(r / 10)] + (r % 10 ? '-' + FY_ONES[r % 10] : ''));
  return out.join(' ');
}
function fyWords(n) {
  if (n == 0) return 'zero';
  const t = Math.floor(n / 1000), r = n % 1000;
  return [t ? fyWords3(t) + ' thousand' : '', r ? fyWords3(r) : ''].filter(Boolean).join(t && r ? ', ' : '');
}
const fyDigits = n => String(n).split('').map(Number);

// a plain vertical question: stacked numbers, one answer. nums: addends / factors; op '+', '−' or '×'
function fyVert(nums, op, ans, hint, max) {
  const w = {'+': 'plus', '−': 'minus', '×': 'times'}[op];
  const q = {kind: 'num', html: ST.vert(nums, op), say: `${nums.join(' ' + w + ' ')} equals what?`, ans: String(ans),
    hint, label: `${nums.join(' ' + op + ' ')} = ?`};
  if (max) q.max = max;
  return q;
}

// mfact 5: times facts with 11 and 12, then all facts to 12 x 12; 30% of the items ask for a missing factor
function fyMfact5() {
  let a, b;
  if (rnd() < .5) {a = pick([11, 12]); b = R(2, 12)} else {a = R(2, 12); b = R(2, 12)}
  if (coin()) [a, b] = [b, a];
  if (rnd() < .3) { // a x ? = c; both factors at least 2, so the answer is the only one
    const blank = coin() ? 'a' : 'b', known = blank == 'a' ? b : a, c = a * b;
    const q = facQ(a, '×', b, c, blank, false, {k: 'text', s: `Think: ${c} ÷ ${known} = ? That is the missing number.`});
    q.max = 2;
    return q;
  }
  const x = Math.max(a, b), y = Math.min(a, b);
  const hint = x >= 11
    ? {k: 'text', s: `Split ${x} into 10 and ${x - 10}. ${y} × 10 = ${y * 10} and ${y} × ${x - 10} = ${y * (x - 10)}. Now add ${y * 10} + ${y * (x - 10)}.`}
    : mfHint(a, b);
  const q = facQ(a, '×', b, a * b, 'c', coin(), hint);
  q.max = 3;
  return q;
}

// pv 4: place value to 999,999 (four forms)
function fyPv4() {
  const form = pick(['value', 'exp', 'words', 'cmp']);
  const hint = s => ({k: 'text', s});
  if (form == 'value') {
    const d = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 6), n = +d.join(''), p = R(0, 5), dig = d[5 - p], ans = dig * 10 ** p;
    const shown = fyComma(n).split('').map(c => c); // keep the commas; underline the one digit
    let pos = 0;
    const html = shown.map(c => (c == ',' ? c : (pos++ == 5 - p ? `<b><u>${c}</u></b>` : c))).join('');
    const others = shuffle([0, 1, 2, 3, 4, 5].filter(x => x != p)).slice(0, 3).map(x => dig * 10 ** x);
    return {kind: 'choice', cls: 'wide', html: `<div class="eq">${html}</div><div class="sub">What is the value of the ${dig} in ${fyComma(n)}?</div>`,
      say: `What is the value of the ${dig} in ${n}?`, ans: String(ans), after: `The ${dig} is in the ${FY_PLACE[p]} place, so it is worth ${fyComma(ans)}`,
      choices: shuffle([ans, ...others]).map(x => ({v: String(x), l: fyComma(x)})), label: `value of ${dig} in ${n}`,
      hint: hint('Find the digit. Count its place from the right: ones, tens, hundreds, thousands, ten thousands, hundred thousands.')};
  }
  if (form == 'exp') {
    let d;
    do d = [R(1, 9), ...Array.from({length: 5}, () => (rnd() < .3 ? 0 : R(1, 9)))]; while (d.filter(x => x).length < 3);
    const n = +d.join(''), parts = d.map((x, i) => x * 10 ** (5 - i)).filter(x => x);
    return {kind: 'num', max: 6, html: `<div class="sub">Write the number.</div><div class="eq" style="font-size:.62em;line-height:1.5">${parts.map(fyComma).join(' + ')}</div><div class="eq">= ${SLOT}</div>`,
      say: `${parts.join(' plus ')} equals what?`, ans: String(n), label: `${parts.join(' + ')} = ?`,
      hint: hint('Each part tells one place. Write its digit in that place and put a 0 in every place with no part.')};
  }
  if (form == 'words') {
    const n = coin() ? R(100001, 999999) : R(10000, 99999) * (rnd() < .5 ? 10 : 1) + R(0, 9);
    const w = fyWords(n);
    return {kind: 'num', max: 6, auto: true, html: `<div class="sub">Write this number with digits.</div><div class="sub" style="font-weight:700;color:var(--ink,inherit)">${w}</div><div class="eq">${SLOT}</div>`,
      say: w, ans: String(n), label: `words to number ${n}`,
      hint: hint('The part before the word "thousand" goes in front of the comma. The part after it goes behind. Use a 0 for any place you skip.')};
  }
  // compare: same leading digits half the time
  let a = R(100000, 999999), b;
  if (coin()) {
    const keep = R(2, 5), s = String(a);
    b = +(s.slice(0, keep) + String(R(0, 10 ** (6 - keep) - 1)).padStart(6 - keep, '0'));
  } else b = R(100000, 999999);
  if (rnd() < .15) b = a;
  const ans = a > b ? '>' : a < b ? '<' : '=', w = {'>': 'greater than', '<': 'less than', '=': 'equal to'};
  return {kind: 'choice', cls: 'syms', html: `<div class="eq" style="font-size:.8em">${fyComma(a)} ${SLOT} ${fyComma(b)}</div><div class="sub">Bigger, smaller, or the same?</div>`,
    say: `Is ${a} greater than, less than, or equal to ${b}?`, ans, after: `${fyComma(a)} is ${w[ans]} ${fyComma(b)}`,
    choices: ['<', '=', '>'].map(x => ({l: x, v: x})), label: `${a} ? ${b}`,
    hint: hint('Line up the digits. Compare from the left, starting with the biggest place. The first place that is different decides.')};
}

// mbig 2-4: multiplication, vertical, partial products (stepsMul)
function fyMbig(lv) {
  let a, b;
  if (lv == 2) {a = R(12, 99); b = R(2, 9); if (a % 10 == 0) a++}
  else if (lv == 3) {a = rnd() < .6 ? R(101, 999) : R(1001, 9999); b = R(2, 9); if (a % 10 == 0) a++}
  else {a = R(12, 99); b = R(12, 99); if (a % 10 == 0) a++; if (b % 10 == 0) b++}
  return fyVert([a, b], '×', a * b, stepsMul(a, b), lv == 3 ? 5 : 0);
}

// big 6: two 4-digit numbers, at least one regroup
function fyBig6() {
  let a, b;
  do {a = R(1000, 9999); b = R(1000, 9999)} while (!fyCarries([a, b]));
  return fyVert([a, b], '+', a + b, stepsAdd(a, b), 5);
}
// does the column sum carry anywhere
function fyCarries(nums) {
  let c = 0;
  for (let e = 0; e < 7; e++) {
    const s = nums.reduce((t, n) => t + (Math.floor(n / 10 ** e) % 10), 0) + c;
    if (s >= 10) return true;
    c = 0;
  }
  return false;
}
// big 7: 5- and 6-digit addends; three addends a third of the time
function fyBig7() {
  let xs;
  do {
    xs = rnd() < .33 ? Array.from({length: 3}, () => R(10000, 999999)) : [R(10000, 999999), R(10000, 999999)];
    if (xs.length == 2 && String(xs[0]).length + String(xs[1]).length < 11) xs[1] = R(100000, 999999); // not two 5-digit numbers every time
  } while (!fyCarries(xs));
  const s = xs.reduce((t, n) => t + n, 0);
  return fyVert(xs, '+', s, stepsAdd(...xs), 7);
}

// sub 8: 4- to 6-digit subtraction with regrouping; about half have zeros in the top number
function fySub8() {
  for (;;) {
    const L = R(4, 6), d = [R(1, 9), ...Array.from({length: L - 1}, () => R(0, 9))];
    if (rnd() < .55) { // zeros in the top number (never the first digit)
      for (let k = R(1, 2); k > 0; k--) d[R(1, L - 1)] = 0;
    }
    const a = +d.join(''), Lb = rnd() < .25 ? L - 1 : L, top = Math.min(a - 1, 10 ** Lb - 1);
    if (top < 10 ** (Lb - 1)) continue;
    const b = R(10 ** (Lb - 1), top);
    if (b % 10 == 0 && rnd() < .7) continue;
    const da = fyDigits(a).reverse(), db = fyDigits(b).reverse();
    if (!da.some((x, i) => x < (db[i] || 0))) continue; // a column that must regroup
    return fyVert([a, b], '−', a - b, stepsSub(a, b), 6);
  }
}

// dbig 1-3: long division by one digit (ldiv layout, stepsDiv). lv 1: no remainder; lv 2: remainder (R pad); lv 3: 3- and 4-digit
// R-01m: dbig 1 picks one of its 98 divisions (divisor 2-9, quotient 11-49, a 2-digit dividend) evenly; picking the divisor
// first made the quotient 11 in a quarter of the questions
const FY_DBIG1 = [];
for (let d = 2; d <= 9; d++) for (let q = 11; q <= Math.min(49, Math.floor(99 / d)); q++) FY_DBIG1.push([d, q]);
function fyDbig(lv) {
  let d = R(2, 9);
  let n, qt, rem = 0, html, extra = {};
  if (lv == 1) {
    [d, qt] = pick(FY_DBIG1);
    n = d * qt;
    html = coin() ? ST.ldiv(n, d) : `<div class="eq">${n} ÷ ${d} = ${SLOT}</div>`;
    return {kind: 'num', html, say: `${n} divided by ${d} equals what?`, ans: String(qt), hint: stepsDiv(n, d), label: `${n} ÷ ${d} = ?`};
  }
  if (lv == 2) {
    rem = R(1, d - 1);
    qt = R(Math.max(2, Math.ceil((10 - rem) / d)), Math.floor((99 - rem) / d)); // a 2-digit dividend
    n = d * qt + rem;
  } else {
    const hi = rnd() < .65 ? 999 : 9999, lo = hi == 999 ? 100 : 1000;
    rem = rnd() < .5 ? 0 : R(1, d - 1);
    qt = R(Math.ceil((lo - rem) / d), Math.floor((hi - rem) / d));
    n = d * qt + rem;
  }
  if (rem) {
    extra = {sep: 'R'};
    html = ST.ldiv(n, d, SLOT_R);
  } else html = ST.ldiv(n, d);
  return Object.assign({kind: 'num', html, say: rem ? `${n} divided by ${d}. How many whole groups, and what is left over?` : `${n} divided by ${d} equals what?`,
    ans: rem ? `${qt}R${rem}` : String(qt), hint: stepsDiv(n, d), label: `${n} ÷ ${d} = ?`}, extra);
}

// fact 1: factors and multiples (pick the factor / tap all factors / pick the multiple)
function fyFact1() {
  const form = pick(['factor', 'multi', 'mult']);
  const divs = n => Array.from({length: n - 1}, (_, i) => i + 2).filter(x => n % x == 0 && x < n); // 2..n-1
  const fmt = a => a.map(x => ({v: String(x), l: String(x)}));
  if (form == 'mult') {
    const b = R(3, 12), m = b * R(2, Math.floor(100 / b)), near = [m - 1, m + 1, m - 2, m + 2, m + b - 1, m + b + 1, m - b + 1, m - b - 1];
    const bad = shuffle(near.filter((x, i) => x > 1 && x % b && near.indexOf(x) == i)).slice(0, 3);
    return {kind: 'choice', html: `<div class="sub">Which number is a multiple of ${b}?</div>`, say: `Which number is a multiple of ${b}?`, ans: String(m),
      after: `${m} is a multiple of ${b}: ${m} ÷ ${b} is a whole number`, choices: shuffle(fmt([m, ...bad])), label: `multiple of ${b}`,
      hint: {k: 'text', s: `A multiple of ${b} is in the ${b} times table. Try dividing each number by ${b}. A multiple leaves nothing left over.`}};
  }
  let n;
  do n = R(12, form == 'multi' ? 60 : 100); while (divs(n).length < (form == 'multi' ? 4 : 2));
  const dv = divs(n);
  if (form == 'factor') {
    const ans = pick(dv), hi = Math.max(12, Math.min(n - 1, 30));
    const bad = shuffle(Array.from({length: hi - 1}, (_, i) => i + 2).filter(x => n % x)).slice(0, 3);
    return {kind: 'choice', html: `<div class="sub">Which number is a factor of ${n}?</div>`, say: `Which number is a factor of ${n}?`, ans: String(ans),
      after: `${ans} is a factor of ${n}: ${n} ÷ ${ans} = ${n / ans}`, choices: shuffle(fmt([ans, ...bad])), label: `factor of ${n}`,
      hint: {k: 'text', s: `A factor divides ${n} with nothing left over. Try ${n} ÷ each number. Which one comes out even?`}};
  }
  // multi: tap ALL the factors among six numbers
  const t = Math.min(R(2, 4), dv.length), win = Math.max(Math.floor(n / 2) + 4, 14);
  const yes = shuffle(dv.filter(x => x <= n / 2)).slice(0, t);
  const no = shuffle(Array.from({length: Math.min(win, n - 1) - 1}, (_, i) => i + 2).filter(x => n % x)).slice(0, 6 - t);
  const all = [...yes, ...no].sort((x, y) => x - y);
  return {kind: 'multi', html: `<div class="sub">Tap ALL the factors of ${n}.</div>`, say: `Tap all the factors of ${n}.`, ans: kindSort(yes.map(String)),
    choices: fmt(all), label: `all factors of ${n}`,
    hint: {k: 'text', s: `A factor divides ${n} with nothing left over. Try ${n} ÷ each number, one at a time. Tap every one that comes out even.`}};
}

// fact 2: prime or composite (2-100), and "which number is prime?"
const FY_PRIME = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
function fyFact2() {
  const comp = Array.from({length: 97}, (_, i) => i + 4).filter(x => !FY_PRIME.includes(x));
  const hint = {k: 'text', s: 'A prime has only two factors, 1 and itself. A composite has more. Any composite under 100 divides by 2, 3, 5 or 7. Try those.'};
  if (coin()) {
    const prime = rnd() < .4, n = prime ? pick(FY_PRIME) : pick(comp), ans = prime ? 'prime' : 'composite';
    return {kind: 'choice', html: `<div class="eq">${n}</div><div class="sub">Prime or composite?</div>`, say: `Is ${n} prime or composite?`, ans,
      after: prime ? `${n} is prime: only 1 and ${n} divide it` : `${n} is composite: it has more than two factors`,
      choices: [{l: 'Prime', v: 'prime'}, {l: 'Composite', v: 'composite'}], label: `${n} prime or composite`, hint};
  }
  const odd = comp.filter(x => x % 2 && x > 8), p = pick(FY_PRIME);
  const bad = shuffle([...shuffle(odd).slice(0, 2), pick(comp)]);
  const all = [p, ...bad];
  if (new Set(all).size < 4) return fyFact2();
  return {kind: 'choice', html: '<div class="sub">Which number is prime?</div>', say: 'Which number is prime?', ans: String(p),
    after: `${p} is prime: only 1 and ${p} divide it`, choices: shuffle(all).map(x => ({v: String(x), l: String(x)})), label: `which is prime ${all.slice().sort((a, b) => a - b).join(',')}`, hint};
}

// round 3: any place up to the hundred thousands, numbers to 999,999 (round half up)
function fyRound3() {
  const ps = [10, 100, 1000, 10000, 100000], names = ['ten', 'hundred', 'thousand', 'ten thousand', 'hundred thousand'];
  const plc = {10: 'tens', 100: 'hundreds', 1000: 'thousands', 10000: 'ten thousands', 100000: 'hundred thousands'};
  const below = {10: 'ones', 100: 'tens', 1000: 'hundreds', 10000: 'thousands', 100000: 'ten thousands'};
  for (;;) {
    const i = R(0, 4), p = ps[i], L = R(Math.max(4, i + 2), 6), n = R(10 ** (L - 1), 10 ** L - 1);
    if (n % p == 0) continue;
    const ans = Math.floor((n + p / 2) / p) * p;
    if (ans > 999999) continue;
    const s = String(n), keepPos = s.length - 1 - Math.log10(p), keep = +s[keepPos], nxt = +s[keepPos + 1];
    return {kind: 'num', max: 6, html: `<div class="sub">Round ${fyComma(n)} to the nearest ${names[i]}.</div><div class="eq">${SLOT}</div>`,
      say: `Round ${n} to the nearest ${names[i]}.`, ans: String(ans), label: `round ${n} to ${p}`,
      hint: stepsStory([`Find the ${plc[p]} place in ${fyComma(n)}. It holds the ${keep}.`,
        `Look at the digit just to its right, in the ${below[p]} place. It is ${nxt == 8 ? 'an' : 'a'} ${nxt}.`,
        `Is ${nxt} 5 or more? Then add 1 to the ${keep} and make every digit after it 0. Is it less than 5? Then the ${keep} stays.`])};
  }
}

// ---- P2-10 Decimal Desert ----
/* CURRICULUM M-4b: the stops of Decimal Desert (m_desert), all names start with ds.
   fop 1-2   add and subtract like fractions (mixed numbers too), whole number times a fraction
   dec 1-2   tenths and hundredths, comparing decimals          ang 1-2   kinds of angles, protractor, missing angles
   geo 3     missing side of a rectangle, L-shapes              shape 6   symmetry, parallel and perpendicular, triangles
   meas 5    larger to smaller units                            pat 4     in and out tables
   story 7   division stories where the remainder must be read
   frac 6-8 are P2-06's generators (33-gen-math-mid.js); this chunk only adds their stops.
   Every label holds the numbers of its question, so tools/test.js can rebuild the right answer from the label. */

// a step hint from [picture, head, text] rows; plain text only (fractions as 3/8), the last row ends in a "?"
const dsHint = rows => ({k: 'steps', w: 0, steps: rows.map(([pic, head, text]) => ST.step(pic || '', head, text, null))});
// a decimal as spoken digits: 0.35 -> "0 point 3 5"
const dsSayDec = s => String(s).replace(/\./g, ' point ').replace(/\d/g, d => d + ' ').replace(/\s+/g, ' ').trim();
// a whole number of tenths / hundredths as a decimal string, no trailing zeros: (7, 1) -> 0.7, (43, 2) -> 0.43, (50, 2) -> 0.5
function dsDecStr(int, places) {
  const s = String(int).padStart(places + 1, '0'), w = s.slice(0, -places), f = s.slice(-places).replace(/0+$/, '');
  return f ? `${w}.${f}` : w;
}
const dsFrac = (n, d) => `${n}/${d}`;

/* ---- fop 1: add and subtract fractions with the same bottom ---- */
function dsFopSimple() {
  const add = coin();
  let d, a, b;
  if (add) {
    do {d = R(3, 12); a = R(1, d - 1); b = R(1, d - 1)} while ((a + b) % d == 0);
  } else {
    d = R(3, 12); a = R(2, d - 1); b = R(1, a - 1);
  }
  const op = add ? '+' : '−', r = add ? a + b : a - b;
  const pic = add ? `${VIZ.fracBar(a, d, {w: 190})}${VIZ.fracBar(b, d, {w: 190})}` : VIZ.fracBar(a, d, {w: 190});
  return {kind: 'num', pad: 'frac', eq: 'value',
    html: `<div class="sub">${add ? 'Add' : 'Subtract'}. Write the answer as a fraction.</div><div class="eq">${fcFr(a, d)} ${op} ${fcFr(b, d)} = ${SLOT_FRAC}</div>`,
    say: `${fcSay(a, d)} ${add ? 'plus' : 'minus'} ${fcSay(b, d)}. Write the answer as a fraction.`, ans: dsFrac(r, d),
    hint: dsHint([
      [pic, 'Same size pieces:', add ? `Both are ${ccPl(d)}, so you can put the pieces together.` : `Start with ${fcSay(a, d)} and take away ${b} of them.`],
      ['', add ? 'Add the tops:' : 'Subtract the tops:', `${a} ${op} ${b} = ? Keep ${d} on the bottom.`],
    ]),
    label: `fop1 ${a}/${d} ${op} ${b}/${d}`};
}

function dsFopMixed() {
  const add = coin();
  let w1, w2, a, b, d, W, n, steps;
  if (add) {
    do {
      d = R(3, 12); w1 = R(1, 5); w2 = R(1, 5); a = R(1, d - 1); b = R(1, d - 1);
    } while ((a + b) % d == 0);
    const s = a + b;
    W = w1 + w2 + (s > d ? 1 : 0); n = s % d;
    steps = [['', 'Whole numbers:', `${w1} + ${w2} = ${w1 + w2}.`]];
    if (s > d) {
      steps.push(['', 'Fractions:', `${a}/${d} + ${b}/${d} = ${s}/${d}. That is more than 1 whole, so ${d}/${d} becomes 1 more whole.`]);
      steps.push(['', 'Now:', `Take ${d} off the top of ${s}/${d}: ${s} − ${d} = ? That is the new fraction. Then add 1 more whole.`]);
    } else {
      steps.push(['', 'Fractions:', `Add the tops: ${a} + ${b} = ? Keep ${d} on the bottom. Then write the ${qN(w1 + w2, 'whole')} and that fraction together.`]);
    }
  } else {
    do {
      d = R(3, 12); a = R(1, d - 1); b = R(1, d - 1); w1 = R(2, 9); w2 = R(1, w1 - 1);
    } while (a == b || (a < b && w1 - w2 < 2));
    if (a > b) {
      W = w1 - w2; n = a - b;
      steps = [['', 'Whole numbers:', `${w1} − ${w2} = ${w1 - w2}.`],
        ['', 'Fractions:', `${a}/${d} is bigger than ${b}/${d}, so just subtract the tops: ${a} − ${b} = ? Keep ${d} on the bottom. Then write the ${qN(w1 - w2, 'whole')} and that fraction together.`]];
    } else {
      W = w1 - w2 - 1; n = a + d - b;
      steps = [['', 'Whole numbers:', `${w1} − ${w2} = ${w1 - w2}.`],
        ['', 'Fractions:', `${a}/${d} is smaller than ${b}/${d}. Take 1 whole from the ${qN(w1 - w2, 'whole')}, so ${qN(w1 - w2 - 1, 'whole')} ${w1 - w2 - 1 == 1 ? 'is' : 'are'} left. That whole is ${d}/${d}, so now you have ${a + d}/${d}.`],
        ['', 'Now:', `${a + d} − ${b} = ? Keep ${d} on the bottom. Then write the ${qN(w1 - w2 - 1, 'whole')} and that fraction together.`]];
    }
  }
  const op = add ? '+' : '−';
  return {kind: 'num', sep: 'mix', eq: 'value',
    html: `<div class="sub">${add ? 'Add' : 'Subtract'}. Write a mixed number.</div><div class="eq">${w1} ${fcFr(a, d)} ${op} ${w2} ${fcFr(b, d)} = ${SLOT_MIX}</div>`,
    say: `${w1} and ${fcSay(a, d)} ${add ? 'plus' : 'minus'} ${w2} and ${fcSay(b, d)}. Write the answer as a whole number and a fraction.`,
    ans: `${W} ${n}/${d}`, hint: dsHint(steps), label: `fop1 ${w1} ${a}/${d} ${op} ${w2} ${b}/${d}`};
}

function dsFop1() {
  return rnd() < .67 ? dsFopSimple() : dsFopMixed();
}

/* ---- fop 2: whole number times a fraction, with a picture of repeated addition ---- */
// w bars, each cut into d parts with n shaded: n/d added w times
function dsRep(w, n, d) {
  const cw = Math.min(28, Math.floor(250 / d)), rh = 12, gap = 4, P = 3, W = d * cw + 2 * P, H = w * (rh + gap) - gap + 2 * P;
  let body = '';
  for (let r = 0; r < w; r++) {
    for (let i = 0; i < d; i++) body += `<rect class="vp${i < n ? ' vs' : ''}" x="${P + i * cw}" y="${P + r * (rh + gap)}" width="${cw}" height="${rh}"/>`;
  }
  return `<svg class="viz viz-ds" viewBox="0 0 ${W} ${H}" style="--vw:${W}" role="img" aria-label="bars of equal parts, one for each time it is added">${body}</svg>`;
}
function dsFop2() {
  let w, n, d;
  do {
    w = R(2, 9); d = R(2, 10); n = rnd() < .4 ? 1 : R(1, d - 1);
  } while ((w * n) % d == 0);
  const sum = Array.from({length: w}, () => `${n}/${d}`);
  return {kind: 'num', pad: 'frac', eq: 'value',
    html: `${dsRep(w, n, d)}<div class="sub">Write the answer as a fraction.</div><div class="eq">${w} × ${fcFr(n, d)} = ${SLOT_FRAC}</div>`,
    say: `${w} times ${fcSay(n, d)}. Write the answer as a fraction.`, ans: dsFrac(w * n, d),
    hint: dsHint([
      [VIZ.fracBar(n, d, {w: 170}), 'One time:', `${w} × ${n}/${d} means ${n}/${d} added ${w} times${w <= 4 ? ': ' + sum.join(' + ') : ''}.`],
      ['', 'Add the tops:', `All the pieces are ${ccPl(d)}. ${w} × ${n} = ? Keep ${d} on the bottom.`],
    ]),
    label: `fop2 ${w} × ${n}/${d}`};
}

/* ---- dec 1: tenths and hundredths ---- */
const dsSayPlace = p => (p == 1 ? 'tenths' : 'hundredths');
function dsDec1() {
  const f = rnd(), W = rnd() < .25 ? R(1, 9) : 0;
  const num = (k, p) => W * 10 ** p + k; // whole number of tenths / hundredths
  const sayNum = (k, p) => (W ? `${W} and ${k} over ${10 ** p}` : `${k} over ${10 ** p}`);
  if (f < .32) { // fraction -> decimal (tenths or hundredths)
    const p = coin() ? 1 : 2;
    let k;
    do k = p == 1 ? R(1, 9) : R(1, 99); while (p == 2 && k % 10 == 0);
    const fr = `${W ? W + ' ' : ''}${fcFr(k, 10 ** p)}`;
    return {kind: 'num', pad: 'dec', eq: 'value',
      html: `<div class="sub">Write as a decimal.</div><div class="eq">${fr} = ${SLOT}</div>`,
      say: `Write ${sayNum(k, p)} as a decimal.`, ans: dsDecStr(num(k, p), p),
      hint: {k: 'text', s: p == 1 ? 'The bottom is 10, so this is tenths: one digit after the decimal point. Write the top number in the tenths place.' + (W ? ` The ${qN(W, 'whole')} ${W == 1 ? 'goes' : 'go'} in front of the point.` : '')
        : `The bottom is 100, so this is hundredths: two digits after the decimal point.${k < 10 ? ' The top has only one digit, so put a 0 in the tenths place first.' : ' The top number fills the tenths and hundredths places.'}${W ? ` The ${qN(W, 'whole')} ${W == 1 ? 'goes' : 'go'} in front of the point.` : ''}`},
      label: `dec1 ${W ? W + ' ' : ''}${k}/${10 ** p} to decimal`};
  }
  if (f < .6) { // decimal -> fraction
    const p = coin() ? 1 : 2;
    let k;
    do k = p == 1 ? R(1, 9) : R(1, 99); while (p == 2 && k % 10 == 0);
    const dec = dsDecStr(k, p);
    return {kind: 'num', pad: 'frac', eq: 'value',
      html: `<div class="sub">Write as a fraction.</div><div class="eq">${dec} = ${SLOT_FRAC}</div>`,
      say: `Write ${dsSayDec(dec)} as a fraction.`, ans: `${k}/${10 ** p}`,
      hint: {k: 'text', s: 'Count the digits after the decimal point. One digit means tenths (bottom 10). Two digits mean hundredths (bottom 100). The digits go on top.'},
      label: `dec1 ${dec} to fraction`};
  }
  if (f < .8) { // a grid picture
    const p = coin() ? 1 : 2, k = p == 1 ? R(1, 9) : R(1, 99);
    const pic = p == 1 ? VIZ.areaGrid(10, 1, {n: k}) : VIZ.areaGrid(10, 10, {n: k});
    return {kind: 'num', pad: 'dec', eq: 'value',
      html: `${pic}<div class="sub">${p == 1 ? 'The whole strip is 1.' : 'The whole grid is 1.'} What decimal is shaded?</div><div class="eq">${SLOT}</div>`,
      say: `The whole ${p == 1 ? 'strip' : 'grid'} is 1. What decimal is shaded?`, ans: dsDecStr(k, p),
      hint: {k: 'text', s: p == 1 ? 'The strip has 10 equal parts. Each part is one tenth. Count the shaded parts.'
        : 'The grid has 100 squares. Each square is one hundredth. Count the shaded squares, then write that many hundredths as a decimal.'},
      label: `dec1 grid ${k} of ${10 ** p}`};
  }
  // a number line: tenths 0 to 1, or hundredths between two tenths
  const p = coin() ? 1 : 2;
  if (p == 1) {
    const k = R(1, 9);
    return {kind: 'num', pad: 'dec', eq: 'value',
      html: `${VIZ.numLine({min: 0, max: 1, step: .1, labels: [0, 1], marks: [k / 10]})}<div class="sub">What decimal is the dot?</div><div class="eq">${SLOT}</div>`,
      say: 'The line is cut into 10 equal parts from 0 to 1. What decimal is the dot?', ans: dsDecStr(k, 1),
      hint: {k: 'text', s: 'The line from 0 to 1 is cut into 10 equal parts. Each part is one tenth. Count the parts from 0 to the dot.'},
      label: `dec1 line ${k} tenths`};
  }
  const t = R(0, 8), k = R(1, 9), lo = dsDecStr(t, 1), hi = dsDecStr(t + 1, 1), v = t * 10 + k;
  return {kind: 'num', pad: 'dec', eq: 'value',
    html: `${VIZ.numLine({min: t / 10, max: (t + 1) / 10, step: .01, labels: [t / 10, (t + 1) / 10], marks: [v / 100], w: 280})}<div class="sub">What decimal is the dot?</div><div class="eq">${SLOT}</div>`,
    say: `The line goes from ${dsSayDec(lo)} to ${dsSayDec(hi)} in 10 equal parts. What decimal is the dot?`, ans: dsDecStr(v, 2),
    hint: {k: 'text', s: `The line from ${lo} to ${hi} is cut into 10 equal parts. Each part is one hundredth, 0.01. Count the parts from ${lo} to the dot.`},
    label: `dec1 line ${dsDecStr(v, 2)}`};
}

/* ---- dec 2: compare decimals (hundredths, then thousandths), the two numbers never have the same length ---- */
function dsDec2() {
  const th = rnd() < .5, W = rnd() < .3 ? R(1, 3) : 0;
  const lens = th ? pick([[1, 3], [3, 1], [2, 3], [3, 2], [1, 2], [2, 1]]) : pick([[1, 2], [2, 1]]);
  const digs = (len, first) => {
    let s = String(first == null ? R(0, 9) : first);
    for (let i = 1; i < len; i++) s += R(0, 9);
    if (s.slice(-1) == '0') s = s.slice(0, -1) + R(1, 9); // a real last digit: 0.30 is not shown
    return s;
  };
  const show = s => `${W}.${s}`;
  let sa, sb;
  if (rnd() < .14) { // the same number written two ways
    const short = digs(Math.min(...lens));
    const pad = short + '0'.repeat(Math.abs(lens[0] - lens[1]));
    [sa, sb] = lens[0] < lens[1] ? [short, pad] : [pad, short];
  } else {
    const same = rnd() < .6 ? R(0, 9) : null;
    do {
      sa = digs(lens[0], same); sb = digs(lens[1], same);
    } while (+sa.padEnd(3, '0') == +sb.padEnd(3, '0'));
  }
  const L = Math.max(sa.length, sb.length), pa = sa.padEnd(L, '0'), pb = sb.padEnd(L, '0'), A = +pa, B = +pb;
  const ans = A < B ? '<' : A == B ? '=' : '>', x = show(sa), y = show(sb);
  return {kind: 'choice', cls: 'syms', html: `<div class="sub">Which is true?</div><div class="eq">${x} ${SLOT} ${y}</div>`,
    say: `Is ${dsSayDec(x)} less than, equal to, or greater than ${dsSayDec(y)}?`, ans, choices: FC_SYM.map(c => ({...c})),
    hint: dsHint([
      ['', 'Same length:', `Line up the decimal points. Add zeros so both have ${L} digit${L > 1 ? 's' : ''} after the point: ${show(pa)} and ${show(pb)}.`],
      ['', 'Compare:', `Read the digits after the point as whole numbers: ${A} and ${B}. Which number is more?`],
    ]), label: `dec2 ${x} ? ${y}`};
}

/* ---- ang 1: kinds of angles ---- */
const dsAngKinds = {acute: [15, 80], right: [90, 90], obtuse: [100, 165], straight: [180, 180]};
const dsAngDeg = kind => {const [lo, hi] = dsAngKinds[kind]; return lo == hi ? lo : 5 * R(lo / 5, hi / 5)};
const dsAngCls = deg => (deg < 90 ? 'acute' : deg == 90 ? 'right' : deg < 180 ? 'obtuse' : 'straight');
function dsAng1() {
  const hint = {k: 'html', html: `${VIZ.angle(90, {rot: 20})}<div>A right angle is a square corner, 90°. Compare the angle with it. `
    + 'Acute: smaller than a right angle. Obtuse: bigger than a right angle. Straight: a flat line.</div>',
    w: 'A right angle is a square corner. Acute is smaller than that. Obtuse is bigger than that. A straight angle is a flat line.'};
  const names = {acute: 'Acute', right: 'Right', obtuse: 'Obtuse', straight: 'Straight'};
  if (rnd() < .3) { // pick the picture
    const kind = pick(['acute', 'right', 'obtuse']), ks = shuffle(['acute', 'right', 'obtuse']);
    const ch = ks.map(k => ({v: k, l: VIZ.angle(dsAngDeg(k), {rot: 5 * R(0, 71)}), h: true}));
    return {kind: 'choice', cls: 'pics', html: `<div class="sub">Which angle is ${kind == 'right' ? 'a' : 'an'} ${kind} angle?</div>`,
      say: `Which angle is ${kind == 'right' ? 'a' : 'an'} ${kind} angle?`, ans: kind, choices: ch, hint, label: `ang1 pick ${kind}`};
  }
  const kind = pick(['acute', 'acute', 'right', 'obtuse', 'obtuse', 'straight']), deg = dsAngDeg(kind), rot = 5 * R(0, 71);
  return {kind: 'choice', html: `${VIZ.angle(deg, {rot})}<div class="sub">What kind of angle is this?</div>`, say: 'What kind of angle is this?',
    ans: kind, choices: shuffle(Object.keys(names).map(k => ({v: k, l: names[k]}))), hint, label: `ang1 ${kind} ${deg}`};
}

/* ---- ang 2: read a protractor, find a missing angle ---- */
function dsAng2() {
  const f = rnd();
  if (f < .45) { // protractor, marks every 10, the angle is a multiple of 5
    const deg = 5 * R(2, 34);
    return {kind: 'num', html: `${VIZ.angle(deg, {proto: true})}<div class="sub">How many degrees is the angle?</div><div class="eq">${SLOT}°</div>`,
      say: 'The angle sits on a protractor. How many degrees is the angle?', ans: String(deg),
      hint: {k: 'text', s: 'Put the 0 of the scale on one side of the angle. Follow the scale up to the number where the other side crosses it. The long marks are every 30, the short marks every 10, and halfway between two short marks is 5 more.'},
      label: `ang2 protractor ${deg}`};
  }
  const any = rnd() < .5, pickA = (lo, hi) => (any ? R(lo, hi) : 5 * R(Math.ceil(lo / 5), Math.floor(hi / 5)));
  let whole, a, pic, t, kindName;
  if (f < .6) {
    whole = 90; a = pickA(10, 80); pic = VIZ.angle(90, {label: '90°', rot: 20}); kindName = 'right';
    t = `Angle A is ${a}°. Angles A and B together make a right angle (90°). How big is angle B?`;
  } else if (f < .75) {
    whole = 180; a = pickA(15, 165); pic = VIZ.angle(180, {label: '180°'}); kindName = 'straight';
    t = `Angle A is ${a}°. Angles A and B together make a straight line (180°). How big is angle B?`;
  } else {
    whole = 5 * R(10, 34); a = pickA(10, whole - 10); pic = VIZ.angle(whole, {label: whole + '°', rot: 10}); kindName = 'whole';
    t = `An angle of ${whole}° is made of two smaller angles. One of them is ${a}°. How big is the other one?`;
  }
  const how = kindName == 'whole' ? `The two parts add up to the whole angle: ${a} + ? = ${whole}.` : `The two angles add up to ${whole}°. Subtract: ${whole} − ${a} = ?`;
  return {kind: 'num', html: `${pic}<p class="story">${t}</p><div class="eq">${SLOT}°</div>`, say: t, ans: String(whole - a),
    hint: dsHint([['', 'Two parts:', kindName == 'right' ? 'A right angle is 90°.' : kindName == 'straight' ? 'A straight angle is 180°.' : `The whole angle is ${whole}°.`],
      ['', 'Find the other part:', how]]),
    label: `ang2 ${kindName} ${whole} - ${a}`};
}

/* ---- geo 3: missing side of a rectangle, area of an L-shape ---- */
// an L-shape: a W by H rectangle with a nw by nh corner cut from the top right. Labels: W (bottom), H (left), nh and nw (the notch)
function dsLShape(W, H, nw, nh, unit) {
  const k = Math.min(170 / W, 120 / H), X = 50, Y = 26, w = W * k, h = H * k, cx = (W - nw) * k, cy = nh * k, u = ' ' + unit;
  const body = `<path class="vpo" d="M${X} ${Y}h${f1(cx)}v${f1(cy)}h${f1(w - cx)}v${f1(h - cy)}h${f1(-w)}z"/>`
    + `<text x="${f1(X + w / 2)}" y="${f1(Y + h + 20)}">${W}${u}</text><text class="vta" x="${X - 8}" y="${f1(Y + h / 2 + 5)}">${H}${u}</text>`
    + `<text class="vts" x="${f1(X + cx + 8)}" y="${f1(Y + cy / 2 + 5)}">${nh}${u}</text><text x="${f1(X + cx + (w - cx) / 2)}" y="${f1(Y + cy - 8)}">${nw}${u}</text>`;
  return `<svg class="viz viz-ds" viewBox="0 0 ${f1(w + 2 * X + 20)} ${f1(h + Y + 34)}" style="--vw:${f1(w + 2 * X + 20)}" role="img" aria-label="L-shape with side lengths">${body}</svg>`;
}
const f1 = v => Math.round(v * 10) / 10;
function dsGeo3() {
  const f = rnd(), unit = pick(['cm', 'm', 'in', 'ft']), U = FF_UNIT[unit];
  if (f < .35) { // area and one side
    const l = R(2, 12), w = R(2, 12), A = l * w;
    return {kind: 'num', html: `${VIZ.rectSides(l, w, {w: l, h: '?'}, {unit})}<div class="sub">The area is ${A} ${FF_SQ[unit]}. How long is the missing side?</div><div class="eq">${SLOT} ${unit}</div>`,
      say: `A rectangle has an area of ${A} ${FF_SQ[unit]}. One side is ${l} ${U}. How long is the other side?`, ans: String(w),
      hint: dsHint([['', 'Area:', `Area = length × width. So ${l} × ? = ${A}.`], ['', 'Think:', `${l} times what number makes ${A}? Use division: ${A} ÷ ${l} = ?`]]),
      label: `geo3 area ${A} side ${l} ${unit}`};
  }
  if (f < .7) { // perimeter and one side
    const l = R(2, 14), w = R(1, 14), P = 2 * (l + w);
    return {kind: 'num', html: `${VIZ.rectSides(l, w, {w: l, h: '?'}, {unit})}<div class="sub">The perimeter is ${P} ${unit}. How long is the missing side?</div><div class="eq">${SLOT} ${unit}</div>`,
      say: `A rectangle has a perimeter of ${P} ${U}. One side is ${l} ${U}. How long is the other side?`, ans: String(w),
      hint: dsHint([['', 'Perimeter:', `A rectangle has 2 lengths and 2 widths. The two lengths are ${l} + ${l} = ${2 * l}.`],
        ['', 'Two widths:', `${P} − ${2 * l} = ${P - 2 * l}. That is both widths together.`], ['', 'One width:', `${P - 2 * l} ÷ 2 = ?`]]),
      label: `geo3 perimeter ${P} side ${l} ${unit}`};
  }
  const W = R(5, 12), H = R(5, 10), nw = R(2, W - 2), nh = R(2, H - 2), ans = W * H - nw * nh;
  return {kind: 'num', html: `${dsLShape(W, H, nw, nh, unit)}<div class="sub">Find the area of the L-shape.</div><div class="eq">${SLOT} ${FF_SQ[unit]}</div>`,
    say: `An L-shape is a big rectangle ${W} by ${H} ${U} with a rectangle ${nw} by ${nh} ${U} cut out of one corner. What is its area?`, ans: String(ans),
    hint: dsHint([['', 'Big rectangle:', `Pretend the corner is not cut out. ${W} × ${H} = ${W * H}.`],
      ['', 'The cut corner:', `The piece that was cut out is ${nw} by ${nh}. ${nw} × ${nh} = ${nw * nh}.`], ['', 'Take it away:', `${W * H} − ${nw * nh} = ?`]]),
    label: `geo3 L ${W}x${H} minus ${nw}x${nh} ${unit}`};
}

/* ---- shape 6: symmetry, parallel and perpendicular lines, triangles ---- */
const dsSvg = (w, h, body, label) => `<svg class="viz viz-ds" viewBox="0 0 ${w} ${h}" style="--vw:${w}" role="img" aria-label="${label}">${body}</svg>`;
// shapes with a known number of lines of symmetry (the shapes of VIZ.shape are drawn as they are there)
const dsSymShapes = [['square', 4], ['rectangle', 2], ['rhombus', 2], ['triangle', 1], ['trapezoid', 1], ['pentagon', 5], ['hexagon', 6], ['oval', 2]];
function dsSymCount() {
  if (rnd() < .22) { // a shape with none: a parallelogram or a scalene right triangle
    const para = coin();
    const d = para ? 'M20 70L50 30h60L80 70z' : 'M25 70V25L95 70z';
    return {kind: 'num', html: `${dsSvg(130, 96, `<path class="vpo" d="${d}"/>`, para ? 'parallelogram' : 'right triangle')}<div class="sub">How many lines of symmetry does it have?</div>${SLOT}`,
      say: 'How many lines of symmetry does this shape have?', ans: '0',
      hint: {k: 'text', s: 'A line of symmetry folds the shape so that both halves match exactly. Try to find a fold where the halves match. Some shapes have none.'},
      label: `shape6 sym count ${para ? 'parallelogram' : 'scalene'}`};
  }
  const [name, n] = pick(dsSymShapes), nm = name == 'oval' ? 'oval' : name;
  return {kind: 'num', html: `${VIZ.shape(name)}<div class="sub">How many lines of symmetry does it have?</div>${SLOT}`,
    say: `How many lines of symmetry does this ${nm} have?`, ans: String(n),
    hint: {k: 'text', s: 'A line of symmetry folds the shape so that both halves match exactly. Imagine folding it up and down, side to side, and corner to corner. Count the folds that work.'},
    label: `shape6 sym count ${name}`};
}
// a shape with a dotted line: is it a line of symmetry?
function dsSymLine() {
  const kind = pick(['rect', 'rect', 'square', 'tri']), line = kind == 'tri' ? pick(['v', 'd', 'off']) : pick(['v', 'h', 'd', 'off']);
  let shape, dash, yes, nm;
  if (kind == 'tri') {
    shape = 'M60 14L108 86H12z';
    dash = line == 'v' ? 'M60 6V92' : line == 'd' ? 'M12 86L84 50' : 'M36 50V92';
    yes = line == 'v'; nm = 'triangle';
  } else if (kind == 'square') {
    shape = 'M20 12h80v80h-80z';
    dash = line == 'v' ? 'M60 4V100' : line == 'h' ? 'M12 52H108' : line == 'd' ? 'M12 4L108 100' : 'M40 4V100';
    yes = line != 'off'; nm = 'square';
  } else {
    shape = 'M10 22h100v60h-100z';
    dash = line == 'v' ? 'M60 14V90' : line == 'h' ? 'M2 52H118' : line == 'd' ? 'M2 14L118 90' : 'M42 14V90';
    yes = line == 'v' || line == 'h'; nm = 'rectangle';
  }
  return {kind: 'choice', html: `${dsSvg(120, 104, `<path class="vpo" d="${shape}"/><path class="vgd" d="${dash}"/>`, nm + ' with a dotted line')}<div class="sub">Is the dotted line a line of symmetry?</div>`,
    say: 'Is the dotted line a line of symmetry?', ans: yes ? 'yes' : 'no', choices: shuffle([{v: 'yes', l: 'Yes'}, {v: 'no', l: 'No'}]),
    hint: {k: 'text', s: 'Imagine folding the shape along the dotted line. If the two halves fit exactly on top of each other, it is a line of symmetry.'},
    label: `shape6 sym line ${kind} ${line}`};
}
// two lines: parallel, perpendicular, or neither
function dsLines() {
  const ans = pick(['parallel', 'perpendicular', 'neither']), rot = R(0, 179), rad = a => a * Math.PI / 180;
  const seg = (cx, cy, a, len) => `M${f1(cx - len * Math.cos(rad(a)))} ${f1(cy - len * Math.sin(rad(a)))}L${f1(cx + len * Math.cos(rad(a)))} ${f1(cy + len * Math.sin(rad(a)))}`;
  let a2, c2 = [100, 75], c1 = [100, 75];
  if (ans == 'parallel') {
    a2 = rot;
    c1 = [100 - 22 * Math.sin(rad(rot)), 75 + 22 * Math.cos(rad(rot))];
    c2 = [100 + 22 * Math.sin(rad(rot)), 75 - 22 * Math.cos(rad(rot))];
  } else if (ans == 'perpendicular') a2 = rot + 90;
  else a2 = rot + pick([35, 45, 55, 125, 135, 145]);
  const body = `<path class="va" d="${seg(c1[0], c1[1], rot, 62)}"/><path class="va" d="${seg(c2[0], c2[1], a2, 62)}"/>`;
  return {kind: 'choice', cls: 'dsw', html: `${dsSvg(200, 150, body, 'two lines')}<div class="sub">How are the two lines?</div>`, say: 'Look at the two lines. Are they parallel, perpendicular, or neither?',
    ans, choices: ['parallel', 'perpendicular', 'neither'].map(v => ({v, l: v[0].toUpperCase() + v.slice(1)})),
    hint: {k: 'text', s: 'Parallel lines stay the same distance apart and never cross. Perpendicular lines cross to make square corners (right angles). If they cross but not in a square corner, they are neither.'},
    label: `shape6 lines ${ans} ${rot}`};
}
function dsTriangle() {
  if (coin()) { // by angles
    const cls = pick(['right', 'acute', 'obtuse']);
    let a, b, c;
    for (;;) {
      if (cls == 'right') {a = 90; b = 5 * R(3, 16)}
      else if (cls == 'obtuse') {a = 5 * R(19, 31); b = 5 * R(2, Math.floor((180 - a - 10) / 5))}
      else {a = 5 * R(8, 17); b = 5 * R(8, 17)}
      c = 180 - a - b;
      if (c < 10 || (cls == 'acute' && (c >= 90 || c < 35)) || (cls == 'right' && c >= 90)) continue;
      break;
    }
    const L = shuffle([a, b, c]);
    return {kind: 'choice', cls: 'dsw', html: `<div class="sub">A triangle has angles</div><div class="eq">${L.join('°, ')}°</div><div class="sub">What kind of triangle is it?</div>`,
      say: `A triangle has angles of ${L.join(', ')} degrees. Is it a right, acute, or obtuse triangle?`, ans: cls,
      choices: ['acute', 'right', 'obtuse'].map(v => ({v, l: v[0].toUpperCase() + v.slice(1)})),
      hint: {k: 'text', s: 'Look at the biggest angle. A right triangle has one right angle, 90°. An obtuse triangle has one angle bigger than 90°. An acute triangle has three angles smaller than 90°.'},
      label: `shape6 tri angles ${L.join(' ')}`};
  }
  const kind = pick(['equilateral', 'isosceles', 'scalene']);
  let s;
  if (kind == 'equilateral') {const x = R(2, 15); s = [x, x, x]}
  else if (kind == 'isosceles') {
    let x, y;
    do {x = R(2, 15); y = R(1, 15)} while (x == y || y >= 2 * x);
    s = [x, x, y];
  } else {
    do s = [R(3, 15), R(3, 15), R(3, 15)]; while (new Set(s).size < 3 || s[0] + s[1] <= s[2] || s[0] + s[2] <= s[1] || s[1] + s[2] <= s[0]);
  }
  s = shuffle(s);
  while (s[2] == 1) s.unshift(s.pop()); // R-01m: the unit follows the last side, so never "1 centimeters"
  return {kind: 'choice', cls: 'dsw', html: `<div class="sub">A triangle has sides</div><div class="eq">${s.join(', ')} cm</div><div class="sub">What kind of triangle is it?</div>`,
    say: `A triangle has sides of ${s.join(', ')} centimeters. Is it equilateral, isosceles, or scalene?`, ans: kind,
    choices: ['equilateral', 'isosceles', 'scalene'].map(v => ({v, l: v[0].toUpperCase() + v.slice(1)})),
    hint: {k: 'text', s: 'Compare the side lengths. Equilateral: all 3 sides are equal. Isosceles: exactly 2 sides are equal. Scalene: no sides are equal.'},
    label: `shape6 tri sides ${s.join(' ')}`};
}
function dsShape6() {
  const f = rnd();
  return f < .3 ? dsSymCount() : f < .45 ? dsSymLine() : f < .7 ? dsLines() : dsTriangle();
}

/* ---- meas 5: one-step conversions, larger unit to smaller ---- */
const DS_CONV = [['ft', 'in', 12, 2, 12, 'feet', 'inches'], ['yd', 'ft', 3, 2, 20, 'yards', 'feet'], ['m', 'cm', 100, 2, 30, 'meters', 'centimeters'],
  ['km', 'm', 1000, 2, 9, 'kilometers', 'meters'], ['kg', 'g', 1000, 2, 9, 'kilograms', 'grams'], ['L', 'mL', 1000, 2, 9, 'liters', 'milliliters'],
  ['hr', 'min', 60, 2, 9, 'hours', 'minutes'], ['min', 'sec', 60, 2, 20, 'minutes', 'seconds'], ['lb', 'oz', 16, 2, 16, 'pounds', 'ounces'],
  ['gal', 'qt', 4, 2, 20, 'gallons', 'quarts']];
function dsMeas5() {
  const [big, small, k, lo, hi, bn, sn] = pick(DS_CONV), n = R(lo, hi);
  return {kind: 'num', html: `<div class="sub">Change to the smaller unit.</div><div class="eq">${n} ${big} = ${SLOT} ${small}</div>`,
    say: `${n} ${bn} is how many ${sn}?`, ans: String(n * k),
    hint: dsHint([['', 'Conversion table:', `1 ${big} = ${k} ${small}. The other units: ${DS_CONV.filter(c => c[0] != big).map(c => `1 ${c[0]} = ${c[2]} ${c[1]}`).join(', ')}.`],
      ['', 'Many of them:', `${n} ${big} is ${n} groups of ${k} ${small}. Multiply: ${n} × ${k} = ?`]]),
    label: `meas5 ${n} ${big} to ${small}`};
}

/* ---- pat 4: in and out tables with one rule ---- */
const dsRule = (op, n) => `${op}${n}`;
const dsApply = (op, n, x) => (op == '+' ? x + n : op == '−' ? x - n : op == '×' ? x * n : x / n);
function dsPat4() {
  const op = pick(['+', '−', '×', '÷']);
  let n, ins;
  if (op == '+') {n = R(2, 20); ins = shuffle(Array.from({length: 30}, (_, i) => i + 1)).slice(0, 4)}
  else if (op == '−') {n = R(2, 15); ins = shuffle(Array.from({length: 40}, (_, i) => i + n + 1)).slice(0, 4)}
  else if (op == '×') {n = R(2, 9); ins = shuffle(Array.from({length: 12}, (_, i) => i + 1)).slice(0, 4)}
  else {n = R(2, 9); ins = shuffle(Array.from({length: 12}, (_, i) => (i + 1) * n)).slice(0, 4)}
  ins.sort((x, y) => x - y);
  const outs = ins.map(x => dsApply(op, n, x)), rule = dsRule(op, n);
  const head = ['In', 'Out'];
  if (coin()) { // fill the last box
    return {kind: 'num', html: `${VIZ.tableInOut(ins.slice(0, 3).map((x, i) => [x, outs[i]]).concat([[ins[3], '?']]), {head})}<div class="sub">Find the rule. What number goes in the last box?</div><div class="eq">${SLOT}</div>`,
      say: `Look at the in and out table. Find the rule. What number goes in the last box, for the in number ${ins[3]}?`, ans: String(outs[3]),
      hint: dsHint([['', 'Look at row 1:', `In ${ins[0]}, out ${outs[0]}. What happened to ${ins[0]} to make ${outs[0]}?`],
        ['', 'Check row 2:', `Does the same rule turn ${ins[1]} into ${outs[1]}?`], ['', 'Use the rule:', `Do the rule to ${ins[3]}. What is the out number?`]]),
      label: `pat4 fill ${rule} ${ins.join(',')}`};
  }
  // pick the rule; every wrong rule fails on at least one row
  const pool = [];
  for (const o2 of ['+', '−', '×', '÷']) for (let m = 2; m <= 20; m++) pool.push([o2, m]);
  const fits = ([o2, m]) => ins.every((x, i) => Number.isInteger(dsApply(o2, m, x)) && dsApply(o2, m, x) == outs[i]);
  const bad = shuffle(pool.filter(([o2, m]) => !fits([o2, m]) && (o2 != op || Math.abs(m - n) <= 3) && (o2 == op || m <= 12))).slice(0, 3);
  const ch = shuffle([[op, n], ...bad]).map(([o2, m]) => ({v: dsRule(o2, m), l: dsRule(o2, m)}));
  return {kind: 'choice', html: `${VIZ.tableInOut(ins.map((x, i) => [x, outs[i]]), {head})}<div class="sub">What is the rule?</div>`,
    say: 'Look at the in and out table. What is the rule that turns each in number into its out number?', ans: rule, choices: ch,
    hint: dsHint([['', 'Look at row 1:', `In ${ins[0]}, out ${outs[0]}. Is the out number bigger or smaller? Add, subtract, multiply, or divide?`],
      ['', 'Test your rule:', `Try the rule on row 2: ${ins[1]} and ${outs[1]}. Does it work on every row?`]]),
    label: `pat4 rule ${rule} ${ins.join(',')}`};
}

/* ---- story 7: division stories where the remainder must be read ---- */
const DS_UP = [(T, s) => `${T} kids go on a trip. Each car holds ${s} kids. How many cars do they need?`,
  (T, s) => `A teacher has ${T} markers. Each box holds ${s} markers. How many boxes are needed to hold all of the markers?`,
  (T, s) => `${T} people want to ride in boats. Each boat seats ${s} people. How many boats are needed?`,
  (T, s) => `Mia has ${T} photos. Each album page holds ${s} photos. How many pages does Mia need for all of her photos?`];
const DS_DOWN = [(T, s) => `A baker has ${T} muffins. A full box holds ${s} muffins. How many full boxes can the baker make?`,
  (T, s) => `Leo has ${T} stickers. He puts ${s} stickers on each card. How many cards can he fill?`,
  (T, s) => `A shop has ${T} eggs. A carton holds ${s} eggs. How many full cartons can the shop fill?`];
const DS_LEFT = [(T, s) => `${T} cookies are shared equally among ${s} friends. How many cookies are left over?`,
  (T, s) => `Zoe has ${T} beads. She makes bracelets with ${s} beads each. How many beads are left over?`,
  (T, s) => `${T} students line up in rows of ${s}. After all the full rows, how many students are left over?`];
function dsStory7() {
  const f = rnd(), multi = f < .35, type = pick(['up', 'down', 'left']);
  let T, s, a = 0, b = 0, text;
  if (multi) {
    const th = pick(['pencils', 'crayons', 'stickers', 'marbles', 'buttons']), who = pick([S.name || 'Sam', petN(), 'Ava', 'Leo', 'Mia']);
    do {a = R(3, 9); b = R(3, 9); s = R(3, 9); T = a * b} while (T % s == 0 || T < s);
    const ask = type == 'up' ? 'How many bags are needed for all of them?' : type == 'down' ? 'How many full bags can be made?' : 'How many are left over?';
    text = `${who} has ${a} boxes with ${b} ${th} in each box. ${who} puts them in bags of ${s}. ${ask}`;
  } else {
    do {s = R(3, 9); T = R(s + 2, 9 * s + 8)} while (T % s == 0 || T > 99);
    text = (type == 'up' ? DS_UP : type == 'down' ? DS_DOWN : DS_LEFT)[R(0, (type == 'down' || type == 'left' ? 3 : 4) - 1)](T, s);
  }
  const q = Math.floor(T / s), r = T % s, ans = type == 'up' ? q + 1 : type == 'down' ? q : r;
  const lead = multi ? [`Multiply first: ${a} × ${b} = ${T}.`] : [];
  const div = `Divide: ${T} ÷ ${s}. How many full groups of ${s} fit in ${T}? Is anything left over?`;
  const rest = type == 'up' ? ['There is something left over, and everyone has to fit somewhere. The leftovers need one more group.', 'Take the full groups and add 1 more: full groups + 1 = ?']
    : type == 'down' ? ['Leftovers do not fill a whole group, so they do not count.', `Count only the full groups: ${T} ÷ ${s}, without the leftovers. Full groups = ?`]
    : [`Use the biggest multiple of ${s} that fits in ${T}.`, `Subtract it from ${T}: ${T} − (that multiple) = ?`];
  return {kind: 'num', html: `<p class="story">${words(text)}</p><div>${SLOT}</div>`, say: text, auto: true, ans: String(ans),
    hint: stepsStory([...lead, div, ...rest]), label: `story7 ${multi ? a + 'x' + b + '=' : ''}${T} / ${s} ${type}`};
}

// ---- P2-11 Volcano Lab ----
/* CURRICULUM M-5a: 5th grade decimals and whole-number fluency (world m_volcano). All names start with vl.
   pv 5      decimals to thousandths: value of a digit, expanded form, words -> decimal
   pv 6      x and / by 10, 100, 1,000 (whole and decimal); powers of ten; 4.2 x 10^2
   mbig 5    3-digit x 2-digit, standard algorithm (stepsMul 'std')
   dbig 4    3- and 4-digit / 2-digit divisors 11-50, remainders in half the items (stepsDiv)
   dec 3     add and subtract decimals to hundredths, ragged lengths, vertical (stepsAdd, stepsSub)
   dec 4     decimal x whole, then decimal x decimal (stepsDecMul)
   dec 5     decimal / whole, whole / whole with a decimal quotient, then / tenths (stepsDecDiv)
   round 4   round decimals to the nearest whole, tenth or hundredth
   ooo 1     order of operations with parentheses; write the expression
   Decimal answers are written without trailing zeros ('0.2', '6') and every decimal question has eq:'value', so 0.20 and 6.0 are also right.
   dec levels 1-2 belong to P2-10 (Decimal Desert); vlDec falls back to level 3 for them so a call never fails. */

// whole number n with p places after the point, trailing zeros dropped: (45, 2) -> '0.45', (120, 1) -> '12', (5, 3) -> '0.005'
function vlDec(n, p) {
  const s = String(n).padStart(p + 1, '0'), i = s.slice(0, s.length - p), f = p ? s.slice(s.length - p).replace(/0+$/, '') : '';
  return f ? i + '.' + f : i;
}
// the same with the zeros kept, for numbers that are shown as they are written
const vlShow = (n, p) => stDecS(n, p);
// a decimal answer's digits, the pad's max (only when the default 4 is too few)
function vlMaxOf(q) {
  const m = String(q.ans).replace(/\D/g, '').length;
  if (m > 4) q.max = m;
  return q;
}
// the exact value of a / b (decimal strings) as a decimal string, or null if it does not end within 3 places; independent of the step builder
function vlQuot(a, b) {
  const pa = ST.parse(a), pb = ST.parse(b), fa = pa.f.length, fb = pb.f.length;
  const num = ST.scaled(pa, fa) * 10 ** fb, den = ST.scaled(pb, fb) * 10 ** fa;
  for (let t = 0; t <= 3; t++) if ((num * 10 ** t) % den == 0) return vlDec(num * 10 ** t / den, t);
  return null;
}
const vlPlaceName = {'-3': 'thousandths', '-2': 'hundredths', '-1': 'tenths'};
const vlHintT = s => ({k: 'text', s});

// pv 5: decimals to thousandths (value of a digit / expanded form / words to decimal)
function vlPv5() {
  const form = pick(['value', 'exp', 'words']);
  if (form == 'value') {
    // distinct digits, so the underlined one is the only one of its kind; the digit is never 0
    const wl = R(1, 2), ds = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, wl + 3);
    if (ds[0] == 0 && wl > 1) ds.push(ds.shift());
    const whole = ds.slice(0, wl).join(''), frac = ds.slice(wl).join('');
    const spots = ds.map((d, k) => k).filter(k => ds[k] != 0), k = pick(spots), dig = ds[k];
    const e = k < wl ? wl - 1 - k : -(k - wl + 1);
    const txt = whole.split('').map((c, i) => (i == k ? `<b><u>${c}</u></b>` : c)).join('') + '.' +
      frac.split('').map((c, i) => (i + wl == k ? `<b><u>${c}</u></b>` : c)).join('');
    const val = x => vlDec(dig * 10 ** (x + 3), 3);
    const places = [];
    for (let x = -3; x < wl; x++) if (x != e) places.push(x);
    const bad = shuffle(places).slice(0, 3), n = whole + '.' + frac, ans = val(e);
    const nm = e < 0 ? vlPlaceName[e] : ST.NAME[e];
    return {kind: 'choice', cls: 'wide', html: `<div class="eq">${txt}</div><div class="sub">What is the value of the ${dig} in ${n}?</div>`,
      say: `What is the value of the ${dig} in ${n}?`, ans, after: `The ${dig} is in the ${nm} place, so it is worth ${ans}`,
      choices: shuffle([ans, ...bad.map(val)]).map(v => ({v, l: v})), label: `value of ${dig} in ${n}`,
      hint: vlHintT('Find the digit. Right of the point the places are tenths, hundredths, thousandths. Left of it: ones, tens, hundreds. Count the place, then ask what the digit is worth there.')};
  }
  if (form == 'exp') {
    let n, parts;
    for (;;) {
      const wl = R(1, 2), fl = R(1, 3), dg = [];
      for (let i = 0; i < wl + fl; i++) dg.push(rnd() < .25 && i ? 0 : R(1, 9));
      if (!dg[dg.length - 1]) continue;
      parts = dg.map((d, i) => d ? (i < wl ? String(d * 10 ** (wl - 1 - i)) : vlDec(d, i - wl + 1)) : null).filter(x => x != null);
      if (parts.length < 3) continue;
      n = dg.slice(0, wl).join('') + '.' + dg.slice(wl).join('');
      break;
    }
    return vlMaxOf({kind: 'num', pad: 'dec', eq: 'value', html: `<div class="sub">Write the number.</div><div class="eq" style="font-size:.62em;line-height:1.5">${parts.join(' + ')}</div><div class="eq">= ${SLOT}</div>`,
      say: `${parts.join(' plus ')} equals what?`, ans: n, label: `${parts.join(' + ')} = ?`,
      hint: vlHintT('Each part names one place. Write each digit in its own place, with the point between the ones and the tenths. Put a 0 in any place with no part.')});
  }
  // words: "twelve and four hundred seven thousandths"
  const fl = R(1, 3);
  let fv;
  do fv = R(1, 10 ** fl - 1); while (fv % 10 == 0);
  const whole = rnd() < .3 ? 0 : R(1, rnd() < .5 ? 9 : 99), unit = ['tenth', 'hundredth', 'thousandth'][fl - 1];
  const fw = fyWords3(fv) + ' ' + unit + (fv == 1 ? '' : 's'), w = whole ? `${fyWords(whole)} and ${fw}` : fw, n = `${whole}.${String(fv).padStart(fl, '0')}`;
  return vlMaxOf({kind: 'num', pad: 'dec', eq: 'value', auto: true, html: `<div class="sub">Write this number with digits.</div><div class="sub" style="font-weight:700;color:var(--ink,inherit)">${w}</div><div class="eq">${SLOT}</div>`,
    say: w, ans: n, label: `words to decimal ${n}`,
    hint: vlHintT('The word "and" is where the point goes. The last word names the last place: tenths, hundredths or thousandths. Fill the places from the left, with 0s if a place is empty.')});
}

// pv 6: x and / by 10, 100, 1,000; powers of ten; "4.2 x 10^2"
function vlPv6() {
  const form = pick(['md', 'md', 'md', 'pow', 'sci']);
  const shift = (m, f, j, mul) => mul ? vlDec(m * 10 ** j, f) : vlDec(m, f + j);
  if (form == 'pow') {
    const n = R(2, 5);
    return vlMaxOf({kind: 'num', html: `<div class="eq">10<sup>${n}</sup> = ${SLOT}</div>`, say: `10 to the power ${n} equals what?`, ans: '1' + '0'.repeat(n),
      label: `10^${n} = ?`, hint: stepsStory([`The small raised number says how many 10s to multiply together. Here it is ${n}, so write 10 ${n} times with × between them.`,
        `10 has 1 zero. Each 10 you multiply in adds one more zero after the 1.`,
        `Write a 1, then the zeros for ${n} tens: 10 to the power ${n} = ?`])});
  }
  const j = R(1, 3), mul = form == 'sci' ? rnd() < .75 : coin();
  const f = R(0, form == 'sci' ? 2 : mul ? 3 : Math.min(3, 4 - j));
  let m;
  do m = R(mul ? 2 : 3, mul ? 999 : 9999); while (f && m % 10 == 0);
  if (!f && form == 'sci') m = R(2, 99);
  const base = vlShow(m, f), ans = shift(m, f, j, mul);
  const dir = mul ? 'right' : 'left', op = mul ? '×' : '÷', k = 10 ** j;
  if (form == 'sci') {
    return vlMaxOf({kind: 'num', pad: 'dec', eq: 'value', html: `<div class="eq">${base} ${op} 10<sup>${j}</sup> = ${SLOT}</div>`, say: `${base} ${mul ? 'times' : 'divided by'} 10 to the power ${j} equals what?`,
      ans, label: `${base} ${op} 10^${j} = ?`,
      hint: stepsStory([`The small raised ${j} says to multiply ${j} ${j == 1 ? 'ten' : 'tens'} together. Write it out as a whole number first.`,
        `That makes ${fyComma(k)}, with ${j} ${j == 1 ? 'zero' : 'zeros'}. ${mul ? 'Multiplying by' : 'Dividing by'} it moves the point ${j} ${j == 1 ? 'place' : 'places'} to the ${dir}.`,
        `Now do ${base} ${op} ${fyComma(k)} = ?`])});
  }
  return vlMaxOf({kind: 'num', pad: 'dec', eq: 'value', html: `<div class="eq">${base} ${op} ${fyComma(k)} = ${SLOT}</div>`, say: `${base} ${mul ? 'times' : 'divided by'} ${k} equals what?`,
    ans, label: `${base} ${op} ${k} = ?`,
    hint: stepsStory([`${fyComma(k)} has ${j} ${j == 1 ? 'zero' : 'zeros'}. So every digit moves ${j} ${j == 1 ? 'place' : 'places'}.`,
      mul ? 'Times makes the number bigger, so the digits move left and the point moves right. Fill empty places with 0s.'
        : 'Dividing makes the number smaller, so the digits move right and the point moves left. Put 0s in front if you need them.',
      `Now move it: ${base} ${op} ${fyComma(k)} = ?`])});
}

// mbig 5: 3-digit x 2-digit, the standard algorithm (stepsMul 'std')
function vlMbig5() {
  let a, b;
  do {a = R(101, 999); b = R(12, 99)} while (a % 10 == 0 || b % 10 == 0);
  return fyVert([a, b], '×', a * b, stepsMul(a, b, 'std'), 6);
}

// dbig 4: 3- and 4-digit / 2-digit divisor 11-50; remainders in half the items
function vlDbig4() {
  const d = R(11, 50), hi = rnd() < .6 ? 999 : 9999, lo = hi == 999 ? 100 : 1000, rem = coin() ? 0 : R(1, d - 1);
  const qt = R(Math.max(10, Math.ceil((lo - rem) / d)), Math.floor((hi - rem) / d)), n = d * qt + rem;
  return Object.assign({kind: 'num', html: rem ? ST.ldiv(n, d, SLOT_R) : ST.ldiv(n, d),
    say: rem ? `${n} divided by ${d}. How many whole groups, and what is left over?` : `${n} divided by ${d} equals what?`,
    ans: rem ? `${qt}R${rem}` : String(qt), hint: stepsDiv(n, d), label: `${n} ÷ ${d} = ?`}, rem ? {sep: 'R'} : {});
}

// a decimal string with p places (last digit not 0) from a whole number of at most that many digits
function vlRand(p, lo, hi) {
  let m;
  do m = R(lo, hi); while (p && m % 10 == 0);
  return vlShow(m, p);
}

// dec 3: add and subtract decimals to hundredths; ragged lengths; vertical
function vlDec3() {
  let pa, pb;
  do {pa = R(0, 2); pb = R(0, 2)} while (!pa && !pb || (pa == pb && rnd() < .7));
  const wa = pa ? R(0, 99) : R(2, 99), wb = pb ? R(0, 99) : R(2, 99);
  let sa = vlRand(pa, 10 ** pa * wa + 1, 10 ** pa * wa + 10 ** pa - 1), sb = vlRand(pb, 10 ** pb * wb + 1, 10 ** pb * wb + 10 ** pb - 1);
  if (pa == 0) sa = String(wa);
  if (pb == 0) sb = String(wb);
  const d = Math.max(pa, pb), A = ST.scaled(ST.parse(sa), d), B = ST.scaled(ST.parse(sb), d);
  if (A == B) return vlDec3();
  if (coin()) {
    const q = {kind: 'num', pad: 'dec', eq: 'value', html: ST.vert([sa, sb], '+'), say: `${sa} plus ${sb} equals what?`, ans: vlDec(A + B, d), hint: stepsAdd(sa, sb), label: `${sa} + ${sb} = ?`};
    return vlMaxOf(q);
  }
  const [x, y] = A > B ? [sa, sb] : [sb, sa], q = {kind: 'num', pad: 'dec', eq: 'value', html: ST.vert([x, y], '−'), say: `${x} minus ${y} equals what?`,
    ans: vlDec(Math.abs(A - B), d), hint: stepsSub(x, y), label: `${x} − ${y} = ?`};
  return vlMaxOf(q);
}

// dec 4: decimal x whole, then decimal x decimal (tenths x tenths, tenths x hundredths)
function vlDec4() {
  let a, b;
  if (coin()) { // decimal x whole
    a = coin() ? vlRand(1, 12, 125) : vlRand(2, 104, 599);
    b = String(R(2, 9));
    if (coin()) [a, b] = [b, a];
  } else { // decimal x decimal
    a = vlRand(1, 2, 99);
    b = coin() ? vlRand(1, 2, 9) : vlRand(2, 2, 99);
    if (ST.parse(a).f.length < ST.parse(b).f.length) [a, b] = [b, a];
  }
  const pa = ST.parse(a), pb = ST.parse(b), ans = vlDec(ST.scaled(pa, pa.f.length) * ST.scaled(pb, pb.f.length), pa.f.length + pb.f.length);
  return vlMaxOf({kind: 'num', pad: 'dec', eq: 'value', html: `<div class="eq">${a} × ${b} = ${SLOT}</div>`, say: `${a} times ${b} equals what?`, ans,
    hint: stepsDecMul(a, b), label: `${a} × ${b} = ?`});
}

// dec 5: decimal / whole (exact), whole / whole with a decimal quotient (/2, 4, 5, 8), then / tenths
function vlDec5() {
  const form = pick(['exact', 'whole', 'tenths', 'tenths']);
  let a, b;
  if (form == 'exact') {
    b = R(3, 9);
    let m;
    do m = R(2, 99) * b; while (m % 10 == 0);
    a = vlShow(m, m > 99 ? 2 : R(1, 2));
    b = String(b);
  } else if (form == 'whole') {
    const d = pick([2, 4, 5, 8]);
    let n;
    do n = R(3, 99); while (n % d == 0);
    a = String(n);
    b = String(d);
  } else {
    const B = R(2, 9), tenthsQ = rnd() < .25, Q = tenthsQ ? R(11, 59) : R(2, 40);
    if (tenthsQ && Q % 10 == 0) return vlDec5();
    a = tenthsQ ? vlShow(Q * B, 2) : vlDec(Q * B, 1);
    if (tenthsQ && a.endsWith('0')) return vlDec5();
    b = vlShow(B, 1);
  }
  const ans = vlQuot(a, b);
  if (ans == null) return vlDec5();
  let hint;
  try {hint = stepsDecDiv(a, b)} catch (e) {return vlDec5()}
  return vlMaxOf({kind: 'num', pad: 'dec', eq: 'value', html: `<div class="eq">${a} ÷ ${b} = ${SLOT}</div>`, say: `${a} divided by ${b} equals what?`, ans, hint, label: `${a} ÷ ${b} = ?`});
}
// the skill table calls this for every dec level; levels 1-2 are P2-10's (Decimal Desert) and use level 3 until they exist
const vlDecLv = lv => (lv == 4 ? vlDec4() : lv == 5 ? vlDec5() : vlDec3());

// round 4: round a decimal to the nearest whole number, tenth or hundredth (round half up)
function vlRound4() {
  for (;;) {
    const keep = R(0, 2), fl = R(keep + 1, 3), wl = R(1, 3), m = R(10 ** (wl + fl - 1), 10 ** (wl + fl) - 1);
    if (m % 10 == 0) continue;
    const p = 10 ** (fl - keep), r = Math.floor((m + p / 2) / p), ans = vlDec(r, keep);
    if (keep && vlShow(r, keep) != ans) continue; // never an answer that ends in 0 (4.50)
    const n = vlShow(m, fl), nm = ['whole number', 'tenth', 'hundredth'][keep], rd = ST.parse(n);
    const fdig = rd.f[keep], keepDig = keep ? rd.f[keep - 1] : rd.i[rd.i.length - 1];
    return vlMaxOf({kind: 'num', pad: 'dec', eq: 'value', html: `<div class="sub">Round ${n} to the nearest ${nm}.</div><div class="eq">${SLOT}</div>`,
      say: `Round ${n} to the nearest ${nm}.`, ans, label: `round ${n} to ${nm}`,
      hint: stepsStory([`Find the ${keep ? vlPlaceName[-keep] : 'ones'} place in ${n}. It holds the ${keepDig}.`,
        `Look at the digit just to its right, in the ${vlPlaceName[-(keep + 1)]} place. It is ${fdig == 8 ? 'an' : 'a'} ${fdig}.`,
        `Is ${fdig} 5 or more? Then add 1 to the ${keepDig}. Is it less than 5? Then the ${keepDig} stays. Drop every digit after it.`])});
  }
}

// ooo 1: order of operations with parentheses (value), and "write the expression" (choice)
function vlOoo() {
  return coin() ? vlOooEval() : vlOooWrite();
}
// each template: numbers -> {s: expression, v: value, tr: [step texts, the last one asks]} or null when a number would be negative or not whole
const VL_OOO = [
  (a, b, c) => ({s: `${a} × (${b} + ${c})`, v: a * (b + c), tr: [`Parentheses first: ${b} + ${c} = ${b + c}.`, `Now multiply: ${a} × ${b + c} = ?`]}),
  (a, b, c) => ({s: `(${a} + ${b}) × ${c}`, v: (a + b) * c, tr: [`Parentheses first: ${a} + ${b} = ${a + b}.`, `Now multiply: ${a + b} × ${c} = ?`]}),
  (a, b, c) => a > b ? {s: `(${a} − ${b}) × ${c}`, v: (a - b) * c, tr: [`Parentheses first: ${a} − ${b} = ${a - b}.`, `Now multiply: ${a - b} × ${c} = ?`]} : null,
  (a, b, c) => b > c ? {s: `${a} × (${b} − ${c})`, v: a * (b - c), tr: [`Parentheses first: ${b} − ${c} = ${b - c}.`, `Now multiply: ${a} × ${b - c} = ?`]} : null,
  (a, b, c) => (a + b) % c == 0 ? {s: `(${a} + ${b}) ÷ ${c}`, v: (a + b) / c, tr: [`Parentheses first: ${a} + ${b} = ${a + b}.`, `Now divide: ${a + b} ÷ ${c} = ?`]} : null,
  (a, b, c) => a > b + c ? {s: `${a} − (${b} + ${c})`, v: a - b - c, tr: [`Parentheses first: ${b} + ${c} = ${b + c}.`, `Now subtract: ${a} − ${b + c} = ?`]} : null,
  (a, b, c, d) => ({s: `(${a} + ${b}) × ${c} − ${d}`, v: (a + b) * c - d, tr: [`Parentheses first: ${a} + ${b} = ${a + b}.`, `Multiply before you subtract: ${a + b} × ${c} = ${(a + b) * c}.`, `Now subtract: ${(a + b) * c} − ${d} = ?`]}),
  (a, b, c, d) => ({s: `${a} × (${b} + ${c}) − ${d}`, v: a * (b + c) - d, tr: [`Parentheses first: ${b} + ${c} = ${b + c}.`, `Multiply before you subtract: ${a} × ${b + c} = ${a * (b + c)}.`, `Now subtract: ${a * (b + c)} − ${d} = ?`]}),
  (a, b, c, d) => ({s: `${a} + ${b} × (${c} − ${d})`, v: c > d ? a + b * (c - d) : -1, tr: [`Parentheses first: ${c} − ${d} = ${c - d}.`, `Multiply before you add: ${b} × ${c - d} = ${b * (c - d)}.`, `Now add: ${a} + ${b * (c - d)} = ?`]}),
  (a, b, c, d) => ({s: `(${a} + ${b}) × (${c} − ${d})`, v: c > d ? (a + b) * (c - d) : -1, tr: [`Parentheses first: ${a} + ${b} = ${a + b}, and ${c} − ${d} = ${c - d}.`, `Now multiply: ${a + b} × ${c - d} = ?`]}),
  (a, b, c, d) => ({s: `${a} × ${b} − (${c} + ${d})`, v: a * b - c - d, tr: [`Parentheses first: ${c} + ${d} = ${c + d}.`, `Multiply before you subtract: ${a} × ${b} = ${a * b}.`, `Now subtract: ${a * b} − ${c + d} = ?`]}),
  (a, b, c, d) => ({s: `${a} + (${b} + ${c}) × ${d}`, v: a + (b + c) * d, tr: [`Parentheses first: ${b} + ${c} = ${b + c}.`, `Multiply before you add: ${b + c} × ${d} = ${(b + c) * d}.`, `Now add: ${a} + ${(b + c) * d} = ?`]}),
  (a, b, c, d) => ({s: `${a} × ${b} + (${c} − ${d})`, v: c > d ? a * b + c - d : -1, tr: [`Parentheses first: ${c} − ${d} = ${c - d}.`, `Multiply: ${a} × ${b} = ${a * b}.`, `Now add: ${a * b} + ${c - d} = ?`]}),
];
function vlOooEval() {
  const t = R(0, VL_OOO.length - 1);
  for (;;) {
    const nums = [R(2, 12), R(2, 12), R(2, 12), R(2, 12)], r = VL_OOO[t](...nums);
    if (!r || r.v < 0 || r.v > 200 || r.v == 0) continue;
    if (r.tr.some((s, i) => i < r.tr.length - 1 && new RegExp('= ' + r.v + '(\\.|,|$)').test(s))) continue; // a step must not show the answer
    const spoken = r.s.replace(/\(/g, 'open parenthesis ').replace(/\)/g, ' close parenthesis').replace(/ × /g, ' times ').replace(/ ÷ /g, ' divided by ')
      .replace(/ − /g, ' minus ').replace(/ \+ /g, ' plus ').replace(/\s+/g, ' ').trim();
    return vlMaxOf({kind: 'num', html: `<div class="eq" style="font-size:.9em">${r.s} = ${SLOT}</div>`, say: `${spoken} equals what?`, ans: String(r.v), label: `${r.s} = ?`,
      hint: stepsStory(['Do what is inside the parentheses first, then multiply and divide, then add and subtract.', ...r.tr])});
  }
}
// "Add 8 and 7, then multiply by 2." -> pick the expression
function vlOooWrite() {
  for (;;) {
    const a = R(2, 12), b = R(2, 12), c = R(2, 9), t = R(0, 3);
    let sent, good, bad;
    if (t == 0) {
      sent = `Add ${a} and ${b}, then multiply by ${c}.`;
      good = `(${a} + ${b}) × ${c}`;
      bad = [`${a} + ${b} × ${c}`, `${a} × ${b} + ${c}`, `${a} + ${b} + ${c}`];
    } else if (t == 1) {
      if (a <= b) continue;
      sent = `Subtract ${b} from ${a}, then multiply by ${c}.`;
      good = `(${a} − ${b}) × ${c}`;
      bad = [`${a} − ${b} × ${c}`, `${a} − ${b} + ${c}`, `${a} × ${c} − ${b}`];
      if (a < b * c) continue;
    } else if (t == 2) {
      sent = `Multiply ${a} by ${b}, then add ${c}.`;
      good = `${a} × ${b} + ${c}`;
      bad = [`${a} × (${b} + ${c})`, `${a} + ${b} × ${c}`, `(${a} + ${b}) × ${c}`];
    } else {
      sent = `Multiply ${a} by the sum of ${b} and ${c}.`;
      good = `${a} × (${b} + ${c})`;
      bad = [`${a} × ${b} + ${c}`, `(${a} + ${b}) × ${c}`, `${a} + ${b} × ${c}`];
    }
    const val = {'0': (a + b) * c, '1': (a - b) * c, '2': a * b + c, '3': a * (b + c)}[t];
    // every wrong choice must be a different expression with a different value
    const vals = new Set([val]);
    const wrong = bad.filter(s => { const v = vlOooVal(s); if (v == null || v < 0 || vals.has(v)) return false; vals.add(v); return true; });
    if (wrong.length < 3 || new Set([good, ...wrong]).size < 4) continue;
    return {kind: 'choice', cls: 'wide', html: `<div class="sub">Which expression matches?</div><div class="sub" style="font-weight:700;color:var(--ink,inherit)">${sent}</div>`,
      say: `${sent} Which expression matches?`, ans: good, choices: shuffle([good, ...wrong.slice(0, 3)]).map(s => ({v: s, l: s})), label: `write: ${sent}`.slice(0, 59),
      hint: vlHintT('Say the steps in order. Whatever happens first goes in parentheses. Multiplying and dividing happen before adding and subtracting, unless parentheses say otherwise. Test each choice against the words.')};
  }
}
// value of a small expression made of numbers, + − × ÷ and parentheses, by order of operations (no eval)
function vlOooVal(s) {
  const t = s.replace(/\s+/g, '').match(/\d+|[()+−×÷]/g);
  let i = 0;
  const expr = () => { let v = term(); while (t[i] == '+' || t[i] == '−') { const o = t[i++], w = term(); v = o == '+' ? v + w : v - w } return v };
  const term = () => { let v = atom(); while (t[i] == '×' || t[i] == '÷') { const o = t[i++], w = atom(); v = o == '×' ? v * w : v / w } return v };
  const atom = () => { if (t[i] == '(') { i++; const v = expr(); i++; return v } return +t[i++] };
  const v = expr();
  return Number.isInteger(v) ? v : null;
}

// ---- P2-12 Crystal Caves ----
/* CURRICULUM M-5b: the stops of Crystal Caves (m_caves), all names start with cc.
   fop 3-4   add and subtract fractions with unlike bottoms (simplest form in half of them), mixed numbers with regrouping
   fop 5-6   fraction x fraction (area model) and x mixed number; unit fraction / whole and whole / unit fraction (bars)
   geo 4     volume: count unit cubes, l x w x h from labels, two joined boxes (VIZ.solid)
   coord 1   first quadrant: tap a point (grid to 4 so every target is 48 px), read a point (x, y), pick the pair, distance
   meas 6    conversions both ways, decimals for metric, two steps (yd to in, hr to sec)
   data 4    line plot of halves, quarters, eighths: how many, total, longest minus shortest
   pat 5     two rules related ("B is 3 times A"), pick y = 2x + 1 for a table
   story 8   money, recipes scaled by 1/2 or 3, distances with fractions and decimals
   Every label holds the numbers of its question, so tools/test.js can rebuild the right answer from the label. */

// a step hint from [picture, head, text] rows; plain text only (fractions as 3/8), the last row has a "?"
const ccHint = rows => ({k: 'steps', w: 0, steps: rows.map(([pic, head, text]) => ST.step(pic || '', head, text, null))});
// put one text step in front of a step hint made by stepsAdd, stepsSub ...
const ccLead = (h, text) => {h.steps.unshift({html: `<p class="hsc">${esc(text)}</p>`, say: text}); return h};
const ccGcd = (a, b) => (b ? ccGcd(b, a % b) : a);
const ccLcm = (a, b) => (a / ccGcd(a, b)) * b;
const ccFr = (n, d) => { const g = ccGcd(n, d); return `${n / g}/${d / g}`; }; // lowest terms as text
// a decimal with the given places from a whole number of tenths / hundredths, no trailing zeros: (275, 2) -> 2.75
const ccDec = (v, p) => { const s = String(v).padStart(p + 1, '0'), w = s.slice(0, -p), f = s.slice(-p).replace(/0+$/, ''); return f ? `${w}.${f}` : w; };
// answer text of n/d as a number: 'frac' under 1, 'mix' otherwise (lowest terms, never a whole number); null for a whole number
function ccAnsFor(n, d) {
  const [a, b] = [n / ccGcd(n, d), d / ccGcd(n, d)];
  if (b == 1) return null;
  const w = Math.floor(a / b), r = a % b;
  return w ? {sep: 'mix', pad: 'int', ans: `${w} ${r}/${b}`} : {sep: null, pad: 'frac', ans: `${r}/${b}`};
}
const ccSlot = o => (o.sep == 'mix' ? SLOT_MIX : SLOT_FRAC);
// two proper fractions in lowest terms with different bottoms and a common bottom of at most 60
function ccPair() {
  for (;;) {
    const b = R(2, 12), d = R(2, 12), a = R(1, b - 1), c = R(1, d - 1);
    if (b != d && ccLcm(b, d) <= 60 && ccGcd(a, b) == 1 && ccGcd(c, d) == 1) return {a, b, c, d, L: ccLcm(b, d)};
  }
}

/* ---- fop 3: unlike bottoms; the second half of the items need simplest form ---- */
function ccFop3() {
  const simp = coin();
  let p, add, n;
  do {
    p = ccPair(); add = coin();
    n = p.a * (p.L / p.b) + (add ? 1 : -1) * p.c * (p.L / p.d);
  } while (n <= 0 || n % p.L == 0);
  const {a, b, c, d, L} = p, op = add ? '+' : '−', red = ccFr(n, L);
  const ask = simp ? 'in simplest form' : 'as a fraction';
  const h = stepsCommonDen(a, b, c, d, add ? '+' : '−');
  if (simp) h.steps.push(ST.step('', 'Simplest form:', 'Is there a number that goes into both the top and the bottom? Divide both by it, again and again. Is only 1 left?', null));
  const q = {kind: 'num', pad: 'frac',
    html: `<div class="sub">${add ? 'Add' : 'Subtract'}. Write the answer ${ask}.</div><div class="eq">${fcFr(a, b)} ${op} ${fcFr(c, d)} = ${SLOT_FRAC}</div>`,
    say: `${fcSay(a, b)} ${add ? 'plus' : 'minus'} ${fcSay(c, d)}. Write the answer ${ask}.`, ans: red, hint: h,
    label: `fop3 ${a}/${b} ${op} ${c}/${d}${simp ? ' simplest' : ''}`};
  if (!simp) q.eq = 'value';
  return q;
}

/* ---- fop 4: mixed numbers, unlike bottoms, regrouping in subtraction ---- */
function ccFop4() {
  let p, add, w1, w2, W, n, reg, tries = 0;
  for (;;) {
    p = ccPair(); add = coin(); w1 = R(2, 7); w2 = R(1, 5);
    const A = p.a * (p.L / p.b), C = p.c * (p.L / p.d);
    reg = false;
    if (add) {
      n = A + C; W = w1 + w2;
      if (n >= p.L) {W++; n -= p.L}
    } else {
      if (w1 <= w2) continue;
      if (A < C) {reg = true; n = A + p.L - C; W = w1 - w2 - 1} else {n = A - C; W = w1 - w2}
      if (!reg && rnd() < .6 && ++tries < 40) continue; // most subtractions regroup
    }
    if (n > 0 && W >= 1) break;
  }
  const {a, b, c, d, L} = p, op = add ? '+' : '−', A = a * (L / b), C = c * (L / d), g = ccGcd(n, L);
  const cd = stepsCommonDen(a, b, c, d, op), last = 'Then write the fraction in simplest form. What is the mixed number?';
  let steps = cd.steps;
  if (add) steps.push(ST.step('', 'Then the wholes:', `${w1} + ${w2} = ${w1 + w2}. If your fraction is more than 1 whole, move 1 whole over to the wholes. ${last}`, null));
  else if (!reg) steps.push(ST.step('', 'Then the wholes:', `${w1} − ${w2} = ${w1 - w2}. Put the fraction with them. ${last}`, null));
  else {
    steps = steps.slice(0, -1);
    steps.push(ST.step('', 'Not enough:', `${A}/${L} is smaller than ${C}/${L}. Take 1 whole from the ${w1}. That leaves ${qN(w1 - 1, 'whole')}, and the whole is ${L}/${L}, so you have ${A + L}/${L}.`, null));
    steps.push(ST.step('', 'Now subtract:', `${w1 - 1} − ${w2} = ? wholes. ${A + L} − ${C} = ? over ${L}. ${last}`, null));
  }
  return {kind: 'num', sep: 'mix', eq: 'value',
    html: `<div class="sub">${add ? 'Add' : 'Subtract'}. Write a mixed number in simplest form.</div><div class="eq">${w1} ${fcFr(a, b)} ${op} ${w2} ${fcFr(c, d)} = ${SLOT_MIX}</div>`,
    say: `${w1} and ${fcSay(a, b)} ${add ? 'plus' : 'minus'} ${w2} and ${fcSay(c, d)}. Write a mixed number in simplest form.`,
    ans: `${W} ${n / g}/${L / g}`,
    hint: ST.hint([ST.step('', 'Fractions first:', `Work with ${a}/${b} and ${c}/${d} first. The whole numbers come after.`, null), ...steps], 9), label: `fop4 ${w1} ${a}/${b} ${op} ${w2} ${c}/${d}`};
}

/* ---- fop 5: fraction x fraction (area model), fraction x mixed number ---- */
// a/b of the rows and c/d of the columns: rows in the play tint, columns in the math tint, the overlap dark
function ccArea(a, b, c, d) {
  const cw = Math.min(34, Math.floor(240 / d)), ch = Math.min(28, Math.floor(168 / b)), P = 3, W = d * cw + 2 * P, H = b * ch + 2 * P;
  let body = '';
  for (let r = 0; r < b; r++) {
    for (let k = 0; k < d; k++) {
      const row = r < a, col = k < c;
      body += `<rect class="${row && col ? 'vp vs' : row ? 'vpt' : col ? 'vwg' : 'vp'}" x="${P + k * cw}" y="${P + r * ch}" width="${cw}" height="${ch}"/>`;
    }
  }
  return `<svg class="viz viz-cc" viewBox="0 0 ${W} ${H}" style="--vw:${W}" role="img" aria-label="a rectangle in equal boxes, rows and columns shaded">${body}</svg>`;
}
function ccFop5() {
  if (rnd() < .6) {
    let a, b, c, d;
    do {b = R(2, 6); d = R(2, 6); a = R(1, b - 1); c = R(1, d - 1)} while (ccGcd(a, b) > 1 || ccGcd(c, d) > 1);
    return {kind: 'num', pad: 'frac', eq: 'value',
      html: `${ccArea(a, b, c, d)}<div class="sub">Multiply. Write the answer as a fraction.</div><div class="eq">${fcFr(a, b)} × ${fcFr(c, d)} = ${SLOT_FRAC}</div>`,
      say: `${fcSay(a, b)} times ${fcSay(c, d)}. The picture shows the rows and the columns. Write the answer as a fraction.`, ans: ccFr(a * c, b * d),
      hint: ccHint([['', 'The picture:', `${a} of the ${b} rows ${a == 1 ? 'is' : 'are'} colored: that is ${a}/${b}. ${c} of the ${d} columns ${c == 1 ? 'is' : 'are'} colored: that is ${c}/${d}. The dark boxes are in both. How many dark boxes? How many boxes in all?`],
        ['', 'Or multiply:', `Tops: ${a} × ${c} = ? Bottoms: ${b} × ${d} = ?`],
        ['', 'Simplest form:', 'Does one number go into both the top and the bottom? Divide to make the fraction as small as it can be. What is left?']]),
      label: `fop5 ${a}/${b} x ${c}/${d}`};
  }
  let a, b, c, d, W, n;
  do {
    b = R(2, 6); d = R(2, 6); a = R(1, b - 1); c = R(1, d - 1); W = R(1, 3);
    n = a * (W * d + c);
  } while (ccGcd(a, b) > 1 || ccGcd(c, d) > 1 || n % (b * d) == 0);
  const top = W * d + c;
  return {kind: 'num', pad: 'frac', eq: 'value',
    html: `<div class="sub">Multiply. Write the answer as a fraction.</div><div class="eq">${fcFr(a, b)} × ${W} ${fcFr(c, d)} = ${SLOT_FRAC}</div>`,
    say: `${fcSay(a, b)} times ${W} and ${fcSay(c, d)}. Write the answer as a fraction.`, ans: ccFr(n, b * d),
    hint: ccHint([['', 'Mixed number to fraction:', `${W} ${c}/${d} is ${qN(W, 'whole')} of ${d}/${d}, and ${c}/${d} more. ${W} × ${d} + ${c} = ${top}, so it is ${top}/${d}.`],
      ['', 'Multiply:', `${a}/${b} × ${top}/${d}. Tops: ${a} × ${top} = ? Bottoms: ${b} × ${d} = ?`],
      ['', 'Simplest form:', 'Does one number go into both the top and the bottom? Divide to make the fraction as small as it can be. What is left?']]),
    label: `fop5 ${a}/${b} x ${W} ${c}/${d}`};
}

/* ---- fop 6: unit fraction / whole, whole / unit fraction ---- */
// one bar in d parts, the first part shaded and cut into n small pieces
function ccSplit(d, n) {
  const cw = Math.min(40, Math.floor(260 / d)), rh = 26, P = 3, W = d * cw + 2 * P, H = rh + 2 * P, sw = cw / n;
  let body = '';
  for (let i = 0; i < d; i++) body += `<rect class="vp${i == 0 ? ' vs' : ''}" x="${P + i * cw}" y="${P}" width="${cw}" height="${rh}"/>`;
  let cut = '';
  for (let k = 1; k < n; k++) cut += `M${Math.round((P + k * sw) * 10) / 10} ${P}v${rh}`;
  return `<svg class="viz viz-cc" viewBox="0 0 ${W} ${H}" style="--vw:${W}" role="img" aria-label="a bar in equal parts, the first part cut into smaller pieces">${body}<path class="vce" stroke-width="2" d="${cut}"/></svg>`;
}
function ccFop6() {
  if (coin()) {
    const d = R(2, 8), n = R(2, 6);
    return {kind: 'num', pad: 'frac', eq: 'value',
      html: `${ccSplit(d, n)}<div class="sub">Divide. Write the answer as a fraction.</div><div class="eq">${fcFr(1, d)} ÷ ${n} = ${SLOT_FRAC}</div>`,
      say: `${fcSay(1, d)} divided by ${n}. The first part of the bar is cut into ${n} small pieces. Write the answer as a fraction.`, ans: `1/${d * n}`,
      hint: ccHint([[ccSplit(d, n), 'Cut it up:', `Take 1/${d} of the bar and cut it into ${n} equal small pieces. Each small piece is one answer.`],
        ['', 'Name the piece:', `The whole bar would have ${d} × ${n} = ? of these small pieces. So each one is 1 out of that many.`]]),
      label: `fop6 1/${d} / ${n}`};
  }
  const n = R(2, 6), d = R(2, 8);
  return {kind: 'num',
    html: `${ccBars(n, d)}<div class="sub">How many pieces?</div><div class="eq">${n} ÷ ${fcFr(1, d)} = ${SLOT}</div>`,
    say: `${n} divided by ${fcSay(1, d)}. How many pieces of ${fcSay(1, d)} are in ${qN(n, 'whole')}?`, ans: String(n * d),
    hint: ccHint([['', 'Cut up the wholes:', `Each whole is cut into ${ccPl(d)}. How many ${ccPl(d)} make 1 whole?`],
      ['', 'Count them all:', `${qN(n, 'whole')} with ${d} pieces in each: ${n} × ${d} = ?`]]),
    label: `fop6 ${n} / 1/${d}`};
}
// n bars, each cut into d parts
function ccBars(n, d) {
  const cw = Math.min(34, Math.floor(250 / d)), rh = 14, gap = 5, P = 3, W = d * cw + 2 * P, H = n * (rh + gap) - gap + 2 * P;
  let body = '';
  for (let r = 0; r < n; r++) for (let i = 0; i < d; i++) body += `<rect class="vp vs" x="${P + i * cw}" y="${P + r * (rh + gap)}" width="${cw}" height="${rh}"/>`;
  return `<svg class="viz viz-cc" viewBox="0 0 ${W} ${H}" style="--vw:${W}" role="img" aria-label="whole bars, each cut into equal parts">${body}</svg>`;
}

/* ---- geo 4: volume ---- */
function ccGeo4() {
  const f = rnd();
  if (f < .34) { // count the unit cubes
    const l = R(2, 4), w = R(2, 4), h = R(2, 4);
    return {kind: 'num', max: 3,
      html: `${VIZ.solid([{l, h}], {w, grid: true})}<div class="sub">The box is filled with unit cubes. How many cubes?</div><div class="eq">${SLOT} cubes</div>`,
      say: 'The box is made of small cubes, all the same size. Count the cubes in one layer, then count the layers. How many cubes in all?', ans: String(l * w * h),
      hint: ccHint([[VIZ.solid([{l, h: 1}], {w, grid: true}), 'One layer:', `Look at the top. There are ${l} cubes in a row and ${w} rows. ${l} × ${w} = ? cubes make one layer.`],
        ['', 'Stack the layers:', `The box is ${h} layers tall. Every layer has the same number of cubes. (cubes in a layer) × ${h} = ?`]]),
      label: `geo4 cubes ${l}x${w}x${h}`};
  }
  if (f < .72) { // labelled box
    const l = R(2, 12), w = R(2, 12), h = R(2, 12), base = l * w, v = base * h;
    const mul = stepsMul(base, h);
    mul.steps.unshift(ST.step('', 'Volume of a box:', `Length × width × height. First the bottom layer: ${l} × ${w} = ${base} square units. Then ${h} layers high: ${base} × ${h}.`, null));
    return {kind: 'num', max: 4,
      html: `${VIZ.solid([{l, h}], {w, lab: true})}<div class="sub">All sides are in cm. What is the volume?</div><div class="eq">${SLOT} cm³</div>`,
      say: `A box is ${l} centimeters long, ${w} centimeters wide and ${h} centimeters tall. What is its volume in cubic centimeters?`, ans: String(v),
      hint: mul, label: `geo4 vol ${l}x${w}x${h}`};
  }
  // two boxes joined: add the two volumes
  let l1, l2, w, h1, h2;
  do {l1 = R(2, 6); l2 = R(2, 6); w = R(2, 6); h1 = R(2, 8); h2 = R(2, 8)} while (h1 == h2);
  const v1 = l1 * w * h1, v2 = l2 * w * h2;
  return {kind: 'num', max: 3,
    html: `${VIZ.solid([{l: l1, h: h1}, {l: l2, h: h2, c2: true}], {w, lab: true})}<div class="sub">Two boxes stuck together. All sides are in cm. Find the volume.</div><div class="eq">${SLOT} cm³</div>`,
    say: `Two boxes are stuck together. The blue box is ${l1} by ${w} by ${h1}. The orange box is ${l2} by ${w} by ${h2}. All sides are in centimeters. What is the volume of the whole solid?`, ans: String(v1 + v2),
    hint: ccHint([['', 'Split it:', 'Find the volume of each box on its own, then add the two volumes.'],
      ['', 'Blue box:', `${l1} × ${w} × ${h1} = ${v1} cubic cm.`], ['', 'Orange box:', `${l2} × ${w} × ${h2} = ${v2} cubic cm.`],
      ['', 'Add:', `${v1} + ${v2} = ?`]]),
    label: `geo4 join ${l1}x${w}x${h1}+${l2}x${w}x${h2}`};
}

/* ---- coord 1: the first quadrant ---- */
const ccXY = '<span class="ccxy">(<span class="slot" id="slot"></span><span class="ccsep">,</span><span class="slot" id="slot2"></span>)</span>';
const ccPair2 = (x, y) => `(${x}, ${y})`;
function ccCoord1() {
  const f = rnd();
  if (f < .25) { // tap the point; the grid stops at 4 so that every target is a whole 48 px square on a phone (VIZ.coordGrid)
    const x = R(1, 4), y = R(1, 4), key = `${x},${y}`;
    const cand = [[y, x], [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1], [x + 1, y + 1], [x - 1, y - 1]]
      .filter(p => p[0] >= 1 && p[0] <= 4 && p[1] >= 1 && p[1] <= 4 && p.join() != key);
    const pts = [[x, y]].concat(shuffle(cand).slice(0, 3));
    return {kind: 'tap', ans: key, ansSay: `${x} across and ${y} up`,
      html: `${VIZ.coordGrid({max: 4, tapPts: shuffle(pts)})}<div class="sub">Tap the point ${ccPair2(x, y)}.</div>`,
      say: `Tap the point ${x}, ${y}. Go ${x} across, then ${y} up.`,
      hint: {k: 'text', s: `Start at 0. The first number tells how far to go across, to the right. The second number tells how far to go up. Go across first, then up.`},
      label: `coord1 tap ${x},${y}`};
  }
  const pt = () => {
    let x, y;
    do {x = R(0, 10); y = R(0, 10)} while ((x == 0 && y == 0) || ((x == 0 || y == 0) && rnd() < .8));
    return [x, y];
  };
  if (f < .55) { // read the point
    const [x, y] = pt();
    return {kind: 'num', sep: 'xy',
      html: `${VIZ.coordGrid({max: 10, points: [[x, y, 'A']]})}<div class="sub">What are the coordinates of point A?</div><div class="eq">${ccXY}</div>`,
      say: 'What are the coordinates of point A? Say how far across, then how far up.', ans: `${x},${y}`, after: `Point A is ${x} across and ${y} up.`,
      hint: ccHint([['', 'Across first:', 'Start at 0. Slide to the right along the bottom until you are straight below point A. What number is there?'],
        ['', 'Then up:', 'Now go up from there to point A. What number is that? Write across first, then up.']]),
      label: `coord1 read ${x},${y}`};
  }
  if (f < .72) { // which pair names A
    const [x, y] = pt();
    const set = new Map([[`${x},${y}`, ccPair2(x, y)]]);
    for (const [a, b] of shuffle([[y, x], [x + 1, y], [x, y + 1], [x - 1, y], [x, y - 1], [x + 2, y], [x - 1, y - 1], [x - 2, y], [x, y - 2]])) {
      if (a >= 0 && a <= 10 && b >= 0 && b <= 10) set.set(`${a},${b}`, ccPair2(a, b));
      if (set.size == 4) break;
    }
    return {kind: 'choice', ans: `${x},${y}`, choices: shuffle([...set].map(([v, l]) => ({v, l}))),
      html: `${VIZ.coordGrid({max: 10, points: [[x, y, 'A']]})}<div class="sub">Which ordered pair names point A?</div>`,
      say: 'Which ordered pair names point A? The first number is across and the second number is up.',
      hint: ccHint([['', 'Across first:', 'Slide right along the bottom to below point A. That number comes first.'], ['', 'Then up:', 'Now go up to A. That number comes second. Which pair has them in that order?']]),
      label: `coord1 pair ${x},${y}`};
  }
  // distance between two points on the same line
  const horiz = coin();
  let u = R(0, 10), v, k;
  do {v = R(0, 10); k = R(1, 10)} while (Math.abs(u - v) < 2);
  const A = horiz ? [u, k] : [k, u], B = horiz ? [v, k] : [k, v], dist = Math.abs(u - v), hi = Math.max(u, v), lo = Math.min(u, v);
  return {kind: 'num', max: 2,
    html: `${VIZ.coordGrid({max: 10, points: [[A[0], A[1], 'A'], [B[0], B[1], 'B']]})}<div class="sub">How far is it from A to B? (units)</div><div class="eq">${SLOT}</div>`,
    say: 'How far is it from point A to point B? Count the units along the line.', ans: String(dist),
    hint: ccHint([['', 'Same line:', horiz ? 'A and B are on the same row, so only the across numbers are different.' : 'A and B are in the same column, so only the up numbers are different.'],
      ['', 'The gap:', `Take the smaller number from the bigger one: ${hi} − ${lo} = ?`]]),
    label: `coord1 dist ${A.join(',')} ${B.join(',')}`};
}

/* ---- meas 6: conversions both ways, decimals for metric, two steps ---- */
const CC_ONE = [['km', 'm', 1000, 'kilometers', 'meters', 1], ['m', 'cm', 100, 'meters', 'centimeters', 1], ['kg', 'g', 1000, 'kilograms', 'grams', 1],
  ['L', 'mL', 1000, 'liters', 'milliliters', 1], ['yd', 'ft', 3, 'yards', 'feet', 0], ['ft', 'in', 12, 'feet', 'inches', 0], ['hr', 'min', 60, 'hours', 'minutes', 0],
  ['min', 'sec', 60, 'minutes', 'seconds', 0], ['lb', 'oz', 16, 'pounds', 'ounces', 0], ['gal', 'qt', 4, 'gallons', 'quarts', 0]];
const CC_TWO = [['yd', 'ft', 'in', 3, 12, 'yards', 'inches', 2, 9], ['gal', 'qt', 'pt', 4, 2, 'gallons', 'pints', 2, 9], ['hr', 'min', 'sec', 60, 60, 'hours', 'seconds', 2, 4],
  ['day', 'hr', 'min', 24, 60, 'days', 'minutes', 2, 5], ['wk', 'day', 'hr', 7, 24, 'weeks', 'hours', 2, 6]];
function ccMeas6() {
  const f = rnd();
  const maxOf = a => ({max: Math.max(4, String(a).length)});
  if (f < .35) { // two steps
    const [b, m, s, k1, k2, bn, sn, lo, hi] = pick(CC_TWO), n = R(lo, hi), mid = n * k1, ans = mid * k2;
    return {kind: 'num', eq: 'value', ...maxOf(ans),
      html: `<div class="sub">Change to the smaller unit.</div><div class="eq">${n} ${b} = ${SLOT} ${s}</div>`,
      say: `${n} ${bn} is how many ${sn}?`, ans: String(ans),
      hint: ccHint([['', 'Two steps:', `${b} to ${m}, then ${m} to ${s}. 1 ${b} = ${k1} ${m}. 1 ${m} = ${k2} ${s}.`],
        ['', 'Step 1:', `${n} ${b} = ${n} × ${k1} = ${mid} ${m}.`], ['', 'Step 2:', `${mid} ${m} = ${mid} × ${k2} = ?`]]),
      label: `meas6 ${n} ${b} to ${s}`};
  }
  const [b, s, k, bn, sn, metric] = pick(CC_ONE), dec = metric && rnd() < .7;
  if (coin()) { // big to small; metric units often with a decimal
    if (dec) {
      const t = R(11, 99), ans = t * k / 10;
      return {kind: 'num', eq: 'value', ...maxOf(ans),
        html: `<div class="sub">Change to the smaller unit.</div><div class="eq">${ccDec(t, 1)} ${b} = ${SLOT} ${s}</div>`, say: `${ccDec(t, 1).replace('.', ' point ')} ${bn} is how many ${sn}?`, ans: String(ans),
        hint: ccHint([['', 'Table:', `1 ${b} = ${k} ${s}. You are changing to the smaller unit, so the number gets bigger.`], ['', 'Multiply:', `${ccDec(t, 1)} × ${k} = ?`]]),
        label: `meas6 ${ccDec(t, 1)} ${b} to ${s}`};
    }
    const n = R(2, k >= 100 ? 9 : 20), ans = n * k;
    return {kind: 'num', eq: 'value', ...maxOf(ans),
      html: `<div class="sub">Change to the smaller unit.</div><div class="eq">${n} ${b} = ${SLOT} ${s}</div>`, say: `${n} ${bn} is how many ${sn}?`, ans: String(ans),
      hint: ccHint([['', 'Table:', `1 ${b} = ${k} ${s}. You are changing to the smaller unit, so the number gets bigger.`], ['', 'Multiply:', `${n} × ${k} = ?`]]),
      label: `meas6 ${n} ${b} to ${s}`};
  }
  // small to big (metric answers may have a decimal)
  if (dec) {
    let t;
    do t = R(11, 99); while (t % 10 == 0);
    const small = t * k / 10;
    return {kind: 'num', pad: 'dec', eq: 'value', ...maxOf(small),
      html: `<div class="sub">Change to the bigger unit.</div><div class="eq">${small} ${s} = ${SLOT} ${b}</div>`, say: `${small} ${sn} is how many ${bn}?`, ans: ccDec(t, 1),
      hint: ccHint([['', 'Table:', `1 ${b} = ${k} ${s}. You are changing to the bigger unit, so the number gets smaller.`], ['', 'Divide:', `${small} ÷ ${k} = ? Move the decimal point.`]]),
      label: `meas6 ${small} ${s} to ${b}`};
  }
  const n = R(2, k >= 60 ? 12 : 20), small = n * k;
  return {kind: 'num', eq: 'value', ...maxOf(n),
    html: `<div class="sub">Change to the bigger unit.</div><div class="eq">${small} ${s} = ${SLOT} ${b}</div>`, say: `${small} ${sn} is how many ${bn}?`, ans: String(n),
    hint: ccHint([['', 'Table:', `1 ${b} = ${k} ${s}. You are changing to the bigger unit, so the number gets smaller.`], ['', 'Divide:', `How many groups of ${k} fit in ${small}? ${small} ÷ ${k} = ?`]]),
    label: `meas6 ${small} ${s} to ${b}`};
}

/* ---- data 4: line plots of halves, quarters and eighths ---- */
const CC_LP = [['leaf', 'leaves', 'inches'], ['ribbon', 'ribbons', 'yards'], ['worm', 'worms', 'inches'], ['rope', 'ropes', 'feet'],
  ['seedling', 'seedlings', 'inches'], ['pencil', 'pencils', 'inches']];
// an amount k/den as html (whole numbers stay whole; the rest are written like the labels of the line plot) and as speech
const ccPl = d => (d == 2 ? 'halves' : FC_NAMES[d] + 's'); // halves, thirds, fourths
const CC_SING = {inches: 'inch', yards: 'yard', feet: 'foot'};
const ccAmt = (k, den) => (k % den ? fcFr(k, den) : String(k / den));
const ccAmtSay = (k, den) => (k % den ? fcSay(k, den) : String(k / den));
function ccData4() {
  const [den, max] = pick([[2, 3], [4, 2], [8, 1]]), [noun, plural, unit] = pick(CC_LP), type = pick(['count', 'total', 'range']);
  let ks, v, o;
  for (;;) {
    const all = Array.from({length: max * den}, (_, i) => i + 1), m = R(3, Math.min(5, all.length)), vals = shuffle(all).slice(0, m), n = R(6, 10);
    ks = vals.slice();
    while (ks.length < n) ks.push(pick(vals));
    const cnt = {};
    ks.forEach(k => {cnt[k] = (cnt[k] || 0) + 1});
    if (Math.max(...Object.values(cnt)) > 6) continue;
    ks.sort((a, b) => a - b);
    if (type == 'count') {v = pick(vals); break}
    o = ccAnsFor(type == 'total' ? ks.reduce((s, k) => s + k, 0) : ks[ks.length - 1] - ks[0], den);
    if (o) break;
  }
  const plot = VIZ.linePlot(ks.map(k => k / den), {min: 0, max, step: 1 / den, den, w: 290});
  const head = `<div class="sub">Each dot shows the length of one ${noun} in ${unit}.</div>`;
  const tag = `d=${den}: ${ks.join(' ')}`;
  if (type == 'count') {
    const c = ks.filter(k => k == v).length;
    return {kind: 'num', max: 2, html: `${plot}${head}<div class="sub">How many ${plural} are ${v % den ? v + '/' + den : v / den} ${v <= den ? CC_SING[unit] : unit} long?</div><div class="eq">${SLOT}</div>`,
      say: `Each dot shows the length of one ${noun} in ${unit}. How many ${plural} are ${ccAmtSay(v, den)} ${v <= den ? CC_SING[unit] : unit} long?`, ans: String(c),
      hint: ccHint([['', 'Find the mark:', `Find ${v % den ? v + '/' + den : v / den} on the number line under the dots.`],
        ['', 'Count the dots:', 'How many dots are stacked above that mark?']]),
      label: `data4 count k=${v} ${tag}`};
  }
  const sum = ks.reduce((s, k) => s + k, 0), q = {kind: 'num', eq: 'value', pad: o.pad, ans: o.ans};
  if (o.sep) q.sep = o.sep;
  if (type == 'total') {
    return {...q, html: `${plot}${head}<div class="sub">What is the total length of all the ${plural}?</div><div class="eq">${ccSlot(o)} ${unit}</div>`,
      say: `Each dot shows the length of one ${noun} in ${unit}. What is the total length of all the ${plural}? Write a fraction or a mixed number.`,
      hint: ccHint([['', 'List them:', `Read every dot from the left: ${ks.map(k => (k % den ? k + '/' + den : k / den)).join(', ')}.`],
        ['', 'Add:', `Every length is a number of ${ccPl(den)}, so add the tops and keep ${den} on the bottom. The tops: ${ks.join(' + ')} = ?`],
        ['', 'Make it neat:', 'If the top is bigger than the bottom, take out the whole numbers. Then write it in simplest form. What is the number?']]),
      label: `data4 total ${tag}`};
  }
  const hi = ks[ks.length - 1], lo = ks[0];
  return {...q, html: `${plot}${head}<div class="sub">How much longer is the longest ${noun} than the shortest?</div><div class="eq">${ccSlot(o)} ${unit}</div>`,
    say: `Each dot shows the length of one ${noun} in ${unit}. How much longer is the longest ${noun} than the shortest? Write a fraction or a mixed number.`,
    hint: ccHint([['', 'Find the ends:', `The longest is ${hi % den ? hi + '/' + den : hi / den} and the shortest is ${lo % den ? lo + '/' + den : lo / den}.`],
      ['', 'Subtract:', `Both are ${ccPl(den)}. Subtract the tops: ${hi} − ${lo} = ? Keep ${den} on the bottom, then write it in simplest form.`]]),
    label: `data4 range ${tag}`};
}

/* ---- pat 5: two rules ---- */
const ccRule = (a, b) => `y = ${a == 1 ? '' : a}x${b ? ' + ' + b : ''}`;
function ccPat5() {
  const f = rnd();
  if (f < .35) { // how are the two sequences related
    const a = R(2, 6), k = R(2, 5), b = a * k, rows = [1, 2, 3, 4].map(i => [a * i, b * i]);
    const pic = `<p class="story">Rule A: start at 0, add ${a}.<br>Rule B: start at 0, add ${b}.</p>${VIZ.tableInOut(rows, {head: ['A', 'B']})}`;
    const hint = ccHint([['', 'Compare one row:', `Row 1: A is ${a} and B is ${b}. How many times as big is B? ${a} × ? = ${b}.`],
      ['', 'Check another row:', `Row 2: A is ${2 * a} and B is ${2 * b}. Does the same number work? Yes? Then that is the rule.`]]);
    if (coin()) {
      return {kind: 'num', max: 1, html: `${pic}<div class="sub">Each number in B is ___ times the number next to it in A.</div><div class="eq">${SLOT}</div>`,
        say: `Rule A starts at 0 and adds ${a}. Rule B starts at 0 and adds ${b}. Each number in B is how many times the number next to it in A?`, ans: String(k), hint, label: `pat5 rel ${a} ${b}`};
    }
    const ch = [[`B is ${k} times A`], [`B is A + ${b - a}`], [`A is ${k} times B`], [`B is ${k + 1} times A`]].map(([l]) => ({v: l, l}));
    return {kind: 'choice', html: `${pic}<div class="sub">How are the numbers in B and A related?</div>`,
      say: `Rule A starts at 0 and adds ${a}. Rule B starts at 0 and adds ${b}. How are the numbers in B and A related?`, ans: `B is ${k} times A`, choices: shuffle(ch), cls: 'ccw', hint,
      label: `pat5 relc ${a} ${b}`};
  }
  if (f < .5) { // use the link to find a bigger pair
    const a = R(2, 6), k = R(2, 5), b = a * k, i = R(6, 9), A = a * i;
    return {kind: 'num', max: 3,
      html: `<p class="story">Rule A: start at 0, add ${a}.<br>Rule B: start at 0, add ${b}.</p>${VIZ.tableInOut([1, 2, 3].map(j => [a * j, b * j]), {head: ['A', 'B']})}<div class="sub">When A is ${A}, what is B?</div><div class="eq">${SLOT}</div>`,
      say: `Rule A starts at 0 and adds ${a}. Rule B starts at 0 and adds ${b}. Each B number goes with the A number next to it. When A is ${A}, what is B?`, ans: String(b * i),
      hint: ccHint([['', 'Find the link:', `Row 1: A is ${a} and B is ${b}. B is ${k} times as big as A.`], ['', 'Use it:', `Do the same to ${A}: ${A} × ${k} = ?`]]),
      label: `pat5 pair ${a} ${b} A=${A}`};
  }
  if (f < .88) { // pick the rule for the table
    const a = R(2, 5), b = rnd() < .7 ? R(1, 5) : 0, xs = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]).slice(0, 4).sort((p, q) => p - q);
    const rows = xs.map(x => [x, a * x + b]), right = ccRule(a, b), set = new Map([[right, 1]]);
    const cand = [[a, b + 1], [a, b - 1], [a + 1, b], [a - 1, b], [b, a], [1, a + b]].filter(([p, q]) => p >= 1 && q >= 0);
    for (const [p, q] of shuffle(cand)) {
      set.set(ccRule(p, q), 1);
      if (set.size == 4) break;
    }
    const [x0, y0] = rows[1], [x1, y1] = rows[2];
    return {kind: 'choice', html: `${VIZ.tableInOut(rows, {head: ['x', 'y']})}<div class="sub">Which rule gives y from x?</div>`,
      say: 'Look at the table. Which rule turns each x number into its y number?', ans: right, choices: shuffle([...set.keys()].map(l => ({v: l, l}))), cls: 'ccw',
      hint: ccHint([['', 'Try one row:', `Row 2: x is ${x0} and y is ${y0}. Put ${x0} in each rule. Which rules give ${y0}?`],
        ['', 'Try another row:', `Row 3: x is ${x1} and y is ${y1}. Test the rules that are left. Which rule works on every row?`]]),
      label: `pat5 rule ${a} ${b} ${xs.join(',')}`};
  }
  const a = R(2, 5), b = R(1, 9), x = R(2, 9);
  return {kind: 'num', max: 2, html: `<p class="story">Rule: ${ccRule(a, b)}</p><div class="sub">When x is ${x}, what is y?</div><div class="eq">y = ${SLOT}</div>`,
    say: `The rule is y equals ${a} times x plus ${b}. When x is ${x}, what is y?`, ans: String(a * x + b),
    hint: ccHint([['', 'Put in x:', `Replace x with ${x}: ${a} × ${x} + ${b}.`], ['', 'Multiply first:', `${a} × ${x} = ? Then add ${b}.`]]),
    label: `pat5 eval ${a} ${b} ${x}`};
}

/* ---- story 8: money, recipes scaled by 1/2 or 3, distances ---- */
const ccMoney = c => `$${Math.floor(c / 100)}.${String(c % 100).padStart(2, '0')}`;
const ccNum = c => (c / 100).toFixed(2);
const CC_THING = ['notebook', 'pen', 'book', 'toy car', 'kite', 'puzzle', 'ball', 'poster', 'folder', 'sticker pack'];
const CC_FOOD = ['flour', 'sugar', 'oats', 'milk', 'rice', 'raisins'];
function ccStory8() {
  const f = rnd(), who = pick([S.name || 'Sam', petN(), 'Ava', 'Leo', 'Mia']);
  const story = (text, spoken, more) => ({kind: 'num', auto: true, say: spoken || text, ...more});
  const cents = (lo, hi) => { let c; do c = R(lo, hi); while (c % 100 == 0); return c; };
  if (f < .3) { // money
    const [t1, t2] = shuffle(CC_THING).slice(0, 2), type = f < .12 ? 'total' : f < .22 ? 'change' : 'diff';
    if (type == 'total') {
      const p1 = cents(105, 899), p2 = cents(105, 899), text = `${who} buys a ${t1} for ${ccMoney(p1)} and a ${t2} for ${ccMoney(p2)}. How much money does ${who} spend in all?`;
      return story(text, null, {pad: 'dec', eq: 'value', html: `<p class="story">${words(text)}</p><div class="eq">$ ${SLOT}</div>`, ans: ccDec(p1 + p2, 2),
        hint: ccLead(stepsAdd(ccNum(p1), ccNum(p2)), 'Add the two prices. Line up the decimal points.'), label: `story8 total ${p1}+${p2}`});
    }
    if (type == 'change') {
      const bill = pick([5, 10, 20]), p = cents(105, bill * 100 - 55), text = `A ${t1} costs ${ccMoney(p)}. ${who} pays with a $${bill} bill. How much change does ${who} get back?`;
      return story(text, null, {pad: 'dec', eq: 'value', html: `<p class="story">${words(text)}</p><div class="eq">$ ${SLOT}</div>`, ans: ccDec(bill * 100 - p, 2),
        hint: ccLead(stepsSub(String(bill), ccNum(p)), 'Change is what is left of the money paid. Subtract the price from it.'), label: `story8 change ${bill} ${p}`});
    }
    let p1 = cents(205, 999), p2 = cents(105, 899);
    if (p1 <= p2) [p1, p2] = [p2 + 100 + R(1, 99), p1];
    while (p1 % 100 == 0) p1++;
    const text = `A ${t1} costs ${ccMoney(p1)}. A ${t2} costs ${ccMoney(p2)}. How much more does the ${t1} cost than the ${t2}?`;
    return story(text, null, {pad: 'dec', eq: 'value', html: `<p class="story">${words(text)}</p><div class="eq">$ ${SLOT}</div>`, ans: ccDec(p1 - p2, 2),
      hint: ccLead(stepsSub(ccNum(p1), ccNum(p2)), '"How much more" means subtract the smaller price from the bigger one.'), label: `story8 diff ${p1}-${p2}`});
  }
  if (f < .58) { // recipes: half, or 3 times as much
    const half = f < .44, food = pick(CC_FOOD);
    let a, b;
    do {b = R(2, 8); a = R(1, b - 1)} while (ccGcd(a, b) > 1 || (!half && (3 * a) % b == 0));
    const text = half ? `A recipe uses ${a}/${b} cup of ${food}. ${who} makes half of the recipe. How many cups of ${food} does ${who} need?`
      : `A recipe uses ${a}/${b} cup of ${food}. ${who} makes 3 times the recipe. How many cups of ${food} does ${who} need?`;
    const spoken = text.replace(`${a}/${b}`, fcSay(a, b).replace(/^1 /, 'one ')); // "3 fourths"
    return story(text, spoken, {pad: 'frac', eq: 'value', html: `<p class="story">${words(text)}</p><div class="eq">${SLOT_FRAC} cups</div>`, ans: half ? ccFr(a, 2 * b) : ccFr(3 * a, b),
      hint: stepsStory(half ? ['Half of the recipe means half of the food: multiply by 1/2.', `Multiply the tops: ${a} × 1 = ? Multiply the bottoms: ${b} × 2 = ?`, 'Can the top and the bottom both be divided by the same number? Write it in simplest form. What is left?']
        : ['3 times the recipe means 3 times the food: multiply by 3.', `Multiply the top: 3 × ${a} = ? Keep ${b} on the bottom.`, 'Can the top and the bottom both be divided by the same number? Write it in simplest form. What is left?']),
      label: `story8 ${half ? 'half' : 'triple'} ${a}/${b}`});
  }
  if (f < .86) { // decimal distances
    if (f < .68) {
      let t; do t = R(11, 49); while (t % 10 == 0);
      const n = R(3, 6), text = `A trail is ${ccDec(t, 1)} km long. ${who} walks the trail ${n} times. How many km does ${who} walk?`;
      return story(text, text.replace(ccDec(t, 1), ccDec(t, 1).replace('.', ' point ')), {pad: 'dec', eq: 'value', html: `<p class="story">${words(text)}</p><div class="eq">${SLOT} km</div>`, ans: ccDec(t * n, 1),
        hint: stepsStory([`${n} trips means ${n} groups of ${ccDec(t, 1)} km: multiply.`, `Leave out the point for now: ${t} × ${n} = ?`, `Put the point back. ${ccDec(t, 1)} has 1 digit after the point, so the answer does too. Where does the point go?`]),
        label: `story8 km ${ccDec(t, 1)} x ${n}`});
    }
    if (f < .78) {
      const x = R(11, 59), y = cents(101, 499), sx = ccDec(x, 1), sy = ccDec(y, 2);
      const text = `${who} ran ${sx} km on Monday and ${sy} km on Tuesday. How many km did ${who} run in all?`;
      return story(text, text.replace(sx, sx.replace('.', ' point ')).replace(sy, sy.replace('.', ' point ')), {pad: 'dec', eq: 'value', html: `<p class="story">${words(text)}</p><div class="eq">${SLOT} km</div>`, ans: ccDec(x * 10 + y, 2),
        hint: ccLead(stepsAdd(sx, sy), 'Add the two distances. Line up the decimal points.'), label: `story8 add ${sx}+${sy}`});
    }
    let T, y;
    do {T = R(40, 120); y = cents(101, 399)} while (T * 10 <= y);
    const sT = ccDec(T, 1), sy = ccDec(y, 2), text = `A path is ${sT} km long. ${who} has walked ${sy} km of it. How many km are left?`;
    return story(text, text.replace(sT, sT.replace('.', ' point ')).replace(sy, sy.replace('.', ' point ')), {pad: 'dec', eq: 'value', html: `<p class="story">${words(text)}</p><div class="eq">${SLOT} km</div>`, ans: ccDec(T * 10 - y, 2),
      hint: ccLead(stepsSub(sT, sy), '"Left" means subtract what is done from the whole. Line up the decimal points.'), label: `story8 sub ${sT}-${sy}`});
  }
  // distances with fractions
  let p;
  do p = ccPair(); while (p.L > 24);
  let {a, b, c, d, L} = p;
  if (f < .93) {
    const n = a * (L / b) + c * (L / d), text = `${who} hikes ${a}/${b} mile to the lake and then ${c}/${d} mile to the cave. How many miles is that in all?`;
    return story(text, `${who} hikes ${fcSay(a, b)} of a mile to the lake and then ${fcSay(c, d)} of a mile to the cave. How many miles is that in all?`,
      {pad: 'frac', eq: 'value', html: `<p class="story">${words(text)}</p><div class="eq">${SLOT_FRAC} miles</div>`, ans: ccFr(n, L), hint: stepsCommonDen(a, b, c, d, '+'), label: `story8 fadd ${a}/${b}+${c}/${d}`});
  }
  if (a * d < c * b) [a, b, c, d] = [c, d, a, b];
  const n = a * (L / b) - c * (L / d), text = `The red trail is ${a}/${b} mile long. The blue trail is ${c}/${d} mile long. How much longer is the red trail?`;
  return story(text, `The red trail is ${fcSay(a, b)} of a mile long. The blue trail is ${fcSay(c, d)} of a mile long. How much longer is the red trail, in miles?`,
    {pad: 'frac', eq: 'value', html: `<p class="story">${words(text)}</p><div class="eq">${SLOT_FRAC} miles</div>`, ans: ccFr(n, L), hint: stepsCommonDen(a, b, c, d, '−'), label: `story8 fsub ${a}/${b}-${c}/${d}`});
}

// ---- P2-13 Sky City ----
/* CURRICULUM M-6a: the stops of Sky City (m_sky), all names start with sky.
   ratio 1   ratio from dots or a sentence (a : b, a to b), equal-ratio table with one blank
   ratio 2   unit price, unit rate (miles per hour ...), which is the better buy
   ratio 3   percent of a number (10, 20, 25, 50, 75, then any multiple of 5), find the whole from a part and a percent
   ratio 4   fraction / decimal / percent: match, and convert (denominators 2, 4, 5, 10, 20, 25, 50, 100)
   int 1     integers -10..10: tap on the line, compare, order three
   int 2     absolute value, opposite, distance between two integers
   int 3     add and subtract integers -20..20 (number-line hint)
   fop 7     fraction / fraction and mixed numbers, simplest form
   Every label holds the numbers of its question, so tools/test.js can rebuild the right answer from the label.
   Negative numbers are shown with the minus sign U+2212; the answer text of a negative number is -5 (num pad 'neg', the +/- key). */

const skyGcd = (a, b) => (b ? skyGcd(b, a % b) : a);
const skyFr = (n, d) => { const g = skyGcd(n, d); return `${n / g}/${d / g}`; }; // lowest terms as text
const skyN = v => (v < 0 ? '−' + -v : '' + v); // shown number
const skySay = v => (v < 0 ? 'negative ' + -v : '' + v); // spoken number
const skySpeak = s => ST.spk(s.replace(/−(\d)/g, 'negative $1'));
// a step hint from [picture, head, text] rows; plain text only, the last row has a "?"
const skyHint = rows => ({k: 'steps', w: 0, steps: rows.map(([pic, head, text]) => ST.step(pic || '', head, text, null, skySpeak((head ? head + ' ' : '') + text)))});
const skyMoney = c => '$' + (c % 100 ? (c / 100).toFixed(2) : String(c / 100)); // cents -> $7.50, $12
const skyMoneySay = c => `${Math.floor(c / 100)} dollar${Math.floor(c / 100) == 1 ? '' : 's'}` + (c % 100 ? ` and ${c % 100} cents` : '');
const skyDec = c => { const s = String(c).padStart(3, '0'), w = s.slice(0, -2), f = s.slice(-2).replace(/0+$/, ''); return f ? `${w}.${f}` : w; }; // hundredths as a whole number -> 7.5, 12
const skyPairs = [[['red', 'red'], ['blue', 'blue']], [['cat', 'cats'], ['dog', 'dogs']], [['boy', 'boys'], ['girl', 'girls']], [['apple', 'apples'], ['pear', 'pears']], [['pen', 'pens'], ['pencil', 'pencils']], [['circle', 'circles'], ['square', 'squares']]];
const skyCnt = (n, w) => `${n} ${n == 1 ? w[0] : w[1]}`; // 1 cat, 3 cats
const skyPl = w => w[1];

/* ---- ratio 1 ---- */
function skyCoprime(lo, hi, sum) {
  let a, b;
  do {a = R(lo, hi); b = R(lo, hi)} while (a == b || skyGcd(a, b) > 1 || a + b > sum);
  return [a, b];
}
// four ratio choices around the right pair [p, q]; no wrong one is an equal ratio
function skyRatioChoices(p, q, to) {
  const f = (x, y) => ({v: `${x}:${y}`, l: to ? `${x} to ${y}` : `${x} : ${y}`});
  const pool = [[q, p], [p, p + q], [q, p + q], [p + q, p], [p + 1, q], [p, q + 1], [p + q, q]]
    .filter(([x, y]) => x * q != y * p);
  const seen = new Set([`${p}:${q}`]), out = [f(p, q)];
  for (const [x, y] of shuffle(pool)) {
    if (out.length == 4) break;
    if (seen.has(`${x}:${y}`)) continue;
    seen.add(`${x}:${y}`); out.push(f(x, y));
  }
  return shuffle(out);
}
function skyRatio1() {
  const r = rnd(), to = coin();
  if (r < .35) { // dots: blue then orange (VIZ.tenFrame: the first counters are the first colour, the last b the second)
    const [a, b] = skyCoprime(1, 9, 18), bo = coin();
    const p = bo ? a : b, q = bo ? b : a, word = bo ? 'blue to orange' : 'orange to blue';
    const pic = VIZ.tenFrame(a + b, a + b > 10 ? 20 : 10, {b});
    return {kind: 'choice', cls: 'skyr', ans: `${p}:${q}`, choices: skyRatioChoices(p, q, to),
      html: `${pic}<div class="sub">What is the ratio of ${word} dots?</div>`,
      say: `Look at the dots. What is the ratio of ${word} dots? Say the first one, then the second one.`,
      hint: skyHint([[pic, 'Count each colour:', `How many blue dots? How many orange dots? A ratio compares two amounts.`],
        ['', 'Put them in order:', `The ratio of ${word} dots has the ${bo ? 'blue' : 'orange'} number first and the ${bo ? 'orange' : 'blue'} number second. Do not add them. Which choice is it?`]]),
      label: `ratio1 dots ${a} ${b} ${bo ? 'bo' : 'ob'}`};
  }
  if (r < .65) { // a sentence
    const [x, y] = pick(skyPairs), [a, b] = skyCoprime(1, 12, 20), xy = coin();
    const p = xy ? a : b, q = xy ? b : a;
    return {kind: 'choice', cls: 'skyr', ans: `${p}:${q}`, choices: skyRatioChoices(p, q, to),
      html: `<div class="sub">There are ${skyCnt(a, x)} and ${skyCnt(b, y)}.</div><div class="sub">What is the ratio of ${skyPl(xy ? x : y)} to ${skyPl(xy ? y : x)}?</div>`,
      say: `There are ${skyCnt(a, x)} and ${skyCnt(b, y)}. What is the ratio of ${skyPl(xy ? x : y)} to ${skyPl(xy ? y : x)}?`,
      hint: skyHint([['', 'Which comes first?', `"${skyPl(xy ? x : y)} to ${skyPl(xy ? y : x)}" means the number of ${skyPl(xy ? x : y)} goes first and the number of ${skyPl(xy ? y : x)} goes second.`],
        ['', 'Write them in order:', `Find the number of each in the sentence. Do not add them up. Which choice has the numbers in that order?`]]),
      label: `ratio1 sent ${a} ${b} ${xy ? 'xy' : 'yx'}`};
  }
  // equal ratios with one blank
  const [x, y] = pick(skyPairs), [a, b] = skyCoprime(1, 9, 99), k = R(2, 9), first = rnd() < .3;
  const left = `${a} : ${b}`, right = first ? `${SLOT} : ${b * k}` : `${a * k} : ${SLOT}`;
  const known = first ? b : a, want = first ? a : b, kn = first ? b * k : a * k;
  return {kind: 'num',
    html: `<div class="sub">${skyCnt(a, x)} to ${skyCnt(b, y)}. Make an equal ratio.</div><div class="eq">${left} = ${right}</div>`,
    say: `${skyCnt(a, x)} to ${skyCnt(b, y)}. Make an equal ratio. ${first ? `What number goes with ${b * k} ${skyPl(y)}?` : `What number goes with ${a * k} ${skyPl(x)}?`}`,
    ans: String(first ? a * k : b * k),
    hint: skyHint([['', 'Same multiplier:', `${known} gets bigger to make ${kn}. What number do you multiply ${known} by?`],
      ['', 'Do it to both:', `${known} × ${kn / known} = ${kn}. A ratio stays equal when both numbers are multiplied by the same number. Do the same to ${want}: ${want} × ${kn / known} = ?`]]),
    label: `ratio1 tbl ${a} ${b} ${first ? '?' : a * k} ${first ? b * k : '?'}`};
}

/* ---- ratio 2 ---- */
const skyItems = [['apple', 'apples'], ['pencil', 'pencils'], ['ball', 'balls'], ['book', 'books'], ['pen', 'pens']];
const skyRates = [
  {a: 'miles', b: 'hours', one: 'hour', w: (t, n) => `A car goes ${t} miles in ${n} hours.`, lo: 20, hi: 80},
  {a: 'pages', b: 'minutes', one: 'minute', w: (t, n) => `Mia reads ${t} pages in ${n} minutes.`, lo: 2, hi: 9},
  {a: 'laps', b: 'minutes', one: 'minute', w: (t, n) => `A runner does ${t} laps in ${n} minutes.`, lo: 2, hi: 9},
  {a: 'words', b: 'minutes', one: 'minute', w: (t, n) => `Leo types ${t} words in ${n} minutes.`, lo: 20, hi: 60}];
function skyRatio2() {
  const r = rnd();
  if (r < .3) { // price of one
    const [s, pl] = pick(skyItems), n = R(2, 9), u = 5 * R(10, 199), tot = u * n; // u: 50 to 995 cents, in 5s
    return {kind: 'num', pad: 'dec', eq: 'value', max: 3,
      html: `<div class="sub">${n} ${pl} cost ${skyMoney(tot)}.</div><div class="sub">How much does 1 ${s} cost?</div><div class="eq">$ ${SLOT}</div>`,
      say: `${n} ${pl} cost ${skyMoneySay(tot)}. How much does 1 ${s} cost?`, ans: skyDec(u),
      hint: skyHint([['', 'Share it equally:', `The cost of 1 ${s} is the total split into ${n} equal shares. That is division.`],
        ['', 'Divide:', `${skyMoney(tot)} ÷ ${n} = ? Change dollars to cents if it helps, then put the point back.`]]),
      label: `ratio2 unit ${n} ${tot}`};
  }
  if (r < .6) { // a rate: per hour, per minute
    const c = pick(skyRates), n = R(2, 8), u = R(c.lo, c.hi), tot = u * n;
    return {kind: 'num', max: 3,
      html: `<div class="sub">${c.w(tot, n)}</div><div class="sub">How many ${c.a} in 1 ${c.one}?</div><div class="eq">${SLOT} ${c.a} per ${c.one}</div>`,
      say: `${c.w(tot, n)} How many ${c.a} in 1 ${c.one}?`, ans: String(u),
      hint: skyHint([['', 'Unit rate:', `A unit rate tells how many ${c.a} in just 1 ${c.one}. Share the ${tot} ${c.a} equally over ${n} ${c.b}.`],
        ['', 'Divide:', `${tot} ÷ ${n} = ?`]]),
      label: `ratio2 rate ${tot} ${n} ${c.a}`};
  }
  // better buy: two sizes of the same thing, the lower price for one wins
  const [s, pl] = pick(skyItems);
  let n1, n2, u1, u2;
  do {n1 = R(2, 9); n2 = R(2, 9); u1 = 5 * R(8, 80); u2 = 5 * R(8, 80)} while (n1 == n2 || u1 == u2 || Math.abs(u1 - u2) < 10);
  const A = `${n1} ${pl} for ${skyMoney(n1 * u1)}`, B = `${n2} ${pl} for ${skyMoney(n2 * u2)}`;
  return {kind: 'choice', cls: 'skyb', ans: u1 < u2 ? 'a' : 'b', choices: [{v: 'a', l: 'Deal A'}, {v: 'b', l: 'Deal B'}],
    html: `<div class="sub">Which is the better buy? It costs less for 1 ${s}.</div><div class="sub">A: ${A}</div><div class="sub">B: ${B}</div>`,
    say: `Which is the better buy? It costs less for 1 ${s}. Deal A, ${n1} ${pl} for ${skyMoneySay(n1 * u1)}. Deal B, ${n2} ${pl} for ${skyMoneySay(n2 * u2)}.`,
    hint: skyHint([['', 'Price of one:', `Find the cost of 1 ${s} for each. Divide each price by its number of ${pl}.`],
      ['', 'Compare:', `${skyMoney(n1 * u1)} ÷ ${n1} = ? and ${skyMoney(n2 * u2)} ÷ ${n2} = ? Which is less?`]]),
    label: `ratio2 buy ${n1} ${n1 * u1} ${n2} ${n2 * u2}`};
}

/* ---- ratio 3 ---- */
const skyPctEarly = [10, 20, 25, 50, 75];
function skyRatio3() {
  const p = rnd() < .5 ? pick(skyPctEarly) : 5 * R(1, 19), g = skyGcd(100, p), a = p / g, b = 100 / g; // p% = a/b
  let w; // the whole: a multiple of b so that the part is whole, 20 to 400
  do {w = b * R(1, Math.floor(400 / b))} while (w < 20);
  const part = w * p / 100;
  if (rnd() < .7) {
    const rows = [['', 'Percent means out of 100:', `${p}% = ${p}/100 = ${a}/${b}.`],
      ['', a == 1 ? 'One part:' : 'One part, then more:', a == 1 ? `Find ${a}/${b} of ${w}: divide ${w} by ${b}. ${w} ÷ ${b} = ?` : `Divide ${w} by ${b} to find 1/${b} of it. Then multiply that by ${a}. ${w} ÷ ${b} = ?`]];
    if (a > 1) rows.push(['', 'Times the top:', `Multiply your answer by ${a}. What do you get?`]);
    return {kind: 'num', max: 3,
      html: `<div class="sub">Find the part.</div><div class="eq">${p}% of ${w} = ${SLOT}</div>`,
      say: `What is ${p} percent of ${w}?`, ans: String(part), hint: skyHint(rows), label: `ratio3 part ${p} ${w}`};
  }
  const rows = [['', 'Percent means out of 100:', `${p}% = ${a}/${b}. So ${part} is ${a}/${b} of the whole.`]];
  if (a == 1) rows.push(['', 'Whole = all the parts:', `${part} is 1 of ${b} equal parts. The whole is ${b} of them. ${part} × ${b} = ?`]);
  else rows.push(['', 'One part:', `${part} is ${a} of ${b} equal parts. 1 part is ${part} ÷ ${a} = ?`], ['', 'The whole:', `The whole is ${b} parts. Multiply the size of 1 part by ${b}. What do you get?`]);
  return {kind: 'num', max: 3,
    html: `<div class="sub">${part} is ${p}% of a number. What is the number?</div><div class="eq">${p}% of ${SLOT} = ${part}</div>`,
    say: `${part} is ${p} percent of a number. What is the number?`, ans: String(w), hint: skyHint(rows), label: `ratio3 whole ${p} ${part}`};
}

/* ---- ratio 4 ---- */
const skyDen = [2, 4, 5, 10, 20, 25, 50, 100];
const skyBig = {20: 'twentieth', 25: 'twenty-fifth', 50: 'fiftieth', 100: 'hundredth'};
const skyFcSay = (n, d) => (skyBig[d] ? `${n} ${skyBig[d]}${n == 1 ? '' : 's'}` : fcSay(n, d)); // spoken fraction, bottoms to 100
// a proper fraction n/d with d from skyDen (h100: 100 allowed)
function skyProper(h100) {
  const d = pick(h100 ? skyDen : skyDen.slice(0, -1)); return [R(1, d - 1), d];
}
const skyPctOf = (n, d) => n * 100 / d;
const skyDecOf = (n, d) => skyDec(skyPctOf(n, d)); // text of n/d as a decimal
function skyRatio4() {
  const r = rnd();
  if (r < .25) { // match four pairs
    const mode = pick(['fp', 'fd', 'dp']), seen = new Set(), items = [], opts = [];
    while (items.length < 4) {
      const [n, d] = skyProper(mode != 'fp'), pc = skyPctOf(n, d);
      if (seen.has(pc)) continue;
      seen.add(pc);
      items.push(mode == 'dp' ? {v: String(pc), l: skyDecOf(n, d)} : {v: String(pc), l: fcFr(n, d), h: true});
      opts.push({v: String(pc), l: mode == 'fd' ? skyDecOf(n, d) : pc + '%'});
    }
    const ans = items.map(c => c.v).sort().join('|'), names = {fp: ['fractions', 'percent'], fd: ['fractions', 'decimal'], dp: ['decimals', 'percent']}[mode];
    const sorted = items.slice().sort((x, y) => x.v - y.v);
    return {kind: 'match', items: sorted, opts: shuffle(opts), ans,
      html: `<div class="sub">Match each of the ${names[0]} to the same amount as a ${names[1]}.</div>`,
      say: `Match each of the ${names[0]} to the same amount written as a ${names[1]}.`,
      hint: skyHint([['', 'One at a time:', mode == 'dp' ? 'Percent means out of 100. A decimal with two places is hundredths, so 0.25 is 25 out of 100. Start with the one you know best.' : 'Make the bottom of the fraction 100 (or 10) by multiplying top and bottom by the same number. Start with the one you know best.'],
        ['', 'Then the rest:', `The top of the fraction out of 100 is the percent, and the same number written with a point is the decimal. Which pairs are left?`]]),
      label: `ratio4 match ${mode} ${sorted.map(c => c.v).join(',')}`};
  }
  const v = pick(['fp', 'fd', 'dp', 'pd', 'pf']);
  if (v == 'fp') {
    const [n, d] = skyProper(false), m = 100 / d;
    return {kind: 'num', max: 3,
      html: `<div class="sub">Write the fraction as a percent.</div><div class="eq">${fcFr(n, d)} = ${SLOT} %</div>`,
      say: `Write ${skyFcSay(n, d)} as a percent.`, ans: String(skyPctOf(n, d)),
      hint: skyHint([['', 'Out of 100:', `Percent means out of 100. Make the bottom 100: ${d} × ? = 100.`], ['', 'Same to the top:', `Multiply the top, ${n}, by the same number. ${n} × ${m} = ? So the fraction is that many out of 100.`]]),
      label: `ratio4 fp ${n}/${d}`};
  }
  if (v == 'fd') {
    const [n, d] = skyProper(true);
    return {kind: 'num', pad: 'dec', eq: 'value', max: 3,
      html: `<div class="sub">Write the fraction as a decimal.</div><div class="eq">${fcFr(n, d)} = ${SLOT}</div>`,
      say: `Write ${skyFcSay(n, d)} as a decimal.`, ans: skyDecOf(n, d),
      hint: skyHint([['', 'Tenths or hundredths:', d == 100 ? 'The bottom is 100, so the top is the number of hundredths.' : `Make the bottom 10 or 100: ${d} × ? = 10 or 100.`],
        ['', 'Write it with a point:', `Multiply the top by the same number. Two digits after the point mean hundredths, one digit means tenths. What decimal is it?`]]),
      label: `ratio4 fd ${n}/${d}`};
  }
  if (v == 'dp') {
    const c = R(1, 99), dtext = skyDec(c);
    return {kind: 'num', max: 3,
      html: `<div class="sub">Write the decimal as a percent.</div><div class="eq">${dtext} = ${SLOT} %</div>`,
      say: `Write ${dtext} as a percent.`, ans: String(c),
      hint: skyHint([['', 'Hundredths:', `Write ${dtext} as hundredths. 0.5 is the same as 0.50.`], ['', 'Out of 100:', `A decimal in hundredths is that many out of 100. Percent means out of 100. What percent is it?`]]),
      label: `ratio4 dp ${dtext}`};
  }
  if (v == 'pd') {
    const c = R(1, 99);
    return {kind: 'num', pad: 'dec', eq: 'value', max: 3,
      html: `<div class="sub">Write the percent as a decimal.</div><div class="eq">${c}% = ${SLOT}</div>`,
      say: `Write ${c} percent as a decimal.`, ans: skyDec(c),
      hint: skyHint([['', 'Out of 100:', `${c}% means ${c} out of 100, or ${c}/100.`], ['', 'Hundredths:', `${c} hundredths is written with two places after the point. What decimal is it?`]]),
      label: `ratio4 pd ${c}`};
  }
  const [n, d] = skyProper(false), pc = skyPctOf(n, d), red = skyFr(n, d);
  return {kind: 'num', pad: 'frac',
    html: `<div class="sub">Write the percent as a fraction in simplest form.</div><div class="eq">${pc}% = ${SLOT_FRAC}</div>`,
    say: `Write ${pc} percent as a fraction in simplest form.`, ans: red,
    hint: skyHint([['', 'Over 100:', `${pc}% is ${pc} out of 100, or ${pc}/100.`], ['', 'Simplest form:', `Find a number that goes into both ${pc} and 100. Divide the top and the bottom by it. Can you go further?`]]),
    label: `ratio4 pf ${pc}`};
}

/* ---- int 1 ---- */
const skyLineO = o => VIZ.numLine(Object.assign({min: -10, max: 10, labels: [-10, -5, 0, 5, 10]}, o));
function skyInt1() {
  const r = rnd();
  if (r < .3) { // tap a number
    let x;
    do {x = R(-9, 9)} while (x == 0 || x % 5 == 0);
    let pts;
    for (;;) {
      pts = [x];
      for (let k = 0; k < 40 && pts.length < 5; k++) { const v = R(-10, 10); if (pts.every(p => Math.abs(p - v) >= 4)) pts.push(v); }
      if (pts.length >= 4) break;
    }
    return {kind: 'tap', ans: String(x), ansSay: skySay(x),
      html: `${skyLineO({tapValues: shuffle(pts)})}<div class="sub">Tap ${skyN(x)} on the number line.</div>`,
      say: `Tap ${skySay(x)} on the number line.`,
      hint: skyHint([['', 'Find zero:', `Numbers to the right of 0 are positive. Numbers to the left of 0 are negative.`],
        ['', 'Count:', `Start at 0 and count ${qN(Math.abs(x), 'step')} to the ${x < 0 ? 'left' : 'right'}. Which spot is it?`]]),
      label: `int1 tap ${x}`};
  }
  if (r < .7) {
    let a, b;
    do {a = R(-10, 10); b = R(-10, 10)} while (a == b || (a >= 0 && b >= 0));
    const m = rnd();
    if (m < .5) { // compare
      return {kind: 'choice', cls: 'syms', ans: a < b ? '<' : '>', choices: FC_SYM.map(c => ({...c})),
        html: `<div class="sub">Which is true?</div><div class="eq">${skyN(a)} ${SLOT} ${skyN(b)}</div>${skyLineO({marks: [a, b]})}`,
        say: `Is ${skySay(a)} less than, equal to, or greater than ${skySay(b)}?`,
        hint: skyHint([['', 'Use the line:', `On a number line, the numbers get bigger as you go right.`], ['', 'Which is more right?', `Find ${skyN(a)} and ${skyN(b)}. The one farther to the right is greater. Which is it?`]]),
        label: `int1 cmp ${a} ${b}`};
    }
    const cold = m < .75;
    return {kind: 'choice', cls: 'skyb', ans: String(cold ? Math.min(a, b) : Math.max(a, b)),
      choices: shuffle([a, b].map(v => ({v: String(v), l: skyN(v) + '°'}))),
      html: `<div class="sub">Two cities have these temperatures.</div><div class="sub">Which is ${cold ? 'colder' : 'warmer'}?</div>`,
      say: `One city is ${skySay(a)} ${qW(a, 'degree')}. Another is ${skySay(b)} ${qW(b, 'degree')}. Which is ${cold ? 'colder' : 'warmer'}?`,
      hint: skyHint([['', 'A thermometer:', `Think of a thermometer standing up. Higher up means warmer. Below zero is under 0.`],
        ['', 'Compare:', `Which number is ${cold ? 'lower' : 'higher'} on the number line? A negative number is smaller when it is farther from 0.`]]),
      label: `int1 ${cold ? 'cold' : 'warm'} ${a} ${b}`};
  }
  // order three
  let v;
  do {v = [R(-10, 10), R(-10, 10), R(-10, 10)]} while (new Set(v).size < 3 || v.every(x => x >= 0));
  const up = rnd() < .7, asc = [...v].sort((x, y) => x - y), ans = (up ? asc : asc.slice().reverse()).map(String);
  let items;
  do {items = shuffle(v.map(x => ({v: String(x), l: skyN(x)})))} while (items.map(i => i.v).join() == ans.join());
  return {kind: 'order', items, ans,
    html: `<div class="sub">Tap the numbers in order from ${up ? 'least to greatest' : 'greatest to least'}.</div>`,
    say: `Tap the numbers in order from ${up ? 'least to greatest' : 'greatest to least'}.`,
    hint: skyHint([['', 'Picture the line:', `Negative numbers are left of 0. The bigger the number after the minus sign, the farther left, and the smaller the number.`],
      ['', 'Order them:', `Which one is farthest to the ${up ? 'left' : 'right'}? Tap it first.`]]),
    label: `int1 ord ${v.join(',')} ${up ? 'up' : 'down'}`};
}

/* ---- int 2 ---- */
function skyNz(lo, hi) { let v; do {v = R(lo, hi)} while (v == 0); return v; }
function skyInt2() {
  const r = rnd();
  if (r < .35) {
    const x = skyNz(-15, 15), m = Math.max(10, Math.abs(x) + 1), pic = VIZ.numLine({min: -m, max: m, marks: [x]});
    return {kind: 'num', pad: 'neg', max: 2,
      html: `${pic}<div class="sub">How far is it from 0?</div><div class="eq">|${skyN(x)}| = ${SLOT}</div>`,
      say: `What is the absolute value of ${skySay(x)}?`, ans: String(Math.abs(x)),
      hint: skyHint([[pic, 'Distance from 0:', `Absolute value is how far a number is from 0 on the number line. Distance is never negative.`],
        ['', 'Count:', `How many steps is ${skyN(x)} from 0? That is |${skyN(x)}|.`]]),
      label: `int2 abs ${x}`};
  }
  if (r < .65) {
    const x = skyNz(-20, 20), pic = Math.abs(x) <= 10 ? VIZ.numLine({min: -10, max: 10, marks: [x]}) : '';
    return {kind: 'num', pad: 'neg', max: 2,
      html: `${pic}<div class="sub">What is the opposite of ${skyN(x)}?</div><div class="eq">${SLOT}</div>`,
      say: `What is the opposite of ${skySay(x)}?`, ans: String(-x),
      hint: skyHint([['', 'Same distance:', `Opposites are the same distance from 0, but on different sides of 0.`],
        ['', 'Other side:', `${skyN(x)} is ${qN(Math.abs(x), 'step')} ${x < 0 ? 'left' : 'right'} of 0. Go ${qN(Math.abs(x), 'step')} ${x < 0 ? 'right' : 'left'} of 0. Where do you land?`]]),
      label: `int2 opp ${x}`};
  }
  let a, b;
  do {a = R(-10, 10); b = R(-10, 10)} while (a >= b || b - a < 2 || (a >= 0 && rnd() < .8));
  const pic = VIZ.numLine({min: -10, max: 10, marks: [a, b]});
  return {kind: 'num', pad: 'neg', max: 2,
    html: `${pic}<div class="sub">How far apart are ${skyN(a)} and ${skyN(b)}?</div><div class="eq">${SLOT} steps</div>`,
    say: `How many steps apart are ${skySay(a)} and ${skySay(b)} on the number line?`, ans: String(b - a),
    hint: skyHint([[pic, 'Count the gap:', `Start at ${skyN(a)} and count the steps to ${skyN(b)}.`],
      ['', a < 0 && b > 0 ? 'Cross zero:' : 'Same side of 0:', a < 0 && b > 0 ? `Count ${qN(Math.abs(a), 'step')} to 0, then ${b} more ${qW(b, 'step')}. Add the two parts. What do you get?` : `Take the smaller distance from 0 away from the bigger one. What is the gap?`]]),
    label: `int2 dist ${a} ${b}`};
}

/* ---- int 3 ---- */
function skyInt3() {
  let a, b, op, res;
  for (;;) {
    a = R(-20, 20); b = R(-20, 20); op = coin() ? '+' : '-';
    res = op == '+' ? a + b : a - b;
    if (a && b && Math.abs(res) <= 20 && !(a > 0 && b > 0 && rnd() < .7)) break;
  }
  const shownB = b < 0 ? `(${skyN(b)})` : skyN(b), mv = op == '+' ? b : -b;
  const lo = Math.min(a, res, 0) - 2, hi = Math.max(a, res, 0) + 2;
  const start = VIZ.numLine({min: lo, max: hi, marks: [a]}), hop = VIZ.numLine({min: lo, max: hi, marks: [a], hops: [[a, a + mv]]});
  const rule = op == '+' ? (b > 0 ? 'Adding a positive number moves right.' : 'Adding a negative number moves left.')
    : (b > 0 ? 'Subtracting a positive number moves left.' : 'Subtracting a negative number is the same as adding. It moves right.');
  return {kind: 'num', pad: 'neg', max: 2,
    html: `<div class="eq">${skyN(a)} ${op == '+' ? '+' : '−'} ${shownB} = ${SLOT}</div>`,
    say: `${skySay(a)} ${op == '+' ? 'plus' : 'minus'} ${skySay(b)}. What is the answer?`, ans: String(res),
    hint: skyHint([[start, 'Start:', `Start at ${skyN(a)} on the number line.`], ['', 'Which way?', rule + ` Move ${qN(Math.abs(b), 'step')}.`],
      [hop, 'Hop:', `Go ${qN(Math.abs(b), 'step')} ${mv < 0 ? 'left' : 'right'} from ${skyN(a)}. Where do you land?`]]),
    label: `int3 ${a} ${op} ${b}`};
}

/* ---- fop 7 ---- */
function skyFrac() { // a proper fraction in lowest terms, bottom 2 to 9
  let a, b;
  do {b = R(2, 9); a = R(1, b - 1)} while (skyGcd(a, b) > 1);
  return [a, b];
}
function skyFop7() {
  const f = rnd(), kinds = f < .4 ? [0, 0] : f < .65 ? [1, 0] : f < .85 ? [0, 1] : [1, 1]; // 1 = mixed number
  let A, B, n, d;
  for (;;) {
    const fa = skyFrac(), fb = skyFrac();
    A = {w: kinds[0] ? R(1, 3) : 0, a: fa[0], b: fa[1]}; B = {w: kinds[1] ? R(1, 3) : 0, a: fb[0], b: fb[1]};
    const n1 = A.w * A.b + A.a, n2 = B.w * B.b + B.a;
    n = n1 * B.b; d = A.b * n2;
    const g = skyGcd(n, d); n /= g; d /= g;
    if (d > 1 && n <= 60 && !(A.a == B.a && A.b == B.b && A.w == B.w)) break;
  }
  const txt = X => (X.w ? `${X.w} ${X.a}/${X.b}` : `${X.a}/${X.b}`), html = X => (X.w ? `${X.w} ` : '') + fcFr(X.a, X.b);
  const sayX = X => (X.w ? `${X.w} and ` : '') + fcSay(X.a, X.b);
  const w = Math.floor(n / d), rem = n % d, mix = w > 0;
  const ans = mix ? `${w} ${rem}/${d}` : `${n}/${d}`;
  const t1 = A.w * A.b + A.a, t2 = B.w * B.b + B.a, rows = [];
  if (A.w || B.w) rows.push(['', 'Mixed numbers to fractions:', `${A.w ? `${txt(A)} = (${A.w} × ${A.b} + ${A.a})/${A.b}. ` : ''}${B.w ? `${txt(B)} = (${B.w} × ${B.b} + ${B.a})/${B.b}. ` : ''}Write each as a fraction with the top bigger than the bottom.`]);
  rows.push(['', 'Flip and multiply:', `Dividing by a fraction is the same as multiplying by its flip. Flip ${t2}/${B.b} to get ${B.b}/${t2}. Now multiply ${t1}/${A.b} × ${B.b}/${t2}.`],
    ['', 'Tops and bottoms:', `Tops: ${t1} × ${B.b} = ? Bottoms: ${A.b} × ${t2} = ?`],
    ['', 'Simplest form:', mix ? 'Divide top and bottom by a number that goes into both. Then if the top is bigger, divide to get a mixed number. What is left?' : 'Divide top and bottom by a number that goes into both, until nothing more goes into both. What is left?']);
  return {kind: 'num', pad: mix ? 'int' : 'frac', sep: mix ? 'mix' : null, max: 3,
    html: `<div class="sub">Divide. Write the answer as ${mix ? 'a mixed number' : 'a fraction'} in simplest form.</div><div class="eq">${html(A)} ÷ ${html(B)} = ${mix ? SLOT_MIX : SLOT_FRAC}</div>`,
    say: `${sayX(A)} divided by ${sayX(B)}. Write the answer in simplest form.`, ans, hint: skyHint(rows),
    label: `fop7 ${txt(A)} / ${txt(B)}`};
}

// ---- P2-14 Galaxy Core ----
/* CURRICULUM M-6b: the stops of Galaxy Core (m_galaxy). Every global name starts with gal (gx- is the graphics pass's CSS prefix).
   ooo 2    order of operations with squares (to 12), cubes (to 5) and parentheses
   ooo 3    evaluate an expression for a given value (one variable, then two in the last third)
   alg 1    one-step equations x + a = b, x - a = b (a balance picture in the hint)
   alg 2    one-step a x = b and x / a = b
   alg 3    two-step a x + b = c, and inequalities (pick the number line for x > 3, or name the inequality of a line)
   geo 5    area of triangles, parallelograms and trapezoids with the base and the height labelled
   coord 2  four quadrants: tap a point, read a point (pick the ordered pair), name the quadrant, reflect across an axis (pick or tap)
   fact 3   GCF and LCM (2-36, LCM at most 144), as bare numbers and as word problems
   data 5   mean, median, mode and range of 5-7 whole numbers (the mean is whole), as a list or a line plot
   story 9  ratio, rate, unit price, percent and one-step equation stories
   Every label holds the numbers of its question, so tools/test.js can rebuild the right answer from the label.
   Reused from the Sky City block: skyGcd, skyN, skySay, skyHint, skyMoney, skyMoneySay, skyDec, skyNz. */

// the words of an expression: 3^2 -> "3 squared"; a letter is spoken as the letter
const galSpeak = s => s.replace(/\^2/g, ' squared').replace(/\^3/g, ' cubed').replace(/\(/g, ' open parenthesis ').replace(/\)/g, ' close parenthesis ')
  .replace(/ × /g, ' times ').replace(/ ÷ /g, ' divided by ').replace(/ − /g, ' minus ').replace(/ \+ /g, ' plus ').replace(/ = /g, ' equals ')
  .replace(/\bxy\b/g, 'x times y').replace(/(\d)([a-z])/g, '$1 $2').replace(/\s+/g, ' ').trim();
// a string with $12.50 in it, spoken: "12 dollars and 50 cents"
const galMoneyWords = s => s.replace(/\$(\d+)(?:\.(\d\d?))?/g, (m, d, c) => {
  const cents = c ? +(c.length == 1 ? c + '0' : c) : 0;
  return `${d} dollar${d == '1' ? '' : 's'}` + (cents ? ` and ${cents} cents` : '');
});
const galNum = v => (Number.isInteger(v) ? String(v) : v.toFixed(1)); // 31.5, 40

/* ---- ooo 2: exponents and parentheses ---- */
// a power: a square (base 2-12) or, in 30% of them, a cube (base 2-5)
function galPow() {
  const cube = rnd() < .3, x = cube ? R(2, 5) : R(2, 12), e = cube ? 3 : 2, v = x ** e;
  return {x, e, v, h: `${x}<sup>${e}</sup>`, l: `${x}^${e}`,
    step: `Exponent first: ${x} ${cube ? 'cubed' : 'squared'} means ${Array(e).fill(x).join(' × ')} = ${v}.`};
}
// templates: (P, Q, a, b, c) -> {h, l, v, tr} or null; h is the markup, l the plain text, tr the steps (the last one asks)
const GAL_OOO = [
  (P, Q, a) => ({h: `${a} + ${P.h}`, l: `${a} + ${P.l}`, v: a + P.v, tr: [P.step, `Now add: ${a} + ${P.v} = ?`]}),
  (P, Q, a) => (P.v > a ? {h: `${P.h} − ${a}`, l: `${P.l} − ${a}`, v: P.v - a, tr: [P.step, `Now subtract: ${P.v} − ${a} = ?`]} : null),
  (P, Q, a) => ({h: `${a} × ${P.h}`, l: `${a} × ${P.l}`, v: a * P.v, tr: [P.step, `Now multiply: ${a} × ${P.v} = ?`]}),
  (P, Q, a) => (a > 1 && a < 10 && P.v % a == 0 ? {h: `${P.h} ÷ ${a}`, l: `${P.l} ÷ ${a}`, v: P.v / a, tr: [P.step, `Now divide: ${P.v} ÷ ${a} = ?`]} : null),
  (P, Q, a, b) => ({h: `${a} × ${P.h} + ${b}`, l: `${a} × ${P.l} + ${b}`, v: a * P.v + b,
    tr: [P.step, `Multiply before you add: ${a} × ${P.v} = ${a * P.v}.`, `Now add: ${a * P.v} + ${b} = ?`]}),
  (P, Q, a, b) => (a * P.v > b ? {h: `${a} × ${P.h} − ${b}`, l: `${a} × ${P.l} − ${b}`, v: a * P.v - b,
    tr: [P.step, `Multiply before you subtract: ${a} × ${P.v} = ${a * P.v}.`, `Now subtract: ${a * P.v} − ${b} = ?`]} : null),
  (P, Q, a, b) => ({h: `${P.h} + ${a} × ${b}`, l: `${P.l} + ${a} × ${b}`, v: P.v + a * b,
    tr: [P.step, `Multiply before you add: ${a} × ${b} = ${a * b}.`, `Now add: ${P.v} + ${a * b} = ?`]}),
  (P, Q, a, b, c) => (b > c ? {h: `${a} × ${P.h} + (${b} − ${c})`, l: `${a} × ${P.l} + (${b} − ${c})`, v: a * P.v + b - c,
    tr: [`Parentheses first: ${b} − ${c} = ${b - c}.`, P.step, `Multiply: ${a} × ${P.v} = ${a * P.v}.`, `Now add: ${a * P.v} + ${b - c} = ?`]} : null),
  (P, Q, a, b) => ({h: `(${a} + ${b}) × ${P.h}`, l: `(${a} + ${b}) × ${P.l}`, v: (a + b) * P.v,
    tr: [`Parentheses first: ${a} + ${b} = ${a + b}.`, P.step, `Now multiply: ${a + b} × ${P.v} = ?`]}),
  (P, Q) => ({h: `${P.h} + ${Q.h}`, l: `${P.l} + ${Q.l}`, v: P.v + Q.v, tr: [P.step, Q.step, `Now add: ${P.v} + ${Q.v} = ?`]}),
  (P, Q, a, b) => (a + b <= 12 ? {h: `(${a} + ${b})<sup>2</sup>`, l: `(${a} + ${b})^2`, v: (a + b) ** 2,
    tr: [`Parentheses first: ${a} + ${b} = ${a + b}.`, `Now the exponent: ${a + b} squared means ${a + b} × ${a + b} = ?`]} : null),
  (P, Q, a, b) => (a - b >= 2 && a <= 12 ? {h: `(${a} − ${b})<sup>2</sup>`, l: `(${a} − ${b})^2`, v: (a - b) ** 2,
    tr: [`Parentheses first: ${a} − ${b} = ${a - b}.`, `Now the exponent: ${a - b} squared means ${a - b} × ${a - b} = ?`]} : null),
  (P, Q, a, b, c) => (P.v > b + c ? {h: `${P.h} − (${b} + ${c})`, l: `${P.l} − (${b} + ${c})`, v: P.v - b - c,
    tr: [`Parentheses first: ${b} + ${c} = ${b + c}.`, P.step, `Now subtract: ${P.v} − ${b + c} = ?`]} : null),
  (P, Q, a, b) => (P.v > a && (P.v - a) % b == 0 && b < 8 ? {h: `(${P.h} − ${a}) ÷ ${b}`, l: `(${P.l} − ${a}) ÷ ${b}`, v: (P.v - a) / b,
    tr: [`Parentheses first. Inside them, the exponent comes first. ${P.step.replace('Exponent first: ', '')}`, `Still in the parentheses: ${P.v} − ${a} = ${P.v - a}.`,
      `Now divide: ${P.v - a} ÷ ${b} = ?`]} : null),
];
function galOoo2() {
  for (;;) {
    const t = R(0, GAL_OOO.length - 1), P = galPow(), Q = galPow(), a = R(2, 12), b = R(2, 12), c = R(2, 9), r = GAL_OOO[t](P, Q, a, b, c);
    if (!r || r.v < 2 || r.v > 400 || (t == 9 && P.l == Q.l)) continue;
    if (r.tr.some((s, i) => i < r.tr.length - 1 && new RegExp('= ' + r.v + '(\\.|,|$)').test(s))) continue; // a step must not show the answer
    return {kind: 'num', html: `<div class="eq" style="font-size:.9em">${r.h} = ${SLOT}</div>`, say: `${galSpeak(r.l)} equals what?`, ans: String(r.v),
      hint: stepsStory(['Do what is inside the parentheses first. Then exponents, then multiply and divide, then add and subtract.', ...r.tr]),
      label: `${r.l} = ?`};
  }
}

/* ---- ooo 3: evaluate for a given value ---- */
// templates with one variable t (value u): {h, l, tr} where the steps start with the substitution; w is the words
const GAL_ONE = [
  (t, u, a, b) => ({h: `${a}${t} + ${b}`, v: a * u + b, s: `${a} × ${u} + ${b}`, tr: [`Multiply before you add: ${a} × ${u} = ${a * u}.`, `Now add: ${a * u} + ${b} = ?`]}),
  (t, u, a, b) => (a * u > b ? {h: `${a}${t} − ${b}`, v: a * u - b, s: `${a} × ${u} − ${b}`, tr: [`Multiply before you subtract: ${a} × ${u} = ${a * u}.`, `Now subtract: ${a * u} − ${b} = ?`]} : null),
  (t, u, a, b) => ({h: `${b} + ${a}${t}`, v: b + a * u, s: `${b} + ${a} × ${u}`, tr: [`Multiply before you add: ${a} × ${u} = ${a * u}.`, `Now add: ${b} + ${a * u} = ?`]}),
  (t, u, a, b) => ({h: `${t}<sup>2</sup> + ${b}`, l: `${t}^2 + ${b}`, v: u * u + b, s: `${u}<sup>2</sup> + ${b}`, sp: `${u}^2 + ${b}`,
    tr: [`Exponent first: ${u} squared means ${u} × ${u} = ${u * u}.`, `Now add: ${u * u} + ${b} = ?`]}),
  (t, u, a, b) => (u * u > b ? {h: `${t}<sup>2</sup> − ${b}`, l: `${t}^2 − ${b}`, v: u * u - b, s: `${u}<sup>2</sup> − ${b}`, sp: `${u}^2 − ${b}`,
    tr: [`Exponent first: ${u} squared means ${u} × ${u} = ${u * u}.`, `Now subtract: ${u * u} − ${b} = ?`]} : null),
  (t, u, a, b) => ({h: `${a}(${t} + ${b})`, v: a * (u + b), s: `${a} × (${u} + ${b})`, tr: [`Parentheses first: ${u} + ${b} = ${u + b}.`, `Now multiply: ${a} × ${u + b} = ?`]}),
  (t, u, a, b) => (u > b ? {h: `${a}(${t} − ${b})`, v: a * (u - b), s: `${a} × (${u} − ${b})`, tr: [`Parentheses first: ${u} − ${b} = ${u - b}.`, `Now multiply: ${a} × ${u - b} = ?`]} : null),
  (t, u, a, b) => (u % a == 0 ? {h: `${t} ÷ ${a} + ${b}`, v: u / a + b, s: `${u} ÷ ${a} + ${b}`, tr: [`Divide before you add: ${u} ÷ ${a} = ${u / a}.`, `Now add: ${u / a} + ${b} = ?`]} : null),
  (t, u, a, b) => (b > a * u ? {h: `${b} − ${a}${t}`, v: b - a * u, s: `${b} − ${a} × ${u}`, tr: [`Multiply before you subtract: ${a} × ${u} = ${a * u}.`, `Now subtract: ${b} − ${a * u} = ?`]} : null),
];
// two variables x (value u) and y (value w)
const GAL_TWO = [
  (u, w, a, b) => ({h: `${a}x + ${b}y`, v: a * u + b * w, s: `${a} × ${u} + ${b} × ${w}`, tr: [`Multiply before you add: ${a} × ${u} = ${a * u} and ${b} × ${w} = ${b * w}.`, `Now add: ${a * u} + ${b * w} = ?`]}),
  (u, w, a, b) => (a * u > w ? {h: `${a}x − y`, v: a * u - w, s: `${a} × ${u} − ${w}`, tr: [`Multiply before you subtract: ${a} × ${u} = ${a * u}.`, `Now subtract: ${a * u} − ${w} = ?`]} : null),
  (u, w, a) => ({h: `xy + ${a}`, v: u * w + a, s: `${u} × ${w} + ${a}`, tr: [`Multiply before you add. xy means x times y: ${u} × ${w} = ${u * w}.`, `Now add: ${u * w} + ${a} = ?`]}),
  (u, w, a) => ({h: `${a}(x + y)`, v: a * (u + w), s: `${a} × (${u} + ${w})`, tr: [`Parentheses first: ${u} + ${w} = ${u + w}.`, `Now multiply: ${a} × ${u + w} = ?`]}),
  (u, w, a) => ({h: `x<sup>2</sup> + y`, l: 'x^2 + y', v: u * u + w, s: `${u}<sup>2</sup> + ${w}`, sp: `${u}^2 + ${w}`, tr: [`Exponent first: ${u} squared means ${u} × ${u} = ${u * u}.`, `Now add: ${u * u} + ${w} = ?`]}),
  (u, w, a) => (u > w ? {h: `${a}(x − y)`, v: a * (u - w), s: `${a} × (${u} − ${w})`, tr: [`Parentheses first: ${u} − ${w} = ${u - w}.`, `Now multiply: ${a} × ${u - w} = ?`]} : null),
];
function galOoo3() {
  const two = rnd() < .34;
  for (;;) {
    let r, given, shown, say;
    const a = R(2, 9), b = R(2, 12);
    if (two) {
      const u = R(2, 9), w = R(2, 9);
      r = GAL_TWO[R(0, GAL_TWO.length - 1)](u, w, a, b);
      given = `x = ${u}, y = ${w}`; say = `x equals ${u} and y equals ${w}`;
    } else {
      const t = pick(['x', 'x', 'n', 'y', 'k', 'm', 'p']), tk = R(0, GAL_ONE.length - 1), tmpl = GAL_ONE[tk];
      const u = tk == 7 ? a * R(1, 6) : R(2, 12);
      r = tmpl(t, u, a, b);
      given = `${t} = ${u}`; say = `${t} equals ${u}`;
    }
    if (!r || r.v < 1 || r.v > 200) continue;
    const l = r.l || r.h, subst = `Replace each letter with its number: ${r.sp || r.s.replace(/<sup>(\d)<\/sup>/g, '^$1')}.`;
    if (r.tr.some((s, i) => i < r.tr.length - 1 && new RegExp('= ' + r.v + '(\\.|,|$)').test(s))) continue;
    return {kind: 'num', html: `<div class="sub">Find the value when ${given}.</div><div class="eq" style="font-size:.9em">${r.h} = ${SLOT}</div>`,
      say: `${say}. What is ${galSpeak(l)}?`, ans: String(r.v),
      hint: stepsStory([subst.replace(/\^2/g, ' squared'), ...r.tr]), label: `${l}, ${given}`};
  }
}

/* ---- alg 1: x + a = b, x - a = b ---- */
const galVars = ['x', 'x', 'x', 'n', 'y', 'm', 'k', 'p'];
function galAlg1() {
  const v = pick(galVars), add = coin(), a = R(2, 60);
  const x = add ? R(1, Math.max(1, 99 - a)) : R(a + 1, 99), b = add ? x + a : x - a;
  const flip = add && rnd() < .3; // a + x = b
  const eq = add ? (flip ? `${a} + ${v} = ${b}` : `${v} + ${a} = ${b}`) : `${v} − ${a} = ${b}`;
  const spoken = add ? (flip ? `${a} plus ${v} equals ${b}` : `${v} plus ${a} equals ${b}`) : `${v} minus ${a} equals ${b}`;
  const html = `<div class="sub">Solve the equation.</div><div class="eq">${eq}</div><div class="eq">${v} = ${SLOT}</div>`;
  const hint = add ? ST.hint([
    ST.step(`<div class="galbal">${VIZ.balance({n: a, q: true}, {n: b}, {tilt: 0})}</div>`, 'Keep it balanced:', `${eq} is like a balance. Both sides weigh the same. The ? is the ${v}.`, null),
    ST.step('', 'Same on both sides:', `Whatever you do to one side you must do to the other. To get ${v} alone, take ${a} away from both sides.`, null),
    ST.step('', 'Subtract:', `${v} = ${b} − ${a}. Work out ${b} − ${a} = ?`, null)], 0)
    : ST.hint([
      ST.step('', 'What happened:', `${eq} means a number had ${a} taken away, and ${b} was left.`, null),
      ST.step('', 'Undo it:', `The opposite of taking away is adding. To get ${v} alone, add ${a} to both sides.`, null),
      ST.step('', 'Add:', `${v} = ${b} + ${a}. Work out ${b} + ${a} = ?`, null)], 0);
  return {kind: 'num', max: 2, html, say: `Solve the equation. ${spoken}. What is ${v}?`, ans: String(x), hint, label: `alg1 ${eq}`};
}

/* ---- alg 2: a x = b, x / a = b ---- */
function galAlg2() {
  const v = pick(galVars), mul = coin(), a = R(2, 12);
  if (mul) {
    const x = R(2, 15), b = a * x, eq = `${a}${v} = ${b}`;
    return {kind: 'num', max: 2, html: `<div class="sub">Solve the equation.</div><div class="eq">${eq}</div><div class="eq">${v} = ${SLOT}</div>`,
      say: `Solve the equation. ${a} times ${v} equals ${b}. What is ${v}?`, ans: String(x), label: `alg2 ${eq}`,
      hint: skyHint([['', 'What is happening:', `${a}${v} means ${a} times ${v}. The ${v} is multiplied by ${a}.`],
        ['', 'Undo it:', `Division undoes multiplication. Divide both sides by ${a}: ${v} = ${b} ÷ ${a}. Work out ${b} ÷ ${a} = ?`]])};
  }
  const b = R(2, 12), x = a * b, eq = `${v} ÷ ${a} = ${b}`;
  return {kind: 'num', max: 3, html: `<div class="sub">Solve the equation.</div><div class="eq">${eq}</div><div class="eq">${v} = ${SLOT}</div>`,
    say: `Solve the equation. ${v} divided by ${a} equals ${b}. What is ${v}?`, ans: String(x), label: `alg2 ${eq}`,
    hint: skyHint([['', 'What is happening:', `${v} ÷ ${a} means ${v} is shared into ${a} equal parts. One part is ${b}.`],
      ['', 'Undo it:', `Multiplication undoes division. Multiply both sides by ${a}: ${v} = ${b} × ${a}. Work out ${b} × ${a} = ?`]])};
}

/* ---- alg 3: two-step equations and inequalities ---- */
const galIneqLine = (k, dir) => VIZ.rayLine({at: k, dir});
const galIneqTxt = (k, dir) => `x ${dir == 'right' ? '>' : '<'} ${k}`; // plain text, "x > -3" uses a real minus in the markup only
const galIneqHtml = (k, dir) => `x ${dir == 'right' ? '&gt;' : '&lt;'} ${skyN(k)}`;
const galIneqSay = (k, dir) => `x is ${dir == 'right' ? 'greater' : 'less'} than ${skySay(k)}`;
function galAlg3() {
  const f = rnd();
  if (f < .6) {
    const v = pick(galVars), plus = rnd() < .65, a = R(2, 9), x = R(1, 12), b = R(1, 20), c = plus ? a * x + b : a * x - b;
    if (c < 1) return galAlg3();
    const eq = `${a}${v} ${plus ? '+' : '−'} ${b} = ${c}`, mid = plus ? c - b : c + b;
    return {kind: 'num', max: 2, html: `<div class="sub">Solve the equation.</div><div class="eq">${eq}</div><div class="eq">${v} = ${SLOT}</div>`,
      say: `Solve the equation. ${a} times ${v} ${plus ? 'plus' : 'minus'} ${b} equals ${c}. What is ${v}?`, ans: String(x), label: `alg3 ${eq}`,
      hint: skyHint([['', 'Two steps:', `The ${v} was multiplied by ${a}, then ${b} was ${plus ? 'added' : 'taken away'}. Undo them backwards: first the ${plus ? 'adding' : 'taking away'}, then the multiplying.`],
        ['', plus ? 'Subtract ' + b + ':' : 'Add ' + b + ':', `${plus ? 'Take' : 'Add'} ${b} ${plus ? 'away from' : 'to'} both sides. ${a}${v} = ${c} ${plus ? '−' : '+'} ${b} = ${mid}.`],
        ['', 'Divide:', `Now ${a}${v} = ${mid}. Divide both sides by ${a}: ${mid} ÷ ${a} = ?`]])};
  }
  // an inequality: k from -4 to 4 (not 0), ray left or right
  const k = skyNz(-4, 4), dir = coin() ? 'right' : 'left';
  if (f < .8) { // pick the line for x > k
    const pool = [[k, dir == 'right' ? 'left' : 'right'], [-k, dir], [-k, dir == 'right' ? 'left' : 'right'], [k + (k < 4 ? 1 : -1), dir], [k - (k > -4 ? 1 : -1), dir]];
    const seen = new Set([`${k}${dir}`]), wrong = [];
    for (const [kk, dd] of shuffle(pool)) {
      if (wrong.length == 3) break;
      if (seen.has(`${kk}${dd}`)) continue;
      seen.add(`${kk}${dd}`); wrong.push([kk, dd]);
    }
    const choices = shuffle([[k, dir], ...wrong]).map(([kk, dd]) => ({v: `${kk}${dd}`, l: galIneqLine(kk, dd), h: true}));
    return {kind: 'choice', cls: 'wide galr', ans: `${k}${dir}`, choices,
      html: `<div class="sub">Which number line shows</div><div class="eq">${galIneqHtml(k, dir)}</div>`,
      say: `Which number line shows ${galIneqSay(k, dir)}?`,
      hint: skyHint([['', 'Find the number:', `Find ${skyN(k)} on each line. The dot must be there. It is open, because x cannot be ${skyN(k)} itself.`],
        ['', 'Which way?', `${dir == 'right' ? 'Greater numbers are to the right of the dot.' : 'Smaller numbers are to the left of the dot.'} Which line has the ray going that way from ${skyN(k)}?`]]),
      label: `alg3 line ${galIneqTxt(k, dir)}`};
  }
  // name the inequality of a line
  const opts = [[k, dir], [k, dir == 'right' ? 'left' : 'right'], [-k, dir], [-k, dir == 'right' ? 'left' : 'right']];
  return {kind: 'choice', ans: `${k}${dir}`, choices: shuffle(opts.map(([kk, dd]) => ({v: `${kk}${dd}`, l: `x ${dd == 'right' ? '>' : '<'} ${skyN(kk)}`}))),
    html: `${galIneqLine(k, dir)}<div class="sub">Which inequality does the line show?</div>`,
    say: 'Which inequality does the number line show? Look at the dot and at the way the ray points.',
    hint: skyHint([['', 'The dot:', 'Read the number where the dot is. It is open, so x is not equal to that number.'],
      ['', 'The ray:', 'The ray covers the numbers x can be. A ray to the right means greater than. A ray to the left means less than. Which choice says that?']]),
    label: `alg3 name ${galIneqTxt(k, dir)}`};
}

/* ---- geo 5: triangles, parallelograms, trapezoids ---- */
const galUnits = {cm: ['centimeters', 'square centimeters', 'cm²'], m: ['meters', 'square meters', 'm²'], in: ['inches', 'square inches', 'in²'], ft: ['feet', 'square feet', 'ft²']};
// one drawing, not to scale; the height is dashed with a square corner; labels are the numbers of the question
function galShape(kind, d, unit) {
  const T = (x, y, s, cls) => `<text${cls ? ` class="${cls}"` : ''} x="${x}" y="${y}">${s} ${unit}</text>`;
  let body, name, H;
  if (kind == 'tri') {
    const bw = 150, yT = 14, yB = 84, ax = 30 + Math.round(bw * (0.3 + ((d.b * 7 + d.h * 3) % 5) * 0.1)), fx = ax, right = fx > 30 + bw * .55;
    name = 'triangle with its base and height';
    body = `<path class="vpo" d="M30 ${yB}H${30 + bw}L${ax} ${yT}z"/><path class="vgd" d="M${ax} ${yT}V${yB}"/><path class="va" d="M${fx - 10} ${yB}v-10h10" style="stroke-width:2"/>` +
      T(30 + bw / 2, yB + 21, d.b) + T(fx + (right ? -8 : 8), 54, d.h, right ? 'vta' : 'vts');
    H = yB + 30;
  } else if (kind == 'par') {
    const bw = 150, sh = 46, fx = 24 + sh, yT = 14, yB = 84;
    name = 'parallelogram with its base and height';
    body = `<path class="vpo" d="M24 ${yB}H${24 + bw}L${24 + sh + bw} ${yT}H${24 + sh}z"/><path class="vgd" d="M${fx} ${yT}V${yB}"/><path class="va" d="M${fx} ${yB - 10}h10v10" style="stroke-width:2"/>` +
      T(24 + bw / 2, yB + 21, d.b) + T(fx + 14, 54, d.h, 'vts') + (d.s ? T(24 + sh / 2 - 4, 54, d.s, 'vta') : '');
    H = yB + 30;
  } else {
    const Bw = 170, Tw = Math.max(70, Math.round(Bw * d.b1 / d.b2)), off = Math.round((Bw - Tw) / 3), fx = 20 + off, yT = 30, yB = 92;
    name = 'trapezoid with its parallel sides and height';
    body = `<path class="vpo" d="M20 ${yB}H${20 + Bw}L${20 + off + Tw} ${yT}H${20 + off}z"/><path class="vgd" d="M${fx} ${yT}V${yB}"/><path class="va" d="M${fx} ${yB - 10}h10v10" style="stroke-width:2"/>` +
      T(20 + off + Tw / 2, yT - 9, d.b1) + T(20 + Bw / 2, yB + 21, d.b2) + T(fx + 14, 66, d.h, 'vts');
    H = yB + 30;
  }
  return dsSvg(250, H, body, name);
}
function galGeo5() {
  const f = rnd(), unit = pick(['cm', 'm', 'in', 'ft']), [U, SQU, SQ] = galUnits[unit];
  const slot = `<div class="eq">Area = ${SLOT} ${SQ}</div>`; // no prompt line: the picture shows the shape, and a card with the decimal pad and a step hint open is short
  if (f < .36) { // triangle: half of base times height
    const b = R(3, 14), h = R(3, 12), prod = b * h, v = prod / 2;
    return {kind: 'num', pad: 'dec', eq: 'value', max: 4, ans: galNum(v),
      html: `${galShape('tri', {b, h}, unit)}${slot}`,
      say: `A triangle has a base of ${b} ${U} and a height of ${h} ${U}. What is its area in ${SQU}?`,
      hint: skyHint([['', 'Half a rectangle:', 'A triangle is half of a rectangle with the same base and height. Area = base × height ÷ 2.'],
        ['', 'Multiply:', `base × height = ${b} × ${h} = ${prod}.`], ['', 'Half of it:', `Take half of ${prod}: ${prod} ÷ 2 = ?`]]),
      label: `geo5 tri ${b} ${h} ${unit}`};
  }
  if (f < .68) { // parallelogram: base times height, a slanted side that is not needed sometimes
    const b = R(3, 14), h = R(2, 10), s = rnd() < .5 ? h + R(1, 4) : 0, v = b * h;
    return {kind: 'num', max: 3, ans: String(v),
      html: `${galShape('par', {b, h, s}, unit)}${slot}`,
      say: `A parallelogram has a base of ${b} ${U} and a height of ${h} ${U}.${s ? ` Its slanted side is ${s} ${U}, but you do not need it.` : ''} What is its area in ${SQU}?`,
      hint: skyHint([['', 'Slide a piece:', 'Cut off the slanted end and slide it to the other side. You get a rectangle. Area = base × height.'],
        ['', 'Use the height:', `The height is the straight up-and-down distance, ${h}${s ? `, not the slanted side, ${s}` : ''}. Work out ${b} × ${h} = ?`]]),
      label: `geo5 par ${b} ${h} ${s} ${unit}`};
  }
  const b1 = R(2, 10), b2 = b1 + R(2, 8), h = R(3, 10), sum = b1 + b2, prod = sum * h, v = prod / 2;
  return {kind: 'num', pad: 'dec', eq: 'value', max: 4, ans: galNum(v),
    html: `${galShape('trap', {b1, b2, h}, unit)}${slot}`,
    say: `A trapezoid has parallel sides of ${b1} ${U} and ${b2} ${U}, and a height of ${h} ${U}. What is its area in ${SQU}?`,
    hint: skyHint([['', 'The formula:', 'Add the two parallel sides, multiply by the height, then take half. Area = (top + bottom) × height ÷ 2.'],
      ['', 'Add the sides:', `${b1} + ${b2} = ${sum}.`], ['', 'Multiply:', `${sum} × ${h} = ${prod}.`], ['', 'Half of it:', `Take half of ${prod}: ${prod} ÷ 2 = ?`]]),
    label: `geo5 trap ${b1} ${b2} ${h} ${unit}`};
}

/* ---- coord 2: four quadrants ---- */
const galQuad = (x, y) => (x > 0 ? (y > 0 ? 'I' : 'IV') : (y > 0 ? 'II' : 'III'));
const galPair = (x, y) => `(${skyN(x)}, ${skyN(y)})`;
const galPairSay = (x, y) => `${skySay(x)}, ${skySay(y)}`;
function galPoint(lim, zeroOk) { // a point with both coordinates -lim..lim and none zero (an axis point 15% of the time when zeroOk)
  for (;;) {
    const x = R(-lim, lim), y = R(-lim, lim);
    if (x && y) return [x, y];
    if (zeroOk && rnd() < .15 && (x || y)) return [x, y];
  }
}
// four ordered pairs for a choice: the right one and three of the likely slips (swapped, a sign changed), all different
function galPairChoices(x, y, slips) {
  const seen = new Set([`${x},${y}`]), out = [[x, y]];
  for (const p of shuffle(slips)) {
    if (out.length == 4) break;
    if (seen.has(p.join())) continue;
    seen.add(p.join()); out.push(p);
  }
  return shuffle(out).map(([a, b]) => ({v: `${a},${b}`, l: galPair(a, b)}));
}
function galCoord2() {
  const f = rnd();
  if (f < .22) { // tap the point (the grid stops at 2: seven columns of 48 px targets are wider than a 380 px phone card, so they would shrink below 48 px)
    const [x, y] = galPoint(2, false), key = `${x},${y}`;
    const cand = [[y, x], [-x, y], [x, -y], [-x, -y]].filter(p => p.join() != key);
    const pts = [[x, y]];
    for (const p of cand) if (!pts.some(q => q.join() == p.join())) pts.push(p);
    return {kind: 'tap', ans: key, ansSay: `${skySay(x)} across and ${skySay(y)} up`,
      html: `${VIZ.coordGrid({quadrants: 4, max: 2, tapPts: shuffle(pts.slice(0, 4))})}<div class="sub">Tap the point ${galPair(x, y)}.</div>`,
      say: `Tap the point ${galPairSay(x, y)}. Go ${Math.abs(x)} ${x < 0 ? 'left' : 'right'}, then ${Math.abs(y)} ${y < 0 ? 'down' : 'up'}.`,
      hint: skyHint([['', 'Across first:', `Start at 0, where the lines cross. The first number is x. ${x < 0 ? 'It is negative, so go left.' : 'It is positive, so go right.'} Go ${Math.abs(x)}.`],
        ['', 'Then up or down:', `The second number is y. ${y < 0 ? 'It is negative, so go down.' : 'It is positive, so go up.'} Go ${Math.abs(y)}. Which point is it?`]]),
      label: `coord2 tap ${x},${y}`};
  }
  if (f < .47) { // read the point: pick the ordered pair (a typed answer with the +/- key would leave the 13 x 13 grid too small to read on a phone)
    const [x, y] = galPoint(6, false);
    return {kind: 'choice', ans: `${x},${y}`, choices: galPairChoices(x, y, [[y, x], [-x, y], [x, -y], [-x, -y]]), after: `Point A is ${galPair(x, y)}.`,
      html: `${VIZ.coordGrid({quadrants: 4, max: 6, points: [[x, y, 'A']]})}<div class="sub">Which ordered pair names point A?</div>`,
      say: 'Which ordered pair names point A? The first number is across and the second number is up or down. Left and down are negative.',
      hint: skyHint([['', 'Across first:', 'Start at 0. Look straight down or up from point A to the x-axis. Is it to the right (positive) or the left (negative)? That is the first number.'],
        ['', 'Then up or down:', 'Now look across from A to the y-axis. Is it above 0 (positive) or below it (negative)? That is the second number. Which pair has both?']]),
      label: `coord2 read ${x},${y}`};
  }
  if (f < .72) { // name the quadrant: from the pair, or from the picture
    const [x, y] = galPoint(6, false), q = galQuad(x, y), pic = coin();
    const h = skyHint([['', 'The four quadrants:', 'They are numbered counter-clockwise. I is top right, II is top left, III is bottom left and IV is bottom right.'],
      ['', 'Read the signs:', `${x < 0 ? 'x is negative, so it is on the left of the y-axis' : 'x is positive, so it is on the right of the y-axis'}. ${y < 0 ? 'y is negative, so it is below the x-axis' : 'y is positive, so it is above the x-axis'}. Which quadrant is that?`]]);
    return {kind: 'choice', cls: 'syms sym4', ans: q, choices: ['I', 'II', 'III', 'IV'].map(v => ({v, l: v})), after: `${galPair(x, y)} is in quadrant ${q}.`,
      html: pic ? `${VIZ.coordGrid({quadrants: 4, max: 6, points: [[x, y, 'A']]})}<div class="sub">In which quadrant is point A?</div>`
        : `<div class="eq">${galPair(x, y)}</div><div class="sub">In which quadrant is this point?</div>`,
      say: pic ? 'In which quadrant is point A? The quadrants are numbered one to four, counter-clockwise from the top right.'
        : `In which quadrant is the point ${galPairSay(x, y)}? The quadrants are numbered one to four, counter-clockwise from the top right.`,
      hint: h, label: `coord2 quad ${pic ? 'pic' : 'pair'} ${x},${y}`};
  }
  // reflect across an axis
  const axis = coin() ? 'x' : 'y', tapIt = coin();
  const [x, y] = galPoint(tapIt ? 2 : 6, false), rx = axis == 'y' ? -x : x, ry = axis == 'x' ? -y : y;
  const hint = skyHint([['', 'A mirror:', `The ${axis}-axis is the mirror. A and A' are the same distance from it, on opposite sides.`],
    ['', 'Which number changes?', axis == 'x' ? `Reflecting across the x-axis flips the point up or down. The x-coordinate stays the same and the y-coordinate changes sign. What are the coordinates of A'?`
      : `Reflecting across the y-axis flips the point left or right. The y-coordinate stays the same and the x-coordinate changes sign. What are the coordinates of A'?`]]);
  if (tapIt) {
    const cand = [[-x, -y], axis == 'x' ? [-x, y] : [x, -y], [y, x]].filter(p => p.join() != `${rx},${ry}` && p.join() != `${x},${y}`);
    const pts = [[rx, ry]];
    for (const p of cand) if (!pts.some(q => q.join() == p.join()) && pts.length < 4) pts.push(p);
    return {kind: 'tap', ans: `${rx},${ry}`, ansSay: `${skySay(rx)} across and ${skySay(ry)} up`,
      html: `${VIZ.coordGrid({quadrants: 4, max: 2, points: [[x, y, 'A']], tapPts: shuffle(pts)})}<div class="sub">Reflect point A across the ${axis}-axis. Tap A'.</div>`,
      say: `Reflect point A across the ${axis}-axis. Tap the new point, A prime.`, hint, label: `coord2 reflect-tap ${axis} ${x},${y}`};
  }
  const other = axis == 'x' ? [-x, y] : [x, -y];
  return {kind: 'choice', ans: `${rx},${ry}`, choices: galPairChoices(rx, ry, [other, [-x, -y], [y, x], [x, y]]),
    html: `${VIZ.coordGrid({quadrants: 4, max: 6, points: [[x, y, 'A']]})}<div class="sub">Reflect point A across the ${axis}-axis. Where is A'?</div>`,
    say: `Reflect point A across the ${axis}-axis. Which ordered pair names the new point, A prime?`, hint, label: `coord2 reflect ${axis} ${x},${y}`};
}

/* ---- fact 3: GCF and LCM ---- */
const galFactors = n => Array.from({length: n}, (_, i) => i + 1).filter(k => n % k == 0);
const galLcm = (a, b) => a / skyGcd(a, b) * b;
function galFact3() {
  const gcf = coin(), word = coin();
  let a, b;
  for (;;) {
    a = R(2, 36); b = R(2, 36);
    if (a == b) continue;
    if (gcf ? (skyGcd(a, b) == 1 && rnd() < .9) : (galLcm(a, b) > 144 || (galLcm(a, b) == Math.max(a, b) && rnd() < .9))) continue;
    break;
  }
  const lo = Math.min(a, b), hi = Math.max(a, b);
  if (gcf) {
    const g = skyGcd(a, b);
    const hint = skyHint([['', 'The idea:', 'The greatest common factor is the biggest number that divides both numbers with nothing left over.'],
      ['', 'List the factors:', `Factors of ${a}: ${galFactors(a).join(', ')}. Factors of ${b}: ${galFactors(b).join(', ')}.`],
      ['', 'Look for the match:', 'Which is the biggest number that is in both lists?']]);
    if (!word) {
      return {kind: 'num', max: 2, ans: String(g), html: `<div class="sub">Find the greatest common factor.</div><div class="eq">GCF(${a}, ${b}) = ${SLOT}</div>`,
        say: `What is the greatest common factor of ${a} and ${b}?`, hint, label: `fact3 gcf ${a} ${b}`};
    }
    const t = pick([['red beads', 'blue beads', 'bracelets'], ['apples', 'pears', 'baskets'], ['boys', 'girls', 'teams'], ['pens', 'pencils', 'packs']]);
    return {kind: 'num', max: 2, ans: String(g), auto: true,
      html: `<p class="story">${words(`There are ${a} ${t[0]} and ${b} ${t[1]}. Every ${t[2].replace(/s$/, '')} gets the same number of each. What is the greatest number of ${t[2]} that can be made with none left over?`)}</p><div class="eq">${SLOT} ${t[2]}</div>`,
      say: `There are ${a} ${t[0]} and ${b} ${t[1]}. Every ${t[2].replace(/s$/, '')} gets the same number of each. What is the greatest number of ${t[2]} that can be made with none left over?`,
      hint, label: `fact3 gcf-w ${a} ${b}`};
  }
  const l = galLcm(a, b), k = l / hi;
  const mult = Array.from({length: k - 1}, (_, i) => hi * (i + 1));
  const hint = skyHint([['', 'The idea:', 'The least common multiple is the smallest number that both numbers divide into evenly.'],
    k > 1 ? ['', 'Count by the bigger number:', `Count by ${hi}s: ${mult.join(', ')}, ... Does ${lo} go into each one evenly? Keep counting until one works.`]
      : ['', 'Start with the bigger number:', `Does ${lo} go into ${hi} evenly? If it does, you do not need to count any further.`],
    ['', 'Check:', `Which is the first multiple of ${hi} that ${lo} also divides into with nothing left over?`]]);
  if (!word) {
    return {kind: 'num', max: 3, ans: String(l), html: `<div class="sub">Find the least common multiple.</div><div class="eq">LCM(${a}, ${b}) = ${SLOT}</div>`,
      say: `What is the least common multiple of ${a} and ${b}?`, hint, label: `fact3 lcm ${a} ${b}`};
  }
  const t = pick([['bus A', 'bus B', 'minutes', 'leave the stop together again'], ['light A', 'light B', 'seconds', 'blink together again'], ['Mia', 'Leo', 'days', 'visit the library on the same day again']]);
  const text = t[0] == 'Mia' ? `Mia goes to the library every ${a} days. Leo goes every ${b} days. They both went today. In how many days will they both go on the same day again?`
    : `${t[0].replace(/^./, c => c.toUpperCase())} ${t[0].startsWith('bus') ? 'leaves' : 'blinks'} every ${a} ${t[2]}. ${t[1].replace(/^./, c => c.toUpperCase())} ${t[1].startsWith('bus') ? 'leaves' : 'blinks'} every ${b} ${t[2]}. They just ${t[0].startsWith('bus') ? 'left' : 'blinked'} together. In how many ${t[2]} will they ${t[3]}?`;
  return {kind: 'num', max: 3, ans: String(l), auto: true, html: `<p class="story">${words(text)}</p><div class="eq">${SLOT} ${t[2]}</div>`, say: text, hint, label: `fact3 lcm-w ${a} ${b}`};
}

/* ---- data 5: mean, median, mode, range ---- */
const galData = [['Quiz scores of friends', 'quiz scores', 'score'], ['Books read by friends', 'books read', 'book'], ['Goals scored in games', 'goals', 'goal'], ['Pets at home', 'pets', 'pet']];
function galData5() {
  const type = pick(['mean', 'median', 'mode', 'range']), plot = rnd() < .4, n = type == 'median' ? pick([5, 7]) : R(5, 7), hiV = plot ? 10 : 20, ctx = pick(galData);
  // (a median needs an odd count)
  let vals;
  for (let guard = 0; ; guard++) {
    vals = Array.from({length: n}, () => R(1, hiV));
    const sum = vals.reduce((s, v) => s + v, 0), cnt = {};
    vals.forEach(v => { cnt[v] = (cnt[v] || 0) + 1 });
    const top = Math.max(...Object.values(cnt)), modes = Object.keys(cnt).filter(k => cnt[k] == top);
    const sorted = vals.slice().sort((a, b) => a - b), med = (sorted[(n - 1) >> 1] + sorted[n >> 1]) / 2; // the middle number, or half way between the two middle ones
    if (sum % n || top < 2 || modes.length > 1 || sorted[n - 1] - sorted[0] < 3 || med == sum / n) continue;
    if (plot && top > 4) continue;
    break;
  }
  const sorted = vals.slice().sort((a, b) => a - b), sum = vals.reduce((s, v) => s + v, 0), mean = sum / n, med = sorted[(n - 1) / 2];
  const cnt = {};
  vals.forEach(v => { cnt[v] = (cnt[v] || 0) + 1 });
  const mode = +Object.keys(cnt).find(k => cnt[k] == Math.max(...Object.values(cnt))), lo = sorted[0], hi = sorted[n - 1];
  const list = vals.join(', ');
  const head = plot ? `${VIZ.linePlot(vals, {min: 0, max: 10, w: 290})}<div class="sub">Each dot is one of ${n} friends. It shows the number of ${ctx[1]}.</div>`
    : `<div class="sub">${ctx[0]}:</div><div class="eq" style="font-size:.9em">${list}</div>`;
  const says = plot ? `Each dot is one of ${n} friends. It shows the number of ${ctx[1]}.` : `${ctx[0]}: ${list}.`;
  const hints = {
    mean: skyHint([['', 'Mean means fair share:', 'To find the mean, add all the numbers, then divide by how many numbers there are.'],
      ['', 'Add:', `${vals.join(' + ')} = ${sum}.`], ['', 'Divide:', `There are ${n} numbers. ${sum} ÷ ${n} = ?`]]),
    median: skyHint([['', 'Put them in order:', `Write the numbers from least to greatest: ${sorted.join(', ')}.`],
      ['', 'The middle one:', `The median is the number in the middle. There are ${n} numbers, so the middle one has ${(n - 1) / 2} numbers on each side. Which number is it?`]]),
    mode: skyHint([['', 'Most often:', 'The mode is the number that shows up the most.'],
      ['', 'Count:', `Put them in order to make counting easy: ${sorted.join(', ')}. Which number appears more times than any other?`]]),
    range: skyHint([['', 'Biggest minus smallest:', 'The range tells how far apart the greatest and the least numbers are. Range = greatest − least.'],
      ['', 'Find them:', `Greatest: ${hi}. Least: ${lo}. Work out ${hi} − ${lo} = ?`]])}[type];
  const ans = {mean, median: med, mode, range: hi - lo}[type];
  return {kind: 'num', max: 3, ans: String(ans), html: `${head}<div class="sub">What is the ${type}?</div><div class="eq">${type} = ${SLOT}</div>`,
    say: `${says} What is the ${type}?`, hint: hints, label: `data5 ${type} ${vals.join(',')}${plot ? ' plot' : ''}`};
}

/* ---- story 9: ratio, rate, unit price, percent, one-step equations ---- */
const galPairs = [['cats', 'dogs'], ['boys', 'girls'], ['red marbles', 'blue marbles'], ['apples', 'pears'], ['fiction books', 'comic books'], ['hens', 'ducks']];
const galRates = [
  {a: 'km', b: 'hours', w: (who, t, n) => `${who} rides a bike ${t} km in ${n} hours.`, q: (who, m) => `At the same rate, how far does ${who} ride in ${m} hours?`, u: 'km', lo: 6, hi: 20},
  {a: 'pages', b: 'minutes', w: (who, t, n) => `${who} reads ${t} pages in ${n} minutes.`, q: (who, m) => `At the same rate, how many pages does ${who} read in ${m} minutes?`, u: 'pages', lo: 2, hi: 9},
  {a: 'cups', b: 'minutes', w: (who, t, n) => `A tap fills ${t} cups of water in ${n} minutes.`, q: (who, m) => `At the same rate, how many cups does it fill in ${m} minutes?`, u: 'cups', lo: 3, hi: 12},
  {a: 'laps', b: 'minutes', w: (who, t, n) => `${who} swims ${t} laps in ${n} minutes.`, q: (who, m) => `At the same rate, how many laps does ${who} swim in ${m} minutes?`, u: 'laps', lo: 1, hi: 4}];
const galThings = ['pens', 'notebooks', 'stickers', 'apples', 'erasers', 'rulers'];
function galStory9() {
  const f = rnd(), who = pick([S.name || 'Sam', 'Ava', 'Leo', 'Mia', 'Noah', 'Zoe']);
  const story = (text, more) => ({kind: 'num', auto: true, say: galMoneyWords(text), ...more});
  const html = (text, slot) => `<p class="story">${words(text)}</p><div class="eq">${slot}</div>`;
  if (f < .2) { // ratio: a part is known, find the other part (or the total)
    const [x, y] = pick(galPairs), k = R(2, 9), total = rnd() < .3;
    let p, q;
    do [p, q] = skyCoprime(1, 7, 12); while (!total && q < 2); // the other part is never 1 part: its size would be the answer
    const text = total ? `The ratio of ${x} to ${y} is ${p} : ${q}. There are ${p * k} ${x}. How many ${x} and ${y} are there in all?`
      : `The ratio of ${x} to ${y} is ${p} : ${q}. There are ${p * k} ${x}. How many ${y} are there?`;
    const ans = total ? (p + q) * k : q * k;
    return story(text, {html: html(text, `${SLOT} ${total ? 'in all' : y}`), ans: String(ans), max: 3,
      hint: skyHint([['', 'Equal parts:', `${x} are ${qN(p, 'part')}, and ${qN(p, 'part')} ${p == 1 ? 'is' : 'are'} ${p * k}. One part is ${p * k} ÷ ${p} = ${k}.`],
        ['', total ? 'All the parts:' : `${y} are ${qN(q, 'part')}:`, total ? `${x} are ${qN(p, 'part')} and ${y} are ${qN(q, 'part')}, so there are ${p + q} parts in all. ${p + q} × ${k} = ?` : `Every part is ${k}. ${q} × ${k} = ?`]]),
      label: `story9 ratio ${p}:${q} ${p * k}${total ? ' all' : ''}`});
  }
  if (f < .4) { // rate
    const c = pick(galRates), n = R(2, 6), u = R(c.lo, c.hi), m = R(n + 1, 10);
    const text = `${c.w(who, u * n, n)} ${c.q(who, m)}`;
    return story(text, {html: html(text, `${SLOT} ${c.u}`), ans: String(u * m), max: 3,
      hint: skyHint([['', 'Rate for 1:', `How many ${c.a} in 1 ${c.b.replace(/s$/, '')}? Divide: ${u * n} ÷ ${n} = ${u}.`],
        ['', 'Then scale up:', `In ${m} ${c.b} it is ${m} times as much. ${u} × ${m} = ?`]]),
      label: `story9 rate ${u * n} ${n} ${m}`});
  }
  if (f < .55) { // unit price, decimal answer
    const th = pick(galThings), n = R(2, 8), u = 5 * R(10, 180), m = R(2, 9);
    const tot = u * n, mm = m == n ? m + 1 : m;
    const text = `${n} ${th} cost ${skyMoney(tot)}. All the ${th} cost the same. How much do ${mm} ${th} cost?`;
    return story(text, {pad: 'dec', eq: 'value', html: html(text, `$ ${SLOT}`), ans: skyDec(u * mm), max: 4,
      hint: skyHint([['', 'Cost of one:', `Divide the cost by the number of ${th}: ${skyMoney(tot)} ÷ ${n} = ${skyMoney(u)}.`],
        ['', 'Then scale up:', `${mm} ${th} cost ${mm} times as much. ${skyMoney(u)} × ${mm} = ?`]]),
      label: `story9 price ${n} ${tot} ${mm}`});
  }
  if (f < .8) { // percent
    const kind = pick(['sale', 'part', 'tip']);
    if (kind == 'part') {
      const pct = pick([10, 20, 25, 50, 75, 30, 40, 60, 80]), tot = pick([20, 40, 60, 80, 100, 120, 200, 240]), part = tot * pct / 100;
      const text = `${who} answered ${pct}% of the ${tot} questions on a test correctly. How many questions did ${who} get right?`;
      return story(text, {html: html(text, `${SLOT} questions`), ans: String(part), max: 3,
        hint: skyHint([['', 'Percent means out of 100:', `${pct}% = ${pct}/100. Find ${pct}% of ${tot}.`], ['', 'Work it out:', `${tot} ÷ 100 × ${pct} = ? You can do ${tot} × ${pct} first, then ÷ 100.`]]),
        label: `story9 pct part ${pct} ${tot}`});
    }
    let pct, P, disc;
    for (;;) {
      pct = pick(kind == 'tip' ? [10, 15, 20, 25] : [10, 15, 20, 25, 30, 40, 50, 75]); P = 10 * R(2, 20);
      if ((P * pct) % 50 == 0 && !(kind == 'sale' && pct == 50)) break; // 50% off: the discount would equal the sale price
    }
    disc = P * pct / 100;
    if (kind == 'sale') {
      const text = `A jacket costs $${P}. It is on sale for ${pct}% off. What is the sale price?`;
      return story(text, {pad: 'dec', eq: 'value', html: html(text, `$ ${SLOT}`), ans: galNum(P - disc), max: 4,
        hint: skyHint([['', 'Percent off:', `${pct}% off means you take away ${pct}% of the price.`],
          ['', 'The discount:', `${pct}% of $${P} is ${P} × ${pct} ÷ 100 = $${galNum(disc)}.`], ['', 'Subtract:', `$${P} − $${galNum(disc)} = ?`]]),
        label: `story9 pct sale ${pct} ${P}`});
    }
    const text = `${who}'s meal costs $${P}. ${who} leaves a ${pct}% tip. How much is the tip, in dollars?`;
    return story(text, {pad: 'dec', eq: 'value', html: html(text, `$ ${SLOT}`), ans: galNum(disc), max: 4,
      hint: skyHint([['', 'Percent means out of 100:', `${pct}% = ${pct}/100.`], ['', 'Work it out:', `${P} × ${pct} ÷ 100 = ?`]]),
      label: `story9 pct tip ${pct} ${P}`});
  }
  // one-step equation stories
  const t = R(0, 4), v = pick(['n', 'x', 'p', 'k']);
  if (t == 0) { // add: some, and a more, makes b
    const a = R(3, 30), x = R(5, 60), b = x + a, th = pick(['stickers', 'marbles', 'cards', 'coins']);
    const text = `${who} has some ${th}. Then ${who} gets ${a} more and now has ${b}. How many ${th} did ${who} have at first?`;
    return story(text, {html: html(text, `${SLOT} ${th}`), ans: String(x), max: 2,
      hint: skyHint([['', 'Write an equation:', `Let ${v} be the number at first. ${v} + ${a} = ${b}.`], ['', 'Undo the adding:', `Subtract ${a} from both sides. ${b} − ${a} = ?`]]), label: `story9 eq add ${a} ${b}`});
  }
  if (t == 1) { // take away
    const a = R(3, 30), x = R(a + 3, 60), b = x - a, th = pick(['stickers', 'marbles', 'cards', 'coins']);
    const text = `${who} gives away ${a} ${th} and has ${b} left. How many ${th} did ${who} start with?`;
    return story(text, {html: html(text, `${SLOT} ${th}`), ans: String(x), max: 2,
      hint: skyHint([['', 'Write an equation:', `Let ${v} be the number at the start. ${v} − ${a} = ${b}.`], ['', 'Undo the taking away:', `Add ${a} to both sides. ${b} + ${a} = ?`]]), label: `story9 eq sub ${a} ${b}`});
  }
  if (t == 2) { // multiply: a groups of x make b
    const a = R(3, 9), x = R(3, 12), b = a * x, th = pick(['stickers', 'cards', 'beads', 'pencils']);
    const text = `${who} has ${a} equal packs of ${th}. There are ${b} ${th} in all. How many ${th} are in one pack?`;
    return story(text, {html: html(text, `${SLOT} ${th}`), ans: String(x), max: 2,
      hint: skyHint([['', 'Write an equation:', `Let ${v} be the number in one pack. ${a}${v} = ${b}.`], ['', 'Undo the multiplying:', `Divide both sides by ${a}. ${b} ÷ ${a} = ?`]]), label: `story9 eq mul ${a} ${b}`});
  }
  if (t == 3) { // divide: x shared among a gives b
    const a = R(3, 9), b = R(3, 12), x = a * b, th = pick(['stickers', 'cards', 'beads', 'grapes']);
    const text = `${who} shares some ${th} equally among ${a} friends. Each friend gets ${b}. How many ${th} did ${who} share?`;
    return story(text, {html: html(text, `${SLOT} ${th}`), ans: String(x), max: 3,
      hint: skyHint([['', 'Write an equation:', `Let ${v} be the number shared. ${v} ÷ ${a} = ${b}.`], ['', 'Undo the dividing:', `Multiply both sides by ${a}. ${b} × ${a} = ?`]]), label: `story9 eq div ${a} ${b}`});
  }
  // money: a pen costs $a more than a pencil
  const pa = 5 * R(5, 50), pn = pa + 5 * R(20, 80), th = pick([['pen', 'pencil'], ['book', 'card'], ['hat', 'scarf']]);
  const text = `A ${th[0]} costs ${skyMoney(pa)} more than a ${th[1]}. The ${th[0]} costs ${skyMoney(pn)}. How much does the ${th[1]} cost?`;
  const sub = stepsSub(((pn) / 100).toFixed(2), (pa / 100).toFixed(2));
  sub.steps.unshift(ST.step('', 'Write an equation:', `Let ${v} be the cost of the ${th[1]}. ${v} + ${skyMoney(pa)} = ${skyMoney(pn)}. Subtract ${skyMoney(pa)} from both sides.`, null));
  return story(text, {pad: 'dec', eq: 'value', html: html(text, `$ ${SLOT}`), ans: skyDec(pn - pa), max: 4, hint: sub, label: `story9 eq money ${pa} ${pn}`});
}
