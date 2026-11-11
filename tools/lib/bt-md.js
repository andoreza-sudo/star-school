// P3-05 MathDoku (src/js/79-bt-mdoku.js): real taps for the smoke bot and the screenshots.
// A move is one item of solve(): [square, value]: tap the square, then the number on the pad.
async function move(page, m) {
  await page.click(`.md-grid .md-c[data-c="${m[0]}"]`);
  await page.click(`.md-pad .k[data-k="${m[1]}"]`);
}
// The next moves still to make (the squares not yet right, wrong ones included), in solve() order
async function rest(page) {
  return page.evaluate(() => {
    const p = S.bt.cur.puzzle, st = S.bt.cur.state || MD.fresh(p), b = MD.vals(p, st), s = MD.nums(p.s);
    return BT.get('mdoku').solve(p).filter(([c]) => b[c] != s[c]);
  });
}
// A clash: in the first empty square, a number that is already in its row or column. Returns [square, value].
async function clash(page) {
  const m = await page.evaluate(() => {
    const p = S.bt.cur.puzzle, st = S.bt.cur.state || MD.fresh(p), b = MD.vals(p, st), G = MD.geo(p.n);
    for (let c = 0; c < b.length; c++) {
      if (b[c]) continue;
      const v = G.peers[c].map(q => b[q]).find(v => v && v != +p.s[c]);
      if (v) return [c, v];
    }
    return null;
  });
  if (m) await move(page, m);
  return m;
}
// A cage miss: an empty cage filled with numbers that clash with nothing on the board but do not make its target.
// Returns the moves made ([[square, value], ...]) or null.
async function miss(page) {
  const ms = await page.evaluate(() => {
    const p = S.bt.cur.puzzle, st = S.bt.cur.state || MD.fresh(p), b = MD.vals(p, st), G = MD.geo(p.n);
    for (const g of p.cg) {
      if (g.c.length < 2 || g.c.some(c => b[c])) continue;
      const v = g.c.map(() => 0);
      const rec = i => {
        if (i == g.c.length) return MD.calc(g.o, v) !== g.t;
        for (let x = 1; x <= p.n; x++) {
          if (G.peers[g.c[i]].some(q => b[q] == x) || g.c.slice(0, i).some((q, j) => v[j] == x && G.peers[q].includes(g.c[i]))) continue;
          v[i] = x;
          if (rec(i + 1)) return true;
        }
        return false;
      };
      if (rec(0)) return g.c.map((c, i) => [c, v[i]]);
    }
    return null;
  });
  if (ms) for (const m of ms) await move(page, m);
  return ms;
}
module.exports = { move, rest, clash, miss };
