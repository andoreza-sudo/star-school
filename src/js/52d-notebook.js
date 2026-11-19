/* ---------- TEACH-2: the notebook (TEACH-PLAN-2 system E) and the lessons' part of the report card (system I) (part teach) ----------
   The notebook is the child's own view of "learned": one page per idea the child learned in a lesson, each with the picture of
   something they built in that lesson (drawn again from S.know[id].note, the few numbers of their Explore build; nothing else is
   stored) and the idea in one sentence. A page gains a star when the idea is kept (right again in Remember on a later day).
   Nothing needs reading: the pet says the screen's line when it opens, and each page has a speaker that says its idea.
   It opens from the lesson's end card and from a button on the math map's top bar (once there is a page).
   LSREP builds the lessons' card of the grown-ups' report card (REP in 82-report.js calls it when this part is loaded):
   four stages per strand (taught, practising, learned, still knows it), what we noticed (a misconception held, knowHeld) with the
   "Practise this next" pin, the before-and-after measure and tonight's question. */
// the right build or answer of an Explore task (any build is fine there; this is one the checker takes)
const lsRight = q => (q.kind == 'make' && q.model == 'frame2' ? [(q.m.target || q.m.total) - 1, 1] : q.goal == 'less' ? String(q.s0[0] - 1)
  : q.kind == 'make' && (K2MM[q.model].raw || q.raw) ? K2MM[q.model].ans(q) : q.ans); // TEACH-2b: a raw model's right build is its state
