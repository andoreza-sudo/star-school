/* Grade picker (setup and Grown-ups): 8 big buttons, one per grade. Tapping reads the grade aloud and calls onPick(g). */
function gradePickHTML(sel){
  return`<div class="grades" role="radiogroup" aria-label="Grade">${GRADES.map(g=>`<button class="btn gr ${g==sel?'sel':''}" role="radio" aria-checked="${g==sel}" data-g="${g}">${gradeLabel(g)}</button>`).join('')}</div>`}
function gradePickBind(onPick){
  $$('.gr').forEach(b=>b.onclick=()=>{const g=+b.dataset.g;
    $$('.gr').forEach(x=>{x.classList.toggle('sel',x==b);x.setAttribute('aria-checked',x==b)});
    say(gradeSpoken(g),b);SFX.pop(1);onPick(g)})}
function setup(){let pet=S.pet,grade=gradeOf();
  view(`<div class="center setup"><h1>⭐ Star School</h1>
  <div class="card"><div class="sub" style="margin-bottom:8px">What's your name?</div><input class="name" id="nm" value="${esc(S.name)}" placeholder="Your name"></div>
  <div class="card"><div class="sub" style="margin-bottom:8px">Pick a pet egg to hatch!</div>
   <div class="pets">${Object.entries(PETS).map(([k,p])=>`<button class="btn petopt ${k==pet?'sel':''}" data-p="${k}"><span>${p.s[3]}</span>${p.n}</button>`).join('')}</div>
   <input class="name" id="pn" style="margin-top:12px;width:100%" value="${esc(S.petName)}" placeholder="Name your pet (${PETS[pet].def})"></div>
  <div class="card"><div class="sub" style="margin-bottom:8px">What grade? <span class="small">(Grown-ups can change this later)</span></div>${gradePickHTML(grade)}</div>
  <button class="btn big" id="go">Let's go! 🚀</button></div>`);
  gradePickBind(g=>{grade=g});
  $$('.petopt').forEach(b=>b.onclick=()=>{pet=b.dataset.p;$$('.petopt').forEach(x=>x.classList.toggle('sel',x==b));$('#pn').placeholder=`Name your pet (${PETS[pet].def})`;SFX.giggle();anim(b.querySelector('span'),'jump')});
  $('#go').onclick=()=>{const n=$('#nm').value.trim();if(!n){fb('Type your name first!','warn');SFX.wrong();return}
    S.name=n;S.pet=pet;S.petName=$('#pn').value.trim();setGrade(grade);SFX.magic();home(true)}}

