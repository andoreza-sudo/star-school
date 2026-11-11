// Screenshots: node tools/shots.js [--fixture=name] <screen...>
// Writes tools/out/<screen>-<W>x<H>.png at 600x960, 1024x600 and 380x780.
// Screens are named entries below. Add one for every new screen (CONTRIBUTING section 7).
const fs = require('fs');
const path = require('path');
const { SIZES, launch, openApp } = require('./lib/browser');

// P4-18: SHOTS_OUT=dir writes elsewhere (before/after sets); SHOTS_SIZES=600x960,380x780 picks sizes.
const OUT = process.env.SHOTS_OUT ? path.resolve(process.env.SHOTS_OUT) : path.join(__dirname, 'out');
const SHOT_SIZES = process.env.SHOTS_SIZES ? process.env.SHOTS_SIZES.split(',').map(s => s.split('x').map(Number)) : SIZES;
const KS = require('./kinds-samples');

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
  home: { run: async p => { await p.evaluate(() => home(true)); } },
  map: { run: async p => { await p.evaluate(() => pathMap('math')); } },
  'map-read': { run: async p => { await p.evaluate(() => pathMap('read')); } },
  'map-es': { run: async p => { await p.evaluate(() => pathMap('es')); } },
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
  // the jump/sad reaction faces, small sizes and a dark scene. Full-page shot. 'pets-home' / 'pets-care': the dragon in place.
  pets: { full: true, run: async p => { await p.evaluate(petSheet); } },
  'pets-home': { run: async p => { await p.evaluate(() => { S.care = { food: 90, clean: 90, fun: 90, t: Date.now(), gift: '' }; home(true); }); } },
  'pets-care': { run: async p => { await p.evaluate(() => { S.care = { food: 12, clean: 60, fun: 60, t: Date.now(), gift: '' }; care(); }); } },
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
function compShot(sk, lv, id, qi, mode) {
  return async p => {
    await p.evaluate(([sk, lv, id, qi]) => {
      S.name = 'Ava'; setGrade(2);
      window.say = () => {};
      start('read', NODES.read.findIndex(n => n.sk === sk && n.lv === lv));
      const bp = PASS[sk].findIndex(x => x.id === id);
      G.q = genPassage(sk, lv, { bp, qi, s: 5 }); G.q.sk = sk; G.q.lv = lv; renderQ();
    }, [sk, lv, id, qi]);
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

// P4-05: the pet sheet (runs in the page)
function petSheet() {
  const stages = [0, 1, 2, 3, 4], names = ['egg', 'baby', 'kid', 'grown', 'super'];
  const cell = (svg, label, cls = '') => `<div class="psc ${cls}">${svg}<div class="psn">${label}</div></div>`;
  const row = (title, cells) => `<h2 class="psh">${title}</h2><div class="psr">${cells}</div>`;
  const box = c => `<rect x="2" y="2" width="60" height="60" rx="6" fill="none" stroke="var(--pc-t)" stroke-width="3" stroke-dasharray="6 5"/><circle cx="${c[0]}" cy="${c[1]}" r="6" fill="var(--pc-t)"/>`;
  let h = '';
  for (const st of stages) h += row(names[st] + ' (stage ' + st + ')', PET_MOODS.map(m => cell(petSVG('dragon', st, m), m)).join(''));
  h += row('anchors: hat box (bottom centre on the dot) and toy box (centre on the dot), 64 grid', stages.map(st =>
    cell(petSVG('dragon', st, 'idle', { hat: box([32, 60]), toy: box([32, 32]) }), names[st])).join(''));
  h += row('today\'s wearables (emoji at the anchors)', stages.map(st =>
    cell(petSVG('dragon', st, 'happy', { hat: st % 2 ? '👑' : '🎩', toy: st % 2 ? '🧸' : '🎈', react: true }), names[st])).join(''));
  h += row('reactions: .jump (cheer face) and .sad (oops face) on the container', [2, 3].map(st =>
    cell(`<div class="rig jump">${petSVG('dragon', st, 'idle', { react: true })}</div>`, names[st] + ' jump') +
    cell(`<div class="rig sad">${petSVG('dragon', st, 'idle', { react: true })}</div>`, names[st] + ' sad')).join(''));
  h += row('sizes: 28, 42 and 64 px font (round runner, map, phone home)', [28, 42, 64].map(f =>
    cell(`<div style="font-size:${f}px">${petSVG('dragon', 2, 'idle', { hat: '🎩', toy: '🎈' })}</div>`, f + ' px')).join('') +
    cell('<div style="font-size:42px">' + petSVG('dragon', 0, 'idle') + '</div>', 'egg 42'));
  h += row('dark scene', stages.map(st => cell(petSVG('dragon', st, 'idle'), names[st], 'psd')).join(''));
  view(`<style>.psr{display:flex;flex-wrap:wrap;gap:6px;padding:0 8px}.psh{font-size:var(--fs-2);margin:10px 8px 4px;color:var(--ink-2)}
    .psc{background:var(--surface);border-radius:var(--r-chip);padding:6px;font-size:64px;display:flex;flex-direction:column;align-items:center;box-shadow:var(--shadow)}
    .psc .pet-svg *{animation:none!important}.psd{background:var(--bt-shade)}.psd .psn{color:var(--surface)}
    .psn{font-size:var(--fs-1);color:var(--ink-2)}#app,html,body{height:auto;overflow:visible}</style>
    <div class="top"><div class="title">Pet rig: dragon</div></div>${h}`);
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
};

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
        const { ctx, page, errors, network } = await openApp(browser, { fixture: fixtureArg || s.fixture || 'midway', width: w, height: h });
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
