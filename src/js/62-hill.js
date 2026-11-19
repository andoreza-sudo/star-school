/* ---------- 4x4 Hill Climb (G-HC2: worlds of hand-shaped stages, missions, a garage that matters) ----------
   A side-view drive: two wheels on a stiff bar (Verlet), gas and brake pedals, the car tips in the air.
   Journey: 6 worlds (HCW) of 5 hand-shaped stages each (HC_ST). A stage is a line of pieces (hcParse / hcCourse): flat, slopes,
   hills, rollers, kicker jumps, gaps over water / lava / craters, bridges, fords, rocks, mud / sand / ash / ice, checkpoints,
   bolts, fuel cans, balloons, a hidden star and boost pads; it ends at a finish flag. Each stage has a goal (reach the flag,
   collect N bolts, or deliver crates) and two missions (bolts, time, flips, big air, no restarts, all crates, the hidden star,
   a stop at the lookout):
   1 star for the goal, 1 for each mission, kept for good (S.garage.st {stageId: bits}). A stage opens when the one before is
   finished; a world opens with stars (HC_NEED). The menu's "Next goal" line says what to do next.
   Distance drive (endless, for older children): a long seeded course per world that gets harder, fuel cans further apart,
   the personal best as a flag on the road (S.garage.best).
   Garage: vehicles (VEH) and four upgrades (engine, tyres, suspension, fuel tank; 5 levels) bought with bolts earned by playing.
   Driving help (G-FEEL1, a dial of 4 levels in place of the old Easy driving switch; HC_AS, Grown-ups picks Auto or a level, the
   menu switch turns it on (Auto) or off): levels the car in the air, eases the gas when the nose lifts, softer landings, balloons
   that float the car over gaps, a car tipping over set back on its wheels. A flip or an empty tank restarts at the last checkpoint:
   no lives, nothing lost. G-FEEL1 missions need a decision, never just the gas: the hidden star sits low under a jump (ease off
   before it), the lookout sign wants a stop (brake and wait); time targets come from a careful bot's drive. Colours are tokens
   (hcC: --ill-* roles, --sc-* skies); no shake in calm mode or with reduced motion.
   The simulation (hcNew / hcStep) runs without the page, so tools/test.js drives every stage with bots.
   G-HC3 (R-03 H1-H4, A1-A5): fixed steps that catch up after a slow frame (hcAdvance: no slow motion on a slow tablet); 4 ranges
   behind the road that fade into the sky and a foreground strip; a new distance road every day (hcSeed) and today's drive
   (hcDay: one open world, a twist, a gold flag at 250 m, +30 bolts the first time a day, no streak); a calm music loop per world
   (hcMusic); a buzz on a crash or a flip (hcBuzz); garage level 2 (HC_T2: rims, trails, toppers, open from 30 stars) and a
   "save for" line on the menu (hcSaveLine). */
/* truck sound pack */
const ENG={jeep:[46,'sawtooth',0],buggy:[64,'sawtooth',0],monster:[33,'sawtooth',5],bike:[82,'square',0],tractor:[28,'square',9],bus:[37,'sawtooth',3]};
const hs=()=>S.sound&&(S.hcSnd||0)<2;
const HSND={
  scale:[72,74,76,79,81,84,86,88,91,93],
  coin(H){if(!hs())return;const now=H.t;H.cs=(now-(H.csT||-9)<1.2)?(H.cs||0)+1:0;H.csT=now;const m=this.scale[Math.min(H.cs,9)],w=['triangle','sine','square'][(H.cs/4|0)%3];tone(NOTE(m),.07,0,w,.06);tone(NOTE(m+12),.1,.05,'sine',.04)},
  cp(k){if(!hs())return;const J=[[[72,0],[76,.1],[79,.2],[84,.3]],[[67,0],[72,.12],[79,.24],[76,.36],[84,.48]],[[84,0],[79,.08],[84,.16],[88,.3]],[[60,0],[64,.1],[67,.2],[72,.3],[76,.4],[79,.5]],[[76,0],[74,.1],[76,.2],[81,.32]]];
    J[(k||0)%J.length].forEach(([m,t])=>tone(NOTE(m),.18,t,'triangle',.06));noise(.3,.3,.03,3000,8000)},
  fuel(){if(!hs())return;for(let i=0;i<5;i++)tone(300+i*90,.07,i*.07,'sine',.08,200);tone(900,.15,.38,'triangle',.06)},
  crash(water){if(!hs())return;if(water){SFX.splash&&SFX.splash();return}noise(.35,0,.3,400,1500);tone(160,.25,0,'square',.1,60)},
  land(v){if(!hs())return;tone(80,.18,0,'sine',Math.min(.25,v/2500),35);noise(.12,0,Math.min(.15,v/4000),300,120)},
  trick(mult){if(!hs())return;const b=[72,76,79,84][Math.min(3,mult-1)];[0,4,7,12].forEach((d,i)=>tone(NOTE(b+d),.1,i*.06,'square',.05))},
  shift(){if(!hs())return;tone(220,.05,0,'square',.025,140)},
  balloon(){if(!hs())return;[67,71,74,79].forEach((m,i)=>tone(NOTE(m),.12,i*.07,'sine',.06))},
  star(){if(!hs())return;[79,83,86,91].forEach((m,i)=>tone(NOTE(m),.14,i*.08,'triangle',.07))}};
let HC=null;

/* ---- colours: tokens only. A role ('g', 'g2', 'k', 'w1') is --ill-<hue>[-n]; 'sc-sky' is --sc-sky ---- */
const HC_HUE={r:'red',o:'orange',y:'yellow',g:'green',c:'aqua',b:'blue',v:'purple',p:'pink',n:'brown',t:'tan',s:'skin',m:'cream',e:'grey',w:'white',k:'ink'};
const hcTok=role=>role.startsWith('sc-')?'--'+role:'--ill-'+HC_HUE[role[0]]+(role[1]?'-'+role[1]:'');
let HC_COL={};
function hcC(role){if(HC_COL[role])return HC_COL[role];let v='';try{const cs=getComputedStyle(document.documentElement);v=cs.getPropertyValue?cs.getPropertyValue(hcTok(role)).trim():''}catch(e){}return v?(HC_COL[role]=v):''}
// a token with alpha (canvas): '#RRGGBB' -> 'rgba(r,g,b,a)'
function hcA(role,a){const c=hcC(role);if(!/^#[0-9a-f]{6}$/i.test(c))return c;const n=parseInt(c.slice(1),16);return`rgba(${n>>16},${(n>>8)&255},${n&255},${a})`}

/* ---- worlds and stages ----
   per world: g gravity (px/s^2), soft (the world's soft ground), pit (what a gap holds), sky (two --sc-* tokens), top/top2 (road),
   dirt/dirt2, far/far2/mid (background layers), prop (roadside things), water (the fill of gaps, fords, under bridges) */
const HCW=[
  {id:'meadow',n:'Green Meadow',g:620,soft:'mud',pit:'water',sky:['sc-sky','sc-sky-1'],top:'g',top2:'g2',dirt:'n',dirt2:'n2',far:'e2',far2:'e3',mid:'g1',water:'c',prop:'tree',snowcap:1},
  {id:'desert',n:'Sunny Desert',g:620,soft:'sand',pit:'water',sky:['sc-dusk','sc-sun'],top:'y',top2:'y2',dirt:'o2',dirt2:'o3',far:'o2',far2:'o3',mid:'t',water:'c',prop:'cactus'},
  {id:'jungle',n:'Jungle River',g:620,soft:'mud',pit:'water',sky:['sc-mint','sc-green'],top:'g2',top2:'g3',dirt:'n2',dirt2:'n3',far:'g3',far2:'g2',mid:'g2',water:'c2',prop:'palm'},
  {id:'snow',n:'Snowy Peaks',g:620,soft:'ice',pit:'water',sky:['sc-blue','sc-sky-1'],top:'w',top2:'w2',dirt:'e2',dirt2:'e3',far:'e2',far2:'e3',mid:'w2',water:'b1',prop:'pine',snowcap:1},
  {id:'volcano',n:'Volcano Island',g:620,soft:'ash',pit:'lava',sky:['sc-rose','sc-peach'],top:'e3',top2:'k2',dirt:'k2',dirt2:'k',far:'r3',far2:'k2',mid:'n3',water:'o',prop:'deadtree'},
  {id:'moon',n:'The Moon',g:250,soft:null,pit:'crater',sky:['sc-night','sc-night-1'],top:'e1',top2:'e',dirt:'e2',dirt2:'e3',far:'b3',far2:'k2',mid:'e3',water:'k2',prop:'antenna',space:1},
  {id:'city',n:'Junk City',g:620,soft:'oil',pit:'water',sky:['sc-lilac','sc-candy'],top:'e',top2:'e2',dirt:'e3',dirt2:'k2',far:'v2',far2:'v3',mid:'v3',water:'c',prop:'lamp',dist:1}];
const HC_NEED=[0,4,9,15,22,30]; // stars to open each stage world (the Moon: 30 of 75 before it)
const SOFT={mud:{grip:.38,drag:.996,c:'n3',c2:'n2',label:'MUD'},sand:{grip:.5,drag:.997,c:'y2',c2:'y3',label:'SAND'},ice:{grip:.22,drag:1,c:'c1',c2:'w',label:'ICE'},
  ash:{grip:.45,drag:.996,c:'e3',c2:'e',label:'ASH'},oil:{grip:.24,drag:1,c:'k',c2:'v3',label:'OIL'}};
// a stage: [id, name, goal, missions, weather, pieces]. goal: ['flag'] | ['coins', n] | ['cargo', crates]. missions: [kind, n]:
// bolts n (in one run), time s (reach the flag in s), flips n, air n (big airs), nocrash (no restarts), crates (all crates), star (the hidden star),
// stop (G-FEEL1: stop at the lookout, piece L). A hidden star for the star mission sits low in a dip just past a jump (ease off to drop onto it).
// weather: day | dusk | night | rain | snow | ash | dust. Pieces (metres; 1 m = 20 px), see hcCourse.
const HC_ST=[
  [['m1','First Hills',['flag'],[['bolts',20],['stop']],'day','f12 $5 h30,2.5 f6 $6 h36,3.5 L6 f8 c w48,1,4 $8 f6 F h44,4.5 $5 f8 h30,2 $4 f12'],
   ['m2','Muddy Puddles',['flag'],[['time',19],['stop']],'day','f12 m18 $5 f22 h40,4 c f6 m26 v34,2 $6 f10 u22,4 $5 L5 f12 d26,4 m18 $5 f20 F w42,1.2,3 $6 f12'],
   ['m3','Over the Pond',['flag'],[['star'],['nocrash']],'day','f12 $5 h30,3 f8 b26 $8 f10 c o16 $4 f12 A f2 p4 $4 f10 h40,5 $6 f6 k2.5 d3,1.5 S0.5 d2,1 f1 u5,2.5 f9 $5 f12'],
   ['m4','Farm Delivery',['cargo',3],[['crates'],['stop']],'dusk','f14 $5 h40,3 f10 c w44,1,3 $6 f10 b22 $5 f8 h44,4 c F L6 f12 v36,2.5 $6 f12 u22,3 $5 f16'],
   ['m5','Rolling Rollers',['coins',30],[['air',1],['star']],'day','f12 $8 w60,1.6,4 $8 c f8 k2.5 d3,1.5 S0.5 d2,1 f1 u5,2.5 $5 f5 w60,2,4 $8 F f8 c h50,5 $6 f6 A f2 p5 $5 f12 w50,1.4,4 $8 f12']],
  [['d1','Dune Sea',['flag'],[['bolts',25],['stop']],'day','f12 m30 $5 h50,5 $6 f8 h60,6 c m22 $6 f8 w60,2,3 F $6 h50,5 $5 L5 f8 m20 h40,4 $5 f14'],
   ['d2','Cactus Canyon',['flag'],[['time',18],['star']],'day','f12 r3 f10 $5 u26,5 f10 r2 $4 d26,5 c $6 f8 k3 d3,1.5 S0.5 d2,1 f1 u5,2.5 f5 r4 F $6 h44,4 f10 r2 $5 f14'],
   ['d3','Oasis Jumps',['flag'],[['stop'],['air',1]],'dust','f6 L5 f6 $5 h32,3 f8 A f2 p5 $4 f12 c o18 $5 f12 k4.5 $5 f18 A f2 p6 $4 f12 c F $6 h50,5 f8 A f2 p4 $4 f14'],
   ['d4','Camel Post',['cargo',2],[['crates'],['stop']],'dusk','f14 m16 $5 h44,4 f10 c w50,1.4,3 $6 f8 r2 f10 b24 $5 c F h56,5 $6 L6 f10 m20 v40,3 $5 f16'],
   ['d5','Starry Dunes',['coins',30],[['perfect',1],['star']],'night','f12 $6 h46,4 $6 f8 w56,1.8,3 $8 c k3 d3,1.5 S0.5 d2,1 f1 u5,2.5 $5 f7 h60,6 $6 F f10 c w60,2,4 $8 f8 A f2 p5 $5 f10 h40,4 $6 f14']],
  [['j1','River Fords',['flag'],[['stop'],['time',18]],'day','f12 $5 o14 f10 h40,4 $6 c o20 $5 f10 m20 h36,3.5 $5 f8 F o16 $5 L5 f10 w44,1.4,3 $6 f14'],
   ['j2','Log Bridges',['flag'],[['star'],['nocrash']],'rain','f12 $5 b20 f10 h40,4 c $6 b30 $6 f10 A f2 p5 $4 f40 k3.5 d3,1.5 S0.5 d2,1 f1 u5,2.5 f7 c F b24 $6 f10 h44,4.5 $5 f14'],
   ['j3','Monkey Hills',['coins',30],[['air',1],['star']],'day','f12 $8 w70,2.4,4 $8 f8 c h60,7 $6 f8 F w70,2.6,4 $8 c k3.5 d3,1.5 S0.5 d2,1 f1 u5,2.5 $5 f7 w60,2,4 $8 f14'],
   ['j4','Banana Run',['cargo',3],[['crates'],['stop']],'dusk','f14 $5 m16 h40,3.5 f10 c o16 $5 f10 w50,1.2,4 $6 c F b26 $5 f10 u24,4 m14 $5 L5 f10 d24,4 f16'],
   ['j5','Waterfall Climb',['flag'],[['stop'],['star']],'rain','f12 $5 u30,6 f8 $5 u30,6 f6 c F $6 h40,4 f8 A f2 p6 $4 f12 c u34,7 $5 f10 k3 S5 f20 d40,8 $6 L5 f8 o16 $5 f14']],
  [['s1','Icy Slopes',['flag'],[['bolts',22],['stop']],'snow','f12 i14 $5 h40,4 f10 i20 $6 f10 c w50,1.2,3 $6 i16 f10 F h44,4.5 $5 L5 f8 i22 $5 f14'],
   ['s2','Frozen Lake',['flag'],[['time',17],['star']],'day','f12 $5 i40 f40 c $6 h40,4 f8 A f2 p5 $4 f10 i30 F f30 $6 c k3 d3,1.5 S0.5 d2,1 f1 u5,2.5 f7 i20 h36,3 $5 f14'],
   ['s3','Snowball Jumps',['coins',30],[['star'],['air',2]],'day','f12 $5 k3.5 $5 f18 k4 $5 f20 c h44,4 F $6 k4.5 d3,1.5 S0.5 d2,1 f1 u5,2.5 $6 f13 c w50,1.6,3 $8 k4 $5 f18 h40,4 $6 f14'],
   ['s4','Mountain Post',['cargo',3],[['crates'],['stop']],'snow','f14 $5 u30,5 f10 i14 $5 c h40,4 f10 F w44,1.2,3 $6 c b24 $5 u30,5 L5 f10 i16 d30,5 $6 f16'],
   ['s5','Northern Lights',['flag'],[['nocrash'],['star']],'night','f12 $5 h44,4 i16 f10 c $6 o14 f10 A f2 p5 $4 f12 F w50,1.6,3 $6 c k3 d3,1.5 S0.5 d2,1 f1 u5,2.5 f7 i20 h50,5 $6 f14']],
  [['v1','Ash Road',['flag'],[['stop'],['time',17]],'ash','f12 m20 $5 h44,4.5 f8 r3 $5 c m24 $6 w50,1.6,3 F f8 h50,5 $5 r2 f10 m20 $5 L5 f14'],
   ['v2','Lava Leaps',['flag'],[['nocrash'],['star']],'day','f12 $5 h30,3 f8 A f2 p5 $4 f12 c $5 h40,4 A f2 p6 $4 f40 F c k3 d3,1.5 S0.5 d2,1 f1 u5,2.5 f7 A f2 p5 $4 f10 h40,4 $5 f14'],
   ['v3','Rumble Rocks',['coins',28],[['air',1],['stop']],'day','f12 r4 $5 f8 h40,4 $6 c r3 f10 k3 $5 f16 F r4 $6 c w60,2,4 $8 L5 f8 r3 $5 f14'],
   ['v4','Hot Delivery',['cargo',2],[['crates'],['stop']],'dusk','f14 $5 m16 h44,4 f10 c b26 $5 f8 r2 F f10 u30,5 $5 c d30,5 m18 L5 f10 b20 $5 f16'],
   ['v5','Crater Rim',['flag'],[['star'],['nocrash']],'ash','f12 $5 u36,7 f8 $5 h40,4 c F A f2 p6 $4 f12 u40,8 $6 f8 k3.5 d3,1.5 S0.5 d2,1 f1 u5,2.5 f9 c d40,8 r3 $5 F w50,1.8,3 $6 f14']],
  [['o1','Moon Walk',['flag'],[['bolts',18],['stop']],'day','f12 $5 h50,4 $5 f10 w60,2,3 $6 c F h60,6 $6 L5 f10 r3 $5 f14'],
   ['o2','Crater Hops',['flag'],[['time',19],['star']],'day','f12 $5 f6 p6 $4 f14 c h50,5 $5 p7 $4 f30 F c k3 f1 d3,1.5 S0.5 d2,1 f1 u5,2.5 f12 p6 $4 f14'],
   ['o3','Space Rocks',['coins',25],[['air',2],['stop']],'day','f6 L5 f6 r3 $5 f10 k3 $6 f24 c w70,2.4,3 $8 F r4 $5 c k4 $6 f26 h60,6 $6 f14'],
   ['o4','Moon Base Post',['cargo',3],[['crates'],['stop']],'day','f14 $5 h50,4 L5 f10 c p6 $4 f14 r3 F $5 c w60,2,3 $6 f10 p5 $4 f16'],
   ['o5','Earthrise',['flag'],[['star'],['time',27]],'day','f12 $5 k3 $5 f22 c h60,7 $6 p7 $4 f14 F c u40,7 $5 k4 f1 d3,1.5 S0.5 d2,1 f1 u5,2.5 f14 c d40,7 p6 $4 f10 w50,2,3 $6 f14']]];
const HC_SPW=5; // stages per world
const hcStage=id=>{for(let w=0;w<HC_ST.length;w++){const i=HC_ST[w].findIndex(s=>s[0]==id);if(i>=0)return{w,i,s:HC_ST[w][i]}}return null};

/* ---- vehicles, upgrades, paint ---- */
const VEH={jeep:{n:'Trail Truck',cost:0,R:20,L:74,acc:1,maxV:1,grip:1,lift:1,d:'All-around starter'},
  buggy:{n:'Dune Buggy',cost:250,R:17,L:70,acc:1.18,maxV:1.22,grip:.92,lift:1.2,d:'Super fast, tips up easily'},
  monster:{n:'Monster Truck',cost:500,R:27,L:84,acc:.96,maxV:.95,grip:1.3,lift:.82,d:'Huge tyres that climb anything'},
  bike:{n:'Dirt Bike',cost:350,R:18,L:58,acc:1.3,maxV:1.18,grip:.95,lift:1.55,d:'Wheelie machine, flips easily'},
  tractor:{n:'Tractor',cost:300,R:25,L:72,acc:.9,maxV:.78,grip:1.65,lift:.7,d:'Slow, but climbs walls'},
  bus:{n:'School Bus',cost:450,R:21,L:112,acc:.86,maxV:.92,grip:1.1,lift:.5,d:'Long and steady, hard to flip'}};
// [id, name, icon, what it does]
const UPG=[['engine','Engine','bolt','More speed and power'],['tires','Tyres','circle','Grip on hills, mud, sand and ice'],['susp','Suspension','wave','Softer landings: crates stay on, fewer bounces'],['tank','Fuel tank','drop','Drive farther on one tank']];
const UPCOST=[30,60,110,180,280];
// paint: [role, name, bolts]; old saves keep their colour (HC_OLDPAINT maps the old raw colours to roles)
const PAINTS=[['r','Red',0],['b','Blue',20],['g','Green',20],['o','Orange',20],['p','Pink',30],['v','Purple',30],['k2','Black',40],['y','Gold',60]];
// G-HC3 (R-03 A2): garage level 2, shown with its prices from the start and open from HC_T2_NEED stars: rims, trails behind the
// car and toppers on a pole. Fixed prices, nothing random, nothing that drives better (looks only). [id, kind, name, bolts]
const HC_T2=[['gold','rim','Gold rims',250],['spoke','rim','Spoke rims',400],['starrim','rim','Star rims',550],['rainbow','rim','Rainbow rims',700],
  ['sparkle','trail','Sparkle trail',350],['bubble','trail','Bubble trail',500],['confetti','trail','Confetti trail',700],['rainbowt','trail','Rainbow trail',900],
  ['pennant','top','Pennant',300],['checker','top','Checkered flag',450],['goldstar','top','Gold star',600],['sock','top','Wind sock',800]];
const HC_T2K=['rim','trail','top'],HC_T2N={rim:'Rims',trail:'Trails',top:'Toppers'},HC_T2_NEED=30;
const HC_OLDPAINT={ef4444:'r','3b82f6':'b','22c55e':'g',f59e0b:'o',ec4899:'p',a855f7:'v','111827':'k2',facc15:'y'};
// the numbers an upgrade sets (also used by the garage lines and tools/test.js)
function hcSpec(vk,up){const V=VEH[vk]||VEH.jeep,u=Object.assign({engine:0,tires:0,susp:0,tank:0},up);
  return{R:V.R,L:V.L,acc:(820+u.engine*150)*V.acc,maxV:(420+u.engine*75)*V.maxV,grip:(.9+u.tires*.12)*V.grip,tireUp:u.tires,lift:(5+u.engine*.12)*V.lift,
    susp:u.susp,drop:640+u.susp*110,tankSec:17+u.tank*9}}

/* ---- the save: S.garage (by id with defaults; old saves keep bolts, bests, vehicles, upgrades, paint) ---- */
const HC_OLDNEED={desert:300,snow:600,jungle:450,volcano:750,city:1050,moon:900}; // the old free-drive unlocks (kept: nothing that was open closes)
function garageS(){const g=S.garage||(S.garage={});
  if(!(g.bolts>=0))g.bolts=Math.max(0,Math.floor(+g.bolts||0));
  if(!g.up||typeof g.up!='object')g.up={};for(const [k] of UPG)g.up[k]=Math.max(0,Math.min(5,Math.floor(+g.up[k]||0)));
  if(!g.best||typeof g.best!='object')g.best={};for(const W of HCW)g.best[W.id]=Math.max(0,Math.floor(+g.best[W.id]||0));
  if(!g.vehs||typeof g.vehs!='object')g.vehs={};g.vehs.jeep=1;if(!VEH[g.veh]||!g.vehs[g.veh])g.veh='jeep';
  if(typeof g.paint=='string'&&g.paint[0]=='#')g.paint=HC_OLDPAINT[g.paint.slice(1).toLowerCase()]||'r';
  if(!g.paints||typeof g.paints!='object')g.paints={};
  for(const k of Object.keys(g.paints))if(k[0]=='#'){const r=HC_OLDPAINT[k.slice(1).toLowerCase()];if(r)g.paints[r]=1;delete g.paints[k]}
  g.paints.r=1;if(!PAINTS.some(p=>p[0]==g.paint)||!g.paints[g.paint])g.paint='r';
  if(!g.st||typeof g.st!='object')g.st={};for(const k of Object.keys(g.st)){const v=Math.floor(+g.st[k]||0)&7;if(!hcStage(k)||!v)delete g.st[k];else g.st[k]=v}
  // old missions (v155 and before): a mission done but not claimed pays its bolts once; missions are per stage now
  if(Array.isArray(g.missions)){for(const m of g.missions)if(m&&m.done&&m.r>0)g.bolts+=Math.floor(m.r);g.missions=[]}
  if(g.easy!==true&&g.easy!==false)delete g.easy;
  // G-FEEL1: driving help ('auto' or 0-3), Auto's step up (0-3) and the struggle count on one stage
  if(g.as!=='auto'&&!(g.as===0||g.as===1||g.as===2||g.as===3))delete g.as;
  if(g.asu!=null&&!(g.asu===1||g.asu===2||g.asu===3))delete g.asu;
  if(g.asf!=null&&!(g.asf&&typeof g.asf=='object'&&hcStage(g.asf.s)&&g.asf.n>=1&&g.asf.n<HC_AS_RS&&Number.isInteger(g.asf.n)))delete g.asf;
  // G-HC3: garage level 2 (own2 {itemId: 1}; rim, trail, top: the item in use or '') and day (the date today's drive paid its bonus)
  if(!g.own2||typeof g.own2!='object'||Array.isArray(g.own2))g.own2={};
  for(const k of Object.keys(g.own2))if(!HC_T2.some(t=>t[0]==k))delete g.own2[k];
  for(const kind of HC_T2K){const v=g[kind];if(typeof v!='string'||(v&&!(g.own2[v]&&HC_T2.some(t=>t[0]==v&&t[1]==kind))))g[kind]=''}
  if(typeof g.day!='string')delete g.day;
  // G-MOVES: hop (1 once the Hop's card was seen), bs (the rival runs: {worldId: {n: runs not won, w: wins}})
  if(g.hop!==1)delete g.hop;
  g.bs=GH.bossRec(g.bs,k=>HC_BOSS.some((_,w)=>HCW[w].id===k));
  return g}
const hcBits=n=>(n&1)+(n>>1&1)+(n>>2&1);
const hcStars=id=>hcBits((garageS().st[id])||0);
const hcWStars=w=>HC_ST[w].reduce((a,s)=>a+hcStars(s[0]),0);
const hcTot=()=>HC_ST.reduce((a,_,w)=>a+hcWStars(w),0);
const hcMax=()=>HC_ST.length*HC_SPW*3;
// a world was open in an old save: old level stars there, or its old free-drive distance reached
function hcOldOpen(id){const g=garageS(),lv=g.lv&&g.lv[id];if(Array.isArray(lv)&&lv.some(v=>v>0))return true;const n=HC_OLDNEED[id];return n?Math.max(0,...HCW.map(W=>g.best[W.id]||0))>=n:false}
function hcWOpen(w){if(w==0)return true;const W=HCW[w];if(!W)return false;if(W.dist)return hcWOpen(4);return hcTot()>=HC_NEED[w]||hcOldOpen(W.id)||HC_ST[w].some(s=>hcStars(s[0])>0)}
function hcSOpen(w,i){return hcWOpen(w)&&(i==0||hcStars(HC_ST[w][i-1][0])>0||hcStars(HC_ST[w][i][0])>0)}
/* ---- G-FEEL1: driving help, a dial of 4 levels (HC_AS) in place of the old Easy driving switch. 3 is the old Easy driving, 0 the
   old Easy off. Per level: air (how hard the pedals spin the car in the air), lift (how hard the gas lifts the nose), lvl (the
   car turns itself level in the air; free: more of that while no pedal is held, so Little help rewards letting go in the air),
   wh (a wheelie is eased down), tc (traction control: the gas eases when the nose lifts), soft (crates stay on after a harder
   landing, px/s), ball (balloons float the car over gaps), save (a car tipping onto its back or side, not its roof, is set back
   on its wheels, this many times between checkpoints; not a restart).
   The grown-ups choice (S.garage.as): 'auto' (the default) or a fixed level. Old saves: Easy driving on is Most help (3), off is No
   help (0), never set is Auto (hcAsPick; the old easy field is kept as it was). Auto starts from the grade (hcAsBase), steps down by
   one for each world with HC_AS_DOWN stars or more, and steps up by one (S.garage.asu, at most 3) after HC_AS_CR crashes between two
   checkpoints in a drive or after HC_AS_RS struggling drives in a row on a stage (quit without the flag, or 3 crashes or more,
   S.garage.asf {s: stage id, n}); a clean win (at most one restart) steps it back down by one. ---- */
const HC_AS=[{air:1,lift:1,lvl:0,free:0,wh:0,tc:0,soft:0,ball:0,save:0},
  {air:1,lift:1,lvl:0,free:.07,wh:0,tc:0,soft:60,ball:0,save:1},
  {air:.7,lift:.85,lvl:.02,free:.05,wh:.01,tc:.5,soft:130,ball:1,save:1},
  {air:.35,lift:.6,lvl:.07,free:0,wh:.02,tc:1,soft:200,ball:1,save:1}];
const HC_AS_DOWN=9,HC_AS_CR=3,HC_AS_RS=2;
const hcAsN=v=>Math.max(0,Math.min(3,Math.round(+v||0)));
// the grown-ups choice: 'auto' or 0-3
const hcAsPick=()=>{const g=garageS();return g.as!=null?g.as:g.easy===true?3:g.easy===false?0:'auto'};
// Auto's start: Most help for Pre-K to 2nd grade, Little help for 3rd, none from 4th
const hcAsBase=()=>{const gr=S.grade==null?0:+S.grade;return gr<=2?3:gr==3?1:0};
const hcAsAuto=()=>hcAsN(hcAsBase()-HC_ST.reduce((a,_,w)=>a+(hcWStars(w)>=HC_AS_DOWN),0)+(garageS().asu||0));
const hcAsLevel=()=>{const p=hcAsPick();return p=='auto'?hcAsAuto():p};
// any help on (the menu's switch; the old name kept)
const hcEasy=()=>hcAsLevel()>0;
// after a stage drive (won or quit): Auto's step up after struggling drives in a row on one stage, or down after a clean win; the
// help a drive took on by itself (H.asUp) is kept too. Returns the new step (S.garage.asu).
function hcAsNote(H){const g=garageS();if(!H.st)return g.asu||0;const id=H.st[0],win=H.result=='win';
  let u=(g.asu||0)+(H.asUp||0);
  if(!win||H.crashes>=3){const n=g.asf&&g.asf.s==id?g.asf.n+1:1;if(n>=HC_AS_RS){u++;delete g.asf}else g.asf={s:id,n}}
  else{delete g.asf;if(H.crashes<=1&&!H.asUp)u--}
  if(H.auto){u=Math.max(0,Math.min(3,u));if(u)g.asu=u;else delete g.asu}else delete g.asf;
  return g.asu||0}
// the next thing to do: {w, i (stage or null), t (the line)}
function hcNextGoal(){
  for(let w=0;w<HC_ST.length;w++){if(!hcWOpen(w))continue;for(let i=0;i<HC_SPW;i++){const s=HC_ST[w][i];if(!hcStars(s[0]))return{w,i,t:`Finish ${s[1]} (${HCW[w].n}, stage ${i+1}): ${hcGoalText(s)}.`}}}
  const nw=HCW.findIndex((W,w)=>w<HC_ST.length&&!hcWOpen(w));
  const miss=()=>{for(let w=0;w<HC_ST.length;w++)if(hcWOpen(w))for(let i=0;i<HC_SPW;i++){const s=HC_ST[w][i],b=garageS().st[s[0]]||0;for(let k=0;k<2;k++)if(!(b>>(k+1)&1))return{w,i,s,k}}return null};
  const m=miss();
  if(nw>0){const need=HC_NEED[nw]-hcTot();return{w:m?m.w:0,i:m?m.i:null,t:`Win ${need} more star${need==1?'':'s'} to open ${HCW[nw].n}.`+(m?` Try this one: ${hcMisText(m.s[3][m.k])} on ${m.s[1]}.`:'')}}
  if(m)return{w:m.w,i:m.i,t:`Win every star: ${hcMisText(m.s[3][m.k])} on ${m.s[1]}.`};
  return{w:0,i:null,t:`Every star won! Try a distance drive and beat your best.`}}
const hcGoalText=s=>s[2][0]=='coins'?`collect ${s[2][1]} bolts and reach the flag`:s[2][0]=='cargo'?`carry ${s[2][1]} crates to the flag`:'reach the flag';
const hcMisText=m=>({bolts:`collect ${m[1]} bolts`,time:`reach the flag in ${m[1]} seconds`,flips:m[1]>1?`do ${m[1]} flips`:'do a flip',air:m[1]>1?`get big air ${m[1]} times`:'get big air',perfect:m[1]>1?`land ${m[1]} jumps on both wheels`:'land a jump on both wheels',
  nocrash:'finish with no restarts',crates:'keep every crate on',star:'find the hidden star',stop:'stop at the lookout sign'})[m[0]]||'';
const HC_MIC={bolts:'nut',time:'timer',flips:'rotate',air:'arrow-up',perfect:'check-circle',nocrash:'heart',crates:'gift',star:'star',stop:'eye'};
const HC_GIC={flag:'go',coins:'nut',cargo:'gift'};
// G-HC3 (R-03 A2): garage level 2 opens with stars; the next thing to save for (the cheapest thing not bought yet: a vehicle, an
// upgrade level, paint, then level 2), {name, cost} or {lock: true} when only the closed level 2 is left, or null when all is bought
const hcT2Open=()=>hcTot()>=HC_T2_NEED;
function hcSaveFor(){const g=garageS(),all=[];
  for(const [k,V] of Object.entries(VEH))if(!g.vehs[k])all.push({name:'the '+V.n,cost:V.cost});
  for(const [k,n] of UPG)if(g.up[k]<5)all.push({name:`${n} level ${g.up[k]+1}`,cost:UPCOST[g.up[k]]});
  for(const [c,n,cost] of PAINTS)if(!g.paints[c])all.push({name:n+' paint',cost});
  const t2=hcT2Open();if(t2)for(const [id,,n,cost] of HC_T2)if(!g.own2[id])all.push({name:n,cost});
  if(!all.length)return t2?null:{lock:true};
  return all.sort((a,b)=>a.cost-b.cost)[0]}
function hcSaveLine(){const s=hcSaveFor(),b=garageS().bolts;
  if(!s)return'Everything in the garage is yours!';
  if(s.lock)return`Garage level 2 opens at ${HC_T2_NEED} stars: rims, trails and toppers (you have ${hcTot()}).`;
  return b>=s.cost?`You can buy ${s.name} in the garage now (${s.cost} bolts)!`:`Save for ${s.name}: ${s.cost} bolts, ${s.cost-b} more to go.`}

/* ---- G-HC3 (R-03 H4, A5): today's drive and the daily road. From the date (the same all day, another tomorrow): the distance
   drives get a new road each day (a seed from the date), and today's drive is one open world with a twist and a gold flag to
   reach; the first time it is reached each day it pays HC_DAY_BONUS bolts. A missed day loses nothing; there is no streak.
   The stages stay exactly as they are. */
const HC_DAY_BONUS=30,HC_DAY_M=250;
// twists: [id, label, weather or null]; float = low gravity, jumps = more ramps and gaps, bolts = twice the bolts, fuel = more cans
const HC_TW=[['jumps','Jump day: more ramps and gaps',null],['bolts','Bolt rain: twice the bolts on the road',null],['float','Floaty day: the car is light as a feather',null],
  ['fuel','Fuel party: lots of fuel cans',null],['night','A night drive with headlights','night'],['rain','A drive in the rain','rain'],['dusk','A sunset drive','dusk']];
const hcHash=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619)>>>0;return h};
// the daily road's seed for a world (1 .. 999983)
const hcSeed=(wi,key=today())=>hcHash('hillroad'+key+'/'+wi)%999983+1;
// today's drive: {key, wi, tw (twist id), label, wx, seed, goal (metres), done (bonus paid today)}
function hcDay(key=today()){const h=hcHash('hillday'+key),open=HCW.map((_,w)=>w).filter(w=>hcWOpen(w)),wi=open[h%open.length],W=HCW[wi];
  let t=HC_TW[(h>>>8)%HC_TW.length];
  // weathers that fit the world: no night or rain on the Moon (it is always night there), dust in the desert, ash on the volcano
  if(W.space&&t[2])t=HC_TW[0];
  let wx=t[2],label=t[1];
  if(wx=='rain'&&W.id=='desert'){wx='dust';label='A drive in a dust storm'}else if(wx=='rain'&&W.id=='volcano'){wx='ash';label='A drive in falling ash'}else if(wx=='rain'&&W.id=='snow'){wx='snow';label='A drive in the snow'}
  return{key,wi,tw:t[0],label,wx,seed:hcSeed(wi,key),goal:HC_DAY_M,done:garageS().day===key}}
