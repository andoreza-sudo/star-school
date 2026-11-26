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
  // CHK-FAST: __vspeed(s) changes the speed from now on (the virtual clock goes on from where it is; timers set before keep their real
  // delay). tools/smoke.js uses it (vspeed) only around a bot act that must land inside a short app window (a touch on a banner that
  // goes by itself after 2 s), so a busy CPU cannot make the bot late; it never shortens anything the app waits for.
  let vt = t0, vp = p0;
  const vNow = () => vt + (realNow() - vp) * speed;
  window.__vspeed = s => { vt = vNow(); vp = realNow(); speed = s; };
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
  performance.now = () => vNow() - t0;
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

// http: the built files served on 127.0.0.1 by this process (one server, started on first use, port chosen by the system).
// Steps that reload the page with a changed save use it (RC1-KIDS: a child switch). Over file:// headless Chrome sometimes starts the
// reloaded page with empty storage on a busy machine: a plain page that only counts its reloads in localStorage read 0 again in about
// 1 reload of 30 with 8 runs side by side (localStorage, sometimes sessionStorage too), and never over http (0 of 1,464); the app
// itself is served over https. The page is the same app; only the origin differs.
let httpBase = null;
function httpServe() {
  if (httpBase) return httpBase;
  const http = require('http');
  const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.ogg': 'audio/ogg', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json' };
  const srv = http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html', f = path.join(ROOT, u);
    if (!f.startsWith(ROOT + path.sep) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    fs.createReadStream(f).pipe(res);
  });
  httpBase = new Promise(r => srv.listen(0, '127.0.0.1', () => { srv.unref(); r('http://127.0.0.1:' + srv.address().port + '/'); }));
  return httpBase;
}

// Opens a page. opts: { fixture: 'midway' | 'fresh' | 'maxed' | null, width, height, url (default: the built index.html),
//   scale (device pixels per css pixel, default 1), lazy (true: do not load the on-demand bt part, P6-03), init ([fn, arg], PLAY-01),
//   http (true: the built index.html from httpServe(), with service workers blocked so no update reload or cache comes in) }
// Returns { ctx, page, errors, network }. errors: console errors + uncaught exceptions.
// network: any http(s) request the app tried to make (must stay empty, the app is offline).
async function openApp(browser, opts = {}) {
  const [w, h] = [opts.width || SIZES[0][0], opts.height || SIZES[0][1]];
  const base = opts.http ? await httpServe() : null;
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: opts.scale || 1, ...(base ? { serviceWorkers: 'block' } : {}) });
  const errors = [];
  const network = [];
  await ctx.route(/^(https?|wss?|ftp):/, route => {
    if (base && route.request().url().startsWith(base)) return route.continue(); // opts.http: the app's own files
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
        // two marks, so the fixture is never put back by a later reload: sessionStorage alone was sometimes empty after the
        // app's own reloads in a long run (Start over / load / undo then showed the fixture again)
        if (sessionStorage.getItem('__seeded') || localStorage.getItem('__smoke_seeded')) return;
        sessionStorage.setItem('__seeded', '1');
        localStorage.setItem('__smoke_seeded', '1');
        if (raw) localStorage.setItem(key, raw); else localStorage.removeItem(key);
      } catch (e) {}
    }, [SAVE_KEY, seed]);
  }
  // opts.init: [fn, arg] run in the page before the app's code (PLAY-01: a mocked Google Play billing)
  if (opts.init) await ctx.addInitScript(opts.init[0], opts.init[1]);
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('pageerror', e => errors.push('exception: ' + e.message));
  await page.goto(opts.url || (base ? base + 'index.html' : INDEX_URL));
  await page.waitForSelector('#app *', { timeout: 10000 });
  await page.waitForTimeout(300);
  // P6-03: the app loads the Brain Teaser code (bt.<VER>.js) on demand (BT.start; the hub starts it early). Steps that drive BT.start,
  // BT.make or a puzzle's globals (MZ, RB ...) straight from page.evaluate expect it in, so it is loaded here, as the hub would.
  // opts.lazy: true keeps the cold start (steps that check what loads at start, and the on-demand load itself).
  // v182: and the Practice mistake hints (hints.<VER>.js, HINT-01), which a round loads as it starts (hintsWarm): steps that set HINTW
  // or call hmHint straight from page.evaluate expect them in.
  if (!opts.lazy) await page.evaluate(() => (typeof partLoad == 'function' && dataReady() ? partLoad('bt').then(() => partLoad('hints')) : null)).catch(() => {});
  return { ctx, page, errors, network };
}

module.exports = { envSpeed, ROOT, INDEX_URL, SAVE_KEY, SIZES, launch, openApp, loadFixture, chromePath };
