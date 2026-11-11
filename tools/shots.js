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
};

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
        return `<div class="toast on cs-static ${k}"><span class="ti">${ico({ good: 'check', try: 'replay', info: 'hint' }[k])}</span><span>${t}</span></div>`;
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
