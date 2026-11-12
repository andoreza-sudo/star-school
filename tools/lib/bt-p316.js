// P3-16 Spatial puzzles (src/js/84-86-bt-*.js): real taps for the smoke bot and the screenshots.

// Cube Count: the stack on screen and its answer
async function cbNow(page) {
  return page.evaluate(() => {
    const p = S.bt.cur.puzzle, s = S.bt.cur.state || CUB.fresh();
    return { i: s.i, n: p.items[s.i].n, items: p.items.length, h: s.h };
  });
}
// type a number on the pad and tap the tick
async function cbType(page, num) {
  for (const d of String(num)) await page.click(`.cb-pad .k[data-k="${d}"]`);
  await page.click('.cb-pad .k[data-k="go"]');
}
// answer every stack from the one on screen (waits for the next stack to come in)
async function cbWin(page) {
  for (let k = 0; k < 6; k++) {
    if (!(await page.evaluate(() => !!(S.bt.cur && BT.act && !BT.act.won)))) return;
    const t = await cbNow(page);
    await cbType(page, t.n);
    if (t.i >= t.items - 1) return;
    await page.waitForFunction(i => S.bt.cur.state && S.bt.cur.state.i > i && document.querySelector('.cb-box') && !document.querySelector('.cb-box.ok'), t.i, { timeout: 10000 });
  }
}

// Turn It: the shape on screen: the answer, a wrong choice still in play, and the mirror-image choice (if any, still in play)
async function roNow(page) {
  return page.evaluate(() => {
    const p = S.bt.cur.puzzle, s = S.bt.cur.state || ROT.fresh(), it = p.items[s.i];
    const open = it.ch.map((_, c) => c).filter(c => c !== it.a && !s.x.includes(c) && !s.g.includes(c));
    return { i: s.i, a: it.a, wrong: open.find(c => it.ch[c].k == 'm'), flip: open.find(c => it.ch[c].k == 'f'), items: p.items.length };
  });
}
async function roTap(page, c) { await page.click(`.ro-ch[data-c="${c}"]`); }
async function roWin(page) {
  for (let k = 0; k < 6; k++) {
    if (!(await page.evaluate(() => !!(S.bt.cur && BT.act && !BT.act.won)))) return;
    const t = await roNow(page);
    await roTap(page, t.a);
    if (t.i >= t.items - 1) return;
    await page.waitForFunction(i => S.bt.cur.state && S.bt.cur.state.i > i && !document.querySelector('.ro-ch.right'), t.i, { timeout: 10000 });
  }
}

// Mirror: the twins still missing, and a square on the empty side that is not a twin
async function mrNow(page) {
  return page.evaluate(() => {
    const p = S.bt.cur.puzzle, s = S.bt.cur.state || MRR.fresh(), W = MRR.want(p), n = p.n;
    const wrong = [...Array(n * n).keys()].filter(i => MRR.side(p, Math.floor(i / n), i % n) == 't' && !W.includes(i));
    return { left: W.filter(i => !s.on.includes(i)), wrong: wrong[Math.floor(wrong.length / 2)], all: W.length };
  });
}
async function mrTap(page, i) { await page.click(`.mr-cell.t[data-i="${i}"]`); }
async function mrFill(page, n) {
  const t = await mrNow(page);
  for (const i of t.left.slice(0, n == null ? undefined : n)) { await mrTap(page, i); await page.waitForTimeout(30); }
}
module.exports = { cbNow, cbType, cbWin, roNow, roTap, roWin, mrNow, mrTap, mrFill };
