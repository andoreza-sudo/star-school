/* ---------- games (paths), maps ---------- */
const PATHS={
 math:{n:'Math Adventure',e:'🔢',c:'linear-gradient(135deg,#dbeafe,#bfdbfe)',worlds:[
  {n:'Number Meadow',e:'🌻',c:'#dcfce7',nodes:[['add',1,'Adding to 10'],['cnt',1,'Count by 1s & 10s'],['eo',1,'Even or Odd'],['miss',1,'Missing Number'],['sub',1,'Take Away'],['story',1,'Story Problems']]},
  {n:'Candy Canyon',e:'🍭',c:'#fce7f3',nodes:[['add',2,'+9 & Doubles'],['big',1,'Tens & Hundreds'],['cnt',2,'Count by 2s & 5s'],['cmp',1,'Bigger or Smaller'],['miss',2,'Missing to 18'],['sub',2,'Take Away to 18'],['story',2,'Story Problems 2']]},
  {n:'Ocean Reef',e:'🐠',c:'#e0f2fe',nodes:[['add',3,'All the Facts'],['time',1,"O'Clock"],['big',2,'2-Digit Adding'],['coins',1,'Pennies & Nickels'],['eo',2,'Even/Odd to 99'],['cmp',2,'Compare to 100'],['time',2,'Half Past'],['sub',3,'2-Digit Take Away'],['story',3,'Story Problems 3']]},
  {n:'Space Station',e:'🚀',c:'#ede9fe',nodes:[['big',3,'Carry the 1'],['mult',1,'Equal Groups'],['coins',2,'Dimes Too'],['cnt',3,'Skip Count Big'],['sub',4,'Borrowing'],['time',3,'Quarter Hours'],['big',4,'3-Digit Adding'],['mult',2,'Groups to 5×5'],['cmp',3,'Compare to 999'],['coins',3,'Quarters']]}]},
 read:{n:'Reading Adventure',e:'📖',c:'linear-gradient(135deg,#fce7f3,#fbcfe8)',worlds:[
  {n:'Letter Meadow',e:'🌻',c:'#dcfce7',nodes:[['sound',1,'First Sounds'],['sight',1,'Sight Words'],['rhyme',1,'Rhyme Time'],['pic',1,'Picture Words'],['sound',2,'Last Sounds'],['build',1,'Build a Word'],['sent',1,'Read & Match']]},
  {n:'Candy Canyon',e:'🍭',c:'#fce7f3',nodes:[['sight',2,'More Sight Words'],['rhyme',2,'Rhyme & Read'],['pic',2,'Blends'],['build',2,'Build Blends'],['sent',2,'Read Sentences'],['comp',1,'Story Time']]},
  {n:'Ocean Reef',e:'🐠',c:'#e0f2fe',nodes:[['sight',3,'Sight Words 3'],['pic',3,'Magic E'],['build',3,'Build Magic E'],['comp',2,'Story Time 2']]},
  {n:'Space Station',e:'🚀',c:'#ede9fe',nodes:[['pic',4,'Vowel Teams'],['build',4,'Build Vowel Teams']]}]},
 es:{n:'Spanish Adventure',e:'🌮',c:'linear-gradient(135deg,#dcfce7,#fef9c3)',worlds:[
  {n:'Hola Plaza',e:'🌮',c:'#fef9c3',nodes:[['es_greet',1,'¡Hola! Listen'],['es_color',1,'Colors'],['es_num',1,'Numbers 1–10'],['es_animal',1,'Animals'],['es_greet',2,'¡Hola! Read'],['es_color',2,'Read Colors'],['es_num',2,'Read Numbers'],['es_animal',2,'Read Animals']]},
  {n:'Fiesta Island',e:'🪅',c:'#ffedd5',nodes:[['es_food',1,'Food'],['es_body',1,'My Body'],['es_family',1,'Family'],['es_teen',1,'Numbers 11–20'],['es_food',2,'Read Food'],['es_body',2,'Read Body'],['es_family',2,'Read Family'],['es_teen',2,'Read 11–20']]},
  {n:'Gran Repaso',e:'🏆',c:'#e0e7ff',nodes:[['es_mix',1,'Big Review: Listen'],['es_mix',2,'Big Review: Read']]}]}};
const BOSSES=[['👾','Gloop'],['🤖','Robo-Bonk'],['🐙','Captain Inky'],['👽','Zorp']];
const BPRIZE=['🌼','⭐','🎉','🪐','🌈','🔥','💎','🍀','🌙','⚡','🍩','🎵'];
const NODES={};Object.keys(PATHS).forEach((p,pi)=>{NODES[p]=[];PATHS[p].worlds.forEach((w,wi)=>{w.nodes.forEach(([sk,lv,t])=>NODES[p].push({sk,lv,t,wi,p}));
  const B=BOSSES[wi%BOSSES.length];NODES[p].push({sk:'boss',lv:wi,t:`Boss: ${B[1]}`,wi,p,last:true,boss:B,prize:BPRIZE[(pi*4+wi)%BPRIZE.length]})})});
const nid=n=>n.sk+n.lv;
const getSt=(p,i)=>S.maps[p][nid(NODES[p][i])]||0,setSt=(p,i,v)=>{S.maps[p][nid(NODES[p][i])]=v};
const passed=(p,i)=>getSt(p,i)>0;
const unlocked=(p,i)=>S.unlockAll||i==0||passed(p,i-1);
const curNode=p=>{const N=NODES[p];for(let i=0;i<N.length;i++)if(unlocked(p,i)&&!passed(p,i))return i;return N.length-1};
const worldDone=(p,wi)=>NODES[p].every((n,i)=>n.wi!=wi||passed(p,i));
migrate(); /* save upgrades (MIGRATIONS in 00-core.js) run here: the first place NODES exists, before any other code reads S */
for(const p in PATHS)S.maps[p]=S.maps[p]||{};
const nInfo=n=>n.sk=='boss'?{e:n.boss[0],area:'boss'}:SK[n.sk];
const SHOP={hat:[['🧢',10],['🎀',10],['🎩',20],['⛑️',25],['🎓',40],['👑',60]],
 toy:[['🎈',10],['🍭',10],['⚽',15],['🧸',20],['🪁',30],['🪄',45],['🏆',80]],
 scene:[['meadow',0,'🌻','linear-gradient(135deg,#fef3c7,#fde68a)','Meadow'],['beach',30,'🏖️','linear-gradient(180deg,#bae6fd,#fef3c7 75%)','Beach'],['candy',40,'🍭','linear-gradient(135deg,#fbcfe8,#ddd6fe)','Candy'],
  ['rainbow',40,'🌈','linear-gradient(135deg,#fecaca,#fde68a,#bbf7d0,#bfdbfe,#ddd6fe)','Rainbow'],['space',50,'🌌','linear-gradient(135deg,#1e1b4b,#581c87)','Space'],['castle',60,'🏰','linear-gradient(135deg,#fae8ff,#c7d2fe)','Castle']]};
const sceneOf=()=>SHOP.scene.find(x=>x[0]==S.wear.scene)||SHOP.scene[0];
function petHTML(st=S.stars){const w=S.wear;return`<span class="petwrap"><span class="pe">${petE(st)}</span>${w.hat?`<span class="hat">${w.hat}</span>`:''}${w.toy?`<span class="toy">${w.toy}</span>`:''}</span>`}
function allMiss(){const out=[];for(const sk in S.prog)for(const m of Object.values(S.prog[sk].miss||{}))if(m.n>0&&m.q){m.q.sk=m.q.sk||sk;out.push(m)}return out.sort((a,b)=>b.n-a.n)}

