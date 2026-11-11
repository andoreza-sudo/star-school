/* ---------- pet care ---------- */
function careTick(){const c=S.care||(S.care={food:70,clean:70,fun:70,t:Date.now(),gift:''});const h=(Date.now()-c.t)/36e5;
  if(h>0){c.food=Math.max(0,c.food-h*4);c.clean=Math.max(0,c.clean-h*3);c.fun=Math.max(0,c.fun-h*5);c.t=Date.now()}return c}
const SNACKS=[['🍎',3,25],['🍪',5,40],['🍕',8,60],['🎂',15,100]];
const SNACK_W=['apple','cookie','pizza','cake']; // P4-18: snack pictures go through picFor (object art where it exists)

/* P4-12: the care actions' feedback is drawn, in the pets' style (shade, base moved toward the light, a white glint): hearts and
   sparkles for a snack, soap bubbles for the bath, stars for play. Pieces rise from the pet and fade (keyframes pc-up in
   src/css/48-setup-grown-care.css, transform and opacity only). With reduced motion or calm mode nothing is drawn; the pet's own
   reaction, the sound and the meters still show what happened. */
const PC_C = h => `var(--ill-${h})`;
const PC_FX = {
  heart: `<path fill="${PC_C('pink-3')}" d="M12 21C5.5 16.5 2.5 13 2.5 9A4.6 4.6 0 0 1 12 6.9a4.6 4.6 0 0 1 9.5 2.1C21.5 13 18.5 16.5 12 21Z"/>` +
    `<path fill="${PC_C('pink-2')}" d="M11.4 19.6C5.4 15.4 2.6 12.3 2.6 8.7A4.3 4.3 0 0 1 11.4 6.6a4.3 4.3 0 0 1 8.8 2.1C20.2 12.3 17.4 15.4 11.4 19.6Z"/>` +
    `<ellipse cx="7.4" cy="8.6" rx="2" ry="1.4" fill="${PC_C('white')}" opacity=".85" transform="rotate(-35 7.4 8.6)"/>`,
  star: `<path fill="${PC_C('yellow-2')}" stroke="${PC_C('yellow-2')}" stroke-width="2" stroke-linejoin="round" d="M12 3L14.7 9.3L21.5 9.9L16.4 14.4L17.9 21.1L12 17.6L6.1 21.1L7.6 14.4L2.5 9.9L9.3 9.3Z"/>` +
    `<path fill="${PC_C('yellow')}" d="M11.6 2.6L14.2 8.6L20.6 9.2L15.7 13.5L17.1 19.8L11.6 16.5L6.1 19.8L7.5 13.5L2.6 9.2L9 8.6Z"/>` +
    `<circle cx="9.6" cy="10.4" r="1.3" fill="${PC_C('white')}"/>`,
  bubble: `<circle cx="12" cy="12" r="9.6" fill="${PC_C('aqua-1')}" fill-opacity=".5" stroke="${PC_C('aqua-2')}" stroke-width="1.4"/>` +
    `<path fill="none" stroke="${PC_C('white')}" stroke-width="2" stroke-linecap="round" d="M6.6 10.4A5.8 5.8 0 0 1 10.6 6.3"/>` +
    `<circle cx="16" cy="15.6" r="1.4" fill="${PC_C('white')}" opacity=".8"/>`,
  spark: `<path fill="${PC_C('yellow-1')}" stroke="${PC_C('yellow-2')}" stroke-width=".8" stroke-linejoin="round" d="M12 2.5L14 10L21.5 12L14 14L12 21.5L10 14L2.5 12L10 10Z"/>`,
};
const PC_KIND = {food: ['heart', 'spark'], bath: ['bubble', 'bubble', 'spark'], play: ['star', 'spark']};
function careFx(kind, n = 9) {
  const pet = $('#pet');
  if (!pet || document.documentElement.classList.contains('calm')) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const p = pet.getBoundingClientRect(), set = PC_KIND[kind] || PC_KIND.play;
  const box = document.createElement('div'); // on the body: care() redraws the screen 1.3 s after an action, the pieces fly on
  box.className = 'pc-fx k-' + kind;
  box.setAttribute('aria-hidden', 'true');
  box.style.left = Math.round(p.left + p.width / 2) + 'px';
  box.style.top = Math.round(p.top + p.height * .45) + 'px';
  let h = '';
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (Math.random() - .5) * 2.4, d = 50 + Math.random() * 70, s = i % 3 ? 22 : 34;
    h += `<i style="--x:${Math.round(Math.cos(a) * d)}px;--y:${Math.round(Math.sin(a) * d - (kind == 'bath' ? 12 : 0))}px;--d:${i * 50}ms;` +
      `width:${s}px;height:${s}px"><svg viewBox="0 0 24 24">${PC_FX[set[i % set.length]]}</svg></i>`;
  }
  box.innerHTML = h;
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 1700);
}

