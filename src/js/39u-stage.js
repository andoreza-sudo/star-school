/* ---------- LESSON-STAGE (owner, 2026-11-23): the boss round on a stage (part hints, which every Practice round loads) ----------
   renderQ (50-round.js) calls bossStage() on a boss question once this part is in, and the part calls it itself when it lands while
   a boss question is showing. At the top of the prompt card: a window onto the stop's world (the map's scene, SCN.band in
   43-scenes.js), the boss standing big on it and the pet facing it. The top bar's boss (#bossE) moves into the window, so the hit
   (a flinch with the zap burst), the knock-out and the giggle on a miss all play on the big one, and the pet (#runner) jumps on a
   hit and wobbles on a miss (check() already does both); the hearts and the life bar stay in the top bar. Decoration only
   (aria-hidden): the hearts' label says the same as before. Nothing new is said or written. */
function bossStage() {
  const qa = $('.qarea'), b = $('#bossE');
  if (typeof G == 'undefined' || !G || !G.boss || !qa || !b || qa.querySelector('.bstage')) return;
  const n = G.path && NODES[G.path] && NODES[G.path][G.node], w = n && PATHS[G.path].worlds[n.wi];
  const W = Math.max(240, Math.round(qa.clientWidth) || 320);
  const sc = w && typeof SCN != 'undefined' && SCN.theme(w) ? SCN.band(w, W, -20, 240, {stops: [], trail: [], pet: null}) : '';
  qa.insertAdjacentHTML('afterbegin', `<div class="bstage" aria-hidden="true">${sc}<div class="runner bs-pet" id="runner">${petHTML()}</div><div class="bs-boss"></div></div>`);
  qa.querySelector('.bs-boss').appendChild(b);
  if (typeof fit == 'function') fit();
}
if (typeof G != 'undefined' && G && G.boss) try { bossStage(); } catch (e) { /* no screen yet */ }
