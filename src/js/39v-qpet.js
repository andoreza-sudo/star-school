/* ---------- RELB-PET (review fix 7): the child's pet in the Practice card (part hints, which every Practice round loads) ----------
   A Practice question's card (.qarea) had half of it empty, while a lesson shows the pet on its world. fit() (50-round.js) calls
   qpFit() after every fit: it puts the pet (petRigHTML, as the lessons draw it, no new words) on a small mound in the colours of the
   round's world (SCN.theme(w).g, the map's ground) in a bottom corner of the card: the left one, else the right one, else none, so it
   never covers the question, its picture, Hear it, Help or the hint (checked against what the card holds), and none when the card
   scrolls. Not in a boss round (its stage has the pet: 39u-stage.js), a lesson (.ls-play), a Brain Teaser, or for an older child who
   turned the pet off (petShown). petAn (50-round.js) calls qpRe: the pet's jump on a right answer, its wobble and "oops" face on a
   miss (anim, 12-speech.js). No idle loop (nothing moves between answers); calm mode and reduced motion stop the jump and the wobble
   as everywhere (20-base.css), the face still changes. Decoration only: aria-hidden, no taps. */
function qpOk(qa) {
  return typeof G != 'undefined' && G && !G.boss && !G.dead && typeof S != 'undefined' && S.pet && $('#qtrack') &&
    !qa.closest('.ls-play,.s-bt') && (typeof petShown != 'function' || petShown());
}
// the round's pet is drawn once and the same element moves to each new question's card (no SVG parsed again per question)
let QP = null;
function qpNew(qa) {
  if (QP && QP.g === G && !QP.el.isConnected && !(petAge() && typeof PET_AGED != 'undefined' && !QP.aged)) {
    const e = QP.el; e.className = 'qpet'; e.querySelector('.qp-pet').className = 'qp-pet rig'; qa.prepend(e); return e;
  }
  const e = qpMake(qa);
  QP = {g: G, el: e, aged: typeof PET_AGED != 'undefined'};
  return e;
}
function qpMake(qa) {
  const n = G.path && NODES[G.path] && NODES[G.path][G.node], w = n && PATHS[G.path].worlds[n.wi];
  const T = w && typeof SCN != 'undefined' && SCN.theme(w), g = T && T.g ? T.g : null;
  const gr = g ? ` style="--qp-g:var(--sc-${g[0]});--qp-g2:var(--sc-${g[1]})"` : '';
  qa.insertAdjacentHTML('afterbegin', `<div class="qpet" aria-hidden="true"><i class="qp-gr"${gr}></i>` +
    `<span class="qp-pet rig">${petRigHTML(Math.max(S.stars, GROW[1]), 'idle')}</span></div>`);
  if (petAge() && typeof PET_AGED == 'undefined' && typeof partLoad == 'function') {
    partLoad('petage').then(ok => { const p = ok && qa.isConnected && qa.querySelector('.qp-pet'); if (p) p.innerHTML = petRigHTML(Math.max(S.stars, GROW[1]), 'idle'); });
  }
  return qa.querySelector(':scope>.qpet');
}
// what the card shows: each child's box (the prompt's by its contents: it spans the card), empty ones left out
function qpBoxes(qa, e) {
  const out = [];
  for (const c of qa.children) {
    if (c === e) continue;
    let r = c.getBoundingClientRect();
    if (c.id == 'prompt') { const g = document.createRange(); g.selectNodeContents(c); r = g.getBoundingClientRect(); }
    if (r.width * r.height > 0) out.push(r);
  }
  return out;
}
function qpFit() {
  const qa = $('.qs .qarea');
  if (!qa) return;
  let e = qa.querySelector(':scope>.qpet');
  if (!qpOk(qa)) { if (e) e.remove(); return; }
  if (!e) e = qpNew(qa);
  e.classList.remove('qp-r', 'qp-off');
  if (qa.scrollHeight > qa.clientHeight + 1) return e.classList.add('qp-off');
  const bs = qpBoxes(qa, e), m = 12;
  const free = () => { const p = e.getBoundingClientRect(); return !bs.some(r => r.left < p.right + m && r.right > p.left - m && r.top < p.bottom + m && r.bottom > p.top - m); };
  if (free()) return;
  e.classList.add('qp-r');
  if (!free()) e.classList.add('qp-off');
}
function qpRe(c) { const a = $('.qpet:not(.qp-off) .qp-pet'); if (a) anim(a, c); }
if (typeof G != 'undefined' && G) try { qpFit(); } catch (e) { /* no screen yet */ }
