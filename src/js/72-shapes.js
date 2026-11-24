/* ---------- shape coloring pages (vector) ---------- */
Object.assign(CB_COL,{'gris oscuro':['#71717a','dark gray'],'café oscuro':['#5b3416','dark brown'],'azul oscuro':['#1e3a8a','dark blue'],beige:['#fde9c4','tan'],turquesa:['#14b8a6','teal']});
const SE=(cx,cy,rx,ry)=>`M${cx-rx},${cy}a${rx},${ry} 0 1,0 ${rx*2},0a${rx},${ry} 0 1,0 ${-rx*2},0Z`,SC=(cx,cy,r)=>SE(cx,cy,r,r),SR=(x,y,w,h,r=0)=>r?`M${x+r},${y}h${w-2*r}a${r},${r} 0 0 1 ${r},${r}v${h-2*r}a${r},${r} 0 0 1 ${-r},${r}h${-(w-2*r)}a${r},${r} 0 0 1 ${-r},${-r}v${-(h-2*r)}a${r},${r} 0 0 1 ${r},${-r}Z`:`M${x},${y}h${w}v${h}h${-w}Z`,
  SP=pts=>'M'+pts.map(p=>p.join(',')).join('L')+'Z',
  MIR=d=>d.replace(/([MLCQ])([^MLCQZ]*)/g,(m,c,a)=>c+a.trim().split(/[\s,]+/).map((v,i)=>i%2?v:(300-+v).toFixed(1)).join(',')),
  WAVY=(cx,cy,r,amp,n,pts=96)=>SP(Array.from({length:pts},(_,i)=>{const a=i/pts*Math.PI*2,rr=r+amp*Math.sin(a*n);return[(cx+Math.cos(a)*rr).toFixed(1),(cy+Math.sin(a)*rr).toFixed(1)]}));
