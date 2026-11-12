/* ---------- Brain Teasers: hub and puzzle framework (P3-01; BRAIN_TEASERS.md sections 2, 3, 9) ----------
   Every puzzle type lives in its own file 75-bt-<id>.js and plugs in with BT.reg(). This file owns everything a puzzle must not redo:
   the hub, the level strip, the play frame (top bar, timer, hint button with tiers and a cooldown, restart), the win card, stars,
   game time, saving, level unlocking and the seeded random numbers.

   REGISTER A TYPE (in 75-bt-<id>.js, at load time; BT is defined before any 75- file runs):
     BT.reg({
       id: 'maze',                 // lowercase letters and digits, unique; never 'cur', 'daily', 'badges', 'earn', 'rnd'
       name: 'Mazes',              // shown on the hub card and in the top bar
       icon: 'maze',               // a name from ICONS (15-icons.js); an unknown name shows the 'puzzle' icon
       bands: 'ABCD',              // the bands the type is offered in (A PK-K, B grades 1-2, C 3-4, D 5-6)
       levels: band => 12,         // optional: levels in a band (default 12); after the last one, "Endless" opens
       allow: 2,                   // optional: mistakes that still earn 3 stars (default 2)
       rules: 'Find the way out.', // optional: one line on the level strip, with a speak button
       make(band, level, rnd) {},  // -> JSON-safe puzzle that includes or implies its solution. rnd() is seeded: use it (the globals
                                   //    rnd, R, pick, shuffle and coin are seeded too while make runs, so old helpers work)
       mount(el, puzzle, api) {},  // draw the puzzle into el; return {hint(tier), destroy()}
       solve(puzzle) {},           // -> the moves that win (used by tests and the smoke bot only)
     });
   mount():
     api.win({mistakes, hints, sec})  the child solved it (call once; hints and sec are filled in by the frame when left out)
                                      note: optional lines of plain text for the win card (P3-07: the answer in words)
     api.sfx                          the SFX object      api.say(text)   speak a line (ignored when the voice is off)
     api.saveState(obj)               store this puzzle's unfinished state (JSON-safe); call after every move
     api.loadState()                  the stored state to resume from, or null     api.band, api.level  read-only
   hint(tier) is called with 1, 2, 3 (a 4th press repeats 3); return false when no hint could be given (nothing is counted).
   destroy() must stop every timer the puzzle started (the frame also calls it when the screen changes, see view() in 40-view.js).
   make() runs again for a new play, so level N of a type is the same puzzle for the day (seed = type|band|level|day) and a different
   one tomorrow. An unfinished puzzle is saved whole in S.bt.cur (puzzle, state, hints, seconds) and resumes exactly.

   SAVE (S.bt, read with defaults, no migration; ROADMAP 9):
     S.bt[type][band] = {lvl, stars: [0..3 per level], endless}   lvl = highest unlocked level (12 solved -> 13 = Endless open)
     S.bt.cur    = {id, band, level (number or 'E'), puzzle, state, hints, sec, day}  one unfinished puzzle at a time
     S.bt[type][band].quit = {lv, n}   unsolved attempts left on level lv (P3-17: the third one offers the band below; section 7)
     S.bt.daily  = {day, done: [type ids], pick: {id, band, level}}                   Puzzle of the Day (Home card and hub, P3-17)
     S.bt.badges = {got: {badge id: day}, n: puzzles solved, dd: {day, n, best}}       badges (P3-17), see BADGES below
     S.bt.earn = {day, sec} game time earned today.   S.bt.rnd = {day, n} solves today.
   STARS: 3 = no hint and mistakes <= allow, 2 = at most one hint, 1 = finished.
   REWARDS (section 9): first solve of a level: its stars, and game time 45/60/90/120 s (band A/B/C/D) x stars/3, least a half,
   where the stars for game time leave hints out (R-01b: a hint costs a star, not game time; BT.rate(0, mistakes));
   replay or Endless: 15 s, and only stars that improve the level's best are paid. The Puzzle of the Day adds 5 coins and 60 s once
   a day. Game time from puzzles stops at half of the grown-up's daily cap. Three solves in a day make one round (day().r, streak,
   activity log, the daily mission). Nothing here is sent anywhere.
   PUZZLE OF THE DAY (P3-17): one of the types offered in the child's band, chosen by the date alone (pickFor), at the child's next
   level in it; stored in S.bt.daily.pick so it stays all day (picked again only if the grade changes before it is done). Paid once a
   day: 5 coins and 60 s on top of the level's own stars and game time. Shown on Home (hmDaily in 46-home.js) and on the hub.
   BADGES (P3-17, section 9): 'first.<type>' first solve of a type; 'n10' 'n25' 'n50' 'n100' puzzles solved; 'day7' the Puzzle of the
   Day 7 days in a row; 'all.<type>.<band>' every level of a type in a band. badgeCheck() stores each one once, with the day it was
   earned; nothing ever takes one away. A save from before badges counts its solved levels, so old work still earns them.
   LEAVING A LEVEL (P3-17, section 7): each time an unsolved puzzle is left (Back, another screen, Start again) counts; the
   third time on the same level offers that level in the band below, without penalty (noteQuit, offerLower). */
