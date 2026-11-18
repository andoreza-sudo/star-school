/* ---------- TEACH-4: the lessons of batch 4 (part teachrd; the shape and the pieces: 52l-bench4.js) ----------
   Code here (every word, letter and number, the questions by stage: 0 a build or sort with help, 1 a picture, 2 symbols, 3 Show and the
   test-out); words in docs/drafts (until reviewed: the fallback here, the idea, tonight's question, a Name it line, the pet's claim). */
const ls4 = (id, t, p, g, o) => lsSk(id, Object.assign({t, p, g, test: 3, petSt: 0}, o));
// generators of the app run on the lesson's random numbers (so a lesson is the same for its seed)
function ls4Gen(r, fn) {
  const p = RNG;
  RNG = r;
  try { return fn(); } finally { RNG = p; }
}
// an existing question made a lesson question: its stage, the lesson's stop, its codes (no automatic off by one unless asked)
const ls4From = (D, st, q, o) => ls4Q(D, st, Object.assign({}, q, {bug: {off1: []}}, o));

/* ---- the slots each beat has (tools/author.js checks every draft against them; what each beat's words are for, the brief, is in tools/briefs4.js) ---- */
const LS4_SL_SOUND = {remember: ['letter'], explore: ['letter', 'other'], name: ['letter', 'a', 'b'], together: [['word'], ['word'], ['letter']], check: ['ans', 'word'], show: ['letter']};
const LS4_SL_WORD = sh => ({remember: [], explore: ['letter', 'other'], name: ['letter', 'a', 'b'], together: [['word'], ['word'], []], check: ['ans'], show: sh ? ['word'] : []});

/* ---- the sound lessons: First Sounds, Last Sounds, Middle Sounds (K) ----
   key: first, last or mid (LS4_KEY); the wrong letters of the pet and of the tiles come from real contrast words (sun: bun, run, fun). */
const LS4_FIRST = LS4W.cvc.concat(['duck', 'sock', 'fish', 'milk', 'tent', 'hand', 'gift', 'bell', 'book', 'moon', 'leaf', 'car', 'bee', 'cow', 'lion', 'rose', 'nose', 'boat']);
function ls4Sound(id, t, key, pool, o) {
  const pos = key == 'mid' ? 1 : key == 'first' ? 0 : -1, at = w => (pos < 0 ? w.length - 1 : pos), word = key == 'first' ? 'starts with' : key == 'last' ? 'ends with' : 'has in the middle';
  const D = ls4(id, t, 'read', 0, Object.assign({bugs: [key], fam: 'sound', key, slots: LS4_SL_SOUND, claim: key == 'mid' ? 'The middle letter is {ans}.' : `{word} ${word} {ans}.`}, o));
  let ok0 = null; // the drawn words (ART is complete only once the data file has run: read on first use)
  const okL = () => ok0 || (ok0 = pool.filter(w => ART[w] && LS4_KEY[key](w) && !(key == 'first' && /^(sh|ch|th|wh|kn)/.test(w))));
  // letters to offer beside the right one: the contrast words' first, then others (never c with k, never the same letter twice)
  const others = (w, n, r) => {
    const c = LS4_KEY[key](w), from = ls4Wrong(w, key).map(x => x[at(w)]), pool2 = key == 'mid' ? [...LS4_V] : [...'bdfghlmnprstw'];
    const o2 = [...new Set(from.concat(ls4Shuf(r, pool2)))].filter(x => x !== c && !(c == 'c' && x == 'k') && !(c == 'k' && x == 'c'));
    return o2.slice(0, n);
  };
  const pics = (w, n, r) => {
    const c = LS4_KEY[key](w), alt = ls4Shuf(r, okL().filter(x => LS4_KEY[key](x) !== c && !(c == 'c' && LS4_KEY[key](x) == 'k')));
    const out = [];
    for (const x of alt) if (out.length < n - 1 && !out.some(y => LS4_KEY[key](y) == LS4_KEY[key](x))) out.push(x);
    return out;
  };
  D.q = (st, r) => {
    const w = ls4Pick(r, okL()), c = LS4_KEY[key](w), sl = {word: w, letter: c}, hint = {k: 'text', s: `Say it slowly: ${w}. Listen to the ${key == 'mid' ? 'middle' : key == 'first' ? 'start' : 'end'}.`};
    if (st == 0) {
      const ot = others(w, 2, r), tiles = ls4Shuf(r, [c].concat(ot));
      return ls4Q(D, 0, {kind: 'build', word: c, tiles, ans: c, sl: {word: w}, hint, bug: {[key]: ot},
        html: `<div class="emo">${ls4Pic(w)}</div>` + ls4Gap(w, at(w), 1), say: `${w}. Which letter goes in the box?`, label: `${id} ${w}`,
        pwHtml: v => `<div class="emo">${ls4Pic(w)}</div>` + ls4Gap(w, at(w), 1, v)});
    }
    if (st == 1) {
      const ot = others(w, 2, r);
      return ls4Q(D, 1, {kind: 'choice', cls: 'syms', ans: c, choices: ls4TxtCh(ls4Shuf(r, [c].concat(ot))), sl: {word: w}, hint, bug: {[key]: ot},
        html: `<div class="emo">${ls4Pic(w)}</div>`, say: `${w}. What letter does ${w} ${key == 'first' ? 'start with' : key == 'last' ? 'end with' : 'have in the middle'}?`, label: `${id} ${w} pick`});
    }
    const n = st == 3 ? 4 : 3, wr = pics(w, n, r), all = ls4Shuf(r, [w].concat(wr));
    return ls4Q(D, 2, {kind: 'choice', cls: `pics pk${n}`, ans: w, choices: ls4PicCh(all), sl: {letter: c}, bug: {[key]: wr},
      hint: {k: 'text', s: `Say each one slowly. Which one ${word} ${c}?`}, html: ls4Big(c) + `<div class="sub pktxt">${key == 'mid' ? `Which has ${esc(c)} in the middle?` : `Which ${key == 'first' ? 'starts' : 'ends'} with ${esc(c)}?`}</div>`,
      say: `${key == 'mid' ? `Which one has ${c} in the middle?` : `Which one ${word} ${c}?`} ${ls4Or(all)}?`, label: `${id} ${c} ${all.join('/')}`});
  };
  D.exp = r => {
    const P = ls4Pairs(okL(), key, r), items = ls4Shuf(r, P.wa.map(w => ls4Chip(w, P.a)).concat(P.wb.map(w => ls4Chip(w, P.b))));
    const bins = [P.a, P.b].map(x => ({v: x, l: x, al: 'letter ' + x}));
    return {q: ls4Sort(D, 0, bins, items, {sl: {letter: P.a, other: P.b}, say: `Put each picture with its letter: ${P.a} or ${P.b}.`,
      html: `<div class="sub pktxt">${esc(P.a)} or ${esc(P.b)}?</div>`, label: `${id} sort ${P.a}/${P.b}`}), names: ls4Names(items),
    nudge: 'Tap a picture to hear it. Then tap its letter.',
    react: () => ({ctx: {letter: P.a, a: P.wa[0], b: P.wa[1]}, lines: [`${P.wa[0]} and ${P.wa[1]} ${word.replace('has', 'have').replace('starts', 'start').replace('ends', 'end')} ${P.a}.`]})};
  };
  D.name = c => ({html: ls4Big(c.letter) + `<div class="ls4-row">${ls4Pic(c.a, 'ls4-m')}${ls4Pic(c.b, 'ls4-m')}</div>`, sl: c});
  D.fix = (q, pv, r) => q; // the same box and tiles (the pet's letter is one of them)
  D.warm = r => ls4WarmLetter(D)(r);
  return D;
}
// the warm-up of the sound lessons: hear a letter, tap it (three letters)
const ls4WarmLetter = D => r => { const c = ls4Pick(r, [...'smatpnbdfg']), ot = ls4Shuf(r, [...'smatpnbdfgcrhl'].filter(x => x !== c)).slice(0, 2);
  return ls4Q(D, 0, {kind: 'choice', cls: 'syms', ans: c, choices: ls4TxtCh(ls4Shuf(r, [c].concat(ot))), sl: {letter: c}, html: `<div class="pkq">${pkEar()}</div>`,
    say: `Tap the letter ${c}.`, hint: {k: 'text', s: `Look for ${c}.`}, label: `find ${c}`}); };

