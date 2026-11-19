#!/usr/bin/env node
/* TEACH-2 (docs/TEACH-PLAN-2.md system F): the lesson-script authoring tool. The developer runs it; the build never does, and it never
   runs on the tablet or sees any child's data.

   node tools/author.js --check            check every hand-written script (src/js/52c-scripts.js) and every draft in docs/drafts/
   node tools/author.js --sheet [id ...]   print lessons as plain text, one page each, for the owner's read-through
   node tools/author.js --draft <stop> [--grade N] [--dry]
                                           ask the xAI API for a first draft of a stop's words and write docs/drafts/<stop>.md,
                                           marked "status: unreviewed" (--dry: print the request and write nothing)
   node tools/author.js --approve <stop ...|all> [--by NAME] [--date YYYY-MM-DD] [--note TEXT]
                                           TEACH-2b: the owner's one step: mark drafts "status: reviewed NAME DATE (NOTE)" (only drafts
                                           that pass every check), then write src/js/52e-words.js, so their lessons go live at the next build
   node tools/author.js --hints-draft [code ...] [--dry]
                                           HINT-01: ask the xAI API for the words of the Practice mistake hints (src/js/39m-mist.js,
                                           HM) and write docs/drafts/hints/<code>.md, "status: unreviewed" (no codes: every code with
                                           no draft yet; --dry: print the request)
   node tools/author.js --hints-approve <code ...|all> [--by NAME] [--date YYYY-MM-DD] [--note TEXT]
                                           HINT-01: the owner's step for hints: mark hint drafts reviewed (only those that pass every
                                           check), then write src/js/39n-hintw.js, so those hints show at the next build
   node tools/author.js --hints-read <file>
                                           HINT-01: one read-through of every hint, by subject and skill: an example question, the
                                           wrong answer, and the hint as the child sees it (docs/drafts/HINTS-READ.md)
   node tools/author.js --read <file> [--batch 3|4] [stop ...]
                                           TEACH-2b: one read-through file of the unreviewed drafts (or the stops named), in map order;
                                           TEACH-3: --batch 3, the grade 3-5 drafts not yet reviewed (docs/drafts/BATCH3-READ.md);
                                           TEACH-4: --batch 4, the reading and Pre-K drafts not yet reviewed (docs/drafts/BATCH4-READ.md)

   What a draft is. Only words: the lines each of the six beats says (Remember, Explore, Name it, Together, Check me, Show), the
   pet's reasons for each misconception code, and tonight's question for a grown-up. Numbers are never written: a number is a
   {slot} the lesson's code fills from the question or from what the child built, so a draft cannot state a wrong fact. Question
   choices, checkers and misconception functions are code, never drafted. A developer turns a reviewed draft into a script in
   src/js/52c-scripts.js and names the draft there (draft: 'docs/drafts/<stop>.md').
   TEACH-2b: or the developer writes the lesson's code first (lsDraft('<stop>', ...) in src/js/52g-drafted.js: the questions, the models,
   the codes, what each beat's words are for (brief) and the {slots} each beat may use (slots)); --draft gives that brief to the model and
   --check holds the draft to those slots and codes. tools/build.py copies the words of REVIEWED drafts only into src/js/52e-words.js,
   and the lesson is live only when its words are there.

   The gate. The owner reads every draft (--sheet, or the draft file itself), fixes the wording, and changes its status line to
   "status: reviewed <name> <date>". tools/build.py refuses to build while any script names a draft that is not reviewed, and this
   tool's --check fails on it too.

   The checks (checkLine, checkDraft; tools/test.js "author" runs them):
     - the six beats, each with at least one line; the misconception codes are real (BUGS); tonight's question names {name};
     - about 3 minutes: spoken words at 150 a minute plus the time the child works (LS_SECS), 2 to 4.5 minutes in all;
     - no theme the parent ruled out (CONTENT-01): no magic or spells, nothing about evolution, no "millions of years"; dragons are fine;
       no rude word (the app's own kid-safe list, ksBad);
     - no digit and no number word outside a {slot}, and only known slots;
     - the tone of the pet's age (LS_RULES and lsToneBad in 52c-scripts.js): the little one (Pre-K to 2nd) 12 words a line, the older
       kid (3rd, 4th) 16 and no baby praise, the teen-like partner (5th, 6th) 20 and none of the little one's exclamations.

   The key. The API key is never in this file, in the repo or in the environment of the tool: requests go to https://api.x.ai with
   the header "Authorization: Bearer proxy-injected" and the network proxy of the machine puts the real key in. The model is the one
   named by AUTHOR_MODEL, else the first one the API lists. */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), DRAFTS = path.join(ROOT, 'docs', 'drafts');
const API = 'https://api.x.ai/v1';
const BEATS = ['remember', 'explore', 'name', 'together', 'check', 'show'];
// seconds the child works in each beat of a first lesson (owner decision 2: 1 Remember item, 1 Explore task, 3 Together items,
// 1 Check me with its fix, 2 Show items), on top of the time the lines take to say
const LS_SECS = {remember: 15, explore: 30, name: 0, together: 60, check: 30, show: 30};
const WPM = 150, MIN_SEC = 120, MAX_SEC = 270;
// CONTENT-01 (the parent's rule): the same words tools/test.js keeps out of src/. "Spell" as in spelling is fine; dragons are fine.
const BANNED = /\b(magic\w*|wizards?|witch(es|craft)?|wands?|potions?|sorcer\w*|enchant\w*|spellbooks?|spells?|charms?|unicorns?|fairy|fairies|genies?|warlocks?|evolv\w*|evolution\w*|natural selection|common ancestors?|millions? of years|billions? of years)\b|cast(s|ing)? a spell|under a spell/i;
const NUMWORDS = /\b(two|three|four|five|six|seven|eight|nine|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|thousand|million|billion|fourths?|fifths?|sixths?|sevenths?|eighths?|ninths?|twelfths?)\b/i;
const SLOTS = ['name', 'pet', 'a', 'b', 'n', 'k', 't', 'sum', 'diff', 'ans', 'top', 'bottom', 'tens', 'ones', 'hour', 'min', 'coin', 'value', 'x', 'y', 'time',
  'word', 'letter', 'other']; // TEACH-4: reading lessons: the picture's word, the letter or pattern taught, the other bin of a sort

// ---- the app, for its rules (LS_RULES, lsAge, lsToneBad, BUGS, ksBad) and its lessons ----
let APP = null;
function app() {
  if (APP) return APP;
  const ctx = require('./es-audio.js').loadApp(null);
  vm.runInContext('loadSave(null);S.name="Mia"', ctx);
  APP = x => vm.runInContext(x, ctx);
  APP.ctx = ctx;
  return APP;
}

