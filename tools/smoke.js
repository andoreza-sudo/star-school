// Smoke test: a bot plays through the built app in headless Chrome with the network blocked.
// Fresh setup, one full round on each path (answers read from G.q.ans, tapped through the real UI),
// Game Room, Grown-ups. Fails on any console error, uncaught exception or network request.
const { launch, openApp, envSpeed } = require('./lib/browser');

// TOOL-01: the app's timers run on a virtual clock (see tools/lib/browser.js). vwait waits `ms` of VIRTUAL time, so a wait
// that exists to let an app timer finish (stale next(), chest, overlay) lasts as long relative to the app as before.
// Waits that poll or wait for CSS animations stay real-time page.waitForTimeout.
const vwait = (page, ms) => page.waitForTimeout(ms / envSpeed());

let failed = 0;
const step = msg => console.log('- ' + msg);
function fail(msg) { failed++; console.error('FAIL: ' + msg); }

// Answer the current question by tapping the on-screen controls.
async function answer(page) {
  const q = await page.evaluate(() => ({ kind: G.q.kind, ans: String(G.q.ans), word: G.q.word, alt: G.q.alt,
    vals: G.q.choices ? G.q.choices.map(c => String(c.v)) : null }));
  if (q.kind === 'num') {
    // digits and '.' tap their own key, '-' taps the +/- key, any separator (R, /, space) is the check key moving on
    for (const d of (q.alt || q.ans)) await page.click(`.k[data-k="${/\d|\./.test(d) ? d : d === '-' ? 'neg' : 'go'}"]`);
    await page.click('.k[data-k="go"]');
  } else if (q.kind === 'choice') {
    await page.click(`.ch[data-i="${q.vals.indexOf(q.ans)}"]`);
  } else if (q.kind === 'tap') {
    await page.click(`#prompt [data-v="${q.ans}"]`); // pictures in the prompt (Pre-K "which has more")
  } else if (q.kind === 'build') {
    for (let k = 0; k < q.word.length; k++) {
      const idx = await page.evaluate(ch => {
        const q = G.q;
        for (let j = 0; j < q.tiles.length; j++) if (q.tiles[j] === ch && !G.built.includes(j)) return j;
        return -1;
      }, q.word[k]);
      if (idx < 0) throw new Error('no tile for ' + q.word[k] + ' in ' + q.word);
      await page.click(`.lt[data-i="${idx}"]`);
    }
  } else if (q.kind === 'spell') {
    for (const ch of q.word) await page.click(`.sk[data-ch="${ch}"]`); // in-app keyboard keys
  } else if (q.kind === 'multi') {
    const idx = await page.evaluate(() => G.q.choices.map((c, i) => G.q.ans.map(String).includes(String(c.v)) ? i : -1).filter(i => i >= 0));
    for (const i of idx) await page.click(`.mc[data-i="${i}"]`);
    await page.click('#mcheck');
  } else if (q.kind === 'order') {
    for (let k = 0; k < (await page.evaluate(() => G.q.ans.length)); k++) {
      const idx = await page.evaluate(k => G.q.items.findIndex((t, j) => String(t.v) === String(G.q.ans[k]) && !G.ord.includes(j)), k);
      await page.click(`.ot[data-i="${idx}"]`);
    }
  } else if (q.kind === 'trace') {
    await traceGlyph(page);
  } else if (q.kind === 'match') {
    // P2-14: a review question from an earlier stop can be a match (fractions and percents): pair every left item with its right one
    const pairs = await page.evaluate(() => G.q.items.map((it, i) => [i, G.q.opts.findIndex(o => o.v === it.v)]));
    for (const [i, j] of pairs) {
      await page.click(`.mb[data-s="L"][data-i="${i}"]`);
      await page.click(`.mb[data-s="R"][data-i="${j}"]`);
    }
  } else {
    throw new Error('unknown question kind ' + q.kind);
  }
  return q;
}

// P2-16: one finger stroke through screen points pts: touch through CDP when page.__cdp is set (touch emulation on, like P3-08),
// else the mouse. palm: a wide touch resting on the screen at that point the whole time (it must be ignored).
async function strokeMoves(page, pts, palm) {
  if (page.__cdp) {
    const f = ([x, y]) => ({ x, y, id: 1, radiusX: 8, radiusY: 8, force: 1 });
    const pm = palm ? [{ x: palm[0], y: palm[1], id: 2, radiusX: 55, radiusY: 55, force: 1 }] : [];
    const send = (type, touchPoints) => page.__cdp.send('Input.dispatchTouchEvent', { type, touchPoints });
    if (palm) await send('touchStart', pm);
    await send('touchStart', [...pm, f(pts[0])]);
    for (const p of pts.slice(1)) await send('touchMove', [...pm, f(p)]);
    await send('touchEnd', pm);
    if (palm) await send('touchEnd', []);
  } else {
    await page.mouse.move(pts[0][0], pts[0][1]);
    await page.mouse.down();
    for (const p of pts.slice(1)) await page.mouse.move(p[0], p[1]);
    await page.mouse.up();
  }
}
// P2-16: trace the glyph on screen, stroke by stroke and pass by pass, with real pointer moves made from the stroke data (points
// 3 box units apart, from where a lifted trace stopped). o.miss: the first stroke is first traced backwards (a miss);
// o.palm: the first stroke is traced with a palm resting on the board. Returns when the answer is in.
async function traceGlyph(page, o = {}) {
  // a question that takes input: not the one just answered, still on screen while the round waits to move on
  await page.waitForFunction(() => G && G.q && !G.lock && TR.cur && TR.cur.q === G.q, null, { timeout: 10000 });
  await page.evaluate(() => { window.__tq = G.q; });
  let missed = false, palmed = false;
  for (let guard = 0; guard < 60; guard++) {
    const st = await (await page.waitForFunction(() => {
      const c = TR.cur;
      if (G.q !== window.__tq || G.lock || !c) return 'done';
      return c.k < c.geo.s.length && !c.busy ? 'go' : false; // between passes, during a demo: wait
    }, null, { timeout: 10000 })).jsonValue();
    if (st === 'done') return { missed };
    const miss = o.miss && !missed;
    const { pts, palm } = await page.evaluate(miss => {
      const c = TR.cur, s = c.geo.s[c.k], m = c.svg.getScreenCTM(), out = [];
      const scr = ([x, y]) => [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f];
      if (miss) for (let x = s.L; x >= 0; x -= 3) out.push(scr(TR.at(s, x)));
      else for (let x = c.part; ; x += 3) { out.push(scr(TR.at(s, Math.min(x, s.L)))); if (x >= s.L) break; }
      const r = c.svg.getBoundingClientRect();
      return { pts: out, palm: [r.right - 30, r.bottom - 30] };
    }, miss);
    await strokeMoves(page, pts, o.palm && !palmed && !miss ? palm : null);
    if (miss) missed = true;
    else if (o.palm) palmed = true;
  }
  throw new Error('trace: the glyph was not finished');
}

// Plays the round that is on screen to the end and opens the chest.
async function playRound(page, label, total, onAsk) {
  if (total === undefined) total = await page.evaluate(() => G.n); // 8 at the default grade (K), 6 Pre-K, 10 from 1st
  let n = 0;
  for (let guard = 0; guard < 40; guard++) {
    const state = await page.evaluate(() => document.querySelector('#fin') ? 'fin' : (G && G.q && !G.lock ? 'ask' : 'none'));
    if (state === 'fin') break;
    if (state === 'none') { await page.waitForTimeout(150); continue; }
    await page.evaluate(() => { window.__q = G.q; });
    if (onAsk) await onAsk(n);
    await answer(page);
    n++;
    // wait for the next question object or the finish screen
    await page.waitForFunction(() => document.querySelector('#fin') || (G && G.q !== window.__q), null, { timeout: 8000 });
  }
  await page.waitForSelector('#chest', { timeout: 5000 });
  const score = await page.evaluate(() => G.score);
  if (score !== total) fail(`${label}: expected ${total}/${total} from the bot, got ${score}`);
  await page.click('#chest');
  await page.waitForSelector('#btns', { state: 'visible', timeout: 10000 });
  // a pet growth / hatch overlay may cover the buttons: tap its Yay button when it shows up
  await vwait(page, 800);
  const yay = await page.waitForSelector('#yay', { timeout: 4000 }).catch(() => null);
  if (yay) { await yay.click(); step(`${label}: pet grew, overlay dismissed`); }
  step(`${label}: round complete (${n} answers, score ${score}/${total})`);
}

async function main() {
  const browser = await launch();
  let ctxAll = null;
  try {
    // 1. fresh start: setup screen, then home
    const app = await openApp(browser, { fixture: 'fresh' });
    ctxAll = app;
    const { page, errors, network } = app;
    if (!(await page.$('#nm'))) fail('fresh save should show the setup screen');
    await page.fill('#nm', 'Smoke');
    await page.click('#go');
    await page.waitForSelector('.game[data-p]');
    step('setup done, home shown');
    const ver = await page.evaluate(() => (document.querySelector('.scroll').textContent.match(/Star School (v\d+)/) || [])[1]);
    if (!ver) fail('version label missing at the bottom of home'); else step('version label ' + ver);

    // 2. one full round on each path
    for (const p of ['math', 'read', 'es']) {
      await page.evaluate(() => home());
      await page.click(`.game[data-p="${p}"]`);
      await page.waitForSelector('.node[data-n="0"]');
      await page.click('.node[data-n="0"]');
      if (p === 'es') { await page.waitForSelector('#go'); await page.click('#go'); }
      await page.waitForSelector('#prompt');
      await playRound(page, p);
      await page.click('#menu');
      await page.waitForSelector('#map');
    }

    // 2b. Fact Sprint: play a 20-facts sprint (first answer wrong on purpose), then check the end screen and the saved record
    await page.evaluate(() => home());
    await page.click('#flu');
    await page.waitForSelector('.game[data-s="add10"]');
    await page.click('.game[data-s="add10"]');
    await page.click('.game[data-m="n20"]');
    for (let i = 0; i < 40; i++) {
      await page.waitForFunction(() => document.querySelector('#fagain') || (FL && FL.f && !FL.lock), null, { timeout: 8000 });
      if (await page.$('#fagain')) break;
      let c = await page.evaluate(() => String(FL.f.c));
      // one wrong answer with the same digit count (so it auto-submits): shown for 1 s, comes back later
      if (i === 0) c = String(+c + 1).length === c.length ? String(+c + 1) : String(+c - 1);
      for (const d of c) await page.click(`.k[data-k="${d}"]`);
    }
    await page.waitForSelector('#fagain', { timeout: 8000 });
    const flu = await page.evaluate(() => ({ best: S.flu['add10-20'].best, n: S.flu['add10-20'].hist.length, paid: !!S.flu.add10.paid }));
    if (!(flu.best > 0) || flu.n !== 1 || !flu.paid) fail('fact sprint not saved: ' + JSON.stringify(flu));
    else step('Fact Sprint 20 facts played, saved ' + JSON.stringify(flu));
    await page.click('#fhome');
    await page.waitForSelector('#gear');

    // 3. Game Room and Grown-ups (long press on the gear, like a grown-up would)
    await page.evaluate(() => home());
    await page.click('#groom');
    await page.waitForSelector('#g4x4');
    step('Game Room opened');
    await page.click('#back');
    await page.waitForSelector('#gear');
    const box = await (await page.$('#gear')).boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await vwait(page, 1500);
    await page.mouse.up();
    await page.waitForSelector('#ula', { timeout: 3000 });
    step('Grown-ups opened');

    // 4. old save loads (midway fixture) with its progress intact
    const old = await openApp(browser, { fixture: 'midway' });
    const snap = await old.page.evaluate(() => ({ stars: S.stars, coins: S.coins, name: S.name, hat: S.wear.hat,
      math: Object.keys(S.maps.math).length, read: Object.keys(S.maps.read).length, es: Object.keys(S.maps.es).length }));
    if (snap.stars !== 85 || snap.coins !== 64 || snap.name !== 'Ava' || snap.hat !== '🎩' || !snap.math || !snap.read || !snap.es) fail('midway fixture not loaded as saved: ' + JSON.stringify(snap));
    else step('midway fixture loads intact: ' + JSON.stringify(snap));
    errors.push(...old.errors);
    network.push(...old.network);
    await old.ctx.close();

    // A11, A11b: the Brain Teaser puzzle types (bt.<VER>.js), the Game Room (games.<VER>.js) and the data banks (data.<VER>.js) are
    // files of their own, each loaded by a plain <script> over file://, in that order. Check the data globals, open a reading
    // passage, build a vocabulary question and read a sudoku puzzle; the puzzle types are registered and their CSS is in, and a
    // maze, a pattern and a number pyramid open from the Brain Teasers hub; the Game Room opens. Then the version guard: a copy of
    // index.html with one file missing, or with a file of another release, shows "Try again" instead of starting and changes no
    // progress; Try again with the file back starts the app.
    {
      const d = await openApp(browser, { fixture: 'midway' });
      const g = await d.page.evaluate(() => {
        const src = [...document.scripts].filter(s => s.src).map(s => s.getAttribute('src'));
        const vq = genQ('vocab', 1, 4242);
        const pz = PUZ.sudoku.A.easy[0].split('|');
        const ix = NODES.read.findIndex(n => n.sk === 'info' && n.lv === 1);
        return { src, files: appFiles(), dv: DATA_VER, ready: dataReady(), gram: BANK.gram.length, vocab: BANK.vocab.length, comp: PASS.comp.length,
          info: PASS.info.length, spell: typeof genSpell, vq: !!(vq.kind && vq.ans && vq.html && vq.sk === 'vocab'),
          pz: pz.length + ':' + pz[0].length + ':' + pz[1].length, ix, bt: BT.list().map(t => t.id).join(),
          css: [...document.querySelectorAll('head style')].map(s => s.id || 'main').join(), games: [typeof garage, typeof blockBuilder, typeof colorMenu].join() };
      });
      const files = g.files.map(f => f[0] + '.' + g.dv + '.js'), want = 'data.' + g.dv + '.js';
      if (JSON.stringify(g.src) !== JSON.stringify(files) || files[files.length - 1] !== want || !g.ready || !(g.gram > 0 && g.vocab > 0 && g.comp > 0 && g.info > 0)
        || g.spell !== 'function' || !g.vq || g.pz !== '3:16:16' || g.ix < 0) {
        fail('A11 data globals: ' + JSON.stringify(g));
      }
      if (!['maze', 'pattern', 'pyramid', 'balance', 'target'].every(id => g.bt.split(',').includes(id)) || g.css !== 'main,css-bt'
        || g.games !== 'function,function,function') fail('A11b part files: ' + JSON.stringify(g));
      await d.page.evaluate(ix => start('read', ix), g.ix);
      await d.page.waitForSelector('.bctx-p .w', { timeout: 8000 });
      const words = await d.page.evaluate(() => document.querySelectorAll('.bctx-p .w').length);
      if (words < 20) fail('A11: reading passage did not open (' + words + ' words)');
      else step('A11: ' + files.join(', ') + ' loaded over file:// (' + g.vocab + ' vocabulary items, ' + g.comp + '+' + g.info + ' passages, '
        + 'sudoku bank), a vocabulary question built, a passage opened (' + words + ' words)');
      await d.page.evaluate(() => { G.dead = true; S.grade = 3; save(); home(); });
      // A11b: each puzzle file's types open from the hub, laid out by the CSS that came with bt.<VER>.js
      const opened = [];
      for (const [id, sel, box] of [['maze', '.mz-cv', '.mz'], ['pattern', '#btstage .pt-ch', '.pt-chs'], ['pyramid', '#btstage .bn', '.bn']]) {
        try {
          await d.page.waitForSelector('#btcard', { timeout: 5000 });
          await d.page.evaluate(() => document.querySelector('#btcard').scrollIntoView({ block: 'center' }));
          await d.page.click('#btcard');
          await d.page.click(`.bt-hub [data-t="${id}"]`, { timeout: 5000 });
          await d.page.click('.bt-lv[data-l="1"]', { timeout: 5000 });
          await d.page.waitForSelector(sel, { timeout: 8000 });
          const r = await d.page.evaluate(b => ({ id: S.bt.cur && S.bt.cur.id, grid: getComputedStyle(document.querySelector(b)).display }), box);
          if (r.id !== id || !/flex|grid/.test(r.grid)) fail('A11b: ' + id + ' puzzle: ' + JSON.stringify(r));
          else opened.push(id + ' (' + box + ' ' + r.grid + ')');
        } catch (e) { fail('A11b: ' + id + ' puzzle did not open from the hub: ' + e.message.split('\n')[0]); }
        await d.page.evaluate(() => { BT.stop(); home(); });
      }
      // A11b: the Game Room (games.<VER>.js) opens and lists the games
      await d.page.evaluate(() => gameRoom());
      await d.page.waitForSelector('#gbb', { timeout: 5000 }).catch(() => {});
      const room = await d.page.evaluate(() => ['#g4x4', '#gcbn', '#gbb'].filter(s => document.querySelector(s)).length);
      if (room !== 3) fail('A11b: the Game Room did not open (' + room + ' of 3 games)');
      if (opened.length === 3 && room === 3) step('A11b: puzzle types ' + g.bt + ' registered from ' + files[0] + ', its <style> in, opened from the hub: '
        + opened.join(', ') + '; Game Room from ' + files[1] + ' opened');
      await d.page.evaluate(() => home());
      errors.push(...d.errors);
      network.push(...d.network);
      await d.ctx.close();

      const fs = require('fs'), os = require('os'), path = require('path');
      const { ROOT } = require('./lib/browser');
      const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ss-a11-'));
      for (const f of ['index.html', 'manifest.json', 'icon-192.png', 'icon-512.png', ...files]) fs.copyFileSync(path.join(ROOT, f), path.join(tmp, f));
      const url = 'file://' + path.join(tmp, 'index.html');
      const NOFILE = /ERR_FILE_NOT_FOUND|Failed to load resource/;
      const guard = async (label, allowed, log) => {
        const a = await openApp(browser, { fixture: 'midway', url });
        await a.page.waitForSelector('#dataretry', { timeout: 5000 }).catch(() => {});
        const r = await a.page.evaluate(() => ({ retry: !!document.querySelector('#datamiss #dataretry'), home: !!document.querySelector('.game[data-p]'),
          stars: S.stars, coins: S.coins, math: Object.keys(S.maps.math).length, err: (S.err || []).map(e => e.msg).pop() || '',
          wide: document.documentElement.scrollWidth > innerWidth }));
        const bad = a.errors.filter(e => !allowed.test(e));
        if (!r.retry || r.home || r.stars !== 85 || r.coins !== 64 || r.err !== log + ' (app ' + g.dv + ')' || r.wide || bad.length || a.network.length) {
          fail('A11 guard (' + label + '): ' + JSON.stringify(r) + ' ' + bad.concat(a.network).join(' | '));
        } else step('A11 guard, ' + label + ': app does not start, shows Try again, progress unchanged, App log: ' + r.err);
        return a;
      };
      const retry = async (a, label, then) => {
        await a.page.click('#dataretry');
        await a.page.waitForSelector('.game[data-p]', { timeout: 10000 }).catch(() => {});
        const back = await a.page.evaluate(() => ({ home: !!document.querySelector('.game[data-p]'), stars: S.stars, coins: S.coins, ready: dataReady() }));
        const extra = then && back.home ? await then(a.page) : '';
        const after = a.errors.filter(e => !NOFILE.test(e));
        if (!back.home || !back.ready || back.stars !== 85 || back.coins !== 64 || after.length || extra.startsWith('NO')) fail('A11 guard: Try again with the ' + label + ' back: ' + JSON.stringify(back) + ' ' + extra + after.join(' | '));
        else step('A11 guard: Try again with the ' + label + ' back starts the app (stars ' + back.stars + ', coins ' + back.coins + ')' + extra);
        await a.ctx.close();
      };
      // 1. no data file next to index.html (offline before it was cached): the browser reports the missing file, nothing else
      fs.rmSync(path.join(tmp, want));
      const a1 = await guard('data file missing', NOFILE, 'data file missing');
      fs.copyFileSync(path.join(ROOT, want), path.join(tmp, want));
      await retry(a1, 'data file');
      // 2. a data file from another release under this release's name (a cache that kept half an update)
      fs.writeFileSync(path.join(tmp, want), fs.readFileSync(path.join(ROOT, want), 'utf8').replace("var DATA_VER='" + g.dv + "'", "var DATA_VER='v1'"));
      const a2 = await guard('data file of another release', /^$/, 'data file v1 does not match');
      await a2.ctx.close();
      fs.copyFileSync(path.join(ROOT, want), path.join(tmp, want));
      // 3. A11b: no puzzle file; with it back, Try again starts the app and a maze opens from the hub
      fs.rmSync(path.join(tmp, files[0]));
      const a3 = await guard(files[0] + ' missing', NOFILE, 'bt file missing');
      fs.copyFileSync(path.join(ROOT, files[0]), path.join(tmp, files[0]));
      await retry(a3, files[0], async pg => {
        try {
          await pg.evaluate(() => document.querySelector('#btcard').scrollIntoView({ block: 'center' }));
          await pg.click('#btcard');
          await pg.click('.bt-hub [data-t="maze"]', { timeout: 5000 });
          await pg.click('.bt-lv[data-l="1"]', { timeout: 5000 });
          await pg.waitForSelector('.mz-cv', { timeout: 8000 });
          return ', a maze opened from the hub';
        } catch (e) { return 'NO MAZE: ' + e.message.split('\n')[0] + ' '; }
      });
      // 4. A11b: a games file from another release
      fs.writeFileSync(path.join(tmp, files[1]), fs.readFileSync(path.join(ROOT, files[1]), 'utf8').replace("var GAMES_VER='" + g.dv + "'", "var GAMES_VER='v1'"));
      const a4 = await guard(files[1] + ' of another release', /^$/, 'games file v1 does not match');
      await a4.ctx.close();
      fs.rmSync(tmp, { recursive: true, force: true });
    }

    // 5. P0-05 error guard: throw inside a round -> friendly "go home" button, error logged, shown in the App log.
    //    The injected error is the only one allowed; it is removed from the list below, everything else still fails the run.
    const MARK = 'P0-05 injected test error';
    await page.evaluate(() => home());
    await page.click('.game[data-p="math"]');
    await page.waitForSelector('.node[data-n="0"]');
    await page.click('.node[data-n="0"]');
    await page.waitForSelector('#prompt');
    await page.evaluate(m => setTimeout(() => { throw new Error(m); }, 0), MARK);
    await page.waitForSelector('#oops', { timeout: 3000 });
    step('injected error mid-round: friendly button shown');
    await page.click('#oops');
    await page.waitForSelector('.game[data-p]');
    const logged = await page.evaluate(() => (S.err || []).map(e => e.msg));
    if (!logged.some(m => m.includes(MARK))) fail('injected error not in S.err: ' + JSON.stringify(logged)); else step('recovered to home, error in S.err');
    await page.evaluate(() => grown());
    await page.waitForSelector('#applog');
    const logTxt = await page.evaluate(() => document.querySelector('#applog').textContent);
    if (!logTxt.includes(MARK)) fail('App log does not show the injected error'); else step('App log shows the injected error');
    const injected = errors.filter(e => e.includes(MARK));
    if (injected.length !== 1) fail('expected exactly 1 injected page error, saw ' + injected.length);
    for (let i = errors.length - 1; i >= 0; i--) if (errors[i].includes(MARK)) errors.splice(i, 1);

    // 6. P5-04 streak: the rounds played above counted today; the flame on Home opens the month grid
    const stk = await page.evaluate(() => ({ n: (S.streak.days[today()] || 0), best: S.streak.best }));
    if (stk.n < 1 || stk.best < 1) fail('finished rounds did not count for the streak: ' + JSON.stringify(stk)); else step('streak counted ' + stk.n + ' rounds today');
    await page.evaluate(() => home());
    await page.click('#stkb');
    await page.waitForSelector('.stc-grid');
    const cal = await page.evaluate(() => ({ on: document.querySelectorAll('.stc-d.on').length, now: document.querySelectorAll('.stc-d.now').length }));
    if (cal.on < 1 || cal.now !== 1) fail('streak calendar grid wrong: ' + JSON.stringify(cal)); else step('streak calendar opens with today marked and a star on active days');
    await page.click('#back');
    await page.waitForSelector('#stkb');

    // 7. number pad: after the second wrong try the slot must show the right answer, not the child's wrong number
    await page.evaluate(() => home());
    await page.click('.game[data-p="math"]');
    // P2-01: node 0 is Tiny Town now; P2-02: a K child's map opens on Shape Garden. Number Meadow's first stop is a number-pad question: open its chip first
    const meadowW = await page.evaluate(() => PATHS.math.worlds.findIndex(w => w.id === 'm_meadow'));
    const meadow0 = await page.evaluate(() => WR.math[PATHS.math.worlds.findIndex(w => w.id === 'm_meadow')][0]);
    await page.waitForSelector('.wchip.on');
    await page.click(`.wchip[data-w="${meadowW}"]`);
    await page.waitForSelector(`.node[data-n="${meadow0}"]`);
    await page.click(`.node[data-n="${meadow0}"]`);
    let numSeen = false;
    for (let i = 0; i < 10 && !numSeen; i++) {
      await page.waitForFunction(() => G && G.q && !G.lock, null, { timeout: 8000 });
      if (await page.evaluate(() => G.q.kind !== 'num')) {
        await page.evaluate(() => { window.__q = G.q; });
        await answer(page);
        await page.waitForFunction(() => document.querySelector('#fin') || (G && G.q !== window.__q), null, { timeout: 8000 });
        if (await page.$('#fin')) break;
        continue;
      }
      numSeen = true;
      const ans = await page.evaluate(() => G.q.ans);
      const wrong = ans === '9' ? '8' : '9';
      for (let t = 0; t < 2; t++) {
        await page.waitForFunction(() => G && !G.lock, null, { timeout: 8000 });
        await page.click(`.k[data-k="${wrong}"]`);
        await page.click('.k[data-k="go"]');
      }
      await page.waitForTimeout(200);
      const slot = await page.evaluate(() => document.querySelector('#slot').textContent);
      if (slot !== ans) fail(`number pad reveal shows "${slot}", expected the answer "${ans}"`);
      else step('number pad: second wrong try reveals the right answer in the slot');
    }
    if (!numSeen) fail('number pad step: no number question in the first math round');

    // 8. content bank: the round hook plays one passage with 5 questions, the passage panel opens, closes and scrolls
    //    (demo skills are not on a map, so the step adds a node to the read path by hand)
    await vwait(page, 2800); // TOOL-01: the number-pad reveal above leaves a pending next() (2.6 s); let it fire before leaving the round
    await page.evaluate(() => home());
    await page.evaluate(() => {
      SK.passdemo = { t: 'Passage demo', e: '📗', area: 'read', max: 1, bank: 'demo', gen: lv => genPassage('demo', lv), round: lv => passageRound('passdemo', 'demo', lv) };
      NODES.read.push({ ...NODES.read[0], sk: 'passdemo', lv: 1 });
      start('read', NODES.read.length - 1);
    });
    await page.waitForSelector('.bctx');
    const bk = await page.evaluate(() => ({ n: G.n, pool: G.pool.length + 1, open: document.querySelector('.bctx').open, words: document.querySelectorAll('.bctx-p .w').length }));
    if (bk.n !== 5 || bk.pool !== 5) fail('passage round should have 5 questions: ' + JSON.stringify(bk));
    if (!bk.open || bk.words < 20) fail('passage panel not open with its words: ' + JSON.stringify(bk));
    await page.click('.bctx-p .w');
    await page.click('.bctx-h');
    const closed = await page.evaluate(() => !document.querySelector('.bctx').open && document.querySelector('.bctx').offsetHeight < 80);
    if (!closed) fail('passage panel did not close');
    await page.click('.bctx-h');
    const text0 = await page.evaluate(() => document.querySelector('.bctx-p').textContent);
    let asked = 0;
    for (let guard = 0; guard < 30; guard++) {
      const state = await page.evaluate(() => document.querySelector('#fin') ? 'fin' : (G && G.q && !G.lock ? 'ask' : 'none'));
      if (state === 'fin') break;
      if (state === 'none') { await page.waitForTimeout(150); continue; }
      const same = await page.evaluate(t => document.querySelector('.bctx-p').textContent === t, text0);
      if (!same) fail('passage text changed between questions');
      await page.evaluate(() => { window.__q = G.q; });
      await answer(page);
      asked++;
      await page.waitForFunction(() => document.querySelector('#fin') || (G && G.q !== window.__q), null, { timeout: 8000 });
    }
    const sc = await page.evaluate(() => G.score);
    if (asked !== 5 || sc !== 5) fail(`passage round: asked ${asked}, score ${sc}, expected 5 and 5`);
    else step('passage round: one passage, 5 questions, panel opens and closes, score 5/5');
    await page.click('#chest', { timeout: 5000 }).catch(() => {});
    const stars = await page.evaluate(() => getSt('read', NODES.read.length - 1));
    if (stars !== 3) fail('passage round with 5 of 5 should earn 3 stars, got ' + stars); else step('5 of 5 on a 5-question round earns 3 stars');

    // 9. new kinds B (P1-04): the bot plays a sample of each through the real round engine
    const KB = require('./lib/kb-samples.js');
    const kbShow = async name => {
      await vwait(page, 2800); // the engine's own pending next() from the last sample must fire before a new round starts
      await page.evaluate(() => home());
      await page.evaluate(q => { start('math', 0); G.q = q; renderQ(); }, KB[name]);
    };
    const kbState = () => page.evaluate(() => ({ lock: G.lock, tries: G.tries, ok: !!document.querySelector('.mt.ok, .tp.right, .ls.ok'), done: G.done }));
    // match: one wrong pair is a miss and keeps the round going; then every pair right passes
    await kbShow('match');
    await page.click('.mb[data-s="L"][data-i="0"]');
    await page.click('.mb[data-s="R"][data-i="0"]'); // cat with puppy: wrong
    let st = await kbState();
    if (st.tries !== 1 || st.lock) fail('match: a wrong pair should count one miss and stay open ' + JSON.stringify(st));
    for (const [l, r] of [[0, 2], [1, 0], [2, 3], [3, 1]]) {
      await page.click(`.mb[data-s="L"][data-i="${l}"]`);
      await page.click(`.mb[data-s="R"][data-i="${r}"]`);
    }
    st = await kbState();
    if (!st.lock || !st.ok || st.done !== 1) fail('match: all pairs right did not pass ' + JSON.stringify(st)); else step('match: wrong pair = miss, then all pairs right passes');
    // match: two wrong pairs reveal every pair
    await kbShow('match');
    for (let t = 0; t < 2; t++) {
      await page.waitForFunction(() => G && !G.lock, null, { timeout: 4000 });
      await page.click('.mb[data-s="L"][data-i="0"]');
      await page.click('.mb[data-s="R"][data-i="0"]');
    }
    const shown = await page.evaluate(() => document.querySelectorAll('.mb.done').length);
    if (shown !== 8) fail('match: second miss should reveal all 8 buttons as paired, got ' + shown); else step('match: second miss reveals the pairs');
    // tap: wrong tap marks it, right tap passes
    await kbShow('tapWord');
    await page.click('.tp[data-v="mat"]');
    st = await kbState();
    if (st.tries !== 1 || st.lock) fail('tap: wrong tap should count one miss ' + JSON.stringify(st));
    await page.click('.tp[data-v="cat"]');
    st = await kbState();
    if (!st.lock || !st.ok) fail('tap: right tap did not pass ' + JSON.stringify(st)); else step('tap: wrong tap = miss, right tap passes');
    // spell: in-app keyboard only; wrong word keeps the right start; es keyboard has the accent row
    await kbShow('spell');
    for (const c of 'cut') await page.click(`.sk[data-ch="${c}"]`);
    await page.waitForFunction(() => G && !G.lock && G.typed === 'c', null, { timeout: 4000 });
    for (const c of 'at') await page.click(`.sk[data-ch="${c}"]`);
    st = await kbState();
    if (!st.lock || !st.ok) fail('spell: cat did not pass ' + JSON.stringify(st));
    await kbShow('spellEs');
    for (const c of 'niño') await page.click(`.sk[data-ch="${c}"]`);
    st = await kbState();
    if (!st.lock || !st.ok) fail('spell es: niño did not pass ' + JSON.stringify(st)); else step('spell: wrong word keeps its right start; cat and niño (accent key) pass');
    const kbBox = await page.evaluate(() => { const b = document.querySelector('.sk').getBoundingClientRect(); return b.height; });
    if (kbBox < 48) fail('spell key shorter than 48 px: ' + kbBox);
    await page.evaluate(() => home());

    // 10. P1-05 long maps: world strip on an old save (opens on the current world, real taps switch worlds), then
    //    map draw time with 16 fake worlds (~150 stops) at 6x CPU throttle must stay under 50 ms
    {
      const wm = await openApp(browser, { fixture: 'midway' });
      const wp = wm.page;
      await wp.evaluate(() => home());
      await wp.click('.game[data-p="math"]');
      await wp.waitForSelector('.wchip.on');
      const st = await wp.evaluate(() => ({ n: PATHS.math.worlds.length, chips: document.querySelectorAll('.wchip').length, on: +document.querySelector('.wchip.on').dataset.w,
        cur: document.querySelector('.node.cur') && +document.querySelector('.node.cur').dataset.n, ...(() => {
          const ix = id => PATHS.math.worlds.findIndex(w => w.id === id);
          return { candy: ix('m_candy'), space: ix('m_space'), sh: WR.math[ix('m_candy')][0] - 7 }; // sh: stops before Candy Canyon, beyond Number Meadow's 7 (P2-01 Tiny Town, P2-02 Shape Garden)
        })() }));
      // by world id since P2-02: Candy Canyon is world 3 and its current stop is its third (9 + sh; was world 1, stop 9)
      if (st.chips !== st.n || st.on !== st.candy || st.cur !== 9 + st.sh) fail('math map on midway: ' + JSON.stringify(st));
      else step('math map opens on Candy Canyon (current stop ' + st.cur + ') with ' + st.chips + ' world chips');
      const SH = st.sh;
      await wp.click(`.wchip[data-w="${st.space}"]`); // Space Station
      await wp.waitForSelector(`.wchip.on[data-w="${st.space}"]`);
      const far = await wp.evaluate(sp => ({ first: document.querySelector('.node[data-n="0"]') !== null, space: document.querySelector('.node[data-n="' + WR.math[sp][1] + '"]') !== null,
        up: document.querySelector('.wmore') && +document.querySelector('.wmore').dataset.w }), st.space);
      // the map draws the picked world and its neighbours; "more worlds" opens the next world beyond them (Clock Tower since P2-03)
      if (far.first || !far.space || far.up !== st.space - 2) fail('world chip did not switch the map: ' + JSON.stringify(far));
      await wp.click('.wmore');
      await wp.waitForSelector(`.wchip.on[data-w="${st.space - 2}"]`);
      await wp.click(`.wchip[data-w="${st.candy}"]`);
      await wp.waitForSelector(`.wchip.on[data-w="${st.candy}"]`);
      await wp.click('.node[data-n="' + (10 + SH) + '"]'); // locked stop: stays on the map
      if (!(await wp.$('#map'))) fail('locked stop opened something');
      else step('world chips and "more worlds" button switch worlds; locked stop stays locked');
      const ms = await wp.evaluate(() => {
        const base = PATHS.math.worlds.slice();
        for (let k = 0; PATHS.math.worlds.length < 16; k++) {
          const w = base[k % base.length];
          PATHS.math.worlds.push({ ...w, id: 'm_fake' + k, g: Math.min(6, 2 + (k >> 1)), nodes: w.nodes.concat(w.nodes.slice(0, 1)) });
        }
        buildNodes('math');
        return NODES.math.length;
      });
      const cdp = await wp.context().newCDPSession(wp);
      // fastest of 9 throttled draws; when the machine is busier than its cores (parallel checks), slower draws measure the load,
      // not the map, so a failing pass is measured again (up to 3 more times, a second apart) and the best pass counts. The 50 ms
      // limit is unchanged, so a real slowdown still fails on a quiet machine. The load is reported with the result.
      const os = require('os'), cores = os.cpus().length;
      let times, tries = 0, load = os.loadavg()[0];
      for (;;) {
        await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 });
        const t = await wp.evaluate(() => {
          pathMap('math', 8);
          const t = [];
          for (let r = 0; r < 9; r++) { MAPW.math = 6 + (r % 4); const rn = window.__realNow || (() => performance.now()); /* TOOL-01: real time, not the virtual clock */ const t0 = rn(); drawMap('math'); void $('#map').offsetHeight; t.push(rn() - t0); }
          return t.sort((a, b) => a - b);
        });
        await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
        tries++; load = os.loadavg()[0];
        if (!times || t[0] < times[0]) times = t;
        if (times[0] < 50 || tries >= 4 || load <= cores) break;
        await new Promise(r => setTimeout(r, 1000));
      }
      const med = times[0];
      const how = `fastest of 9, ${tries} pass${tries > 1 ? 'es' : ''}, load ${load.toFixed(1)} on ${cores} cores`;
      if (med >= 50) fail(`map draw with 16 worlds (${ms} stops) at 6x throttle: ${med.toFixed(1)} ms (${how}, limit 50)`);
      else step(`map draw with 16 worlds (${ms} stops) at 6x CPU throttle: ${med.toFixed(1)} ms (${how}), worst ${times[8].toFixed(1)} ms`);
      errors.push(...wm.errors);
      network.push(...wm.network);
      await wm.ctx.close();
    }

    // 11. new kinds A (P1-03): the bot plays every sample question of tools/kinds-samples.js through the real engine at 380x780
    //    (right answers, 48 px targets, no sideways scroll), then gets three of them wrong twice and checks the reveal
    // the number-pad step above leaves the old round's 2.6 s next-question timer running; let it fire before the new round starts
    await page.evaluate(() => home());
    await vwait(page, 3000);
    await page.setViewportSize({ width: 380, height: 780 });
    await page.evaluate(src => { window.__S2 = eval(src)(); }, '(' + require('./kinds-samples').make.toString() + ')');
    const names = await page.evaluate(() => Object.keys(window.__S2));
    await page.evaluate(() => { G = newG({ sk: 'zz_demo', mix: true, n: Object.keys(window.__S2).length, pool: Object.values(window.__S2) }); next(); });
    for (const nm of names) {
      await page.waitForFunction(() => G && G.q && !G.lock, null, { timeout: 8000 });
      await page.waitForTimeout(500); // let the screen's entrance animation finish before measuring
      const m = await page.evaluate(() => {
        const small = [...document.querySelectorAll('.k, .mc, .ot, .os, #mcheck, .ch')].filter(e => e.getBoundingClientRect().height < 47.5 || e.getBoundingClientRect().width < 47.5)
          .map(e => e.className + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height));
        return { small, wide: document.documentElement.scrollWidth > window.innerWidth + 1, label: G.q.label };
      });
      if (m.small.length) fail(`${m.label}: targets under 48 px: ${m.small.join(', ')}`);
      if (m.wide) fail(`${m.label}: page scrolls sideways at 380 wide`);
      await page.evaluate(() => { window.__q = G.q; });
      await answer(page).catch(async e => { throw new Error(`new kinds: playing "${nm}" failed: ` + String(e.message).split('\n')[0]); });
      await page.waitForFunction(() => document.querySelector('#fin') || (G && G.q !== window.__q), null, { timeout: 8000 });
    }
    await page.waitForSelector('#chest', { timeout: 5000 });
    const sc2 = await page.evaluate(() => G.score);
    if (sc2 !== names.length) fail(`new kinds: bot scored ${sc2}/${names.length}`); else step(`new kinds: ${names.length} sample questions answered right (${names.join(', ')}), targets 48 px, no sideways scroll`);

    // wrong twice: the reveal shows the right answer (num: slot, multi: right boxes, order: slots)
    const wrongOf = ['dec', 'multi', 'order'];
    await page.evaluate(w => { G = newG({ sk: 'zz_demo', mix: true, n: w.length, pool: w.map(k => window.__S2[k]) }); next(); }, wrongOf);
    for (const nm of wrongOf) {
      await page.evaluate(() => { window.__q = G.q; });
      for (let t = 0; t < 2; t++) {
        await page.waitForFunction(() => G && !G.lock, null, { timeout: 8000 });
        if (nm === 'dec') { await page.click('.k[data-k="9"]'); await page.click('.k[data-k="go"]'); }
        else if (nm === 'multi') {
          const i = await page.evaluate(() => G.q.choices.findIndex(c => !G.q.ans.includes(c.v)));
          await page.click(`.mc[data-i="${i}"]`); await page.click('#mcheck');
        } else {
          const order = await page.evaluate(() => G.q.ans.slice().reverse().map(v => G.q.items.findIndex(t => t.v === v)));
          for (const i of order) await page.click(`.ot[data-i="${i}"]`);
        }
      }
      await page.waitForTimeout(150);
      const rev = await page.evaluate(() => {
        const q = G.q;
        if (q.kind === 'num') return document.querySelector('#slot').textContent === q.ans && document.querySelector('#slot').classList.contains('rev');
        if (q.kind === 'multi') return [...document.querySelectorAll('.mc.right')].map(b => q.choices[b.dataset.i].v).join() === q.ans.join();
        return [...document.querySelectorAll('.os')].map(b => b.textContent).join() === q.ans.join();
      });
      if (!rev) fail(`new kinds: ${nm} reveal after two wrong tries does not show the right answer`);
      else step(`new kinds: ${nm} second wrong try reveals the right answer`);
      await page.waitForFunction(() => document.querySelector('#fin') || (G && G.q !== window.__q), null, { timeout: 8000 });
    }
    await page.evaluate(() => home());

    // 12. P1-06 grade pick: setup offers 8 grade buttons (K preselected); Pre-K is picked by a real tap and its round has 6 questions;
    //     Grown-ups changes the grade to 3rd, the last world opens (the Pre-K progress stays) and a round has 10 questions
    {
      const ga = await openApp(browser, { fixture: 'fresh' });
      const gp = ga.page;
      const gr = await gp.evaluate(() => ({ n: document.querySelectorAll('.gr').length, sel: document.querySelector('.gr.sel').dataset.g,
        min: Math.min(...[...document.querySelectorAll('.gr')].map(b => b.offsetHeight)) })); // layout height: not affected by the entrance animation's transform
      if (gr.n !== 8 || gr.sel !== '0' || gr.min < 48) fail('setup grade buttons: ' + JSON.stringify(gr));
      await gp.fill('#nm', 'Tiny');
      await gp.click('.gr[data-g="-1"]');
      await gp.click('#go');
      await gp.waitForSelector('.game[data-p]');
      if ((await gp.evaluate(() => S.grade)) !== -1) fail('Pre-K tap on setup not saved');
      await gp.click('.game[data-p="math"]');
      await gp.waitForSelector('.node.cur');
      await gp.click('.node.cur');
      await gp.waitForSelector('#prompt');
      const n6 = await gp.evaluate(() => G.n);
      await playRound(gp, 'Pre-K math', 6);
      if (n6 !== 6) fail('Pre-K round length ' + n6); else step('setup: 8 grade buttons, Pre-K saved, round has 6 questions');
      await gp.evaluate(() => home());
      await gp.waitForSelector('#gear');
      const gb = await (await gp.$('#gear')).boundingBox();
      await gp.mouse.move(gb.x + gb.width / 2, gb.y + gb.height / 2);
      await gp.mouse.down();
      await vwait(gp, 1500);
      await gp.mouse.up();
      await gp.waitForSelector('.gr[data-g="3"]', { timeout: 3000 });
      await gp.click('.gr[data-g="3"]');
      if ((await gp.evaluate(() => S.grade)) !== 3) fail('Grown-ups grade change not saved');
      const sel = await gp.evaluate(() => document.querySelector('.gr.sel').dataset.g);
      await gp.click('#back');
      await gp.click('.game[data-p="math"]');
      await gp.waitForSelector('.node.cur');
      const cw = await gp.evaluate(() => worldOpen('math', PATHS.math.worlds.findIndex(w => w.id === 'm_frac'))); // the last grade-3 world (P2-09: Factor Factory, grade 4, is now last)
      await gp.click('.node.cur');
      await gp.waitForSelector('#prompt');
      const n10 = await gp.evaluate(() => G.n);
      if (sel !== '3' || !cw || n10 !== 10) fail('grade 3 from Grown-ups: selected ' + sel + ', world ' + cw + ', n ' + n10);
      else step('Grown-ups: grade changed to 3rd, the last world is open (the Pre-K progress stays), round has 10 questions');
      network.push(...ga.network);
      for (const e of ga.errors) fail(e);
      await ga.ctx.close();
    }

    // P5-05 activity log: a real round through the UI writes today's entry (rounds, questions, first-try right, seconds per subject)
    // and it is saved to localStorage; a hidden-tab period inside a question adds no seconds
    {
      const aa = await openApp(browser, { fixture: 'midway' });
      const ap = aa.page;
      await ap.waitForSelector('.game[data-p="math"]');
      await ap.evaluate(() => { S.log = []; });
      await ap.click('.game[data-p="math"]');
      await ap.waitForSelector('.node.cur');
      await ap.click('.node.cur');
      await ap.waitForSelector('#prompt');
      const nA = await ap.evaluate(() => G.n);
      await playRound(ap, 'activity round', nA);
      const lg = await ap.evaluate(() => ({ e: ACT.entry(today()), saved: JSON.parse(localStorage.getItem(KEY)).log }));
      const e = lg.e;
      if (!e || e.rounds !== 1 || e.q !== nA || e.ok !== nA || !(e.sec >= nA) || e.sec > nA * 60 || !e.by.math || e.by.math !== e.sec)
        fail('activity log after one round: ' + JSON.stringify(e));
      else if (!lg.saved || !lg.saved.length || lg.saved[0].rounds !== 1) fail('activity log not saved: ' + JSON.stringify(lg.saved));
      else step(`activity log: one round wrote 1 round, ${e.q} questions, ${e.sec} s of math, saved to the device`);
      network.push(...aa.network);
      for (const x of aa.errors) fail(x);
      await aa.ctx.close();
    }

    // P1-07 placement quiz at 380x780: a new K child sees the "Find my level" card on Home; quitting after 2 answers changes
    //    nothing; a full run with every answer right (real taps) passes every math world below the last in 20 questions (5 sets; P2-01 Tiny Town, P2-05 Multiply Mountain), shows the result,
    //    saves S.place and the skips, keeps stars and coins, and the map opens on the last world. Grown-ups shows the result.
    {
      const pa = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      const pp = pa.page;
      await pp.fill('#nm', 'Placer');
      await pp.click('#go');
      await pp.waitForSelector('#plcard [data-place="math"]');
      const card = await pp.evaluate(() => [...document.querySelectorAll('#plcard .btn')].map(b => [b.offsetWidth, b.offsetHeight]));
      if (card.length !== 3 || card.some(([w, h]) => w < 48 || h < 48)) fail('placement card buttons: ' + JSON.stringify(card));
      const snap = () => pp.evaluate(() => {
        const pick = o => JSON.stringify({ maps: o.maps, skip: o.skip, place: o.place, stars: o.stars, coins: o.coins, prog: o.prog, wdone: o.wdone, grade: o.grade });
        return { mem: pick(S), disk: pick(JSON.parse(localStorage.getItem(KEY))) };
      });
      const s0 = await snap();
      // the bot answers through the round helper, which reads G: point G at the quiz state while answering
      const answerPL = async () => {
        await pp.waitForFunction(() => PL && PL.q && !PL.lock && document.querySelector('#prompt'), null, { timeout: 8000 });
        await pp.waitForTimeout(250);
        await pp.evaluate(() => { window.__pq = PL.q; G = PL; });
        await answer(pp);
        await pp.evaluate(() => { G = null; });
      };
      await pp.click('#plcard [data-place="math"]');
      await pp.waitForSelector('#plgo');
      await pp.click('#plgo');
      await answerPL();
      await answerPL();
      const ui = await pp.evaluate(() => ({ dots: document.querySelectorAll('.pl-dot').length, on: document.querySelectorAll('.pl-dot.on').length,
        stars: !!document.querySelector('#starc'), hint: !!document.querySelector('#hb'), quit: Math.min(...['#quit', '#spk'].map(s => document.querySelector(s)).filter(Boolean).map(b => Math.min(b.offsetHeight, b.offsetWidth))),
        wide: document.documentElement.scrollWidth }));
      if (ui.dots !== 4 || ui.stars || ui.hint || ui.quit < 48 || ui.wide > 380) fail('placement question screen: ' + JSON.stringify(ui));
      await pp.click('#quit');
      await pp.waitForSelector('#plcard');
      const s1 = await snap();
      if (s1.mem !== s0.mem || s1.disk !== s0.disk) fail('quitting placement changed the save: ' + s1.mem);
      else step('placement: card on Home, 4 progress dots, no stars or hints, quitting after 2 answers changes nothing');
      // full run, every answer right
      await pp.click('#plcard [data-place="math"]');
      await pp.click('#plgo');
      let n = 0;
      for (; n < 24 && !(await pp.$('#plmap')); n++) {
        await answerPL();
        await pp.waitForFunction(() => document.querySelector('#plmap') || (PL && PL.q !== window.__pq), null, { timeout: 8000 });
      }
      await pp.waitForSelector('#plmap');
      const res = await pp.evaluate(() => ({ place: S.place && S.place.math, skip: S.skip, stars: S.stars, coins: S.coins,
        btn: Math.min(...[...document.querySelectorAll('.pl-in .btn')].map(b => b.offsetHeight)), wide: document.documentElement.scrollWidth }));
      const s2 = JSON.parse((await snap()).mem);
      // P2-01: a K child's quiz now starts one grade below, in Tiny Town, so passing every math world takes 5 testlets (20 questions)
      const mids = await pp.evaluate(() => PATHS.math.worlds.map(w => w.id));
      // 20 questions pass at most PLACE.MAX worlds above the start world, so with a long path the quiz ends before the last world (P2-06)
      const placedAt = await pp.evaluate(() => Math.min(PATHS.math.worlds.length - 1, PLACE.first(PATHS.math.worlds, gradeOf()) + PLACE.MAX)), lastId = mids[placedAt];
      if (n !== 20 || !res.place || res.place.world !== lastId || res.place.asked !== 20 || res.place.right !== 20
        || mids.slice(0, placedAt).some(id => !res.skip[id]) || s2.stars !== JSON.parse(s0.mem).stars
        || s2.coins !== JSON.parse(s0.mem).coins || res.btn < 48 || res.wide > 380)
        fail('placement result: ' + n + ' answers, ' + JSON.stringify(res));
      await pp.click('#plmap');
      await pp.waitForSelector('#map');
      const mw = await pp.evaluate(placedAt => ({ w: MAPW.math, cur: curWorld('math'), open: unlocked('math', WR.math[placedAt][0]), last: placedAt }), placedAt);
      if (mw.w !== mw.last || mw.cur !== mw.last || !mw.open) fail('map after placement: ' + JSON.stringify(mw));
      else step('placement: 20 right answers pass the worlds below the placed one; result saved, stars and coins unchanged, map opens on the placed world');
      await pp.evaluate(() => grown());
      await pp.waitForSelector('.pl-grown [data-place="read"]');
      const gtxt = await pp.evaluate(() => document.querySelector('.pl-grown').textContent);
      if (!gtxt.includes(await pp.evaluate(i => PATHS.math.worlds[i].n, placedAt))) fail('Grown-ups does not show the placement result');
      else step('Grown-ups: "Find my level" row shows the last result');
      network.push(...pa.network);
      for (const e of pa.errors) fail(e);
      await pa.ctx.close();
    }

    // P1-08 mastery: a fast, all-right first five turns the rest of a round into Challenge questions from the next harder stop
    //     (tag shown); the bot misses every other one once and still gets 3 stars; the stop's mastery record is saved;
    //     a weak first five turns on support: the hint is on screen before the first try
    {
      const ma = await openApp(browser, { fixture: 'midway' });
      const mp = ma.page;
      const mi = await mp.evaluate(() => {
        const i = NODES.math.findIndex(n => n.sk == 'eo' && n.lv == 1);
        S.maps.math[nid(NODES.math[i])] = 0; // play it as a new stop so the star result is visible
        start('math', i);
        return i;
      });
      await mp.waitForSelector('#prompt');
      let missed = 0, tags = 0, tagH = 99;
      for (let guard = 0; guard < 60; guard++) {
        const st = await mp.evaluate(() => document.querySelector('#fin') ? { fin: 1 } : G && G.q && !G.lock
          ? { tag: mastTag(G.q), tries: G.tries, kind: G.q.kind, h: (document.querySelector('.mtag') || {}).offsetHeight || 0 } : null);
        if (st && st.fin) break;
        if (!st) { await mp.waitForTimeout(150); continue; }
        await mp.evaluate(() => { window.__q = G.q; });
        if (st.tag === 'ch' && st.tries === 0) {
          tags++;
          tagH = Math.min(tagH, st.h);
          if ((st.kind === 'choice' || st.kind === 'num') && tags % 2 === 1) {
            // every other challenge question: one wrong first try, then the right answer (3 misses in a row would step the round down)
            if (st.kind === 'choice') await mp.click(`.ch[data-i="${await mp.evaluate(() => G.q.choices.findIndex(c => String(c.v) !== String(G.q.ans)))}"]`);
            else { for (const d of String(Number(await mp.evaluate(() => G.q.ans)) + 1)) await mp.click(`.k[data-k="${d}"]`); await mp.click('.k[data-k="go"]'); }
            await mp.waitForFunction(() => G.tries === 1 && !G.lock, null, { timeout: 4000 });
            missed++;
          }
        }
        await answer(mp);
        await mp.waitForFunction(() => document.querySelector('#fin') || (G && G.q !== window.__q), null, { timeout: 8000 });
      }
      await mp.waitForSelector('#chest', { timeout: 5000 });
      const res = await mp.evaluate(i => ({ mode: G.mode, score: G.score, n: G.n, forgive: G.forgive || 0, st: getSt('math', i),
        rec: S.mast && S.mast.eo1, saved: !!JSON.parse(localStorage.getItem(KEY)).mast }), mi);
      if (res.mode !== 'challenge' || tags !== res.n - 5 || tagH < 20 || !missed || res.forgive !== missed || res.score !== res.n - missed || res.st !== 3)
        fail('challenge round: ' + JSON.stringify({ ...res, tags, tagH, missed }));
      else step(`challenge: questions 6-${res.n} came from the harder stop with the tag, ${missed} of them missed once, ${res.score}/${res.n} still gave 3 stars`);
      if (!res.rec || res.rec.n < 4 || !res.saved) fail('mastery record for eo1 not saved: ' + JSON.stringify(res.rec));
      // support: five wrong first tries, then the 6th question shows its hint before any answer
      const sp = await mp.evaluate(i => {
        start('math', i);
        G.fr = [0, 1, 2, 3, 4].map(() => ({ ok: false, ms: 9000 }));
        G.done = 5;
        next();
        return { mode: G.mode, hint: document.querySelector('#hint').textContent.trim().length };
      }, mi);
      if (sp.mode !== 'support' || !sp.hint) fail('support round: ' + JSON.stringify(sp));
      else step('support: after 5 wrong first tries the hint shows before the first try');
      await mp.evaluate(() => { G.dead = true; home(); });
      network.push(...ma.network);
      for (const e of ma.errors) fail(e);
      await ma.ctx.close();
    }

    // P5-06 report card at 380x780: Grown-ups has a Report card button (48 px or more); it opens a read-only screen with seven sections,
    // nothing wider than the screen, S unchanged; a brand-new child gets kind empty states; Back returns to Grown-ups
    {
      const ra = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const rp = ra.page;
      await rp.waitForSelector('.game[data-p="math"]');
      await rp.evaluate(() => {
        const n = STRK.idx(today()), k = d => STRK.key(n - d);
        S.log = [{ d: k(0), sec: 600, rounds: 2, q: 20, ok: 18, by: { math: 420, read: 180 } }, { d: k(8), sec: 300, rounds: 1, q: 10, ok: 6, by: { math: 300 } }];
        S.mast = { add1: { n: 30, p: .95, ms: 5000, d: 3, last: n, md: n - 2 }, sub1: { n: 12, p: .4, ms: 9000, d: 2, last: n, md: -1 } };
        grown();
      });
      const before = await rp.evaluate(() => JSON.stringify(S));
      const eb = await rp.evaluate(() => { const b = document.querySelector('#rp-open'); return b ? b.offsetHeight : 0; });
      if (eb < 48) fail('report card button on Grown-ups is ' + eb + ' px high');
      await rp.click('#rp-open');
      await rp.waitForSelector('#rp-weeks');
      const rr = await rp.evaluate(() => {
        const sc = document.querySelector('.scroll');
        return { n: document.querySelectorAll('.rp-card').length, over: sc.scrollWidth - sc.clientWidth, S: JSON.stringify(S), text: sc.textContent,
          btn: Math.min(...[...document.querySelectorAll('.top .btn')].map(b => b.offsetHeight)), svg: document.querySelector('.rp-svg').getBoundingClientRect().width };
      });
      if (rr.n !== 7) fail('report card sections: ' + rr.n);
      else if (rr.over > 0) fail('report card is ' + rr.over + ' px wider than the screen at 380');
      else if (rr.S !== before) fail('opening the report card changed the saved data');
      else if (rr.btn < 48) fail('report card top buttons are ' + rr.btn + ' px high');
      else if (!/Adding to 10/.test(rr.text) || !/Needs practice/.test(rr.text) || /undefined|NaN/.test(rr.text)) fail('report card text: ' + rr.text.slice(0, 200));
      else step('report card: 7 sections at 380x780, nothing wider than the screen, saved data unchanged');
      await rp.click('#back');
      await rp.waitForSelector('#rp-open');
      step('report card: Back returns to Grown-ups');
      network.push(...ra.network);
      for (const e of ra.errors) fail(e);
      await ra.ctx.close();
      const rf = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      const fp = rf.page;
      await fp.waitForFunction(() => typeof report == 'function');
      await fp.evaluate(() => { S.name = 'Ava'; report(); });
      const ft = await fp.evaluate(() => ({ text: document.querySelector('.scroll').textContent, over: document.querySelector('.scroll').scrollWidth - document.querySelector('.scroll').clientWidth }));
      if (!/No learning time recorded yet/.test(ft.text) || !/This list fills in after a few rounds/.test(ft.text) || /undefined|NaN/.test(ft.text) || ft.over > 0)
        fail('report card for a new child: ' + ft.text.slice(0, 200));
      else step('report card: a new child sees kind empty states');
      network.push(...rf.network);
      for (const e of rf.errors) fail(e);
      await rf.ctx.close();
    }

    // P5-02 spaced review: the tricky fixture (a v53 save whose 21 tricky misses are whole stored questions) is migrated on load
    //     (no question html left, stars and coins kept); home still offers Mixed Practice; a stop round asks due items at
    //     questions 2 and 4 with the "Remember this one?" tag and a right answer moves them to box 1, due tomorrow; Tricky Mix
    //     plays 7 rebuilt items and books every one as fixed
    {
      const ra = await openApp(browser, { fixture: 'tricky' });
      const rp = ra.page;
      const r0 = await rp.evaluate(() => {
        const raw = localStorage.getItem(KEY);
        return { v: S.v, items: REV.get().length, due: dueItems().length, stars: S.stars, coins: S.coins, html: /class=|"html"/.test(raw),
          rev: JSON.stringify(S.rev).length, mix: document.querySelector('#mix').textContent.trim() };
      });
      if (r0.v !== 6 || r0.items !== 21 || r0.due !== 21 || r0.stars !== 85 || r0.coins !== 64 || r0.html || !/Mixed Practice/.test(r0.mix))
        fail('tricky fixture after migration: ' + JSON.stringify(r0));
      else step(`tricky fixture migrated: ${r0.items} review items (${r0.rev} bytes), no html in the save, home shows "${r0.mix}"`);
      // a math stop round: log every question as it is drawn (G.q.rvk = the review item it came from)
      await rp.evaluate(() => {
        const orig = renderQ;
        window.__rq = [];
        renderQ = function () { orig(); __rq.push({ rvk: G.q.rvk || '', retry: !!G.retry, tag: (document.querySelector('.rtag') || {}).offsetHeight || 0 }); };
        const i = NODES.math.findIndex(n => n.sk == 'sub' && n.lv == 1);
        start('math', i);
      });
      await rp.waitForSelector('#prompt');
      await playRound(rp, 'P5-02 stop round');
      const r1 = await rp.evaluate(() => {
        const d = REV.day(), asked = __rq.filter(x => x.rvk && !x.retry);
        return { first: __rq.slice(0, 4).map(x => !!x.rvk), tags: asked.map(x => x.tag),
          moved: asked.map(x => { const it = REV.get().find(y => revKey(y) === x.rvk); return it ? [it.box, it.due - d] : null; }),
          due: dueItems().length, box1: REV.get().filter(x => x.box == 1).length, stars: S.stars >= 85 };
      });
      if (JSON.stringify(r1.first) !== '[false,true,false,true]' || r1.tags.some(h => h < 20) || r1.moved.some(m => !m || m[0] !== 1 || m[1] !== 1)
        // a normal question that happens to equal a due item also books it (right answer = fixed), so count what actually moved
        || r1.due !== 21 - r1.box1 || r1.box1 < r1.moved.length || !r1.stars)
        fail('review in a stop round: ' + JSON.stringify(r1));
      else step(`stop round: questions 2 and 4 were due review items with the tag (${r1.moved.length} in all), each now in box 1, due tomorrow`);
      // Tricky Mix from home: 7 rebuilt items, all right on the first try = 7 fixed
      await rp.evaluate(() => home());
      await rp.waitForSelector('#mix');
      await rp.click('#mix');
      await rp.waitForSelector('#prompt');
      const rm = await rp.evaluate(() => G.pool.filter(q => q.rvk).length + (G.q.rvk ? 1 : 0));
      await playRound(rp, 'P5-02 tricky mix');
      const r2 = await rp.evaluate(() => ({ fixed: G.fixed || 0, due: dueItems().length, box1: REV.get().filter(x => x.box == 1).length }));
      // a mixed-in normal question that equals a due item also fixes it (as in the stop round above), so count what was fixed
      if (rm !== 7 || r2.fixed < 7 || r2.due !== r1.due - r2.fixed || r2.box1 !== r1.box1 + r2.fixed) fail('tricky mix: ' + JSON.stringify({ rm, ...r2, due0: r1.due, box10: r1.box1 }));
      else step(`Tricky Mix: ${rm} rebuilt review items, ${r2.fixed} fixed, ${r2.due} still due today`);
      await rp.evaluate(() => { G.dead = true; home(); });
      network.push(...ra.network);
      for (const e of ra.errors) fail(e);
      await ra.ctx.close();
    }

    // P5-03 Daily Review at 380x780: the tricky fixture (21 due) shows "Today's review: 21 due" with a Start button of 48 px or more and
    //     nothing wider than the screen; Start plays a 10-question round of due items only (all rebuilt, all booked as fixed); home then says
    //     11 due; with nothing due the card is a kind "All caught up" with no button, and startReview() still plays a normal round
    {
      const ra = await openApp(browser, { fixture: 'tricky', width: 380, height: 780 });
      const rp = ra.page;
      await rp.waitForSelector('#rev');
      const h0 = await rp.evaluate(() => ({ btn: document.querySelector('#rev').offsetHeight, n: document.querySelector('#revn').textContent,
        over: document.querySelector('.scroll').scrollWidth - document.querySelector('.scroll').clientWidth, card: document.querySelector('#revcard').offsetHeight }));
      if (h0.btn < 48 || h0.n !== '21' || h0.over > 0 || h0.card < 48) fail('daily review card: ' + JSON.stringify(h0));
      else step(`daily review card: ${h0.n} due, Start ${h0.btn} px high, nothing wider than the screen`);
      await rp.click('#rev');
      await rp.waitForSelector('#prompt');
      const g0 = await rp.evaluate(() => ({ n: G.n, daily: !!G.daily, rv: G.pool.filter(q => q.rvk).length + (G.q.rvk ? 1 : 0) }));
      if (g0.n !== 10 || !g0.daily || g0.rv !== 10) fail('daily review round: ' + JSON.stringify(g0));
      await playRound(rp, 'P5-03 daily review');
      const g1 = await rp.evaluate(() => ({ fixed: G.fixed || 0, due: dueItems().length }));
      if (g1.fixed !== 10 || g1.due !== 11) fail('daily review result: ' + JSON.stringify(g1));
      else step(`daily review: 10 due items asked first, ${g1.fixed} fixed, ${g1.due} still due`);
      await rp.evaluate(() => { G.dead = true; home(); });
      await rp.waitForSelector('#rev');
      const h1 = await rp.evaluate(() => document.querySelector('#revn').textContent);
      if (h1 !== '11') fail('home after the daily review says ' + h1 + ' due');
      await rp.evaluate(() => { S.rev = []; save(); home(); });
      await rp.waitForSelector('#revcard');
      const h2 = await rp.evaluate(() => ({ btn: !!document.querySelector('#rev'), text: document.querySelector('#revcard').textContent }));
      if (h2.btn || !/All caught up/.test(h2.text)) fail('daily review card with nothing due: ' + JSON.stringify(h2));
      else step('daily review: nothing due shows a kind "All caught up" card with no button');
      await rp.evaluate(() => startReview());
      await rp.waitForSelector('#prompt');
      await playRound(rp, 'P5-03 review with nothing due');
      await rp.evaluate(() => { G.dead = true; home(); });
      network.push(...ra.network);
      for (const e of ra.errors) fail(e);
      await ra.ctx.close();
    }

    // P2-19 spelling: every level has a map stop; a round at 380x780 taps the in-app keyboard (keys 48 px or more); the clue shows a blank,
    //       never the word; the hint gives the letter count; the stop earns stars; stars of old stops do not move
    {
      const sa = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const sp = sa.page;
      await sp.waitForSelector('.game[data-p="read"]');
      const si = await sp.evaluate(() => {
        const lv = NODES.read.filter(n => n.sk == 'spell').map(n => n.lv).join('');
        const before = JSON.stringify(S.maps.read);
        const i = NODES.read.findIndex(n => n.sk == 'spell' && n.lv == 3);
        start('read', i);
        return { lv, i, before };
      });
      if (si.lv !== '1234567') fail('spelling stops on the reading map: ' + si.lv);
      await sp.waitForSelector('#prompt .lslots');
      const sq = await sp.evaluate(() => {
        const keys = [...document.querySelectorAll('.sk')];
        const clue = document.querySelector('#prompt').textContent;
        return { kind: G.q.kind, minKey: Math.min(...keys.map(k => k.offsetHeight)), minW: Math.min(...keys.map(k => k.offsetWidth)),
          blank: clue.includes('_____'), shows: clue.toLowerCase().includes(G.q.word),
          over: document.querySelector('#prompt').scrollWidth - document.querySelector('#prompt').clientWidth,
          slots: document.querySelectorAll('.lslots .ls').length === G.q.word.length };
      });
      if (sq.kind !== 'spell' || !sq.blank || sq.shows || !sq.slots) fail('spelling question: ' + JSON.stringify(sq));
      else if (sq.minKey < 48 || sq.minW < 24 || sq.over > 0) fail('spelling keyboard at 380: ' + JSON.stringify(sq));
      else step(`spelling: keyboard keys ${sq.minKey} px high, the clue shows a blank, not the word`);
      await sp.click('#hb');
      const hint = await sp.evaluate(() => document.querySelector('#hint').textContent);
      if (!/\d+ letters and starts with/.test(hint)) fail('spelling hint: ' + hint); else step('spelling: hint gives the letter count and the first letter');
      await playRound(sp, 'P2-19 spelling');
      const after = await sp.evaluate(i => ({ st: getSt('read', i), maps: JSON.stringify(S.maps.read) }), si.i);
      const was = JSON.parse(si.before), now = JSON.parse(after.maps);
      const moved = Object.keys(was).filter(k => now[k] !== was[k]);
      if (after.st < 1 || moved.length) fail('spelling stars: ' + JSON.stringify({ st: after.st, moved }));
      else step(`spelling: stop earned ${after.st} stars, no other stop changed`);
      await sp.evaluate(() => { G.dead = true; home(); });
      network.push(...sa.network);
      for (const e of sa.errors) fail(e);
      await sa.ctx.close();
    }

    // P2-15 ABC Beach at 380x780: a Pre-K child's reading map opens on abc1 (ABC Beach is the first reading world) and the bot wins the
    //     6-question round by tapping; every new stop (abc 1-4, syl 1-2, sound 3-4) shows a question whose buttons are 48 px or more and
    //     nothing is wider than the screen; a default (K) child is not put in ABC Beach: the reading map opens on Letter Meadow (sound1)
    {
      const pa = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      const pp = pa.page;
      await pp.fill('#nm', 'Beach');
      await pp.click('.gr[data-g="-1"]');
      await pp.click('#go');
      await pp.waitForSelector('.game[data-p]');
      await pp.click('.game[data-p="read"]');
      await pp.waitForSelector('.node.cur');
      const cur0 = await pp.evaluate(() => ({ id: nid(NODES.read[curNode('read')]), w: NODES.read[curNode('read')].wid, n: +document.querySelector('.node.cur').dataset.n }));
      if (cur0.id !== 'abc1' || cur0.w !== 'r_abc' || cur0.n !== 0) fail('Pre-K reading map should open on abc1: ' + JSON.stringify(cur0));
      await pp.click('.node.cur');
      await pp.waitForSelector('#prompt');
      const n6 = await pp.evaluate(() => G.n);
      await playRound(pp, 'P2-15 abc1 Pre-K', 6);
      if (n6 !== 6) fail('Pre-K ABC Beach round length ' + n6); else step('ABC Beach: Pre-K map opens on abc1, the bot won the 6-question round by tapping');
      await pp.evaluate(() => { G.dead = true; home(); });
      await pp.waitForSelector('.game[data-p]');
      for (const id of ['abc1', 'abc2', 'abc3', 'abc4', 'syl1', 'syl2', 'sound3', 'sound4']) {
        await pp.evaluate(i => { start('read', NODES.read.findIndex(n => n.sk + n.lv === i)); }, id);
        await pp.waitForSelector('#prompt');
        const sz = await pp.evaluate(() => {
          const els = [...document.querySelectorAll('.ch, .mb, .lt')];
          const sc = document.querySelector('.scroll') || document.body;
          return { n: els.length, min: Math.min(...els.map(e => Math.min(e.offsetHeight, e.offsetWidth))), over: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
            kind: G.q.kind, hint: !!G.q.hint, say: !!G.q.say };
        });
        if (!sz.n || sz.min < 48 || sz.over > 0 || !sz.hint || !sz.say) fail(`ABC Beach ${id} question at 380x780: ` + JSON.stringify(sz));
        await pp.evaluate(() => { G.dead = true; home(); });
        await pp.waitForSelector('.game[data-p]');
        await vwait(pp, 2800); // let the old round's timers finish
      }
      step('ABC Beach: abc 1-4, syl 1-2, sound 3-4 show buttons of 48 px or more with a hint and spoken text, nothing wider than 380 px');
      network.push(...pa.network);
      for (const e of pa.errors) fail(e);
      await pa.ctx.close();
      const ka = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      const kp = ka.page;
      await kp.fill('#nm', 'Kay');
      await kp.click('#go');
      await kp.waitForSelector('.game[data-p]');
      await kp.click('.game[data-p="read"]');
      await kp.waitForSelector('.node.cur');
      const cur1 = await kp.evaluate(() => ({ id: nid(NODES.read[curNode('read')]), w: curWorld('read'), g: S.grade }));
      if (cur1.id !== 'sound1' || cur1.w !== 1) fail('K reading map should open on Letter Meadow sound1: ' + JSON.stringify(cur1));
      else step('ABC Beach: a K child (default) opens the reading map on Letter Meadow, not ABC Beach');
      network.push(...ka.network);
      for (const e of ka.errors) fail(e);
      await ka.ctx.close();
    }

    // P2-01 Tiny Town (Pre-K math) at 380x780 with ALL TEXT HIDDEN (html.notext, the debug flag): a Pre-K child opens on Tiny Town, a full
    //    6-question round is finished by tapping pictures only, every prompt is spoken on its own (say() is stubbed and recorded), the
    //    replay button is big, no letters are on screen outside the picture choices; then every Tiny Town stop is opened and answered
    //    once through the real taps (numerals, picture choices, plates) with sizes checked (48 px or more, no sideways scroll)
    {
      const ta = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      const tp = ta.page;
      await tp.fill('#nm', 'Tiny');
      await tp.click('.gr[data-g="-1"]');
      await tp.click('#go');
      await tp.waitForSelector('.game[data-p="math"]');
      await tp.click('.game[data-p="math"]');
      await tp.waitForSelector('.node.cur');
      const mp0 = await tp.evaluate(() => ({ on: +document.querySelector('.wchip.on').dataset.w, wid: NODES.math[curNode('math')].wid,
        sk: nid(NODES.math[curNode('math')]), chips: document.querySelectorAll('.wchip').length, n: PATHS.math.worlds.length }));
      if (mp0.on !== 0 || mp0.wid !== 'm_tiny' || mp0.sk !== 'pk_count1' || mp0.chips !== mp0.n) fail('Pre-K map does not open on Tiny Town: ' + JSON.stringify(mp0));
      else step('Pre-K child: the math map opens on Tiny Town, first stop pk_count1, ' + mp0.chips + ' world chips');
      // text hidden + speech recorder
      await tp.evaluate(() => {
        document.documentElement.classList.add('notext');
        window.__said = [];
        window.say = t => { window.__said.push(String(t)); };
        window.__rec = [];
        const r0 = renderQ;
        renderQ = function () {
          r0();
          const q = G.q;
          setTimeout(() => {
            const sp = document.querySelector('#spk'), pr = document.querySelector('#prompt');
            const txt = [...document.querySelectorAll('.pktxt')];
            window.__rec.push({ sk: q.sk + q.lv, kind: q.kind, said: window.__said.includes(q.say), spk: sp ? [sp.offsetWidth, sp.offsetHeight] : null,
              letters: /[A-Za-z]/.test(pr.innerText), txtHidden: txt.every(e => e.offsetHeight === 0), nTxt: txt.length,
              wide: document.documentElement.scrollWidth });
          }, 700);
        };
      });
      await tp.click('.node.cur');
      await tp.waitForSelector('#prompt', { state: 'attached' }); // text hidden: a listening prompt can be empty
      await playRound(tp, 'P2-01 Tiny Town round, text hidden', 6);
      const rec = await tp.evaluate(() => window.__rec);
      const badRec = rec.filter(r => !r.said || !r.spk || r.spk[0] < 64 || r.spk[1] < 64 || r.letters || !r.txtHidden || !r.nTxt || r.wide > 380);
      if (rec.length < 6 || badRec.length) fail('Tiny Town text-hidden round: ' + JSON.stringify(badRec.length ? badRec : rec));
      else step('Tiny Town with text hidden: ' + rec.length + ' prompts spoken on their own, replay button ' + rec[0].spk.join('x') + ', no letters on screen, 6/6 by tapping pictures');
      // every stop once, through the real taps; sizes and the Help button (a picture hint, no letters) on each
      // P2-16: the tracing stop (trace1) has no taps to answer; its own block (// P2-16 at the end) plays it
      const stops = await tp.evaluate(() => NODES.math.map((n, i) => [i, nid(n), n.wid]).filter(x => x[2] === 'm_tiny' && x[1] !== 'boss_m_tiny' && x[1] !== 'trace1'));
      const seen = [];
      for (const [i, id] of stops) {
        await tp.evaluate(i => { start('math', i); }, i);
        await tp.waitForSelector('#prompt', { state: 'attached' }); // text hidden: a listening prompt can be empty
        await vwait(tp, 600);
        const sz = await tp.evaluate(() => {
          const pts = [...document.querySelectorAll('.ch, #prompt [data-v]')].map(e => Math.min(e.offsetWidth, e.offsetHeight));
          return { kind: G.q.kind, n: pts.length, min: Math.min(...pts), wide: document.documentElement.scrollWidth, tall: document.querySelector('.qarea').scrollHeight > document.querySelector('.qarea').clientHeight + 1 };
        });
        await tp.click('#hb');
        const hint = await tp.evaluate(() => ({ len: document.querySelector('#hint').innerHTML.length, letters: /[A-Za-z]/.test(document.querySelector('#hint').innerText) }));
        await answer(tp);
        await tp.evaluate(() => { G.dead = true; }); // the round's own next() timer fires into this dead round, not into the next stop
        await vwait(tp, 1500);
        seen.push(id);
        if (sz.n < 2 || sz.min < 48 || sz.wide > 380 || sz.tall || !hint.len || hint.letters) fail('Tiny Town stop ' + id + ': ' + JSON.stringify({ ...sz, ...hint }));
      }
      if (seen.length !== 9) fail('Tiny Town has ' + seen.length + ' stops, expected 9');
      else step('Tiny Town: all 9 stops open and are answered by taps; touch targets 48 px or more, no sideways scroll, picture hints without letters');
      await tp.evaluate(() => { G.dead = true; home(); });
      network.push(...ta.network);
      for (const e of ta.errors) fail(e);
      await ta.ctx.close();
    }

    // P2-05 Multiply Mountain at 380x780: a 3rd grader opens the last math world from the strip, plays Arrays and the first
    //    times-facts stop with real taps (every answer right), nothing is wider than the screen; the Fact Sprint then lists
    //    the Times facts set and a 20-facts sprint of it is played to the end.
    {
      const ma5 = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const mp = ma5.page;
      await mp.evaluate(() => { S.grade = 3; save(); });
      const lastW = await mp.evaluate(() => PATHS.math.worlds.findIndex(w => w.id === 'm_mult'));
      const openMountain = async k => { // home, math map, the last world's chip, then its k-th stop
        await mp.evaluate(() => home());
        await mp.click('.game[data-p="math"]');
        await mp.waitForSelector('.wchip.on');
        await mp.click(`.wchip[data-w="${lastW}"]`);
        await mp.waitForSelector(`.wchip.on[data-w="${lastW}"]`);
        const n = await mp.evaluate(k => WR.math[PATHS.math.worlds.findIndex(w => w.id === 'm_mult')][0] + k, k);
        await mp.click(`.node[data-n="${n}"]`);
        await mp.waitForSelector('#prompt');
      };
      await mp.evaluate(() => home());
      await mp.click('.game[data-p="math"]');
      await mp.waitForSelector('.wchip.on');
      await mp.click(`.wchip[data-w="${lastW}"]`);
      await mp.waitForSelector(`.wchip.on[data-w="${lastW}"]`);
      const world = await mp.evaluate(() => ({ id: PATHS.math.worlds[PATHS.math.worlds.findIndex(w => w.id === 'm_mult')].id, stops: WR.math[PATHS.math.worlds.findIndex(w => w.id === 'm_mult')][1] - WR.math[PATHS.math.worlds.findIndex(w => w.id === 'm_mult')][0] + 1,
        boss: !!document.querySelector(`.node[data-n="${WR.math[PATHS.math.worlds.findIndex(w => w.id === 'm_mult')][1]}"]`),
        first: NODES.math[WR.math[PATHS.math.worlds.findIndex(w => w.id === 'm_mult')][0]].sk }));
      if (world.id !== 'm_mult' || world.stops !== 12 || !world.boss || world.first !== 'arr') fail('Multiply Mountain map: ' + JSON.stringify(world));
      await openMountain(0);
      await mp.waitForSelector('#prompt');
      const lay = await mp.evaluate(() => ({ n: G.n, sk: G.sk, w: document.documentElement.scrollWidth, art: !!document.querySelector('#prompt svg') }));
      if (lay.sk !== 'arr' || lay.n !== 10 || lay.w > 380 || !lay.art) fail('arrays round: ' + JSON.stringify(lay));
      await playRound(mp, 'P2-05 Arrays', 10);
      await mp.evaluate(() => { G.dead = true; });
      await openMountain(1);
      const k1 = await mp.evaluate(() => ({ sk: G.sk, lv: G.lv, w: document.documentElement.scrollWidth, pad: Math.min(...[...document.querySelectorAll('.k')].map(b => Math.min(b.offsetHeight, b.offsetWidth))) }));
      if (k1.sk !== 'mfact' || k1.lv !== 1 || k1.w > 380 || k1.pad < 48) fail('times facts round: ' + JSON.stringify(k1));
      await playRound(mp, 'P2-05 Times facts', 10);
      await mp.evaluate(() => { G.dead = true; home(); });
      await mp.click('#flu');
      await mp.waitForSelector('.game[data-s="mfact"]');
      const sets = await mp.evaluate(() => ({ ids: [...document.querySelectorAll('.game[data-s]')].map(b => b.dataset.s), h: document.querySelector('.game[data-s="mfact"]').offsetHeight }));
      if (sets.ids.includes('dfact') || sets.h < 48) fail('Fact Sprint sets after Easy Times Facts: ' + JSON.stringify(sets));
      await mp.click('.game[data-s="mfact"]');
      await mp.click('.game[data-m="n20"]');
      for (let i = 0; i < 40; i++) {
        await mp.waitForFunction(() => document.querySelector('#fagain') || (FL && FL.f && !FL.lock), null, { timeout: 8000 });
        if (await mp.$('#fagain')) break;
        for (const d of await mp.evaluate(() => String(FL.f.c))) await mp.click(`.k[data-k="${d}"]`);
        if (await mp.$('.k[data-k="go"]')) await mp.click('.k[data-k="go"]'); // the Fact Sprint pad submits by itself; waiting for a missing key cost 30 s per fact
      }
      await mp.waitForSelector('#fagain', { timeout: 8000 });
      const fl = await mp.evaluate(() => ({ n: S.flu['mfact-20'] && S.flu['mfact-20'].hist.length }));
      if (fl.n !== 1) fail('times sprint not saved: ' + JSON.stringify(fl));
      else step('P2-05: Multiply Mountain opens for a 3rd grader (12 stops), Arrays and Times facts rounds played, Fact Sprint lists Times facts and a sprint is saved');
      network.push(...ma5.network);
      for (const e of ma5.errors) fail(e);
      await ma5.ctx.close();
    }

    // P2-06 Fraction Forest at 380x780: a 3rd grader opens the world from the strip (found by id, 4 stops + boss), plays all four
    //    stops with real taps and the number pad (frac 2 to 5, every answer right); nothing is wider than the screen, the number pad
    //    and every choice or tap target is at least 48 px, and a fraction question shows a stacked fraction.
    {
      const fr6 = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const fp = fr6.page;
      await fp.evaluate(() => { S.grade = 3; S.unlockAll = true; save(); }); // P2-07 put twelve stops between these four
      const forest = await fp.evaluate(() => PATHS.math.worlds.findIndex(w => w.id === 'm_frac'));
      const openStop = async k => {
        await fp.evaluate(() => home());
        await fp.click('.game[data-p="math"]');
        await fp.waitForSelector('.wchip.on');
        await fp.click(`.wchip[data-w="${forest}"]`);
        await fp.waitForSelector(`.wchip.on[data-w="${forest}"]`);
        const n = await fp.evaluate(k => NODES.math.findIndex(x => nid(x) === 'frac' + (k + 2)), k);
        await fp.click(`.node[data-n="${n}"]`);
        await fp.waitForSelector('#prompt');
      };
      await openStop(0);
      const world = await fp.evaluate(w => ({ id: PATHS.math.worlds[w].id, stops: WR.math[w][1] - WR.math[w][0] + 1,
        first: NODES.math[WR.math[w][0]].sk + NODES.math[WR.math[w][0]].lv }), forest);
      if (world.id !== 'm_frac' || world.stops !== 17 || world.first !== 'frac2') fail('Fraction Forest map: ' + JSON.stringify(world));
      for (let k = 0; k < 4; k++) {
        if (k) await openStop(k);
        await fp.waitForSelector('#prompt');
        await fp.waitForTimeout(900); // the prompt pops in with a scale animation; tap targets are measured once it has settled
        const lay = await fp.evaluate(() => {
          const sm = a => Math.min(...a.map(b => Math.min(b.offsetHeight, b.offsetWidth)));
          return { sk: G.sk, lv: G.lv, kind: G.q.kind, w: document.documentElement.scrollWidth, art: !!document.querySelector('#prompt svg'),
            keys: sm([...document.querySelectorAll('.k')]), ch: sm([...document.querySelectorAll('.ch')]),
            tap: sm([...document.querySelectorAll('#prompt .vt')].map(e => { const r = e.getBoundingClientRect(); return { offsetHeight: r.height, offsetWidth: r.width }; })) };
        });
        if (lay.sk !== 'frac' || lay.lv !== k + 2 || lay.w > 380 || lay.keys < 48 || lay.ch < 48 || lay.tap < 48) fail('Fraction Forest stop ' + k + ': ' + JSON.stringify(lay));
        await playRound(fp, 'P2-06 frac ' + (k + 2), 10);
        await fp.evaluate(() => { G.dead = true; });
      }
      const stars = await fp.evaluate(() => ['frac2', 'frac3', 'frac4', 'frac5'].map(id => S.maps.math[id] || 0));
      if (stars.some(s => s < 1)) fail('Fraction Forest stars not saved: ' + JSON.stringify(stars));
      else step('P2-06: Fraction Forest opens for a 3rd grader (4 stops + boss), frac 2 to 5 rounds played, stars saved, touch targets 48 px or more');
      network.push(...fr6.network);
      for (const e of fr6.errors) fail(e);
      await fr6.ctx.close();
    }

    // P2-18 Phonics 1st-2nd at 380x780: a 2nd grader who finished Ocean Reef opens Space Station and plays sight 4 and the two
    //    r-controlled stops, then (with Space Station done) Word Workshop and its sight 5 and two vowel-team stops, with real taps.
    //    Every answer is right, nothing is wider than the screen, and each stop saves its stars.
    {
      const ph = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const pp = ph.page;
      await pp.evaluate(() => {
        S.grade = 2; // abc3 stays unpassed: its match question would be asked as a review item and the bot has no match taps
        NODES.read.forEach((n, i) => { if (i < NODES.read.findIndex(m => m.wid === 'r_space' && m.sk === 'sight') && nid(n) !== 'abc3') S.maps.read[nid(n)] = S.maps.read[nid(n)] || 3; });
        save();
      });
      const goStop = async id => { // home, reading map, the world's chip, then the stop
        const at = await pp.evaluate(id => { const i = NODES.read.findIndex(n => nid(n) === id); return { i, w: NODES.read[i].wi }; }, id);
        await pp.evaluate(() => { if (G) G.dead = true; home(); });
        await pp.click('.game[data-p="read"]');
        await pp.waitForSelector('.wchip.on');
        await pp.click(`.wchip[data-w="${at.w}"]`);
        await pp.waitForSelector(`.wchip.on[data-w="${at.w}"]`);
        await pp.click(`.node[data-n="${at.i}"]`);
        await pp.waitForSelector('#prompt');
      };
      const rounds = [['sight4', 'sight', 4], ['pic5', 'pic', 5], ['build5', 'build', 5], ['sight5', 'sight', 5], ['pic6', 'pic', 6], ['build6', 'build', 6]];
      for (const [id, sk, lv] of rounds) {
        if (id === 'sight5') {
          await pp.evaluate(() => { NODES.read.forEach(n => { if (n.wid === 'r_space') S.maps.read[nid(n)] = S.maps.read[nid(n)] || 3; }); save(); });
        }
        await goStop(id);
        const lay = await pp.evaluate(() => ({ sk: G.sk, lv: G.lv, w: document.documentElement.scrollWidth, say: !!G.q.say }));
        if (lay.sk !== sk || lay.lv !== lv || lay.w > 380 || !lay.say) fail('P2-18 ' + id + ' round: ' + JSON.stringify(lay));
        await playRound(pp, 'P2-18 ' + id);
        const st = await pp.evaluate(id => S.maps.read[id] || 0, id);
        if (st < 1) fail('P2-18 ' + id + ' did not save stars');
      }
      const ok = await pp.evaluate(() => ({ ws: PATHS.read.worlds.map(w => w.id).join(' ').includes('r_space r_workshop r_summit'),
        open: ['sight4', 'pic5', 'build5', 'sight5', 'pic6', 'build6'].every(id => S.maps.read[id] > 0) }));
      if (!ok.ws || !ok.open) fail('P2-18 world order or stars: ' + JSON.stringify(ok));
      else step('P2-18: Space Station r-controlled stops and Word Workshop (sight 5, vowel teams) played with real taps, stars saved');
      network.push(...ph.network);
      for (const e of ph.errors) fail(e);
      await ph.ctx.close();
    }

    // P2-02 Shape Garden (K math) at 380x780: a K child's math map opens on Shape Garden (the first K world, after Tiny Town), a full
    //    8-question round of the first stop is played by taps with every prompt spoken on its own, then each of the 14 stops is opened and
    //    answered once through the real taps with all text hidden (html.notext): nothing to read in the prompt, every touch target 48 px
    //    or more, nothing wider than the screen, a Help picture on each; the boss and the three new skills are on the map.
    {
      const sg = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      const sp = sg.page;
      await sp.fill('#nm', 'Garden');
      await sp.click('.gr[data-g="0"]');
      await sp.click('#go');
      await sp.waitForSelector('.game[data-p="math"]');
      await sp.click('.game[data-p="math"]');
      await sp.waitForSelector('.node.cur');
      const g0 = await sp.evaluate(() => ({ wid: NODES.math[curNode('math')].wid, sk: nid(NODES.math[curNode('math')]),
        on: PATHS.math.worlds[+document.querySelector('.wchip.on').dataset.w].id, chips: document.querySelectorAll('.wchip').length, n: PATHS.math.worlds.length }));
      if (g0.wid !== 'm_shape' || g0.sk !== 'pk_count3' || g0.on !== 'm_shape' || g0.chips !== g0.n) fail('K map does not open on Shape Garden: ' + JSON.stringify(g0));
      else step('K child: the math map opens on Shape Garden, first stop pk_count3, ' + g0.chips + ' world chips');
      await sp.evaluate(() => {
        window.__said = [];
        window.say = t => { window.__said.push(String(t)); };
        window.__rec = [];
        const r0 = renderQ;
        renderQ = function () {
          r0();
          const q = G.q;
          setTimeout(() => { window.__rec.push({ sk: q.sk + q.lv, said: window.__said.includes(q.say), pk: !!document.querySelector('#spk.pkspk') }); }, 700);
        };
      });
      await sp.click('.node.cur');
      await sp.waitForSelector('#prompt');
      await playRound(sp, 'P2-02 Count to 20', 8);
      const rec = await sp.evaluate(() => window.__rec);
      const badRec = rec.filter(r => !r.said || !r.pk);
      if (rec.length < 8 || badRec.length) fail('Shape Garden round: prompts not spoken or no replay button ' + JSON.stringify(badRec.length ? badRec : rec));
      else step('Shape Garden round: ' + rec.length + ' prompts spoken on their own with the big replay button');
      await sp.evaluate(() => { G.dead = true; home(); document.documentElement.classList.add('notext'); }); // the first round can leave a pet or chest overlay: home() clears it
      await sp.waitForSelector('.game[data-p="math"]');
      await sp.waitForTimeout(500);
      const stops = await sp.evaluate(() => NODES.math.map((n, i) => [i, nid(n), n.wid]).filter(x => x[2] === 'm_shape' && x[1] !== 'boss_m_shape'));
      const seen = [];
      for (const [i, id] of stops) {
        await sp.evaluate(i => { start('math', i); }, i);
        // with all text hidden, a listening question's prompt can be empty (zero size), so wait for it to exist, not to be visible
        await sp.waitForSelector('#prompt', { state: 'attached' });
        await sp.waitForFunction(() => window.__said.includes(G.q.say), null, { timeout: 4000 }).catch(() => {}); // the prompt is spoken a moment after it shows
        const sz = await sp.evaluate(() => {
          const pts = [...document.querySelectorAll('.ch, #prompt [data-v], .k')].map(e => Math.min(e.offsetWidth, e.offsetHeight));
          const qa = document.querySelector('.qarea');
          return { kind: G.q.kind, n: pts.length, min: Math.min(...pts), wide: document.documentElement.scrollWidth, tall: qa.scrollHeight > qa.clientHeight + 1,
            letters: /[A-Za-z]/.test(document.querySelector('#prompt').innerText), spoken: window.__said.includes(G.q.say) };
        });
        await sp.click('#hb');
        const hint = await sp.evaluate(() => ({ len: document.querySelector('#hint').innerHTML.length }));
        await answer(sp);
        await sp.evaluate(() => { G.dead = true; }); // the round's own next() timer fires into this dead round, not into the next stop
        await sp.waitForTimeout(1500);
        seen.push(id);
        if (sz.n < 2 || sz.min < 48 || sz.wide > 380 || sz.tall || sz.letters || !sz.spoken || !hint.len) fail('Shape Garden stop ' + id + ': ' + JSON.stringify({ ...sz, ...hint }));
      }
      if (seen.length !== 14) fail('Shape Garden has ' + seen.length + ' stops, expected 14');
      else step('Shape Garden: all 14 stops open and are answered by taps with the text hidden; touch targets 48 px or more, no sideways scroll, a hint on each');
      await sp.evaluate(() => { G.dead = true; home(); });
      await sp.click('.game[data-p="math"]');
      await sp.waitForSelector('.node.cur');
      const mp = await sp.evaluate(() => {
        const [a, b] = WR.math[PATHS.math.worlds.findIndex(w => w.id === 'm_shape')];
        let shown = 0;
        for (let i = a; i <= b; i++) if (document.querySelector(`.node[data-n="${i}"]`)) shown++;
        return { shown, want: b - a + 1 };
      });
      if (mp.shown !== mp.want) fail('Shape Garden map shows ' + mp.shown + ' of ' + mp.want + ' nodes (stops and boss)');
      else step('Shape Garden map shows its ' + (mp.want - 1) + ' stops and the boss');
      network.push(...sg.network);
      for (const e of sg.errors) fail(e);
      await sg.ctx.close();
    }

    // P2-03 Clock Tower at 380x780: a 1st grader who has finished Candy Canyon opens on Clock Tower (between Candy Canyon and Ocean Reef),
    //    plays the first round with real taps, then every stop is opened and three questions of it answered by taps (numerals, picture
    //    choices, picture graphs, shapes, cut circles); sizes checked (48 px or more, no sideways scroll). Time stops draw the VIZ clock.
    {
      const ca = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      const cp = ca.page;
      await cp.fill('#nm', 'Tower');
      await cp.click('.gr[data-g="1"]');
      await cp.click('#go');
      await cp.waitForSelector('.game[data-p="math"]');
      await cp.evaluate(() => { NODES.math.filter(n => n.wid === 'm_candy').forEach(n => { S.maps.math[nid(n)] = 1; }); save(); home(); }); // Candy Canyon finished
      await cp.click('.game[data-p="math"]');
      await cp.waitForSelector('.node.cur');
      const cm = await cp.evaluate(() => { const ids = PATHS.math.worlds.map(w => w.id), c = ids.indexOf('m_clock');
        return { c, near: ids[c - 1] + ' ' + ids[c + 1], on: +document.querySelector('.wchip.on').dataset.w, wid: NODES.math[curNode('math')].wid,
          sk: nid(NODES.math[curNode('math')]), chips: document.querySelectorAll('.wchip').length, n: ids.length }; });
      if (cm.c < 0 || cm.near !== 'm_candy m_reef' || cm.on !== cm.c || cm.wid !== 'm_clock' || cm.sk !== 'pv1' || cm.chips !== cm.n) fail('Clock Tower map: ' + JSON.stringify(cm));
      else step('Clock Tower: sits between Candy Canyon and Ocean Reef, the map opens on it at stop pv1 after Candy Canyon');
      await cp.click('.node.cur');
      await cp.waitForSelector('#prompt');
      await playRound(cp, 'P2-03 Tens & Ones');
      await cp.click('#menu');
      await cp.waitForSelector('#map');
      const nx = await cp.evaluate(() => { const a = WR.math[PATHS.math.worlds.findIndex(w => w.id === 'm_clock')][0]; return { pv: passed('math', a), add5: unlocked('math', a + 1) }; });
      if (!nx.pv || !nx.add5) fail('Clock Tower: passing pv1 should unlock add5: ' + JSON.stringify(nx));
      const stops = await cp.evaluate(() => NODES.math.map((n, i) => [i, nid(n), n.wid]).filter(x => x[2] === 'm_clock' && x[1] !== 'boss_m_clock'));
      const reefTime = await cp.evaluate(() => NODES.math.findIndex(n => n.sk === 'time' && n.lv === 1));
      const seen = [];
      for (const [i, id] of [...stops, [reefTime, 'time1']]) {
        await cp.evaluate(i => { start('math', i); }, i);
        await cp.waitForSelector('#prompt');
        for (let k = 0; k < 3; k++) {
          await cp.waitForTimeout(500);
          const sz = await cp.evaluate(() => {
            const pts = [...document.querySelectorAll('.ch, .k')].map(e => Math.min(e.offsetWidth, e.offsetHeight));
            const qa = document.querySelector('.qarea');
            return { sk: G.q.sk + G.q.lv, kind: G.q.kind, min: Math.min(...pts), wide: document.documentElement.scrollWidth, tall: qa.scrollHeight > qa.clientHeight + 1,
              svg: !!document.querySelector('#prompt svg, .ch svg'), clk: !!document.querySelector('#prompt svg.viz-clk') };
          });
          if (sz.min < 48 || sz.wide > 380 || sz.tall) fail('Clock Tower stop ' + id + ': ' + JSON.stringify(sz));
          if (id === 'time1' && (!sz.clk || sz.wide > 380)) fail('time stop does not draw the VIZ clock: ' + JSON.stringify(sz));
          if (['pv1', 'meas2', 'data1', 'shape4', 'frac1'].includes(id) && !sz.svg && sz.kind !== 'num') fail('Clock Tower stop ' + id + ' has no picture');
          if (k === 0) {
            await cp.click('#hb');
            const hint = await cp.evaluate(() => document.querySelector('#hint').innerHTML.length);
            if (!hint) fail('Clock Tower stop ' + id + ': empty hint');
          }
          await cp.evaluate(() => { window.__q = G.q; });
          await answer(cp);
          if (k < 2) await cp.waitForFunction(() => G && G.q !== window.__q, null, { timeout: 8000 });
        }
        await cp.evaluate(() => { G.dead = true; });
        await cp.waitForTimeout(1500);
        seen.push(id);
      }
      if (seen.length !== 8) fail('Clock Tower has ' + seen.length + ' stops checked, expected 7 + time1');
      else step('Clock Tower: all 7 stops and the Ocean Reef clock stop open, 3 questions each answered by taps; 48 px targets, no sideways scroll, hints, VIZ clock on time stops');
      await cp.evaluate(() => { G.dead = true; home(); });
      network.push(...ca.network);
      for (const e of ca.errors) fail(e);
      await ca.ctx.close();
    }

    // P4-05 pet rig at 380x780 (midway: dragon, 85 stars = kid, top hat and balloon): the drawn dragon on Home with its hat
    //    and toy, tapping it shows the cheer face; Pet Care shows the hungry mood and the bath the oops face; the map pet and
    //    the round runner are drawn, a right answer shows the cheer face; the growth overlay; super stage; reduced motion
    //    and calm stop the loops; a dino child still sees exactly today's emoji pet; setup offers the drawn dragon.
    {
      const pr = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const pp = pr.page;
      const opa = sel => pp.evaluate(s => { const e = document.querySelector(s); return e ? +getComputedStyle(e).opacity : -1; }, sel);
      // watch(sel) samples the face's opacity every frame until read(): a face shown for a moment is seen even when the page is slow
      // (a busy machine let a single read after the click land after the face had gone)
      const watch = sel => pp.evaluate(s => { window.__seen = 0; const tick = () => { const e = document.querySelector(s);
        if (e) window.__seen = Math.max(window.__seen, +getComputedStyle(e).opacity); if (!window.__seenStop) requestAnimationFrame(tick); };
        window.__seenStop = 0; requestAnimationFrame(tick); }, sel);
      const seenMax = () => pp.evaluate(() => { window.__seenStop = 1; return window.__seen; });
      await pp.evaluate(() => { S.care = { food: 90, clean: 90, fun: 90, t: Date.now(), gift: '' }; home(); });
      // P4-07: the hat and toy are drawn now; wornId gives the id when the .pw-hat / .pw-toy group holds that item's drawing (WEAR)
      await pp.evaluate(() => { window.wornId = (svg, slot, id) => { const g = svg && svg.querySelector('g.pw-' + slot);
        const t = document.createElementNS('http://www.w3.org/2000/svg', 'g'); t.innerHTML = WEAR[id] || '';
        return g && WEAR[id] && g.innerHTML === t.innerHTML ? id : (g || {}).textContent; }; });
      const h = await pp.evaluate(() => {
        const pet = document.querySelector('#pet'), svg = pet && pet.querySelector('.pet-svg'), r = svg && svg.getBoundingClientRect();
        return { cls: svg && svg.getAttribute('class'), rig: pet.classList.contains('rig'), filter: getComputedStyle(pet).filter,
          hat: wornId(svg, 'hat', '🎩'), toy: wornId(svg, 'toy', '🎈'),
          w: r && Math.round(r.width), right: r && r.right, sw: document.documentElement.scrollWidth };
      });
      if (h.cls !== 'pet-svg pet-k-dragon pet-s-kid pet-m-happy' || !h.rig || h.filter !== 'none' || h.hat !== '🎩' || h.toy !== '🎈' ||
        !(h.w >= 70 && h.w <= 130) || h.right > 380 || h.sw > 380) fail('P4-05 home pet: ' + JSON.stringify(h));
      // tap and read in one go: the cheer face lasts 550 ms of app time, about 70 ms real at SMOKE_SPEED 8 (P2-08: separate
      // round trips missed it on a cold page)
      const [cheer, base] = await pp.evaluate(() => { document.querySelector('#pet').click();
        return ['.pf-cheer', '.pf-base'].map(s => +getComputedStyle(document.querySelector('#pet ' + s)).opacity); });
      await pp.waitForTimeout(700);
      const after = await opa('#pet .pf-base');
      if (cheer !== 1 || base !== 0 || after !== 1) fail('P4-05 tap: cheer face ' + [cheer, base, after]);
      // Pet Care: hungry face; a snack makes it idle again; the bath shows the oops face
      await pp.evaluate(() => { S.care = { food: 10, clean: 90, fun: 90, t: Date.now(), gift: '' }; home(); });
      await pp.click('#care');
      await pp.waitForSelector('#pet .pet-m-hungry', { timeout: 3000 });
      await pp.click('[data-f="0"]');
      await pp.waitForSelector('#pet .pet-m-idle', { timeout: 4000 });
      await watch('#pet .pf-oops');
      await pp.click('#bath');
      await pp.waitForTimeout(300);
      const oops = await seenMax();
      if (oops !== 1) fail('P4-05 bath: oops face opacity ' + oops);
      await pp.waitForTimeout(1500);
      // map pet and round runner
      const mr = await pp.evaluate(() => {
        pathMap('math');
        const m = document.querySelector('.mappet .pet-svg'), r = m && m.getBoundingClientRect();
        return { m: !!m, h: r && Math.round(r.height), pos: m && getComputedStyle(m).position };
      });
      if (!mr.m || !(mr.h >= 40) || mr.pos !== 'static') fail('P4-05 map pet: ' + JSON.stringify(mr));
      await pp.evaluate(() => start('math', 0));
      await pp.waitForSelector('#runner .pet-svg');
      await watch('#runner .pf-cheer');
      await answer(pp);
      await pp.waitForTimeout(300);
      const rc = await seenMax();
      if (rc !== 1) fail('P4-05 runner: cheer face after a right answer ' + rc);
      await pp.evaluate(() => { G.dead = true; });
      // growth overlay: the egg wobbles, then the kid dragon appears
      await pp.evaluate(() => growShow(10));
      const g1 = await pp.evaluate(() => (document.querySelector('.ovl .grow .pet-svg') || { getAttribute: () => '' }).getAttribute('class'));
      await pp.waitForSelector('#yay', { timeout: 4000 });
      const g2 = await pp.evaluate(() => (document.querySelector('.ovl .grown .pet-svg') || { getAttribute: () => '' }).getAttribute('class'));
      await pp.click('#yay');
      if (!/pet-s-egg/.test(g1) || !/pet-s-kid/.test(g2)) fail('P4-05 growth overlay: ' + g1 + ' / ' + g2);
      // super stage, reduced motion and calm
      const sup = await pp.evaluate(() => { const s = S.stars; S.stars = 300; home(); const c = document.querySelector('#pet .pet-svg').getAttribute('class'); S.stars = s; home(); return c; });
      if (!/pet-s-grown/.test(sup) || !/pet-super/.test(sup)) fail('P4-05 super: ' + sup);
      const dur = () => pp.evaluate(() => parseFloat(getComputedStyle(document.querySelector('#pet .pg-fig')).animationDuration));
      const d0 = await dur();
      await pp.emulateMedia({ reducedMotion: 'reduce' });
      const d1 = await dur();
      await pp.emulateMedia({ reducedMotion: 'no-preference' });
      await pp.evaluate(() => document.documentElement.classList.add('calm'));
      const d2 = await dur();
      await pp.evaluate(() => document.documentElement.classList.remove('calm'));
      if (!(d0 >= 2) || !(d1 < .01) || !(d2 < .01)) fail('P4-05 motion: idle ' + d0 + 's, reduced ' + d1 + 's, calm ' + d2 + 's');
      // P4-06: a dino child sees the drawn dino with the same hat; setup offers all four drawn pets (was: dino emoji)
      const dino = await pp.evaluate(() => {
        S.pet = 'dino'; home();
        const pet = document.querySelector('#pet');
        const r = { e: !!pet.querySelector('.pe'), svg: (pet.querySelector('.pet-svg') || { getAttribute: () => '' }).getAttribute('class'), cls: pet.className,
          hat: wornId(pet, 'hat', '🎩') };
        S.pet = 'dragon'; S.name = ''; home();
        r.setup = [...document.querySelectorAll('.petopt')].map(b => b.dataset.p + ':' + (b.querySelector('.pet-svg') ? 'svg' : b.querySelector('span').textContent));
        return r;
      });
      if (dino.e || !/pet-k-dino pet-s-kid/.test(dino.svg) || dino.cls !== 'petbig rig' || dino.hat !== '🎩' || dino.setup.join() !== 'dragon:svg,dino:svg,bird:svg,ocean:svg')
        fail('P4-05 other pets / setup: ' + JSON.stringify(dino));
      else step('P4-05: drawn dragon on Home (hat + toy, cheer on tap), Pet Care moods, map and runner, growth, super, reduced motion and calm; dino drawn too (P4-06)');
      network.push(...pr.network);
      for (const e of pr.errors) fail(e);
      await pr.ctx.close();
    }

    // P2-04 Treasure Bay at 380x780: a 2nd grader who has finished Space Station opens on Treasure Bay (between Space Station and
    //    Multiply Mountain) at pv2, plays the first round with real taps, then all 13 stops are opened and three questions of each
    //    answered by taps (base-ten pictures, clocks, money, rulers, bar graphs, arrays); sizes checked (48 px or more, no sideways scroll).
    {
      const ba = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      const bp = ba.page;
      await bp.fill('#nm', 'Bay');
      await bp.click('.gr[data-g="2"]');
      await bp.click('#go');
      await bp.waitForSelector('.game[data-p="math"]');
      await bp.evaluate(() => { NODES.math.filter(n => n.wid === 'm_space').forEach(n => { S.maps.math[nid(n)] = 1; }); save(); home(); }); // Space Station finished
      await bp.click('.game[data-p="math"]');
      await bp.waitForSelector('.node.cur');
      const bm = await bp.evaluate(() => { const ids = PATHS.math.worlds.map(w => w.id), c = ids.indexOf('m_bay');
        return { c, near: ids[c - 1] + ' ' + ids[c + 1], on: +document.querySelector('.wchip.on').dataset.w, wid: NODES.math[curNode('math')].wid,
          sk: nid(NODES.math[curNode('math')]), chips: document.querySelectorAll('.wchip').length, n: ids.length }; });
      if (bm.c < 0 || bm.near !== 'm_space m_mult' || bm.on !== bm.c || bm.wid !== 'm_bay' || bm.sk !== 'pv2' || bm.chips !== bm.n) fail('Treasure Bay map: ' + JSON.stringify(bm));
      else step('Treasure Bay: sits between Space Station and Multiply Mountain, the map opens on it at stop pv2 after Space Station');
      await bp.click('.node.cur');
      await bp.waitForSelector('#prompt');
      await playRound(bp, 'P2-04 Place Value to 999');
      await bp.click('#menu');
      await bp.waitForSelector('#map');
      const bx = await bp.evaluate(() => { const a = WR.math[PATHS.math.worlds.findIndex(w => w.id === 'm_bay')][0]; return { pv: passed('math', a), next: unlocked('math', a + 1) }; });
      if (!bx.pv || !bx.next) fail('Treasure Bay: passing pv2 should unlock big5: ' + JSON.stringify(bx));
      const bstops = await bp.evaluate(() => NODES.math.map((n, i) => [i, nid(n), n.wid]).filter(x => x[2] === 'm_bay' && x[1] !== 'boss_m_bay'));
      const bseen = [];
      for (const [i, id] of bstops) {
        await bp.evaluate(i => { start('math', i); }, i);
        await bp.waitForSelector('#prompt');
        for (let k = 0; k < 3; k++) {
          await vwait(bp, 500);
          const sz = await bp.evaluate(() => {
            const pts = [...document.querySelectorAll('.ch, .k')].map(e => Math.min(e.offsetWidth, e.offsetHeight));
            const qa = document.querySelector('.qarea');
            return { sk: G.q.sk + G.q.lv, kind: G.q.kind, min: Math.min(...pts), wide: document.documentElement.scrollWidth, tall: qa.scrollHeight > qa.clientHeight + 1,
              svg: !!document.querySelector('#prompt svg') };
          });
          if (sz.min < 48 || sz.wide > 380 || sz.tall) fail('Treasure Bay stop ' + id + ': ' + JSON.stringify(sz));
          if (['time4', 'coins4', 'meas3', 'data2', 'arr1'].includes(id) && !sz.svg) fail('Treasure Bay stop ' + id + ' has no picture');
          if (k === 0) {
            await bp.click('#hb');
            const hint = await bp.evaluate(() => document.querySelector('#hint').innerHTML.length);
            if (!hint) fail('Treasure Bay stop ' + id + ': empty hint');
          }
          await bp.evaluate(() => { window.__q = G.q; });
          await answer(bp);
          if (k < 2) await bp.waitForFunction(() => G && G.q !== window.__q, null, { timeout: 8000 });
        }
        await bp.evaluate(() => { G.dead = true; });
        await vwait(bp, 1500);
        bseen.push(id);
      }
      if (bseen.length !== 13) fail('Treasure Bay has ' + bseen.length + ' stops checked, expected 13');
      else step('Treasure Bay: all 13 stops open, 3 questions each answered by taps; 48 px targets, no sideways scroll, hints');
      await bp.evaluate(() => { G.dead = true; home(); });
      network.push(...ba.network);
      for (const e of ba.errors) fail(e);
      await ba.ctx.close();
    }

    // P4-11 rewards at 380x780 (midway): a perfect round through finish() pays exactly what it paid before (stars, coins,
    //    stickers, game time); the drawn chest is a 48 px+ button with a spoken name; after the tap the rating shows 3 stars,
    //    two stickers, the earned list and one primary next step, with no emoji chrome, no sideways scroll, no word broken
    //    over two lines and every button 48 px or more. A low score gets the pet, "Try again" and the "Get N right" tip.
    //    The boss intro, top bar (hit face on a zap) and win card are drawn; the prize is saved and worn. Growth overlay,
    //    test out card, and calm mode hiding the confetti.
    {
      const ra = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const rp = ra.page;
      const layout = () => rp.evaluate(() => {
        const bad = [], W = document.documentElement.clientWidth;
        if (document.documentElement.scrollWidth > W + 1) bad.push('sideways scroll');
        const root = document.querySelector('.rw-card') || document.querySelector('#fin') || document.querySelector('#app');
        for (const b of root.querySelectorAll('button')) {
          const r = b.getBoundingClientRect();
          if (getComputedStyle(b).visibility != 'hidden' && (r.width < 47.5 || r.height < 47.5)) bad.push('target ' + Math.round(r.width) + 'x' + Math.round(r.height) + ' ' + b.id);
          if (r.right > W + 1) bad.push('off screen ' + b.id);
        }
        const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        for (let t = walk.nextNode(); t; t = walk.nextNode()) {
          if (t.parentElement.closest('.rw-stk,.rw-badge,.pet-svg')) continue; // stickers, prizes and the pet's worn costume are content
          if (/\p{Extended_Pictographic}/u.test(t.data)) bad.push('emoji chrome: ' + t.data.trim().slice(0, 30));
          for (const m of t.data.matchAll(/\S+/g)) {
            const rg = document.createRange(); rg.setStart(t, m.index); rg.setEnd(t, m.index + m[0].length);
            if (new Set([...rg.getClientRects()].filter(x => x.width > 0).map(x => Math.round(x.top))).size > 1) bad.push('word broken: ' + m[0]);
          }
        }
        return bad;
      });
      // 1. a perfect round on the first math stop
      const before = await rp.evaluate(() => {
        start('math', 0); G.score = G.n; G.done = G.n;
        return { stars: S.stars, coins: S.coins, stk: Object.values(S.stickers).reduce((a, b) => a + b, 0), bank: pt().bank, n: G.n,
          wasDone: day().done, r: day().r };
      });
      await rp.evaluate(() => finish());
      const pre = await rp.evaluate(() => {
        const c = document.querySelector('#chest'), r = c.getBoundingClientRect();
        return { svg: !!c.querySelector('svg.rw-chest-art'), aria: c.getAttribute('aria-label'), w: r.width, h: r.height };
      });
      if (!pre.svg || pre.aria !== 'Open the treasure chest' || pre.w < 48 || pre.h < 48) fail('P4-11 chest: ' + JSON.stringify(pre));
      const preBad = await layout();
      await rp.click('#chest');
      await rp.waitForSelector('#btns', { state: 'visible', timeout: 10000 });
      await vwait(rp, 6000);
      const got = await rp.evaluate(n => {
        const T = s => (document.querySelector(s) || {}).textContent || '';
        return { on: document.querySelectorAll('.rw-rate .rw-st.on').length, stk: document.querySelectorAll('#prz .rw-stk').length,
          earn: T('#earn'), prim: [...document.querySelectorAll('#btns .btn.primary')].map(b => b.id), menu: !!document.querySelector('#btns #menu'),
          bonus: !!document.querySelector('#btns #bonus'), stars: S.stars, coins: S.coins, bank: pt().bank,
          stkN: Object.values(S.stickers).reduce((a, b) => a + b, 0), mission: day().done, fmt: null };
      }, before.n);
      const mission = !before.wasDone && got.mission ? 5 : 0;
      const wantCoins = before.n + mission; // first stop is passed in midway, so no world is finished here
      if (got.stars - before.stars !== before.n + mission || got.coins - before.coins !== wantCoins || got.stkN - before.stk !== 2 + (mission ? 1 : 0))
        fail('P4-11 rewards changed: ' + JSON.stringify({ before, got }));
      const gameTime = await rp.evaluate(d => fmtM(d), got.bank - before.bank);
      if (!(got.bank > before.bank) || !got.earn.includes('+' + gameTime + ' of game time') || !got.earn.includes('+' + before.n + ' stars') ||
        !got.earn.includes('coins for the pet shop')) fail('P4-11 earned list: ' + got.earn.slice(0, 160));
      if (got.on !== 3 || got.stk !== 2 + (mission ? 1 : 0) || got.prim.length !== 1 || !got.menu || !got.bonus) fail('P4-11 finish screen: ' + JSON.stringify(got));
      const postBad = await layout();
      for (const b of preBad.concat(postBad)) fail('P4-11 finish layout: ' + b);
      // 2. a low score: no stars, the pet cheers, Try again is the primary button, and the tip says how many to get
      await rp.evaluate(() => { start('math', 0); G.score = Math.floor(G.n * .7 + .01) - 2; G.done = G.n; finish(); });
      await rp.click('#chest');
      await rp.waitForSelector('#btns', { state: 'visible', timeout: 10000 });
      await vwait(rp, 5000);
      const low = await rp.evaluate(() => ({ pet: !!document.querySelector('.rw-hero .rw-pet'), rate: !!document.querySelector('.rw-rate'),
        again: (document.querySelector('#again.primary') || {}).textContent, tip: (document.querySelector('.rw-hero .rw-tip') || {}).textContent || '' }));
      if (!low.pet || low.rate || low.again !== 'Try again' || !/^Get \d+ right to open the next stop/.test(low.tip)) fail('P4-11 low score: ' + JSON.stringify(low));
      for (const b of await layout()) fail('P4-11 low score layout: ' + b);
      // 3. boss: intro, top bar with the hit face on a zap, then a win with its prize
      const bi = await rp.evaluate(() => NODES.math.indexOf(NODES.math.filter(n => n.sk == 'boss')[2]));
      const prize = await rp.evaluate(bi => { bossIntro('math', bi); return NODES.math[bi].prize; }, bi);
      const intro = await rp.evaluate(() => ({ boss: !!document.querySelector('.rw-bstage svg.rw-boss'), badge: !!document.querySelector('.rw-badge'),
        fight: !!document.querySelector('#fight.btn.subject') }));
      if (!intro.boss || !intro.badge || !intro.fight) fail('P4-11 boss intro: ' + JSON.stringify(intro));
      for (const b of await layout()) fail('P4-11 boss intro layout: ' + b);
      await rp.click('#fight');
      await rp.waitForSelector('.bossE svg.rw-boss');
      const hitFace = await rp.evaluate(() => { bossHit(); return +getComputedStyle(document.querySelector('.bossE .rb-hit')).opacity; });
      if (hitFace !== 1) fail('P4-11 boss zap: hit face opacity ' + hitFace);
      await rp.evaluate(() => { G.dead = false; G.won = true; G.asked = 7; G.score = 7; G.done = G.n; finish(); });
      await rp.click('#chest');
      await rp.waitForSelector('#btns', { state: 'visible', timeout: 10000 });
      await vwait(rp, 7000);
      const win = await rp.evaluate(p => ({ card: !!document.querySelector('.rw-msg.boss svg.rw-p-hit'), badge: !!document.querySelector('.rw-msg .rw-badge'),
        owned: S.owned[p], hat: S.wear.hat === p }), prize);
      if (!win.card || !win.badge || win.owned !== 1 || !win.hat) fail('P4-11 boss win: ' + JSON.stringify(win));
      // 4. growth overlay and test out card
      await rp.evaluate(() => growShow(10));
      await rp.waitForSelector('#yay', { timeout: 4000 });
      const gr = await rp.evaluate(() => ({ card: !!document.querySelector('.ovl.rw-ovl .rw-card .grown .pet-svg'), prim: !!document.querySelector('#yay.btn.primary') }));
      for (const b of await layout()) fail('P4-11 growth layout: ' + b);
      await rp.click('#yay');
      if (!gr.card || !gr.prim) fail('P4-11 growth overlay: ' + JSON.stringify(gr));
      await rp.evaluate(() => testOut('math', 2));
      const to = await rp.evaluate(() => ({ go: !!document.querySelector('.rw-card #tgo.primary'), no: !!document.querySelector('.rw-card #tno') }));
      for (const b of await layout()) fail('P4-11 test out layout: ' + b);
      await rp.click('#tno');
      if (!to.go || !to.no || await rp.$('.rw-card')) fail('P4-11 test out: ' + JSON.stringify(to));
      // 5. calm mode hides the drawn confetti
      const calm = await rp.evaluate(() => {
        document.documentElement.classList.add('calm'); home();
        RW.burst(document.querySelector('#app'), 6);
        const d = getComputedStyle(document.querySelector('.rw-burst')).display;
        document.documentElement.classList.remove('calm'); return d;
      });
      if (calm !== 'none') fail('P4-11 calm: confetti display ' + calm);
      else step('P4-11: finish pays the same stars, coins, stickers and game time; drawn chest, 3-star rating, stickers, earned list, one primary next step; low score kind with Try again; boss intro, zap face, win card and prize; growth and test out cards; calm hides confetti; no emoji chrome, 48 px targets, no sideways scroll at 380x780');
      network.push(...ra.network);
      for (const e of ra.errors) fail(e);
      await ra.ctx.close();
    }

    // P4-03 icons at 380x780 (midway): Grown-ups, Pet Shop, Stickers and the Game Room menu show ico() icons instead of emoji;
    //    every icon points at a sprite symbol and is drawn (not 0 x 0); the shop tabs and the back buttons still work.
    {
      const ia = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const ip = ia.page;
      const look = fn => ip.evaluate(fn => {
        window[fn]();
        const uses = [...document.querySelectorAll('#app svg.ic use')];
        const missing = uses.map(u => u.getAttribute('href')).filter(h => !document.querySelector(h));
        const flat = [...document.querySelectorAll('#app svg.ic')].filter(s => s.closest('.top,.card,.ptcard,.games,.tabs,.shopgrid,.sgrid'))
          .filter(s => { const r = s.getBoundingClientRect(); return r.width < 8 || r.height < 8; }).length;
        const title = document.querySelector('.top .title');
        return { n: uses.length, missing, flat, title: title ? title.textContent.trim() : '', back: !!document.querySelector('#back[aria-label="Back"] svg.ic') };
      }, fn);
      const EMO = /\p{Emoji_Presentation}|\p{Extended_Pictographic}️/u;
      for (const [fn, min] of [['grown', 20], ['shop', 8], ['book', 3], ['gameRoom', 14]]) {
        const r = await look(fn);
        if (r.n < min || r.missing.length || r.flat || !r.back || EMO.test(r.title)) fail('P4-03 ' + fn + ': ' + JSON.stringify(r));
      }
      // shop tabs: tap Toys, the tab keeps its icon and the grid changes; back goes home
      await ip.evaluate(() => shop());
      await ip.click('.tab[data-t="toy"]');
      const tab = await ip.evaluate(() => ({ on: document.querySelector('.tab.on').dataset.t, ic: !!document.querySelector('.tab.on svg.ic') }));
      await ip.click('#back');
      const home = await ip.evaluate(() => !document.querySelector('.tabs') && !!document.querySelector('#app *'));
      // Game Room back button, then the Grown-ups record row still offers Record buttons with the record icon
      await ip.evaluate(() => gameRoom());
      await ip.click('#back');
      await vwait(ip, 300);
      const gr = await ip.evaluate(() => !document.querySelector('.ptcard') && !!document.querySelector('#app *'));
      const rec = await ip.evaluate(() => { grown(); return document.querySelectorAll('[data-rec] use[href="#i-record"]').length; });
      if (tab.on !== 'toy' || !tab.ic || !home || !gr || rec < 3) fail('P4-03 taps: ' + JSON.stringify({ tab, home, gr, rec }));
      else step('P4-03: Grown-ups, Pet Shop, Stickers and Game Room show sprite icons (no emoji titles), shop tabs and back buttons work');
      network.push(...ia.network);
      for (const e of ia.errors) fail(e);
      await ia.ctx.close();
    }

    // P4-08 Home at 380x780, 600x960 and 1024x600 for a fresh grade-1 child ("Find my level" card), the midway save, and a child
    //    with a streak, review items due and a hungry pet (tricky save): no sideways scroll, nothing overflows its box, no word
    //    broken over two lines, every target at least 48 px, no emoji in the chrome, scene and pictures drawn. Then (380x780)
    //    every Home button still opens its screen, the thought bubble and the Pet Care badge show, and calm stops the bubble.
    {
      const hmSet = ([kind]) => {
        if (kind == 'fresh') { S.name = 'Ava'; setGrade(1); }
        if (kind == 'tricky') {
          const n = STRK.idx(today()), k = d => STRK.key(n - d);
          S.streak = { best: 9, rw: 0, days: { [k(0)]: 1, [k(1)]: 1, [k(2)]: 1 } };
          S.care = { food: 12, clean: 70, fun: 70, t: Date.now(), gift: '' };
        }
        home();
      };
      const hmCheck = () => {
        const bad = [], W = document.documentElement.clientWidth, sc = document.querySelector('.scroll');
        if (document.documentElement.scrollWidth > W + 1 || sc.scrollWidth > sc.clientWidth + 1) bad.push('sideways scroll');
        const name = el => (el.id ? '#' + el.id : el.getAttribute('class')) + ' "' + el.textContent.trim().slice(0, 24) + '"';
        for (const el of document.querySelectorAll('.hm-top *, .hm *')) {
          if (el.closest('svg') || el.closest('#pet')) continue;
          const r = el.getBoundingClientRect();
          if (r.width && r.right > W + 1) bad.push('off the right edge: ' + name(el));
          if (getComputedStyle(el).textOverflow != 'ellipsis' && el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflow != 'visible') bad.push('overflows: ' + name(el));
        }
        for (const el of document.querySelectorAll('.hm-top, .hm-hero, .hm-place, .hm-today, .hm-paths, .hm-acts, .hm-h, .hm-ver')) {
          const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
          for (let t = walk.nextNode(); t; t = walk.nextNode()) {
            if (t.parentElement.closest('svg, #pet')) continue;
            for (const m of t.data.matchAll(/\S+/g)) {
              const rg = document.createRange();
              rg.setStart(t, m.index);
              rg.setEnd(t, m.index + m[0].length);
              if (new Set([...rg.getClientRects()].filter(x => x.width > 0).map(x => Math.round(x.top))).size > 1) bad.push('word broken: ' + m[0]);
            }
          }
        }
        for (const el of document.querySelectorAll('#app button')) {
          const r = el.getBoundingClientRect();
          if (r.width < 47.5 || r.height < 47.5) bad.push('target ' + Math.round(r.width) + 'x' + Math.round(r.height) + ' ' + name(el));
        }
        const chrome = [...document.querySelectorAll('.hm-top, .hm-hero, .hm-place, .hm-today, .hm-paths, .hm-acts')].map(e => {
          const c = e.cloneNode(true); c.querySelectorAll('#pet').forEach(x => x.remove()); return c.textContent;
        }).join(' ');
        if (/\p{Extended_Pictographic}/u.test(chrome)) bad.push('emoji in Home chrome');
        if (!document.querySelector('.hm-stage .hm-scene') || document.querySelectorAll('.hm-path .hm-svg').length < 4) bad.push('scene or path pictures missing');
        return bad;
      };
      let looked = 0;
      for (const [w, h] of [[380, 780], [600, 960], [1024, 600]]) {
        for (const fx of ['fresh', 'midway', 'tricky']) {
          const ha = await openApp(browser, { fixture: fx, width: w, height: h });
          await ha.page.evaluate(hmSet, [fx]);
          await ha.page.waitForTimeout(450); // the screen's enter animation (CSS, real time) scales #app to .97 at first
          const bad = await ha.page.evaluate(hmCheck);
          for (const b of bad) fail(`P4-08 home ${fx} ${w}x${h}: ${b}`);
          if (fx == 'fresh' && !(await ha.page.$('#plcard [data-place="math"]'))) fail(`P4-08 home fresh ${w}x${h}: no "Find my level" card`);
          looked++;
          network.push(...ha.network);
          for (const e of ha.errors) fail(e);
          await ha.ctx.close();
        }
      }
      // every action at 380x780 (tricky: review due, streak, hungry pet)
      const ha = await openApp(browser, { fixture: 'tricky', width: 380, height: 780 });
      const hp = ha.page;
      await hp.evaluate(hmSet, ['tricky']);
      await hp.waitForTimeout(450);
      const bits = await hp.evaluate(() => ({ think: !!document.querySelector('.hm-think svg'), need: !!document.querySelector('#care .hm-need'),
        flame: !document.querySelector('#stkb').classList.contains('off'), revn: (document.querySelector('#revn') || {}).textContent }));
      if (!bits.think || !bits.need || !bits.flame || bits.revn !== '21') fail('P4-08 home state: ' + JSON.stringify(bits));
      const anim = () => hp.evaluate(() => parseFloat(getComputedStyle(document.querySelector('.hm-think')).animationDuration));
      const a0 = await anim();
      await hp.evaluate(() => document.documentElement.classList.add('calm'));
      const a1 = await anim();
      await hp.evaluate(() => document.documentElement.classList.remove('calm'));
      if (!(a0 >= 1) || !(a1 < .01)) fail('P4-08 thought bubble motion: ' + a0 + 's, calm ' + a1 + 's');
      const opens = [['.game[data-p="math"]', '#map'], ['.game[data-p="read"]', '#map'], ['.game[data-p="es"]', '#map'], ['#flu', '.game[data-s]'],
        ['#mix', '#prompt'], ['#rev', '#prompt'], ['#race', '[data-r]'], ['#care', '#bath'], ['#shop', '#coinc'], ['#book', '.sgrid'],
        ['#groom', '#g4x4'], ['#stkb', '.stc-grid']];
      for (const [btn, want] of opens) {
        await hp.evaluate(() => { if (typeof G != 'undefined' && G) G.dead = true; home(); });
        await hp.click(btn);
        try { await hp.waitForSelector(want, { timeout: 4000 }); } catch (e) { fail(`P4-08 ${btn} did not open ${want}`); }
      }
      const daily = await hp.evaluate(() => { G.dead = true; home(); document.querySelector('#rev').click(); return !!G.daily; });
      if (!daily) fail('P4-08 #rev did not start the daily review');
      // sound toggle redraws Home with the other icon; the pet still reacts to a tap
      await hp.evaluate(() => { G.dead = true; home(); });
      const s0 = await hp.evaluate(() => [S.sound, !!document.querySelector('#snd use[href="#i-sound-on"]')]);
      await hp.click('#snd');
      const s1 = await hp.evaluate(() => [S.sound, !!document.querySelector('#snd use[href="#i-sound-on"]')]);
      await hp.evaluate(() => { S.sound = false; S.music = false; save(); home(); });
      if (s0[0] === s1[0] || s0[1] !== s0[0] || s1[1] !== s1[0]) fail('P4-08 sound button: ' + JSON.stringify([s0, s1]));
      // the jump class lasts 550 ms of app time, so record the anim() call instead of racing the timer
      await hp.evaluate(() => { const o = anim; window.__hmAnim = []; anim = (e, c) => { __hmAnim.push(c); o(e, c); }; });
      await hp.click('#pet');
      if ((await hp.evaluate(() => __hmAnim.join())) !== 'jump') fail('P4-08 pet tap');
      network.push(...ha.network);
      for (const e of ha.errors) fail(e);
      await ha.ctx.close();
      // fresh child: a subject button opens the placement intro, "Not now" hides the card
      const hf = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      await hf.page.evaluate(hmSet, ['fresh']);
      await hf.page.click('#plcard [data-place="read"]');
      try { await hf.page.waitForSelector('#plgo', { timeout: 3000 }); } catch (e) { fail('P4-08 placement button did not open the intro'); }
      await hf.page.evaluate(() => home());
      await hf.page.click('#plno');
      if (await hf.page.$('#plcard')) fail('P4-08 "Not now" did not hide the card');
      else step(`P4-08: Home checked in ${looked} layouts (no overflow, no broken words, targets 48+, no emoji chrome), every button opens its screen`);
      network.push(...hf.network);
      for (const e of hf.errors) fail(e);
      await hf.ctx.close();
    }

    // P4-10 question screen at 380x780, 600x960 and 1024x600: nine kinds (num, dec pad, choice, multi, order, match, tap,
    //    spell, build) and a Pre-K question; every target at least 48 px (pad keys at least 56, spell keys 48 tall), nothing
    //    sticks out sideways, no word broken over two lines, the track has one dot per question; then right and wrong
    //    feedback: a green tick badge and a toast, an amber cross badge and a "try again" toast; calm mode stops the motion.
    {
      const KB10 = require('./lib/kb-samples.js'), KS10 = '(' + require('./kinds-samples').make.toString() + ')';
      // lay out one question and measure it (runs in the page)
      const measure = () => {
        const vw = document.documentElement.clientWidth, out = [];
        const tgt = '#quit, #spk, #hb, #undo, #mcheck, .stat, .key, .choice, .piece, .socket, .tp, .pkplate, .btn';
        for (const e of document.querySelectorAll(tgt)) {
          const r = e.getBoundingClientRect();
          if (!r.width) continue;
          const min = e.matches('.sk') ? r.height : Math.min(r.width, r.height);
          if (min < 47.5) out.push('small ' + (e.id || e.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (e.matches('.qpad .key:not(.x)') && Math.min(r.width, r.height) < 55.5) out.push('pad key ' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (e.matches('.sk') && r.width < 28) out.push('spell key ' + Math.round(r.width));
          if (r.left < -1 || r.right > vw + 1) out.push('outside ' + (e.id || e.className) + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
          // a word broken over two lines shows up as a range with two boxes
          const w = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
          for (let n; (n = w.nextNode());) {
            for (const m of n.textContent.matchAll(/\S+/g)) {
              const rg = document.createRange(); rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length);
              const lines = new Set([...rg.getClientRects()].filter(b => b.width > 1).map(b => Math.round(b.top)));
              if (lines.size > 1) out.push('broken word ' + m[0]);
            }
          }
        }
        if (document.documentElement.scrollWidth > vw) out.push('sideways scroll ' + document.documentElement.scrollWidth);
        const tr = document.querySelector('#qtrack');
        if (tr && tr.querySelectorAll('.dots > i').length !== G.n) out.push('dots ' + tr.querySelectorAll('.dots > i').length + ' of ' + G.n);
        if (!document.querySelector('.qtop #quit') || !document.querySelector('#starc') || !document.querySelector('#stk')) out.push('top bar');
        return out;
      };
      const show = {
        num: () => { start('math', NODES.math.findIndex(n => n.sk == 'add')); for (let t = 0; t < 40 && G.q.kind != 'num'; t++) { G.q = genQ(G.q.sk, G.q.lv); renderQ(); } },
        choice: () => { start('math', NODES.math.findIndex(n => n.sk == 'eo')); },
        build: () => { start('read', NODES.read.findIndex(n => n.sk == 'build')); },
        pk: () => { window.__g = S.grade; setGrade(-1); start('math', NODES.math.findIndex(n => n.sk == 'pk_more')); S.grade = __g; },
      };
      const bad10 = [];
      for (const [w, h] of [[380, 780], [600, 960], [1024, 600]]) {
        const qa = await openApp(browser, { fixture: 'midway', width: w, height: h });
        const qp = qa.page;
        await qp.evaluate(src => { window.__KS = eval(src)(); }, KS10);
        const views = [['num', show.num], ['choice', show.choice], ['build', show.build], ['pk', show.pk]];
        for (const k of ['dec', 'frac', 'multi', 'order']) views.push([k, k]);
        for (const k of ['match', 'tapLine', 'spell', 'spellEs']) views.push([k, KB10[k]]);
        for (const [name, how] of views) {
          await qp.evaluate(([how, isFn]) => {
            if (G) G.dead = true;
            if (isFn) eval('(' + how + ')')();
            else if (typeof how == 'string') { G = newG({ sk: 'zz_demo', n: 1, pool: [__KS[how]] }); next(); }
            else { start('math', 0); G.q = how; renderQ(); }
          }, [typeof how == 'function' ? how.toString() : how, typeof how == 'function']);
          await qp.waitForTimeout(450); // the prompt's entrance and fit()
          const out = await qp.evaluate(measure);
          if (out.length) bad10.push(`${name} ${w}x${h}: ${out.slice(0, 4).join('; ')}`);
        }
        if (w == 380) {
          // right: green badge on the slot and a good toast; wrong: amber choice with a badge and a try-again toast
          // next() is held (the round stays on this question) and toasts are recorded, so the virtual clock cannot hide them first
          await qp.evaluate(() => { G.dead = true; });
          await qp.evaluate('(' + show.num.toString() + ')()');
          await qp.evaluate(() => { window.__next = next; next = () => {}; window.__toasts = [];
            const t = UI.toast; UI.toast = (...a) => { __toasts.push(a[1] + ':' + a[0]); t.apply(UI, a); }; });
          await answer(qp);
          const r1 = await qp.evaluate(() => ({ ok: document.querySelector('#slot').classList.contains('ok'),
            badge: getComputedStyle(document.querySelector('#slot'), '::before').content, toast: __toasts.join(),
            dot: document.querySelectorAll('#qtrack .dots > i.done').length, res: (G.res || []).join() }));
          if (!r1.ok || r1.badge === 'none' || !/^good:/.test(r1.toast) || r1.dot !== 1) bad10.push('right answer feedback: ' + JSON.stringify(r1));
          await qp.evaluate(() => { G.dead = true; next = __next; });
          await qp.evaluate('(' + show.choice.toString() + ')()');
          await qp.evaluate(() => { window.__toasts = []; });
          await qp.click(`.ch[data-i="${await qp.evaluate(() => G.q.choices.findIndex(c => String(c.v) !== String(G.q.ans)))}"]`);
          const r2 = await qp.evaluate(() => {
            const b = document.querySelector('.ch.wrong'), cs = b && getComputedStyle(b);
            return { wrong: !!b, bg: cs && cs.backgroundColor, badge: b && getComputedStyle(b, '::after').backgroundImage.includes('gradient'),
              toast: __toasts.join(), hint: document.querySelector('#hint').innerHTML.length,
              flame: document.querySelector('#stk').classList.contains('off') };
          });
          if (!r2.wrong || r2.bg !== 'rgb(255, 232, 184)' || !r2.badge || !/try:Try again/.test(r2.toast) || !r2.flame) bad10.push('wrong answer feedback: ' + JSON.stringify(r2));
          // calm mode: no entrance animation on the prompt
          const calm = await qp.evaluate(() => { document.documentElement.classList.add('calm'); renderQ();
            const d = parseFloat(getComputedStyle(document.querySelector('#prompt')).animationDuration); document.documentElement.classList.remove('calm'); return d; });
          if (!(calm < .01)) bad10.push('calm mode prompt animation ' + calm + 's');
          await qp.evaluate(() => { G.dead = true; });
          await vwait(qp, 3000); // the round's own timers fire into the dead round
        }
        network.push(...qa.network);
        for (const e of qa.errors) fail(e);
        await qa.ctx.close();
      }
      if (bad10.length) fail('P4-10 question screen:\n  ' + bad10.join('\n  '));
      else step('P4-10: 12 kinds at 380x780, 600x960, 1024x600: targets 48 px (pad keys 56), no sideways scroll, no broken words, one dot per question; right and wrong feedback with badges and toasts; calm mode');
    }

    // P2-07 Fraction Forest, the other twelve stops, at 380x780: a 3rd grader plays round1 ... story6 in map order with real taps
    //    (the four fraction stops are passed in the save, so each new stop opens as the one before it is passed). Nothing is wider
    //    than the screen, number pad keys and choices are 48 px or more, the picture stops show a picture, and every stop saves
    //    its stars. Then a forest that was finished before (four fraction stops + boss) shows NEW on all twelve, and the map
    //    does not open on one of them (this child still has an older stop open).
    {
      const ff7 = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const fq = ff7.page;
      await fq.evaluate(() => { S.grade = 3; for (const id of ['frac2', 'frac3', 'frac4', 'frac5']) S.maps.math[id] = 3; save(); });
      const forest = await fq.evaluate(() => PATHS.math.worlds.findIndex(w => w.id === 'm_frac'));
      const stops = await fq.evaluate(w => PATHS.math.worlds[w].nodes.map(n => n[0] + n[1]), forest);
      if (stops.length !== 16) fail('Fraction Forest should have 16 stops plus the boss: ' + stops.join(' '));
      const fresh = stops.filter(s => !/^frac/.test(s));
      const pics = new Set(['time5', 'geo1', 'geo2', 'data3', 'shape5', 'meas4']);
      for (const id of fresh) {
        await fq.evaluate(() => home());
        await fq.click('.game[data-p="math"]');
        await fq.waitForSelector('.wchip.on');
        await fq.click(`.wchip[data-w="${forest}"]`);
        await fq.waitForSelector(`.wchip.on[data-w="${forest}"]`);
        const n = await fq.evaluate(id => NODES.math.findIndex(x => nid(x) === id), id);
        await fq.click(`.node[data-n="${n}"]`);
        await fq.waitForSelector('#prompt');
        await fq.waitForTimeout(900); // the prompt pops in with a scale animation; sizes are measured once it has settled
        const lay = await fq.evaluate(() => {
          const sm = a => Math.min(...a.map(b => Math.min(b.offsetHeight, b.offsetWidth)));
          return { sk: G.sk, lv: G.lv, w: document.documentElement.scrollWidth, art: !!document.querySelector('#prompt svg, .ch svg'),
            keys: sm([...document.querySelectorAll('.k')]), ch: sm([...document.querySelectorAll('.ch')]) };
        });
        if (lay.sk + lay.lv !== id || lay.w > 380 || lay.keys < 48 || lay.ch < 48 || (pics.has(id) && !lay.art)) fail('Fraction Forest stop ' + id + ': ' + JSON.stringify(lay));
        await playRound(fq, 'P2-07 ' + id, 10);
        await fq.evaluate(() => { G.dead = true; });
      }
      const got = await fq.evaluate(ids => ids.map(id => S.maps.math[id] || 0), stops);
      if (got.some(s => s < 1)) fail('Fraction Forest stars not saved: ' + JSON.stringify(got));
      // a forest finished before these stops existed: the twelve new stops are NEW and the map does not open on them
      const nw = await fq.evaluate(([w, ids]) => {
        for (const id of ids) if (!/^frac/.test(id)) delete S.maps.math[id];
        S.maps.math.boss_m_frac = 3; save();
        pathMap('math', w);
        return { tags: document.querySelectorAll('.nnew').length, cur: nid(NODES.math[curNode('math')]) };
      }, [forest, stops]);
      if (nw.tags !== 12 || fresh.includes(nw.cur)) fail('finished forest: NEW tags ' + JSON.stringify(nw));
      else step('P2-07: Fraction Forest 16 stops; the 12 new stops played with taps (48 px targets, pictures, stars saved); 12 NEW tags on a finished forest');
      network.push(...ff7.network);
      for (const e of ff7.errors) fail(e);
      await ff7.ctx.close();
    }

    // P2-20 grammar 1-5: every level has a map stop in its world (by id); at 380x780 each level's question fits (no sideways scroll, answer
    //       buttons at least 48 px, tap-a-word buttons too); the hint teaches without the answer; one full round earns stars and
    //       no other stop's stars move
    {
      const ga = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const gp = ga.page;
      await gp.waitForSelector('.game[data-p="read"]');
      const gi = await gp.evaluate(() => ({
        stops: NODES.read.filter(n => n.sk == 'gram' && n.lv <= 5).map(n => n.lv + '@' + n.wid).join(' '),
        before: JSON.stringify(S.maps.read),
      }));
      if (gi.stops !== '1@r_reef 2@r_workshop 3@r_workshop 4@r_summit 5@r_summit') fail('grammar stops on the reading map: ' + gi.stops);
      const bad20 = [];
      for (let lv = 1; lv <= 5; lv++) {
        await gp.evaluate(lv => { start('read', NODES.read.findIndex(n => n.sk == 'gram' && n.lv == lv)); }, lv);
        await gp.waitForSelector('#prompt .bq');
        const m = await gp.evaluate(() => {
          const pr = document.querySelector('#prompt'), chs = [...document.querySelectorAll('.ch')];
          return { sk: G.q.sk, lv: G.q.lv, kind: G.q.kind, n: chs.length, minH: Math.min(...chs.map(c => c.offsetHeight)),
            over: document.documentElement.scrollWidth - document.documentElement.clientWidth, pover: pr.scrollWidth - pr.clientWidth,
            cut: chs.filter(c => c.scrollWidth > c.clientWidth + 1).length };
        });
        if (m.sk !== 'gram' || m.lv !== lv || m.kind !== 'choice' || m.n < 2 || m.n > 4 || m.minH < 48 || m.over > 0 || m.pover > 0 || m.cut)
          bad20.push('level ' + lv + ': ' + JSON.stringify(m));
        await gp.click('#hb');
        const hint = await gp.evaluate(() => ({ t: document.querySelector('#hint').textContent, ans: String(G.q.ans) }));
        if (hint.t.length < 20 || (hint.ans.length > 2 && new RegExp('\\b' + hint.ans + '\\b', 'i').test(hint.t))) bad20.push('level ' + lv + ' hint: ' + hint.t);
        await gp.evaluate(() => { G.dead = true; home(); });
      }
      if (bad20.length) fail('P2-20 grammar:\n  ' + bad20.join('\n  '));
      else step('P2-20 grammar: five levels fit at 380x780, answer buttons 48 px or more, hints teach without the answer');
      const gj = await gp.evaluate(() => NODES.read.findIndex(n => n.sk == 'gram' && n.lv == 2));
      await gp.evaluate(i => start('read', i), gj);
      await playRound(gp, 'P2-20 grammar 2');
      const gafter = await gp.evaluate(i => ({ st: getSt('read', i), maps: JSON.stringify(S.maps.read) }), gj);
      const gwas = JSON.parse(gi.before), gnow = JSON.parse(gafter.maps);
      const gmoved = Object.keys(gwas).filter(k => gnow[k] !== gwas[k]);
      if (gafter.st < 1 || gmoved.length) fail('grammar stars: ' + JSON.stringify({ st: gafter.st, gmoved }));
      else step(`grammar: stop earned ${gafter.st} stars, no other stop changed`);
      await gp.evaluate(() => { G.dead = true; home(); });
      await vwait(gp, 1500);
      network.push(...ga.network);
      for (const e of ga.errors) fail(e);
      await ga.ctx.close();
    }

    // P2-22 vocabulary A: five stops on the reading map; a round of the opposites level and a look at the compound-word and prefix layouts
    //       at 380x780 (choice buttons 48 px or more, no sideways scroll); the stop earns stars; stars of other stops do not move
    {
      const va = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const vp = va.page;
      await vp.waitForSelector('.game[data-p="read"]');
      const vi = await vp.evaluate(() => {
        const st = NODES.read.filter(n => n.sk == 'vocab' && n.lv <= 5).map(n => n.lv + '@' + n.wid).join(' ');
        const i = NODES.read.findIndex(n => n.sk == 'vocab' && n.lv == 1);
        const before = JSON.stringify(S.maps.read);
        start('read', i);
        return { st, i, before };
      });
      if (vi.st !== '1@r_reef 2@r_workshop 3@r_workshop 4@r_summit 5@r_summit') fail('vocabulary stops on the reading map: ' + vi.st);
      await vp.waitForSelector('#prompt');
      const look = lv => vp.evaluate(lv => {
        const q = genQ('vocab', lv, 3);
        G.q = q; q.sk = 'vocab'; q.lv = lv; renderQ();
        const chs = [...document.querySelectorAll('.ch')], pr = document.querySelector('#prompt');
        return { lv, n: chs.length, minH: Math.min(...chs.map(c => c.offsetHeight)), over: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          cut: chs.some(c => c.scrollWidth > c.clientWidth + 1), text: pr.textContent.length > 8, label: q.label };
      }, lv);
      const bads = [];
      for (const lv of [1, 3, 4, 5]) { const r = await look(lv); if (r.minH < 48 || r.over > 0 || r.cut || !r.text) bads.push(JSON.stringify(r)); }
      if (bads.length) fail('vocabulary layout at 380: ' + bads.join(' '));
      else step('vocabulary: levels 1, 3, 4, 5 at 380x780: choices 48 px or more, no sideways scroll, no cut-off words');
      await vp.evaluate(() => { G.dead = true; start('read', NODES.read.findIndex(n => n.sk == 'vocab' && n.lv == 1)); });
      await vp.waitForSelector('#prompt');
      await vp.click('#hb');
      const hint = await vp.evaluate(() => document.querySelector('#hint').textContent);
      if (!/pair/.test(hint)) fail('vocabulary hint: ' + hint); else step('vocabulary: hint shows');
      await playRound(vp, 'P2-22 vocabulary 1');
      const after = await vp.evaluate(i => ({ st: getSt('read', i), maps: JSON.stringify(S.maps.read) }), vi.i);
      const was = JSON.parse(vi.before), now = JSON.parse(after.maps);
      const moved = Object.keys(was).filter(k => now[k] !== was[k]);
      if (after.st < 1 || moved.length) fail('vocabulary stars: ' + JSON.stringify({ st: after.st, moved }));
      else step(`vocabulary: stop earned ${after.st} stars, no other stop changed`);
      await vp.evaluate(() => { G.dead = true; home(); });
      network.push(...va.network);
      for (const e of va.errors) fail(e);
      await va.ctx.close();
    }

    // P4-18 graphics pass at 380x780 and 600x960 (midway): the screens it redrew (map with world badges, stop icons and a drawn
    //    boss; Fact Sprint menu, modes, play and end card; Speed Race menu, play and end card; streak calendar; placement intro,
    //    question and result; Pet Care; Game Room; setup; the balloon bonus; the Spanish learn cards; the report card) have every
    //    button at least 48 px, nothing outside the screen, no sideways scroll, no word broken over two lines and no emoji in
    //    their chrome (pets, balloons, snack and word pictures are content and not counted).
    {
      const look = () => {
        const vw = document.documentElement.clientWidth, out = [];
        const SKIP = '.petbig, .pet-svg, .gx-pp, .bal, .gx-sp, .stage, .lp, .mappet, .sdeco, .rw-burst, .burst';
        for (const e of document.querySelectorAll('button, [role="button"]')) {
          const r = e.getBoundingClientRect();
          if (!r.width || r.bottom < 0 || r.top > innerHeight || e.closest('svg')) continue;
          if (Math.min(r.width, r.height) < 47.5) out.push('small ' + (e.id || e.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (!e.closest('.wstrip') && (r.left < -1 || r.right > vw + 1)) out.push('outside ' + (e.id || e.className) + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
        }
        if (document.documentElement.scrollWidth > vw) out.push('sideways scroll ' + document.documentElement.scrollWidth);
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n; (n = w.nextNode());) {
          const el = n.parentElement;
          if (!el || el.closest(SKIP) || el.closest('script,style,#ico-sprite') || !el.getClientRects().length) continue;
          const m = n.textContent.match(/\p{Extended_Pictographic}|[◀▶✕]/u);
          if (m) out.push('emoji chrome ' + m[0] + ' in ' + (el.id || el.className));
          for (const x of n.textContent.matchAll(/[A-Za-z]{4,}/g)) {
            const rg = document.createRange(); rg.setStart(n, x.index); rg.setEnd(n, x.index + x[0].length);
            const lines = new Set([...rg.getClientRects()].filter(b => b.width > 1).map(b => Math.round(b.top)));
            if (lines.size > 1) out.push('broken word ' + x[0]);
          }
        }
        return out;
      };
      const screens = [
        ['map', () => pathMap('math')],
        ['map boss', () => { pathMap('math'); document.querySelector('.node.boss').scrollIntoView({ block: 'center' }); }],
        ['map read', () => pathMap('read')],
        ['sprint menu', () => fluMenu()],
        ['sprint modes', () => fluModes('add20')],
        ['sprint play', () => fluPlay('add10', 't60'), 800, () => stopFlu()],
        ['sprint end', () => fluEnd({ set: 'add10', mode: 't60', key: 'add10', timed: true, sec: 60, right: 12, rec: true, earned: 120 }), 0, () => document.querySelector('.ovl').remove()],
        ['race menu', () => raceMenu()],
        ['race play', () => race('math'), 800, () => stopRace()],
        ['streak', () => streakCal(0)],
        ['placement intro', () => placeIntro('math', 'home')],
        ['placement question', () => placeStart('math', 'home', 4242), 400, () => { PL = null; }],
        ['pet care', () => care()],
        ['game room', () => gameRoom()],
        ['setup', () => setup()],
        ['learn', () => learn('es', 0), 0, () => speechSynthesis && speechSynthesis.cancel && speechSynthesis.cancel()],
        ['balloons', () => balloons('math', { path: 'math', node: 0 }), 800, () => stopBalloons()],
        ['report', () => report()],
      ];
      const bad18 = [];
      for (const [w, h] of [[380, 780], [600, 960]]) {
        const ga = await openApp(browser, { fixture: 'midway', width: w, height: h });
        const gp = ga.page;
        for (const [name, fn, wait, after] of screens) {
          await gp.evaluate('(' + fn.toString() + ')()');
          await vwait(gp, wait || 300);
          await gp.waitForTimeout(450); // screen-in motion is real time (CSS)
          const out = await gp.evaluate('(' + look.toString() + ')()');
          for (const o of out) bad18.push(w + 'x' + h + ' ' + name + ': ' + o);
          if (after) await gp.evaluate('(' + after.toString() + ')()');
        }
        // drawn chrome is really there: stop icons and a drawn boss, world badges, the sprint pad without a check key, drawn hearts
        const got = await gp.evaluate(() => {
          pathMap('math');
          const r = { badges: document.querySelectorAll('.wchip .wbadge').length, chips: document.querySelectorAll('.wchip').length,
            icons: document.querySelectorAll('.node:not(.boss) svg.ic').length, nodes: document.querySelectorAll('.node:not(.boss)').length,
            boss: !!document.querySelector('.node.boss .rw-boss') };
          fluPlay('add10', 'n20');
          return r;
        });
        await vwait(gp, 800);
        got.keys = await gp.evaluate(() => { const k = [...document.querySelectorAll('.qpad .key')].map(k => k.dataset.k).join(''); stopFlu(); return k; });
        if (got.badges !== got.chips || got.icons !== got.nodes || !got.boss || got.keys !== '123456789del0') bad18.push(w + 'x' + h + ' drawn chrome: ' + JSON.stringify(got));
        await vwait(gp, 1500); // the screens' own timers (sprint ready beat, race, balloons) fire into stopped games
        network.push(...ga.network);
        for (const e of ga.errors) fail(e);
        await ga.ctx.close();
      }
      if (bad18.length) fail('P4-18 graphics pass:\n  ' + bad18.join('\n  '));
      else step('P4-18: ' + screens.length + ' redrawn screens at 380x780 and 600x960: targets 48 px, nothing outside, no sideways scroll, no broken words, no emoji chrome; map badges, stop icons, drawn boss, sprint pad');
    }

    // P2-25 Comprehension at 380x780: a 2nd grader who has done every Word Workshop stop before the new two opens the map on Read a Story
    //    (comp 3), plays a round of two stories (10 questions, passage panel above each, hint quotes the story), then Learn About It
    //    (info 1), with real taps. Stars are saved under comp3 and info1 and the old stops keep theirs.
    {
      const cp25 = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const pg = cp25.page;
      await pg.evaluate(() => {
        S.grade = 2;
        const ww = PATHS.read.worlds.findIndex(w => w.id === 'r_workshop'); // every world before Word Workshop (bosses too), and its old stops
        // every Word Workshop stop before the two new ones (sight, pic, build, and the gram/vocab/sent stops merged since)
        NODES.read.forEach(n => { if (n.wi < ww || (n.wi === ww && n.sk !== 'boss' && !['comp3', 'info1'].includes(nid(n)))) S.maps.read[nid(n)] = S.maps.read[nid(n)] || 2; });
        save();
      });
      const goStop25 = async id => {
        const at = await pg.evaluate(id => { const i = NODES.read.findIndex(n => nid(n) === id); return { i, w: NODES.read[i].wi }; }, id);
        await pg.evaluate(() => { if (G) G.dead = true; home(); });
        await pg.click('.game[data-p="read"]');
        await pg.waitForSelector('.wchip.on');
        await pg.click(`.wchip[data-w="${at.w}"]`);
        await pg.waitForSelector(`.wchip.on[data-w="${at.w}"]`);
        await pg.click(`.node[data-n="${at.i}"]`);
        await pg.waitForSelector('#prompt');
      };
      const before25 = await pg.evaluate(() => JSON.stringify({ a: S.maps.read.sight5, b: S.maps.read.build6, c: S.maps.read.comp1, d: S.maps.read.comp2 }));
      const cur25 = await pg.evaluate(() => nid(NODES.read[curNode('read')]));
      if (cur25 !== 'comp3') fail('P2-25: the map should open on comp3 for a child who did the old Word Workshop stops, got ' + cur25);
      for (const [id, sk, lv] of [['comp3', 'comp', 3], ['info1', 'info', 1]]) {
        await goStop25(id);
        const lay = await pg.evaluate(() => {
          const d = document.querySelector('.bctx');
          return { sk: G.sk, lv: G.lv, n: G.n, pool: G.pool.length + 1, w: document.documentElement.scrollWidth, say: !!G.q.say, panel: !!d, open: d && d.open,
            words: d ? d.querySelectorAll('.bctx-p .w').length : 0, ch: [...document.querySelectorAll('.ch')].length,
            min: Math.min(...[...document.querySelectorAll('.ch')].map(e => Math.min(e.offsetWidth, e.offsetHeight))) };
        });
        if (lay.sk !== sk || lay.lv !== lv || lay.n !== 10 || lay.pool !== 10 || lay.w > 380 || !lay.say || !lay.panel || !lay.open || lay.words < 40 || lay.ch !== 4 || lay.min < 48)
          fail('P2-25 ' + id + ' round: ' + JSON.stringify(lay));
        // the panel hides and shows, and the hint quotes the story
        await pg.click('.bctx-h');
        const hid = await pg.evaluate(() => !document.querySelector('.bctx').open);
        await pg.click('.bctx-h');
        await pg.click('#hb');
        const hint = await pg.evaluate(() => document.querySelector('#hint').textContent);
        if (!hid || !hint.trim()) fail('P2-25 ' + id + ': panel hide or hint failed: ' + hid + ' ' + hint);
        await playRound(pg, 'P2-25 ' + id, 10);
        const st = await pg.evaluate(id => S.maps.read[id] || 0, id);
        if (st < 1) fail('P2-25 ' + id + ' did not save stars');
      }
      const after25 = await pg.evaluate(() => JSON.stringify({ a: S.maps.read.sight5, b: S.maps.read.build6, c: S.maps.read.comp1, d: S.maps.read.comp2 }));
      if (before25 !== after25) fail('P2-25: old stops changed their stars: ' + before25 + ' -> ' + after25);
      else step('P2-25: Read a Story and Learn About It played with real taps (2 stories x 5 questions each, panel and hint work), stars saved, old stops untouched');
      await vwait(pg, 500);
      network.push(...cp25.network);
      for (const e of cp25.errors) fail(e);
      await cp25.ctx.close();
    }

    // P2-24 Sentences (sent 3-5) at 380x780: the three new stops sit where CURRICULUM puts them, a 2nd grader plays each round with real
    //    taps (word tiles into slots, the gap word, a picture sentence, story sentences), sizes checked (48 px or more, no sideways scroll).
    {
      const sa = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      const sp = sa.page;
      await sp.fill('#nm', 'Sent');
      await sp.click('.gr[data-g="2"]');
      await sp.click('#go');
      await sp.waitForSelector('.game[data-p="read"]');
      const where = await sp.evaluate(() => {
        const ids = PATHS.read.worlds.map(w => w.id), at = id => NODES.read.map(nid).indexOf(id);
        const inW = id => NODES.read[at(id)].wid;
        const ws = NODES.read.filter(n => n.wid === 'r_space' && n.sk !== 'boss').map(nid);
        return { s3: inW('sent3'), s4: inW('sent4'), s5: inW('sent5'), lastSpace: ws[ws.length - 1], order: at('sent4') < at('sent5'), n: ids.length };
      });
      if (where.s3 !== 'r_space' || where.s4 !== 'r_workshop' || where.s5 !== 'r_workshop' || where.lastSpace !== 'sent3' || !where.order)
        fail('Sentences stops: ' + JSON.stringify(where));
      else step('Sentences: sent 3 ends Space Station, sent 4 and 5 sit in Word Workshop');
      // every level, three questions each; level 5 until both its question types were seen
      const seenKinds = new Set();
      for (const id of ['sent3', 'sent4', 'sent5']) {
        const i = await sp.evaluate(id => NODES.read.map(nid).indexOf(id), id);
        await sp.evaluate(i => { start('read', i); }, i);
        await sp.waitForSelector('#prompt');
        await playRound(sp, 'P2-24 ' + id);
        await sp.click('#menu');
        await sp.waitForSelector('#map');
        await sp.evaluate(i => { start('read', i); }, i);
        await sp.waitForSelector('#prompt');
        const most = id === 'sent5' ? 9 : 3; // level 5 mixes two question types: play on until both were seen
        for (let k = 0; k < most; k++) {
          await vwait(sp, 500);
          const sz = await sp.evaluate(() => {
            const pts = [...document.querySelectorAll('.ch, .ot, .os, .socket')].map(e => Math.min(e.offsetWidth, e.offsetHeight)).filter(x => x > 0);
            const qa = document.querySelector('.qarea');
            return { sk: G.q.sk + G.q.lv, kind: G.q.kind, cls: G.q.cls || '', min: Math.min(...pts), wide: document.documentElement.scrollWidth,
              tall: qa.scrollHeight > qa.clientHeight + 1 };
          });
          seenKinds.add(sz.sk + sz.kind + sz.cls);
          if (sz.min < 48 || sz.wide > 380 || sz.tall) fail('Sentences stop ' + id + ': ' + JSON.stringify(sz));
          if (k === 0) {
            await sp.click('#hb');
            const hint = await sp.evaluate(() => document.querySelector('#hint').innerHTML.length);
            if (!hint) fail('Sentences stop ' + id + ': empty hint');
          }
          const both = seenKinds.has('sent5order') && seenKinds.has('sent5choicewide');
          await sp.evaluate(() => { window.__q = G.q; });
          await answer(sp);
          if (k + 1 >= (id === 'sent5' ? 3 : most) && (id !== 'sent5' || both)) break;
          await sp.waitForFunction(() => G && G.q !== window.__q, null, { timeout: 8000 });
        }
        if (id === 'sent5') for (const want of ['sent5order', 'sent5choicewide']) if (!seenKinds.has(want)) {
          // the round draws its kinds at random and review items take some places: show the missing kind directly and check it the same way
          const sz = await sp.evaluate(want => {
            for (let s = 1; s < 400; s++) { const q = genQ('sent', 5, s); if ('sent5' + q.kind + (q.cls || '') === want) { G.q = q; G.q.sk = 'sent'; G.q.lv = 5; renderQ(); break; } }
            const pts = [...document.querySelectorAll('.ch, .ot, .os, .socket')].map(e => Math.min(e.offsetWidth, e.offsetHeight)).filter(x => x > 0);
            const qa = document.querySelector('.qarea');
            return { sk: G.q.sk + G.q.lv, kind: G.q.kind, cls: G.q.cls || '', min: Math.min(...pts), wide: document.documentElement.scrollWidth,
              tall: qa.scrollHeight > qa.clientHeight + 1 };
          }, want);
          seenKinds.add(sz.sk + sz.kind + sz.cls);
          if (sz.min < 48 || sz.wide > 380 || sz.tall) fail('Sentences stop sent5 (' + want + '): ' + JSON.stringify(sz));
        }
        await sp.evaluate(() => { G.dead = true; });
        await vwait(sp, 2500); // the last answer's own timers fire into the dead round
        await sp.evaluate(() => { home(); });
        await sp.waitForSelector('.game[data-p="read"]');
      }
      for (const want of ['sent3order', 'sent4choice', 'sent5choicewide', 'sent5order'])
        if (!seenKinds.has(want)) fail('Sentences: never saw ' + want + ' (' + [...seenKinds].join(' ') + ')');
      step('Sentences: unscramble, gap, picture sentence and story order played by taps at 380x780; targets 48 px, no sideways scroll, hints present');
      network.push(...sa.network);
      for (const e of sa.errors) fail(e);
      await sa.ctx.close();
    }

    // P2-21 grammar 6-9: stops by world id (gram 6-7 Dragon Library, 8 Author Island, 9 Legend Lab); at 380x780 each level's question fits (no
    //       sideways scroll, answer buttons at least 48 px, tap-a-word buttons too, quoted sentences not cut); hints teach without the answer;
    //       one full round of level 7 earns stars and no other stop's stars move
    {
      const gb = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const gq = gb.page;
      await gq.waitForSelector('.game[data-p="read"]');
      const gi2 = await gq.evaluate(() => ({
        stops: NODES.read.filter(n => n.sk == 'gram' && n.lv > 5).map(n => n.lv + '@' + n.wid).join(' '),
        before: JSON.stringify(S.maps.read),
      }));
      if (gi2.stops !== '6@r_library 7@r_library 8@r_island 9@r_legend') fail('grammar 6-9 stops on the reading map: ' + gi2.stops);
      const bad21 = [];
      for (let lv = 6; lv <= 9; lv++) {
        // the stop's own question, then (level 8) a forced tap-a-word question and a forced choice one, so every form is measured
        const forms = lv === 8 ? ['stop', 'tap', 'choice'] : ['stop'];
        for (const form of forms) {
          await gq.evaluate(([lv, form]) => {
            if (form === 'stop') { start('read', NODES.read.findIndex(n => n.sk == 'gram' && n.lv == lv)); return; }
            let q = genQ('gram', lv, 5);
            for (let i = 1; i < 400 && ((form == 'tap') !== (q.cls == 'bwords')); i++) q = genQ('gram', lv, 5 + i);
            G = newG({ sk: 'gram', lv, n: 1, pool: [q] }); next();
          }, [lv, form]);
          await gq.waitForSelector('#prompt .bq');
          const m = await gq.evaluate(() => {
            const pr = document.querySelector('#prompt'), chs = [...document.querySelectorAll('.ch')];
            return { sk: G.q.sk, lv: G.q.lv, kind: G.q.kind, tap: G.q.cls == 'bwords', n: chs.length, minH: Math.min(...chs.map(c => c.offsetHeight)),
              over: document.documentElement.scrollWidth - document.documentElement.clientWidth, pover: pr.scrollWidth - pr.clientWidth,
              cut: chs.filter(c => c.scrollWidth > c.clientWidth + 1).length };
          });
          if (m.sk !== 'gram' || m.lv !== lv || m.kind !== 'choice' || m.n < 2 || m.n > 4 || m.minH < 48 || m.over > 0 || m.pover > 0 || m.cut || (form !== 'stop' && m.tap !== (form == 'tap')))
            bad21.push('level ' + lv + ' ' + form + ': ' + JSON.stringify(m));
          await gq.click('#hb');
          const hint = await gq.evaluate(() => ({ t: document.querySelector('#hint').textContent, ans: String(G.q.ans) }));
          if (hint.t.length < 20 || (hint.ans.length > 2 && /^[a-z']+$/i.test(hint.ans) && new RegExp('\\b' + hint.ans + '\\b', 'i').test(hint.t))) bad21.push('level ' + lv + ' hint: ' + hint.t);
          await gq.evaluate(() => { G.dead = true; home(); });
        }
      }
      if (bad21.length) fail('P2-21 grammar:\n  ' + bad21.join('\n  '));
      else step('P2-21 grammar: levels 6-9 fit at 380x780, answer buttons 48 px or more, no sideways scroll, hints teach without the answer');
      const gk = await gq.evaluate(() => NODES.read.findIndex(n => n.sk == 'gram' && n.lv == 7));
      await gq.evaluate(i => start('read', i), gk);
      await playRound(gq, 'P2-21 grammar 7');
      const gafter2 = await gq.evaluate(i => ({ st: getSt('read', i), maps: JSON.stringify(S.maps.read) }), gk);
      const gwas2 = JSON.parse(gi2.before), gnow2 = JSON.parse(gafter2.maps);
      const gmoved2 = Object.keys(gwas2).filter(k => gnow2[k] !== gwas2[k]);
      if (gafter2.st < 1 || gmoved2.length) fail('grammar 7 stars: ' + JSON.stringify({ st: gafter2.st, gmoved2 }));
      else step(`grammar 7: stop earned ${gafter2.st} stars, no other stop changed`);
      await gq.evaluate(() => { G.dead = true; home(); });
      await vwait(gq, 1500);
      network.push(...gb.network);
      for (const e of gb.errors) fail(e);
      await gb.ctx.close();
    }

    // P2-23 vocabulary B: five more stops (Dragon Library, Author Island, Legend Lab); each level's longest prompt and longest choices fit at
    //       380x780 (choices 48 px or more, no sideways scroll, nothing cut off); a 10/10 round of context clues saves stars
    {
      const vb = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const bp = vb.page;
      await bp.waitForSelector('.game[data-p="read"]');
      const bi = await bp.evaluate(() => {
        const st = NODES.read.filter(n => n.sk == 'vocab' && n.lv >= 6).map(n => n.lv + '@' + n.wid).join(' ');
        const i = NODES.read.findIndex(n => n.sk == 'vocab' && n.lv == 7);
        const before = JSON.stringify(S.maps.read);
        start('read', i);
        return { st, i, before };
      });
      if (bi.st !== '6@r_library 7@r_library 8@r_library 9@r_island 10@r_legend') fail('vocabulary B stops on the reading map: ' + bi.st);
      await bp.waitForSelector('#prompt');
      const looks = [];
      for (const lv of [6, 7, 8, 9, 10]) {
        const rs = await bp.evaluate(lv => {
          const L = BANK.vocab.map((it, i) => [it, i]).filter(([it]) => it.lv == lv);
          const pick = f => L.reduce((a, b) => (f(b[0]) > f(a[0]) ? b : a))[1];
          const out = [];
          for (const bi of [...new Set([pick(it => it.q.length), pick(it => Math.max(...[it.a, ...it.d].map(x => x.length))), pick(it => it.a.length + it.d.join('').length)])]) {
            const q = genBank('vocab', lv, { bi, s: 3 });
            G.q = q; q.sk = 'vocab'; q.lv = lv; renderQ();
            const chs = [...document.querySelectorAll('.ch')], pr = document.querySelector('#prompt');
            out.push({ lv, q: q.label, n: chs.length, minH: Math.min(...chs.map(c => c.offsetHeight)), over: document.documentElement.scrollWidth - document.documentElement.clientWidth,
              cut: chs.some(c => c.scrollWidth > c.clientWidth + 1), text: pr.textContent.length > 8 });
          }
          return out;
        }, lv);
        for (const r of rs) if (r.n !== 4 || r.minH < 48 || r.over > 0 || r.cut || !r.text) looks.push(JSON.stringify(r));
      }
      if (looks.length) fail('vocabulary B layout at 380: ' + looks.join(' '));
      else step('vocabulary B: levels 6-10 at 380x780: four choices, 48 px or more, no sideways scroll, no cut-off words');
      await bp.evaluate(i => { G.dead = true; start('read', i); }, bi.i);
      await bp.waitForSelector('#prompt');
      await bp.click('#hb');
      const hint = await bp.evaluate(() => document.querySelector('#hint').textContent);
      if (!/bold word/.test(hint)) fail('vocabulary B hint: ' + hint); else step('vocabulary B: hint shows');
      await playRound(bp, 'P2-23 vocabulary 7');
      const after = await bp.evaluate(i => ({ st: getSt('read', i), maps: JSON.stringify(S.maps.read) }), bi.i);
      const was = JSON.parse(bi.before), now = JSON.parse(after.maps);
      const moved = Object.keys(was).filter(k => now[k] !== was[k]);
      if (after.st < 1 || moved.length) fail('vocabulary B stars: ' + JSON.stringify({ st: after.st, moved }));
      else step(`vocabulary B: stop earned ${after.st} stars, no other stop changed`);
      await bp.evaluate(() => { G.dead = true; home(); });
      network.push(...vb.network);
      for (const e of vb.errors) fail(e);
      await vb.ctx.close();
    }

    // P2-08 step hints at 380x780, 600x960 and 1024x600: a Treasure Bay big5 question in a real round, and a sample of every
    //    builder (sums with 6 digits, 3 addends and decimals, subtraction across zeros, both multiplications, long division with
    //    1- and 2-digit divisors, equivalent fractions, a common bottom, text steps). Each tap on Help shows the next step (the
    //    pips move, the button reads "Next step" until the last step, then "Help"), the last step asks with a "?", the card never
    //    overflows, nothing scrolls sideways, the buttons stay 48 px; a wrong answer keeps the step on show.
    {
      const CASES8 = [
        ['big5', null],
        ['add6', "stepQ(ST.vert(['487265','358947'],'+'),'846212',stepsAdd(487265,358947),{max:7})"],
        ['add3x', "stepQ(ST.vert(['48726','3589','12047'],'+'),'64362',stepsAdd(48726,3589,12047),{max:7})"],
        ['dec', "stepQ(ST.vert(['3.4','12.75'],'+'),'16.15',stepsAdd('3.4','12.75'),{pad:'dec'})"],
        ['sub', "stepQ(ST.vert(['600400','123456'],'−'),'476944',stepsSub(600400,123456),{max:6})"],
        ['pp', "stepQ(ST.vert(['347','26'],'×'),'9022',stepsMul(347,26,'pp'))"],
        ['std', "stepQ(ST.vert(['348','26'],'×'),'9048',stepsMul(348,26,'std'),{max:6})"],
        ['div', "stepQ(ST.ldiv(7453,6,SLOT_R),'1242R1',stepsDiv(7453,6),{sep:'R'})"],
        ['div2', "stepQ(ST.ldiv(9876,43,SLOT_R),'229R29',stepsDiv(9876,43),{sep:'R'})"],
        ['equiv', "stepQ(`<div class=\"eq\">${fcFr(3,4)} = ${fcFr(SLOT,12)}</div>`,'9',stepsEquivFrac(3,4,null,12))"],
        ['cd', "stepQ(`<div class=\"eq\">${fcFr(5,12)} + ${fcFr(3,10)} = ${SLOT_FRAC}</div>`,'43/60',stepsCommonDen(5,12,3,10,'+'),{pad:'frac'})"],
        ['story', "stepQ('<div class=\"sub\">Mia has 12 shells. She finds 5 more, then gives 4 away. How many now?</div>'+SLOT,'13',stepsStory(['First find how many after 5 more.','Then take away 4. How many are left?']))"],
      ];
      const look = () => {
        const qa = document.querySelector('.qarea'), hs = document.querySelector('#hint .hs'), hb = document.querySelector('#hb');
        const small = [...document.querySelectorAll('#hb, #spk, .key')].filter(e => Math.min(e.offsetWidth, e.offsetHeight) < 47.5).map(e => e.id || e.className);
        return { at: hs ? +hs.dataset.hs : -1, pips: hs ? hs.querySelectorAll('.hs-pips i').length : 0, label: hb.textContent.trim(),
          over: qa.scrollHeight - qa.clientHeight, wide: document.documentElement.scrollWidth > innerWidth, small,
          ask: !!document.querySelector('#hint .ask') || /\?/.test(document.querySelector('#hint .hsc').textContent) };
      };
      const bad8 = [];
      let seen8 = 0;
      for (const [w, h] of [[380, 780], [600, 960], [1024, 600]]) {
        const sa = await openApp(browser, { fixture: 'midway', width: w, height: h });
        const sp = sa.page;
        for (const [name, src] of CASES8) {
          const n = await sp.evaluate(src => {
            if (G) G.dead = true;
            window.say = () => {};
            if (!src) {
              setGrade(2);
              start('math', NODES.math.findIndex(x => x.sk === 'big' && x.lv === 5));
              return G.q.hint.steps.length;
            }
            const stepQ = (html, ans, hint, o) => Object.assign({ kind: 'num', html, ans, hint, say: 'Work it out', label: 'zz:steps', sk: 'zz_demo', lv: 1 }, o || {});
            const q = eval(src);
            G = newG({ sk: 'zz_demo', n: 10, pool: [q] });
            next();
            return q.hint.steps.length;
          }, src);
          await vwait(sp, 600);
          for (let i = 0; i < n; i++) {
            await sp.click('#hb');
            await vwait(sp, 150);
            if (name === 'big5' && i === 1) {
              // a wrong answer: the same step stays on show, and the next tap goes on from it
              await sp.evaluate(() => { const v = String((+G.q.ans + 1) % 1000); for (const c of v) document.querySelector(`.k[data-k="${c}"]`).click();
                document.querySelector('.k[data-k="go"]').click(); });
              await vwait(sp, 300);
            }
            // the hint folds itself to fit a frame after it is drawn: let the card settle (up to 1.5 s real time) before measuring, so a
            // busy machine is not mistaken for a hint that does not fit (a hint that never fits still fails below)
            await sp.waitForFunction(() => { const qa = document.querySelector('.qarea'); return qa && qa.scrollHeight - qa.clientHeight <= 1; },
              null, { timeout: 1500, polling: 'raf' }).catch(() => {});
            const r = await sp.evaluate(look);
            const want = i < n - 1 ? 'Next step' : 'Help';
            const where = `${name} ${w}x${h} step ${i + 1} of ${n}`;
            if (r.at !== i || (r.pips !== n && n <= 12) || r.label !== want) bad8.push(where + ': ' + JSON.stringify(r));
            if (r.over > 1 || r.wide || r.small.length) bad8.push(where + ': does not fit ' + JSON.stringify(r));
            if (i === n - 1 && !r.ask) bad8.push(where + ': the last step does not ask');
            seen8++;
          }
          // one more tap on the last step keeps it (no error, no step past the end)
          await sp.click('#hb');
          await vwait(sp, 150);
          const end = await sp.evaluate(look);
          if (end.at !== n - 1) bad8.push(name + ' ' + w + 'x' + h + ': tap after the last step: ' + JSON.stringify(end));
        }
        await sp.evaluate(() => { G.dead = true; });
        await vwait(sp, 3000);
        network.push(...sa.network);
        for (const e of sa.errors) fail(e);
        await sa.ctx.close();
      }
      if (bad8.length) fail('P2-08 step hints:\n  ' + bad8.slice(0, 20).join('\n  '));
      else step(`P2-08: step hints for big5 and every builder at 380x780, 600x960, 1024x600: ${seen8} steps one per tap, "Next step" then "Help", the last step asks, every step fits the card with no sideways scroll; a wrong answer keeps the step`);
    }

    // P2-27 4th grade passages at 380x780: a 4th grader who has done everything before Longer Stories plays comp 5 and info 3 with real taps.
    //    The longer passages (130-180 words) must leave the question line and the choices visible beside the open panel; 10/10 saves stars.
    {
      const cp27 = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const pg = cp27.page;
      await pg.evaluate(() => {
        S.grade = 4;
        // every world before Dragon Library, and every Dragon Library stop before the two new ones (spell, gram and vocab stops)
        NODES.read.forEach(n => { if (n.wid !== 'r_library' && n.wid !== 'r_island' && n.wid !== 'r_legend' || n.wid === 'r_library' && n.sk !== 'boss' && !['comp5', 'info3'].includes(nid(n))) S.maps.read[nid(n)] = S.maps.read[nid(n)] || 2; });
        save();
      });
      for (const [id, sk, lv] of [['comp5', 'comp', 5], ['info3', 'info', 3]]) {
        const at = await pg.evaluate(id => { const i = NODES.read.findIndex(n => nid(n) === id); return { i, w: NODES.read[i].wi }; }, id);
        await pg.evaluate(() => { if (G) G.dead = true; home(); });
        await pg.click('.game[data-p="read"]');
        await pg.waitForSelector('.wchip.on');
        await pg.click(`.wchip[data-w="${at.w}"]`);
        await pg.waitForSelector(`.wchip.on[data-w="${at.w}"]`);
        await pg.click(`.node[data-n="${at.i}"]`);
        await pg.waitForSelector('#prompt');
        // every question of the round: question line and the four buttons inside the screen, panel open, no sideways scroll
        const lay = await pg.evaluate(() => {
          const r = e => e.getBoundingClientRect(), d = document.querySelector('.bctx'), pr = document.querySelector('#prompt');
          const chs = [...document.querySelectorAll('.ch')];
          return { sk: G.sk, lv: G.lv, n: G.n, w: document.documentElement.scrollWidth, open: !!(d && d.open),
            words: d ? d.querySelectorAll('.bctx-p .w').length : 0, ch: chs.length,
            min: Math.min(...chs.map(e => Math.min(e.offsetWidth, e.offsetHeight))),
            qTop: Math.round(r(pr).top), qBottom: Math.round(r(pr).bottom), qh: Math.round(r(pr).height), vh: innerHeight,
            chBottom: Math.round(Math.max(...chs.map(e => r(e).bottom))), panelH: d ? Math.round(r(d).height) : 0 };
        });
        if (lay.sk !== sk || lay.lv !== lv || lay.n !== 10 || lay.w > 380 || !lay.open || lay.words < 120 || lay.ch !== 4 || lay.min < 48 || lay.qh < 10 || lay.qTop < 0 || lay.qBottom > lay.vh || lay.chBottom > lay.vh)
          fail('P2-27 ' + id + ' first question layout: ' + JSON.stringify(lay));
        await playRound(pg, 'P2-27 ' + id, 10);
        const st = await pg.evaluate(id => S.maps.read[id] || 0, id);
        if (st < 1) fail('P2-27 ' + id + ' did not save stars');
      }
      step('P2-27: Longer Stories (comp 5) and Learn More Facts (info 3) played with real taps at 380x780: passage panel open with the question and four 48 px buttons on screen, no sideways scroll, 10/10 saved stars');
      await vwait(pg, 500);
      network.push(...cp27.network);
      for (const e of cp27.errors) fail(e);
      await cp27.ctx.close();
    }

    // P2-29 6th grade passages at 380x780: a 6th grader who has done every other stop opens Legend Lab on its two new stops (comp 7, info 5),
    //    230-300 word passages in the panel: on every one of the 10 questions the question line is visible with the panel open, the four
    //    choices are at least 48 px, nothing scrolls sideways; a 10/10 round saves stars. Shots story6-comp and story6-info are the ones to look at.
    {
      const cp29 = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const pg = cp29.page;
      await pg.evaluate(() => {
        S.grade = 6;
        NODES.read.forEach(n => { if (!/^(comp7|info5)$/.test(nid(n))) S.maps.read[nid(n)] = S.maps.read[nid(n)] || 2; });
        save();
      });
      const lw = await pg.evaluate(() => PATHS.read.worlds.findIndex(w => w.id === 'r_legend'));
      for (const [id, sk, lv] of [['comp7', 'comp', 7], ['info5', 'info', 5]]) {
        const at = await pg.evaluate(id => { const i = NODES.read.findIndex(n => nid(n) === id); return { i, w: NODES.read[i].wi }; }, id);
        await pg.evaluate(() => { if (G) G.dead = true; home(); });
        await pg.click('.game[data-p="read"]');
        await pg.waitForSelector('.wchip.on');
        await pg.click(`.wchip[data-w="${at.w}"]`);
        await pg.waitForSelector(`.wchip.on[data-w="${at.w}"]`);
        if (at.w !== lw) fail('P2-29 ' + id + ' is not in Legend Lab');
        await pg.click(`.node[data-n="${at.i}"]`);
        await pg.waitForSelector('#prompt');
        const bad = [];
        await playRound(pg, 'P2-29 ' + id, 10, async k => {
          const m = await pg.evaluate(() => {
            const pr = document.querySelector('#prompt'), r = pr.getBoundingClientRect(), d = document.querySelector('.bctx'), ch = [...document.querySelectorAll('.ch')];
            const cr = ch.map(e => e.getBoundingClientRect());
            return { sk: G.sk, lv: G.lv, top: r.top, bottom: r.bottom, h: innerHeight, w: document.documentElement.scrollWidth, open: !!d && d.open, words: d ? d.querySelectorAll('.bctx-p .w').length : 0,
              n: ch.length, min: Math.min(...ch.map(e => Math.min(e.offsetWidth, e.offsetHeight))), low: Math.max(...cr.map(c => c.bottom)) };
          });
          if (m.sk !== sk || m.lv !== lv) bad.push(`q${k}: ${m.sk}${m.lv}`);
          if (m.top < 0 || m.bottom > m.h) bad.push(`q${k}: question line not visible (${Math.round(m.top)}-${Math.round(m.bottom)} of ${m.h})`);
          if (!m.open || m.words < 200) bad.push(`q${k}: panel open ${m.open}, ${m.words} words`);
          if (m.n !== 4 || m.min < 48) bad.push(`q${k}: ${m.n} choices, smallest side ${Math.round(m.min)}`);
          if (m.w > 380) bad.push(`q${k}: sideways scroll, width ${m.w}`);
        });
        if (bad.length) fail('P2-29 ' + id + ': ' + bad.slice(0, 5).join('; '));
        const st = await pg.evaluate(id => S.maps.read[id] || 0, id);
        if (st < 1) fail('P2-29 ' + id + ' did not save stars');
      }
      step('P2-29: Legend Lab comp 7 and info 5 played at 380x780 (10 questions each): question line visible with the passage panel, buttons >= 48 px, no sideways scroll, stars saved');
      await vwait(pg, 500);
      network.push(...cp29.network);
      for (const e of cp29.errors) fail(e);
      await cp29.ctx.close();
    }

    // P2-09 Factor Factory at 380x780: a 4th grader finds the world, every stop's first question fits (no sideways scroll,
    //    number keys, choices and tick boxes at least 48 px), eight stops are played with real taps (stars saved), and the
    //    step hints of the multiplication and long division stops are tapped through (one step per tap, the last step asks).
    {
      const fa = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const fp = fa.page;
      await fp.evaluate(() => { setGrade(4); window.say = () => {}; save(); });
      const info = await fp.evaluate(() => {
        const wi = PATHS.math.worlds.findIndex(w => w.id === 'm_factory');
        return { wi, ids: PATHS.math.worlds[wi].nodes.map(n => n[0] + n[1]), open: worldOpen('math', wi), n: PATHS.math.worlds.length,
          next: (PATHS.math.worlds[wi + 1] || {}).id || '' };
      });
      const fwi = await fp.evaluate(() => PATHS.math.worlds.findIndex(w => w.id === 'm_frac'));
      if (info.ids.length !== 14 || !info.open || info.wi !== fwi + 1) fail('Factor Factory: ' + JSON.stringify(info)); // right after Fraction Forest (Decimal Desert follows it)
      const openStop = async id => {
        await fp.evaluate(() => home());
        await fp.click('.game[data-p="math"]');
        await fp.waitForSelector('.wchip.on');
        await fp.click(`.wchip[data-w="${info.wi}"]`);
        await fp.waitForSelector(`.wchip.on[data-w="${info.wi}"]`);
        const n = await fp.evaluate(id => NODES.math.findIndex(x => nid(x) === id), id);
        await fp.click(`.node[data-n="${n}"]`);
        await fp.waitForSelector('#prompt');
        await fp.waitForTimeout(900);
      };
      const lookQ = () => {
        const sm = a => Math.min(...a.map(b => Math.min(b.offsetHeight, b.offsetWidth)));
        return { sk: G.sk, lv: G.lv, w: document.documentElement.scrollWidth, keys: sm([...document.querySelectorAll('.k')]),
          ch: sm([...document.querySelectorAll('.ch, .mc')]), kind: G.q.kind };
      };
      const play = new Set(['mfact5', 'pv4', 'mbig2', 'big6', 'dbig1', 'dbig2', 'fact1', 'round3']);
      const badF = [];
      for (let k = 0; k < info.ids.length; k++) {
        const id = info.ids[k];
        // the stop before it is passed, so this one is open
        await fp.evaluate(prev => { if (prev) S.maps.math[prev] = S.maps.math[prev] || 1; save(); }, info.ids[k - 1]);
        await openStop(id);
        const lay = await fp.evaluate(lookQ);
        if (lay.sk + lay.lv !== id || lay.w > 380 || (isFinite(lay.keys) && lay.keys < 48) || (isFinite(lay.ch) && lay.ch < 48)) badF.push(id + ': ' + JSON.stringify(lay));
        if (play.has(id)) {
          await playRound(fp, 'P2-09 ' + id, 10);
          const st = await fp.evaluate(id => S.maps.math[id] || 0, id);
          if (st < 1) badF.push(id + ': no stars saved');
        }
        await fp.evaluate(() => { G.dead = true; });
      }
      // step hints: mbig4 (partial products), big7 and dbig3 (long division) - tap Help through every step
      for (const id of ['mbig4', 'dbig3', 'sub8']) {
        await openStop(id);
        const n = await fp.evaluate(() => G.q.hint.k === 'steps' ? G.q.hint.steps.length : -1);
        if (n < 2) { badF.push(id + ': hint is not steps'); continue; }
        for (let i = 0; i < n; i++) {
          await fp.click('#hb');
          await vwait(fp, 150);
          const s = await fp.evaluate(() => {
            const hs = document.querySelector('#hint .hs'), hb = document.querySelector('#hb');
            return { at: hs ? +hs.dataset.hs : -1, label: hb.textContent.trim(), wide: document.documentElement.scrollWidth > innerWidth,
              small: Math.min(hb.offsetWidth, hb.offsetHeight), ask: /\?/.test((document.querySelector('#hint .hsc') || {}).textContent || '') };
          });
          if (s.at !== i || s.wide || s.small < 47.5) badF.push(id + ' step ' + i + ': ' + JSON.stringify(s));
          if (i < n - 1 && !/Next step/i.test(s.label)) badF.push(id + ' step ' + i + ': button reads ' + s.label);
          if (i == n - 1 && !s.ask) badF.push(id + ': last step has no question mark');
        }
        await fp.evaluate(() => { G.dead = true; });
      }
      if (badF.length) fail('P2-09 Factor Factory:\n  ' + badF.slice(0, 20).join('\n  '));
      else step('P2-09: Factor Factory opens for a 4th grader (14 stops), every stop fits at 380x780 with 48 px targets, 8 stops played with taps (stars saved), step hints tapped through on mbig4, dbig3 and sub8');
      network.push(...fa.network);
      for (const e of fa.errors) fail(e);
      await fa.ctx.close();
    }

    // P2-26 Story Summit comprehension at 380x780: a 3rd grader who has done every Story Summit stop but the new two opens Read a Story 3
    //    (comp 4), then Learn About It 2 (info 2). The longer passages (up to ~120 words) must leave the question line and the four
    //    choices on screen with the passage panel open; targets 48 px; no sideways scroll; a 10/10 round saves stars under comp4 and info2.
    {
      const cp26 = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const pg = cp26.page;
      await pg.evaluate(() => {
        S.grade = 3;
        const sw = PATHS.read.worlds.findIndex(w => w.id === 'r_summit');
        NODES.read.forEach(n => { if (n.wi <= sw && nid(n) !== 'boss_r_summit' && !['comp4', 'info2'].includes(nid(n))) S.maps.read[nid(n)] = S.maps.read[nid(n)] || 2; });
        save();
      });
      const goStop26 = async id => {
        const at = await pg.evaluate(id => { const i = NODES.read.findIndex(n => nid(n) === id); return { i, w: NODES.read[i].wi }; }, id);
        await pg.evaluate(() => { if (G) G.dead = true; home(); });
        await pg.click('.game[data-p="read"]');
        await pg.waitForSelector('.wchip.on');
        await pg.click(`.wchip[data-w="${at.w}"]`);
        await pg.waitForSelector(`.wchip.on[data-w="${at.w}"]`);
        await pg.click(`.node[data-n="${at.i}"]`);
        await pg.waitForSelector('#prompt');
      };
      const before26 = await pg.evaluate(() => JSON.stringify({ a: S.maps.read.spell4, b: S.maps.read.vocab5, c: S.maps.read.comp3, d: S.maps.read.info1 }));
      const cur26 = await pg.evaluate(() => nid(NODES.read[curNode('read')]));
      if (cur26 !== 'comp4') fail('P2-26: the map should open on comp4 for a child who did the old Story Summit stops, got ' + cur26);
      const lay26 = () => pg.evaluate(() => {
        const d = document.querySelector('.bctx'), pr = document.querySelector('#prompt'), r = pr.getBoundingClientRect();
        const chs = [...document.querySelectorAll('.ch')], hb = document.querySelector('#hb').getBoundingClientRect(), first = chs.length ? chs[0].getBoundingClientRect().top : 0, last = chs.length ? chs[chs.length - 1].getBoundingClientRect() : { bottom: 9999 };
        return { w: document.documentElement.scrollWidth, panel: !!d, open: !!d && d.open, top: Math.round(r.top), bottom: Math.round(r.bottom), h: Math.round(r.height), last: Math.round(last.bottom),
          ch: chs.length, help: Math.round(hb.bottom), first: Math.round(first), min: Math.min(...chs.map(e => Math.min(e.offsetWidth, e.offsetHeight))), vh: window.innerHeight };
      });
      for (const [id, sk, lv] of [['comp4', 'comp', 4], ['info2', 'info', 2]]) {
        await goStop26(id);
        const first = await pg.evaluate(() => ({ sk: G.sk, lv: G.lv, n: G.n, pool: G.pool.length + 1 }));
        if (first.sk !== sk || first.lv !== lv || first.n !== 10 || first.pool !== 10) fail('P2-26 ' + id + ' round: ' + JSON.stringify(first));
        // every passage of the level, all five questions: panel open, question line and all four choices on screen, targets 48 px, no sideways scroll
        const ids = await pg.evaluate(([sk, lv]) => PASS[sk].map((p, bp) => [bp, p.id, p.lv]).filter(x => x[2] === lv).map(x => x.slice(0, 2)), [sk, lv]);
        for (const [bp, pid] of ids) {
          for (const qi of [0, 1, 2, 3, 4]) {
            await pg.evaluate(([sk, lv, bp, qi]) => { G.q = genPassage(sk, lv, { bp, qi, s: 5 }); G.q.sk = sk; G.q.lv = lv; renderQ(); }, [sk, lv, bp, qi]);
            const l = await lay26();
            if (l.w > 380 || !l.panel || !l.open || l.ch !== 4 || l.min < 48 || l.h < 8 || l.top < 0 || l.bottom > l.vh || l.last > l.vh || l.help > l.first + 4) fail('P2-26 ' + pid + ' q' + (qi + 1) + ': ' + JSON.stringify(l));
          }
        }
        if (ids.length !== 5) fail('P2-26 ' + id + ': ' + ids.length + ' passages checked, expected 5');
        await goStop26(id);
        await pg.click('#hb');
        const hint = await pg.evaluate(() => document.querySelector('#hint').textContent);
        if (!hint.trim()) fail('P2-26 ' + id + ': empty hint');
        await playRound(pg, 'P2-26 ' + id, 10);
        const st = await pg.evaluate(id => S.maps.read[id] || 0, id);
        if (st !== 3) fail('P2-26 ' + id + ': a 10/10 round should save 3 stars, got ' + st);
      }
      const after26 = await pg.evaluate(() => JSON.stringify({ a: S.maps.read.spell4, b: S.maps.read.vocab5, c: S.maps.read.comp3, d: S.maps.read.info1 }));
      if (before26 !== after26) fail('P2-26: old stops changed their stars: ' + before26 + ' -> ' + after26);
      else step('P2-26: Read a Story 3 and Learn About It 2 at 380x780: 10 passages x 5 questions checked with the panel open (question line and four choices on screen, targets 48 px, no sideways scroll), 10/10 rounds saved 3 stars, old stops untouched');
      await vwait(pg, 500);
      network.push(...cp26.network);
      for (const e of cp26.errors) fail(e);
      await cp26.ctx.close();
    }

    // P2-28 5th grade passages at 380x780: comp 6 and info 4 at the end of Author Island. For each stop the question line is on screen
    //    together with the open passage panel, the four choices are at least 48 px, nothing scrolls sideways, and a 10/10 round saves stars.
    {
      const cp28 = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const pg = cp28.page;
      await pg.evaluate(() => {
        S.grade = 5;
        const wi = PATHS.read.worlds.findIndex(w => w.id === 'r_island'); // every other stop up to and including Author Island is done
        NODES.read.forEach(n => { if (n.wi <= wi && !/^(comp6|info4)$/.test(nid(n))) S.maps.read[nid(n)] = S.maps.read[nid(n)] || 2; });
        save();
      });
      const goStop28 = async id => {
        const at = await pg.evaluate(id => { const i = NODES.read.findIndex(n => nid(n) === id); return { i, w: NODES.read[i].wi }; }, id);
        await pg.evaluate(() => { if (G) G.dead = true; home(); });
        await pg.click('.game[data-p="read"]');
        await pg.waitForSelector('.wchip.on');
        await pg.click(`.wchip[data-w="${at.w}"]`);
        await pg.waitForSelector(`.wchip.on[data-w="${at.w}"]`);
        await pg.click(`.node[data-n="${at.i}"]`);
        await pg.waitForSelector('#prompt');
      };
      for (const [id, sk, lv] of [['comp6', 'comp', 6], ['info4', 'info', 4]]) {
        await goStop28(id);
        // look at every question of the first passage: the question line stays on screen above the choices with the panel open
        const worst = await pg.evaluate(() => {
          const out = { n: 0, bad: [] };
          const per = G.pool.length + 1;
          for (let k = 0; k < 5; k++) {
            G.q = genPassage(G.sk, G.lv, { bp: PASS[G.sk].findIndex(x => x.lv === G.lv), qi: k, s: 5 }); G.q.sk = G.sk; G.q.lv = G.lv; renderQ();
            const pr = document.querySelector('#prompt').getBoundingClientRect(), d = document.querySelector('.bctx');
            const chs = [...document.querySelectorAll('.ch')].map(e => { const r = e.getBoundingClientRect(); return { height: e.offsetHeight, width: e.offsetWidth, left: r.left, right: r.right }; }); // offset sizes: the card is still animating in
            out.n++;
            if (!d || !d.open) out.bad.push('q' + k + ': panel not open');
            if (pr.top < 0 || pr.bottom > innerHeight || pr.height < 10) out.bad.push('q' + k + ': question line at ' + Math.round(pr.top) + '-' + Math.round(pr.bottom));
            if (chs.length !== 4 || chs.some(r => r.height < 48 || r.width < 48 || r.right > innerWidth + 1 || r.left < -1)) out.bad.push('q' + k + ': choices ' + chs.map(r => Math.round(r.width) + 'x' + Math.round(r.height)).join(' '));
            if (document.documentElement.scrollWidth > innerWidth) out.bad.push('q' + k + ': sideways scroll ' + document.documentElement.scrollWidth);
          }
          out.per = per;
          return out;
        });
        if (worst.bad.length) fail('P2-28 ' + id + ' layout: ' + worst.bad.join('; '));
        await goStop28(id); // a fresh real round
        const lay = await pg.evaluate(() => ({ sk: G.sk, lv: G.lv, n: G.n, w: document.documentElement.scrollWidth, panel: !!document.querySelector('.bctx'),
          words: document.querySelectorAll('.bctx-p .w').length }));
        if (lay.sk !== sk || lay.lv !== lv || lay.n !== 10 || lay.w > 380 || !lay.panel || lay.words < 150) fail('P2-28 ' + id + ' round: ' + JSON.stringify(lay));
        await playRound(pg, 'P2-28 ' + id, 10);
        const st = await pg.evaluate(id => S.maps.read[id] || 0, id);
        if (st < 1) fail('P2-28 ' + id + ' did not save stars');
      }
      step('P2-28: Read a Story 4 and Learn About It 4 at 380x780: question line and passage panel both on screen, buttons >= 48 px, no sideways scroll, 10/10 rounds saved stars');
      await vwait(pg, 500);
      network.push(...cp28.network);
      for (const e of cp28.errors) fail(e);
      await cp28.ctx.close();
    }

    // P2-10 Decimal Desert at 380x780: a 4th grader opens the math map on the desert (no unlock switch), plays Unlike Fractions with
    //    real taps (a step hint inside), then jumps through the other stops: an angle, a decimal, a fraction pad and the rest each show
    //    their picture, keys and choices are 48 px or more, nothing is wider than the screen, and the stars are saved.
    {
      const dd = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      const dp = dd.page;
      await dp.fill('#nm', 'Desert');
      await dp.click('.gr[data-g="4"]');
      await dp.click('#go');
      await dp.waitForSelector('.game[data-p="math"]');
      // Factor Factory (the other 4th grade world) comes first on the map: this child has finished it, so the map opens on the desert
      await dp.evaluate(() => {
        const wf = PATHS.math.worlds.findIndex(w => w.id === 'm_factory'), [a, b] = WR.math[wf];
        for (let i = a; i <= b; i++) S.maps.math[nid(NODES.math[i])] = 2;
        S.wdone = S.wdone || {}; S.wdone.m_factory = 1; save(); home();
      });
      await dp.waitForSelector('.game[data-p="math"]');
      const w10 = await dp.evaluate(() => {
        const wi = PATHS.math.worlds.findIndex(w => w.id === 'm_desert');
        return { wi, open: worldOpen('math', wi), cur: curWorld('math'), stops: PATHS.math.worlds[wi].nodes.map(n => n[0] + n[1]).join(' '), boss: NODES.math[WR.math[wi][1]].sk };
      });
      const want10 = 'frac6 frac7 fop1 frac8 fop2 dec1 dec2 ang1 ang2 geo3 shape6 meas5 pat4 story7';
      if (w10.wi < 0 || !w10.open || w10.cur !== w10.wi || w10.stops !== want10 || w10.boss !== 'boss') fail('Decimal Desert: ' + JSON.stringify(w10));
      await dp.click('.game[data-p="math"]');
      await dp.waitForSelector(`.wchip.on[data-w="${w10.wi}"]`);
      const first = await dp.evaluate(() => NODES.math.findIndex(x => nid(x) === 'frac6'));
      const nodeOn = await dp.evaluate(n => !!document.querySelector(`.node[data-n="${n}"]`) && !document.querySelector(`.node[data-n="${n}"]`).classList.contains('lock'), first);
      await dp.click(`.node[data-n="${first}"]`);
      await dp.waitForSelector('#prompt');
      await dp.waitForTimeout(900);
      // a step hint on the first question: Help shows step 1, "Next step" shows the next one (frac 6 uses the common-bottom steps when it can)
      const hs = await dp.evaluate(() => { for (let i = 0; i < 80 && !(G.q.hint && G.q.hint.k === 'steps'); i++) { G.q = genQ('frac', 6, 900 + i); renderQ(); } return G.q.hint.k; });
      if (hs !== 'steps') fail('Decimal Desert: no step hint found for frac 6');
      await dp.waitForTimeout(500);
      await dp.click('#hb');
      await vwait(dp, 300);
      const h1 = await dp.evaluate(() => ({ at: document.querySelector('#hint .hs') && document.querySelector('#hint .hs').dataset.hs, label: document.querySelector('#hb').textContent.trim(), wide: document.documentElement.scrollWidth }));
      await dp.click('#hb');
      await vwait(dp, 300);
      const h2 = await dp.evaluate(() => document.querySelector('#hint .hs').dataset.hs);
      if (h1.at !== '0' || !/Next step/.test(h1.label) || h2 !== '1' || h1.wide > 380) fail('Decimal Desert step hint: ' + JSON.stringify([h1, h2]));
      await playRound(dp, 'P2-10 frac6', 10);
      await dp.evaluate(() => { G.dead = true; });
      await vwait(dp, 2500);
      const got6 = await dp.evaluate(() => S.maps.math.frac6 || 0);
      const next6 = await dp.evaluate(() => unlocked('math', NODES.math.findIndex(x => nid(x) === 'frac7')));
      if (!nodeOn || got6 < 1 || !next6) fail('Decimal Desert: first stop open ' + nodeOn + ', stars ' + got6 + ', next stop open ' + next6);
      // the rest: a full round of an angle stop and a decimal stop, three measured questions of the others
      await dp.evaluate(() => { S.unlockAll = true; save(); });
      const full = new Set(['ang1', 'dec1']);
      const needArt = new Set(['fop2', 'ang1', 'ang2', 'geo3', 'pat4']);
      const seen10 = { dot: false, frac: false, sets: [] };
      for (const id of ['frac7', 'fop1', 'frac8', 'fop2', 'dec1', 'dec2', 'ang1', 'ang2', 'geo3', 'shape6', 'meas5', 'pat4', 'story7']) {
        await dp.evaluate(() => home());
        await dp.click('.game[data-p="math"]');
        await dp.waitForSelector('.wchip.on');
        await dp.click(`.wchip[data-w="${w10.wi}"]`);
        await dp.waitForSelector(`.wchip.on[data-w="${w10.wi}"]`);
        const n = await dp.evaluate(id => NODES.math.findIndex(x => nid(x) === id), id);
        await dp.click(`.node[data-n="${n}"]`);
        await dp.waitForSelector('#prompt');
        const most = full.has(id) ? 1 : 3;
        // the first question of the decimal stop is one that needs the decimal point key (the stop mixes fraction and decimal answers)
        if (id === 'dec1') await dp.evaluate(() => { for (let i = 1; i < 300; i++) { const q = genQ('dec', 1, i); if (q.pad === 'dec') { G.q = q; renderQ(); break; } } });
        for (let k = 0; k < most; k++) {
          await dp.waitForTimeout(900);
          const lay = await dp.evaluate(() => {
            const sm = a => (a.length ? Math.min(...a.map(b => Math.min(b.offsetHeight, b.offsetWidth))) : 99);
            const qa = document.querySelector('.qarea');
            return { sk: G.sk + G.lv, kind: G.q.kind, pad: G.q.pad || '', sep: G.q.sep || '', w: document.documentElement.scrollWidth,
              art: !!document.querySelector('#prompt svg, .ch svg'), keys: sm([...document.querySelectorAll('.k')]), ch: sm([...document.querySelectorAll('.ch')]),
              dot: !!document.querySelector('.k[data-k="."]'), tall: qa.scrollHeight > qa.clientHeight + 1 };
          });
          if (lay.sk !== id || lay.w > 380 || lay.keys < 48 || lay.ch < 48 || lay.tall || (needArt.has(id) && !lay.art)) fail('Decimal Desert stop ' + id + ': ' + JSON.stringify(lay));
          if (lay.pad === 'dec') seen10.dot = seen10.dot || lay.dot;
          if (lay.pad === 'frac' || lay.sep === 'mix') seen10.frac = true;
          if (k === 0 && (id === 'fop1' || id === 'dec2' || id === 'meas5')) {
            await dp.click('#hb');
            const hint = await dp.evaluate(() => ({ len: document.querySelector('#hint').innerHTML.length, steps: !!document.querySelector('#hint .hs') }));
            if (!hint.len || !hint.steps) fail('Decimal Desert stop ' + id + ': hint ' + JSON.stringify(hint));
          }
          if (full.has(id)) break;
          await dp.evaluate(() => { window.__q = G.q; });
          await answer(dp);
          await dp.waitForFunction(() => G && G.q !== window.__q, null, { timeout: 8000 });
        }
        if (full.has(id)) await playRound(dp, 'P2-10 ' + id, 10);
        await dp.evaluate(() => { G.dead = true; });
        await vwait(dp, 2500);
      }
      if (!seen10.dot || !seen10.frac) fail('Decimal Desert: the decimal point key or the fraction pad never showed ' + JSON.stringify(seen10));
      const starsAng = await dp.evaluate(() => ['ang1', 'dec1'].map(id => S.maps.math[id] || 0));
      if (starsAng.some(x => x < 1)) fail('Decimal Desert: stars not saved ' + JSON.stringify(starsAng));
      else step('P2-10: Decimal Desert opens for a 4th grader on its first stop; Unlike Fractions played with a step hint, an angle round and a decimal round by taps, 13 stops measured at 380x780 (48 px targets, no sideways scroll), stars saved');
      network.push(...dd.network);
      for (const e of dd.errors) fail(e);
      await dd.ctx.close();
    }

    // P3-01 Brain Teasers framework at 380x780 and 1024x600 (midway), with a fake puzzle type (tools/lib/bt-fake.js): Home card ->
    //    hub (Puzzle of the Day, type card) -> level strip (locked levels, band chips) -> play (hint tiers with a cooldown, saved
    //    state, restart sheet) -> back and Keep going resumes exactly -> win card pays stars and game time -> Next level -> Home.
    //    Every button 48 px, no sideways scroll, no emoji in the chrome, nothing outside the screen.
    {
      const fake = require('./lib/bt-fake');
      const look = () => {
        const vw = document.documentElement.clientWidth, out = [];
        for (const e of document.querySelectorAll('button, [role="button"]')) {
          const r = e.getBoundingClientRect();
          if (!r.width || r.bottom < 0 || r.top > innerHeight || e.closest('svg') || e.closest('#toast')) continue;
          if (Math.min(r.width, r.height) < 47.5) out.push('small ' + (e.id || e.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (r.left < -1 || r.right > vw + 1) out.push('outside ' + (e.id || e.className) + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
        }
        if (document.documentElement.scrollWidth > vw) out.push('sideways scroll ' + document.documentElement.scrollWidth);
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n; (n = w.nextNode());) {
          const el = n.parentElement;
          if (!el || el.closest('script,style,svg,#ico-sprite,.fk,.rw-burst') || !el.getClientRects().length) continue;
          const m = n.textContent.match(/\p{Extended_Pictographic}|[◀▶✕]/u);
          if (m) out.push('emoji chrome ' + m[0] + ' in ' + (el.id || el.className));
        }
        return out;
      };
      for (const [w, h] of [[380, 780], [1024, 600]]) {
        const tag = 'P3-01 ' + w + 'x' + h;
        const bt = await openApp(browser, { fixture: 'midway', width: w, height: h });
        const pg = bt.page, bad = [];
        const chk = async what => { for (const o of await pg.evaluate('(' + look.toString() + ')()')) bad.push(what + ': ' + o); };
        await pg.evaluate('(' + fake.install.toString() + ')()');
        await pg.evaluate(() => home());
        await pg.waitForSelector('#btcard');
        await pg.waitForTimeout(450);
        await chk('home');
        await pg.evaluate(() => document.querySelector('#btcard').scrollIntoView({ block: 'center' }));
        await pg.click('#btcard');
        await pg.waitForSelector('.bt-hub [data-t="zzfake"]');
        await pg.waitForTimeout(450);
        await chk('hub');
        const hub = await pg.evaluate(() => ({ day: !!document.querySelector('#btday'), cards: document.querySelectorAll('.bt-type').length, keep: !!document.querySelector('#btkeep'),
          title: document.querySelector('.ttl').textContent }));
        const nTypes = await pg.evaluate(() => BT.offered().length); // the fake type plus the real ones (P3-09 Patterns on)
        if (!hub.day || hub.cards !== nTypes || nTypes < 1 || hub.keep || hub.title.trim() !== 'Brain Teasers') bad.push('hub: ' + JSON.stringify(hub));
        // level strip
        await pg.click('[data-t="zzfake"]');
        await pg.waitForSelector('.bt-lvs');
        await pg.waitForTimeout(450);
        await chk('levels');
        const lv = await pg.evaluate(() => ({ n: document.querySelectorAll('.bt-lv').length, open: document.querySelectorAll('.bt-lv:not(.lock)').length,
          end: document.querySelector('#btend').disabled, band: !!document.querySelector('#btband'), say: !!document.querySelector('#btsay') }));
        if (lv.n !== 12 || lv.open !== 1 || !lv.end || !lv.band || !lv.say) bad.push('levels: ' + JSON.stringify(lv));
        await pg.click('.bt-lv[data-l="2"]', { force: true }); // locked (aria-disabled): only a toast
        await vwait(pg, 300);
        if (await pg.evaluate(() => !!document.querySelector('.bt-stage'))) bad.push('a locked level opened');
        // play level 1: hint tiers, cooldown, saved state, restart sheet
        const s0 = await pg.evaluate(() => ({ stars: S.stars, bank: pt().bank }));
        await pg.click('.bt-lv[data-l="1"]');
        await pg.waitForSelector('#btstage .fkt');
        await pg.waitForTimeout(450);
        await chk('play');
        const band = await pg.evaluate(() => S.bt.cur.band);
        const timer = await pg.evaluate(() => !!document.querySelector('#bttime'));
        if (timer !== (band === 'C' || band === 'D')) bad.push('timer shown in band ' + band + ': ' + timer);
        await pg.click('#bthint');
        const h1 = await pg.evaluate(() => ({ t: document.querySelector('.fkn').textContent, dis: document.querySelector('#bthint').disabled, pips: document.querySelectorAll('#btpips i.on').length, hints: S.bt.cur.hints }));
        if (h1.t !== 'hint 1' || !h1.dis || h1.pips !== 1 || h1.hints !== 1) bad.push('hint 1: ' + JSON.stringify(h1));
        await vwait(pg, 11500);
        if (await pg.evaluate(() => document.querySelector('#bthint').disabled)) bad.push('hint button still cooling down after 10 s');
        await pg.click('#bthint');
        if ((await pg.evaluate(() => document.querySelector('.fkn').textContent)) !== 'hint 2') bad.push('hint 2 did not run');
        // a state is saved after a tap; back keeps the puzzle; Keep going resumes it
        const lit = await pg.evaluate(() => S.bt.cur.puzzle.lit);
        await pg.click(`.fkt[data-i="${lit}"]`);
        const sv = await pg.evaluate(() => ({ taps: S.bt.cur.state.taps, puzzle: JSON.stringify(S.bt.cur.puzzle) }));
        if (sv.taps !== 1) bad.push('state not saved: ' + JSON.stringify(sv));
        await pg.click('#back');
        await pg.waitForSelector('.bt-lvs');
        await pg.click('#back');
        await pg.waitForSelector('#btkeep');
        await pg.waitForTimeout(450);
        await chk('hub with Keep going');
        await pg.click('#btkeep');
        await pg.waitForSelector('#btstage .fkt');
        const rs = await pg.evaluate(() => ({ t: document.querySelector('.fkn').textContent, puzzle: JSON.stringify(S.bt.cur.puzzle), hints: S.bt.cur.hints }));
        if (rs.t !== '1 of 3' || rs.puzzle !== sv.puzzle || rs.hints !== 2) bad.push('resume: ' + JSON.stringify(rs));
        // restart asks first
        await pg.click('#btredo');
        await pg.waitForSelector('#btyes');
        await pg.waitForTimeout(450);
        await chk('restart sheet');
        await pg.click('#btno');
        await vwait(pg, 500);
        if ((await pg.evaluate(() => document.querySelector('.fkn').textContent)) !== '1 of 3') bad.push('No on the restart sheet changed the puzzle');
        await pg.click('#btredo');
        await pg.waitForSelector('#btyes');
        await pg.waitForTimeout(450);
        await pg.click('#btyes');
        await vwait(pg, 500);
        if ((await pg.evaluate(() => document.querySelector('.fkn').textContent)) !== '0 of 3') bad.push('restart did not clear the puzzle');
        // solve it (2 hints used, so 1 star), win card
        const sol = await pg.evaluate(() => BT.get('zzfake').solve(S.bt.cur.puzzle));
        for (const i of sol) await pg.click(`.fkt[data-i="${i}"]`);
        await pg.waitForSelector('.bt-win #btnext');
        await pg.waitForTimeout(700);
        await chk('win card');
        const win = await pg.evaluate(() => ({ stars: document.querySelectorAll('.bt-win .rs.on').length, gt: document.querySelector('.gx-earn').textContent, cur: !!S.bt.cur,
          s: S.stars, bank: pt().bank }));
        if (win.stars !== 1 || win.cur || win.s < s0.stars + 1 || !/game time/.test(win.gt) || win.bank <= s0.bank) bad.push('win: ' + JSON.stringify(win) + ' from ' + JSON.stringify(s0));
        await pg.click('#btnext');
        await pg.waitForSelector('#btstage .fkt');
        if ((await pg.evaluate(() => S.bt.cur.level)) !== 2) bad.push('Next level did not open level 2');
        await pg.click('#back');
        await pg.waitForSelector('.bt-lvs');
        const open2 = await pg.evaluate(() => document.querySelectorAll('.bt-lv:not(.lock)').length);
        if (open2 !== 2) bad.push('after level 1 the strip should have 2 open levels, got ' + open2);
        await pg.click('#back');
        await pg.waitForSelector('.bt-hub');
        await pg.click('#back');
        await pg.waitForSelector('#btcard');
        await pg.waitForTimeout(450);
        await chk('home again');
        if (bad.length) fail(tag + ':\n  ' + bad.join('\n  '));
        else step(tag + ': Home card -> hub -> levels -> play (hint cooldown, saved state, Keep going, restart sheet) -> win card pays 1 star and game time -> Next level -> Home; targets 48 px, no sideways scroll, no emoji chrome');
        await vwait(pg, 300);
        network.push(...bt.network);
        for (const e of bt.errors) fail(e);
        await bt.ctx.close();
      }
    }

    // P2-11 Volcano Lab at 380x780: a 5th grader finds the world (9 stops), every stop's first question fits (no sideways scroll, number keys
    //    including the decimal point and choices at least 48 px), seven stops are played with real taps (decimal answers typed on the pad, stars
    //    saved), and the step hints of the decimal multiply, decimal divide and 3 x 2 digit stops are tapped through.
    {
      const vo = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const vp = vo.page;
      // every earlier world (Factor Factory, and Decimal Desert once it exists) is finished first, so Volcano Lab is open whatever sits before it
      await vp.evaluate(() => {
        setGrade(5); window.say = () => {};
        const vi = PATHS.math.worlds.findIndex(w => w.id === 'm_volcano');
        NODES.math.forEach(n => { if (n.wi < vi) S.maps.math[nid(n)] = S.maps.math[nid(n)] || 2; });
        PATHS.math.worlds.forEach((w, i) => { if (i < vi) S.wdone[w.id] = 1; });
        save();
      });
      const info = await vp.evaluate(() => {
        const wi = PATHS.math.worlds.findIndex(w => w.id === 'm_volcano');
        return { wi, ids: PATHS.math.worlds[wi].nodes.map(n => n[0] + n[1]), open: worldOpen('math', wi), prev: PATHS.math.worlds[wi - 1].id };
      });
      if (info.ids.length !== 9 || !info.open || info.wi < 1) fail('Volcano Lab: ' + JSON.stringify(info));
      const openStop = async id => {
        await vp.evaluate(() => { if (G) G.dead = true; home(); });
        await vp.click('.game[data-p="math"]');
        await vp.waitForSelector('.wchip.on');
        await vp.click(`.wchip[data-w="${info.wi}"]`);
        await vp.waitForSelector(`.wchip.on[data-w="${info.wi}"]`);
        const n = await vp.evaluate(id => NODES.math.findIndex(x => nid(x) === id), id);
        await vp.click(`.node[data-n="${n}"]`);
        await vp.waitForSelector('#prompt');
        await vp.waitForTimeout(900);
      };
      const lookV = () => {
        const sm = a => Math.min(...a.map(b => Math.min(b.offsetHeight, b.offsetWidth)));
        const dot = document.querySelector('.k[data-k="."]');
        return { sk: G.sk, lv: G.lv, w: document.documentElement.scrollWidth, keys: sm([...document.querySelectorAll('.k')]),
          ch: sm([...document.querySelectorAll('.ch, .mc')]), kind: G.q.kind, pad: G.q.pad || 'int', dot: dot ? Math.min(dot.offsetWidth, dot.offsetHeight) : 0 };
      };
      const playV = new Set(['pv5', 'mbig5', 'dec3', 'dbig4', 'dec4', 'round4', 'ooo1', 'dec5']);
      const badV = [];
      let typedDecimals = 0;
      for (let k = 0; k < info.ids.length; k++) {
        const id = info.ids[k];
        await vp.evaluate(prev => { if (prev) S.maps.math[prev] = S.maps.math[prev] || 1; save(); }, info.ids[k - 1]);
        await openStop(id);
        const lay = await vp.evaluate(lookV);
        if (lay.sk + lay.lv !== id || lay.w > 380 || (isFinite(lay.keys) && lay.keys < 48) || (isFinite(lay.ch) && lay.ch < 48)) badV.push(id + ': ' + JSON.stringify(lay));
        if (playV.has(id)) {
          await playRound(vp, 'P2-11 ' + id, 10, async () => {
            const q = await vp.evaluate(lookV);
            if (q.kind === 'num' && q.pad === 'dec') {
              if (q.dot < 48) badV.push(id + ': decimal point key ' + q.dot + ' px');
              if (/\./.test(await vp.evaluate(() => G.q.ans))) typedDecimals++;
            }
          });
          const st = await vp.evaluate(id => S.maps.math[id] || 0, id);
          if (st < 1) badV.push(id + ': no stars saved');
        }
        await vp.evaluate(() => { G.dead = true; });
      }
      if (typedDecimals < 20) badV.push('only ' + typedDecimals + ' decimal answers were typed on the pad');
      // step hints: dec4 (places, then whole-number multiplying), dec5 (long division), mbig5 (standard algorithm): tap Help through every step
      for (const id of ['dec4', 'dec5', 'mbig5']) {
        await openStop(id);
        const n = await vp.evaluate(() => G.q.hint.k === 'steps' ? G.q.hint.steps.length : -1);
        if (n < 2) { badV.push(id + ': hint is not steps'); continue; }
        for (let i = 0; i < n; i++) {
          await vp.click('#hb');
          await vwait(vp, 150);
          const s = await vp.evaluate(() => {
            const hs = document.querySelector('#hint .hs'), hb = document.querySelector('#hb');
            return { at: hs ? +hs.dataset.hs : -1, label: hb.textContent.trim(), wide: document.documentElement.scrollWidth > innerWidth,
              small: Math.min(hb.offsetWidth, hb.offsetHeight), ask: /\?/.test((document.querySelector('#hint .hsc') || {}).textContent || '') };
          });
          if (s.at !== i || s.wide || s.small < 47.5) badV.push(id + ' step ' + i + ': ' + JSON.stringify(s));
          if (i < n - 1 && !/Next step/i.test(s.label)) badV.push(id + ' step ' + i + ': button reads ' + s.label);
          if (i == n - 1 && !s.ask) badV.push(id + ': last step has no question mark');
        }
        await vp.evaluate(() => { G.dead = true; });
      }
      if (badV.length) fail('P2-11 Volcano Lab:\n  ' + badV.slice(0, 20).join('\n  '));
      else step('P2-11: Volcano Lab opens for a 5th grader (9 stops), every stop fits at 380x780 with 48 px targets (decimal point key too), 8 stops played with taps (' + typedDecimals + ' decimal answers typed, stars saved), step hints tapped through on dec4, dec5 and mbig5');
      network.push(...vo.network);
      for (const e of vo.errors) fail(e);
      await vo.ctx.close();
    }

    // P3-09 Patterns with real taps: band A at 380x780 (a PK child) and band D at 1024x600 (a 5th grader): Home -> Brain Teasers ->
    //    Patterns -> level 1 -> a wrong tap (amber, stays out, a mistake saved) -> hint tiers 1, 2 (words) and 3 (two choices go)
    //    with the cooldown -> every item answered by tapping -> win card (1 star after 3 hints) -> stars saved, level 2 open.
    //    Every button 48 px (choices 64), no sideways scroll, nothing outside the screen, no emoji in the chrome.
    {
      const look = () => {
        const vw = document.documentElement.clientWidth, out = [];
        for (const e of document.querySelectorAll('button, [role="button"]')) {
          const r = e.getBoundingClientRect();
          if (!r.width || r.bottom < 0 || r.top > innerHeight || e.closest('svg') || e.closest('#toast')) continue;
          const min = e.classList.contains('pt-ch') ? 63.5 : 47.5;
          if (Math.min(r.width, r.height) < min) out.push('small ' + (e.id || e.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (r.left < -1 || r.right > vw + 1) out.push('outside ' + (e.id || e.className) + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
        }
        if (document.documentElement.scrollWidth > vw) out.push('sideways scroll ' + document.documentElement.scrollWidth);
        const st = document.querySelector('.bt-stage');
        if (st && st.scrollWidth > st.clientWidth + 1) out.push('the puzzle scrolls sideways ' + st.scrollWidth + ' > ' + st.clientWidth);
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n; (n = w.nextNode());) {
          const el = n.parentElement;
          if (!el || el.closest('script,style,svg,#ico-sprite,.rw-burst') || !el.getClientRects().length) continue;
          const m = n.textContent.match(/\p{Extended_Pictographic}|[◀▶✕]/u);
          if (m) out.push('emoji chrome ' + m[0] + ' in ' + (el.id || el.className));
        }
        return out;
      };
      for (const [w, h, grade, band] of [[380, 780, 0, 'A'], [1024, 600, 5, 'D']]) {
        const tag = 'P3-09 ' + w + 'x' + h + ' band ' + band;
        const pa = await openApp(browser, { fixture: 'midway', width: w, height: h });
        const pg = pa.page, bad = [];
        const chk = async what => { for (const o of await pg.evaluate('(' + look.toString() + ')()')) bad.push(what + ': ' + o); };
        await pg.evaluate(g => { S.grade = g; save(); home(); }, grade);
        await pg.waitForSelector('#btcard');
        await pg.evaluate(() => document.querySelector('#btcard').scrollIntoView({ block: 'center' }));
        await pg.click('#btcard');
        await pg.waitForSelector('.bt-hub [data-t="pattern"]');
        await pg.click('.bt-hub [data-t="pattern"]');
        await pg.waitForSelector('.bt-lvs');
        await pg.click('.bt-lv[data-l="1"]');
        await pg.waitForSelector('#btstage .pt-ch');
        await pg.waitForTimeout(450);
        await chk('first item');
        const s0 = await pg.evaluate(() => ({ stars: S.stars, band: S.bt.cur.band, n: S.bt.cur.puzzle.items.length }));
        if (s0.band !== band) bad.push('played band ' + s0.band);
        const sol = await pg.evaluate(() => BT.get('pattern').solve(S.bt.cur.puzzle));
        const nch = await pg.evaluate(() => document.querySelectorAll('.pt-ch').length);
        // a wrong tap: amber with its badge, out of play, one mistake saved
        const wrong = (sol[0] + 1) % nch;
        await pg.click(`.pt-ch[data-c="${wrong}"]`);
        const wr = await pg.evaluate(i => { const b = document.querySelector(`.pt-ch[data-c="${i}"]`); return { cls: b.className, dis: b.disabled, st: S.bt.cur.state }; }, wrong);
        if (!/wrong/.test(wr.cls) || !wr.dis || wr.st.miss !== 1 || !wr.st.x.includes(wrong) || wr.st.i !== 0) bad.push('wrong tap: ' + JSON.stringify(wr));
        // hint tiers: 1 and 2 are words, 3 takes away two wrong choices; the frame's cooldown between them
        const tips = [];
        for (let t = 1; t <= 3; t++) {
          if (t > 1) await vwait(pg, 11500);
          await pg.click('#bthint');
          await pg.waitForTimeout(200);
          tips.push(await pg.evaluate(() => ({ tip: document.querySelector('.pt-tip').hidden ? '' : document.querySelector('.pt-tip').textContent.trim(),
            off: document.querySelectorAll('.pt-ch.off').length, hints: S.bt.cur.hints, h: S.bt.cur.state.h })));
          if (t == 2) { await pg.waitForTimeout(250); await chk('hint 2'); }
        }
        if (!tips[0].tip || !tips[1].tip || tips[0].tip === tips[1].tip || tips[0].hints !== 1 || tips[1].hints !== 2) bad.push('hint words: ' + JSON.stringify(tips.slice(0, 2)));
        if (tips[2].off !== Math.min(2, nch - 2) || tips[2].hints !== 3 || tips[2].h !== 3) bad.push('hint 3: ' + JSON.stringify(tips[2]) + ' of ' + nch);
        if (await pg.evaluate(a => document.querySelector(`.pt-ch[data-c="${a}"]`).disabled, sol[0])) bad.push('hint 3 took away the answer');
        await chk('hint 3');
        // answer every item by tapping its choice; the next one draws after a moment
        for (let i = 0; i < s0.n; i++) {
          await pg.waitForFunction(i => S.bt.cur && S.bt.cur.state && (S.bt.cur.state.i || 0) === i && document.querySelectorAll('.pt-dots i.on').length === i, i, { timeout: 8000 });
          await pg.waitForTimeout(200);
          if (i == 1) await chk('second item');
          const ok = await pg.evaluate(() => { const it = S.bt.cur.puzzle.items[S.bt.cur.state.i]; return { a: it.a, k: it.k }; });
          if (ok.a !== sol[i]) bad.push('item ' + i + ': solve() and the puzzle disagree');
          await pg.click(`.pt-ch[data-c="${sol[i]}"]`);
          if (i < s0.n - 1) {
            const got = await pg.evaluate(a => ({ right: document.querySelector(`.pt-ch[data-c="${a}"]`).classList.contains('right'), box: !!document.querySelector('.pt-got') || !document.querySelector('.pt-board') }), sol[i]);
            if (!got.right || !got.box) bad.push('item ' + i + ' (' + ok.k + ') right tap: ' + JSON.stringify(got));
          }
        }
        await pg.waitForSelector('.bt-win #btnext', { timeout: 8000 });
        await pg.waitForTimeout(700);
        await chk('win card');
        const win = await pg.evaluate(b => ({ shown: document.querySelectorAll('.bt-win .rs.on').length, saved: S.bt.pattern && S.bt.pattern[b] && S.bt.pattern[b].stars[0],
          lvl: S.bt.pattern && S.bt.pattern[b].lvl, cur: !!S.bt.cur, stars: S.stars }), band);
        if (win.shown !== 1 || win.saved !== 1 || win.lvl !== 2 || win.cur || win.stars !== s0.stars + 1) bad.push('win: ' + JSON.stringify(win) + ' from ' + JSON.stringify(s0));
        await pg.click('#btlvls');
        await pg.waitForSelector('.bt-lvs');
        const open = await pg.evaluate(() => document.querySelectorAll('.bt-lv:not(.lock)').length);
        if (open !== 2) bad.push('after level 1 the strip should have 2 open levels, got ' + open);
        if (bad.length) fail(tag + ':\n  ' + bad.join('\n  '));
        else step(tag + ': Home -> Brain Teasers -> Patterns -> level 1: a wrong tap, hints 1-3 with the cooldown, ' + s0.n + ' items tapped, win card with 1 star saved, level 2 open; targets 48 px (choices 64), no sideways scroll, no emoji chrome');
        await vwait(pg, 300);
        network.push(...pa.network);
        for (const e of pa.errors) fail(e);
        await pa.ctx.close();
      }
    }

    // P3-10 number puzzles (src/js/77-bt-number.js) at 380x780 (grade 3, band C) and 1024x600 (grade 5, band D), midway save:
    //    Home -> Brain Teasers -> each of Pyramids, Balance, Target -> level 1 by real taps: a wrong entry (counted; a balance tips
    //    and shows the guess), hint tiers 1 and 2 (they point and explain but fill nothing), back and Keep going resumes exactly,
    //    the rest of solve() tapped in -> win card -> stars saved. At 380x780 also band A (grade 0): a balance with one picture.
    //    Every button 48 px, no sideways scroll, no emoji in the chrome, nothing outside the screen.
    {
      const taps = require('./lib/bt-num');
      const look = () => {
        const vw = document.documentElement.clientWidth, out = [];
        for (const e of document.querySelectorAll('button, [role="button"]')) {
          const r = e.getBoundingClientRect();
          if (!r.width || r.bottom < 0 || r.top > innerHeight || e.closest('svg') || e.closest('#toast')) continue;
          if (Math.min(r.width, r.height) < 47.5) out.push('small ' + (e.id || e.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (r.left < -1 || r.right > vw + 1) out.push('outside ' + (e.id || e.className) + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
        }
        if (document.documentElement.scrollWidth > vw) out.push('sideways scroll ' + document.documentElement.scrollWidth);
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n; (n = w.nextNode());) {
          const el = n.parentElement;
          if (!el || el.closest('script,style,svg,#ico-sprite,.rw-burst') || !el.getClientRects().length) continue;
          const m = n.textContent.match(/\p{Extended_Pictographic}|[◀▶✕]/u);
          if (m) out.push('emoji chrome ' + m[0] + ' in ' + (el.id || el.className));
        }
        return out;
      };
      const st = pg => pg.evaluate(() => ({ cur: S.bt.cur && { id: S.bt.cur.id, band: S.bt.cur.band, puzzle: JSON.stringify(S.bt.cur.puzzle),
        state: JSON.stringify(S.bt.cur.state), hints: S.bt.cur.hints } }));
      // the moves still to tap: pyramid and balance skip what is filled; target plans from the tiles on screen
      const rest = pg => pg.evaluate(() => {
        const c = S.bt.cur, p = c.puzzle;
        if (c.id == 'target') {
          const T = BTN.TGT, s = JSON.parse(JSON.stringify(c.state || T.fresh(p))), out = [];
          while (!T.won(p, s)) { const x = T.next(p, s); if (!x) break; T.join(s, ...x); out.push(x); }
          return out;
        }
        const done = (c.state && c.state.done) || [];
        return BT.get(c.id).solve(p).filter(m => !done.some(d => String(d) == String(m[0])));
      });
      for (const [w, h, grade, ids] of [[380, 780, 3, ['pyramid', 'balance', 'target']], [1024, 600, 5, ['pyramid', 'balance', 'target']], [380, 780, 0, ['balance']]]) {
        const tag = 'P3-10 ' + w + 'x' + h + ' grade ' + grade;
        const app = await openApp(browser, { fixture: 'midway', width: w, height: h });
        const pg = app.page, bad = [], done = [];
        const chk = async what => { for (const o of await pg.evaluate('(' + look.toString() + ')()')) bad.push(what + ': ' + o); };
        await pg.evaluate(g => { S.grade = g; save(); home(); }, grade);
        await pg.waitForSelector('#btcard');
        await pg.evaluate(() => document.querySelector('#btcard').scrollIntoView({ block: 'center' }));
        await pg.click('#btcard');
        await pg.waitForSelector('.bt-hub .bt-type');
        await pg.waitForTimeout(450);
        await chk('hub');
        const cards = await pg.evaluate(() => [...document.querySelectorAll('.bt-type')].map(b => b.dataset.t));
        for (const id of ids) if (!cards.includes(id)) bad.push('hub has no ' + id + ' card: ' + cards);
        if (grade == 0 && (cards.includes('pyramid') || cards.includes('target'))) bad.push('band A shows pyramids or targets: ' + cards);
        for (const id of ids) {
          await pg.click(`.bt-type[data-t="${id}"]`);
          await pg.waitForSelector('.bt-lvs');
          await pg.click('.bt-lv[data-l="1"]');
          await pg.waitForSelector('#btstage .bn');
          await pg.waitForTimeout(450);
          await chk(id + ' play');
          const s0 = await st(pg), band = s0.cur.band;
          // one wrong entry
          const miss0 = await pg.evaluate(() => (S.bt.cur.state && S.bt.cur.state.miss) || 0);
          const how = await taps.wrong(pg, id);
          await vwait(pg, 300);
          if (id == 'balance') {
            const tip = await pg.evaluate(() => ({ tip: document.querySelectorAll('.bn-sc.tl, .bn-sc.tr').length, guess: document.querySelectorAll('.bn-vt.bad').length,
              arm: getComputedStyle(document.querySelector('.bn-sc.tl .bn-arm, .bn-sc.tr .bn-arm') || document.body).transform }));
            if (tip.tip !== 1 || !tip.guess || !/matrix/.test(tip.arm)) bad.push(id + ': a wrong weight should tip one scale and show the guess ' + JSON.stringify(tip));
            await chk(id + ' tipped');
          }
          if (id == 'target') await vwait(pg, 1800); // the missed joins go back by themselves
          const miss1 = await pg.evaluate(() => S.bt.cur.state.miss);
          if (miss1 !== miss0 + 1) bad.push(id + ': wrong entry (' + how + ') counted ' + (miss1 - miss0) + ' mistakes');
          // hint tiers 1 and 2: something is pointed at and said, nothing is filled
          const f0 = await pg.evaluate(() => JSON.stringify(S.bt.cur.state.done || S.bt.cur.state.hist));
          await pg.click('#bthint');
          await vwait(pg, 200);
          const t1 = await pg.evaluate(() => ({ hl: document.querySelectorAll('#btstage .hl').length, msg: document.querySelector('.bn-msg').textContent, hints: S.bt.cur.hints }));
          if (!t1.hl || !t1.msg || t1.hints !== 1) bad.push(id + ' hint 1: ' + JSON.stringify(t1));
          await vwait(pg, 11500);
          await pg.click('#bthint');
          await vwait(pg, 200);
          const t2 = await pg.evaluate(() => ({ msg: document.querySelector('.bn-msg').textContent, hints: S.bt.cur.hints, f: JSON.stringify(S.bt.cur.state.done || S.bt.cur.state.hist) }));
          if (t2.hints !== 2 || t2.f !== f0 || t2.msg == t1.msg) bad.push(id + ' hint 2 should explain and fill nothing: ' + JSON.stringify(t2));
          await chk(id + ' hint 2');
          // a right move, then back to the levels and the hub: Keep going brings the same puzzle and state back
          const r1 = await rest(pg);
          if (r1.length > 1) await taps.move(pg, id, r1[0]); // a one-answer puzzle (band A) resumes with the wrong entry and hints only
          await vwait(pg, 300);
          const mid = await st(pg);
          await pg.click('#back');
          await pg.waitForSelector('.bt-lvs');
          await pg.click('#back');
          await pg.waitForSelector('#btkeep');
          await pg.click('#btkeep');
          await pg.waitForSelector('#btstage .bn');
          const back = await st(pg);
          if (JSON.stringify(back) !== JSON.stringify(mid) || !mid.cur) bad.push(id + ': Keep going did not resume exactly');
          // the rest by taps, then the win card
          const r2 = await rest(pg);
          for (const m of r2) await taps.move(pg, id, m);
          try { await pg.waitForSelector('.bt-win #btlvls', { timeout: 8000 }); } catch (e) { bad.push(id + ': no win card after ' + JSON.stringify(r2)); continue; }
          await pg.waitForTimeout(700);
          await chk(id + ' win card');
          const saved = await pg.evaluate(([id, band]) => ({ stars: BT.rec(id, band).stars[0] || 0, lvl: BT.rec(id, band).lvl, cur: !!S.bt.cur,
            shown: document.querySelectorAll('.bt-win .rs.on').length }), [id, band]);
          if (saved.stars < 1 || saved.lvl !== 2 || saved.cur || saved.shown !== saved.stars) bad.push(id + ': stars not saved ' + JSON.stringify(saved));
          done.push(id + ' ' + band + ' (' + saved.stars + ' star' + (saved.stars > 1 ? 's' : '') + ')');
          await pg.click('#btlvls');
          await pg.waitForSelector('.bt-lvs');
          await pg.click('#back');
          await pg.waitForSelector('.bt-hub .bt-type');
        }
        if (bad.length) fail(tag + ':\n  ' + bad.join('\n  '));
        else step(tag + ': Home -> Brain Teasers -> ' + done.join(', ') + ': wrong entry counted (the balance tipped), hints 1-2 fill nothing, Keep going resumes exactly, win card, stars saved; targets 48 px, no sideways scroll, no emoji chrome');
        await vwait(pg, 300);
        network.push(...app.network);
        for (const e of app.errors) fail(e);
        await app.ctx.close();
      }
    }

    // P3-08 Mazes with real pointer input: touch at 380x780 (a 1st grader, band B), mouse at 1024x600 (a 3rd grader, band C).
    //    Home card -> hub -> Mazes -> level 1 -> drag the bear along solve()'s route (walls block, dragging back erases), hint tiers
    //    (arrow, 5 dots, dots through the next junction; never the whole way), back and Keep going resumes the trail, a tap on the
    //    trail and the arrow pad, then the rest of the route -> win card, stars saved. At 1024x600 also band D level 12 (18x18):
    //    a door stops the bear without its key, the full route wins with 3 stars, and the drawing of the board is timed at 6x throttle.
    //    Every button 48 px, no sideways scroll, no emoji in the chrome.
    {
      const look = () => {
        const vw = document.documentElement.clientWidth, out = [];
        for (const e of document.querySelectorAll('button, [role="button"]')) {
          const r = e.getBoundingClientRect();
          if (!r.width || r.bottom < 0 || r.top > innerHeight || e.closest('svg') || e.closest('#toast')) continue;
          if (Math.min(r.width, r.height) < 47.5) out.push('small ' + (e.id || e.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (r.left < -1 || r.right > vw + 1) out.push('outside ' + (e.id || e.className) + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
        }
        if (document.documentElement.scrollWidth > vw) out.push('sideways scroll ' + document.documentElement.scrollWidth);
        const cv = document.querySelector('.mz-cv');
        if (cv && cv.getBoundingClientRect().right > vw + 1) out.push('the maze is wider than the screen');
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n; (n = w.nextNode());) {
          const el = n.parentElement;
          if (!el || el.closest('script,style,svg,#ico-sprite,.rw-burst') || !el.getClientRects().length) continue;
          const m = n.textContent.match(/\p{Extended_Pictographic}|[◀▶✕]/u);
          if (m) out.push('emoji chrome ' + m[0] + ' in ' + (el.id || el.className));
        }
        return out;
      };
      // the trail a walk leaves (a step back onto the cell before erases), as the maze keeps it
      const trailOf = cells => { const t = []; for (const c of cells) { if (t.length > 1 && t[t.length - 2] === c) t.pop(); else t.push(c); } return t; };
      for (const [w, h, grade, touch] of [[380, 780, 1, true], [1024, 600, 3, false]]) {
        const tag = 'P3-08 ' + w + 'x' + h;
        const mz = await openApp(browser, { fixture: 'midway', width: w, height: h });
        const pg = mz.page, bad = [];
        const chk = async what => { for (const o of await pg.evaluate('(' + look.toString() + ')()')) bad.push(what + ': ' + o); };
        const cdp = await pg.context().newCDPSession(pg);
        if (touch) await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
        // one finger (or the mouse) goes down on the first cell's centre, moves through the others, and lifts
        const trace = async cells => {
          const pts = await pg.evaluate(cs => cs.map(c => MZ.cur.at(c)), cells);
          if (touch) {
            const tp = q => [{ x: q.x, y: q.y, radiusX: 6, radiusY: 6, id: 1 }];
            await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: tp(pts[0]) });
            for (let i = 1; i < pts.length; i++) {
              const a = pts[i - 1], b = pts[i];
              await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: tp({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }) });
              await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: tp(b) });
            }
            await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
          } else {
            await pg.mouse.move(pts[0].x, pts[0].y);
            await pg.mouse.down();
            for (const q of pts.slice(1)) await pg.mouse.move(q.x, q.y, { steps: 2 });
            await pg.mouse.up();
          }
        };
        const tapCell = async c => {
          const q = await pg.evaluate(c => MZ.cur.at(c), c);
          if (!touch) return pg.mouse.click(q.x, q.y);
          await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: q.x, y: q.y, radiusX: 6, radiusY: 6, id: 1 }] });
          await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        };
        const now = () => pg.evaluate(() => ({ head: MZ.cur.head(), t: S.bt.cur && S.bt.cur.state ? S.bt.cur.state.t : null, hint: MZ.cur.hint() }));
        await pg.evaluate(g => { S.grade = g; save(); home(); }, grade);
        await pg.waitForSelector('#btcard');
        await pg.waitForTimeout(450);
        await pg.evaluate(() => document.querySelector('#btcard').scrollIntoView({ block: 'center' }));
        await pg.click('#btcard');
        await pg.waitForSelector('.bt-hub [data-t="maze"]');
        await pg.waitForTimeout(450);
        await chk('hub');
        await pg.click('[data-t="maze"]');
        await pg.waitForSelector('.bt-lvs');
        await pg.waitForTimeout(450);
        await chk('levels');
        await pg.click('.bt-lv[data-l="1"]');
        await pg.waitForSelector('.mz-cv');
        await pg.waitForTimeout(450);
        await chk('play');
        const g0 = await pg.evaluate(() => ({ band: S.bt.cur.band, route: BT.get('maze').solve(S.bt.cur.puzzle), w: S.bt.cur.puzzle.w, cell: MZ.cur.cell(),
          board: Math.round(document.querySelector('.mz-cv').getBoundingClientRect().width) }));
        const band = g0.band, route = g0.route;
        if (band !== (grade === 1 ? 'B' : 'C')) bad.push('band ' + band + ' for grade ' + grade);
        // a drag along the first 6 cells
        await trace(route.slice(0, 7));
        let s = await now();
        if (s.head !== route[6] || JSON.stringify(s.t) !== JSON.stringify(trailOf(route.slice(0, 7)))) bad.push('drag of 6 cells: ' + JSON.stringify(s) + ' want ' + route[6]);
        // walls block: a drag from the bear to a neighbour behind a wall leaves it where it is
        const walled = await pg.evaluate(() => { const c = MZ.cur.head(), w = MZ.cur.p.w, o = MZ.cur.o[c];
          for (let d = 0; d < 4; d++) { const x = c % w + MZ.DX[d], y = Math.floor(c / w) + MZ.DY[d]; if (!(o & MZ.BIT[d]) && x >= 0 && y >= 0 && x < w && y < w) return y * w + x; } return -1; });
        if (walled >= 0) {
          await trace([route[6], walled]);
          if ((await now()).head !== route[6]) bad.push('the bear went through a wall');
        }
        // dragging back erases the trail; lifting the finger keeps the place
        await trace([route[6], route[5], route[4]]);
        s = await now();
        if (s.head !== route[4] || JSON.stringify(s.t) !== JSON.stringify(trailOf(route.slice(0, 5)))) bad.push('drag back did not erase: ' + JSON.stringify(s));
        await trace(route.slice(4, 7));
        // hints: 1 an arrow, 2 the next 5 cells of the route, 3 through the next junction; never the whole way
        await pg.click('#bthint');
        const h1 = await pg.evaluate(() => ({ on: !document.querySelector('.mz-arrow').hidden, d: document.querySelector('.mz-arrow').dataset.d, msg: document.querySelector('.mz-msg').textContent }));
        if (!h1.on || !h1.d || !/ is /.test(h1.msg)) bad.push('hint 1: ' + JSON.stringify(h1));
        await vwait(pg, 11500);
        await pg.click('#bthint');
        s = await now();
        if (s.hint.length !== 5 || s.hint.some((c, i) => c !== route[7 + i])) bad.push('hint 2: ' + JSON.stringify(s.hint) + ' route ' + JSON.stringify(route.slice(7, 12)));
        await vwait(pg, 11500);
        await pg.click('#bthint');
        s = await now();
        if (s.hint.length < 5 || s.hint.length >= route.length - 7 || s.hint.some((c, i) => c !== route[7 + i])) bad.push('hint 3: ' + s.hint.length + ' cells of ' + (route.length - 7));
        await pg.waitForTimeout(300);
        await chk('hint 3');
        // back, back, Keep going: the same maze, trail and hints
        const saved = await pg.evaluate(() => JSON.stringify([S.bt.cur.puzzle, S.bt.cur.state.t]));
        await pg.click('#back');
        await pg.waitForSelector('.bt-lvs');
        await pg.click('#back');
        await pg.waitForSelector('#btkeep');
        await pg.click('#btkeep');
        await pg.waitForSelector('.mz-cv');
        await pg.waitForTimeout(300);
        const rs = await pg.evaluate(() => ({ same: JSON.stringify([S.bt.cur.puzzle, S.bt.cur.state.t]), head: MZ.cur.head(), hints: S.bt.cur.hints }));
        if (rs.same !== saved || rs.head !== route[6] || rs.hints !== 3) bad.push('resume: ' + JSON.stringify({ head: rs.head, hints: rs.hints, same: rs.same === saved }));
        // a tap on the trail goes back to that spot; the arrow pad steps forward again
        await tapCell(route[3]);
        if ((await now()).head !== route[3]) bad.push('a tap on the trail did not go back');
        await pg.click('.mz-tog');
        await pg.waitForSelector('.mz-pad:not([hidden]) .mz-ab');
        await pg.waitForTimeout(300);
        await chk('arrow pad');
        for (let i = 3; i < 6; i++) {
          const d = await pg.evaluate(([a, b]) => { const w = MZ.cur.p.w; return b - a == 1 ? 1 : b - a == -1 ? 3 : b > a ? 2 : 0; }, [route[i], route[i + 1]]);
          await pg.click(`.mz-ab[data-d="${d}"]`);
        }
        s = await now();
        if (s.head !== route[6] || JSON.stringify(s.t) !== JSON.stringify(trailOf(route.slice(0, 7)))) bad.push('arrow pad: ' + JSON.stringify(s));
        const padSaved = await pg.evaluate(() => S.bt.maze && S.bt.maze.pad);
        if (padSaved !== 1) bad.push('the arrow pad choice was not remembered');
        await pg.click('.mz-tog');
        // into the nearest empty dead end and back: one mistake, marked on the board, the trail as it was
        const de = await pg.evaluate(() => {
          const p = MZ.cur.p, o = MZ.cur.o, b = MZ.bfs(o, p.w, MZ.cur.head()), its = MZ.items(p);
          let best = -1;
          for (let c = 0; c < o.length; c++) if (MZ.pop(o[c]) == 1 && c != p.s && c != p.g && !its.includes(c) && (best < 0 || b.dist[c] < b.dist[best])) best = c;
          const path = [];
          for (let c = best; c >= 0; c = b.prev[c]) path.push(c);
          return path.reverse();
        });
        await trace(de);
        const de1 = await pg.evaluate(() => ({ mis: S.bt.cur.state.mis, dead: S.bt.cur.state.dead, msg: document.querySelector('.mz-msg').textContent }));
        await trace(de.slice().reverse());
        s = await now();
        if (de1.mis !== 1 || de1.dead[0] !== de[de.length - 1] || !/Dead end/.test(de1.msg) || s.head !== route[6]) bad.push('dead end: ' + JSON.stringify([de1, s.head]));
        // the rest of the way, lifting the finger every 25 cells
        for (let i = 6; i < route.length - 1; i += 25) await trace(route.slice(i, Math.min(route.length, i + 26)));
        await pg.waitForSelector('.bt-win #btnext', { timeout: 8000 });
        await pg.waitForTimeout(700);
        await chk('win card');
        const win = await pg.evaluate(b => ({ stars: document.querySelectorAll('.bt-win .rs.on').length, cur: !!S.bt.cur, saved: (S.bt.maze[b].stars || [])[0] }), band);
        if (win.stars !== 1 || win.cur || win.saved !== 1) bad.push('win (3 hints = 1 star): ' + JSON.stringify(win));
        let extra = '';
        if (!touch) {
          // band D, level 12: an 18x18 maze with two keys and two doors
          await pg.click('#btlvls');
          await pg.waitForSelector('.bt-lvs');
          await pg.evaluate(() => { S.grade = 5; BT.start('maze', 'D', 12); });
          await pg.waitForSelector('.mz-cv');
          await pg.waitForTimeout(450);
          await chk('band D');
          const d0 = await pg.evaluate(() => {
            const p = MZ.cur.p, o = MZ.cur.o, b = MZ.bfs(o, p.w, p.s), way = [];
            for (let c = p.doors[0]; c >= 0; c = b.prev[c]) way.push(c);
            return { size: p.w, keys: p.keys.length, way: way.reverse(), route: BT.get('maze').solve(p), cell: MZ.cur.cell() };
          });
          if (d0.size !== 18 || d0.keys !== 2) bad.push('band D level 12: ' + d0.size + 'x' + d0.size + ', ' + d0.keys + ' keys');
          // straight to the first door without its key: the door does not let the bear in
          await trace(d0.way);
          const shut = await pg.evaluate(() => ({ head: MZ.cur.head(), msg: document.querySelector('.mz-msg').textContent }));
          if (shut.head !== d0.way[d0.way.length - 2] || !/key/.test(shut.msg)) bad.push('a door let the bear in without its key: ' + JSON.stringify(shut));
          await trace(d0.way.slice(0, -1).reverse());
          if ((await now()).head !== d0.route[0]) bad.push('band D: dragging back to the start failed');
          // the board drawing (floor, walls, trail, items) at 6x CPU throttle, second fastest of 7
          await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 });
          const times = await pg.evaluate(() => {
            const rn = window.__realNow || (() => performance.now()), t = [];
            for (let i = 0; i < 7; i++) { const a = rn(); MZ.cur.draw(); t.push(rn() - a); }
            return t.sort((a, b) => a - b);
          });
          await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
          if (times[1] >= 50) bad.push('drawing the 18x18 maze at 6x throttle: ' + times[1].toFixed(1) + ' ms (limit 50)');
          const nodes = await pg.evaluate(() => document.querySelector('#btstage').querySelectorAll('*').length);
          if (nodes > 60) bad.push('the maze stage has ' + nodes + ' elements');
          for (let i = 0; i < d0.route.length - 1; i += 40) await trace(d0.route.slice(i, Math.min(d0.route.length, i + 41)));
          await pg.waitForSelector('.bt-win #btnext', { timeout: 8000 });
          const dw = await pg.evaluate(() => ({ stars: document.querySelectorAll('.bt-win .rs.on').length, saved: (S.bt.maze.D.stars || [])[11], steps: null }));
          if (dw.stars !== 3 || dw.saved !== 3) bad.push('band D win: ' + JSON.stringify(dw));
          extra = `; band D 18x18 (cell ${d0.cell} px): a door stops the bear without its key, ${d0.route.length - 1} cells by mouse win 3 stars; ` +
            `full board draw ${times[1].toFixed(1)} ms at 6x throttle (2nd fastest of 7), ${nodes} elements in the stage`;
        }
        if (bad.length) fail(tag + ':\n  ' + bad.join('\n  '));
        else step(`${tag}: Home -> Brain Teasers -> Mazes -> band ${band} level 1 (${g0.w}x${g0.w}, board ${g0.board} px, cell ${g0.cell} px) by ${touch ? 'touch' : 'mouse'}: ` +
          `walls block, dragging back erases, hints 1-3 (never the whole way), back and Keep going resume, tap on the trail, arrow pad, a dead end counts one mistake, ` +
          `${route.length - 1}-cell route wins 1 star (3 hints) and saves it${extra}; targets 48 px, no sideways scroll, no emoji chrome`);
        network.push(...mz.network);
        for (const e of mz.errors) fail(e);
        await mz.ctx.close();
      }
    }

    // P2-12 Crystal Caves at 380x780: a 5th grader whose earlier worlds are finished opens the math map on the caves (no unlock switch), plays Unlike Denominators with a
    //    step hint and Coordinate Grid and Volume of a Box as full rounds of real taps (a point tapped on the grid, an (x, y) typed into
    //    two boxes), then jumps through the other stops. Every question measured: 48 px keys and choices, nothing wider than the screen,
    //    no word cut off by the card or a button, the picture where there should be one; and the stars are saved.
    {
      const cc = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      const cp = cc.page;
      await cp.fill('#nm', 'Caves');
      await cp.click('.gr[data-g="5"]');
      await cp.click('#go');
      await cp.waitForSelector('.game[data-p="math"]');
      // worlds before the caves (Volcano Lab sits there after merge) are finished first, so the map meets the caves without an unlock switch
      await cp.evaluate(() => {
        const wi = PATHS.math.worlds.findIndex(w => w.id === 'm_caves');
        for (let i = 0; i < wi; i++) { for (let j = WR.math[i][0]; j <= WR.math[i][1]; j++) setSt('math', j, 2); S.wdone = S.wdone || {}; S.wdone[worldId('math', i)] = 1; }
        save();
      });
      const w12 = await cp.evaluate(() => {
        const wi = PATHS.math.worlds.findIndex(w => w.id === 'm_caves');
        return { wi, open: worldOpen('math', wi), cur: curWorld('math'), stops: PATHS.math.worlds[wi].nodes.map(n => n[0] + n[1]).join(' '), boss: NODES.math[WR.math[wi][1]].sk };
      });
      const want12 = 'fop3 fop4 geo4 fop5 coord1 fop6 meas6 data4 pat5 story8';
      if (w12.wi < 0 || !w12.open || w12.cur !== w12.wi || w12.stops !== want12 || w12.boss !== 'boss') fail('Crystal Caves: ' + JSON.stringify(w12));
      await cp.click('.game[data-p="math"]');
      await cp.waitForSelector(`.wchip.on[data-w="${w12.wi}"]`);
      const lay12 = () => {
        const sm = a => (a.length ? Math.min(...a.map(b => Math.min(b.offsetHeight, b.offsetWidth))) : 99);
        const qa = document.querySelector('.qarea'), card = qa.getBoundingClientRect();
        // a word is cut when a text element of the prompt or a choice sticks out of the card, or a choice is wider than its button
        const cut = [...document.querySelectorAll('#prompt *, .choice')].filter(e => !e.closest('svg') && e.getClientRects().length).filter(e => {
          const r = e.getBoundingClientRect();
          return r.right > card.right + 1 || r.left < card.left - 1 || (e.classList.contains('choice') && e.scrollWidth > e.clientWidth + 1);
        }).map(e => e.className || e.tagName);
        const pics = document.querySelector('#prompt svg, .ch svg');
        return { sk: G.sk + G.lv, kind: G.q.kind, sep: G.q.sep || '', label: G.q.label, w: document.documentElement.scrollWidth, art: !!pics,
          keys: sm([...document.querySelectorAll('.k')]), ch: sm([...document.querySelectorAll('.ch')]), tall: qa.scrollHeight > qa.clientHeight + 1, cut: cut.slice(0, 3),
          tap: sm([...document.querySelectorAll('#prompt .vt .vh')].map(e => ({ offsetHeight: e.getBoundingClientRect().height, offsetWidth: e.getBoundingClientRect().width }))) };
      };
      const seen12 = { tap: 0, xy: 0, mix: 0, frac: 0, choice: 0, dec: 0 };
      const meas12 = async id => {
        const ok = await cp.waitForFunction(id => G && G.q && G.sk + G.lv === id, id, { timeout: 8000 }).then(() => true, () => false);
        if (!ok) { fail('Crystal Caves ' + id + ': the question on screen is ' + (await cp.evaluate(() => G && JSON.stringify([G.sk, G.lv, G.q && G.q.label])))); return { sk: id, w: 0, keys: 99, ch: 99, cut: [], tap: 99, art: true, label: '' }; }
        const lay = await cp.evaluate(lay12);
        if (lay.sk !== id || lay.w > 380 || lay.keys < 48 || lay.ch < 48 || lay.tall || lay.cut.length || lay.tap < 47.5) fail('Crystal Caves ' + id + ' (' + lay.label + '): ' + JSON.stringify(lay));
        if ((['geo4', 'coord1', 'fop6', 'data4'].includes(String(lay.label).split(' ')[0]) || /^fop5 \d+\/\d+ x \d+\/\d+$/.test(lay.label)) && !lay.art) fail('Crystal Caves ' + id + ': picture missing ' + lay.label);
        if (lay.kind === 'tap') seen12.tap++;
        if (lay.sep === 'xy') seen12.xy++;
        if (lay.sep === 'mix') seen12.mix++;
        if (lay.kind === 'choice') seen12.choice++;
        const dot = await cp.evaluate(() => !!document.querySelector('.k[data-k="."]'));
        if (dot) seen12.dec++;
        return lay;
      };
      // first stop by taps: Unlike Denominators, a step hint, then the full round
      const first = await cp.evaluate(() => NODES.math.findIndex(x => nid(x) === 'fop3'));
      await cp.click(`.node[data-n="${first}"]`);
      await cp.waitForSelector('#prompt');
      await cp.waitForTimeout(900);
      await cp.click('#hb');
      await vwait(cp, 300);
      const h1 = await cp.evaluate(() => ({ at: document.querySelector('#hint .hs') && document.querySelector('#hint .hs').dataset.hs, label: document.querySelector('#hb').textContent.trim(), wide: document.documentElement.scrollWidth,
        hb: Math.min(document.querySelector('#hb').offsetHeight, document.querySelector('#hb').offsetWidth) }));
      await cp.click('#hb');
      await vwait(cp, 300);
      const h2 = await cp.evaluate(() => document.querySelector('#hint .hs').dataset.hs);
      if (h1.at !== '0' || !/Next step/.test(h1.label) || h2 !== '1' || h1.wide > 380 || h1.hb < 48) fail('Crystal Caves step hint: ' + JSON.stringify([h1, h2]));
      await playRound(cp, 'P2-12 fop3', 10, async () => { await cp.waitForTimeout(600); await meas12('fop3'); });
      await cp.evaluate(() => { G.dead = true; });
      await vwait(cp, 2500);
      const got3 = await cp.evaluate(() => S.maps.math.fop3 || 0);
      const next3 = await cp.evaluate(() => unlocked('math', NODES.math.findIndex(x => nid(x) === 'fop4')));
      if (got3 < 1 || !next3) fail('Crystal Caves: fop3 stars ' + got3 + ', next stop open ' + next3);
      // the other stops: full rounds of Volume of a Box and Coordinate Grid, three measured questions of each of the rest
      await cp.evaluate(() => { S.unlockAll = true; save(); });
      const full = new Set(['geo4', 'coord1']);
      for (const id of ['fop4', 'geo4', 'fop5', 'coord1', 'fop6', 'meas6', 'data4', 'pat5', 'story8']) {
        await cp.evaluate(() => home());
        await cp.click('.game[data-p="math"]');
        await cp.waitForSelector('.wchip.on');
        await cp.click(`.wchip[data-w="${w12.wi}"]`);
        await cp.waitForSelector(`.wchip.on[data-w="${w12.wi}"]`);
        const n = await cp.evaluate(id => NODES.math.findIndex(x => nid(x) === id), id);
        await cp.click(`.node[data-n="${n}"]`);
        await cp.waitForSelector('#prompt');
        if (full.has(id)) {
          await playRound(cp, 'P2-12 ' + id, 10, async () => { await cp.waitForTimeout(600); await meas12(id); });
        } else {
          for (let k = 0; k < 3; k++) {
            await cp.waitForTimeout(900);
            await meas12(id);
            if (k === 0 && (id === 'fop4' || id === 'meas6')) {
              await cp.click('#hb');
              const hint = await cp.evaluate(() => ({ len: document.querySelector('#hint').innerHTML.length, steps: !!document.querySelector('#hint .hs') }));
              if (!hint.len || !hint.steps) fail('Crystal Caves stop ' + id + ': hint ' + JSON.stringify(hint));
            }
            await cp.evaluate(() => { window.__q = G.q; });
            await answer(cp);
            await cp.waitForFunction(() => G && G.q !== window.__q, null, { timeout: 8000 });
          }
        }
        await cp.evaluate(() => { G.dead = true; });
        await vwait(cp, 2500);
      }
      // one of each coordinate and volume picture, forced, measured and answered with real taps
      for (const [sk, lv, re] of [['coord', 1, '^coord1 tap'], ['coord', 1, '^coord1 read'], ['coord', 1, '^coord1 pair'], ['coord', 1, '^coord1 dist'], ['geo', 4, '^geo4 join'], ['geo', 4, '^geo4 vol 1\\d'], ['geo', 4, '^geo4 cubes 4x4'], ['fop', 5, '^fop5 \\d+/\\d+ x \\d+/\\d+$'], ['pat', 5, '^pat5 rule'], ['pat', 5, '^pat5 relc'], ['story', 8, '^story8 total']]) {
        await cp.evaluate(() => home());
        await cp.click('.game[data-p="math"]');
        await cp.waitForSelector('.wchip.on');
        await cp.click(`.wchip[data-w="${w12.wi}"]`);
        const n = await cp.evaluate(([sk, lv]) => NODES.math.findIndex(x => x.sk === sk && x.lv === lv), [sk, lv]);
        await cp.click(`.node[data-n="${n}"]`);
        await cp.waitForSelector('#prompt');
        await cp.evaluate(([sk, lv, re]) => { for (let i = 1; i < 900; i++) { const q = genQ(sk, lv, i); if (new RegExp(re).test(q.label)) { G.q = q; renderQ(); break; } } }, [sk, lv, re]);
        await cp.waitForTimeout(700);
        const lay = await meas12(sk + lv);
        if (!lay.art && sk !== 'story') fail('Crystal Caves ' + re + ': no picture');
        await cp.evaluate(() => { window.__q = G.q; });
        await answer(cp);
        await cp.waitForFunction(() => G && G.q !== window.__q, null, { timeout: 8000 });
        await cp.evaluate(() => { G.dead = true; });
        await vwait(cp, 1500);
      }
      if (!seen12.tap || !seen12.xy || !seen12.mix || !seen12.dec) fail('Crystal Caves: a tapped point, the (x, y) boxes, the mixed-number boxes or the decimal key never showed ' + JSON.stringify(seen12));
      const stars12 = await cp.evaluate(() => ['fop3', 'geo4', 'coord1'].map(id => S.maps.math[id] || 0));
      if (stars12.some(x => x < 1)) fail('Crystal Caves: stars not saved ' + JSON.stringify(stars12));
      else step('P2-12: Crystal Caves opens for a 5th grader on its first stop; Unlike Denominators with a step hint, Volume of a Box and Coordinate Grid as full rounds by real taps (a point tapped on the grid, (x, y) typed in two boxes), 10 stops measured at 380x780 (48 px targets, no cut-off words, no sideways scroll), stars saved');
      network.push(...cc.network);
      for (const e of cc.errors) fail(e);
      await cc.ctx.close();
    }

    // P2-16 Tracing: the Tiny Town stop "Trace Numbers" played with real pointer moves made from the stroke data: touch at 380x780 for a
    //    Pre-K child (tolerance 14) and the mouse at 1024x600 for a K child (tolerance 10). The stop is opened from the map; the prompt
    //    is spoken on its own; the first glyph's first stroke is first traced backwards (a deliberate miss: the dot pulses, the
    //    arrows run, nothing turns red, no stroke is filled); Help twice on the second glyph (tier 1 the pen draws the stroke, tier 2
    //    the yellow ball and a dotted guide); a palm resting on the board while a stroke is traced is ignored (touch); every glyph is
    //    traced through its three passes, the round of 5 completes with 5/5 and the stop gets its stars. Targets 48 px or more, the
    //    board at least 240 px, no sideways scroll.
    {
      for (const [w, h, grade, touch] of [[380, 780, -1, true], [1024, 600, 0, false]]) {
        const tag = 'P2-16 ' + w + 'x' + h;
        const tr = await openApp(browser, { fixture: 'midway', width: w, height: h });
        const pg = tr.page, bad = [];
        if (touch) {
          pg.__cdp = await pg.context().newCDPSession(pg);
          await pg.__cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 2 });
        }
        // a child at this grade who has passed the other Tiny Town stops; say() is recorded
        const ti = await pg.evaluate(g => {
          S.grade = g;
          for (const n of PATHS.math.worlds[0].nodes) if (n[0] != 'trace') S.maps.math[n[0] + n[1]] = 3;
          save();
          window.__said = [];
          window.say = t => { window.__said.push(String(t)); };
          // misses per glyph (recorded when a glyph ends) and the widths of the touches that went down
          window.__trm = [];
          const f0 = TR.finish;
          TR.finish = c => { window.__trm.push(c.misses); f0(c); };
          window.__pw = [];
          document.addEventListener('pointerdown', e => window.__pw.push(Math.round(e.width || 0)), true);
          home();
          return NODES.math.findIndex(n => n.sk == 'trace' && n.lv == 1);
        }, grade);
        await pg.click('.game[data-p="math"]');
        await pg.waitForSelector('#map');
        await pg.evaluate(() => { const c = document.querySelector('.wchip[data-w="0"]'); if (c) c.click(); });
        await pg.waitForSelector(`.node[data-n="${ti}"]`);
        await pg.click(`.node[data-n="${ti}"]`);
        await pg.waitForSelector('#trb');
        const look = () => {
          const out = [], de = document.documentElement;
          if (de.scrollWidth > innerWidth) out.push('sideways scroll ' + de.scrollWidth);
          for (const e of document.querySelectorAll('#quit, #spk, #hb')) {
            const r = e.getBoundingClientRect();
            if (e.offsetWidth < 48 || e.offsetHeight < 48) out.push('#' + e.id + ' is ' + e.offsetWidth + 'x' + e.offsetHeight);
            if (r.right > innerWidth + 0.5 || r.bottom > innerHeight + 0.5) out.push('#' + e.id + ' off screen');
          }
          const b = document.querySelector('#trb').getBoundingClientRect();
          if (Math.min(b.width, b.height) < 240) out.push('board ' + Math.round(b.width) + 'x' + Math.round(b.height));
          if (b.right > innerWidth + 0.5 || b.bottom > innerHeight + 0.5) out.push('board off screen');
          if (getComputedStyle(document.querySelector('#trb')).touchAction !== 'none') out.push('board touch-action');
          return out;
        };
        const chk = async what => { for (const o of await pg.evaluate(look)) bad.push(what + ': ' + o); };
        const st0 = await pg.evaluate(() => ({ n: G.n, sk: G.sk, kind: G.q.kind, tol: TR.cur.tol, said: window.__said.slice(), say: G.q.say }));
        await vwait(pg, 700);
        const said0 = await pg.evaluate(() => window.__said.slice());
        if (st0.n !== 5 || st0.sk !== 'trace' || st0.kind !== 'trace') bad.push('round: ' + JSON.stringify(st0));
        if (st0.tol !== (grade < 0 ? 14 : 10)) bad.push('tolerance ' + st0.tol + ' at grade ' + grade);
        if (!said0.includes(st0.say)) bad.push('the prompt was not spoken on its own');
        await chk('glyph 1');
        // glyph 1: a deliberate miss first (the first stroke traced backwards)
        await pg.waitForFunction(() => TR.cur && !TR.cur.busy, null, { timeout: 8000 });
        const m0 = await pg.evaluate(() => {
          const c = TR.cur, s = c.geo.s[0], m = c.svg.getScreenCTM(), pts = [];
          for (let x = s.L; x >= 0; x -= 3) { const [a, b] = TR.at(s, x); pts.push([m.a * a + m.c * b + m.e, m.b * a + m.d * b + m.f]); }
          return pts;
        });
        await strokeMoves(pg, m0);
        const miss = await pg.evaluate(() => {
          const c = TR.cur, red = getComputedStyle(document.documentElement).getPropertyValue('--danger').trim().toLowerCase();
          const cols = [...document.querySelectorAll('#trb *')].flatMap(e => [getComputedStyle(e).stroke, getComputedStyle(e).fill]);
          const toHex = v => { const m = /rgb\((\d+), (\d+), (\d+)\)/.exec(v); return m ? '#' + m.slice(1).map(x => (+x).toString(16).padStart(2, '0')).join('') : v; };
          return { misses: c.misses, k: c.k, part: c.part, pulse: !!document.querySelector('#trs .tr-sd.on .tr-sdi.pulse'),
            arrows: document.querySelectorAll('#tra .tr-arr.go').length, red: cols.map(toHex).some(v => v.toLowerCase() === red),
            filled: document.querySelectorAll('#trd .tr-f').length, said: window.__said[window.__said.length - 1] };
        });
        if (miss.misses !== 1 || miss.k !== 0 || miss.part || !miss.pulse || !miss.arrows || miss.red || miss.filled || !/green dot|arrow/.test(miss.said))
          bad.push('the miss: ' + JSON.stringify(miss));
        await traceGlyph(pg);
        const g1 = await pg.evaluate(() => ({ stars: TR.cur ? TR.cur.stars : null, done: G.done, score: G.score, res: G.res.slice() }));
        if (g1.done !== 1 || g1.score !== 1) bad.push('glyph 1 after one miss: ' + JSON.stringify(g1));
        // glyph 2: Help twice (tier 1: the pen draws the stroke; tier 2: the ball to follow and a dotted guide), then trace it
        await pg.waitForFunction(() => G.done === 1 && !G.lock && TR.cur && G.q === TR.cur.q && !TR.cur.busy, null, { timeout: 10000 });
        await chk('glyph 2');
        await pg.click('#hb');
        await pg.waitForFunction(() => document.querySelector('#trp').style.display !== 'none', null, { timeout: 3000 }).catch(() => {});
        const h1 = await pg.evaluate(() => ({ tier: TR.cur.tier, demo: TR.cur.anim, pen: document.querySelector('#trp').style.display !== 'none',
          panel: document.querySelector('#hint').innerHTML }));
        await pg.waitForFunction(() => !TR.cur.busy, null, { timeout: 8000 });
        await pg.click('#hb');
        await pg.waitForFunction(() => document.querySelector('#trp').style.display !== 'none', null, { timeout: 3000 }).catch(() => {});
        const h2 = await pg.evaluate(() => ({ tier: TR.cur.tier, lead: TR.cur.anim, pen: document.querySelector('#trp').style.display !== 'none',
          dots: document.querySelectorAll('#trg .tr-dot, #trg .tr-band').length }));
        if (h1.tier !== 1 || h1.demo !== 'demo' || !h1.pen || h1.panel || h2.tier !== 2 || h2.lead !== 'lead' || !h2.pen || !h2.dots)
          bad.push('hints: ' + JSON.stringify({ h1, h2 }));
        await traceGlyph(pg);
        // glyph 3: with a palm on the board (touch); the rest of the round as it comes
        await pg.waitForFunction(() => G.done === 2 && !G.lock && TR.cur && G.q === TR.cur.q, null, { timeout: 10000 });
        await traceGlyph(pg, { palm: touch });
        const g3 = await pg.evaluate(() => ({ done: G.done, score: G.score }));
        if (g3.done !== 3 || g3.score !== 3) bad.push('glyph 3' + (touch ? ' with a palm' : '') + ': ' + JSON.stringify(g3));
        for (let i = 3; i < 5; i++) {
          await pg.waitForFunction(i => (G.done === i && !G.lock && TR.cur && G.q === TR.cur.q) || document.querySelector('#chest'), i, { timeout: 10000 });
          await chk('glyph ' + (i + 1));
          await traceGlyph(pg);
        }
        await pg.waitForSelector('#chest', { timeout: 10000 });
        const fin = await pg.evaluate(() => ({ score: G.score, n: G.n, stars: S.maps.math.trace1 || 0, misses: window.__trm, wide: Math.max(...window.__pw) }));
        if (fin.score !== 5 || fin.n !== 5 || fin.stars !== 3 || fin.misses.join() !== '1,0,0,0,0') bad.push('round end: ' + JSON.stringify(fin));
        if (touch && !(fin.wide > 60)) bad.push('no palm touch went down (widest ' + fin.wide + ' px)');
        await pg.click('#chest');
        await pg.waitForSelector('#btns', { state: 'visible', timeout: 10000 });
        if (bad.length) fail(tag + ':\n  ' + bad.join('\n  '));
        else step(`${tag}: Trace Numbers opened from the Tiny Town map (grade ${grade}, tolerance ${st0.tol}), prompt spoken on its own, a backwards stroke ` +
          `is a gentle miss (dot pulses, ${miss.arrows} arrows run, no red, nothing filled), Help plays the stroke then the ball to follow, ` +
          `${touch ? 'a palm on the board is ignored, ' : ''}5 glyphs x 3 passes traced by ${touch ? 'touch' : 'mouse'}, 5/5, stop saved with 3 stars; ` +
          'targets 48 px, board 240 px or more, no sideways scroll');
        network.push(...tr.network);
        for (const e of tr.errors) fail(e);
        await tr.ctx.close();
      }
    }

    // P4-06 dino, bird and sea pal on the rig, at 380x780 from a fresh save: for each pet, pick it at setup -> Home shows the drawn
    //    egg; then at a later stage Home, Pet Care, the map pet and a round's runner (cheer face after a right answer) all show the
    //    drawn pet (pet-k-<kind>), never the emoji; nothing sticks out sideways; no console errors.
    {
      const pz = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      const pg = pz.page, bad = [], seen = [];
      const PICT = '\\p{Extended_Pictographic}';
      // the drawn pet inside sel: its class, no emoji text and no .pe emoji span, its box, the page width
      const look = sel => pg.evaluate(([sel, pict]) => {
        const el = document.querySelector(sel), svg = el && el.querySelector('.pet-svg'), r = svg && svg.getBoundingClientRect();
        return { cls: svg ? svg.getAttribute('class') : null, emoji: !!el && (new RegExp(pict, 'u').test(el.textContent) || !!el.querySelector('.pe')),
          w: r ? Math.round(r.width) : 0, left: r ? r.left : 0, right: r ? r.right : 0, sw: document.documentElement.scrollWidth };
      }, [sel, PICT]);
      const want = (tag, l, k, sn) => {
        if (!l.cls || !l.cls.startsWith('pet-svg pet-k-' + k + ' pet-s-' + sn) || l.emoji || !(l.w >= 24) || l.right > 381 || l.sw > 380)
          bad.push(k + ' ' + tag + ': ' + JSON.stringify(l));
      };
      for (const [k, stars, sn] of [['dragon', 25, 'baby'], ['dino', 80, 'kid'], ['bird', 200, 'grown'], ['ocean', 350, 'grown']]) {
        await pg.evaluate(() => { if (typeof G == 'object' && G) G.dead = true; S.name = ''; S.stars = 0; S.wear = {}; home(); });
        await pg.waitForSelector(`.petopt[data-p="${k}"] .pet-svg.pet-k-${k}`);
        await pg.click(`.petopt[data-p="${k}"]`);
        await pg.fill('#nm', 'Ava');
        await pg.click('#go');
        await pg.waitForSelector('#pet .pet-svg');
        const sp = await pg.evaluate(() => S.pet);
        if (sp !== k) bad.push(k + ': setup saved pet ' + sp);
        want('home (egg)', await look('#pet'), k, 'egg');
        await pg.evaluate(st => { S.stars = st; S.care = { food: 90, clean: 90, fun: 90, t: Date.now(), gift: '' }; home(); }, stars);
        want('home', await look('#pet'), k, sn);
        await pg.click('#care');
        await pg.waitForSelector('#pet .pet-svg');
        want('pet care', await look('#pet'), k, sn);
        await pg.evaluate(() => pathMap('math'));
        await pg.waitForSelector('.mappet .pet-svg');
        want('map', await look('.mappet'), k, sn);
        await pg.evaluate(() => start('math', 0));
        await pg.waitForSelector('#runner .pet-svg');
        want('runner', await look('#runner'), k, sn);
        await answer(pg);
        const rc = await pg.evaluate(() => +getComputedStyle(document.querySelector('#runner .pf-cheer')).opacity);
        if (rc !== 1) bad.push(k + ' runner: cheer face after a right answer ' + rc);
        await pg.evaluate(() => { G.dead = true; });
        seen.push(k + ' ' + sn);
      }
      if (bad.length) fail('P4-06 pets on the rig:\n  ' + bad.join('\n  '));
      else step('P4-06: setup -> Home (egg), then Home, Pet Care, map and round runner (cheer face) show the drawn ' + seen.join(', ') + ' at 380x780; no emoji, no sideways scroll');
      network.push(...pz.network);
      for (const e of pz.errors) fail(e);
      await pz.ctx.close();
    }

    // P3-03 Sudoku (src/js/78-bt-sudoku.js) with real taps, midway save: a 4x4 (band B, a 1st grader) at 380x780 and a 9x9 (band D,
    //    a 5th grader) at 1024x600: Home -> Brain Teasers -> Sudoku -> level 1, a wrong entry shown gently (B: it bounces out with an
    //    amber line; D: the clash is tinted amber with a dashed ring and a warning mark, never red; one mistake each), hint tiers 1 and 2
    //    (they point and explain, nothing is filled), back and Keep going resumes exactly, the rest tapped in, win card, stars saved.
    //    The 9x9 also: Undo takes the clash away, Notes put a pencil mark in. Then a 9x9 at 380x780 (the zoom box: board squares 36 px
    //    or more, zoom squares 48 px, a zoom tap picks the square) and band A (animals on the pad, a wrong animal bounces, win).
    //    48 px targets (board squares of a zoomed 9x9: 36 px on a phone, 44 on a tablet, BRAIN_TEASERS 8), no sideways scroll, no emoji chrome.
    {
      const taps = require('./lib/bt-sud');
      const look = () => {
        const vw = document.documentElement.clientWidth, out = [];
        const zm = !!document.querySelector('.sd.zm'), minCell = zm ? (vw < 600 ? 35.5 : 43.5) : 47.5;
        for (const e of document.querySelectorAll('button, [role="button"]')) {
          const r = e.getBoundingClientRect();
          if (!r.width || r.bottom < 0 || r.top > innerHeight || e.closest('svg') || e.closest('#toast')) continue;
          const min = e.closest('.sd-board') ? minCell : 47.5;
          if (Math.min(r.width, r.height) < min) out.push('small ' + (e.id || e.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (r.left < -1 || r.right > vw + 1) out.push('outside ' + (e.id || e.className) + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
        }
        if (document.documentElement.scrollWidth > vw) out.push('sideways scroll ' + document.documentElement.scrollWidth);
        const stg = document.querySelector('#btstage');
        if (stg && stg.scrollWidth > stg.clientWidth + 1) out.push('the puzzle scrolls sideways');
        if (stg && document.querySelector('#btstage .sd') && stg.scrollHeight > stg.clientHeight + 1) out.push('the puzzle does not fit: ' + stg.scrollHeight + ' > ' + stg.clientHeight);
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n; (n = w.nextNode());) {
          const el = n.parentElement;
          if (!el || el.closest('script,style,svg,#ico-sprite,.rw-burst') || !el.getClientRects().length) continue;
          const m = n.textContent.match(/\p{Extended_Pictographic}|[◀▶✕]/u);
          if (m) out.push('emoji chrome ' + m[0] + ' in ' + (el.id || el.className));
        }
        return out;
      };
      const cur = pg => pg.evaluate(() => S.bt.cur && JSON.stringify({ puzzle: S.bt.cur.puzzle, state: S.bt.cur.state, hints: S.bt.cur.hints }));
      const board = pg => pg.evaluate(() => { const c = S.bt.cur; return SD.vals(c.puzzle, c.state || SD.fresh(c.puzzle)).join(''); });
      const open = async (pg, grade) => {
        await pg.evaluate(g => { S.grade = g; save(); home(); }, grade);
        await pg.waitForSelector('#btcard');
        await pg.evaluate(() => document.querySelector('#btcard').scrollIntoView({ block: 'center' }));
        await pg.click('#btcard');
        await pg.waitForSelector('.bt-hub .bt-type[data-t="sudoku"]');
        await pg.waitForTimeout(400);
        await pg.click('.bt-type[data-t="sudoku"]');
        await pg.waitForSelector('.bt-lvs');
        await pg.click('.bt-lv[data-l="1"]');
        await pg.waitForSelector('#btstage .sd');
        await pg.waitForTimeout(400);
      };
      for (const [w, h, grade, full] of [[380, 780, 1, true], [1024, 600, 5, true], [380, 780, 5, false], [380, 780, 0, false]]) {
        const tag = 'P3-03 ' + w + 'x' + h + ' grade ' + grade;
        const app = await openApp(browser, { fixture: 'midway', width: w, height: h });
        const pg = app.page, bad = [], notes = [];
        const chk = async what => { for (const o of await pg.evaluate('(' + look.toString() + ')()')) bad.push(what + ': ' + o); };
        await pg.evaluate(() => { window.say = () => {}; });
        await open(pg, grade);
        await chk('play');
        const g0 = await pg.evaluate(() => {
          const c = S.bt.cur, r = s => { const e = document.querySelector(s); return e ? Math.round(Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height)) : 0; };
          return { band: c.band, n: c.puzzle.n, cells: document.querySelectorAll('.sd-board .sd-c').length, cell: r('.sd-board .sd-c'), zoom: !document.querySelector('.sd-zoom').hidden,
            zcell: r('.sd-zoom .sd-c'), keys: [...document.querySelectorAll('.sd-pad .k')].map(k => k.dataset.k).join(' '), pics: document.querySelectorAll('.sd-pad .k svg.art').length };
        });
        const want = { 0: ['A', 4], 1: ['B', 4], 5: ['D', 9] }[grade];
        if (g0.band !== want[0] || g0.n !== want[1] || g0.cells !== g0.n * g0.n) bad.push('band ' + g0.band + ' with ' + g0.cells + ' squares, want ' + want);
        if (g0.n === 4 && g0.keys !== '1 2 3 4') bad.push('4x4 pad keys: ' + g0.keys);
        if (g0.n === 9 && g0.keys.split(' ').length !== 12) bad.push('9x9 pad keys (1-9, Erase, Notes, Undo): ' + g0.keys);
        if (grade === 0 && g0.pics !== 4) bad.push('band A pad should show 4 animal drawings, has ' + g0.pics);
        notes.push(`${g0.n}x${g0.n} band ${g0.band}, square ${g0.cell} px` + (g0.zoom ? `, zoom box ${g0.zcell} px` : ''));
        const band = g0.band;

        // a wrong entry, shown gently, one mistake
        const b0 = await board(pg);
        const wm = await taps.wrong(pg);
        const gent = await pg.evaluate(m => {
          const c = S.bt.cur, msg = document.querySelector('.sd-msg'), cf = [...document.querySelectorAll('.sd-board .sd-c.cf')];
          const sq = document.querySelector(`.sd-board .sd-c[data-c="${m[0]}"]`), bg = getComputedStyle(sq).backgroundColor, css = getComputedStyle(document.documentElement);
          const rgb = v => { const d = document.createElement('i'); d.style.color = v; document.body.appendChild(d); const x = getComputedStyle(d).color; d.remove(); return x; };
          return { miss: c.state.miss, cls: msg.className, msg: msg.textContent, cf: cf.length, warn: !!sq.querySelector('.sd-wn svg'), dashed: getComputedStyle(sq).outlineStyle,
            bg, tryTint: rgb(css.getPropertyValue('--try-tint')), red: rgb(css.getPropertyValue('--danger')), tryInk: rgb(css.getPropertyValue('--try-ink')), msgColor: getComputedStyle(msg).color };
        }, wm);
        if (!wm || gent.miss !== 1 || !/try/.test(gent.cls) || gent.msgColor !== gent.tryInk) bad.push('wrong entry ' + JSON.stringify(wm) + ': ' + JSON.stringify(gent));
        if (band === 'A' || band === 'B') {
          await vwait(pg, 900);
          if ((await board(pg)) !== b0) bad.push('a wrong symbol stayed on the board in band ' + band);
          if (!/already/.test(gent.msg)) bad.push('band ' + band + ': the line should say where the symbol already is: ' + gent.msg);
        } else {
          if (gent.cf < 2 || !gent.warn || gent.dashed !== 'dashed' || gent.bg !== gent.tryTint || gent.bg === gent.red) bad.push('the clash is not shown gently (amber tint, dashed ring, warning mark): ' + JSON.stringify(gent));
          await chk('clash');
        }
        if (full && band === 'D') {
          // Undo takes the clash away; Notes put a pencil mark in an empty square, and back out
          await pg.click('.sd-pad .k[data-k="undo"]');
          const u = await pg.evaluate(() => ({ cf: document.querySelectorAll('.sd-c.cf').length, miss: S.bt.cur.state.miss }));
          if (u.cf || (await board(pg)) !== b0 || u.miss !== 1) bad.push('Undo should take the clash away and keep the mistake: ' + JSON.stringify(u));
          const free = await pg.evaluate(() => { const c = S.bt.cur; return SD.vals(c.puzzle, c.state).indexOf(0); });
          await pg.click(`.sd-board .sd-c[data-c="${free}"]`);
          await pg.click('.sd-pad .k[data-k="notes"]');
          await pg.click('.sd-pad .k[data-k="3"]');
          await pg.click('.sd-pad .k[data-k="7"]');
          const nt = await pg.evaluate(f => ({ txt: document.querySelector(`.sd-board .sd-c[data-c="${f}"] .sd-nts`)?.textContent, m: S.bt.cur.state.m[f], on: document.querySelector('.sd-pad .k[data-k="notes"]').getAttribute('aria-pressed') }), free);
          if (nt.txt !== '37' || nt.m !== 68 || nt.on !== 'true') bad.push('notes: ' + JSON.stringify(nt));
          await pg.click('.sd-pad .k[data-k="notes"]');
          await chk('notes');
        }
        if (full) {
          // hint tiers 1 and 2: they point and explain; the board does not change
          const f0 = await board(pg);
          await pg.click('#bthint');
          await vwait(pg, 200);
          const t1 = await pg.evaluate(() => ({ hh: document.querySelectorAll('.sd-board .sd-c.hh').length, msg: document.querySelector('.sd-msg').textContent, hints: S.bt.cur.hints }));
          if (!t1.hh || !t1.msg || t1.hints !== 1) bad.push('hint 1: ' + JSON.stringify(t1));
          await vwait(pg, 11500);
          await pg.click('#bthint');
          await vwait(pg, 200);
          const t2 = await pg.evaluate(() => ({ hl: document.querySelectorAll('.sd-board .sd-c.hl').length, msg: document.querySelector('.sd-msg').textContent, hints: S.bt.cur.hints }));
          if (t2.hints !== 2 || !t2.hl || t2.msg === t1.msg || (await board(pg)) !== f0) bad.push('hint 2 should point at a square, explain and fill nothing: ' + JSON.stringify(t2));
          notes.push('hint 2: "' + t2.msg + '"');
          await chk('hint 2');
          // one right move, then back to the levels and the hub: Keep going brings back the same puzzle and state
          await taps.move(pg, (await taps.rest(pg))[0]);
          await vwait(pg, 200);
          const mid = await cur(pg);
          await pg.click('#back');
          await pg.waitForSelector('.bt-lvs');
          await pg.click('#back');
          await pg.waitForSelector('#btkeep');
          await pg.click('#btkeep');
          await pg.waitForSelector('#btstage .sd');
          if (!mid || (await cur(pg)) !== mid) bad.push('Keep going did not resume exactly');
        }
        if (grade === 5 && !full) {
          // the phone 9x9: a board tap picks the box, a zoom tap picks the square; the number goes in from the pad
          const [c, v] = (await taps.rest(pg))[0];
          await pg.click(`.sd-board .sd-c[data-c="${c}"]`);
          const zc = await pg.evaluate(c => [...document.querySelectorAll('.sd-zoom .sd-c')].map(z => +z.dataset.c).includes(c), c);
          await taps.move(pg, [c, v], { zoom: true });
          const z = await pg.evaluate(c => ({ sel: S.bt.cur.state.sel, v: SD.vals(S.bt.cur.puzzle, S.bt.cur.state)[c] }), c);
          if (!g0.zoom || g0.cell < 36 || g0.zcell < 48 || !zc || z.sel !== c || z.v !== v) bad.push('zoom box: ' + JSON.stringify({ g0, zc, z, c, v }));
          await chk('zoom');
        } else {
          // the rest by taps, then the win card with the stars saved
          for (const m of await taps.rest(pg)) await taps.move(pg, m);
          try { await pg.waitForSelector('.bt-win #btlvls', { timeout: 8000 }); } catch (e) { bad.push('no win card'); }
          await pg.waitForTimeout(700);
          await chk('win card');
          const saved = await pg.evaluate(b => ({ stars: BT.rec('sudoku', b).stars[0] || 0, lvl: BT.rec('sudoku', b).lvl, cur: !!S.bt.cur,
            shown: document.querySelectorAll('.bt-win .rs.on').length }), band);
          // two hints give 1 star; no hint and one mistake (within the allowance of 2) give 3
          if (saved.lvl !== 2 || saved.cur || saved.shown !== saved.stars || saved.stars !== (full ? 1 : 3)) bad.push('stars not saved ' + JSON.stringify(saved));
          notes.push(`won with ${saved.stars} star${saved.stars > 1 ? 's' : ''}`);
        }
        if (bad.length) fail(tag + ':\n  ' + bad.join('\n  '));
        else step(`${tag}: Home -> Brain Teasers -> Sudoku -> ${notes.join('; ')}; a wrong entry shown gently and counted` +
          (full ? ', hints 1-2 fill nothing, Keep going resumes exactly' : '') + `; targets 48 px, no sideways scroll, no emoji chrome`);
        network.push(...app.network);
        for (const e of app.errors) fail(e);
        await app.ctx.close();
      }
    }

    // P2-13 Sky City at 380x780: a 6th grader whose earlier worlds are finished opens the math map on Sky City (no unlock switch), plays Ratios and Tables
    //    with a step hint, then Ratios and Tables, Integers on a Line, Absolute Value and Integer Add & Subtract as full rounds of real taps (choices,
    //    a tapped number on the line, three numbers put in order, numbers typed with the +/- key), and jumps through the other stops (a match
    //    of fractions and percents, divided fractions). Every question measured: 48 px keys, choices, tiles and tap targets, nothing wider than the
    //    screen, no word cut off, and with a step hint open the question stays in view; and the stars are saved.
    {
      const sc = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      const sp = sc.page;
      await sp.fill('#nm', 'Sky');
      await sp.click('.gr[data-g="6"]');
      await sp.click('#go');
      await sp.waitForSelector('.game[data-p="math"]');
      // every world before Sky City is finished first, so the map meets it without an unlock switch (Galaxy Core, after it, is not needed)
      await sp.evaluate(() => {
        const wi = PATHS.math.worlds.findIndex(w => w.id === 'm_sky');
        for (let i = 0; i < wi; i++) { for (let j = WR.math[i][0]; j <= WR.math[i][1]; j++) setSt('math', j, 2); S.wdone = S.wdone || {}; S.wdone[worldId('math', i)] = 1; }
        save();
      });
      const w13 = await sp.evaluate(() => {
        const wi = PATHS.math.worlds.findIndex(w => w.id === 'm_sky');
        return { wi, open: worldOpen('math', wi), cur: curWorld('math'), after: PATHS.math.worlds[wi - 1] && PATHS.math.worlds[wi - 1].id, stops: PATHS.math.worlds[wi].nodes.map(n => n[0] + n[1]).join(' '), boss: NODES.math[WR.math[wi][1]].sk, g: PATHS.math.worlds[wi].g };
      });
      const want13 = 'ratio1 ratio2 int1 ratio3 int2 ratio4 fop7 int3';
      if (w13.wi < 1 || !w13.open || w13.cur !== w13.wi || w13.after !== 'm_caves' || w13.g !== 6 || w13.stops !== want13 || w13.boss !== 'boss') fail('Sky City: ' + JSON.stringify(w13));
      await sp.click('.game[data-p="math"]');
      await sp.waitForSelector(`.wchip.on[data-w="${w13.wi}"]`);
      const lay13 = () => {
        const sm = a => (a.length ? Math.min(...a.map(b => Math.min(b.offsetHeight, b.offsetWidth))) : 99);
        const qa = document.querySelector('.qarea'), card = qa.getBoundingClientRect();
        const cut = [...document.querySelectorAll('#prompt *, .choice')].filter(e => !e.closest('svg') && e.getClientRects().length).filter(e => {
          const r = e.getBoundingClientRect();
          return r.right > card.right + 1 || r.left < card.left - 1 || (e.classList.contains('choice') && e.scrollWidth > e.clientWidth + 1);
        }).map(e => e.className || e.tagName);
        const first = document.querySelector('#prompt').firstElementChild, ft = first ? first.getBoundingClientRect().top : card.top;
        const pics = document.querySelector('#prompt svg, .ch svg');
        const box = e => ({ offsetHeight: e.getBoundingClientRect().height, offsetWidth: e.getBoundingClientRect().width });
        return { sk: G.sk + G.lv, kind: G.q.kind, label: G.q.label, ans: String(G.q.ans), w: document.documentElement.scrollWidth, art: !!pics,
          keys: sm([...document.querySelectorAll('.k')]), ch: sm([...document.querySelectorAll('.ch')]), tall: qa.scrollHeight > qa.clientHeight + 1,
          top: ft >= card.top - 1, cut: cut.slice(0, 3), tiles: sm([...document.querySelectorAll('.ot, .mb')]),
          tap: sm([...document.querySelectorAll('#prompt .vt .vh')].map(box)), neg: !!document.querySelector('.k[data-k="neg"]'), dot: !!document.querySelector('.k[data-k="."]') };
      };
      const seen13 = { tap: 0, order: 0, match: 0, neg: 0, negTyped: 0, choice: 0, dec: 0, mix: 0, frac: 0 };
      const meas13 = async (id, hint) => {
        const ok = await sp.waitForFunction(id => G && G.q && G.sk + G.lv === id, id, { timeout: 8000 }).then(() => true, () => false);
        if (!ok) { fail('Sky City ' + id + ': the question on screen is ' + (await sp.evaluate(() => G && JSON.stringify([G.sk, G.lv, G.q && G.q.label])))); return { sk: id, w: 0, keys: 99, ch: 99, cut: [], tap: 99, art: true, label: '' }; }
        const lay = await sp.evaluate(lay13);
        if (lay.sk !== id || lay.w > 380 || lay.keys < 48 || lay.ch < 48 || lay.tiles < 48 || lay.tall || lay.cut.length || lay.tap < 47.5 || !lay.top) fail('Sky City ' + id + ' (' + lay.label + '): ' + JSON.stringify(lay));
        const l0 = String(lay.label).split(' ')[0];
        if ((['int2', 'int3'].includes(l0) || /^int1 (tap|cmp)/.test(lay.label) || /^ratio1 dots/.test(lay.label)) && !lay.art && !/^int2 opp/.test(lay.label) && !/^int3/.test(lay.label)) fail('Sky City ' + id + ': picture missing ' + lay.label);
        if (lay.kind === 'tap') seen13.tap++;
        if (lay.kind === 'order') seen13.order++;
        if (lay.kind === 'match') seen13.match++;
        if (lay.kind === 'choice') seen13.choice++;
        if (lay.neg) seen13.neg++;
        if (lay.dot) seen13.dec++;
        if (hint) {
          // step hints: the first and the last step, the question stays in view and nothing sticks out sideways
          const n = await sp.evaluate(() => G.q.hint.steps.length);
          for (let k = 0; k < n; k++) {
            await sp.click('#hb');
            await sp.waitForTimeout(450);
            const h = await sp.evaluate(() => {
              const qa = document.querySelector('.qarea').getBoundingClientRect(), f = document.querySelector('#prompt').firstElementChild;
              const hs = document.querySelector('#hint .hs');
              return { at: hs && hs.dataset.hs, w: document.documentElement.scrollWidth, top: f.getBoundingClientRect().top >= qa.top - 1, hb: Math.min(document.querySelector('#hb').offsetHeight, document.querySelector('#hb').offsetWidth),
                cut: hs ? [...hs.querySelectorAll('*')].filter(e => !e.closest('svg') && e.getBoundingClientRect().right > hs.getBoundingClientRect().right + 1).length : -1 };
            });
            if (h.at !== String(k) || h.w > 380 || !h.top || h.hb < 48 || h.cut) fail('Sky City step hint ' + id + ' ' + lay.label + ' step ' + k + ': ' + JSON.stringify(h));
          }
        }
        return lay;
      };
      const answerMatch = async () => {
        const pairs = await sp.evaluate(() => G.q.items.map((it, i) => [i, G.q.opts.findIndex(o => o.v === it.v)]));
        for (const [i, j] of pairs) {
          await sp.click(`.mb[data-s="L"][data-i="${i}"]`);
          await sp.click(`.mb[data-s="R"][data-i="${j}"]`);
        }
      };
      const answer13 = async () => (await sp.evaluate(() => G.q.kind)) === 'match' ? answerMatch() : answer(sp);
      // first stop by taps: Ratios and Tables, a step hint, then the full round
      const first = await sp.evaluate(() => NODES.math.findIndex(x => nid(x) === 'ratio1'));
      await sp.click(`.node[data-n="${first}"]`);
      await sp.waitForSelector('#prompt');
      await sp.waitForTimeout(900);
      await sp.click('#hb');
      await vwait(sp, 300);
      const h1 = await sp.evaluate(() => ({ at: document.querySelector('#hint .hs') && document.querySelector('#hint .hs').dataset.hs, label: document.querySelector('#hb').textContent.trim(), wide: document.documentElement.scrollWidth,
        hb: Math.min(document.querySelector('#hb').offsetHeight, document.querySelector('#hb').offsetWidth) }));
      await sp.click('#hb');
      await vwait(sp, 300);
      const h2 = await sp.evaluate(() => document.querySelector('#hint .hs').dataset.hs);
      if (h1.at !== '0' || !/Next step/.test(h1.label) || h2 !== '1' || h1.wide > 380 || h1.hb < 48) fail('Sky City step hint: ' + JSON.stringify([h1, h2]));
      await playRound(sp, 'P2-13 ratio1', 10, async () => { await sp.waitForTimeout(600); await meas13('ratio1'); });
      await sp.evaluate(() => { G.dead = true; });
      await vwait(sp, 2500);
      const got1 = await sp.evaluate(() => S.maps.math.ratio1 || 0);
      const next1 = await sp.evaluate(() => unlocked('math', NODES.math.findIndex(x => nid(x) === 'ratio2')));
      if (got1 < 1 || !next1) fail('Sky City: ratio1 stars ' + got1 + ', next stop open ' + next1);
      // the other stops: full rounds of the three integer stops, three measured questions of each of the rest
      await sp.evaluate(() => { S.unlockAll = true; save(); });
      const full = new Set(['int1', 'int2', 'int3']);
      for (const id of ['ratio2', 'int1', 'ratio3', 'int2', 'ratio4', 'fop7', 'int3']) {
        await sp.evaluate(() => home());
        await sp.click('.game[data-p="math"]');
        await sp.waitForSelector('.wchip.on');
        await sp.click(`.wchip[data-w="${w13.wi}"]`);
        await sp.waitForSelector(`.wchip.on[data-w="${w13.wi}"]`);
        const n = await sp.evaluate(id => NODES.math.findIndex(x => nid(x) === id), id);
        await sp.click(`.node[data-n="${n}"]`);
        await sp.waitForSelector('#prompt');
        if (full.has(id)) {
          await playRound(sp, 'P2-13 ' + id, 10, async () => { await sp.waitForTimeout(600); await meas13(id); });
        } else {
          for (let k = 0; k < 3; k++) {
            await sp.waitForTimeout(900);
            await meas13(id, k === 0 && (id === 'ratio3' || id === 'fop7'));
            await sp.evaluate(() => { window.__q = G.q; });
            await answer13();
            await sp.waitForFunction(() => G && G.q !== window.__q, null, { timeout: 8000 });
          }
        }
        await sp.evaluate(() => { G.dead = true; });
        await vwait(sp, 2500);
      }
      // one of each picture and kind, forced, measured (the step hints of two of them opened step by step) and answered with real taps; a negative
      // answer is typed with the +/- key and the box is read before the check key is tapped
      const forced = [['ratio', 1, '^ratio1 dots'], ['ratio', 1, '^ratio1 sent'], ['ratio', 1, '^ratio1 tbl'], ['ratio', 2, '^ratio2 buy'], ['ratio', 2, '^ratio2 unit'], ['ratio', 2, '^ratio2 rate'],
        ['ratio', 3, '^ratio3 whole'], ['ratio', 4, '^ratio4 match fp'], ['ratio', 4, '^ratio4 match fd'], ['ratio', 4, '^ratio4 match dp'], ['ratio', 4, '^ratio4 fd'], ['ratio', 4, '^ratio4 pf'],
        ['int', 1, '^int1 tap'], ['int', 1, '^int1 ord'], ['int', 1, '^int1 cmp'], ['int', 1, '^int1 cold'], ['int', 2, '^int2 dist -'], ['int', 2, '^int2 abs -'], ['int', 2, '^int2 opp'],
        ['int', 3, '^int3 -\\d+ \\+ \\d+$', 'hint'], ['int', 3, '^int3 \\d+ - \\d+$', 'neg'], ['int', 3, '^int3 -?\\d+ - -\\d+$'], ['fop', 7, '^fop7 \\d \\d/\\d / \\d/\\d$', 'hint'], ['fop', 7, '^fop7 \\d/\\d / \\d/\\d$']];
      for (const [sk, lv, re, flag] of forced) {
        await sp.evaluate(() => home());
        await sp.click('.game[data-p="math"]');
        await sp.waitForSelector('.wchip.on');
        await sp.click(`.wchip[data-w="${w13.wi}"]`);
        const n = await sp.evaluate(([sk, lv]) => NODES.math.findIndex(x => x.sk === sk && x.lv === lv), [sk, lv]);
        await sp.click(`.node[data-n="${n}"]`);
        await sp.waitForSelector('#prompt');
        const found = await sp.evaluate(([sk, lv, re, flag]) => {
          for (let i = 1; i < 2000; i++) { const q = genQ(sk, lv, i); if (new RegExp(re).test(q.label) && (flag !== 'neg' || String(q.ans)[0] === '-')) { G.q = q; renderQ(); return true; } }
          return false;
        }, [sk, lv, re, flag]);
        if (!found) { fail('Sky City: no question for ' + re); continue; }
        await sp.waitForTimeout(700);
        const lay = await meas13(sk + lv, flag === 'hint');
        if (flag === 'neg') {
          // the +/- key first, then the digits; the box shows the minus sign; the check key accepts it
          const ans = lay.ans;
          for (const d of ans) await sp.click(`.k[data-k="${d === '-' ? 'neg' : d}"]`);
          const shown = await sp.evaluate(() => document.querySelector('#slot').textContent);
          if (shown !== ans) fail('Sky City negative answer: the box shows ' + JSON.stringify(shown) + ', expected ' + ans);
          seen13.negTyped++;
          await sp.evaluate(() => { window.__q = G.q; });
          await sp.click('.k[data-k="go"]');
          await sp.waitForFunction(() => G && G.q !== window.__q, null, { timeout: 8000 });
        } else {
          await sp.evaluate(() => { window.__q = G.q; });
          await answer13();
          await sp.waitForFunction(() => G && G.q !== window.__q, null, { timeout: 8000 });
        }
        await sp.evaluate(() => { G.dead = true; });
        await vwait(sp, 1500);
      }
      if (!seen13.tap || !seen13.order || !seen13.match || !seen13.neg || !seen13.negTyped || !seen13.dec || !seen13.choice) fail('Sky City: a tapped number, an ordered set, a match, the +/- key, a typed negative answer, the decimal key or a choice never showed ' + JSON.stringify(seen13));
      const stars13 = await sp.evaluate(() => ['ratio1', 'int1', 'int2', 'int3'].map(id => S.maps.math[id] || 0));
      if (stars13.some(x => x < 1)) fail('Sky City: stars not saved ' + JSON.stringify(stars13));
      else step('P2-13: Sky City opens for a 6th grader on its first stop (after Crystal Caves); Ratios and Tables with a step hint, Integers on a Line, Absolute Value and Integer Add & Subtract as full rounds by real taps (a number tapped on the line, three numbers put in order, negative answers typed with the +/- key), 8 stops and 24 forced pictures measured at 380x780 (48 px targets, no cut-off words, no sideways scroll, step hints keep the question in view), stars saved ' + JSON.stringify(seen13));
      network.push(...sc.network);
      for (const e of sc.errors) fail(e);
      await sc.ctx.close();
    }

    // P3-05 MathDoku (src/js/79-bt-mdoku.js) with real taps, midway save: a 3x3 (band B, a 1st grader) at 380x780 and a 6x6 (band D
    //    level 7, a 5th grader) at 1024x600: Home -> Brain Teasers -> MathDoku -> the level, a clash shown gently (amber tint, dashed
    //    ring, warning mark, never red; one mistake) and taken back with Undo, a cage filled so it misses its number (the label turns
    //    amber with a warning mark, the line says why in words; one mistake), Notes (6x6), hint tiers 1 and 2 (they point and explain,
    //    nothing is filled), a right move, back and Keep going resumes exactly, the rest tapped in, win card, 1 star (two hints) saved.
    //    The same 6x6 again at 380x780: the phone keeps 48 px squares with no zoom box.
    //    48 px targets everywhere (board squares too), cage labels at least 14 px, no sideways scroll, the puzzle fits, no emoji chrome.
    {
      const taps = require('./lib/bt-md');
      const look = () => {
        const vw = document.documentElement.clientWidth, out = [];
        for (const e of document.querySelectorAll('button, [role="button"]')) {
          const r = e.getBoundingClientRect();
          if (!r.width || r.bottom < 0 || r.top > innerHeight || e.closest('svg') || e.closest('#toast')) continue;
          if (Math.min(r.width, r.height) < 47.5) out.push('small ' + (e.id || e.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (r.left < -1 || r.right > vw + 1) out.push('outside ' + (e.id || e.className) + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
        }
        for (const l of document.querySelectorAll('.md-lab')) if (parseFloat(getComputedStyle(l).fontSize) < 14) out.push('cage label under 14 px');
        if (document.documentElement.scrollWidth > vw) out.push('sideways scroll ' + document.documentElement.scrollWidth);
        const stg = document.querySelector('#btstage');
        if (stg && stg.scrollWidth > stg.clientWidth + 1) out.push('the puzzle scrolls sideways');
        if (stg && document.querySelector('#btstage .md') && stg.scrollHeight > stg.clientHeight + 1) out.push('the puzzle does not fit: ' + stg.scrollHeight + ' > ' + stg.clientHeight);
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n; (n = w.nextNode());) {
          const el = n.parentElement;
          if (!el || el.closest('script,style,svg,#ico-sprite,.rw-burst') || !el.getClientRects().length) continue;
          const m = n.textContent.match(/\p{Extended_Pictographic}|[◀▶✕]/u);
          if (m) out.push('emoji chrome ' + m[0] + ' in ' + (el.id || el.className));
        }
        return out;
      };
      const cur = pg => pg.evaluate(() => S.bt.cur && JSON.stringify({ puzzle: S.bt.cur.puzzle, state: S.bt.cur.state, hints: S.bt.cur.hints }));
      const board = pg => pg.evaluate(() => { const c = S.bt.cur; return MD.vals(c.puzzle, c.state || MD.fresh(c.puzzle)).join(''); });
      // the colours to compare with: amber tint and ink, and the red that must never show
      const amber = sel => pg => pg.evaluate(sel => {
        const e = document.querySelector(sel), css = getComputedStyle(document.documentElement), msg = document.querySelector('.md-msg');
        const rgb = v => { const d = document.createElement('i'); d.style.color = v; document.body.appendChild(d); const x = getComputedStyle(d).color; d.remove(); return x; };
        return { found: !!e, bg: e && getComputedStyle(e).backgroundColor, dashed: e && getComputedStyle(e).outlineStyle, warn: !!(e && e.querySelector('svg')),
          tryTint: rgb(css.getPropertyValue('--try-tint')), red: rgb(css.getPropertyValue('--danger')), tryInk: rgb(css.getPropertyValue('--try-ink')),
          msg: msg.textContent, cls: msg.className, msgColor: getComputedStyle(msg).color, miss: S.bt.cur.state.miss };
      }, sel);
      const gentle = g => g.found && g.bg === g.tryTint && g.bg !== g.red && g.dashed === 'dashed' && g.warn && /try/.test(g.cls) && g.msgColor === g.tryInk;
      for (const [w, h, grade, lv] of [[380, 780, 1, 1], [1024, 600, 5, 7], [380, 780, 5, 7]]) {
        const tag = 'P3-05 ' + w + 'x' + h + ' grade ' + grade;
        const app = await openApp(browser, { fixture: 'midway', width: w, height: h });
        const pg = app.page, bad = [], notes = [];
        const chk = async what => { for (const o of await pg.evaluate('(' + look.toString() + ')()')) bad.push(what + ': ' + o); };
        await pg.evaluate(() => { window.say = () => {}; });
        await pg.evaluate(([g, lv]) => { S.grade = g; if (lv > 1) BT.rec('mdoku', BT.band(), true).lvl = lv; save(); home(); }, [grade, lv]);
        await pg.waitForSelector('#btcard');
        await pg.evaluate(() => document.querySelector('#btcard').scrollIntoView({ block: 'center' }));
        await pg.click('#btcard');
        await pg.waitForSelector('.bt-hub .bt-type[data-t="mdoku"]');
        await pg.waitForTimeout(400);
        await pg.evaluate(() => document.querySelector('.bt-type[data-t="mdoku"]').scrollIntoView({ block: 'center' }));
        await pg.click('.bt-type[data-t="mdoku"]');
        await pg.waitForSelector('.bt-lvs');
        await pg.click(`.bt-lv[data-l="${lv}"]`);
        await pg.waitForSelector('#btstage .md');
        await pg.waitForTimeout(400);
        await chk('play');
        const g0 = await pg.evaluate(() => {
          const c = S.bt.cur, r = e => Math.round(Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height));
          return { band: c.band, n: c.puzzle.n, cells: document.querySelectorAll('.md-grid .md-c').length, cell: r(document.querySelector('.md-grid .md-c')),
            labels: document.querySelectorAll('.md-lab').length, cages: c.puzzle.cg.filter(g => g.o != '=').length, lab: parseFloat(getComputedStyle(document.querySelector('.md-lab')).fontSize),
            keys: [...document.querySelectorAll('.md-pad .k')].map(k => k.dataset.k).join(' '), thick: !!document.querySelector('.md-lines .md-thick') };
        });
        const want = grade === 1 ? ['B', 3, '1 2 3 del undo'] : ['D', 6, '1 2 3 4 5 6 del notes undo'];
        if (g0.band !== want[0] || g0.n !== want[1] || g0.cells !== g0.n * g0.n || g0.keys !== want[2] || g0.labels !== g0.cages || !g0.thick)
          bad.push('board: ' + JSON.stringify(g0) + ', want ' + want);
        notes.push(`${g0.n}x${g0.n} band ${g0.band}, square ${g0.cell} px, labels ${g0.lab} px`);
        const b0 = await board(pg);

        // a clash: amber, dashed, a warning mark, one mistake; Undo takes it away and keeps the mistake
        const cm = await taps.clash(pg);
        const gc = await amber(`.md-grid .md-c[data-c="${cm && cm[0]}"]`)(pg);
        const ncf = await pg.evaluate(() => document.querySelectorAll('.md-grid .md-c.cf').length);
        if (!cm || !gentle(gc) || ncf < 2 || gc.miss !== 1 || !/Two \d+s in this (row|column)/.test(gc.msg)) bad.push('the clash is not shown gently: ' + JSON.stringify(gc) + ' squares ' + ncf);
        await chk('clash');
        await pg.click('.md-pad .k[data-k="undo"]');
        const u = await pg.evaluate(() => ({ cf: document.querySelectorAll('.md-c.cf').length, miss: S.bt.cur.state.miss }));
        if (u.cf || (await board(pg)) !== b0 || u.miss !== 1) bad.push('Undo should take the clash away and keep the mistake: ' + JSON.stringify(u));

        // a cage miss: the label turns amber with a warning mark and a dashed ring, the line says why; one mistake; Undo takes it back
        const mm = await taps.miss(pg);
        const gm = await amber('.md-lab.miss')(pg);
        if (!mm || !gentle(gm) || gm.miss !== 2 || !/, but this cage needs \d+\. Change a number\./.test(gm.msg)) bad.push('the cage miss is not shown gently in words: ' + JSON.stringify(gm));
        notes.push('cage miss: "' + gm.msg + '"');
        await chk('cage miss');
        for (const _ of mm || []) await pg.click('.md-pad .k[data-k="undo"]');
        if ((await board(pg)) !== b0 || (await pg.evaluate(() => document.querySelectorAll('.md-lab.miss').length))) bad.push('Undo did not take the cage miss back');

        if (g0.n === 6) {
          // Notes put a 1 and a 3 in an empty square, small; Notes off again
          const free = await pg.evaluate(() => { const c = S.bt.cur; return MD.vals(c.puzzle, c.state).indexOf(0); });
          await pg.click(`.md-grid .md-c[data-c="${free}"]`);
          await pg.click('.md-pad .k[data-k="notes"]');
          await pg.click('.md-pad .k[data-k="1"]');
          await pg.click('.md-pad .k[data-k="3"]');
          const nt = await pg.evaluate(f => ({ txt: document.querySelector(`.md-grid .md-c[data-c="${f}"] .md-nts`)?.textContent, m: S.bt.cur.state.m[f],
            on: document.querySelector('.md-pad .k[data-k="notes"]').getAttribute('aria-pressed') }), free);
          if (nt.txt !== '13' || nt.m !== 5 || nt.on !== 'true') bad.push('notes: ' + JSON.stringify(nt));
          await pg.click('.md-pad .k[data-k="notes"]');
          await chk('notes');
        }

        // hint tiers 1 and 2: they point (a cage or a line shaded, then a ringed square) and explain; the board does not change
        const f0 = await board(pg);
        await pg.click('#bthint');
        await vwait(pg, 200);
        const t1 = await pg.evaluate(() => ({ hh: document.querySelectorAll('.md-grid .md-c.hh').length, msg: document.querySelector('.md-msg').textContent, hints: S.bt.cur.hints }));
        if (!t1.hh || !t1.msg || t1.hints !== 1) bad.push('hint 1: ' + JSON.stringify(t1));
        await vwait(pg, 11500);
        await pg.click('#bthint');
        await vwait(pg, 200);
        const t2 = await pg.evaluate(() => ({ hl: document.querySelectorAll('.md-grid .md-c.hl').length, msg: document.querySelector('.md-msg').textContent, hints: S.bt.cur.hints }));
        if (t2.hints !== 2 || !t2.hl || t2.msg === t1.msg || (await board(pg)) !== f0) bad.push('hint 2 should point at a square, explain and fill nothing: ' + JSON.stringify(t2));
        notes.push('hint 1: "' + t1.msg + '"; hint 2: "' + t2.msg + '"');
        await chk('hint 2');

        // one right move, then back to the levels and the hub: Keep going brings back the same puzzle and state
        await taps.move(pg, (await taps.rest(pg))[0]);
        await vwait(pg, 200);
        const mid = await cur(pg);
        await pg.click('#back');
        await pg.waitForSelector('.bt-lvs');
        await pg.click('#back');
        await pg.waitForSelector('#btkeep');
        await pg.click('#btkeep');
        await pg.waitForSelector('#btstage .md');
        if (!mid || (await cur(pg)) !== mid) bad.push('Keep going did not resume exactly');

        // the rest by taps, then the win card with the stars saved (two hints: 1 star; the next level opens)
        for (const m of await taps.rest(pg)) await taps.move(pg, m);
        try { await pg.waitForSelector('.bt-win #btlvls', { timeout: 8000 }); } catch (e) { bad.push('no win card'); }
        await pg.waitForTimeout(700);
        await chk('win card');
        const saved = await pg.evaluate(([b, lv]) => ({ stars: BT.rec('mdoku', b).stars[lv - 1] || 0, lvl: BT.rec('mdoku', b).lvl, cur: !!S.bt.cur,
          shown: document.querySelectorAll('.bt-win .rs.on').length }), [g0.band, lv]);
        if (saved.lvl !== lv + 1 || saved.cur || saved.shown !== saved.stars || saved.stars !== 1) bad.push('stars not saved ' + JSON.stringify(saved));
        notes.push(`won with ${saved.stars} star`);
        if (bad.length) fail(tag + ':\n  ' + bad.join('\n  '));
        else step(`${tag}: Home -> Brain Teasers -> MathDoku -> level ${lv}: ${notes.join('; ')}; a clash and a cage miss shown gently in amber and counted, ` +
          `Undo, hints 1-2 fill nothing, Keep going resumes exactly; targets 48 px, no sideways scroll, no emoji chrome`);
        network.push(...app.network);
        for (const e of app.errors) fail(e);
        await app.ctx.close();
      }
    }

    // P2-17 Tracing letters: the ABC Beach stop "Trace Little Letters" (trace 3) played with real touch moves made from the stroke
    //    data at 380x780 by a Pre-K child: the round is fixed to a, i (a dot to tap), g (a tail below the base), k, y (a tail).
    //    Both tracing stops show the reading colour on the map, the round's chrome is the reading colour, every glyph is traced
    //    through its three passes, the round completes 5/5 and the stop is saved with 3 stars.
    {
      const tag = 'P2-17 380x780';
      const tl = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      const pg = tl.page, bad = [];
      pg.__cdp = await pg.context().newCDPSession(pg);
      await pg.__cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 2 });
      const ti = await pg.evaluate(() => {
        S.name = 'Ava'; S.grade = -1;
        for (const k of ['abc1', 'abc2', 'trace2', 'abc3', 'syl1']) S.maps.read[k] = 3;
        save();
        window.say = () => {};
        // the round: these five letters, made the way traceRound makes them (genQ by seed, reproducible)
        const keys = ['a', 'i', 'g', 'k', 'y'];
        window.__keys = keys.join('');
        SK.trace.round = lv => keys.map(k => { let q = null; for (let s = 1; s < 4000 && !(q && q.g === k); s++) q = genQ('trace', lv, s); return q; });
        window.__trm = [];
        const f0 = TR.finish;
        TR.finish = c => { window.__trm.push(c.misses); f0(c); };
        home();
        return NODES.read.findIndex(n => n.sk == 'trace' && n.lv == 3);
      });
      await pg.click('.game[data-p="read"]');
      await pg.waitForSelector('#map');
      await pg.evaluate(() => { const c = document.querySelector('.wchip[data-w="0"]'); if (c) c.click(); });
      await pg.waitForSelector(`.node[data-n="${ti}"]`);
      const map = await pg.evaluate(ti => [ti - 3, ti].map(i => document.querySelector(`.node[data-n="${i}"]`).className), ti);
      if (!map.every(c => / read\b/.test(c) && !/\bmath\b/.test(c))) bad.push('tracing stops on the map are not in the reading colour: ' + map.join(' | '));
      await pg.click(`.node[data-n="${ti}"]`);
      await pg.waitForSelector('#trb');
      const chrome = await pg.evaluate(() => {
        const play = document.querySelector('.play'), top = document.querySelector('.qtop'), root = getComputedStyle(document.documentElement);
        return { play: play.className, top: top.className, c: getComputedStyle(play).getPropertyValue('--c').trim(), read: root.getPropertyValue('--read').trim(),
          math: root.getPropertyValue('--math').trim(), lv: G.lv, n: G.n, set: G.q.set, tol: TR.cur.tol, lines: document.querySelectorAll('#trb .tr-l').length };
      });
      if (!/\bs-read\b/.test(chrome.play) || !/\bs-read\b/.test(chrome.top) || chrome.c !== chrome.read || chrome.c === chrome.math)
        bad.push('round chrome is not the reading colour: ' + JSON.stringify(chrome));
      if (chrome.lv !== 3 || chrome.n !== 5 || chrome.set !== 'lower' || chrome.tol !== 14 || chrome.lines !== 4) bad.push('round: ' + JSON.stringify(chrome));
      const seen = [];
      for (let i = 0; i < 5; i++) {
        await pg.waitForFunction(i => (G.done === i && !G.lock && TR.cur && G.q === TR.cur.q) || document.querySelector('#chest'), i, { timeout: 10000 });
        const g = await pg.evaluate(() => ({ g: G.q.g, strokes: TR.cur.geo.s.length, dot: TR.cur.geo.s.some(s => s.dot),
          tail: Math.max(...TR.cur.geo.s.flatMap(s => s.p.map(p => p[1]))) > TRACE.sets.lower.lines.base + 10,
          wide: document.documentElement.scrollWidth > innerWidth, board: Math.round(document.querySelector('#trb').getBoundingClientRect().width) }));
        seen.push(g);
        if (g.wide || g.board < 240) bad.push(g.g + ': sideways scroll or board ' + g.board + ' px');
        await traceGlyph(pg);
      }
      await pg.waitForSelector('#chest', { timeout: 10000 });
      const fin = await pg.evaluate(() => {
        const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
        return { score: G.score, n: G.n, stars: S.maps.read.trace3 || 0, saved: ((saved.maps || {}).read || {}).trace3 || 0, misses: window.__trm };
      });
      const keys = seen.map(x => x.g).join('');
      if (keys !== 'aigky') bad.push('letters ' + keys);
      if (!seen.some(x => x.dot) || !seen.some(x => x.tail)) bad.push('no dot or no tail letter: ' + JSON.stringify(seen));
      if (fin.score !== 5 || fin.n !== 5 || fin.stars !== 3 || fin.saved !== 3 || fin.misses.join() !== '0,0,0,0,0') bad.push('round end: ' + JSON.stringify(fin));
      await pg.click('#chest');
      await pg.waitForSelector('#btns', { state: 'visible', timeout: 10000 });
      if (bad.length) fail(tag + ':\n  ' + bad.join('\n  '));
      else step(`${tag}: Trace Little Letters opened from the ABC Beach map (Pre-K, tolerance 14, 4 handwriting lines); both tracing stops ` +
        `and the round chrome in the reading colour; a i g k y (a dot to tap, tails below the base) x 3 passes traced by touch, 5/5, ` +
        'stop saved with 3 stars; board 240 px or more, no sideways scroll');
      network.push(...tl.network);
      for (const e of tl.errors) fail(e);
      await tl.ctx.close();
    }

    // P2-36 Discover: Home -> the Discover card -> the map (Nature Trail) -> a round of Living Things played with real taps, at 380x780 and
    //       1024x600. The stop earns stars under its own id, nothing on the other paths moves, the next stop opens; every question seen has
    //       buttons of 48 px or more, no sideways scroll and no cut-off words.
    {
      for (const [dw, dh] of [[380, 780], [1024, 600]]) {
        const da = await openApp(browser, { fixture: 'midway', width: dw, height: dh });
        const dp = da.page, tag = `Discover ${dw}x${dh}`;
        await dp.waitForSelector('.game[data-p="disc"]');
        const card = await dp.evaluate(() => {
          const c = document.querySelector('.game[data-p="disc"]'), r = c.getBoundingClientRect();
          return { h: r.height, art: !!c.querySelector('.hm-svg'), txt: c.textContent.replace(/\s+/g, ' ') };
        });
        if (card.h < 48 || !card.art || !/Discover/.test(card.txt) || !/0\/18/.test(card.txt)) fail(`${tag}: Home card ${JSON.stringify(card)}`);
        await dp.click('.game[data-p="disc"]');
        await dp.waitForSelector('.node[data-n="0"]');
        const map = await dp.evaluate(() => {
          const ns = [...document.querySelectorAll('.node')];
          return { n: ns.length, lock: ns.map(n => n.classList.contains('lock')), minH: Math.min(...ns.map(n => n.offsetHeight)), minW: Math.min(...ns.map(n => n.offsetWidth)),
            over: document.documentElement.scrollWidth - document.documentElement.clientWidth, title: document.querySelector('.top').textContent };
        });
        if (map.n !== 12 || map.lock.slice(0, 6).join() !== 'false,true,true,true,true,true' || map.minH < 48 || map.minW < 48 || map.over > 0 || !/Discover/.test(map.title)) fail(`${tag}: map ${JSON.stringify(map)}`);
        else step(`${tag}: Home card, then the map (Nature Trail and the world after it, 12 stops; the first is open), 48 px stops, no sideways scroll`);
        const before = await dp.evaluate(() => JSON.stringify([S.maps.math, S.maps.read, S.maps.es, S.stars]));
        await dp.click('.node[data-n="0"]');
        await dp.waitForSelector('#prompt');
        const bad = [];
        await playRound(dp, tag, undefined, async () => {
          const r = await dp.evaluate(() => {
            const chs = [...document.querySelectorAll('.ch')], pr = document.querySelector('#prompt');
            return { n: chs.length, minH: Math.min(...chs.map(c => c.offsetHeight)), minW: Math.min(...chs.map(c => c.offsetWidth)),
              over: document.documentElement.scrollWidth - document.documentElement.clientWidth, cut: chs.some(c => c.scrollWidth > c.clientWidth + 1) || pr.scrollWidth > pr.clientWidth + 1,
              text: pr.textContent.trim().length > 8, bq: G.q.label };
          });
          if (r.n < 3 || r.minH < 48 || r.minW < 48 || r.over > 0 || r.cut || !r.text) bad.push(JSON.stringify(r));
        });
        if (bad.length) fail(`${tag}: question layout ${bad.join(' ')}`);
        else step(`${tag}: every question: 3-4 choices of 48 px or more, no sideways scroll, no cut-off words`);
        const after = await dp.evaluate(() => ({ st: S.maps.disc.sci_life1 || 0, keys: Object.keys(S.maps.disc).join(), others: JSON.stringify([S.maps.math, S.maps.read, S.maps.es]),
          next: unlocked('disc', 1), saved: JSON.parse(localStorage.getItem(KEY)).maps.disc.sci_life1 || 0 }));
        if (after.st < 1 || after.keys !== 'sci_life1' || after.saved !== after.st || !after.next || after.others !== JSON.stringify(JSON.parse(before).slice(0, 3))) fail(`${tag}: stars ${JSON.stringify(after)}`);
        else step(`${tag}: stop earned ${after.st} stars under sci_life1, the next stop opened, no other path changed`);
        await dp.click('#menu');
        await dp.waitForSelector('#map');
        const open2 = await dp.evaluate(() => [...document.querySelectorAll('.node')].map(n => n.classList.contains('lock')).join());
        if (open2.split(',').slice(0, 6).join() !== 'false,false,true,true,true,true') fail(`${tag}: map after the round: locks ${open2}`);
        network.push(...da.network);
        for (const e of da.errors) fail(e);
        await da.ctx.close();
      }
    }

    // P3-07 Logic grids (src/js/80-bt-logic.js) with real taps, midway save: band B (a 1st grader) at 380x780 and band D (a 5th grader)
    //    at 1024x600: Home -> Brain Teasers -> Logic -> level 1. Band B: every clue drawn as child + picture + tick or cross, and its
    //    speak button speaks the clue. A mark that breaks a clue is shown gently (amber tint, dashed ring, warning mark, the line in words
    //    in --try-ink, never red) and is not counted; Check counts it; Undo takes it away. Hint tiers 1 and 2 point and explain and
    //    change nothing; back and Keep going resumes exactly; the rest tapped in; the win card shows the answer in words; stars saved.
    //    48 px targets (grid squares 44 px, BRAIN_TEASERS 8), no sideways scroll, the page does not scroll, no emoji outside pictures.
    {
      const taps = require('./lib/bt-lg');
      const look = () => {
        const vw = document.documentElement.clientWidth, out = [];
        for (const e of document.querySelectorAll('button, [role="button"]')) {
          const r = e.getBoundingClientRect();
          if (!r.width || r.bottom < 0 || r.top > innerHeight || e.closest('svg') || e.closest('#toast')) continue;
          // a clue card scrolled half out of its list is still a full-size target
          const cl = e.closest('.lg-clues'), lr = cl && cl.getBoundingClientRect();
          if (lr && (r.top < lr.top || r.bottom > lr.bottom)) continue;
          const min = e.classList.contains('lg-c') ? 43.5 : 47.5;
          if (Math.min(r.width, r.height) < min) out.push('small ' + (e.id || e.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (r.left < -1 || r.right > vw + 1) out.push('outside ' + (e.id || e.className) + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
        }
        if (document.documentElement.scrollWidth > vw) out.push('sideways scroll ' + document.documentElement.scrollWidth);
        const stg = document.querySelector('#btstage');
        if (stg && stg.scrollWidth > stg.clientWidth + 1) out.push('the puzzle scrolls sideways');
        if (stg && document.querySelector('#btstage .lg') && stg.scrollHeight > stg.clientHeight + 1) out.push('the puzzle does not fit: ' + stg.scrollHeight + ' > ' + stg.clientHeight);
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n; (n = w.nextNode());) {
          const el = n.parentElement;
          if (!el || el.closest('script,style,svg,#ico-sprite,.rw-burst,.lg-pic') || !el.getClientRects().length) continue;
          const m = n.textContent.match(/\p{Extended_Pictographic}|[◀▶✕]/u);
          if (m) out.push('emoji chrome ' + m[0] + ' in ' + (el.id || el.className));
        }
        return out;
      };
      const cur = pg => pg.evaluate(() => S.bt.cur && JSON.stringify({ puzzle: S.bt.cur.puzzle, state: S.bt.cur.state, hints: S.bt.cur.hints }));
      const grid = pg => pg.evaluate(() => S.bt.cur && (S.bt.cur.state || LG.fresh(S.bt.cur.puzzle)).v);
      for (const [w, h, grade] of [[380, 780, 1], [1024, 600, 5]]) {
        const tag = 'P3-07 ' + w + 'x' + h + ' grade ' + grade;
        const app = await openApp(browser, { fixture: 'midway', width: w, height: h });
        const pg = app.page, bad = [], notes = [];
        const chk = async what => { for (const o of await pg.evaluate('(' + look.toString() + ')()')) bad.push(what + ': ' + o); };
        await pg.evaluate(g => { window.__said = []; window.say = t => { window.__said.push(t); }; S.voice = true; S.grade = g; save(); home(); }, grade);
        await pg.waitForSelector('#btcard');
        await pg.evaluate(() => document.querySelector('#btcard').scrollIntoView({ block: 'center' }));
        await pg.click('#btcard');
        await pg.waitForSelector('.bt-hub .bt-type[data-t="logic"]');
        await pg.waitForTimeout(400);
        await pg.click('.bt-type[data-t="logic"]');
        await pg.waitForSelector('.bt-lvs');
        await pg.click('.bt-lv[data-l="1"]');
        await pg.waitForSelector('#btstage .lg');
        await pg.waitForTimeout(400);
        await chk('play');
        const g0 = await pg.evaluate(() => {
          const c = S.bt.cur, p = c.puzzle, r = e => Math.round(Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height));
          return { band: c.band, n: p.n, K: p.K, clues: p.cl.length, cards: document.querySelectorAll('.lg-q').length, cells: document.querySelectorAll('.lg-c').length,
            cell: r(document.querySelector('.lg-c')), pics: document.querySelectorAll('.lg-qp .lg-pic').length, marks: document.querySelectorAll('.lg-qp .lg-qm .ic').length,
            heads: document.querySelectorAll('.lg-h').length, tabs: document.querySelectorAll('#lgtabs button').length, land: !!document.querySelector('.lg.land') };
        });
        const want = { 1: ['B', 3, 1], 5: ['D', 4, 2] }[grade];
        if (g0.band !== want[0] || g0.n !== want[1] || g0.K !== want[2] || g0.cards !== g0.clues) bad.push('puzzle ' + JSON.stringify(g0) + ', want band ' + want);
        if (g0.band === 'B' && (g0.cells !== 9 || g0.pics !== g0.clues || g0.marks !== g0.clues)) bad.push('band B: a 3x3 grid and every clue drawn as child + picture + tick or cross: ' + JSON.stringify(g0));
        if (g0.band === 'D' && (!g0.land || g0.cells < 32)) bad.push('band D at 1024x600: clues left, grid right, both children blocks on screen: ' + JSON.stringify(g0));
        notes.push(`band ${g0.band}, ${g0.cells} squares of ${g0.cell} px${g0.tabs ? ', ' + g0.tabs + ' tabs' : ''}`);
        // the speak button of clue 1 speaks the clue
        await pg.click('.lg-q[data-q="0"] .lg-qsp');
        const said = await pg.evaluate(() => ({ said: window.__said.slice(-1)[0], clue: S.bt.cur.puzzle.cl[0].slice(-1)[0] }));
        if (said.said !== said.clue) bad.push('the speak button said ' + JSON.stringify(said));
        // tap clue 1: struck through
        await pg.click('.lg-q[data-q="0"] .lg-qb');
        if (!(await pg.evaluate(() => document.querySelector('.lg-q[data-q="0"]').classList.contains('used') && S.bt.cur.state.u.includes(0)))) bad.push('a tapped clue is not struck through');
        // a mark that breaks a clue: amber, in words, not a mistake yet
        const g1 = await grid(pg);
        const wm = await taps.wrong(pg);
        await vwait(pg, 1400);
        const gent = await pg.evaluate(m => {
          const sq = document.querySelector(`.lg-c[data-c="${m[0]}"]`), msg = document.querySelector('.lg-msg'), css = getComputedStyle(document.documentElement);
          const rgb = v => { const d = document.createElement('i'); d.style.color = v; document.body.appendChild(d); const x = getComputedStyle(d).color; d.remove(); return x; };
          return { cf: sq.classList.contains('cf'), warn: !!sq.querySelector('.lg-wn svg'), dashed: getComputedStyle(sq).outlineStyle, bg: getComputedStyle(sq).backgroundColor,
            tryTint: rgb(css.getPropertyValue('--try-tint')), red: rgb(css.getPropertyValue('--danger')), msg: msg.textContent, cls: msg.className,
            msgColor: getComputedStyle(msg).color, tryInk: rgb(css.getPropertyValue('--try-ink')), miss: S.bt.cur.state.miss, clueCf: document.querySelectorAll('.lg-q.cf').length };
        }, wm);
        if (!wm || !gent.cf || !gent.warn || gent.dashed !== 'dashed' || gent.bg !== gent.tryTint || gent.bg === gent.red || !/try/.test(gent.cls) ||
          gent.msgColor !== gent.tryInk || !/does not fit clue/.test(gent.msg) || gent.miss !== 0 || gent.clueCf !== 1) bad.push('a mark against a clue is not shown gently: ' + JSON.stringify({ wm, gent }));
        else notes.push('"' + gent.msg + '"');
        await chk('wrong mark');
        // Check counts it (once); Undo takes it away
        await pg.click('#lgcheck');
        const ck = await pg.evaluate(() => ({ miss: S.bt.cur.state.miss, msg: document.querySelector('.lg-msg').textContent }));
        if (ck.miss < 1 || !/not right yet/.test(ck.msg)) bad.push('Check should count the wrong mark: ' + JSON.stringify(ck));
        for (let i = 0; i < 3 && (await grid(pg)) !== g1; i++) await pg.click('#lgundo');
        if ((await grid(pg)) !== g1 || (await pg.evaluate(() => document.querySelectorAll('.lg-c.cf').length))) bad.push('Undo did not take the wrong mark away');
        // hint tiers 1 and 2: they point and explain; the grid does not change
        const f0 = await grid(pg);
        await pg.click('#bthint');
        await vwait(pg, 200);
        const t1 = await pg.evaluate(() => ({ hl: document.querySelectorAll('.lg-q.hl, .lg-c.hh, .lg-c.hl').length, msg: document.querySelector('.lg-msg').textContent, hints: S.bt.cur.hints }));
        if (!t1.hl || !t1.msg || t1.hints !== 1 || (await grid(pg)) !== f0) bad.push('hint 1: ' + JSON.stringify(t1));
        await vwait(pg, 11500);
        await pg.click('#bthint');
        await vwait(pg, 200);
        const t2 = await pg.evaluate(() => ({ hl: document.querySelectorAll('.lg-c.hl').length, msg: document.querySelector('.lg-msg').textContent, hints: S.bt.cur.hints }));
        if (t2.hints !== 2 || !t2.hl || t2.msg === t1.msg || (await grid(pg)) !== f0) bad.push('hint 2 should ring a square, explain and change nothing: ' + JSON.stringify(t2));
        notes.push('hint 2: "' + t2.msg + '"');
        await chk('hint 2');
        // one tick, then back to the levels and the hub: Keep going brings back the same puzzle and state
        await taps.setTo(pg, (await taps.rest(pg))[0], '1');
        await vwait(pg, 200);
        const mid = await cur(pg);
        await pg.click('#back');
        await pg.waitForSelector('.bt-lvs');
        await pg.click('#back');
        await pg.waitForSelector('#btkeep');
        await pg.click('#btkeep');
        await pg.waitForSelector('#btstage .lg');
        if (!mid || (await cur(pg)) !== mid) bad.push('Keep going did not resume exactly');
        // the rest by taps, then the win card with the answer in words and the stars saved
        for (const c of await taps.rest(pg)) await taps.setTo(pg, c, '1');
        try { await pg.waitForSelector('.bt-win #btlvls', { timeout: 8000 }); } catch (e) { bad.push('no win card'); }
        await pg.waitForTimeout(700);
        await chk('win card');
        const saved = await pg.evaluate(b => ({ stars: BT.rec('logic', b).stars[0] || 0, lvl: BT.rec('logic', b).lvl, cur: !!S.bt.cur,
          shown: document.querySelectorAll('.bt-win .rs.on').length, sum: [...document.querySelectorAll('.bt-win .bt-sum li')].map(l => l.textContent) }), g0.band);
        // two hints give 1 star
        if (saved.lvl !== 2 || saved.cur || saved.shown !== saved.stars || saved.stars !== 1) bad.push('stars not saved ' + JSON.stringify(saved));
        if (saved.sum.length !== g0.n || !saved.sum.every(t => /^[A-Z][a-z]+ .+\.$/.test(t))) bad.push('win card summary: ' + JSON.stringify(saved.sum));
        notes.push('won, 1 star, "' + saved.sum[0] + '"');
        if (bad.length) fail(tag + ':\n  ' + bad.join('\n  '));
        else step(`${tag}: Home -> Brain Teasers -> Logic -> ${notes.join('; ')}; a mark against a clue shown gently and counted by Check, ` +
          'hints 1-2 change nothing, Keep going resumes exactly; targets 48 px (squares 44), no sideways scroll, no emoji chrome');
        network.push(...app.network);
        for (const e of app.errors) fail(e);
        await app.ctx.close();
      }
    }

    // P2-14 Galaxy Core at 380x780: a 6th grader whose earlier worlds are finished opens the math map on Galaxy Core (no unlock switch), plays Exponents
    //    with a step hint, then Exponents, One-Step Equations (balance picture in the hint), Four Quadrants and Two-Step Equations as full rounds of
    //    real taps (a point tapped on the four-quadrant grid, ordered pairs picked, number lines picked, equations typed), and jumps through the other stops
    //    (expressions with two letters, area of a triangle, a parallelogram and a trapezoid, GCF and LCM stories, mean, median, a line plot, percent
    //    and ratio stories). Every question measured: 48 px keys, choices, tiles and tap targets, nothing wider than the screen, no word cut off,
    //    and with a step hint open the question stays in view; and the stars are saved.
    {
      const gc = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      const gp = gc.page;
      await gp.fill('#nm', 'Gala');
      await gp.click('.gr[data-g="6"]');
      await gp.click('#go');
      await gp.waitForSelector('.game[data-p="math"]');
      // every world before Galaxy Core is finished first (Sky City too), so the map meets it without an unlock switch; no "last world" is assumed
      await gp.evaluate(() => {
        const wi = PATHS.math.worlds.findIndex(w => w.id === 'm_galaxy');
        for (let i = 0; i < wi; i++) { for (let j = WR.math[i][0]; j <= WR.math[i][1]; j++) setSt('math', j, 2); S.wdone = S.wdone || {}; S.wdone[worldId('math', i)] = 1; }
        save();
      });
      const w14 = await gp.evaluate(() => {
        const wi = PATHS.math.worlds.findIndex(w => w.id === 'm_galaxy');
        return { wi, open: worldOpen('math', wi), cur: curWorld('math'), after: PATHS.math.worlds[wi - 1] && PATHS.math.worlds[wi - 1].id, stops: PATHS.math.worlds[wi].nodes.map(n => n[0] + n[1]).join(' '),
          boss: NODES.math[WR.math[wi][1]].sk, g: PATHS.math.worlds[wi].g, name: PATHS.math.worlds[wi].n };
      });
      const want14 = 'ooo2 alg1 ooo3 alg2 geo5 coord2 fact3 data5 alg3 story9';
      if (w14.wi < 1 || !w14.open || w14.cur !== w14.wi || w14.after !== 'm_sky' || w14.g !== 6 || w14.name !== 'Galaxy Core' || w14.stops !== want14 || w14.boss !== 'boss') fail('Galaxy Core: ' + JSON.stringify(w14));
      await gp.click('.game[data-p="math"]');
      await gp.waitForSelector(`.wchip.on[data-w="${w14.wi}"]`);
      // the map shows the 10 stops and the boss, and the page is not wider than the screen
      const map14 = await gp.evaluate(() => ({ w: document.documentElement.scrollWidth, n: document.querySelectorAll('.node').length }));
      if (map14.w > 380 || map14.n < 11) fail('Galaxy Core map: ' + JSON.stringify(map14));
      const lay14 = () => {
        const sm = a => (a.length ? Math.min(...a.map(b => Math.min(b.offsetHeight, b.offsetWidth))) : 99);
        const qa = document.querySelector('.qarea'), card = qa.getBoundingClientRect();
        const cut = [...document.querySelectorAll('#prompt *, .choice')].filter(e => !e.closest('svg') && e.getClientRects().length).filter(e => {
          const r = e.getBoundingClientRect();
          return r.right > card.right + 1 || r.left < card.left - 1 || (e.classList.contains('choice') && e.scrollWidth > e.clientWidth + 1);
        }).map(e => e.className || e.tagName);
        const first = document.querySelector('#prompt').firstElementChild, ft = first ? first.getBoundingClientRect().top : card.top;
        const pics = document.querySelector('#prompt svg, .ch svg');
        const box = e => ({ offsetHeight: e.getBoundingClientRect().height, offsetWidth: e.getBoundingClientRect().width });
        return { sk: G.sk + G.lv, qsk: String(G.q.sk) + G.q.lv, kind: G.q.kind, label: G.q.label, ans: String(G.q.ans), w: document.documentElement.scrollWidth, art: !!pics,
          keys: sm([...document.querySelectorAll('.k')]), ch: sm([...document.querySelectorAll('.ch')]), tall: qa.scrollHeight > qa.clientHeight + 1,
          top: ft >= card.top - 1, cut: cut.slice(0, 3), tiles: sm([...document.querySelectorAll('.ot, .mb')]),
          tap: sm([...document.querySelectorAll('#prompt .vt .vh')].map(box)), dot: !!document.querySelector('.k[data-k="."]') };
      };
      const seen14 = { tap: 0, choice: 0, num: 0, dec: 0, art: 0 };
      const meas14 = async (id, hint) => {
        const ok = await gp.waitForFunction(id => G && G.q && G.sk + G.lv === id, id, { timeout: 8000 }).then(() => true, () => false);
        if (!ok) { fail('Galaxy Core ' + id + ': the question on screen is ' + (await gp.evaluate(() => G && JSON.stringify([G.sk, G.lv, G.q && G.q.label])))); return { sk: id, w: 0, keys: 99, ch: 99, cut: [], tap: 99, art: true, label: '' }; }
        const lay = await gp.evaluate(lay14);
        // a review question from an earlier stop (or a question one level up or down, 51-mastery.js) is another chunk's content: not measured here
        if (lay.qsk !== id) return lay;
        if (lay.sk !== id || lay.w > 380 || lay.keys < 48 || lay.ch < 48 || lay.tiles < 48 || lay.tall || lay.cut.length || lay.tap < 47 || !lay.top) fail('Galaxy Core ' + id + ' (' + lay.label + '): ' + JSON.stringify(lay));
        if ((/^(geo5|coord2 (tap|read|quad pic|reflect)|alg3 (line|name)|data5 \w+ [\d,]+ plot)/.test(lay.label)) && !lay.art) fail('Galaxy Core ' + id + ': picture missing ' + lay.label);
        if (lay.kind === 'tap') seen14.tap++;
        if (lay.kind === 'choice') seen14.choice++;
        if (lay.kind === 'num') seen14.num++;
        if (lay.dot) seen14.dec++;
        if (lay.art) seen14.art++;
        if (hint) {
          // step hints: every step in turn, the question stays in view and nothing sticks out sideways
          const n = await gp.evaluate(() => G.q.hint.steps.length);
          for (let k = 0; k < n; k++) {
            await gp.click('#hb');
            await gp.waitForTimeout(450);
            const h = await gp.evaluate(() => {
              const qa = document.querySelector('.qarea').getBoundingClientRect(), f = document.querySelector('#prompt').firstElementChild;
              const hs = document.querySelector('#hint .hs'), sv = hs && hs.querySelector('svg');
              return { at: hs && hs.dataset.hs, w: document.documentElement.scrollWidth, top: f.getBoundingClientRect().top >= qa.top - 1, hb: Math.min(document.querySelector('#hb').offsetHeight, document.querySelector('#hb').offsetWidth),
                svg: sv ? Math.round(sv.getBoundingClientRect().height) : 0,
                cut: hs ? [...hs.querySelectorAll('*')].filter(e => !e.closest('svg') && e.getBoundingClientRect().right > hs.getBoundingClientRect().right + 1).length : -1 };
            });
            if (h.at !== String(k) || h.w > 380 || !h.top || h.hb < 48 || h.cut) fail('Galaxy Core step hint ' + id + ' ' + lay.label + ' step ' + k + ': ' + JSON.stringify(h));
            if (/^alg1 [a-z] \+/.test(lay.label) && k === 0 && !(h.svg > 30 && h.svg < 140)) fail('Galaxy Core: the balance picture in the first step of ' + lay.label + ' is ' + h.svg + ' px high');
          }
        }
        return lay;
      };
      // first stop by taps: Exponents, a step hint, then the full round
      const first = await gp.evaluate(() => NODES.math.findIndex(x => nid(x) === 'ooo2'));
      await gp.click(`.node[data-n="${first}"]`);
      await gp.waitForSelector('#prompt');
      await gp.waitForTimeout(900);
      await gp.click('#hb');
      await vwait(gp, 300);
      const h1 = await gp.evaluate(() => ({ at: document.querySelector('#hint .hs') && document.querySelector('#hint .hs').dataset.hs, label: document.querySelector('#hb').textContent.trim(), wide: document.documentElement.scrollWidth,
        hb: Math.min(document.querySelector('#hb').offsetHeight, document.querySelector('#hb').offsetWidth) }));
      await gp.click('#hb');
      await vwait(gp, 300);
      const h2 = await gp.evaluate(() => document.querySelector('#hint .hs').dataset.hs);
      if (h1.at !== '0' || !/Next step/.test(h1.label) || h2 !== '1' || h1.wide > 380 || h1.hb < 48) fail('Galaxy Core step hint: ' + JSON.stringify([h1, h2]));
      await playRound(gp, 'P2-14 ooo2', 10, async () => { await gp.waitForTimeout(600); await meas14('ooo2'); });
      await gp.evaluate(() => { G.dead = true; });
      await vwait(gp, 2500);
      const got1 = await gp.evaluate(() => S.maps.math.ooo2 || 0);
      const next1 = await gp.evaluate(() => unlocked('math', NODES.math.findIndex(x => nid(x) === 'alg1')));
      if (got1 < 1 || !next1) fail('Galaxy Core: ooo2 stars ' + got1 + ', next stop open ' + next1);
      // the other stops: full rounds of three of them, three measured questions of each of the rest
      await gp.evaluate(() => { S.unlockAll = true; save(); });
      const full = new Set(['alg1', 'coord2', 'alg3']);
      for (const id of ['alg1', 'ooo3', 'alg2', 'geo5', 'coord2', 'fact3', 'data5', 'alg3', 'story9']) {
        await gp.evaluate(() => home());
        await gp.click('.game[data-p="math"]');
        await gp.waitForSelector('.wchip.on');
        await gp.click(`.wchip[data-w="${w14.wi}"]`);
        await gp.waitForSelector(`.wchip.on[data-w="${w14.wi}"]`);
        const n = await gp.evaluate(id => NODES.math.findIndex(x => nid(x) === id), id);
        await gp.click(`.node[data-n="${n}"]`);
        await gp.waitForSelector('#prompt');
        if (full.has(id)) {
          await playRound(gp, 'P2-14 ' + id, 10, async () => { await gp.waitForTimeout(600); await meas14(id); });
        } else {
          for (let k = 0; k < 3; k++) {
            await gp.waitForTimeout(900);
            await meas14(id, k === 0 && (id === 'ooo3' || id === 'geo5'));
            await gp.evaluate(() => { window.__q = G.q; });
            await answer(gp);
            await gp.waitForFunction(() => G && G.q !== window.__q, null, { timeout: 8000 });
          }
        }
        await gp.evaluate(() => { G.dead = true; });
        await vwait(gp, 2500);
      }
      // one of each picture and kind, forced, measured (step hints of some opened step by step) and answered with real taps: a point tapped on the
      // four-quadrant grid (also a reflected one), ordered pairs and number lines picked, equations and decimals typed
      const forced = [['coord', 2, '^coord2 tap -'], ['coord', 2, '^coord2 read -'], ['coord', 2, '^coord2 quad pic'], ['coord', 2, '^coord2 quad pair'], ['coord', 2, '^coord2 reflect y', 'hint'],
        ['coord', 2, '^coord2 reflect x'], ['coord', 2, '^coord2 reflect-tap y'], ['alg', 3, '^alg3 line x < -'], ['alg', 3, '^alg3 name x > '], ['alg', 3, '^alg3 \\d+[a-z] −', 'hint'],
        ['alg', 1, '^alg1 [a-z] \\+ \\d+ = \\d+$', 'hint'], ['alg', 1, '^alg1 [a-z] − '], ['alg', 2, '÷'], ['ooo', 2, '\\^3'], ['ooo', 3, ', x = \\d+, y = ', 'hint'],
        ['geo', 5, '^geo5 tri'], ['geo', 5, '^geo5 par \\d+ \\d+ [1-9]'], ['geo', 5, '^geo5 trap', 'hint'], ['data', 5, 'plot$'], ['data', 5, '^data5 median [\\d,]+$', 'hint'],
        ['fact', 3, '^fact3 gcf-w', 'hint'], ['fact', 3, '^fact3 lcm-w'], ['story', 9, '^story9 ratio'], ['story', 9, '^story9 pct sale', 'hint'], ['story', 9, '^story9 eq money'], ['story', 9, '^story9 price']];
      for (const [sk, lv, re, flag] of forced) {
        await gp.evaluate(() => home());
        await gp.click('.game[data-p="math"]');
        await gp.waitForSelector('.wchip.on');
        await gp.click(`.wchip[data-w="${w14.wi}"]`);
        const n = await gp.evaluate(([sk, lv]) => NODES.math.findIndex(x => x.sk === sk && x.lv === lv), [sk, lv]);
        await gp.click(`.node[data-n="${n}"]`);
        await gp.waitForSelector('#prompt');
        const found = await gp.evaluate(([sk, lv, re]) => {
          for (let i = 1; i < 3000; i++) { const q = genQ(sk, lv, i); if (new RegExp(re).test(q.label)) { G.q = q; renderQ(); return true; } }
          return false;
        }, [sk, lv, re]);
        if (!found) { fail('Galaxy Core: no question for ' + re); continue; }
        await gp.waitForTimeout(700);
        await meas14(sk + lv, flag === 'hint');
        await gp.evaluate(() => { window.__q = G.q; });
        await answer(gp);
        await gp.waitForFunction(() => G && G.q !== window.__q, null, { timeout: 8000 });
        await gp.evaluate(() => { G.dead = true; });
        await vwait(gp, 1500);
      }
      if (!seen14.tap || !seen14.choice || !seen14.num || !seen14.dec || !seen14.art) fail('Galaxy Core: a tapped point, a choice, a typed answer, the decimal key or a picture never showed ' + JSON.stringify(seen14));
      const stars14 = await gp.evaluate(() => ['ooo2', 'alg1', 'coord2', 'alg3'].map(id => S.maps.math[id] || 0));
      if (stars14.some(x => x < 1)) fail('Galaxy Core: stars not saved ' + JSON.stringify(stars14));
      else step('P2-14: Galaxy Core opens for a 6th grader on its first stop (after Sky City, found by id); Exponents with a step hint, One-Step Equations, Four Quadrants and Two-Step Equations as full rounds by real taps (a point tapped on the four-quadrant grid, ordered pairs and number lines picked, equations typed), 10 stops and 26 forced pictures measured at 380x780 (48 px targets, no cut-off words, no sideways scroll), stars saved');
      network.push(...gc.network);
      for (const e of gc.errors) fail(e);
      await gc.ctx.close();
    }

    // P2-37 Discover 3-6, geography and civics at 380x780: a 4th grader opens Discover on Science Lab (not Nature Trail), plays Life Cycles & Food,
    //       then (the stops before it counted as done) the geography stop States & Capitals and, in Nature Trail, the civics stop Our Community, all with
    //       real taps. Stars save under each stop's own id, nothing on the other paths moves, every question has 48 px choices, no sideways scroll,
    //       no cut-off words.
    {
      const da = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const dp = da.page, tag = 'Discover 4th grade';
      await dp.evaluate(() => { S.grade = 4; save(); home(true); });
      await dp.waitForSelector('.game[data-p="disc"]');
      await dp.click('.game[data-p="disc"]');
      await dp.waitForSelector('.node[data-n="0"]');
      const on = await dp.evaluate(() => ({
        world: PATHS.disc.worlds[curWorld('disc')].id, cur: nid(NODES.disc[curNode('disc')]), chip: (document.querySelector('.wchip.on') || {}).textContent || '',
        node: document.querySelector('.node.cur') ? +document.querySelector('.node.cur').dataset.n : -1,
        over: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      }));
      if (on.world !== 'd_lab' || on.cur !== 'sci_life2' || !/Science Lab/.test(on.chip) || on.node !== 6 || on.over > 0) fail(`${tag}: Discover opened on ${JSON.stringify(on)}`);
      else step(`${tag}: Discover opens on Science Lab at Life Cycles & Food (sci_life 2), no sideways scroll`);
      const before = await dp.evaluate(() => JSON.stringify([S.maps.math, S.maps.read, S.maps.es, S.stars]));
      // one real round on a stop: opens it by its map button, plays, checks every question, and returns to the map
      const playStop = async (n, what) => {
        await dp.evaluate(i => document.querySelector(`.node[data-n="${i}"]`).scrollIntoView({ block: 'center' }), n);
        const nb = await dp.evaluate(i => { const b = document.querySelector(`.node[data-n="${i}"]`).getBoundingClientRect(); return { w: b.width, h: b.height, lock: document.querySelector(`.node[data-n="${i}"]`).classList.contains('lock') }; }, n);
        if (nb.w < 48 || nb.h < 48 || nb.lock) fail(`${tag}: ${what} stop button ${JSON.stringify(nb)}`);
        await dp.click(`.node[data-n="${n}"]`);
        await dp.waitForSelector('#prompt');
        const bad = [];
        await playRound(dp, `${tag} ${what}`, undefined, async () => {
          const r = await dp.evaluate(() => {
            const chs = [...document.querySelectorAll('.ch')], pr = document.querySelector('#prompt');
            return { n: chs.length, minH: Math.min(...chs.map(c => c.offsetHeight)), minW: Math.min(...chs.map(c => c.offsetWidth)),
              over: document.documentElement.scrollWidth - document.documentElement.clientWidth, cut: chs.some(c => c.scrollWidth > c.clientWidth + 1) || pr.scrollWidth > pr.clientWidth + 1,
              text: pr.textContent.trim().length > 8, sk: G.q.sk, lv: G.q.lv, label: G.q.label };
          });
          if (r.n < 3 || r.minH < 48 || r.minW < 48 || r.over > 0 || r.cut || !r.text) bad.push(JSON.stringify(r));
        });
        if (bad.length) fail(`${tag} ${what}: question layout ${bad.join(' ')}`);
        else step(`${tag} ${what}: every question: 3-4 choices of 48 px or more, no sideways scroll, no cut-off words`);
        const st = await dp.evaluate(i => ({ id: nid(NODES.disc[i]), stars: getSt('disc', i), saved: JSON.parse(localStorage.getItem(KEY)).maps.disc[nid(NODES.disc[i])] || 0 }), n);
        if (st.stars < 1 || st.saved !== st.stars) fail(`${tag} ${what}: stars ${JSON.stringify(st)}`);
        else step(`${tag} ${what}: ${st.stars} stars saved under ${st.id}`);
        await dp.click('#menu');
        await dp.waitForSelector('#map');
      };
      await playStop(6, 'Life Cycles & Food');
      const after1 = await dp.evaluate(() => ({ keys: Object.keys(S.maps.disc).join(), next: unlocked('disc', 7), others: JSON.stringify([S.maps.math, S.maps.read, S.maps.es, S.stars]) }));
      if (after1.keys !== 'sci_life2' || !after1.next || JSON.stringify(JSON.parse(after1.others).slice(0, 3)) !== JSON.stringify(JSON.parse(before).slice(0, 3)))
        fail(`${tag}: after the first stop ${JSON.stringify(after1)}`);
      else step(`${tag}: stars only under sci_life2, the next stop opened, no other path changed`);
      // Science Earth and Forces count as done (set directly), then the geography stop is played with taps
      await dp.evaluate(() => { S.maps.disc.sci_earth2 = 1; S.maps.disc.sci_phys2 = 1; save(); pathMap('disc'); });
      await dp.waitForSelector('.node[data-n="9"]');
      const geo = await dp.evaluate(() => ({ id: nid(NODES.disc[9]), open: unlocked('disc', 9), t: NODES.disc[9].t }));
      if (geo.id !== 'geo_us1' || !geo.open) fail(`${tag}: geography stop ${JSON.stringify(geo)}`);
      await playStop(9, 'States & Capitals');
      // the civics stop is in Nature Trail: the four stops before it count as done
      await dp.evaluate(() => { for (const k of ['sci_life1', 'sci_earth1', 'sci_phys1', 'geo_world1']) S.maps.disc[k] = 1; save(); pathMap('disc', 0); });
      await dp.waitForSelector('.node[data-n="4"]');
      const civ = await dp.evaluate(() => ({ id: nid(NODES.disc[4]), open: unlocked('disc', 4), t: NODES.disc[4].t }));
      if (civ.id !== 'civ1' || !civ.open) fail(`${tag}: civics stop ${JSON.stringify(civ)}`);
      await playStop(4, 'Our Community');
      const fin = await dp.evaluate(() => ({ g: S.grade, civ: S.maps.disc.civ1, geo: S.maps.disc.geo_us1, v: S.v, others: JSON.stringify([S.maps.math, S.maps.read, S.maps.es]) }));
      if (!(fin.civ >= 1) || !(fin.geo >= 1) || fin.g !== 4 || fin.others !== JSON.stringify(JSON.parse(before).slice(0, 3))) fail(`${tag}: end state ${JSON.stringify(fin)}`);
      else step(`${tag}: geography and civics stops saved, the other paths are unchanged`);
      network.push(...da.network);
      for (const e of da.errors) fail(e);
      await da.ctx.close();
    }


    // P3-14 Riddles, Memory Match, Copy Cat (src/js/81-83-bt-*.js) with real taps, midway save (tools/lib/bt-p314.js):
    //    380x780: Home -> Brain Teasers -> Riddles (a PK child, band A): hints 1-3 (nudge, clue, a wrong choice taken away), a wrong
    //    choice shown gently, the three riddles answered, win card, 1 star saved; -> Memory (a 1st grader, band B): face-down cards hold
    //    no face, a mismatch shown gently and turned back, a pair, hints 1 and 2 leave the board, back to the hub and Keep going resumes
    //    the same board, the rest tapped in, win card; -> Copy Cat (a 3rd grader, band C): a wrong pad shown gently and the round
    //    replayed, hint 1 (slower replay) and hint 2 (the next pad ringed), every round copied, win card.
    //    1024x600: Memory band D (a 5th grader), 20 cards, a mismatch, every pair tapped, 3 stars. Every screen: 48 px targets (pads
    //    64), nothing outside, no sideways scroll, no emoji outside the content pictures.
    {
      const P = require('./lib/bt-p314');
      const look = () => {
        const vw = document.documentElement.clientWidth, out = [];
        for (const e of document.querySelectorAll('button, [role="button"]')) {
          const r = e.getBoundingClientRect();
          if (!r.width || r.bottom < 0 || r.top > innerHeight || e.closest('svg') || e.closest('#toast')) continue;
          const min = e.classList.contains('cc-pad') ? 63.5 : 47.5;
          if (Math.min(r.width, r.height) < min) out.push('small ' + (e.id || e.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (r.left < -1 || r.right > vw + 1 || r.bottom > innerHeight + 1) out.push('outside ' + (e.id || e.className) + ' ' + Math.round(r.left) + '..' + Math.round(r.right) + ' bottom ' + Math.round(r.bottom));
        }
        if (document.documentElement.scrollWidth > vw) out.push('sideways scroll ' + document.documentElement.scrollWidth);
        const st = document.querySelector('.bt-stage');
        if (st && st.scrollWidth > st.clientWidth + 1) out.push('the puzzle scrolls sideways ' + st.scrollWidth + ' > ' + st.clientWidth);
        if (st && !document.querySelector('.bt-win') && st.scrollHeight > st.clientHeight + 1) out.push('the puzzle scrolls ' + st.scrollHeight + ' > ' + st.clientHeight);
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n; (n = w.nextNode());) {
          const el = n.parentElement;
          if (!el || el.closest('script,style,svg,#ico-sprite,.rw-burst,.rd-pic,.mm-pic') || !el.getClientRects().length) continue;
          const m = n.textContent.match(/\p{Extended_Pictographic}|[◀▶✕]/u);
          if (m) out.push('emoji chrome ' + m[0] + ' in ' + (el.id || el.className));
        }
        return out;
      };
      // a line shown gently: try-ink text, never the danger red
      const gentle = sel => {
        const e = document.querySelector(sel), css = getComputedStyle(document.documentElement);
        const rgb = v => { const d = document.createElement('i'); d.style.color = v; document.body.appendChild(d); const x = getComputedStyle(d).color; d.remove(); return x; };
        return { text: e.textContent, color: getComputedStyle(e).color, ink: rgb(css.getPropertyValue('--try-ink')), red: rgb(css.getPropertyValue('--danger')) };
      };
      const hintNow = async (pg, wait) => { if (wait) await vwait(pg, 11500); await pg.click('#bthint'); await vwait(pg, 300); };
      const open = async (pg, id, grade) => {
        await pg.evaluate(g => { S.grade = g; save(); home(); }, grade);
        await pg.waitForSelector('#btcard');
        await pg.evaluate(() => document.querySelector('#btcard').scrollIntoView({ block: 'center' }));
        await pg.click('#btcard');
        await pg.waitForSelector(`.bt-hub [data-t="${id}"]`);
        await pg.evaluate(id => document.querySelector(`.bt-hub [data-t="${id}"]`).scrollIntoView({ block: 'center' }), id);
        await pg.click(`.bt-hub [data-t="${id}"]`);
        await pg.waitForSelector('.bt-lvs');
        await pg.click('.bt-lv[data-l="1"]');
      };
      const won = async (pg, id, band, stars, bad, chk) => {
        await pg.waitForSelector('.bt-win #btnext', { timeout: 15000 });
        await vwait(pg, 700);
        await chk('win card');
        const w = await pg.evaluate(([id, b]) => ({ shown: document.querySelectorAll('.bt-win .rs.on').length, note: document.querySelectorAll('.bt-win .bt-sum li').length,
          saved: S.bt[id] && S.bt[id][b] && S.bt[id][b].stars[0], lvl: S.bt[id] && S.bt[id][b].lvl, cur: !!S.bt.cur }), [id, band]);
        if (w.shown !== stars || w.saved !== stars || w.lvl !== 2 || w.cur || !w.note) bad.push(id + ' win: ' + JSON.stringify(w) + ' (want ' + stars + ' stars)');
        await pg.click('#btlvls');
        await pg.waitForSelector('.bt-lvs');
        await pg.click('#back');
        await pg.waitForSelector('.bt-hub');
        return w;
      };
      for (const [w, h] of [[380, 780], [1024, 600]]) {
        const tag = 'P3-14 ' + w + 'x' + h;
        const app = await openApp(browser, { fixture: 'midway', width: w, height: h });
        const pg = app.page, bad = [], notes = [];
        const chk = async what => { await pg.waitForTimeout(400); for (const o of await pg.evaluate('(' + look.toString() + ')()')) bad.push(what + ': ' + o); };
        if (w == 380) {
          // ---- Riddles, band A ----
          await open(pg, 'riddle', 0);
          await pg.waitForSelector('#btstage .rd-ch');
          await vwait(pg, 300);
          await chk('riddle');
          const r0 = await P.rdNow(pg), s0 = await pg.evaluate(() => S.stars);
          if (await pg.evaluate(() => document.querySelectorAll('.rd-ch .rd-pic').length) !== 3) bad.push('band A riddles should have 3 picture choices');
          const tips = [];
          for (let t = 1; t <= 3; t++) {
            await hintNow(pg, t > 1);
            tips.push(await pg.evaluate(() => ({ tip: document.querySelector('.rd-tip').hidden ? '' : document.querySelector('.rd-tip').textContent.trim(),
              off: document.querySelectorAll('.rd-ch.off').length, hints: S.bt.cur.hints })));
          }
          if (!tips[0].tip || !tips[1].tip || tips[0].tip === tips[1].tip || tips[0].off || tips[1].off || tips[1].hints !== 2) bad.push('riddle hints 1-2: ' + JSON.stringify(tips));
          if (tips[2].off !== 1 || tips[2].hints !== 3) bad.push('riddle hint 3 should take one of the two wrong pictures away: ' + JSON.stringify(tips[2]));
          await chk('riddle hints');
          const r1 = await P.rdNow(pg);
          await P.rdTap(pg, r1.wrong);
          const g = await pg.evaluate(c => ({ cls: document.querySelector(`.rd-ch[data-c="${c}"]`).className, miss: S.bt.cur.state.miss }), r1.wrong);
          const gm = await pg.evaluate('(' + gentle.toString() + ')(".rd-msg")');
          if (!/wrong/.test(g.cls) || g.miss !== 1 || gm.color !== gm.ink || gm.color === gm.red || !gm.text) bad.push('a wrong riddle choice is not shown gently: ' + JSON.stringify([g, gm]));
          else notes.push('"' + gm.text + '"');
          for (let i = 0; i < r0.n; i++) {
            await pg.waitForFunction(i => S.bt.cur && S.bt.cur.state && S.bt.cur.state.i === i && document.querySelectorAll('.rd-dots i.on').length === i, i, { timeout: 8000 });
            await P.rdTap(pg, (await P.rdNow(pg)).a);
            if (i < r0.n - 1 && !(await pg.evaluate(() => /good/.test(document.querySelector('.rd-msg').className) && !!document.querySelector('.rd-ch.right')))) bad.push('riddle ' + i + ': right answer not shown');
          }
          const rw = await won(pg, 'riddle', 'A', 1, bad, chk);
          if ((await pg.evaluate(() => S.stars)) !== s0 + 1) bad.push('riddle stars not paid');
          notes.push('riddles: 1 star, ' + rw.note + ' answer lines');

          // ---- Memory, band B: mismatch, a pair, hints, back and resume ----
          await pg.evaluate(() => { S.grade = 1; save(); });
          await pg.evaluate(() => BT.hub());
          await pg.waitForSelector('.bt-hub [data-t="memory"]');
          await pg.evaluate(() => document.querySelector('.bt-hub [data-t="memory"]').scrollIntoView({ block: 'center' }));
          await pg.click('.bt-hub [data-t="memory"]');
          await pg.waitForSelector('.bt-lvs');
          await pg.click('.bt-lv[data-l="1"]');
          await pg.waitForSelector('#btstage .mm-c');
          await vwait(pg, 300);
          await chk('memory');
          const leak = await pg.evaluate(() => [...document.querySelectorAll('.mm-c:not(.up) .mm-face')].filter(f => f.innerHTML).length + [...document.querySelectorAll('.mm-c:not(.up)')].filter(c => !/^Card \d+, face down$/.test(c.getAttribute('aria-label'))).length);
          if (leak) bad.push('memory: ' + leak + ' face-down cards show what they are');
          const m = await P.mmMiss(pg);
          await P.mmTap(pg, m[0]);
          await P.mmTap(pg, m[1]);
          const mm = await pg.evaluate(m => ({ up: m.map(i => document.querySelector(`.mm-c[data-i="${i}"]`).className), turns: S.bt.cur.state.turns, m: S.bt.cur.state.m.length }), m);
          const mg = await pg.evaluate('(' + gentle.toString() + ')(".mm-msg")');
          if (!mm.up.every(c => /up/.test(c) && /no/.test(c)) || mm.turns !== 1 || mm.m || mg.color !== mg.ink || mg.color === mg.red) bad.push('memory mismatch not shown gently: ' + JSON.stringify([mm, mg]));
          else notes.push('"' + mg.text + '"');
          await chk('memory mismatch');
          await vwait(pg, 1800);
          if (await pg.evaluate(m => m.some(i => document.querySelector(`.mm-c[data-i="${i}"]`).classList.contains('up')), m)) bad.push('memory: the mismatch did not turn back');
          const pr = (await P.mmRest(pg))[0];
          await P.mmTap(pg, pr[0]);
          await P.mmTap(pg, pr[1]);
          if (await pg.evaluate(pr => pr.filter(i => document.querySelector(`.mm-c[data-i="${i}"]`).classList.contains('got')).length, pr) !== 2) bad.push('memory: a pair is not shown as found');
          const mBefore = await pg.evaluate(() => JSON.stringify(S.bt.cur.state.m));
          await hintNow(pg, false);
          const h1 = await pg.evaluate(() => ({ peek: document.querySelectorAll('.mm-c.peek.up').length, hints: S.bt.cur.hints, m: JSON.stringify(S.bt.cur.state.m), msg: document.querySelector('.mm-msg').textContent }));
          await hintNow(pg, true);
          const h2 = await pg.evaluate(() => ({ peek: document.querySelectorAll('.mm-c.peek.up').length, hints: S.bt.cur.hints, m: JSON.stringify(S.bt.cur.state.m), msg: document.querySelector('.mm-msg').textContent }));
          if (h1.peek !== 1 || h1.hints !== 1 || h1.m !== mBefore || h2.peek !== 2 || h2.hints !== 2 || h2.m !== mBefore || h1.msg === h2.msg) bad.push('memory hints 1-2: ' + JSON.stringify([h1, h2]));
          await chk('memory hint 2');
          await vwait(pg, 2500);
          // back to the levels and the hub; Keep going resumes the same board
          const keep = await pg.evaluate(() => JSON.stringify([S.bt.cur.puzzle.cards, S.bt.cur.state.m, S.bt.cur.state.turns]));
          await pg.click('#back');
          await pg.waitForSelector('.bt-lvs');
          await pg.click('#back');
          await pg.waitForSelector('#btkeep');
          await pg.click('#btkeep');
          await pg.waitForSelector('#btstage .mm-c');
          const back = await pg.evaluate(() => ({ s: JSON.stringify([S.bt.cur.puzzle.cards, S.bt.cur.state.m, S.bt.cur.state.turns]), got: document.querySelectorAll('.mm-c.got').length, up: document.querySelectorAll('.mm-c.up').length }));
          if (back.s !== keep || back.got !== 2 || back.up !== 2) bad.push('memory resume: ' + JSON.stringify(back));
          for (const [a, c] of await P.mmRest(pg)) { await P.mmTap(pg, a); await P.mmTap(pg, c); }
          await won(pg, 'memory', 'B', 1, bad, chk);
          notes.push('memory: resumed, 1 star');

          // ---- Copy Cat, band C: a wrong pad, hints 1-2, every round ----
          await pg.evaluate(() => { S.grade = 3; save(); BT.hub(); });
          await pg.waitForSelector('.bt-hub [data-t="copycat"]');
          await pg.evaluate(() => document.querySelector('.bt-hub [data-t="copycat"]').scrollIntoView({ block: 'center' }));
          await pg.click('.bt-hub [data-t="copycat"]');
          await pg.waitForSelector('.bt-lvs');
          await pg.click('.bt-lv[data-l="1"]');
          await pg.waitForSelector('#btstage .cc-pad');
          if (await pg.evaluate(() => document.querySelectorAll('.cc-pad').length) !== 6) bad.push('band C copy cat should have 6 pads');
          const t0 = await P.ccTurn(pg);
          await chk('copy cat');
          const wp = (t0.want[0] + 1) % 6;
          await pg.click(`.cc-pad[data-p="${wp}"]`);
          const cw = await pg.evaluate(i => ({ no: document.querySelector(`.cc-pad[data-p="${i}"]`).classList.contains('no'), miss: S.bt.cur.state.miss, phase: BT.act.inst.now().phase }), wp);
          const cg = await pg.evaluate('(' + gentle.toString() + ')(".cc-msg")');
          if (!cw.no || cw.miss !== 1 || cw.phase !== 'wait' || cg.color !== cg.ink || cg.color === cg.red) bad.push('a wrong pad is not shown gently: ' + JSON.stringify([cw, cg]));
          else notes.push('"' + cg.text + '"');
          const t1 = await P.ccTurn(pg);
          if (t1.now.r !== t0.now.r || t1.now.taps.length) bad.push('the round was not shown again: ' + JSON.stringify(t1.now));
          await hintNow(pg, false);
          const c1 = await pg.evaluate(() => ({ phase: BT.act.inst.now().phase, hints: S.bt.cur.hints }));
          if (c1.phase !== 'show' || c1.hints !== 1) bad.push('copy cat hint 1 should show the round again: ' + JSON.stringify(c1));
          const t2 = await P.ccTurn(pg);
          await vwait(pg, 11500);
          await pg.click('#bthint');
          await vwait(pg, 200);
          const c2 = await pg.evaluate(() => ({ tip: [...document.querySelectorAll('.cc-pad.tip')].map(b => +b.dataset.p), hints: S.bt.cur.hints, taps: BT.act.inst.now().taps.length }));
          if (c2.hints !== 2 || c2.tip.length !== 1 || c2.tip[0] !== t2.want[0] || c2.taps) bad.push('copy cat hint 2 should ring the next pad: ' + JSON.stringify(c2));
          await chk('copy cat hint 2');
          await P.ccWin(pg);
          await won(pg, 'copycat', 'C', 1, bad, chk);
          notes.push('copy cat: ' + t0.len + ' pads copied, 1 star');
        } else {
          // ---- Memory, band D at 1024x600 ----
          await open(pg, 'memory', 5);
          await pg.waitForSelector('#btstage .mm-c');
          await vwait(pg, 300);
          if (await pg.evaluate(() => document.querySelectorAll('.mm-c').length) !== 20) bad.push('band D memory should have 20 cards');
          await chk('memory D');
          const m = await P.mmMiss(pg);
          await P.mmTap(pg, m[0]);
          await P.mmTap(pg, m[1]);
          await chk('memory D mismatch');
          await vwait(pg, 1800);
          for (const [a, c] of await P.mmRest(pg)) { await P.mmTap(pg, a); await P.mmTap(pg, c); }
          await won(pg, 'memory', 'D', 3, bad, chk);
          notes.push('memory D: 20 cards, 3 stars');
        }
        if (bad.length) fail(tag + ':\n  ' + bad.join('\n  '));
        else step(tag + ': Home -> Brain Teasers -> ' + notes.join('; ') + '; targets 48 px, no sideways scroll, no emoji chrome');
        await vwait(pg, 300);
        network.push(...app.network);
        for (const e of app.errors) fail(e);
        await app.ctx.close();
      }
    }

    for (const e of errors) fail(e);
    // P2-30 Spanish framework at 380x780: level 3 (hear it, spell it) typed with the accent key, and the no-Spanish-voice path (the word shown big,
    //    a one-time grown-up note, no speaker buttons): 48 px keys and choices, nothing wider than the screen. Uses the fake unit es_tst (tools/lib/es-fx.js).
    {
      const ES_FX = require('./lib/es-fx.js');
      const ex = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      const ep = ex.page;
      const lay = () => {
        const sm = a => (a.length ? Math.min(...a.map(b => b.getBoundingClientRect().height)) : 99);
        return { w: document.documentElement.scrollWidth, keys: Math.min(99, ...[...document.querySelectorAll('.sk')].map(b => b.getBoundingClientRect().height)), ch: sm([...document.querySelectorAll('.ch')]),
          big: (document.querySelector('.esbig') || {}).textContent || '', hear: !!document.querySelector('.hear'), spk: !!document.querySelector('#spk') && document.querySelector('#spk').style.display !== 'none',
          note: [...document.querySelectorAll('.toast, #toast, [role="status"]')].map(e => e.textContent).join(' ') };
      };
      // 1. a Spanish voice exists: level 3 shows picture, clue and blanks; niño is typed with the ñ key
      const seed = await ep.evaluate(`(${ES_FX.install})(['es-MX'])`);
      await ep.evaluate(s => { start('es', 0); G.q = genQ('es_tst', 3, s); renderQ(); }, seed);
      await ep.waitForSelector('.lslots .ls');
      let l3 = await ep.evaluate(lay);
      const info = await ep.evaluate(() => ({ kind: G.q.kind, word: G.q.word, slots: document.querySelectorAll('.ls').length, acc: !!document.querySelector('.sk[data-ch="ñ"]'), inv: !!document.querySelector('.sk[data-ch="¿"]') && !!document.querySelector('.sk[data-ch="¡"]'), clue: document.querySelector('.sub').textContent }));
      if (info.kind !== 'spell' || info.word !== 'niño' || info.slots !== 4 || !info.acc || !info.inv || !/el/.test(info.clue) || !/boy/.test(info.clue)) fail('es level 3 question: ' + JSON.stringify(info));
      if (l3.w > 380 || l3.keys < 48 || !l3.spk) fail('es level 3 layout: ' + JSON.stringify(l3));
      for (const c of 'niño') await ep.click(`.sk[data-ch="${c}"]`);
      const r3 = await ep.evaluate(() => ({ lock: G.lock, ok: document.querySelectorAll('.ls.ok').length, done: G.done, typed: G.typed }));
      if (!r3.lock || r3.ok !== 4 || r3.typed !== 'niño') fail('es level 3: niño typed with the ñ key did not pass ' + JSON.stringify(r3));
      // 2. no Spanish voice (English only): the listen question shows the word big, no speaker, one note; the question is still answerable
      await vwait(ep, 2800);
      await ep.evaluate(() => home());
      await ep.evaluate(`(${ES_FX.install})(['en-US'])`);
      await ep.evaluate(() => { start('es', 0); G.q = genQ('es_animal', 1, 7); renderQ(); });
      await ep.waitForSelector('.esbig');
      const nv = await ep.evaluate(lay);
      const want = await ep.evaluate(() => G.q.ans);
      if (nv.big !== want || nv.hear || nv.spk) fail('es no voice: the word is not shown big or a speaker is still there ' + JSON.stringify(nv));
      if (nv.w > 380 || nv.ch < 48) fail('es no voice layout: ' + JSON.stringify(nv));
      if (!/No Spanish voice/.test(nv.note)) fail('es no voice: no note for grown-ups ' + JSON.stringify(nv.note));
      // the note shows once per session: a second question has none, and the speaker is still gone
      await ep.click('.ch').catch(() => {});
      await vwait(ep, 2800);
      const spoke = await ep.evaluate(() => { let n = 0; speechSynthesis.speak = () => { n++; }; say('hola', null, 'es'); return n; });
      if (spoke) fail('es no voice: say(es) still spoke');
      // 3. level 3 with no voice still works from the picture and clue, with no Hear it button
      await vwait(ep, 2800);
      await ep.evaluate(() => { home(); document.querySelectorAll('.ovl').forEach(e => e.remove()); });
      await ep.evaluate(s => { start('es', 0); G.q = genQ('es_tst', 3, s); renderQ(); }, seed);
      await ep.waitForSelector('.lslots .ls');
      l3 =await ep.evaluate(lay);
      if (l3.spk || l3.w > 380 || l3.keys < 48) fail('es level 3 with no voice: ' + JSON.stringify(l3));
      for (const c of 'niño') await ep.click(`.sk[data-ch="${c}"]`);
      if (!(await ep.evaluate(() => G.lock && document.querySelectorAll('.ls.ok').length === 4))) fail('es level 3 with no voice: niño did not pass');
      // 4. voices that arrive late: the list is empty at first (still waiting), then the Spanish voice shows up and the speaker comes back
      const late = await ep.evaluate(() => { const o = []; speechSynthesis.getVoices = () => o; const a = esVoice(); o.push({ lang: 'es-US' }); return [a, esVoice()]; });
      if (late[1] !== 'yes') fail('es voices arriving late: ' + JSON.stringify(late));
      step('P2-30: es level 3 typed with the ñ key; no-voice path shows the word big with one note, no speaker; 48 px, no sideways scroll');
      network.push(...ex.network);
      for (const e of ex.errors) fail(e);
      await ex.ctx.close();
    }

    // P2-31 La Casa at 380x780: a child who finished Gran Repaso opens the Spanish map on La Casa, plays a level 1 (listen) round of House with real taps, a level 3
    //    (spell, accent key forced: lápiz, baño) round, and a level 1 round again with no Spanish voice (the word shown big, no speaker). Stars saved, every key and choice
    //    at least 48 px, nothing wider than the screen. Shots: es-casa-* (tools/shots.js).
    {
      const cx = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      const cp = cx.page;
      await cp.fill('#nm', 'Casa');
      await cp.click('#go');
      await cp.waitForSelector('.game[data-p="es"]');
      await cp.evaluate(() => {
        for (let i = 0; i < WR.es[2][1] + 1; i++) setSt('es', i, 3);
        S.wdone = S.wdone || {}; for (let i = 0; i < 3; i++) S.wdone[worldId('es', i)] = 1;
        save();
        speechSynthesis.getVoices = () => [{ lang: 'es-MX', name: 'es-MX' }]; ESNOTE = 0;
      });
      const wc = await cp.evaluate(() => ({ wi: PATHS.es.worlds.findIndex(w => w.id === 'e_casa'), open: worldOpen('es', 3), cur: curWorld('es'),
        stops: PATHS.es.worlds[3].nodes.map(n => n[0] + n[1]).join(' ') }));
      if (wc.wi !== 3 || !wc.open || wc.cur !== 3 || wc.stops !== 'es_house1 es_house2 es_clothes1 es_clothes2 es_school1 es_school2 es_feel1 es_feel2 es_house3 es_clothes3 es_school3') fail('La Casa world: ' + JSON.stringify(wc));
      await cp.click('.game[data-p="es"]');
      await cp.waitForSelector('.wchip.on[data-w="3"]');
      const mp = await cp.evaluate(() => ({ w: document.documentElement.scrollWidth, n: document.querySelectorAll('.node').length, wide: [...document.querySelectorAll('.node')].filter(e => e.getBoundingClientRect().width < 48 || e.getBoundingClientRect().height < 48).length }));
      if (mp.w > 380 || mp.n < 12 || mp.wide) fail('La Casa map: ' + JSON.stringify(mp));
      const lay31 = async (label) => {
        const l = await cp.evaluate(() => {
          const sm = a => (a.length ? Math.min(...a.map(b => Math.min(b.getBoundingClientRect().height, b.getBoundingClientRect().width))) : 99);
          return { w: document.documentElement.scrollWidth, keys: Math.min(99, ...[...document.querySelectorAll('.sk')].map(b => b.getBoundingClientRect().height)), ch: sm([...document.querySelectorAll('.ch')]),
            big: !!document.querySelector('.esbig'), hear: !!document.querySelector('.hear'), kind: G.q.kind };
        });
        if (l.w > 380 || l.keys < 48 || l.ch < 48) fail('La Casa ' + label + ' layout: ' + JSON.stringify(l));
        return l;
      };
      // level 1 (listen): a real tap on the first stop, the learn screen, then the round
      const n0 = await cp.evaluate(() => WR.es[3][0]);
      await cp.click('.node[data-n="' + n0 + '"]');
      await cp.waitForSelector('#go');
      await cp.click('#go');
      await cp.waitForSelector('#prompt .hear');
      await cp.screenshot({ path: require('path').join(__dirname, 'out', 'es-casa-l1-380x780.png') }).catch(() => {});
      let asked = 0;
      await playRound(cp, 'P2-31 es_house 1 (listen)', undefined, async () => { const l = await lay31('L1'); if (l.kind !== 'choice') fail('La Casa L1: not a choice ' + JSON.stringify(l)); if (await cp.evaluate(() => G.q.sk === 'es_house' && G.q.lv === 1) && !l.hear) fail('La Casa L1: no speaker on a listen question ' + JSON.stringify(l)); asked++; });
      const st1 = await cp.evaluate(() => S.maps.es.es_house1);
      if (!(st1 > 0)) fail('La Casa: stars not saved for es_house1 (' + st1 + ')');
      // level 3 (spell): the stop is reached by a real tap once the stops before it are passed; the first words are forced to carry accents
      await cp.evaluate(() => { for (let i = WR.es[3][0]; i < WR.es[3][0] + 8; i++) setSt('es', i, 2); save(); pathMap('es', 3); });
      await cp.waitForSelector('.wchip.on[data-w="3"]');
      const n3 = await cp.evaluate(() => NODES.es.findIndex(x => x.sk === 'es_house' && x.lv === 3));
      await cp.click('.node[data-n="' + n3 + '"]'); // levels 2 and 3 start the round at once (only level 1 has the learn screen)
      await cp.waitForSelector('.lslots .ls');
      await cp.evaluate(() => { for (let s = 1; s < 400; s++) { const q = genQ('es_house', 3, s); if (q.word === 'baño') { G.q = q; renderQ(); return; } } });
      await cp.waitForSelector('.sk[data-ch="ñ"]');
      if (!(await cp.evaluate(() => !!document.querySelector('.sk[data-ch="ñ"]') && G.q.word === 'baño'))) fail('La Casa L3: baño with the ñ key missing');
      await cp.screenshot({ path: require('path').join(__dirname, 'out', 'es-casa-l3-380x780.png') }).catch(() => {});
      await playRound(cp, 'P2-31 es_house 3 (spell)', undefined, async () => { const l = await lay31('L3'); if (l.kind !== 'spell' && (await cp.evaluate(() => G.q.sk === 'es_house' && G.q.lv === 3))) fail('La Casa L3: not a spell question'); });
      const st3 = await cp.evaluate(() => S.maps.es.es_house3);
      if (!(st3 > 0)) fail('La Casa: stars not saved for es_house3 (' + st3 + ')');
      // no Spanish voice: level 1 shows the word big and has no speaker; still playable, stars saved
      await cp.evaluate(() => { speechSynthesis.getVoices = () => [{ lang: 'en-US', name: 'en-US' }]; ESNOTE = 0; S.maps.es.es_clothes1 = 0; save(); pathMap('es', 3); });
      await cp.waitForSelector('.wchip.on[data-w="3"]');
      const nc = await cp.evaluate(() => NODES.es.findIndex(x => x.sk === 'es_clothes' && x.lv === 1));
      await cp.click('.node[data-n="' + nc + '"]');
      await cp.waitForSelector('#go');
      await cp.click('#go');
      await cp.waitForSelector('.esbig');
      await cp.screenshot({ path: require('path').join(__dirname, 'out', 'es-casa-novoice-380x780.png') }).catch(() => {});
      await playRound(cp, 'P2-31 es_clothes 1 with no voice', undefined, async () => { const l = await lay31('no voice'); if (l.hear || (l.kind === 'choice' && !l.big && (await cp.evaluate(() => G.q.sk === 'es_clothes' && G.q.lv === 1)))) fail('La Casa no voice: word not big or speaker still there ' + JSON.stringify(l)); });
      const stc = await cp.evaluate(() => S.maps.es.es_clothes1);
      if (!(stc > 0)) fail('La Casa: stars not saved for es_clothes1 with no voice');
      step('P2-31: La Casa opens after Gran Repaso; level 1 (listen), level 3 (spell, ñ key) and a no-voice round played with taps; stars saved; 48 px, no sideways scroll');
      network.push(...cx.network);
      for (const e of cx.errors) fail(e);
      await cx.ctx.close();
    }

    // P2-32 El Tiempo at 380x780: the world is on the Spanish map; a round of days (listen) and a round of big numbers (read the numeral) are
    //    played with real taps; stars are saved under the stop id; choices are 48 px; nothing wider than the screen.
    {
      const ES_FX2 = require('./lib/es-fx.js');
      const et = await openApp(browser, { fixture: 'fresh', width: 380, height: 780 });
      const tp = et.page;
      await tp.evaluate(`(${ES_FX2.install})(['es-MX'])`);
      const lay = () => {
        const sm = a => (a.length ? Math.min(...a.map(b => Math.min(b.getBoundingClientRect().height, b.getBoundingClientRect().width))) : 0);
        return { w: document.documentElement.scrollWidth, ch: sm([...document.querySelectorAll('.ch')]), n: document.querySelectorAll('.ch').length };
      };
      const worldOk = await tp.evaluate(() => PATHS.es.worlds.some(w => w.id === 'e_tiempo') && NODES.es.some(n => n.sk === 'es_days' && n.lv === 1));
      if (!worldOk) fail('El Tiempo is not on the Spanish path');
      for (const [sk, lv] of [['es_days', 1], ['es_big', 2]]) {
        const idx = await tp.evaluate(([sk, lv]) => { const i = NODES.es.findIndex(n => n.sk === sk && n.lv === lv); S.maps.es[nid(NODES.es[i])] = 0; start('es', i); return i; }, [sk, lv]);
        await tp.waitForSelector('.ch');
        const l = await tp.evaluate(lay);
        if (l.w > 380 || l.ch < 48 || l.n !== 3) fail(`${sk}${lv} layout: ` + JSON.stringify(l));
        await playRound(tp, `P2-32 ${sk} level ${lv}`);
        const res = await tp.evaluate(i => ({ st: getSt('es', i), saved: JSON.parse(localStorage.getItem(KEY)).maps.es[nid(NODES.es[i])] }), idx);
        if (res.st < 1 || res.saved !== res.st) fail(`${sk}${lv}: stars not saved ` + JSON.stringify(res));
        else step(`P2-32: ${sk}${lv} earned ${res.st} star(s), saved under its stop id`);
        await tp.evaluate(() => { home(); document.querySelectorAll('.ovl').forEach(e => e.remove()); });
      }
      network.push(...et.network);
      for (const e of et.errors) fail(e);
      await et.ctx.close();
    }

    // P2-33 La Ciudad at 380x780: open the world from the Spanish map by id, play a verbs round (es_verb 1) and an adjectives round (es_adj 2)
    //    with real taps; stars saved, choices and the speaker 48 px or more, nothing wider than the screen.
    {
      const cx = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const cp = cx.page;
      await cp.evaluate(() => { S.unlockAll = true; save(); });
      const lay = () => ({ w: document.documentElement.scrollWidth, ch: Math.min(...[...document.querySelectorAll('.ch')].map(b => Math.min(b.getBoundingClientRect().height, b.getBoundingClientRect().width))),
        cap: document.querySelectorAll('.pcap small').length });
      for (const id of ['es_verb1', 'es_adj2']) {
        await cp.evaluate(() => { if (G) G.dead = true; home(); });
        await cp.click('.game[data-p="es"]');
        await cp.waitForSelector('.wchip.on');
        const at = await cp.evaluate(id => ({ i: NODES.es.findIndex(n => nid(n) === id), w: NODES.es.find(n => nid(n) === id).wi, wid: NODES.es.find(n => nid(n) === id).wid }), id);
        if (at.wid !== 'e_ciudad') fail('P2-33 ' + id + ' is not in La Ciudad: ' + JSON.stringify(at));
        await cp.click(`.wchip[data-w="${at.w}"]`);
        await cp.waitForSelector(`.wchip.on[data-w="${at.w}"]`);
        await cp.click(`.node[data-n="${at.i}"]`);
        await cp.waitForSelector('#go, .ch'); // the learn screen comes first on a level 1 stop
        if (await cp.$('#go')) await cp.click('#go');
        await cp.waitForSelector('.ch');
        const l = await cp.evaluate(lay);
        const g = await cp.evaluate(() => ({ sk: G.sk, lv: G.lv, hear: !!document.querySelector('.hear') }));
        if (l.w > 380 || l.ch < 48 || l.cap < 1 || g.sk !== id.slice(0, -1) || String(g.lv) !== id.slice(-1)) fail('P2-33 ' + id + ' layout: ' + JSON.stringify({ l, g }));
        await playRound(cp, 'P2-33 ' + id);
        const st = await cp.evaluate(id => S.maps.es[id] || 0, id);
        if (st < 1) fail('P2-33 ' + id + ' did not save stars');
      }
      step('P2-33: La Ciudad opened by id; verbs (level 1) and adjectives (level 2) rounds played with real taps, stars saved, 48 px choices, no sideways scroll');
      network.push(...cx.network);
      for (const e of cx.errors) fail(e);
      await cx.ctx.close();
    }

    // P3-11 Tangrams (src/js/80-bt-tangram.js) with real pointer input, midway save: touch at 380x780 (a 1st grader, band B, level 1)
    //    and mouse at 1024x600 (a 5th grader, band D, level 1). Home card -> hub -> Tangram -> level 1. Every move comes from the
    //    solution (the slot each piece fills, worked out from the board as it is, so pieces the hints placed are skipped): the piece is
    //    picked with a tap, turned with taps on it (touch) or the Turn button (mouse), flipped with Flip if needed, then dragged onto
    //    its slot's middle (with a small miss that the snap must correct) or, once, placed by tap-then-tap; each lands exactly in its
    //    slot. Also: a drag back to the tray, a piece dropped turned wrong gets the amber ring and Undo takes it back (mouse), hint tiers
    //    1-3 (1 and 2 move nothing, 3 places one), back and Keep going resume the same state, the win card, 1 star (3 hints) saved.
    //    Every screen: buttons and tray cells 48 px, the smallest piece on the board catchable at 48 px, no sideways scroll, no emoji.
    {
      const look = () => {
        const vw = document.documentElement.clientWidth, out = [];
        for (const e of document.querySelectorAll('button, [role="button"]')) {
          const r = e.getBoundingClientRect();
          if (!r.width || r.bottom < 0 || r.top > innerHeight || e.closest('svg') || e.closest('#toast')) continue;
          if (Math.min(r.width, r.height) < 47.5) out.push('small ' + (e.id || e.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (r.left < -1 || r.right > vw + 1 || (e.closest('.bt-play') && r.bottom > innerHeight + 1)) out.push('outside ' + (e.id || e.className) + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
        }
        if (document.documentElement.scrollWidth > vw) out.push('sideways scroll ' + document.documentElement.scrollWidth);
        const sv = document.querySelector('.tg-svg');
        if (sv) {
          const r = sv.getBoundingClientRect();
          if (r.right > vw + 1 || r.bottom > innerHeight + 1) out.push('the tangram board is outside the screen');
          const st = document.querySelector('#btstage');
          if (st && st.scrollHeight > st.clientHeight + 2) out.push('the puzzle needs scrolling');
          if (TG.cur) for (const i of TG.movable(TG.cur.p)) {
            const c = TG.cur.cell(i), e = TG.cur.st().pc[i];
            if (e.length == 2 && c && Math.min(c.w, c.h) < 48) out.push('tray cell ' + i + ' ' + c.w + 'x' + c.h);
            if (e.length == 4) { const b = TG.cur.box(i); if (Math.min(b.w, b.h) + 24 < 48) out.push('piece ' + i + ' is ' + Math.round(b.w) + 'x' + Math.round(b.h) + ' on the board'); }
          }
        }
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n; (n = w.nextNode());) {
          const el = n.parentElement;
          if (!el || el.closest('script,style,svg,#ico-sprite,.rw-burst') || !el.getClientRects().length) continue;
          const m = n.textContent.match(/\p{Extended_Pictographic}|[◀▶✕]/u);
          if (m) out.push('emoji chrome ' + m[0] + ' in ' + (el.id || el.className));
        }
        return out;
      };
      // the moves still to make, worked out from the board: [piece, k, f, x, y] for every slot nobody fills yet
      const rest = () => {
        const p = TG.cur.p, st = TG.cur.st(), { by, used } = TG.filled(p, st), out = [];
        for (let s = 0; s < 7; s++) {
          if (by[s] >= 0) continue;
          const i = TG.movable(p).find(j => TG.KIND[j] == TG.KIND[s] && !used.has(j) && !out.some(m => m[0] == j));
          const q = p.pcs[s];
          out.push([i, q[0], q[1], TG.num(q[2]), TG.num(q[3])]);
        }
        return out;
      };
      for (const [w, h, grade, touch] of [[380, 780, 1, true], [1024, 600, 5, false]]) {
        const tag = 'P3-11 ' + w + 'x' + h;
        const app = await openApp(browser, { fixture: 'midway', width: w, height: h });
        const pg = app.page, bad = [];
        const chk = async what => { for (const o of await pg.evaluate('(' + look.toString() + ')()')) bad.push(what + ': ' + o); };
        const cdp = await pg.context().newCDPSession(pg);
        if (touch) await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
        const tp = q => [{ x: q.x, y: q.y, radiusX: 6, radiusY: 6, id: 1 }];
        const tap = async q => {
          if (!touch) return pg.mouse.click(q.x, q.y);
          await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: tp(q) });
          await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        };
        const dragTo = async (a, b) => {
          const steps = 8;
          if (touch) {
            await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: tp(a) });
            for (let s = 1; s <= steps; s++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: tp({ x: a.x + (b.x - a.x) * s / steps, y: a.y + (b.y - a.y) * s / steps }) });
            await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
          } else {
            await pg.mouse.move(a.x, a.y);
            await pg.mouse.down();
            await pg.mouse.move(b.x, b.y, { steps });
            await pg.mouse.up();
          }
        };
        const at = i => pg.evaluate(i => TG.cur.at(i), i);
        const slotMid = m => pg.evaluate(m => TG.cur.page(TG.mid(TG.poly(TG.KIND[m[0]], m[1], m[2], m[3], m[4]))), m);
        const inSlot = m => pg.evaluate(m => { const e = TG.cur.st().pc[m[0]]; return e.length == 4 && TG.samePoly(TG.poly(TG.KIND[m[0]], ...e), TG.poly(TG.KIND[m[0]], m[1], m[2], m[3], m[4])); }, m);
        // pick the piece, turn and flip it like the move, then bring it in (drag with a miss of (dx, dy) px, or tap-then-tap)
        const play = async (m, how = 'drag', dx = 0, dy = 0) => {
          const [i, k, f] = m;
          if ((await pg.evaluate(() => TG.cur.sel())) !== i) await tap(await at(i));
          const e = await pg.evaluate(i => TG.cur.st().pc[i], i);
          for (let t = 0; t < (k - e[0] + 8) % 8; t++) { if (touch) await tap(await at(i)); else await pg.click('.tg-turn'); }
          if (e[1] !== f) await pg.click('.tg-flip');
          const q = await slotMid(m);
          if (how == 'tap') await tap(q);
          else await dragTo(await at(i), { x: q.x + dx, y: q.y + dy });
          await pg.waitForTimeout(60);
          if (!(await inSlot(m))) bad.push(`piece ${i} (${how}${dx || dy ? ', ' + dx + ',' + dy + ' px off' : ''}) did not land in its slot: ` + JSON.stringify(await pg.evaluate(i => TG.cur.st().pc[i], i)));
        };
        const pcOf = () => pg.evaluate(() => JSON.stringify(TG.cur.st().pc));
        await pg.evaluate(g => { S.grade = g; save(); home(); }, grade);
        await pg.waitForSelector('#btcard');
        await pg.waitForTimeout(450);
        await pg.evaluate(() => document.querySelector('#btcard').scrollIntoView({ block: 'center' }));
        await pg.click('#btcard');
        await pg.waitForSelector('.bt-hub [data-t="tangram"]');
        await pg.waitForTimeout(450);
        await chk('hub');
        await pg.click('[data-t="tangram"]');
        await pg.waitForSelector('.bt-lvs');
        await pg.waitForTimeout(450);
        await chk('levels');
        await pg.click('.bt-lv[data-l="1"]');
        await pg.waitForSelector('.tg-svg .tg-bs');
        await pg.waitForTimeout(450);
        await chk('play');
        const g0 = await pg.evaluate(() => ({ band: S.bt.cur.band, id: S.bt.cur.puzzle.id, n: TG.movable(S.bt.cur.puzzle).length, u: Math.round(TG.cur.u()), ut: Math.round(TG.cur.ut()) }));
        if (g0.band !== (grade === 1 ? 'B' : 'D') || g0.n !== (grade === 1 ? 4 : 7)) bad.push('band and pieces: ' + JSON.stringify(g0));
        let moves = await pg.evaluate('(' + rest.toString() + ')()');
        // first piece: tap-then-tap on touch; on the mouse it is first dropped turned wrong (amber ring, Undo takes it back)
        if (touch) await play(moves[0], 'tap');
        else {
          const m = moves[0];
          await tap(await at(m[0]));
          await pg.click('.tg-turn');
          const q = await slotMid(m);
          await dragTo(await at(m[0]), q);
          await pg.waitForTimeout(60);
          const wr = await pg.evaluate(i => ({ bad: !!document.querySelector(`.tg-pc[data-i="${i}"].bad`), msg: document.querySelector('.tg-msg').textContent, cls: document.querySelector('.tg-msg').className }), m[0]);
          if (!wr.bad || !/sticks out/.test(wr.msg) || !/try/.test(wr.cls)) bad.push('a piece dropped turned wrong: ' + JSON.stringify(wr));
          await chk('wrong piece');
          await pg.click('.tg-undo');
          const un = await pg.evaluate(i => TG.cur.st().pc[i].length, m[0]);
          if (un !== 2) bad.push('Undo did not take the piece back to the tray');
          await play(m, 'drag');
        }
        // second piece: dragged with a miss the snap corrects; then back to the tray and in again
        await play(moves[1], 'drag', 9, -7);
        const q1 = await at(moves[1][0]), tr = await pg.evaluate(() => { const r = document.querySelector('.tg-tray').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height - 20 }; });
        await dragTo(q1, tr);
        if ((await pg.evaluate(i => TG.cur.st().pc[i].length, moves[1][0])) !== 2) bad.push('a drag onto the tray did not put the piece back');
        await play(moves[1], 'drag', -6, 8);
        await chk('two pieces in');
        // hints: 1 shows a slot and picks its piece, 2 turns that piece, 3 puts it in; 1 and 2 move nothing
        const before = await pcOf();
        await pg.click('#bthint');
        const h1 = await pg.evaluate(() => ({ h: TG.cur.st().h, sel: TG.cur.sel(), shown: getComputedStyle(document.querySelector('.tg-hl')).display != 'none', msg: document.querySelector('.tg-msg').textContent }));
        if (h1.h < 0 || h1.sel < 0 || !h1.shown || !/yellow outline/.test(h1.msg) || (await pcOf()) !== before) bad.push('hint 1: ' + JSON.stringify(h1));
        await vwait(pg, 11500);
        await pg.click('#bthint');
        const h2 = await pg.evaluate(() => { const st = TG.cur.st(), s = st.h, i = TG.cur.sel(); return { s, i, k: st.pc[i], slot: TG.cur.p.pcs[s] }; });
        const b2 = JSON.parse(before), a2 = JSON.parse(await pcOf());
        if (h2.s !== h1.h || h2.k.length !== 2 || h2.k[0] !== h2.slot[0] || h2.k[1] !== h2.slot[1] || a2.some((e, j) => j !== h2.i && JSON.stringify(e) !== JSON.stringify(b2[j]))) bad.push('hint 2: ' + JSON.stringify(h2));
        await vwait(pg, 11500);
        await pg.click('#bthint');
        const h3 = await pg.evaluate(() => TG.cur.st().pc.filter(e => e && e.length == 4).length);
        if (h3 !== 3) bad.push('hint 3 put ' + h3 + ' pieces on the board, want one more than before');
        await pg.waitForTimeout(300);
        await chk('hint 3');
        // back, back, Keep going: the same puzzle and pieces
        const saved = await pg.evaluate(() => JSON.stringify([S.bt.cur.puzzle, S.bt.cur.state]));
        await pg.click('#back');
        await pg.waitForSelector('.bt-lvs');
        await pg.click('#back');
        await pg.waitForSelector('#btkeep');
        await pg.click('#btkeep');
        await pg.waitForSelector('.tg-svg .tg-bs');
        await pg.waitForTimeout(300);
        const rs = await pg.evaluate(() => ({ same: JSON.stringify([S.bt.cur.puzzle, S.bt.cur.state]), shown: JSON.stringify(TG.cur.st()), hints: S.bt.cur.hints }));
        if (rs.same !== saved || rs.shown !== JSON.stringify(JSON.parse(saved)[1]) || rs.hints !== 3) bad.push('resume: ' + JSON.stringify({ same: rs.same === saved, hints: rs.hints }));
        await chk('resumed');
        // the rest, by drags
        moves = await pg.evaluate('(' + rest.toString() + ')()');
        for (const m of moves) await play(m, 'drag', 5, 5);
        await pg.waitForSelector('.bt-win #btnext', { timeout: 8000 });
        await pg.waitForTimeout(700);
        await chk('win card');
        const win = await pg.evaluate(b => ({ stars: document.querySelectorAll('.bt-win .rs.on').length, cur: !!S.bt.cur, saved: ((S.bt.tangram || {})[b] || {}).stars, msg: document.querySelector('.tg-msg').textContent }), g0.band);
        if (win.stars !== 1 || win.cur || !win.saved || win.saved[0] !== 1 || !/You made the/.test(win.msg)) bad.push('win (3 hints = 1 star): ' + JSON.stringify(win));
        if (bad.length) fail(tag + ':\n  ' + bad.join('\n  '));
        else step(`${tag}: Home -> Brain Teasers -> Tangram -> band ${g0.band} level 1 (${g0.id}, ${g0.n} pieces, ${g0.u} px a unit on the board, ${g0.ut} in the tray) by ` +
          `${touch ? 'touch: tap-then-tap, turning by taps' : 'mouse: turning with the Turn button, a wrong drop rings amber and Undo takes it back'}; drags with a miss snap into ` +
          `the slot, a drag to the tray puts a piece back, hints 1-2 move nothing and 3 places one, Keep going resumes, win card, 1 star saved; ` +
          `48 px targets, no sideways scroll, no emoji chrome`);
        network.push(...app.network);
        for (const e of app.errors) fail(e);
        await app.ctx.close();
      }
    }

    // P3-13 Robot Path (src/js/81-bt-robot.js) with real taps, midway save: band A (a Pre-K child, level 8: a gem) at 380x780, band C
    //    (a 3rd grader, level 6) and band D (a 5th grader, level 11: the function) at 1024x600: Home -> Brain Teasers -> Robot Path ->
    //    the level; a program that bumps, Go: the run fails gently (the robot wobbles, the block that bumped is amber with a dashed
    //    ring and a warning mark, never red; one mistake), Undo takes the blocks away; hint tiers 1 and 2 mark the place and show the
    //    right block faintly (the program does not change), tier 3 puts one right block in; back to the levels and the hub, Keep going
    //    resumes exactly; the rest of solve() tapped in, Go, the robot reaches the flag, win card, 1 star (three hints) saved.
    //    Every screen: 48 px targets, nothing outside the screen, no sideways scroll, the puzzle fits without scrolling, no emoji chrome.
    {
      const taps = require('./lib/bt-rb');
      const look = () => {
        const vw = document.documentElement.clientWidth, out = [];
        for (const e of document.querySelectorAll('button, [role="button"]')) {
          const r = e.getBoundingClientRect();
          if (!r.width || r.bottom < 0 || r.top > innerHeight || e.closest('svg') || e.closest('#toast')) continue;
          if (Math.min(r.width, r.height) < 47.5) out.push('small ' + (e.id || e.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (r.left < -1 || r.right > vw + 1) out.push('outside ' + (e.id || e.className) + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
        }
        if (document.documentElement.scrollWidth > vw) out.push('sideways scroll ' + document.documentElement.scrollWidth);
        const stg = document.querySelector('#btstage');
        if (stg && stg.scrollWidth > stg.clientWidth + 1) out.push('the puzzle scrolls sideways');
        if (stg && document.querySelector('#btstage .rb') && stg.scrollHeight > stg.clientHeight + 1) out.push('the puzzle does not fit: ' + stg.scrollHeight + ' > ' + stg.clientHeight);
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n; (n = w.nextNode());) {
          const el = n.parentElement;
          if (!el || el.closest('script,style,svg,#ico-sprite,.rw-burst') || !el.getClientRects().length) continue;
          const m = n.textContent.match(/\p{Extended_Pictographic}|[◀▶✕]/u);
          if (m) out.push('emoji chrome ' + m[0] + ' in ' + (el.id || el.className));
        }
        return out;
      };
      const prog = pg => pg.evaluate(() => JSON.stringify([RB.cur.st().m, RB.cur.st().f]));
      for (const [w, h, grade, lv, want] of [[380, 780, 0, 8, 'A'], [1024, 600, 3, 6, 'C'], [1024, 600, 5, 11, 'D']]) {
        const tag = 'P3-13 ' + w + 'x' + h + ' band ' + want;
        const app = await openApp(browser, { fixture: 'midway', width: w, height: h });
        const pg = app.page, bad = [], notes = [];
        const chk = async what => { for (const o of await pg.evaluate('(' + look.toString() + ')()')) bad.push(what + ': ' + o); };
        await pg.evaluate(() => { window.say = () => {}; });
        await pg.evaluate(([g, lv]) => { S.grade = g; if (lv > 1) BT.rec('robot', BT.band(), true).lvl = lv; save(); home(); }, [grade, lv]);
        await pg.waitForSelector('#btcard');
        await pg.evaluate(() => document.querySelector('#btcard').scrollIntoView({ block: 'center' }));
        await pg.click('#btcard');
        await pg.waitForSelector('.bt-hub .bt-type[data-t="robot"]');
        await pg.waitForTimeout(400);
        await pg.evaluate(() => document.querySelector('.bt-type[data-t="robot"]').scrollIntoView({ block: 'center' }));
        await pg.click('.bt-type[data-t="robot"]');
        await pg.waitForSelector('.bt-lvs');
        await pg.click(`.bt-lv[data-l="${lv}"]`);
        await pg.waitForSelector('#btstage .rb');
        await pg.waitForTimeout(400);
        await chk('play');
        const p0 = await pg.evaluate(() => ({ band: RB.cur.p.b, kit: RB.cur.p.kit, par: RB.cur.p.par, slots: RB.cur.p.slots, n: RB.cur.p.n,
          pal: [...document.querySelectorAll('.rb-p')].map(b => b.dataset.t).join(' '), words: document.querySelectorAll('.rb-p span').length }));
        const wantPal = { A: 'up lf dn rt', C: 'fw tl tr rep', D: 'fw tl tr rep fn' }[want];
        if (p0.band !== want || p0.pal !== wantPal || (want === 'A') !== (p0.words === 0)) bad.push('world: ' + JSON.stringify(p0) + ', want band ' + want + ' with ' + wantPal);
        notes.push(`${p0.n}x${p0.n}, par ${p0.par} in ${p0.slots} slots`);

        // a failed run, shown gently: the robot wobbles, the bumping block is amber (never red) with a dashed ring and a warning mark
        const bp = await taps.bump(pg);
        await taps.go(pg);
        const g = await pg.evaluate(() => {
          const e = document.querySelector('.rb-strip .rb-b.bad'), css = getComputedStyle(document.documentElement), msg = document.querySelector('.rb-msg');
          const rgb = v => { const d = document.createElement('i'); d.style.color = v; document.body.appendChild(d); const x = getComputedStyle(d).color; d.remove(); return x; };
          return { found: !!e, bg: e && getComputedStyle(e).backgroundColor, dashed: e && getComputedStyle(e).outlineStyle, warn: !!(e && e.querySelector('.rb-warn')),
            tryTint: rgb(css.getPropertyValue('--try-tint')), red: rgb(css.getPropertyValue('--danger')), tryInk: rgb(css.getPropertyValue('--try-ink')),
            msg: msg.textContent, cls: msg.className, msgColor: getComputedStyle(msg).color, miss: S.bt.cur.state.miss,
            wob: document.querySelector('.rb-body').classList.contains('wob'), bonk: document.querySelector('.rb-bonk').getAttribute('visibility') };
        });
        if (!bp || !g.found || g.bg !== g.tryTint || g.bg === g.red || g.dashed !== 'dashed' || !g.warn || !/try/.test(g.cls) || g.msgColor !== g.tryInk ||
          g.miss !== 1 || !g.wob || g.bonk !== 'visible' || !/^Bump!/.test(g.msg)) bad.push('the failed run is not shown gently: ' + JSON.stringify(g));
        notes.push('a bump: "' + g.msg + '"');
        await chk('failed run');
        for (const _ of bp.m) await pg.click('.rb-undo');
        if ((await prog(pg)) !== '[[],[]]' || (await pg.evaluate(() => S.bt.cur.state.miss)) !== 1) bad.push('Undo should empty the program and keep the mistake: ' + await prog(pg));

        // hint tiers 1 and 2 point and show the block faintly; the program does not change. Tier 3 puts one right block in.
        await pg.click('#bthint');
        await vwait(pg, 200);
        const t1 = await pg.evaluate(() => ({ mark: document.querySelectorAll('.rb-ghost.rb-gslot, .rb-b.hint').length, msg: document.querySelector('.rb-msg').textContent, hints: S.bt.cur.hints }));
        if (!t1.mark || t1.hints !== 1 || (await prog(pg)) !== '[[],[]]') bad.push('hint 1: ' + JSON.stringify(t1));
        await vwait(pg, 11500);
        await pg.click('#bthint');
        await vwait(pg, 200);
        const t2 = await pg.evaluate(() => ({ ghost: document.querySelectorAll('.rb-ghost:not(.rb-gslot)').length, msg: document.querySelector('.rb-msg').textContent, hints: S.bt.cur.hints }));
        if (!t2.ghost || t2.hints !== 2 || t2.msg === t1.msg || (await prog(pg)) !== '[[],[]]') bad.push('hint 2 should show the block faintly and change nothing: ' + JSON.stringify(t2));
        notes.push('hint 1: "' + t1.msg + '"; hint 2: "' + t2.msg + '"');
        await chk('hint 2');
        await vwait(pg, 11500);
        await pg.click('#bthint');
        await vwait(pg, 200);
        const t3 = await pg.evaluate(() => { const st = RB.cur.st(), sol = BT.get('robot').solve(RB.cur.p); return { m: st.m, n: RB.count(st), first: sol.m[0], hints: S.bt.cur.hints }; });
        if (t3.n !== 1 || t3.m[0] !== t3.first || t3.hints !== 3) bad.push('hint 3 should put in one right block: ' + JSON.stringify(t3));

        // back to the levels and the hub: Keep going brings back the same program
        const mid = await pg.evaluate(() => JSON.stringify(S.bt.cur.state));
        await pg.click('#back');
        await pg.waitForSelector('.bt-lvs');
        await pg.click('#back');
        await pg.waitForSelector('#btkeep');
        await pg.click('#btkeep');
        await pg.waitForSelector('#btstage .rb');
        if ((await pg.evaluate(() => JSON.stringify(S.bt.cur.state))) !== mid || (await pg.evaluate(() => JSON.stringify(RB.cur.st()))) !== mid) bad.push('Keep going did not resume exactly');

        // the rest by taps, Go, the robot reaches the flag: win card, 1 star (three hints), the next level open
        await taps.build(pg, await taps.rest(pg));
        const full = await pg.evaluate(() => { const sol = BT.get('robot').solve(RB.cur.p), st = RB.cur.st(); return JSON.stringify([st.m, st.f]) === JSON.stringify([sol.m, sol.f]); });
        if (!full) bad.push('the program built by taps is not solve(): ' + await prog(pg));
        await chk('built');
        // watch every frame while it runs (real time, the app's clock is faster): the blocks light up one after the other, Go reads Stop
        await pg.evaluate(() => {
          const seen = window.__rbSeen = { keys: [], stop: false, moved: 0 }, bot = document.querySelector('.rb-bot'), t0 = bot.style.transform;
          const f = () => {
            if (!RB.cur) return;
            if (RB.cur.busy()) {
              const k = [...document.querySelectorAll('.rb-strip .rb-b.on')].map(e => e.dataset.s + e.dataset.i).join();
              if (k && seen.keys[seen.keys.length - 1] !== k) seen.keys.push(k);
              if (/Stop/.test(document.querySelector('.rb-go').textContent)) seen.stop = true;
              if (bot.style.transform !== t0) seen.moved++;
            }
            if (!RB.cur.won()) requestAnimationFrame(f);
          };
          requestAnimationFrame(f);
        });
        await pg.click('.rb-go');
        try { await pg.waitForSelector('.bt-win #btlvls', { timeout: 30000 }); } catch (e) { bad.push('no win card'); }
        const running = await pg.evaluate(() => window.__rbSeen);
        if (running.keys.length < 3 || !running.stop || !running.moved) bad.push('the run is not shown step by step: ' + JSON.stringify(running));
        notes.push(`the run lit ${running.keys.length} blocks in turn`);
        await pg.waitForTimeout(700);
        await chk('win card');
        const saved = await pg.evaluate(([b, lv]) => ({ stars: BT.rec('robot', b).stars[lv - 1] || 0, lvl: BT.rec('robot', b).lvl, cur: !!S.bt.cur,
          shown: document.querySelectorAll('.bt-win .rs.on').length }), [want, lv]);
        if (saved.lvl !== lv + 1 || saved.cur || saved.shown !== saved.stars || saved.stars !== 1) bad.push('stars not saved ' + JSON.stringify(saved));
        notes.push(`won with ${saved.stars} star`);
        if (bad.length) fail(tag + ':\n  ' + bad.join('\n  '));
        else step(`${tag}: Home -> Brain Teasers -> Robot Path -> level ${lv}: ${notes.join('; ')}; the failed run shown gently in amber and counted, ` +
          `Undo, hints 1-2 change nothing, hint 3 puts one block in, Keep going resumes exactly, the run shown step by step; targets 48 px, ` +
          `no sideways scroll, the puzzle fits, no emoji chrome`);
        network.push(...app.network);
        for (const e of app.errors) fail(e);
        await app.ctx.close();
      }
    }

    // P3-16 Spatial: Cube Count, Turn It, Mirror (src/js/84-86-bt-*.js) with real taps, midway save (tools/lib/bt-p316.js):
    //    380x780: Home -> Brain Teasers -> Cubes (a 1st grader, band B): a wrong number shown gently, hints 1-3 (words, the layers, the
    //    layer counts that add up), every stack typed on the pad, win, 1 star saved; -> Turn It (PK, band A): a wrong shadow shown
    //    gently, the rest tapped, 3 stars; -> Mirror (a 3rd grader, band C): a wrong square shown gently, hint 1, back to the hub and
    //    Keep going resumes the same squares, the rest tapped, 2 stars.
    //    1024x600 (a 5th grader, band D): Turn It: the mirror image tapped ("flipped"), hints 1-2 (the four turns), every shape, 1 star;
    //    Cubes and Mirror played straight through, 3 stars each. Every screen: 48 px targets (grid squares 44, BRAIN_TEASERS 8),
    //    nothing outside the screen, no sideways scroll, the puzzle does not scroll, no emoji chrome.
    {
      const P = require('./lib/bt-p316');
      const look = () => {
        const vw = document.documentElement.clientWidth, out = [];
        for (const e of document.querySelectorAll('button, [role="button"]')) {
          const r = e.getBoundingClientRect();
          if (!r.width || r.bottom < 0 || r.top > innerHeight || e.closest('svg') || e.closest('#toast')) continue;
          const min = e.classList.contains('mr-cell') ? 43.5 : 47.5;
          if (Math.min(r.width, r.height) < min) out.push('small ' + (e.id || e.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (r.left < -1 || r.right > vw + 1 || r.bottom > innerHeight + 1) out.push('outside ' + (e.id || e.className) + ' ' + Math.round(r.left) + '..' + Math.round(r.right) + ' bottom ' + Math.round(r.bottom));
        }
        if (document.documentElement.scrollWidth > vw) out.push('sideways scroll ' + document.documentElement.scrollWidth);
        const st = document.querySelector('.bt-stage');
        if (st && st.scrollWidth > st.clientWidth + 1) out.push('the puzzle scrolls sideways ' + st.scrollWidth + ' > ' + st.clientWidth);
        if (st && !document.querySelector('.bt-win') && st.scrollHeight > st.clientHeight + 1) out.push('the puzzle scrolls ' + st.scrollHeight + ' > ' + st.clientHeight);
        const b = document.querySelector('.cb-board,.ro-card,.mr-board');
        if (b && !document.querySelector('.bt-win')) { const r = b.getBoundingClientRect(); if (r.left < -1 || r.right > vw + 1 || r.bottom > innerHeight + 1 || r.height < 100) out.push('the drawing is outside or tiny ' + JSON.stringify([r.left, r.right, r.bottom, r.height])); }
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n; (n = w.nextNode());) {
          const el = n.parentElement;
          if (!el || el.closest('script,style,svg,#ico-sprite,.rw-burst') || !el.getClientRects().length) continue;
          const m = n.textContent.match(/\p{Extended_Pictographic}|[◀▶✕]/u);
          if (m) out.push('emoji chrome ' + m[0] + ' in ' + (el.id || el.className));
        }
        return out;
      };
      const gentle = sel => {
        const e = document.querySelector(sel), css = getComputedStyle(document.documentElement);
        const rgb = v => { const d = document.createElement('i'); d.style.color = v; document.body.appendChild(d); const x = getComputedStyle(d).color; d.remove(); return x; };
        return { text: e.textContent, color: getComputedStyle(e).color, ink: rgb(css.getPropertyValue('--try-ink')), red: rgb(css.getPropertyValue('--danger')) };
      };
      const hintNow = async (pg, wait) => { if (wait) await vwait(pg, 11500); await pg.click('#bthint'); await vwait(pg, 300); };
      const open = async (pg, id, grade, viaHome) => {
        await pg.evaluate(g => { S.grade = g; save(); }, grade);
        if (viaHome) {
          await pg.evaluate(() => home());
          await pg.waitForSelector('#btcard');
          await pg.evaluate(() => document.querySelector('#btcard').scrollIntoView({ block: 'center' }));
          await pg.click('#btcard');
        } else await pg.evaluate(() => BT.hub());
        await pg.waitForSelector(`.bt-hub [data-t="${id}"]`);
        await pg.evaluate(id => document.querySelector(`.bt-hub [data-t="${id}"]`).scrollIntoView({ block: 'center' }), id);
        await pg.click(`.bt-hub [data-t="${id}"]`);
        await pg.waitForSelector('.bt-lvs');
        await pg.click('.bt-lv[data-l="1"]');
      };
      const won = async (pg, id, band, stars, bad, chk) => {
        await pg.waitForSelector('.bt-win #btnext', { timeout: 15000 });
        await vwait(pg, 700);
        await chk(id + ' win card');
        const w = await pg.evaluate(([id, b]) => ({ shown: document.querySelectorAll('.bt-win .rs.on').length, saved: S.bt[id] && S.bt[id][b] && S.bt[id][b].stars[0],
          lvl: S.bt[id] && S.bt[id][b].lvl, cur: !!S.bt.cur }), [id, band]);
        if (w.shown !== stars || w.saved !== stars || w.lvl !== 2 || w.cur) bad.push(id + ' win: ' + JSON.stringify(w) + ' (want ' + stars + ' stars)');
        await pg.click('#btlvls');
        await pg.waitForSelector('.bt-lvs');
        await pg.click('#back');
        await pg.waitForSelector('.bt-hub');
      };
      for (const [w, h] of [[380, 780], [1024, 600]]) {
        const tag = 'P3-16 ' + w + 'x' + h;
        const app = await openApp(browser, { fixture: 'midway', width: w, height: h });
        const pg = app.page, bad = [], notes = [];
        const chk = async what => { await pg.waitForTimeout(400); for (const o of await pg.evaluate('(' + look.toString() + ')()')) bad.push(what + ': ' + o); };
        if (w == 380) {
          // ---- Cubes, band B: a wrong number, hints 1-3, every stack ----
          await open(pg, 'cubes', 1, true);
          await pg.waitForSelector('#btstage .cb-pad');
          await chk('cubes');
          const s0 = await pg.evaluate(() => S.stars), c0 = await P.cbNow(pg);
          await P.cbType(pg, c0.n + 1);
          const cw = await pg.evaluate(() => ({ no: document.querySelector('.cb-box').classList.contains('no'), miss: S.bt.cur.state.miss, i: S.bt.cur.state.i }));
          const cg = await pg.evaluate('(' + gentle.toString() + ')(".cb-msg")');
          if (!cw.no || cw.miss !== 1 || cw.i !== 0 || cg.color !== cg.ink || cg.color === cg.red) bad.push('a wrong count is not shown gently: ' + JSON.stringify([cw, cg]));
          else notes.push('"' + cg.text + '"');
          const hs = [];
          for (let t = 1; t <= 3; t++) {
            await hintNow(pg, t > 1);
            hs.push(await pg.evaluate(() => ({ msg: document.querySelector('.cb-msg').textContent, ly: document.querySelectorAll('.cb-ly').length,
              nums: [...document.querySelectorAll('.cb-ly b')].map(b => +b.textContent), want: CUB.layers(S.bt.cur.puzzle.items[S.bt.cur.state.i].hm), hints: S.bt.cur.hints })));
          }
          if (hs[0].ly || hs[1].ly !== hs[1].want.length || hs[1].nums.length || hs[2].nums.join() !== hs[2].want.join() || hs[2].nums.reduce((a, b) => a + b, 0) !== c0.n ||
            hs[2].hints !== 3 || new Set(hs.map(x => x.msg)).size !== 3) bad.push('cube hints 1-3: ' + JSON.stringify(hs));
          await chk('cubes hint 3');
          await P.cbWin(pg);
          await won(pg, 'cubes', 'B', 1, bad, chk);
          if ((await pg.evaluate(() => S.stars)) !== s0 + 1) bad.push('cubes: the star was not paid');
          notes.push('cubes B: layers ' + hs[2].nums.join(' + ') + ', 1 star');

          // ---- Turn It, band A: a wrong shadow, the rest ----
          await open(pg, 'rotate', 0, false);
          await pg.waitForSelector('#btstage .ro-ch');
          await chk('turn it A');
          if (await pg.evaluate(() => document.querySelectorAll('.ro-ch .ro-sh').length) !== 3) bad.push('band A should show 3 shadows');
          const r0 = await P.roNow(pg);
          await P.roTap(pg, r0.wrong);
          const rw = await pg.evaluate(c => ({ cls: document.querySelector(`.ro-ch[data-c="${c}"]`).className, miss: S.bt.cur.state.miss }), r0.wrong);
          const rg = await pg.evaluate('(' + gentle.toString() + ')(".ro-msg")');
          if (!/wrong/.test(rw.cls) || rw.miss !== 1 || rg.color !== rg.ink || rg.color === rg.red) bad.push('a wrong shadow is not shown gently: ' + JSON.stringify([rw, rg]));
          else notes.push('"' + rg.text + '"');
          await P.roWin(pg);
          await won(pg, 'rotate', 'A', 3, bad, chk);
          notes.push('turn it A: 3 stars');

          // ---- Mirror, band C: a wrong square, hint 1, back and resume, the rest ----
          await open(pg, 'mirror', 3, false);
          await pg.waitForSelector('#btstage .mr-cell.t');
          await chk('mirror C');
          const m0 = await P.mrNow(pg);
          await P.mrTap(pg, m0.wrong);
          const mw = await pg.evaluate(i => ({ no: document.querySelector(`.mr-cell[data-i="${i}"]`).classList.contains('no'), on: document.querySelector(`.mr-cell[data-i="${i}"]`).classList.contains('on'),
            miss: S.bt.cur.state.miss }), m0.wrong);
          const mg = await pg.evaluate('(' + gentle.toString() + ')(".mr-msg")');
          if (!mw.no || mw.on || mw.miss !== 1 || mg.color !== mg.ink || mg.color === mg.red) bad.push('a wrong square is not shown gently: ' + JSON.stringify([mw, mg]));
          else notes.push('"' + mg.text + '"');
          await P.mrFill(pg, 2);
          await hintNow(pg, false);
          const mh = await pg.evaluate(() => ({ glow: !!document.querySelector('.mr-line.glow'), hints: S.bt.cur.hints, on: S.bt.cur.state.on.length }));
          if (!mh.glow || mh.hints !== 1 || mh.on !== 2) bad.push('mirror hint 1: ' + JSON.stringify(mh));
          const keep = await pg.evaluate(() => JSON.stringify([S.bt.cur.puzzle, S.bt.cur.state.on]));
          await pg.click('#back');
          await pg.waitForSelector('.bt-lvs');
          await pg.click('#back');
          await pg.waitForSelector('#btkeep');
          await pg.click('#btkeep');
          await pg.waitForSelector('#btstage .mr-cell.t');
          const back = await pg.evaluate(() => ({ s: JSON.stringify([S.bt.cur.puzzle, S.bt.cur.state.on]), on: document.querySelectorAll('.mr-cell.t.on').length }));
          if (back.s !== keep || back.on !== 2) bad.push('mirror resume: ' + JSON.stringify(back));
          await P.mrFill(pg);
          await won(pg, 'mirror', 'C', 2, bad, chk);
          notes.push('mirror C: resumed, ' + m0.all + ' squares, 2 stars');
        } else {
          // ---- Turn It, band D: the mirror image, hints 1-2, every shape ----
          await open(pg, 'rotate', 5, true);
          await pg.waitForSelector('#btstage .ro-ch');
          await chk('turn it D');
          const r0 = await P.roNow(pg);
          await P.roTap(pg, r0.flip);
          const rg = await pg.evaluate('(' + gentle.toString() + ')(".ro-msg")');
          if (!/flipped/.test(rg.text) || rg.color !== rg.ink) bad.push('the mirror image tap should say it is flipped: ' + JSON.stringify(rg));
          else notes.push('"' + rg.text + '"');
          await hintNow(pg, false);
          await hintNow(pg, true);
          const rh = await pg.evaluate(() => ({ turns: document.querySelectorAll('.ro-turns .ro-tn').length, hints: S.bt.cur.hints, off: document.querySelectorAll('.ro-ch.off').length }));
          if (rh.turns !== 4 || rh.hints !== 2 || rh.off) bad.push('turn it hint 2 should show the four turns: ' + JSON.stringify(rh));
          await chk('turn it D hint 2');
          await P.roWin(pg);
          await won(pg, 'rotate', 'D', 1, bad, chk);
          // ---- Cubes and Mirror, band D, straight through ----
          await open(pg, 'cubes', 5, false);
          await pg.waitForSelector('#btstage .cb-pad');
          await chk('cubes D');
          await P.cbWin(pg);
          await won(pg, 'cubes', 'D', 3, bad, chk);
          await open(pg, 'mirror', 5, false);
          await pg.waitForSelector('#btstage .mr-cell.t');
          await chk('mirror D');
          await P.mrFill(pg);
          await won(pg, 'mirror', 'D', 3, bad, chk);
          notes.push('turn it D 1 star, cubes D and mirror D 3 stars');
        }
        if (bad.length) fail(tag + ':\n  ' + bad.join('\n  '));
        else step(tag + ': Home -> Brain Teasers -> ' + notes.join('; ') + '; targets 48 px (grid 44), no sideways scroll, no emoji chrome');
        await vwait(pg, 300);
        network.push(...app.network);
        for (const e of app.errors) fail(e);
        await app.ctx.close();
      }
    }

    // P3-17 Puzzle of the Day and badges (midway save, a 3rd grader). At 380x780: Home shows the daily card (the fake type of
    //    tools/lib/bt-fake.js is made today's pick so it can be won by real taps), it is played to a win from Home, coins and game time
    //    are paid once (Again pays no coins), the win card reveals the badge, Home and the hub show the daily done, the badges view
    //    opens from the hub, the same level left three times offers the band below. Then the badges view and Home at 1024x600, and
    //    every registered type's play top bar at 380x780 in bands C and D with the timer at 59:59: the whole name shows, beside the
    //    timer, in at most two lines. 48 px targets, no sideways scroll, no emoji chrome.
    {
      const fake = require('./lib/bt-fake');
      const look = () => {
        const vw = document.documentElement.clientWidth, out = [];
        for (const e of document.querySelectorAll('button, [role="button"]')) {
          const r = e.getBoundingClientRect();
          if (!r.width || r.bottom < 0 || r.top > innerHeight || e.closest('svg') || e.closest('#toast')) continue;
          if (Math.min(r.width, r.height) < 47.5) out.push('small ' + (e.id || e.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (r.left < -1 || r.right > vw + 1) out.push('outside ' + (e.id || e.className) + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
        }
        if (document.documentElement.scrollWidth > vw) out.push('sideways scroll ' + document.documentElement.scrollWidth);
        for (const s of document.querySelectorAll('.scroll')) if (s.scrollWidth > s.clientWidth + 1) out.push('sideways scroll in ' + s.className);
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n; (n = w.nextNode());) {
          const el = n.parentElement;
          if (!el || el.closest('script,style,svg,#ico-sprite,.fk,.rw-burst,#pet') || !el.getClientRects().length) continue;
          const m = n.textContent.match(/\p{Extended_Pictographic}|[◀▶✕]/u);
          if (m) out.push('emoji chrome ' + m[0] + ' in ' + (el.id || el.className));
        }
        return out;
      };
      const bad = [];
      const da = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const pg = da.page;
      const chk = async what => { for (const o of await pg.evaluate('(' + look.toString() + ')()')) bad.push(what + ': ' + o); };
      await pg.evaluate('(' + fake.install.toString() + ')()');
      await pg.evaluate(() => { S.grade = 3; S.bt = { daily: { day: today(), done: [], pick: { id: 'zzfake', band: 'C', level: 1 } } }; save(); home(); });
      await pg.waitForSelector('#hmday');
      await pg.evaluate(() => document.querySelector('#hmday').scrollIntoView({ block: 'center' }));
      await pg.waitForTimeout(450);
      await chk('home');
      const card = await pg.evaluate(() => ({ t: document.querySelector('#hmday').textContent, art: !!document.querySelector('#hmday .hm-svg'), done: document.querySelector('#hmday').classList.contains('done') }));
      if (!/Puzzle of the Day/.test(card.t) || !/Star Taps, level 1/.test(card.t) || !/\+5/.test(card.t) || !card.art || card.done) bad.push('Home card: ' + JSON.stringify(card));
      const s0 = await pg.evaluate(() => ({ coins: S.coins, bank: pt().bank, stars: S.stars }));
      await pg.click('#hmday');
      await pg.waitForSelector('#btstage .fkt');
      const cur = await pg.evaluate(() => [S.bt.cur.id, S.bt.cur.band, S.bt.cur.level].join());
      if (cur !== 'zzfake,C,1') bad.push('the Home card opened ' + cur);
      const lit = await pg.evaluate(() => S.bt.cur.puzzle.lit);
      for (let i = 0; i < 3; i++) await pg.click(`.fkt[data-i="${lit}"]`);
      await pg.waitForSelector('.bt-win #btnext');
      await pg.waitForTimeout(1200); // the medal pops in after the card
      await chk('win card');
      const win = await pg.evaluate(() => {
        const m = document.querySelector('.bt-win .bt-nb .bd-m');
        return { coins: S.coins, bank: pt().bank, stars: S.stars, line: /\+5 coins for the Puzzle of the Day/.test(document.querySelector('.bt-win').textContent),
          nb: document.querySelector('.bt-win .bt-nb') ? document.querySelector('.bt-win .bt-nb').textContent : '', medal: !!m && +getComputedStyle(m).opacity > .99,
          got: !!(S.bt.badges && S.bt.badges.got['first.zzfake']), done: S.bt.daily.done.join() };
      });
      if (win.coins !== s0.coins + 5 || !(win.bank > s0.bank) || win.stars !== s0.stars + 3 || !win.line || !/First Star Taps/.test(win.nb) || !win.medal || !win.got || win.done !== 'zzfake')
        bad.push('daily win: ' + JSON.stringify({ s0, win }));
      // Again: the same level, no coins and no badge the second time
      await pg.click('#btagain');
      await pg.waitForSelector('#btstage .fkt');
      const lit2 = await pg.evaluate(() => S.bt.cur.puzzle.lit);
      for (let i = 0; i < 3; i++) await pg.click(`.fkt[data-i="${lit2}"]`);
      await pg.waitForSelector('.bt-win #btlvls');
      const again = await pg.evaluate(() => ({ coins: S.coins, nb: !!document.querySelector('.bt-win .bt-nb') }));
      if (again.coins !== win.coins || again.nb) bad.push('second win paid again: ' + JSON.stringify(again));
      // Home and the hub show it done
      await pg.evaluate(() => { document.querySelectorAll('.bt-win').forEach(e => e.remove()); home(); });
      await pg.waitForSelector('#hmday.done');
      if (!/Done!/.test(await pg.evaluate(() => document.querySelector('#hmday').textContent))) bad.push('Home card not done');
      await pg.click('#hmday'); // done: opens the hub
      await pg.waitForSelector('#btday');
      await pg.waitForTimeout(450);
      await chk('hub');
      const hub = await pg.evaluate(() => ({ day: document.querySelector('#btday').textContent, bdg: document.querySelector('#btbdg').textContent, mini: document.querySelectorAll('#btbdg .bd-m.on').length }));
      if (!/Done!/.test(hub.day) || !/1 badge/.test(hub.bdg) || hub.mini !== 1) bad.push('hub: ' + JSON.stringify(hub));
      // the badges view from the hub
      await pg.click('#btbdg');
      await pg.waitForSelector('.bd-grid');
      await pg.waitForTimeout(450);
      await chk('badges 380x780');
      const bv = await pg.evaluate(() => ({ got: [...document.querySelectorAll('.bd-t.got')].map(e => e.dataset.b), n: document.querySelectorAll('.bd-t').length,
        art: [...document.querySelectorAll('.bd-t')].every(e => e.querySelector('svg.bd-m')), chip: document.querySelector('.top .stat b').textContent }));
      if (bv.got.join() !== 'first.zzfake' || bv.n < 10 || !bv.art || bv.chip !== '1') bad.push('badges view: ' + JSON.stringify(bv));
      await pg.click('.bd-t[data-b="n10"]');
      await vwait(pg, 300);
      if (!/Solve 10 puzzles/.test(await pg.evaluate(() => (document.querySelector('#toast') || {}).textContent || ''))) bad.push('tapping a badge does not say what it is for');
      await pg.click('#back');
      await pg.waitForSelector('#btday');
      // leaving level 2 three times offers level 2 of the band below
      await pg.click('[data-t="zzfake"]');
      await pg.waitForSelector('.bt-lvs');
      for (let i = 0; i < 3; i++) {
        await pg.click('.bt-lv[data-l="2"]');
        await pg.waitForSelector('#btstage .fkt');
        await pg.click('#back');
        await pg.waitForSelector('.bt-lvs');
      }
      await pg.waitForSelector('#btlow');
      await pg.waitForTimeout(450);
      await chk('offer sheet');
      await pg.click('#btlow');
      await pg.waitForSelector('#btstage .fkt');
      const low = await pg.evaluate(() => [S.bt.cur.band, S.bt.cur.level].join());
      if (low !== 'B,2') bad.push('the offer opened ' + low);
      network.push(...da.network);
      for (const e of da.errors) fail(e);
      await da.ctx.close();
      // 1024x600: Home card and the badges view with some puzzle work
      const db = await openApp(browser, { fixture: 'midway', width: 1024, height: 600 });
      const pb = db.page;
      const chkb = async what => { for (const o of await pb.evaluate('(' + look.toString() + ')()')) bad.push(what + ': ' + o); };
      await pb.evaluate(() => {
        S.grade = 3;
        S.bt = { sudoku: { C: { lvl: 13, stars: [3, 3, 2, 3, 3, 3, 1, 2, 3, 3, 3, 2], endless: 0 } }, maze: { C: { lvl: 3, stars: [3, 2], endless: 0 } } };
        save(); home();
      });
      await pb.waitForSelector('#hmday');
      await pb.waitForTimeout(450);
      await chkb('home 1024x600');
      await pb.evaluate(() => BT.hub());
      await pb.waitForSelector('#btsee'); // a save from before badges: its badges are revealed once
      await pb.waitForTimeout(450);
      await chkb('badge sheet 1024x600');
      await pb.click('#btsee');
      await pb.waitForSelector('.bd-grid');
      await pb.waitForTimeout(450);
      await chkb('badges 1024x600');
      const bw = await pb.evaluate(() => ({ got: [...document.querySelectorAll('.bd-t.got')].map(e => e.dataset.b).sort().join(), cols: getComputedStyle(document.querySelector('.bd-grid')).gridTemplateColumns.split(' ').length }));
      if (bw.got !== 'all.sudoku.C,first.maze,first.sudoku,n10' || bw.cols < 5) bad.push('badges 1024x600: ' + JSON.stringify(bw));
      await pb.evaluate(() => BT.hub());
      if (await pb.$('#btsee')) bad.push('the badge sheet came back');
      network.push(...db.network);
      for (const e of db.errors) fail(e);
      await db.ctx.close();
      // every type's play top bar at 380x780, bands C and D, timer at 59:59
      const dc = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const pc = dc.page;
      let bars = 0;
      for (const g of [3, 5]) {
        const ids = await pc.evaluate(g => { S.grade = g; S.bt = {}; return BT.offered().map(t => t.id); }, g);
        for (const id of ids) {
          await pc.evaluate(([id, g]) => { S.grade = g; BT.start(id, BT.band(), 1); BT.act.run.sec = 3599; }, [id, g]);
          await pc.waitForFunction(() => /59:59|1:00:00|60:0/.test((document.querySelector('#bttime') || {}).textContent || ''));
          await pc.waitForTimeout(300);
          const m = await pc.evaluate(id => {
            const nm = document.querySelector('.bt-bar .bt-nm'), ttl = document.querySelector('.bt-bar .ttl'), t = document.querySelector('#bttime'), bar = document.querySelector('.bt-bar');
            const r = nm.getBoundingClientRect(), tr = t.getBoundingClientRect(), br = bar.getBoundingClientRect(), lh = parseFloat(getComputedStyle(nm).lineHeight);
            const small = [...bar.querySelectorAll('button')].filter(b => Math.min(b.getBoundingClientRect().width, b.getBoundingClientRect().height) < 47.5).length;
            return { name: nm.textContent, want: BT.get(id).name, clip: nm.scrollWidth > nm.clientWidth + 1 || ttl.scrollWidth > ttl.clientWidth + 1 || ttl.scrollHeight > ttl.clientHeight + 1,
              overlap: r.right > tr.left - 1, lines: Math.round(r.height / lh), inBar: r.top >= br.top - 1 && r.bottom <= br.bottom + 1, small,
              sideways: document.documentElement.scrollWidth > document.documentElement.clientWidth };
          }, id);
          bars++;
          if (m.name !== m.want || m.clip || m.overlap || m.lines > 2 || !m.inBar || m.small || m.sideways) bad.push(`top bar ${id} grade ${g}: ` + JSON.stringify(m));
        }
      }
      network.push(...dc.network);
      for (const e of dc.errors) fail(e);
      await dc.ctx.close();
      if (bad.length) fail('P3-17:\n  ' + bad.join('\n  '));
      else step(`P3-17: Home daily card -> played to a win (5 coins and game time once, badge revealed), Home and hub show it done, badges view at 380x780 and 1024x600, old work revealed once, the band-below offer after three exits, ${bars} play top bars show the whole name beside the timer; targets 48 px, no sideways scroll, no emoji chrome`);
    }

    // P3-12 Tangram pack and Shape Fit (src/data/d-puz-tangram.js, src/js/84-bt-shapefit.js) with real pointer input, midway save:
    //    touch at 380x780 (a 1st grader, band B) and mouse at 1024x600 (a 5th grader, band D). Tangram level 2 (a new puzzle of the
    //    pack): hint 1, then every piece by a drag with a small miss (turned and flipped first), win, a star saved. Shape Fit level 3:
    //    every piece picked, turned (taps on touch, the Turn button on the mouse) and flipped (Flip, band D), dragged onto its slot with
    //    a miss the snap corrects, one by tap-then-tap (touch), a drag back to the tray, hint tiers 1-3, the win card, 1 star saved.
    //    Every screen: buttons and tray cells 48 px, no sideways scroll, nothing outside the screen, no emoji chrome.
    {
      const look = () => {
        const vw = document.documentElement.clientWidth, out = [];
        for (const e of document.querySelectorAll('button, [role="button"]')) {
          const r = e.getBoundingClientRect();
          if (!r.width || r.bottom < 0 || r.top > innerHeight || e.closest('svg') || e.closest('#toast')) continue;
          if (Math.min(r.width, r.height) < 47.5) out.push('small ' + (e.id || e.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (r.left < -1 || r.right > vw + 1 || (e.closest('.bt-play') && r.bottom > innerHeight + 1)) out.push('outside ' + (e.id || e.className));
        }
        if (document.documentElement.scrollWidth > vw) out.push('sideways scroll ' + document.documentElement.scrollWidth);
        const sv = document.querySelector('.tg-svg');
        if (sv) {
          const r = sv.getBoundingClientRect(), st = document.querySelector('#btstage');
          if (r.right > vw + 1 || r.bottom > innerHeight + 1) out.push('the board is outside the screen');
          if (st && st.scrollHeight > st.clientHeight + 2) out.push('the puzzle needs scrolling');
          const C = document.querySelector('.sf') ? SF.cur : TG.cur;
          if (C) C.p.pcs.forEach((q, i) => { const e = C.st().pc[i], c = C.cell(i); if (e && e.length == 2 && c && Math.min(c.w, c.h) < 48) out.push('tray cell ' + i + ' ' + c.w + 'x' + c.h); });
        }
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n; (n = w.nextNode());) {
          const el = n.parentElement;
          if (!el || el.closest('script,style,svg,#ico-sprite,.rw-burst') || !el.getClientRects().length) continue;
          const m = n.textContent.match(/\p{Extended_Pictographic}|[◀▶✕]/u);
          if (m) out.push('emoji chrome ' + m[0] + ' in ' + (el.id || el.className));
        }
        return out;
      };
      // Shape Fit: the moves still to make, worked out from the board: [piece, r, f, slot] for every slot nobody fills yet
      const sfRest = () => {
        const p = SF.cur.p, st = SF.cur.st(), { by, used } = SF.filled(p, st), out = [];
        for (let s = 0; s < p.pcs.length; s++) {
          if (by[s] >= 0) continue;
          const i = p.pcs.map((q, j) => j).find(j => !used.has(j) && !out.some(m => m[0] == j) && SF.orient(p, st, j, s));
          const o = SF.orient(p, st, i, s);
          out.push([i, o[0], o[1], s]);
        }
        return out;
      };
      const tgRest = () => {
        const p = TG.cur.p, st = TG.cur.st(), { by, used } = TG.filled(p, st), out = [];
        for (let s = 0; s < 7; s++) {
          if (by[s] >= 0) continue;
          const i = TG.movable(p).find(j => TG.KIND[j] == TG.KIND[s] && !used.has(j) && !out.some(m => m[0] == j));
          const q = p.pcs[s];
          out.push([i, q[0], q[1], TG.num(q[2]), TG.num(q[3])]);
        }
        return out;
      };
      for (const [w, h, grade, touch] of [[380, 780, 1, true], [1024, 600, 5, false]]) {
        const tag = 'P3-12 ' + w + 'x' + h;
        const app = await openApp(browser, { fixture: 'midway', width: w, height: h });
        const pg = app.page, bad = [];
        const chk = async what => { for (const o of await pg.evaluate('(' + look.toString() + ')()')) bad.push(what + ': ' + o); };
        const cdp = await pg.context().newCDPSession(pg);
        if (touch) await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
        const tp = q => [{ x: q.x, y: q.y, radiusX: 6, radiusY: 6, id: 1 }];
        const tap = async q => {
          if (!touch) return pg.mouse.click(q.x, q.y);
          await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: tp(q) });
          await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        };
        const dragTo = async (a, b) => {
          const steps = 8;
          if (touch) {
            await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: tp(a) });
            for (let s = 1; s <= steps; s++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: tp({ x: a.x + (b.x - a.x) * s / steps, y: a.y + (b.y - a.y) * s / steps }) });
            await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
          } else {
            await pg.mouse.move(a.x, a.y);
            await pg.mouse.down();
            await pg.mouse.move(b.x, b.y, { steps });
            await pg.mouse.up();
          }
        };
        const openType = async (id, lv) => {
          await pg.evaluate(([g, id, lv]) => { S.grade = g; BT.rec(id, BT.band(), true).lvl = lv; save(); home(); }, [grade, id, lv]);
          await pg.waitForSelector('#btcard');
          await pg.waitForTimeout(400);
          await pg.evaluate(() => document.querySelector('#btcard').scrollIntoView({ block: 'center' }));
          await pg.click('#btcard');
          await pg.waitForSelector(`.bt-hub [data-t="${id}"]`);
          await pg.waitForTimeout(400);
          await chk(id + ' hub');
          await pg.click(`[data-t="${id}"]`);
          await pg.waitForSelector('.bt-lvs');
          await pg.waitForTimeout(400);
          await chk(id + ' levels');
          await pg.click(`.bt-lv[data-l="${lv}"]`);
          await pg.waitForSelector('.tg-svg .tg-bs');
          await pg.waitForTimeout(450);
          await chk(id + ' play');
        };
        const winOf = async (id, band) => {
          await pg.waitForSelector('.bt-win #btnext', { timeout: 8000 });
          await pg.waitForTimeout(700);
          await chk(id + ' win card');
          return pg.evaluate(([id, b]) => ({ stars: document.querySelectorAll('.bt-win .rs.on').length, cur: !!S.bt.cur, saved: ((S.bt[id] || {})[b] || {}).stars }), [id, band]);
        };
        const band = grade == 1 ? 'B' : 'D';

        // ---- a new tangram of the pack, level 2 ----
        await openType('tangram', 2);
        const t0 = await pg.evaluate(() => ({ id: S.bt.cur.puzzle.id, n: S.bt.cur.puzzle.n }));
        if (['house', 'rocket', 'boat', 'fish', 'cat', 'rabbit', 'turtle', 'swan'].includes(t0.id) || t0.n < 2 || t0.n > 4) bad.push('tangram level 2 is not a new puzzle of its slice: ' + JSON.stringify(t0));
        await pg.click('#bthint');
        const th = await pg.evaluate(() => TG.cur.st().h);
        if (th < 0) bad.push('tangram hint 1 showed no slot');
        for (const m of await pg.evaluate('(' + tgRest.toString() + ')()')) {
          const [i, k, f] = m;
          if ((await pg.evaluate(() => TG.cur.sel())) !== i) await tap(await pg.evaluate(i => TG.cur.at(i), i));
          const e = await pg.evaluate(i => TG.cur.st().pc[i], i);
          if (e[1] !== f) await pg.click('.tg-flip');
          const e2 = await pg.evaluate(i => TG.cur.st().pc[i], i);
          for (let t = 0; t < (k - e2[0] + 8) % 8; t++) { if (touch) await tap(await pg.evaluate(i => TG.cur.at(i), i)); else await pg.click('.tg-turn'); }
          const q = await pg.evaluate(m => TG.cur.page(TG.mid(TG.poly(TG.KIND[m[0]], m[1], m[2], m[3], m[4]))), m);
          await dragTo(await pg.evaluate(i => TG.cur.at(i), i), { x: q.x + 6, y: q.y - 5 });
          await pg.waitForTimeout(60);
          const ok = await pg.evaluate(m => { const e = TG.cur.st().pc[m[0]]; return !TG.cur.p.fix.includes(m[0]) && e.length == 4 && TG.samePoly(TG.poly(TG.KIND[m[0]], ...e), TG.poly(TG.KIND[m[0]], m[1], m[2], m[3], m[4])); }, m);
          if (!ok && !(await pg.$('.bt-win'))) bad.push('tangram piece ' + i + ' did not land in its slot');
        }
        const tw = await winOf('tangram', band);
        if (tw.stars !== 2 || tw.cur || !tw.saved || tw.saved[1] !== 2) bad.push('tangram win (1 hint = 2 stars): ' + JSON.stringify(tw));
        await pg.click('#btlvls');
        await pg.waitForSelector('.bt-lvs');

        // ---- Shape Fit, level 3 ----
        await openType('fit', 3);
        const f0 = await pg.evaluate(() => ({ band: S.bt.cur.band, n: SF.cur.p.pcs.length, size: SF.cur.p.reg.length, u: Math.round(SF.cur.u()), ut: Math.round(SF.cur.ut()), turn: SF.cur.p.turn, flip: SF.cur.p.flip }));
        if (f0.band !== band || f0.n !== (band == 'B' ? 3 : 7) || !f0.turn || f0.flip !== (band == 'D' ? 1 : 0)) bad.push('Shape Fit band and pieces: ' + JSON.stringify(f0));
        const slotMid = s => pg.evaluate(s => { const c = SF.slotCells(SF.cur.p, s), m = SF.midOf(c); return SF.cur.page(m); }, s);
        const inSlot = m => pg.evaluate(m => { const e = SF.cur.st().pc[m[0]], k = cs => cs.map(c => c.join()).sort().join('|'); return e.length == 4 && k(SF.cellsOf(SF.cur.p, m[0], e)) == k(SF.slotCells(SF.cur.p, m[3])); }, m);
        const play = async (m, how, dx = 0, dy = 0) => {
          const [i, r, f, s] = m;
          if ((await pg.evaluate(() => SF.cur.sel())) !== i) await tap(await pg.evaluate(i => SF.cur.at(i), i));
          const e = await pg.evaluate(i => SF.cur.st().pc[i], i);
          if (e[1] !== f) await pg.click('.tg-flip');
          const e2 = await pg.evaluate(i => SF.cur.st().pc[i], i);
          for (let t = 0; t < (r - e2[0] + 4) % 4; t++) { if (touch) await tap(await pg.evaluate(i => SF.cur.at(i), i)); else await pg.click('.tg-turn'); }
          const q = await slotMid(s);
          if (how == 'tap') await tap(q);
          else await dragTo(await pg.evaluate(i => SF.cur.at(i), i), { x: q.x + dx, y: q.y + dy });
          await pg.waitForTimeout(60);
          if (!(await inSlot(m)) && !(await pg.$('.bt-win'))) bad.push(`Shape Fit piece ${i} (${how}) did not land in slot ${s}: ` + JSON.stringify(await pg.evaluate(i => SF.cur.st().pc[i], i)));
        };
        let moves = await pg.evaluate('(' + sfRest.toString() + ')()');
        await play(moves[0], touch ? 'tap' : 'drag', 0, 0);
        // a drag back to the tray, then in again with a miss
        const tr = await pg.evaluate(() => { const r = document.querySelector('.tg-tray').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height - 20 }; });
        await dragTo(await pg.evaluate(i => SF.cur.at(i), moves[0][0]), tr);
        if ((await pg.evaluate(i => SF.cur.st().pc[i].length, moves[0][0])) !== 2) bad.push('Shape Fit: a drag onto the tray did not put the piece back');
        moves = await pg.evaluate('(' + sfRest.toString() + ')()');
        await play(moves[0], 'drag', 9, -7);
        await chk('Shape Fit one piece in');
        // hints: 1 shows a slot and picks its piece, 2 turns only that piece, 3 puts it in
        const before = await pg.evaluate(() => JSON.stringify(SF.cur.st().pc));
        await pg.click('#bthint');
        const h1 = await pg.evaluate(() => ({ h: SF.cur.st().h, sel: SF.cur.sel(), shown: getComputedStyle(document.querySelector('.sf .tg-hl')).display != 'none', msg: document.querySelector('.tg-msg').textContent }));
        if (h1.h < 0 || h1.sel < 0 || !h1.shown || !/yellow outline/.test(h1.msg) || (await pg.evaluate(() => JSON.stringify(SF.cur.st().pc))) !== before) bad.push('Shape Fit hint 1: ' + JSON.stringify(h1));
        await vwait(pg, 11500);
        await pg.click('#bthint');
        const h2 = await pg.evaluate(() => { const st = SF.cur.st(), s = st.h, i = SF.cur.sel(); return { s, i, ok: SF.key(SF.xf(SF.cur.p.pcs[i].s, st.pc[i][0], st.pc[i][1])) == SF.key(SF.cur.p.pcs[s].s) }; });
        if (h2.s !== h1.h || !h2.ok) bad.push('Shape Fit hint 2: ' + JSON.stringify(h2));
        await vwait(pg, 11500);
        await pg.click('#bthint');
        const h3 = await pg.evaluate(() => SF.cur.st().pc.filter(e => e.length == 4).length);
        if (h3 !== 2) bad.push('Shape Fit hint 3 left ' + h3 + ' pieces on the board, want 2');
        await chk('Shape Fit hint 3');
        // back, back, Keep going: the same puzzle and pieces
        const saved = await pg.evaluate(() => JSON.stringify([S.bt.cur.puzzle, S.bt.cur.state]));
        await pg.click('#back');
        await pg.waitForSelector('.bt-lvs');
        await pg.click('#back');
        await pg.waitForSelector('#btkeep');
        await pg.click('#btkeep');
        await pg.waitForSelector('.sf .tg-bs');
        await pg.waitForTimeout(300);
        if ((await pg.evaluate(() => JSON.stringify([S.bt.cur.puzzle, S.bt.cur.state]))) !== saved) bad.push('Shape Fit resume changed the puzzle');
        for (const m of await pg.evaluate('(' + sfRest.toString() + ')()')) await play(m, 'drag', -5, 6);
        const fw = await winOf('fit', band);
        if (fw.stars !== 1 || fw.cur || !fw.saved || fw.saved[2] !== 1) bad.push('Shape Fit win (3 hints = 1 star): ' + JSON.stringify(fw));
        if (bad.length) fail(tag + ':\n  ' + bad.join('\n  '));
        else step(`${tag}: Tangram band ${band} level 2 (${t0.id}, a new puzzle) by ${touch ? 'touch' : 'mouse'} drags after a hint, 2 stars saved; Shape Fit band ${band} level 3 ` +
          `(${f0.n} pieces, ${f0.size} squares, ${f0.u} px a square on the board, ${f0.ut} in the tray) by ${touch ? 'touch: tap-then-tap, turning by taps' : 'mouse: the Turn' + (f0.flip ? ' and Flip buttons' : ' button')}, ` +
          `drags with a miss snap in, a drag to the tray puts a piece back, hints 1-2 move nothing and 3 places one, Keep going resumes, win card, 1 star saved; ` +
          `48 px targets, no sideways scroll, no emoji chrome`);
        network.push(...app.network);
        for (const e of app.errors) fail(e);
        await app.ctx.close();
      }
    }

    // P3-15 Word Search and Unscramble (src/js/87-88-bt-*.js) with real pointer input and taps, midway save (tools/lib/bt-p315.js):
    //    380x780 by touch: Home -> Brain Teasers -> Word Search (a 3rd grader, band C): a word dragged forwards, one backwards, a line
    //    that is no word shown gently (one mistake), a word by tapping its first and last letters, hints 1-3 (the first letter ringed,
    //    its line shaded, the word found), back to the hub and Keep going resumes the same words, the rest dragged, win, 1 star saved
    //    and paid; -> Unscramble (band C): a wrong order shown gently, hint 1 (first and last letters), hint 2 (the first letter in its
    //    box), every word tapped in, win, 1 star. 1024x600 by mouse: Word Search band D (9 x 9, backwards words) dragged through, and
    //    Unscramble band B (pictures) tapped through, 3 stars each. Every screen: 48 px targets (grid squares 44), found words struck
    //    through (not colour alone), nothing outside the screen, no sideways scroll, the puzzle does not scroll, no emoji chrome.
    {
      const P = require('./lib/bt-p315');
      const look = () => {
        const vw = document.documentElement.clientWidth, out = [];
        for (const e of document.querySelectorAll('button, [role="button"]')) {
          const r = e.getBoundingClientRect();
          if (!r.width || r.bottom < 0 || r.top > innerHeight || e.closest('svg') || e.closest('#toast')) continue;
          if (Math.min(r.width, r.height) < 47.5) out.push('small ' + (e.id || e.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (r.left < -1 || r.right > vw + 1 || r.bottom > innerHeight + 1) out.push('outside ' + (e.id || e.className) + ' ' + Math.round(r.left) + '..' + Math.round(r.right) + ' bottom ' + Math.round(r.bottom));
        }
        const c = document.querySelector('.ws-c');
        if (c && Math.min(c.getBoundingClientRect().width, c.getBoundingClientRect().height) < 43.5) out.push('grid squares ' + Math.round(c.getBoundingClientRect().width) + ' px');
        const b = document.querySelector('.ws-board,.us-boxes');
        if (b && !document.querySelector('.bt-win')) { const r = b.getBoundingClientRect(); if (r.left < -1 || r.right > vw + 1 || r.bottom > innerHeight + 1) out.push('the board is outside ' + JSON.stringify([r.left, r.right, r.bottom])); }
        if (document.documentElement.scrollWidth > vw) out.push('sideways scroll ' + document.documentElement.scrollWidth);
        const st = document.querySelector('.bt-stage');
        if (st && st.scrollWidth > st.clientWidth + 1) out.push('the puzzle scrolls sideways ' + st.scrollWidth + ' > ' + st.clientWidth);
        if (st && !document.querySelector('.bt-win') && st.scrollHeight > st.clientHeight + 1) out.push('the puzzle scrolls ' + st.scrollHeight + ' > ' + st.clientHeight);
        for (const li of document.querySelectorAll('.ws-w.got')) {
          if (!/line-through/.test(getComputedStyle(li.querySelector('.ws-t')).textDecorationLine) || !li.querySelector('.ic')) out.push('a found word is not struck through with a tick');
        }
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n; (n = w.nextNode());) {
          const el = n.parentElement;
          if (!el || el.closest('script,style,svg,#ico-sprite,.rw-burst') || !el.getClientRects().length) continue;
          const m = n.textContent.match(/\p{Extended_Pictographic}|[◀▶✕]/u);
          if (m) out.push('emoji chrome ' + m[0] + ' in ' + (el.id || el.className));
        }
        return out;
      };
      const gentle = sel => {
        const e = document.querySelector(sel), css = getComputedStyle(document.documentElement);
        const rgb = v => { const d = document.createElement('i'); d.style.color = v; document.body.appendChild(d); const x = getComputedStyle(d).color; d.remove(); return x; };
        return { text: e.textContent, color: getComputedStyle(e).color, ink: rgb(css.getPropertyValue('--try-ink')), red: rgb(css.getPropertyValue('--danger')) };
      };
      const hintNow = async (pg, wait) => { if (wait) await vwait(pg, 11500); await pg.click('#bthint'); await vwait(pg, 300); };
      const open = async (pg, id, grade, viaHome) => {
        await pg.evaluate(g => { S.grade = g; save(); }, grade);
        if (viaHome) {
          await pg.evaluate(() => home());
          await pg.waitForSelector('#btcard');
          await pg.evaluate(() => document.querySelector('#btcard').scrollIntoView({ block: 'center' }));
          await pg.click('#btcard');
        } else await pg.evaluate(() => BT.hub());
        await pg.waitForSelector(`.bt-hub [data-t="${id}"]`);
        await pg.evaluate(id => document.querySelector(`.bt-hub [data-t="${id}"]`).scrollIntoView({ block: 'center' }), id);
        await pg.click(`.bt-hub [data-t="${id}"]`);
        await pg.waitForSelector('.bt-lvs');
        await pg.click('.bt-lv[data-l="1"]');
      };
      const won = async (pg, id, band, stars, bad, chk) => {
        await pg.waitForSelector('.bt-win #btnext', { timeout: 15000 });
        await vwait(pg, 700);
        await chk(id + ' win card');
        const w = await pg.evaluate(([id, b]) => ({ shown: document.querySelectorAll('.bt-win .rs.on').length, saved: S.bt[id] && S.bt[id][b] && S.bt[id][b].stars[0],
          lvl: S.bt[id] && S.bt[id][b].lvl, cur: !!S.bt.cur }), [id, band]);
        if (w.shown !== stars || w.saved !== stars || w.lvl !== 2 || w.cur) bad.push(id + ' win: ' + JSON.stringify(w) + ' (want ' + stars + ' stars)');
        await pg.click('#btlvls');
        await pg.waitForSelector('.bt-lvs');
        await pg.click('#back');
        await pg.waitForSelector('.bt-hub');
      };
      for (const [w, h] of [[380, 780], [1024, 600]]) {
        const tag = 'P3-15 ' + w + 'x' + h;
        const app = await openApp(browser, { fixture: 'midway', width: w, height: h });
        const pg = app.page, bad = [], notes = [];
        const chk = async what => { await pg.waitForTimeout(400); for (const o of await pg.evaluate('(' + look.toString() + ')()')) bad.push(what + ': ' + o); };
        if (w == 380) {
          const cdp = await pg.context().newCDPSession(pg);
          await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
          // ---- Word Search, band C, by touch ----
          await open(pg, 'wsearch', 3, true);
          await pg.waitForSelector('#btstage .ws-c');
          await chk('word search C');
          const s0 = await pg.evaluate(() => S.stars), t0 = await P.wsNow(pg);
          await P.wsDrag(pg, t0.left[0].a, t0.left[0].b, cdp);
          await P.wsDrag(pg, t0.left[1].b, t0.left[1].a, cdp);
          const f1 = await pg.evaluate(() => ({ f: S.bt.cur.state.f, bands: document.querySelectorAll('.ws-band').length, got: document.querySelectorAll('.ws-w.got').length }));
          if (f1.f.join() !== '0,1' || f1.bands !== 2 || f1.got !== 2) bad.push('two words dragged (forwards, backwards) by touch: ' + JSON.stringify(f1));
          await chk('word search C, two found');
          // a line that is no word: the top row from the first square to the third, or the first column, whichever is no word
          const wrongLine = await pg.evaluate(() => { const p = S.bt.cur.puzzle, n = p.n; for (const [a, b] of [[0, 2], [0, 2 * n], [n - 1, 3 * n - 1], [n * n - 3, n * n - 1]]) if (WS.match(p, a, b) < 0) return [a, b]; return null; });
          await P.wsDrag(pg, wrongLine[0], wrongLine[1], cdp);
          const wm = await pg.evaluate(() => ({ miss: S.bt.cur.state.miss, f: S.bt.cur.state.f.length, no: !!document.querySelector('.ws-live.no') }));
          const wg = await pg.evaluate('(' + gentle.toString() + ')(".ws-msg")');
          if (wm.miss !== 1 || wm.f !== 2 || !wm.no || wg.color !== wg.ink || wg.color === wg.red) bad.push('a line that is no word is not shown gently: ' + JSON.stringify([wm, wg]));
          else notes.push('"' + wg.text + '"');
          // tap the first letter, then the last
          const t1 = await P.wsNow(pg), tw = t1.left[t1.left.length - 1];
          await P.wsTap(pg, tw.a, cdp);
          const pk = await pg.evaluate(() => ({ pk: S.bt.cur.state.pk, ring: !!document.querySelector('.ws-pk') }));
          await P.wsTap(pg, tw.b, cdp);
          const tf = await pg.evaluate(i => S.bt.cur.state.f.includes(i), tw.i);
          if (pk.pk !== tw.a || !pk.ring || !tf) bad.push('tap first and last letter: ' + JSON.stringify([pk, tf]));
          // hints 1-3 on the first word left
          const hw = (await P.wsNow(pg)).left[0], hs = [];
          for (let t = 1; t <= 3; t++) {
            await hintNow(pg, t > 1);
            hs.push(await pg.evaluate(() => ({ msg: document.querySelector('.ws-msg').textContent, ring: !!document.querySelector('.ws-ring'), hl: !!document.querySelector('.ws-hl'),
              hf: S.bt.cur.state.hf.slice(), hints: S.bt.cur.hints })));
          }
          if (!hs[0].ring || hs[0].hl || !hs[1].hl || hs[2].hf.join() !== String(hw.i) || hs[2].hints !== 3 || new Set(hs.map(x => x.msg)).size !== 3 ||
            !hs[0].msg.includes(hw.t.toUpperCase())) bad.push('word search hints 1-3: ' + JSON.stringify(hs));
          await chk('word search C hint 3');
          // back to the hub, Keep going: the same words found
          const keep = await pg.evaluate(() => JSON.stringify([S.bt.cur.puzzle, S.bt.cur.state.f]));
          await pg.click('#back');
          await pg.waitForSelector('.bt-lvs');
          await pg.click('#back');
          await pg.waitForSelector('#btkeep');
          await pg.click('#btkeep');
          await pg.waitForSelector('#btstage .ws-c');
          const back = await pg.evaluate(() => ({ s: JSON.stringify([S.bt.cur.puzzle, S.bt.cur.state.f]), got: document.querySelectorAll('.ws-w.got').length, bands: document.querySelectorAll('.ws-band').length }));
          if (back.s !== keep || back.got !== 4 || back.bands !== 4) bad.push('word search resume: ' + JSON.stringify(back));
          await P.wsFind(pg, null, cdp);
          await won(pg, 'wsearch', 'C', 1, bad, chk);
          if ((await pg.evaluate(() => S.stars)) !== s0 + 1) bad.push('word search: the star was not paid');
          notes.push('word search C: ' + t0.all + ' words, 1 star');

          // ---- Unscramble, band C: a wrong order, hints 1-2, every word ----
          await open(pg, 'scramble', 3, false);
          await pg.waitForSelector('#btstage .us-tile');
          await chk('unscramble C');
          const u0 = await P.usNow(pg);
          await P.usWrong(pg);
          const ug = await pg.evaluate('(' + gentle.toString() + ')(".us-msg")');
          const uw = await pg.evaluate(() => ({ miss: S.bt.cur.state.miss, i: S.bt.cur.state.i, no: document.querySelectorAll('.us-box.no').length }));
          if (uw.miss !== 1 || uw.i !== 0 || !uw.no || ug.color !== ug.ink || ug.color === ug.red) bad.push('a wrong order is not shown gently: ' + JSON.stringify([uw, ug]));
          else notes.push('"' + ug.text + '"');
          await vwait(pg, 900);
          await hintNow(pg, true);
          const uh1 = await pg.evaluate(() => ({ msg: document.querySelector('.us-msg').textContent, lk: S.bt.cur.state.lk }));
          await hintNow(pg, true);
          const uh2 = await pg.evaluate(() => ({ msg: document.querySelector('.us-msg').textContent, lk: S.bt.cur.state.lk, b0: document.querySelector('.us-box[data-k="0"]').textContent,
            locked: !!document.querySelector('.us-box.lk'), hints: S.bt.cur.hints }));
          if (!uh1.msg.includes(u0.w[0].toUpperCase()) || uh1.lk !== 0 || uh2.lk !== 1 || uh2.b0 !== u0.w[0].toUpperCase() || !uh2.locked || uh2.hints !== 2)
            bad.push('unscramble hints 1-2: ' + JSON.stringify([uh1, uh2, u0.w]));
          await chk('unscramble C hint 2');
          await P.usWin(pg);
          await won(pg, 'scramble', 'C', 1, bad, chk);
          notes.push('unscramble C: ' + u0.items + ' words, 1 star');
        } else {
          // ---- Word Search, band D, by mouse: every word, half of them from the last letter back ----
          await open(pg, 'wsearch', 5, true);
          await pg.waitForSelector('#btstage .ws-c');
          await chk('word search D');
          const d0 = await P.wsNow(pg), back = await pg.evaluate(() => S.bt.cur.puzzle.w.filter(x => x.d >= 4).length);
          await P.wsFind(pg, 3);
          await chk('word search D, three found');
          await P.wsFind(pg);
          await won(pg, 'wsearch', 'D', 3, bad, chk);
          notes.push('word search D: ' + d0.n + ' x ' + d0.n + ', ' + d0.all + ' words (' + back + ' backwards), 3 stars');
          // ---- Unscramble, band B (pictures), straight through ----
          await open(pg, 'scramble', 1, false);
          await pg.waitForSelector('#btstage .us-tile');
          await chk('unscramble B');
          if (!(await pg.evaluate(() => !!document.querySelector('.us-pic svg.art')))) bad.push('unscramble B shows no picture');
          await P.usSpell(pg, 1);
          await chk('unscramble B, a letter in');
          await P.usWin(pg);
          await won(pg, 'scramble', 'B', 3, bad, chk);
          notes.push('unscramble B: 3 stars');
        }
        if (bad.length) fail(tag + ':\n  ' + bad.join('\n  '));
        else step(tag + ': Home -> Brain Teasers -> ' + notes.join('; ') + '; targets 48 px (grid 44), struck-through words, no sideways scroll, no emoji chrome');
        await vwait(pg, 300);
        network.push(...app.network);
        for (const e of app.errors) fail(e);
        await app.ctx.close();
      }
    }

    // P2-34 Las Frases at 380x780: open the world from the Spanish map by id, play an articles round (es_art 1, choices) and a sentence round
    //    (es_sent 1, word tiles) with real taps; stars saved under the stop id, choices and tiles 48 px or more, nothing wider than the screen.
    {
      const fx = await openApp(browser, { fixture: 'midway', width: 380, height: 780 });
      const fp = fx.page;
      await fp.evaluate(() => { S.unlockAll = true; save(); });
      const lay = sel => ({ w: document.documentElement.scrollWidth, n: document.querySelectorAll(sel).length,
        min: Math.min(...[...document.querySelectorAll(sel)].map(b => Math.min(b.getBoundingClientRect().height, b.getBoundingClientRect().width))) });
      for (const [id, sel] of [['es_art1', '.ch'], ['es_sent1', '.ot']]) {
        await fp.evaluate(() => { if (G) G.dead = true; home(); });
        await fp.click('.game[data-p="es"]');
        await fp.waitForSelector('.wchip.on');
        const at = await fp.evaluate(id => ({ i: NODES.es.findIndex(n => nid(n) === id), w: NODES.es.find(n => nid(n) === id).wi, wid: NODES.es.find(n => nid(n) === id).wid }), id);
        if (at.wid !== 'e_frases') fail('P2-34 ' + id + ' is not in Las Frases: ' + JSON.stringify(at));
        await fp.click(`.wchip[data-w="${at.w}"]`);
        await fp.waitForSelector(`.wchip.on[data-w="${at.w}"]`);
        await fp.click(`.node[data-n="${at.i}"]`);
        await fp.waitForSelector('.ch, .ot'); // a grammar stop opens straight on the question (no word-card learn screen)
        const l = await fp.evaluate(lay, sel);
        const g = await fp.evaluate(() => ({ sk: G.sk, lv: G.lv, kind: G.q.kind }));
        if (l.w > 380 || l.n < 2 || l.min < 48 || g.sk !== id.slice(0, -1) || String(g.lv) !== id.slice(-1)) fail('P2-34 ' + id + ' layout: ' + JSON.stringify({ l, g }));
        if (id === 'es_sent1') {
          const so = await fp.evaluate(() => Math.min(...[...document.querySelectorAll('.os')].map(b => Math.min(b.getBoundingClientRect().height, b.getBoundingClientRect().width))));
          if (g.kind !== 'order' || so < 48) fail('P2-34 sentence sockets: ' + JSON.stringify({ g, so }));
        }
        await fp.screenshot({ path: require('path').join(__dirname, 'out', 'es-frases-' + id + '-play-380x780.png') }).catch(() => {});
        await playRound(fp, 'P2-34 ' + id);
        const st = await fp.evaluate(id => S.maps.es[id] || 0, id);
        if (st < 1) fail('P2-34 ' + id + ' did not save stars');
      }
      step('P2-34: Las Frases opened by id; articles (level 1) and sentence (level 1) rounds played with real taps, stars saved, 48 px targets, no sideways scroll');
      network.push(...fx.network);
      for (const e of fx.errors) fail(e);
      await fx.ctx.close();
    }

    // P4-07 Wearables, Pet Shop and Stickers (midway save: the kid dragon, 64 coins, top hat and balloon on). At 380x780 and at
    //    1024x600, with real taps: Home -> Pet Shop, try an item on (the stage pet wears its drawing), Buy -> the sheet -> "Yes, buy it":
    //    coins go down by the price, the item is owned and on, and Home and Pet Care show the drawn item on the pet; then the same with
    //    a toy for a second pet. Not enough coins says so and opens no sheet. Then the sticker book (pages, die-cut stickers, Puzzle
    //    badges kept). Every screen: 48 px targets, no sideways scroll, no emoji chrome (sticker pictures are content).
    {
      const look = () => {
        const vw = document.documentElement.clientWidth, out = [];
        for (const e of document.querySelectorAll('button, [role="button"]')) {
          const r = e.getBoundingClientRect();
          if (!r.width || r.bottom < 0 || r.top > innerHeight || e.closest('svg') || e.closest('#toast')) continue;
          if (Math.min(r.width, r.height) < 47.5) out.push('small ' + (e.id || e.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (r.left < -1 || r.right > vw + 1) out.push('outside ' + (e.id || e.className) + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
        }
        if (document.documentElement.scrollWidth > vw) out.push('sideways scroll ' + document.documentElement.scrollWidth);
        for (const s of document.querySelectorAll('.scroll')) if (s.scrollWidth > s.clientWidth + 1) out.push('sideways scroll in ' + s.className);
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n; (n = w.nextNode());) {
          const el = n.parentElement;
          if (!el || el.closest('script,style,svg,#ico-sprite,.rw-burst,#pet,.sb-e') || !el.getClientRects().length) continue;
          const m = n.textContent.match(/\p{Extended_Pictographic}|[◀▶✕]/u);
          if (m) out.push('emoji chrome ' + m[0] + ' in ' + (el.id || el.className));
        }
        if (document.querySelector('#app .pw-hat:not(g), #app .pw-toy:not(g)')) out.push('a wearable drawn as text');
        return out;
      };
      const bad = [];
      // the pet in sel wears the drawing of id: a .pw-hat / .pw-toy group holding exactly WEAR[id] (parsed the same way), no emoji text
      const wears = (pg, sel, id) => pg.evaluate(([sel, id]) => {
        const e = document.querySelector(sel), t = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        if (!e || !WEAR[id]) return false;
        t.innerHTML = WEAR[id];
        return [...e.querySelectorAll('g.pw-hat, g.pw-toy')].some(g => g.innerHTML === t.innerHTML) && !e.querySelector('text');
      }, [sel, id]);
      for (const [W, H, buys] of [[380, 780, [['dragon', 'hat', '🧢', 10], ['dino', 'toy', '🧸', 20]]], [1024, 600, [['bird', 'hat', '⛑️', 25], ['ocean', 'toy', '⚽', 15]]]]) {
        const sz = W + 'x' + H;
        const sa = await openApp(browser, { fixture: 'midway', width: W, height: H });
        const pg = sa.page;
        const chk = async what => { await pg.waitForTimeout(450); for (const o of await pg.evaluate('(' + look.toString() + ')()')) bad.push(sz + ' ' + what + ': ' + o); };
        await pg.evaluate(() => { S.care = { food: 90, clean: 90, fun: 90, t: Date.now(), gift: '' }; save(); home(); });
        for (const [pet, tab, id, price] of buys) {
          await pg.evaluate(k => { S.pet = k; save(); home(); }, pet);
          await pg.click('#shop');
          await pg.waitForSelector('.ps-grid .item');
          if (tab != 'hat') await pg.click(`.tab[data-t="${tab}"]`);
          await pg.waitForSelector(`.item[data-id="${id}"]`);
          await chk('shop ' + tab);
          const c0 = await pg.evaluate(() => S.coins);
          // try it on: the stage pet wears the drawing, nothing is bought yet
          await pg.click(`.item[data-id="${id}"]`);
          if (!(await wears(pg, '#stage #pet', id))) bad.push(sz + ` ${pet}: trying on ${id} does not show it on the stage pet`);
          if (await pg.evaluate(i => !!S.owned[i], id)) bad.push(sz + ` ${pet}: trying on bought ${id}`);
          await pg.click('#psact');
          await pg.waitForSelector('.sheet-bg.on #psyes');
          await vwait(pg, 400);
          await chk('buy sheet');
          await pg.click('#psyes');
          await pg.waitForSelector(`.item.wear[data-id="${id}"]`);
          const st = await pg.evaluate(([i, t]) => ({ coins: S.coins, own: S.owned[i], on: S.wear[t], chip: document.querySelector('#coinc b').textContent }), [id, tab]);
          if (st.coins !== c0 - price || st.own !== 1 || st.on !== id || st.chip !== String(c0 - price)) bad.push(sz + ` ${pet} buy ${id}: ` + JSON.stringify(st) + ' from ' + c0);
          await vwait(pg, 300);
          await chk('shop after buying');
          // Home and Pet Care show it on the pet
          await pg.click('#back');
          await pg.waitForSelector('#care');
          if (!(await wears(pg, '#pet', id)) || !(await pg.evaluate(k => !!document.querySelector('#pet .pet-k-' + k), pet))) bad.push(sz + ` ${pet}: Home pet does not wear ${id}`);
          await chk('home');
          await pg.click('#care');
          await pg.waitForSelector('#bath');
          if (!(await wears(pg, '#pet', id))) bad.push(sz + ` ${pet}: Pet Care pet does not wear ${id}`);
          await pg.evaluate(() => home());
        }
        // both items of the second pet stay on (its hat from the first buy, its toy from the second)
        await pg.evaluate(() => home());
        const both = (await wears(pg, '#pet', buys[0][2])) && (await wears(pg, '#pet', buys[1][2]));
        if (!both) bad.push(sz + ': the pet does not wear both bought items');
        // not enough coins: a toast, no sheet, no change
        await pg.evaluate(() => { S.coins = 5; save(); shopTab = 'hat'; shopSel = null; shop(); });
        await pg.click('.item[data-id="👑"]');
        await pg.click('#psact');
        await vwait(pg, 300);
        const poor = await pg.evaluate(() => ({ sheet: !!document.querySelector('.sheet-bg'), coins: S.coins, own: !!S.owned['👑'], toast: (document.querySelector('#toast') || {}).textContent || '' }));
        if (poor.sheet || poor.coins !== 5 || poor.own || !/Need 55 more/.test(poor.toast)) bad.push(sz + ' not enough coins: ' + JSON.stringify(poor));
        // the sticker book: four pages, the saved stickers as die-cut stickers, the Puzzle badges button
        await pg.evaluate(() => home());
        await pg.click('#book');
        await pg.waitForSelector('.sb-page');
        await chk('book');
        const bk = await pg.evaluate(() => ({ pages: document.querySelectorAll('.sb-page').length, stk: document.querySelectorAll('.sb-stk').length,
          want: STK.filter(s => S.stickers[s]).length, badges: !!document.querySelector('#bkbdg') == (BT.list().length > 0),
          cut: (getComputedStyle(document.querySelector('.sb-e')).textShadow.match(/rgb/g) || []).length }));
        if (bk.pages !== 4 || bk.stk !== bk.want || !bk.stk || !bk.badges || bk.cut < 8) bad.push(sz + ' book: ' + JSON.stringify(bk));
        await pg.click('.sb-stk');
        if (await pg.evaluate(() => !!document.querySelector('#bkbdg'))) {
          await pg.click('#bkbdg');
          await vwait(pg, 300);
          if (!(await pg.evaluate(() => !document.querySelector('.sb-page')))) bad.push(sz + ' book: Puzzle badges did not open');
        }
        network.push(...sa.network);
        for (const e of sa.errors) fail(e);
        await sa.ctx.close();
      }
      if (bad.length) fail('P4-07:\n  ' + bad.join('\n  '));
      else step('P4-07: shop -> try on -> Buy -> Yes for 4 items on 4 pets (coins, owned, on), drawn on the pet in the shop, on Home and in Pet Care; not enough coins opens no sheet; sticker book pages and die-cut stickers; 380x780 and 1024x600, 48 px targets, no sideways scroll, no emoji chrome');
    }

    // P4-09: map and world scenes. Every world of every path picked in turn at 380x780 and 1024x600: each drawn world band holds its
    // scene (one SVG the size of the band, aria-hidden, no taps), drawn behind the map: with the scenes made hit-testable for the
    // check, the point at every stop's centre is the stop, at its label the label, at the title the title and at the Test out
    // banner the banner; the trail has its stones, nothing scrolls sideways. (The draw time check is step 10.)
    {
      const bad = [];
      let worlds = 0, stops = 0;
      for (const [w, h] of [[380, 780], [1024, 600]]) {
        const sc = await openApp(browser, { fixture: 'midway', width: w, height: h });
        const ps = sc.page;
        const paths = await ps.evaluate(() => Object.keys(PATHS).map(p => [p, PATHS[p].worlds.length]));
        for (const [p, n] of paths) {
          for (let wi = 0; wi < n; wi++) {
            const r = await ps.evaluate(([p, wi]) => {
              pathMap(p, wi);
              const bad = [], m = document.querySelector('#map'), ms = document.querySelector('#ms');
              const bands = [...m.querySelectorAll('.wband')], titles = [...m.querySelectorAll('.wtitle[data-w]')];
              if (!bands.length || bands.length !== titles.length) bad.push(bands.length + ' bands for ' + titles.length + ' worlds');
              for (const b of bands) {
                const s = b.querySelector('svg.scn-art'), cs = getComputedStyle(b), br = b.getBoundingClientRect();
                if (!s || !b.dataset.scene) { bad.push('band without a scene at ' + b.style.top); continue; }
                if (b.getAttribute('aria-hidden') !== 'true' || cs.pointerEvents !== 'none') bad.push('band ' + b.dataset.scene + ' is not decoration only');
                const sr = s.getBoundingClientRect();
                if (Math.abs(sr.width - br.width) > 1 || Math.abs(sr.height - br.height) > 1 || Math.abs(sr.top - br.top) > 1) bad.push('scene ' + b.dataset.scene + ' is not the size of its band');
                if (s.querySelectorAll('*').length > 75) bad.push('scene ' + b.dataset.scene + ' has ' + s.querySelectorAll('*').length + ' elements');
              }
              // every world title sits on its own band (the band starts 14 px above it)
              for (const t of titles) if (!bands.some(b => Math.abs(parseFloat(b.style.top) - (parseFloat(t.style.top) - 14)) < 1)) bad.push('world ' + t.dataset.w + ' has no band');
              const tr = m.querySelector('svg.mp-trail');
              if (!tr || !tr.querySelector('.tr-st') || getComputedStyle(tr).pointerEvents !== 'none' && getComputedStyle(tr.querySelector('.tr-st')).pointerEvents !== 'none') bad.push('trail missing or tappable');
              // make the scenes, the trail and the labels (none of them take taps) hit-testable, then check what is on top at each point
              const st = document.createElement('style');
              st.textContent = '.wband,.wband *,.mp-trail,.mp-trail *,.nlab,.nlab *,.nnew,.mappet,.mappet *{pointer-events:auto!important}';
              document.head.appendChild(st);
              const at = (el, what, ok) => {
                el.scrollIntoView({ block: 'center' });
                const r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
                if (y < 0 || y > innerHeight) return;
                const e = document.elementFromPoint(x, y);
                if (!e || e.closest('.wband') || e.closest('.mp-trail') || !ok(e)) bad.push(what + ' covered by ' + (e ? (e.closest('.wband') ? 'the scene' : e.closest('.mp-trail') ? 'the trail' : e.className.baseVal || e.className || e.tagName) : 'nothing'));
              };
              const picked = [...m.querySelectorAll('.node')].filter(b => NODES[p][+b.dataset.n].wi === wi);
              for (const b of picked) {
                at(b, 'stop ' + b.dataset.n, e => e.closest('.node') === b || !!e.closest('.nnew'));
                const lab = [...m.querySelectorAll('.nlab')].find(l => l.style.left === b.style.left && parseFloat(l.style.top) === parseFloat(b.style.top) + 42);
                if (lab) at(lab, 'label of stop ' + b.dataset.n, e => !!(e.closest('.nlab') || e.closest('.node') || e.closest('.mappet')));
              }
              const t = m.querySelector(`.wtitle[data-w="${wi}"]`);
              if (t) at(t, 'title', e => !!e.closest('.wtitle'));
              const to = m.querySelector(`.tobtn[data-w="${wi}"]`);
              if (to) at(to, 'Test out banner', e => !!e.closest('.tobtn'));
              st.remove();
              if (document.documentElement.scrollWidth > document.documentElement.clientWidth + 1 || ms.scrollWidth > ms.clientWidth + 1) bad.push('sideways scroll');
              return { bad, stops: picked.length };
            }, [p, wi]);
            worlds++;
            stops += r.stops;
            for (const x of r.bad) bad.push(`${p} world ${wi + 1} ${w}x${h}: ${x}`);
          }
        }
        network.push(...sc.network);
        for (const e of sc.errors) fail(e);
        await sc.ctx.close();
      }
      if (bad.length) fail('P4-09:\n  ' + [...new Set(bad)].slice(0, 30).join('\n  '));
      else step(`P4-09: ${worlds} world maps (every world of every path at 380x780 and 1024x600): every band has its scene behind the map, ${stops} stops, their labels, titles and Test out banners on top, trail stones, no sideways scroll`);
    }

    // P4-12 setup, Grown-ups, Pet Care at 380x780 and 1024x600: first-run setup with real taps (steps tick, saved), Grown-ups opened
    //    by holding the gear, every section looked at (App log opened, a segmented row, a switch, a field, Erase armed only, report card
    //    with its online note), Pet Care feed, bath and play with drawn sparkles (none with reduced motion or calm mode). Every screen:
    //    targets at least 48 px, nothing wider than the screen, no emoji in the chrome (pets and snack pictures are content).
    {
      const look = () => {
        const vw = document.documentElement.clientWidth, out = [];
        for (const e of document.querySelectorAll('#app button, #app summary, #app label.switch, #app .fld')) {
          const r = e.getBoundingClientRect();
          if (!r.width || e.closest('svg')) continue;
          // layout size (offsetWidth/Height): the screen-in motion scales the page for a moment
          if (Math.min(e.offsetWidth, e.offsetHeight) < 48) out.push('small ' + (e.id || e.className || e.tagName) + ' ' + e.offsetWidth + 'x' + e.offsetHeight);
          if (r.left < -1 || r.right > vw + 1) out.push('outside ' + (e.id || e.className) + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
        }
        for (const s of [document.documentElement, ...document.querySelectorAll('#app .scroll, #app .center')])
          if (s.scrollWidth > s.clientWidth + 1 && getComputedStyle(s).overflowX != 'hidden') out.push('sideways scroll ' + (s.className || 'page') + ' ' + s.scrollWidth);
        const w = document.createTreeWalker(document.querySelector('#app'), NodeFilter.SHOW_TEXT);
        for (let n; (n = w.nextNode());) {
          const el = n.parentElement;
          if (!el || el.closest('.pet-svg, .gx-pp, .gx-sp, .petbig, .tblw')) continue;
          const m = n.textContent.match(/\p{Extended_Pictographic}|[◀▶✕★✓]/u);
          if (m) out.push('emoji chrome ' + m[0] + ' in ' + (el.id || el.className));
        }
        return out;
      };
      const bad = [];
      for (const [w, h] of [[380, 780], [1024, 600]]) {
        const tag = w + 'x' + h;
        const chk = async (pg, what) => { for (const o of await pg.evaluate('(' + look.toString() + ')()')) bad.push(tag + ' ' + what + ': ' + o); };
        // ---- first-run setup with real taps ----
        const sa = await openApp(browser, { fixture: 'fresh', width: w, height: h });
        const sp = sa.page;
        await sp.waitForSelector('.su-step');
        await sp.evaluate(() => { window.say = () => {}; });
        await chk(sp, 'setup');
        const st0 = await sp.evaluate(() => document.querySelectorAll('.su-step.ok').length);
        await sp.click('#go'); // no name yet: a gentle "type your name" and nothing saved
        if (!(await sp.$('.su-step')) || st0 !== 0) bad.push(tag + ' setup: ' + st0 + ' steps ticked at the start, or Go without a name left setup');
        await sp.click('#suspk');
        await sp.click('#nm');
        await sp.keyboard.type('Mia');
        await sp.click('.petopt[data-p="ocean"]');
        await sp.click('#pn');
        await sp.keyboard.type('Bubbles');
        await sp.click('.gr[data-g="2"]');
        const st = await sp.evaluate(() => ({ ok: document.querySelectorAll('.su-step.ok').length, sel: document.querySelector('.petopt.sel').dataset.p,
          gr: document.querySelector('.gr.sel').dataset.g, go: document.querySelector('#go').getBoundingClientRect().height }));
        if (st.ok !== 3 || st.sel !== 'ocean' || st.gr !== '2' || st.go < 56) bad.push(tag + ' setup steps: ' + JSON.stringify(st));
        await chk(sp, 'setup filled in');
        await sp.click('#go');
        await sp.waitForSelector('.game[data-p]');
        const saved = await sp.evaluate(() => ({ n: S.name, p: S.pet, pn: S.petName, g: S.grade }));
        if (saved.n !== 'Mia' || saved.p !== 'ocean' || saved.pn !== 'Bubbles' || saved.g !== 2) bad.push(tag + ' setup saved ' + JSON.stringify(saved));
        // ---- Grown-ups: hold the gear ----
        const gb = await (await sp.$('#gear')).boundingBox();
        await sp.mouse.move(gb.x + gb.width / 2, gb.y + gb.height / 2);
        await sp.mouse.down();
        await vwait(sp, 1500);
        await sp.mouse.up();
        await sp.waitForSelector('.gw-card', { timeout: 3000 });
        await sp.waitForTimeout(400);
        const secs = await sp.evaluate(() => [...document.querySelectorAll('.gw-card')].map(c => (c.id || c.className) + ':' + !!c.querySelector('.gw-h svg.ic')));
        if (secs.length < 10 || secs.some(s => s.endsWith(':false'))) bad.push(tag + ' Grown-ups sections: ' + secs.join(' '));
        await chk(sp, 'Grown-ups');
        // every section scrolled into view, each one on screen
        const seen = await sp.evaluate(async () => { const r = [];
          for (const c of document.querySelectorAll('.gw-card')) { c.scrollIntoView({ block: 'start' }); await new Promise(f => requestAnimationFrame(f));
            const b = c.getBoundingClientRect(); if (b.top < 0 || b.top > innerHeight || b.width < 200) r.push(c.id + ' ' + Math.round(b.top) + ' ' + Math.round(b.width)); }
          return r; });
        if (seen.length) bad.push(tag + ' sections not shown: ' + seen.join(', '));
        await sp.click('#applog summary');
        const log = await sp.evaluate(() => ({ open: document.querySelector('#applog').open, txt: document.querySelector('.gw-log').textContent }));
        if (!log.open || !/Version v\d+/.test(log.txt) || !/saving OK/.test(log.txt)) bad.push(tag + ' App log: ' + JSON.stringify(log));
        await sp.click('[data-per="5"]');
        await sp.waitForSelector('[data-per="5"][aria-pressed="true"]');
        await sp.click('[data-max="0"]');
        await sp.waitForSelector('[data-max="0"][aria-pressed="true"]');
        await sp.click('label.switch:has(#ptp)');
        await sp.click('label.switch:has(#snd)');
        await sp.click('#bd');
        await sp.keyboard.type('Leo');
        await sp.click('#reset'); // the first tap only arms it
        const gs = await sp.evaluate(() => ({ per: ptCfg().per, max: ptCfg().max, pause: ptCfg().pause, snd: S.sound, bd: S.buddy, name: S.name,
          arm: document.querySelector('#reset').textContent }));
        if (gs.per !== 5 || gs.max !== 0 || gs.pause !== true || gs.snd !== false || gs.bd !== 'Leo' || gs.name !== 'Mia' || !/Tap again/.test(gs.arm))
          bad.push(tag + ' Grown-ups controls: ' + JSON.stringify(gs));
        await chk(sp, 'Grown-ups after taps');
        // the report card: Print keeps its online note
        await sp.click('#rp-open');
        await sp.waitForSelector('#rp-weeks');
        const rp = await sp.evaluate(() => { const b = { height: document.querySelector('#rp-print').offsetHeight }, n = document.querySelector('.rp-online .online-note');
          return { h: b.height, note: n ? n.textContent : '', vis: n ? n.getBoundingClientRect().height : 0, cards: document.querySelectorAll('.rp-card .gw-h svg.ic').length }; });
        if (rp.h < 48 || !/online to share or print/.test(rp.note) || !rp.vis || rp.cards !== 7) bad.push(tag + ' report card: ' + JSON.stringify(rp));
        await chk(sp, 'report card');
        await sp.click('#back');
        await sp.waitForSelector('#rp-open');
        await sp.click('#back');
        await sp.waitForSelector('#care');
        // ---- Pet Care: feed, bath, play ----
        await sp.evaluate(() => { S.coins = 40; S.care = { food: 30, clean: 30, fun: 30, t: Date.now(), gift: '' }; home(); });
        await sp.click('#care');
        await sp.waitForSelector('#bath');
        await sp.waitForTimeout(300);
        await chk(sp, 'Pet Care');
        const scene = await sp.evaluate(() => ({ svg: !!document.querySelector('#stage > svg.gx-scene'), deco: document.querySelectorAll('.sdeco').length }));
        if (!scene.svg || scene.deco) bad.push(tag + ' Pet Care stage: ' + JSON.stringify(scene));
        const fx = async (sel, kind) => {
          await sp.click(sel);
          const r = await sp.evaluate(k => { const b = document.querySelector('.pc-fx.k-' + k);
            return b ? { n: b.querySelectorAll('i > svg').length, txt: b.textContent.trim() } : null; }, kind);
          await vwait(sp, 1500);
          await sp.waitForSelector('#bath');
          return r;
        };
        const feed = await fx('[data-f="0"]', 'food'), bath = await fx('#bath', 'bath'), play = await fx('#play', 'play');
        const cs = await sp.evaluate(() => ({ food: Math.round(S.care.food), clean: Math.round(S.care.clean), fun: Math.round(S.care.fun), coins: S.coins }));
        if (!feed || feed.n < 6 || feed.txt || !bath || bath.n < 6 || !play || play.n < 6 || cs.food < 54 || cs.clean !== 100 || cs.fun < 59 || cs.coins !== 37)
          bad.push(tag + ' Pet Care actions: ' + JSON.stringify({ feed, bath, play, cs }));
        await chk(sp, 'Pet Care after actions');
        // reduced motion and calm mode: the action still works, no pieces are drawn
        await sp.emulateMedia({ reducedMotion: 'reduce' });
        await sp.click('#play');
        const rm = await sp.evaluate(() => document.querySelectorAll('.pc-fx').length);
        await vwait(sp, 1500);
        await sp.emulateMedia({ reducedMotion: 'no-preference' });
        await sp.evaluate(() => document.documentElement.classList.add('calm'));
        await sp.waitForSelector('#bath');
        await sp.click('#bath');
        const calm = await sp.evaluate(() => document.querySelectorAll('.pc-fx').length);
        await vwait(sp, 1500);
        if (rm || calm) bad.push(tag + ' Pet Care sparkles with reduced motion ' + rm + ', calm ' + calm);
        await sp.evaluate(() => document.documentElement.classList.remove('calm'));
        network.push(...sa.network);
        for (const e of sa.errors) fail(e);
        await sa.ctx.close();
      }
      if (bad.length) fail('P4-12 setup, Grown-ups, Pet Care:\n  ' + bad.join('\n  '));
      else step('P4-12: first-run setup by taps (steps tick, name, pet, pet name, grade saved), Grown-ups held open from the gear with every section shown ' +
        '(App log, segmented rows, switches, a field, Erase armed only, report card Print with its online note), Pet Care feed, bath and play with drawn ' +
        'sparkles and none with reduced motion or calm mode; 48 px targets, no sideways scroll, no emoji chrome at 380x780 and 1024x600');
    }

    for (const u of network) fail('network request: ' + u);
    if (!errors.length && !network.length) step('no console errors, no network requests');
  } catch (e) {
    fail(e.stack || String(e));
    if (ctxAll) for (const x of ctxAll.errors) console.error('  page error: ' + x);
  } finally {
    await browser.close();
  }
  console.log(failed ? `smoke FAILED (${failed})` : 'smoke OK');
  process.exit(failed ? 1 : 0);
}
main();
