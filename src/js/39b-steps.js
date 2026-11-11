/* ---------- P2-08 step-by-step hints: step builders and vertical layouts (CURRICULUM M-hints) ----------
   A step hint is {k: 'steps', steps: [{html, say, c}], w}. hintHTML (39-hints.js) shows one step at a time; each tap on Help
   (it reads "Next step" while steps remain) shows the next one. The last step never shows the answer: it shows the last
   small computation with a "?" ("Hundreds: 1 + 4 + 2 = ?").
   Builders (each returns the whole hint object, so a generator writes  hint: stepsAdd(a, b)):
     stepsAdd(a, b, ...)             column addition with carries; 2 or more addends; decimals line up on the point ('3.4', '12.75')
     stepsSub(a, b)                  column subtraction with regrouping marks (across zeros too); a >= b; decimals as above
     stepsMul(a, b, how)             'pp' partial products (the default up to 3 x 2 digits) or 'std' standard algorithm with carries
     stepsDiv(a, b)                  long division: divide, multiply and subtract, bring down; the remainder is the last step
     stepsEquivFrac(n, d, n2, d2)    n/d = n2/d2 with one of n2, d2 null (the unknown): the same number on the top and the bottom
     stepsCommonDen(a, b, c, d, op)  a/b op c/d, op '+', '-' or 'cmp': a common bottom, rename both, then add, subtract or compare
     stepsStory(list)                text-only steps (strings, or {s, say}) for word problems and other multi-step hints
   Prompt layouts that match the boards: ST.vert(nums, op, slot) (stacked, points lined up) and ST.ldiv(a, b, slot).
   Each step carries c, a record of the computation it shows ({op, x, r, ...}; r is null in the last step), so tools/test.js
   can check every number and that the steps lead to the answer. stepsMul and stepsDiv take whole numbers. */

