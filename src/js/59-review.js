/* ---------- spaced review engine (P5-02) ----------
   Leitner boxes over missed questions. Saved data: S.rev = [{sk, lv, seed, label, box, due, n, bk?}], at most REV.CAP items.
     sk, lv  skill and level of the question (genQ coordinates)
     seed    genQ seed: genQ(sk, lv, seed) rebuilds the question. Absent on items moved from saves older than v38 (no seed was
             kept then): the first rebuild looks for a seed with the same label and stores it (null when none was found).
     bk      bank questions only: the q.bk spec; bankRebuild(bk) rebuilds the question (bank choice in live play is not by seed)
     label   q.label, at most REV.LABEL characters: identifies the fact, and checks that a rebuilt question is still the same one
     box     0..4. A miss puts the item in box 0 (new or not). A right first try while it is due moves it up one box; a right
             answer in box 4 makes it leave the system.
     due     day number (mastDay() = STRK.idx(today()), local calendar days) when it is next due. On entering box b it is due
             REV.INT[b] days later: 0, 1, 3, 7, 21. Due when due <= today, or when due is further ahead than the longest
             interval (the clock was set back). Items moved from old saves are due at once (due 0).
     n       times missed (at most 99)
   One item per fact: the key is sk|lv|label. Over the cap, the item in the highest box goes first (then the least missed,
   then the one missed longest ago). Worst case 150 items is about 30 KB (tools/test.js checks under 40 KB).
   Challenge questions (P1-08, harder than the stop being played) do not become items when missed: the child has not met that
   level yet, and its own stop will teach it.

   API (P5-03 Daily Review and Tricky Mix build on these):
     REV.INT, REV.CAP       intervals per box, item cap
     REV.get()              the cleaned S.rev array (creates it when missing; damaged entries are dropped)
     dueItems(n, path, d)   up to n items due on day d (default today), most urgent first (oldest due, lowest box, most
                            missed). path ('math', 'read', 'es') keeps only items whose skill and level is a stop on that path.
                            dueItems().length is "N due today".
     revQ(it)               the question for an item: a single fact (revFact, R-01b) is rebuilt exactly (bankRebuild(bk) or
                            genQ(sk, lv, seed)); anything else, or a fact whose rebuilt label differs (the generator changed), is a
                            fresh question of the same skill and level, and the item is kept. Carries q.rvk, the item key, so the
                            answer is booked to the item.
     revMiss(q, d)          a first wrong try (called by addMiss): item to box 0, due d, n + 1; creates it when new
     revRight(q, d)         a right first try (called by check): when the matching item is due, up one box (or out after
                            box 4). Returns true when an item moved (counted as "fixed" for game time).
     revDue(it, d)          true when it is due on day d
   In a round (makeQ calls revSlot()): normal stop rounds only (no pool, boss, test, mix, placement). Question 4 and 8 (done 3
   and 7) ask the most urgent due item of the path, else the usual review of an older stop as before; question 2 and 6
   (done 1 and 5) ask a due item of the stop itself, else a normal question. An item is asked at most once per round. A child
   with nothing due gets exactly the rounds of v53. SPACED-9 (below): question 8 asks a due stop check-in first, and question 4 one
   when no missed item of the path is due, in place of the older stop. */
