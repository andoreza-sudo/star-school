/* ---------- ASK-01: "Ask the pet", a short menu of questions a child can ask the pet (part hints) ----------
   Owner rules (2026-11-18): no AI on the tablet. Every question and every answer is a sentence written at authoring time and approved
   by the owner (docs/drafts/ask/<id>.md, tools/author.js --ask-draft / --ask-approve); the tablet only picks the approved answer
   that fits the moment and fills its {slots} from the child's real state (the next stop of the map, the game-time bank, the hint of
   the last mistake, the lesson's idea line). No free text, no typing, no speech input.
     ASK_Q          the questions in menu order: what each answer variant means and the slots it may use (tools/author.js reads it)
     askState(id)   which variant fits now and its slot values, or null when the question does not fit now (it is then not on the menu)
     askItems()     the menu: the reviewed questions (ASKW, built from the approved drafts) that fit now, each with its filled answer
     askOpen(btn)   the sheet: the pet, the answer bubble, one 48 px button per question (a tap shows and says the answer), Close
   The gate: ASKW holds reviewed questions only (tools/build.py), and ASK_ON (39t-askon.js, index.html) counts them, so with none
   reviewed Home and the map draw no Ask button (askBtn in 46-home.js). Nothing here is saved, and nothing changes a score, a star or
   game time. Ask is not offered inside a round: an answer can never land beside a Practice question. The "why" answer still never
   holds the answer of the question it is about, nor of a question left open (askLeak), since a missed question comes back in review.
   CSS: src/css/39r-ask.css (part hints, tokens only). */