// region: [path, colorKey, opts]  opts: {fix:true} = pre-colored decoration, {l:[x,y]} label spot
const SHAPES=[
 ['elephant','Elephant',()=>[[SR(0,0,300,300),'celeste'],[SC(250,52,26),'amarillo'],[SR(0,228,300,72),'verde'],
   [SR(140,185,28,58,10),'gris oscuro'],[SR(222,182,28,60,10),'gris oscuro'],[SE(175,158,85,58),'gris'],[SR(108,188,30,62,11),'gris'],[SR(192,192,30,58,11),'gris'],
   ['M258,150 C275,160 280,175 272,190 C268,196 262,192 265,186 C270,175 266,165 252,158 Z','gris oscuro',{l:[268,178]}],
   [SE(130,118,36,46),'gris oscuro'],[SE(132,120,24,32),'rosa'],[SC(92,122,44),'gris'],
   ['M60,128 C34,166 32,206 52,224 C62,232 80,226 74,213 C60,198 68,178 98,156 Z','gris',{l:[52,196]}],
   ['M84,150 C80,172 70,180 60,178 C72,170 76,160 76,146 Z','blanco',{l:[72,168]}],[SC(84,110,5.5),'negro',{fix:1}],[SC(85.5,108.5,1.8),'blanco',{fix:1}]]],
 ['eagle','Eagle',()=>{const wing='M150,150 C115,108 62,96 14,112 C38,122 30,132 52,138 C32,148 44,156 68,156 C52,168 70,172 94,168 C108,172 128,168 150,172 Z',tip='M14,112 C38,122 30,132 52,138 C32,148 44,156 68,156 C52,168 70,172 94,168 C80,160 60,150 46,128 C36,120 24,114 14,112 Z';
   return[[SR(0,0,300,300),'celeste'],[SE(60,50,34,14),'blanco'],[SE(245,70,30,12),'blanco'],[SP([[0,300],[0,250],[70,190],[140,260],[210,180],[300,250],[300,300]]),'gris'],
   [SP([[70,190],[52,206],[62,203],[70,212],[80,204],[88,206]]),'blanco'],[SP([[210,180],[190,198],[202,196],[212,206],[222,197],[232,200]]),'blanco'],
   [wing,'café oscuro',{l:[110,140]}],[MIR(wing),'café oscuro',{l:[190,140]}],[tip,'café',{l:[56,144]}],[MIR(tip),'café',{l:[244,144]}],
   ['M135,205 L165,205 L174,238 L150,230 L126,238 Z','blanco',{l:[150,220]}],[SE(150,168,24,42),'café'],[SC(150,118,21),'blanco'],
   ['M139,121 L161,121 C160,132 156,140 150,144 C152,136 146,130 139,128 Z','amarillo',{l:[151,129]}],
   ['M138,206 l-4,14 l6,-4 l2,6 l3,-8 Z','amarillo',{l:[138,212]}],['M162,206 l4,14 l-6,-4 l-2,6 l-3,-8 Z','amarillo',{l:[162,212]}],
   [SC(143,113,3.2),'negro',{fix:1}],[SC(157,113,3.2),'negro',{fix:1}]]}],
 ['butterfly','Butterfly',()=>{const up='M150,138 C120,62 44,46 40,100 C38,140 100,152 150,150 Z',lo='M150,152 C112,156 68,174 82,212 C96,238 140,206 150,166 Z';
   return[[SR(0,0,300,300),'celeste'],[SR(0,250,300,50),'verde'],[SC(50,240,12),'rosa'],[SC(50,240,5),'amarillo'],[SC(255,236,12),'rojo'],[SC(255,236,5),'amarillo'],
   [up,'naranja',{l:[70,92]}],[MIR(up),'naranja',{l:[230,92]}],[lo,'morado',{l:[118,170]}],[MIR(lo),'morado',{l:[182,170]}],
   [SC(88,104,15),'amarillo'],[SC(212,104,15),'amarillo'],[SC(110,190,10),'rosa'],[SC(190,190,10),'rosa'],[SC(62,82,8),'blanco'],[SC(238,82,8),'blanco'],
   [SE(150,160,8,46),'negro',{fix:1}],[SC(150,110,10),'negro',{fix:1}]]}],
 ['turtle','Sea Turtle',()=>{const hexes=[[150,150],[118,165],[182,165],[150,182],[124,138],[176,138]];return[[SR(0,0,300,160),'celeste'],[SR(0,140,300,90),'azul'],[SR(0,222,300,78),'amarillo'],[SC(250,45,24),'amarillo'],
   [SE(74,214,24,14),'verde'],[SE(226,214,24,14),'verde'],[SE(258,190,26,18),'verde'],[SE(278,180,10,8),'verde'],
   ['M60,200 C60,120 240,120 240,200 Z','verde oscuro',{l:[150,128]}],
   ...hexes.map(([x,y])=>[SP(Array.from({length:6},(_,i)=>[(x+16*Math.cos(i*Math.PI/3)).toFixed(1),(y+14*Math.sin(i*Math.PI/3)).toFixed(1)])),'verde']),
   [SR(52,196,196,14,7),'café'],[SC(266,184,3.5),'negro',{fix:1}],[SE(60,206,6,4),'verde']]}],
 ['owl','Night Owl',()=>[[SR(0,0,300,300),'azul oscuro'],[SC(240,60,26),'amarillo'],[SC(40,40,3),'blanco',{fix:1}],[SC(90,80,2.5),'blanco',{fix:1}],[SC(200,30,2.5),'blanco',{fix:1}],[SC(270,140,3),'blanco',{fix:1}],
   [SR(20,232,260,18,9),'café oscuro'],[SE(60,224,22,10),'verde'],[SE(240,226,22,10),'verde'],
   [SP([[100,70],[118,108],[90,100]]),'café'],[SP([[200,70],[182,108],[210,100]]),'café'],[SE(150,160,62,78),'café'],[SE(150,180,38,46),'beige'],
   [SE(100,170,18,44),'café oscuro'],[SE(200,170,18,44),'café oscuro'],[SC(124,128,24),'blanco'],[SC(176,128,24),'blanco'],[SC(124,128,13),'naranja'],[SC(176,128,13),'naranja'],
   [SC(124,128,6),'negro',{fix:1}],[SC(176,128,6),'negro',{fix:1}],[SP([[140,150],[160,150],[150,168]]),'amarillo',{l:[150,156]}],
   [SP([[128,234],[134,246],[140,234]]),'amarillo',{l:[134,238]}],[SP([[160,234],[166,246],[172,234]]),'amarillo',{l:[166,238]}]]],
 ['lion','Lion',()=>[[SR(0,0,300,300),'amarillo'],[SR(0,220,300,80),'verde'],[SC(240,48,22),'naranja'],
   [WAVY(150,135,92,10,12),'naranja',{l:[150,52]}],[SC(150,140,64),'beige'],[SC(105,90,16),'beige'],[SC(195,90,16),'beige'],[SC(105,90,8),'rosa'],[SC(195,90,8),'rosa'],
   [SE(150,170,30,22),'blanco'],['M136,150 L164,150 L150,166 Z','café',{l:[150,155]}],[SC(126,128,7),'negro',{fix:1}],[SC(174,128,7),'negro',{fix:1}],
   [SR(118,230,22,40,9),'beige'],[SR(160,230,22,40,9),'beige']]],
 ['whale','Whale',()=>[[SR(0,0,300,300),'celeste'],[SC(52,50,24),'amarillo'],[SR(0,160,300,140),'azul'],
   ['M0,170 Q25,155 50,170 T100,170 T150,170 T200,170 T250,170 T300,170 L300,185 L0,185 Z','turquesa',{l:[150,176]}],
   ['M40,190 C40,120 200,100 240,150 C255,140 270,118 290,120 C278,140 275,160 268,175 C278,185 288,205 284,220 C266,206 250,200 238,196 C210,240 70,250 40,190 Z','azul oscuro',{l:[130,160]}],
   ['M52,200 C80,236 180,236 228,200 C190,214 100,218 52,200 Z','blanco',{l:[140,214]}],
   ['M120,112 C110,80 96,70 86,72 C96,82 104,96 108,112 Z','celeste',{l:[100,90]}],['M132,110 C140,76 156,68 168,70 C156,80 148,94 144,112 Z','celeste',{l:[152,88]}],
   [SC(78,176,6),'blanco',{fix:1}],[SC(79,177,3),'negro',{fix:1}]]],
 ['dino','Dinosaur',()=>[[SR(0,0,300,300),'celeste'],[SP([[180,230],[230,120],[250,120],[300,230]]),'café'],[SP([[230,120],[250,120],[244,104],[236,104]]),'rojo'],[SE(246,86,16,12),'gris'],
   [SR(0,226,300,74),'verde'],
   ['M108,170 C80,170 60,184 20,200 C60,206 90,204 118,196 Z','verde oscuro',{l:[70,192]}],
   ['M150,140 C170,120 182,80 190,48 C196,30 222,30 226,46 C230,58 214,62 204,60 C200,90 196,130 190,170 Z','verde oscuro',{l:[194,110]}],
   [SE(150,175,62,40),'verde oscuro'],[SR(104,190,24,46,10),'verde oscuro'],[SR(168,192,24,44,10),'verde oscuro'],
   [SC(140,160,9),'amarillo'],[SC(165,178,7),'amarillo'],[SC(122,182,6),'amarillo'],[SC(186,160,6),'amarillo'],
   [SC(214,44,3),'negro',{fix:1}],[SE(60,240,18,7),'verde'],[SE(250,246,22,7),'verde']]]];
