/* ---------- S-SPK: Spanish speaking practice, the "Say it!" step (docs/reviews/R-01-spanish.md Should 7) ----------
   One "Say it!" step per Spanish stop round (every level of every unit, Las Frases and Los Cuentos; not bosses, Test out or Tricky
   Mix), after the 3rd question, and one in Daily Review after its first Spanish question. It is a step between questions (next() in
   50-round.js asks spkHook first), not a question: the seeded questions, the round length, stars and review are unchanged, and
   skipping it or having no microphone never counts as wrong.
   The step says the Spanish of the question just answered (q.after: the word, phrase, sentence, or in Los Cuentos the dialogue line;
   the child plays the character who says it). The child hears the model (the Spanish voice; with no Spanish voice the text is shown
   big and the grown-up note shows once, esNote), taps the big microphone, talks for up to 4 s (MediaRecorder), then hears the model
   and their own recording one after the other, and checks themselves: "I said it!" or "Try again". "Skip for now" always goes on.
   Pre-K and K: every instruction is also spoken (the English voice), nothing needs reading.
   Microphone: probed once per session (spkProbe: the API, then a microphone in enumerateDevices, then a denied permission). No
   microphone: one note for the session and the step is skipped. Denied (or refused on the first tap): the step shows a grown-up how to
   allow it, then goes on by itself; later steps that session are skipped.
   Recordings stay in memory for the step only (an object URL, revoked when the step ends): never saved, never sent.
   Speech recognition (a gentle "That sounded like ..." hint, never needed to go on): only when the browser can say the Spanish
   model runs ON THE DEVICE (SpeechRecognition.available({processLocally}) or the older availableOnDevice), and the recogniser is
   then started with processLocally (or mode 'ondevice-only'), so no audio ever leaves the tablet. Anything else: no hint, no message.
   Saved: S.esSpk (Grown-ups switch "Spanish speaking practice", per child; absent = on), S.day.spk (Spanish things said today; the
   daily mission "Say 5 Spanish words", 55-missions.js). Styles: src/css/42-say.css. */
const SPK={MAX:4,AT:3,GOAL:5,mic:'?',deny:0,sr:'',note:0,tok:0,state:'',url:'',st:null,mr:null,rec:null,au:null,iv:0,tm:[],heard:null,it:null,done:null};
const spkOn=()=>S.esSpk!==false&&S.esSpk!==0;
// once per session: is there a microphone? ('?' not asked, 'wait' asking, 'yes', 'no'); SPK.deny: the permission is blocked
function spkProbe(){if(SPK.mic!='?')return;
  try{const md=typeof navigator!='undefined'&&navigator.mediaDevices;
    if(inFrame||!md||!md.getUserMedia||typeof MediaRecorder=='undefined'){SPK.mic='no';return}
    SPK.mic='wait';
    Promise.resolve(md.enumerateDevices?md.enumerateDevices():[{kind:'audioinput'}]).then(ds=>{SPK.mic=ds.some(d=>d.kind=='audioinput')?'yes':'no'},()=>{SPK.mic='yes'});
    if(navigator.permissions&&navigator.permissions.query)navigator.permissions.query({name:'microphone'}).then(p=>{if(p.state=='denied')SPK.deny=1},()=>{});
    spkSrProbe()}catch(e){SPK.mic='no'}}
// on-device Spanish recognition only; '' = none (never a recogniser that might send audio to a server)
async function spkSrProbe(){SPK.sr='';try{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return;
  for(const l of ['es-MX','es-US','es-ES']){
    const a=typeof SR.available=='function'?await SR.available({langs:[l],processLocally:true}):typeof SR.availableOnDevice=='function'?await SR.availableOnDevice(l):'';
    if(!a)return;if(a=='available'){SPK.sr=l;return}}}catch(e){SPK.sr=''}}
// the round asks this before each question: the question just answered, when a "Say it!" step is due now (else null)
function spkWhen(g){if(!g||g.spk||g.dead||!spkOn())return null;const q=g.q;
  if(!q||q.afterLang!='es'||!q.after||!/^es_/.test(q.sk||''))return null;
  if(!(g.daily||g.path=='es'&&g.node>=0&&!g.boss&&!g.test&&!g.mix))return null;
  return g.done>=(g.daily?1:Math.min(SPK.AT,g.n))?q:null}
