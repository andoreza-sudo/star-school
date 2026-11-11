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

// ---- virtual clock (injected before any app code, see openApp) ----
// SMOKE_SPEED=1 is the real clock. The default makes pauses/timers N times shorter and pins the day,
// so a run never crosses midnight and the app's own waits (1.2 s between questions, chest, timers) shrink.
const DEFAULT_SPEED = 8;
const VIRTUAL_START = [2026, 5, 15, 10, 0, 0]; // 2026-06-15 10:00 local (month is 0-based)
function envSpeed() {
  const v = parseFloat(process.env.SMOKE_SPEED);
  return v > 0 ? v : DEFAULT_SPEED;
}

function clockInit([speed, start]) {
  if (speed === 1 && !start) return;
  const RealDate = Date, realNow = performance.now.bind(performance);
  const realST = window.setTimeout.bind(window), realSI = window.setInterval.bind(window);
  const t0 = start ? new RealDate(...start).getTime() : RealDate.now();
  const p0 = realNow();
  const vNow = () => t0 + (realNow() - p0) * speed;
  function VDate(...a) {
    if (!new.target) return new RealDate(vNow()).toString();
    return a.length ? new RealDate(...a) : new RealDate(vNow());
  }
  VDate.prototype = RealDate.prototype;
  VDate.now = () => Math.floor(vNow());
  VDate.parse = RealDate.parse; VDate.UTC = RealDate.UTC;
  Object.defineProperty(VDate, 'name', { value: 'Date' });
  window.Date = VDate;
  window.__realNow = realNow; // for steps that measure real CPU time (the map-draw budget)
  performance.now = () => (realNow() - p0) * speed;
  const dl = d => (Number(d) || 0) / speed;
  window.setTimeout = (f, d, ...a) => realST(f, dl(d), ...a);
  window.setInterval = (f, d, ...a) => realSI(f, dl(d), ...a);
}

async function launch() {
  return chromium.launch({
    executablePath: chromePath(),
    headless: true,
    args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--disable-gpu'],
  });
}

// Opens a page. opts: { fixture: 'midway' | 'fresh' | 'maxed' | null, width, height, url (default: the built index.html),
//   scale (device pixels per css pixel, default 1) }
// Returns { ctx, page, errors, network }. errors: console errors + uncaught exceptions.
// network: any http(s) request the app tried to make (must stay empty, the app is offline).
async function openApp(browser, opts = {}) {
  const [w, h] = [opts.width || SIZES[0][0], opts.height || SIZES[0][1]];
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: opts.scale || 1 });
  const errors = [];
  const network = [];
  await ctx.route(/^(https?|wss?|ftp):/, route => {
    network.push(route.request().url());
    route.abort();
  });
  const speed = opts.speed || envSpeed();
  await ctx.addInitScript(clockInit, [speed, speed === 1 && !process.env.SMOKE_FIXED_DAY ? null : VIRTUAL_START]);
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
  await page.goto(opts.url || INDEX_URL);
  await page.waitForSelector('#app *', { timeout: 10000 });
  await page.waitForTimeout(300);
  return { ctx, page, errors, network };
}

module.exports = { envSpeed, ROOT, INDEX_URL, SAVE_KEY, SIZES, launch, openApp, loadFixture, chromePath };