// TEACH-4: a lesson's own map (math or reading); a stop of a lesson whose part is not in is looked for on both
const lsPathOf = id => (LESSONS[id] && LESSONS[id].p) || (NODES.read && NODES.read.some(n => nid(n) === id) ? 'read' : 'math');
const lsAt = id => NODES[lsPathOf(id)].findIndex(n => nid(n) === id);
// the order of the notebook's pages and the report's rows: the math map, then the reading map
const lsOrd = id => (lsPathOf(id) == 'math' ? 0 : 1e4) + lsAt(id);
const NB = {
  // the pages, in map order: {id, t, idea, kept, html (the picture)}
  pages(S0 = S) {
    const K = S0.know || {};
    return LS_IDS.filter(id => K[id] && K[id].s >= 2 && lsAt(id) >= 0).sort((a, b) => lsOrd(a) - lsOrd(b))
      .map(id => ({id, t: LESSONS[id].t, idea: LESSONS[id].idea, kept: K[id].s >= 3, html: NB.pic(id, K[id].note)}));
  },
  // the page's picture: the Name it picture of the lesson, on what the child built (a test-out has no build: a build the lesson takes)
  pic(id, note) {
    const L = LESSONS[id], r = mulberry32(id.length * 7 + 1);
    let c = note && typeof note == 'object' && Object.keys(note).length ? note : null;
    try {
      if (!c) { const e = L.exp(r); c = e.react(NB.build(e.q)).ctx; }
      return L.name(Object.assign({}, c), r).html.replace(/<svg /g, '<svg aria-hidden="true" ');
    } catch (e) { return ''; }
  },
  // a build for a page with no Explore build of its own: an "any way" task gets a small middling one, others the one the checker takes
  build(q) {
    if (q.demo != null) return q.demo; // TEACH-2b: a script's own middling build
    if (q.goal != 'any') return lsRight(q);
    if (q.kind == 'line') return String(Math.round((q.line.min + q.line.max) * .6));
    if (q.model == 'b10') return '34';
    return String(Math.max(1, Math.ceil((q.m.total - (q.m.fixed || 0)) * .35)));
  },
  back: null,
  open(back) {
    NB.back = back || (() => pathMap('math'));
    const pg = NB.pages(), T = lsTone(), sg = planSuggest(S, lsDay()), nx = sg && LESSONS[sg.plan.id];
    const line = pg.length ? T.nb(pg.length) : T.nb0;
    view(`<div class="top tbar s-math nbk-top">${UI.ibtn('back', 'Back', {size: 'sm', id: 'back'})}<div class="ttl">${ico('doc', 30)}<span>My notebook</span></div>
      ${UI.chip('star', pg.filter(p => p.kept).length, {aria: 'Ideas you still know'})}</div>
    <div class="scroll nbk" id="nb"><div class="nbk-in">
     <div class="ls-pet nbk-pet"><div class="ls-art" id="lsart" aria-hidden="true"></div><div class="ls-bub on" id="lsbub" role="status"><span>${esc(line)}</span></div>
      ${UI.ibtn('speak', 'Hear it again', {size: 'sm', id: 'nbhear', cls: 'ls-hear'})}</div>
     ${pg.length ? `<ul class="nbk-pages">${pg.map(p => `<li class="nbk-pg${p.kept ? ' kept' : ''}" data-nbp="${p.id}"><div class="nbk-pic" aria-hidden="true">${p.html}</div>`
      + `<p class="nbk-idea">${esc(p.idea)}</p><div class="nbk-foot"><span class="nbk-t">${p.kept ? ico('star', 22, 'nbk-star') : ''}<span>${esc(p.t)}</span></span>`
      + `${UI.ibtn('speak', 'Hear: ' + p.idea, {size: 'sm', attrs: `data-nb="${p.id}"`})}</div></li>`).join('')}</ul>`
      : `<div class="nbk-empty" aria-hidden="true">${ico('doc', 64)}</div>`}
     ${nx ? `<div class="nbk-next">${UI.btn(nx.t, {kind: 'primary', size: 'lg', icon: 'go', id: 'nbgo', attrs: `aria-label="Learn ${esc(nx.t)} with ${esc(petN())}"`})}</div>` : ''}
    </div></div>`);
    LS.mood('happy');
    $('#back').onclick = () => { SFX.whoosh(); NB.back(); };
    $('#nbhear').onclick = () => say(line);
    const hear = id => { const p = pg.find(x => x.id == id); if (p) { say(p.kept ? `${p.idea} ${T.kept}` : p.idea); LS.mood('happy'); } };
    $$('[data-nb]').forEach(b => b.onclick = e => { e.stopPropagation(); hear(b.dataset.nb); });
    $$('[data-nbp]').forEach(li => li.onclick = () => hear(li.dataset.nbp));
    if ($('#nbgo')) $('#nbgo').onclick = () => { SFX.whoosh(); LS.start(sg.plan.id); };
    if (LS.voice()) say(line);
  },
  // the button on the math map's top bar, beside the stars (only once there is a page)
  mapBtn() {
    const t = $('.mp-top');
    if (!t || $('#nbopen') || !NB.pages().length) return;
    const b = UI.ibtn('doc', 'My notebook', {size: 'sm', id: 'nbopen', cls: 'nbk-open'}), c = t.querySelector('.chip');
    if (c) c.insertAdjacentHTML('beforebegin', b); else t.insertAdjacentHTML('beforeend', b);
    const mp = ['read', 'es', 'disc'].includes(MAPP) ? MAPP : 'math'; // TEACH-4: back to the map it was opened from (TEACH-5S: Spanish, Discover)
    $('#nbopen').onclick = () => { SFX.whoosh(); NB.open(() => pathMap(mp)); };
  },
};

