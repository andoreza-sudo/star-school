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
const LATEST=3; // newest save schema version = MIGRATIONS.length (ROADMAP section 9)
let S,SAVE_RAW=null,SAVE_CORRUPT=false,SAVE_FAILED=false;
/* Read the save string into S. Corrupt or non-object JSON is kept in KEY-corrupt; KEY itself is untouched until the first save(). */
function loadSave(raw){
  SAVE_RAW=null;SAVE_CORRUPT=false;S=null;
  if(raw){
    try{S=JSON.parse(raw)}catch(e){}
    if(S&&typeof S=='object'&&!Array.isArray(S))SAVE_RAW=raw;
    else{
      S=null;SAVE_CORRUPT=true;
      try{localStorage.setItem(KEY+'-corrupt',raw)}catch(e){}
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
const MIGRATIONS=[null,
  /* 1: single-map progress (S.map) -> per-path maps (S.maps) */
  ()=>{if(S.maps)return;S.maps={math:{},read:{},es:{}};S.mapv=2;
    const OLD='add1 sight1 cnt1 pic1 eo1 build1 miss1 sent1 sub1 story1 add2 sight2 big1 pic2 cnt2 build2 cmp1 comp1 miss2 sent2 sub2 story2 add3 time1 sight3 big2 pic3 coins1 build3 eo2 cmp2 comp2 time2 sub3 story3 big3 mult1 pic4 coins2 cnt3 build4 sub4 time3 big4 mult2 cmp3 coins3'.split(' ');
    Object.entries(S.map||{}).forEach(([i,st])=>{const o=OLD[i];if(!o||!st)return;const sk=o.slice(0,-1),lv=+o.slice(-1);
      for(const p in NODES)NODES[p].forEach(n=>{if(n.sk==sk&&n.lv==lv)S.maps[p][nid(n)]=Math.max(S.maps[p][nid(n)]||0,st)})});
    delete S.map;S.wdone={}},
  /* 2: map keys by stop index -> by stop id (S.mapv=2) */
  ()=>{
    for(const p in PATHS)S.maps[p]=S.maps[p]||{};
    if(!S.mapv){for(const p in PATHS){const old=NODES[p].filter(n=>n.sk!='boss'),m={};Object.entries(S.maps[p]).forEach(([k,v])=>{if(old[k])m[nid(old[k])]=v});S.maps[p]=m}S.mapv=2}}
];
/* Run once at load, from 42-paths.js (needs NODES, which no code before it reads). Backs up the old string first. */
function migrate(){
  const from=Number.isInteger(S.v)&&S.v>=1?S.v:1;
  if(from>=LATEST)return; // current, or written by a newer app: leave it alone
  if(SAVE_RAW!==null)try{localStorage.setItem(KEY+'-bak',SAVE_RAW)}catch(e){}
  for(let n=from;n<LATEST;n++)MIGRATIONS[n]();
  S.v=LATEST;
  save();
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));SAVE_FAILED=false}catch(e){SAVE_FAILED=true}}
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

