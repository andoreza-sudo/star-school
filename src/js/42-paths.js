/* ---------- games (paths), maps ---------- */
const PATHS={
 math:{n:'Math Adventure',e:'🔢',c:'linear-gradient(135deg,#dbeafe,#bfdbfe)',worlds:[
  {id:'m_tiny',g:-1,n:'Tiny Town',e:'🏠',c:'#fef9c3',nodes:[['pk_count',1,'Count to 5'],['shape',1,'Find the Shape'],['pk_num',1,'Hear a Number'],['sort',1,'Which One Is Different'],['pk_more',1,'Which Has More'],['pk_count',2,'Count to 10'],['pat',1,'What Comes Next'],['pk_num',2,'Numbers to 10'],['sort',2,'Big and Small'],['trace',1,'Trace Numbers']]},
  {id:'m_shape',g:0,n:'Shape Garden',e:'🌷',c:'#dcfce7',nodes:[['pk_count',3,'Count to 20'],['pk_num',3,'Hear 11 to 20'],['tenf',1,'Ten Frames'],['pk_more',2,'More, Fewer, Same'],['shape',2,'More Shapes'],['add',4,'Add to 5'],['pat',2,'Harder Patterns'],['tenf',2,'Make Ten'],['cnt',4,'Count On & Back'],['shape',3,'Solid Shapes'],['sort',3,'Sort by Kind'],['pos',1,'Where Is It'],['meas',1,'Measure'],['tenf',3,'Ten and More']]},
  {id:'m_meadow',g:0,n:'Number Meadow',e:'🌻',c:'#dcfce7',nodes:[['add',1,'Adding to 10'],['cnt',1,'Count by 1s & 10s'],['eo',1,'Even or Odd'],['miss',1,'Missing Number'],['sub',1,'Take Away'],['story',1,'Story Problems']]},
  {id:'m_candy',g:1,n:'Candy Canyon',e:'🍭',c:'#fce7f3',nodes:[['add',2,'+9 & Doubles'],['big',1,'Tens & Hundreds'],['cnt',2,'Count by 2s & 5s'],['cmp',1,'Bigger or Smaller'],['miss',2,'Missing to 18'],['sub',2,'Take Away to 18'],['story',2,'Story Problems 2']]},
  {id:'m_clock',g:1,n:'Clock Tower',e:'🗼',c:'#fef3c7',nodes:[['pv',1,'Tens & Ones'],['add',5,'Add Three'],['meas',2,'Measure with Cubes'],['add',6,'Mental Math'],['data',1,'Picture Graphs'],['shape',4,'Sides & Corners'],['frac',1,'Equal Parts']]},
  {id:'m_reef',g:1,n:'Ocean Reef',e:'🐠',c:'#e0f2fe',nodes:[['add',3,'All the Facts'],['time',1,"O'Clock"],['big',2,'2-Digit Adding'],['coins',1,'Pennies & Nickels'],['eo',2,'Even/Odd to 99'],['cmp',2,'Compare to 100'],['time',2,'Half Past'],['sub',3,'2-Digit Take Away'],['story',3,'Story Problems 3']]},
  {id:'m_space',g:2,n:'Space Station',e:'🚀',c:'#ede9fe',nodes:[['big',3,'Carry the 1'],['mult',1,'Equal Groups'],['coins',2,'Dimes Too'],['cnt',3,'Skip Count Big'],['sub',4,'Borrowing'],['time',3,'Quarter Hours'],['big',4,'3-Digit Adding'],['mult',2,'Groups to 5×5'],['cmp',3,'Compare to 999'],['coins',3,'Quarters']]},
  {id:'m_bay',g:2,n:'Treasure Bay',e:'🗺️',c:'#ccfbf1',nodes:[['pv',2,'Place Value to 999'],['big',5,'Add 3-Digit Numbers'],['pv',3,'Expanded Form'],['sub',5,'Take Away 3-Digit'],['time',4,'Clocks to 5 Minutes'],['coins',4,'Dollars & Coins'],['meas',3,'Rulers'],['data',2,'Bar Graphs'],['arr',1,'Rows & Columns'],['cnt',5,'Skip Counting More'],['coins',5,'Making Change'],['story',4,'Two-Step Stories'],['pat',3,'Growing Patterns']]},
  {id:'m_mult',g:3,n:'Multiply Mountain',e:'🏔️',c:'#ffedd5',nodes:[['arr',2,'Arrays'],['mfact',1,'Easy Times Facts'],['mfact',2,'Times 3 & 4'],['dfact',1,'Easy Dividing'],['mfact',3,'Times 6 to 9'],['dfact',2,'Divide by 3 & 4'],['mfact',4,'All Times Facts'],['dfact',3,'Divide by 6 to 9'],['dfact',4,'All Dividing'],['mbig',1,'Times Tens & Hundreds'],['story',5,'Story Problems 5']]},
  {id:'m_frac',g:3,n:'Fraction Forest',e:'🌳',c:'#dcfce7',nodes:[['frac',2,'Name the Fraction'],['round',1,'Round to 10'],['frac',3,'Fractions on a Line'],['sub',6,'3-Digit Take Away'],['geo',1,'Perimeter'],['frac',4,'Compare Fractions'],['round',2,'Round to 100'],['time',5,'Time to the Minute'],['geo',2,'Area'],['frac',5,'Equal Fractions'],['sub',7,'Take Away Across Zeros'],['data',3,'Scaled Graphs'],['shape',5,'Shape Families'],['time',6,'How Much Time Passed'],['meas',4,'Rulers & Scales'],['story',6,'Story Problems 6']]},
  {id:'m_factory',g:4,n:'Factor Factory',e:'⚙️',c:'#e0e7ff',nodes:[['mfact',5,'Times 11 & 12'],['pv',4,'Place Value to 999,999'],['mbig',2,'2-Digit Times 1-Digit'],['big',6,'Add 4-Digit Numbers'],['dbig',1,'Divide 2-Digit Numbers'],['mbig',3,'Big Times 1-Digit'],['sub',8,'Take Away Big Numbers'],['dbig',2,'Divide with Leftovers'],['fact',1,'Factors & Multiples'],['mbig',4,'2-Digit Times 2-Digit'],['big',7,'Add Big Numbers'],['dbig',3,'Divide Big Numbers'],['fact',2,'Prime or Composite'],['round',3,'Round Big Numbers']]},
  {id:'m_desert',g:4,n:'Decimal Desert',e:'🏜️',c:'#fef08a',nodes:[['frac',6,'Unlike Fractions'],['frac',7,'Simplest Form'],['fop',1,'Add & Subtract Parts'],['frac',8,'Mixed Numbers'],['fop',2,'Whole × Fraction'],['dec',1,'Tenths & Hundredths'],['dec',2,'Compare Decimals'],['ang',1,'Kinds of Angles'],['ang',2,'Measure Angles'],['geo',3,'Find the Missing Side'],['shape',6,'Symmetry & Lines'],['meas',5,'Convert Units'],['pat',4,'In and Out Tables'],['story',7,'Remainder Stories']]},
  {id:'m_volcano',g:5,n:'Volcano Lab',e:'🌋',c:'#ffe4e6',nodes:[['pv',5,'Decimal Place Value'],['mbig',5,'3-Digit Times 2-Digit'],['dec',3,'Add/Subtract Decimals'],['pv',6,'Powers of Ten'],['dbig',4,'Divide by 2-Digit'],['dec',4,'Multiply Decimals'],['round',4,'Round Decimals'],['ooo',1,'Order of Operations'],['dec',5,'Divide Decimals']]},
  {id:'m_caves',g:5,n:'Crystal Caves',e:'💎',c:'#f3e8ff',nodes:[['fop',3,'Unlike Denominators'],['fop',4,'Mixed Numbers'],['geo',4,'Volume of a Box'],['fop',5,'Multiply Fractions'],['coord',1,'Coordinate Grid'],['fop',6,'Unit Fraction Division'],['meas',6,'Convert Both Ways'],['data',4,'Line Plots'],['pat',5,'Two Rules'],['story',8,'Fraction Stories']]},
  {id:'m_sky',g:6,n:'Sky City',e:'☁️',c:'#e0f2fe',nodes:[['ratio',1,'Ratios and Tables'],['ratio',2,'Unit Rates'],['int',1,'Integers on a Line'],['ratio',3,'Percent of a Number'],['int',2,'Absolute Value'],['ratio',4,'Fractions and Percents'],['fop',7,'Divide Fractions'],['int',3,'Integer Add & Subtract']]}]},
 read:{n:'Reading Adventure',e:'📖',c:'linear-gradient(135deg,#fce7f3,#fbcfe8)',worlds:[
  {id:'r_abc',g:-1,n:'ABC Beach',e:'🏖️',c:'#e0f2fe',nodes:[['abc',1,'Big Letters'],['abc',2,'Little Letters'],['trace',2,'Trace Big Letters'],['abc',3,'Match Big & Little'],['syl',1,'Clap the Syllables'],['trace',3,'Trace Little Letters'],['abc',4,'ABC Order']]},
  {id:'r_meadow',g:0,n:'Letter Meadow',e:'🌻',c:'#dcfce7',nodes:[['sound',1,'First Sounds'],['sight',1,'Sight Words'],['rhyme',1,'Rhyme Time'],['pic',1,'Picture Words'],['sound',2,'Last Sounds'],['build',1,'Build a Word'],['sent',1,'Read & Match'],['sound',3,'Middle Sounds']]},
  {id:'r_candy',g:1,n:'Candy Canyon',e:'🍭',c:'#fce7f3',nodes:[['sight',2,'More Sight Words'],['rhyme',2,'Rhyme & Read'],['pic',2,'Blends'],['build',2,'Build Blends'],['sent',2,'Read Sentences'],['comp',1,'Story Time'],['sound',4,'Letter Teams'],['syl',2,'Count the Claps'],['spell',1,'Spell Short Words']]},
  {id:'r_reef',g:1,n:'Ocean Reef',e:'🐠',c:'#e0f2fe',nodes:[['sight',3,'Sight Words 3'],['pic',3,'Magic E'],['build',3,'Build Magic E'],['comp',2,'Story Time 2'],['spell',2,'Spell Blends'],['vocab',1,'Opposites'],['gram',1,'Capitals & End Marks']]},
  {id:'r_space',g:2,n:'Space Station',e:'🚀',c:'#ede9fe',nodes:[['pic',4,'Vowel Teams'],['build',4,'Build Vowel Teams'],['sight',4,'Sight Words 4'],['pic',5,'Bossy R'],['build',5,'Build Bossy R'],['spell',3,'Spell Magic E & Teams'],['sent',3,'Build Sentences']]},
  {id:'r_workshop',g:2,n:'Word Workshop',e:'🔧',c:'#fef3c7',nodes:[['sight',5,'Sight Words 5'],['pic',6,'Vowel Teams 2'],['build',6,'Build Vowel Teams 2'],['gram',2,'Parts of Speech'],['vocab',2,'Synonyms'],['sent',4,'Fill the Gap'],['vocab',3,'Compound Words'],['gram',3,'Plurals'],['sent',5,'Sentence Stories'],['comp',3,'Read a Story'],['info',1,'Learn About It']]},
  {id:'r_summit',g:3,n:'Story Summit',e:'🏔️',c:'#e2e8f0',nodes:[['spell',4,'Spell Tricky Sounds'],['gram',4,'Verb Tenses'],['vocab',4,'Prefixes'],['gram',5,'Contractions & Agreeing'],['vocab',5,'Suffixes'],['comp',4,'Read a Story 2'],['info',2,'Learn About It 2']]},
  {id:'r_library',g:4,n:'Dragon Library',e:'🐉',c:'#fee2e2',nodes:[['spell',5,'Spell Word Parts'],['gram',6,'Pronouns & Look-Alikes'],['vocab',6,'Homophones'],['vocab',7,'Context Clues'],['gram',7,'Commas & Quotes'],['vocab',8,'Figurative Language'],['comp',5,'Read a Story 3'],['info',3,'Learn About It 3']]},
  {id:'r_island',g:5,n:'Author Island',e:'🏝️',c:'#fef9c3',nodes:[['spell',6,'Spell Big Words'],['gram',8,'More Parts of Speech'],['vocab',9,'Word Roots'],['comp',6,'Read a Story 4'],['info',4,'Learn About It 4']]},
  {id:'r_legend',g:6,n:'Legend Lab',e:'🏰',c:'#f3e8ff',nodes:[['spell',7,'Spell Tough Words'],['gram',9,'Sentence Craft'],['vocab',10,'Analogies'],['comp',7,'Read a Story 5'],['info',5,'Learn About It 5']]}]},
 es:{n:'Spanish Adventure',e:'🌮',c:'linear-gradient(135deg,#dcfce7,#fef9c3)',byLevel:true,worlds:[
  {id:'e_plaza',g:-1,n:'Hola Plaza',e:'🌮',c:'#fef9c3',nodes:[['es_greet',1,'¡Hola! Listen'],['es_color',1,'Colors'],['es_num',1,'Numbers 1–10'],['es_animal',1,'Animals'],['es_greet',2,'¡Hola! Read'],['es_color',2,'Read Colors'],['es_num',2,'Read Numbers'],['es_animal',2,'Read Animals']]},
  {id:'e_fiesta',g:-1,n:'Fiesta Island',e:'🪅',c:'#ffedd5',nodes:[['es_food',1,'Food'],['es_body',1,'My Body'],['es_family',1,'Family'],['es_teen',1,'Numbers 11–20'],['es_food',2,'Read Food'],['es_body',2,'Read Body'],['es_family',2,'Read Family'],['es_teen',2,'Read 11–20']]},
  {id:'e_repaso',g:-1,n:'Gran Repaso',e:'🏆',c:'#e0e7ff',nodes:[['es_mix',1,'Big Review: Listen'],['es_mix',2,'Big Review: Read']]}]},
 /* Discover (P2-36): graded like Math and Reading, but no placement quiz (noPlace). Worlds and stops follow CURRICULUM 2.4;
    P2-37 adds geo_world 1 and civ 1 to Nature Trail and the worlds d_lab and d_cosmos. */
 disc:{n:'Discover',e:'🌍',c:'linear-gradient(135deg,#ccfbf1,#99f6e4)',noPlace:true,worlds:[
  {id:'d_nature',g:0,n:'Nature Trail',e:'🌲',c:'#ccfbf1',nodes:[['sci_life',1,'Living Things'],['sci_earth',1,'Sky & Earth'],['sci_phys',1,'Push, Pull & Stuff']]}]}};
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
  return i==WR[p][wi][0]||passed(p,i-1)||sideOpen(p,i-1)||worldSkipped(p,wi)||stopBehind(p,i);
}
/* P2-17: a stop of a side skill (SK[sk].side: tracing) never holds back the stop after it; that stop opens with it. Tracing stops sit
   between older stops (ABC Beach trace 2 and 3), so a save that had the next stop open keeps it open. */
