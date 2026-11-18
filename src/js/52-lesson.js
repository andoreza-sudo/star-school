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
   Saved: S.know, S.lm, S.lr, S.les (52b-know.js); the stop record the same way finish() writes it (LS.record). */
const LSB = ['pre', 'rem', 'exp', 'name', 'tog', 'chk', 'show', 'win'];
const LS_PIPS = [['rem', 'replay', 'Remember'], ['exp', 'blocks', 'Explore'], ['name', 'hint', 'Name it'], ['tog', 'users', 'Together'],
  ['chk', 'check-circle', 'Check me'], ['show', 'star', 'Show']];
const LS = {
  TOG: 3,        // Together items
  PET_OK: .25,   // how often the pet is right in Check me
  WAKE: 6000,    // the answer controls wake at the latest this long after a spoken line starts
  st: null, u: null, seq: 0,
  // ---- the state machine ----
  // a new lesson. o: {seed, rem: [lesson ids due], day, S (the save; default S), at: beat to resume at, pre: results already given}
  make(id, o = {}) {
    const L = LESSONS[id], seed = (o.seed >>> 0) || ((Math.random() * 4294967296) >>> 0);
    const st = {id, L, seed, r: mulberry32(seed + (o.at | 0)), b: -1, items: [], i: 0, pre: (o.pre || []).slice(), post: [], to: false, ctx: {}, chk: [],
      rem: (o.rem || []).filter(x => LESSONS[x] && x !== id), day: o.day || 0, S: o.S || S, last: -1, drop: false, done: false,
      repair: BUGS[o.repair] ? o.repair : null};
    if (o.at && st.pre.length == 2 && st.pre.every(Boolean) && o.at <= LSB.indexOf('show')) st.to = true;
    LS.beat(st, Math.max(0, Math.min(o.at | 0, LSB.indexOf('show'))));
    return st;
  },
  cur: st => (st.done ? null : st.items[st.i] || null),
  beat(st, b) {
    const L = st.L, r = st.r, T = lsTone(), B = LSB[b];
    st.b = b;
    st.i = 0;
    let it = [];
    if (B == 'pre') it = [0, 1].slice(st.pre.length).map(k => ({m: 'ask', one: 1, q: L.q(L.test, r), lines: k ? [] : [T.hi(lsName()), T.first]}));
    else if (B == 'rem') {
      it = st.rem.slice(0, 1).map(x => ({m: 'ask', help: 1, rem: x, q: LESSONS[x].q(LESSONS[x].test, r), lines: [T.rem]}));
      // TEACH-2b: nothing due, and the script has a warm-up on the idea it builds on: that, with the script's Remember line
      if (!it.length && L.warm) { const q = L.warm(r); it = [{m: 'ask', help: 1, warm: 1, q, lines: L.w ? lsW(L.w.beats.remember, 0, q.sl) : [T.rem]}]; }
    }
    else if (B == 'exp') {
      st.exp = L.exp(r);
      it = [{m: 'open', q: st.exp.q, nudge: st.exp.nudge, lines: [T.play].concat(st.exp.lines || [])}];
      // a repair (TEACH-PLAN-2 system C): the lesson opens with a contrast on the model, the right answer beside the held idea's
      const c = st.repair && LS.contrast(st, st.repair);
      if (c) it.unshift(c);
    } else if (B == 'name') {
      const n = L.name(st.ctx, r);
      it = [{m: 'say', html: n.html, lines: n.lines}];
    } else if (B == 'tog') it = [LS.togItem(st, [T.tog])];
    else if (B == 'chk') it = L.chk ? L.chk(st) : [LS.petItem(st)]; // TEACH-3: grades 3-5 have their own Check me (52i-bench35.js)
    else if (B == 'show') it = [0, 1].map(k => {
      // TEACH-2b: a drafted script frames Show as its job in the world (its Show lines), unless the child tested out
      const q = L.q(L.test, r), w = L.w && !st.to ? lsW(L.w.beats.show, k, q.sl) : [];
      return {m: 'ask', one: 1, q, lines: k ? (L.w && L.w.beats.show.length > 1 ? w : []) : [st.to ? T.testOut : w[0] || T.showMe]};
    });
    else if (B == 'win') it = [{m: 'ask', help: 3, win: 1, q: L.q(0, r), lines: [T.more]}];
    st.items = it;
    return it.length ? st : LS.after(st);
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
    const petOk = r() < LS.PET_OK;
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
    if (pv == null) pv = q.ans; // never reached with these scripts (tools/test.js checks every pet item)
    const ok = lsOk(q, pv);
    return {m: 'judge', q, pv, petOk: ok, code, lines: [T.myTurn, (L.w && lsW(L.w.beats.check.filter(t => /\{ans\}/.test(t)), 0, Object.assign({}, q.sl, {ans: lsSayV(q, pv)}))[0]) || LS.petSays(q, pv)]};
  },
  // can the pet's answer be shown on this question's model?
  fits(q, v) {
    const n = +v, M = q.kind == 'make' && K2MM[q.model];
    if (M && M.fits) return M.fits(q, v);
    if (q.kind == 'make' && q.model == 'frame') return Number.isInteger(n) && n >= 0 && n <= q.m.total - (q.m.fixed || 0) && !(q.s0 && n > q.s0[0]);
    if (q.kind == 'make' && q.model == 'b10') return Number.isInteger(n) && n > 0 && n < 100;
    if (q.kind == 'line') return Number.isInteger(n) && n >= q.line.min && n <= q.line.max && String(n) !== String(q.start);
    if (q.kind == 'choice') return q.choices.some(c => c.v === String(v));
    return Number.isInteger(n) && n >= 0;
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
      if (!it.petOk) st.items.splice(st.i + 1, 0, ...(it.after ? it.after(st) : [LS.fixItem(it)])); // TEACH-3: the fix, then the reason from tiles
      // TEACH-2b: a drafted script's reason for the pet's mistake (its misconception code), after it is caught
      const why = !it.petOk && it.code && st.L.w ? lsW((st.L.w.reasons || {})[it.code], 0, it.q.sl) : [];
      return {ok, act: 'next', mood: it.petOk ? 'happy' : 'oops',
        lines: it.petOk ? [yes ? T.rightMe : T.wrongMe] : [yes ? T.fooled : T.caught].concat(why)};
    }
    const ok = lsOk(it.q, v), first = !it.tries, M = it.q.kind == 'make' && K2MM[it.q.model];
    if (first && it.rem) knowRemember(it.rem, ok, st.day, st.S);
    else if (first && !it.fix && !it.win && !it.warm) knowAdd(st.id, it.q, M && M.raw && Array.isArray(v) ? String(M.val(it.q, v)) : v, ok, st.S, st.day);
    if (it.one) {
      it.tries = 1;
      (B == 'pre' ? st.pre : st.post).push(ok);
      return {ok, act: ok ? 'next' : 'reveal', lines: ok ? yay() : [T.tryMore]};
    }
    if (ok) return {ok, act: 'next', lines: it.tries ? [T.fixed] : yay(), mood: 'happy'};
    it.tries = (it.tries || 0) + 1;
    if (it.tog) st.drop = true;
    if (it.tries <= it.help) return {ok, act: 'retry', lines: [T.help]};
    return {ok, act: 'reveal', lines: it.win ? [T.win] : [T.tryMore]};
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
     keep working: the stop's stars (S.maps, setSt: 2 for a passed lesson, never lower than before), a world finished (S.wdone, +20 coins),
     the skill's tries and right answers (P(sk).t, .c: the Show items), stars and coins (one each for a right Show item), a sticker,
     the day's rounds (day().r, for the "round" mission), the activity log (actRound), the streak (streakTick), missions (MIS.done)
     and game time (ptCalc, ptEarn). Not written: P(sk).r (rounds played), S.best (a streak in a row), mastery (S.mast). */
  record(st) {
    S.tq = st.L.home.replace('{name}', S.name || 'your child'); // tonight's question for the grown-ups' report card (82-report.js)
    const f = LS.finish(st), p = st.L.p || 'math', ni = NODES[p].findIndex(n => nid(n) === st.id), nd = NODES[p][ni], d = day(), sc = f.sc, n = st.post.length;
    const stars = f.pass ? 2 : 0, prev = getSt(p, ni), newPass = !prev && stars > 0;
    setSt(p, ni, Math.max(prev, stars));
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
    const coins = sc + (mi.bonus ? 5 : 0) + (wDone ? 20 : 0), PT = ptCalc({path: p, node: ni}, sc, n || 1, stars, prev, newPass, false, nd, {mission: mi.bonus});
    ptEarn(PT.sec);
    S.stars += sc + (mi.bonus ? 5 : 0);
    S.coins += coins;
    save();
    return Object.assign(f, {stars, prev, newPass, wDone, prizes, mi, stk, coins, PT, ni, next: ni + 1 < NODES[p].length && unlocked(p, ni + 1) ? ni + 1 : -1});
  },

  // ---- the screen ----
  start(id) {
    if (!LESSONS[id]) return;
    const day0 = lsDay(), pl = planToday(S, day0, LESSONS[id].p || 'math') || {}, // TEACH-4: Remember from the lesson's own subject
      les = S.les && S.les.n === id ? S.les : null;
    LS.st = LS.make(id, les ? {seed: les.s, at: les.b, pre: les.pre, day: day0, rem: [], repair: les.r} : {rem: pl.remember || [], day: day0, repair: pl.id === id && pl.code});
    warmVoices();
    LS.show();
  },
  voice: () => !!S.voice || gradeCfg().auto != 'tap',
  // say lines (and show cap, or the lines, in the pet's bubble); then() once they have been said
  talk(lines, then, cap0) {
    const t = lines.filter(Boolean).join(' '), b = $('#lsbub'), me = LS.st, c = cap0 || t;
    if (b) { b.firstChild.textContent = c; b.classList.toggle('on', !!c); }
    // TEACH-4: a recorded line (EN_TEACH, 12-speech.js) plays wherever its sentence falls in the lines; the rest is the tablet's voice
    if (t && LS.voice()) say(t);
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
    S.les = {n: st.id, b: st.b, s: st.seed, pre: st.pre.slice()};
    if (st.repair) S.les.r = st.repair;
    save();
    LS.seq++; // screens shown (tests wait for the next one)
    const q = it.q, B = LSB[st.b], T = lsTone(), sp = st.L.p || 'math';
    LS.u = {lock: true, typed: '', built: [], tries: 0};
    const at = LS_PIPS.findIndex(x => x[0] == B), pips = LS_PIPS.map(([k, ic, l], j) => `<span class="ls-pip${j < at || B == 'win' ? ' on' : j == at ? ' now' : ''}" aria-hidden="true">${ico(ic, 18)}</span>`).join('');
    let prompt = '', input = '';
    if (it.m == 'say') {
      prompt = it.html;
      input = UI.btn('Next', {kind: 'primary', size: 'lg', icon: 'go', id: 'lsnext'});
    } else if (it.m == 'judge') {
      prompt = it.pw || LS.petWork(q, it.pv); // TEACH-3: the pet's written steps
      input = `<div class="ls-judge">${UI.btn('Right', {kind: 'soft', size: 'lg', icon: 'thumbs-up', id: 'lsyes'})}${UI.btn('Not right', {kind: 'soft', size: 'lg', icon: 'close', id: 'lsno'})}</div>`;
    } else {
      prompt = q.html;
      input = KIND[q.kind].render(q);
    }
    const tag = B == 'pre' ? 'Show me' : B == 'win' ? 'One more' : (LS_PIPS[at] || [])[2] || '';
    view(`<div class="top tbar round qtop ls-top s-${sp}">${NAV.house('quit')}<div class="ls-pips" role="img" aria-label="${esc(tag)}">${pips}</div>
     <div class="pl-tag ls-tag">${ico('doc', 24)}<span>${esc(st.L.t)}</span></div></div>
    <div class="play qs s-${sp} ls-play" id="lsplay" data-beat="${B}" data-mode="${it.m}"><div class="qarea">
     <div class="ls-pet${it.m == 'judge' ? ' ls-turn' : ''}"><div class="ls-art" id="lsart" aria-hidden="true"></div><div class="ls-bub" id="lsbub" role="status"><span></span></div>
      ${UI.ibtn('speak', 'Hear it again', {size: 'sm', id: 'lshear', cls: 'ls-hear'})}</div>
     <div class="prompt" id="prompt">${prompt}</div><div class="qhint"><div id="hint" class="hint"></div></div></div>
    <div class="inp ls-wait" id="lsinp">${input}</div></div>`);
    LS.mood(it.m == 'judge' ? 'idle' : 'happy');
    NAV.wire('quit', {leave: () => { LS.st = null; save(); }});
    const lines = (it.lines || []).concat(it.m == 'ask' || it.m == 'open' ? [q.say] : it.m == 'say' ? [] : []);
    $('#lshear').onclick = () => LS.talk(it.m == 'say' ? it.lines : lines.length ? lines : [q.say]);
    UI.hear();
    const wake = () => { const w = $('#lsinp'); if (w) w.classList.remove('ls-wait'); if (LS.u) LS.u.lock = false; };
    if (it.m == 'say') $('#lsnext').onclick = () => { if (!LS.u.lock) LS.go(LS.answer(st, 'ok')); };
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
    const it = LS.cur(st), res = LS.answer(st, v), b = $(v == '1' ? '#lsyes' : '#lsno');
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
    const res = LS.answer(st, v);
    u.lock = true;
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
        if (h && q.hint) { h.innerHTML = LS.hint(q); h.scrollIntoView({block: 'nearest'}); }
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
    if (h && q.hint) h.innerHTML = LS.hint(q);
    fit();
    LS.go(res, K.spoken(q));
  },
  hint: q => (q.hint.k == 'html' ? q.hint.html : esc(q.hint.s)),
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
    const line = rec.pass ? (st.to ? 'You already knew it!' : 'You learned it!') : 'Great learning today!';
    view(`<div class="top tbar s-${p} ls-top">${NAV.house('lshome')}<div class="ttl">${ico('doc', 30)}<span>${esc(L.t)}</span></div></div>
    <div class="scroll ls-end" id="lsend"><div class="ls-endc">
     <div class="ls-art ls-big" id="lsart" aria-hidden="true"></div>
     <h1>${esc(line)}</h1><p class="ls-idea">${ico('hint', 26)}<span>${esc(L.idea)}</span></p>
     ${rec.pass ? UI.stars(rec.stars, 3, 34) : ''}
     <ul class="rw-pl ls-earn"><li>${ico('star', 18)}<span>+${rec.sc} stars</span></li><li>${ico('coin', 18)}<span>+${rec.coins} coins</span></li>
      <li>${ico('ticket', 18)}<span>+${fmtM(rec.PT.sec)} of game time</span></li>${rec.newPass && rec.next >= 0 ? `<li>${ico('map', 18)}<span>Next stop unlocked: ${esc(NODES[p][rec.next].t)}!</span></li>` : ''}</ul>
     <div class="ls-acts">${UI.btn('Practice', {kind: rec.pass ? 'soft' : 'primary', size: 'lg', icon: 'play', id: 'lsprac'})}${UI.btn('Map', {kind: rec.pass ? 'primary' : 'soft', size: 'lg', icon: 'map', id: 'lsmap'})}${UI.btn('Notebook', {kind: 'soft', size: 'lg', icon: 'doc', id: 'lsnb'})}</div>
    </div></div>`);
    LS.mood('cheer');
    $('#lshome').onclick = () => { SFX.whoosh(); home(); };
    $('#lsprac').onclick = () => { SFX.whoosh(); start(p, rec.ni); };
    $('#lsmap').onclick = () => { SFX.whoosh(); pathMap(p); };
    $('#lsnb').onclick = () => { SFX.whoosh(); NB.open(() => pathMap(p)); };
    SFX.fanfare();
    if (rec.pass) confetti(24);
    if (LS.voice()) say(`${line} ${L.idea} ${T.bye(lsName())}`);
  },
  // the offer on the math map: a notebook button by the stop the planner picks (owner decision 1: inside the subject the child chose,
  // never a front door). Placed above the stop, or beside it, wherever it covers nothing; no button when nothing is free.
  mapAdd() {
    const m = $('#map');
    if (!m || MAPP != 'math' && MAPP != 'read' || TEACH.off || gradeOf() > 2 && !partReady('teach35')) return; // TEACH-3: grades 3 up once their lessons are in; TEACH-4: the reading map too
    const old = m.querySelector('.ls-go');
    if (old) old.remove();
    NB.mapBtn();
    const pl = planToday(S, lsDay(), MAPP), b = pl && m.querySelector(`.node[data-n="${pl.i}"]`);
    if (!b) return;
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
    m.querySelector('.ls-go').onclick = () => { SFX.whoosh(); LS.start(pl.id); };
  },
};
const lsName = () => (S.name || 'friend');
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
