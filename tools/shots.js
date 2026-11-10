// Screenshots: node tools/shots.js [--fixture=name] <screen...>
// Writes tools/out/<screen>-<W>x<H>.png at 600x960, 1024x600 and 380x780.
// Screens are named entries below. Add one for every new screen (CONTRIBUTING section 7).
const fs = require('fs');
const path = require('path');
const { SIZES, launch, openApp } = require('./lib/browser');

const OUT = path.join(__dirname, 'out');

// Each screen: { fixture, run(page) }. run() drives the app via its globals or real taps.
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
};

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
        await page.screenshot({ path: file });
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
