/* ---------- "Find my level" (P1-07): what start-up needs (part gen) ----------
   RELA-SIZE: the Home card, the Grown-ups row and the placed start world (startWorld, 42-paths.js) are read at start, so they stay
   here; the quiz itself (PLACE, placeApply and the screens, 45-placement.js) is the lazy part sprint: a tap loads it first
   (partThen, 90-app.js). The rules are in 45-placement.js. */
/* ---------- saved result ---------- */
// Paths that offer placement: graded ones (byLevel paths open by order).
const placePaths=()=>Object.keys(PATHS).filter(p=>!PATHS[p].byLevel&&!PATHS[p].noPlace); // Discover (noPlace) has no placement quiz
const placeOK=()=>gradeOf()>=0; // not for Pre-K
// The placed start world of path p (index), or -1. Only while the grade is the one it was taken at.
function placeWorld(p){
  const r=S.place&&S.place[p];
  if(!r||r.g!==gradeOf())return -1;
  return PATHS[p].worlds.findIndex(w=>w.id===r.world);
}

/* ---------- screens ---------- */
let PL=null;          // the quiz on screen (this session only; never saved)
let PLACE_HIDE=false; // "Not now" on the home card hides it until the app is opened again
// Home card: offered to a new child (no stop passed on a graded path, never placed), K and up.
function placeAsk(){
  if(PLACE_HIDE||!placeOK()||PLAY.locked()||(S.place&&Object.keys(S.place).length))return false; // sample fix: none in the Play app's free sample (its result would be a locked world)
  return placePaths().every(p=>!NODES[p].some((n,i)=>passed(p,i)));
}
const placeSubBtn=p=>`<button class="btn pl-sub s-${p}" data-place="${p}"><span class="pl-pe">${ico(UI.SUBJ_ICON[p]||'map',26)}</span>${esc(placeName(p))}</button>`; // P4-18: drawn subject icon
const placeName=p=>PATHS[p].n.replace(/ Adventure$/,'');
function placeBanner(){
  if(!placeAsk())return'';
  return`<div class="pl-card" id="plcard"><div class="pl-ct">${ico('target',28)}<span>Not sure where to start? <b>Find my level!</b></span></div>
   <div class="pl-row">${placePaths().map(placeSubBtn).join('')}<button class="btn pl-no" id="plno">Not now</button></div></div>`;
}
function placeBannerBind(){
  if(!$('#plcard'))return;
  $$('#plcard [data-place]').forEach(b=>b.onclick=()=>{SFX.whoosh();partThen('sprint',()=>placeIntro(b.dataset.place,'home'))});
  $('#plno').onclick=()=>{PLACE_HIDE=true;SFX.click();const c=$('#plcard');if(c)c.remove()};
}
// Grown-ups row: start a quiz for either path and see the last result.
function placeGrownHTML(){if(PLAY.locked())return''; // sample fix: not in the Play app's free sample (as placeAsk)
  const last=placePaths().map(p=>{
    const r=S.place&&S.place[p],w=r&&PATHS[p].worlds.find(x=>x.id===r.world);
    return r&&w?`${esc(placeName(p))}: ${esc(w.n)} (${esc(gradeLabel(r.g))}, ${r.right|0} of ${r.asked|0} right, ${esc(r.date||'')})`:'';
  }).filter(Boolean).join('<br>');
  return`<div class="pl-grown"><b>Find my level</b> <span class="small">A short quiz (4 to 20 questions, no stars) that picks where each map
   starts. It can open worlds; it never removes stars or locks anything. Not for Pre-K.</span>
   <div class="pl-row">${placePaths().map(placeSubBtn).join('')}</div>${last?`<div class="small">Last result:<br>${last}</div>`:''}</div>`;
}
function placeGrownBind(){
  $$('.pl-grown [data-place]').forEach(b=>b.onclick=()=>{
    if(!placeOK())return fb('Find my level starts at K','warn');
    SFX.whoosh();partThen('sprint',()=>placeIntro(b.dataset.place,'grown'));
  });
}
