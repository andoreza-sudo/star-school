/* ---------- game ---------- */
let G;
const newG=o=>(bankRound(),Object.assign({n:10,done:0,score:0,streak:0,best:0,missed:[],last:null,node:-1,path:null},o));
function start(p,i){const n=NODES[p][i];G=newG({path:p,node:i,sk:n.sk,lv:n.lv,n:gradeCfg().n});
  if(SK[n.sk].round){G.pool=SK[n.sk].round(n.lv);G.n=G.pool.length}
  next()}
// The 10 questions of Tricky Mix / Mixed Practice: up to 7 due review items, then stops the child has reached (never a boss stop)
function mixQs(){const qs=allMiss().slice(0,7).map(revQ).filter(Boolean),pool=[]; // P5-02: rebuilt from review items
  for(const p in NODES)NODES[p].forEach((n,i)=>{if(n.sk!='boss'&&SK[n.sk]&&unlocked(p,i)&&i<=curNode(p))pool.push(n)});
  if(!pool.length)pool.push(NODES.math[0]);
  while(qs.length<10){const n=pick(pool),q=genQ(n.sk,n.lv);qs.push(q)}
  return qs}
function startMix(){G=newG({mix:true,pool:shuffle(mixQs()),sk:'mix'});next()}
const back=()=>G&&G.path?pathMap(G.path):home();
function worldPool(p,wi,k){const ns=NODES[p].filter(n=>n.wi==wi&&n.sk!='boss');return Array.from({length:k},()=>{const n=pick(ns),q=genQ(n.sk,n.lv);return q})}
function bossIntro(p,i){const n=NODES[p][i],[e,name]=n.boss;
  view(RW.bossIn(p,name,e,n.prize)); // P4-11 (18-reward-art.js)
  SFX.rattle();setTimeout(SFX.rattle,500);if(S.voice)say(`Oh no! ${name} appears! Answer questions to zap ${name}!`);
  $('#nope').onclick=()=>pathMap(p);$('#fight').onclick=()=>{SFX.whoosh();G=newG({path:p,node:i,sk:'boss',boss:{e:RW.boss(name,'idle')||e,name},hp:7,pool:worldPool(p,n.wi,10)});next()}}
function testOut(p,wi){const w=PATHS[p].worlds[wi],o=document.createElement('div');o.className='ovl rw-ovl';
  o.innerHTML=`<div class="rw-card" role="dialog" aria-modal="true"><div class="rw-disc">${ico('bolt',52)}</div><h2>Test out of ${esc(w.n)}?</h2>
   <p>10 questions from this whole world. Get <b>9 right</b> and you skip all of its stops!</p><div class="rw-acts">${UI.btn("Let's do it!",{kind:'primary',size:'lg',wide:true,icon:'bolt',id:'tgo'})}${UI.btn('Not now',{kind:'ghost',wide:true,id:'tno'})}</div></div>`;
  document.body.appendChild(o);o.querySelector('#tno').onclick=()=>o.remove();
  o.querySelector('#tgo').onclick=()=>{o.remove();SFX.whoosh();const bi=NODES[p].findIndex(n=>n.sk=='boss'&&n.wi==wi);G=newG({path:p,node:bi,sk:'test',test:{wi},pool:worldPool(p,wi,10)});next()}}
function makeQ(){if(G.pool)return G.pool.shift();
  {const aq=mastQ();if(aq)return aq} // P1-08: challenge / support / easier question (51-mastery.js)
  {const rq=revSlot();if(rq)return rq} // P5-02: a due review item at questions 2, 4, 6, 8 (59-review.js)
  if(G.path&&(G.done==3||G.done==7)){const N=NODES[G.path],old=N.filter((n,i)=>i<G.node&&n.sk!='boss'&&passed(G.path,i)&&!(n.sk==G.sk&&n.lv==G.lv));
    if(old.length){const n=pick(old),q=genQ(n.sk,n.lv);q.review=1;return q}}
  let q;
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
  <div class="tools">${q.say?(q.pk?`<button class="btn pkspk" id="spk" aria-label="Hear it again">${ico('speak',44)}</button>`:'<button class="btn sm" id="spk">🔊 Hear it</button>'):''}<button class="btn sm" id="hb">💡 Help</button></div><div id="hint" class="hint"></div></div>
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
  if(q.auto==='must'||q.pk||(q.auto&&S.voice)||(q.say&&gradeCfg().auto==='all'))setTimeout(()=>say(q.say,null,q.lang=='es'?'es':null),400)}
