/* ---------- art studio: mandalas, stained glass, animals, neon draw; G-ART2: Done, one gallery, picture packs ----------
   G-ART2 (R-03 T1-T5): every activity has a Done button that finishes the picture with drawn sparkles (none in calm mode or
   with reduced motion) and keeps it in ONE gallery in the main save, per child: S.studio.gal (newest first, at most GAL_MAX;
   when full the oldest picture without a heart makes room; at most GAL_HEARTS hearts). Entries are small: {i id, k kind, v the
   picture's key, n name, t time, h heart, d data}. Kinds: v (a vector page: m/g/p key + its fills packed by artPack), sh (a number
   picture: fills packed), px (pixel art: the coloured squares as hex bits, or 'all'), fp (Block Paint: one letter a square),
   n (a Neon drawing as strokes: replayable), ni (a Neon picture as an image: the drawings of the old separate store, moved in
   once by artNeonMigrate and kept with a heart, so none is ever trimmed; the old store is left as it was).
   Picture packs (ART_PACKS, a fixed visible list) open with stars: a star is a pack picture finished with Done (a number picture
   or pixel art with every square, a free page a third coloured). S.studio.done {key: 1}; pictures finished before G-ART2 (S.cbn.done,
   S.cbs.done) count. Today's picture comes from the date (artDaily): a small coin bonus the first time a day, nothing lost on a
   missed day, no streak. New fields are read with defaults, nothing is migrated except the Neon store. */
const PALS={Sunset:['#7f1d1d','#dc2626','#f97316','#fb923c','#fbbf24','#fde68a','#be185d','#f472b6','#4c1d95','#fff7ed'],
 Ocean:['#082f49','#0c4a6e','#0369a1','#0ea5e9','#7dd3fc','#e0f2fe','#134e4a','#14b8a6','#5eead4','#f0fdfa'],
 Candy:['#db2777','#f472b6','#fbcfe8','#a855f7','#d8b4fe','#60a5fa','#bfdbfe','#34d399','#fde047','#ffffff'],
 Forest:['#14532d','#166534','#22c55e','#86efac','#365314','#a3e635','#78350f','#b45309','#d6d3d1','#fef3c7'],
 Neon:['#000000','#ff00aa','#ff2d55','#ff9500','#ffee00','#39ff14','#00ffd5','#00b3ff','#7a5cff','#ffffff'],
 Earth:['#1c1917','#44403c','#78716c','#a8a29e','#e7e5e4','#7c2d12','#c2410c','#ca8a04','#3f6212','#fafaf9']};
// an old save kept the palette's name with a picture in front of it ("<picture> Ocean"): the word at the end names it
const palKey=p=>{const m=String(p||'').match(/[A-Za-z]+$/);return m&&PALS[m[0]]?m[0]:'Sunset'};
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
// the same object every time (pages keep it while the gallery adds to it), defaults filled in place
function stS(){const s=S.studio&&typeof S.studio=='object'&&!Array.isArray(S.studio)?S.studio:(S.studio={});
  if(!s.items||typeof s.items!='object')s.items={};if(!Array.isArray(s.order))s.order=[];
  if(!Array.isArray(s.gal))s.gal=[];s.gal=s.gal.filter(e=>e&&typeof e=='object'&&typeof e.k=='string');
  if(!s.done||typeof s.done!='object'||Array.isArray(s.done))s.done={};return s}

/* ---- drawn icons (no emoji): art roles var(--a-x) on a 32 grid; decoration only (the button carries the name) ---- */
const aSp=(x,y,r,c)=>`<path d="M${x} ${y-r}Q${x+r*.18} ${y-r*.18} ${x+r} ${y}Q${x+r*.18} ${y+r*.18} ${x} ${y+r}Q${x-r*.18} ${y+r*.18} ${x-r} ${y}Q${x-r*.18} ${y-r*.18} ${x} ${y-r}Z" fill="var(--a-${c})"/>`;
const AIC={
  paint:'<path d="M23 3l6 6-11 11-6-6z" fill="var(--a-n)"/><path d="M23 3l6 6-2.5 2.5-6-6z" fill="var(--a-e1)"/><path d="M11 15l6 6c-1 5-5 8-10 8-2 0-3-.5-4-1 2-2 2-4 3-7 1-4 3-6 5-6z" fill="var(--a-r)"/><path d="M8 21c-1 2-1 4-2 5" stroke="var(--a-r1)" stroke-width="2" fill="none"/>',
  crayon:'<path d="M5 27l3-8 15-15 5 5-15 15z" fill="var(--a-b)"/><path d="M5 27l3-8 5 5z" fill="var(--a-t)"/><path d="M5 27l1.3-3.7 2.4 2.4z" fill="var(--a-b2)"/><path d="M11.5 15.5l5 5M16.5 10.5l5 5" stroke="var(--a-b1)" stroke-width="2" fill="none"/>',
  marker:'<path d="M7 26l2-6 12-12 4 4-12 12z" fill="var(--a-g)"/><path d="M18 11l4 4 5-5-4-4z" fill="var(--a-e2)"/><path d="M7 26l2-6 4 4z" fill="var(--a-g2)"/><path d="M10 19l3 3" stroke="var(--a-g1)" stroke-width="2" fill="none"/>',
  glitter:aSp(12,13,9,'y')+aSp(24,8,5,'p')+aSp(23,23,6,'c')+aSp(8,26,3,'y1'),
  rainbow:'<path d="M4 25a12 12 0 0 1 24 0" stroke="var(--a-r)" stroke-width="3.4" fill="none"/><path d="M7.4 25a8.6 8.6 0 0 1 17.2 0" stroke="var(--a-y)" stroke-width="3.4" fill="none"/><path d="M10.8 25a5.2 5.2 0 0 1 10.4 0" stroke="var(--a-g)" stroke-width="3.4" fill="none"/><path d="M14.2 25a1.8 1.8 0 0 1 3.6 0" stroke="var(--a-b)" stroke-width="3" fill="none"/>',
  shiny:'<circle cx="16" cy="16" r="12" fill="var(--a-v)"/><path d="M16 28a12 12 0 0 0 12-12c0 6-6 10-12 10s-11-3-12-8a12 12 0 0 0 12 10z" fill="var(--a-v2)"/><ellipse cx="11.5" cy="10.5" rx="5" ry="3.4" fill="var(--a-v1)"/><circle cx="10" cy="10" r="1.8" fill="var(--a-w)"/>',
  erase:'<path d="M4 20l11-11 13 13-6 6h-9z" fill="var(--a-p)"/><path d="M4 20l7-7 9 9-6 6h-1z" fill="var(--a-b1)"/><path d="M4 20l7-7 2 2-7 7z" fill="var(--a-b)"/><path d="M13 28h15" stroke="var(--a-e2)" stroke-width="2" fill="none"/>',
  grid:'<rect x="4" y="4" width="11" height="11" rx="3" fill="var(--a-b)"/><rect x="17" y="4" width="11" height="11" rx="3" fill="var(--a-r)"/><rect x="4" y="17" width="11" height="11" rx="3" fill="var(--a-y)"/><rect x="17" y="17" width="11" height="11" rx="3" fill="var(--a-g)"/><path d="M6.5 8a2.5 2.5 0 0 1 2.5-2M19.5 8a2.5 2.5 0 0 1 2.5-2M6.5 21a2.5 2.5 0 0 1 2.5-2M19.5 21a2.5 2.5 0 0 1 2.5-2" stroke="var(--a-w)" stroke-width="1.6" fill="none" opacity=".8"/>',
  flower:'<circle cx="16" cy="7.5" r="5.5" fill="var(--a-p)"/><circle cx="24.5" cy="16" r="5.5" fill="var(--a-v1)"/><circle cx="16" cy="24.5" r="5.5" fill="var(--a-p)"/><circle cx="7.5" cy="16" r="5.5" fill="var(--a-v1)"/><circle cx="16" cy="16" r="5" fill="var(--a-y)"/><circle cx="14.5" cy="14.5" r="1.6" fill="var(--a-y1)"/>',
  window:'<path d="M5 29V14a11 11 0 0 1 22 0v15z" fill="var(--a-n)"/><path d="M8 27V14a8 8 0 0 1 16 0v13z" fill="var(--a-c)"/><path d="M16 6v21M8 16h16" stroke="var(--a-n)" stroke-width="2" fill="none"/><path d="M8 16V14a8 8 0 0 1 8-8v10z" fill="var(--a-r1)"/><path d="M16 16h8v11h-8z" fill="var(--a-y1)"/>',
  leaf:'<path d="M5 27C5 13 13 5 28 4c0 15-8 23-23 23z" fill="var(--a-o)"/><path d="M5 27C9 18 15 12 24 8" stroke="var(--a-o3)" stroke-width="2" fill="none"/><path d="M10 15c2 1 3 3 3 5M16 10c2 1 3 3 3 5" stroke="var(--a-o1)" stroke-width="1.8" fill="none"/>',
  fish:'<path d="M3 16c4-7 13-9 19-4l7-5v18l-7-5c-6 5-15 3-19-4z" fill="var(--a-o)"/><path d="M3 16c4 7 13 9 19 4" fill="var(--a-o2)"/><circle cx="9.5" cy="14" r="2" fill="var(--a-k)"/><path d="M14 11c1.5 3 1.5 7 0 10" stroke="var(--a-o1)" stroke-width="2" fill="none"/>',
  bfly:'<path d="M16 15C11 4 3 4 3 10s6 7 13 5z" fill="var(--a-v)"/><path d="M16 15c5-11 13-11 13-5s-6 7-13 5z" fill="var(--a-v)"/><path d="M16 17c-6-1-11 1-10 6s7 4 10-6zM16 17c6-1 11 1 10 6s-7 4-10-6z" fill="var(--a-p)"/><rect x="14.6" y="9" width="2.8" height="16" rx="1.4" fill="var(--a-k)"/>',
  bucket:'<path d="M6 11h20l-2.5 16h-15z" fill="var(--a-b)"/><path d="M6 11h20l-.6 4H6.6z" fill="var(--a-b2)"/><path d="M9 11a7 7 0 0 1 14 0" stroke="var(--a-e2)" stroke-width="2.2" fill="none"/><path d="M26 11c2 3 3 6 1 9" stroke="var(--a-r)" stroke-width="3" fill="none"/>',
  neon:'<rect x="2" y="2" width="28" height="28" rx="7" fill="var(--a-k)"/><path d="M7 22c4-12 9 2 18-12" stroke="var(--a-p)" stroke-width="5" fill="none" opacity=".45"/><path d="M7 22c4-12 9 2 18-12" stroke="var(--a-p1)" stroke-width="2.4" fill="none"/>',
  ribbon:'<rect x="2" y="2" width="28" height="28" rx="7" fill="var(--a-k)"/><path d="M5 20c4-8 7 6 11-2s7 6 11-2" stroke="var(--a-c1)" stroke-width="4" fill="none"/>',
  dots:'<rect x="2" y="2" width="28" height="28" rx="7" fill="var(--a-k)"/><circle cx="8" cy="22" r="2.6" fill="var(--a-y1)"/><circle cx="13" cy="15" r="2.6" fill="var(--a-g1)"/><circle cx="19" cy="17" r="2.6" fill="var(--a-c1)"/><circle cx="24" cy="10" r="2.6" fill="var(--a-p1)"/>',
  spark:'<rect x="2" y="2" width="28" height="28" rx="7" fill="var(--a-k)"/>'+aSp(13,14,7,'y1')+aSp(22,21,4,'p1')+aSp(22,9,2.6,'c1'),
  stars:'<rect x="2" y="2" width="28" height="28" rx="7" fill="var(--a-k)"/><path d="M11 6l1.8 3.8 4.2.5-3 2.9.8 4.1-3.8-2-3.8 2 .8-4.1-3-2.9 4.2-.5z" fill="var(--a-y1)"/><path d="M21 15l1.5 3 3.3.4-2.4 2.3.6 3.3-3-1.6-3 1.6.6-3.3-2.4-2.3 3.3-.4z" fill="var(--a-p1)"/>',
  move:'<path d="M16 3l5 5h-3.2v6.2H24V11l5 5-5 5v-3.2h-6.2V24H21l-5 5-5-5h3.2v-6.2H8V21l-5-5 5-5v3.2h6.2V8H11z" fill="var(--a-b)"/><circle cx="16" cy="16" r="2.6" fill="var(--a-b1)"/>',
  frame:'<rect x="3" y="4" width="26" height="24" rx="3" fill="var(--a-n)"/><rect x="7" y="8" width="18" height="16" fill="var(--a-c1)"/><path d="M7 24l6-8 4 5 3-3 5 6z" fill="var(--a-g)"/><circle cx="20" cy="12.5" r="2.4" fill="var(--a-y)"/>',
};
// symmetry: n spokes (1 = one line, no mirror copies)
const aSym=n=>`<circle cx="16" cy="16" r="13" fill="var(--a-v3)"/>`+(n==1?'<path d="M9 23L23 9" stroke="var(--a-v1)" stroke-width="3" fill="none"/>':
  Array.from({length:n},(_,i)=>{const a=i*2*Math.PI/n;return`<path d="M16 16L${(16+Math.sin(a)*10).toFixed(1)} ${(16-Math.cos(a)*10).toFixed(1)}" stroke="var(--a-v1)" stroke-width="${n>8?1.8:2.6}" fill="none"/>`}).join('')+'<circle cx="16" cy="16" r="2.6" fill="var(--a-y1)"/>');
