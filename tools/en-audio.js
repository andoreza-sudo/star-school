// EN-PRAISE: record every fixed English encouragement line the app says, in six voices, with xAI text to speech, and write the manifest.
//   node tools/en-audio.js          collect the lines, record the ones without a file (audio/en/<hash>.ogg), check each new file with
//                                   xAI speech to text, write src/data/d-en-audio.js, delete files no line uses any more
//   node tools/en-audio.js --dry    collect and print the counts only (no API calls, nothing written)
// Recording, trimming, encoding and the file names are the shared recorder, tools/voice-audio.js (as tools/es-audio.js).
// tools/test.js "recorded encouragement EN-PRAISE" uses collect() from this file, so a line added here, or a line here that the app
// no longer says, fails the tests until this tool has been run and its files committed.
//
// What is recorded: the praise, try-again and well-done lines that say() (src/js/12-speech.js) speaks: right-answer praise (CHEERS =
// PRAISE + PET_YAY), streaks, PET_OOPS, the round end, game and puzzle end cards, Say it! feedback. Not questions, hints, instructions,
// names or anything generated. A line with a number or a name in it is recorded only as its fixed first sentence ("New record!"): say()
// plays the recorded first sentences, then the rest with the tablet's voice. The pet's own lines (pet care, the shop) stay the tablet's
// voice: they are the pet talking, not a grown-up cheering.
// Each line has a kind: 'cheer' (right answers), 'oops' (try again) and 'done' (a round or game is won) are the kinds of the grown-up's
// own clips (src/js/44-clips.js): when the grown-up has recorded clips of that kind, theirs play instead of these.
const fs = require('fs'), path = require('path'), vm = require('vm');
const VA = require('./voice-audio.js'), E = require('./es-audio.js');
const ROOT = VA.ROOT, SRC = path.join(ROOT, 'src');
const DIR = 'audio/en/', EXT = '.ogg', LANG = 'en', SPEED = 1.0;
const FORMAT = 'xai-tts en wav24k speed1 trim opus16k-mono ogg v1'; // part of every file's hash: changing the recipe records everything again
const MANIFEST = path.join(SRC, 'data', 'd-en-audio.js');
// The six voices (GET /v1/tts/voices; descriptions from the xAI voice list). Chosen for children: warm, friendly and lively, with a wide
// pitch range on short cheers (a rough pitch track of "Great job!", "Woo-hoo! You did it!" and others in 13 voices). Left out: Ara and
// Ursa (warm but flatter on short cheers), Helios ("upbeat" but deep and flat here), Leo ("authoritative"), the sales and narration voices.
const VOICES = [
  ['eve', 'f', 'Energetic and upbeat'],
  ['iris', 'f', 'Friendly, upbeat, and naturally charming'],
  ['luna', 'f', 'Gentle, patient, and deeply nurturing (education)'],
  ['castor', 'm', 'Charismatic, down-to-earth, and easygoing'],
  ['lumen', 'm', 'Warm, articulate, and engaging (education)'],
  ['sirius', 'm', 'Quick-witted, clever, and playful'],
];
// [kind, where, lines]: lines is a list, or a function of the app (R evaluates in it) for a list the app defines. lit: every line
// must be in the source as written (a quoted string), so a line changed in the app is noticed.
const GROUPS = [
  ['cheer', 'right answer (CHEERS in 50-round.js: PRAISE + PET_YAY)', R => R('CHEERS')],
  ['cheer', 'streak (50-round.js: "5 in a row! Wow!")', ['3 in a row!', '5 in a row!', '8 in a row!', '10 in a row!', 'Amazing!', 'Wow!', 'Incredible!']],
  ['cheer', 'trace (TR_SAY.p2, first sentence)', ['Great!']],
  ['oops', 'miss (PET_OOPS in 40-view.js)', R => R('PET_OOPS')],
  ['oops', 'miss', ['Try again!']],
  ['done', 'round end (50-round.js finish)', [...Array(10)].map((_, i) => i ? `You got ${i + 1} stars!` : 'You got 1 star!')],
  ['done', 'round end, a new stop', ['You unlocked the next stop!']],
  ['', 'pet grows (first sentence)', ['Your egg hatched!'], 1],
  ['', 'placement', ["Let's find your level! Some questions may be tricky. Just do your best!", 'All done!', 'Great work!'], 1],
  ['', 'records (first sentence)', ['New record!'], 1],
  ['done', 'game end cards', ['Good job!', 'Perfect build! Three stars!', 'You built it!', 'Three stars! Amazing!', 'You made it!', 'New best lap!', 'Good driving!', 'You finished the race! Well done!'], 1],
  ['oops', 'Hill Climb', ['So close! Try again!', 'Oops! Ease off the gas!', 'Splash! Go faster to jump!'], 1],
  ['', 'Hill Climb tricks', ['Backflip!', 'Front flip!'], 1],
  ['', 'colouring (first sentence)', ['Beautiful!'], 1],
  ['done', 'puzzle end cards', ['Perfect!', 'You solved it!', 'Solved!'], 1],
  ['', 'puzzle badges (first sentence)', ['New badge!', 'New badges!'], 1],
  ['', 'puzzles, band A', ['Yes! That is its shadow.', 'Yes! The same shape, turned.', 'The picture matches!', 'You found every word!', 'You filled the whole shape!', 'You did it! Every row, column and box has every animal.'], 1],
  ['', 'trace', ['Keep going!'], 1],
  ['', 'Say it! feedback', ['I didn’t hear anything. Tap the microphone and try again!', 'Did you say it? Tap the thumbs up, or try again!', 'Did it sound the same? Tap “I said it!” or “Try again”.'], 1],
];
const enKey = E.esKey; // NFC, trimmed, spaces collapsed: the same key as say() uses

