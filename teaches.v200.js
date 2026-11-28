/* Whistlestop teaches v200. BUILT by tools/build.py from 52s-teach5s.css, 52s-bench5s.js, 52s-words5.js, 52t-lessons5s.js, 52y-deep15.js, 52z-disc46.js, 52z-esmore.js, d-art-g.js, d-deep15.js, d-disc46.js, d-es-more.js: never edit by hand.
   index.html v200 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v200.js. */
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
    // audit v195 (N7): drawn like the listen question (ls6Draw): pictures that differ, and no two words the unit keeps apart (el camión / el autobús)
    const u = ES_UNITS.find(x => x.id == wu), xs = ls6Draw(r, u.items.filter(it => !LS6_NOPIC.includes(it[0])).map(it => [it, u]), 3).map(x => x[0]), f = esFull(xs[0]), ch = ls4Shuf(r, xs);
    return ls4Q(D, 0, {kind: 'choice', cls: 'pics pk3', ans: f, choices: ch.map(it => ({v: esFull(it), l: ls6Pic(it), h: true})), sl: {}, vsay: v => ls6M(v),
      html: `<div class="pkq">${ls6Ear(f)}</div>` + lsAsk('Tap the picture.'), say: `Listen. ${ls6M(f)}. Tap its picture.`, hint: {k: 'text', s: 'Tap the speaker and listen again.'}, label: `warm ${f}`});
  } : null;
  return D;
}