/* ---- the word lessons: Build a Word, Picture Words, Read & Match (K); Blends, Build Blends, Letter Teams, Silent E, Build Silent E,
   Read Sentences (1st); Vowel Teams, Build Vowel Teams (2nd). key: the sort of Explore; show: 'sent' or 'build' ---- */
// a pattern as said: "a and quiet e" (a_e), "o, a" (oa)
const ls4Spk = k => (/_e$/.test(k) ? `${k[0]} and quiet e` : k.length > 1 ? [...k].join(', ') : k);
const LS4_T = {0: typeof T1 != 'undefined' ? T1 : [], 1: typeof T2 != 'undefined' ? T2 : []};
function ls4Word(id, t, g, pool, key, bugs, show, o) {
  const D = ls4(id, t, 'read', g, Object.assign({bugs, fam: 'word', show, slots: LS4_SL_WORD(show == 'build'),
    claim: 'I built {ans}. Am I right?'}, o));
  const coded = w => ls4Con(w).filter(x => bugs.includes(ls4Code(w, x)));
  let ok0 = null, good0 = null; // the drawn words (ART is complete only once the data file has run: read on first use)
  const okL = () => ok0 || (ok0 = pool.filter(w => ART[w])), good = () => good0 || (good0 = okL().filter(w => coded(w).length));
  // the pictures to offer beside w: drawn words that differ from it by one of the lesson's codes first, then other drawn words of the lesson
  const picsFor = (w, n, r) => {
    const near = ls4Shuf(r, Object.keys(ART).filter(x => x !== w && bugs.includes(ls4Code(w, x)))), rest = ls4Shuf(r, okL().filter(x => x !== w && !near.includes(x)));
    return near.concat(rest).slice(0, n - 1);
  };
  const bugOf = (w, xs) => { const b = {}; for (const x of xs) { const c = ls4Code(w, x); if (c) (b[c] = b[c] || []).push(x); } return b; };
  const sentence = (w, r) => ls4Pick(r, LS4_T[g >= 1 ? 1 : 0]).replace('{a}', (typeof SENT_ART != 'undefined' && SENT_ART[w]) || art(w)).replace('{w}', w);
  D.q = (st, r) => {
    const w = ls4Pick(r, good()), cs = ls4Shuf(r, coded(w)), sl = {word: w}, hint = {k: 'text', s: `Say it slowly: ${w}. One sound at a time.`};
    if (st == 0 || st == 3 && show == 'build') {
      const extra = [...new Set([...cs.join('')].filter(c => !w.includes(c)))].slice(0, 1), more = ls4Shuf(r, [...'bdfgmnprst'].filter(c => !w.includes(c) && !extra.includes(c))).slice(0, 2 - extra.length);
      return ls4Q(D, st == 3 ? 2 : 0, {kind: 'build', word: w, tiles: ls4Shuf(r, [...w].concat(extra, more)), ans: w, sl, hint, bug: bugOf(w, cs),
        html: `<div class="emo">${ls4Pic(w)}</div>` + ls4Slots(w.length), say: `${w}. Build ${w}.`, label: `${id} build ${w}`});
    }
    if (st == 1) {
      const ch = cs.slice(0, 2), fill = ls4Shuf(r, ls4Con(w).filter(x => !ch.includes(x))).slice(0, 2 - ch.length), all = ls4Shuf(r, [w].concat(ch, fill));
      return ls4Q(D, 1, {kind: 'choice', cls: 'ls4-words', ans: w, choices: ls4TxtCh(all), sl, hint, bug: bugOf(w, ch.concat(fill)),
        html: `<div class="emo">${ls4Pic(w)}</div>`, say: `${w}. Which word says ${w}?`, label: `${id} read ${w}`});
    }
    if (st == 2) {
      const ps = picsFor(w, 3, r), all = ls4Shuf(r, [w].concat(ps));
      return ls4Q(D, 2, {kind: 'choice', cls: 'pics pk3', ans: w, choices: ls4PicCh(all), sl: {}, bug: bugOf(w, ps),
        hint: {k: 'text', s: 'Say each sound, then blend them.'}, html: `<div class="ls4-word">${esc(w)}</div>`, say: 'Read the word. Then tap its picture.', label: `${id} pic ${w}`});
    }
    const ps = picsFor(w, 4, r), all = ls4Shuf(r, [w].concat(ps)), s = sentence(w, r);
    return ls4Q(D, 2, {kind: 'choice', cls: 'pics pk4', ans: w, choices: ls4PicCh(all), sl: {}, bug: bugOf(w, ps),
      hint: {k: 'text', s: 'Read it slowly, one word at a time.'}, html: `<div class="sent ls4-sent">${esc(s)}</div>`, say: 'Read it. Then tap the picture that matches.', label: `${id} sent ${w}`});
  };
  D.exp = r => {
    const P = ls4Pairs(o.sortPool || okL(), key, r, o.want), items = ls4Shuf(r, P.wa.map(w => ls4Chip(w, P.a)).concat(P.wb.map(w => ls4Chip(w, P.b))));
    const bins = [P.a, P.b].map(x => ({v: x, l: x, al: x.split('').join(' ').replace('_', 'blank')}));
    return {q: ls4Sort(D, 0, bins, items, {sl: {letter: ls4Spk(P.a), other: ls4Spk(P.b)}, say: `Sort the pictures: ${ls4Spk(P.a)} or ${ls4Spk(P.b)}?`,
      html: `<div class="sub pktxt">${esc(P.a)} or ${esc(P.b)}?</div>`, label: `${id} sort ${P.a}/${P.b}`}), names: ls4Names(items),
    nudge: 'Tap a picture to hear it. Then tap where it goes.',
    react: () => ({ctx: {letter: P.a, a: P.wa[0], b: P.wa[1]}, lines: [`${P.wa[0]} and ${P.wa[1]} both have ${ls4Spk(P.a)}.`]})};
  };
  const mark = (w, k) => { const i = w.indexOf(k.replace(/_e$/, '')); return i < 0 || k.includes('_') ? esc(w) : esc(w.slice(0, i)) + `<b>${esc(k)}</b>` + esc(w.slice(i + k.length)); };
  D.name = c => ({html: ls4Big(c.letter.replace('_', '…')) + `<div class="ls4-row">${[c.a, c.b].map(w => `<span class="ls4-nw">${ls4Pic(w, 'ls4-m')}<span class="ls4-wd">${mark(w, c.letter)}</span></span>`).join('')}</div>`,
    sl: Object.assign({}, c, {letter: ls4Spk(c.letter)})});
  D.fix = (q, pv, r) => ls4FixBuild(q, pv, r);
  D.warm = o.warm || (r => { const w = ls4Pick(r, LS4W.cvc.filter(x => ART[x])), c = w[0], ot = ls4Shuf(r, [...'bdfhmnprst'].filter(x => x !== c && !(c == 'c' && x == 'k'))).slice(0, 2);
    return ls4Q(D, 0, {kind: 'choice', cls: 'syms', ans: c, choices: ls4TxtCh(ls4Shuf(r, [c].concat(ot))), sl: {}, html: `<div class="emo">${ls4Pic(w)}</div>`,
      say: `${w}. What letter does ${w} start with?`, hint: {k: 'text', s: `Say it slowly: ${w}.`}, label: `warm ${w}`}); });
  return D;
}