// ---- checks ----
// one line, said by the pet of age `age`: its problems ([] when fine). o.slots: the line may hold {slots}
function checkLine(t, age, o = {}) {
  const R = app(), out = [], s = String(t == null ? '' : t);
  if (!s.trim()) return ['an empty line'];
  const bare = s.replace(/\{[^}]*\}/g, 'X');
  if (BANNED.test(s)) out.push(`a theme the parent ruled out: "${s.match(BANNED)[0]}"`);
  if (/\d/.test(bare)) out.push('a number written into the words (numbers come from code: use a {slot})');
  if (NUMWORDS.test(bare)) out.push(`a number word "${bare.match(NUMWORDS)[0]}" (use a {slot})`);
  for (const m of s.matchAll(/\{([^}]*)\}/g)) if (!SLOTS.includes(m[1])) out.push(`an unknown slot {${m[1]}}`);
  if (/[{}]/.test(s.replace(/\{[a-z]+\}/g, ''))) out.push('a broken {slot}');
  if (R.ctx.ksBad(bare.replace(/X/g, ' '), true)) out.push('a word that is not kid-safe (ksBad)');
  for (const p of R.ctx.lsToneBad(bare, age)) out.push(p);
  return out;
}
// the pet's age for a grade (Pre-K is -1): little, kid, teen
const ageOf = g => app()('lsAge(' + (+g) + ')');
// how long the lesson takes, in seconds: its lines said at WPM words a minute, plus the child's work
function lessonSecs(d) {
  const words = BEATS.reduce((n, b) => n + [].concat((d.beats || {})[b] || []).join(' ').split(/\s+/).filter(Boolean).length, 0);
  return Math.round(words / WPM * 60 + BEATS.reduce((n, b) => n + LS_SECS[b], 0));
}
// a draft (the JSON object): its problems
function checkDraft(d) {
  const p = [], R = app();
  if (!d || typeof d != 'object') return ['not a draft'];
  if (!d.id || !/^[a-z_]+\d+$/.test(d.id)) p.push('no stop id');
  const g = +d.grade;
  if (!(g >= -1 && g <= 6)) p.push('no grade (-1 to 6)');
  const age = g >= -1 && g <= 6 ? ageOf(g) : 'little';
  if (d.age && d.age !== age) p.push(`age ${d.age}, but grade ${g} is the ${age} pet`);
  if (!d.idea) p.push('no idea (the one sentence of Name it and the notebook)');
  else for (const x of checkLine(d.idea, age)) p.push('idea: ' + x);
  for (const b of BEATS) {
    const ls = [].concat((d.beats || {})[b] || []);
    if (!ls.length) p.push(`no ${b} beat`);
    ls.forEach((t, i) => { for (const x of checkLine(t, age)) p.push(`${b} ${i + 1}: ${x} — "${t}"`); });
  }
  const codes = R('Object.keys(BUGS)');
  for (const c in d.reasons || {}) {
    if (!codes.includes(c)) p.push(`reasons: an unknown misconception code ${c} (the codes are ${codes.join(', ')})`);
    [].concat(d.reasons[c]).forEach(t => { for (const x of checkLine(t, age)) p.push(`reason ${c}: ${x} — "${t}"`); });
  }
  if (!d.reasons || !Object.keys(d.reasons).length) p.push('no reasons (one or two per misconception code the pet shows)');
  if (!d.home || !/\{name\}/.test(d.home)) p.push('tonight\'s question (home) must name {name}');
  else if (BANNED.test(d.home) || R.ctx.ksBad(d.home.replace(/\{[^}]*\}/g, ' '), true)) p.push('home: not allowed: ' + d.home);
  else if (d.home.length > 160) p.push('home: longer than 160 characters');
  const sec = lessonSecs(d);
  if (sec < MIN_SEC || sec > MAX_SEC) p.push(`about ${Math.round(sec / 6) / 10} minutes (want ${MIN_SEC / 60} to ${MAX_SEC / 60})`);
  // TEACH-2b: a draft for a script written in code (lsDraft) uses only the slots each beat has numbers for, gives reasons only for the
  // codes that lesson's pet can show, and says the pet's answer ({ans}) in Check me
  const C = contract(d.id);
  if (C) {
    for (const b of BEATS) [].concat((d.beats || {})[b] || []).forEach((t, i) => {
      const ok = slotsOf(C, b, i);
      for (const m of String(t).matchAll(/\{([a-z]+)\}/g)) if (!['name', 'pet'].includes(m[1]) && !ok.includes(m[1]))
        p.push(`${b} ${i + 1}: {${m[1]}} has no number ${Array.isArray((C.slots[b] || [])[0]) ? 'in this line' : 'in this beat'} (it has ${ok.map(x => '{' + x + '}').join(' ') || 'none'}) — "${t}"`);
    });
    for (const c in d.reasons || {}) if (!C.bugs.includes(c)) p.push(`reasons: ${c} is not a mistake this lesson's pet makes (it makes ${C.bugs.join(', ')})`);
    if (![].concat((d.beats || {}).check || []).some(t => /\{ans\}/.test(t))) p.push('check: no line says the pet\'s answer ({ans})');
    if (/\{/.test(d.idea || '')) p.push('idea: a slot in the idea (it is one sentence for every day, with no numbers)');
    if ([].concat((d.beats || {}).together || []).length != 3) p.push('together: one line for each of the three items (3 lines)');
    if (![1, 2].includes([].concat((d.beats || {}).show || []).length)) p.push('show: one or two lines');
    if (d.home && (d.home.length > 90 || d.home.split(/\s+/).length > 14)) p.push('home: longer than 90 characters or 14 words (as the hand-written lessons)');
  }
  return p;
}
// the slots line i of beat b may use: one list for the beat, or one list per line (Together: build, picture, symbols)
const slotsOf = (C, b, i) => { const x = C.slots[b] || []; return Array.isArray(x[0]) ? x[Math.min(i, x.length - 1)] || [] : x; };
// the code's side of a drafted lesson (52g-drafted.js): the stop, its slots per beat, its codes, what the words are for; null for none
function contract(id) {
  if (!id) return null;
  // TEACH-4: a batch 4 lesson's brief is kept out of the app (tools/briefs4.js), made from its family and fields
  const C = app()(`(()=>{const D=typeof LS_DRAFTED!='undefined'&&LS_DRAFTED[${JSON.stringify(String(id))}];return D?{t:D.t,slots:D.slots,bugs:D.bugs,brief:D.brief,band:D.band||'',p:D.p||'math',claim:D.claim||'',
    fam:D.fam,key:D.key,show:D.show,what:D.what,top:D.top,up:D.up}:null})()`);
  if (C && !C.brief && C.fam) C.brief = require('./briefs4.js').brief(C);
  return C;
}
// the hand-written scripts (code: each line comes from a function with numbers filled in): every line they can say, checked
// for the age of the stop's grade; and a script that names a draft must name a reviewed one
function checkScripts() {
  const R = app();
  return R(`(()=>{const o=[];for(const id of LS_IDS){const L=LESSONS[id],p=L.p||'math',i=NODES[p].findIndex(n=>nid(n)===id),g=i<0?0:PATHS[p].worlds[NODES[p][i].wi].g,age=lsAge(g),lines=[L.idea];
    for(let s=0;s<30;s++){const r=mulberry32(s+1);for(const st of [0,1,2])lines.push(L.q(st,r).say);const e=L.exp(r);lines.push(e.q.say);if(e.nudge)lines.push(e.nudge)}
    o.push({id,t:L.t,g,age,lines:[...new Set(lines)],home:L.home,draft:L.draft||null})}return o})()`).map(s => {
    // the scripts' own lines have their numbers filled in by code, so only the theme, kid-safe and tone rules apply to them
    const p = [];
    for (const t of s.lines) {
      if (BANNED.test(t)) p.push(`a theme the parent ruled out: "${t}"`);
      if (R.ctx.ksBad(t, true)) p.push('not kid-safe: ' + t);
      for (const x of R.ctx.lsToneBad(t, s.age)) p.push(`${x}: "${t}"`);
    }
    if (s.draft) { const st = draftStatus(path.join(ROOT, s.draft)); if (st !== 'reviewed') p.push(`names the draft ${s.draft}, which is ${st}`); }
    return Object.assign(s, {problems: p});
  });
}

