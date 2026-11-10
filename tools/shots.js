// Screenshots: node tools/shots.js [--fixture=name] <screen...>
// Writes tools/out/<screen>-<W>x<H>.png at 600x960, 1024x600 and 380x780.
// Screens are named entries below. Add one for every new screen (CONTRIBUTING section 7).
const fs = require('fs');
const path = require('path');
const { SIZES, launch, openApp } = require('./lib/browser');

const OUT = path.join(__dirname, 'out');

// Each screen: { fixture, full, run(page) }. run() drives the app via its globals or real taps; full: true takes a full-page shot.
const SCREENS = {
  setup: { fixture: 'fresh', run: async () => {} },
  home: { run: async p => { await p.evaluate(() => home(true)); } },
  map: { run: async p => { await p.evaluate(() => pathMap('math')); } },
  'map-read': { run: async p => { await p.evaluate(() => pathMap('read')); } },
  'map-es': { run: async p => { await p.evaluate(() => pathMap('es')); } },
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
};

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
