/* ---------- READ-SHAPES (v184): the lesson shapes of the K-2 reading stops TEACH-4 and TEACH-3b left out (part teachrd, after 52p) ----------
   The stops (52r-lessons5r.js): Sight Words 1-5, Rhyme Time, Rhyme & Read, Count the Claps, the three Spell stops, Story Time 1-2, Opposites,
   Synonyms, Capitals & End Marks, Build Sentences, Parts of Speech and Plurals. Each runs in the six-beat engine (52-lesson.js) like the
   phonics lessons (lsDraft4: the test-out at the start, the pet's tone by age, the pet's announced and always-corrected turn, show-me items
   that are never a choice of two, fresh items on resume, a win at the end). What is new is the shape: the questions, the model each one
   works on, its own "not yet" line and its misconception codes. Every model is drawn from tokens (src/css/52q-teach5r.css), every control
   is a 48 px button with a spoken name, every word on a picture is a drawn word (ART).
     sight   word cards: four cards face down, turn one over to read it (K2MM.flash); a word that flashes and hides; hear a word, tap it
     rhyme   a rhyme sorter (rhymes / no rhyme) and rhyming pictures or words; the pet picks a word that starts the same
     claps   clap-to-count (K2MM.clap): a Clap button and the claps drawn, for a word heard with its picture or read
     spell   dictation: the child hears the word and builds it from letter tiles (the picture only while help is on)
     story   a short story with picture panels, told aloud (q.tell), and who / what / where questions answered by picture or word
     pairs   an opposite (or same-meaning) pairs match, and a word with its partner to find
     sfix    the sentence fixer (K2MM.sfix): a capital letter button and the end marks, on a sentence of drawn things
     order   word tiles put in order, the end mark shown
     pos     a naming / doing word sorter, and the doing (or naming) word of a sentence to find
     plural  an add s / add es sorter, and the word for two to build or pick
   Words are drafts in batch '5r' (D.b5r; docs/drafts/BATCH5R-READ.md); until the owner approves them a lesson runs on its fallback words. */

/* ---- the misconception codes of these lessons: what the pet says when it repairs the idea (12 words or fewer), the grown-ups' line ---- */
Object.assign(BUGS, {
  sFirst: {d: 'reads a sight word by its first letter alone (went for want)', say: 'Look at every letter, not just the first one.'},
  rFirst: {d: 'picks a word that starts the same, not one that ends the same (dog and duck)', say: 'Say it slowly. Listen to the very end.'},
  rVow: {d: 'picks a word with the same middle sound but another end (dog and box)', say: 'Say it slowly. Listen to the very end.'},
  stWho: {d: 'mixes up who did what in a story', say: 'Find that part of the story. Listen again.'},
  stOut: {d: 'picks something that is not in the story', say: 'Think back to the story. Was it there?'},
  oppSame: {d: 'picks a word that means about the same, not the opposite (hot and warm)', say: 'An opposite is as different as it can be.'},
  synOpp: {d: 'picks the opposite when the word should mean the same (big and small)', say: 'Same means it says almost the same thing.'},
  capOff: {d: 'forgets the capital letter at the start of a sentence', say: 'A sentence starts with a capital letter.'},
  endMk: {d: 'mixes up the end marks: a period on an asking sentence, or the other way', say: 'Asking ends with a question mark. Telling ends with a period.'},
  wOrder: {d: 'puts the words of a sentence in an order that does not make sense', say: 'Read it out loud. Does it sound right?'},
  posSwap: {d: 'mixes up naming words and doing words', say: 'A doing word is something you can do.'},
  plEs: {d: 'adds only s to a word that needs es (boxs)', say: 'After x, s, sh or ch, we add e and s.'},
  plE: {d: 'adds es to a word that needs only s (cates)', say: 'Most words just add s.'},
  plNo: {d: 'leaves the word as one: two box', say: 'More than one? It needs an ending.'},
});
Object.assign(LSREP.NOTE, {
  sFirst: 'sometimes reads a sight word by its first letter (went for want)',
  rFirst: 'sometimes picks a word that starts the same instead of one that rhymes',
  rVow: 'sometimes picks a word with the same middle sound instead of one that rhymes',
  stWho: 'sometimes mixes up who did what in a short story',
  stOut: 'sometimes picks something that was not in the story',
  oppSame: 'sometimes picks a word that means the same when asked for an opposite',
  synOpp: 'sometimes picks the opposite when asked for a word that means the same',
  capOff: 'sometimes forgets the capital letter at the start of a sentence',
  endMk: 'sometimes mixes up the period and the question mark',
  wOrder: 'sometimes puts the words of a sentence in an order that does not make sense',
  posSwap: 'sometimes mixes up naming words (nouns) and doing words (verbs)',
  plEs: 'sometimes adds only s where es is needed (boxs)',
  plE: 'sometimes adds es where only s is needed (cates)',
  plNo: 'sometimes forgets the ending for more than one (two box)',
});

/* ---- small helpers ---- */
const ls5D = (id, t, g, fam, o) => ls4(id, t, 'read', g, Object.assign({fam, b5r: 1, petSt: 1}, o));
const ls5Cap = s => s.charAt(0).toUpperCase() + s.slice(1);
// a button that says a line (the lesson binds .ls5-say below: the round binds its own data-say buttons, the lesson does not)
const ls5Say = (t, al, big) => `<button class="mmb ls5-say${big ? ' ls5-ear' : ''}" data-say="${esc(t)}" aria-label="${esc(al)}">${ico('speak', big ? 34 : 24)}</button>`;
if (typeof document != 'undefined' && document.addEventListener && !LS.r5) {
  LS.r5 = 1;
  document.addEventListener('click', e => {
    const b = e.target && e.target.closest ? e.target.closest('.ls5-say,.ls5-again') : null;
    if (!b) return;
    if (b.classList.contains('ls5-say')) return say(b.dataset.say, b);
    // the flash card: show the word again for a moment
    const c = b.parentNode && b.parentNode.querySelector('.ls5-flash');
    if (!c) return;
    c.classList.remove('go');
    void c.offsetWidth;
    c.classList.add('go');
  });
}
// a sentence of lower-case words drawn with its capital (cap) and end mark (mk: 0 none, 1 '.', 2 '?')
const LS5_MK = ['', '.', '?'];
const ls5Txt = (w, cap, mk) => (cap ? ls5Cap(w.join(' ')) : w.join(' ')) + LS5_MK[mk];
const ls5SentHtml = (w, cap, mk) => {
  const s = w.join(' '), a = cap ? s.charAt(0).toUpperCase() : s.charAt(0);
  return `<span class="ls5-c1${cap ? ' on' : ''}">${esc(a)}</span>${esc(s.slice(1))}`
    + (mk ? `<span class="ls5-mk on">${LS5_MK[mk]}</span>` : '<span class="ls5-mk" aria-hidden="true">_</span><span class="a11y-h">(no end mark)</span>');
};
const ls5Ch = (r, a) => ls4TxtCh(ls4Shuf(r, a));
// the warm-ups (Remember, when nothing older is due): hear a word of a sight-word list, tap it; a picture's first letter
const ls5WarmSight = (D, lv) => r => {
  const L = DOL[lv - 1].filter(w => /^[a-z]{2,}$/.test(w)), w = ls4Pick(r, L), hw = sameSound(w), ot = ls4Shuf(r, L.filter(x => x !== w && !hw.includes(x))).slice(0, 2);
  return ls4Q(D, 0, {kind: 'choice', cls: 'ls4-words', ans: w, choices: ls5Ch(r, [w].concat(ot)), sl: {}, html: `<div class="pkq">${pkEar()}</div>`,
    say: `Tap the word ${w}.`, hint: {k: 'text', s: `It starts with ${w[0]}.`}, label: `warm ${w}`});
};
const ls5WarmFirst = D => r => {
  const w = ls4Pick(r, LS4W.cvc.filter(x => ART[x])), c = w[0], ot = ls4Shuf(r, [...'bdfhmnprst'].filter(x => x !== c && !(c == 'c' && x == 'k'))).slice(0, 2);
  return ls4Q(D, 0, {kind: 'choice', cls: 'syms', ans: c, choices: ls5Ch(r, [c].concat(ot)), sl: {}, html: `<div class="emo">${ls4Pic(w)}</div>`,
    say: `${w}. What letter does ${w} start with?`, hint: {k: 'text', s: `Say it slowly: ${w}.`}, label: `warm ${w}`});
};

