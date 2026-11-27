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
   recorded in ONE warm voice (the pet is one speaker): audio/teach/<hash>.ogg, manifest src/data/d-teach-audio.js (EN_TEACH: key -> file;
   REC-ALL: tools/build.py puts it in teach12.<VER>.js, loaded with every lesson, not the data file loaded at start).
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
// sentences the speech to text check rejected in every take (6 recordings each, 2026-11-24): the voice says "lengths" as "links" and
// "Rate story" as "Great story", so they stay the tablet's voice
// REC-12 (2026-11-26): "Mmm!" (the pet eating, AUDIO12.md Tier 1 line 48) was heard as nothing in all 6 takes, so it stays the tablet's voice
const NO_REC = new Set(['Add their lengths.', 'Add the lengths.', 'Rate story: build the table.', 'Mmm!']);
/* REC-12 (owner approval 2026-11-26, docs/drafts/AUDIO12.md section 3): the lines a child who cannot read yet hears most, in the pet's
   teacher voice. Exactly the 89 lines of "Tier 1" and the 2 lines of "New wording" (said only to a non-reader, 12-speech.js nrSay), no
   more: Tier 2 waits for budget. All are the little pet's (speed 0.95): they are said to Pre-K to 1st grade.
   NR_LIT: in src/js word for word. NR_GEN: built by the Pre-K generators (31-gen-math-early.js) from PK.OBJ ("How many ducks?"),
   PK_PLATES ("Which pond has more ducks?") and the four first shapes ("Tap the square."), so they are not in the code as written.
   NR_NEW: the two new-wording lines, on the map (46-home.js pathMap) and the Brain Teasers hub for band A (74-teasers.js BT.hub).
   NR_LIT and NR_NEW are in the code outside the lessons word for word, so teachStart puts them in EN_TEACH0 (they play from the start).
   NR_GEN are not, so teachStart adds them by name (owner decision 2026-11-26: the AUDIO-12 generated prompts play from start-up; the
   TEACH-4 limit on src/data/d-teach-start.js was raised from 6,000 to 7,000 bytes for them). */
const NR_LIT = ['Watch, then trace it with your finger.', 'Which one does not belong?', 'Match each big letter to its little letter.', 'Which word is this?',
  'Sort them!', 'Say each word.', 'Put the pin on the missing number.', 'Count on.', 'Count back.', 'Sort the numbers: even or odd?', 'How many counters?',
  'How many more to make ten?', 'Ten counters are in the frame.', 'Put the big ones in the big box and the small ones in the small box.',
  'Put them in the rhyme box.', 'The others go in no rhyme.', 'Do they have the same number?', 'How many are still on the table?',
  // B: the pet talking
  'Crack crack!', 'Earn stars to hatch me!', 'I am almost ready to hatch!', "Let's go on an adventure!", 'I love stars!', "You're my best friend!",
  'Pick a game!', 'Yum yum!', 'Delicious!', 'Thank you!', 'Mmm!', 'Splish splash!', 'So clean!', 'Bubbles!', 'Wheee!', 'Again! Again!', 'That was fun!',
  'I love it!', 'So cool!', 'Looking good!',
  // C: the picture bar and "Go Home?"
  'Home', 'Learn', 'Games', 'Puzzles', 'My Pet', 'Go Home?',
  // D: the lines AUDIO-12 says to a non-reader
  'Tap the treasure chest!', 'Finish the stop before this one!', 'Tap an item to try it on!', 'Finish a round or a picture to win a sticker!',
  'Finish a learning round to earn game time!', 'Game time is almost up!', 'Finish a round to light your flame!',
  // E: Brain Teasers, band A
  'Each row, each column and each box needs every animal once.', 'Tap a square, then tap an animal.', 'Drag the bear to the flag.',
  'Drag each piece into its outline.', 'Tap a piece, then tap it again to turn it.', 'Drag the pieces into the shape.', 'Each one has its own place.',
  'Tap the arrows to help the robot get to the flag.', 'Then press Go.', 'Find two pictures that are the same.', 'Watch the cat.',
  'Then tap the pads in the same order.', 'Your turn!', 'Which shadow matches the shape?',
  // F: the Spanish cards, the free-sample locks
  'Tap each card to hear it in English and Spanish!', 'This world opens when a grown-up unlocks Whistlestop.', 'This stop opens when a grown-up unlocks Whistlestop.',
  'These puzzles open when a grown-up unlocks Whistlestop.', 'The Puzzle of the Day is open every day.'];