// pays the bonus once a day when the run reached the gold flag; returns the bolts paid (0 or HC_DAY_BONUS)
function hcDayPay(H){const g=garageS();if(!H.day||!H.dayHit||g.day===H.day.key)return 0;g.day=H.day.key;g.bolts+=HC_DAY_BONUS;return HC_DAY_BONUS}

/* ---- G-MOVES (v188): a new move, the Hop, and a boss per world, the rival run ----
   Hop (opens with HC_HOP_NEED stars): a big button above Gas; with a wheel on the ground both wheels jump up at once (about 4 m high
   in every world: the Moon's low gravity gets a softer push), at most once in HC_HOP_CD s. It helps over rocks, logs and gaps;
   no stage needs it. Space or H on a keyboard. The move card shows once on the menu (S.garage.hop = 1 once seen).
   Rival run (opens when the world's stage 5 has a star): a friendly rival drives the world's own road (stage 3 then stage 5, no
   lookout and no hidden star) at a steady pace and reaches the flag HC_BOSS[w][3] seconds after the start; each run that is not won
   gives the rival HC_BOSS_EASE more time (up to HC_BOSS_MAX runs): hcBossT. Reach the flag first to win; nothing is lost if the
   rival is first, the drive goes on to the flag and the card offers another try. A win pays bolts (more the first time) and puts a
   crown on the world. S.garage.bs {worldId: {n: runs not won, w: wins}}. */
const HC_HOP_NEED=5,HC_HOPV=330,HC_HOP_CD=.6;
const hcHopOpen=()=>hcTot()>=HC_HOP_NEED;
// [name, face, helmet colour, seconds to the flag on the first run (a little under a held-gas drive with Most help on the starter
// truck: the first run wants a clean drive, a hop or an upgrade; the next runs are won by holding Gas), line]
const HC_BOSS=[['Bramble','beaver','g',26.5,'Race me to the flag!'],['Sunny','cat','o',29.5,'Race me over the dunes!'],['Kiki','bird','b',30,'Catch me by the river!'],
  ['Pepper','penguin','c',27.5,'Race me in the snow!'],['Rocky','bear','r',28,'Can you beat me to the top?'],['Luna','owl','v',33.5,'Moon race! Ready?']];
const HC_BOSS_EASE=.15,HC_BOSS_MAX=6,HC_BOSS_PAY=[60,10]; // more time each run not won (share of the first), up to 6 runs; bolts: first win, again
const hcBossId=w=>HCW[w].id;
const hcBossOpen=w=>w<HC_ST.length&&hcWOpen(w)&&hcStars(HC_ST[w][HC_SPW-1][0])>0;
const hcBossRec=w=>garageS().bs[hcBossId(w)]||{n:0,w:0};
const hcBossT=(w,n)=>HC_BOSS[w][3]*(1+HC_BOSS_EASE*Math.min(HC_BOSS_MAX,Math.max(0,n|0)));
const hcBossSt=w=>{const strip=p=>p.replace(/(^|\s)[LS][\d.,]*(?=\s|$)/g,'');return['hb'+w,'Rival run',['flag'],[],HC_ST[w][2][4],strip(HC_ST[w][2][5])+' '+strip(HC_ST[w][HC_SPW-1][5]).replace(/^f12 /,'')]};
// where the rival is at time t: a steady pace from the start line to the flag in T seconds (after a half-second start)
const hcRivalX=(H,t=H.t)=>{const B=H.boss,C=H.C;return 60+(C.fin-60)*Math.min(1,Math.max(0,t-.5)/B.T)};
function hcHop(H,dt){if(!H.hop||H.crashT>0||H.hopT>0||!(H.w1.g||H.w2.g))return false;const v=HC_HOPV*Math.sqrt(HCW[H.wi].g*(H.gm||1)/620);
  for(const p of[H.w1,H.w2]){p.py=p.y-v*dt;p.g=false}H.hopT=HC_HOP_CD;H.hops++;if(H.ui){hcPop('Hop!');HSND.balloon()}return true}
function hcBossMenu(w){const B=HC_BOSS[w],r=hcBossRec(w);
  GH.boss({id:'hill',key:`${HCW[w].n}: rival run`,name:B[0],kind:B[1],hat:'helmet',hue:B[2],line:B[4],goal:`Reach the flag before ${B[0]} does.`,
    prize:`Win: plus ${HC_BOSS_PAY[0]} bolts the first time and a crown.`,won:r.w>0,tries:r.n,easier:`${B[0]} goes a little slower each time you try.`,
    go:`Race ${B[0]}!`,start:()=>hcStart(w,null,null,true),back:()=>{hcMW=w;garage()}})}
// a rival run's record and pay (the drive's own bolts too): won when the flag was reached before the rival; else one more run not won
function hcBossDone(H,why){const gs=garageS(),id=hcBossId(H.wi),r=gs.bs[id]||(gs.bs[id]={n:0,w:0}),won=why=='win'&&!H.boss.lost;
  const first=won&&!r.w,pay=won?HC_BOSS_PAY[first?0:1]:0;if(won)r.w++;else r.n=Math.min(999,r.n+1);gs.bolts+=H.bolts+pay;save();return{won,first,pay}}
function hcBossEnd(H,why){const w=H.wi,B=HC_BOSS[w],{won,first,pay}=hcBossDone(H,why);
  if(why=='quit'){stopHC();return hcLevels(w)}
  won?SFX.fanfare():SFX.chime();if(S.voice)say(won?`You beat ${B[0]}!`:why=='time'?`Game time is up! Let's learn and earn more!`:`${B[0]} won this time. Try again!`);
  const lines=won?[['crown',first?`A crown for ${esc(HCW[w].n)}!`:`You won again!`]]:why=='win'?[['heart',`${esc(B[0])} got there first. Nothing is lost!`],['go',`${esc(B[0])} will go a little slower next time.`]]:[['nut',`Your ${H.bolts} bolts are saved.`]];
  hcCard(H,{win:won,title:won?`You beat ${B[0]}!`:why=='time'?"Game time's up!":`${B[0]} won this time`,pic:GH.faceSVG(B[1],'helmet',B[2]),
    stats:[[Math.round(H.t)+' s','your time','timer'],[Math.round(H.boss.T)+' s',B[0]+"'s time",'go'],['+'+(H.bolts+pay),'bolts','nut']],lines,
    btns:ptLeft()<=0?NAV.end3({next:'hcnext',home:'hchome'}):NAV.end3({again:'hcagain',home:'hchome'})})} // NAV-01: game time up, Next goes to Learn

/* ---- G-HC3 (R-03 A1): music while driving, a calm loop per world made with tone() (the Sky Hop and Star Rally way): only with
   Sound effects and Music on and the truck sounds not off, never in Calm mode; it waits while the drive waits (paused, the
   Pause sheet, hidden, over) and goes quiet under the voice (the shared duck). [melody (MIDI, 0 a rest), bass, step in s] */
const HC_TUNE={
  meadow:[[67,71,74,71,72,0,71,0,69,71,72,74,71,0,67,0],[43,48,50,48],.28],
  desert:[[69,0,72,74,76,74,72,0,69,72,74,0,72,69,67,0],[45,50,52,50],.3],
  jungle:[[64,67,69,0,71,69,67,64,0,67,69,71,72,0,71,0],[40,45,47,45],.26],
  snow:[[76,79,81,0,79,76,74,0,72,74,76,0,74,72,71,0],[48,43,45,43],.32],
  volcano:[[62,65,67,0,69,67,65,62,0,60,62,65,67,0,65,0],[38,41,43,41],.3],
  moon:[[72,0,79,0,76,0,74,72,0,67,0,72,74,0,76,0],[48,43,41,43],.36],
  city:[[69,72,0,74,76,0,74,72,69,0,67,69,72,0,74,0],[45,41,43,45],.25]};
const hcMusicOn=H=>!!(H&&S.sound&&S.music&&!S.calm&&(S.hcSnd||0)<2&&!H.paused&&!H.over&&!(typeof GH!='undefined'&&GH.held)&&!(typeof document!='undefined'&&document.hidden));
function hcMusic(H){const a=typeof AC!='undefined'&&AC;
  if(!hcMusicOn(H)||!a||a.state!='running'){H.mb=0;return}
  const [mel,bass,step]=HC_TUNE[H.w]||HC_TUNE.meadow;
  if(!H.mb||H.mb<a.currentTime)H.mb=a.currentTime+.05;
  while(H.mb<a.currentTime+.15){const i=H.mi=((H.mi||0)+1)%64,n=mel[i%16],t=H.mb-a.currentTime;
    if(n)tone(NOTE(n+(i>=32&&i%4==2?12:0)),step*1.5,t,'triangle',.022);
    if(i%4==0)tone(NOTE(bass[(i>>2)%4]),step*3.6,t,'sine',.032);
    H.mb+=step}}

/* ---- courses: a stage's pieces (or a seeded endless line of them) as heights every 10 px and lists of things ----
   f L flat | u L,H up (eased) | d L,H down | h L,H hill | v L,H dip | w L,H,N rollers | k H kicker jump | p W gap (with its lip)
   b W bridge | o W ford (shallow water) | r N rocks | m L soft ground (the world's mud, sand, ash) | i L ice (m and i do not move on)
   c checkpoint | $N bolts | F fuel can | A balloon (driving help) | S H the hidden star H m up | > boost pad | L W the lookout, a stop
   zone W m long on the road ahead (G-FEEL1: the stop mission). The finish follows the last piece. */
