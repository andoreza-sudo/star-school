// Screenshots: node tools/shots.js [--fixture=name] <screen...>
// Writes tools/out/<screen>-<W>x<H>.png at 600x960, 1024x600 and 380x780.
// Screens are named entries below. Add one for every new screen (CONTRIBUTING section 7).
const fs = require('fs');
const path = require('path');
const { SIZES, launch, openApp } = require('./lib/browser');

// P4-18: SHOTS_OUT=dir writes elsewhere (before/after sets); SHOTS_SIZES=600x960,380x780 picks sizes. P2-17: SHOTS_SCALE=2 shoots at 2x.
const OUT = process.env.SHOTS_OUT ? path.resolve(process.env.SHOTS_OUT) : path.join(__dirname, 'out');
const SHOT_SIZES = process.env.SHOTS_SIZES ? process.env.SHOTS_SIZES.split(',').map(s => s.split('x').map(Number)) : SIZES;
const KS = require('./kinds-samples');
const BTF = require('./lib/bt-fake');
const ES_FX = require('./lib/es-fx');

// P2-36: a Discover question shown by the real round engine; the item with a picture of the given topic when there is one, else the first of the stop.
// P2-37: lv picks the level (the item is the first of that level and topic, a picture preferred), stop is the index in NODES.disc.
const discQ = (sk, stop, topic, lv = 1) => ({
  run: async p => {
    await p.evaluate(([sk, stop, topic, lv]) => {
      start('disc', stop);
      const B = BANK[sk], ok = it => it.lv == lv && (!topic || it.topic == topic);
      let bi = B.findIndex(it => it.em && ok(it));
      if (bi < 0) bi = Math.max(0, B.findIndex(ok));
      const q = bankRebuild({ id: sk, lv, bi, s: 5 }); q.sk = sk; q.lv = lv;
      G.q = q; renderQ();
    }, [sk, stop, topic, lv]);
  },
});

// P3-01 Brain Teasers: the framework screens with the fake type from tools/lib/bt-fake.js (no real puzzle type exists yet)
const btShot = (fn, solved = 0) => async p => {
  await p.evaluate('(' + BTF.install.toString() + ')()');
  if (solved) await p.evaluate(n => { BT.rec('zzfake', BT.band(), true).stars = [3, 2, 1].slice(0, n); BT.rec('zzfake', BT.band()).lvl = n + 1; S.bt.cur = null; }, solved);
  await p.evaluate(fn);
};

// P3-10 number puzzles: grade g sets the band; level lv is started, then o.moves moves of solve() are tapped, o.wrong taps one
// wrong entry (a balance tips), o.hint presses Hint that many times (the 10 s cooldown is skipped for the shot)
const BTN_TAPS = require('./lib/bt-num');
const numShot = (id, g, lv, o = {}) => ({
  run: async p => {
    await p.evaluate(([id, g, lv]) => { S.grade = g; S.bt = {}; BT.start(id, BT.band(), lv); }, [id, g, lv]);
    await p.waitForSelector('#btstage .bn');
    const sol = await p.evaluate(() => BT.get(S.bt.cur.id).solve(S.bt.cur.puzzle));
    for (const m of sol.slice(0, o.moves || 0)) await BTN_TAPS.move(p, id, m);
    if (o.wrong) await BTN_TAPS.wrong(p, id);
    for (let i = 0; i < (o.hint || 0); i++) {
      await p.evaluate(() => { BT.act.cd = 0; document.querySelector('#bthint').disabled = false; });
      await p.click('#bthint');
    }
    if (o.wait) await p.waitForTimeout(o.wait);
  },
});

// P1-03: a sample question of a new kind shown by the real round engine (a one-question round); taps are clicked afterwards.
const kindShot = (name, taps = []) => ({
  run: async p => {
    await p.evaluate(([src, n]) => { const q = eval(src)()[n]; G = newG({ sk: 'zz_demo', n: 1, pool: [q] }); next(); }, ['(' + KS.make.toString() + ')', name]);
    for (const t of taps) await p.click(t);
  },
});

// P1-08: math 'Even or Odd' (level 1) at question 6, after five first tries that were all right and fast (ok) or all wrong.
const mastDemo = ok => async p => {
  await p.evaluate(ok => {
    start('math', NODES.math.findIndex(n => n.sk == 'eo' && n.lv == 1));
    G.fr = [0, 1, 2, 3, 4].map(() => ({ ok, ms: 2000 }));
    G.done = 5;
    next();
  }, ok);
};

// P5-06 report card: seeds two weeks of activity, mastery in the first stops of math and reading (some mastered, some struggling,
// some practised), Fact Sprint bests and a streak, then opens the card and scrolls to a section (sel).
const reportDemo = (sel, grade) => async p => {
  await p.evaluate(([sel, grade]) => {
    S.name = 'Ava'; if (grade != null) S.grade = grade;
    const n = STRK.idx(today()), k = d => STRK.key(n - d), mins = [0, 12, 9, 0, 15, 6, 20, 8, 0, 14, 10, 5, 18, 11];
    S.log = mins.map((m, i) => ({ d: k(13 - i), sec: m * 60, rounds: m ? Math.ceil(m / 6) : 0, q: m * 2, ok: Math.round(m * 1.6), by: m ? { math: m * 40, read: m * 20 } : {} })).filter(e => e.sec);
    S.mast = {};
    for (const p of ['math', 'read']) mastStops(p).slice(0, 12).forEach((s, j) => {
      S.mast[s.nid] = j < 3 ? { n: 30, p: .95, ms: 5000, d: 3, last: n, md: n - j * 2 - 1 } : j < 5 ? { n: 14, p: .4, ms: 9000, d: 2, last: n, md: -1 }
        : j < 8 ? { n: 14, p: .8, ms: 7000, d: 2, last: n - 1, md: -1 } : { n: 4, p: .5, ms: 7000, d: 1, last: n - 2, md: -1 };
    });
    S.prog = S.prog || {}; S.prog.sub = { lv: 1, r: 3, c: 5, t: 12, miss: { '8 − 3': { n: 2, tot: 4, q: { sk: 'sub', lv: 1, label: '8 − 3' } }, '9 − 4': { n: 1, tot: 2, q: { sk: 'sub', lv: 1, label: '9 − 4' } } } };
    S.flu = { add10: { best: 24, hist: [] }, 'add10-20': { best: 31.5, hist: [] } };
    S.streak = { best: 9, rw: 0, days: { [k(0)]: 1, [k(1)]: 1, [k(2)]: 1, [k(3)]: 1 } };
    report();
    if (sel) document.querySelector(sel).scrollIntoView({ block: 'start' });
  }, [sel, grade]);
};