const REV={
  INT:[0,1,3,7,21], // days until due on entering box 0..4
  CAP:150,          // most items kept
  LABEL:60,         // characters of the label kept
  NMAX:99,          // n stops counting here
  FIND:120,         // seeds tried when an old item has no seed
  SLOTS_PATH:[3,7], // done counts where a due item of the path is asked (the old "review an older stop" slots)
  SLOTS_OWN:[1,5],  // done counts where a due item of the round's own stop is asked (was a 30% chance at any question)
  day:()=>mastDay(),
  get(){
    let a=S.rev;
    if(!Array.isArray(a))a=S.rev=[];
    for(let i=a.length-1;i>=0;i--){
      const it=a[i];
      if(!it||typeof it!='object'||typeof it.sk!='string'||!Number.isInteger(it.lv)||typeof it.label!='string'){a.splice(i,1);continue}
      if(!(it.box>=0&&it.box<REV.INT.length))it.box=0;
      it.box=Math.floor(it.box);
      if(!Number.isFinite(it.due))it.due=0;
      if(!(it.n>=1))it.n=1;
    }
    return a;
  },
};
const revLabel=l=>String(l==null?'':l).slice(0,REV.LABEL);
const revKey=o=>o.sk+'|'+o.lv+'|'+revLabel(o.label);
const revNoArt=l=>String(l).replace(/^(el|la|los|las) /,''); // R-01s: a Spanish label without its leading article
const revDue=(it,d)=>it.due<=d||it.due>d+REV.INT[REV.INT.length-1];
const revOk=it=>!!(SK[it.sk]&&SK[it.sk].gen&&it.lv>=1&&it.lv<=(SK[it.sk].max||1));
const revOnPath=(it,p)=>!!NODES[p]&&NODES[p].some(n=>n.sk==it.sk&&n.lv==it.lv);

function dueItems(n,path,d){
  if(d==null)d=REV.day();
  const out=REV.get().filter(it=>revOk(it)&&revDue(it,d)&&(!path||revOnPath(it,path)));
  out.sort((a,b)=>a.due-b.due||a.box-b.box||b.n-a.n);
  return out.slice(0,n==null?REV.CAP:n);
}

// keeps a at the cap: highest box first, then least missed, then missed longest ago; never drops `keep`
function revCap(a,keep){
  while(a.length>REV.CAP){
    let w=-1;
    a.forEach((it,i)=>{
      if(it===keep)return;
      const b=w<0?null:a[w];
      if(!b||it.box>b.box||(it.box==b.box&&(it.n<b.n||(it.n==b.n&&it.due<b.due))))w=i;
    });
    if(w<0)break;
    a.splice(w,1);
  }
}

function revMiss(q,d){
  if(!q||!SK[q.sk]||!Number.isInteger(q.lv)||q.label==null)return null;
  if(typeof mastTag=='function'&&mastTag(q)=='ch')return null; // a challenge question: not a review item
  if(d==null)d=REV.day();
  const a=REV.get(),k=q.rvk||revKey(q);
  let it=a.find(x=>revKey(x)===k);
  if(!it){
    it={sk:q.sk,lv:q.lv,label:revLabel(q.label),box:0,due:d,n:0};
    if(Number.isInteger(q.seed))it.seed=q.seed;
    if(q.bk)it.bk=q.bk;
    a.push(it);
  }
  it.box=0;
  it.due=d;
  it.n=Math.min(REV.NMAX,(it.n||0)+1);
  revCap(a,it);
  return it;
}

function revRight(q,d){
  if(!q||!q.sk)return false;
  if(d==null)d=REV.day();
  const a=REV.get(),k=q.rvk||revKey(q),i=a.findIndex(x=>revKey(x)===k);
  if(i<0||!revDue(a[i],d))return false;
  const it=a[i];
  if(it.box>=REV.INT.length-1)a.splice(i,1); // learned: leaves the system
  else{it.box++;it.due=d+REV.INT[it.box]}
  return true;
}

/* R-01b: is a review item a single fact, worth asking again exactly? Number facts (two numbers up to 20 added or taken away, up to
   12 times or divided by 12, with one number missing: "7 + 5 = ?", "? + 6 = 14", "6 × 7 = ?", "32 ÷ ? = 4") and single-item
   knowledge (a sight word, a picture word, a spelling word, a letter, a Spanish word: "hear “said”", "spelling “night”",
   "el pato (read)"). Everything else (two-choice questions, word problems, multi-step sums, comprehension, grammar ...) comes back as
   a fresh question of the same skill and level, so the child cannot just remember that one item's answer. q: the rebuilt
   question (a question with two choices is never a fact). */
