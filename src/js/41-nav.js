/* ---------- NAV-01: one way Home (CSS src/css/11-nav.css) ----------
   Parents said children got lost. The rules every screen follows:
   - Hub screens (Home, Learn, the maps, the Game Room and the game menus, Brain Teasers, Pet Care, the Pet Shop, the sticker book
     and the other menus) end with the picture bar, NAV.bar(cur) after view(): Home first, then Learn, Games, Puzzles, My Pet. The
     button of the screen's own area is lit (aria-current="page"). view() replaces #app, so play screens never show it.
   - Activity screens (question rounds, games, puzzles, sprints, the bonus game) have the house in the top-left corner,
     NAV.house(id). It pauses the activity and asks "Go Home?" (NAV.ask): the tick goes Home, "Keep playing" goes on. Nothing the
     child earned is lost: leaving runs the activity's own quit (which saves) before home().
   - Back is an arrow (ico 'back', aria-label "Back") and goes one step back; Home is the house (aria-label "Home") and goes all
     the way Home. Nothing else uses the house.
   - Every end card ends with the same three choices, NAV.end3(): Play again, Next (hidden when there is no next), Home.
   - Grown-ups on Home is a labelled button held for 3 seconds (a ring fills), or a times-table question for a tap (NAV.gate). */
const NAV = {
  HOLD_MS: 3000,
  mapFrom: 'home', // where a map's Back arrow goes: 'home' or 'learn' (the screen the child came from)
  held: false, // the Go Home? sheet is open
  // the bar's buttons: [id, icon, label, open]
  tabs() {
    const t = [['home', 'home', 'Home', () => home()], ['learn', 'map', 'Learn', () => learnHub()], ['games', 'gamepad', 'Games', () => gameRoom()]];
    if (typeof BT != 'undefined' && BT.list().length) t.push(['puzzles', 'puzzle', 'Puzzles', () => BT.hub()]);
    t.push(['pet', 'paw', 'My Pet', () => care()]);
    return t;
  },
  barHTML(cur) {
    return `<nav class="navbar" id="navbar" aria-label="Main">${NAV.tabs().map(([id, icon, label]) => {
      const on = id == cur;
      return `<button class="nb nb-${id}${on ? ' on' : ''}" data-nav="${id}"${on ? ' aria-current="page"' : ''}>` +
        `<span class="nb-i">${ico(icon, 30)}</span><span class="nb-t">${UI.t(label)}</span></button>`;
    }).join('')}</nav>`;
  },
  // after view() on a hub screen: add the bar at the end of the screen (in the page's flow, so it never covers the content)
  bar(cur = '') {
    const a = typeof document.getElementById == 'function' ? document.getElementById('app') : $('#app');
    if (!a || !a.querySelector || !a.insertAdjacentHTML || a.querySelector('#navbar')) return; // (the tests' stand-in page has no #app)
    a.insertAdjacentHTML('beforeend', NAV.barHTML(cur));
    for (const b of a.querySelectorAll('#navbar [data-nav]')) {
      b.onclick = () => {
        const t = NAV.tabs().find(x => x[0] == b.dataset.nav);
        if (!t) return;
        SFX.whoosh();
        if (S.voice) say(t[2]);
        t[3]();
      };
    }
  },

  // Back from a screen that Home and Learn both open (a map, Fact Race, Fact Sprint): one step back, to the one it came from
  back() { return NAV.mapFrom == 'learn' ? learnHub() : home(); },
  // the corner house of an activity screen (top-left; same look everywhere)
  house(id = 'quit') {
    return UI.ibtn('home', 'Home', { size: 'sm', id, cls: 'nv-house' });
  },
  // "Go Home?": o.hold(true|false) pauses and resumes the activity; o.leave() is the activity's own quit (it saves), then Home.
  // Escape, a tap on the backdrop and "Keep playing" resume.
  ask(o = {}) {
    if (NAV.held) return null;
    NAV.held = true;
    if (typeof GH != 'undefined') GH.held = true; // the game-time clock and the games hold while it is open (64-gtimer.js)
    if (o.hold) o.hold(true);
    let gone = false;
    const s = UI.sheet(`<div class="nv-ask"><span class="nv-ah" aria-hidden="true">${ico('home', 56)}</span><h2>Go Home?</h2>` +
      `<div class="nv-two"><button class="btn primary lg nv-yes" id="gquit" aria-label="Yes, go Home">${ico('check', 44)}<span>Home</span></button>` +
      `<button class="btn soft lg nv-no" id="gresume">${ico('play', 44)}<span>Keep playing</span></button></div></div>`, {
      onClose: () => {
        NAV.held = false;
        if (typeof GH != 'undefined') GH.held = false;
        if (!gone && o.hold) o.hold(false);
      },
    });
    if (S.voice) say('Go Home?');
    s.el.querySelector('#gresume').onclick = () => { SFX.pop(2); s.close(); };
    s.el.querySelector('#gquit').onclick = () => {
      gone = true;
      s.close();
      SFX.whoosh();
      NAV.leave(o.leave);
    };
    return s;
  },
  // run an activity's own quit (saves, stops its clocks), close any card it left over the page, then Home
  leave(quit) {
    try { if (quit) quit(); } catch (e) { if (typeof logErr == 'function') logErr('nav leave: ' + e.message); }
    for (const e of document.querySelectorAll('body > .ovl')) e.remove();
    home();
  },
  // wire a corner house: el or #id; o as for ask()
  wire(el, o) {
    const b = typeof el == 'string' ? $('#' + el) : el;
    if (b) b.onclick = () => NAV.ask(o);
  },

  // The three choices of every end card, in this order: Play again, Next, Home. o: {again: id or '' (hidden), next: id or ''
  // (hidden when nothing comes next), home: id, extra: html of a smaller choice above them (a bonus game)}
  end3(o = {}) {
    const b = (id, cls, icon, label, main) => `<button class="btn ${main ? 'primary' : 'soft'} nv-eb ${cls}" id="${id}" data-go="${cls.slice(2)}">` +
      `<span class="nv-ei">${ico(icon, 36)}</span><span>${UI.t(label)}</span></button>`;
    const main = o.next ? 'next' : 'again';
    return (o.extra ? `<div class="nv-extra">${o.extra}</div>` : '') + `<div class="nv-end3">` +
      (o.again ? b(o.again, 'e-again', 'replay', 'Play again', main == 'again') : '') +
      (o.next ? b(o.next, 'e-next', 'arrow-right', 'Next', main == 'next') : '') +
      b(o.home || 'ehome', 'e-home', 'home', 'Home', !o.again && !o.next) + '</div>';
  },

  // ---- Grown-ups gate (Home): hold the button 3 seconds (the ring fills), or a tap opens a times-table question ----
  gateHTML() {
    return `<button class="btn soft sm nv-gw" id="gear" aria-label="Grown-ups: hold for 3 seconds"><span class="nv-ring" aria-hidden="true">` +
      `<svg class="nv-rs" viewBox="0 0 36 36" aria-hidden="true" focusable="false"><circle class="nv-rt" cx="18" cy="18" r="15.5"/><circle class="nv-rf" id="gwring" cx="18" cy="18" r="15.5" pathLength="100"/></svg>` +
      `${ico('gear', 22)}</span><span>${UI.t('Grown-ups')}</span></button>`;
  },
  gateBind() {
    const g = $('#gear');
    if (!g) return;
    let t = 0, iv = 0, n = 0, done = false;
    const ring = v => { const r = $('#gwring'); if (r) r.style.strokeDashoffset = String(Math.round(100 - 100 * v)); };
    const stop = () => { clearTimeout(t); clearInterval(iv); t = iv = 0; g.classList.remove('hold'); if (!done) ring(0); };
    g.oncontextmenu = e => e.preventDefault();
    g.onpointerdown = e => {
      if (e.button > 0) return;
      stop();
      done = false;
      n = 0;
      g.classList.add('hold');
      iv = setInterval(() => ring(Math.min(1, ++n * 100 / NAV.HOLD_MS)), 100);
      t = setTimeout(() => { done = true; stop(); ring(1); SFX.chime(); grown(); }, NAV.HOLD_MS);
    };
    g.onpointerup = g.onpointerleave = g.onpointercancel = () => { if (t) stop(); };
    g.onclick = () => {
      if (done) return;
      NAV.quiz();
    };
  },
  // a question a child that young cannot answer: a times-table fact from 6 x 6 to 9 x 9, typed in
  quiz() {
    const a = R(6, 9), b = R(6, 9);
    const s = UI.sheet(`<div class="nv-gate"><h2>For grown-ups</h2><p>Hold the Grown-ups button for 3 seconds, or answer:</p>` +
      `<label class="nv-q"><span>${a} × ${b} =</span><input id="gwans" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3" autocomplete="off" aria-label="${a} times ${b}"></label>` +
      `<p class="nv-msg" id="gwmsg" role="status"></p><div class="acts">${UI.btn('Open', { kind: 'primary', size: 'lg', wide: true, icon: 'check', id: 'gwok' })}` +
      `${UI.btn('Cancel', { kind: 'ghost', wide: true, id: 'gwno' })}</div></div>`);
    const inp = s.el.querySelector('#gwans');
    const go = () => {
      if (inp.value.trim() === String(a * b)) { s.close(); grown(); return; }
      SFX.wrong();
      s.el.querySelector('#gwmsg').textContent = 'Not quite. Ask a grown-up!';
      inp.value = '';
    };
    s.el.querySelector('#gwok').onclick = go;
    s.el.querySelector('#gwno').onclick = s.close;
    inp.onkeydown = e => { if (e.key == 'Enter') go(); };
    s.ans = a * b; // for tests
    NAV.gateSheet = s;
    return s;
  },
};

