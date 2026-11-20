/* ---------- PERS-01: the Story themes picker (part hints; the words are PERSW, 39q-persw.js; the engine is 30p-pers.js) ----------
   Grown-ups shows a "Story themes" card (persCard) once the part is in, and only when the owner has reviewed at least one interest.
   Its button opens the picker (persPick): big picture buttons, written so a grown-up can hand the tablet to the child; a tap says
   the name and turns it on or off (up to PERS_MAX; saved at once in S.ints, per child); a sample sentence shows what a story
   problem will sound like. CSS in src/css/39p-pers.css (part hints). */
const PERS_MAX = 3;
// the reviewed interests, in the order of the read-through (sorted ids)
const persList = () => Object.keys(PERSW).sort();
const persPic = (id, size) => {
  const p = PERSW[id].pic || [];
  return p[0] && ART[p[0]] ? picArt(p[0], size) : `<span class="pp-emo" style="font-size:${size}">${esc(p[1] || '')}</span>`;
};
// the names of the child's picks ("Animals and Space"), or ''
function persNames() {
  const n = persOn().map(id => PERSW[id].name);
  return n.length < 2 ? n.join('') : n.slice(0, -1).join(', ') + ' and ' + n[n.length - 1];
}
// a sample: the first pick's first joining sentence, with the child's name, a friend and small numbers (what a story will sound like)
function persSample() {
  const id = persOn()[0];
  if (!id) return '';
  const P = PERSW[id], t = P.things[0], line = [].concat((P.st || {}).join || [])[0];
  if (!line) return '';
  return persFill(line, [t[0], t[3] || '', t[1], t[2] || t[1]], {who: S.name || 'Sam', other: S.buddy || petN(), a: 4, b: 3});
}
// Grown-ups: fill the placeholder #gw-pers with the card (nothing when no interest is reviewed)
function persCard(el) {
  if (!el || !persList().length) return;
  const names = persNames();
  el.outerHTML = GW.card('gw-pers', 'skill-story', 'Story themes',
    `<p class="gw-p" id="pers-now">${names ? 'Story problems are about ' + esc(names) + '.' : 'Nothing picked: the usual story problems.'}</p>` +
    UI.btn(names ? 'Change themes' : 'Choose themes', {size: 'sm', icon: 'heart', id: 'pers-open'}),
    {sub: `Pick up to ${PERS_MAX} things ${esc(S.name || 'your child')} likes. Story problems use them. The math stays the same.`});
  $('#pers-open').onclick = () => persPick(() => NAV.gwBack()); // RC-2: Grown-ups only while the grown-up session is valid
}
// the picker screen; back: where Back and Done go
function persPick(back) {
  if (!Array.isArray(S.ints)) S.ints = [];
  const ids = persList(), on = id => S.ints.includes(id);
  NAV.gwK = 1; // RC-2: the grown-up's own screen: the session goes on (its time does not: NAV.GW_MS)
  const chips = ids.map(id => `<button class="btn pp-c${on(id) ? ' on' : ''}" data-int="${id}" aria-pressed="${on(id)}">` +
    `<span class="pp-pic">${persPic(id, '48px')}</span><b>${esc(PERSW[id].name)}</b>${ico('check-circle', 22, 'pp-ok')}</button>`).join('');
  view(`<div class="top tbar gx-mtop s-math">${UI.ibtn('back', 'Back', {size: 'sm', id: 'back'})}<div class="ttl gx-ttl"><span class="gx-tb">${ico('skill-story', 24)}</span><span>Story themes</span></div></div>
   <div class="scroll"><div class="pp-card">
    <h1 class="pp-h">What does ${esc(S.name || 'your child')} like?</h1>
    <p class="pp-sub">Pick up to ${PERS_MAX}. Story problems will be about them.</p>
    <div class="pp-grid" role="group" aria-label="Story themes">${chips}</div>
    <div class="pp-ex" id="pers-ex" aria-live="polite"></div>
    <div class="pp-btns">${UI.btn('Done', {kind: 'primary', icon: 'check', id: 'pers-done'})}</div>
   </div></div>`);
  NAV.bar('');
  const ex = () => {
    const s = persSample();
    $('#pers-ex').innerHTML = s ? `<span class="pp-exl">Like this:</span> <span class="pp-ext">${esc(s)}</span>` : `<span class="pp-ext">Nothing picked: the usual story problems.</span>`;
  };
  ex();
  $$('.pp-c').forEach(b => b.onclick = () => {
    const id = b.dataset.int;
    if (on(id)) S.ints = S.ints.filter(x => x !== id);
    else if (persOn().length >= PERS_MAX) { fb(`Up to ${PERS_MAX}. Tap one to take it off.`, 'warn'); SFX.wrong(); return; }
    else S.ints = S.ints.filter(x => PERSW[x]).concat(id); // an interest no longer offered is dropped when the list changes
    save();
    b.classList.toggle('on', on(id));
    b.setAttribute('aria-pressed', on(id));
    SFX.pop(on(id) ? 2 : 1);
    if (S.voice) say(PERSW[id].name, b);
    ex();
  });
  $('#back').onclick = back;
  $('#pers-done').onclick = back;
}
