/* ---------- Grown-ups report card (P5-06) ----------
   A read-only screen: it never changes S and never saves. It reads
     S.log   through ACT (53-activity.js)        minutes, rounds, accuracy, last 14 days
     S.mast  through mastStops (51-mastery.js)   mastery by strand, needs practice, recently mastered
     S.prog[sk].miss                             example questions for "Needs practice"
     S.flu   (57-fluency.js)                     Fact Sprint bests
     S.streak through STRK.calc (55-streak.js)
     grade, worlds, S.maps                       where the child is working (42-paths.js)
   ACT.get() tidies S.log in memory (and creates it when missing), so REP.data() puts S.log back exactly as it was.
   REP.data() builds a plain object from the save, REP.html(m) turns it into HTML (both work without the DOM, so test.js calls them),
   report() draws the screen. Every old save works: a missing S.log, S.mast, S.flu or S.streak just gives the empty-state lines.
   Entry point: reportGrownHTML() / reportGrownBind() in the Grown-ups screen (80-grown.js). */
const REP = {
  AREA: {math: 'Math', read: 'Reading', es: 'Spanish', bt: 'Brain Teasers', disc: 'Discover', other: 'Other'},
  // Strands from CURRICULUM section 9, in the order they are listed on the card.
  STRANDS: [
    ['Counting and number sense', 'pk_count pk_num pk_more cnt eo cmp tenf pv round'],
    ['Addition and subtraction', 'add miss sub big'],
    ['Multiplication and division', 'mult arr mfact dfact mbig dbig fact'],
    ['Fractions and decimals', 'frac fop dec'],
    ['Ratios, integers, algebra', 'ratio int ooo alg pat'],
    ['Measurement and data', 'time coins meas data'],
    ['Geometry', 'shape sort pos geo ang coord'],
    ['Problem solving', 'story'],
    ['Letters and phonics', 'abc trace sound rhyme syl pic build'],
    ['Sight words and spelling', 'sight spell'],
    ['Grammar', 'gram sent'],
    ['Vocabulary', 'vocab'],
    ['Comprehension', 'comp info'],
    ['Spanish words', ''],
    ['Spanish sentences', 'es_phrase es_art es_ser es_gusta es_sent es_story'],
    ['Science', 'sci_life sci_earth sci_phys'],
    ['Geography and civics', 'geo_world geo_us civ'],
  ],
  strandOf(sk) {
    sk = String(sk);
    for (const [name, ids] of REP.STRANDS) if (ids && ids.split(' ').includes(sk)) return name;
    if (/^es_/.test(sk)) return 'Spanish words';
    return 'Other skills';
  },
  fmtMin: sec => sec <= 0 ? '0' : sec < 60 ? '<1' : String(Math.round(sec / 60)),
  pct: (ok, q) => q > 0 ? Math.round(ok / q * 100) + '%' : '–',
  MON: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayText(i) {const d = new Date(i * 864e5); return REP.MON[d.getUTCMonth()] + ' ' + d.getUTCDate()},
  ago(i, now) {
    const n = now - i;
    return n <= 0 ? 'today' : n == 1 ? 'yesterday' : n < 60 ? n + ' days ago' : REP.dayText(i);
  },
  // Run fn and put S.log back the way it was (ACT.get() replaces it with a cleaned copy and creates it when missing).
  keepLog(fn) {
    const had = Object.prototype.hasOwnProperty.call(S, 'log'), orig = S.log;
    try {return fn()} finally {if (had) S.log = orig; else delete S.log}
  },
  // Where the child is working in a graded path: the highest world grade with any progress (or skipped by a placement).
  working(p) {
    let g = null;
    PATHS[p].worlds.forEach((w, wi) => {
      let on = false;
      try {on = worldHasProgress(p, wi) || worldSkipped(p, wi)} catch (e) {}
      if (on && (g === null || w.g > g)) g = w.g;
    });
    return g;
  },
  data() {
    const today0 = today(), now = STRK.idx(today0);
    const m = {name: S.name || '', date: REP.dayText(now), year: new Date(now * 864e5).getUTCFullYear(), grade: gradeOf()};
    REP.keepLog(() => {
      m.cur = ACT.sum(today0, 7);
      m.prev = ACT.sum(ACT.shift(today0, -7), 7);
      const log = ACT.get();
      m.days = [];
      for (let k = 13; k >= 0; k--) {
        const key = ACT.shift(today0, -k), e = log.find(x => x.d === key);
        m.days.push({i: now - k, sec: e ? e.sec : 0});
      }
    });
    // subjects this week, biggest first
    m.by = Object.keys(m.cur.by).map(a => ({a, label: REP.AREA[a] || REP.AREA.other, sec: m.cur.by[a]})).sort((x, y) => y.sec - x.sec);
    // where the child is working, per path
    m.paths = Object.keys(PATHS).map(p => {
      const stops = NODES[p].filter(n => n.sk != 'boss').length;
      let done = 0;
      try {done = NODES[p].filter((n, i) => n.sk != 'boss' && passed(p, i)).length} catch (e) {}
      const o = {p, label: REP.AREA[p] || PATHS[p].n, stops, done, byLevel: !!PATHS[p].byLevel, g: null, world: ''};
      if (!o.byLevel) o.g = REP.working(p);
      try {
        if (done || o.g !== null) o.world = PATHS[p].worlds[curWorld(p)].n;
      } catch (e) {}
      return o;
    });
    // mastery, by strand; needs practice; recently mastered
    const strands = {}, tried = [], mastered = [];
    let any = 0;
    for (const p in PATHS) {
      for (const s of mastStops(p)) {
        const sk = NODES[p][s.i].sk, st = REP.strandOf(sk);
        const o = strands[st] || (strands[st] = {name: st, mastered: 0, practised: 0, learning: 0, new: 0, n: 0});
        o[s.state]++; o.n++;
        if (s.rec && s.rec.n) {
          any++;
          const item = {p, sk, lv: NODES[p][s.i].lv, t: s.t, label: REP.AREA[p] || '', n: s.rec.n, pr: s.rec.p, md: s.rec.md, state: s.state};
          tried.push(item);
          if (s.state == 'mastered' && s.rec.md >= 0) mastered.push(item);
        }
      }
    }
    const order = REP.STRANDS.map(x => x[0]).concat(['Other skills']);
    m.strands = Object.values(strands).sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
    m.tried = any;
    m.needs = tried.filter(x => x.n >= 5 && x.pr < .7).sort((a, b) => a.pr - b.pr || b.n - a.n).slice(0, 5).map(x => {
      const miss = (S.prog && S.prog[x.sk] && S.prog[x.sk].miss) || {}, ex = [];
      const all = Object.values(miss).filter(z => z && z.q && typeof z.q.label == 'string');
      // examples from this stop's level first, then any miss of the skill
      all.sort((a, b) => (b.q.lv == x.lv) - (a.q.lv == x.lv) || (b.tot | 0) - (a.tot | 0));
      for (const z of all) if (ex.length < 2) ex.push(z.q.label);
      return {...x, ex};
    });
    m.mastered = mastered.sort((a, b) => b.md - a.md).slice(0, 6).map(x => ({...x, when: REP.ago(x.md, now)}));
    m.masteredAll = mastered.length;
    // Fact Sprint bests
    const flu = (S.flu && typeof S.flu == 'object') ? S.flu : {};
    m.flu = FLU.SETS.map(s => ({t: s.t, b60: (flu[s.id] || {}).best, b20: (flu[s.id + '-20'] || {}).best}))
      .filter(x => x.b60 != null || x.b20 != null);
    // streak (read straight from S: STRK.get() would add defaults)
    const sk = S.streak && typeof S.streak == 'object' && !Array.isArray(S.streak) ? S.streak : {};
    const info = STRK.calc(sk.days && typeof sk.days == 'object' ? sk.days : {}, today0);
    m.streak = {count: info.count, doneToday: info.doneToday, best: Math.max(+sk.best > 0 ? +sk.best : 0, info.count)};
    return m;
  },
  // ---- HTML pieces ----
  chart(m) {
    const max = Math.max(10, ...m.days.map(d => Math.round(d.sec / 60))), W = 336, base = 100, top = 82;
    const L = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const bars = m.days.map((d, k) => {
      const mn = Math.round(d.sec / 60), h = d.sec > 0 ? Math.max(4, Math.round(mn / max * top)) : 0, x = k * 24 + 3, wk = (d.i + 4) % 7;
      return `<g class="${k < 7 ? 'rp-b0' : 'rp-b1'}">${h ? `<rect x="${x}" y="${base - h}" width="18" height="${h}" rx="4"/>` : `<rect class="z" x="${x}" y="${base - 2}" width="18" height="2"/>`}`
        + (d.sec > 0 ? `<text class="rp-v" x="${x + 9}" y="${base - h - 4}" text-anchor="middle">${REP.fmtMin(d.sec)}</text>` : '')
        + `<text class="rp-l${k == 13 ? ' now' : ''}" x="${x + 9}" y="118" text-anchor="middle">${L[wk]}</text></g>`;
    }).join('');
    const sum = m.days.map(d => REP.dayText(d.i) + ' ' + REP.fmtMin(d.sec) + ' minutes').join(', ');
    return `<svg class="rp-svg" viewBox="0 0 ${W} 124" role="img" aria-label="Minutes per day, last 14 days: ${esc(sum)}">`
      + `<line class="rp-div" x1="168" x2="168" y1="6" y2="104"/><line class="rp-base" x1="0" x2="${W}" y1="${base}" y2="${base}"/>${bars}</svg>`
      + `<div class="rp-wk"><span>Last week</span><span>This week</span></div>`;
  },
  weeks(m) {
    const c = m.cur, p = m.prev;
    if (!c.q && !c.sec && !p.q && !p.sec)
      return `<div class="rp-empty">No learning time recorded yet. Once ${esc(m.name || 'your child')} plays a round, minutes, rounds and accuracy appear here.</div>`;
    const cm = Math.round(c.sec / 60), pm = Math.round(p.sec / 60), d = cm - pm;
    const cmp = !p.sec ? 'Nothing was recorded in the week before.'
      : !c.sec ? 'Nothing recorded this week yet; last week was ' + pm + ' min.'
      : Math.abs(d) < 1 ? 'About the same time as last week.' : Math.abs(d) + ' min ' + (d > 0 ? 'more' : 'less') + ' than last week.';
    const cell = (h, a, b) => `<div class="rp-cell"><div class="rp-h">${h}</div><div class="rp-n">${a}</div><div class="small">${b}</div></div>`;
    const row = (lab, x) => `<div class="rp-wrow"><div class="rp-wl">${lab}</div>${cell('Minutes', REP.fmtMin(x.sec), 'learning')}${cell('Rounds', x.rounds, 'finished')}`
      + `${cell('Accuracy', REP.pct(x.ok, x.q), 'of ' + x.q)}${cell('Days', x.active, 'of 7 played')}</div>`;
    const acc = c.q ? c.ok / c.q : null;
    const tip = acc === null ? '' : acc >= .85 ? 'Most answers are right on the first try. A good time to try "Find my level" or a higher grade.'
      : acc < .6 ? 'Many questions needed a second try this week. Sitting beside them for a round or two can help; see Needs practice below.'
      : 'A steady week. Short, regular rounds help more than long ones.';
    return row('This week', c) + row('Last week', p) + `<p class="rp-p"><b>${cmp}</b>${tip ? ' ' + tip : ''}</p>`
      + `<h3 class="rp-h3">Minutes per day</h3>${REP.chart(m)}`
      + (m.by.length ? `<h3 class="rp-h3">This week by subject</h3>${m.by.map(b => `<div class="rp-sub"><span class="rp-sn">${esc(b.label)}</span>`
        + `<span class="rp-sbar"><i style="width:${Math.max(4, Math.round(b.sec / m.cur.sec * 100))}%"></i></span><span class="rp-sm">${REP.fmtMin(b.sec)} min</span></div>`).join('')}` : '');
  },
  level(m) {
    const gl = gradeLabel(m.grade);
    return m.paths.map(o => {
      const meta = `${o.done} of ${o.stops} stops passed`;
      if (o.byLevel)
        return `<div class="rp-path"><div class="rp-ph"><b>${esc(o.label)}</b><span class="small">${meta}</span></div>`
          + `<div class="rp-bar1" role="img" aria-label="${esc(o.label)}: ${meta}"><i style="width:${o.stops ? Math.round(o.done / o.stops * 100) : 0}%"></i></div>`
          + `<div class="small">${o.done ? '' : 'Not started yet. '}Spanish goes in order, not by grade.</div></div>`;
      let line;
      if (o.g === null) line = `Not started yet. The grade chosen is ${esc(gl)}.`;
      else {
        const d = o.g - m.grade, wl = gradeLabel(o.g);
        line = `Working at the <b>${esc(wl)}</b> level${o.world ? ' (' + esc(o.world) + ')' : ''}. `
          + (d == 0 ? 'That matches the grade chosen.' : d > 0 ? 'That is ' + (d == 1 ? 'one grade' : d + ' grades') + ' above the grade chosen (' + esc(gl) + ').'
          : 'That is ' + (d == -1 ? 'one grade' : -d + ' grades') + ' below the grade chosen (' + esc(gl) + '), a comfortable place to build confidence.');
      }
      const cells = GRADES.map(g => `<span class="rp-gc${o.g !== null && g <= o.g ? ' on' : ''}${g == m.grade ? ' pick' : ''}"><i></i><span>${esc(gradeLabel(g))}</span></span>`).join('');
      return `<div class="rp-path"><div class="rp-ph"><b>${esc(o.label)}</b><span class="small">${meta}</span></div><div class="rp-g">${cells}</div><div class="small">${line}</div></div>`;
    }).join('') + `<div class="small rp-key">Filled: where they are working. Outlined: the grade chosen in Grown-ups.</div>`;
  },
  strands(m) {
    if (!m.strands.length) return '<div class="rp-empty">Nothing to show yet.</div>';
    const seg = (cls, n) => n ? `<i class="${cls}" style="flex:${n}"></i>` : '';
    return m.strands.map(s => {
      const txt = [s.mastered + ' mastered', s.practised + ' practised', s.learning + ' learning', s.new + ' not started'].join(' · ');
      return `<div class="rp-st"><div class="rp-ph"><b>${esc(s.name)}</b><span class="small">${s.n} stop${s.n == 1 ? '' : 's'}</span></div>`
        + `<div class="rp-bar" role="img" aria-label="${esc(s.name)}: ${esc(txt)}">${seg('m', s.mastered)}${seg('p', s.practised)}${seg('l', s.learning)}${seg('n', s.new)}</div>`
        + `<div class="small">${txt}</div></div>`;
    }).join('') + `<div class="small rp-key">Mastered: 20 or more questions, 90% right on the first try, over 2 or more days. Practised: 10 or more questions, 70% right. `
      + `Learning: started. Not started: no questions yet.</div>`;
  },
  needs(m) {
    if (!m.tried) return '<div class="rp-empty">This list fills in after a few rounds.</div>';
    if (!m.needs.length) return '<div class="rp-empty">Nothing stands out. Every stop they have tried is going well.</div>';
    return `<p class="small rp-p0">The stops with the lowest first-try scores. Playing one again from the map is the best help.</p><ol class="rp-list">${m.needs.map(x => `<li><b>${esc(x.t)}</b> <span class="rp-tag">${esc(x.label)}</span>`
      + `<div class="small">${Math.round(x.pr * 100)}% right on the first try, over ${x.n} questions.</div>`
      + (x.ex.length ? `<div class="small">Examples they missed: ${x.ex.map(e => `<span class="rp-ex">${esc(e)}</span>`).join(' ')}</div>` : '') + '</li>').join('')}</ol>`;
  },
  recent(m) {
    if (!m.mastered.length) return '<div class="rp-empty">No stop is mastered yet. That takes 20 or more questions with 90% right on the first try, over at least 2 days, so it is normal to see nothing at first.</div>';
    return `<ul class="rp-list">${m.mastered.map(x => `<li><b>${esc(x.t)}</b> <span class="rp-tag">${esc(x.label)}</span> <span class="small">${esc(x.when)}</span></li>`).join('')}</ul>`
      + (m.masteredAll > m.mastered.length ? `<div class="small">${m.masteredAll} stops mastered in all.</div>` : '');
  },
  fluency(m) {
    if (!m.flu.length) return '<div class="rp-empty">No Fact Sprint scores yet.</div>';
    const v = (b, low) => b == null ? 'not yet' : low ? b + ' s' : b + ' right';
    return m.flu.map(x => `<div class="rp-fr"><b>${esc(x.t)}</b><span class="small">60 seconds: ${v(x.b60, false)}</span><span class="small">20 facts: ${v(x.b20, true)}</span></div>`).join('');
  },
  streak(m) {
    const s = m.streak, d = n => n + (n == 1 ? ' day' : ' days');
    return `<div class="rp-str">${ico('flame', 28, 'rp-fl')}<div><b>${s.count ? d(s.count) + ' in a row' : 'No streak right now'}</b>`
      + `<div class="small">${s.count ? (s.doneToday ? 'Played today.' : 'Not played yet today.') : 'A new one starts with the next round.'} Best so far: ${s.best ? d(s.best) : 'none yet'}.</div></div></div>`;
  },
  html(m) {
    const nm = m.name ? esc(m.name) : 'your child';
    const sec = (id, h, body) => `<section class="card rp-card" id="${id}"><h2 class="rp-h2">${h}</h2>${body}</section>`;
    return `<div class="rp-head"><div class="rp-t">Report card for ${nm}</div><div class="small">${esc(m.date)}, ${m.year} · grade ${esc(gradeLabel(m.grade))} · Star School</div></div>`
      + sec('rp-weeks', 'This week and last week', REP.weeks(m) + '<div class="small rp-key">A week is the last 7 days, ending today. Accuracy is the share of questions right on the first try. Only time with a question on screen counts.</div>')
      + sec('rp-level', 'Where ' + nm + ' is working', REP.level(m))
      + sec('rp-top', 'Skills by topic', REP.strands(m))
      + sec('rp-needs', 'Needs practice', REP.needs(m))
      + sec('rp-recent', 'Recently mastered', REP.recent(m))
      + sec('rp-flu', 'Fact Sprint bests', REP.fluency(m))
      + sec('rp-streak', 'Streak', REP.streak(m));
  },
};
function report() {
  let m;
  try {m = REP.data()} catch (e) {m = null}
  view(`<div class="top rp-noprint"><button class="btn sm" id="back" aria-label="Back">${ico('back', 20)}</button><div class="title">Report card</div>`
    + `<button class="btn sm" id="rp-print" style="margin-left:auto">Print</button></div>`
    + `<div class="rp-noprint rp-online">${onlineNote()}</div><div class="scroll rp-scroll">`
    + (m ? REP.html(m) : '<div class="card rp-empty">The report card could not be drawn.</div>') + `</div>`);
  $('#back').onclick = () => grown();
  // printing can still save a PDF offline, so offline only warns (needOnline block:false)
  $('#rp-print').onclick = () => needOnline(() => {try {window.print()} catch (e) {}}, {block: false});
}
/* Grown-ups entry (80-grown.js): one card with one button. */
function reportGrownHTML() {
  return `<div class="card rp-entry"><button class="btn sm" id="rp-open">${ico('chart', 22)} Report card</button>`
    + `<span class="small">Time, accuracy, where ${esc(S.name || 'your child')} is working, what to practise.</span></div>`;
}
function reportGrownBind() {
  $('#rp-open').onclick = () => report();
}
