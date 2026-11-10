/* ---------- art studio: mandalas, stained glass, animals, neon draw ---------- */
const PALS={'🌅 Sunset':['#7f1d1d','#dc2626','#f97316','#fb923c','#fbbf24','#fde68a','#be185d','#f472b6','#4c1d95','#fff7ed'],
 '🌊 Ocean':['#082f49','#0c4a6e','#0369a1','#0ea5e9','#7dd3fc','#e0f2fe','#134e4a','#14b8a6','#5eead4','#f0fdfa'],
 '🍬 Candy':['#db2777','#f472b6','#fbcfe8','#a855f7','#d8b4fe','#60a5fa','#bfdbfe','#34d399','#fde047','#ffffff'],
 '🌲 Forest':['#14532d','#166534','#22c55e','#86efac','#365314','#a3e635','#78350f','#b45309','#d6d3d1','#fef3c7'],
 '⚡ Neon':['#000000','#ff00aa','#ff2d55','#ff9500','#ffee00','#39ff14','#00ffd5','#00b3ff','#7a5cff','#ffffff'],
 '🪨 Earth':['#1c1917','#44403c','#78716c','#a8a29e','#e7e5e4','#7c2d12','#c2410c','#ca8a04','#3f6212','#fafaf9']};
function P2(a,r){return[(150+Math.sin(a)*r).toFixed(1),(150-Math.cos(a)*r).toFixed(1)].join(',')}
function mandala(seed){const r=rng(seed*7919+11),N=[8,10,12,12,14,16][Math.floor(r()*6)],regs=[],s=Math.PI/N;let g=0;
  const add=(d,off=0)=>{g++;for(let k=0;k<N;k++)regs.push({d,t:`rotate(${(k*360/N+off).toFixed(2)} 150 150)`,g})};
  const one=d=>regs.push({d,t:'',g:++g});
  one('M0,0H300V300H0Z');
  for(const[cx,cy]of[[0,0],[300,0],[300,300],[0,300]]){const q=g+1;[44,30,16].forEach(rr=>regs.push({d:SC(cx,cy,rr),t:'',g:q+[44,30,16].indexOf(rr)}));}g+=3;
  let R0=146;const styles=['petal','arch','diamond','dots','petal2','spike','leaf'];
  while(R0>26){const th=14+r()*(R0>90?26:16),R1=Math.max(16,R0-th),mid=(R0+R1)/2,st=styles[Math.floor(r()*styles.length)],w=s*(.55+r()*.4);
    one(SC(150,150,R0));
    if(st=='petal'||st=='petal2'){const p=`M${P2(0,R1)}C${P2(-w,R1+(R0-R1)*.35)} ${P2(-w*.9,R0-(R0-R1)*.05)} ${P2(0,R0)}C${P2(w*.9,R0-(R0-R1)*.05)} ${P2(w,R1+(R0-R1)*.35)} ${P2(0,R1)}Z`;add(p);
      if(st=='petal2'){const a=R1+(R0-R1)*.22,b=R0-(R0-R1)*.2,w2=w*.5;add(`M${P2(0,a)}C${P2(-w2,a+(b-a)*.35)} ${P2(-w2,b)} ${P2(0,b)}C${P2(w2,b)} ${P2(w2,a+(b-a)*.35)} ${P2(0,a)}Z`)}
      if(r()<.6)add(p,180/N)}
    else if(st=='arch'){const h=(R0-R1)*.45;add(`M${P2(-s,R1)}L${P2(-s,R1+h)}Q${P2(-s*.5,R0*1.02)} ${P2(0,R0)}Q${P2(s*.5,R0*1.02)} ${P2(s,R1+h)}L${P2(s,R1)}Z`);add(SC(...P2(0,R1+(R0-R1)*.42).split(',').map(Number),(R0-R1)*.18))}
    else if(st=='diamond'){add(`M${P2(0,R0)}L${P2(-w,mid)}L${P2(0,R1)}L${P2(w,mid)}Z`);add(`M${P2(0,R0-(R0-R1)*.25)}L${P2(-w*.45,mid)}L${P2(0,R1+(R0-R1)*.25)}L${P2(w*.45,mid)}Z`);add(SC(...P2(s,mid).split(',').map(Number),Math.min((R0-R1)*.2,mid*s*.35)))}
    else if(st=='dots'){const rr=Math.min((R0-R1)*.42,mid*Math.sin(s)*.85);add(SC(...P2(0,mid).split(',').map(Number),rr));add(SC(...P2(0,mid).split(',').map(Number),rr*.5));if(rr>5)add(SC(...P2(s,mid).split(',').map(Number),rr*.4))}
    else if(st=='spike'){add(`M${P2(-s,R1)}L${P2(0,R0)}L${P2(s,R1)}Z`);add(`M${P2(-s*.5,R1)}L${P2(0,R1+(R0-R1)*.6)}L${P2(s*.5,R1)}Z`)}
    else{add(`M${P2(0,R1)}Q${P2(-w*1.2,mid)} ${P2(0,R0)}Q${P2(w*.2,mid)} ${P2(0,R1)}Z`);add(`M${P2(0,R1)}Q${P2(w*1.2,mid)} ${P2(0,R0)}Q${P2(-w*.2,mid)} ${P2(0,R1)}Z`)}
    R0=R1}
  one(SC(150,150,R0));add(`M150,150C${P2(-s*1.2,R0*.6)} ${P2(-s*.6,R0)} ${P2(0,R0*.98)}C${P2(s*.6,R0)} ${P2(s*1.2,R0*.6)} 150,150Z`);one(SC(150,150,R0*.32));
  return regs}
