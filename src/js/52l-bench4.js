/* ---------- TEACH-4: reading for K to 2, and the Pre-K lessons of Tiny Town and ABC Beach (part teachrd; TEACH-PLAN-2 batch 4) ----------
   The workbench pieces, codes and Check me of these lessons (the lessons: 52m-lessons4.js; reviewed words: 52k-words4.js). Every line is
   said, captions are short, pictures are the app's drawings (ART), named aloud. The phonics lesson shape (K to 2nd grade):
     Explore   a sound sort: four drawn pictures, two bins (two letters or letter patterns)
     Name it   the letter big on the card, with the pictures sorted under it
     Together  build the word from letter tiles, then a picture to its written word (three real words differing by the lesson's
               sound), then a written word to its picture (read, nothing said)
     Check me  the pet reads "cat" as "cap" (its letters in the word's boxes); the child marks it, then builds it right
     Show      a decodable sentence matched to one of four pictures (Build lessons: build the word, two extra tiles)
   The pet's readings are real words of the checked contrast sets (PWC), named by what changed: the misconception codes.
   Until the owner approves a draft, a lesson speaks its hand-written fallback, as TEACH-3 does. */

// the subjects with lessons: reading joins math (owner decision 1: the child picks the subject, the planner plans inside it)
if (!LS_SUBJ.includes('read')) LS_SUBJ.push('read');

/* ---- the misconception codes of reading and Pre-K (52b-know.js: d what the idea is, say the pet's repair line, 12 words or fewer) ---- */
Object.assign(BUGS, {
  first: {d: 'hears or reads the first sound wrong (sun as bun)', say: 'Listen to the very first sound.'},
  last: {d: 'hears or reads the last sound wrong (cat as cap)', say: 'Say it slowly. Listen to the very end.'},
  mid: {d: 'reads the middle vowel wrong (cat as cut)', say: 'Look at the letter in the middle.'},
  blend: {d: 'leaves out one letter of a blend (frog as fog)', say: 'Say every letter at the start. Both of them.'},
  dig: {d: 'reads two letters that make one sound as one letter (ship as sip)', say: 'These two letters make one sound together.'},
  silent: {d: 'leaves off the silent e at the end (kite as kit)', say: 'The e at the end changes the vowel sound.'},
  team: {d: 'reads a vowel team as one short vowel (boat as bat)', say: 'Two vowels side by side make one sound.'},
  look: {d: 'picks a letter, number or shape that looks alike (b for d, 6 for 9)', say: 'Look closely. Which way does it face?'},
  fewer: {d: 'picks the group with fewer as the one with more', say: 'Match them up. More has some left over.'},
  alike: {d: 'picks one that is the same as the others', say: 'Find the one that does not match the rest.'},
  rep: {d: 'says the last thing again instead of what comes next', say: 'Say the pattern out loud. What comes next?'},
  clap: {d: 'claps one beat too many or too few', say: 'Clap once for each part you say.'},
  abc: {d: 'picks the letter before instead of the letter after', say: 'Sing the ABC song. Which letter comes after?'},
  size: {d: 'picks the small one when asked for the big one (or the other way)', say: 'Look how tall each one is.'},
});
Object.assign(LSREP.NOTE, {
  first: 'sometimes hears the first sound of a word wrong',
  last: 'sometimes misses the last sound of a word (cat read as cap)',
  mid: 'sometimes reads the middle vowel wrong (cat read as cut)',
  blend: 'sometimes leaves out one letter of a blend (frog read as fog)',
  dig: 'sometimes reads two letters that go together, like sh, as one letter',
  silent: 'sometimes leaves off the silent e (kite read as kit)',
  team: 'sometimes reads two vowels side by side as one short vowel (boat read as bat)',
  look: 'sometimes picks a letter or number that looks alike (b for d, 6 for 9)',
  fewer: 'sometimes picks the group with fewer as the one with more',
  alike: 'sometimes picks one that matches the others when looking for the odd one out',
  rep: 'sometimes repeats the last item of a pattern instead of what comes next',
  clap: 'sometimes claps one beat too many or too few in a word',
  abc: 'sometimes picks the letter before when asked for the letter after',
  size: 'sometimes mixes up the bigger and the smaller one',
});