function artIco(n,sz=30){const b=typeof n=='number'?aSym(n):AIC[n]||'';return`<svg class="art art-ic" viewBox="0 0 32 32" width="${sz}" height="${sz}" aria-hidden="true" focusable="false">${b}</svg>`}
// a palette button's picture: four of its own colours (artwork colours)
const palIco=p=>`<svg class="art-ic" viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false">${[[11,11],[21,11],[11,21],[21,21]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="7" fill="${PALS[p][[1,4,7,3][i]]}"/>`).join('')}</svg>`;

/* ---- fills: paint, shiny, glitter (as before) and G-ART2 crayon, marker, rainbow. A fill value is "<tool>:#rrggbb" ---- */
const ART_TOOLS=[['c','paint','Paint'],['k','crayon','Crayon'],['m','marker','Marker'],['s','glitter','Glitter'],['r','rainbow','Rainbow'],['g','shiny','Shiny'],['e','erase','Erase']];
function hueRot(c,d){let r=parseInt(c.slice(1,3),16)/255,g=parseInt(c.slice(3,5),16)/255,b=parseInt(c.slice(5,7),16)/255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;
  if(mx!=mn){const dd=mx-mn;s=l>.5?dd/(2-mx-mn):dd/(mx+mn);h=mx==r?(g-b)/dd+(g<b?6:0):mx==g?(b-r)/dd+2:(r-g)/dd+4;h*=60}
  s=Math.max(s,.55);const L=Math.min(.68,Math.max(.42,l));return`hsl(${Math.round((h+d)%360)},${Math.round(s*100)}%,${Math.round(L*100)}%)`}
function fillVal(v,defs){if(!v)return'#fff';const t=v[0],c=v.slice(2);if(t=='c'||!/^#[0-9a-f]{6}$/i.test(c))return/^#[0-9a-f]{6}$/i.test(c)?c:'#fff';
  const id={g:'gr',s:'gl',k:'cr',m:'mk',r:'rb'}[t]+c.slice(1);if(id.length<3)return c;
  if(!defs.has(id)){defs.add(id);defs.out.push(t=='g'?`<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${shade(c,.5)}"/><stop offset=".55" stop-color="${c}"/><stop offset="1" stop-color="${shade(c,-.35)}"/></linearGradient>`
    :t=='s'?`<pattern id="${id}" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="${c}"/><circle class="tw" cx="3" cy="4" r="1.3" fill="#fff" opacity=".9"/><circle cx="10" cy="9" r=".9" fill="#fff" opacity=".7"/><circle cx="6" cy="12" r=".7" fill="${shade(c,.6)}"/><circle class="tw tw2" cx="12" cy="2" r=".8" fill="${shade(c,.6)}"/></pattern>`
    :t=='k'?`<pattern id="${id}" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(28)"><rect width="7" height="7" fill="${c}"/><rect width="7" height="1.7" fill="${shade(c,.42)}" opacity=".75"/><rect y="3.9" width="7" height=".8" fill="${shade(c,-.3)}" opacity=".45"/><circle cx="2" cy="5.8" r=".55" fill="#fff" opacity=".85"/><circle cx="5.6" cy="2.6" r=".4" fill="#fff" opacity=".6"/></pattern>`
    :t=='m'?`<pattern id="${id}" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><rect width="9" height="9" fill="${c}"/><rect x="6.6" width="2.4" height="9" fill="${shade(c,-.2)}" opacity=".55"/><rect x="2.2" width="1" height="9" fill="${shade(c,.25)}" opacity=".6"/></pattern>`
    :`<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">${[0,60,120,180,240,300].map((d,i)=>`<stop offset="${(i/5).toFixed(2)}" stop-color="${hueRot(c,d)}"/>`).join('')}</linearGradient>`)}return`url(#${id})`}
function artSVG(regs,fills,o={}){const defs=new Set();defs.out=[];const body=regs.map((r,i)=>r.ov?`<path d="${r.d}" fill="none" stroke="#1c1917" stroke-width="2.2" stroke-linejoin="round" pointer-events="none"/>`:`<path d="${r.d}" ${r.t?`transform="${r.t}"`:''} data-i="${i}" ${r.fix?'pointer-events="none"':''} fill="${r.fix&&!fills[i]?r.fix:fillVal(fills[i],defs)}" stroke="${o.glass?'#1c1917':'#27272a'}" stroke-width="${o.sw||(o.glass?2.6:1.1)}" stroke-linejoin="round"/>`).join('');
  return`<svg viewBox="${o.vb||'0 0 300 300'}" ${o.id?`id="${o.id}"`:''} class="${o.cls||''}"${o.hide?' aria-hidden="true" focusable="false"':''}><defs>${defs.out.join('')}${o.glass?'<radialGradient id="glow" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>':''}</defs>${body}${o.glass?'<rect width="300" height="300" fill="url(#glow)" pointer-events="none"/>':''}</svg>`}