/* ---- Pre-K, Tiny Town: counting and numbers on the five and ten frame; more; shapes; the odd one out; big and small; patterns ---- */
// the warm-up of the Pre-K lessons (Remember, when nothing older is due): make a small number on the five frame
// the slots of a Pre-K lesson's beats (Together: the build's line only; check: the pet's answer)
const ls4Sl = (remember, explore, name, t1, show) => ({remember, explore, name, together: [t1, [], []], check: ['ans'], show});
const ls4WarmFrame = (D, top) => r => { const n = lsRi(r, 1, top); return lsFrame(D.sk, D.lv, 0, n, 5, {html: lsEq(n) + lsAsk(`Make ${n}.`), say: `Make ${n}.`, sl: {},
  hint: lsFrameHint(n, 5, {}, 'Count as you tap.'), label: `warm ${n}`}); };
// counting to 5 or 10
function ls4Count(id, t, top, o) {
  const D = ls4(id, t, 'math', -1, Object.assign({bugs: ['off1'], petSt: 1, claim: 'I count {ans}. Am I right?',
    fam: 'count', top, slots: ls4Sl([], [], ['n'], ['n'], ['n'])}, o));
  D.q = (st, r) => {
    const n = lsRi(r, 1, top);
    if (st == 0 || st == 3) return lsFrame(D.sk, D.lv, st == 3 ? 2 : 0, n, top, {html: lsEq(n) + lsAsk(`Make ${n}.`), say: `Make ${n}. Put in ${n} counter${n == 1 ? '' : 's'}.`, sl: {n},
      hint: lsFrameHint(n, top, {}, 'Touch each one as you count.'), label: `${id} make ${n}`});
    if (st == 1) return ls4From(D, 1, ls4Gen(r, () => genPkCount(top > 5 ? 2 : 1)), {sl: {}, bug: {}});
    return ls4From(D, 2, ls4Gen(r, () => genPkNum(top > 5 ? 2 : 1)), {sl: {}, bug: {}});
  };
  D.exp = () => ({q: lsFrame(D.sk, D.lv, 0, top, top, {html: lsAsk('Put in as many as you like!'), say: 'Put in as many counters as you like!', goal: 'any', sl: {}}),
    react: v => ({ctx: {n: +v}, lines: [`You put in ${v}!`]})});
  D.name = c => { const n = c.n > 0 ? c.n : Math.min(3, top); return {html: `<div class="pkq">${VIZ.tenFrame(n, top)}</div>` + lsEq(n), sl: {n}}; };
  D.warm = ls4WarmFrame(D, 3);
  return D;
}
// hearing a number
const LS4_LOOKN = {6: 9, 9: 6, 2: 5, 5: 2, 1: 7, 7: 1, 3: 8, 8: 3};
function ls4Num(id, t, top, o) {
  const D = ls4(id, t, 'math', -1, Object.assign({bugs: ['look', 'off1'], petSt: 2, claim: 'I think it is {ans}.',
    fam: 'num', top, slots: ls4Sl([], [], ['n'], ['n'], ['n'])}, o));
  D.q = (st, r) => {
    const n = lsRi(r, 1, top);
    if (st == 0 || st == 3) return lsFrame(D.sk, D.lv, st == 3 ? 2 : 0, n, top, {html: lsAsk('Listen!'), say: `Make ${n}. Put in ${n} counter${n == 1 ? '' : 's'}.`, sl: {n},
      hint: lsFrameHint(n, top, {}, `Count to ${n} as you tap.`), label: `${id} hear ${n}`});
    const lk = LS4_LOOKN[n] != null && LS4_LOOKN[n] <= top ? LS4_LOOKN[n] : null, near = [n - 1, n + 1].filter(x => x >= 0 && x <= top && x !== lk);
    const ds = (lk != null ? [lk] : []).concat(ls4Shuf(r, near)).slice(0, 2), ch = ls4TxtCh(ls4Shuf(r, [n].concat(ds)));
    const bug = {look: lk != null ? [lk] : [], off1: [n - 1, n + 1].filter(x => ds.includes(x))};
    if (st == 1) return ls4Q(D, 1, {kind: 'choice', cls: 'syms', ans: n, choices: ch, sl: {}, bug, html: `<div class="pkq">${VIZ.dots(n, 'row')}</div>` + lsAsk('How many dots?'),
      say: 'How many dots? Tap the number.', hint: {k: 'text', s: 'Touch each dot as you count.'}, label: `${id} dots ${n}`});
    return ls4Q(D, 2, {kind: 'choice', cls: 'syms', ans: n, choices: ch, sl: {}, bug, auto: 'must', html: `<div class="pkq">${pkEar()}</div>` + lsAsk('Which number?'),
      say: `Tap the number ${PK.num(n)}.`, hint: {k: 'html', html: `<div class="pkhint">${VIZ.dots(n, 'row')}</div>`, w: `${PK.num(n)} looks like this.`}, label: `${id} tap ${n}`});
  };
  D.exp = () => ({q: lsFrame(D.sk, D.lv, 0, top, top, {html: lsAsk('Put in as many as you like!'), say: 'Put in as many counters as you like!', goal: 'any', sl: {}}),
    react: v => ({ctx: {n: +v}, lines: [`That is ${v}!`]})});
  D.name = c => { const n = c.n > 0 ? c.n : 3; return {html: `<div class="pkq">${VIZ.tenFrame(n, top)}</div>` + lsEq(n), sl: {n}}; };
  D.warm = ls4WarmFrame(D, 3);
  return D;
}
// groups of things on plates: which has more (two plates, then three, then four)
function ls4Plates(r, k, ob) {
  let ns;
  do { ns = Array.from({length: k}, () => lsRi(r, 1, 5)); } while (new Set(ns).size < k || Math.max(...ns) - [...ns].sort((a, b) => b - a)[1] < 2);
  return ns;
}
const LS4_OBJ = [['duck', 'ducks'], ['apple', 'apples'], ['star', 'stars'], ['cookie', 'cookies'], ['ball', 'balls'], ['car', 'cars'], ['flower', 'flowers'], ['frog', 'frogs']];
function ls4More(id, t, o) {
  const D = ls4(id, t, 'math', -1, Object.assign({bugs: ['fewer'], petSt: 2, claim: 'I pick {ans}. It has the most!',
    fam: 'more', slots: ls4Sl([], [], ['a', 'b'], [], [])}, o));
  const plate = (n, ob) => `<span class="ls4-plate">${PK.row(n, [ob[0], ob[1], ''])}<span class="a11y-h">${n} ${n == 1 ? ob[0] : ob[1]}</span></span>`;
  D.q = (st, r) => {
    if (st == 0) { const n = lsRi(r, 2, 6); return lsFrame(D.sk, D.lv, 0, n + 1, 10, {goal: 'gt', target: n, html: `<div class="pkq">${VIZ.dots(n, 'row')}</div>` + lsAsk('Make more!'),
      say: 'Put in more counters than the dots.', sl: {}, bug: {fewer: [n - 1].filter(x => x >= 0)}, hint: lsFrameHint(n, 10, {}, 'Match each dot. Then put in more.'), label: `${id} more than ${n}`}); }
    const k = st == 1 ? 2 : st == 2 ? 3 : 4, ob = ls4Pick(r, LS4_OBJ), ns = ls4Plates(r, k), top = Math.max(...ns), ch = ns.map((n, i) => ({v: String(i), l: plate(n, ob), h: true}));
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: `pics pk${k} ls4-plates`, ans: String(ns.indexOf(top)), choices: ch, sl: {}, bug: {fewer: ns.map((n, i) => (n < top ? String(i) : null)).filter(x => x != null)},
      html: lsAsk(k == 2 ? 'Which has more?' : 'Which has the most?'), say: `Which plate has ${k == 2 ? 'more' : 'the most'} ${ob[1]}?`, vsay: () => 'this plate',
      hint: {k: 'text', s: 'Match them up. Which one has some left over?'}, label: `${id} more ${ns.join('/')} ${ob[1]}`});
  };
  D.exp = () => ({q: lsFrame2(D.sk, D.lv, 10, 'both', {html: lsAsk('Put in blue and orange!'), say: 'Put in some blue and some orange. Any way you like!', sl: {}}), nudge: 'Use both colours.',
    react: ([a, b]) => ({ctx: {a, b}, lines: [a > b ? 'Blue has more!' : a < b ? 'Orange has more!' : 'They are the same!']})});
  D.name = c => { const a = c.a != c.b ? c.a : 5, b = c.a != c.b ? c.b : 3; return {html: `<div class="pkq">${VIZ.dots(a, 'row')}</div><div class="pkq">${VIZ.dots(b, 'row', {b})}</div>`, sl: {a, b}}; };
  D.warm = ls4WarmFrame(D, 4);
  return D;
}
// shapes
const LS4_SHP = ['circle', 'square', 'triangle', 'rectangle', 'star', 'diamond'], LS4_SHLOOK = {square: ['rectangle', 'diamond'], rectangle: ['square'], diamond: ['square'], circle: [], triangle: ['diamond'], star: []};
function ls4Shape(id, t, o) {
  const D = ls4(id, t, 'math', -1, Object.assign({bugs: ['look'], petSt: 2, claim: 'This is the {ans}!',
    fam: 'shape', slots: ls4Sl([], [], ['a', 'b'], [], [])}, o));
  const sortQ = (r, st) => { const [a, b] = ls4Shuf(r, ['circle', 'square', 'triangle', 'star']).slice(0, 2), cs = ls4Shuf(r, PK.cols());
    const items = ls4Shuf(r, [[a, cs[0]], [a, cs[1]], [b, cs[2]], [b, cs[3]]].map(([s, c]) => ({v: s + c, l: PK.shp(s, c), h: true, b: s, say: s, al: PK.COL[c][0] + ' ' + s})));
    return ls4Sort(D, st, [a, b].map(s => ({v: s, l: PK.shp(s, 1) + `<span class="a11y-h">${s}</span>`, h: true, al: s})), items, {sl: {a, b}, say: `Put the ${a}s together and the ${b}s together.`,
      html: lsAsk('Sort the shapes!'), label: `${id} sort ${a}/${b}`, hint: {k: 'text', s: 'Look at the sides and the corners.'}}); };
  D.q = (st, r) => {
    if (st == 0) return sortQ(r, 0);
    const k = st == 1 ? 3 : 4, ans = ls4Pick(r, st == 1 ? LS4_SHP : ['square', 'rectangle', 'diamond', 'triangle']), lk = LS4_SHLOOK[ans].filter(x => x !== ans);
    const sh = [ans].concat(lk.slice(0, k == 4 ? 2 : 1), ls4Shuf(r, LS4_SHP.filter(x => x !== ans && !lk.includes(x)))).slice(0, k), all = ls4Shuf(r, sh), cs = ls4Shuf(r, PK.cols());
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: `pics pk${k}`, ans, auto: 'must', choices: all.map((s, i) => ({v: s, l: PK.shp(s, cs[i % cs.length]) + `<span class="a11y-h">${s}</span>`, h: true})), sl: {},
      bug: {look: lk.filter(x => sh.includes(x))}, html: `<div class="pkq">${pkEar()}</div>` + lsAsk(`Tap the ${ans}.`), say: `Tap the ${ans}.`,
      hint: {k: 'html', html: `<div class="pkhint">${ans == 'circle' || ans == 'star' ? PK.shp(ans, 1) : PK.sides(ans)}</div>`, w: {circle: 'A circle is round.', square: 'A square has four sides, all the same.',
        triangle: 'A triangle has three sides.', rectangle: 'A rectangle has two long sides and two short sides.', star: 'A star has five points.', diamond: 'A diamond stands on a corner.'}[ans]},
      label: `${id} tap ${ans} ${all.join('/')}`});
  };
  D.exp = r => { const q = sortQ(r, 0), [a, b] = q.bins.map(x => x.v); return {q, nudge: 'Tap a shape, then tap its group.', react: () => ({ctx: {a, b}, lines: [`${a}s here, ${b}s there!`]})}; };
  D.name = c => { const a = c.a || 'circle', b = c.b || 'triangle'; return {html: `<div class="ls4-row">${PK.shp(a, 1)}${PK.shp(a, 4)}</div><div class="ls4-row">${PK.shp(b, 3)}${PK.shp(b, 5)}</div>`, sl: {a, b}}; };
  D.warm = ls4WarmFrame(D, 4);
  return D;
}
// the odd one out
function ls4Odd(id, t, o) {
  const D = ls4(id, t, 'math', -1, Object.assign({bugs: ['alike'], petSt: 2, claim: 'I pick {ans}. It is different!',
    fam: 'odd', slots: ls4Sl([], [], [], [], [])}, o));
  const ANI = ['duck', 'fish', 'frog', 'cat', 'dog', 'pig', 'bird', 'cow', 'owl', 'bee'], FOOD = ['apple', 'banana', 'cookie', 'cake', 'pizza', 'cheese', 'bread', 'milk'];
  D.q = (st, r) => {
    const k = st == 0 ? 3 : 4;
    if (st == 2) { const pr = ls4Pick(r, PK.SAFE), s = ls4Pick(r, ['circle', 'square', 'triangle', 'star']), odd = Math.floor(r() * 4);
      const ch = Array.from({length: 4}, (_, i) => ({v: String(i), l: PK.shp(s, i == odd ? pr[1] : pr[0]) + `<span class="a11y-h">${PK.COL[i == odd ? pr[1] : pr[0]][0]} ${s}</span>`, h: true}));
      return ls4Q(D, 2, {kind: 'choice', cls: 'pics pk4', ans: String(odd), choices: ch, sl: {}, bug: {alike: ch.map(c => c.v).filter(v => v !== String(odd))}, vsay: () => 'this one',
        html: lsAsk('Which one is different?'), say: 'Which one is a different colour?', hint: {k: 'text', s: 'Look at the colours. Three are the same.'}, label: `${id} colour ${s} ${pr}`}); }
    const [A, B] = r() < .5 ? [ANI, FOOD] : [FOOD, ANI], same = ls4Pick(r, A.filter(x => ART[x])), diff = ls4Pick(r, B.filter(x => ART[x])), odd = Math.floor(r() * k);
    const ch = Array.from({length: k}, (_, i) => ({v: String(i), l: ls4Pic(i == odd ? diff : same), h: true}));
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: `pics pk${k}`, ans: String(odd), choices: ch, sl: {}, bug: {alike: ch.map(c => c.v).filter(v => v !== String(odd))}, vsay: () => 'this one',
      html: lsAsk('Which one is different?'), say: 'Which one is different?', hint: {k: 'text', s: 'Three are the same. Find the one that is not.'}, label: `${id} odd ${diff} in ${same}`});
  };
  D.exp = r => { const a = ls4Shuf(r, ANI.filter(x => ART[x])).slice(0, 2), f = ls4Shuf(r, FOOD.filter(x => ART[x])).slice(0, 2), items = ls4Shuf(r, a.map(w => ls4Chip(w, 'ani')).concat(f.map(w => ls4Chip(w, 'food'))));
    return {q: ls4Sort(D, 0, [{v: 'ani', l: ls4Pic('cat') + '<span class="ls4-bl">Animals</span>', h: true, al: 'Animals'}, {v: 'food', l: ls4Pic('apple') + '<span class="ls4-bl">Food</span>', h: true, al: 'Food'}], items,
      {sl: {}, say: 'Put the animals together and the food together.', html: lsAsk('Animals or food?'), label: `${id} sort`}), names: ls4Names(items),
    nudge: 'Tap a picture, then tap its group.', react: () => ({ctx: {}, lines: ['Animals here, food there!']})}; };
  D.name = () => ({html: `<div class="ls4-row">${['duck', 'duck', 'duck', 'apple'].map(w => ls4Pic(w, 'ls4-m')).join('')}</div>`, sl: {}});
  D.warm = ls4WarmFrame(D, 4);
  return D;
}
// big and small
function ls4Size(id, t, o) {
  const D = ls4(id, t, 'math', -1, Object.assign({bugs: ['size'], petSt: 2, claim: 'I pick {ans}!',
    fam: 'size', slots: ls4Sl([], [], [], [], [])}, o));
  const OBJ = ['ball', 'apple', 'duck', 'star', 'cookie', 'car', 'flower', 'frog']; // all drawn (ART)
  const sized = (w, s) => `<span class="pkcell"><span class="pkscale" style="font-size:${s}em">${picFor(w)}</span></span>`;
  const sortQ = (r, st) => { const ws = ls4Shuf(r, OBJ).slice(0, 4), items = ls4Shuf(r, ws.map((w, i) => ({v: w, l: sized(w, i < 2 ? 1.35 : .6), h: true, b: i < 2 ? 'big' : 'small', say: (i < 2 ? 'big ' : 'small ') + w, al: (i < 2 ? 'big ' : 'small ') + w})));
    return ls4Sort(D, st, [{v: 'big', l: 'Big'}, {v: 'small', l: 'Small'}], items, {sl: {}, say: 'Put the big ones together and the small ones together.', html: lsAsk('Big or small?'), label: `${id} sort ${ws.join('/')}`,
      hint: {k: 'text', s: 'Which ones take up lots of room?'}}); };
  D.q = (st, r) => {
    if (st == 0) return sortQ(r, 0);
    const k = st == 1 ? 2 : st == 2 ? 3 : 4, top = k == 2 || r() < .5, w = ls4Pick(r, OBJ), vals = ls4Shuf(r, [.5, .75, 1, 1.35]).slice(0, k), want = top ? Math.max(...vals) : Math.min(...vals), far = top ? Math.min(...vals) : Math.max(...vals);
    const adj = k == 2 ? (top ? 'bigger' : 'smaller') : top ? 'biggest' : 'smallest';
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: `pics pk${k}`, ans: String(vals.indexOf(want)), choices: vals.map((v, i) => ({v: String(i), l: sized(w, v) + `<span class="a11y-h">${v == want ? adj : 'not ' + adj} ${w}</span>`, h: true})), sl: {},
      bug: {size: [String(vals.indexOf(far))]}, vsay: () => 'this one', html: lsAsk(`Tap the ${adj}.`), say: `Tap the ${adj} ${w}.`, hint: {k: 'text', s: 'Look at all of them. Which takes up the most room?'}, label: `${id} ${adj} ${vals.join('/')}`});
  };
  D.exp = r => { const q = sortQ(r, 0); return {q, names: ls4Names(q.items), nudge: 'Tap a picture, then tap Big or Small.', react: () => ({ctx: {}, lines: ['Big ones here, small ones there!']})}; };
  D.name = () => ({html: `<div class="ls4-row">${sized('ball', 1.35)}${sized('ball', .6)}</div>`, sl: {}});
  D.warm = ls4WarmFrame(D, 4);
  return D;
}
// patterns
function ls4Pat(id, t, o) {
  const D = ls4(id, t, 'math', -1, Object.assign({bugs: ['rep'], petSt: 2, claim: 'Next comes the {ans}!',
    fam: 'pat', slots: ls4Sl([], [], [], [], [])}, o));
  const mk = (r, k, abb) => {
    const sh = ls4Shuf(r, ['circle', 'square', 'triangle', 'star', 'diamond']), cs = PK.cols(), A = {s: sh[0], c: cs[0]}, B = {s: sh[1], c: cs[1]}, C = {s: sh[2], c: cs[2]}, E = {s: sh[3], c: cs[3]};
    const seq = abb ? [A, B, B, A, B] : [A, B, A, B, A], next = abb ? B : B, last = seq[seq.length - 1], opts = ls4Shuf(r, [next, abb ? A : A, C, E].slice(0, k));
    const nm = x => `${PK.COL[x.c][0]} ${x.s}`, draw = x => PK.shp(x.s, x.c);
    return {seq, opts, ans: String(opts.indexOf(next)), rep: opts.indexOf(last) >= 0 && last !== next ? [String(opts.indexOf(last))] : [], nm, draw};
  };
  D.q = (st, r) => {
    const k = st == 0 ? 2 : st == 3 ? 4 : 3, P = mk(r, k, st == 2 || st == 3 && r() < .5);
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: `pics pk${k}`, ans: P.ans, choices: P.opts.map((x, i) => ({v: String(i), l: P.draw(x) + `<span class="a11y-h">${P.nm(x)}</span>`, h: true})), sl: {},
      bug: {rep: P.rep}, vsay: v => (P.opts[+v] ? P.opts[+v].s : 'this one'), html: `<div class="pkq pkpat">${P.seq.map(P.draw).join('')}<span class="pkunk">?</span></div>` + lsAsk('What comes next?'),
      say: `${P.seq.map(x => x.s).join(', ')}. What comes next?`, hint: {k: 'text', s: 'Say it with me, then keep going.'}, label: `${id} pattern ${P.seq.map(x => x.s[0]).join('')}`});
  };
  D.exp = r => { const [a, b] = ls4Shuf(r, ['circle', 'square', 'triangle', 'star']).slice(0, 2), cs = ls4Shuf(r, PK.cols());
    const items = ls4Shuf(r, [[a, cs[0]], [a, cs[1]], [b, cs[2]], [b, cs[3]]].map(([s, c]) => ({v: s + c, l: PK.shp(s, c), h: true, b: s, say: s, al: PK.COL[c][0] + ' ' + s})));
    return {q: ls4Sort(D, 0, [a, b].map(s => ({v: s, l: PK.shp(s, 1) + `<span class="a11y-h">${s}</span>`, h: true, al: s})), items, {sl: {}, say: `Put the ${a}s together and the ${b}s together.`, html: lsAsk('Sort the shapes!'), label: `${id} sort`}),
      nudge: 'Tap a shape, then tap its group.', react: () => ({ctx: {}, lines: ['You sorted them!']})}; };
  D.name = (c, r) => { const P = mk(r || mulberry32(5), 2, false); return {html: `<div class="pkq pkpat">${P.seq.concat([P.seq[1]]).map(P.draw).join('')}</div>`, sl: {}}; };
  D.warm = ls4WarmFrame(D, 4);
  return D;
}

