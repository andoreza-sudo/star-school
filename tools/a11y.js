// Accessibility scan (P6-01, DESIGN_SYSTEM.md section 10). Opens the built app like smoke.js (tools/lib/browser.js) and checks the
// named screens below at 380x780 and 1024x600. Usage:
//   node tools/a11y.js                     every screen, both sizes; exit 1 on any failure
//   node tools/a11y.js home map --size=380x780 --v    some screens, one size, -v prints what was measured
//   A11Y_SHOTS=dir node tools/a11y.js ...  also writes a 2x screenshot of each screen and of each focus-ring stop it checks
//
// Checks, per screen and size (the rule name is the first word of each failure line):
//   target   every tappable thing is at least 48 x 48 CSS px; a game's main controls (SCREENS[].main) at least 64.
//            Tappable = a button, link, input, select, summary, an element with a role a person presses, a tabindex, a click /
//            pointer / touch listener (counted by wrapping addEventListener), an on* handler, or cursor:pointer that is not
//            inherited. Allowed smaller only where DESIGN_SYSTEM 10 / BRAIN_TEASERS 8 allow it (ALLOW below: 9x9 puzzle grids).
//   keys     every tappable thing can be reached with the keyboard (a native control or tabindex 0 with a role), except a play
//            surface (a canvas or an area over a third of the screen, played by touch).
//   name     every button, link and control has an accessible name with a letter or digit (aria-label, aria-labelledby, label,
//            alt, svg <title>, or visible text); an icon-only or emoji-only button needs aria-label.
//   text     visible text (letters or digits; html and svg text, measured at its drawn size) is at least 16 px on child screens,
//            14 px on Grown-ups screens (SCREENS[].adult).
//   focus    Tab walks every focusable control in order; each one shows a ring (outline at least 2 px, not transparent) and
//            the ring is not cut off by a scrolling or clipping parent.
//   image    every <img> has alt; every outer <svg> and <canvas> is aria-hidden or role="img" with a name; [role=img] has a name.
//   landmark exactly one main landmark; exactly one h1; heading levels never skip a level going down.
//   signal   (screens with an act) after a wrong and a right answer, each marked element (.right, .wrong) carries a shape, icon
//            or text as well as its colour, and a toast or line says it in words.
//   sound    every sound (SFX.*, tone, noise, playClip) comes with a change on screen within 600 ms; every spoken line (say) is
//            on screen as text, or the screen has a visible "hear it again" button (listening tasks).
//   motion   with prefers-reduced-motion and, separately, with Calm mode on (S.calm): no CSS or Web animation longer than
//            MOTION_MS or repeating, and no particle (.burst, .rw-burst, .fly, .pc-fx) visible. Canvases are games and are not checked.
//   sheet    (screens with a sheet) the sheet takes focus when it opens, Tab stays inside it and reaches every control in it,
//            and the keyboard can close it (Escape, or Enter on its first button), after which focus is back on the page.
//   contrast tools/contrast.js passes (every token pair, including each colour/background pair the CSS sets together).
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');
const { launch, openApp } = require('./lib/browser');

const SIZES = [[380, 780], [1024, 600]];
const MOTION_MS = 100; // an animation may run at most this long with reduced motion or Calm mode (the CSS sets .01 ms)
const VERBOSE = process.argv.includes('--v');
const SHOTS = process.env.A11Y_SHOTS ? path.resolve(process.env.A11Y_SHOTS) : null;

// Smaller targets allowed (selector, minimum, why). Only dense puzzle grids, as DESIGN_SYSTEM 10 and BRAIN_TEASERS 8 allow.
const ALLOW = [
  ['.sd-board .sd-c', 36, 'Sudoku 9x9 grid square on a phone (DESIGN_SYSTEM 10: 36 px inside 9x9 puzzle grids)'],
];

// ---- the screens -------------------------------------------------------------------------------------------------------
// fixture: save to start from (default midway). run: shows the screen. adult: Grown-ups text size (14 px). main: the game's
// main controls (64 px). act: wrong then right answer (signal and sound checks). sheet: opens a sheet (keyboard trap check);
// it returns {close: 'escape' | 'enter'}.
const wait = ms => new Promise(r => setTimeout(r, ms));
const ev = (fn, arg) => async p => { await p.evaluate(fn, arg); await p.waitForTimeout(500); };

// a question of the real round engine, answered wrong then right by taps (choice, number keys or picture taps)
async function answerAct(p) {
  const q = await p.evaluate(() => ({ kind: G.q.kind, ans: String(G.q.ans), vals: G.q.choices ? G.q.choices.map(c => String(c.v)) : null }));
  const wrongSel = await p.evaluate(() => {
    const q = G.q;
    if (q.choices) {
      const i = q.choices.findIndex(c => String(c.v) !== String(q.ans));
      return [`.ch[data-i="${i}"]`];
    }
    if (q.kind === 'num') {
      const w = String(Math.abs(parseInt(q.ans, 10) || 0) + 1);
      return [...w].map(d => `.k[data-k="${d}"]`).concat('.k[data-k="go"]');
    }
    return null;
  });
  if (!wrongSel) throw new Error('act: question kind ' + q.kind + ' has no wrong tap here');
  await p.evaluate(() => { window.__a11y.mark('wrong'); });
  for (const s of wrongSel) await p.click(s);
  await p.waitForTimeout(250);
  const wrong = await p.evaluate(() => window.__a11y.signal('wrong'));
  await p.waitForTimeout(900);
  await p.evaluate(() => { window.__a11y.mark('right'); });
  if (q.kind === 'num') {
    await p.evaluate(() => { const d = document.querySelector('.k[data-k="del"]'); for (let i = 0; i < 6 && d; i++) d.click(); });
    for (const d of q.ans) await p.click(`.k[data-k="${/\d|\./.test(d) ? d : d === '-' ? 'neg' : 'go'}"]`);
    await p.click('.k[data-k="go"]');
  } else {
    await p.click(`.ch[data-i="${q.vals.indexOf(q.ans)}"]`);
  }
  await p.waitForTimeout(250);
  const right = await p.evaluate(() => window.__a11y.signal('right'));
  await p.waitForTimeout(900);
  return [wrong, right];
}
const qScreen = fn => ({ run: ev(fn), act: answerAct });

