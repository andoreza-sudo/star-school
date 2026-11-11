/* ---------- speech & feedback ---------- */
const canSpeak=()=>'speechSynthesis' in window&&typeof SpeechSynthesisUtterance!='undefined';
function noVoice(btn){fb('🔇 No voice here. Open Star School in Chrome or the installed app.','warn long',3000);if(btn){btn.classList.remove('talking');anim(btn,'sad')}}
function say(t,btn,lang,q){if(!canSpeak()){if(btn)noVoice(btn);return}
  try{if(!q)speechSynthesis.cancel();const es=lang=='es',u=new SpeechSynthesisUtterance(String(t).replace(/−/g,' minus '));u.rate=es?.8:.88;u.pitch=1.1;u.lang=es?'es-MX':'en-US';
  const vs=speechSynthesis.getVoices(),v=es?(vs.find(v=>/^es[-_](MX|US)/i.test(v.lang))||vs.find(v=>/^es/i.test(v.lang))):(vs.find(v=>/^en[-_]US/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang)));if(v)u.voice=v;
  if(btn){let started=false;btn.classList.add('talking');u.onstart=()=>{started=true};u.onend=u.onerror=()=>btn.classList.remove('talking');
    setTimeout(()=>{if(!started&&!speechSynthesis.speaking)noVoice(btn)},2500)}
  speechSynthesis.speak(u)}catch(e){if(btn)noVoice(btn)}}
let fbT;function fb(t,cls='',ms=1000){const e=$('#fb');e.textContent=t;e.className='fb on '+cls;clearTimeout(fbT);fbT=setTimeout(()=>e.className='fb',ms)}
function bump(sel){const e=typeof sel=='string'?$(sel):sel;if(!e)return;e.classList.remove('bump');void e.offsetWidth;e.classList.add('bump')}
function anim(e,c){if(!e)return;e.classList.remove('jump','sad');void e.offsetWidth;e.classList.add(c);setTimeout(()=>e.classList.remove(c),550)}
function flyStar(from){const to=$('#starc');if(!to)return;const r=from?from.getBoundingClientRect():{left:innerWidth/2,top:innerHeight/2,width:0,height:0},t=to.getBoundingClientRect();
  const x=r.left+r.width/2,y=r.top+r.height/2,e=document.createElement('div');e.className='fly';e.textContent='⭐';e.style.left=x+'px';e.style.top=y+'px';document.body.appendChild(e);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{e.style.transform=`translate(${t.left+20-x}px,${t.top+16-y}px) scale(.5)`;e.style.opacity=.4}));
  setTimeout(()=>{e.remove();SFX.coin();bump('#starc')},640)}
function burst(x,y,set=['✨','⭐','💫']){for(let i=0;i<10;i++){const e=document.createElement('div');e.className='burst';e.textContent=pick(set);e.style.left=x+'px';e.style.top=y+'px';document.body.appendChild(e);
  const a=Math.random()*Math.PI*2,d=80+Math.random()*90;requestAnimationFrame(()=>requestAnimationFrame(()=>{e.style.transform=`translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px) scale(.4)`;e.style.opacity=0}));setTimeout(()=>e.remove(),800)}}
function confetti(n=36){for(let i=0;i<n;i++){const e=document.createElement('div');e.className='conf';e.textContent=pick(['⭐','🎉','✨','🌟','🎈','🍬']);
  e.style.left=Math.random()*100+'vw';e.style.animationDuration=(1.8+Math.random()*1.8)+'s';e.style.animationDelay=Math.random()*.6+'s';document.body.appendChild(e);setTimeout(()=>e.remove(),4500)}}
