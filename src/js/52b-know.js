/* ---------- TEACH-1: what the tutor knows, the plan, the before-and-after measure (part teach) ----------
   Saved data (all of it stays on the tablet; a backup file carries it like the rest of S):
     S.know[nid] = {s, n, lv, b, box, due, d, k}   the learner record of one lesson stop (TEACH-PLAN-2 system C, batch 1 size)
        s    stage: 0 not yet, 1 taught (the lesson ran), 2 learned (Show passed with no help), 3 kept (right again in Remember on a later day)
        n    lessons run on it          lv  [[right, tried] at build, picture, symbols] first tries in lessons
        b    {code: count} wrong answers a misconception code predicts (BUGS below)
        box  memory box 0..4 (due after LS_GAP[box] days)    due  the day number it is due in Remember    d  day learned    k  day kept
     S.lm = [[nid, day, preRight, preN, postRight, postN, testedOut], ...]   the measure: the two "show me" items before teaching
        (first try, no help) and the two Show items after it (one try, no help); newest last, at most LS_KEEP
     S.lr = [[nid, gapDays, right], ...]   Remember answers: right again after how many days (retention by day gap); at most LS_KEEP
     S.les = {n: nid, b: beat, s: seed, pre: [..]}   a lesson left part way, resumed at that beat (deleted when it ends)
   Day numbers are STRK.idx(today()) (55-streak.js). */
const LS_GAP = [2, 5, 12, 30, 60], LS_KEEP = 100;
const lsDay = () => (typeof STRK != 'undefined' ? STRK.idx(today()) : 0);
function lsKnow(id, S0 = S) {
  if (!S0.know || typeof S0.know != 'object' || Array.isArray(S0.know)) S0.know = {};
  return S0.know[id] || (S0.know[id] = {s: 0, n: 0, lv: [[0, 0], [0, 0], [0, 0]], b: {}, box: 0, due: 0});
}
/* The misconception codes (TEACH-PLAN-2 system C). An entry: d what a child holding that idea does (for code and tests), f(q) the
   answers that idea gives to a question (only for questions that carry their numbers: q.ab [a, b, '+' | '-'], q.coins [values],
   q.hm [hour, minute]), and say: the pet's spoken line when a lesson repairs it (12 words or fewer). A question also carries
   q.bug {code: [values]} written by its script. A wrong answer adds one to each code that predicts it. */
