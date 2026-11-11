/* ---------- pet shop (stageHTML: the old stage, still used by Pet Care in 56-petcare.js) ---------- */
function stageHTML(sc,title,sub,sticky){return`<div class="stage ${sc[0]=='space'?'dark':''} ${sticky?'sticky':''}" style="background:${sc[3]}" id="stage">
  <span class="sdeco" style="left:14px;top:12px">${sc[2]}</span><span class="sdeco" style="right:14px;bottom:12px">${sc[2]}</span>
  <div class="petbig ${petAura()}" id="pet">${petHTML()}</div><div class="hname">${title}</div>${sub?`<div class="htxt">${sub}</div>`:''}</div>`}

/* ---- P4-07 Pet Shop (DESIGN_SYSTEM 6.4; CSS 43-shop.css): a stage with the pet wearing what is tried on, an info bar with one
   action, tabs, cards with drawn items (17-wear.js). Owned: a tap puts it on / takes it off; not owned: a tap tries it on, Buy asks
   first (a sheet). Saved data as before: S.coins, S.owned[id] = 1, S.wear.hat / .toy / .scene = id. ---- */
let shopTab = 'hat', shopSel = null; // the open tab, and the item being tried on (null: what the pet wears)
// a tab's items: [id, price] (+ 'boss' for a prize hat the child won); scenes [id, price, emoji, css, name]
const shopItems = t => t == 'hat' ? SHOP.hat.concat(BPRIZE.filter(h => S.owned[h]).map(h => [h, 0, 'boss'])) : SHOP[t];
const shopName = (t, it) => t == 'scene' ? it[4] : wearName(it[0]);
const shopOwn = it => !!S.owned[it[0]] || it[1] == 0 || ['hat', 'toy', 'scene'].some(k => S.wear[k] == it[0]); // a free place (the meadow) and what the pet wears are yours
const shopOn = (t, id) => t == 'scene' ? (S.wear.scene || 'meadow') == id : S.wear[t] == id;
// an item's picture: the drawing, or the place as a small scene
const shopPic = (t, id, size) => t == 'scene' ? `<span class="ps-scn sc-${esc(id)}">${hmScene(id)}</span>` : wearPic(id, size);

function shop() {
  const t = shopTab, items = shopItems(t), it = shopSel && items.find(x => x[0] == shopSel), w = S.wear;
  const pv = { hat: w.hat, toy: w.toy, scene: w.scene };
  if (it) pv[t] = it[0];
  const pet = petSVG(S.pet, stage(), 'happy', { hat: wearOf(pv.hat), toy: wearOf(pv.toy), react: true });
  // the info bar: the item tried on, what it costs or that it is the child's, and one action (#psact)
  let info;
  if (!it) info = `<div class="ps-it"><div class="ps-itt"><b>${esc(petN())}</b><span>Tap an item to try it on!</span></div></div>`;
  else {
    const nm = esc(shopName(t, it)), on = shopOn(t, it[0]), own = shopOwn(it), need = it[1] - S.coins;
    const line = on ? (t == 'scene' ? `${esc(petN())} lives here now.` : `${esc(petN())} is wearing it.`) : own ? 'It is yours.'
      : `${ico('coin', 22, 'ic-coin')}<span>${it[1]} coins</span>`;
    const act = on ? (t == 'scene' ? '' : UI.btn('Take it off', { icon: 'close', id: 'psact' }))
      : own ? UI.btn('Put it on', { kind: 'primary', icon: 'check', id: 'psact' })
      : need > 0 ? UI.btn(`Need ${need} more`, { icon: 'coin', id: 'psact', cls: 'ps-short' })
      : UI.btn('Buy', { kind: 'primary', icon: 'bag', id: 'psact' });
    info = `<div class="ps-it"><span class="ps-itp">${shopPic(t, it[0], '48px')}</span><div class="ps-itt"><b>${nm}</b>` +
      `<span class="ps-line">${line}</span></div>${act}</div>`;
  }
  const tabs = [['hat', 'hat', 'Hats'], ['toy', 'teddy', 'Toys'], ['scene', 'image', 'Places']].map(([k, ic, l]) =>
    `<button class="btn sm tab ps-tab${k == t ? ' on' : ''}" data-t="${k}" aria-pressed="${k == t}">${ico(ic, 26)}<span>${l}</span></button>`).join('');
  const cards = items.map(x => {
    const id = x[0], own = shopOwn(x), on = shopOn(t, id), nm = shopName(t, x);
    const tag = on ? `<span class="ps-tag on">${ico('check', 18)}On</span>` : x[2] == 'boss' ? `<span class="ps-tag ps-prize">${ico('crown', 18)}Prize</span>`
      : own ? `<span class="ps-tag">Yours</span>` : `<span class="ps-pr${S.coins < x[1] ? ' short' : ''}">${ico('coin', 22, 'ic-coin')}<b>${x[1]}</b></span>`;
    const say = nm + (on ? ', on' : own ? ', yours' : ', ' + x[1] + ' coins');
    return `<button class="btn item ps-card${own ? ' own' : ''}${on ? ' wear' : ''}${id == shopSel ? ' sel' : ''}" data-id="${esc(id)}" ` +
      `aria-label="${esc(say)}"><span class="ps-pic">${shopPic(t, id, '64px')}</span><span class="ps-nm">${esc(nm)}</span>${tag}</button>`;
  }).join('');
  view(`<div class="top tbar gx-mtop s-play">${UI.ibtn('back', 'Back', { size: 'sm', id: 'back' })}` +
    `<div class="ttl gx-ttl"><span class="gx-tb">${ico('bag', 24)}</span><span>Pet Shop</span></div>${UI.chip('coin', S.coins, { id: 'coinc', aria: 'Coins' })}</div>
  <div class="scroll ps-scroll"><div class="ps"><div class="ps-hold"><div class="ps-stage sc-${esc(pv.scene || 'meadow')}" id="stage">${hmScene(pv.scene)}` +
    `<div class="petbig rig" id="pet"><span class="petwrap">${pet}</span></div></div>${info}</div>` +
    `<div class="ps-shelf"><div class="tabs ps-tabs">${tabs}</div><div class="shopgrid ps-grid">${cards}</div></div></div></div>`);
  $('#back').onclick = () => { shopSel = null; home(true); };
  $$('.tab').forEach(b => b.onclick = () => { shopTab = b.dataset.t; shopSel = null; SFX.pop(1); shop(); });
  $$('.item').forEach(b => b.onclick = () => shopTap(b));
  const a = $('#psact');
  if (a) a.onclick = () => {
    if (!shopOn(t, it[0]) && !shopOwn(it)) return shopBuy(it, a);
    shopWear(it[0]);
  };
}

