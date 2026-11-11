/* ---------- play time ---------- */
/* Game time rules (P5-09). The bank (S.pt.bank, seconds) fills from learning and is spent in the Game Room.
   Earning: ptCalc() for a finished round, a Daily Review, a test, a boss and (g.bt) a solved puzzle. Each result has `lines`,
   the plain reasons the child sees ("+1 min Perfect score"). Fact Sprint (57-fluency.js) and Speed Race pay with their own lines.
   Spending: ptLeft() is the seconds a game may run now. It is 0 while any rule below says no, and ptLine() says why, in one plain line:
     1. paused by a grown-up (S.ptCfg.pause)
     2. learning first (S.ptCfg.need minutes of learning today, from the activity log; the grown-up can open today anyway: S.pt.open)
     3. the daily play limit (S.ptCfg.max minutes, 0 = none)
     4. nothing in the bank
   Every field is read with a default, so an old save works as before (need 0 = no learning first). The day turns at local midnight
   (today()). Games call ptLeft(), ptWhyNot() and pt() only. */
function ptCfg(){const c=S.ptCfg=Object.assign({per:3,max:30,pause:false,need:0},S.ptCfg||{});c.need=Math.max(0,Math.min(120,Math.floor(+c.need)||0));return c}
function pt(){const p=S.pt||(S.pt={bank:180,day:'',used:0});if(p.day!==today()){p.day=today();p.used=0}return p}
const fmtT=s=>{s=Math.max(0,Math.floor(s));return`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`};
// learning first: seconds of learning today (all subjects, puzzles and sprints included) against the grown-up's minutes
function ptGate(){const c=ptCfg(),p=pt(),need=c.need*60,open=p.open===today();
  if(!need)return{need:0,done:0,more:0,open,locked:false};
  const met=p.met&&p.met.day===today()&&p.met.min>=c.need; // once met today it stays met, and the games do not read the log every frame
  let done=need;if(!met){try{const e=ACT.entry(today());done=e?e.sec:0}catch(e){done=0}if(done>=need)p.met={day:today(),min:c.need}}
  return{need,done:Math.min(done,need),more:Math.max(0,need-done),open,locked:done<need&&!open}}
function ptLeft(){const p=pt(),c=ptCfg();if(c.pause||ptGate().locked)return 0;const cap=c.max?c.max*60-p.used:1e9;return Math.max(0,Math.min(p.bank,cap))}
function ptEarn(sec){pt().bank+=sec;save()}
// everything the screens and tests need to know about game time right now; why: ok, paused, learn, max or empty
function ptState(){const p=pt(),c=ptCfg(),g=ptGate(),left=ptLeft(),capSec=c.max?c.max*60:0;
  const why=c.pause?'paused':g.locked?'learn':c.max&&p.used>=capSec?'max':p.bank<=0?'empty':'ok';
  return{left,bank:p.bank,used:p.used,max:c.max,need:c.need,learned:g.done,more:g.more,open:g.open,paused:!!c.pause,why}}
const fmtM=s=>{const m=Math.round(s/30)/2;return(m%1?`${Math.floor(m)||''}½`:`${m}`)+' min'};
// one plain line for the child: how much time there is, and why it may not be spent
function ptLine(){const t=ptState(),min=Math.ceil(t.more/60),saved=t.bank>0?`You have ${fmtT(t.bank)} saved. `:'';
  if(t.why=='paused')return'Game time is paused by a grown-up.';
  if(t.why=='learn')return`${saved}Learn ${min} more minute${min==1?'':'s'} to open the Game Room today.`;
  if(t.why=='max')return`That's all the game time for today (${t.max} min). Come back tomorrow!`;
  if(t.why=='empty')return'Finish a learning round to earn game time!';
  return t.max&&t.left<t.bank?`You can play ${fmtT(t.left)} more today (the daily limit is ${t.max} min).`:'Every learning round earns more. Have fun!'}
function ptWhyNot(){return ptLine()}
// P5-09: a Brain Teaser result. b = {band, stars, hints, first, daily, room (seconds still allowed today)}. Amounts: BT.gameSec / REPLAY_SEC / DAILY_SEC.
function ptBT(b,mis){const L=[];let t=0;const add=(v,l)=>{if(v>0){t+=v;L.push([v,l])}};
  if(b.first)add(BT.gameSec(b.band,b.stars),b.hints?`Puzzle solved with ${b.hints} hint${b.hints>1?'s':''}`:b.stars>=3?'Puzzle solved, no hints':'Puzzle solved');
  else add(BT.REPLAY_SEC,'Played this one again');
  if(b.daily)add(BT.DAILY_SEC,'Puzzle of the Day');
  if(mis)add(60,'Daily mission done');
  const want=t,room=b.room==null?1e9:Math.max(0,b.room);
  if(want>room){L.push([room-want,'Puzzle game time is full for today']);t=room}
  return{sec:t,want,lines:L,mast:false,rep:0}}
