// Sample questions for the P1-03 kinds (no generator makes them yet; P2 chunks will).
// Shared by tools/test.js (validate), tools/shots.js (screens) and tools/smoke.js (bot plays them).
// make() runs INSIDE the app (it uses SLOT, SLOT_FRAC, ... from the page), so it must only use app globals.
// alt: another way to type a right answer (num with eq 'value'); the bot uses it when present.
exports.make = () => {
  const base = { sk: 'zz_demo', lv: 1 };
  return {
    dec: { ...base, kind: 'num', pad: 'dec', label: 'zz:dec', html: `<div>0.5 + 0.25 = ${SLOT}</div>`, ans: '0.75', say: 'Zero point five plus zero point two five' },
    neg: { ...base, kind: 'num', pad: 'neg', label: 'zz:neg', html: `<div>3 − 8 = ${SLOT}</div>`, ans: '-5', say: 'Three minus eight' },
    frac: { ...base, kind: 'num', pad: 'frac', eq: 'value', alt: '6/8', label: 'zz:frac', html: `<div>3 out of 4 parts: ${SLOT_FRAC}</div>`, ans: '3/4', say: 'Three out of four parts' },
    rem: { ...base, kind: 'num', sep: 'R', label: 'zz:rem', html: `<div>47 ÷ 5 = ${SLOT_R}</div>`, ans: '9R2', say: 'Forty seven divided by five' },
    mix: { ...base, kind: 'num', pad: 'frac', sep: 'mix', label: 'zz:mix', html: `<div>7/3 = ${SLOT_MIX}</div>`, ans: '2 1/3', say: 'Seven thirds as a mixed number' },
    half: { ...base, kind: 'num', pad: 'dec', eq: 'value', alt: '.50', label: 'zz:half', html: `<div>One half as a decimal: ${SLOT}</div>`, ans: '0.5', say: 'One half as a decimal' },
    big: { ...base, kind: 'num', max: 6, label: 'zz:big', html: `<div>123 × 456 = ${SLOT}</div>`, ans: '56088', say: 'One twenty three times four fifty six' },
    multi: { ...base, kind: 'multi', label: 'zz:multi', html: '<div>Tap all the even numbers</div>', say: 'Tap all the even numbers',
      choices: ['7', '2', '9', '4', '3', '8'].map(v => ({ v, l: v })), ans: ['2', '4', '8'] },
    multiw: { ...base, kind: 'multi', label: 'zz:multiw', html: '<div>Which of these are animals?</div>', say: 'Which of these are animals?',
      choices: ['Cat', 'Cup', 'Dog', 'Car', 'Hen'].map(v => ({ v, l: v })), ans: ['Cat', 'Dog', 'Hen'] },
    order: { ...base, kind: 'order', label: 'zz:order', html: '<div>Put the numbers in order, smallest first</div>', say: 'Put the numbers in order, smallest first',
      items: ['7', '2', '9', '4'].map(v => ({ v, l: v })), ans: ['2', '4', '7', '9'] },
    words: { ...base, kind: 'order', label: 'zz:words', html: '<div>Make a sentence</div>', say: 'Make a sentence',
      items: ['sat', 'blue', 'The', 'down', 'cat'].map(v => ({ v, l: v })), ans: ['The', 'cat', 'sat', 'down'] },
    // KINDS2 batch A (docs/KINDS2-SPEC.md 2.1, 2.2): two of each new kind
    sort: { ...base, kind: 'sort', label: 'zz:sort', html: '<div>Sort the numbers: even or odd?</div>', say: 'Sort the numbers: even or odd?',
      bins: [{ v: 'even', l: 'Even' }, { v: 'odd', l: 'Odd' }], hint: { k: 'text', s: 'Look at the last digit.' },
      items: [['7', 'odd'], ['4', 'even'], ['12', 'even'], ['9', 'odd'], ['8', 'even']].map(([v, b]) => ({ v, l: v, b })), ans: 'odd|even|even|odd|even' },
    sort3: { ...base, kind: 'sort', label: 'zz:sort3', html: '<div>Solid, liquid or gas?</div>', say: 'Sort them: solid, liquid or gas.',
      bins: [{ v: 'solid', l: 'Solid' }, { v: 'liquid', l: 'Liquid' }, { v: 'gas', l: 'Gas' }], hint: { k: 'text', s: 'Does it keep its shape?' },
      items: [['rock', 'solid'], ['milk', 'liquid'], ['steam', 'gas'], ['ice', 'solid'], ['juice', 'liquid'], ['air', 'gas']].map(([v, b]) => ({ v, l: v, b })),
      ans: 'solid|liquid|gas|solid|liquid|gas' },
    mark: { ...base, kind: 'mark', label: 'zz:mark', html: '<div class="bq">Tap the verb.</div>', say: 'Tap the verb.', one: true,
      words: ['The', 'tiny', 'frog', 'hops.'], ans: ['3'], hint: { k: 'text', s: 'A verb is an action word.' } },
    markm: { ...base, kind: 'mark', label: 'zz:markm', html: '<div class="bq">Tap the two nouns.</div>', say: 'Tap the two nouns.',
      words: ['My', 'dog', 'runs', 'in', 'the', 'park.'], ans: ['1', '5'], hint: { k: 'text', s: 'A noun names a person, place or thing.' } },
    // KINDS2-B (docs/KINDS2-SPEC.md 2.3): the line kind, whole numbers and fourths
    line: { ...base, kind: 'line', label: 'zz:line', html: '<div class="sub">Put the pin on 7.</div>', say: 'Put the pin on 7.',
      line: { min: 0, max: 10, step: 1, labels: 'all' }, snap: 1, ans: '7', start: '0', ansSay: '7', hint: { k: 'text', s: 'Count the steps from 0.' } },
    linef: { ...base, kind: 'line', label: 'zz:linef', html: '<div class="sub">Put the pin on three fourths.</div>', say: 'Put the pin on 3 fourths.',
      line: { min: 0, max: 1, step: 0.25, den: 4, labels: [0, 1] }, snap: 0.25, ans: '3/4', start: '0', ansSay: '3 fourths',
      hint: { k: 'text', s: 'The line is cut into 4 equal jumps.' } },
  };
};
// KINDS2: broken samples of the new kinds; each must fail validate (tools/test.js "kinds A"). S: the samples of make()
exports.broken = S => {
  return {
    'sort: a bin with no item': { ...S.sort, items: S.sort.items.map(c => ({ ...c, b: 'even' })), ans: 'even|even|even|even|even' },
    'sort: 12 items': { ...S.sort, items: Array.from({ length: 12 }, (_, i) => ({ v: String(i), l: String(i), b: i % 2 ? 'odd' : 'even' })),
      ans: Array.from({ length: 12 }, (_, i) => i % 2 ? 'odd' : 'even').join('|') },
    'mark: index out of range': { ...S.mark, ans: ['9'] },
    'mark: two answers with one': { ...S.markm, one: true },
    // KINDS2-B
    'line: 12 stops': { ...S.line, line: { min: 0, max: 11, step: 1, labels: 'all' }, ans: '7' },
    'line: the answer is not a stop': { ...S.linef, ans: '1/3' },
  };
};
// KINDS2-B: runs IN the page (smoke, a11y and shots tap with it).
// linePt(k): the screen point of stop k of the line question on screen (the answer's stop when k is null), low on the band, under the
// pin's own hit area
exports.linePt = k => {
  const q = G.q, sv = document.querySelector('.lnw svg'), r = sv.getBoundingClientRect(), vb = sv.viewBox.baseVal;
  const n = Math.round((q.line.max - q.line.min) / q.snap), x0 = +sv.dataset.x0, x1 = +sv.dataset.x1;
  if (k == null) k = Math.round((k2Val(q.ans) - q.line.min) / q.snap);
  const b = sv.querySelector('.vband').getBoundingClientRect();
  return { x: r.left + (x0 + k / n * (x1 - x0)) * r.width / vb.width, y: b.top + b.height * 0.8, k, n };
};
