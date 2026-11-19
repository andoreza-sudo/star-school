/* Star School hints v182. BUILT by tools/build.py from 39m-mist.js, 39n-hintw.js: never edit by hand.
   index.html v182 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v182.js. */
/* ---------- HINT-01: a hint for each common mistake, in every Practice question (part hints since v182: loaded when a Practice round starts) ----------
   docs/ROADMAP.md 10d (owner decisions 2026-11-18). For a Practice question the app works out what each known mistake would answer
   (forgot to carry, wrote 15 in the ones place, added instead of took away, read "cat" as "cap", la for el ...). When the child's
   wrong answer is one of those, the round shows that mistake's hint, with the question's own numbers filled in, where it shows its
   generic hint today (50-round.js, check(): the first miss). Nothing else about the round changes: scoring, stars, the second try,
   the one try of a two-choice question (no mistake hint there: a random tap on the only other choice would always "match") and the
   reveal stay as they were.

   The words. Every hint line is drafted at authoring time (node tools/author.js --hints-draft) into docs/drafts/hints/<code>.md and
   is live only once the owner has approved it ("status: reviewed ..."): tools/build.py copies reviewed lines only into
   src/js/39n-hintw.js (HINTW). A code with no reviewed line shows the generic hint, as before. Numbers and words of the question are
   never written into a line: a line has {slots} that this file fills (HM_SLOTS), so a hint cannot state a wrong fact.

   How a question is read. hmProb(q) turns the question's label (the generators' fact id: "38 + 47 = ?", "clock 4:30", "read “bag”")
   and its answer and choices into a small problem object P with a type t. HM[code] lists, for one or more types, what a child holding
   that mistake answers (f(P) -> [[value, slots], ...]). hmPredict(q) gathers them, drops any that would be right, and hmMatch(q, v)
   gives the first code (in HM order: the more particular mistakes first) whose answer is v. The same code names as the lessons'
   misconception codes (BUGS in 52b-know.js, 52i-bench35.js, 52l-bench4.js) where the idea is the same; the new ones are listed in
   docs/drafts/HINTS-READ.md. tools/test.js "hints ... HINT-01" plays simulated children on every Practice skill. */

// ---- small number helpers ----
const hmF = x => String(+(+x).toFixed(9)); // a number as text, without float noise (0.1 + 0.2 -> "0.3")
const hmInt = s => +String(s).replace(/,/g, '');
const hmDig = n => String(n).split('').reverse().map(Number); // ones first
const hmPlaceName = i => ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands'][i] || 'next';
const hmGcd = (a, b) => (b ? hmGcd(b, a % b) : Math.abs(a));
// column by column: fn(top digit, bottom digit, place) for each place, ones first
function hmCols(a, b, fn) {
  const x = hmDig(a), y = hmDig(b), o = [];
  for (let i = 0; i < Math.max(x.length, y.length); i++) o.push(fn(x[i] || 0, y[i] || 0, i));
  return o;
}
const hmJoin = o => +o.slice().reverse().join('');
// a fraction "n/d" as [n, d] (null when it is not one)
const hmFr = s => { const m = /^(-?\d+)\/(\d+)$/.exec(String(s).trim()); return m ? [+m[1], +m[2]] : null; };
const hmPad2 = n => String(n).padStart(2, '0');
const hmClk = (h, m) => `${(h + 11) % 12 + 1}:${hmPad2(m)}`;
const hmDecs = s => (String(s).split('.')[1] || '').length;
// the decimal value of x with the point moved k places to the right (k < 0: to the left), as text
const hmShift = (x, k) => hmF(+x * Math.pow(10, k));

/* ---- the question, read as a problem: hmProb(q) -> P {t, ...} or null. Labels are the generators' fact ids (38-skills.js and the
   gen*.js files); a label this does not know gives null, and that question keeps its generic hint. ---- */
const HM_UNITS = {hr: {min: 60}, min: {sec: 60}, gal: {qt: 4}, qt: {pt: 2}, ft: {in: 12}, yd: {ft: 3, in: 36}, lb: {oz: 16},
  L: {mL: 1000}, kg: {g: 1000}, km: {m: 1000}, m: {cm: 100}, cm: {mm: 10}, day: {hr: 24}, wk: {day: 7}};
const HM_LOOK = ['bdpq', 'mw', 'nu', 'MW', 'EF', 'OQ', 'CG', 'PR', 'NZ', 'ij', 'IJL', '69', '17'];
// sets of words that sound the same (or almost) and are spelt differently: the homophone mistakes the word banks allow
const HM_HOMO = ['its|it\'s', 'their|there|they\'re', 'your|you\'re', 'whose|who\'s', 'to|too|two', 'bear|bare', 'cell|sell', 'plain|plane',
  'blew|blue', 'pair|pear', 'hour|our', 'ate|eight', 'wood|would', 'bored|board', 'stare|stair', 'flour|flower', 'steel|steal',
  'weather|whether', 'four|for|fore', 'heel|heal', 'meat|meet', 'break|brake', 'road|rode', 'beat|beet', 'son|sun', 'weight|wait',
  'sail|sale', 'hole|whole', 'won|one', 'dear|deer', 'week|weak', 'main|mane', 'knew|new', 'right|write', 'fair|fare', 'see|sea',
  'seen|scene', 'piece|peace', 'night|knight', 'hear|here', 'buy|by|bye', 'tale|tail', 'mail|male', 'aloud|allowed', 'threw|through',
  'no|know', 'tide|tied', 'hi|high', 'flew|flu', 'made|maid', 'rain|reign', 'red|read', 'sent|cent', 'wear|where', 'ant|aunt'].map(s => s.split('|'));
const hmHomo = (a, b) => HM_HOMO.some(s => s.includes(String(a).toLowerCase()) && s.includes(String(b).toLowerCase()));
// Spanish verb forms and who they go with (the person a form is for), for "the form of another person" (esper)
const HM_ESP = {soy: 'yo', eres: 'tú', es: 'él o ella', somos: 'nosotros', son: 'ellos', estoy: 'yo', estás: 'tú', está: 'él o ella',
  estamos: 'nosotros', están: 'ellos', tengo: 'yo', tienes: 'tú', tiene: 'él o ella', tenemos: 'nosotros', tienen: 'ellos'};
