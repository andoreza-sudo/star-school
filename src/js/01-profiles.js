/* ---------- children (P5-10): up to 4 children share one tablet, each with a whole save of their own ----------
   Storage (localStorage). Every child's save is the same S as always, under a key of its own:
     starschool-v2              child 1 (slot p1): the save every earlier version wrote, unchanged and never moved, so an older
                                cached app on an offline tablet still opens child 1 (ROADMAP section 9, rule 9)
     starschool-v2-p2 .. -p4    children 2 to 4 (slots p2-p4); each migrates like child 1 the first time it is played
     starschool-v2-profiles     the index {v: 1, ids: [slot order], cur: who played last}. It is never the only copy of anything:
                                a slot key that exists is a child even if the index forgot it, a listed slot whose key is gone is
                                dropped, a damaged index is kept under starschool-v2-profiles-corrupt and rebuilt from the slots
     per child: <key>-bak (migration backup), <key>-corrupt, <key>-undo (the backup load that can be undone, 81-backup.js),
     starschool-neon or starschool-neon-pN (Art Studio's neon pictures).
   Voice clips (IndexedDB 'starschool', 44-clips.js): child 1's clip ids are as before; another child's ids start with 'pN:'.
   With one child nothing changes: no index is written, the save stays where it was, no picker and no switch button on Home.
   Shared by the tablet: Sound effects, Music and Read questions out loud (the tablet's sound stays as it is when another child
   starts). Per child: everything else, including the game-time rules (bank, minutes per round, daily max, learn first, pause:
   siblings are different ages, so a grown-up sets them for each), grade, calm mode and the recorded voice lines (they say the
   child's name). A new child starts with the game-time rules of the child who was playing.
   Switching child writes the index and starts the app again (location.reload), like loading a backup (P5-07), so nothing of one
   child can stay in memory for the next. starschool-v2-go names the child just picked for that start only (then it is removed), so
   the app opens on "Who is playing?" at every new visit but not after a switch. Only functions here touch the page; at load this file only picks the save (PRF.boot). */