// ---- drafts on disk: docs/drafts/<stop>.md, a status line, a JSON block, a plain-text sheet, the check results ----
function draftStatus(f) {
  if (!fs.existsSync(f)) return 'missing';
  const m = /^status:\s*(\w+)/m.exec(fs.readFileSync(f, 'utf8'));
  return m ? m[1].toLowerCase() : 'unmarked';
}
function parseDraft(text) {
  const m = /```json\n([\s\S]*?)\n```/.exec(text);
  if (!m) throw new Error('no ```json block');
  const d = JSON.parse(m[1]), st = /^status:\s*(\w+)/m.exec(text);
  d.status = st ? st[1].toLowerCase() : 'unmarked';
  return d;
}
// the read-through page: the lesson as the child hears it, beat by beat, as plain text
function sheet(d) {
  const L = [`${d.t || d.id} (${d.id}), grade ${d.grade}, the ${d.age || ageOf(d.grade)} pet`, `Idea: ${d.idea}`, ''];
  const NAMES = {remember: 'Remember', explore: 'Explore', name: 'Name it', together: 'Together', check: 'Check me', show: 'Show'};
  for (const b of BEATS) { L.push(NAMES[b] + ':'); for (const t of [].concat((d.beats || {})[b] || [])) L.push('  - ' + t); }
  L.push('Reasons the pet gives when it is caught:');
  for (const c in d.reasons || {}) L.push(`  ${c}: ` + [].concat(d.reasons[c]).join(' | '));
  L.push(`Tonight's question: ${d.home}`, `About ${Math.round(lessonSecs(d) / 6) / 10} minutes.`);
  return L.join('\n');
}
function draftFile(d, problems, model) {
  const clean = Object.assign({}, d);
  delete clean.status;
  return `# Draft: ${d.t || d.id} (${d.id})\n\nstatus: unreviewed\nmade: ${new Date().toISOString().slice(0, 10)} by tools/author.js --draft (xAI API)\n\n`
    + '<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with\n'
    + '     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson\n'
    + '     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->\n\n'
    + '## Read-through\n\n```text\n' + sheet(d) + '\n```\n\n## Checks\n\n'
    + (problems.length ? problems.map(x => '- ' + x).join('\n') : '- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).') + '\n\n'
    + '## Words (the draft itself)\n\n```json\n' + JSON.stringify(clean, null, 1) + '\n```\n';
}
function drafts() {
  if (!fs.existsSync(DRAFTS)) return [];
  return fs.readdirSync(DRAFTS).filter(f => /^[a-z_]+\d+\.md$/.test(f)).sort().map(f => { // a stop's draft (not BATCH2-READ.md)
    const file = path.join(DRAFTS, f);
    try { const d = parseDraft(fs.readFileSync(file, 'utf8')); return {file, d, problems: checkDraft(d)}; }
    catch (e) { return {file, d: null, problems: ['cannot read: ' + e.message]}; }
  });
}

