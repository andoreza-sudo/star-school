// P3-15 Word Search and Unscramble (src/js/87-88-bt-*.js): real pointer input and taps for the smoke bot and the screenshots.

// Word Search: the words not found yet, with their first and last squares
async function wsNow(page) {
  return page.evaluate(() => {
    const p = S.bt.cur.puzzle, s = (S.bt.cur && S.bt.cur.state) || WS.fresh(), e = WS.solve(p);
    return { left: p.w.map((x, i) => ({ i, t: x.t, a: e[i][0], b: e[i][1] })).filter(x => !s.f.includes(x.i)), n: p.n, all: p.w.length, miss: s.miss, f: s.f.slice() };
  });
}
// the centre of square i on screen, and the square size
async function wsAt(page, i) {
  return page.evaluate(i => {
    const r = document.querySelectorAll('.ws-c')[i].getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width };
  }, i);
}
// one finger (cdp given: touch events) or the mouse goes down on square a, moves in small steps to square b, and lifts
async function wsDrag(page, a, b, cdp) {
  const p = await wsAt(page, a), q = await wsAt(page, b), steps = 8;
  const pts = Array.from({ length: steps + 1 }, (_, k) => ({ x: p.x + (q.x - p.x) * k / steps, y: p.y + (q.y - p.y) * k / steps }));
  if (cdp) {
    const tp = o => [{ x: o.x, y: o.y, radiusX: 6, radiusY: 6, id: 1 }];
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: tp(pts[0]) });
    for (const o of pts.slice(1)) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: tp(o) });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  } else {
    await page.mouse.move(pts[0].x, pts[0].y);
    await page.mouse.down();
    for (const o of pts.slice(1)) await page.mouse.move(o.x, o.y);
    await page.mouse.up();
  }
  await page.waitForTimeout(40);
}
// a tap on square i (touch with cdp, else the mouse)
async function wsTap(page, i, cdp) {
  const p = await wsAt(page, i);
  if (cdp) {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: p.x, y: p.y, radiusX: 6, radiusY: 6, id: 1 }] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  } else await page.mouse.click(p.x, p.y);
  await page.waitForTimeout(40);
}
// find the words still left by dragging (every other one from its last letter back to its first); n: how many (all when left out)
async function wsFind(page, n, cdp) {
  const t = await wsNow(page);
  let k = 0;
  for (const x of t.left.slice(0, n == null ? undefined : n)) {
    if (k++ % 2) await wsDrag(page, x.b, x.a, cdp); else await wsDrag(page, x.a, x.b, cdp);
  }
}

// Unscramble: the word on screen
async function usNow(page) {
  return page.evaluate(() => {
    const p = S.bt.cur.puzzle, s = (S.bt.cur && S.bt.cur.state) || US.fresh(p), it = p.items[s.i];
    return { i: s.i, w: it.w, s: it.s, sl: s.sl.slice(), lk: s.lk, items: p.items.length, order: US.order(it), miss: s.miss };
  });
}
// tap tiles into boxes: n letters of the answer (all when left out); a box holding a wrong letter is tapped back first
async function usSpell(page, n) {
  const t = await usNow(page);
  for (let k = t.lk; k < t.w.length; k++) if (t.sl[k] >= 0 && t.s[t.sl[k]] != t.w[k]) await page.click(`.us-box[data-k="${k}"]`);
  const u = await usNow(page), used = new Set(u.sl.filter(x => x >= 0));
  let c = 0;
  for (let k = 0; k < u.w.length && (n == null || c < n); k++) {
    if (u.sl[k] >= 0) continue;
    const tile = [...u.s].findIndex((ch, j) => ch == u.w[k] && !used.has(j));
    used.add(tile);
    await page.click(`.us-tile[data-t="${tile}"]`);
    c++;
  }
}
// a wrong order: the tiles as they lie, which is never the word
async function usWrong(page) {
  const t = await usNow(page);
  for (let j = 0; j < t.s.length; j++) if (!t.sl.includes(j)) await page.click(`.us-tile[data-t="${j}"]`);
}
// spell every word left, waiting for each next word to come in
async function usWin(page) {
  for (let k = 0; k < 8; k++) {
    if (!(await page.evaluate(() => !!(S.bt.cur && BT.act && !BT.act.won)))) return;
    const t = await usNow(page);
    await usSpell(page);
    if (t.i >= t.items - 1) return;
    await page.waitForFunction(i => S.bt.cur.state && S.bt.cur.state.i > i && document.querySelector('.us-tile[data-t]') && !document.querySelector('.us-boxes.ok'), t.i, { timeout: 10000 });
  }
}
module.exports = { wsNow, wsAt, wsDrag, wsTap, wsFind, usNow, usSpell, usWrong, usWin };
