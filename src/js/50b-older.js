/* ---------- OLDER-14 (BEST-APP roadmap 14): an older look for grades 4 to 6 ----------
   Gated by OLDER_ON (50a-olderon.js, built from docs/drafts/OLDER14-READ.md). With 0 nothing here changes anything: OLD14.on() and
   OLD14.noPet() are false for every child, so finish() draws the chest and Home the pet, exactly as before.
   With 1, a child in grade 4, 5 or 6 (gradeOf() >= 4) gets:
   - the score card at the end of a round (finish(), 50-round.js) at once, with no chest to tap: the score, the time, the stars, the
     personal best for that stop and "New best!" when it is beaten. Every payout is made before the card is drawn, by the same lines of
     finish() as the chest flow; the card only shows them without the tap.
   - a Grown-ups switch "Show my pet" (80-grown.js; S.petOff, absent = shown). Off hides the pet on Home (the stage, the grow meter, the
     Pet Care and Pet Shop buttons, the My Pet tab), on the map, and at the round end (the cheering pet, the growing overlay). Nothing
     about the pet is deleted, and turning the switch on again brings everything back.
   Save: S.pb = {'<path>:<stop id>': [right, questions, ms]}, the best round of each stop (a bigger share right, or the same share in
   less time). It is written only for a grade 4-6 child with the gate on. Old saves have none: the bests start empty, no migration. */
const OLDW = {
  time: 'Time', best: 'Your best', newBest: 'New best!', bestRow: '{sc} out of {n} in {t}', top: 'Excellent round!', coins: '+{n} coins!',
  petSw: 'Show my pet',
  petNote: 'Grades 4 to 6. Off hides the pet on Home, on the map and at the end of a round. Nothing is deleted: the pet, its costumes and the coins are kept for when it is back on.',
};
const OLD14 = {
  on: () => !!OLDER_ON && gradeOf() >= 4,
  noPet: () => OLD14.on() && S.petOff === true,
  key: (p, i) => p + ':' + nid(NODES[p][i]),
  ms: g => g && g.t0 > 0 ? Math.min(5999000, Math.max(0, Date.now() - g.t0)) : 0,
  fmt: ms => { const s = Math.round(ms / 1000); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); },
  F: (s, o) => s.replace(/\{(\w+)\}/g, (m, k) => o[k] != null ? o[k] : m),
  // a = [right, questions, ms] beats b: a bigger share right, or the same share in less time (no b: a is the first)
  better: (a, b) => !b || a[0] * b[1] > b[0] * a[1] || (a[0] * b[1] == b[0] * a[1] && a[2] < b[2]),
  // finish() calls it before save(): null keeps the chest (gate off, or grade 3 and below); else the card's data {ms, best, isNew},
  // and a stop round updates that stop's best. A Tricky Mix, Daily Review, test-out or boss round has a time but no best.
  card(g, sc, n, p, ni) {
    if (!OLD14.on()) return null;
    const c = { ms: OLD14.ms(g), best: null, isNew: false };
    if (!p || !(ni >= 0) || !NODES[p] || !NODES[p][ni] || g.mix || g.test || g.boss || g.daily) return c;
    if (!S.pb || typeof S.pb != 'object' || Array.isArray(S.pb)) S.pb = {};
    const k = OLD14.key(p, ni), o = S.pb[k], was = Array.isArray(o) && o.length == 3 && o.every(x => x >= 0) ? o : null, now = [sc, n, c.ms];
    if (OLD14.better(now, was)) { S.pb[k] = now; c.isNew = !!was; }
    c.best = S.pb[k];
    return c;
  },
  // the card's rows under the score (RW.done): the time, the best, New best!
  html(c) {
    const row = (l, v, id) => `<div class="o14-r" id="${id}"><dt>${esc(l)}</dt><dd>${esc(v)}</dd></div>`, b = c.best;
    return `<dl class="o14-dl">${c.ms ? row(OLDW.time, OLD14.fmt(c.ms), 'o14t') : ''}` +
      `${b ? row(OLDW.best, OLD14.F(OLDW.bestRow, { sc: b[0], n: b[1], t: OLD14.fmt(b[2]) }), 'o14b') : ''}</dl>` +
      `${c.isNew ? `<p class="o14-nb" id="o14nb">${ico('trophy', 26)}<span>${esc(OLDW.newBest)}</span></p>` : ''}`;
  },
};
// the pet is shown (Home, the map, the round end): always, unless a grade 4-6 child turned it off with the look approved
const petShown = () => !OLD14.noPet();
