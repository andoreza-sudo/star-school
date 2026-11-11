/* ---------- speech & feedback ---------- */
const canSpeak=()=>'speechSynthesis' in window&&typeof SpeechSynthesisUtterance!='undefined';
function noVoice(btn){fb('🔇 No voice here. Open Star School in Chrome or the installed app.','warn long',3000);if(btn){btn.classList.remove('talking');anim(btn,'sad')}}
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
  speechSynthesis.speak(u)}catch(e){if(btn)noVoice(btn)}}
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
  setTimeout(()=>{e.remove();SFX.coin();bump('#starc')},640)}
// a burst of 10 sparkles from (x, y): drawn stars (P4-10), or the emoji in set (boss hits)
function burst(x,y,set){for(let i=0;i<10;i++){const e=document.createElement('div');e.className='burst';
  if(set)e.textContent=pick(set);else{e.className+=' b'+(i%3);e.innerHTML=ico('star',i%2?18:26)}e.style.left=x+'px';e.style.top=y+'px';document.body.appendChild(e);
  const a=Math.random()*Math.PI*2,d=80+Math.random()*90;requestAnimationFrame(()=>requestAnimationFrame(()=>{e.style.transform=`translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px) scale(.4)`;e.style.opacity=0}));setTimeout(()=>e.remove(),800)}}
function confetti(n=36){for(let i=0;i<n;i++){const e=document.createElement('div');e.className='conf';e.textContent=pick(['⭐','🎉','✨','🌟','🎈','🍬']);
  e.style.left=Math.random()*100+'vw';e.style.animationDuration=(1.8+Math.random()*1.8)+'s';e.style.animationDelay=Math.random()*.6+'s';document.body.appendChild(e);setTimeout(()=>e.remove(),4500)}}