// Each screen: { fixture, full, run(page) }. run() drives the app via its globals or real taps; full: true takes a full-page shot.
const SCREENS = {
  setup: { fixture: 'fresh', run: async () => {} },
  // P3-01: Home card, hub (empty and with a type), level strip, play frame, win card
  'bt-hub-empty': { run: async p => { await p.evaluate(() => BT.hub()); } },
  'bt-hub': { run: btShot(() => BT.hub(), 2) },
  'bt-levels': { run: btShot(() => BT.levels('zzfake'), 3) },
  'bt-play': { run: async p => { await btShot(() => BT.start('zzfake', BT.band(), 1))(p); await p.click('#bthint'); } },
  'bt-win': { run: async p => { await btShot(() => BT.start('zzfake', BT.band(), 1))(p); await p.evaluate(() => BT.win(BT.act, { mistakes: 0 })); await p.waitForTimeout(900); } },
  // P3-10 number puzzles: the hub with the three types (grade 3), then a band per shot played by real taps (tools/lib/bt-num.js)
  'bt-num-hub': { run: async p => { await p.evaluate(() => { S.grade = 3; BT.hub(); }); } },
  'bt-num-pyr-b': numShot('pyramid', 1, 6, { moves: 1 }),
  'bt-num-pyr-c': numShot('pyramid', 3, 9, { moves: 1, hint: 2 }),
  'bt-num-pyr-d': numShot('pyramid', 5, 11, { wrong: true }),
  'bt-num-bal-a': numShot('balance', 0, 5),
  'bt-num-bal-b': numShot('balance', 1, 7, { moves: 1 }),
  'bt-num-bal-c': numShot('balance', 3, 8, { moves: 1, wrong: true }),
  'bt-num-bal-d': numShot('balance', 5, 10, { hint: 2 }),
  'bt-num-tgt-b': numShot('target', 1, 5, { hint: 2 }),
  'bt-num-tgt-c': numShot('target', 3, 6, { moves: 1 }),
  'bt-num-tgt-d': numShot('target', 5, 2, { moves: 1 }),
  'bt-num-win': numShot('pyramid', 3, 2, { moves: 9, wait: 1600 }),
  home: { run: async p => { await p.evaluate(() => home(true)); } },
  map: { run: async p => { await p.evaluate(() => pathMap('math')); } },
  'map-read': { run: async p => { await p.evaluate(() => pathMap('read')); } },
  'map-es': { run: async p => { await p.evaluate(() => pathMap('es')); } },
  // P2-36 Discover: the Home card, the map, and one question per science stop (the first item with a picture)
  'disc-home': { run: async p => { await p.evaluate(() => home(true)); await p.evaluate(() => document.querySelector('.hm-path[data-p="disc"]').scrollIntoView({ block: 'center' })); } },
  'disc-map': { run: async p => { await p.evaluate(() => pathMap('disc')); } },
  'disc-q-life': discQ('sci_life', 0, 'babies'),
  'disc-q-earth': discQ('sci_earth', 1, null),
  'disc-q-phys': discQ('sci_phys', 2, null),
  // P2-37: the map for a 4th grader (Science Lab), then one question for every new skill and level
  'disc-map-lab': { run: async p => { await p.evaluate(() => { S.grade = 4; pathMap('disc'); }); } },
  'disc-q-geo1': discQ('geo_world', 3, 'continents', 1),
  'disc-q-civ1': discQ('civ', 4, 'helpers', 1),
  'disc-q-life2': discQ('sci_life', 6, 'adapt', 2),
  'disc-q-earth2': discQ('sci_earth', 7, 'planets', 2),
  'disc-q-phys2': discQ('sci_phys', 8, 'machines', 2),
  'disc-q-us1': discQ('geo_us', 9, 'borders', 1),
  'disc-q-geo2': discQ('geo_world', 10, 'grid', 2),
  'disc-q-life3': discQ('sci_life', 12, 'cells', 3),
  'disc-q-earth3': discQ('sci_earth', 13, 'rotrev', 3),
  'disc-q-phys3': discQ('sci_phys', 14, 'waves', 3),
  'disc-q-us2': discQ('geo_us', 15, 'timezones', 2),
  'disc-q-civ2': discQ('civ', 16, 'branches', 2),
  // P1-05: the world strip with a far world picked (shows the "more worlds" button above it)
  'map-worlds': { run: async p => { await p.evaluate(() => pathMap('math', 3)); } },
  // P1-06: setup with a grade tapped (Pre-K), and Grown-ups scrolled to the grade picker
  'setup-grade': { fixture: 'fresh', run: async p => { await p.click('.gr[data-g="-1"]'); await p.evaluate(() => document.querySelector('.gr.sel').scrollIntoView({ block: 'center' })); } },
  'grown-grade': { run: async p => { await p.evaluate(() => { grown(); document.querySelector('.gr.sel').scrollIntoView({ block: 'center' }); }); } },
  question: { run: async p => { await p.evaluate(() => start('math', 0)); } },
  'question-read': { run: async p => { await p.evaluate(() => start('read', 5)); } },
  boss: { run: async p => { await p.evaluate(() => bossIntro('math', NODES.math.findIndex(n => n.sk == 'boss'))); } },
  finish: {
    run: async p => {
      await p.evaluate(() => { start('math', 0); G.score = 9; G.done = G.n; finish(); });
      await p.click('#chest');
      await p.waitForSelector('#btns', { state: 'visible', timeout: 8000 });
      await p.waitForTimeout(3500);
    },
  },
  fluency: { run: async p => { await p.evaluate(() => fluMenu()); } },
  'fluency-modes': { run: async p => { await p.evaluate(() => fluModes('add10')); } },
  sprint: {
    run: async p => {
      await p.evaluate(() => fluPlay('add10', 't60'));
      await p.waitForSelector('.k', { timeout: 4000 });
      await p.evaluate(() => { FL.right = 7; UI.setChip($('#fsc'), 7); });
    },
  },
  'sprint-end': {
    run: async p => {
      await p.evaluate(() => { S.flu = { add10: { best: 9, hist: [[today(), 60, 9]] } }; fluEnd({ set: 'add10', mode: 't60', key: 'add10', timed: true, sec: 60, right: 12, rec: true, earned: 120 }); });
    },
  },
  gameroom: { run: async p => { await p.evaluate(() => gameRoom()); } },
  grown: { run: async p => { await p.evaluate(() => grown()); } },
  shop: { run: async p => { await p.evaluate(() => shop()); } },
  stickers: { run: async p => { await p.evaluate(() => book()); } },
  // P5-04: a 5-day streak with one rest day, then the month grid (and the home flame)
  'streak-home': { run: async p => { await p.evaluate(() => { const T = STRK.idx(today()); S.streak = { days: {}, best: 9, rw: 3 }; [0, 1, 2, 4, 5, 6, 9, 10, 11, 12].forEach(o => { S.streak.days[STRK.key(T - o)] = 1; }); home(true); }); } },
  streak: { run: async p => { await p.evaluate(() => { const T = STRK.idx(today()); S.streak = { days: {}, best: 9, rw: 3 }; [0, 1, 2, 4, 5, 6, 9, 10, 11, 12].forEach(o => { S.streak.days[STRK.key(T - o)] = 1; }); streakCal(0); }); } },


  // ---- P1-03 kinds A (sample questions, see tools/kinds-samples.js) ----
  'kinds-dec': kindShot('dec', ['.k[data-k="0"]', '.k[data-k="."]', '.k[data-k="7"]']),
  'kinds-neg': kindShot('neg', ['.k[data-k="neg"]', '.k[data-k="5"]']),
  'kinds-frac': kindShot('frac', ['.k[data-k="3"]', '.k[data-k="go"]', '.k[data-k="4"]']),
  'kinds-rem': kindShot('rem', ['.k[data-k="9"]', '.k[data-k="go"]']),
  'kinds-mix': kindShot('mix', ['.k[data-k="2"]', '.k[data-k="go"]', '.k[data-k="1"]', '.k[data-k="go"]']),
  'kinds-multi': kindShot('multi', ['.mc[data-i="1"]', '.mc[data-i="3"]']),
  'kinds-order': kindShot('order', ['.ot[data-i="1"]', '.ot[data-i="3"]']),
  'kinds-words': kindShot('words', ['.ot[data-i="2"]', '.ot[data-i="4"]']),

  // ---- P4-02 icons ----
  care: { run: async p => { await p.evaluate(() => care()); } },
  // Icon sheet (DESIGN_SYSTEM 5.1): every icon at 20, 32 and 64 px on white (ink), at 20 and 32 on a colour (white icon,
  // --ic2 set to the fill) and on a tint (brand icon), grouped as P4-02 core, P4-03 utility / chrome / skills. Full-page shot.
  // P4-03: tint row and groups added (the soft second tone has to hold on all three backgrounds).
  icons: {
    full: true,
    run: async p => {
      await p.evaluate(() => {
        const all = Object.keys(ICONS), start = all.indexOf('info'), skill = all.indexOf('skill-count'), chrome = all.indexOf('rocket');
        const groups = [['Core (P4-02, two tones added in P4-03)', all.slice(0, start)], ['Utility (P4-03)', all.slice(start, chrome)],
          ['Chrome and rewards (P4-03)', all.slice(chrome, skill)], ['Skills (P4-03; ICO_SK maps every skill)', all.slice(skill)]];
        const cell = n => `<div class="isc"><div class="isw">${ico(n, 20)}${ico(n, 32)}${ico(n, 64)}</div>` +
          `<div class="isb">${ico(n, 20)}${ico(n, 32)}</div><div class="ist">${ico(n, 20)}${ico(n, 32)}</div><div class="isn">${n}</div></div>`;
        view(`<style>.isg{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;padding:0 8px 8px}
          .ish{font-weight:700;padding:10px 12px 6px;color:var(--ink-2)}
          .isc{background:var(--surface);border-radius:var(--r-chip);overflow:hidden;box-shadow:var(--shadow)}
          .isw,.isb,.ist{display:flex;align-items:center;gap:8px;padding:5px 8px;color:var(--ink)}
          .isb{background:var(--brand);color:var(--surface);--ic2:var(--brand)}
          .ist{background:var(--brand-tint);color:var(--brand);--ic2:var(--brand-tint)}
          .isn{font-size:var(--fs-1);padding:2px 8px 4px;color:var(--ink-2)}
          #app,html,body{height:auto;overflow:visible}</style>
          <div class="top"><div class="title">Icons (${all.length})</div></div>` +
          groups.map(([t, ns]) => `<div class="ish">${t}: ${ns.length}</div><div class="isg">${ns.map(cell).join('')}</div>`).join(''));
      });
    },
  },

  // ---- P4-13 object art ----
  // Art sheet: every drawing in ART at 24, 48 and 96 px, on the page colour and on a coloured fill. Full-page shot.
  art: {
    full: true,
    run: async p => {
      await p.evaluate(() => {
        const sizes = [24, 48, 96];
        const row = n => sizes.map(s => picArt(n, s)).join('');
        const cells = Object.keys(ART).map(n => `<div class="asc"><div class="asw">${row(n)}</div>` +
          `<div class="asb">${row(n)}</div><div class="asn">${n}</div></div>`).join('');
        view(`<style>.asg{display:grid;grid-template-columns:repeat(auto-fill,minmax(176px,1fr));gap:8px;padding:8px}
          .asc{background:var(--surface);border-radius:var(--r-chip);overflow:hidden;box-shadow:var(--shadow)}
          .asw,.asb{display:flex;align-items:center;gap:8px;padding:6px 8px}
          .asb{background:var(--brand-tint)}
          .asn{font-size:var(--fs-1);padding:2px 8px 4px;color:var(--ink-2)}
          #app,html,body{height:auto;overflow:visible}</style>
          <div class="top"><div class="title">Art (${Object.keys(ART).length})</div></div><div class="asg">${cells}</div>`);
      });
    },
  },

  // A picture-word question (skill 'pic') showing a drawing instead of an emoji.
  'art-question': { run: async p => { await p.evaluate(() => { start('read', NODES.read.findIndex(n => n.sk == 'pic')); }); } },

  // ---- P1-09 content bank: demo skills are added by hand (they are not on a map) ----
  'bank-passage': { run: async p => { await bankDemo(p, 'passdemo'); } },
  'bank-passage-closed': { run: async p => { await bankDemo(p, 'passdemo'); await p.click('.bctx-h'); } },
  'bank-choice': { run: async p => { await bankDemo(p, 'bankdemo', 0); } },
  'bank-tap': { run: async p => { await bankDemo(p, 'bankdemo', 2); } },
  'bank-spell': { run: async p => { await bankDemo(p, 'bankdemo', 3); } },

  // ---- P1-04 kinds B: sample questions shown by the real round engine (start, put the sample in G.q, renderQ) ----
  'kb-match': { run: p => kbShow(p, 'match') },
  'kb-match-half': { run: async p => { await kbShow(p, 'match'); await p.evaluate(() => { $$('.mb')[0].click(); $$('.mb[data-s="R"]')[2].click(); $$('.mb')[1].click(); }); } },
  'kb-tap-word': { run: p => kbShow(p, 'tapWord') },
  'kb-tap-line': { run: p => kbShow(p, 'tapLine') },
  'kb-spell': { run: async p => { await kbShow(p, 'spell'); await p.evaluate(() => { $$('.sk')[10].click(); $$('.sk')[0].click(); }); } },
  'kb-spell-es': { run: p => kbShow(p, 'spellEs') },

  // ---- P1-10 math visuals ----
  // Sheet: every VIZ visual with typical and edge inputs, plus the tap states (sel, right, wrong, faded). Full page.
  viz: {
    full: true,
    run: async p => {
      await p.evaluate(() => {
        const items = [
          ['tenFrame(7)', VIZ.tenFrame(7)],
          ['tenFrame(3, 5)', VIZ.tenFrame(3, 5)],
          ['tenFrame(16, 20, {b:6, fade:2})', VIZ.tenFrame(16, 20, { b: 6, fade: 2 })],
          ['base10(47)', VIZ.base10(47)],
          ['base10(999)', VIZ.base10(999)],
          ['base10(305)', VIZ.base10(305)],
          ['numLine({max:20, marks:[13], hide:[10]})', VIZ.numLine({ max: 20, marks: [13], hide: [10] })],
          ['numLine({min:-5, max:5, tapValues}) states', VIZ.numLine({ min: -5, max: 5, tapValues: [-4, -2, 0, 2, 4] })],
          ['numLine({max:1, step:.25, den:4})', VIZ.numLine({ max: 1, step: 0.25, den: 4, marks: [0.75] })],
          ['numLine({max:100, step:10})', VIZ.numLine({ max: 100, step: 10, hide: [60] })],
          ['fracBar(3, 4, {unit:true})', VIZ.fracBar(3, 4, { unit: true })],
          ['fracBar(5, 4)', VIZ.fracBar(5, 4)],
          ['fracBar(0, 6, {tap:true}) states', VIZ.fracBar(0, 6, { tap: true })],
          ['fracCircle(3, 8)', VIZ.fracCircle(3, 8)],
          ['fracCircle(7, 4)', VIZ.fracCircle(7, 4)],
          ['fracCircle(0, 3, {tap:true}) states', VIZ.fracCircle(0, 3, { tap: true })],
          ['clock(3, 0)', VIZ.clock(3, 0)],
          ['clock(10, 45)', VIZ.clock(10, 45)],
          ['array(3, 4)', VIZ.array(3, 4)],
          ['array(10, 10)', VIZ.array(10, 10)],
          ["dots(8, 'row')", VIZ.dots(8, 'row')],
          ["dots(14, 'ten')", VIZ.dots(14, 'ten')],
          ["dots(9, 'dice')", VIZ.dots(9, 'dice')],
          ["dots(17, 'scatter', {seed:2, b:5})", VIZ.dots(17, 'scatter', { seed: 2, b: 5 })],
          // part 2 (P1-11)
          ['numLine({max:10, hops:[[0,3],[3,7],[7,10,"?"]]})', VIZ.numLine({ max: 10, hops: [[0, 3], [3, 7], [7, 10, '?']] })],
          ['numLine({max:20, hops:[[14,9]], marks:[9]})', VIZ.numLine({ max: 20, hops: [[14, 9]], marks: [9] })],
          ["ruler(7, 'cm', 'pencil')", VIZ.ruler(7, 'cm', 'pencil')],
          ["ruler(3.5, 'in')", VIZ.ruler(3.5, 'in')],
          ['barGraph(pets, 1)', VIZ.barGraph([['Cat', 4], ['Dog', 7], ['Fish', 3], ['Bird', 5]], 1)],
          ['barGraph(days, 5, {vals}) set 2', VIZ.barGraph([['Mon', 20], ['Tue', 35, 2], ['Wed', 15]], 5, { vals: true })],
          ['barGraph({tap}) states', VIZ.barGraph([['A', 2], ['B', 5], ['C', 3], ['D', 4], ['E', 1], ['F', 6]], 1, { tap: true })],
          ['pictograph(per 2)', VIZ.pictograph([['Red', 4], ['Blue', 6.5], ['Green', 3]], { per: 2 })],
          ['linePlot(values)', VIZ.linePlot([1, 2, 2, 3, 3, 3, 5, 5])],
          ['linePlot(den 4)', VIZ.linePlot([0.25, 0.5, 0.5, 0.75, 1, 1, 1.25], { min: 0, max: 1.5, step: 0.25, den: 4 })],
          ...['circle', 'oval', 'square', 'rectangle', 'triangle', 'rhombus', 'trapezoid', 'pentagon', 'hexagon', 'octagon'].map(n => ["shape('" + n + "')", VIZ.shape(n, n == 'triangle' ? { rot: 20, st: 1.3, dots: true } : {})]),
          ...['cube', 'prism', 'cylinder', 'cone', 'sphere'].map((n, i) => ["shape('" + n + "')", VIZ.shape(n, { c: i % 2 ? 2 : 1 })]),
          ['areaGrid(5, 3, {n:8})', VIZ.areaGrid(5, 3, { n: 8 })],
          ['areaGrid(8, 6)', VIZ.areaGrid(8, 6)],
          ["rectSides(8, 5, {w:8, h:'?'}, {unit:'cm'})", VIZ.rectSides(8, 5, { w: 8, h: '?' }, { unit: 'cm' })],
          ['rectSides(6, 4, all)', VIZ.rectSides(6, 4, { w: 6, h: 4 }, { all: true })],
          ["angle(60, {label:'?'})", VIZ.angle(60, { label: '?' })],
          ['angle(90, {rot:20})', VIZ.angle(90, { rot: 20 })],
          ['angle(130, {proto})', VIZ.angle(130, { proto: true })],
          ['coordGrid({points})', VIZ.coordGrid({ points: [[2, 3, 'A'], [4, 1, 'B']] })],
          ['coordGrid({quadrants:4, join})', VIZ.coordGrid({ quadrants: 4, max: 5, points: [[-2, 3, 'A'], [4, -1], [-3, -4]], join: true, close: true })],
          ['coordGrid({tapPts}) states', VIZ.coordGrid({ tapPts: [[1, 2], [2, 1], [4, 3], [3, 4]] })],
          ['balance(5, 3)', VIZ.balance(5, 3)],
          ['balance({n:3, q}, 7)', VIZ.balance({ n: 3, q: true }, 7)],
          ['balance(14, 14)', VIZ.balance(14, 14)],
          ['coinSVG([25,10,5,1])', VIZ.coinSVG([25, 10, 5, 1])],
          ['coinSVG([500,100,100])', VIZ.coinSVG([500, 100, 100])],
          ['tally(13)', VIZ.tally(13)],
          ['tableInOut', VIZ.tableInOut([[1, 3], [2, 5], [3, '?'], ['?', 9]])],
        ];
        const cells = items.map(([t, s]) => `<div class="vzc"><div class="vzn">${t} <i>${s.length} B</i></div>${s}</div>`).join('');
        view(`<style>.vzg{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:8px;padding:8px}
          .vzc{background:var(--surface);border-radius:var(--r-chip);padding:8px;box-shadow:var(--shadow)}
          .vzn{font-size:var(--fs-1);color:var(--ink-2);margin-bottom:6px}
          #app,html,body{height:auto;overflow:visible}</style>
          <div class="top"><div class="title">Math visuals</div></div><div class="vzg">${cells}</div>`);
        // tap states as the tap kind will set them
        const st = (sel, cls) => { const e = document.querySelectorAll(sel); [['sel', 0], ['right', 1], ['wrong', 2], ['vx', 3]].forEach(([c, i]) => e[i] && cls.includes(c) && e[i].classList.add(c)); };
        const all = ['sel', 'right', 'wrong', 'vx'];
        st('.viz-nl.vi .vt', all);
        st('.viz-fb.vi .vt', all);
        st('.viz-fc.vi .vt', ['sel', 'right']);
        st('.viz-bar.vi .vt', all);
        st('.viz-grid.vi .vt', ['sel', 'right', 'wrong']);
      });
    },
  },
  // A visual inside a real question prompt (fit() and --k apply), with the number pad.
  'viz-q': {
    run: async p => {
      await p.evaluate(() => {
        start('math', 0);
        G.q = { kind: 'num', html: VIZ.tenFrame(8) + '<div class="sub">How many?</div>' + SLOT, ans: '8', say: 'How many?', label: 'viz 8', hint: { k: 'text', s: 'Count the dots.' } };
        renderQ();
      });
    },
  },
  // P1-07 placement quiz "Find my level": the Home card for a new child, the intro, a question (dots), the result, Grown-ups row
  'place-home': { fixture: 'fresh', run: async p => { await p.evaluate(() => { S.name = 'Ava'; setGrade(1); home(); }); } },
  'review-due': { fixture: 'tricky', run: async p => { await p.evaluate(() => home(true)); } },
  'review-none': { fixture: 'midway', run: async p => { await p.evaluate(() => { S.rev = []; home(true); }); } },
  'place-intro': { run: async p => { await p.evaluate(() => placeIntro('math', 'home')); } },
  'place-q': { run: async p => { await p.evaluate(() => { placeStart('math', 'home', 7); PL.qi = 1; placeQ(); }); } },
  'place-done': { run: async p => { await p.evaluate(() => { placeStart('read', 'home', 7); PL.st = PLACE.step(PLACE.step(PL.st, 4), 1); placeDone(); }); } },
  'place-grown': {
    run: async p => {
      await p.evaluate(() => { placeApply('math', PLACE.sim(PATHS.math.worlds, gradeOf(), 7, wi => wi < 2)); grown(); document.querySelector('.pl-grown').scrollIntoView({ block: 'center' }); });
    },
  },

  // P1-08 mastery: question 6 of a round whose first five were right and fast (a Challenge question from the next harder stop,
  // tag on top), and of one whose first five were wrong (support: the hint shows before the first try)
  challenge: { run: mastDemo(true) },
  support: { run: mastDemo(false) },

  // P5-06 grown-ups report card: with data (top, topics, needs practice), a brand-new child, and the maxed save with data
  'report-top': { run: reportDemo(null, 1) },
  'report-topics': { run: reportDemo('#rp-top', 1) },
  'report-needs': { run: reportDemo('#rp-needs', 1) },
  'report-fresh': { fixture: 'fresh', run: async p => { await p.evaluate(() => { S.name = 'Ava'; report(); }); } },
  'report-maxed': { fixture: 'maxed', run: reportDemo('#rp-level', 3) },
  // P2-05 Multiply Mountain: the world map, then one question of each new level (m5-<skill><level>), grade 3.
  'm5-map': { run: async p => { await p.evaluate(() => { S.grade = 3; pathMap('math', PATHS.math.worlds.findIndex(w => w.id === 'm_mult')); }); } },
  'm5-arr2-swap': { run: async p => { await p.evaluate(() => {
    S.grade = 3; start('math', NODES.math.findIndex(n => n.sk == 'arr'));
    let q; for (let i = 1; i < 400; i++) { q = genQ('arr', 2, i); if (q.kind == 'num') break; }
    G.q = q; renderQ(); }); } },
  ...Object.fromEntries([['arr', 2, /veq|<svg/], ['mfact', 1, /veq/], ['mfact', 2, /eq/], ['mfact', 3, /veq/], ['mfact', 4, /\? ×|× \?/], ['dfact', 1, /eq/],
    ['dfact', 2, /eq/], ['dfact', 3, /eq/], ['dfact', 4, /\? ÷|÷ \?/], ['mbig', 1, /veq/], ['story', 5, /story/]].map(([sk, lv, want]) =>
    ['m5-' + sk + lv, { run: async p => {
      await p.evaluate(([sk, lv, want]) => {
        S.grade = 3; S.name = 'Ava'; S.buddy = 'Ben';
        start('math', NODES.math.findIndex(n => n.sk == sk && n.lv == lv));
        let q; for (let i = 1; i < 400; i++) { q = genQ(sk, lv, i); if (new RegExp(want).test(q.label + ' ' + q.html)) break; }
        G.q = q; renderQ();
      }, [sk, lv, want.source]);
    } }])),

  // P2-01 Tiny Town (Pre-K math): the map, and one question of each of the 9 stops (seed 11) as a Pre-K child; tiny-hint opens Help
  'tiny-map': { fixture: 'fresh', run: async p => { await p.evaluate(() => { S.name = 'Ava'; setGrade(-1); home(); }); await p.click('.game[data-p="math"]'); } },
  'tiny-count1': { fixture: 'fresh', run: tinyShot('pk_count', 1) },
  'tiny-shape1': { fixture: 'fresh', run: tinyShot('shape', 1) },
  'tiny-num1': { fixture: 'fresh', run: tinyShot('pk_num', 1) },
  'tiny-sort1': { fixture: 'fresh', run: tinyShot('sort', 1) },
  'tiny-more1': { fixture: 'fresh', run: tinyShot('pk_more', 1) },
  'tiny-count2': { fixture: 'fresh', run: tinyShot('pk_count', 2) },
  'tiny-pat1': { fixture: 'fresh', run: tinyShot('pat', 1) },
  'tiny-num2': { fixture: 'fresh', run: tinyShot('pk_num', 2) },
  'tiny-sort2': { fixture: 'fresh', run: tinyShot('sort', 2) },
  'tiny-hint': { fixture: 'fresh', run: tinyShot('pk_count', 2, true) },
  'tiny-notext': { fixture: 'fresh', run: tinyShot('pk_num', 2, false, true) },
  // P2-19 spelling: one seeded question of each level in a one-question round; the 'hint' shot also opens the hint
  ...Object.fromEntries([1, 2, 3, 4, 5, 6, 7].map(lv => ['spell-' + lv, { run: spellShot(lv, false) }])),
  'spell-hint': { run: spellShot(7, true) },
  'spell-pic': { run: spellShot(3, false, true) }, // a word that has a picture
  // P2-30 Spanish framework: level 3 (spell niño, accent row) and the no-Spanish-voice listen question (word shown big, note, no speaker)
  'es-spell': { run: async p => { const s = await p.evaluate(`(${ES_FX.install})(['es-MX'])`); await p.evaluate(s => { G = newG({ sk: 'es_tst', lv: 3, n: 1, pool: [genQ('es_tst', 3, s)] }); next(); }, s); } },
  'es-novoice': { run: async p => { await p.evaluate(`(${ES_FX.install})(['en-US'])`); await p.evaluate(() => { G = newG({ sk: 'es_animal', lv: 1, n: 1, pool: [genQ('es_animal', 1, 7)] }); next(); }); } },
  // P2-34 Las Frases: the world map and one seeded question per skill and level (the sentence ones after a first tile is placed)
  'es-frases-map': { run: async p => { await p.evaluate(() => { S.unlockAll = true; pathMap('es', NODES.es.findIndex(n => n.wid === 'e_frases')); }); } },
  ...Object.fromEntries([['phrase', 1, 3], ['phrase', 2, 4], ['art', 1, 5], ['art', 2, 6], ['art', 2, 9], ['ser', 1, 4], ['ser', 2, 5], ['ser', 3, 6], ['gusta', 1, 3], ['gusta', 2, 4], ['sent', 1, 5], ['sent', 2, 6]].map(([u, lv, sd]) =>
    ['es-frases-' + u + lv + (u === 'art' && sd === 9 ? 'b' : ''), { run: async p => { await p.evaluate(([u, lv, sd]) => { G = newG({ sk: 'es_' + u, lv, n: 1, pool: [genQ('es_' + u, lv, sd)] }); next(); }, [u, lv, sd]); } }])),
  // P2-33 La Ciudad: the map opened on the world, and one seeded question per unit and level (cap:1 shows the English under the picture)
  'es-ciudad-map': { run: async p => { await p.evaluate(() => { S.unlockAll = true; pathMap('es', NODES.es.findIndex(n => n.wid === 'e_ciudad')); }); } },
  ...Object.fromEntries([['place', 1], ['place', 2], ['trans', 1], ['verb', 1], ['verb', 2], ['adj', 1], ['adj', 2]].map(([u, lv]) =>
    ['es-ciudad-' + u + lv, { run: async p => { await p.evaluate(([u, lv]) => { G = newG({ sk: 'es_' + u, lv, n: 1, pool: [genQ('es_' + u, lv, 5)] }); next(); }, [u, lv]); } }])),
  // P2-32 El Tiempo: one question of each new unit (seeds fixed); 'es-tiempo-map' shows the world
  ...Object.fromEntries([['days', 1, 5], ['days', 2, 6], ['months', 1, 7], ['weather', 1, 8], ['weather', 2, 9], ['big', 1, 3], ['big', 2, 4], ['time', 1, 2], ['time', 2, 11]].map(([u, lv, sd]) => ['es-tiempo-' + u + lv,
    { run: async p => { await p.evaluate(([u, lv, sd]) => { G = newG({ sk: 'es_' + u, lv, n: 1, pool: [genQ('es_' + u, lv, sd)] }); next(); }, [u, lv, sd]); } }])),
  // P2-31 La Casa: the world map, a listen question (house), a spell question with the accent row (baño), a clothes read question, a feelings listen question
  'es-casa-map': { run: async p => { await p.evaluate(() => { NODES.es.forEach((x, i) => { if (x.wi < 3) setSt('es', i, 3); }); pathMap('es', 3); }); } },
  'es-casa-l1': { run: async p => { await p.evaluate(() => { G = newG({ sk: 'es_house', lv: 1, n: 1, pool: [genQ('es_house', 1, 5)] }); next(); }); } },
  'es-casa-l3': { run: async p => { await p.evaluate(() => { let q; for (let s = 1; s < 400; s++) { q = genQ('es_house', 3, s); if (q.word === 'baño') break; } G = newG({ sk: 'es_house', lv: 3, n: 1, pool: [q] }); next(); }); } },
  'es-casa-clothes': { run: async p => { await p.evaluate(() => { G = newG({ sk: 'es_clothes', lv: 2, n: 1, pool: [genQ('es_clothes', 2, 8)] }); next(); }); } },
  'es-casa-feel': { run: async p => { await p.evaluate(() => { G = newG({ sk: 'es_feel', lv: 1, n: 1, pool: [genQ('es_feel', 1, 3)] }); next(); }); } },
  // P2-15 ABC Beach: one question per new level (seeds fixed so the picture is the same every run)
  'abc-1': { fixture: 'fresh', run: abcShot('abc', 1, 11) },
  'abc-2': { fixture: 'fresh', run: abcShot('abc', 2, 12) },
  'abc-3': { fixture: 'fresh', run: abcShot('abc', 3, 13) },
  'abc-4a': { fixture: 'fresh', run: abcShot('abc', 4, 14, 'choice') },
  'abc-4b': { fixture: 'fresh', run: abcShot('abc', 4, 15, 'build') },
  'syl-1': { fixture: 'fresh', run: abcShot('syl', 1, 16) },
  'syl-2': { fixture: 'fresh', run: abcShot('syl', 2, 17) },
  'sound-3': { fixture: 'fresh', run: abcShot('sound', 3, 18) },
  'sound-4': { fixture: 'fresh', run: abcShot('sound', 4, 19) },

  // P2-01 Tiny Town (Pre-K math): the map, and one question of each of the 9 stops (seed 11) as a Pre-K child; tiny-hint opens Help
  'tiny-map': { fixture: 'fresh', run: async p => { await p.evaluate(() => { S.name = 'Ava'; setGrade(-1); home(); }); await p.click('.game[data-p="math"]'); } },
  'tiny-count1': { fixture: 'fresh', run: tinyShot('pk_count', 1) },
  'tiny-shape1': { fixture: 'fresh', run: tinyShot('shape', 1) },
  'tiny-num1': { fixture: 'fresh', run: tinyShot('pk_num', 1) },
  'tiny-sort1': { fixture: 'fresh', run: tinyShot('sort', 1) },
  'tiny-more1': { fixture: 'fresh', run: tinyShot('pk_more', 1) },
  'tiny-count2': { fixture: 'fresh', run: tinyShot('pk_count', 2) },
  'tiny-pat1': { fixture: 'fresh', run: tinyShot('pat', 1) },
  'tiny-num2': { fixture: 'fresh', run: tinyShot('pk_num', 2) },
  'tiny-sort2': { fixture: 'fresh', run: tinyShot('sort', 2) },
  'tiny-hint': { fixture: 'fresh', run: tinyShot('pk_count', 2, true) },
  'tiny-notext': { fixture: 'fresh', run: tinyShot('pk_num', 2, false, true) },
  // ---- P2-18 phonics 1st-2nd: one question per new level through the real round engine ----
  'phon-sight4': { run: phonShot('sight', 4) },
  'phon-sight5': { run: phonShot('sight', 5) },
  'phon-pic5': { run: phonShot('pic', 5) },
  'phon-pic6': { run: phonShot('pic', 6) },
  'phon-build5': { run: phonShot('build', 5) },
  'phon-build6': { run: phonShot('build', 6) },
  'phon-hint': { run: phonShot('pic', 5, true) },
  // P2-03 Clock Tower (1st grade gaps): the map, and one seeded question of each new stop through the real round engine; -hint opens Help.
  'clock-time1': { run: clockShot('time', 1, 21) },
  'clock-time2': { run: clockShot('time', 2, 22) },
  'clock-time3': { run: clockShot('time', 3, 23) },
  'clock-pv1a': { run: clockShot('pv', 1, 50) },
  'clock-pv1b': { run: clockShot('pv', 1, 54) },
  'clock-pv1c': { run: clockShot('pv', 1, 33) },
  'clock-add5': { run: clockShot('add', 5, 34) },
  'clock-add6': { run: clockShot('add', 6, 35) },
  'clock-meas2': { run: clockShot('meas', 2, 36) },
  'clock-data1a': { run: clockShot('data', 1, 62) },
  'clock-data1b': { run: clockShot('data', 1, 60) },
  'clock-shape4a': { run: clockShot('shape', 4, 72) },
  'clock-shape4b': { run: clockShot('shape', 4, 70) },
  'clock-frac1a': { run: clockShot('frac', 1, 90) },
  'clock-frac1b': { run: clockShot('frac', 1, 102) },
  'clock-hint-meas2': { run: clockShot('meas', 2, 36, true) },
  'clock-hint-shape4': { run: clockShot('shape', 4, 72, true) },
  // P2-04 Treasure Bay (2nd grade gaps): the map, and one seeded question of the new stops through the real round engine; -hint opens Help.
  'bay-map': { run: async p => { await p.evaluate(() => { S.grade = 2; pathMap('math', PATHS.math.worlds.findIndex(w => w.id === 'm_bay')); }); } },
  'bay-pv2a': { run: bayShot('pv', 2, 3) },
  'bay-pv2b': { run: bayShot('pv', 2, 4) },
  'bay-pv3': { run: bayShot('pv', 3, 8) },
  'bay-big5': { run: bayShot('big', 5, 12, true) },
  'bay-time4': { run: bayShot('time', 4, 14) },
  'bay-coins4': { run: bayShot('coins', 4, 6) },
  'bay-coins5': { run: bayShot('coins', 5, 7) },
  'bay-meas3': { run: bayShot('meas', 3, 9) },
  'bay-data2': { run: bayShot('data', 2, 11) },
  'bay-arr1': { run: bayShot('arr', 1, 5) },
  'bay-story4': { run: bayShot('story', 4, 13, true) },
  'bay-pat3': { run: bayShot('pat', 3, 2) },
  // ---- P4-05 pet rig ----
  // Pet sheet: every stage x mood, the hat/toy anchors with their 64-grid boxes (P4-07), today's emoji wearables,
  // the jump/sad reaction faces, small sizes and a dark scene, for all four pets (P4-06). Full-page shot. 'pets-home' / 'pets-care': the dragon in place.
  pets: { full: true, run: async p => { await p.evaluate(petSheet); } },
  'pets-home': { run: async p => { await p.evaluate(() => { S.care = { food: 90, clean: 90, fun: 90, t: Date.now(), gift: '' }; home(true); }); } },
  'pets-care': { run: async p => { await p.evaluate(() => { S.care = { food: 12, clean: 60, fun: 60, t: Date.now(), gift: '' }; care(); }); } },
  // P4-06: Home and Pet Care with each of the other pets (midway save: 85 stars = kid, top hat and balloon)
  ...Object.fromEntries(['dino', 'bird', 'ocean'].flatMap(k => [
    ['pets-home-' + k, { run: async p => { await p.evaluate(k => { S.pet = k; S.care = { food: 90, clean: 90, fun: 90, t: Date.now(), gift: '' }; home(true); }, k); } }],
    ['pets-care-' + k, { run: async p => { await p.evaluate(k => { S.pet = k; S.care = { food: 12, clean: 60, fun: 60, t: Date.now(), gift: '' }; care(); }, k); } }]])),
  // ---- P4-04 components ----
  // Component sheet (DESIGN_SYSTEM 4): every component and state, full page. The page also checks itself (compCheck below):
  // overflow, labels broken mid-word, targets under 48 px, horizontal scroll; each problem is a console error, so the shot fails.
  components: { full: true, run: p => compSheet(p) },
  // The live sheet (modal) and toast over Home, to see the real fixed position, backdrop and slide.
  'comp-sheet': { run: p => compLive(p, 'sheet') },
  'comp-toast': { run: p => compLive(p, 'toast') },
  // ---- P4-11 rewards: the finish screen through the real finish() (rwShot below), boss intro / fight / win / lose, test out ----
  // fin-3 .. fin-0: stars earned (fin-3 shows the open chest); fin-chest: before the tap; fin-world: last stop of a world;
  // fin-grow: the pet grows (overlay); boss-*: world 3's boss (its prize is not owned yet); rewards: the art sheet (all sizes of
  // the chest, stars, bosses and their hit poses, stickers and prize badges).
  'fin-3': { run: rwShot({ stars: 3 }) },
  'fin-2': { run: rwShot({ stars: 2 }) },
  'fin-1': { run: rwShot({ stars: 1 }) },
  'fin-0': { run: rwShot({ stars: 0 }) },
  'fin-chest': { run: rwShot({ stars: 3, tap: false }) },
  'fin-world': { run: rwShot({ stars: 3, world: true }) },
  'fin-grow': { run: rwShot({ stars: 3, grow: true }) },
  'fin-mix': { run: rwShot({ stars: 3, mix: true }) },
  'boss-intro': { run: async p => { await p.evaluate(() => bossIntro('math', NODES.math.indexOf(NODES.math.filter(n => n.sk == 'boss')[2]))); } },
  'boss-fight': { run: rwBossFight },
  'boss-win': { run: rwShot({ boss: 2, won: true }) },
  'boss-lose': { run: rwShot({ boss: 2, won: false }) },
  testout: { run: async p => { await p.evaluate(() => testOut('math', 2)); } },
  rewards: { full: true, run: async p => { await p.evaluate(rwSheet); } },
  // ---- P2-24 sentences (sent 3-5): the Space Station map at its new last stop, then one question of each type through the round engine ----
  'sent-map': { run: async p => { await p.evaluate(() => { S.grade = 2; pathMap('read', PATHS.read.worlds.findIndex(w => w.id === 'r_space')); }); } },
  'sent3': { run: sentShot(3, 'order') },
  'sent3-hint': { run: sentShot(3, 'order', true) },
  'sent4': { run: sentShot(4, 'choice') },
  'sent5-pic': { run: sentShot(5, 'choice') },
  'sent5-story': { run: sentShot(5, 'order') },
  // P2-25 comprehension (2nd grade): the Word Workshop map with the two new stops, and one question of a story and of a passage about
  // the world through the real round engine (the passage panel open); story-hint opens Help, story-closed hides the panel.
  'story-map': { run: async p => { await p.evaluate(() => { S.grade = 2; pathMap('read', PATHS.read.worlds.findIndex(w => w.id === 'r_workshop')); }); } },
  'story-comp': { run: compShot('comp', 3, 'g2f02', 2) },
  'story-info': { run: compShot('info', 1, 'g2n01', 1) },
  'story-hint': { run: compShot('comp', 3, 'g2f01', 1, 'hint') },
  'story-closed': { run: compShot('comp', 3, 'g2f05', 3, 'closed') },
  // P2-28 (5th grade): the longest passages with the question line (a compare question) and the panel open
  'story5-comp': { run: compShot('comp', 6, 'g5f04', 1, undefined, 5) },
  'story5-info': { run: compShot('info', 4, 'g5n02', 1, undefined, 5) },
  // P2-26 (3rd grade): a story and a passage with the panel open and the widest choices
  'story3-comp': { run: compShot('comp', 4, 'g3f03', 3, null, 3) },
  'story3-info': { run: compShot('info', 2, 'g3n04', 2, null, 3) },
  // P2-29 grade 6 (230-300 words): the longest story and a passage with the panel open, 380x780 is the one to look at
  'story6-comp': { run: compShot('comp', 7, 'g6f04', 2, null, 6) },
  'story6-info': { run: compShot('info', 5, 'g6n01', 4, null, 6) },
  // P2-27 (4th grade): the longest story and a nonfiction passage with the panel open, at the question that is read with the most text above it
  'story4-comp': { run: compShot('comp', 5, 'g4f03', 2, null, 4) },
  'story4-info': { run: compShot('info', 3, 'g4n03', 2, null, 4) },
  // ---- P2-22 vocabulary A: one question per level (a fixed seed; level 1 and 2 pick one with a picture); vocab-hint opens Help ----
  ...Object.fromEntries([1, 2, 3, 4, 5].map(lv => ['vocab-' + lv, { run: vocabShot(lv) }])),
  // P2-23 vocabulary B: levels 6-10 (no pictures; level 7 shows the bold word)
  ...Object.fromEntries([6, 7, 8, 9, 10].map(lv => ['vocab-' + lv, { run: vocabShot(lv) }])),
  'vocab-nopic': { run: vocabShot(1, false, false) },
  'vocab-hint': { run: vocabShot(3, true) },
  // P2-20/21 grammar: one seeded question of each level 1-9 in a one-question round (level 1 tap-a-word is 'gram-1b'); 'gram-hint' opens a hint
  ...Object.fromEntries([1, 2, 3, 4, 5, 6, 7, 8, 9].map(lv => ['gram-' + lv, { run: gramShot(lv, 3, false) }])),
  'gram-1b': { run: gramShot(1, 41, false, 'tap') },
  'gram-hint': { run: gramShot(5, 8, true) },
  'gram-8b': { run: gramShot(8, 41, false, 'tap') }, // P2-21: level 8 tap-a-word
  'gram-7b': { run: gramShot(7, 6, false, 'four') }, // P2-21: level 7 quotation marks, four wide choices
};

