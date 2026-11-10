/* ---------- 4x4 hill climb ---------- */
/* truck sound pack */
const ENG={jeep:[46,'sawtooth',0],buggy:[64,'sawtooth',0],monster:[33,'sawtooth',5],bike:[82,'square',0],tractor:[28,'square',9],bus:[37,'sawtooth',3]};
const hs=()=>S.sound&&(S.hcSnd||0)<2;
const HSND={
  scale:[72,74,76,79,81,84,86,88,91,93],
  coin(H){if(!hs())return;const now=H.t;H.cs=(now-(H.csT||-9)<1.2)?(H.cs||0)+1:0;H.csT=now;const m=this.scale[Math.min(H.cs,9)],w=['triangle','sine','square'][(H.cs/4|0)%3];tone(NOTE(m),.07,0,w,.06);tone(NOTE(m+12),.1,.05,'sine',.04)},
  cp(){if(!hs())return;const J=[[[72,0],[76,.1],[79,.2],[84,.3]],[[67,0],[72,.12],[79,.24],[76,.36],[84,.48]],[[84,0],[79,.08],[84,.16],[88,.3]],[[60,0],[64,.1],[67,.2],[72,.3],[76,.4],[79,.5]],[[76,0],[74,.1],[76,.2],[81,.32]]];
    let k;do{k=Math.floor(Math.random()*J.length)}while(k==this.lastJ&&J.length>1);this.lastJ=k;const wv=pick(['square','triangle']);J[k].forEach(([m,t])=>tone(NOTE(m),.18,t,wv,.06));noise(.3,.3,.03,3000,8000)},
  fuel(){if(!hs())return;for(let i=0;i<5;i++)tone(300+i*90+Math.random()*60,.07,i*.07,'sine',.08,200);tone(900,.15,.38,'triangle',.06)},
  crash(water){if(!hs())return;if(water)return;const k=Math.floor(Math.random()*4);
    if(k==0){noise(.35,0,.3,400,1500);tone(160,.25,0,'square',.1,60)}
    else if(k==1){tone(900,.6,0,'sine',.12,150)}
    else if(k==2){noise(.25,0,.25,2000,600);tone(520,.08,.05,'square',.08);tone(390,.08,.15,'square',.08);tone(260,.2,.25,'square',.08)}
    else{tone(140,.12,0,'triangle',.2,60);tone(300,.3,.12,'sine',.12,600);tone(600,.25,.35,'sine',.1,300)}
    if(Math.random()<.35)setTimeout(()=>SFX.giggle(),400)},
  land(v){if(!hs())return;tone(70+Math.random()*30,.18,0,'sine',Math.min(.25,v/2500),35);noise(.12,0,Math.min(.15,v/4000),300,120)},
  trick(mult){if(!hs())return;const b=[72,76,79,84][Math.min(3,mult-1)];[0,4,7,12].forEach((d,i)=>tone(NOTE(b+d),.1,i*.06,'square',.05))},
  shift(){if(!hs())return;tone(220,.05,0,'square',.025,140)},
  amb(st){if(!hs()||Math.random()<.25)return;
    if(st=='meadow'){const n=2+Math.floor(Math.random()*3),f=2200+Math.random()*1200;for(let i=0;i<n;i++)tone(f,.07,i*.11,'sine',.035,f*1.5)}
    else if(st=='jungle'){const f=900+Math.random()*500;tone(f,.12,0,'triangle',.04,f*1.8);tone(f*1.6,.12,.14,'triangle',.04,f*.9);if(Math.random()<.5)tone(500,.2,.35,'sawtooth',.02,700)}
    else if(st=='desert'){tone(2400,.5,0,'sine',.03,1600);noise(1.2,0,.025,300,900)}
    else if(st=='snow'){noise(1.6,0,.035,500,1500)}
    else if(st=='volcano'){noise(1.4,0,.06,60,180);tone(45,1.2,0,'sine',.08,30)}
    else if(st=='city'){const f=pick([330,392,440]);tone(f,.12,0,'square',.03);tone(f*1.26,.18,.15,'square',.03)}
    else if(st=='moon'){[0,1,2].forEach(i=>tone(1200+i*300,.06,i*.1,'sine',.03))}}};
let HC=null;
const PAINTS=[['#ef4444','Red',0],['#3b82f6','Blue',20],['#22c55e','Green',20],['#f59e0b','Orange',20],['#ec4899','Pink',30],['#a855f7','Purple',30],['#111827','Black',40],['#facc15','Gold',60]];
const UPG=[['engine','🔧 Engine','More speed and power'],['tires','🛞 Tires','Grip on hills, mud, sand and ice'],['tank','⛽ Fuel Tank','Drive farther on one tank']];
const UPCOST=[30,60,110,180,280];
const VEH={jeep:{n:'Trail Truck',e:'🛻',cost:0,R:20,L:74,acc:1,maxV:1,grip:1,lift:1,d:'All-around starter'},
  buggy:{n:'Dune Buggy',e:'🏎️',cost:250,R:17,L:70,acc:1.18,maxV:1.22,grip:.92,lift:1.2,d:'Super fast, but flips easily'},
  monster:{n:'Monster Truck',e:'🚙',cost:500,R:27,L:84,acc:.96,maxV:.95,grip:1.3,lift:.82,d:'Huge tires that climb anything'},
  bike:{n:'Dirt Bike',e:'🏍️',cost:350,R:18,L:58,acc:1.3,maxV:1.18,grip:.95,lift:1.55,d:'Wheelie machine! Flips easy'},
  tractor:{n:'Tractor',e:'🚜',cost:300,R:25,L:72,acc:.9,maxV:.78,grip:1.65,lift:.7,d:'Slow, but climbs walls'},
  bus:{n:'School Bus',e:'🚌',cost:450,R:21,L:112,acc:.86,maxV:.92,grip:1.1,lift:.5,d:'Long and steady, hard to flip'}};
const STAGES={
  meadow:{n:'Green Hills',e:'🌄',g:620,need:0,soft:'mud',sky:['#38bdf8','#dbeafe'],dirt:['#b45309','#78350f'],top:['#22c55e','#15803d'],far:'#94a3b8',far2:'#64748b',mid:'#4ade80',water:'#0284c7',prop:'tree',amp:130},
  desert:{n:'Desert Canyon',e:'🏜️',g:620,need:300,soft:'sand',sky:['#fb923c','#fef3c7'],dirt:['#d97706','#9a3412'],top:['#fcd34d','#f59e0b'],far:'#c2410c',far2:'#9a3412',mid:'#fdba74',water:'#0ea5e9',prop:'cactus',amp:120},
  snow:{n:'Snowy Peaks',e:'🏔️',g:620,need:600,soft:'ice',sky:['#7dd3fc','#f1f5f9'],dirt:['#94a3b8','#475569'],top:['#ffffff','#cbd5e1'],far:'#64748b',far2:'#475569',mid:'#e2e8f0',water:'#38bdf8',prop:'pine',amp:140},
  jungle:{n:'Jungle River',e:'🌴',g:620,need:450,soft:'mud',sky:['#22d3ee','#ecfccb'],dirt:['#92400e','#451a03'],top:['#65a30d','#3f6212'],far:'#15803d',far2:'#166534',mid:'#4d7c0f',water:'#0d9488',prop:'palm',amp:150},
  volcano:{n:'Volcano',e:'🌋',g:620,need:750,soft:'ash',lava:1,sky:['#450a0a','#f97316'],dirt:['#44403c','#1c1917'],top:['#57534e','#292524'],far:'#7f1d1d',far2:'#450a0a',mid:'#292524',water:'#f97316',prop:'deadtree',amp:150},
  city:{n:'Junk City',e:'🏙️',g:620,need:1050,soft:'oil',sky:['#6366f1','#fbcfe8'],dirt:['#525252','#262626'],top:['#a3a3a3','#525252'],far:'#4338ca',far2:'#312e81',mid:'#3730a3',water:null,prop:'lamp',amp:125},
  moon:{n:'The Moon',e:'🌙',g:250,tg:430,need:900,soft:null,sky:['#020617','#1e1b4b'],dirt:['#71717a','#3f3f46'],top:['#e4e4e7','#a1a1aa'],far:'#1e293b',far2:'#0f172a',mid:'#334155',water:null,prop:'antenna',amp:120}};
const SOFT={mud:{grip:.38,drag:.996,c:'#422006',c2:'#57341a',label:'MUD'},sand:{grip:.5,drag:.997,c:'#fbbf24',c2:'#f59e0b',label:'SAND'},ice:{grip:.22,drag:1,c:'#bae6fd',c2:'#e0f2fe',label:'ICE'},ash:{grip:.45,drag:.996,c:'#57534e',c2:'#a8a29e',label:'ASH'},oil:{grip:.24,drag:1,c:'#111827',c2:'#4c1d95',label:'OIL'}};
const HCMODES=[['free','🏁','Free Drive','Go as far as you can'],['cargo','📦','Delivery','Carry 3 crates. Land soft or they fall off!'],['coins','🪙','Coin Rush','60 seconds, free gas, grab every bolt'],['night','🌙','Night Drive','Headlights only. Double bolts!']];
const MISSIONS=[['dist',300,'Drive 300 m in one run',40],['dist',600,'Drive 600 m in one run',70],['dist',1000,'Drive 1,000 m in one run',120],['flips',1,'Do a flip',40],['flips',3,'Do 3 flips',90],
  ['bolts',40,'Collect 40 bolts in one run',40],['bolts',90,'Collect 90 bolts in one run',80],['perfect',3,'Land 3 perfect landings',60],['wheelie',1,'Do a 2-second wheelie',50],['air',2,'Get BIG AIR 2 times',50],['stage',1,'Drive 200 m in a new place',60]];
function garageS(){const g=S.garage||(S.garage={});Object.assign(g,Object.assign({bolts:0,up:{engine:0,tires:0,tank:0},paint:'#ef4444',paints:{'#ef4444':1},best:{},veh:'jeep',vehs:{jeep:1},missions:null,mode:'free',rush:{}},g));
  for(const k in STAGES)g.best[k]=g.best[k]||0;
  if(!g.missions||g.missions.length<3){g.missions=g.missions||[];while(g.missions.length<3){const m=pick(MISSIONS.filter(m=>!g.missions.some(x=>x.t==m[2])));g.missions.push({k:m[0],goal:m[1],t:m[2],r:m[3],p:0,done:false})}}return g}
const bestAll=()=>Math.max(...Object.values(garageS().best));
function rng(seed){return()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646}}
let HCLV=null;
const LVN=8,STKEYS=['meadow','desert','snow','jungle','volcano','city','moon'];
function lvDef(st,i){const si=STKEYS.indexOf(st),dist=240+i*105+si*70;return{id:st+i,st,i,si,dist,fx:100+dist*20,amp:Math.min(1.3,.5+i*.1+si*.06),haz:Math.min(.95,.3+i*.09+si*.04),pits:i>=2||si>0,lvf:Math.min(1,(i+si*2)/9),par:Math.round(dist/13)+8}}
function lvS(st){const g=garageS();g.lv=g.lv||{};return g.lv[st]=g.lv[st]||[]}
function lvOpen(st,i){if(i>0)return(lvS(st)[i-1]||0)>0;const si=STKEYS.indexOf(st);return bestAll()>=STAGES[st].need||si==0||(lvS(STKEYS[si-1])[LVN-1]||0)>0}
const FEAT={};
function feats(st){const key=st+(HCLV?'|'+HCLV.id:'');if(FEAT[key])return FEAT[key];const r=rng({meadow:4242,desert:991,snow:3131,moon:777,jungle:5151,volcano:6262,city:7373}[st]+(HCLV?HCLV.i*977+13:0)),out=[],S0=STAGES[st];let x=HCLV?1250:2600;
  while(x<(HCLV?HCLV.fx+3000:400000)){const lv=HCLV?HCLV.lvf:Math.min(1,x/50000),t=r(),cp=(x-100)%2000;
    if(HCLV&&(r()>HCLV.haz||Math.abs(x-HCLV.fx)<500)){x+=480;continue}
    if(cp>1500||cp<300){x+=420;continue}
    if(t<.34){const n=r()<.3+lv*.3?2:1;for(let i=0;i<n;i++)out.push({t:'rock',x:x+i*90,w:46+r()*34,h:18+r()*20*(.6+lv)});x+=520+r()*620}
    else if(t<.58&&S0.soft){const w=340+r()*360;out.push({t:'soft',x,w});x+=w+520+r()*500}
    else if(t<.86){if(HCLV&&!HCLV.pits){x+=300;continue}const w=HCLV?55+r()*25+lv*50:x<16000?55+r()*25:75+r()*40+lv*40;if(cp<900||cp+w>1700||Math.abs(baseH(x,st)-baseH(x-500,st))>55){x+=300;continue}out.push({t:'pit',x,w,d:st=='moon'?150:175});x+=w+900+r()*800}
    else x+=520}
  return FEAT[key]=out}