// Learn: one place for every subject path and the practice games (the bar's Learn button). The maps' Back comes here when the
// child came from here.
function learnHub() {
  NAV.mapFrom = 'learn';
  const cards = Object.keys(PATHS).map(k => {
    const N = NODES[k], np = N.filter((n, i) => passed(k, i)).length, done = np == N.length;
    return GFX.card({ cls: 'game lh-path', attrs: `data-p="${k}"`, p: k, icon: UI.SUBJ_ICON[k] || 'map', title: placeName(k),
      sub: `<span>${np} of ${N.length} stops. ${esc(done ? 'All done! Play any stop.' : np ? 'Next: ' + N[curNode(k)].t : 'Start here!')}</span>`, go: done ? 'trophy' : 'play' });
  }).join('');
  const more = GFX.card({ id: 'lhmix', p: 'disc', icon: 'review', title: 'Mixed Practice', sub: 'A bit of everything you learned' }) +
    (FLU.on() ? GFX.card({ id: 'lhflu', p: 'math', icon: 'bolt', title: 'Fact Sprint', sub: 'Quick facts, beat your best' }) : '') +
    GFX.card({ id: 'lhrace', p: 'play', icon: 'timer', title: 'Fact Race', sub: 'How many in 60 seconds?' });
  view(`<div class="top tbar gx-mtop s-read">${UI.ibtn('back', 'Back', { size: 'sm', id: 'back' })}<div class="ttl gx-ttl"><span class="gx-tb">${ico('map', 24)}</span><span>Learn</span></div>${UI.chip('star', S.stars, { aria: 'Stars' })}</div>
  <div class="scroll gx-list lh"><p class="gx-lead">Pick what to learn!</p><div class="games">${cards}</div>
  <h2 class="gx-h">${ico('bolt', 26)}<span>Practice</span></h2><div class="games">${more}</div></div>`);
  NAV.bar('learn');
  $('#back').onclick = () => home();
  $$('.lh-path').forEach(b => b.onclick = () => { SFX.whoosh(); NAV.mapFrom = 'learn'; pathMap(b.dataset.p); });
  $('#lhmix').onclick = () => { SFX.whoosh(); startMix(); };
  if ($('#lhflu')) $('#lhflu').onclick = () => { SFX.whoosh(); fluMenu(); };
  $('#lhrace').onclick = () => { SFX.whoosh(); raceMenu(); };
}
