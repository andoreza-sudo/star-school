/* ---------- PLAY-01: the Play app's screens and its one purchase (the core, the free sample and Play mode are in 03-play.js) ----------
   Children never see a price or a way to pay. What a child sees on locked content is one calm line and an OK button (PLAY.kid):
   "This world opens when a grown-up unlocks Star School." No timer, no repeat, no "ask your parent". Next to locked content there
   is one quiet button for grown-ups (PLAY.bandHTML on the map, PLAY.rowHTML in the Game Room and Brain Teasers). It asks the
   grown-up question first (NAV.quiz, the same times-table question as the Grown-ups button); only then does the Unlock Star School
   sheet ask Google Play for the price and offer to buy. Grown-ups (behind its own gate) has the same card (PLAY.card), with Restore
   purchase, and About says which edition this is (PLAY.edition).

   The purchase goes through Google Play billing in the Trusted Web Activity: the Digital Goods API
   (getDigitalGoodsService(PLAY.BILLING), getDetails([SKU]) for the price, listPurchases() to restore) and the Payment Request API
   (supportedMethods PLAY.BILLING, data {sku}). A one-time product that is never consumed: after a purchase the token is acknowledged
   when the service offers acknowledge() (Digital Goods API v1; v2 acknowledges by itself), then the unlock is kept on the tablet
   (PLAY.setOwn). Every outcome is a word for PLAY.MSG: ok, owned (bought before: restored), cancel, pending, offline, none,
   unavailable, error. Google Play is never asked for anything while a child plays, except listPurchases() once at start (PLAY.verify). */