const artName=k=>{const[t,v]=String(k).split(':');if(t=='px'){const p=CB_PICS.find(x=>x[0]==v);return p?p[1]:'Pixel picture'}
  return t=='m'?'Mandala':t=='g'?'Rose Window':t=='p'?(POLYART[v]||{n:'Animal'}).n:(SHAPES.find(x=>x[0]==v)||[0,'Picture'])[1]};

/* ---- compact data: fills as a palette + one letter a piece; Neon points as two letters a number ---- */
const AB=(()=>{let s='';for(let c=35;c<127;c++)if(c!=92&&c!=46)s+=String.fromCharCode(c);return s})(); // 90 letters, no \ or .
function artPack(f,n){const p=[],ix={},out=[];for(let i=0;i<n;i++){const v=f[i];if(!v){out.push(-1);continue}if(!(v in ix)){ix[v]=p.length;p.push(v)}out.push(ix[v])}
  const w=p.length>AB.length?2:1,enc=k=>k<0?'.'.repeat(w):w==1?AB[k]:AB[k/AB.length|0]+AB[k%AB.length];return{p,w,s:out.map(enc).join('').replace(/\.+$/,'')}}
function artUnpack(d){const f={};if(!d||typeof d.s!='string'||!Array.isArray(d.p))return f;const w=d.w==2?2:1;
  for(let i=0;i*w<d.s.length;i++){const q=d.s.substr(i*w,w);if(q[0]=='.')continue;const k=w==1?AB.indexOf(q):AB.indexOf(q[0])*AB.length+AB.indexOf(q[1]);if(k>=0&&d.p[k]!=null)f[i]=d.p[k]}return f}
const nEnc=v=>{const q=Math.max(0,Math.min(8099,Math.round(v*8099)));return AB[q/90|0]+AB[q%90]};
const nDec=(s,i)=>(AB.indexOf(s[i])*90+AB.indexOf(s[i+1]))/8099;
const pxBits=f=>f.every(c=>c=='1')?'all':Array.from({length:Math.ceil(f.length/4)},(_,i)=>parseInt(f.slice(i*4,i*4+4).map(c=>c=='1'?1:0).join('').padEnd(4,'0'),2).toString(16)).join('');
const pxUnbits=(d,n=CBN*CBN)=>d==='all'?Array(n).fill('1'):Array.from({length:n},(_,i)=>(parseInt((d||'')[i>>2]||'0',16)>>(3-(i&3)))&1?'1':'0');

/* ---- the gallery ---- */
const GAL_MAX=30,GAL_HEARTS=24,ART_PTS=3000;
function galTrim(s){while(s.gal.length>GAL_MAX){let j=-1;for(let q=s.gal.length-1;q>=0;q--)if(!s.gal[q].h){j=q;break}if(j<0)break;s.gal.splice(j,1)}}
// add (newest first); the same picture again (a page, a number picture, pixel art) replaces its older copy and keeps its heart
function galAdd(e){const s=stS();e.i=s.gi=(+s.gi||0)+1;e.t=Date.now();e.h=0;
  if(e.v&&e.k!='n'&&e.k!='ni'&&e.k!='fp'){const j=s.gal.findIndex(x=>x.v==e.v&&x.k==e.k);if(j>=0){e.h=s.gal[j].h||0;s.gal.splice(j,1)}}
  s.gal.unshift(e);galTrim(s);return e}
const galGet=i=>stS().gal.find(e=>e.i==i);
// a heart keeps a picture when the gallery is full; false when GAL_HEARTS pictures already have one
function galHeart(i){const s=stS(),e=galGet(i);if(!e)return false;if(!e.h&&s.gal.filter(x=>x.h).length>=GAL_HEARTS)return false;e.h=e.h?0:1;save();return true}
function galDel(i){const s=stS(),n=s.gal.length;s.gal=s.gal.filter(e=>e.i!=i);save();return s.gal.length<n}
// the Neon pictures of the old separate store (P5-10: per child) move into the gallery once, each kept with a heart; the old
// store is not changed (an older cached app still finds them). Returns how many moved.
function artNeonMigrate(){const s=stS();if(s.nm)return 0;let g=[];try{g=JSON.parse(localStorage.getItem(PRF.k('starschool-neon'))||'[]')}catch(e){g=[]}
  if(!Array.isArray(g))g=[];const add=g.filter(x=>typeof x=='string'&&/^data:image\//.test(x)),t0=Date.now()-add.length*1000;
  add.slice().reverse().forEach((d,j)=>{s.gal.unshift({i:s.gi=(+s.gi||0)+1,k:'ni',v:'',n:'Neon drawing',t:t0+j*1000,h:1,d})});
  s.nm=1;save();return add.length}
// moved pictures were 360 px JPEGs (tens of KB each): make big ones smaller (288 px WebP, or JPEG where WebP cannot be made)
function artNeonShrink(){const s=stS(),big=s.gal.filter(e=>e.k=='ni'&&typeof e.d=='string'&&e.d.length>24000&&!e.sm);
  big.forEach(e=>{const im=new Image();im.onload=()=>{try{const c=document.createElement('canvas');c.width=c.height=288;c.getContext('2d').drawImage(im,0,0,288,288);
    let u=c.toDataURL('image/webp',.82);if(!/^data:image\/webp/.test(u))u=c.toDataURL('image/jpeg',.8);e.sm=1;if(u.length<e.d.length)e.d=u;save()}catch(_){}};im.src=e.d})}

/* ---- picture packs, stars, today's picture, next goal ---- */
const ART_PACKS=[
  {id:'animals',n:'Animal Friends',ic:'paw',need:0,pics:['px:cat','sh:elephant','px:penguin','p:fox','sh:lion','px:fish']},
  {id:'ocean',n:'Under the Sea',ic:'fish',need:4,pics:['px:octopus','sh:whale','px:crab','sh:turtle','px:jelly','sh:clownfish']},
  {id:'go',n:'Things That Go',ic:'car',need:8,pics:['px:car','px:train','px:boat','px:plane','px:truck','px:rocket']},
  {id:'space',n:'Into Space',ic:'rocket',need:13,pics:['px:planet','sh:rocket','px:ufo','px:moon','px:star','m:512']},
  {id:'seasons',n:'Four Seasons',ic:'leaf',need:18,pics:['px:tulip','px:sun','px:umbrella','px:leaf','px:pumpkin','px:snowman']},
  {id:'wild',n:'Wild Animals',ic:'paw',need:24,pics:['p:lion','p:tiger','p:wolf','sh:dino','p:eagle','sh:owl']},
  {id:'wings',n:'Wings and Bugs',ic:'bfly',need:30,pics:['sh:butterfly','px:ladybug','sh:parrot','p:owl','sh:peacock','sh:eagle']},
  {id:'glass',n:'Patterns and Windows',ic:'window',need:36,pics:['m:3','g:5','m:42','g:64','m:256','g:130']}];
const ART_ALL=ART_PACKS.flatMap(p=>p.pics);
// a picture is done: finished with Done (G-ART2), or a number or pixel picture finished before
function artIsDone(k){const s=stS();if(s.done[k])return true;const[t,v]=k.split(':');return t=='px'?!!cbS().done[v]:t=='sh'?!!shS().done[v]:false}
const artStars=()=>ART_ALL.filter(artIsDone).length;
const artPackOpen=(p,st=artStars())=>st>=p.need;
const artPackOf=k=>ART_PACKS.find(p=>p.pics.includes(k));
// new pixel pictures are seen once their pack is open (the twelve first ones are always open)
const cbOpen=id=>CB_PICS.findIndex(x=>x[0]==id)<12||ART_PACKS.some(p=>p.pics.includes('px:'+id)&&artPackOpen(p));
function artHash(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)>>>0}return h}
// today's picture: from the date only (the same all day on every tablet); a mandala, a rose window or a pack picture
function artDaily(d){const h=artHash('art'+d),kd=h%3,seed=1000+(h>>>4)%90000,key=kd==0?'m:'+seed:kd==1?'g:'+seed:ART_ALL[(h>>>3)%ART_ALL.length];return{key,n:artName(key)}}
function artNextGoal(){const st=artStars(),s=stS();
  for(const p of ART_PACKS){if(!artPackOpen(p,st))return`${p.need-st} more star${p.need-st==1?'':'s'} open the ${p.n} pack.`;const k=p.pics.find(q=>!artIsDone(q));
    if(k)return`Finish the ${artName(k)} in ${p.n} (${p.pics.filter(artIsDone).length} of ${p.pics.length}).`}
  return s.day!=today()?`Every pack is full! Try today's picture: ${artDaily(today()).n}.`:'Every pack is full! Make anything you like.'}