const rwRun = async p => {
  await p.evaluate(() => start('math', 0));
  await p.waitForTimeout(600); // the question's own spoken prompt (400 ms after it shows) belongs to the question screen
  await p.evaluate(() => { const n = G.n; G.score = n; G.done = n; finish(); if (window.__a11y) window.__a11y.said = []; });
  await p.click('#chest');
  await p.waitForSelector('#btns', { state: 'visible', timeout: 8000 });
  await p.waitForTimeout(3000);
};
// gtime, rlSave, snSave (game time in the bank, a Star Rally and a Snack Stand save) are defined in the page by pageInit
const pauseSheet = async p => { await p.click('#gpause'); await p.waitForTimeout(500); return { close: 'escape' }; };

const SCREENS = {
  // the 12 named in ROADMAP P6-01
  setup: { fixture: 'fresh', run: async () => {} },
  home: { run: ev(() => home(true)) },
  map: { run: ev(() => pathMap('math')) },
  'math-question': qScreen(() => { window.say = window.__a11y.say; start('math', 0); }),
  'read-question': qScreen(() => start('read', NODES.read.findIndex(n => n.sk == 'pic'))),
  'es-question': qScreen(() => start('es', 0)),
  // S-SPK: the Spanish "Say it!" step (src/js/50-say.js) over the first question of a Spanish round; the microphone is the main control (64 px)
  'say-it': { run: ev(() => { SPK.mic = 'yes'; start('es', NODES.es.findIndex(n => n.sk == 'es_animal' && n.lv == 1)); G.spk = 1; spkOpen(G.q, () => next()); }), main: '.spk-mic' },
  reward: { run: rwRun },
  shop: {
    run: ev(() => { S.coins = 5000; shop(); }),
    // try on an item not owned, then Buy: the "Buy it?" sheet
    sheet: async p => { await p.click('.ps-card:not(.own)'); await p.waitForTimeout(300); await p.click('#psact'); await p.waitForTimeout(500); return { close: 'escape' }; },
  },
  care: { run: ev(() => { S.care = { food: 40, clean: 40, fun: 40, t: Date.now(), gift: '' }; care(); }) },
  gameroom: { run: ev(() => { gtime(); gameRoom(); }) },
  'bt-sudoku': {
    run: async p => {
      await p.evaluate(() => { S.grade = 1; S.bt = {}; BT.start('sudoku', BT.band(), 9); });
      await p.waitForSelector('#btstage .sd');
      await p.waitForTimeout(400);
    },
  },
  grown: { adult: true, run: ev(() => grown()) },
  // P5-10 profile screens (P6-05): the "Who is playing?" picker (two children) and the Grown-ups Children card
  'who-picker': { run: ev(() => { if (!PRF.many()) PRF.add(Object.assign(PRF.fresh(), { name: 'Ben', pet: 'dino' })); PRF.pick(); }) },
  'grown-children': {
    adult: true,
    run: ev(() => { if (!PRF.many()) PRF.add(Object.assign(PRF.fresh(), { name: 'Ben', pet: 'dino' })); grown(); document.querySelector('#gw-kids').scrollIntoView(); }),
  },
  // more: the sticker book, the Brain Teasers hub, the report card, and every game screen
  stickers: { run: ev(() => book()) },
  'bt-hub': { run: ev(() => { S.grade = 2; BT.hub(); }) },
  'bt-maze': {
    run: async p => { await p.evaluate(() => { S.grade = 2; S.bt = {}; BT.start('maze', BT.band(), 3); }); await p.waitForTimeout(600); },
  },
  report: { adult: true, run: ev(() => report()) },
  'hill-garage': { run: ev(() => { gtime(); garage(); }) },
  'hill-drive': { run: ev(() => { gtime(); hcStart('meadow'); }), main: '.pedal', sheet: pauseSheet },
  'hill-end': {
    run: async p => { await p.evaluate(() => { gtime(); hcStart('meadow'); }); await p.waitForTimeout(600); await p.evaluate(() => hcEnd('fuel')); await p.waitForTimeout(900); },
    sheet: async () => ({ close: 'enter' }), // the shared end card (an overlay) is already open
  },
  'art-menu': { run: ev(() => { gtime(); colorMenu('mandala'); }) },
  // colouring: the picture is the main control (tap a shape); the colour swatches are pickers (48 px)
  'art-page': { run: ev(() => { gtime(); artPage('m:17'); }), sheet: pauseSheet },
  'art-pixel': { run: ev(() => { gtime(); colorPic(CB_PICS[0][0], 'num'); }) },
  'blocks-menu': { run: ev(() => { gtime(); bbMenu(); }) },
  'blocks-build': {
    run: ev(() => { gtime(); blockBuilder(); }),
    main: '.bb-pal button',
    sheet: async p => { await p.click('#bbmore'); await p.waitForTimeout(500); return { close: 'escape' }; },
  },
  // G-01b: a picture build (the task card with its picture button) and the menu with a gallery picture and every chapter open
  'blocks-pic': { run: ev(() => { gtime(); for (let i = 0; i < 16; i++) bbBP()[BBP[i].id] = 2; blockBuilder(16); }), main: '.bb-pal button', sheet: pauseSheet },
  'blocks-journey': { run: ev(() => { gtime(); for (let i = 0; i < 20; i++) bbBP()[BBP[i].id] = 3; const g = bbGal(); if (!g.length) g.push({ n: 'My Island', d: bbPack(bbGen('island', 7)), t: today() }); bbMenu(); }) },
  'rally-menu': { run: ev(() => { rlSave(); rlMenu(); }) },
  'rally-garage': { run: ev(() => { rlSave(); rlGarage({ k: 'paint', id: 'b' }); }) },
  'rally-race': { run: async p => { await p.evaluate(() => rlSave()); await p.evaluate(() => rlRace('meadow-0')); await p.waitForTimeout(4500); }, main: '.rl-btn', sheet: pauseSheet },
  'snack-menu': { run: ev(() => { snSave(); snMenu(); }) },
  'snack-day': { run: async p => { await p.evaluate(() => snSave()); await p.evaluate(() => snDay()); await p.waitForTimeout(2500); }, main: '.sn-fb, .sn-serve, .sn-undo', sheet: pauseSheet },
  'snack-shop': { run: ev(() => { snSave(); snShop('lettuce'); }) },
  'game-timeup': {
    run: async p => { await p.evaluate(() => { gtime(); artPage('m:17'); }); await p.waitForTimeout(600); await p.evaluate(() => timeUpOverlay()); await p.waitForTimeout(900); },
    sheet: async () => ({ close: 'enter' }),
  },
};
// Game screens: the games' part files may load only when the Game Room opens (P6-02's lazy parts). Open the Game Room first when
// the game code is not there yet and wait for it (and for the hub); with the parts already loaded this does nothing.
async function gamesReady(p) {
  const need = await p.evaluate(() => typeof GH == 'undefined' || typeof rlS != 'function' || typeof snS != 'function');
  if (!need) return;
  await p.evaluate(() => { gtime(); gameRoom(); });
  await p.waitForFunction(() => typeof GH != 'undefined' && typeof rlS == 'function' && typeof snS == 'function', null, { timeout: 30000 });
}
for (const [n, sc] of Object.entries(SCREENS)) {
  if (!/^(gameroom|hill-|art-|blocks-|rally-|snack-|game-)/.test(n)) continue;
  const run = sc.run;
  sc.run = async p => { await gamesReady(p); await run(p); };
}
SCREENS.gameroom.run = async p => { await gamesReady(p); await p.evaluate(() => { gtime(); gameRoom(); }); await p.waitForSelector('.gh-card'); await p.waitForTimeout(400); };

