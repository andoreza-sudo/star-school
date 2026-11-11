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