SHAPES.push(
 ['parrot','Parrot',()=>[[SR(0,0,300,300),'celeste'],[SE(60,50,30,12),'blanco'],[SE(240,40,26,10),'blanco'],
   ['M0,200 C30,180 70,190 80,210 C50,215 20,210 0,200Z','verde'],['M0,300 C20,240 60,220 90,230 C70,250 40,270 0,300Z','verde oscuro',{l:[40,262]}],['M300,300 C280,240 240,225 210,232 C232,252 262,272 300,300Z','verde oscuro',{l:[262,262]}],
   ['M138,210 L118,292 L134,294 L150,214Z','azul',{l:[132,266]}],['M150,214 L146,298 L162,298 L160,214Z','rojo',{l:[154,270]}],['M160,212 L178,292 L192,288 L170,208Z','amarillo',{l:[178,266]}],
   [SR(20,214,260,16,8),'café'],[SE(244,222,8,5),'café oscuro'],
   [SE(150,152,42,62),'rojo'],['M176,124 C212,140 216,190 198,224 C182,208 172,172 172,130Z','verde',{l:[190,160]}],
   ['M190,176 C204,190 206,208 198,224 C188,212 184,198 184,178Z','azul',{l:[194,200]}],['M176,124 C196,134 204,150 202,164 C192,156 182,148 174,140Z','amarillo',{l:[190,145]}],
   [SC(146,92,32),'rojo'],[SE(162,92,13,17),'blanco'],[SC(162,88,6),'amarillo'],[SC(162,88,3),'negro',{fix:1}],
   ['M170,94 C192,94 198,116 188,130 C186,116 178,110 168,108Z','gris',{l:[184,108]}],['M168,108 C178,110 184,118 184,128 C174,126 168,120 166,112Z','gris oscuro',{l:[175,118]}],
   [SE(136,216,9,5),'gris oscuro'],[SE(162,216,9,5),'gris oscuro']]],
 ['fox','Fox',()=>[[SR(0,0,300,300),'celeste'],[SC(250,50,22),'amarillo'],[SR(0,236,300,64),'verde'],
   [SR(30,120,16,120),'café oscuro'],[SC(38,108,34),'naranja'],[SR(262,140,14,100),'café oscuro'],[SC(268,126,28),'rojo'],
   ['M190,204 C240,204 270,162 262,120 C250,150 222,172 186,178Z','naranja',{l:[232,178]}],['M262,120 C272,138 268,156 256,170 C246,160 252,138 262,120Z','blanco',{l:[259,148]}],
   [SE(160,192,50,36),'naranja'],[SR(126,212,16,36,7),'café oscuro'],[SR(178,212,16,36,7),'café oscuro'],[SE(132,194,18,28),'blanco'],
   [SP([[96,124],[100,74],[126,104]]),'naranja',{l:[104,100]}],[SP([[164,124],[160,74],[134,104]]),'naranja',{l:[156,100]}],
   [SP([[102,114],[104,88],[118,104]]),'café oscuro',{fix:1}],[SP([[158,114],[156,88],[142,104]]),'café oscuro',{fix:1}],
   ['M90,130 L130,98 L170,130 C166,160 144,172 130,172 C116,172 94,160 90,130Z','naranja',{l:[130,112]}],
   ['M90,130 C100,150 118,166 130,172 C126,156 120,146 104,140Z','blanco',{l:[106,148]}],['M170,130 C160,150 142,166 130,172 C134,156 140,146 156,140Z','blanco',{l:[154,148]}],
   [SC(130,168,5),'negro',{fix:1}],[SE(114,128,4,6),'negro',{fix:1}],[SE(146,128,4,6),'negro',{fix:1}],
   [SR(60,238,6,12),'blanco'],[SE(63,236,13,7),'rojo'],[SE(222,250,18,6),'verde oscuro'],[SE(90,262,16,5),'verde oscuro']]],
 ['rocket','Rocket',()=>[[SR(0,0,300,300),'azul oscuro'],...[[30,30],[120,20],[280,110],[200,150],[20,150],[100,200],[270,20]].map(([x,y])=>[SC(x,y,2.5),'blanco',{fix:1}]),
   [SC(60,70,30),'morado'],[SE(60,70,30,8),'rosa'],[SC(250,250,52),'gris'],[SC(230,226,9),'gris oscuro'],[SC(266,256,11),'gris oscuro'],[SC(236,274,6),'gris oscuro'],
   [SC(56,236,16),'verde'],[SC(236,64,8),'amarillo'],[SP([[230,58],[184,32],[230,70]]),'celeste',{l:[214,56]}],
   ['M132,200 C130,232 150,264 150,264 C150,264 170,232 168,200Z','naranja',{l:[150,244]}],['M140,200 C140,222 150,244 150,244 C150,244 160,222 160,200Z','amarillo',{l:[150,224]}],['M146,200 C146,210 150,220 150,220 C150,220 154,210 154,200Z','blanco',{fix:1}],
   ['M122,150 L94,198 L124,190Z','rojo',{l:[112,180]}],['M178,150 L206,198 L176,190Z','rojo',{l:[188,180]}],
   ['M150,40 C176,70 182,120 178,190 L122,190 C118,120 124,70 150,40Z','blanco',{l:[150,150]}],['M150,40 C164,56 172,72 175,86 L125,86 C128,72 136,56 150,40Z','rojo',{l:[150,70]}],
   [SR(121,162,58,12),'azul'],[SC(150,120,18),'gris'],[SC(150,120,12),'celeste'],[SR(130,190,40,10),'gris oscuro'],[SR(145,176,10,30),'rojo']]],
 ['clownfish','Coral Reef',()=>[[SR(0,0,300,300),'azul'],[SP([[40,0],[70,0],[110,210],[90,210]]),'celeste'],[SP([[160,0],[185,0],[204,190],[188,190]]),'celeste'],
   ['M0,250 C60,236 120,244 180,240 C230,236 270,244 300,240 L300,300 L0,300Z','beige',{l:[150,276]}],[SE(254,250,44,28),'gris'],[SE(40,258,40,22),'gris oscuro'],
   ['M30,252 L34,200 L22,180 L30,178 L38,196 L44,170 L52,172 L46,204 L58,190 L64,194 L50,222 L48,252Z','rosa',{l:[40,226]}],
   ['M250,226 L246,180 L232,166 L240,160 L252,174 L258,150 L266,152 L262,182 L276,170 L282,176 L266,196 L264,226Z','rojo',{l:[256,200]}],
   ['M100,250 C90,220 112,200 100,170 C96,160 104,150 110,160 C120,190 100,210 112,250Z','verde',{l:[104,224]}],['M200,244 C210,214 188,196 200,166 C204,156 212,160 208,172 C200,198 220,214 212,244Z','verde oscuro',{l:[204,216]}],
   [WAVY(150,262,22,6,9),'morado'],[SP(Array.from({length:10},(_,i)=>{const a=i*Math.PI/5-Math.PI/2,r=i%2?6:15;return[(84+Math.cos(a)*r).toFixed(1),(276+Math.sin(a)*r).toFixed(1)]})),'naranja'],
   ['M206,128 L248,96 C254,116 254,140 248,160Z','naranja',{l:[236,128]}],['M120,98 C134,70 170,68 184,100 C160,94 140,94 120,98Z','amarillo',{l:[152,84]}],['M136,160 C140,182 162,184 170,162Z','amarillo',{l:[154,170]}],
   [SE(150,128,62,36),'naranja'],
   ['M112,100 C118,96 126,95 132,97 C128,120 128,140 132,159 C126,161 118,160 112,156 C116,138 116,118 112,100Z','blanco',{l:[122,128]}],
   ['M152,92 C158,92 166,93 172,95 C168,115 168,145 172,162 C166,164 158,164 152,164 C156,142 156,114 152,92Z','blanco',{l:[162,140]}],
   ['M190,104 C196,106 202,110 206,114 C204,124 204,134 206,142 C202,146 196,150 190,152 C192,138 192,118 190,104Z','blanco',{l:[198,128]}],
   ['M140,132 C150,122 164,126 160,142 C152,144 146,140 140,132Z','amarillo',{l:[151,135]}],[SC(102,120,8),'blanco'],[SC(102,120,4),'negro',{fix:1}],
   [SC(70,92,7),'celeste'],[SC(62,66,5),'celeste'],[SC(78,42,8),'celeste'],[SE(250,60,16,8),'amarillo'],[SP([[264,60],[278,50],[278,70]]),'amarillo',{l:[272,60]}],[SC(244,58,2),'negro',{fix:1}]]],
 ['castle','Castle',()=>[[SR(0,0,300,300),'celeste'],[SC(40,40,20),'amarillo'],[SE(222,40,30,12),'blanco'],[SE(120,56,22,9),'blanco'],
   ['M0,230 C60,200 120,210 150,220 C200,200 250,200 300,220 L300,300 L0,300Z','verde',{l:[40,240]}],[SR(0,264,300,36),'azul'],
   [SR(80,140,140,112),'gris'],...[0,1,2,3,4].map(i=>[SR(84+i*28,126,16,15),'gris']),
   [SR(56,110,40,142),'gris oscuro'],[SR(204,110,40,142),'gris oscuro'],[SR(130,80,40,70),'gris oscuro'],
   [SP([[52,112],[76,58],[100,112]]),'rojo',{l:[76,96]}],[SP([[200,112],[224,58],[248,112]]),'rojo',{l:[224,96]}],[SP([[126,82],[150,28],[174,82]]),'azul oscuro',{l:[150,66]}],
   [SP([[76,58],[76,40],[94,48]]),'amarillo',{l:[81,48]}],[SP([[224,58],[224,40],[242,48]]),'amarillo',{l:[229,48]}],[SP([[150,28],[150,10],[168,18]]),'rosa',{l:[155,18]}],
   [SR(69,140,14,22,7),'amarillo'],[SR(217,140,14,22,7),'amarillo'],[SR(143,100,14,22,7),'amarillo'],[SR(98,166,16,24,8),'amarillo'],[SR(186,166,16,24,8),'amarillo'],
   ['M140,150 L160,150 L160,182 L150,174 L140,182Z','morado',{l:[150,162]}],
   ['M134,252 L134,214 C134,198 166,198 166,214 L166,252Z','café',{l:[150,230]}],[SP([[134,252],[166,252],[178,270],[122,270]]),'café oscuro',{l:[150,261]}],
   [SE(30,242,24,14),'verde oscuro'],[SE(270,244,24,14),'verde oscuro']]],
 ['peacock','Peacock',()=>{const eyes=[200,222,245,270,295,318,340].map(a=>{const r=a*Math.PI/180;return[150+Math.cos(r)*98,232+Math.sin(r)*96]});
   return[[SR(0,0,300,300),'beige'],[SR(0,250,300,50),'verde'],['M18,240 A132,128 0 0 1 282,240 Z','verde oscuro',{l:[150,200]}],
   ...eyes.flatMap(([x,y])=>[[SE(x,y,17,21),'turquesa'],[SE(x,y,10,13),'azul'],[SE(x,y,4.5,6),'azul oscuro']]),
   ['M138,252 C120,222 128,172 146,152 C150,132 146,114 150,102 C160,96 168,104 162,118 C158,142 178,192 166,252Z','azul',{l:[150,200]}],
   [SE(160,204,12,30),'café'],[SC(157,100,12),'azul'],[SP([[167,97],[182,101],[167,106]]),'amarillo',{l:[171,101]}],[SC(159,97,4),'blanco'],[SC(160,97,2),'negro',{fix:1}],
   [SC(148,78,4),'turquesa'],[SC(156,75,4),'turquesa'],[SC(164,78,4),'turquesa'],[SR(141,250,6,18),'gris'],[SR(156,250,6,18),'gris'],[SE(60,276,20,7),'verde oscuro'],[SE(240,278,20,7),'verde oscuro']]}]);