const HC_PX=20,HC_CC={};
function rng(seed){return()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646}}
const hcParse=s=>s.trim().split(/\s+/).map(t=>{const m=t.match(/^([a-zA-Z$>])([\d.,]*)$/);return m?[m[1],...(m[2]?m[2].split(',').map(Number):[])]:null}).filter(Boolean);
function hcCourse(st,wi,endless,ekey){const key=endless?ekey||'E'+wi:st[0];if(HC_CC[key])return HC_CC[key];
  const W=HCW[wi],h=[0],C={key,w:wi,pits:[],fords:[],bridges:[],soft:[],rocks:[],kicks:[],cps:[60],coins:[],fuel:[],balloons:[],stars:[],pads:[],looks:[],fin:null};let y=0;
  const X=()=>(h.length-1)*10,add=(n,f)=>{const y0=y;for(let i=1;i<=n;i++){y=f(i/n,y0);h.push(y)}y=h[h.length-1]};
  const cosE=t=>(1-Math.cos(Math.PI*t))/2;
  for(const [k,a=0,b=0,c=1] of hcParse(endless||st[5])){const n=Math.max(1,Math.round(a*2)),H=b*HC_PX;
    if(k=='f')add(n,(t,y0)=>y0);
    else if(k=='u')add(n,(t,y0)=>y0+H*cosE(t));
    else if(k=='d')add(n,(t,y0)=>y0-H*cosE(t));
    else if(k=='h')add(n,(t,y0)=>y0+H*(1-Math.cos(2*Math.PI*t))/2);
    else if(k=='v')add(n,(t,y0)=>y0-H*(1-Math.cos(2*Math.PI*t))/2);
    else if(k=='w')add(n,(t,y0)=>y0+H*(1-Math.cos(2*Math.PI*c*t))/2);
    else if(k=='k'){const y0=y,Hk=a*HC_PX;add(Math.round((a*2.4+2)*2),t=>y0+Hk*t*t);const x0=X();add(3,t=>y0+Hk*(1-t));C.kicks.push({x0,x1:X()});y=y0;h[h.length-1]=y0}
    else if(k=='p'){const y0=y,D=W.pit=='crater'?190:150;add(16,t=>y0+64*(t*t+t)/2);const x0=X();add(Math.max(2,Math.round(a*2)),()=>y0-D);
      C.pits.push({x0,x1:X(),y:y0,d:D});h[h.length-1]=y0-D;y=y0;add(1,()=>y0);add(6,()=>y0)}
    else if(k=='b'){const x0=X();add(n,(t,y0)=>y0);C.bridges.push({x0,x1:X(),y})}
    else if(k=='o'){const x0=X(),L=a;add(n,(t,y0)=>y0-24*Math.min(1,cosE(Math.min(1,t*L/2.5)),cosE(Math.min(1,(1-t)*L/2.5))));C.fords.push({x0,x1:X(),y:y-7})}
    else if(k=='r'){for(let i=0;i<a;i++){const x0=X(),Hr=(.75+.3*((i*7+h.length)%3))*HC_PX;add(5,(t,y0)=>y0+Hr*Math.sin(Math.PI*t));C.rocks.push({x0,x1:X(),h:Hr,y});add(4,(t,y0)=>y0)}}
    else if(k=='m'||k=='i')C.soft.push({x0:X(),x1:X()+a*HC_PX,k:k=='i'?'ice':W.soft||'mud'});
    else if(k=='c')C.cps.push(X());
    else if(k=='$')for(let j=0;j<a;j++)C.coins.push({x:X()+j*32});
    else if(k=='F')C.fuel.push(X());
    else if(k=='A')C.balloons.push(X());
    else if(k=='S')C.stars.push({x:X(),hm:a});
    else if(k=='>')C.pads.push(X())
    else if(k=='L')C.looks.push({x0:X(),x1:X()+(a||5)*HC_PX})}
  if(!endless){C.fin=X();add(80,(t,y0)=>y0)}
  C.n=h.length;C.h=Float32Array.from(h);
  // per sample: 1 gap, 2 ford, 4 bridge; soft kind index into HC_SK (0 none)
  C.fl=new Uint8Array(C.n);C.sk=new Uint8Array(C.n);
  const mark=(list,bit)=>{for(const f of list)for(let i=Math.max(0,Math.floor(f.x0/10));i<=Math.min(C.n-1,Math.ceil(f.x1/10));i++)C.fl[i]|=bit};
  mark(C.pits,1);mark(C.fords,2);mark(C.bridges,4);
  for(const s of C.soft)for(let i=Math.max(0,Math.floor(s.x0/10));i<=Math.min(C.n-1,Math.ceil(s.x1/10));i++)if(!(C.fl[i]&1))C.sk[i]=HC_SK.indexOf(s.k);
  for(const o of C.coins){const p=C.pits.find(q=>o.x>=q.x0-40&&o.x<=q.x1+40);o.y=p?p.y+70+50*Math.sin(Math.PI*Math.max(0,Math.min(1,(o.x-p.x0+40)/(p.x1-p.x0+80)))):hcH(C,o.x)+44}
  for(const s of C.stars)s.y=hcH(C,s.x)+s.hm*HC_PX;
  C.coins.sort((a,b)=>a.x-b.x);
  return HC_CC[key]=C}
const HC_SK=['','mud','sand','ice','ash','oil'];
function hcH(C,x){const i=x/10;if(i<=0)return C.h[0];if(i>=C.n-1)return C.h[C.n-1];const i0=Math.floor(i),f=i-i0;return C.h[i0]+(C.h[i0+1]-C.h[i0])*f}
const hcIx=(C,x)=>Math.max(0,Math.min(C.n-1,Math.round(x/10)));
const hcSlope=(C,x)=>Math.atan((hcH(C,x+20)-hcH(C,x-20))/40);
// the ground to land on (a gap counts as its banks): the car in the air turns to match this
const hcHL=(C,x)=>{const p=C.fl[hcIx(C,x)]&1?C.pits.find(q=>x>=q.x0-10&&x<=q.x1+10):null;if(!p)return hcH(C,x);const a=hcH(C,p.x0-10),u=Math.max(0,Math.min(1,(x-p.x0+10)/(p.x1-p.x0+20)));return a+(p.y-a)*u};
const hcSlopeL=(C,x,d=40)=>Math.atan((hcHL(C,x+d)-hcHL(C,x-d))/(2*d));
const hcPitAt=(C,x)=>C.fl[hcIx(C,x)]&1?C.pits.find(p=>x>=p.x0-10&&x<=p.x1+10):null;
const hcFordAt=(C,x)=>C.fl[hcIx(C,x)]&2?C.fords.find(p=>x>=p.x0&&x<=p.x1):null;
const hcSoftAt=(C,x)=>{const k=C.sk[hcIx(C,x)];return k?SOFT[HC_SK[k]]:null};
// the distance drive: 4 km of seeded pieces per world, harder as it goes, fuel cans further apart, a checkpoint every 100 m
// seed: 0 the old fixed road, else the day's road (hcSeed); tw: today's twist (jumps: more ramps and gaps, bolts: twice the bolts,
// fuel: cans closer together); the same seed and twist always build the same road
function hcEndless(wi,seed=0,tw=''){const key='E'+wi+(seed||tw?'/'+seed+'/'+tw:'');if(HC_CC[key])return HC_CC[key];const W=HCW[wi],r=rng(seed?seed:4242+wi*977),p=['f16 $5'];let d=16,nf=110,nc=100;
  const R=(a,b)=>a+r()*(b-a),jumps=tw=='jumps',fuel=tw=='fuel',nb=tw=='bolts'?2:1;
  while(d<4000){const lv=Math.min(1,d/2500);let t=r(),s,L;
    if(jumps&&t>=.68&&r()<.5)t=.52+r()*.16;
    if(d>=nc){p.push('c');nc+=100}
    if(d>=nf){p.push('F');nf+=fuel?60+d*.03:120+d*.07}
    if(t<.28){L=Math.round(R(30,60));s=`h${L},${R(2,3.5+lv*3).toFixed(1)}`}
    else if(t<.42){L=Math.round(R(40,70));s=`w${L},${R(1,1.6+lv).toFixed(1)},${Math.round(R(2,4))}`}
    else if(t<.52){L=Math.round(R(26,40));s=`${r()<.5?'u':'d'}${L},${R(2,3+lv*3).toFixed(1)}`}
    else if(t<.6){s=`k${R(2.5,3+lv).toFixed(1)}`;L=12}
    else if(t<.68&&d>150){s=`p${Math.round(R(4,5+lv*2))}`;L=16}
    else if(t<.74){s=`r${Math.round(R(2,4))}`;L=24}
    else if(t<.84&&W.soft){L=Math.round(R(16,30));s=`m${L} f${L}`}
    else if(t<.9&&W.pit=='water'){L=Math.round(R(14,24));s=r()<.5?`b${L}`:`o${L}`}
    else{L=Math.round(R(8,18));s='f'+L}
    p.push(s,'$'+Math.round(R(3,6))*nb,'f'+Math.round(R(6,12)));d+=L+9}
  const C=hcCourse(null,wi,p.join(' '),key);C.endless=1;return C}

/* ---- the simulation (no page needed): hcNew makes a run, hcStep moves it 1/120 s ---- */
// o: veh, up (upgrades), as (driving help 0-3; G-FEEL1) or easy (true: as 3, the old switch), auto (Auto may turn the help up during the drive), ui (true: messages, sounds and the end card), paint; G-HC3: seed (the day's road of a distance
// drive), day (today's drive, hcDay: its road, twist and gold flag)
function hcNew(wi,si,o={}){const st=o.boss?hcBossSt(wi):si==null?null:HC_ST[wi][si],day=st?null:o.day||null,C=st?hcCourse(st,wi):day?hcEndless(wi,day.seed,day.tw):hcEndless(wi,o.seed||0),sp=hcSpec(o.veh||'jeep',o.up),x0=60,
  y1=hcH(C,x0)+sp.R+2,y2=hcH(C,x0+sp.L)+sp.R+2,crates=st&&st[2][0]=='cargo'?st[2][1]:0,as=hcAsN(o.as!=null?o.as:o.easy?3:0);
  return Object.assign(sp,{wi,w:HCW[wi].id,st,si,C,veh:o.veh||'jeep',as,A:HC_AS[as],auto:!!o.auto,asUp:0,cpCr:0,saves:HC_AS[as].save,saved:0,stopT:0,stopped:false,easy:as>=2,ui:!!o.ui,tankSec:sp.tankSec*(st?1.5:1),fuel:100,
    w1:{x:x0,y:y1,px:x0,py:y1,rot:0,g:true},w2:{x:x0+sp.L,y:y2,px:x0+sp.L,py:y2,rot:0,g:true},gas:false,brake:false,
    bolts:0,maxX:x0,cp:x0,cpi:0,cpCrates:crates,crates,crates0:crates,crashT:0,safeT:0,stuckT:0,lockT:o.ui?1:0,over:false,result:null,
    took:new Set(),ci:0,t:0,air:0,airRot:0,lastAng:Math.atan2(y2-y1,sp.L),flips:0,perfect:0,airs:0,wheelieT:0,wheelies:0,crashes:0,
    wasAir:false,slip:0,bob:0,bobV:0,combo:0,comboT:0,parts:[],pops:[],g1t:-1,g2t:-1,ballT:0,boostT:0,gotStar:false,speed:0,best:0,why:'',
    day,dayX:day?60+day.goal*HC_PX:null,dayHit:false,gm:day&&day.tw=='float'?.62:1,
    hop:!!o.hop,hopT:0,hops:0,hopQ:0,boss:o.boss?{T:hcBossT(wi,o.boss.n),n:o.boss.n|0,lost:false}:null})} // G-MOVES
function rotPts(H,a){const c=Math.cos(a),s=Math.sin(a),cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2;for(const p of[H.w1,H.w2]){const dx=p.x-cx,dy=p.y-cy;p.x=cx+dx*c-dy*s;p.y=cy+dx*s+dy*c}}
const hcAng=H=>Math.atan2(H.w2.y-H.w1.y,H.w2.x-H.w1.x);
const hcAV=H=>{let d=hcAng(H)-Math.atan2(H.w2.py-H.w1.py,H.w2.px-H.w1.px);if(d>Math.PI)d-=2*Math.PI;if(d<-Math.PI)d+=2*Math.PI;return d};
const hcWrap=a=>{while(a>Math.PI)a-=2*Math.PI;while(a<-Math.PI)a+=2*Math.PI;return a};
function hcStep(H,dt){const C=H.C,Wd=HCW[H.wi],R=H.R,L=H.L,w=[H.w1,H.w2],A=H.A,ui=H.ui;
  H.t+=dt;H.bobV+=(-H.bob*260-H.bobV*(14+H.susp*4))*dt;H.bob+=H.bobV*dt;
  if(H.crashT>0){H.crashT-=dt;hcParts(H,dt);if(H.crashT<=0)hcRespawn(H);return}
  if(H.hopT>0)H.hopT-=dt;if(H.hopQ){H.hopQ=0;hcHop(H,dt)} // G-MOVES: the Hop
  if(H.boss&&!H.boss.lost&&H.t-.5>=H.boss.T){H.boss.lost=true;if(ui){hcMsg(`${HC_BOSS[H.wi][0]} is at the flag! Keep going!`,2200)}}
  if(H.lockT>0)H.lockT-=dt;if(H.boostT>0)H.boostT-=dt;if(H.comboT>0){H.comboT-=dt;if(H.comboT<=0)H.combo=0}
  if(H.ballT>0){H.ballT-=dt;if(H.ballT<=0&&ui)hcPop('Pop!')}
  const ang0=hcAng(H),cx0=(H.w1.x+H.w2.x)/2,err0=hcWrap(ang0-hcSlopeL(C,cx0,20));
  let gas=H.gas&&H.fuel>0&&H.lockT<=0;const brk=H.brake||H.lockT>0;
  // driving help (A, HC_AS), traction control: the nose lifting off the ground eases the gas
  let tc=1;if(A.tc&&gas&&H.w1.g&&err0>.2)tc=1-(1-Math.max(.15,1-(err0-.2)*3.5))*A.tc;
  const g=Wd.g*(H.ballT>0?.3:1)*(H.gm||1),boost=H.boostT>0;
  if(H.ballT>0&&H.ballT<2&&H.w1.g&&H.w2.g&&!hcPitAt(C,cx0+H.L))H.ballT=.01; // the balloons pop once the car is down past the gap
  for(const p of w){const vx=(p.x-p.px)*.9994,vy=(p.y-p.py)*.9994;p.px=p.x;p.py=p.y;p.x+=vx+(H.ballT>0&&H.gas?60*dt*dt:0);p.y+=vy-g*dt*dt}
  for(let i=0;i<4;i++){const dx=H.w2.x-H.w1.x,dy=H.w2.y-H.w1.y,d=Math.hypot(dx,dy)||1,f=(d-L)/d*.5;H.w1.x+=dx*f;H.w1.y+=dy*f;H.w2.x-=dx*f;H.w2.y-=dy*f}
  let ground=0,landV=0;H.slip=0;let wet=false;
  for(const p of w){let gy=hcH(C,p.x);const was=p.g;p.g=false;
    if(gy+R-p.y>30){const dx=p.x-p.px;p.x=p.px-dx*.3;gy=hcH(C,p.x)}
    if(p.y<gy+R&&gy+R-p.y<=30){const vyIn=(p.y-p.py)/dt;p.y=gy+R;p.g=true;ground++;if(!was){landV=Math.max(landV,-vyIn);if(p===H.w1)H.g1t=H.t;else H.g2t=H.t}
      const s=(hcH(C,p.x+1)-hcH(C,p.x-1))/2,l=Math.hypot(1,s),tx=1/l,ty=s/l,soft=hcSoftAt(C,p.x),ford=hcFordAt(C,p.x);
      let vt=(p.x-p.px)*tx+(p.y-p.py)*ty;
      const grip=soft?H.grip*soft.grip/.9+H.tireUp*.03:H.grip,tg=Wd.g==250?430:Wd.g,trac=grip*tg*1.5*tx+Wd.g*Math.max(0,-ty)*1.1,acc=H.acc*tc*(boost?1.4:1),a=Math.min(acc,trac)*dt*dt;
      const top=H.maxV*(boost?1.35:1)*(soft&&soft.drag<1?.6:1)*(ford?.55:1);
      if(gas){vt=Math.min(vt+a,Math.max(vt,top*dt));if(acc>trac)H.slip+=.5}
      else if(brk)vt=vt>0?Math.max(0,vt-Math.min(H.acc*1.4,trac*1.2)*dt*dt):Math.max(vt-a*.55,-H.maxV*dt*.4);
      else vt*=soft?soft.drag*.999:.997;
      if(soft&&soft.drag<1)vt*=soft.drag;
      if(ford){vt*=.995;wet=true}
      for(const px of C.pads)if(p.x>=px&&p.x<=px+60&&H.boostT<=0){H.boostT=.9;if(ui){hcPop('Zoom!');HSND.trick(1)}}
      p.px=p.x-tx*vt;p.py=p.y-ty*vt;p.rot+=vt/R*(gas&&H.acc>trac?1.6:1)}
    else p.rot+=(p.x-p.px)/R*.99}
  if(landV>200){H.bobV+=Math.min(landV,900)*.06/(1+H.susp*.15);if(landV>380&&ui)HSND.land(landV)}
  if(H.crates&&landV>H.drop+A.soft&&H.safeT<=0)hcCrate(H);
  let tq=0;const ang=hcAng(H),cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2,slopeB=hcSlopeL(C,cx,20);
  if(ground==0){tq=((gas?4.6:0)-(brk?4.6:0))*A.air;H.air+=dt}
  else{if(gas&&H.w1.g)tq+=H.lift*(H.w2.g?1:.8)*tc*A.lift;if(brk&&H.w2.g)tq-=3.2}
  if(tq)rotPts(H,tq*dt*dt);
  const av=hcAV(H),err=hcWrap(ang-(ground?slopeB:hcSlopeL(C,cx)));
  // in the air with no pedal the spin slows; driving help turns the car to match the ground below (and eases a wheelie down)
  if(ground==0&&!gas&&!brk)rotPts(H,-av*.012);
  const lv=A.lvl+(gas||brk?0:A.free);if(ground==0&&lv)rotPts(H,(-err*2.6*dt-av)*lv);
  if(ground&&A.wh&&H.w1.g&&!H.w2.g&&err>.3)rotPts(H,-(err-.3)*A.wh);
  // suspension: a landing's bounce is soaked up (better suspension, less spin left after touching down)
  if(ground&&H.wasAir)rotPts(H,-av*(.25+H.susp*.1));
  let da=ang-H.lastAng;if(da>Math.PI)da-=2*Math.PI;if(da<-Math.PI)da+=2*Math.PI;H.lastAng=ang;
  if(ground==0)H.airRot+=da;
  if(ground==0&&!H.wasAir)rotPts(H,-av*.75);
  if(ground==2&&H.air>0){const fl=Math.round(Math.abs(H.airRot)/(2*Math.PI)-.15),airT=H.air;
    if(fl>=1){H.flips+=fl;hcTrick(H,`${H.airRot>0?'Backflip':'Front flip'}${fl>1?' x'+fl:''}`,10*fl);if(ui){hcBuzz(15);if(S.voice)say(H.airRot>0?'Backflip!':'Front flip!')}}
    else if(airT>.8){H.airs++;hcTrick(H,'Big air',Math.min(8,Math.round(airT*2)))}
    if(airT>.6&&Math.abs(H.g1t-H.g2t)<.14&&Math.abs(err)<.2){H.perfect++;hcTrick(H,'Perfect landing',3)}
    if(landV>520&&!H.calm)H.shake=.25;H.air=0;H.airRot=0}
  H.wasAir=ground==0;
  if(H.w1.g&&!H.w2.g&&err>.25){H.wheelieT+=dt;if(H.wheelieT>=2&&H.wheelieT-dt<2){H.wheelies++;hcTrick(H,'Wheelie',4)}}else H.wheelieT=0;
  const hr=48*(H.R/21)+(H.veh=='monster'?10:0),hx=cx-Math.sin(ang)*hr,hy=cy+Math.cos(ang)*hr,pit=hcPitAt(C,cx);
  if(H.safeT>0)H.safeT-=dt;
  else if(pit&&cy<pit.y-pit.d*.45)return hcCrash(H,'pit');
  else if(hy<hcH(C,hx)+5||(Math.abs(err)>2.4&&ground)){const why=hcPitAt(C,hx)||hcPitAt(C,cx+50)?'pit':'flip';
    // driving help: a car tipping onto its back or side (not on its roof) is set back on its wheels, once between checkpoints
    if(why=='flip'&&H.saves>0&&Math.abs(err)<2.95)return hcSave(H,cx);
    return hcCrash(H,why)}
  // stuck on its end (leaning on a wall, nose up or down): after 1.5 s it counts as a flip
  H.tiltT=ground<2&&Math.abs(err)>1.1&&H.speed<60?(H.tiltT||0)+dt:0;if(H.tiltT>1.5){H.tiltT=0;return hcCrash(H,'flip')}
  H.fuel=Math.max(0,H.fuel-dt*100/H.tankSec*(gas?1:.25));
  if(cx>H.maxX)H.maxX=cx;
  if(H.dayX&&!H.dayHit&&cx>=H.dayX){H.dayHit=true;if(ui){HSND.star();hcPop(H.day.done?"Today's flag!":`Today's flag! Plus ${HC_DAY_BONUS} bolts`)}}
  if(C.fin!=null&&cx>=C.fin){H.over=true;H.result='win';return}
  if(ui&&H.best>20&&!H.passedBest&&(cx-60)/20>H.best){H.passedBest=true;hcPop('New record!');SFX.fanfare()}
  // checkpoints: a flip or an empty tank starts again here (crates as they were)
  while(H.cpi+1<C.cps.length&&cx>=C.cps[H.cpi+1]){H.cpi++;H.cp=C.cps[H.cpi];H.cpCrates=Math.max(1,H.crates);H.saves=A.save;H.cpCr=0;
    if(C.endless)H.bolts+=5;if(ui){HSND.cp(H.cpi);hcMsg(C.endless?`${Math.round((H.cp-60)/20)} m! Plus 5 bolts`:'Checkpoint! A flip starts again here.',1600)}}
  for(let k=0;k<C.fuel.length;k++){const fx=C.fuel[k];if(Math.abs(fx-cx)<60&&!H.took.has('f'+k)){H.took.add('f'+k);H.fuel=100;if(ui){HSND.fuel();hcPop('Full tank!')}}}
  if(A.ball)for(let k=0;k<C.balloons.length;k++){const bx=C.balloons[k];if(Math.abs(bx-cx)<70&&!H.took.has('a'+k)&&H.crashT<=0){H.took.add('a'+k);H.ballT=2.6;if(ui){HSND.balloon();hcPop('Balloons! Float over!')}}}
  for(let k=0;k<C.stars.length;k++){const s=C.stars[k];if(!H.took.has('s'+k)&&Math.abs(s.x-cx)<50&&Math.abs(s.y-cy)<45){H.took.add('s'+k);H.gotStar=true;H.bolts+=10;if(ui){HSND.star();hcPop('You found the star!')}}}
  // the lookout: stopped on it (both wheels down, hardly moving) for 0.4 s
  if(!H.stopped&&C.looks.length){const z=C.looks.find(q=>cx>=q.x0&&cx<=q.x1);if(z&&ground==2&&Math.hypot(H.w1.x-H.w1.px,H.w1.y-H.w1.py)/dt<15){H.stopT+=dt;if(H.stopT>=.4){H.stopped=true;H.bolts+=5;if(ui){HSND.star();hcPop('What a view! Plus 5')}}}else H.stopT=0}
  while(H.ci<C.coins.length&&C.coins[H.ci].x<cx-90)H.ci++;
  for(let j=H.ci;j<C.coins.length&&C.coins[j].x<cx+90;j++){const o=C.coins[j];if(H.took.has(j))continue;if(Math.abs(o.x-cx)<46&&Math.abs(o.y-cy)<62){H.took.add(j);H.bolts+=C.endless?1+Math.floor(o.x/10000):1;if(ui){HSND.coin(H);H.pops.push({x:o.x,y:o.y,l:.7})}}}
  const sp=Math.hypot(H.w1.x-H.w1.px,H.w1.y-H.w1.py)/dt;H.speed=sp;
  if(H.fuel<=0){if(sp<25&&ground)H.stuckT+=dt;else H.stuckT=0;if(H.stuckT>1.4){if(C.endless){H.over=true;H.result='fuel';return}H.why='fuel';H.crashes++;H.crashT=.9;if(ui){hcMsg('Out of gas! Back to the checkpoint with a full tank.',2200);if(S.voice)say('Out of gas! Here is a full tank.')}return}}
  if(ui)hcFx(H,gas,ang,cx,cy,sp,wet);
  hcParts(H,dt)}