const artHubLine=()=>`<span>${ico('star',18)}<b>${artStars()}</b> of ${ART_ALL.length} stars</span><span>${stS().gal.length} in the gallery</span>`;
// Done: keep the picture, give its star, the day's bonus. o: {k kind, key, n name, d data, star, coins}. Returns what happened.
function artDone(o){const s=stS(),st0=artStars(),first=!!(o.star&&o.key&&ART_ALL.includes(o.key)&&!artIsDone(o.key));let daily=false;
  if(o.star&&o.key)s.done[o.key]=1;const e=galAdd({k:o.k,v:o.key||'',n:o.n||'My picture',d:o.d});
  let coins=o.coins||0;const day=today();if(o.star&&o.key&&o.key==artDaily(day).key&&s.day!=day){s.day=day;coins+=3;daily=true}
  if(first&&!o.coins)coins+=2;S.coins+=coins;const st=artStars(),opened=ART_PACKS.find(p=>p.need>st0&&p.need<=st)||null;save();
  return{e,first,daily,coins,stars:st,opened}}

/* ---- celebration: drawn sparkles over the picture (none in calm mode or with reduced motion), then the shared end card ---- */
const artCalm=()=>S.calm||(typeof matchMedia=='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches);
function artSparkle(el,then){if(artCalm()||!el){then();return}const r=el.getBoundingClientRect(),o=document.createElement('div');o.className='art-spk';o.setAttribute('aria-hidden','true');
  o.style.cssText=`left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px`;const C=['y','y1','p1','c1','w'];
  o.innerHTML=Array.from({length:14},(_,i)=>{const x=8+((i*37)%84),y=6+((i*53)%86),z=10+(i%4)*7;return`<svg class="art" viewBox="-10 -10 20 20" style="left:${x}%;top:${y}%;width:${z}px;height:${z}px;animation-delay:${(i%7)*60}ms">${aSp(0,0,9,C[i%5])}</svg>`}).join('');
  document.body.appendChild(o);SFX.magic();setTimeout(()=>{o.remove();then()},900)}
// the finished picture in a frame with a shine
const artFrame=h=>`<div class="art-frame">${h}<span class="art-shine" aria-hidden="true"></span></div>`;
function artEnd(res,o){const lines=[];if(res.opened)lines.push(['gift',`The <b>${esc(res.opened.n)}</b> pack is open!`]);
  if(!res.first&&o.star===false&&o.why)lines.push(['hint',esc(o.why)]);lines.push(['target',esc(artNextGoal())]);
  const c=GH.end('art',{win:true,made:true,pic:artFrame(o.pic),title:res.first?`You finished the ${o.n}!`:res.daily?`You made today's picture!`:'Into your gallery!',tag:res.first?'New star!':res.daily?"Today's picture":'',
    stats:[res.coins?['+'+res.coins,'coins','coin']:null,[res.stars+' / '+ART_ALL.length,'stars','star']],lines,
    btns:(o.keep?UI.btn('Keep coloring',{icon:'palette',id:'akeep',wide:true}):'')+UI.btn('My gallery',{icon:'image',id:'agal',wide:true})+UI.btn('More pictures',{kind:'primary',size:'lg',icon:'play',id:'amore',wide:true})});
  if(S.voice)say(res.first?`Beautiful! You finished the ${o.n}!`:'Beautiful! It is in your gallery.');
  c.querySelector('#amore').onclick=()=>{c.remove();gtStop();artMusic(false);artBack()};c.querySelector('#agal').onclick=()=>{c.remove();gtStop();artMusic(false);colorMenu('gallery')};
  const k=c.querySelector('#akeep');if(k)k.onclick=()=>{c.remove();SFX.pop(2)};return c}
// where Quit and More pictures go: the menu the picture was opened from
let ART_BACK=null;const artBack=()=>{const b=ART_BACK;if(b)b();else colorMenu()};

/* ---- gentle music while drawing: off unless the child turns it on; never with Sound effects or Music off, or in calm mode ---- */
let ART_MT=null;
function artMusicOk(){return S.sound&&S.music!==false&&!S.calm}
function artMusic(on){clearInterval(ART_MT);ART_MT=null;if(!on||!artMusicOk())return;let i=0;const sc=[67,69,72,74,76,79,81],bs=[48,45,41,43];
  ART_MT=setInterval(()=>{if(!document.querySelector('.gh-top[data-g="art"]')||!artMusicOk()){artMusic(false);return}if(GH.held||document.hidden)return;
    if(i%8==0)tone(NOTE(bs[(i/8|0)%4]),1.6,0,'sine',.035);if(i%2==0&&(i*7)%5!=3)tone(NOTE(sc[(i*5+(i>>3))%sc.length]),.5,0,'sine',.025);i++},330)}
function artMusicTool(){return GH.tool('music','Music','amus',!!(stS().mu&&artMusicOk()))}
function artMusicWire(){const b=$('#amus');if(!b)return;if(stS().mu)artMusic(true);
  b.onclick=()=>{if(!artMusicOk()){fb(S.calm?'Calm mode is on, so there is no music.':'Sound or music is off in Grown-ups.','warn',2200);return}
    const s=stS();s.mu=s.mu?0:1;save();b.classList.toggle('on',!!s.mu);b.setAttribute('aria-pressed',String(!!s.mu));artMusic(!!s.mu);fb(s.mu?'Music on':'Music off','ok',1000)}}

/* ---- a colouring page (mandala, rose window, animal) ---- */
const artBarHTML=(pal,mode,done=true)=>`<div class="stmodes art-tools" role="group" aria-label="Paint tools">${ART_TOOLS.map(([m,ic,l])=>`<button class="btn sm art-tool ${m==mode?'on':''}" data-md="${m}" aria-label="${l}" aria-pressed="${m==mode}" title="${l}">${artIco(ic)}</button>`).join('')}</div>
    <div class="stpals" role="group" aria-label="Colour sets">${Object.keys(PALS).map(p=>`<button class="btn sm stp ${p==pal?'on':''}" data-p="${p}" aria-label="${p} colours" aria-pressed="${p==pal}">${palIco(p)}</button>`).join('')}</div>
    <div class="stcols" id="stcols"></div>${done?UI.btn('Done',{kind:'primary',size:'lg',icon:'check',id:'adone',cls:'art-done'}):''}`;
function artPage(key){const regs=artRegs(key),st=stS(),it=st.items[key]||{f:{}},fills=Object.assign({},it.f),glass=key[0]=='g';
  let pal=palKey(st.pal),col=PALS[pal][2],mode='c',mirror=key[0]=='m'||key[0]=='g',undo=[],vb=[0,0,300,300];
  view(`${GH.top('art',{play:true,sub:artName(key),tools:GH.tool('undo','Undo','aundo')+(key[0]=='m'||key[0]=='g'?GH.tool('flip','Mirror fill','amir',true):'')+GH.tool('eye','Zoom','azr')+artMusicTool()})}
   <div class="stwrap"><div class="stcv" id="stw"></div><div class="stbar">${artBarHTML(pal,mode)}</div></div>`);
  const w=$('#stw');w.innerHTML=artSVG(regs,fills,{id:'stsvg',glass,sw:key[0]=='p'?.7:undefined});const svg=$('#stsvg');svg.setAttribute('role','img');svg.setAttribute('aria-label','Your picture: tap a shape to color it');
  const setVB=()=>svg.setAttribute('viewBox',vb.map(v=>v.toFixed(1)).join(' '));
  const cols=()=>{$('#stcols').innerHTML=PALS[pal].map((c,i)=>`<button class="btn stc ${c==col?'on':''}" data-c="${c}" style="--cc:${c}" aria-label="Colour ${i+1}"></button>`).join('');$$('.stc').forEach(b=>b.onclick=()=>{col=b.dataset.c;if(mode=='e')setMode('c');$$('.stc').forEach(q=>q.classList.toggle('on',q==b));SFX.pop(1)})};cols();
  const setMode=m=>{mode=m;$$('[data-md]').forEach(b=>{b.classList.toggle('on',b.dataset.md==m);b.setAttribute('aria-pressed',String(b.dataset.md==m))})};
  $$('[data-md]').forEach(b=>b.onclick=()=>{setMode(b.dataset.md);SFX.pop(2)});
  $$('[data-p]').forEach(b=>b.onclick=()=>{pal=b.dataset.p;st.pal=pal;col=PALS[pal][2];$$('[data-p]').forEach(q=>{q.classList.toggle('on',q==b);q.setAttribute('aria-pressed',String(q==b))});cols();SFX.pop(3)});
  const persist=()=>{st.items[key]={f:fills,t:Date.now()};st.order=[key,...st.order.filter(k=>k!=key)].slice(0,24);for(const k in st.items)if(!st.order.includes(k))delete st.items[k];save()};
  const paintOne=(i,v)=>{const p=svg.querySelector(`path[data-i="${i}"]`);if(!p)return;if(v)fills[i]=v;else delete fills[i];
    const defs=new Set([...svg.querySelectorAll('defs > *')].map(e=>e.id));defs.out=[];p.setAttribute('fill',regs[i].fix&&!v?regs[i].fix:fillVal(v,defs));if(defs.out.length)svg.querySelector('defs').insertAdjacentHTML('beforeend',defs.out.join(''));
    p.classList.remove('popfill');void p.getBBox();p.classList.add('popfill')};
  const tap=(t,sw)=>{const i=+t.dataset.i,v=mode=='e'?null:mode+':'+col,grp=mirror?regs.map((r,j)=>r.g==regs[i].g?j:-1).filter(j=>j>=0):[i];
    undo.push(grp.map(j=>[j,fills[j]||null]));if(undo.length>60)undo.shift();grp.forEach(j=>paintOne(j,v));
    if(sw){if(!tap.lt||performance.now()-tap.lt>60){tap.lt=performance.now();tone(500+((i*37)%9)*60,.05,0,'sine',.07)}}else if(mode=='s'||mode=='r'){SFX.magic()}else tone(380+((i*37)%9)*70,.09,0,'sine',.12);clearTimeout(tap.pt);tap.pt=setTimeout(persist,250)};
  // pointer: tap = fill, drag = paint many, pinch = zoom
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
  if($('#amir'))$('#amir').onclick=e=>{mirror=!mirror;e.currentTarget.classList.toggle('on',mirror);e.currentTarget.setAttribute('aria-pressed',String(mirror));fb(mirror?'Mirror ON: one tap colors every matching piece':'Mirror OFF: color one piece at a time','ok',1800)};
  // Done: a third of the pieces colored wins the picture's star (a pack picture or today's); always kept in the gallery
  $('#adone').onclick=()=>{const n=regs.filter(r=>!r.fix&&!r.ov).length,f=regs.filter((r,i)=>!r.fix&&!r.ov&&fills[i]).length;
    if(!f){fb('Color a piece first, then tap Done.','warn',2000);return}persist();const star=f*3>=n;
    artSparkle(w,()=>{const res=artDone({k:'v',key,n:artName(key),d:artPack(fills,regs.length),star});
      artEnd(res,{n:artName(key),star,keep:true,why:`Color ${Math.ceil(n/3)-f} more pieces to win its star.`,pic:artSVG(regs,fills,{glass,hide:true,sw:key[0]=='p'?.7:undefined})})})};
  const size=()=>{const r=w.parentNode.getBoundingClientRect(),land=innerWidth>innerHeight,bh=land?12:($('.stbar')||{offsetHeight:150}).offsetHeight+16,s=Math.min(land?r.width-250:r.width-12,r.height-bh);w.style.width=w.style.height=Math.max(200,s)+'px'};size();
  let rs;addEventListener('resize',()=>{clearTimeout(rs);rs=setTimeout(()=>{if($('#stw'))size()},120)});
  GH.wire({quit:()=>{gtStop();artMusic(false);artBack()}});artMusicWire();
  gtStart('#gtm',()=>timeUpOverlay());if(S.voice&&!it.t)setTimeout(()=>say(key[0]=='m'?'Pick colors and make it beautiful!':'Tap to color!'),300)}

/* ---- Neon Kaleidoscope: strokes are kept (points 0..1), so the drawing can be undone, saved small and played back glowing ---- */
const NEON_BR=[['neon','neon','Neon'],['rainbow','rainbow','Rainbow'],['spark','spark','Sparkle'],['ribbon','ribbon','Ribbon'],['stars','stars','Stars'],['dots','dots','Dots']];
const NEON_SY=[1,2,4,6,8,12,16];
// draw segment k of stroke st on x (a square canvas of S pixels); live: the real glow (shadowBlur), else a cheaper drawn glow
function neonSeg(x,S,st,k,live){const P=st.P;if(!P.length)return;const a=P[Math.max(0,k-1)],b=k?P[k]:[P[0][0]+.0004,P[0][1]];
  const hh=(st.h+(st.b=='rainbow'?3*k:st.b=='ribbon'?k:0))%360,col=`hsl(${hh},100%,60%)`,c=S/2,lw=Math.max(1,st.z*S),R=rng(st.r*4099+k*31+7),bl=S*.04;
  x.lineCap='round';x.lineJoin='round';
  for(let q=0;q<st.y;q++)for(const m of(st.m&&st.y>1?[1,-1]:[1])){x.save();x.translate(c,c);x.rotate(q*2*Math.PI/st.y);x.scale(m,1);
    const ax=a[0]*S-c,ay=a[1]*S-c,bx=b[0]*S-c,by=b[1]*S-c;
    if(st.b=='spark'){for(let i=0;i<3;i++){const rr=R()*lw*1.4,px=bx+(R()-.5)*lw*3,py=by+(R()-.5)*lw*3;x.fillStyle=`hsl(${hh},100%,${70+R()*25}%)`;
        if(live){x.shadowColor=col;x.shadowBlur=bl*.75}else{x.globalAlpha=.3;x.beginPath();x.arc(px,py,rr*.9+2,0,7);x.fill();x.globalAlpha=1}x.beginPath();x.arc(px,py,rr*.4+1,0,7);x.fill()}}
    else if(st.b=='stars'||st.b=='dots'){if(k%(st.b=='stars'?3:2)==0){const r=st.b=='stars'?lw*1.3+2:lw*.6+1;x.fillStyle=col;x.beginPath();
        if(st.b=='stars')for(let i=0;i<10;i++){const rr=i%2?r*.45:r,an=-Math.PI/2+i*Math.PI/5;x.lineTo(bx+Math.cos(an)*rr,by+Math.sin(an)*rr)}else x.arc(bx,by,r,0,7);x.closePath();
        if(live){x.shadowColor=col;x.shadowBlur=bl;x.fill()}else{x.globalAlpha=.3;x.lineWidth=r;x.strokeStyle=col;x.stroke();x.globalAlpha=1;x.fill()}x.shadowBlur=0;x.fillStyle='#ffffffcc';x.beginPath();x.arc(bx,by,r*.3,0,7);x.fill()}}
    else{const w2=lw*(st.b=='ribbon'?1.8:1);x.beginPath();x.moveTo(ax,ay);x.lineTo(bx,by);x.strokeStyle=col;
      if(live){x.shadowColor=col;x.shadowBlur=st.b=='ribbon'?bl*.25:bl;x.lineWidth=w2;x.stroke()}else{x.globalAlpha=.22;x.lineWidth=w2*2.6;x.stroke();x.globalAlpha=1;x.lineWidth=w2;x.stroke()}
      x.shadowBlur=0;x.strokeStyle='#ffffffcc';x.lineWidth=Math.max(1,w2*.3);x.stroke()}
    x.restore()}}
function neonBg(x,S){x.fillStyle='#05010f';x.fillRect(0,0,S,S)}
function neonAll(x,S,strokes){neonBg(x,S);for(const st of strokes)for(let k=0;k<st.P.length;k++)neonSeg(x,S,st,k,false)}
const neonEnc=strokes=>strokes.map(st=>({b:st.b,h:Math.round(st.h),z:+st.z.toFixed(4),y:st.y,m:st.m?1:0,r:st.r,p:st.P.map(([a,b])=>nEnc(a)+nEnc(b)).join('')}));
const neonDec=d=>((d&&d.s)||[]).filter(s=>s&&typeof s.p=='string').map(s=>({b:s.b||'neon',h:+s.h||0,z:+s.z||.015,y:+s.y||1,m:s.m?1:0,r:+s.r||1,P:Array.from({length:s.p.length>>2},(_,i)=>[nDec(s.p,i*4),nDec(s.p,i*4+2)])}));
// play strokes back slowly on canvas cv (calm mode and reduced motion: all at once); returns a stop function
function neonReplay(cv,strokes,done){const x=cv.getContext('2d'),S0=cv.width;neonBg(x,S0);const segs=[];strokes.forEach(st=>st.P.forEach((_,k)=>segs.push([st,k])));
  if(artCalm()){neonAll(x,S0,strokes);if(done)done();return()=>{}}
  let i=0,on=true;const per=Math.max(1,Math.ceil(segs.length/420));
  const f=()=>{if(!on||!cv.isConnected)return;for(let j=0;j<per&&i<segs.length;j++,i++)neonSeg(x,S0,segs[i][0],segs[i][1],true);if(i<segs.length)requestAnimationFrame(f);else if(done)done()};requestAnimationFrame(f);return()=>{on=false}}
const neonBarHTML=(sym,mir,brush,size)=>`<div class="stmodes art-tools" role="group" aria-label="Mirror copies">${NEON_SY.map(n=>`<button class="btn sm art-tool ${n==sym?'on':''}" data-sy="${n}" aria-label="${n==1?'No copies':n+' copies'}" aria-pressed="${n==sym}">${artIco(n)}</button>`).join('')}</div>
    <div class="stmodes art-tools" role="group" aria-label="Brushes">${NEON_BR.map(([k,ic,l])=>`<button class="btn sm art-tool ${k==brush?'on':''}" data-br="${k}" aria-label="${l} brush" aria-pressed="${k==brush}">${artIco(ic)}</button>`).join('')}</div>
    <div class="stmodes">${[3,6,11,18].map((z,i)=>`<button class="btn sm ${z==size?'on':''}" data-sz="${z}" aria-label="Brush size ${i+1}" aria-pressed="${z==size}"><span class="art-dot" style="width:${z+4}px;height:${z+4}px"></span></button>`).join('')}${[0,50,120,190,280,320].map((h,i)=>`<button class="btn stc" data-h="${h}" style="--cc:hsl(${h},100%,55%)" aria-label="Colour ${i+1}"></button>`).join('')}</div>
    ${UI.btn('Done',{kind:'primary',size:'lg',icon:'check',id:'adone',cls:'art-done'})}`;
function neonDraw(){let sym=8,brush='neon',hue=Math.random()*360,size=6,mirror=true,saved=true;const strokes=[],snaps=[];
  view(`${GH.top('art',{play:true,sub:'Neon Draw',tools:GH.tool('undo','Undo','nundo')+GH.tool('flip','Mirror','nmir',true)+GH.tool('trash','Clear','nclr')+GH.tool('replay','Glow replay','nrep')+artMusicTool()})}
   <div class="stwrap"><div class="stcv neon" id="nw"><canvas id="ncv" role="img" aria-label="Your drawing"></canvas></div><div class="stbar">${neonBarHTML(sym,mirror,brush,size)}</div></div>`);
  const w=$('#nw'),cv=$('#ncv'),x=cv.getContext('2d'),dpr=Math.min(2,devicePixelRatio||1);let S0=0,cur=null,stopR=null;
  const size_=()=>{const r=w.parentNode.getBoundingClientRect(),land=innerWidth>innerHeight,bh=land?12:($('.stbar')||{offsetHeight:170}).offsetHeight+16,s=Math.max(200,Math.min(land?r.width-250:r.width-12,r.height-bh));
    w.style.width=w.style.height=s+'px';cv.width=cv.height=Math.round(s*dpr);S0=cv.width;snaps.length=0;neonAll(x,S0,strokes)};size_();
  const pos=e=>{const r=cv.getBoundingClientRect();return[Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)),Math.max(0,Math.min(1,(e.clientY-r.top)/r.height))]};
  cv.addEventListener('pointerdown',e=>{e.preventDefault();if(stopR){stopR();stopR=null;neonAll(x,S0,strokes)}cv.setPointerCapture(e.pointerId);
    try{const c=document.createElement('canvas');c.width=c.height=S0;c.getContext('2d').drawImage(cv,0,0);snaps.push(c);if(snaps.length>3)snaps.shift()}catch(_){}
    cur={b:brush,h:hue,z:size/(cv.getBoundingClientRect().width||300),y:sym,m:mirror?1:0,r:R(1,99999),P:[pos(e)]};strokes.push(cur);neonSeg(x,S0,cur,0,true);saved=false});
  cv.addEventListener('pointermove',e=>{if(!cur)return;const p=pos(e),l=cur.P[cur.P.length-1];if(Math.hypot(p[0]-l[0],p[1]-l[1])<.004)return;cur.P.push(p);neonSeg(x,S0,cur,cur.P.length-1,true);
    if(brush=='rainbow')hue=(hue+3)%360;else if(brush=='ribbon')hue=(hue+1)%360});
  const end=()=>{if(cur&&cur.b=='rainbow'||cur&&cur.b=='ribbon')hue=(cur.h+(cur.b=='rainbow'?3:1)*cur.P.length)%360;cur=null};cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);
  const pk=(sel,f)=>$$(sel).forEach(b=>b.onclick=()=>{f(b);$$(sel).forEach(q=>{q.classList.toggle('on',q==b);q.setAttribute('aria-pressed',String(q==b))})});
  pk('[data-sy]',b=>{sym=+b.dataset.sy;SFX.pop(2)});
  $('#nmir').onclick=e=>{mirror=!mirror;e.currentTarget.classList.toggle('on',mirror);e.currentTarget.setAttribute('aria-pressed',String(mirror));SFX.pop(1)};
  pk('[data-br]',b=>{brush=b.dataset.br;SFX.pop(3)});pk('[data-sz]',b=>{size=+b.dataset.sz;SFX.pop(1)});
  $$('[data-h]').forEach(b=>b.onclick=()=>{hue=+b.dataset.h;if(brush=='rainbow'){brush='neon';$$('[data-br]').forEach(q=>{q.classList.toggle('on',q.dataset.br=='neon');q.setAttribute('aria-pressed',String(q.dataset.br=='neon'))})}SFX.pop(2)});
  $('#nclr').onclick=()=>{if(!strokes.length)return;strokes.length=0;snaps.length=0;neonBg(x,S0);SFX.whoosh();saved=true};
  $('#nundo').onclick=()=>{if(!strokes.length)return;strokes.pop();const s=snaps.pop();if(s){neonBg(x,S0);x.drawImage(s,0,0)}else neonAll(x,S0,strokes);SFX.del();saved=!strokes.length};
  $('#nrep').onclick=()=>{if(!strokes.length){fb('Draw something first!','warn',1500);return}if(stopR)stopR();SFX.whoosh();stopR=neonReplay(cv,strokes,()=>{stopR=null})};
  // keep: strokes when small enough (they can be played back), else a 288 px picture
  const keep=()=>{const pts=strokes.reduce((a,s)=>a+s.P.length,0);let d,k='n';
    if(pts<=ART_PTS)d={v:1,s:neonEnc(strokes)};else{const c=document.createElement('canvas');c.width=c.height=288;c.getContext('2d').drawImage(cv,0,0,288,288);d=c.toDataURL('image/webp',.8);if(!/^data:image\/webp/.test(d))d=c.toDataURL('image/jpeg',.8);k='ni'}
    saved=true;return{k,d}};
  const autoKeep=()=>{if(!saved&&strokes.length>2){const q=keep();galAdd({k:q.k,v:'',n:'Neon drawing',d:q.d});save()}};
  $('#adone').onclick=()=>{if(!strokes.length){fb('Draw something first, then tap Done.','warn',2000);return}const q=keep();
    artSparkle(w,()=>{const res=artDone({k:q.k,n:'Neon drawing',d:q.d,star:false});const im=cv.toDataURL('image/png');artEnd(res,{n:'Neon drawing',keep:true,pic:`<img src="${im}" alt="">`})})};
  let rs;addEventListener('resize',()=>{clearTimeout(rs);rs=setTimeout(()=>{if($('#ncv'))size_()},150)});
  GH.wire({quit:()=>{autoKeep();gtStop();artMusic(false);colorMenu('neon')}});artMusicWire();
  gtStart('#gtm',()=>{autoKeep();timeUpOverlay()})}