const ST = {
  NAME: {'-3': 'thousandths', '-2': 'hundredths', '-1': 'tenths', 0: 'ones', 1: 'tens', 2: 'hundreds', 3: 'thousands',
    4: 'ten thousands', 5: 'hundred thousands', 6: 'millions', 7: 'ten millions', 8: 'hundred millions'},
  ONE: {'-2': 'hundredth', '-1': 'tenth', 0: 'one', 1: 'ten', 2: 'hundred', 3: 'thousand', 4: 'ten thousand', 5: 'hundred thousand',
    6: 'million', 7: 'ten million'},
  cap: s => s.charAt(0).toUpperCase() + s.slice(1),
  // spoken form of a caption: symbols as words, "= ?" as "is what?"
  spk: s => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/ \+ /g, ' plus ').replace(/ − /g, ' minus ')
    .replace(/ × /g, ' times ').replace(/ ÷ /g, ' divided by ').replace(/ = \?/g, ' is what?').replace(/ = /g, ' is ')
    .replace(/(\d)\/(\d+)/g, '$1 over $2'),
  // a number or numeric string (decimals allowed) -> {i: whole-number digits, f: decimal digits}
  parse(x) {
    const s = String(x).trim();
    if (!/^\d+(\.\d+)?$/.test(s)) throw new Error('steps: not a number: ' + x);
    const [i, f = ''] = s.split('.');
    return {i: i.replace(/^0+(?=\d)/, ''), f};
  },
  // digit of a parsed number at the power of ten e, when the numbers share d decimal places; null when it has none there.
  // A missing decimal digit is a 0 written only to line up the points (ST.pad).
  dig(n, e, d) {
    if (e >= 0) return e < n.i.length ? +n.i[n.i.length - 1 - e] : null;
    const k = -e - 1;
    return k < n.f.length ? +n.f[k] : k < d ? 0 : null;
  },
  pad: (n, e) => e < 0 && -e - 1 >= n.f.length,
  scaled: (n, d) => +(n.i + n.f.padEnd(d, '0')), // the number times 10^d, as a whole number
  // "the 4", "the 4 and 5", "the 9, 9 and 4"
  list: a => 'the ' + (a.length < 2 ? a[0] : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]),
  digits: n => String(n).split('').map(Number),
  // a line row under the places hi..lo; op: the line also runs under the operator column
  line(hi, lo, op) {
    const c = {};
    for (let e = hi; e >= lo; e--) c[e] = true;
    return {k: 'ln', c, op: op ? 1 : 0};
  },
  // digits of a whole number as row cells, ones at place lo; k: class for every cell
  cells(n, lo = 0, k = '') {
    const c = {};
    ST.digits(n).reverse().forEach((v, i) => { c[lo + i] = {t: v, k}; });
    return c;
  },

  /* The work board: a grid of digit cells, one column per place from top down to -d, a narrow point column after the ones
     when d > 0, and an operator column on the left. rows: [{k, op, pt, c, ok}]; k 'cy' (small carries and regroup marks),
     'n' (digits) or 'ln' (a line under the places in c); c maps a power of ten to a cell, a string or {t, k, span}; ok: a class
     for the operator cell. Cell classes: on (used in this step), nw (written in this step), x (crossed out), pz (a 0 written to
     line up the points), ask (the "?" of the last step), src (a digit just brought down), sg (a minus sign). */
  board(top, d, rows, cls) {
    const es = [];
    for (let e = top; e >= -d; e--) {
      es.push(e);
      if (e == 0 && d) es.push('pt');
    }
    const tpl = 'auto ' + es.map(e => (e == 'pt' ? 'var(--hpt)' : 'var(--hsw)')).join(' ');
    let h = '';
    for (const r of rows) {
      // r.od: an older row that small screens hide; r.ct: the first row shown after hidden ones (39-steps.css)
      const k = r.k || 'n', kk = k + (r.od ? ' od' : '') + (r.ct ? ' ct' : '');
      h += `<i class="op ${kk}${k == 'ln' && !r.op ? ' l0' : ''}${r.ok ? ' ' + r.ok : ''}">${k == 'ln' ? '' : r.op || ''}</i>`;
      for (let j = 0; j < es.length; j++) {
        const e = es[j];
        if (k == 'ln') {
          const on = e == 'pt' ? r.c[0] && r.c[-1] : r.c[e];
          h += `<i class="${kk}${on ? '' : ' l0'}${on && on.k ? ' ' + on.k : ''}"></i>`;
        } else if (e == 'pt') {
          h += `<i class="pt ${kk}">${r.pt ? '.' : ''}</i>`;
        } else if (r.c[e] == null || r.c[e] === '') {
          h += `<i class="${kk}"></i>`;
        } else {
          const cell = typeof r.c[e] == 'object' ? r.c[e] : {t: r.c[e]};
          const span = cell.span > 1 ? ` style="grid-column:span ${cell.span}"` : '';
          h += `<i class="${kk}${cell.k ? ' ' + cell.k : ''}"${span}>${cell.t}</i>`;
          if (cell.span > 1) j += cell.span - 1; // the cell covers the next column too
        }
      }
    }
    return `<div class="hsb${cls ? ' ' + cls : ''}" style="grid-template-columns:${tpl}">${h}</div>`;
  },
  // one step: the board, a caption (head in bold), the spoken text and the computation record
  step(board, head, text, c, say) {
    const cap = `<p class="hsc">${head ? `<b>${head}</b> ` : ''}${text.replace(/ = \?/g, '&nbsp;=&nbsp;?')}</p>`; // "= ?" never splits over two lines
    return {html: (board || '') + cap, say: say || ST.spk((head ? head + ' ' : '') + text), c};
  },
  // the hint object; w = columns of the widest board (the panel puts a narrow board beside its caption)
  hint: (steps, w) => ({k: 'steps', steps, w}),

  /* Prompt layouts (use them for the question's html so the prompt looks like the hint's board) */
  // stacked numbers, points lined up (hidden zeros keep the columns); op '+', '−' or '×'; slot: the answer box (SLOT by default)
  vert(nums, op, slot) {
    const ns = nums.map(ST.parse), d = Math.max(...ns.map(n => n.f.length));
    const rows = ns.map((n, i) => {
      const miss = d - n.f.length;
      const ghost = miss ? `<span class="gh">${n.f.length ? '' : '.'}${'0'.repeat(miss)}</span>` : '';
      const txt = n.i + (n.f.length ? '.' + n.f : '') + ghost;
      // the middle rows carry a hidden sign too, shown when an open step hint folds the prompt onto one line (39-steps.css)
      const sign = i == ns.length - 1 ? `<span class="op">${op}</span>` : i ? `<span class="op oh">${op}</span>` : '';
      return `<div>${sign}${txt}</div>`;
    });
    return `<div class="veq">${rows.join('')}<div class="bar"></div><div>${slot || SLOT}</div></div>`;
  },
  // long division: the answer box sits on the bracket, over the dividend
  ldiv(a, b, slot) {
    return `<div class="ldq"><span class="ldq-q">${slot || SLOT}</span><span class="ldq-b">${b}</span><span class="ldq-a">${a}</span></div>`;
  },
};