// ---- the API (through the machine's proxy, which adds the key) ----
function api(method, url, body) {
  const args = ['-sS', '-m', '180', '-X', method, url, '-H', 'Authorization: Bearer proxy-injected', '-H', 'Content-Type: application/json'];
  if (body) args.push('--data-binary', '@-');
  const out = cp.execFileSync('curl', args, {input: body ? JSON.stringify(body) : undefined, maxBuffer: 1 << 24}).toString();
  const j = JSON.parse(out);
  if (j.error) throw new Error('API: ' + JSON.stringify(j.error).slice(0, 300));
  return j;
}
function model() {
  if (process.env.AUTHOR_MODEL) return process.env.AUTHOR_MODEL;
  const ms = (api('GET', API + '/models').data || []).map(m => m.id).filter(id => !/image|vision|imagine|video|embed/i.test(id));
  if (!ms.length) throw new Error('the API lists no text model; set AUTHOR_MODEL');
  return ms[0];
}
// what the model is asked: the stop, the age's tone, the rules, and one hand-written lesson as the example
function draftPrompt(id, grade) {
  // TEACH-4: a stop of the math map or the reading map
  const R = app(), stop = R(`(()=>{for(const p of ['math','read']){const n=NODES[p].find(x=>nid(x)===${JSON.stringify(id)});if(!n)continue;const w=PATHS[p].worlds[n.wi];
    return{t:n.t,sk:n.sk,lv:n.lv,world:w.n,g:w.g,p,skill:(SK[n.sk]||{}).n||''}}return null})()`);
  if (!stop) throw new Error('no math or reading stop ' + id);
  const g = grade != null ? +grade : stop.g, age = ageOf(g), rules = R(`(()=>{const r=LS_RULES[${JSON.stringify(age)}];return{words:r.words,chars:r.chars,no:r.no?String(r.no):''}})()`);
  const tone = R(`JSON.stringify(LS_TONE[${JSON.stringify(age)}],(k,v)=>typeof v=='function'?v(k=='nb'?'{n}':'{name}'):v)`), codes = R('Object.keys(BUGS).map(c=>c+": "+BUGS[c].d).join("\\n")');
  const C = contract(id), b4 = C && C.band == '4', example = fs.readFileSync(path.join(DRAFTS, b4 && C.p == 'read' ? 'EXAMPLE-READ.json' : 'EXAMPLE.json'), 'utf8');
  const code = C ? `\nThis lesson's code is written already. What each beat's words are for, and which numbers it has:\n${C.brief}
Slots each beat may use (no others; a slot is never the answer the child has to find): ${BEATS.map(b => b + ': ' + (Array.isArray((C.slots[b] || [])[0]) ? C.slots[b].map((x, i) => 'line ' + (i + 1) + ' ' + (x.map(y => '{' + y + '}').join(' ') || 'none')).join(', ') : (C.slots[b] || []).map(x => '{' + x + '}').join(' ') || 'none')).join('; ')}. {name} (the child) may be used anywhere.
Explore lines are only the task, said before the child starts (no lines about what they made: the app reacts itself).
After each Together and Show line the app says the problem itself, with its numbers, so a line coaches or sets the scene and never repeats the problem.
check: exactly two lines: "My turn. Check me!" and the pet's claim, which must use {ans}: the pet's whole answer as the app says it (${b4 ? 'here: ' + (C.p == 'read' ? 'a letter or a word, ' : '') + 'as in "' + C.claim + '"' : 'a number, a time such as "half past 4" or "4 15", or "35 cents"'}), e.g. "${b4 ? C.claim : 'I think it is {ans}. Am I right?'}".${b4 ? '\nThe child does not read yet (or is just starting): every line is heard. Never spell a sound with slashes; name a letter by its slot, and a sound by a word that has it ("the first sound of {word}").' : ''}
together: exactly three lines: line 1 is said before a build item, line 2 before a picture item, line 3 before a symbols-only item (the app says "Now let's do some together." itself, and a miss can bring a build back, so each line fits its kind of item on its own). The idea has no slots and no numbers. Never a number word: "eighteen", "nine", "hundreds of" are all written as slots or left out.
reasons: only for these codes (the mistakes this lesson's pet makes): ${C.bugs.join(', ')}.\n` : '';
  const sys = 'You write the spoken words of short lessons in a children\'s learning app for Pre-K to 6th grade. The child\'s pet runs each lesson. '
    + 'You write only words; the app\'s code fills every number. Reply with one JSON object and nothing else.';
  const user = `Write the words of one lesson.
Stop: "${stop.t}" (id ${id}) in the world "${stop.world}" (${stop.p == 'read' ? 'reading' : 'math'}), grade ${g === -1 ? 'Pre-K' : g === 0 ? 'Kindergarten' : g}.
The pet's age for this grade: ${age}. How that pet talks (its fixed lines): ${tone}
Rules for every line:
- At most ${rules.words} words and ${rules.chars} characters.${rules.no ? ' Never use: ' + rules.no : ''}
- NEVER write a digit or a number word (two, three, ... twenty, thirty, ...). Every number is a slot the code fills: ${SLOTS.map(s => '{' + s + '}').join(' ')}. "one", "ten" and "hundred" are allowed only as words for places and pieces ("the ones", "a ten").${stop.p == 'read' ? '\n- NEVER write a word, a letter or a sound of the lesson\'s own questions (cat, m, sh): the code chooses them and fills the slots {word} {letter} {other}. Write "both" instead of "two".' : ''}
- No magic, spells, wizards, wands, potions, fairies, unicorns, evolution or "millions of years". Dragons, animals, space, the sea and building things are fine.
- Warm, plain, kind words a child hears once and understands. The pet is never wrong while it teaches; it is wrong only in its own announced turn ("Check me").
- About 3 minutes in all: remember 1 line, explore 1 or 2, name 2 or 3, together 2 or 3, check 2 (the pet's turn and a question), show 1 or 2.
The six beats: remember (bring back an earlier idea), explore (hands on a model, any way is fine), name (name the idea on what the child built), together (practice with help that fades), check (the pet's announced turn: the child checks the pet's work), show (two items with no help, inside a small job in the world).
reasons: for one or two of these misconception codes that fit this stop, one or two short lines the pet says when the child catches that mistake:
${codes}
home: tonight's question for a grown-up to ask the child, starting "Ask {name}" (a real number is fine here, it is for the grown-up).
The JSON has exactly these keys: id, t, grade, age, idea, beats {remember, explore, name, together, check, show} (arrays of lines), reasons {code: [lines]}, home.${code}
An example from another stop (hand-written, Kindergarten):
${example}`;
  return {stop, g, age, messages: [{role: 'system', content: sys}, {role: 'user', content: user}]};
}
function draft(id, o = {}) {
  const P = draftPrompt(id, o.grade);
  if (o.dry) return {prompt: P};
  const m = model();
  let msgs = P.messages, d = null, problems = [];
  for (let round = 0; round < 2; round++) {
    const res = api('POST', API + '/chat/completions', {model: m, messages: msgs, temperature: 0.7});
    const txt = String(res.choices[0].message.content || '').replace(/^```(?:json)?\s*|\s*```$/g, '');
    d = JSON.parse(txt.slice(txt.indexOf('{'), txt.lastIndexOf('}') + 1));
    Object.assign(d, {id, t: P.stop.t, grade: P.g, age: P.age});
    problems = checkDraft(d);
    if (!problems.length) break;
    // one more try with the problems named; whatever comes back is written, with its problems, for the owner to see
    msgs = msgs.concat([{role: 'assistant', content: JSON.stringify(d)}, {role: 'user', content: 'Fix these problems and reply with the whole JSON again:\n' + problems.join('\n')}]);
  }
  fs.mkdirSync(DRAFTS, {recursive: true});
  const file = path.join(DRAFTS, id + '.md');
  fs.writeFileSync(file, draftFile(d, problems, m));
  return {file, d, problems, model: m};
}