/* ---- pictures of gallery entries (thumbnails and the big view) ---- */
const NEON_TH=new Map();
function galPic(e,big){try{
  if(e.k=='v'){const regs=artRegs(e.v);return artSVG(regs,artUnpack(e.d),{glass:e.v[0]=='g',hide:true,sw:e.v[0]=='p'?(big?.7:.5):e.v[0]=='g'?(big?2.6:2):big?1.1:.8})}
  if(e.k=='sh'){const d=shData(e.v.slice(3)),f=artUnpack(e.d),h={};for(const i in f)h[i]=f[i].slice(2);return shSVG(d,h,{thin:!big}).replace('<svg','<svg aria-hidden="true" focusable="false"')}
  if(e.k=='px'){const d=cbData(e.v.slice(3));return`<img src="${pxImg(d.G,pxUnbits(e.d),big?320:160)}" alt="">`}
  if(e.k=='fp'){const G=String(e.d||'').split('').map(c=>FP_COLS[AB.indexOf(c)]||'blanco');return`<img class="px" src="${cbThumb(G,true,big?320:160)}" alt="">`}
  if(e.k=='ni')return`<img src="${typeof e.d=='string'&&/^data:image\//.test(e.d)?e.d:''}" alt="">`;
  if(e.k=='n'){const key=e.i+(big?'b':'');if(!NEON_TH.has(key)){const c=document.createElement('canvas');c.width=c.height=big?360:180;neonAll(c.getContext('2d'),c.width,neonDec(e.d));NEON_TH.set(key,c.toDataURL('image/png'))}return`<img src="${NEON_TH.get(key)}" alt="">`}
}catch(_){}return''}
// pixel art as beads (finished squares) on a light board
function pxImg(G,fill,size=160,tint){const c=document.createElement('canvas');c.width=c.height=size;const x=c.getContext('2d'),s=size/CBN;x.fillStyle='#f5f5f4';x.fillRect(0,0,size,size);
  G.forEach((k,i)=>{const cx=(i%CBN)*s,cy=Math.floor(i/CBN)*s;if(fill[i]=='1')pxBead(x,cx,cy,s,CB_COL[k][0]);else{x.fillStyle=tint?shade(CB_COL[k][0],.72):'#fff';x.fillRect(cx+.5,cy+.5,s-1,s-1)}});return c.toDataURL()}