/* ---- column addition ---- */
function stepsAdd(...xs) {
  if (Array.isArray(xs[0])) xs = xs[0];
  if (xs.length < 2) throw new Error('stepsAdd: two or more numbers');
  const ns = xs.map(ST.parse), d = Math.max(...ns.map(n => n.f.length));
  const sum = ns.reduce((s, n) => s + ST.scaled(n, d), 0);
  const maxE = Math.max(...ns.map(n => n.i.length - 1));
  const top = Math.max(maxE, String(sum).length - 1 - d);
  // the columns, the smallest place first
  const cols = [];
  let carry = 0;
  for (let e = -d; e <= maxE; e++) {
    const terms = ns.map(n => ST.dig(n, e, d)).filter(x => x != null);
    const s = terms.reduce((a, b) => a + b, carry);
    cols.push({e, terms, cin: carry, s});
    carry = Math.floor(s / 10);
  }
  // the last column with something to add; the columns above it are only brought down
  let f = cols.length - 1;
  while (f > 0 && cols[f].terms.length < 2 && !cols[f].cin) f--;
  const above = cols.slice(f + 1);
  const up = above.slice().reverse().map(c => c.terms[0]);
  const upVal = above.reduce((s, c) => s + c.terms[0] * 10 ** (c.e + d), 0);
  const steps = [];
  for (let k = 0; k <= f; k++) {
    const col = cols[k], last = k == f, e = col.e;
    // carries: those written before this step, and this column's own (new) unless it is the last step
    const cy = {k: 'cy', c: {}};
    for (let j = 0; j < k; j++) {
      const co = Math.floor(cols[j].s / 10);
      if (co) cy.c[cols[j].e + 1] = {t: co, k: cols[j].e + 1 == e ? 'on' : ''};
    }
    if (!last && col.s >= 10) cy.c[e + 1] = {t: Math.floor(col.s / 10), k: 'nw'};
    const rows = [cy];
    ns.forEach((n, i) => {
      const r = {k: 'n', c: {}, pt: d > 0, op: i == ns.length - 1 ? '+' : ''};
      for (let x = -d; x <= maxE; x++) {
        const v = ST.dig(n, x, d);
        if (v != null) r.c[x] = {t: v, k: (ST.pad(n, x) ? 'pz' : '') + (x == e ? ' on' : '')};
      }
      rows.push(r);
    });
    rows.push(ST.line(top, -d, true));
    const res = {k: 'n', c: {}, pt: d > 0};
    for (let j = 0; j < k; j++) res.c[cols[j].e] = cols[j].s % 10;
    const terms = (col.cin ? [col.cin] : []).concat(col.terms);
    let text;
    if (last) {
      // a two-digit sum in the top column fills two places
      res.c[col.s >= 10 ? e + 1 : e] = {t: '?', k: 'ask', span: col.s >= 10 ? 2 : 1};
      text = `${terms.join(' + ')} = ?`;
      if (up.length) text += ` Then bring down ${ST.list(up)}.`;
    } else {
      res.c[e] = {t: col.s % 10, k: 'nw'};
      if (terms.length < 2) text = `Write the ${terms[0]}.`;
      else if (col.s >= 10) text = `${terms.join(' + ')} = ${col.s}. Write ${col.s % 10}, carry ${Math.floor(col.s / 10)}.`;
      else text = `${terms.join(' + ')} = ${col.s}. Write ${col.s}.`;
    }
    rows.push(res);
    const c = {op: '+', x: terms, r: last ? null : col.s, e, cin: col.cin};
    if (last) Object.assign(c, {up: upVal, d});
    steps.push(ST.step(ST.board(top, d, rows), ST.cap(ST.NAME[e]) + ':', text, c));
  }
  return ST.hint(steps, top + d + 2);
}

