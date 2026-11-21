/* ---------- PLAY-01: the Google Play app: a free sample and a one-time unlock (core; the screens and the purchase are 89-play.js) ----------
   Whistlestop on Google Play is a free download with one in-app product (PLAY.SKU) that unlocks everything for every child on the
   tablet. The web version (github.io, or any page not opened by the Play app) is never locked: PLAY.on stays false there.

   Play mode (PLAY.on) is set once and kept on this tablet (localStorage PLAY.KEY) when the page is opened by the Play app, a Trusted
   Web Activity: its launch URL carries ?src=play (the TWA's start URL) or the referrer is android-app://<PLAY.PKG>, AND
   getDigitalGoodsService(PLAY.BILLING) resolves to a real service (normal Chrome has the function but rejects or gives null outside a
   TWA: then nothing is kept). Never on *.github.io. Until the service answers, the page is not locked (the first screen of the very
   first start); then PLAY.redraw draws the screen again. A child cannot turn it off (there is no switch, and a TWA has no address bar).

   The device store PLAY.KEY = {v: 1, on: 1, own: 0|1, at: ms of the last check with Google Play, miss: ms of the first of the checks in
   a row that found no purchase, ackd: purchase tokens Google Play has confirmed acknowledged}. The unlock belongs to the tablet (the
   family bought it), not to one child's save S: every child on the tablet is unlocked, a backup file never carries it to another
   tablet, and "Start over" keeps it. It is the last state Google Play confirmed: offline, or when Google Play cannot be asked, it stays
   as it was, so a family that paid is never locked out. It is re-checked at every start when online (89-play.js PLAY.verify); a paid
   unlock is only taken back when checks at least a day apart find no purchase (a refund).

   The free sample (owner decision 2026-11-18): in each subject, the first PLAY.FREE_STOPS stops of the world a fresh child of the
   CURRENT grade starts in (defStart(p, gradeOf()) in 42-paths.js, the rule startWorld uses, without placement), with their lessons.
   Every other stop and world waits for the unlock. Also free: every Game Room game (game time is still earned only by learning), the
   pet, stickers, missions, streak, the report card, Mixed Practice, Fact Race and Fact Sprint, the check-ins, the Puzzle of the Day;
   one child (the first) can play. Locking never changes a save: stars and progress outside the sample stay in S, and come back the
   moment the app is unlocked (and always in the web version). Migrations run as if unlocked (PLAY.mig), so what a save means never
   depends on the mode. */
const PLAY = {
  SKU: 'unlock_all', // the in-app product id in Play Console (a one-time, non-consumable product)
  PKG: 'com.whistlestoplearning.app', // the Play app's package name: PROPOSED (v191), the owner confirms it before the first upload (docs/PLAY-SETUP.md)
  BILLING: 'https://play.google.com/billing',
  ACK_URL: 'api/ack', // the owner's acknowledgement endpoint on the Play app's own site (api/ack.js, Vercel; docs/PLAY-SETUP.md)
  LAUNCH: 'Launch price until January 31, 2027.', // a line under the price; the owner may change it (no amount here: the price comes from Play)
  LAUNCH_END: '2027-02-01', // the launch line is not shown from this day on
  FREE_STOPS: 5, // stops of the start world in the free sample
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
    try { localStorage.setItem(PLAY.KEY, JSON.stringify(PLAY.st)); return true; } catch (e) { return false; }
  },
  // RC-1: after a change to PLAY.st: read it back from storage, or, when it could not be written (storage full), keep what is in memory
  // for this session (a family that just paid is never locked again by a failed write)
  keep() {
    if (PLAY.write()) return PLAY.read();
    PLAY.on = PLAY.st.on === 1;
    PLAY.own = PLAY.on && PLAY.st.own === 1;
  },
  // At load: keep Play mode once it was set; set it when the Play app opened this page and Google Play billing answers (see the header).
  // Returns a promise of PLAY.on (tests await it).
  detect() {
    PLAY.read();
    if (PLAY.on) return Promise.resolve(true);
    try {
      const g = globalThis, loc = g.location || {}, host = String(loc.hostname || '');
      if (/(^|\.)github\.io$/i.test(host)) return Promise.resolve(false); // the web version is always fully open
      const ref = String((g.document && g.document.referrer) || ''), q = String(loc.search || '');
      const app = !!PLAY.PKG && ref.indexOf('android-app://' + PLAY.PKG) === 0, param = /[?&]src=play(&|$)/.test(q);
      if (!(app || param) || typeof g.getDigitalGoodsService != 'function') return Promise.resolve(false);
      return new Promise(res => res(g.getDigitalGoodsService(PLAY.BILLING))).then(svc => { // asked now; kept only for a real service
        if (!svc || typeof svc.listPurchases != 'function') return false;
        PLAY.read();
        PLAY.st.on = 1;
        PLAY.st.own = PLAY.st.own === 1 ? 1 : 0;
        PLAY.keep();
        if (typeof PLAY.redraw == 'function') PLAY.redraw();
        if (typeof PLAY.verify == 'function') PLAY.verify().catch(() => {});
        return true;
      }, () => false);
    } catch (e) { return Promise.resolve(false); }
  },
  // the bought state, as Google Play confirmed it (89-play.js); a change is kept on the tablet at once
  setOwn(v) {
    PLAY.st.own = v ? 1 : 0;
    PLAY.st.at = Date.now();
    delete PLAY.st.miss;
    PLAY.keep();
  },
  locked() { return PLAY.on && !PLAY.own && !PLAY.mig; },
  // the free world of path p: the start world of the child's grade
  freeW(p) { return defStart(p, gradeOf()); },
  free(p, wi) { return wi === PLAY.freeW(p); },
  freeStop(p, i) {
    const wi = PLAY.freeW(p);
    return NODES[p][i].wi === wi && i < WR[p][wi][0] + PLAY.FREE_STOPS;
  },
  lockedW(p, wi) { return PLAY.locked() && !PLAY.free(p, wi); }, // a whole world outside the sample
  lockedS(p, i) { return PLAY.locked() && !PLAY.freeStop(p, i); }, // a stop outside the sample
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
