/* ---------- Fact Sprint (P5-01): 60 seconds or 20 facts, beat your best ---------- */
/* Saved in S.flu = {key: {best, hist: [[day, sec, right]] (last 30)}}.
   key is the set id ('add10') for the 60-second mode and set id + '-20' ('add10-20') for the 20-facts mode.
   best is the most right answers (60 s) or the fastest seconds (20 facts). Missing fields are read with defaults.
   S.flu[set].paid holds the day game time was last earned for that set. */
// Highest level (1-4) of a math skill the child has passed, 0 when none.
const fluLv = sk => [4, 3, 2, 1].find(l => passedAny('math', sk, l)) || 0;
const FLU = {
  GOAL: 20, SECS: 60, KEEP: 30, MIN_RIGHT: 5,
  // Sets. `ok` says whether the child has reached the matching skill; mul/div sets are added here later (P2-05).
  SETS: [
    {id: 'add10', e: '➕', t: 'Adding to 10', ok: () => true,
      gen: () => {const a = R(1, 9), b = R(1, 10 - a); return {a, op: '+', b, c: a + b}}},
    {id: 'sub10', e: '➖', t: 'Take away from 10', ok: () => passedAny('math', 'sub', 1),
      gen: () => {const a = R(2, 10), b = R(1, a); return {a, op: '−', b, c: a - b}}},
    {id: 'add20', e: '➕', t: 'Adding to 20', ok: () => passedAny('math', 'add', 2),
      gen: () => {const a = R(1, 10), b = R(Math.max(1, 11 - a), 10); return {a, op: '+', b, c: a + b}}},
    {id: 'sub20', e: '➖', t: 'Take away from 20', ok: () => passedAny('math', 'sub', 2),
      gen: () => {const a = R(11, 20), b = R(1, Math.min(10, a - 1)); return {a, op: '−', b, c: a - b}}},
    // Times and divide facts (P2-05). The facts grow with the highest level of the matching skill the child has passed.
    {id: 'mfact', e: '✖️', t: 'Times facts', ok: () => passedAny('math', 'mfact', 1),
      gen: () => {
        const l = fluLv('mfact'), keys = MF_KEYS.slice(0, Math.max(1, l)).flat();
        let a = l >= 4 ? R(0, 10) : pick(keys), b = R(0, 10);
        if (coin()) [a, b] = [b, a];
        return {a, op: '×', b, c: a * b};
      }},
    {id: 'dfact', e: '÷', t: 'Divide facts', ok: () => passedAny('math', 'dfact', 1),
      gen: () => {
        const l = fluLv('dfact'), d = l >= 4 ? R(1, 10) : pick(DF_KEYS.slice(0, Math.max(1, l)).flat()), q = R(1, 10);
        return {a: d * q, op: '÷', b: d, c: q};
      }},
  ],
  set: id => FLU.SETS.find(s => s.id == id),
  sets: () => FLU.SETS.filter(s => s.ok()),
  key: (set, mode) => mode == 'n20' ? set + '-20' : set,
  fkey: f => f.a + f.op + f.b,
  // Next fact for a sprint. st = {set, last, redo: [{f, wait}]}. A missed fact comes back after 3 other facts.
  // Never the same fact twice in a row.
  next: st => {
    st.redo.forEach(r => r.wait--);
    const i = st.redo.findIndex(r => r.wait <= 0 && FLU.fkey(r.f) != st.last);
    let f;
    if (i >= 0) f = st.redo.splice(i, 1)[0].f;
    else {
      const s = FLU.set(st.set);
      for (let t = 0; t < 40; t++) {f = s.gen(); if (FLU.fkey(f) != st.last) break}
    }
    st.last = FLU.fkey(f);
    return f;
  },
  miss: (st, f) => st.redo.push({f, wait: 4}),
  // Is v a new record? The first run always is; a tie is not.
  isRecord: (best, v, lower) => best == null || (lower ? v < best : v > best),
  // Store one finished sprint. Returns {rec, prev}.
  record: (flu, key, d, sec, right, lower) => {
    const e = flu[key] || (flu[key] = {best: null, hist: []});
    const v = lower ? sec : right, prev = e.best;
    const rec = FLU.isRecord(prev, v, lower);
    if (rec) e.best = v;
    e.hist = (e.hist || []).concat([[d, sec, right]]).slice(-FLU.KEEP);
    return {rec, prev};
  },
  // Game time in seconds: 1 min once per set per day, +1 min for any new record. A 60 s sprint needs MIN_RIGHT right answers.
  earn: (flu, set, d, rec, right, mode) => {
    if (mode != 'n20' && right < FLU.MIN_RIGHT) return 0;
    const base = flu[set] || (flu[set] = {best: null, hist: []});
    let t = 0;
    if (base.paid !== d) {t += 60; base.paid = d}
    if (rec) t += 60;
    return t;
  },
  // Pausing clock. Call with document.hidden; time spent hidden is not counted.
  tick: (c, now, hidden) => {
    if (!hidden) c.ms += now - c.last;
    c.last = now;
    return c.ms;
  },
  // Best value for each of the last 7 days (oldest first); null where the child did not play.
  week: (e, lower, now) => {
    const out = [];
    for (let i = 6; i >= 0; i--) {
      const dt = new Date(now || Date.now());
      dt.setDate(dt.getDate() - i);
      const k = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
      const v = ((e && e.hist) || []).filter(h => h[0] == k).map(h => lower ? h[1] : h[2]);
      out.push(v.length ? (lower ? Math.min(...v) : Math.max(...v)) : null);
    }
    return out;
  },
};

