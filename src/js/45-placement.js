/* ---------- placement quiz "Find my level" (P1-07; ROADMAP 3.2 step 3) ----------
   Optional, per graded path (math, reading; not Spanish, whose worlds are word sets in an order, not a ladder), not for Pre-K.
   Rules (ROADMAP 3.2):
     - starts one grade below the child's grade: the first world with g >= grade - 1 (the last world if none is)
     - a testlet is 4 questions from one world. 3 or 4 right: pass, go up one world. 0 or 1 right: not yet, go down one world.
       2 right: one more testlet at the same world, which then passes at 6 of 8.
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
  // The 4 questions of the next testlet: [{sk, lv, seed}], from the stops (not the boss) of world st.wi.
  // Stops are shuffled by a private stream from (seed, testlet number) and taken in turn, so a world with 2 stops gives 2 each.
  items(worlds,st){
    const r=mulberry32((st.seed^Math.imul(st.k+1,0x9E3779B1))>>>0);
    const ns=worlds[st.wi].nodes.slice();
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
    if(rec.t==1)v=right>=3?'pass':right<=1?'fail':null; // 2 right: one more testlet here
    else v=rec.r>=6?'pass':'fail';                       // two testlets: pass at 6 of 8
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

/* ---------- saved result ---------- */
// Paths that offer placement: graded ones (byLevel paths open by order).
const placePaths=()=>Object.keys(PATHS).filter(p=>!PATHS[p].byLevel);
const placeOK=()=>gradeOf()>=0; // not for Pre-K
// The placed start world of path p (index), or -1. Only while the grade is the one it was taken at.
function placeWorld(p){
  const r=S.place&&S.place[p];
  if(!r||r.g!==gradeOf())return -1;
  return PATHS[p].worlds.findIndex(w=>w.id===r.world);
}
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

