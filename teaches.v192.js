/* Whistlestop teaches v192. BUILT by tools/build.py from 52s-teach5s.css, 52s-bench5s.js, 52s-words5.js, 52t-lessons5s.js: never edit by hand.
   index.html v192 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v192.js. */
(function(){var s=document.createElement('style');s.id='css-teaches';s.textContent="/* TEACH-5S (v187): the Spanish and Discover lesson shapes (52s-bench5s.js, part teaches): the el / la bins and columns, \"say it with me\",\n   the look pictures (the water tank, before and after), the sun and the shade. Tokens only; every button 48 px or more. */\n.ls6-art{display:inline-flex;align-items:center;justify-content:center;min-width:48px;padding:0 var(--s-2);border-radius:var(--r-pill);background:var(--es-tint);\n  color:var(--es-shade);font-size:var(--fs-5);font-weight:700}\n.mmb.ls6-es{min-width:64px;min-height:64px;background:var(--es-tint);color:var(--es-shade)}\n.ls6-two{display:flex;gap:var(--s-4);justify-content:center;align-items:flex-start;flex-wrap:wrap}\n.ls6-col{display:flex;flex-direction:column;align-items:center;gap:var(--s-2)}\n.ls6-col .ls4-pic,.ls6-say .ls4-pic{font-size:clamp(56px,14vmin,88px)}\n.ls6-ph1{font-size:var(--fs-5);font-weight:700;color:var(--ink)}\n.ls6-ph1.ls6-big{font-size:var(--fs-7)}\n.ls6-say{display:flex;gap:var(--s-3);align-items:center;justify-content:center;flex-wrap:wrap}\n.choices.ls6-ph .ch,.choices.ls6-why .ch{letter-spacing:0}\n.choices.ls6-why .ch{font-size:var(--fs-5)}\n.ls6-look{display:flex;gap:var(--s-3);justify-content:center;flex-wrap:wrap}\n.ls6-lk{display:flex;flex-direction:column;align-items:center;gap:var(--s-1);background:var(--surface-2);border-radius:var(--r-card);padding:var(--s-2) var(--s-3)}\n.ls6-lkp{display:flex;align-items:center;gap:var(--s-1);font-size:clamp(44px,11vmin,72px);color:var(--disc-shade)}\n.ls6-lkc{font-size:var(--fs-4);font-weight:700;color:var(--ink)}\n.ls6-tank{position:relative;width:min(260px,70vw);height:160px;margin:0 auto;border-radius:0 0 var(--r-card) var(--r-card);\n  background:linear-gradient(to bottom,var(--surface) 0 22%,var(--disc-tint) 22% 100%);box-shadow:inset 0 0 0 3px var(--disc)}\n.ls6-tank .ls4-pic{font-size:56px}\n.ls6-top{position:absolute;left:18%;top:2px}\n.ls6-bot{position:absolute;right:18%;bottom:4px}\n.ls6-sc{display:inline-flex;flex-direction:column;align-items:center;line-height:1}\n.ls6-sc .ls6-sm{font-size:.5em}\n.ls6-shc{display:flex;flex-direction:column;align-items:center;gap:var(--s-1)}\n.ls6-shc small{font-size:var(--fs-3);font-weight:700;color:var(--ink)}\n.ls6-eq{font-size:56px;font-weight:700;color:var(--disc-shade);line-height:1}\n.ls6-wat{opacity:.85}\n";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)
/* ---------- TEACH-5S (v187): lesson shapes for Spanish and Discover (part teaches, after teachrd; TEACH-PLAN-2 batch 5, part 1) ----------
   The six-beat engine (52-lesson.js) as the reading shapes run it (lsChk4, ls4Q, ls4Sort: part teachrd, loaded before this one): the
   test-out at the start (never a choice of two), the pet's tone by age, the pet's announced turn (always wrong when forced, with its
   reason and the fix), fresh items on resume, a win at the end. Words are drafts in batch '5s' (D.b5s; docs/drafts/BATCH5S-READ.md);
   until the owner approves them a lesson runs on its hand-written fallback words.
     Spanish  listen, sort, say with me, fix the pet's el or la. Explore: hear four pictures (each says "el perro", "la vaca") and sort
              them into el and la; Name it: the two groups, then "say it with me" (the pet says a word, the child says it aloud and taps
              "I said it!": nothing listens, nothing is recorded or sent); Together: the el / la sort, hear a word and tap its picture,
              a picture and its words to pick (read aloud); Check me: the pet picks "el vaca" (or "el mano": the ending is not the rule);
              Show: a picture and four ways to say it.
     Discover predict, look, explain (Nature Trail, K-2 science). Explore: predict, sorting four pictures (no wrong answer); Name it:
              look (what really happens, drawn) and the idea; Together: the sort, a prediction with pictures, a reason to pick (read
              aloud), each followed by what happens (q.look); Check me: the pet predicts with a real kid idea (small things float,
              things that move are alive, shade melts ice as fast as the sun); Show: a prediction or a reason, three or four choices.
   Spanish in a line is written «la vaca»: the lesson says it with the Spanish voice (the ES-AUDIO recording when there is one) and
   the rest in English (LS.talk); "el" and "la" said alone in a Spanish lesson are Spanish too. Pictures are the app's own (ART, the
   Spanish units' pictures, allowed emoji); no prompt or hint picture shows the answer (the drawn result comes only after a
   prediction, in Name it and after the answer). */

// the subjects with lessons: Spanish and Discover join math and reading (owner decision 1: the planner plans inside the subject)
for (const p of ['es', 'disc']) if (!LS_SUBJ.includes(p)) LS_SUBJ.push(p);

/* ---- the misconception codes (52b-know.js): d the idea, say the pet's repair line (12 words or fewer, fit for every age) ---- */
Object.assign(BUGS, {
  esArt: {d: 'puts el on a la word or la on an el word (el vaca)', say: 'Listen to the little word. Is it el or la?'},
  esEnd: {d: 'picks el or la by the last letter, where the word breaks that rule (el mano, la papá)', say: 'The last letter is only a clue. Listen for el or la.'},
  esWord: {d: 'picks another word of the same group (el gato for el perro)', say: 'Listen to the whole word again.'},
  dBig: {d: 'thinks small things float and big things sink', say: 'Size does not decide. Light for its size floats.'},
  dMove: {d: 'thinks a thing that moves is alive (a car, a robot)', say: 'Moving is not the same as growing. Living things grow.'},
  dStill: {d: 'thinks a plant is not alive because it does not walk', say: 'Plants are alive. They grow, even if they stay still.'},
  dSun: {d: 'thinks ice melts as fast in the shade as in the sun', say: 'Sunlight warms things. The shade keeps them cooler.'},
  dAll: {d: 'thinks everything melts in the sun (a rock)', say: 'Ice melts when it warms up. A rock stays a rock.'},
});
Object.assign(LSREP.NOTE, {
  esArt: 'sometimes puts el on a la word, or la on an el word (el vaca)',
  esEnd: 'sometimes picks el or la by the last letter, where the word breaks the rule (el mano)',
  esWord: 'sometimes picks another Spanish word of the same group',
  dBig: 'sometimes thinks small things float and big things sink',
  dMove: 'sometimes thinks a thing that moves, like a car, is alive',
  dStill: 'sometimes thinks a plant is not alive because it does not move',
  dSun: 'sometimes thinks ice melts as fast in the shade as in the sun',
  dAll: 'sometimes thinks everything melts in the sun, even a rock',
});

/* ---- the drafted lessons of batch 5s: code here and in 52t, words in docs/drafts (LSW5 once reviewed), else the fallback ---- */
const LS_B5 = [];
function lsDraft5(id, D) {
  D.id = id;
  if (D.first) D.warm = null; // the first lesson of a map: nothing to remember yet
  D.band = '5';
  LS_DRAFTED[id] = D;
  if (!LS_B5.includes(id)) LS_B5.push(id);
  return lsEnable5(id, typeof LSW5 != 'undefined' && LSW5[id] ? LSW5[id] : null);
}
function lsEnable5(id, W) {
  const D = LS_DRAFTED[id], L = D && lsEnable(id, W || lsFallback4(D));
  if (!L) return null;
  const ex = L.exp, nm = L.name;
  // a sort names its pictures before its task (a line of its own, kept when a draft's lines replace the task)
  L.exp = r => { const e = ex(r); if (e.names) e.lines = [e.names].concat(e.lines || []); return e; };
  // Spanish: Name it ends with "say it with me" (D.also: a spoken item; nothing listens)
  L.name = (c, r) => { const n = nm(c, r), x = D.also ? D.also(c, r) : null; if (x) n.also = x; return n; };
  return Object.assign(L, {band: '5', p: D.p, g: D.g, fb: !W, chk: st => lsChk4(st)});
}
const ls6D = (id, t, p, g, fam, o) => ls4(id, t, p, g, Object.assign({fam, b5s: 1, petSt: 2}, o));
// a speaker button that says a Spanish line (bound below: the lesson binds no data-sayes buttons of its own)
const ls6Ear = (t, al) => `<button class="mmb ls6-es" data-sayes="${esc(t)}" aria-label="${esc(al || 'Hear it again')}">${ico('speak', 34)}</button>`;
if (typeof document != 'undefined' && document.addEventListener && !LS.r6) {
  LS.r6 = 1;
  document.addEventListener('click', e => { const b = e.target && e.target.closest ? e.target.closest('.ls6-es') : null; if (b) say(b.dataset.sayes, b, 'es'); });
}
const ls6Or = ws => (ws.length > 1 ? ws.slice(0, -1).join(', ') + ' or ' + ws[ws.length - 1] : ws.join(''));
const ls6OrC = ws => ls6Cap(ls6Or(ws)); // a list said after a question: its first word capitalised
// "say it with me" and "I said it!", by age (engine lines of this part, checked against LS_RULES)
const LS6_SAY = {little: 'Say it with me!', kid: 'Say it with me, out loud.', teen: 'Say it out loud with me.'};

/* ---- the slots each beat has (tools/author.js checks every draft against them; the briefs: tools/briefs5.js) ---- */
const LS6_SL = {
  es: {remember: [], explore: [], name: ['a', 'b'], together: [[], [], []], check: ['ans'], show: []},
  disc: {remember: [], explore: [], name: ['a', 'b'], together: [[], [], []], check: ['ans'], show: []},
};

/* ================= Spanish ================= */
// the nouns of a lesson: [unit item, unit] of the units named, "el" or "la" only (one thing; los / las are the plural units' and left
// out), never el agua (a la word that takes el), never a word whose picture does not show it (la clase is a bell). Review fix (v186):
// nor el bebé (its picture fits a baby girl too, so "la bebé" is no wrong choice) or la cocina (its picture is a frying pan with an
// egg, which fits el huevo as well)
const LS6_NOPIC = ['agua', 'clase', 'bebé', 'cocina'];
const ls6Nouns = us => us.flatMap(id => { const u = ES_UNITS.find(x => x.id == id); return u ? u.items.filter(it => (it[3] == 'el' || it[3] == 'la') && !LS6_NOPIC.includes(it[0])).map(it => [it, u]) : []; });
const ls6Bare = w => String(w).normalize('NFD').replace(/[̀-ͯ]/g, '');
// the ending rule a child may lean on: -o words el, -a words la (null: no such ending); a word that breaks it (la mano, el papá, la moto)
const ls6Rule = it => (/o$/.test(ls6Bare(it[0])) ? 'el' : /a$/.test(ls6Bare(it[0])) ? 'la' : null);
const ls6Breaks = it => !!ls6Rule(it) && ls6Rule(it) !== it[3];
const ls6Oth = a => (a == 'el' ? 'la' : 'el');
const ls6M = t => `«${t}»`; // a Spanish piece of a spoken line
const ls6Pic = it => `<span class="ls4-pic">${picHTML(it, false)}<span class="a11y-h">${esc(it[1])}</span></span>`;
// a set of items with pictures that differ and no two a unit keeps apart (el camión / el autobús)
const ls6Ok = xs => new Set(xs.map(x => x[0][2] + (x[0][4] || ''))).size == xs.length && !xs.some((a, i) => xs.some((b, j) => j > i && (esClash(a[1], a[0], b[0]) || a[0][0] == b[0][0])));
function ls6Draw(r, P, n, must) {
  let xs = [];
  for (let k = 0; k < 60; k++) { xs = (must ? [must] : []).concat(ls4Shuf(r, P.filter(x => x !== must)).slice(0, n - (must ? 1 : 0))); if (ls6Ok(xs)) break; }
  return xs;
}
// the code a wrong article shows: esEnd when the word breaks the ending rule, else esArt
const ls6ArtCode = it => (ls6Breaks(it) ? 'esEnd' : 'esArt');
function ls6Spanish(id, t, units, o) {
  const D = ls6D(id, t, 'es', -1, 'es', Object.assign({bugs: ['esArt', 'esEnd', 'esWord'], slots: LS6_SL.es, claim: 'I pick {ans}. Am I right?', units}, o));
  const P = () => ls6Nouns(units);
  // two el words and two la words, shuffled; a breaker among them when the lesson has one, half the time
  const four = r => {
    const p = P(), br = p.filter(x => ls6Breaks(x[0])), f = br.length && r() < .5 ? ls4Pick(r, br) : null;
    for (let k = 0; k < 80; k++) {
      const e = ls4Shuf(r, p.filter(x => x[0][3] == 'el' && x !== f)).slice(0, f && f[0][3] == 'el' ? 1 : 2), l = ls4Shuf(r, p.filter(x => x[0][3] == 'la' && x !== f)).slice(0, f && f[0][3] == 'la' ? 1 : 2);
      const xs = ls4Shuf(r, (f ? [f] : []).concat(e, l));
      if (xs.length == 4 && ls6Ok(xs)) return xs;
    }
    return null;
  };
  const chip = ([it]) => ({v: esFull(it), l: ls6Pic(it), h: true, b: it[3], say: esFull(it), lang: 'es', al: it[1]});
  const bins = [{v: 'el', l: '<span class="ls6-art">el</span>', h: true, al: 'el words'}, {v: 'la', l: '<span class="ls6-art">la</span>', h: true, al: 'la words'}];
  const names = xs => xs.map(x => ls6M(esFull(x[0]))).join(', ') + '.';
  // the sort, with the pictures named first (each picture says its words when tapped)
  const sortQ = (st, r, o2) => {
    const xs = four(r), items = xs.map(chip), br = xs.filter(x => ls6Breaks(x[0]));
    const bug = br.length ? {esEnd: [items.map((c, k) => (ls6Breaks(xs[k][0]) ? ls6Oth(c.b) : c.b)).join('|')]} : {};
    return Object.assign(ls4Sort(D, st, bins, items, Object.assign({bug, sl: {}, html: lsAsk('el or la?'), say: 'Tap each picture to hear it. Then sort: el or la.',
      hint: {k: 'text', s: 'Tap a picture and listen to the little word in front.'}, label: `${id} sort ${xs.map(x => x[0][0]).join('/')}`}, o2)), {names: names(xs)});
  };
  // a picture and its words to pick: the right one, the other article, another word (and at four, that word with the other article)
  const pickQ = (st, r, n) => {
    const p = P(), x = ls4Pick(r, p), it = x[0], oth = ls6Draw(r, p, 2, x)[1] || p.find(y => y !== x), ot = oth[0];
    const full = esFull(it), wa = ls6Oth(it[3]) + ' ' + it[0], wo = esFull(ot), wb = ls6Oth(ot[3]) + ' ' + ot[0];
    const ch = ls4Shuf(r, [full, wa, wo].concat(n == 4 ? [wb] : []));
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: 'ls4-words ls6-ph', ans: full, choices: ls4TxtCh(ch), sl: {}, bug: {[ls6ArtCode(it)]: [wa], esWord: [wo].concat(n == 4 ? [wb] : [])},
      vsay: v => ls6M(v), html: `<div class="emo">${ls6Pic(it)}</div>` + lsAsk('Which one is right?'), ...ls6Say('', 'Which one is right?', ls6Or(ch.map(ls6M)) + '?'),
      hint: {k: 'text', s: 'Say each one out loud. Listen to the little word in front.'}, label: `${id} pick ${full}${n == 4 ? ' 4' : ''}`});
  };
  D.q = (st, r) => {
    if (st == 0) return sortQ(0, r);
    if (st == 1) {
      // listen: hear the words, tap the picture (three of the lesson's pictures)
      const xs = ls6Draw(r, P(), 3), x = xs[0], full = esFull(x[0]), ch = ls4Shuf(r, xs);
      return ls4Q(D, 1, {kind: 'choice', cls: 'pics pk3', ans: full, choices: ch.map(([it]) => ({v: esFull(it), l: ls6Pic(it), h: true})), sl: {}, bug: {esWord: xs.slice(1).map(y => esFull(y[0]))},
        vsay: v => ls6M(v), html: `<div class="pkq">${ls6Ear(full)}</div>` + lsAsk('Tap the picture.'), say: `Listen. ${ls6M(full)}. Tap its picture.`,
        hint: {k: 'text', s: 'Tap the speaker. Listen to the whole word.'}, label: `${id} hear ${full}`});
    }
    return pickQ(st, r, st == 3 ? 4 : 3);
  };
  D.exp = r => {
    const q = sortQ(0, r, {label: `${id} explore`});
    return {q, names: q.names, nudge: 'Not yet. Tap each picture. Listen for el or la.',
      react: () => { const e = q.items.find(c => c.b == 'el'), l = q.items.find(c => c.b == 'la'); return {ctx: {a: e.v, b: l.v}, lines: ['You sorted them by the little word.']}; }};
  };
  // Name it: the el word and the la word the child sorted, with their pictures
  const byFull = f => ls6Nouns(units).find(x => esFull(x[0]) === f) || ls6Nouns(units)[0];
  D.name = c => {
    const a = c.a || esFull(ls6Nouns(units).find(x => x[0][3] == 'el')[0]), b = c.b || esFull(ls6Nouns(units).find(x => x[0][3] == 'la')[0]);
    const col = (f, art) => `<div class="ls6-col"><span class="ls6-art">${art}</span><span class="ls4-nw">${ls6Pic(byFull(f)[0])}<span class="ls6-ph1">${esc(f)}</span></span></div>`;
    return {html: `<div class="ls6-two">${col(a, 'el')}${col(b, 'la')}</div>`, sl: {a: ls6M(a), b: ls6M(b)}};
  };
  // say it with me: the la word (or the el word), big, with its speaker; the child says it and taps "I said it!" (nothing listens)
  D.also = c => {
    const f = c.b || c.a;
    if (!f) return null;
    const it = byFull(f)[0];
    return [{m: 'say', with: 1, nx: 'I said it!', html: `<div class="ls6-say"><span class="ls4-nw">${ls6Pic(it)}<span class="ls6-ph1 ls6-big">${esc(f)}</span></span>${ls6Ear(f, 'Hear it again in Spanish')}</div>`,
      lines: [LS6_SAY[lsAge(typeof gradeOf == 'function' ? gradeOf() : 0)], ls6M(f)]}];
  };
  D.fix = q => q;
  // Remember, when nothing older is due: a word of the unit before, heard, and its picture tapped
  const wu = o && o.warmU;
  D.warm = wu ? r => {
    const u = ES_UNITS.find(x => x.id == wu), xs = ls4Shuf(r, u.items.filter(it => !LS6_NOPIC.includes(it[0]))).slice(0, 3), f = esFull(xs[0]), ch = ls4Shuf(r, xs);
    return ls4Q(D, 0, {kind: 'choice', cls: 'pics pk3', ans: f, choices: ch.map(it => ({v: esFull(it), l: ls6Pic(it), h: true})), sl: {}, vsay: v => ls6M(v),
      html: `<div class="pkq">${ls6Ear(f)}</div>` + lsAsk('Tap the picture.'), say: `Listen. ${ls6M(f)}. Tap its picture.`, hint: {k: 'text', s: 'Tap the speaker and listen again.'}, label: `warm ${f}`});
  } : null;
  return D;
}

