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
/* ---------- A11: data banks live in a second file ----------
   tools/build.py writes src/data/*.js to data.<VER>.js. index.html loads it with its own <script> after this code and before
   src/boot.js, and the file's last line is `var DATA_VER='<VER>'`. src/boot.js starts the app only if dataReady(): the file
   ran to the end and comes from the same release as this page. If not (it could not be downloaded, or a cache kept one half
   of an update), the app does not start, because a round would break on a missing bank. It asks to go online and try again.
   Nothing in the save changes except one line in the App log (S.err). */
function dataReady() {
  return typeof DATA_VER !== 'undefined' && DATA_VER === '__VER__';
}
function dataMissing() {
  logErr('data file ' + (typeof DATA_VER === 'undefined' ? 'missing' : DATA_VER + ' does not match') + ' (app __VER__)');
  const again = UI.btn('Try again', { kind: 'primary', size: 'lg', icon: 'replay', id: 'dataretry' });
  view(`<div class="scroll" id="datamiss">${UI.empty('download', 'Star School needs to finish updating. Connect to the internet, then tap Try again.', again)}</div>`);
  $('#dataretry').onclick = () => location.reload();
}