const NR_GEN = ['How many cars?', 'How many ducks?', 'How many balloons?', 'How many stars?', 'How many balls?', 'How many frogs?', 'How many cookies?',
  'How many apples?', 'How many fish?', 'How many flowers?', 'Which pond has more ducks?', 'Which plate has more cookies?', 'Which bowl has more apples?',
  'Which box has more cars?', 'Which basket has more balls?', 'Tap the square.', 'Tap the rectangle.', 'Tap the circle.', 'Tap the triangle.'];
const NR_NEW = ['Tap the glowing stop to play!', 'Tap a puzzle to play!'];
const NR_FROM = 'REC-12 non-reader lines';
TEACH_GROUPS.push([NR_FROM + ' (AUDIO12.md Tier 1, in src/js)', NR_LIT.filter(t => !NO_REC.has(t)), 1], [NR_FROM + ' (AUDIO12.md Tier 1, generated)', NR_GEN, 0],
  [NR_FROM + ' (AUDIO12.md new wording)', NR_NEW, 1]);
/* REC-ALL (owner decision 2026-11-24: "the tablet's voice is awful so any recordings you can do the better"; the owner picked "All lesson
   lines"): every fixed sentence of every lesson, for every age (Pre-K to 6th grade), in the same voice. The unit is the sentence, as say()
   matches it: LS.talk joins a screen's lines into one text, and tchRuns (12-speech.js) plays each recorded sentence of it (enSplit) in order,
   the others in the tablet's voice. So a line with a {slot} or a number still gets its fixed sentences recorded ("I pick {ans}. Am I right?"
   records "Am I right?"). Collected from the app: LS_TONE and LS_TONE2 at all three ages (functions called with a stand-in name and a
   number, and the sentences with them dropped), LS6_SAY, the lesson end card, and each lesson's words as 52-lesson.js says them (L.w.beats:
   explore, name, together, show; remember when the lesson has a warm-up; check only its {ans} line, the pet's claim; never "why", which no
   screen says) and its job (LS.job: the start card's line).
   REC-2 (owner decision 2026-11-24, "yes record the last two groups too"; audio budget 9.0 MB): the two groups REC-ALL left out to fit
   8.5 MB are recorded too: the warm-up lines (beats.remember, said only when nothing older is due) at every age, and the Explore lines of
   the lessons of grade 3 and up. A sentence the speech to text check fails stays the tablet's voice. Spanish pieces (lsRuns: «...» and el / la in a Spanish lesson)
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
    const LS_SAID={explore:1,name:1,together:1,check:1,show:1,remember:1}; // REC-2: remember too
    if(typeof LS6_SAY!='undefined')for(const a in LS6_SAY)add(LS6_SAY[a],0,a!='little','LS6_SAY.'+a);
    for(const t of ['You learned it!','You already knew it!','Great learning today!'])add(t,0,0,'the lesson end card');
    for(const id of LS_IDS){const L=LESSONS[id];if(!L||!L.w||!L.w.beats)continue;const es=L.p=='es',big=L.g!=null&&L.g>2;
      add(LS.job(L),es,big,'job '+id);
      for(const [b,ls] of Object.entries(L.w.beats))if(LS_SAID[b])for(const t of [].concat(ls||[]))if(b!='check'||/\{ans\}/.test(t))add(t,es,big,id+'.'+b)}
    return o})()`);
  const enSplit = R('enSplit'), lsRuns = R('lsRuns'), out = [];
  for (const [t, es, big, w] of raw) for (const [piece, isEs] of lsRuns(t, !!es)) {
    if (isEs) continue;
    for (const s of enSplit(enKey(piece)).map(enKey))
      if (!/[{}\d]/.test(s) && !s.includes(NM) && !NO_REC.has(s) && /^["“‘]?[A-Z]/.test(s) && /[.!?]["”’]?$/.test(s)) out.push([s, big ? 'big' : 'little', w]);
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
/* fix2 v194 (Fable's confirming review): EN_TEACH is built into teach12, which loads with a lesson, so a teacher line said OUTSIDE a lesson
   (a Practice prompt, "What comes next?", "How many in all?"; a hint, "Say it slowly.") lost its recording until a map loaded the lesson
   parts, and for good with lessons off (TEACH.off). EN_TEACH0, src/data/d-teach-start.js (in the data file loaded at start, about 3 KB),
   lists the manifest's lines that appear word for word in the code or data outside the lessons (every src/js and src/data file but
   52*.js and the teacher manifests), with the same files. tchM() in 12-speech.js uses EN_TEACH once teach12 is in, EN_TEACH0 until then.
   Written with the full manifest (--teach), or alone from it: node tools/en-audio.js --teach-start (no recording). tools/test.js
   "recorded teacher lines TEACH-4" checks that it is exactly teachStart(EN_TEACH.lines). */
