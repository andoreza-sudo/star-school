/* ---------- TEACH-3: the grade 3 to 5 lessons' workbench, Check me and words (part teach35, after teach and teach12; TEACH-PLAN-2 batch 3) ----------
   The grade 3-5 lessons (52j-lessons35.js) are drafted lessons like the grade 1-2 ones (52g-drafted.js): their CODE chooses every number,
   question, model and misconception code; their WORDS are drafts in docs/drafts/<stop>.md that the owner reads. tools/build.py writes the
   reviewed words into 52h-words.js (LSW3). Until a draft is reviewed its lesson runs on the FALLBACK words written by hand here and in
   52j (the idea, tonight's question, a Name it line with the child's own numbers, the pet's reasons: each code's own line), so every
   lesson works and can be tested; once the owner approves a draft, its words replace the fallback at the next build (lsEnable3).
   What is new for the older kids (owner decision 3: less hand-holding, more challenge, "check my work", "give me a hard one"):
     Check me   the pet's own announced turn, in three forms (lsChk35):
                - its written working (the steps of the find-the-mistake questions, k2Fix* in 49b-kinds2.js), right about one time in four;
                  when it slipped, the child taps the step with the slip, sees the step put right, and builds the reason;
                - "your problem": the child sets the numbers with steppers (pickn), the pet works them out in steps, the child judges;
                - for a lesson with no steps: the pet's answer on the model or the question, as in batches 1 and 2.
                The pet is never wrong anywhere else (owner rule), and its mistake is always put right on screen.
     Reasons    built from word tiles in a sentence frame (the order kind): the end of the code's reason (LS_WHY), with two extra
                tiles, so it cannot be tapped through.
     Models     two fraction bars in one question (bars2: fraction comparison, equal fractions, simplest form, adding unlike parts);
                a place-value chart (pvc: whole numbers to the hundred thousands, decimals to hundredths); the steppers of "your
                problem" (pickn). Arrays, blocks with trades (b10r), fraction bars and number lines are the make and line kinds' own. */
const LS_B35 = []; // the grade 3-5 lesson ids, in map order of their lsDraft3 calls
/* ---- the misconception codes of grades 3 to 5 (TEACH-PLAN-2 system C). Most are written onto each question by its script (q.bug); the
   lesson's code knows the numbers. say: the pet's line when it repairs the idea (and its fallback reason); LS_WHY: the reason's sentence
   the child builds from tiles (its last three words are the tiles). ---- */