let FL = null; // the sprint being played
function stopFlu() {
  if (!FL) return;
  clearInterval(FL.iv);
  clearTimeout(FL.to);
  document.removeEventListener('visibilitychange', FL.vis);
  FL = null;
}
const fluSecs = ms => (Math.round(ms / 100) / 10).toFixed(1);
const fluBest = (key, lower) => {
  const b = ((S.flu || {})[key] || {}).best;
  return b == null ? 'not yet' : lower ? b + ' s' : '' + b;
};

// P4-18: drawn set badges (the sign of the facts, and 10 or 20 on a tag) instead of the set emoji
const fluIco = id => /^add/.test(id) ? 'plus' : /^sub/.test(id) ? 'minus' : /^mf/.test(id) ? 'times' : /^df/.test(id) ? 'divide' : 'bolt';
const fluTag = id => (/(10|20)$/.exec(id) || [])[1] || '';
// Top bar of the sprint menus: back, a math badge with the bolt, the title
const fluTop = (t, icon) => `<div class="top tbar gx-mtop s-math">${UI.ibtn('back', 'Back', { size: 'sm', id: 'back' })}` +
  `<div class="ttl gx-ttl"><span class="gx-tb">${ico(icon, 24)}</span><span>${esc(t)}</span></div></div>`;

function fluMenu() {
  const sets = FLU.sets();
  view(`${fluTop('Fact Sprint', 'bolt')}
  <div class="scroll gx-list"><p class="gx-lead">Pick your facts. Beat your best!</p>
  <div class="games">${sets.map(s => GFX.card({ cls: 'game', attrs: `data-s="${s.id}"`, p: 'math', icon: fluIco(s.id), tag: fluTag(s.id), title: s.t,
    sub: `<span class="gx-ln">${ico('timer', 18)}<span>60 s best: <b>${fluBest(s.id, false)}</b></span></span>` +
      `<span class="gx-ln">${ico('target', 18)}<span>20 facts best: <b>${fluBest(s.id + '-20', true)}</b></span></span>` })).join('')}</div></div>`);
  $('#back').onclick = () => home();
  $$('[data-s]').forEach(b => b.onclick = () => fluModes(b.dataset.s));
}