/* ================= Discover: predict, look, explain ================= */
// the things: [what the pet and the lesson call it, art name, emoji fallback]
const LS6_TH = {
  leaf: ['leaf', 'leaf', '🍃'], boat: ['toy boat', 'boat', '⛵'], apple: ['apple', 'apple', '🍎'], sponge: ['sponge', '', '🧽'], ball: ['ball', 'ball', '⚽'],
  duck: ['duck', 'duck', '🦆'], coin: ['coin', '', '🪙'], ring: ['ring', '', '💍'], rock: ['rock', '', '🪨'], hammer: ['hammer', '', '🔨'], brick: ['brick', '', '🧱'],
  chick: ['chick', 'chick', '🐥'], hen: ['hen', 'hen', '🐔'], seed: ['seedling', '', '🌱'], sunfl: ['sunflower', 'sunflower', '🌻'], baby: ['baby', '', '👶'], girl: ['child', '', '👧'],
  car: ['car', 'car', '🚗'], train: ['train', 'train', '🚂'], robot: ['robot', '', '🤖'], kite: ['kite', 'kite', '🪁'], teddy: ['teddy bear', '', '🧸'], bike: ['bike', 'bike', '🚲'],
  tree: ['tree', 'tree', '🌳'], fish: ['fish', 'fish', '🐟'], bird: ['bird', 'bird', '🐦'], flower: ['flower', 'flower', '🌷'], frog: ['frog', 'frog', '🐸'],
  ice: ['ice cube', '', '🧊'], snowman: ['snowman', 'snowman', '⛄'], icecream: ['ice cream', 'icecream', '🍦'], flake: ['snowflake', 'snowflake', '❄'],
  book: ['book', 'book', '📖'], shell: ['shell', 'shell', '🐚'], spoon: ['spoon', 'spoon', '🥄'], water: ['water', 'water', '💧'], sun: ['sun', 'sun', '☀'],
};
const ls6N = k => LS6_TH[k][0];
const ls6The = k => 'the ' + ls6N(k);
const ls6Cap = s => s.charAt(0).toUpperCase() + s.slice(1);
/* a question's spoken lines, short enough for the little one (12 words a line): the scene and the question, then the choices read out.
   One line (q.say) when it fits; else the scene and the question are told first (q.tell, said before q.say: LS.show) */