/* ---- the models (keys of K2MM, raw: the lesson submits the state; each has its own first-miss line, K2MM[m].miss) ---- */
// word cards: m {ws: four words, t: the card asked for}; state [the card turned over] (-1: none). Only one card is face up at a time,
// so the child reads each word. A second number in the state (of) draws the cards as a picture only: the pet's work in Check me.
K2MM.flash = {
  raw: true,
  s0: () => [-1],
  val: (q, s) => s[0],
  ans: q => [q.m.t],
  step: (q, s, i, d) => (s[0] === d ? null : [d]),
  draw: (q, s) => `<div class="ls5-cards">${q.m.ws.map((w, k) => {
    const up = s[0] === k, in1 = up ? `<span class="ls5-w">${esc(w)}</span>` : `<span class="ls5-bk" aria-hidden="true">${ico('star', 30)}</span>`;
    return s[1] ? `<span class="ls5-card${up ? ' up' : ''}">${in1}</span>`
      : `<button class="ls5-card${up ? ' up' : ''}" data-i="0" data-d="${k}" aria-label="Card ${k + 1}${up ? ': ' + esc(w) : ''}">${in1}</button>`;
  }).join('')}</div>`,
  ctl: () => '<div class="mmc"></div>',
  of: (q, v) => [+v, 1],
  fits: (q, v) => /^\d$/.test(String(v)) && +v < q.m.ws.length,
  miss: () => 'Not that card. Turn over another one.',
};
// clap-to-count: m {n}; state [claps]
K2MM.clap = {
  raw: true,
  s0: () => [0],
  val: (q, s) => s[0],
  ans: q => [q.m.n],
  step: (q, s, i, d) => (s[0] + d < 0 || s[0] + d > 6 ? null : [s[0] + d]),
  draw: (q, s) => `<div class="ls5-claps" aria-hidden="true">${s[0] ? Array.from({length: s[0]}, () => `<span class="ls5-cl">${ico('clap', 36)}</span>`).join('')
    : '<span class="ls5-cl0"></span>'}</div><div class="ls5-cn">${s[0]} ${s[0] == 1 ? 'clap' : 'claps'}</div>`,
  ctl: () => `<div class="mmc ls5-cbs"><button class="mmb ls5-clapb" data-i="0" data-d="1" aria-label="Clap">${ico('clap', 30)}<span>Clap</span></button>`
    + `<button class="mmb" data-i="0" data-d="-1" aria-label="Take back a clap">${ico('undo', 26)}</button></div>`,
  of: (q, v) => [+v],
  fits: (q, v) => /^\d$/.test(String(v)) && +v >= 1 && +v <= 6,
  miss: (q, s) => (s[0] > q.m.n ? 'Too many claps. Say it slowly again.' : 'Not yet. Say it slowly. Clap each part.'),
};
// the sentence fixer: m {w: the words, lower case; ask: 1 an asking sentence}; state [capital 0 | 1, end mark 0 none | 1 . | 2 ?]; value cap*10+mark
const ls5FixB = (i, d, al, t) => `<button class="mmb ls5-fb" data-i="${i}" data-d="${d}" aria-label="${al}">${t}</button>`;
K2MM.sfix = {
  raw: true,
  s0: () => [0, 0],
  val: (q, s) => s[0] * 10 + s[1],
  ans: q => [1, q.m.ask ? 2 : 1],
  step: (q, s, i, d) => (i == 0 ? [1 - s[0], s[1]] : s[1] === d ? null : [s[0], d]),
  draw: (q, s) => `<div class="ls5-sent">${ls5SentHtml(q.m.w, s[0], s[1])}</div>`,
  ctl: () => `<div class="mmc ls5-fix">${ls5FixB(0, 1, 'Capital letter', 'Aa')}${ls5FixB(1, 1, 'Period', '.')}${ls5FixB(1, 2, 'Question mark', '?')}</div>`,
  of: (q, v) => [Math.floor(+v / 10), +v % 10],
  fits: (q, v) => /^(1?[0-2])$/.test(String(v)),
  miss: (q, s) => (!s[0] ? 'Not yet. Look at the first letter.' : 'Not yet. Is it telling or asking?'),
};
// the fixer's state has two numbers, so its check is a goal (LSGOAL, 52b-know.js): the state, or its value as text, is the target
LSGOAL.sfix = (q, v) => (Array.isArray(v) ? v[0] * 10 + v[1] : /^\d+$/.test(String(v)) ? +v : NaN) === 10 + (q.m.ask ? 2 : 1);
// the make kind's first-miss words for these models (their own "not yet" line); TEACH-3b's models do the same in teach35
if (!KIND.make.r5) {
  const MK = KIND.make, r1 = MK.retry;
  MK.r5 = 1;
  MK.retry = (q, st) => {
    const M = K2MM[q.model];
    if (!M || !M.miss || !['flash', 'clap', 'sfix'].includes(q.model)) return r1(q, st);
    fb(M.miss(q, st.mm), 'again');
    st.mmMoved = false;
    MK.draw(q, st);
    const w = $('.mmw');
    if (!w) return;
    w.classList.add('wrong');
    k2Shake(w);
    setTimeout(() => w.classList.remove('wrong'), 900);
  };
}

/* ---- the slots each beat has (tools/author.js checks every draft against them; the briefs: tools/briefs4.js) ---- */
const LS5_SL = {
  sight: {remember: [], explore: ['word'], name: ['word', 'other'], together: [['word'], ['word'], []], check: ['ans'], show: []},
  rhyme: {remember: [], explore: ['word'], name: ['a', 'b', 'letter'], together: [['word'], ['word'], []], check: ['ans', 'word'], show: []},
  claps: {remember: [], explore: ['word'], name: ['word', 'n'], together: [['word'], ['word'], ['word']], check: ['ans', 'word'], show: ['word']},
  spell: {remember: [], explore: ['word'], name: ['word', 'letter'], together: [['word'], ['word'], ['word']], check: ['ans', 'word'], show: ['word']},
  story: {remember: [], explore: [], name: ['a', 'b'], together: [[], [], []], check: ['ans'], show: []},
  pairs: {remember: [], explore: [], name: ['a', 'b'], together: [[], ['word'], []], check: ['ans', 'word'], show: []},
  sfix: {remember: [], explore: [], name: [], together: [[], [], []], check: ['ans'], show: []},
  order: {remember: [], explore: [], name: [], together: [[], [], []], check: ['ans'], show: []},
  pos: {remember: [], explore: [], name: ['a', 'b'], together: [[], [], []], check: ['ans'], show: []},
  plural: {remember: [], explore: [], name: ['a', 'b'], together: [['word'], ['word'], ['word']], check: ['ans', 'word'], show: ['word']},
};

/* ---- sight words (Sight Words 1-5): no sounding out; the word is known by sight. Stage 0 the word cards with the word shown (find
   its twin), 1 hear a word and tap it, 2 a word that flashes and hides (tap the word you saw), 3 hear a word and tap it among four.
   The wrong words start with the same letter (sFirst), never a word that sounds the same (sameSound). ---- */
