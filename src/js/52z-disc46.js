/* ---------- DISC-46: Discover worlds for grades 4 and 6 (part teaches; the items are in src/data/d-disc46.js) ----------
   disc46Apply() adds the drafted worlds, once, and only with DISC46_ON (42m-disc46on.js, BUILT from docs/drafts/DISC46-READ.md). With 0
   it does nothing at all: no bank, skill, map, icon, scene or report strand changes. The part's data file calls it as its last line (the
   app loads this part after data.<VER>.js); the Discover map calls it again after loading the part (d46Warm, d46Open in 42n-disc46.js).
   What it adds, as DEEP-15 did (52y-deep15.js): twelve new skills (one stop each, max 1) with their own banks; Canyon Trail (g 4) after
   Science Lab and Volcano Ridge (g 6) after Star Observatory, placed by world id, so it does not matter whether DEEP-15's Discovery Garden
   is in yet. A stop is saved by its id (S.maps, nid), never by its index, so inserting worlds moves no stars; the index of a running round
   (G.node) and the world picked in the strip (MAPW.disc) are moved to match. Returns true when it added them. */
// the choice rows of a new stop: as discRows (d-disc.js), for grade 4 or 6: no read-aloud list, a picture of the subject when the row has one
function d46Rows(text, grade) {
  return text.trim().split('\n').map(r => {
    const f = r.split('|'), it = {lv: 1, grade, q: f[0], a: f[1], d: f[2].split(';'), topic: f[3]};
    if (f[4]) it.em = f[4].split(',');
    it.hint = f[5] || D46_HINT[f[3]];
    return it;
  });
}
/* everything disc46Apply touches is there: the banks (gen2 37-bank.js, filled by the data file) and the data file up to SCN_W (d-scenes.js).
   Only typeof on names that are either declared or never declared, so it never throws: in tools/test.js the parts run before the data (no
   banks yet), and when a start-up file is missing or stale the data file stops part way and this part's last line must then do nothing
   rather than throw (A11c: the app is refused by dataReady() as before). */
function d46Ready() {
  return typeof BANK == 'object' && !!BANK.sci_life && typeof genBank == 'function' && typeof SCN_W == 'object' && !!SCN_W;
}
function disc46Apply() {
  if (!DISC46_ON || D46F || !d46Ready()) return false;
  D46F = 1;
  const g = typeof G != 'undefined' && G && G.path && NODES[G.path] && G.node >= 0 && NODES[G.path][G.node] ? nid(NODES[G.path][G.node]) : null;
  const W = PATHS.disc.worlds, mw = MAPW.disc != null && W[MAPW.disc] ? W[MAPW.disc].id : null;
  for (const s of D46.disc) {
    BANK[s.id] = d46Rows(s.rows, s.grade).concat(s.kinds.map(k => Object.assign({lv: 1}, k)));
    SK[s.id] = {t: s.t, e: s.e, area: 'disc', max: 1, bank: s.id, gen: lv => genBank(s.id, lv)};
    ICO_SK[s.id] = s.ico;
  }
  for (const x of D46.worlds) { W.splice(W.findIndex(w => w.id == x.after) + 1, 0, x.w); SCN_W[x.w.id] = x.scene; }
  if (typeof REP != 'undefined') for (const st of REP.STRANDS) if (D46.strands[st[0]]) st[1] += ' ' + D46.strands[st[0]];
  buildNodes('disc');
  if (mw) MAPW.disc = W.findIndex(w => w.id == mw);
  if (g) G.node = NODES[G.path].findIndex(n => nid(n) == g);
  return true;
}
