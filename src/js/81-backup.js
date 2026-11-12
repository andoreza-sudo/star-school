/* ---------- backup (P5-07): save the whole save as a file, load one back, undo the last load ----------
   Lives in the Grown-ups screen (80-grown.js calls BAK.card() and BAK.bind()). Nothing here touches the network: the file is built on
   the tablet and handed to the share sheet or a download link. Because sending a file off the tablet needs a connection, the Save
   buttons carry onlineNote() and run through needOnline(..., {block:false}): offline they warn, then still download the file.
   Loading checks everything first (right app, a save version we can migrate, sane types) on a copy, and only then replaces the save.
   The save it replaces is kept under KEY-undo until the next load or Start over. */
const BAK = {
  APP: 'Star School',
  UNDO: KEY + '-undo',
  MAX: 5e6, // bytes: a save is under 300 KB, so a bigger file is not a backup
  // The file text: a small header, then the whole save in "data".
  make() {
    return JSON.stringify({app: BAK.APP, ver: '__VER__', save: LATEST, date: new Date().toISOString(), name: S.name || '', data: S});
  },
  fileName() {
    const nm = String(S.name || 'child').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'child';
    const d = new Date();
    const p = n => String(n).padStart(2, '0');
    return `starschool-${nm}-${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}.json`;
  },
  // Returns a short problem (or '') for the types a save must have.
  types(d) {
    const obj = ['prog', 'stickers', 'day', 'maps', 'wdone', 'owned', 'wear'];
    const num = ['stars', 'coins', 'best'];
    const str = ['name', 'pet', 'petName', 'buddy'];
    for (const k of obj) if (d[k] !== undefined && !(d[k] && typeof d[k] == 'object' && !Array.isArray(d[k]))) return k + ' is not a list';
    for (const k of num) if (d[k] !== undefined && !(Number.isFinite(d[k]) && d[k] >= 0)) return k + ' is not a number';
    for (const k of str) if (d[k] !== undefined && typeof d[k] != 'string') return k + ' is not text';
    if (d.grade !== undefined && !Number.isInteger(d.grade)) return 'grade is not a number';
    if (d.rev !== undefined && !Array.isArray(d.rev)) return 'review is not a list';
    if (d.pet !== undefined && typeof PETS != 'undefined' && !PETS[d.pet]) return 'unknown pet';
    return '';
  },
  // Checks file text without touching anything. {ok:true, data (migrated copy), info} or {ok:false, msg}.
  read(text) {
    const no = msg => ({ok: false, msg});
    if (typeof text != 'string' || !text.trim()) return no('That file is empty.');
    if (text.length > BAK.MAX) return no('That file is too big to be a Star School backup.');
    let f;
    try { f = JSON.parse(text); } catch (e) { return no('That file is damaged, so it cannot be read.'); }
    if (!f || typeof f != 'object' || f.app !== BAK.APP) return no("That isn't a Star School backup.");
    const d = f.data;
    if (!d || typeof d != 'object' || Array.isArray(d)) return no('That backup is damaged: the progress is missing.');
    if (!Number.isInteger(f.save) || f.save < 1) return no('That backup is damaged: it has no save version.');
    if (f.save > LATEST || (Number.isInteger(d.v) && d.v > LATEST))
      return no('That backup was made by a newer Star School. Update the app on this tablet first, then try again.');
    const bad = BAK.types(d);
    if (bad) return no('That backup is damaged (' + bad + ').');
    // migrate a copy: the migrations work on the global S, so swap it in and always put it back
    const keep = S;
    let m = null;
    try {
      S = JSON.parse(JSON.stringify(d));
      const from = Number.isInteger(S.v) && S.v >= 1 ? S.v : f.save;
      if (S.maps && typeof PATHS != 'undefined') for (const p in PATHS) S.maps[p] = S.maps[p] || {};
      for (let n = from; n < LATEST; n++) MIGRATIONS[n]();
      S.v = LATEST;
      m = S;
    } catch (e) { m = null; }
    S = keep;
    if (!m) return no('That backup is damaged: it could not be brought up to date.');
    return {ok: true, data: m, info: {name: m.name || '', grade: m.grade, stars: m.stars || 0, coins: m.coins || 0, date: f.date}};
  },
  hasUndo() { try { return !!localStorage.getItem(BAK.UNDO); } catch (e) { return false; } },
  // Replaces the save with data from read(). Returns '' or a message; on a message nothing was changed.
  apply(data) {
    const raw = JSON.stringify(data);
    try { localStorage.setItem(BAK.UNDO, JSON.stringify(S)); }
    catch (e) { return 'There is no room to keep a copy of the current progress, so nothing was changed.'; }
    try { localStorage.setItem(KEY, raw); }
    catch (e) {
      try { localStorage.removeItem(BAK.UNDO); } catch (x) {}
      return 'The tablet storage is full, so nothing was changed.';
    }
    loadSave(raw);
    migrate();
    return '';
  },
  // Puts back the save that the last load replaced. Returns '' or a message.
  undo() {
    let raw = null;
    try { raw = localStorage.getItem(BAK.UNDO); } catch (e) {}
    let o = null;
    try { o = JSON.parse(raw); } catch (e) {}
    if (!o || typeof o != 'object' || Array.isArray(o)) return 'There is nothing to undo.';
    try { localStorage.setItem(KEY, raw); localStorage.removeItem(BAK.UNDO); } catch (e) { return 'The tablet storage is full, so nothing was changed.'; }
    loadSave(raw);
    migrate();
    return '';
  },
  // Save a backup: share sheet with the file when the browser has one, else a download link (works offline).
  save() {
    let file;
    const text = BAK.make();
    try { file = new File([text], BAK.fileName(), {type: 'application/json'}); } catch (e) { file = null; }
    needOnline(async () => {
      if (file && navigator.canShare && navigator.canShare({files: [file]})) {
        try { await navigator.share({files: [file], title: 'Star School backup'}); fb('Backup shared'); return; }
        catch (e) { if (e && e.name == 'AbortError') return; }
      }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([text], {type: 'application/json'}));
      a.download = BAK.fileName();
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      fb('Backup saved. Look in the Downloads folder.');
    }, {block: false});
  },
  msg(t) {
    const el = $('#bk-msg');
    if (el) el.innerHTML = t ? `<p class="gw-warn">${ico('warning', 22)}<span>${esc(t)}</span></p>` : '';
  },
  // The summary sheet, then Yes / Not now.
  review(text) {
    const r = BAK.read(text);
    if (!r.ok) return BAK.msg(r.msg);
    BAK.msg('');
    const i = r.info, d = i.date ? new Date(i.date) : null;
    const when = d && !isNaN(d) ? d.toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'}) : 'not known';
    const row = (k, v) => `<dt>${k}</dt><dd>${esc(v)}</dd>`;
    const sh = UI.sheet(`<h2>Replace this tablet's progress?</h2><dl class="gw-bks">${row('Name', String(i.name).slice(0, 40) || 'No name')}` +
      `${row('Grade', GRADES.includes(i.grade) ? gradeSpoken(i.grade) : 'Not set')}${row('Stars', i.stars)}${row('Coins', i.coins)}${row('Backed up on', when)}</dl>` +
      `<p>This tablet has ${S.stars} stars now. A copy of it is kept, so you can undo.</p><div class="acts">` +
      UI.btn('Yes, replace', {kind: 'primary', size: 'lg', wide: true, icon: 'check', id: 'bk-yes'}) + UI.btn('Not now', {kind: 'ghost', wide: true, id: 'bk-no'}) + '</div>');
    sh.el.querySelector('#bk-no').onclick = sh.close;
    sh.el.querySelector('#bk-yes').onclick = () => {
      const bad = BAK.apply(r.data);
      sh.close();
      if (bad) BAK.msg(bad); else { SAVE_HOLD = true; location.reload(); } // nothing saves over the loaded backup before the reload
    };
  },
  card() {
    return GW.card('gw-bak', 'download', 'Backup',
      `<div class="gw-bk"><div class="gw-bkrow">${UI.btn('Save a backup', {kind: 'primary', size: 'sm', icon: 'download', id: 'bk-save'})}${onlineNote()}</div>` +
      `<div class="gw-bkrow">${UI.btn('Load a backup', {size: 'sm', icon: 'upload', id: 'bk-load'})}<input type="file" id="bk-file" accept=".json,application/json" hidden>` +
      `${BAK.hasUndo() ? UI.btn('Undo last load', {size: 'sm', kind: 'ghost', icon: 'undo', id: 'bk-undo'}) : ''}</div>` +
      `<div id="bk-msg" role="status"></div></div>`,
      {sub: 'A backup is one small file with all progress, the pet, stars and coins. Keep it somewhere safe, or load it on another tablet.'});
  },
  bind() {
    $('#bk-save').onclick = BAK.save;
    $('#bk-first').onclick = BAK.save;
    $('#bk-load').onclick = () => $('#bk-file').click();
    $('#bk-file').onchange = async e => {
      const f = e.target.files[0];
      e.target.value = '';
      if (!f) return;
      let text = '';
      try { text = await f.text(); } catch (x) {}
      BAK.review(text);
    };
    const u = $('#bk-undo');
    if (u) u.onclick = () => { const bad = BAK.undo(); if (bad) BAK.msg(bad); else { SAVE_HOLD = true; location.reload(); } };
  },
};
