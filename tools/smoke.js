// Smoke test: a bot plays through the built app in headless Chrome with the network blocked.
// Fresh setup, one full round on each path (answers read from G.q.ans, tapped through the real UI),
// Game Room, Grown-ups. Fails on any console error, uncaught exception or network request.
const { launch, openApp } = require('./lib/browser');

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
  await page.waitForTimeout(800);
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

    // 11. new kinds A (P1-03): the bot plays every sample question of tools/kinds-samples.js through the real engine at 380x780
    //    (right answers, 48 px targets, no sideways scroll), then gets three of them wrong twice and checks the reveal
    // the number-pad step above leaves the old round's 2.6 s next-question timer running; let it fire before the new round starts
    await page.evaluate(() => home());
    await page.waitForTimeout(3000);
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
      await gp.waitForTimeout(1500);
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
          due: dueItems().length, stars: S.stars >= 85 };
      });
      if (JSON.stringify(r1.first) !== '[false,true,false,true]' || r1.tags.some(h => h < 20) || r1.moved.some(m => !m || m[0] !== 1 || m[1] !== 1)
        || r1.due !== 21 - r1.moved.length || !r1.stars)
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
      if (rm !== 7 || r2.fixed !== 7 || r2.due !== r1.due - 7 || r2.box1 !== r1.moved.length + 7) fail('tricky mix: ' + JSON.stringify({ rm, ...r2 }));
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
        await pp.waitForTimeout(2800); // let the old round's timers finish
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
      await tp.waitForSelector('#prompt');
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
        await tp.waitForSelector('#prompt');
        await tp.waitForTimeout(600);
        const sz = await tp.evaluate(() => {
          const pts = [...document.querySelectorAll('.ch, #prompt [data-v]')].map(e => Math.min(e.offsetWidth, e.offsetHeight));
          return { kind: G.q.kind, n: pts.length, min: Math.min(...pts), wide: document.documentElement.scrollWidth, tall: document.querySelector('.qarea').scrollHeight > document.querySelector('.qarea').clientHeight + 1 };
        });
        await tp.click('#hb');
        const hint = await tp.evaluate(() => ({ len: document.querySelector('#hint').innerHTML.length, letters: /[A-Za-z]/.test(document.querySelector('#hint').innerText) }));
        await answer(tp);
        await tp.evaluate(() => { G.dead = true; }); // the round's own next() timer fires into this dead round, not into the next stop
        await tp.waitForTimeout(1500);
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
      await fp.evaluate(() => { S.grade = 3; save(); });
      const forest = await fp.evaluate(() => PATHS.math.worlds.findIndex(w => w.id === 'm_frac'));
      const openStop = async k => {
        await fp.evaluate(() => home());
        await fp.click('.game[data-p="math"]');
        await fp.waitForSelector('.wchip.on');
        await fp.click(`.wchip[data-w="${forest}"]`);
        await fp.waitForSelector(`.wchip.on[data-w="${forest}"]`);
        const n = await fp.evaluate(([w, k]) => WR.math[w][0] + k, [forest, k]);
        await fp.click(`.node[data-n="${n}"]`);
        await fp.waitForSelector('#prompt');
      };
      await openStop(0);
      const world = await fp.evaluate(w => ({ id: PATHS.math.worlds[w].id, stops: WR.math[w][1] - WR.math[w][0] + 1,
        first: NODES.math[WR.math[w][0]].sk + NODES.math[WR.math[w][0]].lv }), forest);
      if (world.id !== 'm_frac' || world.stops !== 5 || world.first !== 'frac2') fail('Fraction Forest map: ' + JSON.stringify(world));
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
        await sp.waitForSelector('#prompt');
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
