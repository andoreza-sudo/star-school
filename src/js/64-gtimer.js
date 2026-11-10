/* ---------- game timer shared by pure games ---------- */
let GT=null;
function gtStop(){if(GT){clearInterval(GT.iv);GT=null}}
function gtStart(el,onEnd){gtStop();GT={up:false,grace:0,iv:setInterval(()=>{if(!GT||document.hidden)return;const p=pt();
  if(!GT.up){p.bank=Math.max(0,p.bank-1);p.used+=1;if(ptLeft()<=0){GT.up=true;GT.grace=20;fb('⏰ Game time is almost up!','warn long',2500);SFX.rattle()}}
  else if(--GT.grace<=0){gtStop();save();return onEnd()}
  if(p.used%5==0)save();const t=$(el);if(t)t.textContent=GT.up?`⏰ ${GT.grace}s`:`🎟️ ${fmtT(ptLeft())}`},1000)}}
function timeUpOverlay(){const o=document.createElement('div');o.className='ovl';o.innerHTML=`<div style="font-size:72px">⏰</div><h1>Game time's up!</h1><p style="font-size:20px">Your picture is saved. Learn a little to earn more time!</p><div class="rowh"><button class="btn big" id="tl">📚 Earn more time</button></div>`;
  document.body.appendChild(o);SFX.magic();if(S.voice)say("Game time is up! Your picture is saved.");o.querySelector('#tl').onclick=()=>{o.remove();home()}}

