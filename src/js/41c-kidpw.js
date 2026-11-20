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
