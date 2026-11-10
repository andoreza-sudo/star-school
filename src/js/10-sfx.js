/* ---------- sound engine (all synthesized, works offline) ---------- */
let AC,MG;
function ac(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)();MG=AC.createGain();MG.gain.value=.9;MG.connect(AC.destination)}catch(e){}}
  if(AC&&AC.state=='suspended')AC.resume();return AC}
function tone(f,d,t=0,type='sine',vol=.2,slide=0){const a=ac();if(!a)return;const n=a.currentTime+t,o=a.createOscillator(),g=a.createGain();
  o.type=type;o.frequency.setValueAtTime(f,n);if(slide)o.frequency.exponentialRampToValueAtTime(slide,n+d);
  g.gain.setValueAtTime(.0001,n);g.gain.exponentialRampToValueAtTime(vol,n+.012);g.gain.exponentialRampToValueAtTime(.0001,n+d);
  o.connect(g).connect(MG);o.start(n);o.stop(n+d+.05)}
function noise(d,t=0,vol=.15,f0=600,f1=4000){const a=ac();if(!a)return;const n=a.currentTime+t,b=a.createBuffer(1,a.sampleRate*d,a.sampleRate),x=b.getChannelData(0);
  for(let i=0;i<x.length;i++)x[i]=Math.random()*2-1;const s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();s.buffer=b;f.type='bandpass';f.Q.value=1.5;
  f.frequency.setValueAtTime(f0,n);f.frequency.exponentialRampToValueAtTime(f1,n+d);g.gain.setValueAtTime(vol,n);g.gain.exponentialRampToValueAtTime(.0001,n+d);
  s.connect(f).connect(g).connect(MG);s.start(n)}
const NOTE=m=>440*Math.pow(2,(m-69)/12);
const XY=[0,2,4,5,7,9,11,12,14,16];
const RAW={
  hit:()=>{noise(.18,0,.32,300,1200);tone(160,.22,0,'square',.12,60)},
  ko:()=>{[72,67,64,60,55,48].forEach((m,i)=>tone(NOTE(m),.18,i*.09,'square',.09));noise(.6,.5,.2,200,6000)},
  chomp:()=>{for(let i=0;i<3;i++){noise(.06,i*.14,.25,500,500);tone(220,.05,i*.14,'square',.06)}},
  splash:()=>{noise(.5,0,.2,800,300);noise(.4,.3,.12,1500,600)},
  click:()=>tone(1400,.03,0,'square',.04),
  key:d=>{tone(NOTE(72+XY[d]),.35,0,'sine',.22);tone(NOTE(84+XY[d]),.12,0,'sine',.06)},
  del:()=>tone(500,.12,0,'sine',.15,250),
  pop:(i=0)=>tone(420+i*90,.09,0,'sine',.22,900+i*120),
  right:s=>{const b=60+Math.min(s,10)*2;[0,4,7,12].forEach((x,i)=>tone(NOTE(b+x),.22,i*.07,'triangle',.18));tone(NOTE(b+24),.3,.28,'sine',.08)},
  wrong:()=>{tone(320,.18,0,'triangle',.2,180);tone(260,.3,.16,'triangle',.18,110)},
  coin:(i=0)=>{tone(NOTE(83+i),.06,0,'square',.07);tone(NOTE(88+i),.22,.06,'square',.07)},
  streak:()=>{[0,4,7,11,14,19].forEach((x,i)=>tone(NOTE(79+x),.15,i*.045,'sine',.12));noise(.4,0,.05,3000,9000)},
  fanfare:()=>{[[67,0,.12],[67,.13,.12],[67,.26,.12],[72,.4,.6],[64,.4,.6],[76,.4,.6]].forEach(([m,t,d])=>tone(NOTE(m),d,t,'square',.08));noise(.5,.4,.06,2000,8000)},
  whoosh:()=>noise(.45,0,.18,300,5000),
  magic:()=>{for(let i=0;i<14;i++)tone(NOTE(72+i*2),.25,i*.06,'sine',.1);noise(1,.2,.05,4000,10000)},
  rattle:()=>{for(let i=0;i<5;i++)tone(150+Math.random()*120,.05,i*.07,'square',.06)},
  open:()=>{noise(.3,0,.25,200,1500);tone(NOTE(60),.15,.05,'triangle',.2);[72,76,79,84,88].forEach((m,i)=>tone(NOTE(m),.3,.15+i*.07,'sine',.13))},
  giggle:()=>{for(let i=0;i<5;i++)tone(700+i*60+Math.random()*80,.07,i*.08,'sine',.12,900+i*60)},
  hatch:()=>{noise(.15,0,.3,800,800);noise(.15,.2,.3,900,900);noise(.4,.45,.3,500,3000)}};
const SFX={};for(const k in RAW)SFX[k]=(...a)=>{if(S.sound)try{RAW[k](...a)}catch(e){}};
let musT=null;
function music(on){clearInterval(musT);musT=null;if(!on||!S.music)return;let i=0;const sc=[60,62,64,67,69,72,74,76,79],bass=[48,53,55,52];
  musT=setInterval(()=>{if(!AC||AC.state!='running')return;
    if(i%8==0)tone(NOTE(bass[(i/8|0)%4]),1.2,0,'sine',.05);
    if(i%2==0&&Math.random()<.8)tone(NOTE(pick(sc)),.35,0,'triangle',.035);i++},260)}
document.addEventListener('pointerdown',e=>{ac();const b=e.target.closest('.btn');if(b&&!b.matches('.k,.lt,.ch,.chestbtn'))SFX.click()},true);

