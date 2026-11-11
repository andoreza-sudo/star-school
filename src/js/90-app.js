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
   to gen.<VER>.js, gen2.<VER>.js, bt.<VER>.js and games.<VER>.js,
   and src/data/*.js to data.<VER>.js. index.html loads them with their own script tags after this code and before src/boot.js:
   gen, gen2, bt, games, then data. Each file's last line is `var <NAME>_VER='<VER>'`. src/boot.js starts the app only if dataReady():
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
    ['data', typeof DATA_VER === 'undefined' ? null : DATA_VER],
  ];
}
function dataReady() {
  return appFiles().every(f => f[1] === '__VER__');
}
function dataMissing() {
  logErr(appFiles().filter(f => f[1] !== '__VER__').map(([n, v]) => n + ' file ' + (v === null ? 'missing' : v + ' does not match')).join(', ') + ' (app __VER__)');
  const again = UI.btn('Try again', { kind: 'primary', size: 'lg', icon: 'replay', id: 'dataretry' });
  view(`<div class="scroll" id="datamiss">${UI.empty('download', 'Star School needs to finish updating. Connect to the internet, then tap Try again.', again)}</div>`);
  $('#dataretry').onclick = () => location.reload();
}