// ---- TEACH-2b: the owner's one step, and one read-through for a batch ----
// mark drafts reviewed (only those that pass every check), then write src/js/52e-words.js (tools/build.py --words-only)
function approve(ids, o = {}) {
  const by = String(o.by || 'owner').replace(/\s+/g, ' ').trim(), date = o.date || new Date().toISOString().slice(0, 10), done = [], bad = [];
  if (!/^\d{4}-\d\d-\d\d$/.test(date)) throw new Error('--date must be YYYY-MM-DD');
  for (const x of drafts()) {
    if (!x.d || !(ids.includes('all') ? x.d.status === 'unreviewed' : ids.includes(x.d.id))) continue;
    if (x.problems.length) { bad.push(`${x.d.id}: ${x.problems.length} problems (fix them first: node tools/author.js --check)`); continue; }
    const t = fs.readFileSync(x.file, 'utf8'), line = `status: reviewed ${by} ${date}${o.note ? ' (' + o.note + ')' : ''}`;
    fs.writeFileSync(x.file, t.replace(/^status:.*$/m, line));
    done.push(x.d.id);
  }
  for (const id of ids) if (id !== 'all' && !done.includes(id) && !bad.some(b => b.startsWith(id + ':'))) bad.push(`${id}: no such draft`);
  if (done.length) cp.execFileSync('python3', [path.join(ROOT, 'tools', 'build.py'), '--words-only'], {stdio: 'pipe'});
  return {done, bad};
}
// the read-through: every lesson's sheet in map order, short enough to read on a phone
// TEACH-3: o.batch 3 reads the grade 3-5 drafts (LS_B35) that are not reviewed, under the batch 3 heading
function readThrough(ids, o = {}) {
  // TEACH-4: the reading map's stops come after the math map's (Tiny Town, then ABC Beach and the reading worlds)
  const R = app(), at = id => R(`(()=>{const i=NODES.math.findIndex(n=>nid(n)===${JSON.stringify(id)});return i>=0?i:1e4+NODES.read.findIndex(n=>nid(n)===${JSON.stringify(id)})})()`);
  const b3 = o.batch == 3, b4 = o.batch == 4, B35 = R('LS_B35'), B4 = R('typeof LS_B4=="undefined"?[]:LS_B4');
  // no stops named: every unreviewed draft of this batch's band (batch 4 the reading and Pre-K lessons, batch 3 the grade 3-5 lessons,
  // batch 2 the rest); none waiting reads as none, never as every draft (v177: with batch 2 all reviewed, an empty list used to pull in the batch 3 drafts)
  if (!ids.length) ids = drafts().filter(x => x.d && x.d.status === 'unreviewed' && (b4 ? B4.includes(x.d.id) : !B4.includes(x.d.id) && B35.includes(x.d.id) === b3)).map(x => x.d.id);
  const xs = drafts().filter(x => x.d && ids.includes(x.d.id)).sort((a, b) => at(a.d.id) - at(b.d.id));
  if (!xs.length) return [`# Batch ${b4 ? 4 : b3 ? 3 : 2} read-through`, '', 'Nothing is waiting: every lesson of this batch is reviewed.', ''].join('\n');
  const head = b4 ? ['# Batch 4 read-through: reading for K to 2nd grade, and Pre-K', '',
    `${xs.length} lessons, in map order: Tiny Town (Pre-K math), ABC Beach (Pre-K reading),`, 'then the reading worlds of Kindergarten, 1st and 2nd grade.',
    'Each is what the child hears: the six beats, the pet\'s reasons when it is caught,', 'and tonight\'s question for you. All of them hear the little one pet.', '',
    'The app fills in each {slot} from the question on screen: {word} is the picture\'s word,', '{letter} the letter or letter team being learned, {other} the second one of a sort,',
    '{n} a number, {ans} the pet\'s answer. So words, letters and numbers are always right.',
    'The app also says each question itself, after the Together and Show lines.', '',
    'Until you approve a lesson, it runs on short hand-written lines', '(its idea, a Name it line, the pet\'s reasons), so it works now.', '',
    'The reading lessons: Explore sorts pictures by a sound, Name it shows the letter,', 'Together builds words from letter tiles, Check me has the pet read "cat" as "cap"',
    'for the child to fix, and Show is a short sentence to read and match to a picture.', '',
    'To change a word: edit the JSON in that lesson\'s file in docs/drafts/.', 'When you are happy, say so, or run:', '',
    '`node tools/author.js --approve <stop ...> --by <your name>`', '', '(or all, which also approves any lesson of batches 2 and 3 still waiting).', 'Approved lessons use their words at the next build.', '']
    : b3 ? ['# Batch 3 read-through: grade 3 to 5 math lessons', '',
    `${xs.length} lessons, in map order. Each is what the child hears:`, 'the six beats, the pet\'s reasons when it is caught, and tonight\'s question for you.', '',
    'Grades 3 and 4 hear the older kid pet; grade 5 hears the teen-like partner.', '',
    'The app fills in each {slot} from the problem on screen, so numbers are always right.',
    'The app also says each problem itself, after the Together and Show lines.', '',
    'Until you approve a lesson, it runs on short hand-written lines', '(its idea, a Name it line, the pet\'s reasons), so it works now.', '',
    'In Check me the pet shows its own working (or works out a problem the child sets),', 'and the child finds the slip and builds the reason from word tiles.', '',
    'To change a word: edit the JSON in that lesson\'s file in docs/drafts/.', 'When you are happy, say so, or run:', '',
    '`node tools/author.js --approve <stop ...> --by <your name>`', '', '(or all, which also approves any batch 2 lesson still waiting).', 'Approved lessons use their words at the next build.', '']
    : ['# Batch 2 read-through: grade 1 and 2 math lessons', '',
    `${xs.length} lessons, in map order. Each is what the child hears:`, 'the six beats, the pet\'s reasons when it is caught, and tonight\'s question for you.', '',
    'The app fills in each {slot} from the problem on screen, so numbers are always right.',
    'The app also says each problem itself, after the Together and Show lines.', '',
    'To change a word: edit the JSON in that lesson\'s file in docs/drafts/.', 'When you are happy, say so, or run:', '',
    '`node tools/author.js --approve all --by <your name>`', '', '(or name the lessons instead of all). Approved lessons go live at the next build.', ''];
  return head.concat(xs.map((x, i) => `## ${i + 1}. ${x.d.t} (${x.d.id})\n\n\`\`\`text\n${sheet(x.d).split('\n').slice(1).join('\n')}\n\`\`\`\n`)).join('\n');
}

// ---- HINT-01: the Practice mistake hints (src/js/39m-mist.js: HM, the codes; HM_SLOTS, the slots a line may use) ----
const HINTS = path.join(DRAFTS, 'hints');
// the subject of a skill, and every grade (Pre-K is -1) whose map has a stop of that skill and level
function hintStops() {
  return app()(`(()=>{const o={};for(const p in NODES)for(const n of NODES[p]){if(!SK[n.sk])continue;const w=PATHS[p].worlds[n.wi],k=n.sk+'|'+n.lv;
    (o[k]=o[k]||{sk:n.sk,lv:n.lv,p,area:SK[n.sk].area,t:SK[n.sk].t,stop:n.t,g:[]}).g.push(w.g)}return o})()`);
}
const SUBJ = {math: 'Math', read: 'Reading', es: 'Spanish', disc: 'Discover'};
/* every code with its examples: Practice questions (seeded, so the read-through is the same each run) where a child holding the
   mistake gives that code's answer, the slots it fills, and the grades of the stops it shows in. o.per: examples kept per skill. */
