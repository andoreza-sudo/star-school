/* Whistlestop sprint v202. BUILT by tools/build.py from 45-placement.js, 57-fluency.js: never edit by hand.
   index.html v202 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v202.js. */
/* RELA-SIZE: part sprint (loaded on demand: partThen('sprint', ...) in 45a-place.js). The Home card, the Grown-ups row and placeWorld
   are in 45a-place.js (part gen, read at start). */
/* ---------- placement quiz "Find my level" (P1-07; ROADMAP 3.2 step 3) ----------
   Optional, per graded path (math, reading; not Spanish, whose worlds are word sets in an order, not a ladder), not for Pre-K.
   Rules (ROADMAP 3.2):
     - starts one grade below the child's grade: the first world with g >= grade - 1 (the last world if none is)
     - a testlet is 4 questions from one world. 3 or 4 right: pass, go up one world. 0 or 1 right: not yet, go down one world.
       2 right: one more testlet at the same world, which then passes at 6 of 8.
       R-01b: the first pass of a quiz is confirmed: until a world has passed, 3 right also asks one more testlet (6 of 8 passes);
       4 of 4 passes at once. The quiz still stops at 20 questions, so a child far above the start world is placed a little lower
       more often (harmless: they can test out); a struggling child is placed too high far less often.
     - stops when a "not yet" world sits directly above a passed world, at either end of the path, or after 5 testlets (20 questions)
     - result: the map starts at the lowest world not passed (the one above the highest passed world). The worlds below it get
       S.skip[worldId] = 1: a check mark, no stars, still playable. With no world passed it starts at the lowest world asked.
   Two parts:
     PLACE.*      pure state machine: takes the world list, a seed and the number right per testlet; no S, no DOM, no Math.random.
                  The same seed and answers always give the same questions and the same result (tests rely on it).
     place*()     a thin screen on the question kinds (KIND render/bind): no stars, no buzz, no hints, one try per question,
                  a neutral "Got it!" and progress dots. Nothing is saved until the last testlet is answered; quitting
                  (the X, or leaving the screen) changes nothing.
   Saved (only by placeApply, at the end): S.place[path] = {world, date, asked, right, g} (world id, today(), questions asked,
   right answers, the grade it was taken at) and S.skip[worldId] = 1 for the worlds below the result. It only ever adds: no star,
   stop, coin or skip is removed, nothing is re-locked. startWorld() (42-paths.js) reads the result through placeWorld(p) while
   the grade is unchanged, so the map opens on the placed world. A later run replaces S.place[path]; earlier skips stay. */
