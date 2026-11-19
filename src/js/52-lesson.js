/* ---------- TEACH-1: "Sparky teaches", the lesson (part teach; docs/TEACH-PLAN-2.md, batch 1) ----------
   A lesson is a short class the child's pet runs, about 3 minutes (owner decision 2): it always opens with two "show me" items and
   always ends on a win.
     pre    2 items, one try, no help: the pre-check of the measure, and the test-out (both right: straight to Show)
     rem    Remember: 1 item from a learned lesson that is due (none on the first lessons); help on a miss
     exp    Explore: 1 open task on the model (no wrong answer, only "not yet")
     name   Name it: the pet names the idea on what the child made (spoken lines, the picture with its numbers)
     tog    Together: 3 items, help that fades (build, then picture, then symbols); a miss shows the picture, lets the child try
            again, and the next item drops one stage
     chk    Check me: the pet's own announced turn ("My turn. Check me!"). It is the ONLY place the pet is ever wrong (owner rule):
            the child marks the pet's answer right or not, and fixes it when it is not. About one time in four the pet is right.
     show   Show: 2 items, one try, no help: the post-check of the measure; both right passes the stop
     win    when Show was not both right: one more build with the picture and help, so the lesson ends on a success
   The six beats of the plan are rem, exp, name, tog, chk, show (the dots in the top bar); pre and win frame them.
   The state machine (LS.make, LS.cur, LS.answer, LS.next, LS.finish, LS.record) has no DOM: tools/test.js runs it in Node with
   simulated children. The screen (LS.start, LS.show, LS.submit, LS.end) renders the items with KIND like placement does (PL) and
   never touches the round (G, check, next, finish). Nothing in a lesson needs reading: every line is spoken by say() (tablet voice
   or a recording) for Pre-K to 1st, captions are short, and the answer controls wake when the line has been said (cap 6 s).
   Saved: S.know, S.lm, S.lr, S.les (52b-know.js); the stop record the same way finish() writes it (LS.record).
   LS-STOP (owner, 2026-11-18): a lesson is a stop on the map (42b-lstop.js) and opens on a start card (LS.open) with two ways in:
     "Let's learn" (o.learn): no show-me items, straight into the teaching beats;
     "I already know this!" (o.know): the two show-me items (never two-choice); both right with no help goes to Show, and the first
     miss slides into the teaching beats at once (no "wrong" sound, no penalty: st.slide).
   Guessing never pays (o.proof, every lesson the screen starts): Check me goes on until the child finds a mistake of the pet's
   (st.caught), with at most two more turns in which the pet is always wrong; a pass pays only when it was proven (tested out, or
   caught). The pay (lsPay, 58-playtime.js) is in LS.record; the top bar's ticket meter shows what the lesson pays now and fills as
   the beats are done, and the end card lands the minutes in the bank. */
const LSB = ['pre', 'rem', 'exp', 'name', 'tog', 'chk', 'show', 'win'];
const LS_PIPS = [['rem', 'replay', 'Remember'], ['exp', 'blocks', 'Explore'], ['name', 'hint', 'Name it'], ['tog', 'users', 'Together'],
  ['chk', 'check-circle', 'Check me'], ['show', 'star', 'Show']];
