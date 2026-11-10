/* ---------- games (paths), maps ---------- */
const PATHS={
 math:{n:'Math Adventure',e:'🔢',c:'linear-gradient(135deg,#dbeafe,#bfdbfe)',worlds:[
  {id:'m_meadow',g:0,n:'Number Meadow',e:'🌻',c:'#dcfce7',nodes:[['add',1,'Adding to 10'],['cnt',1,'Count by 1s & 10s'],['eo',1,'Even or Odd'],['miss',1,'Missing Number'],['sub',1,'Take Away'],['story',1,'Story Problems']]},
  {id:'m_candy',g:1,n:'Candy Canyon',e:'🍭',c:'#fce7f3',nodes:[['add',2,'+9 & Doubles'],['big',1,'Tens & Hundreds'],['cnt',2,'Count by 2s & 5s'],['cmp',1,'Bigger or Smaller'],['miss',2,'Missing to 18'],['sub',2,'Take Away to 18'],['story',2,'Story Problems 2']]},
  {id:'m_reef',g:1,n:'Ocean Reef',e:'🐠',c:'#e0f2fe',nodes:[['add',3,'All the Facts'],['time',1,"O'Clock"],['big',2,'2-Digit Adding'],['coins',1,'Pennies & Nickels'],['eo',2,'Even/Odd to 99'],['cmp',2,'Compare to 100'],['time',2,'Half Past'],['sub',3,'2-Digit Take Away'],['story',3,'Story Problems 3']]},
  {id:'m_space',g:2,n:'Space Station',e:'🚀',c:'#ede9fe',nodes:[['big',3,'Carry the 1'],['mult',1,'Equal Groups'],['coins',2,'Dimes Too'],['cnt',3,'Skip Count Big'],['sub',4,'Borrowing'],['time',3,'Quarter Hours'],['big',4,'3-Digit Adding'],['mult',2,'Groups to 5×5'],['cmp',3,'Compare to 999'],['coins',3,'Quarters']]}]},
 read:{n:'Reading Adventure',e:'📖',c:'linear-gradient(135deg,#fce7f3,#fbcfe8)',worlds:[
  {id:'r_meadow',g:0,n:'Letter Meadow',e:'🌻',c:'#dcfce7',nodes:[['sound',1,'First Sounds'],['sight',1,'Sight Words'],['rhyme',1,'Rhyme Time'],['pic',1,'Picture Words'],['sound',2,'Last Sounds'],['build',1,'Build a Word'],['sent',1,'Read & Match']]},
  {id:'r_candy',g:1,n:'Candy Canyon',e:'🍭',c:'#fce7f3',nodes:[['sight',2,'More Sight Words'],['rhyme',2,'Rhyme & Read'],['pic',2,'Blends'],['build',2,'Build Blends'],['sent',2,'Read Sentences'],['comp',1,'Story Time']]},
  {id:'r_reef',g:1,n:'Ocean Reef',e:'🐠',c:'#e0f2fe',nodes:[['sight',3,'Sight Words 3'],['pic',3,'Magic E'],['build',3,'Build Magic E'],['comp',2,'Story Time 2']]},
  {id:'r_space',g:2,n:'Space Station',e:'🚀',c:'#ede9fe',nodes:[['pic',4,'Vowel Teams'],['build',4,'Build Vowel Teams']]}]},
 es:{n:'Spanish Adventure',e:'🌮',c:'linear-gradient(135deg,#dcfce7,#fef9c3)',byLevel:true,worlds:[
  {id:'e_plaza',g:-1,n:'Hola Plaza',e:'🌮',c:'#fef9c3',nodes:[['es_greet',1,'¡Hola! Listen'],['es_color',1,'Colors'],['es_num',1,'Numbers 1–10'],['es_animal',1,'Animals'],['es_greet',2,'¡Hola! Read'],['es_color',2,'Read Colors'],['es_num',2,'Read Numbers'],['es_animal',2,'Read Animals']]},
  {id:'e_fiesta',g:-1,n:'Fiesta Island',e:'🪅',c:'#ffedd5',nodes:[['es_food',1,'Food'],['es_body',1,'My Body'],['es_family',1,'Family'],['es_teen',1,'Numbers 11–20'],['es_food',2,'Read Food'],['es_body',2,'Read Body'],['es_family',2,'Read Family'],['es_teen',2,'Read 11–20']]},
  {id:'e_repaso',g:-1,n:'Gran Repaso',e:'🏆',c:'#e0e7ff',nodes:[['es_mix',1,'Big Review: Listen'],['es_mix',2,'Big Review: Read']]}]}};