const ASK_Q = [
  {id: 'next', icon: 'map', q: [], v: {
    lesson: {slots: ['stop', 'world'], about: 'the next stop on the map is {stop} (in the world {world}); its lesson with the pet comes first ("Learn with <pet>" stop in front of it)', ex: {stop: 'Make Ten', world: 'Shape Garden'}},
    stop: {slots: ['stop', 'world'], about: 'the next stop to play on the map is {stop}, in the world {world}', ex: {stop: 'Take Away', world: 'Number Meadow'}},
    done: {slots: ['subject'], about: 'every stop on this map ({subject}) is done', ex: {subject: 'Math'}}}},
  {id: 'how', icon: 'hint', q: ['stop'], v: {
    idea: {slots: ['idea', 'stop'], about: 'the lesson of the current stop {stop} has this idea line (one sentence, already approved): {idea}. The answer says the idea, then may point to the lesson', ex: {idea: 'Two parts make ten.', stop: 'Make Ten'}}}},
  {id: 'why', icon: 'question', q: [], v: {
    tip: {slots: ['hint'], about: 'the child got a Practice question wrong; {hint} is the approved hint for that mistake (or the question\'s usual hint), one or two sentences', ex: {hint: 'Line up the ones. Then add the tens.'}},
    look: {slots: [], about: 'the child got a Practice question wrong, but there is no hint that can be said without giving its answer away', ex: {}}}},
  {id: 'time', icon: 'ticket', q: [], v: {
    ok: {slots: ['time'], about: 'the child has {time} of game time to spend now', ex: {time: '4 and a half minutes'}},
    empty: {slots: [], about: 'the child has no game time saved yet', ex: {}},
    learn: {slots: ['more'], about: 'a grown-up set a rule: learn {more} more today before the Game Room opens', ex: {more: '6 minutes'}},
    max: {slots: ['max'], about: 'today\'s game time is used up (the daily limit is {max}); more tomorrow', ex: {max: '30 minutes'}},
    paused: {slots: [], about: 'a grown-up has paused game time', ex: {}}}},
  {id: 'earn', icon: 'star', q: [], v: {
    lesson: {slots: ['min'], about: 'how to earn game time: passing a lesson with the pet pays {min}; finishing learning rounds earns time too', ex: {min: '5 minutes'}},
    round: {slots: [], about: 'how to earn game time: finishing learning rounds (lessons with the pet are off, or a grown-up set them to pay nothing)', ex: {}}}},
  {id: 'grow', icon: 'heart', q: [], v: {
    egg: {slots: ['stars'], about: 'the pet is still an egg; {stars} until it hatches (stars come from learning)', ex: {stars: '12 more stars'}},
    grow: {slots: ['stars'], about: 'the pet grows to its next stage in {stars} (stars come from learning)', ex: {stars: '40 more stars'}},
    big: {slots: [], about: 'the pet is fully grown (a super pet)', ex: {}}}},
  {id: 'feel', icon: 'paw', q: [], v: {
    hungry: {slots: [], about: 'the pet is hungry (Pet Care: feed it)', ex: {}},
    messy: {slots: [], about: 'the pet needs a bath (Pet Care: wash it)', ex: {}},
    bored: {slots: [], about: 'the pet wants to play (Pet Care: play with it)', ex: {}},
    happy: {slots: [], about: 'the pet is happy and cared for', ex: {}}}},
  {id: 'stuck', icon: 'thumbs-up', q: [], v: {
    help: {slots: [], about: 'what to do when a question is too hard: tap Help (in a round) for a hint, go slowly, ask a grown-up, try an easier stop; mistakes help us learn', ex: {}}}},
];
const ASK_AGES = ['little', 'kid', 'teen'];
// the pet's age for the child's grade: the same rule as lsAge (52c-scripts.js, part teach; tools/test.js checks they agree)
const askAge = (g = gradeOf()) => g <= 2 ? 'little' : g <= 4 ? 'kid' : 'teen';
const askPl = (n, w) => n + ' ' + w + (n == 1 ? '' : 's');
// seconds as the pet says them: "4 minutes", "1 and a half minutes", "half a minute", "less than half a minute"
function askMins(sec) {
  sec = Math.max(0, Math.floor(sec));
  const m = Math.floor(sec / 60), half = sec % 60 >= 30;
  if (!m) return half ? 'half a minute' : 'less than half a minute';
  return half ? m + ' and a half minutes' : askPl(m, 'minute');
}
// the map the child means: the one on screen, else the last one opened this session (MAPP, 46-home.js), else Math
const askMap = () => (typeof MAPP == 'string' && NODES[MAPP] ? MAPP : 'math');
// the question's usual hint as plain words, without drawing or saying anything ('' when it has none in words)
function askGenHint(q) {
  const h = q && q.hint;
  if (!h) return '';
  const strip = t => String(t || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  // the words of a drawn hint are its last caption (<div>...</div>): the rods, dots and signs before it say nothing without the picture
  const cap = x => { const m = [...String(x).matchAll(/<div>([^<]*)<\/div>/g)]; return m.length ? m[m.length - 1][1] : x; };
  let t = '';
  if (h.k == 'text' || h.k == 'say') t = h.s;
  else if (h.k == 'html') t = h.w || cap(h.html);
  else if (h.k == 'steps') t = h.w || (h.steps && h.steps[0] && h.steps[0].say) || '';
  else if (h.k == 'pairs' || h.k == 'emoji' || h.k == 'blocks') t = cap(hintHTML(q)); // these three only draw: no sound, no DOM
  t = strip(t).replace(/\p{Extended_Pictographic}|\uFE0F/gu, '').replace(/\s+/g, ' ').trim();
  // a long one (a table of units) is cut after the sentence that passes 160 characters
  if (t.length > 160) t = (t.match(/^.{0,160}?[.?!](?=\s|$)/) || [''])[0];
  // words only: a bare number or sign under a picture ("3 went away") says nothing on its own
  return /[A-Za-z]{3}/.test(t) ? t : '';
}
// the number words a line may say an answer with ("Count with me. one.")
const ASK_NUMW = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty'.split(' ');
/* Would this line give away the answer of question q? Stricter than the round's hmLeaks: the question may come back in review, and
   by then the child has neither heard nor seen it, so any part of its answer (a number, its number word, a word, a letter) in the
   line counts, even when the question's own words held it. */
function askLeak(q, line) {
  if (!q || q.ans == null || !line) return false;
  const t0 = typeof hmToks == 'function' ? hmToks(line) : String(line).toLowerCase().split(/[^a-z0-9.]+/);
  const toks = t0.concat(t0.map(x => x.replace(/^-/, ''))); // "-20" holds the answer 20 too
  const parts = String(q.ans).toLowerCase().split('|').map(x => x.trim().replace(/^\+/, '')).filter(x => x && !['yes', 'no'].includes(x));
  return parts.some(a => toks.includes(a) || /^\d+$/.test(a) && toks.includes(ASK_NUMW[+a]) || a.length > 2 && /[a-z]/.test(a) && String(line).toLowerCase().includes(a));
}
// the hint for the last mistake: its approved HINT-01 line when it has one (as hmHint picks it), else the question's usual hint
function askTip(lm) {
  const q = lm.q, v = lm.v, open = typeof G != 'undefined' && G && G.q;
  const ok = t => t && !askLeak(q, t) && !(open && open !== q && askLeak(open, t)) && !(typeof ksBad == 'function' && ksBad(t, true));
  try {
    const own = !TEACH.off && !twoWay(q) && !(typeof mastTag == 'function' && mastTag(q) == 'ch');
    const m = own && typeof hmMatch == 'function' ? hmMatch(q, v) : null, w = m && HINTW[m.c];
    const line = w && !(m.s.o != null && ksBad(m.s.o, true)) ? hmFill(w, m.s) : null;
    if (ok(line)) return line;
  } catch (e) {}
  const g = askGenHint(q);
  return ok(g) ? g : '';
}
/* Which answer fits now: {v, s} (the variant and its slot values), or null when the question does not fit now. o.p: the map. */
function askState(id, o = {}) {
  const p = o.p || askMap(), N = NODES[p];
  if (id == 'next' || id == 'how') {
    const i = curNode(p), n = N[i], w = PATHS[p].worlds[n.wi];
    if (id == 'next') {
      if (passed(p, i)) return PLAY.locked() ? null : {v: 'done', s: {subject: placeName(p)}}; // the Play sample done: no "all done"
      return {v: lsGate(p, i) ? 'lesson' : 'stop', s: {stop: n.t, world: w.n}};
    }
    // the lesson's idea line (its parts loaded: askOpen asks for them); only a stop with a lesson for this child (lsStopAt)
    const L = typeof LESSONS != 'undefined' && lsStopAt(p, i) && !passed(p, i) ? LESSONS[nid(n)] : null;
    return L && typeof L.idea == 'string' && L.idea && !/[{}]/.test(L.idea) ? {v: 'idea', s: {stop: n.t, idea: L.idea}} : null;
  }
  if (id == 'why') {
    const lm = typeof ASK_LM != 'undefined' ? ASK_LM : null;
    if (!lm || lm.k !== SKEY || !lm.q) return null; // no mistake yet this session (or it was another child's)
    const t = askTip(lm);
    return t ? {v: 'tip', s: {hint: t}} : {v: 'look', s: {}};
  }
  if (id == 'time') {
    const t = ptState();
    if (t.why == 'paused') return {v: 'paused', s: {}};
    if (t.why == 'learn') return {v: 'learn', s: {more: askMins(t.more)}};
    if (t.why == 'max') return {v: 'max', s: {max: askPl(t.max, 'minute')}};
    if (t.why == 'empty' || t.left <= 0) return {v: 'empty', s: {}};
    return {v: 'ok', s: {time: askMins(t.left)}};
  }
  if (id == 'earn') {
    const m = lsPayCfg().ls1; // earning goes on while game time is paused (ptEarn): only spending stops
    return !TEACH.off && m > 0 ? {v: 'lesson', s: {min: askPl(m, 'minute')}} : {v: 'round', s: {}};
  }
  if (id == 'grow') {
    const st = stage(), nx = GROW[st + 1];
    if (nx == null) return {v: 'big', s: {}};
    const k = nx - S.stars;
    return {v: st == 0 ? 'egg' : 'grow', s: {stars: k + ' more star' + (k == 1 ? '' : 's')}};
  }
  if (id == 'feel') {
    const c = careTick();
    return {v: c.food < 30 ? 'hungry' : c.clean < 30 ? 'messy' : c.fun < 30 ? 'bored' : 'happy', s: {}};
  }
  if (id == 'stuck') return {v: 'help', s: {}};
  return null;
}
// a line with its slots filled ({name} the child, {pet} the pet, and the variant's own); null when a slot has no value
function askFill(t, s) {
  let bad = false;
  const all = Object.assign({name: S.name, pet: petN()}, s);
  const out = String(t).replace(/\{([a-z]+)\}/g, (_, k) => {
    if (all[k] == null || all[k] === '') { bad = true; return ''; }
    return String(all[k]);
  });
  const r = out.replace(/\s+/g, ' ').trim();
  return bad ? null : r.charAt(0).toUpperCase() + r.slice(1); // a line that starts with a slot starts with a capital
}
/* The menu now: [{id, icon, q (the question, filled), a (the answer, filled), v}] for every reviewed question that fits now.
   o.age: the pet's age (default the child's), o.p: the map. */
function askItems(o = {}) {
  const age = o.age || askAge(), out = [];
  for (const Q of ASK_Q) {
    const W = typeof ASKW != 'undefined' && ASKW[Q.id];
    if (!W) continue;
    let st = null;
    try { st = askState(Q.id, o); } catch (e) { st = null; }
    if (!st) continue;
    const ls = [].concat(((W.a || {})[age] || {})[st.v] || []);
    if (!ls.length) continue;
    const q = askFill(W.q, st.s), a = askFill(ls.join(' '), st.s); // one or two lines, said one after the other
    if (q && a) out.push({id: Q.id, icon: Q.icon, q, a, v: st.v});
  }
  return out;
}
// the lesson parts the "how" question needs (the idea line of the current stop's lesson), as the map's lesson stop loads them
const askParts = p => { const i = curNode(p); return !TEACH.off && lsStopAt(p, i) ? lsParts(p, i) : []; };
/* The sheet. from: the Ask button that opened it (the sheet opens only while it is still on screen). */
async function askOpen(from) {
  const p = askMap();
  if (askParts(p).length) await partsLoad(askParts(p)).catch(() => null);
  if (from && !from.isConnected) return; // the child went elsewhere while a lesson part loaded
  const items = askItems({p});
  if (!items.length) return;
  const pn = esc(petN());
  const s = UI.sheet(`<div class="ak">
    <div class="ak-top"><span class="ak-pet ${petAura()}" id="ak-pet" aria-hidden="true">${petHTML()}</span><h2>Ask ${pn}</h2>
      ${UI.ibtn('close', 'Close', {size: 'sm', id: 'ak-done', cls: 'ak-x'})}</div>
    <p class="ak-bub" id="ak-a" role="status" aria-live="polite">Pick a question.</p>
    <div class="ak-qs">${items.map(x => `<button class="btn soft ak-q" data-ask="${x.id}" aria-pressed="false">${ico(x.icon, 28)}<span>${esc(x.q)}</span></button>`).join('')}</div></div>`);
  const el = s.el, ans = el.querySelector('#ak-a');
  el.querySelectorAll('.ak-q').forEach(b => b.onclick = () => {
    const x = items.find(y => y.id == b.dataset.ask);
    el.querySelectorAll('.ak-q').forEach(c => c.setAttribute('aria-pressed', c === b ? 'true' : 'false'));
    ans.textContent = x.a;
    ans.dataset.ask = x.id;
    SFX.pop();
    anim(el.querySelector('#ak-pet'), 'jump');
    say(x.a); // the tablet's voice, as the pet's other lines on Home (no recording)
  });
  el.querySelector('#ak-done').onclick = () => s.close();
  return s;
}
