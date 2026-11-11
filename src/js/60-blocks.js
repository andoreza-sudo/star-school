/* ---------- block builder (isometric) ---------- */
const BW=16,BD=16,BH=14;
const BLOCKS=[null,
 {k:'grass',n:'Grass'},{k:'dirt',n:'Dirt'},{k:'stone',n:'Stone'},{k:'planks',n:'Planks'},{k:'log',n:'Log'},{k:'leaves',n:'Leaves',see:1},{k:'glass',n:'Glass',see:1},
 {k:'brick',n:'Brick'},{k:'sand',n:'Sand'},{k:'water',n:'Water',see:1},{k:'snow',n:'Snow'},{k:'wool',n:'Pink Wool'},{k:'blue',n:'Blue Wool'},
 {k:'gold',n:'Gold',need:100},{k:'diamond',n:'Diamond',need:200},{k:'rainbow',n:'Rainbow',need:300},
 {k:'flower',n:'Flower',deco:'🌷'},{k:'mush',n:'Mushroom',deco:'🍄'},{k:'pet',n:'My Pet',deco:'pet'},
 {k:'tnt',n:'TNT'},{k:'lava',n:'Lava',glow:'#f97316'},{k:'lamp',n:'Lamp',glow:'#fde047'},{k:'pumpkin',n:'Pumpkin'},{k:'cactus',n:'Cactus'},{k:'obsidian',n:'Obsidian'},{k:'ice',n:'Ice',see:1}];
const BBPAL=[20,1,2,3,4,5,6,7,8,9,10,21,22,11,26,24,23,25,12,13,14,15,16,17,18,19];
const BBTEX={};
function bbTex(k){if(BBTEX[k])return BBTEX[k];const mk=f=>{const c=document.createElement('canvas');c.width=c.height=16;const x=c.getContext('2d'),r=rng(k.length*131+(f.length||1));f(x,r);return c};
  const noise=(x,r,cols,a=1)=>{for(let i=0;i<16;i++)for(let j=0;j<16;j++){x.globalAlpha=a;x.fillStyle=cols[Math.floor(r()*cols.length)];x.fillRect(i,j,1,1)}x.globalAlpha=1};
  const dirt=(x,r)=>noise(x,r,['#8b5a2b','#7a4a22','#9c6b3a','#6b3f1d']);
  let top,side;
  switch(k){
   case'grass':top=mk((x,r)=>noise(x,r,['#4ade80','#22c55e','#16a34a','#3fbf5f']));side=mk((x,r)=>{dirt(x,r);for(let i=0;i<16;i++){const h=3+Math.floor(r()*3);for(let j=0;j<h;j++){x.fillStyle=r()<.5?'#22c55e':'#16a34a';x.fillRect(i,j,1,1)}}});break;
   case'dirt':top=side=mk(dirt);break;
   case'stone':top=side=mk((x,r)=>noise(x,r,['#9ca3af','#8b919a','#a8aeb6','#7c838c']));break;
   case'planks':top=side=mk((x,r)=>{noise(x,r,['#c08a4f','#b37d45','#c99556']);x.fillStyle='#8a5a2b';for(const y of[3,7,11,15])x.fillRect(0,y,16,1);for(const[a,b]of[[5,0],[12,4],[3,8],[10,12]])x.fillRect(a,b,1,3)});break;
   case'log':side=mk((x,r)=>{noise(x,r,['#6b4423','#5a3a1e','#7a5030']);x.fillStyle='#4a2f17';for(let i=1;i<16;i+=3)x.fillRect(i,0,1,16)});top=mk((x,r)=>{noise(x,r,['#c08a4f','#b37d45']);x.strokeStyle='#8a5a2b';x.lineWidth=1;for(const rr of[2.5,5,7.5]){x.beginPath();x.arc(8,8,rr,0,7);x.stroke()}x.fillStyle='#6b4423';x.fillRect(0,0,16,1);x.fillRect(0,15,16,1);x.fillRect(0,0,1,16);x.fillRect(15,0,1,16)});break;
   case'leaves':top=side=mk((x,r)=>{for(let i=0;i<16;i++)for(let j=0;j<16;j++){if(r()<.12)continue;x.fillStyle=['#15803d','#166534','#22c55e','#16a34a'][Math.floor(r()*4)];x.fillRect(i,j,1,1)}});break;
   case'glass':top=side=mk(x=>{x.fillStyle='#e0f2fe55';x.fillRect(0,0,16,16);x.fillStyle='#f0f9ff';x.fillRect(0,0,16,1);x.fillRect(0,15,16,1);x.fillRect(0,0,1,16);x.fillRect(15,0,1,16);x.fillStyle='#ffffffaa';for(let i=0;i<4;i++)x.fillRect(3+i,9-i,1,1);x.fillRect(10,4,1,1)});break;
   case'brick':top=side=mk((x,r)=>{x.fillStyle='#d6d3d1';x.fillRect(0,0,16,16);for(let row=0;row<4;row++)for(let c=-1;c<3;c++){x.fillStyle=['#b91c1c','#dc2626','#a3221a'][Math.floor(r()*3)];x.fillRect(c*8+(row%2)*4+1,row*4+1,7,3)}});break;
   case'sand':top=side=mk((x,r)=>noise(x,r,['#fde68a','#fcd34d','#fbe7a1','#f5d77a']));break;
   case'water':top=side=mk((x,r)=>{noise(x,r,['#3b82f6','#2563eb','#60a5fa'],.7);x.fillStyle='#bfdbfe99';x.fillRect(2,4,5,1);x.fillRect(9,10,5,1)});break;
   case'snow':top=mk((x,r)=>noise(x,r,['#ffffff','#f1f5f9','#e2e8f0']));side=mk((x,r)=>{dirt(x,r);for(let i=0;i<16;i++){const h=3+Math.floor(r()*3);for(let j=0;j<h;j++){x.fillStyle=r()<.5?'#fff':'#e2e8f0';x.fillRect(i,j,1,1)}}});break;
   case'wool':top=side=mk((x,r)=>noise(x,r,['#f9a8d4','#f472b6','#fbcfe8']));break;
   case'blue':top=side=mk((x,r)=>noise(x,r,['#60a5fa','#3b82f6','#93c5fd']));break;
   case'gold':top=side=mk((x,r)=>{noise(x,r,['#facc15','#eab308','#fde047']);x.fillStyle='#fef9c3';x.fillRect(2,2,4,1);x.fillRect(2,2,1,4);x.fillStyle='#a16207';x.fillRect(0,15,16,1);x.fillRect(15,0,1,16)});break;
   case'diamond':top=side=mk((x,r)=>{noise(x,r,['#a5f3fc','#67e8f9','#22d3ee']);x.fillStyle='#fff';for(const[a,b]of[[3,3],[11,5],[6,11],[12,12]]){x.fillRect(a,b,2,2)}x.fillStyle='#0e7490';x.fillRect(0,15,16,1);x.fillRect(15,0,1,16)});break;
   case'rainbow':top=side=mk(x=>{['#ef4444','#f97316','#facc15','#22c55e','#3b82f6','#a855f7','#ec4899','#ef4444'].forEach((c,i)=>{x.fillStyle=c;x.fillRect(0,i*2,16,2)})});break;
   case'tnt':side=mk((x,r)=>{noise(x,r,['#dc2626','#b91c1c','#ef4444']);x.fillStyle='#fff';x.fillRect(0,6,16,5);x.fillStyle='#111';x.font='bold 5px sans-serif';x.fillText('TNT',2.5,10.5)});top=mk((x,r)=>{noise(x,r,['#dc2626','#b91c1c']);x.fillStyle='#e7e5e4';x.fillRect(5,5,6,6);x.fillStyle='#111';x.fillRect(7,7,2,2)});break;
   case'lava':top=side=mk((x,r)=>{noise(x,r,['#f97316','#ea580c','#fb923c','#dc2626']);x.fillStyle='#fde047';for(let i=0;i<7;i++)x.fillRect(Math.floor(r()*14),Math.floor(r()*14),2,1)});break;
   case'lamp':top=side=mk((x,r)=>{noise(x,r,['#fde047','#facc15','#fef08a']);x.fillStyle='#a16207';x.fillRect(0,0,16,1);x.fillRect(0,15,16,1);x.fillRect(0,0,1,16);x.fillRect(15,0,1,16);x.fillRect(7,0,2,16);x.fillRect(0,7,16,2)});break;
   case'pumpkin':side=mk((x,r)=>{noise(x,r,['#f97316','#ea580c','#fb923c']);x.fillStyle='#c2410c';for(const i of[3,8,12])x.fillRect(i,0,1,16);x.fillStyle='#422006';x.fillRect(3,5,3,3);x.fillRect(10,5,3,3);x.fillRect(4,11,8,2)});top=mk((x,r)=>{noise(x,r,['#f97316','#ea580c']);x.fillStyle='#15803d';x.fillRect(7,6,3,3)});break;
   case'cactus':side=mk((x,r)=>{noise(x,r,['#16a34a','#15803d','#22c55e']);x.fillStyle='#14532d';for(const i of[2,7,12])x.fillRect(i,0,1,16);x.fillStyle='#fef9c3';for(let i=0;i<6;i++)x.fillRect(Math.floor(r()*15),Math.floor(r()*15),1,1)});top=mk((x,r)=>noise(x,r,['#22c55e','#16a34a']));break;
   case'obsidian':top=side=mk((x,r)=>{noise(x,r,['#1e1b4b','#312e81','#18181b','#3b0764']);x.fillStyle='#a78bfa';for(let i=0;i<4;i++)x.fillRect(Math.floor(r()*15),Math.floor(r()*15),1,1)});break;
   case'ice':top=side=mk((x,r)=>{noise(x,r,['#bae6fd','#e0f2fe','#7dd3fc'],.8);x.fillStyle='#fff';x.fillRect(3,3,5,1);x.fillRect(9,10,4,1)});break;
   default:top=side=mk((x,r)=>noise(x,r,['#ccc']))}
  return BBTEX[k]={top,side}}