// Pet Care (P4-18 icons and meters; P4-12 drawn stage and feedback, card layout, two columns on a wide landscape screen)
function care(){const c=careTick();save();const pn=esc(petN()),sc=sceneOf();
  const mood=c.food<30?`${pn} is hungry!`:c.clean<30?`${pn} needs a bath!`:c.fun<30?`${pn} wants to play!`:Math.min(c.food,c.clean,c.fun)>=80?`${pn} is super happy!`:`${pn} is doing great!`;
  const bar=(l,icon,v,k)=>`<div class="cbar gx-cbar ${k}"><span class="gx-ci">${ico(icon,26)}</span><span class="gx-cl">${l}</span>${UI.meter(v/100,{label:l+' '+Math.round(v)+'%'})}<b>${Math.round(v)}%</b></div>`;
  view(`<div class="top tbar gx-mtop s-play">${UI.ibtn('back','Back',{size:'sm',id:'back'})}<div class="ttl gx-ttl"><span class="gx-tb">${ico('paw',24)}</span><span>Pet Care</span></div>${UI.chip('coin',S.coins,{id:'coinc',aria:'Coins'})}</div>
  <div class="scroll pc"><div class="pc-l">${stageHTML(sc,mood,'',false)}</div><div class="pc-r">
  <div class="pc-card gx-care">${bar('Food','food',c.food,'k-food')}${bar('Clean','bath',c.clean,'k-clean')}${bar('Fun','ball',c.fun,'k-fun')}</div>
  <h2 class="gx-h">${ico('food',26)}<span>Snacks</span></h2><div class="shopgrid gx-snacks">${SNACKS.map(([e,cost,v],i)=>`<button class="btn item gx-snack" data-f="${i}" aria-label="${SNACK_W[i]}, ${cost} coins"><span class="gx-sp">${picFor(SNACK_W[i],e)}</span><div class="gx-price">${ico('coin',22,'ic-coin')}<b>${cost}</b></div></button>`).join('')}</div>
  <div class="actions gx-acts2"><button class="btn act gx-act" id="bath"><span class="gx-ai">${ico('bath',34)}</span>Bath time (free)</button><button class="btn act gx-act" id="play"><span class="gx-ai">${ico('ball',34)}</span>Play (free)</button></div></div></div>`);
  $('#back').onclick=()=>home();
  const pet=$('#pet');
  const done=()=>{c.t=Date.now();if(Math.min(c.food,c.clean,c.fun)>=80&&c.gift!==today()){c.gift=today();S.coins+=5;
    setTimeout(()=>{SFX.fanfare();RW.burst(document.body,28);UI.toast(`${petN()} gave you 5 coins!`,'good',2000,'gift')},900)}save();setTimeout(care,1300)};
  $$('[data-f]').forEach(b=>b.onclick=()=>{const[e,cost,v]=SNACKS[+b.dataset.f];if(c.food>=100){fb(`${petN()} is full!`,'warn');anim(pet,'sad');return}
    if(S.coins<cost){SFX.wrong();anim(b,'sad');fb(`Need ${cost-S.coins} more coins!`,'warn');return}
    S.coins-=cost;c.food=Math.min(100,c.food+v);SFX.chomp();anim(pet,'jump');careFx('food');if(S.voice)say(pick(['Yum yum!','Delicious!','Thank you!','Mmm!']));done()});
  $('#bath').onclick=()=>{c.clean=100;SFX.splash();anim(pet,'sad');careFx('bath',11);if(S.voice)say(pick(['Splish splash!','So clean!','Bubbles!']));done()};
  $('#play').onclick=()=>{c.fun=Math.min(100,c.fun+30);SFX.giggle();anim(pet,'jump');careFx('play');setTimeout(()=>anim(pet,'jump'),550);if(S.voice)say(pick(['Wheee!','Again! Again!','That was fun!']));done()}}