/* ---- Pre-K, ABC Beach: big letters, little letters, big and little partners, ABC order, syllable claps ---- */
// a letter and a drawn word that starts with it (single first sound, no blend)
const LS4_LETW = {s: ['sun', 'sock', 'soap'], m: ['moon', 'map', 'milk', 'mouse'], b: ['bus', 'bed', 'ball', 'bee'], c: ['cat', 'cup', 'car', 'cake'], d: ['dog', 'duck', 'dice'],
  f: ['fish', 'fox'], h: ['hat', 'hen', 'hand', 'horse'], p: ['pig', 'pen', 'pizza'], t: ['tub', 'tent', 'tie'], w: ['web', 'water', 'window'], n: ['nose'], e: ['egg', 'elephant'],
  a: ['apple'], l: ['lion', 'leaf', 'lamp'], r: ['rabbit', 'rose', 'road'], g: ['gift']};
const ls4LetWord = (r, c) => ls4Pick(r, (LS4_LETW[c] || []).filter(w => ART[w]));
const LS4_LETS = () => Object.keys(LS4_LETW).filter(c => LS4_LETW[c].some(w => ART[w]));
// look-alike letters first (LOOKU, LOOKL in 20-words.js), then others
const ls4LookOf = (L, up) => [...new Set((up ? LOOKU : LOOKL).filter(g => g.includes(L)).join('').split(''))].filter(x => x !== L);
function ls4Abc(id, t, up, o) {
  const cs = s => (up ? s.toUpperCase() : s), size = up ? 'big' : 'little';
  const D = ls4(id, t, 'read', -1, Object.assign({bugs: ['look'], petSt: 2, claim: 'That is {ans}!',
    fam: 'abc', up, slots: {remember: ['letter'], explore: ['letter', 'other'], name: ['letter', 'a', 'b'], together: [['word'], ['word'], ['letter']], check: ['ans'], show: ['letter']}}, o));
  D.q = (st, r) => {
    const c = ls4Pick(r, LS4_LETS()), L = cs(c), w = ls4LetWord(r, c), lk = ls4LookOf(L, up), k = st == 3 ? 4 : 3;
    const ds = lk.slice(0, st == 0 ? 1 : 2).concat(ls4Shuf(r, [...(up ? ABC_UP : ABC_LOW)].filter(x => x !== L && !lk.includes(x)))).slice(0, k - 1), all = ls4Shuf(r, [L].concat(ds));
    const bug = {look: ds.filter(x => lk.includes(x))};
    if (st == 0) return ls4Q(D, 0, {kind: 'build', word: L, tiles: all, ans: L, sl: {word: w}, bug, html: `<div class="emo">${ls4Pic(w)}</div>` + ls4Gap(cs(w), 0, 1),
      say: `${w}. ${w} starts with ${c}. Find the ${size} ${c}.`, hint: {k: 'html', html: `<div class="pkhint">${ls4Big(L)}</div>`, w: `${c} looks like this.`}, label: `${id} build ${L}`,
      pwHtml: v => `<div class="emo">${ls4Pic(w)}</div>` + ls4Gap(cs(w), 0, 1, v)});
    if (st == 1) return ls4Q(D, 1, {kind: 'choice', cls: 'syms', ans: L, choices: ls4TxtCh(all), sl: {word: w}, bug, html: `<div class="emo">${ls4Pic(w)}</div>`,
      say: `${w}. Tap the ${size} letter ${w} starts with.`, hint: {k: 'text', s: `${w} starts with ${c}.`}, label: `${id} pic ${L}`});
    return ls4Q(D, 2, {kind: 'choice', cls: k == 4 ? 'syms sym4' : 'syms', ans: L, choices: ls4TxtCh(all), sl: {letter: c}, bug, auto: 'must', html: `<div class="pkq">${pkEar()}</div>`,
      say: `Tap the ${size} letter ${c}.`, hint: {k: 'html', html: `<div class="pkhint">${ls4Big(L)}</div>`, w: `${c} is for ${w}.`}, label: `${id} hear ${L}`});
  };
  D.exp = r => {
    const [a, b] = ls4Shuf(r, LS4_LETS().filter(c => (LS4_LETW[c] || []).filter(w => ART[w]).length >= 2)).slice(0, 2), wa = ls4Shuf(r, LS4_LETW[a].filter(w => ART[w])).slice(0, 2), wb = ls4Shuf(r, LS4_LETW[b].filter(w => ART[w])).slice(0, 2);
    const items = ls4Shuf(r, wa.map(w => ls4Chip(w, a)).concat(wb.map(w => ls4Chip(w, b))));
    return {q: ls4Sort(D, 0, [a, b].map(x => ({v: x, l: cs(x), al: 'letter ' + x})), items, {sl: {letter: a, other: b}, say: `Put each picture with its letter: ${a} or ${b}.`,
      html: lsAsk(`${cs(a)} or ${cs(b)}?`), label: `${id} sort ${a}/${b}`}), names: ls4Names(items), nudge: 'Tap a picture to hear it. Then tap its letter.',
    react: () => ({ctx: {letter: a, a: wa[0], b: wa[1]}, lines: [`${wa[0]} and ${wa[1]} start with ${a}.`]})};
  };
  D.name = c => ({html: ls4Big(cs(c.letter)) + `<div class="ls4-row">${ls4Pic(c.a, 'ls4-m')}${ls4Pic(c.b, 'ls4-m')}</div>`, sl: c});
  D.fix = (q, pv, r) => q;
  D.warm = r => ls4WarmLetter(D)(r);
  return D;
}
// big and little partners
function ls4Match(id, t, o) {
  const D = ls4(id, t, 'read', -1, Object.assign({bugs: ['look'], petSt: 1, claim: 'Its little partner is {ans}!',
    fam: 'match', slots: ls4Sl(['letter'], [], ['letter', 'other'], [], [])}, o));
  const LS = 'abdefghmnpqrt';
  const sortQ = (r, st) => { const ls = ls4Shuf(r, [...LS]).slice(0, 3), items = ls4Shuf(r, ls.map(x => ({v: x, l: x, b: x.toUpperCase(), say: x, al: 'little ' + x})));
    return ls4Sort(D, st, ls.map(x => ({v: x.toUpperCase(), l: x.toUpperCase(), al: 'big ' + x})), items, {sl: {}, say: 'Put each little letter with its big partner.', html: lsAsk('Find the partners!'),
      label: `${id} sort ${ls.join('')}`, hint: {k: 'text', s: 'Many partners look alike, just smaller.'}}); };
  D.q = (st, r) => {
    if (st == 0) return sortQ(r, 0);
    const c = ls4Pick(r, [...LS]), down = st != 2, ans = down ? c : c.toUpperCase(), lk = ls4LookOf(ans, !down), k = st == 3 ? 4 : 3;
    const ds = lk.slice(0, 2).concat(ls4Shuf(r, [...(down ? ABC_LOW : ABC_UP)].filter(x => x !== ans && !lk.includes(x)))).slice(0, k - 1), all = ls4Shuf(r, [ans].concat(ds));
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: k == 4 ? 'syms sym4' : 'syms', ans, choices: ls4TxtCh(all), sl: {}, bug: {look: ds.filter(x => lk.includes(x))},
      html: ls4Big(down ? c.toUpperCase() : c), say: down ? `Big ${c}. Tap its little partner.` : `Little ${c}. Tap its big partner.`,
      hint: {k: 'html', html: `<div class="pkhint">${ls4Big(c.toUpperCase() + ' ' + c)}</div>`, w: `Big ${c} and little ${c} are partners.`}, label: `${id} ${down ? 'down' : 'up'} ${c}`});
  };
  D.exp = r => ({q: sortQ(r, 0), nudge: 'Tap a little letter, then its big partner.', react: v => ({ctx: {letter: 'B', other: 'b'}, lines: ['Every letter found its partner!']})});
  D.name = c => ({html: ls4Big((c.letter || 'B') + ' ' + (c.other || 'b')), sl: {letter: c.letter || 'B', other: c.other || 'b'}});
  D.warm = r => ls4WarmLetter(D)(r);
  return D;
}
// ABC order
function ls4Order(id, t, o) {
  const D = ls4(id, t, 'read', -1, Object.assign({bugs: ['abc'], petSt: 2, claim: 'After that comes {ans}!',
    fam: 'order', slots: ls4Sl(['letter'], [], [], [], [])}, o));
  const AL = ABC_LOW, strip = (i) => `<div class="ls4-strip" aria-hidden="true">${[...AL.slice(Math.max(0, i - 3), i + 1)].map(c => `<span>${c}</span>`).join('')}<span class="ls4-q">?</span></div>`;
  D.q = (st, r) => {
    if (st == 0) { const s = lsRi(r, 0, 21), g = lsRi(r, 1, 2), miss = AL[s + g], wrong = [AL[s + g - 1] === miss ? null : AL[s - 1], AL[s + 4], AL[s + 5]].filter(x => x && x !== miss);
      const tiles = ls4Shuf(r, [miss].concat(wrong.slice(0, 2))), run = [0, 1, 2, 3].map(k => (k == g ? '<span class="ls" id="ls0"></span>' : `<span class="ab-l">${AL[s + k]}</span>`)).join('');
      return ls4Q(D, 0, {kind: 'build', word: miss, tiles, ans: miss, sl: {}, bug: {abc: [AL[s + g - 2]].filter(x => x && tiles.includes(x))}, html: `<div class="lslots">${run}</div>`,
        say: `Which letter is missing? ${[0, 1, 2, 3].map(k => (k == g ? 'blank' : AL[s + k])).join(', ')}.`, hint: {k: 'text', s: 'Sing the ABC song up to the blank.'}, label: `${id} gap ${AL[s]}${g}`,
        pwHtml: v => `<div class="lslots">${[0, 1, 2, 3].map(k => (k == g ? `<span class="ls ls4-f">${esc(v)}</span>` : `<span class="ab-l">${AL[s + k]}</span>`)).join('')}</div>`}); }
    const i = lsRi(r, 1, 24), L = AL[i], ans = AL[i + 1], k = st == 3 ? 4 : 3, prev = AL[i - 1], ds = [prev].concat(ls4Shuf(r, [AL[i + 2], AL[i + 3], AL[i - 2]].filter(Boolean))).filter(x => x !== ans && x !== L).slice(0, k - 1);
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: k == 4 ? 'syms sym4' : 'syms', ans, choices: ls4TxtCh(ls4Shuf(r, [ans].concat(ds))), sl: {}, bug: {abc: [prev]},
      html: (st == 1 ? strip(i) : '') + ls4Big(L), say: `What letter comes after ${L}?`, hint: {k: 'text', s: `Sing the ABC song up to ${L}. What comes next?`}, label: `${id} after ${L}`});
  };
  D.exp = r => { const s = lsRi(r, 0, 22), run = [...AL.slice(s, s + 4)], items = ls4Shuf(r, run).map(c => ({v: c, l: c}));
    const q = ls4Q(D, 0, {kind: 'order', items, ans: run, sl: {}, html: lsAsk('ABC order!'), say: 'Put the letters in ABC order. Sing it with me!', label: `${id} order ${run.join('')}`});
    q.ans = run; // an order's answer is the list (lsQ makes answers text)
    return {q, nudge: 'Sing the ABC song. Which letter comes first?',
    react: () => ({ctx: {}, lines: [`${run.join(', ')}. You put them in order!`]})}; };
  D.name = () => ({html: `<div class="ls4-strip" aria-hidden="true">${[...'abcd'].map(c => `<span>${c}</span>`).join('')}</div>`, sl: {}});
  D.warm = r => ls4WarmLetter(D)(r);
  return D;
}
// syllable claps
function ls4Clap(id, t, o) {
  const D = ls4(id, t, 'read', -1, Object.assign({bugs: ['clap'], petSt: 1, claim: 'I clap {ans}. Am I right?',
    fam: 'clap', slots: ls4Sl([], [], [], [], [])}, o));
  const W = () => SYLP.filter(x => ART[x[0]]), clp = n => sylChoices(3).find(c => c.v === String(n));
  D.q = (st, r) => {
    if (st == 0) { const one = ls4Shuf(r, W().filter(x => x[2] == 1)).slice(0, 2), two = ls4Shuf(r, W().filter(x => x[2] == 2)).slice(0, 2), items = ls4Shuf(r, one.map(x => ls4Chip(x[0], '1')).concat(two.map(x => ls4Chip(x[0], '2'))));
      return ls4Sort(D, 0, [{v: '1', l: clp(1).l, h: true, al: 'one clap'}, {v: '2', l: clp(2).l, h: true, al: 'two claps'}], items, {sl: {}, names: ls4Names(items), say: 'Clap each word. One clap or two?',
        html: lsAsk('One clap or two?'), hint: {k: 'text', s: 'Say it and clap each part.'}, label: `${id} sort`}); }
    if (st == 3) { const n = lsRi(r, 1, 3), w = ls4Pick(r, W().filter(x => x[2] == n)), ot = [1, 2, 3].filter(x => x !== n).map(m => ls4Pick(r, W().filter(x => x[2] == m)));
      const extra = ls4Pick(r, W().filter(x => x[2] !== n && !ot.includes(x))), all = ls4Shuf(r, [w].concat(ot, [extra]));
      return ls4Q(D, 2, {kind: 'choice', cls: 'pics pk4', ans: w[0], choices: ls4PicCh(all.map(x => x[0])), sl: {}, bug: {clap: all.filter(x => Math.abs(x[2] - n) == 1).map(x => x[0])},
        html: `<div class="clp ls4-claps">${clp(n).l}</div>` + lsAsk(`Which has ${n} ${n == 1 ? 'clap' : 'claps'}?`), say: `Which one has ${PK.num(n)} ${n == 1 ? 'clap' : 'claps'}? ${ls4Or(all.map(x => x[0]))}?`,
        hint: {k: 'text', s: 'Clap each one as you say it.'}, label: `${id} which ${n}`}); }
    const x = ls4Pick(r, W()), n = x[2];
    return ls4Q(D, st, {kind: 'choice', cls: 'syms clps', ans: n, choices: sylChoices(3), sl: {}, bug: {clap: [n - 1, n + 1].filter(v => v >= 1 && v <= 3)}, html: `<div class="emo">${ls4Pic(x[0])}</div>`,
      say: `${x[0]}. How many claps in ${x[0]}?`, hint: {k: 'text', s: `Say ${x[0]} slowly and clap each part.`}, label: `${id} claps ${x[0]}`});
  };
  D.exp = r => { const q = D.q(0, r); return {q, names: q.names, nudge: 'Tap a picture to hear it. Clap it. Then tap its bin.', react: () => ({ctx: {}, lines: ['You clapped them all!']})}; };
  D.name = () => ({html: `<div class="emo">${ls4Pic('banana')}</div><div class="ls4-claps clp">${clp(3).l}</div>`, sl: {}});
  D.warm = ls4WarmFrame(D, 4);
  return D;
}

