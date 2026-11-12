// Performance check (P6-02): the built app in headless Chrome at 6x CPU throttle (a cheap tablet), over file:// like
// tools/lib/browser.js, network blocked.
// Run: node tools/perf.js [--runs N] [--no-memory] [--memory-only] [--json] [--root DIR]  (DIR: another folder of built files, to compare)
//   start          navigation to Home drawn and the main thread quiet (no long task in the next 500 ms): "interactive"
//   map open       tap a path card on Home until the map is painted
//   question       a lesson's first question (start() to painted), then each next question in a played round (renderQ to painted)
//   game room      Home -> Game Room until the hub is painted: the first open (loads the games part files) and a second open
//   long tasks     the longest task in each phase; game loads (the first Game Room open) are listed but not held to the 200 ms budget
//   memory         JS heap after one warm-up round and after 30 more rounds (garbage collected before each reading), and DOM nodes
// Each timing is the best (and the median) of N runs (default 3), each in a fresh browser context, because the machine is shared.
// Exit code: 1 only when the best start is over the start budget (tools/check.sh runs this); the other rows are reported.
const fs = require('fs'), path = require('path');
const { launch, loadFixture, ROOT, SAVE_KEY } = require('./lib/browser');

const THROTTLE = 6;
const BUDGET = { start: 2500, map: null, q: 100, qnext: 100, room: null, room2: null, long: 200, heap: 5 * 1024 * 1024 };
const args = process.argv.slice(2);
const arg = k => args.includes(k) ? args[args.indexOf(k) + 1] : null;
const RUNS = +arg("--runs") > 0 ? +arg("--runs") : 3;
const MEMORY = !args.includes('--no-memory'), TIMING = !args.includes('--memory-only');
const ROUNDS = 30;
const DIR = args.includes('--root') ? path.resolve(args[args.indexOf('--root') + 1]) : ROOT, URL = 'file://' + path.join(DIR, 'index.html');

// before any app code: long tasks with the phase they fell in, and the moment Home is drawn (#groom is on Home only)
function perfInit() {
  window.__lt = []; window.__phase = 'start'; window.__tHome = 0;
  try {
    new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lt.push({ t: e.startTime, d: e.duration, ph: window.__phase }); })
      .observe({ type: 'longtask', buffered: true });
  } catch (e) {}
  const mo = new MutationObserver(() => {
    if (!window.__tHome && document.querySelector('#groom')) { window.__tHome = performance.now(); mo.disconnect(); }
  });
  mo.observe(document, { childList: true, subtree: true }); // the boot script draws Home before DOMContentLoaded
  // time from now until the frame after the next paint (rAF runs before paint; a task queued from it runs after)
  window.__painted = t0 => new Promise(r => requestAnimationFrame(() => setTimeout(() => r(performance.now() - t0), 0)));
}

async function open(browser, fixture, throttle) {
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 600 }, deviceScaleFactor: 1 });
  const network = [], errors = [];
  await ctx.route(/^(https?|wss?|ftp):/, route => { network.push(route.request().url()); route.abort(); });
  const save = loadFixture(fixture);
  await ctx.addInitScript(([key, raw]) => {
    try { if (sessionStorage.getItem('__seeded')) return; sessionStorage.setItem('__seeded', '1'); localStorage.setItem(key, raw); } catch (e) {}
  }, [SAVE_KEY, JSON.stringify(save)]);
  await ctx.addInitScript(perfInit);
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(e.message));
  const cdp = await ctx.newCDPSession(page);
  if (throttle > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: throttle });
  return { ctx, page, cdp, network, errors };
}

const phase = (page, ph) => page.evaluate(p => { window.__phase = p; }, ph);
const quiet = (page, ms) => page.evaluate(ms => new Promise(r => {
  // resolve once no long task has started for `ms` (or after 15 s)
  const t0 = performance.now(), tick = () => {
    const last = window.__lt.length ? Math.max(...window.__lt.map(e => e.t + e.d)) : 0, now = performance.now();
    if (now - Math.max(last, t0) >= ms || now - t0 > 15000) r(); else setTimeout(tick, 50);
  };
  tick();
}), ms);