function featAt(x,st){const F=feats(st);let lo=0,hi=F.length-1;while(lo<hi){const m=(lo+hi+1)>>1;if(F[m].x<=x+200)lo=m;else hi=m-1}return[F[lo-1],F[lo],F[lo+1]].filter(Boolean)}
function baseH(x,st){if(x<350)return 0;const d=x-350,r=Math.min(1,d/500),S0=STAGES[st],A=Math.min(22+d*.0042*(HCLV?2.6:1),S0.amp)*r*(HCLV?HCLV.amp:1);
  if(st=='desert')return A*(Math.sin(d*.0032)*1+Math.sin(d*.0081+1.1)*.35+Math.sin(d*.019+2)*.1*Math.min(1,d/4000));
  if(st=='snow')return A*(Math.sin(d*.0046)*.85+Math.abs(Math.sin(d*.0068+.5))*.5-.25+Math.sin(d*.022+2.1)*.12*Math.min(1,d/4000));
  if(st=='jungle')return A*(Math.sin(d*.0038)*.8+Math.sin(d*.0091+.7)*.5+Math.sin(d*.027+2)*.14*Math.min(1,d/3000));
  if(st=='volcano')return A*(Math.sin(d*.003)*.7+Math.max(0,Math.sin(d*.0016+1))*.7+Math.sin(d*.013+.4)*.3+Math.sin(d*.031)*.1*Math.min(1,d/3000));
  if(st=='city'){const st2=Math.floor(d/260),sm=Math.min(1,(d%260)/60),hh=i=>Math.sin(i*1.7)*.6+Math.sin(i*.37)*.9;return A*(hh(st2-1)+(hh(st2)-hh(st2-1))*(sm*sm*(3-2*sm)))*.75}
  const k=st=='moon'?1.2:1;return A*(Math.sin(d*.0042*k)*.9+Math.sin(d*.0105*k+1.3)*.42+Math.sin(d*.021+2.1)*.12*Math.min(1,d/4000))+(st=='moon'?Math.max(0,Math.sin(d*.0021))*40*r:0)}
function terrH(x,st){let h=baseH(x,st);for(const f of featAt(x,st)){
    if(f.t=='rock'){const u=(x-f.x)/(f.w/2);if(u>-1&&u<1){const c=Math.cos(u*Math.PI/2);h+=f.h*c*Math.sqrt(c)}}
    else if(f.t=='pit'){const b=baseH(f.x,st);if(x>=f.x-170&&x<f.x)h=Math.max(h,b+70*Math.pow((x-f.x+170)/170,2));
      else if(x>=f.x&&x<=f.x+f.w){const e=Math.min(1,(x-f.x)/16,(f.x+f.w-x)/16);h=b-f.d*e}
      else if(x>f.x+f.w&&x<f.x+f.w+90)h=Math.min(h,b+(h-b)*((x-f.x-f.w)/90))}}
  return h}
const softAt=(x,st)=>STAGES[st].soft&&featAt(x,st).some(f=>f.t=='soft'&&x>=f.x&&x<=f.x+f.w)?SOFT[STAGES[st].soft]:null;
const pitAt=(x,st)=>featAt(x,st).find(f=>f.t=='pit'&&x>=f.x&&x<=f.x+f.w);
function fuelX(k,st='meadow'){let x=1500+k*2200+k*k*420;const p=featAt(x,st).find(f=>f.t=='pit'&&x>f.x-200&&x<f.x+f.w+100);return p?p.x+p.w+160:x}

/* textures */
const TEX={};
function texFor(st){if(TEX[st])return TEX[st];const S0=STAGES[st],c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),r=rng(st.length*99);
  x.fillStyle=S0.dirt[0];x.fillRect(0,0,128,128);
  for(let i=0;i<90;i++){x.fillStyle=`rgba(0,0,0,${.05+r()*.12})`;x.beginPath();x.ellipse(r()*128,r()*128,2+r()*6,1.5+r()*4,r()*3,0,7);x.fill()}
  for(let i=0;i<40;i++){x.fillStyle=`rgba(255,255,255,${.05+r()*.1})`;x.beginPath();x.arc(r()*128,r()*128,1+r()*2.5,0,7);x.fill()}
  return TEX[st]=c}