const BT = {
  ORDER: ['sudoku', 'mdoku', 'logic', 'maze', 'pattern', 'pyramid', 'balance', 'target', 'tangram', 'fit', 'robot', 'riddle', 'memory',
    'copycat', 'wsearch', 'scramble', 'cubes', 'rotate', 'mirror'], // the catalog order of BRAIN_TEASERS.md section 4
  RESERVED: ['cur', 'daily', 'badges', 'earn', 'rnd'],
  BANDS: 'ABCD',
  BAND_NAME: { A: 'PK-K', B: '1-2', C: '3-4', D: '5-6' },
  GT: { A: 45, B: 60, C: 90, D: 120 }, // game time seconds for a 3-star first solve
  REPLAY_SEC: 15, DAILY_SEC: 60, DAILY_COINS: 5, CAP_SHARE: 0.5,
  LEVELS: 12, ALLOW: 2, NEXT_BAND_STARS: 10, HINT_CD: 10, ROUND_N: 3,
  BADGE_N: [10, 25, 50, 100], BADGE_DAYS: 7, QUIT_N: 3,
  types: {}, act: null, // act: the puzzle on screen {run, inst, iv, cd, won}
  offer: null, // the band-below offer waiting to be shown (noteQuit), not saved

  /* ---------- registry ---------- */
  reg(d) {
    const bad = m => { throw new Error('BT.reg ' + (d && d.id) + ': ' + m); };
    if (!d || typeof d != 'object') bad('needs an object');
    if (!/^[a-z][a-z0-9]{0,15}$/.test(d.id || '')) bad('id must be lowercase letters and digits');
    if (BT.RESERVED.includes(d.id)) bad('id is reserved');
    if (BT.types[d.id]) bad('already registered');
    if (typeof d.name != 'string' || !d.name) bad('name is required');
    if (!/^[ABCD]{1,4}$/.test(d.bands || '')) bad('bands must be letters of ABCD');
    for (const f of ['make', 'mount', 'solve']) if (typeof d[f] != 'function') bad(f + ' must be a function');
    if (d.levels != null && typeof d.levels != 'function') bad('levels must be a function');
    return BT.types[d.id] = Object.assign({ icon: 'puzzle', levels: () => BT.LEVELS, allow: BT.ALLOW, rules: '' }, d);
  },
  unreg(id) { delete BT.types[id]; }, // for tests
  get(id) { return BT.types[id] || null; },
  list() {
    const o = id => { const i = BT.ORDER.indexOf(id); return i < 0 ? 99 : i; };
    return Object.values(BT.types).sort((a, b) => o(a.id) - o(b.id) || (a.id < b.id ? -1 : 1));
  },
  icon: d => (typeof ICONS != 'undefined' && ICONS[d.icon]) ? d.icon : 'puzzle',
  nLevels(d, band) { return Math.max(1, +d.levels(band) | 0 || BT.LEVELS); },

  /* ---------- bands ---------- */
  bandOf(g) { return g <= 0 ? 'A' : g <= 2 ? 'B' : g <= 4 ? 'C' : 'D'; }, // PK and K -> A, 1-2 -> B, 3-4 -> C, 5-6 -> D
  band() { return BT.bandOf(gradeOf()); },
  offered() { const b = BT.band(); return BT.list().filter(t => t.bands.includes(b)); }, // the hub hides the rest
  // bands the child may play in a type: the child's own, one lower, and the next one up after 10 stars in the own band
  bands(d) {
    const own = BT.band(), i = BT.BANDS.indexOf(own), out = [];
    if (i > 0) out.push(BT.BANDS[i - 1]);
    out.push(own);
    if (i < 3 && BT.starsIn(d.id, own) >= BT.NEXT_BAND_STARS) out.push(BT.BANDS[i + 1]);
    return out.filter(b => d.bands.includes(b));
  },

  /* ---------- saved data (defaults, never throws on a damaged save) ---------- */
  st() { return (S.bt && typeof S.bt == 'object' && !Array.isArray(S.bt)) ? S.bt : (S.bt = {}); },
  // the record of a type in a band; `make` stores a new one, otherwise a missing record comes back as a loose default
  rec(id, band, make) {
    const s = BT.st(), t = s[id] && typeof s[id] == 'object' ? s[id] : null;
    let r = t && t[band] && typeof t[band] == 'object' ? t[band] : null;
    if (!r) {
      r = { lvl: 1, stars: [], endless: 0 };
      if (make && !BT.RESERVED.includes(id)) { (s[id] = t || {})[band] = r; }
    }
    r.stars = Array.isArray(r.stars) ? r.stars.map(v => v >= 0 && v <= 3 ? v | 0 : 0) : [];
    r.lvl = Math.max(1, Math.min(999, (+r.lvl | 0) || 1));
    r.endless = Math.max(0, +r.endless | 0);
    if ('quit' in r) {
      const q = r.quit;
      if (q && typeof q == 'object' && !Array.isArray(q)) r.quit = { lv: Math.max(0, +q.lv | 0), n: Math.max(0, Math.min(BT.QUIT_N, +q.n | 0)) };
      else delete r.quit;
    }
    return r;
  },
  // levels of a band solved at least once, plus Endless solves
  solvedIn(id, band) { const r = BT.rec(id, band); return r.stars.filter(v => v > 0).length + r.endless; },
  starsIn(id, band) { return BT.rec(id, band).stars.reduce((a, b) => a + b, 0); },
  starsOf(id) { return BT.BANDS.split('').reduce((a, b) => a + BT.starsIn(id, b), 0); },
  totalStars() { return Object.keys(BT.st()).filter(k => !BT.RESERVED.includes(k)).reduce((a, id) => a + BT.starsOf(id), 0); },
  // the level to show on a type's card: the next one to beat, 12 at most
  nowLevel(d, band) { return Math.min(BT.rec(d.id, band).lvl, BT.nLevels(d, band)); },

  /* ---------- seeded puzzles ---------- */
  fnv(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; },
  seedStr(id, band, level, day, salt) { return [id, band, level, day || today(), salt || 0].join('|'); },
  rng(seedStr) { return mulberry32(BT.fnv(seedStr)); },
  // Endless serves a puzzle of one of the last four levels, picked from the seed
  endlessLevel(d, band, n, day) {
    const N = BT.nLevels(d, band), lo = Math.max(1, N - 3);
    return lo + Math.floor(BT.rng(BT.seedStr(d.id, band, 'E', day, n))() * (N - lo + 1));
  },
  // Build a puzzle. o: {day, salt}. While make() runs the global RNG is the seeded one too.
  make(id, band, level, o = {}) {
    const d = BT.types[id];
    if (!d) throw new Error('BT.make: no type ' + id);
    const r = BT.rng(BT.seedStr(id, band, level, o.day, o.salt)), old = RNG;
    let p;
    RNG = r;
    try { p = d.make(band, level, r); } finally { RNG = old; }
    if (p == null) throw new Error('BT.make: ' + id + ' made nothing');
    return JSON.parse(JSON.stringify(p));
  },

  /* ---------- stars, rewards, round (pure rules first, then the one function that writes S) ---------- */
  rate(hints, mistakes, allow) { return hints == 0 && mistakes <= (allow == null ? BT.ALLOW : allow) ? 3 : hints <= 1 ? 2 : 1; },
  gameSec(band, stars) { return Math.round(BT.GT[band] * Math.max(stars / 3, 0.5)); },
  // game time puzzles may still earn today: half of the grown-up's daily cap (no cap set = no limit)
  room() {
    const e = BT.st().earn, c = ptCfg(), used = e && e.day === today() ? +e.sec || 0 : 0;
    return c.max ? Math.max(0, Math.floor(c.max * 60 * BT.CAP_SHARE) - used) : 1e9;
  },
  // The Puzzle of the Day for a day: one of the types offered in the child's band (the hub hides the others, so only these are
  // open to the child), picked by the date alone, at the child's next level in that type. null when no type is offered.
  pickFor(day) {
    const L = BT.offered();
    if (!L.length) return null;
    const t = L[BT.fnv('daily|' + day) % L.length], band = BT.band();
    return { id: t.id, band, level: BT.nowLevel(t, band) };
  },
  // today's Puzzle of the Day: {id, band, level, done} or null when no type is offered. The pick is stored so it stays all day; it is
  // picked again only when it is no longer valid, or when the child's band changed before it was done. One daily solve a day.
  dailyInfo() {
    const s = BT.st();
    let d = s.daily;
    if (!d || typeof d != 'object' || Array.isArray(d) || d.day !== today() || !Array.isArray(d.done)) d = s.daily = { day: today(), done: [] };
    const p = d.pick, t = p && typeof p == 'object' && BT.types[p.id];
    if (p && !(t && t.bands.includes(p.band) && Number.isInteger(p.level) && p.level >= 1 && p.level <= BT.nLevels(t, p.band) &&
      (d.done.length || p.band == BT.band()))) delete d.pick;
    if (!d.pick) {
      const k = BT.pickFor(d.day);
      if (!k) return null;
      d.pick = k;
    }
    return { id: d.pick.id, band: d.pick.band, level: d.pick.level, done: d.done.length > 0 };
  },

  /* ---------- badges (P3-17; BRAIN_TEASERS 9). Read with defaults; only badgeCheck() and finish() write them. ---------- */
  // the badge store; make = true stores a new one in S.bt (otherwise a missing store comes back as a loose default)
  bdg(make) {
    const s = BT.st();
    let b = s.badges;
    if (!b || typeof b != 'object' || Array.isArray(b)) {
      b = {};
      if (make) s.badges = b;
    }
    if (!b.got || typeof b.got != 'object' || Array.isArray(b.got)) b.got = {};
    for (const k in b.got) if (typeof b.got[k] != 'string') b.got[k] = ''; // a damaged date: the badge stays earned
    b.n = Math.max(0, +b.n | 0);
    const dd = b.dd && typeof b.dd == 'object' && !Array.isArray(b.dd) ? b.dd : {};
    b.dd = { day: typeof dd.day == 'string' ? dd.day : '', n: Math.max(0, +dd.n | 0), best: Math.max(0, +dd.best | 0, +dd.n | 0) };
    return b;
  },
  // puzzles solved: the counter, or (for a save from before badges) what the level records show, whichever is more
  solved() {
    let n = 0;
    for (const id of Object.keys(BT.st())) if (!BT.RESERVED.includes(id)) for (const b of BT.BANDS) n += BT.solvedIn(id, b);
    return Math.max(BT.bdg().n, n);
  },
  /* Every badge, in the order the badges view shows them: [{id, kind (n | day | first | all), name, say, icon, num, t, band, have,
     need, got}]. all = true lists every band of every type (badgeCheck); otherwise the 'all' badges are the bands the child can play
     in that type plus any already earned. Types that are not registered are left out (their earned badges stay stored). */
  badgeList(all) {
    const b = BT.bdg(), n = BT.solved(), out = [];
    const add = o => out.push(Object.assign(o, { have: Math.min(o.have, o.need), got: o.id in b.got }));
    for (const k of BT.BADGE_N) add({ id: 'n' + k, kind: 'n', name: k + ' puzzles', say: `Solve ${k} puzzles.`, num: k, have: n, need: k });
    add({ id: 'day' + BT.BADGE_DAYS, kind: 'day', name: BT.BADGE_DAYS + ' days in a row', num: BT.BADGE_DAYS, have: b.dd.best, need: BT.BADGE_DAYS,
      say: `Solve the Puzzle of the Day ${BT.BADGE_DAYS} days in a row.` });
    const L = BT.list();
    for (const t of L) {
      const s = BT.BANDS.split('').reduce((a, k) => a + BT.solvedIn(t.id, k), 0);
      add({ id: 'first.' + t.id, kind: 'first', name: 'First ' + t.name, say: `Solve your first ${t.name} puzzle.`, icon: BT.icon(t), t: t.id, have: s, need: 1 });
    }
    for (const t of L) {
      const mine = BT.bands(t);
      for (const k of t.bands.split('')) {
        const id = 'all.' + t.id + '.' + k, N = BT.nLevels(t, k);
        if (!all && !mine.includes(k) && !(id in b.got)) continue;
        const done = BT.rec(t.id, k).stars.slice(0, N).filter(v => v > 0).length;
        add({ id, kind: 'all', name: t.name + ' ' + BT.BAND_NAME[k], icon: BT.icon(t), t: t.id, band: k, have: done, need: N,
          say: `Solve all ${N} levels of ${t.name} for grades ${BT.BAND_NAME[k]}.` });
      }
    }
    return out;
  },
  // Store every badge that is earned and not stored yet (once each, never taken away). Returns the new ones (badgeList entries).
  badgeCheck() {
    const L = BT.badgeList(true).filter(x => !x.got && x.have >= x.need);
    if (!L.length) return [];
    const b = BT.bdg(true);
    for (const x of L) { b.got[x.id] = today(); x.got = true; }
    return L;
  },

  /* ---------- leaving a level unsolved (P3-17; BRAIN_TEASERS 7) ---------- */
  // run (S.bt.cur) was left unsolved. The same level 3 times returns the offer {id, band (the one below),
  // level, from} when the type has that band, and the count starts again. Another level starts its own count; a solve clears it.
  noteQuit(run) {
    const d = run && typeof run == 'object' && BT.types[run.id];
    if (!d || run.level == 'E' || !(+run.level >= 1) || !/^[ABCD]$/.test(run.band)) return null;
    const lv = +run.level, r = BT.rec(run.id, run.band, true);
    if (!r.quit || r.quit.lv !== lv) r.quit = { lv, n: 0 };
    if (++r.quit.n < BT.QUIT_N) return null;
    r.quit.n = 0;
    const low = BT.BANDS[BT.BANDS.indexOf(run.band) - 1];
    if (!low || !d.bands.includes(low)) return null;
    return { id: run.id, band: low, level: Math.min(lv, BT.nLevels(d, low)), from: run.band };
  },
  // The offer as a sheet over the level strip or the hub: play that level in the band below, or keep trying. Nothing is lost.
  offerLower() {
    const o = BT.offer, d = o && BT.types[o.id];
    BT.offer = null;
    if (!d) return;
    const line = `This level is a tricky one. Want to try level ${o.level} for grades ${BT.BAND_NAME[o.band]}? Your stars stay safe.`;
    const sh = UI.sheet(`<div class="bt-offi">${ico(BT.icon(d), 44)}</div><h2>Try an easier one?</h2><p>${esc(line)}</p><div class="acts">` +
      UI.btn('Yes, try it', { kind: 'primary', size: 'lg', wide: true, icon: 'play', id: 'btlow' }) +
      UI.btn('No, keep trying', { kind: 'ghost', wide: true, id: 'btstay' }) + '</div>');
    sh.el.classList.add('bt-off');
    sh.el.querySelector('#btstay').onclick = sh.close;
    sh.el.querySelector('#btlow').onclick = () => { sh.close(); SFX.whoosh(); BT.start(o.id, o.band, o.level); };
    if (S.voice) say('Try an easier one? ' + line);
  },
  // One more solve today; every third one is a round (like a learning round: day count, streak, activity log, mission)
  round() {
    let n = BT.st().rnd;
    if (!n || n.day !== today()) n = BT.st().rnd = { day: today(), n: 0 };
    n.n++;
    if (n.n % BT.ROUND_N) return null;
    actRound();
    const d = day(), stk = streakTick();
    d.r++;
    return { mission: false, streak: stk.msg ? stk.count : 0, sticker: null }; // P5-08: missions are paid in finish() through MIS
  },
  /* A puzzle was solved. run: the saved run (S.bt.cur); res: {mistakes, hints, sec}. Pays everything, clears S.bt.cur, saves.
     Returns what the win card shows: {stars, first, improved, added (new stars paid), unlocked, sec (game time paid), capped, coins,
     daily, round, grew, before, badges (new badges, badgeList entries)}. */
  finish(run, res) {
    const d = BT.types[run.id], band = run.band, endless = run.level == 'E', n = endless ? 0 : +run.level, before = S.stars;
    const dl = BT.dailyInfo(); // first, so a pick made now is for the level the child was on before this solve
    const solved = BT.solved() + 1; // before this solve is in the records
    const stars = BT.rate(res.hints, res.mistakes, d && d.allow), N = d ? BT.nLevels(d, band) : BT.LEVELS;
    const r = BT.rec(run.id, band, true), old = endless ? 3 : (r.stars[n - 1] || 0);
    const first = !endless && !old, improved = !endless && !first && stars > old;
    let added = 0, unlocked = false;
    if (!endless) {
      while (r.stars.length < n) r.stars.push(0);
      added = first ? stars : improved ? stars - old : 0;
      r.stars[n - 1] = Math.max(old, stars);
      if (n >= r.lvl && n <= N) { r.lvl = Math.min(N + 1, n + 1); unlocked = true; }
      if (r.quit && r.quit.lv === n) delete r.quit; // solved: the count of times it was left starts again
    } else r.endless++;
    S.stars += added;
    // game time (P5-09, ptCalc): first solve by band and stars; any replay a flat 15 s; the Puzzle of the Day 60 s once a day; the daily
    // mission 60 s; all of it stops at the room left under the grown-up's cap. The round comes first: it says whether the mission is done.
    let coins = 0;
    const daily = !!(dl && !dl.done && dl.id == run.id && dl.band == band && String(dl.level) == String(run.level));
    if (daily) { coins += BT.DAILY_COINS; BT.st().daily.done.push(run.id); }
    const round = BT.round(), mi = MIS.done({ k: 'teaser' }); // P5-08: the missions it completes (the bonus once all three are done)
    // R-01b: game time follows the stars the solve earns without counting hints (BT.rate with 0 hints): asking for help is a
    // good habit, so hints cost a star but not game time; mistakes can still lower it
    const paid = BT.rate(0, res.mistakes, d && d.allow);
    const PT = ptCalc({ bt: { band, stars, paid, hints: res.hints | 0, first, daily, room: BT.room() } }, 0, 0, 0, 0, false, false, null,
      { mission: mi.bonus });
    const sec = PT.sec, want = PT.want;
    if (sec > 0) {
      const e = BT.st().earn && BT.st().earn.day === today() ? BT.st().earn : (BT.st().earn = { day: today(), sec: 0 });
      e.sec += sec;
      ptEarn(sec);
    }
    S.coins += coins;
    // badges: the solve count, the Puzzle of the Day streak (yesterday's daily + today's = one more day in a row), then every badge
    const bd = BT.bdg(true);
    bd.n = solved;
    if (daily && bd.dd.day !== today()) {
      const t = STRK.idx(today()), dd = bd.dd;
      dd.n = STRK.idx(dd.day) === t - 1 ? dd.n + 1 : 1;
      dd.day = today();
      dd.best = Math.max(dd.best, dd.n);
    }
    const badges = BT.badgeCheck();
    try { ACT.add(today(), { sec: Math.min(res.sec | 0, 900), area: 'bt' }); } catch (e) {}
    const mis = MIS.pay(mi); // P5-08
    delete BT.st().cur;
    save();
    return { stars, first, improved, added, unlocked, sec, capped: sec < want, pt: PT, coins, daily, round, mis, before, grew: stage(S.stars) > stage(before), badges };
  },

  /* ---------- the screen in play ---------- */
  stop() {
    const a = BT.act;
    if (!a) return;
    BT.act = null;
    clearInterval(a.iv);
    if (!a.won) { // left unsolved: seconds and hints so far are kept; the third time on a level offers the band below (offerLower)
      BT.offer = BT.noteQuit(a.run) || BT.offer;
      save();
    }
    try { a.inst && a.inst.destroy && a.inst.destroy(); } catch (e) { logErr('bt destroy: ' + e.message); }
    $$('.bt-win').forEach(e => e.remove());
  },

  // Hub: the Puzzle of the Day, a Keep going card, the badges card and one card per type offered in the child's band
  hub() {
    BT.stop();
    const L = BT.offered(), cur = BT.st().cur, ct = cur && BT.types[cur.id], dl = BT.dailyInfo(), dt = dl && BT.types[dl.id];
    const fresh = L.length ? BT.badgeCheck() : []; // badges earned by a save from before badges (shown once, below)
    if (fresh.length) save();
    let body;
    if (!L.length) body = UI.empty('puzzle', 'Puzzles are on their way. Come back soon!');
    else {
      const cards = L.map(t => {
        const b = BT.band(), n = BT.starsOf(t.id), lv = BT.nowLevel(t, b);
        return GFX.card({ cls: 'bt-type', attrs: `data-t="${t.id}"`, p: 'bt', icon: BT.icon(t), title: t.name,
          sub: `<span class="gx-ln">${ico('star', 18)}<b>${n}</b><span>${n == 1 ? 'star' : 'stars'}</span>${UI.tag('Level ' + lv, '', '')}</span>` });
      }).join('');
      const keep = ct ? GFX.card({ id: 'btkeep', cls: 'bt-keep', p: 'bt', icon: BT.icon(ct), title: 'Keep going!',
        sub: `<span class="gx-ln"><span>${esc(ct.name)}, ${cur.level == 'E' ? 'Endless' : 'level ' + cur.level}</span></span>` }) : '';
      const day_ = dt ? GFX.card({ id: 'btday', cls: 'bt-day' + (dl.done ? ' done' : ''), p: 'bt', icon: 'calendar', title: 'Puzzle of the Day', go: dl.done ? 'check' : 'play',
        sub: `<span class="gx-ln">${dl.done ? '<span>Done! Come back tomorrow.</span>' : `<span>${esc(dt.name)}, level ${dl.level}</span>` +
          `<span class="bt-pay">${ico('coin', 18, 'ic-coin')}<b>+${BT.DAILY_COINS}</b></span>`}</span>` }) : '';
      const gd = BT.bdg().got, got = BT.badgeList().filter(x => x.got); // the three newest badges on the card
      const last = got.slice().sort((a, b) => (STRK.idx(gd[b.id]) || 0) - (STRK.idx(gd[a.id]) || 0)).slice(0, 3);
      const bdg = GFX.card({ id: 'btbdg', cls: 'bt-bdgc', p: 'bt', icon: 'medal', title: 'My badges', go: 'go',
        sub: `<span class="gx-ln">${got.length ? `<span class="bt-mini">${last.map(x => BT.medal(x, 30)).join('')}</span><span>${got.length} ${got.length == 1 ? 'badge' : 'badges'}</span>`
          : '<span>Solve puzzles to win badges!</span>'}</span>` });
      body = `<div class="games bt-top3">${keep}${day_}${bdg}</div><h2 class="bt-h">${ico('puzzle', 26)}<span>Pick a puzzle</span></h2><div class="games">${cards}</div>`;
    }
    view(`<div class="top tbar gx-mtop s-bt">${UI.ibtn('back', 'Back', { size: 'sm', id: 'back' })}<div class="ttl gx-ttl"><span class="gx-tb">${ico('puzzle', 24)}</span>` +
      `<span>Brain Teasers</span></div>${UI.chip('star', BT.totalStars(), { aria: 'Puzzle stars' })}</div><div class="scroll gx-list bt-hub">${body}</div>`);
    $('#back').onclick = () => home();
    $$('[data-t]').forEach(b => b.onclick = () => { SFX.whoosh(); BT.levels(b.dataset.t); });
    if ($('#btkeep')) $('#btkeep').onclick = () => { SFX.whoosh(); BT.start(cur.id, cur.band, cur.level); };
    if ($('#btday')) $('#btday').onclick = () => { SFX.whoosh(); BT.start(dl.id, dl.band, dl.level); };
    if ($('#btbdg')) $('#btbdg').onclick = () => { SFX.whoosh(); BT.badgeView(() => BT.hub()); };
    if (fresh.length) BT.badgeSheet(fresh);
    else if (BT.offer) BT.offerLower();
  },

  /* ---------- badges: the medal drawing, the badges view, the reveal (P3-17) ---------- */
  // medal colour and ribbon colour (--ill-* hues) by kind; a badge not earned yet is drawn in pale greys
  MEDAL: { n: ['yellow', 'blue'], day: ['orange', 'purple'], first: ['purple', 'yellow'], all: ['blue', 'red'] },
  /* A badge as a drawn medal (64 x 72 grid, light from the top left, tokens only): two ribbon tails, a soft drop, a rim, a light face
     with a ring and a gloss, and in the middle the badge's number (counts, days) or its type's icon. x: a badgeList entry. */
  medal(x, size = 64) {
    const c = h => `var(--ill-${h})`, k = BT.MEDAL[x.kind] || BT.MEDAL.n, on = !!x.got;
    const m = on ? k[0] : 'grey', r = on ? k[1] : 'white';
    const rim = on ? c(m + '-2') : c('grey'), face = on ? c(m + '-1') : c('grey-1'), ink = on ? c(m + '-3') : c('grey-2');
    const tails = `<path fill="${on ? c(r + '-2') : c('white-3')}" d="M14 2H28L36.5 33H24.5Z"/><path fill="${on ? c(r) : c('white-2')}" d="M50 2H36L27.5 33H39.5Z"/>` +
      `<path fill="${on ? c(r + '-1') : c('white')}" opacity=".55" d="M38.5 2H42L35.5 26.5L33.8 20.2Z"/>`;
    const disc = `<circle cx="33.5" cy="48.5" r="21" fill="var(--drop)"/><circle cx="32" cy="47" r="21" fill="${rim}"/>` +
      `<circle cx="32" cy="47" r="16.5" fill="${face}"/><circle cx="32" cy="47" r="13.6" fill="none" stroke="${on ? c('white') : c('white-2')}" stroke-width="1.6" opacity=".7"/>` +
      `<path fill="none" stroke="${c('white')}" stroke-width="2.6" stroke-linecap="round" opacity=".75" d="M15.6 40.5A17.5 17.5 0 0 1 25.5 30.6"/>`;
    const mid = x.num != null
      ? `<text x="32" y="${String(x.num).length > 2 ? 52.6 : 53.6}" font-size="${String(x.num).length > 2 ? 14.5 : 18}" fill="${ink}">${x.num}</text>`
      : `<use href="#i-${x.icon || 'puzzle'}" x="21" y="36" width="22" height="22" style="color:${ink}"/>`;
    return `<svg class="bd-m${on ? ' on' : ''}" width="${size}" height="${Math.round(size * 72 / 64)}" viewBox="0 0 64 72" aria-hidden="true">${tails}${disc}${mid}</svg>`;
  },
  // one tile of the badges view (a button: tapping it says what the badge is for)
  badgeTile(x) {
    const st = x.got ? 'Earned!' : x.kind == 'first' ? 'Not yet' : `${x.have} of ${x.need}`;
    return `<button class="bd-t${x.got ? ' got' : ''}" data-b="${esc(x.id)}" aria-label="${esc(x.name + ', ' + (x.got ? 'earned' : st))}">` +
      `${BT.medal(x, 64)}<b>${esc(x.name)}</b><small>${x.got ? ico('check', 16) : ''}<span>${esc(st)}</span></small></button>`;
  },
  // The badges view (from the hub, and a page of the sticker book). back: where the back button goes.
  badgeView(back) {
    BT.stop();
    const L = BT.badgeList(), got = L.filter(x => x.got).length, by = k => L.filter(x => x.kind == k);
    const sec = (title, icon, xs) => xs.length ? `<h2 class="bt-h">${ico(icon, 26)}<span>${esc(title)}</span></h2><div class="bd-grid">${xs.map(BT.badgeTile).join('')}</div>` : '';
    view(`<div class="top tbar gx-mtop s-bt">${UI.ibtn('back', 'Back', { size: 'sm', id: 'back' })}<div class="ttl gx-ttl"><span class="gx-tb">${ico('medal', 24)}</span>` +
      `<span>My badges</span></div>${UI.chip('medal', got, { aria: 'Badges earned' })}</div><div class="scroll gx-list bd-view">` +
      `<p class="bd-sum">${got ? `You have ${got} of ${L.length} badges.` : 'Solve puzzles to win your first badge!'} Tap a badge to hear what it is for.</p>` +
      sec('Puzzles solved', 'puzzle', by('n').concat(by('day'))) + sec('First puzzles', 'star', by('first')) + sec('Every level', 'trophy', by('all')) + '</div>');
    $('#back').onclick = () => { SFX.click(); (back || BT.hub)(); };
    $$('.bd-t').forEach(e => e.onclick = () => {
      const x = L.find(y => y.id == e.dataset.b);
      if (!x) return;
      SFX.pop(2);
      anim(e, 'jump');
      UI.toast(x.say, 'info', 2600, 'medal');
      if (S.voice) say(x.name + '. ' + x.say);
    });
  },
  // Gentle reveal of new badges (a sheet; the win card shows them itself): the medals pop in once (none in calm or reduced motion)
  badgeSheet(xs) {
    const sh = UI.sheet(`<div class="bt-nbm">${xs.slice(0, 4).map(x => BT.medal(x, 72)).join('')}</div>` +
      `<h2>${xs.length > 1 ? 'New badges!' : 'New badge!'}</h2><p>${esc(BT.badgeNames(xs))}</p><div class="acts">` +
      UI.btn('See my badges', { kind: 'primary', size: 'lg', wide: true, icon: 'medal', id: 'btsee' }) + UI.btn('OK', { kind: 'ghost', wide: true, id: 'btok' }) + '</div>');
    sh.el.classList.add('bt-nbs');
    sh.el.querySelector('#btok').onclick = sh.close;
    sh.el.querySelector('#btsee').onclick = () => { sh.close(); BT.badgeView(() => BT.hub()); };
    SFX.magic();
    if (S.voice) say((xs.length > 1 ? 'New badges! ' : 'New badge! ') + BT.badgeNames(xs));
  },
  badgeNames(xs) { return xs.length > 4 ? xs.slice(0, 3).map(x => x.name).join(', ') + ` and ${xs.length - 3} more` : xs.map(x => x.name).join(', '); },

  // Level strip of a type in a band: 12 levels (one unlocks after the other), then Endless
  levels(id, band) {
    const d = BT.types[id];
    if (!d) return BT.hub();
    BT.stop();
    const bands = BT.bands(d);
    if (!bands.includes(band)) band = bands.includes(BT.band()) ? BT.band() : bands[bands.length - 1];
    const r = BT.rec(id, band), N = BT.nLevels(d, band), endOpen = r.lvl > N;
    let cells = '';
    for (let i = 1; i <= N; i++) {
      const open = i <= r.lvl, s = r.stars[i - 1] || 0;
      cells += `<button class="bt-lv${open ? '' : ' lock'}${s ? ' done' : ''}" data-l="${i}" aria-label="Level ${i}, ${open ? (s ? s + ' of 3 stars' : 'ready') : 'locked'}"` +
        `${open ? '' : ' aria-disabled="true"'}>${open ? `<b>${i}</b>` : ico('lock', 26)}${s ? UI.stars(s, 3, 16) : ''}</button>`;
    }
    const seg = bands.length > 1 ? `<div class="bt-bands">${UI.seg(bands.map(b => [b, BT.BAND_NAME[b]]), band, { id: 'btband', label: 'Puzzle group' })}</div>` : '';
    const rules = d.rules ? `<div class="bt-rules"><p>${UI.t(d.rules)}</p>${UI.ibtn('speak', 'Hear the rules', { size: 'sm', id: 'btsay' })}</div>` : '';
    view(`<div class="top tbar gx-mtop s-bt">${UI.ibtn('back', 'Back', { size: 'sm', id: 'back' })}<div class="ttl gx-ttl"><span class="gx-tb">${ico(BT.icon(d), 24)}</span>` +
      `<span>${esc(d.name)}</span></div>${UI.chip('star', BT.starsIn(id, band), { aria: 'Stars in this group' })}</div>` +
      `<div class="scroll gx-list bt-lvl">${seg}${rules}<div class="bt-lvs">${cells}</div>` +
      `<div class="bt-end">${UI.btn(endOpen ? 'Endless' : 'Endless: finish level ' + N, { kind: 'subject', p: 'bt', size: 'lg', wide: true, icon: endOpen ? 'replay' : 'lock', id: 'btend', off: !endOpen })}</div></div>`);
    $('#back').onclick = () => BT.hub();
    UI.segOn($('#btband'), v => BT.levels(id, v));
    if ($('#btsay')) $('#btsay').onclick = () => say(d.rules);
    $$('.bt-lv').forEach(b => b.onclick = () => {
      if (b.classList.contains('lock')) return UI.toast('Finish the level before to open this one.', 'info', 1800, 'lock');
      SFX.whoosh(); BT.start(id, band, +b.dataset.l);
    });
    if ($('#btend')) $('#btend').onclick = () => { SFX.whoosh(); BT.start(id, band, 'E'); };
    if (BT.offer && BT.offer.id == id) BT.offerLower(); // the third time this level was left unsolved
  },

  // Start (or resume) a level. level: 1..N or 'E' (Endless).
  start(id, band, level) {
    const d = BT.types[id];
    if (!d) return BT.hub();
    BT.stop();
    const s = BT.st();
    let c = s.cur;
    if (!(c && c.id == id && c.band == band && String(c.level) == String(level) && c.puzzle)) {
      const r = BT.rec(id, band), n = level == 'E' ? BT.endlessLevel(d, band, r.endless) : +level;
      let puzzle;
      try { puzzle = BT.make(id, band, n, { salt: level == 'E' ? r.endless : 0 }); } catch (e) {
        logErr('bt make ' + id + ': ' + e.message);
        UI.toast('That puzzle would not load. Try another one!', 'try');
        return BT.levels(id, band);
      }
      c = s.cur = { id, band, level, puzzle, state: null, hints: 0, sec: 0, day: today() };
      save();
    }
    BT.play(c);
  },

  play(run) {
    const d = BT.types[run.id], timed = run.band == 'C' || run.band == 'D'; // the timer is hidden in bands A and B
    BT.stop();
    // P3-17: the name is its own element and may wrap to two lines; on a phone with the timer the type icon steps aside (48-teasers.css)
    view(`<div class="top tbar gx-mtop s-bt bt-bar${timed ? ' timed' : ''}">${UI.ibtn('back', 'Back to the levels', { size: 'sm', id: 'back' })}<div class="ttl gx-ttl"><span class="gx-tb">${ico(BT.icon(d), 24)}</span>` +
      `<span class="bt-tt"><span class="bt-nm">${esc(d.name)}</span><small>${run.level == 'E' ? 'Endless' : 'Level ' + run.level}</small></span></div>` +
      `${timed ? UI.chip('timer', fmtT(run.sec), { id: 'bttime', aria: 'Time' }) : ''}${UI.ibtn('replay', 'Start again', { size: 'sm', id: 'btredo' })}</div>` +
      `<div class="bt-play"><div class="bt-stage" id="btstage"></div><div class="bt-foot">${UI.btn('Hint', { icon: 'hint', p: 'bt', id: 'bthint' })}` +
      `<span class="bt-pips" id="btpips"></span></div></div>`);
    const a = BT.act = { run, inst: null, iv: 0, cd: 0, won: false };
    const api = {
      win: r => BT.win(a, r), sfx: SFX, band: run.band, level: run.level,
      say: t => { try { if (S.voice) say(t); } catch (e) {} },
      saveState: o => { run.state = o == null ? null : JSON.parse(JSON.stringify(o)); save(); },
      loadState: () => run.state == null ? null : JSON.parse(JSON.stringify(run.state)),
    };
    const mount = () => {
      $('#btstage').innerHTML = '';
      a.inst = d.mount($('#btstage'), run.puzzle, api) || {};
    };
    try { mount(); } catch (e) {
      logErr('bt mount ' + run.id + ': ' + e.message);
      BT.act = null;
      delete BT.st().cur;
      save();
      UI.toast('That puzzle would not load. Try another one!', 'try');
      return BT.levels(run.id, run.band);
    }
    const hb = $('#bthint'), pips = () => {
      $('#btpips').innerHTML = [1, 2, 3].map(i => `<i class="${i <= run.hints ? 'on' : ''}"></i>`).join('');
      $('#btpips').setAttribute('aria-label', `Hints used: ${Math.min(run.hints, 3)} of 3`);
    };
    const label = t => { hb.querySelector('span').textContent = t; };
    pips();
    if (!a.inst.hint) hb.style.display = 'none';
    hb.onclick = () => {
      if (a.cd > 0 || a.won || !a.inst.hint) return;
      const tier = Math.min(3, run.hints + 1);
      let ok;
      try { ok = a.inst.hint(tier); } catch (e) { logErr('bt hint: ' + e.message); ok = false; }
      if (ok === false) return;
      run.hints = tier;
      save();
      pips();
      a.cd = BT.HINT_CD;
      hb.disabled = true;
      label(`Hint ${a.cd}`);
    };
    $('#back').onclick = () => { SFX.click(); BT.levels(run.id, run.band); };
    $('#btredo').onclick = () => {
      const sh = UI.sheet(`<h2>Start again?</h2><p>This puzzle goes back to the beginning.</p><div class="acts">` +
        UI.btn('Yes, start again', { kind: 'primary', size: 'lg', wide: true, icon: 'replay', id: 'btyes' }) + UI.btn('No, keep playing', { kind: 'ghost', wide: true, id: 'btno' }) + '</div>');
      sh.el.querySelector('#btno').onclick = sh.close;
      sh.el.querySelector('#btyes').onclick = () => {
        sh.close();
        try { a.inst.destroy && a.inst.destroy(); } catch (e) {}
        const off = BT.noteQuit(run); // starting again leaves this attempt unsolved
        run.state = null;
        save();
        try { mount(); } catch (e) { logErr('bt remount: ' + e.message); BT.levels(run.id, run.band); }
        if (off) { BT.offer = off; setTimeout(() => { if (BT.act === a && BT.offer === off) BT.offerLower(); }, 400); }
      };
    };
    a.iv = setInterval(() => { // one tick a second while the page is showing
      if (document.hidden || a.won) return;
      run.sec++;
      if (run.sec % 15 == 0) save();
      const t = $('#bttime');
      if (t) t.querySelector('b').textContent = fmtT(run.sec);
      if (a.cd > 0) {
        a.cd--;
        label(a.cd > 0 ? `Hint ${a.cd}` : 'Hint');
        if (a.cd == 0) hb.disabled = false;
      }
    }, 1000);
  },

  // The child solved the puzzle on screen. a: BT.act (api.win binds it); r: {mistakes, hints, sec}
  win(a, r) {
    if (!a || a.won || BT.act !== a) return;
    a.won = true;
    clearInterval(a.iv);
    r = r || {};
    const run = a.run, res = { mistakes: Math.max(0, r.mistakes | 0), hints: Math.max(r.hints | 0, run.hints), sec: r.sec >= 0 ? Math.round(r.sec) : run.sec };
    const out = BT.finish(run, res);
    const note = Array.isArray(r.note) ? r.note.filter(t => typeof t == 'string').slice(0, 6) : null; // P3-07: the answer in words
    setTimeout(() => { if (BT.act === a) BT.winCard(run, out, note); }, 700); // the puzzle gets a moment to show it is done
  },

  winCard(run, o, note) {
    const d = BT.types[run.id], N = BT.nLevels(d, run.band), endless = run.level == 'E';
    const next = endless ? 'E' : +run.level < N ? +run.level + 1 : (BT.rec(run.id, run.band).lvl > N ? 'E' : 0);
    const li = (ic, t) => `<li>${ico(ic, 18)}<span>${esc(t)}</span></li>`, ls = [];
    if (o.added) ls.push(li('star', `+${o.added} star${o.added > 1 ? 's' : ''}`));
    if (o.coins) ls.push(li('coin', `+${o.coins} coins for the Puzzle of the Day`));
    if (o.round) ls.push(li('check', 'That counts as a learning round'));
    if (o.round && o.round.streak) ls.push(li('flame', `${o.round.streak} days in a row!`));
    // P3-17: new badges pop in on the card, once (calm mode and reduced motion show them still)
    const nb = o.badges && o.badges.length ? `<div class="bt-nb" role="status">${o.badges.slice(0, 3).map(x => BT.medal(x, 56)).join('')}` +
      `<p>${UI.tag(o.badges.length > 1 ? 'New badges!' : 'New badge!', 'new', 'medal')}<b>${esc(BT.badgeNames(o.badges))}</b></p></div>` : '';
    const gt = o.sec > 0 ? `${ico('ticket', 28)}<span>+${BT.fmtSec(o.sec)} of game time${o.capped ? ' (that is all for today)' : ''}</span>`
      : `<span>Game time from puzzles is full for today</span>`;
    // P5-09: why: each part of the game time (ptCalc lines), as the first rows of the list
    if (o.pt) ls.unshift(...o.pt.lines.map(([v, l]) => `<li${v < 0 ? ' class="neg"' : ''}>${ico(v < 0 ? 'replay' : RW.ptIcon(l), 18)}` +
      `<span>${v < 0 ? '\u2212' : '+'}${BT.fmtSec(Math.abs(v))} ${esc(l)}</span></li>`));
    const card = GFX.endCard({ title: o.stars == 3 ? 'Perfect!' : 'Solved!', icon: 'puzzle', rec: false,
      extra: (note && note.length ? `<ul class="bt-sum">${note.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : '') + `<div class="bt-wst">${UI.stars(o.stars, 3, 44, { arc: true })}</div>${o.unlocked && !endless ? `<p class="bt-new">${UI.tag(next === 'E' ? 'Endless is open!' : 'New level open!', 'new', 'sparkle')}</p>` : ''}` +
        (ls.length ? `<ul class="rw-pl bt-wl">${ls.join('')}</ul>` : '') + (o.mis || '') + nb,
      earn: gt,
      btns: (next ? UI.btn(next === 'E' ? 'Endless' : 'Next level', { kind: 'primary', size: 'lg', wide: true, icon: 'go', id: 'btnext' }) : '') +
        `<div class="rw-two">${UI.btn('Again', { icon: 'replay', id: 'btagain' })}${UI.btn('Levels', { icon: 'puzzle', id: 'btlvls' })}</div>` });
    card.classList.add('bt-win');
    document.body.appendChild(card);
    (o.stars == 3 ? SFX.fanfare : SFX.magic)();
    RW.burst(card.querySelector('.rw-card'), o.stars == 3 ? 30 : 16);
    if (S.voice) say((o.stars == 3 ? 'Perfect!' : 'You solved it!') + (nb ? ' And a new badge: ' + BT.badgeNames(o.badges) + '!' : ''));
    if (o.grew) setTimeout(() => { if (card.isConnected) growShow(o.before); }, 1200);
    const go = f => () => { card.remove(); f(); };
    if ($('#btnext')) $('#btnext').onclick = go(() => BT.start(run.id, run.band, next));
    $('#btagain').onclick = go(() => BT.start(run.id, run.band, run.level));
    $('#btlvls').onclick = go(() => BT.levels(run.id, run.band));
  },
  fmtSec(s) { return s < 60 ? `${s} sec` : s % 60 ? `${Math.floor(s / 60)} min ${s % 60} sec` : `${s / 60} min`; },
};
