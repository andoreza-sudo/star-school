// Shared browser helper for shots.js and smoke.js.
// Launches the system Chrome (no browser download), opens the built index.html over file://,
// optionally pre-seeds localStorage from a fixture, blocks all network, and collects errors.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const ROOT = path.join(__dirname, '..', '..');
const INDEX_URL = 'file://' + path.join(ROOT, 'index.html');
const SAVE_KEY = 'starschool-v2';
const SIZES = [[600, 960], [1024, 600], [380, 780]];

function chromePath() {
  if (process.env.CHROME) return process.env.CHROME;
  for (const p of ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser']) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('Chrome not found. Set CHROME=/path/to/chrome');
}

function loadFixture(name) {
  const file = path.join(__dirname, '..', 'fixtures', name + '.json');
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

async function launch() {
  return chromium.launch({
    executablePath: chromePath(),
    headless: true,
    args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--disable-gpu'],
  });
}

// Opens a page. opts: { fixture: 'midway' | 'fresh' | 'maxed' | null, width, height }
// Returns { ctx, page, errors, network }. errors: console errors + uncaught exceptions.
// network: any http(s) request the app tried to make (must stay empty, the app is offline).
async function openApp(browser, opts = {}) {
  const [w, h] = [opts.width || SIZES[0][0], opts.height || SIZES[0][1]];
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const errors = [];
  const network = [];
  await ctx.route(/^(https?|wss?|ftp):/, route => {
    network.push(route.request().url());
    route.abort();
  });
  if (opts.fixture) {
    const save = loadFixture(opts.fixture);
    const seed = Object.keys(save).length ? JSON.stringify(save) : null;
    // Seed once per context: a later reload keeps whatever the app saved since.
    await ctx.addInitScript(([key, raw]) => {
      try {
        if (sessionStorage.getItem('__seeded')) return;
        sessionStorage.setItem('__seeded', '1');
        if (raw) localStorage.setItem(key, raw); else localStorage.removeItem(key);
      } catch (e) {}
    }, [SAVE_KEY, seed]);
  }
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('pageerror', e => errors.push('exception: ' + e.message));
  await page.goto(INDEX_URL);
  await page.waitForSelector('#app *', { timeout: 10000 });
  await page.waitForTimeout(300);
  return { ctx, page, errors, network };
}

module.exports = { ROOT, INDEX_URL, SAVE_KEY, SIZES, launch, openApp, loadFixture, chromePath };