const REV_ARITH=/^(\d+|\?) ([+−×÷-]) (\d+|\?) = (\d+|\?)$/;
const REV_WORD=/^(hear|read|spell|spelling) “[^”]+”$|^(big|little) [A-Za-z]$|^[^()]+ \((listen|read|spell)\)$/;
function revFact(it,q){
  if(q&&q.kind=='choice'&&Array.isArray(q.choices)&&q.choices.length<=2)return false;
  const l=String(it.label),m=REV_ARITH.exec(l);
  if(m){
    const n=x=>x=='?'?0:+x,a=n(m[1]),op=m[2],b=n(m[3]),c=n(m[4]);
    if(op=='×')return a<=12&&b<=12&&c<=144;
    if(op=='÷')return a<=144&&b<=12&&c<=12;
    return a<=20&&b<=20&&c<=20;
  }
  return REV_WORD.test(l);
}
// the exact question again when it is a single fact (revFact), else (or when the generator has changed) a fresh one of the same
// skill and level, with another label when one comes within a few tries
function revQ(it){
  if(!it||!revOk(it))return null;
  let q=null;
  try{
    if(it.bk)q=bankRebuild(it.bk);
    else if(Number.isInteger(it.seed))q=genQ(it.sk,it.lv,it.seed);
    else if(!('seed' in it)&&!SK[it.sk].bank){
      // an item from a save older than v38: look for a seed that gives the same label, once
      it.seed=null;
      for(let s=1;s<=REV.FIND;s++){const t=genQ(it.sk,it.lv,s);if(revLabel(t.label)===it.label){it.seed=s;q=t;break}}
    }
  }catch(e){q=null}
  // R-01s: the first Spanish units gained el / la ("pato (read)" is now "el pato (read)"): a Spanish item rebuilt from its seed whose
  // label differs only by that article is the same question, and the item takes the new label (so a new miss finds it)
  if(q&&/^es_/.test(it.sk)&&revLabel(q.label)!==it.label&&revNoArt(revLabel(q.label))===revNoArt(it.label))it.label=revLabel(q.label);
  // review v196: a Pre-K / K "Listen" question was the level 1 question of its level 2 seed (esRead in genQ); rebuild it the same way
  if(q&&it.lv==2&&/^es_/.test(it.sk)&&/ \(listen\)$/.test(it.label)&&revLabel(q.label)!==it.label){try{const t=genQ(it.sk,1,it.seed);if(revLabel(t.label)===it.label)q=t}catch(e){}}
  if(!q||revLabel(q.label)!==it.label||!revFact(it,q)){
    q=null;
    for(let t=0;t<8&&(!q||revLabel(q.label)===it.label);t++)q=genQ(it.sk,it.lv);
  }
  q.sk=it.sk;
  q.lv=it.lv;
  q.rvk=revKey(it);
  return q;
}

// makeQ hook: a due item at the review slots of a normal stop round, or null
function revSlot(){
  const g=G;
  if(!g||!g.path||!(g.node>=0)||g.pool||g.boss||g.test||g.mix||g.nomast)return null;
  const path=REV.SLOTS_PATH.includes(g.done),own=REV.SLOTS_OWN.includes(g.done);
  if(!path&&!own)return null;
  const asked=g.rvAsked||(g.rvAsked={});
  if(g.done==REV.SLOTS_PATH[1]){const sq=spcSlot(g);if(sq)return sq} // SPACED-9: question 8 asks a stop's check-in first, when one is due (else as before)
  const it=dueItems(REV.CAP,g.path).find(x=>!asked[revKey(x)]&&(path||(x.sk==g.sk&&x.lv==g.lv)));
  if(!it)return path?spcSlot(g):null; // SPACED-9: no missed question due at a path slot: a stop's check-in, when one is due
  asked[revKey(it)]=1;
  const q=revQ(it);
  if(!q)return null;
  q.review=1;
  g.last=q.label;
  return q;
}

