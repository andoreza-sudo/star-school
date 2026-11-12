// P3-10 number puzzles (src/js/77-bt-number.js): real taps for the smoke bot and the screenshots.
// A move is one item of solve(): pyramid [brick, value], balance [slot, value], target [leftTile, op, rightTile].
async function typeNum(page, v) {
  for (const d of String(v)) await page.click(`.bn-pad .k[data-k="${d}"]`);
  await page.click('.bn-pad .k[data-k="go"]');
}
async function move(page, id, m) {
  if (id == 'pyramid') {
    await page.click(`.bn-br[data-b="${m[0]}"]`);
    await typeNum(page, m[1]);
  } else if (id == 'balance') {
    await page.click(`.bn-slot[data-s="${m[0]}"]`);
    await typeNum(page, m[1]);
  } else {
    await page.click(`.bn-tile[data-t="${m[0]}"]`);
    await page.click(`.bn-op[data-op="${m[1]}"]`);
    await page.click(`.bn-tile[data-t="${m[2]}"]`);
  }
}
// One wrong entry: the first open brick or box gets its number plus one; a target gets a full set of joins that misses.
// Returns what was done, for the report.
async function wrong(page, id) {
  if (id == 'target') {
    const plan = await page.evaluate(() => {
      const p = S.bt.cur.puzzle, T = BTN.TGT;
      for (const op of ['+', 'x', '-']) {
        const st = T.fresh(p), steps = [];
        let ok = true;
        while (st.tiles.length > 1 && (p.use == 0 || !steps.length)) {
          const s = [st.tiles[0].id, op, st.tiles[1].id];
          if (T.join(st, ...s).err) { ok = false; break; }
          steps.push(s);
        }
        if (ok && !T.won(p, st)) return steps;
      }
      return null;
    });
    if (!plan) return 'no wrong plan';
    for (const s of plan) await move(page, id, s);
    return plan.length + ' joins that miss';
  }
  const m = await page.evaluate(id => {
    const c = S.bt.cur, done = (c.state && c.state.done) || [];
    return BT.get(id).solve(c.puzzle).find(x => !done.some(d => String(d) == String(x[0])));
  }, id);
  await move(page, id, [m[0], m[1] + 1]);
  return 'typed ' + (m[1] + 1);
}
module.exports = { move, wrong, typeNum };
