/* ---------- TEACH-2b: the workbench pieces the grade 1 and 2 lessons build on (part teach12, after teach; TEACH-PLAN-2 system B) ----------
   Added as keys of K2MM (49b-kinds2.js) from here, so Practice and its questions never change. Each draws cheap inline SVG with the
   VIZ classes (32-viz.css), and its controls are the make kind's stepper buttons (48 px, keyboard and touch tested).
     b10r    base-ten blocks with regrouping: up to 19 in a place, and two trade buttons a place: "10 ones -> 1 ten" (a ten made from
             ten ones) and "1 ten -> 10 ones" (a ten broken up). State: counts, biggest place first ([tens, ones] or
             [hundreds, tens, ones]); raw (the lesson gets the state, so a checker can ask for ones of 9 or fewer). A start state q.s0
             puts both numbers' blocks in (adding) or the number to take from (taking away).
     groups  equal groups: circles with dots in them, a stepper for the groups and one for how many in each. State [groups, in each]; raw.
     hands   the clock with its two hands named on their steppers ("Short hand: the hour", "Long hand: the minutes"), drawn bigger;
             the clock model's behaviour otherwise (the minutes carry the hour hand). Value 'h:mm', compared exactly.
   The coin purse (coins), the array and the ten frames are the make kind's own. Every model here also tells the lesson how to show
   an answer on it (of: value -> state) and which answers it can show (fits), for the pet's work in Check me. */
