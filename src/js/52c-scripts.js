/* ---------- TEACH-1: the twelve hand-written lesson scripts (part teach) ----------
   One entry per stop, keyed by its node id (nid in 42-paths.js). Words are written here; every number a line says or shows comes
   from the question or from the child's own build, so a script cannot state a wrong fact (TEACH-PLAN-2 system F).
   An entry:
     sk, lv     the stop (its node id is sk + lv)          t     the stop's name (as on the map)
     idea       the one sentence of Name it (the notebook line later)
     test       the stage of the "show me" items (test-out and pre-check) and of Show (the post-check): 1 picture, 2 symbols, 3 a typed
                symbols item for a stop whose symbols stage is a choice (so two lucky taps cannot test out)
     q(stage, r)  a question at stage 0 (build on the model), 1 (the picture and a pad) or 2 (symbols only); r is the lesson's rng
     exp(r)     Explore: an open task {q, goal, nudge} and react(v) -> {lines, ctx} (no wrong answer, only "not yet")
     name(ctx, r) Name it: {html, lines} built on what the child made in Explore
     pet(r, code) Check me: {q, pv, says, code}: the pet's own answer pv to q (wrong by the misconception code, or right)
     bugs       the misconception codes the pet may show (the first is the default; the child's own tally wins, 52b-know.js)
     home       tonight's question for a grown-up ({name} is the child)
   The questions are ordinary question objects (kinds num, make, line, choice) that KIND renders, plus:
     q.st       the stage;  q.bug {code: [wrong values]} what a child holding that misconception would answer;
     q.goal     (make, line) a checker name from LSGOAL instead of one right answer;  q.s0 a start state for make (the pet's build).
   Lines are short: 12 words or fewer for Pre-K to 1st (tools/test.js checks it), and never a theme from the banned list. */
const lsRi = (r, a, b) => a + Math.floor(r() * (b - a + 1));
const lsEq = t => `<div class="eq">${t}</div>`;
const lsAsk = t => `<div class="sub pktxt">${t}</div>`;
const lsQm = '<b class="ls-qm">?</b>';
const lsTO = (t, o) => `${t} ten${t == 1 ? '' : 's'} and ${o} one${o == 1 ? '' : 's'}`; // 1 ten and 4 ones
// a question object; o.say is required, o.bug the misconception values, pk: Kindergarten (spoken, big speaker)
function lsQ(sk, lv, st, o) {
  const q = Object.assign({sk, lv, st, pk: true, auto: true, label: o.label || sk + lv + ' ' + o.ans}, o);
  q.ans = String(o.ans);
  q.bug = {};
  for (const c in o.bug || {}) q.bug[c] = o.bug[c].filter(v => String(v) !== q.ans);
  if (!q.goal && q.bug.off1 == null && /^\d+$/.test(q.ans)) q.bug.off1 = [+q.ans - 1, +q.ans + 1].filter(x => x >= 0);
  return q;
}
// the ten frame to build on: n counters to put in, total 5, 10 or 20, fixed already in (another colour), s0 a start state
function lsFrame(sk, lv, st, n, total, o = {}) {
  return lsQ(sk, lv, st, Object.assign({kind: 'make', model: 'frame', m: {total, fixed: o.fixed || 0}, eq: 'value', ans: n}, o));
}
const lsB10 = (sk, lv, st, n, o) => lsQ(sk, lv, st, Object.assign({kind: 'make', model: 'b10', m: {places: 2}, eq: 'value', ans: n}, o));
const lsNum = (sk, lv, st, ans, html, say, o) => lsQ(sk, lv, st, Object.assign({kind: 'num', ans, html, say}, o));
function lsPick(sk, lv, st, ans, html, say, ch, o) {
  return lsQ(sk, lv, st, Object.assign({kind: 'choice', ans, html, say, cls: 'syms', choices: ch.map(c => ({v: String(c[0]), l: String(c[1] != null ? c[1] : c[0])}))}, o));
}
function lsLine(sk, lv, st, ans, line, html, say, o) {
  const start = o && o.start != null ? o.start : (+ans === line.min ? line.max : line.min);
  return lsQ(sk, lv, st, Object.assign({kind: 'line', line, snap: 1, ans, start: String(start), html, say}, o));
}
// the hint picture for a ten-frame fact
const lsFrameHint = (n, total, o, s) => ({k: 'html', html: `<div class="pkhint">${VIZ.tenFrame(n, total, o || {})}<div>${s}</div></div>`, w: s});
// an open two-colour frame (Explore): any build, or one that fills the frame (goal fill), or one that makes m.target (goal sum)
const lsFrame2 = (sk, lv, total, goal, o = {}) => lsQ(sk, lv, 0, Object.assign({kind: 'make', model: 'frame2', m: {total, target: o.target}, eq: 'value',
  ans: o.target || total, goal}, o));