const NAMED = ['setup', 'home', 'map', 'math-question', 'read-question', 'es-question', 'reward', 'shop', 'care', 'gameroom', 'bt-sudoku', 'grown'];

// ---- in-page helpers (installed before the app's code runs) ------------------------------------------------------------
function pageInit() {
  const A = window.__a11y = { sounds: [], said: [], muts: [], marks: {} };
  // count every element that gets a press listener
  const orig = EventTarget.prototype.addEventListener;
  const PRESS = /^(click|pointerdown|pointerup|mousedown|mouseup|touchstart|touchend)$/;
  EventTarget.prototype.addEventListener = function (type, fn, o) {
    if (PRESS.test(type) && this instanceof Element) this.__press = true;
    return orig.call(this, type, fn, o);
  };
  A.now = () => performance.now();
  // helpers the screens' run functions call in the page
  window.gtime = () => { S.pt = { bank: 1200, day: today(), used: 0 }; };
  window.rlSave = () => { gtime(); const r = rlS(); r.spk = 130; r.stars = { 'meadow-0': 3 }; save(); };
  window.snSave = () => { gtime(); S.grade = 3; const r = snS(); r.coins = 80; r.days = 2; save(); };
  A.mark = k => { A.marks[k] = A.now(); };
  A.say = (t) => { A.said.push({ t: String(t || ''), at: A.now() }); };
  // wrap the sound functions once the app has loaded (called from node)
  A.wrapSound = () => {
    const log = k => A.sounds.push({ k, at: A.now() });
    if (typeof SFX == 'object') for (const k of Object.keys(SFX)) { const f = SFX[k]; SFX[k] = (...a) => { log('SFX.' + k); return f(...a); }; }
    for (const g of ['tone', 'noise', 'playClip']) {
      const f = window[g];
      if (typeof f == 'function') window[g] = (...a) => { log(g); return f(...a); };
    }
    const sy = window.say;
    window.say = (t, ...a) => { A.said.push({ t: String(t || ''), at: A.now() }); try { return sy(t, ...a); } catch (e) {} };
    new MutationObserver(ms => { if (ms.length) A.muts.push(A.now()); })
      .observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true });
  };
}

