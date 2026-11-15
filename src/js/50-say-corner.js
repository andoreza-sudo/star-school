/* ---------- S-SPK2 A and C: Spanish listening on the tablet itself, and the grown-ups' listening corner ----------
   A. Spanish listening (Grown-ups card #gw-lis). Chrome can recognise speech ON THE DEVICE (Web Speech API: the static
      SpeechRecognition.available({langs, processLocally: true}) says 'available', 'downloadable', 'downloading' or 'unavailable';
      SpeechRecognition.install({langs, processLocally: true}) downloads the language once; a recogniser with processLocally = true
      never sends audio away. Older Chrome: availableOnDevice(lang) / installOnDevice(lang) / mode 'ondevice-only'). The card says
      what this tablet can do and, when Spanish can be downloaded, offers "Download Spanish listening" (needs internet once:
      onlineNote and needOnline, 88-online.js). Then "Say it!" (50-say.js spkSR) says what it heard and whether it matches. A server
      recogniser is never used: no on-device Spanish means the offline sound check (B, 50-say-cmp.js).
   C. The listening corner (Grown-ups card #gw-corner). The child's last Say it! recordings (at most SPKR.MAX per child) stay ON THIS
      TABLET in IndexedDB (database 'starschool-say', store 'rec': {id, kid, t, es, say, blob, star}; id is PRF.k('spk') + ':' + time,
      so each child's are their own) and are deleted after the period the grown-up picks (S.spkKeep: 'day' (absent), 'week', or
      'never': not kept at all). The card lists them with the word: Listen plays the model then the child, Give a star marks it and
      queues "Your grown-up gave you a star for '<word>'!" for Home (S.spkStars, shown once, with a sticker), and "Delete all
      recordings" removes them. Nothing is ever sent anywhere. */
const SPKL={LANGS:['es-MX','es-US','es-ES'],busy:0};
const spkSRC=()=>typeof window!='undefined'&&(window.SpeechRecognition||window.webkitSpeechRecognition)||null;
// what this tablet can do on the device: {s:'available'|'downloadable'|'downloading'|'unavailable'|'none', lang}
async function spkLisState(){const SR=spkSRC();if(!SR)return{s:'none',lang:''};const rank={unavailable:0,downloadable:1,downloading:2,available:3};
  let best={s:'unavailable',lang:''};
  try{for(const l of SPKL.LANGS){let a='';
      if(typeof SR.available=='function')a=await SR.available({langs:[l],processLocally:true});
      else if(typeof SR.availableOnDevice=='function')a=await SR.availableOnDevice(l);else return{s:'none',lang:''};
      if((rank[a]|0)>rank[best.s])best={s:a,lang:l};if(a=='available')break}}catch(e){}
  return best}
// download a language for on-device use (true when it is installed)
async function spkLisInstall(lang){const SR=spkSRC();if(!SR)return false;
  try{if(typeof SR.install=='function')return !!(await SR.install({langs:[lang],processLocally:true}));
    if(typeof SR.installOnDevice=='function')return !!(await SR.installOnDevice(lang))}catch(e){}
  return false}
const SPKL_TXT={available:'This tablet can listen to Spanish on the device. In “Say it!” it tells your child what it heard.',
  downloadable:'This tablet can listen to Spanish on the device after a one-time download.',
  downloading:'Spanish listening is downloading. It works once the download is done.',
  unavailable:'This tablet cannot listen to Spanish on the device. “Say it!” compares your child’s voice with the recorded Spanish instead.',
  none:'This browser cannot listen to Spanish on the device. “Say it!” compares your child’s voice with the recorded Spanish instead.'};
function spkLisCard(){return GW.card('gw-lis','ear','Spanish listening',
  `<p class="gw-note" id="lis-st" role="status">${ico('clock',22)}<span>Checking this tablet…</span></p><div id="lis-act"></div>
  <p class="gw-sub">Listening happens on the tablet itself. Your child’s voice is never sent anywhere.</p>`)}
async function spkLisBind(){const st=$('#lis-st');if(!st)return;const r=await spkLisState();if(!st.isConnected)return;
  const ok=r.s=='available';st.innerHTML=`${ico(ok?'check-circle':r.s=='downloadable'||r.s=='downloading'?'download':'info',22,ok?'ic-good':'')}<span>${SPKL_TXT[r.s]||SPKL_TXT.none}</span>`;
  const a=$('#lis-act');if(!a)return;
  if(r.s!='downloadable'){a.innerHTML='';return}
  a.innerHTML=`<div class="gw-bkrow">${UI.btn('Download Spanish listening',{size:'sm',icon:'download',id:'lis-dl'})}${onlineNote('Needs the internet once, for the download.')}</div>`;
  $('#lis-dl').onclick=e=>needOnline(async()=>{if(SPKL.busy)return;SPKL.busy=1;const b=e.currentTarget;b.disabled=true;
      st.innerHTML=`${ico('download',22)}<span>${SPKL_TXT.downloading}</span>`;
      const ok=await spkLisInstall(r.lang);SPKL.busy=0;if(!st.isConnected)return;
      if(ok){SPK.sr='';spkSrProbe();fb('Spanish listening is ready on this tablet.')}else fb('The download did not finish. Try again later.','warn');
      spkLisBind()},{block:true,msg:'You’re offline. Connect to wifi to download Spanish listening.'})}

