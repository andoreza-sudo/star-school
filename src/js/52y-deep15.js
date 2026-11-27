/* ---------- DEEP-15 (BEST-APP roadmap 15): deeper Discover and Spanish (part teaches; the items are in src/data/d-deep15.js) ----------
   deep15Apply() adds the drafted items, once, and only with DEEP15_ON (42d-deep15on.js, BUILT from docs/drafts/DEEP15-READ.md). With 0 it
   does nothing at all: no bank, unit, skill, map, icon or report strand changes. The part's data file calls it as its last line (the app
   loads this part after data.<VER>.js); the Discover and Spanish maps call it again after loading the part (d15Warm, d15Open in 42e-deep15.js).
   What it adds (the order matters for saved review items, which keep a bank index and a stop id):
   - Discover: match and order items at the END of each Nature Trail bank; six new skills (one stop each, max 1) with their own banks; the
     world Discovery Garden (g 1) inserted after Nature Trail. A stop is saved by its id (S.maps, nid), never by its index, so inserting a
     world moves no stars; the index of a running round (G.node) and the world picked in the strip (MAPW) are moved to match.
   - Spanish: words at the END of thirteen units (SPN shares the arrays) and two new units (esReg makes their skills), whose stops go at the
     end of La Casa and La Ciudad (before the boss).
   Returns true when it added them. */
const d15Pic = x => D15_PIC[x] || DISC_PIC[x];
// the choice rows of a new stop: as discRows (d-disc.js), grade 1-2, read aloud with the choices, pictures when every choice has one
function d15Rows(text) {
  return text.trim().split('\n').map(r => {
    const f = r.split('|'), it = {lv: 1, grade: '1-2', q: f[0], a: f[1], d: f[2].split(';'), topic: f[3], aloud: true};
    if (f[4]) it.em = f[4].split(',');
    it.hint = f[5] || D15_HINT[f[3]];
    const all = [it.a, ...it.d];
    if (all.every(d15Pic)) it.cp = Object.fromEntries(all.map(x => [x, d15Pic(x)]));
    return it;
  });
}
// a sort, match or order item of level 1 (read aloud, as the KINDS2 items of Nature Trail); a sort chip shows a picture when all have one
function d15Kind(k) {
  const it = Object.assign({lv: 1, aloud: true}, k);
  if (it.form == 'sort') { const ws = Object.values(it.bins).flat(); if (ws.every(d15Pic)) it.cp = Object.fromEntries(ws.map(w => [w, d15Pic(w)])); }
  return it;
}
function deep15Apply() {
  if (!DEEP15_ON || D15F || !BANK.sci_life) return false; // in tools/test.js the parts run before the data: no banks yet
  D15F = 1;
  const g = typeof G != 'undefined' && G && G.path && NODES[G.path] && G.node >= 0 && NODES[G.path][G.node] ? nid(NODES[G.path][G.node]) : null;
  const mw = ['disc', 'es'].map(p => [p, MAPW[p] != null && PATHS[p].worlds[MAPW[p]] ? PATHS[p].worlds[MAPW[p]].id : null]);
  // Discover
  for (const id in D15.top) BANK[id].push(...D15.top[id].map(d15Kind));
  for (const s of D15.disc) {
    BANK[s.id] = d15Rows(s.rows).concat(s.kinds.map(d15Kind));
    SK[s.id] = {t: s.t, e: s.e, area: 'disc', max: 1, bank: s.id, gen: lv => genBank(s.id, lv)};
    ICO_SK[s.id] = s.ico;
  }
  PATHS.disc.worlds.splice(1, 0, D15.world);
  SCN_W[D15.world.id] = 'garden';
  if (typeof REP != 'undefined') for (const st of REP.STRANDS) if (D15.strands[st[0]]) st[1] += ' ' + D15.strands[st[0]];
  // Spanish
  for (const id in D15.es) ES_UNITS.find(u => u.id == id).items.push(...D15.es[id]);
  for (const u of D15.esNew) { ES_UNITS.push(u); SPN[u.id] = u.items; esReg(u); }
  for (const wid in D15.esAt) PATHS.es.worlds.find(w => w.id == wid).nodes.push(...D15.esAt[wid]);
  buildNodes('disc');
  buildNodes('es');
  for (const [p, wid] of mw) if (wid) MAPW[p] = PATHS[p].worlds.findIndex(w => w.id == wid);
  if (g) G.node = NODES[G.path].findIndex(n => nid(n) == g);
  return true;
}
