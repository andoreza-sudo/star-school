/* ---------- KINDS2 batch A: the sort and mark kinds, bank builders, mixed formats, "not three in a row" ----------
   Design: docs/KINDS2-SPEC.md (sections 2.1, 2.2, 3, 4). This file is in the gen2 part (tools/build.py PARTS), loaded at start
   after index.html's own code, so KIND, BANKF and SK exist when it runs and the kinds exist before the first question.
   Kind fields (the KIND contract is in 49-kinds.js):
     sort   bins [{v, l, h}] 2 or 3; items [{v, l, h, b, say, al, lang}] 3 to 6 in the order shown, b is a bin's v;
            ans = the items' b values in item order joined by '|'; ansSay or binSay optional. Tap a chip, then a bin (or drag it);
            tap a placed chip to send it back. Check submits the bins' values in item order (an array).
     mark   words [token, ...] (punctuation stays on its word), at most 14 tokens and 90 characters; ans = token indexes as strings,
            sorted with kindSort; one: true when one word is right (a tap submits [i]); html holds the instruction only.
   Kind state lives on st (G in a round, PL in placement): st.sortAt (bin index per item or null), st.sortSel, st.sortOk (locked right
   after a first miss), st.sortDrag; st.mkSel, st.mkOk. Every handler ignores taps while st.lock is set.
   Hooks for the later batches: KIND.line and KIND.make register here the same way; a stop gets another format by a K2GEN entry
   (share, converter); a bank form by BANKF and BANKNEW; the why feedback goes in check() (50-round.js) on the first miss. */

// K2.off: true makes every generator and bank exactly what it was before KINDS2 (no format draw, tap items as a choice, no new
// bank forms). tools/test.js turns it on around the old seed hashes, which shows that the existing draws are unchanged.
const K2 = {off: false};

// ---- shared helpers ----
const k2Cap = s => String(s).charAt(0).toUpperCase() + String(s).slice(1);
const k2Plain = s => String(s).replace(/<[^>]*>/g, '').trim();
// the two marks every state shows besides its colour (a11y signal rule): a tick for right, a cross for wrong
const k2Marks = () => `<span class="k2mk" aria-hidden="true">${ico('check', 18, 'k2ok')}${ico('close', 18, 'k2no')}</span>`;
// a chip speaks its word when tapped: pictures, Spanish words, and every chip for young children (Pre-K to 1st)
function k2SayChip(el) {
  const t = el && el.dataset.say;
  if (!t) return;
  if (el.dataset.pic || el.dataset.lang || gradeCfg().auto !== 'tap') say(t, null, el.dataset.lang || null);
}
// replays the shake animation on an element
function k2Shake(el) {
  el.classList.remove('k2shake');
  void el.offsetWidth;
  el.classList.add('k2shake');
}
const k2Fit = () => {
  if (typeof fit == 'function') fit();
};

// ---- sort: put items into 2 or 3 bins ----
KIND.sort = {
  render(q) {
    const name = b => k2Plain(b.al || b.l);
    const bin = (b, i) => `<div class="sbin" data-b="${i}"><button class="sbt" data-b="${i}" aria-label="${esc(name(b))}">`
      + `<span class="sbl">${b.h ? b.l : esc(b.l)}</span><span class="sbc" aria-hidden="true">0</span></button><div class="sbz"></div></div>`;
    const chip = (c, i) => `<button class="schip" data-i="${i}" aria-pressed="false"`
      + (c.say ? ` data-say="${esc(c.say)}"` : '') + (c.lang ? ` data-lang="${esc(c.lang)}"` : '') + (c.h ? ' data-pic="1"' : '')
      + (c.al ? ` aria-label="${esc(c.al)}"` : '') + `><span class="scl">${c.h ? c.l : esc(c.l)}</span>${k2Marks()}</button>`;
    return `<div class="sbins sb${q.bins.length}">${q.bins.map(bin).join('')}</div>`
      + `<div class="stray">${q.items.map((c, i) => `<span class="sslot" data-s="${i}">${chip(c, i)}</span>`).join('')}</div>`
      + UI.btn('Check', {kind: 'primary', icon: 'check', id: 'mcheck', cls: 'mgo', off: true});
  },
  bind(q, st, submit) {
    const K = KIND.sort;
    st.sortAt = q.items.map(() => null);
    st.sortSel = null;
    st.sortOk = [];
    st.sortDrag = null;
    st.sortSkip = false;
    st.sortHeld = false;
    K.cur = q;
    $$('.schip').forEach(b => {
      b.onclick = () => K.tapChip(q, st, +b.dataset.i);
      b.onpointerdown = e => K.down(q, st, e, b);
    });
    $$('.sbt').forEach(b => b.onclick = () => K.tapBin(q, st, +b.dataset.b));
    $('#mcheck').onclick = () => {
      if (st.lock || st.sortAt.some(x => x == null)) return;
      submit(st.sortAt.map(b => q.bins[b].v), null);
    };
    K.draw(q, st);
  },
  chip: i => $(`.schip[data-i="${i}"]`),
  // a chip's own place in the tray: it keeps the chip's size while the chip is in a bin, so the tray never reflows
  slot: i => $(`.sslot[data-s="${i}"]`),
  // FIX3 (no layout shift): the tray keeps every chip's place, and the bins are as tall from the start as with every chip in its
  // right bin (the answer) and never shrink during the question (keep), so placing chips, Check, the retry and the shown answer
  // move nothing else on the screen (smoke P4-17, a sort in the boss). Measured once the question is drawn and again on a resize.
  hold(q) {
    const K = KIND.sort, bins = $$('.sbin'), zones = $$('.sbz');
    if (!bins.length || !$('.stray')) return;
    const f = document.activeElement;
    q.items.forEach((c, i) => {
      const s = K.slot(i), el = K.chip(i);
      if (!s || !el || el.parentNode !== s) return;
      s.style.minWidth = s.style.minHeight = '';
      const r = el.getBoundingClientRect();
      s.style.minWidth = r.width + 'px';
      s.style.minHeight = r.height + 'px';
    });
    bins.forEach(b => { b.style.minHeight = ''; });
    const home = q.items.map((c, i) => K.chip(i) && K.chip(i).parentNode);
    q.items.forEach((c, i) => K.put(K.chip(i), zones[q.bins.findIndex(b => String(b.v) === String(c.b))]));
    const h = Math.max(...bins.map(b => b.getBoundingClientRect().height));
    q.items.forEach((c, i) => K.put(K.chip(i), home[i]));
    bins.forEach(b => { b.style.minHeight = h + 'px'; });
    if (f && f !== document.activeElement && f.isConnected) f.focus({preventScroll: true});
    K.keep();
  },
  // a bin that grew (a wrong bin holding more chips than the answer) keeps that height until the next question
  keep() {
    const bins = $$('.sbin');
    if (!bins.length) return;
    const h = Math.max(...bins.map(b => b.getBoundingClientRect().height));
    bins.forEach(b => { if ((parseFloat(b.style.minHeight) || 0) < h) b.style.minHeight = h + 'px'; });
  },
  // a chip goes into a box (the tray or a bin) in item order, and is only moved when its box changes (moving keeps no focus)
  put(el, box) {
    if (!el || !box || el.parentNode === box) return;
    const i = +el.dataset.i, nx = [...box.children].find(x => +x.dataset.i > i);
    box.insertBefore(el, nx || null);
  },
  tapChip(q, st, i) {
    const K = KIND.sort;
    if (st.sortSkip) { // the click that ends a drag
      st.sortSkip = false;
      return;
    }
    if (st.lock || st.sortOk.includes(i)) return;
    if (st.sortAt[i] != null) { // a placed chip goes back to the tray
      st.sortAt[i] = null;
      st.sortSel = null;
      SFX.del();
    } else {
      st.sortSel = st.sortSel === i ? null : i;
      SFX.pop(1);
      if (st.sortSel === i) k2SayChip(K.chip(i));
    }
    K.draw(q, st);
  },
  tapBin(q, st, b) {
    if (st.lock) return;
    if (st.sortSel == null) { // nothing picked yet: the tray glows to show where to start
      const t = $('.stray');
      if (t) k2Shake(t);
      return;
    }
    st.sortAt[st.sortSel] = b;
    st.sortSel = null;
    SFX.pop(2);
    KIND.sort.draw(q, st);
  },
  // drag (an extra to tapping): starts after 8 px, the chip follows the finger, a drop on a bin puts it there, anywhere else the tray
  down(q, st, e, el) {
    const K = KIND.sort, i = +el.dataset.i;
    st.sortSkip = false;
    if (st.lock || e.button > 0 || st.sortOk.includes(i)) return;
    const d = {x: e.clientX, y: e.clientY, on: false, id: e.pointerId};
    st.sortDrag = d;
    try { el.setPointerCapture(d.id); } catch (_) { /* the pointer is gone */ } // the moves come to the chip even off it
    el.onpointermove = ev => {
      if (st.sortDrag !== d) return;
      const dx = ev.clientX - d.x, dy = ev.clientY - d.y;
      if (!d.on) {
        if (Math.hypot(dx, dy) < 8) return;
        d.on = true;
        el.classList.add('drag');
      }
      el.style.transform = `translate(${dx}px,${dy}px)`;
    };
    el.onpointerup = ev => {
      if (st.sortDrag !== d) return;
      st.sortDrag = null;
      K.stopDrag(el, d);
      if (!d.on || st.lock || !el.isConnected) return;
      st.sortSkip = true; // the click that follows this pointerup is not a tap
      setTimeout(() => { st.sortSkip = false; }, 0);
      const hit = document.elementsFromPoint(ev.clientX, ev.clientY).find(x => !el.contains(x) && x.closest && x.closest('.sbin'));
      st.sortAt[i] = hit ? +hit.closest('.sbin').dataset.b : null;
      st.sortSel = null;
      SFX.pop(2);
      K.draw(q, st);
    };
    el.onpointercancel = () => {
      if (st.sortDrag !== d) return;
      st.sortDrag = null;
      K.stopDrag(el, d);
    };
  },
  stopDrag(el, d) {
    el.classList.remove('drag');
    el.style.transform = '';
    el.onpointermove = el.onpointerup = el.onpointercancel = null;
    try { if (el.hasPointerCapture && el.hasPointerCapture(d.id)) el.releasePointerCapture(d.id); } catch (_) { /* gone */ }
  },
  // the count on each bin, its spoken name with the count
  counts(q) {
    $$('.sbin').forEach((b, k) => {
      const n = b.querySelectorAll('.schip').length, t = b.querySelector('.sbt');
      b.querySelector('.sbc').textContent = n;
      b.classList.toggle('has', n > 0);
      t.setAttribute('aria-label', k2Plain(q.bins[k].al || q.bins[k].l) + ': ' + n);
    });
  },
  draw(q, st) {
    const K = KIND.sort, tray = $('.stray'), zones = $$('.sbz');
    if (!tray) return;
    q.items.forEach((c, i) => {
      const el = K.chip(i);
      if (!el) return;
      const at = st.sortAt[i], on = st.sortSel === i;
      K.put(el, at == null ? K.slot(i) : zones[at]);
      el.classList.toggle('sel', on);
      el.classList.toggle('in', at != null);
      el.classList.toggle('done', st.sortOk.includes(i));
      el.setAttribute('aria-pressed', on);
    });
    K.counts(q);
    tray.classList.toggle('empty', !tray.querySelector('.schip'));
    const go = $('#mcheck');
    if (go) go.disabled = st.sortAt.some(x => x == null);
    if (!st.sortHeld) { // the first draw of the question
      st.sortHeld = true;
      K.hold(q);
    } else K.keep();
    k2Fit();
  },
  same: (q, v) => (Array.isArray(v) ? v.map(String).join('|') : String(v)) === q.ans,
  right() {
    $$('.schip').forEach(el => el.classList.add('right'));
    $$('.sbin').forEach(b => b.classList.add('ok'));
  },
  // first miss: right chips lock in place (tick), wrong ones shake (cross) and go back to the tray
  retry(q, st, ready) {
    const K = KIND.sort, bad = [];
    q.items.forEach((c, i) => {
      const at = st.sortAt[i];
      if (at != null && String(q.bins[at].v) === String(c.b)) {
        if (!st.sortOk.includes(i)) st.sortOk.push(i);
      } else bad.push(i);
    });
    st.sortSel = null;
    K.draw(q, st);
    bad.forEach(i => {
      const el = K.chip(i);
      if (!el) return;
      el.classList.add('wrong');
      k2Shake(el);
    });
    const k = st.sortOk.length;
    fb(k ? `${k} of ${q.items.length} are home. Try the others!` : 'Not yet. Look at each one again!', 'again');
    st.lock = true;
    setTimeout(() => {
      if (st.dead) return;
      st.lock = false;
      bad.forEach(i => {
        st.sortAt[i] = null;
        const el = K.chip(i);
        if (el) el.classList.remove('wrong');
      });
      K.draw(q, st);
      if (ready) ready();
    }, 700);
  },
  // second miss: every chip still out of place moves to its bin, marked .rev
  reveal(q) {
    const K = KIND.sort, zones = $$('.sbz');
    q.items.forEach((c, i) => {
      const el = K.chip(i), b = q.bins.findIndex(x => String(x.v) === String(c.b));
      if (!el || !zones[b]) return;
      el.classList.remove('sel', 'wrong', 'drag');
      el.classList.add(el.parentNode === zones[b] ? 'done' : 'rev');
      K.put(el, zones[b]);
      el.disabled = true;
    });
    K.counts(q);
    K.keep();
    const go = $('#mcheck');
    if (go) go.disabled = true;
    k2Fit();
  },
  spoken: q => q.ansSay || q.bins.map(b => {
    const its = q.items.filter(c => String(c.b) === String(b.v)).map(c => c.say || k2Plain(c.al || c.l));
    return (q.binSay && q.binSay[b.v] || k2Plain(b.al || b.l)) + ': ' + its.join(', ');
  }).join('. '),
  validate(q) {
    const p = [];
    if (!Array.isArray(q.bins) || q.bins.length < 2 || q.bins.length > 3) return ['sort: needs 2 or 3 bins'];
    if (!Array.isArray(q.items) || q.items.length < 3 || q.items.length > 6) return ['sort: needs 3 to 6 items'];
    const bv = q.bins.map(b => b && String(b.v));
    if (q.bins.some(b => !b || b.v == null || b.l == null || b.l === '')) p.push('sort: a bin has no v or l');
    if (new Set(bv).size !== bv.length) p.push('sort: duplicate bin values');
    if (q.items.some(c => !c || c.v == null || c.l == null || c.l === '')) p.push('sort: an item has no v or l');
    if (q.items.some(c => c && !bv.includes(String(c.b)))) p.push('sort: an item is in no bin');
    for (const v of bv) if (!q.items.some(c => c && String(c.b) === v)) p.push('sort: bin ' + v + ' has no item');
    if (new Set(q.items.map(c => c && String(c.v))).size !== q.items.length) p.push('sort: duplicate item values');
    if (new Set(q.items.map(c => c && String(c.l))).size !== q.items.length) p.push('sort: duplicate item labels');
    if (q.bins.length == 3 && q.bins.some(b => !b.h && String(b.l).length > 9)) p.push('sort: 3 bins need labels of 9 letters or fewer');
    if (q.ans !== q.items.map(c => c && String(c.b)).join('|')) p.push('sort: ans is not the items\' bins joined by |');
    return p;
  },
};
// a resize (a turned tablet) measures the tray places and the bins of the sort on screen again
addEventListener('resize', () => {
  const q = KIND.sort.cur;
  if (q && q.kind === 'sort' && $('.stray')) KIND.sort.hold(q);
  const v = $('.mmv'); // fix2 v194: and whether the make model's fraction parts are big enough to tap
  if (v && KIND.make && KIND.make.notap) KIND.make.notap(v);
});

