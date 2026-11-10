/* ---------- pet care ---------- */
function careTick(){const c=S.care||(S.care={food:70,clean:70,fun:70,t:Date.now(),gift:''});const h=(Date.now()-c.t)/36e5;
  if(h>0){c.food=Math.max(0,c.food-h*4);c.clean=Math.max(0,c.clean-h*3);c.fun=Math.max(0,c.fun-h*5);c.t=Date.now()}return c}
const SNACKS=[['🍎',3,25],['🍪',5,40],['🍕',8,60],['🎂',15,100]];
function care(){const c=careTick();save();const pn=esc(petN()),sc=sceneOf();
  const mood=c.food<30?`${pn} is hungry! 🍖`:c.clean<30?`${pn} needs a bath! 🛁`:c.fun<30?`${pn} wants to play! 🎾`:Math.min(c.food,c.clean,c.fun)>=80?`${pn} is super happy! 💖`:`${pn} is doing great!`;
  const bar=(l,v,col)=>`<div class="cbar"><span>${l}</span><div class="meter"><div style="width:${v}%;background:${col}"></div></div><b>${Math.round(v)}%</b></div>`;
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title">🐾 Pet Care</div><div class="sp"></div><div class="stars" id="coinc">${ico('coin','1.2em','ic-coin')} ${S.coins}</div></div>
  <div class="scroll">${stageHTML(sc,mood,'',false)}
  <div class="card">${bar('🍖 Food',c.food,'linear-gradient(90deg,#f59e0b,#ef4444)')}${bar('🛁 Clean',c.clean,'linear-gradient(90deg,#38bdf8,#3b82f6)')}${bar('🎾 Fun',c.fun,'linear-gradient(90deg,#a3e635,#22c55e)')}</div>
  <h2>Snacks</h2><div class="shopgrid">${SNACKS.map(([e,cost,v],i)=>`<button class="btn item" data-f="${i}"><span>${e}</span><div>${ico('coin','1.2em','ic-coin')} ${cost}</div></button>`).join('')}</div>
  <div class="actions" style="grid-template-columns:1fr 1fr"><button class="btn act" id="bath"><span>🛁</span>Bath time (free)</button><button class="btn act" id="play"><span>🎾</span>Play (free)</button></div></div>`);
  $('#back').onclick=()=>home();
  const pet=$('#pet'),fly=(emo,n=1)=>{const r=pet.getBoundingClientRect();for(let i=0;i<n;i++)setTimeout(()=>burst(r.left+r.width/2,r.top+r.height/2,[emo]),i*120)};
  const done=()=>{c.t=Date.now();if(Math.min(c.food,c.clean,c.fun)>=80&&c.gift!==today()){c.gift=today();S.coins+=5;setTimeout(()=>{SFX.fanfare();confetti(20);fb(`🎁 ${petN()} gave you 5 coins!`,'',2000)},900)}save();setTimeout(care,1300)};
  $$('[data-f]').forEach(b=>b.onclick=()=>{const[e,cost,v]=SNACKS[+b.dataset.f];if(c.food>=100){fb(`${petN()} is full! 😋`,'warn');anim(pet,'sad');return}
    if(S.coins<cost){SFX.wrong();anim(b,'sad');fb(`Need ${cost-S.coins} more coins!`,'warn');return}
    S.coins-=cost;c.food=Math.min(100,c.food+v);SFX.chomp();anim(pet,'jump');fly(e,3);setTimeout(()=>fly('💖',2),400);if(S.voice)say(pick(['Yum yum!','Delicious!','Thank you!','Mmm!']));done()});
  $('#bath').onclick=()=>{c.clean=100;SFX.splash();anim(pet,'sad');fly('💧',4);setTimeout(()=>fly('✨',3),500);if(S.voice)say(pick(['Splish splash!','So clean!','Bubbles!']));done()};
  $('#play').onclick=()=>{c.fun=Math.min(100,c.fun+30);SFX.giggle();anim(pet,'jump');fly('🎾',2);setTimeout(()=>anim(pet,'jump'),550);if(S.voice)say(pick(['Wheee!','Again! Again!','That was fun!']));done()}}

