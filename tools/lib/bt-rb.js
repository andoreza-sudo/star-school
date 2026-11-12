// P3-13 Robot Path (src/js/81-bt-robot.js): real taps for the smoke bot and the screenshots.
// A program is {m: main tokens, f: function tokens} as solve() gives it. Tokens are put in at the cursor the way a child does it:
// a palette block, Repeat then its number, the end of a loop by tapping the loop's end bracket, the function by tapping its strip first.
async function token(page, t) {
  if (/^r\d$/.test(t)) {
    await page.click('.rb-p[data-t="rep"]');
    await page.click(`.rb-nk[data-n="${t[1]}"]`);
  } else if (t === 'en') {
    const [s, i] = await page.evaluate(() => { const st = RB.cur.st(); return [st.cs, st.ci]; }); // the cursor sits just before the loop's end
    await page.click(`.rb-end[data-s="${s}"][data-e="${i}"]`);
  } else {
    await page.click(`.rb-p[data-t="${t}"]`);
  }
}
async function build(page, prog) {
  for (const t of prog.m) await token(page, t);
  if (prog.f && prog.f.length) {
    await page.click('.rb-strip[data-s="f"] .rb-slot');
    for (const t of prog.f) await token(page, t);
  }
}
// The tokens still to tap when the program on screen is the start of solve() with the cursor after it
async function rest(page) {
  return page.evaluate(() => {
    const p = RB.cur.p, st = RB.cur.st(), sol = BT.get('robot').solve(p);
    return { m: sol.m.slice(st.cs === 'm' ? st.ci : sol.m.length), f: sol.f.slice(st.f.length) };
  });
}
// A short program that bumps into a wall or the edge (for a failed run), built by taps. Returns it.
async function bump(page) {
  const prog = await page.evaluate(() => {
    const p = RB.cur.p, abs = p.kit === 'abs';
    const tries = abs ? ['up', 'dn', 'lf', 'rt'].flatMap(t => [[t], [t, t], [t, t, t]]) : [['fw'], ['tl', 'fw'], ['tr', 'fw'], ['fw', 'fw'], ['tl', 'tl', 'fw']];
    for (const m of tries) if (RB.run(p, { m, f: [] }).out === 'bump') return { m, f: [] };
    return null;
  });
  if (prog) await build(page, prog);
  return prog;
}
// Press Go and wait until the run has been shown to the end
async function go(page) {
  await page.click('.rb-go');
  await page.waitForFunction(() => RB.cur && !RB.cur.busy(), null, { timeout: 30000 });
}
module.exports = { token, build, rest, bump, go };
