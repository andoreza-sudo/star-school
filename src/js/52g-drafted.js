/* ---------- TEACH-2b: the grade 1 and 2 math lessons whose words were drafted (part teach12, after teach; TEACH-PLAN-2 batch 2) ----------
   A drafted lesson is two halves. The CODE is here: the stop, the questions at each stage (build, picture, symbols) with every number
   chosen by code, the open task of Explore, the picture of Name it, the misconception codes the pet may show, and a warm-up on the
   idea the stop builds on. The WORDS are a draft in docs/drafts/<stop>.md (tools/author.js --draft): the idea, the lines of the six
   beats, the pet's reasons, tonight's question. Words are lines with {slots}; the code fills each slot from the moment's numbers
   (q.sl for a question, ctx for what the child built), so a draft cannot state a wrong number.
   The gate: a draft is only words until the owner has read it. tools/build.py writes 52e-words.js (LSW) from the drafts marked
   "status: reviewed ..." and nothing else; lsDraft() makes a lesson live (LESSONS, LS_IDS) only when its words are in LSW. So a
   reviewed draft goes live at the next build, and an unreviewed one cannot ship (tools/author.js --approve marks drafts reviewed).
   Every script also says what its words are for (brief) and which slots each beat may use (slots); tools/author.js gives both to the
   drafting model and checks every draft against them.
   The questions carry their numbers for the computed misconception codes (52b-know.js): q.ab [a, b, '+' | '-'], q.coins, q.hm. */
const LS_DRAFTED = {};
// a drafted script: its code now, its words when reviewed (LSW from 52e-words.js)
function lsDraft(id, D) {
  D.id = id;
  LS_DRAFTED[id] = D;
  if (typeof LSW != 'undefined' && LSW[id]) lsEnable(id, LSW[id]);
}
// make a drafted script a live lesson with words W (the draft's JSON); tools/test.js uses this to run unreviewed drafts in Node only
function lsEnable(id, W) {
  const D = LS_DRAFTED[id];
  if (!D || !W || !W.beats) return null;
  const B = W.beats, L = {sk: D.sk, lv: D.lv, t: D.t, test: D.test, bugs: D.bugs, petSt: D.petSt, w: W, idea: W.idea, home: W.home, q: D.q, warm: D.warm,
    exp: r => {
      // the draft's Explore lines: the last is the task as said with the model (q.say), any before it are said first
      const e = D.exp(r), t = [].concat(B.explore || []).map(x => lsFill(x, e.q.sl)).filter(Boolean);
      if (t.length) { e.q.say = t.pop(); e.lines = t; }
      return e;
    },
    name: (c, r) => { const n = D.name(c, r); return {html: n.html, lines: [].concat(B.name || []).map(x => lsFill(x, n.sl)).filter(Boolean)}; }};
  LESSONS[id] = L;
  if (!LS_IDS.includes(id)) LS_IDS.push(id);
  return L;
}
const lsSk = (id, D) => Object.assign(D, {sk: id.replace(/\d+$/, ''), lv: +id.match(/\d+$/)[0]});
// a question of a drafted lesson (grade 1 and 2: the normal sizes, not Kindergarten's)
const lsDq = (D, st, o) => lsQ(D.sk, D.lv, st, Object.assign({pk: false}, o));
const lsCap = t => `<div class="sub">${t}</div>`;
const lsSeqQ = (D, st, s, k, say) => lsDq(D, st, {kind: 'num', ans: s + 3 * k, html: `<div class="seq">${s}, ${s + k}, ${s + 2 * k}, ${lsQm}</div>${SLOT}`,
  say: say || `Count by ${k}s. ${s}, ${s + k}, ${s + 2 * k}, what comes next?`, sl: {k}, bug: {off1: [s + 2 * k + 1]},
  hint: {k: 'text', s: `Count on ${k} more from ${s + 2 * k}.`}});
// the warm-ups (Remember, when nothing older is due): make a number with blocks; make ten; skip count; set an o'clock time
const lsWarmB10 = (D, lo, hi) => r => { const n = lsRi(r, lo, hi); return lsDq(D, 0, {kind: 'make', model: 'b10', m: {places: n > 99 ? 3 : 2}, eq: 'value', ans: n,
  html: lsEq(n) + lsCap(`Make ${n} with blocks.`), say: `Make ${n} with blocks.`, sl: {n}, hint: {k: 'text', s: 'Rods are tens. Little cubes are ones.'}}); };
const lsWarmTen = D => r => { const f = lsRi(r, 2, 8); return lsDq(D, 0, {kind: 'make', model: 'frame', m: {total: 10, fixed: f}, eq: 'value', ans: 10 - f,
  html: lsCap(`There are ${f}. Fill it to make 10.`), say: `There are ${f}. Put in more to make 10.`, sl: {n: f}, bug: {given: [f]}, hint: lsFrameHint(f, 10, {}, 'Count the empty boxes.')}); };
const lsWarmSeq = (D, k) => r => lsSeqQ(D, 0, k * lsRi(r, 1, 5), k);
const lsWarmHour = D => r => { const h = lsRi(r, 1, 11); return lsDq(D, 0, {kind: 'make', model: 'hands', m: {one: false}, eq: 'exact', ans: h + ':00', ansSay: mmTimeSay(h, 0), hm: [h, 0],
  html: lsEq(h + ':00') + lsCap('Set the clock.'), say: `Show ${h} o'clock.`, sl: {hour: h, min: 0, time: mmTimeSay(h, 0)}, hint: {k: 'text', s: 'The long hand points to the 12.'}}); };

/* ---- adding with blocks: 2-Digit Adding (no ten to carry), Carry the 1, 3-Digit Adding, Add 3-Digit Numbers (with carrying) ----
   Stage 0 builds the sum on the regrouping blocks: with carrying, both numbers' blocks start in and the child trades ten ones for a
   ten (goal regroup); stage 1 the two numbers' blocks in two colours and a typed sum; stage 2 the sum written in columns. */
