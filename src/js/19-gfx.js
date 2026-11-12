/* ---------- P4-18 graphics pass: shared drawn chrome (styles in src/css/47-gfx.css) ----------
   Small markup helpers for screens that were still built from emoji and flat gradients: activity cards (Fact Sprint sets and
   modes, Speed Race, Game Room), the timed-game top bar and number pad (Fact Sprint, Speed Race), and the end-of-sprint card.
   They only return markup; every screen keeps its ids and handlers. */
const GFX = {
  // Activity card on the P4-04 path-card look. o: {id, attrs, cls, p (subject colour), icon, badge (html instead of icon),
  // tag (small text on the badge), title, sub (wraps), go (icon name, default play; '' none), side (html instead of go)}
  card(o) {
    const badge = o.badge || ico(o.icon || 'star');
    const tag = o.tag != null && o.tag !== '' ? `<i class="gx-tag">${esc(o.tag)}</i>` : '';
    const side = o.side != null ? o.side : o.go === '' ? '' : `<span class="pc-go">${ico(o.go || 'play')}</span>`;
    return `<button class="pathcard gx-card s-${o.p || 'math'}${o.cls ? ' ' + o.cls : ''}"${o.id ? ` id="${o.id}"` : ''}${o.attrs ? ' ' + o.attrs : ''}>` +
      `<span class="pc-badge">${badge}${tag}</span><span class="gx-txt"><span class="pc-t">${UI.t(o.title)}</span>` +
      `${o.sub ? `<span class="gx-sub">${o.sub}</span>` : ''}</span>${side}</button>`;
  },

  // Top bar of a timed game: close (#quit), a time gauge (fill id), then chips (html). The gauge is set by GFX.bar(el, v 0..1).
  speedTop(p, barId, v, chips) {
    return `<div class="top tbar round qtop gx-top s-${p}">${UI.ibtn('close', 'Stop', { size: 'sm', id: 'quit' })}` +
      `<div class="gauge lg gx-bar" aria-hidden="true"><i id="${barId}" style="--v:${v}"></i></div>${chips}</div>`;
  },
  bar(el, v) {
    if (el) el.style.setProperty('--v', Math.max(0, Math.min(1, v)).toFixed(3));
  },

  // Fact Sprint pad: the P4-10 keys (.key.k, data-k as before) without a check key: a sprint answers by itself.
  pad() {
    const key = (k, face, cls, aria) => `<button class="key k${cls ? ' ' + cls : ''}" data-k="${k}"${aria ? ` aria-label="${aria}"` : ''}>${face}</button>`;
    return '<div class="keys qpad pad">' + [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => key(n, n)).join('') +
      key('del', ico('backspace'), 'del', 'Delete') + key(0, 0) + '<span class="gx-gap"></span></div>';
  },

  // Boss hearts in the round's top bar (drawn hearts instead of the heart emoji)
  hearts(n) {
    return ico('heart', 16, 'gx-ht').repeat(Math.max(0, n | 0));
  },

  // End-of-game card over a dim backdrop (append the returned element to body). o: {rec, title, best, extra (html), earn (html),
  // btns (html), icon (the disc's icon when not a record; bolt)}. A record gets light rays and the trophy.
  // best '' leaves that line out.
  endCard(o) {
    const el = document.createElement('div');
    el.className = 'ovl rw-ovl';
    el.innerHTML = `<div class="rw-card gx-end${o.rec ? ' rw-growc' : ''}">${o.rec ? RW.rays() : ''}` +
      `<div class="rw-disc gx-disc${o.rec ? ' rec' : ''}">${ico(o.rec ? 'trophy' : o.icon || 'bolt', 56)}</div>` +
      `<h1>${esc(o.title)}</h1>${o.rec ? `<p class="gx-best">${UI.tag('New record!', 'new', 'sparkle')}</p>` : o.best ? `<p class="gx-best">${esc(o.best)}</p>` : ''}` +
      `${o.extra || ''}<p class="gx-earn">${o.earn}</p><div class="rw-acts gx-acts">${o.btns}</div></div>`;
    return el;
  },
};