function hcParts(H,dt){const g=HCW[H.wi].g;for(const d of H.parts){d.x+=d.vx*dt;d.y+=d.vy*dt;d.vy-=g*dt*d.g;d.l-=dt}H.parts=H.parts.filter(d=>d.l>0);if(H.parts.length>160)H.parts.splice(0,H.parts.length-160);
  for(const p of H.pops){p.l-=dt;p.y+=60*dt}H.pops=H.pops.filter(p=>p.l>0)}
// dust, smoke, splashes and the engine note (only on screen)
function hcFx(H,gas,ang,cx,cy,sp,wet){const C=H.C,Wd=HCW[H.wi],soft=hcSoftAt(C,H.w1.x);
  if(H.eng){const t=ac().currentTime,band=H.maxV/4,gear=Math.min(3,Math.floor(sp/band)),inG=Math.min(1,(sp-gear*band)/band);if(gear!=H.gear){if(gear>(H.gear||0))HSND.shift();H.gear=gear}const f=H.eng.base*(1+inG*.9+gear*.12)+(gas?H.eng.base*.25:0)+H.slip*30;H.eng.o.frequency.setTargetAtTime(f,t,.05);H.eng.o2.frequency.setTargetAtTime(f/2,t,.05);H.eng.g.gain.setTargetAtTime(gas?.032:.014,t,.12);H.eng.f.frequency.setTargetAtTime(gas?650+inG*300:340,t,.1)}
  if(H.parts.length>120)return;
  if(gas&&H.w1.g&&Math.random()<(.22+H.slip*.5))H.parts.push({x:H.w1.x-14,y:hcH(C,H.w1.x)+6,vx:-60-Math.random()*120,vy:60+Math.random()*120,l:.7,c:soft?soft.c2:Wd.dirt,s:4+Math.random()*4,g:1});
  if(gas&&Math.random()<.3)H.parts.push({x:cx-Math.cos(ang)*64,y:cy-Math.sin(ang)*64+30,vx:-20,vy:20,l:.8,c:'e',s:6,g:-.2,smoke:1});
  if(H.trail&&sp>40&&Math.random()<.08){const d=hcTrailBit(H.trail,H.tri=(H.tri||0)+1);H.parts.push({x:cx-Math.cos(ang)*58+Math.sin(ang)*20,y:cy-Math.sin(ang)*58+20,vx:-30-Math.random()*40,vy:30+Math.random()*50,l:.9,c:d.c,s:d.s,g:d.g,star:d.star})}
  if(wet&&sp>60&&Math.random()<.5)H.parts.push({x:H.w2.x+10,y:cy-10,vx:-40+Math.random()*120,vy:120+Math.random()*120,l:.6,c:'c1',s:4,g:1})}
function hcTrick(H,name,b){H.combo=H.comboT>0?H.combo+1:1;H.comboT=4;const mult=Math.min(4,H.combo),got=b*mult;H.bolts+=got;if(!H.ui)return;hcPop(`${name}! Plus ${got}`);
  const c=$('#hcc');if(c){c.textContent=mult>1?`Combo x${mult}`:'';c.classList.toggle('on',mult>1)}HSND.trick(mult)}
function hcCrate(H){if(!H.crates)return;H.crates--;if(H.ui){const cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2;for(let i=0;i<10;i++)H.parts.push({x:cx-20,y:cy+40,vx:(Math.random()-.5)*300,vy:150+Math.random()*250,l:1,c:['n','n2','y'][i%3],s:4+Math.random()*4,g:1});SFX.hit();
  hcPop(H.crates?`A crate fell off! ${H.crates} left`:'All the crates fell off!')}
  if(!H.crates&&H.crashT<=0){H.crashT=1.2;H.crashes++;H.why='cargo';if(H.ui)hcMsg('Back to the checkpoint to load up again. Land softly!',2400)}}
// R-03 A4: a short buzz on a crash and on landing a flip (buzz() in 10-sfx.js: the Grown-ups Buzz switch, never in Calm mode)
const hcBuzz=ms=>{try{if(typeof buzz=='function')buzz(ms)}catch(e){}};
// driving help: set back on the wheels where the car is, slowly (not a restart: no crash counted)
function hcSave(H,cx){const C=H.C,x=Math.max(H.cp,cx-H.L/2),y=hcH(C,x)+H.R+2,y2=hcH(C,x+H.L)+H.R+2;H.saves--;H.saved++;
  Object.assign(H.w1,{x,y,px:x,py:y,g:true});Object.assign(H.w2,{x:x+H.L,y:y2,px:x+H.L,py:y2,g:true});
  H.safeT=.6;H.air=0;H.airRot=0;H.wasAir=false;H.lastAng=Math.atan2(y2-y,H.L);H.tiltT=0;H.combo=0;
  if(H.ui){hcBuzz(15);hcMsg('Whoops! Back on the wheels. Ease off the gas on steep hills.',2000)}}
function hcCrash(H,why){if(H.crates)hcCrate(H);H.crashT=1.5;H.crashes++;
  // Auto driving help: several crashes between two checkpoints turn the help up by one for the rest of the drive
  if(H.auto&&H.as<3&&++H.cpCr>=HC_AS_CR){H.as++;H.A=HC_AS[H.as];H.asUp++;H.cpCr=0;H.saves=Math.max(H.saves,H.A.save);if(H.ui)hcPop('More driving help on!')}H.why=why;H.combo=0;if(!H.calm)H.shake=.4;if(!H.ui)return;hcBuzz(25);
  const cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2,pk=HCW[H.wi].pit;
  if(why=='pit'&&pk!='crater'){pk=='lava'?(hs()&&(noise(.5,0,.3,400,100),tone(90,.4,0,'sawtooth',.1,40))):HSND.crash(1);for(let i=0;i<26;i++)H.parts.push({x:cx,y:cy,vx:(Math.random()-.5)*320,vy:150+Math.random()*260,l:1,c:pk=='lava'?['o','y','r'][i%3]:'c1',s:5+Math.random()*4,g:1})}
  else{HSND.crash();for(let i=0;i<12;i++)H.parts.push({x:cx,y:cy+20,vx:(Math.random()-.5)*260,vy:120+Math.random()*200,l:1,c:'y',s:5,g:.6,star:1})}
  hcMsg(why=='pit'?(pk=='lava'?'Too hot! Go fast up the ramp to jump the lava.':pk=='crater'?'Into the crater! Go faster up the ramp.':'Splash! Go fast up the ramp to jump the water.')+' Back to the checkpoint.':'Flipped! Ease off the gas on steep hills. Back to the checkpoint.',2200);
  if(S.voice)say(why=='pit'?'Splash! Go faster to jump!':'Oops! Ease off the gas!')}
function hcRespawn(H){const R=H.R,x=H.cp,C=H.C,y=hcH(C,x)+R+4,y2=hcH(C,x+H.L)+R+4;Object.assign(H.w1,{x,y,px:x,py:y,g:true});Object.assign(H.w2,{x:x+H.L,y:y2,px:x+H.L,py:y2,g:true});
  H.stuckT=0;H.safeT=1.2;H.air=0;H.airRot=0;H.wasAir=false;H.lastAng=Math.atan2(y2-y,H.L);H.ballT=0;H.boostT=0;H.bob=0;H.bobV=0;
  if(H.why=='fuel'||H.fuel<30)H.fuel=H.why=='fuel'?100:30;if(H.crates0)H.crates=Math.max(H.crates,H.cpCrates);H.why='';
  // a balloon used before this checkpoint can be taken again
  for(let k=0;k<C.balloons.length;k++)if(C.balloons[k]>x)H.took.delete('a'+k)}
// the result of a finished stage: bits (1 goal, 2 mission 1, 4 mission 2)
function hcBitsOf(H){const s=H.st;if(!s||H.result!='win')return 0;const g=s[2];let b=0;
  if(g[0]=='flag'||(g[0]=='coins'&&H.bolts>=g[1])||(g[0]=='cargo'&&H.crates>=1))b|=1;
  s[3].forEach((m,k)=>{const ok={bolts:H.bolts>=m[1],time:H.t<=m[1],flips:H.flips>=m[1],air:H.airs>=m[1],perfect:H.perfect>=m[1],nocrash:H.crashes==0,crates:H.crates0>0&&H.crates==H.crates0,star:H.gotStar,stop:H.stopped}[m[0]];if(ok)b|=2<<k});
  return b}
// save a finished stage: new stars pay bolts (more in later worlds); returns {bits, old, gain, opened: [lines]}
function hcBank(H){const gs=garageS(),id=H.st?H.st[0]:null,bits=hcBitsOf(H),old=id?gs.st[id]||0:0,wasW=HCW.map((_,w)=>hcWOpen(w)),nxt=H.st&&H.si+1<HC_SPW?hcSOpen(H.wi,H.si+1):true;
  const fresh=bits&~old,gain=hcBits(fresh)*(8+4*H.wi);if(id&&bits)gs.st[id]=old|bits;gs.bolts+=H.bolts+gain;if(id){H.noted=1;hcAsNote(H)}
  const opened=[];HCW.forEach((W,w)=>{if(!wasW[w]&&hcWOpen(w))opened.push(W.n)});
  const nextOpen=H.st&&H.si+1<HC_SPW&&!nxt&&hcSOpen(H.wi,H.si+1)?HC_ST[H.wi][H.si+1][1]:null;
  return{bits,old,gain,opened,nextOpen}}

/* ---- playing: the screen, pedals, the loop, game time ---- */
function stopHC(){for(const e of document.querySelectorAll('.nv-light'))if(e.stop)e.stop(); // G-FEEL2: a light end banner left open
  if(!HC)return;
  // G-FEEL1: a stage drive left without the flag after a while counts for Auto driving help (hcAsNote)
  if(HC.st&&HC.result!='win'&&!HC.noted&&HC.t>=8){HC.noted=1;hcAsNote(HC);save()}cancelAnimationFrame(HC.raf);if(HC.eng){try{HC.eng.lfo&&HC.eng.lfo.stop();HC.eng.o.stop();HC.eng.o2.stop()}catch(e){}}removeEventListener('keydown',HC.kd);removeEventListener('keyup',HC.ku);if(HC.gl){GLX.end(HC.gl.R);HC.gl.off=true}if(typeof FPS!='undefined')FPS.tag=''; // GL-01: its WebGL context goes at once (a tablet keeps only a few)
  HC=null}
const HC_SNDI=['sound-on','music','sound-off']; // P4-16: the sound button's icon for S.hcSnd (all, no engine, off)
const hcCalm=()=>{try{return document.documentElement.classList.contains('calm')||matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}};
// fixed steps of 1/120 s (G-HC3, R-03 H1): a slow frame (up to 0.1 s) runs more steps, so a slow tablet never plays in slow motion;
// returns the steps run
function hcAdvance(H,dt){H.acu=(H.acu||0)+Math.min(.1,Math.max(0,dt));let n=0;
  while(!H.over&&H.acu>=1/120-1e-9&&n<12){hcStep(H,1/120);H.acu-=1/120;n++}
  H.acu=Math.min(H.acu,1/120);return n}
// world index (a number or an old place name like 'meadow'); si: a stage of that world, or none for the distance drive (today's
// road); day: today's drive (hcDay) instead of the distance drive
function hcStart(world,si,day,boss){const wi=typeof world=='number'?world:Math.max(0,HCW.findIndex(W=>W.id==world)),gs=garageS();
  if(si!=null&&!HC_ST[wi])si=null;if(si!=null)day=null;if(boss&&!hcBossOpen(wi))boss=false;if(boss){si=null;day=null}
  const H=hcNew(wi,si,{veh:gs.veh,up:gs.up,as:hcAsLevel(),auto:hcAsPick()=='auto',ui:true,seed:hcSeed(wi),day,hop:hcHopOpen(),boss:boss?{n:hcBossRec(wi).n}:null}),st=H.st,C=H.C;H.calm=hcCalm();H.paint=hcC(gs.paint)||hcC('r');H.best=st||day?0:gs.best[H.w];
  H.wx=st?st[4]:day&&day.wx||'day';H.rim=gs.rim;H.top=gs.top;H.trail=gs.trail;
  const ticks=st?C.cps.slice(1).map(x=>`<i class="hc-tick" style="left:${(x/C.fin*100).toFixed(1)}%"></i>`).join(''):'';
  view(`<div class="hc" id="hc"><canvas id="hcv"></canvas>
   ${GH.top('hill',{play:true,hud:true,sub:H.boss?`${HCW[wi].n}: race ${HC_BOSS[wi][0]}`:st?`${HCW[wi].n}, stage ${si+1}: ${st[1]}`:day?`Today's drive: ${HCW[wi].n}`:`${HCW[wi].n}, distance drive`,timeId:'hct',
    chips:`<span class="stat gh-nut" aria-label="Bolts">${ico('nut',32)}<b id="hcb">0</b></span>`,sound:GH.tool(HC_SNDI[S.hcSnd||0],'Sound','hcsnd')})}
   <div class="hc-hud2"><div class="hc-fuel" id="hcfuel" role="img" aria-label="Fuel">${ico('drop',28)}<span class="hc-gauge"><i id="hcf"></i></span></div>
   <div class="hc-prog"><b id="hcd">0 m</b><span class="hc-track"><i id="hcpb"></i>${ticks}<i class="hc-bestm" id="hcbest"></i>${H.boss?'<i class="hc-rv" id="hcrv"></i>':''}</span></div></div>
   <div class="pedal brake" id="pb">${ico('chevron-left',48)}<small>Brake</small></div><div class="pedal gas" id="pg">${ico('chevron-right',48)}<small>Gas</small></div>
   ${H.hop?`<button class="hc-hop" id="hchop" aria-label="Hop">${ico('arrow-up',40)}<small>Hop</small></button>`:''}
   <div class="hcmsg" id="hcm" role="status"></div><div class="hcpop" id="hcp" aria-hidden="true"></div><div class="hccombo" id="hcc" aria-hidden="true"></div></div>`);
  HC=H; // after view(): view() stops the drive before it
  const cv=$('#hcv'),dpr=Math.min(2,devicePixelRatio||1);
  // GL-01: the 3D look (62b-hill-gl.js) draws the world on a WebGL canvas under #hcv, which then only carries the small things on
  // top (so it keeps its alpha); without WebGL, or with the 3D look off, #hcv draws everything as before
  let glc=null;if(typeof hcGlWant=='function'&&hcGlWant()){glc=document.createElement('canvas');glc.id='hcgl';glc.setAttribute('aria-hidden','true');cv.parentNode.insertBefore(glc,cv);H.gl=hcGlStart(H,glc);if(!H.gl){glc.remove();glc=null}}
  const ctx=cv.getContext('2d',{alpha:!!H.gl});
  cv.setAttribute('role','img');cv.setAttribute('aria-label','The hill and your vehicle'); // P6-01
  // at most 1 million pixels; a slow tablet draws fewer (the canvas is stretched to the screen): 1, 0.85, 0.7 of them
  H.q=1;let slow=0,fast=0,k=dpr;const size=()=>{const cw=Math.max(1,cv.clientWidth),ch=Math.max(1,cv.clientHeight);k=Math.min(dpr,Math.sqrt(1e6/(cw*ch)))*H.q;cv.width=Math.round(cw*k);cv.height=Math.round(ch*k)};size();H.size=size;
  const hc=$('#hc');
  const setP=()=>{const ids=Object.values(H.ptIn);H.gas=ids.includes('g');H.brake=ids.includes('b');$('#pg').classList.toggle('on',H.gas);$('#pb').classList.toggle('on',H.brake)};H.ptIn={};
  hc.addEventListener('pointerdown',e=>{if(HC!==H||e.target.closest('.gh-top')||e.target.closest('#hchop'))return;e.preventDefault();H.ptIn[e.pointerId]=e.clientX>innerWidth/2?'g':'b';setP()});
  const rel=e=>{if(HC!==H)return;delete H.ptIn[e.pointerId];setP()};hc.addEventListener('pointerup',rel);hc.addEventListener('pointercancel',rel);hc.addEventListener('pointerleave',rel);
  // G-MOVES: the Hop button (its own touch, never Gas); Space or H on a keyboard
  const hop=$('#hchop');if(hop){hop.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();if(HC===H&&!H.paused)H.hopQ=1});hop.onclick=e=>{if(!e.detail&&HC===H&&!H.paused)H.hopQ=1}}
  H.kd=e=>{if((e.key==' '||e.key=='h'||e.key=='H')&&H.hop&&!H.paused){H.hopQ=1;e.preventDefault()}if(e.key=='ArrowRight'||e.key=='ArrowUp')H.gas=true;if(e.key=='ArrowLeft'||e.key=='ArrowDown')H.brake=true};H.ku=e=>{if(e.key=='ArrowRight'||e.key=='ArrowUp')H.gas=false;if(e.key=='ArrowLeft'||e.key=='ArrowDown')H.brake=false};
  addEventListener('keydown',H.kd);addEventListener('keyup',H.ku);
  // P4-16: Pause opens the shared sheet; it holds the drive (and the game-time clock) and its Quit ends the drive
  GH.wire({quit:()=>hcEnd('quit'),hold:on=>{if(HC!==H)return;H.paused=on;H.ptIn={};setP();if(on&&H.eng){try{H.eng.g.gain.setTargetAtTime(0,ac().currentTime,.05)}catch(e){}}}});
  $('#hcsnd').onclick=e=>{S.hcSnd=((S.hcSnd||0)+1)%3;save();e.currentTarget.innerHTML=ico(HC_SNDI[S.hcSnd]);hcMsg(['All sounds on','Engine off, other sounds on','Truck sounds off'][S.hcSnd],1400);if(S.hcSnd&&H.eng){try{H.eng.g.gain.setTargetAtTime(0,ac().currentTime,.05);H.eng.lfo.stop();H.eng.o.stop();H.eng.o2.stop()}catch(x){}H.eng=null}};
  if(S.sound&&(S.hcSnd||0)==0){try{const E=ENG[gs.veh]||ENG.jeep,a=ac(),o=a.createOscillator(),o2=a.createOscillator(),f=a.createBiquadFilter(),g=a.createGain(),am=a.createGain(),lfo=a.createOscillator(),lg=a.createGain();o.type=E[1];o2.type='square';f.type='lowpass';f.frequency.value=420;g.gain.value=.02;
    o.connect(f);o2.connect(f);f.connect(am).connect(g).connect(MG);am.gain.value=1;lfo.frequency.value=E[2]||7;lg.gain.value=E[2]?.45:.08;lfo.connect(lg).connect(am.gain);lfo.start();o.frequency.value=E[0];o2.frequency.value=E[0]/2;o.start();o2.start();H.eng={o,o2,g,f,lfo,base:E[0]}}catch(e){}}
  hcMsg(H.boss?`Race ${HC_BOSS[wi][0]} to the flag!`:st?`${st[1]}: ${hcGoalText(st)[0].toUpperCase()+hcGoalText(st).slice(1)}!`:day?`${day.label}. Reach the gold flag at ${day.goal} m!`:`Distance drive: ${H.best?'beat '+H.best+' m!':'go as far as you can!'}`,2600);
  if(S.voice)say(H.boss?`${HC_BOSS[wi][0]}: ${HC_BOSS[wi][4]}`:st?`${st[1]}. ${hcGoalText(st)}!`:`Let's climb, ${S.name}!`);
  let last=0;const loop=ts=>{if(HC!==H)return;const dt=last?Math.min(.1,(ts-last)/1000):0;last=ts;
    if(!document.hidden&&!H.over&&!H.paused){hcAdvance(H,dt);if(!H.over)hcTime(H,dt)}
    hcMusic(H);
    if(H.gl&&hcGlPace(H,dt))slow=fast=0;else if(dt>.026)slow++;else if(dt>0)fast++;if(slow+fast>=45){if(slow>30&&H.q>.71){H.q=H.q>.9?.85:.7;size()}else if(H.gl&&!H.gl.off&&slow>36){if(++H.gl.slow>=3)hcGlDrop(H,'slow')}else if(H.gl)H.gl.slow=0;slow=fast=0} // GL-01: still slow at the lowest scale: the 2D look
    if(H.result&&!H.shown){H.result=='win'?hcWin():hcEnd(H.result)}
    if(HC===H){hcDraw(ctx,cv.width,cv.height,k);H.raf=requestAnimationFrame(loop)}};H.raf=requestAnimationFrame(loop)}
function hcMsg(t,ms=1500){const m=$('#hcm');if(!m)return;m.textContent=t;m.classList.add('on');clearTimeout(m._t);m._t=setTimeout(()=>m.classList.remove('on'),ms)}
function hcPop(t){const m=$('#hcp');if(!m)return;m.textContent=t;m.classList.remove('on');void m.offsetWidth;m.classList.add('on')}
function hcTime(H,dt){const p=pt();H.ambT=(H.ambT??4)-dt;if(H.ambT<=0){H.ambT=5+Math.random()*8;hcAmb(H.w)}
  if(!H.timeUp){p.bank=Math.max(0,p.bank-dt);p.used+=dt;if(ptLeft()<=0){H.timeUp=true;H.graceT=25;hcMsg('Last run! Game time is up soon.',3000);SFX.rattle()}}
  else{H.graceT-=dt;if(H.graceT<=0){H.result='time';return}}
  H.saveT=(H.saveT||0)+dt;if(H.saveT>5){H.saveT=0;save()}
  if(H.comboT<=0){const c=$('#hcc');if(c&&c.classList.contains('on'))c.classList.remove('on')}
  GH.setTime($('#hct'),H.timeUp?H.graceT:null)}