/* TEACH-4: the pet's fixed teacher lines for the Pre-K to 2nd grade lessons (docs/TEACH-PLAN-2.md system H, owner addition 3: about 70 lines),
   recorded in ONE warm voice (the pet is one speaker): audio/teach/<hash>.ogg, manifest src/data/d-teach-audio.js (EN_TEACH: key -> file).
     node tools/en-audio.js --teach        record only these (new lines; checks each with speech to text; deletes unused files)
   Plain node tools/en-audio.js records them after the encouragement. What is recorded: the little pet's own lines (LS_TONE.little), the lesson
   end card, the pet's reasons and repair lines of the Pre-K to 2nd grade codes (BUGS), and the fixed instructions of the batch 4 lessons.
   REC-ALL (v194, below) adds every fixed sentence of every lesson at every age: the older pet is no longer the tablet's voice.
   Never a line with a name, a number or a word of the question: those stay the tablet's voice (say() plays a recorded line whole, or its
   recorded sentences in order with the tablet's voice for the rest; 12-speech.js tchSay). A line the encouragement already records (in six
   voices, "Great job!") is left to it. tools/test.js "recorded teacher lines TEACH-4" checks the list against the manifest and the files. */
const TEACH_DIR = 'audio/teach/', TEACH_VOICE = 'luna', TEACH_SPEED = 0.95; // Luna: "gentle, patient, and deeply nurturing (education)"; a little slower for small children
const TEACH_FORMAT = 'xai-tts en wav24k speed0.95 trim opus16k-mono ogg teach v1';
const TEACH_MANIFEST = path.join(SRC, 'data', 'd-teach-audio.js');
// [where, lines (a list, or a function of the app), lit: every line is in src/js as written]
const TEACH_GROUPS = [
  ['the little pet\'s own lines (LS_TONE.little, 52c-scripts.js)', R => R("Object.values(LS_TONE.little).filter(v=>typeof v!='function').flat()")],
  ['the little pet\'s hello (LS_TONE.little.hi, after the name)', ["Let's learn together."], 1],
  // LS-STOP: the little pet's lesson stop lines (LS_TONE2.little: the slide into the lesson, "Find my mistake!", the pay lines) and the
  // start card's question after the name (LS_TONE2.little.open); the older ages' lines are recorded too since REC-ALL (lessonSentences)
  ['the little pet\'s lesson stop lines (LS_TONE2.little, 52c-scripts.js)', R => R("Object.values(LS_TONE2.little).filter(v=>typeof v!='function')")],
  ['the little pet\'s lesson stop card (LS_TONE2.little.open, after the name)', ['Want to learn this with me?'], 1],
  ['the lesson end card (52-lesson.js)', ['You learned it!', 'You already knew it!', 'Great learning today!'], 1],
  ['the pet\'s reasons and repairs, Pre-K to 2nd grade (BUGS)', R => R("[...new Set(LS_IDS.filter(id=>LESSONS[id].band!='35').flatMap(id=>LESSONS[id].bugs))].map(c=>BUGS[c].say)")],
  ['the batch 4 lessons\' fixed instructions (52m-lessons4.js)', ['Which one is different?', 'Which one is a different color?', 'Put the animals together and the food together.',
    'Tap a picture, then tap its group.', 'Put in more counters than the dots.', 'Put the big ones together and the small ones together.', 'Tap a picture, then tap Big or Small.',
    'Tap a picture to hear it. Then tap its letter.', 'Tap a picture to hear it. Then tap where it goes.', 'Put each little letter with its big partner.', 'Tap its little partner.', 'Tap its big partner.',
    'Tap a little letter, then its big partner.', 'Clap each word. One clap or two?', 'Which letter is missing?', 'Put the letters in ABC order. Sing it with me!',
    'Sing the ABC song. Which letter comes first?', 'Which letter goes in the box?', 'Read the word. Then tap its picture.', 'Read it. Then tap the picture that matches.',
    'How many dots? Tap the number.', 'Put in as many counters as you like!', 'What comes next?', 'Put in some blue and some orange. Any way you like!', 'Tap a shape, then tap its group.',
    'Use both colors.', 'Match them up.', 'Tap a picture to hear it. Clap it. Then tap its bin.'], 1],
];
/* REC-ALL (owner decision 2026-11-24: "the tablet's voice is awful so any recordings you can do the better"; the owner picked "All lesson
   lines"): every fixed sentence of every lesson, for every age (Pre-K to 6th grade), in the same voice. The unit is the sentence, as say()
   matches it: LS.talk joins a screen's lines into one text, and tchRuns (12-speech.js) plays each recorded sentence of it (enSplit) in order,
   the others in the tablet's voice. So a line with a {slot} or a number still gets its fixed sentences recorded ("I pick {ans}. Am I right?"
   records "Am I right?"). Collected from the app: LS_TONE and LS_TONE2 at all three ages (functions called with a stand-in name and a
   number, and the sentences with them dropped), LS6_SAY, the lesson end card, and each lesson's words as 52-lesson.js says them (L.w.beats:
   explore, name, together, show; remember when the lesson has a warm-up; check only its {ans} line, the pet's claim; never "why", which no
   screen says) and its job (LS.job: the start card's line).
   Left out to stay inside the audio budget the owner approved (8.5 MB; everything above came to 8.9 MB): the warm-up lines (beats.remember,
   said only when nothing older is due) at every age, and the Explore lines of the lessons of grade 3 and up (older children read the
   caption). They stay the tablet's voice, as does a sentence the speech to text check fails. Recording them too needs about 0.55 MB more:
   put them back in LS_SAID / the explore test and run --teach again. Spanish pieces (lsRuns: «...» and el / la in a Spanish lesson)
   stay with ES-AUDIO. A sentence is recorded only if it starts with a capital and ends with . ! or ? (never a fragment cut by a Spanish
   word), and has no digit, no {slot} and no name. The pet's reasons (L.w.reasons) and the ideas the grown-ups read are not in this list.
   A sentence the little pet's lessons or lines use is recorded at speed 0.95 (TEACH_FORMAT, as TEACH-4); one only the older pet uses
   (3rd to 6th grade: LS_TONE kid and teen, lessons of grade 3 and up) at speed 1.0 (TEACH_FORMAT_BIG), a little brisker for older
   children. Same voice, same Opus 16 kbps; the file name is the hash of the recipe, so the TEACH-4 files are kept. */
