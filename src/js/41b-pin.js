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
      if (r == 'ok') { p.close(); then(); return; }
      SFX.wrong();
      p.msg(r == 'locked' ? PIN.lockLine() : "That's not the PIN. Try again.");
    } });
  },
  // choose a PIN and type it again; then() runs once it is saved (or could not be: storage full never locks a grown-up out)
  choose(then, title, line) {
    return PIN.pad({ title, line, done: (v, p) => {
      p.close();
      PIN.pad({ title: 'Type it again', line: 'Type the same 4 numbers again.', done: (w, q) => {
        q.close();
        if (w !== v) { SFX.wrong(); PIN.choose(then, title, "They didn't match. Choose a PIN again."); return; }
        if (PIN.set(v)) fb('PIN saved', 'info');
        else fb("The PIN could not be saved: the tablet's storage is full.", 'warn long', 3000);
        then();
      } });
    } });
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
    let v = '', busy = false;
    const el = s.el, dots = () => {
      el.querySelectorAll('.pn-dots i').forEach((d, i) => d.classList.toggle('on', i < v.length));
      el.querySelector('#pndots').setAttribute('aria-label', v.length + ' of 4 numbers typed');
    };
    const p = { close: s.close, msg: t => { el.querySelector('#pnmsg').textContent = t; }, clear: () => { v = ''; dots(); } };
    const push = d => {
      if (busy || v.length >= PIN.LEN) return;
      SFX.click();
      v += d;
      dots();
      if (v.length < PIN.LEN) return;
      busy = true;
      setTimeout(() => { busy = false; const w = v; v = ''; o.done(w, p); dots(); }, 150); // the last dot shows first
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
