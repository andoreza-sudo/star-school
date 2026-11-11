/* ---------- game timer shared by pure games ---------- */
// P4-16: the time chip is the shared top bar's (GH.top, 59-game-hub.js); the clock holds while the pause sheet is open (GH.held).
let GT=null;
function gtStop(){if(GT){clearInterval(GT.iv);GT=null}}
function gtStart(el,onEnd){gtStop();GT={up:false,grace:0,iv:setInterval(()=>{if(!GT||document.hidden||GH.held)return;const p=pt();
  if(!GT.up){p.bank=Math.max(0,p.bank-1);p.used+=1;if(ptLeft()<=0){GT.up=true;GT.grace=20;fb('Game time is almost up!','warn long',2500);SFX.rattle()}}
  else if(--GT.grace<=0){gtStop();save();return onEnd()}
  if(p.used%5==0)save();GH.setTime($(el),GT.up?GT.grace:null)},1000)}}
// P4-16: the shared end card (GH.end) for the game on screen; "Earn more time" (#tl) goes home as before
function timeUpOverlay(){const g=GH.get(GH.cur)||{},said=g.saved||'Your game is saved.';
  const o=GH.end(g.id,{title:"Game time's up!",lines:[['check-circle',esc(said)],['path-read','Learn a little to earn more time!']],
    btns:UI.btn('Earn more time',{kind:'primary',size:'lg',icon:'path-read',id:'tl',wide:true})});
  SFX.magic();if(S.voice)say('Game time is up! '+said);o.querySelector('#tl').onclick=()=>{o.remove();home()}}