const lsDig = n => String(n).split('').reverse().map(Number); // ones first
const lsCols = (a, b, fn) => { const x = lsDig(a), y = lsDig(b), o = []; for (let i = 0; i < Math.max(x.length, y.length); i++) o.push(fn(x[i] || 0, y[i] || 0, i)); return o; };
const lsAB = (q, op) => (Array.isArray(q.ab) && q.ab[2] == op && q.ab[1] >= 0 && q.ab[0] >= (op == '-' ? q.ab[1] : 0) ? q.ab : null);
const BUGS = {
  off1: {d: 'one too many or one too few (a counter counted twice, or one missed)', say: 'Count each one once. Touch it as you count.'},
  given: {d: 'answers with a number that is already shown', f: q => (Array.isArray(q.ab) ? q.ab.slice(0, 2) : []), say: 'The number we see is not the answer.'},
  op: {d: 'adds instead of taking away (or the other way round)', f: q => (lsAB(q, '-') ? [q.ab[0] + q.ab[1]] : lsAB(q, '+') && q.ab[0] >= q.ab[1] ? [q.ab[0] - q.ab[1]] : []),
    say: 'Look at the sign. Are we adding or taking away?'},
  all: {d: 'counts them all and forgets to take away', say: 'Some went away. Count only the ones left.'},
  ten: {d: 'forgets the ten (or counts it as one)', say: 'A full frame is ten. Count the ten first.'},
  swap: {d: 'reads the tens and ones the wrong way round (14 as 41)', f: q => (Array.isArray(q.ab) && /^\d\d$/.test(q.ans) && q.ans[0] != q.ans[1] ? [+(q.ans[1] + q.ans[0])] : []),
    say: 'The tens come first. Then the ones.'},
  small: {d: 'picks the smaller one as bigger (the sign turned round)', say: 'The open side faces the bigger number.'},
  back: {d: 'counts the wrong way (on instead of back)', say: 'Back means smaller numbers. Count down.'},
  // grade 1 and 2 ideas (place value, carrying, borrowing, clocks, coins): every one computed from the question's own numbers
  col: {d: 'takes the smaller digit from the bigger one in each column', f: q => (lsAB(q, '-') ? [+lsCols(q.ab[0], q.ab[1], (x, y) => Math.abs(x - y)).reverse().join('')] : []),
    say: 'Top take away bottom. Not the small from the big.'},
  keep: {d: 'borrows a ten for the ones but does not take it from the tens', f: q => {
    if (!lsAB(q, '-')) return [];
    const o = lsCols(q.ab[0], q.ab[1], (x, y) => (x < y ? x + 10 - y : x - y));
    return [+o.reverse().join('')];
  }, say: 'We took a ten. Now the tens have one less.'},
  nocarry: {d: 'adds each column and drops the extra ten', f: q => (lsAB(q, '+') ? [+lsCols(q.ab[0], q.ab[1], (x, y) => (x + y) % 10).reverse().join('')] : []),
    say: 'Ten ones make a ten. Carry it over.'},
  cat: {d: 'writes each column total side by side (27 + 15 as 312)', f: q => (lsAB(q, '+') ? [+lsCols(q.ab[0], q.ab[1], (x, y) => x + y).reverse().join('')] : []),
    say: 'Only one digit fits in each place.'},
  count: {d: 'counts the coins instead of adding their values', f: q => (Array.isArray(q.coins) ? [q.coins.length] : []), say: 'Each coin has a value. Add the values.'},
  hands: {d: 'reads the long hand as the hour and the short hand as the minutes', f: q => {
    if (!Array.isArray(q.hm)) return [];
    const [h, m] = q.hm;
    return m % 5 == 0 ? [`${m ? m / 5 : 12}:${String((h % 12) * 5).padStart(2, '0')}`] : [];
  }, say: 'The short hand tells the hour.'},
};
// the wrong answers each code predicts for q: the script's q.bug, then the code's own function; never the right answer
function knowPredict(q) {
  const o = {};
  for (const c in BUGS) {
    const v = [].concat((q.bug || {})[c] || [], BUGS[c].f ? BUGS[c].f(q) : []).map(String).filter(x => x !== String(q.ans));
    if (v.length) o[c] = [...new Set(v)];
  }
  return o;
}
const lsBugsOf = (q, v) => { const P = knowPredict(q); return Object.keys(P).filter(c => P[c].includes(String(v))); };
// tallies halve every LS_FADE days (k.f: the day of the last halving), so an old slip stops counting
const LS_FADE = 14, LS_WRONG = 8;
function knowFade(k, day) {
  if (day == null) return k;
  if (k.f == null) k.f = day;
  while (day - k.f >= LS_FADE) {
    for (const c in k.b) if (!(k.b[c] = k.b[c] >> 1)) delete k.b[c];
    k.f += LS_FADE;
  }
  return k;
}
// one first try in a lesson: stage level, a misconception tally, and the last LS_WRONG wrong answers [codes, problem, day]
function knowAdd(id, q, v, ok, S0 = S, day = lsDay()) {
  const k = knowFade(lsKnow(id, S0), day), l = k.lv[Math.max(0, Math.min(2, q.st | 0))];
  l[1]++;
  if (ok) return void l[0]++;
  knowWrong(k, q, v, day);
}
// a wrong first try on the record k: a tally for each code that predicts it, and the page of the last LS_WRONG wrong answers
function knowWrong(k, q, v, day) {
  const cs = lsBugsOf(q, v);
  for (const c of cs) k.b[c] = (k.b[c] || 0) + 1;
  (k.w = k.w || []).push([cs.join(','), String(q.label || q.ans).slice(0, 16), day]);
  if (k.w.length > LS_WRONG) k.w.splice(0, k.w.length - LS_WRONG);
}
/* TEACH-2b: Practice rounds feed the record too (TEACH-PLAN-2 system C), through one wrap of check() (50-round.js) installed when this
   part loads. Only a wrong FIRST try on a stop that has a lesson script (live or drafted) is written, and only its misconception page
   (knowWrong: the tallies and the last wrong answers), never the lesson levels, the stage or the memory box: Practice is evidence of
   what the child thinks, not a lesson. It reads the round and never changes it: the wrap computes right or wrong the way check()
   does, writes, then calls check() itself with the same arguments, so what Practice asks and how it scores are the same (tools/test.js
   plays seeded rounds with and without the wrap). A Practice question carries its numbers in its label; lsNums reads them onto a copy
   (q.ab from "38 + 47 = ?", q.coins from "coins 10+5+1", q.hm from "clock 4:30"), so the computed codes work on it. Lessons off: nothing. */