function ls5Sight(id, t, g, lv, o) {
  const D = ls5D(id, t, g, 'sight', Object.assign({bugs: ['sFirst'], lv5: lv, slots: LS5_SL.sight, claim: 'I tap {ans}. Am I right?'}, o));
  const pool = DOL[lv - 1].filter(w => /^[a-z]{2,}$/.test(w) && !BAD.test(w) && !ksBad(w, true)), all = [...new Set(DOL.flat())].filter(w => /^[a-z]{2,}$/.test(w));
  // words like w: the same first letter (this list first), and words with another first letter
  const alts = (w, r) => {
    const hw = sameSound(w), ok = x => x !== w && !hw.includes(x) && !ksBad(x, true);
    return {same: ls4Shuf(r, pool.filter(x => ok(x) && x[0] === w[0])).concat(ls4Shuf(r, all.filter(x => ok(x) && x[0] === w[0] && !pool.includes(x)))),
      other: ls4Shuf(r, pool.filter(x => ok(x) && x[0] !== w[0]))};
  };
  const okW = () => pool.filter(w => all.some(x => x !== w && x[0] === w[0] && !sameSound(w).includes(x)));
  const cards = (w, r) => { const A = alts(w, r), ws = ls4Shuf(r, [w, A.same[0], A.other[0], A.other[1]]); return {ws, t: ws.indexOf(w), s: ws.indexOf(A.same[0])}; };
  const flash = w => `<div class="ls5-fl"><span class="ls5-card up ls5-big"><span class="ls5-flash go">${esc(w)}</span></span>`
    + `<button class="mmb ls5-again" aria-label="Show the word again">${ico('replay', 26)}</button></div>`;
  D.q = (st, r) => {
    const w = ls4Pick(r, okW()), A = alts(w, r), sl = {word: w}, hint = {k: 'html', html: `<div class="pkhint">${ls4Big(w)}</div>`, w: `Look at every letter of ${w}.`};
    if (st == 0) {
      const C = cards(w, r);
      return ls4Q(D, 0, {kind: 'make', model: 'flash', m: {ws: C.ws, t: C.t}, eq: 'value', ans: C.t, vsay: v => C.ws[+v] || String(v), sl, hint, bug: {sFirst: [C.s]},
        html: ls4Big(w) + lsAsk('Find this word.'), say: `Find the card that says ${w}.`, label: `${id} cards ${w}`});
    }
    const n = st == 3 ? 4 : 3, wr = [A.same[0]].concat(n == 4 ? [A.same[1] || A.other[1], A.other[0]] : [A.other[0]]).filter(Boolean), ch = ls5Ch(r, [w].concat(wr));
    const bug = {sFirst: wr.filter(x => x[0] === w[0])};
    if (st == 2) return ls4Q(D, 2, {kind: 'choice', cls: 'ls4-words', ans: w, choices: ch, sl: {}, bug, hint, html: flash(w),
      say: 'Look fast! Then tap the word you saw.', label: `${id} flash ${w}`});
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: 'ls4-words', ans: w, choices: ch, sl, bug, hint, auto: 'must',
      html: `<div class="pkq">${pkEar()}</div>`, say: `Tap the word ${w}.`, label: `${id} hear ${w}${st == 3 ? ' 4' : ''}`});
  };
  D.exp = r => {
    const w = ls4Pick(r, okW()), C = cards(w, r);
    return {q: ls4Q(D, 0, {kind: 'make', model: 'flash', m: {ws: C.ws, t: C.t}, eq: 'value', ans: C.t, vsay: v => C.ws[+v] || String(v), sl: {word: w},
      html: `<div class="pkq">${pkEar()}</div>`, say: `Turn the cards over. Find ${w}.`, label: `${id} find ${w}`}),
    nudge: 'Not that card. Turn over another one.',
    react: () => ({ctx: {word: w, other: C.ws[C.s]}, lines: [`You found ${w}!`]})};
  };
  D.name = c => {
    const w = c.word || 'the', x = c.other || 'they';
    return {html: `<div class="ls5-pair"><span class="ls5-card up ls5-big"><span class="ls5-w">${esc(w)}</span></span><span class="ls5-card up ls5-no"><span class="ls5-w">${esc(x)}</span></span></div>`,
      sl: {word: w, other: x}};
  };
  D.fix = q => q;
  D.warm = lv > 1 ? ls5WarmSight(D, lv - 1) : ls4WarmLetter(D);
  return D;
}

/* ---- rhymes (Rhyme Time, Rhyme & Read): drawn rhyming families; the wrong ones start the same (rFirst) or share the middle sound (rVow).
   K hears every picture named; Rhyme & Read (D.read) reads the words from stage 1 on. ---- */
const LS5_RHY = [['cat', 'bat', 'hat'], ['hen', 'pen'], ['duck', 'truck'], ['dog', 'frog'], ['fox', 'box'], ['nose', 'rose'], ['bee', 'tree'], ['boat', 'coat'],
  ['sock', 'clock'], ['bell', 'shell'], ['car', 'star'], ['moon', 'spoon'], ['mouse', 'house'], ['fish', 'dish'], ['map', 'cap'], ['bear', 'chair'], ['plane', 'train']];
// one-beat drawn words to offer beside them
const LS5_ONE = ['cat', 'dog', 'pig', 'sun', 'bus', 'hat', 'bed', 'cup', 'fox', 'bat', 'bug', 'hen', 'box', 'map', 'pen', 'web', 'tub', 'cap', 'frog', 'crab', 'drum',
  'flag', 'star', 'clock', 'truck', 'dress', 'milk', 'tent', 'hand', 'gift', 'ship', 'shell', 'sheep', 'chick', 'chair', 'fish', 'dish', 'duck', 'sock', 'cake', 'kite',
  'bike', 'rose', 'bone', 'nose', 'plane', 'boat', 'coat', 'road', 'soap', 'tree', 'bee', 'leaf', 'train', 'moon', 'spoon', 'book', 'bell', 'car', 'cow', 'owl',
  'mouse', 'house', 'bear', 'bird', 'horse', 'foot', 'lamp', 'tie', 'shirt', 'door', 'dice', 'pants'];
