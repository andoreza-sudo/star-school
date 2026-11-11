/* ---------- play time ---------- */
function ptCfg(){return S.ptCfg=Object.assign({per:3,max:30,pause:false},S.ptCfg||{})}
function pt(){const p=S.pt||(S.pt={bank:180,day:'',used:0});if(p.day!==today()){p.day=today();p.used=0}return p}
const fmtT=s=>{s=Math.max(0,Math.floor(s));return`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`};
function ptLeft(){const p=pt(),c=ptCfg();if(c.pause)return 0;const cap=c.max?c.max*60-p.used:1e9;return Math.max(0,Math.min(p.bank,cap))}
function ptEarn(sec){pt().bank+=sec;save()}
const fmtM=s=>{const m=Math.round(s/30)/2;return(m%1?`${Math.floor(m)||''}½`:`${m}`)+' min'};
function ptCalc(g,sc,n,stars,prev,newPass,testOk,nd){const per=ptCfg().per*60,L=[];let t=0;const add=(v,l)=>{if(v>0){t+=v;L.push([v,l])}};
  if(g.test){add(testOk?per+60:60,testOk?'Tested out!':'Good try')}
  else if(g.mix){add(Math.round(per*.6),'Practice round');add((g.fixed||0)*30,`Fixed ${g.fixed} tricky one${g.fixed>1?'s':''}`)}
  else{const acc=sc/n,mast=prev>=3&&!g.boss;
    if(mast)add(60,'Already mastered this one');
    else{add(Math.round(per*(acc<.5?.34:acc<.7?.67:1)),acc<.5?'Keep trying':'Round done');
      if(newPass)add(60,'New stop unlocked');else if(stars>prev&&prev>0)add(30,'Beat your old score');
      const hw=nd?worldStep(nd.p,nd.wi):0;if(hw>0)add(Math.min(90,30*hw),'Harder world')} // P1-05: by grade, not raw index
    if(sc==n)add(60,'Perfect score');if(g.boss&&g.won)add(120,'Beat the boss');add((g.fixed||0)*20,`Fixed ${g.fixed} old mistake${g.fixed>1?'s':''}`)}
  const rp=S.ptRep&&S.ptRep.day==today()?S.ptRep:(S.ptRep={day:today(),n:{}}),key=g.test?'t_'+worldId(g.path,g.test.wi):g.mix?'mix':nd?nid(nd):'x',r=rp.n[key]||0;rp.n[key]=r+1;
  if(r>0){const k=r==1?.6:.35,cut=Math.round(t*(1-k));t-=cut;L.push([-cut,`Played ${r+1} times today`])}
  t=Math.max(30,Math.round(t/30)*30);return{sec:t,lines:L,mast:!g.test&&!g.mix&&prev>=3&&!g.boss,rep:r}}
function ptWhyNot(){const p=pt(),c=ptCfg();if(c.pause)return'Game time is paused by a grown-up.';if(c.max&&p.used>=c.max*60)return`That's all the game time for today (${c.max} min). Come back tomorrow!`;return'Finish a learning round to earn game time!'}

// P4-16: the Game Room hub (scene, game-time ticket, a drawn card per registered game) lives in games.<VER>.js with the games:
// GH.hub() in src/js/59-game-hub.js. Called only from taps, after every file has loaded.
function gameRoom(){GH.hub()}