const ls6W = t => String(t).trim().split(/\s+/).length;
function ls6Say(scene, ask, list) {
  const tell = scene ? [scene] : [], full = ask + ' ' + list;
  return ls6W(full) <= 12 ? {tell, say: full} : {tell: tell.concat([ask]), say: list};
}
const ls6DP = (k, cls) => `<span class="ls4-pic${cls ? ' ' + cls : ''}">${picFor(LS6_TH[k][1], LS6_TH[k][2])}<span class="a11y-h">${esc(ls6N(k))}</span></span>`;
const ls6DCh = ks => ks.map(k => ({v: k, l: ls6DP(k), h: true}));
const ls6DChip = (k, b) => ({v: k, l: ls6DP(k), h: true, b, say: ls6N(k), al: ls6N(k)});
// the shared shape: C {bins [[v, label, icon]], yes (bin of the "it does" side), pool: {k: bin}, ask(k-list...) builders below}
function ls6Disc(id, t, C, o) {
  const D = ls6D(id, t, 'disc', 0, 'disc', Object.assign({bugs: C.bugs, slots: LS6_SL.disc, claim: 'I pick {ans}. Am I right?', petSt: 1}, o));
  const bins = C.bins.map(([v, l, ic]) => ({v, l: `${ico(ic, 24)}<span>${l}</span>`, h: true, al: l}));
  const binOf = k => C.pool[k];
  // a sort of four: two of each side
  const four = r => ls4Shuf(r, ls4Shuf(r, C.sortA()).slice(0, 2).concat(ls4Shuf(r, C.sortB()).slice(0, 2)));
  const sortQ = (st, r, goal, o2) => {
    const ks = four(r), items = ks.map(k => ls6DChip(k, binOf(k)));
    return Object.assign(ls4Sort(D, st, bins, items, Object.assign({goal, demo: goal ? items.map(c => c.b) : undefined, bug: C.sortBug ? C.sortBug(ks) : {}, sl: {}, html: lsAsk(C.sortAsk), say: C.sortSay,
      hint: {k: 'text', s: C.sortHint}, look: C.sortLook(ks), label: `${id} sort ${ks.join('/')}`}, o2)), {names: ls4Names(items)});
  };
  D.q = (st, r) => {
    if (st == 0) return sortQ(0, r);
    if (st == 1) return C.predict(D, 1, r, 3);
    if (st == 2) return C.explain(D, 2, r);
    return r() < .5 ? C.predict(D, 2, r, 4) : C.explain(D, 2, r); // Show and the test-out: a prediction of four, or a reason of three
  };
  D.exp = r => {
    const q = sortQ(0, r, 'any', {look: null, label: `${id} predict`, say: C.expSay});
    return {q, names: q.names, nudge: 'Put every picture in a group. Any guess is fine.',
      react: () => { const ks = q.items.map(c => c.v), a = ks.find(k => binOf(k) == C.bins[0][0]), b = ks.find(k => binOf(k) == C.bins[1][0]); return {ctx: {a, b}, lines: [C.expDone]}; }};
  };
  D.name = (c, r) => {
    const a = c.a && LS6_TH[c.a] ? c.a : C.sortA()[0], b = c.b && LS6_TH[c.b] ? c.b : C.sortB()[0];
    return {html: C.look(a, b), sl: {a: ls6N(a), b: ls6N(b)}};
  };
  D.fix = q => q;
  D.warm = C.warm ? r => C.warm(D, r) : null;
  return D;
}
// the "look" picture: what really happens, after the child's prediction
const ls6Look = (cells, cls) => `<div class="ls6-look${cls ? ' ' + cls : ''}">${cells.map(([k, cap, k2]) => `<div class="ls6-lk"><span class="ls6-lkp">${ls6DP(k)}${k2 ? `${ico('arrow-right', 22)}${ls6DP(k2)}` : ''}</span><span class="ls6-lkc">${esc(cap)}</span></div>`).join('')}</div>`;
// a reason to pick, read aloud: [right, ...wrong] with their codes
function ls6Why(D, st, r, head, say, right, wrongs, label, look) {
  const ch = ls4Shuf(r, [right].concat(wrongs.map(w => w[0]))), bug = {};
  for (const [w, c] of wrongs) if (c) (bug[c] = bug[c] || []).push(w);
  return ls4Q(D, st, {kind: 'choice', cls: 'ls4-words ls6-why', ans: right, choices: ls4TxtCh(ch), sl: {}, bug, vsay: v => v, look,
    // the scene and the question, then each reason read out on its own line (a reader and a non-reader hear the same choices)
    html: head + lsAsk(say), tell: say.split(/(?<=[.!?]) /).concat(ch), say: 'Which one is right?',
    hint: {k: 'text', s: 'Think about what really happens. Then pick the reason.'}, label});
}