const hmNoAcc = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '');
const hmTxt = s => String(s == null ? '' : s).trim();
const hmQuoted = l => { const m = /[“"]([^”"]+)[”"]/.exec(l); return m ? m[1] : null; };
const HM_OPS = {'+': '+', '−': '-', '-': '-', '×': '*', 'x': '*', '÷': '/', '/': '/'};

function hmProb(q) {
  const l = hmTxt(q.label), a = q.ans, ch = (q.choices || []).map(c => String(c.v));
  let m;
  const base = {ans: String(a), ch, kind: q.kind, tiles: q.tiles ? q.tiles.slice() : null};
  const P = o => Object.assign({}, base, o);
  // ---- whole-number and decimal sums: "38 + 47 = ?", "story join 6 + 4 = ?", "1,000 − 174 = ?", "28.87 + 54 = ?" ----
  if ((m = /^(?:story \w+ )?([\d,.]+) ([+−-]) ([\d,.]+) = \?$/.exec(l))) {
    const x = m[1].replace(/,/g, ''), y = m[3].replace(/,/g, ''), op = m[2] == '+' ? '+' : '-';
    if (/\./.test(x + y)) return P({t: 'dec', a: x, b: y, op});
    const story = /^story /.test(l); // a story problem shows no sign: its words say what happens
    // two parts that make a number (expanded form, "800 + 7 = ?") are an adding question too
    const ex = op == '+' && /^[1-9]0*$/.test(x) && /^[1-9]0*$/.test(y) && x.length != y.length;
    return P(Object.assign({t: op == '+' ? 'add' : 'sub', a: +x, b: +y, story}, ex ? {also: ['expand'], xs: [x, y], tot: '?'} : {}));
  }
  if ((m = /^change from (\d+) for (\d+)$/.exec(l))) return P({t: 'sub', a: +m[1], b: +m[2], story: true});
  // several parts that make a number (expanded form): "100 + 70 + 4 = ?", "100 + ? + 2 = 162", "800 + 7 = ?"
  if ((m = /^((?:[\d?]+ \+ )+[\d?]+) = ([\d?]+)$/.exec(l)) && (l.match(/\+/g) || []).length >= 1) {
    const xs = m[1].split(' + '), tot = m[2];
    const ex = xs.every(x => x == '?' || /^[1-9]0*$/.test(x)) && new Set(xs.map(x => x.length)).size == xs.length;
    if (ex && xs.length >= 2) return P({t: 'expand', xs, tot});
    if (tot == '?' && xs.every(x => x != '?')) return P({t: 'adds', xs: xs.map(Number)});
  }
  // a missing number: "? + 6 = 8", "8 + ? = 13", "story chgS 6 − ? = 3", "6 and ? make 10", "make 17 from 10"
  if ((m = /^(?:story \w+ )?(\?|\d+) ([+−-]) (\?|\d+) = (\?|\d+)$/.exec(l))) {
    const v = [m[1], m[3], m[4]], at = v.indexOf('?');
    if (at >= 0) return P({t: 'miss', op: m[2] == '+' ? '+' : '-', v: v.map(x => (x == '?' ? null : +x)), at});
  }
  if ((m = /^(\d+) and \? make (\d+)$/.exec(l))) return P({t: 'miss', op: '+', v: [+m[1], null, +m[2]], at: 1});
  if ((m = /^make (\d+) from (\d+)$/.exec(l))) return P({t: 'miss', op: '+', v: [+m[2], null, +m[1]], at: 1});
  if ((m = /^(\d+) and (\d+)$/.exec(l))) return P({t: 'add', a: +m[1], b: +m[2], nosign: true}); // a full frame and some more
  // powers of ten: "5422 ÷ 10 = ?", "5.85 × 100 = ?", "51 × 10^1 = ?", (10^2 = ? is an expression, below)
  if ((m = /^([\d.]+) ([×÷]) (10+|10\^\d) = \?$/.exec(l))) {
    const k = /\^/.test(m[3]) ? +m[3].split('^')[1] : m[3].length - 1;
    return P({t: 'p10', x: m[1], op: m[2], k});
  }
  // times and divide: "7 × 6 = ?", "3 × 2" (equal groups), "array 4 rows of 3", "story 8 × 6", "? × 10 = 20", "57 ÷ 7 = ?"
  if ((m = /^(?:story )?(\d+) × (\d+)(?: = \?)?$/.exec(l)) || (m = /^array (\d+) rows of (\d+)$/.exec(l))) return P({t: 'mul', a: +m[1], b: +m[2]});
  if ((m = /^(\?|\d+) × (\?|\d+) = (\d+)$/.exec(l))) return P({t: 'mmiss', v: [m[1], m[2], m[3]].map(x => (x == '?' ? null : +x))});
  if ((m = /^(?:story )?(\d+) ÷ (\d+)(?: = \?)?$/.exec(l))) return P({t: 'div', a: +m[1], b: +m[2], story: /^story /.test(l)});
  if ((m = /^(\?|\d+) ÷ (\?|\d+) = (\d+)$/.exec(l))) return P({t: 'dmiss', v: [m[1], m[2], m[3]].map(x => (x == '?' ? null : +x))});
  // compare: "66 ? 65", "dec2 0.6 ? 0.43", "frac cmp 1/5 ? 1/8", "frac cmp2 1/2 ? 6/7", "int1 cmp -10 3"
  if ((m = /^(?:dec2 |frac cmp2? )?([\d./]+) \? ([\d./]+)$/.exec(l))) return P({t: 'cmp', x: m[1], y: m[2]});
  if ((m = /^int1 cmp (-?\d+) (-?\d+)$/.exec(l))) return P({t: 'cmp', x: m[1], y: m[2], neg: true});
  // clocks: "clock 4:30", "clock to 5 min 8:35", "clock5 read 1:03", "clock5 pick 9:19"
  if ((m = /^clock(?: to 5 min|5 read|5 pick)? (\d+):(\d\d)$/.exec(l))) return P({t: 'clock', h: +m[1], m: +m[2], one: /^clock5/.test(l), fine: /to 5 min|^clock5/.test(l)});
  if ((m = /^time6 (\d+) (after|before) (\d+):(\d\d)$/.exec(l))) return P({t: 'el', n: +m[1], dir: m[2], h: +m[3], m: +m[4]});
  if ((m = /^time6 (\d+):(\d\d) to (\d+):(\d\d)$/.exec(l))) return P({t: 'span', h1: +m[1], m1: +m[2], h2: +m[3], m2: +m[4]});
  // money: "coins 10+5+1", "money 100+25"
  if ((m = /^coins ([\d+]+)$/.exec(l))) return P({t: 'coins', xs: m[1].split('+').map(Number)});
  if ((m = /^money ([\d+]+)$/.exec(l))) return P({t: 'money', xs: m[1].split('+').map(Number)});
  // rounding: "round 393 to 10", "round 98.29 to tenth"
  if ((m = /^round ([\d.]+) to (\d+|tenth|hundredth|whole number)$/.exec(l))) {
    const to = {tenth: 0.1, hundredth: 0.01, 'whole number': 1}[m[2]] || +m[2];
    return P({t: 'round', n: m[1], to});
  }
  // place value: "value of 6 in 865", "pv picture 6 tens 5 ones", "pv tens in 23"
  if ((m = /^value of (\d) in ([\d.]+)$/.exec(l))) return P({t: 'pvval', d: +m[1], n: m[2]});
  if ((m = /^pv picture (\d+) tens (\d+) ones$/.exec(l))) return P({t: 'pvto', tn: +m[1], on: +m[2]});
  if ((m = /^pv tens in (\d+)$/.exec(l))) return P({t: 'pvtens', n: +m[1]});
  // number patterns: "0,10,20,_,40", "skip 0,4,8,_,16", "grow 26,33,40,47" (the next one)
  if ((m = /^(?:skip )?(-?\d+(?:,(?:-?\d+|_))+|_(?:,-?\d+)+)$/.exec(l)) && /_/.test(l)) {
    const xs = m[1].split(','), at = xs.indexOf('_');
    return P({t: 'seq', xs: xs.map(x => (x == '_' ? null : +x)), at});
  }
  if ((m = /^grow ([\d,]+)$/.exec(l))) { const xs = m[1].split(',').map(Number); return P({t: 'seq', xs: xs.concat([null]), at: xs.length}); }
  // fractions
  if ((m = /^frac (?:pic )?(\d+)\/(\d+)(?: (?:bar|circle))?$/.exec(l))) return P({t: 'fname', n: +m[1], d: +m[2]});
  if ((m = /^frac read (\d+)\/(\d+)(?: to \d+)?$/.exec(l))) return P({t: 'fline', n: +m[1], d: +m[2]});
  if ((m = /^frac eq (\d+)\/(\d+) = \?\/(\d+)$/.exec(l))) return P({t: 'feq', n: +m[1], d: +m[2], D: +m[3]});
  if ((m = /^frac which (\d+)\/(\d+) = (\d+)\/(\d+)$/.exec(l))) return P({t: 'fwhich', n: +m[1], d: +m[2]});
  if ((m = /^frac simplest (\d+)\/(\d+)$/.exec(l))) return P({t: 'fsimp', n: +m[1], d: +m[2]});
  if ((m = /^frac to mixed (\d+)\/(\d+)$/.exec(l))) return P({t: 'fmixed', n: +m[1], d: +m[2]});
  if ((m = /^frac to improper (\d+) (\d+)\/(\d+)$/.exec(l))) return P({t: 'fimp', w: +m[1], n: +m[2], d: +m[3]});
  if ((m = /^fop[13] (\d+)\/(\d+) ([+−]) (\d+)\/(\d+)(?: simplest)?$/.exec(l))) return P({t: 'fop', a: [+m[1], +m[2]], b: [+m[4], +m[5]], op: m[3] == '+' ? '+' : '-'});
  if ((m = /^fop2 (\d+) × (\d+)\/(\d+)$/.exec(l))) return P({t: 'fwx', w: +m[1], n: +m[2], d: +m[3]});
  if ((m = /^fop5 (\d+)\/(\d+) x (\d+)\/(\d+)$/.exec(l))) return P({t: 'fmul', a: [+m[1], +m[2]], b: [+m[3], +m[4]]});
  if ((m = /^fop6 ([\d/]+) \/ ([\d/]+)$/.exec(l))) return P({t: 'fdiv', a: m[1], b: m[2]});
  // decimals
  if ((m = /^dec1 grid (\d+) of (10|100)$/.exec(l))) return P({t: 'grid', n: +m[1], of: +m[2]});
  if ((m = /^([\d.]+) ([×÷]) ([\d.]+) = \?$/.exec(l)) && /\./.test(m[1] + m[3])) return P({t: 'decx', a: m[1], b: m[3], op: m[2]});
  if ((m = /^meas6 ([\d.]+) (\w+) to (\w+)$/.exec(l))) return P({t: 'conv', n: +m[1], u: m[2], v: m[3], six: true});
  if ((m = /^meas5 ([\d.]+) (\w+) to (\w+)$/.exec(l))) return P({t: 'conv', n: +m[1], u: m[2], v: m[3]});
  // order of operations, exponents, expressions with a letter, two-step stories
  if ((m = /^([\d ()+−×÷^]+) = \?$/.exec(l)) && /[×÷^(]/.test(m[1])) return P({t: 'expr', s: m[1]});
  if ((m = /^(.+), ([a-z]) = (\d+)$/.exec(l)) && new RegExp('\\b' + m[2] + '\\b|\\d' + m[2]).test(m[1])) return P({t: 'alg', s: m[1], x: m[2], n: +m[3]});
  if ((m = /^(?:2-step|story6) (.+)$/.exec(l)) && /^[\d ()+−×÷-]+$/.test(m[1])) return P({t: 'expr', s: m[1].replace(/-/g, '−'), story: true});
  if ((m = /^story7 (?:\d+x\d+=)?(\d+) \/ (\d+) (up|left|down)$/.exec(l))) return P({t: 'storyr', n: +m[1], k: +m[2], mode: m[3]});
  // equations: "alg1 m + 33 = 98", "alg1 15 + p = 22", "alg1 x − 19 = 56"
  if ((m = /^alg1 (?:([a-z]) ([+−]) (\d+)|(\d+) \+ ([a-z])) = (\d+)$/.exec(l))) return P({t: 'eq', op: m[2] == '−' ? '-' : '+', k: +(m[3] || m[4]), c: +m[6]});
  // integers
  if ((m = /^int3 (-?\d+) ([+-]) (-?\d+)$/.exec(l))) return P({t: 'int', a: +m[1], op: m[2], b: +m[3]});
  if ((m = /^int2 dist (-?\d+) (-?\d+)$/.exec(l))) return P({t: 'idist', a: +m[1], b: +m[2]});
  if ((m = /^int2 (?:opp|abs) (-?\d+)$/.exec(l))) return P({t: 'iopp', a: +m[1]});
  // shapes and measures
  if ((m = /^geo1 rect (\d+)x(\d+) \w+$/.exec(l))) return P({t: 'perim', w: +m[1], h: +m[2]});
  if ((m = /^geo2 (?:shade |grid )?(\d+)x(\d+)(?: \w+)?$/.exec(l))) return P({t: 'area', w: +m[1], h: +m[2]});
  if ((m = /^geo3 perimeter (\d+) side (\d+) \w+$/.exec(l))) return P({t: 'pside', p: +m[1], s: +m[2]});
  if ((m = /^geo4 (?:vol|cubes) (\d+)x(\d+)x(\d+)$/.exec(l))) return P({t: 'vol', l: +m[1], w: +m[2], h: +m[3]});
  if ((m = /^geo5 tri (\d+) (\d+) \w+$/.exec(l))) return P({t: 'tri', b: +m[1], h: +m[2]});
  if ((m = /^ruler (?:cm|in) from (\d+) to (\d+)$/.exec(l))) return P({t: 'ruler', a: +m[1], b: +m[2]});
  // data
  if ((m = /^data5 (range|mean) ([\d,]+)(?: plot)?$/.exec(l))) return P({t: 'data5', what: m[1], xs: m[2].split(',').map(Number)});
  if ((m = /^data more (\w+) than (\w+): (.+)$/.exec(l))) {
    const vals = Object.fromEntries([...m[3].matchAll(/(\w+) (\d+)/g)].map(x => [x[1], +x[2]]));
    if (vals[m[1]] != null && vals[m[2]] != null) return P({t: 'more', x: vals[m[1]], y: vals[m[2]]});
  }
  if ((m = /^bar more (\w+) than (\w+): (.+)$/.exec(l))) {
    const vals = Object.fromEntries([...m[3].matchAll(/([A-Z][a-z])(\d+)/g)].map(x => [x[1], +x[2]]));
    const x = vals[m[1].slice(0, 2)], y = vals[m[2].slice(0, 2)];
    if (x != null && y != null) return P({t: 'more', x, y});
  }
  if ((m = /^fact3 lcm(?:-w)? (\d+) (\d+)$/.exec(l))) return P({t: 'lcm', a: +m[1], b: +m[2]});
  // coordinates and ratios: "coord1 pair 0,5", "coord1 read 10,10", "coord1 tap 1,4", "ratio1 sent 5 3 xy", "ratio1 tbl 5 8 35 ?"
  if ((m = /^coord1 (?:pair|read|tap) (\d+),(\d+)$/.exec(l))) return P({t: 'xy', x: +m[1], y: +m[2]});
  if (/^ratio1 (?:sent|dots) /.test(l) && /^\d+:\d+$/.test(a)) return P({t: 'ratio'});
  if ((m = /^ratio1 tbl (\d+) (\d+) (\d+|\?) (\d+|\?)$/.exec(l))) return P({t: 'rtab', a: +m[1], b: +m[2], c: m[3] == '?' ? null : +m[3], d: m[4] == '?' ? null : +m[4]});
  // Pre-K and K counting: "count 4 apples", "count 7 apples (scatter)", "frame 6", "count 14 cars (frames)", "tap 17 (teens)"
  if ((m = /^count (\d+) \w+(?: \(scatter\))?$/.exec(l)) || (m = /^frame (\d+)$/.exec(l)) || (m = /^meas \w+(?: \w+)? (\d+) cubes$/.exec(l))) return P({t: 'count', n: +m[1]});
  if ((m = /^count (\d+) \w+ \(frames\)$/.exec(l))) return P({t: 'frames', n: +m[1]});
  if ((m = /^tap (\d+) \(teens\)$/.exec(l))) return P({t: 'teen', n: +m[1]});
  if ((m = /^tap (\d+)(?: to ten)?$/.exec(l)) && q.kind == 'choice') return P({t: 'numeral', n: +m[1]});
  // the biggest or smallest of three: "tallest tower 4/3/2", "shortest crayon 150/60/180 (not lined up)" (the answer is a place, 0 1 2)
  if ((m = /^(tallest|shortest|longest|biggest|smallest) \w+ ([\d./]+)$/.exec(l))) return P({t: 'size', xs: m[2].split('/').map(Number), big: /tall|long|big/.test(m[1])});
  if ((m = /^which is prime ([\d,]+)$/.exec(l))) return P({t: 'prime'});
  if ((m = /^alg2 (\d+)([a-z]) = (\d+)$/.exec(l))) return P({t: 'eq', op: '×', k: +m[1], c: +m[3]});
  if ((m = /^ang2 (right|straight) (\d+) - (\d+)$/.exec(l))) return P({t: 'ang', tot: +m[2], x: +m[3]});
  // ---- reading ----
  if ((m = /^(?:claps|syllables): (\w+)$/.exec(l))) return P({t: 'syl'});
  if ((m = /^middle: (\w+)$/.exec(l))) return P({t: 'midv', w: m[1]});
  if ((m = /^(big|little) ([A-Z])$/.exec(l))) return P({t: 'letter'});
  if ((m = /^after ([a-z])$/.exec(l))) return P({t: 'after', l: m[1]});
  if ((m = /^(starts|ends): (\w+)$/.exec(l))) return P({t: 'snd', end: m[1] == 'ends', w: m[2]});
  if ((m = /^starts (ch|sh|th|wh): /.exec(l)) || (m = /^ends (ch|sh|th|ck): /.exec(l))) return P({t: 'dig'});
  if (/^read “/.test(l) && q.kind == 'choice') return P({t: 'word', w: hmQuoted(l)});
  if (/^spell “/.test(l) && q.kind == 'build') return P({t: 'word', w: q.word, built: true});
  if (/^spelling “/.test(l) && q.kind == 'spell') return P({t: 'word', w: q.word, typed: true});
  if (/^hear “/.test(l) && q.kind == 'choice') return P({t: 'sight', w: String(a)});
  if ((m = /^rhyme: (\w+)$/.exec(l))) return P({t: 'rhyme', w: m[1]});
  if (/^“.+”$/.test(l) && q.kind == 'choice' && /^\w+$/.test(a)) return P({t: 'sight', w: String(a)});
  if ((m = /^One (\w+), two ___\. = (\w+)$/.exec(l))) return P({t: 'plural', s: m[1], p: m[2]});
  if (q.kind == 'choice' && ch.some(c => c !== String(a) && hmHomo(c, a))) return P({t: 'homo'});
  // ---- Spanish ----
  if ((m = /^(los|las) (\S+) \(plural\)$/.exec(l))) return P({t: 'esart'});
  if (q.kind == 'choice' && HM_ESP[String(a)] && ch.every(c => HM_ESP[c])) return P({t: 'esper'});
  if ((m = /^(No me|Me) gusta.+\(picture\)$/.exec(l))) return P({t: 'esno'});
  if ((m = /^(\S+) \(spell\)$/.exec(l)) && q.kind == 'spell') return P({t: 'esspell', w: q.word});
  return null;
}

/* ---- the reading mistakes: what changed between the right word w and the child's word x (the codes of 52l-bench4.js, ls4Code, and
   a few for spelling). null when the change is none of them. ---- */
const HM_TEAMS = ['ai', 'ay', 'ee', 'ea', 'oa', 'oo', 'ou', 'ow', 'oi', 'oy', 'ie', 'ue', 'ew', 'aw', 'au', 'ui', 'ey'];
const HM_DIGS = ['sh', 'ch', 'th', 'wh', 'ck', 'ph', 'ng'];
const hmVow = c => 'aeiou'.includes(c);
function hmWord(w, x) {
  w = String(w).toLowerCase();
  x = String(x).toLowerCase();
  if (!w || !x || w === x) return null;
  // the silent e left off (kite as kit), or an e put on
  if (/[aeiou][^aeiou]e$/.test(w) && x === w.slice(0, -1)) return {c: 'silent'};
  // the -ed ending written as it sounds (jumped as jumpt, played as playd)
  if (w.length >= 6 && /[^e]ed$/.test(w) && (x === w.slice(0, -2) + 't' || x === w.slice(0, -2) + 'd')) return {c: 'ed'};
  // ch for sh (or sh for ch)
  for (const [p, r] of [['ch', 'sh'], ['sh', 'ch']]) if (w.includes(p) && x === w.replace(p, r)) return {c: 'shch', l: r};
  // a vowel team read as one vowel (boat as bat, bot), or as another team (toy as tow)
  for (const t of HM_TEAMS) {
    const i = w.indexOf(t);
    if (i < 0) continue;
    if (x === w.slice(0, i) + t[0] + w.slice(i + 2) || x === w.slice(0, i) + t[1] + w.slice(i + 2)) return {c: 'team'};
    if (HM_TEAMS.includes(x.slice(i, i + 2)) && x.slice(0, i) === w.slice(0, i) && x.slice(i + 2) === w.slice(i + 2)) return {c: 'team'};
  }
  // er, ir, ur (and ar, or) mixed up: the vowel before an r
  if (w.length == x.length) {
    const d = [...w].map((c, i) => (c === x[i] ? -1 : i)).filter(i => i >= 0);
    if (d.length == 1 && hmVow(w[d[0]]) && hmVow(x[d[0]]) && w[d[0] + 1] == 'r') return {c: 'rvow'};
  }
  // two letters that make one sound read as one letter (ship as sip, duck as duk)
  for (const g of HM_DIGS) {
    const i = w.indexOf(g);
    if (i >= 0 && (x === w.slice(0, i) + g[0] + w.slice(i + 2) || x === w.slice(0, i) + g[1] + w.slice(i + 2))) return {c: 'dig'};
  }
  // one letter of a double left out (hill as hil)
  if (x.length == w.length - 1) {
    for (let i = 0; i < w.length - 1; i++) if (w[i] === w[i + 1] && !hmVow(w[i]) && x === w.slice(0, i) + w.slice(i + 1)) return {c: 'dbl'};
    // one letter of a blend left out (frog as fog, hand as had)
    for (let i = 0; i < w.length; i++) {
      if (x !== w.slice(0, i) + w.slice(i + 1) || hmVow(w[i])) continue;
      const nb = (i > 0 && !hmVow(w[i - 1])) || (i < w.length - 1 && !hmVow(w[i + 1]));
      if (nb) return {c: 'blend'};
    }
  }
  if (x.length == w.length) {
    const d = [...w].map((c, i) => (c === x[i] ? -1 : i)).filter(i => i >= 0);
    // two letters next to each other swapped (form as from)
    if (d.length == 2 && d[1] == d[0] + 1 && w[d[0]] === x[d[1]] && w[d[1]] === x[d[0]]) return {c: 'lswap'};
    if (d.length == 1 || (d.length == 2 && d[1] == d[0] + 1)) {
      const i = d[0], j = d[d.length - 1], lx = x.slice(i, j + 1), cons = d.every(k => !hmVow(w[k]) && !hmVow(x[k]));
      // the first or last sound: consonants only (sun as bun, cat as cap), not a vowel put in their place
      if (i == 0 && cons) return {c: 'first', l: lx};
      if (j == w.length - 1 && cons) return {c: 'last', l: lx};
      if (d.length == 1 && hmVow(w[i]) && hmVow(x[i])) return {c: 'mid', l: lx};
    }
  }
  return null;
}

/* ---- the mistakes. HM[code] = {d: what the child does (for the drafting brief and tests), t: [problem types], s: the slots its hint
   may use, f(P): [[the answer this mistake gives, {slot: value}], ...]}. Order matters: hmMatch takes the first code that fits. ---- */
const hmSign = P => (P.t == 'add' || P.op == '+' ? 'add' : 'take away');
const HM = {
  // ---- adding and taking away (the lessons' codes: BUGS in 52b-know.js) ----
  cat: {d: 'writes each column total side by side (27 + 15 as 312)', t: ['add'], s: ['a', 'b', 'x', 'y', 'n', 'place'],
    f: P => {
      const cs = hmCols(P.a, P.b, (x, y) => x + y), i = cs.findIndex(n => n > 9);
      if (i < 0 || hmDig(P.a).length < 2 && hmDig(P.b).length < 2) return [];
      return [[String(+cs.slice().reverse().join('')), {a: P.a, b: P.b, x: hmDig(P.a)[i] || 0, y: hmDig(P.b)[i] || 0, n: cs[i], place: hmPlaceName(i)}]];
    }},
  nocarry: {d: 'adds each column and drops the extra ten (forgot to carry)', t: ['add'], s: ['a', 'b', 'x', 'y', 'n', 'place'],
    f: P => {
      const cs = hmCols(P.a, P.b, (x, y) => x + y), i = cs.findIndex(n => n > 9);
      if (i < 0 || P.a < 10 && P.b < 10) return [];
      return [[String(hmJoin(cs.map(n => n % 10))), {a: P.a, b: P.b, x: hmDig(P.a)[i] || 0, y: hmDig(P.b)[i] || 0, n: cs[i], place: hmPlaceName(i)}]];
    }},
  col: {d: 'takes the smaller digit from the bigger one in each column', t: ['sub'], s: ['a', 'b', 'x', 'y', 'place'],
    f: P => {
      if (P.a < P.b || P.b < 10 && P.a < 10) return [];
      const x = hmDig(P.a), y = hmDig(P.b), i = x.findIndex((d, j) => d < (y[j] || 0));
      if (i < 0) return [];
      return [[String(hmJoin(hmCols(P.a, P.b, (p, r) => Math.abs(p - r)))), {a: P.a, b: P.b, x: x[i], y: y[i], place: hmPlaceName(i)}]];
    }},
  keep: {d: 'trades a ten for the ones but does not take it from the tens', t: ['sub'], s: ['a', 'b', 'place'],
    f: P => {
      if (P.a < P.b || P.b < 10 && P.a < 10) return [];
      const x = hmDig(P.a), y = hmDig(P.b), i = x.findIndex((d, j) => d < (y[j] || 0));
      if (i < 0 || i + 1 >= x.length) return [];
      return [[String(hmJoin(hmCols(P.a, P.b, (p, r) => (p < r ? p + 10 - r : p - r)))), {a: P.a, b: P.b, place: hmPlaceName(i + 1)}]];
    }},
  point: {d: 'lines up the last digits instead of the decimal points', t: ['dec'], s: ['a', 'b'],
    f: P => {
      const k = Math.max(hmDecs(P.a), hmDecs(P.b)), x = +P.a.replace('.', ''), y = +P.b.replace('.', '');
      if (hmDecs(P.a) == hmDecs(P.b)) return [];
      const r = P.op == '+' ? x + y : x - y;
      return r >= 0 ? [[hmShift(r, -k), {a: P.a, b: P.b}]] : [];
    }},
  op: {d: 'adds instead of taking away, or takes away instead of adding', t: ['add', 'sub', 'dec'], s: ['a', 'b', 'sign'],
    f: P => {
      if (P.story || P.nosign) return [];
      if (P.t == 'dec') { const r = P.op == '+' ? +P.a - +P.b : +P.a + +P.b; return r >= 0 ? [[hmF(r), {a: P.a, b: P.b, sign: hmSign(P)}]] : []; }
      const r = P.t == 'add' ? P.a - P.b : P.a + P.b;
      return r >= 0 ? [[String(r), {a: P.a, b: P.b, sign: hmSign(P)}]] : [];
    }},
  opst: {d: 'adds when the story takes away, or takes away when it adds', t: ['add', 'sub'], s: ['a', 'b'],
    f: P => {
      if (!P.story) return [];
      const r = P.t == 'add' ? P.a - P.b : P.a + P.b;
      return r >= 0 ? [[String(r), {a: P.a, b: P.b}]] : [];
    }},
  diff: {d: 'adds the two amounts when the question asks how many more', t: ['more'], s: ['a', 'b'], f: P => [[String(P.x + P.y), {a: P.x, b: P.y}]]},
  swap: {d: 'writes the tens and ones the wrong way round (14 as 41)', t: ['add', 'sub', 'pvto', 'teen', 'miss'], s: ['v'],
    f: P => {
      const r = P.t == 'pvto' ? P.tn * 10 + P.on : +P.ans;
      if (!/^\d\d$/.test(String(r)) || String(r)[0] == String(r)[1] || String(r)[1] == '0') return [];
      return [[String(r)[1] + String(r)[0], {}]];
    }},
  teen: {d: 'hears a teen number as a tens number (seventeen as seventy)', t: ['teen'], s: ['v'],
    f: P => (P.n > 12 && P.n < 20 ? [[String((P.n - 10) * 10), {}]] : [])},
  tot: {d: 'adds the two numbers it sees when a part is missing', t: ['miss'], s: ['a', 'b'],
    f: P => {
      const k = P.v.filter(x => x != null);
      if (P.op != '+' || P.at == 2) return [];
      return [[String(k[0] + k[1]), {a: P.v[P.at == 0 ? 1 : 0], b: P.v[2]}]];
    }},
  given: {d: 'answers with a number that is already in the problem', t: ['miss', 'mmiss', 'dmiss', 'iopp', 'add', 'sub'], s: ['v'],
    f: P => {
      if (P.t == 'iopp') return [[String(P.a), {}]];
      if (P.t == 'add' || P.t == 'sub') return Math.max(P.a, P.b) <= 20 && P.a && P.b ? [P.a, P.b].map(x => [String(x), {}]) : [];
      return P.v.filter(x => x != null).map(x => [String(x), {}]);
    }},
  on1: {d: 'one too many or one too few when counting on or back', t: ['add', 'sub'], s: ['a', 'b'],
    f: P => {
      if (Math.max(P.a, P.b) > 20 || +P.ans > 20 || !P.a || !P.b) return [];
      return [+P.ans - 1, +P.ans + 1].filter(x => x >= 0).map(x => [String(x), {a: P.a, b: P.b}]);
    }},
  off1: {d: 'counts one too many or one too few (a thing counted twice, or one missed)', t: ['count'], s: [],
    f: P => [P.n - 1, P.n + 1].filter(x => x >= 0).map(x => [String(x), {}])},
  ten: {d: 'forgets the full ten frame (or counts it as one)', t: ['frames'], s: [],
    f: P => (P.n > 10 ? [[String(P.n - 10), {}], [String(P.n - 9), {}]] : [])},
  // ---- place value ----
  pvzero: {d: 'leaves out the zero of an empty place (800 + 7 as 87)', t: ['expand'], s: [],
    f: P => {
      if (P.tot != '?' || P.xs.includes('?')) return [];
      const r = P.xs.map(x => x[0]).join('');
      return [[r, {}]];
    }},
  pvcat: {d: 'writes the parts side by side (70 + 2 as 702)', t: ['expand'], s: [],
    f: P => (P.tot == '?' && !P.xs.includes('?') ? [[P.xs.join(''), {}]] : [])},
  digit: {d: 'gives the digit instead of what it is worth in its place', t: ['expand', 'pvval'], s: ['d', 'place'],
    f: P => {
      if (P.t == 'pvval') { const i = pvAt(P); return i == null || i == 0 ? [] : [[String(P.d), {d: P.d, place: hmPlaceName(i)}]]; }
      if (P.tot == '?') return [];
      const v = +P.ans;
      if (v < 10) return [];
      return [[String(v)[0], {d: String(v)[0], place: hmPlaceName(String(v).length - 1)}]];
    }},
  tensOnes: {d: 'gives the ones digit when asked how many tens', t: ['pvtens'], s: [],
    f: P => (P.n >= 10 && P.n % 10 != Math.floor(P.n / 10) % 10 ? [[String(P.n % 10), {}]] : [])},
  place: {d: 'gives a digit the value of the place next to it', t: ['pvval'], s: ['d', 'place'],
    f: P => {
      const i = pvAt(P);
      if (i == null) return [];
      const v = +P.ans;
      return [v * 10, v / 10].filter(x => x >= 1 || /\./.test(P.n)).map(x => [hmF(x), {d: P.d, place: hmPlaceName(i)}]);
    }},
  // ---- times and divide (TEACH-3 codes, 52i-bench35.js) ----
  mulAdd: {d: 'adds the numbers instead of multiplying them', t: ['mul'], s: ['a', 'b'], f: P => [[String(P.a + P.b), {a: P.a, b: P.b}]]},
  part: {d: 'leaves out the zero when multiplying by the tens digit (forgets it is tens)', t: ['mul'], s: ['a', 'b', 'y'],
    f: P => (P.a >= 10 && P.b >= 10 && P.b < 100 && P.b % 10 ? [[String(P.a * (P.b % 10) + P.a * Math.floor(P.b / 10)), {a: P.a, b: P.b, y: Math.floor(P.b / 10)}]] : [])},
  mcarry: {d: 'multiplies each place but forgets to add the ten it carried', t: ['mul'], s: ['a', 'b', 'x', 'n'],
    f: P => {
      if (P.a < 10 || P.b > 9) return [];
      const ds = hmDig(P.a), i = ds.findIndex(d => d * P.b > 9);
      if (i < 0 || i == ds.length - 1 && ds.slice(0, i).every(d => d * P.b < 10)) return [];
      const r = ds.map((d, j) => (j == ds.length - 1 ? d * P.b : (d * P.b) % 10));
      return [[String(+r.slice().reverse().join('')), {a: P.a, b: P.b, x: ds[i], n: ds[i] * P.b}]];
    }},
  zeros: {d: 'writes one zero too many or too few', t: ['mul', 'p10'], s: ['a', 'b'],
    f: P => {
      if (P.t == 'mul' && ![P.a, P.b].some(x => /^10+$/.test(String(x)))) return [];
      const v = +P.ans;
      if (/\./.test(P.ans) || P.t == 'p10' && /\./.test(P.x)) return [];
      return [v * 10, v / 10].filter(x => Number.isInteger(x) && x > 0).map(x => [String(x), P.t == 'mul' ? {a: P.a, b: P.b} : {}]);
    }},
  dpt: {d: 'puts the decimal point one place off', t: ['decx', 'p10', 'conv'], s: [],
    f: P => {
      if (P.t == 'conv' && (!P.six || !/^(10*|0\.0*1)$/.test(hmF(hmFac(P) || 0)) || !/\./.test(P.ans + P.n))) return [];
      const v = +P.ans;
      if (!(/\./.test(P.ans) || P.t == 'decx' || P.t == 'p10' && /\./.test(P.x) || P.t == 'conv')) return [];
      return [hmShift(v, 1), hmShift(v, -1)].filter(x => +x > 0).map(x => [x, {}]);
    }},
  pway: {d: 'moves the digits the wrong way (multiplies when it should divide by ten, or the other way)', t: ['p10'], s: ['sign'],
    f: P => [[hmShift(P.x, P.op == '×' ? -P.k : P.k), {sign: P.op == '×' ? 'times' : 'divided by'}]]},
  fact: {d: 'gives a neighbouring times fact: one group too many or too few', t: ['mul'], s: ['a', 'b'],
    f: P => (P.a <= 12 && P.b <= 12 && P.a > 1 && P.b > 1 ? [P.a * (P.b - 1), P.a * (P.b + 1), (P.a - 1) * P.b, (P.a + 1) * P.b].map(x => [String(x), {a: P.a, b: P.b}]) : [])},
  dfact: {d: 'gives a neighbouring fact when dividing (or finding a missing factor): one too many or too few', t: ['div', 'mmiss', 'dmiss'], s: ['a', 'b'],
    f: P => {
      // a = the total, b = the number it is shared by (or the factor shown): the child's answer v times b should make a
      if (P.t == 'div') return P.a % P.b == 0 && P.a <= 144 && P.b > 1 ? [+P.ans - 1, +P.ans + 1].filter(x => x > 0).map(x => [String(x), {a: P.a, b: P.b}]) : [];
      if (P.t == 'dmiss' && P.v[0] == null) return [];
      const tot = P.t == 'mmiss' ? P.v[2] : P.v[0], other = P.t == 'mmiss' ? P.v[P.v[0] == null ? 1 : 0] : P.v[2];
      return +P.ans > 1 && tot <= 144 ? [+P.ans - 1, +P.ans + 1].map(x => [String(x), {a: tot, b: other}]) : [];
    }},
  divMul: {d: 'multiplies when it should divide', t: ['div'], s: ['a', 'b'], f: P => (P.story ? [] : [[String(P.a * P.b), {a: P.a, b: P.b}]])},
  remBig: {d: 'leaves a remainder as big as the divisor, or bigger', t: ['div'], s: ['b'],
    f: P => {
      const q = Math.floor(P.a / P.b), r = P.a % P.b;
      return q > 0 && P.ans.includes('R') ? [[`${q - 1}R${r + P.b}`, {b: P.b}]] : [];
    }},
  zero0: {d: 'drops a zero inside the answer (624 ÷ 6 as 14)', t: ['div'], s: [],
    f: P => {
      const q = String(Math.floor(P.a / P.b)), r = P.a % P.b;
      if (!/^[1-9]\d*0\d*$/.test(q) || !/0./.test(q)) return [];
      const z = q.replace(/0(?=.)/g, '');
      return [[P.ans.includes('R') ? `${z}R${r}` : z, {}]];
    }},
  // ---- comparing ----
  bigden: {d: 'thinks a bigger bottom number means a bigger fraction', t: ['cmp'], s: ['x', 'y'],
    f: P => {
      const a = hmFr(P.x), b = hmFr(P.y);
      if (!a || !b || a[1] == b[1]) return [];
      return [[a[1] > b[1] ? '>' : '<', {x: a[1], y: b[1]}]];
    }},
  longer: {d: 'thinks a decimal with more digits is bigger', t: ['cmp'], s: ['x', 'y'],
    f: P => {
      if (!/\./.test(P.x + P.y) || P.x.split('.')[0] !== P.y.split('.')[0]) return [];
      const a = +(P.x.split('.')[1] || 0), b = +(P.y.split('.')[1] || 0);
      return a == b ? [] : [[a > b ? '>' : '<', {x: P.x, y: P.y}]];
    }},
  ineg: {d: 'compares negative numbers by their size without the minus sign', t: ['cmp'], s: ['x', 'y'],
    f: P => {
      if (!P.neg || +P.x >= 0 && +P.y >= 0) return [];
      const a = Math.abs(+P.x), b = Math.abs(+P.y);
      return a == b ? [] : [[a > b ? '>' : '<', {x: P.x, y: P.y}]];
    }},
  small: {d: 'turns the sign round (picks the smaller one as bigger)', t: ['cmp'], s: ['x', 'y'],
    f: P => (P.ans == '>' ? [['<', {x: P.x, y: P.y}]] : P.ans == '<' ? [['>', {x: P.x, y: P.y}]] : [])},
  // ---- clocks (52b-know.js hands; 52i-bench35.js minute) ----
  hands: {d: 'reads the long hand as the hour and the short hand as the minutes', t: ['clock'], s: [],
    f: P => (P.m % 5 == 0 ? [[`${P.m ? P.m / 5 : 12}:${hmPad2((P.h % 12) * 5)}`, {}]] : [])},
  hnext: {d: 'reads the hour the short hand is moving towards, not the one it has passed', t: ['clock'], s: ['n'],
    f: P => (P.m > 0 ? [[hmClk(P.h + 1, P.m), {n: (P.h % 12) + 1}]] : [])},
  minute: {d: 'counts the minute marks one five off (or one mark off)', t: ['clock'], s: [],
    f: P => (!P.fine ? [] : P.one ? [P.m - 1, P.m + 1, P.m - 5, P.m + 5] : [P.m - 5, P.m + 5]).filter(x => x >= 0 && x < 60).map(x => [hmClk(P.h, x), {}])},
  el100: {d: 'works with time as if an hour had a hundred minutes', t: ['el', 'span'], s: ['n'],
    f: P => {
      if (P.t == 'span') { const r = (P.h2 * 100 + P.m2) - (P.h1 * 100 + P.m1); return r > 0 ? [[String(r), {n: 60}]] : []; }
      const r = P.h * 100 + P.m + (P.dir == 'after' ? P.n : -P.n), mm = ((r % 100) + 100) % 100;
      return mm < 60 && r > 0 ? [[hmClk(Math.floor(r / 100), mm), {n: 60}]] : [];
    }},
  // ---- money ----
  count: {d: 'counts the coins instead of adding their values', t: ['coins'], s: ['n'], f: P => [[String(P.xs.length), {n: P.xs.length}]]},
  nickel: {d: 'mixes up a nickel and a dime (the bigger coin is worth less)', t: ['coins', 'money'], s: [],
    f: P => {
      if (!P.xs.some(x => x == 5 || x == 10)) return [];
      const v = P.xs.reduce((s, x) => s + (x == 5 ? 10 : x == 10 ? 5 : x), 0);
      return [[P.t == 'money' ? '$' + (v / 100).toFixed(2) : String(v), {}]];
    }},
  // ---- rounding (52i-bench35.js trunc, rup) ----
  trunc: {d: 'always rounds down: drops the digits after the place', t: ['round'], s: ['d'],
    f: P => {
      const lo = Math.floor(+P.n / P.to + 1e-9) * P.to, hi = lo + P.to;
      return Math.abs(+P.ans - hi) < 1e-9 && Math.abs(lo - +P.n) > 1e-9 ? [[hmF(lo), {d: hmNext(P)}]] : [];
    }},
  rup: {d: 'rounds up when the next digit is below five', t: ['round'], s: ['d'],
    f: P => {
      const lo = Math.floor(+P.n / P.to + 1e-9) * P.to, hi = lo + P.to;
      return Math.abs(+P.ans - lo) < 1e-9 && Math.abs(lo - +P.n) > 1e-9 ? [[hmF(hi), {d: hmNext(P)}]] : [];
    }},
  rplace: {d: 'rounds to the wrong place (to the hundreds when asked for tens)', t: ['round'], s: ['place'],
    f: P => [P.to * 10, P.to / 10].filter(t => t <= +P.n && t >= 0.001).map(t => [hmF(Math.round(+P.n / t) * t), {place: hmPlaceWord(P.to)}])},
  // ---- counting patterns ----
  seqone: {d: 'counts on by one instead of by the pattern\'s step', t: ['seq'], s: ['n'],
    f: P => {
      const st = hmStep(P);
      if (st == null || Math.abs(st) == 1 || P.at == 0) return [];
      return [[String(P.xs[P.at - 1] + Math.sign(st)), {n: Math.abs(st)}]];
    }},
  seqdir: {d: 'counts the wrong way (on instead of back, or back instead of on)', t: ['seq'], s: [],
    f: P => {
      const st = hmStep(P);
      return st == null || P.at == 0 ? [] : [[String(P.xs[P.at - 1] - st), {}]];
    }},
  // ---- fractions (52i-bench35.js) ----
  flip: {d: 'writes the fraction upside down', t: ['fname', 'fline'], s: [], f: P => (P.n != P.d ? [[`${P.d}/${P.n}`, {}]] : [])},
  unshaded: {d: 'names the parts that are not shaded', t: ['fname'], s: [],
    f: P => (P.n < P.d && P.d - P.n != P.n ? [[`${P.d - P.n}/${P.d}`, {}]] : [])},
  fpart: {d: 'writes shaded parts over unshaded parts, not over all the parts', t: ['fname'], s: [],
    f: P => (P.n < P.d ? [[`${P.n}/${P.d - P.n}`, {}]] : [])},
  ticks: {d: 'counts the tick marks instead of the jumps (spaces)', t: ['fline', 'ruler'], s: [],
    f: P => (P.t == 'ruler' ? [[String(P.b - P.a + 1), {}]] : [[`${P.n}/${P.d + 1}`, {}]])},
  addEq: {d: 'adds the same number to the top and the bottom of a fraction', t: ['feq', 'fwhich'], s: ['n', 'd'],
    f: P => {
      if (P.t == 'feq') return [[String(P.n + P.D - P.d), {n: P.n, d: P.d}]];
      const o = [];
      for (let k = 1; k <= 12; k++) o.push([`${P.n + k}/${P.d + k}`, {n: P.n, d: P.d}]);
      return o;
    }},
  oneSide: {d: 'divides only the top, or only the bottom, to simplify', t: ['fsimp'], s: [],
    f: P => { const g = hmGcd(P.n, P.d); return g > 1 ? [[`${P.n / g}/${P.d}`, {}], [`${P.n}/${P.d / g}`, {}]] : []; }},
  mixTop: {d: 'keeps all the parts on top after taking out the wholes', t: ['fmixed'], s: [],
    f: P => (P.n > P.d ? [[`${Math.floor(P.n / P.d)} ${P.n}/${P.d}`, {}]] : [])},
  mixSwap: {d: 'swaps the wholes and the parts left over', t: ['fmixed'], s: [],
    f: P => { const w = Math.floor(P.n / P.d), r = P.n % P.d; return r && r != w && w < P.d ? [[`${r} ${w}/${P.d}`, {}]] : []; }},
  impAdd: {d: 'adds the whole, the top and the bottom instead of multiplying', t: ['fimp'], s: [],
    f: P => [[String(P.w + P.d + P.n), {}]]},
  impTop: {d: 'multiplies the whole by the bottom and forgets to add the top', t: ['fimp'], s: [],
    f: P => [[String(P.w * P.d), {}]]},
  addBot: {d: 'adds (or takes away) the bottom numbers too, when the bottoms are the same', t: ['fop'], s: [],
    f: P => {
      if (P.a[1] != P.b[1]) return [];
      const n = P.op == '+' ? P.a[0] + P.b[0] : P.a[0] - P.b[0], d = P.op == '+' ? P.a[1] + P.b[1] : P.a[1] - P.b[1];
      return d > 0 && n >= 0 ? [[`${n}/${d}`, {}]] : [];
    }},
  addUnl: {d: 'adds (or takes away) the tops and the bottoms when the bottoms are different', t: ['fop'], s: [],
    f: P => {
      if (P.a[1] == P.b[1]) return [];
      const n = P.op == '+' ? P.a[0] + P.b[0] : P.a[0] - P.b[0], d = P.op == '+' ? P.a[1] + P.b[1] : P.a[1] - P.b[1];
      return d > 0 && n >= 0 ? [[`${n}/${d}`, {}]] : [];
    }},
  mulBot: {d: 'multiplies the bottom number too (3 × 2/5 as 6/15)', t: ['fwx'], s: [], f: P => [[`${P.w * P.n}/${P.w * P.d}`, {}]]},
  topOnly: {d: 'multiplies the tops and keeps one bottom', t: ['fmul'], s: [],
    f: P => [[`${P.a[0] * P.b[0]}/${P.a[1]}`, {}], [`${P.a[0] * P.b[0]}/${P.b[1]}`, {}]]},
  fdivx: {d: 'multiplies when dividing by a fraction (forgets to flip it)', t: ['fdiv'], s: [],
    f: P => {
      const a = hmFr(P.a) || [+P.a, 1], b = hmFr(P.b) || [+P.b, 1];
      return [[`${a[0] * b[0]}/${a[1] * b[1]}`, {}]];
    }},
  dzero: {d: 'mixes up tenths and hundredths', t: ['grid'], s: [], f: P => [[hmF(P.of == 10 ? P.n / 100 : P.n / 10), {}]]},
  // ---- order of operations, letters, stories ----
  order: {d: 'works left to right, adding before multiplying', t: ['expr', 'alg'], s: [],
    f: P => { const v = hmEval(hmExprOf(P), 'ltr'); return v == null ? [] : [[hmF(v), {}]]; }},
  apow: {d: 'multiplies the base by the power (7^2 as 14)', t: ['expr', 'alg'], s: [],
    f: P => {
      const v = /\^/.test(hmExprOf(P)) ? hmEval(hmExprOf(P), 'pow') : null;
      return v == null ? [] : [[hmF(v), {}]];
    }},
  ocat: {d: 'reads a number next to a letter as two digits (5n with n = 3 as 53)', t: ['alg'], s: ['x'],
    f: P => {
      if (!new RegExp('\\d' + P.x).test(P.s)) return [];
      const v = hmEval(P.s.replace(new RegExp('(\\d)' + P.x, 'g'), '$1' + P.n).replace(new RegExp('\\b' + P.x + '\\b', 'g'), P.n), 'std');
      return v == null ? [] : [[hmF(v), {x: P.x}]];
    }},
  step1: {d: 'stops after the first step of a two-step problem', t: ['expr'], s: [],
    f: P => {
      if (!P.story) return [];
      const m = /\(([^()]+)\)/.exec(P.s), first = m ? m[1] : (/^\s*\d+ [+−×÷] \d+/.exec(P.s) || [])[0];
      const v = first ? hmEval(first, 'std') : null;
      return v == null ? [] : [[hmF(v), {}]];
    }},
  remUp: {d: 'forgets that the leftover still needs one more (a bus, a box)', t: ['storyr'], s: [],
    f: P => (P.mode == 'up' && P.n % P.k ? [[String(Math.floor(P.n / P.k)), {}]] : [])},
  remLeft: {d: 'gives how many groups when the question asks what is left over', t: ['storyr'], s: [],
    f: P => (P.mode == 'left' ? [[String(Math.floor(P.n / P.k)), {}]] : [])},
  aop: {d: 'does the sign\'s operation again instead of undoing it (m + 33 = 98 gives 131)', t: ['eq'], s: ['sign'],
    f: P => {
      const r = P.op == '+' ? P.c + P.k : P.op == '-' ? P.c - P.k : P.c * P.k;
      return r >= 0 ? [[String(r), {sign: {'+': 'plus', '-': 'minus', '×': 'times'}[P.op]}]] : [];
    }},
  a180: {d: 'takes the angle from the wrong total (180 for a right angle)', t: ['ang'], s: ['n'],
    f: P => (P.tot == 90 && 180 - P.x > 0 ? [[String(180 - P.x), {n: P.tot}]] : [])},
  oddPrime: {d: 'thinks every odd number is prime', t: ['prime'], s: ['o'],
    f: P => P.ch.filter(c => c !== P.ans && +c % 2 == 1 && +c > 1).map(c => [c, {o: c}])},
  size: {d: 'picks the smallest when asked for the biggest (or the other way round)', t: ['size'], s: [],
    f: P => { const e = (P.big ? Math.min : Math.max)(...P.xs); return P.xs.filter(x => x == e).length == 1 ? [[String(P.xs.indexOf(e)), {}]] : []; }},
  clap: {d: 'claps one beat too many or too few', t: ['syl'], s: [], f: P => [+P.ans - 1, +P.ans + 1].filter(x => x > 0).map(x => [String(x), {}])},
  // ---- integers ----
  dneg: {d: 'treats taking away a negative number as taking away', t: ['int'], s: [],
    f: P => (P.op == '-' && P.b < 0 ? [[String(P.a + P.b), {}]] : [])},
  isign: {d: 'gets the size right but the sign wrong', t: ['int'], s: [],
    f: P => (+P.ans ? [[String(-P.ans), {}]] : [])},
  idist: {d: 'takes one number from the other without the minus sign (distance across zero)', t: ['idist'], s: [],
    f: P => ((P.a < 0) != (P.b < 0) ? [[String(Math.abs(Math.abs(P.a) - Math.abs(P.b))), {}]] : [])},
  // ---- shapes, measures and data (52i-bench35.js) ----
  area: {d: 'multiplies the sides (finds the area, not the perimeter)', t: ['perim'], s: ['a', 'b'], f: P => [[String(P.w * P.h), {a: P.w, b: P.h}]]},
  half: {d: 'adds only two of the four sides', t: ['perim'], s: ['a', 'b'], f: P => [[String(P.w + P.h), {a: P.w, b: P.h}]]},
  perim: {d: 'adds the sides instead of counting the squares inside', t: ['area'], s: ['a', 'b'],
    f: P => [[String(P.w + P.h), {a: P.w, b: P.h}], [String(2 * (P.w + P.h)), {a: P.w, b: P.h}]]},
  sideP: {d: 'takes one side from the whole perimeter (forgets to halve it)', t: ['pside'], s: [], f: P => [[String(P.p - P.s), {}], [String(P.p - 2 * P.s), {}]]},
  layer: {d: 'counts only one layer of the box', t: ['vol'], s: [], f: P => [[String(P.l * P.w), {}]]},
  thalf: {d: 'forgets to halve for a triangle (base times height only)', t: ['tri'], s: [], f: P => [[String(P.b * P.h), {}]]},
  conv: {d: 'adds instead of multiplying when changing to a smaller unit', t: ['conv'], s: ['u', 'w'],
    f: P => { const f = hmFac(P); return f && f > 1 && !P.six ? [[String(P.n + f), {u: P.u, w: P.v}]] : []; }},
  rend: {d: 'reads the number at the end of the thing, not how far it is from the start', t: ['ruler'], s: [], f: P => [[String(P.b), {}]]},
  rmax: {d: 'gives the biggest number instead of the range', t: ['data5'], s: [],
    f: P => (P.what == 'range' ? [[String(Math.max(...P.xs)), {}]] : [])},
  mean: {d: 'adds the numbers and forgets to share the total out', t: ['data5'], s: [],
    f: P => (P.what == 'mean' ? [[String(P.xs.reduce((s, x) => s + x, 0)), {}]] : [])},
  lcmx: {d: 'multiplies the two numbers (a common multiple, but not the least)', t: ['lcm'], s: [], f: P => [[String(P.a * P.b), {}]]},
  xyswap: {d: 'switches the x and y numbers of a point', t: ['xy'], s: [], f: P => (P.x != P.y ? [[`${P.y},${P.x}`, {}]] : [])},
  rflip: {d: 'writes the ratio the other way round', t: ['ratio'], s: [], f: P => { const [x, y] = P.ans.split(':'); return x != y ? [[`${y}:${x}`, {}]] : []; }},
  radd: {d: 'adds the same amount instead of multiplying (ratio tables)', t: ['rtab'], s: [],
    f: P => {
      if (P.d == null && P.c != null) return [[String(P.c + P.b - P.a), {}]];
      if (P.c == null && P.d != null && P.d - (P.b - P.a) > 0) return [[String(P.d - (P.b - P.a)), {}]];
      return [];
    }},
  // ---- reading (52l-bench4.js codes, and new ones for spelling) ----
  look: {d: 'picks a letter or number that looks alike (b for d, M for W, 6 for 9)', t: ['letter', 'numeral'], s: ['l'],
    f: P => P.ch.filter(c => c !== P.ans && HM_LOOK.some(g => g.includes(c) && g.includes(P.ans))).map(c => [c, {l: c}])},
  abc: {d: 'picks the letter before instead of the letter after', t: ['after'], s: [],
    f: P => (P.l > 'a' ? [[String.fromCharCode(P.l.charCodeAt(0) - 1), {}]] : [])},
  first: {d: 'hears or reads the first sound wrong (sun as bun)', t: ['word', 'snd'], s: ['o', 'l'], f: P => hmWordF(P, 'first')},
  last: {d: 'hears or reads the last sound wrong (cat as cap)', t: ['word', 'snd'], s: ['o', 'l'], f: P => hmWordF(P, 'last')},
  mid: {d: 'reads (or hears) the middle vowel wrong (cat as cut)', t: ['word', 'midv'], s: ['o', 'l'],
    f: P => (P.t == 'midv' ? P.ch.filter(c => c !== P.ans).map(c => [c, {o: c, l: c}]) : hmWordF(P, 'mid'))},
  blend: {d: 'leaves out one letter of a blend (frog as fog)', t: ['word'], s: ['o'], f: P => hmWordF(P, 'blend')},
  dig: {d: 'reads two letters that make one sound as one letter (ship as sip)', t: ['word'], s: ['o'], f: P => hmWordF(P, 'dig')},
  shch: {d: 'mixes up ch and sh', t: ['word', 'dig'], s: ['o', 'l'],
    f: P => (P.t == 'dig' ? P.ch.filter(c => c !== P.ans && [c, P.ans].sort().join() == 'ch,sh').map(c => [c, {o: c, l: c}]) : hmWordF(P, 'shch'))},
  silent: {d: 'leaves off the silent e at the end (kite as kit)', t: ['word'], s: ['o'], f: P => hmWordF(P, 'silent')},
  team: {d: 'reads a vowel team as one short vowel (boat as bat), or as another team', t: ['word'], s: ['o'], f: P => hmWordF(P, 'team')},
  rvow: {d: 'mixes up er, ir and ur (they sound the same)', t: ['word'], s: ['o'], f: P => hmWordF(P, 'rvow')},
  dbl: {d: 'writes one letter where the word has two the same (hill as hil)', t: ['word'], s: ['o'], f: P => hmWordF(P, 'dbl')},
  ed: {d: 'spells the -ed ending the way it sounds (jumped as jumpt)', t: ['word'], s: ['o'], f: P => hmWordF(P, 'ed')},
  lswap: {d: 'puts two letters in the wrong order (from as form)', t: ['word'], s: ['o'], f: P => hmWordF(P, 'lswap')},
  homo: {d: 'picks a word that sounds the same but is spelt differently and means something else', t: ['homo', 'word', 'sight'], s: ['o'],
    f: P => {
      if (P.t == 'word') return P.typed ? (HM_HOMO.find(s => s.includes(P.w)) || []).filter(c => c !== P.w && /^[a-z]+$/.test(c)).map(c => [c, {o: c}]) : [];
      return hmCands(P).filter(c => hmHomo(c, P.t == 'homo' ? P.ans : P.w)).map(c => [c, {o: c}]);
    }},
  wstart: {d: 'picks a word that starts the same way without reading to the end', t: ['sight'], s: ['o'],
    f: P => P.ch.filter(c => c !== P.ans && c[0] && c[0].toLowerCase() == P.ans[0].toLowerCase()).map(c => [c, {o: c}])},
  rfirst: {d: 'picks a word that starts like it instead of one that ends like it', t: ['rhyme'], s: ['o', 'w'],
    f: P => P.ch.filter(c => c !== P.ans && c[0] == P.w[0]).map(c => [c, {o: c, w: P.w}])},
  pl2: {d: 'adds s to a word that is already more than one (mens, childrens)', t: ['plural'], s: ['o'],
    f: P => P.ch.filter(c => c !== P.ans && P.p !== P.s && (c === P.p + 's' || c === P.p + 'es')).map(c => [c, {o: c}])},
  plS: {d: 'adds s to a word that changes when there is more than one (mouses, shelfs)', t: ['plural'], s: ['o', 'w'],
    f: P => (hmRegPl(P.s).includes(P.p) ? [] : P.ch.filter(c => c !== P.ans && hmRegPl(P.s).concat([P.s + 's', P.s + 'es']).includes(c)).map(c => [c, {o: c, w: P.s}]))},
  ply: {d: 'gets the y to ies rule wrong (babys, or benchies)', t: ['plural'], s: ['o'],
    f: P => P.ch.filter(c => c !== P.ans && (/y$/.test(P.s) && (c === P.s + 's' || c === P.s + 'es') || !/y$/.test(P.s) && /ies$/.test(c))).map(c => [c, {o: c}])},
  ples: {d: 'gets the es rule wrong (brushs, or doges)', t: ['plural'], s: ['o'],
    f: P => (P.p === P.s + 'es' ? [[P.s + 's', {o: P.s + 's'}]] : P.p === P.s + 's' ? [[P.s + 'es', {o: P.s + 'es'}]] : []).filter(x => P.ch.includes(x[0]))},
  plone: {d: 'leaves the word as one (bed for beds)', t: ['plural'], s: ['o'], f: P => (P.p !== P.s && P.ch.includes(P.s) ? [[P.s, {o: P.s}]] : [])},
  // ---- Spanish ----
  esgen: {d: 'uses el or los with a la word (or la, las with an el word)', t: ['esart'], s: ['o'],
    f: P => P.ch.filter(c => c !== P.ans && c.split(' ')[1] === P.ans.split(' ')[1]).map(c => [c, {o: c.split(' ')[0]}])},
  esnum: {d: 'keeps the word as one after los or las (los carro)', t: ['esart'], s: ['o'],
    f: P => P.ch.filter(c => c !== P.ans && c.split(' ')[0] === P.ans.split(' ')[0]).map(c => [c, {o: c.split(' ').slice(1).join(' ')}])},
  esper: {d: 'uses the verb form of another person (soy for es)', t: ['esper'], s: ['o', 'w'],
    f: P => P.ch.filter(c => c !== P.ans && HM_ESP[c] !== HM_ESP[P.ans]).map(c => [c, {o: c, w: HM_ESP[c]}])},
  esno: {d: 'misses the "no": picks the opposite of what the sentence says', t: ['esno'], s: [],
    f: P => P.ch.filter(c => c !== P.ans && c.slice(0, -1) === P.ans.slice(0, -1)).map(c => [c, {}])},
  tilde: {d: 'leaves off the accent mark (or the ~ of ñ)', t: ['esspell'], s: [],
    f: P => (hmNoAcc(P.w) !== P.w ? [[hmNoAcc(P.w), {}]] : [])},
};
// the reading codes: every wrong word on offer (choices), or the word built or typed, classed by hmWord
const hmCands = P => (P.ch.length ? P.ch.filter(c => c !== P.ans) : []);
function hmWordF(P, code) {
  if (P.t == 'snd') {
    // "starts: star" answered with the word's last letter, or "ends: leg" with its first
    const l = P.end ? P.w[0] : P.w[P.w.length - 1], c = P.end ? 'last' : 'first';
    return code == c && P.ch.includes(l) && l !== P.ans ? [[l, {o: l, l}]] : [];
  }
  if (P.built || P.typed) return hmWordMist(P.w).filter(x => x.c == code && hmTiles(P, x.v)).map(x => [x.v, {o: x.v, l: x.l || ''}]);
  return hmCands(P).map(c => [c, hmWord(P.w, c)]).filter(x => x[1] && x[1].c == code).map(([c, r]) => [c, {o: c, l: r.l || ''}]);
}
/* the words a child holding each reading mistake builds or types for the word w (what hmWord classes back): [{c, v, l}]. For the
   tests and the read-through; the round classes any built or typed word with hmWord. */
const HM_WM = new Map(); // hmWordMist's answers by word (the same word is asked about by several codes)
function hmWordMist(w) {
  w = String(w).toLowerCase();
  if (HM_WM.has(w)) return HM_WM.get(w);
  if (HM_WM.size > 500) HM_WM.clear();
  const o = [], add = (v, l) => { const r = hmWord(w, v); if (r && v !== w) o.push({c: r.c, v, l: r.l || l || ''}); };
  add(w.slice(0, -1));
  if (/ed$/.test(w)) { add(w.slice(0, -2) + 't'); add(w.slice(0, -2) + 'd'); }
  for (const [p, r] of [['ch', 'sh'], ['sh', 'ch']]) if (w.includes(p)) add(w.replace(p, r));
  for (let i = 0; i < w.length; i++) {
    add(w.slice(0, i) + w.slice(i + 1));
    if (i < w.length - 1 && w[i] !== w[i + 1]) add(w.slice(0, i) + w[i + 1] + w[i] + w.slice(i + 2));
    for (const c of 'abcdefghijklmnopqrstuvwxyz') if (c !== w[i]) add(w.slice(0, i) + c + w.slice(i + 1));
    for (const t of HM_TEAMS) add(w.slice(0, i) + t + w.slice(i + 2));
  }
  const r = o.filter((x, i) => o.findIndex(y => y.v === x.v) === i);
  HM_WM.set(w, r);
  return r;
}
// can the word v be built from the question's tiles? (always, for a typed word)
function hmTiles(P, v) {
  if (!P.built || !P.tiles) return true;
  const t = P.tiles.slice();
  for (const c of String(v)) { const i = t.indexOf(c); if (i < 0) return false; t.splice(i, 1); }
  return true;
}
const hmRegPl = s => [/(s|x|z|ch|sh)$/.test(s) ? s + 'es' : /[^aeiou]y$/.test(s) ? s.slice(0, -1) + 'ies' : s + 's'];
// place value: the place of the digit d in P.n (0 = ones, -1 = tenths ...), null when it is not there once
function pvAt(P) {
  const [w, f = ''] = P.n.split('.'), i = w.indexOf(String(P.d)), j = f.indexOf(String(P.d));
  if ((w.split(String(P.d)).length - 1) + (f.split(String(P.d)).length - 1) != 1) return null;
  return i >= 0 ? w.length - 1 - i : -(j + 1);
}
const hmPlaceWord = to => ({0.1: 'tenths', 0.01: 'hundredths', 1: 'ones', 10: 'tens', 100: 'hundreds', 1000: 'thousands', 10000: 'ten thousands', 100000: 'hundred thousands'})[to] || 'place';
// the digit that decides a rounding (the one after the place)
const hmNext = P => { const s = String(Math.floor(+P.n / (P.to / 10) + 1e-9)); return s[s.length - 1]; };
const hmFac = P => (HM_UNITS[P.u] && HM_UNITS[P.u][P.v]) || (HM_UNITS[P.v] && HM_UNITS[P.v][P.u] ? 1 / HM_UNITS[P.v][P.u] : null);
// the step of a number pattern with a gap (null when the known steps differ)
function hmStep(P) {
  const st = [];
  for (let i = 1; i < P.xs.length; i++) if (P.xs[i] != null && P.xs[i - 1] != null) st.push(P.xs[i] - P.xs[i - 1]);
  return st.length && st.every(s => s == st[0]) ? st[0] : null;
}
// the expression of P (a letter replaced by its number for 'alg')
const hmExprOf = P => (P.t == 'alg' ? P.s.replace(new RegExp('(\\d)' + P.x, 'g'), '$1×' + P.n).replace(new RegExp('\\b' + P.x + '\\b', 'g'), P.n) : P.s);
/* a tiny calculator for the order-of-operations mistakes: mode 'std' (the rules), 'ltr' (left to right, brackets first, no other
   rule), 'pow' (the rules, but a^b worked as a × b). null when the text is not a sum it knows. */
function hmEval(s, mode) {
  const tk = String(s).replace(/−/g, '-').match(/\d+(?:\.\d+)?|[-+×÷^()]/g);
  if (!tk || tk.join('') !== String(s).replace(/−/g, '-').replace(/\s+/g, '')) return null;
  let i = 0;
  const num = () => {
    const t = tk[i++];
    if (t == '(') { const v = sum(); if (tk[i++] != ')') throw 0; return v; }
    if (!/^\d/.test(t)) throw 0;
    return +t;
  };
  const pw = () => { let v = num(); while (tk[i] == '^') { i++; const e = num(); v = mode == 'pow' ? v * e : Math.pow(v, e); } return v; };
  const prod = () => { let v = pw(); while (tk[i] == '×' || tk[i] == '÷') { const o = tk[i++], r = pw(); v = o == '×' ? v * r : v / r; } return v; };
  const ltr = () => {
    let v = pw();
    while (i < tk.length && tk[i] != ')') { const o = tk[i++], r = pw(); v = o == '+' ? v + r : o == '-' ? v - r : o == '×' ? v * r : v / r; }
    return v;
  };
  function sum() {
    if (mode == 'ltr') return ltr();
    let v = prod();
    while (tk[i] == '+' || tk[i] == '-') { const o = tk[i++], r = prod(); v = o == '+' ? v + r : v - r; }
    return v;
  }
  try { const v = sum(); return i == tk.length && isFinite(v) ? v : null; } catch (e) { return null; }
}

/* ---- the round's side: predictions, the match, the words ---- */
// is v the right answer to q? (the kind's own rule, as check() in 50-round.js)
function hmRight(q, v) {
  const K = KIND[q.kind];
  try { return K && K.same ? !!K.same(q, v) : String(v) === String(q.ans); } catch (e) { return false; }
}
// is v the same answer as the mistake's w? (the kind's rule: a fraction or decimal by its value when the question takes any form)
const hmSame = (q, v, w) => (q.kind == 'num' && q.eq == 'value' && typeof numEq == 'function' ? numEq(String(v), String(w)) : String(v).trim() === String(w).trim());
// could a child give v at all? (a choice on offer; a typed number in the form the pad allows)
function hmCan(q, v) {
  if (q.kind == 'choice' || q.kind == 'tap' && /data-v/.test(q.html || '')) return q.kind == 'choice' ? q.choices.some(c => String(c.v) === v) : String(q.html).includes(`data-v="${v}"`);
  if (q.kind != 'num') return true;
  if (q.sep == 'R') return /^\d+R\d+$/.test(v);
  if (q.sep == 'mix') return /^\d+ \d+\/\d+$/.test(v);
  if (q.sep == 'xy') return /^-?\d+,-?\d+$/.test(v);
  if (q.pad == 'frac') return /^\d+\/\d+$/.test(v) || /^\d+$/.test(v);
  if (q.pad == 'dec') return /^\d*\.?\d+$/.test(v);
  if (q.pad == 'neg') return /^-?\d+$/.test(v);
  return /^\d+$/.test(v);
}
// every mistake's answer for q: [{c, v, s}], none of them right, in HM order
function hmPredict(q) {
  const P = hmProb(q), o = [];
  if (!P) return o;
  const ts = [P.t].concat(P.also || []);
  for (const c in HM) {
    if (!HM[c].t.some(t => ts.includes(t))) continue;
    let r = [];
    try { r = HM[c].f(P) || []; } catch (e) { r = []; }
    for (const [v, s] of r) if (v != null && String(v) !== '' && hmCan(q, String(v)) && !hmRight(q, v)) o.push({c, v: String(v), s: s || {}});
  }
  return o;
}
// the mistake a wrong answer v shows, or null: {c, s} (s: the slots, with v the child's answer)
function hmMatch(q, v) {
  if (v == null || Array.isArray(v) || hmRight(q, v)) return null;
  const P = hmProb(q);
  if (!P) return null;
  // a built or typed word: classed by what changed (52l-bench4.js codes), or a sound-alike word
  if (P.t == 'word' && (P.built || P.typed) || P.t == 'esspell') {
    if (P.t == 'esspell') return hmNoAcc(P.w) !== P.w && String(v).trim().toLowerCase() === hmNoAcc(P.w).toLowerCase() ? {c: 'tilde', s: {v: String(v)}} : null;
    if (P.typed && hmHomo(v, P.w)) return {c: 'homo', s: {o: String(v).toLowerCase(), v: String(v)}};
    const r = hmWord(P.w, String(v));
    return r && HM[r.c] && HM[r.c].t.includes('word') ? {c: r.c, s: {o: String(v).toLowerCase(), l: r.l || '', v: String(v)}} : null;
  }
  const m = hmPredict(q).find(x => hmSame(q, v, x.v));
  return m ? {c: m.c, s: Object.assign({v: String(v)}, m.s)} : null;
}
// every slot a hint line may use (tools/author.js checks lines against it): what each one is filled with
const HM_SLOTS = {a: 'the first number of the problem', b: 'the second number', v: 'the child\'s answer', x: 'a digit or number of the problem',
  y: 'another digit or number of the problem', n: 'a helper number (a column total, a count, a step, the hour)', d: 'a digit',
  place: 'a place name (ones, tens, hundreds, tenths)', sign: 'what the sign says (add, take away, times, divided by, plus, minus)',
  o: 'the word (or letter) the child chose', l: 'a letter or letters', w: 'a word of the problem', u: 'a unit', };
// a line with its slots filled from s; null when a slot it names has no value (the line then does not show)
function hmFill(t, s) {
  let bad = false;
  const out = String(t).replace(/\{([a-z]+)\}/g, (_, k) => {
    if (s[k] == null || s[k] === '') { bad = true; return ''; }
    return String(s[k]);
  });
  return bad ? null : out.charAt(0).toUpperCase() + out.slice(1); // a line that starts with the child's word starts with a capital
}
// would this filled line give the answer away? (its answer, as a word or number, in the line but nowhere in the question: a slot can
// happen to hold it, as the step 5 of "0, _, 10, 15" or "In the ones, 0 take away 5" when 100 − 95 is 5). Such a line is not shown.
const hmToks = t => String(t).split(/[^A-Za-z0-9.\/:$-]+/).map(x => x.replace(/[.:]+$/, '').toLowerCase()).filter(Boolean);
function hmLeaks(q, line) {
  const a = String(q.ans).toLowerCase();
  return hmToks(line).includes(a) && !hmToks(String(q.label) + ' ' + (q.say || '')).includes(a);
}
/* The round (50-round.js check(), the first miss): the line for a wrong answer v, as HTML for the top of the hint panel (the generic hint
   stays under it), or '' for none. It looks and is said like the KINDS2-D "why" sentences (49b-kinds2.js, class why), and gives way to
   one: a question whose wrong value has its own why sentence (G.why) shows that, as before. Only a code with a reviewed line (HINTW,
   built from the approved drafts) shows; never on a two-choice question (a guess there is always the other choice), never on a
   Challenge question (as the why), never in a check-in (check() does not ask), never with lessons off (TEACH.off: the app as it was).
   G.hm keeps the code shown (tools/smoke.js reads it). */
function hmHint(q, v) {
  if (typeof HINTW == 'undefined' || !q || typeof G == 'undefined' || !G || (typeof TEACH != 'undefined' && TEACH.off) || twoWay(q)) return '';
  if (G.why && G.why.q === q || typeof mastTag == 'function' && mastTag(q) == 'ch') return '';
  const m = hmMatch(q, v), t = m && HINTW[m.c];
  if (!t) return '';
  // a word the child built or typed is said back only when it is kid-safe (20-words.js); otherwise the generic hint alone
  if (m.s.o != null && typeof ksBad == 'function' && ksBad(m.s.o, true)) return '';
  const line = hmFill(t, m.s);
  if (!line || hmLeaks(q, line)) return '';
  G.hm = m.c;
  // said as the why is: for Pre-K to 1st, or with "Read questions out loud" on, after the hint's own words (150 ms)
  if (gradeOf() <= 1 || S.voice) setTimeout(() => { if (G && G.q === q && G.tries == 1) say(line, null, null, 1); }, 250);
  return `<div class="why hm" data-hm="${esc(m.c)}">${ico('hint', 22)}<span>${esc(line)}</span></div>`;
}
/* ---------- HINT-01: the mistake hints the owner has reviewed (part hints) ----------
   BUILT by tools/build.py from docs/drafts/hints/<code>.md ("status: reviewed ..."): never edit by hand. A hint that is
   not reviewed is never here, so its mistake shows the generic hint (hmHint in 39m-mist.js). */
const HINTW = {
};

var HINTS_VER='v182'; // last line: the whole file ran (checked by dataReady() before the app starts)