const LS = {
  TOG: 3,        // Together items
  PET_OK: .25,   // how often the pet is right in Check me
  WAKE: 6000,    // the answer controls wake at the latest this long after a spoken line starts
  RUSH: 800,     // LS-STOP: an answer this soon after the controls woke is a rushed one (two or more: not a good try)
  /* fix179 (owner, 2026-11-18: practice is still required): the stars a passed lesson gives its practice stop (S.maps, LS.record). 0: a
     passed lesson OPENS its practice stop (lsGate reads the lesson's own record, S.know[nid].s >= 2) but does not pass it; the child
     plays the stop's practice round (paid as rounds are) to pass it and open the next stop. The end card leads to Practice and has no
     "Next stop unlocked" (rec.next reads unlocked()). A lesson never lowers or removes stars a stop already has. (2 was v179 before
     this decision: the lesson passed the stop, so a map could be crossed on test-outs alone.) */
  STOP_STARS: 0,
  st: null, u: null, seq: 0,
  // ---- the state machine ----
  // a new lesson. o: {seed, rem: [lesson ids due], day, S (the save; default S), at: beat to resume at, pre / post: results already
  // given, chkN: the extra Check me turns already given}
  make(id, o = {}) {
    // PLAY-01 (fix179 follow-up): a resumed one-try beat never asks an item the child has already seen there (S.les.q, LS.keep): its
    // fresh seed is drawn again (up to 12 times) while its first item is one of them
    if (Array.isArray(o.avoid) && o.avoid.length && !(o.seed >>> 0)) {
      let st = null;
      for (let k = 0; k < 12; k++) {
        st = LS.make(id, Object.assign({}, o, {avoid: null, seed: ((Math.random() * 4294967295) >>> 0) + 1}));
        const it = LS.cur(st);
        if (!it || !it.q || !o.avoid.includes(it.q.label)) break;
      }
      return st;
    }
    const L = LESSONS[id], seed = (o.seed >>> 0) || ((Math.random() * 4294967296) >>> 0);
    const st = {id, L, seed, r: mulberry32(seed + (o.at | 0)), b: -1, items: [], i: 0, pre: (o.pre || []).slice(), post: (o.post || []).slice(0, 2), to: false, ctx: {}, chk: [],
      rem: (o.rem || []).filter(x => LESSONS[x] && x !== id), day: o.day || 0, S: o.S || S, last: -1, drop: false, done: false,
      repair: BUGS[o.repair] ? o.repair : null, proof: !!o.proof, slide: !!o.know, caught: !!o.caught, chkN: Math.min(2, o.chkN | 0), rush: 0};
    if (o.at && st.pre.length == 2 && st.pre.every(Boolean) && o.at <= LSB.indexOf('show')) st.to = true;
    // fix179: a test-out already missed after "I already know this!" (the child left during the slide line) goes on into the teaching beats
    const at = !o.at && st.slide && st.pre.some(x => !x) ? 1 : o.at | 0;
    LS.beat(st, Math.max(0, Math.min(o.learn && !o.at ? 1 : at, LSB.indexOf('show')))); // LS-STOP: "Let's learn" starts at Remember
    return st;
  },
  /* fix179: the options that resume a lesson left part way (S.les, written by LS.keep). The teaching beats come back as they were (the
     same seed: the child loses nothing); the one-try items (the test-out, Show) and Check me get FRESH items (a new seed), with the
     answers already given kept (pre, post, the pet's mistake found), so a lesson left and resumed can never be passed, or paid, by
     remembering the questions. A Show or test-out item answered and then left during its line is never asked again. */
  resume(les, day) {
    const B = LSB[les.b | 0], fresh = ['pre', 'chk', 'show', 'win'].includes(B);
    return {seed: fresh ? 0 : les.s, at: les.b | 0, pre: les.pre, post: les.post, chkN: les.m, day, rem: [], repair: les.r, proof: true, know: !!les.k, caught: !!les.c,
      avoid: fresh && Array.isArray(les.q) ? les.q : null};
  },
  // fix179: the lesson's place in the save (S.les): the beat, its seed, the one-try answers given, how it started, the pet's mistake found
  keep(st) {
    if (!st || st.done) return;
    const o = {n: st.id, b: st.b, s: st.seed, pre: st.pre.slice()};
    if (st.post.length) o.post = st.post.slice();
    if (st.chkN) o.m = st.chkN;
    if (st.repair) o.r = st.repair;
    if (st.slide) o.k = 1; // LS-STOP: how the lesson was started, and the pet's mistake found
    if (st.caught) o.c = 1;
    const B = LSB[st.b]; // PLAY-01: the one-try items on show now, so a resumed beat never asks them again (LS.make avoid)
    if (B == 'pre' || B == 'show') o.q = st.items.map(x => x.q && x.q.label).filter(Boolean).slice(0, 2);
    st.S.les = o;
  },
  cur: st => (st.done ? null : st.items[st.i] || null),
  beat(st, b) {
    const L = st.L, r = st.r, T = lsTone(), B = LSB[b];
    st.b = b;
    st.i = 0;
    let it = [];
    if (B == 'pre') it = [0, 1].slice(st.pre.length).map(k => ({m: 'ask', one: 1, q: L.q(L.test, r), lines: k ? [] : [T.hi(lsName()), T.first]}));
    else if (B == 'rem') {
      // TEACH-UX: the line first says that building comes after this one item (T.remGo)
      it = st.rem.slice(0, 1).map(x => ({m: 'ask', help: 1, rem: x, q: LESSONS[x].q(LESSONS[x].test, r), lines: [T.remGo, T.rem]}));
      // TEACH-2b: nothing due, and the script has a warm-up on the idea it builds on: that, with the script's Remember line
      if (!it.length && L.warm) { const q = L.warm(r); it = [{m: 'ask', help: 1, warm: 1, q, lines: [T.remGo].concat(L.w ? lsW(L.w.beats.remember, 0, q.sl) : [T.rem])}]; }
      // TEACH-UX: Pre-K to 2nd grade (the little pet) see the item's model from the start, not only after a miss (LS.model, LS.prompt)
      // fixRev (v184): only the Pre-K to 2nd grade lessons' pictures (a grade 3-5 hint can draw the worked result: the product's blocks)
      if (T === LS_TONE.little) for (const x of it) if ((x.rem ? LESSONS[x.rem] : L).band != '35' && LS.model(x.q)) x.mdl = 1;
    }
    else if (B == 'exp') {
      st.exp = L.exp(r);
      it = [{m: 'open', q: st.exp.q, nudge: st.exp.nudge, lines: [T.play].concat(st.exp.lines || [])}];
      // a repair (TEACH-PLAN-2 system C): the lesson opens with a contrast on the model, the right answer beside the held idea's
      const c = st.repair && LS.contrast(st, st.repair);
      if (c) it.unshift(c);
    } else if (B == 'name') {
      const n = L.name(st.ctx, r);
      it = [{m: 'say', html: n.html, lines: n.lines}].concat(n.also || []); // TEACH-5S: Spanish "say it with me" after the naming
    } else if (B == 'tog') it = [LS.togItem(st, [T.tog])];
    else if (B == 'chk') it = L.chk ? L.chk(st) : [LS.petItem(st)]; // TEACH-3: grades 3-5 have their own Check me (52i-bench35.js)
    else if (B == 'show') it = [0, 1].slice(st.post.length).map(k => { // fix179: a resumed Show asks only the items not yet answered
      // TEACH-2b: a drafted script frames Show as its job in the world (its Show lines), unless the child tested out
      const q = L.q(L.test, r), w = L.w && !st.to ? lsW(L.w.beats.show, k, q.sl) : [];
      return {m: 'ask', one: 1, q, lines: k ? (L.w && L.w.beats.show.length > 1 ? w : []) : [st.to ? T.testOut : w[0] || T.showMe]};
    });
    else if (B == 'win') it = [{m: 'ask', help: 3, win: 1, q: L.q(0, r), lines: [T.more]}];
    st.items = it;
    return it.length ? st : LS.after(st);
  },
  /* TEACH-UX: the model of a Remember or warm-up item for the little ones: the picture its hint draws after a miss (the ten frame,
     the blocks, the number line, the groups), without the hint's words (they can count the answer out: "Count by 2s: 2, 4, 6, 8").
     Only for a typed answer whose question has no picture of its own: a build (make, build, line) is its model already, and a
     choice's picture hint names the answer (the letter, the shape). '' when there is none. */
  model(q) {
    // fixRev (v184): a hint whose picture is only the result (Add Three's one-colour sum) says mdl: false
    if (!q || q.kind != 'num' || !q.hint || q.hint.k != 'html' || q.hint.mdl === false || /<svg/.test(q.html || '')) return '';
    return (q.hint.html.match(/<svg[\s\S]*?<\/svg>/g) || []).join('');
  },
  // the question area of an item (TEACH-UX: with its model above the question when the item carries one, it.mdl)
  prompt(it) {
    if (it.m == 'say') return it.html;
    if (it.m == 'judge') return it.pw || LS.petWork(it.q, it.pv); // TEACH-3: the pet's written steps
    const m = it.mdl ? LS.model(it.q) : '';
    return (m ? `<div class="pkq ls-model">${m}</div>` : '') + it.q.html;
  },
  // the lines an item says when it shows (the Hear button says them again). READ-SHAPES: a story question tells its story first (q.tell:
  // short sentences, each also on screen with its own speaker); fixRev (v184): the pet's turn on a story question tells the story and
  // the question too, before the pet's claim (its last line), so a child who cannot read yet can judge by listening
  told(it) {
    const q = it.q || {}, told = (q.tell || []).concat([q.say]), il = it.lines || [];
    return it.m == 'ask' || it.m == 'open' ? il.concat(told) : it.m == 'judge' && q.tell ? il.slice(0, -1).concat(told, il.slice(-1)) : il;
  },
  // TEACH-UX: the beat label under the dots ("Step 1 of 6 · Remember"); the show-me items and the last build are outside the six
  step(B) {
    const at = LS_PIPS.findIndex(x => x[0] == B);
    return at >= 0 ? `Step ${at + 1} of ${LS_PIPS.length} · ${LS_PIPS[at][2]}` : B == 'pre' ? 'Show me' : B == 'win' ? 'One more' : '';
  },
  // the next Together item: stage 0 first, then one up after a right first try, one down after a miss (the picture comes back)
  // When two misconception codes fit the child's wrong answers equally, the item is the probe: a question on which they predict
  // different answers (knowProbe, 52b-know.js), so one answer settles it.
  togItem(st, lines) {
    const s = st.last < 0 ? 0 : st.drop ? Math.max(0, st.last - 1) : Math.min(2, st.last + 1), tie = knowTie(st.id, st.S, st.day);
    st.last = s;
    st.drop = false;
    const pq = tie && knowProbe(tie[0], tie[1], () => st.L.q(s, st.r)), q = pq || st.L.q(s, st.r);
    // TEACH-2b: a drafted script's Together line for this item's stage (1 build, 2 picture, 3 symbols; the stage can drop after a miss),
    // its numbers from the item
    return {m: 'ask', help: 1, tog: 1, probe: pq ? tie : null, q, lines: (lines || []).concat(st.L.w ? lsW(st.L.w.beats.together, q.st | 0, q.sl) : [])};
  },
  // the contrast that opens a repair: one question with two answers on its picture, the right one and the one the held idea gives
  contrast(st, code) {
    for (let n = 0; n < 30; n++) {
      const q = st.L.q(1, st.r), w = (knowPredict(q)[code] || []).find(v => LS.fits(q, v) && !lsOk(q, v));
      if (w == null) continue;
      const pane = (v, ok) => `<div class="ls-cpane ${ok ? 'ok' : 'no'}">${ico(ok ? 'check-circle' : 'close', 28)}<span class="a11y-h">${ok ? 'Right' : 'Not right'}</span>${LS.petWork(q, v)}</div>`;
      return {m: 'say', con: code, html: `<div class="ls-con">${pane(q.ans, true)}${pane(w, false)}</div>`, lines: [lsTone().look, lsTone().isRight, BUGS[code].say]};
    }
    return null;
  },
  // Check me: one of the stop's questions (the build when it builds on a model, else the picture) and the pet's own answer: the
  // child's own misconception when the record shows one, else the script's first; right about PET_OK of the time
  petItem(st) {
    const L = st.L, r = st.r, T = lsTone(), held = st.repair || knowHeld(st.id, st.S, st.day), codes = held && L.bugs.includes(held) ? [held] : L.bugs;
    const petOk = LS.petRight(st);
    let q, pv, code = null;
    // up to 30 questions for the preferred mistake, then any of the stop's
    for (let n = 0; n < 40 && pv == null; n++) {
      const q0 = L.q(L.petSt | 0, r);
      q = L.petSt != null || q0.kind == 'make' && !q0.goal || q0.kind == 'line' ? q0 : L.q(1, r);
      if (petOk) { pv = q.ans; break; }
      for (const c of n < 30 ? codes : L.bugs) {
        const v = (knowPredict(q)[c] || []).find(x => String(x) !== q.ans && !lsOk(q, String(x)) && LS.fits(q, x));
        if (v != null) { pv = String(v); code = c; break; }
      }
    }
    if (pv == null) pv = q.ans; // never reached with these scripts (tools/test.js "every pet turn" checks every lesson's forced-wrong turn)
    const ok = lsOk(q, pv);
    return {m: 'judge', q, pv, petOk: ok, code, lines: [T.myTurn, (L.w && lsW(L.w.beats.check.filter(t => /\{ans\}/.test(t)), 0, Object.assign({}, q.sl, {ans: lsSayV(q, pv)}))[0]) || LS.petSays(q, pv)]};
  },
  // fix179: is the pet right this turn? About PET_OK of the time; never in the extra turns of Check me (st.chkN), where it is always wrong
  petRight: st => st.r() < (st.chkN ? -1 : LS.PET_OK),
  // can the pet's answer be shown on this question's model?
  fits(q, v) {
    const n = +v, M = q.kind == 'make' && K2MM[q.model];
    if (M && M.fits) return M.fits(q, v);
    if (q.kind == 'make' && q.model == 'frame') return Number.isInteger(n) && n >= 0 && n <= q.m.total - (q.m.fixed || 0) && !(q.s0 && n > q.s0[0]);
    if (q.kind == 'make' && q.model == 'b10') return Number.isInteger(n) && n > 0 && n < 100;
    if (q.kind == 'line') return Number.isInteger(n) && n >= q.line.min && n <= q.line.max && String(n) !== String(q.start);
    if (q.kind == 'choice') return q.choices.some(c => c.v === String(v));
    return Number.isInteger(n) && (n >= 0 || q.pad == 'neg'); // TEACH-6M: the plus-or-minus pad takes a negative number
  },
  petSays(q, v) {
    if (q.kind == 'choice') return `${q.say.replace(/^Is /, '').replace(/\?$/, '')}? I pick ${{'<': 'less than', '>': 'greater than', '=': 'equal to'}[v] || v}!`;
    if (q.kind == 'make' || q.kind == 'line') return 'I did it! Am I right?';
    return `I say ${v}! Am I right?`;
  },
  // the pet's answer as a start state the child fixes (make: the pet's build; line: the pet's pin; num and choice start empty)
  fixItem(it) {
    const q = Object.assign({}, it.q), v = +it.pv;
    if (q.kind == 'make') q.s0 = lsOf(q, it.pv);
    if (q.kind == 'line') q.start = String(v);
    return {m: 'ask', help: 1, fix: 1, q, lines: [lsTone().fixIt]};
  },
  // what the child did: v is the value the kind submits (a frame2 build: its state). Returns {ok, act: 'next' | 'retry' | 'reveal', lines, mood}
  answer(st, v) {
    const it = LS.cur(st), T = lsTone(), B = LSB[st.b];
    if (!it) return null;
    if (it.on) return it.on(st, v); // TEACH-3: an item that answers for itself ("your problem", 52i-bench35.js)
    const yay = () => [T.yay[(st.r() * T.yay.length) | 0]];
    if (it.m == 'say') return {ok: true, act: 'next', lines: []};
    if (it.m == 'open') {
      if (!lsOk(it.q, v)) return {ok: false, act: 'retry', lines: [it.nudge || T.tryMore]};
      const re = st.exp.react(v);
      Object.assign(st.ctx, re.ctx);
      return {ok: true, act: 'next', lines: re.lines, mood: 'happy'};
    }
    if (it.m == 'judge') {
      const yes = String(v) === '1', ok = yes === it.petOk;
      st.chk.push(ok ? 1 : 0);
      if (!it.petOk && !yes) st.caught = true; // LS-STOP: the pet's mistake found
      if (!it.petOk) st.items.splice(st.i + 1, 0, ...(it.after ? it.after(st) : [LS.fixItem(it)])); // TEACH-3: the fix, then the reason from tiles
      // TEACH-2b: a drafted script's reason for the pet's mistake (its misconception code), after it is caught
      const why = !it.petOk && it.code && st.L.w ? lsW((st.L.w.reasons || {})[it.code], 0, it.q.sl) : [];
      return {ok, act: 'next', mood: it.petOk ? 'happy' : 'oops',
        lines: it.petOk ? [yes ? T.rightMe : T.wrongMe] : [yes ? T.fooled : T.caught].concat(why)};
    }
    const ok = lsOk(it.q, v), first = !it.tries, M = it.q.kind == 'make' && K2MM[it.q.model];
    if (first && it.rem) knowRemember(it.rem, ok, st.day, st.S);
    else if (first && !it.fix && !it.win && !it.warm) knowAdd(st.id, it.q, M && M.raw && Array.isArray(v) ? String(M.val(it.q, v)) : v, ok, st.S, st.day);
    // TEACH-5S: "look", what really happens (a Discover prediction), said once the answer is in or shown; never before a retry
    const lk = it.q.look ? [it.q.look] : [];
    if (it.one) {
      it.tries = 1;
      (B == 'pre' ? st.pre : st.post).push(ok);
      // LS-STOP: "I already know this!" and a miss: no more show-me items, straight into the lesson (no reveal, no penalty)
      if (B == 'pre' && !ok && st.slide) { st.items.length = st.i + 1; return {ok, act: 'next', slide: true, lines: [lsTone2().slide]}; }
      return {ok, act: ok ? 'next' : 'reveal', lines: (ok ? yay() : [T.tryMore]).concat(lk)};
    }
    if (ok) return {ok, act: 'next', lines: (it.tries ? [T.fixed] : yay()).concat(lk), mood: 'happy'};
    it.tries = (it.tries || 0) + 1;
    if (it.tog) st.drop = true;
    if (it.tries <= it.help) return {ok, act: 'retry', lines: [T.help]};
    return {ok, act: 'reveal', lines: (it.win ? [T.win] : [T.tryMore]).concat(lk)};
  },
  // on to the next item (Together grows one item at a time), the next beat, or the end
  next(st) {
    if (st.done) return st;
    if (LSB[st.b] == 'tog' && st.i == st.items.length - 1 && st.items.length < LS.TOG) {
      st.items.push(LS.togItem(st));
      st.i++;
      return st;
    }
    st.i++;
    return st.i < st.items.length ? st : LS.after(st);
  },
  after(st) {
    const B = LSB[st.b];
    if (B == 'pre' && st.pre.length == 2 && st.pre.every(Boolean)) {
      st.to = true; // test-out: the teaching beats are skipped
      return LS.beat(st, LSB.indexOf('show'));
    }
    // LS-STOP: Check me goes on until the pet's mistake is found: up to two more turns, in which the pet is always wrong
    // (fix179: st.chkN > 0 makes every Check me builder give a wrong pet, LS.petRight; a turn whose pet is somehow right is never offered)
    if (B == 'chk' && st.proof && !st.caught && st.chkN < 2) {
      st.chkN++;
      const it = st.L.chk ? st.L.chk(st) : [LS.petItem(st)];
      if (it.length && it[0].m == 'judge' && !it[0].petOk) { it[0].lines = [lsTone2().findIt].concat(it[0].lines || []); st.items = it; st.i = 0; return st; }
    }
    if (B == 'show' && st.post.length == 2 && st.post.every(Boolean) || B == 'win') {
      st.done = true;
      return st;
    }
    return LS.beat(st, B == 'show' ? LSB.indexOf('win') : st.b + 1);
  },
  // the learner record and the measure (52b-know.js); returns {pass, sc}
  finish(st) {
    const S0 = st.S, k = lsKnow(st.id, S0), pass = st.post.length == 2 && st.post.every(Boolean);
    // TEACH-2: a lesson again on a stop already learned (a review, or a repair) is remembering it: Show moves its memory box
    if (k.s >= 2 && st.post.length) knowRemember(st.id, pass, st.day, S0);
    k.n++;
    if (k.s < 1) k.s = 1;
    if (pass && k.s < 2) Object.assign(k, {s: 2, d: st.day, box: 0, due: st.day + LS_GAP[0], last: st.day});
    // the notebook page (52d-notebook.js): what the child built in Explore, drawn again from it; a passed repair starts the page of
    // wrong answers again (the tally stays, and fades)
    if (pass && Object.keys(st.ctx).length) k.note = Object.assign({}, st.ctx);
    if (pass && st.repair) k.w = [];
    lsMeasure(st.id, st.day, st.pre, st.post, st.to, S0);
    delete S0.les;
    return {pass, sc: st.post.filter(Boolean).length};
  },
  /* the end of a lesson, written the way finish() (50-round.js) writes a round, so the map, unlocks, missions, the streak and game time
     keep working: the stop's stars (S.maps, setSt: LS.STOP_STARS for a passed lesson, 0 since fix179 so practice is still required;
     never lower than before), a world finished (S.wdone, +20 coins),
     the skill's tries and right answers (P(sk).t, .c: the Show items), stars and coins (one each for a right Show item), a sticker,
     the day's rounds (day().r, for the "round" mission), the activity log (actRound), the streak (streakTick), missions (MIS.done)
     and game time. Not written: P(sk).r (rounds played), S.best (a streak in a row), mastery (S.mast).
     LS-STOP: game time is the lesson's own pay (lsPay, 58-playtime.js), not a round's: a proven pass pays the first, second or later
     pass amount, a good try that did not pass a little, guessing nothing; plus the daily mission's minute. */
  record(st) {
    S.tq = st.L.home.replace('{name}', S.name || 'your child'); // tonight's question for the grown-ups' report card (82-report.js)
    const f = LS.finish(st), p = st.L.p || 'math', ni = NODES[p].findIndex(n => nid(n) === st.id), nd = NODES[p][ni], d = day(), sc = f.sc, n = st.post.length;
    const stars = f.pass ? 2 : 0, prev = getSt(p, ni), give = f.pass ? LS.STOP_STARS : 0, newPass = !prev && give > 0;
    if (give) setSt(p, ni, Math.max(prev, give));
    let wDone = false;
    if (newPass && !S.wdone[nd.wid] && worldDone(p, nd.wi)) { S.wdone[nd.wid] = 1; wDone = true; }
    const pr = P(nd.sk);
    pr.t += n;
    pr.c += sc;
    const prizes = [award()];
    actRound();
    d.r++;
    const stk = streakTick(), mi = MIS.done({k: 'round', p, mix: false, test: false, boss: false, daily: false, perfect: sc >= n, n: d.r});
    mi.won.forEach(w => prizes.push(w.st));
    if (mi.bonus) prizes.push(award());
    const effort = !st.to && st.caught && (st.rush | 0) < 2 && st.post.length == 2, pay = lsPay(st.id, f.pass, st.to || st.caught, effort);
    const coins = sc + (mi.bonus ? 5 : 0) + (wDone ? 20 : 0), PT = {sec: pay.sec, lines: pay.lines.slice(), pay}, bank0 = pt().bank;
    if (mi.bonus) { PT.sec += 60; PT.lines.push([60, 'Daily mission done']); }
    if (PT.sec) ptEarn(PT.sec);
    S.stars += sc + (mi.bonus ? 5 : 0);
    S.coins += coins;
    save();
    return Object.assign(f, {stars, prev, newPass, wDone, prizes, mi, stk, coins, PT, bank0, bank1: pt().bank, ni, next: ni + 1 < NODES[p].length && unlocked(p, ni + 1) ? ni + 1 : -1});
  },

  // ---- the screen ----
  // o: {learn: no show-me items} | {know: the test-out, sliding into the lesson at the first miss} | {} (both show-me items, as before)
  start(id, o = {}) {
    if (!LESSONS[id]) return;
    const day0 = lsDay(), pl = planToday(S, day0, LESSONS[id].p || 'math') || {}, // TEACH-4: Remember from the lesson's own subject
      les = S.les && S.les.n === id ? S.les : null;
    LS.st = LS.make(id, les ? LS.resume(les, day0)
      : {rem: pl.remember || [], day: day0, repair: pl.id === id && pl.code, proof: true, know: !!o.know, learn: !!o.learn});
    LS.t0 = 0;
    warmVoices();
    LS.show();
  },
  // LS-STOP: the start card of a lesson stop: what it pays now, "Let's learn" and "I already know this!" (a lesson left part way goes on)
  open(id) {
    const L = LESSONS[id];
    if (!L) return;
    if (S.les && S.les.n === id) return LS.start(id);
    LS.st = null;
    const p = L.p || 'math', up = gradeOf() > 2, tag = lsPriceTag(id), T2 = lsTone2(), title = up ? 'Challenge: ' + L.t : `Learn ${L.t} with ${petN()}`;
    view(`<div class="top tbar s-${p} ls-top">${UI.ibtn('back', 'Back', {size: 'sm', id: 'back'})}<div class="ttl">${ico(up ? 'bolt' : 'doc', 30)}<span>${esc(L.t)}</span></div></div>
    <div class="scroll ls-end" id="lsopen"><div class="ls-endc">
     <div class="ls-art ls-big" id="lsart" aria-hidden="true"></div>
     <h1>${esc(title)}</h1>${UI.ibtn('speak', 'Hear it again', {size: 'sm', id: 'lshear2', cls: 'ls-hear'})}
     ${tag ? `<p class="ls-price${tag == 'done today' ? ' dn' : ''}" id="lsprice">${ico(tag == 'done today' ? 'check' : 'ticket', 26)}<span>${tag == 'done today' ? 'Game time for this one: done today' : `Pass it to earn ${tag} of game time`}</span></p>` : ''}
     <div class="ls-acts">${UI.btn(up ? 'Start the challenge' : "Let's learn", {kind: 'primary', size: 'lg', icon: up ? 'bolt' : 'play', id: 'lslearn'})}${UI.btn('I already know this!', {kind: 'soft', size: 'lg', icon: 'star', id: 'lsknow'})}</div>
    </div></div>`);
    LS.mood('happy');
    $('#back').onclick = () => { SFX.whoosh(); pathMap(p); };
    $('#lslearn').onclick = () => { SFX.whoosh(); LS.start(id, {learn: 1}); };
    $('#lsknow').onclick = () => { SFX.whoosh(); LS.start(id, {know: 1}); };
    $('#lshear2').onclick = () => say(T2.open(lsName()));
    UI.hear();
    if (LS.voice()) say(T2.open(lsName()));
  },
  /* LS-STOP: lesson time counts as learning (the activity log, so "learn first" sees it). fix179: only active time, as a round counts
     it (ACT.qEnd): a screen's time counts when the child answers or goes on (tick, from submit, judge and Next), from when the screen
     came (screen) or the last answer, at most ACT.CAP (60 s), never the time the app was hidden (vis); a screen left idle, quit or
     closed counts nothing. LS.t0: when counting started (0: not counting); LS.hid: hidden ms since; LS.h0: hidden since (or null). */
  screen(now = Date.now()) { LS.t0 = now; LS.hid = 0; LS.h0 = typeof document != 'undefined' && document.hidden ? now : null; },
  vis(hidden, now = Date.now()) {
    if (hidden && LS.h0 == null) LS.h0 = now;
    else if (!hidden && LS.h0 != null) { LS.hid = (LS.hid | 0) + now - LS.h0; LS.h0 = null; }
  },
  tick(now = Date.now()) {
    const st = LS.st, h = (LS.hid | 0) + (LS.h0 != null ? now - LS.h0 : 0), cap = typeof ACT != 'undefined' && ACT.CAP || 60;
    const sec = LS.t0 ? Math.max(0, Math.min(cap, Math.round((now - LS.t0 - h) / 1000))) : 0;
    if (sec >= 1 && st) try { ACT.add(today(), {sec, area: st.L.p || 'math'}); } catch (e) {}
    if (LS.t0) LS.screen(now);
  },
  // LS-STOP: the ticket meter in the top bar: what this lesson pays now, filled as the beats are done
  meter(st, B, at) {
    const tag = lsPriceTag(st.id);
    if (!tag) return '';
    const n = B == 'tog' ? LS.TOG : st.items.length || 1, f = B == 'pre' ? 0 : B == 'win' ? 5 / 6 : Math.min(1, (Math.max(0, at) + st.i / n) / 6), dn = tag == 'done today';
    return `<div class="ls-meter${dn ? ' dn' : ''}" id="lsmeter" role="img" style="--f:${f.toFixed(3)}" aria-label="${dn ? 'Game time for this lesson: done today' : `Pass to earn ${tag.slice(1).replace('min', 'minutes')} of game time, ${Math.round(f * 100)} percent done`}">${ico(dn ? 'check' : 'ticket', 22)}<span>${tag}</span></div>`;
  },
  voice: () => !!S.voice || gradeCfg().auto != 'tap',
  // say lines (and show cap, or the lines, in the pet's bubble); then() once they have been said
  talk(lines, then, cap0) {
    const t = lines.filter(Boolean).join(' '), b = $('#lsbub'), me = LS.st, c = lsPlain(cap0 || t);
    if (b) { b.firstChild.textContent = c; b.classList.toggle('on', !!c); }
    // TEACH-4: a recorded line (EN_TEACH, 12-speech.js) plays wherever its sentence falls in the lines; the rest is the tablet's voice
    // TEACH-5S: a line with «Spanish» in it, or any line of a Spanish lesson, is said piece by piece in its own voice (lsSay)
    if (t && LS.voice() && (/«/.test(t) || me && me.L.p == 'es')) lsSay(t, me && me.L.p);
    else if (t && LS.voice()) say(t);
    if (!then) return;
    // the controls wake once the line has been said (TEACH-PLAN-2 system H): poll the speech, at most WAKE ms (no voice: a short pause)
    const t0 = Date.now(), cap = t && LS.voice() && canSpeak() ? LS.WAKE : 600;
    const go = () => {
      if (LS.st !== me) return;
      if (Date.now() - t0 < cap && (Date.now() - t0 < 400 || speakBusy())) return setTimeout(go, 200);
      then();
    };
    setTimeout(go, 200);
  },
  mood(m) {
    const a = $('#lsart');
    if (a) a.innerHTML = petRigHTML(Math.max(S.stars, GROW[1]), m);
  },
  show() {
    const st = LS.st, it = st && LS.cur(st);
    if (!st) return;
    if (!it) return LS.end();
    LS.keep(st);
    LS.screen();
    save();
    LS.seq++; // screens shown (tests wait for the next one)
    const q = it.q, B = LSB[st.b], T = lsTone(), sp = st.L.p || 'math';
    LS.u = {lock: true, typed: '', built: [], tries: 0};
    const at = LS_PIPS.findIndex(x => x[0] == B), pips = LS_PIPS.map(([k, ic, l], j) => `<span class="ls-pip${j < at || B == 'win' ? ' on' : j == at ? ' now' : ''}" aria-hidden="true">${ico(ic, 18)}</span>`).join('');
    const prompt = LS.prompt(it);
    let input = '';
    if (it.m == 'say') input = UI.btn(it.nx || 'Next', {kind: 'primary', size: 'lg', icon: it.nx ? 'check' : 'go', id: 'lsnext'}); // TEACH-5S: "I said it!" after say it with me
    else if (it.m == 'judge') {
      input = `<div class="ls-judge">${UI.btn('Right', {kind: 'soft', size: 'lg', icon: 'thumbs-up', id: 'lsyes'})}${UI.btn('Not right', {kind: 'soft', size: 'lg', icon: 'close', id: 'lsno'})}</div>`;
    } else input = KIND[q.kind].render(q);
    const mt = LS.meter(st, B, at);
    // TEACH-UX: the dots are drawn only; the label under them says the step in words (and is what a screen reader reads);
    // fixRev (v184): " of 6" in its own span, which a phone under 400 px leaves out ("Step 4 · Together"), so the step's name is never cut
    view(`<div class="top tbar round qtop ls-top s-${sp}${mt ? ' ls-m' : ''}">${NAV.house('quit')}<div class="ls-beats"><div class="ls-pips" aria-hidden="true">${pips}</div><span class="ls-step" id="lsstep">${esc(LS.step(B)).replace(/( of \d+)/, '<span class="ls-of">$1</span>')}</span></div>
     <div class="pl-tag ls-tag">${ico('doc', 24)}<span>${esc(st.L.t)}</span></div>${mt}</div>
    <div class="play qs s-${sp} ls-play" id="lsplay" data-beat="${B}" data-mode="${it.m}"><div class="qarea">
     <div class="ls-pet${it.m == 'judge' ? ' ls-turn' : ''}"><div class="ls-art" id="lsart" aria-hidden="true"></div><div class="ls-bub" id="lsbub" role="status"><span></span></div>
      ${UI.ibtn('speak', 'Hear it again', {size: 'sm', id: 'lshear', cls: 'ls-hear'})}</div>
     <div class="prompt" id="prompt">${prompt}</div><div class="qhint"><div id="hint" class="hint"></div></div></div>
    <div class="inp ls-wait" id="lsinp">${input}</div></div>`);
    LS.mood(it.m == 'judge' ? 'idle' : 'happy');
    NAV.wire('quit', {leave: () => { LS.st = null; save(); }});
    const lines = LS.told(it);
    $('#lshear').onclick = () => LS.talk(it.m == 'say' ? it.lines : lines.length ? lines : [q.say]);
    UI.hear();
    // fixRev (v184): what must start only once the child can answer (the flash card's fade) carries data-wake, the class to add then
    const wake = () => { const w = $('#lsinp'); if (w) w.classList.remove('ls-wait'); for (const e of $$('#lsplay [data-wake]')) e.classList.add(e.dataset.wake);
      if (LS.u) { LS.u.lock = false; LS.u.w = Date.now(); } };
    if (it.m == 'say') $('#lsnext').onclick = () => { if (!LS.u.lock) { LS.tick(); LS.go(LS.answer(st, 'ok')); } };
    else if (it.m == 'judge') { $('#lsyes').onclick = () => LS.judge('1'); $('#lsno').onclick = () => LS.judge('0'); }
    else {
      KIND[q.kind].bind(q, LS.u, LS.submit);
      if (q.kind == 'make' && q.s0) { LS.u.mm = q.s0.slice(); LS.u.mm0 = q.s0.slice(); KIND.make.draw(q, LS.u); }
    }
    fit();
    LS.talk(lines, wake, it.m == 'say' ? it.lines[it.lines.length - 1] : (it.lines || []).filter(Boolean).join(' ') || q.say);
  },
  // the pet's answer drawn on the question, for Check me
  petWork(q, v) {
    if (q.kind == 'make') {
      const s = lsOf(q, v);
      return q.html + `<div class="ls-pw">${K2MM[q.model].draw(q, s).replace('<svg ', '<svg aria-hidden="true" ')}</div>`;
    }
    if (q.kind == 'line') return q.html + `<div class="ls-pw">${VIZ.numLine(Object.assign({}, q.line, {pin: +v})).replace('<svg ', '<svg aria-hidden="true" ')}</div>`;
    const c = q.kind == 'choice' ? q.choices.find(x => x.v === String(v)) : null, sl = [SLOT_MIX, SLOT_FRAC, SLOT_R].find(x => q.html.includes(x)) || SLOT;
    return q.html.replace(sl, `<span class="slot ls-pv">${esc(c ? c.l : v)}</span>`); // TEACH-3: a fraction or remainder answer fills its slots as one
  },
  judge(v) {
    const st = LS.st;
    if (!st || LS.u.lock) return;
    LS.u.lock = true;
    LS.rushed(st);
    LS.tick();
    const it = LS.cur(st), res = LS.answer(st, v), b = $(v == '1' ? '#lsyes' : '#lsno');
    LS.keep(st); // fix179: the answer is in the save at once (leaving during the line cannot undo it)
    save();
    if (b) b.classList.add(res.ok ? 'right' : 'ls-pk');
    if (res.ok) SFX.right(1); else SFX.pop(2);
    if (!it.petOk) $('#prompt').classList.add('ls-oops');
    LS.mood(res.mood);
    LS.go(res);
  },
  // a kind's submit (K.bind): v as the kind gives it; an open frame2 build passes its state
  submit(v, el) {
    const u = LS.u, st = LS.st, it = st && LS.cur(st);
    if (!u || u.lock || !it) return;
    const q = it.q, K = KIND[q.kind];
    if (q.kind == 'make' && (q.model == 'frame2' || K2MM[q.model].raw || q.raw)) v = u.mm.slice();
    LS.rushed(st);
    LS.tick();
    const res = LS.answer(st, v);
    u.lock = true;
    if (it.one) { LS.keep(st); save(); } // fix179: a test-out or Show answer is in the save at once (leaving during its line, or the slide line, cannot undo it)
    if (res.slide) { LS.mood('happy'); return LS.go(res); } // LS-STOP: a missed show-me item after "I already know this!": no reveal, no wrong
    if (res.ok) {
      if (el) el.classList.add('right');
      K.right(q);
      SFX.right(1);
      if (it.m != 'open') { const r = (el || $('#prompt')).getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2); }
      LS.mood('happy');
      return LS.go(res);
    }
    const h = $('#hint');
    if (res.act == 'retry') {
      SFX.pop(1);
      if (el) { el.classList.add('wrong'); el.disabled = true; }
      if (it.m == 'open') { u.mmMoved = false; if (q.kind == 'make') KIND.make.draw(q, u); else K.retry(q, u, () => {}); } // TEACH-4: a sort shows which pictures are home
      else {
        if (h && q.hint) { h.innerHTML = LS.hint(q, it); h.scrollIntoView({block: 'nearest'}); }
        K.retry(q, u, () => {});
      }
      LS.talk(res.lines);
      // TEACH-4: an open sort, order or build unlocks itself after its short animation (their retry() sets lock, then clears it on a timer);
      // every other open kind (make, line, ...) is unlocked here, or an open number line (round1-4, frac3 Explore) would freeze when a pin
      // left at its start is checked (review of v178)
      if (it.m != 'open' || !['sort', 'order', 'build'].includes(q.kind)) u.lock = false;
      fit();
      return;
    }
    if (el) el.classList.add('wrong');
    K.reveal(q);
    if (h && q.hint) h.innerHTML = LS.hint(q, it);
    fit();
    LS.go(res, K.spoken(q));
  },
  // TEACH-UX: when the model is already above the question (it.mdl), the hint after a miss adds only its words, not the picture again
  hint: (q, it) => (q.hint.k != 'html' ? esc(q.hint.s) : it && it.mdl ? q.hint.html.replace(/<svg[\s\S]*?<\/svg>/g, '') : q.hint.html),
  // LS-STOP: an answer given right after the controls woke counts as rushed
  rushed(st) { if (LS.u && LS.u.w && Date.now() - LS.u.w < LS.RUSH) st.rush++; },
  // say the result, then the next item once the line has been said
  go(res, extra) {
    const me = LS.st;
    const on = () => {
      if (LS.st !== me || !$('#lsplay')) return;
      if (NAV.held) return setTimeout(on, 400); // Go Home? is open: the lesson waits
      LS.next(me);
      LS.show();
    };
    LS.talk((res.lines || []).concat(extra ? [extra] : []), () => setTimeout(on, res.ok ? 500 : 1400));
  },
  end() {
    const st = LS.st, rec = LS.record(st), T = lsTone(), L = st.L, p = L.p || 'math'; // TEACH-4: a reading lesson goes back to the reading map
    LS.st = null;
    LS.t0 = 0;
    const line = rec.pass ? (st.to ? 'You already knew it!' : 'You learned it!') : 'Great learning today!', T2 = lsTone2(), PT = rec.PT;
    // LS-STOP: the game time: each paid line as "+5:00 game time", or why there is none; a ticket that lands in the bank chip
    const why = LS.why(st.id, PT.pay);
    const gt = PT.lines.map(([v, l]) => `<li class="ls-gt">${ico('ticket', 18)}<span><b>+${fmtT(v)} game time</b> ${esc(l)}</span></li>`).join('')
      + (why ? `<li class="ls-gt0">${ico('ticket', 18)}<span>${esc(why)}</span></li>` : '');
    view(`<div class="top tbar s-${p} ls-top">${NAV.house('lshome')}<div class="ttl">${ico('doc', 30)}<span>${esc(L.t)}</span></div>${UI.chip('ticket', fmtT(rec.bank0), {aria: 'Game time in the bank', id: 'lsbank'})}</div>
    <div class="scroll ls-end" id="lsend"><div class="ls-endc">
     <div class="ls-art ls-big" id="lsart" aria-hidden="true"></div>
     <h1>${esc(line)}</h1>${UI.ibtn('speak', 'Hear it again', {size: 'sm', id: 'lshear2', cls: 'ls-hear'})}<p class="ls-idea">${ico('hint', 26)}<span>${esc(L.idea)}</span></p>
     ${rec.pass ? UI.stars(rec.stars, 3, 34) : ''}
     ${PT.sec ? `<div class="ls-tk" id="lstk" aria-hidden="true">${ico('ticket', 28)}<span>+${fmtT(PT.sec)}</span></div>` : ''}
     <ul class="rw-pl ls-earn"><li>${ico('star', 18)}<span>+${rec.sc} stars</span></li><li>${ico('coin', 18)}<span>+${rec.coins} coins</span></li>
      ${gt}${rec.newPass && rec.next >= 0 ? `<li>${ico('map', 18)}<span>Next stop unlocked: ${esc(NODES[p][rec.next].t)}!</span></li>` : ''}</ul>
     <div class="ls-acts">${rec.pass ? UI.btn('Practice', {kind: getSt(p, rec.ni) ? 'soft' : 'primary', size: 'lg', icon: 'play', id: 'lsprac'}) : UI.btn('Learn again', {kind: 'primary', size: 'lg', icon: 'replay', id: 'lsagain'})}${UI.btn('Map', {kind: rec.pass && getSt(p, rec.ni) ? 'primary' : 'soft', size: 'lg', icon: 'map', id: 'lsmap'})}${UI.btn('Notebook', {kind: 'soft', size: 'lg', icon: 'doc', id: 'lsnb'})}</div>
    </div></div>`);
    LS.mood('cheer');
    $('#lshome').onclick = () => { SFX.whoosh(); home(); };
    if ($('#lsprac')) $('#lsprac').onclick = () => { SFX.whoosh(); start(p, rec.ni); };
    if ($('#lsagain')) $('#lsagain').onclick = () => { SFX.whoosh(); LS.start(st.id, {learn: 1}); }; // LS-STOP: a failed Show: the lesson again, teaching first
    $('#lsmap').onclick = () => { SFX.whoosh(); pathMap(p); };
    $('#lsnb').onclick = () => { SFX.whoosh(); NB.open(() => pathMap(p)); };
    SFX.fanfare();
    if (rec.pass) confetti(24);
    const said = `${line} ${L.idea} ${PT.sec ? T2.paid + ' ' : ''}${T.bye(lsName())}`;
    $('#lshear2').onclick = () => lsSay(said, p);
    UI.hear();
    if (LS.voice()) lsSay(said, p);
    if (PT.sec) LS.land(rec);
  },
  /* LS-STOP: why the lesson itself paid nothing ('' when it paid). fix179: read from the lesson's own pay, not the end card's total, so a
     lesson that paid nothing still says why when only the daily mission's minute was paid */
  why(id, pay) {
    if (pay.sec) return '';
    const T2 = lsTone2(), tag = lsPriceTag(id);
    return pay.kind == 'guess' ? T2.noProof : pay.kind == 'pass' ? (tag == 'done today' ? 'Game time for this lesson: done today' : '') : tag ? `Pass Show to earn ${tag} of game time` : '';
  },
  // LS-STOP: the moment the minutes are earned: the ticket lands in the bank chip, which counts up (at once in calm mode or with
  // reduced motion), with a sound
  land(rec) {
    const k = $('#lstk'), b = $('#lsbank'), calm = document.documentElement.classList.contains('calm') || !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
    setTimeout(() => {
      if (!$('#lsend')) return;
      if (k) { k.classList.add('land'); setTimeout(() => k.remove(), calm ? 0 : 700); }
      SFX.coin(0); setTimeout(() => SFX.coin(3), 140); setTimeout(() => SFX.coin(7), 280);
      const a = rec.bank0, z = rec.bank1, n = calm ? 1 : 10;
      for (let j = 1; j <= n; j++) setTimeout(() => { if ($('#lsend')) UI.setChip(b, fmtT(Math.round(a + (z - a) * j / n))); }, calm ? 0 : j * 70);
      if (b) b.setAttribute('aria-label', `Game time in the bank: ${fmtT(z)}`);
    }, calm ? 200 : 900);
  },
  // the offer on the math map: a notebook button by the stop the planner picks (owner decision 1: inside the subject the child chose,
  // never a front door). Placed above the stop, or beside it, wherever it covers nothing; no button when nothing is free.
  mapAdd() {
    const m = $('#map');
    const sm = MAPP == 'es' || MAPP == 'disc'; // TEACH-5S: and the Spanish and Discover maps, once their part is in
    if (!m || MAPP != 'math' && MAPP != 'read' && !sm || TEACH.off || (sm ? !partReady('teaches') : gradeOf() > 2 && !partReady('teach35') || gradeOf() > 4 && !partReady('teach6'))) return; // TEACH-3: grades 3 up once their lessons are in; TEACH-4: the reading map too
    const old = m.querySelector('.ls-go:not(.lsn)');
    if (old) old.remove();
    NB.mapBtn();
    const pl = planToday(S, lsDay(), MAPP), b = pl && m.querySelector(`.node[data-n="${pl.i}"]`);
    if (!b) return;
    // LS-STOP: the planner's pick is its lesson stop on the path (marked, and named as before); a stop with no lesson stop gets the old bubble
    const ln = m.querySelector(`.lsn[data-ls="${pl.i}"]:not(.lock)`);
    if (ln) {
      m.querySelectorAll('.lsn.ls-go').forEach(e => e.classList.remove('ls-go'));
      ln.classList.add('ls-go');
      ln.setAttribute('aria-label', `Learn ${NODES[MAPP][pl.i].t} with ${petN()}` + ln.getAttribute('aria-label').replace(/^Learn .*? with [^,]*/, ''));
      return;
    }
    const x = parseFloat(b.style.left), y = parseFloat(b.style.top), W = m.clientWidth || 360, sd = x > W / 2 ? -1 : 1;
    const busy = [...m.querySelectorAll('.node,.nlab,.wtitle,.tobtn,.mappet,.ck-go,.ck-mapm,.nnew,.wmore,.mp-champ')].map(e => e.getBoundingClientRect());
    const box = m.getBoundingClientRect(), R = 30;
    const free = ([cx, cy]) => cx - R >= 4 && cx + R <= W - 4 && cy - R >= 0 && !busy.some(r => cx + box.left + R > r.left && cx + box.left - R < r.right && cy + box.top + R > r.top && cy + box.top - R < r.bottom);
    // the nearest free place on rings around the stop, starting above it and turning toward the middle of the map
    const ring = [];
    for (const d of [68, 82, 98, 116]) for (let k = 0; k < 16; k++) { const a = -Math.PI / 2 + sd * (k % 2 ? -1 : 1) * Math.ceil(k / 2) * Math.PI / 8; ring.push([Math.round(x + d * Math.cos(a)), Math.round(y + d * Math.sin(a))]); }
    const at = ring.find(free);
    if (!at) return;
    m.insertAdjacentHTML('beforeend', `<button class="btn ls-go" style="left:${at[0]}px;top:${at[1]}px" aria-label="Learn ${esc(NODES[MAPP][pl.i].t)} with ${esc(petN())}">${ico('doc', 30)}</button>`);
    m.querySelector('.ls-go').onclick = () => { SFX.whoosh(); LS.open(pl.id); };
  },
};
// fix179: lesson time stops counting while the app is hidden (LS.vis)
if (typeof document != 'undefined' && document.addEventListener) document.addEventListener('visibilitychange', () => { try { LS.vis(!!document.hidden); } catch (e) {} });
const lsName = () => (S.name || 'friend');
/* TEACH-5S: Spanish in a spoken line is written «la vaca». lsRuns(t, es) cuts a line into [text, 1 when Spanish] pieces, in order; in a
   Spanish lesson (es) "el" and "la" said alone (the article named as a word) are Spanish too, never one inside a title or a quote. lsSay says each piece in its own voice, one after the other (say()
   queues them; a Spanish piece is its ES-AUDIO recording when there is one); a line with no Spanish is said as before. lsPlain: the
   caption, without the marks. */