const BOSSES=[['👾','Gloop'],['🤖','Robo-Bonk'],['🐙','Captain Inky'],['👽','Zorp']];
const BPRIZE=['🌼','⭐','🎉','🪐','🌈','🔥','💎','🍀','🌙','⚡','🍩','🎵'];
/* World ids (`id`) and grade tags (`g`) come from CURRICULUM.md section 2. An id is permanent: anything saved per world uses it,
   never the world's index, so worlds can be inserted anywhere (decision A5). A path with byLevel is opened by order only. */
const NODES={},WR={}; // WR[p][wi] = [first, last] stop index of world wi (the boss is last)
/* (Re)builds NODES[p] and WR[p] from PATHS[p]. Runs once per path at load; tests call it after adding fake worlds. */
function buildNodes(p){
  const pi=Object.keys(PATHS).indexOf(p);
  NODES[p]=[];WR[p]=[];
  PATHS[p].worlds.forEach((w,wi)=>{
    const a=NODES[p].length;
    w.nodes.forEach(([sk,lv,t])=>NODES[p].push({sk,lv,t,wi,wid:w.id,p}));
    const B=BOSSES[wi%BOSSES.length];
    NODES[p].push({sk:'boss',lv:wi,t:`Boss: ${B[1]}`,wi,wid:w.id,p,last:true,boss:B,prize:BPRIZE[(pi*4+wi)%BPRIZE.length]});
    WR[p].push([a,NODES[p].length-1]);
  });
}
for(const p in PATHS)buildNodes(p);
/* Stop id, the key of S.maps[path]. A boss is keyed by its world id (boss_m_meadow); other stops by skill + level (add1). */
const nid=n=>n.sk=='boss'?'boss_'+n.wid:n.sk+n.lv;
const getSt=(p,i)=>S.maps[p][nid(NODES[p][i])]||0,setSt=(p,i,v)=>{S.maps[p][nid(NODES[p][i])]=v};
const passed=(p,i)=>getSt(p,i)>0;
const worldDone=(p,wi)=>{const[a,b]=WR[p][wi];for(let i=a;i<=b;i++)if(!passed(p,i))return false;return true};

/* ---------- grades and world gating (P1-05; ROADMAP 3.1, 3.2) ----------
   API for P1-06 and later:
     GRADES, gradeLabel(g)  the 8 grade values (-1 Pre-K, 0 K, 1..6) and their short labels
     gradeOf()              the child's grade: S.grade when set, else 0 (K), which keeps the maps exactly as they were before grades
     setGrade(g)            stores S.grade (and saves); returns false for a value that is not a grade. Never locks anything
     worldOpen(p, wi)       a world can be entered: first world, g <= grade (not on byLevel paths), skipped, previous world finished
                            or skipped, the child already has progress in it, or "Unlock every stop" is on
     worldFinished(p, wi)   boss beaten, all stops passed, or S.skip[id] (placement or test out)
     unlocked(p, i)         a stop can be played; passed stops always can
     stopNew(p, i)          an unpassed stop in a world whose boss is beaten (it was added later): NEW tag, never locked
     curNode(p), curWorld(p)  where the map opens
     worldStep(p, wi)       how much harder this world is for this child (game time bonus in ptCalc)
   Nothing here is saved except S.grade (P1-06) and S.skip {worldId: 1}. */
