/* ---------- grown-ups ----------
   P4-12 (DESIGN_SYSTEM 9 row 6): a calm adult layout in the same system. Each section is a card with an icon header (GW.card);
   switches, segmented controls, fields and a readable table from the P4-04 components; two columns on a wide screen. Styles in
   src/css/48-setup-grown-care.css. Every id the code and the tests use is kept: #back, #nm, #pn, #bd, .gr[data-g], .pl-grown,
   #ula, #rp-open, [data-rec], [data-play], [data-del], [data-per], [data-max], #pt5, #pt0, #ptp, #applog, #voice, #snd, #mus, #calm,
   #test, #reset. The report card's Print button (82-report.js) and the backup Save buttons (81-backup.js, P5-07) carry the online note. */
const GW = {
  // a section: icon disc + title, an optional line under it, then the body. tone: a subject or token class for the disc colour.
  card(id, icon, title, body, o = {}) {
    return `<section class="gw-card${o.cls ? ' ' + o.cls : ''}"${id ? ` id="${id}"` : ''}><h2 class="gw-h"><span class="gw-hi${o.tone ? ' ' + o.tone : ''}">` +
      `${ico(icon, 24)}</span><span>${title}</span></h2>${o.sub ? `<p class="gw-sub">${o.sub}</p>` : ''}${body}</section>`;
  },
  // a labelled text field (label above, white well with an icon)
  field(label, icon, attrs, help) {
    return `<div class="gw-f"><span class="gw-fl">${label}</span>${fldHTML(icon, attrs)}${help ? `<span class="gw-help">${help}</span>` : ''}</div>`;
  },
  // a small number tile: icon, value, caption
  stat(icon, cls, v, cap) {
    return `<div class="gw-st">${ico(icon, 28, cls)}<b>${v}</b><span>${cap}</span></div>`;
  },
  // a segmented row whose buttons keep their data-<key> attribute (data-per / data-max)
  seg(key, vals, cur, label, name) {
    return `<div class="seg gw-seg" role="group" aria-label="${label}">${vals.map(v => `<button data-${key}="${v}" aria-pressed="${v == cur}"` +
      ` class="${v == cur ? 'on' : ''}">${name(v)}</button>`).join('')}</div>`;
  },
};
function grown(){let armed=false;
  const rows=[...new Set(Object.values(NODES).flat().map(n=>n.sk))].filter(id=>SK[id]).map(id=>{const p=P(id),s=SK[id],acc=p.t?Math.round(p.c/p.t*100)+'%':'–';
    const tricky=Object.values(p.miss).sort((a,b)=>b.tot-a.tot).slice(0,3).map(m=>esc(m.q.label)).join('<br>');
    return`<tr><td>${ico(icoSk(id),'1.2em','ic-'+s.area)} ${s.t}</td><td class="n">${p.r}</td><td class="n">${acc}</td><td class="tr">${tricky}</td></tr>`}).join('');
  const paths=Object.keys(PATHS).map(p=>{const n=NODES[p].filter((x,i)=>passed(p,i)).length,t=NODES[p].length;
    return`<div class="gw-path s-${p}"><span class="gw-pi">${ico(UI.SUBJ_ICON[p]||'map',22)}</span><span class="gw-pn">${esc(placeName(p))}</span>`+
      `${UI.meter(t?n/t:0,{p,label:`${placeName(p)}: ${n} of ${t} stops`})}<b>${n}/${t}</b></div>`}).join('');
  const canRec=!!(navigator.mediaDevices&&window.MediaRecorder),pc=ptCfg(),bank=pt(),gt=ptGate(),warn=t=>`<p class="gw-warn">${ico('warning',22)}<span>${t}</span></p>`;
  const clips=CLIPKINDS.map(([k,l,tip,lines,ic])=>{const cs=CLIPS.filter(c=>c.kind==k),extra=cs.filter(c=>c.line==null||c.line>=lines.length);
    const row=(txt,c,line)=>`<div class="vline gw-vl${c?' has':''}"><span class="vtxt">${c?ico('check-circle',22,'ic-good'):ico('circle',22,'ic-off')}<span>${txt}</span></span>`+
      (c?UI.ibtn('play','Play',{size:'sm',attrs:`data-play="${c.id}"`})+UI.ibtn('trash','Delete',{size:'sm',kind:'',cls:'gw-del',attrs:`data-del="${c.id}"`})
        :UI.btn('Record',{size:'sm',icon:'record',cls:'rec gw-rec',attrs:`data-rec="${k}|${line}"`}))+`</div>`;
    return`<div class="vrow gw-vr"><h3 class="gw-h3">${ico(ic,22,'ic-brand')}<span>${l}</span><span class="gw-n">${cs.length} recorded</span></h3><p class="gw-sub">${tip}</p>
      ${lines.map((t,i)=>row('“'+esc(t.replace('{name}',S.name))+'”',cs.find(c=>c.line==i),i)).join('')}
      ${extra.map((c,i)=>row('Your own #'+(i+1),c,null)).join('')}
      <div class="vline gw-vl"><span class="vtxt">${ico('plus',22,'ic-off')}<span>Say anything you like</span></span>${UI.btn('Record',{size:'sm',icon:'record',cls:'rec gw-rec',attrs:`data-rec="${k}|x"`})}</div></div>`}).join('');
  const nstk=STK.filter(s=>S.stickers[s]).length;
  view(`<div class="top tbar adult gw-top">${UI.ibtn('back','Back',{size:'sm',id:'back'})}<div class="ttl gx-ttl"><span class="gx-tb gw-tb">${ico('gear',24)}</span><span><span class="nw">Grown-ups</span></span></div></div>
  <div class="scroll gw"><div class="gw-cols">
  ${GW.card('gw-sum','user',esc(S.name||'Your child')+' at a glance',
    `<div class="gw-stats">${GW.stat('star','ic-star',S.stars,'stars')}${GW.stat('coin','ic-coin',S.coins,'coins')}${GW.stat('sticker-book','ic-brand',nstk+'/'+STK.length,'stickers')}${GW.stat('flame','ic-flame',S.best||0,'best streak')}</div>
    <h3 class="gw-h3">${ico('map',22,'ic-brand')}<span>Stops passed</span></h3><div class="gw-paths">${paths}</div>
    ${SAVE_FAILED?warn('Could not save progress: the device storage may be full.'):''}`,{sub:esc(gradeSpoken(gradeOf()))+'. Everything is saved on this tablet only.'})}
  ${reportGrownHTML()}
  ${GW.card('gw-kid','edit','Names',GW.field('Child','user',`id="nm" value="${esc(S.name)}"`)+GW.field('Pet name','paw',`id="pn" value="${esc(S.petName)}" placeholder="${PETS[S.pet].def}"`)+
    GW.field('Buddy','users',`id="bd" value="${esc(S.buddy)}" placeholder="A sibling or friend"`,'Used in story problems.'))}
  ${GW.card('gw-grade','map','Grade and level',gradePickHTML(gradeOf())+placeGrownHTML()+`<div class="gw-sw">${UI.sw('Unlock every stop on the map (let them jump ahead)',S.unlockAll,'ula')}</div>`,
    {sub:'Picks where the maps start. Nothing is ever locked or removed when you change it.'})}
  ${GW.card('gw-time','gamepad','Game time',`<div class="gw-stats two">${GW.stat('ticket','ic-play',fmtT(bank.bank),'in the bank')}${GW.stat('timer','ic-brand',fmtT(bank.used),'used today')}</div>
    <div class="gw-row"><span class="gw-rl">Minutes per round</span>${GW.seg('per',[2,3,5],pc.per,'Minutes per round',v=>v)}</div>
    <div class="gw-row"><span class="gw-rl">Daily max</span>${GW.seg('max',[15,30,45,60,0],pc.max,'Daily max in minutes',v=>v||'No limit')}</div>
    <div class="gw-row"><span class="gw-rl">Learn first, minutes</span>${GW.seg('need',[0,5,10,15,20,30],pc.need,'Minutes of learning needed each day before the Game Room opens',v=>v||'None')}</div>
    ${pc.need?`<p class="gw-note" id="ptneed">${ico('clock',22)}<span>${!gt.more?`Learning today: ${pc.need} of ${pc.need} minute${pc.need==1?'':'s'}. The Game Room is open.`:`Learning today: ${Math.floor(gt.done/60)} of ${pc.need} minute${pc.need==1?'':'s'}. The Game Room opens at ${pc.need}.`}</span></p>
    <div class="gw-sw">${UI.sw('Open the Game Room today anyway',bank.open===today(),'pto')}</div>`:''}
    <div class="gw-row"><span class="gw-rl">Bank</span><span class="gw-btns">${UI.btn('+5 min',{size:'sm',icon:'plus',id:'pt5'})}${UI.btn('Empty bank',{size:'sm',kind:'ghost',icon:'trash',id:'pt0',cls:'gw-risk'})}</span></div>
    <div class="gw-sw">${UI.sw('Pause game time (games locked)',pc.pause,'ptp')}</div>`,{tone:'s-play',sub:'Each learning round earns game time, plus a bonus for 10 out of 10, bosses, tests, puzzles and the Daily Review.'})}
  ${GW.card('gw-snd','sound-on','Sound and voice',`<div class="gw-sw">${UI.sw('Read questions out loud',S.voice,'voice')}${UI.sw('Sound effects',S.sound,'snd')}${UI.sw('Music on the home screen',S.music,'mus')}${UI.sw('Calm mode: less movement, no confetti',!!S.calm,'calm')}</div>
    ${UI.btn('Test voice',{size:'sm',icon:'speak',id:'test'})}`)}
  ${GW.card('gw-rec','mic','Your voice',(inFrame?warn('Recording only works on the tablet app, not in this preview.'):!canRec?warn("Recording isn't available in this browser. Use Chrome or the installed app."):'')+clips,
    {sub:`Tap Record and say the line (up to 4 seconds). Record as many as you like; the app shuffles them so the same one doesn't play twice in a row.`})}
  ${GW.card('gw-skills','chart','Skills',`<div class="tblw gw-tbl"><table class="tbl"><thead><tr><th>Skill</th><th class="n">Rounds</th><th class="n">1st try</th><th>Tricky ones</th></tr></thead><tbody>${rows}</tbody></table></div>`,
    {sub:'Rounds played and first-try accuracy for every skill on the maps, with the questions missed most.'})}
  ${GW.card('gw-how','info','How it works',`<p class="gw-p">Each subject has its own map. Getting 7 of 10 right opens the next stop (8 earns 2 stars, 10 earns 3), and each world stretches further. Missed questions come back at the end of a round, in later rounds, in Daily Review and in the Tricky Mix. Each right answer earns a star (the pet grows) and a coin (spent in the shop). Everything is saved on this tablet only.</p>`)}
  <details class="gw-card gw-det" id="applog"><summary class="gw-h"><span class="gw-hi">${ico('doc',24)}</span><span>App log</span>${ico('chevron-right',22,'chev')}</summary><div class="gw-log">
   <div><b>Version</b> __VER__</div><div><b>Save size</b> ${(JSON.stringify(S).length/1024).toFixed(1)} KB</div>
   <div><b>Storage</b> ${SAVE_FAILED?'<span class="gw-bad">could not save (device storage may be full)</span>':'saving OK'}</div>
   ${SAVE_CORRUPT?'<div class="gw-bad">The old save could not be read. A fresh start was made and the old data was kept on the device.</div>':''}
   <div><b>Last errors</b> ${(S.err||[]).length?'<ul class="gw-errs">'+(S.err||[]).slice().reverse().map(e=>'<li><span>'+esc(new Date(e.t).toLocaleString())+' '+esc(e.ver)+'</span> '+esc(e.msg)+'</li>').join('')+'</ul>':'none'}</div></div></details>
  ${BAK.card()}
  ${GW.card('gw-reset','warning','Start over',`<div class="gw-bkrow">${UI.btn('Save a backup first',{size:'sm',icon:'download',id:'bk-first'})}${onlineNote()}</div>${UI.btn('Erase everything',{size:'sm',kind:'risk',icon:'trash',id:'reset'})}`,{tone:'gw-dz',sub:'Erases all progress, the pet, stars, coins and voice recordings on this tablet. This cannot be undone, so save a backup first if you may want it back.'})}
  </div></div>`);
  $('#back').onclick=()=>home(true);
  $('#nm').oninput=e=>{if(e.target.value.trim()){S.name=e.target.value.trim();save()}};
  $('#pn').oninput=e=>{S.petName=e.target.value.trim();save()};
  $('#bd').oninput=e=>{S.buddy=e.target.value.trim();save()};
  gradePickBind(g=>{setGrade(g)});
  placeGrownBind();
  reportGrownBind();
  BAK.bind();
  $('#ula').onchange=e=>{S.unlockAll=e.target.checked;save()};
  $$('[data-per]').forEach(b=>b.onclick=()=>{ptCfg().per=+b.dataset.per;save();grown()});
  $$('[data-max]').forEach(b=>b.onclick=()=>{ptCfg().max=+b.dataset.max;save();grown()});
  $('#pt5').onclick=()=>{ptEarn(300);grown()};$('#pt0').onclick=()=>{pt().bank=0;save();grown()};
  $('#ptp').onchange=e=>{ptCfg().pause=e.target.checked;save()};
  $$('[data-need]').forEach(b=>b.onclick=()=>{ptCfg().need=+b.dataset.need;save();grown()});
  if($('#pto'))$('#pto').onchange=e=>{const p=pt();if(e.target.checked)p.open=today();else p.open='';save()};
  $('#voice').onchange=e=>{S.voice=e.target.checked;save()};
  $('#snd').onchange=e=>{S.sound=e.target.checked;save()};
  $('#mus').onchange=e=>{S.music=e.target.checked;save()};
  $('#calm').onchange=e=>{S.calm=e.target.checked;save();calmApply(true)}; // P4-17
  $('#test').onclick=e=>say(`Hello ${S.name}! I can read to you.`,e.currentTarget);
  $$('[data-play]').forEach(b=>b.onclick=()=>{const c=CLIPS.find(x=>x.id==b.dataset.play);if(c)new Audio(c.url).play().catch(()=>{})});
  $$('[data-del]').forEach(b=>b.onclick=async()=>{await DB.del(b.dataset.del);await loadClips();grown()});
  $$('[data-rec]').forEach(b=>b.onclick=()=>{const[k,l]=b.dataset.rec.split('|');record(k,l=='x'?null:+l,b)});
  $('#reset').onclick=async e=>{if(!armed){armed=true;e.currentTarget.querySelector('span').textContent='Tap again to erase ALL progress';return}SAVE_HOLD=true;try{localStorage.removeItem(KEY);localStorage.removeItem(BAK.UNDO)}catch(x){}
    // the voice clips (IndexedDB) go too; the reload never waits on IndexedDB for long (an open that never finished on a busy
    // tablet left the old progress on screen): it comes when the delete is done, blocked or failed, or after 1.5 s at most
    let gone=false;const go=()=>{if(!gone){gone=true;location.reload()}};
    try{if(DB.db){DB.db.close();DB.db=null}const r=indexedDB.deleteDatabase('starschool');r.onsuccess=r.onerror=r.onblocked=go}catch(x){go()}
    setTimeout(go,1500)}}
async function record(kind,line,btn){if(inFrame)return micHelp('frame');if(!navigator.mediaDevices||!window.MediaRecorder)return micHelp('frame');
  try{const pm=await navigator.permissions.query({name:'microphone'});if(pm.state=='denied')return micHelp('denied')}catch(e){}
  let st;try{st=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){return micHelp(e&&e.name=='NotFoundError'?'none':'denied')}
  music(false);const mr=new MediaRecorder(st),ch=[];mr.ondataavailable=e=>{if(e.data.size)ch.push(e.data)};
  mr.onstop=async()=>{st.getTracks().forEach(t=>t.stop());const blob=new Blob(ch,{type:mr.mimeType||'audio/webm'});
    try{await DB.put({id:String(Date.now()),kind,line,blob});await loadClips();const c=CLIPS.find(x=>x.blob===blob)||CLIPS[CLIPS.length-1];if(c)new Audio(c.url).play().catch(()=>{})}catch(e){fb("Couldn't save the clip",'warn')}
    grown()};
  mr.start();let s=4;btn.innerHTML=ico('record',22,'ic-rec')+'<span>Recording… '+s+'</span>';btn.classList.add('is-rec');
  const iv=setInterval(()=>{s--;if(s<=0){clearInterval(iv);if(mr.state=='recording')mr.stop()}else btn.innerHTML=ico('record',22,'ic-rec')+'<span>Recording… '+s+'</span>'},1000);
  btn.onclick=()=>{clearInterval(iv);if(mr.state=='recording')mr.stop()}}

