// BRAND (v193): renders the app icons and the Play listing icon from the approved logo SVGs, once, into committed PNGs.
//   node tools/brand-icons.js
// Why not in tools/build.py: the build is Python with no SVG renderer, and a PNG drawn by Chrome can differ by a pixel between
// Chrome versions, so the build would not give the same bytes everywhere. This script draws them with the system Chrome
// (playwright-core, like smoke.js) and Pillow optimizes them; the PNGs are committed, and build.py only copies docs/brand/icons/*.png
// to the repo root. Run it again only when docs/brand/whistlestop-icon.svg or docs/brand/icon-small.svg changes, then build.
//
// Sources (DESIGN_SYSTEM.md, "Logo"):
//   docs/brand/whistlestop-icon.svg  g#mark-ws: the full-bleed 100x100 mark; g#tile: the mark zoomed 1.4x in a rounded square (rx 22)
//   docs/brand/icon-small.svg        the 32 px version (favicon)
// Outputs:
//   docs/brand/icons/icon-192.png, icon-512.png          purpose "any": the rounded tile (transparent corners), as a launcher shows it
//   docs/brand/icons/icon-maskable-192.png, -512.png            purpose "maskable": the full-bleed mark, opaque; everything that matters is
//                                                         inside the circle of radius 33 (the safe zone is 40)
//   docs/brand/icons/favicon-32.png                             icon-small.svg at 32 px (rounded, transparent corners)
//   docs/brand/store/icon-512.png                        the Play listing icon: 512x512, 32-bit (RGBA) PNG, full bleed, every pixel
//                                                         opaque (the tile's art, zoomed 1.4x, without the rounded corners: Play adds them)
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright-core');
const { chromePath } = require('./lib/browser.js');

const ROOT = path.join(__dirname, '..');
const BRAND = path.join(ROOT, 'docs', 'brand');
const full = fs.readFileSync(path.join(BRAND, 'whistlestop-icon.svg'), 'utf8');
const small = fs.readFileSync(path.join(BRAND, 'icon-small.svg'), 'utf8');
const defs = (full.match(/<defs>[\s\S]*<\/defs>/) || [])[0];
if (!defs || !defs.includes('id="mark-ws"') || !defs.includes('id="tile-ws"')) throw new Error('whistlestop-icon.svg: no #mark-ws or #tile-ws in <defs>');

const ZOOM = '<use href="#mark-ws" transform="matrix(1.4 0 0 1.4 -20 -20)"/>';
const svg = (n, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${n}" height="${n}">${defs}${body}</svg>`;
const JOBS = [
  // [output, size, svg markup, mode after Pillow: RGBA keeps the alpha, RGB drops it (only for art that is opaque everywhere)]
  ['docs/brand/icons/icon-192.png', 192, n => svg(n, `<g clip-path="url(#tile-ws)">${ZOOM}</g>`), 'RGBA'],
  ['docs/brand/icons/icon-512.png', 512, n => svg(n, `<g clip-path="url(#tile-ws)">${ZOOM}</g>`), 'RGBA'],
  ['docs/brand/icons/icon-maskable-192.png', 192, n => svg(n, '<use href="#mark-ws"/>'), 'RGB'],
  ['docs/brand/icons/icon-maskable-512.png', 512, n => svg(n, '<use href="#mark-ws"/>'), 'RGB'],
  ['docs/brand/icons/favicon-32.png', 32, n => small.replace(/width="32" height="32"/, `width="${n}" height="${n}"`), 'RGBA'],
  ['docs/brand/store/icon-512.png', 512, n => svg(n, ZOOM), 'RGBA'],
];

(async () => {
  const browser = await chromium.launch({ executablePath: chromePath(), args: ['--force-color-profile=srgb', '--disable-lcd-text'] });
  const page = await browser.newPage({ viewport: { width: 600, height: 600 }, deviceScaleFactor: 1 });
  for (const [out, n, make, mode] of JOBS) {
    await page.setContent(`<!DOCTYPE html><html><body style="margin:0;background:transparent">${make(n)}</body></html>`);
    const el = await page.$('svg');
    const file = path.join(ROOT, out);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, await el.screenshot({ omitBackground: true }));
    // Pillow: the colour mode, then the smallest lossless PNG; a mode RGB file must have had no transparent pixel
    execFileSync('python3', ['-I', '-c', `
import sys
from PIL import Image
f, mode, n = sys.argv[1], sys.argv[2], int(sys.argv[3])
im = Image.open(f).convert('RGBA')
assert im.size == (n, n), im.size
lo = im.getchannel('A').getextrema()[0]
if mode == 'RGB' or f.endswith('store/icon-512.png'):
    assert lo == 255, f + ': not opaque everywhere'
im.convert(mode).save(f, optimize=True)
`, file, mode, String(n)]);
    console.log(out, n + 'x' + n, mode, fs.statSync(file).size, 'bytes');
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