/* ---- Push, Pull & Stuff (sci_phys1): sink or float. Size alone does not decide: a small coin sinks, a big toy boat floats ---- */
const LS6_FL = {leaf: 1, apple: 2, sponge: 2, ball: 3, duck: 3, boat: 4}, LS6_SK = {coin: 1, ring: 1, rock: 2, hammer: 3, brick: 3};
const ls6Size = k => LS6_FL[k] || LS6_SK[k];
const LS6_FLOAT = {
  bugs: ['dBig'], bins: [['f', 'Floats', 'arrow-up'], ['s', 'Sinks', 'arrow-down']],
  pool: Object.assign(...Object.keys(LS6_FL).map(k => ({[k]: 'f'})), ...Object.keys(LS6_SK).map(k => ({[k]: 's'}))),
  sortA: () => Object.keys(LS6_FL), sortB: () => Object.keys(LS6_SK),
  sortAsk: 'Floats or sinks?', sortSay: 'Will it float or sink? Sort the pictures.', expSay: 'Will it float or sink? Guess, and sort them.',
  sortHint: 'Light for its size floats. Heavy for its size sinks.', expDone: "Let's look in the water!",
  // the small ones on the float side, the big ones on the sink side: what "small floats" would sort
  sortBug: ks => ({dBig: [ks.map(k => (ls6Size(k) <= 1 ? 'f' : ls6Size(k) >= 3 ? 's' : LS6_FLOAT.pool[k])).join('|')]}),
  sortLook: ks => `Look! ${ls6Cap(ls6The(ks.find(k => LS6_FL[k])))} floats. ${ls6Cap(ls6The(ks.find(k => LS6_SK[k])))} sinks.`,
  look: (a, b) => `<div class="ls6-tank" aria-hidden="true"><span class="ls6-top">${ls6DP(a)}</span><span class="ls6-bot">${ls6DP(b)}</span></div>`
    + `<div class="a11y-h">In the water: the ${esc(ls6N(a))} floats on top, the ${esc(ls6N(b))} sinks to the bottom.</div>`,
  // which one floats (one floater, a small sinker among the others) or which one sinks (one small sinker, a big floater among them)
  predict(D, st, r, n) {
    const up = r() < .5, F = Object.keys(LS6_FL), K = Object.keys(LS6_SK);
    let ks, ans, big;
    if (up) { ans = ls4Pick(r, F.filter(k => LS6_FL[k] >= 2)); const sm = ls4Pick(r, K.filter(k => LS6_SK[k] == 1)); ks = [ans, sm].concat(ls4Shuf(r, K.filter(k => k !== sm)).slice(0, n - 2)); big = [sm]; }
    else { ans = ls4Pick(r, K.filter(k => LS6_SK[k] <= 2)); const bg = ls4Pick(r, F.filter(k => LS6_FL[k] > LS6_SK[ans])); ks = [ans, bg].concat(ls4Shuf(r, F.filter(k => k !== bg)).slice(0, n - 2)); big = [bg]; }
    const ch = ls4Shuf(r, ks), ask = up ? 'Which one will float?' : 'Which one will sink?';
    return ls4Q(D, st, {kind: 'choice', cls: `pics pk${n}`, ans, choices: ls6DCh(ch), sl: {}, bug: {dBig: big}, vsay: ls6The, look: `Look! ${ls6Cap(ls6The(ans))} ${up ? 'floats' : 'sinks'}.`,
      html: `<div class="emo ls6-wat" aria-hidden="true">${picFor('water', '💧')}</div>` + lsAsk(ask), ...ls6Say('', ask, ls6OrC(ch.map(ls6The)) + '?'),
      hint: {k: 'text', s: 'Not big or small: is it light or heavy for its size?'}, label: `${D.id} ${up ? 'float' : 'sink'} ${ch.join('/')}`});
  },
  explain(D, st, r) {
    const up = r() < .5, k = up ? ls4Pick(r, Object.keys(LS6_FL)) : ls4Pick(r, Object.keys(LS6_SK)), s = ls6Size(k);
    const head = `<div class="emo">${ls6DP(k)}</div>`, say = `${ls6Cap(ls6The(k))} ${up ? 'floats' : 'sinks'}. Why?`;
    return up ? ls6Why(D, st, r, head, say, 'It is light for its size.', [[s <= 2 ? 'It is small.' : 'It is big.', s <= 2 ? 'dBig' : null], ['It is heavy.', null]], `${D.id} why ${k} floats`, `${ls6Cap(ls6The(k))} is light for its size.`)
      : ls6Why(D, st, r, head, say, 'It is heavy for its size.', [[s >= 2 ? 'It is big.' : 'It is small.', s >= 2 ? 'dBig' : null], ['It has air inside.', null]], `${D.id} why ${k} sinks`, `${ls6Cap(ls6The(k))} is heavy for its size.`);
  },
};