function glassArt(seed){const r=rng(seed*104729+7),pts=[],N=[6,8,10,12][Math.floor(r()*4)];
  const grp=[0];pts.push([150,150]);const rings=[16,33,52,73,96,120,146,174,205];rings.forEach((rad,ri)=>{const m=[1,1,2,2,3,3,4,4,5][ri],n=N*m,off=ri%2?Math.PI/n:0,tw=(r()-.5)*.25/m;for(let k=0;k<n;k++){const a=off+k*2*Math.PI/n+(k%m?tw:0);pts.push([150+Math.cos(a)*rad,150+Math.sin(a)*rad]);grp.push(ri*100+1+(k%m))}});
  const clip=(poly,px,py,nx,ny)=>{const out=[],inS=p=>(p[0]-px)*nx+(p[1]-py)*ny<=0;for(let i=0;i<poly.length;i++){const A=poly[i],B=poly[(i+1)%poly.length],ia=inS(A),ib=inS(B);if(ia)out.push(A);if(ia!=ib){const da=(A[0]-px)*nx+(A[1]-py)*ny,db=(B[0]-px)*nx+(B[1]-py)*ny,t=da/(da-db);out.push([A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t])}}return out};
  const regs=[];pts.forEach((p,i)=>{let poly=[[0,0],[300,0],[300,300],[0,300]];for(let j=0;j<pts.length&&poly.length;j++){if(j==i)continue;const q=pts[j];poly=clip(poly,(p[0]+q[0])/2,(p[1]+q[1])/2,q[0]-p[0],q[1]-p[1])}
    if(poly.length>2)regs.push({d:'M'+poly.map(v=>v[0].toFixed(1)+','+v[1].toFixed(1)).join('L')+'Z',t:'',g:grp[i]+1})});
  return regs}
function animalArt(id){const d=shData(id);return d.R.map(r=>({d:r.d,t:'',g:r.i+1,fix:r.o.fix?CB_COL[r.c][0]:null}))}
function artRegs(key){const[k,v]=key.split(':');return k=='m'?mandala(+v):k=='g'?glassArt(+v):k=='p'?polyArt(v):animalArt(v)}
function stS(){return S.studio=Object.assign({items:{},order:[]},S.studio||{})}
function fillVal(v,defs){if(!v)return'#fff';const t=v[0],c=v.slice(2);if(t=='c')return c;const id=(t=='g'?'gr':'gl')+c.slice(1);
  if(!defs.has(id)){defs.add(id);defs.out.push(t=='g'?`<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${shade(c,.5)}"/><stop offset=".55" stop-color="${c}"/><stop offset="1" stop-color="${shade(c,-.35)}"/></linearGradient>`
    :`<pattern id="${id}" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="${c}"/><circle cx="3" cy="4" r="1.3" fill="#fff" opacity=".9"/><circle cx="10" cy="9" r=".9" fill="#fff" opacity=".7"/><circle cx="6" cy="12" r=".7" fill="${shade(c,.6)}"/><circle cx="12" cy="2" r=".8" fill="${shade(c,.6)}"/></pattern>`)}return`url(#${id})`}