function spkHook(){const q=spkWhen(G);if(!q)return false;spkProbe();
  if(SPK.mic=='wait')return false; // still asking the tablet: try again after the next question
  G.spk=1;
  if(SPK.mic=='no'){if(!SPK.note){SPK.note=1;fb('No microphone here, so “Say it!” is skipped. Grown-ups: Spanish speaking practice needs a microphone.','info long',4000)}return false}
  if(SPK.deny&&SPK.note)return false; // blocked, and the grown-up was told once this session
  spkOpen(q,()=>next());return true}
// what to say: the Spanish, its picture and English (a unit word), or the character and the line before it (a dialogue line)
function spkItem(q){const t=String(q.after),o={es:t,say:t,en:'',pic:'',who:'',cue:null};
  try{if(q.dl&&q.ctx){const D=ES_STORY.dialogues.find(d=>d.title==q.ctx.title),i=D?D.lines.findIndex(l=>l[1]==t):-1;
      if(i>=0){o.who=D.lines[i][0];if(i>0)o.cue=D.lines[i-1];const f=ES_STORY.people[o.who];if(f)o.pic=picFor('',f)}}
    else{for(const k in SPN){const it=SPN[k].find(x=>esFull(x)==t);if(it){o.pic=picHTML(it,false);o.en=it[1];o.say=esSay(it);break}}
      if(!o.en&&q.sk=='es_phrase'&&q.lv==1)o.en=String(q.ans)}}catch(e){}
  return o}
/* ---- the lenient matcher (pure; tools/test.js "Spanish speaking S-SPK"): accents, case, punctuation and articles do not count,
   numerals are read as words, a few letters may differ in a longer phrase (not counting the articles), and the word inside a longer answer counts ("es la casa").
   target may hold alternatives split by " / " (cansado / cansada). Returns true or false. */
