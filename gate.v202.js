/* Whistlestop gate v202. BUILT by tools/build.py from 41b-pin.css, 41c-kidpw.css, 41d-parent.css, 41b-pin.js, 41c-kidpw.js, 41d-parent.js: never edit by hand.
   index.html v202 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v202.js. */
(function(){var s=document.createElement('style');s.id='css-gate';s.textContent="/* RC-1: the Grown-ups PIN pad and Forgot PIN? (41b-pin.js). Tokens only. */\n.pn{text-align:center}\n.pn-line{min-height:3em;margin:0 0 var(--s-2);color:var(--ink-2);font-weight:700}\n.pn-dots{display:flex;justify-content:center;gap:var(--s-3);margin:0 0 var(--s-3)}\n.pn-dots i{width:18px;height:18px;border-radius:50%;box-shadow:inset 0 0 0 3px var(--ink-3)}\n.pn-dots i.on{background:var(--brand);box-shadow:inset 0 0 0 3px var(--brand)}\n.pn-keys{display:grid;grid-template-columns:repeat(3,minmax(64px,88px));justify-content:center;gap:var(--s-2);margin:0 0 var(--s-3)}\n.btn.pn-k{min-height:56px;padding:0;font-family:var(--font-display);font-size:var(--fs-5);font-weight:700}\n.btn.pn-k .ic{width:26px;height:26px}\n.btn.pn-fg{min-height:56px;padding:0 var(--s-1);font-size:var(--fs-1);line-height:1.15;white-space:normal}\n.pn-q{font-size:var(--fs-5)}\n.pn-q input{width:5.2ch}\n/* RC-1: the children's picture passwords (41c-kidpw.js, part gate). Tokens only. */\n.kp{text-align:center}\n.kp-dots{display:flex;justify-content:center;gap:var(--s-3);margin:0 0 var(--s-3)}\n.kp-dots i{width:20px;height:20px;border-radius:50%;box-shadow:inset 0 0 0 3px var(--ink-3)}\n.kp-dots i.on{background:var(--brand);box-shadow:inset 0 0 0 3px var(--brand)}\n.kp-dots.kp-no{animation:k-shake .4s var(--ease)}\nhtml.calm .kp-dots.kp-no{animation:none}\n@media (prefers-reduced-motion:reduce){.kp-dots.kp-no{animation:none}}\n.kp-grid{display:grid;grid-template-columns:repeat(3,minmax(64px,84px));justify-content:center;gap:var(--s-2);margin:0 0 var(--s-3)}\n.btn.kp-p{min-height:72px;padding:var(--s-1)}\n.btn.kp-p .art{width:56px;height:56px}\n.kp-row{display:flex;justify-content:center;flex-wrap:wrap;gap:var(--s-3);min-height:48px;margin:0 0 var(--s-2)}\n.kp-one{display:inline-flex;flex-direction:column;align-items:center;gap:2px;font-weight:700;color:var(--ink-2)}\n/* PARENT-11: the Parent corner of the report card and its certificate (41d-parent.js, part gate). Tokens only; classes start with pc-. */\n.pc-wk{margin:0;padding-left:var(--s-5)}\n.pc-wk li{margin-bottom:var(--s-2);line-height:var(--lh-2)}\n.pc-dq{margin:0;padding-left:var(--s-6)}\n.pc-dq li{margin-bottom:var(--s-3);padding-left:var(--s-1)}\n.pc-dq li::marker{font-weight:700;color:var(--brand)}\n.pc-q{margin:0 0 var(--s-1);font-size:var(--fs-3);line-height:var(--lh-3);font-weight:700}\n#pc-cert{display:inline-flex;align-items:center;gap:var(--s-2);min-height:var(--tap)}\n.rp-h3 .ic{vertical-align:-4px}\n/* the certificate: a framed card on screen, one landscape page in print */\n.pc-cv{padding:var(--s-4)}\n.pc-sheet{max-width:900px;margin:0 auto;background:var(--surface);border:6px solid var(--brand);border-radius:var(--r-card);padding:var(--s-2);\n  box-shadow:var(--shadow);overflow-wrap:anywhere;color:var(--ink)}\n.pc-in{border:2px solid var(--star-shade);border-radius:var(--r-btn);padding:var(--s-5) var(--s-4);text-align:center;\n  background:linear-gradient(var(--glow-warm),var(--surface) 40%);display:flex;flex-direction:column;align-items:center;gap:var(--s-2)}\n.pc-logo{font-size:var(--fs-4)}\n.pc-logo .wl-mk{width:40px;height:40px}\n.pc-ct{margin:var(--s-1) 0 0;font-family:var(--font-display);font-size:clamp(28px,6vw,44px);line-height:var(--lh-6);color:var(--brand-shade);letter-spacing:.02em}\n.pc-to,.pc-for{margin:0;font-size:var(--fs-3);color:var(--ink-2)}\n.pc-nm{margin:var(--s-1) 0;font-size:clamp(36px,9vw,64px);font-weight:700;line-height:var(--lh-7);color:var(--ink);\n  border-bottom:3px solid var(--star);padding:0 var(--s-4) var(--s-1);min-width:60%}\n.pc-blank{min-height:1.1em}\n.pc-ach{list-style:none;margin:var(--s-2) 0 0;padding:0;display:flex;flex-wrap:wrap;justify-content:center;gap:var(--s-2)}\n.pc-ach li{display:flex;align-items:center;gap:var(--s-2);background:var(--surface-2);border-radius:var(--r-pill);padding:var(--s-1) var(--s-4);\n  font-size:var(--fs-3);font-weight:700}\n.pc-ach i{flex:0 0 14px;height:14px;border-radius:50%;background:var(--brand)}\n.pc-a-math i{background:var(--math)}\n.pc-a-read i{background:var(--read)}\n.pc-a-es i{background:var(--es)}\n.pc-a-disc i{background:var(--disc)}\n.pc-a-ls i{background:var(--star-shade)}\n.pc-a-ms i{background:var(--bt)}\n.pc-foot{display:flex;align-items:flex-end;justify-content:space-between;gap:var(--s-4);width:100%;margin-top:var(--s-3)}\n.pc-f{flex:1 1 0;display:flex;flex-direction:column;align-items:center;min-width:0}\n.pc-fv{display:block;width:100%;min-height:1.5em;border-bottom:2px solid var(--ink-3);font-size:var(--fs-3);padding-bottom:var(--s-1)}\n.pc-fl{font-size:var(--fs-1);color:var(--ink-3);margin-top:var(--s-1)}\n.pc-ros{flex:0 0 auto;width:84px;height:auto}\n.pc-r-t1{fill:var(--brand)}\n.pc-r-t2{fill:var(--brand-shade)}\n.pc-r-s{fill:var(--star-shade)}\n.pc-r-c1{fill:var(--star)}\n.pc-r-c2{fill:var(--star-tint);stroke:var(--star-shade);stroke-width:2}\n.pc-r-st{fill:var(--star-shade)}\n@media (max-width:480px){\n  .pc-cv{padding:var(--s-2)}\n  .pc-in{padding:var(--s-4) var(--s-2)}\n  .pc-ach li{font-size:var(--fs-2)}\n  .pc-foot{gap:var(--s-2)}\n  .pc-ros{width:64px}\n}\n/* print: only the certificate, on one landscape page (a named page, so the report card's own printing is unchanged) */\n@page pccert{size:landscape;margin:10mm}\n@media print{\n  body:has(.pc-cv)>:not(#app){display:none!important}\n  .pc-cv{padding:0!important}\n  .pc-sheet{page:pccert;max-width:none;width:100%;min-height:182mm;box-sizing:border-box;box-shadow:none;break-inside:avoid;\n    -webkit-print-color-adjust:exact;print-color-adjust:exact}\n  .pc-in{min-height:calc(182mm - 2*var(--s-2) - 12px);box-sizing:border-box;justify-content:space-between;padding:6mm 8mm}\n  .pc-ct{font-size:30pt}\n  .pc-nm{font-size:36pt}\n  .pc-to,.pc-for,.pc-ach li,.pc-fv{font-size:13pt}\n  .pc-ach li{padding:1mm 4mm}\n  .pc-ros{width:24mm}\n}\n";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)
/* ---------- RC-1 (owner decision 2026-11-19): the Grown-ups PIN ----------
   A 4-digit PIN is the way into Grown-ups and into everything NAV.quiz guards (the Unlock sheet, Erase everything, deleting a child).
   It belongs to the tablet, not a child: its own key PIN.KEY (like the Play unlock), so Start over keeps it and no backup carries it.
   Only a salted hash is kept: {v: 1, s: salt, h: hash, n: wrong PINs in a row, k: lockouts so far, t: locked until (ms),
   f: Forgot PIN waits until (ms)}.
     A new tablet: the grown-up chooses the PIN in first setup (suPin, 46-home.js; PIN-SETUP, owner decision 2026-11-25).
     No PIN yet (a save from before that, or setup could not load this part): the old times-table question (NAV.askQ) guards that
     first entry, then the grown-up chooses a PIN and types it twice. Nobody is locked out and no progress changes.
     5 wrong PINs in a row: wait 1, 5, 15, 30, then 60 minutes; never for good, and Forgot PIN? stays on the pad.
     Forgot PIN?: three 2-digit x 2-digit multiplications, typed, all right; a miss waits 15 minutes. Then a new PIN; nothing else
     changes. The owner's recovery design: a speed bump, not security (Google Play's own purchase check still guards payments).
   The pad: 48 px digit buttons named by their words for screen readers, dots for the digits typed; the PIN is never said or shown. */
const PIN = {
  KEY: KEY + '-pin',
  LEN: 4,
  TRIES: 5,
  WAIT: [1, 5, 15, 30, 60], // minutes, one more step after each 5 wrong PINs
  FORGOT_WAIT: 15,
  WORDS: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
  get() { const o = PRF.obj(PRF.get(PIN.KEY)); return o && o.v === 1 ? o : { v: 1 }; },
  put(o) { return PRF.put(PIN.KEY, JSON.stringify(o)); },
  has() { const o = PIN.get(); return typeof o.h == 'string' && typeof o.s == 'string'; },
  // RC-2: a wait is running only while it ends no later than its longest length from now: a wait stored longer than that (the clock was
  // set back, or was far ahead when it was set) has expired, so a lockout can never last for good. max in minutes
  waits(t, max) { const d = (+t || 0) - Date.now(); return d > 0 && d <= max * 60000; },
  locked(o) { return PIN.waits(o.t, PIN.WAIT[PIN.WAIT.length - 1]); },
  noteR: 0, // RC-2: when the PIN was last reset with Forgot PIN (shown once in Grown-ups: "Your PIN was reset ...")
  // a slow (2000 rounds), salted 64-bit hash: the PIN cannot be read from storage at a glance
  hash(pin, salt) {
    const t = salt + ':' + pin;
    let a = 0x6a09e667 | 0, b = 0x3c6ef372 | 0;
    for (let r = 0; r < 2000; r++) for (let i = 0; i < t.length; i++) {
      const c = t.charCodeAt(i) + r;
      a = Math.imul(a ^ c, 2654435761);
      b = Math.imul(b ^ c, 1597334677);
      a ^= b >>> 15;
      b ^= a >>> 13;
    }
    return (a >>> 0).toString(16).padStart(8, '0') + (b >>> 0).toString(16).padStart(8, '0');
  },
  salt() {
    const u = [0, 0];
    try { const r = new Uint32Array(2); crypto.getRandomValues(r); u[0] = r[0]; u[1] = r[1]; }
    catch (e) { u[0] = Math.floor(Math.random() * 4294967296); u[1] = Date.now() >>> 0; }
    return u.map(x => x.toString(16).padStart(8, '0')).join('');
  },
  // a new PIN: lockouts and the Forgot PIN wait start again. false when storage is full
  set(pin) { const s = PIN.salt(); return PIN.put({ v: 1, s, h: PIN.hash(pin, s) }); },
  // 'ok' | 'wrong' | 'locked' (a wait is running: nothing is counted)
  check(pin) {
    const o = PIN.get(), now = Date.now();
    if (PIN.locked(o)) return 'locked';
    if (PIN.hash(String(pin), o.s) === o.h) {
      if (o.r) PIN.noteR = o.r; // RC-2: the next Grown-ups entry after a Forgot PIN reset says so
      PIN.put({ v: 1, s: o.s, h: o.h, f: o.f });
      return 'ok';
    }
    o.n = (o.n | 0) + 1;
    if (o.n >= PIN.TRIES) { o.t = now + PIN.WAIT[Math.min(o.k | 0, PIN.WAIT.length - 1)] * 60000; o.k = (o.k | 0) + 1; o.n = 0; }
    PIN.put(o);
    return PIN.locked(o) ? 'locked' : 'wrong';
  },
  mins(t) { const m = Math.max(1, Math.ceil((t - Date.now()) / 60000)); return m + (m == 1 ? ' minute' : ' minutes'); },
  lockLine() { return 'Too many wrong PINs. Try again in ' + PIN.mins(PIN.get().t) + ', or tap Forgot PIN?'; },

  // the way in (NAV.quiz): no PIN yet: the old question, then choose one; else the PIN
  gate(then) {
    PIN.noteR = 0; // RC-2: the Forgot PIN note is shown on one entry only (the one right after the next right PIN)
    if (!PIN.has()) return NAV.askQ(() => PIN.choose(then, 'Choose a Grown-ups PIN', 'Pick 4 numbers. The PIN keeps children out of the settings.'));
    return PIN.enter(then);
  },
  enter(then, title = 'Grown-ups PIN') {
    const o = PIN.get();
    return PIN.pad({ title, line: PIN.locked(o) ? PIN.lockLine() : 'Type your 4-digit PIN.', forgot: then, done: (v, p) => {
      const r = PIN.check(v);
      if (r == 'ok') { p.close(); then(1); return; } // 1: the PIN itself was typed (OWNER-1127, NAV.pinT)
      SFX.wrong();
      p.msg(r == 'locked' ? PIN.lockLine() : "That's not the PIN. Try again.");
    } });
  },
  // choose a PIN and type it again; then() runs once it is saved (or could not be: storage full never locks a grown-up out)
  // SAMPLE-10MIN: one pad for both entries (p.next changes its words), so a grown-up typing the PIN twice at a normal pace (a tap
  // every quarter second) loses no digit: a closing pad and a new one opening under the finger dropped the second entry's first digit
  choose(then, title, line) {
    const first = (v, p) => p.next({ title: 'Type it again', line: 'Type the same 4 numbers again.', done: (w, q) => {
      if (w !== v) { SFX.wrong(); q.next({ title, line: "They didn't match. Choose a PIN again.", done: first }); return; }
      q.close();
      if (PIN.set(v)) fb('PIN saved', 'info');
      else fb("The PIN could not be saved: the tablet's storage is full.", 'warn long', 3000);
      then();
    } });
    return PIN.pad({ title, line, done: first });
  },
  // Grown-ups: Change PIN needs the PIN in use
  change() { PIN.enter(() => PIN.choose(() => grown(), 'New PIN', 'Pick 4 new numbers.'), 'Your PIN now'); },

  // the pad. o: {title, line, done(pin, pad), forgot (where a recovered PIN goes, or none)}. Returns the sheet
  pad(o) {
    const key = d => `<button class="btn pn-k" data-k="${d}" aria-label="${PIN.WORDS[d]}">${d}</button>`;
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(key).join('') +
      (o.forgot ? '<button class="btn ghost pn-fg" id="pnforgot">Forgot PIN?</button>' : '<span></span>') + key(0) +
      `<button class="btn pn-k pn-del" id="pnback" aria-label="Delete">${ico('backspace', 26)}</button>`;
    const s = UI.sheet(`<div class="pn" id="pnpad"><h2>${esc(o.title)}</h2><p class="pn-line" id="pnmsg" role="status">${esc(o.line)}</p>` +
      `<div class="pn-dots" id="pndots" role="img" aria-label="0 of 4 numbers typed">${'<i></i>'.repeat(PIN.LEN)}</div>` +
      `<div class="pn-keys">${keys}</div><div class="acts">${UI.btn('Cancel', { kind: 'ghost', wide: true, id: 'pnno' })}</div></div>`);
    let v = '', busy = false, early = [];
    const el = s.el, dots = () => {
      el.querySelectorAll('.pn-dots i').forEach((d, i) => d.classList.toggle('on', i < v.length));
      el.querySelector('#pndots').setAttribute('aria-label', v.length + ' of 4 numbers typed');
    };
    const p = { close: s.close, msg: t => { el.querySelector('#pnmsg').textContent = t; }, clear: () => { v = ''; dots(); },
      // SAMPLE-10MIN: the same pad asks again with new words (choose: "Type it again", a mismatch)
      next: n => { o.done = n.done; el.querySelector('h2').textContent = n.title; p.msg(n.line); p.clear(); } };
    const push = d => {
      // SAMPLE-10MIN: a digit typed while the 4th dot shows is kept for the pad's next entry (it was lost)
      if (busy) { if (early.length < PIN.LEN) early.push(d); return; }
      if (v.length >= PIN.LEN) return;
      SFX.click();
      v += d;
      dots();
      if (v.length < PIN.LEN) return;
      busy = true;
      setTimeout(() => {
        busy = false; const w = v; v = ''; o.done(w, p); dots();
        const e = early; early = [];
        if (!s.el.parentNode._closing) e.forEach(push); // not after the pad closed (a right PIN, Cancel, the backdrop)
      }, 150); // the last dot shows first
    };
    el.querySelectorAll('[data-k]').forEach(b => { b.onclick = () => push(b.dataset.k); });
    el.querySelector('#pnback').onclick = () => { if (!busy) { v = v.slice(0, -1); dots(); } };
    el.querySelector('#pnno').onclick = s.close;
    if (o.forgot) el.querySelector('#pnforgot').onclick = () => { s.close(); PIN.forgot(o.forgot); };
    el.addEventListener('keydown', e => {
      if (/^[0-9]$/.test(e.key)) { push(e.key); e.preventDefault(); }
      else if (e.key == 'Backspace') { el.querySelector('#pnback').click(); e.preventDefault(); }
    });
    s.pad = p;
    NAV.gateSheet = s;
    return s;
  },

  // RC-2: mark a PIN reset with Forgot PIN (its time, r), so the next Grown-ups entry by the PIN says so
  stamp(r0) {
    const x = PIN.get();
    if (r0) PIN.noteR = r0;
    if (PIN.has()) { x.r = Date.now(); PIN.put(x); }
  },
  // Forgot PIN?: three 2-digit x 2-digit multiplications, typed; all right: choose a new PIN, then go where the PIN was going
  forgot(then) {
    const o = PIN.get();
    if (PIN.waits(o.f, PIN.FORGOT_WAIT)) {
      const w = UI.sheet(`<div class="pn"><h2>Forgot PIN?</h2><p class="pn-line" role="status">Not yet. Try again in ${PIN.mins(o.f)}.</p>` +
        `<div class="acts">${UI.btn('OK', { kind: 'primary', wide: true, id: 'pfok' })}</div></div>`);
      w.el.querySelector('#pfok').onclick = w.close;
      NAV.gateSheet = w;
      return w;
    }
    const qs = [0, 1, 2].map(() => [R(12, 99), R(12, 99)]);
    const s = UI.sheet(`<div class="pn pn-forgot"><h2>Forgot PIN?</h2><p>Answer all three to choose a new PIN. All progress is kept.</p>` +
      qs.map(([a, b], i) => `<label class="nv-q pn-q"><span>${a} × ${b} =</span><input id="pfa${i}" type="text" inputmode="numeric" ` +
        `pattern="[0-9]*" maxlength="4" autocomplete="off" aria-label="${a} times ${b}"></label>`).join('') +
      `<p class="nv-msg" id="pfmsg" role="status"></p><div class="acts">${UI.btn('Check', { kind: 'primary', size: 'lg', wide: true, icon: 'check', id: 'pfgo' })}` +
      `${UI.btn('Cancel', { kind: 'ghost', wide: true, id: 'pfno' })}</div></div>`);
    const go = () => {
      const ok = qs.every(([a, b], i) => s.el.querySelector('#pfa' + i).value.trim() === String(a * b));
      if (ok) {
        s.close();
        const r0 = PIN.get().r; // an earlier reset nobody has seen yet is shown now
        PIN.choose(() => { PIN.stamp(r0); then(); }, 'Choose a new PIN', 'Pick 4 numbers. Use them next time.');
        return;
      }
      SFX.wrong();
      const x = PIN.get();
      x.f = Date.now() + PIN.FORGOT_WAIT * 60000;
      PIN.put(x);
      s.el.querySelector('#pfmsg').textContent = 'Not quite. You can try again in ' + PIN.FORGOT_WAIT + ' minutes.';
      s.el.querySelector('#pfgo').disabled = true;
    };
    s.el.querySelector('#pfgo').onclick = go;
    s.el.querySelector('#pfno').onclick = s.close;
    s.ans = qs.map(([a, b]) => a * b); // for tests
    NAV.gateSheet = s;
    return s;
  },
};
/* ---------- RC-1 (owner decision 2026-11-19): a picture password for each child (part gate) ----------
   With more than one child, siblings could play as each other. A child may have a picture password: 3 pictures in order from a grid of
   9 drawn pictures (a Pre-K child can tell them apart; repeats allowed). A grown-up turns it on, changes or turns it off in Grown-ups
   (behind the PIN), per child; off for every child until then. On "Who is playing?" (PRF.pick) a child whose password is on gets the
   grid: a picture says its name when tapped, the dots fill (never the pictures), the right 3 open that child. A wrong try shakes the dots
   (not in calm mode or reduced motion) and says "Not quite. Try again!"; 5 wrong tries wait 1 minute. "Grown-up help" asks for the
   Grown-ups PIN, then opens the child, shows their pictures, or turns the password off. Grown-ups' own "Who is playing?" asks none.
   Stored in the profile index (PRF.IDX: pw = {slot: {s: salt, h: hash, n: wrong tries in a row, t: wait until (ms)}}), never in S: Start
   over keeps it, no backup carries it, deleting the child drops it (PRF.writeIdx). The hash is PIN.hash; with only 729 orders it is no
   lock against a grown-up with the code, and "show the pictures" finds the order by trying each one (behind the PIN). */
const KPW = {
  PICS: ['dog', 'star', 'apple', 'car', 'fish', 'sun', 'ball', 'tree', 'cake'],
  LEN: 3,
  TRIES: 5,
  WAIT: 60000,
  idx() { return PRF.obj(PRF.get(PRF.IDX)) || { v: 1, ids: PRF.ids, cur: PRF.cur }; },
  of(id) { const o = PRF.obj(PRF.get(PRF.IDX)), x = o && o.pw && o.pw[id]; return x && typeof x.h == 'string' && typeof x.s == 'string' ? x : null; },
  write(id, x) {
    const o = KPW.idx(), pw = Object.assign({}, o.pw && typeof o.pw == 'object' ? o.pw : {});
    if (x) pw[id] = x; else delete pw[id];
    if (Object.keys(pw).length) o.pw = pw; else delete o.pw;
    return PRF.put(PRF.IDX, JSON.stringify(o));
  },
  key: seq => seq.join(','),
  set(id, seq) { const s = PIN.salt(); return KPW.write(id, { s, h: PIN.hash(KPW.key(seq), s) }); },
  off(id) { return KPW.write(id, null); },
  // 'ok' | 'wrong' | 'locked' (a wait is running: nothing is counted)
  check(id, seq) {
    const x = KPW.of(id), now = Date.now();
    if (!x) return 'ok';
    if (PIN.waits(x.t, KPW.WAIT / 60000)) return 'locked'; // RC-2: a wait stored longer than 1 minute has expired (a clock change)
    if (PIN.hash(KPW.key(seq), x.s) === x.h) { KPW.write(id, { s: x.s, h: x.h }); return 'ok'; }
    x.n = (x.n | 0) + 1;
    if (x.n >= KPW.TRIES) { x.t = now + KPW.WAIT; x.n = 0; }
    KPW.write(id, x);
    return PIN.waits(x.t, KPW.WAIT / 60000) ? 'locked' : 'wrong';
  },
  // the order, found by trying every one (Grown-up help, behind the PIN)
  find(id) {
    const x = KPW.of(id), P = KPW.PICS;
    if (!x) return null;
    for (const a of P) for (const b of P) for (const c of P) if (PIN.hash(KPW.key([a, b, c]), x.s) === x.h) return [a, b, c];
    return null;
  },
  name: id => PRF.label(PRF.info(id)),
  grid: () => KPW.PICS.map(w => `<button class="btn kp-p" data-pic="${w}" aria-label="${w}">${picArt(w, 56)}</button>`).join(''),
  dots: () => `<div class="kp-dots" id="kpdots" role="img" aria-label="0 of 3 pictures">${'<i></i>'.repeat(KPW.LEN)}</div>`,
  // the child's grid on "Who is playing?"; go: open that child
  ask(id, go) {
    const nm = esc(KPW.name(id)), line = 'Tap your 3 secret pictures.';
    const s = UI.sheet(`<div class="kp" id="kpask"><h2>${nm}'s secret pictures</h2><p class="pn-line" id="kpmsg" role="status">${line}</p>${KPW.dots()}` +
      `<div class="kp-grid">${KPW.grid()}</div><div class="acts">${UI.btn('Grown-up help', { kind: 'ghost', size: 'sm', icon: 'help', id: 'kphelp' })}` +
      `${UI.btn('Back', { kind: 'ghost', wide: true, id: 'kpno' })}</div></div>`);
    const el = s.el, seq = [], msg = t => { el.querySelector('#kpmsg').textContent = t; };
    const fill = () => {
      el.querySelectorAll('.kp-dots i').forEach((d, i) => d.classList.toggle('on', i < seq.length));
      el.querySelector('#kpdots').setAttribute('aria-label', seq.length + ' of 3 pictures');
    };
    const x0 = KPW.of(id);
    const w0 = x0 && PIN.waits(x0.t, KPW.WAIT / 60000);
    if (w0) msg('Wait a minute, then try again.');
    say(w0 ? 'Wait a minute, then try again.' : line);
    el.querySelectorAll('[data-pic]').forEach(b => b.onclick = () => {
      if (seq.length >= KPW.LEN) return;
      say(b.dataset.pic, b);
      seq.push(b.dataset.pic);
      fill();
      if (seq.length < KPW.LEN) return;
      setTimeout(() => {
        const r = KPW.check(id, seq.splice(0));
        if (r == 'ok') { s.close(); go(); return; }
        fill();
        SFX.wrong();
        const d = el.querySelector('#kpdots');
        d.classList.remove('kp-no');
        void d.offsetWidth;
        d.classList.add('kp-no');
        const t = r == 'locked' ? 'Wait a minute, then try again.' : 'Not quite. Try again!';
        msg(t);
        say(t);
      }, 250);
    });
    el.querySelector('#kpno').onclick = s.close;
    el.querySelector('#kphelp').onclick = () => { s.close(); NAV.quiz(() => KPW.help(id, go)); };
    s.seq = seq;
    return s;
  },
  // Grown-up help (after the PIN): open the child now, show the pictures, or turn the password off
  help(id, go) {
    const nm = esc(KPW.name(id));
    const s = UI.sheet(`<div class="kp"><h2>Help for ${nm}</h2><div id="kpshow"></div><div class="acts">` +
      UI.btn('Open ' + KPW.name(id) + ' now', { kind: 'primary', wide: true, icon: 'play', id: 'kpopen' }) +
      UI.btn('Show the pictures', { wide: true, icon: 'eye', id: 'kpsee' }) +
      UI.btn('Turn the picture password off', { kind: 'ghost', wide: true, icon: 'trash', id: 'kpoff' }) +
      UI.btn('Cancel', { kind: 'ghost', wide: true, id: 'kpno' }) + '</div></div>');
    s.el.querySelector('#kpopen').onclick = () => { s.close(); go(); };
    s.el.querySelector('#kpsee').onclick = () => {
      const q = KPW.find(id);
      s.el.querySelector('#kpshow').innerHTML = q ? `<p class="gw-p">In this order:</p><div class="kp-row">${q.map((w, i) =>
        `<span class="kp-one">${picArt(w, 48)}<span>${i + 1}. ${w}</span></span>`).join('')}</div>` : '<p class="gw-p">No picture password.</p>';
    };
    s.el.querySelector('#kpoff').onclick = () => { KPW.off(id); s.close(); fb('Picture password off for ' + KPW.name(id), 'info'); };
    s.el.querySelector('#kpno').onclick = s.close;
    return s;
  },
  // Grown-ups (already behind the PIN): choose a child's 3 pictures, then Save or Start again
  setup(id, then) {
    const nm = esc(KPW.name(id)), seq = [];
    const s = UI.sheet(`<div class="kp"><h2>Pictures for ${nm}</h2><p class="pn-line" id="kpmsg" role="status">Pick 3 pictures in order. Show ${nm} which ones.</p>` +
      `<div class="kp-row" id="kpsel"></div><div class="kp-grid">${KPW.grid()}</div><div class="acts">` +
      UI.btn('Save', { kind: 'primary', wide: true, icon: 'check', id: 'kpsave', off: true }) + UI.btn('Start again', { kind: 'ghost', wide: true, id: 'kpagain' }) +
      UI.btn('Cancel', { kind: 'ghost', wide: true, id: 'kpno' }) + '</div></div>');
    const el = s.el, show = () => {
      el.querySelector('#kpsel').innerHTML = seq.map((w, i) => `<span class="kp-one">${picArt(w, 40)}<span>${i + 1}. ${w}</span></span>`).join('');
      el.querySelector('#kpsave').disabled = seq.length < KPW.LEN;
    };
    el.querySelectorAll('[data-pic]').forEach(b => b.onclick = () => { if (seq.length < KPW.LEN) { say(b.dataset.pic, b); seq.push(b.dataset.pic); show(); } });
    el.querySelector('#kpagain').onclick = () => { seq.length = 0; show(); };
    el.querySelector('#kpno').onclick = s.close;
    el.querySelector('#kpsave').onclick = () => {
      if (seq.length < KPW.LEN) return;
      s.close();
      if (!KPW.set(id, seq)) return fb("It could not be saved: the tablet's storage is full.", 'warn');
      fb('Picture password on for ' + KPW.name(id), 'info');
      if (then) then();
    };
    s.seq = seq;
    return s;
  },
  // Grown-ups, the Children card: each child's picture password (Set up / Change, Turn off)
  grownFill() {
    const box = $('#gw-kpw');
    if (!box || !PRF.many()) return;
    const anyOff = PRF.ids.some(id => !KPW.of(id));
    box.innerHTML = `<h3 class="gw-h3">${ico('lock', 22, 'ic-brand')}<span>Picture passwords</span></h3>` +
      `<p class="gw-sub">${anyOff ? 'So children cannot play as each other, each child can have 3 secret pictures. Set them up here.' : 'Each child opens with their 3 secret pictures.'}</p>` +
      PRF.ids.map(id => {
        const on = !!KPW.of(id), nm = KPW.name(id);
        return `<div class="gw-row"><span class="gw-rl">${esc(nm)}: ${on ? 'on' : 'off'}</span><span class="gw-btns">` +
          UI.btn(on ? 'Change' : 'Set up', { size: 'sm', icon: 'edit', attrs: `data-kpset="${id}" aria-label="${on ? 'Change' : 'Set up'} the picture password of ${esc(nm)}"` }) +
          (on ? UI.btn('Turn off', { size: 'sm', kind: 'ghost', icon: 'trash', attrs: `data-kpoff="${id}" aria-label="Turn off the picture password of ${esc(nm)}"` }) : '') +
          '</span></div>';
      }).join('');
    box.querySelectorAll('[data-kpset]').forEach(b => b.onclick = () => KPW.setup(b.dataset.kpset, KPW.grownFill));
    box.querySelectorAll('[data-kpoff]').forEach(b => b.onclick = () => { KPW.off(b.dataset.kpoff); KPW.grownFill(); });
  },
};
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

var GATE_VER='v202'; // last line: the whole file ran (checked by dataReady() before the app starts)