// g: the round (or {bt:{...}} for a puzzle); x = {mission: true} when this result finished the daily mission (+1 min, once a day)
function ptCalc(g,sc,n,stars,prev,newPass,testOk,nd,x){const mis=!!(x&&x.mission);if(g.bt)return ptBT(g.bt,mis);
  const per=ptCfg().per*60,L=[];let t=0;const add=(v,l)=>{if(v>0){t+=v;L.push([v,l])}};
  if(g.test){add(testOk?per+60:60,testOk?'Tested out!':'Good try')}
  else if(g.mix&&g.daily){add(per,'Daily review done');add((g.fixed||0)*30,`Fixed ${g.fixed} tricky one${g.fixed>1?'s':''}`)} // the first one of the day pays a full round
  else if(g.mix){add(Math.round(per*.6),'Practice round');add((g.fixed||0)*30,`Fixed ${g.fixed} tricky one${g.fixed>1?'s':''}`)}
  else{const acc=sc/n,mast=prev>=3&&!g.boss;
    if(mast)add(60,'Already mastered this one');
    else{add(Math.round(per*(acc<.5?.34:acc<.7?.67:1)),acc<.5?'Keep trying':'Round done');
      if(newPass)add(60,'New stop unlocked');else if(stars>prev&&prev>0)add(30,'Beat your old score');
      const hw=nd?worldStep(nd.p,nd.wi):0;if(hw>0)add(Math.min(90,30*hw),'Harder world')} // P1-05: by grade, not raw index
    if(sc==n)add(60,'Perfect score');if(g.boss&&g.won)add(120,'Beat the boss');add((g.fixed||0)*20,`Fixed ${g.fixed} old mistake${g.fixed>1?'s':''}`)}
  const rp=S.ptRep&&S.ptRep.day==today()?S.ptRep:(S.ptRep={day:today(),n:{}}),key=g.test?'t_'+worldId(g.path,g.test.wi):g.mix?(g.daily?'rev':'mix'):nd?nid(nd):'x',r=rp.n[key]||0;rp.n[key]=r+1;
  if(r>0){const k=r==1?.6:.35,cut=Math.round(t*(1-k));t-=cut;L.push([-cut,`Played ${r+1} times today`])}
  if(mis){t+=60;L.push([60,'Daily mission done'])} // after the repeat cut: the mission is paid once a day, in full
  t=Math.max(30,Math.round(t/30)*30);return{sec:t,lines:L,mast:!g.test&&!g.mix&&prev>=3&&!g.boss,rep:r}}
// Speed Race: the first race a day in each category that scores 5 or more pays 1 min; more races are free practice. Returns seconds.
function ptRace(cat,sc){if(sc<5)return 0;const rp=S.ptRep&&S.ptRep.day==today()?S.ptRep:(S.ptRep={day:today(),n:{}}),k='race_'+cat;if(rp.n[k])return 0;rp.n[k]=1;return 60}
// the lines of "How to earn more game time" (Game Room); R_ draws a small icon
// the lines of "How to earn more game time": [icon, what, how much]; the Game Room hub (59-game-hub.js) shows them, ptRules as HTML
function ptEarnList(){return[['sparkle','Unlock a new stop','+1 min'],['star','Get a perfect score','+1 min'],['globe','Play a harder world','up to +1½ min'],['crown','Beat a boss','+2 min'],['review','Do your Daily Review','a full round'],['review','Fix an old mistake','bonus seconds'],['chart','Beat your old score','+½ min'],['puzzle','Solve a Brain Teaser','up to 2 min, fewer with hints'],['calendar',"Finish all three of today's missions",'+1 min'],['timer','Fact Sprint or Speed Race, first one of the day','+1 min']]}
function ptRules(R_){return ptEarnList().map(([i,t,v])=>`<div>${R_(i)} ${t} <b>${v}</b></div>`).join('')+'<div class="small">Replaying a stop you already mastered, or the same stop over and over, earns less.</div>'}

// P4-16: the Game Room hub (scene, game-time ticket, a drawn card per registered game) lives in games.<VER>.js with the games:
// GH.hub() in src/js/59-game-hub.js. Called only from taps, after every file has loaded.
function gameRoom(){GH.hub()}
