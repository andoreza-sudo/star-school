/* ---------- STORIES-7 (BEST-APP roadmap 7): the story reader (part teachrd) ----------
   Gated: STORY7_ON (42c-story7on.js, BUILT from docs/drafts/STORIES7-READ.md) is 0 until the owner approves the stories, their words
   and these screens; with 0 the reading map draws no Stories stop (st7At, 42c-story7.js) and nothing here is ever opened.
   Where a child meets it: a Stories stop on the reading map right after each phonics stop (Picture Words, Blends, Letter Teams,
   Silent E, Vowel Teams, Bossy R, Vowel Teams 2; ST7.stages). It opens with that stop's practice (st7OpenAt) and leads to the shelf
   (ST7.shelf), which lists every stage's stories, the open ones to tap.
   One story (ST7.open):
     Read to me      every word of the title and the story lights up while it is spoken (st7Play). The clock is a timing array,
                     one [start, end] in ms per word (st7Plan): from the story's recording when it has one (ST7A[id].t, with the file
                     ST7A[id].f in audio/story/: none yet, the owner decides on recordings), else estimated from the words, and then
                     the tablet's voice says one word at a time on that clock (a word waits for the voice to finish, never longer
                     than three times its time).
     Now you read it the words stay still; a tap on a word says it (any time, in any mode); "I read it!" when done.
     Questions       1 or 2 picture questions (KIND.choice, the round's choice buttons, 49-kinds.js): a wrong picture is marked and
                     greyed, the child tries again; then the end card (Read it again, More stories).
   Nothing is saved: no stars, no game time, no change to the map. ST7R.rate speeds the read-along clock (tools/smoke.js). */
