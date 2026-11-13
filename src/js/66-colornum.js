/* ---------- color by number ---------- */
const CB_COL={rojo:['#ef4444','red'],azul:['#3b82f6','blue'],celeste:['#7dd3fc','light blue'],verde:['#22c55e','green'],'verde oscuro':['#15803d','dark green'],amarillo:['#facc15','yellow'],
  naranja:['#f97316','orange'],morado:['#a855f7','purple'],rosa:['#f9a8d4','pink'],negro:['#27272a','black'],blanco:['#ffffff','white'],'café':['#92400e','brown'],gris:['#a8a29e','gray']};
const CBN=16;
function cbGrid(bg){return Array.from({length:CBN*CBN},()=>bg)}
function cbShape(g,col,test){for(let y=0;y<CBN;y++)for(let x=0;x<CBN;x++)if(test(x+.5,y+.5))g[y*CBN+x]=col}
const inPoly=(px,py,P)=>{let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const[xi,yi]=P[i],[xj,yj]=P[j];if((yi>py)!=(yj>py)&&px<(xj-xi)*(py-yi)/(yj-yi)+xi)c=!c}return c};
const circ=(cx,cy,r)=>(x,y)=>(x-cx)**2+(y-cy)**2<=r*r,ell=(cx,cy,rx,ry)=>(x,y)=>((x-cx)/rx)**2+((y-cy)/ry)**2<=1,box=(a,b,c,d)=>(x,y)=>x>=a&&x<=c&&y>=b&&y<=d,poly=P=>(x,y)=>inPoly(x,y,P);
const CB_PICS=[
 ['heart','Heart',g=>{const G=cbGrid('rosa');cbShape(G,'rojo',(x,y)=>{const X=(x-8)/6.2,Y=-(y-8.6)/6.2;return(X*X+Y*Y-1)**3-X*X*Y*Y*Y<0});cbShape(G,'blanco',circ(5.2,5.8,1.1));return G}],
 ['sun','Sunny Day',g=>{const G=cbGrid('celeste');for(let a=0;a<8;a++){const c=Math.cos(a*Math.PI/4),s=Math.sin(a*Math.PI/4);cbShape(G,'naranja',(x,y)=>{const dx=x-8,dy=y-8,t=dx*c+dy*s,n=Math.abs(-dx*s+dy*c);return t>4.5&&t<7.6&&n<.9})}
   cbShape(G,'amarillo',circ(8,8,4.6));cbShape(G,'negro',circ(6.3,7,.75));cbShape(G,'negro',circ(9.7,7,.75));cbShape(G,'rojo',(x,y)=>(x-8)**2+(y-8.4)**2<6.5&&(x-8)**2+(y-8.4)**2>3&&y>8.9);return G}],
 ['fish','Fishy',g=>{const G=cbGrid('celeste');cbShape(G,'naranja',poly([[11,8],[15.5,4],[15.5,12]]));cbShape(G,'naranja',ell(7,8,5.4,3.8));cbShape(G,'amarillo',(x,y)=>ell(7,8,5.4,3.8)(x,y)&&(Math.abs(x-6)<.9||Math.abs(x-9)<.9));
   cbShape(G,'blanco',circ(3.5,7,1.3));G[6*CBN+3]='negro';cbShape(G,'blanco',circ(12,2.5,.8));cbShape(G,'blanco',circ(13.6,1.2,.6));cbShape(G,'verde',box(0,14,16,16));cbShape(G,'verde',poly([[2,14],[3,10],[4,14]]));return G}],
 ['rocket','Rocket',g=>{const G=cbGrid('azul');[[2,2],[13,3],[3,12],[12,13],[1,7]].forEach(([a,b])=>cbShape(G,'amarillo',box(a,b,a+.9,b+.9)));
   cbShape(G,'rojo',poly([[3,14],[5.6,8.5],[5.6,14]]));cbShape(G,'rojo',poly([[13,14],[10.4,8.5],[10.4,14]]));cbShape(G,'blanco',box(5.5,5,10.5,13.5));cbShape(G,'rojo',poly([[5.5,5],[8,1],[10.5,5]]));
   cbShape(G,'celeste',circ(8,7.6,1.5));cbShape(G,'naranja',poly([[6.5,13.5],[8,16],[9.5,13.5]]));cbShape(G,'amarillo',poly([[7.3,13.5],[8,15],[8.7,13.5]]));return G}],
 ['house','Home',g=>{const G=cbGrid('celeste');cbShape(G,'verde',box(0,13,16,16));cbShape(G,'amarillo',circ(13.5,2.5,1.8));cbShape(G,'café',box(3,7,13,13));cbShape(G,'rojo',poly([[1.5,7.5],[8,2],[14.5,7.5]]));
   cbShape(G,'amarillo',box(9.5,8.5,11.5,10.5));cbShape(G,'blanco',box(7,9,9,13));cbShape(G,'amarillo',box(4.5,8.5,6.5,10.5));return G}],
 ['rainbow','Rainbow',g=>{const G=cbGrid('celeste');[['rojo',7.5],['naranja',6.5],['amarillo',5.5],['verde',4.5],['azul',3.5],['morado',2.5]].forEach(([c,r])=>cbShape(G,c,(x,y)=>y<=12&&(x-8)**2+(y-12)**2<=r*r));
   cbShape(G,'celeste',(x,y)=>y<=12&&(x-8)**2+(y-12)**2<=1.6*1.6);cbShape(G,'blanco',(x,y)=>circ(2.5,12,1.8)(x,y)||circ(4.3,12.4,1.6)(x,y)||circ(13.5,12,1.8)(x,y)||circ(11.7,12.4,1.6)(x,y));cbShape(G,'verde',box(0,14,16,16));return G}],
 ['flower','Flower',g=>{const G=cbGrid('celeste');cbShape(G,'verde',box(0,14,16,16));cbShape(G,'verde oscuro',box(7.5,8,8.5,15));cbShape(G,'verde oscuro',ell(5.5,11.5,2,1));cbShape(G,'verde oscuro',ell(10.5,12,2,1));
   for(let a=0;a<6;a++)cbShape(G,'rosa',circ(8+Math.cos(a*1.047)*2.8,5.5+Math.sin(a*1.047)*2.8,1.9));cbShape(G,'amarillo',circ(8,5.5,1.9));return G}],
 ['ladybug','Ladybug',g=>{const G=cbGrid('verde');cbShape(G,'verde oscuro',(x,y)=>Math.abs(((x*1.7+y)%5)-2.5)<.5&&y>12);cbShape(G,'negro',circ(8,4,2.6));cbShape(G,'rojo',circ(8,9.5,5.2));cbShape(G,'negro',box(7.6,4.5,8.4,14.7));
   [[5.5,8],[10.5,8],[5.6,11.5],[10.4,11.5]].forEach(([a,b])=>cbShape(G,'negro',circ(a,b,1.1)));cbShape(G,'blanco',circ(6.9,3.4,.55));cbShape(G,'blanco',circ(9.1,3.4,.55));return G}],
 ['icecream','Ice Cream',g=>{const G=cbGrid('rosa');cbShape(G,'café',poly([[4.5,8.5],[11.5,8.5],[8,15.5]]));cbShape(G,'amarillo',(x,y)=>poly([[4.5,8.5],[11.5,8.5],[8,15.5]])(x,y)&&Math.abs(((x+y)%2.4)-1.2)<.3);
   cbShape(G,'blanco',circ(6,7.5,2.4));cbShape(G,'morado',circ(10,7.5,2.4));cbShape(G,'blanco',circ(8,5,2.6));cbShape(G,'rojo',circ(8,1.8,1.1));return G}],
 ['tree','Apple Tree',g=>{const G=cbGrid('celeste');cbShape(G,'verde',box(0,13.5,16,16));cbShape(G,'café',box(6.8,9,9.2,14));cbShape(G,'verde oscuro',(x,y)=>circ(8,6,4.6)(x,y)||circ(4.8,8,2.6)(x,y)||circ(11.2,8,2.6)(x,y));
   [[6,5],[9.5,4],[10.5,8],[5,8.5],[8,8]].forEach(([a,b])=>cbShape(G,'rojo',circ(a,b,.75)));return G}],
 ['truck','Monster Truck',g=>{const G=cbGrid('celeste');cbShape(G,'café',box(0,13.5,16,16));cbShape(G,'rojo',box(1.5,7,14.5,11));cbShape(G,'rojo',poly([[5,7],[6.5,3.5],[11,3.5],[12,7]]));
   cbShape(G,'celeste',poly([[6.5,6.8],[7.5,4.3],[10.3,4.3],[11,6.8]]));cbShape(G,'negro',circ(4.5,12,2.5));cbShape(G,'negro',circ(11.5,12,2.5));cbShape(G,'gris',circ(4.5,12,1));cbShape(G,'gris',circ(11.5,12,1));cbShape(G,'amarillo',box(13.5,8,14.5,9));return G}],
 ['star','Happy Star',g=>{const G=cbGrid('azul');const P=[];for(let i=0;i<10;i++){const r=i%2?3.2:7.4,a=-Math.PI/2+i*Math.PI/5;P.push([8+Math.cos(a)*r,8.6+Math.sin(a)*r])}cbShape(G,'amarillo',poly(P));
   cbShape(G,'negro',circ(6.5,8,.7));cbShape(G,'negro',circ(9.5,8,.7));cbShape(G,'rojo',(x,y)=>(x-8)**2+(y-9.4)**2<3.2&&y>9.6);cbShape(G,'rosa',circ(5.3,9.6,.7));cbShape(G,'rosa',circ(10.7,9.6,.7));
   [[2,2],[14,3],[1.5,14],[14.5,14]].forEach(([a,b])=>cbShape(G,'blanco',box(a,b,a+.9,b+.9)));return G}]];