/* ---- the lessons, in map order (each a real stop; the idea, tonight's question and the fallback Name it line are hand-written) ---- */
// Tiny Town (Pre-K math)
lsDraft4('pk_count1', ls4Count('pk_count1', 'Count to 5', 5, {first: 1, idea: 'Count each one once. The last number is how many.', fb: 'You put in {n}.', home: 'Ask {name} to count 4 spoons, touching each one.'}));
lsDraft4('shape1', ls4Shape('shape1', 'Find the Shape', {idea: 'Shapes have names. Look at the sides and corners.', fb: 'These are {a}s and {b}s.', home: 'Ask {name} to find something round in your home.'}));
lsDraft4('pk_num1', ls4Num('pk_num1', 'Hear a Number', 5, {idea: 'Every number has its own shape to write.', fb: 'You made {n}.', home: 'Ask {name} to show you 3 fingers, then find the number 3.'}));
lsDraft4('sort1', ls4Odd('sort1', 'Which One Is Different', {idea: 'Most are the same. One is different.', fb: null, home: 'Ask {name}: "Which of these is not a fruit?"'}));
lsDraft4('pk_more1', ls4More('pk_more1', 'Which Has More', {idea: 'Match them up. The one with some left over has more.', fb: null, home: 'Ask {name}: "Who has more grapes, you or me?"'}));
lsDraft4('pk_count2', ls4Count('pk_count2', 'Count to 10', 10, {idea: 'Count each one once. The last number is how many.', fb: 'You put in {n}.', home: 'Ask {name} to count 8 steps out loud.'}));
lsDraft4('pat1', ls4Pat('pat1', 'What Comes Next', {idea: 'A pattern repeats. Say it to know what comes next.', fb: null, home: 'Ask {name} to clap, stomp, clap, stomp, and say what comes next.'}));
lsDraft4('pk_num2', ls4Num('pk_num2', 'Numbers to 10', 10, {idea: 'Every number has its own shape to write.', fb: 'You made {n}.', home: 'Ask {name} to find a 7 on a clock or a page.'}));
lsDraft4('sort2', ls4Size('sort2', 'Big and Small', {idea: 'Look at how much room it takes. That tells big or small.', fb: null, home: 'Ask {name} to line up 3 shoes from smallest to biggest.'}));
// ABC Beach (Pre-K reading)
lsDraft4('abc1', ls4Abc('abc1', 'Big Letters', true, {first: 1, idea: 'Every letter has a name and a sound.', fb: '{a} and {b} start with {letter}.', home: 'Ask {name} to find a big letter M on a sign or a box.'}));
lsDraft4('abc2', ls4Abc('abc2', 'Little Letters', false, {idea: 'Little letters have the same names. Some face a different way.', fb: '{a} and {b} start with {letter}.', home: 'Ask {name} to find a little b and a little d. Which way do they face?'}));
lsDraft4('abc3', ls4Match('abc3', 'Match Big & Little', {idea: 'Every big letter has a little partner.', fb: null, home: 'Ask {name} to find a big letter and its little partner in a book.'}));
lsDraft4('syl1', ls4Clap('syl1', 'Clap the Syllables', {idea: 'Words have parts. Clap once for each part.', fb: null, home: 'Ask {name} to clap their own name, one clap for each part.'}));
lsDraft4('abc4', ls4Order('abc4', 'ABC Order', {idea: 'Every letter has its own place in the ABC.', fb: null, home: 'Ask {name} to sing the ABC and stop at the letter after D.'}));
// Letter Meadow (K)
lsDraft4('sound1', ls4Sound('sound1', 'First Sounds', 'first', LS4_FIRST, {idea: 'Listen to the first sound. It tells the first letter.', fb: '{a} and {b} start with {letter}.', home: 'Ask {name}: "What sound does your name start with?"',
}));
lsDraft4('sound3', ls4Sound('sound3', 'Middle Sounds', 'mid', LS4W.cvc, {idea: 'The middle letter is a vowel. Listen in the middle.', fb: '{a} and {b} have {letter} in the middle.', home: 'Ask {name}: "What sound is in the middle of cat? Of dog?"'}));
lsDraft4('sound2', ls4Sound('sound2', 'Last Sounds', 'last', LS4W.cvc, {idea: 'Say the word slowly. Listen to the very end.', fb: '{a} and {b} end with {letter}.', home: 'Ask {name}: "What sound does bus end with?"'}));
lsDraft4('pic1', ls4Word('pic1', 'Picture Words', 0, LS4W.cvc, 'mid', ['last', 'mid', 'first'], 'sent', {what: 'reading short words with three sounds (c-a-t) by saying each sound and blending them',
  idea: 'Say each sound, then blend them into a word.', fb: '{a} and {b} have {letter} in the middle.', home: 'Ask {name} to sound out "mop": m, o, p.'}));