function bbS(){const b=S.bb=Object.assign({worlds:[],cur:0},S.bb||{});if(!b.worlds.length)b.worlds.push({name:'My Island',d:bbEncode(bbGen('island',7))});return b}
function bbGen(type,seed){const r=rng(seed*31+5),w=new Uint8Array(BW*BD*BH),set=(x,y,z,v)=>{if(x>=0&&y>=0&&x<BW&&y<BD&&z>=0&&z<BH)w[bbI(x,y,z)]=v},p=[r()*6,r()*6,r()*6,r()*6];
  if(type=='flat'){for(let x=0;x<BW;x++)for(let y=0;y<BD;y++)w[bbI(x,y,0)]=1;return w}
  const H=(x,y)=>Math.sin(x*.45+p[0])*1.2+Math.sin(y*.38+p[1])*1.2+Math.sin((x+y)*.25+p[2])*1.5+Math.sin((x-y)*.6+p[3])*.6;
  for(let x=0;x<BW;x++)for(let y=0;y<BD;y++){const dc=Math.hypot(x-7.5,y-7.5)/8;let h;
    if(type=='island')h=Math.round(2.6+H(x,y)*.8-dc*dc*4.2);else if(type=='mountain')h=Math.round(3+H(x,y)*1.4+(1-dc)*5.5);else h=Math.round(1.6+H(x,y)*.6);
    if(type=='island'&&h<1){set(x,y,0,10);continue}h=Math.max(1,Math.min(BH-3,h));
    for(let z=0;z<h;z++){const top=z==h-1;let v;
      if(type=='desert')v=z<h-2?3:9;else if(type=='mountain')v=top?(z>=7?11:z>=5?3:1):(z<h-3?3:2);else v=top?(h<=2&&dc>.55?9:1):(z<h-2?3:2);set(x,y,z,v)}
    const T=(h=>h)(h);
    if(type=='island'&&w[bbI(x,y,T-1)]==1&&r()<.07&&x>1&&y>1&&x<BW-2&&y<BD-2){for(let z=T;z<T+3;z++)set(x,y,z,5);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let z=T+2;z<T+4;z++)if(!(a==0&&b==0&&z==T+2)&&!(Math.abs(a)+Math.abs(b)==2&&z==T+3))set(x+a,y+b,z,6)}
    else if(type=='island'&&w[bbI(x,y,T-1)]==1&&r()<.06)set(x,y,T,r()<.6?17:18);
    else if(type=='desert'&&r()<.045){const n=2+Math.floor(r()*2);for(let z=T;z<T+n;z++)set(x,y,z,24)}
    else if(type=='mountain'&&w[bbI(x,y,T-1)]==1&&r()<.08){set(x,y,T,5);set(x,y,T+1,6);set(x,y,T+2,6)}}
  if(type=='desert'){for(let x=1;x<5;x++)for(let y=10;y<14;y++)if(Math.max(Math.abs(x-2.5),Math.abs(y-11.5))<2)set(x,y,1,10)}
  return w}
function bbTemplate(){const w=new Uint8Array(BW*BD*BH);for(let x=0;x<BW;x++)for(let y=0;y<BD;y++)w[bbI(x,y,0)]=1;
  for(let z=1;z<=3;z++)w[bbI(2,2,z)]=5;for(let x=1;x<=3;x++)for(let y=1;y<=3;y++)for(let z=4;z<=5;z++)if(!(x==2&&y==2&&z==4))w[bbI(x,y,z)]=6;w[bbI(2,2,6)]=6;
  for(let x=8;x<=10;x++)for(let y=8;y<=10;y++)w[bbI(x,y,0)]=10;w[bbI(6,4,1)]=17;w[bbI(4,8,1)]=17;w[bbI(9,3,1)]=18;return w}
const bbI=(x,y,z)=>(z*BD+y)*BW+x;
const bbEncode=w=>btoa(String.fromCharCode(...w));
const bbDecode=s=>{try{const b=atob(s),w=new Uint8Array(BW*BD*BH);if(b.length==1440){for(let x=0;x<BW;x++)for(let y=0;y<BD;y++)w[bbI(x,y,0)]=10;for(let z=0;z<10;z++)for(let y=0;y<12;y++)for(let x=0;x<12;x++){const v=b.charCodeAt((z*12+y)*12+x);if(v||z==0)w[bbI(x+2,y+2,z)]=v}return w}for(let i=0;i<Math.min(b.length,w.length);i++)w[i]=b.charCodeAt(i);return w}catch(e){return bbGen('island',1)}};

let BB=null;
const BBSTAMPS=(()=>{const L=[];const add=(n,e,f)=>{const c=[];f((x,y,z,v)=>c.push([x,y,z,v]));L.push({n,e,c})};
  add('Tree','🌳',p=>{for(let z=0;z<4;z++)p(0,0,z,5);for(let x=-2;x<=2;x++)for(let y=-2;y<=2;y++)for(let z=3;z<=4;z++)if(!(Math.abs(x)==2&&Math.abs(y)==2)&&!(x==0&&y==0&&z==3))p(x,y,z,6);for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)if(!(x&&y))p(x,y,5,6)});
  add('House','🏠',p=>{for(let x=-2;x<=2;x++)for(let y=-2;y<=2;y++){const edge=Math.abs(x)==2||Math.abs(y)==2;if(edge)for(let z=0;z<3;z++){if(x==0&&y==2&&z<2)continue;p(x,y,z,z==1&&((Math.abs(x)==2&&y==0)||(x==0&&y==-2)||(Math.abs(x)==1&&y==2))?7:4)}p(x,y,3,8)}for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)p(x,y,4,8);p(0,0,5,8);p(0,0,0,22)});
  add('Tower','🏰',p=>{for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++){if(!x&&!y)continue;for(let z=0;z<6;z++)p(x,y,z,z==3&&(!x||!y)?7:3);if(x&&y)p(x,y,6,3)}p(0,0,5,14)});
  add('Pool','🏊',p=>{for(let x=-2;x<=2;x++)for(let y=-2;y<=2;y++)p(x,y,0,Math.abs(x)==2||Math.abs(y)==2?3:10)});
  add('Car','🚗',p=>{for(let x=-2;x<=1;x++)for(let y=0;y<=1;y++){p(x,y,1,12);if(x==-2||x==1)p(x,y,0,25)}p(-1,0,2,7);p(0,0,2,7);p(-1,1,2,7);p(0,1,2,7);p(2,0,1,22);p(2,1,1,22)});
  add('Rocket','🚀',p=>{for(let z=0;z<6;z++)p(0,0,z,z==4?7:11);p(0,0,6,12);p(0,0,7,12);for(const[x,y]of[[1,0],[-1,0],[0,1],[0,-1]])for(let z=0;z<2;z++)p(x,y,z,13)});
  add('Snowman','⛄',p=>{for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)p(x,y,0,11);for(const[x,y]of[[0,0],[1,0],[-1,0],[0,1],[0,-1]])p(x,y,1,11);p(0,0,2,11);p(0,0,3,23);p(0,0,4,13)});
  add('Pyramid','🔺',p=>{for(let k=0;k<3;k++)for(let x=-3+k;x<=3-k;x++)for(let y=-3+k;y<=3-k;y++)p(x,y,k,9);p(0,0,3,14)});
  add('Lamp Post','💡',p=>{for(let z=0;z<4;z++)p(0,0,z,25);p(0,0,4,22)});
  add('Volcano','🌋',p=>{for(let k=0;k<4;k++)for(let x=-3+k;x<=3-k;x++)for(let y=-3+k;y<=3-k;y++){if(k==3)continue;const top=k==2;p(x,y,k,top&&!x&&!y?21:k<1?3:25)}p(0,0,3,21)});
  add('Bridge','🌉',p=>{for(let x=-3;x<=3;x++){const z=3-Math.min(3,Math.abs(x));p(x,0,z,4);p(x,1,z,4);p(x,-1,z+1,5);p(x,2,z+1,5)}});
  add('Flowers','🌷',p=>{for(const[x,y]of[[0,0],[1,1],[-1,1],[2,-1],[-2,0],[1,-2],[-1,-1]])p(x,y,0,(x+y)%2?17:18)});
  return L})();