// P2-20 grammar helper: seed picks the item (and kind 'tap' searches for a tap-a-word item); hint opens the hint box
function gramShot(lv, seed, hint, form) {
  return async p => {
    await p.evaluate(([lv, seed, form]) => {
      let q = genQ('gram', lv, seed);
      for (let i = 1; form && i < 400 && !(form == 'four' ? q.choices.length == 4 : q.cls == 'bwords'); i++) q = genQ('gram', lv, seed + i);
      G = newG({ sk: 'gram', lv, n: 1, pool: [q] }); next();
    }, [lv, seed, form]);
    if (hint) await p.click('#hb');
  };
}

// P2-24: the first seeded question of that level and kind (level 5 mixes two), shown through the real round engine; hint opens Help.
function sentShot(lv, kind, hint) {
  return async p => {
    await p.evaluate(([lv, kind]) => {
      S.name = 'Ava'; setGrade(2);
      window.say = () => {};
      start('read', NODES.read.findIndex(n => n.sk === 'sent' && n.lv === lv));
      for (let seed = 1; seed < 200; seed++) { const q = genQ('sent', lv, seed); if (q.kind === kind) { G.q = q; break; } }
      renderQ();
    }, [lv, kind]);
    if (hint) await p.click('#hb');
  };
}

// ---- P4-08 Home ----
// Home for a fresh child (grade 1, the "Find my level" card), the midway save, and a child with a 5-day streak, review items
// due and a hungry pet (tricky save). '-end' scrolls Home to the bottom (actions row and version label).
function homeShot(kind, end) {
  return async p => {
    await p.evaluate(([kind, end]) => {
      if (kind == 'fresh') { S.name = 'Ava'; setGrade(1); }
      if (kind == 'streak') {
        const n = STRK.idx(today()), k = d => STRK.key(n - d);
        S.streak = { best: 9, rw: 0, days: { [k(0)]: 1, [k(1)]: 1, [k(2)]: 1, [k(3)]: 1, [k(4)]: 1 } };
        S.care = { food: 12, clean: 70, fun: 70, t: Date.now(), gift: '' };
      } else S.care = { food: 90, clean: 90, fun: 90, t: Date.now(), gift: '' };
      home();
      const sc = document.querySelector('.scroll');
      if (end && sc) sc.scrollTop = sc.scrollHeight;
    }, [kind, !!end]);
  };
}
Object.assign(SCREENS, {
  'home-fresh': { fixture: 'fresh', run: homeShot('fresh') },
  'home-mid': { fixture: 'midway', run: homeShot('mid') },
  'home-mid-end': { fixture: 'midway', run: homeShot('mid', true) },
  'home-streak': { fixture: 'tricky', run: homeShot('streak') },
  'home-streak-end': { fixture: 'tricky', run: homeShot('streak', true) },
});

// One question of a vocabulary level through the real round engine. pic: true picks the first seed with a picture prompt, false the
// first without; by default levels 1 and 2 show a picture and the others do not need one.
function vocabShot(lv, hint, pic) {
  return async p => {
    await p.evaluate(([lv, pic]) => {
      const want = pic === undefined ? lv <= 2 : pic;
      let q = genQ('vocab', lv, 5);
      for (let i = 1; i < 300; i++) { const c = genQ('vocab', lv, i); if (c.html.includes('bpic bem') === want) { q = c; break; } }
      G = newG({ sk: 'vocab', lv, n: 1, pool: [q] }); next();
    }, [lv, pic]);
    if (hint) await p.click('#hb');
  };
}

// One question of a P2-18 level (genQ with a fixed seed) through the real round engine; hint opens Help.
function phonShot(sk, lv, hint) {
  return async p => {
    await p.evaluate(([sk, lv]) => { G = newG({ sk, lv, n: 1, pool: [genQ(sk, lv, 5)] }); next(); }, [sk, lv]);
    if (hint) await p.click('#hb');
  };
}

// P2-06 Fraction Forest: the map, then one question per variant of frac 2 to 5 (first seed whose label matches), grade 3
function fracShot(lv, want) {
  return async p => {
    await p.evaluate(([lv, want]) => {
      S.grade = 3; S.name = 'Ava'; S.buddy = 'Ben';
      window.say = () => {};
      start('math', NODES.math.findIndex(n => n.sk == 'frac' && n.lv == lv));
      let q; for (let i = 1; i < 500; i++) { q = genQ('frac', lv, i); if (new RegExp(want).test(q.label)) break; }
      G.q = q; renderQ();
    }, [lv, want]);
  };
}
Object.assign(SCREENS, {
  'frac-map': { run: async p => { await p.evaluate(() => { S.grade = 3; pathMap('math', PATHS.math.worlds.findIndex(w => w.id === 'm_frac')); }); } },
  'frac-2-name': { run: fracShot(2, '^frac \\d+/\\d+ (bar|circle)$') },
  'frac-2-pic': { run: fracShot(2, '^frac pic') },
  'frac-3-tap': { run: fracShot(3, '^frac tap') },
  'frac-3-read': { run: fracShot(3, '^frac read .* to 2$') },
  'frac-4': { run: fracShot(4, '^frac cmp') },
  'frac-5-num': { run: fracShot(5, '^frac eq') },
  'frac-5-which': { run: fracShot(5, '^frac which') },
});

// P2-07 Fraction Forest, the other twelve stops: the map and one question per variant (first seed whose label matches), grade 3
function ffShot(sk, lv, want) {
  return async p => {
    await p.evaluate(([sk, lv, want]) => {
      S.grade = 3; S.name = 'Ava'; S.buddy = 'Ben';
      window.say = () => {};
      start('math', NODES.math.findIndex(n => n.sk == sk && n.lv == lv));
      let q; for (let i = 1; i < 800; i++) { q = genQ(sk, lv, i); if (new RegExp(want).test(q.label)) break; }
      G.q = q; renderQ();
    }, [sk, lv, want]);
  };
}
Object.assign(SCREENS, {
  'ff-map': { run: async p => { await p.evaluate(() => { S.grade = 3; for (const id of ['frac2', 'frac3', 'frac4', 'frac5']) S.maps.math[id] = 3; pathMap('math', PATHS.math.worlds.findIndex(w => w.id === 'm_frac')); }); } },
  'ff-round1': { run: ffShot('round', 1, '^round') },
  'ff-sub7': { run: ffShot('sub', 7, '^1,000 ') },
  'ff-geo1-poly': { run: ffShot('geo', 1, '^geo1 5 sides') },
  'ff-geo2': { run: ffShot('geo', 2, '^geo2 \\d+x\\d+ cm') },
  'ff-time5-pick': { run: ffShot('time', 5, '^clock5 pick') },
  'ff-time6-clocks': { run: ffShot('time', 6, '^time6 \\d+:\\d\\d to') },
  'ff-shape5': { run: ffShot('shape', 5, '^shape5 notrhom') },
  'ff-data3-pic': { run: ffShot('data', 3, '^data3 pic 10 ') },
  'ff-meas4-ruler': { run: ffShot('meas', 4, '^meas4 ruler 1[0-9]/4') },
  'ff-meas4-scale': { run: ffShot('meas', 4, '^meas4 scale') },
  'ff-meas4-jug': { run: ffShot('meas', 4, '^meas4 jug') },
  'ff-story6': { run: ffShot('story', 6, '^story6 ') },
});

// One Tiny Town question (genQ with a fixed seed) through the real round engine; hint opens Help, notext sets the debug flag.
function tinyShot(sk, lv, hint, notext) {
  return async p => {
    await p.evaluate(([sk, lv, notext]) => {
      S.name = 'Ava'; setGrade(-1);
      window.say = () => {};
      if (notext) document.documentElement.classList.add('notext');
      start('math', NODES.math.findIndex(n => n.sk === sk && n.lv === lv));
      G.q = genQ(sk, lv, 11); renderQ();
    }, [sk, lv, !!notext]);
    if (hint) await p.click('#hb');
  };
}

// Starts the ABC Beach stop through the real round engine, then shows one seeded question (searching on from seed for the wanted kind).
function abcShot(sk, lv, seed, kind) {
  return async p => {
    await p.evaluate(([sk, lv, seed, kind]) => {
      start('read', NODES.read.findIndex(n => n.sk == sk && n.lv == lv));
      let q = genQ(sk, lv, seed);
      for (let i = 1; kind && q.kind != kind && i < 200; i++) q = genQ(sk, lv, seed + i);
      G.q = q;
      renderQ();
    }, [sk, lv, seed, kind]);
  };
}

function spellShot(lv, hint, pic) {
  return async p => {
    await p.evaluate(lv => { G = newG({ sk: 'spell', lv, n: 1, pool: [genQ('spell', lv, 5)] }); next(); }, lv);
    if (pic) await p.evaluate(lv => { for (let i = 1; i < 99; i++) { const q = genQ('spell', lv, i); if (q.html.includes('class="emo"')) { G = newG({ sk: 'spell', lv, n: 1, pool: [q] }); next(); break; } } }, lv);
    if (hint) await p.click('#hb');
  };
}

// Starts a demo bank question (bi = item index) or the demo passage round, through the real round engine.
async function bankDemo(p, sk, bi) {
  await p.evaluate(([sk, bi]) => {
    SK.bankdemo = { t: 'Bank demo', e: '📚', area: 'read', max: 1, bank: 'demo', gen: lv => genBank('demo', lv) };
    SK.passdemo = { t: 'Passage demo', e: '📗', area: 'read', max: 1, bank: 'demo', gen: lv => genPassage('demo', lv), round: lv => passageRound('passdemo', 'demo', lv) };
    NODES.read.push({ ...NODES.read[0], sk, lv: 1 });
    start('read', NODES.read.length - 1);
    if (bi != null) { G.q = genBank('demo', 1, { bi, s: 3 }); G.q.sk = sk; G.q.lv = 1; renderQ(); }
  }, [sk, bi]);
}

const KB = require('./lib/kb-samples.js');
async function kbShow(p, name) {
  await p.evaluate(q => { start('math', 0); G.q = q; renderQ(); }, KB[name]);
}

// ---- P2-02 Shape Garden (K math): the map, and one question of each of the 14 levels as a K child (380x780 is the size to look at) ----
Object.assign(SCREENS, {
  'sg-map': { fixture: 'fresh', run: async p => { await p.evaluate(() => { S.name = 'Ava'; setGrade(0); home(); }); await p.click('.game[data-p="math"]'); } },
  'sg-count3': { fixture: 'fresh', run: sgShot('pk_count', 3) },
  'sg-num3': { fixture: 'fresh', run: sgShot('pk_num', 3) },
  'sg-tenf1': { fixture: 'fresh', run: sgShot('tenf', 1, /frame 7/) },
  'sg-more2': { fixture: 'fresh', run: sgShot('pk_more', 2, /^more/) },
  'sg-same2': { fixture: 'fresh', run: sgShot('pk_more', 2, /^same/) },
  'sg-shape2': { fixture: 'fresh', run: sgShot('shape', 2) },
  'sg-add4': { fixture: 'fresh', run: sgShot('add', 4) },
  'sg-pat2': { fixture: 'fresh', run: sgShot('pat', 2) },
  'sg-tenf2': { fixture: 'fresh', run: sgShot('tenf', 2) },
  'sg-cnt4': { fixture: 'fresh', run: sgShot('cnt', 4) },
  'sg-shape3': { fixture: 'fresh', run: sgShot('shape', 3, /^solid [a-z]+$/) },
  'sg-shape3b': { fixture: 'fresh', run: sgShot('shape', 3, /^solid like/) },
  'sg-sort3': { fixture: 'fresh', run: sgShot('sort', 3) },
  'sg-pos1': { fixture: 'fresh', run: sgShot('pos', 1, /^above/) },
  'sg-pos-front': { fixture: 'fresh', run: sgShot('pos', 1, /^in front of/) },
  'sg-pos-between': { fixture: 'fresh', run: sgShot('pos', 1, /^between/) },
  'sg-meas1': { fixture: 'fresh', run: sgShot('meas', 1, /crayon/) },
  'sg-meas-scale': { fixture: 'fresh', run: sgShot('meas', 1, /^(heavier|lighter)/) },
  'sg-meas-tower': { fixture: 'fresh', run: sgShot('meas', 1, /tower/) },
  'sg-tenf3': { fixture: 'fresh', run: sgShot('tenf', 3, /^10 and/) },
  'sg-tenf3b': { fixture: 'fresh', run: sgShot('tenf', 3, /^10 \+/) },
  'sg-hint': { fixture: 'fresh', run: sgShot('pk_count', 3, null, true) },
  'sg-hint-more': { fixture: 'fresh', run: sgShot('pk_more', 2, /^fewer/, true) },
  'sg-notext': { fixture: 'fresh', run: sgShot('pk_num', 3, null, false, true) },
});

// One Shape Garden question through the real round engine (a K child). match: regex the label must fit (searches on from seed 11);
// hint opens Help; notext sets the debug flag.
function sgShot(sk, lv, match, hint, notext) {
  return async p => {
    await p.evaluate(([sk, lv, src, notext]) => {
      S.name = 'Ava'; setGrade(0);
      window.say = () => {};
      if (notext) document.documentElement.classList.add('notext');
      start('math', NODES.math.findIndex(n => n.sk === sk && n.lv === lv));
      const re = src ? new RegExp(src) : null;
      let q = genQ(sk, lv, 11);
      for (let i = 1; re && !re.test(q.label) && i < 400; i++) q = genQ(sk, lv, 11 + i);
      G.q = q; renderQ();
    }, [sk, lv, match ? match.source : null, !!notext]);
    if (hint) await p.click('#hb');
  };
}

// P2-03: one Clock Tower question (genQ with a fixed seed) through the real round engine; hint opens Help.
function clockShot(sk, lv, seed, hint) {
  return async p => {
    await p.evaluate(([sk, lv, seed]) => {
      S.name = 'Ava'; setGrade(1);
      window.say = () => {};
      start('math', NODES.math.findIndex(n => n.sk === sk && n.lv === lv));
      G.q = genQ(sk, lv, seed); renderQ();
    }, [sk, lv, seed]);
    if (hint) await p.click('#hb');
  };
}

// P2-25: one question of a 2nd grade passage (by passage id and question number) through the real round engine.
function compShot(sk, lv, id, qi, mode, grade = 2) {
  return async p => {
    await p.evaluate(([sk, lv, id, qi, grade]) => {
      S.name = 'Ava'; setGrade(grade);
      window.say = () => {};
      start('read', NODES.read.findIndex(n => n.sk === sk && n.lv === lv));
      const bp = PASS[sk].findIndex(x => x.id === id);
      G.q = genPassage(sk, lv, { bp, qi, s: 5 }); G.q.sk = sk; G.q.lv = lv; renderQ();
    }, [sk, lv, id, qi, grade]);
    if (mode === 'hint') await p.click('#hb');
    if (mode === 'closed') await p.click('.bctx-h');
  };
}

// P2-04: one Treasure Bay question (genQ with a fixed seed) through the real round engine; hint opens Help.
function bayShot(sk, lv, seed, hint) {
  return async p => {
    await p.evaluate(([sk, lv, seed]) => {
      S.name = 'Ava'; setGrade(2);
      window.say = () => {};
      start('math', NODES.math.findIndex(n => n.sk === sk && n.lv === lv));
      G.q = genQ(sk, lv, seed); renderQ();
    }, [sk, lv, seed]);
    if (hint) await p.click('#hb');
  };
}

