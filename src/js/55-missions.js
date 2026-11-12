/* Daily missions v2 (P5-08). Three missions a day, drawn from a pool that fits the child, the same all day, new at local midnight.
   Saved in S.day.m = [{k, p, d}] (kind, subject path for the kinds that need one, d = 1 when done). S.day is replaced by day() at the
   first call on a new day, so the missions start again then without a migration. A missing or damaged list is drawn again.
   The draw is seeded by the day key, the child's name and grade, and only offers what the child can do right now:
     round    one learning round in the subject that needs the most practice (lowest mastery, else the least played)
     other    a learning round in a different subject
     perfect  a round with every answer right (the subject with the best mastery, to make it fair); grade 1 and up
     more     Pre-K and K, in place of perfect (R-01b: an effort goal, not a "never slip" goal): finish 2 rounds today
     sprint   one Fact Sprint (grade 1 and up, once a set is open: FLU.on(); R-01b, was K and up)
     teaser   solve one Brain Teaser (only when a puzzle type is offered at the child's grade)
     review   do today's review (only when something is due)
     mix      one Mixed Practice round
   "round" is always one of the three; the other two are drawn from what is left. Finishing a mission gives a sticker, once (it is
   marked done first). All three together give the old mission bonus once a day: 5 stars, 5 coins and a sticker (S.day.done).
   Hooks: finish() in 50-round.js (rounds, mixes, reviews), the sprint's finish in 57-fluency.js, BT.finish in 74-teasers.js. */