const shDiff=id=>{const n=shData(id).R.filter(r=>!r.o.fix).length;return n<=19?1:n<=24?2:3};
function shData(id){const s=SHAPES.find(x=>x[0]==id),R=s[2]().map(([d,c,o],i)=>({d,c,o:o||{},i}));const keys=[];R.forEach(r=>{if(!r.o.fix&&!keys.includes(r.c))keys.push(r.c)});R.forEach(r=>r.n=r.o.fix?0:keys.indexOf(r.c)+1);return{id,name:s[1],R,keys}}
function shS(){return S.cbs=Object.assign({done:{},prog:{},free:{}},S.cbs||{})}
const SHN='<defs><radialGradient id="shn" cx=".34" cy=".28" r=".85"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset=".38" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".32"/></radialGradient></defs>';
function shSVG(d,fills,opts={}){const lit=r=>{const f=fills[r.i];return r.o.fix||(f&&f!='#fef9c3'&&f!='#fecaca')};
  return`<svg viewBox="0 0 300 300" class="${opts.cls||''}" ${opts.id?`id="${opts.id}"`:''}>${SHN}${d.R.map(r=>`<path d="${r.d}" data-i="${r.i}" fill="${r.o.fix?CB_COL[r.c][0]:fills[r.i]||(opts.faded?shade(CB_COL[r.c][0],.72):'#fff')}" stroke="#27272a" stroke-width="${opts.thin?1.6:2.4}" stroke-linejoin="round"/>${lit(r)&&r.i>0?`<path d="${r.d}" fill="url(#shn)" pointer-events="none"/>`:''}`).join('')}${opts.labels||''}</svg>`}