/* ---- column subtraction with regrouping ---- */
function stepsSub(a, b) {
  const A = ST.parse(a), B = ST.parse(b), d = Math.max(A.f.length, B.f.length);
  if (ST.scaled(A, d) < ST.scaled(B, d)) throw new Error('stepsSub: a must be at least b');
  const top = A.i.length - 1;
  const cur = {}, orig = {}, mark = {}, crossed = {};
  for (let e = -d; e <= top; e++) cur[e] = orig[e] = ST.dig(A, e, d);
  let f = -d; // the highest place where b has a digit: the last subtraction
  for (let e = -d; e <= top; e++) if (ST.dig(B, e, d) != null) f = e;
  const steps = [], res = {}, fresh = new Set();
  // the board as it stands; focus: the place of this step; ask: the place of the last step's "?"
  const draw = (focus, ask) => {
    const cy = {k: 'cy', c: {}}, ra = {k: 'n', c: {}, pt: d > 0}, rb = {k: 'n', c: {}, pt: d > 0, op: '−'}, rr = {k: 'n', c: {}, pt: d > 0};
    for (let e = -d; e <= top; e++) {
      const nw = fresh.has(e) ? ' nw' : '';
      if (mark[e] != null && !(e == top && mark[e] === 0)) cy.c[e] = {t: mark[e], k: nw + (focus == e ? ' on' : '')};
      ra.c[e] = {t: orig[e], k: (crossed[e] ? 'x' + nw : '') + (ST.pad(A, e) ? ' pz' : '') + (focus == e && !crossed[e] ? ' on' : '')};
      const bd = ST.dig(B, e, d);
      if (bd != null) rb.c[e] = {t: bd, k: (ST.pad(B, e) ? 'pz' : '') + (focus == e ? ' on' : '')};
      if (res[e] != null) rr.c[e] = {t: res[e].t, k: res[e].nw ? 'nw' : ''};
    }
    if (ask != null) rr.c[ask] = {t: '?', k: 'ask'};
    return ST.board(top, d, [cy, ra, rb, ST.line(top, -d, true), rr]);
  };
  for (let e = -d; e <= f; e++) {
    const bv = ST.dig(B, e, d) || 0, head = ST.cap(ST.NAME[e]) + ':';
    for (const k in res) res[k].nw = false;
    if (cur[e] < bv) {
      // regroup from the nearest place on the left that is not 0; the zeros on the way become 9s
      let j = e + 1;
      while (cur[j] === 0) j++;
      const from = cur[e], jFrom = cur[j], zeros = j - e - 1;
      fresh.clear();
      cur[j]--;
      for (let z = e + 1; z < j; z++) cur[z] = 9;
      cur[e] += 10;
      for (let z = e; z <= j; z++) {
        mark[z] = cur[z];
        crossed[z] = true;
        fresh.add(z);
      }
      // the caption stays short (the marks show the rest); the spoken text tells the whole move
      const nines = zeros > 1 ? 'the zeros become 9s' : 'the zero becomes 9';
      const text = zeros ? `${from} is less than ${bv}. Regroup from the ${ST.NAME[j]}. Now ${cur[e]} ${ST.NAME[e]}.`
        : `${from} is less than ${bv}. Regroup 1 ${ST.ONE[j]}. Now ${cur[e]} ${ST.NAME[e]}.`;
      const said = zeros ? `${head} ${from} is less than ${bv}, so we regroup from the ${ST.NAME[j]}. ${jFrom} becomes ${cur[j]}, ${nines},`
        + ` and ${from} becomes ${cur[e]}.` : `${head} ${from} is less than ${bv}, so we regroup 1 ${ST.ONE[j]}. ${jFrom} becomes ${cur[j]},`
        + ` and ${from} becomes ${cur[e]}.`;
      steps.push(ST.step(draw(e), head, text, {op: 'rg', x: [from, bv], r: cur[e], e, j, from, to: cur[e], jFrom, jTo: cur[j], b: bv}, said));
    }
    fresh.clear();
    const r = cur[e] - bv;
    if (e == f) {
      // the places above are only brought down (no leading zeros)
      const up = [];
      let upVal = 0;
      for (let u = top; u > f; u--) {
        if (!up.length && cur[u] === 0) continue;
        up.push(cur[u]);
        upVal += cur[u] * 10 ** (u + d);
      }
      let text = `${cur[e]} − ${bv} = ?`;
      if (up.length) text += ` Then bring down ${ST.list(up)}.`;
      steps.push(ST.step(draw(e, e), head, text, {op: '−', x: [cur[e], bv], r: null, e, up: upVal, d}));
    } else {
      res[e] = {t: r, nw: true};
      steps.push(ST.step(draw(e), head, `${cur[e]} − ${bv} = ${r}.`, {op: '−', x: [cur[e], bv], r, e}));
    }
  }
  return ST.hint(steps, top + d + 2);
}