function pxBead(x,cx,cy,s,c){const r=s*.2,g=Math.max(.6,s*.04);x.fillStyle=c;x.beginPath();if(x.roundRect)x.roundRect(cx+g,cy+g,s-2*g,s-2*g,r);else x.rect(cx+g,cy+g,s-2*g,s-2*g);x.fill();
  x.fillStyle=shade(c,-.18);x.fillRect(cx+g+r*.6,cy+s-g-s*.12,s-2*g-r*1.2,s*.1);x.fillStyle=shade(c,.45);x.globalAlpha=.75;x.beginPath();x.ellipse(cx+s*.36,cy+s*.32,s*.17,s*.1,-.6,0,7);x.fill();x.globalAlpha=1}

/* ---- the menu: picture packs, my gallery, mandalas, windows, animals, Neon, more ---- */
let STTAB='packs';
const ART_TABS=[['packs','star','Packs',1],['gallery','frame','My gallery'],['mandala','flower','Mandalas'],['glass','window','Windows'],['animal','paw','Animals',1],['neon','neon','Neon'],['classic','grid','More']];
const artTile=(k,o={})=>`<button class="btn sttile${o.lock?' lock':''}${o.done?' done':''}" ${o.lock?'data-lock="'+esc(o.lock)+'"':'data-k="'+esc(k)+'"'} aria-label="${esc(artName(k))}${o.done?', finished':''}${o.lock?', locked':''}"><span class="art-th" data-th="${esc(k)}"></span>${o.done?`<span class="art-badge">${ico('star',22)}</span>`:''}${o.lock?`<span class="art-badge lk">${ico('lock',22)}</span>`:''}</button>`;
function artMenuHTML(tab){const st=stS(),stars=artStars();let body='';const mine=t=>st.order.filter(k=>k[0]==t);
  const head=(ic,t,s,c)=>`<button class="btn game art-new" id="${c}">${artIco(ic,44)}<span class="gi"><span class="gt">${t}</span><span class="small">${s}</span></span>${ico('play',28)}</button>`;
  if(tab=='packs'){const day=artDaily(today()),dd=st.day==today();
    body=`<div class="art-goal">${ico('target',26)}<p><b>Next goal</b><span id="artgoal">${esc(artNextGoal())}</span></p><span class="art-stars" aria-label="${stars} of ${ART_ALL.length} stars">${ico('star',24)}<b>${stars}</b>/${ART_ALL.length}</span></div>
     <button class="btn art-day" data-day="${esc(day.key)}" aria-label="Today's picture: ${esc(day.n)}${dd?', done today':''}"><span class="art-th" data-th="${esc(day.key)}"></span><span class="gi"><span class="gt">Today's picture</span><span class="small">${esc(day.n)}${dd?' - done today!':' - a new one every day'}</span></span>${ico(dd?'check':'play',28)}</button>`+
     ART_PACKS.map(p=>{const open=artPackOpen(p,stars),n=p.pics.filter(artIsDone).length;
      return`<section class="art-pack${open?'':' shut'}"><h2 class="cbdh">${AIC[p.ic]?artIco(p.ic,32):ico(p.ic,28)}<span>${esc(p.n)}</span><small>${open?`${n} of ${p.pics.length}`:`${ico('lock',18)} ${p.need-stars} more star${p.need-stars==1?'':'s'}`}</small></h2>
        <div class="stgrid art-pk">${p.pics.map(k=>artTile(k,{done:artIsDone(k),lock:open?'':`${p.need-stars} more star${p.need-stars==1?'':'s'} open the ${p.n} pack.`})).join('')}</div></section>`}).join('')}
  else if(tab=='gallery'){const g=st.gal,h=g.filter(e=>e.h).length;
    body=`<div class="tipcard">Tap <b>Done</b> on any picture to keep it here. ${g.length} of ${GAL_MAX} pictures. When it is full, the oldest picture without a heart makes room; a heart keeps a picture (${h} of ${GAL_HEARTS}).</div>`+
     (g.length?`<div class="stgrid art-gal">${g.map(e=>`<button class="btn sttile art-gt" data-gi="${e.i}" aria-label="${esc(e.n||'My picture')}${e.h?', kept with a heart':''}"><span class="art-th" data-gth="${e.i}"></span>${e.h?`<span class="art-badge hrt">${ico('heart',22)}</span>`:''}</button>`).join('')}</div>`
      :`<p class="art-empty">${artIco('frame',64)}<span>Your finished pictures will live here.</span></p>`)+`<p class="art-more">${UI.btn('Color a picture',{kind:'primary',icon:'palette',id:'agnew'})}</p>`}
  else if(tab=='mandala'){const seeds=[3,17,42,77,123,256,512,999];body=head('flower','New Mandala','A brand-new design every time','newm')+
    (mine('m').length?`<h2 class="cbdh">My Art</h2><div class="stgrid">${mine('m').map(k=>artTile(k)).join('')}</div>`:'')+`<h2 class="cbdh">Designs</h2><div class="stgrid">${seeds.filter(s=>!st.items['m:'+s]).map(s=>artTile('m:'+s)).join('')}</div>`}
  else if(tab=='glass'){const seeds=[5,21,64,88,130,301];body=head('window','New Rose Window','Stained glass with hundreds of pieces','newg')+
    (mine('g').length?`<h2 class="cbdh">My Art</h2><div class="stgrid">${mine('g').map(k=>artTile(k)).join('')}</div>`:'')+`<h2 class="cbdh">Windows</h2><div class="stgrid">${seeds.filter(s=>!st.items['g:'+s]).map(s=>artTile('g:'+s)).join('')}</div>`}
  else if(tab=='animal')body=`<div class="tipcard">Geometric animals made of hundreds of facets. <b>Swipe</b> to paint lots of pieces at once. Use light and dark shades for a 3D look. Pinch with two fingers to zoom.</div><div class="stgrid">${Object.keys(POLYART).map(id=>artTile('p:'+id)).join('')}</div>`;
  else if(tab=='neon'){const n=st.gal.filter(e=>e.k=='n'||e.k=='ni');body=`<button class="btn game art-new neon" id="newn">${artIco('neon',44)}<span class="gi"><span class="gt">Neon Kaleidoscope</span><span class="small">Glowing mirror drawing</span></span>${ico('play',28)}</button>`+
    (n.length?`<h2 class="cbdh">My Neon Art</h2><div class="stgrid art-gal">${n.map(e=>`<button class="btn sttile art-gt" data-gi="${e.i}" aria-label="${esc(e.n||'Neon drawing')}"><span class="art-th" data-gth="${e.i}"></span></button>`).join('')}</div>`:'')}
  else body=`<div class="tipcard">Number pictures, pixel art and block paint.</div><div class="games"><button class="btn game art-new" data-c="shape">${ico('paw',40)}<span class="gi"><span class="gt">Number Pictures</span></span></button><button class="btn game art-new" data-c="pixel">${artIco('grid',44)}<span class="gi"><span class="gt">Pixel Art</span></span></button><button class="btn game art-new" data-c="paint">${artIco('paint',44)}<span class="gi"><span class="gt">Block Paint</span></span></button></div>`;
  return`<div class="tabs sttabs" role="tablist">${ART_TABS.map(([k,ic,l,isIco])=>`<button class="btn sm tab ${k==tab?'on':''}" data-t="${k}" role="tab" aria-selected="${k==tab}">${isIco?ico(ic,22):artIco(ic,24)}<span>${l}</span></button>`).join('')}</div><div class="scroll art-menu">${body}</div>`}