// The static scan of one screen (runs in the page). o: {adult, main, allow}
function pageScan(o) {
  const out = [];
  const fail = (rule, el, msg) => out.push({ rule, what: el ? desc(el) : '', msg });
  const info = [];
  const vw = innerWidth, vh = innerHeight;
  function desc(el) {
    if (!el || !el.tagName) return String(el);
    let s = el.tagName.toLowerCase();
    if (el.id) s += '#' + el.id;
    const c = typeof el.className == 'string' ? el.className : (el.getAttribute('class') || '');
    if (c.trim()) s += '.' + c.trim().split(/\s+/).slice(0, 3).join('.');
    for (const a of ['data-i', 'data-k', 'data-p', 'data-v', 'data-go', 'data-md', 'data-f']) if (el.hasAttribute(a)) s += `[${a}="${el.getAttribute(a).slice(0, 12)}"]`;
    const t = (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 24);
    return t ? s + ' "' + t + '"' : s;
  }
  const hiddenUp = el => {
    for (let e = el; e && e.nodeType == 1; e = e.parentElement) {
      if (e.getAttribute('aria-hidden') == 'true' || e.inert) return true;
      const cs = getComputedStyle(e);
      if (cs.display == 'none' || cs.visibility == 'hidden' || +cs.opacity < 0.05) return true;
    }
    return false;
  };
  const shown = el => {
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return false;
    for (let e = el; e && e.nodeType == 1; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.display == 'none' || cs.visibility == 'hidden' || +cs.opacity < 0.05) return false;
    }
    return true;
  };
  // the box a person can hit: inside a scrolling or clipping parent only what lies in it (if any of it does)
  const NATIVE = 'button,a[href],input:not([type=hidden]),select,textarea,summary,[role=button],[role=switch],[role=checkbox],[role=tab],[role=link],[role=radio],[role=menuitem],[role=option],[role=slider],[tabindex]:not([tabindex="-1"])';
  const all = [...document.querySelectorAll('body *')];
  const tappable = new Set();
  for (const el of all) {
    if (el.closest('svg') && el.tagName.toLowerCase() != 'svg') {
      // parts of a drawing: only if they have their own handler
      if (!(el.__press || el.onclick || el.onpointerdown)) continue;
    }
    let t = el.matches(NATIVE) || el.__press || el.onclick || el.onpointerdown || el.onpointerup || el.ontouchstart || el.onmousedown;
    if (!t) {
      const cs = getComputedStyle(el);
      if (cs.cursor == 'pointer' && (!el.parentElement || getComputedStyle(el.parentElement).cursor != 'pointer')) t = true;
    }
    if (!t) continue;
    if (el === document.body || el.id == 'app') continue;
    if (el.disabled && el.matches('input[type=range]')) continue;
    tappable.add(el);
  }
  const targets = [];
  for (let el of tappable) {
    // an input inside its label: the label is what you hit
    let box = el;
    if (el.matches('input') && el.closest('label')) box = el.closest('label');
    if (el.tagName == 'LABEL' && el.querySelector('input') && tappable.has(el.querySelector('input'))) continue;
    if (!shown(box) || hiddenUp(el) && !el.matches('input')) continue;
    if (getComputedStyle(el).pointerEvents == 'none') continue;
    targets.push([el, box]);
  }
  const mainEls = o.main ? new Set(document.querySelectorAll(o.main)) : new Set();
  if (o.main && !mainEls.size) fail('target', null, 'no main controls found for ' + o.main);
  const isSurface = (el, r) => el.tagName == 'CANVAS' || el.querySelector('canvas') || r.width * r.height > vw * vh / 3;
  for (const [el, box] of targets) {
    const r = box.getBoundingClientRect();
    if (isSurface(el, r)) continue;
    let min = mainEls.has(el) ? 64 : 48, why = '';
    for (const [sel, m, w] of o.allow) if (el.matches(sel)) { min = Math.min(min, m); why = w; }
    const w = Math.round(r.width * 10) / 10, h = Math.round(r.height * 10) / 10;
    if (o.v) info.push(`target ${w}x${h} ${desc(el)}`);
    if (w + 0.5 < min || h + 0.5 < min) fail('target', el, `${w} x ${h} px, needs ${min}${mainEls.has(el) ? ' (main game control)' : ''}`);
  }
  // keys: keyboard reachable
  for (const [el, box] of targets) {
    const r = box.getBoundingClientRect();
    if (isSurface(el, r)) continue;
    const focusable = el.matches('button,a[href],input,select,textarea,summary') || (el.tabIndex >= 0 && el.hasAttribute('tabindex'));
    if (el.matches('label') && el.querySelector('input,button,select')) continue;
    if (!focusable) {
      // a container that hands taps on to the controls inside it (UI.segOn, a grid's own handler) is fine when they are buttons
      if (el.querySelector('button,a[href],input,select,[tabindex]:not([tabindex="-1"])')) continue;
      // an element that only shows a pointer inside a control that is focusable (a part of a button) is fine
      if (el.parentElement && el.parentElement.closest('button,a[href],summary,label,[tabindex]:not([tabindex="-1"])')) continue;
      fail('keys', el, 'tappable but not reachable with the keyboard (not a button and no tabindex)');
    } else if (!el.matches('button,a[href],input,select,textarea,summary') && !el.getAttribute('role')) {
      fail('keys', el, 'focusable element without a role (use a button)');
    }
  }
  // name
  const nameOf = el => {
    const lb = el.getAttribute('aria-labelledby');
    if (lb) return lb.split(/\s+/).map(id => (document.getElementById(id) || {}).textContent || '').join(' ');
    if (el.getAttribute('aria-label')) return el.getAttribute('aria-label');
    if (el.labels && el.labels.length) return [...el.labels].map(l => textOf(l)).join(' ');
    if (el.tagName == 'IMG') return el.alt || '';
    const t = textOf(el);
    if (t.trim()) return t;
    return el.getAttribute('title') || '';
  };
  const textOf = el => {
    let s = '';
    for (const n of el.childNodes) {
      if (n.nodeType == 3) s += n.textContent;
      else if (n.nodeType == 1) {
        if (n.getAttribute('aria-hidden') == 'true') continue;
        if (n.tagName == 'IMG') s += ' ' + (n.alt || '');
        else if (n.tagName.toLowerCase() == 'svg') {
          if (n.getAttribute('aria-label')) s += ' ' + n.getAttribute('aria-label');
          else { const ti = n.querySelector('title'); if (ti) s += ' ' + ti.textContent; }
        } else if (n.getAttribute('aria-label')) s += ' ' + n.getAttribute('aria-label');
        else if (getComputedStyle(n).display != 'none') s += ' ' + textOf(n);
      }
    }
    return s;
  };
  for (const [el] of targets) {
    if (!el.matches(NATIVE)) continue;
    if (el.tagName == 'LABEL') continue;
    const n = nameOf(el).trim();
    if (!/[\p{L}\p{N}]/u.test(n)) fail('name', el, n ? `name "${n}" has no words (emoji or symbol only): add aria-label` : 'no accessible name: add aria-label');
  }
  // text size
  const minText = o.adult ? 14 : 16;
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  for (let n; (n = tw.nextNode());) {
    const s = n.textContent;
    if (!/[\p{L}\p{N}]/u.test(s)) continue;
    const el = n.parentElement;
    if (!el || seen.has(el) || /^(SCRIPT|STYLE|TITLE|OPTION)$/.test(el.tagName) || el.closest('title,desc,style,script')) continue;
    seen.add(el);
    if (!shown(el)) continue;
    // letters drawn inside a picture (an icon's digits, a sign in a drawing) are art: allowed when the picture is aria-hidden
    if (el instanceof SVGElement && hiddenUp(el)) continue;
    let px = parseFloat(getComputedStyle(el).fontSize);
    if (el instanceof SVGElement) {
      const m = el.getScreenCTM && el.getScreenCTM();
      if (m) px *= Math.hypot(m.a, m.b);
    }
    if (o.v && px < minText + 2) info.push(`text ${px.toFixed(1)} ${desc(el)}`);
    if (px + 0.05 < minText) fail('text', el, `text ${px.toFixed(1)} px, needs ${minText}`);
  }
  // images
  for (const el of document.querySelectorAll('img')) if (!el.hasAttribute('alt')) fail('image', el, 'img without alt');
  for (const el of document.querySelectorAll('svg, canvas')) {
    if (el.tagName.toLowerCase() == 'svg' && el.parentElement && el.parentElement.closest('svg')) continue;
    if (!shown(el)) continue;
    let hidden = false;
    for (let e = el; e && e.nodeType == 1; e = e.parentElement) if (e.getAttribute('aria-hidden') == 'true') { hidden = true; break; }
    if (hidden) continue;
    const role = el.getAttribute('role');
    const nm = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || (el.querySelector(':scope > title') || {}).textContent;
    if (role == 'img' && nm) continue;
    fail('image', el, `${el.tagName.toLowerCase()} is neither aria-hidden nor role="img" with a name`);
  }
  for (const el of document.querySelectorAll('[role=img]')) {
    if (!shown(el)) continue;
    if (!(el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || (el.querySelector(':scope > title') || {}).textContent))
      fail('image', el, 'role="img" without a name');
  }
  // landmarks and headings
  const mains = [...document.querySelectorAll('main,[role=main]')];
  if (mains.length != 1) fail('landmark', null, `${mains.length} main landmarks (want 1)`);
  // headings of the page, or of the open dialog when one is open (a sheet or an overlay card; the page behind is aria-hidden)
  const dlg = [...document.querySelectorAll('[role=dialog][aria-modal=true]')].filter(d => shown(d) && !hiddenUp(d)).pop();
  const hs = [...(dlg || document).querySelectorAll('h1,h2,h3,h4,h5,h6,[role=heading]')]
    .filter(h => !hiddenUp(h) && (dlg || !h.closest('[role=dialog]')));
  const lv = h => +(h.getAttribute('aria-level') || h.tagName.slice(1) || 2);
  const h1 = hs.filter(h => lv(h) == 1);
  if (dlg) { if (!hs.length) fail('landmark', dlg, 'the open dialog has no heading'); }
  else if (h1.length != 1) fail('landmark', h1[1] || null, `${h1.length} h1 headings (want 1)`);
  let last = dlg ? lv(hs[0] || { getAttribute: () => 1, tagName: 'H1' }) - 1 : 0;
  for (const h of hs) {
    const l = lv(h);
    if (last && l > last + 1) fail('landmark', h, `heading level ${l} after level ${last}`);
    last = l;
  }
  return { fails: out, info };
}