const SPK_ART=['el','la','los','las','un','una','unos','unas'];
const SPK_N=['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciseis','diecisiete','dieciocho','diecinueve','veinte'],
  SPK_T=['','','veinte','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
function spkNum(w){if(!/^\d{1,3}$/.test(w))return w;const n=+w;if(n<=20)return SPK_N[n];if(n==100)return'cien';if(n>100)return w;
  const t=Math.floor(n/10),u=n%10;return !u?SPK_T[t]:t==2?'veinti'+SPK_N[u]:SPK_T[t]+' y '+SPK_N[u]}
function spkNorm(s,keepArt){return String(s==null?'':s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[¿?¡!.,;:«»“”"'…()–—-]/g,' ')
  .split(/\s+/).filter(Boolean).map((w,i,a)=>w=='1'&&a[i-1]=='la'?'una':spkNum(w)).join(' ').split(' ').filter(w=>w&&(keepArt||!SPK_ART.includes(w))).join(' ')}
function spkDist(a,b){if(a==b)return 0;let p=Array.from({length:b.length+1},(_,j)=>j);
  for(let i=1;i<=a.length;i++){const c=[i];for(let j=1;j<=b.length;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]==b[j-1]?0:1));p=c}return p[b.length]}
function spkClose(t,h,fuzzy){if(!t||!h)return false;if(t==h)return true;
  const a=t.replace(/ /g,''),b=h.replace(/ /g,''),n=a.length,tol=n<=4?0:n<=8?1:Math.min(4,Math.floor(n/6));
  if(fuzzy&&spkDist(a,b)<=tol)return true;
  return n>=3&&(' '+h+' ').includes(' '+t+' ')} // the target said inside a longer answer
function spkMatch(target,heard){const hs=(Array.isArray(heard)?heard:[heard]).filter(x=>x!=null&&String(x).trim());
  for(const t of String(target).split(' / '))for(const h of hs)for(const k of [0,1]){const a=spkNorm(t,k),b=spkNorm(h,k);if(spkClose(a,b,!k))return true}
  return false}
/* ---- the screen ---- */
const spkLive=t=>t===SPK.tok&&!!$('#spkact');
function spkLeave(){SPK.tok++;clearInterval(SPK.iv);SPK.tm.forEach(clearTimeout);SPK.tm=[];
  try{if(SPK.mr&&SPK.mr.state=='recording')SPK.mr.stop()}catch(e){}
  try{if(SPK.rec)SPK.rec.abort()}catch(e){}
  try{if(SPK.st)SPK.st.getTracks().forEach(t=>t.stop())}catch(e){}
  try{if(SPK.au)SPK.au.pause()}catch(e){}
  if(SPK.url)try{URL.revokeObjectURL(SPK.url)}catch(e){}
  SPK.url='';SPK.st=SPK.mr=SPK.rec=SPK.au=null;SPK.state=''}
const spkT=(f,ms)=>{const t=SPK.tok;SPK.tm.push(setTimeout(()=>{if(spkLive(t))f()},ms))};
// an English line on screen; spoken too for Pre-K and K (and with "Read questions out loud" on)
function spkTip(t,speak){const e=$('#spktip');if(e)e.textContent=t;if(speak&&(SPK.pk||S.voice))say(t)}
function spkOpen(q,done){spkLeave();const it=spkItem(q),nov=esVoice()=='no'&&!esHas(it.say);SPK.it=it;SPK.done=done;SPK.pk=gradeOf()<=0;SPK.nov=nov;SPK.heard=null;
  view(`<div class="top tbar gx-mtop spk-top s-es">${UI.ibtn('close','Stop',{size:'sm',id:'quit'})}<div class="ttl gx-ttl"><span class="gx-tb">${ico('mic',24)}</span><span>Say it!</span></div></div>
  <div class="play spk s-es"><div class="spk-card">
   ${it.who?`<p class="spk-role">You are <b>${esc(it.who)}</b>! Say ${esc(it.who)}’s line.</p>`:''}
   ${it.cue?`<p class="spk-cue" lang="es"><b>${esc(it.cue[0])}:</b> ${esc(it.cue[1])}</p>`:''}
   ${it.pic?`<div class="spk-pic" aria-hidden="true">${it.pic}</div>`:''}
   <div class="spk-word"><span class="spk-es" lang="es">${esc(it.es)}</span>${nov?'':UI.ibtn('speak','Hear it again',{kind:'subject',p:'es',size:'lg',id:'spkhear'})}</div>
   ${it.en?`<p class="spk-en">${esc(it.en)}</p>`:''}
   <p class="spk-tip" id="spktip" role="status"></p>
   <div class="spk-act" id="spkact"></div>
   <p class="spk-heard" id="spkheard" role="status"></p></div>
  <div class="spk-foot">${UI.btn('Skip for now',{kind:'ghost',icon:'arrow-right',id:'spkskip'})}</div></div>`);
  $('#quit').onclick=()=>{spkLeave();if(G)G.dead=true;back()};
  $('#spkskip').onclick=()=>spkEnd(false);
  if($('#spkhear'))$('#spkhear').onclick=e=>say(it.say,e.currentTarget,'es');
  if(nov)esNote();
  if(SPK.deny&&!SPK.note)return spkGU('denied');
  spkReady(true)}
// ready: the big microphone
function spkReady(first){SPK.state='ready';const a=$('#spkact');
  a.innerHTML=`<button class="spk-mic" id="spkmic" aria-label="Record: say it in Spanish">${ico('mic',48)}</button><span class="spk-ml" aria-hidden="true">Tap, then say it</span>`;
  $('#spkmic').onclick=spkRec;
  // the English tip is spoken only the first time this session (or when there is no Spanish voice): an English line right
  // before the Spanish model made the tablet switch its speech engine, a gap of seconds; after that only the model is spoken.
  // ES-AUDIO: a recorded model plays straight after the English (no engine switch), so the tip is spoken every time
  const tipSay=SPK.nov||!spkReady.told||esHas(SPK.it.say);spkReady.told=true;
  spkTip(first?(SPK.nov?'Read it out loud: tap the microphone, then say it!':'Listen, then tap the microphone and say it!'):'Tap the microphone and say it again!',tipSay);
  if(!SPK.nov)say(SPK.it.say,null,'es',tipSay?1:0)} // the model (after the English line only the first time)
async function spkRec(){if(SPK.state=='rec')return spkStop();if(SPK.state!='ready')return;
  SPK.state='ask';const t=SPK.tok;let st;
  try{st=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){if(spkLive(t))spkGU(e&&e.name=='NotFoundError'?'none':'denied');return}
  if(!spkLive(t)){st.getTracks().forEach(x=>x.stop());return}
  hush();
  SPK.st=st;const ch=[];let mr;
  try{mr=new MediaRecorder(st)}catch(e){st.getTracks().forEach(x=>x.stop());SPK.st=null;return spkGU('none')}
  SPK.mr=mr;mr.ondataavailable=e=>{if(e.data&&e.data.size)ch.push(e.data)};
  mr.onstop=()=>{try{st.getTracks().forEach(x=>x.stop())}catch(e){}SPK.st=null;if(!spkLive(t))return;
    const b=new Blob(ch,{type:mr.mimeType||'audio/webm'});
    if(!b.size){spkReady(false);return spkTip('I didn’t hear anything. Tap the microphone and try again!',true)}
    SPK.url=URL.createObjectURL(b);spkPlay()};
  try{mr.start()}catch(e){st.getTracks().forEach(x=>x.stop());SPK.st=null;return spkGU('none')}
  spkSR(st);SPK.state='rec';let s=SPK.MAX;
  const a=$('#spkact'),dots=n=>`<span class="spk-dots" role="img" aria-label="${n} seconds left">${Array.from({length:SPK.MAX},(_,i)=>`<i class="${i<n?'on':''}"></i>`).join('')}</span>`;
  a.innerHTML=`<button class="spk-mic on" id="spkmic" aria-label="Stop recording">${ico('stop',48)}</button>${dots(s)}`;
  $('#spkmic').onclick=spkRec;spkTip('Say it now!');
  SPK.iv=setInterval(()=>{s--;const d=a.querySelector('.spk-dots');if(d)d.outerHTML=dots(Math.max(0,s));if(s<=0)spkStop()},1000)}
function spkStop(){clearInterval(SPK.iv);try{if(SPK.mr&&SPK.mr.state=='recording')SPK.mr.stop()}catch(e){}try{if(SPK.rec)SPK.rec.stop()}catch(e){}}
// on-device recognition alongside the recording (fed the same microphone track where the browser takes one)
function spkSR(st){SPK.heard=null;SPK.rec=null;const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SPK.sr||!SR)return;
  try{const r=new SR(),t=SPK.tok;r.lang=SPK.sr;r.interimResults=false;r.maxAlternatives=3;r.continuous=false;
    if('processLocally' in r)r.processLocally=true;else if('mode' in r)r.mode='ondevice-only';
    if(r.processLocally!==true&&r.mode!=='ondevice-only')return; // cannot promise on-device: not used
    r.onresult=e=>{if(t!==SPK.tok)return;const a=[];for(const x of e.results)for(let i=0;i<x.length;i++)a.push(x[i].transcript);SPK.heard=a;spkHeard()};
    r.onerror=e=>{if(/network|not-allowed|service|language|unavailable/.test(e&&e.error||''))SPK.sr=''};
    SPK.rec=r;const tr=st.getAudioTracks?st.getAudioTracks()[0]:null;r.start(tr)}catch(e){SPK.rec=null}}
