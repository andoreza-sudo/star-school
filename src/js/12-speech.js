/* ---------- speech & feedback ---------- */
const canSpeak=()=>'speechSynthesis' in window&&typeof SpeechSynthesisUtterance!='undefined';
function noVoice(btn){fb('No voice here. Open Star School in Chrome or the installed app.','warn long',3000);if(btn){btn.classList.remove('talking');anim(btn,'sad')}}
// P2-30: is there a Spanish voice? 'yes', 'no', or 'wait' (the list is still empty: some browsers fill it late, then fire voiceschanged).
// An empty list after 3 s is 'no' (nothing can speak). esVoiceMode is pure so tests can feed it voice lists.
function esVoiceMode(vs,spk,ms){if(!spk)return'no';if(vs.some(v=>/^(es|spa)/i.test(v.lang)))return'yes';return vs.length||ms>3000?'no':'wait'}
function esVoice(){let vs=[];try{vs=speechSynthesis.getVoices()}catch(e){}return esVoiceMode(vs,canSpeak(),typeof performance!='undefined'?performance.now():9e9)}
let ESNOTE=0; // the grown-up note shows once per session
function esNote(){if(ESNOTE)return;ESNOTE=1;fb('No Spanish voice on this tablet. Grown-ups: add one in the tablet’s text-to-speech settings. The words are shown to read.','info long',5000)}
// after a Spanish question is drawn: with no Spanish voice, a speaker button whose line has no recording (ES-AUDIO) becomes the word
// shown big, and "Hear it" goes away when its line has none; the grown-up note shows only when something was taken away
function esQFix(q){if(!q||!(q.lang=='es'||q.dl)||esVoice()!='no')return;let miss=0;
  // P2-35: a dialogue line (.dl-b) already shows its text beside the button, so the button just goes; an English question keeps "Hear it"
  $$('[data-sayes]').forEach(b=>{if(esHas(b.dataset.sayes))return;miss=1;if(b.classList.contains('dl-b')){b.remove();return}const d=document.createElement('div');d.className='esbig';d.textContent=b.dataset.sayes;b.replaceWith(d)});
  const k=$('#spk');if(k&&q.lang=='es'&&!(q.say&&esHas(q.say))){k.style.display='none';if(q.say)miss=1}if(miss)esNote()}
/* ES-AUDIO: recorded Spanish. ES_AUDIO (src/data/d-es-audio.js, made by tools/es-audio.js) maps every Spanish line the app can say
   (esKey: NFC, trimmed, spaces collapsed) to a recording, audio/es/<file>.ogg (Opus), in the voice of Leo or Eve. say(t, btn, 'es')
   plays it with one shared <audio> element, so the tablet's speech engine never has to switch language (seconds of silence on a tablet
   with no offline Spanish voice), and a tablet with no Spanish voice at all still hears it. A line with no recording, a browser that
   cannot play Opus, or a file that does not load or play: the tablet's voice, exactly as before (with no Spanish voice: the note).
   English is always the tablet's voice. A queued line (say's q) waits for the speech or recording before it and starts on its end
   event, so English then Spanish (or Spanish then English) runs back to back. ESA.off (tests) turns the recordings off. */
const esKey=t=>String(t).normalize('NFC').replace(/\s+/g,' ').trim();
const ESA={off:false,ok:null,au:null,cur:null,q:[],gen:0,tts:0,us:[],bad:{},poll:0,t0:0};
function esaOk(){if(ESA.ok==null){try{ESA.ok=typeof Audio!='undefined'&&!!new Audio().canPlayType('audio/ogg; codecs="opus"')}catch(e){ESA.ok=false}}return ESA.ok}
// the recordings for a line: [[file, voice]], or for a hint that reads a list ("el perro. la vaca. el gato") one per piece; null = none
function esFiles(t){if(ESA.off||typeof ES_AUDIO=='undefined'||t==null||!esaOk())return null;const m=ES_AUDIO.lines,k=esKey(t),ok=f=>f&&!ESA.bad[f[0]];
  if(m[k])return ok(m[k])?[m[k]]:null;const ps=k.split(/\.\s+/).map(x=>x.replace(/\.$/,''));
  return ps.length>1&&ps.every(x=>ok(m[x]))?ps.map(x=>m[x]):null}
const esHas=t=>!!esFiles(t);
// something is talking or waiting to: a recording, our queue, or the speech engine
function speakBusy(){if(ESA.cur||ESA.q.length||ESA.tts>0)return true;try{return !!(speechSynthesis.speaking||speechSynthesis.pending)}catch(e){return false}}
// stop everything: the speech engine, the recording, and what was queued (say without q, and the Say it! microphone)
function hush(){ESA.gen++;ESA.q=[];ESA.tts=0;try{speechSynthesis.cancel()}catch(e){}const c=ESA.cur;ESA.cur=null;
  if(ESA.au){ESA.au.onended=ESA.au.onerror=null;try{ESA.au.pause()}catch(e){}}if(c&&c.btn)c.btn.classList.remove('talking')}