// Focus walk: Tab through the page; returns failures and the list of stops (runs from node, one Tab at a time)
async function focusWalk(p, shotBase) {
  const fails = [];
  const n = await p.evaluate(() => {
    document.activeElement && document.activeElement.blur && document.activeElement.blur();
    const sel = 'button:not([disabled]),a[href],input:not([type=hidden]):not([disabled]),select,textarea,summary,[tabindex]:not([tabindex="-1"])';
    return [...document.querySelectorAll(sel)].filter(e => e.getClientRects().length && getComputedStyle(e).visibility != 'hidden').length;
  });
  const stops = [];
  const max = Math.min(n + 2, 90);
  for (let i = 0; i < max; i++) {
    await p.keyboard.press('Tab');
    await p.waitForTimeout(60); // let the focus scroll settle
    const r = await p.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const desc = e => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + (typeof e.className == 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/).slice(0, 3).join('.') : '') +
        ((e.getAttribute('aria-label') || e.textContent || '').trim() ? ' "' + (e.getAttribute('aria-label') || e.textContent).trim().replace(/\s+/g, ' ').slice(0, 20) + '"' : '');
      // the element that draws the ring: an input inside a switch label draws it on its label's track (.sw) or the label
      let ring = el;
      const cs0 = getComputedStyle(el);
      if ((+cs0.opacity < 0.05 || el.getBoundingClientRect().width < 2) && el.closest('label')) {
        const l = el.closest('label');
        ring = l.querySelector('.sw') || l;
      }
      const cs = getComputedStyle(ring);
      const ow = parseFloat(cs.outlineWidth) || 0;
      const transparent = /rgba\([^)]*,\s*0\)$/.test(cs.outlineColor) || cs.outlineColor == 'transparent';
      const has = cs.outlineStyle != 'none' && ow >= 2 && !transparent;
      const fv = el.matches(':focus-visible');
      // clipped: the ring box must lie inside every clipping parent (1 px tolerance)
      const off = parseFloat(cs.outlineOffset) || 0, R = ring.getBoundingClientRect();
      const box = { l: R.left - off - ow, t: R.top - off - ow, r: R.right + off + ow, b: R.bottom + off + ow };
      let clip = '';
      for (let e = ring.parentElement; e && e !== document.body; e = e.parentElement) {
        const c = getComputedStyle(e);
        if (c.overflowX == 'visible' && c.overflowY == 'visible' && c.clipPath == 'none') continue;
        const q = e.getBoundingClientRect();
        const cut = Math.max(q.left - box.l, q.top - box.t, box.r - q.right, box.b - q.bottom);
        if (cut > ow / 2 + 1) { clip = `${Math.round(cut)} px cut by ${desc(e)}`; break; }
      }
      const ins = innerWidth, inh = innerHeight;
      const onScreen = R.right > 0 && R.bottom > 0 && R.left < ins && R.top < inh;
      return { d: desc(el), has, fv, clip, onScreen, ow, style: cs.outlineStyle, color: cs.outlineColor, x: R.left, y: R.top };
    });
    if (!r) continue;
    if (stops.length && stops[0].d == r.d && i > 1) break; // came round
    stops.push(r);
    if (!r.has) fail_('focus', r.d, `no visible focus ring (outline ${r.style} ${r.ow}px ${r.color})`);
    else if (r.clip) fail_('focus', r.d, 'focus ring cut off: ' + r.clip);
    if (shotBase && stops.length <= 3) await p.screenshot({ path: `${shotBase}-focus${stops.length}.png` });
  }
  function fail_(rule, what, msg) { fails.push({ rule, what, msg }); }
  return { fails, stops };
}

