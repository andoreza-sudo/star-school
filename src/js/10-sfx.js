/* ---------- sound engine (all synthesized, works offline) ----------
   P4-17 (DESIGN_SYSTEM 8.2): one soft, consistent set of sounds.
   - One master gain (MG). Every effect goes through its own small gain node into it, so at most 3 effects sound at once:
     a 4th fades the oldest out (fxRun). Music and game sounds that call tone()/noise() go straight to MG.
   - While the voice talks (speech or a recorded clip), MG ducks to 30% (sfxDuck), so effects and music never talk over it.
   - Nothing plays with Sound effects off: SFX.*, tone() and noise() all check S.sound. Music has its own switch (S.music)
     and uses the unchecked synth() directly.
   - Levels: soft waveforms (sine, triangle), effects peak well under the voice; tools/test.js "motion and sound P4-17"
     measures every effect's peak level and length. */
let AC,MG;
const MG_V=.8; // master level; ducked to MG_V * .3 under the voice
function ac(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)();MG=AC.createGain();MG.gain.value=MG_V;MG.connect(AC.destination)}catch(e){}}
  if(AC&&AC.state=='suspended')AC.resume();return AC}
let FXG=null; // while an effect is being built: {g: its gain node, end: when it stops}
const FXON=[]; // effects still sounding, oldest first
// a note: frequency f (Hz), length d (s), start t (s from now), wave type, peak level vol, optional slide to frequency `slide`
function synth(f,d,t=0,type='sine',vol=.2,slide=0){const a=ac();if(!a)return;const n=a.currentTime+t,o=a.createOscillator(),g=a.createGain();
  o.type=type;o.frequency.setValueAtTime(f,n);if(slide)o.frequency.exponentialRampToValueAtTime(slide,n+d);
  g.gain.setValueAtTime(.0001,n);g.gain.exponentialRampToValueAtTime(vol,n+.012);g.gain.exponentialRampToValueAtTime(.0001,n+d);
  o.connect(g).connect(FXG?FXG.g:MG);o.start(n);o.stop(n+d+.05);if(FXG)FXG.end=Math.max(FXG.end,n+d+.05)}
// band-passed noise of length d, swept from f0 to f1 Hz
function hiss(d,t=0,vol=.15,f0=600,f1=4000){const a=ac();if(!a)return;const n=a.currentTime+t,b=a.createBuffer(1,Math.max(1,a.sampleRate*d|0),a.sampleRate),x=b.getChannelData(0);
  for(let i=0;i<x.length;i++)x[i]=Math.random()*2-1;const s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();s.buffer=b;f.type='bandpass';f.Q.value=1.5;
  f.frequency.setValueAtTime(f0,n);f.frequency.exponentialRampToValueAtTime(f1,n+d);g.gain.setValueAtTime(vol,n);g.gain.exponentialRampToValueAtTime(.0001,n+d);
  s.connect(f).connect(g).connect(FXG?FXG.g:MG);s.start(n);if(FXG)FXG.end=Math.max(FXG.end,n+d)}