Object.assign(PLAY, {
  LINE: {
    world: 'This world opens when a grown-up unlocks Star School.',
    gameKid: 'This game opens when a grown-up unlocks Star School.',
    puzzle: 'These puzzles open when a grown-up unlocks Star School. The Puzzle of the Day is open every day.',
    game: 'Opens when a grown-up unlocks Star School',
    kid: 'This child can play once a grown-up unlocks Star School.',
    add: 'More children can play once Star School is unlocked (see Unlock Star School in Grown-ups).',
  },
  MSG: {
    ok: 'Star School is unlocked for every child on this tablet. Thank you!',
    owned: 'This Google account already has the unlock, so everything is open again. Thank you!',
    cancel: 'No payment was made.',
    pending: 'Google Play is still finishing the payment. Star School opens by itself once it is paid; you can also tap Restore purchase later.',
    offline: 'The tablet is offline. Connect to the internet to buy or restore. Everything that is open keeps working offline.',
    none: 'No purchase was found for the Google account on this tablet.',
    unavailable: 'Google Play billing is not available right now. Buying works in Star School installed from Google Play, with the Play Store app up to date.',
    error: 'Google Play could not finish. Please try again later. If you were charged, tap Restore purchase.',
  },
  priceT: '',
  offline() { return !!globalThis.navigator && globalThis.navigator.onLine === false; },
  within(pr, ms) {
    return Promise.race([pr, new Promise((res, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);
  },
  // the Digital Goods service of Google Play, or null (the web version, another store, an old Play Store app)
  async svc() {
    const g = globalThis;
    if (typeof g.getDigitalGoodsService != 'function') return null;
    try { return (await PLAY.within(g.getDigitalGoodsService(PLAY.BILLING), 8000)) || null; } catch (e) { return null; }
  },
  // a purchase Google Play has not finished taking payment for (purchaseState 'pending', or Play's number 2)
  pend(x) { return !!x && (x.purchaseState === 'pending' || x.purchaseState === 2); },
  // a price as Google Play gives it (v2: {currency, value}; a plain string from older services), in the tablet's own format
  fmt(p) {
    if (!p) return '';
    if (typeof p == 'string') return p;
    try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: p.currency }).format(+p.value); } catch (e) {}
    return p.value != null ? String(p.value) + ' ' + (p.currency || '') : '';
  },
  async price() {
    if (PLAY.priceT) return PLAY.priceT;
    const svc = await PLAY.svc();
    if (!svc) return '';
    try {
      const d = (await PLAY.within(svc.getDetails([PLAY.SKU]), 10000) || []).find(x => x && (x.itemId || x.sku) === PLAY.SKU);
      PLAY.priceT = d ? PLAY.fmt(d.price) : '';
    } catch (e) { PLAY.priceT = ''; }
    return PLAY.priceT;
  },
  // Restore: what Google Play says this account owns. 'owned' keeps the unlock; never takes it away (PLAY.verify does, carefully)
  async restore() {
    const svc = await PLAY.svc();
    if (!svc) return PLAY.offline() ? 'offline' : 'unavailable';
    let list;
    try { list = await PLAY.within(svc.listPurchases(), 10000); } catch (e) { return PLAY.offline() ? 'offline' : 'error'; }
    const mine = (Array.isArray(list) ? list : []).filter(x => x && (x.itemId || x.sku) === PLAY.SKU);
    if (mine.some(x => !PLAY.pend(x))) {
      PLAY.setOwn(true);
      return 'owned';
    }
    return mine.length ? 'pending' : 'none';
  },
  // At start (online, Play mode): the last state Google Play confirmed is kept; a bought unlock is taken back only when two checks in a
  // row find no purchase (a refund), never offline and never when Google Play cannot be asked
  async verify() {
    if (!PLAY.on || PLAY.offline()) return '';
    const was = PLAY.own, r = await PLAY.restore();
    if (r === 'none' && was) {
      PLAY.st.miss = (PLAY.st.miss || 0) + 1;
      if (PLAY.st.miss >= 2) PLAY.setOwn(false);
      else PLAY.write();
    }
    return r;
  },
  // Buy (only from the sheet behind the grown-up question, or from Grown-ups)
  async buy() {
    if (PLAY.own) return 'owned';
    if (PLAY.offline()) return 'offline';
    const svc = await PLAY.svc();
    if (!svc || typeof globalThis.PaymentRequest != 'function') return 'unavailable';
    const pre = await PLAY.restore(); // bought before (a reinstall, another tablet): no second payment
    if (pre === 'owned' || pre === 'pending') return pre;
    let res;
    try {
      const rq = new globalThis.PaymentRequest([{ supportedMethods: PLAY.BILLING, data: { sku: PLAY.SKU } }],
        { total: { label: 'Total', amount: { currency: 'USD', value: '0' } } }); // Google Play shows its own price; this total is not used
      res = await rq.show();
    } catch (e) {
      if (e && e.name === 'AbortError') return 'cancel';
      if (PLAY.offline()) return 'offline';
      const r = await PLAY.restore(); // Google Play answers "already owned" with an error: look again
      return r === 'owned' || r === 'pending' ? r : 'error';
    }
    const d = (res && res.details) || {}, tok = d.purchaseToken;
    if (!tok) {
      try { await res.complete('fail'); } catch (e) {}
      return 'error';
    }
    if (PLAY.pend(d)) {
      try { await res.complete('success'); } catch (e) {}
      return 'pending';
    }
    try { if (typeof svc.acknowledge == 'function') await svc.acknowledge(tok, 'onetime'); } catch (e) { logErr('play acknowledge: ' + (e && e.message)); }
    PLAY.setOwn(true);
    try { await res.complete('success'); } catch (e) {}
    return 'ok';
  },

  /* ---- what children see ---- */
  // one calm line and OK; OK goes back (the map to the child's own world, Brain Teasers to the hub)
  kid(kind, p) {
    const t = kind == 'world' ? PLAY.LINE.world : kind == 'game' ? PLAY.LINE.gameKid : PLAY.LINE.puzzle;
    SFX.pop();
    const back = () => {
      if (kind == 'world' && p && $('#map')) mapGo(p, curWorld(p));
      else if (kind == 'puzzle' && !$('.bt-hub')) BT.hub();
    };
    const s = UI.sheet(`<div class="pl-kid" id="plkid"><span class="pl-lk" aria-hidden="true">${ico('lock', 40)}</span><h2>Not open yet</h2>` +
      `<p>${esc(t)}</p><div class="acts">${UI.btn('OK', { kind: 'primary', size: 'lg', wide: true, icon: 'check', id: 'plok' })}</div></div>`, { onClose: back });
    s.el.querySelector('#plok').onclick = s.close;
    if (S.voice) say(t);
    return s;
  },
  // the quiet button for grown-ups by locked content: on a map band (absolute, top px) or as a row under a hub's cards
  bandHTML(top) {
    return `<button class="btn plgu pl-band" style="top:${top}px">${ico('gear', 20)}<span>Grown-ups: unlock everything</span></button>`;
  },
  rowHTML() {
    return `<div class="pl-row"><button class="btn plgu">${ico('gear', 20)}<span>Grown-ups: unlock everything</span></button></div>`;
  },
  // the grown-up question first, then the Unlock Star School sheet; back redraws the screen under it after an unlock
  grown(back) {
    SFX.click();
    return NAV.quiz(() => PLAY.sheet(back));
  },

  /* ---- what grown-ups see ---- */
  edition() {
    return !PLAY.on ? 'Everything is open (web version)' : PLAY.own ? 'Unlocked on Google Play' : 'Free sample (Google Play)';
  },
  launchOn() { return !!PLAY.LAUNCH && Date.now() < new Date(PLAY.LAUNCH_END + 'T00:00:00').getTime(); }, // local midnight
  // the card's body: the price (filled in by PLAY.bind), what the unlock includes, what is free, Unlock and Restore
  bodyHTML() {
    const li = (i, t) => `<li>${ico(i, 22, 'ic-good')}<span>${t}</span></li>`;
    return `<p class="pl-price" id="plprice">${PLAY.own ? 'Unlocked. Thank you!' : 'Asking Google Play for the price...'}</p>` +
      (!PLAY.own && PLAY.launchOn() ? `<p class="gw-sub" id="pllaunch">${esc(PLAY.LAUNCH)}</p>` : '') +
      `<ul class="pl-inc">${li('map', 'Every world of Math, Reading, Spanish and Discover, Pre-K to 6th grade')}` +
      li('gamepad', 'Every Game Room game and every Brain Teaser') + li('users', 'Up to 4 children on this tablet, each with their own progress') +
      li('check-circle', 'One payment. No ads, no subscription.') + '</ul>' +
      (PLAY.own ? '' : `<p class="gw-sub">Free now: in each subject, the first world of every grade; the Puzzle of the Day; Coloring and Snack Stand; one child.</p>`) +
      `<p class="pl-msg" id="plmsg" role="status"></p><div class="gw-bkrow pl-btns">` +
      (PLAY.own ? '' : UI.btn('Unlock', { kind: 'primary', icon: 'star', id: 'plbuy', off: true })) +
      UI.btn('Restore purchase', { icon: 'replay', id: 'plrest' }) + '</div>';
  },
  card() {
    return GW.card('gw-play', 'star', 'Unlock Star School', PLAY.bodyHTML(),
      { sub: PLAY.own ? 'Everything is open for every child on this tablet.' : 'A one-time purchase through Google Play opens everything for the whole family.' });
  },
  sheet(back) {
    const s = UI.sheet(`<div class="pl-sh" id="plsheet"><h2>Unlock Star School</h2>${PLAY.bodyHTML()}` +
      `<div class="acts">${UI.btn('Not now', { kind: 'ghost', wide: true, id: 'plno' })}</div></div>`, { onClose: () => { if (PLAY.own && back) back(); } });
    s.el.querySelector('#plno').onclick = s.close;
    PLAY.bind(s.el, null, s);
    return s;
  },
  // wires a card or sheet (root); after an unlock, a card redraws its screen (redraw), a sheet shows Done
  bind(root, redraw, sh) {
    if (!root) return;
    const q = sel => root.querySelector(sel), msg = k => { const m = q('#plmsg'); if (m) m.textContent = PLAY.MSG[k] || ''; };
    const busy = v => { for (const b of root.querySelectorAll('#plbuy,#plrest')) b.disabled = v; };
    const done = k => {
      msg(k);
      const pr = q('#plprice'), bb = q('#plbuy'), l = q('#pllaunch');
      if (pr) pr.textContent = 'Unlocked. Thank you!';
      if (bb) bb.remove();
      if (l) l.remove();
      SFX.chime();
      if (redraw) setTimeout(redraw, 1800);
      else if (sh) { const n = q('#plno span'); if (n) n.textContent = 'Done'; }
    };
    const act = async (fn, wait) => {
      busy(true);
      msg('');
      const m = q('#plmsg');
      if (m) m.textContent = wait;
      let r = 'error';
      try { r = await fn(); } catch (e) { logErr('play: ' + (e && e.message)); }
      busy(false);
      if (r === 'ok' || r === 'owned') return done(r);
      if (q('#plbuy') && !PLAY.priceT) q('#plbuy').disabled = true;
      msg(r);
    };
    if (q('#plbuy')) q('#plbuy').onclick = () => act(PLAY.buy, 'Opening Google Play...');
    q('#plrest').onclick = () => act(PLAY.restore, 'Asking Google Play...');
    if (PLAY.own) return;
    if (PLAY.offline()) msg('offline');
    PLAY.price().then(t => {
      const pr = q('#plprice'), bb = q('#plbuy');
      if (!pr || PLAY.own) return;
      pr.textContent = t ? t + ', paid once' : 'The price is shown once Google Play answers.';
      if (bb) bb.disabled = !t;
      if (!t && !PLAY.offline()) msg('unavailable');
    });
  },
});
// PLAY-01: at start, Play mode only: ask Google Play once what this account owns (a purchase on another tablet, a refund)
if (PLAY.on) setTimeout(() => { PLAY.verify().catch(() => {}); }, 2000);