function hcAmb(st){if(!hs()||Math.random()<.25)return;
  if(st=='meadow'){const n=2+Math.floor(Math.random()*3),f=2200+Math.random()*1200;for(let i=0;i<n;i++)tone(f,.07,i*.11,'sine',.035,f*1.5)}
  else if(st=='jungle'){const f=900+Math.random()*500;tone(f,.12,0,'triangle',.04,f*1.8);tone(f*1.6,.12,.14,'triangle',.04,f*.9)}
  else if(st=='desert'){tone(2400,.5,0,'sine',.03,1600);noise(1.2,0,.025,300,900)}
  else if(st=='snow'){noise(1.6,0,.035,500,1500)}
  else if(st=='volcano'){noise(1.4,0,.06,60,180);tone(45,1.2,0,'sine',.08,30)}
  else if(st=='city'){const f=pick([330,392,440]);tone(f,.12,0,'square',.03);tone(f*1.26,.18,.15,'square',.03)}
  else if(st=='moon'){[0,1,2].forEach(i=>tone(1200+i*300,.06,i*.1,'sine',.03))}}

/* ---- the end of a run: the shared end card (P4-16) ---- */
const hcEngOff=H=>{if(H.eng){try{H.eng.g.gain.setTargetAtTime(0,ac().currentTime,.1)}catch(e){}}};
function hcEnd(why){const H=HC;if(!H||H.shown)return;H.shown=true;H.over=true;const gs=garageS();hcEngOff(H);
  if(H.boss)return hcBossEnd(H,why); // G-MOVES
  if(H.st){gs.bolts+=H.bolts;save();if(why=='quit'){stopHC();return hcLevels(H.wi)}return hcStageCard(H,why)}
  const m=Math.floor((H.maxX-60)/20),D=H.day,rec=!D&&m>gs.best[H.w];if(rec)gs.best[H.w]=m;const pay=hcDayPay(H);gs.bolts+=H.bolts;save();
  if(why=='quit'){stopHC();return garage()}
  const win=(rec&&m>20)||(D&&H.dayHit);win?SFX.fanfare():SFX.chime();
  const dayLine=!D?[]:H.dayHit?[['sparkle',pay?`Today's drive done: plus ${pay} bolts! A new drive comes tomorrow.`:`Today's drive done again! A new drive comes tomorrow.`]]:
    [['target',`Today's gold flag is at ${D.goal} m. Try again: nothing is lost.`]];
  const o=hcGuard(GH.end('hill',{win,title:why=='time'?"Game time's up!":D&&H.dayHit?"Today's drive done!":'Out of gas!',tag:rec&&m>0?'New record!':'',
   stats:[[m+' m',D?(H.dayHit?'gold flag reached':'gold flag at '+D.goal+' m'):rec&&m>0?'new record':'best '+gs.best[H.w]+' m','ruler'],['+'+(H.bolts+pay),'bolts','nut'],[String(H.flips),'flips','rotate'],[String(H.perfect),'perfect landings','check-circle']],
   lines:[...dayLine,['drop','Fuel cans are further apart the farther you go. Ease off the gas in the air to save fuel.'],['target',esc(hcNextGoal().t)]],
   btns:why=='time'||ptLeft()<=0?NAV.end3({next:'hlearn',home:'hgar'}):NAV.end3({again:'hagain',home:'hgar'})})); // NAV-01: with no game time left, Next goes to Learn
  if(S.voice)say(why=='time'?`Game time is up! Let's learn and earn more!`:rec&&m>0?`New record! ${m} meters!`:`You drove ${m} meters!`);
  const go=f=>{o.remove();stopHC();f()};
  if(o.querySelector('#hagain'))o.querySelector('#hagain').onclick=()=>go(()=>D?hcStart(H.wi,null,hcDay()):hcStart(H.wi));
  if(o.querySelector('#hlearn'))o.querySelector('#hlearn').onclick=()=>go(()=>learnHub());
  o.querySelector('#hgar').onclick=()=>go(home)}
// game time ran out in a stage: bolts kept, no stars lost
function hcStageCard(H,why){SFX.chime();const C=H.C,m=Math.min(Math.floor((H.maxX-60)/20),Math.floor((C.fin-60)/20)),L=Math.floor((C.fin-60)/20);
  if(S.voice)say(`Game time is up! Let's learn and earn more!`);
  hcCard(H,{title:"Game time's up!",extra:UI.meter(m/L,{lg:true,kind:'good',label:`${m} of ${L} m`}),lines:[['nut',`Your ${H.bolts} bolts are saved.`],['go',`Only <b>${Math.max(0,L-m)} m</b> to the flag next time!`]],
   btns:NAV.end3({next:'hcnext',home:'hchome'})})} // NAV-01: no game time left: Next goes to Learn
// the finger still on the gas when the card opens must not press its buttons when it lifts: a button works after a new press
// on the card (a key press always works)
const hcGuard=o=>{o.addEventListener('pointerdown',()=>{o._armed=1},true);o.addEventListener('click',e=>{if(e.detail&&!o._armed){e.stopPropagation();e.preventDefault()}},true);return o};
// NAV-01: the end choices (NAV.end3, data-go again | next | home); Next with no game time left goes to Learn to earn more
function hcCard(H,c){const o=hcGuard(GH.end('hill',c));const go=f=>{o.remove();stopHC();f()};
  o.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{const a=b.dataset.go;
    if(a=='again')go(()=>H.boss?hcStart(H.wi,null,null,true):hcStart(H.wi,H.si));
    else if(a=='next'){if(ptLeft()<=0)return go(learnHub);const n=hcAfter(H.wi,H.si);go(()=>n?hcStart(n[0],n[1]):hcLevels(H.wi))}
    else go(home)});return o}
// G-FEEL2: the light end of a won stage (GH.end {light: true}, NAV.light); Next with no game time left goes to Learn, as on the card
function hcLight(H,stars,nx){const go=f=>()=>{stopHC();f()};
  return hcGuard(GH.end('hill',{light:true,title:`${H.st[1]} done!`,stars,again:go(()=>hcStart(H.wi,H.si)),
    next:go(()=>ptLeft()<=0?learnHub():hcStart(nx[0],nx[1])),home:go(home)}))}
// the stage after (w, i) if it is open: [w, i] or null
function hcAfter(w,i){if(i+1<HC_SPW)return hcSOpen(w,i+1)?[w,i+1]:null;return w+1<HC_ST.length&&hcWOpen(w+1)?[w+1,0]:null}
function hcWin(){const H=HC;if(!H||H.shown)return;H.shown=true;H.over=true;H.result='win';hcEngOff(H);
  if(H.boss)return hcBossEnd(H,'win'); // G-MOVES
  const s=H.st,r=hcBank(H);save();const all=garageS().st[s[0]]||0,stars=hcBits(all),ok=r.bits&1,tm=Math.round(H.t),nx=hcAfter(H.wi,H.si);
  ok?SFX.fanfare():SFX.chime();if(S.voice)say(!ok?'So close! Try again!':stars==3?'Three stars! Amazing!':'You made it!');
  const g=s[2],goal=g[0]=='coins'?`Collect ${g[1]} bolts (you got ${H.bolts})`:g[0]=='cargo'?`Carry the crates to the flag (${H.crates} of ${H.crates0})`:'Reach the flag';
  const lines=[[ok?'check-circle':'target',esc(goal)+(r.bits&1&&!(r.old&1)?' <b>New star!</b>':'')],
    ...s[3].map((m,k)=>{const now=r.bits>>(k+1)&1,was=r.old>>(k+1)&1;return[now||was?'check-circle':HC_MIC[m[0]],esc(hcMisText(m)[0].toUpperCase()+hcMisText(m).slice(1))+(now&&!was?' <b>New star!</b>':was?' (done before)':'')]}),
    ...(r.gain?[['nut',`Plus ${r.gain} bolts for new stars`]]:[]),...r.opened.map(n=>['sparkle',`${esc(n)} is open!`]),...(r.nextOpen?[['go',`Next: ${esc(r.nextOpen)} is open`]]:[]),
    ...(!r.opened.length&&!r.nextOpen?[['target',esc(hcNextGoal().t)]]:[])];
  // G-FEEL2: a won stage with the next stage of the same world open chains on: the light banner (Play again / Next / Home, the
  // stars in its title) goes to Next by itself after 2 s. The last stage of a world, a stage not won and no game time left keep the
  // full card. hcBank above has saved the stars and paid the bolts either way.
  if(ok&&nx&&nx[0]==H.wi&&ptLeft()>0&&!H.timeUp)return hcLight(H,stars,nx);
  hcCard(H,{win:!!ok,title:ok?`${s[1]} done!`:`So close! ${H.bolts} of ${g[1]} bolts`,stars,
   stats:[[tm+' s','time','timer'],['+'+(H.bolts+r.gain),'bolts','nut'],[String(H.crashes),'restarts','replay'],H.crates0?[`${H.crates}/${H.crates0}`,'crates','gift']:[String(H.flips),'flips','rotate']],
   lines,
   btns:ptLeft()<=0?NAV.end3({next:'hcnext',home:'hchome'}):NAV.end3({again:'hcagain',next:ok&&nx?'hcnext':'',home:'hchome'})})} // NAV-01

/* ---- the menu: next goal, worlds and their stages, the distance drive, the garage, driving help (on: Auto, off: none) ---- */
let hcMW=null; // the world shown on the menu
function hcProfile(s,w){const C=hcCourse(s,w),W=HCW[w],N=60,ys=[];for(let i=0;i<=N;i++)ys.push(hcH(C,C.fin*i/N));const lo=Math.min(...ys),hi=Math.max(...ys,lo+60),
  Y=v=>(34-(v-lo)/(hi-lo)*26).toFixed(1),d='M0 40L'+ys.map((v,i)=>(i*120/N).toFixed(1)+' '+Y(v)).join('L')+'L120 40Z';
  const pits=C.pits.map(p=>`<rect x="${(p.x0/C.fin*120).toFixed(1)}" y="${Y(p.y)}" width="${Math.max(1.5,(p.x1-p.x0)/C.fin*120).toFixed(1)}" height="6" fill="var(${hcTok(W.water)})"/>`).join('');
  return`<svg class="hc-prof" viewBox="0 0 120 40" aria-hidden="true"><path d="${d}" fill="var(${hcTok(W.top)})"/>${pits}<path d="M116 ${Y(ys[N])}V${(+Y(ys[N])-12).toFixed(1)}l-7 3l7 3" fill="var(--ill-red)" stroke="var(--ill-ink)" stroke-width="1"/></svg>`}
function hcHubLine(){const gs=garageS();return`<span>${ico('star',18)}<b>${hcTot()}</b> of ${hcMax()} stars</span><span>${ico('nut',18)}<b>${gs.bolts}</b> bolts</span>`}
function garage(){const gs=garageS(),ng=hcNextGoal(),day=hcDay(),DW=HCW[day.wi];if(hcMW==null||!hcWOpen(hcMW)||hcMW>=HC_ST.length)hcMW=ng.w;const w=hcMW,W=HCW[w],left=ptLeft();
  const nextI=ng.w==w&&ng.i!=null?ng.i:HC_ST[w].findIndex((s,i)=>hcSOpen(w,i)&&hcStars(s[0])<3);const pi=nextI<0?0:nextI,ps=HC_ST[w][pi];
  view(`${GH.top('hill',{chips:`<span class="stat gh-nut" aria-label="Bolts">${ico('nut',32)}<b>${gs.bolts}</b></span>`})}
  <div class="scroll hc-menu">
  <div class="hc-goal" id="hcnext">${ico('target',32)}<p><b>Next goal</b> ${esc(ng.t)}</p></div>
  <p class="hc-save" id="hcsave">${ico('nut',24)}<span>${esc(hcSaveLine())}</span></p>
  <div class="hc-wtabs" role="group" aria-label="Worlds">${HC_ST.map((_,k)=>{const ok=hcWOpen(k);return`<button class="btn hc-wt${k==w?' on':''}${ok?'':' lock'}" data-w="${k}" aria-pressed="${k==w}" style="--hc-a:var(--${HCW[k].sky[0]});--hc-b:var(--${HCW[k].sky[1]})">
    <b>${esc(HCW[k].n)}</b><span>${ok?ico('star',18)+hcWStars(k)+'/15':ico('lock',18)+HC_NEED[k]+' stars'}</span></button>`}).join('')}</div>
  <section class="hc-world" style="--hc-a:var(--${W.sky[0]});--hc-b:var(--${W.sky[1]})"><div class="hc-wh"><h2>${esc(W.n)}</h2>${UI.chip('star',`${hcWStars(w)}/15`,{aria:'Stars in this world'})}</div>
  <div class="hc-stages">${HC_ST[w].map((s,i)=>{const ok=hcSOpen(w,i),n=hcStars(s[0]),b=gs.st[s[0]]||0;return`<button class="btn hc-stg${ok?'':' lock'}${i==pi?' cur':''}" data-stg="${i}" aria-label="${esc(`Stage ${i+1}, ${s[1]}: ${ok?n+' of 3 stars':'locked'}`)}">
    <span class="hc-sn">${ok?i+1:ico('lock',24)}</span><span class="hc-sb"><b>${esc(s[1])}</b>${hcProfile(s,w)}
    <span class="hc-gl">${ico(HC_GIC[s[2][0]],20)}${esc(hcGoalText(s))}</span>
    <span class="hc-ms">${s[3].map((m,k)=>`<span class="${b>>(k+1)&1?'ok':''}">${ico(b>>(k+1)&1?'check':HC_MIC[m[0]],18)}${esc(hcMisText(m))}</span>`).join('')}</span></span>
    ${UI.stars(n,3,22)}</button>`}).join('')}</div>${hcBossCard(w)}</section>
  ${UI.btn(`Play stage ${pi+1}: ${ps[1]}`,{kind:'primary',size:'lg',icon:'play',id:'hcgo',wide:true})}
  ${UI.sw('Driving help: keeps the car level and brings balloons (how much: Grown-ups)',hcEasy(),'hceasy')}
  <button class="btn hc-day${day.done?' done':''}" id="hcday">
    <span class="hc-daydisc">${ico(day.done?'check-circle':'sparkle',32)}</span><span class="hc-dayt"><b>Today's drive: ${esc(DW.n)}</b><span>${esc(day.label)}</span>
    <small>${day.done?'Done today! A new drive comes tomorrow.':`Gold flag at ${day.goal} m: plus ${HC_DAY_BONUS} bolts the first time today.`}</small></span>${ico('play',32)}</button>
  <h2>Distance drive</h2><p class="hc-note">Go as far as you can. A new road every day. Fuel cans get further apart. Your best is a flag on the road.</p>
  <div class="hc-dist">${HCW.map((D,k)=>hcWOpen(k)?`<button class="btn hc-dw" data-st="${D.id}" style="--hc-a:var(--${D.sky[0]});--hc-b:var(--${D.sky[1]})">${ico('ruler',24)}<span><b>${esc(D.n)}</b><small>${gs.best[D.id]?'Best '+gs.best[D.id]+' m':'No best yet'}</small></span></button>`:'').join('')}</div>
  <h2>Garage</h2><button class="btn hc-gar" id="hcgar"><canvas width="160" height="96" data-vc="${gs.veh}" aria-hidden="true"></canvas><span><b>${esc(VEH[gs.veh].n)}</b><small>Vehicles, upgrades and paint</small></span>${ico('chevron-right',28)}</button>
  <h2>How to drive</h2><ul class="hc-tips">
   <li>${ico('chevron-right',24)}<span>Hold <b>Gas</b> (right side) to go. Hold <b>Brake</b> (left side) to slow down and back up.</span></li>
   <li>${ico('rotate',24)}<span>In the air, Gas tips you back and Brake tips you forward. Land on both wheels.</span></li>
   ${hcHopOpen()?`<li>${ico('arrow-up',24)}<span>Tap <b>Hop</b> to jump over bumps and logs.</span></li>`:''}
   <li>${ico('pin',24)}<span>A flip or an empty tank starts again at the last checkpoint. Nothing is lost.</span></li>
   <li>${ico('nut',24)}<span>Bolts buy vehicles and upgrades in the garage. Stars open new stages and worlds.</span></li></ul></div>`);
  GH.wire({back:gameRoom});
  $$('[data-vc]').forEach(hcVehPic);
  $$('[data-w]').forEach(b=>b.onclick=()=>{const k=+b.dataset.w;if(!hcWOpen(k)){SFX.wrong();fb(`Win ${HC_NEED[k]-hcTot()} more stars to open ${HCW[k].n}.`,'warn long',2600);return}SFX.pop(1);hcMW=k;garage()});
  const play=(k,i)=>{if(ptLeft()<=0){SFX.wrong();fb(ptWhyNot(),'warn long',3000);return}SFX.whoosh();hcStart(k,i)};
  $$('[data-stg]').forEach(b=>b.onclick=()=>{const i=+b.dataset.stg;if(!hcSOpen(w,i)){SFX.wrong();fb(`Finish ${HC_ST[w][i-1][1]} first!`,'warn long',2400);return}play(w,i)});
  $('#hcgo').onclick=()=>play(w,pi);
  $$('[data-st]').forEach(b=>b.onclick=()=>play(HCW.findIndex(D=>D.id==b.dataset.st),null));
  $('#hcday').onclick=()=>{if(ptLeft()<=0){SFX.wrong();fb(ptWhyNot(),'warn long',3000);return}SFX.whoosh();hcStart(day.wi,null,day)};
  $('#hcgar').onclick=()=>{SFX.pop(2);hcGarage()};
  const bb=$('#hcboss');if(bb)bb.onclick=()=>{if(!hcBossOpen(w)){SFX.wrong();fb(`Win a star on ${HC_ST[w][HC_SPW-1][1]} to meet ${HC_BOSS[w][0]}.`,'warn long',2600);return}SFX.pop(2);hcBossMenu(w)};
  if(hcHopOpen()&&!gs.hop)GH.moveNew({name:'Hop',icon:'arrow-up',line:'Tap Hop to jump over bumps and logs!',done:()=>{gs.hop=1;save()}}); // G-MOVES: once
  $('#hceasy').onchange=e=>{gs.as=e.target.checked?'auto':0;save();SFX.pop(2);fb(e.target.checked?'Driving help is on.':'Driving help is off.','',1400)}}
// G-MOVES: the world's rival run on the menu: the rival's face, its name, a crown once beaten; a lock until stage 5 has a star
function hcBossCard(w){if(w>=HC_BOSS.length)return'';const B=HC_BOSS[w],ok=hcBossOpen(w),r=hcBossRec(w);
  return`<button class="btn hc-boss${ok?'':' lock'}" id="hcboss" aria-label="${esc(ok?`Rival run: race ${B[0]}${r.w?', you won':''}`:`Rival run with ${B[0]}: locked`)}">
    <span class="hc-bface">${GH.faceSVG(B[1],'helmet',B[2])}</span><span class="hc-bt"><b>Rival run: ${esc(B[0])}</b>
    <small>${ok?(r.w?'You won! Race again any time.':esc(B[4])):`Win a star on ${esc(HC_ST[w][HC_SPW-1][1])} first.`}</small></span>${ico(ok?r.w?'crown':'play':'lock',32)}</button>`}
// the old levels screen: now the menu with a world picked
function hcLevels(w=0){hcMW=typeof w=='number'?w:Math.max(0,HCW.findIndex(W=>W.id==w));if(hcMW>=HC_ST.length)hcMW=0;garage()}
function hcVehPic(c){const x=c.getContext&&c.getContext('2d');if(!x)return;const P=hcPetSpr();if(P&&!P.c&&P.p&&!c._wait){c._wait=1;P.p.then(()=>{if(c.isConnected)hcVehPic(c)})}const V=VEH[c.dataset.vc],gs=garageS(),w=c.width,h=c.height,s=Math.min(.62*w/160,.62*h/96);x.clearRect(0,0,w,h);
  x.fillStyle=hcC('g2');x.fillRect(0,h-12*h/96,w,12*h/96);drawVehicle(x,c.dataset.vc,w/2,h-12*h/96-V.R*s-(V.R+6)*s,0,s,hcC(gs.paint)||hcC('r'),0,0,0,{rim:gs.rim,top:gs.top})}