function shMenuItems(lv){const cs=shS();return SHAPES.filter(([id])=>!lv||shDiff(id)==lv).map(([id,n])=>{const d=shData(id),done=cs.done[id],pr=cs.prog[id]||[],fl={};
  if(done)d.R.forEach(r=>fl[r.i]=CB_COL[r.c][0]);else pr.forEach(i=>fl[i]=CB_COL[d.R[i].c][0]);const free=cs.free[id];
  const tot=d.R.filter(r=>!r.o.fix).length;return`<button class="btn cbitem" data-sh="${id}">${shSVG(d,free&&!done&&!pr.length?free:fl,{thin:1,faded:!done&&!pr.length&&!free,cls:'shthumb'})}<b>${n}</b><span class="small">${done?ico('check',18)+' Done':pr.length?Math.round(pr.length/tot*100)+'%':free?'Colored':'New'}</span></button>`}).join('')}

function shapePage(id,mode){const d=shData(id),cs=shS(),free=mode=='free',fills={};let sel=free?'rojo':1;
  const filled=new Set(free?[]:(cs.prog[id]||[]));if(free){Object.assign(fills,cs.free[id]||{})}else filled.forEach(i=>fills[i]=CB_COL[d.R[i].c][0]);
  const regs=d.R.filter(r=>!r.o.fix);
  const ml=mode=='math3'?3:mode=='math2'?2:1,esHard=mode=='es2';if(mode.startsWith('math'))mode='math';if(esHard)mode='es';const facts=d.keys.map((k,i)=>mode=='math'?cbFact(i+1,ml):null);
  const pal=free?FP_COLS.concat(['gris oscuro','café oscuro','azul oscuro','beige','turquesa']).map(k=>`<button class="btn chip" data-k="${k}" style="--cc:${CB_COL[k][0]}"><span class="sw"></span></button>`).join('')
    :d.keys.map((k,i)=>`<button class="btn chip ${esHard?'eshard':''} ${mode=='math'&&ml>1?'wide':''}" data-n="${i+1}" style="--cc:${CB_COL[k][0]}"><span class="sw"></span><b>${mode=='math'?facts[i]:esHard?'':i+1}</b>${mode=='es'?`<small>${k}</small>`:''}</button>`).join('');
  view(`${GH.top('art',{play:true,sub:d.name,tools:(free?GH.tool('trash','Clear','shclr'):'')+artMusicTool(),chips:free?'':'<span class="stat gh-st" aria-label="Colored"><b id="cbp">0%</b></span>'})}
   <div class="cbwrap"><div class="cbcv shwrap" id="shw"></div><div class="cbpal ${free?'fp':''}">${pal}${UI.btn('Done',{kind:'primary',icon:'check',id:'adone',cls:'art-done'})}</div></div>`);
  const w=$('#shw');
  function render(){const sz=cbLayout(free?18:d.keys.length)*CBN;w.style.width=w.style.height=sz+'px';
    const labels=free?'':regs.filter(r=>!filled.has(r.i)).map(r=>`<text data-l="${r.i}" class="shl ${r.n==sel?'on':''}" text-anchor="middle" dominant-baseline="central">${r.n}</text>`).join('');
    w.innerHTML=shSVG(d,Object.assign({},fills,free?{}:Object.fromEntries(regs.filter(r=>!filled.has(r.i)&&r.n==sel).map(r=>[r.i,'#fef9c3']))),{id:'shsvg',labels});
    if(!free){const svg=$('#shsvg'),sr=svg.getBoundingClientRect(),k=sr.width/300;$$('#shsvg text').forEach(t=>{const r=d.R[+t.dataset.l],p=w.querySelector(`path[data-i="${r.i}"]`),b=p.getBBox(),cx=b.x+b.width/2,cy=b.y+b.height/2;let pt=r.o.l;
      if(!pt){let bd=1e9;for(let i=1;i<10;i++)for(let j=1;j<10;j++){const x=b.x+b.width*i/10,y=b.y+b.height*j/10;if(document.elementFromPoint(sr.left+x*k,sr.top+y*k)===p){const dd=(x-cx)**2+(y-cy)**2;if(dd<bd){bd=dd;pt=[x,y]}}}pt=pt||[cx,cy]}
      t.setAttribute('x',pt[0]);t.setAttribute('y',pt[1]);t.setAttribute('font-size',Math.max(7,Math.min(16,Math.min(b.width,b.height)*.55)))})}
    const p=$('#cbp');if(p)p.textContent=Math.round(filled.size/regs.length*100)+'%'}
  const pick=v=>{sel=v;$$('.chip').forEach(c=>c.classList.toggle('on',(c.dataset.n?+c.dataset.n:c.dataset.k)==v));if(mode=='es')say(d.keys[v-1],null,'es');else if(free)say(v,null,'es');else SFX.pop(v);render()};
  $$('.chip').forEach(c=>c.onclick=()=>pick(c.dataset.n?+c.dataset.n:c.dataset.k));
  w.addEventListener('pointerdown',e=>{const t=e.target.closest('path');if(!t)return;const r=d.R[+t.dataset.i];if(r.o.fix)return;e.preventDefault();
    if(free){fills[r.i]=CB_COL[sel][0];SFX.pop(R(0,5));cs.free[id]=fills;save();t.setAttribute('fill',fills[r.i]);t.classList.remove('popfill');void t.getBBox();t.classList.add('popfill');return}
    if(filled.has(r.i))return;
    if(r.n!=sel){SFX.wrong();t.setAttribute('fill','#fecaca');setTimeout(()=>render(),350);if(mode=='es')say(d.keys[r.n-1],null,'es');return}
    filled.add(r.i);fills[r.i]=CB_COL[r.c][0];SFX.pop(filled.size%6);cs.prog[id]=[...filled];save();render();if(esHard){const c=$(`.chip[data-n="${r.n}"]`);if(c)c.classList.add('found')}
    if(regs.every(x=>filled.has(x.i)))finish()});
  if(free)$('#shclr').onclick=()=>{for(const k in fills)delete fills[k];cs.free[id]={};save();SFX.whoosh();render()};
  GH.wire({quit:()=>{gtStop();artMusic(false);artBack()}});artMusicWire();
  // G-ART2: Done keeps the picture in the gallery (a free picture a third colored wins its star); the last number finishes it
  const shPack=fl=>{const o={};for(const k in fl)o[k]='c:'+fl[k];return artPack(o,d.R.length)};
  $('#adone').onclick=()=>{const cnt=free?Object.keys(fills).length:filled.size;if(!cnt){fb('Color a piece first, then tap Done.','warn',2000);return}
    if(!free&&regs.every(x=>filled.has(x.i)))return;const star=free&&cnt*3>=regs.length,cur=Object.assign({},fills);
    artSparkle(w,()=>{const res=artDone({k:'sh',key:'sh:'+id,n:d.name,d:shPack(cur),star});
      artEnd(res,{n:d.name,star,keep:true,why:free?`Color ${Math.ceil(regs.length/3)-cnt} more pieces to win its star.`:'Color every piece by number to win its star.',pic:shSVG(d,cur)})})};
  function finish(){delete cs.prog[id];save();gtStop();const all={};d.R.forEach(r=>all[r.i]=CB_COL[r.c][0]);
    setTimeout(()=>artSparkle(w,()=>{const res=artDone({k:'sh',key:'sh:'+id,n:d.name,d:shPack(all),star:true,coins:5});cs.done[id]=1;save();
      artEnd(res,{n:d.name,pic:shSVG(d,all)})}),400)}
  pick(sel);let rs;addEventListener('resize',()=>{clearTimeout(rs);rs=setTimeout(()=>{if($('#shw'))render()},120)});
  gtStart('#gtm',()=>timeUpOverlay());
  if(S.voice)setTimeout(()=>say(free?'Pick a color and tap to paint!':mode=='math'?'Solve the fact to find each color!':mode=='es'?'Tap a color to hear it in Spanish!':'Match the numbers to the colors!'),300)}