/* ---- multiplication: partial products ('pp') or the standard algorithm ('std') ---- */
function stepsMul(a, b, how) {
  a = +a;
  b = +b;
  if (!(Number.isInteger(a) && Number.isInteger(b) && a >= 1 && b >= 1)) throw new Error('stepsMul: whole numbers from 1');
  const da = ST.digits(a).reverse(), db = ST.digits(b).reverse(); // ones first
  how = how || (da.length <= 3 && db.length <= 2 ? 'pp' : 'std');
  const top = String(a * b).length - 1;
  // a and b with the digits at places onA, onB marked as used in this step
  const ab = (onA = [], onB = []) => {
    const ra = {k: 'n', c: ST.cells(a)}, rb = {k: 'n', c: ST.cells(b), op: '×'};
    onA.forEach(e => { ra.c[e].k = 'on'; });
    onB.forEach(e => { rb.c[e].k = 'on'; });
    return [ra, rb, ST.line(top, 0, true)];
  };
  const fold = (rows, on) => rows.map(r => Object.assign(r, {od: on}));
  const steps = [];
  if (how == 'pp') {
    // every non-zero digit of b times every non-zero digit of a, each as its place value
    const parts = [];
    db.forEach((y, j) => {
      if (y) da.forEach((x, i) => { if (x) parts.push({i, j, x, y, ap: x * 10 ** i, bp: y * 10 ** j, p: x * 10 ** i * y * 10 ** j}); });
    });
    parts.forEach((p, k) => {
      const only = parts.length == 1;
      // from the fifth part on, small screens fold a and b away (the caption names the numbers)
      const rows = fold(ab([p.i], [p.j]), k >= 4);
      parts.slice(0, k).forEach((q, x) => rows.push({k: 'n', c: ST.cells(q.p), ct: k >= 4 && !x}));
      const lead = p.i + p.j > 0 ? `${p.y} × ${p.x} = ${p.x * p.y}, so ` : '';
      let text;
      if (only) {
        rows.push({k: 'n', c: {[String(p.p).length - 1]: {t: '?', k: 'ask'}}});
        text = `${lead}${p.bp} × ${p.ap} = ?`;
      } else {
        rows.push({k: 'n', c: ST.cells(p.p, 0, 'nw')});
        text = `${lead}${p.bp} × ${p.ap} = ${p.p}.`;
      }
      steps.push(ST.step(ST.board(top, 0, rows), 'Multiply:', text, {op: '×', x: [p.bp, p.ap], r: only ? null : p.p}));
    });
    if (parts.length > 1) {
      const rows = fold(ab(), parts.length >= 4);
      parts.forEach((q, x) => rows.push({k: 'n', c: ST.cells(q.p), ct: parts.length >= 4 && !x}));
      rows.push(ST.line(top, 0, true), {k: 'n', c: {[top]: {t: '?', k: 'ask'}}});
      const ps = parts.map(q => q.p);
      steps.push(ST.step(ST.board(top, 0, rows), 'Add the parts:', `${ps.join(' + ')} = ?`, {op: '+', x: ps, r: null}));
    }
    return ST.hint(steps, top + 2);
  }
  // standard: one row per digit of b (ones first): each digit of a times it, with carries; then add the rows
  const single = db.length == 1, done = [];
  const frame = (cy, onA, j, row) => [cy, ...ab(onA, [j]), ...done.map(c => ({k: 'n', c})), {k: 'n', c: row}];
  const plain = c => {
    const o = {};
    for (const e in c) o[e] = {t: c[e].t, k: ''};
    return o;
  };
  db.forEach((y, j) => {
    let row = {};
    const head = ST.cap(ST.NAME[j]) + ':';
    if (y == 0) {
      // a 0 in b: a row of zeros
      for (let e = 0; e < da.length + j; e++) row[e] = {t: 0, k: 'nw'};
      steps.push(ST.step(ST.board(top, 0, frame({k: 'cy', c: {}}, [], j, row)), head,
        `The ${ST.NAME[j]} digit is 0, so this row is all 0s.`, {op: '×', x: [0], r: 0, j}));
      done.push(plain(row));
      return;
    }
    if (j > 0) {
      // one placeholder 0 for each place already done
      for (let e = 0; e < j; e++) row[e] = {t: 0, k: 'nw'};
      const text = j == 1 ? `Now multiply by the ${y} in the tens. Write a 0 in the ones first.`
        : `Now multiply by the ${y} in the ${ST.NAME[j]}. Write ${j} zeros first.`;
      steps.push(ST.step(ST.board(top, 0, frame({k: 'cy', c: {}}, [], j, row)), head, text, {op: 'z', x: [y], r: 0, j}));
      row = plain(row);
    }
    let carry = 0;
    const cy = {k: 'cy', c: {}};
    da.forEach((x, i) => {
      for (const e in cy.c) cy.c[e].k = '';
      row = plain(row);
      if (carry) cy.c[i].k = 'on'; // carries sit above the digits of a
      const p = x * y, s = p + carry, e = i + j, lastDigit = i == da.length - 1;
      if (single && lastDigit) {
        // the last step: the last product (and its carry) with a "?"
        const ask = Object.assign({}, row, {[s >= 10 ? e + 1 : e]: {t: '?', k: 'ask', span: s >= 10 ? 2 : 1}});
        const text = carry ? `${y} × ${x} = ${p}. ${p} + ${carry} = ?` : `${y} × ${x} = ?`;
        steps.push(ST.step(ST.board(top, 0, frame(cy, [i], j, ask)), '', text, {op: '×', x: [y, x], p, cin: carry, r: null, e, i, j}));
        return;
      }
      let text = carry ? `${y} × ${x} = ${p}. ${p} + ${carry} = ${s}.` : `${y} × ${x} = ${p}.`;
      row[e] = {t: s % 10, k: 'nw'};
      if (lastDigit) {
        if (s >= 10) row[e + 1] = {t: Math.floor(s / 10), k: 'nw'};
        text += ` Write ${s}.`;
      } else if (s >= 10) {
        cy.c[i + 1] = {t: Math.floor(s / 10), k: 'nw'};
        text += ` Write ${s % 10}, carry ${Math.floor(s / 10)}.`;
      } else text += ` Write ${s}.`;
      steps.push(ST.step(ST.board(top, 0, frame(cy, [i], j, row)), '', text, {op: '×', x: [y, x], p, cin: carry, r: s, e, i, j}));
      carry = Math.floor(s / 10);
    });
    if (!single) done.push(plain(row));
  });
  if (!single) {
    const rows = [{k: 'cy', c: {}}, ...ab(), ...done.map(c => ({k: 'n', c})), ST.line(top, 0, true), {k: 'n', c: {[top]: {t: '?', k: 'ask'}}}];
    const rv = db.map((y, j) => a * y * 10 ** j);
    steps.push(ST.step(ST.board(top, 0, rows), 'Add the rows:', `${rv.join(' + ')} = ?`, {op: '+', x: rv, r: null}));
  }
  return ST.hint(steps, top + 2);
}