function hintExamples(o = {}) {
  const per = o.per || 1, seeds = o.seeds || 200;
  return app()(`(()=>{const out={},stops=${JSON.stringify(hintStops())};
    for(const k in stops){const st=stops[k];if(skLvEmpty(st.sk,st.lv))continue;
      for(let i=0;i<${seeds};i++){let q;try{q=genQ(st.sk,st.lv,1000+i)}catch(e){continue}
        if(twoWay(q))continue;
        const P=hmProb(q);if(!P)continue;
        for(const p of hmPredict(q)){const m=hmMatch(q,p.v);if(!m||m.c!==p.c)continue;
          const c=out[p.c]=out[p.c]||{code:p.c,d:HM[p.c].d,s:HM[p.c].s,g:[],ex:{}};
          for(const g of st.g)if(!c.g.includes(g))c.g.push(g);
          const e=c.ex[st.sk]=c.ex[st.sk]||[];
          if(e.length<${per}&&!e.some(x=>x.lv==st.lv&&x.label==q.label))e.push({sk:st.sk,lv:st.lv,area:st.area,t:st.t,stop:st.stop,g:Math.min(...st.g),label:q.label,
            say:String(q.say||'').replace(/\\s+/g,' ').trim(),ans:String(q.ans),v:p.v,slots:m.s,kind:q.kind})}}}
    return out})()`);
}
const hintAges = g => [...new Set(g.map(x => ageOf(x)))];
// one hint line: its problems ([] when fine), for the ages of the pets whose children see it and the slots its code fills
function checkHint(code, t, ages) {
  const R = app(), out = [], s = String(t == null ? '' : t), slots = R(`HM[${JSON.stringify(code)}]?HM[${JSON.stringify(code)}].s.concat(['v']):null`);
  if (!slots) return ['no such mistake code (HM in src/js/39m-mist.js)'];
  if (!s.trim()) return ['an empty line'];
  const bare = s.replace(/\{[^}]*\}/g, 'X');
  if (BANNED.test(s)) out.push(`a theme the parent ruled out: "${s.match(BANNED)[0]}"`);
  if (/\d/.test(bare)) out.push('a number written into the words (numbers come from code: use a {slot})');
  if (NUMWORDS.test(bare)) out.push(`a number word "${bare.match(NUMWORDS)[0]}" (use a {slot})`);
  for (const m of s.matchAll(/\{([^}]*)\}/g)) if (!slots.includes(m[1])) out.push(`{${m[1]}} is not a slot of ${code} (it has ${slots.map(x => '{' + x + '}').join(' ')})`);
  if (/[{}]/.test(s.replace(/\{[a-z]+\}/g, ''))) out.push('a broken {slot}');
  if (R.ctx.ksBad(bare.replace(/X/g, ' '), true)) out.push('a word that is not kid-safe (ksBad)');
  if (/\b(wrong|bad|silly|oops|no!)\b/i.test(bare)) out.push('a word that tells the child off (wrong, bad, silly): say what to look at instead');
  for (const a of ages) for (const p of R.ctx.lsToneBad(bare, a)) out.push(p);
  return out;
}
function hintDrafts() {
  if (!fs.existsSync(HINTS)) return [];
  return fs.readdirSync(HINTS).filter(f => /^[A-Za-z0-9]+\.md$/.test(f)).sort().map(f => {
    const file = path.join(HINTS, f);
    try { const d = parseDraft(fs.readFileSync(file, 'utf8')); return {file, d}; } catch (e) { return {file, d: null, problems: ['cannot read: ' + e.message]}; }
  });
}
// every hint draft with its problems (the ages come from where its code shows)
function checkHints(ex = hintExamples()) {
  const codes = app()('Object.keys(HM)');
  return hintDrafts().map(x => {
    if (!x.d) return x;
    const c = x.d.code, e = ex[c], p = [];
    if (c + '.md' !== path.basename(x.file)) p.push(`the code ${c} does not match the file name`);
    if (!codes.includes(c)) p.push(`${c} is not a mistake code of src/js/39m-mist.js`);
    if (!e) p.push(`${c} never shows in Practice (no question where its mistake can be made)`);
    for (const y of checkHint(c, x.d.line, hintAges(e ? e.g : [0]))) p.push(y);
    return Object.assign(x, {problems: p});
  });
}
// the line as the child sees it, with this example's numbers and words
const hintSee = (line, ex) => app().ctx.hmFill(line, ex.slots);
function hintFile(code, line, api, e, problems, notes) {
  const exs = Object.values(e.ex).flat().slice(0, 4);
  return `# Hint: ${code}\n\nstatus: unreviewed\nmade: ${new Date().toISOString().slice(0, 10)} by tools/author.js --hints-draft (xAI API)\n\n`
    + '<!-- For the owner: read the examples below, change the line in the JSON if you like, then replace "unreviewed" above with\n'
    + '     "reviewed <your name> <date>" (or run: node tools/author.js --hints-approve <code> --by <your name>). Until then this\n'
    + '     mistake shows the generic hint: tools/build.py copies reviewed lines only (src/js/39n-hintw.js). -->\n\n'
    + `## What the child did\n\n${e.d}. Grades: ${e.g.slice().sort((a, b) => a - b).map(g => (g < 0 ? 'Pre-K' : g == 0 ? 'K' : g)).join(', ')}.\n\n`
    + '## As the child sees it\n\n' + exs.map(x => `- ${x.t} (${x.sk}${x.lv}): "${x.say}" answered ${x.v}: "${hintSee(line, x)}"`).join('\n') + '\n\n'
    + '## Checks\n\n' + (problems.length ? problems.map(x => '- ' + x).join('\n') : '- All checks pass (slots, numbers, themes, kid-safe, the pet\'s tone for every grade it shows in).') + '\n\n'
    + '## Words\n\n```json\n' + JSON.stringify({code, line, api, notes: notes || ''}, null, 1) + '\n```\n';
}
// ask the API for the lines of these codes (one request for up to 14 codes), check them, write the drafts
function hintDraft(codes, o = {}) {
  const ex = hintExamples(), R = app(), slotsTxt = R('JSON.stringify(HM_SLOTS)');
  codes = (codes.length ? codes : R('Object.keys(HM)').filter(c => !fs.existsSync(path.join(HINTS, c + '.md')))).filter(c => ex[c]);
  const out = [];
  for (let i = 0; i < codes.length; i += 14) {
    const part = codes.slice(i, i + 14), spec = part.map(c => {
      const e = ex[c], x = Object.values(e.ex).flat().slice(0, 2), ages = hintAges(e.g);
      return `- ${c}: the child ${e.d}. Shown to the ${ages.join(' and ')} pet's children (${ages.map(a => R(`LS_RULES.${a}.words`) + ' words at most').join(', ')}). `
        + `Slots: ${e.s.concat(['v']).map(k => '{' + k + '}').join(' ')}. Examples: ` + x.map(y => `"${y.say}" answered ${y.v} (slots ${JSON.stringify(y.slots)})`).join('; ');
    }).join('\n');
    const sys = 'You write the short hints a children\'s learning app (Pre-K to 6th grade) shows after a child makes a known mistake in a practice question. '
      + 'You write only words; the app fills every number and word of the question into {slots}. Reply with one JSON object and nothing else.';
    const user = `For each mistake code below, write ONE hint line the child sees (and young children hear) right after making that mistake. The child then tries again.
Rules for every line:
- Say what to look at or do next, kindly, as the child's pet friend would. One idea. Never say "wrong", "oops", "silly" or "no".
- NEVER give the right answer, and never a slot that holds it. You may name the child's own answer {v} (or {o}).
- NEVER write a digit or a number word (two, five, twenty, sixty ...). Use only the slots listed for that code; "one", "ten", "hundred" are fine as words for places and pieces ("carry the ten", "the ones").
- Short: within the word limit given for the code; plain words a young child understands.
- For the older kid pet (grades 3-4) and the teen-like pet (5-6): no baby words (yay, hooray, super, awesome), no double exclamation marks.
- No magic, spells, wizards, fairies, unicorns or evolution.
Slot meanings: ${slotsTxt}
The codes:
${spec}
Reply as {"<code>": "<line>", ...} for exactly these codes: ${part.join(', ')}.`;
    if (o.dry) { out.push({prompt: [sys, user]}); continue; }
    const m = model(), res = api('POST', API + '/chat/completions', {model: m, messages: [{role: 'system', content: sys}, {role: 'user', content: user}], temperature: 0.6});
    const txt = String(res.choices[0].message.content || '');
    const j = JSON.parse(txt.slice(txt.indexOf('{'), txt.lastIndexOf('}') + 1));
    fs.mkdirSync(HINTS, {recursive: true});
    for (const c of part) {
      const line = String(j[c] || '').trim(), probs = checkHint(c, line, hintAges(ex[c].g));
      fs.writeFileSync(path.join(HINTS, c + '.md'), hintFile(c, line, line, ex[c], probs));
      out.push({code: c, line, problems: probs});
    }
  }
  return out;
}
// after reading a drafted line: write the line as fixed, keep the API's first draft (api) and say what changed (notes); still unreviewed
function hintSet(code, line, notes, ex = hintExamples()) {
  const f = path.join(HINTS, code + '.md'), old = fs.existsSync(f) ? parseDraft(fs.readFileSync(f, 'utf8')) : {};
  if (!ex[code]) throw new Error(code + ' never shows in Practice');
  const probs = checkHint(code, line, hintAges(ex[code].g));
  fs.mkdirSync(HINTS, {recursive: true});
  fs.writeFileSync(f, hintFile(code, line, old.api || old.line || '', ex[code], probs, notes).replace('by tools/author.js --hints-draft (xAI API)',
    'by tools/author.js --hints-draft (xAI API); read and fixed by hand' + (old.status && old.status !== 'unreviewed' ? '' : '')));
  return probs;
}
// the owner's step for hints: mark them reviewed (only those that pass), then write src/js/39n-hintw.js
function hintApprove(ids, o = {}) {
  const by = String(o.by || 'owner').replace(/\s+/g, ' ').trim(), date = o.date || new Date().toISOString().slice(0, 10), done = [], bad = [];
  if (!/^\d{4}-\d\d-\d\d$/.test(date)) throw new Error('--date must be YYYY-MM-DD');
  for (const x of checkHints()) {
    if (!x.d || !(ids.includes('all') ? x.d.status === 'unreviewed' : ids.includes(x.d.code))) continue;
    if (x.problems.length) { bad.push(`${x.d.code}: ${x.problems.length} problems (fix them first: node tools/author.js --check)`); continue; }
    const t = fs.readFileSync(x.file, 'utf8');
    fs.writeFileSync(x.file, t.replace(/^status:.*$/m, `status: reviewed ${by} ${date}${o.note ? ' (' + o.note + ')' : ''}`));
    done.push(x.d.code);
  }
  for (const id of ids) if (id !== 'all' && !done.includes(id) && !bad.some(b => b.startsWith(id + ':'))) bad.push(`${id}: no such hint draft`);
  if (done.length) cp.execFileSync('python3', [path.join(ROOT, 'tools', 'build.py'), '--words-only'], {stdio: 'pipe'});
  return {done, bad};
}
// the read-through: by subject, then skill (in map order), each code that shows there with one example as the child sees it
function hintRead() {
  const ex = hintExamples(), drafts = Object.fromEntries(hintDrafts().filter(x => x.d).map(x => [x.d.code, x.d]));
  const order = app()(`(()=>{const o=[];for(const p of ['math','read','es'])for(const n of NODES[p])if(SK[n.sk]&&!o.includes(n.sk))o.push(n.sk);for(const k in SK)if(!o.includes(k))o.push(k);return o})()`);
  const rows = {};
  for (const c in ex) for (const sk in ex[c].ex) for (const x of ex[c].ex[sk]) (rows[sk] = rows[sk] || []).push(Object.assign({code: c}, x));
  const st = Object.values(drafts).reduce((a, d) => (a[d.status] = (a[d.status] || 0) + 1, a), {});
  const L = ['# Hint read-through: a hint for each common mistake in Practice (HINT-01)', '',
    `${Object.keys(drafts).length} hints (${Object.entries(st).map(([k, v]) => v + ' ' + k).join(', ')}), one per mistake.`,
    'When a child\'s wrong answer is the answer that mistake gives, the round shows its hint', 'where it shows "Try again" and the generic hint today. The app fills each {slot}',
    'from the question (its numbers, the child\'s own answer, a word or letter), so the numbers are always right.', '',
    'Below, by subject and skill: an example question (as the app says it), the wrong answer,', 'and the hint as the child sees it. A hint shows in every skill listed with its code.', '',
    'Until you approve a hint, its mistake shows the generic hint, as before.', 'To change a hint: edit "line" in docs/drafts/hints/<code>.md. When you are happy, say so, or run:', '',
    '`node tools/author.js --hints-approve <code ...|all> --by <your name>`', '',
    'Hints show only after the first wrong try, never on a two-choice question (one try there),', 'never in a check-in, and not when Grown-ups has lessons off.', ''];
  for (const subj of ['math', 'read', 'es']) {
    const sks = order.filter(sk => rows[sk] && rows[sk][0].area === subj);
    if (!sks.length) continue;
    L.push(`## ${SUBJ[subj]}`, '');
    for (const sk of sks) {
      L.push(`### ${rows[sk][0].t} (${sk})`, '');
      for (const x of rows[sk]) {
        const d = drafts[x.code], line = d ? d.line : null;
        const say = x.say.length > 140 ? x.say.slice(0, x.say.lastIndexOf(' ', 136)) + ' ...' : x.say;
        L.push(`- **${x.code}** (level ${x.lv}): "${say}" Answer given: ${x.v}`,
          `  Hint: ${line ? '"' + hintSee(line, x) + '"' : '(no draft yet)'}${d && d.status !== 'reviewed' ? '' : d ? ' (reviewed)' : ''}`);
      }
      L.push('');
    }
  }
  L.push('## The lines with their slots', '', 'Each line as written, with the {slots} the app fills, and what the child did.', '');
  for (const c of Object.keys(ex)) { const d = drafts[c]; L.push(`- **${c}** (${ex[c].d}): ${d ? '"' + d.line + '"' : '(no draft yet)'}`); }
  const none = app()(`Object.keys(SK).filter(k=>!${JSON.stringify(Object.keys(rows))}.includes(k)&&SK[k].area!='disc')`);
  L.push('', '## Skills with no coded mistake', '', 'These skills keep the generic hint: their wrong answers do not come from a mistake the app can work out',
    '(stories and facts to recall, word meanings, shapes by name, tracing, sorting by eye, pictures to match).', '',
    none.join(', ').replace(/(.{1,110})(, |$)/g, '$1$2\n').replace(/ \n/g, '\n').trim(), '',
    'Discover (science, maps, citizens) has none either: its questions are facts to recall.', '');
  return L.join('\n');
}