function lsNums(q) {
  const o = Object.assign({}, q), l = String(q.label || '');
  let m;
  if (!o.ab && (m = /^(\d+) ([+−-]) (\d+) = \?$/.exec(l))) o.ab = [+m[1], +m[3], m[2] == '+' ? '+' : '-'];
  if (!o.coins && (m = /^coins ([\d+]+)$/.exec(l))) o.coins = m[1].split('+').map(Number);
  if (!o.hm && (m = /^clock (?:to 5 min )?(\d+):(\d\d)$/.exec(l))) o.hm = [+m[1], +m[2]];
  return o;
}
const lsHasScript = id => !!(LESSONS[id] || typeof LS_DRAFTED != 'undefined' && LS_DRAFTED[id]);
function knowPractice(q, v, S0 = S, day = lsDay()) {
  const id = q && q.sk + q.lv;
  if (!id || !lsHasScript(id) || TEACH.off) return false;
  const K = KIND[q.kind], ok = K && K.same ? K.same(q, v) : String(v) === String(q.ans);
  if (ok) return false;
  knowWrong(knowFade(lsKnow(id, S0), day), lsNums(q), v, day);
  return true;
}
if (typeof check == 'function' && !check.lsKnow) {
  const check0 = check;
  check = function (v) {
    try { if (typeof G != 'undefined' && G && G.q && !G.lock && !G.tries && !G.retry) knowPractice(G.q, v); } catch (e) { /* evidence only: never in the round's way */ }
    return check0.apply(this, arguments);
  };
  check.lsKnow = check0;
}
/* How a teacher reads a page of work, not one answer: each code's weight over the last LS_WRONG wrong answers (an answer counts half
   after LS_FADE days, a quarter after twice that) and the problems it explains. day: today (default: the newest answer's day). */
function knowScore(id, S0 = S, day) {
  const k = (S0.know && S0.know[id]) || {}, w = Array.isArray(k.w) ? k.w : [], o = {};
  if (day == null) day = w.reduce((m, e) => Math.max(m, e[2] | 0), 0);
  for (const [cs, pr, d] of w) for (const c of String(cs).split(',').filter(x => BUGS[x])) {
    const x = o[c] || (o[c] = {c, n: 0, pr: new Set()});
    x.n += Math.pow(.5, Math.floor(Math.max(0, day - d) / LS_FADE));
    x.pr.add(pr);
  }
  return Object.values(o).sort((a, b) => b.n - a.n);
}
// the code the child holds: it explains 3 or more of the last 8 wrong answers, across 2 or more problems, and no other code as many
function knowHeld(id, S0 = S, day) {
  const s = knowScore(id, S0, day), a = s[0];
  return a && a.n >= 3 && a.pr.size >= 2 && !(s[1] && s[1].n >= a.n) ? a.c : null;
}
// two codes that fit the same wrong answers equally (2 or more each, nothing held): the probe tells them apart
function knowTie(id, S0 = S, day) {
  const s = knowScore(id, S0, day);
  return s.length > 1 && s[0].n >= 2 && s[1].n == s[0].n && !knowHeld(id, S0, day) ? [s[0].c, s[1].c] : null;
}
// the probe: up to 20 questions from gen(), the first on which codes a and b predict different answers (null if none does)
function knowProbe(a, b, gen) {
  for (let n = 0; n < 20; n++) {
    const q = gen(), P = knowPredict(q);
    if (P[a] && P[b] && !P[a].some(v => P[b].includes(v))) return q;
  }
  return null;
}
// Remember answered on day `day`: a right answer moves the box up (and keeps a learned stop), a miss moves it down
function knowRemember(id, ok, day, S0 = S) {
  const k = lsKnow(id, S0), gap = k.last != null ? day - k.last : 0;
  (S0.lr = Array.isArray(S0.lr) ? S0.lr : []).push([id, gap, ok ? 1 : 0]);
  if (S0.lr.length > LS_KEEP) S0.lr.splice(0, S0.lr.length - LS_KEEP);
  k.box = ok ? Math.min(4, k.box + 1) : Math.max(0, k.box - 1);
  k.due = day + LS_GAP[k.box];
  k.last = day;
  if (ok && k.s == 2 && k.d != null && day > k.d) { k.s = 3; k.k = day; }
}
/* PRE: what each math stop builds on (TEACH-PLAN-2 system D), planning data only: the planner sends a child back to an earlier
   lesson, it never changes what the map opens. Every link is a real stop that sits earlier on the path or in a lower grade, and
   there are no loops (tools/test.js). Pre-K to 2nd grade for now. */