lsDraft4('build1', ls4Word('build1', 'Build a Word', 0, LS4W.cvc, 'mid', ['last', 'mid', 'first'], 'build', {what: 'building short words one sound at a time: first, middle, last',
  idea: 'Build a word one sound at a time: first, middle, last.', fb: '{a} and {b} have {letter} in the middle.', home: 'Ask {name} to say the sounds in "hat", one at a time.'}));
lsDraft4('sent1', ls4Word('sent1', 'Read & Match', 0, LS4W.cvc, 'mid', ['last', 'mid', 'first'], 'sent', {what: 'reading a short sentence one word at a time and matching it to a picture',
  idea: 'Read one word at a time. The words tell the picture.', fb: '{a} and {b} have {letter} in the middle.', home: 'Ask {name} to read "I see a cat" with you.'}));
// Candy Canyon and Ocean Reef (1st)
lsDraft4('pic2', ls4Word('pic2', 'Blends', 1, LS4W.blend, 'blend', ['blend', 'mid'], 'sent', {what: 'blends: two consonants side by side, and we say both (fr in frog, st in star)',
  sortPool: ['truck', 'tree', 'train', 'drum', 'dress', 'clock', 'cloud', 'flag', 'flower', 'frog', 'crab', 'star', 'plane'],
  idea: 'In a blend we say both letters, one after the other.', fb: '{a} and {b} both start with {letter}.', home: 'Ask {name} to say "frog" without the r. What changes?'}));