Object.assign(BUGS, {
  mulAdd: {d: 'adds the two numbers instead of multiplying them', say: 'Times means equal groups, not adding.'},
  skip: {d: 'one group too many or too few (a skip-counting slip)', say: 'Count the groups again. One row was off.'},
  fact: {d: 'a neighbouring fact: one group too many or too few', say: 'Multiply back to check. It must make the total.'},
  mcarry: {d: 'forgets to add the ten (or hundred) traded from the place before', say: 'The traded ten goes into the next place.'},
  tens0: {d: 'works a tens part as ones (2 × 60 as 12)', say: 'A tens part ends in zero.'},
  zeros: {d: 'writes one zero too many or too few', say: 'Count the zeros in the numbers again.'},
  part: {d: 'leaves out one of the parts of the product', say: 'Add every part of the product together.'},
  drop: {d: 'shares each place and drops what is left over', say: 'Leftover tens break into ones. Share those too.'},
  remBig: {d: 'leaves a remainder as big as the divisor, or bigger', say: 'The leftover must be smaller than the divisor.'},
  zero0: {d: 'drops a zero inside the answer (324 ÷ 3 as 18)', say: 'Keep a zero when a place has none.'},
  slip: {d: 'a small slip in one step: one (or ten) off', say: 'Check each step once more.'},
  trunc: {d: 'always rounds down: drops the digits after the place', say: 'Look at the next digit. Five or more rounds up.'},
  rup: {d: 'always rounds up', say: 'Below five rounds down.'},
  unshaded: {d: 'names the parts that are not shaded', say: 'The top number counts the shaded parts.'},
  fpart: {d: 'writes shaded parts over unshaded parts, not over all the parts', say: 'The bottom number counts all the parts.'},
  ticks: {d: 'counts the tick marks on a number line instead of the jumps', say: 'Count the jumps, not the tick marks.'},
  flip: {d: 'writes the fraction upside down', say: 'Shaded parts go on top. All parts go below.'},
  bigden: {d: 'thinks a bigger bottom number means a bigger fraction', say: 'More parts means smaller pieces.'},
  addEq: {d: 'adds the same number to the top and the bottom of a fraction', say: 'Multiply the top and bottom by the same number.'},
  oneSide: {d: 'divides only the top (or only the bottom) to simplify', say: 'Divide the top and the bottom by the same number.'},
  addBot: {d: 'adds the bottom numbers too', say: 'Same size parts: the bottom stays the same.'},
  renameTop: {d: 'changes the bottom number but not the top', say: 'Change the top as much as the bottom.'},
  mulBot: {d: 'multiplies the bottom number too (3 × 2/5 as 6/15)', say: 'A whole number times parts: the part size stays.'},
  topOnly: {d: 'multiplies the tops and keeps one bottom', say: 'Multiply the tops, and multiply the bottoms.'},
  mixAdd: {d: 'adds the fractions instead of multiplying them', say: 'Times a fraction means part of a part.'},
  dzero: {d: 'mixes up tenths and hundredths', say: 'Tenths are the first place after the point.'},
  longer: {d: 'thinks a decimal with more digits is bigger', say: 'Compare the tenths first, then the hundredths.'},
  point: {d: 'lines up the last digits instead of the points', say: 'Line up the points before you add.'},
  dpt: {d: 'puts the point in the wrong place', say: 'Count the digits after both points.'},
  order: {d: 'works left to right, adding before multiplying', say: 'Times and divide come before plus and minus.'},
  area: {d: 'multiplies the sides (finds the area, not the perimeter)', say: 'Perimeter adds all the sides around.'},
  half: {d: 'adds only two of the four sides', say: 'A rectangle has four sides to add.'},
  perim: {d: 'adds the sides instead of counting the squares inside', say: 'Area counts the squares inside.'},
  layer: {d: 'counts only one layer of the box', say: 'Count every layer of the box.'},
  place: {d: 'gives a digit the value of the place next to it', say: 'Each place is ten times the one to its right.'},
  oddPrime: {d: 'thinks every odd number is prime', say: 'Odd numbers can have factors too.'},
  divUp: {d: 'divides when the problem asks how many parts in all', say: 'Small parts fit many times into a whole.'},
  conv: {d: 'adds instead of multiplying when changing to a smaller unit', say: 'Smaller units need more of them. Multiply.'},
  minute: {d: 'counts the minute marks one five off', say: 'Count by fives to the last number, then by ones.'},
  sideP: {d: 'takes one side from the whole perimeter (forgets to halve it)', say: 'Half the perimeter is one long and one short side.'},
  mixTop: {d: 'keeps all the parts on top after taking out the wholes', say: 'Take the whole bars out of the top number.'},
});
// the reason the child builds from tiles: one sentence a code (its last three words are tiles)
const LS_WHY = {
  mulAdd: 'Times means equal groups', skip: 'Count the groups again', fact: 'Multiply back to check', mcarry: 'Add the traded ten',
  tens0: 'Tens parts end in zero', zeros: 'Count the zeros again', part: 'Add every part together', drop: 'Leftover tens become ones',
  remBig: 'The leftover must be smaller', zero0: 'Keep the zero in place', slip: 'Check each step again', trunc: 'Five or more rounds up',
  rup: 'Below five rounds down', unshaded: 'The top counts shaded parts', fpart: 'The bottom counts all parts', ticks: 'Count jumps not tick marks',
  flip: 'Shaded parts go on top', bigden: 'More parts means smaller pieces', addEq: 'Multiply top and bottom alike', oneSide: 'Divide both top and bottom',
  addBot: 'The bottom number stays the same', renameTop: 'Change the top number too', mulBot: 'The part size stays the same', topOnly: 'Multiply the bottoms too',
  mixAdd: 'Times means part of a part', dzero: 'Tenths come right after the point', longer: 'Compare the tenths first', point: 'Line up the points first',
  dpt: 'Count digits after the points', order: 'Times comes before plus', area: 'Perimeter adds every side', half: 'A rectangle has four sides',
  perim: 'Area counts the squares inside', layer: 'Count every layer', place: 'Check which place it is in', oddPrime: 'Odd numbers can have factors',
  divUp: 'Count how many parts fit', conv: 'Smaller units need more', minute: 'Count by fives first', sideP: 'Halve the perimeter first', mixTop: 'Take the wholes out', nocarry: 'Ten ones make a ten', cat: 'One digit fits each place',
  col: 'Take the bottom from the top', keep: 'The tens have one less', given: 'The shown number is not the answer', small: 'The open side faces the bigger',
  off1: 'Count each one once',
};
const LS_DECOY = ['bigger', 'smaller', 'more', 'less', 'left', 'right', 'first', 'last', 'top', 'bottom', 'ones', 'tens', 'adds', 'stays'];
// what a grown-up reads under "What we noticed" (82-report.js, LSREP in 52d-notebook.js)
if (typeof LSREP != 'undefined') Object.assign(LSREP.NOTE, {
  mulAdd: 'sometimes adds the two numbers when the problem multiplies', skip: 'sometimes counts one group too many or too few',
  fact: 'sometimes gives a times fact next to the right one', mcarry: 'sometimes forgets the ten carried over when multiplying',
  tens0: 'sometimes works a tens part as ones (2 × 60 as 12)', zeros: 'sometimes writes one zero too many or too few', part: 'sometimes leaves out a part of a bigger product',
  drop: 'sometimes drops what is left over when sharing a place', remBig: 'sometimes leaves a remainder bigger than the number it divides by',
  zero0: 'sometimes drops a zero inside a division answer', slip: 'makes small slips in long work', trunc: 'often rounds down when the number should round up',
  rup: 'often rounds up when the number should round down', unshaded: 'sometimes names the parts that are not shaded', fpart: 'sometimes puts shaded parts over unshaded parts',
  ticks: 'sometimes counts tick marks on a number line instead of jumps', flip: 'sometimes writes fractions upside down', bigden: 'often thinks a bigger bottom number makes a bigger fraction',
  addEq: 'sometimes adds the same number to top and bottom to make an equal fraction', oneSide: 'sometimes divides only the top or the bottom to simplify',
  addBot: 'sometimes adds the bottom numbers when adding fractions', renameTop: 'sometimes changes the bottom of a fraction but not the top',
  mulBot: 'sometimes multiplies the bottom too in a whole number times a fraction', topOnly: 'sometimes multiplies only the tops of two fractions',
  mixAdd: 'sometimes adds fractions when the problem multiplies them', dzero: 'sometimes mixes up tenths and hundredths', longer: 'often thinks a longer decimal is bigger',
  point: 'sometimes lines up the last digits instead of the decimal points', dpt: 'sometimes puts the decimal point in the wrong place', order: 'sometimes works left to right instead of times first',
  area: 'sometimes finds the area when asked for the perimeter', half: 'sometimes adds only two sides for a perimeter', perim: 'sometimes adds the sides when asked for the area',
  layer: 'sometimes counts only one layer of a box', place: 'sometimes reads a digit as worth the place next to it', oddPrime: 'sometimes thinks every odd number is prime',
  divUp: 'sometimes divides when finding how many parts fit', conv: 'sometimes adds when changing to a smaller unit', minute: 'sometimes counts the minute marks one five off',
  sideP: 'sometimes forgets to halve the perimeter when finding a missing side', mixTop: 'sometimes leaves the wholes in the top number of a mixed number',
});
// the pet's extra lines for the older kids (owner decision 3)
Object.assign(LS_TONE.kid, {mine: 'Give me a problem to solve.', work: 'Let me work it out.', tapStep: 'Which step has the slip? Tap it.', why: 'Now build the reason.'});
Object.assign(LS_TONE.teen, {mine: 'Give me a hard one.', work: 'Working it out.', tapStep: 'Find the step that is off.', why: 'Now the reason, in words.'});
Object.assign(LS_TONE.little, {mine: 'Give me a problem!', work: 'Let me try!', tapStep: 'Which step is wrong? Tap it.', why: 'Now tell me why.'});