function artSVG(regs,fills,o={}){const defs=new Set();defs.out=[];const body=regs.map((r,i)=>r.ov?`<path d="${r.d}" fill="none" stroke="#1c1917" stroke-width="2.2" stroke-linejoin="round" pointer-events="none"/>`:`<path d="${r.d}" ${r.t?`transform="${r.t}"`:''} data-i="${i}" ${r.fix?'pointer-events="none"':''} fill="${r.fix&&!fills[i]?r.fix:fillVal(fills[i],defs)}" stroke="${o.glass?'#1c1917':'#27272a'}" stroke-width="${o.sw||(o.glass?2.6:1.1)}" stroke-linejoin="round"/>`).join('');
  return`<svg viewBox="${o.vb||'0 0 300 300'}" ${o.id?`id="${o.id}"`:''} class="${o.cls||''}"><defs>${defs.out.join('')}${o.glass?'<radialGradient id="glow" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>':''}</defs>${body}${o.glass?'<rect width="300" height="300" fill="url(#glow)" pointer-events="none"/>':''}</svg>`}
const artName=k=>{const[t,v]=k.split(':');return t=='m'?'Mandala':t=='g'?'Rose Window':t=='p'?POLYART[v].n:(SHAPES.find(x=>x[0]==v)||[0,'Picture'])[1]};
function artPage(key){const regs=artRegs(key),st=stS(),it=st.items[key]||{f:{}},fills=Object.assign({},it.f),glass=key[0]=='g';
  let col=PALS['🌅 Sunset'][2],pal=st.pal||'🌅 Sunset',mode='c',mirror=key[0]=='m'||key[0]=='g',undo=[],vb=[0,0,300,300];
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title" style="font-size:19px">${glass?'💎':key[0]=='m'?'✨':'🦁'} ${artName(key)}</div><div class="sp"></div>
    <button class="btn sm" id="aundo">↩️</button>${key[0]=='m'||key[0]=='g'?`<button class="btn sm on" id="amir" title="Mirror fill">🔁</button>`:''}<button class="btn sm" id="azr">🔍</button><div class="stars" id="gtm">🎟️ ${fmtT(ptLeft())}</div></div>
   <div class="stwrap"><div class="stcv" id="stw"></div><div class="stbar">
    <div class="stmodes"><button class="btn sm on" data-md="c">🎨 Paint</button><button class="btn sm" data-md="g">🌅 Shiny</button><button class="btn sm" data-md="s">✨ Glitter</button><button class="btn sm" data-md="e">🧽 Erase</button></div>
    <div class="stpals">${Object.keys(PALS).map(p=>`<button class="btn sm stp ${p==pal?'on':''}" data-p="${p}">${p.split(' ')[0]}</button>`).join('')}</div>
    <div class="stcols" id="stcols"></div></div></div>`);
  const w=$('#stw');w.innerHTML=artSVG(regs,fills,{id:'stsvg',glass,sw:key[0]=='p'?.7:undefined});const svg=$('#stsvg');
  const setVB=()=>svg.setAttribute('viewBox',vb.map(v=>v.toFixed(1)).join(' '));
  const cols=()=>{$('#stcols').innerHTML=PALS[pal].map(c=>`<button class="btn stc ${c==col?'on':''}" data-c="${c}" style="--cc:${c}"></button>`).join('');$$('.stc').forEach(b=>b.onclick=()=>{col=b.dataset.c;if(mode=='e')setMode('c');$$('.stc').forEach(q=>q.classList.toggle('on',q==b));SFX.pop(1)})};cols();
  const setMode=m=>{mode=m;$$('[data-md]').forEach(b=>b.classList.toggle('on',b.dataset.md==m))};
  $$('[data-md]').forEach(b=>b.onclick=()=>{setMode(b.dataset.md);SFX.pop(2)});
  $$('[data-p]').forEach(b=>b.onclick=()=>{pal=b.dataset.p;st.pal=pal;col=PALS[pal][2];$$('[data-p]').forEach(q=>q.classList.toggle('on',q==b));cols();SFX.pop(3)});
  const persist=()=>{st.items[key]={f:fills,t:Date.now()};st.order=[key,...st.order.filter(k=>k!=key)].slice(0,24);for(const k in st.items)if(!st.order.includes(k))delete st.items[k];save()};
  const paintOne=(i,v)=>{const p=svg.querySelector(`path[data-i="${i}"]`);if(!p)return;if(v)fills[i]=v;else delete fills[i];
    const defs=new Set([...svg.querySelectorAll('defs > *')].map(e=>e.id));defs.out=[];p.setAttribute('fill',regs[i].fix&&!v?regs[i].fix:fillVal(v,defs));if(defs.out.length)svg.querySelector('defs').insertAdjacentHTML('beforeend',defs.out.join(''));
    p.classList.remove('popfill');void p.getBBox();p.classList.add('popfill')};
  const tap=(t,sw)=>{const i=+t.dataset.i,v=mode=='e'?null:mode+':'+col,grp=mirror?regs.map((r,j)=>r.g==regs[i].g?j:-1).filter(j=>j>=0):[i];
    undo.push(grp.map(j=>[j,fills[j]||null]));if(undo.length>60)undo.shift();grp.forEach(j=>paintOne(j,v));
    if(sw){if(!tap.lt||performance.now()-tap.lt>60){tap.lt=performance.now();tone(500+((i*37)%9)*60,.05,0,'sine',.07)}}else if(mode=='s'){SFX.magic()}else tone(380+((i*37)%9)*70,.09,0,'sine',.12);clearTimeout(tap.pt);tap.pt=setTimeout(persist,250)};
  // pointer: tap = fill, drag = pan (when zoomed), pinch = zoom
  const ptrs=new Map();let start=null,pinch=null;
  const toSvg=(cx,cy)=>{const b=svg.getBoundingClientRect();return[vb[0]+(cx-b.left)/b.width*vb[2],vb[1]+(cy-b.top)/b.height*vb[3]]};
  w.addEventListener('pointerdown',e=>{e.preventDefault();w.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,[e.clientX,e.clientY]);
    if(ptrs.size==1)start={x:e.clientX,y:e.clientY,vb:vb.slice(),mv:0,t:e.target};else if(ptrs.size==2){const[a,b]=[...ptrs.values()];pinch={d:Math.hypot(a[0]-b[0],a[1]-b[1]),vb:vb.slice(),c:toSvg((a[0]+b[0])/2,(a[1]+b[1])/2)};start=null}});
  w.addEventListener('pointermove',e=>{if(!ptrs.has(e.pointerId))return;ptrs.set(e.pointerId,[e.clientX,e.clientY]);
    if(pinch&&ptrs.size==2){const[a,b]=[...ptrs.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]),k=Math.max(.12,Math.min(1,pinch.vb[2]*pinch.d/d/300)),sz=300*k,bb=svg.getBoundingClientRect(),mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;vb=[pinch.c[0]-(mx-bb.left)/bb.width*sz,pinch.c[1]-(my-bb.top)/bb.height*sz,sz,sz];clampVB();setVB();return}
    if(start&&ptrs.size==1){const dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.hypot(dx,dy)>8&&!start.mv){start.mv=1;start.done=new Set();const t0=start.t.closest&&start.t.closest('path[data-i]');if(t0){start.done.add(t0.dataset.i);tap(t0,1)}}
      if(start.mv){const el=document.elementFromPoint(e.clientX,e.clientY),t=el&&el.closest&&el.closest('#stsvg path[data-i]');if(t&&!start.done.has(t.dataset.i)){start.done.add(t.dataset.i);tap(t,1)}}}});
  const up=e=>{ptrs.delete(e.pointerId);if(ptrs.size<2)pinch=null;if(start&&!start.mv&&ptrs.size==0){const t=start.t.closest&&start.t.closest('path');if(t)tap(t)}if(ptrs.size==0)start=null};
  w.addEventListener('pointerup',up);w.addEventListener('pointercancel',e=>{ptrs.delete(e.pointerId);start=null;pinch=null});
  w.addEventListener('wheel',e=>{e.preventDefault();const c=toSvg(e.clientX,e.clientY),k=Math.max(.12,Math.min(1,vb[2]*(e.deltaY>0?1.15:.87)/300)),sz=300*k;vb=[c[0]-(c[0]-vb[0])*sz/vb[2],c[1]-(c[1]-vb[1])*sz/vb[3],sz,sz];clampVB();setVB()},{passive:false});
  function clampVB(){vb[0]=Math.max(0,Math.min(300-vb[2],vb[0]));vb[1]=Math.max(0,Math.min(300-vb[3],vb[1]))}
  $('#azr').onclick=()=>{if(vb[2]<299)vb=[0,0,300,300];else vb=[75,75,150,150];setVB();SFX.whoosh()};
  $('#aundo').onclick=()=>{const u=undo.pop();if(!u)return;u.forEach(([j,v])=>paintOne(j,v));persist();SFX.del()};
  if($('#amir'))$('#amir').onclick=e=>{mirror=!mirror;e.currentTarget.classList.toggle('on',mirror);fb(mirror?'🔁 Mirror ON: one tap colors every matching piece':'Mirror OFF: color one piece at a time','ok',1800)};
  const size=()=>{const r=w.parentNode.getBoundingClientRect(),land=innerWidth>innerHeight,s=Math.min(land?r.width-250:r.width-12,r.height-(land?12:150));w.style.width=w.style.height=Math.max(200,s)+'px'};size();
  let rs;addEventListener('resize',()=>{clearTimeout(rs);rs=setTimeout(()=>{if($('#stw'))size()},120)});
  $('#back').onclick=()=>{gtStop();colorMenu(key[0]=='m'?'mandala':key[0]=='g'?'glass':'animal')};
  gtStart('#gtm',()=>timeUpOverlay());if(S.voice&&!it.t)setTimeout(()=>say(key[0]=='m'?'Pick colors and make it beautiful!':'Tap to color!'),300)}

/* neon kaleidoscope */
function neonDraw(){let sym=8,brush='neon',hue=Math.random()*360,size=6,mirror=true,strokes=0;
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title" style="font-size:19px">🌈 Neon Draw</div><div class="sp"></div><button class="btn sm" id="nclr">🗑️</button><button class="btn sm" id="nsave">💾</button><div class="stars" id="gtm">🎟️ ${fmtT(ptLeft())}</div></div>
   <div class="stwrap"><div class="stcv neon" id="nw"><canvas id="ncv"></canvas></div><div class="stbar">
    <div class="stmodes">${[[1,'✏️ Off'],[4,'✳️ 4'],[6,'❄️ 6'],[8,'✴️ 8'],[12,'🌸 12']].map(([n,l])=>`<button class="btn sm ${n==sym?'on':''}" data-sy="${n}">${l}</button>`).join('')}<button class="btn sm on" id="nmir">🪞</button></div>
    <div class="stmodes">${[['neon','💡 Neon'],['rainbow','🌈 Rainbow'],['spark','✨ Sparkle'],['ribbon','🎀 Ribbon']].map(([k,l])=>`<button class="btn sm ${k==brush?'on':''}" data-br="${k}">${l}</button>`).join('')}</div>
    <div class="stmodes">${[3,6,11,18].map(z=>`<button class="btn sm ${z==size?'on':''}" data-sz="${z}"><span class="dot" style="width:${z+4}px;height:${z+4}px"></span></button>`).join('')}${[0,50,120,190,280,320].map(h=>`<button class="btn stc" data-h="${h}" style="--cc:hsl(${h},100%,55%)"></button>`).join('')}</div></div></div>`);
  const w=$('#nw'),cv=$('#ncv'),x=cv.getContext('2d'),dpr=Math.min(2,devicePixelRatio||1);let S0=0;
  const size_=()=>{const r=w.parentNode.getBoundingClientRect(),land=innerWidth>innerHeight,s=Math.max(200,Math.min(land?r.width-250:r.width-12,r.height-(land?12:170)));const old=S0?cv.toDataURL():null;w.style.width=w.style.height=s+'px';cv.width=cv.height=s*dpr;S0=s*dpr;x.fillStyle='#05010f';x.fillRect(0,0,S0,S0);if(old){const im=new Image();im.onload=()=>x.drawImage(im,0,0,S0,S0);im.src=old}};size_();
  const seg=(a,b,hh)=>{const c=S0/2;x.lineCap='round';x.lineJoin='round';
    for(let k=0;k<sym;k++){for(const m of(mirror&&sym>1?[1,-1]:[1])){x.save();x.translate(c,c);x.rotate(k*2*Math.PI/sym);x.scale(m,1);
      const col=`hsl(${hh},100%,60%)`;
      if(brush=='spark'){x.fillStyle=`hsl(${hh},100%,${70+Math.random()*25}%)`;x.shadowColor=col;x.shadowBlur=12*dpr;for(let i=0;i<3;i++){const rr=Math.random()*size*dpr*1.4;x.beginPath();x.arc(b[0]-c+(Math.random()-.5)*size*3*dpr,b[1]-c+(Math.random()-.5)*size*3*dpr,rr*.4+1,0,7);x.fill()}}
      else{x.strokeStyle=col;x.shadowColor=col;x.shadowBlur=(brush=='ribbon'?4:16)*dpr;x.lineWidth=size*dpr*(brush=='ribbon'?1.8:1);x.beginPath();x.moveTo(a[0]-c,a[1]-c);x.lineTo(b[0]-c,b[1]-c);x.stroke();
        x.shadowBlur=0;x.strokeStyle='#ffffffcc';x.lineWidth=Math.max(1,size*dpr*.3);x.stroke()}
      x.restore()}}};
  let last=null;const pos=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*dpr,(e.clientY-r.top)*dpr]};
  cv.addEventListener('pointerdown',e=>{e.preventDefault();cv.setPointerCapture(e.pointerId);last=pos(e);seg(last,[last[0]+.1,last[1]],hue);strokes++});
  cv.addEventListener('pointermove',e=>{if(!last)return;const p=pos(e);if(brush=='rainbow')hue=(hue+3)%360;else if(brush=='ribbon')hue=(hue+1)%360;seg(last,p,hue);last=p});
  const end=()=>{last=null};cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);
  $$('[data-sy]').forEach(b=>b.onclick=()=>{sym=+b.dataset.sy;$$('[data-sy]').forEach(q=>q.classList.toggle('on',q==b));SFX.pop(2)});
  $('#nmir').onclick=e=>{mirror=!mirror;e.currentTarget.classList.toggle('on',mirror);SFX.pop(1)};
  $$('[data-br]').forEach(b=>b.onclick=()=>{brush=b.dataset.br;$$('[data-br]').forEach(q=>q.classList.toggle('on',q==b));SFX.pop(3)});
  $$('[data-sz]').forEach(b=>b.onclick=()=>{size=+b.dataset.sz;$$('[data-sz]').forEach(q=>q.classList.toggle('on',q==b));SFX.pop(1)});
  $$('[data-h]').forEach(b=>b.onclick=()=>{hue=+b.dataset.h;if(brush=='rainbow')brush='neon',$$('[data-br]').forEach(q=>q.classList.toggle('on',q.dataset.br=='neon'));SFX.pop(2)});
  $('#nclr').onclick=()=>{x.fillStyle='#05010f';x.fillRect(0,0,S0,S0);SFX.whoosh();strokes=0};
  const doSave=()=>{try{const c2=document.createElement('canvas');c2.width=c2.height=360;c2.getContext('2d').drawImage(cv,0,0,360,360);const g=JSON.parse(localStorage.getItem('starschool-neon')||'[]');g.unshift(c2.toDataURL('image/jpeg',.8));localStorage.setItem('starschool-neon',JSON.stringify(g.slice(0,8)));return true}catch(e){return false}};
  $('#nsave').onclick=()=>{if(doSave()){SFX.fanfare();confetti(20);fb('💾 Saved to your gallery!')}else fb('Gallery is full','warn')};
  let rs;addEventListener('resize',()=>{clearTimeout(rs);rs=setTimeout(()=>{if($('#ncv'))size_()},150)});
  $('#back').onclick=()=>{if(strokes>2)doSave();gtStop();colorMenu('neon')};
  gtStart('#gtm',()=>{if(strokes>2)doSave();timeUpOverlay()})}