const PLACE={
  TL:4,  // questions per testlet
  MAX:5, // testlets at most: 20 questions
  // The start world for a grade: the first world with g >= grade - 1, else the last world.
  first(worlds,grade){
    const k=worlds.findIndex(w=>w.g>=grade-1);
    return k<0?worlds.length-1:k;
  },
  // A new quiz. rec[wi] = {t: testlets, r: right, v: 'pass' | 'fail'} per world asked.
  begin(worlds,grade,seed){
    return{n:worlds.length,wi:PLACE.first(worlds,grade),seed:seed>>>0,k:0,asked:0,right:0,rec:{},done:false,at:-1,skip:[]};
  },
  // The 4 questions of the next testlet: [{sk, lv, seed}], from the stops (not the boss, not a skill marked noPlace) of world st.wi.
  // Stops are shuffled by a private stream from (seed, testlet number) and taken in turn, so a world with 2 stops gives 2 each.
  items(worlds,st){
    const r=mulberry32((st.seed^Math.imul(st.k+1,0x9E3779B1))>>>0);
    const ns=worlds[st.wi].nodes.filter(nd=>!(SK[nd[0]]&&SK[nd[0]].noPlace)); // P2-16: tracing is not asked in the quiz
    for(let i=ns.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[ns[i],ns[j]]=[ns[j],ns[i]]}
    const out=[];
    for(let i=0;i<PLACE.TL;i++){const nd=ns[i%ns.length];out.push({sk:nd[0],lv:nd[1],seed:Math.floor(r()*4294967296)>>>0})}
    return out;
  },
  // Score one testlet (right = how many of the 4 were right) and move on. Returns a new state; st is not changed.
  step(st,right){
    const s=JSON.parse(JSON.stringify(st));
    if(s.done)return s;
    right=Math.max(0,Math.min(PLACE.TL,right|0));
    const w=s.wi,rec=s.rec[w]||(s.rec[w]={t:0,r:0});
    rec.t++;rec.r+=right;s.k++;s.asked+=PLACE.TL;s.right+=right;
    let v=null;
    // R-01b: the quiz's first pass must be confirmed. While no world has passed yet, 3 of 4 is not enough (a lucky guess or two
    // moved a struggling child up): it asks one more testlet here like 2 of 4 does, and 4 of 4 still passes at once.
    const first=!Object.values(s.rec).some(x=>x.v=='pass'),need1=first?PLACE.TL:3;
    if(rec.t==1)v=right>=need1?'pass':right<=1?'fail':null; // 2 right (3 on the first pass): one more testlet here
    else v=rec.r>=6?'pass':'fail';                          // two testlets: pass at 6 of 8
    if(v)rec.v=v;
    const R=s.rec;
    let stop=s.k>=PLACE.MAX;
    if(v=='pass'){if(w+1>=s.n||(R[w+1]&&R[w+1].v=='fail'))stop=true;else if(!stop)s.wi=w+1}
    if(v=='fail'){if(w==0||(R[w-1]&&R[w-1].v=='pass'))stop=true;else if(!stop)s.wi=w-1}
    if(stop)PLACE.finish(s);
    return s;
  },
  // Work out the result: s.at = the world to start at, s.skip = worlds to mark skipped, s.all = every world passed.
  finish(s){
    s.done=true;
    const ws=Object.keys(s.rec).map(Number),hi=Math.max(-1,...ws.filter(w=>s.rec[w].v=='pass'));
    s.all=hi>=s.n-1;
    s.at=hi>=0?Math.min(hi+1,s.n-1):Math.min(...ws);
    s.skip=[];
    for(let i=0;i<=hi;i++)s.skip.push(i);
    return s;
  },
  // Run a whole quiz with an answer function ans(world index, item) -> true/false. Used by the tests.
  sim(worlds,grade,seed,ans){
    let st=PLACE.begin(worlds,grade,seed);
    while(!st.done){const its=PLACE.items(worlds,st);st=PLACE.step(st,its.filter(it=>ans(st.wi,it)).length)}
    return st;
  }
};

// Save a finished quiz. Adds skips and the record; never removes or lowers anything.
function placeApply(p,st){
  if(!st||!st.done)return null;
  const ws=PATHS[p].worlds;
  S.skip=S.skip||{};
  for(const wi of st.skip)S.skip[ws[wi].id]=1;
  S.place=S.place||{};
  S.place[p]={world:ws[st.at].id,date:today(),asked:st.asked,right:st.right,g:gradeOf()};
  save();
  return S.place[p];
}