// what an upgrade does, in numbers a child can compare
function hcUpLine(k,lv){const a=hcSpec(garageS().veh,{[k]:lv});return k=='engine'?`Top speed ${Math.round(a.maxV/20*3.6)} km/h`:k=='tires'?`Grip ${Math.round(a.grip*100)}`:k=='susp'?`Crates stay on up to ${Math.round(a.drop/10)} bumps`:`One tank: ${Math.round(a.tankSec)} s of gas`}
function hcGarage(){const gs=garageS();
  view(`${GH.top('hill',{sub:'Garage',chips:`<span class="stat gh-nut" aria-label="Bolts">${ico('nut',32)}<b>${gs.bolts}</b></span>`})}
  <div class="scroll hc-menu"><div class="hc-show"><canvas width="420" height="230" data-vc="${gs.veh}" role="img" aria-label="${esc(VEH[gs.veh].n)}"></canvas><b>${esc(VEH[gs.veh].n)}</b></div>
  <h2>Upgrades</h2><div class="hc-ups">${UPG.map(([k,n,ic,d])=>{const lv=gs.up[k],cost=UPCOST[lv];return`<div class="hc-up">${ico(ic,32)}<span><b>${n}</b><small>${d}</small>
    <small class="hc-num">${esc(hcUpLine(k,lv))}${lv<5?' '+ico('arrow-right',16)+' '+esc(hcUpLine(k,lv+1).replace(/^[A-Za-z ]+?(\d)/,'$1')):''}</small>
    <span class="hc-pips" role="img" aria-label="Level ${lv} of 5">${[0,1,2,3,4].map(i=>`<i class="${i<lv?'on':''}"></i>`).join('')}</span></span>
    ${lv<5?UI.btn(String(cost),{icon:'nut',kind:gs.bolts>=cost?'primary':'soft',attrs:`data-up="${k}" aria-label="${esc(`Buy ${n} level ${lv+1} for ${cost} bolts`)}"`}):`<b class="hc-max">Top level</b>`}</div>`}).join('')}</div>
  <h2>Vehicles</h2><div class="hc-vehs">${Object.entries(VEH).map(([k,V])=>`<button class="btn hc-veh${gs.veh==k?' on':''}" data-v="${k}" aria-pressed="${gs.veh==k}"><canvas width="160" height="96" data-vc="${k}" aria-hidden="true"></canvas><b>${esc(V.n)}</b><small>${esc(V.d)}</small>
    <span class="hc-vc">${gs.vehs[k]?(gs.veh==k?ico('check',18)+'Driving':'Tap to drive'):ico('nut',18)+V.cost}</span></button>`).join('')}</div>
  <h2>Paint</h2><div class="hc-paints">${PAINTS.map(([c,n,cost])=>`<button class="btn hc-paint${gs.paint==c?' on':''}" data-pc="${c}" aria-pressed="${gs.paint==c}" aria-label="${esc(n+(gs.paint==c?', on':gs.paints[c]?'':', '+cost+' bolts'))}"><span style="background:var(${hcTok(c)})"></span>${gs.paints[c]?(gs.paint==c?ico('check',18):esc(n)):ico('nut',18)+cost}</button>`).join('')}</div>
  <h2>Garage level 2</h2><p class="hc-note" id="hct2n">${hcT2Open()?'Rims, trails and toppers to make your car your own. Tap one you own to use it, tap again to take it off.':
    `Opens at ${HC_T2_NEED} stars (you have ${hcTot()}). Every price is here already: start saving!`}</p>
  ${HC_T2K.map(kind=>`<h3 class="hc-t2h">${HC_T2N[kind]}</h3><div class="hc-t2s">${HC_T2.filter(t=>t[1]==kind).map(([id,,n,cost])=>{const own=gs.own2[id],on=gs[kind]==id,open=hcT2Open();
    return`<button class="btn hc-t2${on?' on':''}${open?'':' lock'}" data-t2="${id}" aria-pressed="${on}" aria-label="${esc(n+(on?', in use':own?', yours':open?', '+cost+' bolts':', opens at '+HC_T2_NEED+' stars'))}">
    <canvas width="240" height="144" data-t2c="${id}" aria-hidden="true"></canvas><b>${esc(n)}</b><span class="hc-vc">${on?ico('check',18)+'In use':own?'Tap to use':(open?'':ico('lock',18))+ico('nut',18)+cost}</span></button>`}).join('')}</div>`).join('')}
  <p class="hc-note">Bolts come from driving: pick them up, do tricks, and win stars.</p></div>`);
  GH.wire({back:garage});$$('[data-vc]').forEach(hcVehPic);$$('[data-t2c]').forEach(hcT2Pic);
  $$('[data-t2]').forEach(b=>b.onclick=()=>{const id=b.dataset.t2,r=hcBuy2(id),it=HC_T2.find(t=>t[0]==id);
    if(r=='locked'){SFX.wrong();fb(`Garage level 2 opens at ${HC_T2_NEED} stars. You have ${hcTot()}.`,'warn long',2600);return}
    if(r=='short')return short(b,it[3]);
    if(r=='bought'){SFX.fanfare();confetti(20)}else SFX.pop(2);again()});
  const short=(b,cost)=>{SFX.wrong();anim(b,'sad');fb(`Need ${cost-gs.bolts} more bolts!`,'warn')};
  const again=()=>{const y=$('.scroll').scrollTop;hcGarage();$('.scroll').scrollTop=y};
  $$('[data-v]').forEach(b=>b.onclick=()=>{const k=b.dataset.v,V=VEH[k];if(!gs.vehs[k]){if(gs.bolts<V.cost)return short(b,V.cost);gs.bolts-=V.cost;gs.vehs[k]=1;SFX.fanfare();confetti(30)}else SFX.pop(2);gs.veh=k;save();again()});
  $$('[data-up]').forEach(b=>b.onclick=()=>{const k=b.dataset.up;hcBuyUp(k)?(SFX.fanfare(),confetti(16),again()):short(b,UPCOST[gs.up[k]])});
  $$('[data-pc]').forEach(b=>b.onclick=()=>{const c=b.dataset.pc,cost=PAINTS.find(x=>x[0]==c)[2];if(!gs.paints[c]){if(gs.bolts<cost)return short(b,cost);gs.bolts-=cost;gs.paints[c]=1;SFX.chime()}else SFX.pop(2);gs.paint=c;save();again()})}
// buy the next level of an upgrade with bolts: true when bought (never below 0 bolts, never above level 5)
function hcBuyUp(k){const gs=garageS(),lv=gs.up[k];if(!(lv<5)||gs.bolts<UPCOST[lv])return false;gs.bolts-=UPCOST[lv];gs.up[k]=lv+1;save();return true}
// G-HC3: a level 2 item: buy it (and use it), use it, or take it off. 'locked' | 'short' | 'bought' | 'on' | 'off'
function hcBuy2(id){const gs=garageS(),it=HC_T2.find(t=>t[0]==id);if(!it)return'locked';const kind=it[1];
  if(!gs.own2[id]){if(!hcT2Open())return'locked';if(gs.bolts<it[3])return'short';gs.bolts-=it[3];gs.own2[id]=1;gs[kind]=id;save();return'bought'}
  if(gs[kind]==id){gs[kind]='';save();return'off'}
  gs[kind]=id;save();return'on'}
// a level 2 item's picture: a rim on a wheel, a topper on its pole, a trail as a row of its bits
function hcT2Pic(c){const x=c.getContext&&c.getContext('2d');if(!x)return;const id=c.dataset.t2c,it=HC_T2.find(t=>t[0]==id),w=120,h=72,gs=garageS(),paint=hcC(gs.paint)||hcC('r');
  x.setTransform(c.width/w,0,0,c.width/w,0,0);x.clearRect(0,0,w,h);if(!it)return;
  if(it[1]=='rim'){wheel(x,w/2,h/2,0,1.45,0,0,.3,paint,21,id);return}
  if(it[1]=='top'){x.fillStyle=hcC('g2');x.fillRect(0,h-8,w,8);hcTopper(x,w/2-10,h-8,1.15,id,0);return}
  for(let i=0;i<7;i++){const d=hcTrailBit(id,i),px=w-14-i*15,py=h/2+Math.sin(i*1.3)*8,r=(d.s||5)*(1.15-i*.08);x.globalAlpha=1-i*.1;
    if(d.star)hcStarD(x,px,py,r*1.4);else{x.fillStyle=hcC(d.c);x.beginPath();x.arc(px,py,r,0,7);x.fill();if(d.ring){x.fillStyle=hcA('w',.6);x.beginPath();x.arc(px-r*.35,py-r*.35,r*.3,0,7);x.fill()}}}x.globalAlpha=1}

/* ---- drawing: vehicles (origin = body centre, wheels at (+-L/2, R+6) below), the world, the HUD ---- */
function shade(c,p){const n=parseInt(c.slice(1),16),f=v=>Math.max(0,Math.min(255,Math.round(v+(p<0?v*p:(255-v)*p))));return'#'+[n>>16,(n>>8)&255,n&255].map(f).map(v=>v.toString(16).padStart(2,'0')).join('')}
function rr(x,a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
const hcSh=(c,p)=>/^#[0-9a-f]{6}$/i.test(c)?shade(c,p):c;
// the driver: the child's own pet (Sky Hop's drawn pet sprite, games2) peeking out of the window; until it is drawn, a helmet and a smiling face
function hcPetSpr(){try{return typeof hopPetSprite=='function'&&typeof S!='undefined'&&S.pet?hopPetSprite('happy',96):null}catch(e){return null}}
function hcHead(x,cx,cy,r,paint){const P=hcPetSpr();if(P&&P.c){x.save();x.beginPath();x.rect(cx-r*1.7,cy-r*1.9,r*3.4,r*2.6);x.clip();x.drawImage(P.c,cx-r*1.55,cy-r*1.45,r*3.1,r*3.1);x.restore();return}
  hcHelmet(x,cx,cy,r,paint)}
function hcHelmet(x,cx,cy,r,paint){x.fillStyle=hcC('s');x.beginPath();x.arc(cx,cy+r*.2,r*.7,0,7);x.fill();x.fillStyle=hcSh(paint,-.15);x.beginPath();x.arc(cx,cy,r,Math.PI*1.05,Math.PI*1.95);x.lineTo(cx+r*.95,cy-r*.05);x.lineTo(cx-r*.95,cy-r*.05);x.fill();
  x.fillStyle=hcC('w');x.beginPath();x.ellipse(cx-r*.35,cy-r*.55,r*.22,r*.12,-.5,0,7);x.fill();x.fillStyle=hcC('k');x.beginPath();x.arc(cx+r*.12,cy+r*.15,r*.1,0,7);x.arc(cx+r*.42,cy+r*.15,r*.1,0,7);x.fill();
  x.strokeStyle=hcC('k');x.lineWidth=r*.1;x.beginPath();x.arc(cx+r*.27,cy+r*.35,r*.2,.3,2.6);x.stroke()}
// G-HC3: where a topper's pole stands on each vehicle (body units)
const HC_TOPA={jeep:[-50,-18],buggy:[-44,-10],monster:[-54,-30],bike:[-30,-2],tractor:[-40,-66],bus:[-60,-50]};
// dec: the garage level 2 look {rim, top} (optional)
function drawVehicle(x,type,sx,sy,ang,sc,paint,rot1,rot2,bob,dec){const V=VEH[type]||VEH.jeep,hw=V.L/2,wy=V.R+6;
  x.save();x.translate(sx,sy);x.rotate(-ang);x.scale(sc,sc);x.translate(0,bob||0);x.textAlign='center';x.textBaseline='middle';
  const gb=x.createLinearGradient(0,-50,0,14);gb.addColorStop(0,hcSh(paint,.4));gb.addColorStop(.5,paint);gb.addColorStop(1,hcSh(paint,-.4));const edge=hcSh(paint,-.55);
  x.strokeStyle=hcC('e3');x.lineWidth=3;for(const wx of[-hw,hw]){x.beginPath();x.moveTo(wx*.9,2);for(let i=1;i<=6;i++)x.lineTo(wx*.9+(i%2?4:-4)+(wx-wx*.9)*i/6,2+(wy-2)*i/6);x.stroke()}
  x.strokeStyle=hcC('k2');x.lineWidth=5;x.beginPath();x.moveTo(-hw,wy-4);x.lineTo(-hw*.4,6);x.lineTo(hw*.4,6);x.lineTo(hw,wy-4);x.stroke();
  if(type=='buggy'){
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2;x.beginPath();x.moveTo(-50,4);x.lineTo(-44,-10);x.lineTo(30,-12);x.lineTo(54,-2);x.lineTo(50,6);x.closePath();x.fill();x.stroke();
    x.strokeStyle=hcC('k2');x.lineWidth=3.5;x.beginPath();x.moveTo(-36,-10);x.lineTo(-24,-40);x.lineTo(8,-40);x.lineTo(24,-12);x.moveTo(-24,-40);x.lineTo(-6,-12);x.stroke();
    hcHead(x,-8,-24,9,paint);x.fillStyle=hcC('w');x.font='bold 11px sans-serif';x.fillText('7',22,-3);x.fillStyle=hcC('y1');rr(x,48,-4,6,5,2);x.fill();
    x.fillStyle=hcC('e3');x.fillRect(-58,-14,10,4);x.fillRect(-54,-14,3,12)}
  else if(type=='monster'){
    x.fillStyle=hcC('k2');rr(x,-48,-4,96,10,3);x.fill();
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2.2;x.beginPath();x.moveTo(-62,-6);x.lineTo(-62,-24);x.quadraticCurveTo(-62,-30,-54,-30);x.lineTo(-26,-30);x.lineTo(-16,-56);x.lineTo(18,-56);x.lineTo(32,-30);x.lineTo(56,-28);x.quadraticCurveTo(64,-26,64,-18);x.lineTo(64,-6);x.closePath();x.fill();x.stroke();
    x.fillStyle=hcC('c1');x.beginPath();x.moveTo(-12,-32);x.lineTo(-6,-51);x.lineTo(14,-51);x.lineTo(25,-32);x.closePath();x.fill();
    hcHead(x,6,-40,9,paint);
    x.fillStyle=hcC('y');x.beginPath();x.moveTo(-50,-20);x.lineTo(-36,-26);x.lineTo(-40,-18);x.lineTo(-28,-22);x.lineTo(-44,-12);x.lineTo(-40,-19);x.closePath();x.fill();
    x.fillStyle=hcC('y1');rr(x,59,-24,6,7,2);x.fill();x.fillStyle=hcC('e1');for(let i=0;i<4;i++){x.beginPath();x.arc(-14+i*9,-60,2.4,0,7);x.fill()}}
  else if(type=='bike'){
    x.strokeStyle=hcC('k2');x.lineWidth=4;x.lineCap='round';x.beginPath();x.moveTo(-hw,wy);x.lineTo(-10,-6);x.lineTo(14,-8);x.lineTo(hw,wy);x.moveTo(14,-8);x.lineTo(22,-26);x.lineTo(14,-30);x.stroke();x.lineCap='butt';
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2;x.beginPath();x.moveTo(-22,-6);x.lineTo(-6,-16);x.lineTo(16,-18);x.lineTo(22,-8);x.lineTo(8,0);x.lineTo(-16,2);x.closePath();x.fill();x.stroke();
    x.beginPath();x.moveTo(-hw-6,6);x.quadraticCurveTo(-hw,-6,-hw+14,-4);x.lineTo(-hw+8,6);x.closePath();x.fill();x.beginPath();x.moveTo(hw-12,-2);x.quadraticCurveTo(hw,-6,hw+4,6);x.lineTo(hw-6,4);x.closePath();x.fill();
    x.fillStyle=hcC('k');rr(x,-24,-20,20,6,3);x.fill();
    x.strokeStyle=hcC('b3');x.lineWidth=6;x.lineCap='round';x.beginPath();x.moveTo(-12,-20);x.lineTo(-4,-36);x.lineTo(12,-28);x.moveTo(-12,-20);x.lineTo(2,-8);x.stroke();x.lineCap='butt';
    hcHead(x,-3,-45,11,paint);x.fillStyle=hcC('w');rr(x,-18,-14,14,10,2);x.fill();x.fillStyle=hcC('k');x.font='bold 9px sans-serif';x.fillText('1',-11,-9);x.fillStyle=hcC('y1');rr(x,22,-28,5,6,2);x.fill()}
  else if(type=='tractor'){
    x.fillStyle=hcC('k2');rr(x,-40,-6,84,8,3);x.fill();
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2;x.beginPath();x.moveTo(-12,-2);x.lineTo(-12,-28);x.lineTo(38,-26);x.quadraticCurveTo(48,-24,48,-14);x.lineTo(48,-2);x.closePath();x.fill();x.stroke();
    x.fillStyle=hcSh(paint,-.35);for(let i=0;i<4;i++)x.fillRect(16+i*7,-22,3,14);
    x.strokeStyle=hcC('k2');x.lineWidth=3.5;x.beginPath();x.moveTo(-42,-4);x.lineTo(-42,-64);x.lineTo(-8,-64);x.lineTo(-8,-4);x.stroke();x.fillStyle=hcSh(paint,-.2);rr(x,-46,-68,42,6,3);x.fill();
    x.fillStyle=hcA('c1',.6);x.fillRect(-40,-60,30,30);hcHead(x,-25,-40,10,paint);
    x.fillStyle=hcC('e3');x.fillRect(28,-46,5,20);x.fillStyle=hcC('k2');x.fillRect(27,-48,7,4);x.fillStyle=hcC('y1');rr(x,44,-20,6,7,2);x.fill()}
  else if(type=='bus'){
    const yb=x.createLinearGradient(0,-50,0,8);yb.addColorStop(0,hcC('y1'));yb.addColorStop(.5,hcC('y'));yb.addColorStop(1,hcC('y2'));x.fillStyle=yb;x.strokeStyle=hcC('n3');x.lineWidth=2;
    x.beginPath();x.moveTo(-68,6);x.lineTo(-68,-42);x.quadraticCurveTo(-68,-50,-60,-50);x.lineTo(56,-50);x.quadraticCurveTo(64,-50,66,-42);x.lineTo(70,-20);x.lineTo(70,6);x.closePath();x.fill();x.stroke();
    x.fillStyle=paint;x.fillRect(-68,-14,138,5);x.fillStyle=hcC('k');x.fillRect(-68,-4,138,3);
    for(let i=0;i<6;i++){x.fillStyle=hcC('c1');rr(x,-62+i*19,-44,15,16,3);x.fill();if(i%2==0){x.fillStyle=hcC(['s','s2','s3'][i/2]);x.beginPath();x.arc(-54.5+i*19,-33,4.5,0,7);x.fill()}}
    x.fillStyle=hcC('c1');x.beginPath();x.moveTo(52,-44);x.lineTo(62,-44);x.lineTo(66,-24);x.lineTo(52,-24);x.closePath();x.fill();hcHead(x,58,-32,6,paint);
    x.fillStyle=hcC('k');x.font='bold 7px sans-serif';x.fillText('SCHOOL BUS',0,-20);x.fillStyle=hcC('y1');rr(x,66,-14,5,7,2);x.fill();x.fillStyle=hcC('r');rr(x,-70,-40,4,8,2);x.fill();x.fillStyle=hcC('r2');x.fillRect(-72,-30,4,10)}
  else{
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2;
    x.beginPath();x.moveTo(-58,4);x.lineTo(-58,-12);x.quadraticCurveTo(-58,-18,-50,-18);x.lineTo(-24,-18);x.lineTo(-16,-42);x.lineTo(16,-42);x.lineTo(28,-18);x.lineTo(52,-16);x.quadraticCurveTo(60,-14,60,-6);x.lineTo(60,4);x.closePath();x.fill();x.stroke();
    x.fillStyle=hcSh(paint,-.45);rr(x,-56,-2,114,8,3);x.fill();x.fillStyle=hcA('w',.5);rr(x,-48,-15,22,3,1.5);x.fill();rr(x,32,-13,16,3,1.5);x.fill();
    x.fillStyle=hcC('c1');x.beginPath();x.moveTo(-12,-20);x.lineTo(-7,-37);x.lineTo(12,-37);x.lineTo(22,-20);x.closePath();x.fill();
    hcHead(x,5,-28,9.5,paint);
    x.strokeStyle=hcC('k2');x.lineWidth=3;x.beginPath();x.moveTo(-24,-18);x.lineTo(-16,-46);x.lineTo(16,-46);x.lineTo(28,-18);x.stroke();
    x.fillStyle=hcC('y1');rr(x,55,-12,6,7,2);x.fill();x.fillStyle=hcC('r');rr(x,-60,-12,4,7,2);x.fill();x.fillStyle=hcC('e2');rr(x,-64,-4,10,4,2);x.fill()}
  if(dec&&dec.top){const a=HC_TOPA[type]||HC_TOPA.jeep;hcTopper(x,a[0],a[1],1,dec.top)}
  x.restore();
  if(rot1==null)return; // the body only (the drive's cached sprite)
  const rim=dec&&dec.rim;wheel(x,sx,sy,ang,sc,-hw,wy,rot1,paint,V.R,rim);wheel(x,sx,sy,ang,sc,hw,wy,rot2,paint,V.R,rim)}
// a topper on its pole, the pole's foot at (px, py); the flags trail backwards (to the left)
function hcTopper(x,px,py,s,id){const t=py-36*s;x.strokeStyle=hcC('e1');x.lineWidth=2.5*s;x.lineCap='round';x.beginPath();x.moveTo(px,py);x.lineTo(px,t);x.stroke();x.lineCap='butt';
  if(id=='pennant'){x.fillStyle=hcC('y');x.strokeStyle=hcC('y3');x.lineWidth=1.2*s;x.beginPath();x.moveTo(px,t);x.lineTo(px-24*s,t+6*s);x.lineTo(px,t+12*s);x.closePath();x.fill();x.stroke()}
  else if(id=='checker'){for(let r=0;r<2;r++)for(let k=0;k<3;k++){x.fillStyle=hcC((r+k)%2?'k':'w');x.fillRect(px-(k+1)*7*s,t+r*6*s,7*s,6*s)}x.strokeStyle=hcC('k');x.lineWidth=1*s;x.strokeRect(px-21*s,t,21*s,12*s)}
  else if(id=='goldstar')hcStarD(x,px,t-5*s,10*s);
  else if(id=='sock'){for(let k=0;k<3;k++){const a=k*8*s,b=a+8*s,ha=6-k*1.3,hb=6-(k+1)*1.3;x.fillStyle=hcC(k%2?'w':'r');x.strokeStyle=hcC('r3');x.lineWidth=1*s;x.beginPath();x.moveTo(px-a,t+6*s-ha*s);x.lineTo(px-b,t+6*s-hb*s);x.lineTo(px-b,t+6*s+hb*s);x.lineTo(px-a,t+6*s+ha*s);x.closePath();x.fill();x.stroke()}}}
// a trail's bit number i: {c colour role, s size, star, ring, g (gravity: below 0 floats up)}
function hcTrailBit(id,i){
  if(id=='sparkle')return{c:'y',s:4,star:1,g:.2};
  if(id=='bubble')return{c:'c1',s:5,ring:1,g:-.35};
  if(id=='confetti')return{c:['p','y','b','g','o'][i%5],s:3.2,g:.8};
  return{c:['r','o','y','g','b','v'][i%6],s:5,g:-.05}}
function wheel(x,sx,sy,ang,sc,ox,oy,rot,paint,R=21,rim){const c=Math.cos(-ang),s=Math.sin(-ang),px=sx+(ox*c-oy*s)*sc,py=sy+(ox*s+oy*c)*sc,r=R*sc;
  x.save();x.translate(px,py);x.rotate(rot);
  x.fillStyle=hcC('k');x.beginPath();x.arc(0,0,r,0,7);x.fill();x.fillStyle=hcC('k2');x.beginPath();x.arc(0,0,r*.82,0,7);x.fill();
  x.fillStyle=hcC('k');const nb=Math.round(R*.7);for(let i=0;i<nb;i++){x.save();x.rotate(i*2*Math.PI/nb);rr(x,-2.8*sc,-r-1.6*sc,5.6*sc,4.6*sc,1.4*sc);x.fill();x.restore()}
  if(rim=='spoke'){x.strokeStyle=hcC('e1');x.lineWidth=2*sc;x.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4;x.moveTo(Math.cos(a)*r*.2,Math.sin(a)*r*.2);x.lineTo(Math.cos(a)*r*.78,Math.sin(a)*r*.78)}x.stroke()}
  if(rim=='rainbow'){const cs=['r','o','y','g','b','v'];for(let i=0;i<6;i++){x.fillStyle=hcC(cs[i]);x.beginPath();x.moveTo(0,0);x.arc(0,0,r*.6,i*Math.PI/3,(i+1)*Math.PI/3);x.closePath();x.fill()}}
  else{x.fillStyle=rim=='gold'||rim=='starrim'?hcC('y2'):paint||hcC('e');x.beginPath();x.arc(0,0,r*.5,0,7);x.fill()}
  x.fillStyle=hcC(rim=='gold'?'y':rim=='rainbow'?'w':'e1');x.beginPath();x.arc(0,0,r*(rim=='rainbow'?.22:.38),0,7);x.fill();
  if(rim=='starrim')hcStarD(x,0,0,r*.36);
  else{x.fillStyle=hcC(rim=='gold'?'y3':'e3');for(let i=0;i<5;i++){x.beginPath();x.arc(Math.cos(i*1.256)*r*.23,Math.sin(i*1.256)*r*.23,1.5*sc,0,7);x.fill()}}x.restore()}
/* ground texture per world (drawn once) */
const TEX={};
function texFor(wi){if(TEX[wi])return TEX[wi];const W=HCW[wi],c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),r=rng(wi*99+7);
  x.fillStyle=hcC(W.dirt);x.fillRect(0,0,128,128);x.fillStyle=hcC('k');
  for(let i=0;i<90;i++){x.globalAlpha=.05+r()*.12;x.beginPath();x.ellipse(r()*128,r()*128,2+r()*6,1.5+r()*4,r()*3,0,7);x.fill()}
  x.fillStyle=hcC('w');for(let i=0;i<40;i++){x.globalAlpha=.05+r()*.1;x.beginPath();x.arc(r()*128,r()*128,1+r()*2.5,0,7);x.fill()}
  x.globalAlpha=1;return TEX[wi]=c}