function cbLayout(n){const land=innerWidth>innerHeight,avW=land?innerWidth-260:innerWidth-24,avH=land?innerHeight-80:innerHeight-80-(n>6?190:120);return Math.max(14,Math.floor(Math.min(avW,avH)/CBN))}
// G-ART2 (R-03 T2): pixel art that looks like art. Squares are at least 40 px (pxCell; 32 until the v195 audit); on a phone the picture is bigger than the
// screen: two fingers (or the Move tool) move it, pinch or the zoom tool shows it whole. A coloured square is a bead with a light
// edge and its number fades away; unfinished squares show a faint tint of their colour. Done keeps it in the gallery; the last
// square shows the finished picture in a frame.
function pxCell(W,H,n){const land=W>H,avW=land?W-260:W-24,avH=land?H-80:H-80-(n>6?200:130);return Math.max(40,Math.floor(Math.min(avW,avH)/CBN))} // audit v195 (R-03 T2): squares of 40 px at the least (they were 32); the picture scrolls and zooms as before
// the room the picture has on screen: below the top bar, beside (landscape) or above (portrait) the palette as it is laid out
function pxArea(n){const land=innerWidth>innerHeight,t=$('.gh-top'),pal=$('.cbpal'),top=t?t.getBoundingClientRect().bottom+8:84;
  if(land)return[innerWidth-(pal?pal.getBoundingClientRect().width+44:260),innerHeight-top-12];return[innerWidth-24,innerHeight-top-(pal?pal.getBoundingClientRect().height+28:(n>6?200:130))]}