const placeBack=()=>home(); // RC-2: a child is handed the quiz: Back goes Home, never into Grown-ups (was: Grown-ups when started there)
function placeIntro(p,from){
  PL=null;
  if(G)G.dead=true; // a finished or left round must not fire its next-question timer into this screen
  const nm=esc(placeName(p));
  view(`<div class="center pl-in s-${p}"><div class="pl-big">${ico(UI.SUBJ_ICON[p]||'map',64)}<i class="pl-tg">${ico('target',26)}</i></div><h1>Let's find your level!</h1>
   <p class="sub">A few ${nm} questions. Some may be tricky, and that's OK. Just do your best!</p>
   <p class="small">No stars to win or lose. You can stop any time.</p>
   <div class="rowh">${UI.btn('Start',{kind:'primary',size:'lg',icon:'play',id:'plgo'})}${UI.btn('Not now',{id:'plback'})}</div></div>`);
  if(S.voice)say(`Let's find your level! Some questions may be tricky. Just do your best!`);
  $('#plback').onclick=()=>{SFX.click();placeBack(from)};
  $('#plgo').onclick=()=>{
    SFX.whoosh();
    const seed=Math.floor(Math.random()*4294967296)>>>0;
    placeStart(p,from,seed);
  };
}
// Start the quiz on path p with a seed (smoke and shots pass a fixed one).
function placeStart(p,from,seed){
  const ws=PATHS[p].worlds;
  PL={p,from:from||'home',ws,st:PLACE.begin(ws,gradeOf(),seed),its:null,qi:0,right:0,lock:false};
  placeTestlet();
}
function placeTestlet(){
  PL.its=PLACE.items(PL.ws,PL.st).map(it=>genQ(it.sk,it.lv,it.seed));
  PL.qi=0;PL.right=0;
  placeQ();
}
function placeQ(){if(NAV.held&&PL){PL.pend=true;return} // NAV-01: the next question waits while Go Home? is open
  const me=PL,q=PL.its[PL.qi],K=KIND[q.kind];
  PL.q=q;PL.lock=false;PL.typed='';PL.tries=0;PL.built=[];
  const dots=PL.its.map((_,i)=>`<span class="pl-dot ${i<PL.qi?'on':i==PL.qi?'now':''}"></span>`).join('');
  view(`<div class="top tbar round qtop pl-top s-${PL.p}">${NAV.house('quit')}
   <div class="pl-dots" aria-label="Question ${PL.qi+1} of ${PL.its.length}">${dots}</div><div class="sp"></div>
   <div class="pl-tag">${ico(UI.SUBJ_ICON[PL.p]||'map',24)}<span>Find my level</span></div></div>
  <div class="play qs s-${PL.p}"><div class="qarea">${q.ctx?bankCtx(q.ctx):''}<div class="prompt" id="prompt">${q.html}</div>
  <div class="tools">${q.say?UI.btn('Hear it',{size:'sm',icon:'speak',id:'spk'}):''}</div></div>
  <div class="inp">${K.render(q)}</div></div>`);
  NAV.wire('quit',{hold:on=>{if(!on&&PL&&PL.pend){PL.pend=false;placeQ()}},leave:()=>{PL=null}}); // NAV-01: the corner house (nothing is saved until the end, as before)
  if($('#spk'))$('#spk').onclick=e=>say(q.say,e.currentTarget,q.lang=='es'&&q.auto=='must'?'es':null);
  UI.hear(); // P6-01
  $$('[data-sayes]').forEach(b=>b.onclick=()=>say(b.dataset.sayes,b,'es'));
  $$('[data-say]').forEach(b=>b.onclick=()=>say(b.dataset.say,b));
  $$('.w').forEach(s=>s.onclick=()=>{say(s.dataset.w);SFX.pop(1)});
  K.bind(q,PL,placeSubmit);esQFix(q);
  fit();if(document.fonts)document.fonts.ready.then(fit);
  if(q.auto==='must'||(q.auto&&S.voice)||(q.say&&gradeCfg().auto==='all'))setTimeout(()=>{if(PL===me&&me.q===q)say(q.say,null,q.lang=='es'?'es':null)},400);
}
// One try per question. Right or not, the child hears the same neutral "Got it!"; nothing is saved here.
function placeSubmit(v,el){
  if(!PL||PL.lock)return;
  const me=PL,q=PL.q,K=KIND[q.kind];
  PL.lock=true;
  if(K.same?K.same(q,v):String(v)===String(q.ans))PL.right++;
  if(el)el.classList.add('pl-pick');
  SFX.pop(2);fb(pick(['Got it!','Thanks!','Okay!']),'pl-fb'); // brand blue, not the green of a right answer
  const d=$$('.pl-dot')[PL.qi];if(d)d.className='pl-dot on';
  setTimeout(()=>{
    if(PL!==me)return; // quit or left meanwhile
    PL.qi++;
    if(PL.qi<PL.its.length)return placeQ();
    PL.st=PLACE.step(PL.st,PL.right);
    if(PL.st.done)placeDone();else placeTestlet();
  },700);
}
function placeDone(){
  const {p,st,from}=PL,ws=PL.ws;
  PL=null;
  placeApply(p,st);
  const w=ws[st.at],sk=st.skip.map(i=>ws[i]);
  const other=placePaths().find(x=>x!=p&&!(S.place&&S.place[x]));
  view(`<div class="center pl-in"><div class="pl-done">${ico('trophy',64)}</div><h1>All done! Great work${S.name?', '+esc(S.name):''}!</h1>
   <p class="sub">${st.all?`You know a lot! Your ${esc(placeName(p))} map opens at the last world:`:`Your ${esc(placeName(p))} map starts here:`}</p>
   <div class="pl-res">${wBadge(p,st.at)}${esc(w.n)}</div>
   ${sk.length?`<p class="small pl-skip">${ico('check','1.2em')} Skipped: ${sk.map(x=>esc(x.n)).join(', ')}. You can still play ${sk.length>1?"them":"it"} any time.</p>`:''}
   <div class="pl-end">${NAV.end3({next:'plmap',home:'plhome',extra:other?UI.btn(placeName(other)+' next',{icon:UI.SUBJ_ICON[other]||'map',id:'plnext',attrs:`data-place="${other}"`}):''})}</div></div>`); // NAV-01
  SFX.fanfare();
  if(S.voice)say(`All done! Great work! Your map starts at ${w.n}.`);
  $('#plmap').onclick=()=>{SFX.whoosh();pathMap(p,st.at)};
  if($('#plnext'))$('#plnext').onclick=()=>{SFX.whoosh();placeIntro(other,from)};
  $('#plhome').onclick=()=>{SFX.click();home()};
}
/* ---------- Fact Sprint (P5-01): the screens (part sprint) ----------
   RELA-SIZE: the lazy part sprint; Home, the Learn hub and the daily mission load it first (partThen('sprint', ...), 90-app.js).
   The sets and the rules (FLU), the sprint on screen (FL) and stopFlu are in 57a-flu.js (part gen): Home and the missions read
   FLU.on() at start, and view() calls stopFlu. */
