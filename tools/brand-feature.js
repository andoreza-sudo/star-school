// BRAND: draws the Play feature graphic (1024x500) from the approved logo SVG, so docs/brand/store/feature-1024x500.png can be made again.
//   node tools/brand-feature.js            writes tools/out/brand/feature-1024x500.png and compares it with the committed file
//   node tools/brand-feature.js --write    also replaces docs/brand/store/feature-1024x500.png (only after looking at the new file:
//                                          the committed one is the look the owner approved on 2026-11-22)
// The scene: the mark's dusk sky widened to 1024x500 (1 unit = 5 px), its sun glow behind the engine, five stars, soft hills, the rails
// and sleepers; the engine (every part of g#mark-ws that is not class "bg") on the right; the wordmark (g#word, "stop" in --brand-shade)
// and the line "Learn your way, stop by stop." in Andika 700 on the left. Shapes and colours come from docs/brand/whistlestop-icon.svg,
// so a change to the mark shows here too; only the layout below is fixed. Drawn with the system Chrome (playwright-core), saved as RGB
// by Pillow. A PNG drawn by another Chrome version can differ by a few pixels; the comparison prints how many.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright-core');
const { chromePath } = require('./lib/browser.js');

const ROOT = path.join(__dirname, '..');
const SVG = fs.readFileSync(path.join(ROOT, 'docs', 'brand', 'whistlestop-icon.svg'), 'utf8');
const COMMITTED = path.join(ROOT, 'docs', 'brand', 'store', 'feature-1024x500.png');
const OUT = path.join(ROOT, 'tools', 'out', 'brand', 'feature-1024x500.png');
const font = fs.readFileSync(path.join(ROOT, 'tools', 'fonts', 'andika-latin-700-normal.woff2')).toString('base64');

const need = (re, what) => { const m = SVG.match(re); if (!m) throw new Error('whistlestop-icon.svg: no ' + what); return m; };
const grads = need(/<defs>\n([\s\S]*?)\n<g id="mark-ws">/, 'gradients before g#mark-ws')[1];
const mark = need(/<g id="mark-ws">\n([\s\S]*?)\n<\/g>\n<clipPath/, 'g#mark-ws')[1].split('\n');
const fg = mark.filter(l => !/class="bg"/.test(l)); // the engine, its plume and the lamp glow
const engine = fg.slice(0, fg.lastIndexOf('  </g>') + 1).join('\n').replace(/^ +/, '').replace(/\n  <\/g>$/, '</g>');
const glow = fg.slice(fg.lastIndexOf('  </g>') + 1).join('\n');
const word = need(/<g id="word">\n  <path class="w1" d="([^"]+)"\/>\n  <path class="w2" d="([^"]+)"\/>\n  (<path class="dot"[^>]+\/>)/, 'g#word');

const EX = 158; // the engine's centre x in the 204.8 x 100 frame
const html = `<!doctype html><meta charset="utf-8"><style>@font-face{font-family:A;font-weight:700;src:url(data:font/woff2;base64,${font}) format('woff2')}
body{margin:0}</style><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 204.8 100" width="1024" height="500" style="display:block">
<defs>${grads}</defs>
<rect width="204.8" height="100" fill="url(#ws-sky)"/>
<circle cx="${EX}" cy="60" r="44" fill="url(#ws-sun)"/>
<g fill="#FFFFFF"><circle cx="20" cy="6" r=".8" opacity=".8"/><circle cx="64" cy="4" r=".7" opacity=".6"/><circle cx="160" cy="7" r=".9" opacity=".9"/><circle cx="190" cy="4" r=".7" opacity=".7"/><circle cx="96" cy="8" r=".6" opacity=".6"/></g>
<path fill="#C9A26A" opacity=".55" d="M0 60V54C14 49 30 48 46 52C60 55 70 57 82 60ZM138 60C150 54 164 50 178 50C190 50 200 52 205 54V60Z"/>
<path fill="#B06F2E" opacity=".45" d="M0 60V57C14 54 30 55 44 60ZM160 60C172 55 190 55 205 57V60Z"/>
<path fill="none" stroke="#FFE3B3" stroke-width="1.6" d="M${EX - 4} 60L${EX - 32} 100M${EX + 4} 60L${EX + 32} 100"/>
<path fill="none" stroke="#5E341A" stroke-width="1.4" d="M${EX - 9} 68H${EX + 9}M${EX - 15} 76H${EX + 15}M${EX - 22} 86H${EX + 22}M${EX - 31} 98H${EX + 31}"/>
<g transform="translate(${EX - 50} 0)">${engine}
${glow}</g>
<g transform="translate(-10 15) scale(.25)"><path fill="#1F2440" d="${word[1]}"/><path fill="#2F49B8" d="${word[2]}"/>${word[3]}</g>
<text x="21" y="51.5" font-family="A" font-weight="700" font-size="7.6" fill="#3D4263">Learn your way, stop by stop.</text>
</svg>`;

(async () => {
  const browser = await chromium.launch({ executablePath: chromePath(), args: ['--force-color-profile=srgb', '--disable-lcd-text'] });
  const page = await browser.newPage({ viewport: { width: 1024, height: 500 }, deviceScaleFactor: 1 });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, await page.screenshot());
  await browser.close();
  // Pillow: RGB (the graphic is opaque), the smallest lossless PNG; then the pixels that differ from the committed file
  const r = execFileSync('python3', ['-I', '-c', `
import sys
from PIL import Image, ImageChops
out, ref = sys.argv[1], sys.argv[2]
im = Image.open(out).convert('RGB'); assert im.size == (1024, 500), im.size
im.save(out, optimize=True)
r, g, b = ImageChops.difference(im, Image.open(ref).convert('RGB')).split()
h = ImageChops.lighter(ImageChops.lighter(r, g), b).histogram()  # per pixel, the largest channel difference
print(sum(h[1:]), sum(h[17:]), max([i for i, c in enumerate(h) if c] or [0]))
`, OUT, COMMITTED]).toString().trim().split(' ').map(Number);
  console.log(path.relative(ROOT, OUT), fs.statSync(OUT).size, 'bytes;', r[0], 'pixels differ from the committed graphic (' + r[1] + ' by more than 16 of 255, largest ' + r[2] + ')');
  if (process.argv.includes('--write')) { fs.copyFileSync(OUT, COMMITTED); console.log('wrote', path.relative(ROOT, COMMITTED)); }
})().catch(e => { console.error(e); process.exit(1); });