// P4-05 / P4-06: the pet sheet (runs in the page): every pet (dragon, dino, bird, sea pal) x 5 stages x 6 moods, then for all four:
// anchors, wearables, reactions, small sizes and a dark scene
function petSheet() {
  const stages = [0, 1, 2, 3, 4], names = ['egg', 'baby', 'kid', 'grown', 'super'], kinds = Object.keys(PETS);
  const cell = (svg, label, cls = '') => `<div class="psc ${cls}">${svg}<div class="psn">${label}</div></div>`;
  const row = (title, cells) => `<h2 class="psh">${title}</h2><div class="psr">${cells}</div>`;
  const box = c => `<rect x="2" y="2" width="60" height="60" rx="6" fill="none" stroke="var(--pc-t)" stroke-width="3" stroke-dasharray="6 5"/><circle cx="${c[0]}" cy="${c[1]}" r="6" fill="var(--pc-t)"/>`;
  let h = '';
  for (const k of kinds) {
    h += `<h1 class="psk">${PETS[k].n}</h1>`;
    for (const st of stages) h += row(PETS[k].n + ': ' + names[st] + ' (stage ' + st + ')', PET_MOODS.map(m => cell(petSVG(k, st, m), m)).join(''));
  }
  h += '<h1 class="psk">All pets</h1>';
  h += row('anchors (kid and grown): hat box (bottom centre on the dot) and toy box (centre on the dot), 64 grid', kinds.map(k => [2, 3].map(st =>
    cell(petSVG(k, st, 'idle', { hat: box([32, 60]), toy: box([32, 32]) }), PETS[k].n + ' ' + names[st])).join('')).join(''));
  h += row('wearables (drawn since P4-07; the full set: node tools/shots.js wear)', kinds.map(k => [1, 3].map(st =>
    cell(petSVG(k, st, 'happy', { hat: wearOf(st % 2 ? '👑' : '🎩'), toy: wearOf(st % 2 ? '🧸' : '🎈'), react: true }), PETS[k].n + ' ' + names[st])).join('')).join(''));
  h += row('reactions: .jump (cheer face) and .sad (oops face) on the container', kinds.map(k =>
    cell(`<div class="rig jump">${petSVG(k, 2, 'idle', { react: true })}</div>`, PETS[k].n + ' jump') +
    cell(`<div class="rig sad">${petSVG(k, 2, 'idle', { react: true })}</div>`, PETS[k].n + ' sad')).join(''));
  h += row('sizes: 28 and 42 px font (round runner, map) and the egg at 42', kinds.map(k => [28, 42].map(f =>
    cell(`<div style="font-size:${f}px">${petSVG(k, 2, 'idle', { hat: wearOf('🎩'), toy: wearOf('🎈') })}</div>`, f + ' px')).join('') +
    cell('<div style="font-size:42px">' + petSVG(k, 0, 'idle') + '</div>', 'egg 42')).join(''));
  h += row('dark scene', kinds.map(k => [1, 4].map(st => cell(petSVG(k, st, 'idle'), PETS[k].n + ' ' + names[st], 'psd')).join('')).join(''));
  view(`<style>.psr{display:flex;flex-wrap:wrap;gap:6px;padding:0 8px}.psh{font-size:var(--fs-2);margin:10px 8px 4px;color:var(--ink-2)}
    .psk{font-size:var(--fs-4);margin:18px 8px 0;color:var(--ink)}
    .psc{background:var(--surface);border-radius:var(--r-chip);padding:6px;font-size:64px;display:flex;flex-direction:column;align-items:center;box-shadow:var(--shadow)}
    .psc .pet-svg *{animation:none!important}.psd{background:var(--bt-shade)}.psd .psn{color:var(--surface)}
    .psn{font-size:var(--fs-1);color:var(--ink-2)}#app,html,body{height:auto;overflow:visible}</style>
    <div class="top"><div class="title">Pet rig: dragon, dino, bird, sea pal</div></div>${h}`);
}