const sideOpen=(p,i)=>!!(SK[NODES[p][i].sk]||{}).side&&unlocked(p,i);
const stopNew=(p,i)=>!passed(p,i)&&passed(p,WR[p][NODES[p][i].wi][1]);
/* The world where a child starts: the first one at or above their grade (the last world if none is). byLevel paths start at 0. */
function startWorld(p){
  if(PATHS[p].byLevel)return 0;
  const pw=placeWorld(p);if(pw>=0)return pw; // P1-07: a placement result taken at the current grade
  const ws=PATHS[p].worlds,k=ws.findIndex(w=>w.g>=gradeOf());
  return k<0?ws.length-1:k;
}
/* The stop the map opens on: the first open, unpassed stop, not counting NEW stops or untouched worlds below the start world.
   Falls back to any open unpassed stop (not in an untouched world below the start world), then to the very last stop (everything done). */
function curNode(p){
  const N=NODES[p],sw=startWorld(p);let any=-1,lp=-1;
  for(let i=0;i<N.length;i++)if(passed(p,i))lp=Math.max(lp,N[i].wi); // the furthest world with a passed stop
  for(let i=0;i<N.length;i++){
    if(passed(p,i)||!unlocked(p,i))continue;
    const wi=N[i].wi,below=(wi<sw&&(!worldHasProgress(p,wi)||worldSkipped(p,wi)))||(wi<lp&&!worldHasProgress(p,wi)); // an untouched world below the start world (Pre-K Tiny Town for a K child), or behind the child's furthest progress (a K world added in front of Number Meadow)
    if(any<0&&!below&&!stopNew(p,i))any=i; // (P2-24: a NEW stop never becomes the fallback) a finished child is not sent back down to a world they never needed
    if(stopNew(p,i)||below)continue; // skipped by placement: start above it
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
const nInfo=n=>n.sk=='boss'?{e:n.boss[0],area:'boss'}:SK[n.sk]&&SK[n.sk].lvArea?Object.assign({},SK[n.sk],{area:skArea(n.sk,n.lv)}):SK[n.sk];
const SHOP={hat:[['🧢',10],['🎀',10],['🎩',20],['⛑️',25],['🎓',40],['👑',60]],
 toy:[['🎈',10],['🍭',10],['⚽',15],['🧸',20],['🪁',30],['🪄',45],['🏆',80]],
 scene:[['meadow',0,'🌻','linear-gradient(135deg,#fef3c7,#fde68a)','Meadow'],['beach',30,'🏖️','linear-gradient(180deg,#bae6fd,#fef3c7 75%)','Beach'],['candy',40,'🍭','linear-gradient(135deg,#fbcfe8,#ddd6fe)','Candy'],
  ['rainbow',40,'🌈','linear-gradient(135deg,#fecaca,#fde68a,#bbf7d0,#bfdbfe,#ddd6fe)','Rainbow'],['space',50,'🌌','linear-gradient(135deg,#1e1b4b,#581c87)','Space'],['castle',60,'🏰','linear-gradient(135deg,#fae8ff,#c7d2fe)','Castle']]};
const sceneOf=()=>SHOP.scene.find(x=>x[0]==S.wear.scene)||SHOP.scene[0];
function petHTML(st=S.stars){return petRigHTML(st)} // P4-06: every pet is drawn on the rig (17-pets-svg.js)
const allMiss=()=>dueItems(); // P5-02: review items due today, most urgent first (59-review.js); home shows the count