function home(first){
  if(!S.name)return setup();
  const st=stage(),nextG=GROW[st+1],pn=esc(petN()),d=day(),sc=sceneOf(),tricky=allMiss().length,cr=careTick(),needs=Math.min(cr.food,cr.clean,cr.fun)<30;
  const growTxt=nextG==null?`${pn} is a SUPER pet! ✨`:st==0?`${nextG-S.stars} more ⭐ to hatch your egg!`:`${nextG-S.stars} more ⭐ until ${pn} grows!`;
  const pct=nextG==null?100:Math.round((S.stars-GROW[st])/(nextG-GROW[st])*100);
  view(`<div class="top"><div class="title">⭐ Star School</div><div class="sp"></div>${installEvt&&!isApp()?'<button class="btn sm" id="inst" style="background:#3b82f6;color:#fff">📲 Install</button>':''}
   <button class="btn sm" id="snd">${S.sound?'🔊':'🔇'}</button><button class="btn sm" id="gear">⚙️</button></div>
  <div class="scroll" id="hs">
   <div class="hero ${sc[0]=='space'?'dark':''}" style="background:${sc[3]}"><div style="position:relative"><div class="petbig ${petAura()}" id="pet">${petHTML()}</div>${needs?`<div class="thought">${cr.food<30?'🍖':cr.clean<30?'🛁':'🎾'}?</div>`:''}</div>
    <div class="hinfo"><div class="hname">${esc(S.name)} & ${pn}</div>
     <div class="rowh" style="justify-content:flex-start;gap:6px;margin:4px 0"><div class="stars" id="starc">⭐ ${S.stars}</div><div class="stars">${ico('coin','1.2em','ic-coin')} ${S.coins}</div><button class="stc-chip ${STRK.count()?'':'off'}" id="stkb" aria-label="Streak calendar"><span class="stc-fl">${ico('flame','1.2em')}</span>${STRK.count()}</button></div>
     <div class="meter"><div style="width:${pct}%"></div></div><div class="htxt">${growTxt}</div>
     <div class="meter m"><div style="width:${Math.min(d.r,3)/3*100}%"></div></div><div class="htxt">${d.done?"🏆 Today's mission done!":`🎯 Mission: finish 3 rounds today (${d.r}/3)`}</div></div></div>
   ${placeBanner()}${revCard()}<h2 style="margin:14px 4px 8px">Pick a game!</h2>
   <div class="games">${Object.entries(PATHS).map(([k,P])=>{const N=NODES[k],np=N.filter((n,i)=>passed(k,i)).length,done=np==N.length;
     return`<button class="btn game" data-p="${k}" style="background:${P.c}"><span class="ge">${P.e}</span><span class="gi"><span class="gt">${P.n}</span>
      <span class="meter"><span style="display:block;height:100%;width:${np/N.length*100}%;background:linear-gradient(90deg,#f59e0b,#ef4444);border-radius:9px"></span></span>
      <span class="small">${done?'🏆 All done! Play any stop.':np?`${np}/${N.length} stops · Next: ${esc(N[curNode(k)].t)}`:`${N.length} stops · Start here!`}</span></span><span class="go">▶</span></button>`}).join('')}</div>
   <button class="btn game" id="groom" style="background:linear-gradient(135deg,#fed7aa,#fca5a5);margin-top:12px;width:100%"><span class="ge">🎮</span><span class="gi"><span class="gt">Game Room</span><span class="small">${ptLeft()>0?`🎟️ ${fmtT(ptLeft())} of game time to spend!`:'Finish learning rounds to earn game time'}</span></span><span class="go">${ptLeft()>0?'▶':'🔒'}</span></button>
   <div class="actions"><button class="btn act mix" id="mix"><span>🎯</span>Mixed Practice</button>
    <button class="btn act" id="race" style="background:#fef3c7"><span>⚡</span>Speed Race</button><button class="btn act" id="flu" style="background:#dbeafe"><span>🔢</span>Fact Sprint</button><button class="btn act" id="care" style="position:relative"><span>🐾</span>Pet Care${needs?'<i class="dot">!</i>':''}</button>
    <button class="btn act" id="shop"><span>🛍️</span>Pet Shop</button><button class="btn act" id="book"><span>📒</span>Stickers</button></div></div>`);
  music(true);
  const pet=$('#pet');pet.onclick=()=>{anim(pet,'jump');SFX.giggle();const r=pet.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,['💖','✨','⭐']);
    if(S.voice)say(pick(stage()==0?['Crack crack! Earn stars to hatch me!','I am almost ready to hatch!']:[`Hi ${S.name}!`,`Let's go on an adventure!`,`I love stars!`,`You're my best friend!`,`Pick a game!`]))};
  $$('.game').forEach(b=>b.onclick=()=>{SFX.whoosh();pathMap(b.dataset.p)});
  placeBannerBind();revCardBind();
  $('#snd').onclick=()=>{S.sound=!S.sound;S.music=S.sound;save();home()};
  $('#stkb').onclick=()=>{SFX.whoosh();streakCal(0)};
  $('#book').onclick=book;$('#shop').onclick=shop;$('#mix').onclick=()=>{SFX.whoosh();startMix()};$('#race').onclick=raceMenu;$('#flu').onclick=()=>{SFX.whoosh();fluMenu()};$('#care').onclick=care;$('#groom').onclick=()=>{SFX.whoosh();gameRoom()};
  if($('#inst'))$('#inst').onclick=async()=>{try{installEvt.prompt();await installEvt.userChoice}catch(e){}installEvt=null;home()};
  let t;const g=$('#gear');g.onpointerdown=()=>{t=setTimeout(grown,1200)};g.onpointerup=g.onpointerleave=()=>clearTimeout(t);g.onclick=()=>fb('Grown-ups: hold it','warn');
  {const sc=$('.scroll');if(sc)sc.insertAdjacentHTML('beforeend','<p class="small" style="text-align:center;opacity:.55;margin:14px 0 4px">Star School __VER__</p>')}
  if(first&&S.voice)setTimeout(()=>say(`Hi ${S.name}! Pick a game!`),400)}

let MAPP='math',MAPW={}; // MAPW[path] = the world picked in the strip (this session only, not saved)
/* Map of a path (P1-05: long maps). A strip of world chips, grouped by grade, sits above the map; the map draws only the picked
   world and its two neighbours, so it stays fast with 16 worlds and 150 stops. pathMap(p) opens on the world the child is in
   (or the one they just played); pathMap(p, wi) opens on world wi. */
