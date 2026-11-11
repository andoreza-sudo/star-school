// P3-07 Logic grids (src/js/80-bt-logic.js): real taps for the smoke bot and the screenshots.
// A square cycles blank -> cross -> tick -> blank. On a phone a band D grid shows one block at a time: a tab is tapped first.
async function show(page, c) {
  const k = await page.evaluate(c => {
    if (!S.bt.cur) return -1;
    const e = document.querySelector(`.lg-c[data-c="${c}"]`);
    return e ? -1 : Math.floor(c / (S.bt.cur.puzzle.n * S.bt.cur.puzzle.n));
  }, c);
  if (k >= 0) await page.click((await page.$(`#lgtabs button[data-v="${k}"]`)) ? `#lgtabs button[data-v="${k}"]` : '#lgtabs button[data-v="0"]');
}
// tap square c until it shows want ('1' tick, '2' cross, '0' blank); returns the taps made
async function setTo(page, c, want) {
  await show(page, c);
  for (let i = 0; i < 3; i++) {
    const v = await page.evaluate(c => (S.bt.cur ? (S.bt.cur.state || LG.fresh(S.bt.cur.puzzle)).v[c] : null), c);
    if (v === want || v === null) return i; // null: solved, the puzzle is gone
    await page.click(`.lg-c[data-c="${c}"]`);
  }
  return 3;
}
// the squares still to tick, in solve() order
async function rest(page) {
  return page.evaluate(() => {
    const p = S.bt.cur.puzzle, st = S.bt.cur.state || LG.fresh(p);
    return BT.get('logic').solve(p).filter(c => st.v[c] !== '1');
  });
}
// one mark that breaks a clue the child can see: a cross where an "is" clue says yes, else a tick where a "not" clue says no.
// Returns [square, mark].
async function wrong(page) {
  const m = await page.evaluate(() => {
    const p = S.bt.cur.puzzle, st = S.bt.cur.state || LG.fresh(p);
    for (const q of p.cl) {
      if (q[0] !== 'is' && q[0] !== 'not') continue;
      const c = LG.at(LG.ctx(p), q[1], q[2], q[3], q[4]);
      if (st.v[c] === '0') return [c, q[0] === 'is' ? '2' : '1'];
    }
    return null;
  });
  if (m) await setTo(page, m[0], m[1]);
  return m;
}
module.exports = { show, setTo, rest, wrong };
