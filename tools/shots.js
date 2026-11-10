// Screenshots: node tools/shots.js [--fixture=name] <screen...>
// Writes tools/out/<screen>-<W>x<H>.png at 600x960, 1024x600 and 380x780.
// Screens are named entries below. Add one for every new screen (CONTRIBUTING section 7).
const fs = require('fs');
const path = require('path');
const { SIZES, launch, openApp } = require('./lib/browser');

const OUT = path.join(__dirname, 'out');
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
      await p.evaluate(() => { FL.right = 7; $('#fsc').textContent = '\u26a1 7'; });
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
  // Icon sheet (DESIGN_SYSTEM 5.1): every icon at 20, 32 and 64 px, on white (ink) and on a colour (white icon,
  // --ic2 set to the fill). Full-page shot, so the sheet may be taller than the viewport.
  icons: {
    full: true,
    run: async p => {
      await p.evaluate(() => {
        const sizes = [20, 32, 64];
        const row = n => sizes.map(s => ico(n, s)).join('');
        const cells = Object.keys(ICONS).map(n => `<div class="isc"><div class="isw">${row(n)}</div>` +
          `<div class="isb">${row(n)}</div><div class="isn">${n}</div></div>`).join('');
        view(`<style>.isg{display:grid;grid-template-columns:repeat(auto-fill,minmax(176px,1fr));gap:8px;padding:8px}
          .isc{background:var(--surface);border-radius:var(--r-chip);overflow:hidden;box-shadow:var(--shadow)}
          .isw,.isb{display:flex;align-items:center;gap:8px;padding:6px 8px;color:var(--ink)}
          .isb{background:var(--brand);color:var(--surface);--ic2:var(--brand)}
          .isn{font-size:var(--fs-1);padding:2px 8px 4px;color:var(--ink-2)}
          #app,html,body{height:auto;overflow:visible}</style>
          <div class="top"><div class="title">Icons (${Object.keys(ICONS).length})</div></div><div class="isg">${cells}</div>`);
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
};

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

async function main() {
  const args = process.argv.slice(2);
  let fixtureArg = null;
  const names = [];
  for (const a of args) {
    if (a.startsWith('--fixture=')) fixtureArg = a.slice(10);
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
    for (const [w, h] of SIZES) {
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
