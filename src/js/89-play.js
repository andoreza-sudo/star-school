/* ---------- PLAY-01: the Play app's screens and its one purchase (the core, the free sample and Play mode are in 03-play.js) ----------
   Children never see a price or a way to pay. What a child sees on locked content is one calm line and an OK button (PLAY.kid):
   "This world opens when a grown-up unlocks Star School." No timer, no repeat, no "ask your parent". Next to locked content there
   is one quiet button for grown-ups (PLAY.bandHTML on a locked world of the map, PLAY.rowHTML in Brain Teasers). It asks the grown-up
   PIN first (NAV.quiz: the Grown-ups PIN, RC-1, as for the Grown-ups button); only then does the Unlock Star School sheet ask
   Google Play for the price and offer to buy or restore. Grown-ups has a card that says what the unlock includes, with no price and
   no buttons but "Unlock or restore", which asks for the PIN again first.

   The purchase goes through Google Play billing in the Trusted Web Activity: the Digital Goods API (getDigitalGoodsService(BILLING),
   getDetails([SKU]) for the price, listPurchases() to restore) and the Payment Request API (supportedMethods BILLING, data {sku}).
   A one-time product, never consumed. Google Play refunds a purchase nobody acknowledges within 3 days, and nothing acknowledges it
   by itself: android-browser-helper (the TWA's Play Billing) only acknowledges when the page asks (its "acknowledge" command, which
   Digital Goods API v1 exposes as acknowledge() and v2 does not). So every unlock_all token is acknowledged by PLAY.ack, idempotently
   and again at every restore and start until it is confirmed: the service's acknowledge() when it has one (v1), and the owner's
   endpoint PLAY.ACK_URL (api/ack.js on the Play app's own site), which reads the purchase from the Play Developer API (purchased,
   pending, cancelled) and acknowledges it there. v2 purchase details are only {itemId, purchaseToken}, so whether a purchase is
   still pending comes from that endpoint; when it cannot be asked, a listed purchase counts as bought (a family that paid is never
   locked out) and is asked again at the next start.
   The sheet asks Google Play for the service and what this account owns as it opens (PLAY.prepare), so the Unlock tap calls
   PaymentRequest.show() at once, inside the tap (show() needs the tap's user activation). Every outcome is a word for PLAY.MSG. */