// motion: sample the running animations a few times
async function motionCheck(p, mode) {
  const fails = [];
  for (const t of [0, 250, 700]) {
    if (t) await p.waitForTimeout(t === 250 ? 250 : 450);
    const r = await p.evaluate(MS => {
      const bad = [];
      for (const a of document.getAnimations()) {
        if (a.playState != 'running') continue;
        const tg = a.effect && a.effect.target;
        if (!tg || (tg.closest && tg.closest('canvas'))) continue;
        const tm = a.effect.getComputedTiming();
        const total = tm.activeDuration;
        if (total > MS || tm.iterations === Infinity) {
          const d = tg.tagName.toLowerCase() + (tg.id ? '#' + tg.id : '') + (typeof tg.className == 'string' && tg.className ? '.' + tg.className.split(/\s+/).slice(0, 2).join('.') : '');
          bad.push(`${a.animationName || a.transitionProperty || 'animation'} on ${d}: ${Math.round(tm.duration)} ms x ${tm.iterations}`);
        }
      }
      for (const el of document.querySelectorAll('.burst, .rw-burst, .fly, .pc-fx')) {
        const cs = getComputedStyle(el);
        if (cs.display != 'none' && cs.visibility != 'hidden' && +cs.opacity > 0.05 && el.getClientRects().length) bad.push('particle shown: ' + el.className);
      }
      return bad;
    }, MOTION_MS);
    for (const b of r) if (!fails.some(f => f.msg == b)) fails.push({ rule: 'motion', what: mode, msg: b });
  }
  return fails;
}