function colorPic(id,mode){const d=cbData(id),cs=cbS(),fill=(cs.prog[id]||'0'.repeat(CBN*CBN)).split('');let sel=1,count=fill.filter(c=>c=='1').length;
  const ml=mode=='math3'?3:mode=='math2'?2:1,esHard=mode=='es2';if(mode.startsWith('math'))mode='math';if(esHard)mode='es';const facts=d.keys.map((k,i)=>mode=='math'?cbFact(i+1,ml):null);
  view(`${GH.top('art',{play:true,sub:d.name,tools:`<button class="btn icon sm gh-tool" id="pmove" aria-label="Move the picture" aria-pressed="false">${artIco('move',26)}</button>`+GH.tool('eye','Zoom','pzm')+artMusicTool(),chips:'<span class="stat gh-st" aria-label="Colored"><b id="cbp">0%</b></span>'})}
   <div class="cbwrap"><div class="cbcv pxv" id="pxv"><canvas id="cbc" role="img" aria-label="Your picture: tap a square with the chosen number"></canvas></div><div class="cbpal">${d.keys.map((k,i)=>`<button class="btn chip" data-n="${i+1}" style="--cc:${CB_COL[k][0]}"><span class="sw"></span><b>${mode=='math'?facts[i]:i+1}</b>${mode=='es'?`<small>${k}</small>`:''}</button>`).join('')}${UI.btn('Done',{kind:'primary',icon:'check',id:'adone',cls:'art-done'})}</div></div>`);
  const vw$=$('#pxv'),cv=$('#cbc'),x=cv.getContext('2d'),dpr=Math.min(2,devicePixelRatio||1),fade=new Map();
  let cell=pxCell(innerWidth,innerHeight,d.keys.length),fit=cell,ox=0,oy=0,VW=0,VH=0,flash=-1,flashT=0,moving=false,anim=0;
  const place=()=>{const W=CBN*cell;ox=W<=VW?(VW-W)/2:Math.min(0,Math.max(VW-W,ox));oy=W<=VH?(VH-W)/2:Math.min(0,Math.max(VH-W,oy));cv.style.transform=`translate(${ox}px,${oy}px)`};
  const layout=(keep)=>{const[aw,ah]=pxArea(d.keys.length);fit=Math.max(12,Math.floor(Math.min(aw,ah)/CBN));if(!keep)cell=pxCell(innerWidth,innerHeight,d.keys.length);
    VW=Math.min(aw,CBN*Math.max(cell,fit));VH=Math.min(ah,CBN*Math.max(cell,fit));vw$.style.width=VW+'px';vw$.style.height=VH+'px';
    cv.width=cv.height=Math.round(CBN*cell*dpr);cv.style.width=cv.style.height=CBN*cell+'px';place();draw()};
  function draw(){const s=cell*dpr,now=performance.now();x.clearRect(0,0,cv.width,cv.height);x.fillStyle='#f5f5f4';x.fillRect(0,0,cv.width,cv.height);
    x.textAlign='center';x.textBaseline='middle';x.font=`bold ${Math.floor(s*.46)}px Andika, sans-serif`;let live=false;
    d.num.forEach((n,i)=>{const cx=(i%CBN)*s,cy=Math.floor(i/CBN)*s,c=CB_COL[d.G[i]][0];
      if(fill[i]=='1'){pxBead(x,cx,cy,s,c);const f=fade.get(i);if(f!=null){const a=1-(now-f)/320;if(a>0){live=true;x.globalAlpha=a;x.fillStyle='#fff';x.fillText(n,cx+s/2,cy+s/2+1);x.globalAlpha=1}else fade.delete(i)}}
      else{x.fillStyle=n==sel?'#fef08a':shade(c,.86);x.fillRect(cx+1,cy+1,s-2,s-2);x.fillStyle=n==sel?'#1e3a8a':'#78716c';x.fillText(n,cx+s/2,cy+s/2+1)}
      if(i==flash){x.strokeStyle='#ef4444';x.lineWidth=3*dpr;x.strokeRect(cx+2,cy+2,s-4,s-4)}});
    const p=$('#cbp');if(p)p.textContent=Math.round(count/fill.length*100)+'%';cv.dataset.n=count;
    cancelAnimationFrame(anim);if(live)anim=requestAnimationFrame(draw)}
  const pick=n=>{sel=n;$$('.chip').forEach(c=>c.classList.toggle('on',+c.dataset.n==n));const k=d.keys[n-1];if(mode=='es')say(k,null,'es');else SFX.pop(n);draw()};
  $$('.chip').forEach(c=>c.onclick=()=>pick(+c.dataset.n));
  const cellAt=(px,py)=>{const r=cv.getBoundingClientRect(),cx=Math.floor((px-r.left)/cell),cy=Math.floor((py-r.top)/cell);return cx>=0&&cy>=0&&cx<CBN&&cy<CBN?cy*CBN+cx:-1};
  const paint=(i,tap)=>{if(i<0||fill[i]=='1')return;if(d.num[i]!=sel){if(tap){SFX.wrong();flash=i;clearTimeout(flashT);flashT=setTimeout(()=>{flash=-1;draw()},500);draw();
      if(mode=='es')say(d.keys[d.num[i]-1],null,'es')}return}
    fill[i]='1';count++;if(!artCalm())fade.set(i,performance.now());SFX.pop(count%6);draw();
    if(count%16==0){cs.prog[id]=fill.join('');save()}
    if(fill.every(c=>c=='1'))finishPic()};
  // one finger colours (tap or drag); two fingers, or one with Move on, move the picture; pinch zooms
  const ptrs=new Map();let one=null,pin=null;
  vw$.addEventListener('pointerdown',e=>{e.preventDefault();try{vw$.setPointerCapture(e.pointerId)}catch(_){}ptrs.set(e.pointerId,[e.clientX,e.clientY]);
    if(ptrs.size==1)one={x:e.clientX,y:e.clientY,ox,oy,i:cellAt(e.clientX,e.clientY),drag:false,pan:moving};
    else if(ptrs.size==2){one=null;const[a,b]=[...ptrs.values()];pin={d:Math.hypot(a[0]-b[0],a[1]-b[1]),c:cell,mx:(a[0]+b[0])/2,my:(a[1]+b[1])/2,ox,oy}}});
  vw$.addEventListener('pointermove',e=>{if(!ptrs.has(e.pointerId))return;ptrs.set(e.pointerId,[e.clientX,e.clientY]);
    if(pin&&ptrs.size==2){const[a,b]=[...ptrs.values()],dd=Math.hypot(a[0]-b[0],a[1]-b[1]),mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,nc=Math.max(fit,Math.min(64,pin.c*dd/Math.max(1,pin.d)));
      const r=vw$.getBoundingClientRect(),k=nc/pin.c,px=pin.mx-r.left,py=pin.my-r.top;ox=px-(px-pin.ox)*k+(mx-pin.mx);oy=py-(py-pin.oy)*k+(my-pin.my);
      if(Math.abs(nc-cell)>.5){cell=nc;cv.style.width=cv.style.height=CBN*cell+'px'}place();return}
    if(!one)return;if(one.pan){ox=one.ox+e.clientX-one.x;oy=one.oy+e.clientY-one.y;place();return}
    const i=cellAt(e.clientX,e.clientY);if(i!=one.i){if(!one.drag)paint(one.i,false);one.drag=true;one.i=i;paint(i,false)}});
  const up=e=>{ptrs.delete(e.pointerId);if(pin&&ptrs.size<2){pin=null;cell=Math.round(cell);layout(true)}
    if(one&&ptrs.size==0){if(!one.drag&&!one.pan)paint(cellAt(e.clientX,e.clientY),true);one=null}};
  vw$.addEventListener('pointerup',up);vw$.addEventListener('pointercancel',e=>{ptrs.delete(e.pointerId);one=null;if(ptrs.size<2&&pin){pin=null;layout(true)}});
  vw$.addEventListener('wheel',e=>{e.preventDefault();cell=Math.max(fit,Math.min(64,Math.round(cell*(e.deltaY>0?.88:1.14))));layout(true)},{passive:false});
  $('#pmove').onclick=e=>{moving=!moving;e.currentTarget.classList.toggle('on',moving);e.currentTarget.setAttribute('aria-pressed',String(moving));fb(moving?'Move: drag to look around':'Color: tap and drag to color','ok',1400)};
  $('#pzm').onclick=()=>{const big=pxCell(innerWidth,innerHeight,d.keys.length);cell=cell>fit?fit:big;layout(true);SFX.whoosh()};
  const leave=()=>{cs.prog[id]=fill.join('');save()};
  $('#adone').onclick=()=>{if(!count){fb('Color a square first, then tap Done.','warn',2000);return}if(fill.every(c=>c=='1'))return;leave();
    artSparkle(vw$,()=>{const res=artDone({k:'px',key:'px:'+id,n:d.name,d:pxBits(fill),star:false});
      artEnd(res,{n:d.name,star:false,keep:true,why:`Color every square to win its star (${fill.length-count} to go).`,pic:`<img class="px" src="${pxImg(d.G,fill,320)}" alt="">`})})};
  GH.wire({quit:()=>{leave();gtStop();artMusic(false);artBack()}});artMusicWire();
  function finishPic(){leave();gtStop();cell=fit;layout(true);
    setTimeout(()=>artSparkle(vw$,()=>{const res=artDone({k:'px',key:'px:'+id,n:d.name,d:'all',star:true,coins:5});cs.done[id]=1;delete cs.prog[id];save();
      artEnd(res,{n:d.name,pic:`<img class="px" src="${pxImg(d.G,fill,320)}" alt="">`})}),350)}
  pick(1);layout();let rs;const onR=()=>{clearTimeout(rs);rs=setTimeout(()=>{if($('#cbc')&&$('#pxv'))layout()},120)};addEventListener('resize',onR);
  gtStart('#gtm',()=>{leave();timeUpOverlay()});
  if(S.voice)setTimeout(()=>say(mode=='math'?'Solve the fact to find each color!':mode=='es'?'Tap a color to hear it in Spanish!':'Match the numbers to the colors!'),300)}