const MIS = {
  N: 3,
  KINDS: ['round', 'other', 'perfect', 'more', 'sprint', 'teaser', 'review', 'mix'],
  MORE: 2, // rounds today that finish the "more" mission
  BONUS_STARS: 5,
  BONUS_COINS: 5,
  SUBJ: { math: 'Math', read: 'Reading', es: 'Spanish', disc: 'Discover' },
  hash(s) {
    let h = 2166136261;
    s = String(s);
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  },
  // The stop a learning round in subject p starts at: the open stop the map points at (never a boss), or null when none can be played.
  stop(p) {
    const N = NODES[p];
    if (!N || !N.length) return null;
    const ok = j => N[j] && N[j].sk != 'boss' && SK[N[j].sk] && unlocked(p, j);
    const c = curNode(p);
    if (ok(c)) return { p, i: c };
    for (let j = Math.min(c, N.length - 1); j >= 0; j--) if (ok(j)) return { p, i: j };
    return null;
  },
  // Mean accuracy over the stops of a subject tried at least 3 times, or null when there is nothing to go on
  score(p) {
    let t = 0, c = 0;
    for (const n of NODES[p]) {
      if (n.sk == 'boss') continue;
      const r = mastRec(nid(n));
      if (r && r.n >= 3) { t += +r.p || 0; c++; }
    }
    return c ? t / c : null;
  },
  passedN: p => NODES[p].filter((n, i) => passed(p, i)).length,
  // The subjects the child can play a round in, with their score: [{p, i, s, n}]
  subjects() {
    const out = [];
    for (const p of Object.keys(PATHS)) {
      const st = MIS.stop(p);
      if (st) out.push({ p, i: st.i, s: MIS.score(p), n: MIS.passedN(p) });
    }
    return out;
  },
  // What the child can do right now; draw() reads only this
  ctx() {
    const g = gradeOf();
    let bt = false, spr = false, due = 0;
    try { bt = BT.offered().length > 0; } catch (e) {}
    try { spr = FLU.on(); } catch (e) {}
    try { due = dueItems().length; } catch (e) {}
    return { g, subs: MIS.subjects(), bt, spr, due };
  },
  // Pure: three missions [{k, p?, d:0}] for a day key, a child name and a ctx
  draw(dayKey, name, c) {
    const rnd = mulberry32(MIS.hash(['mis', dayKey, name, c.g].join('|')));
    const pickOf = a => a[Math.floor(rnd() * a.length)];
    // weakest first: lowest score (no data counts as 2), then the fewest stops passed, then the draw
    const subs = c.subs.map(s => ({ s, r: rnd() })).sort((a, b) => (a.s.s == null ? 2 : a.s.s) - (b.s.s == null ? 2 : b.s.s) || a.s.n - b.s.n || a.r - b.r).map(x => x.s);
    const first = { k: 'round', p: subs[0].p, d: 0 };
    const rest = [];
    if (subs.length > 1) rest.push({ k: 'other', p: pickOf(subs.slice(1)).p, d: 0 });
    rest.push(c.g <= 0 ? { k: 'more', d: 0 } : { k: 'perfect', p: subs[subs.length - 1].p, d: 0 }, { k: 'mix', d: 0 });
    if (c.spr) rest.push({ k: 'sprint', d: 0 });
    if (c.bt) rest.push({ k: 'teaser', d: 0 });
    if (c.due > 0) rest.push({ k: 'review', d: 0 });
    for (let i = rest.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [rest[i], rest[j]] = [rest[j], rest[i]]; }
    return [first].concat(rest.slice(0, MIS.N - 1)).sort((a, b) => MIS.KINDS.indexOf(a.k) - MIS.KINDS.indexOf(b.k));
  },
  valid(m) {
    return Array.isArray(m) && m.length == MIS.N && new Set(m.map(x => x && x.k)).size == MIS.N &&
      m.every(x => x && MIS.KINDS.includes(x.k) && (x.d === 0 || x.d === 1) && (['round', 'other', 'perfect'].includes(x.k) ? !!NODES[x.p] : true));
  },
  // Today's three missions (drawn on the first call of the day and kept)
  get() {
    const d = day();
    if (!MIS.valid(d.m)) {
      d.m = MIS.draw(today(), S.name || '', MIS.ctx());
      if (d.done) d.m.forEach(x => { x.d = 1; }); // an old save that finished the old mission today: nothing more to earn
      save();
    }
    return d.m;
  },
  count() { try { return MIS.get().filter(x => x.d).length; } catch (e) { return 0; } },
  // Does a finished thing count for mission x? ev: {k:'round', p, mix, test, boss, daily, perfect, n (rounds today)} | {k:'sprint'} | {k:'teaser'}
  hit(x, ev) {
    if (x.k == 'sprint' || x.k == 'teaser') return ev.k == x.k;
    if (ev.k != 'round') return false;
    if (x.k == 'round' || x.k == 'other') return !!ev.p && ev.p === x.p && !ev.mix && !ev.test;
    if (x.k == 'perfect') return !!ev.perfect;
    if (x.k == 'more') return !ev.test && (ev.n | 0) >= MIS.MORE;
    if (x.k == 'mix') return !!ev.mix && !ev.daily;
    if (x.k == 'review') { let n = 1; try { n = dueItems().length; } catch (e) {} return !!ev.daily || (!!ev.mix && n == 0); }
    return false;
  },
  // Something was finished. Marks the missions it completes and gives each one sticker. Returns {won: [{x, st}], bonus: bool}.
  // The bonus (stars and coins) is paid by the caller (finish() adds it to its totals; pay() does it for the other screens).
  done(ev) {
    const out = { won: [], bonus: false };
    try {
      const m = MIS.get(), d = day();
      for (const x of m) if (!x.d && MIS.hit(x, ev)) { x.d = 1; out.won.push({ x, st: award() }); }
      if (out.won.length && m.every(x => x.d) && !d.done) { d.done = true; out.bonus = true; }
    } catch (e) { logErr('missions: ' + e.message); }
    return out;
  },
  // For screens without the treasure chest (sprint, puzzle): pays the bonus and returns the markup of what was won (or '')
  pay(mi) {
    if (!mi.won.length) return '';
    if (mi.bonus) { S.stars += MIS.BONUS_STARS; S.coins += MIS.BONUS_COINS; mi.bst = award(); }
    return MIS.winHTML(mi);
  },
  title(x) {
    const s = MIS.SUBJ[x.p] || 'Math';
    return { round: `Play a ${s} round`, other: `Try a ${s} round`, perfect: 'Get a perfect round', more: `Play ${MIS.MORE} rounds today`, sprint: 'Do a Fact Sprint', teaser: 'Solve a Brain Teaser',
      review: "Do today's review", mix: 'Play Mixed Practice' }[x.k];
  },
  sub(x) {
    return { round: 'Make it stronger!', other: 'Visit another subject!', perfect: 'Every answer right!', more: 'Keep practicing!', sprint: 'Beat your best!', teaser: 'Think hard!',
      review: 'Practice what you learned', mix: 'A bit of everything!' }[x.k];
  },
  icon(x) {
    return { round: UI.SUBJ_ICON[x.p] || 'path-math', other: UI.SUBJ_ICON[x.p] || 'path-math', perfect: 'star', more: 'replay', sprint: 'bolt', teaser: 'puzzle', review: 'replay', mix: 'sparkle' }[x.k];
  },
  // The subject colour class of a mission
  cls(x) { return { round: 's-' + x.p, other: 's-' + x.p, perfect: 's-play', more: 's-play', sprint: 's-math', teaser: 's-bt', review: 's-play', mix: 's-es' }[x.k]; },
  // What the child sees after finishing: one line and one sticker per mission, then the bonus
  winHTML(mi) {
    const row = (icon, text, st, i) => `<li>${ico(icon, 20)}<span>${text}</span>${RW.sticker(st.s, st.isNew, i)}</li>`;
    const rows = mi.won.map((w, i) => row('check', 'Mission done! ' + esc(MIS.title(w.x)), w.st, i)).join('') +
      (mi.bonus && mi.bst ? row('trophy', `All 3 missions! +${MIS.BONUS_STARS} stars, +${MIS.BONUS_COINS} coins`, mi.bst, mi.won.length) : '');
    return `<ul class="mis-win" role="status">${rows}</ul>`;
  },
  // Tapping a mission: straight to it
  go(x) {
    SFX.whoosh();
    if (x.k == 'sprint') {
      const ss = FLU.sets();
      return fluPlay(ss[ss.length - 1].id, 't60');
    }
    if (x.k == 'teaser') {
      const d = BT.dailyInfo();
      return d && !d.done ? BT.start(d.id, d.band, d.level) : BT.hub();
    }
    if (x.k == 'review') return startReview();
    if (x.k == 'mix') return startMix();
    const st = MIS.stop(x.p) || MIS.stop('math');
    if (st) open(st.p, st.i); else startMix();
  },
};

// The missions list on Home: one row per mission (a button, or a tick when done)
function hmMissions() {
  const m = MIS.get();
  const row = (x, i) => {
    const inner = `<span class="hm-mic ${MIS.cls(x)}">${ico(x.d ? 'check' : MIS.icon(x), 28)}</span>` +
      `<span class="hm-mt"><b>${esc(MIS.title(x))}</b><span>${x.d ? 'Done!' : esc(MIS.sub(x))}</span></span>`;
    return x.d
      ? `<div class="hm-mi done" role="group" aria-label="${esc(MIS.title(x))}, done">${inner}<span class="hm-mg">${ico('check-circle', 28)}</span></div>`
      : `<button class="hm-mi" data-mi="${i}">${inner}<span class="hm-mg">${ico('play', 28)}</span></button>`;
  };
  return `<div class="hm-mis" id="hmmis">${m.map(row).join('')}</div>`;
}
function hmMissionsBind() {
  $$('[data-mi]').forEach(b => b.onclick = () => MIS.go(MIS.get()[+b.dataset.mi]));
}
