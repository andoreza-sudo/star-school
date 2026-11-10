// Smoke test: a bot plays through the built app in headless Chrome with the network blocked.
// Fresh setup, one full round on each path (answers read from G.q.ans, tapped through the real UI),
// Game Room, Grown-ups. Fails on any console error, uncaught exception or network request.
const { launch, openApp } = require('./lib/browser');

let failed = 0;
const step = msg => console.log('- ' + msg);
function fail(msg) { failed++; console.error('FAIL: ' + msg); }

// Answer the current question by tapping the on-screen controls.
async function answer(page) {
  const q = await page.evaluate(() => ({ kind: G.q.kind, ans: String(G.q.ans), word: G.q.word,
    vals: G.q.choices ? G.q.choices.map(c => String(c.v)) : null }));
  if (q.kind === 'num') {
    for (const d of q.ans) await page.click(`.k[data-k="${d}"]`);
    await page.click('.k[data-k="go"]');
  } else if (q.kind === 'choice') {
    await page.click(`.ch[data-i="${q.vals.indexOf(q.ans)}"]`);
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
  } else {
    throw new Error('unknown question kind ' + q.kind);
  }
  return q;
}

// Plays the round that is on screen to the end and opens the chest.
async function playRound(page, label) {
  let n = 0;
  for (let guard = 0; guard < 40; guard++) {
    const state = await page.evaluate(() => document.querySelector('#fin') ? 'fin' : (G && G.q && !G.lock ? 'ask' : 'none'));
    if (state === 'fin') break;
    if (state === 'none') { await page.waitForTimeout(150); continue; }
    await page.evaluate(() => { window.__q = G.q; });
    await answer(page);
    n++;
    // wait for the next question object or the finish screen
    await page.waitForFunction(() => document.querySelector('#fin') || (G && G.q !== window.__q), null, { timeout: 8000 });
  }
  await page.waitForSelector('#chest', { timeout: 5000 });
  const score = await page.evaluate(() => G.score);
  if (score !== 10) fail(`${label}: expected 10/10 from the bot, got ${score}`);
  await page.click('#chest');
  await page.waitForSelector('#btns', { state: 'visible', timeout: 10000 });
  // a pet growth / hatch overlay may cover the buttons: tap its Yay button when it shows up
  await page.waitForTimeout(800);
  const yay = await page.waitForSelector('#yay', { timeout: 4000 }).catch(() => null);
  if (yay) { await yay.click(); step(`${label}: pet grew, overlay dismissed`); }
  step(`${label}: round complete (${n} answers, score ${score}/10)`);
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
    await page.waitForTimeout(1500);
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
    await page.waitForSelector('.node[data-n="0"]');
    await page.click('.node[data-n="0"]');
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
      await page.waitForTimeout(2800); // the engine's own pending next() from the last sample must fire before a new round starts
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
        cur: document.querySelector('.node.cur') && +document.querySelector('.node.cur').dataset.n }));
      if (st.chips !== st.n || st.on !== 1 || st.cur !== 9) fail('math map on midway: ' + JSON.stringify(st));
      else step('math map opens on Candy Canyon (current stop 9) with ' + st.chips + ' world chips');
      await wp.click('.wchip[data-w="3"]');
      await wp.waitForSelector('.wchip.on[data-w="3"]');
      const far = await wp.evaluate(() => ({ first: document.querySelector('.node[data-n="0"]') !== null, space: document.querySelector('.node[data-n="35"]') !== null,
        up: document.querySelector('.wmore') && +document.querySelector('.wmore').dataset.w }));
      if (far.first || !far.space || far.up !== 1) fail('world chip did not switch the map: ' + JSON.stringify(far));
      await wp.click('.wmore');
      await wp.waitForSelector('.wchip.on[data-w="1"]');
      await wp.click('.node[data-n="10"]'); // locked stop: stays on the map
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
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 });
      const times = await wp.evaluate(() => {
        pathMap('math', 8);
        const t = [];
        for (let r = 0; r < 7; r++) { MAPW.math = 6 + (r % 4); const t0 = performance.now(); drawMap('math'); void $('#map').offsetHeight; t.push(performance.now() - t0); }
        return t.sort((a, b) => a - b);
      });
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
      const med = times[3];
      if (med >= 50) fail(`map draw with 16 worlds (${ms} stops) at 6x throttle: median ${med.toFixed(1)} ms (limit 50)`);
      else step(`map draw with 16 worlds (${ms} stops) at 6x CPU throttle: median ${med.toFixed(1)} ms, worst ${times[6].toFixed(1)} ms`);
      errors.push(...wm.errors);
      network.push(...wm.network);
      await wm.ctx.close();
    }

    for (const e of errors) fail(e);
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
