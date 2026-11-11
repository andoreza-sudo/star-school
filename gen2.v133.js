/* Star School gen2 v133. BUILT by tools/build.py from 35-gen-math-upper.js, 36-gen-phonics.js, 37-bank.js, 37-comp.js, 39b-steps.js: never edit by hand.
   index.html v133 loads this file with <script src="gen2.v133.js"> after its own code, before data.v133.js. */
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
function fyDbig(lv) {
  const d = R(2, 9);
  let n, qt, rem = 0, html, extra = {};
  if (lv == 1) {
    qt = R(11, Math.min(49, Math.floor(99 / d)));
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
        `Look at the digit just to its right, in the ${below[p]} place. It is a ${nxt}.`,
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
      [pic, 'Same size pieces:', add ? `Both are ${FC_NAMES[d]}s, so you can put the pieces together.` : `Start with ${a} ${FC_NAMES[d]}s and take away ${b} of them.`],
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
      steps.push(['', 'Fractions:', `Add the tops: ${a} + ${b} = ? Keep ${d} on the bottom. Then write the ${w1 + w2} wholes and that fraction together.`]);
    }
  } else {
    do {
      d = R(3, 12); a = R(1, d - 1); b = R(1, d - 1); w1 = R(2, 9); w2 = R(1, w1 - 1);
    } while (a == b || (a < b && w1 - w2 < 2));
    if (a > b) {
      W = w1 - w2; n = a - b;
      steps = [['', 'Whole numbers:', `${w1} − ${w2} = ${w1 - w2}.`],
        ['', 'Fractions:', `${a}/${d} is bigger than ${b}/${d}, so just subtract the tops: ${a} − ${b} = ? Keep ${d} on the bottom. Then write the ${w1 - w2} wholes and that fraction together.`]];
    } else {
      W = w1 - w2 - 1; n = a + d - b;
      steps = [['', 'Whole numbers:', `${w1} − ${w2} = ${w1 - w2}.`],
        ['', 'Fractions:', `${a}/${d} is smaller than ${b}/${d}. Take 1 whole from the ${w1 - w2} wholes, so ${w1 - w2 - 1} wholes are left. That whole is ${d}/${d}, so now you have ${a + d}/${d}.`],
        ['', 'Now:', `${a + d} − ${b} = ? Keep ${d} on the bottom. Then write the ${w1 - w2 - 1} wholes and that fraction together.`]];
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
      ['', 'Add the tops:', `All the pieces are ${FC_NAMES[d]}s. ${w} × ${n} = ? Keep ${d} on the bottom.`],
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
      hint: {k: 'text', s: p == 1 ? 'The bottom is 10, so this is tenths: one digit after the decimal point. Write the top number in the tenths place.' + (W ? ` The ${W} wholes go in front of the point.` : '')
        : `The bottom is 100, so this is hundredths: two digits after the decimal point.${k < 10 ? ' The top has only one digit, so put a 0 in the tenths place first.' : ' The top number fills the tenths and hundredths places.'}${W ? ` The ${W} wholes go in front of the point.` : ''}`},
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
        `Look at the digit just to its right, in the ${vlPlaceName[-(keep + 1)]} place. It is a ${fdig}.`,
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
    steps.push(ST.step('', 'Not enough:', `${A}/${L} is smaller than ${C}/${L}. Take 1 whole from the ${w1}. That leaves ${w1 - 1} wholes, and the whole is ${L}/${L}, so you have ${A + L}/${L}.`, null));
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
      hint: ccHint([['', 'The picture:', `The orange rows show ${a}/${b}. The blue columns show ${c}/${d}. The dark boxes are in both. How many dark boxes? How many boxes in all?`],
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
    hint: ccHint([['', 'Mixed number to fraction:', `${W} ${c}/${d} is ${W} wholes of ${d}/${d}, and ${c}/${d} more. ${W} × ${d} + ${c} = ${top}, so it is ${top}/${d}.`],
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
    say: `${n} divided by ${fcSay(1, d)}. How many pieces of ${fcSay(1, d)} are in ${n} wholes?`, ans: String(n * d),
    hint: ccHint([['', 'Cut up the wholes:', `Each whole is cut into ${ccPl(d)}. How many ${ccPl(d)} make 1 whole?`],
      ['', 'Count them all:', `${n} wholes with ${d} pieces in each: ${n} × ${d} = ?`]]),
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
    return {kind: 'num', max: 2, html: `${plot}${head}<div class="sub">How many ${plural} are ${v % den ? v + '/' + den : v / den} ${v == den ? CC_SING[unit] : unit} long?</div><div class="eq">${SLOT}</div>`,
      say: `Each dot shows the length of one ${noun} in ${unit}. How many ${plural} are ${ccAmtSay(v, den)} ${v == den ? CC_SING[unit] : unit} long?`, ans: String(c),
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
        ['', 'Count:', `Start at 0 and count ${Math.abs(x)} steps to the ${x < 0 ? 'left' : 'right'}. Which spot is it?`]]),
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
      say: `One city is ${skySay(a)} degrees. Another is ${skySay(b)} degrees. Which is ${cold ? 'colder' : 'warmer'}?`,
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
        ['', 'Other side:', `${skyN(x)} is ${Math.abs(x)} steps ${x < 0 ? 'left' : 'right'} of 0. Go ${Math.abs(x)} steps ${x < 0 ? 'right' : 'left'} of 0. Where do you land?`]]),
      label: `int2 opp ${x}`};
  }
  let a, b;
  do {a = R(-10, 10); b = R(-10, 10)} while (a >= b || b - a < 2 || (a >= 0 && rnd() < .8));
  const pic = VIZ.numLine({min: -10, max: 10, marks: [a, b]});
  return {kind: 'num', pad: 'neg', max: 2,
    html: `${pic}<div class="sub">How far apart are ${skyN(a)} and ${skyN(b)}?</div><div class="eq">${SLOT} steps</div>`,
    say: `How many steps apart are ${skySay(a)} and ${skySay(b)} on the number line?`, ans: String(b - a),
    hint: skyHint([[pic, 'Count the gap:', `Start at ${skyN(a)} and count the steps to ${skyN(b)}.`],
      ['', a < 0 && b > 0 ? 'Cross zero:' : 'Same side of 0:', a < 0 && b > 0 ? `Count ${Math.abs(a)} steps to 0, then ${b} more steps. Add the two parts. What do you get?` : `Take the smaller distance from 0 away from the bigger one. What is the gap?`]]),
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
    hint: skyHint([[start, 'Start:', `Start at ${skyN(a)} on the number line.`], ['', 'Which way?', rule + ` Move ${Math.abs(b)} steps.`],
      [hop, 'Hop:', `Go ${Math.abs(b)} steps ${mv < 0 ? 'left' : 'right'} from ${skyN(a)}. Where do you land?`]]),
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
      hint: skyHint([['', 'Equal parts:', `${x} are ${p} parts, and ${p} parts are ${p * k}. One part is ${p * k} ÷ ${p} = ${k}.`],
        ['', total ? 'All the parts:' : `${y} are ${q} parts:`, total ? `${x} are ${p} parts and ${y} are ${q} parts, so there are ${p + q} parts in all. ${p + q} × ${k} = ?` : `Every part is ${k}. ${q} × ${k} = ?`]]),
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
/* ---------- early reading: sounds & rhymes ---------- */
function genSound(lv){const [w,e]=pick(lv==1?CVC.concat(BLEND.filter(x=>!/^(sh|ch|th|wh)/.test(x[0]))):CVC),ch=lv==1?w[0]:w[w.length-1];
  const opts=shuffle([ch,...shuffle([...'bcdfghjklmnprstvw'].filter(x=>x!=ch)).slice(0,2)]);
  return{kind:'choice',cls:'syms',html:`<div class="emo">${e}</div><div class="sub">${lv==1?'What sound does it START with?':'What sound does it END with?'}</div>`,
    say:`${w}. What sound does ${w} ${lv==1?'start':'end'} with?`,auto:true,ans:ch,after:w,choices:opts.map(x=>({l:x,v:x})),
    hint:{k:'say',w:`${w}... ${w}`,s:lv==1?'Say it slowly. Listen to the very first sound.':'Say it slowly. Listen to the very last sound.'},label:`${lv==1?'starts':'ends'}: ${w}`}}
const RHY=[[['cat','🐱'],['bat','🦇'],['hat','🎩'],['rat','🐀']],[['hen','🐔'],['pen','🖊️'],['ten','🔟']],[['bug','🐛'],['mug','☕']],[['dog','🐶'],['frog','🐸']],[['fox','🦊'],['box','📦']],
 [['cake','🎂'],['snake','🐍']],[['king','👑'],['ring','💍']],[['bee','🐝'],['tree','🌳']],[['goat','🐐'],['boat','⛵'],['coat','🧥']],[['sock','🧦'],['clock','🕐']],[['bell','🔔'],['shell','🐚']],
 [['car','🚗'],['star','⭐']],[['moon','🌙'],['spoon','🥄']],[['mouse','🐭'],['house','🏠']]];
function genRhyme(lv){const fi=R(0,RHY.length-1),fam=RHY[fi],[t,r]=shuffle(fam),others=shuffle(RHY.filter((_,i)=>i!=fi)).slice(0,2).map(f=>pick(f));
  const opts=shuffle([r,...others]);
  return{kind:'choice',cls:lv==1?'pics':'',html:`<div class="emo">${t[1]}</div><div class="sub">${lv==1?`Which picture rhymes with “${t[0]}”?`:`Which word rhymes with “${t[0]}”?`}</div>`,
    say:`Which one rhymes with ${t[0]}?`,auto:true,ans:r[0],after:`${t[0]}, ${r[0]}!`,choices:opts.map(x=>({l:lv==1?x[1]:x[0],v:x[0]})),
    hint:{k:'text',s:`Rhymes sound the same at the end: ${t[0].slice(-2)}…`},label:`rhyme: ${t[0]}`}}

/* ---------- content banks (P1-09) ---------- */
/* Fact content (grammar, vocabulary, passages, science) is DATA in src/data/d-*.js and is turned into questions here.
   Data files load after all code, so a data file may do `BANK.gram=[...]` at load time, but code in this file may read
   BANK and PASS only inside functions (at run time).

   BANK[id] = [item, ...]   item (CURRICULUM.md section 8):
     lv     skill level (whole number, 1 and up)                      required
     q      question text; '___' marks a blank (shown as a slot)      required (not for match)
     a      right answer (a list for form 'multi')
     d      2 or 3 wrong answers (forms choice, wide, multi)
     form   'choice' (default) | 'wide' | 'tap' | 'spell' | 'order' | 'match' | 'multi'
     sent   tap: the sentence; the child taps the word that is the answer
     order  order: the items in the right order      pairs  match: [[left, right], ...]
     label  short unique name for the report and review (default: q + answer; passages use title + number)
     topic  strand tag for the report card   hint  teaching hint   pic  icon name from ICONS   say  text to read instead of q
     em     [art name, emoji]: a picture of a thing above the prompt, through picFor (P2-22)
   choice and wide make a `choice` question (wide = one button per row), tap a `choice` over the words of the sentence,
   spell a `build` question. order, match and multi need their own question kind (P1-03/P1-04): such a kind registers its
   builder as BANKF.form=(item, id)=>question; until it does, those items are never drawn.

   PASS[id] = [{lv, title, text, qs:[item, ...]}]: one passage and its questions (items as above, forms choice or wide).
   Every question of a passage carries q.ctx = {title, text}; renderQ shows it in a collapsible, scrollable panel
   (bankCtx) above the prompt; the words of the text are tap-to-hear.

   A skill uses a bank by calling genBank in its gen. A passage skill also gives a round hook: start() in 50-round.js calls
   SK[sk].round(lv) and plays the returned list of questions as the whole round (round length = list length).
     SK.gram={t:'Grammar',e:'...',area:'read',max:5,bank:'gram',gen:lv=>genBank('gram',lv)}
     SK.story={t:'Story',e:'...',area:'read',max:2,bank:'story',gen:lv=>genPassage('story',lv),round:lv=>passageRound('story','story',lv)}

   Choosing an item: in live play (a round has started: BANKLIVE) the least recently shown item of the level comes first, and
   never-shown ones before shown ones. Without a round (tests, review, race) the choice depends on the seed only, so
   genQ(sk, lv, seed) is reproducible. Every question carries q.bk, a small spec; bankRebuild(q.bk) makes the same question again. */
const BANK={};
const PASS={};
const BANKF={}; // builders for forms that need another question kind: BANKF.order=(item, id)=>question
const BANKFORMS=['choice','wide','tap','spell','order','match','multi'];
let BANKLIVE=false; // set by bankRound() when a round starts
let BANKTICK=0;
const BANKMEM={}; // 'id' or 'P:id' -> {index: tick when last shown}; this session only, never saved

function bankRound(){BANKLIVE=true}
function bankReset(){
  BANKLIVE=false;
  BANKTICK=0;
  for(const k in BANKMEM)delete BANKMEM[k];
}

const bankSeed=()=>Math.floor(rnd()*4294967296)>>>0;
const bankSub=(s,i)=>(s^Math.imul(i+1,0x9E3779B1))>>>0;
// run fn with a private seeded random stream; the caller's stream is restored even when fn throws
function bankWith(seed,fn){
  const prev=RNG;
  RNG=mulberry32(seed>>>0);
  try{return fn()}
  finally{RNG=prev}
}
// which candidate index comes next. Live: least recently shown, never-shown first. Otherwise: by the seed only.
function bankChoose(key,cands,s){
  const P=mulberry32(s);
  if(!BANKLIVE)return cands[Math.floor(P()*cands.length)];
  const mem=BANKMEM[key]||(BANKMEM[key]={});
  const lo=Math.min(...cands.map(i=>mem[i]||0));
  const tie=cands.filter(i=>(mem[i]||0)==lo);
  const i=tie[Math.floor(P()*tie.length)];
  mem[i]=++BANKTICK;
  return i;
}
const bankCan=it=>it.form=='order'||it.form=='match'||it.form=='multi'?!!(BANKF[it.form]&&KIND[it.form]):true;
const bankTxt=t=>esc(t).replace(/\*([^*]+)\*/g,'<b>$1</b>').replace(/___/g,SLOT); // a word between * stars * prints in bold (P2-23)
const bankSay=t=>String(t).replace(/\*/g,'').replace(/___/g,'blank');
const bankWords=t=>String(t).split(/[^A-Za-z']+/).filter(Boolean);

// One question from one item. Call it inside bankWith so shuffle() uses the item's own random stream.
function bankBuild(id,it,pass){
  const form=it.form||'choice';
  const pic=it.em?`<div class="bpic bem">${picFor(it.em[0],it.em[1])}</div>`:it.pic&&ICONS[it.pic]?`<div class="bpic">${ico(it.pic,64)}</div>`:'';
  let q;
  if(form=='spell'){
    const w=it.a,abc='abcdefghijklmnoprstuw';
    const extra=shuffle([...abc].filter(c=>!w.includes(c))).slice(0,2);
    q={kind:'build',word:w,tiles:shuffle([...w,...extra]),ans:w,hint:{k:'next'},
      html:`${pic}<div class="bq">${esc(it.q)}</div><div class="lslots">${[...w].map((_,i)=>`<span class="ls" id="ls${i}"></span>`).join('')}</div>`};
  }
  else if(form=='tap'){
    const seen=new Set();
    const ws=bankWords(it.sent).filter(x=>!seen.has(x)&&seen.add(x));
    q={kind:'choice',cls:'bwords',ans:it.a,choices:ws.map(x=>({v:x,l:x})),
      html:`${pic}<div class="bq">${esc(it.q)}</div><div class="bsent">${esc(it.sent)}</div>`};
  }
  else if(form!='choice'&&form!='wide')q=BANKF[form](it,id);
  // a word longer than 7 letters does not fit a half-width button at 380 px ("remember", "basketball"): such items get one choice per row
  else q={kind:'choice',cls:(form=='wide'||!pass&&[it.a,...it.d].some(x=>String(x).length>7)?'wide':'')+(pass?' bpass':''),ans:it.a,choices:shuffle([it.a,...it.d]).map(x=>({v:x,l:x})),
    html:`${pic}<div class="bq">${bankTxt(it.q)}</div>`};
  if(!q.hint)q.hint={k:'text',s:it.hint||'Read it again slowly. Which one fits best?'};
  else if(it.hint&&q.hint.k=='text')q.hint.s=it.hint;
  q.say=it.say||bankSay(it.q);
  if(it.label)q.label=it.label; // label: optional, for long prompts (passages)
  else{const a=(Array.isArray(it.a)?it.a.join(','):it.a).slice(0,24);q.label=it.q.replace(/\*/g,'').slice(0,56-a.length)+' = '+a} // under 60 letters in all (P2-23)
  if(it.topic)q.topic=it.topic;
  if(pass)q.ctx={title:pass.title,text:pass.text};
  return q;
}

/* genBank(id, lv): one question from BANK[id] at level lv. o.bi forces the item and o.s the seed (both used by bankRebuild). */
function genBank(id,lv,o={}){
  const items=BANK[id]||[];
  const s0=o.s!=null?o.s:bankSeed();
  const cands=items.map((it,i)=>i).filter(i=>items[i].lv==lv&&bankCan(items[i]));
  if(!cands.length)throw new Error('bank '+id+' has no usable item at level '+lv);
  const bi=o.bi!=null?o.bi:bankChoose(id,cands,s0);
  const q=bankWith(bankSub(s0,bi),()=>bankBuild(id,items[bi]));
  q.bk={id,lv,bi,s:s0};
  return q;
}

/* genPassage(id, lv): one question (with its passage as q.ctx) from a passage of level lv. Used as the skill's gen, so
   boss fights, mixed rounds and review can ask a passage question on its own. o.bp, o.qi, o.s force passage, question, seed. */
function genPassage(id,lv,o={}){
  const ps=PASS[id]||[];
  const s0=o.s!=null?o.s:bankSeed();
  const cands=ps.map((p,i)=>i).filter(i=>ps[i].lv==lv);
  if(!cands.length)throw new Error('passages '+id+' has none at level '+lv);
  const bp=o.bp!=null?o.bp:bankChoose('P:'+id,cands,s0);
  const qs=ps[bp].qs;
  const qi=o.qi!=null?o.qi:Math.floor(mulberry32(bankSub(s0,99))()*qs.length);
  const q=bankWith(bankSub(s0,bp*16+qi),()=>bankBuild(id,qs[qi],ps[bp]));
  q.bk={id,lv,bp,qi,s:s0};
  return q;
}

/* passageRound(sk, id, lv): a whole round for the SK[sk].round hook: one passage, all its questions in order. Questions are
   stamped with sk, lv and seed like genQ does (check() reads q.sk). */
function passageRound(sk,id,lv){
  const ps=PASS[id]||[];
  const s0=bankSeed();
  const cands=ps.map((p,i)=>i).filter(i=>ps[i].lv==lv);
  if(!cands.length)throw new Error('passages '+id+' has none at level '+lv);
  const bp=bankChoose('P:'+id,cands,s0);
  return ps[bp].qs.map((_,qi)=>{
    const q=genPassage(id,lv,{bp,qi,s:s0});
    q.sk=sk;q.lv=lv;q.seed=s0;
    return q;
  });
}

// the same question again from a saved q.bk
function bankRebuild(bk){
  return bk.qi!=null?genPassage(bk.id,bk.lv,{bp:bk.bp,qi:bk.qi,s:bk.s}):genBank(bk.id,bk.lv,{bi:bk.bi,s:bk.s});
}

/* The passage panel (q.ctx): a <details> that is open by default; the body scrolls when the text is long.
   renderQ puts bankCtx(q.ctx) above the prompt. The words use the existing .w spans, so renderQ's tap-to-hear works.
   The "Hear it" button uses data-say, which renderQ also binds. ontoggle re-fits the question after open/close. */
function bankCtx(c){
  // c.html (P2-35 Spanish dialogues): the panel body is made by the generator (a speak button per line) instead of the English text
  if(c.html)return `<details class="bctx dlg" open ontoggle="fit()"><summary class="bctx-h"><span class="bctx-t">${esc(c.title||'Read')}</span>`
    +`<span class="bctx-s"><span class="bctx-hide">Hide</span><span class="bctx-show">Show</span></span></summary><div class="bctx-b">${c.html}</div></details>`;
  return `<details class="bctx${c.text.length>700?' long':''}" open ontoggle="fit()"><summary class="bctx-h"><span class="bctx-t">${esc(c.title||'Read')}</span>`
    +'<span class="bctx-s"><span class="bctx-hide">Hide</span><span class="bctx-show">Show</span></span></summary>'
    +`<div class="bctx-b"><button class="btn sm bctx-say" data-say="${esc(c.text)}">${ico('speak',22)} Hear the story</button>`
    +`<p class="bctx-p">${words(c.text)}</p></div></details>`;
}

/* ---------- validator (run by tools/test.js; reused by content chunks) ---------- */
const BANKLIM={q:140,choice:60,hint:140,text:2000,title:40};
function bankBadWords(t){return bankWords(t).map(w=>w.toLowerCase()).filter(w=>BAD.test(w))}
// problems with one item; where is a label for the message
function bankItemProblems(it,where){
  const p=[],form=it.form||'choice',w=where+': ';
  const str=(v,max,name)=>{
    if(typeof v!=='string'||!v.trim()){p.push(w+name+' is not a text');return false}
    if(v.length>max)p.push(w+name+' is longer than '+max);
    for(const b of bankBadWords(v))p.push(w+name+' has a bad word: '+b);
    return true;
  };
  if(!Number.isInteger(it.lv)||it.lv<1)p.push(w+'lv must be a whole number from 1');
  if(!BANKFORMS.includes(form)){p.push(w+'unknown form '+form);return p}
  if(form!='match')str(it.q,BANKLIM.q,'q');
  if(it.hint!=null)str(it.hint,BANKLIM.hint,'hint');
  if(it.say!=null)str(it.say,BANKLIM.q,'say');
  if(it.pic!=null&&typeof ICONS!=='undefined'&&!ICONS[it.pic])p.push(w+'pic '+it.pic+' is not an icon');
  if(it.em!=null&&!(Array.isArray(it.em)&&it.em.length==2&&/^[a-z-]+$/.test(it.em[0])&&typeof it.em[1]=='string'&&it.em[1]))p.push(w+'em must be [art name, emoji]');
  const distinct=(a,name)=>{if(new Set(a.map(x=>String(x).toLowerCase())).size!==a.length)p.push(w+name+' has duplicates')};
  if(form=='choice'||form=='wide'||form=='multi'){
    const as=form=='multi'?it.a:[it.a];
    if(form=='multi'&&(!Array.isArray(it.a)||it.a.length<2||it.a.length>4))p.push(w+'multi needs 2 to 4 answers in a');
    else{
      if(!Array.isArray(it.d)||it.d.length<2||it.d.length>3)p.push(w+'d needs 2 or 3 distractors');
      else{
        const all=[...as,...it.d];
        if(all.every(x=>str(x,BANKLIM.choice,'choice "'+x+'"')))distinct(all,'a and d');
      }
    }
  }
  else if(form=='tap'){
    str(it.sent,BANKLIM.q,'sent');
    if(typeof it.sent==='string'&&typeof it.a==='string'){
      const n=bankWords(it.sent).filter(x=>x==it.a).length;
      if(n!==1)p.push(w+'a must be one word that appears exactly once in sent (found '+n+')');
      if(bankWords(it.sent).length<2)p.push(w+'sent needs at least 2 words');
    }
  }
  else if(form=='spell'){
    if(typeof it.a!=='string'||!/^[a-z]{2,12}$/.test(it.a))p.push(w+'spell a must be 2 to 12 lowercase letters');
    else for(const b of bankBadWords(it.a))p.push(w+'a has a bad word: '+b);
  }
  else if(form=='order'){
    if(!Array.isArray(it.order)||it.order.length<3||it.order.length>6)p.push(w+'order needs 3 to 6 items');
    else if(it.order.every(x=>str(x,BANKLIM.choice,'order item')))distinct(it.order,'order');
  }
  else if(form=='match'){
    if(!Array.isArray(it.pairs)||it.pairs.length<3||it.pairs.length>5||it.pairs.some(x=>!Array.isArray(x)||x.length!==2))
      p.push(w+'pairs needs 3 to 5 [left, right] pairs');
    else if(it.pairs.flat().every(x=>str(x,BANKLIM.choice,'pair text'))){
      distinct(it.pairs.map(x=>x[0]),'pair lefts');
      distinct(it.pairs.map(x=>x[1]),'pair rights');
    }
  }
  return p;
}
// problems with a whole bank: every item, no duplicate q+a, at least min items for each level in levels
function bankProblems(id,o={}){
  const items=BANK[id],p=[];
  if(!Array.isArray(items)||!items.length)return['BANK.'+id+' is missing or empty'];
  const seen=new Set();
  items.forEach((it,i)=>{
    p.push(...bankItemProblems(it,'BANK.'+id+'['+i+']'));
    const k=(it.q||'')+'|'+JSON.stringify(it.a!=null?it.a:it.pairs||it.order);
    if(seen.has(k))p.push('BANK.'+id+'['+i+']: same q and a as an earlier item');
    seen.add(k);
  });
  for(const lv of o.levels||[]){
    const n=items.filter(it=>it.lv==lv).length;
    if(n<(o.min||0))p.push('BANK.'+id+' level '+lv+' has '+n+' items, needs '+(o.min));
  }
  return p;
}
// problems with the passages of one id
function passageProblems(id){
  const ps=PASS[id],p=[];
  if(!Array.isArray(ps)||!ps.length)return['PASS.'+id+' is missing or empty'];
  ps.forEach((x,i)=>{
    const w='PASS.'+id+'['+i+']';
    if(!Number.isInteger(x.lv)||x.lv<1)p.push(w+': lv must be a whole number from 1');
    for(const [k,max] of [['title',BANKLIM.title],['text',BANKLIM.text]]){
      if(typeof x[k]!=='string'||!x[k].trim())p.push(w+': '+k+' is not a text');
      else{
        if(x[k].length>max)p.push(w+': '+k+' is longer than '+max);
        for(const b of bankBadWords(x[k]))p.push(w+': '+k+' has a bad word: '+b);
      }
    }
    if(!Array.isArray(x.qs)||x.qs.length<3||x.qs.length>6)p.push(w+': qs needs 3 to 6 questions');
    else x.qs.forEach((it,j)=>{
      p.push(...bankItemProblems({lv:x.lv,...it},w+'.qs['+j+']'));
      if(it.form&&it.form!='choice'&&it.form!='wide')p.push(w+'.qs['+j+']: passage questions use choice or wide');
    });
  });
  return p;
}
/* ---------- comprehension framework (P2-25) ----------
   Two skills share the passage engine of 37-bank.js: comp (stories) and info (nonfiction). One grade is one set of 10 passages
   (5 fiction, 5 nonfiction) written in src/data/d-comp.js; CURRICULUM.md section 4 "E-comp" has the table.

   HOW A GRADE IS ADDED (P2-26 to P2-29): in d-comp.js, above the passages of the grade, set the grade's rules and add the passages:
       COMPSPEC[3]={words:[90,130],sent:12,maxSent:18,fk:5,need:['main','detail','cause','vocab','feel']};
       compAdd([{id:'g3f01', g:3, type:'f', title:'...', text:['Sentence one.', ...],
                 qs:[{t:'main', q:'...', a:'...', d:['...','...','...'], ev:[2,5]}, ...]}, ...]);
   then, outside the data file: SK.comp.max and SK.info.max in 38-skills.js, the two stops in the grade's world in 42-paths.js
   (CURRICULUM section 2.2), and the grade's check in tools/test.js calls compProblems(grade) (the P2-25 check loops over every
   grade that has passages, so a new grade is covered as soon as its COMPSPEC row exists). Nothing else changes: compAdd turns the
   passages into PASS.comp / PASS.info items, and the round, hints, review and boss fights already work for them.

   Skill levels: comp 3..7 = grades 2..6 (comp 1 and 2 are the old picture stories of 32-gen-read.js, unchanged); info 1..5 =
   grades 2..6. compLv(type, grade) does the mapping. Never reorder or insert passages in the middle of d-comp.js: saved review
   items remember a passage by its position in PASS (q.bk.bp), so new passages are always appended. Data may be read here only at
   run time.

   Passage data (CURRICULUM section 4): text is a list of sentences; each question has
     t    type: main detail sequence vocab infer (grade 2); cause feel feature summary theme structure compare pov evidence purpose
          figure claim (later grades), see COMPTYPES
     ev   0-based indexes of the sentences that answer it (tested: they exist, and the answer's words are in the passage)
   compAdd also makes the hint: for detail, sequence, vocab and infer it quotes the evidence sentences that fit in 140 characters
   ("Look back at the story"); keep the first evidence sentence short enough to fit.
   A round is COMPN passages in a row (compRound); the passage panel stays open above each question (bankCtx). */
const COMP=[];            // the passages exactly as authored (type 'f' or 'n')
const COMPSPEC={};        // grade -> {words:[min,max], sent: most words per sentence on average, maxSent, fk: most Flesch-Kincaid grade, need:[types]}
const COMPN=2;            // passages in one round
const COMPSK={f:'comp',n:'info'};
const compLv=(type,g)=>type=='f'?g+1:g-1;
const COMPTYPES={
  main:'main idea',detail:'detail',sequence:'sequence',vocab:'vocabulary in context',infer:'inference',cause:'cause and effect',
  feel:'character feeling',feature:'text feature',summary:'summary',theme:'theme',structure:'text structure',compare:'compare',
  pov:'point of view',evidence:'best evidence',purpose:'author purpose',figure:'figurative meaning',claim:'claim'
};
const COMPHINT={
  main:'Think about the whole story. What is it mostly about?',
  detail:'Find the part of the story that tells you.',
  sequence:'Think about the order. What came first, next, and last?',
  vocab:'Read the sentence around the word. Which meaning fits?',
  infer:'The story does not say it. Use the clues to figure it out.'
};

/* Turns authored passages into PASS items (and keeps them in COMP for the tests). Appends only. */
function compAdd(list){
  for(const p of list){
    COMP.push(p);
    const sk=COMPSK[p.type],pool=PASS[sk]||(PASS[sk]=[]);
    pool.push({
      lv:compLv(p.type,p.g),id:p.id,g:p.g,title:p.title,text:p.text.join(' '),sents:p.text,
      qs:p.qs.map((it,j)=>{
        const long=[it.a,...it.d].some(x=>x.length>16);
        let hint=COMPHINT[it.t]||'Read the story again. Which one fits best?';
        if(['detail','sequence','vocab','infer'].includes(it.t)){
          // quote as many of the evidence sentences as fit in a hint (at least the first)
          for(let k=it.ev.length;k>0;k--){
            const h='Look back at the story: "'+it.ev.slice(0,k).map(i=>p.text[i]).join(' ')+'"';
            if(h.length<=140){hint=h;break}
          }
        }
        return{q:it.q,a:it.a,d:it.d,form:long?'wide':'choice',topic:it.t,hint,t:it.t,ev:it.ev,label:p.title+' #'+(j+1)+' '+it.t};
      })
    });
  }
}

/* The dispatcher of the Story Time skill: levels 1-2 are the old picture stories, 3 and up are passages. */
const genCompLv=lv=>lv>2?genPassage('comp',lv):genComp(lv);
const compRoundLv=lv=>lv>2?compRound('comp',lv):null; // null = an ordinary round of generated questions

/* A round of COMPN passages (fewer when the level has fewer), all questions of each in order. Questions are stamped with sk, lv
   and seed like genQ does. A passage is picked like genPassage picks it: never-shown first when a round is live. */
function compRound(sk,lv){
  const ps=PASS[sk]||[],s0=bankSeed();
  let cands=ps.map((p,i)=>i).filter(i=>ps[i].lv==lv);
  if(!cands.length)throw new Error('passages '+sk+' has none at level '+lv);
  const out=[];
  for(let k=0;k<COMPN&&cands.length;k++){
    const bp=bankChoose('P:'+sk,cands,bankSub(s0,k));
    cands=cands.filter(i=>i!=bp);
    ps[bp].qs.forEach((_,qi)=>{
      const q=genPassage(sk,lv,{bp,qi,s:s0});
      q.sk=sk;q.lv=lv;q.seed=s0;
      out.push(q);
    });
  }
  return out;
}

/* ---------- validator (run by tools/test.js; reused by P2-26 to P2-29) ---------- */
const COMPSTOP=new Set('the and was were her his she they them then that this with from have had has for are not but all can out one you its our your who how what when why where which than into over under after before while each some very just also too'.split(' '));
const compContent=t=>bankWords(t).map(w=>w.toLowerCase()).filter(w=>w.length>=3&&!COMPSTOP.has(w));
function compSyl(w){
  w=w.toLowerCase().replace(/[^a-z]/g,'');
  if(w.length<=3)return 1;
  w=w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,'').replace(/^y/,'');
  const m=w.match(/[aeiouy]{1,2}/g);
  return m?m.length:1;
}
// Flesch-Kincaid grade of a list of sentences
function compFK(sents){
  const ws=sents.flatMap(bankWords);
  const syl=ws.reduce((a,w)=>a+compSyl(w),0);
  return .39*ws.length/sents.length+11.8*syl/ws.length-15.59;
}
// problems with the passages of one grade (a spec for the grade must exist in COMPSPEC)
function compProblems(g){
  const sp=COMPSPEC[g],ps=COMP.filter(p=>p.g==g),p=[];
  if(!sp)return['COMPSPEC['+g+'] is missing'];
  const ids=new Set();
  for(const t of ['f','n']){
    const n=ps.filter(x=>x.type==t).length;
    if(n!==5)p.push('grade '+g+' has '+n+' '+(t=='f'?'fiction':'nonfiction')+' passages, needs 5');
  }
  const longest=[]; // is the right answer the longest choice?
  for(const x of ps){
    const w=x.id+': ';
    if(ids.has(x.id))p.push(w+'id used twice');
    ids.add(x.id);
    if(!/^g\d[fn]\d\d$/.test(x.id)||x.id[1]!=g||x.id[2]!=x.type)p.push(w+'id must look like g'+g+(x.type||'f')+'01');
    if(!Array.isArray(x.text)||!x.text.length||x.text.some(s=>typeof s!=='string'||!s.trim())){p.push(w+'text must be a list of sentences');continue}
    const words=x.text.flatMap(bankWords),lens=x.text.map(s=>bankWords(s).length);
    if(words.length<sp.words[0]||words.length>sp.words[1])p.push(w+words.length+' words, needs '+sp.words.join(' to '));
    if(Math.max(...lens)>sp.maxSent)p.push(w+'a sentence has '+Math.max(...lens)+' words, most is '+sp.maxSent);
    if(words.length/x.text.length>sp.sent)p.push(w+'sentences average '+(words.length/x.text.length).toFixed(1)+' words, most is '+sp.sent);
    const fk=compFK(x.text);
    if(fk>sp.fk)p.push(w+'reading grade '+fk.toFixed(1)+', most is '+sp.fk);
    const body=new Set(words.map(v=>v.toLowerCase()));
    if(x.qs.length!==5)p.push(w+'needs 5 questions');
    const types=x.qs.map(q=>q.t);
    for(const need of (Array.isArray(sp.need)?sp.need:sp.need[x.type]))if(!types.includes(need))p.push(w+'no '+need+' question');
    x.qs.forEach((q,j)=>{
      const ww=w+'qs['+j+'] ';
      if(!COMPTYPES[q.t])p.push(ww+'unknown type '+q.t);
      if(!Array.isArray(q.ev)||!q.ev.length||q.ev.some(i=>!Number.isInteger(i)||i<0||i>=x.text.length)){p.push(ww+'ev must list sentence indexes that exist');return}
      const evw=new Set(q.ev.flatMap(i=>compContent(x.text[i])));
      if(q.t=='detail'||q.t=='sequence'){
        const miss=compContent(q.a).filter(v=>!body.has(v));
        if(miss.length)p.push(ww+'answer words not in the passage: '+miss.join(' '));
        if(!compContent(q.a).some(v=>evw.has(v)))p.push(ww+'no answer word is in the evidence sentences');
      }
      if(q.t=='detail')for(const d of q.d){
        const c=compContent(d);
        if(c.length&&c.every(v=>evw.has(v)))p.push(ww+'wrong choice "'+d+'" is also supported by the evidence');
      }
      if(q.t=='vocab'){
        const m=/"([^"]+)"/.exec(q.q);
        if(!m)p.push(ww+'vocab question must quote the word');
        else if(!q.ev.some(i=>x.text[i].toLowerCase().includes(m[1].toLowerCase())))p.push(ww+'quoted word "'+m[1]+'" is not in the evidence sentence');
      }
      longest.push([q.a,...q.d].every(v=>v===q.a||v.length<q.a.length));
    });
  }
  const share=longest.filter(Boolean).length/(longest.length||1);
  if(share>.5)p.push('the right answer is the longest choice in '+Math.round(share*100)+'% of the questions (most 50%)');
  // the PASS items hold exactly these passages, in order
  for(const sk of ['comp','info']){
    const items=(PASS[sk]||[]).filter(q=>q.g==g);
    const want=ps.filter(x=>COMPSK[x.type]==sk);
    if(items.length!==want.length)p.push('PASS.'+sk+' has '+items.length+' grade '+g+' passages, COMP has '+want.length);
    items.forEach((it,i)=>{
      const x=want[i];
      if(x&&(it.text!==x.text.join(' ')||it.lv!==compLv(x.type,g)))p.push('PASS.'+sk+' '+it.id+' does not match its source');
    });
  }
  return p;
}

/* Tests iterate skill levels 1..max; a passage level with no passages yet (until its grade chunk ships) cannot give a question.
   skLvEmpty says so, skLvPick moves a level down to the nearest one that has questions. Both are false/identity for every other skill. */
const skLvEmpty=(sk,lv)=>(sk=='info'||(sk=='comp'&&lv>2))&&!(PASS[sk]||[]).some(p=>p.lv==lv);
const skLvPick=(sk,lv)=>{while(lv>1&&skLvEmpty(sk,lv))lv--;return lv};
/* ---------- P2-08 step-by-step hints: step builders and vertical layouts (CURRICULUM M-hints) ----------
   A step hint is {k: 'steps', steps: [{html, say, c}], w}. hintHTML (39-hints.js) shows one step at a time; each tap on Help
   (it reads "Next step" while steps remain) shows the next one. The last step never shows the answer: it shows the last
   small computation with a "?" ("Hundreds: 1 + 4 + 2 = ?").
   Builders (each returns the whole hint object, so a generator writes  hint: stepsAdd(a, b)):
     stepsAdd(a, b, ...)             column addition with carries; 2 or more addends; decimals line up on the point ('3.4', '12.75')
     stepsSub(a, b)                  column subtraction with regrouping marks (across zeros too); a >= b; decimals as above
     stepsMul(a, b, how)             'pp' partial products (the default up to 3 x 2 digits) or 'std' standard algorithm with carries
     stepsDiv(a, b)                  long division: divide, multiply and subtract, bring down; the remainder is the last step
     stepsEquivFrac(n, d, n2, d2)    n/d = n2/d2 with one of n2, d2 null (the unknown): the same number on the top and the bottom
     stepsCommonDen(a, b, c, d, op)  a/b op c/d, op '+', '-' or 'cmp': a common bottom, rename both, then add, subtract or compare
     stepsStory(list)                text-only steps (strings, or {s, say}) for word problems and other multi-step hints
   Prompt layouts that match the boards: ST.vert(nums, op, slot) (stacked, points lined up) and ST.ldiv(a, b, slot).
   Each step carries c, a record of the computation it shows ({op, x, r, ...}; r is null in the last step), so tools/test.js
   can check every number and that the steps lead to the answer. stepsMul and stepsDiv take whole numbers. */

const ST = {
  NAME: {'-3': 'thousandths', '-2': 'hundredths', '-1': 'tenths', 0: 'ones', 1: 'tens', 2: 'hundreds', 3: 'thousands',
    4: 'ten thousands', 5: 'hundred thousands', 6: 'millions', 7: 'ten millions', 8: 'hundred millions'},
  ONE: {'-2': 'hundredth', '-1': 'tenth', 0: 'one', 1: 'ten', 2: 'hundred', 3: 'thousand', 4: 'ten thousand', 5: 'hundred thousand',
    6: 'million', 7: 'ten million'},
  cap: s => s.charAt(0).toUpperCase() + s.slice(1),
  // spoken form of a caption: symbols as words, "= ?" as "is what?"
  spk: s => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/ \+ /g, ' plus ').replace(/ − /g, ' minus ')
    .replace(/ × /g, ' times ').replace(/ ÷ /g, ' divided by ').replace(/ = \?/g, ' is what?').replace(/ = /g, ' is ')
    .replace(/(\d)\/(\d+)/g, '$1 over $2'),
  // a number or numeric string (decimals allowed) -> {i: whole-number digits, f: decimal digits}
  parse(x) {
    const s = String(x).trim();
    if (!/^\d+(\.\d+)?$/.test(s)) throw new Error('steps: not a number: ' + x);
    const [i, f = ''] = s.split('.');
    return {i: i.replace(/^0+(?=\d)/, ''), f};
  },
  // digit of a parsed number at the power of ten e, when the numbers share d decimal places; null when it has none there.
  // A missing decimal digit is a 0 written only to line up the points (ST.pad).
  dig(n, e, d) {
    if (e >= 0) return e < n.i.length ? +n.i[n.i.length - 1 - e] : null;
    const k = -e - 1;
    return k < n.f.length ? +n.f[k] : k < d ? 0 : null;
  },
  pad: (n, e) => e < 0 && -e - 1 >= n.f.length,
  scaled: (n, d) => +(n.i + n.f.padEnd(d, '0')), // the number times 10^d, as a whole number
  // "the 4", "the 4 and 5", "the 9, 9 and 4"
  list: a => 'the ' + (a.length < 2 ? a[0] : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]),
  digits: n => String(n).split('').map(Number),
  // a line row under the places hi..lo; op: the line also runs under the operator column
  line(hi, lo, op) {
    const c = {};
    for (let e = hi; e >= lo; e--) c[e] = true;
    return {k: 'ln', c, op: op ? 1 : 0};
  },
  // digits of a whole number as row cells, ones at place lo; k: class for every cell
  cells(n, lo = 0, k = '') {
    const c = {};
    ST.digits(n).reverse().forEach((v, i) => { c[lo + i] = {t: v, k}; });
    return c;
  },

  /* The work board: a grid of digit cells, one column per place from top down to -d, a narrow point column after the ones
     when d > 0, and an operator column on the left. rows: [{k, op, pt, c, ok}]; k 'cy' (small carries and regroup marks),
     'n' (digits) or 'ln' (a line under the places in c); c maps a power of ten to a cell, a string or {t, k, span}; ok: a class
     for the operator cell. Cell classes: on (used in this step), nw (written in this step), x (crossed out), pz (a 0 written to
     line up the points), ask (the "?" of the last step), src (a digit just brought down), sg (a minus sign). */
  board(top, d, rows, cls) {
    const es = [];
    for (let e = top; e >= -d; e--) {
      es.push(e);
      if (e == 0 && d) es.push('pt');
    }
    const tpl = 'auto ' + es.map(e => (e == 'pt' ? 'var(--hpt)' : 'var(--hsw)')).join(' ');
    let h = '';
    for (const r of rows) {
      // r.od: an older row that small screens hide; r.ct: the first row shown after hidden ones (39-steps.css)
      const k = r.k || 'n', kk = k + (r.od ? ' od' : '') + (r.ct ? ' ct' : '');
      h += `<i class="op ${kk}${k == 'ln' && !r.op ? ' l0' : ''}${r.ok ? ' ' + r.ok : ''}">${k == 'ln' ? '' : r.op || ''}</i>`;
      for (let j = 0; j < es.length; j++) {
        const e = es[j];
        if (k == 'ln') {
          const on = e == 'pt' ? r.c[0] && r.c[-1] : r.c[e];
          h += `<i class="${kk}${on ? '' : ' l0'}${on && on.k ? ' ' + on.k : ''}"></i>`;
        } else if (e == 'pt') {
          h += `<i class="pt ${kk}">${r.pt ? '.' : ''}</i>`;
        } else if (r.c[e] == null || r.c[e] === '') {
          h += `<i class="${kk}"></i>`;
        } else {
          const cell = typeof r.c[e] == 'object' ? r.c[e] : {t: r.c[e]};
          const span = cell.span > 1 ? ` style="grid-column:span ${cell.span}"` : '';
          h += `<i class="${kk}${cell.k ? ' ' + cell.k : ''}"${span}>${cell.t}</i>`;
          if (cell.span > 1) j += cell.span - 1; // the cell covers the next column too
        }
      }
    }
    return `<div class="hsb${cls ? ' ' + cls : ''}" style="grid-template-columns:${tpl}">${h}</div>`;
  },
  // one step: the board, a caption (head in bold), the spoken text and the computation record
  step(board, head, text, c, say) {
    const cap = `<p class="hsc">${head ? `<b>${head}</b> ` : ''}${text.replace(/ = \?/g, '&nbsp;=&nbsp;?')}</p>`; // "= ?" never splits over two lines
    return {html: (board || '') + cap, say: say || ST.spk((head ? head + ' ' : '') + text), c};
  },
  // the hint object; w = columns of the widest board (the panel puts a narrow board beside its caption)
  hint: (steps, w) => ({k: 'steps', steps, w}),

  /* Prompt layouts (use them for the question's html so the prompt looks like the hint's board) */
  // stacked numbers, points lined up (hidden zeros keep the columns); op '+', '−' or '×'; slot: the answer box (SLOT by default)
  vert(nums, op, slot) {
    const ns = nums.map(ST.parse), d = Math.max(...ns.map(n => n.f.length));
    const rows = ns.map((n, i) => {
      const miss = d - n.f.length;
      const ghost = miss ? `<span class="gh">${n.f.length ? '' : '.'}${'0'.repeat(miss)}</span>` : '';
      const txt = n.i + (n.f.length ? '.' + n.f : '') + ghost;
      // the middle rows carry a hidden sign too, shown when an open step hint folds the prompt onto one line (39-steps.css)
      const sign = i == ns.length - 1 ? `<span class="op">${op}</span>` : i ? `<span class="op oh">${op}</span>` : '';
      return `<div>${sign}${txt}</div>`;
    });
    return `<div class="veq">${rows.join('')}<div class="bar"></div><div>${slot || SLOT}</div></div>`;
  },
  // long division: the answer box sits on the bracket, over the dividend
  ldiv(a, b, slot) {
    return `<div class="ldq"><span class="ldq-q">${slot || SLOT}</span><span class="ldq-b">${b}</span><span class="ldq-a">${a}</span></div>`;
  },
};