/* ---- C: the listening corner ---- */
const SPKR={MAX:6,DAY:864e5,KEEP:{day:1,week:7,never:0},db:null,
  open(){return new Promise((res,rej)=>{if(this.db)return res(this.db);const r=indexedDB.open('starschool-say',1);
    r.onupgradeneeded=()=>r.result.createObjectStore('rec',{keyPath:'id'});r.onsuccess=()=>{this.db=r.result;res(this.db)};r.onerror=()=>rej(r.error)})},
  async all(){const d=await this.open();return new Promise(res=>{const out=[],c=d.transaction('rec').objectStore('rec').openCursor();
    c.onsuccess=e=>{const x=e.target.result;if(x){out.push(x.value);x.continue()}else res(out)};c.onerror=()=>res(out)})},
  async put(v){const d=await this.open();return new Promise((res,rej)=>{const t=d.transaction('rec','readwrite');t.objectStore('rec').put(v);t.oncomplete=()=>res();t.onerror=()=>rej(t.error)})},
  async del(id){const d=await this.open();return new Promise(res=>{const t=d.transaction('rec','readwrite');t.objectStore('rec').delete(id);t.oncomplete=()=>res();t.onerror=()=>res()})}};
const spkKeep=()=>SPKR.KEEP[S.spkKeep]!=null?S.spkKeep:'day';
const spkKid=r=>r&&typeof r.id=='string'&&r.id.startsWith(PRF.k('spk')+':');
// which of a child's recordings go (pure): older than the period, or past the newest MAX; 'never' keeps none
function spkrGone(recs,now,keep){const days=SPKR.KEEP[keep]!=null?SPKR.KEEP[keep]:1,s=recs.slice().sort((a,b)=>b.t-a.t);
  return s.filter((r,i)=>!days||i>=SPKR.MAX||!(now-r.t<days*SPKR.DAY)||r.t>now+SPKR.DAY).map(r=>r.id)}
// this child's recordings, newest first, after deleting what is past its time
async function spkrList(){try{const all=(await SPKR.all()).filter(spkKid),gone=new Set(spkrGone(all,Date.now(),spkKeep()));
    for(const id of gone)await SPKR.del(id);return all.filter(r=>!gone.has(r.id)).sort((a,b)=>b.t-a.t)}catch(e){return[]}}
// keep a Say it! recording (50-say.js, after each recording); nothing when the grown-up picked "Don't keep"
async function spkrAdd(blob,it){if(!blob||!blob.size||!it||spkKeep()=='never')return;
  try{await SPKR.put({id:PRF.k('spk')+':'+Date.now(),kid:PRF.cur,t:Date.now(),es:it.es,say:it.say,blob,star:0});await spkrList()}catch(e){}}
// delete a child's recordings (this child: Delete all; another: when that child is removed or starts over, PRF.dropClips)
async function spkrDrop(id=PRF.cur){try{const p=PRF.k('spk',id)+':';for(const r of await SPKR.all())if(String(r.id).startsWith(p))await SPKR.del(r.id)}catch(e){}}
// a star from the grown-up: marked on the recording and queued for Home (once)
async function spkrStar(r){if(!r||r.star)return;r.star=1;try{await SPKR.put(r)}catch(e){}
  S.spkStars=(Array.isArray(S.spkStars)?S.spkStars:[]).concat([{es:String(r.es),t:Date.now()}]).slice(-10);save()}
const SPKC_URLS=[];
function spkrFree(){while(SPKC_URLS.length)try{URL.revokeObjectURL(SPKC_URLS.pop())}catch(e){}}
function spkCornerCard(){const k=spkKeep();
  return GW.card('gw-corner','ear','Listening corner',`<div id="lc-list" class="lc-list" aria-live="polite"><p class="gw-sub">Looking for recordings…</p></div>
    <div class="gw-row"><span class="gw-rl">Keep recordings</span>${GW.seg('keep',['day','week','never'],k,'Keep Say it! recordings for',v=>({day:'1 day',week:'1 week',never:'Don’t keep'})[v])}</div>
    ${UI.btn('Delete all recordings',{size:'sm',kind:'ghost',icon:'trash',id:'lc-del',cls:'gw-risk'})}`,
    {sub:'Hear your child’s last “Say it!” tries: the Spanish first, then your child. Tap the star to cheer them on. Recordings stay on this tablet and are deleted automatically.'})}