const TEACH_SPEED_BIG = 1.0, TEACH_FORMAT_BIG = 'xai-tts en wav24k speed1 trim opus16k-mono ogg teach v1';
const NM = 'Zqxvo'; // a stand-in child's name: a sentence with it is never recorded
// the lesson sentences: [[text, age ('little' | 'big'), where]] (age: the youngest pet that says it)
function lessonSentences(R) {
  const raw = R(`(()=>{const o=[],add=(t,es,big,w)=>{if(t!=null&&String(t).trim())o.push([String(t),es?1:0,big?1:0,w])};
    for(const a of ['little','kid','teen'])for(const T of [LS_TONE[a],LS_TONE2[a]])for(const [k,v] of Object.entries(T))
      (typeof v=='function'?[v('${NM}'),v(3)]:[].concat(v)).forEach(x=>add(x,0,a!='little','LS_TONE '+a+'.'+k));
    const LS_SAID={explore:1,name:1,together:1,check:1,show:1}; // remember: left out for the budget (below)
    if(typeof LS6_SAY!='undefined')for(const a in LS6_SAY)add(LS6_SAY[a],0,a!='little','LS6_SAY.'+a);
    for(const t of ['You learned it!','You already knew it!','Great learning today!'])add(t,0,0,'the lesson end card');
    for(const id of LS_IDS){const L=LESSONS[id];if(!L||!L.w||!L.w.beats)continue;const es=L.p=='es',big=L.g!=null&&L.g>2;
      add(LS.job(L),es,big,'job '+id);
      for(const [b,ls] of Object.entries(L.w.beats))if(LS_SAID[b]&&!(b=='explore'&&big))for(const t of [].concat(ls||[]))if(b!='check'||/\{ans\}/.test(t))add(t,es,big,id+'.'+b)}
    return o})()`);
  const enSplit = R('enSplit'), lsRuns = R('lsRuns'), out = [];
  for (const [t, es, big, w] of raw) for (const [piece, isEs] of lsRuns(t, !!es)) {
    if (isEs) continue;
    for (const s of enSplit(enKey(piece)).map(enKey))
      if (!/[{}\d]/.test(s) && !s.includes(NM) && /^["“‘]?[A-Z]/.test(s) && /[.!?]["”’]?$/.test(s)) out.push([s, big ? 'big' : 'little', w]);
  }
  return out;
}
// collectTeach(ctx?) -> Map key -> {text, from: [where], lit, rec ('little' | 'big': the recipe)}; lines the encouragement records are left out
function collectTeach(ctx) {
  ctx = ctx || E.loadApp();
  const R = s => vm.runInContext(s, ctx), en = R('typeof EN_AUDIO=="undefined"?{}:EN_AUDIO.lines'), lines = new Map();
  const add = (t, from, lit, rec) => {
    const k = enKey(t);
    if (!k || en[k] || /\d/.test(k)) return;
    if (!lines.has(k)) lines.set(k, { text: k, from: [], lit: !!lit, rec });
    const o = lines.get(k);
    if (rec == 'little') o.rec = 'little'; // the little pet's speed wins for a sentence both ages say
    o.from.push(from);
  };
  for (const [from, ls, lit] of TEACH_GROUPS) for (const t of (typeof ls == 'function' ? ls(R) : ls)) add(t, from, lit, 'little');
  // REC-ALL: little first, so a sentence both ages say is recorded at the little pet's speed
  const ss = lessonSentences(R);
  for (const [s, rec, w] of ss.filter(x => x[1] == 'little').concat(ss.filter(x => x[1] == 'big'))) add(s, 'lesson ' + w, 0, rec);
  return lines;
}
const teachFileOf = (k, rec) => VA.fileOf(rec == 'big' ? TEACH_FORMAT_BIG : TEACH_FORMAT, TEACH_VOICE, k);
function teachManifest(lines) {
  const keys = [...lines.keys()].sort();
  return '/* ---------- TEACH-4: the pet\'s recorded teacher lines (BUILT by tools/en-audio.js: never edit by hand; run node tools/en-audio.js --teach) ----------\n'
    + '   The fixed lines and sentences of every lesson, Pre-K to 6th grade (REC-ALL) -> their file, ' + TEACH_DIR + '<file>.ogg (xAI text to speech,\n'
    + '   English, the voice ' + TEACH_VOICE + ', speed ' + TEACH_SPEED + ' (the little pet) or ' + TEACH_SPEED_BIG + ' (only the older pet), Opus 16 kbps mono). One voice: the pet is\n'
    + '   one speaker. Keys are esKey(text). ' + keys.length + ' lines. */\n'
    + 'const EN_TEACH={dir:' + JSON.stringify(TEACH_DIR) + ',ext:' + JSON.stringify(EXT) + ',voice:' + JSON.stringify(TEACH_VOICE) + ',lines:{\n'
    + keys.map(k => JSON.stringify(k) + ':' + JSON.stringify(teachFileOf(k, lines.get(k).rec))).join(',\n') + '}};\n';
}
// the size of a new recording, roughly (fitted on the TEACH-4 files: about 350 bytes a file and 137 a character)
const estBytes = os => os.reduce((s, o) => s + 354 + 137 * o.text.length, 0);
async function teachMain(dry) {
  const lines = collectTeach(), all = [...lines.values()], dir = path.join(ROOT, TEACH_DIR), fileOf = o => teachFileOf(o.text, o.rec);
  const big = all.filter(o => o.rec == 'big'), todo = all.filter(o => !fs.existsSync(path.join(dir, fileOf(o) + EXT)));
  console.log(`teacher lines: ${all.length} in the voice ${TEACH_VOICE} (${all.length - big.length} at speed ${TEACH_SPEED}, ${big.length} at ${TEACH_SPEED_BIG}), ${all.reduce((s, o) => s + o.text.length, 0)} characters`);
  console.log(`new: ${todo.length} files, ${todo.reduce((s, o) => s + o.text.length, 0)} characters, about ${estBytes(todo)} bytes`);
  const failed = [];
  for (const [rec, speed] of [['little', TEACH_SPEED], ['big', TEACH_SPEED_BIG]]) {
    const jobs = all.filter(o => o.rec == rec).map(o => ({ text: o.text, voice: TEACH_VOICE, file: fileOf(o) }));
    failed.push(...(await VA.record(jobs, { dir: TEACH_DIR, ext: EXT, lang: LANG, speed, dry, check })).failed);
  }
  if (dry) return failed;
  const have = new Map([...lines].filter(([, o]) => fs.existsSync(path.join(dir, fileOf(o) + EXT))));
  fs.writeFileSync(TEACH_MANIFEST, teachManifest(have));
  const keep = new Set([...have.values()].map(o => fileOf(o) + EXT)), [gone, bytes] = VA.prune(TEACH_DIR, EXT, keep);
  console.log(`teacher manifest: ${have.size} lines, ${fs.statSync(TEACH_MANIFEST).size} bytes; audio: ${keep.size} files, ${bytes} bytes; removed ${gone} old files`);
  return failed;
}