function cbData(id){const p=CB_PICS.find(x=>x[0]==id),G=p[2]();const keys=[];G.forEach(k=>{if(!keys.includes(k))keys.push(k)});return{id,name:p[1],G,keys,num:G.map(k=>keys.indexOf(k)+1)}}
function cbS(){return S.cbn=Object.assign({done:{},prog:{},art:[]},S.cbn||{})}
function cbThumb(G,fill,size=96){const c=document.createElement('canvas');c.setAttribute('aria-hidden','true');c.width=c.height=size;const x=c.getContext('2d'),s=size/CBN;
  G.forEach((k,i)=>{x.fillStyle=fill&&fill[i]=='1'||fill===true?CB_COL[k][0]:shade(CB_COL[k][0],.72);x.fillRect((i%CBN)*s,Math.floor(i/CBN)*s,s+.5,s+.5)});return c.toDataURL()}

let CBTAB='shape';
function cbFact(n,lv){const r=Math.random();
  if(lv==1){if(r<.35){const big=n+R(1,5);return`${big} − ${big-n}`}const a=R(0,n);return`${a} + ${n-a}`}
  if(lv==2){if(r<.4){const big=n+R(6,12);return`${big} − ${big-n}`}if(r<.7){const a=R(0,n),b=R(1,5);return`${a+b} + ${n-a} − ${b}`}if(n>1){const c=R(1,Math.min(5,n-1)),a=R(2,6);return`${n-c+a} − ${a} + ${c}`}const a=R(0,n);return`${a} + ${n-a}`}
  const fs=[];for(let a=2;a<=n;a++)if(n%a==0&&n/a>1)fs.push(a);if(fs.length&&r<.4){const a=pick(fs);return`${a} × ${n/a}`}
  if(r<.7){const k=R(2,5);return`${n*k} ÷ ${k}`}const a=R(2,4),b=R(2,4);return a*b==n?`${a} × ${b}`:a*b>n?`${a} × ${b} − ${a*b-n}`:`${a} × ${b} + ${n-a*b}`}