function pathMap(p,wi){MAPP=p;const P=PATHS[p];
  const last=G&&G.path==p&&G.node>=0&&NODES[p][G.node]?G.node:-1;
  MAPW[p]=wi!=null?wi:last>=0?NODES[p][last].wi:curWorld(p);
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title">${P.e} ${P.n}</div><div class="sp"></div><div class="stars">⭐ ${S.stars}</div></div>
  <div class="wstrip" id="wstrip" aria-label="Worlds"></div>
  <div class="scroll" id="ms"><div class="map" id="map"></div></div>`);
  $('#back').onclick=()=>home();drawMap(p);music(true);
  if(wi!=null)return mapTop(p);
  const c=$('.node.cur')||$(`.node[data-n="${last>=0?last:curNode(p)}"]`);if(c)c.scrollIntoView({block:'center'})}
/* Pick a world from the strip or a "more worlds" button: redraw in place (no new screen, music keeps playing). */
function mapGo(p,wi){if(!$('#map'))return pathMap(p,wi);SFX.click();MAPW[p]=wi;drawMap(p);mapTop(p)}
function mapTop(p){const t=$(`.wtitle[data-w="${MAPW[p]}"]`);if(t)t.scrollIntoView({block:"start"})}
function worldStrip(p){
  const ws=PATHS[p].worlds,cw=curWorld(p);let h='',lastG=null;
  ws.forEach((w,wi)=>{
    if(!PATHS[p].byLevel&&w.g!==lastG){lastG=w.g;h+=`<span class="wgl">${gradeLabel(w.g)}</span>`}
    const open=worldOpen(p,wi),done=worldFinished(p,wi),sel=wi==MAPW[p];
    h+=`<button class="wchip${sel?' on':''}${done?' done':''}${open?'':' lock'}${wi==cw?' cur':''}" data-w="${wi}" aria-pressed="${sel}"`
      +` aria-label="${esc(w.n)}${done?', done':open?'':', locked'}"><span class="we">${w.e}</span>${esc(w.n)}`
      +`${done?ico('check',18):open?'':ico('lock',18)}</button>`;
  });
  return h;
}
function drawMap(p){const m=$('#map');if(!m)return;const N=NODES[p],ws=PATHS[p].worlds,W=m.clientWidth||360,amp=Math.min(W*.3,200),pts=[];
  const sel=Math.min(Math.max(MAPW[p]|0,0),ws.length-1),w0=Math.max(0,sel-1),w1=Math.min(ws.length-1,sel+1);MAPW[p]=sel;
  const st=$('#wstrip');if(st){st.innerHTML=worldStrip(p);$$('.wchip').forEach(b=>b.onclick=()=>mapGo(p,+b.dataset.w));
    const on=st.querySelector('.wchip.on');if(on)st.scrollLeft=Math.max(0,on.offsetLeft-(st.clientWidth-on.offsetWidth)/2)}
  let y=10,bands='';
  const more=(wi,up)=>`<button class="btn wmore" data-w="${wi}" style="top:${y}px">${ico(up?'back':'go',20)}<span class="we">${ws[wi].e}</span>${esc(ws[wi].n)}</button>`;
  if(w0>0){bands+=more(w0-1,true);y+=72}
  for(let wi=w0;wi<=w1;wi++){const w=ws[wi],y0=y,[a,b]=WR[p][wi],canTest=worldOpen(p,wi)&&!worldFinished(p,wi);y+=canTest?132:86;
    for(let i=a;i<=b;i++){pts.push([W/2+Math.sin(i*1.15)*amp,y,i]);y+=106}
    bands+=`<div class="wband" style="top:${y0}px;height:${y-y0-24}px;background:${w.c}"></div><div class="wtitle" data-w="${wi}" style="top:${y0+14}px">${w.e} ${w.n}${worldFinished(p,wi)?' ✅':''}</div>${canTest?`<button class="btn xs tobtn" data-w="${wi}" style="top:${y0+58}px">⚡ Already know it? Test out!</button>`:''}`;y+=4}
  let path='';pts.forEach(([x,yy],k)=>{if(!k)path=`M${x} ${yy}`;else{const[px,py]=pts[k-1];path+=` C${px} ${py+55} ${x} ${yy-55} ${x} ${yy}`}});
  const cur=curNode(p),allDone=N.every((n,i)=>passed(p,i)),end=w1==ws.length-1;
  const nodes=pts.map(([x,yy,i])=>{const n=N[i],s=nInfo(n),st=getSt(p,i),lk=!unlocked(p,i);
    return`<button class="btn node ${s.area} ${lk?'lock':''} ${st?'done':''} ${i==cur&&!lk&&!allDone?'cur':''}" data-n="${i}" style="left:${x}px;top:${yy}px">${lk?'🔒':s.e}</button>${stopNew(p,i)?`<div class="nnew" style="left:${x}px;top:${yy-50}px">NEW</div>`:''}<div class="nlab" style="left:${x}px;top:${yy+42}px">${esc(n.t)}<div class="nstar">${st?'★'.repeat(st)+'☆'.repeat(3-st):''}</div></div>`}).join('');
  const cp=pts.find(q=>q[2]==cur),side=cp&&cp[0]>W/2?-66:66;
  let tail=end&&allDone?90:20;
  if(!end){y+=8;bands+=more(w1+1,false);tail=80}
  m.style.height=(y+tail)+'px';
  m.innerHTML=bands+`<svg width="${W}" height="${y+20}"><path d="${path}" fill="none" stroke="#d6c7a8" stroke-width="16" stroke-linecap="round"/><path d="${path}" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="8 10"/></svg>`+nodes
    +(cp?`<div class="mappet ${petAura()}" style="left:${cp[0]+side}px;top:${cp[1]+18}px">${petHTML()}</div>`:'')+(end&&allDone?`<div class="wtitle" style="top:${y+10}px;font-size:24px">🏆 ${PATHS[p].n} Champion! 🏆</div>`:'');
  $$('.node').forEach(b=>b.onclick=()=>{const i=+b.dataset.n;if(!unlocked(p,i)){SFX.wrong();anim(b,'sad');fb('Finish the stop before this one!','warn');return}SFX.whoosh();
    open(p,i)});
  $$('.tobtn').forEach(b=>b.onclick=()=>testOut(p,+b.dataset.w));
  $$('.wmore').forEach(b=>b.onclick=()=>mapGo(p,+b.dataset.w))}
function open(p,i){const n=NODES[p][i];if(n.sk=='boss')bossIntro(p,i);else if(n.sk.startsWith('es_')&&n.sk!='es_mix'&&n.lv==1)learn(p,i);else start(p,i)}

function learn(p,i){const n=NODES[p][i],items=SPN[n.sk.slice(3)];
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title">Let's learn!</div><div class="sp"></div><button class="btn big" id="go" style="font-size:20px;padding:10px 18px">¡Vamos! ▶</button></div>
  <div class="scroll"><p class="sub" style="text-align:center">Tap each card to hear it in English, then Spanish. Then tap ¡Vamos!</p>
  <div class="lgrid">${items.map(it=>`<button class="btn lcard" data-es="${esc(it[0])}" data-en="${esc(it[1])}"><span class="lp">${picHTML(it,false)}</span><b>${esc(it[0])}</b><small>${esc(it[1])}</small></button>`).join('')}</div></div>`);
  $('#back').onclick=()=>pathMap(p);$('#go').onclick=()=>{SFX.whoosh();start(p,i)};
  $$('.lcard').forEach(b=>b.onclick=()=>{say(b.dataset.en,b);say(b.dataset.es,null,'es',1);anim(b,'jump');b.classList.add('heard');
    if($$('.lcard').every(x=>x.classList.contains('heard'))){bump('#go');fb('¡Muy bien! Tap ¡Vamos!')}});
  if(S.voice)setTimeout(()=>say('Tap each card to hear it in English and Spanish!'),300)}

function book(){const have=STK.filter(s=>S.stickers[s]).length;
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title">📒 My Stickers</div><div class="sp"></div><div class="stars">${have} / ${STK.length}</div></div>
  <div class="scroll"><p class="sub" style="text-align:center">Finish a round to win a sticker! Get 10 out of 10 for a bonus one.</p>
  <div class="sgrid">${STK.map(s=>S.stickers[s]?`<button class="btn st" data-s="${s}">${s}${S.stickers[s]>1?`<b>×${S.stickers[s]}</b>`:''}</button>`:`<div class="st no">❔</div>`).join('')}</div></div>`);
  $('#back').onclick=()=>home(true);
  $$('.st[data-s]').forEach(b=>b.onclick=()=>{anim(b,'jump');SFX.pop(R(0,5));const r=b.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,[b.dataset.s])})}

