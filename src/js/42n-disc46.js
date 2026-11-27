/* DISC-46: the drafted Discover worlds for grades 4 and 6 (part teaches: 52z-disc46.js, d-disc46.js) reach a child only with DISC46_ON
   (42m-disc46on.js, BUILT from docs/drafts/DISC46-READ.md); with 0 nothing here does anything and the Discover map is as before. With 1
   it works as DEEP-15 (42e-deep15.js): the Discover map loads the part (d46Warm), which adds the worlds (disc46Apply), then opens the map
   again; a stop tapped before that waits for the part (d46Open) and then opens by its stop id. Only these few lines are in the start-up files. */
let D46F = 0; // 1 once disc46Apply has run (or the part loaded without it): never asked again this session
const d46Want = p => !!DISC46_ON && !D46F && p == 'disc';
function d46Warm(p) {
  if (!d46Want(p)) return;
  partsLoad(D15P).then(bad => { if (bad) return; disc46Apply(); D46F = 1; if (MAPP == p && $('#map')) pathMap(p); });
}
function d46Then(p, f) {
  partsThen(D15P, () => { disc46Apply(); D46F = 1; f(); }, {title: PATHS[p].n, icon: UI.SUBJ_ICON[p] || 'map', line: 'Getting the new stops ready...'});
}
function d46Open(p, i) {
  const id = nid(NODES[p][i]);
  d46Then(p, () => { const j = NODES[p].findIndex(n => nid(n) == id); if (j < 0) pathMap(p); else open(p, j); });
}