/* ---- long division: divide, multiply and subtract, bring down ---- */
function stepsDiv(a, b) {
  a = +a;
  b = +b;
  if (!(Number.isInteger(a) && Number.isInteger(b) && b >= 1 && a >= b)) throw new Error('stepsDiv: whole numbers, a >= b >= 1');
  const D = ST.digits(a), n = D.length, top = n - 1, eOf = k => n - 1 - k; // dividend digit k (from the left) sits at place eOf(k)
  // the rounds, worked out first; the first one takes digits until the number is at least b
  const rounds = [];
  let pos = 0, cur = D[pos++];
  while (cur < b) cur = cur * 10 + D[pos++];
  let bring = null;
  for (;;) {
    const qd = Math.floor(cur / b), prod = qd * b;
    rounds.push({end: pos - 1, cur, qd, prod, rem: cur - prod, bring});
    if (pos >= n) break;
    bring = D[pos];
    cur = (cur - prod) * 10 + D[pos++];
  }
  const last = rounds.length - 1, rem = rounds[last].rem;
  const say = s => ST.spk(s.replace(/How many (\d+)s fit/g, 'How many groups of $1 fit'));
  // the board: the quotient row, the bracket line, the dividend row, then per round the product, a line, and what is left
  const qRow = {k: 'n', c: {}, ok: 'qr'}, dRow = {k: 'n', c: ST.cells(a), op: b, ok: 'dd'};
  const below = [];
  let curRow = dRow; // the row holding the number being divided
  const clean = () => {
    for (const r of [qRow, dRow, ...below]) for (const e in r.c) if (r.c[e].k) r.c[e].k = r.c[e].k.replace(/\b(on|nw|src)\b/g, '').trim();
  };
  // small screens show only this round's rows and the row being divided; the older ones get od, the first row after them ct
  let now = 0;
  const snap = () => {
    let hid = false;
    for (const r of below) {
      r.od = r.ri !== now && r !== curRow;
      r.ct = hid && !r.od;
      hid = r.od;
    }
    return ST.board(top, 0, [qRow, Object.assign(ST.line(top, 0), {ok: 'vn'}), dRow, ...below], 'hsdiv');
  };
  const steps = [];
  rounds.forEach((r, ri) => {
    now = ri;
    clean();
    const at = eOf(r.end), isLast = ri == last;
    let head = '';
    if (r.bring != null) {
      head = `Bring down the ${r.bring}.`;
      curRow.c[at] = {t: r.bring, k: 'nw'};
      dRow.c[at].k = 'src';
    } else if (r.end > 0) head = `${D[0]} is less than ${b}, so use ${r.cur}.`;
    for (let i = 0; i < String(r.cur).length; i++) if (curRow.c[at + i]) curRow.c[at + i].k = (curRow.c[at + i].k + ' on').trim();
    if (isLast && rem == 0) {
      // the last step: the last quotient digit is the "?"
      qRow.c[at] = {t: '?', k: 'ask'};
      const text = `How many ${b}s fit in ${r.cur}?`;
      steps.push(ST.step(snap(), head, text, {op: '÷', x: [r.cur, b], r: null, e: at}, say(head + ' ' + text)));
      return;
    }
    qRow.c[at] = {t: r.qd, k: 'nw'};
    if (r.qd == 0) {
      // nothing to take away: the next digit comes down beside this one (or, at the end, the number left is the remainder)
      let text = `How many ${b}s fit in ${r.cur}? 0.`;
      if (isLast) {
        below.push({k: 'n', c: {[at]: {t: '?', k: 'ask'}}, ri});
        text += ` ${r.cur} − 0 = ? That is the remainder.`;
      } else text += ' Write 0.';
      const c = isLast ? {op: '−', x: [r.cur, 0], r: null, e: at, qd: 0} : {op: '÷', x: [r.cur, b], r: 0, e: at};
      steps.push(ST.step(snap(), head, text, c, say(head + ' ' + text)));
      return;
    }
    const t1 = `How many ${b}s fit in ${r.cur}? ${r.qd}.`;
    steps.push(ST.step(snap(), head, t1, {op: '÷', x: [r.cur, b], r: r.qd, e: at}, say(head + ' ' + t1)));
    // multiply and subtract
    clean();
    qRow.c[at].k = 'on';
    const pRow = {k: 'n', c: ST.cells(r.prod, at, 'nw')};
    const sign = at + String(r.prod).length;
    if (sign <= top) pRow.c[sign] = {t: '−', k: 'sg nw'};
    else pRow.op = '−';
    const width = Math.max(String(r.cur).length, String(r.prod).length);
    const ln = ST.line(at + width - 1, at);
    for (const e in ln.c) ln.c[e] = {k: 'nw'};
    const remRow = {k: 'n', c: isLast ? {[at]: {t: '?', k: 'ask'}} : ST.cells(r.rem, at, 'nw')};
    for (const x of [pRow, ln, remRow]) x.ri = ri;
    below.push(pRow, ln, remRow);
    const t2 = `${r.qd} × ${b} = ${r.prod}. ${r.cur} − ${r.prod} = ${isLast ? '? That is the remainder.' : r.rem + '.'}`;
    steps.push(ST.step(snap(), '', t2, {op: '−', x: [r.cur, r.prod], r: isLast ? null : r.rem, e: at, mul: [r.qd, b, r.prod]}));
    curRow = remRow;
  });
  return ST.hint(steps, top + 2);
}

