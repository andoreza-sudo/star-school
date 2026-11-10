const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY='starschool-v2';
let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S)S={name:'',pet:'dragon',petName:'',buddy:'',stars:0,prog:{},stickers:{},day:{},voice:true,sound:true,music:true,best:0};
S=Object.assign({wdone:{},owned:{meadow:1},wear:{hat:'',toy:'',scene:'meadow'},unlockAll:false,coins:S.stars||0},S);
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function P(sk){return S.prog[sk]||(S.prog[sk]={lv:1,r:0,c:0,t:0,miss:{}})}
const today=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()};
function day(){if(S.day.d!==today())S.day={d:today(),r:0,done:false};return S.day}