let STTAB='mandala';
function colorMenu(tab){if(tab&&['shape','pixel','paint'].includes(tab))return classicColor(tab);if(tab)STTAB=tab;const st=stS();
  const tabs=[['mandala','✨ Mandalas'],['glass','💎 Glass'],['animal','🦁 Animals'],['neon','🌈 Neon'],['classic','🔢 Classic']];
  const thumb=k=>{const it=st.items[k];return`<button class="btn sttile" data-k="${k}">${artSVG(artRegs(k),it?it.f:{},{glass:k[0]=='g',sw:k[0]=='g'?2:k[0]=='p'?.5:.8})}</button>`};
  let body='';const mine=t=>st.order.filter(k=>k[0]==t);
  if(STTAB=='mandala'){const seeds=[3,17,42,77,123,256,512,999];body=`<button class="btn game" id="newm" style="background:linear-gradient(135deg,#f0abfc,#93c5fd)"><span class="ge">🎲</span><span class="gi"><span class="gt">New Mandala</span><span class="small">A brand-new design every time</span></span><span class="go">▶</span></button>
    ${mine('m').length?`<h3 class="cbdh">My Art</h3><div class="stgrid">${mine('m').map(thumb).join('')}</div>`:''}<h3 class="cbdh">Designs</h3><div class="stgrid">${seeds.filter(s=>!st.items['m:'+s]).map(s=>thumb('m:'+s)).join('')}</div>`}
  else if(STTAB=='glass'){const seeds=[5,21,64,88,130,301];body=`<button class="btn game" id="newg" style="background:linear-gradient(135deg,#fde68a,#a5f3fc)"><span class="ge">🎲</span><span class="gi"><span class="gt">New Rose Window</span><span class="small">Stained glass with hundreds of pieces</span></span><span class="go">▶</span></button>
    ${mine('g').length?`<h3 class="cbdh">My Art</h3><div class="stgrid">${mine('g').map(thumb).join('')}</div>`:''}<h3 class="cbdh">Windows</h3><div class="stgrid">${seeds.filter(s=>!st.items['g:'+s]).map(s=>thumb('g:'+s)).join('')}</div>`}
  else if(STTAB=='animal')body=`<div class="tipcard">Geometric animals made of hundreds of facets. <b>Swipe</b> to paint lots of pieces at once. Use light and dark shades for a 3D look. Pinch with two fingers to zoom.</div><div class="stgrid">${Object.keys(POLYART).map(id=>thumb('p:'+id)).join('')}</div>`;
  else if(STTAB=='neon'){let g=[];try{g=JSON.parse(localStorage.getItem('starschool-neon')||'[]')}catch(e){}
    body=`<button class="btn game" id="newn" style="background:linear-gradient(135deg,#312e81,#be185d);color:#fff"><span class="ge">🌈</span><span class="gi"><span class="gt">Neon Kaleidoscope</span><span class="small" style="color:#fbcfe8">Glowing mirror drawing</span></span><span class="go">▶</span></button>${g.length?`<h3 class="cbdh">My Neon Art</h3><div class="stgrid">${g.map(s=>`<div class="sttile"><img src="${s}"></div>`).join('')}</div>`:''}`}
  else body=`<div class="tipcard">The original pictures, pixel art and color-by-number.</div><div class="games"><button class="btn game" data-c="shape" style="background:#fce7f3"><span class="ge">🦁</span><span class="gi"><span class="gt">Number Pictures</span></span></button><button class="btn game" data-c="pixel" style="background:#dbeafe"><span class="ge">🟦</span><span class="gi"><span class="gt">Pixel Art</span></span></button><button class="btn game" data-c="paint" style="background:#dcfce7"><span class="ge">🖌️</span><span class="gi"><span class="gt">Block Paint</span></span></button></div>`;
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title">🎨 Art Studio</div><div class="sp"></div><div class="stars">🎟️ ${fmtT(ptLeft())}</div></div>
   <div class="tabs sttabs">${tabs.map(([k,l])=>`<button class="btn sm tab ${k==STTAB?'on':''}" data-t="${k}">${l}</button>`).join('')}</div><div class="scroll">${body}</div>`);
  $('#back').onclick=gameRoom;$$('.tab').forEach(b=>b.onclick=()=>{SFX.pop(2);colorMenu(b.dataset.t)});
  const chk=()=>{if(ptLeft()<=0){SFX.wrong();fb('🎟️ '+ptWhyNot(),'warn long',3000);return false}return true};
  $$('[data-k]').forEach(b=>b.onclick=()=>{if(chk()){SFX.whoosh();artPage(b.dataset.k)}});
  $$('[data-c]').forEach(b=>b.onclick=()=>classicColor(b.dataset.c));
  if($('#newm'))$('#newm').onclick=()=>{if(chk()){SFX.magic();artPage('m:'+R(1000,99999))}};
  if($('#newg'))$('#newg').onclick=()=>{if(chk()){SFX.magic();artPage('g:'+R(1000,99999))}};
  if($('#newn'))$('#newn').onclick=()=>{if(chk()){SFX.whoosh();neonDraw()}}}

function classicColor(tab){if(tab)CBTAB=tab;const cs=cbS(),ss=shS();
  const tabs=`<div class="tabs">${[['shape','🦁 Pictures'],['pixel','🟦 Pixel Art'],['paint','🖌️ Free Paint']].map(([k,l])=>`<button class="btn sm tab ${k==CBTAB?'on':''}" data-t="${k}">${l}</button>`).join('')}</div>`;
  let body='';
  if(CBTAB=='shape')body=`<div class="tipcard">Tap a picture. Color it <b>your way</b>, or <b>by number</b>, with <b>math facts</b>, or with <b>Spanish</b> colors!</div><h2>Pictures (${Object.keys(ss.done).length}/${SHAPES.length} done)</h2>${[[1,'⭐ Easy','Big shapes'],[2,'⭐⭐ Medium','More parts'],[3,'⭐⭐⭐ Hard','Lots of tiny details']].map(([lv,t,s])=>`<h3 class="cbdh">${t} <span class="small">${s}</span></h3><div class="cbgrid">${shMenuItems(lv)}</div>`).join('')}`;
  else if(CBTAB=='pixel')body=`<div class="tipcard">Block pictures: match the numbers to the colors. Drag your finger to color fast!</div><h2>Pixel Art (${Object.keys(cs.done).length}/${CB_PICS.length} done)</h2><div class="cbgrid">${CB_PICS.map(([id,n])=>{const d=cbData(id),done=cs.done[id],pr=cs.prog[id],pc=pr?Math.round(pr.split('').filter(c=>c=='1').length/pr.length*100):0;
    return`<button class="btn cbitem" data-id="${id}"><img src="${cbThumb(d.G,done?true:pr)}"><b>${n}</b><span class="small">${done?'✅ Done':pc?pc+'%':'New'}</span></button>`}).join('')}</div>`;
  else body=`<button class="btn game" id="free" style="background:linear-gradient(135deg,#fbcfe8,#c7d2fe);width:100%"><span class="ge">🖌️</span><span class="gi"><span class="gt">New Drawing</span><span class="small">Paint anything you want, block by block</span></span><span class="go">▶</span></button>
    ${cs.art.length?`<h2>My Drawings</h2><div class="cbgrid">${cs.art.map((a,i)=>`<button class="btn cbitem" data-art="${i}"><img src="${cbThumb(a.split(',').map(k=>k||'blanco'),true)}"><b>Drawing ${i+1}</b></button>`).join('')}</div>`:'<p class="small" style="text-align:center">Your saved drawings show up here.</p>'}`;
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title">🎨 Coloring</div><div class="sp"></div><div class="stars" id="gtm">🎟️ ${fmtT(ptLeft())}</div></div><div class="scroll">${tabs}${body}</div>`);
  $('#back').onclick=()=>colorMenu('classic');$$('.tab').forEach(b=>b.onclick=()=>{SFX.pop(2);classicColor(b.dataset.t)});
  const chk=()=>{if(ptLeft()<=0){SFX.wrong();fb('🎟️ '+ptWhyNot(),'warn long',3000);return false}return true};
  if($('#free'))$('#free').onclick=()=>{if(chk())freePaint(-1)};
  $$('[data-art]').forEach(b=>b.onclick=()=>{if(chk())freePaint(+b.dataset.art)});
  $$('[data-id]').forEach(b=>b.onclick=()=>{if(chk())modeChooser(m=>colorPic(b.dataset.id,m),false)});
  $$('[data-sh]').forEach(b=>b.onclick=()=>{if(chk())modeChooser(m=>shapePage(b.dataset.sh,m),true)})}