function fluModes(set) {
  const s = FLU.set(set);
  view(`${fluTop(s.t, fluIco(set))}
  <div class="scroll gx-list"><div class="games">
   ${GFX.card({ cls: 'game', attrs: 'data-m="t60"', p: 'play', icon: 'timer', title: '60 seconds', sub: `How many can you get? Best: <b>${fluBest(set, false)}</b>` })}
   ${GFX.card({ cls: 'game', attrs: 'data-m="n20"', p: 'es', icon: 'target', title: '20 facts', sub: `Beat your time! Best: <b>${fluBest(set + '-20', true)}</b>` })}</div>
   <p class="gx-note">${ico('ticket', 24)}<span>A first sprint each day earns game time.</span></p></div>`);
  $('#back').onclick = fluMenu;
  $$('[data-m]').forEach(b => b.onclick = () => fluPlay(set, b.dataset.m));
}

function fluPlay(set, mode) {
  stopFlu();
  const timed = mode != 'n20', key = FLU.key(set, mode);
  view(`${GFX.speedTop('math', 'fbar', timed ? 1 : 0, UI.chip('bolt', timed ? 0 : '0 / ' + FLU.GOAL, { id: 'fsc', aria: 'Right answers' }) +
    UI.chip('timer', timed ? '60 s' : '0.0 s', { id: 'ftm', aria: 'Time' }))}
   <div class="play qs s-math" id="fplay"></div>`);
  FL = {set, mode, key, timed, right: 0, typed: '', lock: true, clock: {ms: 0, last: Date.now()}, st: {set, last: '', redo: []}, f: null};
  $('#quit').onclick = () => {stopFlu(); fluModes(set)};
  FL.vis = () => {if (FL) FLU.tick(FL.clock, Date.now(), document.hidden)};
  document.addEventListener('visibilitychange', FL.vis);

  const show = () => {
    if (!FL) return;
    const f = FL.f = FLU.next(FL.st);
    FL.typed = '';
    FL.lock = false;
    $('#fplay').innerHTML = `<div class="qarea"><div class="prompt" id="prompt"><div class="eq">${f.a} ${f.op} ${f.b} = ${SLOT}</div></div></div>
     <div class="inp">${GFX.pad()}</div>`;
    fit();
    $$('.k').forEach(b => b.onclick = () => {
      if (!FL || FL.lock) return;
      const k = b.dataset.k, want = String(FL.f.c);
      if (k == 'del') FL.typed = FL.typed.slice(0, -1);
      else if (FL.typed.length < want.length) {FL.typed += k; SFX.key(+k)}
      $('#slot').textContent = FL.typed;
      if (FL.typed.length == want.length) answer(FL.typed == want); // auto-submit when the digit count matches
    });
  };

  const answer = ok => {
    FL.lock = true;
    const slot = $('#slot');
    if (ok) {
      FL.right++;
      SFX.right(FL.right % 10);
      slot.classList.add('ok');
      if (timed) UI.setChip($('#fsc'), FL.right);
      else {
        UI.setChip($('#fsc'), FL.right + ' / ' + FLU.GOAL);
        GFX.bar($('#fbar'), FL.right / FLU.GOAL);
      }
      if (!timed && FL.right >= FLU.GOAL) return finish();
      FL.to = setTimeout(show, 250);
    } else {
      SFX.wrong();
      FLU.miss(FL.st, FL.f);
      slot.textContent = FL.f.c;
      slot.className = 'slot rev'; // show the fact for 1 second, then it comes back a few facts later
      FL.to = setTimeout(show, 1000);
    }
  };

  const finish = () => {
    FLU.tick(FL.clock, Date.now(), document.hidden);
    const sec = timed ? FLU.SECS : Math.round(FL.clock.ms / 100) / 10, right = FL.right;
    stopFlu();
    S.flu = S.flu || {};
    const r = FLU.record(S.flu, key, today(), sec, right, !timed);
    actFlu(sec); // P5-05
    const rec = r.rec && (!timed || right > 0); // no fireworks for a first 60 s run of zero
    const earned = FLU.earn(S.flu, set, today(), rec, right, mode);
    if (earned) ptEarn(earned);
    save();
    rec ? (SFX.fanfare(), confetti(40)) : SFX.magic();
    fluEnd({set, mode, key, timed, sec, right, rec, earned});
  };

  // Clock counts only while the page is visible. It starts after a short "ready" beat.
  FL.to = setTimeout(() => {
    if (!FL) return;
    fb('Ready… GO!', 'zap');
    SFX.fanfare();
    FL.clock.last = Date.now();
    show();
    FL.iv = setInterval(() => {
      if (!FL) return;
      const ms = FLU.tick(FL.clock, Date.now(), document.hidden), left = FLU.SECS - ms / 1000;
      if (timed) {
        GFX.bar($('#fbar'), left / FLU.SECS);
        $('#ftm b').textContent = Math.max(0, Math.ceil(left)) + ' s';
        if (left <= 5 && left > 0 && Math.ceil(left) != FL.beep) {FL.beep = Math.ceil(left); tone(880, .08, 0, 'square', .05)}
        if (left <= 0) finish();
      } else $('#ftm b').textContent = fluSecs(ms) + ' s';
    }, 200);
  }, 300);
}

