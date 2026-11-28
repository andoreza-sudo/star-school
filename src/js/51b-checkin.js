/* ---------- CHECK-IN: mastery check-ins and stop badges (gen2; CSS src/css/51b-checkin.css) ----------
   A child who has played a stop enough is offered a short check-in: CHK.Q questions of that stop, mixed kinds (pickQ: never a third
   of one kind in a row, no label twice), no hints and one try each. A stop is one skill level, the hardest level of its skill the child
   has reached there, so every question is that level's: no easier support question, review item or older stop is mixed in.
   CHK.PASS or more right wins the stop's badge (once) and the end card nudges the child on: Next is the next level of the same skill
   when it is open and not passed yet, else the next open stop that is not passed. Fewer is gentle: no stars or coins taken, the
   badge waits, "Keep practicing" and Play again (a normal round of the stop); the check-in comes back after CHK.GAP more first tries.
   When a check-in is offered (CHK.ready): a stop of a map (not a boss, not a side skill such as tracing), passed (1+ stars), no badge
   yet, and its mastery record (51-mastery.js) has CHK.MIN or more first tries at CHK.ACC or better.
   Where: a "Check-in" button by the stop on the map (CHK.mapHTML), and a card on the round's end screen (50-round.js finish).
   Badges show on the map stop (a small medal), in the badge shelf (CHK.shelf: Learn, the sticker book), and per stop in the
   Grown-ups report card (82-report.js, REP.badges).
   Saved data: S.chk = {nid: {n, best, last, at, b?}} (a default {} by id in migrate, 00-core.js; an old save gets it empty):
     n     check-ins taken at this stop        best  most right in one check-in
     last  day number of the last one          at    first tries at the stop (S.mast n) when it ended (the wait after a miss)
     b     day number the badge was won (absent until then)
   Hooks: 50-round.js renderQ calls CHK.show(q) (no Help button), check() gives a check-in question one try with no hint and no
   retry at the end, finish() hands the end to CHK.finish(G); 46-home.js drawMap adds CHK.mapHTML and calls CHK.mapBind. */
