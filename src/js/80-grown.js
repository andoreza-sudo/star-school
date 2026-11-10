/* ---------- grown-ups ---------- */
function grown(){let armed=false;
  const rows=[...new Set(Object.values(NODES).flat().map(n=>n.sk))].filter(id=>SK[id]).map(id=>{const p=P(id),s=SK[id],acc=p.t?Math.round(p.c/p.t*100)+'%':'–';
    const tricky=Object.values(p.miss).sort((a,b)=>b.tot-a.tot).slice(0,3).map(m=>esc(m.q.label)).join('<br>');
    return`<tr><td>${s.e} ${s.t}</td><td>${p.r}</td><td>${acc}</td><td class="tr">${tricky}</td></tr>`}).join('');
  const prog=Object.keys(PATHS).map(p=>`${PATHS[p].e} ${NODES[p].filter((n,i)=>passed(p,i)).length}/${NODES[p].length}`).join(' · '),canRec=!!(navigator.mediaDevices&&window.MediaRecorder);
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title">Grown-ups</div></div><div class="scroll">
  <div class="card"><div class="row"><b style="width:110px">Child</b><input class="name" id="nm" value="${esc(S.name)}"></div>
   <div class="row"><b style="width:110px">Pet name</b><input class="name" id="pn" value="${esc(S.petName)}" placeholder="${PETS[S.pet].def}"></div>
   <div class="row"><b style="width:110px">Buddy</b><input class="name" id="bd" value="${esc(S.buddy)}" placeholder="Sibling or friend, used in story problems"></div>
   <div class="small">Stops passed: ${prog}<br>⭐ ${S.stars} stars · ${ico('coin','1.2em','ic-coin')} ${S.coins} coins · 📒 ${STK.filter(s=>S.stickers[s]).length}/${STK.length} stickers · 🔥 best streak ${S.best||0}</div>
   ${SAVE_FAILED?'<div class="small" style="color:#c0392b;font-weight:700">Could not save progress: the device storage may be full.</div>':''}
   <div class="row" style="display:block;margin-top:12px"><b>Grade</b> <span class="small">Picks where the maps start. Nothing is ever locked or removed when you change it.</span>${gradePickHTML(gradeOf())}</div>
   <label class="tg"><input type="checkbox" id="ula" ${S.unlockAll?'checked':''}> Unlock every stop on the map (let them jump ahead)</label></div>
  <div class="card"><h2 style="margin:0 0 6px">🎙️ Your voice</h2><div class="small" style="margin-bottom:8px">Tap ⏺ and say the line (up to 4 seconds). Record as many as you like. The app shuffles them so the same one doesn't play twice in a row. ${inFrame?'<b>Recording only works on the tablet app, not in this preview.</b>':!canRec?'<b>Recording isn\'t available in this browser. Use Chrome or the installed app.</b>':''}</div>
   ${CLIPKINDS.map(([k,l,tip,lines])=>{const cs=CLIPS.filter(c=>c.kind==k),extra=cs.filter(c=>c.line==null||c.line>=lines.length);
     const row=(txt,c,line)=>`<div class="vline"><span class="vtxt">${c?'✅':'⚪'} ${txt}</span>${c?`<button class="btn xs" data-play="${c.id}">▶</button><button class="btn xs danger" data-del="${c.id}">🗑</button>`:`<button class="btn xs rec" data-rec="${k}|${line}">⏺ Record</button>`}</div>`;
     return`<div class="vrow"><b>${l}</b> <span class="small">${tip} (${cs.length} recorded)</span>
       ${lines.map((t,i)=>row('“'+esc(t.replace('{name}',S.name))+'”',cs.find(c=>c.line==i),i)).join('')}
       ${extra.map((c,i)=>row('Your own #'+(i+1),c,null)).join('')}
       <div class="vline"><span class="vtxt small">➕ Say anything you like</span><button class="btn xs rec" data-rec="${k}|x">⏺ Record</button></div></div>`}).join('')}</div>
  <div class="card"><h2 style="margin:0 0 6px">🎮 Game time</h2><div class="small">Each learning round earns game time (plus a bonus for 10/10, bosses, and tests). Bank right now: <b>${fmtT(pt().bank)}</b> · used today: <b>${fmtT(pt().used)}</b></div>
   <div class="vline"><span class="vtxt">Minutes per round</span>${[2,3,5].map(v=>`<button class="btn xs ${ptCfg().per==v?'on':''}" data-per="${v}">${v}</button>`).join('')}</div>
   <div class="vline"><span class="vtxt">Daily max</span>${[15,30,45,60,0].map(v=>`<button class="btn xs ${ptCfg().max==v?'on':''}" data-max="${v}">${v||'No limit'}</button>`).join('')}</div>
   <div class="vline"><span class="vtxt">Give a bonus</span><button class="btn xs" id="pt5">+5 min</button><button class="btn xs danger" id="pt0">Empty bank</button></div>
   <label class="tg"><input type="checkbox" id="ptp" ${ptCfg().pause?'checked':''}> Pause game time (games locked)</label></div>
  <div class="card"><div class="tw"><table><tr><th>Skill</th><th>Rounds</th><th>1st try</th><th>Tricky ones</th></tr>${rows}</table></div></div>
  <details class="card" id="applog"><summary><b>App log</b></summary><div class="small" style="margin-top:6px">Version __VER__ · save size ${(JSON.stringify(S).length/1024).toFixed(1)} KB<br>
   Storage: ${SAVE_FAILED?'<b style="color:#c0392b">could not save (device storage may be full)</b>':'saving OK'}${SAVE_CORRUPT?'<br><b style="color:#c0392b">The old save could not be read. A fresh start was made and the old data was kept on the device.</b>':''}<br>
   Last errors: ${(S.err||[]).length?(S.err||[]).slice().reverse().map(e=>'<br>'+esc(new Date(e.t).toLocaleString())+' '+esc(e.ver)+' '+esc(e.msg)).join(''):'none'}</div></details>
  <div class="card"><label class="tg"><input type="checkbox" id="voice" ${S.voice?'checked':''}> Read questions out loud</label>
   <label class="tg"><input type="checkbox" id="snd" ${S.sound?'checked':''}> Sound effects</label>
   <label class="tg"><input type="checkbox" id="mus" ${S.music?'checked':''}> Music on the home screen</label>
   <button class="btn sm" id="test">🔊 Test voice</button> <button class="btn sm danger" id="reset">Erase everything</button></div>
  <div class="card small"><b>How it works:</b> three games (Math, Reading, Spanish), each with its own map. Getting 7 of 10 right opens the next stop (8 = ★★, 10 = ★★★), and each world stretches further: clocks, coins, borrowing, 3-digit numbers, magic-e and vowel-team words, and story comprehension. Missed questions come back at the end of a round, in later rounds, and in the 🎯 Tricky Mix. Each right answer earns a star (grows the pet) and a coin (spent in the shop). Everything is saved on this tablet only.</div></div>`);
  $('#back').onclick=()=>home(true);
  $('#nm').oninput=e=>{if(e.target.value.trim()){S.name=e.target.value.trim();save()}};
  $('#pn').oninput=e=>{S.petName=e.target.value.trim();save()};
  $('#bd').oninput=e=>{S.buddy=e.target.value.trim();save()};
  gradePickBind(g=>{setGrade(g)});
  $('#ula').onchange=e=>{S.unlockAll=e.target.checked;save()};
  $$('[data-per]').forEach(b=>b.onclick=()=>{ptCfg().per=+b.dataset.per;save();grown()});
  $$('[data-max]').forEach(b=>b.onclick=()=>{ptCfg().max=+b.dataset.max;save();grown()});
  $('#pt5').onclick=()=>{ptEarn(300);grown()};$('#pt0').onclick=()=>{pt().bank=0;save();grown()};
  $('#ptp').onchange=e=>{ptCfg().pause=e.target.checked;save()};
  $('#voice').onchange=e=>{S.voice=e.target.checked;save()};
  $('#snd').onchange=e=>{S.sound=e.target.checked;save()};
  $('#mus').onchange=e=>{S.music=e.target.checked;save()};
  $('#test').onclick=e=>say(`Hello ${S.name}! I can read to you.`,e.currentTarget);
  $$('[data-play]').forEach(b=>b.onclick=()=>{const c=CLIPS.find(x=>x.id==b.dataset.play);if(c)new Audio(c.url).play().catch(()=>{})});
  $$('[data-del]').forEach(b=>b.onclick=async()=>{await DB.del(b.dataset.del);await loadClips();grown()});
  $$('[data-rec]').forEach(b=>b.onclick=()=>{const[k,l]=b.dataset.rec.split('|');record(k,l=='x'?null:+l,b)});
  $('#reset').onclick=async e=>{if(!armed){armed=true;e.target.textContent='Tap again to erase ALL progress';return}try{localStorage.removeItem(KEY);const d=await DB.open();d.close();indexedDB.deleteDatabase('starschool')}catch(x){}location.reload()}}
async function record(kind,line,btn){if(inFrame)return micHelp('frame');if(!navigator.mediaDevices||!window.MediaRecorder)return micHelp('frame');
  try{const pm=await navigator.permissions.query({name:'microphone'});if(pm.state=='denied')return micHelp('denied')}catch(e){}
  let st;try{st=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){return micHelp(e&&e.name=='NotFoundError'?'none':'denied')}
  music(false);const mr=new MediaRecorder(st),ch=[];mr.ondataavailable=e=>{if(e.data.size)ch.push(e.data)};
  mr.onstop=async()=>{st.getTracks().forEach(t=>t.stop());const blob=new Blob(ch,{type:mr.mimeType||'audio/webm'});
    try{await DB.put({id:String(Date.now()),kind,line,blob});await loadClips();const c=CLIPS.find(x=>x.blob===blob)||CLIPS[CLIPS.length-1];if(c)new Audio(c.url).play().catch(()=>{})}catch(e){fb("Couldn't save the clip",'warn')}
    grown()};
  mr.start();let s=4;btn.textContent='🔴 Recording… '+s;btn.style.background='#fee2e2';
  const iv=setInterval(()=>{s--;if(s<=0){clearInterval(iv);if(mr.state=='recording')mr.stop()}else btn.textContent='🔴 Recording… '+s},1000);
  btn.onclick=()=>{clearInterval(iv);if(mr.state=='recording')mr.stop()}}

