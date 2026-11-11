/* ---------- speech & feedback ---------- */
const canSpeak=()=>'speechSynthesis' in window&&typeof SpeechSynthesisUtterance!='undefined';
function noVoice(btn){fb('No voice here. Open Star School in Chrome or the installed app.','warn long',3000);if(btn){btn.classList.remove('talking');anim(btn,'sad')}}
// P2-30: is there a Spanish voice? 'yes', 'no', or 'wait' (the list is still empty: some browsers fill it late, then fire voiceschanged).
// An empty list after 3 s is 'no' (nothing can speak). esVoiceMode is pure so tests can feed it voice lists.
function esVoiceMode(vs,spk,ms){if(!spk)return'no';if(vs.some(v=>/^(es|spa)/i.test(v.lang)))return'yes';return vs.length||ms>3000?'no':'wait'}
function esVoice(){let vs=[];try{vs=speechSynthesis.getVoices()}catch(e){}return esVoiceMode(vs,canSpeak(),typeof performance!='undefined'?performance.now():9e9)}
let ESNOTE=0; // the grown-up note shows once per session
function esNote(){if(ESNOTE)return;ESNOTE=1;fb('No Spanish voice on this tablet. Grown-ups: add one in the tablet’s text-to-speech settings. The words are shown to read.','info long',5000)}
// after a Spanish question is drawn: with no Spanish voice, the speaker button becomes the word shown big and "Hear it" goes away
function esQFix(q){if(!q||!(q.lang=='es'||q.dl)||esVoice()!='no')return;
  // P2-35: a dialogue line (.dl-b) already shows its text beside the button, so the button just goes; an English question keeps "Hear it"
  $$('[data-sayes]').forEach(b=>{if(b.classList.contains('dl-b')){b.remove();return}const d=document.createElement('div');d.className='esbig';d.textContent=b.dataset.sayes;b.replaceWith(d)});
  const k=$('#spk');if(k&&q.lang=='es')k.style.display='none';esNote()}
function say(t,btn,lang,q){if(lang=='es'&&esVoice()=='no'){esNote();if(btn)btn.classList.remove('talking');return}if(!canSpeak()){if(btn)noVoice(btn);return}
  try{if(!q)speechSynthesis.cancel();const es=lang=='es',u=new SpeechSynthesisUtterance(String(t).replace(/−/g,' minus '));u.rate=es?.8:.88;u.pitch=1.1;u.lang=es?'es-MX':'en-US';
  const vs=speechSynthesis.getVoices(),v=es?(vs.find(v=>/^es[-_](MX|US)/i.test(v.lang))||vs.find(v=>/^es/i.test(v.lang))):(vs.find(v=>/^en[-_]US/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang)));if(v)u.voice=v;
  if(btn){let started=false;btn.classList.add('talking');u.onstart=()=>{started=true};u.onend=u.onerror=()=>btn.classList.remove('talking');
    setTimeout(()=>{if(!started&&!speechSynthesis.speaking)noVoice(btn)},2500)}
  speechSynthesis.speak(u);sfxDuck(()=>speechSynthesis.speaking||speechSynthesis.pending)}catch(e){if(btn)noVoice(btn)}}
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