const LESSONS = {
  pk_count3: {sk: 'pk_count', lv: 3, t: 'Count to 20', test: 1, idea: 'Count the full ten, then count on.', bugs: ['off1', 'ten'],
    q(st, r) {
      const n = lsRi(r, 11, 19);
      if (st == 0) return lsFrame('pk_count', 3, 0, n, 20, {html: lsEq(n) + lsAsk(`Make ${n}.`), say: `Make ${n}. Fill the top ten, then count on.`,
        hint: lsFrameHint(10, 20, {}, `Ten first. Then ${n - 10} more.`)});
      if (st == 1) return lsNum('pk_count', 3, 1, n, `<div class="pkq">${VIZ.tenFrame(n, 20)}</div>${SLOT}`, 'How many? Count the full ten, then count on.',
        {hint: lsFrameHint(n, 20, {b: n - 10}, `Ten and ${n - 10} more.`), bug: {ten: [n - 10]}});
      return lsNum('pk_count', 3, 2, n + 1, `<div class="seq">${n}, ${lsQm}</div>${SLOT}`, `What comes after ${n}?`, {hint: {k: 'text', s: `Count on from ${n}: one more.`, w: `Count on from ${n}. One more.`}, bug: {given: [n]}});
    },
    exp: () => ({q: lsFrame('pk_count', 3, 0, 20, 20, {html: lsAsk('Put in as many as you like!'), say: 'Put in as many counters as you like!', goal: 'any'}),
      react: v => ({ctx: {n: +v}, lines: +v > 10 ? [`You made ${v}!`, `That is ten and ${v - 10} more.`] : [`You made ${v}!`]})}),
    name: c => {
      const n = c.n > 10 ? c.n : 14;
      return {html: `<div class="pkq">${VIZ.tenFrame(n, 20, {b: n - 10})}</div>` + lsEq(`10 and ${n - 10} is ${n}`),
        lines: ['A full frame is ten.', `Ten and ${n - 10} more is ${n}.`, 'Count the full ten, then count on.']};
    },
    home: 'Ask {name} to count 14 toys: ten first, then four more.'},

  tenf1: {sk: 'tenf', lv: 1, t: 'Ten Frames', test: 1, idea: 'The top row holds five.', bugs: ['off1'],
    q(st, r) {
      if (st == 0) {
        const n = lsRi(r, 3, 10);
        return lsFrame('tenf', 1, 0, n, 10, {html: lsEq(n) + lsAsk(`Make ${n}.`), say: `Make ${n}. Tap the ten frame to put in ${n} counters.`,
          hint: lsFrameHint(Math.min(n, 5), 10, {}, n > 5 ? `Fill the top row: five. Then ${n - 5} more.` : 'Count as you tap.')});
      }
      if (st == 1) {
        const n = lsRi(r, 4, 10);
        return lsNum('tenf', 1, 1, n, `<div class="pkq">${VIZ.tenFrame(n, 10)}</div>${SLOT}`, 'How many counters?',
          {hint: lsFrameHint(n, 10, {b: Math.max(0, n - 5)}, n > 5 ? `Five on top and ${n - 5} more.` : 'Count them one by one.')});
      }
      const k = lsRi(r, 1, 5);
      return lsNum('tenf', 1, 2, 5 + k, lsEq(`5 + ${k} = ${SLOT}`), `5 and ${k} more makes what?`, {hint: lsFrameHint(5 + k, 10, {b: k}, `Five and ${k} more.`), bug: {given: [5, k]}});
    },
    exp: () => ({q: lsFrame('tenf', 1, 0, 10, 10, {html: lsAsk('Fill it any way you like!'), say: 'Put in as many counters as you like!', goal: 'any'}),
      react: v => ({ctx: {n: +v}, lines: +v >= 5 ? [`You made ${v}.`, +v == 5 ? 'Five fills the top row!' : `Five on top and ${v - 5} more.`]
        : [`You made ${v}.`, `${5 - v} more fills the top row.`]})}),
    name: c => {
      const n = c.n > 5 ? c.n : 7;
      return {html: `<div class="pkq">${VIZ.tenFrame(n, 10, {b: n - 5})}</div>` + lsEq(`5 and ${n - 5} is ${n}`),
        lines: ['The top row holds five.', `Five and ${n - 5} more is ${n}.`]};
    },
    home: 'Ask {name}: "Show me 7 fingers. Is it five and some more?"'},

  tenf2: {sk: 'tenf', lv: 2, t: 'Make Ten', test: 2, idea: 'Two parts make ten.', bugs: ['off1', 'given'],
    q(st, r) {
      const f = lsRi(r, 1, 9), hint = lsFrameHint(f, 10, {}, 'Count the empty boxes.');
      if (st == 0) return lsFrame('tenf', 2, 0, 10 - f, 10, {fixed: f, html: lsAsk(`There are ${f}. Fill it to make 10.`),
        say: `There are ${f} counters. Put in more to make 10.`, hint, bug: {given: [f]}});
      if (st == 1) return lsNum('tenf', 2, 1, 10 - f, `<div class="pkq">${VIZ.tenFrame(f, 10)}</div>${SLOT}`, 'How many more to make ten?', {hint, bug: {given: [f]}});
      return lsNum('tenf', 2, 2, 10 - f, lsEq(`${f} + ${SLOT} = 10`), `${f} and how many make ten?`, {hint, bug: {given: [f], op: [10 + f]}});
    },
    exp: () => ({q: lsFrame2('tenf', 2, 10, 'fill', {html: lsAsk('Fill the frame. Use both colours!'), say: 'Fill the whole frame. Use both colours. Any way you like!'}),
      nudge: 'Fill every box. Use both colours.',
      react: v => {
        const [a, b] = v;
        return {ctx: {a, b}, lines: [`You made ${a} and ${b}.`, `${a} and ${b} make ten!`]};
      }}),
    name: c => ({html: `<div class="pkq">${VIZ.tenFrame(10, 10, {b: c.b})}</div>` + lsEq(`${c.a} + ${c.b} = 10`),
      lines: [`You made ${c.a} and ${c.b}.`, `${c.a} and ${c.b} make ten.`, 'Two parts make ten.']}),
    home: 'Ask {name}: "If I hold up 7 fingers, how many more make 10?"'},

  tenf3: {sk: 'tenf', lv: 3, t: 'Ten and More', test: 2, idea: 'Ten and some more make the teens.', bugs: ['ten', 'off1'],
    q(st, r) {
      const k = lsRi(r, 1, 9), n = 10 + k, hint = lsFrameHint(n, 20, {b: k}, `Ten and ${k} more.`);
      if (st == 0) return lsFrame('tenf', 3, 0, k, 20, {fixed: 10, html: lsEq(n) + lsAsk(`Ten is in. Make ${n}.`), say: `Ten counters are in. Put in more to make ${n}.`, hint, bug: {ten: [n]}});
      if (st == 1) return lsNum('tenf', 3, 1, n, `<div class="pkq">${VIZ.tenFrame(n, 20)}</div>${SLOT}`, 'How many? Ten, and count on.', {hint, bug: {ten: [k]}});
      return lsNum('tenf', 3, 2, n, lsEq(`10 + ${k} = ${SLOT}`), `Ten and ${k} more make what?`, {hint, bug: {ten: [k]}});
    },
    exp: () => ({q: lsFrame('tenf', 3, 0, 10, 20, {fixed: 10, html: lsAsk('Ten is in. Put in some more!'), say: 'Ten counters are in. Put in as many more as you like!', goal: 'any'}),
      react: v => ({ctx: {k: +v}, lines: [`Ten and ${v} make ${10 + +v}.`]})}),
    name: c => ({html: `<div class="pkq">${VIZ.tenFrame(10 + c.k, 20, {b: c.k})}</div>` + lsEq(`10 + ${c.k} = ${10 + c.k}`),
      lines: ['A full frame is ten.', `Ten and ${c.k} more make ${10 + c.k}.`]}),
    home: 'Ask {name}: "What is ten and three more?"'},

  add4: {sk: 'add', lv: 4, t: 'Add to 5', test: 2, idea: 'Put the parts together and count them all.', bugs: ['off1', 'given'],
    q(st, r) {
      const a = lsRi(r, 1, 4), b = lsRi(r, 1, 5 - a), c = a + b, hint = lsFrameHint(c, 5, {b}, `${a} and ${b} more. Count them all.`), bug = {given: [a, b]};
      if (st == 0) return lsFrame('add', 4, 0, c, 5, {html: lsEq(`${a} + ${b}`) + lsAsk(`Put in ${a}, then ${b} more.`), say: `${a} plus ${b}. Put in ${a}, then ${b} more.`, hint, bug});
      if (st == 1) return lsNum('add', 4, 1, c, `<div class="pkq">${VIZ.tenFrame(c, 5, {b})}</div>` + lsEq(`${a} + ${b} = ${SLOT}`), `${a} plus ${b} equals what?`, {hint, bug});
      return lsNum('add', 4, 2, c, lsEq(`${a} + ${b} = ${SLOT}`), `${a} plus ${b} equals what?`, {hint, bug});
    },
    exp: () => ({q: lsFrame2('add', 4, 5, 'both', {html: lsAsk('Use both colours!'), say: 'Put in some blue and some orange. Any way you like!'}),
      nudge: 'Use both colours.',
      react: ([a, b]) => ({ctx: {a, b}, lines: [`${a} and ${b} make ${a + b}.`]})}),
    name: c => ({html: `<div class="pkq">${VIZ.tenFrame(c.a + c.b, 5, {b: c.b})}</div>` + lsEq(`${c.a} + ${c.b} = ${c.a + c.b}`),
      lines: [`${c.a} and ${c.b} make ${c.a + c.b}.`, `We write ${c.a} plus ${c.b} equals ${c.a + c.b}.`]}),
    home: 'Ask {name}: "You have 2 apples and get 3 more. How many now?"'},

  add1: {sk: 'add', lv: 1, t: 'Adding to 10', test: 2, idea: 'Put the parts together and count them all.', bugs: ['given', 'off1'],
    q(st, r) {
      const a = lsRi(r, 1, 8), b = lsRi(r, 1, 10 - a), c = a + b, hint = lsFrameHint(c, 10, {b}, `${a} and ${b} more. Count them all.`), bug = {given: [a, b]};
      if (st == 0) return lsFrame('add', 1, 0, c, 10, {html: lsEq(`${a} + ${b}`) + lsAsk(`Put in ${a}, then ${b} more.`), say: `${a} plus ${b}. Put in ${a}, then ${b} more.`, hint, bug});
      if (st == 1) return lsNum('add', 1, 1, c, `<div class="pkq">${VIZ.tenFrame(c, 10, {b})}</div>` + lsEq(`${a} + ${b} = ${SLOT}`), `${a} plus ${b} equals what?`, {hint, bug});
      return lsNum('add', 1, 2, c, lsEq(`${a} + ${b} = ${SLOT}`), `${a} plus ${b} equals what?`, {hint, bug});
    },
    exp: () => ({q: lsFrame2('add', 1, 10, 'both', {html: lsAsk('Use both colours!'), say: 'Put in some blue and some orange. Any way you like!'}),
      nudge: 'Use both colours.',
      react: ([a, b]) => ({ctx: {a, b}, lines: [`${a} and ${b} make ${a + b}.`]})}),
    name: c => ({html: `<div class="pkq">${VIZ.tenFrame(c.a + c.b, 10, {b: c.b})}</div>` + lsEq(`${c.a} + ${c.b} = ${c.a + c.b}`),
      lines: [`${c.a} blue and ${c.b} orange.`, `${c.a} plus ${c.b} equals ${c.a + c.b}.`]}),
    home: 'Ask {name}: "4 cars and 3 more cars. How many cars?"'},

  sub1: {sk: 'sub', lv: 1, t: 'Take Away', test: 2, idea: 'Take some away, then count what is left.', bugs: ['all', 'op'],
    q(st, r) {
      const a = lsRi(r, 4, 10), b = lsRi(r, 1, a - 1), c = a - b, hint = lsFrameHint(a, 10, {fade: b}, `Take away ${b}. Count what is left.`);
      const bug = {all: [a], op: a + b <= 20 ? [a + b] : [], given: [b]};
      if (st == 0) return lsFrame('sub', 1, 0, c, 10, {s0: [a], html: lsEq(`${a} − ${b}`) + lsAsk(`Take away ${b}.`), say: `There are ${a}. Take away ${b}.`, hint, bug});
      if (st == 1) return lsNum('sub', 1, 1, c, `<div class="pkq">${VIZ.tenFrame(a, 10, {fade: b})}</div>` + lsEq(`${a} − ${b} = ${SLOT}`), `${a} minus ${b} equals what?`, {hint, bug});
      return lsNum('sub', 1, 2, c, lsEq(`${a} − ${b} = ${SLOT}`), `${a} minus ${b} equals what?`, {hint, bug});
    },
    exp: r => {
      const a = lsRi(r, 6, 9);
      return {q: lsFrame('sub', 1, 0, a - 1, 10, {s0: [a], html: lsAsk(`There are ${a}. Take some away!`), say: `There are ${a} counters. Take some away. Any number you like!`, goal: 'less'}),
        nudge: 'Tap a counter to take it away.',
        react: v => ({ctx: {a, k: a - v}, lines: [`${a} take away ${a - v} leaves ${v}.`]})};
    },
    name: c => ({html: `<div class="pkq">${VIZ.tenFrame(c.a, 10, {fade: c.k})}</div>` + lsEq(`${c.a} − ${c.k} = ${c.a - c.k}`),
      lines: [`We had ${c.a}.`, `We took away ${c.k}. ${c.a - c.k} are left.`, `${c.a} minus ${c.k} equals ${c.a - c.k}.`]}),
    home: 'Ask {name}: "You have 6 grapes and eat 2. How many are left?"'},

  miss1: {sk: 'miss', lv: 1, t: 'Missing Number', test: 2, idea: 'Count on from the part you have to the whole.', bugs: ['op', 'given'],
    q(st, r) {
      const a = lsRi(r, 1, 6), t = lsRi(r, a + 1, 10), k = t - a, hint = lsFrameHint(t, 10, {b: k}, `Count on from ${a} to ${t}.`), bug = {op: a + t <= 20 ? [a + t] : [], given: [a, t]};
      if (st == 0) return lsFrame('miss', 1, 0, k, 10, {fixed: a, html: lsEq(`${a} + ${lsQm} = ${t}`) + lsAsk(`Put in more to make ${t}.`), say: `${a} and how many make ${t}? Put in more to make ${t}.`, hint, bug});
      if (st == 1) return lsNum('miss', 1, 1, k, `<div class="pkq">${VIZ.tenFrame(a, 10)}</div>` + lsEq(`${a} + ${SLOT} = ${t}`), `${a} plus what equals ${t}?`, {hint, bug});
      return lsNum('miss', 1, 2, k, lsEq(`${a} + ${SLOT} = ${t}`), `${a} plus what equals ${t}?`, {hint, bug});
    },
    exp: r => {
      const t = lsRi(r, 5, 9);
      return {q: lsFrame2('miss', 1, 10, 'sum', {target: t, html: lsEq(t) + lsAsk(`Make ${t} with both colours!`), say: `Make ${t}. Use both colours, any way you like!`}),
        nudge: `Make ${t}. Use both colours.`,
        react: ([a, b]) => ({ctx: {a, b, t}, lines: [`${a} and ${b} make ${t}.`, `So ${a} and ${b} more make ${t}.`]})};
    },
    name: c => ({html: `<div class="pkq">${VIZ.tenFrame(c.t, 10, {b: c.b})}</div>` + lsEq(`${c.a} + ${c.b} = ${c.t}`),
      lines: [`You had ${c.a}. You put in ${c.b} more.`, `${c.a} plus ${c.b} equals ${c.t}.`, 'The missing number is the part you put in.']}),
    home: 'Ask {name}: "I have 3 blocks. How many more to make 8?"'},

  cnt4: {sk: 'cnt', lv: 4, t: 'Count On & Back', test: 2, idea: 'Count on: one more each time. Count back: one less.', bugs: ['back', 'off1'],
    q(st, r) {
      const on = r() < .5, n = lsRi(r, 2, 17), ans = on ? n + 1 : n - 1, m = n > 10 || ans > 10 ? 10 : 0, line = {min: m, max: m + 10, step: 1, labels: 'all', marks: [n]};
      const hint = {k: 'html', html: `<div class="pkhint">${VIZ.numLine({min: m, max: m + 10, labels: 'all', hops: [[n, ans, on ? '+1' : '−1']]})}<div>${on ? 'One more: a hop forward.' : 'One less: a hop back.'}</div></div>`, w: on ? 'One more is one hop forward.' : 'One less is one hop back.'};
      const bug = {back: [on ? n - 1 : n + 1], given: [n]};
      if (st == 0) return lsLine('cnt', 4, 0, ans, line, lsEq(n) + lsAsk(on ? `One more than ${n}?` : `One less than ${n}?`),
        `Put the pin on one ${on ? 'more' : 'less'} than ${n}.`, {hint, bug, start: ans == m ? m + 10 : m});
      if (st == 1) {
        const s = on ? [n - 1, n, ans] : [n + 1, n, ans], lo = Math.max(0, Math.min(...s) - 1), hi = lo + 6;
        return lsNum('cnt', 4, 1, ans, `<div class="pkq">${VIZ.numLine({min: lo, max: hi, labels: 'all', hide: [ans]})}</div>${SLOT}`, 'Which number is hiding?', {hint, bug});
      }
      const s = on ? [n - 2, n - 1, n, ans] : [n + 2, n + 1, n, ans];
      return lsNum('cnt', 4, 2, ans, `<div class="seq">${s.slice(0, 3).join(', ')}, ${lsQm}</div>${SLOT}`, `${on ? 'Count on' : 'Count back'}. ${s.slice(0, 3).join(', ')}, what comes next?`, {hint, bug});
    },
    exp: () => ({q: lsLine('cnt', 4, 0, 10, {min: 0, max: 10, step: 1, labels: 'all'}, lsAsk('Put the pin on any number!'), 'Put the pin on any number you like!', {goal: 'any', start: 0}),
      nudge: 'Move the pin to a number.',
      react: v => ({ctx: {n: +v}, lines: +v > 0 && +v < 10 ? [`You picked ${v}.`, `One more is ${+v + 1}. One less is ${v - 1}.`] : [`You picked ${v}.`]})}),
    name: c => {
      const n = c.n > 0 && c.n < 10 ? c.n : 5;
      return {html: `<div class="pkq">${VIZ.numLine({min: 0, max: 10, labels: 'all', hops: [[n, n + 1, '+1'], [n, n - 1, '−1']]})}</div>`,
        lines: ['Count on: each hop is one more.', 'Count back: each hop is one less.', `One more than ${n} is ${n + 1}.`]};
    },
    home: 'Ask {name} to count back from 15 to 10.'},

  pk_more2: {sk: 'pk_more', lv: 2, t: 'More, Fewer, Same', test: 1, idea: 'Match them up. The group with some left over has more.', bugs: ['off1', 'given'],
    q(st, r) {
      const n = lsRi(r, 3, 8), w = st == 0 ? 0 : st == 1 ? 1 : -1, ans = n + w, word = ['the same as', 'one more than', 'one fewer than'][st];
      return lsFrame('pk_more', 2, st, ans, 10, {html: `<div class="pkq">${VIZ.dots(n, 'row')}</div>` + lsAsk(`Make ${word} this.`),
        say: `Make ${word} the dots.`, label: `make ${word} ${n}`, bug: {given: w ? [n] : []},
        hint: lsFrameHint(n, 10, {}, st == 0 ? 'Match each dot with a counter.' : st == 1 ? 'Match each dot. Then put in one more.' : 'Match each dot. Then take one away.')});
    },
    exp: () => ({q: lsFrame2('pk_more', 2, 10, 'both', {html: lsAsk('Put in blue and orange!'), say: 'Put in some blue and some orange. Any way you like!'}),
      nudge: 'Use both colours.',
      react: ([a, b]) => ({ctx: {a, b}, lines: [`You made ${a} blue and ${b} orange.`, a > b ? 'Blue has more.' : a < b ? 'Orange has more.' : 'They are the same!']})}),
    name: c => {
      const a = c.a != c.b ? c.a : 6, b = c.a != c.b ? c.b : 4, big = Math.max(a, b);
      return {html: `<div class="pkq">${VIZ.dots(a, 'row')}</div><div class="pkq">${VIZ.dots(b, 'row', {b})}</div>`,
        lines: ['Match them up, one and one.', `${big - Math.min(a, b)} left over. That group has more.`, 'Nothing left over means the same.']};
    },
    home: 'Ask {name}: "Who has more socks, you or me?"'},

  pv1: {sk: 'pv', lv: 1, t: 'Tens & Ones', test: 2, idea: 'A rod is ten. A little cube is one.', bugs: ['swap', 'off1'],
    q(st, r) {
      const t = lsRi(r, 1, 5), o = lsRi(r, 1, 9), n = t * 10 + o, sw = o * 10 + t, bug = {swap: sw != n && sw < 100 ? [sw] : [], given: [t, o, t + o]};
      const hint = {k: 'html', html: `<div class="pkhint">${VIZ.base10(n)}<div>${lsTO(t, o)}.</div></div>`, w: `Count the rods by tens. Then the cubes by ones.`};
      if (st == 0) return lsB10('pv', 1, 0, n, {html: lsEq(n) + lsAsk(`Make ${n} with blocks.`), say: `Make ${n} with blocks: tens and ones.`, hint, bug, pk: false});
      if (st == 1) return lsNum('pv', 1, 1, n, `<div class="pkq">${VIZ.base10(n)}</div>${SLOT}`, 'How many blocks in all? Count the rods by tens.', {hint, bug, pk: false});
      return lsNum('pv', 1, 2, n, lsEq(`${lsTO(t, o)} = ${SLOT}`), `${lsTO(t, o)} make what number?`, {hint, bug, pk: false});
    },
    exp: () => ({q: lsB10('pv', 1, 0, 99, {html: lsAsk('Make any number with blocks!'), say: 'Make any number you like with rods and cubes!', goal: 'any', pk: false}),
      react: v => ({ctx: {n: +v}, lines: [`You made ${lsTO(Math.floor(v / 10), v % 10)}.`, `That is ${v}.`]})}),
    name: c => {
      const n = c.n > 10 && c.n % 10 ? c.n : 34, t = Math.floor(n / 10), o = n % 10;
      return {html: `<div class="pkq">${VIZ.base10(n)}</div>` + lsEq(`${lsTO(t, o)} = ${n}`),
        lines: ['A rod is ten. A little cube is one.', `${lsTO(t, o)} make ${n}.`, 'The tens digit comes first.']};
    },
    home: 'Ask {name}: "How many tens are in 34?"'},

  cmp1: {sk: 'cmp', lv: 1, t: 'Bigger or Smaller', test: 3, idea: 'Bigger numbers sit further along the number line.', bugs: ['small'],
    q(st, r) {
      let a = lsRi(r, 2, 19), b = lsRi(r, 2, 19);
      if (a == b && r() < .7) b = b < 19 ? b + 1 : b - 1;
      const ans = a > b ? '>' : a < b ? '<' : '=', bug = {small: ans == '=' ? [] : [ans == '>' ? '<' : '>']};
      const hint = {k: 'html', html: `<div class="pkhint">${VIZ.numLine({min: 0, max: 20, labels: [0, 5, 10, 15, 20], marks: [a, b]})}<div>Further along is bigger.</div></div>`, w: 'The number further along the line is bigger.'};
      if (st == 3) {
        if (a == b) b = a < 19 ? a + 1 : a - 1;
        return lsNum('cmp', 1, 2, Math.max(a, b), lsEq(`${a} or ${b}?`) + k2Sub('Type the bigger number.') + SLOT, `Which is bigger, ${a} or ${b}? Type the bigger number.`,
          {hint, bug: {small: [Math.min(a, b)]}, pk: false});
      }
      if (st == 0) {
        const m = lsRi(r, 3, 15);
        return lsB10('cmp', 1, 0, m + 1, {goal: 'gt', target: m, html: lsEq(m) + lsAsk(`Make a number bigger than ${m}.`), say: `Make any number bigger than ${m}.`,
          hint: {k: 'html', html: `<div class="pkhint">${VIZ.base10(m)}<div>Put in one more cube, or more.</div></div>`, w: 'Put in more blocks than this.'}, bug: {given: [m]}, pk: false});
      }
      const html = (st == 1 ? `<div class="pkq">${VIZ.numLine({min: 0, max: 20, labels: [0, 5, 10, 15, 20], marks: [a, b]})}</div>` : '') + lsEq(`${a} ${SLOT} ${b}`) + k2Sub('Bigger, smaller, or the same?');
      return lsPick('cmp', 1, st, ans, html, `Is ${a} greater than, less than, or equal to ${b}?`, [['<'], ['='], ['>']], {hint, bug, pk: false, after: `${a} is ${ans == '>' ? 'greater than' : ans == '<' ? 'less than' : 'equal to'} ${b}`});
    },
    exp: () => ({q: lsLine('cmp', 1, 0, 5, {min: 0, max: 10, step: 1, labels: 'all'}, lsAsk('Put the pin on any number!'), 'Put the pin on any number you like!', {goal: 'any', start: 0, pk: false}),
      nudge: 'Move the pin to a number.',
      react: v => ({ctx: {n: +v}, lines: [`You picked ${v}.`, +v < 10 ? `${+v + 1} is further along. It is bigger.` : 'Ten is the biggest here!']})}),
    name: c => {
      const a = c.n > 0 && c.n < 20 ? c.n : 12, b = a > 6 ? a - 5 : a + 5;
      return {html: `<div class="pkq">${VIZ.numLine({min: 0, max: 20, labels: [0, 5, 10, 15, 20], marks: [a, b]})}</div>` + lsEq(`${Math.max(a, b)} > ${Math.min(a, b)}`),
        lines: ['Bigger numbers sit further along the line.', `${Math.max(a, b)} is greater than ${Math.min(a, b)}.`, 'The open side faces the bigger number.']};
    },
    home: 'Ask {name}: "Which is bigger, 38 or 83?"'},
};
// the lessons in map order (the planner and the map offer walk this list)
const LS_IDS = Object.keys(LESSONS);