/* ---------- SPACED-9: spaced check-ins of learned and skipped stops (BEST-APP roadmap 9; R-01 Should 4; docs/drafts/SPACED9.md) ----------
   Leitner boxes above catch the questions a child missed. These catch the stops a child passed, or skipped by placement or Test out,
   so they are checked again before they are forgotten: one question of the stop's own level, in the review slots that already
   exist: question 8 of a stop round of the same path (before a missed question of the path, which keeps question 4 and the
   round's own slots), question 4 when no missed question is due there (in place of the random "older stop" question), and
   Mixed Practice, after its missed questions. It looks like the review question it replaces ("Remember this
   one?"), so no new words, and it pays as that question did (a question of the round: no new game time, coins or stars).
   Schedule (SPC.INT): a passed stop is first due 2 days after the pass; each right first try moves it to the next interval:
   7, then 21, then 60 days; a right answer at the 60-day check-in finishes it (box SPC.DONE). A wrong first try puts it back to
   2 days (and the question is a review item as always: addMiss). A right first try with the hint showing keeps its box: due again
   after the same interval. A skipped stop (in a world skipped by placement or Test out, not played SPC.OWN times: Test out's stars do
   not make it learned) gets one light check-in, from the next day, the stops just below where the child was
   placed first: right finishes it, wrong puts it on the passed ladder (2 days), so a mis-placed child is caught.
   No flood: at most SPC.CAP check-ins are asked a day, all rounds together. A stop passed in a round is first due exactly 2 days
   later; stops that enter the schedule together (an old save's passed stops the first time it is read, a loaded backup, the
   skipped stops of a placement or a Test out) take the first day from their start with room: at most SPC.ROOM.l learned and
   SPC.ROOM.k skipped stops first fall due on one day. So an old save's passed stops are spread over the weeks ahead, the ones not
   practised for longest first, and nothing is due on the day it is first seen.
   Saved data: S.spc = {s: {nid: {b, d, k?}}, day, n} (a default {} by id in migrate, 00-core.js; filled the first time it is read)
     b   box 0..3: which check-in is next (SPC.INT[b] days after the last); SPC.DONE (4) = finished, kept so it is not added again
     d   day number (mastDay()) it is next due; due when d <= today. (Not revDue's "further ahead than the longest interval": an old
         save's stops are spread further ahead than that on purpose.)
     k   1: entered as a skipped stop and not checked yet (its check-in is the light one)
     day, n  the day number and the check-ins asked that day (the cap)
     t   the latest day the schedule was read on: a clock set back moves every d back by the difference
     x   OWNER-1127: {nid: day} skipped stops whose light check-in was answered wrong (the report card's line; spcTry)
   Everything runs on mastDay() (today(), the app's clock) and the map, no random draw except the question itself, so the same
   save and day give the same check-ins. */