/* garage */
function garage(){const gs=garageS(),left=ptLeft(),v=VEH[gs.veh];
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title">🏁 Hill Climb</div><div class="sp"></div><div class="stars">🔩 ${gs.bolts}</div><div class="stars">🎟️ ${fmtT(left)}</div></div>
  <div class="scroll"><div class="stage" style="background:linear-gradient(180deg,#7dd3fc,#fef3c7)"><canvas id="gcv" width="420" height="230" style="width:min(420px,92vw);height:auto"></canvas><div class="hname">${v.e} ${v.n}</div></div>
  <div class="tipcard"><b>How to drive:</b> ▶ GAS goes, ◀ BRAKE slows and backs up. In the air, GAS tips you back and BRAKE tips you forward. Ease off GAS on steep hills or you'll flip! Flips, wheelies and perfect landings earn bonus bolts.</div>
  <h2>🎯 Missions</h2><div class="games">${gs.missions.map((m,i)=>`<div class="btn game upg mis" style="background:${m.done?'#dcfce7':'#fff'}"><span class="gi"><span class="gt" style="font-size:18px">${m.done?'✅':'🎯'} ${m.t}</span>
    <span class="meter" style="display:block;margin:4px 0;background:#f5f5f4"><span style="display:block;height:100%;width:${Math.min(100,m.p/m.goal*100)}%;background:linear-gradient(90deg,#22c55e,#14b8a6);border-radius:9px"></span></span></span>
    ${m.done?`<button class="btn sm" data-claim="${i}" style="background:#22c55e;color:#fff">Get 🔩${m.r}</button>`:`<b class="small">🔩 ${m.r}</b>`}</div>`).join('')}</div>
  <button class="btn game" id="hclv" style="background:linear-gradient(135deg,#fde68a,#f59e0b)"><span class="ge">🏆</span><span class="gi"><span class="gt">Levels</span><span class="small">${STKEYS.reduce((a,k)=>a+lvS(k).reduce((p,q)=>p+(q||0),0),0)} / ${STKEYS.length*LVN*3} ⭐ · ${STKEYS.length*LVN} tracks with a finish line</span></span><span class="go">▶</span></button>
  <h2>Drive</h2><div class="hcmodes">${HCMODES.map(([k,e,n,d])=>`<button class="btn hcmode ${gs.mode==k?'on':''}" data-mode="${k}"><span>${e}</span><b>${n}</b><small>${d}</small></button>`).join('')}</div><div class="games">${Object.entries(STAGES).map(([k,s])=>{const ok=bestAll()>=s.need;return`<button class="btn game ${ok?'':'soon'}" data-st="${k}" style="background:linear-gradient(135deg,${s.sky[1]},${s.top[0]})">
    <span class="ge">${s.e}</span><span class="gi"><span class="gt">${s.n}</span><span class="small">${ok?(gs.mode=='coins'?`Best rush: 🔩 ${gs.rush[k]||0}`:`Best: ${gs.best[k]} m`):`Drive ${s.need} m anywhere to unlock`}</span></span><span class="go">${ok?(left>0?'▶':'🎟️'):'🔒'}</span></button>`}).join('')}</div>
  <h2>Vehicles</h2><div class="vehs">${Object.entries(VEH).map(([k,V])=>`<button class="btn veh ${gs.veh==k?'on':''}" data-v="${k}"><canvas width="160" height="96" data-vc="${k}"></canvas><b>${V.n}</b><span class="small">${V.d}</span><div>${gs.vehs[k]?(gs.veh==k?'✅ Driving':'Tap to drive'):'🔩 '+V.cost}</div></button>`).join('')}</div>
  <h2>Upgrades</h2><div class="games">${UPG.map(([k,t,d])=>{const lv=gs.up[k],cost=UPCOST[lv];return`<div class="btn game upg" style="background:#fff"><span class="gi"><span class="gt" style="font-size:20px">${t} <span class="lv">${'★'.repeat(lv)}${'☆'.repeat(5-lv)}</span></span><span class="small">${d}</span></span>
    ${lv<5?`<button class="btn sm" data-up="${k}" style="background:${gs.bolts>=cost?'#22c55e':'#e7e5e4'};color:${gs.bolts>=cost?'#fff':'#78716c'}">🔩 ${cost}</button>`:'<b>MAX</b>'}</div>`}).join('')}</div>
  <h2>Paint</h2><div class="paints">${PAINTS.map(([c,n,cost])=>`<button class="btn paint ${gs.paint==c?'on':''}" data-pc="${c}"><span style="background:${c}"></span>${gs.paints[c]?(gs.paint==c?'✅':n):'🔩 '+cost}</button>`).join('')}</div>
  <p class="small" style="text-align:center">Collect 🔩 bolts while you drive. Spend them here.</p></div>`);
  $('#back').onclick=gameRoom;drawTruckPreview();$$('[data-mode]').forEach(b=>b.onclick=()=>{gs.mode=b.dataset.mode;save();SFX.pop(2);const y=$('.scroll').scrollTop;garage();$('.scroll').scrollTop=y});$('#hclv').onclick=()=>{SFX.whoosh();hcLevels(STKEYS.filter(k=>lvOpen(k,0)).pop()||'meadow')};
  $$('[data-vc]').forEach(c=>{const x=c.getContext('2d');x.fillStyle='#16a34a';x.fillRect(0,84,160,12);const V=VEH[c.dataset.vc];drawVehicle(x,c.dataset.vc,80,84-V.R*.62-(V.R+6)*.62,0,.62,gs.paint,0,0,0)});
  $$('[data-st]').forEach(b=>b.onclick=()=>{const s=STAGES[b.dataset.st];if(bestAll()<s.need){SFX.wrong();anim(b,'sad');fb(`Drive ${s.need} m first!`,'warn');return}
    if(ptLeft()<=0){SFX.wrong();fb('🎟️ '+ptWhyNot(),'warn long',3000);return}SFX.whoosh();hcStart(b.dataset.st)});
  $$('[data-v]').forEach(b=>b.onclick=()=>{const k=b.dataset.v,V=VEH[k];if(!gs.vehs[k]){if(gs.bolts<V.cost){SFX.wrong();anim(b,'sad');fb(`Need ${V.cost-gs.bolts} more bolts!`,'warn');return}gs.bolts-=V.cost;gs.vehs[k]=1;SFX.fanfare();confetti(30)}else SFX.pop(2);gs.veh=k;save();garage()});
  $$('[data-claim]').forEach(b=>b.onclick=()=>{const i=+b.dataset.claim,m=gs.missions[i];gs.bolts+=m.r;gs.missions.splice(i,1);garageS();save();SFX.fanfare();confetti(24);fb(`+${m.r} 🔩!`);garage()});
  $$('[data-up]').forEach(b=>b.onclick=()=>{const k=b.dataset.up,cost=UPCOST[gs.up[k]];if(gs.bolts<cost){SFX.wrong();anim(b,'sad');fb(`Need ${cost-gs.bolts} more bolts!`,'warn');return}
    gs.bolts-=cost;gs.up[k]++;save();SFX.fanfare();confetti(16);garage()});
  $$('[data-pc]').forEach(b=>b.onclick=()=>{const c=b.dataset.pc,cost=PAINTS.find(x=>x[0]==c)[2];if(!gs.paints[c]){if(gs.bolts<cost){SFX.wrong();anim(b,'sad');fb(`Need ${cost-gs.bolts} more bolts!`,'warn');return}gs.bolts-=cost;gs.paints[c]=1;SFX.magic()}
    else SFX.pop(2);gs.paint=c;save();garage()})}
function drawTruckPreview(){const cv=$('#gcv');if(!cv)return;const x=cv.getContext('2d'),gs=garageS(),V=VEH[gs.veh];x.clearRect(0,0,420,230);
  const g=x.createLinearGradient(0,196,0,230);g.addColorStop(0,'#22c55e');g.addColorStop(.25,'#a16207');g.addColorStop(1,'#78350f');x.fillStyle=g;x.fillRect(0,196,420,34);
  const sc=1.45;drawVehicle(x,gs.veh,210,196-V.R*sc-(V.R+6)*sc,0,sc,gs.paint,0,0,0)}
function shade(c,p){const n=parseInt(c.slice(1),16),f=v=>Math.max(0,Math.min(255,Math.round(v+(p<0?v*p:(255-v)*p))));return'#'+[n>>16,(n>>8)&255,n&255].map(f).map(v=>v.toString(16).padStart(2,'0')).join('')}
function rr(x,a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
function drawTruck(x,sx,sy,ang,sc,paint,r1,r2){drawVehicle(x,'jeep',sx,sy,ang,sc,paint,r1,r2,0)}
/* vehicle art: origin = body center, wheels at (±L/2, R+6) below */
function drawVehicle(x,type,sx,sy,ang,sc,paint,rot1,rot2,bob){const V=VEH[type],hw=V.L/2,wy=V.R+6;
  x.save();x.translate(sx,sy);x.rotate(-ang);x.scale(sc,sc);x.translate(0,bob||0);
  const gb=x.createLinearGradient(0,-50,0,14);gb.addColorStop(0,shade(paint,.4));gb.addColorStop(.5,paint);gb.addColorStop(1,shade(paint,-.4));const edge=shade(paint,-.55);
  // springs + axle arms
  x.strokeStyle='#52525b';x.lineWidth=3;for(const wx of[-hw,hw]){x.beginPath();x.moveTo(wx*.9,2);for(let i=1;i<=6;i++)x.lineTo(wx*.9+(i%2?4:-4)+(wx-wx*.9)*i/6,2+(wy-2)*i/6);x.stroke()}
  x.strokeStyle='#27272a';x.lineWidth=5;x.beginPath();x.moveTo(-hw,wy-4);x.lineTo(-hw*.4,6);x.lineTo(hw*.4,6);x.lineTo(hw,wy-4);x.stroke();
  if(type=='buggy'){
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2;x.beginPath();x.moveTo(-50,4);x.lineTo(-44,-10);x.lineTo(30,-12);x.lineTo(54,-2);x.lineTo(50,6);x.closePath();x.fill();x.stroke();
    x.strokeStyle='#3f3f46';x.lineWidth=3.5;x.beginPath();x.moveTo(-36,-10);x.lineTo(-24,-40);x.lineTo(8,-40);x.lineTo(24,-12);x.moveTo(-24,-40);x.lineTo(-6,-12);x.stroke();
    x.fillStyle='#fbbf24';x.beginPath();x.arc(-8,-26,9,Math.PI,0);x.fill();x.font='16px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(petE(),-8,-23);
    x.fillStyle='#fff';x.font='bold 11px sans-serif';x.fillText('7',22,-3);x.fillStyle='#fef08a';rr(x,48,-4,6,5,2);x.fill();
    x.fillStyle='#52525b';x.fillRect(-58,-14,10,4);x.fillRect(-54,-14,3,12)}
  else if(type=='monster'){
    x.fillStyle='#3f3f46';rr(x,-48,-4,96,10,3);x.fill();
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2.2;x.beginPath();x.moveTo(-62,-6);x.lineTo(-62,-24);x.quadraticCurveTo(-62,-30,-54,-30);x.lineTo(-26,-30);x.lineTo(-16,-56);x.lineTo(18,-56);x.lineTo(32,-30);x.lineTo(56,-28);x.quadraticCurveTo(64,-26,64,-18);x.lineTo(64,-6);x.closePath();x.fill();x.stroke();
    x.fillStyle='#bae6fd';x.beginPath();x.moveTo(-12,-32);x.lineTo(-6,-51);x.lineTo(14,-51);x.lineTo(25,-32);x.closePath();x.fill();x.fillStyle='#fff7';x.beginPath();x.moveTo(-6,-51);x.lineTo(0,-51);x.lineTo(-7,-33);x.lineTo(-10,-33);x.closePath();x.fill();
    x.fillStyle='#fbbf24';x.beginPath();x.arc(5,-42,9,Math.PI,0);x.fill();x.font='16px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(petE(),5,-39);
    x.fillStyle='#fde047';x.beginPath();x.moveTo(-50,-20);x.lineTo(-36,-26);x.lineTo(-40,-18);x.lineTo(-28,-22);x.lineTo(-44,-12);x.lineTo(-40,-19);x.closePath();x.fill();
    x.fillStyle='#fef08a';rr(x,59,-24,6,7,2);x.fill();x.fillStyle='#e4e4e7';for(let i=0;i<4;i++){x.beginPath();x.arc(-14+i*9,-60,2.4,0,7);x.fill()}}
  else if(type=='bike'){
    x.strokeStyle='#3f3f46';x.lineWidth=4;x.lineCap='round';x.beginPath();x.moveTo(-hw,wy);x.lineTo(-10,-6);x.lineTo(14,-8);x.lineTo(hw,wy);x.moveTo(14,-8);x.lineTo(22,-26);x.lineTo(14,-30);x.stroke();x.lineCap='butt';
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2;x.beginPath();x.moveTo(-22,-6);x.lineTo(-6,-16);x.lineTo(16,-18);x.lineTo(22,-8);x.lineTo(8,0);x.lineTo(-16,2);x.closePath();x.fill();x.stroke();
    x.fillStyle=gb;x.beginPath();x.moveTo(-hw-6,6);x.quadraticCurveTo(-hw,-6,-hw+14,-4);x.lineTo(-hw+8,6);x.closePath();x.fill();x.beginPath();x.moveTo(hw-12,-2);x.quadraticCurveTo(hw,-6,hw+4,6);x.lineTo(hw-6,4);x.closePath();x.fill();
    x.fillStyle='#18181b';rr(x,-24,-20,20,6,3);x.fill();
    x.strokeStyle='#1e3a8a';x.lineWidth=6;x.lineCap='round';x.beginPath();x.moveTo(-12,-20);x.lineTo(-4,-36);x.lineTo(12,-28);x.moveTo(-12,-20);x.lineTo(2,-8);x.stroke();x.lineCap='butt';
    x.fillStyle=paint;x.beginPath();x.arc(-4,-46,11,Math.PI*.9,Math.PI*2.1);x.fill();x.font='15px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(petE(),-3,-43);x.fillStyle='#0f172a';rr(x,0,-52,10,5,2);x.fill();
    x.fillStyle='#fff';rr(x,-18,-14,14,10,2);x.fill();x.fillStyle='#111';x.font='bold 9px sans-serif';x.fillText('1',-11,-9);x.fillStyle='#fef08a';rr(x,22,-28,5,6,2);x.fill()}
  else if(type=='tractor'){
    x.fillStyle='#3f3f46';rr(x,-40,-6,84,8,3);x.fill();
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2;x.beginPath();x.moveTo(-12,-2);x.lineTo(-12,-28);x.lineTo(38,-26);x.quadraticCurveTo(48,-24,48,-14);x.lineTo(48,-2);x.closePath();x.fill();x.stroke();
    x.fillStyle=shade(paint,-.35);for(let i=0;i<4;i++)x.fillRect(16+i*7,-22,3,14);
    x.strokeStyle='#27272a';x.lineWidth=3.5;x.beginPath();x.moveTo(-42,-4);x.lineTo(-42,-64);x.lineTo(-8,-64);x.lineTo(-8,-4);x.stroke();x.fillStyle=shade(paint,-.2);rr(x,-46,-68,42,6,3);x.fill();
    x.fillStyle='#bae6fd99';x.fillRect(-40,-60,30,30);x.fillStyle='#fbbf24';x.beginPath();x.arc(-25,-40,10,Math.PI,0);x.fill();x.font='17px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(petE(),-25,-37);
    x.fillStyle='#52525b';x.fillRect(28,-46,5,20);x.fillStyle='#27272a';x.fillRect(27,-48,7,4);x.fillStyle='#fef08a';rr(x,44,-20,6,7,2);x.fill()}
  else if(type=='bus'){
    const yb=x.createLinearGradient(0,-50,0,8);yb.addColorStop(0,'#fde68a');yb.addColorStop(.5,'#facc15');yb.addColorStop(1,'#ca8a04');x.fillStyle=yb;x.strokeStyle='#713f12';x.lineWidth=2;
    x.beginPath();x.moveTo(-68,6);x.lineTo(-68,-42);x.quadraticCurveTo(-68,-50,-60,-50);x.lineTo(56,-50);x.quadraticCurveTo(64,-50,66,-42);x.lineTo(70,-20);x.lineTo(70,6);x.closePath();x.fill();x.stroke();
    x.fillStyle=paint;x.fillRect(-68,-14,138,5);x.fillStyle='#111';x.fillRect(-68,-4,138,3);
    for(let i=0;i<6;i++){x.fillStyle='#bae6fd';rr(x,-62+i*19,-44,15,16,3);x.fill();x.font='11px sans-serif';x.textAlign='center';x.textBaseline='middle';if(i%2==0)x.fillText(['🙂','😄','😎'][i/2],-54.5+i*19,-34)}
    x.fillStyle='#bae6fd';x.beginPath();x.moveTo(52,-44);x.lineTo(62,-44);x.lineTo(66,-24);x.lineTo(52,-24);x.closePath();x.fill();x.font='15px sans-serif';x.fillText(petE(),58,-32);
    x.fillStyle='#111';x.font='bold 7px sans-serif';x.fillText('SCHOOL BUS',0,-20);x.fillStyle='#fef08a';rr(x,66,-14,5,7,2);x.fill();x.fillStyle='#ef4444';rr(x,-70,-40,4,8,2);x.fill();x.fillStyle='#dc2626';x.fillRect(-72,-30,4,10)}
  else{
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2;
    x.beginPath();x.moveTo(-58,4);x.lineTo(-58,-12);x.quadraticCurveTo(-58,-18,-50,-18);x.lineTo(-24,-18);x.lineTo(-16,-42);x.lineTo(16,-42);x.lineTo(28,-18);x.lineTo(52,-16);x.quadraticCurveTo(60,-14,60,-6);x.lineTo(60,4);x.closePath();x.fill();x.stroke();
    x.fillStyle=shade(paint,-.45);rr(x,-56,-2,114,8,3);x.fill();x.fillStyle='#fff8';rr(x,-48,-15,22,3,1.5);x.fill();rr(x,32,-13,16,3,1.5);x.fill();
    x.fillStyle='#bae6fd';x.beginPath();x.moveTo(-12,-20);x.lineTo(-7,-37);x.lineTo(12,-37);x.lineTo(22,-20);x.closePath();x.fill();x.fillStyle='#fff6';x.beginPath();x.moveTo(-7,-37);x.lineTo(-1,-37);x.lineTo(-8,-21);x.lineTo(-11,-21);x.closePath();x.fill();
    x.fillStyle='#fbbf24';x.beginPath();x.arc(4,-30,9.5,Math.PI,0);x.fill();x.font='17px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(petE(),4,-27);
    x.strokeStyle='#3f3f46';x.lineWidth=3;x.beginPath();x.moveTo(-24,-18);x.lineTo(-16,-46);x.lineTo(16,-46);x.lineTo(28,-18);x.stroke();
    x.fillStyle='#fef08a';rr(x,55,-12,6,7,2);x.fill();x.fillStyle='#ef4444';rr(x,-60,-12,4,7,2);x.fill();x.fillStyle='#71717a';rr(x,-64,-4,10,4,2);x.fill()}
  x.restore();
  wheel(x,sx,sy,ang,sc,-hw,wy,rot1,paint,V.R);wheel(x,sx,sy,ang,sc,hw,wy,rot2,paint,V.R)}
function wheel(x,sx,sy,ang,sc,ox,oy,rot,paint,R=21){const c=Math.cos(-ang),s=Math.sin(-ang),px=sx+(ox*c-oy*s)*sc,py=sy+(ox*s+oy*c)*sc,r=R*sc;
  x.save();x.translate(px,py);x.rotate(rot);
  const tg=x.createRadialGradient(0,0,r*.5,0,0,r);tg.addColorStop(0,'#3f3f46');tg.addColorStop(1,'#18181b');x.fillStyle=tg;x.beginPath();x.arc(0,0,r,0,7);x.fill();
  x.fillStyle='#27272a';const nb=Math.round(R*.7);for(let i=0;i<nb;i++){x.save();x.rotate(i*2*Math.PI/nb);rr(x,-2.8*sc,-r-1.6*sc,5.6*sc,4.6*sc,1.4*sc);x.fill();x.restore()}
  x.fillStyle=paint||'#a8a29e';x.beginPath();x.arc(0,0,r*.5,0,7);x.fill();const hg=x.createRadialGradient(-r*.12,-r*.12,1,0,0,r*.4);hg.addColorStop(0,'#fafafa');hg.addColorStop(1,'#a1a1aa');x.fillStyle=hg;x.beginPath();x.arc(0,0,r*.38,0,7);x.fill();
  x.fillStyle='#52525b';for(let i=0;i<5;i++){x.beginPath();x.arc(Math.cos(i*1.256)*r*.23,Math.sin(i*1.256)*r*.23,1.5*sc,0,7);x.fill()}x.restore()}

function stopHC(){if(!HC)return;cancelAnimationFrame(HC.raf);if(HC.eng){try{HC.eng.lfo&&HC.eng.lfo.stop();HC.eng.o.stop();HC.eng.o2.stop()}catch(e){}}removeEventListener('keydown',HC.kd);removeEventListener('keyup',HC.ku);HC=null}
function hcStart(stage,lvi){HCLV=lvi==null?null:lvDef(stage,lvi);const gs=garageS(),up=gs.up,V=VEH[gs.veh],R=V.R,L=V.L,y0=terrH(100,stage)+R+2;
  view(`<div class="hc" id="hc"><canvas id="hcv"></canvas>
   <div class="hchud"><button class="btn sm" id="hcx">✕</button><div class="hcfuel"><span>⛽</span><div><div id="hcf"></div></div></div>
    <div class="stars" id="hcd">0 m</div><div class="stars" id="hcb">🔩 0</div><div class="stars" id="hct">🎟️ ${fmtT(ptLeft())}</div><button class="btn sm" id="hcsnd">${['🔊','🔉','🔇'][S.hcSnd||0]}</button></div>
   <div class="hcprog"><div id="hcpb"></div><span id="hcbest"></span></div>
   <div class="pedal brake" id="pb">◀<small>BRAKE</small></div><div class="pedal gas" id="pg">▶<small>GAS</small></div><div class="hcmsg" id="hcm"></div><div class="hcpop" id="hcp"></div><div class="hccombo" id="hcc"></div></div>`);
  HC={veh:gs.veh,prevBest:bestAll(),best:gs.best[stage],stage,R,L,acc:(820+up.engine*150)*V.acc,maxV:(420+up.engine*75)*V.maxV,grip:(.9+up.tires*.12)*V.grip,tireUp:up.tires,lift:(5+up.engine*.12)*V.lift*(stage=='moon'?.6:1),tankSec:17+up.tank*9,fuel:100,
    w1:{x:100,y:y0,px:100,py:y0,rot:0,g:true},w2:{x:100+L,y:y0,px:100+L,py:y0,rot:0,g:true},gas:false,brake:false,bolts:0,maxX:100,cp:100,crashT:0,safeT:0,stuckT:0,over:false,
    took:new Set(),camX:140,camY:y0,zoom:1,shake:0,t:0,saveT:0,timeUp:false,graceT:0,parts:[],lastCp:0,raf:0,ptIn:{},air:0,airRot:0,lastAng:0,flips:0,perfect:0,airs:0,wheelieT:0,wheelies:0,crashes:0,wasAir:false,acu:0,slip:0,
    bob:0,bobV:0,combo:0,comboT:0,pops:[],g1t:-1,g2t:-1,fuelK:0,lv:HCLV,lockT:HCLV?2.6:0,mode:HCLV?'free':gs.mode,rushT:60,crates:0};if(HC.mode=='cargo')HC.crates=3;if(HCLV)HC.best=0;
  const cv=$('#hcv'),ctx=cv.getContext('2d'),dpr=Math.min(1.5,devicePixelRatio||1);
  const size=()=>{cv.width=cv.clientWidth*dpr;cv.height=cv.clientHeight*dpr};size();HC.size=size;
  const hc=$('#hc');
  const setP=()=>{const ids=Object.values(HC.ptIn);HC.gas=ids.includes('g');HC.brake=ids.includes('b');$('#pg').classList.toggle('on',HC.gas);$('#pb').classList.toggle('on',HC.brake)};
  hc.addEventListener('pointerdown',e=>{if(!HC||e.target.closest('.hchud'))return;e.preventDefault();HC.ptIn[e.pointerId]=e.clientX>innerWidth/2?'g':'b';setP()});
  const rel=e=>{if(!HC)return;delete HC.ptIn[e.pointerId];setP()};hc.addEventListener('pointerup',rel);hc.addEventListener('pointercancel',rel);hc.addEventListener('pointerleave',rel);
  HC.kd=e=>{if(e.key=='ArrowRight'||e.key=='ArrowUp')HC.gas=true;if(e.key=='ArrowLeft'||e.key=='ArrowDown')HC.brake=true};HC.ku=e=>{if(e.key=='ArrowRight'||e.key=='ArrowUp')HC.gas=false;if(e.key=='ArrowLeft'||e.key=='ArrowDown')HC.brake=false};
  addEventListener('keydown',HC.kd);addEventListener('keyup',HC.ku);
  $('#hcx').onclick=()=>hcEnd('quit');
  $('#hcsnd').onclick=e=>{S.hcSnd=((S.hcSnd||0)+1)%3;save();e.currentTarget.textContent=['🔊','🔉','🔇'][S.hcSnd];hcMsg(['🔊 All sounds on','🔉 Engine off, other sounds on','🔇 Truck sounds off'][S.hcSnd],1400);if(S.hcSnd&&HC.eng){try{HC.eng.g.gain.setTargetAtTime(0,ac().currentTime,.05);HC.eng.lfo.stop();HC.eng.o.stop();HC.eng.o2.stop()}catch(x){}HC.eng=null}};
  if(S.sound&&(S.hcSnd||0)==0){try{const E=ENG[gs.veh]||ENG.jeep,a=ac(),o=a.createOscillator(),o2=a.createOscillator(),f=a.createBiquadFilter(),g=a.createGain(),am=a.createGain(),lfo=a.createOscillator(),lg=a.createGain();o.type=E[1];o2.type='square';f.type='lowpass';f.frequency.value=420;g.gain.value=.02;
    o.connect(f);o2.connect(f);f.connect(am).connect(g).connect(MG);am.gain.value=1;lfo.frequency.value=E[2]||7;lg.gain.value=E[2]?.45:.08;lfo.connect(lg).connect(am.gain);lfo.start();o.frequency.value=E[0];o2.frequency.value=E[0]/2;o.start();o2.start();HC.eng={o,o2,g,f,lfo,base:E[0]}}catch(e){}}
  if(HCLV){const L=HCLV;hcMsg(`${STAGES[stage].e} Level ${L.i+1} · Reach ${L.dist} m`,900);[['3',900],['2',1500],['1',2100],['GO!',2600]].forEach(([t,ms])=>setTimeout(()=>{if(HC&&HC.lv===L){hcMsg(t,t=='GO!'?700:500);t=='GO!'?SFX.fanfare():tone(520,.12,0,'square',.12)}},ms))}else hcMsg(HC.mode=='cargo'?'📦 Deliver the crates! Land softly!':HC.mode=='coins'?'🪙 COIN RUSH! 60 seconds, go go go!':HC.mode=='night'?'🌙 Night drive! Double bolts!':`${STAGES[stage].e} ${STAGES[stage].n} · ${HC.best?'Beat '+HC.best+' m!':'Go go go!'}`,2400);if(S.voice)say(`Let's climb, ${S.name}!`);
  let last=0;const loop=ts=>{if(!HC)return;const dt=last?Math.min(.05,(ts-last)/1000):0;last=ts;
    if(!document.hidden&&!HC.over){HC.acu+=dt;let n=0;while(HC&&!HC.over&&HC.acu>=1/120&&n<8){hcStep(1/120);HC.acu-=1/120;n++}if(HC){HC.acu=Math.min(HC.acu,1/120);if(!HC.over)hcTime(dt)}}
    if(HC){hcDraw(ctx,cv.width,cv.height,dpr);HC.raf=requestAnimationFrame(loop)}};HC.raf=requestAnimationFrame(loop)}