// ---- mark: tap word(s) in a sentence ----
KIND.mark = {
  render: q => `<div class="mkw">${q.words.map((w, i) => `<button class="mkt" data-i="${i}"${q.one ? '' : ' aria-pressed="false"'}>`
    + `<span class="mkx">${esc(w)}</span>${k2Marks()}</button>`).join('')}</div>`
    + (q.one ? '' : UI.btn('Check', {kind: 'primary', icon: 'check', id: 'mcheck', cls: 'mgo', off: true})),
  bind(q, st, submit) {
    const K = KIND.mark;
    st.mkSel = [];
    st.mkOk = [];
    $$('.mkt').forEach(b => b.onclick = () => {
      const i = +b.dataset.i;
      if (st.lock || b.disabled || st.mkOk.includes(i)) return;
      if (q.one) return submit([String(i)], b);
      const at = st.mkSel.indexOf(i);
      if (at < 0) st.mkSel.push(i);
      else st.mkSel.splice(at, 1);
      SFX.pop(2);
      K.draw(q, st);
    });
    const go = $('#mcheck');
    if (go) go.onclick = () => {
      if (!st.lock && st.mkSel.length) submit(kindSort(st.mkSel.map(String)), null);
    };
  },
  draw(q, st) {
    $$('.mkt').forEach(b => {
      const i = +b.dataset.i, on = st.mkSel.includes(i);
      b.classList.toggle('on', on);
      b.classList.toggle('right', st.mkOk.includes(i));
      if (!q.one) b.setAttribute('aria-pressed', on);
    });
    const go = $('#mcheck');
    if (go) go.disabled = !st.mkSel.length;
  },
  same: (q, v) => Array.isArray(v) && Array.isArray(q.ans) && kindSort(v.map(String)).join('|') === kindSort(q.ans.map(String)).join('|'),
  right(q) {
    $$('.mkt').forEach(b => {
      if (q.ans.includes(b.dataset.i)) b.classList.add('right');
    });
  },
  // first miss: right picks lock (tick), wrong picks shake (cross) and unselect; words not found yet stay hidden
  retry(q, st) {
    if (q.one) return; // check() has marked the tapped word wrong and turned it off
    const ok = st.mkSel.filter(i => q.ans.includes(String(i))), bad = st.mkSel.filter(i => !q.ans.includes(String(i)));
    ok.forEach(i => { if (!st.mkOk.includes(i)) st.mkOk.push(i); });
    st.mkSel = [...st.mkOk];
    bad.forEach(i => {
      const b = $(`.mkt[data-i="${i}"]`);
      if (!b) return;
      b.classList.add('wrong');
      k2Shake(b);
      setTimeout(() => b.classList.remove('wrong'), 700);
    });
    KIND.mark.draw(q, st);
    fb(`You found ${st.mkOk.length} of ${q.ans.length}.`, 'again');
  },
  reveal(q) {
    $$('.mkt').forEach(b => {
      if (q.ans.includes(b.dataset.i)) b.classList.add('right', 'rev');
      b.classList.remove('on');
      b.disabled = true;
    });
    const go = $('#mcheck');
    if (go) go.disabled = true;
  },
  spoken: q => q.ansSay || q.ans.map(i => String(q.words[+i]).replace(/[^\p{L}\p{N}'’-]/gu, '')).join(', '),
  validate(q) {
    const p = [];
    if (!Array.isArray(q.words) || q.words.length < 2) return ['mark: needs at least 2 words'];
    if (q.words.length > 14) p.push('mark: more than 14 words');
    if (q.words.join(' ').length > 90) p.push('mark: sentence longer than 90 characters');
    if (q.words.some(w => typeof w !== 'string' || !w.trim() || /\s/.test(w))) p.push('mark: a word is empty or has a space');
    if (!Array.isArray(q.ans) || !q.ans.length) return p.concat('mark: ans must be a non-empty array');
    if (q.ans.some(a => typeof a !== 'string' || !/^\d+$/.test(a) || +a >= q.words.length)) p.push('mark: an index is out of range');
    if (new Set(q.ans).size !== q.ans.length) p.push('mark: duplicate index');
    if (kindSort(q.ans).join() !== q.ans.join()) p.push('mark: ans is not sorted with kindSort');
    if (q.one && q.ans.length !== 1) p.push('mark: one is set but ans has ' + q.ans.length + ' words');
    if (!q.one && q.ans.length === q.words.length) p.push('mark: every word is right');
    if (/data-v=/.test(q.html || '')) p.push('mark: the sentence belongs in the input area, not in html');
    return p;
  },
};

// ---- bank builders (37-bank.js bankBuild calls BANKF[form](item, id, picture html)) ----
// a mark question from a sentence: it.a is the word (one) or a list of words; each is the one token whose letters hold it
function k2MarkItem(it, pic) {
  const words = String(it.sent).trim().split(/\s+/), as = Array.isArray(it.a) ? it.a : [it.a];
  const idx = as.map(a => words.findIndex(w => bankWords(w).includes(a)));
  return {kind: 'mark', words, one: as.length == 1, ans: kindSort(idx.map(String)), ansSay: as.join(', '),
    html: `${pic || ''}<div class="bq">${esc(it.q)}</div>`};
}
const k2BankQ = (it, pic) => `${pic || ''}<div class="bq">${bankTxt(it.q)}</div>`;
BANKF.tap = (it, id, pic) => k2MarkItem(it, pic);
BANKF.mark = BANKF.tap;
BANKF.multi = (it, id, pic) => ({kind: 'multi', ans: kindSort(it.a), choices: shuffle([...it.a, ...it.d]).map(x => ({v: x, l: x})),
  html: k2BankQ(it, pic)});
BANKF.order = (it, id, pic) => {
  let items = shuffle(it.order.map(x => ({v: x, l: x})));
  if (items.every((x, i) => x.v === it.order[i])) items = [...items.slice(1), items[0]]; // never shown already in order
  return {kind: 'order', items, ans: [...it.order], html: k2BankQ(it, pic), ansSay: it.order.join(', ')};
};
BANKF.match = (it, id, pic) => {
  const items = it.pairs.map((p, i) => ({v: String(i), l: p[0]}));
  return {kind: 'match', items, opts: shuffle(it.pairs.map((p, i) => ({v: String(i), l: p[1]}))),
    ans: items.map(c => c.v).sort().join('|'), html: k2BankQ(it, pic)};
};
// bins {name: [item, ...]}: the names are the bins (shown with a capital), the items are shuffled into the tray; cp {item: [art, emoji]}
// draws an item as a picture with its word under it
BANKF.sort = (it, id, pic) => {
  const names = Object.keys(it.bins);
  const items = shuffle(names.flatMap(n => it.bins[n].map(w => {
    const c = {v: w, l: w, b: n, say: w};
    if (it.cp && it.cp[w]) Object.assign(c, {h: true, al: w, l: `<span class="pcap">${picFor(it.cp[w][0], it.cp[w][1])}<small>${esc(w)}</small></span>`});
    return c;
  })));
  return {kind: 'sort', bins: names.map(n => ({v: n, l: k2Cap(n)})), items, ans: items.map(c => c.b).join('|'), html: k2BankQ(it, pic)};
};
// forms drawn by share (genBank): their own draw comes after the usual item choice, with these shares unless BANKMIX says otherwise
const BANKNEW = ['sort', 'mark', 'order', 'match', 'multi'];
const BANKSHARE = {sort: .25, match: .15, order: .1, multi: .1, mark: .25};
const BANKMIX = {gram: {2: {sort: .4}, 4: {sort: .5}, 8: {sort: .4}}, vocab: {8: {sort: .4}}};
const bankShare = (id, lv, f) => {
  const m = BANKMIX[id] && BANKMIX[id][lv];
  return m && m[f] != null ? m[f] : BANKSHARE[f] || 0;
};

// ---- mixed formats for generated stops (spec 3): the fact is made as before, then one last seeded draw picks the format ----
// K2GEN[skill][level] = [share, converter(fact question, level) -> new question or null (keep the fact)], or a list of such pairs
// (KINDS2-B/C: a stop with two new formats); one draw r, and the first pair whose summed shares pass r converts. A share may be a
// function of the fact question (frac 3 converts every tap question).
function k2Wrap(sk, g) {
  return lv => {
    const q = g(lv), f = K2GEN[sk] && K2GEN[sk][lv];
    if (!f || K2.off) return q;
    const r = rnd();
    let a = 0;
    for (const [s, c] of Array.isArray(f[0]) ? f : [f]) {
      a += typeof s == 'function' ? s(q) : s;
      if (r < a) return c(q, lv) || q;
    }
    return q;
  };
}
// a sort question; items {v?, l, h?, b, say?, al?, lang?}: v defaults to the plain label
function k2Sort(o) {
  const items = o.items.map(c => {
    const x = {v: String(c.v != null ? c.v : k2Plain(c.l)), l: c.l, b: String(c.b)};
    for (const k of ['h', 'say', 'al', 'lang']) if (c[k] != null) x[k] = c[k];
    return x;
  });
  const q = {kind: 'sort', bins: o.bins.map(b => Object.assign({v: String(b.v)}, b, {v: String(b.v)})), items,
    ans: items.map(c => c.b).join('|'), html: o.html, say: o.say, hint: {k: 'text', s: o.hint}, label: o.label};
  if (o.speak) q.hint.w = o.hint;
  return o.pk ? pkQ(q) : q;
}
// a label of the bins and the sorted items, under 60 letters (spec 2.1); a fact's own label is kept where review asks the fact again
const k2Lab = (bins, items) => {
  const s = 'sort ' + bins.map(b => b.v).join('/') + ' ' + items.map(c => c.lab || c.v || k2Plain(c.l)).sort().join(',');
  return s.length < 60 ? s : s.slice(0, 56) + '...';
};
const k2Fact = l => REV_ARITH.test(String(l)) || REV_WORD.test(String(l));
// n distinct values from a pool, by the seeded stream
const k2Take = (pool, n, not = []) => shuffle(pool.filter(x => !not.includes(x))).slice(0, n);
const k2Pic = (w, e, cls = '') => `<span class="k2pic${cls ? ' ' + cls : ''}">${picFor(w, e)}</span>`;

// sort 2 (Pre-K): big or small, two things drawn big and small
function k2SortSize() {
  const obs = k2Take(PK.OBJ.filter(o => o[0] != 'fish'), 2);
  const items = shuffle(obs.flatMap(o => ['big', 'small'].map(b => ({v: b + ' ' + o[0], b, h: true, say: o[0], al: o[0], lab: o[0],
    l: k2Pic(o[0], o[2], 'k2' + b)}))));
  const bins = [{v: 'big', l: '<span class="k2bb">Big</span>', h: true, al: 'Big'}, {v: 'small', l: '<span class="k2bs">Small</span>', h: true, al: 'Small'}];
  return k2Sort({pk: true, bins, items, html: `<div class="pkq pkask">?</div>${pkTxt('Big or small?')}`,
    say: 'Sort them! Put the big ones in the big box and the small ones in the small box.',
    hint: 'Look at the two that match. Which one is bigger?', speak: true, label: 'sort big/small ' + obs.map(o => o[0]).join(',')});
}
// sort 3 (K): two kinds of things (animals, food, vehicles, clothes), two of each; each bin shows one more of its kind
function k2SortKinds() {
  const [c1, c2] = k2Take(Object.keys(SG_CATS), 2), its = [];
  const bins = [c1, c2].map(c => {
    const xs = k2Take(SG_CATS[c], 3);
    xs.slice(0, 2).forEach(x => its.push({v: x[0], b: c, h: true, say: x[0], al: x[0], l: k2Pic(x[0], x[1])}));
    return {v: c, h: true, al: k2Cap(c), l: `${k2Pic(xs[2][0], xs[2][1], 'k2bp')}<span>${k2Cap(c)}</span>`};
  });
  const items = shuffle(its);
  return k2Sort({pk: true, bins, items, html: `<div class="pkq pkask">?</div>${pkTxt(`${k2Cap(c1)} or ${c2}?`)}`,
    say: `Sort them! Put the ${c1} in one box and the ${c2} in the other.`, hint: `Is it one of the ${c1}, or one of the ${c2}?`,
    speak: true, label: k2Lab(bins, items)});
}
// sound 1 and 2 (K): two letters, the pictures by their first (1) or last (2) sound; the fact's word is one of them
function k2Sound(q0, lv) {
  const pool = (lv == 1 ? CVC.concat(BLEND.filter(x => !/^(sh|ch|th|wh)/.test(x[0]))) : CVC).filter(x => !['ten', 'six'].includes(x[0]));
  const key = x => lv == 1 ? x[0][0] : x[0].slice(-1), ch = String(q0.ans), fw = pool.find(x => x[0] == q0.after);
  if (!fw || key(fw) != ch) return null;
  const others = [...new Set(pool.map(key))].filter(c => c != ch && !(ch == 'c' && c == 'k') && !(ch == 'k' && c == 'c')
    && pool.filter(x => key(x) == c).length >= 2);
  const c2 = pick(others), its = [fw, ...k2Take(pool.filter(x => key(x) == ch && x !== fw), 1), ...k2Take(pool.filter(x => key(x) == c2), 2)];
  const items = shuffle(its.map(x => ({v: x[0], b: key(x), h: true, say: x[0], al: x[0], l: k2Pic(x[0], x[1])})));
  const bins = [ch, c2].map(c => ({v: c, l: c}));
  const where = lv == 1 ? 'first' : 'last';
  return k2Sort({bins, items, html: `<div class="sub">Sort the pictures by their ${where} sound.</div>`,
    say: `Say each word. Sort the pictures by their ${where} sound: ${ch} or ${c2}.`,
    hint: `Say each word slowly. Listen to the very ${where} sound.`, speak: true, label: k2Lab(bins, items) + ' ' + where});
}
// rhyme 1 (K): rhymes with the fact's word, or not
function k2Rhyme(q0) {
  const t = String(q0.label).replace(/^rhyme: /, ''), fam = RHY.find(f => f.some(x => x[0] == t));
  if (!fam) return null;
  const tw = fam.find(x => x[0] == t), near = f => f.some(x => x[0].endsWith(rime(t)) || t.endsWith(rime(x[0])));
  const yes = fam.filter(x => x[0] != t), no = k2Take(RHY.filter(f => f !== fam && !near(f)), yes.length > 1 ? 2 : 3).map(f => pick(f));
  const items = shuffle([...yes.map(x => [x, 'yes']), ...no.map(x => [x, 'no'])]).map(([x, b]) => ({v: x[0], b, h: true, say: x[0], al: x[0],
    l: k2Pic(x[0], x[1])}));
  const bins = [{v: 'yes', h: true, al: 'Rhymes with ' + t, l: `${k2Pic(tw[0], tw[1], 'k2bp')}<span>Rhymes</span>`},
    {v: 'no', l: 'No rhyme'}];
  return k2Sort({bins, items, html: `<div class="emo">${picFor(tw[0], tw[1])}</div><div class="sub">Which ones rhyme with “${t}”?</div>`,
    say: `Which ones rhyme with ${t}? Put them in the rhyme box. The others go in no rhyme.`,
    hint: `Rhymes sound the same at the end: ${rime(t)}. Say each word after ${t}.`, speak: true, label: 'sort rhyme ' + t + ' ' + items.map(c => c.v).sort().join(',')});
}
// eo 1 and 2 (K, 1st): even or odd; the fact's number is one of them
function k2EO(q0, lv) {
  const n = parseInt(q0.label, 10), lo = lv == 1 ? 0 : 21, hi = lv == 1 ? 20 : 99;
  let ns;
  do ns = [n, ...k2Take(Array.from({length: hi - lo + 1}, (_, i) => lo + i), lv == 1 ? 3 : 4, [n])];
  while (ns.every(x => x % 2) || ns.every(x => x % 2 == 0));
  const items = shuffle(ns).map(x => ({v: x, l: String(x), b: x % 2 ? 'odd' : 'even'}));
  const bins = [{v: 'even', l: 'Even'}, {v: 'odd', l: 'Odd'}];
  return k2Sort({bins, items, html: '<div class="sub">Sort the numbers: even or odd?</div>', say: 'Sort the numbers: even or odd?',
    hint: lv == 1 ? 'Can you share that many into pairs with none left over? Then it is even.' : 'Look at the last digit. 0, 2, 4, 6 and 8 are even.',
    speak: lv == 1, label: k2Lab(bins, items)});
}
// syl 1 (Pre-K): two bins (the fact's claps and another), 4 pictures; syl 2 (1st): three bins, 5 printed words
function k2Syl(q0, lv) {
  const n = +q0.ans, w = String(q0.label).replace(/^(claps|syllables): /, ''), word = c => c == 1 ? 'clap' : 'claps';
  const binOf = c => ({v: c, h: true, al: `${c} ${word(c)}`, l: `<span class="k2cl">${ico('clap', 18).repeat(c)}</span><span>${c} ${word(c)}</span>`});
  if (lv == 1) {
    const fw = SYLP.find(x => x[0] == w);
    if (!fw) return null;
    const m = pick([1, 2, 3].filter(c => c != n)), its = [fw, ...k2Take(SYLP.filter(x => x[2] == n && x !== fw), 1), ...k2Take(SYLP.filter(x => x[2] == m), 2)];
    const items = shuffle(its.map(x => ({v: x[0], b: x[2], h: true, say: x[0], al: x[0], l: k2Pic(x[0], x[1])})));
    const bins = [n, m].sort().map(binOf);
    return k2Sort({bins, items, html: '<div class="sub">Clap each word. How many claps?</div>',
      say: `Clap each word. Sort them: ${bins.map(b => b.al).join(' or ')}.`, hint: 'Say the word slowly and clap each beat.', speak: true,
      label: k2Lab(bins, items)});
  }
  const cs = n <= 3 ? [1, 2, 3] : [2, 3, 4], its = [[w, n]];
  for (const c of cs) if (c != n) its.push([pick(SYLW[c - 1].filter(x => x != w)), c]);
  const c5 = pick(cs);
  its.push([pick(SYLW[c5 - 1].filter(x => !its.some(y => y[0] == x))), c5]);
  const items = shuffle(its.map(([x, c]) => ({v: x, l: x, b: c, say: x})));
  const bins = cs.map(binOf);
  return k2Sort({bins, items, html: '<div class="sub">Sort the words by their claps.</div>',
    say: `Clap each word. Sort them: ${bins.map(b => b.al).join(', ')}.`,
    hint: 'Say the word slowly and clap each beat. Every clap has a vowel sound.', label: k2Lab(bins, items)});
}
// pic 3 (silent e words) and 4 (vowel teams): short or long vowel. The fact's word is one of them when its vowel is short or long
// (not book, cow, moon ...), and then keeps its "read" label (review asks the fact again)
const K2SHORT = () => CVC.concat(BLEND).filter(x => !['star', 'ten', 'six', 'man', 'ant'].includes(x[0])).map(x => x[0]);
const K2TEAMLONG = ['rain', 'boat', 'tree', 'bee', 'goat', 'coat', 'feet', 'sheep', 'leaf', 'beach', 'train', 'snail', 'road', 'soap',
  'cheese', 'mail', 'peach', 'seed', 'pie', 'tie', 'bowl'];
function k2Vowel(q0, lv) {
  const w = String(q0.ans), sh = K2SHORT(), lg = lv == 4 ? K2TEAMLONG : SILENTE.map(x => x[0]), isL = lg.includes(w);
  const its = [...(isL ? [[w, 'long']] : []), ...k2Take(sh, 2, [w]).map(x => [x, 'short']), ...k2Take(lg, isL ? 2 : 3, [w]).map(x => [x, 'long'])];
  const items = shuffle(its.map(([x, b]) => ({v: x, l: x, b})));
  const bins = [{v: 'short', l: 'Short vowel'}, {v: 'long', l: 'Long vowel'}];
  return k2Sort({bins, items, html: '<div class="sub">Sort the words: short vowel or long vowel?</div>',
    say: 'Read each word. Sort them: short vowel or long vowel.',
    hint: 'A short vowel sounds like the a in cat. A long vowel says its name, like the a in cake. A silent e at the end makes it long.',
    label: isL && k2Fact(q0.label) ? q0.label : k2Lab(bins, items)});
}
// fact 2 (4th): prime or composite; the fact's number is one of them
function k2Prime(q0) {
  const m = /^(\d+) prime/.exec(q0.label), n = m ? +m[1] : +q0.ans, nums = Array.from({length: 98}, (_, i) => i + 2);
  let ns;
  do ns = [n, ...k2Take(nums, 4, [n])];
  while (ns.every(x => FY_PRIME.includes(x)) || !ns.some(x => FY_PRIME.includes(x)));
  const items = shuffle(ns).map(x => ({v: x, l: String(x), b: FY_PRIME.includes(x) ? 'prime' : 'composite'}));
  const bins = [{v: 'prime', l: 'Prime'}, {v: 'composite', l: 'Composite'}];
  return k2Sort({bins, items, html: '<div class="sub">Sort the numbers: prime or composite?</div>', say: 'Sort the numbers: prime or composite.',
    hint: 'A prime has only two factors, 1 and itself. A composite has more. Try dividing by 2, 3, 5 and 7.', label: k2Lab(bins, items)});
}
// fact 1 (4th): factor of N or not (a factor question), multiple of b or not (a multiple question)
function k2Factor(q0) {
  const mm = /^multiple of (\d+)$/.exec(q0.label), mf = /factors? of (\d+)$/.exec(q0.label);
  let yes, no, bins, hint, t;
  if (mm) {
    const b = +mm[1], all = Array.from({length: 99}, (_, i) => i + 2);
    yes = k2Take(all.filter(x => x % b == 0 && x > b), R(2, 3));
    no = k2Take(all.filter(x => x % b && yes.some(y => Math.abs(x - y) <= b)), 5 - yes.length);
    bins = [{v: 'yes', l: 'Multiple of ' + b}, {v: 'no', l: 'Not a multiple'}];
    hint = `A multiple of ${b} is in the ${b} times table: dividing it by ${b} leaves nothing over.`;
    t = `Sort the numbers: multiple of ${b}, or not.`;
  } else if (mf) {
    const n = +mf[1], all = Array.from({length: Math.min(n - 1, 30) - 1}, (_, i) => i + 2);
    yes = k2Take(all.filter(x => n % x == 0), R(2, 3));
    no = k2Take(all.filter(x => n % x), 5 - yes.length);
    bins = [{v: 'yes', l: 'Factor of ' + n}, {v: 'no', l: 'Not a factor'}];
    hint = `A factor divides ${n} with nothing left over. Try ${n} ÷ each number.`;
    t = `Sort the numbers: factor of ${n}, or not a factor.`;
  } else return null;
  if (!yes.length || !no.length) return null;
  const items = shuffle([...yes.map(x => [x, 'yes']), ...no.map(x => [x, 'no'])]).map(([x, b]) => ({v: x, l: String(x), b}));
  return k2Sort({bins, items, html: `<div class="sub">${esc(t)}</div>`, say: t, hint, label: (bins[0].l + ' ' + items.map(c => c.v).sort().join(',')).slice(0, 59)});
}
// ang 1 (4th): acute, right or obtuse, drawn; one of each and two more
function k2Angle() {
  const ks = ['acute', 'right', 'obtuse', pick(['acute', 'obtuse']), pick(['acute', 'obtuse'])], seen = new Set(), its = [];
  for (const k of ks) {
    let d, r;
    do { d = dsAngDeg(k); r = 5 * R(0, 71); } while (seen.has(k + d + '/' + r));
    seen.add(k + d + '/' + r);
    its.push({v: `${k} ${d} ${r}`, b: k, h: true, lab: d, l: `<span class="k2ang">${VIZ.angle(d, {rot: r})}</span>`});
  }
  const items = shuffle(its);
  items.forEach((c, i) => { c.al = 'Angle ' + 'ABCDE'[i]; });
  const bins = ['acute', 'right', 'obtuse'].map(k => ({v: k, l: k2Cap(k)}));
  return k2Sort({bins, items, html: '<div class="sub">Sort the angles.</div>', say: 'Sort the angles: acute, right or obtuse.',
    hint: 'A right angle is a square corner. Acute is smaller than that. Obtuse is bigger than that.', label: k2Lab(bins, items)});
}
// frac 4 (3rd) and dec 2 (4th): less or more than one half
function k2Half(q0, lv) {
  const isDec = lv == 2, its = [];
  while (its.length < 5) {
    let l, val;
    if (isDec) {
      const h = rnd() < .5;
      val = h ? R(1, 99) / 100 : R(1, 9) / 10;
      if (h && Math.round(val * 100) % 10 == 0) continue;
      l = val.toFixed(h ? 2 : 1);
    } else {
      const d = pick([3, 4, 5, 6, 8, 10, 12]), n = R(1, d - 1);
      val = n / d;
      l = `${n}/${d}`;
    }
    if (val == .5 || its.some(c => c.l == l)) continue;
    its.push({l, b: val < .5 ? 'less' : 'more'});
    if (its.length == 5 && its.every(c => c.b == its[0].b)) its.length = 4; // all on one side: draw again for the last one
  }
  const items = shuffle(its), bins = [{v: 'less', l: 'Less than ½'}, {v: 'more', l: 'More than ½'}];
  return k2Sort({bins, items, html: '<div class="sub">Less than one half, or more?</div>', say: 'Sort them: less than one half, or more than one half.',
    hint: isDec ? 'One half is 0.5. Look at the tenths digit: under 5 is less than one half.'
      : 'One half of the bottom number: is the top number less than that, or more?', label: k2Lab(bins, items)});
}
// es_art 1 (el / la), 2 (un / una, and los / las for the plural questions)
function k2Art(q0, lv) {
  const N = ES_GRAM.nouns, pl = / \(plural\)$/.test(q0.label), reg = N.filter(n => /[oa]$/.test(n[0]));
  const ws = pl ? ['los', 'las'] : lv == 2 ? ['un', 'una'] : ['el', 'la'], art = n => ws[n[3] == 'el' ? 0 : 1], word = n => pl ? n[4] : n[0];
  const fn = pl ? null : reg.find(n => q0.label == `${lv == 2 ? (n[3] == 'el' ? 'un' : 'una') : n[3]} ${n[0]}`);
  const pool = pl ? N : reg;
  let its;
  do its = [...(fn ? [fn] : []), ...k2Take(pool, fn ? 3 : 4, fn ? [fn] : [])];
  while (its.every(n => art(n) == art(its[0])) || new Set(its.map(word)).size < its.length);
  const items = shuffle(its).map(n => ({v: word(n), b: art(n), h: true, say: word(n), lang: 'es', al: word(n),
    l: `${k2Pic('', n[2], 'k2sm')}<span>${esc(word(n))}</span>`}));
  const bins = ws.map(w => ({v: w, l: w}));
  return k2Sort({bins, items, html: `<div class="sub">${esc(ws[0])} or ${esc(ws[1])}? Sort the words.</div>`,
    say: `Which words go with ${ws[0]}, and which go with ${ws[1]}?`,
    hint: pl ? 'Los goes with boy words, las with girl words. Think of el or la for one of them first.'
      : 'Words that end in -o are usually boy words. Words that end in -a are usually girl words.', label: k2Lab(bins, items)});
}
// es_ser 2 (estar): the forms of ser and of estar
const K2SER = ['soy', 'eres', 'es'], K2ESTAR = ['estoy', 'estás', 'está', 'están'];
function k2Ser(q0) {
  const a = String(q0.ans), all = [...K2SER, ...K2ESTAR];
  if (!all.includes(a)) return null;
  const its = [a, ...k2Take(K2SER, 2, [a]), ...k2Take(K2ESTAR, 2, [a])].slice(0, 4);
  const items = shuffle(its).map(x => ({v: x, l: x, b: K2SER.includes(x) ? 'ser' : 'estar', say: x, lang: 'es'}));
  const bins = [{v: 'ser', l: 'ser'}, {v: 'estar', l: 'estar'}];
  return k2Sort({bins, items, html: '<div class="sub">Sort the verb forms: ser or estar?</div>', say: 'Sort the verb forms: ser or estar.',
    hint: 'Every form of estar starts with e s t. Ser has soy, eres and es.', label: k2Lab(bins, items)});
}
// es_gusta 2: gusta (one thing) or gustan (more than one)
function k2Gusta(q0) {
  const L = ES_GRAM.likes, phr = (it, p) => p ? gPlArt(it[0]) + ' ' + it[2] : it[0] + ' ' + it[1];
  const np = String(q0.label).replace(/^me ___ /, ''), its = [[np, q0.ans]];
  const opts = shuffle(L).map(it => {
    const p = it[4] == 'pl' || it[4] == 'an' ? true : it[4] == 'sg' ? false : coin();
    return [phr(it, p), p ? 'gustan' : 'gusta'];
  });
  const other = opts.find(o => o[1] != q0.ans && o[0] != np); // one of the other bin first, so both bins have one
  if (!other) return null;
  its.push(other);
  for (const o of opts) if (its.length < 4 && !its.some(y => y[0] == o[0])) its.push(o);
  const items = shuffle(its).map(([x, b]) => ({v: x, l: x, b, say: x, lang: 'es'}));
  const bins = [{v: 'gusta', l: 'me gusta'}, {v: 'gustan', l: 'me gustan'}];
  return k2Sort({bins, items, html: '<div class="sub">Me gusta or me gustan?</div>', say: 'Sort them: me gusta, for one thing, or me gustan, for more than one.',
    hint: 'One thing takes gusta. More than one thing takes gustan.', label: k2Lab(bins, items)});
}
// es_mix 2: two of animales, comida and colores (Spanish is open from Pre-K: 2 bins, 4 words); the fact's word is one of them when it is
// from those units, and then keeps its review label
const K2ESU = [['animal', 'animales', 'animals'], ['food', 'comida', 'food'], ['color', 'colores', 'colors']];
const K2ESAMB = ['naranja', 'café'];
function k2EsMix(q0) {
  const f = String(q0.ans), fu = K2ESU.find(u => SPN[u[0]].some(it => esFull(it) == f));
  let U = fu ? [fu, pick(K2ESU.filter(u => u !== fu))] : k2Take(K2ESU, 2);
  // audit v195 (N3): naranja is also the fruit and café is coffee: never sorted between comida and colores (other draws unchanged)
  if (fu && K2ESAMB.includes(f) && U[1][0] == 'food') U = [fu, K2ESU[0]];
  const its = fu ? [[f, fu[1]]] : [], noAmb = U.some(u => u[0] == 'food');
  for (const u of U) while (its.filter(x => x[1] == u[1]).length < 2) {
    const x = esFull(pick(SPN[u[0]]));
    if (!its.some(y => y[0] == x) && !(noAmb && K2ESAMB.includes(x))) its.push([x, u[1]]);
  }
  const items = shuffle(its).map(([x, b]) => ({v: x, l: x, b, say: x, lang: 'es'}));
  const bins = U.map(u => ({v: u[1], l: u[1]}));
  return k2Sort({bins, items, html: `<div class="sub">${esc(k2Cap(U[0][1]))} or ${esc(U[1][1])}?</div>`,
    say: `Sort the Spanish words: ${U[0][1]}, ${U[0][2]}, or ${U[1][1]}, ${U[1][2]}.`,
    binSay: Object.fromEntries(U.map(u => [u[1], u[2]])), hint: `Say each word. Is it one of the ${U[0][2]}, or one of the ${U[1][2]}?`,
    label: fu && k2Fact(q0.label) ? q0.label : k2Lab(bins, items)});
}

/* ---------- KINDS2 batches B and C: the line and make kinds (docs/KINDS2-SPEC.md 2.3, 2.4, 3) ----------
   line   line {min, max, step, labels, marks, hide, den, hops} (the VIZ.numLine options); snap: the step between pin stops, at most
          10 of them (11 stops); start: the pin's first stop (default min, never the answer); ans: a stop as a string ('7', '0.3',
          '3/4'); ansSay. Tap the band of the line (the pin jumps to the nearest stop), drag the pin (it snaps on release), or the
          arrow keys, Home and End on the pin (role slider). Check submits the stop as a string. One stop away on the first try is
          still a miss: "So close! One step away." Reveal: the pin slides to the answer, with a tick on its head.
   make   model 'frame' | 'b10' | 'coins' | 'parts' | 'array' | 'clock'; m: the model's options (K2MM below); ans: the target as a
          string; eq 'value' (totals compare as numbers; parts with m.whole give shaded/parts, so '1/2' takes 2 of 4) or 'exact'
          (array: the state 'r×c' must be m.r×m.c, or c×r with m.comm, while ans stays the fact's product, so one label keeps one
          answer; clock 'h:mm'). The state is a short vector of counts on st.mm;
          every change draws the model again from VIZ. Check is on once the state has changed. First miss: the state stays, "Too many"
          or "Not enough yet" (b10: swapped digits "Check your tens and ones."). Reveal: the answer drawn (.rev), the steppers show it.
   State on st (G, PL or RC): st.lnK (the pin's stop), st.lnK0, st.lnMoved, st.lnDrag, st.lnSkip; st.mm, st.mm0, st.mmMoved.
   Right and wrong also show a shape: a tick or a cross on the pin's head (line) or on the model (make), as the a11y signal rule wants. */

// a value as a number: '3/4' -> 0.75, '-2' -> -2, '0.25' -> 0.25
const k2Val = v => {
  const m = /^\s*(-?\d+)\s*\/\s*(\d+)\s*$/.exec(String(v));
  return m ? +m[1] / +m[2] : String(v).trim() === '' ? NaN : +v;
};
const k2Clean = v => Math.round(v * 1e6) / 1e6;
const k2Num = v => (v < 0 ? '−' + -v : String(v)); // printed with a real minus sign
const k2SayNum = v => (v < 0 ? 'negative ' + -v : String(v)).replace(/\.(\d+)$/, (_, d) => ' point ' + [...d].join(' '));

// ---- line: place a pin on a number line ----
const lnN = q => Math.round((q.line.max - q.line.min) / q.snap);
const lnV = (q, k) => k2Clean(q.line.min + k * q.snap);
const lnK = (q, v) => Math.round((k2Val(v) - q.line.min) / q.snap);
const lnStr = (q, k) => {
  const v = lnV(q, k), d = q.line.den;
  if (!d) return String(v);
  const n = Math.round(v * d);
  return n % d ? n + '/' + d : String(n / d);
};
const lnSay = (q, k) => {
  const v = lnV(q, k), d = q.line.den, n = d ? Math.round(v * d) : 0;
  return d && n % d ? fcSay(n, d) : k2SayNum(v);
};
const lnStart = q => lnK(q, q.start != null ? q.start : q.line.min);
KIND.line = {
  // the svg draws the line and its pin (aria-hidden: a picture); the pin's control is an HTML slider (.lnp) laid over the drawn pin,
  // so screen readers and the keyboard reach it as a slider and the svg stays a plain picture
  render: q => `<div class="lnw"><div class="lnb">${VIZ.numLine(Object.assign({}, q.line, {pin: lnV(q, lnStart(q))})).replace('<svg ', '<svg aria-hidden="true" ')}`
    + `<div class="lnp" role="slider" tabindex="0" aria-label="Pin on the number line" aria-valuemin="${q.line.min}" aria-valuemax="${q.line.max}"></div></div></div>`
    + UI.btn('Check', {kind: 'primary', icon: 'check', id: 'mcheck', cls: 'mgo', off: true}),
  bind(q, st, submit) {
    const K = KIND.line, box = $('.lnb'), sv = $('.lnb svg'), pin = $('.lnb .lnp');
    st.lnK = st.lnK0 = lnStart(q);
    st.lnMoved = false;
    st.lnDrag = null;
    st.lnSkip = false;
    if (!sv || !pin) return;
    pin.onkeydown = e => {
      const k = {ArrowRight: st.lnK + 1, ArrowUp: st.lnK + 1, ArrowLeft: st.lnK - 1, ArrowDown: st.lnK - 1, Home: 0, End: lnN(q)}[e.key];
      if (k == null) return;
      e.preventDefault();
      K.to(q, st, k);
    };
    pin.onpointerdown = e => K.down(q, st, e, sv, pin);
    // a tap on the band of the line (or on the pin) moves the pin to the nearest stop; the click that ends a drag is skipped
    box.onclick = e => {
      if (st.lnSkip) {
        st.lnSkip = false;
        return;
      }
      if (st.lock || !e.target.closest('.vband,.vpin,.lnp')) return;
      K.to(q, st, K.at(q, sv, e.clientX));
    };
    $('#mcheck').onclick = () => {
      if (!st.lock && st.lnMoved) submit(lnStr(q, st.lnK), null);
    };
    K.draw(q, st);
  },
  // a pointer's x in svg units (through the svg's box), and the stop nearest to it
  ux(sv, cx) {
    const r = sv.getBoundingClientRect();
    return (cx - r.left) * sv.viewBox.baseVal.width / (r.width || 1);
  },
  at(q, sv, cx) {
    const x0 = +sv.dataset.x0, x1 = +sv.dataset.x1;
    return Math.max(0, Math.min(lnN(q), Math.round((KIND.line.ux(sv, cx) - x0) / (x1 - x0) * lnN(q))));
  },
  to(q, st, k) {
    if (st.lock) return;
    k = Math.max(0, Math.min(lnN(q), k));
    if (k !== st.lnK) {
      st.lnK = k;
      st.lnMoved = true;
      SFX.pop(1);
    }
    KIND.line.draw(q, st);
  },
  // drag (an extra to tapping): starts after 8 px; the pin follows the finger and snaps to the nearest stop when it is let go
  down(q, st, e, sv, pin) {
    const K = KIND.line;
    if (st.lock || e.button > 0) return;
    const d = {x: e.clientX, on: false, id: e.pointerId};
    st.lnDrag = d;
    try { pin.setPointerCapture(d.id); } catch (_) { /* the pointer is gone */ }
    const end = ev => {
      pin.onpointermove = pin.onpointerup = pin.onpointercancel = null;
      pin.classList.remove('drag');
      const g = $('.lnb .vpin');
      if (g) g.classList.remove('drag');
      try { if (pin.hasPointerCapture && pin.hasPointerCapture(d.id)) pin.releasePointerCapture(d.id); } catch (_) { /* gone */ }
      if (st.lnDrag !== d) return;
      st.lnDrag = null;
      if (!d.on || !ev || !sv.isConnected) return K.draw(q, st);
      st.lnSkip = true;
      setTimeout(() => { st.lnSkip = false; }, 0);
      K.to(q, st, K.at(q, sv, ev.clientX));
    };
    pin.onpointermove = ev => {
      if (st.lnDrag !== d || st.lock) return;
      if (!d.on) {
        if (Math.abs(ev.clientX - d.x) < 8) return;
        d.on = true;
        pin.classList.add('drag');
      }
      K.place(Math.max(+sv.dataset.x0, Math.min(+sv.dataset.x1, K.ux(sv, ev.clientX))), true);
    };
    pin.onpointerup = end;
    pin.onpointercancel = () => end(null);
  },
  // the drawn pin and its slider at x (svg units; the slider stays inside the svg's box at the ends); drag: no slide
  place(x, drag) {
    const sv = $('.lnb svg'), g = $('.lnb .vpin'), pin = $('.lnb .lnp'), hr = g && g.querySelector('rect');
    if (!sv || !g || !pin || !hr) return;
    const vb = sv.viewBox.baseVal, z = +hr.getAttribute('width'), pc = v => k2Clean(v * 100) + '%';
    g.classList.toggle('drag', !!drag);
    g.style.transform = `translate(${k2Clean(x)}px,0)`;
    Object.assign(pin.style, {left: pc(Math.max(0, Math.min(vb.width - z, x - z / 2)) / vb.width), top: pc(+hr.getAttribute('y') / vb.height), width: pc(z / vb.width), height: pc(z / vb.height)});
  },
  // the pin at stop k (DOM only: reveal has no st)
  pinTo(q, k) {
    const sv = $('.lnb svg'), pin = $('.lnb .lnp');
    if (!sv || !pin) return;
    const x0 = +sv.dataset.x0, x1 = +sv.dataset.x1;
    KIND.line.place(x0 + k / lnN(q) * (x1 - x0));
    pin.setAttribute('aria-valuenow', lnV(q, k));
    pin.setAttribute('aria-valuetext', lnSay(q, k));
  },
  draw(q, st) {
    KIND.line.pinTo(q, st.lnK);
    const go = $('#mcheck');
    if (go) go.disabled = !st.lnMoved;
  },
  same: (q, v) => Math.abs(k2Val(v) - k2Val(q.ans)) < 1e-9,
  right() {
    const w = $('.lnw');
    if (w) w.classList.add('right');
  },
  // first miss: the pin stays where it is with a cross (the prompt shakes; the line does not, it is as wide as the screen); one stop
  // away is "So close!"; Check waits until the pin moves again
  retry(q, st) {
    const w = $('.lnw'), off = Math.abs(st.lnK - lnK(q, q.ans));
    fb(off == 1 ? 'So close! One step away.' : 'Not there yet. Try again!', 'again');
    st.lnMoved = false;
    KIND.line.draw(q, st);
    if (!w) return;
    w.classList.add('wrong');
    setTimeout(() => w.classList.remove('wrong'), 900);
  },
  reveal(q) {
    const w = $('.lnw'), pin = $('.lnw .lnp'), go = $('#mcheck');
    if (w) w.classList.remove('wrong');
    if (w) w.classList.add('rev');
    KIND.line.pinTo(q, lnK(q, q.ans));
    if (pin) pin.setAttribute('tabindex', '-1');
    if (go) go.disabled = true;
  },
  spoken: q => q.ansSay || String(q.ans),
  validate(q) {
    const p = [], L = q.line;
    if (!L || typeof L.min != 'number' || typeof L.max != 'number' || !(L.max > L.min)) return ['line: needs line {min, max} with max above min'];
    if (!(q.snap > 0)) return ['line: snap must be above 0'];
    const n = (L.max - L.min) / q.snap, isStop = v => isFinite(v) && v >= L.min - 1e-9 && v <= L.max + 1e-9
      && Math.abs((v - L.min) / q.snap - Math.round((v - L.min) / q.snap)) < 1e-6;
    if (Math.abs(n - Math.round(n)) > 1e-6) p.push('line: snap does not divide the line');
    if (Math.round(n) > 10) p.push('line: more than 11 stops (' + (Math.round(n) + 1) + ')');
    if (Math.round(n) < 2) p.push('line: fewer than 3 stops');
    if (typeof q.ans != 'string' || !isStop(k2Val(q.ans))) p.push('line: ans is not a stop of the line: ' + q.ans);
    const s = q.start != null ? k2Val(q.start) : L.min;
    if (!isStop(s)) p.push('line: start is not a stop');
    if (Math.abs(s - k2Val(q.ans)) < 1e-9) p.push('line: the pin starts on the answer');
    if (L.tapValues) p.push('line: tap targets do not belong on a pin line');
    if (L.den && Math.abs(q.snap * L.den - Math.round(q.snap * L.den)) > 1e-6) p.push('line: snap is not a step of the fraction labels');
    if (/data-v=/.test(q.html || '')) p.push('line: the line belongs in the input area, not in html');
    return p;
  },
};

// ---- make: build a quantity with a model ----
// a control button: an icon, or a signed number (t) for the clock's minute steps
const mmBtn = (i, d, icon, al, t) => `<button class="mmb" data-i="${i}" data-d="${d}" aria-label="${al}">${t || ico(icon, 26)}</button>`;
// a stepper row: name, minus, the number (or nothing), plus; ds: the steps (the clock's minutes: [5] or [1, 5], shown as −5 −1 +1 +5)
const mmRow = (lab, i, show, ds = [1]) => `<div class="mms"><span class="mml">${lab}</span>`
  + ds.slice().reverse().map(d => mmBtn(i, -d, 'minus', (d > 1 ? d + " " : "") + "less: " + lab, ds.length > 1 || d > 1 ? '−' + d : '')).join('')
  + (show ? `<output class="mmn" data-o="${i}">0</output>` : '')
  + ds.map(d => mmBtn(i, d, 'plus', (d > 1 ? d + " " : "") + "more: " + lab, ds.length > 1 || d > 1 ? '+' + d : '')).join('') + '</div>';
const mmCoin = v => `<span class="cn" style="--c:${COIN[v][2]};--s:${COIN[v][3]}">${COIN[v][0]}</span>`;
const mmSum = s => s.reduce((a, b) => a + b, 0);
const mmTime = s => s[0] + ':' + String(s[1]).padStart(2, '0');
const mmTimeSay = (h, m) => (m == 0 ? `${h} o'clock` : m == 30 ? `half past ${h}` : `${h} ${m < 10 ? 'oh ' + m : m}`);
// coins of the given types (biggest first) that make t with the fewest coins
const mmGreedy = (types, t) => types.map(c => {
  const n = Math.floor(t / c);
  t -= n * c;
  return n;
});
// the models: start state, value, the answer's state, a step from a control (or null when it is out of range), the drawing, the controls
const K2MM = {
  frame: {
    s0: () => [0],
    val: (q, s) => s[0],
    ans: q => [+q.ans],
    step: (q, s, i, d) => (s[0] + d < 0 || s[0] + d > q.m.total - (q.m.fixed || 0) ? null : [s[0] + d]),
    draw: (q, s) => VIZ.tenFrame((q.m.fixed || 0) + s[0], q.m.total, {b: q.m.fixed ? s[0] : 0, cells: 1}),
    ctl: () => `<div class="mmc">${mmBtn(0, -1, 'minus', 'Take one away')}${mmBtn(0, 1, 'plus', 'Put one in')}</div>`,
  },
  b10: {
    s0: q => (q.m.places == 3 ? [0, 0, 0] : [0, 0]),
    val: (q, s) => s.reduce((a, x) => a * 10 + x, 0),
    ans: q => String(+q.ans).padStart(q.m.places, '0').split('').map(Number),
    step: (q, s, i, d) => (s[i] + d < 0 || s[i] + d > 9 ? null : s.map((x, j) => (j == i ? x + d : x))),
    draw: (q, s) => VIZ.base10(K2MM.b10.val(q, s)),
    ctl: q => `<div class="mmc mmcol">${['Hundreds', 'Tens', 'Ones'].slice(3 - q.m.places).map((l, i) => mmRow(l, i, true)).join('')}</div>`,
  },
  coins: {
    s0: q => q.m.types.map(() => 0),
    val: (q, s) => s.reduce((a, n, i) => a + n * q.m.types[i], 0),
    ans: q => mmGreedy(q.m.types, +q.ans),
    step: (q, s, i, d) => (s[i] + d < 0 || d > 0 && mmSum(s) >= 12 ? null : s.map((x, j) => (j == i ? x + d : x))),
    // the purse: one button a coin (tap to take it out), biggest first
    draw: (q, s) => `<div class="mmpurse">${s.map((n, i) => (`<button class="mmp" data-p="${i}" aria-label="Take out a ${COIN[q.m.types[i]][1]}">`
      + `${mmCoin(q.m.types[i])}</button>`).repeat(n)).join('') || '<span class="mmhint">Tap a coin to put it in the purse.</span>'}</div>`,
    ctl: q => `<div class="mmc mmtray">${q.m.types.map((c, i) => `<button class="mmb mmcoin" data-i="${i}" data-d="1" aria-label="Put in a ${COIN[c][1]}">`
      + `${mmCoin(c)}</button>`).join('')}</div>`,
  },
  parts: {
    s0: q => Array(q.m.shape == 'grid' ? q.m.w * q.m.h : q.m.d).fill(0),
    val: (q, s) => (q.m.whole ? mmSum(s) + '/' + s.length : mmSum(s)),
    // the answer: the first parts, or a rectangle (m.rect [w, h]) in the corner of a grid
    ans: q => K2MM.parts.s0(q).map((x, i, a) => +(q.m.rect ? i % q.m.w < q.m.rect[0] && Math.floor(i / q.m.w) < q.m.rect[1]
      : i < Math.round(k2Val(q.ans) * (q.m.whole ? a.length : 1)))),
    // a part tapped (d left out) turns over; the keyboard's buttons shade the first clear part (+1) or clear the last shaded one (-1)
    step: (q, s, i, d) => {
      if (d != null) i = d > 0 ? s.indexOf(0) : s.lastIndexOf(1);
      return i < 0 ? null : s.map((x, j) => (j == i ? 1 - x : x));
    },
    draw: (q, s) => q.m.shape == 'grid' ? VIZ.areaGrid(q.m.w, q.m.h, {tap: 1, on: s})
      : (q.m.shape == 'circle' ? VIZ.fracCircle : VIZ.fracBar)(0, q.m.d, {tap: 1, on: s}),
    ctl: () => `<div class="mmc">${mmBtn(0, -1, 'minus', 'Clear one part')}${mmBtn(0, 1, 'plus', 'Shade one more part')}</div>`,
  },
  array: {
    s0: () => [1, 1],
    val: (q, s) => s[0] + '×' + s[1],
    ans: q => [q.m.r, q.m.c],
    step: (q, s, i, d) => (s[i] + d < 1 || s[i] + d > 10 ? null : s.map((x, j) => (j == i ? x + d : x))),
    draw: (q, s) => VIZ.array(s[0], s[1]),
    ctl: () => `<div class="mmc mmcol">${mmRow('Rows', 0, true)}${mmRow('In each row', 1, true)}</div>`,
  },
  clock: {
    s0: q => (q.ans == '12:00' ? [6, 0] : [12, 0]),
    val: (q, s) => mmTime(s),
    ans: q => q.ans.split(':').map(Number),
    // the minutes carry into the hour, so the hour hand moves with them
    step: (q, s, i, d) => {
      let [h, m] = s;
      if (i == 0) h = (h + d + 11) % 12 + 1;
      else {
        m += d;
        if (m >= 60) { m -= 60; h = h % 12 + 1; }
        if (m < 0) { m += 60; h = (h + 10) % 12 + 1; }
      }
      return [h, m];
    },
    draw: (q, s) => VIZ.clock(s[0], s[1]),
    ctl: q => `<div class="mmc mmcol">${mmRow('Hour', 0, false)}${mmRow('Minutes', 1, false, q.m.one ? [1, 5] : [5])}</div>`,
  },
};
// the value a state gives, as the kind compares it
const mmOf = (q, s) => String(K2MM[q.model].val(q, s));
KIND.make = {
  render: q => `<div class="mmw mm-${q.model}"><div class="mmv"></div>${k2Marks()}${K2MM[q.model].ctl(q)}</div>`
    + UI.btn('Check', {kind: 'primary', icon: 'check', id: 'mcheck', cls: 'mgo', off: true}),
  bind(q, st, submit) {
    const K = KIND.make, M = K2MM[q.model], w = $('.mmw');
    st.mm = M.s0(q);
    st.mm0 = st.mm.slice();
    st.mmMoved = false;
    const act = t => {
      if (st.lock || !t || t.closest('.mm-notap')) return;
      let s = null;
      if (M.tap && t.closest('.mmv')) s = M.tap(q, st.mm, t); // LESSON-STAGE: a model that takes taps on its drawing (frame2, bars2)
      else if (t.dataset.d != null) s = M.step(q, st.mm, +t.dataset.i, +t.dataset.d);
      else if (t.dataset.p != null) s = M.step(q, st.mm, +t.dataset.p, -1);
      else if (t.dataset.v != null) s = M.step(q, st.mm, +t.dataset.v);
      else if (t.dataset.c != null) { // a ten-frame cell: an empty one adds a counter, a filled one (not a fixed one) takes one away
        const c = +t.dataset.c, f = q.m.fixed || 0;
        if (c >= f) s = M.step(q, st.mm, 0, c < f + st.mm[0] ? -1 : 1);
      }
      if (!s) { // out of range: the model shakes
        const v = $('.mmv');
        if (v) k2Shake(v);
        return;
      }
      st.mm = s;
      st.mmMoved = true;
      SFX.pop(t.dataset.d < 0 || t.dataset.p != null ? 1 : 2);
      K.draw(q, st);
    };
    // one handler on the card: its buttons (steppers, the coin tray, purse coins) and the drawing's parts and ten-frame cells
    if (w) w.onclick = e => act(e.target.closest('[data-d],[data-p],[data-v],[data-c]'));
    $('#mcheck').onclick = () => {
      if (!st.lock && st.mmMoved) submit(mmOf(q, st.mm), null);
    };
    K.draw(q, st);
  },
  // the model drawn at state s (DOM only: reveal has no st). The ten frame and the parts take taps on the drawing, and their buttons do
  // the same for the keyboard, so their svg is a picture (aria-hidden; the tap targets drop the button role VIZ gives them). A focused
  // purse coin hands the focus to the next one, or to the tray, when the purse is drawn again
  paint(q, s) {
    const v = $('.mmv');
    if (!v) return;
    const a = document.activeElement, at = a && v.contains(a) && a.dataset.p != null;
    v.innerHTML = K2MM[q.model].draw(q, s);
    if (q.model == 'frame' || q.model == 'parts' || K2MM[q.model].tap) {
      const g = v.querySelector('svg');
      if (g) g.setAttribute('aria-hidden', 'true');
      v.querySelectorAll('[data-v]').forEach(e => { e.removeAttribute('role'); e.removeAttribute('aria-label'); });
    }
    $$('.mmn').forEach(o => { o.textContent = s[+o.dataset.o]; });
    KIND.make.notap(v);
    if (at) {
      const f = v.querySelector(`[data-p="${a.dataset.p}"]`) || v.querySelector('[data-p]') || $('.mmc button');
      if (f) f.focus();
    }
    k2Fit();
  },
  // fix v194: fraction parts under 48 px (layout size) take no taps (mm-notap); the buttons do it. fix2 v194: measured again on a resize
  // (a turned tablet: the parts change size), below
  notap(v) {
    let small = null;
    v.querySelectorAll('svg').forEach(g => {
      const ps = g.querySelectorAll('rect.vp[data-v]'), vw = ps.length && g.viewBox.baseVal && g.viewBox.baseVal.width;
      if (vw && g.clientWidth) small = small || [...ps].some(e => Math.min(e.width.baseVal.value, e.height.baseVal.value) * g.clientWidth / vw < 48);
    });
    if (small != null) v.classList.toggle('mm-notap', small);
  },
  draw(q, st) {
    KIND.make.paint(q, st.mm);
    const go = $('#mcheck');
    if (go) go.disabled = !st.mmMoved;
  },
  same: (q, v) => {
    if (q.model == 'array') return String(v) === q.ans || String(v) === q.m.r + '×' + q.m.c || !!(q.m.comm && String(v) === q.m.c + '×' + q.m.r);
    if (q.eq == 'exact') return String(v) === q.ans;
    return Math.abs(k2Val(v) - k2Val(q.ans)) < 1e-9;
  },
  done(cls) {
    const w = $('.mmw');
    if (w) w.classList.add(cls);
    $$('.mmw button').forEach(b => { b.disabled = true; });
  },
  right() {
    KIND.make.done('right');
  },
  // first miss: the state stays; the words say which way to go
  retry(q, st) {
    const v = mmOf(q, st.mm), w = $('.mmw');
    let t;
    if (q.model == 'clock') {
      const [h, m] = st.mm, [ah, am] = K2MM.clock.ans(q);
      t = h != ah && m == am ? 'Look at the short hour hand.' : h == ah ? 'Look at the long minute hand.' : 'Not yet. Set the minutes, then the hour.';
    } else if (q.model == 'array') {
      const [r, c] = st.mm, [ar, ac] = K2MM.array.ans(q);
      t = r == ac && c == ar ? 'Rows go across. Check your rows and how many in each row.' : r * c > ar * ac ? 'Too many. Look at the rows and how many in each.' : 'Not enough yet. Look at the rows and how many in each.';
    } else if (q.model == 'b10' && +v !== +q.ans && st.mm.slice(-2).reverse().join() === K2MM.b10.ans(q).slice(-2).join()) t = 'Check your tens and ones.';
    else t = k2Val(v) > k2Val(q.ans) ? 'Too many. Take some away.' : 'Not enough yet. Put in some more.';
    fb(t, 'again');
    st.mmMoved = false;
    KIND.make.draw(q, st);
    if (!w) return;
    w.classList.add('wrong');
    k2Shake(w);
    setTimeout(() => w.classList.remove('wrong'), 900);
  },
  // second miss: the answer drawn, the steppers show it, the model pulses once
  reveal(q) {
    const K = KIND.make, w = $('.mmw'), v = $('.mmv'), go = $('#mcheck');
    if (w) w.classList.remove('wrong');
    K.paint(q, K2MM[q.model].ans(q));
    K.done('rev');
    if (v) v.classList.add('k2pulse');
    if (go) go.disabled = true;
  },
  spoken: q => q.ansSay || (q.model == 'coins' ? q.ans + ' cents' : String(q.ans)),
  validate(q) {
    const p = [], M = K2MM[q.model], m = q.m || {};
    if (!M) return ['make: unknown model ' + q.model];
    if (typeof q.ans != 'string' || !q.ans) return ['make: ans must be a non-empty string'];
    if ((q.eq || 'value') != (['array', 'clock'].includes(q.model) ? 'exact' : 'value')) p.push('make: eq must be ' + (['array', 'clock'].includes(q.model) ? 'exact' : 'value') + ' for ' + q.model);
    const a = k2Val(q.ans), int = Number.isInteger(a) && a > 0;
    if (q.model == 'frame') {
      if (![5, 10, 20].includes(m.total)) p.push('make frame: total must be 5, 10 or 20');
      if (!int || a + (m.fixed || 0) > m.total) p.push('make frame: the target does not fit in the frame');
    } else if (q.model == 'b10') {
      if (![2, 3].includes(m.places)) p.push('make b10: places must be 2 or 3');
      if (!int || a >= Math.pow(10, m.places)) p.push('make b10: the target needs more places than the steppers have');
    } else if (q.model == 'coins') {
      const T = m.types || [];
      if (!T.length || T.some(c => !COIN[c]) || T.some((c, i) => i && c >= T[i - 1])) p.push('make coins: types must be coins, biggest first');
      else if (!int || T[T.length - 1] != 1 && a % T[T.length - 1] || mmSum(mmGreedy(T, a)) > 12) p.push('make coins: the target needs more than 12 coins');
    } else if (q.model == 'parts') {
      const n = m.shape == 'grid' ? m.w * m.h : m.d;
      if (!['bar', 'circle', 'grid'].includes(m.shape)) p.push('make parts: shape must be bar, circle or grid');
      if (m.shape == 'bar' && !(m.d >= 2 && m.d <= 6)) p.push('make parts: a bar has 2 to 6 parts (48 px each)');
      if (m.shape == 'circle' && !(m.d >= 2 && m.d <= 8)) p.push('make parts: a circle has 2 to 8 parts');
      if (m.shape == 'grid' && !(m.w >= 1 && m.w <= 6 && m.h >= 1 && m.h <= 4)) p.push('make parts: a grid is at most 6 by 4');
      if (m.whole ? !(a > 0 && a < 1 && Math.abs(a * n - Math.round(a * n)) < 1e-9) : !int || a > n) p.push('make parts: the target is not a number of the parts');
      if (m.rect && (m.whole || m.rect[0] * m.rect[1] !== a || m.rect[0] > m.w || m.rect[1] > m.h)) p.push('make parts: rect is not the target');
    } else if (q.model == 'array') {
      if (!(m.r >= 1 && m.r <= 10 && m.c >= 1 && m.c <= 10 && Number.isInteger(m.r) && Number.isInteger(m.c))) p.push('make array: m.r and m.c must be 1 to 10');
      else if (+q.ans !== m.r * m.c) p.push('make array: ans must be the product m.r × m.c');
    } else if (q.model == 'clock') {
      const r = /^(1[0-2]|[1-9]):([0-5]\d)$/.exec(q.ans);
      if (!r) p.push('make clock: ans must be h:mm');
      else if (!m.one && +r[2] % 5) p.push('make clock: minutes not a 5 need m.one (steps of 1)');
    }
    if (!p.length) {
      if (!KIND.make.same(q, mmOf(q, M.ans(q)))) p.push('make: the answer state does not give ans');
      if (KIND.make.same(q, mmOf(q, M.s0(q)))) p.push('make: the start state is the answer');
    }
    if (/data-v=|data-c=/.test(q.html || '')) p.push('make: the model belongs in the input area, not in html');
    return p;
  },
};

// ---- the converters (spec 3): a fact question q0 of the stop becomes a line or make question about the same fact ----
// q0's label is kept wherever the new question asks the same fact (review asks it again), and its pk / auto flags (Kindergarten)
function k2New(q0, o) {
  const q = Object.assign({html: o.html, say: o.say, label: o.label || q0.label}, o.q);
  q.hint = o.hint == null ? q0.hint : typeof o.hint == 'string' ? {k: 'text', s: o.hint} : o.hint;
  if (o.speak && q.hint.k == 'text') q.hint.w = q.hint.s;
  if (o.ansSay) q.ansSay = o.ansSay;
  if (q0.pk) Object.assign(q, {pk: true, auto: q0.auto});
  return q;
}
// a line question; start: min, or max when the answer is min
function k2Line(q0, o) {
  const L = o.line, ans = String(o.ans);
  const start = o.start != null ? o.start : Math.abs(k2Val(ans) - L.min) < 1e-9 ? L.max : L.min;
  return k2New(q0, Object.assign({}, o, {q: {kind: 'line', line: L, snap: o.snap || L.step || 1, ans, start: String(start)}}));
}
const k2Sub = t => `<div class="sub">${t}</div>`;
// cnt 1 and 4 (K): the missing number of the sequence, on a line of 10 steps that holds it
function k2Cnt(q0) {
  const s = String(q0.label).split(','), a = +q0.ans, ns = s.map(x => (x == '_' ? a : +x));
  if (ns.some(isNaN)) return null;
  const st = Math.abs(ns[1] - ns[0]), lo = Math.min(...ns), hi = Math.max(...ns);
  let min = st == 10 ? 0 : Math.floor(lo / 10) * 10;
  if (st == 1 && min + 10 < hi) min = Math.floor(lo / 5) * 5;
  const max = min + 10 * st;
  if (lo < min || hi > max || ![1, 10].includes(st)) return null;
  return k2Line(q0, {line: {min, max, step: st, labels: 'all', marks: ns.filter(x => x != a)}, snap: st, ans: a,
    html: `<div class="seq">${s.map(x => (x == '_' ? '<b class="k2q">?</b>' : x)).join(', ')}</div>${pkTxt('Put the pin on the missing number.')}`,
    say: `${String(q0.say).replace(/\.?$/, '.')} Put the pin on the missing number.`, ansSay: String(a)});
}
// round 1 to 4: the rounding model. The line runs between the two candidates in 10 steps; the number is a dot at its exact place
// (not snapped to a stop, which could put 1346 on the halfway tick); the pin starts on the stop nearest the number
const K2UNIT = {tenth: .1, hundredth: .01, 'whole number': 1};
function k2Round(q0) {
  const m = /^round ([\d.]+) to (.+)$/.exec(q0.label);
  if (!m) return null;
  const n = +m[1], u = K2UNIT[m[2]] || +m[2], lo = k2Clean(Math.floor(n / u + 1e-9) * u), hi = k2Clean(lo + u), a = k2Val(q0.ans);
  if (!u || n == lo || a != lo && a != hi) return null;
  const snap = u / 10, k = Math.min(9, Math.max(1, Math.round((n - lo) / snap)));
  const t = (/<div class="sub">([^<]*)<\/div>/.exec(q0.html) || [])[1] || `Round ${n}.`;
  return k2Line(q0, {line: {min: lo, max: hi, step: snap, labels: [lo, k2Clean(lo + u / 2), hi], marks: [n]}, snap, ans: q0.ans,
    start: k2Clean(lo + k * snap), html: k2Sub(t) + k2Sub(`The dot is ${ffComma(m[1])}. Slide the pin to the rounded number.`),
    say: `${q0.say} The dot shows ${k2SayNum(n)}. Slide the pin to the rounded number.`, ansSay: k2SayNum(a)});
}
// frac 3: place n/d on the line from 0 to 1 (or 2). It replaces the stop's tap variant (spec 3) and some of its read questions
function k2FracLine(q0) {
  const m = /^frac (?:tap|read) (\d+)\/(\d+)( to 2)?$/.exec(q0.label);
  if (!m) return null;
  const n = +m[1], d = +m[2], max = m[3] ? 2 : 1;
  return k2Line(q0, {line: {min: 0, max, step: 1 / d, den: d, labels: max == 2 ? [0, 1, 2] : [0, 1]}, snap: 1 / d, ans: q0.ans,
    html: `${k2Sub('Put the pin on')}<div class="eq">${fcFr(n, d)}</div>`, say: `Put the pin on ${fcSay(n, d)}.`, ansSay: fcSay(n, d),
    hint: `The line from 0 to 1 is cut into ${d} equal jumps. Start at 0 and count ${n} jump${n == 1 ? '' : 's'}.`});
}
// a decimal on a line of 10 steps: tenths on 0 to 1 (or n to n+1), hundredths on a zoomed tenth, thousandths on a zoomed hundredth.
// The fact's label stays when its answer is this number (lab: a new label when it is not)
function k2DecLine(q0, v, html, say, lab) {
  const pl = [1, 2, 3].find(p => Math.abs(v * Math.pow(10, p) - Math.round(v * Math.pow(10, p))) < 1e-6);
  if (!pl || !isFinite(v) || v < 0 || Number.isInteger(v)) return null;
  const sz = Math.pow(10, 1 - pl), min = k2Clean(Math.floor(v / sz + 1e-9) * sz), max = k2Clean(min + sz), vs = String(k2Clean(v));
  return k2Line(q0, {line: {min, max, step: sz / 10, labels: [min, max]}, snap: sz / 10, ans: lab ? vs : q0.ans, label: lab,
    html: html || `${k2Sub('Put the pin on')}<div class="eq">${vs}</div>`, say: say || `Put the pin on ${k2SayNum(+vs)}.`, ansSay: k2SayNum(+vs),
    hint: pl == 1 ? `The line from ${min} to ${max} is cut into 10 equal parts. Each part is one tenth.`
      : `This line is one ${pl == 2 ? 'tenth' : 'hundredth'} long, from ${min} to ${max}. Each small step is one ${pl == 2 ? 'hundredth' : 'thousandth'}.`});
}
const k2Dec1Line = q0 => k2DecLine(q0, k2Val(q0.ans));
const k2Dec2Line = q0 => {
  const m = /^dec2 ([\d.]+) \?/.exec(q0.label);
  return m ? k2DecLine(q0, +m[1], null, null, 'dec2 place ' + m[1]) : null;
};
// pv 5: the number of the fact (its sum, its words or the number a digit sits in) on a zoomed line
function k2Pv5Line(q0) {
  const l = String(q0.label), vin = /^value of \S+ in ([\d.]+)$/.exec(l), v = vin ? +vin[1] : k2Val(q0.ans);
  const what = vin ? `<div class="eq">${vin[1]}</div>` : /^words/.test(l) ? `<div class="sub k2words">${esc(q0.say)}</div>` : `<div class="eq">${esc(l.replace(/ = \?$/, ''))}</div>`;
  const spoken = vin ? k2SayNum(v) : /^words/.test(l) ? q0.say : l.replace(/ = \?$/, '').replace(/\+/g, 'plus');
  return k2DecLine(q0, v, k2Sub('Put the pin on this number.') + what, `Put the pin on ${spoken}.`, vin ? 'pv5 place ' + vin[1] : null);
}
// int 1: an integer of the fact on a line of 10 steps from -5 to 5, -10 to 0 or 0 to 10
function k2IntLine(q0) {
  const m = /^int1 \w+ (-?\d+)/.exec(q0.label), n = m ? +m[1] : NaN;
  if (isNaN(n) || Math.abs(n) > 10) return null;
  const min = Math.abs(n) <= 5 ? -5 : n < 0 ? -10 : 0, max = min + 10;
  return k2Line(q0, {line: {min, max, step: 1, labels: [min, 0, max, min + 5].filter((x, i, a) => a.indexOf(x) == i)}, snap: 1, ans: n,
    start: n == 0 ? max : 0, label: /^int1 tap /.test(q0.label) ? q0.label : 'int1 place ' + n, html: `${k2Sub('Put the pin on')}<div class="eq">${k2Num(n)}</div>`, say: `Put the pin on ${k2SayNum(n)}.`,
    ansSay: k2SayNum(n), hint: 'Numbers below 0 are to the left of 0. Count the steps from 0.'});
}
// int 2: the opposite of a number from -5 to 5 (the fact's number when it is that small, else a new one)
function k2IntOpp(q0) {
  const m = /^int2 (opp|abs) (-?\d+)$/.exec(q0.label);
  let n = m && Math.abs(+m[2]) <= 5 && +m[2] ? +m[2] : 0;
  if (!n) n = (coin() ? -1 : 1) * R(1, 5);
  return k2Line(q0, {line: {min: -5, max: 5, step: 1, labels: [-5, 0, 5, n].filter((x, i, a) => a.indexOf(x) == i), marks: [n]}, snap: 1,
    ans: -n, start: 0, label: m && m[1] == 'opp' && +m[2] == n ? q0.label : 'int2 opp ' + n,
    html: `${k2Sub('The dot is')}<div class="eq">${k2Num(n)}</div>${k2Sub('Put the pin on its opposite.')}`,
    say: `The dot is ${k2SayNum(n)}. Put the pin on its opposite: the same distance from 0, on the other side.`, ansSay: k2SayNum(-n),
    hint: `${k2Num(n)} is ${Math.abs(n)} steps from 0. Its opposite is ${Math.abs(n)} steps from 0 on the other side.`});
}

// a make question
const k2Make = (q0, o) => k2New(q0, Object.assign({}, o, {q: {kind: 'make', model: o.model, m: o.m, ans: String(o.ans), eq: ['array', 'clock'].includes(o.model) ? 'exact' : 'value'}}));
// tenf 1-3, pk_count 3 (K): the ten frame; "make ten" and "10 and" questions start with counters in place (m.fixed)
function k2Frame(q0, lv) {
  const l = String(q0.label);
  let m;
  if ((m = /^frame (\d+)$/.exec(l)) || (m = /^count (\d+) (\w+) \(frames\)$/.exec(l))) {
    const n = +m[1], t = n > 10 ? 20 : 10;
    if (!n) return null;
    return k2Make(q0, {model: 'frame', m: {total: t}, ans: n, ansSay: String(n), speak: true,
      html: `<div class="eq">${n}</div>${pkTxt(`Make ${n}. Tap to put in ${n} counters.`)}`, say: `Make ${n}. Tap the ten frame to put in ${n} counters.`,
      hint: n > 5 ? 'Fill the top row first: that is 5. Then count on.' : 'Count as you tap: 1, 2, 3 ...'});
  }
  if ((m = /^(\d+) and \? make 10$/.exec(l))) {
    const f = +m[1];
    return k2Make(q0, {model: 'frame', m: {total: 10, fixed: f}, ans: 10 - f, ansSay: `${f} and ${10 - f} make 10`, speak: true,
      html: pkTxt(`There are ${f}. Put in more to make 10.`), say: `There are ${f} counters. Put in more counters to make 10.`, hint: 'Fill every empty box. Count how many you put in.'});
  }
  if ((m = /^10 and (\d+)$/.exec(l)) || (m = /^10 \+ \? = (\d+)$/.exec(l))) {
    const add = m[0].includes('?') ? +m[1] - 10 : +m[1], tot = 10 + add;
    return k2Make(q0, {model: 'frame', m: {total: 20, fixed: 10}, ans: add, ansSay: `10 and ${add} make ${tot}`, speak: true,
      label: m[0].includes('?') ? q0.label : `make ${tot} from 10`,
      html: `<div class="eq">${tot}</div>${pkTxt(`Ten is in. Make ${tot}.`)}`, say: `Ten counters are in the frame. Put in more to make ${tot}.`,
      hint: `${tot} is 10 and ${add} more.`});
  }
  return null;
}
// add 4 (K): a + b in the ten frame: put in a, then b more (the fact's answer is the counters in all)
function k2AddFrame(q0) {
  const m = /^(\d+) \+ (\d+) = \?$/.exec(q0.label);
  if (!m || +m[1] + +m[2] < 1 || +m[1] + +m[2] > 10) return null;
  const a = +m[1], b = +m[2], c = a + b;
  return k2Make(q0, {model: 'frame', m: {total: c <= 5 ? 5 : 10}, ans: c, ansSay: `${a} and ${b} make ${c}`, speak: true,
    html: `<div class="eq">${a} + ${b}</div>${pkTxt(`Put in ${a}, then ${b} more.`)}`,
    say: `${a} plus ${b}. Tap the frame to put in ${a}, then ${b} more.`, hint: 'Count as you tap. Then count them all.'});
}
// pv 1, pv 2, big 1: the number of the fact with base-ten blocks
function k2B10(q0, lv) {
  const l = String(q0.label), m = /in (\d+)$/.exec(l) || /^pv picture (\d+)$/.exec(l), n = m ? +m[1] : +q0.ans;
  if (!Number.isInteger(n) || n < 1 || n > 999) return null;
  const pl = n > 99 || lv > 1 ? 3 : 2, ds = String(n).padStart(pl, '0').split('').map(Number);
  const parts = [['hundred', 'hundreds'], ['ten', 'tens'], ['one', 'ones']].slice(3 - pl).map((w, i) => `${ds[i]} ${w[ds[i] == 1 ? 0 : 1]}`);
  const sum = /^(\d+) \+ (\d+) = \?$/.exec(l);
  return k2Make(q0, {model: 'b10', m: {places: pl}, ans: n, ansSay: `${n} is ${parts.join(' and ')}`, label: m && m[0][0] == 'i' ? `make ${n}` : q0.label,
    html: sum ? `<div class="eq">${sum[1]} + ${sum[2]}</div>${k2Sub('Make the answer with blocks.')}` : `<div class="eq">${n}</div>${k2Sub(`Make ${n} with blocks.`)}`,
    say: sum ? `${sum[1]} plus ${sum[2]}. Make the answer with blocks.` : `Make ${n} with blocks: ${pl == 3 ? 'hundreds, ' : ''}tens and ones.`,
    hint: pl == 3 ? 'Each digit says how many: flats for the hundreds, rods for the tens, little cubes for the ones.' : 'The tens digit says how many rods. The ones digit says how many little cubes.'});
}
// coins 1-3, 5: the amount (or the change) in the purse, by any coins
const K2COINS = {1: [5, 1], 2: [10, 5, 1], 3: [25, 10, 5, 1], 5: [25, 10, 5, 1]};
function k2Coins(q0, lv) {
  const t = +q0.ans, T = K2COINS[lv];
  if (!Number.isInteger(t) || t < 1 || mmSum(mmGreedy(T, t)) > 12) return null;
  const ch = /^change/.test(q0.label);
  return k2Make(q0, {model: 'coins', m: {types: T}, ans: t, ansSay: `${t} cents`, label: ch ? q0.label : `make ${t}c`,
    html: ch ? String(q0.html).replace(/<div class="eq" style="font-size:\.7em">[\s\S]*$/, '') + k2Sub('Put the change in the purse.')
      : `<div class="eq">${t}¢</div>${k2Sub(`Put ${t}¢ in the purse.`)}`,
    say: ch ? `${q0.say} Put the change in the purse.` : `Make ${t} cents. Tap the coins to put them in the purse.`,
    hint: `Start with the biggest coin that fits, then count on to ${t}.`});
}
// time 1-5: set the clock; 5 minutes a step (and 1 minute in 3rd grade)
function k2Clock(q0, lv) {
  const m = /(\d+):(\d\d)$/.exec(q0.ans);
  if (!m) return null;
  const h = +m[1], mi = +m[2], one = lv >= 5, ts = mmTimeSay(h, mi);
  if (!one && mi % 5) return null;
  return k2Make(q0, {model: 'clock', m: {one}, ans: `${h}:${m[2]}`, ansSay: ts,
    html: `<div class="eq">${h}:${m[2]}</div>${k2Sub('Show this time on the clock.')}`, say: `Show ${ts} on the clock.`,
    hint: mi ? `The long hand shows the minutes: count by 5s from the 12 to ${mi - mi % 5}${mi % 5 ? ', then ' + (mi % 5) + ' more' : ''}. The short hand is just past the ${h}.`
      : `The long hand points to the 12. The short hand points to the ${h}.`});
}
// arr 1-2, mult 1-2, mfact 1-3: the array of the fact (rows, then how many in each row)
function k2Array(q0) {
  const m = /^(?:array )?(\d+) (?:rows of|×) (\d+)/.exec(q0.label);
  if (!m) return null;
  const r = +m[1], c = +m[2];
  if (r < 1 || r > 10 || c < 1 || c > 10 || r * c == 1) return null;
  const fact = /^\d+ × \d+ = \?$/.test(q0.label), keep = String(r * c) === String(q0.ans);
  return k2Make(q0, {model: 'array', m: {r, c}, ans: r * c, ansSay: `${r} rows of ${c}`, label: keep ? q0.label : `array ${r} rows of ${c}`,
    html: (fact ? `<div class="eq">${r} × ${c}</div>` : '') + k2Sub(`Make an array: ${r} row${r == 1 ? '' : 's'} of ${c}.`),
    say: `${fact ? `${r} times ${c}. ` : ''}Make an array with ${r} row${r == 1 ? '' : 's'} of ${c}.`,
    hint: 'Rows go across. Set the number of rows, then how many dots in each row.'});
}
// frac 1 (1st): shade one half or one fourth of a shape cut in 2 or 4 equal parts
function k2Halves(q0) {
  const four = /fourths/.test(q0.label), d = four ? 4 : pick([2, 4]), sh = /circle/.test(q0.label) ? 'circle' : 'bar';
  const n = four ? 1 : d / 2, w = four ? 'one fourth' : 'one half';
  return k2Make(q0, {model: 'parts', m: {shape: sh, d, whole: 1}, ans: four ? '1/4' : '1/2', ansSay: `${n} of the ${d} parts`, label: `shade ${w} of ${d} ${sh}`,
    html: k2Sub(`Shade ${w} of the ${sh == 'bar' ? 'bar' : 'circle'}.`), say: `Tap the parts to shade ${w} of the ${sh == 'bar' ? 'bar' : 'circle'}.`,
    hint: four ? 'Fourths are 4 equal parts. One fourth is 1 of them.' : `Halves are 2 equal parts. ${d == 4 ? 'With 4 parts, one half is 2 of them.' : 'One half is 1 of them.'}`});
}
// frac 2 (3rd): shade n/d of the bar or circle of the fact
function k2FracShade(q0) {
  const m = /^frac (?:pic )?(\d+)\/(\d+)(?: (bar|circle))?$/.exec(q0.label);
  if (!m) return null;
  const n = +m[1], d = +m[2], sh = m[3] == 'circle' || d > 6 ? 'circle' : 'bar';
  if (d > 8 || n >= d) return null;
  return k2Make(q0, {model: 'parts', m: {shape: sh, d, whole: 1}, ans: q0.ans, ansSay: fcSay(n, d),
    html: `${k2Sub('Shade')}<div class="eq">${fcFr(n, d)}</div>${k2Sub(`of the ${sh}.`)}`, say: `Tap the parts to shade ${fcSay(n, d)} of the ${sh}.`,
    hint: `The bottom number ${d} says how many equal parts. The top number ${n} says how many to shade.`});
}
// geo 2: shade a rectangle of the fact's sides on a 6 by 4 grid (a new one when the fact's is bigger); the area is the squares shaded
function k2Area(q0) {
  const m = /(\d+)x(\d+)/.exec(q0.label);
  let w = m ? +m[1] : 0, h = m ? +m[2] : 0, keep = true;
  if (w > 6 || h > 4) [w, h] = [h, w];
  if (!(w >= 1 && w <= 6 && h >= 1 && h <= 4) || w * h < 2) {
    w = R(2, 6);
    h = R(2, 4);
    keep = false;
  }
  return k2Make(q0, {model: 'parts', m: {shape: 'grid', w: 6, h: 4, rect: [w, h]}, ans: keep ? q0.ans : w * h, ansSay: `${w * h} squares`,
    label: keep ? q0.label : `geo2 shade ${w}x${h}`, html: k2Sub(`Shade a rectangle ${w} squares long and ${h} squares wide.`),
    say: `Shade a rectangle ${w} squares long and ${h} squares wide. Its area is the squares you shade.`,
    hint: `Shade ${h} row${h == 1 ? '' : 's'} of ${w} squares. Count them all: that is the area.`});
}
// dec 1 (4th): the 10 squares are one whole; shade the tenths of the fact (a new number when the fact is not tenths below 1)
function k2DecShade(q0) {
  let v = k2Val(q0.ans), keep = true;
  if (!(v > 0 && v < 1 && Math.abs(v * 10 - Math.round(v * 10)) < 1e-9)) {
    v = R(1, 9) / 10;
    keep = false;
  }
  const k = Math.round(v * 10), vs = '0.' + k;
  return k2Make(q0, {model: 'parts', m: {shape: 'grid', w: 5, h: 2, whole: 1}, ans: keep ? q0.ans : vs, ansSay: `${k} tenths`, label: keep ? q0.label : `dec1 shade ${vs}`,
    html: `${k2Sub('The 10 squares are 1 whole. Shade')}<div class="eq">${vs}</div>`, say: `The 10 squares make 1 whole. Shade ${k2SayNum(v)}.`,
    hint: 'Each square is one tenth. The digit after the point says how many to shade.'});
}

// ---- KINDS2-D find the mistake (spec 2.5): a worked example of the stop's fact with one wrong step; kind tap, each step a .tp line ----
// A family gives the problem, its steps and the mistakes a child might make; build(mis) writes the steps with that one mistake (null:
// none). Column sums (add, sub) keep every other step right; chains (multiply, divide, decimals, fractions, order of operations,
// equations) go on from the wrong number, so every later step is right for what was written and only one step is wrong. The steps
// before the mistake are the right ones (checked here), the answer is the wrong step's index, and the spoken answer reads the right step.
// tap gets the same() the newer kinds have: the engine's own comparison (the tapped data-v is the answer)
if (!KIND.tap.same) KIND.tap.same = (q, v) => String(v) === String(q.ans);
const K2WHO = ['Sam', 'Mia', 'Leo', 'Ana', 'Kai', 'Zoe', 'Ben', 'Ivy'];
const K2PL = ['Ones', 'Tens', 'Hundreds', 'Thousands'];
const k2Speak = t => String(t).replace(/(\d) R(\d)/g, '$1 remainder $2').replace(/×/g, 'times').replace(/÷/g, 'divided by').replace(/\+/g, 'plus')
  .replace(/−/g, 'minus').replace(/=/g, 'is').replace(/:/g, ',').replace(/\s+/g, ' ').trim();
const k2Gcd = (x, y) => (y ? k2Gcd(y, x % y) : x);
// f: {prob (the problem as printed), lab (its short form for the label), build(mis) -> [step text] or null, muts [[i, kind], ...], hint}
function k2FixQ(q0, f) {
  const ok = f.build(null);
  if (!ok || ok.length < 3 || ok.length > 5) return null;
  const cands = f.muts.filter(([i, k]) => {
    const b = f.build({i, k});
    return b && b.length == ok.length && b[i] !== ok[i] && b.every((t, j) => j >= i || t === ok[j]);
  });
  if (!cands.length) return null;
  const [i, k] = pick(cands), lines = f.build({i, k}), who = pick(K2WHO);
  return k2New(q0, {q: {kind: 'tap', ans: String(i)}, label: `fix: ${f.lab} ${k} ${i + 1}`,
    html: k2Sub(`${who} worked it out. One step has a mistake. Tap it.`) + `<div class="eq">${esc(f.prob)}</div><div class="fxs">`
      + lines.map((t, j) => `<div class="tp fxl" data-v="${j}"><b class="fxn" aria-hidden="true">${j + 1}</b><span>${esc(t)}</span></div>`).join('') + '</div>',
    say: `${who} worked out ${k2Speak(f.prob)}. One step has a mistake. Find it and tap it.`,
    ansSay: `Step ${i + 1}. It should say: ${k2Speak(ok[i])}.`, hint: f.hint});
}
// big 3-6: column addition (2 to 4 digits, the same length); the carry shows as "+ 1" in the next column
function k2FixAdd(q0) {
  const m = /^(\d+) \+ (\d+) = \?$/.exec(q0.label);
  if (!m || m[1].length != m[2].length || m[1].length < 2 || m[1].length > 4) return null;
  const n = m[1].length, da = [...m[1]].reverse().map(Number), db = [...m[2]].reverse().map(Number), muts = [];
  const build = mis => {
    const L = [];
    let c = 0, out = '';
    for (let j = 0; j < n; j++) {
      const s = da[j] + db[j] + c;
      let t = s, cs = c;
      if (mis && mis.i == j) {
        if (mis.k == 'carry') {
          if (!c) return null;
          cs = 0;
          t = s - 1;
        } else t = s + (mis.k == 'up' ? 1 : -1);
      }
      if (t < 0) return null;
      L.push(`${K2PL[j]}: ${da[j]} + ${db[j]}${cs ? ' + 1' : ''} = ${t}`);
      out = (j == n - 1 ? String(t) : String(t % 10)) + out;
      c = s >= 10 ? 1 : 0;
    }
    return L.concat(`So ${m[1]} + ${m[2]} = ${+out}`);
  };
  for (let j = 0; j < n; j++) muts.push([j, 'carry'], [j, 'carry'], [j, 'up'], [j, 'down']); // the forgotten carry is the likely one
  return k2FixQ(q0, {prob: `${m[1]} + ${m[2]}`, lab: `${m[1]}+${m[2]}`, build, muts,
    hint: 'Check each column. When a column makes 10 or more, the next column gets 1 more.'});
}
// sub 4-8: column subtraction (2 to 4 digits, the same length); a trade shows as the bigger top number (12 − 8) and the smaller one next to it
function k2FixSub(q0) {
  const m = /^(\d+) [−-] (\d+) = \?$/.exec(q0.label);
  if (!m || m[1].length != m[2].length || m[1].length < 2 || m[1].length > 4 || +m[2] > +m[1]) return null;
  const n = m[1].length, ta = [...m[1]].reverse().map(Number), tb = [...m[2]].reverse().map(Number), muts = [];
  const build = mis => {
    const L = [];
    let bin = 0, out = '';
    for (let j = 0; j < n; j++) {
      const t = ta[j], b = tb[j], eff = t - bin, tr = eff < b, top = eff + (tr ? 10 : 0), r = top - b;
      let x = top, y = b, v = r;
      if (mis && mis.i == j) {
        if (mis.k == 'flip') { // the smaller digit from the bigger one (no trade)
          if (!tr || bin) return null;
          [x, y, v] = [b, t, b - t];
        } else if (mis.k == 'trade') { // the trade to the column before is forgotten
          if (!bin) return null;
          x = top + 1;
          v = r + 1;
        } else v = r + (mis.k == 'up' ? 1 : -1);
        if (v < 0 || v > 9) return null;
      }
      L.push(`${K2PL[j]}: ${x} − ${y} = ${v}`);
      out = v + out;
      bin = tr ? 1 : 0;
    }
    return L.concat(`So ${m[1]} − ${m[2]} = ${+out}`);
  };
  for (let j = 0; j < n; j++) muts.push([j, 'flip'], [j, 'flip'], [j, 'trade'], [j, 'trade'], [j, 'up'], [j, 'down']);
  return k2FixQ(q0, {prob: `${m[1]} − ${m[2]}`, lab: `${m[1]}-${m[2]}`, build, muts,
    hint: 'Check each column. When the top digit is too small, trade 1 from the next column: that column then has 1 less.'});
}
// mbig 2-5: times a one-digit number by places (2 × 7, 2 × 60, then the sum), or times a two-digit number (× ones, × tens, the sum)
function k2FixMbig(q0) {
  const m = /^(\d+) × (\d+) = \?$/.exec(q0.label);
  if (!m) return null;
  const a = +m[1], b = +m[2], muts = [];
  let rows;
  if (b < 10) rows = [...m[1]].reverse().map((d, k) => +d * 10 ** k).filter(x => x).map(p => [b, p]);
  else if (b < 100 && b % 10) rows = [[a, b % 10], [a, b - b % 10]];
  else return null;
  if (rows.length < 2 || rows.length > 3) return null;
  const build = mis => {
    const L = [], ps = [];
    for (let j = 0; j < rows.length; j++) {
      const [x, y] = rows[j], big = Math.max(String(x).length, String(y).length) > 1 && (x % 10 == 0 || y % 10 == 0);
      let r = x * y;
      if (mis && mis.i == j) {
        if (mis.k == 'zero') { // the tens worked as ones (2 × 60 = 12)
          if (!big) return null;
          r = r / 10;
        } else r += (mis.k == 'up' ? 1 : -1) * (big ? 10 : 1);
      }
      ps.push(r);
      L.push(`${x} × ${y} = ${r}`);
    }
    let s = ps.reduce((u, v) => u + v, 0);
    if (mis && mis.i == rows.length) s += mis.k == 'up' ? 10 : -10;
    return L.concat(`${ps.join(' + ')} = ${s}`);
  };
  rows.forEach((r, j) => muts.push([j, 'zero'], [j, 'zero'], [j, 'up'], [j, 'down']));
  muts.push([rows.length, 'up'], [rows.length, 'down']);
  return k2FixQ(q0, {prob: `${a} × ${b}`, lab: `${a}x${b}`, build, muts,
    hint: 'Check each part. A tens part ends in 0: 2 × 60 is 2 × 6 tens, which is 12 tens, or 120.'});
}
// dbig 1-3: long division, one step a digit (36 ÷ 7 = 5 R1), then the answer
function k2FixDiv(q0) {
  const m = /^(\d+) ÷ (\d) = \?$/.exec(q0.label);
  if (!m || +m[2] < 2) return null;
  const a = m[1], d = +m[2];
  const build = mis => {
    let k = 1;
    while (k < a.length && +a.slice(0, k) < d) k++;
    let cur = +a.slice(0, k), r = 0, Q = '', j = 0;
    const L = [];
    for (;;) {
      let q = Math.floor(cur / d), rr = cur - q * d;
      if (mis && mis.i == j) {
        if (mis.k == 'rem') { // a remainder as big as the divisor or bigger (one too few in the answer)
          if (k < a.length || q < 1) return null;
          q -= 1;
          rr += d;
        } else if (mis.k == 'zero') return null;
        else {
          rr += mis.k == 'up' ? 1 : -1;
          if (rr < 0 || rr >= d) return null;
        }
      }
      L.push(`${cur} ÷ ${d} = ${q}${rr ? ' R' + rr : ''}`);
      Q += q;
      r = rr;
      j++;
      if (k >= a.length) break;
      cur = r * 10 + +a[k];
      k++;
    }
    let qs = String(+Q);
    if (mis && mis.i == j) { // the answer drops a 0 inside it (324 ÷ 3 = 18)
      if (mis.k != 'zero' || !/\d0/.test(qs)) return null;
      qs = qs.replace(/(\d)0/, '$1');
    }
    return L.concat(`So ${a} ÷ ${d} = ${qs}${r ? ' R' + r : ''}`);
  };
  const ok = build(null), muts = [];
  if (!ok) return null;
  for (let j = 0; j < ok.length - 1; j++) muts.push([j, 'up'], [j, 'down'], [j, 'rem'], [j, 'rem']);
  muts.push([ok.length - 1, 'zero'], [ok.length - 1, 'zero']);
  return k2FixQ(q0, {prob: `${a} ÷ ${d}`, lab: `${a}/${d}`, build, muts,
    hint: `Check each step: ${d} times the answer plus the remainder gives the number. The remainder is always less than ${d}.`});
}
// dec 3: a whole number and a decimal, added or taken away: write the whole number with the same places, work it out, the answer
const k2Dp = s => (String(s).split('.')[1] || '').length;
const k2DecStr = (v, p) => (v < 0 ? '-' : '') + (Math.abs(v) / 10 ** p).toFixed(p);
function k2FixDecAdd(q0) {
  const m = /^([\d.]+) ([+−]) ([\d.]+) = \?$/.exec(q0.label);
  if (!m) return null;
  const [x, op, y] = [m[1], m[2], m[3]], P = Math.max(k2Dp(x), k2Dp(y));
  if (Math.min(k2Dp(x), k2Dp(y)) > 0 || !P) return null;
  const W = k2Dp(x) ? y : x, S = s => Math.round(+s * 10 ** P);
  const build = mis => {
    let w = W + '.' + '0'.repeat(P);
    if (mis && mis.i == 0) w = (+W / 10 ** P).toFixed(P); // the digits lined up at the right, not the points (54 as 0.54)
    const X = k2Dp(x) ? x : w, Y = k2Dp(x) ? w : y;
    let v = op == '+' ? S(X) + S(Y) : S(X) - S(Y);
    if (mis && mis.i == 1) v += (mis.k == 'up' ? 1 : -1) * 10 ** P;
    if (v < 0) return null;
    return [`Write ${W} as ${w}`, `${X} ${op} ${Y} = ${k2DecStr(v, P)}`, `So ${x} ${op} ${y} = ${+k2DecStr(v, P)}`];
  };
  return k2FixQ(q0, {prob: `${x} ${op} ${y}`, lab: `${x}${op == '+' ? '+' : '-'}${y}`, build, muts: [[0, 'point'], [0, 'point'], [1, 'up'], [1, 'down']],
    hint: `Line up the points. A whole number has its point at the end: ${W} is ${W}.${'0'.repeat(P)}.`});
}
// dec 4: multiply without the points, count the digits after the points, put the point in
function k2FixDecMul(q0) {
  const m = /^([\d.]+) × ([\d.]+) = \?$/.exec(q0.label);
  if (!m) return null;
  const [x, y] = [m[1], m[2]], px = k2Dp(x), py = k2Dp(y), X = +x.replace('.', ''), Y = +y.replace('.', '');
  if (!px && !py) return null;
  const build = mis => {
    let p = X * Y, n = px + py, at = n;
    if (mis && mis.i == 0) p += mis.k == 'up' ? 10 : -10;
    if (mis && mis.i == 1) n = mis.k == 'up' ? n + 1 : n - 1; // a factor's digits not counted, or one too many
    at = n;
    if (mis && mis.i == 2) at = mis.k == 'up' ? n + 1 : n - 1; // the point put in the wrong place
    if (p < 1 || n < 1 || at < 1) return null;
    return [`Without the points: ${X} × ${Y} = ${p}`, `Digits after the points: ${px} + ${py} = ${n}`,
      `Point ${n} digit${n == 1 ? '' : 's'} from the right: ${k2DecStr(p, at)}`];
  };
  return k2FixQ(q0, {prob: `${x} × ${y}`, lab: `${x}x${y}`, build, muts: [[0, 'up'], [0, 'down'], [1, 'down'], [1, 'down'], [1, 'up'], [2, 'up'], [2, 'down']],
    hint: 'Count the digits after the point in both numbers. The answer has that many digits after its point.'});
}
// fop 1: like fractions (the bottom stays), fop 3: unlike fractions (make the bottoms the same first)
function k2FixFop(q0) {
  let m = /^fop1 (\d+)\/(\d+) ([+−]) (\d+)\/(\d+)$/.exec(q0.label);
  if (m) {
    const [a, d, op, c] = [+m[1], +m[2], m[3], +m[4]];
    if (+m[5] != d) return null;
    const build = mis => {
      let bot = d, top = op == '+' ? a + c : a - c;
      let l0 = `Same size parts: the bottom stays ${d}`;
      if (mis && mis.i == 0) { // the bottoms added too
        if (op != '+') return null;
        bot = d + d;
        l0 = `Add the bottoms: ${d} + ${d} = ${bot}`;
      }
      if (mis && mis.i == 1) top += mis.k == 'up' ? 1 : -1;
      if (top < 0) return null;
      return [l0, `${op == '+' ? 'Add' : 'Take away'} the tops: ${a} ${op} ${c} = ${top}`, `So ${a}/${d} ${op} ${c}/${d} = ${top}/${bot}`];
    };
    return k2FixQ(q0, {prob: `${a}/${d} ${op} ${c}/${d}`, lab: `${a}/${d}${op == '+' ? '+' : '-'}${c}/${d}`, build,
      muts: [[0, 'bottoms'], [0, 'bottoms'], [1, 'up'], [1, 'down']], hint: 'The parts are the same size, so the bottom number stays. Work with the tops.'});
  }
  m = /^fop3 (\d+)\/(\d+) ([+−]) (\d+)\/(\d+)( simplest)?$/.exec(q0.label);
  if (!m) return null;
  const [a, b, op, c, d] = [+m[1], +m[2], m[3], +m[4], +m[5]];
  if (b == d) return null;
  const L = b * d / k2Gcd(b, d), A = a * L / b, C = c * L / d;
  const build = mis => {
    let x = A, y = C, bot = L;
    if (mis && mis.i == 1) {
      if (mis.k == 'bottom') { // only the bottom changed (1/2 = 1/6)
        if (a == A) return null;
        x = a;
      } else x += mis.k == 'up' ? 1 : -1;
    }
    let top = op == '+' ? x + y : x - y;
    if (mis && mis.i == 2) {
      if (mis.k == 'bottoms') { // the bottoms added too
        if (op != '+') return null;
        bot = 2 * L;
      } else top += mis.k == 'up' ? 1 : -1;
    }
    if (x < 1 || top < 0) return null;
    return [`${b} and ${d} both go into ${L}: make both bottoms ${L}`, `${a}/${b} = ${x}/${L} and ${c}/${d} = ${y}/${L}`, `${x}/${L} ${op} ${y}/${L} = ${top}/${bot}`];
  };
  return k2FixQ(q0, {prob: `${a}/${b} ${op} ${c}/${d}`, lab: `${a}/${b}${op == '+' ? '+' : '-'}${c}/${d}`, build,
    muts: [[1, 'bottom'], [1, 'bottom'], [1, 'up'], [2, 'bottoms'], [2, 'bottoms'], [2, 'up'], [2, 'down']],
    hint: 'Make the bottoms the same first. Whatever you do to the bottom, do to the top. Then add or take away only the tops.'});
}
// ooo 1: one operation a step (inside the brackets first, then × and ÷, then + and −); a wrong step can do + before ×
const k2Op = (x, o, y) => (o == '+' ? x + y : o == '−' ? x - y : o == '×' ? x * y : x / y);
// the next step of tokens t: [new tokens, x, op, y, value]; left: the leftmost operation of the innermost brackets (the order mistake)
function k2OooStep(t, left, dv = 0) {
  let s = 0, e = t.length;
  const o = t.lastIndexOf('(');
  if (o >= 0) [s, e] = [o + 1, t.indexOf(')', o)];
  const ops = [];
  for (let j = s; j < e; j++) if (/^[+−×÷]$/.test(t[j])) ops.push(j);
  const md = ops.find(j => /[×÷]/.test(t[j])), j = left ? ops[0] : md != null ? md : ops[0];
  const x = +t[j - 1], y = +t[j + 1], v = k2Op(x, t[j], y) + dv, n = t.slice(0, j - 1).concat(String(v), t.slice(j + 2));
  if (o >= 0 && n[o + 2] == ')') n.splice(o, 3, n[o + 1]); // (8) -> 8
  return [n, x, t[j], y, v, j != (md != null ? md : ops[0])];
}
function k2FixOoo(q0) {
  const m = /^(.+) = \?$/.exec(q0.label);
  if (!m || q0.kind != 'num' || !/^[\d +−×÷()]+$/.test(m[1])) return null;
  const t0 = m[1].match(/\d+|[+−×÷()]/g), nOps = t0.filter(x => /[+−×÷]/.test(x)).length;
  if (nOps < 2 || nOps > 4) return null;
  const build = mis => {
    let t = t0.slice();
    const L = [];
    for (let j = 0; j < nOps; j++) {
      const w = mis && mis.i == j, [n, x, o, y, v, moved] = k2OooStep(t, w && mis.k == 'order', w && mis.k != 'order' ? (mis.k == 'up' ? 1 : -1) : 0);
      if (w && mis.k == 'order' && !moved) return null;
      if (!Number.isInteger(v) || v < 0) return null;
      L.push(`${x} ${o} ${y} = ${v}`);
      t = n;
    }
    return nOps < 3 ? L.concat(`So ${m[1]} = ${t[0]}`) : L;
  };
  const muts = [];
  for (let j = 0; j < nOps; j++) muts.push([j, 'order'], [j, 'order'], [j, 'up'], [j, 'down']);
  return k2FixQ(q0, {prob: m[1], lab: m[1].replace(/ /g, ''), build, muts,
    hint: 'Work inside the brackets first. Then times and divide, from left to right. Then plus and minus.'});
}
// alg 1-3: undo each operation on both sides (the inverse operation), work it out; a wrong step can do the same operation again
const K2UNDO = {'+': ['−', 'Take away {k} from both sides'], '−': ['+', 'Add {k} to both sides'], '×': ['÷', 'Divide both sides by {k}'], '÷': ['×', 'Multiply both sides by {k}']};
const K2SAME = {'+': ['+', 'Add {k} to both sides'], '−': ['−', 'Take away {k} from both sides'], '×': ['−', 'Take away {k} from both sides'], '÷': ['÷', 'Divide both sides by {k}']};
function k2FixAlg(q0) {
  const m = /^alg\d (.+) = (\d+)$/.exec(q0.label);
  if (!m || q0.kind != 'num') return null;
  const s = m[1], c = +m[2];
  let mm, v, ops; // ops: the operations to undo, outermost first: [op, k, what is left]
  if ((mm = /^([a-z]) ([+−÷]) (\d+)$/.exec(s))) [v, ops] = [mm[1], [[mm[2], +mm[3], mm[1]]]];
  else if ((mm = /^(\d+) \+ ([a-z])$/.exec(s))) [v, ops] = [mm[2], [['+', +mm[1], mm[2]]]];
  else if ((mm = /^(\d+)([a-z])$/.exec(s))) [v, ops] = [mm[2], [['×', +mm[1], mm[2]]]];
  else if ((mm = /^(\d+)([a-z]) ([+−]) (\d+)$/.exec(s))) [v, ops] = [mm[2], [[mm[3], +mm[4], mm[1] + mm[2]], ['×', +mm[1], mm[2]]]];
  else return null;
  const build = mis => {
    const L = [];
    let r = c;
    ops.forEach(([o, k, rest], j) => {
      const [inv, txt] = (mis && mis.i == 2 * j && mis.k == 'same' ? K2SAME : K2UNDO)[o];
      L.push(`${txt.replace('{k}', k)}: ${rest} = ${r} ${inv} ${k}`);
      let x = k2Op(r, inv, k);
      if (mis && mis.i == 2 * j + 1) x += mis.k == 'up' ? 1 : -1;
      L.push(`${r} ${inv} ${k} = ${x}`);
      r = x;
    });
    if (L.some(x => /NaN|\./.test(x)) || !Number.isInteger(r) || r < 0) return null;
    return ops.length == 1 ? L.concat(`So ${v} = ${r}`) : L;
  };
  const muts = [];
  ops.forEach((o, j) => muts.push([2 * j, 'same'], [2 * j, 'same'], [2 * j + 1, 'up'], [2 * j + 1, 'down']));
  return k2FixQ(q0, {prob: `${s} = ${c}`, lab: `${s.replace(/ /g, '')}=${c}`, build, muts,
    hint: 'Undo each step with the opposite: take away undoes add, divide undoes times. Do the same to both sides.'});
}

const K2GEN = {
  sort: {2: [.5, k2SortSize], 3: [.5, k2SortKinds]},
  sound: {1: [.4, k2Sound], 2: [.4, k2Sound]},
  rhyme: {1: [.4, k2Rhyme]},
  eo: {1: [.6, k2EO], 2: [.6, k2EO]},
  syl: {1: [.5, k2Syl], 2: [.5, k2Syl]},
  pic: {3: [.4, k2Vowel], 4: [.4, k2Vowel]},
  fact: {1: [.4, k2Factor], 2: [.6, k2Prime]},
  ang: {1: [.5, k2Angle]},
  // KINDS2-B line and KINDS2-C make (spec 3; shares raised to 40% where 30% or 25% would leave the old kind over 65%, see PROGRESS)
  frac: {1: [.4, k2Halves], 2: [.3, k2FracShade], 3: [q => (q.kind == 'tap' ? 1 : .22), k2FracLine], 4: [.4, k2Half]},
  dec: {1: [[.3, k2Dec1Line], [.3, k2DecShade]], 2: [[.4, k2Half], [.3, k2Dec2Line]], 3: [.33, k2FixDecAdd], 4: [.2, k2FixDecMul]},
  cnt: {1: [.4, k2Cnt], 4: [.4, k2Cnt]},
  round: {1: [.5, k2Round], 2: [.5, k2Round], 3: [.5, k2Round], 4: [.5, k2Round]},
  pv: {1: [.4, k2B10], 2: [.4, k2B10], 5: [.3, k2Pv5Line]},
  int: {1: [.4, k2IntLine], 2: [.45, k2IntOpp]},
  tenf: {1: [.45, k2Frame], 2: [.45, k2Frame], 3: [.45, k2Frame]},
  pk_count: {3: [.45, k2Frame]},
  add: {4: [.45, k2AddFrame]},
  big: {1: [.4, k2B10], 3: [.2, k2FixAdd], 4: [.2, k2FixAdd], 5: [.2, k2FixAdd], 6: [.27, k2FixAdd]},
  coins: {1: [.45, k2Coins], 2: [.4, k2Coins], 3: [.4, k2Coins], 5: [.45, k2Coins]},
  time: {1: [.4, k2Clock], 2: [.4, k2Clock], 3: [.4, k2Clock], 4: [.4, k2Clock], 5: [.4, k2Clock]},
  arr: {1: [.4, k2Array], 2: [.25, k2Array]},
  mult: {1: [.4, k2Array], 2: [.4, k2Array]},
  mfact: {1: [.25, k2Array], 2: [.25, k2Array], 3: [.25, k2Array]},
  geo: {2: [.4, k2Area]},
  es_art: {1: [.6, k2Art], 2: [.6, k2Art]},
  es_ser: {2: [.45, k2Ser]},
  es_gusta: {2: [.45, k2Gusta]},
  es_mix: {2: [.5, k2EsMix]},
  // KINDS2-D find the mistake (spec 3: 20% of the computation stops). A converter gives no question for some facts (5 or more digits,
  // mixed numbers, a one-step division ...), so a share is raised where that leaves the stop near 20%; ooo 1 and alg 3 convert only
  // their number questions. big 7 (6-digit sums: 7 lines, too tall for a phone) has none; sub 8 converts its 4-digit facts only.
  sub: {4: [.2, k2FixSub], 5: [.2, k2FixSub], 6: [.22, k2FixSub], 7: [.25, k2FixSub], 8: [.5, k2FixSub]},
  mbig: {2: [.28, k2FixMbig], 3: [.33, k2FixMbig], 4: [.28, k2FixMbig], 5: [.25, k2FixMbig]},
  dbig: {1: [.2, k2FixDiv], 2: [.4, k2FixDiv], 3: [.22, k2FixDiv]},
  fop: {1: [.33, k2FixFop], 3: [.2, k2FixFop]},
  ooo: {1: [q => (q.kind == 'num' ? .4 : 0), k2FixOoo]},
  alg: {1: [.2, k2FixAlg], 2: [.2, k2FixAlg], 3: [q => (q.kind == 'num' ? .3 : 0), k2FixAlg]},
};
// the skills in SK now; es_art, es_ser and es_gusta are made by a data file (d-es-gram.js) that loads later and calls these functions
for (const sk in K2GEN) if (SK[sk]) SK[sk].gen = k2Wrap(sk, SK[sk].gen);
if (typeof genEsArt == 'function') genEsArt = k2Wrap('es_art', genEsArt);
if (typeof genEsSer == 'function') genEsSer = k2Wrap('es_ser', genEsSer);
if (typeof genEsGusta == 'function') genEsGusta = k2Wrap('es_gusta', genEsGusta);

// ---- "not three in a row" (spec 4): makeQ and mastQ draw a stop's question through pickQ ----
// G.kh: the kinds asked so far this round (makeQ pushes every question it returns). After two of one kind, up to 10 draws look for
// another kind; a stop that gives only that kind is remembered in KMONO for the session, so it pays the extra draws once.
const KMONO = {};
// mix: Practice's own draw only (lsMix)
function pickQ(sk, lv, mix) {
  const h = G.kh || (G.kh = []), two = h.length > 1 && h[h.length - 1] === h[h.length - 2] ? h[h.length - 1] : null, id = sk + lv;
  let q, alt;
  // LESSON-STAGE: a stop whose questions are all one kind: the third in a row comes from its lesson in another kind (lsMix, part teach)
  if (mix && two && KMONO[id] && typeof lsMix == 'function' && (q = lsMix(sk, lv, two))) return q;
  for (let t = 0; t < 10; t++) {
    q = genQ(sk, lv);
    if (q.label === G.last) continue;
    if (!two || KMONO[id] || q.kind !== two) return q;
    alt = alt || q;
  }
  if (alt) KMONO[id] = 1;
  return alt || q;
}

// ---- KINDS2-D why (spec 5): short, kind feedback on the likely misconception after a first wrong answer ----
// q.why = {wrong value: one short sentence}; q.whySay (optional) the same keys with the words to say. A generator's question gets it
// here, after it is made (no draw, so the question is the same with or without it); K2.off leaves it out. A key is a wrong value: one
// the kind takes as right is dropped, and for choice a value that is not one of the choices. The sentence shows in the hint panel above
// the hint on the first miss (and is said for Pre-K to 1st, or with "Read questions out loud" on); never on a Challenge question.
const K2P1 = ['one', 'ten', 'hundred', 'thousand'];
function k2WhySet(q, w) {
  const K = KIND[q.kind], out = {};
  for (const k in w) {
    if (!w[k] || (K.same ? K.same(q, k) : k === String(q.ans))) continue;
    if (q.kind == 'choice' && !q.choices.some(c => String(c.v) === k)) continue;
    out[k] = w[k];
  }
  if (Object.keys(out).length) q.why = out;
  return q;
}
// sub 4-6: the smaller digit taken from the bigger one in each column (52 − 38 gives 26)
function k2WhySub(q) {
  const m = /^(\d+) [−-] (\d+) = \?$/.exec(q.label);
  if (!m || m[2].length > m[1].length) return null;
  const n = m[1].length, a = m[1], b = m[2].padStart(n, '0');
  let flip = '', first = null;
  for (let j = n - 1; j >= 0; j--) {
    flip = Math.abs(+a[j] - +b[j]) + flip;
    if (!first && +a[j] < +b[j]) first = [n - 1 - j, +a[j], +b[j]];
  }
  return first && first[0] < 3 ? {[String(+flip)]: `Looks like ${first[2]} − ${first[1]}. We can't flip them: trade a ${K2P1[first[0] + 1]} first.`} : null;
}
// big 3-5: the carry forgotten (38 + 47 gives 75), or both digits written (715)
function k2WhyAdd(q) {
  const m = /^(\d+) \+ (\d+) = \?$/.exec(q.label);
  if (!m) return null;
  const n = Math.max(m[1].length, m[2].length), a = m[1].padStart(n, '0'), b = m[2].padStart(n, '0');
  let nc = '', both = '', first = null;
  for (let j = n - 1; j >= 0; j--) {
    const s = +a[j] + +b[j];
    nc = (s % 10) + nc;
    both = s + both;
    if (!first && s >= 10) first = [n - 1 - j, +a[j], +b[j], s];
  }
  if (!first || first[0] > 2) return null;
  const [p, x, y, s] = first, t = p ? `${x} + ${y} ${K2P1[p]}s is ${s} ${K2P1[p]}s. Write the ${s % 10} and carry 1 ${K2P1[p + 1]}.`
    : `${x} + ${y} is ${s}. Write the ${s % 10} and carry the 1 ten.`;
  return {[String(+nc)]: t, [String(+both)]: t};
}
// miss 1-2, tenf 2: the two numbers shown added (4 + ? = 12 gives 16)
function k2WhyMiss(q) {
  const m = /^(\d+) \+ \? = (\d+)$/.exec(q.label) || /^\? \+ (\d+) = (\d+)$/.exec(q.label) || /^(\d+) and \? make (\d+)$/.exec(q.label);
  return m ? {[String(+m[1] + +m[2])]: `${m[2]} is the total. How many more from ${m[1]} up to ${m[2]}?`} : null;
}
// pv 1-2: the digit for its value, tens and ones swapped, the blocks counted as ones
function k2WhyPv(q) {
  const l = String(q.label);
  let m;
  if ((m = /^pv tens in (\d)(\d)$/.exec(l))) return {[m[2]]: `The ${m[2]} is in the ones place. The tens digit is on the left.`, [m[1] + '0']: `${m[1]}0 is what the tens are worth. How many tens is that?`};
  if ((m = /^pv picture (\d) tens (\d) ones$/.exec(l))) return {[String(+(m[2] + m[1]))]: 'Tens come first: write the tens digit, then the ones.', [String(+m[1] + +m[2])]: 'Each rod is 10. Count the rods by 10s: 10, 20, 30 ...'};
  if ((m = /^pv picture (\d)(\d)(\d)$/.exec(l))) return {[String(+m[1] + +m[2] + +m[3])]: 'Each flat is 100 and each rod is 10. Count by 100s, then 10s, then 1s.'};
  if ((m = /^(\d)0 \+ (\d) = \?$/.exec(l))) return {[`${m[1]}0${m[2]}`]: `${m[1]}0 is ${m[1]} tens. The ${m[2]} goes in the ones place.`};
  if ((m = /^value of (\d) in (\d+)$/.exec(l))) {
    const p = m[2].length - 1 - m[2].indexOf(m[1]), val = +m[1] * 10 ** p, w = {};
    for (const c of q.choices) if (c.v !== q.ans) w[c.v] = c.v === m[1] ? `That ${m[1]} sits in the ${K2P1[p]}s place, so it is worth ${val}.` : 'Count the places from the right: ones, tens, hundreds.';
    return w;
  }
  return null;
}
// frac 4, 6: "a bigger bottom number means a bigger fraction" (1/8 > 1/4)
function k2WhyFrac(q) {
  const m = /^frac cmp2? (\d+)\/(\d+) \? (\d+)\/(\d+)$/.exec(q.label);
  if (!m) return null;
  const [a, b, c, d] = m.slice(1).map(Number);
  if (b == d) return null;
  return {[b > d ? '>' : '<']: a == c && FC_NAMES[b] && FC_NAMES[d] ? `More parts means smaller parts. ${k2Cap(fcPl(Math.max(b, d)))} are smaller than ${fcPl(Math.min(b, d))}.`
    : 'A bigger bottom number means smaller parts, not a bigger fraction.'};
}
// dec 2: "the longer decimal is bigger" (0.25 > 0.3)
function k2WhyDec(q) {
  const m = /^dec2 (\d+)\.?(\d*) \? (\d+)\.?(\d*)$/.exec(q.label);
  if (!m || m[1] != m[3] || m[2].length == m[4].length) return null;
  const x = m[2].padEnd(3, '0'), y = m[4].padEnd(3, '0'), k = [0, 1, 2].find(j => x[j] != y[j]), nm = ['tenth', 'hundredth', 'thousandth'];
  if (k == null) return null;
  const hi = Math.max(+x[k], +y[k]), lo = Math.min(+x[k], +y[k]), s = v => `${v} ${nm[k]}${v == 1 ? '' : 's'}`;
  return {[m[2].length > m[4].length ? '>' : '<']: (k ? `The ${nm.slice(0, k).map(z => z + 's').join(' and ')} are the same. Then ` : 'Compare tenths first: ')
    + `${s(hi)} beats ${s(lo)}.`};
}
// fop 1, 3: the tops added and the bottoms added (1/2 + 1/3 gives 2/5)
function k2WhyFop(q) {
  const m = /^fop([13]) (\d+)\/(\d+) \+ (\d+)\/(\d+)( simplest)?$/.exec(q.label);
  if (!m) return null;
  return {[`${+m[2] + +m[4]}/${+m[3] + +m[5]}`]: m[1] == '1' ? 'Keep the bottom number. The parts are the same size, so add only the tops.'
    : "Don't add the bottoms. Make the parts the same size first."};
}
// round 1-4: rounded the wrong way (always down, or 5 rounded down)
function k2WhyRound(q) {
  const m = /^round ([\d.]+) to (.+)$/.exec(q.label);
  if (!m) return null;
  const n = +m[1], u = K2UNIT[m[2]] || +m[2], lo = k2Clean(Math.floor(n / u + 1e-9) * u), hi = k2Clean(lo + u), a = k2Val(q.ans);
  if (!u || n == lo) return null;
  return a == hi ? {[String(lo)]: 'Look at the digit to the right. 5 or more rounds up.'}
    : a == lo ? {[String(hi)]: 'Look at the digit to the right. 4 or less rounds down.'} : null;
}
// ooo 1: worked from left to right (2 + 3 × 4 gives 20)
function k2WhyOoo(q) {
  const m = /^(.+) = \?$/.exec(q.label);
  if (!m || !/^[\d +−×÷()]+$/.test(m[1])) return null;
  const t = m[1].match(/\d+|[+−×÷()]/g);
  let v = t.slice();
  for (let g = 0; g < 9 && v.length > 1; g++) { // left to right: the brackets first, then each operation in order
    const o = v.lastIndexOf('('), s = o >= 0 ? o + 1 : 0, j = v.findIndex((z, i) => i >= s && /^[+−×÷]$/.test(z));
    const r = k2Op(+v[j - 1], v[j], +v[j + 1]);
    v = v.slice(0, j - 1).concat(String(r), v.slice(j + 2));
    if (o >= 0 && v[o + 2] == ')') v.splice(o, 3, v[o + 1]);
  }
  const ltr = +v[0];
  let d = 0, k = -1, add = '';
  for (let i = 0; i < t.length && k < 0; i++) {
    d += t[i] == '(' ? 1 : t[i] == ')' ? -1 : 0;
    if (d == 0 && /[+−]/.test(t[i]) && !add) add = t[i];
    if (d == 0 && /[×÷]/.test(t[i]) && add) k = i;
  }
  if (k < 0 || !Number.isInteger(ltr) || ltr < 0) return null;
  const side = (i, s) => { // the number or the bracket next to the operation at i, on side s (-1 or 1)
    let e = i + s;
    if (t[e] == (s < 0 ? ')' : '(')) for (let n = 0; ; e += s) { n += t[e] == '(' ? s : t[e] == ')' ? -s : 0; if (!n) break; }
    return t.slice(Math.min(i + s, e), Math.max(i + s, e) + 1).join(' ').replace(/\( /g, '(').replace(/ \)/g, ')');
  };
  return {[String(ltr)]: `${t[k] == '×' ? 'Multiply' : 'Divide'} before you ${add == '+' ? 'add' : 'subtract'}: ${side(k, -1)} ${t[k]} ${side(k, 1)} first.`};
}
// es_art 1, 2: el or la (un or una) by the ending; a plural needs los or las and a plural ending too
function k2WhyArt(q) {
  if (typeof ES_GRAM == 'undefined') return null;
  let m;
  if ((m = /^(los|las) (\S+) \(plural\)$/.exec(q.label))) {
    const n = ES_GRAM.nouns.find(x => x[4] == m[2]), w = {};
    if (!n) return null;
    w[`${m[1] == 'los' ? 'las' : 'los'} ${m[2]}`] = `${n[0]} is an ${n[3]} word, so more than one takes ${m[1]}.`;
    for (const c of q.choices) if (c.v !== q.ans && c.v.startsWith(m[1] + ' ')) w[c.v] = c.v == `${m[1]} ${n[0]}` ? 'More than one: the word needs a new ending too.'
      : /[aeiouáéíóú]$/.test(n[0]) ? `${n[0]} ends in a vowel: just add -s.` : `${n[0]} ends in a consonant: add -es.`;
    return w;
  }
  if ((m = /^(el|la|un|una) (\S+[oa])$/.exec(q.label))) {
    const e = m[2].slice(-1);
    return {[{el: 'la', la: 'el', un: 'una', una: 'un'}[m[1]]]: `${m[2]} ends in -${e}. Most -${e} words take ${m[1]}.`};
  }
  return null;
}
const K2WHY = {
  sub: {4: k2WhySub, 5: k2WhySub, 6: k2WhySub},
  big: {3: k2WhyAdd, 4: k2WhyAdd, 5: k2WhyAdd},
  miss: {1: k2WhyMiss, 2: k2WhyMiss},
  tenf: {2: k2WhyMiss},
  pv: {1: k2WhyPv, 2: k2WhyPv},
  frac: {4: k2WhyFrac, 6: k2WhyFrac},
  fop: {1: k2WhyFop, 3: k2WhyFop},
  dec: {2: k2WhyDec},
  round: {1: k2WhyRound, 2: k2WhyRound, 3: k2WhyRound, 4: k2WhyRound},
  ooo: {1: k2WhyOoo},
  es_art: {1: k2WhyArt, 2: k2WhyArt},
};
function k2WhyWrap(sk, g) {
  return lv => {
    const q = g(lv), f = K2WHY[sk] && K2WHY[sk][lv];
    if (!f || K2.off || !q || !['num', 'choice', 'line'].includes(q.kind)) return q;
    const w = f(q, lv);
    return w ? k2WhySet(q, w) : q;
  };
}
for (const sk in K2WHY) if (SK[sk] && sk != 'es_art') SK[sk].gen = k2WhyWrap(sk, SK[sk].gen);
if (typeof genEsArt == 'function') genEsArt = k2WhyWrap('es_art', genEsArt);
// the why of a value v given to q (null when it has none)
function k2WhyOf(q, v) {
  if (!q || !q.why || v == null || K2.off) return null;
  const K = KIND[q.kind];
  for (const k in q.why) if (K.same ? K.same(Object.assign({}, q, {ans: k}), v) : String(v) === k) return {q, s: q.why[k], w: (q.whySay && q.whySay[k]) || q.why[k]};
  return null;
}
// what kindProblems (49-kinds.js) also finds in q.why: tools/test.js checks every generated question with it
function k2WhyProblems(q) {
  if (!q.why || typeof q.why != 'object' || Array.isArray(q.why)) return ['why: must be an object of value -> sentence'];
  const p = [], K = KIND[q.kind];
  if (!['num', 'choice', 'line'].includes(q.kind)) p.push('why: only num, choice and line questions have it');
  for (const k in q.why) {
    const t = q.why[k];
    if (typeof t != 'string' || !t.trim() || t.length > 90) p.push('why ' + k + ': the sentence is empty or over 90 characters');
    else if (t.split(/[^A-Za-z]+/).some(x => BAD.test(x.toLowerCase()))) p.push('why ' + k + ': a word is not kid-safe');
    if (K && (K.same ? K.same(q, k) : k === String(q.ans))) p.push('why ' + k + ': the key is a right answer');
    if (q.kind == 'choice' && Array.isArray(q.choices) && !q.choices.some(c => String(c.v) === k)) p.push('why ' + k + ': not one of the choices');
    if (q.whySay && q.whySay[k] != null && (typeof q.whySay[k] != 'string' || !q.whySay[k].trim())) p.push('why ' + k + ': whySay is empty');
  }
  return p;
}
// the round engine (index.html: check in 50-round.js, hintHTML in 39-hints.js, kindProblems in 49-kinds.js) is wrapped from here, as
// es_art's generator is above: index.html has no room (spec 0.2). check notes the why of a first wrong answer (G.why) and says it;
// hintHTML puts it above the hint while that question is on its second try.
if (typeof kindProblems == 'function') {
  const k2KindProblems = kindProblems;
  kindProblems = q => {
    const p = k2KindProblems(q);
    return q && q.why != null ? p.concat(k2WhyProblems(q)) : p;
  };
}
if (typeof check == 'function') {
  const k2Check = check;
  check = function (v, el) {
    const q = G && G.q, first = !!q && !G.lock && G.tries == 0;
    if (first) G.why = mastTag(q) == 'ch' ? null : k2WhyOf(q, v);
    k2Check(v, el);
    if (first && G.why && G.q === q && G.tries == 1 && (gradeOf() <= 1 || S.voice)) {
      const w = G.why.w;
      setTimeout(() => { if (G && G.q === q && G.tries == 1) say(w, null, null, 1); }, 250); // after the hint's own words (said at 150 ms)
    }
  };
}
if (typeof hintHTML == 'function') {
  const k2Hint = hintHTML;
  hintHTML = q => {
    const h = k2Hint(q), w = typeof G != 'undefined' && G && G.why;
    return w && w.q === q && G.tries > 0 ? `<div class="why">${ico('hint', 22)}<span>${esc(w.s)}</span></div>${h}` : h;
  };
}
