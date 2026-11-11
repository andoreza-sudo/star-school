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
  };
};