// the next queued line, once nothing plays
function esaPump(){if(ESA.cur||ESA.tts>0)return;const n=ESA.q.shift();if(!n)return;if(n.a)esaPlay(n);else ttsSay(...n.s)}
function esaPlay(it){const a=ESA.au||(ESA.au=new Audio()),g=ESA.gen,f=it.a[it.i],r=it.slow>0&&it.slow<1?it.slow:1;ESA.cur=it;
  a.onended=()=>{if(ESA.cur!==it)return;if(++it.i<it.a.length)return esaPlay(it);ESA.cur=null;if(it.btn)it.btn.classList.remove('talking');esaPump()};
  a.onerror=()=>esaFail(it,g,f);
  a.src=ES_AUDIO.dir+f[0]+ES_AUDIO.ext;a.dataset.say=it.t;a.defaultPlaybackRate=a.playbackRate=r; // slow (a hint replay): the same file, slower
  if(it.btn)it.btn.classList.add('talking');
  try{const p=a.play();if(p&&p.catch)p.catch(e=>{if(!(e&&e.name=='AbortError'))esaFail(it,g,f)})}catch(e){return esaFail(it,g,f)}
  sfxDuck(speakBusy)}
// a file that does not load or play: never tried again this session; the line goes to the tablet's voice
function esaFail(it,g,f){if(ESA.cur!==it||g!==ESA.gen)return;ESA.bad[f[0]]=1;ESA.cur=null;if(it.btn)it.btn.classList.remove('talking');
  if(esVoice()=='no'||!canSpeak()){esNote();esaPump();return}ttsSay(it.t,it.btn,true,it.slow)}
/* the voice for a language: one stored on the tablet first (localService), because a network voice waits for the internet on
   every word (a long pause, and nothing at all offline); then es-MX / es-US, en-US, then any voice of that language. Kept per
   language, so a Spanish word after an English one does not search again. */
const VOICE={};
function pickVoice(es){const k=es?'es':'en';if(VOICE[k]&&VOICE.n===speechSynthesis.getVoices().length)return VOICE[k];
  const vs=speechSynthesis.getVoices(),re=es?/^es/i:/^en/i,best=es?/^es[-_](MX|US)/i:/^en[-_]US/i,all=vs.filter(v=>re.test(v.lang)),loc=all.filter(v=>v.localService!==false);
  VOICE.n=vs.length;return VOICE[k]=loc.find(v=>best.test(v.lang))||loc[0]||all.find(v=>best.test(v.lang))||all[0]||null}
// warmVoices(): on a Spanish screen, wake both voices with a silent word so the first real word does not wait for the engine to load
let VOICE_WARM=0;
function warmVoices(){if(VOICE_WARM||!canSpeak())return;VOICE_WARM=1;
  try{for(const es of [true,false]){const u=new SpeechSynthesisUtterance(' ');u.volume=0;u.lang=es?'es-MX':'en-US';const v=pickVoice(es);if(v)u.voice=v;speechSynthesis.speak(u)}}catch(e){}}
// slow (R-01s): a number under 1 slows the voice down (a hint replays a Spanish word at .75 of the normal speed)
function say(t,btn,lang,q,slow){const es=lang=='es',fs=es?esFiles(t):null;
  if(fs){if(!q)hush();const it={a:fs,i:0,t:String(t),btn,slow};if(q&&speakBusy())ESA.q.push(it);else esaPlay(it);return} // ES-AUDIO
  if(es&&esVoice()=='no'){esNote();if(btn)btn.classList.remove('talking');return}if(!canSpeak()){if(btn)noVoice(btn);return}
  if(!q)hush();if(q&&(ESA.cur||ESA.q.length))ESA.q.push({s:[t,btn,es,slow]});else ttsSay(t,btn,es,slow)}
// the tablet's voice. ESA.tts counts our utterances still to end (a queued recording starts when it is 0); a slow poll stands in
// for an end event that some engines never fire
function ttsSay(t,btn,es,slow){
  try{const u=new SpeechSynthesisUtterance(String(t).replace(/−/g,' minus '));u.rate=(es?.8:.88)*(slow>0&&slow<1?slow:1);u.pitch=1.1;u.lang=es?'es-MX':'en-US';
  const v=pickVoice(es);if(v)u.voice=v;
  const g=ESA.gen;let fin=false;const end=()=>{if(fin)return;fin=true;ESA.us=ESA.us.filter(x=>x!==u);if(g!==ESA.gen)return;ESA.tts=Math.max(0,ESA.tts-1);esaPump()};
  ESA.tts++;ESA.us.push(u);ESA.t0=Date.now(); // ESA.us keeps the utterance alive until it ends (an engine may drop the end event of a collected one)
  if(btn){let started=false;btn.classList.add('talking');u.onstart=()=>{started=true};u.onend=u.onerror=()=>{btn.classList.remove('talking');end()};
    setTimeout(()=>{if(!started&&!speechSynthesis.speaking)noVoice(btn)},2500)}else u.onend=u.onerror=end;
  speechSynthesis.speak(u);sfxDuck(speakBusy);ttsPoll()}catch(e){if(btn)noVoice(btn)}}
