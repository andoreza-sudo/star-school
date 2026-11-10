/* ---------- mastery tracking and in-round adaptation (P1-08; ROADMAP 3.3) ----------
   Saved data: S.mast = {nid: {n, p, ms, d, last, md}}, keyed by stop id nid() = skill + level ('add1'). Optional field:
   read with defaults, written on the first try at a question of a stop that is on some map (any round: stop, boss, test out,
   tricky mix, review slot). A round can opt out with G.nomast = true (no recording, no adaptation).
     n     first tries at this stop (attempts)
     p     first-try accuracy, 0..1: the plain average for the first 10 tries, then a moving average (weight 0.1)
     ms    answer time of a first try, running median estimate in ms (each sample capped at 60 s)
     d     distinct days practised
     last  last day practised, as a day number (STRK.idx(today()); STRK.key(n) turns it back into 'Y-M-D')
     md    day number the stop first became mastered (stays set if accuracy later drops; for "Recently mastered")
   API for the map, spaced review (P5-02) and the report card (P5-06):
     MAST                   the thresholds below
     mastRec(nid)           the record, or null when the stop was never tried (read only; never creates one)
     masteryState(nid)      'new' | 'learning' | 'practised' (>= 70% over 10+ tries) | 'mastered' (>= 90% over 20+ tries,
                            2+ days)
     mastStops(p)           [{i, nid, t, wi, state, rec}] for every non-boss stop of path p, in map order (one per nid)
     harder(nd), easier(nd) next / previous stop of the same skill in path order (a NODES entry), or null
     mastDay()              today as a day number
   In-round adaptation (only in a normal stop round: G.path and G.node set, no pool, not boss, test, mix):
     - after question 5, from the first tries of questions 1-5 (G.fr):
       5 of 5 and fast (median answer time under MAST.FAST, MAST.FAST_YOUNG for Pre-K and K) -> 'challenge': every
       remaining question comes from harder(stop) and shows a Challenge tag; a wrong first try there does not cost stars
       (G.forgive, added to the score for the star rating only). No harder stop: the round stays normal.
       2 or fewer of 5 -> 'support': the hint shows before the first try, and every other remaining question (6th, 8th,
       10th) comes from easier(stop) (the stop's own level when there is none).
       Anything else -> normal (G.mode = ''), the round is unchanged.
     - 3 wrong first tries in a row, at any point: the pet offers a hint and the next question is an easier one (from
       easier(stop), with the hint shown; in challenge mode, from the round's own stop). After question 5 it also steps
       the mode down: challenge -> normal, normal -> support.
     Star thresholds, round length, coins and locks never change. Everything is decided from the answers alone, so the
     same answers give the same questions' stops (tests rely on it).
   Hooks in 50-round.js: makeQ() calls mastQ() first, check() calls mastTry(q, ok) on a first try, renderQ() calls
   mastShow(q) last, finish() adds G.forgive to the score for the star rating. */
const MAST={
  AT:5,              // adaptation is decided after this many questions
  FAST:12000,        // median first-try time (ms) that counts as fast, 1st grade and up
  FAST_YOUNG:16000,  // the same for Pre-K and K (every prompt is read aloud first)
  SUPPORT:2,         // this many right of the first 5, or fewer, turns on support
  RUN:3,             // wrong first tries in a row before an easier question
  CAP:60000,         // one answer time never counts as more than this
  ALPHA:0.1,         // weight of a new try in the accuracy average (after the first 1/ALPHA tries)
};
const mastDay=()=>STRK.idx(today());
const mastRec=k=>(S.mast&&S.mast[k])||null;
function masteryState(k){
  const r=mastRec(k);
  if(!r||!r.n)return'new';
  if(r.p>=.9&&r.n>=20&&r.d>=2)return'mastered';
  if(r.p>=.7&&r.n>=10)return'practised';
  return'learning';
}
/* The first map stop with this skill and level, as {p, i}, or null (a demo skill, an old stored question). */
function mastStop(sk,lv){
  for(const p in NODES){const i=NODES[p].findIndex(n=>n.sk==sk&&n.lv==lv);if(i>=0)return{p,i}}
  return null;
}
function mastStops(p){
  const seen={},out=[];
  NODES[p].forEach((n,i)=>{
    if(n.sk=='boss')return;
    const k=nid(n);
    if(seen[k])return;
    seen[k]=1;
    out.push({i,nid:k,t:n.t,wi:n.wi,state:masteryState(k),rec:mastRec(k)});
  });
  return out;
}
function mastNear(nd,dir){
  if(!nd||nd.sk=='boss'||!NODES[nd.p])return null;
  const N=NODES[nd.p],i=N.findIndex(n=>n.sk==nd.sk&&n.lv==nd.lv);
  for(let j=i+dir;i>=0&&j>=0&&j<N.length;j+=dir)if(N[j].sk==nd.sk&&N[j].lv!=nd.lv)return N[j];
  return null;
}
const harder=nd=>mastNear(nd,1),easier=nd=>mastNear(nd,-1);