/* ---- fractions ---- */
ST.gcd = (x, y) => (y ? ST.gcd(y, x % y) : x);
ST.lcm = (x, y) => (x / ST.gcd(x, y)) * y;
// a stacked fraction for the boards; kt, kb: classes of the top and bottom
ST.fr = (t, b, kt = '', kb = '') => `<span class="hfr"><i class="${kt}">${t}</i><i class="${kb}">${b}</i></span>`;

// n/d = n2/d2, one of n2, d2 null (the unknown): what the known bottom (or top) was multiplied or divided by, then the same to the other
function stepsEquivFrac(n, d, n2, d2) {
  const topKnown = n2 != null;
  if (topKnown == (d2 != null)) throw new Error('stepsEquivFrac: give exactly one of n2, d2');
  const x = topKnown ? n : d, y = topKnown ? n2 : d2, u = topKnown ? d : n; // known pair x -> y; u is changed the same way
  let op, k;
  if (y % x == 0) {
    op = '×';
    k = y / x;
  } else if (x % y == 0 && u % (x / y) == 0) {
    op = '÷';
    k = x / y;
  } else throw new Error('stepsEquivFrac: not a whole-number step');
  const lab = (show, nw) => `<span class="hk${show ? '' : ' l0'}${nw ? ' nw' : ''}">${show ? op + k + ico('go', 16) : ''}</span>`;
  // step 1: the known pair with its arrow; step 2: the other pair, "?" where the answer goes
  const board = two => {
    const f1 = topKnown ? ST.fr(n, d, two ? '' : 'on', two ? 'on' : '') : ST.fr(n, d, two ? 'on' : '', two ? '' : 'on');
    const f2 = topKnown ? ST.fr(n2, two ? '?' : '&nbsp;', two ? '' : 'on', two ? 'ask' : 'dm')
      : ST.fr(two ? '?' : '&nbsp;', d2, two ? 'ask' : 'dm', two ? '' : 'on');
    const arrows = topKnown ? lab(true, !two) + lab(two, two) : lab(two, two) + lab(true, !two);
    return `<div class="hsb hsf">${f1}<span class="har">${arrows}</span>${f2}</div>`;
  };
  const kn = topKnown ? 'Top' : 'Bottom', ot = topKnown ? 'Bottom' : 'Top';
  return ST.hint([
    ST.step(board(false), kn + ':', `${x} ${op} ${k} = ${y}.`, {op, x: [x, k], r: y}),
    ST.step(board(true), ot + ':', `Do the same. ${u} ${op} ${k} = ?`, {op, x: [u, k], r: null}),
  ], 4);
}