/* ---- small helpers: the lesson's own random numbers (r), drawn pictures with their names ---- */
const ls4Pick = (r, a) => a[Math.floor(r() * a.length)];
function ls4Shuf(r, a) {
  const o = a.slice();
  for (let i = o.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; }
  return o;
}
// a question of a batch 4 lesson: spoken and big for Pre-K to 1st (pk), its slots (sl) for the words
const ls4Q = (D, st, o) => lsQ(D.sk, D.lv, st, Object.assign({pk: true, sl: {}}, o));
// a drawn picture with its name for screen readers (the drawing itself is aria-hidden)
const ls4Pic = (w, cls) => `<span class="ls4-pic${cls ? ' ' + cls : ''}">${picFor(w)}<span class="a11y-h">${esc(w)}</span></span>`;
const ls4Big = t => `<div class="ls4-big" aria-hidden="true">${esc(t)}</div>`;
// the words a picture choice names aloud: "sun, cup or hat"
const ls4Or = ws => (ws.length > 1 ? ws.slice(0, -1).join(', ') + ' or ' + ws[ws.length - 1] : ws.join(''));
// the pictures of a sort, named before its task ("Sun, sock, moon and map."): a line of its own, so the task stays short
const ls4Names = its => { const ws = its.map(x => x.say || x.v); return k2Cap(ws.slice(0, -1).join(', ') + ' and ' + ws[ws.length - 1]) + '.'; };
// a choice of pictures (v: the word), in the order given
const ls4PicCh = ws => ws.map(w => ({v: w, l: ls4Pic(w), h: true}));
const ls4TxtCh = ws => ws.map(w => ({v: String(w), l: String(w)}));
// a sort: bins [{v, l, h, al}], items [{v, l, h, b, say, al}] in the order shown
function ls4Sort(D, st, bins, items, o) {
  return ls4Q(D, st, Object.assign({kind: 'sort', bins, items, ans: items.map(c => String(c.b)).join('|'), auto: true}, o));
}
const ls4Chip = (w, b) => ({v: w, l: picFor(w), h: true, b, say: w, al: w});
// a word's letters as the boxes of a build (ids ls0.. for the child; none for the pet's work, so ids never repeat)
const ls4Slots = (n, fill, cls) => `<div class="lslots${cls ? ' ' + cls : ''}">${Array.from({length: n}, (_, i) => (fill
  ? `<span class="ls ls4-f">${esc(fill[i] || '')}</span>` : `<span class="ls" id="ls${i}"></span>`)).join('')}</div>`;
// a letter box inside a word: "_un" with box 0 for the first sound, "su_" for the last, "c_t" for the middle (pos: the letters' place)
const ls4Gap = (w, at, len, fill) => `<div class="lslots ls4-gap">${[...w].map((c, i) => (i < at || i >= at + len ? `<span class="ls4-l">${esc(c)}</span>`
  : fill != null ? `<span class="ls ls4-f">${esc(fill[i - at] || '')}</span>` : `<span class="ls" id="ls${i - at}"></span>`)).join('')}</div>`;

/* ---- the words of the phonics lessons: drawn pictures only (ART), each a word a child would say for its picture ---- */
const LS4W = {
  cvc: ['cat', 'dog', 'pig', 'sun', 'bus', 'hat', 'bed', 'cup', 'fox', 'bat', 'bug', 'hen', 'box', 'map', 'pen', 'web', 'tub', 'cap'],
  blend: ['frog', 'crab', 'drum', 'flag', 'star', 'clock', 'truck', 'dress', 'milk', 'tent', 'hand', 'gift'],
  dig: ['ship', 'shell', 'sheep', 'chick', 'cheese', 'chair', 'fish', 'dish', 'duck', 'sock', 'tooth', 'mouth'],
  silent: ['cake', 'kite', 'bike', 'rose', 'bone', 'nose', 'plane', 'dice'],
  team: ['boat', 'coat', 'road', 'soap', 'tree', 'bee', 'sheep', 'cheese', 'leaf', 'beach', 'train', 'moon', 'spoon', 'book'],
};
// the pet's wrong readings: the checked contrast set of a word (PWC), plus a few more for the drawn words it lacks
const LS4_CON = {cap: ['cat', 'cup', 'map', 'tap'], chair: ['hair', 'chain'], dish: ['fish', 'wish', 'dash']};
// never a word of a theme the parent ruled out (CONTENT-01): "spell" is in the contrast set of shell
const LS4_NOT = /^spells?$/;
const ls4Con = w => ((typeof PWC != 'undefined' && PWC[w]) || LS4_CON[w] || []).filter(x => x !== w && !BAD.test(x) && !ksBad(x, true) && !LS4_NOT.test(x));
const LS4_V = 'aeiou';
/* what changed from word w to the pet's reading x: a misconception code, or null. first, last and mid: one letter swapped at the start, the
   end or a middle vowel; blend: one letter of a start or end blend left out; dig: sh, ch, th or ck read as one of its letters; silent: the
   final e left off; team: a vowel team read as one of its vowels */
