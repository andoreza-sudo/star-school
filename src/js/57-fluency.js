/* ---------- Fact Sprint (P5-01): the screens (part sprint) ----------
   RELA-SIZE: the lazy part sprint; Home, the Learn hub and the daily mission load it first (partThen('sprint', ...), 90-app.js).
   The sets and the rules (FLU), the sprint on screen (FL) and stopFlu are in 57a-flu.js (part gen): Home and the missions read
   FLU.on() at start, and view() calls stopFlu. */
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
  NAV.bar('learn');
  $('#back').onclick = () => NAV.back();
  $$('[data-s]').forEach(b => b.onclick = () => fluModes(b.dataset.s));
}

function fluModes(set) {
  const s = FLU.set(set);
  view(`${fluTop(s.t, fluIco(set))}
  <div class="scroll gx-list"><div class="games">
   ${GFX.card({ cls: 'game', attrs: 'data-m="t60"', p: 'play', icon: 'timer', title: '60 seconds', sub: `How many can you get? Best: <b>${fluBest(set, false)}</b>` })}
   ${GFX.card({ cls: 'game', attrs: 'data-m="n20"', p: 'es', icon: 'target', title: '20 facts', sub: `Beat your time! Best: <b>${fluBest(set + '-20', true)}</b>` })}</div>
   <p class="gx-note">${ico('ticket', 24)}<span>A first sprint each day earns game time.</span></p></div>`);
  NAV.bar('learn');
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
  // NAV-01: the corner house; the clock does not count while Go Home? is open
  NAV.wire('quit', {hold: on => {if (!FL) return; FLU.tick(FL.clock, Date.now(), document.hidden || !on); FL.held = on}, leave: stopFlu});
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
    const mis = MIS.pay(MIS.done({k: 'sprint'})); // P5-08
    save();
    rec ? (SFX.fanfare(), confetti(40)) : SFX.chime();
    fluEnd({set, mode, key, timed, sec, right, rec, earned, mis});
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
      const ms = FLU.tick(FL.clock, Date.now(), document.hidden || FL.held), left = FLU.SECS - ms / 1000;
      if (timed) {
        GFX.bar($('#fbar'), left / FLU.SECS);
        $('#ftm b').textContent = Math.max(0, Math.ceil(left)) + ' s';
        if (left <= 5 && left > 0 && Math.ceil(left) != FL.beep) {FL.beep = Math.ceil(left); SFX.tick()}
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
  const o = GFX.endCard({ rec: r.rec, title, best: `Your best: ${lower ? bestNow + ' s' : bestNow}`, extra: (sp ? `<div class="gx-week">${sp}</div>` : '') + (r.mis || ''),
    earn: r.earned ? `${ico('ticket', 28)}<span>+${r.earned / 60} min of game time</span>` : '<span>Free practice, no game time</span>',
    btns: NAV.end3({again: 'frepeat', home: 'fhome'}) }); // NAV-01
  document.body.appendChild(o);
  if (S.voice) say(r.rec ? 'New record!' : 'Good job!');
  o.querySelector('#frepeat').onclick = () => {o.remove(); fluPlay(r.set, r.mode)};
  o.querySelector('#fhome').onclick = () => {o.remove(); home()};
}