// one throttled run: start, map, question, next questions, Game Room twice; returns the timings and the long tasks
async function timingRun(browser) {
  const { ctx, page, cdp, network, errors } = await open(browser, 'midway', THROTTLE);
  const out = {};
  await page.goto(URL);
  await page.waitForFunction(() => window.__tHome > 0, null, { timeout: 60000 });
  await quiet(page, 800);
  // interactive: the first moment after Home is drawn that is followed by 500 ms without a long task
  out.start = await page.evaluate(() => {
    let T = window.__tHome;
    for (let moved = true; moved;) { moved = false; for (const e of window.__lt) if (e.t < T + 500 && e.t + e.d > T) { T = e.t + e.d; moved = true; } }
    return T;
  });
  out.home = await page.evaluate(() => window.__tHome);
  out.bytes = await page.evaluate(() => [...document.scripts].filter(s => s.src).map(s => s.getAttribute('src')));
  await phase(page, 'gc');
  out.heap0 = (await heap(cdp)).used; // the JS heap on Home after start (garbage collected)
  // map: tap the maths card on Home
  await phase(page, 'map');
  out.map = await page.evaluate(() => { const t0 = performance.now(); document.querySelector('.game[data-p="math"]').click(); return window.__painted(t0); });
  await quiet(page, 300);
  // question: the first stop's lesson, then each next question of the round (renderQ to painted), answered right through check()
  await phase(page, 'question');
  out.q = await page.evaluate(() => {
    const i = NODES.math.findIndex(n => n.sk !== 'boss' && SK[n.sk] && SK[n.sk].gen);
    const t0 = performance.now(); start('math', i); return window.__painted(t0);
  });
  await quiet(page, 300);
  out.qnext = await page.evaluate(() => new Promise(res => {
    const times = [], orig = window.renderQ;
    window.renderQ = function () { const t0 = performance.now(); const r = orig.apply(this, arguments); window.__painted(t0).then(t => times.push(t)); return r; };
    const step = () => {
      if (document.querySelector('#fin') || times.length >= 6) { window.renderQ = orig; try { G.dead = true; } catch (e) {} return res(times); }
      if (G && G.q && !G.lock) { const q = G.q; if (q.kind === 'choice' || q.kind === 'num' || q.kind === 'tap') check(q.ans); else { G.lock = true; setTimeout(next, 10); } }
      setTimeout(step, 150);
    };
    step();
  }));
  await page.evaluate(() => home());
  await quiet(page, 500);
  // Game Room: first open (loads the games part files when they load on demand), back home, second open
  await phase(page, 'gameload');
  out.room = await page.evaluate(() => new Promise(res => {
    const t0 = performance.now(); gameRoom();
    const w = () => document.querySelector('#g4x4') ? window.__painted(t0).then(res) : setTimeout(w, 5);
    w();
  }));
  await quiet(page, 500);
  await phase(page, 'home');
  await page.evaluate(() => home());
  await quiet(page, 300);
  await phase(page, 'room');
  out.room2 = await page.evaluate(() => new Promise(res => {
    const t0 = performance.now(); gameRoom();
    const w = () => document.querySelector('#g4x4') ? window.__painted(t0).then(res) : setTimeout(w, 5);
    w();
  }));
  await quiet(page, 300);
  const lt = await page.evaluate(() => window.__lt);
  out.long = {};
  for (const e of lt) out.long[e.ph] = Math.max(out.long[e.ph] || 0, Math.round(e.d));
  out.errors = errors; out.network = network;
  await ctx.close();
  return out;
}