/* ---- registering a lesson: its code now; its words when reviewed (LSW3), else the fallback words ---- */
function lsDraft3(id, D) {
  D.id = id;
  D.band = '35';
  LS_DRAFTED[id] = D;
  if (!LS_B35.includes(id)) LS_B35.push(id);
  return lsEnable3(id, typeof LSW3 != 'undefined' && LSW3[id] ? LSW3[id] : null);
}
// the hand-written fallback words of a lesson: the idea and tonight's question (written in 52j), a Name it line with the child's own
// numbers (D.fb), and each code's own reason; the engine's tone lines do the rest
function lsFallback(D) {
  return {idea: D.idea, home: D.home, beats: {remember: [], explore: [], name: [].concat(D.fb || [], D.idea), together: [], check: ['My turn.', 'I say {ans}.'], show: []},
    reasons: Object.fromEntries(D.bugs.map(c => [c, [BUGS[c].say]]))};
}
// make lesson id live with words W (a draft's JSON), or with its fallback words (W null); tools/test.js turns drafts on this way in Node
function lsEnable3(id, W) {
  const D = LS_DRAFTED[id], L = D && lsEnable(id, W || lsFallback(D));
  if (!L) return null;
  return Object.assign(L, {band: '35', fb: !W, g: D.g, chk: st => lsChk35(st)});
}

