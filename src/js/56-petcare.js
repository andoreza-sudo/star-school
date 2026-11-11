/* ---------- pet care ---------- */
function careTick(){const c=S.care||(S.care={food:70,clean:70,fun:70,t:Date.now(),gift:''});const h=(Date.now()-c.t)/36e5;
  if(h>0){c.food=Math.max(0,c.food-h*4);c.clean=Math.max(0,c.clean-h*3);c.fun=Math.max(0,c.fun-h*5);c.t=Date.now()}return c}
const SNACKS=[['🍎',3,25],['🍪',5,40],['🍕',8,60],['🎂',15,100]];
const SNACK_W=['apple','cookie','pizza','cake']; // P4-18: snack pictures go through picFor (object art where it exists)
function care(){const c=careTick();save();const pn=esc(petN()),sc=sceneOf();
  const mood=c.food<30?`${pn} is hungry!`:c.clean<30?`${pn} needs a bath!`:c.fun<30?`${pn} wants to play!`:Math.min(c.food,c.clean,c.fun)>=80?`${pn} is super happy!`:`${pn} is doing great!`;
  // P4-18: drawn meter icons and gauges, snack pictures, icon buttons (were emoji and raw-colour bars)
  const bar=(l,icon,v,k)=>`<div class="cbar gx-cbar ${k}"><span class="gx-ci">${ico(icon,26)}</span><span class="gx-cl">${l}</span>${UI.meter(v/100,{label:l+' '+Math.round(v)+'%'})}<b>${Math.round(v)}%</b></div>`;
  view(`<div class="top tbar gx-mtop s-play">${UI.ibtn('back','Back',{size:'sm',id:'back'})}<div class="ttl gx-ttl"><span class="gx-tb">${ico('paw',24)}</span><span>Pet Care</span></div>${UI.chip('coin',S.coins,{id:'coinc',aria:'Coins'})}</div>
  <div class="scroll">${stageHTML(sc,mood,'',false)}
  <div class="card gx-care">${bar('Food','food',c.food,'k-food')}${bar('Clean','bath',c.clean,'k-clean')}${bar('Fun','ball',c.fun,'k-fun')}</div>
  <h2 class="gx-h">${ico('food',26)}<span>Snacks</span></h2><div class="shopgrid gx-snacks">${SNACKS.map(([e,cost,v],i)=>`<button class="btn item gx-snack" data-f="${i}" aria-label="${SNACK_W[i]}, ${cost} coins"><span class="gx-sp">${picFor(SNACK_W[i],e)}</span><div class="gx-price">${ico('coin',22,'ic-coin')}<b>${cost}</b></div></button>`).join('')}</div>
  <div class="actions gx-acts2"><button class="btn act gx-act" id="bath"><span class="gx-ai">${ico('bath',34)}</span>Bath time (free)</button><button class="btn act gx-act" id="play"><span class="gx-ai">${ico('ball',34)}</span>Play (free)</button></div></div>`);
  $('#back').onclick=()=>home();
  const pet=$('#pet'),fly=(emo,n=1)=>{const r=pet.getBoundingClientRect();for(let i=0;i<n;i++)setTimeout(()=>burst(r.left+r.width/2,r.top+r.height/2,[emo]),i*120)};
  const done=()=>{c.t=Date.now();if(Math.min(c.food,c.clean,c.fun)>=80&&c.gift!==today()){c.gift=today();S.coins+=5;setTimeout(()=>{SFX.fanfare();confetti(20);fb(`🎁 ${petN()} gave you 5 coins!`,'',2000)},900)}save();setTimeout(care,1300)};
  $$('[data-f]').forEach(b=>b.onclick=()=>{const[e,cost,v]=SNACKS[+b.dataset.f];if(c.food>=100){fb(`${petN()} is full! 😋`,'warn');anim(pet,'sad');return}
    if(S.coins<cost){SFX.wrong();anim(b,'sad');fb(`Need ${cost-S.coins} more coins!`,'warn');return}
    S.coins-=cost;c.food=Math.min(100,c.food+v);SFX.chomp();anim(pet,'jump');fly(e,3);setTimeout(()=>fly('💖',2),400);if(S.voice)say(pick(['Yum yum!','Delicious!','Thank you!','Mmm!']));done()});
  $('#bath').onclick=()=>{c.clean=100;SFX.splash();anim(pet,'sad');fly('💧',4);setTimeout(()=>fly('✨',3),500);if(S.voice)say(pick(['Splish splash!','So clean!','Bubbles!']));done()};
  $('#play').onclick=()=>{c.fun=Math.min(100,c.fun+30);SFX.giggle();anim(pet,'jump');fly('🎾',2);setTimeout(()=>anim(pet,'jump'),550);if(S.voice)say(pick(['Wheee!','Again! Again!','That was fun!']));done()}}