/* ---- column addition ---- */
function stepsAdd(...xs) {
  if (Array.isArray(xs[0])) xs = xs[0];
  if (xs.length < 2) throw new Error('stepsAdd: two or more numbers');
  const ns = xs.map(ST.parse), d = Math.max(...ns.map(n => n.f.length));
  const sum = ns.reduce((s, n) => s + ST.scaled(n, d), 0);
  const maxE = Math.max(...ns.map(n => n.i.length - 1));
  const top = Math.max(maxE, String(sum).length - 1 - d);
  // the columns, the smallest place first
  const cols = [];
  let carry = 0;
  for (let e = -d; e <= maxE; e++) {
    const terms = ns.map(n => ST.dig(n, e, d)).filter(x => x != null);
    const s = terms.reduce((a, b) => a + b, carry);
    cols.push({e, terms, cin: carry, s});
    carry = Math.floor(s / 10);
  }
  // the last column with something to add; the columns above it are only brought down
  let f = cols.length - 1;
  while (f > 0 && cols[f].terms.length < 2 && !cols[f].cin) f--;
  const above = cols.slice(f + 1);
  const up = above.slice().reverse().map(c => c.terms[0]);
  const upVal = above.reduce((s, c) => s + c.terms[0] * 10 ** (c.e + d), 0);
  const steps = [];
  for (let k = 0; k <= f; k++) {
    const col = cols[k], last = k == f, e = col.e;
    // carries: those written before this step, and this column's own (new) unless it is the last step
    const cy = {k: 'cy', c: {}};
    for (let j = 0; j < k; j++) {
      const co = Math.floor(cols[j].s / 10);
      if (co) cy.c[cols[j].e + 1] = {t: co, k: cols[j].e + 1 == e ? 'on' : ''};
    }
    if (!last && col.s >= 10) cy.c[e + 1] = {t: Math.floor(col.s / 10), k: 'nw'};
    const rows = [cy];
    ns.forEach((n, i) => {
      const r = {k: 'n', c: {}, pt: d > 0, op: i == ns.length - 1 ? '+' : ''};
      for (let x = -d; x <= maxE; x++) {
        const v = ST.dig(n, x, d);
        if (v != null) r.c[x] = {t: v, k: (ST.pad(n, x) ? 'pz' : '') + (x == e ? ' on' : '')};
      }
      rows.push(r);
    });
    rows.push(ST.line(top, -d, true));
    const res = {k: 'n', c: {}, pt: d > 0};
    for (let j = 0; j < k; j++) res.c[cols[j].e] = cols[j].s % 10;
    const terms = (col.cin ? [col.cin] : []).concat(col.terms);
    let text;
    if (last) {
      // a two-digit sum in the top column fills two places
      res.c[col.s >= 10 ? e + 1 : e] = {t: '?', k: 'ask', span: col.s >= 10 ? 2 : 1};
      text = `${terms.join(' + ')} = ?`;
      if (up.length) text += ` Then bring down ${ST.list(up)}.`;
    } else {
      res.c[e] = {t: col.s % 10, k: 'nw'};
      if (terms.length < 2) text = `Write the ${terms[0]}.`;
      else if (col.s >= 10) text = `${terms.join(' + ')} = ${col.s}. Write ${col.s % 10}, carry ${Math.floor(col.s / 10)}.`;
      else text = `${terms.join(' + ')} = ${col.s}. Write ${col.s}.`;
    }
    rows.push(res);
    const c = {op: '+', x: terms, r: last ? null : col.s, e, cin: col.cin};
    if (last) Object.assign(c, {up: upVal, d});
    steps.push(ST.step(ST.board(top, d, rows), ST.cap(ST.NAME[e]) + ':', text, c));
  }
  return ST.hint(steps, top + d + 2);
}

