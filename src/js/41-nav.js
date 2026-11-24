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
   - Grown-ups on Home is a labelled button; a tap asks for the Grown-ups PIN (NAV.quiz, 41b-pin.js; RC-1). */
const NAV = {
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
    for (const e of document.querySelectorAll('.nv-light')) (e.stop ? e.stop() : e.remove()); // a light end banner left open
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

  // The light end (for chaining short game stages; Hill Climb stages use it, G-FEEL2): a banner at the bottom, not a full-screen card,
  // with the same three choices. With a Next it goes on by itself after LIGHT_MS unless the child touches the banner first (or the
  // Go Home? sheet is open then: the child is choosing).
  // o: {title, stars (0-3, drawn after the title; optional), again, next, home: functions (next optional, hides Next; home defaults
  // to home())}. Returns the banner (el.stop() takes it away).
  LIGHT_MS: 2000,
  light(o = {}) {
    for (const e of document.querySelectorAll('.nv-light')) e.remove();
    const el = document.createElement('div');
    el.className = 'nv-light' + (o.next ? ' auto' : '');
    el.setAttribute('role', 'status');
    const st = o.stars != null ? ` <span class="nv-ls">${UI.stars(o.stars, 3, 30)}</span>` : '';
    el.innerHTML = `<p class="nv-lt">${esc(o.title || '')}${st}</p>` + NAV.end3({ again: o.again ? 'lagain' : '', next: o.next ? 'lnext' : '', home: 'lhome' });
    document.body.appendChild(el);
    let t = 0;
    const done = f => { clearTimeout(t); el.remove(); if (f) f(); };
    const go = { again: o.again, next: o.next, home: o.home || (() => home()) };
    for (const b of el.querySelectorAll('[data-go]')) b.onclick = () => { SFX.whoosh(); done(go[b.dataset.go]); };
    el.addEventListener('pointerdown', () => { clearTimeout(t); el.classList.remove('auto'); }, true); // a touch: the child chooses
    if (o.next) t = setTimeout(() => { if (!el.isConnected) return; if (NAV.held) el.classList.remove('auto'); else done(o.next); }, NAV.LIGHT_MS);
    el.stop = () => done();
    return el;
  },

  // ---- Grown-ups gate (Home): a tap asks for the Grown-ups PIN (41b-pin.js; RC-1, owner decision 2026-11-19: the 3-second hold is gone) ----
  gateHTML() {
    return `<button class="btn soft sm nv-gw" id="gear" aria-label="Grown-ups">${ico('gear', 22)}<span>${UI.t('Grown-ups')}</span></button>`;
  },
  gateBind() {
    const g = $('#gear');
    if (!g) return;
    g.oncontextmenu = e => e.preventDefault();
    g.onclick = () => NAV.quiz();
  },
  // the way into Grown-ups and everything it guards: then (default Grown-ups; PLAY-01: the Unlock Whistlestop sheet; Erase; Delete)
  // runs after the Grown-ups PIN (PIN.gate, 41b-pin.js; before a PIN is set, the question below, then choosing one)
  // (the PIN pad is in the lazy part gate; if it cannot load, the old question still guards the way in)
  quiz(then) {
    const go0 = typeof then == 'function' ? then : grown, go = () => { NAV.gwT = Date.now(); go0(); }; // RC-2: the grown-up session starts
    if (typeof PIN != 'undefined') return PIN.gate(go);
    return partLoad('gate').then(ok => {
      if (ok && typeof PIN != 'undefined') return PIN.gate(go);
      logErr('the gate part did not load: the old question was asked');
      return NAV.askQ(go);
    });
  },
  // RC-2: the grown-up session: from the gate (NAV.quiz) until any child screen opens (view() ends it unless the screen set gwK first:
  // Grown-ups, the report card, Story themes). Back from a grown-up screen goes to Grown-ups only while it is valid, else Home; away
  // from the Grown-ups screens (Story themes, which a grown-up may hand to the child) it lasts GW_MS from the last Grown-ups screen.
  gwT: 0, gwK: 0, GW_MS: 180000,
  gwOk() { return NAV.gwT > 0 && (!!document.querySelector('#app .gw') || Date.now() - NAV.gwT < NAV.GW_MS); },
  gwBack() { return NAV.gwOk() ? grown() : home(); },
  // a question a child that young cannot answer: a times-table fact from 6 x 6 to 9 x 9, typed in; then: what a right answer opens.
  // RC-1: only the first way in on a tablet with no Grown-ups PIN yet (PIN.gate), which then asks the grown-up to choose one
  askQ(then) {
    const a = R(6, 9), b = R(6, 9), go2 = then;
    const s = UI.sheet(`<div class="nv-gate"><h2>For grown-ups</h2><p>This part is for grown-ups. Answer to go on:</p>` +
      `<label class="nv-q"><span>${a} × ${b} =</span><input id="gwans" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3" autocomplete="off" aria-label="${a} times ${b}"></label>` +
      `<p class="nv-msg" id="gwmsg" role="status"></p><div class="acts">${UI.btn('Open', { kind: 'primary', size: 'lg', wide: true, icon: 'check', id: 'gwok' })}` +
      `${UI.btn('Cancel', { kind: 'ghost', wide: true, id: 'gwno' })}</div></div>`);
    const inp = s.el.querySelector('#gwans');
    const go = () => {
      if (inp.value.trim() === String(a * b)) { s.close(); go2(); return; }
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
    (raceOn() ? GFX.card({ id: 'lhrace', p: 'play', icon: 'timer', title: 'Fact Race', sub: 'How many in 60 seconds?' }) : '') +
    (typeof CHK != 'undefined' ? GFX.card({ id: 'lhbdg', p: 'disc', icon: 'medal', title: 'My Badges', sub: 'Win a badge in a check-in' }) : ''); // CHECK-IN (51b-checkin.js)
  view(`<div class="top tbar gx-mtop s-read">${UI.ibtn('back', 'Back', { size: 'sm', id: 'back' })}<div class="ttl gx-ttl"><span class="gx-tb">${ico('map', 24)}</span><span>Learn</span></div>${UI.chip('star', S.stars, { aria: 'Stars' })}</div>
  <div class="scroll gx-list lh"><p class="gx-lead">Pick what to learn!</p><div class="games">${cards}</div>
  <h2 class="gx-h">${ico('bolt', 26)}<span>Practice</span></h2><div class="games">${more}</div></div>`);
  NAV.bar('learn');
  $('#back').onclick = () => home();
  $$('.lh-path').forEach(b => b.onclick = () => { SFX.whoosh(); NAV.mapFrom = 'learn'; pathMap(b.dataset.p); });
  $('#lhmix').onclick = () => { SFX.whoosh(); startMix(); };
  if ($('#lhflu')) $('#lhflu').onclick = () => { SFX.whoosh(); fluMenu(); };
  if ($('#lhrace')) $('#lhrace').onclick = () => { SFX.whoosh(); raceMenu(); };
  if ($('#lhbdg')) $('#lhbdg').onclick = () => { SFX.whoosh(); CHK.shelf(learnHub); };
}
/* sample fix (Fable): the Android back gesture. The Play app (a TWA) closes when back finds no history, so away from Home one history
   entry stands in front: back takes it and does the screen's own way back (the open sheet, Back, the house's "Go Home?", an end card's
   Home, the bar's Home), then it is put back. On Home, "Who is playing?" and the name screen there is none: back leaves the app. */
const NAVB={skip:0,
  act(){const m=UI.modal.top();if(m)return m._esc||(()=>{}); // a card with no way back of its own stays
    if(document.getElementById('hs'))return null;
    const b=document.querySelector('#app [aria-label="Back"],#app .nv-house,[data-go="home"],#navbar [data-nav="home"]:not(.on)');return b?()=>b.click():null},
  on:()=>!!(history.state&&history.state.navb),
  sync(){try{const d=!!NAVB.act();if(d&&!NAVB.on())history.pushState({navb:1},'');else if(!d&&NAVB.on()){NAVB.skip=1;setTimeout(()=>{NAVB.skip=0},1500);history.back()}}catch(e){}},
  pop(){if(NAVB.skip)NAVB.skip=0;else{const f=NAVB.act();try{if(f)f()}catch(e){}}setTimeout(NAVB.sync,0)}};
if(typeof history!='undefined'&&history.pushState&&typeof MutationObserver!='undefined'&&document.body){addEventListener('popstate',NAVB.pop);let q=0;
  const mo=new MutationObserver(()=>{if(!q){q=1;setTimeout(()=>{q=0;NAVB.sync()},0)}}),a=document.getElementById('app'); // a new screen, a sheet or card
  mo.observe(document.body,{childList:true});if(a)mo.observe(a,{childList:true})}