function ls4Code(w, x) {
  if (!w || !x || w === x) return null;
  if (/^(sh|ch|th)/.test(w) && x === w[0] + w.slice(2)) return 'dig';
  if (/^(sh|ch|th)/.test(w) && x.length == w.length - 1 && x.slice(1) === w.slice(2)) return 'dig';
  if (/e$/.test(w) && x === w.slice(0, -1)) return 'silent';
  const tm = /[aeiou]{2}/.exec(w);
  if (tm && (x === w.slice(0, tm.index) + w[tm.index] + w.slice(tm.index + 2) || x === w.slice(0, tm.index) + w[tm.index + 1] + w.slice(tm.index + 2))) return 'team';
  if (x.length == w.length - 1) {
    for (let i = 0; i < w.length; i++) if (w.slice(0, i) + w.slice(i + 1) === x) {
      const c = w[i], pre = w[i - 1], nx = w[i + 1];
      if (!LS4_V.includes(c) && (i < 2 && !LS4_V.includes(i ? pre : nx) || i >= w.length - 2 && !LS4_V.includes(i == w.length - 1 ? pre : nx))) return 'blend';
    }
    return null;
  }
  if (x.length != w.length) return null;
  const d = [...w].map((c, i) => (c !== x[i] ? i : -1)).filter(i => i >= 0);
  if (d.length != 1) return null;
  const i = d[0];
  if (i == 0) return 'first';
  if (i == w.length - 1) return 'last';
  return LS4_V.includes(w[i]) && LS4_V.includes(x[i]) ? 'mid' : null;
}
// the pet's readings of w with code c (real, kid-safe words)
const ls4Wrong = (w, c) => ls4Con(w).filter(x => ls4Code(w, x) === c);
// a word's key for a sort or a sound question: its first letter, last letter, middle vowel, or its pattern (blend, team, silent e)
const LS4_KEY = {
  first: w => w[0],
  last: w => w[w.length - 1],
  mid: w => (w.length == 3 ? w[1] : null),
  blend: w => (/^(fr|cr|dr|fl|st|cl|tr|pl)/.exec(w) || [])[0] || null,
  dig: w => (/^(sh|ch|th)/.exec(w) || [])[0] || null,
  silent: w => (/^[^aeiou]+([aeiou])[^aeiou]e$/.exec(w) || [])[1] ? (/^[^aeiou]+([aeiou])[^aeiou]e$/.exec(w)[1] + '_e') : null,
  team: w => (/(oa|ee|ea|ai|oo)/.exec(w) || [])[1] || null,
};
// v182 (review): keys of a sort that make the same sound, so a sort of pictures (heard, not read) could not tell them apart: never
// drawn as the two sides of one sort. Per key, so no other lesson's draw changes (ou in house and ow in cow: Vowel Teams 2, 52p).
const LS4_SAME = {team2: [['ou', 'ow']]};
const ls4Same = (key, a, b) => (LS4_SAME[key] || []).some(s => s.includes(a) && s.includes(b));
// two keys of a pool with at least two drawn pictures each, and two pictures of each (a sort of four)
function ls4Pairs(pool, key, r, want) {
  const by = {};
  for (const w of pool) { const k = LS4_KEY[key](w); if (k && ART[w]) (by[k] = by[k] || []).push(w); }
  const ks = Object.keys(by).filter(k => by[k].length >= 2), a = want && ks.includes(want) ? want : ls4Pick(r, ks);
  const b = ls4Pick(r, ks.filter(k => k !== a && !ls4Same(key, a, k)));
  return {a, b, wa: ls4Shuf(r, by[a]).slice(0, 2), wb: ls4Shuf(r, by[b]).slice(0, 2)};
}

