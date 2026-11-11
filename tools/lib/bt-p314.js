// P3-14 Riddles, Memory Match, Copy Cat (src/js/81-83-bt-*.js): real taps for the smoke bot and the screenshots.
const vspeed = () => +process.env.SMOKE_SPEED || 8;

// Riddles: the choice index of the answer of the riddle on screen, and a wrong one that is still in play
async function rdNow(page) {
  return page.evaluate(() => {
    const p = S.bt.cur.puzzle, s = S.bt.cur.state || { i: 0, x: [], g: [] }, it = p.items[s.i];
    const wrong = it.ch.map((_, c) => c).filter(c => c !== it.a && !s.x.includes(c) && !(s.g || []).includes(c));
    return { i: s.i, a: it.a, wrong: wrong[0], n: p.items.length };
  });
}
async function rdTap(page, c) { await page.click(`.rd-ch[data-c="${c}"]`); }

// Memory: the winning pairs (card places) not matched yet
async function mmRest(page) {
  return page.evaluate(() => {
    const p = S.bt.cur.puzzle, s = S.bt.cur.state || MM.fresh();
    return MM.solve(p).filter(([a]) => !s.m.includes(a));
  });
}
// two cards that do not match, neither matched yet
async function mmMiss(page) {
  return page.evaluate(() => {
    const p = S.bt.cur.puzzle, s = S.bt.cur.state || MM.fresh(), open = p.cards.map((_, i) => i).filter(i => !s.m.includes(i));
    for (const a of open) for (const b of open) if (a < b && p.cards[a][0] !== p.cards[b][0]) return [a, b];
    return null;
  });
}
async function mmTap(page, i) {
  await page.click(`.mm-c[data-i="${i}"]`);
}

// Copy Cat: wait until it is the child's turn (the pads have been shown), then tap what the round asks for (n taps, or all)
async function ccTurn(page, timeout = 30000) {
  await page.waitForFunction(() => BT.act && BT.act.inst && BT.act.inst.now && BT.act.inst.now().phase == 'input', null, { timeout });
  return page.evaluate(() => ({ now: BT.act.inst.now(), want: CC.expect(S.bt.cur.puzzle, BT.act.inst.now().r), len: S.bt.cur.puzzle.len }));
}
async function ccTapRound(page, n) {
  const t = await ccTurn(page);
  const taps = t.want.slice(t.now.taps.length, n == null ? undefined : t.now.taps.length + n);
  for (const v of taps) { await page.click(`.cc-pad[data-p="${v}"]`); await page.waitForTimeout(40); }
  return t;
}
// play every round from the one on screen to the target (the last round's taps win the puzzle)
async function ccWin(page) {
  for (let k = 0; k < 20; k++) {
    const t = await ccTapRound(page);
    if (t.now.r >= t.len) return;
    await page.waitForFunction(r => BT.act.inst.now().r > r, t.now.r, { timeout: 10000 });
  }
}
module.exports = { vspeed, rdNow, rdTap, mmRest, mmMiss, mmTap, ccTurn, ccTapRound, ccWin };