const LS_BRIEF_ADD = `Explore: the child sees two numbers and puts their blocks in (rods are tens, little cubes ones), any way. Lines: the task, said while they build (slots {a} {b}).
Name it: the blocks of the sum, traded so every place has nine or fewer; lines about what they built (slots {a} {b} {sum} {tens} {ones}: the tens and ones they put in, maybe more than nine ones) and the idea.
Together (slots {a} {b} {n}, where {n} is nine: "more than {n}" means ten or more): line 1 before a build (the sum with blocks; with carrying, both numbers' blocks are in and they trade ten ones for a ten), line 2 before a picture (the blocks; they type the sum), line 3 before the sum in columns.
Remember: a warm-up: make a number with rods and cubes (slot {n}).
Show: two sums in columns to type, no help, inside a job in the world (slots {a} {b}).`;
function lsAddStop(id, t, pl, carry, bugs) {
  const D = lsSk(id, {t, test: 2, bugs, brief: LS_BRIEF_ADD, slots: {remember: ['n'], explore: ['a', 'b'], name: ['a', 'b', 'sum', 'tens', 'ones'], together: ['a', 'b', 'n'], check: ['ans'], show: ['a', 'b']}});
  // two numbers of pl digits whose ones (and, for 3 digits, sometimes tens) make a ten when carry; never a ten when not
  const pick = r => {
    for (;;) {
      const lo = pl == 2 ? 11 : 101, hi = pl == 2 ? 88 : 898, a = lsRi(r, lo, hi), b = lsRi(r, lo, Math.min(hi, (pl == 2 ? 99 : 999) - a));
      if (b < lo) continue;
      const x = lsDigits(a, pl), y = lsDigits(b, pl), c = x.map((v, i) => v + y[i]), co = c[pl - 1] >= 10;
      if (carry ? co && a % 10 && b % 10 : c.every(v => v <= 9)) return [a, b];
    }
  };
  D.q = (st, r) => {
    const [a, b] = pick(r), c = a + b, sl = {a, b, n: 9, sum: c}, ab = [a, b, '+'], hint = {k: 'html', w: 'Add the ones first. Ten ones make a ten.',
      // fixRev (v184): the two numbers' blocks in two colours, as Together's picture, not the sum's blocks
      html: `<div class="pkhint">${lsBlocks(lsDigits(a, pl).map((v, i) => v + lsDigits(b, pl)[i]), {b: lsDigits(b, pl)})}<div>Add the ones first. Ten ones make a ten.</div></div>`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'b10r', m: {places: pl, target: c}, goal: 'regroup', eq: 'value', ans: c, ab, sl, hint,
      s0: carry ? lsDigits(a, pl).map((v, i) => v + lsDigits(b, pl)[i]) : null,
      html: lsEq(`${a} + ${b}`) + lsCap(carry ? 'All the blocks are in. Trade ten ones for a ten.' : 'Make the answer with blocks.'),
      say: carry ? `${a} plus ${b}. Trade ten ones for a ten, then check.` : `${a} plus ${b}. Make the answer with blocks.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, ab, sl, hint, html: `<div class="pkq">${lsBlocks(lsDigits(a, pl).map((v, i) => v + lsDigits(b, pl)[i]), {b: lsDigits(b, pl)})}</div>`
      + lsEq(`${a} + ${b} = ${SLOT}`), say: `${a} plus ${b} equals what?`});
    const m = mathQ(a, '+', b, c, 'c', true);
    return lsDq(D, 2, {kind: 'num', ans: c, ab, sl, hint, html: m.html, say: m.say});
  };
  D.warm = lsWarmB10(D, pl == 2 ? 11 : 101, pl == 2 ? 49 : 499);
  D.exp = r => {
    const [a, b] = pick(r), c = a + b;
    return {q: lsDq(D, 0, {kind: 'make', model: 'b10r', m: {places: pl, target: c}, goal: 'value', eq: 'value', ans: c, sl: {a, b},
      html: lsEq(`${a} + ${b}`) + lsCap(`Put in ${a}, then ${b}.`), say: `Put in blocks for ${a} and ${b}.`}), nudge: `Put in ${a} and ${b}, then check.`,
    react: v => { const s = Array.isArray(v) ? v : lsDigits(v, pl); return {ctx: {a, b, sum: c, tens: s[pl - 2], ones: s[pl - 1]}, lines: [`${a} and ${b} make ${c}.`]}; }};
  };
  D.name = c => ({html: `<div class="pkq">${lsBlocks(lsDigits(c.sum, pl))}</div>` + lsEq(`${c.a} + ${c.b} = ${c.sum}`), sl: c});
  return D;
}

/* ---- taking away with blocks: 2-Digit Take Away (no ten to break), Borrowing, Take Away 3-Digit; and Mental Math (+ or - ten, or a
   few ones) ---- Stage 0 starts with the first number's blocks and the child takes the second away (breaking a ten when the ones run
   out); stage 1 the blocks and a typed answer; stage 2 the columns. */
const LS_BRIEF_SUB = `Explore: the child has a number's blocks (rods are tens, cubes ones) and takes away as many as they like.
Lines: the task, said while they work (slots {a}: the blocks they start with).
Name it: the blocks left; lines on what they did (slots {a} {b} {diff}: they had {a}, took {b}, {diff} are left) and the idea.
Together (slots {a} {b}): line 1 before a build (take {b} away from {a}'s blocks; when there are not enough ones, they break a ten into ten ones), line 2 before a picture ({a}'s blocks; they type what is left), line 3 before the problem in columns.
Remember: a warm-up: make a number with rods and cubes (slot {n}).
Show: two take-aways in columns to type, no help, inside a job in the world (slots {a} {b}).`;
function lsSubStop(id, t, pl, borrow, bugs) {
  const D = lsSk(id, {t, test: 2, bugs, brief: LS_BRIEF_SUB, slots: {remember: ['n'], explore: ['a'], name: ['a', 'b', 'diff'], together: ['a', 'b'], check: ['ans'], show: ['a', 'b']}});
  const pick = r => {
    for (;;) {
      const lo = pl == 2 ? 21 : 201, a = lsRi(r, lo, pl == 2 ? 98 : 989), b = lsRi(r, pl == 2 ? 11 : 101, a - 1), x = lsDigits(a, pl), y = lsDigits(b, pl);
      const need = x[pl - 1] < y[pl - 1], tens = x.slice(0, pl - 1).every((v, i) => v >= y[i] + (i == pl - 2 && need ? 1 : 0));
      if (borrow ? need && tens && a - b >= 10 : !x.some((v, i) => v < y[i])) return [a, b];
    }
  };
  D.q = (st, r) => {
    const [a, b] = pick(r), c = a - b, sl = {a, b, diff: c}, ab = [a, b, '-'], hint = {k: 'html', w: 'Take away the ones first. Not enough? Break a ten.',
      html: `<div class="pkhint">${lsBlocks(lsDigits(a, pl))}<div>Take away the ones first. Not enough? Break a ten.</div></div>`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'b10r', m: {places: pl, target: c}, goal: 'value', eq: 'value', ans: c, ab, sl, hint, s0: lsDigits(a, pl),
      html: lsEq(`${a} − ${b}`) + lsCap(`Take away ${b}.`), say: `${a} take away ${b}. Take the blocks away.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, ab, sl, hint, html: `<div class="pkq">${lsBlocks(lsDigits(a, pl))}</div>` + lsEq(`${a} − ${b} = ${SLOT}`),
      say: `${a} minus ${b} equals what?`});
    const m = mathQ(a, '-', b, c, 'c', true);
    return lsDq(D, 2, {kind: 'num', ans: c, ab, sl, hint, html: m.html, say: m.say});
  };
  D.warm = lsWarmB10(D, pl == 2 ? 21 : 201, pl == 2 ? 89 : 899);
  D.exp = r => {
    const a = pick(r)[0];
    return {q: lsDq(D, 0, {kind: 'make', model: 'b10r', m: {places: pl}, s0: lsDigits(a, pl), goal: 'fewer', eq: 'value', ans: a - 1, sl: {a},
      html: lsEq(a) + lsCap('Take some away!'), say: `Here are ${a}. Take away as many as you like.`}), nudge: 'Tap minus to take blocks away.',
    react: v => { const d = lsVal({model: 'b10r', m: {places: pl}}, v); return {ctx: {a, b: a - d, diff: d}, lines: [`${a} take away ${a - d} leaves ${d}.`]}; }};
  };
  D.name = c => ({html: `<div class="pkq">${lsBlocks(lsDigits(c.diff, pl))}</div>` + lsEq(`${c.a} − ${c.b} = ${c.diff}`), sl: c});
  return D;
}
const LS_BRIEF_MENT = `Explore: the child has a number's blocks (rods are tens, cubes ones) and puts in or takes away one rod, any way (slot {a}).
Name it: lines on what changed (slots {a} {b} {sum}: they had {a}, the rod changed it to {sum}); adding or taking ten changes only the tens digit.
Together (slots {a} {b}, where {b} is the number added or taken away: ten, or a few ones; an item may add or take away): line 1 before a build (change {a}'s blocks), line 2 before a picture (the blocks; they type the answer), line 3 before the problem written out.
Remember: a warm-up: make a number with rods and cubes (slot {n}).
Show: two problems to type in their head, no help, inside a job in the world (slots {a} {b}).`;
function lsMentStop(id, t) {
  const D = lsSk(id, {t, test: 2, bugs: ['ten', 'op'], brief: LS_BRIEF_MENT, slots: {remember: ['n'], explore: ['a'], name: ['a', 'b', 'sum'], together: ['a', 'b'], check: ['ans'], show: ['a', 'b']}});
  const pick = r => {
    const add = r() < .5, b = r() < .6 ? 10 : lsRi(r, 2, 5);
    for (;;) {
      const a = lsRi(r, 21, 88);
      if (b == 10 || (add ? a % 10 + b <= 9 : a % 10 >= b)) return [a, b, add];
    }
  };
  D.q = (st, r) => {
    const [a, b, add] = pick(r), c = add ? a + b : a - b, o = add ? '+' : '−', sl = {a, b}, ab = [a, b, add ? '+' : '-'],
      bug = b == 10 ? {ten: [add ? a + 1 : a - 1]} : {}, hint = {k: 'text', s: b == 10 ? 'Ten is one rod: only the tens change.' : 'Only the ones change.'};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'b10r', m: {places: 2, target: c}, goal: 'value', eq: 'value', ans: c, ab, sl, bug, hint, s0: lsDigits(a, 2),
      html: lsEq(`${a} ${o} ${b}`) + lsCap(add ? `Put in ${b} more.` : `Take away ${b}.`), say: `${a} ${add ? 'plus' : 'minus'} ${b}. ${add ? 'Put in' : 'Take away'} the blocks.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, ab, sl, bug, hint, html: `<div class="pkq">${lsBlocks(lsDigits(a, 2))}</div>` + lsEq(`${a} ${o} ${b} = ${SLOT}`),
      say: `${a} ${add ? 'plus' : 'minus'} ${b} equals what?`});
    return lsDq(D, 2, {kind: 'num', ans: c, ab, sl, bug, hint, html: lsEq(`${a} ${o} ${b} = ${SLOT}`), say: `${a} ${add ? 'plus' : 'minus'} ${b} equals what?`});
  };
  D.warm = lsWarmB10(D, 21, 89);
  D.exp = r => {
    const a = lsRi(r, 31, 78);
    return {q: lsDq(D, 0, {kind: 'make', model: 'b10r', m: {places: 2}, s0: lsDigits(a, 2), goal: 'moved', eq: 'value', ans: a + 10, sl: {a},
      html: lsEq(a) + lsCap('Put in a rod, or take one away!'), say: `Here are ${a}. Put in a rod, or take one away.`}), nudge: 'Change the tens, then check.',
    react: v => { const d = lsVal({model: 'b10r', m: {places: 2}}, v); return {ctx: {a, b: Math.abs(d - a), sum: d}, lines: [`${a} is now ${d}.`]}; }};
  };
  D.name = c => ({html: `<div class="pkq">${lsBlocks(lsDigits(c.sum, 2))}</div>` + lsEq(`${c.a} ${c.sum >= c.a ? '+' : '−'} ${c.b} = ${c.sum}`), sl: c});
  return D;
}

/* ---- facts to 20 on the double ten frame: +9 & Doubles, All the Facts, Take Away to 18, Missing to 18, Add Three ---- */
const LS_BRIEF_FACT = `Explore: a double ten frame (two rows of ten). The child puts in counters in two colors, any way (no slots in the task).
Name it: the frame they made; lines on it (slots {a} {b} {sum}: {a} of one color and {b} of the other make {sum}) and the idea.
Together (SLOTS): line 1 before a build on the frame, line 2 before a picture of the frame (they type the answer), line 3 before the fact in symbols only.
Remember: a warm-up: fill a ten frame to make ten (slot {n}: the counters already in).
Show: two facts to type, no help, inside a job in the world (SLOTS).`;
function lsFactStop(id, t, kind, bugs) {
  const tg = kind == 'miss' ? ['a', 't'] : kind == 'add3' ? ['a', 'b', 'k'] : ['a', 'b'],
    say = {miss: '{a} the part already in, {t} the whole to make; never the missing part', add3: '{a} {b} {k}: the three numbers to add', sub: '{a} the start, {b} the number taken away'}[kind] || '{a} {b}: the two numbers';
  const D = lsSk(id, {t, test: 2, bugs, brief: LS_BRIEF_FACT.replace(/SLOTS/g, 'slots ' + say), slots: {remember: ['n'], explore: [], name: ['a', 'b', 'sum'], together: tg, check: ['ans'], show: tg}});
  D.q = (st, r) => {
    let a, b, c, eq, say, s0, built, ab, bug = {}, h, k3;
    if (kind == 'miss') { const t = lsRi(r, 11, 18); a = lsRi(r, t - 9, 9); return lsMiss(D, st, a, t - a, t, {given: [a, t], op: [a + t]}, `Count on from ${a} to ${t}.`); }
    if (kind == 'sub') { a = lsRi(r, 11, 18); b = lsRi(r, a - 9, 9); c = a - b; eq = `${a} − ${b}`; say = `${a} minus ${b}`; s0 = [a]; ab = [a, b, '-']; h = 'Take away to ten first, then the rest.'; }
    else if (kind == 'add3') { a = lsRi(r, 2, 8); b = lsRi(r, 2, 9); const d = lsRi(r, 1, Math.min(9, 20 - a - b)); c = a + b + d; k3 = d;
      eq = `${a} + ${b} + ${d}`; say = `${a} plus ${b} plus ${d}`; bug = {given: [a + b, b + d, a + d]}; h = 'Look for two that make ten. Add the last one on.'; }
    else {
      if (kind == 'all') { a = lsRi(r, 3, 9); b = lsRi(r, 11 - a, 9); h = 'Make a ten, then count on.'; }
      else if (r() < .5) { a = 9; b = lsRi(r, 2, 9); h = 'Nine is one less than ten. Make ten, then count on.'; }
      else { a = b = lsRi(r, 3, 9); h = 'A double: the same number twice.'; }
      c = a + b; eq = `${a} + ${b}`; say = `${a} plus ${b}`; ab = [a, b, '+'];
    }
    built = c;
    const sl = k3 ? {a, b, k: k3} : {a, b}, pic = kind == 'sub' ? VIZ.tenFrame(a, 20, {fade: b}) : VIZ.tenFrame(c, 20, {b: kind == 'add3' ? 0 : b}),
      // TEACH-UX (owner: "two colors yes"): the add facts' hint (and so the Remember model and Together's hint) draws the two
      // addends in two colours, a then b, as the picture stage does, so the child sees "make a ten"; Add Three keeps one colour
      // (three addends, two colours would pair the wrong two)
      // fixRev (v184): the hint draws the question's numbers, never the answer alone: take away the start with b faded (as its
      // Practice hint does); Add Three has no picture of its three numbers on one frame, so its result picture is never a model
      hint = kind == 'sub' ? lsFrameHint(a, 20, {fade: b}, h) : Object.assign(lsFrameHint(c, 20, kind == 'add3' ? {} : {b}, h), kind == 'add3' ? {mdl: false} : {});
    if (st == 0) return lsFrame(D.sk, D.lv, 0, built, 20, {s0, ab, sl, bug, hint, pk: false, html: lsEq(eq) + lsCap(kind == 'sub' ? `Take away ${b}.` : 'Make the answer on the frame.'),
      say: `${say}. ${kind == 'sub' ? `Take away ${b}.` : 'Make the answer on the frame.'}`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, ab, sl, bug, hint, html: `<div class="pkq">${pic}</div>` + lsEq(`${eq} = ${SLOT}`), say: `${say} equals what?`});
    return lsDq(D, 2, {kind: 'num', ans: c, ab, sl, bug, hint, html: lsEq(`${eq} = ${SLOT}`), say: `${say} equals what?`});
  };
  D.warm = lsWarmTen(D);
  D.exp = () => ({q: lsFrame2(D.sk, D.lv, 20, 'both', {pk: false, sl: {}, html: lsCap('Use both colors!'), say: 'Put in some blue and some orange.'}), nudge: 'Use both colors.',
    react: ([a, b]) => ({ctx: {a, b, sum: a + b}, lines: [`${a} and ${b} make ${a + b}.`]})});
  D.name = c => ({html: `<div class="pkq">${VIZ.tenFrame(c.sum, 20, {b: c.b})}</div>` + lsEq(`${c.a} + ${c.b} = ${c.sum}`), sl: c});
  return D;
}
// Missing to 18: a counters in, fill up to s (the missing part is what was put in)
function lsMiss(D, st, a, b, s, bug, h) {
  // fixRev (v184): the hint shows the part already in (the empty cells to count on), not the missing part in its own colour
  const sl = {a, t: s}, hint = lsFrameHint(a, 20, {}, h);
  if (st == 0) return lsFrame(D.sk, D.lv, 0, b, 20, {fixed: a, sl, bug, hint, pk: false, html: lsEq(`${a} + ${lsQm} = ${s}`) + lsCap(`Put in more to make ${s}.`),
    say: `${a} plus what makes ${s}? Put in more to make ${s}.`});
  if (st == 1) return lsDq(D, 1, {kind: 'num', ans: b, sl, bug, hint, html: `<div class="pkq">${VIZ.tenFrame(a, 20)}</div>` + lsEq(`${a} + ${SLOT} = ${s}`), say: `${a} plus what equals ${s}?`});
  return lsDq(D, 2, {kind: 'num', ans: b, sl, bug, hint, html: lsEq(`${a} + ${SLOT} = ${s}`), say: `${a} plus what equals ${s}?`});
}

/* ---- place value: Tens & Hundreds, Place Value to 999, Expanded Form; Compare to 100, Compare to 999 ---- */
const LS_BRIEF_PV = `Explore: base-ten blocks with hundreds (flats), tens (rods) and ones (cubes); the child makes any number they like (no slots in the task).
Name it: the blocks they made; lines on it (slots {n} the number, {top} the hundreds digit, {tens} the tens digit, {ones} the ones digit) and the idea.
Together (SLOTS): line 1 before a build with blocks, line 2 before a picture of blocks (they type), line 3 before symbols only.
Remember: a warm-up: make a number with blocks (slot {n}).
Show: two items to type, no help, inside a job in the world (SHOW).`;
function lsPvStop(id, t, kind, bugs) {
  // the slots that never give the answer away: the numbers shown on each stage
  const tg = kind == 'tens' || kind == 'cmp' ? ['a', 'b'] : kind == 'pv' ? [['n'], [], ['n']] : [['n'], [], []], sh = kind == 'tens' || kind == 'cmp' ? ['a', 'b'] : kind == 'pv' ? ['n'] : [];
  const what = {tens: 'line 1 adds {a} and {b} (whole tens, or whole hundreds) with blocks, line 2 shows their blocks, line 3 the sum; slots {a} {b}',
    cmp: 'line 1 makes a number bigger than one shown, line 2 compares {a} and {b} on blocks with a sign, line 3 compares them in symbols; slots {a} {b}',
    pv: 'line 1 makes {n} with blocks, line 2 counts the blocks in a picture (no slots: the number is the answer), line 3 asks what one digit of {n} is worth',
    exp: 'line 1 builds a number from its parts (hundreds + tens + ones) with blocks ({n}), line 2 counts the blocks in a picture (no slots), line 3 adds the parts in symbols (no slots)'}[kind];
  const D = lsSk(id, {t, test: kind == 'cmp' ? 3 : 2, bugs, brief: LS_BRIEF_PV.replace('SLOTS', what).replace('SHOW', sh.length ? 'slots ' + sh.map(x => '{' + x + '}').join(' ') : 'no slots'),
    slots: {remember: ['n'], explore: [], name: ['n', 'top', 'tens', 'ones'], together: tg, check: ['ans'], show: sh}});
  const pl = id == 'cmp2' ? 2 : 3;
  const b10 = (st, n, o) => lsDq(D, st, Object.assign({kind: 'make', model: 'b10', m: {places: pl}, eq: 'value', ans: n}, o));
  D.q = (st, r) => {
    if (kind == 'tens') { // Tens & Hundreds: add whole tens, or whole hundreds
      const u = r() < .5 ? 10 : 100, x = lsRi(r, 1, 8), y = lsRi(r, 1, 9 - x), a = x * u, b = y * u, c = a + b, sl = {n: c, a, b}, ab = [a, b, '+'], bug = {ten: [x + y]};
      const hint = {k: 'text', s: `${qN(x, u == 10 ? 'ten' : 'hundred')} and ${y} more ${qW(y, u == 10 ? 'ten' : 'hundred')}.`}; // WORDS-MATH W23: "1 hundred and 3 more hundreds."
      if (st == 0) return b10(0, c, {ab, sl, bug, hint, html: lsEq(`${a} + ${b}`) + lsCap('Make the answer with blocks.'), say: `${a} plus ${b}. Make the answer with blocks.`});
      if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, ab, sl, bug, hint, html: `<div class="pkq">${VIZ.base10(a)} ${VIZ.base10(b)}</div>` + lsEq(`${a} + ${b} = ${SLOT}`), say: `${a} plus ${b} equals what?`});
      return lsDq(D, 2, {kind: 'num', ans: c, ab, sl, bug, hint, html: lsEq(`${a} + ${b} = ${SLOT}`), say: `${a} plus ${b} equals what?`});
    }
    if (kind == 'cmp') {
      const lo = pl == 2 ? 10 : 100, hi = pl == 2 ? 99 : 999;
      let a = lsRi(r, lo, hi), b = lsRi(r, lo, hi);
      if (r() < .4) b = +String(a).split('').reverse().join('') || b; // the same digits the other way round: the place matters
      if (b < lo || a == b) b = a < hi ? a + lsRi(r, 1, 9) : a - 1;
      if (b > hi) b = a - 1;
      const sl = {n: Math.max(a, b), a, b}, ans = a > b ? '>' : '<', hint = {k: 'text', s: 'Look at the biggest place first.'};
      if (st == 3) return lsDq(D, 2, {kind: 'num', ans: Math.max(a, b), sl, hint, bug: {small: [Math.min(a, b)]}, html: lsEq(`${a} or ${b}?`) + lsCap('Type the bigger number.') + SLOT,
        say: `Which is bigger, ${a} or ${b}? Type the bigger number.`});
      if (st == 0) { const m = lsRi(r, lo + 5, hi - 20); return b10(0, m + 1, {goal: 'gt', target: m, sl: {n: m, a: m, b: m}, bug: {given: [m]}, hint: {k: 'text', s: 'Put in one more cube, or more.'},
        html: lsEq(m) + lsCap(`Make a number bigger than ${m}.`), say: `Make any number bigger than ${m}.`}); }
      const html = (st == 1 ? `<div class="pkq">${VIZ.base10(a)} ${VIZ.base10(b)}</div>` : '') + lsEq(`${a} ${SLOT} ${b}`) + lsCap('Bigger, smaller, or the same?');
      return lsPick(D.sk, D.lv, st, ans, html, `Is ${a} greater than, less than, or equal to ${b}?`, [['<'], ['='], ['>']], {sl, hint, pk: false, bug: {small: [ans == '>' ? '<' : '>']},
        after: `${a} is ${ans == '>' ? 'greater than' : 'less than'} ${b}`});
    }
    // AUDIT-MATH M2: "what is the 2 worth?" needs its digit once in the number (not 922): the symbols item of Place Value to 999 draws
    // again until the hundreds digit, and the tens digit when it is not 0, each appear once (every other draw is as before)
    const one = x => { const ds = lsDigits(x, 3); return ds.filter(y => y == ds[0]).length == 1 && (!ds[1] || ds.filter(y => y == ds[1]).length == 1); };
    let n = lsRi(r, 102, 989);
    if (st == 2 && kind != 'exp') while (!one(n)) n = lsRi(r, 102, 989);
    const [h, te, o] = lsDigits(n, 3), sl = {n, a: h * 100, b: te * 10};
    const hint = {k: 'html', html: `<div class="pkhint">${VIZ.base10(n)}<div>${qN(h, 'hundred')}, ${qN(te, 'ten')} and ${qN(o, 'one')}.</div></div>`, w: 'Flats are hundreds, rods are tens, cubes are ones.'};
    if (st == 0) return b10(0, n, {sl, hint, html: kind == 'exp' ? lsEq(`${h * 100} + ${te * 10} + ${o}`) + lsCap('Make it with blocks.') : lsEq(n) + lsCap(`Make ${n} with blocks.`),
      say: kind == 'exp' ? `${h * 100} plus ${te * 10} plus ${o}. Make it with blocks.` : `Make ${n} with blocks.`, bug: {swap: [h * 100 + o * 10 + te].filter(x => x != n)}});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: n, sl, hint, html: `<div class="pkq">${VIZ.base10(n)}</div>${SLOT}`, say: 'How many in all? Count the hundreds, the tens, then the ones.'});
    if (kind == 'exp') return lsDq(D, 2, {kind: 'num', ans: n, sl, hint, html: lsEq(`${h * 100} + ${te * 10} + ${o} = ${SLOT}`), say: `${h * 100} plus ${te * 10} plus ${o} equals what?`,
      bug: {given: [h * 100, h * 100 + te * 10], swap: [h * 100 + o * 10 + te].filter(x => x != n)}});
    // Place Value to 999: what a digit is worth
    const k = te && r() < .6 ? 1 : 0, d = [h, te][k], v = d * [100, 10][k];
    return lsDq(D, 2, {kind: 'num', ans: v, sl: {n, a: d, b: v}, hint, html: lsEq(n) + lsCap(`What is the ${d} worth?`) + SLOT, say: `In ${n}, what is the ${d} worth?`,
      bug: {given: [d], off1: []}});
  };
  D.warm = lsWarmB10(D, 11, 99);
  D.exp = () => ({q: b10(0, 999, {goal: 'any', sl: {}, html: lsCap('Make any number with blocks!'), say: 'Make any number you like with flats, rods and cubes!', demo: '234'}),
    react: v => { const [h, te, o] = lsDigits(+v, 3); return {ctx: {n: +v, top: h, tens: te, ones: o}, lines: [`You made ${+v}.`]}; }});
  D.name = c => { const n = c.n >= 100 ? c.n : 234, [h, te, o] = lsDigits(n, 3); return {html: `<div class="pkq">${VIZ.base10(n)}</div>` + lsEq(`${h * 100} + ${te * 10} + ${o} = ${n}`), sl: {n, top: h, tens: te, ones: o}}; };
  return D;
}

/* ---- clocks: O'Clock, Half Past, Quarter Hours, Clocks to 5 Minutes ---- (the clock with named hands, 52f-bench.js) */
const LS_BRIEF_TIME = `Explore: a clock with two hands the child moves (the short hand is the hour, the long hand the minutes); they set any time they like (no slots in the task).
Name it: the clock they set; lines on it (slots {time}: the time they set as it is said, such as "half past 4" or "4 o'clock"; {hour} the hour) and the idea.
Together: the items' times change (on the hour, or at the stop's minutes), so a line says {time} rather than "half past": line 1 before setting {time} on the clock, line 2 before reading a clock picture and picking its time (no slots: the time is the answer), line 3 before saying which number the long hand points to at {time}.
Remember: a warm-up (slot {n}).
Show: two times to set on the clock, no help, inside a job in the world (slot {time}).`;
function lsTimeStop(id, t, mins, warm) {
  const D = lsSk(id, {t, test: 0, petSt: 0, bugs: ['hands'], brief: LS_BRIEF_TIME.replace('(slot {n})', warm == 'hour' ? "(set an o'clock time: slot {time})" : '(what comes after a number: slot {n})'), slots: {remember: warm == 'hour' ? ['time'] : ['n'], explore: [], name: ['time', 'hour'], together: [['time'], [], ['time']], check: ['ans'], show: ['time']}});
  D.q = (st, r) => {
    const h = lsRi(r, 1, 12), m = mins[Math.floor(r() * mins.length)], mm = String(m).padStart(2, '0'), ans = `${h}:${mm}`, hm = [h, m], sl = {hour: h, min: m, time: mmTimeSay(h, m)};
    const hint = {k: 'html', html: `<div class="pkhint">${VIZ.clock(h, m)}<div>${m ? `The long hand shows ${m} minutes.` : 'The long hand points to the 12.'} The short hand shows the hour.</div></div>`,
      w: 'The short hand shows the hour. The long hand shows the minutes.'};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'hands', m: {one: false}, eq: 'exact', ans, ansSay: mmTimeSay(h, m), hm, sl, hint, html: lsEq(ans) + lsCap('Set the clock.'), say: `Show ${mmTimeSay(h, m)} on the clock.`});
    if (st == 1) {
      const ch = [...new Set([ans, BUGS.hands.f({hm})[0], `${h % 12 + 1}:${mm}`, `${(h + 10) % 12 + 1}:${mm}`].filter(Boolean))].slice(0, 3);
      return lsPick(D.sk, D.lv, 1, ans, `<div class="pkq">${VIZ.clock(h, m)}</div>` + lsCap('What time is it?') + SLOT, 'What time does the clock show?',
        ch.sort().map(x => [x]), {hm, sl, hint, pk: false, after: `It is ${mmTimeSay(h, m)}.`});
    }
    return lsDq(D, 2, {kind: 'num', ans: m ? m / 5 : 12, sl, hint, html: lsEq(ans) + lsCap('The long hand points to which number?') + SLOT,
      say: `At ${mmTimeSay(h, m)}, which number does the long hand point to?`, bug: {hands: [h].filter(x => x != (m ? m / 5 : 12)), off1: []}});
  };
  D.warm = warm == 'hour' ? lsWarmHour(D) : r => { const n = lsRi(r, 1, 10); return lsDq(D, 0, {kind: 'num', ans: n + 1, html: `<div class="seq">${n - 1 > 0 ? n - 1 + ', ' : ''}${n}, ${lsQm}</div>${SLOT}`,
    say: `What comes after ${n}?`, sl: {n}, hint: {k: 'text', s: `Count on from ${n}.`}, bug: {given: [n]}}); };
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'hands', m: {one: false}, eq: 'exact', ans: '3:00', goal: 'moved', sl: {}, demo: '3:00',
    html: lsCap('Set any time you like!'), say: 'Move the hands to any time you like.'}), nudge: 'Move a hand, then check.',
  react: v => { const [h, m] = String(v).split(':').map(Number); return {ctx: {hour: h, min: m, time: mmTimeSay(h, m)}, lines: [`You made ${mmTimeSay(h, m)}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${VIZ.clock(c.hour, c.min)}</div>` + lsEq(`${c.hour}:${String(c.min).padStart(2, '0')}`), sl: c});
  return D;
}

/* ---- coins: Pennies & Nickels, Dimes Too, Quarters, Dollars & Coins; Making Change ---- (the coin purse) */
const LS_BRIEF_COIN = `Explore: a coin purse and a tray of coins; the child puts in any coins they like (no slots in the task).
Name it: the coins they chose; lines on them (slots {value}: what they are worth in cents, {n}: how many coins) and the idea: add what each coin is worth, not how many coins.
Together: line 1 before putting coins worth {value} cents in the purse, line 2 before a picture of {n} coins (they type how many cents; never say the cents), line 3 before adding {n} coins' values written out (never say the total).
Remember: a warm-up: skip counting (slot {k}: the step, such as 5 for fives).
Show: two coin pictures to total, no help, inside a job in the world (slot {n}: how many coins; never the total).`;
const LS_BRIEF_CHANGE = `Explore: a coin purse and a tray of coins; the child puts in any coins they like (no slots in the task).
Name it: lines on the coins they chose (slots {value}: what they are worth in cents, {n}: how many coins); change is what is left of a dollar after the price.
Together (slot {a}: the price in cents; never the change, which is the answer; a dollar is a hundred cents): line 1 before putting the change in the purse, line 2 before typing the change for a price, line 3 before the take-away written out.
Remember: a warm-up: skip counting (slot {k}: the step, such as 5 for fives).
Show: two prices to find the change for, no help, inside a job in the world (slot {a}).`;
// Explore on the purse: any coins (the state, so the count of coins is the child's own)
const lsCoinExp = (D, T) => ({q: lsDq(D, 0, {kind: 'make', model: 'coins', m: {types: T}, eq: 'value', ans: T[0], goal: 'moved', raw: 1, sl: {},
  html: lsCap('Put in any coins you like!'), say: 'Put any coins you like in the purse.'}), nudge: 'Tap a coin to put it in the purse.',
react: v => { const s = Array.isArray(v) ? v : mmGreedy(T, +v), x = K2MM.coins.val({m: {types: T}}, s); return {ctx: {value: x, n: mmSum(s)}, lines: [`Your coins make ${qN(x, 'cent')}.`]}; }});
function lsCoinStop(id, t, types, max) {
  const D = lsSk(id, {t, test: 1, petSt: 1, bugs: ['count'], brief: LS_BRIEF_COIN, slots: {remember: ['k'], explore: [], name: ['value', 'n'], together: [['value'], ['n'], ['n']], check: ['ans'], show: ['n']}});
  const coinsOf = r => { for (;;) { const cs = Array.from({length: lsRi(r, 3, 6)}, () => types[Math.floor(r() * types.length)]).sort((a, b) => b - a), v = cs.reduce((a, b) => a + b, 0);
    if (v <= max && v > cs.length && new Set(cs).size > 1) return [cs, v]; } };
  const T25 = types.filter(c => c <= 25);
  D.q = (st, r) => {
    let [cs, v] = coinsOf(r);
    while (st == 0 && mmSum(mmGreedy(T25, v)) > 12) [cs, v] = coinsOf(r);
    const sl = {value: v, n: cs.length}, hint = {k: 'text', s: 'Start with the coin worth the most. Count on by what each coin is worth.'};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'coins', m: {types: T25}, eq: 'value', ans: v, sl, hint, cents: 1,
      html: lsEq(v + '¢') + lsCap(`Put ${v}¢ in the purse.`), say: `Make ${v} cents. Tap the coins to put them in the purse.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: v, coins: cs, sl, hint, cents: 1, html: `<div class="pkq">${VIZ.coinSVG(cs)}</div>` + lsCap('How many cents?') + SLOT, say: 'How many cents are these coins worth?'});
    return lsDq(D, 2, {kind: 'num', ans: v, coins: cs, sl, hint, cents: 1, html: lsEq(cs.map(c => c >= 100 ? '$1' : c + '¢').join(' + ') + ' = ' + SLOT + '¢'),
      say: 'Add what the coins are worth. How many cents?'});
  };
  const k = types.includes(25) ? 25 : types.includes(10) ? 10 : 5;
  D.warm = lsWarmSeq(D, k);
  D.exp = () => lsCoinExp(D, T25);
  D.name = c => { const ty = T25, cs = []; mmGreedy(ty, c.value).forEach((n, i) => { for (let j = 0; j < n; j++) cs.push(ty[i]); });
    return {html: `<div class="pkq">${VIZ.coinSVG(cs)}</div>` + lsEq(cs.map(x => x + '¢').join(' + ') + ' = ' + c.value + '¢'), sl: c}; };
  return D;
}
function lsChangeStop(id, t) {
  const D = lsSk(id, {t, test: 1, petSt: 1, bugs: ['col', 'keep'], brief: LS_BRIEF_CHANGE, slots: {remember: ['k'], explore: [], name: ['value', 'n'], together: ['a'], check: ['ans'], show: ['a']}});
  const T = [25, 10, 5, 1];
  D.q = (st, r) => {
    let p;
    do p = 5 * lsRi(r, 3, 19); while (p % 10 == 0 && r() < .7);
    const c = 100 - p, sl = {a: p, diff: c}, ab = [100, p, '-'], hint = {k: 'text', s: `Count up from ${p} to 100.`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'coins', m: {types: T}, eq: 'value', ans: c, ab, sl, hint, cents: 1,
      html: lsEq(`100¢ − ${p}¢`) + lsCap('Put the change in the purse.'), say: `It costs ${p} cents. Put the change from a dollar in.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, ab, sl, hint, cents: 1, html: `<div class="pkq">${VIZ.coinSVG(100)}</div>` + lsCap(`It costs ${p}¢. Change?`) + SLOT + '¢',
      say: `It costs ${p} cents. How much change from a dollar?`});
    return lsDq(D, 2, {kind: 'num', ans: c, ab, sl, hint, cents: 1, html: lsEq(`100 − ${p} = ${SLOT}`), say: `100 minus ${p} equals what?`});
  };
  D.warm = r => { const s = 5 * lsRi(r, 3, 15); return lsSeqQ(D, 0, s, 5); };
  D.exp = () => lsCoinExp(D, T);
  D.name = c => { const cs = []; mmGreedy(T, c.value).forEach((n, i) => { for (let j = 0; j < n; j++) cs.push(T[i]); });
    return {html: `<div class="pkq">${VIZ.coinSVG(cs)}</div>` + lsEq(`${c.value}¢ + ${100 - c.value}¢ = 100¢`), sl: c}; };
  return D;
}

/* ---- equal groups: Count by 2s & 5s, Equal Groups, Groups to 5×5, Rows & Columns ---- (the groups model, 52f-bench.js; the array) */
const LS_BRIEF_GRP = `Explore: equal groups (circles with dots in them, or rows of dots); the child makes any equal groups they like (no slots in the task).
Name it: the groups they made; lines on them (slots {a}: how many groups or rows, {b}: how many in each, {sum}: how many in all) and the idea.
Together (slots {a} {b}; never how many in all, which is the answer): line 1 before making {a} groups (or rows) of {b}, line 2 before a picture of the groups (they type how many in all), line 3 before symbols only.
Remember: a warm-up: skip counting (slot {k}: the step).
Show: two pictures to total, no help, inside a job in the world (slots {a} {b}).`;
function lsGrpStop(id, t, kind) {
  const D = lsSk(id, {t, test: 1, petSt: 1, bugs: ['given', 'off1'], brief: LS_BRIEF_GRP, slots: {remember: ['k'], explore: [], name: ['a', 'b', 'sum'], together: ['a', 'b'], check: ['ans'], show: ['a', 'b']}});
  const arr = kind == 'arr';
  D.q = (st, r) => {
    const a = lsRi(r, 2, kind == 'cnt' ? 6 : 5), b = kind == 'cnt' ? (r() < .5 ? 2 : 5) : lsRi(r, 2, kind == 'mult1' ? 4 : 5), c = a * b, sl = {a, b, sum: c};
    const pic = arr ? VIZ.array(a, b) : lsGroupsSvg(a, b), bug = {given: [a, b]}, hint = {k: 'html', html: `<div class="pkhint">${pic}<div>Count by ${b}s: ${Array.from({length: a}, (_, i) => b * (i + 1)).join(', ')}.</div></div>`, w: `Count by ${b}s.`};
    if (st == 0) return arr ? lsDq(D, 0, {kind: 'make', model: 'array', m: {r: a, c: b}, eq: 'exact', ans: c, sl, bug, hint, html: lsCap(`Make ${a} rows of ${b}.`), say: `Make an array with ${a} rows of ${b}.`})
      : lsDq(D, 0, {kind: 'make', model: 'groups', m: {g: a, n: b, target: c}, goal: 'groups', eq: 'value', ans: c, sl, bug, hint, html: lsCap(`Make ${a} groups of ${b}.`), say: `Make ${a} groups with ${b} in each group.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: c, sl, bug, hint, html: `<div class="pkq">${pic}</div>` + lsCap('How many in all?') + SLOT, say: `${a} ${arr ? 'rows' : 'groups'} of ${b}. How many in all?`});
    if (kind == 'cnt') return Object.assign(lsSeqQ(D, 2, b, b), {sl: {a: 4, b, k: b}});
    const e = kind == 'mult1' ? Array(a).fill(b).join(' + ') : `${a} × ${b}`;
    return lsDq(D, 2, {kind: 'num', ans: c, sl, bug, hint, html: lsEq(`${e} = ${SLOT}`), say: kind == 'mult1' ? `${Array(a).fill(b).join(' plus ')} equals what?` : `${a} times ${b} equals what?`});
  };
  D.warm = kind == 'cnt' ? lsWarmSeq(D, 10) : lsWarmSeq(D, kind == 'mult1' ? 2 : 5);
  D.exp = () => ({q: arr ? lsDq(D, 0, {kind: 'make', model: 'array', m: {r: 2, c: 3}, eq: 'exact', ans: 6, goal: 'any', sl: {}, demo: '3×4', html: lsCap('Make any array you like!'), say: 'Make any rows of dots you like.'})
    : lsDq(D, 0, {kind: 'make', model: 'groups', m: {g: 2, n: 2, target: 4}, goal: 'eqgrp', eq: 'value', ans: 4, sl: {}, html: lsCap('Make equal groups!'), say: 'Make some equal groups, any way you like.'}),
  nudge: arr ? 'Set the rows, then check.' : 'Make two or more groups, two or more in each.',
  react: v => { const [a, b] = Array.isArray(v) ? v : /×/.test(v) ? String(v).split('×').map(Number) : [2, 3]; return {ctx: {a, b, sum: a * b}, lines: [`${qN(a, arr ? 'row' : 'group')} of ${b} ${a == 1 ? 'makes' : 'make'} ${a * b}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${arr ? VIZ.array(c.a, c.b) : lsGroupsSvg(c.a, c.b)}</div>` + lsEq(`${Array(c.a).fill(c.b).join(' + ')} = ${c.sum}`), sl: c});
  return D;
}

// ---- the lessons, in map order (Candy Canyon, Clock Tower, Ocean Reef: 1st grade; Space Station, Treasure Bay: 2nd grade) ----
lsDraft('add2', lsFactStop('add2', '+9 & Doubles', 'nine', ['off1', 'given']));
lsDraft('big1', lsPvStop('big1', 'Tens & Hundreds', 'tens', ['ten', 'given']));
lsDraft('cnt2', lsGrpStop('cnt2', 'Count by 2s & 5s', 'cnt'));
lsDraft('miss2', lsFactStop('miss2', 'Missing to 18', 'miss', ['op', 'given']));
lsDraft('sub2', lsFactStop('sub2', 'Take Away to 18', 'sub', ['op', 'off1']));
lsDraft('add5', lsFactStop('add5', 'Add Three', 'add3', ['given', 'off1']));
lsDraft('add6', lsMentStop('add6', 'Mental Math'));
lsDraft('add3', lsFactStop('add3', 'All the Facts', 'all', ['off1', 'op']));
lsDraft('time1', lsTimeStop('time1', "O'Clock", [0], 'count'));
lsDraft('big2', lsAddStop('big2', '2-Digit Adding', 2, false, ['op', 'swap']));
lsDraft('coins1', lsCoinStop('coins1', 'Pennies & Nickels', [5, 1], 40));
lsDraft('cmp2', lsPvStop('cmp2', 'Compare to 100', 'cmp', ['small']));
lsDraft('time2', lsTimeStop('time2', 'Half Past', [0, 30], 'hour'));
lsDraft('sub3', lsSubStop('sub3', '2-Digit Take Away', 2, false, ['op', 'given']));
lsDraft('big3', lsAddStop('big3', 'Carry the 1', 2, true, ['nocarry', 'cat']));
lsDraft('mult1', lsGrpStop('mult1', 'Equal Groups', 'mult1'));
lsDraft('coins2', lsCoinStop('coins2', 'Dimes Too', [10, 5, 1], 80));
lsDraft('sub4', lsSubStop('sub4', 'Borrowing', 2, true, ['col', 'keep']));
lsDraft('time3', lsTimeStop('time3', 'Quarter Hours', [0, 15, 30, 45], 'hour'));
lsDraft('big4', lsAddStop('big4', '3-Digit Adding', 3, false, ['op', 'given']));
lsDraft('mult2', lsGrpStop('mult2', 'Groups to 5×5', 'mult2'));
lsDraft('cmp3', lsPvStop('cmp3', 'Compare to 999', 'cmp', ['small']));
lsDraft('coins3', lsCoinStop('coins3', 'Quarters', [25, 10, 5, 1], 99));
lsDraft('pv2', lsPvStop('pv2', 'Place Value to 999', 'pv', ['given', 'swap']));
lsDraft('big5', lsAddStop('big5', 'Add 3-Digit Numbers', 3, true, ['nocarry', 'cat']));
lsDraft('pv3', lsPvStop('pv3', 'Expanded Form', 'exp', ['given', 'swap']));
lsDraft('sub5', lsSubStop('sub5', 'Take Away 3-Digit', 3, true, ['col', 'keep']));
lsDraft('time4', lsTimeStop('time4', 'Clocks to 5 Minutes', [5, 10, 20, 25, 35, 40, 50, 55], 'hour'));
lsDraft('coins4', lsCoinStop('coins4', 'Dollars & Coins', [100, 25, 10, 5, 1], 199));
lsDraft('arr1', lsGrpStop('arr1', 'Rows & Columns', 'arr'));
lsDraft('coins5', lsChangeStop('coins5', 'Making Change'));