/* ---- Living Things (sci_life1): what is alive grows. A car moves but never grows; a seedling stays still and grows ---- */
const LS6_YOUNG = {chick: 'hen', seed: 'sunfl', baby: 'girl'}, LS6_ALIVE = ['chick', 'seed', 'baby', 'tree', 'fish', 'bird', 'flower', 'frog'], LS6_PLANT = ['seed', 'tree', 'flower'];
const LS6_NOT = ['ball', 'car', 'rock', 'teddy', 'robot', 'train', 'kite', 'bike'], LS6_MOVE = ['ball', 'car', 'robot', 'train', 'kite', 'bike'];
const LS6_GROW = {
  bugs: ['dMove', 'dStill'], bins: [['g', 'Will grow', 'arrow-up'], ['n', 'Will not grow', 'close']],
  pool: Object.assign(...Object.keys(LS6_YOUNG).map(k => ({[k]: 'g'})), ...LS6_NOT.map(k => ({[k]: 'n'}))),
  sortA: () => Object.keys(LS6_YOUNG), sortB: () => LS6_NOT,
  sortAsk: 'Will it grow?', sortSay: 'Will it grow bigger? Sort the pictures.', expSay: 'Will it grow bigger? Guess, and sort them.',
  sortHint: 'Living things grow. Toys and rocks do not.', expDone: "Let's look at them later on!",
  sortBug: ks => ({dMove: [ks.map(k => (LS6_MOVE.includes(k) ? 'g' : LS6_GROW.pool[k])).join('|')], dStill: [ks.map(k => (k == 'seed' ? 'n' : LS6_GROW.pool[k])).join('|')]}),
  sortLook: ks => { const a = ks.find(k => LS6_YOUNG[k]); return `Look! ${ls6Cap(ls6The(a))} grows into a ${ls6N(LS6_YOUNG[a])}.`; },
  look: (a, b) => ls6Look([[a, `The ${ls6N(a)} grew.`, LS6_YOUNG[a]], [b, `The ${ls6N(b)} did not.`, b]]),
  // which one will grow bigger (a young living thing among things that do not grow, one of them a thing that moves), or which one is alive
  predict(D, st, r, n) {
    const alive = r() < .5, ans = alive ? ls4Pick(r, LS6_ALIVE) : ls4Pick(r, Object.keys(LS6_YOUNG)), mv = ls4Pick(r, LS6_MOVE);
    const ks = [ans, mv].concat(ls4Shuf(r, LS6_NOT.filter(k => k !== mv)).slice(0, n - 2)), ch = ls4Shuf(r, ks), ask = alive ? 'Which one is alive?' : 'Which one will grow bigger?';
    return ls4Q(D, st, {kind: 'choice', cls: `pics pk${n}`, ans, choices: ls6DCh(ch), sl: {}, bug: {dMove: [mv]}, vsay: ls6The,
      look: alive ? `Look! ${ls6Cap(ls6The(ans))} is alive. It grows.` : `Look! ${ls6Cap(ls6The(ans))} grows into a ${ls6N(LS6_YOUNG[ans])}.`,
      html: lsAsk(ask), ...ls6Say('', ask, ls6OrC(ch.map(ls6The)) + '?'), hint: {k: 'text', s: 'Moving is not growing. Which one grows?'}, label: `${D.id} ${alive ? 'alive' : 'grow'} ${ch.join('/')}`});
  },
  // is it alive, and how do we know: a thing that moves (dMove) or a plant (dStill)
  explain(D, st, r) {
    const pl = r() < .5, k = pl ? ls4Pick(r, LS6_PLANT) : ls4Pick(r, LS6_MOVE), head = `<div class="emo">${ls6DP(k)}</div>`, say = `Is ${ls6The(k)} alive?`;
    return pl ? ls6Why(D, st, r, head, say, 'Yes, it grows.', [['No, it does not move.', 'dStill'], ['No, it is green.', null]], `${D.id} why ${k} alive`, `${ls6Cap(ls6The(k))} is alive. It grows.`)
      : ls6Why(D, st, r, head, say, 'No, it does not grow.', [['Yes, it moves.', 'dMove'], ['Yes, it is big.', null]], `${D.id} why ${k} not alive`, `${ls6Cap(ls6The(k))} moves, but it does not grow.`);
  },
};