const LSREP = {
  ST: ['Taught', 'Practising', 'Learned', 'Still knows it'],
  // what we noticed, one per misconception code: "{name} ..." (the idea, never the child)
  NOTE: {
    off1: 'often ends one away from the answer, counting one thing twice or missing one',
    given: 'often answers with a number that is already shown',
    op: 'sometimes adds when the problem takes away, or the other way round',
    all: 'often counts everything and forgets to take some away',
    ten: 'sometimes forgets the full ten when counting past ten',
    swap: 'sometimes swaps the tens and the ones (41 for 14)',
    small: 'sometimes picks the smaller number as the bigger one',
    back: 'often counts on when the problem counts back',
    col: 'often takes the smaller digit from the bigger one in each column',
    keep: 'borrows a ten for the ones but leaves the tens as they were',
    nocarry: 'adds each column but drops the extra ten',
    cat: 'writes each column total side by side (27 + 15 as 312)',
    count: 'counts the coins instead of adding what they are worth',
    hands: 'mixes up the hour hand and the minute hand',
  },
  // the stage of a lesson stop: 0 taught (a lesson ran), 1 practising (more lessons or practice rounds since, not yet without help),
  // 2 learned (Show with no help), 3 still knows it (right again on a later day); -1 not taught
  stage(id, k) {
    if (!k || !(k.s >= 1)) return -1;
    if (k.s >= 2) return k.s >= 3 ? 3 : 2;
    const i = lsAt(id);
    return k.n >= 2 || i >= 0 && passed(lsPathOf(id), i) ? 1 : 0;
  },
  data(S0 = S) {
    const K = S0.know && typeof S0.know == 'object' ? S0.know : {}, day = lsDay(), rows = {}, noticed = [];
    for (const id in K) {
      const st = LSREP.stage(id, K[id]), i = lsAt(id);
      if (st < 0 || i < 0) continue;
      const lp = lsPathOf(id), nd = NODES[lp][i], nm = REP.strandOf(nd.sk), r = rows[nm] || (rows[nm] = {name: nm, c: [0, 0, 0, 0], t: [[], [], [], []]});
      r.c[st]++;
      r.t[st].push(nd.t);
      const h = knowHeld(id, S0, day);
      if (h && LSREP.NOTE[h]) noticed.push({p: lp, sk: nd.sk, lv: nd.lv, t: nd.t, code: h, i: lsOrd(id)});
    }
    const order = REP.STRANDS.map(x => x[0]);
    const lm = Array.isArray(S0.lm) ? S0.lm : [];
    return {any: lm.length > 0 || Object.keys(rows).length > 0, rows: Object.values(rows).sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name)),
      noticed: noticed.sort((a, b) => a.i - b.i).slice(0, 4), off: TEACH.off};
  },
  html(m) {
    const L = m.ls, nm = esc(m.name || 'Your child'), pet = esc(petN()), t = m.teach;
    const cols = L.rows.length ? `<div class="rp-ls" role="table" aria-label="Lessons by stage"><div class="rp-lsr rp-lsh" role="row"><span role="columnheader">Topic</span>`
      + LSREP.ST.map(s => `<span role="columnheader">${s}</span>`).join('') + '</div>'
      + L.rows.map(r => `<div class="rp-lsr" role="row"><span role="rowheader">${esc(r.name)}</span>`
        + r.c.map((n, j) => `<span role="cell" class="rp-lsn${n ? ' on' : ''}" title="${esc(r.t[j].join(', '))}">${n}</span>`).join('') + '</div>').join('') + '</div>'
      + '<div class="small rp-key">Learned means your child did it with no help. Still knows it means they did it again days later. '
      + 'Taught: a lesson ran. Practising: more lessons or rounds since, not yet with no help.</div>' : '';
    const pin = REP.pinned || (() => false);
    const seen = L.noticed.length ? `<h3 class="rp-h3">What we noticed</h3><ul class="rp-list rp-noticed">${L.noticed.map((x, k) => {
      const on = pin(m, x);
      return `<li>In <b>${esc(x.t)}</b>, ${nm} ${esc(LSREP.NOTE[x.code])}. We are working on it: the next lesson starts with the picture of both answers, `
        + `and ${pet} makes that mistake for ${nm} to fix.`
        + `<button class="btn ${on ? 'primary' : 'soft'} sm rp-pin rp-noprint" data-npin="${k}" aria-pressed="${on}">${ico(on ? 'check' : 'pin', 22)}`
        + `<span>${on ? "Tomorrow's first mission" : 'Practise this next'}</span></button></li>`;
    }).join('')}</ul>` : '';
    const meas = t ? `<p>${t.n} lesson${t.n > 1 ? 's' : ''}${t.to ? `, ${t.to} already known (tested out)` : ''}. Right on the first try before the lesson: ${t.pre}%. After it: ${t.post}%.</p>`
      + '<div class="small rp-key">Before: two questions at the start of a lesson, with no help. After: two at its end, with no help. All of it stays on this tablet.</div>' : '';
    return `${t && t.tq ? `<p><b>Tonight's question:</b> ${esc(t.tq)}</p>` : ''}${L.off ? `<p class="small">Lessons are off (Grown-ups, Grade and level).</p>` : ''}${cols}${seen}${meas}`;
  },
  // "Practise this next" on a noticed stop: the report card's pin (S.pin, one stop, tomorrow's first mission)
  bind(m, redraw) {
    $$('[data-npin]').forEach(b => b.onclick = () => {
      const x = m.ls.noticed[+b.dataset.npin];
      if (!x) return;
      S.pin = REP.pinned(m, x) ? null : {p: x.p, sk: x.sk, lv: x.lv, t: String(x.t || '').slice(0, 60), d: today()};
      save();
      SFX.pop(2);
      redraw();
    });
  },
};
