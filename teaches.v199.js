/* Whistlestop teaches v199. BUILT by tools/build.py from 52s-teach5s.css, 52s-bench5s.js, 52s-words5.js, 52t-lessons5s.js, 52y-deep15.js, d-deep15.js: never edit by hand.
   index.html v199 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v199.js. */
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
  for (const u of D15.esNew) { ES_UNITS.push(u); SPN[u.id] = u.items; esReg(u); }
  for (const wid in D15.esAt) PATHS.es.worlds.find(w => w.id == wid).nodes.push(...D15.esAt[wid]);
  buildNodes('disc');
  buildNodes('es');
  for (const [p, wid] of mw) if (wid) MAPW[p] = PATHS[p].worlds.findIndex(w => w.id == wid);
  if (g) G.node = NODES[G.path].findIndex(n => nid(n) == g);
  return true;
}
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
    {id: 'sci_plant', t: 'Seeds & Plants', e: '🌱', ico: 'globe', rows: `
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
    {id: 'sci_wx', t: 'Weather Watch', e: '🌧', ico: 'globe', rows: `
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
  esNew: [
    {id: 'nature', t: 'Nature', e: '🌳', theme: 'Nature: sky, land, water and growing things', items: [['sol', 'sun', '☀', 'el', 'sun'], ['luna', 'moon', '🌙', 'la', 'moon'], ['estrella', 'star', '⭐', 'la', 'star'], ['árbol', 'tree', '🌳', 'el', 'tree'], ['flor', 'flower', '🌷', 'la', 'flower'], ['hoja', 'leaf', '🍃', 'la', 'leaf'], ['nube', 'cloud', '☁', 'la', 'cloud'], ['montaña', 'mountain', '🏔', 'la'], ['mar', 'sea', '🌊', 'el'], ['isla', 'island', '🏝', 'la'], ['piedra', 'rock', '🪨', 'la', 'rock'], ['concha', 'shell', '🐚', 'la', 'shell'], ['hongo', 'mushroom', '🍄', 'el'], ['desierto', 'desert', '🏜', 'el']]},
    {id: 'toy', t: 'Toys & Play', e: '🧸', theme: 'Toys and play things', items: [['pelota', 'ball', '⚽', 'la', 'ball'], ['globo', 'balloon', '🎈', 'el', 'balloon'], ['papalote', 'kite', '🪁', 'el', 'kite'], ['osito', 'teddy bear', '🧸', 'el'], ['tambor', 'drum', '🥁', 'el', 'drum'], ['guitarra', 'guitar', '🎸', 'la', 'guitar'], ['robot', 'robot', '🤖', 'el'], ['dado', 'dice', '🎲', 'el', 'dice'], ['rompecabezas', 'puzzle', '🧩', 'el'], ['piñata', 'piñata', '🪅', 'la'], ['trompeta', 'trumpet', '🎺', 'la', 'trumpet'], ['videojuego', 'video game', '🎮', 'el', 'gamepad'], ['patín', 'skate', '⛸', 'el']]}],
  esAt: {e_ciudad: [['es_nature', 1, 'Nature'], ['es_nature', 2, 'Read Nature']], e_casa: [['es_toy', 1, 'Toys'], ['es_toy', 2, 'Read Toys']]},
};
deep15Apply(); // the app loads this part after the data file, so the banks are there; the gate decides (52y-deep15.js). In tools/test.js, which reads
// the parts before the data, the banks are not there yet and this does nothing

var TEACHES_VER='v199'; // last line: the whole file ran (checked by dataReady() before the app starts)