const SPC={
  INT:[2,7,21,60],   // days to the next check-in from box 0..3
  DONE:4,            // box of a finished stop
  CAP:3,             // check-ins asked a day
  ROOM:{l:2,k:1},    // stops entering the schedule that may first fall due on one day: learned, skipped
  MIX:2,             // most check-ins in one Mixed Practice
  get(){
    let o=S.spc;
    if(!o||typeof o!='object'||Array.isArray(o))o=S.spc={};
    if(!o.s||typeof o.s!='object'||Array.isArray(o.s))o.s={};
    for(const k in o.s){const e=o.s[k];if(!e||typeof e!='object'||!(e.b>=0&&e.b<=SPC.DONE)||!Number.isFinite(e.d))delete o.s[k];else e.b=Math.floor(e.b)}
    return o;
  },
  ok:nd=>!!(nd&&nd.sk!='boss'&&SK[nd.sk]&&SK[nd.sk].gen&&!SK[nd.sk].side&&nd.lv>=1&&nd.lv<=(SK[nd.sk].max||1)),
  _nd:null,
  nd(k){ // the first map stop with this id (sk, lv)
    if(!SPC._nd){SPC._nd={};for(const p in NODES)NODES[p].forEach(n=>{if(SPC.ok(n)&&!SPC._nd[nid(n)])SPC._nd[nid(n)]=n})}
    return SPC._nd[k]||null;
  },
  OWN:5,             // first tries at a stop (half a round) that make a stop of a skipped world learned, not skipped
  // 'l' learned (passed, and played: not only given its stars by Test out), 'k' skipped (in a world skipped by placement or Test out,
  // open, not played OWN times), or '' (not reached)
  kind(p,i){
    const n=NODES[p][i],r=mastRec(nid(n)),own=!!r&&+r.n>=SPC.OWN,sk=worldSkipped(p,n.wi);
    if(passed(p,i)&&(own||!sk))return'l';
    return sk&&unlocked(p,i)?'k':'';
  },
  onPath:(k,p)=>!!NODES[p]&&NODES[p].some(n=>n.sk!='boss'&&nid(n)==k),
  due:(e,d)=>e.b<SPC.DONE&&e.d<=d,
  // adds the stops passed or skipped that are not in the schedule yet (see the head for the order and the room)
  sync(d){
    if(d==null)d=mastDay();
    const o=SPC.get(),s=o.s,c={};
    // the clock was set back (today is before the last day the schedule saw): every date moves back with it, so nothing waits for months
    if(Number.isFinite(o.t)&&d<o.t)for(const k in s)s[k].d-=o.t-d;
    o.t=d;
    for(const p in NODES)NODES[p].forEach((n,i)=>{
      if(!SPC.ok(n))return;
      const k=nid(n),e=s[k],t=SPC.kind(p,i);
      if(e){if(e.k&&t=='l')delete e.k;return} // a skipped stop the child has since played and passed: on the learned ladder
      const x=c[k]||(c[k]={k,ps:0,sk:0,p,i,last:(mastRec(k)||{}).last||0});
      if(t=='l')x.ps=1;
      else if(t=='k'&&!x.sk){x.sk=1;x.p=p;x.i=i}
    });
    const L=[],K=[],top={};
    for(const k in c){const x=c[k];if(x.ps)L.push(x);else if(x.sk){K.push(x);top[x.p]=Math.max(top[x.p]==null?-1:top[x.p],x.i)}}
    if(!L.length&&!K.length)return 0;
    const po=Object.keys(NODES),used={};
    for(const k in s){const e=s[k],t=e.k?'k':'l';used[t+e.d]=(used[t+e.d]||0)+1}
    // learned: not practised for longest first; skipped: nearest below where the child was placed first, the paths in turn
    L.sort((a,b)=>a.last-b.last||po.indexOf(a.p)-po.indexOf(b.p)||a.i-b.i);
    K.sort((a,b)=>(top[a.p]-a.i)-(top[b.p]-b.i)||po.indexOf(a.p)-po.indexOf(b.p)||a.i-b.i);
    const put=(x,t,d0)=>{let dd=d0;while((used[t+dd]||0)>=SPC.ROOM[t])dd++;used[t+dd]=(used[t+dd]||0)+1;s[x.k]=t=='k'?{b:0,d:dd,k:1}:{b:0,d:dd}};
    if(L.length==1)s[L[0].k]={b:0,d:d+SPC.INT[0]}; // a stop passed in a round (finish() reads the schedule after each pass): 2 days, exactly
    else L.forEach(x=>put(x,'l',d+SPC.INT[0]));
    K.forEach(x=>put(x,'k',d+1));
    return L.length+K.length;
  },
  // the stops due on day d (on path p when given), most overdue first: [{k, sk, lv, e}]
  list(p,d){
    if(d==null)d=mastDay();
    SPC.sync(d);
    const s=SPC.get().s,out=[];
    for(const k in s){const e=s[k],n=SPC.nd(k);if(n&&SPC.due(e,d)&&(!p||SPC.onPath(k,p)))out.push({k,sk:n.sk,lv:n.lv,e})}
    return out.sort((a,b)=>a.e.d-b.e.d||(a.e.k?1:0)-(b.e.k?1:0)||(a.k<b.k?-1:a.k>b.k?1:0));
  },
  left(d){const o=SPC.get();return Math.max(0,SPC.CAP-(o.day===d?o.n|0:0))},
  take(d){const o=SPC.get();if(o.day!==d){o.day=d;o.n=0}o.n=(o.n|0)+1},
  q(x,d){SPC.take(d);const q=genQ(x.sk,x.lv);q.sk=x.sk;q.lv=x.lv;q.spc=x.k;return q},
};
// revSlot, at a path slot (question 4 or 8) with no missed question due: the most overdue check-in of the path, not the round's own stop
function spcSlot(g){
  const d=mastDay();
  if(!SPC.left(d))return null;
  const asked=g.rvAsked||(g.rvAsked={});
  const x=SPC.list(g.path,d).find(x=>!asked['spc|'+x.k]&&!(x.sk==g.sk&&x.lv==g.lv));
  if(!x)return null;
  asked['spc|'+x.k]=1;
  const q=SPC.q(x,d);
  q.review=1;
  g.last=q.label;
  return q;
}
// Mixed Practice (mixQs, 50-round.js): up to SPC.MIX check-ins of any path, within the day's cap
function spcMix(){
  const d=mastDay(),out=[];
  for(const x of SPC.list(null,d)){if(out.length>=SPC.MIX||!SPC.left(d))break;out.push(SPC.q(x,d))}
  return out;
}
// check(), on the first try at a check-in question: right moves the stop on, wrong puts it back to 2 days (see the head)
function spcTry(q,ok,helped){
  if(!q||!q.spc)return null;
  const e=SPC.get().s[q.spc],d=mastDay();
  if(!e||e.b>=SPC.DONE)return null;
  // OWNER-1127 (owner 2026-11-27): a skipped stop's light check-in answered wrong is noted for the report card (REP.needs:
  // "Checked a skipped stop: ... Practice it again."), S.spc.x = {nid: day}, until a later check-in of it is right on its own
  const o=SPC.get(),x=o.x&&typeof o.x=='object'&&!Array.isArray(o.x)?o.x:null;
  if(!ok&&e.k)(x||(o.x={}))[q.spc]=d;else if(ok&&!helped&&x){delete x[q.spc];if(!Object.keys(x).length)delete o.x}
  if(!ok){e.b=0;e.d=d+SPC.INT[0];delete e.k}
  else if(helped)e.d=d+SPC.INT[e.b];
  else if(e.k){e.b=SPC.DONE;delete e.k}
  else{e.b++;if(e.b<SPC.DONE)e.d=d+SPC.INT[e.b]}
  return e;
}

