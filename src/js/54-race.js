/* ---------- speed race ---------- */
let RC=null;
function stopRace(){if(RC){clearInterval(RC.iv);RC=null}}
const passedAny=(p,sk,lv)=>NODES[p].some((n,i)=>n.sk==sk&&n.lv>=lv&&passed(p,i));
const RACES={math:['➕','Math Facts','Add and take away, fast!'],sight:['👀','Sight Words','Hear it, tap it!'],es:['🌮','Spanish Words','Escucha y toca!']};
function raceMenu(){S.race=S.race||{};
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title">⚡ Speed Race</div></div>
  <div class="scroll"><p class="sub" style="text-align:center">How many can you get in 60 seconds? Beat your best score!</p>
  <div class="games">${Object.entries(RACES).map(([k,[e,t,d]])=>`<button class="btn game" data-r="${k}" style="background:linear-gradient(135deg,#fef3c7,#fde68a)"><span class="ge">${e}</span><span class="gi"><span class="gt">${t}</span><span class="small">${d}</span></span><span class="stars">🏆 ${S.race[k]||0}</span></button>`).join('')}</div></div>`);
  $('#back').onclick=()=>home();$$('[data-r]').forEach(b=>b.onclick=()=>race(b.dataset.r))}
function raceQ(cat){
  if(cat=='math'){const big=passedAny('math','add',1),sub=passedAny('math','sub',1)&&coin(),mx=big?18:10;
    if(sub){const a=R(2,mx),b=R(Math.max(0,a-9),Math.min(a,9));return{kind:'num',html:`<div class="eq">${a} − ${b} = ${SLOT}</div>`,ans:String(a-b),say:''}}
    const a=R(0,Math.min(9,mx)),b=R(0,Math.min(9,mx-a));return{kind:'num',html:`<div class="eq">${a} + ${b} = ${SLOT}</div>`,ans:String(a+b),say:''}}
  if(cat=='sight'){const lv=passedAny('read','sight',3)?3:passedAny('read','sight',2)?2:1;return genQ('sight',lv)}
  const sets=Object.keys(SPN).filter(k=>passedAny('es','es_'+k,1));return genQ('es_'+(sets.length?pick(sets):pick(['color','num'])),1)}
function race(cat){S.race=S.race||{};const best=S.race[cat]||0;
  view(`<div class="top"><button class="btn sm" id="quit">✕</button><div class="prog"><div id="rbar" style="width:100%;background:linear-gradient(90deg,#ef4444,#f59e0b)"></div></div>
   <div class="stars" id="rsc">⚡ 0</div><div class="stars">🏆 ${best}</div></div><div class="play" id="rplay"></div>`);
  RC={cat,score:0,left:60,iv:0,lock:false,typed:''};
  $('#quit').onclick=()=>{stopRace();raceMenu()};
  const rq=()=>{if(!RC)return;const q=raceQ(cat);RC.q=q;RC.typed='';RC.lock=false;
    $('#rplay').innerHTML=`<div class="qarea"><div class="prompt" id="prompt">${q.html}</div></div><div class="inp">${KIND[q.kind].render(q)}</div>`;
    fit();if(q.auto)say(q.say,null,q.lang=='es'?'es':null);
    $$('[data-sayes]').forEach(b=>b.onclick=()=>say(b.dataset.sayes,b,'es'));
    // same input as a round; race pads take 3 digits, answer as soon as the right number is typed, and stay quiet
    KIND[q.kind].bind(q,RC,ans,{max:3,auto:true,quiet:true})};
  const ans=(v,el)=>{if(!RC||RC.lock)return;RC.lock=true;const q=RC.q;
    if(String(v)===String(q.ans)){RC.score++;SFX.right(RC.score%10);$('#rsc').textContent='⚡ '+RC.score;bump('#rsc');if(el)el.classList.add('right');KIND[q.kind].right(q);setTimeout(rq,250)}
    else{SFX.wrong();if(el)el.classList.add('wrong');KIND[q.kind].reveal(q);setTimeout(rq,800)}};
  setTimeout(()=>{fb('Ready… GO! ⚡');SFX.fanfare();rq()},300);
  RC.iv=setInterval(()=>{if(!RC)return;RC.left--;const b=$('#rbar');if(b)b.style.width=RC.left/60*100+'%';if(RC.left<=5&&RC.left>0)tone(880,.08,0,'square',.05);
    if(RC.left<=0){const sc=RC.score,rec=sc>best;stopRace();if(rec)S.race[cat]=sc;const coins=Math.floor(sc/2)+(rec&&sc>0?5:0);S.coins+=coins;if(sc>=5)ptEarn(60);save();
      rec&&sc>0?(SFX.fanfare(),confetti(40)):SFX.magic();
      const o=document.createElement('div');o.className='ovl';o.innerHTML=`<div style="font-size:80px">${rec&&sc>0?'🏆':'⚡'}</div><h1>${sc} in 60 seconds!</h1><h2>${rec&&sc>0?'NEW RECORD! 🎉':`Your best: ${best}`}</h2><h2>+${coins} 🪙${sc>=5?' · 🎟️ +1 min':''}</h2>
        <div class="rowh"><button class="btn big" id="ragain">Race again</button><button class="btn" id="rhome">🏠 Home</button></div>`;
      document.body.appendChild(o);if(S.voice)say(rec&&sc>0?`New record! ${sc}!`:`You got ${sc}!`);
      o.querySelector('#ragain').onclick=()=>{o.remove();race(cat)};o.querySelector('#rhome').onclick=()=>{o.remove();home()}}},1000)}

