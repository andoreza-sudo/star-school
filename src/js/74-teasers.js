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
     S.bt.daily  = {day, done: [type ids], pick: {id, band, level}}                   Puzzle of the Day (P3-17 adds the home card)
     S.bt.badges = {}   reserved for P3-17.     S.bt.earn = {day, sec} game time earned today.   S.bt.rnd = {day, n} solves today.
   STARS: 3 = no hint and mistakes <= allow, 2 = at most one hint, 1 = finished.
   REWARDS (section 9): first solve of a level: its stars, and game time 45/60/90/120 s (band A/B/C/D) x stars/3, least a half;
   replay or Endless: 15 s, and only stars that improve the level's best are paid. The Puzzle of the Day adds 5 coins and 60 s once
   a day. Game time from puzzles stops at half of the grown-up's daily cap. Three solves in a day make one round (day().r, streak,
   activity log, the daily mission). Nothing here is sent anywhere. */
const BT = {
  ORDER: ['sudoku', 'mdoku', 'logic', 'maze', 'pattern', 'pyramid', 'balance', 'target', 'tangram', 'fit', 'robot', 'riddle', 'memory',
    'copycat', 'wsearch', 'scramble', 'cubes', 'rotate', 'mirror'], // the catalog order of BRAIN_TEASERS.md section 4
  RESERVED: ['cur', 'daily', 'badges', 'earn', 'rnd'],
  BANDS: 'ABCD',
  BAND_NAME: { A: 'PK-K', B: '1-2', C: '3-4', D: '5-6' },
  GT: { A: 45, B: 60, C: 90, D: 120 }, // game time seconds for a 3-star first solve
  REPLAY_SEC: 15, DAILY_SEC: 60, DAILY_COINS: 5, CAP_SHARE: 0.5,
  LEVELS: 12, ALLOW: 2, NEXT_BAND_STARS: 10, HINT_CD: 10, ROUND_N: 3,
  types: {}, act: null, // act: the puzzle on screen {run, inst, iv, cd, won}

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
    return r;
  },
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
  // today's Puzzle of the Day: {id, band, level, done} or null when no type is offered. The pick is stored so it stays all day.
  dailyInfo() {
    const s = BT.st();
    let d = s.daily;
    if (!d || typeof d != 'object' || d.day !== today() || !Array.isArray(d.done)) d = s.daily = { day: today(), done: [] };
    if (d.pick && !(BT.types[d.pick.id] && BT.types[d.pick.id].bands.includes(d.pick.band))) delete d.pick;
    if (!d.pick) {
      const L = BT.offered();
      if (!L.length) return null;
      const t = L[BT.fnv('daily|' + d.day) % L.length], band = BT.band();
      d.pick = { id: t.id, band, level: BT.nowLevel(t, band) };
    }
    return { id: d.pick.id, band: d.pick.band, level: d.pick.level, done: d.done.includes(d.pick.id) };
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
    let mission = false, sticker = null;
    if (d.r >= 3 && !d.done) { d.done = true; mission = true; S.stars += 5; S.coins += 5; sticker = award(); }
    return { mission, streak: stk.msg ? stk.count : 0, sticker };
  },
  /* A puzzle was solved. run: the saved run (S.bt.cur); res: {mistakes, hints, sec}. Pays everything, clears S.bt.cur, saves.
     Returns what the win card shows: {stars, first, improved, added (new stars paid), unlocked, sec (game time paid), capped, coins,
     daily, round, grew, before}. */
  finish(run, res) {
    const d = BT.types[run.id], band = run.band, endless = run.level == 'E', n = endless ? 0 : +run.level, before = S.stars;
    const dl = BT.dailyInfo(); // first, so a pick made now is for the level the child was on before this solve
    const stars = BT.rate(res.hints, res.mistakes, d && d.allow), N = d ? BT.nLevels(d, band) : BT.LEVELS;
    const r = BT.rec(run.id, band, true), old = endless ? 3 : (r.stars[n - 1] || 0);
    const first = !endless && !old, improved = !endless && !first && stars > old;
    let added = 0, unlocked = false;
    if (!endless) {
      while (r.stars.length < n) r.stars.push(0);
      added = first ? stars : improved ? stars - old : 0;
      r.stars[n - 1] = Math.max(old, stars);
      if (n >= r.lvl && n <= N) { r.lvl = Math.min(N + 1, n + 1); unlocked = true; }
    } else r.endless++;
    S.stars += added;
    // game time: first solve by band and stars; any replay a flat 15 s; the Puzzle of the Day pays 5 coins and 60 s once a day
    let want = first ? BT.gameSec(band, stars) : BT.REPLAY_SEC, coins = 0;
    const daily = !!(dl && !dl.done && dl.id == run.id && dl.band == band && String(dl.level) == String(run.level));
    if (daily) { want += BT.DAILY_SEC; coins += BT.DAILY_COINS; BT.st().daily.done.push(run.id); }
    const sec = Math.min(want, BT.room());
    if (sec > 0) {
      const e = BT.st().earn && BT.st().earn.day === today() ? BT.st().earn : (BT.st().earn = { day: today(), sec: 0 });
      e.sec += sec;
      ptEarn(sec);
    }
    S.coins += coins;
    try { ACT.add(today(), { sec: Math.min(res.sec | 0, 900), area: 'bt' }); } catch (e) {}
    const round = BT.round();
    delete BT.st().cur;
    save();
    return { stars, first, improved, added, unlocked, sec, capped: sec < want, coins, daily, round, before, grew: stage(S.stars) > stage(before) };
  },

  /* ---------- the screen in play ---------- */
  stop() {
    const a = BT.act;
    if (!a) return;
    BT.act = null;
    clearInterval(a.iv);
    if (!a.won) save(); // seconds and hints so far
    try { a.inst && a.inst.destroy && a.inst.destroy(); } catch (e) { logErr('bt destroy: ' + e.message); }
    $$('.bt-win').forEach(e => e.remove());
  },

  // Hub: the Puzzle of the Day, a Keep going card and one card per type offered in the child's band
  hub() {
    BT.stop();
    const L = BT.offered(), cur = BT.st().cur, ct = cur && BT.types[cur.id], dl = BT.dailyInfo(), dt = dl && BT.types[dl.id];
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
      const day_ = dt ? GFX.card({ id: 'btday', cls: 'bt-day', p: 'bt', icon: 'calendar', title: 'Puzzle of the Day', go: dl.done ? 'check' : 'play',
        sub: `<span class="gx-ln"><span>${dl.done ? 'Done! Come back tomorrow.' : esc(dt.name) + ', level ' + dl.level}</span></span>` }) : '';
      body = `<div class="games bt-top3">${keep}${day_}</div><h2 class="bt-h">${ico('puzzle', 26)}<span>Pick a puzzle</span></h2><div class="games">${cards}</div>`;
    }
    view(`<div class="top tbar gx-mtop s-bt">${UI.ibtn('back', 'Back', { size: 'sm', id: 'back' })}<div class="ttl gx-ttl"><span class="gx-tb">${ico('puzzle', 24)}</span>` +
      `<span>Brain Teasers</span></div>${UI.chip('star', BT.totalStars(), { aria: 'Puzzle stars' })}</div><div class="scroll gx-list bt-hub">${body}</div>`);
    $('#back').onclick = () => home();
    $$('[data-t]').forEach(b => b.onclick = () => { SFX.whoosh(); BT.levels(b.dataset.t); });
    if ($('#btkeep')) $('#btkeep').onclick = () => { SFX.whoosh(); BT.start(cur.id, cur.band, cur.level); };
    if ($('#btday')) $('#btday').onclick = () => { SFX.whoosh(); BT.start(dl.id, dl.band, dl.level); };
  },

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
    view(`<div class="top tbar gx-mtop s-bt bt-bar">${UI.ibtn('back', 'Back to the levels', { size: 'sm', id: 'back' })}<div class="ttl gx-ttl"><span class="gx-tb">${ico(BT.icon(d), 24)}</span>` +
      `<span class="bt-tt">${esc(d.name)}<small>${run.level == 'E' ? 'Endless' : 'Level ' + run.level}</small></span></div>` +
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
        run.state = null;
        save();
        try { mount(); } catch (e) { logErr('bt remount: ' + e.message); BT.levels(run.id, run.band); }
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
    if (o.round) ls.push(o.round.mission ? li('gift', 'Daily mission done! +5 coins') : li('check', 'That counts as a learning round'));
    if (o.round && o.round.streak) ls.push(li('flame', `${o.round.streak} days in a row!`));
    const gt = o.sec > 0 ? `${ico('ticket', 28)}<span>+${BT.fmtSec(o.sec)} of game time${o.capped ? ' (that is all for today)' : ''}</span>`
      : `<span>Game time from puzzles is full for today</span>`;
    const card = GFX.endCard({ title: o.stars == 3 ? 'Perfect!' : 'Solved!', icon: 'puzzle', rec: false,
      extra: (note && note.length ? `<ul class="bt-sum">${note.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : '') + `<div class="bt-wst">${UI.stars(o.stars, 3, 44, { arc: true })}</div>${o.unlocked && !endless ? `<p class="bt-new">${UI.tag(next === 'E' ? 'Endless is open!' : 'New level open!', 'new', 'sparkle')}</p>` : ''}` +
        (ls.length ? `<ul class="rw-pl bt-wl">${ls.join('')}</ul>` : ''),
      earn: gt,
      btns: (next ? UI.btn(next === 'E' ? 'Endless' : 'Next level', { kind: 'primary', size: 'lg', wide: true, icon: 'go', id: 'btnext' }) : '') +
        `<div class="rw-two">${UI.btn('Again', { icon: 'replay', id: 'btagain' })}${UI.btn('Levels', { icon: 'puzzle', id: 'btlvls' })}</div>` });
    card.classList.add('bt-win');
    document.body.appendChild(card);
    (o.stars == 3 ? SFX.fanfare : SFX.magic)();
    RW.burst(card.querySelector('.rw-card'), o.stars == 3 ? 30 : 16);
    if (S.voice) say(o.stars == 3 ? 'Perfect!' : 'You solved it!');
    if (o.grew) setTimeout(() => { if (card.isConnected) growShow(o.before); }, 1200);
    const go = f => () => { card.remove(); f(); };
    if ($('#btnext')) $('#btnext').onclick = go(() => BT.start(run.id, run.band, next));
    $('#btagain').onclick = go(() => BT.start(run.id, run.band, run.level));
    $('#btlvls').onclick = go(() => BT.levels(run.id, run.band));
  },
  fmtSec(s) { return s < 60 ? `${s} sec` : s % 60 ? `${Math.floor(s / 60)} min ${s % 60} sec` : `${s / 60} min`; },
};
