/* ---------- app mode: full screen, install button ---------- */
const isApp=()=>matchMedia('(display-mode: fullscreen),(display-mode: standalone)').matches||navigator.standalone===true;
let installEvt=null;
addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvt=e;if($('.hero')&&$('#map'))home(true)});
addEventListener('appinstalled',()=>{installEvt=null});
document.addEventListener('pointerup',()=>{const d=document.documentElement;
  if(!document.fullscreenElement&&d.requestFullscreen&&!matchMedia('(display-mode: fullscreen)').matches)d.requestFullscreen({navigationUI:'hide'}).catch(()=>{})},true);
document.addEventListener('contextmenu',e=>e.preventDefault());
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(r=>{document.addEventListener('visibilitychange',()=>{if(!document.hidden)r.update().catch(()=>{})})}).catch(()=>{});
/* RC-1: a new release's service worker took over (controllerchange). The page reloads into it only on a hub screen (Home, a map,
   Grown-ups, Learn, the Brain Teasers hub, the Game Room; no sheet open), never in a round, lesson, puzzle or game: until then SWU.due
   is set, and view() (40-view.js) tries again after every new screen, UI.sheet (14-ui.js) when a sheet closes. */
const SWU={due:0,
  hub:()=>![...document.querySelectorAll('.sheet-bg,.ovl')].some(b=>!b._closing)&&!!document.querySelector('#hs,#map,.gw,.lh,.bt-hub,.gh-room'),
  go(){if(!SWU.due)SWU.due=1;SWU.try()},
  try(){if(SWU.due!==1||!SWU.hub())return;SWU.due=2;save();location.reload()}};
if('serviceWorker' in navigator&&navigator.serviceWorker.controller)navigator.serviceWorker.addEventListener('controllerchange',SWU.go);
// RC-1: ask the browser to keep this site's storage (the saves) when the tablet runs low on space; a refusal changes nothing
try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(()=>{})}catch(e){}
try{speechSynthesis.getVoices();speechSynthesis.onvoiceschanged=()=>{}}catch(e){}
/* ---------- A11, A11b, A11c: data banks and on-demand code live in more files ----------
   tools/build.py writes the question generators (gen, gen2; gen also carries the Grown-ups screens, ROOM), the Brain Teaser puzzle types and the Game Room (PARTS in build.py)
   to gen.<VER>.js, gen2.<VER>.js, bt.<VER>.js, games.<VER>.js, rally.<VER>.js (G-RALLY2: Star Rally), games2.<VER>.js (G-04a: the newer games)
   and games3.<VER>.js (G-BB2: Block Builder), and src/data/*.js to data.<VER>.js. index.html loads them with their own script tags after this code and before src/boot.js:
   gen, gen2, then data (bt on demand, P6-03; games, rally, games2, games3 on demand, P6-02). Each file's last line is `var <NAME>_VER='<VER>'`. src/boot.js starts the app only if dataReady():
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
    ['rally', typeof RALLY_VER === 'undefined' ? null : RALLY_VER],
    ['games2', typeof GAMES2_VER === 'undefined' ? null : GAMES2_VER],
    ['games3', typeof GAMES3_VER === 'undefined' ? null : GAMES3_VER],
    ['teach', typeof TEACH_VER === 'undefined' ? null : TEACH_VER],
    ['teach12', typeof TEACH12_VER === 'undefined' ? null : TEACH12_VER],
    ['teach35', typeof TEACH35_VER === 'undefined' ? null : TEACH35_VER],
    ['teachrd', typeof TEACHRD_VER === 'undefined' ? null : TEACHRD_VER],
    ['teaches', typeof TEACHES_VER === 'undefined' ? null : TEACHES_VER],
    ['teach6', typeof TEACH6_VER === 'undefined' ? null : TEACH6_VER],
    ['petage', typeof PETAGE_VER === 'undefined' ? null : PETAGE_VER],
    ['hints', typeof HINTS_VER === 'undefined' ? null : HINTS_VER],
    ['gate', typeof GATE_VER === 'undefined' ? null : GATE_VER],
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
   cheap tablet does not read and parse them at every start: the Game Room (games, rally, games2, games3: GAME_PARTS) loads the first time it opens,
   and (P6-03) the Brain Teaser puzzle code (bt) the first time a puzzle opens (BT.start; the hub and level strip start it early, BT.warm).
   sw.js still precaches every part, so this works offline. Each one is the same file with the same stamp as before: partLoad(stem)
   adds one plain script element, src <stem>.<VER>.js (a classic script, so it shares the one global scope like the others) and resolves
   true once its stamp equals the page's VER. A file that cannot be loaded resolves false and may be tried again later; a file of
   another release has already run, so it stays refused (Try again reloads the page).
   partsThen(stems, go) is the way in: go() runs at once when those parts are in. Otherwise it draws "Getting the games ready..."
   (with Back), loads the parts one after the other (rally and games2 call GH.reg from games while they load), then runs go() only if that
   screen is still showing, so a child who tapped Back meanwhile is never pulled into the games. A part that does not load shows
   the Try again screen. Keep it generic: a new game in games2 needs nothing here. */
const LAZY_PARTS = ['bt', 'games', 'rally', 'games2', 'games3', 'teach', 'teach12', 'teach35', 'teachrd', 'teaches', 'teach6', 'petage', 'hints', 'gate']; // RC-1: gate, the Grown-ups PIN and the picture passwords; // TEACH-6M: teach6, the grade 6 math lessons; v182: hints, the Practice mistake hints (hintsWarm, 50-round.js); TEACH-1: teach, the lessons (loaded by the math map: teachWarm, 46-home.js); TEACH-2b: teach12, the grade 1-2 lessons, with it; TEACH-3: teach35, the grade 3-5 lessons, with both for 3rd grade up; PET-AGE2: petage (petAgeWarm, 17-pets-svg.js); TEACH-4: teachrd, the reading and Pre-K lessons (the reading map, and the math map of a Pre-K child)
const GAME_PARTS = ['games', 'rally', 'games2', 'games3']; // the Game Room's parts (gameRoom in 58-playtime.js); bt is BT.start's (P6-03)
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
