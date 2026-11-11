/* Activity log (P5-05): time on task. Stays on the device; the Grown-ups report card (P5-06) reads it.
   S.log = [{d, sec, rounds, q, ok, by}] sorted oldest first, at most 60 days.
     d       day key 'Y-M-D' (same local format as today() and S.streak)
     sec     active seconds that day, all subjects (always the sum of by)
     rounds  learning rounds finished that day
     q       questions answered that day (a question counts once, when it is finally answered right; re-asked misses do not count again)
     ok      of those, answered right on the first try
     by      {area: seconds}; area is the skill's area: math, read, es (later bt, disc)
   Time rule: a question's time runs from the moment it is on screen to the moment it is answered right. Time while the tab is
   hidden is left out, and one question counts at most 60 s, so a tablet left on a question does not pile up minutes.
   A question that is never answered (child quits) adds no time. Fact Sprint adds its own active seconds to math.
   Every field is read with a default, so a missing or damaged S.log never throws.

   API for the report card (all safe on missing data):
     ACT.get()                 the cleaned array (oldest first); creates S.log if needed
     ACT.entry(key)            the entry for a day key, or null
     ACT.sum(endKey, days)     totals {sec, rounds, q, ok, by, active} for the `days` days ending at endKey (default today(), 7).
                               active = number of days with any time. "This week" = ACT.sum(today(),7); "last week" =
                               ACT.sum(ACT.shift(today(),-7),7). accuracy = ok/q when q>0.
     ACT.shift(key, n)         day key n days after key (n may be negative)
     ACT.total()               totals over the whole kept log */
const ACT={
  KEEP:60,      // days kept
  CAP:60,       // most seconds one question can count
  cur:null,     // question on screen: {area, acc (ms counted so far), t0 (ms when it last became visible, or null while hidden)}
  now(){return Date.now()},
  hidden(){return typeof document!='undefined'&&!!document.hidden},
  shift(k,n){const i=STRK.idx(k);return i>=0?STRK.key(i+n):k},
  clean(e){ // one entry with every field a safe number; null when it has no usable day
    if(!e||typeof e!='object'||!(STRK.idx(e.d)>=0))return null;
    const n=v=>(v>0&&isFinite(v))?Math.round(v):0,by={};
    if(e.by&&typeof e.by=='object'&&!Array.isArray(e.by))for(const a in e.by)if(/^[a-z]{1,8}$/.test(a)&&n(e.by[a]))by[a]=n(e.by[a]);
    let sec=0;for(const a in by)sec+=by[a];
    return{d:String(e.d),sec,rounds:n(e.rounds),q:n(e.q),ok:Math.min(n(e.ok),n(e.q)),by};
  },
  get(){
    const out=[];
    if(Array.isArray(S.log))for(const e of S.log){
      const c=ACT.clean(e);
      if(!c)continue;
      const o=out.find(x=>x.d===c.d);
      if(o){o.sec+=c.sec;o.rounds+=c.rounds;o.q+=c.q;o.ok+=c.ok;for(const a in c.by)o.by[a]=(o.by[a]||0)+c.by[a]}else out.push(c);
    }
    out.sort((a,b)=>STRK.idx(a.d)-STRK.idx(b.d));
    return S.log=out;
  },
  entry(k){return ACT.get().find(e=>e.d===k)||null},
  // Add to one day's entry (created on first use), then drop days older than KEEP days before `key`.
  add(key,o){
    const log=ACT.get();
    let e=log.find(x=>x.d===key);
    if(!e){e={d:key,sec:0,rounds:0,q:0,ok:0,by:{}};log.push(e);log.sort((a,b)=>STRK.idx(a.d)-STRK.idx(b.d))}
    const sec=Math.max(0,Math.round(o.sec||0));
    if(sec){const a=/^[a-z]{1,8}$/.test(o.area)?o.area:'other';e.by[a]=(e.by[a]||0)+sec;e.sec+=sec}
    e.rounds+=o.rounds||0;e.q+=o.q||0;e.ok+=o.ok||0;
    const t=STRK.idx(key);
    S.log=log.filter(x=>STRK.idx(x.d)>t-ACT.KEEP&&STRK.idx(x.d)<=t+1); // old days go; so do days far in the future (clock set back)
    return e;
  },
  sum(endKey,days){
    const end=STRK.idx(endKey||today()),n=days||7,r={sec:0,rounds:0,q:0,ok:0,by:{},active:0};
    if(!(end>=0))return r;
    for(const e of ACT.get()){
      const i=STRK.idx(e.d);
      if(i>end-n&&i<=end){
        r.sec+=e.sec;r.rounds+=e.rounds;r.q+=e.q;r.ok+=e.ok;if(e.sec)r.active++;
        for(const a in e.by)r.by[a]=(r.by[a]||0)+e.by[a];
      }
    }
    return r;
  },
  total(){
    const r={sec:0,rounds:0,q:0,ok:0,by:{},active:0};
    for(const e of ACT.get()){
      r.sec+=e.sec;r.rounds+=e.rounds;r.q+=e.q;r.ok+=e.ok;if(e.sec)r.active++;
      for(const a in e.by)r.by[a]=(r.by[a]||0)+e.by[a];
    }
    return r;
  },
  // A question appears. `now` and `hidden` are passed in by the tests.
  qStart(sk,now,hidden){
    const a=(typeof SK!='undefined'&&SK[sk]&&SK[sk].area)||'other';
    ACT.cur={area:a,acc:0,t0:hidden?null:now};
  },
  // The tab was hidden or shown again.
  vis(hidden,now){
    const c=ACT.cur;
    if(!c)return;
    if(hidden&&c.t0!=null){c.acc+=now-c.t0;c.t0=null}
    else if(!hidden&&c.t0==null)c.t0=now;
  },
  // The question was answered right. first = right on the first try; again = it was a re-asked miss (time counts, question does not).
  qEnd(first,again,now,key){
    const c=ACT.cur;
    ACT.cur=null;
    if(!c)return null;
    if(c.t0!=null)c.acc+=now-c.t0;
    const sec=Math.min(ACT.CAP,Math.max(1,Math.round(c.acc/1000)));
    return ACT.add(key||today(),{sec,area:c.area,q:again?0:1,ok:again?0:(first?1:0)});
  },
  round(key){return ACT.add(key||today(),{rounds:1})},
  flu(sec,key){return ACT.add(key||today(),{sec:Math.min(sec||0,ACT.CAP*2),area:'math'})},
};
// Hooks (each is called from one line in an existing file). They never throw into the game.
function actQStart(sk){try{ACT.qStart(sk,ACT.now(),ACT.hidden())}catch(e){}}
function actQEnd(first,again){try{ACT.qEnd(first,again,ACT.now())}catch(e){}}
function actRound(){try{ACT.round()}catch(e){}}
function actFlu(sec){try{ACT.flu(sec)}catch(e){}}
if(typeof document!='undefined')document.addEventListener('visibilitychange',()=>{try{ACT.vis(ACT.hidden(),ACT.now())}catch(e){}});
