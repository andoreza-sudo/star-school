/* ---------- TAP-10 (BEST-APP roadmap 10, docs/drafts/TAP10.md): more stops answered on the model ----------
   Converters for K2GEN (49b-kinds2.js): a fact question q0 becomes a make question about the same fact, with the make kind's own
   controls (tap a cell or a part, the − and + buttons, Check), its scoring, hints and retry words. In the gen part (loaded before gen2,
   which is at its 400 KB warning); they call 49b's helpers only when a question is made.
   No new words: each prompt is the lesson's own for that stop (52c-scripts.js add1, sub1, miss1; 52g-drafted.js lsFactStop and lsMiss
   for add2, add3, sub2, miss2) or a KINDS2 converter's (k2AddFrame, k2B10, k2FracShade). The hint is the fact's own (q0.hint) except
   where the reused converter has its own. The fact's label stays, so review and the seed fixture (add1-3, sub1-2, miss1-2) are unchanged.
   A K2GEN share that is a function converts only the facts the model can show (no 0 + n; a + ? = c, not ? + b = c; something to take
   away and something left; fraction parts big enough to tap). */
const k2Ab = (l, op) => (m => m && {a: +m[1], b: +m[2]})(new RegExp(`^(\\d+) ${op == '+' ? '\\+' : '−'} (\\d+) = \\?$`).exec(String(l)));
// add 1 (K): as add 4, a then b more on one frame (never 0 + n: nothing to put in first)
const k2AddK = q0 => (f => (f && f.a && f.b ? k2AddFrame(q0) : null))(k2Ab(q0.label, '+'));
// add 2, add 3 (1st): the sum on the double frame (20)
function k2Add20(q0) {
  const f = k2Ab(q0.label, '+');
  if (!f || !f.a || !f.b || f.a + f.b > 20) return null;
  const {a, b} = f, c = a + b;
  return k2Make(q0, {model: 'frame', m: {total: 20}, ans: c, ansSay: `${a} and ${b} make ${c}`,
    html: `<div class="eq">${a} + ${b}</div>${k2Sub('Make the answer on the frame.')}`, say: `${a} plus ${b}. Make the answer on the frame.`});
}
// sub 1 (K, frame of 10), sub 2 (1st, frame of 20): a counters are in; take b away (what is left is the answer)
const k2TakeOk = (l, t = 10) => (f => !!f && f.b >= 1 && f.b < f.a && f.a <= t)(k2Ab(l, '−')); // something to take, something left
function k2SubFrame(q0, lv) {
  const f = k2Ab(q0.label, '−'), t = lv == 1 ? 10 : 20;
  if (!k2TakeOk(q0.label, t)) return null;
  const {a, b} = f, c = a - b, tx = lv == 1 ? pkTxt : k2Sub;
  return k2Make(q0, {model: 'frame', m: {total: t, from: a}, ans: c, ansSay: `${a} take away ${b} leaves ${c}.`,
    html: `<div class="eq">${a} − ${b}</div>${tx(`Take away ${b}.`)}`, say: lv == 1 ? `There are ${a}. Take away ${b}.` : `${a} minus ${b}. Take away ${b}.`});
}
// miss 1 (K, frame of 10), miss 2 (1st, frame of 20): a + ? = c with a counters in; put in more to make c (only this form: in ? + b = c
// the lesson's words would name the parts the other way round)
const k2MissAb = l => (m => m && +m[1] >= 1 && +m[1] < +m[2] && {a: +m[1], c: +m[2]})(/^(\d+) \+ \? = (\d+)$/.exec(String(l)));
function k2MissFrame(q0, lv) {
  const f = k2MissAb(q0.label), t = lv == 1 ? 10 : 20;
  if (!f || f.c > t) return null;
  const {a, c} = f, k = c - a;
  return k2Make(q0, {model: 'frame', m: {total: t, fixed: a}, ans: k, ansSay: `${a} and ${k} make ${c}`,
    html: `<div class="eq">${a} + <b class="k2q">?</b> = ${c}</div>${(lv == 1 ? pkTxt : k2Sub)(`Put in more to make ${c}.`)}`,
    say: lv == 1 ? `${a} and how many make ${c}? Put in more to make ${c}.` : `${a} plus what makes ${c}? Put in more to make ${c}.`});
}
// big 2 (1st): the sum with base-ten blocks, tens and ones (as big 1)
const k2B10Sum = q0 => k2B10(q0, 1);
// frac 5 (3rd): an equal fraction on the model. Shade n/d of a bar (or circle) cut into D parts (D = d × m): the shading is the equal
// fraction. Only where the parts stay big enough to tap (a bar of 6 parts at most, a circle of 8), as k2FracShade
const k2EqParts = l => (m => m && {n: +m[1], d: +m[2], D: +m[4]})(/^frac (?:eq|which) (\d+)\/(\d+) = (\?|\d+)\/(\d+)$/.exec(String(l)));
const k2EqOk = l => (f => !!f && (f.D <= 6 || f.D == 8))(k2EqParts(l));
function k2FracEq(q0) {
  const f = k2EqParts(q0.label);
  if (!k2EqOk(q0.label)) return null;
  const {n, d, D} = f, sh = D <= 6 ? 'bar' : 'circle';
  return k2Make(q0, {model: 'parts', m: {shape: sh, d: D, whole: 1}, ans: `${n}/${d}`, ansSay: fcSay(n * D / d, D),
    html: `${k2Sub('Shade')}<div class="eq">${fcFr(n, d)}</div>${k2Sub(`of the ${sh}.`)}`, say: `Tap the parts to shade ${fcSay(n, d)} of the ${sh}.`});
}