// ---- P5-03 Daily Review ----
// Home card "Today's review: N due" and the round behind it. The round asks the due items (most urgent first, up to 10) and
// nothing else, so it can be shorter than 10; with nothing due it is never started empty (Mixed Practice runs instead).
const REVIEW_N=10;
function reviewQs(){
  return dueItems(REVIEW_N).map(revQ).filter(Boolean);
}
function startReview(){
  const qs=reviewQs();
  if(!qs.length)return startMix();
  if(qs.some(q=>/^es_/.test(q.sk)))spkProbe(); // S-SPK: a "Say it!" step after the first Spanish item (50-say.js)
  G=newG({mix:true,daily:true,pool:runCap(qs),n:qs.length,sk:'mix'}); // MIX-8 (b): the same items, never three of one kind in a row where they allow it (50-round.js)
  next();
}
function revCard(){
  const n=dueItems().length;
  if(!n)return`<div class="rv-card rv-done" id="revcard">${ico('check',28)}<div class="rv-tx"><b>Today's review</b><span>All caught up! Nothing to review today.</span></div></div>`;
  return`<div class="rv-card" id="revcard">${ico('replay',28)}<div class="rv-tx"><b>Today's review</b><span><span id="revn">${n}</span> due</span></div>
   <button class="btn rv-go" id="rev">Start</button></div>`;
}
function revCardBind(){
  const b=$('#rev');
  if(b)b.onclick=()=>{SFX.whoosh();startReview()};
}