// answer the question on screen with real taps (the same controls tools/smoke.js taps)
async function answer(page) {
  const q = await page.evaluate(() => ({ kind: G.q.kind, ans: String(G.q.ans), alt: G.q.alt, word: G.q.word, vals: G.q.choices ? G.q.choices.map(c => String(c.v)) : null }));
  if (q.kind === 'num') {
    for (const d of (q.alt || q.ans)) await page.click(`.k[data-k="${/\d|\./.test(d) ? d : d === '-' ? 'neg' : 'go'}"]`);
    await page.click('.k[data-k="go"]');
  } else if (q.kind === 'choice') await page.click(`.ch[data-i="${q.vals.indexOf(q.ans)}"]`);
  else if (q.kind === 'tap') await page.click(`#prompt [data-v="${q.ans}"]`);
  else if (q.kind === 'build') {
    for (const ch of q.word) {
      const i = await page.evaluate(ch => G.q.tiles.findIndex((t, j) => t === ch && !G.built.includes(j)), ch);
      await page.click(`.lt[data-i="${i}"]`);
    }
  } else if (q.kind === 'spell') { for (const ch of q.word) await page.click(`.sk[data-ch="${ch}"]`); }
  else if (q.kind === 'multi') {
    const idx = await page.evaluate(() => G.q.choices.map((c, i) => G.q.ans.map(String).includes(String(c.v)) ? i : -1).filter(i => i >= 0));
    for (const i of idx) await page.click(`.mc[data-i="${i}"]`);
    await page.click('#mcheck');
  } else if (q.kind === 'order') {
    const n = await page.evaluate(() => G.q.ans.length);
    for (let k = 0; k < n; k++) {
      const i = await page.evaluate(k => G.q.items.findIndex((t, j) => String(t.v) === String(G.q.ans[k]) && !G.ord.includes(j)), k);
      await page.click(`.ot[data-i="${i}"]`);
    }
  } else if (q.kind === 'match') {
    const pairs = await page.evaluate(() => G.q.items.map((it, i) => [i, G.q.opts.findIndex(o => o.v === it.v)]));
    for (const [i, j] of pairs) { await page.click(`.mb[data-s="L"][data-i="${i}"]`); await page.click(`.mb[data-s="R"][data-i="${j}"]`); }
  } else throw new Error('perf: cannot answer a ' + q.kind + ' question');
}

async function heap(cdp) {
  await cdp.send('HeapProfiler.collectGarbage');
  await cdp.send('HeapProfiler.collectGarbage');
  const h = await cdp.send('Runtime.getHeapUsage');
  const d = await cdp.send('Memory.getDOMCounters');
  return { used: h.usedSize, nodes: d.nodes, listeners: d.jsEventListeners };
}

// memory: one warm-up round, then 30 rounds over the first stops of maths, reading and Spanish, played through the real UI
// (the round's own waits run on the real clock; no throttle here, it changes timings, not what stays in memory)
async function memoryRun(browser) {
  const { ctx, page, cdp, network, errors } = await open(browser, 'midway', 1);
  await page.goto(URL);
  await page.waitForFunction(() => window.__tHome > 0, null, { timeout: 60000 });
  // run the app's timers 8x faster (the waits between questions, the chest), as tools/smoke.js does
  await page.evaluate(() => {
    const st = window.setTimeout.bind(window), si = window.setInterval.bind(window);
    window.setTimeout = (f, d, ...a) => st(f, (Number(d) || 0) / 8, ...a); window.setInterval = (f, d, ...a) => si(f, (Number(d) || 0) / 8, ...a);
  });
  const stops = await page.evaluate(() => ['math', 'read', 'es'].flatMap(p => NODES[p].map((n, i) => [p, i, n])
    .filter(([, , n]) => n.sk !== 'boss' && n.sk !== 'trace' && SK[n.sk] && SK[n.sk].gen).slice(0, 3).map(([p, i]) => [p, i])));
  const round = async k => {
    const [p, i] = stops[k % stops.length];
    await page.evaluate(([p, i]) => start(p, i), [p, i]);
    for (let guard = 0; guard < 60; guard++) {
      const st = await page.evaluate(() => document.querySelector('#chest') ? 'fin' : (G && G.q && !G.lock && document.querySelector('#prompt') ? 'ask' : 'none'));
      if (st === 'fin') break;
      if (st === 'none') { await page.waitForTimeout(40); continue; }
      await page.evaluate(() => { window.__q = G.q; });
      await answer(page);
      await page.waitForFunction(() => !!(document.querySelector('#chest') || (G && G.q !== window.__q)), null, { timeout: 8000 }).then(h => h.dispose()).catch(() => {});
    }
    // locators, not element handles: a handle Playwright keeps would hold the old screen in memory and count as a leak
    if (await page.locator('#oops').count()) throw new Error('perf: the app showed its error screen in round ' + k + ' (' + p + ' ' + i + '): ' + errors.join(' | '));
    await page.click('#chest').catch(() => {});
    await page.locator('#btns').waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(300);
    if (await page.locator('#yay').count()) await page.click('#yay').catch(() => {});
    await page.evaluate(() => home());
  };
  await round(0);
  await page.waitForTimeout(500);
  const before = await heap(cdp);
  for (let k = 1; k <= ROUNDS; k++) await round(k);
  await page.waitForTimeout(1000);
  const after = await heap(cdp);
  await ctx.close();
  return { before, after, errors, network };
}

const fmt = v => v == null ? '-' : Math.round(v) + ' ms';
const med = a => { const s = a.slice().sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };

