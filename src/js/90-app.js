/* ---------- app mode: full screen, install button ---------- */
const isApp=()=>matchMedia('(display-mode: fullscreen),(display-mode: standalone)').matches||navigator.standalone===true;
let installEvt=null;
addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvt=e;if($('.hero')&&$('#map'))home(true)});
addEventListener('appinstalled',()=>{installEvt=null});
document.addEventListener('pointerup',()=>{const d=document.documentElement;
  if(!document.fullscreenElement&&d.requestFullscreen&&!matchMedia('(display-mode: fullscreen)').matches)d.requestFullscreen({navigationUI:'hide'}).catch(()=>{})},true);
document.addEventListener('contextmenu',e=>e.preventDefault());
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(r=>{document.addEventListener('visibilitychange',()=>{if(!document.hidden)r.update().catch(()=>{})})}).catch(()=>{});
if('serviceWorker' in navigator&&navigator.serviceWorker.controller){let rl=0;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(rl)return;rl=1;if(!document.querySelector('#hcv,#bbc,#stsvg,#ncv'))location.reload()})}
try{speechSynthesis.getVoices();speechSynthesis.onvoiceschanged=()=>{}}catch(e){}
/* ---------- A11, A11b, A11c: data banks and on-demand code live in more files ----------
   tools/build.py writes the question generators (gen, gen2), the Brain Teaser puzzle types and the Game Room (PARTS in build.py)
   to gen.<VER>.js, gen2.<VER>.js, bt.<VER>.js, games.<VER>.js and games2.<VER>.js (G-04a: the newer games),
   and src/data/*.js to data.<VER>.js. index.html loads them with their own script tags after this code and before src/boot.js:
   gen, gen2, bt, games, games2, then data. Each file's last line is `var <NAME>_VER='<VER>'`. src/boot.js starts the app only if dataReady():
   every file ran to the end and comes from the same release as this page. If not (one could not be downloaded, or a cache kept
   one half of an update), the app does not start, because a round or a puzzle would break on missing code or a missing bank.
   It asks to go online and try again. Nothing in the save changes except one line in the App log (S.err).
   A new entry in PARTS needs its line in appFiles(), in the same order (the check `code split A11b` compares the two lists). */
function appFiles() {
  return [
    ['gen', typeof GEN_VER === 'undefined' ? null : GEN_VER],
    ['gen2', typeof GEN2_VER === 'undefined' ? null : GEN2_VER],
    ['bt', typeof BT_VER === 'undefined' ? null : BT_VER],
    ['games', typeof GAMES_VER === 'undefined' ? null : GAMES_VER],
    ['games2', typeof GAMES2_VER === 'undefined' ? null : GAMES2_VER],
    ['data', typeof DATA_VER === 'undefined' ? null : DATA_VER],
  ];
}
// P6-02: the start-up files only; the parts in LAZY_PARTS load later (partsThen below)
function dataReady() {
  return appFiles().every(f => LAZY_PARTS.includes(f[0]) || f[1] === '__VER__');
}
// the Try again screen and one line in the App log: for the start-up files, or (P6-02) for the parts in stems that did not load on demand
function dataMissing(stems) {
  logErr(appFiles().filter(f => (stems ? stems.includes(f[0]) : !LAZY_PARTS.includes(f[0])) && f[1] !== '__VER__')
    .map(([n, v]) => n + ' file ' + (v === null ? 'missing' : v + ' does not match')).join(', ') + ' (app __VER__)');
  const again = UI.btn('Try again', { kind: 'primary', size: 'lg', icon: 'replay', id: 'dataretry' });
  view(`<div class="scroll" id="datamiss">${UI.empty('download', 'Star School needs to finish updating. Connect to the internet, then tap Try again.', again)}</div>`);
  $('#dataretry').onclick = () => location.reload();
}
/* ---------- P6-02: part files loaded on demand ----------
   The parts in LAZY_PARTS (the same list as LAZY in tools/build.py, in PARTS order) have no <script> tag in index.html, so a
   cheap tablet does not read and parse them at every start: the Game Room (games, games2) loads the first time it opens.
   sw.js still precaches every part, so this works offline. Each one is the same file with the same stamp as before: partLoad(stem)
   adds one plain script element, src <stem>.<VER>.js (a classic script, so it shares the one global scope like the others) and resolves
   true once its stamp equals the page's VER. A file that cannot be loaded resolves false and may be tried again later; a file of
   another release has already run, so it stays refused (Try again reloads the page).
   partsThen(stems, go) is the way in: go() runs at once when those parts are in. Otherwise it draws "Getting the games ready..."
   (with Back), loads the parts one after the other (games2 calls GH.reg from games while it loads), then runs go() only if that
   screen is still showing, so a child who tapped Back meanwhile is never pulled into the games. A part that does not load shows
   the Try again screen. Keep it generic: a new game in games2 needs nothing here. */
const LAZY_PARTS = ['games', 'games2'];
const partsAsked = {};
function partReady(stem) {
  const f = appFiles().find(x => x[0] === stem);
  return !!f && f[1] === '__VER__';
}
function partLoad(stem) {
  const f = appFiles().find(x => x[0] === stem);
  if (!f || f[1] === '__VER__') return Promise.resolve(!!f);
  if (f[1] !== null) return Promise.resolve(false); // a file of another release ran: refused
  return partsAsked[stem] || (partsAsked[stem] = new Promise(res => {
    const s = document.createElement('script');
    s.src = stem + '.__VER__.js';
    s.onload = () => { delete partsAsked[stem]; res(partReady(stem)); };
    s.onerror = () => { delete partsAsked[stem]; s.remove(); res(false); };
    document.body.appendChild(s);
  }));
}
// load the parts in order; resolves with the first one that did not load, or null when all of them are in
async function partsLoad(stems = LAZY_PARTS) {
  for (const s of stems) if (!(await partLoad(s))) return s;
  return null;
}
function partsThen(stems, go, o = {}) {
  if (stems.every(partReady)) return go();
  const { title = 'Game Room', icon = 'gamepad', line = 'Getting the games ready...' } = o;
  view(`<div class="top tbar s-play">${UI.ibtn('back', 'Back', { size: 'sm', id: 'back' })}<div class="ttl">${ico(icon, 30)}<span>${esc(title)}</span></div></div>` +
    `<div class="scroll" id="partwait"><div class="blank pw" role="status"><span class="bi">${ico(icon)}</span><p>${UI.t(line)}</p></div></div>`);
  $('#back').onclick = () => home();
  const wait = $('#partwait');
  // start once the waiting screen is painted: reading a part is one long parse on a cheap tablet
  requestAnimationFrame(() => setTimeout(() => partsLoad(stems).then(bad => {
    if (!wait.isConnected) return; // the child went elsewhere; what loaded stays loaded for next time
    if (bad) dataMissing([bad]); else go();
  }), 0));
}