const PRF = {
  MAX: 4,
  SLOTS: ['p1', 'p2', 'p3', 'p4'],
  IDX: KEY + '-profiles',
  GO: KEY + '-go', // the child just picked, read once by the next start: a switch goes straight to Home, a new visit asks again
  SHARED: ['voice', 'sound', 'music'],
  FULL: "The tablet's storage is full, so nothing was changed. Save a backup, then delete something to make room.",
  cur: 'p1',
  ids: ['p1'],
  idxBad: false,
  picked: '', // the child picked in this visit (in memory only)

  // storage key of a slot's save; per-child name of another store (Art Studio)
  key(id) { return id === 'p1' ? KEY : KEY + '-' + id; },
  k(base, id = PRF.cur) { return id === 'p1' ? base : base + '-' + id; },
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  put(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
  drop(k) { try { localStorage.removeItem(k); } catch (e) {} },
  has(id) { return PRF.get(PRF.key(id)) !== null; },
  obj(raw) {
    let o = null;
    try { o = JSON.parse(raw); } catch (e) {}
    return o && typeof o == 'object' && !Array.isArray(o) ? o : null;
  },

  // the index as stored, with only known slots: {ids, cur}, or null (none, or damaged: then kept aside)
  readIdx() {
    const raw = PRF.get(PRF.IDX);
    if (raw === null) return null;
    const o = PRF.obj(raw);
    if (!o || !Array.isArray(o.ids)) {
      PRF.idxBad = true;
      PRF.put(PRF.IDX + '-corrupt', raw);
      return null;
    }
    const ids = [...new Set(o.ids.filter(id => PRF.SLOTS.includes(id)))];
    return { ids, cur: PRF.SLOTS.includes(o.cur) ? o.cur : ids[0] };
  },
  writeIdx(ids, cur) { return PRF.put(PRF.IDX, JSON.stringify({ v: 1, ids, cur })); },
  // At load, before 42-paths.js migrates S: the children that exist (the index order, then any slot it does not list) and the
  // one who played last, whose save is loaded. 00-core.js already loaded child 1, so that is read again only for another child.
  boot() {
    PRF.idxBad = false;
    PRF.picked = PRF.get(PRF.GO) || '';
    if (PRF.picked) PRF.drop(PRF.GO);
    const idx = PRF.readIdx();
    const listed = (idx ? idx.ids : []).filter(PRF.has);
    const ids = listed.concat(PRF.SLOTS.filter(id => !listed.includes(id) && PRF.has(id)));
    const cur = idx && ids.includes(idx.cur) ? idx.cur : ids[0] || 'p1';
    if (!ids.length) ids.push(cur);
    PRF.ids = ids;
    PRF.cur = cur;
    const k = PRF.key(cur);
    if (k !== SKEY) {
      SKEY = k;
      loadSave(PRF.get(k));
    }
  },
  count() { return PRF.ids.length; },
  many() { return PRF.ids.length > 1; },

  // what the picker and Grown-ups show of a child (the one playing from S, the others from their save)
  info(id) {
    const raw = id === PRF.cur ? null : PRF.get(PRF.key(id));
    const d = id === PRF.cur ? S : PRF.obj(raw), ok = !!d, s = d || {};
    const w = s.wear && typeof s.wear == 'object' ? s.wear : {};
    const str = (v, def) => typeof v == 'string' ? v : def;
    return {
      id, ok, name: str(s.name, '').trim(), pet: typeof PETS != 'undefined' && PETS[s.pet] ? s.pet : 'dragon',
      stars: Number.isFinite(s.stars) && s.stars > 0 ? Math.floor(s.stars) : 0,
      hat: str(w.hat, ''), toy: str(w.toy, ''), scene: str(w.scene, 'meadow'),
      kb: (id === PRF.cur ? JSON.stringify(S) : raw || '').length / 1024,
    };
  },
  label(i) { return i.name || (i.ok ? 'New child' : 'Child ' + (PRF.SLOTS.indexOf(i.id) + 1)); },
  pet(i) {
    return petSVG(i.pet, stage(i.stars), 'happy', { hat: wearOf(i.hat), toy: wearOf(i.toy) });
  },

  // a copy of a save string loaded and migrated the way it would be if that child played now (null when it cannot be read)
  up(raw) {
    if (!PRF.obj(raw)) return null;
    const keep = [S, SAVE_RAW, SAVE_CORRUPT];
    let m = null;
    try {
      loadSave(raw);
      if (S.maps && typeof PATHS != 'undefined') for (const p in PATHS) S.maps[p] = S.maps[p] || {};
      const from = Number.isInteger(S.v) && S.v >= 1 ? S.v : 1;
      for (let n = from; n < LATEST; n++) MIGRATIONS[n]();
      if (from < LATEST) S.v = LATEST;
      m = S;
    } catch (e) { m = null; }
    [S, SAVE_RAW, SAVE_CORRUPT] = keep;
    return m;
  },
  // a fresh save for a new child (what a first start makes), with the tablet's sound and the game-time rules of the child playing
  fresh() {
    const keep = [S, SAVE_RAW, SAVE_CORRUPT];
    loadSave(null);
    const f = S;
    [S, SAVE_RAW, SAVE_CORRUPT] = keep;
    for (const k of PRF.SHARED) f[k] = S[k];
    if (S.ptCfg && typeof S.ptCfg == 'object') f.ptCfg = JSON.parse(JSON.stringify(S.ptCfg));
    return f;
  },

  // ---- switching ----
  // id: the child picked, for this visit and the start that follows (a switch, a load); '' asks "Who is playing?" again
  setWho(id) {
    PRF.picked = id;
    if (id) PRF.put(PRF.GO, id);
    else PRF.drop(PRF.GO);
  },
  needPick() { return PRF.many() && PRF.picked !== PRF.cur; },
  // the tablet's sound settings go with the tablet: the next child's three switches are set like the current ones (only if they differ)
  carry(id) {
    const d = PRF.obj(PRF.get(PRF.key(id)));
    if (!d || PRF.SHARED.every(k => d[k] === S[k])) return;
    for (const k of PRF.SHARED) d[k] = S[k];
    PRF.put(PRF.key(id), JSON.stringify(d));
  },
  // Play as child id. Returns '' (the app starts again for them, or Home for the same child) or a message; then nothing changed.
  go(id) {
    if (!PRF.ids.includes(id)) return 'That child is not on this tablet.';
    if (id === PRF.cur) {
      PRF.setWho(id);
      home(true);
      return '';
    }
    save();
    if (!PRF.writeIdx(PRF.ids, id)) return PRF.FULL;
    PRF.carry(id);
    PRF.setWho(id);
    reloadSaved();
    return '';
  },

  // ---- add, rename, delete (Grown-ups) ----
  // Add a child: data is a save (a loaded backup), or null for a new child, who does the first-run setup.
  // Returns {id} or {msg}; with a message nothing was changed.
  add(data, playNow) {
    if (PRF.ids.length >= PRF.MAX) return { msg: 'There are already 4 children on this tablet. Delete one to make room.' };
    save();
    if (SAVE_FAILED || !PRF.has(PRF.cur)) return { msg: PRF.FULL };
    const id = PRF.SLOTS.find(s => !PRF.ids.includes(s)), k = PRF.key(id);
    for (const x of ['-bak', '-corrupt', '-undo']) PRF.drop(k + x); // left by nothing normally; a new child starts clean
    if (!PRF.put(k, JSON.stringify(data || PRF.fresh()))) {
      PRF.drop(k);
      return { msg: PRF.FULL };
    }
    const ids = PRF.ids.concat(id);
    if (!PRF.writeIdx(ids, playNow ? id : PRF.cur)) {
      PRF.drop(k);
      return { msg: PRF.FULL };
    }
    PRF.ids = ids;
    return { id };
  },
  // Returns '' or a message (then nothing changed).
  rename(id, name) {
    name = String(name || '').trim().slice(0, 40);
    if (!name) return 'Type a name first.';
    if (!PRF.ids.includes(id)) return 'That child is not on this tablet.';
    if (id === PRF.cur) {
      const old = S.name;
      S.name = name;
      save();
      if (SAVE_FAILED) {
        S.name = old;
        return PRF.FULL;
      }
      return '';
    }
    const d = PRF.obj(PRF.get(PRF.key(id)));
    if (!d) return "That child's progress could not be read, so the name was not changed.";
    d.name = name;
    return PRF.put(PRF.key(id), JSON.stringify(d)) ? '' : PRF.FULL;
  },
  // Delete a child and everything kept for them (never the last one: that is Start over). Resolves to '' or a message.
  async remove(id) {
    if (!PRF.ids.includes(id) || PRF.ids.length < 2) return 'That child cannot be deleted.';
    const k = PRF.key(id), ids = PRF.ids.filter(x => x !== id);
    if (id === PRF.cur) SAVE_OFF = true; // nothing may write the deleted save back before the app starts again
    for (const x of ['', '-bak', '-corrupt', '-undo']) PRF.drop(k + x);
    PRF.drop(PRF.k('starschool-neon', id));
    PRF.writeIdx(ids, id === PRF.cur ? ids[0] : PRF.cur); // if this fails, the next start drops the missing child by itself
    PRF.ids = ids;
    await PRF.dropClips(id);
    return '';
  },
  // Start over with more than one child: this child's save becomes a fresh one in the same place (setup runs again).
  async wipe() {
    if (!PRF.put(SKEY, JSON.stringify(PRF.fresh()))) return PRF.FULL;
    SAVE_OFF = true;
    PRF.drop(SKEY + '-undo');
    await PRF.dropClips(PRF.cur);
    return '';
  },
  // Back from setup when another child exists: a new child who never finished setup is removed again (nothing is lost).
  async cancelNew() {
    if (PRF.many() && !S.name && !(S.stars > 0)) await PRF.remove(PRF.cur);
    PRF.setWho('');
    reloadSaved();
  },

  // ---- voice clips: child 1 keeps the plain ids it always had; another child's start with 'pN:' ----
  clipOf(cid) {
    const m = /^(p[2-4]):/.exec(String(cid));
    return m ? m[1] : 'p1';
  },
  clipId() { return (PRF.cur === 'p1' ? '' : PRF.cur + ':') + Date.now(); },
  async dropClips(id) {
    try {
      for (const c of await DB.all()) if (PRF.clipOf(c.id) === id) await DB.del(c.id);
    } catch (e) {}
  },

  // ---- screens ----
  msg(t) {
    const el = $('#pf-msg');
    if (el) el.innerHTML = t ? `<p class="gw-warn">${ico('warning', 22)}<span>${esc(t)}</span></p>` : '';
  },
  // "Who is playing?": one big card per child (their pet on their place, the name, their stars). Tapping it plays as them.
  pick() {
    const cards = PRF.ids.map(id => {
      const i = PRF.info(id), nm = PRF.label(i);
      return `<button class="pf-kid" data-kid="${id}" aria-label="${esc(nm)}"><span class="pf-stage sc-${esc(i.scene)}">` +
        `${hmScene(i.scene)}<span class="pf-pet">${PRF.pet(i)}</span></span><span class="pf-nm">${esc(nm)}</span>` +
        `<span class="pf-st" aria-hidden="true">${ico('star', 24)}<b>${i.stars}</b></span></button>`;
    }).join('');
    view(`<div class="scroll pf-who" id="pfwho"><header class="pf-top"><h1 class="pf-t"><span class="hm-mark">${ico('star', 30)}</span>` +
      `<span>Who is playing?</span></h1>${UI.ibtn('speak', 'Hear it', { id: 'pfspk' })}</header>` +
      `<div class="pf-grid n${PRF.count()}">${cards}</div><div id="pf-msg" role="status"></div></div>`);
    $('#pfspk').onclick = e => say('Who is playing? Tap your picture.', e.currentTarget);
    $$('.pf-kid').forEach(b => b.onclick = () => {
      SFX.giggle();
      anim(b.querySelector('.pf-pet'), 'jump');
      const bad = PRF.go(b.dataset.kid);
      if (bad) PRF.msg(bad);
    });
  },
  // Home's top bar: hold to change who is playing (a tap only says so), shown only with more than one child
  homeBtn() { return PRF.many() ? UI.ibtn('users', 'Who is playing? Hold to change', { id: 'who', size: 'sm' }) : ''; },
  homeBind() {
    const b = $('#who');
    if (!b) return;
    let t;
    b.onpointerdown = () => { t = setTimeout(PRF.pick, 1000); };
    b.onpointerup = b.onpointerleave = () => clearTimeout(t);
    b.onclick = () => fb('Hold it to change who is playing', 'warn');
  },
  // Grown-ups: the Children card
  card() {
    const rows = PRF.ids.map(id => {
      const i = PRF.info(id), nm = PRF.label(i), me = id === PRF.cur;
      return `<div class="pf-row${me ? ' me' : ''}"><span class="pf-av sc-${esc(i.scene)}">${PRF.pet(i)}</span><span class="pf-rt">` +
        `<b>${esc(nm)}</b><span>${ico('star', 18, 'ic-star')}<span>${i.stars} star${i.stars == 1 ? '' : 's'}</span></span>` +
        `${me ? '<span class="tag pf-now">Playing now</span>' : ''}</span>` +
        `<span class="pf-ra">${UI.ibtn('edit', 'Rename ' + nm, { size: 'sm', attrs: `data-pren="${id}"` })}` +
        (PRF.many() ? UI.ibtn('trash', 'Delete ' + nm, { size: 'sm', cls: 'gw-del', attrs: `data-pdel="${id}"` }) : '') + '</span></div>';
    }).join('');
    const full = PRF.count() >= PRF.MAX;
    return GW.card('gw-kids', 'users', 'Children',
      `<div class="pf-list">${rows}</div><div class="gw-bkrow">` +
      UI.btn('Add a child', { kind: 'primary', size: 'sm', icon: 'plus', id: 'pf-add', off: full }) +
      (PRF.many() ? UI.btn('Who is playing?', { size: 'sm', icon: 'users', id: 'pf-who' }) : '') + '</div>' +
      (full ? `<p class="gw-note">${ico('info', 22)}<span>Up to 4 children can share this tablet.</span></p>` : '') + '<div id="pf-msg" role="status"></div>',
      { sub: 'Up to 4 children can share this tablet, each with their own progress, pet, stars, coins, stickers and game time. ' +
        'Sound settings are shared by the tablet; game-time rules, grade and calm mode are set for each child.' });
  },
  bind() {
    $('#pf-add').onclick = () => {
      const r = PRF.add(null, true);
      if (r.msg) return PRF.msg(r.msg);
      PRF.setWho(r.id);
      reloadSaved(); // starts with the first-run setup for the new child
    };
    if ($('#pf-who')) $('#pf-who').onclick = PRF.pick;
    $$('[data-pren]').forEach(b => b.onclick = () => PRF.renameSheet(b.dataset.pren));
    $$('[data-pdel]').forEach(b => b.onclick = () => PRF.deleteSheet(b.dataset.pdel));
  },
  renameSheet(id) {
    const nm = PRF.label(PRF.info(id));
    const sh = UI.sheet(`<h2>Rename ${esc(nm)}</h2>` + GW.field('Name', 'user', `id="pf-nm" value="${esc(PRF.info(id).name)}" maxlength="40"`) +
      `<div id="pf-rmsg" role="status"></div><div class="acts">${UI.btn('Save the name', { kind: 'primary', wide: true, icon: 'check', id: 'pf-rok' })}` +
      `${UI.btn('Cancel', { kind: 'ghost', wide: true, id: 'pf-rno' })}</div>`);
    sh.el.querySelector('#pf-rno').onclick = sh.close;
    sh.el.querySelector('#pf-rok').onclick = () => {
      const bad = PRF.rename(id, sh.el.querySelector('#pf-nm').value);
      if (bad) {
        sh.el.querySelector('#pf-rmsg').innerHTML = `<p class="gw-warn">${ico('warning', 22)}<span>${esc(bad)}</span></p>`;
        return;
      }
      sh.close();
      grown();
    };
  },
  // Delete asks twice; the first sheet also offers to save that child's backup first.
  deleteSheet(id) {
    const nm = esc(PRF.label(PRF.info(id)));
    const sh = UI.sheet(`<div class="sh-art pf-dz">${ico('trash', 48)}</div><h2>Delete ${nm}?</h2>` +
      `<p>This erases ${nm}'s progress, pet, stars, coins, stickers, game time and voice recordings on this tablet.</p>` +
      `<div class="acts"><div class="gw-bkrow">${UI.btn('Save a backup first', { size: 'sm', icon: 'download', id: 'pf-bk' })}${onlineNote()}</div>` +
      `${UI.btn('Delete ' + PRF.label(PRF.info(id)), { kind: 'risk', wide: true, icon: 'trash', id: 'pf-del1' })}` +
      `${UI.btn('Keep ' + PRF.label(PRF.info(id)), { kind: 'ghost', wide: true, id: 'pf-keep' })}</div>`);
    sh.el.querySelector('#pf-bk').onclick = () => BAK.save(id);
    sh.el.querySelector('#pf-keep').onclick = sh.close;
    sh.el.querySelector('#pf-del1').onclick = () => {
      const acts = sh.el.querySelector('.acts'), wasMe = id === PRF.cur;
      sh.el.querySelector('h2').textContent = 'Really delete ' + PRF.label(PRF.info(id)) + '?';
      sh.el.querySelector('p').textContent = 'This cannot be undone.';
      acts.innerHTML = UI.btn('Yes, delete ' + PRF.label(PRF.info(id)), { kind: 'risk', wide: true, icon: 'trash', id: 'pf-del2' }) +
        UI.btn('Keep ' + PRF.label(PRF.info(id)), { kind: 'ghost', wide: true, id: 'pf-keep' });
      sh.el.querySelector('#pf-keep').onclick = sh.close;
      sh.el.querySelector('#pf-del2').onclick = async () => {
        const name = PRF.label(PRF.info(id)), bad = await PRF.remove(id);
        sh.close();
        if (bad) return PRF.msg(bad);
        if (wasMe) {
          PRF.setWho('');
          reloadSaved(); // the next child starts (the picker, when more than one is left)
          return;
        }
        grown();
        fb(name + ' was deleted', 'info');
      };
    };
  },
  // App log: one line with each child's save size
  logLine() {
    if (!PRF.many()) return '';
    return `<div><b>Children</b> ${PRF.ids.map(id => { const i = PRF.info(id); return esc(PRF.label(i)) + ' ' + i.kb.toFixed(1) + ' KB'; }).join(', ')}` +
      `${PRF.idxBad ? ' <span class="gw-bad">(the list of children was damaged and was rebuilt)</span>' : ''}</div>`;
  },
};
PRF.boot();