// ---- P4-04 components: the sheet and its self-check ----
// Builds the component sheet in the page with the UI.* helpers (src/js/14-ui.js), then runs compCheck.
async function compSheet(p) {
  await p.evaluate(() => {
    const sec = (t, h) => `<section class="cs-s"><h2>${t}</h2>${h}</section>`;
    const row = h => `<div class="cs-r">${h}</div>`;
    const cap = (h, c) => `<div class="cs-c"><div class="cs-i">${h}</div><small>${c}</small></div>`;
    const B = UI.btn, I = UI.ibtn;
    const pad = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button class="key${n == 5 ? ' is-press' : ''}">${n}</button>`).join('') +
      `<button class="key del" aria-label="Delete">${ico('backspace')}</button><button class="key">0</button>` +
      `<button class="key go" aria-label="Check">${ico('go')}</button>`;
    const abc = 'abcdefg'.split('').map(c => `<button class="key">${c}</button>`).join('');
    const ch = (f, c, o = {}) => cap(UI.choice(f, o), c);
    const html = [
      sec('Buttons', row(B('Play', { kind: 'primary', icon: 'play' }) + B('Map', { icon: 'map' }) + B('Math', { kind: 'subject', p: 'math', icon: 'path-math' }) +
        B('Games', { kind: 'subject', p: 'play', icon: 'gamepad' }) + B('Skip', { kind: 'ghost' }) + B('Reset', { kind: 'risk', icon: 'close' })) +
        row(cap(B('Small', { kind: 'primary', size: 'sm', icon: 'star' }), 'sm 48') + cap(B('Medium', { kind: 'primary', icon: 'star' }), 'md 56') +
          cap(B('Large', { kind: 'primary', size: 'lg', icon: 'star' }), 'lg 72')) +
        row(cap(B('Go', { kind: 'primary', icon: 'go' }), 'idle') + cap(B('Go', { kind: 'primary', icon: 'go', cls: 'is-press' }), 'pressed') +
          cap(B('Go', { kind: 'primary', icon: 'go', id: 'cs-focus' }), 'focus') + cap(B('Go', { kind: 'primary', icon: 'go', off: true }), 'disabled') +
          cap(B('Hear it', { icon: 'speak' }), 'soft') + cap(B('Hear it', { icon: 'speak', cls: 'is-press' }), 'pressed') +
          cap(B('Hear it', { icon: 'speak', off: true }), 'disabled')) +
        row(cap(I('back', 'Back', { size: 'sm' }), 'icon sm') + cap(I('sound-on', 'Sound'), 'icon md') + cap(I('gear', 'Settings', { size: 'lg' }), 'icon lg') +
          cap(I('play', 'Play', { kind: 'primary' }), 'primary') + cap(I('pause', 'Pause', { kind: 'subject', p: 'play' }), 'subject') +
          cap(I('replay', 'Again', { cls: 'is-press' }), 'pressed')) +
        `<div class="cs-r cs-w">${B('Accuracy and Grown-ups settings', { kind: 'primary', wide: true, icon: 'gear' })}</div>`),
      sec('Keys', `<div class="keys">${pad}</div><div class="keys abc" style="margin-top:16px">${abc}</div>`),
      sec('Choices', `<div class="picks three">${ch('7', 'idle') + ch('12', 'selected', { cls: 'sel' }) + ch('9', 'right', { cls: 'right' })}` +
        `${ch('4', 'wrong', { cls: 'wrong' }) + ch('15', 'disabled', { cls: 'off' }) + ch('3', 'pressed', { cls: 'is-press' })}</div>` +
        `<div class="picks three" style="margin-top:16px">${ch(picFor('apple', 'A'), 'picture', { kind: 'pic' }) + ch(picFor('fish', 'F'), 'picture right', { kind: 'pic', cls: 'right' }) +
          ch('&gt;', 'symbol', { kind: 'sym' })}</div>` +
        `<div class="picks one" style="margin-top:16px">${ch('The cat sat on the mat.', 'wide', { kind: 'wide' }) + ch('The dog ran to the park to play.', 'wide selected', { kind: 'wide', cls: 'sel' })}</div>`),
      sec('Pieces and sockets', row(cap(`<span class="socket full">c</span> <span class="socket full">a</span> <span class="socket on"></span>`, 'full, full, next') +
        cap(`<span class="socket right">t</span>`, 'right') + cap(`<span class="socket wrong">p</span>`, 'wrong') + cap(`<span class="socket"></span>`, 'empty')) +
        row(cap('<button class="piece">t</button>', 'idle') + cap('<button class="piece sel">p</button>', 'selected') + cap('<button class="piece used">n</button>', 'used') +
          cap('<button class="piece is-press">m</button>', 'pressed') + cap('<button class="piece num">12</button>', 'number')) +
        row(cap('<button class="piece word">jumped</button> <button class="piece word sel">over</button>', 'word') + cap('<span class="socket word"></span>', 'word socket'))),
      sec('Panels', `<div class="cs-g"><div class="panel"><h3>${ico('calendar', 24)} Plain panel</h3><p>White, 22 px corners, a 2 px line and a soft shadow.</p></div>` +
        `<div class="panel tint s-read"><h3>${ico('path-read', 24)} Tinted panel</h3><p>Uses the subject tint; the title takes the shade.</p></div>` +
        `<div class="panel big"><h3>${ico('trophy', 24)} Hero panel</h3><p>Big corners and a warm wash for the top of a screen.</p>` +
        `<div style="margin-top:12px">${UI.meter(.62, { kind: 'grow', lg: true })}</div></div></div>`),
      sec('Path cards', `<div class="cs-g">${UI.pathcard({ p: 'math', title: 'Math Adventure', done: 9, total: 58, next: 'Count by 2s and 5s' })}` +
        UI.pathcard({ p: 'read', title: 'Reading Adventure', done: 7, total: 43, next: 'Middle sounds' }) +
        UI.pathcard({ p: 'es', title: 'Spanish Adventure', done: 5, total: 21, next: 'Read colors' }) +
        UI.pathcard({ p: 'disc', title: 'Discover', done: 0, total: 30, next: 'Plants and animals' }) +
        UI.pathcard({ p: 'bt', title: 'Brain Teasers', done: 12, total: 40, next: 'Pattern puzzles' }) +
        UI.pathcard({ p: 'play', title: 'Game Room', done: 3, total: 10 }) + '</div>'),
      sec('Top bars', `<div class="top tbar cs-bar"><div class="ttl">Star School</div>${UI.chip('star', 85)}${UI.chip('coin', 64)}${I('gear', 'Grown-ups', { size: 'sm' })}</div>` +
        `<div class="top tbar round cs-bar">${I('close', 'Stop', { size: 'sm' })}${UI.dots(10, 4, ['', 'try'])}${UI.chip('star', 3)}</div>` +
        `<div class="top tbar adult cs-bar">${I('back', 'Back', { size: 'sm' })}<div class="ttl">Grown-ups</div></div>`),
      sec('Stat chips', row(UI.chip('star', 85) + UI.chip('coin', 64) + UI.chip('ticket', '7:00') + UI.chip('flame', 4, { tap: true, aria: 'Streak' }) +
        UI.chip('flame', 0, { off: true }) + UI.chip('timer', '0:45'))),
      sec('Meters and dots', `<div class="cs-g">${cap(UI.meter(.2), 'progress 20%')}${cap(UI.meter(.65, { p: 'math' }), 'math 65%')}` +
        `${cap(UI.meter(.9, { kind: 'grow' }), 'pet growth 90%')}${cap(UI.meter(1, { kind: 'good' }), 'done 100%')}${cap(UI.meter(0), 'empty')}` +
        `${cap(UI.dots(10, 6, ['', '', 'try']), 'round dots: done, retry, current, to do')}</div>`),
      sec('Stars and tags', row(cap(UI.stars(0), '0 of 3') + cap(UI.stars(1), '1') + cap(UI.stars(2), '2') + cap(UI.stars(3), '3') +
        cap(UI.stars(2, 3, 56, { arc: true }), 'reward 56 px')) +
        row(UI.tag('New', 'new') + UI.tag('Mastered', 'mast', 'crown') + UI.tag('Skipped', 'skip') + UI.tag('Challenge', 'chal', 'bolt'))),
      sec('Toasts and speech', `<div class="cs-col">${['good:Great job!', 'try:Try again', 'info:Tap the speaker to hear it'].map(x => {
        const [k, t] = x.split(':');
        return `<div class="toast on cs-static ${k}"><span class="ti">${ico({ good: 'check', try: 'replay', info: 'info' }[k])}</span><span>${t}</span></div>`;
      }).join('')}</div>` +
        row(UI.speech('You can do it!') + UI.speech('Tap the big one.', 'r') + `<span class="cs-pet">${ico('paw', 40)}</span>${UI.speech('Hi! I am Sparky.', 'l')}`)),
      sec('Sheet', `<div class="sheet-bg on cs-static cs-sheet"><div class="sheet"><div class="sh-art">${ico('trophy')}</div><h2>Skip ahead?</h2>` +
        `<p>Answer 5 questions. Get 4 right and you skip this stop.</p><div class="acts">${B('Try it', { kind: 'primary', size: 'lg', icon: 'play', wide: true })}` +
        `${B('Not now', { kind: 'ghost', wide: true })}</div></div></div>`),
      sec('Hint panels', `<div class="cs-col">${UI.hint('<p>Count the dots one by one. Touch each one as you count.</p>')}` +
        UI.hint('<p>Three and two more:</p><div class="hpic">' + picFor('apple', 'A').repeat(3) + ' + ' + picFor('apple', 'A').repeat(2) + '</div>') +
        UI.hint('', { steps: ['Start at 27.', 'Add 10: that makes 37.', 'Add 5 more: 42.'], at: 1 }) + '</div>'),
      sec('Context panel', `<div class="cs-col">${UI.ctx('The lost kite', '<p>Mia had a red kite. The wind took it up, up, up. It got stuck in a tall tree.</p>' +
        '<p>Her dog Rex ran to the tree and barked. A bird flew off the branch, and the kite fell down into the grass.</p><p>Mia gave Rex a big hug.</p>')}` +
        UI.ctx('Story', '<p>Closed panel.</p>', false) + '</div>'),
      sec('Segments and switches', `<div class="cs-col">${UI.seg([['e', 'Easy'], ['m', 'Medium'], ['h', 'Hard']], 'm', { label: 'Level' })}` +
        UI.seg([['30', '30 s'], ['60', '60 s'], ['90', '90 s'], ['0', 'No timer']], '0', { full: true, label: 'Timer' }) +
        UI.sw('Read questions aloud', true, 'cs-sw1') + UI.sw('Calm mode (less motion)', false, 'cs-sw2') +
        `<label class="switch"><input type="checkbox" role="switch" disabled><span class="sw" aria-hidden="true"></span><span>Not available</span></label></div>`),
      sec('Table', `<div class="tblw" style="max-height:220px"><table class="tbl"><thead><tr><th>Day</th><th class="n">Minutes</th><th class="n">Right</th></tr></thead><tbody>` +
        [['Monday', 12, '90%'], ['Tuesday', 9, '84%'], ['Wednesday', 15, '95%'], ['Thursday', 6, '70%'], ['Friday', 20, '88%'], ['Saturday', 8, '92%']]
          .map(r => `<tr><td>${r[0]}</td><td class="n">${r[1]}</td><td class="n">${r[2]}</td></tr>`).join('') + '</tbody></table></div>'),
      sec('Empty state', `<div class="panel">${UI.empty('calendar', 'Nothing to review today. Come back tomorrow.', B('Play a game', { kind: 'primary', icon: 'play' }))}</div>`),
      sec('Map nodes', `<div class="cs-map s-math">${cap(UI.mapnode({ p: 'math', state: 'lock' }), 'locked')}` +
        cap(UI.mapnode({ p: 'math', state: 'open', icon: 'plus' }), 'open') + cap(UI.mapnode({ p: 'math', state: 'done', icon: 'plus', stars: 2 }), 'passed') +
        cap(UI.mapnode({ p: 'math', state: 'mast', icon: 'times', stars: 3 }), 'mastered') + cap(UI.mapnode({ p: 'math', state: 'skip' }), 'skipped') +
        cap(UI.mapnode({ p: 'read', state: 'open', icon: 'path-read', isNew: true }), 'new') +
        cap(UI.mapnode({ p: 'math', boss: true, html: ico('crown', 44) }), 'boss') + '</div>'),
    ].join('');
    view(`<style>#app,html,body{height:auto;overflow:visible}
      .cs{display:flex;flex-direction:column;gap:var(--s-4);padding:0 var(--s-4) var(--s-7)}
      .cs-s{background:var(--wash);border-radius:var(--r-card);padding:var(--s-3) var(--s-4) var(--s-5)}
      .cs-s>h2{margin:0 0 var(--s-3);font-size:var(--fs-3);color:var(--ink-2)}
      .cs-r{display:flex;flex-wrap:wrap;gap:var(--s-4);align-items:flex-end;margin-bottom:var(--s-4)}
      .cs-c{display:flex;flex-direction:column;align-items:flex-start;gap:var(--s-2)}
      .cs-c>small{font-size:var(--fs-1);color:var(--ink-3)}
      .cs-i{display:flex;gap:var(--s-2);align-items:center}
      .picks .cs-c,.cs-g .cs-c{align-items:stretch}.picks .cs-i>*,.cs-g .cs-i>*{flex:1}.picks .cs-c>small{text-align:center}
      .cs-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:var(--s-4)}
      .cs-col{display:flex;flex-direction:column;gap:var(--s-3)}.cs-col>.seg:first-child,.cs-col>.toast{align-self:flex-start}
      .cs-bar{background:var(--surface);border-radius:var(--r-card);margin-bottom:var(--s-3);box-shadow:inset 0 0 0 2px var(--line)}
      .cs-static{position:relative!important;left:auto!important;top:auto!important;transform:none!important}
      .cs-sheet{inset:auto;height:auto;padding-top:var(--s-6);border-radius:var(--r-card);overflow:hidden;align-items:flex-end}
      .cs-pet{color:var(--play);align-self:center}
      .cs-map{display:flex;flex-wrap:wrap;gap:var(--s-6) var(--s-7);align-items:flex-end;padding:var(--s-4) var(--s-2) var(--s-6)}
      .cs-map .cs-c{align-items:center;gap:40px}</style>
      <div class="top tbar"><div class="ttl">Components</div>${UI.chip('star', 85)}</div><div class="cs">${html}</div>`);
    document.getElementById('cs-focus').focus();
  });
  await p.waitForTimeout(400);
  await p.evaluate(compCheck, '.cs');
}

// Runs in the page, on the elements inside root. Reports (console.error) any component whose content overflows it, any word split over two lines,
// any tap target under 48 x 48 px, and horizontal scrolling of the page.
function compCheck(root) {
  const bad = m => console.error('components: ' + m);
  const W = document.documentElement.clientWidth;
  if (document.documentElement.scrollWidth > W + 1) bad('page scrolls sideways (' + document.documentElement.scrollWidth + ' > ' + W + ')');
  const sel = '.dots,.btn,.key,.choice,.piece,.socket,.stat,.tag,.pathcard,.pc-t,.seg>button,.switch,.speech,.toast,.mapnode,.hintp,.ctx>summary,.tbl th,.tbl td,.sheet h2,.sheet p,.blank p';
  const R = document.querySelector(root) || document.body;
  for (const el of R.querySelectorAll(sel)) {
    const name = (el.className.baseVal != null ? '' : el.className) + ' "' + el.textContent.trim().slice(0, 30) + '"';
    // map nodes carry their ring, stars and tag outside on purpose; ellipsis lines cut on purpose
    if (!el.matches('.mapnode') && getComputedStyle(el).textOverflow != 'ellipsis' && (el.scrollWidth > el.clientWidth + 1)) bad('content overflows ' + name);
    const r = el.getBoundingClientRect();
    if (r.right > W + 1) bad('off the right edge: ' + name);
    // words split across lines: a word whose range has more than one line box
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let t = walk.nextNode(); t; t = walk.nextNode()) {
      const re = /\S+/g;
      for (let m = re.exec(t.data); m; m = re.exec(t.data)) {
        const rg = document.createRange();
        rg.setStart(t, m.index);
        rg.setEnd(t, m.index + m[0].length);
        const tops = new Set([...rg.getClientRects()].filter(x => x.width > 0).map(x => Math.round(x.top)));
        if (tops.size > 1) bad('word broken over two lines: "' + m[0] + '" in ' + name);
      }
    }
  }
  for (const el of R.querySelectorAll('button,.switch,summary,.stat')) {
    if (el.matches('span.stat')) continue; // a span chip is not tappable
    const r = el.getBoundingClientRect();
    if (r.width < 47.5 || r.height < 47.5) bad('tap target ' + Math.round(r.width) + 'x' + Math.round(r.height) + ': ' + (el.className || el.tagName) + ' "' + el.textContent.trim().slice(0, 20) + '"');
  }
}

// The real modal sheet and toast over Home (fixed position, backdrop).
async function compLive(p, what) {
  await p.evaluate(what => {
    home(true);
    if (what == 'sheet') {
      UI.sheet(`<div class="sh-art">${ico('trophy')}</div><h2>Skip ahead?</h2><p>Answer 5 questions. Get 4 right and you skip this stop.</p>` +
        `<div class="acts">${UI.btn('Try it', { kind: 'primary', size: 'lg', icon: 'play', wide: true })}${UI.btn('Not now', { kind: 'ghost', wide: true })}</div>`);
    } else UI.toast('Great job! 3 stars', 'good', 60000);
  }, what);
  await p.waitForTimeout(500);
  await p.evaluate(compCheck, what == 'sheet' ? '.sheet-bg' : '#toast');
}

// ---- P4-11 rewards helpers ----
// A finished math round through the real finish() and chest. o: stars (3..0 for a normal stop), world (play the last open stop
// of the first unfinished world, so the world gets finished), grow (the pet grows a stage), mix (Tricky Mix), boss (k-th math
// boss) with won; tap: false stops before the chest is tapped (else it waits for the whole sequence).
function rwShot(o) {
  return async p => {
    await p.evaluate(o => {
      window.rwBossAt = window.rwBossAt || (k => NODES.math.indexOf(NODES.math.filter(n => n.sk == 'boss')[k]));
      if (o.boss != null) {
        const bi = rwBossAt(o.boss);
        for (let i = 0; i < bi; i++) if (!getSt('math', i)) setSt('math', i, 2);
        bossIntro('math', bi);
        document.querySelector('#fight').click();
        G.won = o.won; G.asked = 7; G.score = o.won ? 7 : 5; G.done = G.n; G.hp = o.won ? 0 : 2;
        finish();
        return;
      }
      if (o.grow) S.stars = 160 - 5;
      if (o.mix) { startMix(); G.score = G.n; G.done = G.n; finish(); return; }
      let i = 0;
      if (o.world) {
        const wi = PATHS.math.worlds.findIndex(w => !S.wdone[w.id]);
        const [a, b] = WR.math[wi];
        for (let k = a; k <= b; k++) setSt('math', k, k == b - 1 ? 0 : 2);
        i = b - 1;
      }
      start('math', i);
      const n = G.n, need = [Math.floor(n * .7 + .01) - 2, Math.floor(n * .7 + .01), Math.floor(n * .8 + .01), n][o.stars];
      G.score = need; G.done = n; finish();
    }, o);
    if (o.tap === false) return;
    await p.click('#chest');
    await p.waitForSelector('#btns', { state: 'visible', timeout: 8000 });
    await p.waitForTimeout(o.grow ? 1200 : 3500);
  };
}

// Reward art sheet (runs in the page): chest closed and open, reward stars and ratings, the four bosses (idle and hit) at
// intro, card and top-bar sizes, prize rosettes and stickers, each on the page colour and on a tint.
function rwSheet() {
  const box = (h, w, t) => `<div class="rwc"><div class="rwb" style="width:${w}px;height:${w}px">${h}</div><div class="rwn">${t}</div></div>`;
  const row = (title, cells) => `<h3>${title}</h3><div class="rwr">${cells}</div>`;
  const bosses = Object.keys(RW.BOSS);
  view(`<style>.rws{padding:8px 12px 24px}.rws h3{margin:14px 0 6px;font-size:var(--fs-3)}
    .rwr{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end}.rwr.t{background:var(--star-tint);border-radius:var(--r-card);padding:8px}
    .rwc{display:flex;flex-direction:column;align-items:center;gap:4px}.rwb{display:grid;place-items:center}
    .rwn{font-size:var(--fs-1);color:var(--ink-2)}#app,html,body{height:auto;overflow:visible}.rws *{animation:none!important}</style>
    <div class="top"><div class="title">Reward art</div></div><div class="rws">
    ${row('Chest', [200, 104, 64].map(w => box(RW.chest(0), w, 'closed ' + w)).join('') + [200, 104, 64].map(w => box(RW.chest(1), w, 'open ' + w)).join(''))}
    ${row('Chest with rays', box(`<div style="position:relative;width:100%;height:100%">${RW.rays()}<div style="position:absolute;inset:12%">${RW.chest(1)}</div></div>`, 160, 'open + rays'))}
    ${row('Stars', [96, 64, 32].map(w => box(RW.star(1), w, 'on ' + w) + box(RW.star(0), w, 'off ' + w)).join(''))}
    <div class="rwr t">${[3, 2, 1, 0].map(n => RW.rate(n)).join('')}</div>
    ${bosses.map(b => row(b, [200, 96, 56].map(w => box(RW.boss(b, 'idle'), w, 'idle ' + w) + box(RW.boss(b, 'hit'), w, 'hit ' + w)).join(''))).join('')}
    <h3>Top bar size on a tint</h3><div class="rwr t">${bosses.map(b => box(RW.boss(b, 'idle'), 56, b) + box(RW.boss(b, 'hit'), 56, 'hit')).join('')}</div>
    ${row('Prizes and stickers', ['🌼', '🎉', '💎', '🍩'].map(e => box(RW.badge(e), 80, 'badge')).join('') +
      `<div class="rw-tre" style="width:340px"><div class="rw-prz">${['🦄', '🚀', '🍩', '🐼'].map((e, i) => RW.sticker(e, i % 2 == 0, i)).join('')}</div></div>`)}
    </div>`);
}

// A boss round on screen (world 3's boss) after three zaps.
async function rwBossFight(p) {
  await p.evaluate(() => {
    window.rwBossAt = window.rwBossAt || (k => NODES.math.indexOf(NODES.math.filter(n => n.sk == 'boss')[k]));
    bossIntro('math', rwBossAt(2));
    document.querySelector('#fight').click();
    G.hp = 4;
    bossHit();
  });
  await p.waitForTimeout(400);
}

// ---- P4-10 question screen: the states the kind shots do not show (right, try again, answer shown, tags, streak, boss, race).
// The round is frozen (G.dead) right after the tap, so the feedback stays on screen for the shot; the toast is kept up too. ----
const qFreeze = () => { G.dead = true; try { clearTimeout(fbT); } catch (e) {} if (typeof UI != 'undefined') clearTimeout(UI._toastT); };
// start the first stop of skill sk (math) and keep asking until the question is of kind `kind`
const qOpen = (sk, kind) => {
  start('math', NODES.math.findIndex(n => n.sk == sk));
  for (let t = 0; t < 40 && G.q.kind != kind; t++) { G.q = genQ(G.q.sk, G.q.lv); renderQ(); }
};
// type a number on the pad and press the check key
const qType = s => { for (const c of s) document.querySelector(`.k[data-k="${c}"]`).click(); document.querySelector('.k[data-k="go"]').click(); };
const qShot = (fn, arg) => ({ run: async p => {
  await p.evaluate(([h, f, a]) => { eval(h); eval('(' + f + ')')(a); }, [`var qFreeze=${qFreeze};var qOpen=${qOpen};var qType=${qType};`, fn.toString(), arg]);
} });
Object.assign(SCREENS, {
  'q-right': qShot(() => { qOpen('add', 'num'); qType(G.q.ans); qFreeze(); }),
  'q-try': qShot(() => { qOpen('eo', 'choice'); [...document.querySelectorAll('.ch')].find(b => G.q.choices[b.dataset.i].v != G.q.ans).click(); qFreeze(); }),
  'q-reveal': qShot(() => { qOpen('add', 'num'); qType('99'); qType('98'); qFreeze(); }),
  'q-build-try': qShot(() => {
    start('read', NODES.read.findIndex(n => n.sk == 'build' || n.sk == 'cvc'));
    for (let t = 0; t < 40 && G.q.kind != 'build'; t++) { G.q = genQ(G.q.sk, G.q.lv); renderQ(); }
    const w = G.q.word, tl = [...document.querySelectorAll('.lt')];
    const first = tl.find(b => G.q.tiles[b.dataset.i] == w[0]); first.click();
    const bad = tl.find(b => b !== first && G.q.tiles[b.dataset.i] != w[1]); if (bad) bad.click();
  }),
  'q-review': qShot(() => { start('math', 0); G.q.review = 1; renderQ(); }),
  'q-streak': qShot(() => { start('math', 0); G.streak = 4; G.score = 4; G.done = 4; G.res = ['', '', 'try', '']; renderQ(); }),
  'q-boss': { run: async p => { await p.evaluate(() => bossIntro('math', NODES.math.findIndex(n => n.sk == 'boss'))); await p.click('#fight'); } },
  'q-race': { run: async p => { await p.evaluate(() => race('math')); } },
});

// ---- P4-18 graphics pass: the screens it fixed that had no entry, and the before/after group ----
// node tools/shots.js @p418 shoots the whole group. For a before/after pair, build the old version, run with SHOTS_OUT=<dir>/before,
// rebuild, run again with SHOTS_OUT=<dir>/after (SHOTS_SIZES=600x960,380x780 picks sizes).
Object.assign(SCREENS, {
  'map-boss': { run: async p => { await p.evaluate(() => { pathMap('math'); const b = document.querySelector('.node.boss'); if (b) b.scrollIntoView({ block: 'center' }); }); } },
  'race-menu': { run: async p => { await p.evaluate(() => raceMenu()); } },
  'race-end': { run: async p => { await p.evaluate(() => { race('math'); RC.score = 8; RC.left = 1; }); await p.waitForSelector('#ragain', { timeout: 8000 }); } },
  balloons: { run: async p => { await p.evaluate(() => balloons('math', { path: 'math', node: 0 })); await p.waitForTimeout(1500); } },
  'balloons-end': { run: async p => { await p.evaluate(() => balloons('math', { path: 'math', node: 0 })); await p.waitForSelector('#bnext', { timeout: 15000 }); } },
  'learn-es': { run: async p => { await p.evaluate(() => learn('es', 0)); } },
});
const GROUPS = {
  p418: ['map', 'map-read', 'map-worlds', 'map-boss', 'fluency', 'fluency-modes', 'sprint', 'sprint-end', 'race-menu', 'q-race', 'race-end', 'streak',
    'place-intro', 'place-q', 'place-done', 'place-grown', 'report-top', 'care', 'setup', 'gameroom', 'balloons', 'balloons-end', 'learn-es', 'q-boss',
    'viz', 'viz-q', 'bay-coins4', 'clock-time1', 'frac-2-pic', 'sg-tenf2'],
  p412: ['setup', 'setup-done', 'grown', 'grown-full', 'grown-log', 'report-top', 'care', 'care-fx', 'care-space', 'shop', 'app-icon'],
};

// P4-12: setup filled in by taps, the whole Grown-ups page (and the App log open), Pet Care mid-bath (drawn bubbles), the
// space stage, and a sheet of the app icon (512 and 192 as launchers crop them: square, rounded, the maskable circle; the favicon).
Object.assign(SCREENS, {
  'setup-done': { fixture: 'fresh', run: async p => {
    await p.fill('#nm', 'Ava'); await p.click('.petopt[data-p="bird"]'); await p.click('.gr[data-g="2"]'); await p.click('#nm');
  } },
  'grown-full': { full: true, run: async p => { await p.evaluate(() => { S.err = [{ t: Date.now(), ver: 'v124', msg: 'Sample error line' }]; grown();
    for (const e of [document.documentElement, document.body, document.querySelector('#app'), document.querySelector('.scroll')]) { e.style.height = 'auto'; e.style.overflow = 'visible'; } }); } },
  'grown-log': { run: async p => { await p.evaluate(() => { S.err = [{ t: Date.now(), ver: 'v124', msg: 'Sample error line' }]; grown(); }); await p.click('#applog summary');
    await p.evaluate(() => document.querySelector('#applog').scrollIntoView({ block: 'center' })); } },
  'care-fx': { run: async p => { await p.evaluate(() => { window.say = () => {}; S.care = { food: 40, clean: 20, fun: 40, t: Date.now(), gift: '' }; care(); });
    // the virtual clock removes the pieces at once (their timer is fast, the CSS motion is real time): copies stay for the shot
    const keep = n0 => p.evaluate(n0 => document.querySelectorAll('.pc-fx:not(.kept)').forEach(b => { const c = b.cloneNode(true); c.classList.add('kept');
      document.body.appendChild(c); c.querySelectorAll('i').forEach((i, n) => { i.style.animationDelay = -(n0 + n * 45) + 'ms'; i.style.animationPlayState = 'paused'; }); }), n0);
    await p.click('#bath'); await keep(380); await p.waitForTimeout(200); await p.click('[data-f="1"]'); await keep(300); } },
  'care-space': { run: async p => { await p.evaluate(() => { S.wear.scene = 'space'; S.care = { food: 20, clean: 90, fun: 90, t: Date.now(), gift: '' }; care(); }); } },
  'app-icon': { run: async p => { await p.evaluate(() => {
    const im = (src, sz, r, extra = '') => `<div style="display:grid;justify-items:center;gap:8px"><div style="position:relative;width:${sz}px;height:${sz}px;border-radius:${r};overflow:hidden;box-shadow:0 6px 16px rgba(31,36,64,.18)">` +
      `<img src="${src}" width="${sz}" height="${sz}" style="display:block">${extra}</div><small>${src} ${sz}px ${r == '50%' ? 'maskable circle' : r == '0' ? 'square' : 'rounded'}</small></div>`;
    const zone = '<div style="position:absolute;inset:10%;border-radius:50%;box-shadow:0 0 0 2px #fff8,inset 0 0 0 2px #fff8"></div>';
    view(`<div class="scroll" style="display:flex;flex-wrap:wrap;gap:24px;align-items:flex-end;justify-content:center;padding:24px">${im('icon-512.png', 256, '0', zone)}` +
      `${im('icon-512.png', 192, '22%')}${im('icon-512.png', 192, '50%')}${im('icon-192.png', 96, '22%')}${im('icon-192.png', 48, '50%')}${im('icon-192.png', 32, '6px')}</div>`);
  }); await p.waitForTimeout(200); } },
});

// P2-08: step hints. One question in a one-question round (made in the page by mk, a function source), then Help tapped
// `taps` times (the first tap opens step 1, each further tap shows the next step).
const stepShot = (mk, taps) => ({ run: async p => {
  await p.evaluate(([src, sq]) => {
    S.name = 'Ava'; window.say = () => {};
    window.stepQ = eval('(' + sq + ')');
    const q = eval('(' + src + ')')();
    q.sk = q.sk || 'zz_demo'; q.lv = q.lv || 1;
    G = newG({ sk: 'zz_demo', n: 10, pool: [q] }); next();
  }, [mk.toString(), stepQ.toString()]);
  for (let i = 0; i < taps; i++) { await p.click('#hb'); await p.waitForTimeout(120); }
} });
const stepQ = (html, ans, hint, o) => Object.assign({ kind: 'num', html, ans, hint, say: 'Work it out', label: 'zz:steps' }, o || {});
Object.assign(SCREENS, {
  'steps-add': { run: async p => { await bayShot('big', 5, 12)(p); for (let i = 0; i < 2; i++) { await p.click('#hb'); await p.waitForTimeout(120); } } },
  'steps-add-end': { run: async p => { await bayShot('big', 5, 12)(p); for (let i = 0; i < 3; i++) { await p.click('#hb'); await p.waitForTimeout(120); } } },
  'steps-dec': stepShot(() => stepQ(ST.vert(['3.4', '12.75'], '+'), '16.15', stepsAdd('3.4', '12.75'), { pad: 'dec' }), 2),
  'steps-sub': stepShot(() => stepQ(ST.vert(['5003', '1278'], '−'), '3725', stepsSub(5003, 1278), { max: 4 }), 1),
  'steps-sub2': stepShot(() => stepQ(ST.vert(['512', '389'], '−'), '123', stepsSub(512, 389)), 4),
  'steps-mul-pp': stepShot(() => stepQ(ST.vert(['34', '27'], '×'), '918', stepsMul(34, 27, 'pp')), 3),
  'steps-mul-pp-end': stepShot(() => stepQ(ST.vert(['34', '27'], '×'), '918', stepsMul(34, 27, 'pp')), 5),
  'steps-mul-std': stepShot(() => stepQ(ST.vert(['348', '26'], '×'), '9048', stepsMul(348, 26, 'std'), { max: 6 }), 6),
  'steps-mul-1': stepShot(() => stepQ(ST.vert(['1286', '4'], '×'), '5144', stepsMul(1286, 4, 'std'), { max: 5 }), 3),
  'steps-div': stepShot(() => stepQ(ST.ldiv(745, 6, SLOT_R), '124R1', stepsDiv(745, 6), { sep: 'R' }), 4),
  'steps-div-end': stepShot(() => stepQ(ST.ldiv(745, 6, SLOT_R), '124R1', stepsDiv(745, 6), { sep: 'R' }), 6),
  'steps-div2': stepShot(() => stepQ(ST.ldiv(864, 24), '36', stepsDiv(864, 24)), 3),
  'steps-equiv': stepShot(() => stepQ(`<div class="eq">${fcFr(3, 4)} = ${fcFr(SLOT, 12)}</div>`, '9', stepsEquivFrac(3, 4, null, 12)), 2),
  'steps-cd': stepShot(() => stepQ(`<div class="eq">${fcFr(2, 3)} + ${fcFr(1, 4)} = ${SLOT_FRAC}</div>`, '11/12', stepsCommonDen(2, 3, 1, 4, '+'), { pad: 'frac' }), 4),
  'steps-story': stepShot(() => stepQ('<div class="sub">Mia has 12 shells. She finds 5 more, then gives 4 away. How many now?</div>' + SLOT, '13',
    stepsStory(['First find how many Mia has after finding 5 more.', 'Then take away the 4 she gave. How many are left?'])), 2),
});

// P2-09 Factor Factory: a map of the world, one question of several levels, and step hints (Help tapped `taps` times)
function fyShot(sk, lv, want, taps) {
  return async p => {
    await p.evaluate(([sk, lv, want]) => {
      S.grade = 4; S.name = 'Ava'; S.buddy = 'Ben';
      window.say = () => {};
      start('math', NODES.math.findIndex(n => n.sk == sk && n.lv == lv));
      let q; for (let i = 1; i < 800; i++) { q = genQ(sk, lv, i); if (new RegExp(want).test(q.label)) break; }
      G.q = q; renderQ();
    }, [sk, lv, want]);
    for (let i = 0; i < (taps || 0); i++) { await p.click('#hb'); await p.waitForTimeout(120); }
  };
}
Object.assign(SCREENS, {
  'fy-map': { run: async p => { await p.evaluate(() => { S.grade = 4; pathMap('math', PATHS.math.worlds.findIndex(w => w.id === 'm_factory')); }); } },
  'fy-mfact5': { run: fyShot('mfact', 5, '^\\d+ × \\d+ = \\?$') },
  'fy-pv4-value': { run: fyShot('pv', 4, '^value of') },
  'fy-pv4-exp': { run: fyShot('pv', 4, ' = \\?$') },
  'fy-pv4-words': { run: fyShot('pv', 4, '^words') },
  'fy-pv4-cmp': { run: fyShot('pv', 4, '^\\d+ \\? \\d+$') },
  'fy-mbig3': { run: fyShot('mbig', 3, '^\\d{4} × ') },
  'fy-big7': { run: fyShot('big', 7, '^\\d+ \\+ \\d+ \\+ ') },
  'fy-sub8': { run: fyShot('sub', 8, '^\\d{6} − ') },
  'fy-dbig2': { run: fyShot('dbig', 2, ' ÷ ') },
  'fy-dbig3': { run: fyShot('dbig', 3, '^\\d{4} ÷ ') },
  'fy-fact1-multi': { run: fyShot('fact', 1, '^all factors') },
  'fy-fact2': { run: fyShot('fact', 2, 'which is prime') },
  'fy-round3': { run: fyShot('round', 3, '^round \\d{6} to 1000$') },
  'fy-steps-mul': { run: fyShot('mbig', 4, '^\\d+ × \\d+ = \\?$', 3) },
  'fy-steps-div': { run: fyShot('dbig', 3, '^\\d{3} ÷ \\d = \\?$', 3) },
  'fy-steps-round': { run: fyShot('round', 3, '^round \\d{6} to 100$', 2) },
});

// P2-10 Decimal Desert: the map, then one question of each new level (the first seed whose label matches), grade 4
function ddShot(sk, lv, want, hint) {
  return async p => {
    await p.evaluate(([sk, lv, want]) => {
      S.grade = 4; S.name = 'Ava'; S.buddy = 'Ben';
      window.say = () => {};
      start('math', NODES.math.findIndex(n => n.sk == sk && n.lv == lv));
      let q; for (let i = 1; i < 600; i++) { q = genQ(sk, lv, i); if (new RegExp(want).test(q.label)) break; }
      G.q = q; renderQ();
    }, [sk, lv, want]);
    if (hint) await p.click('#hb');
  };
}
Object.assign(SCREENS, {
  'dd-map': { run: async p => { await p.evaluate(() => { S.grade = 4; pathMap('math', PATHS.math.worlds.findIndex(w => w.id === 'm_desert')); }); } },
  'dd-frac6': { run: ddShot('frac', 6, '^frac cmp2', true) },
  'dd-fop1-add': { run: ddShot('fop', 1, '^fop1 \\d+/\\d+ \\+') },
  'dd-fop1-mixed': { run: ddShot('fop', 1, '^fop1 \\d+ \\d+/\\d+ −', true) },
  'dd-fop2': { run: ddShot('fop', 2, '^fop2 [6-9] ×') },
  'dd-dec1-grid': { run: ddShot('dec', 1, '^dec1 grid \\d\\d of 100') },
  'dd-dec1-line': { run: ddShot('dec', 1, '^dec1 line 0\\.') },
  'dd-dec2': { run: ddShot('dec', 2, '^dec2 0\\.\\d+ \\? 0\\.\\d{3}$', true) },
  'dd-ang1': { run: ddShot('ang', 1, '^ang1 obtuse') },
  'dd-ang1-pick': { run: ddShot('ang', 1, '^ang1 pick') },
  'dd-ang2-proto': { run: ddShot('ang', 2, '^ang2 protractor') },
  'dd-ang2-sum': { run: ddShot('ang', 2, '^ang2 straight') },
  'dd-geo3-l': { run: ddShot('geo', 3, '^geo3 L ') },
  'dd-geo3-perim': { run: ddShot('geo', 3, '^geo3 perimeter') },
  'dd-shape6-sym': { run: ddShot('shape', 6, '^shape6 sym line rect d') },
  'dd-shape6-count': { run: ddShot('shape', 6, '^shape6 sym count pentagon') },
  'dd-shape6-lines': { run: ddShot('shape', 6, '^shape6 lines parallel') },
  'dd-meas5': { run: ddShot('meas', 5, '^meas5 \\d+ km', true) },
  'dd-pat4-fill': { run: ddShot('pat', 4, '^pat4 fill') },
  'dd-pat4-rule': { run: ddShot('pat', 4, '^pat4 rule') },
  'dd-story7': { run: ddShot('story', 7, '^story7 5x', true) },
});

// P2-11 Volcano Lab: the world map, one question of several levels, and step hints (Help tapped `taps` times), grade 5
function vlShot(sk, lv, want, taps) {
  return async p => {
    await p.evaluate(([sk, lv, want]) => {
      S.grade = 5; S.name = 'Ava'; S.buddy = 'Ben';
      window.say = () => {};
      start('math', NODES.math.findIndex(n => n.sk == sk && n.lv == lv));
      let q; for (let i = 1; i < 800; i++) { q = genQ(sk, lv, i); if (new RegExp(want).test(q.label)) break; }
      G.q = q; renderQ();
    }, [sk, lv, want]);
    for (let i = 0; i < (taps || 0); i++) { await p.click('#hb'); await p.waitForTimeout(120); }
  };
}
Object.assign(SCREENS, {
  'vl-map': { run: async p => { await p.evaluate(() => { S.grade = 5; pathMap('math', PATHS.math.worlds.findIndex(w => w.id === 'm_volcano')); }); } },
  'vl-pv5-value': { run: vlShot('pv', 5, '^value of') },
  'vl-pv5-words': { run: vlShot('pv', 5, '^words') },
  'vl-pv6': { run: vlShot('pv', 6, '× 10\\^') },
  'vl-mbig5': { run: vlShot('mbig', 5, ' = \\?$') },
  'vl-dec3': { run: vlShot('dec', 3, '^\\d+\\.\\d+ \\+ ') },
  'vl-dec4': { run: vlShot('dec', 4, '^0\\.\\d+ × 0\\.\\d+') },
  'vl-dec5': { run: vlShot('dec', 5, ' ÷ 0\\.\\d') },
  'vl-dbig4': { run: vlShot('dbig', 4, ' ÷ ') },
  'vl-round4': { run: vlShot('round', 4, 'hundredth$') },
  'vl-ooo-eval': { run: vlShot('ooo', 1, ' = \\?$') },
  'vl-ooo-write': { run: vlShot('ooo', 1, '^write') },
  'vl-steps-dec4': { run: vlShot('dec', 4, '^\\d+\\.\\d+ × \\d+\\.\\d+', 2) },
  'vl-steps-dec5': { run: vlShot('dec', 5, '^\\d+\\.\\d+ ÷ \\d+ ', 2) },
  'vl-steps-mbig5': { run: vlShot('mbig', 5, ' = \\?$', 3) },
});

// o.hints gives that many hint tiers (straight through the puzzle, no cooldown), o.win shows the win card
function patShot(band, level, kind, o = {}) {
  return async p => {
    await p.evaluate(([band, level, kind, o]) => {
      S.grade = { A: 0, B: 1, C: 3, D: 5 }[band];
      window.say = () => {};
      let pz, i = -1;
      for (let s = 0; s < 80 && i < 0; s++) {
        pz = BT.make('pattern', band, level, { salt: s });
        i = pz.items.findIndex(it => it.k == kind && (!o.at || it.at.length >= o.at) && (!o.rule || it.rule == o.rule));
      }
      BT.st().cur = { id: 'pattern', band, level, puzzle: pz, state: { i, miss: 0, h: 0, x: [], g: [] }, hints: 0, sec: 0, day: today() };
      BT.start('pattern', band, level);
    }, [band, level, kind, o]);
    await p.waitForSelector('.pt-ch');
    if (o.wrong) {
      const w = await p.evaluate(() => { const it = S.bt.cur.puzzle.items[S.bt.cur.state.i]; return (it.a + 1) % it.ch.length; });
      await p.click(`.pt-ch[data-c="${w}"]`);
    }
    for (let h = 0; h < (o.hints || 0); h++) await p.evaluate(() => BT.act.inst.hint());
    if (o.win) { await p.evaluate(() => BT.win(BT.act, { mistakes: 0 })); await p.waitForTimeout(900); }
  };
}
Object.assign(SCREENS, {
  'bt-pat-levels': { run: async p => { await p.evaluate(() => { S.grade = 1; BT.levels('pattern'); }); } },
  'bt-pat-a-seq': { run: patShot('A', 1, 'seq') },
  'bt-pat-a-odd': { run: patShot('A', 9, 'odd', { hints: 2 }) },
  'bt-pat-a-grow': { run: patShot('A', 12, 'seq', { at: 2, wrong: true }) },
  'bt-pat-b-num': { run: patShot('B', 5, 'num', { wrong: true }) },
  'bt-pat-b-ana': { run: patShot('B', 9, 'ana', { hints: 2 }) },
  'bt-pat-b-seq': { run: patShot('B', 9, 'seq', { at: 2 }) },
  'bt-pat-b-odd': { run: patShot('B', 12, 'odd') },
  'bt-pat-c-mat': { run: patShot('C', 5, 'mat', { hints: 1, wrong: true }) },
  'bt-pat-c-num': { run: patShot('C', 9, 'num', { rule: 'alt' }) },
  'bt-pat-d-mat': { run: patShot('D', 9, 'mat', { hints: 3 }) },
  'bt-pat-d-seq': { run: patShot('D', 12, 'seq', { at: 3 }) },
  'bt-pat-d-num': { run: patShot('D', 5, 'num', { rule: 'inter', hints: 2 }) },
  'bt-pat-win': { run: patShot('C', 1, 'mat', { win: true }) },
});

// P3-08 Mazes: a level of each band with part of the winning walk already done (k cells of solve()), a hint, the win card
function mazeShot(band, level, k, after) {
  return async p => {
    await p.evaluate(([band, level, k]) => {
      window.say = () => {};
      S.grade = { A: 0, B: 2, C: 4, D: 6 }[band];
      const puzzle = BT.make('maze', band, level), route = BT.get('maze').solve(puzzle), items = puzzle.stars || puzzle.keys || [];
      const t = [];
      let m = 0;
      for (const c of route.slice(0, k + 1)) {
        if (t.length > 1 && t[t.length - 2] == c) t.pop(); else t.push(c);
        if (items.includes(c)) m |= 1 << items.indexOf(c);
      }
      S.bt = S.bt || {};
      S.bt.cur = { id: 'maze', band, level, puzzle, state: { t, m, dead: [], steps: k, mis: 0 }, hints: 0, sec: 75, day: today() };
      BT.start('maze', band, level);
    }, [band, level, k]);
    if (after) await after(p);
  };
}
Object.assign(SCREENS, {
  'bt-maze-hub': { run: async p => { await p.evaluate(() => { S.grade = 2; BT.hub(); }); } },
  'bt-maze-levels': { run: async p => { await p.evaluate(() => { S.grade = 2; BT.rec('maze', 'B', true).stars = [3, 2]; BT.rec('maze', 'B').lvl = 3; BT.levels('maze', 'B'); }); } },
  'bt-maze-a': { run: mazeShot('A', 1, 4) },
  'bt-maze-b': { run: mazeShot('B', 12, 14, async p => { await p.click('#bthint'); await p.waitForTimeout(300); await p.evaluate(() => { BT.act.cd = 0; $('#bthint').disabled = false; }); await p.click('#bthint'); }) },
  'bt-maze-c': { run: mazeShot('C', 8, 60) },
  'bt-maze-d': { run: mazeShot('D', 12, 90) },
  'bt-maze-hint': { run: mazeShot('B', 5, 6, async p => { await p.click('#bthint'); await p.waitForTimeout(400); }) },
  'bt-maze-pad': { run: mazeShot('C', 1, 10, async p => { await p.click('.mz-tog'); }) },
  'bt-maze-win': { run: mazeShot('A', 3, 99, async p => { await p.evaluate(() => BT.win(BT.act, { mistakes: 0 })); await p.waitForTimeout(900); }) },
});

// P2-12 Crystal Caves: a question of one level picked by its label (grade 5), optionally with the step hint open
function ccShot(sk, lv, want, hint) {
  return async p => {
    await p.evaluate(([sk, lv, want]) => {
      S.grade = 5; S.name = 'Ava'; S.buddy = 'Ben';
      window.say = () => {};
      start('math', NODES.math.findIndex(n => n.sk == sk && n.lv == lv));
      let q; for (let i = 1; i < 900; i++) { q = genQ(sk, lv, i); if (new RegExp(want).test(q.label)) break; }
      G.q = q; renderQ();
    }, [sk, lv, want]);
    if (hint) { await p.click('#hb'); await p.waitForTimeout(150); await p.click('#hb'); }
  };
}
Object.assign(SCREENS, {
  'cc-map': { run: async p => { await p.evaluate(() => { S.grade = 5; pathMap('math', PATHS.math.worlds.findIndex(w => w.id === 'm_caves')); }); } },
  'cc-fop3': { run: ccShot('fop', 3, '^fop3 .*simplest', true) },
  'cc-fop4': { run: ccShot('fop', 4, '^fop4 \\d \\d+/\\d+ −') },
  'cc-fop5': { run: ccShot('fop', 5, '^fop5 \\d+/\\d+ x \\d+/\\d+$') },
  'cc-fop6-split': { run: ccShot('fop', 6, '^fop6 1/') },
  'cc-fop6-bars': { run: ccShot('fop', 6, '^fop6 \\d / 1/') },
  'cc-geo4-cubes': { run: ccShot('geo', 4, '^geo4 cubes 4x4x') },
  'cc-geo4-vol': { run: ccShot('geo', 4, '^geo4 vol 1\\dx1\\dx') },
  'cc-geo4-join': { run: ccShot('geo', 4, '^geo4 join') },
  'cc-coord-tap': { run: ccShot('coord', 1, '^coord1 tap') },
  'cc-coord-read': { run: ccShot('coord', 1, '^coord1 read') },
  'cc-coord-dist': { run: ccShot('coord', 1, '^coord1 dist') },
  'cc-meas6': { run: ccShot('meas', 6, '^meas6 \\d+ hr to sec', true) },
  'cc-data4-total': { run: ccShot('data', 4, '^data4 total d=8') },
  'cc-data4-count': { run: ccShot('data', 4, '^data4 count') },
  'cc-pat5-rule': { run: ccShot('pat', 5, '^pat5 rule', true) },
  'cc-pat5-rel': { run: ccShot('pat', 5, '^pat5 relc') },
  'cc-story8-money': { run: ccShot('story', 8, '^story8 change') },
  'cc-story8-recipe': { run: ccShot('story', 8, '^story8 triple') },
});

// P2-16 tracing: one glyph of the Tiny Town stop (Pre-K), on the real round screen; setup(c) puts the board in a state
// (c = TR.cur; the demo is stopped first). trace-sheet: every glyph's strokes (guide, numbered start dots, arrows) over the
// Andika glyph at 30% opacity, scaled so its height spans the set's top and base lines (P2-17 checks its letters on it).
// P2-17: one sheet per set (trace-sheet digits, trace-upper-sheet A-Z, trace-lower-sheet a-z). Letters are scaled by one reference
// letter per set (H: capital height = top to base; h: ascender = top to base), so x-height letters and tails show where the
// font puts them against the mid and desc lines.
const traceShot = (key, setup, lv = 1) => ({
  fixture: 'fresh',
  run: async p => {
    await p.evaluate(([key, lv]) => {
      S.name = 'Ava'; setGrade(-1); window.say = () => {};
      let q = null;
      for (let s = 1; s < 4000 && !(q && q.g === key); s++) q = genQ('trace', lv, s);
      const path = lv == 1 ? 'math' : 'read';
      G = newG({ path, node: NODES[path].findIndex(n => n.sk == 'trace' && n.lv == lv), sk: 'trace', lv, n: 5, pool: [q] });
      next();
    }, [key, lv]);
    await p.waitForSelector('#trb');
    await p.waitForFunction(() => TR.cur && !TR.cur.busy, null, { timeout: 8000 });
    if (setup) await p.evaluate('(' + setup.toString() + ')(TR.cur)');
  },
});
const traceSheet = set => async p => {
  await p.evaluate(async set => {
    await document.fonts.ready;
    const cx = document.createElement('canvas').getContext('2d');
    cx.font = '700 100px Andika';
    const out = [], ref = { upper: 'H', lower: 'h' }[set];
    {
      const S0 = TRACE.sets[set], L = S0.lines;
      for (const key of S0.order) {
        const asc = cx.measureText(ref || key).actualBoundingBoxAscent / 100, fs = (L.base - L.top) / asc, geo = TR.geo(set, key);
        let g = `<text x="50" y="${L.base}" font-size="${fs.toFixed(1)}" text-anchor="middle" class="tsh-a">${key}</text>`;
        g += [L.top, L.mid, L.base, L.desc].filter(y => y != null).map(y => `<line class="tr-l" x1="0" x2="100" y1="${y}" y2="${y}"/>`).join('');
        geo.s.forEach(s => { g += `<path class="tr-dot" d="${s.d}"/>`; });
        geo.s.forEach((s, j) => {
          for (let x = 12; x < s.L - 6; x += 22) {
            const [px, py] = TR.at(s, x), [dx, dy] = TR.dir(s, x);
            g += `<g transform="translate(${px} ${py}) rotate(${Math.atan2(dy, dx) * 180 / Math.PI})"><path class="tr-arr" d="M-2.2 -3.2L1.8 0L-2.2 3.2"/></g>`;
          }
          g += `<g transform="translate(${s.p[0][0] + j * 3} ${s.p[0][1] + j * 3})"><circle class="tr-sdc" r="4.6"/><text class="tr-sdt sm" y="0.3">${j + 1}</text></g>`;
        });
        out.push(`<svg viewBox="0 0 100 100" class="tsh">${g}</svg>`);
      }
    }
    view(`<div class="s-${set == 'digit' ? 'math' : 'read'} tsh-w">${out.join('')}</div>`);
    const st = document.createElement('style');
    st.textContent = 'html,body,#app{height:auto!important;max-height:none!important;overflow:visible!important}.tsh-w{display:flex;flex-wrap:wrap;gap:8px;padding:8px;background:var(--paper)}.tsh{width:23%;max-width:220px;background:var(--surface);'
      + 'border-radius:12px;box-shadow:inset 0 0 0 2px var(--line)}.tsh-a{font-family:Andika;font-weight:700;fill:var(--ink);opacity:.3}';
    document.head.appendChild(st);
  }, set);
};
Object.assign(SCREENS, {
  // level 1 after the demo, the first stroke of 5 done (snapped on), arrows along stroke 2
  'trace-1': traceShot('5', c => { c.k = 1; TR.draw(c); }),
  // level 2 (dotted), the first part of the 8 traced and lifted: the dot waits where the finger stopped
  'trace-2': traceShot('8', c => { TR.startPass(c, 1); c.part = Math.round(c.geo.s[0].L * 0.45); TR.draw(c); }),
  // level 3 (start dot only), stroke 2 of the 4 after a miss: the dot pulses, arrows run along the stroke
  'trace-3': traceShot('4', c => { TR.startPass(c, 2); c.k = 1; c.sm = 1; c.misses = 1; c.arr = true; TR.draw(c); TR.pulse(c, true); }),
  // hint tier 1 (the pen draws the stroke), frozen at 60%
  'trace-hint': traceShot('2', c => {
    TR.stopAnim(c); TR.draw(c);
    const s = c.geo.s[0];
    document.querySelector('#trx').innerHTML = `<path class="tr-demo" d="${TR.partD(s, s.L * 0.6)}"/>`;
    TR.pen(TR.at(s, s.L * 0.6), true);
  }),
  // hint tier 2 at level 3: dotted stroke and the yellow ball to follow
  'trace-lead': traceShot('9', c => { TR.startPass(c, 2); TR.hintTier(c, 2); }),
  // the glyph done: every pass traced with one miss, 2 stars
  'trace-done': traceShot('7', c => { c.submit = () => {}; TR.startPass(c, 2); c.k = c.geo.s.length; TR.draw(c); c.misses = 1; TR.finish(c); }),
  'trace-sheet': { fixture: 'fresh', run: traceSheet('digit') },
  // P2-17: every letter's strokes over the Andika letter (look at them at 2x: SHOTS_SCALE=2)
  'trace-upper-sheet': { fixture: 'fresh', full: true, run: traceSheet('upper') },
  'trace-lower-sheet': { fixture: 'fresh', full: true, run: traceSheet('lower') },
  // P2-17 letter screens (ABC Beach, Pre-K, reading colour): level 1 of big E after the demo with strokes 1-2 done; level 2 of
  // little j with its stem traced (the dot to tap next); level 3 of little y with stroke 1 done and stroke 2 half traced
  'trace-letter-E': traceShot('E', c => { c.k = 2; TR.draw(c); }, 2),
  'trace-letter-j': traceShot('j', c => { TR.startPass(c, 1); c.k = 1; TR.draw(c); }, 3),
  'trace-letter-y': traceShot('y', c => { TR.startPass(c, 2); c.k = 1; c.part = Math.round(c.geo.s[1].L * 0.5); TR.draw(c); }, 3),
});

// P3-03 Sudoku: grade g sets the band, level lv is started, then by real taps (tools/lib/bt-sud.js): o.moves moves of solve(),
// o.notes pencil marks in the first empty squares, o.wrong one clashing entry, o.hint presses of Hint (cooldown skipped), o.win the rest
const SUD_TAPS = require('./lib/bt-sud');
const sudShot = (g, lv, o = {}) => ({
  run: async p => {
    await p.evaluate(([g, lv]) => { window.say = () => {}; S.grade = g; S.bt = {}; BT.start('sudoku', BT.band(), lv); }, [g, lv]);
    await p.waitForSelector('#btstage .sd');
    for (const m of (await SUD_TAPS.rest(p)).slice(0, o.moves || 0)) await SUD_TAPS.move(p, m);
    if (o.notes) {
      const free = await p.evaluate(() => { const p = S.bt.cur.puzzle, b = SD.vals(p, S.bt.cur.state || SD.fresh(p)); return b.map((v, c) => v ? -1 : c).filter(c => c >= 0); });
      await p.click('.sd-pad .k[data-k="notes"]');
      for (const [i, c] of free.slice(0, o.notes).entries()) {
        await p.click(`.sd-board .sd-c[data-c="${c}"]`);
        for (const v of [1 + i % 3, 4 + i % 2, 7]) if (await p.$(`.sd-pad .k[data-k="${v}"]`)) await p.click(`.sd-pad .k[data-k="${v}"]`);
      }
      await p.click('.sd-pad .k[data-k="notes"]');
    }
    if (o.wrong) await SUD_TAPS.wrong(p);
    for (let i = 0; i < (o.hint || 0); i++) {
      await p.evaluate(() => { BT.act.cd = 0; document.querySelector('#bthint').disabled = false; });
      await p.click('#bthint');
    }
    if (o.win) { for (const m of await SUD_TAPS.rest(p)) await SUD_TAPS.move(p, m); await p.waitForTimeout(1600); }
    if (o.sel != null) await p.click(`.sd-board .sd-c[data-c="${o.sel}"]`);
  },
});
Object.assign(SCREENS, {
  'bt-sud-hub': { run: async p => { await p.evaluate(() => { S.grade = 5; BT.hub(); }); } },
  'bt-sud-a': sudShot(0, 1, { moves: 3, wrong: true }),
  'bt-sud-b': sudShot(1, 9, { moves: 2, hint: 2 }),
  'bt-sud-c': sudShot(3, 6, { moves: 6, notes: 3, wrong: true }),
  'bt-sud-d': sudShot(5, 1, { moves: 10, notes: 2, wrong: true }),
  'bt-sud-d-hint': sudShot(5, 10, { moves: 4, hint: 2 }),
  'bt-sud-win': sudShot(1, 1, { win: true }),
});

// P2-13 Sky City: a question of one level picked by its label (grade 6), optionally with the step hint open (hint = taps of Next step)
function skyShot(sk, lv, want, hint = 0) {
  return async p => {
    await p.evaluate(([sk, lv, want]) => {
      S.grade = 6; S.name = 'Ava'; S.buddy = 'Ben';
      window.say = () => {};
      start('math', NODES.math.findIndex(n => n.sk == sk && n.lv == lv));
      let q; for (let i = 1; i < 900; i++) { q = genQ(sk, lv, i); if (new RegExp(want).test(q.label)) break; }
      G.q = q; renderQ();
    }, [sk, lv, want]);
    for (let i = 0; i < hint; i++) { await p.click('#hb'); await p.waitForTimeout(150); }
    if (hint) await p.waitForTimeout(500);
  };
}
Object.assign(SCREENS, {
  'sky-map': { run: async p => { await p.evaluate(() => { S.grade = 6; pathMap('math', PATHS.math.worlds.findIndex(w => w.id === 'm_sky')); }); } },
  'sky-ratio1-dots': { run: skyShot('ratio', 1, '^ratio1 dots') },
  'sky-ratio1-table': { run: skyShot('ratio', 1, '^ratio1 tbl', 2) },
  'sky-ratio2-buy': { run: skyShot('ratio', 2, '^ratio2 buy') },
  'sky-ratio2-unit': { run: skyShot('ratio', 2, '^ratio2 unit', 1) },
  'sky-ratio3': { run: skyShot('ratio', 3, '^ratio3 whole 35', 1) },
  'sky-ratio4-match': { run: skyShot('ratio', 4, '^ratio4 match fp') },
  'sky-ratio4-pf': { run: skyShot('ratio', 4, '^ratio4 pf') },
  'sky-int1-tap': { run: skyShot('int', 1, '^int1 tap') },
  'sky-int1-order': { run: skyShot('int', 1, '^int1 ord') },
  'sky-int1-cmp': { run: skyShot('int', 1, '^int1 cmp') },
  'sky-int2-dist': { run: skyShot('int', 2, '^int2 dist -') },
  'sky-int2-abs': { run: skyShot('int', 2, '^int2 abs -1') },
  'sky-int3': { run: skyShot('int', 3, '^int3 -\\d+ \\+ \\d+$', 3) },
  'sky-fop7-mixed': { run: skyShot('fop', 7, '^fop7 \\d \\d/\\d / \\d/\\d$', 1) },
  'sky-fop7': { run: skyShot('fop', 7, '^fop7 \\d/\\d / \\d/\\d$') },
});

// P3-05 MathDoku: grade g sets the band, level lv is started, then by real taps (tools/lib/bt-md.js): o.moves moves of solve(),
// o.notes pencil marks in the first empty squares, o.clash one number already in its row or column, o.miss one cage filled so it
// misses its number, o.hint presses of Hint (cooldown skipped), o.win the rest
const MD_TAPS = require('./lib/bt-md');
const mdShot = (g, lv, o = {}) => ({
  run: async p => {
    await p.evaluate(([g, lv]) => { window.say = () => {}; S.grade = g; S.bt = {}; BT.start('mdoku', BT.band(), lv); }, [g, lv]);
    await p.waitForSelector('#btstage .md');
    for (const m of (await MD_TAPS.rest(p)).slice(0, o.moves || 0)) await MD_TAPS.move(p, m);
    if (o.notes) {
      const free = await p.evaluate(() => { const p = S.bt.cur.puzzle, b = MD.vals(p, S.bt.cur.state || MD.fresh(p)); return b.map((v, c) => v ? -1 : c).filter(c => c >= 0); });
      await p.click('.md-pad .k[data-k="notes"]');
      for (const [i, c] of free.slice(0, o.notes).entries()) {
        await p.click(`.md-grid .md-c[data-c="${c}"]`);
        for (const v of [1 + i % 2, 3, 4 + i % 2]) if (await p.$(`.md-pad .k[data-k="${v}"]`)) await p.click(`.md-pad .k[data-k="${v}"]`);
      }
      await p.click('.md-pad .k[data-k="notes"]');
    }
    if (o.miss) await MD_TAPS.miss(p);
    if (o.clash) await MD_TAPS.clash(p);
    for (let i = 0; i < (o.hint || 0); i++) {
      await p.evaluate(() => { BT.act.cd = 0; document.querySelector('#bthint').disabled = false; });
      await p.click('#bthint');
    }
    if (o.win) { for (const m of await MD_TAPS.rest(p)) await MD_TAPS.move(p, m); await p.waitForTimeout(1600); }
  },
});
Object.assign(SCREENS, {
  'bt-md-hub': { run: async p => { await p.evaluate(() => { S.grade = 3; BT.levels('mdoku'); }); } },
  'bt-md-b': mdShot(1, 1, { moves: 1, clash: true }),
  'bt-md-c': mdShot(3, 6, { moves: 3, notes: 2, miss: true }),
  'bt-md-d5': mdShot(5, 4, { moves: 5, clash: true }),
  'bt-md-d6': mdShot(5, 10, { moves: 8, notes: 2, miss: true }),
  'bt-md-hint': mdShot(5, 8, { moves: 3, hint: 2 }),
  'bt-md-win': mdShot(1, 3, { win: true }),
});

// P3-07 Logic grids: grade g sets the band, level lv is started, then by real taps (tools/lib/bt-lg.js): o.moves ticks of solve(),
// o.wrong one mark that breaks a clue, o.hint presses of Hint (cooldown skipped), o.used clues struck through, o.win the rest
const LG_TAPS = require('./lib/bt-lg');
const lgShot = (g, lv, o = {}) => ({
  run: async p => {
    await p.evaluate(([g, lv]) => { window.say = () => {}; S.grade = g; S.bt = {}; BT.start('logic', BT.band(), lv); }, [g, lv]);
    await p.waitForSelector('#btstage .lg');
    for (const c of (await LG_TAPS.rest(p)).slice(0, o.moves || 0)) await LG_TAPS.setTo(p, c, '1');
    for (let i = 0; i < (o.used || 0); i++) await p.click(`.lg-qb[data-q="${i}"]`);
    if (o.wrong) await LG_TAPS.wrong(p);
    for (let i = 0; i < (o.hint || 0); i++) {
      await p.evaluate(() => { BT.act.cd = 0; document.querySelector('#bthint').disabled = false; });
      await p.click('#bthint');
    }
    if (o.win) { for (const c of await LG_TAPS.rest(p)) await LG_TAPS.setTo(p, c, '1'); await p.waitForTimeout(1600); }
  },
});
Object.assign(SCREENS, {
  'bt-lg-b': lgShot(1, 2, { moves: 1, used: 1 }),
  'bt-lg-c': lgShot(3, 6, { moves: 2, wrong: true, used: 1 }),
  'bt-lg-d': lgShot(5, 10, { moves: 3, wrong: true, used: 2 }),
  'bt-lg-d-hint': lgShot(5, 4, { moves: 2, hint: 2 }),
  'bt-lg-win': lgShot(5, 1, { win: true }),
});

// P2-14 Galaxy Core (the shots are looked at at 380x780: SHOTS_SIZES=380x780 node tools/shots.js gal-map ...)
Object.assign(SCREENS, {
  'gal-map': { run: async p => { await p.evaluate(() => { S.grade = 6; pathMap('math', PATHS.math.worlds.findIndex(w => w.id === 'm_galaxy')); }); } },
  'gal-ooo2': { run: skyShot('ooo', 2, '^8 × 7\\^2|^\\d+ × \\d+\\^2 \\+ \\(') },
  'gal-ooo3': { run: skyShot('ooo', 3, '^\\d[a-z] \\+ \\d+, [a-z] = \\d+$', 1) },
  'gal-alg1': { run: skyShot('alg', 1, '^alg1 [a-z] \\+ \\d+ = \\d+$', 1) },
  'gal-alg2': { run: skyShot('alg', 2, '^alg2 \\d+[a-z] = ') },
  'gal-alg3-eq': { run: skyShot('alg', 3, '^alg3 \\d+[a-z] [+−] ', 2) },
  'gal-alg3-line': { run: skyShot('alg', 3, '^alg3 line x > -') },
  'gal-alg3-name': { run: skyShot('alg', 3, '^alg3 name x < ') },
  'gal-geo5-tri': { run: skyShot('geo', 5, '^geo5 tri') },
  'gal-geo5-par': { run: skyShot('geo', 5, '^geo5 par \\d+ \\d+ [1-9]') },
  'gal-geo5-trap': { run: skyShot('geo', 5, '^geo5 trap', 2) },
  'gal-coord2-tap': { run: skyShot('coord', 2, '^coord2 tap -') },
  'gal-coord2-read': { run: skyShot('coord', 2, '^coord2 read -\\d,-\\d') },
  'gal-coord2-quad': { run: skyShot('coord', 2, '^coord2 quad pic') },
  'gal-coord2-reflect': { run: skyShot('coord', 2, '^coord2 reflect y', 1) },
  'gal-coord2-reflect-tap': { run: skyShot('coord', 2, '^coord2 reflect-tap') },
  'gal-fact3-gcf': { run: skyShot('fact', 3, '^fact3 gcf-w', 2) },
  'gal-fact3-lcm': { run: skyShot('fact', 3, '^fact3 lcm \\d+ \\d+$') },
  'gal-data5-plot': { run: skyShot('data', 5, '^data5 mean .* plot$') },
  'gal-data5-list': { run: skyShot('data', 5, '^data5 median [\\d,]+$', 1) },
  'gal-story9-pct': { run: skyShot('story', 9, '^story9 pct sale', 2) },
  'gal-story9-ratio': { run: skyShot('story', 9, '^story9 ratio') },
  'gal-story9-eq': { run: skyShot('story', 9, '^story9 eq money', 1) },
});

// P3-14 Riddles, Memory Match, Copy Cat: grade g sets the band, level lv is started, then real taps (tools/lib/bt-p314.js).
// rd: o.wrong one wrong choice, o.hint hint presses (cooldown skipped), o.win every riddle answered.
// mm: o.pairs pairs matched, o.miss two cards that do not match left up, o.one one card left up, o.hint hint presses, o.win.
// cc: o.rounds rounds played, o.taps taps into the next round, o.lit a pad shown lit, o.wrong a wrong pad, o.hint, o.win.
const P314 = require('./lib/bt-p314');
const p314Start = (id, g, lv) => async p => {
  await p.evaluate(([id, g, lv]) => { window.say = () => {}; S.grade = g; S.bt = {}; BT.start(id, BT.band(), lv); }, [id, g, lv]);
};
const p314Hint = async (p, n) => {
  for (let i = 0; i < n; i++) {
    await p.evaluate(() => { BT.act.cd = 0; document.querySelector('#bthint').disabled = false; });
    await p.click('#bthint');
    await p.waitForTimeout(60);
  }
};
const riddleShot = (g, lv, o = {}) => ({
  run: async p => {
    await p314Start('riddle', g, lv)(p);
    await p.waitForSelector('.rd-ch');
    if (o.win) {
      for (let i = 0; i < 3; i++) { await p.waitForSelector('.rd-ch:not([disabled])'); await P314.rdTap(p, (await P314.rdNow(p)).a); await p.waitForTimeout(260); }
      await p.waitForTimeout(1200);
      return;
    }
    if (o.wrong) await P314.rdTap(p, (await P314.rdNow(p)).wrong);
    await p314Hint(p, o.hint || 0);
  },
});
const memShot = (g, lv, o = {}) => ({
  run: async p => {
    await p314Start('memory', g, lv)(p);
    await p.waitForSelector('.mm-c');
    const rest = await P314.mmRest(p);
    for (const [a, b] of rest.slice(0, o.win ? 99 : o.pairs || 0)) { await P314.mmTap(p, a); await P314.mmTap(p, b); }
    if (o.win) { await p.waitForTimeout(1200); return; }
    if (o.miss) { const m = await P314.mmMiss(p); await P314.mmTap(p, m[0]); await P314.mmTap(p, m[1]); await p.evaluate(() => BT.act.inst.destroy()); }
    if (o.one) { const r = await P314.mmRest(p); await P314.mmTap(p, r[0][0]); }
    await p314Hint(p, o.hint || 0);
    if (o.hint) await p.evaluate(() => BT.act.inst.destroy()); // the peek stays up for the shot
  },
});
const copyShot = (g, lv, o = {}) => ({
  run: async p => {
    await p314Start('copycat', g, lv)(p);
    await p.waitForSelector('.cc-pad');
    if (o.win) { await P314.ccWin(p); await p.waitForTimeout(1300); return; }
    for (let r = 0; r < (o.rounds || 0); r++) {
      const t = await P314.ccTapRound(p);
      await p.waitForFunction(r => BT.act.inst.now().r > r, t.now.r);
    }
    if (o.taps) await P314.ccTapRound(p, o.taps);
    if (o.wrong) {
      const t = await P314.ccTurn(p);
      await p.click(`.cc-pad[data-p="${(t.want[0] + 1) % (await p.evaluate(() => S.bt.cur.puzzle.pads))}"]`);
      await p.evaluate(() => { BT.act.inst.destroy(); document.querySelectorAll('.cc-pad.on').forEach(b => b.classList.remove('on')); }); // hold still for the shot
    }
    for (let h = 0; h < (o.hint || 0); h++) { await P314.ccTurn(p); await p314Hint(p, 1); }
    if (o.lit != null) await P314.ccTurn(p);
    if (o.lit != null) await p.evaluate(i => { document.querySelector(`.cc-pad[data-p="${i}"]`).classList.add('on'); document.querySelector('.cc-msg').textContent = 'Watch me!'; }, o.lit);
  },
});
Object.assign(SCREENS, {
  'bt-p314-hub': { run: async p => { await p.evaluate(() => { S.grade = 1; BT.hub(); document.querySelector('[data-t="riddle"]').scrollIntoView({ block: 'center' }); }); } },
  'bt-rd-a': riddleShot(0, 1),
  'bt-rd-b': riddleShot(1, 4, { wrong: true, hint: 1 }),
  'bt-rd-c': riddleShot(3, 5, { hint: 2 }),
  'bt-rd-d': riddleShot(5, 3, { wrong: true, hint: 3 }),
  'bt-rd-win': riddleShot(5, 2, { win: true }),
  'bt-mm-a': memShot(0, 1, { pairs: 1, one: true }),
  'bt-mm-a-abc': memShot(0, 10, { pairs: 2 }),
  'bt-mm-b': memShot(1, 1, { pairs: 2, miss: true }),
  'bt-mm-b-word': memShot(1, 5, { pairs: 3, one: true }),
  'bt-mm-c': memShot(3, 1, { pairs: 3, miss: true }),
  'bt-mm-c-es': memShot(3, 5, { pairs: 4, one: true }),
  'bt-mm-d': memShot(5, 1, { pairs: 4, miss: true }),
  'bt-mm-d-fdp': memShot(5, 5, { pairs: 6, one: true }),
  'bt-mm-d-root': memShot(5, 9, { pairs: 5, hint: 2 }),
  'bt-mm-win': memShot(3, 9, { win: true }),
  'bt-cc-a': copyShot(0, 1, { rounds: 1, lit: 2 }),
  'bt-cc-b': copyShot(1, 5, { rounds: 1, taps: 1, hint: 2 }),
  'bt-cc-c': copyShot(3, 1, { rounds: 1, wrong: true }),
  'bt-cc-d': copyShot(5, 5, { rounds: 1, taps: 1 }),
  'bt-cc-win': copyShot(1, 1, { win: true }),
});

// P3-11 Tangrams: grade g sets the band, level lv starts with o.placed of solve()'s moves already made (a saved state); o.wrong puts
// the next piece on the board turned and off its place; o.sel picks the next tray piece; o.hint presses Hint (cooldown skipped);
// o.win places all but the last piece and lets hint 3 finish it (the win card). bt-tg-sheet (also `tangram`, BRAIN_TEASERS 5.7):
// every puzzle of the bank, its silhouette and its solution, for checking new puzzles.
const tgShot = (g, lv, o = {}) => ({
  run: async p => {
    await p.evaluate(([g, lv, o]) => {
      window.say = () => {};
      S.grade = g;
      S.bt = {};
      const band = BT.band(), puzzle = BT.make('tangram', band, lv), st = TG.fresh(puzzle), moves = TG.solve(puzzle);
      const n = o.win ? moves.length - 1 : o.placed || 0;
      for (const [i, k, f, x, y] of moves.slice(0, n)) st.pc[i] = [k, f, x, y];
      if (o.wrong && moves[n]) { const [i, k, f, x, y] = moves[n]; st.pc[i] = [(k + 1) % 8, f, x + 0.4, y + 0.2]; }
      S.bt.cur = { id: 'tangram', band, level: lv, puzzle, state: st, hints: 0, sec: 40, day: today() };
      BT.start('tangram', band, lv);
    }, [g, lv, o]);
    await p.waitForSelector('.tg-pc .tg-bs');
    await p.waitForTimeout(200);
    if (o.sel) {
      const q = await p.evaluate(() => { const i = TG.movable(TG.cur.p).find(j => TG.cur.st().pc[j].length == 2); return TG.cur.at(i); });
      await p.mouse.click(q.x, q.y);
    }
    for (let i = 0; i < (o.hint || 0) + (o.win ? 3 : 0); i++) {
      await p.evaluate(() => { BT.act.cd = 0; document.querySelector('#bthint').disabled = false; });
      await p.click('#bthint');
    }
    if (o.win) await p.waitForSelector('.bt-win #btnext', { timeout: 8000 });
  },
});
const tgSheet = {
  full: true,
  run: async p => {
    await p.evaluate(() => {
      const card = (e, n) => {
        const pc = e.pcs.map((q, i) => TG.xnorm(TG.KIND[i], ...q));
        const pls = pc.map((q, i) => TG.poly(TG.KIND[i], q[0], q[1], TG.num(q[2]), TG.num(q[3]))), all = pls.flat();
        const x0 = Math.min(...all.map(q => q[0])), y0 = Math.min(...all.map(q => q[1]));
        const w = Math.max(...all.map(q => q[0])) - x0, h = Math.max(...all.map(q => q[1])) - y0, u = 150 / Math.max(w, h, 6);
        const P = q => [(q[0] - x0) * u + 8, (q[1] - y0) * u + 8], pts = a => a.map(q => P(q).map(v => v.toFixed(1)).join(',')).join(' ');
        const d = TG.outline(pls).map(l => 'M' + l.map(q => P(q).map(v => v.toFixed(1)).join(' ')).join('L') + 'Z').join('');
        const vb = `0 0 ${(w * u + 16).toFixed(0)} ${(h * u + 16).toFixed(0)}`;
        const sil = `<svg viewBox="${vb}" width="${(w * u + 16).toFixed(0)}"><path class="tg-sb" d="${d}"/><path class="tg-se" d="${d}"/></svg>`;
        const sol = `<svg viewBox="${vb}" width="${(w * u + 16).toFixed(0)}">${pls.map((a, i) => `<g class="tg-pc tg-c${i}"><polygon class="tg-ld" points="${pts(a.map(q => [q[0], q[1] + 0.05]))}"/>` +
          `<polygon class="tg-bs" points="${pts(a)}"/></g>`).join('')}</svg>`;
        return `<div style="display:flex;flex-direction:column;gap:6px;padding:10px;border-radius:16px;background:var(--surface);box-shadow:inset 0 0 0 2px var(--line)">` +
          `<b style="font-family:var(--font-display);font-size:18px">${n + 1}. ${esc(e.name)} <small style="color:var(--ink-3)">${esc(e.id)}, ${w.toFixed(1)} x ${h.toFixed(1)}</small></b>` +
          `<div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap">${sil}${sol}</div><small>${esc(e.say)}</small></div>`;
      };
      view(`<div class="tgs" style="padding:12px;display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:12px">${PUZ.tangram.map(card).join('')}</div>`);
      for (const e of [document.documentElement, document.body, document.querySelector('#app')]) { e.style.height = 'auto'; e.style.overflow = 'visible'; }
    });
  },
};
Object.assign(SCREENS, {
  'bt-tg-levels': { run: async p => { await p.evaluate(() => { S.grade = 3; BT.rec('tangram', 'C', true).stars = [3, 2, 1]; BT.rec('tangram', 'C').lvl = 4; BT.levels('tangram', 'C'); }); } },
  'bt-tg-a': tgShot(0, 1),
  'bt-tg-a-turn': tgShot(0, 9, { placed: 0, sel: true }),
  'bt-tg-b': tgShot(1, 7, { placed: 2 }),
  'bt-tg-c': tgShot(3, 5, { placed: 3, wrong: true }),
  'bt-tg-d': tgShot(5, 8),
  'bt-tg-hint': tgShot(5, 4, { placed: 2, hint: 2 }),
  'bt-tg-win': tgShot(3, 2, { win: true }),
  'bt-tg-sheet': tgSheet,
  tangram: tgSheet,
});