const ST7W = { // every sentence these screens show or say: proposed wording in docs/drafts/STORIES7-READ.md (tools/test.js STORIES-7)
  shelf: 'Stories',
  shelfTip: 'Pick a story. I read it to you, then you read it!',
  locked: 'Opens with {stop}',
  read: 'Read to me',
  stop: 'Stop',
  you: 'Now you read it',
  done: 'I read it!',
  tipStart: 'Tap Read to me. Each word lights up as I say it.',
  tipRead: 'Look at each word as I say it.',
  tipAfter: 'Now you read it!',
  tipYou: 'Read the story. Tap a word if you need help.',
  qn: 'Question {n} of {all}',
  hear: 'Hear it',
  right: 'Yes! That is right.',
  wrong: 'Not that one. Look at the story again.',
  end: 'You read {title}!',
  again: 'Read it again',
  more: 'More stories',
};
const ST7R = {rate: 1, gen: 0, mode: '', st: null, ws: null, plan: null, qi: 0};
const st7F = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in o ? o[k] : m));
const st7Idx = stop => NODES.read.findIndex(n => nid(n) == stop);
const st7Name = stop => { const i = st7Idx(stop); return i >= 0 ? NODES.read[i].t : stop; };
const st7Ok = stop => { const i = st7Idx(stop); return i >= 0 && st7OpenAt(i); };
const st7Get = id => ST7.list.find(s => s.id == id);
// the words of a story, title first: {w: as shown, k: as said, s: -1 for the title or the sentence's index, end: last of its line}
function st7Words(st) {
  const out = [];
  [st.t].concat(st.s).forEach((line, li) => {
    const ts = line.split(/\s+/).filter(Boolean);
    ts.forEach((w, j) => out.push({w, k: w.replace(/[^A-Za-z'’]/g, '').replace(/’/g, "'"), s: li - 1, end: j == ts.length - 1}));
  });
  return out;
}
// the read-along clock: [start, end] in ms for each word. A recording's own times when they fit its words, else an estimate:
// 320 ms and 60 ms a letter per word, 140 ms between words, 500 ms after a sentence, 700 ms after the title
function st7Plan(st) {
  const ws = st7Words(st), rec = typeof ST7A != 'undefined' && ST7A[st.id];
  if (rec && Array.isArray(rec.t) && rec.t.length == ws.length) return rec.t.map(x => [+x[0], +x[1]]);
  let t = 0;
  return ws.map(w => { const d = 320 + 60 * w.k.length, a = [t, t + d]; t += d + (w.end ? (w.s < 0 ? 700 : 500) : 140); return a; });
}
// the word lit at ms (for a recording's clock: its currentTime); -1 between words
const st7Lit = (plan, ms) => plan.findIndex(x => ms >= x[0] && ms < x[1]);
// the picture choices of question k of a story: always the same order for the same story (no random draw)
function st7Q(st, k) {
  const q = st.q[k], all = [q[1]].concat(q[2]), r = [...(st.id + k)].reduce((a, c) => a + c.charCodeAt(0), 0) % all.length;
  const ch = all.slice(r).concat(all.slice(0, r));
  return {kind: 'choice', cls: 'pics st7-ch', ans: q[1], say: q[0], choices: ch.map(w => ({l: picFor(w), v: w, h: true, w}))};
}
const st7Btns = ws => ws.map((w, i) => `<button class="st7-w" data-i="${i}">${esc(w.w)}</button>`);

ST7.shelf = function (stop) {
  st7Halt();
  const card = st => `<button class="btn st7-card" data-st="${esc(st.id)}"><span class="st7-cp" aria-hidden="true">${picArt(st.pic, 64)}</span><span>${esc(st.t)}</span></button>`;
  const secs = ST7.stages.map(sg => {
    const ok = st7Ok(sg.stop), list = ST7.list.filter(s => s.st == sg.id), nm = st7Name(sg.stop);
    return `<section class="st7-sg${ok ? '' : ' lock'}" data-stop="${esc(sg.stop)}"><h2 class="st7-sh">${ico(ok ? 'skill-story' : 'lock', 28)}<span>${esc(nm)}</span></h2>`
      + (ok ? `<div class="st7-grid">${list.map(card).join('')}</div>` : `<p class="st7-lk">${esc(st7F(ST7W.locked, {stop: nm}))}</p>`) + '</section>';
  }).join('');
  view(`<div class="top tbar s-read">${UI.ibtn('back', 'Back', {size: 'sm', id: 'back'})}<div class="ttl">${ico('skill-story', 30)}<span>${esc(ST7W.shelf)}</span></div></div>`
    + `<div class="scroll st7-shelf" id="st7s"><p class="sub st7-tip">${esc(ST7W.shelfTip)}</p>${secs}</div>`);
  $('#back').onclick = () => { SFX.click(); pathMap('read'); };
  $$('.st7-card').forEach(b => b.onclick = () => { SFX.whoosh(); ST7.open(b.dataset.st); });
  const sec = stop && $(`.st7-sg[data-stop="${stop}"]`);
  if (sec && sec.scrollIntoView) sec.scrollIntoView({block: 'start'});
  nrSay(ST7W.shelfTip, '#st7s');
};

ST7.open = function (id) {
  const st = st7Get(id);
  if (!st) return ST7.shelf();
  st7Halt();
  const ws = st7Words(st), b = st7Btns(ws), nt = st.t.split(/\s+/).filter(Boolean).length, sg = ST7.stages.find(x => x.id == st.st);
  Object.assign(ST7R, {st, ws, plan: st7Plan(st), mode: ''});
  view(`<div class="top tbar s-read">${UI.ibtn('back', 'Back', {size: 'sm', id: 'back'})}<div class="ttl">${ico('skill-story', 30)}<span>${esc(sg ? st7Name(sg.stop) : ST7W.shelf)}</span></div></div>`
    + `<div class="scroll st7-story" id="st7"><div class="st7-page"><div class="st7-pic" aria-hidden="true">${picArt(st.pic, '100%')}</div>`
    + `<div class="st7-body"><h2 class="st7-t">${b.slice(0, nt).join(' ')}</h2><p class="st7-txt">${b.slice(nt).join(' ')}</p></div></div>`
    + `<p class="st7-tip" id="st7tip">${esc(ST7W.tipStart)}</p>`
    + `<div class="st7-act">${UI.btn(ST7W.read, {kind: 'primary', size: 'lg', icon: 'speak', id: 'st7read'})}${UI.btn(ST7W.you, {size: 'lg', icon: 'eye', id: 'st7you'})}`
    + `${UI.btn(ST7W.done, {kind: 'primary', size: 'lg', icon: 'check', id: 'st7done', cls: 'st7-hide'})}</div></div>`);
  $('#back').onclick = () => { SFX.click(); ST7.shelf(sg && sg.stop); };
  $('#st7read').onclick = () => st7Play();
  $('#st7you').onclick = () => st7You();
  $('#st7done').onclick = () => { st7Halt(); SFX.whoosh(); st7Quiz(0); };
  $$('.st7-w').forEach(w => w.onclick = () => st7Tap(+w.dataset.i));
  nrSay(ST7W.tipStart, '#st7');
};
function st7Tip(t, sayIt) { const e = $('#st7tip'); if (e) e.textContent = t; if (sayIt) say(t); }
function st7Light(i) {
  for (const e of $$('.st7-w.st7-on')) e.classList.remove('st7-on');
  const e = $(`.st7-w[data-i="${i}"]`);
  if (!e) return;
  e.classList.add('st7-on');
  for (const x of $$('.st7-w')) x.classList.toggle('st7-past', +x.dataset.i < i);
  if (e.scrollIntoView) e.scrollIntoView({block: 'nearest'});
}
function st7Label(t) { const b = $('#st7read span'); if (b) b.textContent = t; }
// stop the read-along (a new screen, Stop, Now you read it, a word tapped)
function st7Halt(quiet) {
  const was = ST7R.mode == 'play';
  ST7R.gen++;
  if (ST7R.au) { try { ST7R.au.pause(); } catch (e) {} ST7R.au = null; }
  if (was) { try { hush(); } catch (e) {} }
  if (ST7R.mode == 'play') ST7R.mode = '';
  for (const e of $$('.st7-w.st7-on')) e.classList.remove('st7-on');
  for (const e of $$('.st7-w.st7-past')) e.classList.remove('st7-past');
  st7Label(ST7W.read);
  if (was && quiet === true) st7Tip(ST7W.tipStart);
}
// Read to me: one word at a time on the clock of st7Plan, the tablet's voice saying each word (a recording, when there is one)
function st7Play() {
  if (ST7R.mode == 'play') return st7Halt(true);
  st7Halt();
  const g = ST7R.gen, ws = ST7R.ws, plan = ST7R.plan, st = ST7R.st, rec = typeof ST7A != 'undefined' && ST7A[st.id];
  ST7R.mode = 'play';
  $('#st7').classList.remove('st7-youmode');
  $('#st7done').classList.add('st7-hide');
  st7Label(ST7W.stop);
  st7Tip(ST7W.tipRead);
  SFX.pop(1);
  if (rec && rec.f && rec.t && rec.t.length == ws.length && typeof Audio != 'undefined') {
    // a recording: the words follow its clock (built for the owner's later recordings: audio/story/<file>)
    const a = ST7R.au = new Audio('audio/story/' + rec.f);
    a.ontimeupdate = () => { if (g === ST7R.gen) { const k = st7Lit(plan, a.currentTime * 1000); if (k >= 0) st7Light(k); } };
    a.onended = () => { if (g === ST7R.gen) st7End(); };
    a.onerror = () => { if (g === ST7R.gen) { ST7R.au = null; st7Words1(g, 0); } };
    a.play().catch(() => { if (g === ST7R.gen) { ST7R.au = null; st7Words1(g, 0); } });
    return;
  }
  st7Words1(g, 0);
}
function st7Words1(g, i) {
  const ws = ST7R.ws, plan = ST7R.plan, r = ST7R.rate || 1;
  if (g !== ST7R.gen) return;
  if (i >= ws.length) return st7End();
  st7Light(i);
  try { say(ws[i].k); } catch (e) {}
  const d = (plan[i][1] - plan[i][0]) / r, gap = ((plan[i + 1] ? plan[i + 1][0] : plan[i][1]) - plan[i][1]) / r, tick = Math.max(10, Math.min(60, d / 4));
  let el = 0;
  const wait = () => {
    if (g !== ST7R.gen) return;
    el += tick;
    let busy = false;
    try { busy = speakBusy(); } catch (e) {}
    if (el >= d && (!busy || el >= 3 * d)) setTimeout(() => st7Words1(g, i + 1), gap);
    else setTimeout(wait, tick);
  };
  setTimeout(wait, tick);
}
function st7End() {
  ST7R.gen++;
  ST7R.mode = '';
  st7Label(ST7W.read);
  for (const e of $$('.st7-w.st7-on')) e.classList.remove('st7-on');
  for (const e of $$('.st7-w')) e.classList.add('st7-past');
  st7Tip(ST7W.tipAfter, true);
  bump('#st7you');
}
// Now you read it: the child reads; a tap on a word says it; I read it! at the end
function st7You() {
  st7Halt();
  ST7R.mode = 'you';
  for (const e of $$('.st7-w')) e.classList.remove('st7-past', 'st7-heard');
  $('#st7').classList.add('st7-youmode');
  const d = $('#st7done');
  d.classList.remove('st7-hide');
  SFX.pop(2);
  st7Tip(ST7W.tipYou, true);
  bump('#st7done');
}
function st7Tap(i) {
  if (ST7R.mode == 'play') st7Halt(true);
  const w = ST7R.ws && ST7R.ws[i], e = $(`.st7-w[data-i="${i}"]`);
  if (!w || !e) return;
  say(w.k);
  e.classList.add('st7-heard');
}
// the picture questions, one at a time
function st7Quiz(k) {
  const st = ST7R.st;
  if (!st) return ST7.shelf();
  if (k >= st.q.length) return st7Fin();
  ST7R.qi = k;
  const q = st7Q(st, k);
  view(`<div class="top tbar s-read">${UI.ibtn('back', 'Back', {size: 'sm', id: 'back'})}<div class="ttl">${ico('skill-story', 30)}<span>${esc(st.t)}</span></div></div>`
    + `<div class="scroll st7-quiz" id="st7q"><p class="st7-qn">${esc(st7F(ST7W.qn, {n: k + 1, all: st.q.length}))}</p>`
    + `<div class="st7-qp"><p class="st7-qt">${esc(q.say)}</p>${UI.btn(ST7W.hear, {size: 'sm', icon: 'speak', id: 'st7hear'})}</div>`
    + `<div class="inp">${KIND.choice.render(q)}</div></div>`);
  $$('#st7q .ch').forEach(b => b.setAttribute('aria-label', q.choices[+b.dataset.i].w));
  $('#back').onclick = () => { SFX.click(); ST7.open(st.id); };
  $('#st7hear').onclick = e => say(q.say, e.currentTarget);
  let done = false;
  KIND.choice.bind(q, {}, (v, el) => {
    if (done || !el || el.disabled) return;
    if (String(v) === String(q.ans)) {
      done = true;
      el.classList.add('right');
      SFX.right(k);
      fb(ST7W.right, 'good');
      say(ST7W.right);
      setTimeout(() => { if ($('#st7q')) st7Quiz(k + 1); }, 1300);
    } else {
      el.classList.add('wrong');
      el.disabled = true;
      SFX.wrong();
      fb(ST7W.wrong, 'warn');
      say(ST7W.wrong);
    }
  });
  say(q.say);
}
function st7Fin() {
  const st = ST7R.st, sg = ST7.stages.find(x => x.id == st.st), line = st7F(ST7W.end, {title: st.t});
  view(`<div class="top tbar s-read">${UI.ibtn('back', 'Back', {size: 'sm', id: 'back'})}<div class="ttl">${ico('skill-story', 30)}<span>${esc(ST7W.shelf)}</span></div></div>`
    + `<div class="scroll st7-end" id="st7e"><div class="st7-pic" aria-hidden="true">${picArt(st.pic, '100%')}</div><p class="st7-big">${esc(line)}</p>`
    + `<div class="st7-act">${UI.btn(ST7W.again, {size: 'lg', icon: 'replay', id: 'st7again'})}${UI.btn(ST7W.more, {kind: 'primary', size: 'lg', icon: 'skill-story', id: 'st7more'})}</div></div>`);
  $('#back').onclick = () => { SFX.click(); ST7.shelf(sg && sg.stop); };
  $('#st7again').onclick = () => { SFX.whoosh(); ST7.open(st.id); };
  $('#st7more').onclick = () => { SFX.whoosh(); ST7.shelf(sg && sg.stop); };
  SFX.star();
  say(line);
}
