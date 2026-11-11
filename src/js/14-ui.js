/* ---------- UI components (P4-04; DESIGN_SYSTEM.md section 4) ----------
   Small helpers that return the markup of the components in src/css/10-components.css, so every screen draws them the same way.
   Text arguments are escaped here; arguments named `html` are inserted as they are (the caller escapes what goes in them).
   Subjects: p is one of math, read, es, disc, bt, play and becomes the class s-<p> (sets --c, --c-tint, --c-shade). */
const UI = {
  SUBJ_ICON: { math: 'path-math', read: 'path-read', es: 'path-es', disc: 'path-disc', bt: 'puzzle', play: 'gamepad' },
  CHIP_ICON: { star: 'star', coin: 'coin', ticket: 'ticket', flame: 'flame', timer: 'timer' },

  // Escaped label text; a word with a hyphen ("Grown-ups") is kept on one line (.nw), so a label never breaks inside a word.
  t(text) {
    return esc(text).replace(/[^\s-]+(-[^\s-]+)+/g, w => `<span class="nw">${w}</span>`);
  },

  // ' id="x"' or '' (ids are code literals, but escape them anyway)
  _id(id) {
    return id ? ` id="${esc(id)}"` : '';
  },

  // Button. o: kind (primary | soft | subject | ghost | risk; default soft), size (sm | md | lg), icon, p (subject),
  // id, wide (full width), off (disabled), cls (extra classes), attrs (raw attribute string, e.g. data-x="1").
  btn(label, o = {}) {
    const cls = ['btn', o.kind || 'soft', o.size && o.size != 'md' ? o.size : '', o.wide ? 'wide' : '', o.p ? 's-' + o.p : '', o.cls || '']
      .filter(Boolean).join(' ');
    const icon = o.icon ? ico(o.icon) : '';
    return `<button class="${cls}"${UI._id(o.id)}${o.off ? ' disabled' : ''}${o.attrs ? ' ' + o.attrs : ''}>${icon}<span>${UI.t(label)}</span></button>`;
  },

  // Round icon-only button; aria is the spoken name (required). o: kind (soft default, or primary | subject | risk), size, p, id, cls, attrs.
  ibtn(icon, aria, o = {}) {
    const kind = o.kind && o.kind != 'soft' ? ' ' + o.kind : '';
    const cls = 'btn icon' + kind + (o.size && o.size != 'md' ? ' ' + o.size : '') + (o.p ? ' s-' + o.p : '') + (o.cls ? ' ' + o.cls : '');
    return `<button class="${cls}"${UI._id(o.id)} aria-label="${esc(aria)}"${o.off ? ' disabled' : ''}${o.attrs ? ' ' + o.attrs : ''}>${ico(icon)}</button>`;
  },

  // Stat chip: kind star | coin | ticket | flame | timer. o: id, tap (render as a button), aria, off (greyed flame).
  chip(kind, n, o = {}) {
    const tag = o.tap ? 'button' : 'span';
    const aria = o.aria ? ` aria-label="${esc(o.aria)}"` : '';
    const ic = ico(UI.CHIP_ICON[kind] || kind, 32, kind == 'coin' ? 'ic-coin' : '');
    return `<${tag} class="stat ${kind}${o.off ? ' off' : ''}"${UI._id(o.id)}${aria}>${ic}<b>${esc(n)}</b></${tag}>`;
  },

  // Change a chip's number and bump it (only when the number really changed).
  setChip(el, n) {
    if (!el) return;
    const b = el.querySelector('b');
    if (!b || b.textContent === String(n)) return;
    b.textContent = n;
    el.classList.remove('bump');
    void el.offsetWidth; // restart the animation
    el.classList.add('bump');
  },

  // Gauge (progress bar). v is 0..1. o: kind (grow | good), p (subject colour), lg, label (spoken, e.g. "9 of 58 stops").
  meter(v, o = {}) {
    const f = Math.max(0, Math.min(1, +v || 0));
    const cls = ['gauge', o.kind || '', o.lg ? 'lg' : '', o.p ? 's-' + o.p : ''].filter(Boolean).join(' ');
    const lab = o.label ? ` role="img" aria-label="${esc(o.label)}"` : ' aria-hidden="true"';
    return `<div class="${cls}"${lab}><i style="--v:${+f.toFixed(3)}"></i></div>`;
  },

  // Round progress dots: total questions, cur = index of the current one, res[i] = 'try' for one that needed a retry.
  dots(total, cur, res = []) {
    let h = '';
    for (let i = 0; i < total; i++) h += `<i class="${i < cur ? (res[i] == 'try' ? 'try' : 'done') : i == cur ? 'cur' : ''}"></i>`;
    return `<div class="dots" role="img" aria-label="Question ${Math.min(cur + 1, total)} of ${total}">${h}</div>`;
  },

  // Star rating: n filled of `of` (default 3), each star `size` px. o.arc lifts the middle star (reward screens).
  stars(n, of = 3, size = 28, o = {}) {
    let h = '';
    for (let i = 0; i < of; i++) h += `<span class="rs${i < n ? ' on' : ''}">${ico('star', size, 'rs-b')}${ico('star', size, 'rs-f')}</span>`;
    return `<span class="rate${o.arc ? ' arc' : ''}" role="img" aria-label="${n} of ${of} stars">${h}</span>`;
  },

  // Tag: kind new | mast | skip | chal (or none = brand). icon optional.
  tag(text, kind = '', icon = '') {
    return `<span class="tag${kind ? ' ' + kind : ''}">${icon ? ico(icon, 16) : ''}${UI.t(text)}</span>`;
  },

  // Answer choice. html is the face (text, picFor() picture, symbol). o: kind (pic | sym | wide), i (data-i), v (data-v), aria, cls.
  choice(html, o = {}) {
    const cls = 'choice' + (o.kind ? ' ' + o.kind : '') + (o.cls ? ' ' + o.cls : '');
    const data = (o.i != null ? ` data-i="${esc(o.i)}"` : '') + (o.v != null ? ` data-v="${esc(o.v)}"` : '');
    return `<button class="${cls}"${data}${o.aria ? ` aria-label="${esc(o.aria)}"` : ''}>${html}</button>`;
  },

  // Path card for a subject. o: p, title, done, total, next (the next stop's name), id, icon (defaults by subject), attrs.
  pathcard(o) {
    const v = o.total ? o.done / o.total : 0;
    const next = o.next ? `Next: ${o.next}` : `${o.done} of ${o.total} stops`;
    return `<button class="pathcard s-${o.p}"${UI._id(o.id)}${o.attrs ? ' ' + o.attrs : ''}>` +
      `<span class="pc-badge">${ico(o.icon || UI.SUBJ_ICON[o.p] || 'map')}</span>` +
      `<span><span class="pc-t">${UI.t(o.title)}</span>${UI.meter(v, { label: `${o.done} of ${o.total} stops` })}` +
      `<span class="pc-next">${esc(next)}</span></span>` +
      `<span class="pc-go">${ico('play')}</span></button>`;
  },

  // Hint panel. html is the hint text or picture. o.steps: array of step strings, o.at: index of the step showing now;
  // o.next: label of the "next step" button (id "hintnext") shown while steps remain.
  hint(html, o = {}) {
    let steps = '';
    if (o.steps) {
      const at = o.at || 0;
      steps = '<ol class="hsteps">' + o.steps.map((s, i) => `<li class="${i == at ? 'on' : i > at ? 'later' : ''}">${esc(s)}</li>`).join('') + '</ol>';
      if (at < o.steps.length - 1) steps += UI.btn(o.next || 'Next step', { size: 'sm', icon: 'go', id: 'hintnext' });
    }
    return `<div class="hintp" role="note"><span class="hb">${ico('hint')}</span><div class="hx">${html || ''}${steps}</div></div>`;
  },

  // Context panel (passage): collapsible, scrolls inside. html is the passage (paragraphs).
  ctx(title, html, open = true, icon = 'path-read') {
    return `<details class="ctx"${open ? ' open' : ''}><summary>${ico(icon)}<span>${UI.t(title)}</span>${ico('chevron-right', 20, 'chev')}</summary>` +
      `<div class="ctx-b">${html}</div></details>`;
  },

  // Speech bubble. side: '' (tail bottom-left), 'r' (bottom-right), 'l' (left side).
  speech(text, side = '') {
    return `<div class="speech${side ? ' ' + side : ''}">${UI.t(text)}</div>`;
  },

  // Empty state: icon, one line, one action (html of a button, may be '').
  empty(icon, line, actionHtml = '') {
    return `<div class="blank"><span class="bi">${ico(icon)}</span><p>${UI.t(line)}</p>${actionHtml}</div>`;
  },

  // Switch. Read it with $('#id').checked.
  sw(label, on, id) {
    return `<label class="switch"><input type="checkbox" role="switch"${UI._id(id)}${on ? ' checked' : ''}>` +
      `<span class="sw" aria-hidden="true"></span><span>${UI.t(label)}</span></label>`;
  },

  // Segmented control. opts: [[value, label], ...]; cur: the selected value. Wire it with UI.segOn(el, v => ...).
  seg(opts, cur, o = {}) {
    const b = opts.map(([v, l]) => `<button data-v="${esc(v)}" aria-pressed="${String(v) === String(cur)}">${UI.t(l)}</button>`).join('');
    return `<div class="seg${o.full ? ' full' : ''}"${UI._id(o.id)} role="group"${o.label ? ` aria-label="${esc(o.label)}"` : ''}>${b}</div>`;
  },
  segOn(el, cb) {
    if (!el) return;
    el.onclick = e => {
      const b = e.target.closest('button');
      if (!b || b.disabled || !el.contains(b)) return;
      for (const x of el.querySelectorAll('button')) x.setAttribute('aria-pressed', String(x === b));
      cb(b.dataset.v);
    };
  },

  // Map node. o: p, state (lock | open | done | mast | skip), boss, icon or html (face), stars (0-3, shown under done/mast),
  // isNew (adds a "New" tag), aria, attrs.
  mapnode(o) {
    const cls = ['mapnode', o.p ? 's-' + o.p : '', o.state || '', o.boss ? 'boss' : ''].filter(Boolean).join(' ');
    const face = o.state == 'lock' ? ico('lock') : o.state == 'skip' ? ico('check') : o.html || ico(o.icon || 'star');
    const st = o.stars != null && (o.state == 'done' || o.state == 'mast') ? UI.stars(o.stars, 3, 18) : '';
    const tag = o.isNew ? UI.tag('New', 'new') : '';
    return `<button class="${cls}"${o.aria ? ` aria-label="${esc(o.aria)}"` : ''}${o.state == 'lock' ? ' aria-disabled="true"' : ''}` +
      `${o.attrs ? ' ' + o.attrs : ''}>${face}${st}${tag}</button>`;
  },

  // Toast: a pill at the top centre for ms milliseconds. kind: good | try | info.
  toast(text, kind = 'info', ms = 1600) {
    let t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.setAttribute('role', 'status');
      t.setAttribute('aria-live', 'polite');
      document.body.appendChild(t);
    }
    const icon = { good: 'check', try: 'replay', info: 'info' }[kind] || 'info';
    t.className = 'toast ' + kind;
    t.innerHTML = `<span class="ti">${ico(icon)}</span><span>${UI.t(text)}</span>`;
    void t.offsetWidth; // let it slide in again when shown twice in a row
    t.classList.add('on');
    clearTimeout(UI._toastT);
    UI._toastT = setTimeout(() => t.classList.remove('on'), ms);
  },

  // Sheet (modal): dim backdrop, slides up, inside #app so view() removes it. html is the body (h2, p, .acts with one primary).
  // o.stay: backdrop taps do not close it. o.onClose runs once when it closes. Returns {el, close}.
  sheet(html, o = {}) {
    const bg = document.createElement('div');
    bg.className = 'sheet-bg';
    bg.innerHTML = `<div class="sheet" role="dialog" aria-modal="true">${html}</div>`;
    (document.getElementById('app') || document.body).appendChild(bg);
    let shut = false;
    const close = () => {
      if (shut) return;
      shut = true;
      bg.classList.remove('on');
      setTimeout(() => bg.remove(), 340);
      if (o.onClose) o.onClose();
    };
    if (!o.stay) bg.onclick = e => { if (e.target === bg) close(); };
    requestAnimationFrame(() => requestAnimationFrame(() => bg.classList.add('on')));
    return { el: bg.firstChild, close };
  },
};