// P3-13 Robot Path: grade g sets the band, level lv is started, then by real taps (tools/lib/bt-rb.js): o.build the first tokens of
// solve() (o.fn: and the function), o.bump a program that bumps and Go, o.go Go on what is there, o.hint presses of Hint (cooldown
// skipped), o.win the whole of solve() and Go
const RB_TAPS = require('./lib/bt-rb');
const rbShot = (g, lv, o = {}) => ({
  run: async p => {
    await p.evaluate(([g, lv]) => { window.say = () => {}; S.grade = g; S.bt = {}; BT.rec('robot', BT.band(), true).lvl = lv; BT.start('robot', BT.band(), lv); }, [g, lv]);
    await p.waitForSelector('#btstage .rb');
    const sol = await p.evaluate(() => BT.get('robot').solve(RB.cur.p));
    if (o.bump) { await RB_TAPS.bump(p); await RB_TAPS.go(p); }
    if (o.build) await RB_TAPS.build(p, { m: sol.m.slice(0, o.build), f: o.fn ? sol.f : [] });
    if (o.go) await RB_TAPS.go(p);
    for (let i = 0; i < (o.hint || 0); i++) {
      await p.evaluate(() => { BT.act.cd = 0; document.querySelector('#bthint').disabled = false; });
      await p.click('#bthint');
    }
    if (o.win) { await RB_TAPS.build(p, sol); await RB_TAPS.go(p); await p.waitForTimeout(1600); }
  },
});
Object.assign(SCREENS, {
  'bt-rb-hub': { run: async p => { await p.evaluate(() => { S.grade = 3; BT.levels('robot'); }); } },
  'bt-rb-a': rbShot(0, 8, { build: 2 }),
  'bt-rb-b': rbShot(1, 10, { build: 6, go: true }),
  'bt-rb-c': rbShot(3, 9, { build: 4 }),
  'bt-rb-d': rbShot(5, 4, { build: 9 }),
  'bt-rb-f': rbShot(5, 11, { build: 6, fn: true }),
  'bt-rb-bump': rbShot(3, 4, { bump: true }),
  'bt-rb-hint': rbShot(3, 7, { build: 3, hint: 2 }),
  'bt-rb-win': rbShot(0, 2, { win: true }),
});

