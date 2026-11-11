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