/* Adds one first try to S.mast[k]. Returns the record. */
function mastAdd(k,ok,ms){
  const M=S.mast||(S.mast={}),r=M[k]||(M[k]={n:0,p:0,ms:0,d:0,last:0}),dn=mastDay();
  ms=Math.max(0,Math.min(MAST.CAP,Math.round(ms)||0));
  r.n++;
  r.p=Math.round((r.p+((ok?1:0)-r.p)*Math.max(1/r.n,MAST.ALPHA))*1000)/1000;
  // running median: step toward the new time by at most an eighth of the estimate (at least 250 ms)
  if(r.n==1)r.ms=ms;
  else{const step=Math.min(Math.abs(ms-r.ms),Math.max(250,r.ms/8));r.ms=Math.round((r.ms+Math.sign(ms-r.ms)*step)/10)*10}
  if(r.last!==dn){r.d++;r.last=dn}
  if(!r.md&&masteryState(k)=='mastered')r.md=dn;
  return r;
}

/* ---- in-round adaptation ---- */
const mastOn=g=>!!(g&&g.path&&g.node>=0&&!g.pool&&!g.boss&&!g.test&&!g.mix&&!g.nomast&&NODES[g.path]&&NODES[g.path][g.node]);
const mastTag=q=>(G&&G.mq&&G.mq.get(q))||''; // 'ch' challenge, 'sup' support (easier stop), 'easy' after a wrong run
/* Pure: the mode for a round from its first-try results [{ok, ms}] (first MAST.AT used) and grade g. */
function mastMode(fr,g){
  const f=fr.slice(0,MAST.AT),right=f.filter(x=>x.ok).length;
  if(f.length<MAST.AT)return'';
  if(right<=MAST.SUPPORT)return'support';
  const t=f.map(x=>x.ms).sort((a,b)=>a-b),med=t[t.length>>1];
  if(right==f.length&&med<=(g<=0?MAST.FAST_YOUNG:MAST.FAST))return'challenge';
  return'';
}
/* Pure apart from G's own counters: the stop the next question comes from, as {sk, lv, tag}, or null for a normal one. */
function mastPick(g){
  if(!mastOn(g))return null;
  const nd=NODES[g.path][g.node];
  if(g.ease){
    const own=g.ease=='own';g.ease=0;
    const e=own?null:easier(nd);
    return e?{sk:e.sk,lv:e.lv,tag:'easy'}:{sk:nd.sk,lv:nd.lv,tag:'easy'};
  }
  if(g.done<MAST.AT)return null;
  if(g.mode===undefined)g.mode=mastMode(g.fr||[],gradeOf());
  if(g.mode=='challenge'){const h=harder(nd);return h?{sk:h.sk,lv:h.lv,tag:'ch'}:null}
  if(g.mode=='support'&&(g.done-MAST.AT)%2==0){const e=easier(nd);return e?{sk:e.sk,lv:e.lv,tag:'sup'}:null}
  return null;
}
/* makeQ hook: a question from another stop when adaptation asks for one (or a tagged own-level one after a wrong run). */
function mastQ(){
  const pk=mastPick(G);
  if(!pk)return null;
  let q;
  for(let t=0;t<10&&(!q||q.label===G.last);t++)q=genQ(pk.sk,pk.lv);
  G.last=q.label;
  (G.mq||(G.mq=new Map())).set(q,pk.tag);
  return q;
}
/* check hook, on the first try at a question (not a retry). ms defaults to the time since mastShow. */
function mastTry(q,ok,ms){
  if(!G||G.nomast)return;
  if(ms==null)ms=Date.now()-(G.qt||Date.now());
  if(q&&q.sk&&mastStop(q.sk,q.lv))mastAdd(nid(q),ok,ms);
  (G.fr||(G.fr=[])).push({ok:!!ok,ms});
  if(!mastOn(G))return;
  if(!ok&&mastTag(q)=='ch')G.forgive=(G.forgive||0)+1;
  G.wrun=ok?0:(G.wrun||0)+1;
  if(G.wrun>=MAST.RUN){
    G.wrun=0;
    G.ease=G.mode=='challenge'?'own':'down';
    if(G.mode=='challenge')G.mode='';
    else if(G.mode==='')G.mode='support';
  }
}
/* True when the hint should show before the first try. */
const mastHint=q=>mastOn(G)&&!G.retry&&(G.mode=='support'||mastTag(q)=='easy');
/* renderQ hook: Challenge tag, hint before the first try, start the answer clock. */
function mastShow(q){
  G.qt=Date.now();
  if(!mastOn(G)||G.retry)return;
  const tag=mastTag(q),qa=$('.qarea');
  if(tag=='ch'&&qa){
    qa.insertAdjacentHTML('afterbegin',`<div class="mtag">${ico('bolt',18)} Challenge!</div>`);
    petSay(pick(['Challenge time!','A tricky one!','Try a harder one!']));
  }
  if(mastHint(q)){
    const h=$('#hint'),s=hintHTML(q);
    if(h&&s)h.innerHTML=s;
    if(tag=='easy')petSay("Here's a hint!");
  }
}