const fluSecs = ms => (Math.round(ms / 100) / 10).toFixed(1);
const fluBest = (key, lower) => {
  const b = ((S.flu || {})[key] || {}).best;
  return b == null ? 'not yet' : lower ? b + ' s' : '' + b;
};

// P4-18: drawn set badges (the sign of the facts, and 10 or 20 on a tag) instead of the set emoji
const fluIco = id => /^add/.test(id) ? 'plus' : /^sub/.test(id) ? 'minus' : /^mf/.test(id) ? 'times' : /^df/.test(id) ? 'divide' : 'bolt';
const fluTag = id => (/(10|20)$/.exec(id) || [])[1] || '';
// Top bar of the sprint menus: back, a math badge with the bolt, the title
const fluTop = (t, icon) => `<div class="top tbar gx-mtop s-math">${UI.ibtn('back', 'Back', { size: 'sm', id: 'back' })}` +
  `<div class="ttl gx-ttl"><span class="gx-tb">${ico(icon, 24)}</span><span>${esc(t)}</span></div></div>`;

function fluMenu() {
  const sets = FLU.sets();
  view(`${fluTop('Fact Sprint', 'bolt')}
  <div class="scroll gx-list"><p class="gx-lead">Pick your facts. Beat your best!</p>
  <div class="games">${sets.map(s => GFX.card({ cls: 'game', attrs: `data-s="${s.id}"`, p: 'math', icon: fluIco(s.id), tag: fluTag(s.id), title: s.t,
    sub: `<span class="gx-ln">${ico('timer', 18)}<span>60 s best: <b>${fluBest(s.id, false)}</b></span></span>` +
      `<span class="gx-ln">${ico('target', 18)}<span>20 facts best: <b>${fluBest(s.id + '-20', true)}</b></span></span>` })).join('')}</div></div>`);
  NAV.bar('learn');
  $('#back').onclick = () => NAV.back();
  $$('[data-s]').forEach(b => b.onclick = () => fluModes(b.dataset.s));
}