const lsPlace = ['hundreds', 'tens', 'ones'];
// blocks for counts s (biggest place first; a place may hold up to 19), the last o.b of each place in the second colour
function lsBlocks(s, o = {}) {
  const p = s.length == 3 ? 7 : 10, c = p - 1, S = 10 * p + 1, sg = Math.round(p / 2), G = 2 * p, P = 2, b2 = o.b || [];
  const L = s.length == 3 ? s : [0].concat(s), [H, T, U] = L, B2 = b2.length == 3 ? b2 : [0].concat(b2);
  let bg = '', bg2 = '', cells = '', x = P;
  const tall = Math.max(H ? Math.ceil(H / 3) * (S + p) - p : 0, T ? S : 0, U ? Math.min(U, 5) * (p + 1 + sg) - sg : 0, p + 1);
  const bot = P + tall, blk = (bx, by, bw, bh, two) => { const d = `M${bx} ${by}h${bw}v${bh}h${-bw}z`; if (two) bg2 += d; else bg += d; };
  for (let i = 0; i < H; i++) {
    const bx = x + (i % 3) * (S + p), by = bot - S - Math.floor(i / 3) * (S + p);
    blk(bx, by, S, S, i >= H - (B2[0] || 0));
    for (let r = 0; r < 10; r++) cells += `M${bx + 1} ${by + 1 + r * p + c / 2}h${10 * p}`;
  }
  if (H) x += Math.min(H, 3) * (S + p) - p + G;
  for (let i = 0; i < T; i++) {
    const bx = x + i * (p + 1 + sg) + Math.floor(i / 5) * p;
    blk(bx, bot - S, p + 1, S, i >= T - (B2[1] || 0));
    cells += `M${bx + 1 + c / 2} ${bot - S + 1}v${10 * p}`;
  }
  if (T) x += T * (p + 1 + sg) - sg + Math.floor((T - 1) / 5) * p + G;
  for (let i = 0; i < U; i++) {
    const bx = x + Math.floor(i / 5) * (p + 1 + sg), by = bot - (i % 5 + 1) * (p + 1) - (i % 5) * sg;
    blk(bx, by, p + 1, p + 1, i >= U - (B2[2] || 0));
    cells += `M${bx + 1} ${by + 1 + c / 2}h${p}`;
  }
  if (U) x += Math.ceil(U / 5) * (p + 1 + sg) - sg + G;
  const w = Math.max(x - G + P, 2 * P + p + 1), h = tall + 2 * P;
  const body = (bg ? `<path class="vb" d="${bg}"/>` : '') + (bg2 ? `<path class="ls-b2" d="${bg2}"/>` : '')
    + (cells ? `<path class="vc" stroke-width="${c}" stroke-dasharray="${c} 1" d="${cells}"/>` : '');
  return `<svg class="viz viz-b10" viewBox="0 0 ${w} ${h}" style="--vw:${w}" role="img" aria-label="base ten blocks">${body}</svg>`;
}
// a number's blocks as counts ([tens, ones] or [hundreds, tens, ones])
const lsDigits = (n, pl) => String(n).padStart(pl, '0').slice(-pl).split('').map(Number);
// equal groups: g circles of n dots (at most 5 circles a row)
function lsGroupsSvg(g, n) {
  const per = Math.min(g, 5), cols = n <= 4 ? 2 : n <= 9 ? 3 : 4, rows = Math.ceil(n / cols), d = 14, R = Math.max(cols, rows) * d / 2 + 9;
  const W = per * (2 * R + 8) + 4, H = Math.ceil(g / per) * (2 * R + 8) + 4;
  let ring = '', dots = '';
  for (let k = 0; k < g; k++) {
    const cx = 4 + (k % per) * (2 * R + 8) + R, cy = 4 + Math.floor(k / per) * (2 * R + 8) + R;
    ring += `<circle class="vo" cx="${cx}" cy="${cy}" r="${R}"/>`;
    for (let i = 0; i < n; i++) {
      const r = Math.floor(i / cols), inRow = Math.min(cols, n - r * cols), x = cx + (i % cols - (inRow - 1) / 2) * d, y = cy + (r - (rows - 1) / 2) * d;
      dots += `M${x} ${y}h.01`;
    }
  }
  return `<svg class="viz viz-grp" viewBox="0 0 ${W} ${H}" style="--vw:${W}" role="img" aria-label="equal groups">${ring}`
    + `<path class="ls-gd" stroke-width="11" stroke-linecap="round" d="${dots}"/></svg>`;
}
if (typeof K2MM != 'undefined') {
  const trade = (i, d, l) => `<button class="mmb ls-tr" data-i="${i}" data-d="${d}" aria-label="${l}">${esc(l)}</button>`;
  K2MM.b10r = {
    raw: true,
    s0: q => Array(q.m.places).fill(0),
    val: (q, s) => s.reduce((a, x) => a * 10 + x, 0),
    ans: q => lsDigits(q.ans, q.m.places),
    // i < places: a stepper (one block in or out, 0 to 19); i 10 + k: trade ten of place k for one of place k - 1 (d 1), or break one of
    // place k - 1 into ten of place k (d -1)
    step: (q, s, i, d) => {
      const o = s.slice();
      if (i < 10) { o[i] += d; return o[i] < 0 || o[i] > 19 ? null : o; }
      const k = i - 10;
      if (d > 0) { if (o[k] < 10 || o[k - 1] >= 19) return null; o[k] -= 10; o[k - 1]++; }
      else { if (o[k - 1] < 1 || o[k] > 9) return null; o[k - 1]--; o[k] += 10; }
      return o;
    },
    draw: (q, s) => lsBlocks(s),
    ctl: q => {
      const pl = q.m.places, n = lsPlace.slice(3 - pl), cap = w => w[0].toUpperCase() + w.slice(1);
      return `<div class="mmc mmcol">${n.map((l, i) => mmRow(cap(l), i, true)).join('')}<div class="mms ls-trs">`
        + n.slice(1).map((l, j) => trade(10 + j + 1, 1, `10 ${l} → 1 ${n[j].slice(0, -1)}`) + trade(10 + j + 1, -1, `1 ${n[j].slice(0, -1)} → 10 ${l}`)).join('') + '</div></div>';
    },
    of: (q, v) => lsDigits(v, q.m.places),
    fits: (q, v) => Number.isInteger(+v) && +v >= 0 && +v < Math.pow(10, q.m.places),
  };
  K2MM.groups = {
    raw: true,
    s0: () => [1, 1],
    val: (q, s) => s[0] * s[1],
    ans: q => [q.m.g, q.m.n],
    step: (q, s, i, d) => (s[i] + d < 1 || s[i] + d > (i ? 10 : 6) ? null : s.map((x, j) => (j == i ? x + d : x))),
    draw: (q, s) => lsGroupsSvg(s[0], s[1]),
    ctl: () => `<div class="mmc mmcol">${mmRow('Groups', 0, true)}${mmRow('In each', 1, true)}</div>`,
    of: (q, v) => [q.m.g, Math.round(+v / q.m.g)],
    fits: (q, v) => Number.isInteger(+v / q.m.g) && +v / q.m.g >= 1 && +v / q.m.g <= 10,
  };
  K2MM.hands = Object.assign({}, K2MM.clock, {
    draw: (q, s) => VIZ.clock(s[0], s[1]).replace(/--vw:[\d.]+/, '--vw:220'),
    ctl: q => `<div class="mmc mmcol">${mmRow('Short hand: hour', 0, false).replace('<span class="mml">', '<span class="mml"><i class="ls-hh" aria-hidden="true"></i>')}`
      + `${mmRow('Long hand: minutes', 1, false, q.m.one ? [1, 5] : [5]).replace('<span class="mml">', '<span class="mml"><i class="ls-mh" aria-hidden="true"></i>')}</div>`,
    of: (q, v) => String(v).split(':').map(Number),
    fits: (q, v) => { const m = /^(1[0-2]|[1-9]):([0-5]\d)$/.exec(String(v)); return !!m && (q.m.one || +m[2] % 5 == 0); },
  });
  K2MM.clock.of = K2MM.hands.of;
  K2MM.clock.fits = K2MM.hands.fits;
  K2MM.coins.of = (q, v) => mmGreedy(q.m.types, +v);
  K2MM.b10.of = (q, v) => lsDigits(v, q.m.places);
  K2MM.b10.fits = (q, v) => Number.isInteger(+v) && +v > 0 && +v < Math.pow(10, q.m.places);
  K2MM.coins.fits = (q, v) => Number.isInteger(+v) && +v > 0 && mmSum(mmGreedy(q.m.types, +v)) <= 12;
  // the hands model is the clock to the make kind's checks, its first-miss words and its spoken answer
  const asClock = q => (q && q.model == 'hands' ? Object.assign({}, q, {model: 'clock'}) : q), MK = KIND.make;
  const v0 = MK.validate, r0 = MK.retry, s0 = MK.spoken;
  MK.validate = q => v0(asClock(q));
  MK.spoken = q => s0(asClock(q));
  MK.retry = (q, st) => { r0(asClock(q), st); if (q.model == 'hands') MK.draw(q, st); };
}
// the checkers the new models use (LSGOAL, 52b-know.js): a raw state, or a value for the simulated children of tools/test.js
const lsVal = (q, v) => (Array.isArray(v) ? K2MM[q.model].val(q, v) : +v);
Object.assign(LSGOAL, {
  // the target with every place 9 or fewer (traded): 4 tens and 15 ones is 55, but not yet traded
  regroup: (q, v) => Array.isArray(v) && lsVal(q, v) == q.m.target && v.every(x => x <= 9),
  value: (q, v) => lsVal(q, v) == q.m.target,
  fewer: (q, v) => lsVal(q, v) < lsVal(q, q.s0) && lsVal(q, v) >= 0,
  groups: (q, v) => (Array.isArray(v) ? v[0] == q.m.g && v[1] == q.m.n : +v == q.m.g * q.m.n),
  eqgrp: (q, v) => (Array.isArray(v) ? v[0] >= 2 && v[1] >= 2 : +v >= 4),
  moved: (q, v) => String(Array.isArray(v) ? K2MM[q.model].val(q, v) : v) !== String(K2MM[q.model].val(q, K2MM[q.model].s0(q))),
});
