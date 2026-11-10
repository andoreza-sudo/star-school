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
     revQ(it)               the question for an item: rebuilt exactly (bankRebuild(bk) or genQ(sk, lv, seed)); when the rebuilt
                            label differs (the generator changed) a fresh question of the same skill and level, and the item is
                            kept. Carries q.rvk, the item key, so the answer is booked to the item.
     revMiss(q, d)          a first wrong try (called by addMiss): item to box 0, due d, n + 1; creates it when new
     revRight(q, d)         a right first try (called by check): when the matching item is due, up one box (or out after
                            box 4). Returns true when an item moved (counted as "fixed" for game time).
     revDue(it, d)          true when it is due on day d
   In a round (makeQ calls revSlot()): normal stop rounds only (no pool, boss, test, mix, placement). Question 4 and 8 (done 3
   and 7) ask the most urgent due item of the path, else the usual review of an older stop as before; question 2 and 6
   (done 1 and 5) ask a due item of the stop itself, else a normal question. An item is asked at most once per round. A child
   with nothing due gets exactly the rounds of v53. */
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

// the exact question again, or a fresh one of the same skill and level when the generator has changed
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
  if(!q||revLabel(q.label)!==it.label)q=genQ(it.sk,it.lv);
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
  const it=dueItems(REV.CAP,g.path).find(x=>!asked[revKey(x)]&&(path||(x.sk==g.sk&&x.lv==g.lv)));
  if(!it)return null;
  asked[revKey(it)]=1;
  const q=revQ(it);
  if(!q)return null;
  q.review=1;
  g.last=q.label;
  return q;
}