// the gentle hint, once there is something heard and the comparison has played
function spkHeard(){const e=$('#spkheard'),h=SPK.heard;if(!e||SPK.state!='check'||!h||!h.length)return;
  const ok=spkMatch(SPK.it.es,h),said=(ok&&h.find(x=>spkMatch(SPK.it.es,x)))||h[0];
  e.innerHTML=`${ico(ok?'check-circle':'ear',22,ok?'ic-good':'ic-brand')}<span>That sounded like “<span lang="es">${esc(said)}</span>”.${ok?' ¡Muy bien!':' Listen again and compare.'}</span>`;e.classList.add('on')}
// the model, then the child's own recording, then the self-check
function spkModel(cb){const t=SPK.tok;if(SPK.nov)return spkT(cb,200);say(SPK.it.say,null,'es');const t0=Date.now();
  const w=()=>{if(!spkLive(t))return;const busy=speakBusy(); // the voice or the recording (ES-AUDIO)
    if(busy&&Date.now()-t0<6000)spkT(w,150);else spkT(cb,250)};spkT(w,400)}
function spkMine(cb){const t=SPK.tok;let fired=false;const go=()=>{if(fired||!spkLive(t))return;fired=true;cb()};
  try{const a=new Audio(SPK.url);SPK.au=a;a.onended=a.onerror=go;a.play().catch(go);sfxDuck(()=>!a.ended&&!a.paused)}catch(e){return go()}
  spkT(go,SPK.MAX*1000+1500)}