function lsRuns(t, es) {
  const o = [];
  String(t).split(/«([^»]*)»/).forEach((x, i) => {
    if (i % 2) return o.push([x.trim(), 1]);
    if (!es) return o.push([x.trim(), 0]);
    // review fix (v186): el / la alone is the article named as a word ("an el word", "el or la?"): Spanish. Followed by a word of the
    // Spanish units ("la vaca" left unmarked) the two are one Spanish piece; inside a title or a quote ("A la Escuela", "la moto")
    // it stays with the English piece, so a phrase is never cut across two voices
    let k = 0;
    for (const m of x.matchAll(/(?<![\p{L}\p{N}])(el|la|El|La)(?![\p{L}\p{N}])(\s+(\p{L}+))?/gu)) {
      const prev = x.slice(0, m.index).trimEnd().slice(-1), w = m[3] || '', noun = w && lsEsWords().has(w);
      if (/["'“‘]/.test(prev) || /^\p{Lu}/u.test(w)) continue; // a quote, or a title's next word
      const len = noun ? m[0].length : m[1].length;
      o.push([x.slice(k, m.index).trim(), 0], [x.substr(m.index, len).trim(), 1]);
      k = m.index + len;
    }
    o.push([x.slice(k).trim(), 0]);
  });
  return o.filter(x => /[a-z0-9áéíóúñü]/i.test(x[0]));
}
// the words of the Spanish units (lowercase), made once: what may follow an unmarked el or la as one Spanish piece
let LS_ESW = null;
const lsEsWords = () => LS_ESW || (LS_ESW = new Set(typeof ES_UNITS != 'undefined' ? ES_UNITS.flatMap(u => u.items.map(it => String(it[0]).toLowerCase())) : []));
const lsPlain = t => String(t).replace(/[«»]/g, '');
function lsSay(t, p) {
  const rs = lsRuns(t, p == 'es');
  if (!rs.some(x => x[1])) return say(lsPlain(t));
  rs.forEach(([x, es], k) => say(x, null, es ? 'es' : null, k > 0));
}
// the state that shows value v on a make question's model (the pet's build, the child's fix)
const lsOf = (q, v) => (K2MM[q.model].of ? K2MM[q.model].of(q, v) : q.model == 'b10' ? [Math.floor(v / 10), v % 10] : [+v]);
/* TEACH-2b: the words of a drafted script (docs/drafts, reviewed; 52e-words.js) are lines with {slots}: lsFill fills them from a
   question's or a build's numbers (q.sl, ctx), {name} and {pet} from the save. A line with a slot the moment has no number for is left
   out (null), never said with a hole; tools/test.js checks every drafted line fills. lsW(lines, k, sl): line k (round the list), filled. */
function lsFill(t, sl) {
  let ok = true;
  const o = String(t).replace(/\{(\w+)\}/g, (m, k) => (k == 'name' ? lsName() : k == 'pet' ? petN() : sl && sl[k] != null ? String(sl[k]) : (ok = false, m)));
  return ok ? o : null;
}
const lsW = (a, k, sl) => { a = [].concat(a || []); const t = a.length ? lsFill(a[k % a.length], sl) : null; return t ? [t] : []; };
// an answer as the pet says it: a time as words, cents with their unit
const LS_SIGN = {'<': 'is less than', '>': 'is greater than', '=': 'is equal to'};
const lsSayV = (q, v) => (q.vsay ? q.vsay(String(v)) : q.kind == 'make' && /^(clock|hands)$/.test(q.model) && /:/.test(v) ? mmTimeSay(...String(v).split(':').map(Number))
  : LS_SIGN[v] && q.sl ? `${q.sl.a} ${LS_SIGN[v]} ${q.sl.b}` : q.cents ? v + ' cents' : String(v));