/* ---- column subtraction with regrouping ---- */
function stepsSub(a, b) {
  const A = ST.parse(a), B = ST.parse(b), d = Math.max(A.f.length, B.f.length);
  if (ST.scaled(A, d) < ST.scaled(B, d)) throw new Error('stepsSub: a must be at least b');
  const top = A.i.length - 1;
  const cur = {}, orig = {}, mark = {}, crossed = {};
  for (let e = -d; e <= top; e++) cur[e] = orig[e] = ST.dig(A, e, d);
  let f = -d; // the highest place where b has a digit: the last subtraction
  for (let e = -d; e <= top; e++) if (ST.dig(B, e, d) != null) f = e;
  const steps = [], res = {}, fresh = new Set();
  // the board as it stands; focus: the place of this step; ask: the place of the last step's "?"
  const draw = (focus, ask) => {
    const cy = {k: 'cy', c: {}}, ra = {k: 'n', c: {}, pt: d > 0}, rb = {k: 'n', c: {}, pt: d > 0, op: '−'}, rr = {k: 'n', c: {}, pt: d > 0};
    for (let e = -d; e <= top; e++) {
      const nw = fresh.has(e) ? ' nw' : '';
      if (mark[e] != null && !(e == top && mark[e] === 0)) cy.c[e] = {t: mark[e], k: nw + (focus == e ? ' on' : '')};
      ra.c[e] = {t: orig[e], k: (crossed[e] ? 'x' + nw : '') + (ST.pad(A, e) ? ' pz' : '') + (focus == e && !crossed[e] ? ' on' : '')};
      const bd = ST.dig(B, e, d);
      if (bd != null) rb.c[e] = {t: bd, k: (ST.pad(B, e) ? 'pz' : '') + (focus == e ? ' on' : '')};
      if (res[e] != null) rr.c[e] = {t: res[e].t, k: res[e].nw ? 'nw' : ''};
    }
    if (ask != null) rr.c[ask] = {t: '?', k: 'ask'};
    return ST.board(top, d, [cy, ra, rb, ST.line(top, -d, true), rr]);
  };
  for (let e = -d; e <= f; e++) {
    const bv = ST.dig(B, e, d) || 0, head = ST.cap(ST.NAME[e]) + ':';
    for (const k in res) res[k].nw = false;
    if (cur[e] < bv) {
      // regroup from the nearest place on the left that is not 0; the zeros on the way become 9s
      let j = e + 1;
      while (cur[j] === 0) j++;
      const from = cur[e], jFrom = cur[j], zeros = j - e - 1;
      fresh.clear();
      cur[j]--;
      for (let z = e + 1; z < j; z++) cur[z] = 9;
      cur[e] += 10;
      for (let z = e; z <= j; z++) {
        mark[z] = cur[z];
        crossed[z] = true;
        fresh.add(z);
      }
      // the caption stays short (the marks show the rest); the spoken text tells the whole move
      const nines = zeros > 1 ? 'the zeros become 9s' : 'the zero becomes 9';
      const text = zeros ? `${from} is less than ${bv}. Regroup from the ${ST.NAME[j]}. Now ${cur[e]} ${ST.NAME[e]}.`
        : `${from} is less than ${bv}. Regroup 1 ${ST.ONE[j]}. Now ${cur[e]} ${ST.NAME[e]}.`;
      const said = zeros ? `${head} ${from} is less than ${bv}, so we regroup from the ${ST.NAME[j]}. ${jFrom} becomes ${cur[j]}, ${nines},`
        + ` and ${from} becomes ${cur[e]}.` : `${head} ${from} is less than ${bv}, so we regroup 1 ${ST.ONE[j]}. ${jFrom} becomes ${cur[j]},`
        + ` and ${from} becomes ${cur[e]}.`;
      steps.push(ST.step(draw(e), head, text, {op: 'rg', x: [from, bv], r: cur[e], e, j, from, to: cur[e], jFrom, jTo: cur[j], b: bv}, said));
    }
    fresh.clear();
    const r = cur[e] - bv;
    if (e == f) {
      // the places above are only brought down (no leading zeros)
      const up = [];
      let upVal = 0;
      for (let u = top; u > f; u--) {
        if (!up.length && cur[u] === 0) continue;
        up.push(cur[u]);
        upVal += cur[u] * 10 ** (u + d);
      }
      let text = `${cur[e]} − ${bv} = ?`;
      if (up.length) text += ` Then bring down ${ST.list(up)}.`;
      steps.push(ST.step(draw(e, e), head, text, {op: '−', x: [cur[e], bv], r: null, e, up: upVal, d}));
    } else {
      res[e] = {t: r, nw: true};
      steps.push(ST.step(draw(e), head, `${cur[e]} − ${bv} = ${r}.`, {op: '−', x: [cur[e], bv], r, e}));
    }
  }
  return ST.hint(steps, top + d + 2);
}

