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
   node tools/author.js --read <file> [stop ...]
                                           TEACH-2b: one read-through file of the unreviewed drafts (or the stops named), in map order

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
const SLOTS = ['name', 'pet', 'a', 'b', 'n', 'k', 't', 'sum', 'diff', 'ans', 'top', 'bottom', 'tens', 'ones', 'hour', 'min', 'coin', 'value', 'x', 'y', 'time'];

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
  return app()(`(()=>{const D=typeof LS_DRAFTED!='undefined'&&LS_DRAFTED[${JSON.stringify(String(id))}];return D?{t:D.t,slots:D.slots,bugs:D.bugs,brief:D.brief}:null})()`);
}
// the hand-written scripts (code: each line comes from a function with numbers filled in): every line they can say, checked
// for the age of the stop's grade; and a script that names a draft must name a reviewed one
function checkScripts() {
  const R = app();
  return R(`(()=>{const o=[];for(const id of LS_IDS){const L=LESSONS[id],i=NODES.math.findIndex(n=>nid(n)===id),g=i<0?0:PATHS.math.worlds[NODES.math[i].wi].g,age=lsAge(g),lines=[L.idea];
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
  const R = app(), stop = R(`(()=>{const n=NODES.math.find(x=>nid(x)===${JSON.stringify(id)});if(!n)return null;const w=PATHS.math.worlds[n.wi];
    return{t:n.t,sk:n.sk,lv:n.lv,world:w.n,g:w.g,skill:(SK[n.sk]||{}).n||''}})()`);
  if (!stop) throw new Error('no math stop ' + id);
  const g = grade != null ? +grade : stop.g, age = ageOf(g), rules = R(`(()=>{const r=LS_RULES[${JSON.stringify(age)}];return{words:r.words,chars:r.chars,no:r.no?String(r.no):''}})()`);
  const tone = R(`JSON.stringify(LS_TONE[${JSON.stringify(age)}],(k,v)=>typeof v=='function'?v(k=='nb'?'{n}':'{name}'):v)`), codes = R('Object.keys(BUGS).map(c=>c+": "+BUGS[c].d).join("\\n")');
  const example = fs.readFileSync(path.join(DRAFTS, 'EXAMPLE.json'), 'utf8'), C = contract(id);
  const code = C ? `\nThis lesson's code is written already. What each beat's words are for, and which numbers it has:\n${C.brief}
Slots each beat may use (no others; a slot is never the answer the child has to find): ${BEATS.map(b => b + ': ' + (Array.isArray((C.slots[b] || [])[0]) ? C.slots[b].map((x, i) => 'line ' + (i + 1) + ' ' + (x.map(y => '{' + y + '}').join(' ') || 'none')).join(', ') : (C.slots[b] || []).map(x => '{' + x + '}').join(' ') || 'none')).join('; ')}. {name} (the child) may be used anywhere.
Explore lines are only the task, said before the child starts (no lines about what they made: the app reacts itself).
After each Together and Show line the app says the problem itself, with its numbers, so a line coaches or sets the scene and never repeats the problem.
check: exactly two lines: "My turn. Check me!" and the pet's claim, which must use {ans}: the pet's whole answer as the app says it (a number, a time such as "half past 4" or "4 15", or "35 cents"), e.g. "I think it is {ans}. Am I right?".
together: exactly three lines: line 1 is said before a build item, line 2 before a picture item, line 3 before a symbols-only item (the app says "Now let's do some together." itself, and a miss can bring a build back, so each line fits its kind of item on its own). The idea has no slots and no numbers. Never a number word: "eighteen", "nine", "hundreds of" are all written as slots or left out.
reasons: only for these codes (the mistakes this lesson's pet makes): ${C.bugs.join(', ')}.\n` : '';
  const sys = 'You write the spoken words of short lessons in a children\'s learning app for Pre-K to 6th grade. The child\'s pet runs each lesson. '
    + 'You write only words; the app\'s code fills every number. Reply with one JSON object and nothing else.';
  const user = `Write the words of one lesson.
Stop: "${stop.t}" (id ${id}) in the world "${stop.world}", grade ${g === -1 ? 'Pre-K' : g === 0 ? 'Kindergarten' : g}.
The pet's age for this grade: ${age}. How that pet talks (its fixed lines): ${tone}
Rules for every line:
- At most ${rules.words} words and ${rules.chars} characters.${rules.no ? ' Never use: ' + rules.no : ''}
- NEVER write a digit or a number word (two, three, ... twenty, thirty, ...). Every number is a slot the code fills: ${SLOTS.map(s => '{' + s + '}').join(' ')}. "one", "ten" and "hundred" are allowed only as words for places and pieces ("the ones", "a ten").
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
function readThrough(ids) {
  const R = app(), at = id => R(`NODES.math.findIndex(n=>nid(n)===${JSON.stringify(id)})`);
  const xs = drafts().filter(x => x.d && (ids.length ? ids.includes(x.d.id) : x.d.status === 'unreviewed')).sort((a, b) => at(a.d.id) - at(b.d.id));
  const head = ['# Batch 2 read-through: grade 1 and 2 math lessons', '',
    `${xs.length} lessons, in map order. Each is what the child hears:`, 'the six beats, the pet\'s reasons when it is caught, and tonight\'s question for you.', '',
    'The app fills in each {slot} from the problem on screen, so numbers are always right.',
    'The app also says each problem itself, after the Together and Show lines.', '',
    'To change a word: edit the JSON in that lesson\'s file in docs/drafts/.', 'When you are happy, say so, or run:', '',
    '`node tools/author.js --approve all --by <your name>`', '', '(or name the lessons instead of all). Approved lessons go live at the next build.', ''];
  return head.concat(xs.map((x, i) => `## ${i + 1}. ${x.d.t} (${x.d.id})\n\n\`\`\`text\n${sheet(x.d).split('\n').slice(1).join('\n')}\n\`\`\`\n`)).join('\n');
}

module.exports = {approve, readThrough, contract, BEATS, BANNED, SLOTS, LS_SECS, checkLine, checkDraft, checkScripts, lessonSecs, parseDraft, draftStatus, sheet, draftFile, drafts, draftPrompt, ageOf};

if (require.main === module) {
  const a = process.argv.slice(2), has = f => a.includes(f), val = f => (a.indexOf(f) >= 0 ? a[a.indexOf(f) + 1] : null);
  if (has('--approve')) {
    const ids = a.slice(a.indexOf('--approve') + 1).filter((x, i, all) => !x.startsWith('--') && !['--by', '--date', '--note'].includes(all[i - 1]));
    const r = approve(ids, {by: val('--by'), date: val('--date'), note: val('--note')});
    console.log((r.done.length ? 'reviewed: ' + r.done.join(', ') + '\nwrote src/js/52e-words.js: these lessons go live at the next build (python3 tools/build.py)' : 'nothing marked reviewed')
      + (r.bad.length ? '\nnot marked:\n  ' + r.bad.join('\n  ') : ''));
    process.exitCode = r.bad.length ? 1 : 0;
  } else if (has('--read')) {
    const f = val('--read'), ids = a.filter((x, i) => !x.startsWith('--') && a[i - 1] !== '--read');
    fs.writeFileSync(path.resolve(f), readThrough(ids));
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
    console.log(bad ? bad + ' with problems' : 'all scripts and drafts pass');
    process.exitCode = bad ? 1 : 0;
  }
}
