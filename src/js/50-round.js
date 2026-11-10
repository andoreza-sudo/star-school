/* ---------- game ---------- */
let G;
const newG=o=>(bankRound(),Object.assign({n:10,done:0,score:0,streak:0,best:0,missed:[],last:null,node:-1,path:null},o));
function start(p,i){const n=NODES[p][i];G=newG({path:p,node:i,sk:n.sk,lv:n.lv,n:gradeCfg().n});
  if(SK[n.sk].round){G.pool=SK[n.sk].round(n.lv);G.n=G.pool.length}
  next()}
function startMix(){const qs=allMiss().slice(0,7).map(m=>({...m.q})),pool=[];
  for(const p in NODES)NODES[p].forEach((n,i)=>{if(unlocked(p,i)&&i<=curNode(p))pool.push(n)});
  while(qs.length<10){const n=pick(pool),q=genQ(n.sk,n.lv);qs.push(q)}
  G=newG({mix:true,pool:shuffle(qs),sk:'mix'});next()}
const back=()=>G&&G.path?pathMap(G.path):home();
function worldPool(p,wi,k){const ns=NODES[p].filter(n=>n.wi==wi&&n.sk!='boss');return Array.from({length:k},()=>{const n=pick(ns),q=genQ(n.sk,n.lv);return q})}
function bossIntro(p,i){const n=NODES[p][i],[e,name]=n.boss;
  view(`<div class="center"><div class="bossbig">${e}</div><h1>${name} appears!</h1><p class="sub">Every right answer zaps ${name}. Zap 7 times to win a prize: ${n.prize}</p>
   <div class="rowh"><button class="btn big" id="fight" style="background:#dc2626">⚔️ Let's go!</button><button class="btn" id="nope">🗺️ Map</button></div></div>`);
  SFX.rattle();setTimeout(SFX.rattle,500);if(S.voice)say(`Oh no! ${name} appears! Answer questions to zap ${name}!`);
  $('#nope').onclick=()=>pathMap(p);$('#fight').onclick=()=>{SFX.whoosh();G=newG({path:p,node:i,sk:'boss',boss:{e,name},hp:7,pool:worldPool(p,n.wi,10)});next()}}
function testOut(p,wi){const w=PATHS[p].worlds[wi],o=document.createElement('div');o.className='ovl';
  o.innerHTML=`<div style="background:#fff;color:var(--ink);border-radius:24px;padding:20px;max-width:520px;text-align:center"><div style="font-size:64px">⚡</div><h2 style="margin:4px 0">Test out of ${w.e} ${w.n}?</h2>
   <p>10 questions from this whole world. Get <b>9 right</b> and you skip all of its stops!</p><div class="rowh"><button class="btn big" id="tgo">Let's do it!</button><button class="btn" id="tno">Not now</button></div></div>`;
  document.body.appendChild(o);o.querySelector('#tno').onclick=()=>o.remove();
  o.querySelector('#tgo').onclick=()=>{o.remove();SFX.whoosh();const bi=NODES[p].findIndex(n=>n.sk=='boss'&&n.wi==wi);G=newG({path:p,node:bi,sk:'test',test:{wi},pool:worldPool(p,wi,10)});next()}}
function makeQ(){if(G.pool)return G.pool.shift();
  {const aq=mastQ();if(aq)return aq} // P1-08: challenge / support / easier question (51-mastery.js)
  if(G.path&&(G.done==3||G.done==7)){const N=NODES[G.path],old=N.filter((n,i)=>i<G.node&&n.sk!='boss'&&passed(G.path,i)&&!(n.sk==G.sk&&n.lv==G.lv));
    if(old.length){const n=pick(old),q=genQ(n.sk,n.lv);q.review=1;return q}}
  const p=P(G.sk),ms=Object.values(p.miss).filter(m=>m.n>0&&m.q&&m.q.lv==G.lv);let q;
  if(ms.length&&Math.random()<.3)q={...pick(ms).q};
  for(let t=0;t<10&&(!q||q.label===G.last);t++)q=genQ(G.sk,G.lv);
  G.last=q.label;return q}
function next(){if(!G||G.dead)return;
  if(G.done<G.n){G.q=makeQ();G.retry=false}
  else if(G.missed.length){G.q=G.missed.shift();G.retry=true}
  else return finish();
  renderQ()}
function fit(){const qa=$('.qarea'),pr=$('#prompt');if(!qa||!pr)return;let k=1;pr.style.setProperty('--k',1);
  while(k>.42&&(qa.scrollHeight>qa.clientHeight+1||pr.scrollWidth>pr.clientWidth+1)){k-=.05;pr.style.setProperty('--k',k)}}