/* ---- multiplication: partial products ('pp') or the standard algorithm ('std') ---- */
function stepsMul(a, b, how) {
  a = +a;
  b = +b;
  if (!(Number.isInteger(a) && Number.isInteger(b) && a >= 1 && b >= 1)) throw new Error('stepsMul: whole numbers from 1');
  const da = ST.digits(a).reverse(), db = ST.digits(b).reverse(); // ones first
  how = how || (da.length <= 3 && db.length <= 2 ? 'pp' : 'std');
  const top = String(a * b).length - 1;
  // a and b with the digits at places onA, onB marked as used in this step
  const ab = (onA = [], onB = []) => {
    const ra = {k: 'n', c: ST.cells(a)}, rb = {k: 'n', c: ST.cells(b), op: '×'};
    onA.forEach(e => { ra.c[e].k = 'on'; });
    onB.forEach(e => { rb.c[e].k = 'on'; });
    return [ra, rb, ST.line(top, 0, true)];
  };
  const fold = (rows, on) => rows.map(r => Object.assign(r, {od: on}));
  const steps = [];
  if (how == 'pp') {
    // every non-zero digit of b times every non-zero digit of a, each as its place value
    const parts = [];
    db.forEach((y, j) => {
      if (y) da.forEach((x, i) => { if (x) parts.push({i, j, x, y, ap: x * 10 ** i, bp: y * 10 ** j, p: x * 10 ** i * y * 10 ** j}); });
    });
    parts.forEach((p, k) => {
      const only = parts.length == 1;
      // from the fifth part on, small screens fold a and b away (the caption names the numbers)
      const rows = fold(ab([p.i], [p.j]), k >= 4);
      parts.slice(0, k).forEach((q, x) => rows.push({k: 'n', c: ST.cells(q.p), ct: k >= 4 && !x}));
      const lead = p.i + p.j > 0 ? `${p.y} × ${p.x} = ${p.x * p.y}, so ` : '';
      let text;
      if (only) {
        rows.push({k: 'n', c: {[String(p.p).length - 1]: {t: '?', k: 'ask'}}});
        text = `${lead}${p.bp} × ${p.ap} = ?`;
      } else {
        rows.push({k: 'n', c: ST.cells(p.p, 0, 'nw')});
        text = `${lead}${p.bp} × ${p.ap} = ${p.p}.`;
      }
      steps.push(ST.step(ST.board(top, 0, rows), 'Multiply:', text, {op: '×', x: [p.bp, p.ap], r: only ? null : p.p}));
    });
    if (parts.length > 1) {
      const rows = fold(ab(), parts.length >= 4);
      parts.forEach((q, x) => rows.push({k: 'n', c: ST.cells(q.p), ct: parts.length >= 4 && !x}));
      rows.push(ST.line(top, 0, true), {k: 'n', c: {[top]: {t: '?', k: 'ask'}}});
      const ps = parts.map(q => q.p);
      steps.push(ST.step(ST.board(top, 0, rows), 'Add the parts:', `${ps.join(' + ')} = ?`, {op: '+', x: ps, r: null}));
    }
    return ST.hint(steps, top + 2);
  }
  // standard: one row per digit of b (ones first): each digit of a times it, with carries; then add the rows
  const single = db.length == 1, done = [];
  const frame = (cy, onA, j, row) => [cy, ...ab(onA, [j]), ...done.map(c => ({k: 'n', c})), {k: 'n', c: row}];
  const plain = c => {
    const o = {};
    for (const e in c) o[e] = {t: c[e].t, k: ''};
    return o;
  };
  db.forEach((y, j) => {
    let row = {};
    const head = ST.cap(ST.NAME[j]) + ':';
    if (y == 0) {
      // a 0 in b: a row of zeros
      for (let e = 0; e < da.length + j; e++) row[e] = {t: 0, k: 'nw'};
      steps.push(ST.step(ST.board(top, 0, frame({k: 'cy', c: {}}, [], j, row)), head,
        `The ${ST.NAME[j]} digit is 0, so this row is all 0s.`, {op: '×', x: [0], r: 0, j}));
      done.push(plain(row));
      return;
    }
    if (j > 0) {
      // one placeholder 0 for each place already done
      for (let e = 0; e < j; e++) row[e] = {t: 0, k: 'nw'};
      const text = j == 1 ? `Now multiply by the ${y} in the tens. Write a 0 in the ones first.`
        : `Now multiply by the ${y} in the ${ST.NAME[j]}. Write ${j} zeros first.`;
      steps.push(ST.step(ST.board(top, 0, frame({k: 'cy', c: {}}, [], j, row)), head, text, {op: 'z', x: [y], r: 0, j}));
      row = plain(row);
    }
    let carry = 0;
    const cy = {k: 'cy', c: {}};
    da.forEach((x, i) => {
      for (const e in cy.c) cy.c[e].k = '';
      row = plain(row);
      if (carry) cy.c[i].k = 'on'; // carries sit above the digits of a
      const p = x * y, s = p + carry, e = i + j, lastDigit = i == da.length - 1;
      if (single && lastDigit) {
        // the last step: the last product (and its carry) with a "?"
        const ask = Object.assign({}, row, {[s >= 10 ? e + 1 : e]: {t: '?', k: 'ask', span: s >= 10 ? 2 : 1}});
        const text = carry ? `${y} × ${x} = ${p}. ${p} + ${carry} = ?` : `${y} × ${x} = ?`;
        steps.push(ST.step(ST.board(top, 0, frame(cy, [i], j, ask)), '', text, {op: '×', x: [y, x], p, cin: carry, r: null, e, i, j}));
        return;
      }
      let text = carry ? `${y} × ${x} = ${p}. ${p} + ${carry} = ${s}.` : `${y} × ${x} = ${p}.`;
      row[e] = {t: s % 10, k: 'nw'};
      if (lastDigit) {
        if (s >= 10) row[e + 1] = {t: Math.floor(s / 10), k: 'nw'};
        text += ` Write ${s}.`;
      } else if (s >= 10) {
        cy.c[i + 1] = {t: Math.floor(s / 10), k: 'nw'};
        text += ` Write ${s % 10}, carry ${Math.floor(s / 10)}.`;
      } else text += ` Write ${s}.`;
      steps.push(ST.step(ST.board(top, 0, frame(cy, [i], j, row)), '', text, {op: '×', x: [y, x], p, cin: carry, r: s, e, i, j}));
      carry = Math.floor(s / 10);
    });
    if (!single) done.push(plain(row));
  });
  if (!single) {
    const rows = [{k: 'cy', c: {}}, ...ab(), ...done.map(c => ({k: 'n', c})), ST.line(top, 0, true), {k: 'n', c: {[top]: {t: '?', k: 'ask'}}}];
    const rv = db.map((y, j) => a * y * 10 ** j);
    steps.push(ST.step(ST.board(top, 0, rows), 'Add the rows:', `${rv.join(' + ')} = ?`, {op: '+', x: rv, r: null}));
  }
  return ST.hint(steps, top + 2);
}

