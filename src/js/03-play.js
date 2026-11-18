/* ---------- PLAY-01: the Google Play app: a free sample and a one-time unlock (core; the screens and the purchase are 89-play.js) ----------
   Star School on Google Play is a free download with one in-app product (PLAY.SKU) that unlocks everything for every child on the
   tablet. The web version (github.io, or any page not opened by the Play app) is never locked: PLAY.on stays false there.

   Play mode (PLAY.on) is set once and kept on this tablet (localStorage PLAY.KEY) when the page is opened by the Play app, a Trusted
   Web Activity: its launch URL carries ?src=play (the TWA's start URL) or the referrer is android-app://<PLAY.PKG>, AND the page can
   reach Google Play billing (window.getDigitalGoodsService, which only the Play app's Chrome tab offers). Never on *.github.io. A child
   cannot turn it off (there is no switch, and a TWA has no address bar); typing ?src=play into a normal browser does nothing there.

   The device store PLAY.KEY = {v: 1, on: 1, own: 0|1, at: ms of the last check with Google Play, miss: checks in a row that found no
   purchase}. The unlock belongs to the tablet (the family bought it), not to one child's save S: every child on the tablet is unlocked,
   a backup file never carries it to another tablet, and "Start over" keeps it. It is the last state Google Play confirmed: offline,
   or when Google Play cannot be asked, it stays as it was, so a family that paid is never locked out. It is re-checked with
   listPurchases() at every start when online (89-play.js PLAY.verify); a paid unlock is only taken back when two checks in a row
   find no purchase (a refund).

   The free sample (PLAY.free): in each subject, the world a child of each grade starts in on a fresh save (defStart(p, g) in
   42-paths.js, the same rule startWorld uses, without placement), for every grade Pre-K to 6th: so every grade has a free world in
   every subject, and changing the grade never locks a world the child could play. Lessons and practice stops inside those worlds,
   the pet, stickers, missions, streak, the report card, Mixed Practice, Fact Race and Fact Sprint, the check-ins and the Puzzle of
   the Day are free; in the Game Room, game time is earned and spent as usual on PLAY.FREE_GAMES; one child (the first) can play.
   Locking never changes a save: stars and progress in a locked world stay in S, and come back the moment the app is unlocked (and
   always in the web version). Migrations run as if unlocked (PLAY.mig), so what a save means never depends on the mode. */
const PLAY = {
  SKU: 'unlock_all', // the in-app product id in Play Console (a one-time, non-consumable product)
  PKG: '', // the Android package name of the Play app, once the owner has one (docs/PLAY-SETUP.md); '' = only ?src=play is used
  BILLING: 'https://play.google.com/billing',
  LAUNCH: 'Launch price until January 31, 2027.', // a line under the price; the owner may change it (no amount here: the price comes from Play)
  LAUNCH_END: '2027-02-01', // the launch line is not shown from this day on
  FREE_GAMES: ['art', 'snack'], // Coloring and Snack Stand: the two lightest games (2D, no WebGL)
  KEY: KEY + '-play',
  on: false, // running as the Play app
  own: false, // the unlock is bought (the last state Google Play confirmed)
  mig: 0, // > 0 while migrations run: nothing is locked
  st: { v: 1 },
  read() {
    let o = null;
    try { o = JSON.parse(localStorage.getItem(PLAY.KEY)); } catch (e) {}
    PLAY.st = o && typeof o == 'object' && !Array.isArray(o) ? o : { v: 1 };
    PLAY.on = PLAY.st.on === 1;
    PLAY.own = PLAY.on && PLAY.st.own === 1;
  },
  write() {
    try { localStorage.setItem(PLAY.KEY, JSON.stringify(PLAY.st)); } catch (e) {}
  },
  // At load: keep Play mode once it was set; set it when the Play app opened this page (see the header)
  detect() {
    PLAY.read();
    if (PLAY.on) return;
    try {
      const g = globalThis, loc = g.location || {}, host = String(loc.hostname || '');
      if (/(^|\.)github\.io$/i.test(host)) return; // the web version is always fully open
      const ref = String((g.document && g.document.referrer) || ''), q = String(loc.search || '');
      const app = !!PLAY.PKG && ref.indexOf('android-app://' + PLAY.PKG) === 0, param = /[?&]src=play(&|$)/.test(q);
      if ((app || param) && typeof g.getDigitalGoodsService == 'function') {
        PLAY.st.on = 1;
        PLAY.st.own = PLAY.st.own === 1 ? 1 : 0;
        PLAY.write();
        PLAY.read();
      }
    } catch (e) {}
  },
  // the bought state, as Google Play confirmed it (89-play.js); a change is kept on the tablet at once
  setOwn(v) {
    PLAY.st.own = v ? 1 : 0;
    PLAY.st.at = Date.now();
    PLAY.st.miss = 0;
    PLAY.write();
    PLAY.read();
  },
  locked() { return PLAY.on && !PLAY.own && !PLAY.mig; },
  // the ids of the free worlds of path p (cached per path and world list)
  ids: {},
  freeIds(p) {
    const ws = PATHS[p].worlds, k = ws.map(w => w.id).join();
    const c = PLAY.ids[p];
    if (c && c.k === k) return c.s;
    const s = new Set(GRADES.map(g => ws[defStart(p, g)].id));
    PLAY.ids[p] = { k, s };
    return s;
  },
  free(p, wi) { return PLAY.freeIds(p).has(PATHS[p].worlds[wi].id); },
  lockedW(p, wi) { return PLAY.locked() && !PLAY.free(p, wi); },
  gameLocked(id) { return PLAY.locked() && !PLAY.FREE_GAMES.includes(id); },
  // Brain Teasers: only the Puzzle of the Day is free (it changes type every day)
  btLocked(id, band, level) {
    if (!PLAY.locked()) return false;
    const d = BT.dailyInfo();
    return !(d && d.id === id && d.band === band && String(d.level) === String(level));
  },
  // more children than one: only the first child on the tablet plays in the free sample
  kidLocked(id) { return PLAY.locked() && id !== PRF.ids[0]; },
};
PLAY.detect();