const FP_COLS=['rojo','naranja','amarillo','verde','verde oscuro','celeste','azul','morado','rosa','café','gris','negro','blanco'];
function freePaint(ai){const cs=cbS();const G=ai>=0?cs.art[ai].split(',').map(k=>k||'blanco'):cbGrid('blanco');let sel='rojo',saved=ai>=0,idx=ai;
  view(`${GH.top('art',{play:true,sub:'Free Paint',tools:GH.tool('download','Save to My Drawings','fsave')+artMusicTool()})}
   <div class="cbwrap"><div class="cbcv"><canvas id="cbc" role="img" aria-label="Your picture"></canvas></div><div class="cbpal fp">${FP_COLS.map(k=>`<button class="btn chip" data-k="${k}" style="--cc:${CB_COL[k][0]}"><span class="sw"></span></button>`).join('')}
    <button class="btn chip" data-k="fill" aria-label="Fill" title="Fill">${artIco('bucket',34)}</button><button class="btn chip" id="fclear" aria-label="Clear">${ico('trash',30)}</button>${UI.btn('Done',{kind:'primary',icon:'check',id:'adone',cls:'art-done'})}</div></div>`);
  const cv=$('#cbc'),x=cv.getContext('2d');let cs2=cbLayout(14),dpr=Math.min(2,devicePixelRatio||1),bucket=false;
  const size=()=>{cs2=cbLayout(14);cv.width=cv.height=cs2*CBN*dpr;cv.style.width=cv.style.height=cs2*CBN+'px';draw()};
  function draw(){const s=cs2*dpr;G.forEach((k,i)=>{x.fillStyle=CB_COL[k][0];x.fillRect((i%CBN)*s,Math.floor(i/CBN)*s,s+.5,s+.5)});x.strokeStyle='#0000000f';x.lineWidth=1;for(let i=1;i<CBN;i++){x.beginPath();x.moveTo(i*s,0);x.lineTo(i*s,CBN*s);x.moveTo(0,i*s);x.lineTo(CBN*s,i*s);x.stroke()}}
  const pick=k=>{if(k=='fill'){bucket=!bucket;$('[data-k="fill"]').classList.toggle('on',bucket);SFX.pop(2);return}sel=k;$$('.chip[data-k]').forEach(c=>c.classList.toggle('on',c.dataset.k==k||(c.dataset.k=='fill'&&bucket)));say(k,null,'es')};
  $$('.chip[data-k]').forEach(c=>c.onclick=()=>pick(c.dataset.k));
  const flood=(i,from)=>{if(from==sel)return;const st=[i];while(st.length){const j=st.pop();if(j<0||j>=G.length||G[j]!=from)continue;G[j]=sel;const cx=j%CBN;if(cx>0)st.push(j-1);if(cx<CBN-1)st.push(j+1);st.push(j-CBN,j+CBN)}};
  let down=false,last=-1;const cellAt=e=>{const r=cv.getBoundingClientRect(),cx=Math.floor((e.clientX-r.left)/cs2),cy=Math.floor((e.clientY-r.top)/cs2);return cx>=0&&cy>=0&&cx<CBN&&cy<CBN?cy*CBN+cx:-1};
  const paint=i=>{if(i<0)return;if(bucket){flood(i,G[i]);SFX.chime()}else{if(G[i]==sel)return;G[i]=sel;SFX.pop(R(0,5))}saved=false;draw()};
  cv.addEventListener('pointerdown',e=>{e.preventDefault();down=true;last=cellAt(e);paint(last);try{cv.setPointerCapture(e.pointerId)}catch(_){}});
  cv.addEventListener('pointermove',e=>{if(!down||bucket)return;const i=cellAt(e);if(i!=last){last=i;paint(i)}});
  cv.addEventListener('pointerup',()=>{down=false});
  const doSave=()=>{const str=G.join(',');if(idx>=0)cs.art[idx]=str;else{cs.art.unshift(str);cs.art=cs.art.slice(0,12);idx=0}saved=true;save()};
  $('#fsave').onclick=()=>{doSave();SFX.fanfare();confetti(20);fb('Saved to My Drawings!')};
  $('#fclear').onclick=()=>{G.fill('blanco');SFX.whoosh();saved=false;draw()};
  $('#adone').onclick=()=>{if(!G.some(k=>k!='blanco')){fb('Paint a square first, then tap Done.','warn',2000);return}doSave();
    artSparkle(cv,()=>{const res=artDone({k:'fp',n:'Block painting',d:G.map(k=>AB[Math.max(0,FP_COLS.indexOf(k))]).join(''),star:false});artEnd(res,{n:'Block painting',keep:true,pic:`<img class="px" src="${cbThumb(G,true,320)}" alt="">`})})};
  GH.wire({quit:()=>{if(!saved&&G.some(k=>k!='blanco'))doSave();gtStop();artMusic(false);classicColor('paint')}});artMusicWire();
  pick('rojo');size();addEventListener('resize',()=>{if($('#cbc')&&$('.fp'))size()});
  gtStart('#gtm',()=>{if(G.some(k=>k!='blanco'))doSave();timeUpOverlay()})}

