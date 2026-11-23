// Google Play Store screenshots for Whistlestop. Seeds a fictional child (Ava, grade 1) into the built app,
// drives it to eight screens and saves PNGs to docs/brand/store/screenshots/.
//   node tools/store-shots.js            all sizes, all screens
//   node tools/store-shots.js phone home   one size ('phone' | 'tablet7' | 'tablet10') and/or some screens
// No audio is played or recorded: the seed has voice, sound and music off, and the app runs offline (all network blocked).
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const ROOT = path.join(__dirname, '..');
const INDEX_URL = 'file://' + path.join(ROOT, 'index.html');
const SAVE_KEY = 'starschool-v2';
const loadFixture = n => JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', n + '.json'), 'utf8'));

const OUT = path.join(__dirname, '..', 'docs', 'brand', 'store', 'screenshots');
const SIZES = {
  phone: { w: 360, h: 640, scale: 3 },     // 1080x1920
  tablet7: { w: 960, h: 540, scale: 2 },   // 1920x1080
  tablet10: { w: 1280, h: 720, scale: 2 }, // 2560x1440
};

function seed() {
  const s = loadFixture('midway');
  s.name = 'Ava'; s.grade = 1; s.stars = 142; s.coins = 120; s.petName = 'Sparky'; s.buddy = '';
  s.voice = false; s.sound = false; s.music = false;
  s.maps.disc = Object.assign({ sci_life1: 3, sci_life2: 2 }, s.maps.disc || {});
  return s;
}

// the page helpers (run in the page, before the app's code)
function pageInit() {
  window.gtime = () => { S.pt = { bank: 1200, day: today(), used: 0 }; };
}
const settle = async p => {
  await p.evaluate(() => document.fonts && document.fonts.ready);
  await p.waitForFunction(() => document.getAnimations().every(a => a.playState !== 'running' || !isFinite(a.effect.getComputedTiming().endTime)), null, { timeout: 8000 }).catch(() => {});
  await p.waitForTimeout(1200);
};
// give Ava a believable save: the first stops of each map passed with 2-3 stars, the next one open
const lived = async p => {
  await p.evaluate(() => {
    const count = { read: 9, es: 5, disc: 3 };
    for (const k of Object.keys(PATHS)) {
      let n = k == 'math' ? NODES.math.findIndex(x => x.wi === 3) + 3 : count[k];
      for (let i = 0; i < n && i < NODES[k].length; i++) if (getSt(k, i) < 2) setSt(k, i, 2 + (i % 2));
    }
    save();
  });
};
// answer the current question right (a choice or a picture tap), then wait for the next one: the shot is mid-round
const answerOne = async p => {
  const q = await p.evaluate(() => ({ ans: String(G.q.ans), ci: G.q.choices ? G.q.choices.findIndex(c => String(c.v) === String(G.q.ans)) : -1 }));
  if (q.ci < 0) throw new Error('answerOne: not a choice question');
  await p.click(`.ch[data-i="${q.ci}"]`);
  await p.waitForTimeout(2200);
};
const teach = async p => {
  await p.evaluate(() => partsLoad(['teach', 'teach12']));
  await p.waitForFunction(() => typeof LS_DRAFTED != 'undefined', null, { timeout: 30000 });
};

// name, file stem, run(page)
const SCREENS = [
  ['home', '01-home', async p => { await p.evaluate(() => home(true)); }],
  ['map', '02-learn-map', async p => { await p.evaluate(() => { pathMap('math', NODES.math.findIndex(x => x.wi === 3) >= 0 ? 3 : 0); }); }],
  ['math', '03-math-lesson', async p => {
    await teach(p);
    await p.evaluate(() => { S.grade = 1; S.know = {}; LS.WAKE = 400; LS.st = LS.make('add3', { seed: 3, day: lsDay(), learn: 1, rem: ['add2'] }); LS.show(); });
    await p.waitForTimeout(1500);
  }],
  ['read', '04-reading-lesson', async p => { await p.evaluate(() => start('read', NODES.read.findIndex(n => n.sk == 'pic'))); await p.waitForTimeout(800); await answerOne(p); }],
  ['discover', '05-discover', async p => { for (let t = 0; t < 12; t++) { await p.evaluate(() => start('disc', 1)); await p.waitForTimeout(500); if (await p.evaluate(() => !!(G.q.choices && G.q.kind != 'sort'))) break; }
    await answerOne(p); }],
  ['games', '06-games', async p => { await p.evaluate(() => { gtime(); gameRoom(); }); await p.waitForTimeout(800); }],
  ['pet', '07-my-pet', async p => { await p.evaluate(() => { S.care = { food: 70, clean: 80, fun: 75, t: Date.now(), gift: '' }; care(); }); }],
  ['grown', '08-grown-ups', async p => { await p.evaluate(async () => { await partLoad('gate'); PIN.set('2580'); grown(); }); }],
];

async function run() {
  const args = process.argv.slice(2);
  const sizes = Object.keys(SIZES).filter(k => !args.some(a => SIZES[a]) || args.includes(k));
  const names = args.filter(a => !SIZES[a]);
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const raw = JSON.stringify(seed());
  for (const sz of sizes) {
    const { w, h, scale } = SIZES[sz];
    for (const [name, stem, fn] of SCREENS) {
      if (names.length && !names.includes(name)) continue;
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
      const errors = [];
      await ctx.route(/^(https?|wss?|ftp):/, r => r.abort());
      await ctx.addInitScript(([k, v]) => { try { localStorage.setItem(k, v); } catch (e) {} }, [SAVE_KEY, raw]);
      await ctx.addInitScript(pageInit);
      const p = await ctx.newPage();
      p.on('pageerror', e => errors.push(e.message));
      await p.goto(INDEX_URL);
      await p.waitForSelector('#app *', { timeout: 10000 });
      await p.evaluate(() => partLoad('bt').then(() => partLoad('hints'))).catch(() => {});
      await p.waitForTimeout(500);
      await lived(p);
      await fn(p);
      await settle(p);
      const file = path.join(OUT, `${sz}-${stem}.png`);
      await p.screenshot({ path: file });
      console.log(file.replace(OUT + path.sep, ''), errors.length ? 'ERRORS ' + errors.join('; ') : '');
      await ctx.close();
    }
  }
  if (sizes.includes('phone') && !names.length) await sheet(browser);
  await browser.close();
}
// tools/out/store-sheet.png (gitignored): every phone shot side by side, small, for review
async function sheet(browser) {
  const files = fs.readdirSync(OUT).filter(f => /^phone-\d+-.*\.png$/.test(f)).sort();
  const dir = path.join(__dirname, 'out');
  fs.mkdirSync(dir, { recursive: true });
  const html = '<body style="margin:0;background:#222;display:flex;gap:10px;padding:10px">' +
    files.map(f => `<img src="data:image/png;base64,${fs.readFileSync(path.join(OUT, f)).toString('base64')}" style="width:216px;height:384px;border-radius:8px">`).join('') + '</body>';
  const page = await browser.newPage({ viewport: { width: files.length * 226 + 10, height: 404 } });
  await page.setContent(html);
  await page.waitForFunction(() => [...document.images].every(i => i.complete));
  await page.screenshot({ path: path.join(dir, 'store-sheet.png') });
  await page.close();
  console.log('tools/out/store-sheet.png');
}
run().catch(e => { console.error(e); process.exit(1); });
