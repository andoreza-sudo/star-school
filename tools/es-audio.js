// ES-AUDIO: record every Spanish line the app can say, once, with xAI text to speech, and write the manifest.
//   node tools/es-audio.js          collect the lines, record the ones without a file (audio/es/<hash>.ogg), write src/data/d-es-audio.js,
//                                   delete files no line uses any more. Prints the counts and the characters sent (what the API bills).
//   node tools/es-audio.js --dry    collect and print the counts only (no API calls, nothing written)
// The network proxy adds the real API key: the request carries "Authorization: Bearer proxy-injected" and no key is stored anywhere.
// Recording, trimming, encoding and the file names are the shared recorder, tools/voice-audio.js (EN-PRAISE uses it too).
// tools/test.js "recorded Spanish audio ES-AUDIO" uses collect() from this file (the same collector), so a new Spanish line
// in the data or the generators fails the tests until this tool has been run and its files committed.
//
// What is collected (every say(text, btn, 'es') the app can make; src/js/12-speech.js plays the file for that text):
//   - every unit word (src/data/d-es.js): the shown form esFull ('la casa'), the spoken form it[5] when there is one, and the bare word
//     of a spellable word in a spell unit (the level 3 hint says it); the six first colours and the numbers 1-10 (balloon game rules);
//     every colour name of the colouring games (CB_COL, 66-colornum.js)
//   - phrases and grammar (d-es-gram.js): every phrase, question and reply; every article + noun, un/una + noun and plural the
//     articles generator can make; every ser / estar / tener sentence; every "Me gusta / No me gusta / Me gustan ..." sentence and
//     noun phrase; every word-order sentence
//   - Los Cuentos (d-es-story.js): every dialogue line and every Spanish question
//   - then every Spanish skill and level is generated over many seeds (genQ, as the app does) and each question's Spanish speech is
//     taken (say with lang 'es', after with afterLang 'es', a hint that says Spanish, every data-sayes button): this catches what the
//     list above misses. A hint that reads a list ("el perro. la vaca. el gato") is played piece by piece when every piece has a
//     file (esFiles in 12-speech.js), so it is not recorded whole.
// Voices (xAI): Leo for everything, except
//   - a Los Cuentos line said by a woman or a girl (a speaker whose picture in ES_STORY.people is 👧 👩 or 👵): Eve
//   - the words of every second unit in ES_UNITS order (index 1, 3, 5 ...: colors, numbers 11-20, food, family, clothes, feelings,
//     months, numbers to 100, places, action words): Eve, for variety
//   A line is recorded once: a dialogue line takes its first speaker's voice, else a unit word takes its first unit's voice, else Leo.
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..'), SRC = path.join(ROOT, 'src');
const DIR = 'audio/es/', EXT = '.ogg', SPEED = 0.9, LANG = 'es-MX';
const FORMAT = 'xai-tts wav24k speed0.9 trim opus16k-mono ogg v1'; // part of every file's hash: changing the recipe records everything again
const MANIFEST = path.join(SRC, 'data', 'd-es-audio.js');
const FEMALE = ['👧', '👩', '👵'];
const FUZZ = 600; // seeds per Spanish skill and level

const esKey = t => String(t).normalize('NFC').replace(/\s+/g, ' ').trim(); // the same as esKey in src/js/12-speech.js
const pieces = k => k.split(/\.\s+/).map(s => s.replace(/\.$/, '')); // the same split as esFiles in src/js/12-speech.js
const unesc = s => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