lsDraft4('build2', ls4Word('build2', 'Build Blends', 1, LS4W.blend, 'blend', ['blend', 'mid'], 'build', {what: 'building words with blends: both letters of the blend go in',
  sortPool: ['truck', 'tree', 'train', 'drum', 'dress', 'clock', 'cloud', 'flag', 'flower', 'frog', 'crab', 'star', 'plane'],
  idea: 'Build every sound of a blend. Both letters go in.', fb: '{a} and {b} both start with {letter}.', home: 'Ask {name} to say the letters in "flag", in order.'}));
lsDraft4('sound4', ls4Word('sound4', 'Letter Teams', 1, LS4W.dig, 'dig', ['dig', 'mid', 'last'], 'sent', {what: 'letter teams: two letters that make one sound together (sh in ship, ch in chick)',
  idea: 'Some letters work as a team. Together they make one sound.', fb: '{a} and {b} both start with {letter}.', home: 'Ask {name} for a word that starts with "sh".'}));
lsDraft4('pic3', ls4Word('pic3', 'Silent E', 1, LS4W.silent, 'silent', ['silent', 'mid'], 'sent', {what: 'the silent e at the end: we do not hear it, and it makes the vowel say its name (kit, kite)',
  sortPool: LS4W.silent, idea: 'A quiet e at the end makes the vowel say its name.', fb: '{a} and {b} both have {letter}.', home: 'Ask {name}: "What word do you get when you add e to kit?"'}));