/* ---- long division: divide, multiply and subtract, bring down ---- */
function stepsDiv(a, b) {
  a = +a;
  b = +b;
  if (!(Number.isInteger(a) && Number.isInteger(b) && b >= 1 && a >= b)) throw new Error('stepsDiv: whole numbers, a >= b >= 1');
  const D = ST.digits(a), n = D.length, top = n - 1, eOf = k => n - 1 - k; // dividend digit k (from the left) sits at place eOf(k)
  // the rounds, worked out first; the first one takes digits until the number is at least b
  const rounds = [];
  let pos = 0, cur = D[pos++];
  while (cur < b) cur = cur * 10 + D[pos++];
  let bring = null;
  for (;;) {
    const qd = Math.floor(cur / b), prod = qd * b;
    rounds.push({end: pos - 1, cur, qd, prod, rem: cur - prod, bring});
    if (pos >= n) break;
    bring = D[pos];
    cur = (cur - prod) * 10 + D[pos++];
  }
  const last = rounds.length - 1, rem = rounds[last].rem;
  const say = s => ST.spk(s.replace(/How many (\d+)s fit/g, 'How many groups of $1 fit'));
  // the board: the quotient row, the bracket line, the dividend row, then per round the product, a line, and what is left
  const qRow = {k: 'n', c: {}, ok: 'qr'}, dRow = {k: 'n', c: ST.cells(a), op: b, ok: 'dd'};
  const below = [];
  let curRow = dRow; // the row holding the number being divided
  const clean = () => {
    for (const r of [qRow, dRow, ...below]) for (const e in r.c) if (r.c[e].k) r.c[e].k = r.c[e].k.replace(/\b(on|nw|src)\b/g, '').trim();
  };
  // small screens show only this round's rows and the row being divided; the older ones get od, the first row after them ct
  let now = 0;
  const snap = () => {
    let hid = false;
    for (const r of below) {
      r.od = r.ri !== now && r !== curRow;
      r.ct = hid && !r.od;
      hid = r.od;
    }
    return ST.board(top, 0, [qRow, Object.assign(ST.line(top, 0), {ok: 'vn'}), dRow, ...below], 'hsdiv');
  };
  const steps = [];
  rounds.forEach((r, ri) => {
    now = ri;
    clean();
    const at = eOf(r.end), isLast = ri == last;
    let head = '';
    if (r.bring != null) {
      head = `Bring down the ${r.bring}.`;
      curRow.c[at] = {t: r.bring, k: 'nw'};
      dRow.c[at].k = 'src';
    } else if (r.end > 0) head = `${D[0]} is less than ${b}, so use ${r.cur}.`;
    for (let i = 0; i < String(r.cur).length; i++) if (curRow.c[at + i]) curRow.c[at + i].k = (curRow.c[at + i].k + ' on').trim();
    if (isLast && rem == 0) {
      // the last step: the last quotient digit is the "?"
      qRow.c[at] = {t: '?', k: 'ask'};
      const text = `How many ${b}s fit in ${r.cur}?`;
      steps.push(ST.step(snap(), head, text, {op: '÷', x: [r.cur, b], r: null, e: at}, say(head + ' ' + text)));
      return;
    }
    qRow.c[at] = {t: r.qd, k: 'nw'};
    if (r.qd == 0) {
      // nothing to take away: the next digit comes down beside this one (or, at the end, the number left is the remainder)
      let text = `How many ${b}s fit in ${r.cur}? 0.`;
      if (isLast) {
        below.push({k: 'n', c: {[at]: {t: '?', k: 'ask'}}, ri});
        text += ` ${r.cur} − 0 = ? That is the remainder.`;
      } else text += ' Write 0.';
      const c = isLast ? {op: '−', x: [r.cur, 0], r: null, e: at, qd: 0} : {op: '÷', x: [r.cur, b], r: 0, e: at};
      steps.push(ST.step(snap(), head, text, c, say(head + ' ' + text)));
      return;
    }
    const t1 = `How many ${b}s fit in ${r.cur}? ${r.qd}.`;
    steps.push(ST.step(snap(), head, t1, {op: '÷', x: [r.cur, b], r: r.qd, e: at}, say(head + ' ' + t1)));
    // multiply and subtract
    clean();
    qRow.c[at].k = 'on';
    const pRow = {k: 'n', c: ST.cells(r.prod, at, 'nw')};
    const sign = at + String(r.prod).length;
    if (sign <= top) pRow.c[sign] = {t: '−', k: 'sg nw'};
    else pRow.op = '−';
    const width = Math.max(String(r.cur).length, String(r.prod).length);
    const ln = ST.line(at + width - 1, at);
    for (const e in ln.c) ln.c[e] = {k: 'nw'};
    const remRow = {k: 'n', c: isLast ? {[at]: {t: '?', k: 'ask'}} : ST.cells(r.rem, at, 'nw')};
    for (const x of [pRow, ln, remRow]) x.ri = ri;
    below.push(pRow, ln, remRow);
    const t2 = `${r.qd} × ${b} = ${r.prod}. ${r.cur} − ${r.prod} = ${isLast ? '? That is the remainder.' : r.rem + '.'}`;
    steps.push(ST.step(snap(), '', t2, {op: '−', x: [r.cur, r.prod], r: isLast ? null : r.rem, e: at, mul: [r.qd, b, r.prod]}));
    curRow = remRow;
  });
  return ST.hint(steps, top + 2);
}