// signal check (runs in the page after a wrong or right tap): every visible .right/.wrong mark carries a shape too, and words say it
function pageSignal() {
  window.__a11y.signal = kind => {
    const out = [];
    // marks: .right / .ok (right), .wrong / .no (wrong); a wrong typed answer may have none (the slot clears), the words still say it
    const cls = kind == 'wrong' ? '#app .wrong, #app .no' : '#app .right, #app .ok';
    const els = [...document.querySelectorAll(cls)].filter(e => e.getClientRects().length);
    for (const el of els) {
      const pc = ['::before', '::after'].map(ps => getComputedStyle(el, ps)).filter(c => c.content && c.content != 'none' && c.content != 'normal' && c.display != 'none');
      const icon = el.querySelector('svg:not(.art):not([class*="pic"])');
      if (!pc.length && !icon) out.push({ rule: 'signal', what: el.className, msg: `${kind} is shown by colour only (no badge, icon or shape)` });
    }
    const t = document.getElementById('toast');
    const words = t && t.classList.contains('on') ? t.textContent.trim() : '';
    if (!/[\p{L}]/u.test(words)) out.push({ rule: 'signal', what: kind, msg: `no words (toast) say the answer was ${kind}` });
    return out;
  };
}

// sound check (in the page): every sound has a change on screen within 600 ms; every spoken line is on screen or replayable
function pageSound() {
  const A = window.__a11y, out = [];
  for (const s of A.sounds) {
    if (!A.muts.some(m => Math.abs(m - s.at) < 600)) out.push({ rule: 'sound', what: s.k, msg: `${s.k} played with no change on screen` });
  }
  const norm = t => t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const page = norm(document.body.innerText);
  const replay = [...document.querySelectorAll('button')].some(b => b.getClientRects().length &&
    /hear|listen|again|say it|read it|speak|play the/i.test((b.getAttribute('aria-label') || '') + ' ' + b.textContent));
  for (const s of A.said) {
    const t = norm(s.t);
    if (!t) continue;
    // each sentence (or the whole line) must be on screen, unless the screen has a replay button (a listening task)
    const parts = t.split(/ (?=[a-z])/).length > 12 ? [t.slice(0, 40)] : [t];
    if (!parts.every(x => page.includes(x)) && !replay) out.push({ rule: 'sound', what: 'say', msg: `spoken "${s.t.slice(0, 50)}" is not on screen and there is no replay button` });
  }
  const seen = new Set();
  return out.filter(f => { const k = f.msg; if (seen.has(k)) return false; seen.add(k); return true; });
}

// sheet: focus moves in, Tab stays inside and reaches every control, the keyboard closes it, focus comes back to the page
async function sheetCheck(p, how) {
  const fails = [];
  const f = (msg) => fails.push({ rule: 'sheet', what: 'sheet', msg });
  const info = await p.evaluate(() => {
    const s = [...document.querySelectorAll('.sheet-bg, .ovl')].filter(e => e.getClientRects().length).pop();
    if (!s) return null;
    window.__sheet = s;
    const sel = 'button:not([disabled]),a[href],input:not([type=hidden]):not([disabled]),select,textarea,summary,[tabindex]:not([tabindex="-1"])';
    const ctl = [...s.querySelectorAll(sel)].filter(e => e.getClientRects().length);
    return { n: ctl.length, inside: s.contains(document.activeElement) };
  });
  if (!info) { f('no sheet opened'); return fails; }
  if (!info.inside) f('focus did not move into the sheet when it opened');
  const visited = new Set();
  for (let i = 0; i < info.n + 3; i++) {
    await p.keyboard.press('Tab');
    const r = await p.evaluate(() => {
      const a = document.activeElement;
      return { inside: window.__sheet.contains(a), d: a === document.body ? 'body' : a.tagName + (a.id ? '#' + a.id : '') + '|' + (a.textContent || '').trim().slice(0, 20) + '|' + [...a.parentNode.children].indexOf(a) };
    });
    if (!r.inside) { f('Tab left the open sheet (to ' + r.d + ')'); break; }
    visited.add(r.d);
  }
  if (visited.size < info.n) f(`Tab reached ${visited.size} of the sheet's ${info.n} controls`);
  // close it with the keyboard
  if (how == 'escape') await p.keyboard.press('Escape');
  else {
    await p.evaluate(() => { const b = window.__sheet.querySelector('button'); b && b.focus(); });
    await p.keyboard.press('Enter');
  }
  await p.waitForTimeout(500);
  // closed: gone from the page, or (a sheet) sliding out
  const after = await p.evaluate(() => {
    const s = window.__sheet;
    return { gone: !document.body.contains(s) || (s.classList.contains('sheet-bg') && !s.classList.contains('on')) };
  });
  if (!after.gone) { f(`the keyboard (${how}) did not close the sheet`); return fails; }
  await p.keyboard.press('Tab');
  const back = await p.evaluate(() => { const a = document.activeElement; return a && a !== document.body && document.getElementById('app').contains(a); });
  if (!back) f('after the sheet closed, Tab did not land on the page');
  return fails;
}