async function main() {
  const browser = await launch();
  const runs = [];
  try {
    for (let i = 0; i < RUNS && TIMING; i++) runs.push(await timingRun(browser));
    const mem = MEMORY ? await memoryRun(browser) : null;
    const rows = [];
    const row = (name, vals, budget, note = '') => {
      const best = Math.min(...vals), m = med(vals);
      rows.push([name, fmt(best), fmt(m), budget ? '< ' + budget + ' ms' : '', budget ? (best < budget ? 'ok' : 'OVER') : '', note]);
      return best;
    };
    let start = 0;
    if (runs.length) {
    start = row('start to interactive', runs.map(r => r.start), BUDGET.start, 'Home drawn, then 500 ms without a long task');
    row('home drawn', runs.map(r => r.home), null, 'navigation -> Home on screen (boot ran)');
    rows.push(['heap on Home after start', (Math.min(...runs.map(r => r.heap0)) / 1048576).toFixed(1) + ' MB', (med(runs.map(r => r.heap0)) / 1048576).toFixed(1) + ' MB', '', '', 'garbage collected']);
    row('map open', runs.map(r => r.map), null, 'Home card -> map painted');
    row('question (first)', runs.map(r => r.q), BUDGET.q, 'start() -> first question painted');
    row('question (next)', runs.map(r => Math.max(...r.qnext)), BUDGET.qnext, 'slowest of ' + runs[0].qnext.length + ' next questions per run');
    row('game room (first)', runs.map(r => r.room), null, 'includes loading the games part files when they load on demand');
    row('game room (again)', runs.map(r => r.room2), null, 'parts already loaded');
    for (const ph of ['start', 'map', 'question', 'gameload', 'home', 'room']) {
      const v = runs.map(r => r.long[ph] || 0);
      const best = Math.min(...v), m = med(v), game = ph === 'gameload';
      rows.push(['longest task: ' + ph, fmt(best), fmt(m), game ? '(game load)' : '< 200 ms', game ? '' : best < BUDGET.long ? 'ok' : 'OVER', '']);
    }
    }
    if (mem) {
      const g = mem.after.used - mem.before.used;
      rows.push(['heap after warm-up round', (mem.before.used / 1048576).toFixed(1) + ' MB', '', '', '', mem.before.nodes + ' DOM nodes']);
      rows.push(['heap growth over ' + ROUNDS + ' rounds', (g / 1048576).toFixed(2) + ' MB', '', '< 5 MB', g < BUDGET.heap ? 'ok' : 'OVER', mem.after.nodes + ' DOM nodes, ' + mem.after.listeners + ' listeners after']);
    }
    const W = [0, 1, 2, 3, 4].map(i => Math.max(...rows.map(r => r[i].length), ['metric', 'best', 'median', 'budget', ''][i].length));
    console.log('Star School performance at ' + THROTTLE + 'x CPU throttle, 1024x600, midway save, best and median of ' + RUNS + ' runs');
    console.log(['metric', 'best', 'median', 'budget', ''].map((h, i) => h.padEnd(W[i])).join('  '));
    for (const r of rows) console.log(r.slice(0, 5).map((c, i) => c.padEnd(W[i])).join('  ') + '  ' + r[5]);
    const sz = f => fs.statSync(path.join(DIR, f)).size, total = runs.length ? runs[0].bytes.reduce((a, f) => a + sz(f), sz('index.html')) : 0;
    if (runs.length) console.log('loaded at start: index.html + ' + runs[0].bytes.join(' + ') + ' = ' + total.toLocaleString('en-US') + ' bytes');
    const errs = runs.flatMap(r => r.errors).concat(mem ? mem.errors : []), net = runs.flatMap(r => r.network).concat(mem ? mem.network : []);
    if (errs.length) console.log('page errors: ' + [...new Set(errs)].join(' | '));
    if (net.length) console.log('network requests (should be none): ' + net.join(' '));
    if (args.includes('--json')) console.log(JSON.stringify({ runs, mem }));
    if (start >= BUDGET.start) { console.log('FAIL: start to interactive ' + Math.round(start) + ' ms is over the ' + BUDGET.start + ' ms budget at ' + THROTTLE + 'x throttle'); process.exitCode = 1; }
    else console.log('perf OK (start budget)');
  } finally {
    await browser.close();
  }
}
main().catch(e => { console.error(e); process.exit(2); });
