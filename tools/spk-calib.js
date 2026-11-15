// S-SPK2: calibrate the offline sound check of "Say it!" (src/js/50-say-cmp.js) on the app's own recordings (audio/es/*.ogg).
//   node tools/spk-calib.js            the accuracy with the thresholds in 50-say-cmp.js (SPKC.ABS, SPKC.RATIO)
//   node tools/spk-calib.js --grid     also tries a grid of thresholds and prints the best ones
// Needs ffmpeg (decodes each file to 16 kHz mono, as the tablet's decodeAudioData does). Deterministic: no randomness.
// The cases, made from the recordings themselves (cases() below; tools/test.js "Spanish speaking check S-SPK2" uses the same):
//   right word, another speaker   a line said in the other voice (Leo / Eve) as another line with the same words (la manzana / manzana)
//   right word, a child-like voice  a line's own recording sped up and raised 12% (a higher, faster voice) or slowed 10%, with noise
//   a similar word                the 4th to 6th closest-spelled line (so not one of the 3 the check compares with), in the child-like voice
//   another word                  a line far down the list, in the child-like voice
//   silence and noise             nothing, a quiet hiss, a short click
// true match rate = right words judged 'great'; false accept rate = wrong words, silence or noise judged 'great'.
const fs = require('fs'), path = require('path'), cp = require('child_process'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const { loadApp } = require('./es-audio');

function decode(file) {
  const b = cp.execFileSync('ffmpeg', ['-v', 'error', '-i', path.join(ROOT, 'audio', 'es', file + '.ogg'), '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'], { maxBuffer: 1 << 26 });
  return new Float32Array(b.buffer, b.byteOffset, b.length >> 2).slice();
}
// resample by factor r (r > 1: shorter and higher, like a smaller voice) with linear interpolation
function shift(x, r) {
  const n = Math.floor(x.length / r), y = new Float32Array(n);
  for (let i = 0; i < n; i++) { const p = i * r, a = Math.floor(p), f = p - a; y[i] = (x[a] || 0) * (1 - f) + (x[a + 1] || 0) * f; }
  return y;
}
// deterministic noise (a small LCG) at a level under the signal (snr dB), or on its own (lvl)
function noisy(x, snr) {
  let s = 0; for (const v of x) s += v * v; const rms = Math.sqrt(s / x.length), a = rms * Math.pow(10, -snr / 20) * Math.sqrt(3);
  let z = 12345; const y = new Float32Array(x.length);
  for (let i = 0; i < x.length; i++) { z = (z * 1103515245 + 12345) & 0x7fffffff; y[i] = x[i] + a * (2 * z / 0x7fffffff - 1); }
  return y;
}

// the app's code (the same as the tablet runs), with the recordings' list
function app() {
  const ctx = loadApp(undefined, { performance: { now: () => 0 } });
  return ctx;
}
// cases(ctx, opt): the calibration set; opt.max limits the number of target lines (tools/test.js uses a smaller set)
function cases(ctx, opt = {}) {
  const R = s => vm.runInContext(s, ctx);
  const L = R('ES_AUDIO.lines'), spkNorm = R('spkNorm'), spkcNear = R('spkcNear');
  const keys = Object.keys(L).sort();
  const norm = s => spkNorm(s);
  const step = opt.every || 1;
  const targets = keys.filter((k, i) => i % step === 0 && norm(k).split(' ').length <= (opt.words || 3));
  // groups of lines with the same words (articles and punctuation aside) in both voices
  const g = {};
  for (const k of keys) (g[norm(k)] = g[norm(k)] || []).push(k);
  const out = [];
  for (const k of Object.keys(g).sort()) for (const a of g[k]) for (const b of g[k]) if (a !== b && L[a][1] !== L[b][1]) out.push({ kind: 'voice', tgt: a, say: b, mod: 'as is', want: 1 });
  for (const t of targets) {
    out.push({ kind: 'child', tgt: t, say: t, mod: 'up', want: 1 });
    out.push({ kind: 'child', tgt: t, say: t, mod: 'down', want: 1 });
    const near = spkcNear(t, 6);
    if (near[3]) out.push({ kind: 'similar', tgt: t, say: near[3], mod: 'up', want: 0 });
    const far = keys[(keys.indexOf(t) + Math.floor(keys.length / 2)) % keys.length];
    if (!R('spkMatch')(t, far)) out.push({ kind: 'other', tgt: t, say: far, mod: 'up', want: 0 });
    const far2 = keys[(keys.indexOf(t) + Math.floor(keys.length / 3)) % keys.length]; // a second unrelated word, a third of the list away
    if (!R('spkMatch')(t, far2) && opt.other2 !== false) out.push({ kind: 'other2', tgt: t, say: far2, mod: 'up', want: 0 });
  }
  for (const t of targets.slice(0, 20)) for (const m of ['silence', 'hiss', 'click']) out.push({ kind: 'silence', tgt: t, say: null, mod: m, want: 0 });
  return out;
}
// the samples of a case
function sound(c, L, dec) {
  if (!c.say) {
    const n = 32000, x = new Float32Array(n);
    if (c.mod === 'hiss') return noisy(x.map((_, i) => 0.002 * Math.sin(i)), 0);
    if (c.mod === 'click') { for (let i = 16000; i < 16400; i++) x[i] = 0.5 * Math.sin(i * 0.3); return x; }
    return x;
  }
  const x = dec(L[c.say][0]);
  return c.mod === 'up' ? noisy(shift(x, 1.12), 30) : c.mod === 'down' ? noisy(shift(x, 0.9), 30) : x;
}
// run every case: the features of each file once; returns the per-case results {..., k, d, dk}. opt.cache: a folder for decoded files
function run(ctx, list, opt = {}) {
  const R = s => vm.runInContext(s, ctx);
  const L = R('ES_AUDIO.lines'), feat = R('spkcFeat'), near = R('spkcNear'), dist = R('spkcDist');
  const raw = new Map(), F = new Map(), N = new Map();
  const dec = f => {
    if (raw.has(f)) return raw.get(f);
    const p = opt.cache && path.join(opt.cache, f + '.f32');
    let x;
    if (p && fs.existsSync(p)) { const b = fs.readFileSync(p); x = new Float32Array(b.buffer, b.byteOffset, b.length >> 2).slice(); }
    else { x = decode(f); if (p) fs.writeFileSync(p, Buffer.from(x.buffer)); }
    raw.set(f, x); return x;
  };
  const fe = k => { const f = L[k][0]; if (!F.has(f)) F.set(f, feat(dec(f))); return F.get(f); };
  const nr = t => { if (!N.has(t)) N.set(t, near(t)); return N.get(t); };
  const res = [];
  for (const c of list) {
    const kid = feat(sound(c, L, dec), true), tg = fe(c.tgt), dis = nr(c.tgt).map(fe).filter(x => x.k === 'ok');
    const d = kid.k === 'ok' ? dist(kid, tg) : Infinity, dk = kid.k === 'ok' ? Math.min(Infinity, ...dis.map(x => dist(kid, x))) : Infinity;
    res.push({ ...c, k: kid.k, d, dk });
  }
  return res;
}
// the accuracy of thresholds abs / ratio on run() results
function score(res, abs, ratio) {
  const g = r => r.k === 'ok' && r.d <= abs && r.d <= r.dk * ratio;
  const by = {};
  for (const r of res) { const b = by[r.kind] || (by[r.kind] = { n: 0, great: 0 }); b.n++; if (g(r)) b.great++; }
  const pos = res.filter(r => r.want), neg = res.filter(r => !r.want);
  return { tmr: pos.filter(g).length / pos.length, far: neg.filter(g).length / neg.length, npos: pos.length, nneg: neg.length, by };
}
module.exports = { cases, run, score, app, decode, shift, noisy };

if (require.main === module) {
  const ctx = app(), t0 = Date.now();
  const list = cases(ctx), res = run(ctx, list, { cache: process.env.SPK_CACHE });
  const abs = vm.runInContext('SPKC.ABS', ctx), ratio = vm.runInContext('SPKC.RATIO', ctx);
  const pct = x => (100 * x).toFixed(1) + '%';
  const show = (s, a, r) => console.log(`ABS ${a} RATIO ${r}: true match ${pct(s.tmr)} of ${s.npos}, false accept ${pct(s.far)} of ${s.nneg}; ` +
    Object.entries(s.by).map(([k, b]) => `${k} ${b.great}/${b.n}`).join(', '));
  show(score(res, abs, ratio), abs, ratio);
  if (process.argv.includes('--grid')) {
    const qs = k => { const v = res.filter(r => r.kind === k && isFinite(r.d)).map(r => r.d).sort((a, b) => a - b); return [0.1, 0.5, 0.9].map(q => v[Math.floor(q * (v.length - 1))]?.toFixed(3)); };
    for (const k of ['voice', 'child', 'similar', 'other', 'other2']) console.log(k, 'd quantiles 10/50/90', qs(k).join(' '));
    for (const r of [1, 1.05, 1.1, 1.15, 1.2, 1.25]) for (const a of [1.4, 1.5, 1.6, 1.7, 1.8]) show(score(res, a, r), a, r);
  }
  console.log(list.length + ' cases in ' + ((Date.now() - t0) / 1000).toFixed(1) + ' s');
}
