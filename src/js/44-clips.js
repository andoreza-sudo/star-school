/* ---------- your-voice clips (stored on this tablet) ---------- */
const DB={db:null,open(){return new Promise((res,rej)=>{if(this.db)return res(this.db);const r=indexedDB.open('starschool',1);
  r.onupgradeneeded=()=>r.result.createObjectStore('clips',{keyPath:'id'});r.onsuccess=()=>{this.db=r.result;res(this.db)};r.onerror=()=>rej(r.error)})},
  async all(){const d=await this.open();return new Promise(res=>{const out=[],c=d.transaction('clips').objectStore('clips').openCursor();c.onsuccess=e=>{const x=e.target.result;if(x){out.push(x.value);x.continue()}else res(out)};c.onerror=()=>res(out)})},
  async put(v){const d=await this.open();return new Promise((res,rej)=>{const t=d.transaction('clips','readwrite');t.objectStore('clips').put(v);t.oncomplete=()=>res();t.onerror=()=>rej(t.error)})},
  async del(id){const d=await this.open();return new Promise(res=>{const t=d.transaction('clips','readwrite');t.objectStore('clips').delete(id);t.oncomplete=()=>res();t.onerror=()=>res()})}};
let CLIPS=[];
async function loadClips(){try{CLIPS.forEach(c=>URL.revokeObjectURL(c.url));CLIPS=(await DB.all()).map(c=>({...c,url:URL.createObjectURL(c.blob)}))}catch(e){CLIPS=[]}}
const BAG={};
function playClip(kind){const cs=CLIPS.filter(c=>c.kind==kind);if(!cs.length||!S.sound)return false;
  let b=(BAG[kind]||[]).filter(id=>cs.some(c=>c.id==id));
  if(!b.length){b=shuffle(cs.map(c=>c.id));if(b.length>1&&b[0]==BAG['last_'+kind])b.push(b.shift())}
  const id=b.shift();BAG[kind]=b;BAG['last_'+kind]=id;const c=cs.find(x=>x.id==id);
  try{speechSynthesis.cancel();const a=new Audio(c.url);a.play().catch(()=>{});sfxDuck(()=>!a.ended&&!a.paused);return true}catch(e){return false}}
const CLIPKINDS=[
 ['cheer','Cheers','Played after right answers.',['Great job, {name}!','You\'re so smart!','Way to go!','Boom! You nailed it!','I\'m so proud of you!','High five!'],'party'],
 ['oops','Try again','Played sometimes after a miss.',['That\'s okay, try again!','Almost! Look again.','You can do it!','Mistakes help us learn!','Take your time, buddy.','Give it another try!'],'thumbs-up'],
 ['done','Round done','Played when a round ends.',['What a great round!','You worked so hard!','You\'re a superstar!','Wow, look at all those stars!','I love learning with you!','Let\'s do another one!'],'trophy']];
const inFrame=(()=>{try{return window.self!==window.top}catch(e){return true}})();
function micHelp(kind){const o=document.createElement('div');o.className='ovl';o.style.padding='20px';
  const body=kind=='frame'?`<p>Recording is turned off in this preview window. Open <b>Star School on the tablet</b> (the installed app or Chrome) and record there.</p>`
   :kind=='none'?`<p>No microphone was found on this device.</p>`
   :`<p>The microphone is blocked for Star School. To allow it:</p><ol style="text-align:left;max-width:520px;font-size:18px;line-height:1.5">
     <li><b>Installed app:</b> press and hold the Star School icon → <b>App info</b> → <b>Permissions</b> → <b>Microphone</b> → <b>Allow</b>.</li>
     <li><b>In Chrome:</b> tap the icon left of the web address → <b>Permissions</b> (or Site settings) → <b>Microphone</b> → <b>Allow</b>.</li>
     <li>Come back here and tap ${ico('record','1.2em','ic-rec')} again.</li></ol>`;
  o.innerHTML=`<div style="background:#fff;color:var(--ink);border-radius:24px;padding:20px;max-width:600px;text-align:center"><h2 style="margin:0 0 8px">${ico('mic','1em','ic-brand')} Microphone</h2>${body}<button class="btn big" id="mok">OK</button></div>`;
  document.body.appendChild(o);o.querySelector('#mok').onclick=()=>o.remove()}

