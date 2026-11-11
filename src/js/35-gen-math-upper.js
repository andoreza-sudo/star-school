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