// ---- runner ---------------------------------------------------------------------------------------------------------------
async function scanOne(browser, name, s, [w, h]) {
  const fails = [];
  const tag = `${name} ${w}x${h}`;
  const shotBase = SHOTS ? path.join(SHOTS, `${name}-${w}x${h}`) : null;
  // 1. normal: static scan, focus walk, act (signal, sound), sheet
  {
    const { ctx, page: p, errors } = await openApp(browser, { fixture: s.fixture || 'midway', width: w, height: h, scale: SHOTS ? 2 : 1, speed: 1 });
    await ctx.addInitScript(pageInit);
    await p.reload();
    await p.waitForSelector('#app *', { timeout: 10000 });
    await p.waitForTimeout(300);
    await p.evaluate(() => window.__a11y.wrapSound());
    await p.evaluate(pageSignal);
    await s.run(p);
    await p.waitForTimeout(300);
    const r = await p.evaluate(pageScan, { adult: !!s.adult, main: s.main || '', allow: ALLOW, v: VERBOSE });
    fails.push(...r.fails);
    if (VERBOSE) for (const i of r.info) console.log('    ' + tag + ' ' + i);
    if (shotBase) await p.screenshot({ path: shotBase + '.png' });
    const fw = await focusWalk(p, shotBase);
    fails.push(...fw.fails);
    if (VERBOSE) console.log(`    ${tag} focus stops: ${fw.stops.length}`);
    if (s.act) {
      await p.evaluate(() => { document.activeElement && document.activeElement.blur(); });
      const res = await s.act(p);
      for (const x of res) fails.push(...x);
    }
    fails.push(...(await p.evaluate(pageSound)));
    if (s.sheet) {
      // start the screen again clean (an overlay the first run left open would sit under the new one)
      await p.evaluate(() => document.querySelectorAll('.ovl, .sheet-bg').forEach(e => e.remove()));
      await s.run(p);
      await p.waitForTimeout(300);
      const o = await s.sheet(p);
      if (shotBase) await p.screenshot({ path: shotBase + '-sheet.png' });
      fails.push(...(await sheetCheck(p, o.close)));
    }
    for (const e of errors) fails.push({ rule: 'error', what: '', msg: e });
    await ctx.close();
  }
  // 2. reduced motion, 3. Calm mode
  for (const mode of ['reduced-motion', 'calm']) {
    const { ctx, page: p } = await openApp(browser, { fixture: s.fixture || 'midway', width: w, height: h, speed: 1 });
    if (mode == 'reduced-motion') await p.emulateMedia({ reducedMotion: 'reduce' });
    else await p.evaluate(() => { S.calm = true; save(); calmApply(true); });
    await p.evaluate(pageInit);
    await p.evaluate(pageSignal);
    await p.evaluate(() => { window.say = () => {}; });
    const run = s.run(p);
    await wait(150);
    fails.push(...(await motionCheck(p, mode)));
    await run;
    fails.push(...(await motionCheck(p, mode)));
    if (s.act) {
      try { await s.act(p); } catch (e) { fails.push({ rule: 'error', what: mode, msg: 'act: ' + e.message }); }
      fails.push(...(await motionCheck(p, mode)));
    }
    await ctx.close();
  }
  return fails.map(f => Object.assign(f, { tag }));
}

async function main() {
  const args = process.argv.slice(2).filter(a => !a.startsWith('-'));
  const sizeArg = process.argv.find(a => a.startsWith('--size='));
  const sizes = sizeArg ? [sizeArg.slice(7).split('x').map(Number)] : SIZES;
  const names = args.length ? args : Object.keys(SCREENS);
  for (const n of names) if (!SCREENS[n]) { console.error('unknown screen ' + n + '; screens: ' + Object.keys(SCREENS).join(' ')); process.exit(2); }
  for (const n of NAMED) if (!SCREENS[n]) throw new Error('named screen missing: ' + n);
  if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });
  const all = [];
  // contrast (token pairs)
  try {
    execFileSync('node', [path.join(__dirname, 'contrast.js')], { stdio: 'pipe' });
    console.log('a11y contrast: tools/contrast.js passes');
  } catch (e) {
    const lines = String(e.stdout).split('\n').filter(l => l.startsWith('FAIL'));
    for (const l of lines) all.push({ tag: 'tokens', rule: 'contrast', what: '', msg: l });
  }
  const browser = await launch();
  const t0 = Date.now();
  try {
    const jobs = [];
    for (const size of sizes) for (const n of names) jobs.push([n, size]);
    let next = 0;
    const PAR = +process.env.A11Y_PAR || 2;
    const worker = async () => {
      while (next < jobs.length) {
        const [n, size] = jobs[next++];
        let f;
        try { f = await scanOne(browser, n, SCREENS[n], size); } catch (e) { f = [{ tag: `${n} ${size.join('x')}`, rule: 'error', what: '', msg: e.message.split('\n')[0] }]; }
        console.log(`a11y ${n} ${size.join('x')}: ${f.length ? f.length + ' failure(s)' : 'ok'}`);
        for (const x of f) console.log(`  FAIL ${x.tag} ${x.rule}: ${x.what ? x.what + ': ' : ''}${x.msg}`);
        all.push(...f);
      }
    };
    await Promise.all(Array.from({ length: PAR }, worker));
  } finally {
    await browser.close();
  }
  const by = {};
  for (const f of all) by[f.rule] = (by[f.rule] || 0) + 1;
  console.log(`a11y: ${names.length} screens x ${sizes.length} sizes in ${Math.round((Date.now() - t0) / 1000)} s; ` +
    (all.length ? `${all.length} failure(s): ` + Object.entries(by).map(([k, v]) => k + ' ' + v).join(', ') : 'zero failures'));
  process.exit(all.length ? 1 : 0);
}

module.exports = { SCREENS, NAMED };
if (require.main === module) main().catch(e => { console.error(e); process.exit(1); });
