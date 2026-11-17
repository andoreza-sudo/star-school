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
// The misconception codes for batch 1 (eight). A question carries q.bug {code: [values]}: the answers a child who holds that idea
// would give. A wrong answer adds one to each code that predicts it.
const BUGS = {
  off1: 'one too many or one too few (a counter counted twice, or one missed)',
  given: 'answers with a number that is already shown',
  op: 'adds instead of taking away (or the other way round)',
  all: 'counts them all and forgets to take away',
  ten: 'forgets the ten (or counts it as one)',
  swap: 'reads the tens and ones the wrong way round (14 as 41)',
  small: 'picks the smaller one as bigger (the sign turned round)',
  back: 'counts the wrong way (on instead of back)',
};
const lsBugsOf = (q, v) => Object.keys(q.bug || {}).filter(c => BUGS[c] && (q.bug[c] || []).some(x => String(x) === String(v)));
// one first try in a lesson: stage level, and a misconception tally for a wrong value
function knowAdd(id, q, v, ok, S0 = S) {
  const k = lsKnow(id, S0), l = k.lv[Math.max(0, Math.min(2, q.st | 0))];
  l[1]++;
  if (ok) l[0]++;
  else for (const c of lsBugsOf(q, v)) k.b[c] = (k.b[c] || 0) + 1;
}
// the code the child shows most (2 or more wrong answers), else null: the pet makes that mistake in Check me
function knowHeld(id, S0 = S) {
  const b = (S0.know && S0.know[id] && S0.know[id].b) || {};
  let best = null;
  for (const c in b) if (b[c] >= 2 && (!best || b[c] > b[best])) best = c;
  return best;
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
/* planToday(S, day, p): the next lesson in the chosen subject (owner decision 1: the child picks the subject; only math has lessons in
   batch 1), the pure function of TEACH-PLAN-2 system D at batch 1 size:
     1. a lesson left part way (S.les) whose stop is open;   2. else the first of the twelve, in map order, that is open, not passed
        and not learned (a stop passed in Practice is not offered again as new; it comes back in Remember).
   remember: the most overdue learned lesson, never today's (one item: owner decision 2); with none due, the last stop passed in
   Practice that no lesson has taught; or none.
   Returns {id, i (the stop's index on the map), kind 'new' | 'again', remember: [ids]} or null. */
function planToday(S0, day, p = 'math') {
  if (p != 'math') return null;
  const at = id => NODES.math.findIndex(n => nid(n) === id), open = id => { const i = at(id); return i >= 0 && unlocked('math', i); };
  const K = S0.know || {};
  let id = S0.les && LESSONS[S0.les.n] && open(S0.les.n) ? S0.les.n : null, kind = id ? 'again' : 'new';
  if (!id) id = LS_IDS.filter(x => at(x) >= 0).sort((a, b) => at(a) - at(b)).find(x => open(x) && !passed('math', at(x)) && !((K[x] || {}).s >= 2)) || null;
  if (!id) return null;
  const due = LS_IDS.filter(x => x !== id && K[x] && K[x].s >= 2 && K[x].due <= day).sort((a, b) => K[a].due - K[b].due);
  // nothing due: a stop passed in Practice that no lesson has taught yet (the tutor has not seen it: TEACH-PLAN-2 system D)
  const seen = LS_IDS.filter(x => x !== id && at(x) >= 0 && passed('math', at(x)) && !((K[x] || {}).s >= 2));
  return {id, i: at(id), kind, remember: (due.length ? due : seen.slice(-1)).slice(0, 1)};
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