Object.assign(PLAY, {
  LINE: {
    world: 'This world opens when a grown-up unlocks Star School.',
    stop: 'This stop opens when a grown-up unlocks Star School.',
    puzzle: 'These puzzles open when a grown-up unlocks Star School. The Puzzle of the Day is open every day.',
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
    wait: 'Still asking Google Play. Try again in a moment.',
  },
  priceT: '',
  prep: null,
  offline() { return !!globalThis.navigator && globalThis.navigator.onLine === false; },
  within(pr, ms) {
    return Promise.race([pr, new Promise((res, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);
  },
  // the Digital Goods service of Google Play, or null (the web version, another store, an old Play Store app, normal Chrome)
  async svc() {
    const g = globalThis;
    if (typeof g.getDigitalGoodsService != 'function') return null;
    try { return (await PLAY.within(g.getDigitalGoodsService(PLAY.BILLING), 8000)) || null; } catch (e) { return null; }
  },
  // a purchase Google Play says is not paid yet (v1: purchaseState 'pending' or Play's number 2; v2 does not say: see PLAY.ack)
  pend(x) { return !!x && (x.purchaseState === 'pending' || x.purchaseState === 2); },
  // a price as Google Play gives it (v2: {currency, value}; a plain string from older services), in the tablet's own format
  fmt(p) {
    if (!p) return '';
    if (typeof p == 'string') return p;
    try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: p.currency }).format(+p.value); } catch (e) {}
    return p.value != null ? String(p.value) + ' ' + (p.currency || '') : '';
  },
  async price(svc0) {
    if (PLAY.priceT) return PLAY.priceT;
    const svc = svc0 || await PLAY.svc();
    if (!svc) return '';
    try {
      const d = (await PLAY.within(svc.getDetails([PLAY.SKU]), 10000) || []).find(x => x && (x.itemId || x.sku) === PLAY.SKU);
      PLAY.priceT = d ? PLAY.fmt(d.price) : '';
    } catch (e) { PLAY.priceT = ''; }
    return PLAY.priceT;
  },
  // Acknowledge one purchase token (idempotent; see the header). 'acked' (confirmed, kept in PLAY.st.ackd), 'pending' or 'cancelled'
  // (the endpoint read it from Google Play), or '' (could not confirm: tried again at the next restore and start)
  async ack(tok, svc) {
    if (!tok) return '';
    if ((PLAY.st.ackd || []).includes(tok)) return 'acked';
    let state = '';
    try {
      if (svc && typeof svc.acknowledge == 'function') {
        await PLAY.within(svc.acknowledge(tok, 'onetime'), 10000);
        state = 'acked';
      }
    } catch (e) {}
    try {
      const f = globalThis.fetch;
      if (PLAY.ACK_URL && typeof f == 'function' && !PLAY.offline()) {
        const r = await PLAY.within(f(PLAY.ACK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: tok, sku: PLAY.SKU }) }), 15000);
        const j = r && r.ok ? await r.json() : null;
        if (j && j.state === 'pending') return 'pending';
        if (j && j.state === 'cancelled') return 'cancelled';
        if (j && j.state === 'purchased' && j.acknowledged) state = 'acked';
      }
    } catch (e) {}
    if (state === 'acked') {
      PLAY.st.ackd = (Array.isArray(PLAY.st.ackd) ? PLAY.st.ackd : []).concat(tok).slice(-5);
      PLAY.write();
    }
    return state;
  },
  // Restore: what Google Play says this account owns; every unlock_all token is acknowledged (again, until confirmed). 'owned' keeps
  // the unlock; this never takes it away (PLAY.verify does, carefully). A list that is not a list is an error, never "nothing bought".
  async restore(svc0) {
    const svc = svc0 || await PLAY.svc();
    if (!svc) return PLAY.offline() ? 'offline' : 'unavailable';
    let list;
    try { list = await PLAY.within(svc.listPurchases(), 10000); } catch (e) { return PLAY.offline() ? 'offline' : 'error'; }
    if (!Array.isArray(list)) return 'error';
    let got = false, wait = false;
    for (const x of list.filter(x => x && (x.itemId || x.sku) === PLAY.SKU)) {
      if (PLAY.pend(x)) { wait = true; continue; }
      const a = await PLAY.ack(x.purchaseToken, svc);
      if (a === 'pending') wait = true;
      else if (a !== 'cancelled') got = true;
    }
    if (got) {
      PLAY.setOwn(true);
      return 'owned';
    }
    return wait ? 'pending' : 'none';
  },
  // At start (online, Play mode): the last state Google Play confirmed is kept. A paid unlock is taken back only when checks at least
  // a day apart find no purchase (a refund), never offline, never on an error. A change redraws the screen.
  async verify() {
    if (!PLAY.on || PLAY.offline()) return '';
    const was = PLAY.own, r = await PLAY.restore();
    if (r === 'none' && was) {
      const now = Date.now();
      if (!(PLAY.st.miss > 0)) { PLAY.st.miss = now; PLAY.write(); }
      else if (now - PLAY.st.miss >= 864e5) PLAY.setOwn(false);
    }
    if (PLAY.own !== was) PLAY.redraw();
    return r;
  },
  // the sheet asks Google Play as it opens, so the Unlock tap can show the payment at once
  prepare() {
    const pp = PLAY.prep = { done: false };
    pp.p = (async () => {
      pp.svc = await PLAY.svc();
      pp.pre = pp.svc ? await PLAY.restore(pp.svc) : PLAY.offline() ? 'offline' : 'unavailable';
      pp.done = true;
      return pp;
    })();
    return pp.p;
  },
  // Buy: everything up to show() runs inside the tap, with no wait before it (user activation)
  buy() {
    if (PLAY.own) return Promise.resolve('owned');
    if (PLAY.offline()) return Promise.resolve('offline');
    const pp = PLAY.prep;
    if (!pp || !pp.done) return Promise.resolve('wait');
    if (!pp.svc || typeof globalThis.PaymentRequest != 'function') return Promise.resolve('unavailable');
    if (pp.pre === 'pending') return Promise.resolve('pending');
    let shown;
    try {
      const rq = new globalThis.PaymentRequest([{ supportedMethods: PLAY.BILLING, data: { sku: PLAY.SKU } }],
        { total: { label: 'Total', amount: { currency: 'USD', value: '0' } } }); // Google Play shows its own price; this total is not used
      shown = rq.show();
    } catch (e) { return Promise.resolve('error'); }
    return PLAY.paid(shown, pp.svc);
  },
  async paid(shown, svc) {
    let res;
    try { res = await shown; } catch (e) {
      if (e && e.name === 'AbortError') return 'cancel';
      if (PLAY.offline()) return 'offline';
      const r = await PLAY.restore(svc); // Google Play answers "already owned" with an error: look again
      return r === 'owned' || r === 'pending' ? r : 'error';
    }
    const d = (res && res.details) || {}, tok = d.purchaseToken;
    try { await res.complete(tok ? 'success' : 'fail'); } catch (e) {}
    if (!tok) return 'error';
    if (PLAY.pend(d)) return 'pending';
    const a = await PLAY.ack(tok, svc);
    if (a === 'pending') return 'pending';
    if (a === 'cancelled') return 'error';
    PLAY.setOwn(true); // acknowledged, or not confirmed yet (asked again at every restore and start)
    return 'ok';
  },
  // after the unlock changes at start: draw the screen again, but only a hub-like screen (never in the middle of a round or game)
  redraw() {
    try {
      if (document.querySelector('.sheet-bg')) return;
      if ($('#map')) return pathMap(MAPP, MAPW[MAPP]);
      if ($('.bt-hub')) return BT.hub();
      if ($('.gw')) return NAV.gwBack();
      if ($('.lh')) return learnHub();
      if ($('#hs')) return home();
    } catch (e) {}
  },

  /* ---- what children see ---- */
  // one calm line and OK; OK goes back (the map to the child's own world, Brain Teasers to the hub)
  kid(kind, p) {
    const t = PLAY.LINE[kind] || PLAY.LINE.world;
    SFX.pop();
    const back = () => {
      if (kind != 'puzzle' && p && $('#map')) mapGo(p, curWorld(p));
      else if (kind == 'puzzle' && !$('.bt-hub')) BT.hub();
    };
    const s = UI.sheet(`<div class="pl-kid" id="plkid"><span class="pl-lk" aria-hidden="true">${ico('lock', 40)}</span><h2>Not open yet</h2>` +
      `<p>${esc(t)}</p><div class="acts">${UI.btn('OK', { kind: 'primary', size: 'lg', wide: true, icon: 'check', id: 'plok' })}</div></div>`, { onClose: back });
    s.el.querySelector('#plok').onclick = s.close;
    if (S.voice) say(t);
    return s;
  },
  // the quiet button for grown-ups by locked content: on a map band (absolute, top px) or as a row under the Brain Teasers cards
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
  incHTML() {
    const li = (i, t) => `<li>${ico(i, 22, 'ic-good')}<span>${t}</span></li>`;
    return `<ul class="pl-inc">${li('map', 'Every world and stop of Math, Reading, Spanish and Discover, Pre-K to 6th grade')}` +
      li('puzzle', 'Every Brain Teaser') + li('users', 'Up to 4 children on this tablet, each with their own progress') +
      li('check-circle', 'One payment. No ads, no subscription.') + '</ul>' +
      (PLAY.own ? '' : `<p class="gw-sub">Free now: the first ${PLAY.FREE_STOPS} stops of each subject at your child's grade; every Game Room game (game time is earned by learning); the Puzzle of the Day; one child.</p>`);
  },
  // Grown-ups: what the unlock is, no price and no way to pay here; "Unlock or restore" asks the grown-up question first
  card() {
    return GW.card('gw-play', 'star', 'Unlock Star School',
      (PLAY.own ? `<p class="pl-price">Unlocked. Thank you!</p>` : '') + PLAY.incHTML() +
      (PLAY.own ? '' : `<div class="gw-bkrow pl-btns">${UI.btn('Unlock or restore', { kind: 'primary', icon: 'star', id: 'plgo' })}</div>`),
      { sub: PLAY.own ? 'Everything is open for every child on this tablet.' : 'A one-time purchase through Google Play opens everything for the whole family.' });
  },
  cardBind() {
    const b = $('#plgo');
    if (b) b.onclick = () => PLAY.grown(() => NAV.gwBack());
  },
  sheet(back) {
    const body = `<p class="pl-price" id="plprice">${PLAY.own ? 'Unlocked. Thank you!' : 'Asking Google Play for the price...'}</p>` +
      (!PLAY.own && PLAY.launchOn() ? `<p class="gw-sub" id="pllaunch">${esc(PLAY.LAUNCH)}</p>` : '') + PLAY.incHTML() +
      `<p class="pl-msg" id="plmsg" role="status"></p><div class="gw-bkrow pl-btns">` +
      (PLAY.own ? '' : UI.btn('Unlock', { kind: 'primary', icon: 'star', id: 'plbuy', off: true })) +
      UI.btn('Restore purchase', { icon: 'replay', id: 'plrest' }) + '</div>';
    const s = UI.sheet(`<div class="pl-sh" id="plsheet"><h2>Unlock Star School</h2>${body}` +
      `<div class="acts">${UI.btn('Not now', { kind: 'ghost', wide: true, id: 'plno' })}</div></div>`, { onClose: () => { if (PLAY.own && back) back(); } });
    s.el.querySelector('#plno').onclick = s.close;
    PLAY.bind(s.el);
    return s;
  },
  // wires the sheet: asks Google Play (prepare) as it opens; Unlock and Restore
  bind(root) {
    const q = sel => root.querySelector(sel), msg = k => { const m = q('#plmsg'); if (m) m.textContent = PLAY.MSG[k] || ''; };
    const busy = v => { for (const b of root.querySelectorAll('#plbuy,#plrest')) b.disabled = v; };
    const done = k => {
      msg(k);
      const pr = q('#plprice'), bb = q('#plbuy'), l = q('#pllaunch'), n = q('#plno span');
      if (pr) pr.textContent = 'Unlocked. Thank you!';
      if (bb) bb.remove();
      if (l) l.remove();
      if (n) n.textContent = 'Done';
      SFX.chime();
    };
    // fn runs first, inside the tap (buy calls show() before any wait); then the sheet says what happened
    const act = (fn, wait) => {
      const pr = fn();
      busy(true);
      const m = q('#plmsg');
      if (m) m.textContent = wait;
      pr.catch(e => { logErr('play: ' + (e && e.message)); return 'error'; }).then(r => {
        busy(false);
        if (r === 'ok' || r === 'owned') return done(r);
        if (q('#plbuy') && !PLAY.priceT) q('#plbuy').disabled = true;
        msg(r);
      });
    };
    if (q('#plbuy')) q('#plbuy').onclick = () => act(PLAY.buy, 'Opening Google Play...');
    q('#plrest').onclick = () => act(() => PLAY.restore(), 'Asking Google Play...');
    if (PLAY.own) return;
    if (PLAY.offline()) msg('offline');
    PLAY.prepare().then(pp => {
      if (PLAY.own) return done('owned');
      return PLAY.price(pp.svc).then(t => {
        const pr = q('#plprice'), bb = q('#plbuy');
        if (!pr || PLAY.own) return;
        pr.textContent = t ? t + ', paid once' : 'The price is shown once Google Play answers.';
        if (bb) bb.disabled = !t;
        if (!t && !PLAY.offline()) msg('unavailable');
        else if (pp.pre === 'pending') msg('pending');
      });
    });
  },
});
// PLAY-01: at start, Play mode only: ask Google Play once what this account owns (a purchase on another tablet, a refund, an
// acknowledgement not confirmed yet)
if (PLAY.on) setTimeout(() => { PLAY.verify().catch(() => {}); }, 2000);
