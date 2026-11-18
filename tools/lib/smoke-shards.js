// SHARDS: splits tools/smoke.js into shards that run in separate browser processes (tools/check.sh runs them side by side).
// smoke.js's main() is a list of SEGMENTS: each is one top-level `if (seg('ID')) {` ... `}` block, set up from its own fresh page(s),
// so any segment can run in any shard. Between the segments only the lines in ALLOWED may stand (the always-open first page, the
// shared helpers, the error and network checks); parse() refuses anything else, so a new step block that is not a segment fails
// tools/test.js ("smoke shards: ...") and `node tools/smoke.js --plan N` instead of running in every shard or getting lost.
// assign() puts every segment in exactly one shard, balanced by WEIGHTS (seconds measured on a 4-CPU box); a segment with no weight
// counts LINE_S seconds per source line until it is measured (`SMOKE_SEG_TIMES=file node tools/smoke.js` writes the times).
const fs = require('fs');
const path = require('path');

const SMOKE = path.join(__dirname, '..', 'smoke.js');
const LINE_S = 0.12;
const SEG_RE = /^    if \(seg\('([A-Za-z0-9-]+)'\)\) \{$/;
const ALLOWED = [
  /^    const app = await openApp\(browser, \{ fixture: 'fresh' \}\);$/, // the first page: every shard opens it (its errors, network)
  /^    ctxAll = app;$/,
  /^    const \{ page, errors, network \} = app;$/,
  /^    for \(const e of errors\) fail\(e\);$/,
  /^    const KSM = require\('\.\/kinds-samples'\);$/,
  /^    const k2Kit = \(pg, at, bad\) => \{$/,
  /^    \};$/,
  /^    for \(const u of network\) fail\('network request: ' \+ u\);$/,
  /^    if \(!errors\.length && !network\.length\) step\('no console errors, no network requests'\);$/,
];

// TIMED segments must not share the CPU with the side-by-side shards, test.js and a11y.js: the steps that MEASURE real time against
// a limit (frame times and drawing at a CPU throttle: P1-05, P3-08, G-02, G-RALLY2, G-HC2, G-HC3, G-04b, S-SPK2, G-BB2; tap-to-answer
// within 100 ms: P4-17; the gap between sounds: ES-AUDIO) and the WebGL 3D looks (GL-01, GL-02), which draw in software and fail
// to draw or move on a busy CPU. They run in M timed shards (`--shard tI/M`) that check.sh runs after the others, with nothing beside
// them but the timed test.js shard, like perf.js. A new step that measures time belongs in TIMED.
// A step that only READS the screen inside one of the app's short windows (a right answer's tick shows for 1.2 s, 150 ms at the bot's
// 8x clock, then the round moves on) does not: it reads at the right moment instead, in the page (arm(), armShow(), a wait that
// returns what it saw: tools/smoke.js, CHK-FAST), so it holds on a busy CPU (KINDS2, P6-01, TEACH-1 were TIMED for that before).
const TIMED = ['P1-05', 'P3-08', 'G-02', 'G-RALLY2', 'G-HC2', 'G-HC3', 'P4-17', 'G-BB2', 'ES-AUDIO', 'G-04b', 'S-SPK2',
  'GL-01', 'GL-02'];

// seconds per segment, measured (tools/smoke.js with SMOKE_SEG_TIMES) on the 4-CPU box with the shards of tools/check.sh running
const WEIGHTS = {
  'core': 80, 'A11': 16, 'P1-05': 2, 'P1-06': 13, 'P5-05': 13, 'P1-07': 15, 'P1-08': 10, 'P5-06': 2, 'P5-02': 25, 'P5-03': 25,
  'P2-19': 14, 'P2-15': 15, 'P2-01': 18, 'P2-05': 30, 'P2-06': 54, 'P2-18': 80, 'P2-02': 44, 'P2-03': 45, 'P4-05': 6,
  'P2-04': 45, 'P4-11': 7, 'P4-03': 2, 'P4-08': 20, 'P4-10': 20, 'P2-07': 157, 'P2-20': 15, 'P2-22': 12, 'P4-18': 21,
  'P2-25': 25, 'P2-24': 44, 'P2-21': 15, 'P2-23': 13, 'P2-08': 34, 'P2-27': 25, 'P2-29': 25, 'P2-09': 125, 'P2-26': 30,
  'P2-28': 27, 'P2-10': 92, 'P3-01': 21, 'P2-11': 114, 'P3-09': 17, 'P3-10': 50, 'P3-08': 37, 'P2-12': 103, 'P2-16': 48,
  'P4-06': 6, 'P3-03': 23, 'P2-13': 137, 'P3-05': 27, 'P2-17': 19, 'P2-36': 25, 'P3-07': 15, 'P2-14': 156, 'P2-37': 36,
  'P3-14': 29, 'P2-30': 4, 'P2-31': 33, 'P2-32': 23, 'P2-33': 27, 'P3-11': 21, 'P3-13': 29, 'P3-16': 27, 'P3-17': 30,
  'P3-12': 29, 'P3-15': 25, 'P2-34': 27, 'P4-07': 18, 'P4-09': 3, 'P4-12': 14, 'P5-09': 39, 'P4-14': 1, 'P2-35': 12, 'P4-16': 62,
  'NAV-01': 36, 'G-02': 111, 'G-RALLY2': 37, 'G-HC2': 46, 'G-HC3': 51, 'P4-15': 1, 'P5-08': 42, 'P4-17': 68, 'P5-07': 9,
  'R-01m': 5, 'R-01r': 2, 'R-01s': 5, 'R-01b': 16, 'G-01': 69, 'G-BB2': 52, 'G-BB3': 27, 'G-ART2': 30, 'G-04a': 51, 'R-01d': 7,
  'P5-10': 64, 'P6-05': 15, 'ES-AUDIO': 3, 'EN-PRAISE': 5, 'P6-02': 6, 'G-04b': 106, 'S-SPK': 59, 'S-SPK2': 47, 'G-FEEL2': 7,
  'P6-01': 2, 'GL-01': 32, 'GL-02': 54, 'CHECK-IN': 27, 'KINDS2-A': 26, 'KINDS2-B': 21, 'KINDS2-C': 46, 'KINDS2-D': 29,
  'TEACH-1': 37, 'TEACH-2': 6, 'STK-2': 6, 'TEACH-2b': 57, 'TEACH-3': 54,
};

// Reads smoke.js: { ids (segments in source order), lines (id -> source lines), problems }
function parse(src = fs.readFileSync(SMOKE, 'utf8')) {
  const L = src.split('\n'), problems = [], ids = [], lines = {};
  const m0 = L.findIndex(l => l.startsWith('async function main('));
  const t0 = L.findIndex((l, i) => i > m0 && l === '  try {');
  const t1 = L.findIndex((l, i) => i > t0 && l === '  } catch (e) {');
  if (m0 < 0 || t0 < 0 || t1 < 0) return { ids, lines, problems: ['smoke.js: main() with its "  try {" and "  } catch (e) {" not found'] };
  let cur = null;
  for (let i = t0 + 1; i < t1; i++) {
    const l = L[i];
    if (cur) {
      if (l === '    }') cur = null;
      else lines[cur]++;
      continue;
    }
    if (!/^    \S/.test(l) || /^    \/\//.test(l)) continue; // blank, a comment, or the inside of an allowed statement
    const m = l.match(SEG_RE);
    if (m) {
      if (ids.includes(m[1])) problems.push('segment ' + m[1] + ' twice (line ' + (i + 1) + ')');
      ids.push(m[1]); cur = m[1]; lines[cur] = 0;
    } else if (!ALLOWED.some(re => re.test(l))) {
      problems.push('line ' + (i + 1) + ' of smoke.js is a step outside a segment (wrap it in `if (seg(\'ID\')) {` ... `}`): ' + l.trim().slice(0, 80));
    }
  }
  if (cur) problems.push('segment ' + cur + ' has no closing "    }"');
  const calls = (src.match(/\bseg\('(?!ID')/g) || []).length;
  if (calls !== ids.length) problems.push(calls + " seg('...') calls in smoke.js but " + ids.length + ' top-level segments: seg() belongs only on a segment\'s first line');
  return { ids, lines, problems };
}

const weight = (id, lines) => (WEIGHTS[id] != null ? WEIGHTS[id] : Math.max(1, Math.round(lines[id] * LINE_S)));

// ids -> n Sets, each id in exactly one, longest first onto the least loaded shard (ties: the lower shard); timed: the TIMED ids
// only, else all the others
function assign(ids, lines, n, timed = false) {
  const shards = Array.from({ length: n }, () => ({ ids: new Set(), s: 0 }));
  const order = ids.filter(id => TIMED.includes(id) === timed).map((id, k) => [id, weight(id, lines), k]).sort((a, b) => b[1] - a[1] || a[2] - b[2]);
  for (const [id, w] of order) {
    let best = shards[0];
    for (const sh of shards) if (sh.s < best.s) best = sh;
    best.ids.add(id); best.s += w;
  }
  return shards;
}

// the guard (tools/test.js, tools/smoke.js --plan): problems of the source, stale weights, and for every n shards and m timed shards
// every segment in exactly one
function check(maxN = 8, maxM = 3) {
  const { ids, lines, problems } = parse();
  const p = problems.slice();
  for (const id of Object.keys(WEIGHTS)) if (!ids.includes(id)) p.push('WEIGHTS has ' + id + ', which is no segment of smoke.js');
  if (ids.length < 100 || ids[0] !== 'core') p.push('expected the core segment first and 100+ segments, found ' + ids.length + ' starting ' + ids[0]);
  for (const id of TIMED) if (!ids.includes(id)) p.push('TIMED has ' + id + ', which is no segment of smoke.js');
  for (let n = 1; n <= maxN; n++) for (let m = 1; m <= maxM; m++) {
    const sh = assign(ids, lines, n).concat(assign(ids, lines, m, true)), seen = new Map(), at = n + ' shards and ' + m + ' timed: ';
    sh.forEach((s, k) => s.ids.forEach(id => seen.set(id, (seen.get(id) || []).concat(k < n ? k + 1 : 't' + (k - n + 1)))));
    for (const id of ids) if ((seen.get(id) || []).length !== 1) p.push(at + 'segment ' + id + ' in shard(s) [' + (seen.get(id) || []).join() + ']');
    for (const id of seen.keys()) if (!ids.includes(id)) p.push(at + 'unknown segment ' + id);
  }
  const unmeasured = ids.filter(id => WEIGHTS[id] == null);
  return { problems: p, ids, lines, unmeasured };
}

// --shard i/N -> { i, n, ids: Set } (null without the flag), --shard tI/M the timed shard I of M; --seg ID,ID (to measure or debug): those segments only, as shard 1/1
function parseArg(argv) {
  const o = argv.find(x => x.startsWith('--seg'));
  if (o) {
    const want = (o.includes('=') ? o.split('=')[1] : argv[argv.indexOf(o) + 1] || '').split(',').filter(Boolean), all = parse().ids;
    const bad = want.filter(id => !all.includes(id));
    if (!want.length || bad.length) throw new Error('--seg wants segment ids of smoke.js' + (bad.length ? ', not ' + bad.join() : ''));
    return { i: 1, n: 1, ids: new Set(want), only: true };
  }
  const a = argv.find(x => x.startsWith('--shard'));
  if (!a) return null;
  const m = (a.includes('=') ? a.split('=')[1] : argv[argv.indexOf(a) + 1] || '').match(/^(t?)(\d+)\/(\d+)$/);
  if (!m || +m[2] < 1 || +m[2] > +m[3]) throw new Error('--shard wants i/N or tI/M with 1 <= i <= N, got ' + a);
  const { ids, lines, problems } = parse();
  if (problems.length) throw new Error('smoke.js cannot be sharded:\n  ' + problems.join('\n  '));
  return { i: m[1] + m[2], n: +m[3], timed: !!m[1], ids: assign(ids, lines, +m[3], !!m[1])[+m[2] - 1].ids };
}

module.exports = { parse, assign, check, parseArg, weight, WEIGHTS, TIMED, LINE_S };