// collect(ctx?) -> Map key -> {text, kind, from:[where], lit}
function collect(ctx) {
  ctx = ctx || E.loadApp();
  const R = s => vm.runInContext(s, ctx), lines = new Map();
  for (const [kind, from, ls, lit] of GROUPS) {
    for (const t of (typeof ls == 'function' ? ls(R) : ls)) {
      const k = enKey(t);
      if (!lines.has(k)) lines.set(k, { text: k, kind, from: [], lit: !!lit });
      lines.get(k).from.push(from);
    }
  }
  return lines;
}
const fileOf = (k, voice) => VA.fileOf(FORMAT, voice, k);

function manifestText(lines) {
  const keys = [...lines.keys()].sort();
  return '/* ---------- EN-PRAISE: recorded English encouragement (BUILT by tools/en-audio.js: never edit by hand; run node tools/en-audio.js) ----------\n'
    + '   Every fixed praise / try-again / well-done line say() speaks -> [kind, [file per voice]]: the file is ' + DIR + '<file>' + EXT + ' (xAI text to\n'
    + '   speech, English, speed ' + SPEED + ', Opus 16 kbps mono). voices: [id, f|m] in the order of the files. kind: the grown-up clip kind that\n'
    + '   replaces the line (cheer, oops, done) or "". Keys are esKey(text). ' + keys.length + ' lines x ' + VOICES.length + ' voices. */\n'
    + 'const EN_AUDIO={dir:' + JSON.stringify(DIR) + ',ext:' + JSON.stringify(EXT) + ',voices:' + JSON.stringify(VOICES.map(v => [v[0], v[1]])) + ',lines:{\n'
    + keys.map(k => JSON.stringify(k) + ':[' + JSON.stringify(lines.get(k).kind) + ',' + JSON.stringify(VOICES.map(v => fileOf(k, v[0]))) + ']').join(',\n') + '}};\n';
}