const TEACH_START = path.join(SRC, 'data', 'd-teach-start.js');
function teachStart(M) {
  const txt = ['js', 'data'].flatMap(d => fs.readdirSync(path.join(SRC, d)).filter(f => f.endsWith('.js') && !/^(52|d-teach-)/.test(f)).sort()
    .map(f => fs.readFileSync(path.join(SRC, d, f), 'utf8'))).join('\n');
  // REC-12, owner decision 2026-11-26: the AUDIO-12 generated prompts play from start-up (they are not in the code word for word)
  return Object.fromEntries(Object.keys(M).filter(k => NR_GEN.includes(k) || txt.includes(k) || txt.includes(k.replace(/'/g, "\\'"))).sort().map(k => [k, M[k]]));
}
function teachStartText(M) {
  const L = teachStart(M), keys = Object.keys(L);
  return '/* ---------- fix2 v194: the recorded teacher lines said outside a lesson (BUILT by tools/en-audio.js: never edit by hand; run node tools/en-audio.js --teach-start) ----------\n'
    + '   The lines of src/data/d-teach-audio.js (EN_TEACH, in the teach12 part) that the code or data outside the lessons says word for word\n'
    + '   (Practice prompts, hints), so they play the pet\'s recording before a lesson part loads and with lessons off. ' + keys.length + ' lines. */\n'
    + 'const EN_TEACH0={dir:' + JSON.stringify(TEACH_DIR) + ',ext:' + JSON.stringify(EXT) + ',voice:' + JSON.stringify(TEACH_VOICE) + ',lines:{\n'
    + keys.map(k => JSON.stringify(k) + ':' + JSON.stringify(L[k])).join(',\n') + '}};\n';
}
const writeTeachStart = () => {
  const M = Function(fs.readFileSync(TEACH_MANIFEST, 'utf8') + ';return EN_TEACH')().lines;
  fs.writeFileSync(TEACH_START, teachStartText(M));
  console.log(`teacher lines at start (EN_TEACH0): ${Object.keys(teachStart(M)).length} lines, ${fs.statSync(TEACH_START).size} bytes`);
};
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
  writeTeachStart(); // fix2 v194: the lines said outside a lesson, in the data file
  const keep = new Set([...have.values()].map(o => fileOf(o) + EXT)), [gone, bytes] = VA.prune(TEACH_DIR, EXT, keep);
  console.log(`teacher manifest: ${have.size} lines, ${fs.statSync(TEACH_MANIFEST).size} bytes; audio: ${keep.size} files, ${bytes} bytes; removed ${gone} old files`);
  return failed;
}

/* REC-198 (owner decision 2026-11-27: the audio budget 9.5 -> 12 MB "for the read-along stories and the new Spanish words"; every story,
   question and screen sentence of docs/drafts/STORIES7-READ.md approved): the STORIES-7 recordings, in the pet's teacher voice (luna, the
   little pet's speed 0.95: the stories are for K to 2nd grade), in their own folder audio/story/<hash>.ogg and their own manifest
   src/data/d-story-audio.js (built into the teachrd part with the stories; never loaded at start):
     ST7A[id] = {f: '<file>.ogg', t: [[start, end], ...]}   each story read whole (its title, then its sentences), one [start, end] in ms per
                                                           word of st7Words (52x-story7.js), so the words light up on the recording's clock
     ST7S.lines[text] = file                                each question (read aloud, Hear it) and each sentence the reader says aloud
                                                           (ST7_SAID); st7Say in 52x-story7.js plays it, else say() as before
     ST7S.w[word] = file                                    every different word of the stories, lower case, for a tap on a word
   Word times: the speech to text check of each new story returns word timestamps (xAI /v1/stt "words"); they are aligned to the story's
   words (storyTimes: the same word, a near miss, two words heard as one, or one heard as two; a word the alignment misses shares the gap
   around it by its letters). Where speech to text cannot be reached, the times are estimated from the file's length, split by syllables
   with pauses after each sentence (estTimes). A story that the check hears wrong, or whose words do not line up, is recorded again.
     node tools/en-audio.js --story            the stories and the lines (new ones only), the manifest; plain node tools/en-audio.js does them too
     node tools/en-audio.js --story --words    and the word taps, only while all the audio stays STORY_MARGIN under AUDIO_FAIL (else the word
                                               files are deleted again and the taps stay the tablet's voice); once the manifest lists words, a
                                               later run keeps them
   tools/test.js "REC-198" checks every story, line and word against the manifest and the files, and the times. */
const STORY_DIR = 'audio/story/', STORY_VOICE = TEACH_VOICE, STORY_SPEED = TEACH_SPEED;
const STORY_FORMAT = 'xai-tts en wav24k speed0.95 trim opus16k-mono ogg story v1';
const STORY_MANIFEST = path.join(SRC, 'data', 'd-story-audio.js');
const STORY_MARGIN = 300000; // owner instruction 2026-11-27: the word taps only with at least 300 KB of the budget left
const ST7_SAID = ['shelfTip', 'tipStart', 'tipAfter', 'tipYou', 'right', 'wrong']; // the ST7W sentences the reader says aloud (the others are labels)
const storyFileOf = k => VA.fileOf(STORY_FORMAT, STORY_VOICE, k);
// a word said alone that speech to text writes as a word that sounds the same (2026-11-27, every take: "see" and "sea" as "C", "pecks" as "Pex"):
// those spellings count as the word
const WORD_HEARD = { see: ['c', 'sea'], sea: ['c', 'see'], pecks: ['pex'], packs: ['pax'] };
const wCheck = (j, file) => { const bad = check(j, file); return bad && (WORD_HEARD[wordKey(j.text)] || []).includes(norm(bad.replace(/^heard /, ''))) ? null : bad; };
const wordKey = k => String(k).toLowerCase();
// collectStory(ctx?) -> {stories: [{id, text, words: st7Words}], lines: Map key -> {text, from}, words: Map key -> {text, from}}
function collectStory(ctx) {
  ctx = ctx || E.loadApp();
  const R = s => vm.runInContext(s, ctx), L = R('ST7.list'), W = R('ST7W'), tch = R('typeof EN_TEACH=="undefined"?{}:EN_TEACH.lines');
  const stories = L.map(st => {
    const t = /[.!?]$/.test(st.t) ? st.t : st.t + '.';
    return { id: st.id, text: enKey(t + ' ' + st.s.join(' ')), words: R(`st7Words(st7Get(${JSON.stringify(st.id)}))`) };
  });
  const lines = new Map(), words = new Map();
  const add = (t, from) => { const k = enKey(t); if (!k || tch[k]) return; if (!lines.has(k)) lines.set(k, { text: k, from: [] }); lines.get(k).from.push(from); };
  for (const k of ST7_SAID) add(W[k], 'ST7W.' + k);
  for (const st of L) st.q.forEach((q, i) => add(q[0], st.id + ' q' + (i + 1)));
  for (const s of stories) for (const w of s.words) {
    const k = wordKey(w.k);
    if (!k) continue;
    if (!words.has(k)) words.set(k, { text: w.k, from: [] });
    const o = words.get(k);
    if (o.text !== k && w.k === k) o.text = k; // sent as the word is written in a sentence; a name keeps its capital
    o.from.push(s.id);
  }
  return { stories, lines, words };
}
// word times from speech to text: align the story's words (st7Words, as said: w.k) to the words heard
const wn = s => norm(s);
const syl = w => Math.max(1, (String(w).toLowerCase().replace(/[^a-z]/g, '').replace(/e$/, '').match(/[aeiouy]+/g) || []).length);
function storyTimes(words, heard, dur) {
  const S = words.map(w => wn(w.k)), H = heard.map(h => ({ n: wn(h.text), s: Math.round(h.start * 1000), e: Math.round(h.end * 1000) })).filter(h => h.n);
  const n = S.length, m = H.length, INF = 1e9;
  const near = (a, b) => a === b ? 0 : (a && b && dist(a, b) <= Math.max(1, Math.floor(Math.max(a.length, b.length) / 4))) ? 0.4 : INF;
  const C = [...Array(n + 1)].map(() => new Array(m + 1).fill(INF)), B = [...Array(n + 1)].map(() => new Array(m + 1).fill(null));
  C[0][0] = 0;
  for (let i = 0; i <= n; i++) for (let j = 0; j <= m; j++) {
    const c = C[i][j];
    if (c >= INF) continue;
    const go = (di, dj, cost, kind) => { if (i + di <= n && j + dj <= m && c + cost < C[i + di][j + dj]) { C[i + di][j + dj] = c + cost; B[i + di][j + dj] = [di, dj, kind]; } };
    if (i < n && j < m) { const x = near(S[i], H[j].n); go(1, 1, x < INF ? x : 1.6, x < INF ? 'm' : 'x'); }
    if (i + 1 < n && j < m && S[i] + S[i + 1] === H[j].n) go(2, 1, 0.3, '21');
    if (i < n && j + 1 < m && S[i] === H[j].n + H[j + 1].n) go(1, 2, 0.3, '12');
    go(1, 0, 1, 's'); go(0, 1, 1, 'h');
  }
  const T = new Array(n).fill(null);
  let matched = 0;
  for (let i = n, j = m; i > 0 || j > 0;) {
    const [di, dj, kind] = B[i][j];
    i -= di; j -= dj;
    if (kind == 'm') { T[i] = [H[j].s, H[j].e]; matched++; }
    else if (kind == '21') { const a = H[j], k0 = S[i].length / (S[i].length + S[i + 1].length), mid = Math.round(a.s + (a.e - a.s) * k0); T[i] = [a.s, mid]; T[i + 1] = [mid, a.e]; matched += 2; }
    else if (kind == '12') { T[i] = [H[j].s, H[j + 1].e]; matched++; }
  }
  // a word not lined up shares the gap between its neighbours' times by its letters
  for (let i = 0; i < n;) {
    if (T[i]) { i++; continue; }
    let k = i; while (k < n && !T[k]) k++;
    const a = i ? T[i - 1][1] : 0, b = k < n ? T[k][0] : dur, tot = words.slice(i, k).reduce((s, w) => s + w.k.length + 1, 0);
    let t = a;
    for (let x = i; x < k; x++) { const d = (b - a) * (words[x].k.length + 1) / tot; T[x] = [Math.round(t), Math.round(t + d)]; t += d; }
    i = k;
  }
  return { t: tidy(T, dur), matched };
}
// estimated word times from the length alone: syllables, with pauses after a word, a sentence and the title
function estTimes(words, dur) {
  const lead = 30, tail = 120, wt = words.map(w => 0.35 + syl(w.k)), gap = words.map(w => w.end ? (w.s < 0 ? 1.6 : 1.2) : 0.25);
  gap[gap.length - 1] = 0;
  const unit = Math.max(1, dur - lead - tail) / (wt.reduce((a, b) => a + b, 0) + gap.reduce((a, b) => a + b, 0));
  let t = lead;
  return tidy(words.map((w, i) => { const a = [Math.round(t), Math.round(t + wt[i] * unit)]; t += (wt[i] + gap[i]) * unit; return a; }), dur);
}
// increasing and inside the file: each word starts at or after the last one ends, lasts at least 40 ms, ends by the file's end
function tidy(T, dur) {
  const n = T.length, out = T.map(x => [Math.max(0, Math.round(x[0])), Math.round(x[1])]);
  for (let i = 0; i < n; i++) { if (i && out[i][0] < out[i - 1][1]) out[i][0] = out[i - 1][1]; if (out[i][1] < out[i][0] + 40) out[i][1] = out[i][0] + 40; }
  for (let i = n - 1; i >= 0; i--) { const lim = i == n - 1 ? dur : out[i + 1][0]; if (out[i][1] > lim) out[i][1] = lim; if (out[i][0] > out[i][1] - 40) out[i][0] = out[i][1] - 40; }
  return out;
}
const storyOk = (t, dur) => Array.isArray(t) && t.every((x, i) => x[1] > x[0] && x[0] >= 0 && (!i || x[0] >= t[i - 1][1])) && t[t.length - 1][1] <= dur;
function storyManifest(ST, lines, words, how) {
  const ids = Object.keys(ST), lk = [...lines.keys()].sort(), wk = [...words.keys()].sort();
  return '/* ---------- REC-198: the recorded stories of STORIES-7 (BUILT by tools/en-audio.js: never edit by hand; run node tools/en-audio.js --story) ----------\n'
    + '   ' + STORY_DIR + '<file> (xAI text to speech, English, the voice ' + STORY_VOICE + ', speed ' + STORY_SPEED + ', Opus 16 kbps mono), in the part teachrd.\n'
    + '   ST7A[story id] = {f: file, t: [[start, end] in ms, one per word of st7Words], e: 1 when the times are estimated}: ' + ids.length + ' stories; word times from speech to text\n'
    + '   timestamps for ' + how.stt + ', estimated from the length for ' + how.est + '. ST7S.lines: the questions and the reader\'s spoken sentences (' + lk.length + ');\n'
    + '   ST7S.w: the words, lower case, for a tap on a word (' + wk.length + ', none means the tablet\'s voice). Keys of lines are esKey(text). */\n'
    + 'const ST7A={\n' + ids.map(id => JSON.stringify(id) + ':{f:' + JSON.stringify(ST[id].f) + ',t:' + JSON.stringify(ST[id].t) + (ST[id].e ? ',e:1' : '') + '}').join(',\n') + '};\n'
    + 'const ST7S={dir:' + JSON.stringify(STORY_DIR) + ',ext:' + JSON.stringify(EXT) + ',voice:' + JSON.stringify(STORY_VOICE) + ',lines:{\n'
    + lk.map(k => JSON.stringify(k) + ':' + JSON.stringify(storyFileOf(k))).join(',\n') + '},\nw:{'
    + wk.map(k => JSON.stringify(k) + ':' + JSON.stringify(storyFileOf(words.get(k).text))).join(',') + '}};\n';
}
const readStoryManifest = () => { try { return Function(fs.readFileSync(STORY_MANIFEST, 'utf8') + ';return {A:ST7A,S:ST7S}')(); } catch (e) { return null; } };
const audioFail = () => +(fs.readFileSync(path.join(__dirname, 'test.js'), 'utf8').match(/AUDIO_FAIL=(\d+)/) || [])[1];
const audioTotal = () => ['es', 'en', 'teach', 'story'].reduce((s, d) => { const p = path.join(ROOT, 'audio', d); return s + (fs.existsSync(p) ? fs.readdirSync(p).reduce((a, f) => a + fs.statSync(path.join(p, f)).size, 0) : 0); }, 0);
async function storyMain(dry, wantWords) {
  const { stories, lines, words } = collectStory(), dir = path.join(ROOT, STORY_DIR), old = readStoryManifest();
  wantWords = wantWords || !!(old && Object.keys(old.S.w).length);
  const chars = a => a.reduce((s, o) => s + o.text.length, 0), ex = o => fs.existsSync(path.join(dir, storyFileOf(o.text) + EXT));
  console.log(`stories: ${stories.length} (${chars(stories)} characters); lines: ${lines.size} (${chars([...lines.values()])} characters); words: ${words.size} (${chars([...words.values()])} characters)${wantWords ? '' : ', not recorded (--words)'}`);
  console.log(`new: ${stories.filter(o => !ex(o)).length} stories, ${[...lines.values()].filter(o => !ex(o)).length} lines, ${wantWords ? [...words.values()].filter(o => !ex(o)).length : 0} words`);
  const failed = [], times = {};
  const how = {}; // file -> 'stt' | 'est': how its word times were made
  if (old) for (const id in old.A) { times[old.A[id].f] = old.A[id].t; how[old.A[id].f.slice(0, -EXT.length)] = old.A[id].e ? 'est' : 'stt'; } // a story already recorded keeps its times
  const sCheck = (j, file) => {
    const dur = VA.durMs(file), st = stories.find(s => s.id == j.id), r = VA.sttFull(file, LANG);
    if (!r) { times[j.file + EXT] = estTimes(st.words, dur); how[j.file] = 'est'; return null; } // speech to text not reachable: keep the file, estimate
    const a = norm(r.text), b = norm(j.text);
    if (dist(a, b) > Math.max(2, Math.floor(b.length / 10))) return 'heard "' + r.text + '"';
    if (!Array.isArray(r.words) || !r.words.length) { times[j.file + EXT] = estTimes(st.words, dur); how[j.file] = 'est'; return null; }
    const T = storyTimes(st.words, r.words, dur);
    if (T.matched < 0.85 * st.words.length) return 'only ' + T.matched + ' of ' + st.words.length + ' words line up';
    times[j.file + EXT] = T.t; how[j.file] = 'stt'; return null;
  };
  const rec = (jobs, chk) => VA.record(jobs, { dir: STORY_DIR, ext: EXT, lang: LANG, speed: STORY_SPEED, dry, check: chk });
  failed.push(...(await rec(stories.map(s => ({ id: s.id, text: s.text, voice: STORY_VOICE, file: storyFileOf(s.text) })), sCheck)).failed);
  failed.push(...(await rec([...lines.values()].map(o => ({ text: o.text, voice: STORY_VOICE, file: storyFileOf(o.text) })), check)).failed);
  if (wantWords) failed.push(...(await rec([...words.values()].map(o => ({ text: o.text, voice: STORY_VOICE, file: storyFileOf(o.text) })), wCheck)).failed);
  if (dry) return failed;
  // a story file kept from an earlier run without times (or with times that do not fit): times from speech to text now
  for (const s of stories) {
    const f = storyFileOf(s.text) + EXT, p = path.join(dir, f);
    if (!fs.existsSync(p) || (times[f] && times[f].length == s.words.length && storyOk(times[f], VA.durMs(p)))) continue;
    if (sCheck({ id: s.id, text: s.text, file: f.slice(0, -EXT.length) }, p)) { times[f] = estTimes(s.words, VA.durMs(p)); how[f.slice(0, -EXT.length)] = 'est'; }
  }
  const ST = {};
  for (const s of stories) { const f = storyFileOf(s.text) + EXT; if (fs.existsSync(path.join(dir, f)) && times[f]) ST[s.id] = how[f.slice(0, -EXT.length)] == 'est' ? { f, t: times[f], e: 1 } : { f, t: times[f] }; }
  const haveL = new Map([...lines].filter(([, o]) => ex(o)));
  let haveW = new Map(wantWords ? [...words].filter(([, o]) => ex(o)) : []);
  // the word taps only with STORY_MARGIN of the budget left (owner instruction 2026-11-27); else their files go again
  const keepOf = W => new Set([...Object.values(ST).map(o => o.f), ...[...haveL.values(), ...W.values()].map(o => storyFileOf(o.text) + EXT)]);
  VA.prune(STORY_DIR, EXT, keepOf(haveW));
  const lim = audioFail() - STORY_MARGIN;
  if (haveW.size && audioTotal() > lim) { console.log(`the word taps would leave less than ${STORY_MARGIN} bytes of the budget (all audio ${audioTotal()} > ${lim}): not kept`); haveW = new Map(); }
  const keep = keepOf(haveW), [gone, bytes] = VA.prune(STORY_DIR, EXT, keep);
  const nStt = Object.values(ST).filter(o => !o.e).length;
  fs.writeFileSync(STORY_MANIFEST, storyManifest(ST, haveL, haveW, { stt: nStt, est: Object.keys(ST).length - nStt }));
  console.log(`story manifest: ${Object.keys(ST).length} stories, ${haveL.size} lines, ${haveW.size} words, ${fs.statSync(STORY_MANIFEST).size} bytes; audio: ${keep.size} files, ${bytes} bytes; removed ${gone} old files; all audio ${audioTotal()} bytes (budget ${audioFail()})`);
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
  if (process.argv.includes('--teach-start')) { writeTeachStart(); return; } // fix2 v194: only the start-up list, from the manifest
  if (process.argv.includes('--teach')) { if ((await teachMain(dry)).length) process.exitCode = 1; return; } // TEACH-4: the teacher lines only
  if (process.argv.includes('--story')) { if ((await storyMain(dry, process.argv.includes('--words'))).length) process.exitCode = 1; return; } // REC-198: the stories only
  const lines = collect(), all = [...lines.values()];
  console.log(`lines: ${all.length} x ${VOICES.length} voices = ${all.length * VOICES.length} files, ${all.reduce((s, o) => s + o.text.length, 0) * VOICES.length} characters`);
  const jobs = [];
  for (const o of all) for (const [v] of VOICES) jobs.push({ text: o.text, voice: v, file: fileOf(o.text, v) });
  const { failed } = await VA.record(jobs, { dir: DIR, ext: EXT, lang: LANG, speed: SPEED, dry, check });
  if (dry) { await teachMain(true); await storyMain(true, process.argv.includes('--words')); return; } // REC-198: --dry lists the teacher lines and the stories too
  // the manifest lists only lines with a file in every voice (a failed line keeps the tablet's voice until the next run)
  const dir = path.join(ROOT, DIR), have = new Map([...lines].filter(([k]) => VOICES.every(([v]) => fs.existsSync(path.join(dir, fileOf(k, v) + EXT)))));
  fs.writeFileSync(MANIFEST, manifestText(have));
  const keep = new Set([...have.keys()].flatMap(k => VOICES.map(([v]) => fileOf(k, v) + EXT))), [gone, bytes] = VA.prune(DIR, EXT, keep);
  console.log(`manifest: ${have.size} lines, ${fs.statSync(MANIFEST).size} bytes; audio: ${keep.size} files, ${bytes} bytes; removed ${gone} old files`);
  if (failed.length) process.exitCode = 1;
  if ((await teachMain(false)).length) process.exitCode = 1; // TEACH-4: then the teacher lines
  if ((await storyMain(false, process.argv.includes('--words'))).length) process.exitCode = 1; // REC-198: then the stories
}

module.exports = { collect, fileOf, enKey, DIR, EXT, FORMAT, VOICES, GROUPS, collectStory, storyFileOf, storyTimes, estTimes, storyOk, wordKey, STORY_DIR, STORY_VOICE, STORY_FORMAT, STORY_MARGIN, ST7_SAID, collectTeach, teachFileOf, teachStart, teachStartText, TEACH_DIR, TEACH_VOICE, TEACH_FORMAT, TEACH_FORMAT_BIG, TEACH_GROUPS, NR_LIT, NR_GEN, NR_NEW, NR_FROM };
if (require.main === module) main().catch(e => { console.error(e); process.exit(1); });