const BBCH=[['Stone Tower','🗼',()=>[1,2,3].map(z=>[6,6,z,3])],
 ['Brick Wall','🧱',()=>{const o=[];for(let x=4;x<=7;x++)for(let z=1;z<=2;z++)o.push([x,6,z,8]);return o}],
 ['Tree','🌳',()=>{const o=[[6,6,1,5],[6,6,2,5],[6,6,3,5],[6,6,5,6]];for(let x=5;x<=7;x++)for(let y=5;y<=7;y++)o.push([x,y,4,6]);return o}],
 ['Pond','🏝️',()=>{const o=[];for(let x=4;x<=7;x++)for(let y=4;y<=7;y++)o.push([x,y,1,x>4&&x<7&&y>4&&y<7?10:9]);return o}],
 ['Snowman','⛄',()=>{const o=[];for(let x=5;x<=7;x++)for(let y=5;y<=7;y++)o.push([x,y,1,11]);for(const[x,y]of[[6,6],[5,6],[7,6],[6,5],[6,7]])o.push([x,y,2,11]);o.push([6,6,3,11],[6,6,4,13]);return o}],
 ['Rainbow Bridge','🌈',()=>[[3,6,1,12],[4,6,2,12],[5,6,3,12],[6,6,3,12],[7,6,3,12],[8,6,2,12],[9,6,1,12],[4,6,1,13],[5,6,2,13],[7,6,2,13],[8,6,1,13],[6,6,1,10],[5,6,1,10],[7,6,1,10]]],
 ['Little House','🏠',()=>{const o=[];for(let x=5;x<=7;x++)for(let y=5;y<=7;y++){if(x==6&&y==6)continue;for(let z=1;z<=2;z++){if(x==6&&y==7&&z==1)continue;o.push([x,y,z,x==5&&y==6&&z==2||x==7&&y==6&&z==2?7:4])}}for(let x=4;x<=8;x++)for(let y=5;y<=7;y++)o.push([x,y,3,8]);return o}],
 ['Castle Tower','🏰',()=>{const o=[];for(let x=5;x<=7;x++)for(let y=5;y<=7;y++){if(x==6&&y==6)continue;for(let z=1;z<=3;z++)o.push([x,y,z,3]);if((x+y)%2==0)o.push([x,y,4,3])}o.push([6,6,1,14]);return o}],
 ['Pyramid','🔺',()=>{const o=[];for(let x=4;x<=8;x++)for(let y=4;y<=8;y++)o.push([x,y,1,9]);for(let x=5;x<=7;x++)for(let y=5;y<=7;y++)o.push([x,y,2,9]);o.push([6,6,3,14]);return o}],
 ['Diamond Palace','💎',()=>{const o=[];for(let x=3;x<=8;x++)for(let y=3;y<=8;y++){const edge=x==3||x==8||y==3||y==8;if(!edge)continue;const corner=(x==3||x==8)&&(y==3||y==8);for(let z=1;z<=(corner?4:2);z++)o.push([x,y,z,corner?3:(z==2&&(x==5||x==6||y==5||y==6)?7:8)])}for(let z=1;z<=3;z++)o.push([5,5,z,15]);o.push([5,5,4,16]);return o}]];