/* ---- Sky & Earth (sci_earth1): sunlight warms things; ice in the sun melts first, and a rock stays a rock ---- */
const LS6_MELT = ['ice', 'snowman', 'icecream', 'flake'], LS6_STAY = ['rock', 'ball', 'book', 'shell', 'brick', 'spoon'], LS6_COLD = ['ice', 'snowman', 'icecream'];
// a thing in the sun, or in the shade of a tree
// ice and snow melt into water; ice cream just melts (it is not water)
const ls6Melts = k => (k == 'icecream' ? 'melts' : 'melts into water');
const ls6SunPic = (k, sun) => `<span class="ls6-sc">${ls6DP(sun ? 'sun' : 'tree', 'ls6-sm')}${ls6DP(k)}</span>`;
const LS6_SUN = {
  bugs: ['dSun', 'dAll'], bins: [['m', 'Melts', 'drop'], ['s', 'Stays the same', 'check']],
  pool: Object.assign(...LS6_MELT.map(k => ({[k]: 'm'})), ...LS6_STAY.map(k => ({[k]: 's'}))),
  sortA: () => LS6_MELT, sortB: () => LS6_STAY,
  sortAsk: 'In the hot sun?', sortSay: 'On a hot sunny day, will it melt? Sort the pictures.', expSay: 'On a hot sunny day, will it melt? Guess, and sort them.',
  sortHint: 'Frozen things melt when they warm up.', expDone: "Let's look after a sunny day!",
  sortBug: ks => ({dAll: [ks.map(() => 'm').join('|')]}),
  sortLook: ks => { const k = ks.find(x => LS6_MELT.includes(x)); return `Look! ${ls6Cap(ls6The(k))} ${ls6Melts(k)}.`; },
  look: (a, b) => ls6Look([[a, a == 'icecream' ? 'The ice cream melted.' : `The ${ls6N(a)} melted into water.`, a == 'icecream' ? null : 'water'], [b, `The ${ls6N(b)} stayed the same.`, b]]),
  // which one melts first, in the sun or in the shade (dSun picks the shade, or "the same"); or which one will melt
  predict(D, st, r, n) {
    if (n == 3 && r() < .5 || n == 4 && r() < .3) {
      const k = ls4Pick(r, LS6_COLD), ch = ls4Shuf(r, ['sun', 'shade', 'same']), lab = {sun: `In the sun`, shade: 'In the shade', same: 'Both the same'};
      const pic = {sun: ls6SunPic(k, 1), shade: ls6SunPic(k, 0), same: `<span class="ls6-eq">=</span>`};
      return ls4Q(D, st, {kind: 'choice', cls: 'pics pk3 ls6-sh', ans: 'sun', choices: ch.map(v => ({v, l: `<span class="ls6-shc">${pic[v]}<small>${lab[v]}</small></span>`, h: true})), sl: {},
        bug: {dSun: ['shade', 'same']}, vsay: v => ({sun: 'in the sun', shade: 'in the shade', same: 'both the same'})[v], look: `Look! ${ls6Cap(ls6The(k))} in the sun melts first.`,
        html: `<div class="emo">${ls6DP(k)}${ls6DP(k)}</div>` + lsAsk('Which melts first?'), ...ls6Say(`One ${ls6N(k)} is in the sun. One is in the shade.`, 'Which melts first?', ls6OrC(ch.map(v => ({sun: 'in the sun', shade: 'in the shade', same: 'both the same'})[v])) + '?'),
        hint: {k: 'text', s: 'Where is it warmer: in the sun, or in the shade?'}, label: `${D.id} sun ${k} ${ch.join('/')}`});
    }
    const ans = ls4Pick(r, LS6_MELT), ks = [ans].concat(ls4Shuf(r, LS6_STAY).slice(0, n - 1)), ch = ls4Shuf(r, ks);
    return ls4Q(D, st, {kind: 'choice', cls: `pics pk${n}`, ans, choices: ls6DCh(ch), sl: {}, bug: {dAll: ks.slice(1)}, vsay: ls6The, look: `Look! ${ls6Cap(ls6The(ans))} ${ls6Melts(ans)}.`,
      html: `<div class="emo" aria-hidden="true">${picFor('sun', '☀')}</div>` + lsAsk('Which one will melt?'), ...ls6Say('It is a hot sunny day.', 'Which one will melt?', ls6OrC(ch.map(ls6The)) + '?'),
      hint: {k: 'text', s: 'Which one is frozen?'}, label: `${D.id} melt ${ch.join('/')}`});
  },
  explain(D, st, r) {
    const ice = r() < .5;
    if (ice) {
      const k = ls4Pick(r, LS6_COLD), head = `<div class="emo">${ls6SunPic(k, 1)}${ls6SunPic(k, 0)}</div>`;
      return ls6Why(D, st, r, head, `${ls6Cap(ls6The(k))} in the sun melted first. Why?`, 'The sun warmed it up.', [['The shade warmed it up.', 'dSun'], ['It was a windy day.', null]],
        `${D.id} why sun ${k}`, 'Sunlight warms things up.');
    }
    const k = ls4Pick(r, LS6_STAY), head = `<div class="emo">${ls6SunPic(k, 1)}</div>`;
    return ls6Why(D, st, r, head, `${ls6Cap(ls6The(k))} sits in the hot sun all day. What will happen?`, 'It will get warm, but it will not melt.', [['It will melt into water.', 'dAll'], ['It will get cold.', null]],
      `${D.id} why ${k} stays`, `${ls6Cap(ls6The(k))} gets warm, but it does not melt.`);
  },
  // Remember: is it alive (the lesson before: Living Things)
  warm: (D, r) => LS6_GROW.predict(D, 0, r, 3),
};
LS6_FLOAT.warm = (D, r) => LS6_SUN.predict(D, 0, r, 3);
/* ---------- TEACH-5S: the words of the drafted lessons the owner has reviewed (part teaches) ----------
   BUILT by tools/build.py from docs/drafts/<stop>.md ("status: reviewed ...") for the scripts that name them (lsDraft5, 52t-lessons5s.js):
   never edit by hand. A draft that is not reviewed is never here, so its lesson is not live with its words (it runs on its hand-written fallback words). */