/* ---- Check me for grades 3 to 5 ---- */
// fix179: in the extra turns of Check me (st.chkN, the pet always wrong) there is no "your problem" (the child's numbers may allow no
// slip): the pet works numbers of its own that have a real slip (up to 20 draws), else a question with a wrong answer of its codes
function lsChk35(st) {
  const D = LS_DRAFTED[st.id];
  if (!st.chkN && D.fix && D.mine && (lsAge(gradeOf()) == 'teen' || st.r() < .5)) return [lsMineItem(st, D)];
  if (st.chkN && D.fix) for (let n = 0; n < 20; n++) { const it = lsStepsItem(st, D, D.fix.nums(st.r)); if (it && !it.petOk) return [it]; }
  return [(D.fix && lsStepsItem(st, D, D.fix.nums(st.r))) || lsPetItem35(st)];
}
// the find-the-mistake question's parts (k2Fix* in 49b-kinds2.js) for a label: {prob, lab, build(mis), muts, hint}, or null. The k2Fix
// functions hand these to k2FixQ, which picks a mistake at random; here k2FixQ is swapped for a moment so the lesson can choose
// (or choose none: the pet may be right)
function lsFixF(fn, q0) {
  const k0 = k2FixQ;
  let F = null;
  k2FixQ = (q, f) => { F = f; return null; };
  try { fn(q0); } catch (e) { F = null; } finally { k2FixQ = k0; }
  return F;
}
// a step's mistake as a misconception code
const lsFixCode = (D, [i, k]) => (typeof D.fix.code == 'function' ? D.fix.code(i, k) : D.fix.code[k]) || 'slip';
// the answer a list of steps ends with: what follows the last "= " (or ": ")
const lsLast = L => String(L[L.length - 1]).split(/= |: /).pop().trim();
const lsStepsHtml = (prob, lines, tap, mark) => `<div class="eq">${esc(prob)}</div><div class="fxs${tap ? '' : ' ls-fx'}">` + lines.map((t, j) => (tap
  ? `<div class="tp fxl" data-v="${j}">` : `<div class="fxl${j === mark ? ' ls-fixd' : ''}">`) + `<b class="fxn" aria-hidden="true">${j + 1}</b><span>${esc(t)}</span></div>`).join('') + '</div>';