lsDraft4('build3', ls4Word('build3', 'Build Silent E', 1, LS4W.silent, 'silent', ['silent', 'mid'], 'build', {what: 'building words with a silent e at the end (the e goes in, though we do not hear it)',
  sortPool: LS4W.silent, idea: 'Do not forget the quiet e at the end.', fb: '{a} and {b} both have {letter}.', home: 'Ask {name} to say the letters in "bike". Which one is quiet?'}));
lsDraft4('sent2', ls4Word('sent2', 'Read Sentences', 1, LS4W.cvc.concat(LS4W.blend), 'blend', ['last', 'mid', 'first', 'blend'], 'sent', {what: 'reading sentences of a few words, one word at a time, and matching them to a picture',
  sortPool: ['truck', 'tree', 'train', 'drum', 'dress', 'clock', 'cloud', 'flag', 'flower', 'frog', 'crab', 'star', 'plane'],
  idea: 'Read every word. The last word often tells the most.', fb: '{a} and {b} both start with {letter}.', home: 'Ask {name} to read a sign or a label to you today.'}));
// Space Station (2nd)
lsDraft4('pic4', ls4Word('pic4', 'Vowel Teams', 2, LS4W.team, 'team', ['team', 'mid', 'last'], 'sent', {what: 'vowel teams: two vowels side by side make one sound (oa in boat, ee in tree)', want: 'oa',
  idea: 'Vowels side by side can make one sound together.', fb: '{a} and {b} both have {letter}.', home: 'Ask {name} for words with "ee" in them, like tree.'}));
lsDraft4('build4', ls4Word('build4', 'Build Vowel Teams', 2, LS4W.team, 'team', ['team', 'mid', 'last'], 'build', {what: 'building words with vowel teams: both vowels go in',
  idea: 'Both vowels of a team go in the word.', fb: '{a} and {b} both have {letter}.', home: 'Ask {name} to write "boat" and point to the vowel team.'}));
