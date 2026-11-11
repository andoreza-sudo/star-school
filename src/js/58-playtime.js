/* ---------- play time ---------- */
function ptCfg(){return S.ptCfg=Object.assign({per:3,max:30,pause:false},S.ptCfg||{})}
function pt(){const p=S.pt||(S.pt={bank:180,day:'',used:0});if(p.day!==today()){p.day=today();p.used=0}return p}
const fmtT=s=>{s=Math.max(0,Math.floor(s));return`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`};
function ptLeft(){const p=pt(),c=ptCfg();if(c.pause)return 0;const cap=c.max?c.max*60-p.used:1e9;return Math.max(0,Math.min(p.bank,cap))}
function ptEarn(sec){pt().bank+=sec;save()}
const fmtM=s=>{const m=Math.round(s/30)/2;return(m%1?`${Math.floor(m)||''}½`:`${m}`)+' min'};
function ptCalc(g,sc,n,stars,prev,newPass,testOk,nd){const per=ptCfg().per*60,L=[];let t=0;const add=(v,l)=>{if(v>0){t+=v;L.push([v,l])}};
  if(g.test){add(testOk?per+60:60,testOk?'Tested out!':'Good try')}
  else if(g.mix){add(Math.round(per*.6),'Practice round');add((g.fixed||0)*30,`Fixed ${g.fixed} tricky one${g.fixed>1?'s':''}`)}
  else{const acc=sc/n,mast=prev>=3&&!g.boss;
    if(mast)add(60,'Already mastered this one');
    else{add(Math.round(per*(acc<.5?.34:acc<.7?.67:1)),acc<.5?'Keep trying':'Round done');
      if(newPass)add(60,'New stop unlocked');else if(stars>prev&&prev>0)add(30,'Beat your old score');
      const hw=nd?worldStep(nd.p,nd.wi):0;if(hw>0)add(Math.min(90,30*hw),'Harder world')} // P1-05: by grade, not raw index
    if(sc==n)add(60,'Perfect score');if(g.boss&&g.won)add(120,'Beat the boss');add((g.fixed||0)*20,`Fixed ${g.fixed} old mistake${g.fixed>1?'s':''}`)}
  const rp=S.ptRep&&S.ptRep.day==today()?S.ptRep:(S.ptRep={day:today(),n:{}}),key=g.test?'t_'+worldId(g.path,g.test.wi):g.mix?'mix':nd?nid(nd):'x',r=rp.n[key]||0;rp.n[key]=r+1;
  if(r>0){const k=r==1?.6:.35,cut=Math.round(t*(1-k));t-=cut;L.push([-cut,`Played ${r+1} times today`])}
  t=Math.max(30,Math.round(t/30)*30);return{sec:t,lines:L,mast:!g.test&&!g.mix&&prev>=3&&!g.boss,rep:r}}
function ptWhyNot(){const p=pt(),c=ptCfg();if(c.pause)return'Game time is paused by a grown-up.';if(c.max&&p.used>=c.max*60)return`That's all the game time for today (${c.max} min). Come back tomorrow!`;return'Finish a learning round to earn game time!'}

function gameRoom(){const left=ptLeft(),gs=garageS(),R_=n=>ico(n,'1.2em','ic-play');
  view(`<div class="top"><button class="btn sm" id="back" aria-label="Back">${ico('back',20)}</button><div class="title">${ico('gamepad','1.1em','ic-play')} Game Room</div><div class="sp"></div><div class="stars">${ico('ticket','1.2em','ic-play')} ${fmtT(left)}</div></div>
  <div class="scroll"><div class="ptcard ${left>0?'':'empty'}"><div style="font-size:44px">${ico('ticket','1em','ic-play')}</div><div><div class="hname">${left>0?`${fmtT(left)} of game time`:'No game time yet'}</div>
   <div class="small">${left>0?'Every learning round earns more. Have fun!':esc(ptWhyNot())}</div></div></div>
  <div class="games">
   <button class="btn game" id="g4x4" style="background:linear-gradient(135deg,#fed7aa,#fdba74)"><span class="ge">${ico('car','1em','ic-play')}</span><span class="gi"><span class="gt">4x4 Hill Climb</span><span class="small">Best: ${Math.max(gs.best.meadow,gs.best.moon)} m · ${ico('nut','1.1em')} ${gs.bolts} bolts</span></span><span class="go">${ico('play','1em')}</span></button>
   <button class="btn game" id="gcbn" style="background:linear-gradient(135deg,#fbcfe8,#f9a8d4)"><span class="ge">${ico('palette','1em','ic-read')}</span><span class="gi"><span class="gt">Coloring</span><span class="small">Animals, pixel art & free paint</span></span><span class="go">${ico('play','1em')}</span></button>
   <button class="btn game" id="gbb" style="background:linear-gradient(135deg,#bbf7d0,#86efac)"><span class="ge">${ico('blocks','1em','ic-es')}</span><span class="gi"><span class="gt">Block Builder</span><span class="small">Build your own 3D world</span></span><span class="go">${ico('play','1em')}</span></button></div>
  ${left>0?'':`<button class="btn big" id="learn" style="display:block;margin:18px auto">${ico('path-read','1.1em')} Go earn game time</button>`}
  <div class="tipcard ptrules"><b>${ico('ticket','1.2em')} How to earn MORE game time</b><div>${R_('sparkle')} Unlock a new stop <b>+1 min</b></div><div>${R_('star')} Get a perfect score <b>+1 min</b></div><div>${R_('globe')} Play a harder world <b>up to +1½ min</b></div><div>${R_('crown')} Beat a boss <b>+2 min</b></div><div>${R_('review')} Fix an old mistake <b>bonus seconds</b></div><div>${R_('chart')} Beat your old score <b>+½ min</b></div><div>${R_('timer')} Fact Sprint, first one of the day <b>+1 min</b></div><div class="small">Replaying a stop you already mastered, or the same stop over and over, earns less.</div></div></div>`);
  $('#back').onclick=()=>home();if($('#learn'))$('#learn').onclick=()=>home();
  $('#g4x4').onclick=()=>{SFX.whoosh();garage()};$('#gcbn').onclick=()=>{SFX.whoosh();colorMenu()};$('#gbb').onclick=()=>{SFX.whoosh();bbMenu()}}