let rsT;addEventListener('resize',()=>{fit();clearTimeout(rsT);rsT=setTimeout(()=>{if($('#map'))drawMap(MAPP)},150)});
function petSay(t){const b=$('#bub');if(!b)return;b.textContent=t;const far=G&&G.done/G.n>.5;b.style.left=far?'auto':'0';b.style.right=far?'0':'auto';b.classList.add('on');clearTimeout(b._t);b._t=setTimeout(()=>b.classList.remove('on'),1400)}
function renderQ(){const q=G.q;G.typed='';G.tries=0;G.built=[];G.lock=false;
  actQStart(q.sk); // P5-05
  const K=KIND[q.kind];
  if(!K)throw new Error('unknown question kind '+q.kind);
  const input=K.render(q);
  const pos=`calc(${G.done/G.n} * (100% - 70px))`;
  view(`<div class="top"><button class="btn sm" id="quit">✕</button>
   ${G.boss?`<div class="bossbar"><span class="bossE" id="bossE">${G.boss.e}<div class="bubble" id="bub"></div></span><div class="hp"><div id="hpf" style="width:${G.hp/7*100}%"></div></div><b id="hpn">${'❤️'.repeat(G.hp)}</b></div>`
    :`<div class="track"><div class="line"></div><div class="chest">${G.test?'⚡':'🎁'}</div><div class="runner ${petAura()}" id="runner" style="left:${pos}">${petHTML()}<div class="bubble" id="bub"></div></div></div>`}
   <div class="streak ${G.streak>=2?'on':''}" id="stk">🔥 ${G.streak}</div><div class="stars" id="starc">⭐ ${G.score}</div></div>
  <div class="play"><div class="qarea">${q.review?'<div class="rtag">🔁 Remember this one?</div>':''}${q.ctx?bankCtx(q.ctx):''}<div class="prompt" id="prompt">${q.html}</div>
  <div class="tools">${q.say?'<button class="btn sm" id="spk">🔊 Hear it</button>':''}<button class="btn sm" id="hb">💡 Help</button></div><div id="hint" class="hint"></div></div>
  <div class="inp">${input}</div></div>`);
  $('#quit').onclick=()=>{G.dead=true;back()};
  if($('#spk'))$('#spk').onclick=e=>say(q.say,e.currentTarget,q.lang=='es'&&q.auto=='must'?'es':null);
  $$('[data-sayes]').forEach(b=>b.onclick=()=>say(b.dataset.sayes,b,'es'));
  $('#hb').onclick=()=>{const h=$('#hint');h.innerHTML=hintHTML(q);h.classList.remove('pop');void h.offsetWidth;h.classList.add('pop');SFX.pop(3);fit();h.scrollIntoView({block:'nearest',behavior:'smooth'})};
  $$('[data-say]').forEach(b=>b.onclick=()=>say(b.dataset.say,b));
  $$('.w').forEach(s=>s.onclick=()=>{say(s.dataset.w);SFX.pop(1)});
  K.bind(q,G,check);
  if(q.review)petSay('Remember this?');
  if(G.retry){fb("Let's try this one again!",'warn');petSay('One more time!')}
  else if(G.done==0)petSay(G.mix?'Tricky mix!':"Let's go!");
  else if(G.done==G.n-1)petSay('Last one!');
  mastShow(q); // P1-08: Challenge tag, hint before the first try, answer clock
  fit();if(document.fonts)document.fonts.ready.then(fit);
  if(q.auto==='must'||(q.auto&&S.voice)||(q.say&&gradeCfg().auto==='all'))setTimeout(()=>say(q.say,null,q.lang=='es'?'es':null),400)}
function addMiss(q){const p=P(q.sk),m=p.miss[q.label]||{n:0,tot:0,q};m.n++;m.tot++;m.q=q;p.miss[q.label]=m;
  const ks=Object.keys(p.miss);if(ks.length>40){ks.sort((a,b)=>p.miss[a].tot-p.miss[b].tot);delete p.miss[ks[0]]}}
