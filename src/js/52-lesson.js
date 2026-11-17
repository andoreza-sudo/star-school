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
      rem: (o.rem || []).filter(x => LESSONS[x] && x !== id), day: o.day || 0, S: o.S || S, last: -1, drop: false, done: false};
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
    if (B == 'pre') it = [0, 1].slice(st.pre.length).map(k => ({m: 'ask', one: 1, q: L.q(L.test, r), lines: k ? [] : [T.hi(lsName()), 'First, show me what you know.']}));
    else if (B == 'rem') it = st.rem.slice(0, 1).map(x => ({m: 'ask', help: 1, rem: x, q: LESSONS[x].q(LESSONS[x].test, r), lines: [T.rem]}));
    else if (B == 'exp') {
      st.exp = L.exp(r);
      it = [{m: 'open', q: st.exp.q, nudge: st.exp.nudge, lines: ["Let's play first."]}];
    } else if (B == 'name') {
      const n = L.name(st.ctx, r);
      it = [{m: 'say', html: n.html, lines: n.lines}];
    } else if (B == 'tog') it = [LS.togItem(st, ["Now let's do some together."])];
    else if (B == 'chk') it = [LS.petItem(st)];
    else if (B == 'show') it = [0, 1].map(k => ({m: 'ask', one: 1, q: L.q(L.test, r), lines: k ? [] : [st.to ? T.testOut : T.showMe]}));
    else if (B == 'win') it = [{m: 'ask', help: 3, win: 1, q: L.q(0, r), lines: ['One more, together!']}];
    st.items = it;
    return it.length ? st : LS.after(st);
  },
  // the next Together item: stage 0 first, then one up after a right first try, one down after a miss (the picture comes back)
  togItem(st, lines) {
    const s = st.last < 0 ? 0 : st.drop ? Math.max(0, st.last - 1) : Math.min(2, st.last + 1);
    st.last = s;
    st.drop = false;
    return {m: 'ask', help: 1, tog: 1, q: st.L.q(s, st.r), lines: lines || []};
  },
  // Check me: one of the stop's questions (the build when it builds on a model, else the picture) and the pet's own answer: the
  // child's own misconception when the record shows one, else the script's first; right about PET_OK of the time
  petItem(st) {
    const L = st.L, r = st.r, T = lsTone(), held = knowHeld(st.id, st.S), codes = held && L.bugs.includes(held) ? [held] : L.bugs;
    const petOk = r() < LS.PET_OK;
    let q, pv, code = null;
    // up to 30 questions for the preferred mistake, then any of the stop's
    for (let n = 0; n < 40 && pv == null; n++) {
      const q0 = L.q(0, r);
      q = q0.kind == 'make' && !q0.goal || q0.kind == 'line' ? q0 : L.q(1, r);
      if (petOk) { pv = q.ans; break; }
      for (const c of n < 30 ? codes : L.bugs) {
        const v = ((q.bug || {})[c] || []).find(x => String(x) !== q.ans && !lsOk(q, String(x)) && LS.fits(q, x));
        if (v != null) { pv = String(v); code = c; break; }
      }
    }
    if (pv == null) pv = q.ans; // never reached with these scripts (tools/test.js checks every pet item)
    const ok = lsOk(q, pv);
    return {m: 'judge', q, pv, petOk: ok, code, lines: [T.myTurn, LS.petSays(q, pv)]};
  },
  // can the pet's answer be shown on this question's model?
  fits(q, v) {
    const n = +v;
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
    if (q.kind == 'make') q.s0 = q.model == 'b10' ? [Math.floor(v / 10), v % 10] : [v];
    if (q.kind == 'line') q.start = String(v);
    return {m: 'ask', help: 1, fix: 1, q, lines: [lsTone().fixIt]};
  },
  // what the child did: v is the value the kind submits (a frame2 build: its state). Returns {ok, act: 'next' | 'retry' | 'reveal', lines, mood}
  answer(st, v) {
    const it = LS.cur(st), T = lsTone(), B = LSB[st.b];
    if (!it) return null;
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
      if (!it.petOk) st.items.splice(st.i + 1, 0, LS.fixItem(it));
      return {ok, act: 'next', mood: it.petOk ? 'happy' : 'oops',
        lines: it.petOk ? [yes ? T.rightMe : T.wrongMe] : [yes ? T.fooled : T.caught]};
    }
    const ok = lsOk(it.q, v), first = !it.tries;
    if (first && it.rem) knowRemember(it.rem, ok, st.day, st.S);
    else if (first && !it.fix && !it.win) knowAdd(st.id, it.q, v, ok, st.S);
    if (it.one) {
      it.tries = 1;
      (B == 'pre' ? st.pre : st.post).push(ok);
      return {ok, act: ok ? 'next' : 'reveal', lines: ok ? yay() : [T.tryMore]};
    }
    if (ok) return {ok, act: 'next', lines: it.tries ? ['You fixed it!'] : yay(), mood: 'happy'};
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
    k.n++;
    if (k.s < 1) k.s = 1;
    if (pass && k.s < 2) Object.assign(k, {s: 2, d: st.day, box: 0, due: st.day + LS_GAP[0], last: st.day});
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
    const f = LS.finish(st), p = 'math', ni = NODES[p].findIndex(n => nid(n) === st.id), nd = NODES[p][ni], d = day(), sc = f.sc, n = st.post.length;
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
    const day0 = lsDay(), pl = planToday(S, day0) || {}, les = S.les && S.les.n === id ? S.les : null;
    LS.st = LS.make(id, les ? {seed: les.s, at: les.b, pre: les.pre, day: day0, rem: []} : {rem: pl.remember || [], day: day0});
    warmVoices();
    LS.show();
  },
  voice: () => !!S.voice || gradeCfg().auto != 'tap',
  // say lines (and show cap, or the lines, in the pet's bubble); then() once they have been said
  talk(lines, then, cap0) {
    const t = lines.filter(Boolean).join(' '), b = $('#lsbub'), me = LS.st, c = cap0 || t;
    if (b) { b.firstChild.textContent = c; b.classList.toggle('on', !!c); }
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
    save();
    LS.seq++; // screens shown (tests wait for the next one)
    const q = it.q, B = LSB[st.b], T = lsTone();
    LS.u = {lock: true, typed: '', built: [], tries: 0};
    const at = LS_PIPS.findIndex(x => x[0] == B), pips = LS_PIPS.map(([k, ic, l], j) => `<span class="ls-pip${j < at || B == 'win' ? ' on' : j == at ? ' now' : ''}" aria-hidden="true">${ico(ic, 18)}</span>`).join('');
    let prompt = '', input = '';
    if (it.m == 'say') {
      prompt = it.html;
      input = UI.btn('Next', {kind: 'primary', size: 'lg', icon: 'go', id: 'lsnext'});
    } else if (it.m == 'judge') {
      prompt = LS.petWork(q, it.pv);
      input = `<div class="ls-judge">${UI.btn('Right', {kind: 'soft', size: 'lg', icon: 'thumbs-up', id: 'lsyes'})}${UI.btn('Not right', {kind: 'soft', size: 'lg', icon: 'close', id: 'lsno'})}</div>`;
    } else {
      prompt = q.html;
      input = KIND[q.kind].render(q);
    }
    const tag = B == 'pre' ? 'Show me' : B == 'win' ? 'One more' : (LS_PIPS[at] || [])[2] || '';
    view(`<div class="top tbar round qtop ls-top s-math">${NAV.house('quit')}<div class="ls-pips" role="img" aria-label="${esc(tag)}">${pips}</div>
     <div class="pl-tag ls-tag">${ico('doc', 24)}<span>${esc(st.L.t)}</span></div></div>
    <div class="play qs s-math ls-play" id="lsplay" data-beat="${B}" data-mode="${it.m}"><div class="qarea">
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
      const s = q.model == 'b10' ? [Math.floor(v / 10), v % 10] : [+v];
      return q.html + `<div class="ls-pw">${K2MM[q.model].draw(q, s).replace('<svg ', '<svg aria-hidden="true" ')}</div>`;
    }
    if (q.kind == 'line') return q.html + `<div class="ls-pw">${VIZ.numLine(Object.assign({}, q.line, {pin: +v})).replace('<svg ', '<svg aria-hidden="true" ')}</div>`;
    const c = q.kind == 'choice' ? q.choices.find(x => x.v === String(v)) : null;
    return q.html.replace(SLOT, `<span class="slot ls-pv">${esc(c ? c.l : v)}</span>`);
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
    if (q.kind == 'make' && q.model == 'frame2') v = u.mm.slice();
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
      if (it.m == 'open') { u.mmMoved = false; if (q.kind == 'make') KIND.make.draw(q, u); }
      else {
        if (h && q.hint) { h.innerHTML = LS.hint(q); h.scrollIntoView({block: 'nearest'}); }
        K.retry(q, u, () => {});
      }
      LS.talk(res.lines);
      u.lock = false;
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
    const st = LS.st, rec = LS.record(st), T = lsTone(), L = st.L;
    LS.st = null;
    const line = rec.pass ? (st.to ? 'You already knew it!' : 'You learned it!') : 'Great learning today!';
    view(`<div class="top tbar s-math ls-top">${NAV.house('lshome')}<div class="ttl">${ico('doc', 30)}<span>${esc(L.t)}</span></div></div>
    <div class="scroll ls-end" id="lsend"><div class="ls-endc">
     <div class="ls-art ls-big" id="lsart" aria-hidden="true"></div>
     <h1>${esc(line)}</h1><p class="ls-idea">${ico('hint', 26)}<span>${esc(L.idea)}</span></p>
     ${rec.pass ? UI.stars(rec.stars, 3, 34) : ''}
     <ul class="rw-pl ls-earn"><li>${ico('star', 18)}<span>+${rec.sc} stars</span></li><li>${ico('coin', 18)}<span>+${rec.coins} coins</span></li>
      <li>${ico('ticket', 18)}<span>+${fmtM(rec.PT.sec)} of game time</span></li>${rec.newPass && rec.next >= 0 ? `<li>${ico('map', 18)}<span>Next stop unlocked: ${esc(NODES.math[rec.next].t)}!</span></li>` : ''}</ul>
     <div class="ls-acts">${UI.btn('Practice', {kind: rec.pass ? 'soft' : 'primary', size: 'lg', icon: 'play', id: 'lsprac'})}${UI.btn('Map', {kind: rec.pass ? 'primary' : 'soft', size: 'lg', icon: 'map', id: 'lsmap'})}</div>
    </div></div>`);
    LS.mood('cheer');
    $('#lshome').onclick = () => { SFX.whoosh(); home(); };
    $('#lsprac').onclick = () => { SFX.whoosh(); start('math', rec.ni); };
    $('#lsmap').onclick = () => { SFX.whoosh(); pathMap('math'); };
    SFX.fanfare();
    if (rec.pass) confetti(24);
    if (LS.voice()) say(`${line} ${L.idea} ${T.bye(lsName())}`);
  },
  // the offer on the math map: a notebook button by the stop the planner picks (owner decision 1: inside the subject the child chose,
  // never a front door). Placed above the stop, or beside it, wherever it covers nothing; no button when nothing is free.
  mapAdd() {
    const m = $('#map');
    if (!m || MAPP != 'math' || TEACH.off || gradeOf() > 2) return;
    const old = m.querySelector('.ls-go');
    if (old) old.remove();
    const pl = planToday(S, lsDay()), b = pl && m.querySelector(`.node[data-n="${pl.i}"]`);
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
    m.insertAdjacentHTML('beforeend', `<button class="btn ls-go" style="left:${at[0]}px;top:${at[1]}px" aria-label="Learn ${esc(NODES.math[pl.i].t)} with ${esc(petN())}">${ico('doc', 30)}</button>`);
    m.querySelector('.ls-go').onclick = () => { SFX.whoosh(); LS.start(pl.id); };
  },
};
const lsName = () => (S.name || 'friend');