function hcProp(x,type,px,py,s,i){
  if(type=='tree'){const h=(46+(i*37)%26)*s;x.fillStyle=hcC('n2');x.fillRect(px-3*s,py-h*.38,6*s,h*.4);x.fillStyle=hcC(i%2?'g2':'g3');x.beginPath();x.arc(px,py-h*.62,h*.3,0,7);x.arc(px-h*.18,py-h*.5,h*.22,0,7);x.arc(px+h*.18,py-h*.5,h*.22,0,7);x.fill();x.fillStyle=hcC('g');x.beginPath();x.arc(px-h*.08,py-h*.7,h*.14,0,7);x.fill()}
  else if(type=='cactus'){const h=(40+(i*29)%24)*s;x.fillStyle=hcC('g3');rr(x,px-5*s,py-h,10*s,h,5*s);x.fill();rr(x,px-16*s,py-h*.7,8*s,h*.32,4*s);x.fill();rr(x,px-16*s,py-h*.46,14*s,7*s,3.5*s);x.fill();rr(x,px+8*s,py-h*.82,8*s,h*.36,4*s);x.fill();rr(x,px+2*s,py-h*.52,14*s,7*s,3.5*s);x.fill()}
  else if(type=='pine'){const h=(52+(i*31)%26)*s;x.fillStyle=hcC('n2');x.fillRect(px-3*s,py-h*.2,6*s,h*.22);for(let k=0;k<3;k++){const yy=py-h*(.2+k*.25),ww=h*(.32-k*.07);x.fillStyle=hcC('g3');x.beginPath();x.moveTo(px-ww,yy);x.lineTo(px,yy-h*.36);x.lineTo(px+ww,yy);x.fill();x.fillStyle=hcC('w');x.beginPath();x.moveTo(px-ww*.4,yy-h*.22);x.lineTo(px,yy-h*.36);x.lineTo(px+ww*.4,yy-h*.22);x.fill()}}
  else if(type=='palm'){const h=(70+(i*31)%30)*s,b=(i%2?1:-1)*12*s;x.strokeStyle=hcC('n2');x.lineWidth=6*s;x.lineCap='round';x.beginPath();x.moveTo(px,py);x.quadraticCurveTo(px+b,py-h*.6,px+b*.6,py-h);x.stroke();x.lineCap='butt';
    x.fillStyle=hcC(i%2?'g3':'g2');for(let k=0;k<6;k++){const a=k*1.05+.3;x.beginPath();x.moveTo(px+b*.6,py-h);x.quadraticCurveTo(px+b*.6+Math.cos(a)*h*.35,py-h-Math.sin(a)*h*.25-8*s,px+b*.6+Math.cos(a)*h*.5,py-h+h*.12);x.quadraticCurveTo(px+b*.6+Math.cos(a)*h*.25,py-h-4*s,px+b*.6,py-h);x.fill()}}
  else if(type=='deadtree'){const h=(44+(i*23)%20)*s;x.strokeStyle=hcC('k');x.lineWidth=4*s;x.beginPath();x.moveTo(px,py);x.lineTo(px,py-h);x.moveTo(px,py-h*.6);x.lineTo(px-h*.3,py-h*.9);x.moveTo(px,py-h*.45);x.lineTo(px+h*.28,py-h*.75);x.stroke()}
  else if(type=='lamp'){x.strokeStyle=hcC('k2');x.lineWidth=3*s;x.beginPath();x.moveTo(px,py);x.lineTo(px,py-60*s);x.lineTo(px+12*s,py-60*s);x.stroke();x.fillStyle=hcC('y');x.beginPath();x.arc(px+12*s,py-57*s,4*s,0,7);x.fill()}
  else if(type=='antenna'){x.strokeStyle=hcC('e1');x.lineWidth=3*s;x.beginPath();x.moveTo(px,py);x.lineTo(px,py-50*s);x.stroke();x.fillStyle=hcC('r');x.beginPath();x.arc(px,py-52*s,4*s,0,7);x.fill()}}
// a little flag on a pole (checkpoints: done = green)
function hcFlag(x,px,py,sc,col,lab){x.strokeStyle=hcC('e1');x.lineWidth=4*sc;x.beginPath();x.moveTo(px,py);x.lineTo(px,py-90*sc);x.stroke();x.fillStyle=hcC(col);x.beginPath();x.moveTo(px,py-90*sc);x.lineTo(px+40*sc,py-78*sc);x.lineTo(px,py-66*sc);x.fill();
  if(lab){x.fillStyle=hcC('w');x.strokeStyle=hcC('k');x.lineWidth=3*sc;x.font=`bold ${14*sc}px sans-serif`;x.strokeText(lab,px+20*sc,py-102*sc);x.fillText(lab,px+20*sc,py-102*sc)}}
const HC_WX={day:null,dusk:['sc-dusk','sc-peach'],night:['sc-night','sc-night-1'],rain:['sc-stone','sc-blue'],snow:['sc-stone-2','sc-sky-1'],ash:['sc-rose-2','sc-stone'],dust:['sc-sand-2','sc-sun']};
/* ---- the renderer (G-HC2, R-03 H1): on a software canvas the cost is the pixels touched each frame, so almost nothing is drawn
   as shapes per frame. Cached per drive and screen size (H.rc): the sky with its sun, moon or Earth and stars (copied only down to
   where the hills start); 3-4 parallax layers, each a strip cropped to its own band and twice the screen wide, drawn again only
   when the camera has moved past it; the ground in chunks of 320 world px (texture, water, road, mud and ice, rocks, bridges,
   roadside props) made once each; sprites for the car body, its wheels, bolts, fuel cans and particles. Per frame: image copies,
   a few small shapes (flags, balloons, rain) and the HUD numbers. The canvas holds at most 1 million pixels and drops to 0.85
   and 0.7 of them when frames run long (hcStart): on a software canvas each frame is also copied whole, so pixels cost twice. */
const HC_CW=320; // world px per ground chunk
const hcCan=(w,h)=>{const c=document.createElement('canvas');c.width=Math.max(1,Math.ceil(w));c.height=Math.max(1,Math.ceil(h));return c};
// the parallax layers: [parallax, colour role, base height (share of the screen), amplitude, f1, f2, snow caps, alpha, props]
// G-HC3 (R-03 H2): 4 ranges behind the road on every screen (a pale hazy range and the far range painted into the sky's strip,
// then two nearer strips: hills, and the near hills with trees), each fading toward the sky colour near its foot with a light rim
// on its ridge, and a foreground strip of tufts and stones in front of the earth at the bottom (parallax over 1). Each strip is
// cached and cropped to its band, so the frame copies as many pixels as before plus the low foreground band.
// pre (the sky strip only): the hazy range behind the far one [base height, amplitude, f1, f2, alpha]
function hcLayers(Wd,portrait){const a=portrait?1.45:1;
  return[[.07,Wd.far2,.5,130*a,.0028,.009,Wd.snowcap,1,0,[portrait?.4:.44,portrait?150:110,.0021,.007,.45]],
    [.18,Wd.far,.56,90*a,.0039,.012,Wd.id=='snow',1,0],[.35,Wd.mid,.6,64,.005,.013,0,1,1]]}
function hcRC(H,W,Hh,dpr){let R=H.rc;if(R&&R.W===W&&R.Hh===Hh)return R;
  const Wd=HCW[H.wi],portrait=Hh>W,sc=Math.min(Hh/470,W/(portrait?400:620))*1.05,wx=H.wx||'day',dark=wx=='night'||!!Wd.space;
  R=H.rc={W,Hh,dpr,sc,portrait,base:portrait?.66:.62,dark,lay:hcLayers(Wd,portrait).map(l=>({l,c:null,t0:0})),chunks:new Map(),spr:{}};
  // the sky is painted into the farthest layer's strip (it starts at the top of the screen); the sun, moon or Earth are drawn each frame
  const cols=HC_WX[wx]||Wd.sky;R.lay[0].sky=cols;R.skyCols=cols;
  // a cloud sprite
  R.fore={c:null,t0:0};
  const cl=hcCan(140*sc,60*sc),y=cl.getContext('2d');y.fillStyle=hcC(wx=='rain'||wx=='ash'?'e1':'w');y.beginPath();for(const[ox,oy,r]of[[30,34,22],[58,24,26],[86,30,24],[110,36,18],[64,40,22]]){y.moveTo((ox+r)*sc,oy*sc);y.arc(ox*sc,oy*sc,r*sc,0,7)}y.fill();R.cloud=cl;
  return R}
// a layer strip: twice the screen wide, cropped to the layer's band; t0 is the layer position at its left edge
function hcStrip(R,H,q,camX){const [par,col,yb,amp,f1,f2,cap,alpha,props,pre]=q.l,sc=R.sc,W=R.W,Hh=R.Hh;
  const left=(q.t0-camX*par)*sc;if(q.c&&left<=0&&left+q.c.width>=W)return left;
  q.t0=camX*par-(W*.5)/sc;const top=q.sky?0:Math.max(0,Math.floor(Hh*yb-amp*1.3*sc-(props?90*sc:0))),bot=q.bot=props?Hh:Math.min(Hh,Math.ceil(Hh*yb+amp*.25*sc+60*sc));q.top=top;
  const c=q.c&&q.c.width===Math.ceil(W*2)&&q.c.height===Math.max(1,bot-top)?q.c:hcCan(W*2,bot-top),x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);
  if(q.sky){const g=x.createLinearGradient(0,0,0,Hh);g.addColorStop(0,hcC(q.sky[0]));g.addColorStop(1,hcC(q.sky[1]));x.fillStyle=g;x.fillRect(0,0,c.width,c.height);
    if(R.dark){x.fillStyle=hcC('w');for(let t=Math.ceil(q.t0/23)*23;t<q.t0+c.width/sc;t+=23){const hsh=Math.abs(Math.sin(t*12.9898)*43758.5453)%1;if(hsh>.5)continue;x.globalAlpha=.4+hsh;const z=(1+(hsh*6|0)%3*.5)*R.dpr;x.fillRect((t-q.t0)*sc,hsh*2*Hh*.55,z,z)}x.globalAlpha=1}}
  if(pre){const [yb2,amp2,g1,g2,al2]=pre,ph=new Path2D();ph.moveTo(0,c.height);for(let sx=0;sx<=c.width+12;sx+=8){const t=q.t0*.6+sx/sc;ph.lineTo(sx,Hh*yb2-(Math.abs(Math.sin(t*g1))*amp2+Math.sin(t*g2)*amp2*.25)*sc)}
    ph.lineTo(c.width,c.height);ph.closePath();x.globalAlpha=al2;x.fillStyle=hcC(col);x.fill(ph);x.globalAlpha=1;
    const hz2=x.createLinearGradient(0,Hh*yb2-amp2*sc,0,c.height);hz2.addColorStop(0,hcA(R.skyCols[1],.15));hz2.addColorStop(1,hcA(R.skyCols[1],.55));x.fillStyle=hz2;x.fill(ph)}
  const yf=props?(t=>Hh*yb-(Math.sin(t*f1)*55+Math.sin(t*f2+1)*25)*sc):(t=>Hh*yb-(Math.abs(Math.sin(t*f1))*amp+Math.sin(t*f2)*amp*.25)*sc);
  const pts=[],path=new Path2D();path.moveTo(0,c.height);
  for(let sx=0;sx<=c.width+12;sx+=8){const y=yf(q.t0+sx/sc)-top;pts.push([sx,y]);path.lineTo(sx,y)}path.lineTo(c.width,c.height);path.closePath();
  x.globalAlpha=alpha;x.fillStyle=hcC(col);x.fill(path);x.globalAlpha=1;
  // depth: the farther the layer, the more it fades toward the sky near its foot; a light rim along the ridge
  const sk=R.skyCols[1],y0=Math.max(0,Math.min(c.height-1,Hh*yb-amp*sc-top)),hz=x.createLinearGradient(0,y0,0,c.height);
  hz.addColorStop(0,hcA(sk,par<.1?.12:0));hz.addColorStop(1,hcA(sk,par<.1?.5:par<.3?.35:.12));x.fillStyle=hz;x.fill(path);
  x.strokeStyle=hcA('w',R.dark?.12:.3);x.lineWidth=2.5*sc;x.beginPath();pts.forEach(([px,py],i)=>i?x.lineTo(px,py+1.2*sc):x.moveTo(px,py+1.2*sc));x.stroke();
  if(cap){x.fillStyle=hcC('w');for(let i=1;i<pts.length-1;i++){const[px,py]=pts[i];if(py<pts[i-1][1]&&py<=pts[i+1][1]&&py+top<Hh*yb-amp*.75*sc){x.beginPath();x.moveTo(px-20*sc,py+18*sc);x.lineTo(px,py);x.lineTo(px+20*sc,py+18*sc);x.fill()}}}
  if(props){const Wd=HCW[H.wi];for(let i=Math.floor(q.t0/150)-1;i<(q.t0+c.width/sc)/150+1;i++){const t=i*150+((i*73)%60);if((i*7)%3==0)continue;hcProp(x,Wd.prop,(t-q.t0)*sc,yf(t)-top,sc*.8,i)}
    x.fillStyle=hcC('k');x.globalAlpha=.08;x.fillRect(0,c.height*.55,c.width,c.height*.45);x.globalAlpha=1}
  q.c=c;return(q.t0-camX*par)*sc}
// G-HC3: the foreground strip: tufts, stones and mounds at the bottom edge, passing faster than the road (twice the screen wide,
// drawn again only when the camera has moved past it)
function hcFore(R,H,camX){const q=R.fore,sc=R.sc,W=R.W,Hh=R.Hh,par=1.25,Wd=HCW[H.wi];
  const left=(q.t0-camX*par)*sc;if(q.c&&left<=0&&left+q.c.width>=W)return left;
  q.t0=camX*par-(W*.5)/sc;const bh=Math.ceil(Math.min(Hh*.12,64*sc)),c=q.c&&q.c.width===Math.ceil(W*2)&&q.c.height===bh?q.c:hcCan(W*2,bh),x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);
  const grass=Wd.id=='meadow'||Wd.id=='jungle',dark=hcA('k',R.dark?.35:.2),tuft=hcC(Wd.top2);
  for(let i=Math.floor(q.t0/90)-1;i<(q.t0+c.width/sc)/90+1;i++){const hsh=Math.abs(Math.sin(i*12.9898)*43758.5453)%1;if(hsh<.3)continue;const px=(i*90+hsh*50-q.t0)*sc,r=(14+hsh*20)*sc;
    x.fillStyle=dark;x.beginPath();x.ellipse(px,c.height+r*.2,r*1.4,r,0,Math.PI,0);x.fill();
    if(grass||Wd.id=='snow'){x.fillStyle=Wd.id=='snow'?hcC('w2'):tuft;for(let k=-2;k<=2;k++){const bx=px+k*r*.45,ty=c.height-r*(.7-Math.abs(k)*.14);x.beginPath();x.moveTo(bx-3*sc,c.height-r*.25);x.lineTo(bx+k*2*sc,ty);x.lineTo(bx+3*sc,c.height-r*.25);x.fill()}}
    else{x.fillStyle=hcA('w',.18);x.beginPath();x.ellipse(px-r*.4,c.height-r*.55,r*.35,r*.18,-.3,0,7);x.fill()}}
  q.c=c;return(q.t0-camX*par)*sc}