function hcMsg(t,ms=1500){const m=$('#hcm');if(!m)return;m.textContent=t;m.classList.add('on');clearTimeout(m._t);m._t=setTimeout(()=>m.classList.remove('on'),ms)}
function hcPop(t){const m=$('#hcp');if(!m)return;m.textContent=t;m.classList.remove('on');void m.offsetWidth;m.classList.add('on')}
function hcTrick(name,b){const H=HC;H.combo=H.comboT>0?H.combo+1:1;H.comboT=4;const mult=Math.min(4,H.combo),got=b*mult;H.bolts+=got;hcPop(`${name}! +${got} 🔩`);
  const c=$('#hcc');if(c){c.textContent=mult>1?`COMBO x${mult}`:'';c.classList.toggle('on',mult>1)}HSND.trick(mult)}
function hcTime(dt){const H=HC,p=pt();H.t+=dt;H.ambT=(H.ambT??4)-dt;if(H.ambT<=0){H.ambT=5+Math.random()*8;HSND.amb(H.stage)}if(H.mode=='coins'&&!H.over){H.rushT-=dt;if(H.rushT<=0)return hcEnd('rush');if(H.rushT<10&&Math.floor(H.rushT)!=Math.floor(H.rushT+dt))tone(880,.08,0,'square',.1)}
  if(!H.timeUp){p.bank=Math.max(0,p.bank-dt);p.used+=dt;if(ptLeft()<=0){H.timeUp=true;H.graceT=25;hcMsg('⏰ Last run! Game time is up soon.',3000);SFX.rattle()}}
  else{H.graceT-=dt;if(H.graceT<=0)return hcEnd('time')}
  H.saveT+=dt;if(H.saveT>5){H.saveT=0;save()}
  if(H.comboT>0){H.comboT-=dt;if(H.comboT<=0){H.combo=0;const c=$('#hcc');if(c)c.classList.remove('on')}}
  const t=$('#hct');if(t)t.textContent=H.timeUp?`⏰ ${Math.ceil(H.graceT)}s`:`🎟️ ${fmtT(ptLeft())}`}