function fluModes(set) {
  const s = FLU.set(set);
  view(`${fluTop(s.t, fluIco(set))}
  <div class="scroll gx-list"><div class="games">
   ${GFX.card({ cls: 'game', attrs: 'data-m="t60"', p: 'play', icon: 'timer', title: '60 seconds', sub: `How many can you get? Best: <b>${fluBest(set, false)}</b>` })}
   ${GFX.card({ cls: 'game', attrs: 'data-m="n20"', p: 'es', icon: 'target', title: '20 facts', sub: `Beat your time! Best: <b>${fluBest(set + '-20', true)}</b>` })}</div>
   <p class="gx-note">${ico('ticket', 24)}<span>A first sprint each day earns game time.</span></p></div>`);
  NAV.bar('learn');
  $('#back').onclick = fluMenu;
  $$('[data-m]').forEach(b => b.onclick = () => fluPlay(set, b.dataset.m));
}

function fluPlay(set, mode) {
  stopFlu();
  const timed = mode != 'n20', key = FLU.key(set, mode);
  view(`${GFX.speedTop('math', 'fbar', timed ? 1 : 0, UI.chip('bolt', timed ? 0 : '0 / ' + FLU.GOAL, { id: 'fsc', aria: 'Right answers' }) +
    UI.chip('timer', timed ? '60 s' : '0.0 s', { id: 'ftm', aria: 'Time' }))}
   <div class="play qs s-math" id="fplay"></div>`);
  FL = {set, mode, key, timed, right: 0, typed: '', lock: true, clock: {ms: 0, last: Date.now()}, st: {set, last: '', redo: []}, f: null};
  // NAV-01: the corner house; the clock does not count while Go Home? is open
  NAV.wire('quit', {hold: on => {if (!FL) return; FLU.tick(FL.clock, Date.now(), document.hidden || !on); FL.held = on}, leave: stopFlu});
  FL.vis = () => {if (FL) FLU.tick(FL.clock, Date.now(), document.hidden)};
  document.addEventListener('visibilitychange', FL.vis);

  const show = () => {
    if (!FL) return;
    const f = FL.f = FLU.next(FL.st);
    FL.typed = '';
    FL.lock = false;
    $('#fplay').innerHTML = `<div class="qarea"><div class="prompt" id="prompt"><div class="eq">${f.a} ${f.op} ${f.b} = ${SLOT}</div></div></div>
     <div class="inp">${GFX.pad()}</div>`;
    fit();
    $$('.k').forEach(b => b.onclick = () => {
      if (!FL || FL.lock) return;
      const k = b.dataset.k, want = String(FL.f.c);
      if (k == 'del') FL.typed = FL.typed.slice(0, -1);
      else if (FL.typed.length < want.length) {FL.typed += k; SFX.key(+k)}
      $('#slot').textContent = FL.typed;
      if (FL.typed.length == want.length) answer(FL.typed == want); // auto-submit when the digit count matches
    });
  };

  const answer = ok => {
    FL.lock = true;
    const slot = $('#slot');
    if (ok) {
      FL.right++;
      SFX.right(FL.right % 10);
      slot.classList.add('ok');
      if (timed) UI.setChip($('#fsc'), FL.right);
      else {
        UI.setChip($('#fsc'), FL.right + ' / ' + FLU.GOAL);
        GFX.bar($('#fbar'), FL.right / FLU.GOAL);
      }
      if (!timed && FL.right >= FLU.GOAL) return finish();
      FL.to = setTimeout(show, 250);
    } else {
      SFX.wrong();
      FLU.miss(FL.st, FL.f);
      slot.textContent = FL.f.c;
      slot.className = 'slot rev'; // show the fact for 1 second, then it comes back a few facts later
      FL.to = setTimeout(show, 1000);
    }
  };

  const finish = () => {
    FLU.tick(FL.clock, Date.now(), document.hidden);
    const sec = timed ? FLU.SECS : Math.round(FL.clock.ms / 100) / 10, right = FL.right;
    stopFlu();
    S.flu = S.flu || {};
    const r = FLU.record(S.flu, key, today(), sec, right, !timed);
    actFlu(sec); // P5-05
    const rec = r.rec && (!timed || right > 0); // no fireworks for a first 60 s run of zero
    const earned = FLU.earn(S.flu, set, today(), rec, right, mode);
    if (earned) ptEarn(earned);
    const mis = MIS.pay(MIS.done({k: 'sprint'})); // P5-08
    save();
    rec ? (SFX.fanfare(), confetti(40)) : SFX.chime();
    fluEnd({set, mode, key, timed, sec, right, rec, earned, mis});
  };

  // Clock counts only while the page is visible. It starts after a short "ready" beat.
  FL.to = setTimeout(() => {
    if (!FL) return;
    fb('Ready… GO!', 'zap');
    SFX.fanfare();
    FL.clock.last = Date.now();
    show();
    FL.iv = setInterval(() => {
      if (!FL) return;
      const ms = FLU.tick(FL.clock, Date.now(), document.hidden || FL.held), left = FLU.SECS - ms / 1000;
      if (timed) {
        GFX.bar($('#fbar'), left / FLU.SECS);
        $('#ftm b').textContent = Math.max(0, Math.ceil(left)) + ' s';
        if (left <= 5 && left > 0 && Math.ceil(left) != FL.beep) {FL.beep = Math.ceil(left); SFX.tick()}
        if (left <= 0) finish();
      } else $('#ftm b').textContent = fluSecs(ms) + ' s';
    }, 200);
  }, 300);
}

