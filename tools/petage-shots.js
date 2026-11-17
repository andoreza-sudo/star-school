// Pet age screenshots (pet grows up with the grade): node tools/petage-shots.js
// Writes petage-grid.png (every species x age 0..2 x growth stages kid / grown) and petage-home-age2.png (Home at grade 6) into
// PETAGE_SHOTS (default /tmp/petage-shots), device scale factor 2. The pets come from petSVG() with S.grade set, so it also shows the grade -> age link.
const fs = require('fs');
const path = require('path');
const { launch, openApp } = require('./lib/browser');
const OUT = path.resolve(process.env.PETAGE_SHOTS || '/tmp/petage-shots');
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await launch();
  try {
    const { page, errors } = await openApp(browser, { fixture: 'midway', width: 900, height: 700, scale: 2 });
    await page.waitForSelector('#pet', { timeout: 15000 });
    await page.evaluate(() => {
      const rows = Object.keys(PET_RIG), grades = [[1, 'little one (grade 1)'], [3, 'older kid (grade 3)'], [6, 'teen-like (grade 6)']];
      const keep = S.grade;
      let h = '<div id="pagrid" style="position:fixed;inset:0;z-index:99;background:#fff;overflow:auto;padding:10px;font:14px sans-serif">';
      h += '<div style="display:grid;grid-template-columns:70px repeat(6,1fr);gap:4px;align-items:end;text-align:center">';
      h += '<div></div>' + ['kid', 'grown'].map(st => grades.map(([g, n]) => `<b>${st}<br>${n}</b>`).join('')).join('');
      for (const k of rows) {
        h += `<b>${k}</b>`;
        for (const st of ['kid', 'grown']) for (const [g] of grades) {
          S.grade = g;
          h += `<div style="font-size:60px;height:110px">${petSVG(k, st, 'happy', { hat: wearOf('🎩'), toy: wearOf('🎈') })}</div>`;
        }
      }
      S.grade = keep;
      document.body.insertAdjacentHTML('beforeend', h + '</div></div>');
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(OUT, 'petage-grid.png') });
    await page.evaluate(() => document.getElementById('pagrid').remove());
    for (const k of ['dragon', 'dino', 'bird', 'ocean']) {
      await page.evaluate(k => { S.pet = k; S.grade = 6; S.stars = Math.max(S.stars, 90); home(); }, k);
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(OUT, `petage-home-age2-${k}.png`) });
    }
    if (errors.length) { console.error(errors); process.exit(1); }
    console.log('wrote ' + OUT);
  } finally { await browser.close(); }
})();