const PRE = {
  pk_count3: ['pk_count2'], pk_num3: ['pk_num2'], tenf1: ['pk_count2'], pk_more2: ['pk_more1'], add4: ['pk_count2', 'pk_more1'],
  tenf2: ['tenf1'], cnt4: ['pk_count3'], tenf3: ['tenf2', 'pk_count3'], add1: ['add4', 'tenf2'], cnt1: ['pk_count3'], eo1: ['cnt1'],
  miss1: ['add1'], sub1: ['add4'], story1: ['add1', 'sub1'], add2: ['add1'], big1: ['cnt1'], cnt2: ['cnt1'], cmp1: ['pk_more2', 'tenf3'],
  miss2: ['miss1', 'add2'], sub2: ['sub1', 'add2'], story2: ['story1', 'sub2'], pv1: ['tenf3', 'big1'], add5: ['add2'], add6: ['add2', 'pv1'],
  add3: ['add2', 'sub2'], big2: ['pv1', 'add3'], coins1: ['cnt2'], eo2: ['eo1', 'pv1'], cmp2: ['cmp1', 'pv1'], time2: ['time1'],
  sub3: ['pv1', 'sub2'], story3: ['story2', 'big2', 'sub3'], big3: ['big2'], mult1: ['cnt2', 'add5'], coins2: ['coins1', 'cnt1'],
  sub4: ['sub3'], time3: ['time2'], big4: ['big3'], mult2: ['mult1'], cmp3: ['cmp2'], coins3: ['coins2'], pv2: ['pv1'],
  big5: ['big4', 'pv2'], pv3: ['pv2'], sub5: ['sub4', 'pv2'], time4: ['time3'], coins4: ['coins3'], arr1: ['mult2'], cnt5: ['cnt3'],
  coins5: ['coins4', 'sub3'], story4: ['story3', 'big3', 'sub4'],
};
// the stops id builds on, nearest first, down to two links
const lsPreOf = id => { const o = []; for (const x of PRE[id] || []) for (const y of [x, ...(PRE[x] || [])]) if (!o.includes(y)) o.push(y); return o; };
// a lesson's strand ("Counting and number sense", "Addition and subtraction", ...): the report card's (82-report.js)
const lsStrand = id => (typeof REP != 'undefined' && LESSONS[id] ? REP.strandOf(LESSONS[id].sk) : String(id).replace(/\d+$/, ''));
// the subjects with lessons (owner decision 1: the child picks the subject; the planner plans inside it)
const LS_SUBJ = ['math'];
/* planToday(S, day, p): the next lesson in the chosen subject p, the pure function of TEACH-PLAN-2 system D. In order:
     1. a lesson left part way (S.les) whose stop is open (kind 'again');
     2. a repair: a misconception held (knowHeld) on a lesson stop the next new stop builds on, or on the last one taught (kind 'repair');
     3. a prerequisite: the next new stop builds on a lesson stop the child has not learned, and either that stop is not passed at all
        or the next stop's lesson has run twice without its Show passed (kind 'again');
     4. the next lesson stop of the child's grade band (Pre-K to 2nd, or 3rd to 5th with their own grade first) that is open, not
        passed and not learned, in map order; but when the last lesson (S.lm) was on an earlier
        day and in the same strand, a stop of another strand whose prerequisites are passed or learned comes first (alternating by
        day; kind 'new');
     5. with nothing new open, the most overdue learned lesson, as a review (kind 'again').
     A stop passed in Practice is not offered again as new; it comes back in Remember.
   remember: the most overdue learned lesson, never today's (one item: owner decision 2); with none due, the last stop passed in
   Practice that no lesson has taught; or none.
   Returns {id, i (the stop's index on the map), kind 'new' | 'again' | 'repair', code (repair), remember: [ids]} or null. */
