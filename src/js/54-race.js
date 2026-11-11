/* ---------- Fact Race (called Speed Race until G-02, which added the racing game Star Rally; ids and S.race unchanged) ---------- */
let RC=null;
function stopRace(){if(RC){clearInterval(RC.iv);RC=null}}
const passedAny=(p,sk,lv)=>NODES[p].some((n,i)=>n.sk==sk&&n.lv>=lv&&passed(p,i));
const RACES={math:['➕','Math Facts','Add and take away, fast!'],sight:['👀','Sight Words','Hear it, tap it!'],es:['🌮','Spanish Words','Escucha y toca!']};
// P4-18: drawn race badges and colours (the emoji in RACES stay as data)
const RACE_GX={math:['path-math','math'],sight:['eye','read'],es:['path-es','es']};
function raceMenu(){S.race=S.race||{};
  view(`<div class="top tbar gx-mtop s-play">${UI.ibtn('back','Back',{size:'sm',id:'back'})}<div class="ttl gx-ttl"><span class="gx-tb">${ico('bolt',24)}</span><span>Fact Race</span></div></div>
  <div class="scroll gx-list"><p class="gx-lead">How many can you get in 60 seconds? Beat your best score!</p>
  <div class="games">${Object.entries(RACES).map(([k,[e,t,d]])=>GFX.card({cls:'game',attrs:`data-r="${k}"`,p:RACE_GX[k][1],icon:RACE_GX[k][0],title:t,sub:esc(d),
    side:`<span class="gx-best">${ico('trophy',22)}<b>${S.race[k]||0}</b></span>`})).join('')}</div></div>`);
  $('#back').onclick=()=>home();$$('[data-r]').forEach(b=>b.onclick=()=>race(b.dataset.r))}
function raceQ(cat){
  if(cat=='math'){const big=passedAny('math','add',1),sub=passedAny('math','sub',1)&&coin(),mx=big?18:10;
    if(sub){const a=R(2,mx),b=R(Math.max(0,a-9),Math.min(a,9));return{kind:'num',html:`<div class="eq">${a} − ${b} = ${SLOT}</div>`,ans:String(a-b),say:''}}
    const a=R(0,Math.min(9,mx)),b=R(0,Math.min(9,mx-a));return{kind:'num',html:`<div class="eq">${a} + ${b} = ${SLOT}</div>`,ans:String(a+b),say:''}}
  if(cat=='sight'){const lv=passedAny('read','sight',3)?3:passedAny('read','sight',2)?2:1;return genQ('sight',lv)}
  const sets=Object.keys(SPN).filter(k=>passedAny('es','es_'+k,1));return genQ('es_'+(sets.length?pick(sets):pick(['color','num'])),1)}
function race(cat){S.race=S.race||{};const best=S.race[cat]||0;
  const ar=cat=='sight'?'read':cat=='es'?'es':'math';
  view(`${GFX.speedTop(ar,'rbar',1,UI.chip('bolt',0,{id:'rsc',aria:'Right answers'})+UI.chip('trophy',best,{aria:'Best'}))}<div class="play qs s-${ar}" id="rplay"></div>`);
  RC={cat,score:0,left:60,iv:0,lock:false,typed:''};
  $('#quit').onclick=()=>{stopRace();raceMenu()};
  const rq=()=>{if(!RC)return;const q=raceQ(cat);RC.q=q;RC.typed='';RC.lock=false;
    $('#rplay').innerHTML=`<div class="qarea"><div class="prompt" id="prompt">${q.html}</div></div><div class="inp">${KIND[q.kind].render(q)}</div>`;
    fit();if(q.auto)say(q.say,null,q.lang=='es'?'es':null);esQFix(q);
    $$('[data-sayes]').forEach(b=>b.onclick=()=>say(b.dataset.sayes,b,'es'));
    // same input as a round; race pads take 3 digits, answer as soon as the right number is typed, and stay quiet
    KIND[q.kind].bind(q,RC,ans,{max:3,auto:true,quiet:true})};
  const ans=(v,el)=>{if(!RC||RC.lock)return;RC.lock=true;const q=RC.q;
    if(String(v)===String(q.ans)){RC.score++;SFX.right(RC.score%10);UI.setChip($('#rsc'),RC.score);if(el)el.classList.add('right');KIND[q.kind].right(q);setTimeout(rq,250)}
    else{SFX.wrong();if(el)el.classList.add('wrong');KIND[q.kind].reveal(q);setTimeout(rq,800)}};
  setTimeout(()=>{fb('Ready… GO!','zap');SFX.fanfare();rq()},300);
  RC.iv=setInterval(()=>{if(!RC)return;RC.left--;GFX.bar($('#rbar'),RC.left/60);if(RC.left<=5&&RC.left>0)SFX.tick();
    if(RC.left<=0){const sc=RC.score,rec=sc>best;stopRace();if(rec)S.race[cat]=sc;const coins=Math.floor(sc/2)+(rec&&sc>0?5:0);S.coins+=coins;const ps=ptRace(cat,sc);if(ps)ptEarn(ps);save();
      rec&&sc>0?(SFX.fanfare(),confetti(40)):SFX.magic();
      const o=GFX.endCard({rec:rec&&sc>0,title:`${sc} in 60 seconds!`,best:`Your best: ${best}`,
        earn:`${ico('coin',28,'ic-coin')}<span>+${coins}</span>${ps?`${ico('ticket',28)}<span>+1 min of game time</span>`:sc>=5?`<span>Free practice: the first race each day pays</span>`:''}`,
        btns:UI.btn('Race again',{kind:'primary',size:'lg',wide:true,icon:'replay',id:'ragain'})+UI.btn('Home',{icon:'home',wide:true,id:'rhome'})});
      document.body.appendChild(o);if(S.voice)say(rec&&sc>0?`New record! ${sc}!`:`You got ${sc}!`);
      o.querySelector('#ragain').onclick=()=>{o.remove();race(cat)};o.querySelector('#rhome').onclick=()=>{o.remove();home()}}},1000)}