// the pet works nums out in steps: right about PET_OK of the time; else one step slips, by the child's own idea when it is one of the
// lesson's, else the lesson's first that the numbers allow. Returns a judge item, or null when the numbers make no steps
function lsStepsItem(st, D, nums) {
  const L = st.L, T = lsTone(), f = lsFixF(D.fix.fn, {kind: 'num', label: D.fix.label(nums), html: '', say: ''});
  const ok = f && f.build(null);
  if (!ok || ok.length < 3 || ok.length > 5) return null;
  const held = st.repair || knowHeld(st.id, st.S, st.day), codes = held && L.bugs.includes(held) ? [held] : L.bugs;
  const cands = f.muts.filter(([i, k]) => { const b = f.build({i, k}); return b && b.length == ok.length && b[i] !== ok[i] && b.every((t, j) => j >= i || t === ok[j]); });
  if (st.chkN && !cands.length) return null; // fix179: an extra Check me turn needs a slip these numbers allow
  const petOk = LS.petRight(st) || !cands.length;
  let mis = null;
  if (!petOk) {
    const pref = codes.map(c => cands.filter(m => lsFixCode(D, m) == c)).find(a => a.length) || cands;
    mis = pref[Math.floor(st.r() * pref.length)];
  }
  const lines = mis ? f.build({i: mis[0], k: mis[1]}) : ok, pv = lsLast(lines), sl = D.fix.sl(nums);
  const q = lsQ(L.sk, L.lv, 2, {pk: false, kind: 'tap', ans: String(mis ? mis[0] : 0), label: `${L.sk}${L.lv} fix ${f.lab}`, sl, vsay: D.fix.vsay,
    html: lsCap(T.tapStep) + lsStepsHtml(f.prob, lines, true), say: `${T.tapStep} ${k2Speak(f.prob)}.`, hint: {k: 'text', s: f.hint},
    ansSay: mis ? `Step ${mis[0] + 1}. It should say: ${k2Speak(ok[mis[0]])}.` : ''});
  q.bug = {};
  const claim = (L.w && lsW(L.w.beats.check.filter(t => /\{ans\}/.test(t)), 0, Object.assign({}, sl, {ans: lsSayV(q, pv)}))[0]) || `I got ${lsSayV(q, pv)}.`;
  return {m: 'judge', q, pv, petOk, code: mis ? lsFixCode(D, mis) : null, steps: 1, pw: lsStepsHtml(f.prob, lines, false), lines: [T.myTurn, claim],
    after: () => [{m: 'ask', help: 1, fix: 1, q, lines: []},
      lsTilesItem(st, lsFixCode(D, mis), lsStepsHtml(f.prob, ok, false, mis[0]), [`Step ${mis[0] + 1} should say: ${k2Speak(ok[mis[0]])}.`])]};
}
// "your problem": the child sets the numbers (the pickn model); the pet works them out in its own announced turn
function lsMineItem(st, D) {
  const T = lsTone(), M = D.mine;
  const q = lsQ(st.L.sk, st.L.lv, 0, {pk: false, kind: 'make', model: 'pickn', raw: 1, goal: 'mine', eq: 'value', ans: '1', sl: {},
    m: {v: M.v.slice(), lo: M.lo, hi: M.hi, ds: M.ds, lab: M.lab, fmt: M.fmt, ok: M.ok}, html: lsCap(T.mine), say: M.say});
  return {m: 'open', mine: 1, q, lines: [T.myTurn, T.mine], nudge: M.nudge,
    on: (s, v) => {
      if (!lsOk(q, v)) return {ok: false, act: 'retry', lines: [M.nudge]};
      const nums = Array.isArray(v) ? v : q.m.v, pet = lsStepsItem(s, D, nums) || lsPetItem35(s);
      pet.lines = [lsTone().work].concat(pet.lines.slice(1));
      s.items.splice(s.i + 1, 0, pet);
      return {ok: true, act: 'next', lines: [], mood: 'happy'};
    }};
}
// can the pet's answer v be shown on question q? (num: in the pad's shape; the rest as batches 1 and 2)
function lsFits35(q, v) {
  if (q.kind == 'num') return (q.sep == 'R' ? /^\d+R\d+$/ : q.sep == 'mix' ? /^\d+ \d+\/[1-9]\d*$/ : q.pad == 'frac' ? /^\d+\/[1-9]\d*$/ : q.pad == 'dec' ? /^\d+(\.\d+)?$/ : q.pad == 'neg' ? /^-?\d+$/ : /^\d+$/).test(String(v)); // TEACH-6M: a negative number on the plus-or-minus pad
  return LS.fits(q, v);
}
// Check me on the model or the question (no written steps): the pet's answer by the child's idea, else the lesson's codes in order
function lsPetItem35(st) {
  const L = st.L, r = st.r, T = lsTone(), held = st.repair || knowHeld(st.id, st.S, st.day), codes = held && L.bugs.includes(held) ? [held] : L.bugs;
  const petOk = LS.petRight(st);
  let q, pv = null, code = null;
  for (let n = 0; n < 40 && pv == null; n++) {
    q = L.q(L.petSt != null ? L.petSt : 1, r);
    if (petOk) { pv = q.ans; break; }
    for (const c of n < 30 ? codes : L.bugs) {
      const v = (knowPredict(q)[c] || []).find(x => String(x) !== q.ans && !lsOk(q, String(x)) && lsFits35(q, x));
      if (v != null) { pv = String(v); code = c; break; }
    }
  }
  if (pv == null) pv = q.ans;
  const ok = lsOk(q, pv), claim = (L.w && lsW(L.w.beats.check.filter(t => /\{ans\}/.test(t)), 0, Object.assign({}, q.sl, {ans: lsSayV(q, pv)}))[0]) || LS.petSays(q, pv);
  const it = {m: 'judge', q, pv, petOk: ok, code, lines: [T.myTurn, claim]};
  it.after = () => [LS.fixItem(it), lsTilesItem(st, code, LS.petWork(q, q.ans), [])];
  return it;
}
// the reason from word tiles (the order kind, TEACH-PLAN-2 system B): the sentence frame is the reason's start; its last three words
// and two more are the tiles, in a shuffled order
function lsTilesItem(st, code, top, lines) {
  const s = LS_WHY[code] || LS_WHY.slip, w = s.split(' '), k = Math.min(3, w.length - 1), head = w.slice(0, w.length - k).join(' '), ans = w.slice(-k).map(x => x.toLowerCase());
  const dec = LS_DECOY.filter(x => !ans.includes(x)), extra = [];
  while (extra.length < 2) { const x = dec[Math.floor(st.r() * dec.length)]; if (!extra.includes(x)) extra.push(x); }
  const items = ans.concat(extra).map(x => ({v: x, l: x})), sh = items.map(x => [st.r(), x]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
  const T = lsTone(), q = {kind: 'order', sk: st.L.sk, lv: st.L.lv, st: 2, ans, items: sh, end: '.', label: `${st.L.sk}${st.L.lv} why ${code}`,
    html: `<div class="ls-fixtop">${top}</div><div class="sub ls-why">${esc(head)} …</div>`, say: `${T.why} ${head} ...`, hint: {k: 'text', s}, ansSay: s, sl: {}};
  return {m: 'ask', help: 1, fix: 1, why: code, q, lines: lines.concat([])};
}

/* ---- the workbench pieces (keys of K2MM, 49b-kinds2.js, added from here; Practice never uses them) ---- */
// a fraction as the app draws it, and as it is said
const ls3Fr = (n, d) => fcFr(n, d);
const ls3FrSay = v => { const m = /^(\d+) (\d+)\/(\d+)$/.exec(v) || /^()(\d+)\/(\d+)$/.exec(v); if (!m) return String(v); const f = +m[3] <= 12 ? fcSay(+m[2], +m[3]) : `${m[2]} over ${m[3]}`; return m[1] ? `${m[1]} and ${f}` : f; };
const ls3Say = v => (/\//.test(v) ? ls3FrSay(String(v)) : /R/.test(v) ? String(v).replace('R', ' remainder ') : /\./.test(v) ? k2SayNum(+v) : String(v));
// two fraction bars (fraction comparison, equal fractions): state [shaded on top, shaded below]; m.d [top parts, bottom parts],
// m.lock [true, false]: a bar the child does not change (it shows the given fraction); m.lab: write each bar's fraction beside it
function ls3Bars(s, d, o = {}) {
  // LESSON-STAGE: o.tap, each part a target (data-v) on a bar that says which it is (data-b), for K2MM.bars2.tap
  const row = (n, dd, i) => `<div class="ls-bar"${o.tap ? ` data-b="${i}"` : ''}>${o.lab ? `<span class="ls-barl">${ls3Fr(n, dd)}</span>` : ''}${VIZ.fracBar(n, dd, {w: 240, tap: o.tap}).replace('<svg ', '<svg aria-hidden="true" ')}</div>`;
  return `<div class="ls-bars" role="img" aria-label="two fraction bars">${row(s[0], d[0], 0)}${row(s[1], d[1], 1)}</div>`;
}
// a place-value chart: the digits of a number under their places (o.pl: the places, biggest first, as powers of ten; o.mark: the place
// to circle)
const LS_PVN = {5: 'Hundred thousands', 4: 'Ten thousands', 3: 'Thousands', 2: 'Hundreds', 1: 'Tens', 0: 'Ones', '-1': 'Tenths', '-2': 'Hundredths'};
const LS_PVS = {5: 'HTh', 4: 'TTh', 3: 'Th', 2: 'H', 1: 'T', 0: 'O', '-1': 't', '-2': 'h'}; // the chart's short heads (as on a classroom chart); each says its full name
function ls3Digit(v, p) { return Math.floor(Math.round(Math.abs(v) * 100) / Math.round(Math.pow(10, p + 2)) + 1e-9) % 10; }
function lsPvChart(v, pl, o = {}) {
  const rows = (o.rows || [v]).map(x => `<tr>${pl.map(p => `<td class="${p === o.mark ? 'ls-pvm' : ''}${p == 0 && pl.includes(-1) ? ' ls-pvo' : ''}">${o.blank ? '' : ls3Digit(x, p)}</td>`).join('')}</tr>`).join('');
  return `<table class="ls-pvc" aria-label="place value chart"><thead><tr>${pl.map(p => `<th scope="col" aria-label="${LS_PVN[p]}" title="${LS_PVN[p]}">${LS_PVS[p]}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>`;
}
// the area model of a × b: a rectangle cut by b's tens and ones (and a's hundreds, tens and ones when o.split), each part's product
// shown (o.parts) or not
function lsAreaModel(a, b, o = {}) {
  const sp = n => String(n).split('').map((d, i, s) => +d * Math.pow(10, s.length - 1 - i)).filter(x => x), A = o.splitA ? sp(a) : [a], B = sp(b);
  const head = `<tr><th></th>${A.map(x => `<th scope="col">${x}</th>`).join('')}</tr>`;
  const body = B.map(y => `<tr><th scope="row">${y}</th>${A.map(x => `<td>${o.parts ? x * y : '?'}</td>`).join('')}</tr>`).join('');
  return `<table class="ls-area" aria-label="area model">${head}${body}</table>`;
}
if (typeof K2MM != 'undefined') {
  K2MM.bars2 = {
    raw: true,
    s0: () => [0, 0],
    val: (q, s) => `${s[0]}/${q.m.d[0]} ${s[1]}/${q.m.d[1]}`,
    ans: q => q.m.ans.slice(),
    step: (q, s, i, d) => { if ((q.m.lock || [])[i]) return null; const o = s.slice(); o[i] += d; return o[i] < 0 || o[i] > q.m.d[i] ? null : o; },
    draw: (q, s) => ls3Bars(s, q.m.d, {lab: q.m.lab, tap: 1}),
    // LESSON-STAGE (owner, 2026-11-23): tap a bar's part to shade the bar up to it (the last shaded part again: one less); a locked bar
    // does not change; the stepper rows stay for the keyboard
    tap: (q, s, t) => {
      const b = t.closest('[data-b]'), i = b ? +b.dataset.b : -1, j = +t.dataset.v;
      if (i < 0 || !(j >= 0) || (q.m.lock || [])[i]) return null;
      const o = s.slice();
      o[i] = o[i] == j + 1 ? j : j + 1;
      return o;
    },
    ctl: q => `<div class="mmc mmcol">${['Top bar', 'Bottom bar'].map((l, i) => ((q.m.lock || [])[i] ? '' : mmRow(l, i, true))).join('')}</div>`,
    of: (q, v) => (Array.isArray(v) ? v : String(v).split(' ').map(x => +x.split('/')[0])),
    fits: () => true,
  };
  // a place-value chart to build on: one stepper a place (0 to 9); state: the digits, biggest place first
  K2MM.pvc = {
    raw: true,
    s0: q => q.m.pl.map(() => 0),
    val: (q, s) => k2Clean(s.reduce((a, x, i) => a + x * Math.pow(10, q.m.pl[i]), 0)),
    ans: q => q.m.pl.map(p => ls3Digit(+q.ans, p)),
    step: (q, s, i, d) => (s[i] + d < 0 || s[i] + d > 9 ? null : s.map((x, j) => (j == i ? x + d : x))),
    draw: (q, s) => lsPvChart(K2MM.pvc.val(q, s), q.m.pl),
    ctl: q => `<div class="mmc mmcol ls-pvctl">${q.m.pl.map((p, i) => mmRow(LS_PVN[p], i, false)).join('')}</div>`,
    of: (q, v) => q.m.pl.map(p => ls3Digit(+v, p)),
    fits: (q, v) => isFinite(+v) && +v >= 0 && Math.abs(K2MM.pvc.val(q, K2MM.pvc.of(q, v)) - +v) < 1e-9,
  };
  // "your problem": steppers for the numbers of a problem the child sets (m.v the start, m.lo / m.hi / m.ds the range and steps,
  // m.lab the rows' names, m.fmt(state) the problem as written)
  K2MM.pickn = {
    raw: true,
    s0: q => q.m.v.slice(),
    val: (q, s) => s.join(','),
    ans: q => q.m.v.slice(),
    step: (q, s, i, d) => { const o = s.slice(); o[i] += d; return o[i] < q.m.lo[i] || o[i] > q.m.hi[i] ? null : o; },
    draw: (q, s) => `<div class="eq ls-mine">${esc(q.m.fmt(s))}</div>`,
    ctl: q => `<div class="mmc mmcol">${q.m.lab.map((l, i) => mmRow(l, i, false, q.m.ds[i])).join('')}</div>`,
  };
}
// the checkers the new pieces use (LSGOAL, 52b-know.js): a raw state, or (for the simulated children) a value
Object.assign(LSGOAL, {
  // both bars as the question says (fraction comparison: build both)
  two: (q, v) => Array.isArray(v) && v[0] == q.m.ans[0] && v[1] == q.m.ans[1],
  // the bottom bar shaded as much as the top (equal fractions, simplest form)
  equiv: (q, v) => Array.isArray(v) && v[1] * q.m.d[0] == v[0] * q.m.d[1] && v[0] == q.m.ans[0],
  // any shading on either bar
  shade: (q, v) => Array.isArray(v) && (v[0] > 0 || v[1] > 0),
  // "your problem": numbers the pet can work with
  mine: (q, v) => Array.isArray(v) && v.every((x, i) => x >= q.m.lo[i] && x <= q.m.hi[i]) && (!q.m.ok || q.m.ok(v)),
  // an array of q.m.n dots (any rows): r × c from the array kind
  arrN: (q, v) => { const m = Array.isArray(v) ? ['', ...v] : /^(\d+)×(\d+)$/.exec(String(v)); return !!m && +m[1] * +m[2] == q.m.n && (!q.m.big || +m[1] > 1 && +m[2] > 1); },
  // a factor of q.m.n other than 1 and itself (typed)
  factor: (q, v) => /^\d+$/.test(String(v)) && +v > 1 && +v < q.m.n && q.m.n % +v == 0,
  // some shading (a parts model's value, or a count)
  some: (q, v) => k2Val(v) > 0,
  // both bars shaded the same amount (any way: Explore)
  same: (q, v) => Array.isArray(v) && v[0] > 0 && v[0] * q.m.d[1] == v[1] * q.m.d[0],
  // a number line pin anywhere but where it starts
  pin: (q, v) => isFinite(+v) && String(+v) !== String(+q.start),
});