const LSW5 = {
  "es_animal1": {"idea":"Spanish words for things come with el or la. Learn them together.","beats":{"remember":["Here is a word from before."],"explore":["Listen for el or la. Then sort each picture."],"name":["{a} is an el word.","{b} is a la word.","Spanish words for things come with el or la. Learn them together."],"together":["Sort these into el words and la words.","Listen to the whole word. Then tap its picture.","Say each one quietly. Which one sounds right?"],"check":["My turn. Check me!","I pick {ans}. Am I right?"],"show":["The pet shop needs name tags. Pick the right words."]},"reasons":{"esArt":["Oops. I put the wrong little word in front."],"esEnd":["Oops. I went by the last letter. It is only a clue."],"esWord":["Oops. I picked a different word."]},"home":"Ask {name} to say \"el perro\" and \"la vaca\" with you."},
  "es_art1": {"idea":"Listen for el or la. The last letter is only a clue.","beats":{"remember":["Here is a word from before."],"explore":["Listen for el or la. Then sort each picture."],"name":["{a} is an el word.","{b} is a la word.","Listen for el or la. The last letter is only a clue."],"together":["Sort these into el words and la words.","Listen to the whole word. Then tap its picture.","Say each one quietly. Which one sounds right?"],"check":["My turn. Check me!","I pick {ans}. Am I right?"],"show":["The market needs price tags. Pick the right words."]},"reasons":{"esArt":["Oops. I put the wrong little word in front."],"esEnd":["Oops. I went by the last letter. It is only a clue."],"esWord":["Oops. I picked a different word."]},"home":"Ask {name} for a word that ends in o but takes la. (la mano)"},
  "es_body1": {"idea":"Spanish words for things come with el or la. Learn them together.","beats":{"remember":["Here is a word from before."],"explore":["Listen for el or la. Then sort each picture."],"name":["{a} is an el word.","{b} is a la word.","Spanish words for things come with el or la. Learn them together."],"together":["Sort these into el words and la words.","Listen to the whole word. Then tap its picture.","Say each one quietly. Which one sounds right?"],"check":["My turn. Check me!","I pick {ans}. Am I right?"],"show":["The doctor's chart needs labels. Pick the right words."]},"reasons":{"esArt":["Oops. I put the wrong little word in front."],"esEnd":["Oops. I went by the last letter. It is only a clue."],"esWord":["Oops. I picked a different word."]},"home":"Ask {name} to point and say \"la mano\" and \"el pie\"."},
  "es_clothes1": {"idea":"Spanish words for things come with el or la. Learn them together.","beats":{"remember":["Here is a word from before."],"explore":["Listen for el or la. Then sort each picture."],"name":["{a} is an el word.","{b} is a la word.","Spanish words for things come with el or la. Learn them together."],"together":["Sort these into el words and la words.","Listen to the whole word. Then tap its picture.","Say each one quietly. Which one sounds right?"],"check":["My turn. Check me!","I pick {ans}. Am I right?"],"show":["The clothes shop needs price tags. Pick the right words."]},"reasons":{"esArt":["Oops. I put the wrong little word in front."],"esEnd":["Oops. I went by the last letter. It is only a clue."],"esWord":["Oops. I picked a different word."]},"home":"Ask {name}: is a shirt \"el camisa\" or \"la camisa\"? (la camisa)"},
  "es_family1": {"idea":"Spanish words for things come with el or la. Learn them together.","beats":{"remember":["Here is a word from before."],"explore":["Listen for el or la. Then sort each picture."],"name":["{a} is an el word.","{b} is a la word.","Spanish words for things come with el or la. Learn them together."],"together":["Sort these into el words and la words.","Listen to the whole word. Then tap its picture.","Say each one quietly. Which one sounds right?"],"check":["My turn. Check me!","I pick {ans}. Am I right?"],"show":["The family album needs labels. Pick the right words."]},"reasons":{"esArt":["Oops. I put the wrong little word in front."],"esEnd":["Oops. I went by the last letter. It is only a clue."],"esWord":["Oops. I picked a different word."]},"home":"Ask {name} who is \"la mamá\" and who is \"el papá\"."},
  "es_food1": {"idea":"Spanish words for things come with el or la. Learn them together.","beats":{"remember":["Here is a word from before."],"explore":["Listen for el or la. Then sort each picture."],"name":["{a} is an el word.","{b} is a la word.","Spanish words for things come with el or la. Learn them together."],"together":["Sort these into el words and la words.","Listen to the whole word. Then tap its picture.","Say each one quietly. Which one sounds right?"],"check":["My turn. Check me!","I pick {ans}. Am I right?"],"show":["The snack bar needs menu cards. Pick the right words."]},"reasons":{"esArt":["Oops. I put the wrong little word in front."],"esEnd":["Oops. I went by the last letter. It is only a clue."],"esWord":["Oops. I picked a different word."]},"home":"Ask {name}: is it \"el pan\" or \"la pan\"? (el pan)"},
  "es_house1": {"idea":"Spanish words for things come with el or la. Learn them together.","beats":{"remember":["Here is a word from before."],"explore":["Listen for el or la. Then sort each picture."],"name":["{a} is an el word.","{b} is a la word.","Spanish words for things come with el or la. Learn them together."],"together":["Sort these into el words and la words.","Listen to the whole word. Then tap its picture.","Say each one quietly. Which one sounds right?"],"check":["My turn. Check me!","I pick {ans}. Am I right?"],"show":["Help me label the rooms and things. Pick the right words."]},"reasons":{"esArt":["Oops. I put the wrong little word in front."],"esEnd":["Oops. I went by the last letter. It is only a clue."],"esWord":["Oops. I picked a different word."]},"home":"Ask {name} to show you \"la puerta\" and \"la ventana\"."},
  "es_school1": {"idea":"Spanish words for things come with el or la. Learn them together.","beats":{"remember":["Here is a word from before."],"explore":["Listen for el or la. Then sort each picture."],"name":["{a} is an el word.","{b} is a la word.","Spanish words for things come with el or la. Learn them together."],"together":["Sort these into el words and la words.","Listen to the whole word. Then tap its picture.","Say each one quietly. Which one sounds right?"],"check":["My turn. Check me!","I pick {ans}. Am I right?"],"show":["The classroom needs labels. Pick the right words."]},"reasons":{"esArt":["Oops. I put the wrong little word in front."],"esEnd":["Oops. I went by the last letter. It is only a clue."],"esWord":["Oops. I picked a different word."]},"home":"Ask {name} to say \"el libro\" and \"la mochila\"."},
  "es_trans1": {"idea":"Spanish words for things come with el or la. Learn them together.","beats":{"remember":["Here is a word from before."],"explore":["Listen for el or la. Then sort each picture."],"name":["{a} is an el word.","{b} is a la word.","Spanish words for things come with el or la. Learn them together."],"together":["Sort these into el words and la words.","Listen to the whole word. Then tap its picture.","Say each one quietly. Which one sounds right?"],"check":["My turn. Check me!","I pick {ans}. Am I right?"],"show":["The bus station needs signs. Pick the right words."]},"reasons":{"esArt":["Oops. I put the wrong little word in front."],"esEnd":["Oops. I went by the last letter. It is only a clue."],"esWord":["Oops. I picked a different word."]},"home":"Ask {name}: \"moto\" ends in o. Is it \"el moto\" or \"la moto\"?"},
  "sci_earth1": {"idea":"Sunlight warms things up. Ice in the sun melts first.","beats":{"remember":["Do you remember this one?"],"explore":["Guess which ones will melt in the hot sun. Any guess works."],"name":["Look! The {a} melted.","The {b} stayed the same.","Sunlight warms things up. Ice in the sun melts first."],"together":["Sort them again. Is it something frozen?","Think: where is it warmer?","Now pick the reason."],"check":["My turn. Check me!","I pick {ans}. Am I right?"],"show":["Help the park ranger plan for a hot sunny day."]},"reasons":{"dSun":["Oops. The sun warms things more than the shade does."],"dAll":["Oops. Only frozen things melt in the sun. The rest stay."]},"home":"Ask {name}: where would ice melt first, in the sun or the shade?"},
  "sci_life1": {"idea":"Living things grow. Toys and rocks do not grow.","beats":{"remember":["Do you remember this one?"],"explore":["Guess which ones will grow bigger. Any guess is fine."],"name":["Look! The {a} grew. The {b} did not.","Living things grow. Toys and rocks do not grow."],"together":["Sort them again. Think: is it alive?","Remember, moving is not the same as growing.","Now pick the reason."],"check":["My turn. Check me!","I pick {ans}. Am I right?"],"show":["The trail needs a sign about living things. Help me."]},"reasons":{"dMove":["Oops. It moves, but it does not grow. It is not alive."],"dStill":["Oops. A plant stays still, but it grows. It is alive."]},"home":"Ask {name}: is a tree alive? How do you know?"},
  "sci_phys1": {"idea":"Size does not decide. Light for its size floats.","beats":{"remember":["Do you remember this one?"],"explore":["Guess: will it float or sink? Any guess is fine."],"name":["Look! The {a} floats. The {b} sinks.","Size does not decide.","Light for its size floats. Heavy for its size sinks."],"together":["Sort them again. Light or heavy for its size?","Do not go by size alone.","Now pick the reason."],"check":["My turn. Check me!","I pick {ans}. Am I right?"],"show":["We are packing for a pond trip. Show me what you know."]},"reasons":{"dBig":["Oops. I went by size. Light for its size floats."]},"home":"Ask {name} to guess what floats in the bath, then try it."},
};
/* ---------- TEACH-5S (v187): the Spanish and Discover lessons (part teaches; their shapes: 52s-bench5s.js) ----------
   In map order. Each is a real stop with the stop's own name; the idea, tonight's question and the fallback Name it line are
   hand-written here, the rest of the fallback is the engine's tone lines and each code's repair line (lsFallback4). Their drafted words
   are batch '5s' (D.b5s): docs/drafts/BATCH5S-READ.md, until the owner approves them.
   Spanish: the "Listen" stop of every unit of things (one el or la word each), and El or La?. The Spanish map is the same for every
   grade, so these lessons are for every child (lsBand), in the pet's tone for the child's age; their lines fit all three ages.
   Not built, and why: the units with no "el" or "la" words (greetings, colours, numbers, feelings, days, months, weather, time, action
   words, opposites: no article to fix; the pet's slip there would be a different lesson shape); Places in Town (its pictures do not show
   the word: el parque is a tree, el restaurante a plate, el mercado a carrot, and the unit shows English under every picture); the
   "Read" and "Spell" stops (their own practice of a unit a lesson has taught); Un, Una & Plurals, Ser, Estar, Tener, Me Gusta and the
   sentence and story stops (other shapes). Discover: the three K-2 science stops of Nature Trail. Not built: Maps & Land and Our
   Community (geography and civics: no prediction to test), and the grade 3-6 science stops (their ideas need diagrams the app does not
   draw: food webs, the water cycle, moon phases, circuits). */