function ttsPoll(){if(ESA.poll)return;ESA.poll=1;const w=()=>{ESA.poll=0;if(ESA.tts<=0)return;let busy=true;try{busy=speechSynthesis.speaking||speechSynthesis.pending}catch(e){}
  if(!busy&&Date.now()-ESA.t0>1500){ESA.tts=0;esaPump();return}ESA.poll=1;setTimeout(w,300)};setTimeout(w,300)}
// P4-10: feedback is the P4-04 toast (UI.toast in 14-ui.js). cls picks its look: '' right (green, tick), 'warn' / 'bad' try again (amber),
// 'again' amber with the replay arrow, 'info' / 'pl-fb' neutral (blue, bulb), 'streak' (flame), 'zap' (bolt). The #fb element is no longer used.
let fbT;function fb(t,cls='',ms=1000){const c=String(cls||'');
  const k=/\b(warn|bad|again)\b/.test(c)?['try',/again/.test(c)?'replay':'hint']:/\b(info|pl-fb)\b/.test(c)?['info','hint']
    :/\bstreak\b/.test(c)?['streak','flame']:/\bzap\b/.test(c)?['good','bolt']:['good','check'];
  UI.toast(t,k[0],ms,k[1])}
function bump(sel){const e=typeof sel=='string'?$(sel):sel;if(!e)return;e.classList.remove('bump');void e.offsetWidth;e.classList.add('bump')}
function anim(e,c){if(!e)return;e.classList.remove('jump','sad');void e.offsetWidth;e.classList.add(c);setTimeout(()=>e.classList.remove(c),550)}
function flyStar(from){const to=$('#starc');if(!to)return;const r=from?from.getBoundingClientRect():{left:innerWidth/2,top:innerHeight/2,width:0,height:0},t=to.getBoundingClientRect();
  const x=r.left+r.width/2,y=r.top+r.height/2,e=document.createElement('div');e.className='fly';e.innerHTML=ico('star',48);e.style.left=x+'px';e.style.top=y+'px';document.body.appendChild(e);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{e.style.transform=`translate(${t.left+20-x}px,${t.top+16-y}px) scale(.5)`;e.style.opacity=.4}));
  setTimeout(()=>{e.remove();SFX.star();bump('#starc')},640)}
/* P4-17: drawn particles only (no emoji). burst(x, y, kind): 10 shaded pieces fly out of a screen point and fade (keyframes fx-out in
   src/css/50-motion.css, transform and opacity only). kind: 'star' (a right answer), 'heart' (the pet is tapped), 'zap' (a boss hit),
   'coin' (a balloon pops). The heart, star and sparkle are Pet Care's drawings (PC_FX, 56-petcare.js); the bolt and coin are FX_ART.
   confetti(n): the drawn confetti (RW.burst) over the whole screen, at most 40 pieces. Both are hidden in calm mode and with reduced
   motion (the sound and the screen's own change still say what happened). */
const FX_C=h=>`var(--ill-${h})`;
const FX_ART={
  bolt:`<path fill="${FX_C('yellow-2')}" d="M14.6 1.8L4.6 13.6h6.2l-2 8.6 10.6-12.4h-6.4z"/><path fill="${FX_C('yellow')}" d="M13.8 2.4L5.2 12.8h5.9l-1.6 6.9 8.8-10.4h-6.1z"/>`+
    `<path fill="${FX_C('white')}" opacity=".8" d="M12.4 4.6l-4.2 5.2h1.6z"/>`,
  coin:`<circle cx="12" cy="12.6" r="9.4" fill="${FX_C('yellow-2')}"/><circle cx="11.6" cy="12" r="8.6" fill="${FX_C('yellow')}"/>`+
    `<circle cx="11.6" cy="12" r="5.6" fill="none" stroke="${FX_C('yellow-2')}" stroke-width="1.4"/><ellipse cx="8.4" cy="8.4" rx="2" ry="1.2" fill="${FX_C('white')}" opacity=".85" transform="rotate(-40 8.4 8.4)"/>`};
const FX_SET={star:['star','spark','star'],heart:['heart','spark','heart'],zap:['bolt','spark','star'],coin:['coin','spark','coin']};
function burst(x,y,kind='star'){const set=FX_SET[kind]||FX_SET.star,art=n=>FX_ART[n]||PC_FX[n],b=document.createElement('div');
  b.className='burst fx-'+(FX_SET[kind]?kind:'star');b.setAttribute('aria-hidden','true');b.style.left=Math.round(x)+'px';b.style.top=Math.round(y)+'px';let h='';
  for(let i=0;i<10;i++){const a=i/10*Math.PI*2+Math.random()*.5,d=60+Math.random()*70,s=i%3?20:30;
    h+=`<i style="--x:${Math.round(Math.cos(a)*d)}px;--y:${Math.round(Math.sin(a)*d)}px;--r:${Math.round(Math.random()*80-40)}deg;width:${s}px;height:${s}px">`+
      `<svg viewBox="0 0 24 24">${art(set[i%set.length])}</svg></i>`}
  b.innerHTML=h;document.body.appendChild(b);setTimeout(()=>b.remove(),900)}
function confetti(n=36){RW.burst(document.body,Math.min(40,n))}