function rotPts(H,a){const w=[H.w1,H.w2],c=Math.cos(a),s=Math.sin(a),cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2;for(const p of w){const dx=p.x-cx,dy=p.y-cy;p.x=cx+dx*c-dy*s;p.y=cy+dx*s+dy*c}}
function hcStep(dt){const H=HC,st=STAGES[H.stage],R=H.R,L=H.L,w=[H.w1,H.w2];
  H.bobV+=(-H.bob*260-H.bobV*14)*dt;H.bob+=H.bobV*dt;
  if(H.crashT>0){H.crashT-=dt;hcParts(dt);if(H.crashT<=0)hcRespawn();return}
  if(H.lockT>0)H.lockT-=dt;const gas=H.gas&&H.fuel>0&&H.lockT<=0,brk=H.brake||H.lockT>0;
  for(const p of w){const vx=(p.x-p.px)*.9994,vy=(p.y-p.py)*.9994;p.px=p.x;p.py=p.y;p.x+=vx;p.y+=vy-st.g*dt*dt}
  for(let i=0;i<4;i++){const dx=H.w2.x-H.w1.x,dy=H.w2.y-H.w1.y,d=Math.hypot(dx,dy)||1,f=(d-L)/d*.5;H.w1.x+=dx*f;H.w1.y+=dy*f;H.w2.x-=dx*f;H.w2.y-=dy*f}
  let ground=0,landV=0;H.slip=0;
  for(const p of w){let gy=terrH(p.x,H.stage);const was=p.g;p.g=false;
    if(gy+R-p.y>30){const dx=p.x-p.px;p.x=p.px-dx*.3;gy=terrH(p.x,H.stage)}
    if(p.y<gy+R&&gy+R-p.y<=30){const vyIn=(p.y-p.py)/dt;p.y=gy+R;p.g=true;ground++;if(!was){landV=Math.max(landV,-vyIn);if(p===H.w1)H.g1t=H.t;else H.g2t=H.t}
      const s=(terrH(p.x+1,H.stage)-terrH(p.x-1,H.stage))/2,l=Math.hypot(1,s),tx=1/l,ty=s/l,soft=softAt(p.x,H.stage);
      let vt=(p.x-p.px)*tx+(p.y-p.py)*ty;const grip=soft?H.grip*soft.grip/.9+H.tireUp*.03:H.grip,tg=st.tg||st.g,trac=grip*tg*1.5*tx+st.g*Math.max(0,-ty)*1.1,a=Math.min(H.acc,trac)*dt*dt;
      if(gas){vt=Math.min(vt+a,H.maxV*dt*(soft&&soft.drag<1?.6:1));if(H.acc>trac)H.slip+=.5}
      else if(brk)vt=vt>0?Math.max(0,vt-Math.min(H.acc*1.4,trac*1.2)*dt*dt):Math.max(vt-a*.55,-H.maxV*dt*.4);
      else vt*=soft?soft.drag*.999:.997;
      if(soft&&soft.drag<1)vt*=soft.drag;
      p.px=p.x-tx*vt;p.py=p.y-ty*vt;p.rot+=vt/R*(gas&&H.acc>trac?1.6:1)}
    else p.rot+=(p.x-p.px)/R*.99}
  if(landV>200){H.bobV+=Math.min(landV,900)*.06;if(landV>380)HSND.land(landV)}
  if(H.crates&&landV>640&&H.safeT<=0)hcCrate();
  let tq=0;
  if(ground==0){tq=(gas?4.6:0)-(brk?4.6:0);H.air+=dt}
  else{if(gas&&H.w1.g)tq+=H.lift*(H.w2.g?1:.8);if(brk&&H.w2.g)tq-=3.2}
  if(tq)rotPts(H,tq*dt*dt);
  if(ground==0&&!gas&&!brk){const av=Math.atan2(H.w2.y-H.w1.y,H.w2.x-H.w1.x)-Math.atan2(H.w2.py-H.w1.py,H.w2.px-H.w1.px);rotPts(H,-av*.012)}
  const cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2,ang=Math.atan2(H.w2.y-H.w1.y,H.w2.x-H.w1.x);
  let da=ang-H.lastAng;if(da>Math.PI)da-=2*Math.PI;if(da<-Math.PI)da+=2*Math.PI;H.lastAng=ang;
  if(ground==0)H.airRot+=da;
  if(ground==0&&!H.wasAir){const av=ang-Math.atan2(H.w2.py-H.w1.py,H.w2.px-H.w1.px);rotPts(H,-av*.75)}
  const slopeB=Math.atan((baseH(cx+20,H.stage)-baseH(cx-20,H.stage))/40);
  if(ground==2&&H.wasAir){const fl=Math.round(Math.abs(H.airRot)/(2*Math.PI)-.15),airT=H.air;
    if(fl>=1){H.flips+=fl;hcTrick(`${H.airRot>0?'BACKFLIP':'FRONTFLIP'}${fl>1?' x'+fl:''}`,10*fl);if(S.voice)say(H.airRot>0?'Backflip!':'Front flip!')}
    else if(airT>1.1){H.airs++;hcTrick('BIG AIR',Math.min(8,Math.round(airT*2)))}
    if(airT>.6&&Math.abs(H.g1t-H.g2t)<.14&&Math.abs(ang-slopeB)<.2){H.perfect++;setTimeout(()=>{if(HC)hcTrick('PERFECT LANDING',3)},350)}
    if(landV>520)H.shake=.25;H.air=0;H.airRot=0}
  if(ground>0&&!H.wasAir)H.airRot=0;H.wasAir=ground==0;if(ground==2)H.air=0;
  if(H.w1.g&&!H.w2.g&&ang-slopeB>.25){H.wheelieT+=dt;if(H.wheelieT>=2&&H.wheelieT-dt<2){H.wheelies++;hcTrick('WHEELIE',4)}}else H.wheelieT=0;
  const hr=48*(H.R/21)+(H.veh=='monster'?10:0),hx=cx-Math.sin(ang)*hr,hy=cy+Math.cos(ang)*hr,pit=pitAt(cx,H.stage);
  if(H.safeT>0)H.safeT-=dt;
  else if(pit&&cy<baseH(pit.x,H.stage)-pit.d*.5)return hcCrash('pit');
  else if(hy<terrH(hx,H.stage)+5||(Math.abs(ang-slopeB)>2.4&&ground))return hcCrash(pit||pitAt(hx,H.stage)||pitAt(cx+50,H.stage)?'pit':'flip');
  H.fuel=H.mode=='coins'?100:Math.max(0,H.fuel-dt*100/H.tankSec*(gas?1:.25));
  if(cx>H.maxX)H.maxX=cx;
  if(H.lv&&cx>=H.lv.fx)return hcWin();
  if(H.best>20&&!H.passedBest&&(cx-100)/20>H.best){H.passedBest=true;hcPop('🏆 NEW RECORD!');SFX.fanfare();confetti(20)}
  const cpi=Math.floor((cx-100)/2000);if(cpi>H.lastCp){H.lastCp=cpi;H.cp=100+cpi*2000;const cb=5+H.crates*4;H.bolts+=cb;HSND.cp();hcMsg(H.crates?`📦 Delivered ${H.crates} crate${H.crates>1?'s':''}! +${cb} 🔩`:`🚩 ${cpi*100} m! +5 🔩`);if(S.voice&&cpi%2==0)say(`${cpi*100} meters!`)}
  for(let k=H.fuelK;k<H.fuelK+3;k++){const fx=fuelX(k,H.stage);if(fx<cx-60){if(k==H.fuelK)H.fuelK++;continue}if(fx>cx+60)break;if(H.took.has('f'+k))continue;H.took.add('f'+k);H.fuel=100;HSND.fuel();hcPop('⛽ FULL TANK!')}
  const BS=H.mode=='coins'?190:420,BN=H.mode=='coins'?4:3,ci=Math.floor((cx-420)/BS);for(const i of [ci,ci+1]){if(i<0)continue;const bx=420+i*BS;for(let j=0;j<BN;j++){const x=bx+j*26,key=`c${i}_${j}`;if(H.took.has(key))continue;
    const y=terrH(x,H.stage)+R+38+(H.mode=='coins'&&i%4==2?70:0);if(Math.abs(x-cx)<42&&Math.abs(y-cy)<58){H.took.add(key);H.bolts+=(1+Math.floor(i/60))*(H.mode=='night'?2:1);HSND.coin(H);H.pops.push({x,y,l:.7})}}}
  const sp=Math.hypot(H.w1.x-H.w1.px,H.w1.y-H.w1.py)/dt;H.speed=sp;
  if(H.fuel<=0){if(sp<25&&ground)H.stuckT+=dt;else H.stuckT=0;if(H.stuckT>1.4)return hcEnd('fuel')}
  if(H.eng){const t=ac().currentTime,band=H.maxV/4,gear=Math.min(3,Math.floor(sp/band)),inG=Math.min(1,(sp-gear*band)/band);if(gear!=H.gear){if(gear>(H.gear||0))HSND.shift();H.gear=gear}const f=H.eng.base*(1+inG*.9+gear*.12)+(gas?H.eng.base*.25:0)+H.slip*30;H.eng.o.frequency.setTargetAtTime(f,t,.05);H.eng.o2.frequency.setTargetAtTime(f/2,t,.05);H.eng.g.gain.setTargetAtTime(gas?.032:.014,t,.12);H.eng.f.frequency.setTargetAtTime(gas?650+inG*300:340,t,.1)}
  const soft=softAt(H.w1.x,H.stage);
  if(gas&&H.w1.g&&Math.random()<(.25+H.slip*.6)){H.parts.push({x:H.w1.x-14,y:terrH(H.w1.x,H.stage)+6,vx:-60-Math.random()*120,vy:60+Math.random()*120,l:.7,c:soft?soft.c2:st.dirt[0],s:4+Math.random()*4,g:1})}
  if(gas&&Math.random()<.35){H.parts.push({x:cx-Math.cos(ang)*64,y:cy-Math.sin(ang)*64+30,vx:-20,vy:20,l:.8,c:'#78716c',s:6,g:-.2,smoke:1})}
  if(st.soft=='ice'&&H.w1.g&&soft&&Math.random()<.3)H.parts.push({x:H.w1.x,y:terrH(H.w1.x,H.stage)+4,vx:-80*Math.random(),vy:40,l:.5,c:'#fff',s:3,g:.5});
  if(sp>520&&Math.random()<.3)H.parts.push({x:cx+80+Math.random()*200,y:cy+Math.random()*120-30,vx:-sp*.4,vy:0,l:.35,c:'#ffffffaa',s:0,line:1,g:0});
  hcParts(dt)}
function hcParts(dt){const H=HC,g=STAGES[H.stage].g;for(const d of H.parts){d.x+=d.vx*dt;d.y+=d.vy*dt;d.vy-=g*dt*d.g;d.l-=dt}H.parts=H.parts.filter(d=>d.l>0);if(H.parts.length>180)H.parts.splice(0,H.parts.length-180);
  for(const p of H.pops){p.l-=dt;p.y+=60*dt}H.pops=H.pops.filter(p=>p.l>0)}
function hcCrate(){const H=HC;if(!H.crates)return;H.crates--;const cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2;for(let i=0;i<10;i++)H.parts.push({x:cx-20,y:cy+40,vx:(Math.random()-.5)*300,vy:150+Math.random()*250,l:1,c:['#b45309','#92400e','#fbbf24'][i%3],s:4+Math.random()*4,g:1});SFX.hit();
  hcPop(H.crates?`📦 Crate fell off! ${H.crates} left`:'📦 All crates gone!');if(!H.crates)setTimeout(()=>{if(HC===H&&!H.over)hcEnd('cargo')},1300)}
function hcCrash(why){const H=HC;if(H.crates)hcCrate();H.crashT=1.7;H.crashes++;H.shake=.4;H.fuel=Math.max(0,H.fuel-5);H.combo=0;
  const cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2;
  if(why=='pit'&&STAGES[H.stage].water){const lv=STAGES[H.stage].lava;lv?(hs()&&(noise(.5,0,.3,400,100),tone(90,.4,0,'sawtooth',.1,40))):hs()&&SFX.splash();for(let i=0;i<30;i++)H.parts.push({x:cx,y:cy,vx:(Math.random()-.5)*320,vy:150+Math.random()*260,l:1,c:lv?['#f97316','#fde047','#dc2626'][i%3]:'#7dd3fc',s:5+Math.random()*4,g:1})}
  else{HSND.crash();for(let i=0;i<14;i++)H.parts.push({x:cx,y:cy+20,vx:(Math.random()-.5)*260,vy:120+Math.random()*200,l:1,c:'#facc15',s:5,g:.6,star:1})}
  hcMsg(why=='pit'?(STAGES[H.stage].lava?'🔥 HOT HOT HOT! Hit the ramp fast to jump the lava!':STAGES[H.stage].water?'💦 SPLASH! Go fast and use the ramp to jump!':'💫 Into the crater! Go faster to jump!'):`💫 Flipped! Ease off GAS on steep hills.`,1900);
  if(S.voice)say(why=='pit'?'Splash! Go faster to jump!':'Oops! Ease off the gas!')}
function hcRespawn(){const H=HC,R=H.R,x=H.cp,y=terrH(x,H.stage)+R+4,y2=terrH(x+H.L,H.stage)+R+4;Object.assign(H.w1,{x,y,px:x,py:y,g:true});Object.assign(H.w2,{x:x+H.L,y:y2,px:x+H.L,py:y2,g:true});H.stuckT=0;H.safeT=1.2;H.air=0;H.airRot=0;H.wasAir=false;H.lastAng=Math.atan2(y2-y,H.L)}
function hcMissions(H,m){const gs=garageS(),done=[];for(const ms of gs.missions){if(ms.done)continue;
  const run={dist:m,bolts:H.bolts}[ms.k];
  if(run!==undefined)ms.p=Math.max(ms.p,run);else if(ms.k=='stage'){if(H.stage!='meadow'&&m>=200)ms.p=1}else ms.p+=({flips:H.flips,perfect:H.perfect,wheelie:H.wheelies,air:H.airs}[ms.k]||0);
  if(ms.p>=ms.goal){ms.p=ms.goal;ms.done=true;done.push(ms)}}return done}
function hcEnd(why){const H=HC;if(!H||H.over)return;H.over=true;const gs=garageS(),m=Math.floor((H.maxX-100)/20),rec=!H.lv&&(H.mode=='free'||H.mode=='night')&&m>gs.best[H.stage],rrec=H.mode=='coins'&&H.bolts>(gs.rush[H.stage]||0);if(rrec)gs.rush[H.stage]=H.bolts;
  if(rec)gs.best[H.stage]=m;gs.bolts+=H.bolts;const mdone=hcMissions(H,m);save();if(H.eng){try{H.eng.g.gain.setTargetAtTime(0,ac().currentTime,.1)}catch(e){}}
  if(why=='quit'){stopHC();return H.lv?hcLevels(H.stage):garage()}
  if(H.lv)return hcLvFail(H,why,m,mdone);
  (rec&&m>20)||rrec?(SFX.fanfare(),confetti(30)):SFX.magic();
  const unl=Object.entries(STAGES).filter(([k,s])=>H.prevBest<s.need&&bestAll()>=s.need).map(([k,s])=>`${s.e} ${s.n}`);
  const o=document.createElement('div');o.className='ovl';
  o.innerHTML=`<div class="endcard"><div style="font-size:60px">${why=='time'?'⏰':why=='fuel'?'⛽':why=='cargo'?'📦':why=='rush'?'🪙':'🏁'}</div><h1>${why=='time'?"Game time's up!":why=='fuel'?'Out of gas!':why=='cargo'?'Crates fell off!':why=='rush'?'Time!':'Nice drive!'}</h1>
   <div class="endstats">${H.mode=='coins'?`<div><b>🔩 ${H.bolts}</b><span>${rrec?'🏆 NEW RECORD':'Best '+(gs.rush[H.stage]||0)}</span></div>`:`<div><b>${m} m</b><span>${H.mode=='cargo'?'delivery distance':rec&&m>0?'🏆 NEW RECORD':'Best '+gs.best[H.stage]+' m'}</span></div>`}<div><b>+${H.bolts}</b><span>🔩 bolts</span></div><div><b>${H.flips}</b><span>flips</span></div><div><b>${H.perfect}</b><span>perfect landings</span></div></div>
   ${mdone.map(x=>`<div class="msg">🎯 Mission done: ${x.t}! Claim it in the garage.</div>`).join('')}${unl.map(u=>`<div class="msg">🔓 New place unlocked: ${u}!</div>`).join('')}
   <div class="rowh">${why=='time'||ptLeft()<=0?'<button class="btn big" id="hlearn">📚 Earn more game time</button>':'<button class="btn big" id="hagain">Drive again</button>'}<button class="btn" id="hgar">🔧 Garage</button></div></div>`;
  document.body.appendChild(o);if(S.voice)say(why=='time'?`Game time is up! Let's learn and earn more!`:rec&&m>0?`New record! ${m} meters!`:`You drove ${m} meters!`);
  const go=f=>{o.remove();stopHC();f()};
  if(o.querySelector('#hagain'))o.querySelector('#hagain').onclick=()=>go(()=>hcStart(H.stage));
  if(o.querySelector('#hlearn'))o.querySelector('#hlearn').onclick=()=>go(()=>home());
  o.querySelector('#hgar').onclick=()=>go(garage)}

