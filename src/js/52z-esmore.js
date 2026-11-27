/* ---------- ES-MORE: more Spanish weather and feelings words (part teaches; the words are in src/data/d-es-more.js) ----------
   esMoreApply() adds them, once, and only with ESMORE_ON (42f-esmoreon.js, BUILT from docs/drafts/ES-MORE-READ.md). With 0 it does
   nothing at all: no unit, word, picture or drawing changes. With 1 it adds words at the END of the units weather and feel (SPN shares
   the arrays, so the learn cards and the questions see them, and a saved review item keeps its place), their confuse pairs and caption
   words, and their drawings (ART names wx-*, read only at render time, so nothing else in the app changes its pictures). No new stop,
   unit or skill. The data file calls it as its last line; with the gate on, the Spanish map loads the part (46-home.js).
   Returns true when it added them. */
let ESMF = 0; // 1 once esMoreApply has run
/* the same test as DEEP-15's d15Ready (52y-deep15.js): only typeof on var / function names, so it never throws. In tools/test.js the parts
   run before the data, and when a start-up file is missing or stale the data file stops part way: then this does nothing (A11c). */
function esmReady() {
  return typeof BANK == 'object' && !!BANK.sci_life && typeof esReg == 'function' && typeof SCN_W == 'object' && !!SCN_W;
}
function esMoreApply() {
  if (!ESMORE_ON || ESMF || !esmReady()) return false;
  ESMF = 1;
  for (const id in ESM.es) {
    const u = ES_UNITS.find(x => x.id == id);
    u.items.push(...ESM.es[id]);
    if (ESM.confuse[id]) u.confuse = (u.confuse || []).concat(ESM.confuse[id]);
    if (ESM.cap[id] && u.cap !== 1) u.cap = (u.cap || []).concat(ESM.cap[id]);
  }
  Object.assign(ART, ESM.art);
  return true;
}