/* ---------- screens ---------- */
let PL=null;          // the quiz on screen (this session only; never saved)
let PLACE_HIDE=false; // "Not now" on the home card hides it until the app is opened again
// Home card: offered to a new child (no stop passed on a graded path, never placed), K and up.
function placeAsk(){
  if(PLACE_HIDE||!placeOK()||(S.place&&Object.keys(S.place).length))return false;
  return placePaths().every(p=>!NODES[p].some((n,i)=>passed(p,i)));
}
const placeSubBtn=p=>`<button class="btn pl-sub" data-place="${p}"><span class="pl-pe">${PATHS[p].e}</span>${esc(placeName(p))}</button>`;
const placeName=p=>PATHS[p].n.replace(/ Adventure$/,'');
function placeBanner(){
  if(!placeAsk())return'';
  return`<div class="pl-card" id="plcard"><div class="pl-ct">${ico('target',28)}<span>Not sure where to start? <b>Find my level!</b></span></div>
   <div class="pl-row">${placePaths().map(placeSubBtn).join('')}<button class="btn pl-no" id="plno">Not now</button></div></div>`;
}
function placeBannerBind(){
  if(!$('#plcard'))return;
  $$('#plcard [data-place]').forEach(b=>b.onclick=()=>{SFX.whoosh();placeIntro(b.dataset.place,'home')});
  $('#plno').onclick=()=>{PLACE_HIDE=true;SFX.click();const c=$('#plcard');if(c)c.remove()};
}
// Grown-ups row: start a quiz for either path and see the last result.
function placeGrownHTML(){
  const last=placePaths().map(p=>{
    const r=S.place&&S.place[p],w=r&&PATHS[p].worlds.find(x=>x.id===r.world);
    return r&&w?`${esc(placeName(p))}: ${esc(w.n)} (${esc(gradeLabel(r.g))}, ${r.right|0} of ${r.asked|0} right, ${esc(r.date||'')})`:'';
  }).filter(Boolean).join('<br>');
  return`<div class="pl-grown"><b>Find my level</b> <span class="small">A short quiz (4 to 20 questions, no stars) that picks where each map
   starts. It can open worlds; it never removes stars or locks anything. Not for Pre-K.</span>
   <div class="pl-row">${placePaths().map(placeSubBtn).join('')}</div>${last?`<div class="small">Last result:<br>${last}</div>`:''}</div>`;
}
function placeGrownBind(){
  $$('.pl-grown [data-place]').forEach(b=>b.onclick=()=>{
    if(!placeOK())return fb('Find my level starts at K','warn');
    SFX.whoosh();placeIntro(b.dataset.place,'grown');
  });
}
const placeBack=from=>from=='grown'?grown():home();
function placeIntro(p,from){
  PL=null;
  if(G)G.dead=true; // a finished or left round must not fire its next-question timer into this screen
  const nm=esc(placeName(p));
  view(`<div class="center pl-in"><div class="pl-big">${PATHS[p].e}</div><h1>Let's find your level!</h1>
   <p class="sub">A few ${nm} questions. Some may be tricky, and that's OK. Just do your best!</p>
   <p class="small">No stars to win or lose. You can stop any time.</p>
   <div class="rowh"><button class="btn big" id="plgo">${ico('play','1em')} Start</button><button class="btn" id="plback">Not now</button></div></div>`);
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
function placeQ(){
  const me=PL,q=PL.its[PL.qi],K=KIND[q.kind];
  PL.q=q;PL.lock=false;PL.typed='';PL.tries=0;PL.built=[];
  const dots=PL.its.map((_,i)=>`<span class="pl-dot ${i<PL.qi?'on':i==PL.qi?'now':''}"></span>`).join('');
  view(`<div class="top"><button class="btn sm pl-x" id="quit" aria-label="Stop">${ico('close','1em')}</button>
   <div class="pl-dots" aria-label="Question ${PL.qi+1} of ${PL.its.length}">${dots}</div><div class="sp"></div>
   <div class="pl-tag">${PATHS[PL.p].e} Find my level</div></div>
  <div class="play"><div class="qarea">${q.ctx?bankCtx(q.ctx):''}<div class="prompt" id="prompt">${q.html}</div>
  <div class="tools">${q.say?`<button class="btn sm pl-x" id="spk">${ico('speak','1em')} Hear it</button>`:''}</div></div>
  <div class="inp">${K.render(q)}</div></div>`);
  $('#quit').onclick=()=>{PL=null;SFX.click();placeBack(me.from)};
  if($('#spk'))$('#spk').onclick=e=>say(q.say,e.currentTarget,q.lang=='es'&&q.auto=='must'?'es':null);
  $$('[data-sayes]').forEach(b=>b.onclick=()=>say(b.dataset.sayes,b,'es'));
  $$('[data-say]').forEach(b=>b.onclick=()=>say(b.dataset.say,b));
  $$('.w').forEach(s=>s.onclick=()=>{say(s.dataset.w);SFX.pop(1)});
  K.bind(q,PL,placeSubmit);
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
   <div class="pl-res"><span class="pl-pe">${w.e}</span>${esc(w.n)}</div>
   ${sk.length?`<p class="small pl-skip">${ico('check','1.2em')} Skipped: ${sk.map(x=>esc(x.n)).join(', ')}. You can still play ${sk.length>1?"them":"it"} any time.</p>`:''}
   <div class="rowh"><button class="btn big" id="plmap">${ico('map','1em')} Go to my map</button>
    ${other?`<button class="btn" id="plnext" data-place="${other}">${PATHS[other].e} ${esc(placeName(other))} next</button>`:''}
    <button class="btn" id="plhome">${ico(from=='grown'?'gear':'home','1em')} ${from=='grown'?'Grown-ups':'Home'}</button></div></div>`);
  SFX.fanfare();
  if(S.voice)say(`All done! Great work! Your map starts at ${w.n}.`);
  $('#plmap').onclick=()=>{SFX.whoosh();pathMap(p,st.at)};
  if($('#plnext'))$('#plnext').onclick=()=>{SFX.whoosh();placeIntro(other,from)};
  $('#plhome').onclick=()=>{SFX.click();placeBack(from)};
}