const CHK = {
  Q: 5,      // questions in a check-in
  PASS: 4,   // right on the first try to win the badge
  MIN: 12,   // first tries at the stop before one is offered
  ACC: .7,   // first-try accuracy at the stop before one is offered
  GAP: 8,    // more first tries at the stop after a check-in that did not win
  HUE: { math: ['blue', 'yellow'], read: ['pink', 'purple'], es: ['orange', 'red'], disc: ['green', 'yellow'] },
  get() {
    if (!S.chk || typeof S.chk != 'object' || Array.isArray(S.chk)) S.chk = {};
    return S.chk;
  },
  rec: k => (S.chk && typeof S.chk == 'object' && S.chk[k]) || null,
  won: c => !!(c && Number.isInteger(c.b) && c.b > 0), // a badge day (a damaged value is no badge)
  has(k) { return CHK.won(CHK.rec(k)); },
  can: nd => !!(nd && nd.sk != 'boss' && SK[nd.sk] && !SK[nd.sk].side),
  ready(p, i) {
    const nd = NODES[p] && NODES[p][i];
    if (!CHK.can(nd) || !passed(p, i)) return false;
    const k = nid(nd), c = CHK.rec(k), r = mastRec(k);
    if (CHK.won(c)) return false;
    if (!r || !(+r.n >= CHK.MIN && +r.p >= CHK.ACC)) return false; // a damaged record (not numbers) is never ready
    return !(c && Number.isFinite(+c.at) && +r.n - +c.at < CHK.GAP);
  },
  // every stop with a badge, in map order: [{p, i, nd, b}]
  list() {
    const out = [];
    for (const p in NODES) {
      const seen = {};
      NODES[p].forEach((nd, i) => { const k = nid(nd); if (seen[k] || !CHK.can(nd)) return; seen[k] = 1; const c = CHK.rec(k); if (CHK.won(c)) out.push({ p, i, nd, b: c.b }); });
    }
    return out;
  },
  readyList() {
    const out = [];
    for (const p in NODES) NODES[p].forEach((nd, i) => { if (CHK.ready(p, i) && !out.some(x => x.p == p && nid(x.nd) == nid(nd))) out.push({ p, i, nd }); });
    return out;
  },
  // where Next goes after a won check-in: the next level of the same skill (open, not passed), else the next open stop not passed
  nextStop(p, i) {
    const N = NODES[p], h = harder(N[i]);
    const j = h ? N.indexOf(h) : -1;
    if (j >= 0 && unlocked(p, j) && !passed(p, j)) return j;
    for (let k = i + 1; k < N.length; k++) if (unlocked(p, k) && !passed(p, k)) return k;
    return -1;
  },
  // the questions: CHK.Q of the stop's own level, mixed kinds, no label twice (a small stop may repeat one after 6 tries each)
  qs(nd) {
    const out = [], seen = new Set();
    for (let t = 0; out.length < CHK.Q && t < CHK.Q * 6; t++) {
      const q = pickQ(nd.sk, nd.lv);
      G.last = q.label;
      if (seen.has(q.label)) continue;
      seen.add(q.label);
      G.kh.push(q.kind);
      qUse(G, q); // RELB-NOREPEAT: pickQ skips it from now on
      out.push(q);
    }
    while (out.length < CHK.Q) out.push(genQ(nd.sk, nd.lv));
    return out;
  },
  start(p, i) {
    const nd = NODES[p][i];
    if (!CHK.can(nd)) return start(p, i);
    G = newG({ path: p, node: i, sk: nd.sk, lv: nd.lv, chk: true, spk: 1, kh: [] }); // spk: no "Say it!" step in a check-in
    G.pool = CHK.qs(nd);
    G.n = G.pool.length;
    G.kh = [];
    G.last = null;
    next();
  },
  // the sheet before it starts: what it is, Let's go / Not now
  ask(p, i) {
    const nd = NODES[p][i];
    const s = UI.sheet(`<div class="ck-ask s-${p}"><span class="ck-am">${CHK.medal(p, nd, false, 96)}</span><h2>Badge check-in!</h2>` +
      `<p>${esc(nd.t)}</p><p class="ck-rule">${CHK.Q} questions. No hints.</p><p class="ck-rule">Get ${CHK.PASS} right to win a badge!</p>` +
      `<div class="acts">${UI.btn("Let's go!", { kind: 'primary', size: 'lg', wide: true, icon: 'medal', id: 'ckgo' })}${UI.btn('Not now', { kind: 'ghost', wide: true, id: 'ckno' })}</div></div>`);
    s.el.querySelector('#ckno').onclick = () => { SFX.click(); s.close(); };
    s.el.querySelector('#ckgo').onclick = () => { s.close(); SFX.whoosh(); for (const e of document.querySelectorAll('body > .ovl')) e.remove(); CHK.start(p, i); };
    if (S.voice) say(`Get ${CHK.PASS} right to win a badge!`);
    return s;
  },
  // renderQ hook: no Help button, a Check-in tag on the card
  show(q) {
    const hb = $('#hb'), qa = $('.qarea');
    if (hb) hb.remove();
    if (qa && !qa.querySelector('.ck-tag')) qa.insertAdjacentHTML('afterbegin', UI.tag('Badge check-in', 'ck-tag', 'medal'));
  },
  // the end of a check-in (finish() hands it over): save, then the badge card or the gentle one
  finish(g) {
    const p = g.path, i = g.node, nd = NODES[p][i], k = nid(nd), sc = g.score, n = g.n, ok = sc >= CHK.PASS;
    const C = CHK.get(), c = C[k] || (C[k] = { n: 0, best: 0 }), r = mastRec(k), dn = mastDay();
    c.n = (c.n | 0) + 1; c.best = Math.max(c.best | 0, sc); c.last = dn; c.at = r && +r.n >= 0 ? +r.n : 0;
    const won = ok && !CHK.won(c);
    if (won) c.b = dn;
    const coins = sc + (won ? 5 : 0);
    S.coins += coins;
    actRound(); // P5-05: minutes and rounds for the report card
    // audit v195: a check-in is a round of the day, as in finish() (50-round.js): the day's rounds, the streak, the missions
    // P6 (owner 2026-11-24): game time as a round of the stop pays (ptCalc)
    let stk = { msg: '' }, mis = '', gt = 0;
    try {
      const d = day();
      d.r++;
      stk = streakTick();
      const mi = MIS.done({ k: 'round', p, mix: false, test: false, boss: false, daily: false, perfect: sc >= n, n: d.r });
      mis = MIS.pay(mi);
      gt = ptCalc(g, sc, n, 0, getSt(p, i), false, false, nd, { mission: mi.bonus }).sec;
      ptEarn(gt);
    } catch (e) { logErr('check-in round: ' + e.message); } // the badge card never fails over the day's bookkeeping
    save();
    const nx = ok ? CHK.nextStop(p, i) : -1;
    const head = won ? 'You won a badge!' : ok ? 'You did it again!' : 'Good try!';
    const line = ok ? 'You really know this one!' : 'Keep practicing. You will get it soon!';
    const art = ok ? `<div class="ck-hero${won ? ' ck-new' : ''}">${won ? RW.rays() : ''}<span class="ck-big">${CHK.medal(p, nd, true, 132)}</span></div>` : `<div class="ck-hero">${RW.pet()}</div>`;
    view(`<div class="center ck-end s-${p}" id="ckend">${art}<h1 class="rw-h">${esc(head)}</h1><p class="ck-name">${esc(nd.t)}</p>` +
      `<p class="ck-sc"><b>${sc}</b> out of ${n} right</p><p class="ck-line">${esc(line)}</p>` +
      (nx >= 0 ? `<p class="ck-nx">${ico('arrow-right', 22)}<span>Next: ${esc(NODES[p][nx].t)}</span></p>` : '') +
      (coins ? RW.row('coin', 'coin', `+${coins} coins for the pet shop!`) : '') +
      (gt ? RW.row('ticket', 'ticket', `<b>+${fmtT(gt)}</b> You earned game time!`, 'ckgt') : '') + mis +
      (stk.msg ? `<p class="ck-line">${esc(RW.clean(stk.msg))}</p>` : '') +
      `<div class="ck-dock">${NAV.end3({ again: ok ? '' : 'ckagain', next: nx >= 0 ? 'cknext' : '', home: 'ckhome',
        extra: ok ? UI.btn('My badges', { kind: 'subject', p, icon: 'medal', id: 'ckshelf' }) : '' })}</div></div>`);
    if ($('#ckagain')) $('#ckagain').onclick = () => { SFX.whoosh(); start(p, i); };
    if ($('#cknext')) $('#cknext').onclick = () => { SFX.whoosh(); open(p, nx); };
    if ($('#ckshelf')) $('#ckshelf').onclick = () => { SFX.whoosh(); CHK.shelf(() => pathMap(p)); };
    $('#ckhome').onclick = () => { SFX.whoosh(); home(); };
    if (won) {
      SFX.fanfare();
      setTimeout(() => { const h = $('.ck-hero'); if (!h) return; RW.burst(h, 28); SFX.chime(); }, 500);
    } else SFX.pop(2);
    if (S.voice) setTimeout(() => { if ($('#ckend')) say(head + ' ' + line); }, 700);
    return { ok, won, nx };
  },

  // a stop's badge, drawn: ribbon tails, a rim and face in the subject's colours (greys when not won), the skill's icon in the middle
  medal(p, nd, on, size = 64) {
    const c = h => `var(--ill-${h})`, hu = CHK.HUE[p] || CHK.HUE.math, m = on ? hu[0] : 'grey', rb = on ? hu[1] : 'white';
    const rim = on ? c(m + '-2') : c('grey'), face = on ? c(m + '-1') : c('grey-1'), ink = on ? c(m + '-3') : c('grey-2');
    return `<svg class="ck-m${on ? ' on' : ''}" width="${size}" height="${Math.round(size * 72 / 64)}" viewBox="0 0 64 72" aria-hidden="true" focusable="false">` +
      `<path fill="${on ? c(rb + '-2') : c('white-3')}" d="M14 2H28L36.5 33H24.5Z"/><path fill="${on ? c(rb) : c('white-2')}" d="M50 2H36L27.5 33H39.5Z"/>` +
      `<circle cx="33.5" cy="48.5" r="21" fill="var(--drop)"/><circle cx="32" cy="47" r="21" fill="${rim}"/><circle cx="32" cy="47" r="16.5" fill="${face}"/>` +
      `<path fill="none" stroke="${c('white')}" stroke-width="2.6" stroke-linecap="round" opacity=".75" d="M15.6 40.5A17.5 17.5 0 0 1 25.5 30.6"/>` +
      `<use href="#i-${icoSk(nd.sk)}" x="21" y="36" width="22" height="22" style="color:${ink}"/></svg>`;
  },

  // ---- the map: a small medal by a stop with a badge; a Check-in button by a stop that is ready ----
  mapHTML(p, i, x, y, W) {
    const nd = NODES[p][i];
    if (!CHK.can(nd)) return '';
    const L = x > W / 2, sx = L ? x - 66 : x + 66, sy = y - 4; // beside the stop, on the side toward the middle (the label is under it)
    if (CHK.has(nid(nd))) return `<span class="ck-mapm" style="left:${sx}px;top:${sy}px" aria-hidden="true">${CHK.medal(p, nd, true, 48)}</span>`;
    if (CHK.ready(p, i)) return `<button class="btn ck-go s-${p}" data-ck="${i}" style="left:${sx}px;top:${sy}px" aria-label="Badge check-in: ${esc(nd.t)}">${ico('medal', 30)}</button>`;
    return '';
  },
  aria: (p, i) => CHK.can(NODES[p][i]) && CHK.has(nid(NODES[p][i])) ? ', badge won' : '',
  mapBind(p) {
    $$('.ck-go').forEach(b => b.onclick = () => { SFX.pop(2); CHK.ask(p, +b.dataset.ck); });
  },
  // the round's end card (finish in 50-round.js): a message with a Check-in button, when the stop is ready
  offerHTML: () => `<span>Ready for a badge?</span> ${UI.btn('Check-in', { kind: 'primary', size: 'sm', icon: 'medal', id: 'ckoff' })}`,
  offerBind(p, i) {
    const b = $('#ckoff');
    if (b) b.onclick = () => { SFX.click(); CHK.ask(p, i); };
  },

  // ---- the badge shelf: every badge won, by subject, and the stops ready for a check-in ----
  shelf(back) {
    const L = CHK.list(), rd = CHK.readyList().slice(0, 6), AREA = { math: 'Math', read: 'Reading', es: 'Spanish', disc: 'Discover' };
    const tile = x => `<button class="ck-t" data-p="${x.p}" data-i="${x.i}" aria-label="${esc(x.nd.t)}, badge won">${CHK.medal(x.p, x.nd, true, 64)}<b>${esc(x.nd.t)}</b></button>`;
    let h = `<p class="ck-sum">${L.length ? `You have ${L.length} ${L.length == 1 ? 'badge' : 'badges'}!` : 'No badges yet. Play a stop a few times. Then try a check-in!'}</p>`;
    if (rd.length) h += `<h2 class="gx-h">${ico('medal', 26)}<span>Ready for a check-in</span></h2><div class="games">` +
      rd.map(x => GFX.card({ cls: 'ck-rd', attrs: `data-p="${x.p}" data-i="${x.i}"`, p: x.p, icon: 'medal', title: x.nd.t, sub: esc(AREA[x.p] || ''), go: 'play' })).join('') + '</div>';
    for (const p in AREA) {
      const xs = L.filter(x => x.p == p);
      if (xs.length) h += `<h2 class="gx-h">${ico(UI.SUBJ_ICON[p] || 'map', 26)}<span>${AREA[p]}</span></h2><div class="ck-grid">${xs.map(tile).join('')}</div>`;
    }
    view(`<div class="top tbar gx-mtop s-disc">${UI.ibtn('back', 'Back', { size: 'sm', id: 'back' })}<div class="ttl gx-ttl"><span class="gx-tb">${ico('medal', 24)}</span>` +
      `<span>My badges</span></div>${UI.chip('medal', L.length, { aria: 'Badges won' })}</div><div class="scroll gx-list ck-shelf">${h}</div>`);
    NAV.bar('learn');
    $('#back').onclick = () => { SFX.click(); (back || learnHub)(); };
    $$('.ck-rd').forEach(b => b.onclick = () => { SFX.pop(2); CHK.ask(b.dataset.p, +b.dataset.i); });
    $$('.ck-t').forEach(b => b.onclick = () => {
      const nd = NODES[b.dataset.p][+b.dataset.i];
      SFX.pop(3);
      anim(b, 'jump');
      UI.toast(nd.t, 'good', 2000, 'medal');
      if (S.voice) say(nd.t);
    });
  },
};
