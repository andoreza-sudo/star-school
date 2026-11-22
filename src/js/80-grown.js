/* ---------- grown-ups ----------
   P4-12 (DESIGN_SYSTEM 9 row 6): a calm adult layout in the same system. Each section is a card with an icon header (GW.card);
   switches, segmented controls, fields and a readable table from the P4-04 components; two columns on a wide screen. Styles in
   src/css/48-setup-grown-care.css. Every id the code and the tests use is kept: #back, #nm, #pn, #bd, .gr[data-g], .pl-grown,
   #ula, #lson (TEACH-2), #rp-open, [data-rec], [data-play], [data-del], [data-per], [data-max], #pt5, #pt0, #ptp, #rlgates (G-FEEL2), #applog, #voice, #snd, #mus, #calm, [data-cheer] (EN-PRAISE), #esspk (S-SPK), #fps, #hc3d (GL-01),
   #gw-lis, #lis-dl, #gw-corner, [data-keep], [data-lcp], [data-lcs], #lc-del (S-SPK2, 50-say-corner.js),
   #test, #reset. The report card's Print button (82-report.js) and the backup Save buttons (81-backup.js, P5-07) carry the online note.
   P5-10: the Children card (PRF.card in 01-profiles.js) comes right after the summary; with more than one child, Start over
   erases only the child who is playing (their place stays, with a fresh save) and recorded clips get the child's id prefix.
   ROOM: this file, 81-backup.js, 82-report.js and 88-online.js build into gen.<VER>.js (PARTS in tools/build.py), loaded at start
   after index.html's own code, so index.html has room under its 1 MB limit. Nothing in index.html's code may use them while loading. */