module.exports = {hintSet, hintExamples, checkHint, checkHints, hintDrafts, hintDraft, hintApprove, hintRead, approve, readThrough, contract, BEATS, BANNED, SLOTS, LS_SECS, checkLine, checkDraft, checkScripts, lessonSecs, parseDraft, draftStatus, sheet, draftFile, drafts, draftPrompt, ageOf};

if (require.main === module) {
  const a = process.argv.slice(2), has = f => a.includes(f), val = f => (a.indexOf(f) >= 0 ? a[a.indexOf(f) + 1] : null);
  if (has('--hints-draft')) {
    const ids = a.filter((x, i) => !x.startsWith('--'));
    const r = hintDraft(ids, {dry: has('--dry')});
    for (const x of r) console.log(x.prompt ? x.prompt.join('\n\n') : `${x.code}: ${x.problems.length ? x.problems.length + ' problems: ' + x.problems.join('; ') : 'ok'}  "${x.line}"`);
  } else if (has('--hints-approve')) {
    const ids = a.slice(a.indexOf('--hints-approve') + 1).filter((x, i, all) => !x.startsWith('--') && !['--by', '--date', '--note'].includes(all[i - 1]));
    const r = hintApprove(ids, {by: val('--by'), date: val('--date'), note: val('--note')});
    console.log((r.done.length ? 'reviewed: ' + r.done.join(', ') + '\nwrote src/js/39n-hintw.js: these hints show at the next build (python3 tools/build.py)' : 'nothing marked reviewed')
      + (r.bad.length ? '\nnot marked:\n  ' + r.bad.join('\n  ') : ''));
    process.exitCode = r.bad.length ? 1 : 0;
  } else if (has('--hints-read')) {
    fs.writeFileSync(path.resolve(val('--hints-read')), hintRead());
    console.log('wrote ' + val('--hints-read'));
  } else if (has('--approve')) {
    const ids = a.slice(a.indexOf('--approve') + 1).filter((x, i, all) => !x.startsWith('--') && !['--by', '--date', '--note'].includes(all[i - 1]));
    const r = approve(ids, {by: val('--by'), date: val('--date'), note: val('--note')});
    console.log((r.done.length ? 'reviewed: ' + r.done.join(', ') + '\nwrote src/js/52e-words.js: these lessons go live at the next build (python3 tools/build.py)' : 'nothing marked reviewed')
      + (r.bad.length ? '\nnot marked:\n  ' + r.bad.join('\n  ') : ''));
    process.exitCode = r.bad.length ? 1 : 0;
  } else if (has('--read')) {
    const f = val('--read'), ids = a.filter((x, i) => !x.startsWith('--') && a[i - 1] !== '--read' && a[i - 1] !== '--batch');
    fs.writeFileSync(path.resolve(f), readThrough(ids, {batch: +val('--batch') || 2}));
    console.log('wrote ' + f);
  } else if (has('--draft')) {
    const r = draft(val('--draft'), {grade: val('--grade'), dry: has('--dry')});
    if (r.prompt) console.log(JSON.stringify(r.prompt.messages, null, 1));
    else console.log(`${path.relative(ROOT, r.file)}: status unreviewed, ${r.problems.length ? r.problems.length + ' problems:\n  ' + r.problems.join('\n  ') : 'all checks pass'}`);
  } else if (has('--sheet')) {
    const ids = a.filter(x => !x.startsWith('--'));
    for (const x of drafts()) if (x.d && (!ids.length || ids.includes(x.d.id))) console.log(sheet(x.d) + `\n(${x.d.status}: ${path.relative(ROOT, x.file)})\n\n` + '-'.repeat(60));
    for (const s of checkScripts()) if (!ids.length || ids.includes(s.id)) console.log(`${s.t} (${s.id}), grade ${s.g}, the ${s.age} pet (hand-written)\nLines it can say:\n` + s.lines.map(t => '  - ' + t).join('\n') + `\nTonight's question: ${s.home}\n\n` + '-'.repeat(60));
  } else {
    let bad = 0;
    for (const s of checkScripts()) { if (s.problems.length) { bad++; console.log('FAIL  ' + s.id + '\n  ' + s.problems.join('\n  ')); } }
    for (const x of drafts()) {
      const rel = path.relative(ROOT, x.file);
      if (x.problems.length) { bad++; console.log('FAIL  ' + rel + '\n  ' + x.problems.slice(0, 20).join('\n  ')); }
      else console.log(`ok    ${rel} (${x.d.status})`);
    }
    for (const x of checkHints()) {
      const rel = path.relative(ROOT, x.file);
      if (x.problems && x.problems.length) { bad++; console.log('FAIL  ' + rel + '\n  ' + x.problems.slice(0, 20).join('\n  ')); }
      else console.log(`ok    ${rel} (${x.d.status})`);
    }
    console.log(bad ? bad + ' with problems' : 'all scripts and drafts pass');
    process.exitCode = bad ? 1 : 0;
  }
}
