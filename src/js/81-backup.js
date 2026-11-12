/* ---------- backup (P5-07): save the whole save as a file, load one back, undo the last load ----------
   Lives in the Grown-ups screen (80-grown.js calls BAK.card() and BAK.bind()). Nothing here touches the network: the file is built on
   the tablet and handed to the share sheet or a download link. Because sending a file off the tablet needs a connection, the Save
   buttons carry onlineNote() and run through needOnline(..., {block:false}): offline they warn, then still download the file.
   Loading checks everything first (right app, a save version we can migrate, sane types) on a copy, and only then replaces the save.
   The save it replaces is kept under KEY-undo until the next load or Start over.
   P5-10 (children, 01-profiles.js): "Save a backup" saves the child who is playing (any child from the Delete sheet); "Save all
   children" saves every child in one file ({..., all: true, kids: [{name, data}]}). Loading one child's file asks which child it
   replaces, or adds it as a new child; a file of all children lists them and loads one at a time. The copy kept for "Undo last load"
   is the replaced child's: <their key>-undo (child 1: KEY-undo as before); only the last load is kept. */
const BAK = {
  APP: 'Star School',
  // the copy kept for "Undo last load": the replaced child's <key>-undo (only one is kept); without one, the playing child's name for it
  get UNDO() { return BAK.undoKey() || SKEY + '-undo'; },
  undoKey() { return PRF.SLOTS.map(id => PRF.key(id) + '-undo').find(k => PRF.get(k) !== null) || ''; },
  MAX: 5e6, // bytes: a save is under 300 KB, so a bigger file is not a backup
  // The file text: a small header, then the whole save in "data". id: another child (P5-10), migrated as it would be to play.
  make(id) {
    const d = id && id !== PRF.cur ? PRF.up(PRF.get(PRF.key(id))) : S;
    if (!d) return '';
    return JSON.stringify({app: BAK.APP, ver: '__VER__', save: LATEST, date: new Date().toISOString(), name: d.name || '', data: d});
  },
  // Every child in one file (P5-10)
  makeAll() {
    const kids = PRF.ids.map(id => id === PRF.cur ? S : PRF.up(PRF.get(PRF.key(id)))).filter(Boolean);
    return JSON.stringify({app: BAK.APP, ver: '__VER__', save: LATEST, date: new Date().toISOString(), all: true,
      kids: kids.map(d => ({name: d.name || '', data: d}))});
  },
  fileName(name) {
    const nm = String((name === undefined ? S.name : name) || 'child').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'child';
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
    if (Array.isArray(f.kids)) { // P5-10: every child; each one is checked like a one-child file
      if (!f.kids.length || f.kids.length > PRF.MAX) return no('That backup is damaged: the children are missing.');
      const kids = [];
      for (const k of f.kids) {
        const r = BAK.one(k && k.data, f.save, f.date);
        if (!r.ok) return r;
        kids.push(r);
      }
      return {ok: true, all: true, kids, info: {n: kids.length, date: f.date}};
    }
    return BAK.one(f.data, f.save, f.date);
  },
  // One child's save from a file: checked, then migrated on a copy. {ok:true, data, info} or {ok:false, msg}.
  one(d, save, date) {
    const no = msg => ({ok: false, msg});
    if (!d || typeof d != 'object' || Array.isArray(d)) return no('That backup is damaged: the progress is missing.');
    if (!Number.isInteger(save) || save < 1) return no('That backup is damaged: it has no save version.');
    if (save > LATEST || (Number.isInteger(d.v) && d.v > LATEST))
      return no('That backup was made by a newer Star School. Update the app on this tablet first, then try again.');
    const bad = BAK.types(d);
    if (bad) return no('That backup is damaged (' + bad + ').');
    // migrate a copy: the migrations work on the global S, so swap it in and always put it back
    const keep = S;
    let m = null;
    try {
      S = JSON.parse(JSON.stringify(d));
      const from = Number.isInteger(S.v) && S.v >= 1 ? S.v : save;
      if (S.maps && typeof PATHS != 'undefined') for (const p in PATHS) S.maps[p] = S.maps[p] || {};
      for (let n = from; n < LATEST; n++) MIGRATIONS[n]();
      S.v = LATEST;
      m = S;
    } catch (e) { m = null; }
    S = keep;
    if (!m) return no('That backup is damaged: it could not be brought up to date.');
    return {ok: true, data: m, info: {name: m.name || '', grade: m.grade, stars: m.stars || 0, coins: m.coins || 0, date}};
  },
  hasUndo() { return !!BAK.undoKey(); },
  // Replaces a child's save (the one playing unless id says another, P5-10) with data from read(). Returns '' or a message;
  // on a message nothing was changed. The replaced save is kept for "Undo last load" (only the last load: other copies go).
  apply(data, id = PRF.cur) {
    const raw = JSON.stringify(data), k = PRF.key(id), me = id === PRF.cur;
    const old = me ? JSON.stringify(S) : PRF.get(k);
    if (old === null || !PRF.ids.includes(id)) return 'That child is not on this tablet.';
    try { localStorage.setItem(k + '-undo', old); }
    catch (e) { return 'There is no room to keep a copy of the current progress, so nothing was changed.'; }
    try { localStorage.setItem(k, raw); }
    catch (e) {
      try { localStorage.removeItem(k + '-undo'); } catch (x) {}
      return 'The tablet storage is full, so nothing was changed.';
    }
    for (const s of PRF.SLOTS) if (s !== id) PRF.drop(PRF.key(s) + '-undo');
    if (me) {
      loadSave(raw);
      migrate();
    }
    return '';
  },
  // Puts back the save that the last load replaced (whichever child it was). Returns '' or a message.
  undo() {
    const u = BAK.undoKey(), raw = u ? PRF.get(u) : null, k = u.slice(0, -5);
    let o = null;
    try { o = JSON.parse(raw); } catch (e) {}
    if (!o || typeof o != 'object' || Array.isArray(o)) return 'There is nothing to undo.';
    try { localStorage.setItem(k, raw); localStorage.removeItem(u); } catch (e) { return 'The tablet storage is full, so nothing was changed.'; }
    if (k === SKEY) {
      loadSave(raw);
      migrate();
    }
    return '';
  },
  // Save a backup: share sheet with the file when the browser has one, else a download link (works offline).
  // what: 'all' (every child, P5-10), a child's slot id (the Delete sheet), else the child playing.
  save(what) {
    let file;
    const all = what === 'all', id = PRF.SLOTS.includes(what) ? what : PRF.cur;
    const text = all ? BAK.makeAll() : BAK.make(id), name = BAK.fileName(all ? 'all-children' : PRF.info(id).name);
    if (!text) return fb("That child's progress could not be read.", 'warn');
    try { file = new File([text], name, {type: 'application/json'}); } catch (e) { file = null; }
    needOnline(async () => {
      if (file && navigator.canShare && navigator.canShare({files: [file]})) {
        try { await navigator.share({files: [file], title: 'Star School backup'}); fb('Backup shared'); return; }
        catch (e) { if (e && e.name == 'AbortError') return; }
      }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([text], {type: 'application/json'}));
      a.download = name;
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
  when(date) {
    const d = date ? new Date(date) : null;
    return d && !isNaN(d) ? d.toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'}) : 'not known';
  },
  // The summary sheet. One child on the tablet: Yes / Not now as before, plus "Add as a new child" (P5-10); with more children,
  // one Replace button per child (the one playing first, #bk-yes). A file of all children: pick the child to load first.
  review(text) {
    const r = BAK.read(text);
    if (!r.ok) return BAK.msg(r.msg);
    BAK.msg('');
    if (r.all) return BAK.pickKid(r);
    BAK.ask(r);
  },
  ask(r) {
    const i = r.info, many = PRF.many(), room = PRF.count() < PRF.MAX;
    const row = (k, v) => `<dt>${k}</dt><dd>${esc(v)}</dd>`;
    const dl = `<dl class="gw-bks">${row('Name', String(i.name).slice(0, 40) || 'No name')}` +
      `${row('Grade', GRADES.includes(i.grade) ? gradeSpoken(i.grade) : 'Not set')}${row('Stars', i.stars)}${row('Coins', i.coins)}` +
      `${row('Backed up on', BAK.when(i.date))}</dl>`;
    const add = room ? UI.btn('Add as a new child', {wide: true, icon: 'plus', id: 'bk-new'}) : '';
    const no = UI.btn('Not now', {kind: 'ghost', wide: true, id: 'bk-no'});
    const sh = UI.sheet(many
      ? `<h2>Load this backup?</h2>${dl}<p>Pick the child it replaces. A copy of their progress is kept, so you can undo.</p><div class="acts">` +
        PRF.ids.map(id => UI.btn('Replace ' + PRF.label(PRF.info(id)), {kind: id === PRF.cur ? 'primary' : 'soft', wide: true, icon: 'check',
          id: id === PRF.cur ? 'bk-yes' : '', attrs: `data-bkto="${id}"`})).join('') + add + no + '</div>'
      : `<h2>Replace this tablet's progress?</h2>${dl}` +
        `<p>This tablet has ${S.stars} stars now. A copy of it is kept, so you can undo.</p><div class="acts">` +
        UI.btn('Yes, replace', {kind: 'primary', size: 'lg', wide: true, icon: 'check', id: 'bk-yes', attrs: `data-bkto="${PRF.cur}"`}) + add + no + '</div>');
    sh.el.querySelector('#bk-no').onclick = sh.close;
    sh.el.querySelectorAll('[data-bkto]').forEach(b => b.onclick = () => {
      const id = b.dataset.bkto, bad = BAK.apply(r.data, id);
      sh.close();
      if (bad) BAK.msg(bad);
      else if (id === PRF.cur) {
        PRF.setWho(id);
        location.reload();
      }
      else {
        grown();
        fb(PRF.label(PRF.info(id)) + "'s progress was loaded", 'info');
      }
    });
    const nb = sh.el.querySelector('#bk-new');
    if (nb) nb.onclick = () => {
      const res = PRF.add(r.data, false);
      sh.close();
      if (res.msg) return BAK.msg(res.msg);
      grown();
      fb(PRF.label(PRF.info(res.id)) + ' was added', 'info');
    };
  },
  pickKid(r) {
    const n = r.kids.length;
    const sh = UI.sheet(`<h2>Backup of ${n} ${n == 1 ? 'child' : 'children'}</h2>` +
      `<p>Backed up on ${esc(BAK.when(r.info.date))}. Load one child at a time.</p><div class="pf-list">` +
      r.kids.map((k, j) => `<div class="pf-row"><span class="pf-rt"><b>${esc(String(k.info.name).slice(0, 40) || 'No name')}</b>` +
        `<span>${ico('star', 18, 'ic-star')}<span>${k.info.stars} star${k.info.stars == 1 ? '' : 's'}</span></span></span>` +
        `<span class="pf-ra">${UI.btn('Load', {size: 'sm', icon: 'upload', attrs: `data-bkkid="${j}"`})}</span></div>`).join('') +
      `</div><div class="acts">${UI.btn('Not now', {kind: 'ghost', wide: true, id: 'bk-no'})}</div>`);
    sh.el.querySelector('#bk-no').onclick = sh.close;
    sh.el.querySelectorAll('[data-bkkid]').forEach(b => b.onclick = () => {
      sh.close();
      BAK.ask(r.kids[+b.dataset.bkkid]);
    });
  },
  card() {
    return GW.card('gw-bak', 'download', 'Backup',
      `<div class="gw-bk"><div class="gw-bkrow">${UI.btn('Save a backup', {kind: 'primary', size: 'sm', icon: 'download', id: 'bk-save'})}${onlineNote()}</div>` +
      (PRF.many() ? `<div class="gw-bkrow">${UI.btn('Save all children', {size: 'sm', icon: 'download', id: 'bk-all'})}${onlineNote()}</div>` : '') +
      `<div class="gw-bkrow">${UI.btn('Load a backup', {size: 'sm', icon: 'upload', id: 'bk-load'})}<input type="file" id="bk-file" accept=".json,application/json" hidden>` +
      `${BAK.hasUndo() ? UI.btn('Undo last load', {size: 'sm', kind: 'ghost', icon: 'undo', id: 'bk-undo'}) : ''}</div>` +
      `<div id="bk-msg" role="status"></div></div>`,
      {sub: 'A backup is one small file with all progress, the pet, stars and coins. Keep it somewhere safe, or load it on another tablet.'});
  },
  bind() {
    $('#bk-save').onclick = BAK.save;
    $('#bk-first').onclick = BAK.save;
    if ($('#bk-all')) $('#bk-all').onclick = () => BAK.save('all');
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
    if (u) u.onclick = () => {
      const bad = BAK.undo();
      if (bad) return BAK.msg(bad);
      PRF.setWho(PRF.cur);
      location.reload();
    };
  },
};
