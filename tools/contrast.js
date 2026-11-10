// Contrast check for the design tokens in src/css/00-tokens.css. Usage: node tools/contrast.js (exit 1 on failure)
const fs = require('fs'), path = require('path');
const css = fs.readFileSync(path.join(__dirname, '..', 'src', 'css', '00-tokens.css'), 'utf8');
const T = {};
for (const m of css.matchAll(/--([a-z0-9-]+):(#[0-9a-fA-F]{6})\b/g)) T[m[1]] = m[2];
const lum = h => {
  const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
    .map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const x = lum(T[a]), y = lum(T[b]); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const rules = [];
// text on surface and paper: 4.5
for (const t of ['ink', 'ink-2', 'ink-3', 'brand', 'good-ink', 'try-ink', 'math', 'read', 'es', 'disc', 'bt'])
  for (const bg of ['surface', 'paper']) rules.push([t, bg, 4.5, 'text on ' + bg]);
// white text on fills: 4.5 for small text; fills that carry only large text or icons are held to 3
for (const f of ['brand', 'brand-shade', 'math', 'read', 'es', 'disc', 'bt', 'danger', 'good-ink']) rules.push(['surface', f, 4.5, 'white text on fill']);
for (const f of ['play', 'good']) rules.push(['surface', f, 3, 'white large text or icon on fill']);
// shade on its tint: 4.5
for (const s of ['math', 'read', 'es', 'disc', 'bt', 'play']) rules.push([s + '-shade', s + '-tint', 4.5, 'shade on tint']);
rules.push(['good-ink', 'good-tint', 4.5, 'shade on tint'], ['try-ink', 'try-tint', 4.5, 'shade on tint'], ['brand-shade', 'brand-tint', 4.5, 'shade on tint']);
let fail = 0;
for (const [a, b, min, what] of rules) {
  const r = ratio(a, b), ok = r >= min;
  if (!ok) fail++;
  console.log((ok ? 'ok   ' : 'FAIL ') + r.toFixed(2).padStart(5) + ' (min ' + min + ')  --' + a + ' on --' + b + '  [' + what + ']');
}
console.log(fail ? fail + ' contrast pair(s) failed' : 'all ' + rules.length + ' contrast pairs pass');
process.exit(fail ? 1 : 0);