// a ground chunk: everything on the road that never moves, drawn once
function hcChunk(R,H,k){let ch=R.chunks.get(k);if(ch)return ch;const C=H.C,Wd=HCW[H.wi],sc=R.sc,x0=k*HC_CW,x1=x0+HC_CW;
  const gH=w0=>{const i=hcIx(C,w0);if(C.fl[i]&4){const b=C.bridges.find(q=>w0>=q.x0&&w0<=q.x1);if(b){const u=Math.min(1,(w0-b.x0)/40,(b.x1-w0)/40);return b.y-90*Math.max(0,u)}}return hcH(C,w0)};
  let lo=1e9,hi=-1e9;for(let w0=x0-40;w0<=x1+40;w0+=10){const v=hcH(C,w0);lo=Math.min(lo,gH(w0),v);hi=Math.max(hi,v)}
  const top=hi+180,bot=lo-240,c=hcCan(HC_CW*sc+2,(top-bot)*sc),x=c.getContext('2d'),X=w0=>(w0-x0)*sc,Y=y=>(top-y)*sc,DY=34*sc,hd=DY/2;
  const pts=[];for(let w0=x0-30;w0<=x1+30;w0+=5)pts.push([X(w0),Y(gH(w0)),w0]);
  x.beginPath();x.moveTo(pts[0][0],c.height+2);for(const[px,py]of pts)x.lineTo(px,py+hd);x.lineTo(pts[pts.length-1][0],c.height+2);x.closePath();
  const pat=x.createPattern(texFor(H.wi),'repeat');try{pat.setTransform(new DOMMatrix().translateSelf(-x0*sc,top*sc).scaleSelf(sc*1.2,sc*1.2))}catch(e){}x.fillStyle=pat;x.fill();
  x.fillStyle=hcC('k');x.globalAlpha=.12;x.fillRect(0,Y(lo)-20*sc,c.width,c.height);x.globalAlpha=1;
  const wcol=hcC(Wd.water),wtop=hcC(Wd.pit=='lava'?'y':Wd.pit=='crater'?'e3':'c1');
  const pool=(a,b,t,u)=>{if(b<x0-40||a>x1+40)return;x.fillStyle=wcol;x.fillRect(X(a),Y(t),(b-a)*sc,(t-u)*sc);x.strokeStyle=wtop;x.lineWidth=3*sc;x.beginPath();x.moveTo(X(a),Y(t));x.lineTo(X(b),Y(t));x.stroke();
    x.fillStyle=hcA('w',.35);for(let w0=a+14;w0<b-10;w0+=46)x.fillRect(X(w0),Y(t)+5*sc,18*sc,2*sc)};
  for(const p of C.pits)if(Wd.pit!='crater')pool(p.x0+4,p.x1-4,p.y-p.d*.5,p.y-p.d);
  for(const b of C.bridges)pool(b.x0+20,b.x1-20,b.y-60,b.y-95);
  x.lineJoin='round';const road=(w,col,dy)=>{x.lineWidth=w;x.strokeStyle=col;x.beginPath();let pen=false;for(const[px,py,w0]of pts){if(C.fl[hcIx(C,w0)]&5){pen=false;continue}pen?x.lineTo(px,py+dy):x.moveTo(px,py+dy);pen=true}x.stroke()};
  road(DY,hcC(Wd.top),0);road(5*sc,hcA('w',.45),-hd+2*sc);road(3*sc,hcC(Wd.top2),hd);
  for(const s of C.soft){if(s.x1<x0-30||s.x0>x1+30)continue;const so=SOFT[s.k];x.strokeStyle=hcC(so.c);x.lineWidth=DY*.9;x.beginPath();let pen=false;for(let w0=Math.max(s.x0,x0-30);w0<=Math.min(s.x1,x1+30);w0+=6){if(C.fl[hcIx(C,w0)]&1){pen=false;continue}const py=Y(hcH(C,w0));pen?x.lineTo(X(w0),py):x.moveTo(X(w0),py);pen=true}x.stroke();
    x.fillStyle=hcC(so.c2);for(let w0=s.x0+20;w0<s.x1;w0+=45)if(w0>x0-20&&w0<x1+20){x.beginPath();x.arc(X(w0),Y(hcH(C,w0))-4*sc,3.4*sc,0,7);x.fill()}
    const mx=(s.x0+s.x1)/2;if(mx>=x0&&mx<x1){x.fillStyle=hcC(s.k=='ice'?'b3':'w');x.font=`bold ${13*sc}px sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText(so.label,X(mx),Y(hcH(C,mx)+46))}}
  for(const f of C.fords)pool(f.x0,f.x1,f.y,f.y-30);
  for(const b of C.bridges){if(b.x1<x0-30||b.x0>x1+30)continue;x.fillStyle=hcC('n2');x.fillRect(X(b.x0),Y(b.y)-hd*.4,(b.x1-b.x0)*sc,hd*.9);x.fillStyle=hcC('n');for(let w0=b.x0;w0<b.x1;w0+=24)x.fillRect(X(w0)+1,Y(b.y)-hd*.4,22*sc-2,hd*.5);
    x.strokeStyle=hcC('n3');x.lineWidth=4*sc;const n=Math.max(1,Math.round((b.x1-b.x0)/120));for(let j=0;j<=n;j++){const w0=b.x0+(b.x1-b.x0)*j/n;x.beginPath();x.moveTo(X(w0),Y(b.y)+hd*.5);x.lineTo(X(w0),Y(b.y)-46*sc);x.stroke()}
    x.lineWidth=2*sc;x.beginPath();x.moveTo(X(b.x0),Y(b.y)-42*sc);x.quadraticCurveTo(X((b.x0+b.x1)/2),Y(b.y)-30*sc,X(b.x1),Y(b.y)-42*sc);x.stroke()}
  for(const r of C.rocks){if(r.x1<x0-40||r.x0>x1+40)continue;const bx=X((r.x0+r.x1)/2),by=Y(r.y),rw=(r.x1-r.x0)/2*sc,rh=r.h*sc;x.fillStyle=hcC(Wd.space?'e':'e2');x.beginPath();x.ellipse(bx,by,rw*1.05,rh+3*sc,0,Math.PI,0);x.fill();
    x.fillStyle=hcC(Wd.space?'e1':'e');x.beginPath();x.ellipse(bx-rw*.25,by-rh*.45,rw*.45,rh*.4,0,0,7);x.fill();if(Wd.id=='snow'){x.fillStyle=hcC('w');x.beginPath();x.ellipse(bx,by-rh*.85,rw*.6,rh*.25,0,Math.PI,0);x.fill()}}
  if(Wd.id=='meadow'||Wd.id=='jungle'){x.fillStyle=hcC(Wd.top2);for(let w0=Math.ceil((x0-10)/22)*22;w0<x1+10;w0+=22){if(C.fl[hcIx(C,w0)]||C.sk[hcIx(C,w0)])continue;const px=X(w0),py=Y(hcH(C,w0))-hd+2*sc;x.beginPath();x.moveTo(px-3*sc,py);x.lineTo(px+((w0/22)%2?2:-2)*sc,py-9*sc);x.lineTo(px+3*sc,py);x.fill()}}
  if(Wd.prop)for(let i=Math.floor((x0-120)/230);i<(x1+120)/230;i++){if((i*13)%5<2)continue;const w0=i*230+((i*57)%90);if(w0<200||C.fl[hcIx(C,w0)]||C.fl[hcIx(C,w0+60)]||C.fl[hcIx(C,w0-60)])continue;hcProp(x,Wd.prop,X(w0),Y(hcH(C,w0))-hd+2*sc,sc*1.15,i+3)}
  ch={c,top,bot};R.chunks.set(k,ch);
  for(const kk of R.chunks.keys())if(kk<k-6||kk>k+6)R.chunks.delete(kk);
  return ch}
// small sprites (drawn once per screen size): a soft dot per colour, a bolt, a fuel can, the car body and its wheel
function hcDot(R,col){const k='d'+col;if(R.spr[k])return R.spr[k];const c=hcCan(32,32),x=c.getContext('2d');x.fillStyle=hcC(col);x.beginPath();x.arc(16,16,15,0,7);x.fill();return R.spr[k]=c}
function hcSpr(R,k,w,h,draw){if(R.spr[k])return R.spr[k];const c=hcCan(w,h);draw(c.getContext('2d'),c.width,c.height);return R.spr[k]=c}
function hcBody(R,H){const P=hcPetSpr(),k='body'+H.veh+H.paint+(H.top||'')+(P&&P.c?1:0);if(R.spr[k])return R.spr[k];const V=VEH[H.veh]||VEH.jeep,sc=R.sc,w=(V.L+160)*sc,h=170*sc;
  const c=hcCan(w,h);drawVehicle(c.getContext('2d'),H.veh,c.width/2,h*.6,0,sc,H.paint,null,null,0,{top:H.top});c.ox=c.width/2;c.oy=h*.6;return R.spr[k]=c}
// the sun (or the moon, or the Earth seen from the Moon) and the clouds, just after the sky
function hcSun(x,R,wx,Wd){const H=HC,W=R.W,Hh=R.Hh,sc=R.sc,T=H.calm?0:H.t;
  if(Wd.space){const ex=W*.8,ey=Hh*.17,er=34*sc;x.fillStyle=hcC('b');x.beginPath();x.arc(ex,ey,er,0,7);x.fill();x.fillStyle=hcC('g');x.beginPath();x.ellipse(ex-er*.3,ey-er*.2,er*.35,er*.5,.4,0,7);x.ellipse(ex+er*.4,ey+er*.3,er*.3,er*.25,0,0,7);x.fill();return}
  if(R.dark){x.fillStyle=hcC('m');x.beginPath();x.arc(W*.82,Hh*.15,26*sc,0,7);x.fill();x.fillStyle=hcC(R.skyCols[0]);x.beginPath();x.arc(W*.82+10*sc,Hh*.15-6*sc,24*sc,0,7);x.fill()}
  else if(wx!='rain'&&wx!='ash'){const sx0=W*.84,sy0=Hh*.14,r0=40*sc;x.fillStyle=hcA(wx=='dusk'?'o1':'y1',.5);x.beginPath();x.arc(sx0,sy0,r0*1.6,0,7);x.fill();x.fillStyle=hcC(wx=='dusk'?'o':'y');x.beginPath();x.arc(sx0,sy0,r0,0,7);x.fill()}
  x.globalAlpha=wx=='night'?.25:.9;for(let i=0;i<5;i++){const px=((i*420-H.camX*.08*sc-T*12*R.dpr)%(W+300)+W+300)%(W+300)-150;x.drawImage(R.cloud,Math.round(px),Math.round(Hh*(.06+(i%3)*.08)))}x.globalAlpha=1}
function hcDraw(x,W,Hh,dpr){const H=HC,C=H.C,Wd=HCW[H.wi],wx=H.wx||'day',cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2,ang=hcAng(H);
  if(Math.abs(x.canvas.width-x.canvas.clientWidth*dpr)>2)H.size();
  const R=hcRC(H,W,Hh,dpr),sc=R.sc,sp=H.speed||0,T=H.calm?0:H.t;
  if(H.camX==null){H.camX=cx;H.camY=cy}
  H.camX+=(cx+W*.1/sc-H.camX)*.09;H.camY+=(cy+30-H.camY)*.07;if(H.shake>0)H.shake-=1/60;
  const sh=H.shake>0&&!H.calm?Math.round((Math.random()-.5)*14*H.shake*dpr):0;
  const SX=wxp=>(wxp-H.camX)*sc+W*.38+sh,SY=wy=>Hh*R.base-(wy-H.camY)*sc+sh,WX=sx=>(sx-W*.38)/sc+H.camX;
  // GL-01: the 3D look draws the sky, ranges, ground and car on its own canvas; this one is cleared and carries the rest
  const gl=!!(H.gl&&!H.gl.off&&hcGlFrame(H,W,Hh,dpr,sh)),left=WX(0)-80,right=WX(W)+80;
  if(typeof FPS!='undefined')FPS.tag=gl?'3D':'2D'; // GL-01: the speed box says which look is drawing
  if(gl)x.clearRect(0,0,W,Hh);
  else{
  // sky, clouds, parallax strips
  for(const q of R.lay){const l=hcStrip(R,H,q,H.camX);x.drawImage(q.c,Math.round(l),q.top);if(q.sky)hcSun(x,R,wx,Wd)}
  // the ground: cached chunks, and plain earth under them
  const dirt=hcC(Wd.dirt2);
  for(let k=Math.floor(WX(0)/HC_CW);k<=Math.floor(WX(W)/HC_CW);k++){const ch=hcChunk(R,H,k),px=Math.round(SX(k*HC_CW)),py=Math.round(SY(ch.top));x.drawImage(ch.c,px,py);
    const yb=py+ch.c.height;if(yb<Hh){x.fillStyle=dirt;x.fillRect(px,yb-1,ch.c.width,Hh-yb+1)}}}
  x.textAlign='center';x.textBaseline='middle';
  if(gl)hcGlLabels(x,H,SX,SY,left,right,sc);
  // checkpoints, the finish, the best
  C.cps.forEach((cpx,k)=>{if(!k||cpx<left||cpx>right)return;hcFlag(x,SX(cpx),SY(hcH(C,cpx)),sc,k<=H.cpi?'g':'o',C.endless?Math.round((cpx-60)/20)+' m':'')});
  if(H.best>5){const bx=60+H.best*20;if(bx>left&&bx<right)hcFlag(x,SX(bx),SY(hcH(C,bx)),sc*1.2,'y','Best')}
  if(H.dayX&&H.dayX>left&&H.dayX<right)hcFlag(x,SX(H.dayX),SY(hcH(C,H.dayX)),sc*1.3,H.dayHit?'g':'y','Today');
  if(C.fin!=null&&C.fin>left&&C.fin<right+200){const fin=hcSpr(R,'fin',120*sc,200*sc,(y,w,h)=>{const s=sc,px=w/2,ht=150*s;y.fillStyle=hcC('e1');y.fillRect(px-50*s,h-ht,8*s,ht);y.fillRect(px+42*s,h-ht,8*s,ht);
      for(let r=0;r<2;r++)for(let c=0;c<10;c++){y.fillStyle=hcC((r+c)%2?'k':'w');y.fillRect(px-50*s+c*10*s,h-ht-20*s+r*10*s,10*s,10*s)}
      y.fillStyle=hcC('r');rr(y,px-46*s,h-ht-48*s,92*s,26*s,6*s);y.fill();y.fillStyle=hcC('w');y.font=`bold ${17*s}px sans-serif`;y.textAlign='center';y.textBaseline='middle';y.fillText('FINISH',px,h-ht-35*s)});
    x.drawImage(fin,Math.round(SX(C.fin)-fin.width/2),Math.round(SY(hcH(C,C.fin))-fin.height))}
  // pick-ups
  const can=hcSpr(R,'fuel',56*sc,56*sc,(y,w,h)=>{const px=w/2,py=h/2,s=sc;y.fillStyle=hcA('y',.35);y.beginPath();y.arc(px,py,26*s,0,7);y.fill();y.fillStyle=hcC('r2');rr(y,px-12*s,py-14*s,24*s,30*s,4*s);y.fill();
    y.fillStyle=hcC('y');y.font=`bold ${14*s}px sans-serif`;y.textAlign='center';y.textBaseline='middle';y.fillText('F',px,py+2*s);y.strokeStyle=hcC('r3');y.lineWidth=3*s;y.beginPath();y.moveTo(px-6*s,py-14*s);y.lineTo(px-6*s,py-20*s);y.lineTo(px+6*s,py-20*s);y.stroke()});
  for(let k=0;k<C.fuel.length;k++){const fx=C.fuel[k];if(fx<left||fx>right||H.took.has('f'+k))continue;x.drawImage(can,Math.round(SX(fx)-can.width/2),Math.round(SY(hcH(C,fx)+H.R+22+Math.sin(T*3)*4)-can.height/2))}
  if(H.A.ball)for(let k=0;k<C.balloons.length;k++){const bx=C.balloons[k];if(bx<left||bx>right||H.took.has('a'+k))continue;hcBalloons(x,SX(bx),SY(hcH(C,bx)+60+Math.sin(T*2)*6),sc)}
  for(const z of C.looks){if(z.x1<left||z.x0>right)continue;const on=H.stopped,lk=hcSpr(R,'look'+(on?1:0),120*sc,120*sc,(y,w,h)=>{const s=sc,px=w/2;y.fillStyle=hcC('n2');y.fillRect(px-4*s,h-70*s,8*s,70*s);
      y.fillStyle=hcC(on?'g3':'b2');rr(y,px-52*s,h-112*s,104*s,44*s,8*s);y.fill();y.fillStyle=hcC('w');y.font=`bold ${16*s}px sans-serif`;y.textAlign='center';y.textBaseline='middle';y.fillText('LOOKOUT',px,h-90*s)});
    x.fillStyle=hcA(on?'g':'b',.35);for(let q=z.x0;q<z.x1;q+=20){const a=SX(q),b=SY(hcH(C,q)),c=SX(q+12),d=SY(hcH(C,q+12));x.beginPath();x.moveTo(a,b);x.lineTo(c,d);x.lineTo(c,d+6*sc);x.lineTo(a,b+6*sc);x.fill()}
    const mx=(z.x0+z.x1)/2;x.drawImage(lk,Math.round(SX(mx)-lk.width/2),Math.round(SY(hcH(C,mx))-lk.height))}
  for(let k=0;k<C.stars.length;k++){const s=C.stars[k];if(s.x<left||s.x>right||H.took.has('s'+k))continue;hcStarD(x,SX(s.x),SY(s.y),18*sc*(1+Math.sin(T*4)*.08))}
  for(const px of C.pads){if(px<left||px>right)continue;x.fillStyle=hcC('o');for(let j=0;j<3;j++){const ax=SX(px+j*20),ay=SY(hcH(C,px+j*20));x.beginPath();x.moveTo(ax,ay-14*sc);x.lineTo(ax+12*sc,ay-8*sc);x.lineTo(ax,ay-2*sc);x.fill()}}
  const nut=hcSpr(R,'nut',28*sc,28*sc,(y,w,h)=>{const px=w/2,py=h/2,s=sc;y.fillStyle=hcC('y');y.strokeStyle=hcC('y3');y.lineWidth=2.5*s;y.beginPath();for(let q=0;q<6;q++){const a=q*1.047+.5;y[q?'lineTo':'moveTo'](px+Math.cos(a)*11*s,py+Math.sin(a)*11*s)}y.closePath();y.fill();y.stroke();
    y.fillStyle=hcC('y3');y.beginPath();y.arc(px,py,4*s,0,7);y.fill();y.fillStyle=hcA('w',.7);y.beginPath();y.arc(px-4*s,py-4*s,2*s,0,7);y.fill()});
  for(let j=Math.max(0,H.ci-3);j<C.coins.length;j++){const o=C.coins[j];if(o.x>right)break;if(o.x<left||H.took.has(j))continue;x.drawImage(nut,Math.round(SX(o.x)-nut.width/2),Math.round(SY(o.y)+Math.sin(T*4+j)*3*sc-nut.height/2))}
  if(H.pops.length){x.fillStyle=hcC('y');x.strokeStyle=hcC('n3');x.lineWidth=3*sc;x.font=`bold ${16*sc}px sans-serif`;for(const p of H.pops){x.globalAlpha=Math.min(1,p.l*2);x.strokeText('+1',SX(p.x),SY(p.y));x.fillText('+1',SX(p.x),SY(p.y))}x.globalAlpha=1}
  for(const d of H.parts){x.globalAlpha=Math.max(0,Math.min(1,d.l*1.4))*(d.smoke?.5:1);if(d.star)hcStarD(x,SX(d.x),SY(d.y),7*sc);else{const r=(d.smoke?d.s+(.8-d.l)*18:d.s)*sc;x.drawImage(hcDot(R,d.c),SX(d.x)-r,SY(d.y)-r,r*2,r*2)}}x.globalAlpha=1;
  if(H.boss)hcRivalDraw(x,R,H,SX,SY,sc,left,right,T); // G-MOVES: the rival (both looks draw it here, behind the car)
  // the car from its sprites (it blinks while it starts again); in the 3D look only its balloons are drawn here
  if(gl){if(H.ballT>0&&(H.crashT<=0||Math.floor(H.crashT*8)%2)){const lift=H.R+6,bx=SX(cx)-Math.sin(ang)*lift*sc,by=SY(cy)-Math.cos(ang)*lift*sc;hcBalloons(x,bx,by-90*sc,sc,bx,by-40*sc)}}
  else if(H.crashT<=0||Math.floor(H.crashT*8)%2){const dist=Math.max(0,(cy-hcH(C,cx))*sc);x.globalAlpha=Math.max(.05,.25-dist/600);x.drawImage(hcDot(R,'k'),SX(cx)-64*sc,SY(hcH(C,cx))-5*sc,128*sc,14*sc);x.globalAlpha=1;
    const lift=H.R+6,bx=SX(cx)-Math.sin(ang)*lift*sc,by=SY(cy)-Math.cos(ang)*lift*sc;
    if(H.ballT>0)hcBalloons(x,bx,by-90*sc,sc,bx,by-40*sc);
    const body=hcBody(R,H);x.save();x.translate(bx,by);x.rotate(-ang);x.translate(0,-H.bob*sc);x.drawImage(body,-body.ox,-body.oy);
    if(H.crates){x.scale(sc,sc);const cp={jeep:[-44,-18],buggy:[-30,-12],monster:[-50,-30],bike:[-26,-20],tractor:[14,-26],bus:[-30,-50]}[H.veh]||[-40,-18];
      for(let i=0;i<H.crates;i++){const ox=cp[0]+(i==2?9:i*18),oy=cp[1]-(i==2?17:0)-17;x.fillStyle=hcC('n');x.strokeStyle=hcC('n3');x.lineWidth=2;x.fillRect(ox,oy,17,17);x.strokeRect(ox,oy,17,17);x.beginPath();x.moveTo(ox,oy);x.lineTo(ox+17,oy+17);x.moveTo(ox+17,oy);x.lineTo(ox,oy+17);x.stroke()}}
    x.restore();
    const V=VEH[H.veh]||VEH.jeep,wr=V.R*sc,wh=hcSpr(R,'wh'+H.veh+H.paint+(H.rim||''),wr*2+8*sc,wr*2+8*sc,(y,w,h)=>wheel(y,w/2,h/2,0,sc,0,0,0,H.paint,V.R,H.rim)),c0=Math.cos(-ang),s0=Math.sin(-ang),wy=V.R+6;
    [[-V.L/2,H.w1.rot],[V.L/2,H.w2.rot]].forEach(([ox,rot])=>{const px=bx+(ox*c0-wy*s0)*sc,py=by+(ox*s0+wy*c0)*sc;x.save();x.translate(px,py);x.rotate(rot);x.drawImage(wh,-wh.width/2,-wh.height/2);x.restore()})}
  // the foreground strip (in front of the earth at the bottom)
  if(!gl){const l=hcFore(R,H,H.camX);x.drawImage(R.fore.c,Math.round(l),Hh-R.fore.c.height)}
  // weather: one path a frame
  if(wx=='rain'||wx=='snow'||wx=='ash'||wx=='dust'){const n=wx=='rain'?70:50,fall=wx=='rain'?520:wx=='dust'?30:90,drift=wx=='dust'?-260:-40;x.fillStyle=x.strokeStyle=hcC(wx=='ash'?'e3':wx=='dust'?'t':'w');x.globalAlpha=wx=='rain'?.55:.8;x.lineWidth=1.5*dpr;x.beginPath();
    for(let i=0;i<n;i++){const px=(((i*97.3+T*drift*dpr-H.camX*sc*.6)%W)+W)%W,py=(((i*61.7+T*fall*dpr)%Hh)+Hh)%Hh;if(wx=='rain'){x.moveTo(px,py);x.lineTo(px-3*dpr,py+12*dpr)}else x.rect(px,py,3*dpr,3*dpr)}
    wx=='rain'?x.stroke():x.fill();x.globalAlpha=1}
  // night: the dark is one shape with holes for the headlights and the glow round the car
  if(wx=='night'){const vx=SX(cx),vy=SY(cy)-20*sc,dx=Math.cos(ang),dy=-Math.sin(ang),L1=520*sc,s2=.42;x.fillStyle=hcA('sc-night',.72);x.beginPath();x.rect(0,0,W,Hh);
    x.moveTo(vx+dx*30*sc,vy+dy*30*sc);x.lineTo(vx+(dx*Math.cos(s2)-dy*Math.sin(s2))*L1,vy+(dy*Math.cos(s2)+dx*Math.sin(s2))*L1);x.lineTo(vx+(dx*Math.cos(-s2)-dy*Math.sin(-s2))*L1,vy+(dy*Math.cos(-s2)+dx*Math.sin(-s2))*L1);x.closePath();
    x.moveTo(vx+110*sc,vy);x.arc(vx,vy,110*sc,0,7);x.fill('evenodd');x.fillStyle=hcA('sc-night',.3);x.beginPath();x.moveTo(vx+110*sc,vy);x.arc(vx,vy,110*sc,0,7);x.fill()}
  // speedometer
  const gr=Math.min(W,Hh)*.085,gx=W/2,gy=Hh-gr*.55-10*dpr,spd=Math.round(sp/20*3.6),fr=Math.min(1,sp/(H.maxV*1.15));
  x.fillStyle=hcA('k',.65);x.beginPath();x.arc(gx,gy,gr,Math.PI,0);x.fill();x.lineWidth=gr*.12;x.strokeStyle=hcC(sp/H.maxV>.85?'r':'g');x.beginPath();x.arc(gx,gy,gr*.82,Math.PI,Math.PI+Math.PI*fr);x.stroke();
  x.fillStyle=hcC('w');x.font=`bold ${gr*.38}px sans-serif`;x.fillText(spd,gx,gy-gr*.28);x.font=`${gr*.18}px sans-serif`;x.fillText('km/h',gx,gy-gr*.02);
  hcHud(H)}
function hcBalloons(x,px,py,sc,tx,ty){const cols=['r','y','b'];x.strokeStyle=hcC('e2');x.lineWidth=1.5*sc;for(let i=0;i<3;i++){const bx=px+(i-1)*16*sc,by=py-(i==1?10:0)*sc;x.beginPath();x.moveTo(bx,by+16*sc);x.lineTo(tx??px,ty??py+50*sc);x.stroke()}
  for(let i=0;i<3;i++){const bx=px+(i-1)*16*sc,by=py-(i==1?10:0)*sc;x.fillStyle=hcC(cols[i]);x.beginPath();x.ellipse(bx,by,12*sc,15*sc,0,0,7);x.fill();x.fillStyle=hcA('w',.6);x.beginPath();x.ellipse(bx-4*sc,by-5*sc,3*sc,5*sc,-.4,0,7);x.fill()}}
function hcStarD(x,px,py,r){x.fillStyle=hcC('y');x.strokeStyle=hcC('y3');x.lineWidth=Math.max(1,r*.12);x.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?r*.45:r;x.lineTo(px+Math.cos(a)*q,py+Math.sin(a)*q)}x.closePath();x.fill();x.stroke()}
// the HUD numbers (DOM): fuel gauge, distance or distance to the flag, bolts
function hcHud(H){const f=$('#hcf');if(f){const v=Math.round(H.fuel);if(v!==H._fv){H._fv=v;f.style.transform=`scaleX(${(v/100).toFixed(2)})`;f.parentNode.parentNode.classList.toggle('low',v<25)}}
  const C=H.C,m=Math.floor((H.maxX-60)/20),d=$('#hcd');
  if(d){const L=C.fin!=null?Math.floor((C.fin-60)/20):0,txt=C.fin!=null?`${Math.min(m,L)} / ${L} m`:`${m} m`;if(txt!==H._dt){H._dt=txt;d.textContent=txt;const pb=$('#hcpb'),goal=C.fin!=null?L:Math.max(H.best,100)*1.05;if(pb)pb.style.transform=`scaleX(${Math.min(1,m/goal).toFixed(3)})`;
    const bs=$('#hcbest');if(bs){bs.style.left=Math.min(100,H.best/goal*100)+'%';bs.style.display=C.fin==null&&H.best>5?'block':'none'}}}
  const b=$('#hcb');if(b&&b.textContent!=String(H.bolts))b.textContent=H.bolts;
  const rv=$('#hcrv');if(rv&&H.boss&&C.fin){const f=Math.round((hcRivalX(H)-60)/(C.fin-60)*200)/2;if(f!==H._rv){H._rv=f;rv.style.left=f+'%'}}}
// G-MOVES: the rival's truck, a small sprite drawn once (body in its helmet colour, two wheels, a round head), on the road at its place
function hcRivalDraw(x,R,H,SX,SY,sc,left,right,T){const C=H.C,rx=hcRivalX(H);if(rx<left||rx>right)return;const B=HC_BOSS[H.wi];
  const spr=hcSpr(R,'rival'+H.wi,150*sc,120*sc,(y,w,h)=>{const s=sc,cx=w/2,gy=h-24*s;
    y.fillStyle=hcC(B[2]+'2');rr(y,cx-54*s,gy-44*s,108*s,30*s,10*s);y.fill();y.fillStyle=hcC(B[2]);rr(y,cx-52*s,gy-46*s,104*s,26*s,10*s);y.fill();
    y.fillStyle=hcC('w');rr(y,cx-4*s,gy-70*s,34*s,26*s,6*s);y.fill();y.fillStyle=hcC('c1');rr(y,cx,gy-66*s,26*s,18*s,4*s);y.fill();
    y.fillStyle=hcC(B[2]+'2');y.beginPath();y.arc(cx+11*s,gy-56*s,10*s,Math.PI,0);y.fill();y.fillStyle=hcC('w');y.beginPath();y.arc(cx+16*s,gy-58*s,3.4*s,0,7);y.fill(); // the driver, facing ahead
    y.fillStyle=hcC('k');y.beginPath();y.arc(cx+17*s,gy-58*s,1.8*s,0,7);y.fill();
    y.fillStyle=hcC('e3');for(const ox of[-34,34]){y.beginPath();y.arc(cx+ox*s,gy-12*s,17*s,0,7);y.fill()}
    y.fillStyle=hcC('e1');for(const ox of[-34,34]){y.beginPath();y.arc(cx+ox*s,gy-12*s,7*s,0,7);y.fill()}
    y.fillStyle=hcC('y');rr(y,cx+46*s,gy-42*s,8*s,8*s,2*s);y.fill(); // a headlight at the front
    y.fillStyle=hcC('w');y.font=`bold ${15*s}px sans-serif`;y.textAlign='center';y.textBaseline='middle';y.strokeStyle=hcC('k');y.lineWidth=4*s;y.strokeText(B[0],cx,gy-90*s);y.fillText(B[0],cx,gy-90*s)});
  const a=hcSlope(C,rx),px=SX(rx),py=SY(hcH(C,rx));x.save();x.translate(px,py);x.rotate(-a);x.globalAlpha=.92;x.drawImage(spr,-spr.width/2,-spr.height+6*sc);x.restore()}
