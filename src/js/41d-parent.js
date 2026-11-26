/* ---------- PARENT-11 (BEST-APP roadmap item 11): the Parent corner of the report card (part gate) ----------
   For grown-ups only, behind the Grown-ups PIN: the first card of the report card (REP.html, 82-report.js) and the certificate screen.
     1. "This week {name} learned": minutes and days (S.log through ACT), the stops passed that were played in the last 7 days
        (S.mast last + the stop's stars), the lessons finished (S.lm day), the skills that got stronger (S.mast md: mastered;
        S.chk b: a check-in badge won). Built from what the app already keeps; nothing new is saved.
     2. Two questions to ask at dinner (PCQ, below), from the skills of the stops played this week: the two groups with the most
        stops played (the most recent first on a tie), one question each (two from one group when only one was played), the
        question of the week (the same all week, another the next week), in the child's grade when the group has one for it.
     3. A one-page certificate to print (PC.cert): the child's first name, the stops passed in each subject, the lessons and the
        stops mastered so far, the date and the logo. The tablet's own print, with this part's print rules (41d-parent.css): only the
        certificate is printed, on one landscape page. Nothing leaves the tablet.
   The words (PCW, PCQ) are drafts the owner reads in docs/drafts/PARENT11-READ.md: the corner shows only when that file's status
   line says "reviewed <name> <date>" (PARENT_ON, 82a-parenton.js, built by tools/build.py). Read only: never changes S, never saves. */
const PCW = {
  h: 'Parent corner',
  intro: 'Talk with {name} about the week for a few minutes. Everything here stays on this tablet.',
  wkH: 'This week {name} learned',
  time: 'Time: {min} on {days} of the last 7 days.',
  min: '{n} minutes', min1: '1 minute', min0: 'less than a minute',
  passed: 'Stops passed: {list}.',
  lessons: 'Lessons with {pet}: {list}.',
  stronger: 'Skills that got stronger: {list}.',
  none: 'Nothing was played in the last 7 days. This fills in after a round or a lesson.',
  wkKey: 'A stop counts when it is passed and was played in the last 7 days. A skill got stronger when its stop was mastered or won a check-in badge.',
  and: '{a} and {b}', more: '{n} more',
  dH: 'Two questions for dinner',
  dSub: 'Picked from what {name} played this week. It is a chat, not a test.',
  from: 'From this week: {stop}',
  dNone: 'The questions appear after a week with some play.',
  cH: 'A certificate to print',
  cSub: 'One page with what {name} has done so far.',
  cBtn: 'Make a certificate',
  cNone: 'The certificate is ready once {name} passes a first stop.',
  cScreen: 'Certificate',
  cTitle: 'Certificate of Learning',
  cTo: 'This certificate is presented to',
  cFor: 'for learning and practicing with Whistlestop',
  cStops: 'Passed {n} stops in {area}', cStop1: 'Passed 1 stop in {area}',
  cLessons: 'Finished {n} lessons with {pet}', cLesson1: 'Finished 1 lesson with {pet}',
  cMast: 'Mastered {n} skills', cMast1: 'Mastered 1 skill',
  cDate: 'Date', cSign: 'Signed',
  cName: 'Name',
};
/* The dinner questions, by skill group: sk lists the skills (a "path:skill" entry for a skill on two maps), q the questions as
   [text, lowest grade, highest grade] (-1 Pre-K, 0 K). Every Spanish skill that no group names is in the group of es words. */
