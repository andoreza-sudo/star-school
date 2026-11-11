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
  } else {
    throw new Error('unknown question kind ' + q.kind);
  }
  return q;
}

// Plays the round that is on screen to the end and opens the chest.
async function playRound(page, label, total) {
  if (total === undefined) total = await page.evaluate(() => G.n); // 8 at the default grade (K), 6 Pre-K, 10 from 1st
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
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 });
      const times = await wp.evaluate(() => {
        pathMap('math', 8);
        const t = [];
        for (let r = 0; r < 7; r++) { MAPW.math = 6 + (r % 4); const rn = window.__realNow || (() => performance.now()); /* TOOL-01: real time, not the virtual clock */ const t0 = rn(); drawMap('math'); void $('#map').offsetHeight; t.push(rn() - t0); }
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
      const cw = await gp.evaluate(() => worldOpen('math', PATHS.math.worlds.length - 1)); // the last world (P2-01: no longer index 3)
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
      if (rm !== 7 || r2.fixed !== 7 || r2.due !== r1.due - 7 || r2.box1 !== r1.box1 + 7) fail('tricky mix: ' + JSON.stringify({ rm, ...r2 }));
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
      const stops = await tp.evaluate(() => NODES.math.map((n, i) => [i, nid(n), n.wid]).filter(x => x[2] === 'm_tiny' && x[1] !== 'boss_m_tiny'));
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
      await pp.evaluate(() => { S.care = { food: 90, clean: 90, fun: 90, t: Date.now(), gift: '' }; home(); });
      const h = await pp.evaluate(() => {
        const pet = document.querySelector('#pet'), svg = pet && pet.querySelector('.pet-svg'), r = svg && svg.getBoundingClientRect();
        return { cls: svg && svg.getAttribute('class'), rig: pet.classList.contains('rig'), filter: getComputedStyle(pet).filter,
          hat: (svg.querySelector('.pw-hat') || {}).textContent, toy: (svg.querySelector('.pw-toy') || {}).textContent,
          w: r && Math.round(r.width), right: r && r.right, sw: document.documentElement.scrollWidth };
      });
      if (h.cls !== 'pet-svg pet-k-dragon pet-s-kid pet-m-happy' || !h.rig || h.filter !== 'none' || h.hat !== '🎩' || h.toy !== '🎈' ||
        !(h.w >= 70 && h.w <= 130) || h.right > 380 || h.sw > 380) fail('P4-05 home pet: ' + JSON.stringify(h));
      await pp.click('#pet');
      const cheer = await opa('#pet .pf-cheer'), base = await opa('#pet .pf-base');
      await pp.waitForTimeout(700);
      const after = await opa('#pet .pf-base');
      if (cheer !== 1 || base !== 0 || after !== 1) fail('P4-05 tap: cheer face ' + [cheer, base, after]);
      // Pet Care: hungry face; a snack makes it idle again; the bath shows the oops face
      await pp.evaluate(() => { S.care = { food: 10, clean: 90, fun: 90, t: Date.now(), gift: '' }; home(); });
      await pp.click('#care');
      await pp.waitForSelector('#pet .pet-m-hungry', { timeout: 3000 });
      await pp.click('[data-f="0"]');
      await pp.waitForSelector('#pet .pet-m-idle', { timeout: 4000 });
      await pp.click('#bath');
      const oops = await opa('#pet .pf-oops');
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
      await answer(pp);
      const rc = await opa('#runner .pf-cheer');
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
      // a dino child keeps today's emoji pet; setup offers the drawn dragon next to the emoji pets
      const dino = await pp.evaluate(() => {
        S.pet = 'dino'; home();
        const pet = document.querySelector('#pet');
        const r = { e: (pet.querySelector('.pe') || {}).textContent, svg: !!pet.querySelector('svg'), cls: pet.className, hat: (pet.querySelector('.hat') || {}).textContent };
        S.pet = 'dragon'; S.name = ''; home();
        r.setup = [...document.querySelectorAll('.petopt')].map(b => b.dataset.p + ':' + (b.querySelector('.pet-svg') ? 'svg' : b.querySelector('span').textContent));
        return r;
      });
      if (dino.e !== '🦕' || dino.svg || dino.cls !== 'petbig ' || dino.hat !== '🎩' || dino.setup.join() !== 'dragon:svg,dino:🦖,bird:🦅,ocean:🐳')
        fail('P4-05 other pets / setup: ' + JSON.stringify(dino));
      else step('P4-05: drawn dragon on Home (hat + toy, cheer on tap), Pet Care moods, map and runner, growth, super, reduced motion and calm; dino unchanged');
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