const spkWhen2=t=>{const d=new Date(t),n=new Date();const hm=d.toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});
  return d.toDateString()==n.toDateString()?'Today '+hm:d.toLocaleDateString([],{weekday:'short'})+' '+hm};
async function spkCornerBind(){
  $$('[data-keep]').forEach(b=>b.onclick=async()=>{S.spkKeep=b.dataset.keep;save();
    $$('[data-keep]').forEach(x=>{const on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',String(on))});await spkCornerFill()});
  const del=$('#lc-del');let armed=false;
  if(del)del.onclick=async()=>{if(!armed){armed=true;del.querySelector('span').textContent='Tap again to delete them';return}
    armed=false;del.querySelector('span').textContent='Delete all recordings';await spkrDrop();fb('Recordings deleted.');await spkCornerFill()};
  await spkCornerFill()}
async function spkCornerFill(){const L=$('#lc-list');if(!L)return;const rs=await spkrList();if(!L.isConnected)return;spkrFree();
  if(!rs.length){L.innerHTML=`<p class="gw-note">${ico('mic',22)}<span>${spkKeep()=='never'?'Recordings are not kept. Pick 1 day or 1 week to hear them here.':'No recordings yet. They show here after your child uses “Say it!”.'}</span></p>`;return}
  const nm=esc(S.name||'your child');
  L.innerHTML=rs.map((r,i)=>`<div class="lc-row"><span class="lc-w"><b lang="es">${esc(r.es)}</b><small>${esc(spkWhen2(r.t))}</small></span>
    <span class="lc-b">${UI.btn('Listen',{size:'sm',icon:'play',attrs:`data-lcp="${i}" aria-label="Listen: ${esc(r.es)}, the Spanish then ${nm}"`})}
    <button class="btn soft sm lc-star${r.star?' on':''}" data-lcs="${i}" aria-pressed="${!!r.star}" aria-label="${r.star?'Star given for ':'Give a star for '}${esc(r.es)}">${ico('star',24,r.star?'ic-star':'')}<span>${r.star?'Star given':'Star'}</span></button></span></div>`).join('');
  $$('[data-lcp]').forEach(b=>b.onclick=()=>spkCornerPlay(rs[+b.dataset.lcp],b));
  $$('[data-lcs]').forEach(b=>b.onclick=async()=>{const r=rs[+b.dataset.lcs];if(r.star)return;await spkrStar(r);SFX.chime();
    fb((S.name||'Your child')+' will see your star on Home.');spkCornerFill()})}
// the model (the recording of the line, or the tablet's voice), then the child's recording
function spkCornerPlay(r,btn){if(!r)return;hush();say(r.say||r.es,btn,'es');const t0=Date.now();
  const w=()=>{if(speakBusy()&&Date.now()-t0<6000)return setTimeout(w,150);
    try{const u=URL.createObjectURL(r.blob);SPKC_URLS.push(u);const a=new Audio(u);a.play().catch(()=>{})}catch(e){}};setTimeout(w,400)}

/* ---- Home: "Your grown-up gave you a star for 'mariposa'!" once, with a sticker for each star (at most 3) ---- */
function spkStarHTML(){const q=Array.isArray(S.spkStars)?S.spkStars.filter(x=>x&&x.es):[];if(!q.length)return'';
  const ws=[...new Set(q.map(x=>String(x.es)))],st=[];for(let i=0;i<Math.min(3,q.length);i++)st.push(award().s);
  S.spkStars=[];save();const said=`Your grown-up gave you a star for ${ws.join(' and ')}!`;
  setTimeout(()=>{if($('#hmgstar')&&(S.voice||gradeOf()<=0))say(said,null,null,1)},600); // Pre-K and K hear it too
  const list=ws.length==1?`‘${esc(ws[0])}’`:ws.slice(0,-1).map(w=>`‘${esc(w)}’`).join(', ')+` and ‘${esc(ws[ws.length-1])}’`;
  return`<div class="hm-gstar" id="hmgstar" role="status"><span class="hm-gsi">${ico('star',36)}</span><p>Your grown-up gave you a star for <span lang="es">${list}</span>! <span class="hm-gsk">You got a sticker: <span class="hm-gse" role="img" aria-label="sticker">${st.join(' ')}</span></span></p></div>`}