// Sparkline of the last 7 days: higher is always better (faster times are flipped).
function fluSpark(vals, lower) {
  const W = 168, H = 48, pad = 6, got = vals.filter(v => v != null);
  if (!got.length) return '';
  const lo = Math.min(...got), hi = Math.max(...got), span = hi - lo || 1;
  const pts = vals.map((v, i) => {
    if (v == null) return null;
    const t = (v - lo) / span, up = lower ? 1 - t : t;
    return [pad + i * (W - 2 * pad) / 6, H - pad - (got.length > 1 ? up : .5) * (H - 2 * pad)];
  });
  const line = pts.filter(Boolean).map(p => p.map(n => n.toFixed(1)).join(',')).join(' ');
  const dots = pts.map((p, i) => p ? `<circle class="${i == 6 ? 'gx-sn' : 'gx-sd'}" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${i == 6 ? 6 : 4}"/>` : '').join('');
  return `<svg class="gx-spark" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Your last 7 days"><polyline class="gx-sl" points="${line}"/>${dots}</svg>`;
}

function fluEnd(r) {
  const lower = !r.timed, e = (S.flu || {})[r.key], bestNow = e && e.best;
  const title = r.timed ? `${r.right} in 60 seconds!` : `20 facts in ${r.sec} s!`;
  const sp = fluSpark(FLU.week(e, lower), lower);
  const o = GFX.endCard({ rec: r.rec, title, best: `Your best: ${lower ? bestNow + ' s' : bestNow}`, extra: (sp ? `<div class="gx-week">${sp}</div>` : '') + (r.mis || ''),
    earn: r.earned ? `${ico('ticket', 28)}<span>+${r.earned / 60} min of game time</span>` : '<span>Free practice, no game time</span>',
    btns: NAV.end3({again: 'frepeat', home: 'fhome'}) }); // NAV-01
  document.body.appendChild(o);
  if (S.voice) say(r.rec ? 'New record!' : 'Good job!');
  o.querySelector('#frepeat').onclick = () => {o.remove(); fluPlay(r.set, r.mode)};
  o.querySelector('#fhome').onclick = () => {o.remove(); home()};
}

var SPRINT_VER='v202'; // last line: the whole file ran (checked by dataReady() before the app starts)