const PCQ = [
  {id: 'count', p: 'math', sk: 'pk_count pk_num pk_more cnt tenf eo cmp math:trace', q: [
    ['How many forks are on the table? Can you count them for me?', -1, 1],
    ['Are there more cups or more plates on the table? How can we tell?', -1, 1],
    ['Is the number of people at the table even or odd? How do you know?', 0, 3],
    ['Can we count by 10s together, all the way to 100?', 0, 2]]},
  {id: 'pv', p: 'math', sk: 'pv round', q: [
    ['What is the biggest number you can say? What number comes right after it?', 1, 6],
    ['If dinner cost 47 dollars, is that closer to 40 dollars or 50 dollars?', 2, 6]]},
  {id: 'add', p: 'math', sk: 'add miss sub big', q: [
    ['If 4 people sit down to eat and 2 friends join them, how many plates do we need?', -1, 2],
    ['If you have 7 grapes and eat 3, how many are left?', 0, 2],
    ['What is 9 + 6? How did you work it out in your head?', 1, 3],
    ['A bag has 25 cherries and we eat 8. How many are left?', 2, 5]]},
  {id: 'story', p: 'math', sk: 'story', q: [
    ['Can you make up a story problem about our dinner for me to solve?', 0, 6],
    ['We have 3 bowls with 5 strawberries in each. How many strawberries is that?', 2, 6]]},
  {id: 'mult', p: 'math', sk: 'mult arr mfact dfact mbig dbig fact', q: [
    ['Everyone at the table has 2 hands. How many hands are at the table?', 2, 4],
    ['We have 12 cookies to share equally among 4 people. How many does each person get?', 2, 6],
    ['An egg box holds 6 eggs. How many eggs are in 3 boxes?', 2, 6],
    ['Can you find a number of cookies that 2, 3 or 4 people could share equally?', 3, 6]]},
  {id: 'frac', p: 'math', sk: 'frac fop dec', q: [
    ['If we cut a pizza into 4 equal slices and you eat 1, what fraction did you eat?', 1, 6],
    ['Would you rather have half of a sandwich or a quarter of it? Why?', 1, 4],
    ['Is three quarters of a glass of water more or less than half a glass?', 3, 6],
    ['Milk costs 2 dollars and 50 cents. How would you write that with a decimal point?', 4, 6]]},
  {id: 'alg', p: 'math', sk: 'pat ooo alg ratio int', q: [
    ['Can you make a pattern with things on the table, like fork, spoon, fork, spoon? What comes next?', -1, 2],
    ['I am thinking of a number. I add 5 and get 12. What is my number?', 2, 6],
    ['If 2 bottles of juice cost 6 dollars, how much do 4 bottles cost?', 4, 6],
    ['It is 3 degrees outside and it gets 5 degrees colder. What is the temperature now?', 5, 6]]},
  {id: 'meas', p: 'math', sk: 'meas data', q: [
    ['Which is longer, a spoon or a fork? How could we check?', -1, 2],
    ['About how many spoons long is the table? Shall we guess first?', 0, 3],
    ['If we asked everyone at the table for their favorite food, how could we show the answers in a picture?', 1, 6]]},
  {id: 'time', p: 'math', sk: 'time coins', q: [
    ['What time do you think it is now? How could we check?', 1, 6],
    ["If dinner starts at 6 o'clock and lasts half an hour, what time does it end?", 1, 5],
    ['Which coins could you use to make 25 cents?', 1, 4],
    ['Something costs 75 cents and you pay with a dollar. How much change do you get?', 2, 5]]},
  {id: 'geo', p: 'math', sk: 'shape sort pos geo ang coord', q: [
    ['What shapes can you see on the table?', -1, 3],
    ['What is next to your cup? What is under your plate?', -1, 1],
    ['Can you find a square corner on the table? What else has one?', 2, 6],
    ['How could we measure the distance all the way around the table?', 3, 6]]},
  {id: 'phon', p: 'read', sk: 'abc sound rhyme syl pic build read:trace', q: [
    ['What sound does "cup" start with? Can you find something else on the table that starts with that sound?', -1, 1],
    ['Can you think of a word that rhymes with "spoon"?', -1, 2],
    ['How many claps are in "spaghetti"? Shall we clap it together?', -1, 2],
    ['What letter does your name start with? Who else do we know whose name starts with it?', -1, 1]]},
  {id: 'spell', p: 'read', sk: 'sight spell', q: [
    ['Can you find a word you know on a box or a jar in the kitchen?', 0, 2],
    ['Can you spell "plate" out loud?', 1, 3],
    ['Which word do you think is the hardest to spell? How do you remember it?', 2, 6]]},
  {id: 'gram', p: 'read', sk: 'gram sent', q: [
    ['Can you say a whole sentence about your dinner, like "I like the rice"?', 0, 1],
    ['Can you tell me one sentence about your day that uses the word "because"?', 1, 6],
    ['What is one action word for what we are doing right now?', 1, 4],
    ['If you wrote "we ate dinner" as a sentence, how would it start and how would it end?', 1, 3]]},
  {id: 'vocab', p: 'read', sk: 'vocab', q: [
    ['What is the opposite of "hot"? Is there something hot and something cold on the table?', 0, 3],
    ['Can you think of another word for "yummy"?', 1, 6],
    ['What does "I could eat a horse" mean? Does it really mean that?', 3, 6]]},
  {id: 'comp', p: 'read', sk: 'comp info', q: [
    ['Who was in a story you read this week, and what happened to them?', 1, 6],
    ['What was the best part of something you read this week? Why?', 1, 6],
    ['What is one new fact you learned from your reading this week?', 2, 6]]},
  {id: 'esw', p: 'es', sk: '', q: [
    ['Can you teach me one Spanish word you learned this week?', -1, 6],
    ['How do you say "hello" and "thank you" in Spanish?', -1, 6],
    ['Can we count to 5 in Spanish together?', -1, 6],
    ['Can you name something on the table in Spanish?', -1, 6]]},
  {id: 'ess', p: 'es', sk: 'es_phrase es_art es_ser es_gusta es_sent es_story', q: [
    ['Can you tell me in Spanish one food you like? It starts with "Me gusta".', -1, 6],
    ['Can you teach me one Spanish sentence from this week?', -1, 6],
    ['How would you ask "How are you?" in Spanish?', -1, 6]]},
  {id: 'life', p: 'disc', sk: 'sci_life', q: [
    ['Which food on the table came from a plant, and which came from an animal?', 0, 6],
    ['What does a plant need to grow?', 0, 3],
    ['Can you name an animal that eats plants and one that eats other animals?', 2, 6]]},
  {id: 'earth', p: 'disc', sk: 'sci_earth', q: [
    ['Is the Moon out tonight? What shape do you think it will be?', 0, 6],
    ['Where do you think rain comes from?', 0, 4],
    ['Why do you think we have day and night?', 3, 6]]},
  {id: 'phys', p: 'disc', sk: 'sci_phys', q: [
    ['Can you name something you push and something you pull?', 0, 3],
    ['What happens to an ice cube in a warm drink? Why?', 0, 6],
    ['What makes a rolling ball slow down and stop?', 3, 6]]},
  {id: 'place', p: 'disc', sk: 'geo_world geo_us', q: [
    ['Can you tell me how to get from here to your school, like a map in words?', 0, 3],
    ['If you could visit any country, which one would you pick? What do you know about it?', 0, 6],
    ['What state do we live in? Do you know its capital city?', 3, 6]]},
  {id: 'civ', p: 'disc', sk: 'civ', q: [
    ['Who are some helpers in our town? How do they help us?', 0, 4],
    ['Why do you think we have rules, like stopping at a red light?', 0, 6],
    ['If you were in charge of our town for a day, what is one thing you would do?', 3, 6]]},
];
const PC = {
  MONTH: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  SHOW: 4, // titles listed in one line before "and N more"
  fill: (t, o) => t.replace(/\{(\w+)\}/g, (m, k) => (k in o ? o[k] : m)),
  // "A", "A and B", "A, B and C", "A, B, C, D and 3 more" (the items are already HTML)
  list(a) {
    if (a.length > PC.SHOW) a = a.slice(0, PC.SHOW).concat([PC.fill(PCW.more, {n: a.length - PC.SHOW})]);
    return a.length < 2 ? a.join('') : PC.fill(PCW.and, {a: a.slice(0, -1).join(', '), b: a[a.length - 1]});
  },
  // the dinner group of a skill on a path, or null
  group(p, sk) {
    return PCQ.find(g => g.sk.split(' ').some(x => x == sk || x == p + ':' + sk)) || (/^es_/.test(sk) ? PCQ.find(g => g.id == 'esw') : null);
  },
  // the first map stop with this id, as {p, i, nd}, or null
  stop(id) {
    for (const p in NODES) {
      const i = NODES[p].findIndex(n => n.sk != 'boss' && nid(n) == id);
      if (i >= 0) return {p, i, nd: NODES[p][i]};
    }
    return null;
  },
  // the dinner questions of the week: [{q, t (the stop), g (group id)}], at most 2
  dinner(stops, wk, grade) {
    const gs = [];
    for (const x of stops) {
      const g = PC.group(x.p, x.sk);
      if (!g) continue;
      const o = gs.find(y => y.g == g) || (gs[gs.length] = {g, n: 0, last: x.last, t: x.t});
      o.n++;
    }
    gs.sort((a, b) => b.n - a.n || b.last - a.last); // stable: the most recent stop first on a tie (stops come most recent first)
    const pick = (g, k) => {const qs = g.q.filter(q => grade >= q[1] && grade <= q[2]), all = qs.length ? qs : g.q; return all[(wk + k) % all.length][0]};
    if (!gs.length) return [];
    if (gs.length == 1) {
      const a = pick(gs[0].g, 0), b = pick(gs[0].g, 1);
      return [{q: a, t: gs[0].t, g: gs[0].g.id}].concat(b != a ? [{q: b, t: gs[0].t, g: gs[0].g.id}] : []);
    }
    return gs.slice(0, 2).map(o => ({q: pick(o.g, 0), t: o.t, g: o.g.id}));
  },
  // everything the corner and the certificate show, from the save (read only); now: today's day number (tests give another day)
  data(now = mastDay()) {
    const lo = now - 6, wk = (d) => Number.isFinite(+d) && +d >= lo && +d <= now;
    let pet = '';
    try {pet = petN()} catch (e) {}
    const d = {name: String(S.name || '').trim(), pet, now, date: '', grade: gradeOf(), worked: [], passed: [], stronger: [], lessons: [], areas: [], lessonsAll: 0, mastAll: 0};
    const dt = new Date(now * 864e5);
    d.date = PC.MONTH[dt.getUTCMonth()] + ' ' + dt.getUTCDate() + ', ' + dt.getUTCFullYear();
    REP.keepLog(() => {d.cur = ACT.sum(STRK.key(now), 7)});
    const seen = {};
    for (const p in PATHS) {
      let n = 0;
      try {n = NODES[p].filter((x, i) => x.sk != 'boss' && passed(p, i)).length} catch (e) {}
      d.areas.push({p, label: REP.AREA[p] || PATHS[p].n, n});
      for (const s of mastStops(p)) {
        const nd = NODES[p][s.i], r = s.rec && typeof s.rec == 'object' ? s.rec : null;
        let ps = false;
        try {ps = passed(p, s.i)} catch (e) {}
        if (s.state == 'mastered') d.mastAll++;
        const it = {p, sk: nd.sk, lv: nd.lv, t: nd.t, id: s.nid, last: r ? +r.last : -1};
        if (r && +r.n > 0 && wk(r.last)) {d.worked.push(it); if (ps) d.passed.push(it)}
        const c = typeof CHK != 'undefined' ? CHK.rec(s.nid) : null;
        if (!seen[s.nid] && ((r && +r.md >= 0 && wk(r.md)) || (c && CHK.won(c) && wk(c.b)))) {seen[s.nid] = 1; d.stronger.push(it)}
      }
    }
    // lessons finished this week (S.lm: [id, day, ...]), newest first, one line per lesson stop
    const lm = Array.isArray(S.lm) ? S.lm : [], ls = {};
    for (let k = lm.length - 1; k >= 0; k--) {
      const x = lm[k];
      if (!Array.isArray(x) || !wk(x[1]) || ls[x[0]]) continue;
      const st = PC.stop(String(x[0]));
      if (!st) continue;
      ls[x[0]] = 1;
      d.lessons.push({p: st.p, sk: st.nd.sk, lv: st.nd.lv, t: st.nd.t, id: String(x[0]), last: +x[1]});
    }
    const kn = S.know && typeof S.know == 'object' && !Array.isArray(S.know) ? S.know : {};
    d.lessonsAll = Object.keys(kn).filter(k => kn[k] && +kn[k].s >= 1).length;
    const recent = (a, b) => b.last - a.last;
    d.worked.sort(recent); d.passed.sort(recent); d.stronger.sort(recent);
    // the dinner questions: from the stops played this week and the lessons' stops
    const all = d.worked.concat(d.lessons.filter(x => !d.worked.some(y => y.id == x.id))).sort(recent);
    d.dinner = PC.dinner(all, Math.floor(now / 7), d.grade);
    d.any = !!(d.worked.length || d.lessons.length || (d.cur && d.cur.sec));
    d.passedAll = d.areas.reduce((t, a) => t + a.n, 0);
    return d;
  },
  minutes(sec) {
    const n = Math.round(sec / 60);
    return sec < 60 ? PCW.min0 : n == 1 ? PCW.min1 : PC.fill(PCW.min, {n});
  },
  // the corner's body (the card and its heading are REP.html's)
  html(d) {
    const nm = esc(d.name || 'your child'), Nm = esc(d.name || 'Your child'), b = t => `<b>${esc(t)}</b>`;
    const li = [];
    if (d.cur && d.cur.sec) li.push(PC.fill(PCW.time, {min: PC.minutes(d.cur.sec), days: d.cur.active}));
    if (d.passed.length) li.push(PC.fill(PCW.passed, {list: PC.list(d.passed.map(x => b(x.t)))}));
    if (d.lessons.length) li.push(PC.fill(PCW.lessons, {pet: esc(d.pet), list: PC.list(d.lessons.map(x => b(x.t)))}));
    if (d.stronger.length) li.push(PC.fill(PCW.stronger, {list: PC.list(d.stronger.map(x => b(x.t)))}));
    return `<p class="small rp-p0">${PC.fill(PCW.intro, {name: nm})}</p>`
      + `<h3 class="rp-h3">${PC.fill(PCW.wkH, {name: Nm})}</h3>`
      + (d.any && li.length ? `<ul class="pc-wk">${li.map(x => `<li>${x}</li>`).join('')}</ul><div class="small rp-key">${esc(PCW.wkKey)}</div>`
        : `<div class="rp-empty">${esc(PCW.none)}</div>`)
      + `<h3 class="rp-h3">${ico('food', 22)} ${esc(PCW.dH)}</h3>`
      + (d.dinner.length ? `<p class="small rp-p0">${PC.fill(PCW.dSub, {name: nm})}</p><ol class="pc-dq">${d.dinner.map(x => `<li data-g="${x.g}">`
        + `<p class="pc-q">${esc(x.q)}</p><span class="rp-tag">${esc(PC.fill(PCW.from, {stop: x.t}))}</span></li>`).join('')}</ol>`
        : `<div class="rp-empty">${esc(PCW.dNone)}</div>`)
      + `<h3 class="rp-h3">${ico('medal', 22)} ${esc(PCW.cH)}</h3>`
      + (d.passedAll ? `<p class="small rp-p0">${PC.fill(PCW.cSub, {name: nm})}</p>`
        + `<div class="rp-noprint">${UI.btn(PCW.cBtn, {kind: 'primary', size: 'sm', icon: 'medal', id: 'pc-cert'})}</div>`
        : `<div class="rp-empty">${PC.fill(PCW.cNone, {name: nm})}</div>`);
  },
  bind() {
    const b = $('#pc-cert');
    if (b) b.onclick = () => PC.cert();
  },
  // the certificate's lines: passed stops per subject (the ones with any), lessons, mastered
  lines(d) {
    const out = d.areas.filter(a => a.n > 0).map(a => ({p: a.p, t: PC.fill(a.n == 1 ? PCW.cStop1 : PCW.cStops, {n: a.n, area: a.label})}));
    if (d.lessonsAll) out.push({p: 'ls', t: PC.fill(d.lessonsAll == 1 ? PCW.cLesson1 : PCW.cLessons, {n: d.lessonsAll, pet: d.pet})});
    if (d.mastAll) out.push({p: 'ms', t: d.mastAll == 1 ? PCW.cMast1 : PC.fill(PCW.cMast, {n: d.mastAll})});
    return out;
  },
  // original art: a rosette (a 16-point star, two rings and two ribbon tails), colour tokens only
  ROSETTE: '<svg class="pc-ros" viewBox="0 0 100 120" aria-hidden="true">'
    + '<path class="pc-r-t1" d="M30 62L18 112l16-9 10 15 10-48z"/><path class="pc-r-t2" d="M70 62l12 50-16-9-10 15-10-48z"/>'
    + '<path class="pc-r-s" d="' + Array.from({length: 32}, (_, k) => {const a = Math.PI * k / 16, r = k % 2 ? 38 : 46; return (k ? 'L' : 'M') + (50 + r * Math.sin(a)).toFixed(1) + ' ' + (48 - r * Math.cos(a)).toFixed(1)}).join('') + 'z"/>'
    + '<circle class="pc-r-c1" cx="50" cy="48" r="32"/><circle class="pc-r-c2" cx="50" cy="48" r="25"/>'
    + '<path class="pc-r-st" d="M50 31l5 10.4 11.4 1.4-8.4 7.9 2.2 11.3L50 56.5 39.8 62l2.2-11.3-8.4-7.9 11.4-1.4z"/></svg>',
  certHTML(d) {
    const ln = PC.lines(d);
    return `<article class="pc-sheet" id="pc-sheet" aria-labelledby="pc-ct"><div class="pc-in">`
      + `<div class="pc-logo">${UI.logo('pc-wl')}</div>`
      + `<h2 class="pc-ct" id="pc-ct">${esc(PCW.cTitle)}</h2>`
      + `<p class="pc-to">${esc(PCW.cTo)}</p>`
      + (d.name ? `<p class="pc-nm">${esc(d.name)}</p>` : `<p class="pc-nm pc-blank" aria-label="${esc(PCW.cName)}"></p>`)
      + `<p class="pc-for">${esc(PCW.cFor)}</p>`
      + `<ul class="pc-ach">${ln.map(x => `<li class="pc-a-${x.p}"><i aria-hidden="true"></i>${esc(x.t)}</li>`).join('')}</ul>`
      + `<div class="pc-foot"><div class="pc-f"><span class="pc-fv">${esc(d.date)}</span><span class="pc-fl">${esc(PCW.cDate)}</span></div>`
      + PC.ROSETTE
      + `<div class="pc-f"><span class="pc-fv pc-sig"></span><span class="pc-fl">${esc(PCW.cSign)}</span></div></div>`
      + `</div></article>`;
  },
  cert() {
    let d = null;
    try {d = PC.data()} catch (e) {logErr('certificate: ' + e.message)}
    NAV.gwK = 1; // a grown-up screen: the grown-up session goes on
    view(`<div class="top tbar adult gw-top rp-noprint">${UI.ibtn('back', 'Back', {size: 'sm', id: 'back'})}`
      + `<div class="ttl gx-ttl"><span class="gx-tb gw-tb">${ico('medal', 24)}</span><span>${esc(PCW.cScreen)}</span></div>`
      + `${UI.btn('Print', {size: 'sm', icon: 'doc', id: 'pc-print'})}</div>`
      + `<div class="rp-noprint rp-online">${onlineNote()}</div><div class="scroll pc-cv gw">`
      + (d ? PC.certHTML(d) : '<div class="gw-card rp-empty">The report card could not be drawn.</div>') + `</div>`);
    $('#back').onclick = () => report();
    // printing can still save a PDF offline, so offline only warns (needOnline block:false); nothing is sent anywhere
    $('#pc-print').onclick = () => needOnline(() => {try {window.print()} catch (e) {}}, {block: false});
  },
};