function spkPlay(){SPK.state='play';const a=$('#spkact');
  a.innerHTML=`<span class="spk-lis">${ico('ear',40)}</span>`;spkTip(SPK.nov?'Listen to yourself!':'Listen: first Spanish, then you!');
  spkModel(()=>spkMine(spkCheck))}
function spkCheck(){SPK.state='check';const a=$('#spkact');const cd=$('.spk-card');if(cd)cd.classList.add('chk');
  a.innerHTML=`<div class="spk-cmp">${SPK.nov?'':UI.btn('Hear it',{size:'sm',icon:'speak',id:'spkm'})}${UI.btn('Hear me',{size:'sm',icon:'play',id:'spkme'})}</div>
   <div class="spk-self">${UI.btn('I said it!',{kind:'primary',size:'lg',icon:'thumbs-up',id:'spkok'})}${UI.btn('Try again',{size:'lg',icon:'replay',id:'spkagain'})}</div>`;
  if($('#spkm'))$('#spkm').onclick=e=>say(SPK.it.say,e.currentTarget,'es');
  $('#spkme').onclick=()=>{try{if(SPK.au)SPK.au.pause();SPK.au=new Audio(SPK.url);SPK.au.play().catch(()=>{})}catch(e){}};
  $('#spkok').onclick=()=>spkEnd(true);
  $('#spkagain').onclick=()=>{const cd=$('.spk-card');if(cd)cd.classList.remove('chk');if(SPK.url)try{URL.revokeObjectURL(SPK.url)}catch(e){}SPK.url='';const h=$('#spkheard');if(h){h.innerHTML='';h.classList.remove('on')}spkReady(false)};
  spkTip(SPK.pk?'Did you say it? Tap the thumbs up, or try again!':'Did it sound the same? Tap “I said it!” or “Try again”.',true);
  spkHeard();spkT(spkHeard,1200)}
// a grown-up note: how to allow the microphone (or that none was found); goes on by itself
function spkGU(kind){SPK.state='gu';SPK.note=1;if(kind=='denied')SPK.deny=1;else SPK.mic='no';const a=$('#spkact');if(!a)return;const cd=$('.spk-card');if(cd)cd.classList.add('gu');
  const steps=kind=='denied'?`<p>The microphone is blocked for Star School. To allow it:</p><ol><li><b>Installed app:</b> press and hold the Star School icon, then App info, Permissions, Microphone, Allow.</li>
    <li><b>In Chrome:</b> tap the icon left of the web address, then Permissions (or Site settings), Microphone, Allow.</li></ol><p>Speaking practice tries again the next time Star School opens. Recordings are never kept.</p>`
    :`<p>No microphone was found on this device, so speaking practice is skipped. You can turn it off in Grown-ups.</p>`;
  a.innerHTML=`<div class="spk-gu" role="note"><h2 class="spk-guh">${ico('mic',24)}<span>For a grown-up</span></h2>${steps}</div>${UI.btn('Go on',{kind:'primary',icon:'arrow-right',id:'spkgo'})}`;
  $('#spkgo').onclick=()=>spkEnd(false);
  spkTip(SPK.pk?'Ask a grown-up to help with the microphone. Let’s go on!':'The microphone is not working here. Let’s go on!',true);
  spkT(()=>spkEnd(false),15000)}
// leave the step: "I said it!" counts one Spanish thing said today (the mission); a skip counts nothing and is never a miss
function spkEnd(said){const cb=SPK.done;spkLeave();
  if(said){const d=day();d.spk=Math.min(99,(d.spk|0)+1);save();SFX.magic();fb(d.spk==SPK.GOAL?'¡Muy bien! 5 Spanish words said today!':'¡Muy bien!')}
  SPK.done=null;if(cb)cb()}