const GW = {
  // a section: icon disc + title, an optional line under it, then the body. tone: a subject or token class for the disc colour.
  card(id, icon, title, body, o = {}) {
    return `<section class="gw-card${o.cls ? ' ' + o.cls : ''}"${id ? ` id="${id}"` : ''}><h2 class="gw-h"><span class="gw-hi${o.tone ? ' ' + o.tone : ''}">` +
      `${ico(icon, 24)}</span><span>${title}</span></h2>${o.sub ? `<p class="gw-sub">${o.sub}</p>` : ''}${body}</section>`;
  },
  // a labelled text field (label above, white well with an icon)
  field(label, icon, attrs, help) {
    return `<div class="gw-f"><span class="gw-fl">${label}</span>${fldHTML(icon, `${attrs} aria-label="${label}"`)}${help ? `<span class="gw-help">${help}</span>` : ''}</div>`;
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
/* P6-05: About Whistlestop (Grown-ups): what the app is, privacy, the release and build, and the licences of what it bundles.
   Only Andika is third-party (embedded by tools/build.py; the text is OFL_TEXT in src/data/d-licences.js = LICENSES/OFL-Andika.txt).
   The art, icons, sounds and games are made for Whistlestop; speech is the tablet's own voice and recordings made with xAI
   text-to-speech (audio/, ES-AUDIO, EN-PRAISE, TEACH-4; the About card says so); no libraries are bundled. */
function aboutCard(){
  return GW.card('gw-about','info','About Whistlestop',
    `<div class="wl-top ab-logo">${UI.logo()}</div><p class="gw-p">Whistlestop is offline practice in math, reading and Spanish for children, with game time earned by learning. It has no accounts, no ads and no tracking.</p>
    <p class="gw-note">${ico('lock',22)}<span>It works without internet once it has loaded. Progress and recordings stay on this device; nothing about your child is sent anywhere. In the Google Play app, the purchase is confirmed with Google Play.</span></p>
    <p class="gw-note" id="ab-gate">${ico('gear',22)}<span>To open Grown-ups, tap Grown-ups on Home and type your PIN. Forgot it? Tap Forgot PIN? on the number pad.</span></p>
    <p class="gw-note" id="ab-spk">${ico('mic',22)}<span>Spanish “Say it!” recordings stay on this tablet and are deleted automatically (after 1 day, or as you choose in the Listening corner). Nothing is sent. Speech recognition is used only when the tablet can do it on the device itself.</span></p>
    <p class="gw-bkrow"><a class="btn soft sm" id="ab-priv" href="privacy.html" target="_blank" rel="noopener">${ico('doc')}<span>Privacy policy</span></a></p>
    <div class="gw-log ab-ver"><div><b>Version</b> <span id="ab-rel">${RELEASE}</span></div><div><b>Build</b> <span id="ab-build">${BUILD}</span></div><div><b>Edition</b> <span id="ab-ed">${PLAY.edition()}</span></div></div>
    <h3 class="gw-h3">${ico('doc',22,'ic-brand')}<span>Licences</span></h3>
    <p class="gw-p ab-lic-line"><b>Andika</b> (the lettering in the app), Copyright (c) 2004-2022 SIL International. Licensed under the SIL Open Font License 1.1 (openfontlicense.org).</p>
    <p class="gw-sub ab-lic-line">Everything else (pictures, icons, sounds, games and questions) was made for Whistlestop. No other fonts, libraries or outside files are used.</p>
    <p class="gw-sub ab-lic-line" id="ab-tts">The recorded voices were made with AI text-to-speech (xAI).</p>
    <details class="ab-det" id="ab-ofl"><summary>${ico('doc',22)}<span>Read the Andika licence</span>${ico('chevron-right',22,'chev')}</summary><pre class="ab-ofl" tabindex="0" role="region" aria-label="SIL Open Font License 1.1 text">${esc(OFL_TEXT)}</pre></details>`);
}
// G-FEEL1: 4x4 Hill Climb driving help (S.garage.as: 'auto' or 0-3; src/js/62-hill.js, which loads with the Game Room). Read here
// without the game's code and without changing the save: an old Easy driving switch on is Most help, off is No help, never set is Auto.
const HCAS_NAMES={auto:'Auto',3:'Most help',2:'Some help',1:'Little help',0:'No help'};
function hcAsGrown(){const g=S.garage&&typeof S.garage=='object'&&!Array.isArray(S.garage)?S.garage:{};
  return g.as==='auto'||[0,1,2,3].includes(g.as)?g.as:g.easy===true?3:g.easy===false?0:'auto'}
// G-FEEL2: Star Rally boost gates (S.rally.gates: 'on' or 'off' once a grown-up or the child chooses; absent: on from 1st grade).
// An old S.rally.quiz true (turned on before v169) stays on; an old false was only the default then, so it is not a choice. Read
// here and by 63-game-race.js without changing the save.
function rlGatesOn(){const r=S.rally&&typeof S.rally=='object'&&!Array.isArray(S.rally)?S.rally:{};
  return r.gates==='on'?true:r.gates==='off'?false:r.quiz===true||+S.grade>=1}
const CHEER_NAMES={mix:'Mixed',f:'Female',m:'Male',tts:'Tablet voice'}; // EN-PRAISE: the Cheer voices choice (S.cheerV, cheerMode() in 12-speech.js)
// PERS-01: the Story themes card (persCard, 39p-pers.js in the lazy part hints) replaces the hidden #gw-pers placeholder once that part is
// in (loading it if a round has not); it stays hidden when no interest is reviewed (PERSW empty).
function persGrown(){const go=()=>{if(typeof persCard=='function')persCard($('#gw-pers'))};
  if(typeof persCard=='function')go();else if(typeof partLoad=='function')partLoad('hints').then(go,()=>{})}
// RENAME (v191): the old web address shows how to take progress to the new one, app.whistlestoplearning.com (owner decision 2026-11-20).
// Storage is per address, so a backup carries it; Load a backup needs setup and a PIN first on a fresh install.
const MOVED_LINE='We moved to app.whistlestoplearning.com, and the app is now called Whistlestop. To keep progress: 1. Tap Save a backup (or Save all children) under Backup below. 2. Open app.whistlestoplearning.com in Chrome and finish setting up there first (any name and grade: the backup replaces it). 3. Open Grown-ups there, choose a PIN, tap Load a backup, pick the file and tap Yes, replace (each further child: Add as a new child). 4. When the progress is there, remove the old icon (the one that opens this address) from the home screen: press and hold it, then Uninstall or Remove.';
function gwMoved(h=location.hostname){return h==='andoreza-sudo.github.io'?`<p class="gw-note" id="gw-moved" role="status">${ico('info',22)}<span>${MOVED_LINE}</span></p>`:''}
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
  const nstk=STK.filter(s=>stkN(s)).length,pr=typeof PIN!='undefined'&&PIN.noteR;
  NAV.gwK=1;NAV.gwT=Date.now(); // RC-2: a grown-up screen: the session goes on
  view(`<div class="top tbar adult gw-top">${UI.ibtn('back','Back',{size:'sm',id:'back'})}<div class="ttl gx-ttl"><span class="gx-tb gw-tb">${ico('gear',24)}</span><span><span class="nw">Grown-ups</span></span></div></div>
  <div class="scroll gw">${gwMoved()}${pr?`<p class="gw-note" id="pnreset">${ico('lock',22)}<span>Your PIN was reset with Forgot PIN on ${esc(new Date(pr).toLocaleDateString())}.</span></p>`:''}<div class="gw-cols">
  ${GW.card('gw-sum','user',esc(S.name||'Your child')+' at a glance',
    `<div class="gw-stats">${GW.stat('star','ic-star',S.stars,'stars')}${GW.stat('coin','ic-coin',S.coins,'coins')}${GW.stat('sticker-book','ic-brand',nstk+'/'+STK.length,'stickers')}${GW.stat('flame','ic-flame',S.best||0,'best streak')}</div>
    <h3 class="gw-h3">${ico('map',22,'ic-brand')}<span>Stops passed</span></h3><div class="gw-paths">${paths}</div>
    ${SAVE_FAILED?warn('Could not save progress: the device storage may be full.'):''}`,{sub:esc(gradeSpoken(gradeOf()))+'. Everything is saved on this tablet only.'})}
  ${PRF.card()}
  ${PLAY.on?PLAY.card():''}
  ${reportGrownHTML()}
  ${GW.card('gw-kid','edit','Names',GW.field('Child','user',`id="nm" value="${esc(S.name)}"`)+GW.field('Pet name','paw',`id="pn" value="${esc(S.petName)}" placeholder="${PETS[S.pet].def}"`)+
    GW.field('Buddy','users',`id="bd" value="${esc(S.buddy)}" placeholder="A sibling or friend"`,'Used in story problems.'))}
  <div id="gw-pers" hidden></div>
  ${GW.card('gw-grade','map','Grade and level',gradePickHTML(gradeOf())+placeGrownHTML()+`<div class="gw-sw">${UI.sw('Unlock every stop on the map (let them jump ahead)',S.unlockAll,'ula')}${UI.sw('Lessons with '+petN()+' (lesson stops on the math and reading maps; off: practice rounds only)',!TEACH.off,'lson')}</div>`,
    {sub:'Picks where the maps start. Progress is never removed when you change it, but a new grade can put stops behind a lesson.'})}
  ${GW.card('gw-time','gamepad','Game time',`<div class="gw-stats two">${GW.stat('ticket','ic-play',fmtT(bank.bank),'in the bank')}${GW.stat('timer','ic-brand',fmtT(bank.used),'used today')}</div>
    <div class="gw-row"><span class="gw-rl">Minutes per round</span>${GW.seg('per',[2,3,5],pc.per,'Minutes per round',v=>v)}</div>
    <div class="gw-row"><span class="gw-rl">Daily max</span>${GW.seg('max',[15,30,45,60,0],pc.max,'Daily max in minutes',v=>v||'No limit')}</div>
    <div class="gw-row"><span class="gw-rl">Learn first, minutes</span>${GW.seg('need',[0,5,10,15,20,30],pc.need,'Minutes of learning needed each day before the Game Room opens',v=>v||'None')}</div>
    ${pc.need?`<p class="gw-note" id="ptneed">${ico('clock',22)}<span>${!gt.more?`Learning today: ${pc.need} of ${pc.need} minute${pc.need==1?'':'s'}. The Game Room is open.`:`Learning today: ${Math.floor(gt.done/60)} of ${pc.need} minute${pc.need==1?'':'s'}. The Game Room opens at ${pc.need}.`}</span></p>
    <div class="gw-sw">${UI.sw('Open the Game Room today anyway',bank.open===today(),'pto')}</div>`:''}
    <p class="gw-sub" id="lspayh">Lessons with ${esc(petN())} pay game time when Show is passed with no help (guessing pays nothing). Minutes:</p>
    ${[['ls1','First pass'],['ls2','Second pass'],['ls3','Later passes (once a day)'],['lsT','Good try, not passed (once a day)']].map(([k,l])=>`<div class="gw-row"><span class="gw-rl">${l}</span>${GW.seg(k,LS_PAY_OPT,lsPayCfg()[k],'Lesson game time, '+l+', minutes',v=>v||'None')}</div>`).join('')}
    <div class="gw-row" id="gw-give"><span class="gw-rl">Give game time</span><span class="gw-btns">${[5,10,15].map(m=>UI.btn('+'+m+' min',{size:'sm',icon:'plus',id:m==5?'pt5':'pt'+m,attrs:`data-give="${m}" aria-label="Give ${m} minutes of game time"`})).join('')}</span></div>
    <div class="gw-row"><span class="gw-rl">Take away</span><span class="gw-btns">${UI.btn('−5 min',{size:'sm',kind:'ghost',icon:'minus',id:'ptm5',attrs:'data-give="-5" aria-label="Take away 5 minutes of game time"'})}${UI.btn('Empty bank',{size:'sm',kind:'ghost',icon:'trash',id:'pt0',cls:'gw-risk'})}</span></div>
    <p class="gw-sub" id="ptgifth">Given time goes straight into the bank. It does not count as learning, and the daily max still applies.${gt.locked?' Learn first is on: given minutes unlock after today\'s learning.':''}</p>
    <div class="gw-sw">${UI.sw('Pause game time (games locked)',pc.pause,'ptp')}</div>
    <div class="gw-row" id="gw-hcas"><span class="gw-rl">4x4 Hill Climb driving help</span>${GW.seg('hcas',['auto',3,2,1,0],hcAsGrown(),'4x4 Hill Climb driving help',v=>HCAS_NAMES[v])}</div>
    <p class="gw-sub">Auto starts from the grade, gives a little less help as your child wins stars, and more after a few crashes in a row.</p>
    <div class="gw-sw">${UI.sw('Star Rally boost gates: a quick number fact to zoom',rlGatesOn(),'rlgates')}</div>
    <p class="gw-sub">On from 1st grade. The gates ask your child's own number facts from the Daily Review first. A wrong gate costs nothing.</p>`,{tone:'s-play',sub:'Each learning round earns game time, plus a bonus for 10 out of 10, bosses, tests, puzzles and the Daily Review.'})}
  ${GW.card('gw-snd','sound-on','Sound and voice',`<div class="gw-sw">${UI.sw('Read questions out loud',S.voice,'voice')}${UI.sw('Sound effects',S.sound,'snd')}${UI.sw('Music on the home screen',S.music,'mus')}${UI.sw('Calm mode: less movement, no confetti',!!S.calm,'calm')}${UI.sw('Buzz: a short vibration in games (tablets that can)',S.buzz!==false,'buzz')}${UI.sw('Spanish speaking practice',spkOn(),'esspk')}</div>
    <p class="gw-sub">Speaking practice: in Spanish rounds your child says a word or line, then hears the Spanish voice and their own recording, and the tablet says kindly how close it sounded. Recordings stay on this tablet (see the Listening corner).</p>
    ${UI.btn('Test voice',{size:'sm',icon:'speak',id:'test'})}
    <div class="gw-row" id="gw-cheer"><span class="gw-rl">Cheer voices</span>${GW.seg('cheer',['mix','f','m','tts'],cheerMode(),'Cheer voices: who says Great job',v=>CHEER_NAMES[v])}</div>`)}
  ${GW.card('gw-speed','bolt','Tablet speed',`<div class="gw-sw">${UI.sw('Show the speed box: frames per second in a corner',!!S.fps,'fps')}${UI.sw('4x4 Hill Climb in 3D (off: the flat 2D look)',S.hcGl!==false,'hc3d')}</div>
    <p class="gw-sub">The speed box shows how many pictures a second the tablet draws and its slowest one in the last 5 seconds. Hill Climb turns to the 2D look by itself on a tablet that is too slow for 3D.</p>`)}
  ${spkLisCard()}
  ${spkCornerCard()}
  ${GW.card('gw-rec','mic','Your voice',(inFrame?warn('Recording only works on the tablet app, not in this preview.'):!canRec?warn("Recording isn't available in this browser. Use Chrome or the installed app."):'')+clips,
    {sub:`Tap Record and say the line (up to 4 seconds). Record as many as you like; the app shuffles them so the same one doesn't play twice in a row.`})}
  ${GW.card('gw-skills','chart','Skills',`<div class="tblw gw-tbl"><table class="tbl"><thead><tr><th>Skill</th><th class="n">Rounds</th><th class="n">1st try</th><th>Tricky ones</th></tr></thead><tbody>${rows}</tbody></table></div>`,
    {sub:'Rounds played and first-try accuracy for every skill on the maps, with the questions missed most.'})}
  ${GW.card('gw-how','info','How it works',`<p class="gw-p">Each subject has its own map. Getting 7 of 10 right opens the next stop (8 earns 2 stars, 10 earns 3), and each world stretches further. Missed questions come back at the end of a round, in later rounds, in Daily Review and in the Tricky Mix. Each right answer earns a star (the pet grows) and a coin (spent in the shop). Everything is saved on this tablet only.</p>`)}
  <details class="gw-card gw-det" id="applog"><summary class="gw-h"><span class="gw-hi">${ico('doc',24)}</span><span>App log</span>${ico('chevron-right',22,'chev')}</summary><div class="gw-log">
   <div><b>Version</b> ${RELEASE} (build ${BUILD})</div><div><b>Save size</b> ${(JSON.stringify(S).length/1024).toFixed(1)} KB</div>
   ${PRF.logLine()}<div><b>Storage</b> ${SAVE_FAILED?'<span class="gw-bad">could not save (device storage may be full)</span>':'saving OK'}</div>
   ${SAVE_CORRUPT?'<div class="gw-bad">The old save could not be read. A fresh start was made and the old data was kept on the device.</div>':''}
   <div><b>Last errors</b> ${(S.err||[]).length?'<ul class="gw-errs">'+(S.err||[]).slice().reverse().map(e=>'<li><span>'+esc(new Date(e.t).toLocaleString())+' '+esc(e.ver)+'</span> '+esc(e.msg)+'</li>').join('')+'</ul>':'none'}</div></div></details>
  ${BAK.card()}
  ${aboutCard()}
  ${GW.card('gw-pin','lock','Grown-ups PIN',`<p class="gw-p">The PIN keeps children out of the settings.</p>${UI.btn('Change PIN',{size:'sm',icon:'edit',id:'pn-change'})}`)}
  ${GW.card('gw-reset','warning','Start over',`<div class="gw-bkrow">${UI.btn('Save a backup first',{size:'sm',icon:'download',id:'bk-first'})}${onlineNote()}</div>${UI.btn('Erase everything',{size:'sm',kind:'risk',icon:'trash',id:'reset'})}`,{tone:'gw-dz',sub:(PRF.many()?'Erases '+esc(S.name||'this child')+"'s progress, pet, stars, coins and voice recordings. The other children are kept.":'Erases all progress, the pet, stars, coins and voice recordings on this tablet.')+' This cannot be undone, so save a backup first if you may want it back.'})}
  </div></div>`);
  $('#back').onclick=()=>home(true);
  $('#nm').oninput=e=>{if(e.target.value.trim()){S.name=e.target.value.trim();save()}};
  $('#pn').oninput=e=>{S.petName=e.target.value.trim();save()};
  $('#bd').oninput=e=>{S.buddy=e.target.value.trim();save()};
  gradePickBind(g=>{setGrade(g)});
  placeGrownBind();
  persGrown(); // PERS-01: the Story themes card, once the hints part is in
  reportGrownBind();
  BAK.bind();
  PRF.bind();
  if(PLAY.on)PLAY.cardBind(); // PLAY-01: Unlock Whistlestop: Unlock or restore asks the grown-up question first (89-play.js)
  $('#ula').onchange=e=>{S.unlockAll=e.target.checked;save()};
  $('#lson').onchange=e=>{TEACH.off=!e.target.checked;save()}; // TEACH-2: lessons on or off (50-round.js)
  $$('[data-per]').forEach(b=>b.onclick=()=>{ptCfg().per=+b.dataset.per;save();grown()});
  $$('[data-max]').forEach(b=>b.onclick=()=>{ptCfg().max=+b.dataset.max;save();grown()});
  // RC-1 (owner): give or take away game time, in place (the bank shows the change; the page does not jump to the top)
  $$('[data-give]').forEach(b=>b.onclick=()=>{const d=ptGift(+b.dataset.give*60),v=$('#gw-time .gw-st b');if(v)v.textContent=fmtT(pt().bank);
    fb(d>0?`Gave ${fmtM(d)} of game time`:d<0?`Took away ${fmtM(-d)}`:'The bank is already empty','info')});$('#pt0').onclick=()=>{ptGift(-pt().bank);grown()}; // RC-2: through ptGift, so the log and Home's line follow
  $('#ptp').onchange=e=>{ptCfg().pause=e.target.checked;save()};
  $$('[data-need]').forEach(b=>b.onclick=()=>{ptCfg().need=+b.dataset.need;save();grown()});
  for(const k in LS_PAY_D)$$(`[data-${k.toLowerCase()}]`).forEach(b=>b.onclick=()=>{ptCfg()[k]=+b.dataset[k.toLowerCase()];save();grown()}); // LS-STOP: what lessons pay
  $$('[data-hcas]').forEach(b=>b.onclick=()=>{const v=b.dataset.hcas;if(!S.garage||typeof S.garage!='object'||Array.isArray(S.garage))S.garage={};S.garage.as=v=='auto'?'auto':+v;save();grown()});
  $('#rlgates').onchange=e=>{if(!S.rally||typeof S.rally!='object'||Array.isArray(S.rally))S.rally={};S.rally.gates=e.target.checked?'on':'off';save()}; // G-FEEL2
  if($('#pto'))$('#pto').onchange=e=>{const p=pt();if(e.target.checked)p.open=today();else p.open='';save()};
  $('#voice').onchange=e=>{S.voice=e.target.checked;save()};
  $('#snd').onchange=e=>{S.sound=e.target.checked;save()};
  $('#mus').onchange=e=>{S.music=e.target.checked;save()};
  $('#buzz').onchange=e=>{S.buzz=e.target.checked;save()}; // R-03 A4 (10-sfx.js buzz)
  $('#calm').onchange=e=>{S.calm=e.target.checked;save();calmApply(true)}; // P4-17
  $('#esspk').onchange=e=>{S.esSpk=e.target.checked;save()}; // S-SPK: per child (absent = on)
  $('#fps').onchange=e=>{S.fps=e.target.checked;save();fpsSet(S.fps)};$('#hc3d').onchange=e=>{S.hcGl=e.target.checked;if(typeof HC_GLOFF!='undefined')HC_GLOFF=false;save()}; // GL-01 (on again: 3D again, even after it was too slow this visit)
  spkLisBind();spkCornerBind(); // S-SPK2
  // EN-PRAISE: who says "Great job!" (per child): the recorded voices, mixed, female or male, or the tablet's voice; a tap plays a sample
  $$('[data-cheer]').forEach(b=>b.onclick=()=>{S.cheerV=b.dataset.cheer;save();$$('[data-cheer]').forEach(x=>{const on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on)});say(pick(CHEERS))});
  $('#test').onclick=e=>say(`Hello ${S.name}! I can read to you.`,e.currentTarget);
  $$('[data-play]').forEach(b=>b.onclick=()=>{const c=CLIPS.find(x=>x.id==b.dataset.play);if(c)new Audio(c.url).play().catch(()=>{})});
  $$('[data-del]').forEach(b=>b.onclick=async()=>{await DB.del(b.dataset.del);await loadClips();grown()});
  $$('[data-rec]').forEach(b=>b.onclick=()=>{const[k,l]=b.dataset.rec.split('|');record(k,l=='x'?null:+l,b)});
  $('#pn-change').onclick=()=>partLoad('gate').then(ok=>{if(ok)PIN.change()}); // RC-1: the Grown-ups PIN (41b-pin.js, part gate)
  $('#reset').onclick=e=>{if(!armed){armed=true;e.currentTarget.querySelector('span').textContent=PRF.many()?'Tap again to erase '+(S.name||'this child'):'Tap again to erase ALL progress';return}
    NAV.quiz(eraseAll)}} // RC-1: the Grown-ups PIN again, right before erasing
// Erase everything (Start over), after the second tap and the grown-up question. RC-1: the erased save is kept for "Undo erase" (BAK.keepErased)
async function eraseAll(){
    if(PRF.many()){const bad=await PRF.wipe();if(bad)return fb(bad,'warn');PRF.setWho(PRF.cur);reloadSaved();return} // P5-10: only this child
    const raw=JSON.stringify(S);SAVE_HOLD=true;try{localStorage.removeItem(SKEY)}catch(x){}BAK.keepErased(SKEY,raw);
    // the voice clips (IndexedDB) go too; the reload never waits on IndexedDB for long (an open that never finished on a busy
    // tablet left the old progress on screen): it comes when the delete is done, blocked or failed, or after 1.5 s at most
    let gone=false;const go=()=>{if(!gone){gone=true;reloadSaved()}};
    try{if(SPKR.db){SPKR.db.close();SPKR.db=null}indexedDB.deleteDatabase('starschool-say')}catch(x){} // S-SPK2: the Say it! recordings
    try{if(DB.db){DB.db.close();DB.db=null}const r=indexedDB.deleteDatabase('starschool');r.onsuccess=r.onerror=r.onblocked=go}catch(x){go()}
    setTimeout(go,1500)}
async function record(kind,line,btn){if(inFrame)return micHelp('frame');if(!navigator.mediaDevices||!window.MediaRecorder)return micHelp('frame');
  try{const pm=await navigator.permissions.query({name:'microphone'});if(pm.state=='denied')return micHelp('denied')}catch(e){}
  let st;try{st=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){return micHelp(e&&e.name=='NotFoundError'?'none':'denied')}
  music(false);const mr=new MediaRecorder(st),ch=[];mr.ondataavailable=e=>{if(e.data.size)ch.push(e.data)};
  mr.onstop=async()=>{st.getTracks().forEach(t=>t.stop());const blob=new Blob(ch,{type:mr.mimeType||'audio/webm'});
    try{await DB.put({id:PRF.clipId(),kind,line,blob});await loadClips();const c=CLIPS.find(x=>x.blob===blob)||CLIPS[CLIPS.length-1];if(c)new Audio(c.url).play().catch(()=>{})}catch(e){fb("Couldn't save the clip",'warn')}
    grown()};
  mr.start();let s=4;btn.innerHTML=ico('record',22,'ic-rec')+'<span>Recording… '+s+'</span>';btn.classList.add('is-rec');
  const iv=setInterval(()=>{s--;if(s<=0){clearInterval(iv);if(mr.state=='recording')mr.stop()}else btn.innerHTML=ico('record',22,'ic-rec')+'<span>Recording… '+s+'</span>'},1000);
  btn.onclick=()=>{clearInterval(iv);if(mr.state=='recording')mr.stop()}}