// a/b op c/d: the least common bottom, both fractions renamed, then the tops added, subtracted or compared
function stepsCommonDen(a, b, c, d, op) {
  op = op == '-' ? '−' : op || '+';
  const L = ST.lcm(b, d), big = Math.max(b, d), small = Math.min(b, d);
  const ka = L / b, kc = L / d, A = a * ka, C = c * kc, sym = op == 'cmp' ? '?' : op;
  // stage 0: the common bottom; 1: a/b renamed; 2: c/d renamed; 3: the last step
  const board = stage => {
    const s1 = stage == 1 ? 'on' : '', s2 = stage == 2 ? 'on' : '';
    const top = `<span class="hfl">${ST.fr(a, b, s1, s1)}<span class="hop">${sym}</span>${ST.fr(c, d, s2, s2)}</span>`;
    const one = stage >= 1 ? ST.fr(A, L, stage == 1 ? 'nw' : stage == 3 ? 'on' : '', stage == 1 ? 'nw' : '')
      : ST.fr('&nbsp;', L, 'dm', 'nw');
    const two = stage >= 2 ? ST.fr(C, L, stage == 2 ? 'nw' : stage == 3 ? 'on' : '', stage == 2 ? 'nw' : '')
      : ST.fr('&nbsp;', L, 'dm', stage == 0 ? 'nw' : '');
    const end = stage == 3 && op != 'cmp' ? `<span class="hop">=</span>${ST.fr('?', L, 'ask', '')}` : '';
    return `<div class="hsb hsf hsfs">${top}<span class="hfl"><span class="hop">=</span>${one}<span class="hop">${sym}</span>${two}${end}</span></div>`;
  };
  const mult = Array.from({length: L / big}, (_, i) => big * (i + 1));
  const steps = [ST.step(board(0), 'Same bottom:', b == d ? `Both bottoms are ${b} already.`
    : `Count by ${big}s: ${mult.join(', ')}. ${small} goes into ${L} too, so use ${L}.`, {op: 'lcm', x: [b, d], r: L})];
  if (ka > 1) steps.push(ST.step(board(1), `${a}/${b}:`, `${b} × ${ka} = ${L}, so ${a} × ${ka} = ${A}.`, {op: '×', x: [a, ka], r: A}));
  if (kc > 1) steps.push(ST.step(board(2), `${c}/${d}:`, `${d} × ${kc} = ${L}, so ${c} × ${kc} = ${C}.`, {op: '×', x: [c, kc], r: C}));
  const text = op == 'cmp' ? `Now compare the tops: ${A} and ${C}. Which is more?`
    : `Now ${op == '+' ? 'add' : 'subtract'} the tops: ${A} ${op} ${C} = ? Keep ${L} on the bottom.`;
  steps.push(ST.step(board(3), '', text, {op, x: [A, C], r: null, L}));
  return ST.hint(steps, 9);
}

/* ---- text-only steps ---- */
function stepsStory(list) {
  return ST.hint(list.map(s => {
    const t = typeof s == 'string' ? s : s.s;
    return {html: `<p class="hsc">${esc(t)}</p>`, say: (typeof s == 'object' && s.say) || t};
  }), 0);
}
