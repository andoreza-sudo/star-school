// P3-03 Sudoku (src/js/78-bt-sudoku.js): real taps for the smoke bot and the screenshots.
// A move is one item of solve(): [square, value]. With the zoom box on (9x9 on a phone) a move can tap the board square (the box)
// and then the same square in the zoom box (o.zoom).
async function move(page, m, o = {}) {
  await page.click(`.sd-board .sd-c[data-c="${m[0]}"]`);
  if (o.zoom) await page.click(`.sd-zoom .sd-c[data-c="${m[0]}"]`);
  await page.click(`.sd-pad .k[data-k="${m[1]}"]`);
}
// The next moves still to make (the squares not yet right), in solve() order
async function rest(page) {
  return page.evaluate(() => {
    const p = S.bt.cur.puzzle, st = S.bt.cur.state || SD.fresh(p), b = SD.vals(p, st), s = SD.nums(p.s);
    return BT.get('sudoku').solve(p).filter(([c]) => b[c] != s[c]);
  });
}
// One wrong entry in the first empty square: a number already in its row, column or box (so it clashes; in bands A and B it
// bounces out). Returns [square, value].
async function wrong(page) {
  const m = await page.evaluate(() => {
    const p = S.bt.cur.puzzle, st = S.bt.cur.state || SD.fresh(p), b = SD.vals(p, st), s = SD.nums(p.s), G = SD.geo(p.n, p.bw, p.bh);
    for (let c = 0; c < b.length; c++) {
      if (b[c]) continue;
      // a number still on the pad (in bands A and B a used-up one is greyed out)
      const v = G.peers[c].map(q => b[q]).find(v => v && v != s[c] && b.filter(x => x == v).length < p.n);
      if (v) return [c, v];
    }
    return null;
  });
  if (m) await move(page, m);
  return m;
}
module.exports = { move, rest, wrong };