// Hola Plaza
lsDraft5('es_animal1', ls6Spanish('es_animal1', 'Animals', ['animal'], {warmU: 'color', idea: 'Every Spanish naming word comes with el or la. Learn them together.',
  fb: '{a} is an el word. {b} is a la word.', home: 'Ask {name} to say "el perro" and "la vaca" with you.'}));
// Fiesta Island
lsDraft5('es_food1', ls6Spanish('es_food1', 'Food', ['food'], {warmU: 'animal', idea: 'Every Spanish naming word comes with el or la. Learn them together.',
  fb: '{a} is an el word. {b} is a la word.', home: 'Ask {name}: is it "el pan" or "la pan"?'}));
lsDraft5('es_body1', ls6Spanish('es_body1', 'My Body', ['body'], {warmU: 'food', idea: 'Every Spanish naming word comes with el or la. Learn them together.',
  fb: '{a} is an el word. {b} is a la word.', home: 'Ask {name} to point and say "la mano" and "el pie".'}));
lsDraft5('es_family1', ls6Spanish('es_family1', 'Family', ['family'], {warmU: 'body', idea: 'Every Spanish naming word comes with el or la. Learn them together.',
  fb: '{a} is an el word. {b} is a la word.', home: 'Ask {name} who is "la mamá" and who is "el papá".'}));
// La Casa
lsDraft5('es_house1', ls6Spanish('es_house1', 'Casa Dulce Casa', ['house'], {warmU: 'family', idea: 'Every Spanish naming word comes with el or la. Learn them together.',
  fb: '{a} is an el word. {b} is a la word.', home: 'Ask {name} to show you "la puerta" and "la ventana".'}));
lsDraft5('es_clothes1', ls6Spanish('es_clothes1', '¡A Vestirse!', ['clothes'], {warmU: 'house', idea: 'Every Spanish naming word comes with el or la. Learn them together.',
  fb: '{a} is an el word. {b} is a la word.', home: 'Ask {name}: is your shirt "el camisa" or "la camisa"?'}));
lsDraft5('es_school1', ls6Spanish('es_school1', 'A la Escuela', ['school'], {warmU: 'clothes', idea: 'Every Spanish naming word comes with el or la. Learn them together.',
  fb: '{a} is an el word. {b} is a la word.', home: 'Ask {name} to say "el libro" and "la mochila".'}));
// La Ciudad
lsDraft5('es_trans1', ls6Spanish('es_trans1', 'Transport', ['trans'], {warmU: 'school', idea: 'Every Spanish naming word comes with el or la. Learn them together.',
  fb: '{a} is an el word. {b} is a la word.', home: 'Ask {name}: "moto" ends in o. Is it "el moto" or "la moto"?'}));
// Las Frases: every noun the lessons above teach, and the words that break the ending rule (la mano, el papá, la moto)
lsDraft5('es_art1', ls6Spanish('es_art1', 'El or La?', ['animal', 'food', 'body', 'family', 'house', 'clothes', 'school', 'trans'], {warmU: 'trans',
  idea: 'Listen for el or la. The last letter is only a clue.', fb: '{a} is an el word. {b} is a la word.', home: 'Ask {name} for a word that ends in o but takes la.'}));

// Nature Trail (K-2 science): predict, look, explain
lsDraft5('sci_life1', ls6Disc('sci_life1', 'Living Things', LS6_GROW, {first: true, idea: 'Living things grow. Toys and rocks do not grow.',
  fb: 'Look! The {a} grew. The {b} did not.', home: 'Ask {name}: is a tree alive? How do you know?'}));
lsDraft5('sci_earth1', ls6Disc('sci_earth1', 'Sky & Earth', LS6_SUN, {idea: 'Sunlight warms things up. Ice in the sun melts first.',
  fb: 'Look! The {a} melted. The {b} stayed the same.', home: 'Ask {name}: where would ice melt first, in the sun or the shade?'}));
lsDraft5('sci_phys1', ls6Disc('sci_phys1', 'Push, Pull & Stuff', LS6_FLOAT, {idea: 'Size does not decide. Light for its size floats.',
  fb: 'Look! The {a} floats. The {b} sinks.', home: 'Ask {name} to guess what floats in the bath, then try it.'}));

var TEACHES_VER='v192'; // last line: the whole file ran (checked by dataReady() before the app starts)