// the public ones, used by the games: silent with Sound effects off
function tone(...a){if(S.sound)synth(...a)}
function noise(...a){if(S.sound)hiss(...a)}
const NOTE=m=>440*Math.pow(2,(m-69)/12);
const XY=[0,2,4,5,7,9,11,12,14,16];
// The set (DESIGN_SYSTEM 8.2 table): click = tap, right, wrong = try again, star, coin, open = chest, fanfare = unlock, hit = boss hit, whoosh.
// The rest keep their old character at the same soft level.
const RAW={
  click:()=>{synth(1250,.03,0,'triangle',.04,700);synth(2500,.012,0,'sine',.01)},
  right:s=>{const b=74+Math.min(s||0,8);synth(NOTE(b),.1,0,'triangle',.13);synth(NOTE(b+4),.12,.06,'triangle',.13);synth(NOTE(b+16),.1,.06,'sine',.025)},
  wrong:()=>synth(NOTE(55),.15,0,'sine',.1,NOTE(52)),
  star:()=>{synth(NOTE(93),.25,0,'sine',.08);synth(NOTE(100),.12,.015,'sine',.03)},
  coin:(i=0)=>{synth(NOTE(86+i),.07,0,'triangle',.07);synth(NOTE(91+i),.13,.07,'triangle',.07)},
  open:()=>{hiss(.18,0,.08,300,1200);[72,76,79,84,88].forEach((m,i)=>synth(NOTE(m),.3,.06+i*.08,'sine',.09))},
  fanfare:()=>{[[67,0,.14],[72,.15,.14],[76,.3,.14],[79,.45,.62]].forEach(([m,t,d])=>synth(NOTE(m),d,t,'triangle',.09));synth(NOTE(91),.5,.47,'sine',.02)},
  hit:()=>{synth(1100,.18,0,'triangle',.1,220);hiss(.14,0,.12,2400,700)},
  whoosh:()=>hiss(.25,0,.1,400,3200),
  ko:()=>{[76,72,67,64,60].forEach((m,i)=>synth(NOTE(m),.16,i*.09,'triangle',.08));hiss(.5,.45,.08,300,4000)},
  chomp:()=>{for(let i=0;i<3;i++){hiss(.06,i*.14,.12,500,500);synth(220,.05,i*.14,'triangle',.06)}},
  splash:()=>{hiss(.45,0,.12,800,300);hiss(.35,.25,.07,1500,600)},
  key:d=>{synth(NOTE(72+XY[d]),.25,0,'sine',.12);synth(NOTE(84+XY[d]),.1,0,'sine',.03)},
  del:()=>synth(500,.1,0,'sine',.08,280),
  pop:(i=0)=>synth(420+i*90,.09,0,'sine',.12,900+i*120),
  streak:()=>{[0,4,7,11,14,19].forEach((x,i)=>synth(NOTE(79+x),.15,i*.045,'sine',.08));hiss(.3,0,.03,3000,9000)},
  magic:()=>{for(let i=0;i<10;i++)synth(NOTE(72+i*2),.22,i*.06,'sine',.06);hiss(.6,.15,.03,4000,10000)},
  rattle:()=>{for(let i=0;i<5;i++)synth(150+Math.random()*120,.05,i*.07,'triangle',.08)},
  giggle:()=>{for(let i=0;i<5;i++)synth(700+i*60+Math.random()*80,.07,i*.08,'sine',.09,900+i*60)},
  hatch:()=>{hiss(.15,0,.14,800,800);hiss(.15,.2,.14,900,900);hiss(.4,.45,.14,500,3000)},
  tick:()=>synth(880,.06,0,'triangle',.05)}; // the last seconds of a timed game
// run one effect on its own gain node; a 4th effect at once fades the oldest out
function fxRun(k,a){const x=ac();if(!x)return;const now=x.currentTime;
  for(let i=FXON.length-1;i>=0;i--)if(FXON[i].end<=now)FXON.splice(i,1);
  while(FXON.length>=3){const o=FXON.shift();try{o.g.gain.setTargetAtTime(0,now,.012)}catch(e){}}
  const g=x.createGain();g.connect(MG);FXG={g,end:now};
  try{RAW[k](...a)}finally{const f=FXG;FXG=null;if(f.end>now)FXON.push(f)}}
const SFX={};for(const k in RAW)SFX[k]=(...a)=>{if(S.sound)try{fxRun(k,a)}catch(e){}};
// duck effects and music to 30% while talking() says the voice is on (checked every 200 ms, at most 30 s)
let DUCK=null;
function sfxDuck(talking){if(!AC||!MG)return;clearInterval(DUCK);const t0=Date.now();
  try{MG.gain.setTargetAtTime(MG_V*.3,AC.currentTime,.03)}catch(e){}
  DUCK=setInterval(()=>{if(Date.now()-t0<400||(talking()&&Date.now()-t0<30000))return;clearInterval(DUCK);DUCK=null;
    try{MG.gain.setTargetAtTime(MG_V,AC.currentTime,.08)}catch(e){}},200)}
let musT=null;
function music(on){clearInterval(musT);musT=null;if(!on||!S.music)return;let i=0;const sc=[60,62,64,67,69,72,74,76,79],bass=[48,53,55,52];
  musT=setInterval(()=>{if(!AC||AC.state!='running')return;
    if(i%8==0)synth(NOTE(bass[(i/8|0)%4]),1.2,0,'sine',.05);
    if(i%2==0&&Math.random()<.8)synth(NOTE(pick(sc)),.35,0,'triangle',.035);i++},260)}
document.addEventListener('pointerdown',e=>{ac();const b=e.target.closest('.btn');if(b&&!b.matches('.k,.lt,.ch,.chestbtn'))SFX.click()},true);