/* ---- fractions ---- */
ST.gcd = (x, y) => (y ? ST.gcd(y, x % y) : x);
ST.lcm = (x, y) => (x / ST.gcd(x, y)) * y;
// a stacked fraction for the boards; kt, kb: classes of the top and bottom
ST.fr = (t, b, kt = '', kb = '') => `<span class="hfr"><i class="${kt}">${t}</i><i class="${kb}">${b}</i></span>`;

// n/d = n2/d2, one of n2, d2 null (the unknown): what the known bottom (or top) was multiplied or divided by, then the same to the other
function stepsEquivFrac(n, d, n2, d2) {
  const topKnown = n2 != null;
  if (topKnown == (d2 != null)) throw new Error('stepsEquivFrac: give exactly one of n2, d2');
  const x = topKnown ? n : d, y = topKnown ? n2 : d2, u = topKnown ? d : n; // known pair x -> y; u is changed the same way
  let op, k;
  if (y % x == 0) {
    op = '×';
    k = y / x;
  } else if (x % y == 0 && u % (x / y) == 0) {
    op = '÷';
    k = x / y;
  } else throw new Error('stepsEquivFrac: not a whole-number step');
  const lab = (show, nw) => `<span class="hk${show ? '' : ' l0'}${nw ? ' nw' : ''}">${show ? op + k + ico('go', 16) : ''}</span>`;
  // step 1: the known pair with its arrow; step 2: the other pair, "?" where the answer goes
  const board = two => {
    const f1 = topKnown ? ST.fr(n, d, two ? '' : 'on', two ? 'on' : '') : ST.fr(n, d, two ? 'on' : '', two ? '' : 'on');
    const f2 = topKnown ? ST.fr(n2, two ? '?' : '&nbsp;', two ? '' : 'on', two ? 'ask' : 'dm')
      : ST.fr(two ? '?' : '&nbsp;', d2, two ? 'ask' : 'dm', two ? '' : 'on');
    const arrows = topKnown ? lab(true, !two) + lab(two, two) : lab(two, two) + lab(true, !two);
    return `<div class="hsb hsf">${f1}<span class="har">${arrows}</span>${f2}</div>`;
  };
  const kn = topKnown ? 'Top' : 'Bottom', ot = topKnown ? 'Bottom' : 'Top';
  return ST.hint([
    ST.step(board(false), kn + ':', `${x} ${op} ${k} = ${y}.`, {op, x: [x, k], r: y}),
    ST.step(board(true), ot + ':', `Do the same. ${u} ${op} ${k} = ?`, {op, x: [u, k], r: null}),
  ], 4);
}