function bbChS(){const b=bbS();return b.ch=b.ch||[]}
function blockBuilder(ci){const bs=bbS(),CH=ci==null?null:BBCH[ci],wd=CH?{name:CH[1]+' '+CH[0]}:bs.worlds[bs.cur];
  BB={animals:[],w:CH?bbFlat():bbDecode(wd.d),rot:0,sel:4,tool:'build',undo:[],night:false,zoom:1,px:0,py:0,fx:[],ch:ci==null?null:ci,goal:null,miss:0,drop:null};
  let need=null;if(CH){BB.goal=new Map(CH[2]().map(([a,b,z,v])=>[bbI(a+2,b+2,z),v]));need=new Set(BB.goal.values());BB.sel=[...need][0];BB.total=BB.goal.size}
  const pal=(need?[...need]:BBPAL).map(i=>{const b=BLOCKS[i];if(!b)return'';if(need)return`<button class="btn bbk" data-b="${i}" title="${b.n}"><canvas width="44" height="44" data-bc="${i}"></canvas><i class="bbn">${b.n}</i></button>`;const lock=b.need&&S.stars<b.need;return`<button class="btn bbk ${lock?'lock':''}" data-b="${i}" title="${b.n}"><canvas width="44" height="44" data-bc="${i}"></canvas>${lock?`<i>⭐${b.need}</i>`:''}</button>`}).join('');
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title" style="font-size:20px">🧱 ${esc(wd.name)}</div><div class="sp"></div>${CH?'<div class="stars" id="bbprog"></div>':''}<div class="stars" id="gtm">🎟️ ${fmtT(ptLeft())}</div></div>
   <div class="bbwrap"><div class="bbcv"><canvas id="bbc"></canvas>
     <div class="bbtools"><div class="bbtg">${CH?'<button class="btn sm on" data-tool="build">🔨 Build</button>':'<button class="btn sm on" data-tool="build">🔨<i>Block</i></button><button class="btn sm" data-tool="line">📏<i>Line</i></button><button class="btn sm" data-tool="wall">🧱<i>Wall</i></button><button class="btn sm" data-tool="floor">⬛<i>Floor</i></button><button class="btn sm" data-tool="stamp">🏠<i>Stamps</i></button>'}<button class="btn sm" data-tool="break">⛏️<i>Break</i></button></div><button class="btn sm" id="bbundo">↩️</button><button class="btn sm" id="bbrl">⟲</button><button class="btn sm" id="bbrr">⟳</button><button class="btn sm" id="bbzoom">🔍</button><button class="btn sm" id="bbnight">🌙</button>${CH?'':'<button class="btn sm" id="bbpet">🐾</button>'}</div></div>
   <div class="bbpal" id="bbpal">${pal}</div><div class="bbpal bbst" id="bbst" style="display:none">${BBSTAMPS.map((t,i)=>`<button class="btn bbk bbsk ${i==0?'on':''}" data-stamp="${i}"><span>${t.e}</span><i class="bbn">${t.n}</i></button>`).join('')}</div></div>`);
  $$('[data-bc]').forEach(c=>bbIcon(c.getContext('2d'),+c.dataset.bc,44));
  const cv=$('#bbc'),x=cv.getContext('2d'),dpr=Math.min(2,devicePixelRatio||1);
  const bg=document.createElement('canvas'),bgx=bg.getContext('2d');const size=()=>{const r=cv.parentNode.getBoundingClientRect();cv.width=bg.width=r.width*dpr;cv.height=bg.height=r.height*dpr;cv.style.width=r.width+'px';cv.style.height=r.height+'px';draw()};
  let faces=[];
  function proj(px,py,pz){return[BB.ox+(px-py)*BB.a,BB.oy+(px+py)*BB.a/2-pz*BB.a]}
  function rotXY(xx,yy){const r=BB.rot;return r==0?[xx,yy]:r==1?[BD-1-yy,xx]:r==2?[BW-1-xx,BD-1-yy]:[yy,BW-1-xx]}
  function unrot(rx,ry){const r=BB.rot;return r==0?[rx,ry]:r==1?[ry,BD-1-rx]:r==2?[BW-1-rx,BD-1-ry]:[BW-1-ry,rx]}
  const get=(xx,yy,z)=>xx<0||yy<0||z<0||xx>=BW||yy>=BD||z>=BH?0:BB.w[bbI(xx,yy,z)];
  const getR=(rx,ry,z)=>{if(rx<0||ry<0||rx>=BW||ry>=BD)return 0;const[a,b]=unrot(rx,ry);return get(a,b,z)};
  const opaque=v=>v&&!BLOCKS[v].see&&!BLOCKS[v].deco;
  function face(tex,O,U,V,shadeA){x.save();x.beginPath();x.moveTo(...O);x.lineTo(O[0]+U[0],O[1]+U[1]);x.lineTo(O[0]+U[0]+V[0],O[1]+U[1]+V[1]);x.lineTo(O[0]+V[0],O[1]+V[1]);x.closePath();x.clip();
    x.setTransform(U[0]/16,U[1]/16,V[0]/16,V[1]/16,O[0],O[1]);x.imageSmoothingEnabled=false;x.drawImage(tex,0,0);x.setTransform(1,0,0,1,0,0);
    if(shadeA){x.fillStyle=`rgba(0,0,0,${shadeA})`;x.fill()}x.restore()}
  function layout(){const W=cv.width,H=cv.height;const a0=Math.min(W/(BW+BD+1),H/((BW+BD)/2+BH+1.5))*.98;BB.a=a0*BB.zoom;BB.ox=W/2+BB.px*dpr;BB.oy=H*.62-(BW+BD)/4*BB.a+BB.py*dpr}
  function clampPan(){layout();const W=cv.width,H=cv.height,cx=BB.ox,cy=BB.oy+(BW+BD)/4*BB.a;let dx=0,dy=0;if(cx<W*.1)dx=W*.1-cx;if(cx>W*.9)dx=W*.9-cx;if(cy<H*.25)dy=H*.25-cy;if(cy>H*.95)dy=H*.95-cy;BB.px+=dx/dpr;BB.py+=dy/dpr;layout()}
  function draw(){const W=cv.width,H=cv.height;layout();
    const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,BB.night?'#0f172a':'#7dd3fc');g.addColorStop(1,BB.night?'#312e81':'#e0f2fe');x.fillStyle=g;x.fillRect(0,0,W,H);
    if(BB.night){x.fillStyle='#fff';for(let i=0;i<50;i++)x.fillRect((i*97)%W,(i*53)%(H*.5),2,2);x.font=`${BB.a*1.6}px sans-serif`;x.fillText('🌙',W*.08,H*.12)}
    else{x.fillStyle='#fde047';x.beginPath();x.arc(W*.88,H*.12,BB.a*1.2,0,7);x.fill()}
    // shadow under island
    const c0=proj(0,0,0),c1=proj(BW,0,0),c2=proj(BW,BD,0),c3=proj(0,BD,0);x.fillStyle='#0000001f';x.beginPath();x.moveTo(c0[0],c0[1]+BB.a*.5);x.lineTo(c1[0],c1[1]+BB.a*.5);x.lineTo(c2[0],c2[1]+BB.a*.5);x.lineTo(c3[0],c3[1]+BB.a*.5);x.fill();
    x.strokeStyle='#ffffff55';x.lineWidth=1;for(let i=0;i<=BW;i++){const p=proj(i,0,0),q=proj(i,BD,0);x.beginPath();x.moveTo(...p);x.lineTo(...q);x.stroke()}for(let j=0;j<=BD;j++){const p=proj(0,j,0),q=proj(BW,j,0);x.beginPath();x.moveTo(...p);x.lineTo(...q);x.stroke()}
    faces=[];const glows=[];
    for(let s=0;s<=BW+BD-2;s++)for(let rx=0;rx<BW;rx++){const ry=s-rx;if(ry<0||ry>=BD)continue;for(let z=0;z<BH;z++){const v=getR(rx,ry,z);
      if(!v){if(BB.goal){const[ga,gb]=unrot(rx,ry),gv=BB.goal.get(bbI(ga,gb,z));if(gv)ghost(rx,ry,z,gv)}continue}const B=BLOCKS[v];if(B.glow)glows.push([rx,ry,z,B.glow]);
      let dz=0;if(BB.drop){const[da,db]=unrot(rx,ry);if(bbI(da,db,z)==BB.drop.i){const p=Math.min(1,(performance.now()-BB.drop.t)/170);dz=(1-p)*(1-p)*1.4;if(p>=1)BB.drop=null;else BB.dropping=1}}
      const T=proj(rx,ry,z+1+dz),R1=proj(rx+1,ry,z+1+dz),C=proj(rx+1,ry+1,z+1+dz),L1=proj(rx,ry+1,z+1+dz),Cb=proj(rx+1,ry+1,z+dz),Lb=proj(rx,ry+1,z+dz),Rb=proj(rx+1,ry,z+dz);
      if(B.deco){const p=proj(rx+.5,ry+.5,z);x.globalAlpha=1;x.fillStyle='#000';x.font=`${BB.a*1.15}px sans-serif`;x.textAlign='center';x.textBaseline='bottom';x.fillText(B.deco=='pet'?petE():B.deco,p[0],p[1]+BB.a*.15);
        faces.push({rx,ry,z,f:'top',poly:[[p[0]-BB.a*.5,p[1]-BB.a],[p[0]+BB.a*.5,p[1]-BB.a],[p[0]+BB.a*.5,p[1]],[p[0]-BB.a*.5,p[1]]]});continue}
      const tex=bbTex(B.k),see=B.see;
      if(!opaque(getR(rx,ry,z+1))||see){face(tex.top,T,[R1[0]-T[0],R1[1]-T[1]],[L1[0]-T[0],L1[1]-T[1]],(BB.night?.35:0)+(opaque(getR(rx-1,ry,z+1))||opaque(getR(rx,ry-1,z+1))?.2:0)+(opaque(getR(rx-1,ry-1,z+1))?.08:0));faces.push({rx,ry,z,f:'top',poly:[T,R1,C,L1]})}
      if(!opaque(getR(rx,ry+1,z))||see){face(tex.side,L1,[C[0]-L1[0],C[1]-L1[1]],[Lb[0]-L1[0],Lb[1]-L1[1]],BB.night?.5:.18);faces.push({rx,ry,z,f:'left',poly:[L1,C,Cb,Lb]})}
      if(!opaque(getR(rx+1,ry,z))||see){face(tex.side,C,[R1[0]-C[0],R1[1]-C[1]],[Cb[0]-C[0],Cb[1]-C[1]],BB.night?.6:.34);faces.push({rx,ry,z,f:'right',poly:[C,R1,Rb,Cb]})}}}
    if(glows.length){x.globalCompositeOperation='lighter';for(const[gx,gy,gz,gc]of glows){const p=proj(gx+.5,gy+.5,gz+.5),rr=BB.a*(BB.night?3.2:1.3),g2=x.createRadialGradient(p[0],p[1],0,p[0],p[1],rr);g2.addColorStop(0,gc+(BB.night?'aa':'44'));g2.addColorStop(1,gc+'00');x.fillStyle=g2;x.fillRect(p[0]-rr,p[1]-rr,rr*2,rr*2)}x.globalCompositeOperation='source-over'}
    bgx.clearRect(0,0,bg.width,bg.height);bgx.drawImage(cv,0,0);FX.dirty=1;
    if(BB.dropping){BB.dropping=0;requestAnimationFrame(()=>{if($('#bbc'))draw()})}}
  /* effects: TNT, particles, animals */
  const FX={parts:[],fuses:[],lit:new Set(),shake:0,dirty:0,last:0};const BBC={};
  const bcol=k=>{if(BBC[k])return BBC[k];const t=bbTex(k).side,d=t.getContext('2d').getImageData(0,0,16,16).data;let r=0,g=0,b=0;for(let i=0;i<d.length;i+=4){r+=d[i];g+=d[i+1];b+=d[i+2]}return BBC[k]=`rgb(${r/256|0},${g/256|0},${b/256|0})`};
  const topZ=(xx,yy)=>{if(xx<0||yy<0||xx>=BW||yy>=BD)return -1;for(let z=BH-1;z>=0;z--){const v=get(xx,yy,z);if(v&&!BLOCKS[v].deco)return v==10||v==21?-1:z+1}return 0};
  function light(a,b,z,t){const i=bbI(a,b,z);if(FX.lit.has(i))return;FX.lit.add(i);FX.fuses.push({a,b,z,i,t});tone(880,.05,0,'square',.08)}
  function boom(f){FX.lit.delete(f.i);if(BB.w[f.i]!=20)return;if(!FX.snap){BB.undo.push(BB.w.slice());FX.snap=1;setTimeout(()=>FX.snap=0,600)}
    const R0=2.6,[crx,cry]=rotXY(f.a,f.b),c=proj(crx+.5,cry+.5,f.z+.5);BB.w[f.i]=0;
    for(let dz=-3;dz<=3;dz++)for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++){const d=Math.hypot(dx,dy,dz*1.2);if(d>R0)continue;const a=f.a+dx,b=f.b+dy,z=f.z+dz;if(a<0||b<0||z<0||a>=BW||b>=BD||z>=BH)continue;const i=bbI(a,b,z),v=BB.w[i];if(!v)continue;
      if(v==20){light(a,b,z,.15+d*.06);continue}if(v==19&&false)continue;const[qx,qy]=rotXY(a,b),p=proj(qx+.5,qy+.5,z+.5);
      if(FX.parts.length<260)FX.parts.push({x:p[0],y:p[1],vx:(p[0]-c[0])*.08+(Math.random()-.5)*BB.a*.3,vy:-BB.a*(.2+Math.random()*.35)+(p[1]-c[1])*.05,l:1+Math.random()*.6,c:BLOCKS[v].deco?'#22c55e':bcol(BLOCKS[v].k),s:BB.a*(.18+Math.random()*.22)});BB.w[i]=0}
    BB.animals=BB.animals.filter(an=>{if(Math.hypot(an.x-f.a,an.y-f.b,(an.z-f.z)*1.2)<R0+.6){FX.parts.push({x:an.sx||c[0],y:an.sy||c[1],vx:(Math.random()-.5)*BB.a*.6,vy:-BB.a*.8,l:1.4,em:an.e,s:BB.a,spin:1});return false}return true});
    FX.parts.push({x:c[0],y:c[1],l:.25,flash:1,s:BB.a*4});for(let i=0;i<10;i++)FX.parts.push({x:c[0]+(Math.random()-.5)*BB.a*2,y:c[1]+(Math.random()-.5)*BB.a,vx:(Math.random()-.5)*BB.a*.1,vy:-BB.a*.05,l:1.2+Math.random(),smoke:1,s:BB.a*(.5+Math.random()*.6)});
    FX.shake=.5;noise(.8,0,.5,900,80);tone(70,.6,0,'sawtooth',.28,28);tone(46,.8,.05,'sine',.3,20);draw();bbSave()}
  function spawn(){if(BB.animals.length>=10){fb('That\'s a lot of animals! 🐾','warn');return}for(let k=0;k<60;k++){const a=Math.floor(Math.random()*BW),b=Math.floor(Math.random()*BD),z=topZ(a,b);if(z>0&&z<BH){const e=pick(['🐷','🐔','🐑','🐄','🐰','🐱','🐶','🦆']);BB.animals.push({e,x:a,y:b,z,fx:a,fy:b,fz:z,tx:a,ty:b,tz:z,hop:1,t:.5,dir:1});tone(660,.08,0,'sine',.12);tone(990,.08,.08,'sine',.12);if(S.voice)say(e=='🐷'?'Oink!':e=='🐄'?'Moo!':e=='🐑'?'Baa!':'Hello!');return}}}
  function frame(){if(!document.body.contains(cv))return;requestAnimationFrame(frame);const now=performance.now(),dt=Math.min(.05,FX.last?(now-FX.last)/1000:0);FX.last=now;
    for(const f of FX.fuses){f.t-=dt;if(f.t<=0){f.done=1;boom(f)}}FX.fuses=FX.fuses.filter(f=>!f.done);
    for(const an of BB.animals){if(an.hop<1){an.hop=Math.min(1,an.hop+dt/.32);const k=an.hop;an.x=an.fx+(an.tx-an.fx)*k;an.y=an.fy+(an.ty-an.fy)*k;an.z=an.fz+(an.tz-an.fz)*k+Math.sin(k*Math.PI)*.45}
      else{const cz=topZ(Math.round(an.x),Math.round(an.y));if(cz>0&&cz!=an.z){an.z=cz}an.t-=dt;if(an.t<=0){an.t=.5+Math.random()*1.4;const[dx,dy]=pick([[1,0],[-1,0],[0,1],[0,-1]]),nx=Math.round(an.x)+dx,ny=Math.round(an.y)+dy,nz=topZ(nx,ny);
        if(nz>0&&nz<BH&&Math.abs(nz-Math.round(an.z))<=1){Object.assign(an,{fx:an.x,fy:an.y,fz:Math.round(an.z),tx:nx,ty:ny,tz:nz,hop:0})}}}}
    for(const p of FX.parts){p.l-=dt;if(p.vx!==undefined){p.x+=p.vx*dt*20;p.y+=p.vy*dt*20;if(!p.smoke)p.vy+=BB.a*dt*1.6}}FX.parts=FX.parts.filter(p=>p.l>0);
    const busy=FX.parts.length||FX.fuses.length||BB.animals.length||FX.shake>0||BB.prev||BB.fp;
    if(!busy){if(FX.dirty){x.drawImage(bg,0,0);FX.dirty=0}return}FX.dirty=1;
    let sh=0;if(FX.shake>0){FX.shake-=dt;sh=(Math.random()-.5)*BB.a*.6*FX.shake}
    x.clearRect(0,0,cv.width,cv.height);x.drawImage(bg,sh,sh*.7);
    for(const f of FX.fuses){const[qx,qy]=rotXY(f.a,f.b),T=proj(qx,qy,f.z+1),R1=proj(qx+1,qy,f.z+1),C=proj(qx+1,qy+1,f.z+1),L1=proj(qx,qy+1,f.z+1),Cb=proj(qx+1,qy+1,f.z),Lb=proj(qx,qy+1,f.z),Rb=proj(qx+1,qy,f.z);
      x.globalAlpha=Math.sin(now/(f.t<.6?40:90))*.35+.4;x.fillStyle='#fff';x.beginPath();x.moveTo(...T);x.lineTo(...R1);x.lineTo(...Rb);x.lineTo(...Cb);x.lineTo(...Lb);x.lineTo(...L1);x.fill();x.globalAlpha=1;
      const sp=proj(qx+.5,qy+.5,f.z+1);x.fillStyle='#fde047';x.beginPath();x.arc(sp[0]+(Math.random()-.5)*BB.a*.2,sp[1]-BB.a*.3+(Math.random()-.5)*BB.a*.2,BB.a*.12,0,7);x.fill()}
        if(BB.prev){const del=BB.tool=='break',pc=BB.prev.slice(0,400).map(c=>{const[qx,qy]=rotXY(c[0],c[1]);return[qx,qy,c[2],c[3]]}).sort((p,q)=>(p[0]+p[1])-(q[0]+q[1])||p[2]-q[2]);
      for(const[qx,qy,z,v]of pc){const T=proj(qx,qy,z+1),R1=proj(qx+1,qy,z+1),C=proj(qx+1,qy+1,z+1),L1=proj(qx,qy+1,z+1),Cb=proj(qx+1,qy+1,z),Lb=proj(qx,qy+1,z),Rb=proj(qx+1,qy,z);
        x.globalAlpha=del?.45:.55;x.fillStyle=del?'#ef4444':v&&BLOCKS[v]&&!BLOCKS[v].deco?bcol(BLOCKS[v].k):'#fff';x.beginPath();x.moveTo(...T);x.lineTo(...R1);x.lineTo(...Rb);x.lineTo(...Cb);x.lineTo(...Lb);x.lineTo(...L1);x.closePath();x.fill();x.globalAlpha=1;
        x.strokeStyle=del?'#fecaca':'#fff';x.lineWidth=Math.max(1.5,BB.a*.06);x.stroke();x.beginPath();x.moveTo(...C);x.lineTo(...R1);x.moveTo(...C);x.lineTo(...L1);x.moveTo(...C);x.lineTo(...Cb);x.stroke()}
      if(BB.prev.length>1){const l=pc[pc.length-1],p=proj(l[0]+.5,l[1]+.5,l[2]+1.6);x.font=`bold ${BB.a*.8}px sans-serif`;x.textAlign='center';x.fillStyle='#fff';x.strokeStyle='#0008';x.lineWidth=BB.a*.15;x.strokeText('×'+BB.prev.length,p[0],p[1]);x.fillText('×'+BB.prev.length,p[0],p[1])}}
    x.textAlign='center';x.textBaseline='bottom';x.font=`${BB.a*1.45}px sans-serif`;
    const an2=BB.animals.map(an=>{const[qx,qy]=rotXY(an.x,an.y);return[qx+qy,qx,qy,an]}).sort((p,q)=>p[0]-q[0]);
    for(const[,qx,qy,an]of an2){const p=proj(qx+.5,qy+.5,an.z);an.sx=p[0];an.sy=p[1]-BB.a*.4;const[tx2]=rotXY(an.tx,an.ty),[fx2]=rotXY(an.fx,an.fy),gd=proj(qx+.5,qy+.5,Math.floor(an.z+.01));
      x.fillStyle='#0003';x.beginPath();x.ellipse(gd[0],gd[1],BB.a*.35,BB.a*.15,0,0,7);x.fill();
      x.save();x.translate(p[0],p[1]+BB.a*.1);if(tx2-fx2<0||an.dir<0)x.scale(-1,1);x.fillStyle='#000';x.fillText(an.e,0,0);x.restore()}
    for(const p of FX.parts){x.globalAlpha=Math.min(1,p.l*1.5);if(p.flash){const g2=x.createRadialGradient(p.x,p.y,0,p.x,p.y,p.s);g2.addColorStop(0,'#fff');g2.addColorStop(.4,'#fde047cc');g2.addColorStop(1,'#f9731600');x.fillStyle=g2;x.globalAlpha=p.l*4;x.beginPath();x.arc(p.x,p.y,p.s,0,7);x.fill()}
      else if(p.smoke){x.fillStyle='#57534e';x.globalAlpha=Math.min(.5,p.l*.4);x.beginPath();x.arc(p.x,p.y,p.s*(2-p.l*.5),0,7);x.fill()}
      else if(p.em){x.save();x.translate(p.x,p.y);x.rotate((1.4-p.l)*8);x.fillStyle='#000';x.fillText(p.em,0,0);x.restore()}
      else if(p.heart){x.fillStyle='#000';x.font=`${p.s}px sans-serif`;x.fillText('❤️',p.x,p.y);x.font=`${BB.a*1.05}px sans-serif`}
      else{x.fillStyle=p.c;x.fillRect(p.x-p.s/2,p.y-p.s/2,p.s,p.s);x.fillStyle='#0003';x.fillRect(p.x-p.s/2,p.y,p.s,p.s/2)}}x.globalAlpha=1;
    if(BB.fp&&BB.prev){const[fx,fy]=BB.fp,Rr=Math.min(cv.width,cv.height)*.16,src=Rr*.9,ly=fy-Rr*1.9<Rr+4?fy+Rr*1.9:fy-Rr*1.9,lx=Math.max(Rr+4,Math.min(cv.width-Rr-4,fx));
      x.save();x.beginPath();x.arc(lx,ly,Rr,0,7);x.closePath();x.fillStyle='#bae6fd';x.fill();x.clip();x.imageSmoothingEnabled=false;x.drawImage(cv,fx-src/2,fy-src/2,src,src,lx-Rr,ly-Rr,Rr*2,Rr*2);x.restore();
      x.strokeStyle='#fff';x.lineWidth=5*dpr;x.beginPath();x.arc(lx,ly,Rr,0,7);x.stroke();x.strokeStyle='#0006';x.lineWidth=1.5*dpr;x.beginPath();x.arc(lx,ly,Rr+3*dpr,0,7);x.stroke();
      x.strokeStyle='#ef4444';x.lineWidth=2*dpr;x.beginPath();x.moveTo(lx-10*dpr,ly);x.lineTo(lx+10*dpr,ly);x.moveTo(lx,ly-10*dpr);x.lineTo(lx,ly+10*dpr);x.stroke()}}
  function ghost(rx,ry,z,gv){const[ga,gb]=unrot(rx,ry),bl=bbI(ga,gb,z-1),later=BB.goal.has(bl)&&!BB.w[bl],tex=bbTex(BLOCKS[gv].k),T=proj(rx,ry,z+1),R1=proj(rx+1,ry,z+1),C=proj(rx+1,ry+1,z+1),L1=proj(rx,ry+1,z+1),Cb=proj(rx+1,ry+1,z),Lb=proj(rx,ry+1,z),Rb=proj(rx+1,ry,z);
    x.globalAlpha=later?.14:.45;face(tex.top,T,[R1[0]-T[0],R1[1]-T[1]],[L1[0]-T[0],L1[1]-T[1]],0);face(tex.side,L1,[C[0]-L1[0],C[1]-L1[1]],[Lb[0]-L1[0],Lb[1]-L1[1]],.15);face(tex.side,C,[R1[0]-C[0],R1[1]-C[1]],[Cb[0]-C[0],Cb[1]-C[1]],.3);x.globalAlpha=1;
    if(later)return;x.strokeStyle='#ffffffcc';x.lineWidth=Math.max(1,BB.a*.05);x.setLineDash([BB.a*.15,BB.a*.1]);x.beginPath();x.moveTo(...T);x.lineTo(...R1);x.lineTo(...Rb);x.lineTo(...Cb);x.lineTo(...Lb);x.lineTo(...L1);x.closePath();x.moveTo(...C);x.lineTo(...R1);x.moveTo(...C);x.lineTo(...L1);x.moveTo(...C);x.lineTo(...Cb);x.stroke();x.setLineDash([]);
    faces.push({rx,ry,z,f:'top',ghost:1,poly:[T,R1,Rb,Cb,Lb,L1]})}
  function puff(cp,B){if(!B||B.deco)return;for(let i=0;i<8;i++)FX.parts.push({x:cp[0],y:cp[1],vx:(Math.random()-.5)*BB.a*.25,vy:-Math.random()*BB.a*.3,l:.6+Math.random()*.3,c:bcol(B.k),s:BB.a*(.14+Math.random()*.12)});return;const t=bbTex(B.k).top,img=x.getImageData?null:null,ps=[...Array(10)].map(()=>({x:cp[0],y:cp[1],vx:(Math.random()-.5)*BB.a*.25,vy:-Math.random()*BB.a*.25,s:BB.a*(.15+Math.random()*.15),sx:Math.floor(Math.random()*12),sy:Math.floor(Math.random()*12)}));let f=0;const st=()=>{if(!$('#bbc'))return;draw();ps.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=BB.a*.03;x.imageSmoothingEnabled=false;x.drawImage(t,p.sx,p.sy,4,4,p.x,p.y,p.s,p.s)});if(++f<22)requestAnimationFrame(st);else draw()};st()}
  function hit(px,py){for(let i=faces.length-1;i>=0;i--)if(inPoly(px,py,faces[i].poly))return faces[i];
    for(let rx=0;rx<BW;rx++)for(let ry=0;ry<BD;ry++){const P=[proj(rx,ry,0),proj(rx+1,ry,0),proj(rx+1,ry+1,0),proj(rx,ry+1,0)];if(inPoly(px,py,P))return{rx,ry,z:-1,f:'top',ground:1}}return null}
  function act(h){if(!h)return;const fb=BB.quiet?()=>{}:window.fb;
    if(!h.ground&&!h.ghost&&!BB.quiet){const[ta,tb]=unrot(h.rx,h.ry);if(get(ta,tb,h.z)==20){light(ta,tb,h.z,1.6);if(S.voice&&Math.random()<.4)say('Uh oh! Run!');return}}const save1=()=>{BB.undo.push(BB.w.slice());if(BB.undo.length>30)BB.undo.shift()};
    if(BB.tool=='break'){if(h.ground||h.ghost||(BB.goal&&h.z==0))return;const[a,b]=unrot(h.rx,h.ry);if(!get(a,b,h.z))return;save1();const kk=BLOCKS[BB.w[bbI(a,b,h.z)]],cp=proj(h.rx+.5,h.ry+.5,h.z+.5);BB.w[bbI(a,b,h.z)]=0;BB.quiet?tone(200,.05,0,'square',.06):SFX.hit();bbSave();draw();puff(cp,kk);return h.z}
    let rx=h.rx,ry=h.ry,z=h.z;if(h.ghost){}else if(h.f=='top')z++;else if(h.f=='left')ry++;else rx++;
    if(BB.goal){if(rx<0||ry<0||rx>=BW||ry>=BD||z<1||z>=BH){SFX.wrong();fb('Build on the see-through blocks! 👻','warn');return}const[a,b]=unrot(rx,ry),gi=bbI(a,b,z),want=BB.goal.get(gi);
      if(!want||get(a,b,z)){SFX.wrong();fb('Build on the see-through blocks! 👻','warn');return}
      {const bl=bbI(a,b,z-1);if(BB.goal.has(bl)&&!BB.w[bl]){SFX.wrong();fb('Build from the bottom up! ⬇️','warn');return}}
      if(BB.sel!=want){BB.miss++;SFX.wrong();fb(`Oops! That spot needs ${BLOCKS[want].n}`,'warn');const q=$(`[data-b="${want}"]`);if(q){anim(q,'pulse');q.classList.add('hint');setTimeout(()=>q.classList.remove('hint'),1500)}bbProg();return}
      save1();BB.w[gi]=want;BB.drop={i:gi,t:performance.now()};tone(300+z*60,.08,0,'square',.08);tone(600+z*60,.06,.04,'sine',.1);draw();bbProg();if([...BB.goal].every(([i,v])=>BB.w[i]==v))setTimeout(bbWin,350);return}
    if(BLOCKS[getR(h.rx,h.ry,h.z)]&&BLOCKS[getR(h.rx,h.ry,h.z)].deco&&!h.ground){z=h.z;rx=h.rx;ry=h.ry;return}
    if(rx<0||ry<0||rx>=BW||ry>=BD||z<0||z>=BH){SFX.wrong();fb('Too far!','warn');return}const[a,b]=unrot(rx,ry);if(get(a,b,z))return;
    const B=BLOCKS[BB.sel];if(B.deco&&z>0&&!opaque(get(a,b,z-1))&&get(a,b,z-1)!=10){SFX.wrong();fb('Put it on top of a block!','warn');return}
    if(BB.sel==19)for(let i=0;i<BB.w.length;i++)if(BB.w[i]==19)BB.w[i]=0;
    save1();BB.w[bbI(a,b,z)]=BB.sel;BB.drop={i:bbI(a,b,z),t:performance.now()};tone(300+z*60,.08,0,'square',.08);tone(600+z*60,.06,.04,'sine',.1);bbSave();draw();return z}
  const ptrs=new Map();let pd=null,pinch=null;BB.stamp=0;
  const cpos=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*dpr,(e.clientY-r.top)*dpr]};
  const inB=(a,b,z)=>a>=0&&b>=0&&z>=0&&a<BW&&b<BD&&z<BH;
  const plane=(px,py,z)=>{const u=(px-BB.ox)/BB.a,v=2*(py-BB.oy+z*BB.a)/BB.a,rx=Math.floor((u+v)/2),ry=Math.floor((v-u)/2),[a,b]=unrot(Math.max(0,Math.min(BW-1,rx)),Math.max(0,Math.min(BD-1,ry)));return{a,b,z}};
  const tgt=h=>{if(!h||h.ghost)return null;let rx=h.rx,ry=h.ry,z=h.z;if(h.f=='top')z++;else if(h.f=='left')ry++;else rx++;const[a,b]=unrot(rx,ry);return inB(a,b,z)?{a,b,z}:null};
  const bres=(x0,y0,x1,y1)=>{const o=[],dx=Math.abs(x1-x0),dy=Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1;let e=dx-dy;for(let k=0;k<64;k++){o.push([x0,y0]);if(x0==x1&&y0==y1)break;const e2=2*e;if(e2>-dy){e-=dy;x0+=sx}if(e2<dx){e+=dx;y0+=sy}}return o};
  function cellsFor(){const t0=pd.t0,t1=pd.t1||t0,T=BB.tool,o=[];if(!t0)return o;
    if(T=='build')o.push([t0.a,t0.b,t0.z,BB.sel]);
    else if(T=='line'||T=='wall')for(const[a,b]of bres(t0.a,t0.b,t1.a,t1.b))for(let k=0;k<(T=='wall'?3:1);k++)o.push([a,b,t0.z+k,BB.sel]);
    else if(T=='floor'){for(let a=Math.min(t0.a,t1.a);a<=Math.max(t0.a,t1.a);a++)for(let b=Math.min(t0.b,t1.b);b<=Math.max(t0.b,t1.b);b++)o.push([a,b,t0.z,BB.sel])}
    else if(T=='stamp')for(const[dx,dy,dz,v]of BBSTAMPS[BB.stamp].c){const[rx,ry]=[dx,dy],q=BB.rot==0?[rx,ry]:BB.rot==1?[ry,-rx]:BB.rot==2?[-rx,-ry]:[-ry,rx];o.push([t0.a+q[0],t0.b+q[1],t0.z+dz,v])}
    else if(T=='break'){for(let a=Math.min(t0.a,t1.a);a<=Math.max(t0.a,t1.a);a++)for(let b=Math.min(t0.b,t1.b);b<=Math.max(t0.b,t1.b);b++)if(get(a,b,t0.z))o.push([a,b,t0.z,0])}
    return o.filter(c=>inB(c[0],c[1],c[2])&&(T=='break'||!get(c[0],c[1],c[2])))}
  function commit(cells){if(!cells.length)return;BB.undo.push(BB.w.slice());if(BB.undo.length>30)BB.undo.shift();
    if(BB.tool=='break'){let k=0;for(const[a,b,z]of cells){const v=BB.w[bbI(a,b,z)];if(v==20){light(a,b,z,.4);continue}BB.w[bbI(a,b,z)]=0;if(k++<14){const[qx,qy]=rotXY(a,b);puff(proj(qx+.5,qy+.5,z+.5),BLOCKS[v])}}SFX.hit()}
    else{if(cells.some(c=>c[3]==19))for(let i=0;i<BB.w.length;i++)if(BB.w[i]==19)BB.w[i]=0;let top=0;for(const[a,b,z,v]of cells){BB.w[bbI(a,b,z)]=v;top=Math.max(top,z)}if(cells.length==1){const[a,b,z]=cells[0];BB.drop={i:bbI(a,b,z),t:performance.now()}}
      tone(300+top*50,.08,0,'square',.08);tone(600+top*50,.06,.04,'sine',.1);if(cells.length>3){tone(800,.08,.08,'sine',.1);tone(1000,.1,.14,'sine',.1)}}
    bbSave();draw()}
  cv.addEventListener('pointerdown',e=>{e.preventDefault();cv.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,[e.clientX,e.clientY]);
    if(ptrs.size==2){BB.fp=null;const[p1,p2]=[...ptrs.values()];pinch={d:Math.hypot(p1[0]-p2[0],p1[1]-p2[1]),mx:(p1[0]+p2[0])/2,my:(p1[1]+p2[1])/2};pd=null;BB.prev=null;return}
    if(ptrs.size>2)return;const p=cpos(e);
    const an=BB.animals.find(a=>a.sx&&Math.hypot(a.sx-p[0],a.sy-p[1])<BB.a*.6);if(an){if(an.hop>=1)Object.assign(an,{fx:an.x,fy:an.y,fz:Math.round(an.z),tx:an.x,ty:an.y,tz:Math.round(an.z),hop:0});an.dir*=-1;FX.parts.push({x:an.sx,y:an.sy-BB.a*.4,vx:0,vy:-BB.a*.05,l:1,heart:1,smoke:1,s:BB.a*.8});tone(700+Math.random()*300,.1,0,'sine',.15);pd=null;return}
    const h=hit(...p);if(BB.goal){pd={chal:h,p0:p};return}
    pd={p0:p,mv:0,t:performance.now()};BB.fp=p;if(h&&!h.ground&&!h.ghost){const[ta,tb]=unrot(h.rx,h.ry);if(get(ta,tb,h.z)==20&&(BB.tool=='build'||BB.tool=='break')){pd.tnt=[ta,tb,h.z]}}
    if(BB.tool=='break'){if(h&&!h.ground&&!h.ghost){const[a,b]=unrot(h.rx,h.ry);pd.t0={a,b,z:h.z}}}else pd.t0=tgt(h);
    if(!pd.t0&&h&&h.ground&&BB.tool!='break'){const[a,b]=unrot(h.rx,h.ry);pd.t0={a,b,z:0}}
    BB.prev=pd.t0?cellsFor():null});
  cv.addEventListener('pointermove',e=>{if(!ptrs.has(e.pointerId))return;ptrs.set(e.pointerId,[e.clientX,e.clientY]);
    if(pinch&&ptrs.size==2){const[p1,p2]=[...ptrs.values()],d=Math.hypot(p1[0]-p2[0],p1[1]-p2[1]),mx=(p1[0]+p2[0])/2,my=(p1[1]+p2[1])/2,r=cv.getBoundingClientRect(),sx=(mx-r.left)*dpr,sy=(my-r.top)*dpr;
      layout();const u=(sx-BB.ox)/BB.a,v=2*(sy-BB.oy)/BB.a;BB.zoom=Math.max(.8,Math.min(3.2,BB.zoom*d/pinch.d));layout();const nx=BB.ox+u*BB.a,ny=BB.oy+v*BB.a/2;
      BB.px+=(sx-nx)/dpr+(mx-pinch.mx);BB.py+=(sy-ny)/dpr+(my-pinch.my);pinch.d=d;pinch.mx=mx;pinch.my=my;clampPan();draw();return}
    if(!pd||pd.chal!==undefined)return;const p=cpos(e);BB.fp=p;if(Math.hypot(p[0]-pd.p0[0],p[1]-pd.p0[1])>8*dpr)pd.mv=1;
    if(BB.tool=='build'||BB.tool=='stamp'){const t=tgt(hit(...p));if(t)pd.t0=t}else if(pd.t0)pd.t1=plane(p[0],p[1],pd.t0.z);
    BB.prev=pd.t0?cellsFor():null;FX.dirty=1});
  const up=e=>{ptrs.delete(e.pointerId);BB.fp=null;if(pinch){if(ptrs.size<2)pinch=null;pd=null;BB.prev=null;return}if(!pd)return;const P=pd;pd=null;
    if(P.chal!==undefined){act(P.chal);return}
    if(P.tnt&&!P.mv){BB.prev=null;light(...P.tnt,1.6);if(S.voice&&Math.random()<.4)say('Uh oh! Run!');return}
    const cells=P.t0?cellsFor.call(null,(pd=P,0)):[];pd=null;BB.prev=null;
    if(!cells.length){if(P.t0===undefined||!P.t0){SFX.wrong()}FX.dirty=1;return}
    const B=BLOCKS[BB.sel];if(BB.tool=='build'&&B.deco){const[a,b,z]=cells[0];if(z>0&&!opaque(get(a,b,z-1))&&get(a,b,z-1)!=10){SFX.wrong();fb('Put it on top of a block!','warn');return}}
    commit(cells)};
  cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',e=>{ptrs.delete(e.pointerId);BB.fp=null;pd=null;pinch=null;BB.prev=null;FX.dirty=1});
  $$('[data-b]').forEach(b=>b.onclick=()=>{const i=+b.dataset.b,B=BLOCKS[i];if(B.need&&S.stars<B.need){SFX.wrong();anim(b,'sad');fb(`Earn ${B.need} ⭐ to unlock ${B.n}!`,'warn long',2500);return}
    BB.sel=i;$$('[data-b]').forEach(q=>q.classList.toggle('on',q==b));if(BB.tool=='break'||BB.tool=='stamp')setTool('build');SFX.pop(2)});
  const setTool=t=>{BB.tool=t;$$('[data-tool]').forEach(q=>q.classList.toggle('on',q.dataset.tool==t));const st=$('#bbst');if(st){st.style.display=t=='stamp'?'':'none';$('#bbpal').style.display=t=='stamp'?'none':''}};
  $$('[data-stamp]').forEach(b=>b.onclick=()=>{BB.stamp=+b.dataset.stamp;$$('[data-stamp]').forEach(q=>q.classList.toggle('on',q==b));SFX.pop(2)});
  const TIPS={build:'Press and slide: the bubble shows exactly where the block goes. Lift to place.',line:'Drag to draw a line of blocks',wall:'Drag to build a wall 3 blocks tall',floor:'Drag to fill a floor',stamp:'Pick a stamp below, then tap to place it',break:'Tap a block to break it, or drag to clear an area'};
  const tip=t=>{let el=$('#bbtip');if(!el){el=document.createElement('div');el.id='bbtip';el.className='bbtip';cv.parentNode.appendChild(el)}el.textContent=t;el.classList.add('on');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('on'),2200)};
  $$('[data-tool]').forEach(b=>b.onclick=()=>{setTool(b.dataset.tool);SFX.pop(1);if(!BB.goal)tip(TIPS[b.dataset.tool])});
  $('#bbundo').onclick=()=>{if(BB.undo.length){BB.w=BB.undo.pop();bbSave();draw();SFX.del()}};
  $('#bbrl').onclick=()=>{BB.rot=(BB.rot+3)%4;SFX.whoosh();draw()};$('#bbrr').onclick=()=>{BB.rot=(BB.rot+1)%4;SFX.whoosh();draw()};
  $('#bbzoom').onclick=e=>{BB.zoom=BB.zoom<1.5?1.7:BB.zoom<2.3?2.5:1;BB.px=BB.py=0;SFX.whoosh();draw();tip('Tip: pinch with 2 fingers to zoom and move')};$('#bbnight').onclick=e=>{BB.night=!BB.night;e.currentTarget.textContent=BB.night?'☀️':'🌙';draw()};
  $('#back').onclick=()=>{bbSave();gtStop();bbMenu()};if($('#bbpet'))$('#bbpet').onclick=spawn;
  function bbProg(){const p=$('#bbprog');if(!p)return;const n=[...BB.goal].filter(([i,v])=>BB.w[i]==v).length;p.textContent=`🧱 ${n}/${BB.total}${BB.miss?' · ❌'+BB.miss:''}`}
  if(BB.goal)bbProg();
  BB.api={act,hit,get faces(){return faces}};
  $(`[data-b="${BB.sel}"]`).classList.add('on');
  if(!CH)BB.zoom=cv.parentNode.clientHeight>cv.parentNode.clientWidth*1.1?1.7:1.6;size();clampPan();draw();BB.size=size;requestAnimationFrame(frame);if(!CH){spawn();spawn()}if(!window._bbrs){window._bbrs=1;let rs;addEventListener('resize',()=>{clearTimeout(rs);rs=setTimeout(()=>{if($('#bbc')&&BB&&BB.size)BB.size()},120)})}
  gtStart('#gtm',()=>{bbSave();timeUpOverlay()});if(S.voice)setTimeout(()=>say(CH?`Build the ${CH[0]}! Fill in the see-through blocks.`:'Build anything! Tap TNT to blow it up!'),300)}
function bbFlat(){const w=new Uint8Array(BW*BD*BH);for(let x=0;x<BW;x++)for(let y=0;y<BD;y++)w[bbI(x,y,0)]=1;return w}
function bbWin(){if(!BB||BB.ch==null||!$('#bbc'))return;const ci=BB.ch,arr=bbChS(),st=BB.miss<=1?3:BB.miss<=4?2:1,old=arr[ci]||0;arr[ci]=Math.max(old,st);const coins=Math.max(0,st-old)*3+1;S.coins+=coins;save();
  SFX.fanfare();confetti(60);if(S.voice)say(st==3?'Perfect build! Three stars!':'You built it!');const o=document.createElement('div');o.className='ovl';
  o.innerHTML=`<div class="endcard"><div style="font-size:56px">${BBCH[ci][1]}</div><h1>${BBCH[ci][0]} built!</h1><div class="lvstars">${[1,2,3].map(k=>`<span class="lvstar ${k<=st?'on':''}" style="animation-delay:${k*.25}s">⭐</span>`).join('')}</div>
   <div class="msg">${BB.miss?`${BB.miss} wrong block${BB.miss>1?'s':''}. `:'No mistakes! '}+${coins} 🪙</div><div class="rowh">${ci+1<BBCH.length?'<button class="btn big" id="bbnx">Next build ▶</button>':''}<button class="btn" id="bbre">↻ Again</button><button class="btn" id="bbls">☰</button></div></div>`;
  document.body.appendChild(o);const go=f=>{o.remove();f()};if(o.querySelector('#bbnx'))o.querySelector('#bbnx').onclick=()=>go(()=>blockBuilder(ci+1));o.querySelector('#bbre').onclick=()=>go(()=>blockBuilder(ci));o.querySelector('#bbls').onclick=()=>go(()=>{gtStop();bbMenu()})}
function bbSave(){if(!BB||BB.ch!=null)return;const bs=bbS();bs.worlds[bs.cur].d=bbEncode(BB.w);save()}
function bbIcon(x,i,sz){const B=BLOCKS[i];x.clearRect(0,0,sz,sz);if(B.deco){x.font=`${sz*.7}px sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText(B.deco=='pet'?petE():B.deco,sz/2,sz/2+2);return}
  const t=bbTex(B.k),a=sz*.42,cx=sz/2,top=sz*.1,f=(tex,O,U,V,sh)=>{x.save();x.beginPath();x.moveTo(...O);x.lineTo(O[0]+U[0],O[1]+U[1]);x.lineTo(O[0]+U[0]+V[0],O[1]+U[1]+V[1]);x.lineTo(O[0]+V[0],O[1]+V[1]);x.closePath();x.clip();
    x.setTransform(U[0]/16,U[1]/16,V[0]/16,V[1]/16,O[0],O[1]);x.imageSmoothingEnabled=false;x.drawImage(tex,0,0);x.setTransform(1,0,0,1,0,0);if(sh){x.fillStyle=`rgba(0,0,0,${sh})`;x.fill()}x.restore()};
  f(t.top,[cx,top],[a,a/2],[-a,a/2],0);f(t.side,[cx-a,top+a/2],[a,a/2],[0,a],.18);f(t.side,[cx,top+a],[a,-a/2],[0,a],.34)}