/* The pet's tone at each age (owner decision 3, 2026-11-17). The pet grows up with the grade setting: the same friend, older.
   It never changes form and has no powers. Only the little one is live in batch 1 (the twelve
   lessons are Kindergarten and 1st grade); batch 2 adds the older looks and wires the other two.
     little   Pre-K to 2nd. Warm and playful. Short lines (12 words or fewer), lots of "we" and "let's", big praise, says the
              child's name. Hands-on first; asks "Check me!" as a game. Every line is spoken.
     kid      3rd and 4th. An older kid: friendly, a little jokey, praise names what was done ("You lined up the tens"), not just
              "Super!". Lines up to 16 words. More "you try", fewer hints.
     teen     5th and 6th. A teen-like partner: calm, dry, no baby praise ("Nice." "That holds up."). Asks the child to check
              its work and to "give me a hard one". Lines up to 20 words; never talks down. */
const LS_TONE = {
  little: {hi: n => `Hi ${n}! Let's learn together.`, yay: ['Yes!', 'You got it!', 'Super!', 'Hooray!', 'Great job!'], help: 'Look! Let me help.',
    tryMore: "Let's look at it together.", testOut: 'You know this! Show me!', showMe: 'Your turn to show me!', myTurn: 'My turn. Check me!',
    caught: 'You caught my mistake!', fooled: 'Look again. I made a mistake!', rightMe: 'Yes, I got it right!', wrongMe: 'I was right this time!',
    fixIt: 'Can you fix it?', win: 'We did it!', bye: n => `Great learning, ${n}!`, rem: 'Do you remember this?'},
  kid: {hi: n => `Hey ${n}. New idea today.`, yay: ['Nice work.', 'You got it.', 'Right on.', 'Exactly.'], help: 'Here is a picture to help.',
    tryMore: 'Try it with the picture.', testOut: 'Looks like you know this. Prove it!', showMe: 'Show me what you know.',
    myTurn: 'My turn. Check my work.', caught: 'Good catch. I slipped there.', fooled: 'Look closer. I slipped.', rightMe: 'Yep, that one was right.',
    wrongMe: 'Actually, I had it right.', fixIt: 'Fix it for me?', win: 'Nailed it.', bye: n => `Good work today, ${n}.`, rem: 'Remember this one?'},
  teen: {hi: n => `Hey ${n}. Here is today's idea.`, yay: ['Nice.', 'Correct.', 'That holds up.', 'Clean.'], help: 'Picture it first.',
    tryMore: 'Use the model.', testOut: 'You might know this already. Show me.', showMe: 'Your call.', myTurn: 'My turn. Check my work.',
    caught: 'Fair. I got that wrong.', fooled: 'Look again. That one was wrong.', rightMe: 'That one was fine.', wrongMe: 'That one was actually right.',
    fixIt: 'Fix it.', win: 'Done.', bye: n => `Good session, ${n}.`, rem: 'Quick one from before.'},
};
// the pet's age for a grade: little one (Pre-K to 2), older kid (3, 4), teen-like (5, 6)
const lsAge = g => g <= 2 ? 'little' : g <= 4 ? 'kid' : 'teen';
const lsTone = () => LS_TONE[lsAge(typeof gradeOf == 'function' ? gradeOf() : 0)];