// a/b op c/d: the least common bottom, both fractions renamed, then the tops added, subtracted or compared
function stepsCommonDen(a, b, c, d, op) {
  op = op == '-' ? '−' : op || '+';
  const L = ST.lcm(b, d), big = Math.max(b, d), small = Math.min(b, d);
  const ka = L / b, kc = L / d, A = a * ka, C = c * kc, sym = op == 'cmp' ? '?' : op;
  // stage 0: the common bottom; 1: a/b renamed; 2: c/d renamed; 3: the last step
  const board = stage => {
    const s1 = stage == 1 ? 'on' : '', s2 = stage == 2 ? 'on' : '';
    const top = `<span class="hfl">${ST.fr(a, b, s1, s1)}<span class="hop">${sym}</span>${ST.fr(c, d, s2, s2)}</span>`;
    const one = stage >= 1 ? ST.fr(A, L, stage == 1 ? 'nw' : stage == 3 ? 'on' : '', stage == 1 ? 'nw' : '')
      : ST.fr('&nbsp;', L, 'dm', 'nw');
    const two = stage >= 2 ? ST.fr(C, L, stage == 2 ? 'nw' : stage == 3 ? 'on' : '', stage == 2 ? 'nw' : '')
      : ST.fr('&nbsp;', L, 'dm', stage == 0 ? 'nw' : '');
    const end = stage == 3 && op != 'cmp' ? `<span class="hop">=</span>${ST.fr('?', L, 'ask', '')}` : '';
    return `<div class="hsb hsf hsfs">${top}<span class="hfl"><span class="hop">=</span>${one}<span class="hop">${sym}</span>${two}${end}</span></div>`;
  };
  const mult = Array.from({length: L / big}, (_, i) => big * (i + 1));
  const steps = [ST.step(board(0), 'Same bottom:', b == d ? `Both bottoms are ${b} already.`
    : `Count by ${big}s: ${mult.join(', ')}. ${small} goes into ${L} too, so use ${L}.`, {op: 'lcm', x: [b, d], r: L})];
  if (ka > 1) steps.push(ST.step(board(1), `${a}/${b}:`, `${b} × ${ka} = ${L}, so ${a} × ${ka} = ${A}.`, {op: '×', x: [a, ka], r: A}));
  if (kc > 1) steps.push(ST.step(board(2), `${c}/${d}:`, `${d} × ${kc} = ${L}, so ${c} × ${kc} = ${C}.`, {op: '×', x: [c, kc], r: C}));
  const text = op == 'cmp' ? `Now compare the tops: ${A} and ${C}. Which is more?`
    : `Now ${op == '+' ? 'add' : 'subtract'} the tops: ${A} ${op} ${C} = ? Keep ${L} on the bottom.`;
  steps.push(ST.step(board(3), '', text, {op, x: [A, C], r: null, L}));
  return ST.hint(steps, 9);
}