function hcLvCard(H,html,btns){const o=document.createElement('div');o.className='ovl';o.innerHTML=`<div class="endcard">${html}<div class="rowh">${btns}</div></div>`;document.body.appendChild(o);
  const go=f=>{o.remove();stopHC();f()};o.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{const a=b.dataset.go;if(a=='retry')go(()=>hcStart(H.stage,H.lv.i));else if(a=='next')go(()=>H.lv.i+1<LVN?hcStart(H.stage,H.lv.i+1):hcLevels(STKEYS[STKEYS.indexOf(H.stage)+1]||H.stage));else if(a=='learn')go(home);else go(()=>hcLevels(H.stage))})}
function hcWin(){const H=HC;if(H.over)return;H.over=true;const L=H.lv,gs=garageS(),arr=lvS(H.stage),stars=1+(H.crashes<=1?1:0)+(H.crashes==0&&H.t<=L.par?1:0),old=arr[L.i]||0,gain=Math.max(0,stars-old)*15*(L.si+1);
  arr[L.i]=Math.max(old,stars);gs.bolts+=H.bolts+gain;const mdone=hcMissions(H,L.dist);save();if(H.eng){try{H.eng.g.gain.setTargetAtTime(0,ac().currentTime,.1)}catch(e){}}
  SFX.fanfare();confetti(50);if(S.voice)say(stars==3?'Three stars! Amazing!':'You made it!');const tm=Math.round(H.t);
  const st=[1,2,3].map(k=>`<span class="lvstar ${k<=stars?'on':''}" style="animation-delay:${k*.25}s">⭐</span>`).join('');
  setTimeout(()=>{for(let k=1;k<=stars;k++)setTimeout(()=>SFX.coin(k+2),k*250)},100);
  const last=L.i+1>=LVN,nextSt=STKEYS[STKEYS.indexOf(H.stage)+1];
  hcLvCard(H,`<h1>🏁 Level ${L.i+1} done!</h1><div class="lvstars">${st}</div>
   <div class="endstats"><div><b>${tm}s</b><span>${H.crashes==0&&tm<=L.par?'⚡ under '+L.par+'s':'3⭐ = no crashes, under '+L.par+'s'}</span></div><div><b>+${H.bolts+gain}</b><span>🔩 bolts</span></div><div><b>${H.crashes}</b><span>crashes</span></div><div><b>${H.flips}</b><span>flips</span></div></div>
   ${mdone.map(x=>`<div class="msg">🎯 Mission done: ${x.t}!</div>`).join('')}${last&&nextSt?`<div class="msg">🔓 ${STAGES[nextSt].e} ${STAGES[nextSt].n} levels unlocked!</div>`:''}`,
   `${ptLeft()>0?`<button class="btn big" data-go="next">${last?'Next world ▶':'Next level ▶'}</button>`:'<button class="btn big" data-go="learn">📚 Earn more game time</button>'}<button class="btn" data-go="retry">↻ Retry</button><button class="btn" data-go="list">☰</button>`)}
function hcLvFail(H,why,m,mdone){SFX.magic();const L=H.lv,togo=Math.max(0,L.dist-m);if(S.voice)say(why=='time'?`Game time is up!`:`So close! Try again!`);
  hcLvCard(H,`<div style="font-size:60px">${why=='time'?'⏰':'⛽'}</div><h1>${why=='time'?"Game time's up!":'Out of gas!'}</h1><div class="hcprog" style="position:relative;left:0;right:0;top:0;margin:10px 0;transform:none;width:auto"><div style="width:${Math.min(100,m/L.dist*100)}%"></div></div>
   <div class="msg">Only <b>${togo} m</b> to the finish! Tip: grab the ⛽ cans and don't waste gas in the air.</div>${mdone.map(x=>`<div class="msg">🎯 Mission done: ${x.t}!</div>`).join('')}`,
   `${why=='time'||ptLeft()<=0?'<button class="btn big" data-go="learn">📚 Earn more game time</button>':'<button class="btn big" data-go="retry">↻ Try again</button>'}<button class="btn" data-go="list">☰ Levels</button>`)}