const PRAISE=['Great job!','You got it!','Awesome!','Super!','Nice!','Yes!','Way to go!','Brilliant!','Boom! 💥','Nailed it!'];
function check(v,el){if(G.lock)return;const q=G.q,K=KIND[q.kind],p=P(q.sk),ok=K.same?K.same(q,v):String(v)===String(q.ans);
  if(G.tries==0&&!G.retry)mastTry(q,ok); // P1-08: mastery record and in-round adaptation
  const src=el||$('#slot')||$('.lslots')||$('.inp');
  if(ok){G.lock=true;if(el)el.classList.add('right');
    K.right(q);
    actQEnd(G.tries==0&&!G.retry,G.retry); // P5-05
    const first=G.tries==0&&!G.retry;
    if(!G.retry){G.done++;p.t++;if(G.tries==0){G.score++;p.c++}}
    if(G.tries==0&&p.miss[q.label]){if(p.miss[q.label].n>0&&!G.retry)G.fixed=(G.fixed||0)+1;p.miss[q.label].n=Math.max(0,p.miss[q.label].n-1)}
    G.streak=G.tries==0?G.streak+1:0;G.best=Math.max(G.best,G.streak);
    SFX.right(G.streak);
    if(first)setTimeout(()=>flyStar(src),150);
    const r=src.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2);
    const run=$('#runner');if(run){run.style.left=`calc(${G.done/G.n} * (100% - 70px))`;anim(run,'jump')}
    let ko=false;if(G.boss&&!G.retry){G.hp=Math.max(0,G.hp-1);bossHit();if(G.hp==0){ko=true;G.won=true;G.asked=G.done;G.done=G.n;G.missed=[]}}
    const sk=$('#stk');sk.textContent='🔥 '+G.streak;sk.classList.toggle('on',G.streak>=2);if(G.streak>=2)bump(sk);
    let wait=q.after?1900:1200;
    if(ko){wait+=1500;setTimeout(bossKO,500)}
    else if([3,5,8,10].includes(G.streak)){setTimeout(SFX.streak,350);fb(`🔥 ${G.streak} in a row!`);petSay("You're on fire!");
      if(!q.after&&!playClip('cheer')&&S.voice)say(`${G.streak} in a row! ${pick(['Amazing','Wow','Incredible','Super'])}, ${S.name}!`);wait+=300}
    else if(G.boss){fb(pick(['ZAP! ⚡','POW! 💥','BAM! 💫','Zing! ✨']));petSay(pick(['Ouch!','Hey!','Oof!','No fair!']))}
    else{fb(pick(PRAISE));petSay(pick(PET_YAY));if(!q.after&&Math.random()<.3&&playClip('cheer'))wait+=400}
    if(q.after)say(q.after,null,q.afterLang);save();setTimeout(next,wait);return}
  G.tries++;G.streak=0;const sk=$('#stk');sk.classList.remove('on');
  SFX.wrong();anim($('#runner'),'sad');if(G.boss){anim($('#bossE'),'jump');setTimeout(SFX.giggle,250)}const pr=$('#prompt');pr.classList.remove('shake');void pr.offsetWidth;pr.classList.add('shake');
  if(el){el.classList.add('wrong');el.disabled=true}
  if(G.tries==1){addMiss(q);fb('Try again!','warn');petSay(G.boss?pick(['Ha ha! Missed me!','Hee hee!','Try again!']):pick(PET_OOPS));if(Math.random()<.5)setTimeout(()=>playClip('oops'),300);$('#hint').innerHTML=hintHTML(q);fit();
    K.retry(q,G,()=>{$('#hint').innerHTML=hintHTML(q);fit()});
    save();return}
  G.lock=true;
  K.reveal(q);
  if(!G.retry){G.done++;p.t++;if(!G.boss)G.missed.push(q)}
  const run=$('#runner');if(run)run.style.left=`calc(${G.done/G.n} * (100% - 70px))`;
  fb("Here's the answer",'warn');petSay("We'll get it next time!");say(q.after||K.spoken(q),null,q.afterLang);save();setTimeout(next,2600)}

function bossHit(){const b=$('#bossE'),f=$('#hpf'),h=$('#hpn');if(f)f.style.width=G.hp/7*100+'%';if(h)h.textContent='❤️'.repeat(G.hp);
  if(b){b.classList.remove('hit');void b.offsetWidth;b.classList.add('hit');const r=b.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,['💥','⚡','✨'])}SFX.hit()}
