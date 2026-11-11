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

function fluMenu() {
  const sets = FLU.sets();
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title">🔢 Fact Sprint</div></div>
  <div class="scroll"><p class="sub" style="text-align:center">Pick your facts. Beat your best!</p>
  <div class="games">${sets.map(s => `<button class="btn game" data-s="${s.id}" style="background:linear-gradient(135deg,#fef3c7,#fde68a)">
    <span class="ge">${s.e}</span><span class="gi"><span class="gt">${esc(s.t)}</span>
    <span class="small">60 s best: ${fluBest(s.id, false)} · 20 facts best: ${fluBest(s.id + '-20', true)}</span></span><span class="go">▶</span></button>`).join('')}</div></div>`);
  $('#back').onclick = () => home();
  $$('[data-s]').forEach(b => b.onclick = () => fluModes(b.dataset.s));
}

function fluModes(set) {
  const s = FLU.set(set);
  view(`<div class="top"><button class="btn sm" id="back">◀</button><div class="title">${s.e} ${esc(s.t)}</div></div>
  <div class="scroll"><div class="games">
   <button class="btn game" data-m="t60" style="background:linear-gradient(135deg,#fef3c7,#fde68a)"><span class="ge">⚡</span><span class="gi">
    <span class="gt">60 seconds</span><span class="small">How many can you get? Best: ${fluBest(set, false)}</span></span><span class="go">▶</span></button>
   <button class="btn game" data-m="n20" style="background:linear-gradient(135deg,#bbf7d0,#86efac)"><span class="ge">🏆</span><span class="gi">
    <span class="gt">20 facts</span><span class="small">Beat your time! Best: ${fluBest(set + '-20', true)}</span></span><span class="go">▶</span></button></div>
   <p class="small" style="text-align:center;margin-top:14px">A first sprint each day earns game time. 🎟️</p></div>`);
  $('#back').onclick = fluMenu;
  $$('[data-m]').forEach(b => b.onclick = () => fluPlay(set, b.dataset.m));
}

function fluPlay(set, mode) {
  stopFlu();
  const timed = mode != 'n20', key = FLU.key(set, mode);
  view(`<div class="top"><button class="btn sm" id="quit">✕</button><div class="prog"><div id="fbar" style="width:${timed ? 100 : 0}%;background:linear-gradient(90deg,#ef4444,#f59e0b)"></div></div>
   <div class="stars" id="fsc">${timed ? '⚡ 0' : '0 / ' + FLU.GOAL}</div><div class="stars" id="ftm">${timed ? '' : '0.0 s'}</div></div>
   <div class="play" id="fplay"></div>`);
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
     <div class="inp"><div class="pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button class="btn k" data-k="${n}">${n}</button>`).join('')}
     <button class="btn k del" data-k="del">⌫</button><button class="btn k" data-k="0">0</button><span></span></div></div>`;
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
      if (timed) {$('#fsc').textContent = '⚡ ' + FL.right; bump('#fsc')}
      else {
        $('#fsc').textContent = FL.right + ' / ' + FLU.GOAL;
        $('#fbar').style.width = FL.right / FLU.GOAL * 100 + '%';
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
    fb('Ready… GO! ⚡');
    SFX.fanfare();
    FL.clock.last = Date.now();
    show();
    FL.iv = setInterval(() => {
      if (!FL) return;
      const ms = FLU.tick(FL.clock, Date.now(), document.hidden), left = FLU.SECS - ms / 1000;
      if (timed) {
        $('#fbar').style.width = Math.max(0, left / FLU.SECS * 100) + '%';
        $('#ftm').textContent = Math.max(0, Math.ceil(left)) + ' s';
        if (left <= 5 && left > 0 && Math.ceil(left) != FL.beep) {FL.beep = Math.ceil(left); tone(880, .08, 0, 'square', .05)}
        if (left <= 0) finish();
      } else $('#ftm').textContent = fluSecs(ms) + ' s';
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
  const dots = pts.map((p, i) => p ? `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${i == 6 ? 5 : 3.5}" fill="${i == 6 ? '#f59e0b' : '#fff'}"/>` : '').join('');
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Your last 7 days"><polyline points="${line}" fill="none" stroke="#fff" stroke-width="2.5" stroke-linejoin="round" opacity=".7"/>${dots}</svg>`;
}

function fluEnd(r) {
  const lower = !r.timed, e = (S.flu || {})[r.key], bestNow = e && e.best;
  const title = r.timed ? `${r.right} in 60 seconds!` : `20 facts in ${r.sec} s!`;
  const sub = r.rec ? 'NEW RECORD! 🎉' : `Your best: ${lower ? bestNow + ' s' : bestNow}`;
  const o = document.createElement('div');
  o.className = 'ovl';
  o.innerHTML = `<div style="font-size:80px">${r.rec ? '🏆' : '⚡'}</div><h1>${esc(title)}</h1><h2>${sub}</h2>
    ${fluSpark(FLU.week(e, lower), lower)}<h2>${r.earned ? '🎟️ +' + r.earned / 60 + ' min' : 'Free practice, no game time'}</h2>
    <div class="rowh"><button class="btn big" id="fagain">Again</button><button class="btn" id="fsets">Sets</button><button class="btn" id="fhome">🏠 Home</button></div>`;
  document.body.appendChild(o);
  if (S.voice) say(r.rec ? 'New record!' : 'Good job!');
  o.querySelector('#fagain').onclick = () => {o.remove(); fluPlay(r.set, r.mode)};
  o.querySelector('#fsets').onclick = () => {o.remove(); fluMenu()};
  o.querySelector('#fhome').onclick = () => {o.remove(); home()};
}