const ls5Rime = w => w.slice(w.search(/[aeiou]/));
const ls5Vow = w => (/[aeiou]+/.exec(w) || [''])[0];
const ls5Fams = () => LS5_RHY.map(f => f.filter(w => ART[w])).filter(f => f.length >= 2);
// a and b rhyme (a drawn family, or the same ending: never offered as a "not a rhyme")
const ls5Rhy = (a, b) => ls5Fams().some(f => f.includes(a) && f.includes(b)) || ls5Rime(a) === ls5Rime(b) || a.slice(-2) === b.slice(-2);
function ls5Rhyme(id, t, g, read, o) {
  const D = ls5D(id, t, g, 'rhyme', Object.assign({bugs: ['rFirst', 'rVow'], read, slots: LS5_SL.rhyme, claim: read ? 'I pick {ans}. It rhymes with {word}!' : 'I pick {ans}. It rhymes with {word}!'}, o));
  const one = () => LS5_ONE.filter(w => ART[w]);
  // a target, a partner, a word that starts the same (rFirst) and one with the same middle sound (rVow), then others: none rhymes
  const set = r => {
    for (;;) {
      const f = ls4Pick(r, ls5Fams()), [w, p] = ls4Shuf(r, f), no = one().filter(x => !ls5Rhy(x, w) && x !== w && !f.includes(x));
      const a = ls4Shuf(r, no.filter(x => x[0] === w[0])), b = ls4Shuf(r, no.filter(x => x[0] !== w[0] && ls5Vow(x) === ls5Vow(w)));
      const c = ls4Shuf(r, no.filter(x => !a.includes(x) && !b.includes(x)));
      if (a.length || b.length) return {w, p, f, a: a[0], b: b[0], c, no};
    }
  };
  const mark = w => { const i = w.search(/[aeiou]/); return esc(w.slice(0, i)) + `<b>${esc(w.slice(i))}</b>`; };
  D.q = (st, r) => {
    const S5 = set(r), w = S5.w, n = st == 3 ? 4 : 3, wr = [S5.a, S5.b].filter(Boolean).concat(S5.c).slice(0, n - 1), all = ls4Shuf(r, [S5.p].concat(wr));
    const bug = {rFirst: wr.filter(x => x[0] === w[0]), rVow: wr.filter(x => x[0] !== w[0] && ls5Vow(x) === ls5Vow(w))}, sl = {word: w};
    const hint = {k: 'text', s: `Say each one after ${w}. Which ends the same?`}, words = read && st >= 1;
    const head = st == 0 ? `<div class="ls4-nw">${ls4Pic(w, 'ls4-m')}<span class="ls4-wd">${mark(w)}</span></div>`
      : st >= 2 ? (read ? `<div class="ls4-word">${esc(w)}</div>` : `<div class="pkq">${pkEar()}</div>`) : `<div class="emo">${ls4Pic(w)}</div>`;
    const say = words ? (st >= 2 ? 'Read them. Which word rhymes?' : `Which word rhymes with ${w}?`) : `Which one rhymes with ${w}? ${ls4Or(all)}?`;
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: words ? 'ls4-words' : `pics pk${n}`, ans: S5.p, choices: words ? ls4TxtCh(all) : ls4PicCh(all), sl: st >= 2 && read ? {} : sl, bug, hint,
      html: head + lsAsk(words ? 'Which word rhymes?' : 'Which one rhymes?'), say, label: `${id} ${w} ${all.join('/')}`});
  };
  D.exp = r => {
    const S5 = set(r), w = S5.w, yes = S5.f.filter(x => x !== w), no = [S5.a, S5.b].filter(Boolean).concat(S5.c).slice(0, 4 - yes.length);
    const items = ls4Shuf(r, yes.map(x => ls4Chip(x, 'y')).concat(no.map(x => ls4Chip(x, 'n'))));
    const bins = [{v: 'y', l: `${ico('check-circle', 24)}<span>Rhymes</span>`, h: true, al: `Rhymes with ${w}`}, {v: 'n', l: `${ico('close', 24)}<span>No rhyme</span>`, h: true, al: 'Does not rhyme'}];
    return {q: ls4Sort(D, 0, bins, items, {sl: {word: w}, say: `Does it rhyme with ${w}? Sort the pictures.`, html: `<div class="emo">${ls4Pic(w)}</div>` + lsAsk('Rhymes, or no rhyme?'),
      label: `${id} sort ${w}`}), names: ls4Names(items), nudge: `Not yet. Say each one with ${w}. Does the end match?`,
    react: () => ({ctx: {a: w, b: yes[0], letter: ls5Rime(w)}, lines: [`${w} and ${yes[0]} rhyme!`]})};
  };
  D.name = c => {
    const a = c.a || 'cat', b = c.b || 'hat';
    return {html: `<div class="ls4-row">${[a, b].map(x => `<span class="ls4-nw">${ls4Pic(x, 'ls4-m')}<span class="ls4-wd">${mark(x)}</span></span>`).join('')}</div>`,
      sl: {a, b, letter: [...ls5Rime(a)].join(', ')}};
  };
  D.fix = q => q;
  D.warm = ls5WarmFirst(D);
  return D;
}

/* ---- Count the Claps: clap-to-count. Stage 0 a picture word on the clap model, 1 a picture and how many claps, 2 a written word heard and
   how many claps, 3 a written word clapped on the model. The pet claps one too many or too few (clap). ---- */
function ls5Claps(id, t, g, o) {
  const D = ls5D(id, t, g, 'claps', Object.assign({bugs: ['clap'], petSt: 0, slots: LS5_SL.claps, claim: 'I clap {ans}. Am I right?'}, o));
  const P = () => SYLP.filter(x => ART[x[0]]), Wd = r => { const n = lsRi(r, 1, 4); return [ls4Pick(r, SYLW[n - 1].filter(w => !ksBad(w, true))), n]; };
  const bugOf = n => ({clap: [n - 1, n + 1].filter(v => v >= 1 && v <= 6)});
  const clapQ = (st, w, n, html, say, o2) => ls4Q(D, st, Object.assign({kind: 'make', model: 'clap', m: {n}, eq: 'value', ans: n, vsay: v => `${v} ${+v == 1 ? 'time' : 'times'}`, sl: {word: w}, bug: bugOf(n),
    hint: {k: 'text', s: `Say ${w} slowly. Clap each part.`}, html, say, label: `${id} clap ${w}`}, o2));
  D.q = (st, r) => {
    if (st == 0) { const [w, , n] = ls4Pick(r, P()); return clapQ(0, w, n, `<div class="emo">${ls4Pic(w)}</div>`, `${w}. Clap once for each part.`); }
    if (st == 3) { const [w, n] = Wd(r); return clapQ(2, w, n, `<div class="ls4-word">${esc(w)}</div>`, `${w}. Clap it, then check.`, {label: `${id} clap ${w} show`}); }
    const [w, n] = st == 1 ? (x => [x[0], x[2]])(ls4Pick(r, P())) : Wd(r), k = st == 1 ? 3 : 4;
    return ls4Q(D, st, {kind: 'choice', cls: k == 4 ? 'syms sym4 clps' : 'syms clps', ans: n, choices: sylChoices(k), sl: {word: w}, bug: bugOf(n),
      html: st == 1 ? `<div class="emo">${ls4Pic(w)}</div>` : `<div class="ls4-word">${esc(w)}</div>`, say: `${w}. How many claps?`,
      hint: {k: 'text', s: `Say ${w} slowly. Clap each part.`}, label: `${id} claps ${w}`});
  };
  D.exp = r => {
    const [w, , n] = ls4Pick(r, P().filter(x => x[2] >= 2));
    return {q: clapQ(0, w, n, `<div class="emo">${ls4Pic(w)}</div>`, `${w}! Clap it with me.`, {label: `${id} try ${w}`}), nudge: 'Not yet. Say it slowly. Clap each part.',
      react: () => ({ctx: {word: w, n}, lines: [`${w} has ${n} claps!`]})};
  };
  D.name = c => {
    const w = c.word || 'banana', n = c.n || 3;
    return {html: `<div class="emo">${ls4Pic(w)}</div><div class="ls5-claps">${Array.from({length: n}, () => `<span class="ls5-cl">${ico('clap', 36)}</span>`).join('')}</div>`, sl: {word: w, n}};
  };
  D.fix = q => q;
  D.warm = r => { const [w, , n] = ls4Pick(r, P());
    return ls4Q(D, 0, {kind: 'choice', cls: 'syms clps', ans: n, choices: sylChoices(3), sl: {}, html: `<div class="emo">${ls4Pic(w)}</div>`, say: `${w}. How many claps?`,
      hint: {k: 'text', s: 'Clap each part as you say it.'}, label: `warm claps ${w}`}); };
  return D;
}

/* ---- Spell (dictation): the child hears the word and builds it from letter tiles. Stage 0 with its picture, 1 the written word among
   three that differ by the lesson's sound, 2 and 3 heard only (no picture). The pet writes a real word that differs by one of the
   lesson's codes (kite as kit), as the phonics lessons read them (ls4Code). ---- */
