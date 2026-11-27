/* DEEP-15 (BEST-APP roadmap 15): the drafted Discover and Spanish items (part teaches: 52y-deep15.js, d-deep15.js) reach a child only with
   DEEP15_ON (42d-deep15on.js, BUILT from docs/drafts/DEEP15-READ.md); with 0 nothing here does anything and both maps are as before.
   With 1, the Discover and Spanish maps load the part (d15Warm, beside teachWarm), which adds the items, the new Discover world and the two
   Spanish units (deep15Apply), then open the map again where the child now starts; a stop tapped before that waits for the part (d15Open) and then opens by its
   stop id, since inserting a world moves the stop indexes. Nothing new is in the start-up files but these few lines. */
let D15F = 0; // 1 once deep15Apply has run (or the part loaded without it): never asked again this session
const D15P = ['teach', 'teach12', 'teachrd', 'teaches'];
const d15Want = p => !!DEEP15_ON && !D15F && (p == 'disc' || p == 'es');
function d15Warm(p) {
  if (!d15Want(p)) return;
  partsLoad(D15P).then(bad => { if (bad) return; deep15Apply(); D15F = 1; if (MAPP == p && $('#map')) pathMap(p); }); // opens where the child starts now (a 1st grader: the new world)
}
function d15Then(p, f) {
  partsThen(D15P, () => { deep15Apply(); D15F = 1; f(); }, {title: PATHS[p].n, icon: UI.SUBJ_ICON[p] || 'map', line: 'Getting the new stops ready...'});
}
function d15Open(p, i) {
  const id = nid(NODES[p][i]);
  d15Then(p, () => { const j = NODES[p].findIndex(n => nid(n) == id); if (j < 0) pathMap(p); else open(p, j); });
}