// a card: owned -> put on / take off; not owned -> try it on (the pet wears it on the stage until another tap)
function shopTap(b) {
  const id = b.dataset.id, it = shopItems(shopTab).find(x => x[0] == id);
  if (!it) return;
  if (shopOwn(it)) return shopWear(id);
  shopSel = id;
  SFX.pop(4);
  shop();
  anim($('#pet'), 'jump');
}

// put an owned item on, or take it off when it is on (a place stays: the pet always has one)
function shopWear(id) {
  const t = shopTab;
  if (t == 'scene') { S.owned[id] = 1; S.wear.scene = id; shopSel = id; }
  else if (S.wear[t] == id) { S.wear[t] = ''; shopSel = null; }
  else { S.wear[t] = id; shopSel = id; }
  save();
  SFX.pop(2);
  shop();
  anim($('#pet'), 'jump');
  if (S.voice && Math.random() < .5) say(pick(['I love it!', 'So cool!', 'Thank you!', 'Looking good!']));
}

// buy: not enough coins says how many more; else a sheet asks first ("Yes, buy it" #psyes / "Not now" #psno)
function shopBuy(it, btn) {
  const t = shopTab, need = it[1] - S.coins, nm = shopName(t, it);
  if (need > 0) { SFX.wrong(); anim(btn, 'sad'); fb(`Need ${need} more coins! Finish a round to earn some.`, 'warn'); return; }
  SFX.pop(3);
  const sh = UI.sheet(`<div class="ps-sheet"><div class="ps-big">${shopPic(t, it[0], '120px')}</div>` +
    `<h2>Buy the ${esc(nm.toLowerCase())}?</h2><p>It costs ${it[1]} coins. You will have ${S.coins - it[1]} left.</p>` +
    `<div class="acts">${UI.btn('Yes, buy it', { kind: 'primary', size: 'lg', wide: true, icon: 'bag', id: 'psyes' })}` +
    `${UI.btn('Not now', { wide: true, id: 'psno' })}</div></div>`);
  sh.el.querySelector('#psno').onclick = () => sh.close();
  sh.el.querySelector('#psyes').onclick = () => {
    sh.close();
    if (S.coins < it[1] || S.owned[it[0]]) return; // a double tap
    S.coins -= it[1];
    S.owned[it[0]] = 1;
    if (t == 'scene') S.wear.scene = it[0]; else S.wear[t] = it[0];
    shopSel = it[0];
    save();
    SFX.coin(0); setTimeout(() => SFX.coin(4), 120); setTimeout(() => SFX.magic(), 260);
    shop();
    const c = $('#coinc');
    if (c) { c.classList.add('bump'); }
    anim($('#pet'), 'jump');
    RW.burst($('#stage'), 22);
    if (S.voice) say(pick(['I love it!', 'So cool!', 'Thank you!', 'Looking good!']));
  };
}