// P3-16 Spatial: Cube Count, Turn It, Mirror. Grade g sets the band, level lv is started, then real taps (tools/lib/bt-p316.js).
// cb: o.done stacks answered, o.wrong a wrong number, o.typed digits typed, o.hint hint presses, o.win every stack answered.
// ro: o.done shapes answered, o.wrong a wrong choice ('flip' the mirror image), o.hint, o.win.   mr: o.fill twins filled, o.wrong, o.hint, o.win.
const P316 = require('./lib/bt-p316');
const spShot = (id, g, lv, o = {}) => ({
  run: async p => {
    await p314Start(id, g, lv)(p);
    if (id == 'cubes') {
      await p.waitForSelector('.cb-pad');
      if (o.win) { await P316.cbWin(p); await p.waitForTimeout(1300); return; }
      for (let i = 0; i < (o.done || 0); i++) {
        const t = await P316.cbNow(p);
        await P316.cbType(p, t.n);
        await p.waitForFunction(i => S.bt.cur.state && S.bt.cur.state.i > i && !document.querySelector('.cb-box.ok'), t.i);
      }
      if (o.wrong) await P316.cbType(p, (await P316.cbNow(p)).n - 2);
      await p314Hint(p, o.hint || 0);
      if (o.typed) for (const d of String(o.typed)) await p.click(`.cb-pad .k[data-k="${d}"]`);
    } else if (id == 'rotate') {
      await p.waitForSelector('.ro-ch');
      if (o.win) { await P316.roWin(p); await p.waitForTimeout(1300); return; }
      for (let i = 0; i < (o.done || 0); i++) {
        const t = await P316.roNow(p);
        await P316.roTap(p, t.a);
        await p.waitForFunction(i => S.bt.cur.state && S.bt.cur.state.i > i && !document.querySelector('.ro-ch.right'), t.i);
      }
      if (o.wrong) { const t = await P316.roNow(p); await P316.roTap(p, o.wrong == 'flip' && t.flip != null ? t.flip : t.wrong); }
      await p314Hint(p, o.hint || 0);
    } else {
      await p.waitForSelector('.mr-cell.t');
      if (o.win) { await P316.mrFill(p); await p.waitForTimeout(1300); return; }
      await P316.mrFill(p, o.fill || 0);
      if (o.wrong) { await P316.mrTap(p, (await P316.mrNow(p)).wrong); await p.waitForTimeout(150); }
      await p314Hint(p, o.hint || 0);
    }
  },
});
Object.assign(SCREENS, {
  'bt-sp-hub': { run: async p => { await p.evaluate(() => { S.grade = 3; BT.hub(); document.querySelector('[data-t="cubes"]').scrollIntoView({ block: 'center' }); }); } },
  'bt-sp-levels': { run: async p => { await p.evaluate(() => { S.grade = 3; S.bt = {}; BT.levels('rotate'); }); } },
  'bt-cb-b': spShot('cubes', 1, 9, { typed: 6 }),
  'bt-cb-c': spShot('cubes', 3, 6, { done: 1, wrong: true }),
  'bt-cb-c-hint': spShot('cubes', 3, 10, { hint: 2 }),
  'bt-cb-d': spShot('cubes', 5, 12, { hint: 3 }),
  'bt-cb-win': spShot('cubes', 4, 3, { win: true }),
  'bt-ro-a': spShot('rotate', 0, 2),
  'bt-ro-a-turn': spShot('rotate', 0, 10, { wrong: true }),
  'bt-ro-b': spShot('rotate', 1, 5, { done: 1, wrong: true }),
  'bt-ro-c': spShot('rotate', 3, 4, { wrong: 'flip' }),
  'bt-ro-c-hint': spShot('rotate', 3, 9, { hint: 2 }),
  'bt-ro-d': spShot('rotate', 5, 10, { done: 2, hint: 3 }),
  'bt-ro-win': spShot('rotate', 2, 6, { win: true }),
  'bt-mr-b': spShot('mirror', 1, 6, { fill: 2, wrong: true }),
  'bt-mr-c-h': spShot('mirror', 3, 2, { fill: 3, hint: 1 }),
  'bt-mr-c-d': spShot('mirror', 4, 7, { fill: 4, hint: 2 }),
  'bt-mr-d': spShot('mirror', 5, 11, { fill: 5, hint: 3 }),
  'bt-mr-win': spShot('mirror', 6, 5, { win: true }),
});