function bossKO(){const b=$('#bossE');if(b)b.classList.add('ko');SFX.ko();confetti(40);fb(`You beat ${G.boss.name}! 🏆`);if(S.voice)say(`You beat ${G.boss.name}!`)}
function award(){const s=pick(STK),isNew=!S.stickers[s];S.stickers[s]=(S.stickers[s]||0)+1;return{s,isNew}}
function finish(){
  const g=G,sc=g.score,n=g.n,best=g.best,before=S.stars,d=day(),p=g.path,ni=g.node,nd=p?NODES[p][ni]:null;
  let stars=0,newPass=false,wDone=false;
  let testOk=false,prize=null;
  if(g.test){testOk=sc>=9;if(testOk){NODES[p].forEach((n,i)=>{if(n.wi==g.test.wi&&getSt(p,i)<2)setSt(p,i,2)});newPass=true;
    (S.skip=S.skip||{})[worldId(p,g.test.wi)]=1}} // a tested-out world stays finished even if stops are added to it later
  else if(!g.mix){if(g.boss)stars=g.won?(g.asked<=7?3:g.asked<=8?2:1):0;else{P(g.sk).r++;const ss=Math.min(n,sc+(g.forgive||0));stars=ss>=n?3:ss>=Math.floor(n*.8+.01)?2:ss>=Math.floor(n*.7+.01)?1:0} // P1-08: wrong challenge answers do not cost stars
    const prev=getSt(p,ni);g.prevSt=prev;setSt(p,ni,Math.max(prev,stars));newPass=!prev&&stars>0;
    if(g.boss&&g.won&&!S.owned[nd.prize]){prize=nd.prize;S.owned[prize]=1;S.wear.hat=prize}}
  if(newPass){const wk=nd.wid;if(!S.wdone[wk]&&worldDone(p,nd.wi)){S.wdone[wk]=1;wDone=true}}
  const prizes=[award()];if(sc==n)prizes.push(award());
  actRound(); // P5-05
  d.r++;const stk=streakTick();let mission=false;if(d.r>=3&&!d.done){d.done=true;mission=true;prizes.push(award())}
  if(wDone)prizes.push(award());
  const bonus=(mission?5:0),coins=sc+bonus+(wDone?20:0),prevSt=g.test||g.mix?0:(g.prevSt||0),PT=ptCalc(g,sc,n,stars,prevSt,newPass,testOk,nd),ptSec=PT.sec;ptEarn(ptSec);
  S.stars+=sc+bonus;S.coins+=coins;S.best=Math.max(S.best||0,best);
  const grew=stage(S.stars)>stage(before);save();
  view(`<div class="center" id="fin"><h1>Round complete!</h1><p class="sub">Tap the treasure chest!</p>
   <button class="btn chestbtn" id="chest">🎁</button></div>`);
  setTimeout(SFX.rattle,300);const rt=setInterval(()=>{if(!$('#chest'))return clearInterval(rt);SFX.rattle()},1200);
  let opened=false;
  $('#chest').onclick=()=>{if(opened)return;opened=true;clearInterval(rt);SFX.open();confetti(sc>=7?40:16);const f=$('#fin');
    const nextI=!g.mix&&ni+1<NODES[p].length&&unlocked(p,ni+1)?ni+1:-1;
    f.innerHTML=`<div id="prz"></div><div class="bigstars" id="bs"></div><h1 id="sc" style="margin:0">${sc} out of ${n}${!g.mix&&!g.test?` <span class="nstar" style="font-size:.8em">${'★'.repeat(stars)+'☆'.repeat(3-stars)}</span>`:''}</h1>
     <div class="rowh" id="btns" style="visibility:hidden;margin:10px 0"><button class="btn big" id="bonus" style="background:#ec4899">🎈 Bonus game!</button>
      ${nextI>=0&&newPass?'<button class="btn big" id="nxt">Next stop ▶</button>':'<button class="btn" id="again">Play again</button>'}<button class="btn" id="menu">${g.mix?'🏠 Home':'🗺️ Map'}</button></div><div id="msgs"></div>`;
    const live=()=>f.isConnected;let t=0;
    prizes.forEach(pz=>{setTimeout(()=>{if(!live())return;$('#prz').insertAdjacentHTML('beforeend',`<span class="prize">${pz.s}</span>${pz.isNew?'<span class="newtag">NEW!</span>':''}`);SFX.magic()},t);t+=600});
    for(let i=0;i<sc;i++){setTimeout(()=>{if(!live())return;$('#bs').insertAdjacentHTML('beforeend','<span>⭐</span>');SFX.coin(i)},t);t+=150}
    setTimeout(()=>{if(!live())return;$('#btns').style.visibility='visible';
      $('#bonus').onclick=()=>balloons(g.mix||g.boss||g.test?(p||pick(['math','read','es'])):SK[g.sk].area,g);
      if($('#nxt'))$('#nxt').onclick=()=>{SFX.whoosh();open(p,nextI)};
      if($('#again'))$('#again').onclick=()=>{SFX.whoosh();g.mix?startMix():g.test?testOut(p,g.test.wi):open(p,ni)};$('#menu').onclick=()=>g.mix?home():pathMap(p);
      if(grew)setTimeout(()=>growShow(before),300);else if(!playClip('done')&&S.voice)say(`You got ${sc} stars!`+(newPass?' You unlocked the next stop!':''))},t);
    t+=300;
    const msgs=[[`🎟️ +${fmtM(ptSec)} of game time!<div class="ptlines">${PT.lines.map(([v,l])=>`<span class="${v<0?'neg':''}">${v<0?'−':'+'}${fmtM(Math.abs(v))} ${l}</span>`).join('')}</div>${PT.mast&&nextI>=0?'<div class="pthint">💡 New stops earn way more game time!</div>':PT.rep>=1?'<div class="pthint">💡 Try a different stop to earn more!</div>':''}`,'coin'],[`+${coins} 🪙 coins for the pet shop!`,null]];
    if(best>=3)msgs.push([`🔥 Best streak: ${best} in a row!`,null]);
    if(newPass&&nextI>=0)msgs.push([`🗺️ Next stop unlocked: ${NODES[p][nextI].t}!`,'fanfare']);
    if(wDone)msgs.push([`🌍 You finished ${PATHS[p].worlds[nd.wi].n}! +20 🪙`,'fanfare']);
    if(g.boss)msgs.push(g.won?[`💥 You beat ${g.boss.name}!`,'fanfare']:[`${g.boss.e} ${g.boss.name} got away! Try again, you can beat it!`,null]);
    if(prize)msgs.push([`🎁 New costume for ${petN()}: ${prize}`,'magic']);
    if(g.test)msgs.push(testOk?[`🚀 You tested out of ${PATHS[p].worlds[g.test.wi].n}!`,'fanfare']:['So close! Get 9 right to test out. Or play the stops one by one.',null]);
    if(!g.mix&&!g.test&&!g.boss&&stars==0)msgs.push([`Get ${Math.floor(n*.7+.01)} right to open the next stop. You can do it!`,null]);
    if(mission)msgs.push([`🏆 Daily mission done! +5 bonus stars!`,'fanfare']);
    if(stk.msg)msgs.push([stk.msg,'fanfare']);
    if(g.mix)msgs.push(['🎯 Great practice on the tricky ones!',null]);
    msgs.push([sc>=9?'You are a superstar!':sc>=7?'Fantastic work!':sc>=5?'Good job! Keep practicing!':'Nice try! Practice makes you stronger!',null]);
    msgs.forEach(([m,s])=>{setTimeout(()=>{if(!live())return;$('#msgs').insertAdjacentHTML('beforeend',`<div class="msg">${m}</div>`);if(s)SFX[s]();if(s&&m.startsWith('🌍'))confetti(40)},t);t+=650});
    };
}
function growShow(before){const o=document.createElement('div');o.className='ovl';const hatch=stage(before)==0;
  o.innerHTML=`<div class="grow">${petE(before)}</div><h1>${hatch?'Your egg is hatching!':`Whoa! ${esc(petN())} is growing!`}</h1>`;document.body.appendChild(o);
  hatch?SFX.hatch():SFX.rattle();setTimeout(()=>{if(!o.isConnected)return;SFX.magic();confetti(30);
    o.innerHTML=`<div class="grown ${petAura()}">${petHTML()}</div><h1>${stage()>=4?`${esc(petN())} is a SUPER pet!`:hatch?`Meet ${esc(petN())}!`:`${esc(petN())} grew up!`}</h1><button class="btn big" id="yay">Yay! 🎉</button>`;
    if(S.voice)say(hatch?`Your egg hatched! Meet ${petN()}!`:`Wow! ${petN()} grew!`);
    const y=o.querySelector('#yay');if(y)y.onclick=()=>{o.remove()}},1800)}
/* Error guard hook (called from logErr in 00-core.js): if a round is on screen, show a friendly way home instead of a frozen screen. */
function roundOops(){
  if(!G||G.dead||!$('#prompt')||$('#oops'))return;
  G.dead=true;
  const o=document.createElement('div');o.className='ovl';
  o.innerHTML='<h1>Oops!</h1><button class="btn big" id="oops">Oops, let\'s go home</button>';
  document.body.appendChild(o);
  $('#oops').onclick=()=>{o.remove();home(true)};
}