function planToday(S0, day, p = 'math') {
  if (!LS_SUBJ.includes(p)) return null;
  const at = id => NODES.math.findIndex(n => nid(n) === id), open = id => { const i = at(id); return i >= 0 && unlocked('math', i); };
  const K = S0.know || {}, ps = id => at(id) >= 0 && passed('math', at(id)), learned = id => (K[id] || {}).s >= 2;
  let id = S0.les && LESSONS[S0.les.n] && open(S0.les.n) ? S0.les.n : null, kind = id ? 'again' : 'new', code = null;
  if (!id) {
    // TEACH-3: a child in 3rd grade or up is offered the grade 3-5 lessons only, their own grade's first (6th grade: 5th grade's);
    // a child below 3rd grade the Pre-K to 2nd grade lessons only (the app loads teach35 for 3rd grade up, teachWarm; this keeps the
    // plan the same when the part is in from an earlier grade setting, and a little one is never handed word-tile reasons to read)
    const g0 = GRADES.includes(S0.grade) ? S0.grade : 0, wg = x => PATHS.math.worlds[NODES.math[at(x)].wi].g, mine = x => (g0 >= 3 && wg(x) != Math.min(g0, 5) ? 1 : 0);
    const cand = LS_IDS.filter(x => at(x) >= 0 && (g0 < 3) === (wg(x) < 3)).sort((a, b) => mine(a) - mine(b) || at(a) - at(b)).filter(x => open(x) && !ps(x) && !learned(x));
    const ready = x => (PRE[x] || []).every(y => ps(y) || learned(y));
    let nx = cand[0] || null;
    const lm = Array.isArray(S0.lm) ? S0.lm : [], last = lm[lm.length - 1];
    if (nx && last && last[1] < day && lsStrand(last[0]) == lsStrand(nx)) nx = cand.find(x => lsStrand(x) != lsStrand(nx) && ready(x)) || nx;
    if (nx) {
      const pre = lsPreOf(nx).filter(y => LESSONS[y] && open(y));
      const rep = pre.concat(last && LESSONS[last[0]] && open(last[0]) ? [last[0]] : []).find(y => (K[y] || {}).s >= 1 && knowHeld(y, S0, day));
      const k = K[nx] || {}, back = (PRE[nx] || []).find(y => LESSONS[y] && open(y) && !learned(y) && (!ps(y) || k.n >= 2 && k.s < 2));
      if (rep) { id = rep; kind = 'repair'; code = knowHeld(rep, S0, day); }
      else if (back) { id = back; kind = 'again'; }
      else id = nx;
    }
  }
  // 5. nothing new is open: the most overdue learned lesson again, as a review (its Show counts as remembering it, LS.finish)
  const due0 = LS_IDS.filter(x => K[x] && K[x].s >= 2 && K[x].due <= day && open(x)).sort((a, b) => K[a].due - K[b].due);
  if (!id && due0.length) { id = due0[0]; kind = 'again'; }
  if (!id) return null;
  const due = due0.filter(x => x !== id);
  // nothing due: a stop passed in Practice that no lesson has taught yet (the tutor has not seen it: TEACH-PLAN-2 system D)
  const seen = LS_IDS.filter(x => x !== id && ps(x) && !learned(x));
  return {id, i: at(id), kind, code, remember: (due.length ? due : seen.slice(-1)).slice(0, 1)};
}
// what the pet suggests today (owner decision 1: a suggestion only, the child still picks): of the subjects with a lesson ready,
// the one not used for the last lesson, by day; {p, plan} or null
function planSuggest(S0, day) {
  const ok = LS_SUBJ.map(p => ({p, plan: planToday(S0, day, p)})).filter(x => x.plan);
  if (!ok.length) return null;
  const lm = Array.isArray(S0.lm) ? S0.lm : [], last = lm[lm.length - 1], lp = last && LESSONS[last[0]] ? (LESSONS[last[0]].p || 'math') : null;
  return ok.find(x => x.p != lp || !last || last[1] == day) || ok[day % ok.length];
}
// the measure: the record of one lesson; and the summary for grown-ups (first-try accuracy before and after, retention by gap)
function lsMeasure(id, day, pre, post, to, S0 = S) {
  (S0.lm = Array.isArray(S0.lm) ? S0.lm : []).push([id, day, pre.filter(Boolean).length, pre.length, post.filter(Boolean).length, post.length, to ? 1 : 0]);
  if (S0.lm.length > LS_KEEP) S0.lm.splice(0, S0.lm.length - LS_KEEP);
}
function lsSummary(S0 = S) {
  const m = Array.isArray(S0.lm) ? S0.lm : [], r = Array.isArray(S0.lr) ? S0.lr : [], sum = (a, i) => a.reduce((t, x) => t + x[i], 0);
  const pct = (a, b) => (b ? Math.round(100 * a / b) : null);
  const near = r.filter(x => x[1] < 7), far = r.filter(x => x[1] >= 7);
  return {lessons: m.length, before: pct(sum(m, 2), sum(m, 3)), after: pct(sum(m, 4), sum(m, 5)), testedOut: m.filter(x => x[6]).length,
    keptSoon: pct(sum(near, 2), near.length), keptLater: pct(sum(far, 2), far.length), remembered: r.length};
}
// the checkers of open tasks and goal questions (a fixed menu: scripts name one, never write code). v is the submitted value
// (a frame2 build is its state [blue, orange])
const LSGOAL = {
  any: () => true,
  fill: (q, v) => Array.isArray(v) && v[0] > 0 && v[1] > 0 && v[0] + v[1] == q.m.total,
  both: (q, v) => Array.isArray(v) && v[0] > 0 && v[1] > 0,
  sum: (q, v) => Array.isArray(v) && v[0] > 0 && v[1] > 0 && v[0] + v[1] == q.m.target,
  less: (q, v) => +v < q.s0[0],
  gt: (q, v) => +v > q.target,
};
// right or not, for a lesson question: a goal question asks its checker, any other its kind
function lsOk(q, v) {
  if (q.goal) return !!(LSGOAL[q.goal] && LSGOAL[q.goal](q, v));
  const K = KIND[q.kind];
  return K.same ? K.same(q, v) : String(v) === String(q.ans);
}
// the two-colour ten frame (TEACH-PLAN-2 system B): state [blue, orange], a stepper row each; the frame draws them in turn
if (typeof K2MM != 'undefined') K2MM.frame2 = {
  s0: () => [0, 0],
  val: (q, s) => s[0] + s[1],
  ans: q => [Math.max(1, +q.ans - 1), 1],
  step: (q, s, i, d) => (s[i] + d < 0 || s[0] + s[1] + d > q.m.total ? null : s.map((x, j) => (j == i ? x + d : x))),
  draw: (q, s) => VIZ.tenFrame(s[0] + s[1], q.m.total, {b: s[1]}),
  ctl: () => `<div class="mmc mmcol">${[['blue', 'ls-d1'], ['orange', 'ls-d2']].map(([c, k], i) => `<div class="mms"><span class="mml"><i class="ls-dot ${k}" aria-hidden="true"></i></span>`
    + `${mmBtn(i, -1, 'minus', 'Take away a ' + c + ' one')}<output class="mmn" data-o="${i}">0</output>${mmBtn(i, 1, 'plus', 'Put in a ' + c + ' one')}</div>`).join('')}</div>`,
};