// a new file must say its line: xAI speech to text, compared letters only (so "Woohoo" is "Woo-hoo", digits are words), without
// the fillers it leaves out ("Hmm"), and a near miss allowed (2 letters, or 1 in 10: it hears "I said it" as "I set it")
const NUM = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const norm = s => String(s).toLowerCase().replace(/\b(\d+)\b/g, (m, d) => NUM[+d] || d).replace(/\b(hmm+|um+|uh+)\b/g, '').replace(/[^a-z]/g, '');
function dist(a, b) {
  let d = [...Array(b.length + 1).keys()];
  for (let i = 1; i <= a.length; i++) { const n = [i]; for (let j = 1; j <= b.length; j++) n[j] = Math.min(d[j] + 1, n[j - 1] + 1, d[j - 1] + (a[i - 1] != b[j - 1])); d = n; }
  return d[b.length];
}
function check(j, file) {
  const heard = VA.stt(file, LANG);
  if (heard == null) return null; // speech to text not reachable: keep the file (the test checks size and format)
  const a = norm(heard), b = norm(j.text);
  return dist(a, b) <= Math.max(2, Math.floor(b.length / 10)) ? null : 'heard "' + heard + '"';
}

async function main() {
  const dry = process.argv.includes('--dry');
  if (process.argv.includes('--teach')) { if ((await teachMain(dry)).length) process.exitCode = 1; return; } // TEACH-4: the teacher lines only
  const lines = collect(), all = [...lines.values()];
  console.log(`lines: ${all.length} x ${VOICES.length} voices = ${all.length * VOICES.length} files, ${all.reduce((s, o) => s + o.text.length, 0) * VOICES.length} characters`);
  const jobs = [];
  for (const o of all) for (const [v] of VOICES) jobs.push({ text: o.text, voice: v, file: fileOf(o.text, v) });
  const { failed } = await VA.record(jobs, { dir: DIR, ext: EXT, lang: LANG, speed: SPEED, dry, check });
  if (dry) return;
  // the manifest lists only lines with a file in every voice (a failed line keeps the tablet's voice until the next run)
  const dir = path.join(ROOT, DIR), have = new Map([...lines].filter(([k]) => VOICES.every(([v]) => fs.existsSync(path.join(dir, fileOf(k, v) + EXT)))));
  fs.writeFileSync(MANIFEST, manifestText(have));
  const keep = new Set([...have.keys()].flatMap(k => VOICES.map(([v]) => fileOf(k, v) + EXT))), [gone, bytes] = VA.prune(DIR, EXT, keep);
  console.log(`manifest: ${have.size} lines, ${fs.statSync(MANIFEST).size} bytes; audio: ${keep.size} files, ${bytes} bytes; removed ${gone} old files`);
  if (failed.length) process.exitCode = 1;
  if ((await teachMain(false)).length) process.exitCode = 1; // TEACH-4: then the teacher lines
}

module.exports = { collect, fileOf, enKey, DIR, EXT, FORMAT, VOICES, GROUPS, collectTeach, teachFileOf, TEACH_DIR, TEACH_VOICE, TEACH_FORMAT, TEACH_FORMAT_BIG, TEACH_GROUPS };
if (require.main === module) main().catch(e => { console.error(e); process.exit(1); });