function ls5Spell(id, t, g, pool, key, bugs, o) {
  const D = ls5D(id, t, g, 'spell', Object.assign({bugs, petSt: 2, key, slots: LS5_SL.spell, claim: 'I wrote {ans}. Am I right?'}, o));
  const coded = w => ls4Con(w).filter(x => bugs.includes(ls4Code(w, x)));
  let ok0 = null;
  const good = () => ok0 || (ok0 = pool.filter(w => ART[w] && coded(w).length));
  const keyOf = w => [].concat(key).map(k => (typeof k == 'function' ? k(w) : LS4_KEY[k](w))).find(Boolean) || w[1];
  const bugOf = (w, xs) => { const b = {}; for (const x of xs) { const c = ls4Code(w, x); if (c) (b[c] = b[c] || []).push(x); } return b; };
  const ear = w => ls5Say(w, 'Hear the word again', true);
  const build = (st, w, r, pic, o2) => {
    const cs = ls4Shuf(r, coded(w)), n = st == 0 ? 1 : 2, extra = [...new Set([...cs.join('')].filter(c => !w.includes(c)))].slice(0, 1);
    const more = ls4Shuf(r, [...'bdfgmnprst'].filter(c => !w.includes(c) && !extra.includes(c))).slice(0, n + 1 - extra.length);
    return ls4Q(D, Math.min(st, 2), Object.assign({kind: 'build', word: w, tiles: ls4Shuf(r, [...w].concat(extra, more)), ans: w, sl: {word: w}, bug: bugOf(w, cs),
      hint: {k: 'text', s: `Say it slowly: ${w}. One sound at a time.`}, html: (pic ? `<div class="emo">${ls4Pic(w)}</div>` : '') + `<div class="ls5-dict">${ear(w)}</div>` + ls4Slots(w.length),
      say: pic ? `${w}. Build ${w} with the tiles.` : `Listen: ${w}. Build the word.`, label: `${id} build ${w}${pic ? '' : ' heard'}${st == 3 ? ' show' : ''}`}, o2));
  };
  D.q = (st, r) => {
    const w = ls4Pick(r, good());
    if (st == 1) {
      const cs = ls4Shuf(r, coded(w)).slice(0, 2), fill = ls4Shuf(r, ls4Con(w).filter(x => !cs.includes(x))).slice(0, 2 - cs.length), all = ls4Shuf(r, [w].concat(cs, fill));
      return ls4Q(D, 1, {kind: 'choice', cls: 'ls4-words', ans: w, choices: ls4TxtCh(all), sl: {word: w}, bug: bugOf(w, cs.concat(fill)),
        hint: {k: 'text', s: `Say it slowly: ${w}. Check every letter.`}, html: `<div class="emo">${ls4Pic(w)}</div><div class="ls5-dict">${ear(w)}</div>`,
        say: `${w}. Which word says ${w}?`, label: `${id} pick ${w}`});
    }
    return build(st, w, r, st == 0);
  };
  D.exp = r => {
    const w = ls4Pick(r, good());
    return {q: build(0, w, r, true, {label: `${id} try ${w}`, say: `Listen: ${w}. Build ${w} any way you think.`}), nudge: 'Not yet. Say it slowly, one sound at a time.',
      react: () => ({ctx: {word: w, letter: keyOf(w)}, lines: [`${w}! You built every sound.`]})};
  };
  const mark = (w, k) => { const i = w.indexOf(String(k).replace(/_e$/, '')); return i < 0 || /_/.test(k) ? esc(w) : esc(w.slice(0, i)) + `<b>${esc(k)}</b>` + esc(w.slice(i + k.length)); };
  D.name = c => {
    const w = c.word || good()[0], k = c.letter || keyOf(w);
    return {html: `<div class="ls4-nw">${ls4Pic(w, 'ls4-m')}<span class="ls4-wd">${mark(w, k)}</span></div>${ls4Slots(w.length, w, 'ls5-nb')}`, sl: {word: w, letter: ls4Spk(k)}};
  };
  D.fix = (q, pv, r) => ls4FixBuild(q, pv, r);
  D.warm = ls5WarmFirst(D);
  return D;
}

/* ---- Story Time: a short story of drawn animals, things and places, told aloud and shown as picture panels (stage 0) or as words; the
   questions ask who, what and where, answered by picture (stages 0, 1, 3) or by written word (stage 2). The wrong answers are the other
   one in the story (stWho) or something not in it (stOut). ---- */
const LS5_WHO = ['cat', 'dog', 'pig', 'hen', 'duck', 'bear', 'frog', 'rabbit', 'mouse', 'owl', 'cow', 'fox', 'lion', 'sheep', 'turtle', 'horse', 'chick'];
const LS5_WHAT = ['ball', 'kite', 'cake', 'hat', 'apple', 'book', 'gift', 'drum', 'cookie', 'balloon', 'umbrella', 'pizza', 'cup', 'bell', 'flag', 'map'];
const LS5_WHERE = {house: 'to the house', school: 'to school', beach: 'to the beach', tent: 'into the tent', tree: 'up the tree', road: 'down the road'};
function ls5Story(id, t, g, two, o) {
  const D = ls5D(id, t, g, 'story', Object.assign({bugs: ['stWho', 'stOut'], two, slots: LS5_SL.story, claim: 'I pick {ans}. Am I right?'}, o));
  const A = () => LS5_WHO.filter(w => ART[w]), T = () => LS5_WHAT.filter(w => ART[w]), Pl = () => Object.keys(LS5_WHERE).filter(w => ART[w]);
  // a story: [sentence, its pictures] and its questions {q, ans, kind (who|what|where), alt (in the story, wrong)}
  const story = r => {
    const [a, b] = ls4Shuf(r, A()), [t1, t2] = ls4Shuf(r, T()), p = ls4Pick(r, Pl()), go = LS5_WHERE[p];
    if (!two) return {a, b, t1, t2, p, s: [[`The ${a} and the ${b} go ${go}.`, [a, b, p]], [`The ${a} has ${art(t1)} ${t1}.`, [a, t1]], [`The ${b} has ${art(t2)} ${t2}.`, [b, t2]]],
      qs: [{q: `Who has the ${t1}?`, ans: a, k: 'who', alt: b}, {q: `Who has the ${t2}?`, ans: b, k: 'who', alt: a}, {q: `What does the ${b} have?`, ans: t2, k: 'what', alt: t1},
        {q: `What does the ${a} have?`, ans: t1, k: 'what', alt: t2}, {q: 'Where do they go?', ans: p, k: 'where', alt: null}]};
    return {a, b, t1, t2: null, p, s: [[`The ${a} goes ${go}.`, [a, p]], [`The ${a} finds ${art(t1)} ${t1}.`, [a, t1]], [`Then the ${a} gives it to the ${b}.`, [a, b]]],
      qs: [{q: `Who finds the ${t1}?`, ans: a, k: 'who', alt: b}, {q: `Who gets the ${t1}?`, ans: b, k: 'who', alt: a}, {q: `What does the ${a} find?`, ans: t1, k: 'what', alt: null},
        {q: `Where does the ${a} go?`, ans: p, k: 'where', alt: null}]};
  };
  const card = (S5, pics) => `<div class="ls5-story">${S5.s.map(([x, ps]) => `<div class="ls5-sl">${ls5Say(x, 'Hear: ' + x)}<span class="ls5-st">${esc(x)}</span>`
    + (pics ? `<span class="ls5-sp">${ps.map(w => ls4Pic(w)).join('')}</span>` : '') + '</div>').join('')}</div>`;
  D.q = (st, r) => {
    const S5 = story(r), Q = ls4Pick(r, S5.qs), n = st == 3 ? 4 : 3, inS = [S5.a, S5.b, S5.t1, S5.t2, S5.p].filter(Boolean);
    const from = Q.k == 'who' ? A() : Q.k == 'what' ? T() : Pl(), out = ls4Shuf(r, from.filter(x => !inS.includes(x))), wr = (Q.alt ? [Q.alt] : []).concat(out).slice(0, n - 1);
    const all = ls4Shuf(r, [Q.ans].concat(wr)), words = st == 2;
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: words ? 'ls4-words' : `pics pk${n}`, ans: Q.ans, choices: words ? ls4TxtCh(all) : ls4PicCh(all), sl: {},
      bug: {stWho: Q.alt ? [Q.alt] : [], stOut: wr.filter(x => x !== Q.alt)}, tell: S5.s.map(x => x[0]), hint: {k: 'text', s: 'Listen to the story again. Find that part.'},
      html: card(S5, st == 0) + lsAsk(esc(Q.q)), say: words ? `${Q.q} Read the words.` : `${Q.q} ${ls4Or(all)}?`, label: `${id} ${S5.a} ${S5.b} ${S5.t1} ${Q.k}`});
  };
  D.exp = r => {
    const S5 = story(r), who = [S5.a, S5.b], what = [S5.t1, S5.t2].filter(Boolean), items = ls4Shuf(r, who.map(x => ls4Chip(x, 'who')).concat(what.map(x => ls4Chip(x, 'what')), [ls4Chip(S5.p, 'where')]));
    const bins = [['who', 'Who'], ['what', 'What'], ['where', 'Where']].map(([v, l]) => ({v, l, al: l}));
    return {q: ls4Sort(D, 0, bins, items, {sl: {}, tell: S5.s.map(x => x[0]), say: 'Sort the pictures: who, what or where?', html: card(S5, false) + lsAsk('Who? What? Where?'),
      label: `${id} sort ${S5.a}`}), names: ls4Names(items), nudge: 'Not yet. Is it someone, a thing, or a place?',
    react: () => ({ctx: {a: S5.a, b: S5.t1, p: S5.p, c: S5.b}, lines: [`The ${S5.a} is a who. The ${S5.t1} is a what.`]})};
  };
  D.name = c => {
    const a = c.a || 'dog', b = c.b || 'ball', p = c.p || 'beach';
    return {html: `<div class="ls4-row">${[a, b, p].map((x, i) => `<span class="ls4-nw">${ls4Pic(x, 'ls4-m')}<span class="ls4-wd">${['Who', 'What', 'Where'][i]}</span></span>`).join('')}</div>`, sl: {a, b}};
  };
  D.fix = q => q;
  D.warm = ls5WarmSight(D, 1);
  return D;
}