/* ---- the drafted lessons of batch 4: code here and in 52m, words in docs/drafts (LSW4 once reviewed), else the fallback ---- */
const LS_B4 = [];
function lsDraft4(id, D) {
  D.id = id;
  if (D.first) D.warm = null; // the first stop of a world: nothing to remember yet (no Remember beat until a lesson is due)
  D.band = '4';
  LS_DRAFTED[id] = D;
  if (!LS_B4.includes(id)) LS_B4.push(id);
  return lsEnable4(id, typeof LSW4 != 'undefined' && LSW4[id] ? LSW4[id] : null);
}
// the hand-written fallback words: the idea and tonight's question (in 52m), a Name it line on what the child made (D.fb), the pet's claim
// (D.claim), each code's own reason; the engine's tone lines do the rest
function lsFallback4(D) {
  return {idea: D.idea, home: D.home, beats: {remember: [], explore: [], name: [].concat(D.fb || [], D.idea), together: [], check: ['My turn. Check me!', D.claim || 'I think it is {ans}.'], show: []},
    reasons: Object.fromEntries(D.bugs.map(c => [c, [BUGS[c].say]]))};
}
function lsEnable4(id, W) {
  const D = LS_DRAFTED[id], L = D && lsEnable(id, W || lsFallback4(D));
  if (!L) return null;
  // a sort names its pictures before its task (a line of its own, kept when a draft's lines replace the task)
  const ex = L.exp;
  L.exp = r => { const e = ex(r); if (e.names) e.lines = [e.names].concat(e.lines || []); return e; };
  return Object.assign(L, {band: '4', p: D.p, g: D.g, fb: !W, chk: st => lsChk4(st)});
}

/* ---- Check me: the pet's own announced turn. It answers one of the lesson's questions (its build, or its pick); right about a quarter
   of the time, else wrong by the child's own held idea when it is one of the lesson's, else by the lesson's first the question allows.
   The pet's work is on the card (its letters in the word's boxes, or its pick under the question). Caught: its reason, then the child
   puts it right (the same task, the pet's letter among the tiles). ---- */
function lsFits4(q, v) {
  if (q.kind == 'choice') return q.choices.some(c => c.v === String(v));
  if (q.kind == 'build') return /^[a-z]+$/i.test(String(v)) && String(v).length <= 8;
  if (q.kind == 'make') return LS.fits(q, v);
  return false;
}
// the pet's work on the card
function lsPw4(q, v) {
  v = String(v);
  if (q.kind == 'build') return q.pwHtml ? q.pwHtml(v) : q.html.replace(/<div class="lslots[^"]*">[\s\S]*<\/div>/, ls4Slots(v.length, v, 'ls-pw ls4-pw'));
  if (q.kind == 'choice') {
    // every choice, the pet's pick marked (so the child can see whether it is right)
    return q.html.replace(SLOT, '') + `<div class="ls-pw ls4-pick">${q.choices.map(c => `<span class="ls4-pk${c.v === v ? ' on' : ''}">${c.h ? c.l : esc(c.l)}${c.v === v
      ? '<span class="a11y-h">(the pet\'s pick)</span>' : ''}</span>`).join('')}</div>`;
  }
  return LS.petWork(q, v);
}
function lsChk4(st) {
  const L = st.L, D = LS_DRAFTED[st.id], T = lsTone(), held = st.repair || knowHeld(st.id, st.S, st.day), codes = held && L.bugs.includes(held) ? [held] : L.bugs;
  const petOk = LS.petRight(st);
  let q, pv = null, code = null;
  for (let n = 0; n < 40 && pv == null; n++) {
    q = L.q(D.petSt | 0, st.r);
    if (petOk) { pv = q.ans; break; }
    for (const c of n < 30 ? codes : L.bugs) {
      const v = (knowPredict(q)[c] || []).find(x => !lsOk(q, String(x)) && lsFits4(q, x));
      if (v != null) { pv = String(v); code = c; break; }
    }
  }
  if (pv == null) pv = q.ans; // never reached with these lessons (tools/test.js "every pet turn" checks every lesson's forced-wrong turn)
  const ok = lsOk(q, pv), sl = Object.assign({}, q.sl, {ans: lsSayV(q, pv)});
  const claim = lsW(L.w.beats.check.filter(t => /\{ans\}/.test(t)), 0, sl)[0] || `I think it is ${lsSayV(q, pv)}.`;
  return [{m: 'judge', q, pv, petOk: ok, code, pw: lsPw4(q, pv), lines: [T.myTurn, claim],
    after: () => [{m: 'ask', help: 1, fix: 1, q: D.fix ? D.fix(q, pv, st.r) : Object.assign({}, q), lines: [T.fixIt]}]}];
}
// the fix of a build: the same word, the pet's wrong letters among the tiles
function ls4FixBuild(q, pv, r) {
  const extra = [...new Set([...String(pv)].filter(c => !q.word.includes(c)))].slice(0, 2);
  const base = [...q.word], more = q.tiles.filter(t => !base.includes(t) && !extra.includes(t)).slice(0, Math.max(0, 2 - extra.length));
  return Object.assign({}, q, {tiles: ls4Shuf(r, base.concat(extra, more))});
}