const GRADES=[-1,0,1,2,3,4,5,6];
const gradeLabel=g=>g<0?'Pre-K':g==0?'K':['1st','2nd','3rd','4th','5th','6th'][g-1]||'';
const gradeOf=()=>GRADES.includes(S.grade)?S.grade:0;
function setGrade(g){if(!GRADES.includes(g))return false;S.grade=g;save();return true}
/* Spoken names for the grade buttons (say() reads them when tapped). */
const gradeSpoken=g=>g<0?'Pre-K':g==0?'Kindergarten':['First','Second','Third','Fourth','Fifth','Sixth'][g-1]+' grade';
/* Round rules for a grade (ROADMAP 3.1). n: questions in a normal stop round; choices: most answer buttons a generator should
   show (3 for Pre-K, else 4); auto: 'all' = every prompt that has a spoken line is read aloud on its own, even with
   "Read questions out loud" off (Pre-K and K); 'auto' = prompts marked auto are read when that setting is on (1st);
   'tap' = same, the child taps the speaker for the rest (2nd and up); multi: multi-step items wanted (5th, 6th).
   gradeCfg() with no argument uses the child's grade. */
function gradeCfg(g){
  g=GRADES.includes(g)?g:gradeOf();
  return{g,n:g<0?6:g==0?8:10,choices:g<0?3:4,auto:g<=0?'all':g==1?'auto':'tap',multi:g>=5};
}
const worldId=(p,wi)=>PATHS[p].worlds[wi].id;
const worldSkipped=(p,wi)=>!!(S.skip&&S.skip[worldId(p,wi)]);
function worldHasProgress(p,wi){const[a,b]=WR[p][wi];for(let i=a;i<=b;i++)if(passed(p,i))return true;return false}
const worldFinished=(p,wi)=>passed(p,WR[p][wi][1])||worldSkipped(p,wi)||worldDone(p,wi);
function worldOpen(p,wi){
  if(S.unlockAll||wi==0)return true;
  if(!PATHS[p].byLevel&&PATHS[p].worlds[wi].g<=gradeOf())return true; // nothing at or below the child's grade is locked
  return worldSkipped(p,wi)||worldFinished(p,wi-1)||worldHasProgress(p,wi); // skipped worlds stay playable
}
/* Some later stop of the same world is passed (it was added later, or an old save skipped it): it stays open. */
function stopBehind(p,i){const b=WR[p][NODES[p][i].wi][1];for(let j=i+1;j<=b;j++)if(passed(p,j))return true;return false}
function unlocked(p,i){
  if(S.unlockAll||passed(p,i))return true; // passed stops are always replayable
  const wi=NODES[p][i].wi;
  if(!worldOpen(p,wi))return false;
  return i==WR[p][wi][0]||passed(p,i-1)||worldSkipped(p,wi)||stopBehind(p,i);
}
const stopNew=(p,i)=>!passed(p,i)&&passed(p,WR[p][NODES[p][i].wi][1]);
/* The world where a child starts: the first one at or above their grade (the last world if none is). byLevel paths start at 0. */
function startWorld(p){
  if(PATHS[p].byLevel)return 0;
  const ws=PATHS[p].worlds,k=ws.findIndex(w=>w.g>=gradeOf());
  return k<0?ws.length-1:k;
}
/* The stop the map opens on: the first open, unpassed stop, not counting NEW stops or untouched worlds below the start world.
   Falls back to any open unpassed stop, then to the very last stop (everything done). */
function curNode(p){
  const N=NODES[p],sw=startWorld(p);let any=-1;
  for(let i=0;i<N.length;i++){
    if(passed(p,i)||!unlocked(p,i))continue;
    if(any<0)any=i;
    const wi=N[i].wi;
    if(stopNew(p,i)||(wi<sw&&!worldHasProgress(p,wi)))continue;
    return i;
  }
  return any>=0?any:N.length-1;
}
const curWorld=p=>NODES[p][curNode(p)].wi;
/* "Harder world" game time steps. byLevel paths: the world's place in the path. Graded paths: worlds below the child's grade
   give 0; otherwise the number of earlier worlds at or above the grade (with no grade set this equals the old index rule). */
function worldStep(p,wi){
  if(PATHS[p].byLevel)return wi;
  const ws=PATHS[p].worlds,g0=gradeOf();
  if(ws[wi].g<g0)return 0;
  let k=0;for(let j=0;j<wi;j++)if(ws[j].g>=g0)k++;
  return k;
}
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