function hcLevels(st='meadow'){const gs=garageS(),left=ptLeft();const tot=STKEYS.reduce((a,k)=>a+lvS(k).reduce((p,q)=>p+(q||0),0),0);
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title">🏆 Levels</div><div class="sp"></div><div class="stars">⭐ ${tot}/${STKEYS.length*LVN*3}</div><div class="stars">🎟️ ${fmtT(left)}</div></div>
  <div class="tabs">${STKEYS.map(k=>`<button class="btn sm tab ${k==st?'on':''}" data-t="${k}">${STAGES[k].e}</button>`).join('')}</div>
  <div class="scroll"><div class="lvhead" style="background:linear-gradient(135deg,${STAGES[st].sky[0]},${STAGES[st].top[0]})"><b>${STAGES[st].n}</b><span>${lvS(st).reduce((p,q)=>p+(q||0),0)} / ${LVN*3} ⭐</span></div>
  <div class="lvgrid">${[...Array(LVN)].map((_,i)=>{const L=lvDef(st,i),ok=lvOpen(st,i),sv=lvS(st)[i]||0;return`<button class="btn lvb ${ok?'':'lock'} ${sv?'done':''}" data-l="${i}"><b>${ok?i+1:'🔒'}</b><span class="lvs">${[1,2,3].map(k=>k<=sv?'⭐':'☆').join('')}</span><small>${L.dist} m${L.pits?' · 🕳️':''}</small></button>`}).join('')}</div>
  <p class="small" style="text-align:center">⭐ Finish · ⭐⭐ 1 crash or less · ⭐⭐⭐ No crashes and beat the time</p></div>`);
  $('#back').onclick=garage;$$('[data-t]').forEach(b=>b.onclick=()=>{SFX.pop(1);hcLevels(b.dataset.t)});
  $$('[data-l]').forEach(b=>b.onclick=()=>{const i=+b.dataset.l;if(!lvOpen(st,i)){SFX.wrong();anim(b,'sad');fb(i?'Finish the level before it first!':'Finish the last world, or drive '+STAGES[st].need+' m in Free Drive!','warn long',2600);return}
    if(ptLeft()<=0){SFX.wrong();fb('🎟️ '+ptWhyNot(),'warn long',3000);return}SFX.whoosh();hcStart(st,i)})}
/* drawing */
function hcProp(x,type,px,py,s,i){
  if(type=='tree'){const h=(46+(i*37)%26)*s;x.fillStyle='#78350f';x.fillRect(px-3*s,py-h*.38,6*s,h*.4);x.fillStyle=i%2?'#15803d':'#166534';x.beginPath();x.arc(px,py-h*.62,h*.3,0,7);x.arc(px-h*.18,py-h*.5,h*.22,0,7);x.arc(px+h*.18,py-h*.5,h*.22,0,7);x.fill();x.fillStyle='#22c55e66';x.beginPath();x.arc(px-h*.08,py-h*.7,h*.14,0,7);x.fill()}
  else if(type=='cactus'){const h=(40+(i*29)%24)*s;x.fillStyle='#15803d';rr(x,px-5*s,py-h,10*s,h,5*s);x.fill();rr(x,px-16*s,py-h*.7,8*s,h*.32,4*s);x.fill();rr(x,px-16*s,py-h*.46,14*s,7*s,3.5*s);x.fill();rr(x,px+8*s,py-h*.82,8*s,h*.36,4*s);x.fill();rr(x,px+2*s,py-h*.52,14*s,7*s,3.5*s);x.fill()}
  else if(type=='pine'){const h=(52+(i*31)%26)*s;x.fillStyle='#78350f';x.fillRect(px-3*s,py-h*.2,6*s,h*.22);for(let k=0;k<3;k++){const yy=py-h*(.2+k*.25),ww=h*(.32-k*.07);x.fillStyle='#166534';x.beginPath();x.moveTo(px-ww,yy);x.lineTo(px,yy-h*.36);x.lineTo(px+ww,yy);x.fill();x.fillStyle='#fff';x.beginPath();x.moveTo(px-ww*.4,yy-h*.22);x.lineTo(px,yy-h*.36);x.lineTo(px+ww*.4,yy-h*.22);x.fill()}}
  else if(type=='palm'){const h=(70+(i*31)%30)*s,b=(i%2?1:-1)*12*s;x.strokeStyle='#92400e';x.lineWidth=6*s;x.lineCap='round';x.beginPath();x.moveTo(px,py);x.quadraticCurveTo(px+b,py-h*.6,px+b*.6,py-h);x.stroke();x.lineCap='butt';
    x.fillStyle=i%2?'#15803d':'#16a34a';for(let k=0;k<6;k++){const a=k*1.05+.3;x.beginPath();x.moveTo(px+b*.6,py-h);x.quadraticCurveTo(px+b*.6+Math.cos(a)*h*.35,py-h-Math.sin(a)*h*.25-8*s,px+b*.6+Math.cos(a)*h*.5,py-h+h*.12);x.quadraticCurveTo(px+b*.6+Math.cos(a)*h*.25,py-h-4*s,px+b*.6,py-h);x.fill()}
    x.fillStyle='#78350f';x.beginPath();x.arc(px+b*.6-3*s,py-h+5*s,4*s,0,7);x.arc(px+b*.6+4*s,py-h+6*s,4*s,0,7);x.fill()}
  else if(type=='deadtree'){const h=(44+(i*23)%20)*s;x.strokeStyle='#1c1917';x.lineWidth=4*s;x.beginPath();x.moveTo(px,py);x.lineTo(px,py-h);x.moveTo(px,py-h*.6);x.lineTo(px-h*.3,py-h*.9);x.moveTo(px,py-h*.45);x.lineTo(px+h*.28,py-h*.75);x.stroke();if(i%3==0){x.fillStyle='#f9731655';x.beginPath();x.arc(px,py-4*s,10*s,0,7);x.fill()}}
  else if(type=='lamp'){x.strokeStyle='#27272a';x.lineWidth=3*s;x.beginPath();x.moveTo(px,py);x.lineTo(px,py-60*s);x.lineTo(px+12*s,py-60*s);x.stroke();x.fillStyle='#fde047';x.beginPath();x.arc(px+12*s,py-57*s,4*s,0,7);x.fill();x.fillStyle='#fde04733';x.beginPath();x.moveTo(px+8*s,py-56*s);x.lineTo(px-6*s,py);x.lineTo(px+30*s,py);x.lineTo(px+16*s,py-56*s);x.fill();
    if(i%4==1){x.fillStyle=['#ef4444','#3b82f6','#22c55e'][i%3];rr(x,px+18*s,py-14*s,30*s,13*s,4*s);x.fill();x.fillStyle='#111';x.beginPath();x.arc(px+24*s,py-1*s,4*s,0,7);x.arc(px+42*s,py-1*s,4*s,0,7);x.fill();x.fillStyle='#bae6fd';x.fillRect(px+26*s,py-12*s,10*s,5*s)}}
  else if(type=='antenna'){x.strokeStyle='#cbd5e1';x.lineWidth=3*s;x.beginPath();x.moveTo(px,py);x.lineTo(px,py-50*s);x.stroke();x.fillStyle='#ef4444';x.beginPath();x.arc(px,py-52*s,4*s,0,7);x.fill()}}
function hcDraw(x,W,Hh,dpr){const H=HC,st=STAGES[H.stage],moon=H.stage=='moon',cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2,ang=Math.atan2(H.w2.y-H.w1.y,H.w2.x-H.w1.x);
  if(Math.abs(x.canvas.width-x.canvas.clientWidth*dpr)>2)H.size();
  const sp=H.speed||0,portrait=Hh>W;
  H.zoom+=((1-Math.min(.22,sp/2600))-H.zoom)*.03;const sc=Math.min(Hh/470,W/(portrait?460:620))*H.zoom*1.05;
  H.camX+=(cx+W*.1/sc-H.camX)*.09;H.camY+=(cy+30-H.camY)*.07;if(H.shake>0)H.shake-=1/60;
  const sh=H.shake>0?(Math.random()-.5)*14*H.shake*dpr:0,base=portrait?.66:.62;
  const SX=wx=>(wx-H.camX)*sc+W*.38+sh,SY=wy=>Hh*base-(wy-H.camY)*sc+sh,WX=sx=>(sx-W*.38)/sc+H.camX;
  const g=x.createLinearGradient(0,0,0,Hh);g.addColorStop(0,st.sky[0]);g.addColorStop(1,st.sky[1]);x.fillStyle=g;x.fillRect(0,0,W,Hh);
  if(moon){x.fillStyle='#fff';for(let i=0;i<90;i++){const sx=((i*137.5-H.camX*.03*sc)%W+W)%W,sy=(i*71.3)%(Hh*.7),tw=(Math.sin(H.t*3+i)+1)*.6+.6;x.globalAlpha=.5+tw*.3;x.fillRect(sx,sy,1.6*dpr*tw,1.6*dpr*tw)}x.globalAlpha=1;
    x.font=`${70*sc}px sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText('🌍',W*.8,Hh*.17)}
  else{const sx0=W*.84,sy0=Hh*.14,sg=x.createRadialGradient(sx0,sy0,4,sx0,sy0,90*sc);sg.addColorStop(0,'#fffbeb');sg.addColorStop(.35,H.stage=='desert'?'#fdba74':'#fde047');sg.addColorStop(1,'#fde04700');x.fillStyle=sg;x.beginPath();x.arc(sx0,sy0,90*sc,0,7);x.fill();
    x.save();x.globalAlpha=.08;x.fillStyle='#fff';for(let i=0;i<6;i++){const a=H.t*.05+i*1.05;x.beginPath();x.moveTo(sx0,sy0);x.lineTo(sx0+Math.cos(a)*W,sy0+Math.sin(a)*W);x.lineTo(sx0+Math.cos(a+.12)*W,sy0+Math.sin(a+.12)*W);x.fill()}x.restore();
    x.fillStyle=st.lava?'#292524cc':'#ffffffd8';for(let i=0;i<6;i++){const px=((i*420-H.camX*.08*sc-H.t*12*dpr)%(W+300)+W+300)%(W+300)-150,py=Hh*(.08+(i%3)*.08);
      for(const[ox,oy,r]of[[0,0,26],[24,-10,22],[46,0,24],[22,8,22]]){x.beginPath();x.arc(px+ox*sc*1.2,py+oy*sc*1.2,r*sc*1.2,0,7);x.fill()}}}
  const layer=(par,col,yb,amp,f1,f2,cap)=>{x.fillStyle=col;x.beginPath();x.moveTo(0,Hh);const pts=[];for(let sx=0;sx<=W+10;sx+=10*dpr){const t=sx/sc+H.camX*par;const y=Hh*yb-((H.stage=='desert'?Math.min(1,Math.abs(Math.sin(t*f1))*1.6):Math.abs(Math.sin(t*f1)))*amp+Math.sin(t*f2)*amp*.25)*sc;pts.push([sx,y]);x.lineTo(sx,y)}x.lineTo(W,Hh);x.fill();
    if(cap){x.fillStyle=cap;for(let i=1;i<pts.length-1;i++){const[px,py]=pts[i];if(py<pts[i-1][1]&&py<=pts[i+1][1]&&py<Hh*yb-amp*.75*sc){x.beginPath();x.moveTo(px-20*sc,py+18*sc);x.lineTo(px,py);x.lineTo(px+20*sc,py+18*sc);x.fill()}}}};
  layer(.08,st.far2,.5,130,.0028,.009,H.stage=='meadow'||H.stage=='snow'?'#f8fafc':null);layer(.18,st.far,.56,90,.0039,.012,H.stage=='snow'?'#fff':null);
  const fog=x.createLinearGradient(0,Hh*.35,0,Hh*.65);fog.addColorStop(0,'#ffffff00');fog.addColorStop(1,moon?'#00000000':'#ffffff40');x.fillStyle=fog;x.fillRect(0,Hh*.35,W,Hh*.3);
  x.fillStyle=st.mid;x.beginPath();x.moveTo(0,Hh);for(let sx=0;sx<=W+8;sx+=8*dpr){const t=(sx/sc+H.camX*.35);x.lineTo(sx,Hh*.6-(Math.sin(t*.005)*55+Math.sin(t*.013+1)*25)*sc)}x.lineTo(W,Hh);x.fill();
  for(let i=Math.floor((H.camX*.35-W/sc)/150);i<(H.camX*.35+W/sc*1.2)/150;i++){const t=i*150+((i*73)%60),sx=(t-H.camX*.35)*sc,y=Hh*.6-(Math.sin(t*.005)*55+Math.sin(t*.013+1)*25)*sc;if(sx<-60||sx>W+60||(i*7)%3==0)continue;hcProp(x,st.prop,sx,y,sc*.8,i)}
  const step=5*dpr,pts=[],DY=34*sc,hd=DY/2;for(let sx=-step;sx<=W+step;sx+=step){const wx=WX(sx);pts.push([sx,SY(terrH(wx,H.stage)),wx])}
  x.beginPath();x.moveTo(-step,Hh);for(const[sx,y]of pts)x.lineTo(sx,y+hd);x.lineTo(W+step,Hh);x.closePath();
  const pat=x.createPattern(texFor(H.stage),'repeat');try{pat.setTransform(new DOMMatrix().translateSelf(SX(0)%(128*sc),SY(0)%(128*sc)).scaleSelf(sc*1.2,sc*1.2))}catch(e){}
  x.fillStyle=pat;x.fill();const dg=x.createLinearGradient(0,Hh*.4,0,Hh);dg.addColorStop(0,'#00000000');dg.addColorStop(1,'#00000055');x.fillStyle=dg;x.fill();
  x.save();x.clip();x.strokeStyle='#0000001a';x.lineWidth=6*sc;for(const off of[46,110]){x.beginPath();pts.forEach(([sx,y],i)=>i?x.lineTo(sx,y+hd+off*sc):x.moveTo(sx,y+hd+off*sc));x.stroke()}x.restore();
  // props standing on the far edge of the road (3D depth)
  if(st.prop){for(let i=Math.floor((WX(0)-100)/230);i<(WX(W)+100)/230;i++){if((i*13)%5<2)continue;const wx=i*230+((i*57)%90);if(pitAt(wx,H.stage)||pitAt(wx+60,H.stage)||pitAt(wx-60,H.stage)||wx<250)continue;const y=SY(terrH(wx,H.stage))-hd;hcProp(x,st.prop,SX(wx),y+2*sc,sc*1.15,i+3)}}
  // road top surface with slope lighting
  const tc0=st.top[0],tc1=st.top[1];for(let i=1;i<pts.length;i++){const[a,ya]=pts[i-1],[b,yb]=pts[i],sl=(yb-ya)/(b-a);x.fillStyle=shade(tc0,sl>0?-Math.min(.35,sl*.5):Math.min(.25,-sl*.35));x.beginPath();x.moveTo(a,ya+hd);x.lineTo(b+.5,yb+hd);x.lineTo(b+.5,yb-hd);x.lineTo(a,ya-hd);x.fill()}
  x.lineJoin='round';x.beginPath();pts.forEach(([sx,y],i)=>i?x.lineTo(sx,y-hd):x.moveTo(sx,y-hd));x.strokeStyle=shade(tc1,-.1);x.lineWidth=3*sc;x.stroke();
  x.beginPath();pts.forEach(([sx,y],i)=>i?x.lineTo(sx,y+hd):x.moveTo(sx,y+hd));x.strokeStyle=shade(tc0,.35);x.lineWidth=3*sc;x.stroke();
  x.beginPath();pts.forEach(([sx,y],i)=>i?x.lineTo(sx,y+hd+4*sc):x.moveTo(sx,y+hd+4*sc));x.strokeStyle='#0000002a';x.lineWidth=5*sc;x.stroke();
  for(const f of feats(H.stage)){if(f.t!='pit'||f.x+f.w<WX(0)-50||f.x>WX(W)+50)continue;const b=baseH(f.x,H.stage),wl=b-f.d*.5;
    if(st.water){const wg=x.createLinearGradient(0,SY(wl),0,SY(b-f.d));wg.addColorStop(0,st.water);wg.addColorStop(1,st.lava?'#7f1d1d':'#0c4a6e');x.fillStyle=wg;x.beginPath();x.moveTo(SX(f.x+6),SY(b-f.d));for(let wx=f.x+6;wx<=f.x+f.w-6;wx+=6)x.lineTo(SX(wx),SY(wl+Math.sin(wx*.08+H.t*3)*3));x.lineTo(SX(f.x+f.w-6),SY(b-f.d));x.fill();
      x.strokeStyle=st.lava?'#fde047':'#e0f2fe';x.lineWidth=3*sc;x.beginPath();for(let wx=f.x+6;wx<=f.x+f.w-6;wx+=6){const y=SY(wl+Math.sin(wx*.08+H.t*3)*3);wx==f.x+6?x.moveTo(SX(wx),y):x.lineTo(SX(wx),y)}x.stroke()}
    const px=SX(f.x-200),py=SY(terrH(f.x-200,H.stage));x.fillStyle='#78350f';x.fillRect(px-2*sc,py-46*sc,4*sc,46*sc);x.fillStyle='#facc15';x.strokeStyle='#111';x.lineWidth=2*sc;x.beginPath();x.moveTo(px,py-70*sc);x.lineTo(px+16*sc,py-46*sc);x.lineTo(px-16*sc,py-46*sc);x.closePath();x.fill();x.stroke();
    x.fillStyle='#111';x.font=`bold ${14*sc}px sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText('!',px,py-53*sc)}
  
  if(H.stage=='meadow'){for(let i=Math.floor(WX(0)/22);i<WX(W)/22;i++){const wx=i*22;if(softAt(wx,H.stage)||pitAt(wx,H.stage))continue;const y=SY(terrH(wx,H.stage))-hd+2*sc;x.fillStyle=st.top[1];x.beginPath();x.moveTo(SX(wx)-3*sc,y-2*sc);x.lineTo(SX(wx)+(i%2?2:-2)*sc,y-11*sc);x.lineTo(SX(wx)+3*sc,y-2*sc);x.fill();
    if(i%9==0){x.fillStyle=['#f472b6','#facc15','#fff'][i%3];x.beginPath();x.arc(SX(wx)+4*sc,y-12*sc,3*sc,0,7);x.fill()}}}
  if(st.soft){const so=SOFT[st.soft];for(const f of feats(H.stage)){if(f.t!='soft'||f.x+f.w<WX(0)||f.x>WX(W))continue;x.strokeStyle=so.c;x.lineWidth=DY*.9;x.beginPath();for(let wx=f.x;wx<=f.x+f.w;wx+=6){const y=SY(terrH(wx,H.stage));wx==f.x?x.moveTo(SX(wx),y):x.lineTo(SX(wx),y)}x.stroke();
      if(st.soft=='ice'){x.strokeStyle='#fff';x.lineWidth=2*sc;for(let wx=f.x+15;wx<f.x+f.w;wx+=50){const y=SY(terrH(wx,H.stage));x.beginPath();x.moveTo(SX(wx),y-3*sc);x.lineTo(SX(wx+14),y-3*sc);x.stroke()}}
      else{x.fillStyle=so.c2;for(let wx=f.x+20;wx<f.x+f.w;wx+=45){const y=SY(terrH(wx,H.stage));x.beginPath();x.arc(SX(wx),y-4*sc,(3+Math.sin(H.t*2+wx)*1.5)*sc,0,7);x.fill()}}
      x.fillStyle=st.soft=='ice'?'#0369a1':'#fff';x.font=`bold ${13*sc}px sans-serif`;x.textAlign='center';x.fillText(so.label,SX(f.x+f.w/2),SY(terrH(f.x+f.w/2,H.stage)+46))}}
  for(const f of feats(H.stage)){if(f.t!='rock'||f.x+f.w<WX(0)||f.x-f.w>WX(W))continue;const bx=SX(f.x),by=SY(baseH(f.x,H.stage)),rw=f.w/2*sc,rh=f.h*sc;
    const rg=x.createRadialGradient(bx-rw*.3,by-rh*.7,2,bx,by-rh*.4,rw*1.2);rg.addColorStop(0,moon?'#e4e4e7':H.stage=='desert'?'#fdba74':'#d6d3d1');rg.addColorStop(1,moon?'#52525b':H.stage=='desert'?'#9a3412':'#57534e');x.fillStyle=rg;
    x.beginPath();x.ellipse(bx,by,rw*1.02,rh+2*sc,0,Math.PI,0);x.lineTo(bx+rw,by+6*sc);x.lineTo(bx-rw,by+6*sc);x.fill();x.strokeStyle='#0003';x.lineWidth=2*sc;x.beginPath();x.moveTo(bx-rw*.2,by-rh*.8);x.lineTo(bx+rw*.1,by-rh*.4);x.lineTo(bx-rw*.05,by-rh*.1);x.stroke();
    if(H.stage=='snow'){x.fillStyle='#fff';x.beginPath();x.ellipse(bx,by-rh*.85,rw*.6,rh*.25,0,Math.PI,0);x.fill()}}
  const left=WX(0)-80,right=WX(W)+80;x.textAlign='center';x.textBaseline='middle';
  if(H.best>5){const bx=100+H.best*20;if(bx>left&&bx<right){const py=SY(terrH(bx,H.stage)),px=SX(bx);x.strokeStyle='#a16207';x.lineWidth=4*sc;x.beginPath();x.moveTo(px,py);x.lineTo(px,py-120*sc);x.stroke();
    x.fillStyle='#facc15';x.beginPath();x.moveTo(px,py-120*sc);x.lineTo(px+50*sc,py-106*sc);x.lineTo(px,py-92*sc);x.fill();x.fillStyle='#713f12';x.font=`bold ${12*sc}px sans-serif`;x.fillText('BEST',px+20*sc,py-106*sc)}}
  for(let k=Math.max(1,Math.floor((left-100)/2000));k<=Math.floor((right-100)/2000);k++){const fx=100+k*2000,fy=SY(terrH(fx,H.stage)),px=SX(fx);
    x.strokeStyle='#e7e5e4';x.lineWidth=4*sc;x.beginPath();x.moveTo(px,fy);x.lineTo(px,fy-100*sc);x.stroke();
    for(let r=0;r<3;r++)for(let c=0;c<4;c++){x.fillStyle=(r+c)%2?(k<=H.lastCp?'#22c55e':'#111'):'#fff';x.fillRect(px+c*11*sc,fy-100*sc+r*10*sc,11*sc,10*sc)}
    x.fillStyle='#fff';x.strokeStyle='#0008';x.lineWidth=3*sc;x.font=`bold ${16*sc}px sans-serif`;x.strokeText(k*100+'m',px+22*sc,fy-112*sc);x.fillText(k*100+'m',px+22*sc,fy-112*sc)}
  if(H.lv&&H.lv.fx>left&&H.lv.fx<right+200){const fx=H.lv.fx,px=SX(fx),py=SY(terrH(fx,H.stage)),ht=150*sc,wd=DY*1.6;
    for(const[ox,oy]of[[-wd*.3,-hd],[wd*.3,hd]]){x.fillStyle='#e5e7eb';x.fillRect(px+ox-4*sc,py+oy-ht,8*sc,ht);x.fillStyle='#9ca3af';x.fillRect(px+ox+1*sc,py+oy-ht,3*sc,ht)}
    const by=py-ht-hd;for(let r=0;r<2;r++)for(let c=0;c<10;c++){x.fillStyle=(r+c)%2?'#111':'#fff';x.fillRect(px-50*sc+c*10*sc,by-6*sc+r*10*sc,10*sc,10*sc)}
    x.fillStyle='#ef4444';rr(x,px-46*sc,by-34*sc,92*sc,26*sc,6*sc);x.fill();x.fillStyle='#fff';x.font=`bold ${17*sc}px sans-serif`;x.fillText('FINISH',px,by-20*sc);
    for(let i=0;i<6;i++){const a=H.t*2+i;x.fillStyle=['#facc15','#22c55e','#3b82f6','#ec4899'][i%4];x.fillRect(px-60*sc+i*24*sc,by-44*sc+Math.sin(a)*4*sc,6*sc,9*sc)}}
  for(let k=H.fuelK;k<H.fuelK+4;k++){const fx=fuelX(k,H.stage);if(fx>right)break;if(fx<left||H.took.has('f'+k))continue;const px=SX(fx),py=SY(terrH(fx,H.stage)+H.R+22+Math.sin(H.t*3)*4);
    x.fillStyle='#fde04755';x.beginPath();x.arc(px,py,26*sc,0,7);x.fill();x.fillStyle='#dc2626';rr(x,px-12*sc,py-16*sc,24*sc,30*sc,4*sc);x.fill();x.strokeStyle='#7f1d1d';x.lineWidth=2*sc;x.stroke();x.fillStyle='#fde047';x.font=`bold ${14*sc}px sans-serif`;x.fillText('F',px,py);
    x.strokeStyle='#7f1d1d';x.lineWidth=3*sc;x.beginPath();x.moveTo(px-6*sc,py-16*sc);x.lineTo(px-6*sc,py-22*sc);x.lineTo(px+6*sc,py-22*sc);x.stroke()}
  const BS=H.mode=='coins'?190:420,BN=H.mode=='coins'?4:3;for(let i=Math.max(0,Math.floor((left-420)/BS));i<=Math.floor((right-420)/BS);i++){const bx=420+i*BS;for(let j=0;j<BN;j++){const wx=bx+j*26;if(H.took.has(`c${i}_${j}`))continue;
    const px=SX(wx),py=SY(terrH(wx,H.stage)+H.R+38+(H.mode=='coins'&&i%4==2?70:0))+Math.sin(H.t*4+j)*3*sc;x.fillStyle='#facc15';x.strokeStyle='#a16207';x.lineWidth=2.5*sc;x.beginPath();for(let q=0;q<6;q++){const a=q*1.047+H.t;x[q?'lineTo':'moveTo'](px+Math.cos(a)*11*sc,py+Math.sin(a)*11*sc)}x.closePath();x.fill();x.stroke();
    x.fillStyle='#a16207';x.beginPath();x.arc(px,py,4*sc,0,7);x.fill();x.fillStyle='#fff9';x.beginPath();x.arc(px-4*sc,py-4*sc,2*sc,0,7);x.fill()}}
  for(const p of H.pops){x.globalAlpha=Math.min(1,p.l*2);x.fillStyle='#fde047';x.strokeStyle='#713f12';x.lineWidth=3*sc;x.font=`bold ${16*sc}px sans-serif`;x.strokeText('+1',SX(p.x),SY(p.y));x.fillText('+1',SX(p.x),SY(p.y))}x.globalAlpha=1;
  for(const d of H.parts){x.globalAlpha=Math.max(0,Math.min(1,d.l*1.4))*(d.smoke?.5:1);
    if(d.line){x.strokeStyle=d.c;x.lineWidth=2*dpr;x.beginPath();x.moveTo(SX(d.x),SY(d.y));x.lineTo(SX(d.x)+40*sc,SY(d.y));x.stroke()}
    else if(d.star){x.font=`${16*sc}px sans-serif`;x.fillText('⭐',SX(d.x),SY(d.y))}else{x.fillStyle=d.c;x.beginPath();x.arc(SX(d.x),SY(d.y),(d.smoke?d.s+(.8-d.l)*18:d.s)*sc,0,7);x.fill()}}x.globalAlpha=1;
  if(H.crashT<=0||Math.floor(H.crashT*8)%2){const gsy=SY(terrH(cx,H.stage)),dist=Math.max(0,(cy-terrH(cx,H.stage))*sc);x.fillStyle=`rgba(0,0,0,${Math.max(.05,.25-dist/600)})`;x.beginPath();x.ellipse(SX(cx),gsy+2*sc,64*sc,7*sc,0,0,7);x.fill();
    const lift=H.R+6,bx=SX(cx)-Math.sin(ang)*lift*sc,by=SY(cy)-Math.cos(ang)*lift*sc;drawVehicle(x,H.veh,bx,by,ang,sc,garageS().paint,H.w1.rot,H.w2.rot,-H.bob);
    if(H.crates){const cp={jeep:[-44,-18],buggy:[-30,-12],monster:[-50,-30],bike:[-26,-20],tractor:[14,-26],bus:[-30,-50]}[H.veh]||[-40,-18];x.save();x.translate(bx,by);x.rotate(-ang);x.scale(sc,sc);x.translate(0,-H.bob);
      for(let i=0;i<H.crates;i++){const ox=cp[0]+(i==2?9:i*18),oy=cp[1]-(i==2?17:0)-17+Math.sin(H.t*9+i)*Math.min(2,Math.abs(H.bobV)*.01);x.fillStyle='#b45309';x.strokeStyle='#78350f';x.lineWidth=2;x.fillRect(ox,oy,17,17);x.strokeRect(ox,oy,17,17);x.beginPath();x.moveTo(ox,oy);x.lineTo(ox+17,oy+17);x.moveTo(ox+17,oy);x.lineTo(ox,oy+17);x.stroke()}x.restore()}}
  if(H.mode=='night'){const nc=H.nightC||(H.nightC=document.createElement('canvas'));if(nc.width!=W||nc.height!=Hh){nc.width=W;nc.height=Hh}const n=nc.getContext('2d'),vx=SX(cx),vy=SY(cy)-20*sc,dx=Math.cos(ang),dy=-Math.sin(ang);
    n.globalCompositeOperation='source-over';n.clearRect(0,0,W,Hh);n.fillStyle='rgba(3,7,30,.86)';n.fillRect(0,0,W,Hh);n.globalCompositeOperation='destination-out';
    const L1=520*sc,sp2=.42,g1=n.createRadialGradient(vx,vy,10*sc,vx,vy,L1);g1.addColorStop(0,'#000');g1.addColorStop(.7,'#000c');g1.addColorStop(1,'#0000');n.fillStyle=g1;n.beginPath();n.moveTo(vx+dx*30*sc,vy+dy*30*sc);
    n.lineTo(vx+(dx*Math.cos(sp2)-dy*Math.sin(sp2))*L1,vy+(dy*Math.cos(sp2)+dx*Math.sin(sp2))*L1);n.lineTo(vx+(dx*Math.cos(-sp2)-dy*Math.sin(-sp2))*L1,vy+(dy*Math.cos(-sp2)+dx*Math.sin(-sp2))*L1);n.closePath();n.fill();
    const g2=n.createRadialGradient(vx,vy,0,vx,vy,150*sc);g2.addColorStop(0,'#000');g2.addColorStop(1,'#0000');n.fillStyle=g2;n.beginPath();n.arc(vx,vy,150*sc,0,7);n.fill();x.drawImage(nc,0,0);
    x.fillStyle='#fff';for(let i=0;i<40;i++){const px=((i*137-H.camX*.02*sc)%W+W)%W,py=(i*71)%(Hh*.45);x.globalAlpha=.4+.4*Math.sin(H.t*2+i);x.fillRect(px,py,2*dpr,2*dpr)}x.globalAlpha=1}
  // speedometer
  const gr=Math.min(W,Hh)*.085,gx=W/2,gy=Hh-gr*.55-10*dpr,spd=Math.round(sp/20*3.6);
  x.fillStyle='#000a';x.beginPath();x.arc(gx,gy,gr,Math.PI,0);x.fill();x.strokeStyle='#fff3';x.lineWidth=gr*.12;x.beginPath();x.arc(gx,gy,gr*.82,Math.PI,0);x.stroke();
  x.strokeStyle=sp/H.maxV>.85?'#ef4444':'#22c55e';x.beginPath();x.arc(gx,gy,gr*.82,Math.PI,Math.PI+Math.PI*Math.min(1,sp/(H.maxV*1.15)));x.stroke();
  const na=Math.PI+Math.PI*Math.min(1,sp/(H.maxV*1.15));x.strokeStyle='#fde047';x.lineWidth=gr*.06;x.beginPath();x.moveTo(gx,gy);x.lineTo(gx+Math.cos(na)*gr*.7,gy+Math.sin(na)*gr*.7);x.stroke();
  x.fillStyle='#fff';x.font=`bold ${gr*.38}px sans-serif`;x.fillText(spd,gx,gy-gr*.28);x.font=`${gr*.18}px sans-serif`;x.fillText('km/h',gx,gy-gr*.02);
  const f=$('#hcf');if(f){f.style.width=H.fuel+'%';f.style.background=H.fuel<25?'#ef4444':'linear-gradient(90deg,#f59e0b,#22c55e)';f.parentNode.classList.toggle('low',H.fuel<25)}
  const m=Math.floor((H.maxX-100)/20),d=$('#hcd');if(d)d.textContent=H.lv?`${Math.min(m,H.lv.dist)} / ${H.lv.dist} m · ${Math.floor(H.t)}s`:H.mode=='coins'?`⏱️ ${Math.max(0,Math.ceil(H.rushT))}s`:H.mode=='cargo'?`📦${H.crates} · ${m} m`:m+' m';const b=$('#hcb');if(b)b.textContent='🔩 '+H.bolts;
  const pb=$('#hcpb'),goal=H.lv?H.lv.dist:Math.max(H.best,100)*1.05;if(pb){pb.style.width=Math.min(100,m/goal*100)+'%';const bs=$('#hcbest');if(bs){bs.style.left=Math.min(100,H.best/goal*100)+'%';bs.style.display=H.best>5?'block':'none'}}}