function modeChooser(onPick,withFree){const o=document.createElement('div');o.className='ovl';
  o.innerHTML=`<div style="background:#fff;color:var(--ink);border-radius:24px;padding:20px;max-width:520px;width:92vw;text-align:center"><h2 style="margin:0 0 10px">How do you want to color?</h2>
   <div class="games">${withFree?'<button class="btn game" data-m="free" style="background:#fce7f3"><span class="ge">🖌️</span><span class="gi"><span class="gt">Color It My Way</span><span class="small">Pick any colors you like</span></span></button>':''}
   <button class="btn game" data-m="num" style="background:#dbeafe"><span class="ge">🔢</span><span class="gi"><span class="gt">Color by Number</span><span class="small">Match the number to the color</span></span></button>
   <div class="mrow" style="background:#fef3c7"><span class="ge">➕</span><span class="gt">Math Colors</span><div><button class="btn sm" data-m="math">⭐ Easy</button><button class="btn sm" data-m="math2">⭐⭐ Medium</button><button class="btn sm" data-m="math3">⭐⭐⭐ Hard</button></div></div>
   <div class="mrow" style="background:#dcfce7"><span class="ge">🌮</span><span class="gt">Spanish Colors</span><div><button class="btn sm" data-m="es">🔊 With colors</button><button class="btn sm" data-m="es2">📖 Words only</button></div></div></div><button class="btn" id="mx" style="margin-top:10px">Cancel</button></div>`;
  document.body.appendChild(o);o.querySelector('#mx').onclick=()=>o.remove();o.querySelectorAll('[data-m]').forEach(m=>m.onclick=()=>{o.remove();SFX.whoosh();onPick(m.dataset.m)})}