// all code and data in the built order (index.html's src/js, each part's src/js, src/data), as tools/test.js evaluates it
function appSource() {
  const py = fs.readFileSync(path.join(ROOT, 'tools', 'build.py'), 'utf8');
  const parts = [...((py.match(/^PARTS = \[\n([\s\S]*?)^\]/m) || [])[1] || '').matchAll(/^ +\('(\w+)', r'([^']+)'\),/gm)].map(m => ({ stem: m[1], re: new RegExp('^(?:' + m[2] + ')$') }));
  const partOf = n => (parts.find(p => p.re.test(n)) || {}).stem;
  const cat = (d, part) => fs.readdirSync(path.join(SRC, d)).filter(n => n.endsWith('.js') && partOf(n) === part).sort().map(n => fs.readFileSync(path.join(SRC, d, n), 'utf8')).join('\n');
  return cat('js') + parts.map(p => cat('js', p.stem)).join('') + cat('data');
}
function loadApp(code, extra) {
  const ctx = vm.createContext({ console, localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    document: { querySelector: () => null, querySelectorAll: () => [], addEventListener() {} }, navigator: {}, addEventListener() {},
    location: { protocol: 'file:' }, speechSynthesis: { getVoices: () => [] }, getComputedStyle: () => ({}), setTimeout() {}, clearTimeout() {}, ...(extra || {}) });
  vm.runInContext(code || appSource(), ctx);
  vm.runInContext("S.name='Ava';S.buddy='Ben';G={built:[]};", ctx);
  return ctx;
}

// collect(ctx?, {fuzz, seed0}) -> {lines: Map key -> {text, voice, from:Set}, fuzzNew: keys only the generator run found}
function collect(ctx, opt = {}) {
  ctx = ctx || loadApp();
  const fuzz = opt.fuzz == null ? FUZZ : opt.fuzz, seed0 = opt.seed0 || 1;
  const lines = new Map(), dlg = new Map(), unitV = new Map(), fuzzNew = new Set();
  let stage = 'list';
  const add = (t, from) => {
    if (t == null || !String(t).trim()) return;
    const k = esKey(t);
    if (!lines.has(k)) { lines.set(k, { text: k, from: new Set() }); if (stage === 'fuzz') fuzzNew.add(k); }
    lines.get(k).from.add(from);
  };
  // a hint that reads a list: its pieces when each is a line already, else the whole text
  const addList = (t, from) => { const k = esKey(t), ps = pieces(k); if (ps.length > 1 && ps.every(p => lines.has(p))) ps.forEach(p => add(p, from)); else add(k, from); };
  const R = s => vm.runInContext(s, ctx);
  const { ES_UNITS, ES_GRAM, ES_STORY, CB_COL, SPN } = R('({ES_UNITS,ES_GRAM,ES_STORY,CB_COL,SPN})');
  const esFull = R('esFull'), esSay = R('esSay'), esSpellable = R('esSpellable'), gPlArt = R('gPlArt'), ES_FORMS = R('ES_FORMS');
  // 1. unit words
  ES_UNITS.forEach((u, ui) => {
    const v = ui % 2 ? 'eve' : 'leo';
    for (const it of u.items) {
      const ks = [esFull(it), esSay(it)];
      if (u.spell && esSpellable(it)) ks.push(it[0]);
      for (const t of ks) { add(t, 'unit ' + u.id); const k = esKey(t); if (!unitV.has(k)) unitV.set(k, v); }
    }
  });
  SPN.color.slice(0, 6).forEach(c => add(c[0], 'balloons')); SPN.num.forEach(c => add(c[0], 'balloons'));
  Object.keys(CB_COL).forEach(k => add(k, 'coloring'));
  // 2. phrases and grammar
  for (const p of ES_GRAM.phrases) add(p[0], 'es_phrase');
  for (const qa of ES_GRAM.qa) { add(qa.q, 'es_phrase'); qa.ok.forEach(x => add(x, 'es_phrase')); }
  for (const n of ES_GRAM.nouns) {
    add(gPlArt(n[3]) + ' ' + n[4], 'es_art');
    if (/[oa]$/.test(n[0])) { add(n[0], 'es_art'); add(n[3] + ' ' + n[0], 'es_art'); add((n[3] == 'el' ? 'un' : 'una') + ' ' + n[0], 'es_art'); }
  }
  for (const lv of [1, 2, 3]) for (const it of ES_GRAM.ser[lv]) add(`${it[0]} ${ES_FORMS[lv][it[1]]} ${it[2]}.`, 'es_ser');
  for (const it of ES_GRAM.likes) {
    if (it[4] != 'pl' && it[4] != 'an') for (const neg of [0, 1]) add((neg ? 'No me gusta ' : 'Me gusta ') + it[0] + ' ' + it[1] + '.', 'es_gusta');
    const pls = it[4] == 'pl' || it[4] == 'an' ? [1] : it[4] == 'sg' ? [0] : [0, 1];
    for (const pl of pls) {
      const np = pl ? gPlArt(it[0]) + ' ' + it[2] : it[0] + ' ' + it[1];
      add(np, 'es_gusta');
      for (const neg of [0, 1]) add(`${neg ? 'No me' : 'Me'} ${pl ? 'gustan' : 'gusta'} ${np}.`, 'es_gusta');
    }
  }
  for (const lv of [1, 2]) for (const it of ES_GRAM.sent[lv]) add(it[0], 'es_sent');
  // 3. Los Cuentos: the lines (each speaker's voice) and the Spanish questions
  for (const D of ES_STORY.dialogues) {
    for (const [who, t] of D.lines) {
      add(t, 'es_story');
      const k = esKey(t);
      if (!dlg.has(k)) dlg.set(k, FEMALE.includes(ES_STORY.people[who]) ? 'eve' : 'leo');
    }
    for (const q of D.qs) add(q.es, 'es_story');
  }
  // 4. every Spanish skill and level over many seeds: what each question would say in Spanish
  stage = 'fuzz';
  const ids = R("Object.keys(SK).filter(id=>SK[id].area=='es')");
  for (const id of ids) {
    const max = R(`SK[${JSON.stringify(id)}].max`);
    for (let lv = 1; lv <= max; lv++) {
      for (let s = 0; s < fuzz; s++) {
        ctx.__a = [id, lv, seed0 + s];
        const q = R('genQ(__a[0],__a[1],__a[2])');
        harvest(q, id + ' ' + lv, add, addList, ctx);
      }
    }
  }
  // Los Cuentos questions in every dialogue, every level (the passage panel's buttons)
  R('ES_STORY.dialogues').forEach((D, di) => D.qs.forEach((_, qi) => { for (const lv of [1, 2, 3]) { ctx.__a = [lv, di, qi]; harvest(R('stQ(__a[0],__a[1],__a[2])'), 'es_story ' + lv, add, addList, ctx); } }));
  for (const [k, o] of lines) o.voice = dlg.get(k) || unitV.get(k) || 'leo';
  return { lines, fuzzNew, dlg, unitV };
}
// what one question says in Spanish (src/js/50-round.js: the auto read and the speaker, the answer read after, data-sayes buttons;
// 39-hints.js: a 'say' hint with lang 'es')
function harvest(q, from, add, addList, ctx) {
  if (!q) return;
  if (q.lang == 'es' && q.say) add(q.say, from);
  if (q.afterLang == 'es') { ctx.__q = q; add(q.after || vm.runInContext('K.spoken?K.spoken(__q):(KINDS[__q.kind]||{}).spoken(__q)', ctx), from); }
  if (q.hint && q.hint.k == 'say' && q.hint.lang == 'es') addList(q.hint.w, from + ' hint');
  for (const h of [q.html, q.ctx && q.ctx.html]) if (typeof h == 'string') for (const m of h.matchAll(/data-sayes="([^"]*)"/g)) add(unesc(m[1]), from);
}

const VA = require('./voice-audio.js'); // the shared recorder (EN-PRAISE uses it too)
const fileOf = (k, voice) => VA.fileOf(FORMAT, voice, k);

function manifestText(lines) {
  const keys = [...lines.keys()].sort();
  const n = { leo: 0, eve: 0 };
  keys.forEach(k => n[lines.get(k).voice]++);
  return '/* ---------- ES-AUDIO: recorded Spanish (BUILT by tools/es-audio.js: never edit by hand; run node tools/es-audio.js) ----------\n'
    + '   Every Spanish line the app can say -> [file, voice]: the file is ' + DIR + '<file>' + EXT + ' (xAI text to speech, ' + LANG + ', speed ' + SPEED + ',\n'
    + '   Opus 16 kbps mono). Keys are esKey(text) (NFC, trimmed, spaces collapsed). say() in src/js/12-speech.js plays the file; a line\n'
    + '   that is not here (or whose file does not play) uses the tablet\'s voice. ' + keys.length + ' lines: Leo ' + n.leo + ', Eve ' + n.eve + '. */\n'
    + 'const ES_AUDIO={dir:' + JSON.stringify(DIR) + ',ext:' + JSON.stringify(EXT) + ',lines:{\n'
    + keys.map(k => JSON.stringify(k) + ':[' + JSON.stringify(fileOf(k, lines.get(k).voice)) + ',' + JSON.stringify(lines.get(k).voice) + ']').join(',\n') + '}};\n';
}

async function main() {
  const dry = process.argv.includes('--dry');
  const t0 = Date.now(), { lines, fuzzNew } = collect();
  const all = [...lines.values()], by = v => all.filter(o => o.voice == v);
  const chars = a => a.reduce((s, o) => s + o.text.length, 0);
  console.log(`lines: ${all.length} (Leo ${by('leo').length}, Eve ${by('eve').length}), ${chars(all)} characters; found only by the generator run: ${fuzzNew.size}` + (fuzzNew.size ? ' ' + JSON.stringify([...fuzzNew].slice(0, 12)) : '') + ` (${Date.now() - t0} ms)`);
  const dir = path.join(ROOT, DIR);
  const { failed } = await VA.record(all.map(o => ({ text: o.text, voice: o.voice, file: fileOf(o.text, o.voice) })), { dir: DIR, ext: EXT, lang: LANG, speed: SPEED, dry });
  if (dry) return;
  // the manifest lists only lines whose file exists (a failed line keeps the tablet's voice until the next run)
  const have = new Map([...lines].filter(([k, o]) => fs.existsSync(path.join(dir, fileOf(k, o.voice) + EXT))));
  fs.writeFileSync(MANIFEST, manifestText(have));
  const keep = new Set([...have].map(([k, o]) => fileOf(k, o.voice) + EXT)), [gone, bytes] = VA.prune(DIR, EXT, keep);
  console.log(`manifest: ${have.size} lines, ${fs.statSync(MANIFEST).size} bytes; audio: ${keep.size} files, ${bytes} bytes; removed ${gone} old files`);
  if (failed.length) process.exitCode = 1;
}

module.exports = { collect, loadApp, appSource, esKey, pieces, fileOf, DIR, EXT, FORMAT, FEMALE };
if (require.main === module) main().catch(e => { console.error(e); process.exit(1); });
