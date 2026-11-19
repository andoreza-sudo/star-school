const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
/* Seedable randomness (P1-01). Generators use only rnd(), R, pick, shuffle, coin. genQ() swaps RNG for a seeded stream so a question can be rebuilt from (sk, lv, seed). Games and art keep Math.random. */
const mulberry32=a=>()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
let RNG=Math.random;
const rnd=()=>RNG();
const R=(a,b)=>a+Math.floor(rnd()*(b-a+1));
const pick=a=>a[Math.floor(rnd()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY='starschool-v2';
const BUILD='__VER__'; // ROOM: the build stamp for code in part files (tools/build.py writes VER over __VER__ in index.html only; the Grown-ups screens are in gen)
const RELEASE='1.0.0'; // P6-05: the release number parents see (Home footer, Grown-ups > About). VER (tools/build.py) stays the build stamp and bumps every chunk.
const LATEST=8; // newest save schema version = MIGRATIONS.length (ROADMAP section 9)
let S,SAVE_RAW=null,SAVE_CORRUPT=false,SAVE_FAILED=false;
/* P5-10: the key of the child who is playing. Child 1 is KEY itself (unchanged since v30); 01-profiles.js picks another child's
   key at load. SAVE_OFF stops save() while the page reloads after a child was deleted. */
let SKEY=KEY,SAVE_OFF=false;
/* Read the save string into S. Corrupt or non-object JSON is kept in KEY-corrupt; KEY itself is untouched until the first save(). */
function loadSave(raw){
  SAVE_RAW=null;SAVE_CORRUPT=false;S=null;
  if(raw){
    try{S=JSON.parse(raw)}catch(e){}
    if(S&&typeof S=='object'&&!Array.isArray(S))SAVE_RAW=raw;
    else{
      S=null;SAVE_CORRUPT=true;
      try{localStorage.setItem(SKEY+'-corrupt',raw)}catch(e){}
    }
  }
  if(!S){
    S={name:'',pet:'dragon',petName:'',buddy:'',stars:0,prog:{},stickers:{},day:{},voice:true,sound:true,music:true,best:0};
    S.v=LATEST;S.maps={math:{},read:{},es:{}};S.mapv=2; // a new save starts at the latest version, with the map state the migrations would make
  }
  S=Object.assign({wdone:{},owned:{meadow:1},wear:{hat:'',toy:'',scene:'meadow'},unlockAll:false,coins:S.stars||0},S);
}
let RAW0=null;try{RAW0=localStorage.getItem(KEY)}catch(e){}
loadSave(RAW0);
/* MIGRATIONS[n] upgrades S from version n to n+1. Idempotent, never edited after release (fix with a new one). A save with no S.v
   is a v30-or-older save; it runs 1 and 2, which each check their own marker, so old saves behave exactly as before. */
/* The maps exactly as they were from v31 to v42: [world id, its stop ids in order] per path (bosses not listed). Migrations read
   old index keys through this frozen table, never through PATHS/NODES, so worlds and stops added later cannot change what an old
   save means. Never edit it; tools/test.js checks it against today's maps. */
const MAP_V42={
  math:[['m_meadow','add1 cnt1 eo1 miss1 sub1 story1'],['m_candy','add2 big1 cnt2 cmp1 miss2 sub2 story2'],
    ['m_reef','add3 time1 big2 coins1 eo2 cmp2 time2 sub3 story3'],['m_space','big3 mult1 coins2 cnt3 sub4 time3 big4 mult2 cmp3 coins3']],
  read:[['r_meadow','sound1 sight1 rhyme1 pic1 sound2 build1 sent1'],['r_candy','sight2 rhyme2 pic2 build2 sent2 comp1'],
    ['r_reef','sight3 pic3 build3 comp2'],['r_space','pic4 build4']],
  es:[['e_plaza','es_greet1 es_color1 es_num1 es_animal1 es_greet2 es_color2 es_num2 es_animal2'],
    ['e_fiesta','es_food1 es_body1 es_family1 es_teen1 es_food2 es_body2 es_family2 es_teen2'],['e_repaso','es_mix1 es_mix2']]};
const v42Stops=p=>(MAP_V42[p]||[]).flatMap(w=>w[1].split(' ')); // a path's non-boss stop ids in v42 order
const MIGRATIONS=[null,
  /* 1: single-map progress (S.map) -> per-path maps (S.maps) */
  ()=>{if(S.maps)return;S.maps={math:{},read:{},es:{}};S.mapv=2;
    const OLD='add1 sight1 cnt1 pic1 eo1 build1 miss1 sent1 sub1 story1 add2 sight2 big1 pic2 cnt2 build2 cmp1 comp1 miss2 sent2 sub2 story2 add3 time1 sight3 big2 pic3 coins1 build3 eo2 cmp2 comp2 time2 sub3 story3 big3 mult1 pic4 coins2 cnt3 build4 sub4 time3 big4 mult2 cmp3 coins3'.split(' ');
    Object.entries(S.map||{}).forEach(([i,st])=>{const o=OLD[i];if(!o||!st)return;
      for(const p in MAP_V42)if(v42Stops(p).includes(o))S.maps[p][o]=Math.max(S.maps[p][o]||0,st)});
    delete S.map;S.wdone={}},
  /* 2: map keys by stop index -> by stop id (S.mapv=2) */
  ()=>{
    for(const p in PATHS)S.maps[p]=S.maps[p]||{};
    if(!S.mapv){for(const p in PATHS){const old=v42Stops(p),m={};Object.entries(S.maps[p]).forEach(([k,v])=>{if(old[k])m[old[k]]=v});S.maps[p]=m}S.mapv=2}},
  /* 3 (P1-05): keys by world index -> by world id (ROADMAP decision A5). Index k always means world k of MAP_V42.
     - Boss stars S.maps[p]['boss<k>'] are copied to 'boss_<worldId>'.
     - S.wdone 'math0' style keys are copied to 'm_meadow' style keys, and every world whose v42 stops and boss are all passed is
       marked done (saves from v30 lost their S.wdone in migration 1), so the +20 world prize is never paid twice.
     - The old keys stay: they are tiny, and an older cached app on an offline tablet keeps reading this save (rule 9).
     - S.ptRep (today's repeat counter for game time; 't<k>' and 'boss<k>' were shared by all paths) moves to 't_<worldId>' and
       'boss_<worldId>' for world k of every path, so nothing played today earns full time twice. */
  ()=>{
    S.wdone=S.wdone&&typeof S.wdone=='object'?S.wdone:{};
    for(const p in MAP_V42){
      const m=S.maps[p]=S.maps[p]||{};
      MAP_V42[p].forEach(([id,stops],k)=>{
        const b=m['boss'+k];
        if(b>0&&!(m['boss_'+id]>=b))m['boss_'+id]=b;
        if(S.wdone[p+k])S.wdone[id]=1;
        if(m['boss_'+id]>0&&stops.split(' ').every(s=>m[s]>0))S.wdone[id]=1;
      });
    }
    const rp=S.ptRep;
    if(rp&&rp.n&&typeof rp.n=='object'){
      const n={};
      for(const[k,v]of Object.entries(rp.n)){
        const mm=/^(t|boss)(\d+)$/.exec(k);
        if(!mm){n[k]=Math.max(n[k]||0,v);continue}
        for(const p in MAP_V42){const w=MAP_V42[p][+mm[2]];if(w){const nk=(mm[1]=='t'?'t_':'boss_')+w[0];n[nk]=Math.max(n[nk]||0,v)}}
      }
      rp.n=n;
    }
  }
  ,
  /* 4: P1-06. Infer S.grade for a save that has none: the highest grade tag among the graded worlds (math, reading) where the child
     has passed a stop or beaten the boss; K (0) when there is no progress. Uses the frozen v42 world table and the grade tags
     shipped in v46, never PATHS, so worlds added later cannot change what an old save means. A grade already set is kept.
     Only adds S.grade (more worlds open, never fewer); nothing is removed or re-locked. */
  ()=>{
    if([-1,0,1,2,3,4,5,6].includes(S.grade))return;
    const G46={m_meadow:0,m_candy:1,m_reef:1,m_space:2,r_meadow:0,r_candy:1,r_reef:1,r_space:2};
    let g=0;
    for(const p of['math','read']){
      const m=(S.maps&&S.maps[p])||{};
      (MAP_V42[p]||[]).forEach(([id,stops])=>{
        if(m['boss_'+id]>0||stops.split(' ').some(k=>m[k]>0))g=Math.max(g,G46[id]||0);
      });
    }
    S.grade=g;
  }
  ,
  /* 5: P5-02. Stored misses become spaced-review items. Until v53 P(sk).miss[label] = {n, tot, q} kept the whole question
     (html, choices, passage text). Each entry whose q is a whole question (has q.kind):
     - n > 0 (still tricky): one item in S.rev {sk, lv, seed, label, box 0, due 0 (due at once), n}, plus bk for a bank question;
       seed is left out when the question had none (saves older than v38; revQ in 59-review.js looks for one later).
       At most 150 items (the most missed are kept).
     - the entry itself shrinks to {tot, q: {label}}: the tally the Grown-ups "Tricky ones" table reads. n is dropped, so an
       older cached app (rule 9) finds nothing to replay and cannot try to show a question without its html.
     Self-contained (no generator or later code), idempotent (compact entries have no q.kind; items are not added twice).
     Removes no stars, coins, map progress or anything else. */
  ()=>{
    const rev=Array.isArray(S.rev)?S.rev:[],add=[];
    const key=o=>o.sk+'|'+o.lv+'|'+o.label;
    const have=new Set(rev.map(o=>o&&key(o)));
    const prog=S.prog&&typeof S.prog=='object'?S.prog:{};
    for(const sk in prog){
      const ms=prog[sk]&&prog[sk].miss;
      if(!ms||typeof ms!='object')continue;
      for(const lb in ms){
        const m=ms[lb],q=m&&m.q;
        if(!q||typeof q!='object'||!q.kind)continue;
        const label=String(q.label!=null?q.label:lb);
        if(m.n>0){
          const it={sk:typeof q.sk=='string'?q.sk:sk,lv:Number.isInteger(q.lv)?q.lv:(Number.isInteger(prog[sk].lv)?prog[sk].lv:1),
            label:label.slice(0,60),box:0,due:0,n:Math.min(99,Math.floor(m.n))};
          if(Number.isInteger(q.seed))it.seed=q.seed;
          if(q.bk&&typeof q.bk=='object')it.bk=q.bk;
          if(!have.has(key(it))){have.add(key(it));add.push(it)}
        }
        ms[lb]={tot:Math.max(1,Math.floor(+m.tot||+m.n||1)),q:{label}};
      }
    }
    add.sort((a,b)=>b.n-a.n); // stable: equal n keep save order
    if(add.length)S.rev=rev.concat(add).slice(0,150);
  },
  /* 6: LS-STOP (v179). Lessons became stops on the map, and a stop with a lesson waits for its lesson (lsGate, 42b-lstop.js). Nothing a
     child had open is taken away: every lesson stop this save could already play because of its own progress and has not passed yet is
     kept open in S.lsOpen {nid: 1}. Its own progress: the stop before it passed; the stop before it a side stop (tracing) that was open
     by the same progress (unlocked() opens the stop after an open side stop: abc3, abc4 after the tracing stops); it is the first stop
     after a world that placement or Test out skipped; or a later stop of its world passed. Stops opened only by the grade setting (the
     first stop of a world opened by the grade) are not progress and are not kept. The lesson stops are read from this frozen list (the
     lessons of v179), never from LESSONS, so lessons added later cannot change what an old save means. Idempotent; never throws; removes
     nothing. */
  ()=>{
    const L='pk_count1 shape1 pk_num1 sort1 pk_more1 pk_count2 pat1 pk_num2 sort2 pk_count3 tenf1 pk_more2 add4 tenf2 cnt4 tenf3 add1 miss1 sub1 add2 big1 cnt2 cmp1 miss2 sub2 pv1 add5 add6 add3 time1 big2 coins1 cmp2 time2 sub3 big3 mult1 coins2 sub4 time3 big4 mult2 cmp3 coins3 pv2 big5 pv3 sub5 time4 coins4 arr1 coins5 arr2 mfact1 mfact2 dfact1 mfact3 dfact2 mfact4 dfact3 dfact4 mbig1 frac2 round1 frac3 sub6 geo1 frac4 round2 time5 geo2 frac5 sub7 mfact5 pv4 mbig2 big6 dbig1 mbig3 sub8 dbig2 fact1 mbig4 big7 dbig3 fact2 round3 frac6 frac7 fop1 frac8 fop2 dec1 dec2 geo3 meas5 pv5 mbig5 dec3 pv6 dec4 round4 ooo1 dec5 fop3 geo4 fop5|abc1 abc2 abc3 syl1 abc4 sound1 sound3 pic1 sound2 build1 sent1 pic2 build2 sent2 sound4 pic3 build3 pic4 build4'.split('|');
    const o=S.lsOpen&&typeof S.lsOpen=='object'&&!Array.isArray(S.lsOpen)?S.lsOpen:{};
    // reached(p,i): open because of the child's own progress (see above); a run of side stops is followed back (bounded by i)
    const reached=(p,i)=>{if(!(i>0))return false;const a=NODES[p][i-1],b=NODES[p][i];
      return passed(p,i-1)||a.wi!==b.wi&&worldSkipped(p,a.wi)||!!(SK[a.sk]||{}).side&&unlocked(p,i-1)&&(reached(p,i-1)||stopBehind(p,i-1))};
    ['math','read'].forEach((p,k)=>{const ids=new Set(L[k].split(' '));if(!NODES[p]||!S.maps||!S.maps[p])return;
      NODES[p].forEach((n,i)=>{try{const id=nid(n);if(ids.has(id)&&!passed(p,i)&&unlocked(p,i)&&(reached(p,i)||stopBehind(p,i)))o[id]=1}catch(e){}})}); // never throws (a map that does not fit the save keeps nothing)
    if(Object.keys(o).length)S.lsOpen=o;
  },
  /* 7: TEACH-3b (v182). Nineteen more math stops and two reading stops (Vowel Teams 2, Build Vowel Teams 2) got lessons (and so lesson stops in front of them). As migration 6: every one of THESE
     stops this save could already play because of its own progress (the stop before it passed, the first stop after a skipped world,
     or a later stop of its world passed) and has not passed is kept open in S.lsOpen. Frozen list of the v182 additions (never LESSONS);
     idempotent; never throws; removes nothing. */
  ()=>{
    const ids=new Set('story5 data3 shape5 time6 meas4 story6 ang1 ang2 shape6 pat4 story7 dbig4 fop4 coord1 fop6 meas6 data4 pat5 story8 pic6 build6'.split(' '));
    const o=S.lsOpen&&typeof S.lsOpen=='object'&&!Array.isArray(S.lsOpen)?S.lsOpen:{};
    for(const p of['math','read'])if(NODES[p]&&S.maps&&S.maps[p])NODES[p].forEach((n,i)=>{try{const a=NODES[p][i-1];
      if(ids.has(nid(n))&&!passed(p,i)&&unlocked(p,i)&&(a&&(passed(p,i-1)||a.wi!==n.wi&&worldSkipped(p,a.wi))||stopBehind(p,i)))o[nid(n)]=1}catch(e){}});
    if(Object.keys(o).length)S.lsOpen=o;
  }
];
/* MIGRATIONS[from] ... MIGRATIONS[LATEST-1] on the global S. The one way to run them (migrate() below, a loaded backup BAK.one in
   81-backup.js, another child's save PRF.up in 01-profiles.js): PLAY-01, migrations see every stop as in the web version (nothing
   locked by the Play app's free sample, PLAY.mig), so a migration that keeps stops open (6, 7) keeps the same ones everywhere. */
function runMigrations(from){
  const pl=typeof PLAY!='undefined'?PLAY:{};pl.mig=(pl.mig||0)+1;
  try{for(let n=from;n<LATEST;n++)MIGRATIONS[n]()}finally{pl.mig--}
}
/* Run once at load, from 42-paths.js (needs NODES, which no code before it reads). Backs up the old string first. */
function migrate(){
  if(S.owned&&S.owned['\u{1FA84}']){S.owned['\u{1FA80}']=1;delete S.owned['\u{1FA84}']}if(S.wear&&S.wear.toy=='\u{1FA84}')S.wear.toy='\u{1FA80}'; // an old toy (U+1FA84) became the yo-yo (the parent asked for none of that theme): same price, kept by whoever had it
  if(!('chk' in S))S.chk={}; // CHECK-IN: the stop check-ins and badges (51b-checkin.js): a default by id, nothing else changes
  if(!('pin' in S))S.pin=null; // G-FEEL2: the report card's "Practise this next" pin (55-missions.js): a default by id, nothing else changes
  if(!('fps' in S))S.fps=false;if(!('hcGl' in S))S.hcGl=true; // GL-01: the speed box (19b-fps.js) off, Hill Climb's 3D look on (62b-hill-gl.js): defaults by id
  if(S.maps&&typeof PATHS!='undefined')for(const p in PATHS)S.maps[p]=S.maps[p]||{}; // a path added after the save was written starts empty (Discover, P2-36): a default, not a migration
  const from=Number.isInteger(S.v)&&S.v>=1?S.v:1;
  if(from>=LATEST)return; // current, or written by a newer app: leave it alone
  if(SAVE_RAW!==null)try{localStorage.setItem(SKEY+'-bak',SAVE_RAW)}catch(e){}
  runMigrations(from);
  S.v=LATEST;
  save();
}
// SAVE_HOLD: set once the save in storage was replaced or erased on purpose and the page is about to reload (Start over, load a
// backup, undo a load). From then on save() writes nothing, so a timer or screen that saves the old progress before the reload
// cannot put it back (the reload starts fresh, and resets this flag). SAVE_OFF (P5-10) does the same after a child is deleted.
let SAVE_HOLD=false;
// reloadSaved(): reload after the save in storage was changed on purpose (Start over, load or undo a backup, switch, add or
// delete a child). Saves are held, and the reload waits a moment, so the browser has finished writing storage first (a reload
// straight after the write sometimes came back with the old save on a busy machine).
function reloadSaved(){SAVE_HOLD=true;if(RELOAD_WAIT)setTimeout(()=>location.reload(),RELOAD_WAIT);else location.reload()}
let RELOAD_WAIT=250; // tools/test.js sets 0 (its fake browser has no timers)
function save(){if(SAVE_HOLD||SAVE_OFF)return;try{localStorage.setItem(SKEY,JSON.stringify(S));SAVE_FAILED=false}catch(e){SAVE_FAILED=true}}
/* ---------- error guard (P0-05): last 20 errors kept in S.err, on this device only; nothing is sent anywhere ---------- */
function logErr(msg){
  try{
    const a=Array.isArray(S.err)?S.err:(S.err=[]);
    a.push({t:Date.now(),msg:String(msg).slice(0,200),ver:'__VER__'});
    if(a.length>20)a.splice(0,a.length-20);
    save();
  }catch(e){}
  try{if(typeof roundOops=='function')roundOops()}catch(e){} // friendly recovery if a round is on screen (50-round.js)
}
addEventListener('error',e=>logErr(e.message||(e.error&&e.error.message)||'error'));
addEventListener('unhandledrejection',e=>{const r=e.reason;logErr('promise: '+((r&&r.message)||r))});
function P(sk){return S.prog[sk]||(S.prog[sk]={lv:1,r:0,c:0,t:0,miss:{}})}
const today=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()};
function day(){if(S.day.d!==today())S.day={d:today(),r:0,done:false};return S.day}