/* ---- Opposites and Synonyms: pairs. Stage 0 a pairs match (three pairs), 1 a word heard and shown with three to pick from, 2 a word to read,
   3 a word to read and four to pick from. The wrong one means the same (oppSame), or the opposite for Synonyms (synOpp). ---- */
const LS5_OPP = [['big', 'small', 'huge'], ['small', 'big', 'tiny'], ['hot', 'cold', 'warm'], ['cold', 'hot', 'icy'], ['happy', 'sad', 'glad'], ['sad', 'happy', 'upset'],
  ['fast', 'slow', 'quick'], ['wet', 'dry', 'damp'], ['soft', 'hard', 'fluffy'], ['loud', 'quiet', 'noisy'], ['stop', 'go', 'halt'], ['push', 'pull', 'shove'],
  ['pull', 'push', 'tug'], ['full', 'empty', 'packed'], ['shut', 'open', 'closed']];
const LS5_SYN = [['big', 'huge', 'small'], ['small', 'tiny', 'big'], ['happy', 'glad', 'sad'], ['sad', 'upset', 'happy'], ['fast', 'quick', 'slow'], ['hot', 'warm', 'cold'],
  ['cold', 'icy', 'hot'], ['wet', 'damp', 'dry'], ['loud', 'noisy', 'quiet'], ['stop', 'halt', 'go'], ['shut', 'closed', 'open'], ['start', 'begin', 'end'],
  ['yell', 'shout', 'whisper'], ['jump', 'hop', 'sit'], ['smile', 'grin', 'frown']];
function ls5Pairs(id, t, g, syn, o) {
  const code = syn ? 'synOpp' : 'oppSame', rel = syn ? 'means the same as' : 'is the opposite of', ROWS = syn ? LS5_SYN : LS5_OPP;
  const D = ls5D(id, t, g, 'pairs', Object.assign({bugs: [code], syn, slots: LS5_SL.pairs, claim: syn ? 'I think {ans} means the same as {word}.' : 'I think the opposite of {word} is {ans}.'}, o));
  const rows = r => { const o2 = [], seen = new Set(); for (const x of ls4Shuf(r, ROWS)) if (!seen.has(x[0]) && !seen.has(x[1])) { o2.push(x); seen.add(x[0]); seen.add(x[1]); } return o2; };
  const match = (st, r, o2) => {
    const R3 = rows(r).slice(0, 3);
    return {q: ls4Q(D, st, Object.assign({kind: 'match', items: R3.map((x, k) => ({v: 'p' + k, l: x[0]})), opts: ls4Shuf(r, R3.map((x, k) => ({v: 'p' + k, l: x[1]}))), ans: 'p0|p1|p2',
      sl: {}, say: syn ? 'Match each word to one that means the same.' : 'Match each word to its opposite.', html: lsAsk(syn ? 'Same meaning' : 'Opposites'),
      hint: {k: 'text', s: syn ? 'Try each word in its place. Does it say the same?' : 'Say them as a pair, like hot and cold.'}, label: `${id} match ${R3.map(x => x[0]).join('/')}`}, o2)), R3};
  };
  D.q = (st, r) => {
    if (st == 0) return match(0, r).q;
    const [x] = rows(r), n = st == 3 ? 4 : 3, others = ROWS.filter(y => ![x[0], x[1], x[2]].includes(y[0]) && ![x[0], x[1], x[2]].includes(y[1]) && y[0] !== x[0]).map(y => y[1]);
    const wr = [x[2]].concat(ls4Shuf(r, [...new Set(others)].filter(y => ![x[0], x[1], x[2]].includes(y))).slice(0, n - 2)), all = ls4Shuf(r, [x[1]].concat(wr));
    return ls4Q(D, st == 3 ? 2 : st, {kind: 'choice', cls: 'ls4-words', ans: x[1], choices: ls4TxtCh(all), sl: st == 1 ? {word: x[0]} : {word: x[0]}, bug: {[code]: [x[2]]},
      html: `<div class="ls4-word">${esc(x[0])}</div>` + lsAsk(syn ? 'Which means the same?' : 'Which is the opposite?'),
      say: st == 1 ? `${x[0]}. Which word ${syn ? 'means the same' : 'is the opposite'}?` : `Read the word. Tap ${syn ? 'the one that means the same' : 'its opposite'}.`,
      hint: {k: 'text', s: syn ? `Put each word in place of ${x[0]}. Which says the same?` : `Say ${x[0]} and each word as a pair.`}, label: `${id} ${x[0]}${st == 3 ? ' 4' : ''}`});
  };
  D.exp = r => {
    const M = match(0, r, {label: `${id} try`});
    return {q: M.q, nudge: 'Not a pair yet. Say the two words together.',
      react: () => ({ctx: {a: M.R3[0][0], b: M.R3[0][1]}, lines: [`${M.R3[0][0]} and ${M.R3[0][1]}: you matched them!`]})};
  };
  D.name = c => {
    const a = c.a || (syn ? 'big' : 'hot'), b = c.b || (syn ? 'huge' : 'cold');
    return {html: `<div class="ls5-pr"><span class="ls4-word">${esc(a)}</span><span class="ls5-ar" aria-hidden="true">${syn ? '=' : ico('arrow-left', 22) + ico('arrow-right', 22)}</span><span class="ls4-word">${esc(b)}</span></div>`
      + `<span class="a11y-h">${esc(a)} ${rel} ${esc(b)}</span>`, sl: {a, b}};
  };
  D.fix = q => q;
  D.warm = ls5WarmSight(D, 2);
  return D;
}

/* ---- sentences of drawn animals and things (lower case: the fixer and the order shape write the capital and the mark) ---- */
const LS5_AN = ['dog', 'cat', 'pig', 'duck', 'hen', 'frog', 'rabbit', 'mouse', 'horse', 'cow', 'bear', 'lion', 'fox'];
const LS5_TH = ['kite', 'ball', 'hat', 'cake', 'book', 'drum', 'bike', 'cup', 'gift', 'flag'];
const LS5_TELL = [a => `the ${a} is on the bed`, a => `the ${a} can run`, a => `my ${a} is little`, a => `the ${a} is big`, (a, t) => `i see ${art(t)} ${t}`,
  (a, t) => `we have ${art(t)} ${t}`, (a, t) => `the ${a} has ${art(t)} ${t}`];
const LS5_ASK = [a => `is the ${a} on the bed`, a => `can the ${a} run`, a => `where is the ${a}`, (a, t) => `do you see the ${t}`, (a, t) => `who has the ${t}`,
  a => `can you see the ${a}`, (a, t) => `is the ${t} big`];
// a sentence: its words, asking or not, and the drawn thing it is about
function ls5Sentence(r, ask) {
  const a = ls4Pick(r, LS5_AN.filter(w => ART[w])), t = ls4Pick(r, LS5_TH.filter(w => ART[w])), L = ask ? LS5_ASK : LS5_TELL, f = ls4Pick(r, L);
  const s = f(a, t);
  return {w: s.split(' '), ask: ask ? 1 : 0, pic: s.includes(' ' + t) ? t : a};
}

