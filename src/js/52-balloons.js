/* ---------- balloon pop bonus game ---------- */
let BL=null;
function stopBalloons(){if(BL){cancelAnimationFrame(BL.raf);clearInterval(BL.tick);BL=null}}
const FAM={at:['cat','bat','hat','mat','rat','sat'],ig:['pig','big','dig','wig','fig'],un:['sun','bun','run','fun'],op:['hop','top','mop','pop'],en:['hen','ten','pen','men'],ug:['bug','hug','rug','mug']};
function balloonRule(area){if(area=='boss'||area=='test')area='math';
  if(area=='math'){const r=pick(['even','odd','sum','big']);
    if(r=='even'||r=='odd')return{txt:`Pop the ${r.toUpperCase()} numbers!`,say:`Pop the ${r} numbers!`,gen:()=>{const n=R(1,30);return[n,r=='even'?n%2==0:n%2==1]}};
    if(r=='sum'){const a=R(2,9),b=R(1,9),t=a+b;return{txt:`Pop every ${t}!  (${a} + ${b})`,say:`Pop every balloon that equals ${a} plus ${b}!`,gen:()=>{const n=Math.random()<.45?t:pick([t-2,t-1,t+1,t+2,R(2,18)].filter(x=>x!=t&&x>=0));return[n,n==t]}}}
    const x=pick([10,20,50]);return{txt:`Pop numbers BIGGER than ${x}!`,say:`Pop the numbers bigger than ${x}!`,gen:()=>{const n=R(Math.max(0,x-15),x+30);return[n==x?n+1:n,(n==x?n+1:n)>x]}}}
  if(area=='es'){if(Math.random()<.5){const cs=SPN.color.slice(0,6),c=pick(cs);
      return{txt:`Pop the “${c[0]}” balloons!`,es:c[0],say:`Pop the ${c[0]} balloons!`,gen:()=>{const x=Math.random()<.45?c:pick(cs.filter(y=>y!==c));return['',x===c,x[2].slice(2)]}}}
    const it=pick(SPN.num);return{txt:`Pop every “${it[0]}”!`,es:it[0],say:`Pop every ${it[0]}!`,gen:()=>{const x=Math.random()<.45?it:pick(SPN.num.filter(y=>y!==it));return[x[2].slice(2),x===it]}}}
  if(Math.random()<.5){const f=pick(Object.keys(FAM)),others=Object.keys(FAM).filter(k=>k!=f);
    return{txt:`Pop words that rhyme with “${FAM[f][0]}”!`,say:`Pop the words that rhyme with ${FAM[f][0]}!`,gen:()=>Math.random()<.45?[pick(FAM[f]),true]:[pick(FAM[pick(others)]),false]}}
  const L=DOL[R(0,1)],w=pick(L);return{txt:`Pop every “${w}”!`,say:`Pop every balloon that says ${w}!`,gen:()=>Math.random()<.45?[w,true]:[pick(L.filter(x=>x!=w)),false]}}
function balloons(area,g){const rule=balloonRule(area);let popped=0,left=30;
  // P4-18: drawn top bar, rule speaker and end card (the balloons themselves are the game's own)
  view(`<div class="top tbar gx-mtop s-play"><div class="ttl gx-ttl"><span class="gx-tb">${ico('balloon',24)}</span><span>Bonus!</span></div>${UI.chip('coin',0,{id:'bpop',aria:'Coins'})}${UI.chip('timer','30',{id:'btime',aria:'Seconds left'})}</div>
   <div class="rule gx-rule" id="rule"><span>${esc(rule.txt)}</span>${ico('sound-on',24)}</div><div class="bfield" id="bf"></div>`);
  const sayRule=()=>{if(rule.es){say(rule.es,null,'es')}else say(rule.say)};
  $('#rule').onclick=sayRule;setTimeout(sayRule,200);
  const bf=$('#bf'),cols=['#ef4444','#f59e0b','#22c55e','#3b82f6','#a855f7','#ec4899','#14b8a6'];let last=0,spawnT=0;
  BL={raf:0,tick:0,list:[]};
  function spawn(){const[lab,ok,col]=rule.gen(),e=document.createElement('button');e.className='bal';e.style.setProperty('--c',col||pick(cols));e.textContent=lab;
    const W=bf.clientWidth;e.style.left=R(4,Math.max(5,W-94))+'px';const b={e,ok,y:bf.clientHeight+10,v:(bf.clientHeight+130)/R(50,75)*10,dead:false};e.style.top=b.y+'px';
    e.onpointerdown=ev=>{ev.preventDefault();if(b.dead)return;
      if(b.ok){b.dead=true;popped++;S.coins++;save();SFX.pop(R(2,6));setTimeout(()=>SFX.coin(R(0,4)),60);const r=e.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,'coin');e.remove();UI.setChip($('#bpop'),popped)}
      else{SFX.wrong();anim(e,'sad')}};
    bf.appendChild(e);BL.list.push(b)}
  function frame(ts){if(!BL)return;const dt=last?Math.min(.05,(ts-last)/1000):0;last=ts;spawnT-=dt;if(spawnT<=0&&left>0){spawn();spawnT=.75}
    BL.list=BL.list.filter(b=>{if(b.dead)return false;b.y-=b.v*dt;b.e.style.top=b.y+'px';if(b.y<-130){b.e.remove();return false}return true});
    BL.raf=requestAnimationFrame(frame)}
  BL.raf=requestAnimationFrame(frame);
  BL.tick=setInterval(()=>{left--;const t=$('#btime b');if(t)t.textContent=left;if(left<=3&&left>0)SFX.tick();
    if(left<=0){stopBalloons();bf.innerHTML='';SFX.fanfare();confetti(24);
      const o=GFX.endCard({icon:'balloon',title:`You popped ${popped}!`,best:'',earn:`${ico('coin',28,'ic-coin')}<span>+${popped} coins</span>`,
        btns:UI.btn(g.mix||!g.path?'Play more':'Keep going',{kind:'primary',size:'lg',wide:true,icon:g.mix||!g.path?'replay':'play',id:'bnext'})+UI.btn(g.path?'Map':'Home',{icon:g.path?'map':'home',wide:true,id:'bhome'})});
      document.body.appendChild(o);if(S.voice)say(`You popped ${popped} balloons!`);
      $('#bhome').onclick=()=>{o.remove();g.path?pathMap(g.path):home()};
      $('#bnext').onclick=()=>{o.remove();if(g.mix||!g.path)return startMix();const p=g.path,i=g.node+1<NODES[p].length&&unlocked(p,g.node+1)&&!passed(p,g.node+1)?g.node+1:g.node;
        if(i==g.node&&g.test)testOut(p,g.test.wi);else open(p,i)}}},1000)}