// P3-17 Puzzle of the Day and badges (midway save, a 3rd grader). dailySeed gives some puzzle work: Sudoku band C all 12 levels,
// two maze levels, one pattern level (badges first Sudoku, first Mazes, first Patterns, Sudoku 3-4, 10 puzzles).
const dailySeed = () => {
  S.grade = 3;
  S.bt = { sudoku: { C: { lvl: 13, stars: [3, 3, 2, 3, 3, 3, 1, 2, 3, 3, 3, 2], endless: 0 } }, maze: { C: { lvl: 3, stars: [3, 2], endless: 0 } },
    pattern: { B: { lvl: 2, stars: [3], endless: 0 } }, badges: { got: {}, n: 15, dd: { day: '', n: 0, best: 4 } } };
  BT.badgeCheck();
  save();
};
const dailyFake = async p => { // the fake type as today's pick, so the shot can win it with one call
  await p.evaluate('(' + BTF.install.toString() + ')()');
  await p.evaluate(() => { S.grade = 3; S.bt = { daily: { day: today(), done: [], pick: { id: 'zzfake', band: 'C', level: 1 } } }; save(); });
};
Object.assign(SCREENS, {
  'bt-daily-home': { run: async p => { await p.evaluate(() => { S.grade = 3; home(); document.querySelector('#hmday').scrollIntoView({ block: 'center' }); }); } },
  'bt-daily-done': { run: async p => {
    await p.evaluate(() => { S.grade = 3; const d = BT.dailyInfo(); S.bt.daily.done = [d.id]; home(); document.querySelector('#hmday').scrollIntoView({ block: 'center' }); });
  } },
  'bt-daily-hub': { run: async p => { await p.evaluate(dailySeed); await p.evaluate(() => BT.hub()); } },
  'bt-daily-win': { run: async p => {
    await dailyFake(p);
    await p.evaluate(() => { BT.start('zzfake', 'C', 1); BT.win(BT.act, { mistakes: 0 }); });
    await p.waitForTimeout(1600);
  } },
  // a save from before badges with three Sudoku levels solved: opening the hub reveals the badge they already earned
  'bt-daily-sheet': { run: async p => { await p.evaluate(() => { S.grade = 3; S.bt = { sudoku: { C: { lvl: 4, stars: [3, 3, 2], endless: 0 } } }; BT.hub(); }); await p.waitForTimeout(1200); } },
  'bt-daily-offer': { run: async p => { await p.evaluate(() => { S.grade = 3; BT.levels('pattern', 'C'); BT.offer = { id: 'pattern', band: 'B', level: 4, from: 'C' }; BT.offerLower(); }); } },
  'bt-daily-bar': { run: async p => { await p.evaluate(() => { S.grade = 5; S.bt = {}; BT.start('target', 'D', 1); BT.act.run.sec = 3599; }); await p.waitForTimeout(1300); } },
  'bt-badges': { run: async p => { await p.evaluate(dailySeed); await p.evaluate(() => BT.badgeView()); } },
});

// ---- P4-09 map and world scenes ----
// scenes: a sheet of every world's scene (the top of its band with its first four stops, trail and title, drawn by the real SCN code
// at a phone width of 340 px), grouped by path. Full page; look at it at 2x (SHOTS_SCALE=2 SHOTS_SIZES=1024x600).
// scene-<path>: each path's real map at the world the child is on; map-*-top: the top of a picked world (title, Test out, landmark).
Object.assign(SCREENS, {
  scenes: {
    full: true,
    run: async p => {
      await p.evaluate(() => {
        const W = 340, amp = W * .3;
        const card = (p, wi) => {
          const w = PATHS[p].worlds[wi], [a, b] = WR[p][wi];
          const pts = [];
          for (let i = a; i <= Math.min(b, a + 3); i++) pts.push([W / 2 + Math.sin(i * 1.15) * amp, 86 + (i - a) * 106, i]);
          const h = 86 + pts.length * 106 - 24;
          const stops = pts.map(([x, y, i]) => [x, y, NODES[p][i].t, NODES[p][i].sk == 'boss', false]);
          const nodes = pts.map(([x, y, i], k) => {
            const n = NODES[p][i], s = nInfo(n);
            return `<button class="btn node s-${p} ${s.area} ${k < 2 ? 'done' : k == 2 ? 'cur' : 'lock'}" style="left:${x}px;top:${y}px">${nodeFace(n, k > 2)}</button>` +
              `<div class="nlab" style="left:${x}px;top:${y + 42}px">${esc(n.t)}<div class="nstar">${k < 2 ? UI.stars(3 - k, 3, 16) : ''}</div></div>`;
          }).join('');
          return `<div class="scs-c"><div class="map" style="height:${h + 10}px;width:${W}px">` +
            SCN.band(w, W, 0, h, { test: false, stops, trail: SCN.trailPts(pts), pet: null }) +
            `<div class="wtitle" style="top:14px">${wBadge(p, wi)}<span>${esc(w.n)}</span></div>` +
            SCN.trail(W, h, pts, 3, []) + nodes + `</div><div class="scs-n">${p} ${wi + 1}: ${w.id} (${(SCN.theme(w) || {}).key})</div></div>`;
        };
        const all = Object.keys(PATHS).flatMap(p => PATHS[p].worlds.map((w, wi) => card(p, wi))).join('');
        view(`<style>.scs{display:flex;flex-wrap:wrap;gap:12px;padding:8px}.scs-c{width:340px}.scs .map{margin:0}
          .scs-n{font-size:var(--fs-1);color:var(--ink-2);padding:2px 4px}#app,html,body{height:auto;overflow:visible}</style>
          <div class="top"><div class="title">World scenes (${PATHS.math.worlds.length + PATHS.read.worlds.length + PATHS.es.worlds.length + PATHS.disc.worlds.length})</div></div>
          <div class="scs">${all}</div>`);
      });
    },
  },
  'scene-math': { run: async p => { await p.evaluate(() => pathMap('math')); } },
  'scene-read': { run: async p => { await p.evaluate(() => pathMap('read')); } },
  'scene-es': { run: async p => { await p.evaluate(() => pathMap('es')); } },
  'scene-disc': { run: async p => { await p.evaluate(() => { S.grade = 4; pathMap('disc'); }); } },
  'scene-top': { run: async p => { await p.evaluate(() => pathMap('math', 6)); } },
  'scene-space': { run: async p => { await p.evaluate(() => pathMap('read', 4)); } },
});


// P3-12 Shape Fit: grade g sets the band, level lv starts with o.placed of solve()'s moves already made (a saved state); o.wrong puts
// the next piece on the board turned and one square off; o.sel picks the next tray piece; o.hint presses Hint (cooldown skipped);
// o.win places all but the last piece and lets hint 3 finish it (the win card).
const sfShot = (g, lv, o = {}) => ({
  run: async p => {
    await p.evaluate(([g, lv, o]) => {
      window.say = () => {};
      S.grade = g;
      S.bt = {};
      const band = BT.band(), puzzle = BT.make('fit', band, lv), st = SF.fresh(puzzle), moves = SF.solve(puzzle);
      const n = o.win ? moves.length - 1 : o.placed || 0;
      for (const [i, r, f, x, y] of moves.slice(0, n)) st.pc[i] = [r, f, x, y];
      if (o.wrong && moves[n]) { const [i, r, f, x, y] = moves[n]; st.pc[i] = [puzzle.turn ? (r + 1) % 4 : r, f, x + 1, y]; }
      S.bt.cur = { id: 'fit', band, level: lv, puzzle, state: st, hints: 0, sec: 40, day: today() };
      BT.start('fit', band, lv);
    }, [g, lv, o]);
    await p.waitForSelector('.sf-pc .tg-bs');
    await p.waitForTimeout(200);
    if (o.sel) {
      const q = await p.evaluate(() => { const i = SF.cur.p.pcs.findIndex((x, j) => SF.cur.st().pc[j].length == 2); return SF.cur.at(i); });
      await p.mouse.click(q.x, q.y);
    }
    for (let i = 0; i < (o.hint || 0) + (o.win ? 3 : 0); i++) {
      await p.evaluate(() => { BT.act.cd = 0; document.querySelector('#bthint').disabled = false; });
      await p.click('#bthint');
    }
    if (o.win) await p.waitForSelector('.bt-win #btnext', { timeout: 8000 });
  },
});
Object.assign(SCREENS, {
  'bt-sf-levels': { run: async p => { await p.evaluate(() => { S.grade = 1; BT.rec('fit', 'B', true).stars = [3, 2]; BT.rec('fit', 'B').lvl = 3; BT.levels('fit', 'B'); }); } },
  'bt-sf-a': sfShot(0, 1),
  'bt-sf-a7': sfShot(0, 9, { placed: 1 }),
  'bt-sf-b': sfShot(1, 7, { placed: 1, sel: true }),
  'bt-sf-c': sfShot(3, 5, { placed: 2, wrong: true }),
  'bt-sf-d': sfShot(5, 12),
  'bt-sf-hint': sfShot(5, 4, { placed: 2, hint: 2 }),
  'bt-sf-win': sfShot(3, 2, { win: true }),
});


// P3-15 Word Search and Unscramble. Grade g sets the band, level lv is started, then real input (tools/lib/bt-p315.js).
// ws: o.found words dragged (mouse), o.tap a first letter tapped, o.wrong a line that is not a word, o.hint hint presses, o.win all.
// us: o.done words spelled, o.part letters tapped in, o.wrong a wrong order, o.hint hint presses, o.win every word.
const P315 = require('./lib/bt-p315');
const wordShot = (id, g, lv, o = {}) => ({
  run: async p => {
    await p314Start(id, g, lv)(p);
    if (id == 'wsearch') {
      await p.waitForSelector('.ws-c');
      if (o.win) { await P315.wsFind(p); await p.waitForTimeout(1300); return; }
      await P315.wsFind(p, o.found || 0);
      if (o.wrong) { const t = await P315.wsNow(p); await P315.wsDrag(p, 0, (t.n - 1) * t.n + t.n - 1); }
      await p314Hint(p, o.hint || 0);
      if (o.tap) { const t = await P315.wsNow(p); await P315.wsTap(p, t.left[t.left.length - 1].a); }
    } else {
      await p.waitForSelector('.us-tile');
      if (o.win) { await P315.usWin(p); await p.waitForTimeout(1300); return; }
      for (let i = 0; i < (o.done || 0); i++) {
        const t = await P315.usNow(p);
        await P315.usSpell(p);
        await p.waitForFunction(i => S.bt.cur.state && S.bt.cur.state.i > i && !document.querySelector('.us-boxes.ok'), t.i);
        await p.waitForTimeout(300);
      }
      if (o.wrong) { await P315.usWrong(p); await p.waitForTimeout(o.wrongWait || 120); }
      await p314Hint(p, o.hint || 0);
      if (o.part) await P315.usSpell(p, o.part);
    }
  },
});
Object.assign(SCREENS, {
  'bt-ws-hub': { run: async p => { await p.evaluate(() => { S.grade = 3; BT.hub(); document.querySelector('[data-t="wsearch"]').scrollIntoView({ block: 'center' }); }); } },
  'bt-ws-b': wordShot('wsearch', 1, 2, { found: 2 }),
  'bt-ws-b-down': wordShot('wsearch', 2, 10, { found: 3, tap: true }),
  'bt-ws-c': wordShot('wsearch', 3, 6, { found: 3, wrong: true }),
  'bt-ws-c-hint': wordShot('wsearch', 4, 9, { found: 2, hint: 2 }),
  'bt-ws-d': wordShot('wsearch', 5, 11, { found: 4, hint: 3 }),
  'bt-ws-win': wordShot('wsearch', 3, 3, { win: true }),
  'bt-us-b': wordShot('scramble', 1, 2, { part: 1 }),
  'bt-us-b4': wordShot('scramble', 2, 10, { done: 1, hint: 2 }),
  'bt-us-c': wordShot('scramble', 3, 6, { wrong: true }),
  'bt-us-c-hint': wordShot('scramble', 4, 9, { done: 2, hint: 1, part: 2 }),
  'bt-us-d': wordShot('scramble', 5, 11, { done: 1, hint: 3 }),
  'bt-us-win': wordShot('scramble', 6, 5, { win: true }),
});


// ---- P4-07 wearables, Pet Shop and Stickers ----
// The wearables sheet (runs in the page): every item alone (96 and 40 px, on white and on a tint), the prize emblems, then every
// pet x every stage wearing every shop hat (each with a toy), and every prize hat on every pet. Dashed box = the 200 viewBox.
function wearSheet() {
  const kinds = Object.keys(PETS), names = ['egg', 'baby', 'kid', 'grown', 'super'];
  const hats = SHOP.hat.map(h => h[0]), toys = SHOP.toy.map(t => t[0]);
  const cell = (svg, label, cls = '') => `<div class="wsc ${cls}">${svg}<div class="wsn">${label}</div></div>`;
  const row = (title, cells) => `<h2 class="wsh">${title}</h2><div class="wsr">${cells}</div>`;
  const pet = (k, st, hat, toy) => `<div class="wsp">${petSVG(k, st, 'happy', { hat: wearOf(hat), toy: wearOf(toy) })}</div>`;
  let h = '';
  h += row('shop hats, toys and prize hats at 96 and 40 px', hats.concat(toys, BPRIZE).map(id =>
    cell(wearPic(id, '96px') + wearPic(id, '40px'), WEAR_NAME[id] || id)).join(''));
  h += row('prize emblems (in the reward rosette)', BPRIZE.map(id => cell(RW.badge(id), WEAR_NAME[id] || id, 'wst')).join(''));
  for (const k of kinds) {
    h += `<h1 class="wsk">${PETS[k].n}</h1>`;
    for (const st of [0, 1, 2, 3, 4]) h += row(PETS[k].n + ' ' + names[st], hats.concat(['🌟']).map((hat, i) =>
      cell(pet(k, st, i < hats.length ? hat : BPRIZE[(st * 3 + kinds.indexOf(k)) % BPRIZE.length], toys[i]), (WEAR_NAME[hat] || 'prize') + ' + ' + WEAR_NAME[toys[i]])).join(''));
  }
  h += '<h1 class="wsk">Prize hats on every pet</h1>';
  for (const k of kinds) h += row(PETS[k].n + ' kid and grown', BPRIZE.map((id, i) => cell(pet(k, 2 + i % 2, id, ''), WEAR_NAME[id])).join(''));
  view(`<style>.wsr{display:flex;flex-wrap:wrap;gap:6px;padding:0 8px}.wsh{font-size:var(--fs-2);margin:10px 8px 4px;color:var(--ink-2)}
    .wsk{font-size:var(--fs-4);margin:18px 8px 0;color:var(--ink)}
    .wsc{background:var(--surface);border-radius:var(--r-chip);padding:6px;font-size:54px;display:flex;flex-direction:column;align-items:center;
      box-shadow:var(--shadow);min-width:90px}.wsp{font-size:60px}.wsc .pet-svg{outline:2px dashed var(--line);margin:0}.wst{background:var(--star-tint);font-size:var(--fs-4)}
    .wsc .pet-svg *{animation:none!important}.wsn{font-size:var(--fs-1);color:var(--ink-2)}#app,html,body{height:auto;overflow:visible}</style>
    <div class="top"><div class="title">Wearables on every pet</div></div>${h}`);
}
Object.assign(SCREENS, {
  wear: { full: true, run: async p => { await p.evaluate(wearSheet); } },
  // the shop (midway: 64 coins, top hat and balloon on): trying on the crown (not owned), the buy sheet for the cap, toys, places
  'shop-try': { run: async p => { await p.evaluate(() => { shopTab = 'hat'; shopSel = null; shop(); }); await p.click('.item[data-id="👑"]'); } },
  'shop-buy': { run: async p => { await p.evaluate(() => { shopTab = 'hat'; shopSel = null; shop(); }); await p.click('.item[data-id="🎓"]'); await p.click('#psact'); } },
  'shop-toys': { run: async p => { await p.evaluate(() => { S.owned['🧸'] = 1; S.owned['⭐'] = 1; shopSel = null; shopTab = 'toy'; shop(); }); await p.click('.item[data-id="🪄"]'); } },
  'shop-places': { run: async p => { await p.evaluate(() => { shopTab = 'scene'; shopSel = null; shop(); }); await p.click('.item[data-id="candy"]'); } },
  // the sticker book with most stickers (some doubles) and one full page
  'stickers-many': { run: async p => { await p.evaluate(() => { STK.forEach((s, i) => { if (i < 12 || i % 3) S.stickers[s] = 1 + (i % 5 == 0); }); book(); }); } },
});

async function main() {
  const args = process.argv.slice(2);
  let fixtureArg = null;
  const names = [];
  for (const a of args) {
    if (a.startsWith('--fixture=')) fixtureArg = a.slice(10);
    else if (a[0] == '@' && GROUPS[a.slice(1)]) names.push(...GROUPS[a.slice(1)]);
    else names.push(a);
  }
  if (!names.length) {
    console.log('usage: node tools/shots.js [--fixture=midway|fresh|maxed] <screen...>\nscreens: ' + Object.keys(SCREENS).join(' '));
    process.exit(2);
  }
  for (const n of names) {
    if (!SCREENS[n]) { console.error('unknown screen: ' + n); process.exit(2); }
  }
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await launch();
  let bad = 0;
  try {
    for (const [w, h] of SHOT_SIZES) {
      for (const n of names) {
        const s = SCREENS[n];
        const { ctx, page, errors, network } = await openApp(browser, { fixture: fixtureArg || s.fixture || 'midway', width: w, height: h, scale: +process.env.SHOTS_SCALE || 1 });
        await s.run(page);
        await page.waitForTimeout(700);
        const file = path.join(OUT, `${n}-${w}x${h}.png`);
        await page.screenshot({ path: file, fullPage: !!s.full });
        console.log('wrote ' + path.relative(process.cwd(), file));
        for (const e of errors.concat(network.map(u => 'network: ' + u))) { console.error('  ! ' + n + ' ' + w + 'x' + h + ' ' + e); bad++; }
        await ctx.close();
      }
    }
  } finally {
    await browser.close();
  }
  process.exit(bad ? 1 : 0);
}
main().catch(e => { console.error(e); process.exit(1); });