/* ---- Capitals & End Marks: the sentence fixer. Stage 0 the fixer (a capital, the end mark), 1 a picture and three ways to write its
   sentence, 2 the same with no picture, 3 four ways. Wrong: no capital (capOff), the other end mark (endMk). ---- */
function ls5Fix(id, t, g, o) {
  const D = ls5D(id, t, g, 'sfix', Object.assign({bugs: ['capOff', 'endMk'], slots: LS5_SL.sfix, claim: 'I pick this one: {ans} Am I right?', petSt: 1}, o));
  const fixQ = (st, r, ask, o2) => {
    const S5 = ls5Sentence(r, ask), mk = S5.ask ? 2 : 1, ot = 3 - mk;
    return ls4Q(D, st, Object.assign({kind: 'make', model: 'sfix', m: {w: S5.w, ask: S5.ask}, goal: 'sfix', eq: 'value', ans: 10 + mk, vsay: v => ls5Txt(S5.w, +v >= 10, +v % 10), sl: {},
      bug: {capOff: [mk], endMk: [10 + ot]}, html: `<div class="emo">${ls4Pic(S5.pic)}</div>` + lsAsk(S5.ask ? 'An asking sentence.' : 'A telling sentence.'),
      say: `Fix this ${S5.ask ? 'asking' : 'telling'} sentence: a capital, then the end mark.`, hint: {k: 'text', s: 'A capital letter first. Telling: a period. Asking: a question mark.'},
      label: `${id} fix ${S5.w.join(' ')}`}, o2));
  };
  D.q = (st, r) => {
    if (st == 0) return fixQ(0, r, r() < .5);
    const S5 = ls5Sentence(r, r() < .5), mk = S5.ask ? 2 : 1, ot = 3 - mk, right = ls5Txt(S5.w, 1, mk), noCap = ls5Txt(S5.w, 0, mk), wrongMk = ls5Txt(S5.w, 1, ot);
    const all = [right, noCap, wrongMk].concat(st == 3 ? [ls5Txt(S5.w, 0, ot)] : []);
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: 'ls5-sents', ans: right, choices: ls5Ch(r, all), sl: {}, bug: {capOff: [noCap], endMk: [wrongMk]},
      html: (st == 1 ? `<div class="emo">${ls4Pic(S5.pic)}</div>` : '') + lsAsk('Which one is written right?'), say: 'Which sentence is written right? Check the start and end.',
      hint: {k: 'text', s: 'A capital letter first. Telling: a period. Asking: a question mark.'}, label: `${id} pick ${S5.w.join(' ')}${st == 3 ? ' 4' : ''}`});
  };
  D.exp = r => {
    const q = fixQ(0, r, false, {label: `${id} try`});
    return {q, nudge: 'Not yet. Check the first letter and the end mark.', react: () => ({ctx: {}, lines: ['A capital first, and a mark at the end!']})};
  };
  D.name = () => ({html: `<div class="ls5-sents2"><div class="ls5-sent">${ls5SentHtml(['the', 'dog', 'can', 'run'], 1, 1)}</div>`
    + `<div class="ls5-sent">${ls5SentHtml(['can', 'the', 'dog', 'run'], 1, 2)}</div></div>`, sl: {}});
  D.fix = q => q;
  D.warm = ls5WarmSight(D, 2);
  return D;
}

/* ---- Build Sentences: word tiles in order (the end mark shown). Stage 0 the tiles with a picture, 1 a picture and three ways to write it,
   2 the same with no picture, 3 the tiles with no picture. Wrong: two words swapped (wOrder), the other end mark (endMk). ---- */
function ls5Order(id, t, g, o) {
  const D = ls5D(id, t, g, 'order', Object.assign({bugs: ['wOrder', 'endMk'], slots: LS5_SL.order, claim: 'I pick this one: {ans} Am I right?', petSt: 1}, o));
  const words = S5 => S5.w.map((x, i) => (i ? x : ls5Cap(x)));
  // two words next to each other swapped (never the first), so the sentence no longer makes sense
  const swap = (ws, r) => { const i = lsRi(r, 1, ws.length - 2), o2 = ws.slice(); [o2[i], o2[i + 1]] = [o2[i + 1], o2[i]]; return o2; };
  const ordQ = (st, r, pic, o2) => {
    const S5 = ls5Sentence(r, r() < .3), ws = words(S5), mk = LS5_MK[S5.ask ? 2 : 1];
    let items;
    do items = ls4Shuf(r, ws); while (items.join(' ') === ws.join(' '));
    const q = ls4Q(D, st, Object.assign({kind: 'order', items: items.map(x => ({v: x, l: x})), ans: ws, end: mk, sl: {}, bug: {wOrder: [swap(ws, r).join(',')]},
      html: (pic ? `<div class="emo">${ls4Pic(S5.pic)}</div>` : '') + lsAsk('Put the words in order.'), say: 'Put the words in order. Then read it.',
      hint: {k: 'text', s: `It starts with ${ws[0]}. Read it out loud as you go.`}, label: `${id} order ${S5.w.join(' ')}${pic ? '' : ' show'}`}, o2));
    q.ans = ws; // an order's answer is the list (lsQ makes answers text)
    return {q, S5, s: ws.join(' ') + mk};
  };
  D.q = (st, r) => {
    if (st == 0 || st == 3) return ordQ(st == 3 ? 2 : 0, r, st == 0).q;
    const S5 = ls5Sentence(r, r() < .3), ws = words(S5), mk = S5.ask ? 2 : 1, right = ws.join(' ') + LS5_MK[mk], sw = swap(ws, r).join(' ') + LS5_MK[mk], wm = ws.join(' ') + LS5_MK[3 - mk];
    return ls4Q(D, st, {kind: 'choice', cls: 'ls5-sents', ans: right, choices: ls5Ch(r, [right, sw, wm]), sl: {}, bug: {wOrder: [sw], endMk: [wm]},
      html: (st == 1 ? `<div class="emo">${ls4Pic(S5.pic)}</div>` : '') + lsAsk('Which one is a good sentence?'), say: 'Which one makes sense, with the right end mark?',
      hint: {k: 'text', s: 'Read each one out loud. Telling: a period. Asking: a question mark.'}, label: `${id} pick ${S5.w.join(' ')}`});
  };
  D.exp = r => {
    const O = ordQ(0, r, true, {label: `${id} try`});
    return {q: O.q, nudge: 'Not yet. Read it out loud. Does it sound right?', react: () => ({ctx: {}, lines: [`${O.s} You built it!`]})};
  };
  D.name = () => ({html: `<div class="ls5-tiles">${['The', 'dog', 'can', 'run'].map(x => `<span class="ls5-tile">${x}</span>`).join('')}<span class="ls5-mk on">.</span></div>`, sl: {}});
  D.fix = q => q;
  D.warm = ls5WarmSight(D, 3);
  return D;
}

/* ---- Parts of Speech: naming words and doing words. Stage 0 a sorter of four words, 1 a picture and its sentence (tap the doing or the
   naming word), 2 the sentence alone, 3 a longer sentence with four words to pick from. Wrong: the other kind of word (posSwap). ---- */
const LS5_VERB = {dog: ['runs', 'digs', 'jumps', 'barks'], cat: ['naps', 'jumps', 'runs'], bird: ['sings', 'flies'], fish: ['swims'], frog: ['hops', 'jumps', 'swims'],
  duck: ['swims', 'quacks'], bee: ['flies', 'buzzes'], horse: ['runs', 'trots'], pig: ['eats', 'digs'], hen: ['pecks', 'eats'], owl: ['flies', 'hoots'], rabbit: ['hops', 'eats'],
  turtle: ['swims', 'crawls'], lion: ['roars', 'runs'], cow: ['eats', 'moos'], bear: ['sleeps', 'eats'], mouse: ['runs', 'hides']};