// thumbnails are drawn after the menu shows (a tap answers at once): from the next frame on, as many as fit in 8 ms a frame
function artThumb(k){const st=stS(),[t,v]=k.split(':');try{
  if(t=='px'){const d=cbData(v),cs=cbS();return`<img src="${pxImg(d.G,cs.done[v]?Array(256).fill('1'):(cs.prog[v]||'').split(''),120,1)}" alt="">`}
  if(t=='sh'){const d=shData(v),cs=shS(),fl={};if(cs.done[v])d.R.forEach(r=>fl[r.i]=CB_COL[r.c][0]);else(cs.prog[v]||[]).forEach(i=>fl[i]=CB_COL[d.R[i].c][0]);
    return shSVG(d,fl,{thin:1,faded:!cs.done[v]&&!(cs.prog[v]||[]).length}).replace('<svg','<svg aria-hidden="true" focusable="false"')}
  const it=st.items[k];return artSVG(artRegs(k),it?it.f:{},{glass:t=='g',hide:true,sw:t=='g'?2:t=='p'?.5:.8})}catch(_){return''}}
function artThumbs(){const q=[...$$('[data-th]'),...$$('[data-gth]')];let i=0;const one=()=>{const e=q[i++];if(!e||!e.isConnected)return;
    if(e.dataset.th)e.innerHTML=artThumb(e.dataset.th);else{const g=galGet(+e.dataset.gth);if(g)e.innerHTML=galPic(g,false)}};
  const f=()=>{const t0=performance.now();do one();while(i<q.length&&performance.now()-t0<8);if(i<q.length)requestAnimationFrame(f)};if(q.length)requestAnimationFrame(f)}