// Sparkline of the last 7 days: higher is always better (faster times are flipped).
function fluSpark(vals, lower) {
  const W = 168, H = 48, pad = 6, got = vals.filter(v => v != null);
  if (!got.length) return '';
  const lo = Math.min(...got), hi = Math.max(...got), span = hi - lo || 1;
  const pts = vals.map((v, i) => {
    if (v == null) return null;
    const t = (v - lo) / span, up = lower ? 1 - t : t;
    return [pad + i * (W - 2 * pad) / 6, H - pad - (got.length > 1 ? up : .5) * (H - 2 * pad)];
  });
  const line = pts.filter(Boolean).map(p => p.map(n => n.toFixed(1)).join(',')).join(' ');
  const dots = pts.map((p, i) => p ? `<circle class="${i == 6 ? 'gx-sn' : 'gx-sd'}" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${i == 6 ? 6 : 4}"/>` : '').join('');
  return `<svg class="gx-spark" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Your last 7 days"><polyline class="gx-sl" points="${line}"/>${dots}</svg>`;
}

function fluEnd(r) {
  const lower = !r.timed, e = (S.flu || {})[r.key], bestNow = e && e.best;
  const title = r.timed ? `${r.right} in 60 seconds!` : `20 facts in ${r.sec} s!`;
  const sp = fluSpark(FLU.week(e, lower), lower);
  const o = GFX.endCard({ rec: r.rec, title, best: `Your best: ${lower ? bestNow + ' s' : bestNow}`, extra: sp ? `<div class="gx-week">${sp}</div>` : '',
    earn: r.earned ? `${ico('ticket', 28)}<span>+${r.earned / 60} min of game time</span>` : '<span>Free practice, no game time</span>',
    btns: UI.btn('Again', { kind: 'primary', size: 'lg', wide: true, icon: 'replay', id: 'fagain' }) +
      `<div class="rw-two">${UI.btn('Sets', { icon: 'path-math', id: 'fsets' })}${UI.btn('Home', { icon: 'home', id: 'fhome' })}</div>` });
  document.body.appendChild(o);
  if (S.voice) say(r.rec ? 'New record!' : 'Good job!');
  o.querySelector('#fagain').onclick = () => {o.remove(); fluPlay(r.set, r.mode)};
  o.querySelector('#fsets').onclick = () => {o.remove(); fluMenu()};
  o.querySelector('#fhome').onclick = () => {o.remove(); home()};
}