const LS5_ADV = ['fast', 'now', 'today', 'here'];
function ls5Pos(id, t, g, o) {
  const D = ls5D(id, t, g, 'pos', Object.assign({bugs: ['posSwap'], slots: LS5_SL.pos, claim: 'I tap {ans}. Am I right?'}, o));
  const AN = () => Object.keys(LS5_VERB).filter(w => ART[w]);
  const sortQ = (st, r, o2) => {
    const [a, b] = ls4Shuf(r, AN()), vs = ls4Shuf(r, [...new Set(LS5_VERB[a].concat(LS5_VERB[b]))]).slice(0, 2);
    const items = ls4Shuf(r, [a, b].map(x => ({v: x, l: x, b: 'n', say: x})).concat(vs.map(x => ({v: x, l: x, b: 'd', say: x}))));
    const q = ls4Sort(D, st, [{v: 'n', l: 'Naming', al: 'Naming words'}, {v: 'd', l: 'Doing', al: 'Doing words'}], items, Object.assign({sl: {}, say: 'Sort them: naming words and doing words.',
      html: lsAsk('Naming word or doing word?'), hint: {k: 'text', s: 'Can you do it? Then it is a doing word.'}, label: `${id} sort ${a}/${vs.join('/')}`}, o2));
    return {q, a, v: vs[0]};
  };
  D.q = (st, r) => {
    if (st == 0) return sortQ(0, r).q;
    const a = ls4Pick(r, AN()), v = ls4Pick(r, LS5_VERB[a]), ad = st == 3 ? ls4Pick(r, LS5_ADV) : null, doing = r() < .6, ans = doing ? v : a, swp = doing ? a : v;
    const ws = ['The', a, v].concat(ad ? [ad] : []), s = ws.join(' ') + '.', all = ls4Shuf(r, [ans, swp, 'The'].concat(ad ? [ad] : []));
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: 'ls4-words', ans, choices: ls4TxtCh(all), sl: {}, bug: {posSwap: [swp]},
      html: (st == 1 ? `<div class="emo">${ls4Pic(a)}</div>` : '') + `<div class="ls4-sent">${esc(s)}</div>` + lsAsk(doing ? 'Tap the doing word.' : 'Tap the naming word.'),
      say: `${s} Which is the ${doing ? 'doing' : 'naming'} word?`, hint: {k: 'text', s: doing ? 'What does it do? That is the doing word.' : 'Who or what is it about? That is the naming word.'},
      label: `${id} ${doing ? 'do' : 'name'} ${a} ${v}${ad ? ' ' + ad : ''}`});
  };
  D.exp = r => {
    const S5 = sortQ(0, r, {label: `${id} try`});
    return {q: S5.q, nudge: 'Not yet. Can you do it? Then it is a doing word.', react: () => ({ctx: {a: S5.a, b: S5.v}, lines: [`${S5.a} is a naming word. ${S5.v} is a doing word.`]})};
  };
  D.name = c => {
    const a = c.a || 'dog', b = c.b || 'runs';
    return {html: `<div class="ls4-row"><span class="ls4-nw">${ls4Pic(a, 'ls4-m')}<span class="ls4-wd">${esc(a)}</span><span class="ls5-tag">Naming</span></span>`
      + `<span class="ls4-nw"><span class="ls4-word">${esc(b)}</span><span class="ls5-tag">Doing</span></span></div>`, sl: {a, b}};
  };
  D.fix = q => q;
  D.warm = ls5WarmSight(D, 4);
  return D;
}

/* ---- Plurals: add s, or es after x, s, sh, ch. Stage 0 the word for two built from tiles (its picture), 1 a picture and three to pick from,
   2 the same with no picture, 3 four to pick from. Wrong: s for es (plEs), es for s (plE), no ending (plNo). ---- */
const LS5_PLS = ['cat', 'dog', 'pig', 'hat', 'bed', 'cup', 'duck', 'frog', 'kite', 'book', 'star', 'tree', 'ball', 'sock', 'hen', 'bike', 'boat', 'cake', 'drum', 'flag', 'bell'];
const LS5_PLES = ['box', 'fox', 'dish', 'dress', 'beach', 'church'];
const ls5Es = w => /(x|s|sh|ch)$/.test(w);
const ls5Pl = w => w + (ls5Es(w) ? 'es' : 's');
function ls5Plural(id, t, g, o) {
  const D = ls5D(id, t, g, 'plural', Object.assign({bugs: ['plEs', 'plE', 'plNo'], slots: LS5_SL.plural, claim: 'Two of them: {ans}. Am I right?'}, o));
  const S = () => LS5_PLS.filter(w => ART[w]), E = () => LS5_PLES.filter(w => ART[w]);
  const word = r => ls4Pick(r, r() < .5 ? E() : S());
  const bugOf = w => (ls5Es(w) ? {plEs: [w + 's'], plNo: [w]} : {plE: [w + 'es'], plNo: [w]});
  const two = w => `<div class="emo ls5-two">${ls4Pic(w)}${ls4Pic(w)}</div>`;
  D.q = (st, r) => {
    const w = word(r), p = ls5Pl(w), sl = {word: w};
    if (st == 0) {
      const tiles = ls4Shuf(r, [...p].concat(ls5Es(w) ? ['t'] : ['e']));
      return ls4Q(D, 0, {kind: 'build', word: p, tiles, ans: p, sl, bug: bugOf(w), hint: {k: 'text', s: ls5Es(w) ? `${w} ends with ${w.slice(-2) == 'sh' || w.slice(-2) == 'ch' ? w.slice(-2) : w.slice(-1)}: add e and s.` : 'Just add s.'},
        html: two(w) + lsAsk(`One ${esc(w)}, two …`) + ls4Slots(p.length), say: `One ${w}, two ${p}. Build ${p}.`, label: `${id} build ${p}`});
    }
    const wr = ls5Es(w) ? [w + 's', w] : [w + 'es', w], oth = ls5Pl(ls4Pick(r, (ls5Es(w) ? E() : S()).filter(x => x !== w))), all = ls5Ch(r, [p].concat(wr, st == 3 ? [oth] : []));
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: 'ls4-words', ans: p, choices: all, sl, bug: bugOf(w),
      hint: {k: 'text', s: 'Say the word for two. Do you hear an extra part at the end?'}, html: (st == 1 ? two(w) : '') + `<div class="ls4-sent">One ${esc(w)}, two ___.</div>`,
      say: `One ${w}, two what?`, label: `${id} pick ${w}${st == 3 ? ' 4' : ''}`});
  };
  D.exp = r => {
    const es = ls4Shuf(r, E()).slice(0, 2), s = ls4Shuf(r, S()).slice(0, 2), items = ls4Shuf(r, es.map(x => ls4Chip(x, 'es')).concat(s.map(x => ls4Chip(x, 's'))));
    return {q: ls4Sort(D, 0, [{v: 's', l: '+ s', al: 'add s'}, {v: 'es', l: '+ es', al: 'add e s'}], items, {sl: {}, say: 'More than one: add s, or add e s?',
      html: lsAsk('+ s or + es?'), label: `${id} sort ${es.join('/')}`}), names: ls4Names(items), nudge: 'Not yet. Say the word for two. Hear an extra part?',
    react: () => ({ctx: {a: es[0], b: s[0]}, lines: [`Two ${ls5Pl(es[0])}. Two ${ls5Pl(s[0])}.`]})};
  };
  D.name = c => {
    const a = c.a || 'box', b = c.b || 'cat';
    return {html: `<div class="ls4-row">${[a, b].map(x => `<span class="ls4-nw">${ls4Pic(x, 'ls4-m')}<span class="ls4-wd">${esc(x)}${ico('arrow-right', 20)}${esc(x)}<b>${ls5Es(x) ? 'es' : 's'}</b></span></span>`).join('')}</div>`,
      sl: {a, b}};
  };
  D.fix = q => q;
  D.warm = ls5WarmSight(D, 4);
  return D;
}