/* ---- text-only steps ---- */
function stepsStory(list) {
  return ST.hint(list.map(s => {
    const t = typeof s == 'string' ? s : s.s;
    return {html: `<p class="hsc">${esc(t)}</p>`, say: (typeof s == 'object' && s.say) || t};
  }), 0);
}

// ---- P2-11 decimal multiply and divide (CURRICULUM M-5a) ----
/* stepsDecMul(a, b): a x b with decimal strings ('0.6', '12.5', '7'). Step 1 counts the decimal places the answer will have;
   then the whole-number steps of stepsMul on the digits without the points; the last of them is the "?" step and also
   reminds the child where the point goes. The answer is never shown.
   stepsDecDiv(a, b): a / b with decimal strings, b a whole number or tenths, and a quotient that ends within 3 places.
   A divisor in tenths is made whole first (both numbers x 10); zeros are added to the end of the dividend until it divides evenly;
   then the long-division steps of stepsDiv on whole numbers, with the point placed from the right at the end.
   Each new step carries c like the other builders: dp {op 'dp', x [placesA, placesB], r places}; ten {op 'ten', x [10], r divisor};
   dd {op 'dd', x [N, B], r N, p places, z zeros added}. The whole-number steps keep their own c. */
const stDecS = (n, p) => { // whole number n with p places after the point, as written (zeros kept): (720, 2) -> '7.20'
  const s = String(n).padStart(p + 1, '0');
  return p ? s.slice(0, s.length - p) + '.' + s.slice(s.length - p) : s;
};
const stPlaces = n => n + (n == 1 ? ' place' : ' places');
function stepsDecMul(a, b) {
  const pa = ST.parse(a), pb = ST.parse(b), fa = pa.f.length, fb = pb.f.length, A = ST.scaled(pa, fa), B = ST.scaled(pb, fb), p = fa + fb;
  if (!(A >= 1 && B >= 1)) throw new Error('stepsDecMul: numbers above 0');
  const rule = ST.step('', 'Places:', `${a} has ${stPlaces(fa)} after the point and ${b} has ${stPlaces(fb)}. The answer will have ${fa} + ${fb} = ${stPlaces(p)} after the point.`,
    {op: 'dp', x: [fa, fb], r: p});
  const h = stepsMul(A, B), last = h.steps[h.steps.length - 1];
  const tail = p ? ` Then write the point ${stPlaces(p)} in from the right. Use 0s in front if you need them.` : '';
  last.html = last.html.replace(/<\/p>$/, `${tail}</p>`);
  last.say += tail;
  return ST.hint([rule, ...h.steps], h.w);
}
// how a / b is made whole: {s: tenths shift, N0: dividend after the shift (whole number), f: its places, z: zeros added, N, B, p} or null
function stDecDivPlan(a, b) {
  const pa = ST.parse(a), pb = ST.parse(b), fa = pa.f.length, fb = pb.f.length;
  const A = ST.scaled(pa, fa), B = ST.scaled(pb, fb);
  if (!(A >= 1 && B >= 1)) return null;
  const N0 = A * 10 ** Math.max(fb - fa, 0), f = Math.max(fa - fb, 0);
  for (let z = 0; z <= 3; z++) {
    const N = N0 * 10 ** z;
    if (N % B == 0) return {s: fb, N0, f, z, N, B, p: f + z};
  }
  return null;
}
function stepsDecDiv(a, b) {
  const pl = stDecDivPlan(a, b);
  if (!pl || pl.N < pl.B) throw new Error('stepsDecDiv: no short exact quotient for ' + a + ' / ' + b);
  const steps = [], at = stDecS(pl.N0, pl.f);
  if (pl.s) {
    steps.push(ST.step('', 'Whole divisor:', `Multiply both numbers by ${10 ** pl.s} so the divisor is whole. ${a} ÷ ${b} becomes ${at} ÷ ${pl.B}.`,
      {op: 'ten', x: [10 ** pl.s], r: pl.B}));
  }
  const zs = pl.z ? ` Add ${pl.z == 1 ? 'a zero' : pl.z + ' zeros'} to the end of ${at}: ${stDecS(pl.N, pl.p)}.` : '';
  steps.push(ST.step('', 'Ignore the point:', `${pl.N} ÷ ${pl.B}.${zs}`, {op: 'dd', x: [pl.N, pl.B], r: pl.N, p: pl.p, z: pl.z}));
  const h = stepsDiv(pl.N, pl.B), last = h.steps[h.steps.length - 1];
  const tail = pl.p ? ` Then write the point ${stPlaces(pl.p)} in from the right. Use 0s in front if you need them.` : '';
  last.html = last.html.replace(/<\/p>$/, `${tail}</p>`);
  last.say += tail;
  return ST.hint([...steps, ...h.steps], h.w);
}

var GEN2_VER='v133'; // last line: the whole file ran (checked by dataReady() before the app starts)