function artOpen(k,back){if(ptLeft()<=0){SFX.wrong();fb(ptWhyNot(),'warn long',3000);return}ART_BACK=back||(()=>colorMenu(STTAB));const[t,v]=k.split(':');SFX.whoosh();
  if(t=='px')colorPic(v,'num');else if(t=='sh')shapePage(v,'num');else artPage(k)}
function colorMenu(tab){if(tab&&['shape','pixel','paint'].includes(tab))return classicColor(tab);if(tab)STTAB=tab;if(!ART_TABS.some(t=>t[0]==STTAB))STTAB='packs';
  artNeonMigrate();artNeonShrink();artMusic(false);
  view(`${GH.top('art')}${artMenuHTML(STTAB)}`);
  $('#back').onclick=gameRoom;$$('.tab').forEach(b=>b.onclick=()=>{SFX.pop(2);colorMenu(b.dataset.t)});
  const chk=()=>{if(ptLeft()<=0){SFX.wrong();fb(ptWhyNot(),'warn long',3000);return false}return true};
  $$('[data-k]').forEach(b=>b.onclick=()=>artOpen(b.dataset.k));
  $$('[data-day]').forEach(b=>b.onclick=()=>artOpen(b.dataset.day));
  $$('[data-lock]').forEach(b=>b.onclick=()=>{SFX.wrong();fb(b.dataset.lock,'warn',2400)});
  $$('[data-gi]').forEach(b=>b.onclick=()=>galView(+b.dataset.gi));
  if($('#agnew'))$('#agnew').onclick=()=>{SFX.pop(2);colorMenu('packs')};
  $$('[data-c]').forEach(b=>b.onclick=()=>classicColor(b.dataset.c));
  if($('#newm'))$('#newm').onclick=()=>{if(chk()){SFX.magic();ART_BACK=()=>colorMenu('mandala');artPage('m:'+R(1000,99999))}};
  if($('#newg'))$('#newg').onclick=()=>{if(chk()){SFX.magic();ART_BACK=()=>colorMenu('glass');artPage('g:'+R(1000,99999))}};
  if($('#newn'))$('#newn').onclick=()=>{if(chk()){SFX.whoosh();neonDraw()}};
  artThumbs()}
// the big view of a gallery picture: a heart to keep it, Delete (tap twice), and the glow replay for Neon drawings
function galView(i){const e=galGet(i);if(!e)return;let del=false,stop=null;
  const s=UI.sheet(`<div class="art-big">${e.k=='n'?'<canvas id="gbcv" width="360" height="360" role="img" aria-label="Your neon drawing"></canvas>':`<div class="art-bp" role="img" aria-label="${esc(e.n||'My picture')}">${galPic(e,true)}</div>`}
    <h2>${esc(e.n||'My picture')}</h2><p class="small">${esc(new Date(e.t||Date.now()).toLocaleDateString())}</p>
    <div class="acts art-acts">${UI.btn(e.h?'Kept':'Keep it',{icon:'heart',id:'ghrt',cls:e.h?'on':'',attrs:`aria-pressed="${!!e.h}"`})}${e.k=='n'?UI.btn('Glow replay',{icon:'replay',id:'grep'}):''}${UI.btn('Delete',{icon:'trash',id:'gdel'})}${UI.btn('Close',{kind:'primary',icon:'close',id:'gcls'})}</div></div>`,{onClose:()=>{if(stop)stop()}});
  const cv=s.el.querySelector('#gbcv');if(cv){neonAll(cv.getContext('2d'),360,neonDec(e.d))}
  const rep=s.el.querySelector('#grep');if(rep)rep.onclick=()=>{if(stop)stop();SFX.whoosh();stop=neonReplay(cv,neonDec(e.d))};
  s.el.querySelector('#ghrt').onclick=ev=>{if(!galHeart(i)){fb(`You can keep ${GAL_HEARTS} pictures with a heart. Take a heart off another one first.`,'warn long',3000);return}
    const b=ev.currentTarget,on=!!galGet(i).h;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on));b.querySelector('span').textContent=on?'Kept':'Keep it';SFX.pop(on?4:1)};
  s.el.querySelector('#gdel').onclick=ev=>{if(!del){del=true;ev.currentTarget.querySelector('span').textContent='Tap again to delete';SFX.pop(1);return}galDel(i);SFX.del();s.close();setTimeout(()=>colorMenu(STTAB),360)};
  s.el.querySelector('#gcls').onclick=()=>{s.close();if(STTAB=='gallery'||STTAB=='neon')setTimeout(()=>colorMenu(STTAB),360)}}

/* ---- More: number pictures, pixel art, block paint ---- */
function classicHTML(tab){const cs=cbS(),ss=shS();
  const tabs=`<div class="tabs" role="tablist">${[['shape','paw','Pictures',1],['pixel','grid','Pixel Art'],['paint','paint','Block Paint']].map(([k,ic,l,isIco])=>`<button class="btn sm tab ${k==tab?'on':''}" data-t="${k}" role="tab" aria-selected="${k==tab}">${isIco?ico(ic,22):artIco(ic,24)}<span>${l}</span></button>`).join('')}</div>`;
  let body='';const lv=n=>`<span class="art-lv" aria-label="${['','Easy','Medium','Hard'][n]}">${ico('star',18).repeat(n)}</span>`;
  if(tab=='shape')body=`<div class="tipcard">Tap a picture. Color it <b>your way</b>, or <b>by number</b>, with <b>math facts</b>, or with <b>Spanish</b> colors!</div><h2>Pictures (${Object.keys(ss.done).length}/${SHAPES.length} done)</h2>${[[1,'Easy','Big shapes'],[2,'Medium','More parts'],[3,'Hard','Lots of tiny details']].map(([l,t,s])=>`<h3 class="cbdh">${lv(l)} ${t} <span class="small">${s}</span></h3><div class="cbgrid">${shMenuItems(l)}</div>`).join('')}`;
  else if(tab=='pixel'){const open=CB_PICS.filter(([id])=>cbOpen(id)),shut=CB_PICS.length-open.length;
    body=`<div class="tipcard">Pixel pictures: match the numbers to the colors. Drag your finger to color fast! Two fingers move and zoom.</div><h2>Pixel Art (${Object.keys(cs.done).length}/${CB_PICS.length} done)</h2><div class="cbgrid">${open.map(([id,n])=>{const done=cs.done[id],pr=cs.prog[id],pc=pr?Math.round(pr.split('').filter(c=>c=='1').length/pr.length*100):0;
    return`<button class="btn cbitem" data-id="${id}"><span class="art-th px" data-th="px:${id}"></span><b>${n}</b><span class="small">${done?ico('check',18)+' Done':pc?pc+'%':'New'}</span></button>`}).join('')}</div>${shut?`<p class="small art-more">${ico('lock',18)} ${shut} more pixel pictures open with the picture packs.</p>`:''}`}
  else body=`<button class="btn game art-new" id="free">${artIco('paint',44)}<span class="gi"><span class="gt">New Drawing</span><span class="small">Paint anything you want, block by block</span></span>${ico('play',28)}</button>
    ${cs.art.length?`<h2>My Drawings</h2><div class="cbgrid">${cs.art.map((a,i)=>`<button class="btn cbitem" data-art="${i}"><img src="${cbThumb(a.split(',').map(k=>k||'blanco'),true)}" alt=""><b>Drawing ${i+1}</b></button>`).join('')}</div>`:'<p class="small" style="text-align:center">Your saved drawings show up here.</p>'}`;
  return tabs+body}
function classicColor(tab){if(tab)CBTAB=tab;artMusic(false);
  view(`${GH.top('art',{sub:'More'})}<div class="scroll">${classicHTML(CBTAB)}</div>`);
  $('#back').onclick=()=>colorMenu('classic');$$('.tab').forEach(b=>b.onclick=()=>{SFX.pop(2);classicColor(b.dataset.t)});
  const chk=()=>{if(ptLeft()<=0){SFX.wrong();fb(ptWhyNot(),'warn long',3000);return false}return true},bk=()=>{ART_BACK=()=>classicColor(CBTAB)};
  if($('#free'))$('#free').onclick=()=>{if(chk()){bk();freePaint(-1)}};
  $$('[data-art]').forEach(b=>b.onclick=()=>{if(chk()){bk();freePaint(+b.dataset.art)}});
  $$('[data-id]').forEach(b=>b.onclick=()=>{if(chk())modeChooser(m=>{bk();colorPic(b.dataset.id,m)},false)});
  $$('[data-sh]').forEach(b=>b.onclick=()=>{if(chk())modeChooser(m=>{bk();shapePage(b.dataset.sh,m)},true)});
  artThumbs()}