function addMiss(q){const p=P(q.sk),m=p.miss[q.label]||{tot:0};m.tot=(m.tot||0)+1;m.q={label:q.label};delete m.n;p.miss[q.label]=m; // P5-02: a tally only
  const ks=Object.keys(p.miss);if(ks.length>40){ks.sort((a,b)=>p.miss[a].tot-p.miss[b].tot);delete p.miss[ks[0]]}
  revMiss(q)} // P5-02: the review item (59-review.js)
const PRAISE=['Great job!','You got it!','Awesome!','Super!','Nice!','Yes!','Way to go!','Brilliant!','Boom! 💥','Nailed it!'];
function check(v,el){if(G.lock)return;const q=G.q,K=KIND[q.kind],p=P(q.sk),ok=K.same?K.same(q,v):String(v)===String(q.ans);
  if(G.tries==0&&!G.retry)mastTry(q,ok); // P1-08: mastery record and in-round adaptation
  const src=el||$('#slot')||$('.lslots')||$('.inp');
  if(ok){G.lock=true;if(el)el.classList.add('right');
    K.right(q);
    actQEnd(G.tries==0&&!G.retry,G.retry); // P5-05
    const first=G.tries==0&&!G.retry;
    if(!G.retry){G.done++;p.t++;if(G.tries==0){G.score++;p.c++}}
    if(first&&revRight(q))G.fixed=(G.fixed||0)+1; // P5-02: a due review item moves up a box (59-review.js)
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
  // P4-11: the drawn chest, star rating, earned list and message cards come from RW (18-reward-art.js, 42-rewards.css).
  // The rewards above, the order of the sequence and its sounds are unchanged.
  view(RW.pre());
  setTimeout(SFX.rattle,300);const rt=setInterval(()=>{if(!$('#chest'))return clearInterval(rt);SFX.rattle()},1200);
  let opened=false;
  $('#chest').onclick=()=>{if(opened)return;opened=true;clearInterval(rt);SFX.open();const f=$('#fin');
    const nextI=!g.mix&&ni+1<NODES[p].length&&unlocked(p,ni+1)?ni+1:-1;
    const low=!g.mix&&!g.test&&stars==0;
    const line=sc>=9?'You are a superstar!':sc>=7?'Fantastic work!':sc>=5?'Good job! Keep practicing!':'Nice try! Practice makes you stronger!';
    f.classList.add('rw-open');
    // a low score is met kindly, with the next step right under the score (it was the last message line before)
    const tip=g.test&&!testOk?'So close! Get 9 right to test out. Or play the stops one by one.':!g.mix&&!g.test&&!g.boss&&stars==0?`Get ${Math.floor(n*.7+.01)} right to open the next stop. You can do it!`:'';
    f.innerHTML=RW.done({sc,n,line,tip,rate:g.mix||g.test||!stars?-1:stars,next:nextI>=0&&newPass,again:low||(g.test&&!testOk)?'Try again':'Play again',menu:g.mix?'Home':'Map'});
    RW.burst(f.querySelector('.rw-chest-o'),sc>=7?28:14);
    const live=()=>f.isConnected;let t=0;
    const add=(id,h)=>{const c=$('#'+id);c.insertAdjacentHTML('beforeend',h);return c.lastElementChild};
    prizes.forEach((pz,k)=>{setTimeout(()=>{if(!live())return;$('#prz').insertAdjacentHTML('beforeend',RW.sticker(pz.s,pz.isNew,k));SFX.magic()},t);t+=600});
    for(let i=0;i<sc;i++){setTimeout(()=>{if(!live())return;RW.count(i+1);SFX.coin(i)},t);t+=150}
    setTimeout(()=>{if(!live())return;const d=$('#btns');d.style.visibility='visible';d.classList.add('on');
      $('#bonus').onclick=()=>balloons(g.mix||g.boss||g.test?(p||pick(['math','read','es'])):SK[g.sk].area,g);
      if($('#nxt'))$('#nxt').onclick=()=>{SFX.whoosh();open(p,nextI)};
      if($('#again'))$('#again').onclick=()=>{SFX.whoosh();g.mix?(g.daily?startReview():startMix()):g.test?testOut(p,g.test.wi):open(p,ni)};$('#menu').onclick=()=>g.mix?home():pathMap(p);
      if(grew)setTimeout(()=>growShow(before),300);else if(!playClip('done')&&S.voice)say(`You got ${sc} stars!`+(newPass?' You unlocked the next stop!':''))},t);
    t+=300;
    // what the child earned (game time with its reasons, coins), then one card per message: [where, html, sound, burst]
    const why=`<ul class="rw-pl">${PT.lines.map(([v,l])=>`<li${v<0?' class="neg"':''}>${ico(v<0?'replay':RW.ptIcon(l),18)}<span>${v<0?'−':'+'}${fmtM(Math.abs(v))} ${esc(l)}</span></li>`).join('')}</ul>`+
      (PT.mast&&nextI>=0?`<div class="rw-ph">${ico('hint',20)}<span>New stops earn way more game time!</span></div>`:PT.rep>=1?`<div class="rw-ph">${ico('hint',20)}<span>Try a different stop to earn more!</span></div>`:'');
    const msgs=[['earn',RW.row('ticket','ticket',`+${fmtM(ptSec)} of game time!${why}`),'coin'],['earn',RW.row('coin','coin',`+${coins} coins for the pet shop!`),null]];
    const M=(art,h,s,kind,x)=>msgs.push(['msgs',RW.msg(art,h,kind),s,x]);
    if(best>=3)M('flame',`Best streak: ${best} in a row!`,null);
    if(newPass&&nextI>=0)M('map',`Next stop unlocked: ${esc(NODES[p][nextI].t)}!`,'fanfare','win');
    if(wDone)M('trophy',`You finished ${esc(PATHS[p].worlds[nd.wi].n)}! +20 coins`,'fanfare','win',1);
    if(g.boss){const nm=esc(g.boss.name);g.won?M(RW.boss(g.boss.name,'hit')||'crown',`You beat ${nm}!`,'fanfare','win boss'):M(RW.boss(g.boss.name)||'heart',`${nm} got away! Try again, you can beat it!`,null,'boss')}
    if(prize)M('gift',`New costume for ${esc(petN())}: ${RW.badge(prize)}`,'magic','win');
    if(g.test&&testOk)M('bolt',`You tested out of ${esc(PATHS[p].worlds[g.test.wi].n)}!`,'fanfare','win');
    if(mission)M('calendar','Daily mission done! +5 bonus stars!','fanfare','win');
    if(stk.msg)M('flame',esc(RW.clean(stk.msg)),'fanfare','win');
    if(g.mix)M('target','Great practice on the tricky ones!',null);
    msgs.forEach(([to,h,s,x])=>{setTimeout(()=>{if(!live())return;const e=add(to,h);if(s)SFX[s]();if(x)RW.burst(e,28)},t);t+=650});
    };
}
function growShow(before){const o=document.createElement('div');o.className='ovl rw-ovl';const hatch=stage(before)==0;
  o.innerHTML=`<div class="rw-card rw-growc">${RW.rays()}<div class="grow">${petArt(before)}</div><h1>${hatch?'Your egg is hatching!':`Whoa! ${esc(petN())} is growing!`}</h1></div>`;document.body.appendChild(o);
  hatch?SFX.hatch():SFX.rattle();setTimeout(()=>{if(!o.isConnected)return;SFX.magic();
    o.innerHTML=`<div class="rw-card rw-growc rw-again">${RW.rays()}<div class="grown ${petAura()}">${petHTML()}</div><h1>${stage()>=4?`${esc(petN())} is a SUPER pet!`:hatch?`Meet ${esc(petN())}!`:`${esc(petN())} grew up!`}</h1>`+
      `<div class="rw-acts">${UI.btn('Yay!',{kind:'primary',size:'lg',wide:true,icon:'star',id:'yay'})}</div></div>`;
    RW.burst(o.querySelector('.rw-card'),30);
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