const BBWT=[['island','🏝️','Island','Hills, beach, trees and sea'],['mountain','🏔️','Mountains','Tall peaks with snow on top'],['desert','🏜️','Desert','Sand, cactus and an oasis'],['flat','🟩','Flat','Empty grass for big builds']];
function bbMenu(){const bs=bbS();
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title">🧱 Block Builder</div><div class="sp"></div><div class="stars">🎟️ ${fmtT(ptLeft())}</div></div>
  <div class="scroll"><div class="tipcard">Build anything! <b>Drag</b> to build or break lots of blocks fast. Tap 💣 <b>TNT</b> to blow it up (↩️ undoes it). 🐾 adds animals. 🌙 makes night, so lamps and lava glow.</div>
  <h2>My Worlds</h2><div class="games">${bs.worlds.map((w,i)=>`<div class="bbwrow"><button class="btn game" data-w="${i}" style="background:linear-gradient(135deg,#bbf7d0,#7dd3fc)"><span class="ge">${w.e||'🏝️'}</span><span class="gi"><span class="gt">${esc(w.name)}</span><span class="small">${bbDecode(w.d).filter(v=>v).length} blocks</span></span><span class="go">▶</span></button>${bs.worlds.length>1?`<button class="btn sm" data-del="${i}">🗑️</button>`:''}</div>`).join('')}
   ${bs.worlds.length<4?'<button class="btn game" id="bbnew" style="background:#fff"><span class="ge">➕</span><span class="gi"><span class="gt">New World</span><span class="small">Island, mountains, desert or flat</span></span></button>':''}</div>
  <h2>📐 Blueprints <span class="small">${bbChS().reduce((a,b)=>a+(b||0),0)}/${BBCH.length*3} ⭐ · copy the see-through build</span></h2><div class="lvgrid">${BBCH.map(([n,e],i)=>{const ok=i==0||(bbChS()[i-1]||0)>0,sv=bbChS()[i]||0;return`<button class="btn lvb ${ok?'':'lock'} ${sv?'done':''}" data-ch="${i}"><b>${ok?e:'🔒'}</b><span class="lvs">${[1,2,3].map(k=>k<=sv?'⭐':'☆').join('')}</span><small>${i+1}. ${n}</small></button>`}).join('')}</div></div>`);
  $('#back').onclick=gameRoom;
  $$('[data-ch]').forEach(b=>b.onclick=()=>{const i=+b.dataset.ch;if(i>0&&!(bbChS()[i-1]>0)){SFX.wrong();anim(b,'sad');fb('Finish the build before it first!','warn');return}if(ptLeft()<=0){SFX.wrong();fb('🎟️ '+ptWhyNot(),'warn long',3000);return}SFX.whoosh();blockBuilder(i)});
  $$('[data-w]').forEach(b=>b.onclick=()=>{if(ptLeft()<=0){SFX.wrong();fb('🎟️ '+ptWhyNot(),'warn long',3000);return}bs.cur=+b.dataset.w;save();SFX.whoosh();blockBuilder()});
  $$('[data-del]').forEach(b=>b.onclick=()=>{const i=+b.dataset.del;if(b.dataset.sure){bs.worlds.splice(i,1);bs.cur=0;save();SFX.del();bbMenu()}else{b.dataset.sure=1;b.textContent='Sure?';b.style.background='#fecaca'}});
  if($('#bbnew'))$('#bbnew').onclick=()=>{const o=document.createElement('div');o.className='ovl';o.innerHTML=`<div style="background:#fff;color:var(--ink);border-radius:24px;padding:18px;max-width:520px;width:92vw;text-align:center"><h2 style="margin:0 0 10px">Pick a world</h2><div class="games">${BBWT.map(([k,e,n,d])=>`<button class="btn game" data-t="${k}"><span class="ge">${e}</span><span class="gi"><span class="gt">${n}</span><span class="small">${d}</span></span></button>`).join('')}</div><button class="btn" id="mx" style="margin-top:10px">Cancel</button></div>`;
    document.body.appendChild(o);o.querySelector('#mx').onclick=()=>o.remove();o.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{const t=BBWT.find(q=>q[0]==b.dataset.t);bs.worlds.push({name:`${t[2]} ${bs.worlds.length+1}`,e:t[1],d:bbEncode(bbGen(t[0],R(1,9999)))});bs.cur=bs.worlds.length-1;save();o.remove();SFX.magic();if(ptLeft()>0)blockBuilder();else bbMenu()})}}

