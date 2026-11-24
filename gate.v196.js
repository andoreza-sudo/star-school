/* Whistlestop gate v196. BUILT by tools/build.py from 41b-pin.css, 41c-kidpw.css, 41b-pin.js, 41c-kidpw.js: never edit by hand.
   index.html v196 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v196.js. */
(function(){var s=document.createElement('style');s.id='css-gate';s.textContent="/* RC-1: the Grown-ups PIN pad and Forgot PIN? (41b-pin.js). Tokens only. */\n.pn{text-align:center}\n.pn-line{min-height:3em;margin:0 0 var(--s-2);color:var(--ink-2);font-weight:700}\n.pn-dots{display:flex;justify-content:center;gap:var(--s-3);margin:0 0 var(--s-3)}\n.pn-dots i{width:18px;height:18px;border-radius:50%;box-shadow:inset 0 0 0 3px var(--ink-3)}\n.pn-dots i.on{background:var(--brand);box-shadow:inset 0 0 0 3px var(--brand)}\n.pn-keys{display:grid;grid-template-columns:repeat(3,minmax(64px,88px));justify-content:center;gap:var(--s-2);margin:0 0 var(--s-3)}\n.btn.pn-k{min-height:56px;padding:0;font-family:var(--font-display);font-size:var(--fs-5);font-weight:700}\n.btn.pn-k .ic{width:26px;height:26px}\n.btn.pn-fg{min-height:56px;padding:0 var(--s-1);font-size:var(--fs-1);line-height:1.15;white-space:normal}\n.pn-q{font-size:var(--fs-5)}\n.pn-q input{width:5.2ch}\n/* RC-1: the children's picture passwords (41c-kidpw.js, part gate). Tokens only. */\n.kp{text-align:center}\n.kp-dots{display:flex;justify-content:center;gap:var(--s-3);margin:0 0 var(--s-3)}\n.kp-dots i{width:20px;height:20px;border-radius:50%;box-shadow:inset 0 0 0 3px var(--ink-3)}\n.kp-dots i.on{background:var(--brand);box-shadow:inset 0 0 0 3px var(--brand)}\n.kp-dots.kp-no{animation:k-shake .4s var(--ease)}\nhtml.calm .kp-dots.kp-no{animation:none}\n@media (prefers-reduced-motion:reduce){.kp-dots.kp-no{animation:none}}\n.kp-grid{display:grid;grid-template-columns:repeat(3,minmax(64px,84px));justify-content:center;gap:var(--s-2);margin:0 0 var(--s-3)}\n.btn.kp-p{min-height:72px;padding:var(--s-1)}\n.btn.kp-p .art{width:56px;height:56px}\n.kp-row{display:flex;justify-content:center;flex-wrap:wrap;gap:var(--s-3);min-height:48px;margin:0 0 var(--s-2)}\n.kp-one{display:inline-flex;flex-direction:column;align-items:center;gap:2px;font-weight:700;color:var(--ink-2)}\n";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)
/* ---------- RC-1 (owner decision 2026-11-19): the Grown-ups PIN ----------
   A 4-digit PIN is the way into Grown-ups and into everything NAV.quiz guards (the Unlock sheet, Erase everything, deleting a child).
   It belongs to the tablet, not a child: its own key PIN.KEY (like the Play unlock), so Start over keeps it and no backup carries it.
   Only a salted hash is kept: {v: 1, s: salt, h: hash, n: wrong PINs in a row, k: lockouts so far, t: locked until (ms),
   f: Forgot PIN waits until (ms)}.
     No PIN yet (a new tablet, or one updated from before v188): the old times-table question (NAV.askQ) guards that first entry,
     then the grown-up chooses a PIN and types it twice.
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

var GATE_VER='v196'; // last line: the whole file ran (checked by dataReady() before the app starts)