/* ================= Discover: predict, look, explain ================= */
// the things: [what the pet and the lesson call it, art name, emoji fallback]
const LS6_TH = {
  leaf: ['leaf', 'leaf', '🍃'], boat: ['toy boat', 'boat', '⛵'], apple: ['apple', 'apple', '🍎'], sponge: ['sponge', '', '🧽'], ball: ['ball', 'ball', '⚽'],
  duck: ['duck', 'duck', '🦆'], coin: ['coin', 'coin', '🪙'], ring: ['ring', '', '💍'], rock: ['rock', 'rock', '🪨'], hammer: ['hammer', '', '🔨'], brick: ['brick', '', '🧱'],
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
  "sci_earth1": {"idea":"Sunlight warms things up. Ice in the sun melts first.","beats":{"remember":["Do you remember this one?"],"explore":["Guess which ones will melt in the hot sun. Any guess works."],"name":["Look! The {a} melted.","The {b} stayed the same.","Sunlight warms things up. Ice in the sun melts first."],"together":["Sort them again. Is it something frozen?","Think: where is it warmer?","Now pick the reason."],"check":["My turn. Check me!","I pick {ans}. Am I right?"],"show":["Help the park ranger plan for a hot sunny day."]},"reasons":{"dSun":["Oops. The sun warms things more than the shade does."],"dAll":["Oops. Frozen things melt in the sun. These ones stay."]},"home":"Ask {name}: where would ice melt first, in the sun or the shade?"},
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
/* ---------- DEEP-15 (BEST-APP roadmap 15): deeper Discover and Spanish (part teaches; the items are in src/data/d-deep15.js) ----------
   deep15Apply() adds the drafted items, once, and only with DEEP15_ON (42d-deep15on.js, BUILT from docs/drafts/DEEP15-READ.md). With 0 it
   does nothing at all: no bank, unit, skill, map, icon or report strand changes. The part's data file calls it as its last line (the app
   loads this part after data.<VER>.js); the Discover and Spanish maps call it again after loading the part (d15Warm, d15Open in 42e-deep15.js).
   What it adds (the order matters for saved review items, which keep a bank index and a stop id):
   - Discover: match and order items at the END of each Nature Trail bank; six new skills (one stop each, max 1) with their own banks; the
     world Discovery Garden (g 1) inserted after Nature Trail. A stop is saved by its id (S.maps, nid), never by its index, so inserting a
     world moves no stars; the index of a running round (G.node) and the world picked in the strip (MAPW) are moved to match.
   - Spanish: words at the END of thirteen units (SPN shares the arrays) and two new units (esReg makes their skills), whose stops go at the
     end of La Casa and La Ciudad (before the boss).
   Returns true when it added them. */
const d15Pic = x => D15_PIC[x] || DISC_PIC[x];
// the choice rows of a new stop: as discRows (d-disc.js), grade 1-2, read aloud with the choices, pictures when every choice has one
function d15Rows(text) {
  return text.trim().split('\n').map(r => {
    const f = r.split('|'), it = {lv: 1, grade: '1-2', q: f[0], a: f[1], d: f[2].split(';'), topic: f[3], aloud: true};
    if (f[4]) it.em = f[4].split(',');
    it.hint = f[5] || D15_HINT[f[3]];
    const all = [it.a, ...it.d];
    if (all.every(d15Pic)) it.cp = Object.fromEntries(all.map(x => [x, d15Pic(x)]));
    return it;
  });
}
// a sort, match or order item of level 1 (read aloud, as the KINDS2 items of Nature Trail); a sort chip shows a picture when all have one
function d15Kind(k) {
  const it = Object.assign({lv: 1, aloud: true}, k);
  if (it.form == 'sort') { const ws = Object.values(it.bins).flat(); if (ws.every(d15Pic)) it.cp = Object.fromEntries(ws.map(w => [w, d15Pic(w)])); }
  return it;
}
/* everything deep15Apply touches is there: the banks (gen2 37-bank.js, filled by the data file), esReg (gen) and the whole of the data file up to
   SCN_W (d-scenes.js, which runs after d-disc.js and d-es.js, so DISC_PIC, ES_UNITS and SPN are set too). Only typeof on var / function /
   const names that are either declared or never declared, so it never throws: in tools/test.js the parts run before the data (no banks yet),
   and when a start-up file is missing or stale the data file stops part way (at esReg without gen, earlier without gen2) and this part's
   last line must then do nothing rather than throw (A11c: the app is refused by dataReady() as before). */
function d15Ready() {
  return typeof BANK == 'object' && !!BANK.sci_life && typeof esReg == 'function' && typeof SCN_W == 'object' && !!SCN_W;
}
function deep15Apply() {
  if (!DEEP15_ON || D15F || !d15Ready()) return false;
  D15F = 1;
  const g = typeof G != 'undefined' && G && G.path && NODES[G.path] && G.node >= 0 && NODES[G.path][G.node] ? nid(NODES[G.path][G.node]) : null;
  const mw = ['disc', 'es'].map(p => [p, MAPW[p] != null && PATHS[p].worlds[MAPW[p]] ? PATHS[p].worlds[MAPW[p]].id : null]);
  // Discover
  for (const id in D15.top) BANK[id].push(...D15.top[id].map(d15Kind));
  for (const s of D15.disc) {
    BANK[s.id] = d15Rows(s.rows).concat(s.kinds.map(d15Kind));
    SK[s.id] = {t: s.t, e: s.e, area: 'disc', max: 1, bank: s.id, gen: lv => genBank(s.id, lv)};
    ICO_SK[s.id] = s.ico;
  }
  PATHS.disc.worlds.splice(1, 0, D15.world);
  SCN_W[D15.world.id] = 'garden';
  if (typeof REP != 'undefined') for (const st of REP.STRANDS) if (D15.strands[st[0]]) st[1] += ' ' + D15.strands[st[0]];
  // Spanish
  for (const id in D15.es) ES_UNITS.find(u => u.id == id).items.push(...D15.es[id]);
  for (const id in D15.esConfuse) { const u = ES_UNITS.find(x => x.id == id); u.confuse = (u.confuse || []).concat(D15.esConfuse[id]); }
  for (const u of D15.esNew) { ES_UNITS.push(u); SPN[u.id] = u.items; esReg(u); }
  for (const wid in D15.esAt) (PATHS.es.full || PATHS.es.worlds).find(w => w.id == wid).nodes.push(...D15.esAt[wid]);
  buildNodes('disc');
  buildNodes('es');
  for (const [p, wid] of mw) if (wid) MAPW[p] = PATHS[p].worlds.findIndex(w => w.id == wid);
  if (g) G.node = NODES[G.path].findIndex(n => nid(n) == g);
  return true;
}
/* ---------- DISC-46: Discover worlds for grades 4 and 6 (part teaches; the items are in src/data/d-disc46.js) ----------
   disc46Apply() adds the drafted worlds, once, and only with DISC46_ON (42m-disc46on.js, BUILT from docs/drafts/DISC46-READ.md). With 0
   it does nothing at all: no bank, skill, map, icon, scene or report strand changes. The part's data file calls it as its last line (the
   app loads this part after data.<VER>.js); the Discover map calls it again after loading the part (d46Warm, d46Open in 42n-disc46.js).
   What it adds, as DEEP-15 did (52y-deep15.js): twelve new skills (one stop each, max 1) with their own banks; Canyon Trail (g 4) after
   Science Lab and Volcano Ridge (g 6) after Star Observatory, placed by world id, so it does not matter whether DEEP-15's Discovery Garden
   is in yet. A stop is saved by its id (S.maps, nid), never by its index, so inserting worlds moves no stars; the index of a running round
   (G.node) and the world picked in the strip (MAPW.disc) are moved to match. Returns true when it added them. */
// the choice rows of a new stop: as discRows (d-disc.js), for grade 4 or 6: no read-aloud list, a picture of the subject when the row has one
function d46Rows(text, grade) {
  return text.trim().split('\n').map(r => {
    const f = r.split('|'), it = {lv: 1, grade, q: f[0], a: f[1], d: f[2].split(';'), topic: f[3]};
    if (f[4]) it.em = f[4].split(',');
    it.hint = f[5] || D46_HINT[f[3]];
    return it;
  });
}
/* everything disc46Apply touches is there: the banks (gen2 37-bank.js, filled by the data file) and the data file up to SCN_W (d-scenes.js).
   Only typeof on names that are either declared or never declared, so it never throws: in tools/test.js the parts run before the data (no
   banks yet), and when a start-up file is missing or stale the data file stops part way and this part's last line must then do nothing
   rather than throw (A11c: the app is refused by dataReady() as before). */
function d46Ready() {
  return typeof BANK == 'object' && !!BANK.sci_life && typeof genBank == 'function' && typeof SCN_W == 'object' && !!SCN_W;
}
function disc46Apply() {
  if (!DISC46_ON || D46F || !d46Ready()) return false;
  D46F = 1;
  const g = typeof G != 'undefined' && G && G.path && NODES[G.path] && G.node >= 0 && NODES[G.path][G.node] ? nid(NODES[G.path][G.node]) : null;
  const W = PATHS.disc.worlds, mw = MAPW.disc != null && W[MAPW.disc] ? W[MAPW.disc].id : null;
  for (const s of D46.disc) {
    BANK[s.id] = d46Rows(s.rows, s.grade).concat(s.kinds.map(k => Object.assign({lv: 1}, k)));
    SK[s.id] = {t: s.t, e: s.e, area: 'disc', max: 1, bank: s.id, gen: lv => genBank(s.id, lv)};
    ICO_SK[s.id] = s.ico;
  }
  for (const x of D46.worlds) { W.splice(W.findIndex(w => w.id == x.after) + 1, 0, x.w); SCN_W[x.w.id] = x.scene; }
  if (typeof REP != 'undefined') for (const st of REP.STRANDS) if (D46.strands[st[0]]) st[1] += ' ' + D46.strands[st[0]];
  buildNodes('disc');
  if (mw) MAPW.disc = W.findIndex(w => w.id == mw);
  if (g) G.node = NODES[G.path].findIndex(n => nid(n) == g);
  return true;
}
/* ---------- ES-MORE: more Spanish weather and feelings words (part teaches; the words are in src/data/d-es-more.js) ----------
   esMoreApply() adds them, once, and only with ESMORE_ON (42f-esmoreon.js, BUILT from docs/drafts/ES-MORE-READ.md). With 0 it does
   nothing at all: no unit, word, picture or drawing changes. With 1 it adds words at the END of the units weather and feel (SPN shares
   the arrays, so the learn cards and the questions see them, and a saved review item keeps its place), their confuse pairs and caption
   words, and their drawings (ART names wx-*, read only at render time, so nothing else in the app changes its pictures). No new stop,
   unit or skill. The data file calls it as its last line; with the gate on, the Spanish map loads the part (46-home.js).
   Returns true when it added them. */
let ESMF = 0; // 1 once esMoreApply has run
/* the same test as DEEP-15's d15Ready (52y-deep15.js): only typeof on var / function names, so it never throws. In tools/test.js the parts
   run before the data, and when a start-up file is missing or stale the data file stops part way: then this does nothing (A11c). */
function esmReady() {
  return typeof BANK == 'object' && !!BANK.sci_life && typeof esReg == 'function' && typeof SCN_W == 'object' && !!SCN_W;
}
function esMoreApply() {
  if (!ESMORE_ON || ESMF || !esmReady()) return false;
  ESMF = 1;
  for (const id in ESM.es) {
    const u = ES_UNITS.find(x => x.id == id);
    u.items.push(...ESM.es[id]);
    if (ESM.confuse[id]) u.confuse = (u.confuse || []).concat(ESM.confuse[id]);
    if (ESM.cap[id] && u.cap !== 1) u.cap = (u.cap || []).concat(ESM.cap[id]);
  }
  Object.assign(ART, ESM.art);
  return true;
}
/* RELA-PICS (review fix 4), part teaches (the Spanish and Discover maps load it; until then the old emoji shows). DESIGN_SYSTEM 6.5.
   Discover: a US flag (13 stripes, 7 red, 6 white) for "The flag of the United States has ___ stripes" and a compass rose with no
   letters (north red) for "On a compass, the letter N stands for ___".
   Spanish: la clase a chalkboard (was a bell), nuevo a new shoe (the NEW sign), viejo a worn shoe (an old man: rude in Mexico), bajo
   a short person beside a tall one (an arrow), por favor open hands (a face read as sad); set as the items' art names here.
   Icons of the lazy worlds: seedling (Seeds & Plants), cloud (Weather Watch), volcano (Volcano Ridge), added to the sprite. */
Object.assign(ART, {
  'us-flag':
    '<rect x="8" y="5" width="4" height="56" rx="2" fill="var(--a-n2)"/><rect x="8" y="5" width="2.6" height="56" rx="1.3" fill="var(--a-n)"/>' +
    '<circle cx="10" cy="5" r="3" fill="var(--a-y)"/><rect x="14" y="8" width="46" height="32.5" fill="var(--a-w3)"/>' +
    '<rect x="14" y="8" width="45" height="31.5" fill="var(--a-w)"/>' +
    '<path fill="var(--a-r)" d="M14 8H60V10.5H14ZM14 13H60V15.5H14ZM14 18H60V20.5H14ZM14 23H60V25.5H14ZM14 28H60V30.5H14ZM14 33H60V35.5H14ZM14 38H60V40.5H14Z"/>' +
    '<rect x="14" y="8" width="22" height="17.5" fill="var(--a-b2)"/>' +
    '<circle cx="17.5" cy="11" r="1.1" fill="var(--a-w)"/><circle cx="22.5" cy="11" r="1.1" fill="var(--a-w)"/><circle cx="27.5" cy="11" r="1.1" fill="var(--a-w)"/>' +
    '<circle cx="32.5" cy="11" r="1.1" fill="var(--a-w)"/><circle cx="20" cy="15" r="1.1" fill="var(--a-w)"/><circle cx="25" cy="15" r="1.1" fill="var(--a-w)"/>' +
    '<circle cx="30" cy="15" r="1.1" fill="var(--a-w)"/><circle cx="17.5" cy="19" r="1.1" fill="var(--a-w)"/><circle cx="22.5" cy="19" r="1.1" fill="var(--a-w)"/>' +
    '<circle cx="27.5" cy="19" r="1.1" fill="var(--a-w)"/><circle cx="32.5" cy="19" r="1.1" fill="var(--a-w)"/><circle cx="20" cy="23" r="1.1" fill="var(--a-w)"/>' +
    '<circle cx="25" cy="23" r="1.1" fill="var(--a-w)"/><circle cx="30" cy="23" r="1.1" fill="var(--a-w)"/>' +
    '<rect x="14" y="38" width="46" height="2.5" fill="var(--a-r2)"/><rect x="4" y="58" width="12" height="4" rx="2" fill="var(--a-e)"/>',
  'compass-rose':
    '<circle cx="33" cy="33" r="28" fill="var(--a-n2)"/><circle cx="31.6" cy="31.6" r="26.6" fill="var(--a-n)"/>' +
    '<circle cx="32" cy="32" r="22" fill="var(--a-m3)"/><circle cx="31.4" cy="31.4" r="21" fill="var(--a-m1)"/>' +
    '<path fill="var(--a-e1)" d="M32 32L45 19L38 34ZM32 32L19 45L26 30ZM32 32L45 45L30 38ZM32 32L19 19L34 26Z"/>' +
    '<path fill="var(--a-e2)" d="M32 32L52 32L36 36.5ZM32 32L12 32L28 27.5ZM32 32L32 52L27.5 36Z"/>' +
    '<path fill="var(--a-e)" d="M32 32L52 32L36 27.5ZM32 32L12 32L28 36.5ZM32 32L32 52L36.5 36Z"/>' +
    '<path fill="var(--a-r)" d="M32 9L36.5 28L32 32Z"/><path fill="var(--a-r2)" d="M32 9L27.5 28L32 32Z"/>' +
    '<circle cx="32" cy="32" r="3" fill="var(--a-k2)"/><circle cx="31.2" cy="31.2" r="1" fill="var(--a-w)"/>' +
    '<rect x="30.6" y="3" width="2.8" height="4" rx="1.4" fill="var(--a-y)"/>',
});

const ARTSHOE=(s,u)=>'<path fill="var(--a-'+s+')" d="M5 48H58Q60 48 60 52.5V55.5Q60 60 57 60H8Q5 60 5 55.5Z"/><path fill="var(--a-'+u+'2)" d="M8 48V30Q8 24 12 24H22L28 33L42 36Q56 39 58 48Z"/><path fill="var(--a-'+u+')" d="M9.4 45V30.6Q9.4 26.4 12.4 26.4H21.4L27.2 34.8L41.6 38.1Q52 40.5 55 45Z"/>';
Object.assign(ART, {
  chalkboard: '<rect x="6" y="8" width="52" height="38" rx="3" fill="var(--a-n2)"/><rect x="6" y="7" width="50" height="36" rx="3" fill="var(--a-n)"/><rect x="10" y="11" width="42" height="28" rx="1.5" fill="var(--a-g3)"/><path fill="none" stroke="var(--a-w)" stroke-width="2" d="M14 31L19 18L24 31M16 26H22M29 18V31H33.5Q38 31 38 28T33.5 25H29M29 18H33Q37 18 37 21.5T33 25M46 20Q41 17 41 24.5T46 30"/><rect x="8" y="42" width="48" height="4" rx="2" fill="var(--a-n3)"/><rect x="42" y="40" width="7" height="2.6" rx="1" fill="var(--a-w)"/><rect x="8" y="50" width="20" height="4" rx="1.5" fill="var(--a-o)"/><rect x="36" y="50" width="20" height="4" rx="1.5" fill="var(--a-o)"/><path fill="none" stroke="var(--a-o3)" stroke-width="2.4" d="M11 54V61M25 54V61M39 54V61M53 54V61"/>',
  short: '<rect x="3" y="58" width="58" height="3.4" rx="1.7" fill="var(--a-e2)"/><circle cx="17" cy="9" r="6.5" fill="var(--a-e1)"/><rect x="9" y="17" width="16" height="41" rx="8" fill="var(--a-e1)"/><circle cx="44" cy="28" r="8.4" fill="var(--a-s2)"/><circle cx="43.2" cy="27.2" r="7.6" fill="var(--a-s)"/><rect x="33" y="38" width="22" height="20" rx="10" fill="var(--a-o2)"/><rect x="33" y="38" width="20" height="18.4" rx="9" fill="var(--a-o)"/><ellipse cx="39.6" cy="25" rx="2" ry="3" fill="var(--a-s1)"/><ellipse cx="38" cy="44" rx="2" ry="4" fill="var(--a-o1)"/>',
  please: '<path fill="var(--a-b2)" d="M10 50H26V60H10ZM38 50H54V60H38Z"/><path fill="var(--a-s2)" d="M4 26Q2 52 31 52H33Q62 52 60 26Q48 34 32 34T4 26Z"/><path fill="var(--a-s)" d="M6 27Q5 48 31 49V35Q16 35 6 27ZM58 27Q59 48 33 49V35Q48 35 58 27Z"/><path fill="var(--a-s)" d="M4 26Q2 16 7 15Q11 16 11 29ZM60 26Q62 16 57 15Q53 16 53 29Z"/><path fill="none" stroke="var(--a-s3)" stroke-width="1.6" d="M32 36V50M14 40Q20 44 26 44M50 40Q44 44 38 44M4.6 20H9M4.4 24H9.6M59.4 20H55M59.6 24H54.4"/><ellipse cx="14" cy="34" rx="3" ry="1.8" fill="var(--a-s1)" opacity="0.7"/>',
  'shoe-new': ARTSHOE('w3', 'b') + '<path fill="none" stroke="var(--a-w)" stroke-width="2" d="M24 30L27 34.5M28 27L31 31.5M32 30L35 34.5"/><rect x="12" y="30" width="6" height="3" rx="1" fill="var(--a-b1)"/><path fill="var(--a-y)" d="M50 6L52 13L59 15L52 17L50 24L48 17L41 15L48 13Z"/><path fill="var(--a-y)" d="M34 10L35 14L39 15L35 16L34 20L33 16L29 15L33 14Z"/>',
  'shoe-old': ARTSHOE('e2', 'n') + '<path fill="none" stroke="var(--a-e3)" stroke-width="1.6" d="M24 49.5L26 58.5M44 49.5L42 58.5"/><rect x="33" y="37.5" width="8" height="9" rx="1" fill="var(--a-t1)" transform="rotate(-8 37 42)"/><ellipse cx="50" cy="43.5" rx="3" ry="2.7" fill="var(--a-n3)"/><path fill="none" stroke="var(--a-n3)" stroke-width="1.6" d="M13 34.5L17 37.5M15 40.5L18 42M24 30L27 34.5Q30 45 26 54"/>',
});
try { // ES_UNITS is in the data file, loaded first (a test harness that reads every file at once may not have it yet)
  for (const u of ES_UNITS) for (const it of u.items) {
    const a = {clase: 'chalkboard', nuevo: 'shoe-new', viejo: 'shoe-old', bajo: 'short', 'por favor': 'please'}[it[0]];
    if (a) it[4] = a;
  }
} catch (e) {}
Object.assign(ICONS, {
  seedling: '<path fill="var(--ic3,currentColor)" opacity=".4" d="M3 21.5q9-6 18 0Z"/><path d="M11 19V12h2v7ZM12 12.4C12 7 8.5 4.6 2.6 4.8C2.6 10 6.6 13 12 12.4ZM12 11C12 6.6 15 3.6 21.4 3.8C21.4 9.2 17.4 11.6 12 11Z"/>',
  cloud: '<circle fill="var(--ic3,currentColor)" opacity=".4" cx="16.5" cy="7" r="5"/><path d="M7 19.5a5 5 0 0 1-.6-10A6.2 6.2 0 0 1 18 9a5.2 5.2 0 0 1-.6 10.5Z"/>',
  volcano: '<path fill="var(--ic3,currentColor)" opacity=".4" d="M8.6 8.4C6.6 4.6 10.4 2.4 12.2 4.6C13.6 1.6 19 3 17 6.6C15.6 8.4 10.6 9.4 8.6 8.4Z"/>' +
    '<path d="M1.6 21.6L8 10H10.6L12 12.4L13.4 10H16L22.4 21.6Z"/>',
});
try {
  const sp = document.getElementById('ico-sprite');
  for (const n of ['seedling', 'cloud', 'volcano']) if (sp && !document.getElementById('i-' + n)) sp.insertAdjacentHTML('beforeend', `<symbol id="i-${n}" viewBox="0 0 24 24" fill="currentColor" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]}</symbol>`);
} catch (e) {}
/* ---------- DEEP-15 (BEST-APP roadmap 15): deeper Discover and Spanish, DRAFTED for the owner (part teaches) ----------
   Every item here is listed with its reason in docs/drafts/DEEP15-READ.md and reaches a child only once that file's status line says
   "status: reviewed <name> <YYYY-MM-DD>" (DEEP15_ON, 42d-deep15on.js, BUILT by tools/build.py). deep15Apply (52y-deep15.js) adds them:
   - Discover: a world for grades 1-2, Discovery Garden (after Nature Trail), with six new stops (choice rows in the format of d-disc.js:
     question | answer | wrong answers split by ; | topic | picture (art name,emoji) | hint; a missing hint is the topic's own, D15_HINT),
     each with sort, match and order items in the KINDS2 format; and two match items and one order item at the END of each Nature Trail bank
     (a saved review item keeps its bank index).
   - Spanish: words at the END of thirteen units (the format of d-es.js: [spanish, english, picture, article, art]) and two new units.
   Pictures are ART drawings or emoji from tools/emoji-allow.txt. Nothing here draws at random. No item teaches change over time in living things. */
const D15_HINT = {
  grow: 'Think about planting something small in a cup of soil and looking at it day after day. What happens first, and what comes later?',
  pneeds: 'Think about a plant on a sunny windowsill that someone waters. What does it get there every day?',
  eat: 'Picture the whole plant from the bottom to the top. Which part of it is this food?',
  spread: 'A seed cannot walk. Think about what could carry it far away from the plant it grew on.',
  wtool: 'Think about what each tool tells you: hot or cold, wet or dry, or which way the air is moving.',
  wsafe: 'Think about how to stay safe and far from danger until a storm is over.',
  wsky: 'Think about the sky over many days and nights. What happens again and again?',
  wsun: 'Think about standing in bright sunshine, and then standing where a tree blocks the light. How does each one feel?',
  wfore: 'A forecast tells what the weather will probably be. Think about what you would wear or carry that day.',
  rocks: 'Imagine holding it in your hand. Is it hard or soft, big or small, smooth or rough?',
  soil: 'Think about digging in a garden. What do you find in the dirt, and what lives in it?',
  mater: 'Think about the job the thing has to do. Which material could do that job well?',
  change: 'Some changes to the land happen in a few minutes. Others take a very long time. Which kind is this?',
  mach: 'A simple machine makes work easier. Think about what the tool helps you lift, move, split, hold or turn.',
  move: 'Think about how strong the force is, how much the thing weighs, and where it ends up.',
  longago: 'Think about how people lived long ago, before electric lights, cars and phones. What did they use instead?',
  timeline: 'Think of time as a line: what already happened, what is happening now, and what has not happened yet.',
  history: 'History is the story of the past. Which one could show how people lived before?',
  goods: 'Some things you can hold in your hands. Other times a worker does a job for you. Which is this?',
  jobs: 'Think about what this worker does all day, and the tools they use to do it.',
  money: 'Think about what grown-ups do with what they are paid, and where they go to buy and keep things.',
};
// picture answers for the new items, with Discover's own list (DISC_PIC, d-disc.js): an item whose every choice has one shows pictures
const D15_PIC = {sunflower: ['sunflower', '🌻'], 'an umbrella': ['umbrella', '☔'], 'a sled': ['sled', '🛷'], 'a beach ball': ['ball', '⚽'], 'a pebble': ['rock', '🪨'], 'a sponge': ['sponge', '🧽'], 'a cookie': ['cookie', '🍪'], 'a banana': ['banana', '🍌'], tree: ['tree', '🌳'], flower: ['flower', '🌷'], bee: ['bee', '🐝'], frog: ['frog', '🐸'], bird: ['bird', '🐦'], pumpkin: ['pumpkin', '🎃'], rock: ['rock', '🪨'], shell: ['shell', '🐚'], coin: ['coin', '🪙'], apple: ['apple', '🍎'], grapes: ['grapes', '🍇'], carrot: ['carrot', '🥕'], bike: ['bike', '🚲'], car: ['car', '🚗'], boat: ['boat', '⛵'], sled: ['sled', '🛷'], bus: ['bus', '🚌'], ball: ['ball', '⚽'], book: ['book', '📖'], box: ['box', '📦'], 'cell phone': ['phone', '📱'], bread: ['bread', '🍞'], shoes: ['shoes', '👟']};
const D15 = {
  world: {id: 'd_garden', g: 1, n: 'Discovery Garden', e: '🌻', c: '#dcfce7', nodes: [['sci_plant', 1, 'Seeds & Plants'], ['sci_wx', 1, 'Weather Watch'], ['sci_rock', 1, 'Rocks, Soil & Sand'], ['sci_mach', 1, 'Ramps & Wheels'], ['civ_past', 1, 'Long Ago & Today'], ['civ_work', 1, 'Goods & Jobs']]},
  // Science and Social studies: Discover's report strands (REP.STRANDS, 82-report.js)
  strands: {Science: 'sci_plant sci_wx sci_rock sci_mach', 'Geography and civics': 'civ_past civ_work'},
  disc: [
    {id: 'sci_plant', t: 'Seeds & Plants', e: '🌱', ico: 'seedling', rows: `
Most plants start out as a tiny ___.|seed|leaf;stem;fruit|grow
A seed is planted and watered. What grows out of it first?|a tiny root|a big flower;a ripe fruit;a pine cone|grow
A young plant that has just come up out of the soil is called a ___.|seedling|pebble;puddle;petal|grow
What does a bean plant grow from?|a bean seed|a small rock;a raindrop;a feather|grow
Many plants grow flowers. What can a flower make?|seeds|rocks;sand;rain|grow|flower,🌷
A seedling gets water and sunlight for many days. What happens?|it grows taller|it gets shorter;it turns into a seed;it stays the same size|grow
What do plants need to live and grow?|water and sunlight|darkness and ice;milk and juice;salt and sand|pneeds
A plant is kept in a dark closet for many days. What will happen to it?|it turns pale and weak|it grows stronger;it grows more flowers;it stays just the same|pneeds
A plant gets no water for a long time. What happens?|it wilts and droops|it grows taller;it makes more fruit;it gets new leaves|pneeds
Water goes into a plant through its ___.|roots|petals;flowers;seeds|pneeds
Plants need light. Where would a plant grow best?|by a sunny window|inside a dark box;inside a freezer;under a thick rug|pneeds||Think about the places in a house where light comes in.
Two plants get the same water. One sits in the sun and one sits in a dark cupboard. Which grows better?|the one in the sun|the one in the cupboard;they grow the same;neither one grows|pneeds
Plants growing too close together have a hard time. What do they need more of?|space|noise;salt;ice|pneeds
Plants make their own food. What do they use to make it?|sunlight, air and water|soil, rocks and sand;milk, eggs and bread;snow, ice and wind|pneeds
When you eat a carrot, which part of the plant are you eating?|the root|the flower;the leaf;the seed|eat|carrot,🥕
When you eat lettuce, which part of the plant are you eating?|the leaves|the roots;the seeds;the flowers|eat
When you eat a peanut, you are eating a plant's ___.|seed|root;leaf;flower|eat|peanut,🥜
An apple is the ___ of an apple tree.|fruit|root;leaf;stem|eat|apple,🍎
A pea pod holds the plant's ___.|seeds|roots;leaves;flowers|eat
A dandelion seed has a fluffy top. What carries it far away?|the wind|a worm;a snail;a ladybug|spread
A burr is a seed with tiny hooks. How does it travel?|it sticks to animal fur|it floats on the wind;it rolls down hills;it swims in ponds|spread
A coconut can float. How can a coconut seed get to a new island?|by floating on water|by flying on the wind;by rolling on roads;by sticking to fur|spread
A squirrel buries acorns and forgets some. What can a forgotten acorn do?|grow into an oak tree|turn into a stone;become a maple tree;grow into a berry bush|spread
Bees visit flowers. What do they carry from flower to flower that helps make seeds?|pollen|honey;water;sand|spread|bee,🐝
`,
      kinds: [
        {form: 'sort', topic: 'grow', q: 'Sort them: a plant or an animal?', hint: 'Plants grow in one place and make their own food. Animals move around to find food.', bins: {plant: ['tree', 'flower', 'sunflower'], animal: ['bee', 'frog', 'bird']}},
        {form: 'sort', topic: 'grow', q: 'Sort them: can it grow from a seed, or not?', hint: 'Living plants come from seeds. Things that were never alive do not.', bins: {'grows from a seed': ['tree', 'sunflower', 'pumpkin'], 'does not': ['rock', 'shell', 'coin']}},
        {form: 'match', topic: 'eat', q: 'Match each food to the plant part: carrot, lettuce and apple.', hint: 'One grows under the ground, one is green and flat, and one holds seeds.', pairs: [['carrot', 'root'], ['lettuce', 'leaf'], ['apple', 'fruit']]},
        {form: 'match', topic: 'spread', q: 'Match each seed to how it travels: dandelion, burr and coconut.', hint: 'Fluffy seeds fly, hooked seeds hold on, and big round seeds can float.', pairs: [['dandelion', 'wind'], ['burr', 'animal fur'], ['coconut', 'water']]},
        {form: 'order', topic: 'grow', q: 'Put them in order: how does a bean plant grow?', hint: 'Start with what you put in the soil.', order: ['seed', 'sprout', 'young plant', 'plant with beans']},
        {form: 'sort', topic: 'eat', q: 'Sort the foods: is it a fruit or a root?', hint: 'Does it grow under the ground, or does it hold seeds?', bins: {fruit: ['apple', 'grapes', 'banana'], root: ['carrot', 'radish']}},
        {form: 'sort', topic: 'grow', q: 'Sort them: is it a seed, or not?', hint: 'If you plant it and water it, will a new plant come up?', bins: {seed: ['acorn', 'peanut', 'bean'], 'not a seed': ['rock', 'button']}},
        {form: 'match', topic: 'pneeds', q: 'Match each plant part to its job: roots, leaves and flower.', hint: 'One is under the ground, one faces the sun, and one is colorful.', pairs: [['roots', 'take in water'], ['leaves', 'make food'], ['flower', 'makes seeds']]},
        {form: 'order', topic: 'grow', q: 'Put them in order: how does an apple tree make apples?', hint: 'In spring the tree is covered in white and pink.', order: ['flower', 'small green fruit', 'ripe apple']}]},
    {id: 'sci_wx', t: 'Weather Watch', e: '🌧', ico: 'cloud', rows: `
Which tool tells you how hot or cold it is outside?|a thermometer|a ruler;a clock;a measuring cup|wtool
The red line in a thermometer goes up. What does that mean?|it is getting warmer|it is getting colder;it is getting darker;it is getting windier|wtool
A rain gauge is a tool that measures ___.|how much rain fell|how hot it is;how fast the wind blows;how tall the clouds are|wtool
A windsock is flapping straight out. What does that tell you?|it is windy|it is raining;it is hot;it is snowing|wtool
A forecast tells us ___.|what the weather will probably be|what day of the week it is;how many hours are in a day;what time the school bus will come|wfore||Think about the person on TV or the radio who talks about tomorrow's sky.
The forecast says it will rain all day. What should you take outside?|an umbrella|a sled;a beach ball|wfore
The forecast says it will be very cold and snowy. What should you wear?|a warm coat and mittens|shorts, a T-shirt and sandals;a swimsuit;a sun hat|wfore
You hear thunder outside. What should you do?|go inside a building|stand under a tall tree;go for a swim;fly a kite|wsafe
Why is it not safe to stand under a tall tree in a thunderstorm?|lightning can hit tall things|trees make thunder;leaves are slippery;tall trees pull in all the rain|wsafe
A tornado warning comes on the radio. Where is the safest place to go?|the lowest floor, away from windows|next to a big glass window;up on the highest floor of the house;outside in the open yard|wsafe
A tornado is a ___.|spinning funnel of wind|very large, heavy snowflake;kind of rainbow;thick morning fog|wsafe
A hurricane is a giant storm that forms over ___.|warm ocean water|cold mountain tops;dry deserts;frozen lakes|wsafe
What happens to a puddle on a hot, sunny day?|it dries up|it gets deeper;it freezes;it turns into snow|wsun
You stand in bright sun, then you step under a big leafy tree. Where do you feel cooler?|in the shade|in the sun;both feel the same|wsun
Sunlight shines on a rock all afternoon. How does the rock feel?|warm|icy cold;wet;soft|wsun|rock,🪨
Which season usually has the most hours of daylight?|summer|winter;fall;spring|wsky
In winter, the sun usually sets ___ than in summer.|earlier|later;at the same time|wsky
What happens in the sky every single day?|the sun rises and sets|a rainbow;a tornado;snow falling from clouds|wsky
The Moon seems to change shape. About how long does it take to show all its shapes?|a month|a day;an hour;a hundred years|wsky|moon,🌙
Where does the sun come up in the morning?|in the east|in the west;in the north;in the south|wsky|sun,☀️
A thunderstorm is coming. What do the clouds look like?|tall and dark|small, white and puffy;thin and wispy;there are no clouds|wsky
Hail is ___.|balls of ice from storm clouds|warm drops of rain;tiny bits of sand;soft flakes of snow from winter clouds|wsky
A person whose job is to study the weather is a ___.|meteorologist|dentist;photographer;plumber|wfore
`,
      kinds: [
        {form: 'sort', topic: 'wsafe', q: 'Sort the weather: fine for playing outside, or time to go inside?', hint: 'Thunder, lightning and strong winds mean danger. Go where it is safe.', bins: {'play outside': ['sunny day', 'cloudy day', 'light breeze'], 'go inside': ['thunder', 'lightning', 'tornado']}},
        {form: 'sort', topic: 'wtool', q: 'Sort them: is it a weather tool, or not?', hint: 'A weather tool tells you about the air, the rain or the wind.', bins: {'weather tool': ['thermometer', 'rain gauge', 'windsock'], 'not a weather tool': ['spoon', 'pencil']}},
        {form: 'match', topic: 'wtool', q: 'Match each tool to what it tells you: thermometer, rain gauge and windsock.', hint: 'One has a red line, one catches drops, and one flaps in the air.', pairs: [['thermometer', 'how hot or cold'], ['rain gauge', 'how much rain'], ['windsock', 'which way the wind blows']]},
        {form: 'match', topic: 'wfore', q: 'Match the forecast to what you bring: rain, snow and hot sun.', hint: 'Think of what keeps you dry, what you ride on, and what keeps you from getting thirsty.', pairs: [['rain', 'umbrella'], ['snow', 'sled'], ['hot sun', 'water bottle']]},
        {form: 'order', topic: 'wsky', q: 'Put the seasons in order, starting with winter.', hint: 'After the cold time, flowers start to bloom.', order: ['winter', 'spring', 'summer', 'fall']},
        {form: 'sort', topic: 'wfore', q: 'Sort the clothes: for a hot day or a cold day?', hint: 'Which ones keep you cool, and which ones keep you warm?', bins: {'hot day': ['shorts', 'sun hat', 'sandals'], 'cold day': ['mittens', 'warm coat', 'scarf']}},
        {form: 'sort', topic: 'wsky', q: 'Sort them: seen in the day sky, at night, or both?', hint: 'The Moon can be up in the daytime too.', bins: {day: ['sun', 'rainbow'], night: ['stars'], both: ['moon', 'clouds']}},
        {form: 'match', topic: 'wsky', q: 'Match each weather word to what it means: hail, fog and drizzle.', hint: 'One is hard, one is hard to see through, and one is gentle.', pairs: [['hail', 'balls of ice'], ['fog', 'a cloud near the ground'], ['drizzle', 'very light rain']]},
        {form: 'order', topic: 'wtool', q: 'Put the days in order, from coldest to hottest.', hint: 'Which day would the thermometer show lowest?', order: ['snowy day', 'cool fall day', 'hot summer day']}]},
    {id: 'sci_rock', t: 'Rocks, Soil & Sand', e: '🪨', ico: 'globe', rows: `
Sand is made of tiny pieces of ___.|rock|sugar;salt;wood|rocks|beach,🏖️
Which one is the hardest?|a pebble|a sponge;a banana;a cookie|rocks
A very big rock is called a ___.|boulder|pebble;grain;crumb|rocks
A small, smooth, round rock from a river is a ___.|pebble|boulder;mountain;cliff|rocks
Why are rocks in a river often smooth and round?|moving water rubs them for a long time|the sun melts their edges;they are made smooth in a factory;they grow that way|rocks
What is soil good for?|growing plants|making ice cubes;washing dishes;cooking soup|soil
Which animal makes soil better by digging tunnels in it?|an earthworm|a goldfish;a hungry parrot;a butterfly|soil
Which kind of soil is sticky and can be shaped like dough when it is wet?|clay|sand;gravel;pebbles|soil
You pour water on dry sand. What happens?|it soaks in quickly|it sits on top in a puddle;it turns into ice;it turns the sand into rock|soil
Fossils are often found inside ___.|rock|clouds;rain;air|rocks
Which of these is NOT made of rock?|a wooden bench|a mountain;a pebble;a big stone wall|rocks
Which material would make the best window?|glass|wood;cloth;metal|mater|window,🪟
Which material is best for a warm winter hat?|wool|glass;paper;metal|mater
Which would keep you dry in the rain?|a plastic raincoat|a paper bag;a cotton towel;a thick wool sweater|mater
Which would make the strongest walls for a house?|bricks|paper;cloth;cardboard|mater|house,🏠
Which material bends and stretches easily?|rubber|stone;glass;brick|mater
Most of the water on Earth is in the ___.|oceans|lakes;rivers;clouds|change||Picture a globe. What covers most of it, and is it fresh or salty?
An earthquake shakes the ground for a few seconds. That is a ___ change to the land.|quick|slow;tiny|change
A river slowly carves a deep canyon. How long does that take?|a very long time|one afternoon;one week;one year|change||Water wears away rock only a tiny bit each year. So is a deep canyon quick to make?
Wind blows sand against a rock for many years. What happens to the rock?|it slowly wears away|it grows bigger;it turns into wood;it starts to melt|change
How can a farmer stop wind from blowing away soil?|plant rows of trees|cut down every tree;dig up the grass;leave the ground bare|change
Rain is washing a hill of dirt away. What can help hold the dirt in place?|planting grass|digging more holes;pulling up the plants;spraying more water|change
`,
      kinds: [
        {form: 'sort', topic: 'rocks', q: 'Sort them: made of rock, or not?', hint: 'Rock is hard and comes from the ground. Some bits of it are very tiny.', bins: {rock: ['pebble', 'boulder', 'sand'], 'not rock': ['leaf', 'feather', 'apple']}},
        {form: 'sort', topic: 'change', q: 'Sort the changes to the land: fast or slow?', hint: 'Did it happen in a few minutes, or over a very long time?', bins: {fast: ['an earthquake', 'a landslide', 'a volcano erupting'], slow: ['a river carving a canyon', 'wind wearing down a rock']}},
        {form: 'match', topic: 'mater', q: 'Match each material to its best use: glass, wool and brick.', hint: 'One you can see through, one is soft and warm, and one is strong and hard.', pairs: [['glass', 'window'], ['wool', 'warm hat'], ['brick', 'strong wall']]},
        {form: 'match', topic: 'rocks', q: 'Match each word to what it means: boulder, pebble and sand.', hint: 'They are all rock. Think about how big each one is.', pairs: [['boulder', 'very big rock'], ['pebble', 'small smooth rock'], ['sand', 'tiny bits of rock']]},
        {form: 'order', topic: 'rocks', q: 'Put them in order, from biggest to smallest.', hint: 'Start with the one too big to lift.', order: ['boulder', 'rock', 'pebble', 'sand']},
        {form: 'sort', topic: 'mater', q: 'Sort the materials: can you see through it, or not?', hint: 'Hold it up to a window. Does the light come through?', bins: {'see through': ['glass', 'clear plastic', 'water'], 'cannot see through': ['wood', 'brick']}},
        {form: 'sort', topic: 'mater', q: 'Sort them: does it bend easily, or is it stiff?', hint: 'Try to fold it in your hands.', bins: {bends: ['rubber band', 'paper', 'cloth'], stiff: ['brick', 'rock']}},
        {form: 'match', topic: 'soil', q: 'Match each soil to what it is like: sand, clay and topsoil.', hint: 'Rub each one between your fingers.', pairs: [['sand', 'gritty and loose'], ['clay', 'sticky when wet'], ['topsoil', 'dark and good for plants']]},
        {form: 'order', topic: 'change', q: 'Put the changes in order, from fastest to slowest.', hint: 'One is over in seconds.', order: ['an earthquake', 'a flood', 'a canyon forming']}]},
    {id: 'sci_mach', t: 'Ramps & Wheels', e: '🛞', ico: 'bolt', rows: `
Which simple machine is a slanted surface that helps move things up?|a ramp|a wheel;a pulley;a screw|mach
It is easier to push a heavy box up a ___ than to lift it straight up.|ramp|wall;fence;window|mach|box,📦
A wheel turns on a rod. What is the rod called?|an axle|an anchor;an elbow;a ladder|mach
A seesaw is a kind of ___.|lever|pulley;wheel;wedge|mach
A rope on a flagpole goes over a small wheel at the top. That wheel is a ___.|pulley|ramp;wedge;screw|mach|flag,🚩
An ax splits wood. Its sharp blade is a ___.|wedge|wheel;pulley;screw|mach
Which simple machine is like a ramp wrapped around a pole?|a screw|a wedge;a pulley;a seesaw|mach
Wagons and bikes are easy to move because they have ___.|wheels|wings;feathers;pockets|mach|bike,🚲
A doorknob is a kind of ___.|wheel and axle|ramp;pulley;wedge|mach|door,🚪
A slide at the playground is shaped like a ___.|ramp|pulley;wheel;wedge|mach
A shovel helps you lift dirt. It works like a ___.|lever|pulley;wheel;screw|mach
A doorstop is pushed under a door to hold it open. A doorstop is a ___.|wedge|wheel;pulley;screw|mach
A jar lid twists on and off. The ridges on the lid work like a ___.|screw|wheel;pulley;lever|mach
Simple machines help us by making work ___.|easier|harder;louder;messier|mach||Would you use a tool that makes a job harder? Think about why people use ramps and wheels.
You push a toy car softly, then hard. When does it go farther?|after the hard push|after the soft push;they go the same distance|move|car,🚗
A ball rolls toward you and you push it back. What happens?|it goes back the other way|it keeps rolling toward you;it rolls faster toward you|move|ball,⚽
Pulling a sled on snow is easier than on grass. Why?|snow is smooth and slippery|snow is bumpy;snow is sticky;grass is smooth|move
A shopping cart full of food is harder to push than an empty one. Why?|it is heavier|it is shinier;it is louder;it is newer|move
Which takes the smallest push to move?|a toy car with wheels|a heavy brick;a big box of books;a stack of plates|move
A magnet pulls on which one?|a steel paper clip|a crayon;a wooden block;a plastic spoon|move
What makes a swing go higher?|a bigger push|a smaller push;no push at all|move
Two ramps go up to the same step: a long, gentle ramp and a short, steep ramp. Which one is easier to push a wagon up?|the longer one|the shorter one;both are the same|move
`,
      kinds: [
        {form: 'sort', topic: 'mach', q: 'Sort them: does it have wheels, or not?', hint: 'Look for round parts that roll along the ground.', bins: {wheels: ['bike', 'car', 'bus'], 'no wheels': ['boat', 'sled']}},
        {form: 'sort', topic: 'move', q: 'Sort them: does it roll or slide when you push it?', hint: 'Round things roll. Flat things slide.', bins: {rolls: ['ball', 'marble', 'wheel'], slides: ['book', 'box', 'sled']}},
        {form: 'match', topic: 'mach', q: 'Match each simple machine to an example: ramp, pulley and wedge.', hint: 'One you slide down, one lifts a flag, and one holds a door.', pairs: [['ramp', 'playground slide'], ['pulley', 'flagpole rope'], ['wedge', 'doorstop']]},
        {form: 'match', topic: 'mach', q: 'Match each simple machine to an example: lever, screw and wheel and axle.', hint: 'One goes up and down, one twists, and one turns to open a door.', pairs: [['lever', 'seesaw'], ['screw', 'jar lid'], ['wheel and axle', 'doorknob']]},
        {form: 'order', topic: 'move', q: 'Put the carts in order, from easiest to hardest to push.', hint: 'The more it holds, the heavier it is.', order: ['an empty cart', 'a cart with two books', 'a cart full of rocks']},
        {form: 'sort', topic: 'move', q: 'Sort them: a push or a pull?', hint: 'A push moves something away from you. A pull brings it closer.', bins: {push: ['kick a ball', 'press a button'], pull: ['open a drawer', 'tug a rope', 'pick an apple']}},
        {form: 'sort', topic: 'mach', q: 'Sort them: a lever, or a wheel and axle?', hint: 'One kind tips up and down. The other kind turns round and round.', bins: {lever: ['seesaw', 'shovel'], 'wheel and axle': ['doorknob', 'wagon wheel', 'bike wheel']}},
        {form: 'match', topic: 'mach', q: 'Match each job to the simple machine that helps: lift a flag, split wood and roll a heavy load.', hint: 'Think of a rope, a blade and something round.', pairs: [['lift a flag', 'pulley'], ['split wood', 'wedge'], ['roll a heavy load', 'wheel and axle']]},
        {form: 'order', topic: 'move', q: 'Put the ramps in order, from easiest to hardest to push a cart up.', hint: 'The gentler the slope, the smaller the push.', order: ['a long gentle ramp', 'a medium ramp', 'a short steep ramp']}]},
    {id: 'civ_past', t: 'Long Ago & Today', e: '⏰', ico: 'clock', rows: `
Long ago, before electric lights, people lit their homes with ___.|candles|flashlights;light bulbs;televisions|longago
Long ago, before cars, many people traveled on land by ___.|horse and wagon|airplane;bus;motorcycle|longago|horse,🐴
Long ago, people sent messages far away by writing ___.|letters|emails;text messages;video calls|longago|mail,📬
Long ago, people kept food cold in an icebox. Today we use a ___.|refrigerator|toaster;oven;dishwasher|longago
Long ago, many children went to a school with ___.|one room for all grades|a computer for every child;a big gym and a lunchroom;a tablet on every desk|longago|school,🏫
Long ago, people washed clothes by hand on a ___.|washboard|washing machine;dishwasher;vacuum|longago
Which of these is from long ago?|a horse-drawn wagon|a tablet computer;a cell phone;a video game|longago
Which one did people NOT have long ago?|cell phones|candles;horses;books|longago||Candles, horses and books are very old. Which one needs a battery and a signal?
Long ago, people cooked over a fire. Today many people cook in a ___.|microwave oven|washboard;candle;icebox|longago
Long ago, people used a spinning wheel to make ___.|yarn|bread;soap;paper|longago
Long ago, there were no big supermarkets. Many families got food by ___.|growing it on a farm|ordering it on a computer;driving to a big store;using a vending machine|longago
What did children play long ago that children still play today?|tag|tablet games;phone games;online games|longago
Which is true about life long ago and today?|some things changed and some stayed the same|nothing has ever changed at all;everything changes every single day;people long ago had phones too|longago
Which word means the time that already happened?|past|present;future|timeline
Which word means the time that has not happened yet?|future|past;present|timeline
The time that is happening right now is called the ___.|present|past;future|timeline
A timeline puts events in order by ___.|when they happened|how big they are;what color they are;how much they cost|timeline||Look at the first and last things on a timeline. Which one came earlier?
A calendar helps us keep track of ___.|days, weeks and months|how tall we are;how hot it is;how far away a town is|timeline|month-jan,📆
How many days are in one week?|seven|five;ten;twelve|timeline
Many photos from long ago are in ___.|black and white|bright neon colors;moving video|history
Which of these can show the history of your family?|old photos and letters|a weather report;a grocery list;a bus schedule|history
A museum is a place where we can see ___.|things from long ago|only brand-new toys for sale;today's lunch menu;cars being fixed|history
`,
      kinds: [
        {form: 'sort', topic: 'longago', q: 'Sort them: used long ago, or new today?', hint: 'Was it around before electricity, or does it need a battery or a plug?', bins: {'long ago': ['candle', 'horse and wagon', 'washboard'], 'new today': ['cell phone', 'tablet', 'video game']}},
        {form: 'sort', topic: 'timeline', q: 'Sort the words: past or future?', hint: 'Did it already happen, or is it still coming?', bins: {past: ['yesterday', 'last year'], future: ['tomorrow', 'next week', 'next year']}},
        {form: 'match', topic: 'longago', q: 'Match long ago to today: icebox, horse and wagon, and letter.', hint: 'Think of what does the same job today.', pairs: [['icebox', 'refrigerator'], ['horse and wagon', 'car'], ['letter', 'email']]},
        {form: 'match', topic: 'timeline', q: 'Match each word to its time: yesterday, today and tomorrow.', hint: 'One already happened, one is now, and one is coming.', pairs: [['yesterday', 'past'], ['today', 'present'], ['tomorrow', 'future']]},
        {form: 'order', topic: 'timeline', q: 'Put them in order, from oldest to youngest.', hint: 'Think about who was born first in the family.', order: ['grandma', 'mom', 'baby']},
        {form: 'sort', topic: 'longago', q: 'Sort the lights: from long ago, or from today?', hint: 'Does it need a flame, or electricity?', bins: {'long ago': ['candle', 'oil lamp'], today: ['light bulb', 'flashlight', 'lamp with a switch']}},
        {form: 'sort', topic: 'longago', q: 'Sort the ways to travel: from long ago, or newer?', hint: 'Which ones need an engine?', bins: {'long ago': ['horse', 'wagon', 'sailing ship'], newer: ['airplane', 'car']}},
        {form: 'match', topic: 'longago', q: 'Match each old thing to what does its job today: washboard, candle and quill pen.', hint: 'Think of washing, lighting and writing.', pairs: [['washboard', 'washing machine'], ['candle', 'light bulb'], ['quill pen', 'ballpoint pen']]},
        {form: 'order', topic: 'longago', q: 'Put them in order, from long ago to today.', hint: 'Before engines, animals pulled people along.', order: ['horse and wagon', 'the first cars', 'cars of today']}]},
    {id: 'civ_work', t: 'Goods & Jobs', e: '🛍', ico: 'coin', rows: `
Things people make or grow to sell, like bread and shoes, are called ___.|goods|services;rules;chores|goods
Jobs people do to help others, like fixing teeth or cutting hair, are called ___.|services|goods;tools;toys|goods
Which of these is a good you can buy?|a loaf of bread|a haircut;a checkup at the doctor;a bus ride|goods
Which of these is a service someone does for you?|a haircut|a toy car;a pair of shoes;an apple|goods
A mail carrier brings letters to your home. That job is a ___.|service|good;tool;toy|goods
A farmer who grows apples to sell is a ___.|producer|consumer;shopper|goods
A person who buys and uses goods is called a ___.|consumer|producer;factory;store|goods
What does a factory do?|makes goods|puts out fires;teaches children;brings the mail|goods
A farmer grows wheat. A baker uses the wheat to make ___.|bread|shoes;bricks;glass|goods
Who fixes leaky pipes and sinks?|a plumber|a pilot;a librarian;a chef|jobs
Who flies an airplane?|a pilot|a plumber;a chef;a mechanic|jobs|plane,✈️
Who cooks meals in a restaurant?|a chef|a pilot;a plumber;a mechanic|jobs
Who fixes cars when they break?|a mechanic|a chef;a pilot;a librarian|jobs|car,🚗
Who builds things out of wood, like tables and shelves?|a carpenter|a pilot;a chef;a dentist|jobs
Most grown-ups work at jobs to ___.|earn money|lose money;get taller;stay asleep|money
You want a bike, but it costs more than you have. What can you do?|save your money|throw your money away;hide it and forget it;spend it all today|money|bike,🚲
A place that keeps money safe is a ___.|bank|bakery;library;park|money
Giving something to get something else back is called ___.|trading|sleeping;reading;running|money
The amount of money something costs is its ___.|price|color;size;name|money
Coins and paper bills are kinds of ___.|money|food;toys;stamps|money|coin,🪙
Where do people go to buy food?|a grocery store|a fire station;a library;a post office|money
`,
      kinds: [
        {form: 'sort', topic: 'goods', q: 'Sort them: a good or a service?', hint: 'Can you hold it in your hands, or is it a job someone does for you?', bins: {good: ['bread', 'shoes', 'toy car'], service: ['haircut', 'teeth cleaning']}},
        {form: 'sort', topic: 'goods', q: 'Sort them: grown on a farm, or made in a factory?', hint: 'Plants and animals live on farms. Machines make things in factories.', bins: {farm: ['apples', 'eggs', 'corn'], factory: ['cars', 'crayons']}},
        {form: 'match', topic: 'jobs', q: 'Match each worker to a tool: chef, plumber and carpenter.', hint: 'One cooks, one fixes pipes, and one cuts wood.', pairs: [['chef', 'pot'], ['plumber', 'wrench'], ['carpenter', 'saw']]},
        {form: 'match', topic: 'money', q: 'Match each place to what it does: bank, factory and store.', hint: 'One keeps money, one makes things, and one sells things.', pairs: [['bank', 'keeps money safe'], ['factory', 'makes goods'], ['store', 'sells goods']]},
        {form: 'order', topic: 'goods', q: 'Put the steps in order: how does bread get to you?', hint: 'It starts as a plant in a field.', order: ['farmer grows wheat', 'baker bakes bread', 'store sells bread', 'you buy bread']},
        {form: 'sort', topic: 'goods', q: 'Sort the workers: do they make goods or give services?', hint: 'Does the worker make a thing you can hold, or do a job for you?', bins: {goods: ['baker', 'farmer', 'toy maker'], services: ['barber', 'teacher', 'mail carrier']}},
        {form: 'sort', topic: 'money', q: 'Sort them: is it money, or not?', hint: 'Could you pay for something at a store with it?', bins: {money: ['coin', 'dollar bill'], 'not money': ['button', 'sticker', 'leaf']}},
        {form: 'match', topic: 'jobs', q: 'Match each worker to what they do: pilot, mechanic and chef.', hint: 'Think of a plane, a car and a kitchen.', pairs: [['pilot', 'flies planes'], ['mechanic', 'fixes cars'], ['chef', 'cooks food']]},
        {form: 'order', topic: 'money', q: 'Put the steps in order: how do you buy something at a store?', hint: 'You cannot take it home before you pay.', order: ['choose what you want', 'pay the price', 'take it home']}]},
  ],
  top: {
    sci_life: [
      {form: 'match', topic: 'babies', q: 'Match each baby to its grown-up: puppy, kitten and calf.', hint: 'Think of who each baby\'s mom is.', pairs: [['puppy', 'dog'], ['kitten', 'cat'], ['calf', 'cow']]},
      {form: 'match', topic: 'covers', q: 'Match each animal to what covers it: bird, fish and bear.', hint: 'Think about touching each animal.', pairs: [['bird', 'feathers'], ['fish', 'scales'], ['bear', 'fur']]},
      {form: 'order', topic: 'babies', q: 'Put them in order: how does a frog grow up?', hint: 'It starts in the water, very small.', order: ['egg', 'tadpole', 'frog']}],
    sci_earth: [
      {form: 'match', topic: 'seasons', q: 'Match each season to what you might see: winter, spring and fall.', hint: 'Think about the trees and the ground outside.', pairs: [['winter', 'snow'], ['spring', 'new flowers'], ['fall', 'falling leaves']]},
      {form: 'match', topic: 'landwater', q: 'Match each word to what it means: lake, river and beach.', hint: 'Think about where the water is, and if it moves.', pairs: [['lake', 'water with land all around'], ['river', 'water that flows'], ['beach', 'sand by the water']]},
      {form: 'order', topic: 'seasons', q: 'Put the seasons in order, starting with spring.', hint: 'After the flowers bloom, it gets hot.', order: ['spring', 'summer', 'fall', 'winter']}],
    sci_phys: [
      {form: 'match', topic: 'solid', q: 'Match each one to what it is: ice, water and steam.', hint: 'Which keeps its shape, which pours, and which floats into the air?', pairs: [['ice', 'solid'], ['water', 'liquid'], ['steam', 'gas']]},
      {form: 'match', topic: 'push', q: 'Match each one to how it moves: ball, sled and swing.', hint: 'Think about pushing each one.', pairs: [['ball', 'rolls'], ['sled', 'slides'], ['swing', 'goes back and forth']]},
      {form: 'order', topic: 'soundlight', q: 'Put them in order, from quietest to loudest.', hint: 'Which one could you hardly hear?', order: ['a whisper', 'talking', 'a shout']}],
    geo_world: [
      {form: 'match', topic: 'landforms', q: 'Match each word to what it means: island, mountain and desert.', hint: 'Think about water, height and rain.', pairs: [['island', 'land with water all around'], ['mountain', 'very high land'], ['desert', 'very dry land']]},
      {form: 'match', topic: 'mapwords', q: 'Match each direction to its letter on a compass rose.', hint: 'Each letter is the first letter of its word.', pairs: [['north', 'N'], ['south', 'S'], ['east', 'E'], ['west', 'W']]},
      {form: 'order', topic: 'mapwords', q: 'Put them in order, from smallest to biggest.', hint: 'A town is inside a state.', order: ['town', 'state', 'country', 'continent']}],
    civ: [
      {form: 'match', topic: 'helpers', q: 'Match each helper to where they work: teacher, doctor and firefighter.', hint: 'Think of the building each one goes to every day.', pairs: [['teacher', 'school'], ['doctor', 'hospital'], ['firefighter', 'fire station']]},
      {form: 'match', topic: 'symbols', q: 'Match each symbol to what it is: bald eagle, flag and Liberty Bell.', hint: 'One flies, one waves, and one rings.', pairs: [['bald eagle', 'national bird'], ['flag', 'stars and stripes'], ['Liberty Bell', 'bell with a crack']]},
      {form: 'order', topic: 'rules', q: 'Put the steps in order to cross a street safely.', hint: 'What do you do before you step off the curb?', order: ['stop at the curb', 'look left and right', 'cross when it is clear']}]},
  es: {
    animal: [['elefante', 'elephant', '🐘', 'el', 'elephant'], ['jirafa', 'giraffe', '🦒', 'la', 'giraffe'], ['tortuga', 'turtle', '🐢', 'la', 'turtle'], ['oveja', 'sheep', '🐑', 'la', 'sheep'], ['gallina', 'hen', '🐔', 'la', 'hen'], ['ratón', 'mouse', '🐭', 'el', 'mouse'], ['mariposa', 'butterfly', '🦋', 'la', 'butterfly'], ['ballena', 'whale', '🐳', 'la', 'whale']],
    food: [['fresa', 'strawberry', '🍓', 'la', 'strawberry'], ['sandía', 'watermelon', '🍉', 'la'], ['zanahoria', 'carrot', '🥕', 'la'], ['maíz', 'corn', '🌽', 'el'], ['pizza', 'pizza', '🍕', 'la', 'pizza'], ['pastel', 'cake', '🎂', 'el', 'cake'], ['arroz', 'rice', '🍚', 'el'], ['cacahuate', 'peanut', '🥜', 'el']],
    body: [['cara', 'face', '🙂', 'la'], ['brazo', 'arm', '💪', 'el'], ['corazón', 'heart', '❤', 'el'], ['hueso', 'bone', '🦴', 'el', 'bone']],
    family: [['familia', 'family', '👪', 'la']],
    color: [['gris', 'gray', 'c:#9ca3af', '']],
    greet: [['buenas tardes', 'Good afternoon', '☀', '', 'sun'], ['de nada', 'You\'re welcome', '😊', '']],
    house: [['espejo', 'mirror', '🪞', 'el'], ['reloj', 'clock', '⏰', 'el', 'clock'], ['jabón', 'soap', '🧼', 'el', 'soap'], ['escoba', 'broom', '🧹', 'la'], ['cuchara', 'spoon', '🥄', 'la', 'spoon'], ['taza', 'cup', '☕', 'la']],
    clothes: [['bufanda', 'scarf', '🧣', 'la'], ['bolsa', 'purse', '👜', 'la', 'purse'], ['anillo', 'ring', '💍', 'el']],
    school: [['crayón', 'crayon', '🖍', 'el', 'crayon'], ['regla', 'ruler', '📏', 'la'], ['pluma', 'pen', '🖊', 'la', 'pen'], ['pincel', 'paintbrush', '🖌', 'el'], ['cuaderno', 'notebook', '📒', 'el'], ['mapa', 'map', '🗺', 'el', 'map']],
    trans: [['tractor', 'tractor', '🚜', 'el'], ['trineo', 'sled', '🛷', 'el']],
    place: [['panadería', 'bakery', '🍞', 'la', 'bread'], ['gasolinera', 'gas station', '⛽', 'la'], ['aeropuerto', 'airport', '✈', 'el', 'plane'], ['puente', 'bridge', '🌉', 'el']],
    verb: [['cocinar', 'to cook', '🍳', ''], ['pintar', 'to paint', '🎨', ''], ['escuchar', 'to listen', '👂', '', 'ear'], ['mirar', 'to look', '👀', ''], ['abrir', 'to open', '🔓', ''], ['cerrar', 'to close', '🔒', '']],
    adj: [['abierto', 'open', '🔓', ''], ['cerrado', 'closed', '🔒', ''], ['duro', 'hard', '🪨', '', 'rock'], ['suave', 'soft', '🧸', '']]},
  // RELA-PICS: never offered together (the family picture shows a mom, a dad and a child; the face shows its eyes, nose and mouth)
  esConfuse: {family: [['familia', 'mamá'], ['familia', 'papá'], ['familia', 'hermano'], ['familia', 'hermana']], body: [['cara', 'ojos'], ['cara', 'nariz'], ['cara', 'boca']]},
  esNew: [
    {id: 'nature', t: 'Nature', e: '🌳', theme: 'Nature: sky, land, water and growing things', items: [['sol', 'sun', '☀', 'el', 'sun'], ['luna', 'moon', '🌙', 'la', 'moon'], ['estrella', 'star', '⭐', 'la', 'star'], ['árbol', 'tree', '🌳', 'el', 'tree'], ['flor', 'flower', '🌷', 'la', 'flower'], ['hoja', 'leaf', '🍃', 'la', 'leaf'], ['nube', 'cloud', '☁', 'la', 'cloud'], ['montaña', 'mountain', '🏔', 'la'], ['mar', 'sea', '🌊', 'el'], ['isla', 'island', '🏝', 'la'], ['piedra', 'rock', '🪨', 'la', 'rock'], ['concha', 'shell', '🐚', 'la', 'shell'], ['hongo', 'mushroom', '🍄', 'el'], ['desierto', 'desert', '🏜', 'el']]},
    {id: 'toy', t: 'Toys & Play', e: '🧸', theme: 'Toys and play things', items: [['pelota', 'ball', '⚽', 'la', 'ball'], ['globo', 'balloon', '🎈', 'el', 'balloon'], ['papalote', 'kite', '🪁', 'el', 'kite'], ['osito', 'teddy bear', '🧸', 'el'], ['tambor', 'drum', '🥁', 'el', 'drum'], ['guitarra', 'guitar', '🎸', 'la', 'guitar'], ['robot', 'robot', '🤖', 'el'], ['dado', 'dice', '🎲', 'el', 'dice'], ['rompecabezas', 'puzzle', '🧩', 'el'], ['piñata', 'piñata', '🪅', 'la'], ['trompeta', 'trumpet', '🎺', 'la', 'trumpet'], ['videojuego', 'video game', '🎮', 'el', 'gamepad'], ['patín', 'skate', '⛸', 'el']]}],
  esAt: {e_ciudad: [['es_nature', 1, 'Nature'], ['es_nature', 2, 'Read Nature']], e_casa: [['es_toy', 1, 'Toys'], ['es_toy', 2, 'Read Toys']]},
};
deep15Apply(); // the app loads this part after the data file, so the banks are there; the gate decides (52y-deep15.js). In tools/test.js, which reads
// the parts before the data, the banks are not there yet and this does nothing
/* ---------- DISC-46: Discover worlds for grades 4 and 6, DRAFTED for the owner (part teaches) ----------
   Every item here is listed in docs/drafts/DISC46-READ.md and reaches a child only once that file's status line says
   "status: reviewed <name> <YYYY-MM-DD>" (DISC46_ON, 42m-disc46on.js, BUILT by tools/build.py). disc46Apply (52z-disc46.js) adds them:
   - Canyon Trail (g 4), right after Science Lab, and Volcano Ridge (g 6), right after Star Observatory, with six new stops each.
   - Each stop: choice rows in the format of d-disc.js (question | answer | wrong answers split by ; | topic | picture (art name,emoji) |
     hint; a missing hint is the topic's own, D46_HINT), then sort, match and order items in the KINDS2 format.
   Pictures are ART drawings or emoji from tools/emoji-allow.txt, and only show the subject of a question, never its answer.
   Nothing here draws at random. No item teaches change over time in living things. */
const D46_HINT = {
  // Canyon Trail (grade 4)
  enspeed: 'Think about how hard something hits when it is slow, and then when it is quick.',
  enmove: 'Follow the energy from where it starts to where it ends up. What does it turn into along the way?',
  ensource: 'Ask where the energy comes from, and whether nature can make more of it soon.',
  wavepat: 'Picture ripples on a pond: how tall they are, how far apart they are, and what they do to things they pass.',
  seeing: 'Think about where the light starts, what it hits, and where it goes next.',
  codes: 'Think about how words can be turned into a pattern, like taps, flashes or digits, and turned back again.',
  wear: 'Think about what pushes, scrapes or carries the land, and how long it keeps working.',
  layers: 'Picture a stack of pancakes. Which went down first, and which went on last?',
  hazards: 'Think about what could happen to people and buildings, and what would help protect them.',
  outside: 'Look at the part on the outside of the plant or animal. Ask what job it does for it.',
  inside: 'Think about the parts you cannot see from the outside, and what each one does to keep the body alive.',
  signals: 'Think about how a body notices something and then decides what to do about it.',
  stategov: 'Think about who runs a state, who writes its rules, and where they do it.',
  localgov: 'Think about your own town or county, and the services close to home.',
  levels: 'Ask how big an area the job covers: one town, one whole state, or the whole nation.',
  usreg: 'Picture the map of the country. Think about the land, the weather and the work people do in each part.',
  resource: 'Ask if it comes from nature, from a person and what they know how to do, or is a tool made to make other things.',
  trade: 'Think about what each place makes best, and how people get the things they cannot make themselves.',
  // Volcano Ridge (grade 6)
  pyramid: 'Picture a stack of blocks that gets smaller at each step up. Think about what eats what, and how much is passed along.',
  partner: 'Ask who gains and who is harmed, or if one of them is not affected at all.',
  limits: 'Think about what a population needs to survive. What happens when one of those needs runs short?',
  layers6: 'Picture cutting Earth open like a peach. Think about what each part is like as you go deeper.',
  motion: 'Picture slabs of rock riding on a slowly flowing layer. Think about how they move against each other.',
  quakes: 'Think about what shakes, what the shaking can cause, and what people can do to stay safe.',
  airmass: 'Think about where the weather came from: over land or sea, near the poles or near the equator, and what happens when two kinds meet.',
  pressure: 'Think about air being squeezed or spread out, and what rising and sinking air do to the sky.',
  storms: 'Think about what each storm needs to form and grow, and where it gets its energy.',
  local: 'Think about where the air or weather starts, what it passes over on its trip, and what changes along the way.',
  ground: 'Follow the rain after it lands. Does it run off, soak in, or collect somewhere?',
  spread: 'Think about how Earth made the resource, and why it is found in some places and not others.',
  impact: 'Think about what people do, what it changes in nature, and what could be done instead.',
  river: 'Think about what a big river gives the people who live along it, and picture where each one flows.',
  invent: 'Think about what problem each new idea solved for the people of long ago.',
  life: 'Think about how life changed once farmers could grow more food than their families needed.',
  greece: 'Think about how the people of Athens and Sparta ran their towns, and the ideas they gave the world.',
  rome: 'Think about how Rome was run and what the Romans built that lasted.',
  china: 'Think about what the people of that land made, traded and built.',
};
const D46 = {
  // after: the world each new one follows (by id, so it does not matter whether DEEP-15's Discovery Garden is in yet); scene: SCN_W theme (a canyon, not Decimal Desert's pyramids; no lab flasks)
  worlds: [
    {after: 'd_lab', scene: ['desert', {lm: ['mountain', 'cactus'], pr: ['cactus', 'rock', 'dune', 'mountain', 'cactus', 'rock']}], w: {id: 'd_canyon', g: 4, n: 'Canyon Trail', e: '🏜', c: '#ffedd5', nodes: [['sci_enr', 1, 'Energy at Work'], ['sci_lite', 1, 'Light & Sound'], ['sci_shape', 1, 'Shaping the Land'], ['sci_part', 1, 'Body Parts at Work'], ['civ_gov4', 1, 'Our State Government'], ['civ_reg', 1, 'Regions & Resources']]}},
    {after: 'd_cosmos', scene: ['volcano', {lm: ['volcano', 'mountain'], pr: ['rock', 'volcano', 'crystal', 'pine', 'rock', 'mountain']}], w: {id: 'd_ridge', g: 6, n: 'Volcano Ridge', e: '🌋', c: '#ffe4e6', ico: 'volcano', nodes: [['sci_web', 1, 'Food Webs & Balance'], ['sci_deep', 1, 'Inside the Earth'], ['sci_storm', 1, 'Weather Systems'], ['sci_wres', 1, 'Water & Resources'], ['civ_river', 1, 'Early River Valleys'], ['civ_class', 1, 'Greece, Rome & China']]}}],
  // Science and Social studies: Discover's report strands (REP.STRANDS, 82-report.js)
  strands: {Science: 'sci_enr sci_lite sci_shape sci_part sci_web sci_deep sci_storm sci_wres', 'Geography and civics': 'civ_gov4 civ_reg civ_river civ_class'},
  disc: [
    // ---------------- Canyon Trail (grade 4) ----------------
    {id: 'sci_enr', t: 'Energy at Work', e: '⚡', ico: 'bolt', grade: '4', rows: `
Two balls are the same size. One rolls fast and one rolls slowly. Which has more energy?|the fast ball|the slow ball;they have the same;neither ball|enspeed
A bike speeds up as it goes down a hill. What happens to its energy of motion?|it gets bigger|it gets smaller;it stays the same;it disappears|enspeed
A bowling ball hits the pins and they fly apart. What did the ball pass to the pins?|energy|water;color;air|enspeed
A crash at high speed does more damage than a crash at low speed. Why?|the fast car has more energy|the slow car is heavier;fast cars are softer;slow cars have more energy than fast ones|enspeed
Two toy cars bump into each other. Which of these is made when they bump?|sound|ice;sunlight;rain|enspeed
A soccer ball is kicked harder than before. What happens?|it moves faster|it moves slower;it stops at once;it gets heavier|enspeed
When you rub your hands together quickly, they get ___.|warm|wet;cold;sticky|enmove
A doorbell button is pushed. The electricity is changed into ___.|sound|ice;water;wind|enmove|bell,🔔
Electric energy travels from a power plant to your home through ___.|wires|pipes;roads;clouds|enmove
A calculator has a small solar panel. The panel turns ___ into electricity.|light|sound;wind;water|enmove
A toy car with a battery rolls across the floor. The battery's stored energy became ___.|motion|water;color;sand|enmove
How does the sound of a bell travel to your ears?|as vibrations in the air|as light in the sky;as drops of water;as tiny sparks|enmove
You hold a cup of hot cocoa. Which way does the heat move?|from the cup to your hands|from your hands to the cup;from the cup to the ceiling only;it does not move at all|enmove
Which one changes electricity into sound?|a speaker|a lamp;a heater;a toaster|enmove
Coal, oil and natural gas formed from the remains of plants and animals that lived ___.|long ago|last year;last week;yesterday|ensource
Why are coal and oil called nonrenewable?|they take a very long time to form|they are found everywhere;they never run out;they grow back in a few weeks like grass|ensource
Which energy source will not run out?|sunlight|coal;oil;natural gas|ensource
A dam on a river uses moving ___ to make electricity.|water|sand;ice;rock|ensource
Burning fuels like coal and oil can make the air ___.|dirty|cleaner;colder;wetter|ensource
Which is a way to save energy at home?|turn off lights you are not using|leave the TV on all night;open the fridge door often;run hot water when nobody needs it|ensource
`,
      kinds: [
        {form: 'sort', topic: 'ensource', q: 'Sort the energy sources: renewable or nonrenewable?', hint: 'Ask if nature makes more of it soon, or if it took a very long time to form.', bins: {renewable: ['sunlight', 'wind', 'moving water'], nonrenewable: ['coal', 'oil', 'natural gas']}},
        {form: 'sort', topic: 'enmove', q: 'Sort them: does it change electricity into light, or into sound?', hint: 'Think about what you notice when each one is switched on: do you see it or hear it?', bins: {light: ['lamp', 'flashlight', 'ceiling light'], sound: ['doorbell', 'speaker', 'radio']}},
        {form: 'sort', topic: 'enspeed', q: 'Sort them: is it moving energy or stored energy?', hint: 'Is it moving right now, or is it holding energy to use later?', bins: {moving: ['a rolling ball', 'a spinning fan', 'a flying kite'], stored: ['a battery', 'a stretched rubber band', 'a log of firewood']}},
        {form: 'match', topic: 'enmove', q: 'Match each thing to the energy it gives off: drum, oven and flashlight.', hint: 'One you hear, one warms the kitchen, and one helps you see in the dark.', pairs: [['drum', 'sound'], ['oven', 'heat'], ['flashlight', 'light']]},
        {form: 'match', topic: 'ensource', q: 'Match each machine to what it uses to make electricity: solar panel, wind turbine and dam.', hint: 'Think about what shines on it, blows on it or flows through it.', pairs: [['solar panel', 'sunlight'], ['wind turbine', 'moving air'], ['dam', 'moving water']]},
        {form: 'order', topic: 'enmove', q: 'Put them in order: how does electricity get from a power plant to a lamp?', hint: 'Start where the electricity is made.', order: ['power plant', 'wires', 'outlet in the wall', 'lamp']},
        {form: 'order', topic: 'enspeed', q: 'Put the balls in order from least to most energy of motion.', hint: 'A ball that is not moving has none. The quicker it goes, the more it has.', order: ['a ball sitting still', 'a ball rolling slowly', 'a ball rolling fast']}]},
    {id: 'sci_lite', t: 'Light & Sound', e: '🔦', ico: 'eye', grade: '4', rows: `
A toy boat floats on a pond. A wave passes by. What does the boat do?|it bobs up and down|it races to the shore;it sinks to the bottom;it spins in a circle|wavepat|boat,⛵
How tall a wave is, from its resting level to its top, is called its ___.|amplitude|wavelength;speed;color|wavepat
Two waves are the same height. The one with tops farther apart has a longer ___.|wavelength|amplitude;shadow;echo|wavepat
Big ocean waves carry ___ energy than small ripples.|more|less;the same;no|wavepat
A loud drum beat and a soft drum beat: which sound wave has a bigger amplitude?|the loud beat|the soft beat;they are the same;neither has one|wavepat|drum,🥁
Over many years, ocean waves can slowly wear away a ___.|rocky cliff|cloud;rainbow;shadow|wavepat
Sound is made when something ___.|vibrates|freezes;melts;shrinks|wavepat
You can see a book because light bounces off it and enters your ___.|eyes|ears;nose;hands|seeing
In a completely dark room, can you see a red ball?|no, because no light reaches your eyes|yes, if you stare at it for a long time;yes, red things shine;only if it is big|seeing||Think about what has to bounce off the ball and travel to you before you can see it.
Which surface reflects light best?|a smooth mirror|a black rug;a fuzzy wool sweater;a pile of dirt|seeing
Light travels in ___ lines.|straight|curly;zigzag;looping|seeing
A shadow forms when an object ___ light.|blocks|makes;bends;speeds up|seeing
Light passes easily through ___.|clear glass|a brick wall;a wooden door;a metal pan|seeing
You see lightning before you hear its thunder. Why?|light travels faster than sound|sound travels faster than light;thunder happens much later;your ears are asleep|seeing||Both happen at the same moment. Which one gets to you first, and what does that tell you?
Long ago people sent messages over wires as long and short clicks. This was ___.|Morse code|a radio show;a phone call;a letter|codes
A computer stores pictures and words as patterns of ___.|numbers|colors;sounds;tiny drawings|codes
A light that blinks on and off in a pattern can send a ___.|message|smell;taste;temperature|codes
A drum pattern can carry a message far away because sound ___.|travels through the air|stays in one place;turns into light;cannot be heard|codes
When you send a text, your words travel as a ___.|coded signal|paper letter;puff of smoke;loud shout|codes
`,
      kinds: [
        {form: 'sort', topic: 'seeing', q: 'Sort them: does light pass through it, or is light blocked?', hint: 'Could you read a book held behind it?', bins: {'light passes through': ['clear glass', 'clean water', 'plastic wrap'], 'light is blocked': ['a brick', 'a book', 'a wooden board']}},
        {form: 'sort', topic: 'codes', q: 'Sort them: does it send a message with sound, or with light?', hint: 'Would you hear it or see it?', bins: {sound: ['drum beats', 'a whistle', 'a ringing bell'], light: ['a blinking flashlight', 'a lighthouse beam', 'a traffic light']}},
        {form: 'sort', topic: 'seeing', q: 'Sort them: does it give off its own light, or only reflect light?', hint: 'Would it still shine in a dark room with every other light off?', bins: {'gives off light': ['the Sun', 'a lamp', 'a campfire'], 'only reflects light': ['the Moon', 'a mirror', 'a spoon']}},
        {form: 'match', topic: 'wavepat', q: 'Match each word to what it means: amplitude, wavelength and vibration.', hint: 'One is about height, one is about distance, and one is about shaking.', pairs: [['amplitude', 'how tall a wave is'], ['wavelength', 'the distance from top to top'], ['vibration', 'a quick back and forth motion']]},
        {form: 'match', topic: 'seeing', q: 'Match each body part to what it senses: eyes, ears and skin.', hint: 'Think about what you see, what you hear and what you feel.', pairs: [['eyes', 'light'], ['ears', 'sound'], ['skin', 'heat']]},
        {form: 'order', topic: 'seeing', q: 'Put them in order: how do you see a tree?', hint: 'Start where the light begins.', order: ['the Sun gives off light', 'light bounces off the tree', 'light enters your eyes', 'your brain makes sense of it']},
        {form: 'order', topic: 'wavepat', q: 'Put the waves in order from smallest to biggest amplitude.', hint: 'Think about how tall each wave is.', order: ['a ripple in a puddle', 'a wave on a lake', 'a big ocean wave']}]},
    {id: 'sci_shape', t: 'Shaping the Land', e: '🏔', ico: 'globe', grade: '4', rows: `
A river cuts deeper and deeper into rock. Over a very long time it can make a ___.|canyon|volcano;island;glacier|wear
Water seeps into a crack in a rock and freezes. What happens to the crack?|it gets wider|it gets smaller;it fills with sand;it closes up|wear|ice,🧊
A tree's roots grow into a crack in a rock. Over time the roots can ___.|split the rock|glue the rock;melt the rock;polish the rock|wear
Rocks that tumble along a fast stream for a long time become ___.|smooth and round|sharp and jagged;bigger and heavier;soft and sticky|wear
Strong winds blow sand against a rock for many years. What happens to the rock?|it wears down|it grows bigger;it turns to ice;it gets heavier|wear
A heavy rain washes soil off a bare hillside. This is ___.|erosion|melting;freezing;evaporation|wear
Where a river slows down and enters the sea, it drops sand and mud. This can build a ___.|delta|canyon;cave;volcano|wear
In rock layers that have not been moved, which one is usually the oldest?|the one at the bottom|the one on top;the one in the middle;the thinnest one|layers
A rock layer holds fossils of ferns that need a lot of rain. What was the place like when that layer formed?|wet and green|icy and frozen;dry and sandy;deep under the sea|layers
Rock layers are like pages in a history book because they show ___.|what happened in the past|what will happen next year;what people think;how to build a house|layers
A layer with fish fossils lies under a layer with fossils of land plants. What changed?|water turned into dry land|dry land turned into a sea;the place got icy;nothing changed at all|layers
Scientists who study rocks and the history of Earth are called ___.|geologists|astronauts;chefs;pilots|layers
On a map of the world, earthquakes and volcanoes are not spread out evenly. How are most of them found?|in long belts|evenly everywhere;only near the poles;only in deserts|hazards
A flood warning is given for your town. What is the safest thing to do?|move to higher ground|go and look at the river;stay in the basement;drive through deep water|hazards
Engineers build some buildings to sway a little in an earthquake so they ___.|do not fall down|fall down faster;sink into the ground;make more noise|hazards
A levee is a high bank of earth built along a river to ___.|keep floods out of towns|make the river faster;catch fish;help boats cross the river|hazards
Scientists watch a volcano for small earthquakes and gas. These can be signs that it may ___.|erupt soon|freeze over;turn into a lake;stop forever|hazards|volcano,🌋
A landslide is most likely on a ___.|steep hill after heavy rain|flat field on a dry day;sandy beach at low tide;parking lot in summer|hazards
Planting trees on a bare hillside helps stop ___.|soil from washing away|the wind from blowing;the Sun from shining;rain from falling|hazards
`,
      kinds: [
        {form: 'sort', topic: 'hazards', q: 'Sort them: does the change happen fast or slowly?', hint: 'Some changes take minutes. Others take a very long time.', bins: {fast: ['an earthquake', 'a landslide', 'a flood'], slowly: ['a river carving a canyon', 'wind wearing down a rock', 'a glacier moving']}},
        {form: 'sort', topic: 'wear', q: 'Sort them: weathering (breaking rock apart) or erosion (carrying it away)?', hint: 'Does the rock stay where it is in smaller pieces, or do the pieces travel?', bins: {weathering: ['ice cracking a rock', 'roots splitting a rock'], erosion: ['a river carrying sand', 'wind blowing dust away', 'a glacier pushing rocks']}},
        {form: 'sort', topic: 'hazards', q: 'Sort them: a natural hazard, or a way to stay safe?', hint: 'Does it cause harm, or does it protect people from harm?', bins: {'natural hazard': ['flood', 'earthquake', 'volcano'], 'way to stay safe': ['levee', 'warning siren', 'flood map']}},
        {form: 'match', topic: 'hazards', q: 'Match each problem to a way to stay safer: flood, earthquake and landslide.', hint: 'One needs a wall, one needs strong buildings, and one needs roots to hold the soil.', pairs: [['flood', 'a levee'], ['earthquake', 'buildings that sway'], ['landslide', 'plants on the hillside']]},
        {form: 'match', topic: 'wear', q: 'Match each landform to what shaped it: canyon, sand dune and delta.', hint: 'Which ones are made by water, and which by wind? Does the water cut or drop?', pairs: [['canyon', 'a river cutting down'], ['sand dune', 'wind piling up sand'], ['delta', 'a river dropping mud']]},
        {form: 'order', topic: 'layers', q: 'Put the rock layers in order from oldest to youngest.', hint: 'The first layer to settle ends up under the others.', order: ['bottom layer', 'middle layer', 'top layer']},
        {form: 'order', topic: 'wear', q: 'Put them in order: how does a delta form?', hint: 'Start high up, where the water first falls.', order: ['rain falls on the land', 'a river carries sand and mud', 'the river slows at the sea', 'sand and mud pile up']}]},
    {id: 'sci_part', t: 'Body Parts at Work', e: '🦉', ico: 'paw', grade: '4', rows: `
A rose has sharp thorns on its stem. How do the thorns help the rose?|they keep animals from eating it|they help it drink water;they make it smell sweet;they catch sunlight to make food for the leaves|outside
A turtle's hard shell helps it ___.|stay safe from predators|swim faster;find food;see in the dark|outside
A flower's bright colors and sweet smell help bring ___ to it.|bees and butterflies|rain and snow;rocks and sand;worms and snails|outside
An eagle's sharp, curved claws help it ___.|grab and hold its food|dig deep tunnels;swim in the sea;keep its eggs cool|outside|eagle,🦅
A fish uses its fins to ___.|steer and swim|breathe air;see in the dark;eat|outside
A porcupine's sharp quills help it ___.|protect itself|fly;dig;swim|outside
A duck's feathers are coated with oil. This keeps the duck ___.|dry in the water|hot in the sun;heavy in the air;hidden in the grass|outside
Which part inside your body is a muscle that keeps working even while you sleep?|the heart|the stomach;the skull;the hair|inside
Fish take in oxygen from the water with their ___.|gills|fins;scales;tails|inside|fish,🐟
Your skeleton gives your body its shape and ___.|support|color;taste;a sense of smell|inside
Tiny tubes inside a plant's stem carry ___ up from the roots to the leaves.|water|light;seeds;soil|inside
Muscles move your bones by ___.|pulling on them|growing hair on them;pumping blood into them;making them hollow|inside
Your stomach helps your body ___.|break down food|see colors;hear sounds;pump blood|inside
Your skull protects your ___.|brain|heart;stomach;lungs|inside
You touch a hot pan and pull your hand away fast. What carried the message?|your nerves|your hair;your bones;your fingernails|signals
Where does your body make sense of what your eyes see?|in the brain|in the stomach;in the hands;in the feet|signals
A rabbit hears a twig snap and runs away. Which sense warned it?|hearing|taste;touch;eyesight|signals
An owl hunts at night. What helps it find mice in the dark?|sharp hearing|a long tail;bright colors;strong legs|signals|owl,🦉
You smell smoke and leave the room. Your brain used a message from your ___.|nose|ears;knees;tongue|signals
A snake flicks its tongue in and out to ___.|smell the air|cool its body;make a sound;clean its teeth|signals|snake,🐍
`,
      kinds: [
        {form: 'sort', topic: 'inside', q: 'Sort them: a part on the outside of the body, or one inside it?', hint: 'Could you see it in a mirror?', bins: {outside: ['skin', 'hair', 'fingernails'], inside: ['heart', 'lungs', 'stomach']}},
        {form: 'sort', topic: 'outside', q: 'Sort the parts: does it help protect, or help move?', hint: 'Does it keep the plant or animal safe, or carry it from place to place?', bins: {protect: ['turtle shell', 'rose thorns', 'porcupine quills'], move: ['fish fins', 'bird wings', 'frog legs']}},
        {form: 'sort', topic: 'inside', q: 'Sort the plant parts: does it help make new plants, or move water?', hint: 'Think about where seeds come from, and how water gets from the soil to the leaves.', bins: {'makes new plants': ['flower', 'seed', 'fruit'], 'moves water': ['roots', 'stem']}},
        {form: 'match', topic: 'inside', q: 'Match each part to its job: heart, lungs and stomach.', hint: 'One works with blood, one with air, and one with food.', pairs: [['heart', 'pumps blood'], ['lungs', 'take in air'], ['stomach', 'breaks down food']]},
        {form: 'match', topic: 'outside', q: 'Match each animal to the part that helps it get food: eagle, woodpecker and frog.', hint: 'One grabs, one pecks wood, and one catches flies.', pairs: [['eagle', 'sharp claws'], ['woodpecker', 'strong beak'], ['frog', 'sticky tongue']]},
        {form: 'order', topic: 'signals', q: 'Put them in order: what happens when you hear your name?', hint: 'Start with the sound in the air.', order: ['sound reaches your ear', 'nerves carry the message', 'your brain understands it', 'you turn your head']},
        {form: 'order', topic: 'inside', q: 'Put them in order: how does water travel through a plant?', hint: 'Start under the ground.', order: ['roots take in water', 'tubes in the stem carry it up', 'water reaches the leaves']}]},
    {id: 'civ_gov4', t: 'Our State Government', e: '⚖', ico: 'scale', grade: '4', rows: `
Who signs bills to make them state laws?|the governor|the mayor;the principal;the President|stategov
The group of elected people who make the laws for a state is the state ___.|legislature|school board;city council;library board|stategov
A state's capital city is where ___.|lawmakers and the governor work|the most people in the state live;the oldest tree grows;the longest river starts|stategov
Who decides if someone broke a state law?|courts and judges|the governor alone;the city council;the fire department|stategov
Every state has its own constitution. It is a plan for ___.|how its government works|how many trees to plant;where the beaches are;which songs to sing|stategov
State governments use tax money to pay for things like ___.|highways and parks|people's own cars;the toys in stores;the food in your kitchen|stategov
Each state sends people to Congress in Washington, D.C. Congress makes laws for ___.|the whole country|only one town;only one school;only the state capital|stategov
In many cities, the group that makes local laws is the ___.|city council|Supreme Court;Congress;state legislature|localgov
Which service is usually run by a city or town?|trash and recycling pickup|printing money;the army;delivering the mail|localgov
Most states are divided into smaller areas called ___.|counties|continents;countries;hemispheres|localgov
A school board makes decisions about ___.|the public schools in an area|the state highways;the country's army;the forests and parks of the nation|localgov
A town's public library is paid for mostly by ___.|local taxes|library fines;bake sales;selling old books|localgov
People in a town want a new park. Who should they ask?|their city council|the President;a judge;the governor of another state|localgov
Which job belongs to the national government, not a state or a town?|printing money|fixing a town's potholes;running a city park;picking up trash|levels
Which is usually done by a state government?|giving out driver's licenses|printing money;running the post office;picking up trash|levels
A mayor leads a city. A governor leads a state. Who leads the whole country?|the President|the mayor;the governor;the judge|levels
Citizens choose their governor by ___.|voting in an election|drawing names from a hat;picking the oldest person;having a race|levels
A town, a state and the nation each have a government. This means people follow ___.|laws from all three|only town laws;only national laws;no laws at all|levels
Why do towns have their own governments?|to take care of local needs|to print their own money;to have their own army;to choose the President|levels
`,
      kinds: [
        {form: 'sort', topic: 'levels', q: 'Sort the jobs: town government or state government?', hint: 'Does the job cover one town, or the whole state?', bins: {town: ['trash pickup', 'city parks', 'the town library'], state: ["driver's licenses", 'state highways', 'state parks']}},
        {form: 'sort', topic: 'levels', q: 'Sort the jobs: national government or town government?', hint: 'Is it the same for the whole country, or does each town take care of it?', bins: {national: ['printing money', 'the army', 'the post office'], town: ['fixing town streets', 'trash pickup', 'the town fire station']}},
        {form: 'match', topic: 'levels', q: 'Match each leader to what they lead: mayor, governor and President.', hint: 'Think from small to big: a city, a state, the country.', pairs: [['mayor', 'a city'], ['governor', 'a state'], ['President', 'the country']]},
        {form: 'match', topic: 'stategov', q: 'Match each group to the laws it makes: city council, state legislature and Congress.', hint: 'Match the size of the group\'s area to the size of the area its laws cover.', pairs: [['city council', 'town laws'], ['state legislature', 'state laws'], ['Congress', 'national laws']]},
        {form: 'order', topic: 'localgov', q: 'Put them in order from smallest area to biggest.', hint: 'A town is inside a county, and a county is inside a state.', order: ['town', 'county', 'state', 'country']},
        {form: 'order', topic: 'stategov', q: 'Put them in order: how does a bill become a state law?', hint: 'Someone has to write it first, and the governor comes near the end.', order: ['a lawmaker writes a bill', 'the legislature votes yes', 'the governor signs it', 'it becomes a law']}]},
    {id: 'civ_reg', t: 'Regions & Resources', e: '🗺', ico: 'map', grade: '4', rows: `
The Midwest has flat land and rich soil. It is known for growing ___.|corn and wheat|oranges and lemons;coconuts;bananas|usreg
The Southwest has many deserts. Its weather is mostly ___.|hot and dry|cold and snowy;rainy all year;foggy and cool|usreg
The Rocky Mountains run through the ___ region.|West|Southeast;Northeast;Midwest|usreg
Many of the oldest cities in the United States, like Boston, are in the ___.|Northeast|Southwest;West;Midwest|usreg
Florida, in the Southeast, is famous for growing ___.|oranges|apples;cranberries;wheat|usreg
The Pacific Ocean is along the coast of the ___ region.|West|Northeast;Southeast;Midwest|usreg
Which region has much of the Great Plains, with its many farms and ranches?|the Midwest|the Northeast;the Southeast;the Pacific coast|usreg
Why do many people in the Northeast work in fishing and shipping?|it is next to the Atlantic Ocean|it has no rivers;it is in a desert;it is far from any ocean or lake|usreg
Which region is most often hit by hurricanes in late summer and fall?|the Southeast|the Midwest;the Rocky Mountains;the Great Plains|usreg
Water, trees and soil are ___ resources.|natural|human;capital;money|resource
A doctor's skills and knowledge are a ___ resource.|human|natural;capital;mineral|resource
A tractor a farmer uses to grow crops is a ___ resource.|capital|natural;human;water|resource|tractor,🚜
A sawmill turns logs into boards. The logs come from which natural resource?|trees|rocks;oil;sand|resource
Which one is a human resource?|a teacher's skill at teaching|a forest;a river;a hammer|resource
Why can't every place make everything it needs?|places have different resources|every place is the same;nothing grows anywhere;there are no tools|resource
Florida grows oranges and Idaho grows potatoes. How can people in each state get both?|by trading|by stopping all trucks;by growing only one;by closing the stores|trade
Goods a country buys from other countries are called ___.|imports|exports;taxes;savings|trade
Goods a country sells to other countries are called ___.|exports|imports;loans;wages|trade
When a region makes a lot of one thing it does well, it is ___.|specializing|borrowing;saving;voting|trade
Trucks, trains and ships help trade because they ___.|carry goods between cities and states|grow food on the way;print money;change the weather|trade
`,
      kinds: [
        {form: 'sort', topic: 'resource', q: 'Sort the resources: natural, or capital (a tool people made to make other things)?', hint: 'Did nature make it, or did people build it?', bins: {natural: ['trees', 'water', 'soil'], capital: ['a tractor', 'a factory machine', 'a delivery truck']}},
        {form: 'sort', topic: 'resource', q: 'Sort the resources: natural or human?', hint: 'Is it part of the land, or is it what a person knows how to do?', bins: {natural: ['a river', 'a forest', 'a field of soil'], human: ["a nurse's skill", "a builder's work", "a teacher's knowledge"]}},
        {form: 'sort', topic: 'usreg', q: 'Sort the regions: on the Atlantic coast, or not?', hint: 'Picture the map. The Atlantic is along the east side of the country.', bins: {'on the Atlantic coast': ['Northeast', 'Southeast'], 'not on it': ['Midwest', 'Southwest', 'West']}},
        {form: 'match', topic: 'usreg', q: 'Match each region to what it is known for: Midwest, Southwest and Northeast.', hint: 'Think about farms in the middle, deserts in the southwest, and old cities by the sea.', pairs: [['Midwest', 'corn and wheat farms'], ['Southwest', 'hot, dry deserts'], ['Northeast', 'old cities by the sea']]},
        {form: 'match', topic: 'trade', q: 'Match each word to its meaning: import, export and trade.', hint: 'Im- means in, ex- means out.', pairs: [['import', 'to buy from another place'], ['export', 'to sell to another place'], ['trade', 'to swap goods or services']]},
        {form: 'order', topic: 'trade', q: 'Put them in order: how does wheat from a Midwest farm become bread in a store far away?', hint: 'Start in the field where the wheat grows.', order: ['farmers grow wheat', 'a mill grinds it into flour', 'a bakery bakes bread', 'trucks bring it to stores']},
        {form: 'order', topic: 'usreg', q: 'Put the regions in order from east to west.', hint: 'Start on the Atlantic coast.', order: ['Northeast', 'Midwest', 'West']}]},
    // ---------------- Volcano Ridge (grade 6) ----------------
    {id: 'sci_web', t: 'Food Webs & Balance', e: '🦊', ico: 'paw', grade: '6', rows: `
In an energy pyramid, which level has the most energy?|the producers at the bottom|the top predators;the middle consumers;the large hunters at the very top|pyramid
About how much of the energy at one level of an energy pyramid passes up to the next level?|10 percent|90 percent;all of it;none of it|pyramid
Most of the energy at each level is not passed up. Where does it go?|it is used for living and lost as heat|it turns into soil;it goes back to the Sun;it is saved forever inside the animal|pyramid
Why are there fewer hawks than mice in a field?|less energy reaches the top level|hawks are younger;mice hunt hawks;hawks never eat|pyramid
A bear eats berries, fish and insects. This makes it ___.|an omnivore|a herbivore;a producer;a decomposer|pyramid|bear,🐻
Fungi and bacteria break down dead things and return nutrients to the soil. They are ___.|decomposers|producers;predators;herbivores|pyramid|mushroom,🍄
In a food web, an arrow points from the grass to the grasshopper. What does the arrow show?|which way the energy flows|where the grasshopper lives;how tall the grass grows;which one is older|pyramid
A tick feeds on a dog's blood and harms the dog. This relationship is ___.|parasitism|mutualism;commensalism;competition|partner
A bird builds a nest in a tree. The bird is helped and the tree is not affected. This is ___.|commensalism|parasitism;mutualism;predation|partner|tree,🌳
Bees get nectar from flowers and carry pollen between them. Both are helped. This is ___.|mutualism|parasitism;commensalism;predation|partner|bee,🐝
An owl hunts and eats a mouse. In this relationship the owl is the ___.|predator|prey;producer;parasite|partner|owl,🦉
In parasitism, the living thing that is harmed is called the ___.|host|predator;producer;partner|partner
Sea otters eat sea urchins, and sea urchins eat kelp. What happens to the kelp if the otters disappear?|it gets eaten away|it grows faster;it stays the same;it spreads farther|partner
Anything that keeps a population from growing larger, like a shortage of food or space, is a ___.|limiting factor|food chain;habitat;producer|limits
The largest population an area can support over time is its ___.|carrying capacity|food web;energy pyramid;habitat size|limits
A dry summer leaves little grass on a prairie. What will likely happen to the number of prairie dogs?|it will go down|it will go up;it will double;it will stay exactly the same|limits
Deer have plenty of food and no wolves nearby. Their population will likely ___.|grow|shrink;disappear;stay tiny|limits
Two kinds of birds want the same few nesting holes in old trees. What are they competing for?|shelter|water;sunlight;food|limits
Wolves were brought back to a park and began hunting elk there. Over time the number of elk ___.|went down|went up;doubled;stayed the same|limits
Which is a non-living factor that can limit a population?|the amount of water|the number of hawks;the number of mice;a disease germ|limits
`,
      kinds: [
        {form: 'sort', topic: 'pyramid', q: 'Sort the living things: producer or consumer?', hint: 'Does it make its own food from sunlight, or does it eat other living things?', bins: {producer: ['grass', 'an oak tree', 'algae'], consumer: ['a hawk', 'a deer', 'a grasshopper']}},
        {form: 'sort', topic: 'pyramid', q: 'Sort the eaters: herbivore or carnivore?', hint: 'Does it eat plants, or other animals?', bins: {herbivore: ['a deer', 'a rabbit', 'a cow'], carnivore: ['a wolf', 'a shark', 'an eagle']}},
        {form: 'sort', topic: 'limits', q: 'Sort them: does it help a deer population grow, or make it shrink?', hint: 'Does it give the deer more of what they need, or take something away?', bins: {grow: ['plenty of food', 'a mild winter', 'lots of space'], shrink: ['more wolves', 'a long drought', 'a disease']}},
        {form: 'match', topic: 'partner', q: 'Match each relationship to an example: mutualism, commensalism and parasitism.', hint: 'Both helped, one helped and one not affected, or one helped and one harmed.', pairs: [['mutualism', 'bees and flowers'], ['commensalism', 'a bird nesting in a tree'], ['parasitism', 'a tick on a dog']]},
        {form: 'match', topic: 'pyramid', q: 'Match each role to an example: producer, consumer and decomposer.', hint: 'One makes food, one eats food, and one breaks down what is left.', pairs: [['producer', 'grass'], ['consumer', 'a fox'], ['decomposer', 'a mushroom']]},
        {form: 'order', topic: 'pyramid', q: 'Put the food chain in order, starting with where the energy comes from.', hint: 'Start in the sky, then the plant, then follow who eats whom.', order: ['the Sun', 'grass', 'grasshopper', 'frog', 'snake']},
        {form: 'order', topic: 'pyramid', q: 'Put the levels of an energy pyramid in order from most energy to least.', hint: 'Start at the wide bottom of the pyramid.', order: ['producers', 'plant eaters', 'animals that eat plant eaters', 'top predators']}]},
    {id: 'sci_deep', t: 'Inside the Earth', e: '🌋', ico: 'globe', grade: '6', rows: `
As you go deeper inside Earth, the temperature ___.|goes up|goes down;stays the same;drops to freezing|layers6
The stiff outer shell made of the crust and the very top of the mantle is the ___.|lithosphere|atmosphere;hydrosphere;inner core|layers6
The soft, slowly flowing part of the mantle that the plates ride on is the ___.|asthenosphere|crust;inner core;ozone layer|layers6
The inner core is hotter than the outer core, but it is solid. Why?|the pressure there is so great|it is made of ice;it is far from the Sun;it is cooled by the ocean above it|layers6
Earth's core is made mostly of the metals iron and ___.|nickel|gold;silver;copper|layers6
How do scientists learn about Earth's deep layers, where no one has ever been?|by studying earthquake waves|by digging to the center;by looking with telescopes;by drilling a hole all the way through|layers6
Which part of Earth do we live on?|the crust|the mantle;the outer core;the inner core|layers6
Heat from deep inside Earth makes mantle rock flow in slow loops called ___.|convection currents|ocean waves;jet streams;tides|motion
Along the mid-ocean ridge, plates pull apart and new ___ forms.|seafloor|ice sheet;coral reef;sand dune|motion
A deep ocean trench forms where one plate ___.|sinks under another|pulls away from another;slides past another;stops moving|motion
The Hawaiian Islands formed as a plate moved slowly over a ___.|hot spot|trench;glacier;cold front|motion
The Himalaya Mountains are still growing taller because two plates are ___.|pushing together|pulling apart;sliding past each other;standing still|motion|mountain,🏔
Earth's plates move very slowly, about as fast as ___.|your fingernails grow|a person walks;a river flows;a snail crawls|motion
In East Africa, the land is slowly splitting as two plates pull apart. This makes a long ___.|rift valley|sand dune;coral reef;ice sheet|motion
Hot, melted rock rising up from the mantle can break through the crust and form a ___.|volcano|glacier;canyon;delta|motion
An earthquake under the ocean can push up a giant wave called a ___.|tsunami|hurricane;tornado;high tide|quakes
If you feel an earthquake indoors, what should you do?|drop, cover and hold on|run outside right away;stand by a window;ride the elevator down|quakes
The point deep underground where an earthquake begins is the ___.|focus|epicenter;crater;summit|quakes
Most earthquakes happen when rocks along a ___ suddenly slip.|fault|river;cloud;cave|quakes
Why do people use bendable steel frames for buildings in places with many earthquakes?|so they bend instead of breaking|so they look shiny;so they cost less;so they stay warm in the winter months|quakes
Scientists cannot yet predict the exact day of an earthquake, but they can ___.|map where earthquakes are likely|stop earthquakes from happening;make earthquakes smaller;move the plates back|quakes
`,
      kinds: [
        {form: 'sort', topic: 'layers6', q: 'Sort the layers: solid, or liquid or soft?', hint: 'The very middle is squeezed so hard it stays solid. The part around it is melted metal.', bins: {solid: ['crust', 'inner core'], 'liquid or soft': ['outer core', 'asthenosphere']}},
        {form: 'sort', topic: 'motion', q: 'Sort them: does it form where plates pull apart, or where they push together?', hint: 'New crust fills a gap. Crashing plates fold up or one sinks.', bins: {'pull apart': ['mid-ocean ridge', 'rift valley'], 'push together': ['ocean trench', 'Himalaya Mountains']}},
        {form: 'sort', topic: 'quakes', q: 'Sort them: safe or not safe to do in an earthquake?', hint: 'Stay low, protect your head, and keep away from glass.', bins: {'safe to do': ['drop to the floor', 'cover your head', 'hold on to a table'], 'not safe': ['stand by a window', 'run down the stairs', 'use the elevator']}},
        {form: 'match', topic: 'motion', q: 'Match each boundary to how the plates move: divergent, convergent and transform.', hint: 'Diverge means to go apart; converge means to come together.', pairs: [['divergent', 'pull apart'], ['convergent', 'push together'], ['transform', 'slide past']]},
        {form: 'match', topic: 'layers6', q: 'Match each layer to what it is like: crust, mantle and outer core.', hint: 'One is thin, one is thick, and one is melted.', pairs: [['crust', 'thin and rocky'], ['mantle', 'thick hot rock that flows slowly'], ['outer core', 'liquid metal']]},
        {form: 'order', topic: 'layers6', q: "Put Earth's layers in order from the surface to the center.", hint: 'Start where you are standing.', order: ['crust', 'mantle', 'outer core', 'inner core']},
        {form: 'order', topic: 'quakes', q: 'Put them in order: what happens in an undersea earthquake?', hint: 'Start deep under the seafloor.', order: ['rocks slip along a fault', 'the seafloor jerks up', 'a tsunami wave forms', 'the wave reaches the shore']}]},
    {id: 'sci_storm', t: 'Weather Systems', e: '🌧', ico: 'drop', grade: '6', rows: `
A huge body of air with about the same temperature and moisture all through it is called ___.|an air mass|a jet stream;an ocean current;a cold snap|airmass
An air mass that forms over the warm Gulf of Mexico is ___.|warm and humid|cold and dry;cold and humid;warm and dry|airmass
The boundary where two different air masses meet is called a ___.|front|fault;current;crest|airmass
A cold front moves in fast. What weather often comes with it?|thunderstorms, then cooler air|a long, warm, sunny week;thick fog all day;light drizzle that lasts for many days|airmass
When a warm front passes, the weather usually becomes ___.|warmer|colder;much windier;frozen|airmass
In winter, an air mass from northern Canada brings ___ weather.|cold, dry|hot, humid;warm, rainy;hot, dry|airmass
Wind blows from areas of ___.|high pressure to low pressure|low pressure to high pressure;cold water to warm water;day to night|pressure
A high-pressure system usually brings ___.|clear, fair weather|heavy storms;thick clouds;rain all week|pressure
In a low-pressure system, air rises and cools and forms ___.|clouds|clear skies;dry dust;rainbows|pressure
A falling barometer reading often means ___.|stormy weather is coming|sunny weather is coming;the air is getting drier;it will be hot and still|pressure
Hurricanes form over ___.|warm ocean water|cold, dry land;icy polar seas;high mountains|storms
Why does a hurricane get weaker when it moves over land?|it loses its supply of warm, moist air|the land pushes it back;trees soak up its wind;mountains freeze it|storms
The calm center of a hurricane is called the ___.|eye|eyewall;rain band;front|storms
A spinning column of air that reaches from a thunderstorm down to the ground is a ___.|tornado|hurricane;blizzard;monsoon|storms
You see lightning and count 10 seconds before the thunder. About how far away is the storm?|2 miles|10 miles;50 miles;right overhead|storms
Scientists who study and forecast the weather are called ___.|meteorologists|geologists;astronomers;botanists|storms
A blizzard is a storm with strong winds and ___.|lots of blowing snow|hot sunshine;falling leaves;dust only|storms
Over most of the United States, weather usually moves from ___.|west to east|east to west;north to south only;the sea to the mountains|local
The jet stream is a band of very fast wind ___.|high up in the atmosphere|deep under the ocean;inside a tornado;just above the treetops in a forest|local
On a sunny afternoon at the beach, a cool wind often blows from the sea toward the land. Why?|the land heats up faster than the water|the sea is warmer than the land;the sand cools the air;the Moon pulls the wind|local
Moist air rises up the side of a tall mountain and drops rain. The other side of the mountain is often ___.|dry|very wet;frozen solid;covered in lakes|local|mountain,🏔
A warm ocean current called the Gulf Stream flows up the East Coast and across the Atlantic. It makes the places it passes ___.|milder in winter|colder in winter;drier all year;windless|local
`,
      kinds: [
        {form: 'sort', topic: 'pressure', q: 'Sort the clues: is fair weather or stormy weather on the way?', hint: 'Rising pressure means sinking, settled air. Falling pressure means rising air and clouds.', bins: {fair: ['rising air pressure', 'a high-pressure system', 'clear skies to the west'], stormy: ['falling air pressure', 'a cold front coming', 'dark clouds building']}},
        {form: 'sort', topic: 'pressure', q: 'Sort the weather words: about air pressure, or about water in the air?', hint: 'Is it about how hard the air presses down, or about wet air, drops and dew?', bins: {'air pressure': ['barometer', 'high-pressure system', 'low-pressure system'], 'water in the air': ['humidity', 'dew point', 'precipitation']}},
        {form: 'sort', topic: 'airmass', q: 'Sort the air masses: warm or cold?', hint: 'Think about where each one comes from: near the equator, or near the North Pole?', bins: {warm: ['air from the Gulf of Mexico', 'air from the desert Southwest'], cold: ['air from northern Canada', 'air from the Arctic']}},
        {form: 'match', topic: 'airmass', q: 'Match each weather system to what it often brings: cold front, warm front and high-pressure system.', hint: 'One is quick and stormy, one is slow and gentle, and one is calm.', pairs: [['cold front', 'short, strong storms'], ['warm front', 'long, gentle rain'], ['high-pressure system', 'clear skies']]},
        {form: 'match', topic: 'storms', q: 'Match each storm to what it is: hurricane, tornado and blizzard.', hint: 'One forms over the sea, one is a narrow funnel, and one is cold and white.', pairs: [['hurricane', 'a huge storm that forms over warm seas'], ['tornado', 'a spinning funnel of wind'], ['blizzard', 'a snowstorm with strong wind']]},
        {form: 'order', topic: 'storms', q: 'Put them in order: how does a hurricane form and end?', hint: 'Start over the warm sea, and end on land.', order: ['warm, moist air rises over the ocean', 'storm clouds begin to spin', 'the storm grows stronger at sea', 'it reaches land and weakens']},
        {form: 'order', topic: 'airmass', q: 'Put them in order: what happens as a cold front passes a town?', hint: 'Start with the air that is there before the front arrives.', order: ['warm air sits over the town', 'cold air pushes in and lifts the warm air', 'thunderstorms form', 'cooler, drier air arrives']}]},
    {id: 'sci_wres', t: 'Water & Resources', e: '💧', ico: 'drop', grade: '6', rows: `
All the land that drains into one river or lake is called a ___.|watershed|water table;flood plain;delta|ground
Rain soaks into the ground and fills spaces in rock and sand. This water is called ___.|groundwater|runoff;water vapor;sea water|ground
A layer of rock or sand underground that holds lots of water is called ___.|an aquifer|a glacier;a canyon;a river delta|ground
Most of the fresh water on Earth is frozen in ___.|glaciers and ice caps|lakes and rivers;clouds;deep underground caves|ground
About how much of Earth's water is fresh water?|3 percent or less|half of it;almost all of it;about 75 percent|ground
Pollution dumped into a stream far upstream can harm people who live ___.|downstream|upstream;on mountaintops;far uphill|ground
People pump water out of an aquifer faster than rain can refill it. The water table will ___.|drop|rise;freeze;stay the same|ground
Oil and natural gas formed from tiny ocean plants and animals buried long ago. So they are often found where ___.|ancient seas once were|volcanoes erupt today;rainforests grow today;cities are built|spread
Why do some countries have lots of oil while others have almost none?|it formed only where conditions were right|oil grows back each year;people moved it there;it falls from the sky|spread
Rich farm soil is often found near rivers because floods leave behind ___.|fresh mud full of nutrients|sharp rocks;salt crystals;dry dust|spread
Metal ores, like iron and copper, are dug out of the ground in a ___.|mine|well;dam;farm|spread
A resource that people use faster than nature can replace it will ___.|run low or run out|last forever;grow larger;turn into a new one|spread
Wind farms are often built on open plains and coasts because ___.|the wind is strong and steady there|the land is very wet;there are many trees;it is always dark|spread
Fertilizer washing off farms into a lake can cause ___.|too much algae to grow|the lake to freeze;fish to grow bigger;the water to turn sweet|impact
Cutting down a whole forest on a hillside can lead to ___.|more soil erosion|more rain;cleaner rivers;stronger tree roots|impact
Which choice helps protect a river's water?|keeping chemicals out of storm drains|washing paint into the gutter;cutting trees by the banks;dumping oil on the ground|impact
Farmers plant rows across a slope, not up and down it, to ___.|slow water and save soil|make the field look nice;help weeds grow;keep birds away|impact
A city's treatment plant takes in river water and ___.|cleans it so it is safe to drink|pumps oil out of it;makes electricity from it;turns it into soil|impact
Planting new trees where a forest was cut down is called ___.|reforestation|deforestation;irrigation;erosion|impact
A city builds bike lanes and better buses. This helps ___.|cut air pollution from cars|make more traffic;use more gasoline;make the air dirtier and smokier|impact
`,
      kinds: [
        {form: 'sort', topic: 'impact', q: 'Sort them: does it help keep water clean, or make it dirty?', hint: 'Think about what ends up in the stream after it rains.', bins: {'keeps it clean': ['picking up litter', 'a water treatment plant', 'planting trees by streams'], 'makes it dirty': ['oil spilled on a road', 'too much fertilizer', 'trash in a storm drain']}},
        {form: 'sort', topic: 'ground', q: 'Sort the water: fresh water or salt water?', hint: 'Could you drink it after it is cleaned, or is it full of salt?', bins: {fresh: ['a glacier', 'a river', 'an aquifer'], salt: ['the ocean', 'a sea', 'the Great Salt Lake']}},
        {form: 'match', topic: 'ground', q: 'Match each word to its meaning: watershed, aquifer and runoff.', hint: 'One is land, one is under the ground, and one flows over the ground.', pairs: [['watershed', 'land that drains into one river'], ['aquifer', 'underground rock that holds water'], ['runoff', 'rain that flows over the ground']]},
        {form: 'match', topic: 'spread', q: 'Match each resource to where it is often found: oil, rich soil and iron ore.', hint: 'Think about how each one was made: by old seas, by floods, or in rock.', pairs: [['oil', 'where ancient seas were'], ['rich soil', 'along rivers that flood'], ['iron ore', 'in rock dug from mines']]},
        {form: 'order', topic: 'ground', q: 'Put them in order: how does rain become well water?', hint: 'Start in the sky and end at the pump.', order: ['rain falls', 'it soaks into the soil', 'it fills spaces in rock underground', 'a well pumps it up']},
        {form: 'order', topic: 'impact', q: 'Put them in order: how does a city clean its drinking water?', hint: 'Start where the water is taken in, and end at the tap.', order: ['water comes in from a river or lake', 'dirt settles to the bottom', 'filters catch tiny bits', 'it is treated to kill germs', 'it flows to homes']}]},
    {id: 'civ_river', t: 'Early River Valleys', e: '🏺', ico: 'map', grade: '6', rows: `
The name Mesopotamia means "the land between the ___."|rivers|mountains;seas;deserts|river
Mesopotamia grew up between which two rivers?|the Tigris and the Euphrates|the Nile and the Amazon;the Indus and the Ganges;the Mississippi and the Ohio|river
Ancient Egypt grew up along the ___ River.|Nile|Amazon;Yellow;Indus|river
Every year the Nile flooded and left behind ___.|rich, dark soil|piles of gold;sharp rocks;a layer of salty sand|river
Early Chinese civilization began along the Yellow River, also called the ___.|Huang He|Nile;Tigris;Mississippi|river
Why did early farmers dig canals from rivers?|to bring water to their fields|to keep fish as pets;to make the river saltier;to stop the rain|river
The ancient cities of Harappa and Mohenjo-daro were along the ___ River.|Indus|Nile;Tigris;Yellow|river
The Yellow River was sometimes called "China's Sorrow" because ___.|its floods could destroy farms and towns|its water was too salty to use;it had no fish;it was too small for boats|river
The people of Sumer, in Mesopotamia, wrote by pressing marks into wet clay. This writing is called ___.|cuneiform|hieroglyphs;the alphabet;Morse code|invent
Ancient Egyptians wrote with picture signs called ___.|hieroglyphs|cuneiform;Latin letters;numbers|invent
Egyptians wrote on sheets made from a reed plant called ___.|papyrus|bamboo;cotton;maple bark|invent
Hammurabi, a king of Babylon, is famous for writing down a set of ___.|laws|songs;recipes;maps|invent
Which invention from ancient Mesopotamia helped carts and potters?|the wheel|the airplane;the light bulb;the telephone|invent
Why did early people begin to write?|to keep records of crops, trade and laws|to decorate their caves for fun;to stop speaking;to count stars only|invent
The great pyramids of Egypt were built as ___.|tombs for pharaohs|homes for farmers;schools;markets|life
A ruler of ancient Egypt was called a ___.|pharaoh|senator;mayor;president|life
When farmers grew more food than they needed, they had a ___.|surplus|shortage;drought;famine|life
Because not everyone had to farm, some people could work as ___.|potters, weavers and traders|factory workers;train drivers;computer coders|life
Having different people do different jobs is called ___.|specialization|irrigation;migration;transportation|life
Early cities built walls around them mostly for ___.|protection|decoration;shade;keeping cool|life
The streets of Mohenjo-daro were laid out in a grid, and many houses had ___.|drains for waste water|electric lights;glass windows;elevators|life
People in Mesopotamia built tall stepped towers of mud brick called ___.|ziggurats|pyramids;castles;skyscrapers|life
`,
      kinds: [
        {form: 'sort', topic: 'invent', q: 'Sort them: Mesopotamia or Egypt?', hint: 'One wrote on clay and built stepped towers; the other wrote in pictures by the Nile.', bins: {Mesopotamia: ['cuneiform', 'ziggurats', 'Code of Hammurabi'], Egypt: ['hieroglyphs', 'pyramids', 'pharaohs']}},
        {form: 'sort', topic: 'river', q: 'Sort them: part of nature, or made by people?', hint: 'Was it there before anyone lived there, or did people build or make it?', bins: {'part of nature': ['the Nile River', 'yearly floods', 'rich soil'], 'made by people': ['canals', 'pyramids', 'clay tablets']}},
        {form: 'match', topic: 'river', q: 'Match each river to its civilization: Nile, Tigris and Euphrates, and Huang He.', hint: 'Picture Africa, the land between two rivers, and China.', pairs: [['Nile', 'Egypt'], ['Tigris and Euphrates', 'Mesopotamia'], ['Huang He', 'China']]},
        {form: 'match', topic: 'invent', q: 'Match each word to its meaning: cuneiform, hieroglyphs and papyrus.', hint: 'Two are kinds of writing; one is what people wrote on.', pairs: [['cuneiform', 'marks pressed in clay'], ['hieroglyphs', 'picture signs'], ['papyrus', 'sheets made from reeds']]},
        {form: 'order', topic: 'life', q: 'Put them in order: how did farming lead to cities?', hint: 'Start with growing food.', order: ['people learned to farm', 'farmers grew extra food', 'some people did other jobs', 'towns grew into cities']},
        {form: 'order', topic: 'river', q: 'Put a year by the Nile in order.', hint: 'Start with the water rising.', order: ['the river floods', 'the water goes down', 'farmers plant in the wet soil', 'farmers harvest their crops']}]},
    {id: 'civ_class', t: 'Greece, Rome & China', e: '📖', ico: 'doc', grade: '6', rows: `
Ancient Greece was made up of many independent ___.|city-states|provinces of Egypt;farms with no towns;parts of one empire|greece
In Athens, citizens voted on laws themselves. This was an early form of ___.|democracy|monarchy;dictatorship;empire|greece
In ancient Athens, who could vote?|free men who were citizens|everyone, including children;only the king;only women|greece
The Olympic Games began in ancient ___.|Greece|Rome;China;Mesopotamia|greece
Sparta was a Greek city-state known for its strong ___.|army|libraries;theaters;rice farms|greece
Greek thinkers like Socrates asked questions to search for truth. They are called ___.|philosophers|pharaohs;senators;shipbuilders|greece
Many English words, like "telephone" and "geography", come from ___ words.|Greek|Chinese;Egyptian;Mayan|greece
Before it had emperors, Rome was a republic. In a republic, citizens ___.|elect leaders to make decisions|obey one king forever;never vote;let the army choose|rome
The Roman Senate was a group of leaders who ___.|advised and helped make laws|built the roads alone;ran the Olympic Games;led the army of Egypt|rome
Romans built stone channels called ___ to carry water to their cities.|aqueducts|pyramids;ziggurats;walls|rome
The language of ancient Rome was ___.|Latin|Greek;Spanish;English|rome
Roman roads were so well built that ___.|some are still used today|they fell apart in a year;they were made of wood;nobody used them|rome
The Romans were skilled builders who used arches and ___.|concrete|plastic;steel beams;glass towers|rome
Many English words come from Latin. Which English word comes from the Latin word "aqua," meaning water?|aquarium|airplane;library;mountain|rome
Paper was first made in ancient ___.|China|Greece;Rome;Mesopotamia|china
The Silk Road was a set of routes for ___.|trade between China and the West|racing horses;building walls;sailing to America|china
The Great Wall of China was built mainly to ___.|protect against invaders from the north|keep the rivers from flooding;mark a trade road;hold back the sea|china
Silk is a soft cloth made from the threads of ___.|silkworm cocoons|cotton plants;sheep's wool;tree bark|china
The Chinese thinker Confucius taught that people should ___.|respect their families and act kindly|never work;fight their neighbors;ignore their elders|china
A family of rulers in China, like the Han, was called a ___.|dynasty|republic;senate;city-state|china
`,
      kinds: [
        {form: 'sort', topic: 'greece', q: 'Sort them: ancient Greece or ancient Rome?', hint: 'Athens and Sparta were Greek. The Senate met in Rome.', bins: {Greece: ['the Olympic Games', 'democracy in Athens', 'Sparta'], Rome: ['aqueducts', 'the Senate', 'Latin']}},
        {form: 'sort', topic: 'china', q: 'Sort them: from ancient China, or not?', hint: 'Think about which ones came along the Silk Road from the east.', bins: {'ancient China': ['paper', 'silk', 'the Great Wall'], 'not from China': ['the Olympic Games', 'aqueducts', 'hieroglyphs']}},
        {form: 'match', topic: 'greece', q: 'Match each place to a word you learned: Athens, Rome and China.', hint: 'Citizens voting on laws, citizens electing leaders, and a family of rulers.', pairs: [['Athens', 'democracy'], ['Rome', 'republic'], ['China', 'dynasty']]},
        {form: 'match', topic: 'rome', q: 'Match each thing to its use: aqueduct, Great Wall and Silk Road.', hint: 'One moves water, one keeps people out, and one moves goods.', pairs: [['aqueduct', 'carrying water'], ['Great Wall', 'keeping out invaders'], ['Silk Road', 'trading goods']]},
        {form: 'order', topic: 'greece', q: 'Put them in order from oldest to newest.', hint: 'The river valleys came first. Rome came after Greece.', order: ['the first cities of Mesopotamia', 'the pyramids of Giza', 'democracy in Athens', 'the Roman Empire']},
        {form: 'order', topic: 'china', q: 'Put them in order: how did silk get from China to Rome?', hint: 'Start with the tiny animals that spin the thread.', order: ['silkworms spin cocoons in China', 'workers make silk cloth', 'traders carry it along the Silk Road', 'buyers in Rome get it']}]},
  ],
};
disc46Apply(); // the app loads this part after the data file, so the banks are there; the gate decides (52z-disc46.js). In tools/test.js, which
// reads the parts before the data, the banks are not there yet and this does nothing
/* ---------- ES-MORE: more Spanish weather and feelings words, DRAFTED for the owner (part teaches) ----------
   Every word, meaning, picture and line a child sees or hears is listed in docs/drafts/ES-MORE-READ.md. The words reach a child only once
   that file's status line says "status: reviewed <name> <YYYY-MM-DD>" (ESMORE_ON, 42f-esmoreon.js); esMoreApply (52z-esmore.js) then adds
   them at the END of the units weather and feel. Format of d-es.js: [spanish, english, picture, article, art, say]; a feeling shows both
   forms ('contento / contenta', said 'contento, contenta'), as the feelings already there do (R-01s).
   confuse: pairs never offered together in one question (two right answers by picture, meaning or ear), added to the unit's own list.
   cap: the words whose picture alone is not enough, which show their English under the picture (as hace calor does).
   art: the new drawings, object-art style and rules of DESIGN_SYSTEM.md 6.5 (64 grid, var(--a-x) roles, light from the top left, no faces
   on objects); named wx-* so no other picture in the app changes. Feelings keep emoji faces, like the feelings already there.
   Not recorded yet (audio/es): until the owner records them the tablet's voice says them. Nothing here draws at random. */
const ESM = {
  es: {
    weather: [
      ['lluvia', 'rain', '🌧', 'la', 'wx-rain'],
      ['relámpago', 'lightning', '⚡', 'el', 'wx-lightning'],
      ['niebla', 'fog', '🌫', 'la', 'wx-fog'],
      ['tornado', 'tornado', '🌪', 'el', 'wx-tornado'],
      ['hielo', 'ice', '🧊', 'el', 'wx-ice'],
      ['termómetro', 'thermometer', '🌡', 'el', 'wx-thermometer'],
      ['impermeable', 'raincoat', '🧥', 'el', 'wx-raincoat'],
      ['charco', 'puddle', '💧', 'el', 'wx-puddle'],
      ['muñeco de nieve', 'snowman', '⛄', 'el', 'snowman'],
      ['lentes de sol', 'sunglasses', '😎', 'los', 'wx-sunglasses'],
      ['hace buen tiempo', 'the weather is nice', '🌤', '', 'wx-fair']],
    feel: [
      ['contento / contenta', 'glad', '😄', '', '', 'contento, contenta'],
      ['nervioso / nerviosa', 'nervous', '😬', '', '', 'nervioso, nerviosa'],
      ['preocupado / preocupada', 'worried', '😟', '', '', 'preocupado, preocupada'],
      ['aburrido / aburrida', 'bored', '😒', '', '', 'aburrido, aburrida'],
      ['tímido / tímida', 'shy', '😳', '', '', 'tímido, tímida'],
      ['confundido / confundida', 'confused', '😕', '', '', 'confundido, confundida'],
      ['cariñoso / cariñosa', 'loving', '🥰', '', '', 'cariñoso, cariñosa'],
      ['orgulloso / orgullosa', 'proud', '🏆', '', '', 'orgulloso, orgullosa'],
      ['valiente', 'brave', '🦸', ''],
      ['tengo hambre', 'I am hungry', '😋', ''],
      ['tengo sed', 'I am thirsty', '🥤', '']]},
  confuse: {
    weather: [['llueve', 'lluvia'], ['hay tormenta', 'lluvia'], ['está nublado', 'lluvia'], ['lluvia', 'charco'], ['llueve', 'charco'], ['llueve', 'impermeable'], ['hay tormenta', 'relámpago'], ['está nublado', 'niebla'], ['hace viento', 'tornado'], ['hay tormenta', 'tornado'], ['nieva', 'muñeco de nieve'], ['hace frío', 'muñeco de nieve'], ['nieva', 'hielo'], ['hace frío', 'hielo'], ['hace calor', 'termómetro'], ['hace frío', 'termómetro'], ['hace fresco', 'termómetro'], ['hace sol', 'hace buen tiempo'], ['hace calor', 'hace buen tiempo'], ['hace fresco', 'hace buen tiempo'], ['está nublado', 'hace buen tiempo'], ['hace sol', 'lentes de sol'], ['hace calor', 'lentes de sol'], ['hace buen tiempo', 'lentes de sol']],
    feel: [['feliz', 'contento / contenta'], ['emocionado / emocionada', 'contento / contenta'], ['tranquilo / tranquila', 'contento / contenta'], ['feliz', 'cariñoso / cariñosa'], ['contento / contenta', 'cariñoso / cariñosa'], ['asustado / asustada', 'nervioso / nerviosa'], ['preocupado / preocupada', 'nervioso / nerviosa'], ['asustado / asustada', 'preocupado / preocupada'], ['triste', 'preocupado / preocupada'], ['enojado / enojada', 'aburrido / aburrida'], ['cansado / cansada', 'aburrido / aburrida'], ['sorprendido / sorprendida', 'tímido / tímida'], ['asustado / asustada', 'tímido / tímida'], ['nervioso / nerviosa', 'tímido / tímida'], ['triste', 'confundido / confundida'], ['preocupado / preocupada', 'confundido / confundida'], ['feliz', 'orgulloso / orgullosa'], ['contento / contenta', 'orgulloso / orgullosa'], ['emocionado / emocionada', 'orgulloso / orgullosa'], ['valiente', 'orgulloso / orgullosa'], ['feliz', 'tengo hambre'], ['contento / contenta', 'tengo hambre']]},
  cap: {weather: ['hace buen tiempo'], feel: ['orgulloso / orgullosa', 'valiente', 'tengo hambre', 'tengo sed']},
  art: {
    'wx-rain':
      '<path fill="var(--a-e)" d="M11 35Q3 35 3 27.5Q3 20 10.5 19Q12 10 21 9Q27 2 37 4.5Q45 2 50 10Q60 11 61 21Q62 33 53 35Z"/>' +
      '<path fill="var(--a-e1)" d="M11.7 32.9Q4.1 32.9 4.1 25.9Q4.1 18.8 11.2 17.9Q12.6 9.4 21.1 8.5Q26.7 1.9 36.1 4.2Q43.6 1.9 48.3 9.4Q57.7 10.3 58.7 19.7Q59.6 31 51.1 32.9Z"/>' +
      '<path fill="var(--a-w)" opacity="0.7" d="M12.4 21.4Q13.4 13.6 21.4 12.6Q26.4 7.4 33.4 7.6Q26.6 11 23.4 15.8Q16 16 15 22.4Z"/>' +
      '<path fill="var(--a-b2)" d="M14.6 39.6Q19 46 19 48.2Q19 52.4 14.6 52.4Q10.2 52.4 10.2 48.2Q10.2 46 14.6 39.6ZM31.6 37.6Q36 44 36 46.2Q36 50.4 31.6 50.4Q27.2 50.4 27.2 46.2Q27.2 44 31.6 37.6ZM48.6 39.6Q53 46 53 48.2Q53 52.4 48.6 52.4Q44.2 52.4 44.2 48.2Q44.2 46 48.6 39.6ZM22.6 50.6Q27 57 27 59.2Q27 63.4 22.6 63.4Q18.2 63.4 18.2 59.2Q18.2 57 22.6 50.6ZM40.6 50.6Q45 57 45 59.2Q45 63.4 40.6 63.4Q36.2 63.4 36.2 59.2Q36.2 57 40.6 50.6Z"/>' +
      '<path fill="var(--a-b)" d="M14 39.6Q18 45.4 18 47.3Q18 51.1 14 51.1Q10 51.1 10 47.3Q10 45.4 14 39.6ZM31 37.6Q35 43.4 35 45.3Q35 49.1 31 49.1Q27 49.1 27 45.3Q27 43.4 31 37.6ZM48 39.6Q52 45.4 52 47.3Q52 51.1 48 51.1Q44 51.1 44 47.3Q44 45.4 48 39.6ZM22 50.6Q26 56.4 26 58.3Q26 62.1 22 62.1Q18 62.1 18 58.3Q18 56.4 22 50.6ZM40 50.6Q44 56.4 44 58.3Q44 62.1 40 62.1Q36 62.1 36 58.3Q36 56.4 40 50.6Z"/>' +
      '<ellipse cx="12.6" cy="46.6" rx="1" ry="1.8" fill="var(--a-b1)" opacity="0.9"/>' +
      '<ellipse cx="29.6" cy="44.6" rx="1" ry="1.8" fill="var(--a-b1)" opacity="0.9"/>' +
      '<ellipse cx="46.6" cy="46.6" rx="1" ry="1.8" fill="var(--a-b1)" opacity="0.9"/>' +
      '<ellipse cx="20.6" cy="57.6" rx="1" ry="1.8" fill="var(--a-b1)" opacity="0.9"/>' +
      '<ellipse cx="38.6" cy="57.6" rx="1" ry="1.8" fill="var(--a-b1)" opacity="0.9"/>',
    'wx-lightning':
      '<path fill="var(--a-y2)" d="M27 2L47 2L38 23L51 23L19 62L28 33L14 33Z"/>' +
      '<path fill="var(--a-y)" d="M26.2 3.4L44.6 3.4L36.3 22.7L48.3 22.7L18.8 58.6L27.1 31.9L14.2 31.9Z"/>' +
      '<path fill="var(--a-y1)" opacity="0.9" d="M26.6 3.6L32.6 3.6L24.6 30.6L18.4 30.6Z"/>' +
      '<circle cx="47" cy="8" r="1.8" fill="var(--a-w)" opacity="0.9"/><circle cx="12" cy="46" r="1.4" fill="var(--a-w)" opacity="0.8"/>' +
      '<circle cx="54" cy="32" r="1.2" fill="var(--a-w)" opacity="0.8"/>',
    'wx-fog':
      '<path fill="var(--a-w3)" d="M14 30Q6 30 6 23Q6 16 13 15.4Q14.4 7.6 22.4 7Q27.6 1.6 36 3.6Q43.4 1.6 47.6 8.4Q56 9.4 57 17.6Q58 28 50 30Z"/>' +
      '<path fill="var(--a-w)" d="M14.5 28.2Q7 28.2 7 21.6Q7 15 13.5 14.4Q14.9 7.1 22.4 6.5Q27.3 1.5 35.2 3.3Q42.1 1.5 46.1 7.9Q54 8.8 54.9 16.5Q55.8 26.3 48.3 28.2Z"/>' +
      '<rect x="7.8" y="29.8" width="44" height="6" rx="3" fill="var(--a-e2)"/>' +
      '<rect x="7" y="29" width="43.4" height="5.4" rx="2.7" fill="var(--a-e)"/>' +
      '<rect x="10" y="30.2" width="19.8" height="1.6" rx="0.8" fill="var(--a-e1)" opacity="0.8"/>' +
      '<rect x="15.8" y="38.8" width="43" height="6" rx="3" fill="var(--a-e2)"/>' +
      '<rect x="15" y="38" width="42.4" height="5.4" rx="2.7" fill="var(--a-e)"/>' +
      '<rect x="18" y="39.2" width="19.4" height="1.6" rx="0.8" fill="var(--a-e1)" opacity="0.8"/>' +
      '<rect x="5.8" y="47.8" width="40" height="6" rx="3" fill="var(--a-e2)"/>' +
      '<rect x="5" y="47" width="39.4" height="5.4" rx="2.7" fill="var(--a-e)"/>' +
      '<rect x="8" y="48.2" width="18" height="1.6" rx="0.8" fill="var(--a-e1)" opacity="0.8"/>' +
      '<rect x="18.8" y="56.8" width="40" height="6" rx="3" fill="var(--a-e2)"/>' +
      '<rect x="18" y="56" width="39.4" height="5.4" rx="2.7" fill="var(--a-e)"/>' +
      '<rect x="21" y="57.2" width="18" height="1.6" rx="0.8" fill="var(--a-e1)" opacity="0.8"/>',
    'wx-tornado':
      '<ellipse cx="30" cy="60" rx="14" ry="2.6" fill="var(--a-n1)" opacity="0.6"/><circle cx="16" cy="57" r="1.4" fill="var(--a-n)"/>' +
      '<circle cx="44" cy="58" r="1.2" fill="var(--a-n)"/><circle cx="40" cy="55" r="1" fill="var(--a-n2)"/>' +
      '<circle cx="19" cy="53" r="1" fill="var(--a-n)"/><ellipse cx="29.6" cy="55.6" rx="4.4" ry="3" fill="var(--a-e2)"/>' +
      '<ellipse cx="28.6" cy="54.6" rx="4.1" ry="2.6" fill="var(--a-e)"/><ellipse cx="28.6" cy="49.6" rx="6.6" ry="3.6" fill="var(--a-e2)"/>' +
      '<ellipse cx="27.6" cy="48.6" rx="6.2" ry="3.1" fill="var(--a-e)"/><ellipse cx="30.6" cy="42.6" rx="9.4" ry="4" fill="var(--a-e2)"/>' +
      '<ellipse cx="29.6" cy="41.6" rx="8.8" ry="3.4" fill="var(--a-e)"/><ellipse cx="33.6" cy="35.6" rx="13" ry="4.6" fill="var(--a-e2)"/>' +
      '<ellipse cx="32.6" cy="34.6" rx="12.2" ry="4" fill="var(--a-e)"/><ellipse cx="35.6" cy="27.6" rx="17.4" ry="5" fill="var(--a-e2)"/>' +
      '<ellipse cx="34.6" cy="26.6" rx="16.4" ry="4.3" fill="var(--a-e)"/><ellipse cx="34.6" cy="18.6" rx="22.4" ry="5.6" fill="var(--a-e2)"/>' +
      '<ellipse cx="33.6" cy="17.6" rx="21.1" ry="4.8" fill="var(--a-e)"/><ellipse cx="32.6" cy="9.6" rx="27" ry="6.4" fill="var(--a-e2)"/>' +
      '<ellipse cx="31.6" cy="8.6" rx="25.4" ry="5.5" fill="var(--a-e)"/>' +
      '<ellipse cx="32" cy="8.4" rx="20" ry="3.4" fill="var(--a-e3)" opacity="0.7"/>' +
      '<path fill="none" stroke="var(--a-e1)" stroke-width="1.6" opacity="0.9" d="M13.4 17.6Q20 14.4 28 14.4M18.6 26.6Q22.6 24 28.6 23.8M22.4 34.4Q25 32.6 29 32.4"/>',
    'wx-thermometer':
      '<rect x="24" y="3" width="16" height="47" rx="8" fill="var(--a-w3)"/>' +
      '<rect x="25.4" y="4.4" width="13.2" height="44" rx="6.6" fill="var(--a-w)"/>' +
      '<rect x="27" y="6" width="3" height="30" rx="1.5" fill="var(--a-e1)" opacity="0.8"/><circle cx="32.6" cy="50.6" r="11" fill="var(--a-r2)"/>' +
      '<circle cx="31.8" cy="49.8" r="9.8" fill="var(--a-r)"/><rect x="29.4" y="18" width="6.6" height="30" rx="3.3" fill="var(--a-r2)"/>' +
      '<rect x="29" y="17.6" width="5.8" height="30" rx="2.9" fill="var(--a-r)"/>' +
      '<ellipse cx="28" cy="46" rx="2.6" ry="3.4" fill="var(--a-r1)" opacity="0.9"/>' +
      '<rect x="29.8" y="19.6" width="1.6" height="24" rx="0.8" fill="var(--a-r1)" opacity="0.8"/>' +
      '<path fill="none" stroke="var(--a-e3)" stroke-width="2" d="M41.6 10L47 10M41.6 17L45.4 17M41.6 24L47 24M41.6 31L45.4 31M41.6 38L47 38"/>',
    'wx-raincoat':
      '<path fill="var(--a-y2)" d="M21 16Q15 17 12.6 23L7 49Q6.6 52 9.6 52.6L14 53.4Q16.6 53.8 17 51.2L18 45L18 58Q18 61 21 61L43 61Q46 61 46 58L46 45L47 51.2Q47.4 53.8 50 53.4L54.4 52.6Q57.4 52 57 49L51.4 23Q49 17 43 16Z"/>' +
      '<path fill="var(--a-y)" d="M20.8 16.2Q15.1 17.2 12.8 22.8L7.5 47.6Q7.1 50.4 9.9 51L14.1 51.7Q16.6 52.1 17 49.6L17.9 43.8L17.9 56.1Q17.9 59 20.8 59L41.7 59Q44.5 59 44.5 56.1L44.5 43.8L45.5 49.6Q45.8 52.1 48.3 51.7L52.5 51Q55.3 50.4 55 47.6L49.6 22.8Q47.4 17.2 41.7 16.2Z"/>' +
      '<path fill="var(--a-y2)" d="M19.4 21Q17 5 32 4Q47 5 44.6 21Q40 14.6 32 14.6Q24 14.6 19.4 21Z"/>' +
      '<path fill="var(--a-y)" d="M19.6 19.9Q17.3 4.8 31.4 3.9Q45.5 4.8 43.2 19.9Q38.9 13.8 31.4 13.8Q23.9 13.8 19.6 19.9Z"/>' +
      '<path fill="var(--a-y3)" d="M23.6 18.4Q23.4 10.4 32 9.8Q40.6 10.4 40.4 18.4Q37 15.6 32 15.6Q27 15.6 23.6 18.4Z"/>' +
      '<path fill="none" stroke="var(--a-y2)" stroke-width="1.6" d="M32 17L32 60.4M18 45L19.2 24M46 45L44.8 24"/>' +
      '<path fill="var(--a-y1)" opacity="0.8" d="M14 26Q15.6 20.6 20.4 19.6L16.4 40Z"/>' +
      '<rect x="34" y="25" width="6" height="2.6" rx="1.3" fill="var(--a-b2)"/>' +
      '<rect x="34" y="34" width="6" height="2.6" rx="1.3" fill="var(--a-b2)"/>' +
      '<rect x="34" y="43" width="6" height="2.6" rx="1.3" fill="var(--a-b2)"/>' +
      '<rect x="20" y="47" width="8" height="2.4" rx="1.2" fill="var(--a-y2)"/>' +
      '<rect x="36.6" y="47" width="8" height="2.4" rx="1.2" fill="var(--a-y2)"/>' +
      '<path fill="var(--a-b2)" d="M7.6 6.1Q10.9 10.9 10.9 12.6Q10.9 15.7 7.6 15.7Q4.3 15.7 4.3 12.6Q4.3 10.9 7.6 6.1ZM57.6 8.1Q60.9 12.9 60.9 14.6Q60.9 17.7 57.6 17.7Q54.3 17.7 54.3 14.6Q54.3 12.9 57.6 8.1ZM58.6 28.1Q61.9 32.9 61.9 34.6Q61.9 37.7 58.6 37.7Q55.3 37.7 55.3 34.6Q55.3 32.9 58.6 28.1Z"/>' +
      '<path fill="var(--a-b)" d="M7 5.9Q10 10.3 10 11.8Q10 14.6 7 14.6Q4 14.6 4 11.8Q4 10.3 7 5.9ZM57 8Q60 12.3 60 13.8Q60 16.6 57 16.6Q54 16.6 54 13.8Q54 12.3 57 8ZM58 28Q61 32.3 61 33.8Q61 36.6 58 36.6Q55 36.6 55 33.8Q55 32.3 58 28Z"/>' +
      '<ellipse cx="6" cy="11.2" rx="0.8" ry="1.4" fill="var(--a-b1)" opacity="0.9"/>' +
      '<ellipse cx="56" cy="13.2" rx="0.8" ry="1.4" fill="var(--a-b1)" opacity="0.9"/>' +
      '<ellipse cx="57" cy="33.2" rx="0.8" ry="1.4" fill="var(--a-b1)" opacity="0.9"/>',
    'wx-puddle':
      '<path fill="var(--a-g2)" d="M2 52Q4 44 7 50Q8 43 11 50L11 54L2 54ZM53 52Q55 44 58 50Q59 43 62 50L62 54L53 54Z"/>' +
      '<ellipse cx="32.8" cy="48.8" rx="28.6" ry="11.6" fill="var(--a-b2)"/><ellipse cx="31.8" cy="47.8" rx="27.2" ry="10.4" fill="var(--a-b)"/>' +
      '<ellipse cx="22" cy="44.4" rx="10" ry="2.8" fill="var(--a-b1)" opacity="0.8"/>' +
      '<ellipse cx="38" cy="49" rx="7" ry="2.6" fill="none" stroke="var(--a-b1)" stroke-width="1.6"/>' +
      '<ellipse cx="38" cy="49" rx="13" ry="5" fill="none" stroke="var(--a-b1)" stroke-width="1.4" opacity="0.7"/>' +
      '<path fill="var(--a-b2)" d="M38.6 25.5Q42.3 30.9 42.3 32.8Q42.3 36.4 38.6 36.4Q34.9 36.4 34.9 32.8Q34.9 30.9 38.6 25.5ZM18.6 11.5Q22.3 16.9 22.3 18.8Q22.3 22.4 18.6 22.4Q14.9 22.4 14.9 18.8Q14.9 16.9 18.6 11.5ZM50.6 7.5Q54.3 12.9 54.3 14.8Q54.3 18.4 50.6 18.4Q46.9 18.4 46.9 14.8Q46.9 12.9 50.6 7.5Z"/>' +
      '<path fill="var(--a-b)" d="M38 25.4Q41.4 30.3 41.4 32Q41.4 35.2 38 35.2Q34.6 35.2 34.6 32Q34.6 30.3 38 25.4ZM18 11.4Q21.4 16.3 21.4 18Q21.4 21.2 18 21.2Q14.6 21.2 14.6 18Q14.6 16.3 18 11.4ZM50 7.4Q53.4 12.3 53.4 14Q53.4 17.2 50 17.2Q46.6 17.2 46.6 14Q46.6 12.3 50 7.4Z"/>' +
      '<ellipse cx="36.8" cy="31.4" rx="0.9" ry="1.5" fill="var(--a-b1)" opacity="0.9"/>' +
      '<ellipse cx="16.8" cy="17.4" rx="0.9" ry="1.5" fill="var(--a-b1)" opacity="0.9"/>' +
      '<ellipse cx="48.8" cy="13.4" rx="0.9" ry="1.5" fill="var(--a-b1)" opacity="0.9"/><circle cx="33" cy="41.6" r="1.2" fill="var(--a-b1)"/>' +
      '<circle cx="43" cy="41.2" r="1.2" fill="var(--a-b1)"/>',
    'wx-fair':
      '<path fill="var(--a-y2)" stroke="var(--a-y2)" stroke-width="3" d="M37.9 21L43.3 14.6L34.9 13.9ZM34.9 32.1L43.3 31.4L37.9 25ZM25 37.9L31.4 43.3L32.1 34.9ZM13.9 34.9L14.6 43.3L21 37.9ZM8.1 25L2.7 31.4L11.1 32.1ZM11.1 13.9L2.7 14.6L8.1 21ZM21 8.1L14.6 2.7L13.9 11.1ZM32.1 11.1L31.4 2.7L25 8.1Z"/>' +
      '<circle cx="23" cy="23" r="13.6" fill="var(--a-y2)"/><circle cx="21.8" cy="21.8" r="12" fill="var(--a-y)"/>' +
      '<ellipse cx="17.6" cy="16.4" rx="4.4" ry="2.2" fill="var(--a-y1)" transform="rotate(-35 17.6 16.4)"/>' +
      '<path fill="var(--a-w3)" stroke="var(--a-w3)" stroke-width="1.6" d="M32.7 56.5Q26.9 56.5 26.9 51.6Q26.9 46.2 32.4 46Q33.3 40.4 38.5 39.4Q41.1 33.8 47.2 34.4Q53.4 35.1 54.4 40.9Q60.2 41.6 60.8 47.8Q61.2 56.5 54.4 56.5Z"/>' +
      '<path fill="var(--a-w)" d="M32.7 55Q27.2 55 27.2 50.3Q27.2 45.3 32.5 45.1Q33.3 39.8 38.2 38.9Q40.7 33.6 46.4 34.3Q52.2 34.8 53.1 40.3Q58.6 41 59.2 46.8Q59.5 55 53.1 55Z"/>' +
      '<path fill="none" stroke="var(--a-w3)" stroke-width="1.6" opacity="0.9" d="M36 50.3Q38.9 48.3 41.7 49.7M46.3 47.1Q48.8 45 51.9 46"/>',
    'wx-sunglasses':
      '<path fill="none" stroke="var(--a-r2)" stroke-width="3" d="M5 27L2.6 21.4M59 27L61.4 21.4"/>' +
      '<ellipse cx="17.6" cy="33.6" rx="13.4" ry="11.4" fill="var(--a-r2)"/><ellipse cx="17" cy="33" rx="12.8" ry="10.8" fill="var(--a-r)"/>' +
      '<ellipse cx="17.3" cy="33.4" rx="10.4" ry="8.6" fill="var(--a-k)"/>' +
      '<ellipse cx="13" cy="29.6" rx="3.6" ry="1.6" fill="var(--a-w)" opacity="0.5" transform="rotate(-25 13 29.6)"/>' +
      '<circle cx="22" cy="37.6" r="1" fill="var(--a-w)" opacity="0.5"/><ellipse cx="47.6" cy="33.6" rx="13.4" ry="11.4" fill="var(--a-r2)"/>' +
      '<ellipse cx="47" cy="33" rx="12.8" ry="10.8" fill="var(--a-r)"/><ellipse cx="47.3" cy="33.4" rx="10.4" ry="8.6" fill="var(--a-k)"/>' +
      '<ellipse cx="43" cy="29.6" rx="3.6" ry="1.6" fill="var(--a-w)" opacity="0.5" transform="rotate(-25 43 29.6)"/>' +
      '<circle cx="52" cy="37.6" r="1" fill="var(--a-w)" opacity="0.5"/>' +
      '<path fill="none" stroke="var(--a-r)" stroke-width="3.2" d="M28.6 28.6Q32 25.4 35.4 28.6"/>' +
      '<rect x="9" y="23.6" width="8" height="1.8" rx="0.9" fill="var(--a-r1)" opacity="0.8"/>' +
      '<rect x="39" y="23.6" width="8" height="1.8" rx="0.9" fill="var(--a-r1)" opacity="0.8"/>',
    'wx-ice':
      '<ellipse cx="32" cy="57" rx="26" ry="4" fill="var(--a-c1)" opacity="0.6"/><path fill="var(--a-c)" d="M8 24L40 24L40 56L8 56Z"/>' +
      '<path fill="var(--a-c1)" d="M8 24L22 12L54 12L40 24Z"/><path fill="var(--a-c2)" d="M40 24L54 12L54 44L40 56Z"/>' +
      '<path fill="none" stroke="var(--a-c3)" stroke-width="1.4" opacity="0.6" d="M8 24L40 24L54 12M40 24L40 56"/>' +
      '<path fill="var(--a-w)" opacity="0.7" d="M12 50L12 34L16 30L16 46Z"/><path fill="var(--a-w)" opacity="0.6" d="M20 52L20 47L23 44L23 49Z"/>' +
      '<circle cx="30" cy="18" r="1.6" fill="var(--a-w)" opacity="0.9"/><path fill="var(--a-w)" opacity="0.5" d="M45 20L49 16.6L49 22L45 25.4Z"/>' +
      '<path fill="var(--a-c)" d="M46 56Q48 52 50 56Q50 58 48 58Q46 58 46 56Z"/>'}
};
esMoreApply(); // the app loads this part after the data file; the gate decides (52z-esmore.js). In tools/test.js, which reads the parts
// before the data, the units are not there yet and this does nothing

var TEACHES_VER='v200'; // last line: the whole file ran (checked by dataReady() before the app starts)
