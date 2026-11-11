/* ---------- Pre-K math generators: world Tiny Town (P2-01; CURRICULUM M-PK) ----------
   Skills: pk_count 1-2, pk_num 1-2, pk_more 1, sort 1-2, shape 1, pat 1. Every question is audio-first (CURRICULUM 1.4):
   q.pk = true (the round engine speaks q.say on its own and draws a big replay button), the prompt is a picture, the answers are
   pictures or numerals, and any words on screen sit in an element with class "pktxt" (the debug flag html.notext hides them).
   Pictures of things go through picFor; coloured shapes are drawn here (tokens only, no hex). Randomness: rnd() helpers only.
   Later chunks (P2-02 K math) add levels to the same skill ids in this file. */
const PK = {
  // colours: [name spoken, token]. Shapes carry an outline, so colour is never the only cue where it is not the point.
  COL: [['red', '--danger'], ['blue', '--math'], ['green', '--good'], ['yellow', '--star'], ['purple', '--bt'], ['orange', '--play']],
  // counting things: [singular, plural, emoji fallback]
  OBJ: [['duck', 'ducks', '🦆'], ['apple', 'apples', '🍎'], ['star', 'stars', '⭐'], ['fish', 'fish', '🐟'], ['cookie', 'cookies', '🍪'],
    ['ball', 'balls', '⚽'], ['car', 'cars', '🚗'], ['balloon', 'balloons', '🎈'], ['flower', 'flowers', '🌸'], ['frog', 'frogs', '🐸']],
  NUM: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
  // outlines on a 40 x 40 grid, upright: name -> [points, closed polygon]
  SHP: {
    triangle: [[20, 4], [37, 35], [3, 35]],
    square: [[5, 5], [35, 5], [35, 35], [5, 35]],
    rectangle: [[2, 10], [38, 10], [38, 30], [2, 30]],
    diamond: [[20, 2], [37, 20], [20, 38], [3, 20]],
    star: [[20, 2], [25, 14], [38, 15], [28, 24], [31, 37], [20, 30], [9, 37], [12, 24], [2, 15], [15, 14]],
  },
  // one object, as picFor draws it; d = animation delay in seconds (hints that pulse one at a time)
  o(ob, d) { return `<span class="pko"${d == null ? '' : ` style="--d:${d}s"`}>${picFor(ob[0], ob[2])}</span>`; },
  row(n, ob, pulse) { return Array.from({ length: n }, (_, i) => PK.o(ob, pulse ? i * 0.8 : null)).join(''); },
  // n objects scattered over a 5 x 2 grid of cells (cells are wider than an object, so nothing overlaps), each nudged a little
  scatter(n, ob) {
    const cells = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, n).sort((a, b) => a - b);
    return `<div class="pkscat">${cells.map(c => {
      const dx = R(-5, 5), dy = R(-4, 4);
      return `<span class="pko" style="grid-column:${c % 5 + 1};grid-row:${(c / 5 | 0) + 1};transform:translate(${dx}px,${dy}px)">${picFor(ob[0], ob[2])}</span>`;
    }).join('')}</div>`;
  },
  // a coloured shape as an inline svg (40 x 40); ci = index in COL; name = circle or a key of SHP
  shp(name, ci) {
    const c = `style="--c:var(${PK.COL[ci][1]})"`;
    const body = name == 'circle' ? '<circle class="pkf" cx="20" cy="20" r="17"/>'
      : `<polygon class="pkf" points="${PK.SHP[name].map(p => p.join(',')).join(' ')}"/>`;
    return `<svg class="pks" viewBox="0 0 40 40" ${c} aria-hidden="true" focusable="false">${body}</svg>`;
  },
  // the sides of a shape, lighting one after another (the shape hint); circle has none
  sides(name) {
    const P = PK.SHP[name], n = P.length;
    const ls = P.map((p, i) => {
      const q = P[(i + 1) % n];
      return `<line class="pkside" style="--d:${(i * 0.8).toFixed(1)}s;--T:${(n * 0.8).toFixed(1)}s" x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}"/>`;
    }).join('');
    return `<svg class="pks pkbig" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><polygon class="pkf pkdim" points="${P.map(p => p.join(',')).join(' ')}"/>${ls}</svg>`;
  },
  // one bar of a given length in px (horizontal, a crayon) or n blocks stacked (a tower)
  bar(len, ci) {
    return `<svg class="pkbar" viewBox="0 0 ${len} 24" width="${len}" height="24" style="--c:var(${PK.COL[ci][1]})" aria-hidden="true" focusable="false">`
      + `<rect class="pkf" x="2" y="2" width="${len - 4}" height="20" rx="8"/></svg>`;
  },
  tower(n, ci) {
    let b = '';
    for (let i = 0; i < n; i++) b += `<rect class="pkf" x="2" y="${2 + (n - 1 - i) * 18}" width="36" height="16" rx="4"/>`;
    return `<svg class="pkbar" viewBox="0 0 40 ${n * 18 + 4}" width="40" height="${n * 18 + 4}" style="--c:var(${PK.COL[ci][1]})" aria-hidden="true" focusable="false">${b}</svg>`;
  },
  // a hint panel: html is trusted markup; w is spoken when it opens (never the only way to learn it)
  hint(html, w) { return { k: 'html', html, w }; },
  num: n => PK.NUM[n],
};
const pkTxt = t => `<div class="sub pktxt">${t}</div>`; // words on screen: hidden by html.notext
const pkEar = () => `<div class="pkear">${ico('speak', 56)}</div>`; // the picture for a listening task
const pkQ = o => Object.assign({ pk: true, auto: true }, o);
// numeral choices (strings, so answer and values compare strictly)
const pkNums = (n, ds) => shuffle([n, ...ds]).map(x => ({ l: String(x), v: String(x) }));

function genPkCount(lv) {
  const ob = pick(PK.OBJ), top = lv == 1 ? 5 : 10, n = R(1, top);
  let ds;
  if (lv == 1) {
    const a = pick([n - 1, n + 1].filter(x => x >= 1 && x <= 5));
    ds = [a, pick([1, 2, 3, 4, 5].filter(x => x != n && x != a))];
  } else {
    const a = pick([n - 1, n + 1].filter(x => x >= 1 && x <= 10));
    ds = [a, pick([n - 2, n + 2].filter(x => x >= 1 && x <= 10 && x != a))];
  }
  const words = Array.from({ length: n }, (_, i) => PK.num(i + 1)).join(', ');
  return pkQ({
    kind: 'choice', cls: 'syms', ans: String(n), choices: pkNums(n, ds),
    html: `<div class="pkq">${lv == 1 ? `<div class="pkrow">${PK.row(n, ob)}</div>` : PK.scatter(n, ob)}</div>${pkTxt(`How many ${ob[1]}?`)}`,
    say: `How many ${ob[1]}?`, after: `${PK.num(n)} ${n == 1 ? ob[0] : ob[1]}`,
    hint: PK.hint(`<div class="pkhint"><div class="pkrow pulse">${PK.row(n, ob, true)}</div></div>`, `Count with me. ${words}.`),
    label: `count ${n} ${ob[1]}${lv == 2 ? ' (scatter)' : ''}`,
  });
}

function genPkNum(lv) {
  const top = lv == 1 ? 5 : 10, n = R(0, top);
  const look = { 6: 9, 9: 6, 1: 7, 7: 1, 2: 5, 5: 2, 3: 8, 8: 3 }; // look-alike numerals
  const used = new Set([n]), ds = [];
  const add = x => { if (x >= 0 && x <= top && !used.has(x)) { used.add(x); ds.push(x); return true; } return false; };
  if (lv == 2 && look[n] != null) add(look[n]);
  while (ds.length < 2) {
    if (ds.length == 0 || coin()) { if (!add(pick([n - 1, n + 1]))) add(R(0, top)); } else add(R(0, top));
  }
  return pkQ({
    kind: 'choice', cls: 'syms', ans: String(n), choices: pkNums(n, ds), auto: 'must',
    html: `<div class="pkq">${pkEar()}</div>${pkTxt(`Tap the number ${PK.num(n)}.`)}`,
    say: `Tap the number ${PK.num(n)}.`,
    hint: n == 0
      ? PK.hint(`<div class="pkhint">${pkTxt('Zero means none. No dots at all!')}</div>`, 'Zero means none. No dots at all!')
      : PK.hint(`<div class="pkhint">${VIZ.dots(n, 'row')}</div>`, `Count the dots. ${Array.from({ length: n }, (_, i) => PK.num(i + 1)).join(', ')}.`),
    label: lv == 1 ? `tap ${n}` : `tap ${n} to ten`,
  });
}

// two groups, tap the one with more; the difference is at least 2
const PK_PLATES = [['plate', ['cookie', 'cookies', '🍪']], ['bowl', ['apple', 'apples', '🍎']], ['basket', ['ball', 'balls', '⚽']],
  ['pond', ['duck', 'ducks', '🦆']], ['box', ['car', 'cars', '🚗']]];
function genPkMore() {
  const [cn, ob] = pick(PK_PLATES);
  const hi = R(3, 5), lo = R(1, hi - 2), big = coin() ? 'l' : 'r';
  const [a, b] = big == 'l' ? [hi, lo] : [lo, hi];
  const plate = (n, v) => `<div class="pkplate" data-v="${v}" aria-label="${cn}"><div class="pkpl">${PK.row(n, ob)}</div></div>`;
  return pkQ({
    kind: 'tap', ans: big,
    html: `<div class="pkpair">${plate(a, 'l')}${plate(b, 'r')}</div>${pkTxt(`Which ${cn} has more ${ob[1]}?`)}`,
    say: `Which ${cn} has more ${ob[1]}?`, ansSay: 'This one has more.',
    hint: PK.hint(`<div class="pkhint"><div class="pkline">${PK.row(a, ob)}</div><div class="pkline">${PK.row(b, ob)}</div>${pkTxt('Line them up. Which row is longer?')}</div>`,
      'Line them up in two rows. Which row is longer?'),
    label: `more ${a} or ${b} ${ob[1]}`,
  });
}

// sort 1: three alike by colour or by shape, one different
function genSort1() {
  const byColour = coin(), SH = ['circle', 'square', 'triangle', 'star', 'diamond'];
  const sh = shuffle(SH), cs = shuffle([0, 1, 2, 3, 4, 5]);
  let items, odd; // items: [shape, colour index]
  if (byColour) {
    items = [[sh[0], cs[0]], [sh[1], cs[0]], [sh[2], cs[0]]]; // same colour, three different shapes
    odd = [pick(sh), cs[1]];
  } else {
    items = [[sh[0], cs[0]], [sh[0], cs[1]], [sh[0], cs[2]]]; // same shape, three different colours
    odd = [sh[1], pick(cs.slice(0, 5))];
  }
  const all = shuffle([...items.map(x => ({ x, odd: false })), { x: odd, odd: true }]);
  const oi = all.findIndex(a => a.odd);
  const cn = i => PK.COL[i][0];
  const label = byColour ? `odd ${cn(odd[1])} ${odd[0]} in ${cn(cs[0])}: ${items.map(i => i[0]).join(',')}`
    : `odd ${odd[0]} in ${items[0][0]}: ${items.map(i => cn(i[1])).join(',')}`;
  return pkQ({
    kind: 'choice', cls: 'pics pk4', ans: String(oi),
    choices: all.map((a, i) => ({ l: PK.shp(a.x[0], a.x[1]), v: String(i), h: true })),
    html: `<div class="pkq pkask">?</div>${pkTxt('Which one does not belong?')}`, say: 'Which one does not belong?',
    hint: PK.hint(`<div class="pkhint">${pkTxt(byColour ? 'Look at the colours.' : 'Look at the shapes.')}</div>`,
      byColour ? 'Look at the colours. Three are the same.' : 'Look at the shapes. Three are the same.'),
    label,
  });
}

// sort 2: biggest / smallest ball, longest / shortest crayon, tallest / shortest tower; 2 or 3 pictures
function genSort2() {
  const kind = pick(['size', 'length', 'height']), n = R(2, 3), top = coin();
  const ci = R(0, 5), pool = kind == 'size' ? [0.5, 0.75, 1, 1.35] : kind == 'length' ? [36, 62, 88, 114] : [1, 2, 3, 4];
  const vals = shuffle(pool).slice(0, n);
  const want = top ? Math.max(...vals) : Math.min(...vals);
  const ob = pick(PK.OBJ.filter(o => o[0] != 'fish'));
  const adj = kind == 'size' ? (top ? ['biggest', 'bigger'] : ['smallest', 'smaller'])
    : kind == 'length' ? (top ? ['longest', 'longer'] : ['shortest', 'shorter']) : (top ? ['tallest', 'taller'] : ['shortest', 'shorter']);
  const noun = kind == 'size' ? ob[0] : kind == 'length' ? 'crayon' : 'tower';
  const a = n == 2 ? adj[1] : adj[0], sayT = `Tap the ${a} ${noun}.`;
  const choices = vals.map((v, i) => ({
    v: String(i), h: true,
    l: kind == 'size' ? `<span class="pkcell"><span class="pkscale" style="font-size:${v}em">${picFor(ob[0], ob[2])}</span></span>`
      : kind == 'length' ? `<span class="pkcell pkleft">${PK.bar(v, ci)}</span>` : `<span class="pkcell">${PK.tower(v, ci)}</span>`,
  }));
  const HOW = {
    size: ['Look at all of them. Which one takes up the most room?', 'Look at all of them. Which one takes up the least room?'],
    length: ['Line them up on the left. Which one reaches farthest?', 'Line them up on the left. Which one stops first?'],
    height: ['Stand them on the floor. Which one reaches highest?', 'Stand them on the floor. Which one is lowest?'],
  };
  const how2 = HOW[kind][top ? 0 : 1];
  return pkQ({
    kind: 'choice', cls: `pics pk${n}${kind == 'length' ? ' pkcol' : ''}`, ans: String(vals.indexOf(want)), choices,
    html: `<div class="pkq pkask">?</div>${pkTxt(sayT)}`, say: sayT,
    hint: PK.hint(`<div class="pkhint">${pkTxt(how2)}</div>`, how2),
    label: `${a} ${noun} ${vals.join('/')}`,
  });
}
function genSort(lv) { return lv == 1 ? genSort1() : genSort2(); }

// shape 1: hear a shape name, tap it among 3 (random colours, upright)
function genPkShape() {
  const names = ['circle', 'square', 'triangle', 'rectangle'], sh = shuffle(names).slice(0, 3), ans = pick(sh);
  const cs = shuffle([0, 1, 2, 3, 4, 5]);
  const facts = { circle: 'A circle is round. It has no corners.', square: 'A square has 4 sides. They are all the same.',
    triangle: 'A triangle has 3 sides.', rectangle: 'A rectangle has 4 sides. Two are long and two are short.' };
  const hint = ans == 'circle' ? PK.hint(`<div class="pkhint">${PK.shp('circle', cs[0]).replace('class="pks"', 'class="pks pkbig"')}${pkTxt(facts[ans])}</div>`, facts[ans])
    : PK.hint(`<div class="pkhint">${PK.sides(ans)}${pkTxt(facts[ans])}</div>`, facts[ans]);
  return pkQ({
    kind: 'choice', cls: 'pics', ans, auto: 'must', choices: sh.map((s, i) => ({ l: PK.shp(s, cs[i]), v: s, h: true })),
    html: `<div class="pkq">${pkEar()}</div>${pkTxt(`Tap the ${ans}.`)}`, say: `Tap the ${ans}.`, hint, label: `tap the ${ans}`,
  });
}

// pat 1: an AB pattern of 5, pick the 6th (colours, or shapes in one colour)
function genPkPat() {
  const byColour = coin(), cs = shuffle([0, 1, 2, 3, 4, 5]), sh = shuffle(['circle', 'square', 'triangle', 'star', 'diamond']);
  const A = byColour ? { s: 'circle', c: cs[0] } : { s: sh[0], c: cs[0] };
  const B = byColour ? { s: 'circle', c: cs[1] } : { s: sh[1], c: cs[0] };
  const seq = [A, B, A, B, A], nm = x => byColour ? PK.COL[x.c][0] : x.s;
  const other = byColour ? { s: 'circle', c: cs[2] } : { s: sh[2], c: cs[0] };
  const n = R(2, 3), opts = shuffle(n == 2 ? [B, A] : [B, A, other]);
  const draw = x => PK.shp(x.s, x.c), names = seq.map(nm).join(', ');
  const chant = `${names}. What comes next?`;
  return pkQ({
    kind: 'choice', cls: `pics pk${n}`, ans: String(opts.indexOf(B)), choices: opts.map((x, i) => ({ l: draw(x), v: String(i), h: true })),
    html: `<div class="pkq pkpat">${seq.map(draw).join('')}<span class="pkunk">?</span></div>${pkTxt('What comes next?')}`, say: chant,
    hint: PK.hint(`<div class="pkhint"><div class="pkpat pulse">${seq.map((x, i) => `<span class="pko" style="--d:${i * 0.8}s">${draw(x)}</span>`).join('')}</div>`
      + `${pkTxt('Say it with me.')}</div>`, `${names}, what comes next?`),
    label: `pattern ${names}`,
  });
}

// ---- P2-02 Shape Garden (K) ----
/* Kindergarten math, world Shape Garden (CURRICULUM M-K). New levels of existing skills: pk_count 3, pk_num 3, pk_more 2, shape 2-3,
   add 4, pat 2, cnt 4, sort 3; new skills tenf 1-3, pos 1, meas 1. The SK table (38-skills.js) points at the *K wrappers below,
   which call the older generators for the levels that already existed. Same audio-first presentation as Tiny Town (pkQ, pkTxt,
   q.pk): pictures and numerals carry the question, words sit in .pktxt. Pictures of things go through picFor; shapes are VIZ.shape.
   Styles: src/css/31-sg.css. Randomness: rnd() helpers only. */
const SGN = n => (n <= 10 ? PK.NUM[n] : ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen',
  'nineteen', 'twenty'][n - 11]);
const sgEq = h => `<div class="eq">${h}</div>`;

// n objects in ten-frames (rows of 5): the first frame is a full ten; pulse = hint (the second frame counts on one at a time)
function sgFrames(n, ob, pulse) {
  const frame = (k, first) => `<div class="sgfr${first ? ' sgten' : ''}">${Array.from({ length: 10 }, (_, i) => `<span class="sgc">${
    i < k ? PK.o(ob, pulse ? (first ? 0 : i * 0.6 + 0.8) : null) : ''}</span>`).join('')}</div>`;
  return `<div class="sgfrs${pulse ? ' pulse' : ''}">${frame(10, 1)}${frame(n - 10, 0)}</div>`;
}
function genSgCount() {
  const ob = pick(PK.OBJ), n = R(11, 20), w = `One full ten and ${n - 10} more.`;
  return pkQ({
    kind: 'num', ans: String(n), html: `<div class="pkq">${sgFrames(n, ob)}</div>${pkTxt(`How many ${ob[1]}?`)}${sgEq(SLOT)}`,
    say: `How many ${ob[1]}?`, after: `${SGN(n)} ${ob[1]}`,
    hint: PK.hint(`<div class="pkhint">${sgFrames(n, ob, true)}${pkTxt(w)}</div>`, w),
    label: `count ${n} ${ob[1]} (frames)`,
  });
}

// pk_num 3: hear a number 11-20; look-alike numerals are the reversed number (12 / 21) and the "ty" number (13 / 30)
function genSgNum() {
  const n = R(11, 20), rev = +String(n).split('').reverse().join(''), pri = [];
  if (rev != n && rev >= 10) pri.push(rev);
  if (n >= 13 && n <= 19) pri.push((n - 10) * 10);
  if (n == 20) pri.push(12);
  if (n == 12) pri.push(20);
  const pool = shuffle([n - 1, n + 1, n - 2, n + 2, ...Array.from({ length: 10 }, (_, i) => 11 + i)]).filter(x => x >= 10 && x <= 20);
  const ds = [];
  for (const x of [...pri, ...pool]) if (x != n && !ds.includes(x) && ds.length < 3) ds.push(x);
  const w = `Count the dots. One full ten, and ${n - 10} more.`;
  return pkQ({
    kind: 'choice', cls: 'syms pk4', ans: String(n), choices: pkNums(n, ds), auto: 'must',
    html: `<div class="pkq">${pkEar()}</div>${pkTxt(`Tap the number ${SGN(n)}.`)}`, say: `Tap the number ${SGN(n)}.`,
    hint: PK.hint(`<div class="pkhint">${VIZ.dots(n, 'ten')}${pkTxt(w)}</div>`, w),
    label: `tap ${n} (teens)`,
  });
}

// pk_more 2: groups of 1-10; more, fewer (tap a plate) or "are they the same?" (15% of items; yes or no)
function genSgMore() {
  const [cn, ob] = pick(PK_PLATES), same = rnd() < 0.15, ask = same ? 'same' : coin() ? 'more' : 'fewer';
  let a = R(1, 10), b;
  if (same) b = rnd() < 2 / 3 ? a : (a == 10 || (a > 1 && coin()) ? a - 1 : a + 1);
  else { b = R(1, 10); if (b == a) b = a == 10 ? 9 : a + 1; }
  const plate = (n, v) => `<div class="pkplate sgpl" ${v ? `data-v="${v}" ` : ''}aria-label="${cn}"><div class="pkpl sgp10">${PK.row(n, ob)}</div></div>`;
  const pairs = Array.from({ length: Math.max(a, b) }, (_, i) => `<div class="sgpr${i >= Math.min(a, b) ? ' sgx' : ''}">`
    + `<span class="sgs">${i < a ? PK.o(ob) : ''}</span><span class="sgs">${i < b ? PK.o(ob) : ''}</span></div>`).join('');
  const w = a == b ? 'Pair them up. Nobody is left over, so they are the same.' : 'Pair them up, one with one. Who has some left over?';
  const hint = PK.hint(`<div class="pkhint"><div class="sgpairs">${pairs}</div>${pkTxt(w)}</div>`, w);
  const nm = ob[1], lab = `${ask} ${a} or ${b} ${nm}`;
  if (same) {
    return pkQ({
      kind: 'choice', cls: 'syms pk2', ans: a == b ? 'yes' : 'no', hint, label: lab,
      choices: [{ l: ico('check', 56), v: 'yes', h: true }, { l: ico('close', 56), v: 'no', h: true }],
      html: `<div class="pkpair">${plate(a)}${plate(b)}</div>${pkTxt('Do they have the same number?')}`, say: 'Do they have the same number?',
      after: a == b ? 'Yes, the same.' : 'No, not the same.',
    });
  }
  const win = (ask == 'more') == (a > b) ? 'l' : 'r';
  return pkQ({
    kind: 'tap', ans: win, hint, label: lab,
    html: `<div class="pkpair">${plate(a, 'l')}${plate(b, 'r')}</div>${pkTxt(`Which ${cn} has ${ask} ${nm}?`)}`,
    say: `Which ${cn} has ${ask} ${nm}?`, ansSay: `This one has ${ask}.`,
  });
}

// shapes: a choice picture is a VIZ.shape inside a span that names it (data-shape), so tests can check what is drawn
const SG_FACT = {
  hexagon: 'A hexagon has 6 sides.', rhombus: 'A rhombus has 4 sides, all the same length. It looks like a diamond.',
  trapezoid: 'A trapezoid has 4 sides. Two sides run the same way.', oval: 'An oval is a squished circle. It has no corners.',
  cube: 'A cube has 6 flat faces. They are all squares.', sphere: 'A sphere is round all over, like a ball. It has no flat face.',
  cone: 'A cone has a point on top and one round flat end.', cylinder: 'A cylinder has two flat round ends.',
};
function sgShp(name, solid) {
  const c = coin() ? 1 : 2;
  if (solid) return `<span class="sgsh" data-shape="${name}">${VIZ.shape(name, { c })}</span>`;
  const bent = ['hexagon', 'rhombus', 'trapezoid', 'oval'].includes(name); // the new shapes turn and stretch; the old ones only turn in right angles
  const o = bent ? { c, rot: pick([0, 25, 50, 90, 155, 180, 205, 270, 315, 335]), st: R(85, 130) / 100 } : { c, rot: pick([0, 90, 180, 270]), st: R(90, 125) / 100 };
  return `<span class="sgsh" data-shape="${name}">${VIZ.shape(name, o)}</span>`;
}
function genSgShape2() {
  const ans = pick(['hexagon', 'rhombus', 'trapezoid', 'oval']);
  let pool = ['hexagon', 'rhombus', 'trapezoid', 'oval', 'circle', 'square', 'triangle', 'rectangle'].filter(n => n != ans);
  if (ans == 'rhombus') pool = pool.filter(n => n != 'square'); // a square is a rhombus too
  const names = shuffle([ans, ...shuffle(pool).slice(0, 3)]), w = SG_FACT[ans];
  return pkQ({
    kind: 'choice', cls: 'pics pk4', ans, auto: 'must', choices: names.map(n => ({ l: sgShp(n), v: n, h: true })),
    html: `<div class="pkq">${pkEar()}</div>${pkTxt(`Tap the ${ans}.`)}`, say: `Tap the ${ans}.`,
    hint: PK.hint(`<div class="pkhint sgbigshape">${VIZ.shape(ans, { c: 1, dots: ans != 'oval' })}${pkTxt(w)}</div>`, w), label: `tap the ${ans}`,
  });
}

// shape 3: solids. Name -> picture, and a real thing -> the solid it is shaped like
const SG_THINGS3 = [['ball', 'ball', '⚽', 'sphere', 'a ball', 'It is round all over. It rolls any way.'],
  ['tennis ball', 'ball', '🎾', 'sphere', 'a tennis ball', 'It is round all over. It rolls any way.'],
  ['basketball', 'ball', '🏀', 'sphere', 'a basketball', 'It is round all over. It rolls any way.'],
  ['can', 'can', '🥫', 'cylinder', 'a can', 'It has two flat round ends and stands tall.'],
  ['drum', 'drum', '🥁', 'cylinder', 'a drum', 'It has two flat round ends and stands tall.'],
  ['box', 'box', '📦', 'cube', 'a box', 'It has flat square sides and sharp corners.'],
  ['dice', 'dice', '🎲', 'cube', 'a die', 'It has flat square sides and sharp corners.'],
  ['ice cream cone', 'cone', '🍦', 'cone', 'an ice cream cone', 'It has a point on top and a round flat end.']];
function genSgShape3() {
  const solids = shuffle(['cube', 'sphere', 'cone', 'cylinder']), choices = solids.map(n => ({ l: sgShp(n, 1), v: n, h: true }));
  if (coin()) {
    const ans = pick(solids), w = SG_FACT[ans];
    return pkQ({
      kind: 'choice', cls: 'pics pk4', ans, auto: 'must', choices,
      html: `<div class="pkq">${pkEar()}</div>${pkTxt(`Tap the ${ans}.`)}`, say: `Tap the ${ans}.`,
      hint: PK.hint(`<div class="pkhint">${pkTxt(w)}</div>`, w), label: `solid ${ans}`,
    });
  }
  const [nm, art, em, ans, sp, fact] = pick(SG_THINGS3);
  return pkQ({
    kind: 'choice', cls: 'pics pk4', ans, choices,
    html: `<div class="pkq"><span class="sgobj">${picFor(art, em)}</span></div>${pkTxt(`Which one is shaped like ${sp}?`)}`,
    say: `Which one is shaped like ${sp}?`,
    hint: PK.hint(`<div class="pkhint"><span class="sgobj">${picFor(art, em)}</span>${pkTxt(fact)}</div>`, fact), label: `solid like ${nm}`,
  });
}
function genShapeK(lv) { return lv == 1 ? genPkShape() : lv == 2 ? genSgShape2() : genSgShape3(); }

// add 4: sums within 5, with dots (the first group blue, the added group orange), including + 0
function genSgAdd() {
  const s = R(1, 5), a = R(0, s), b = s - a, q = mathQ(a, '+', b, s, 'c', false);
  return pkQ(Object.assign(q, { html: `<div class="pkq">${VIZ.dots(s, 'row', { b })}</div>` + q.html + pkTxt('How many in all?') }));
}

// cnt 4: count on or back by 1 within 0-20; one blank among 5 numbers; 40% backward
function genSgCnt() {
  const back = rnd() < 0.4, s = back ? R(4, 20) : R(0, 16), d = back ? -1 : 1;
  const seq = [0, 1, 2, 3, 4].map(i => s + i * d), bi = R(1, 3);
  const w = back ? 'Counting back: one less each time.' : 'Counting on: one more each time.';
  return pkQ({
    kind: 'num', ans: String(seq[bi]), html: `<div class="seq">${seq.map((n, i) => (i == bi ? SLOT : n)).join(', ')}</div>${pkTxt(back ? 'Count back.' : 'Count on.')}`,
    say: `${back ? 'Count back' : 'Count on'}. ${seq.map((n, i) => (i == bi ? 'what' : n)).join(', ')}`,
    hint: PK.hint(`<div class="pkhint">${pkTxt(w)}</div>`, w), label: seq.map((n, i) => (i == bi ? '_' : n)).join(','),
  });
}

// pat 2: AAB, ABB or ABC (a colour pattern, or a shape pattern in one colour), 6-7 shown; pick the next
function genSgPat() {
  const kind = pick(['AAB', 'ABB', 'ABC']), byColour = coin(), cs = shuffle([0, 1, 2, 3, 4, 5]), sh = shuffle(['circle', 'square', 'triangle', 'star', 'diamond']);
  const tok = i => (byColour ? { s: 'circle', c: cs[i] } : { s: sh[i], c: cs[0] }), T = [tok(0), tok(1), tok(2)];
  const unit = [...kind].map(ch => T['ABC'.indexOf(ch)]), L = R(6, 7);
  const seq = Array.from({ length: L }, (_, i) => unit[i % 3]), next = unit[L % 3];
  const key = x => x.c + '|' + x.s, others = T.filter(x => key(x) != key(next));
  const opts = shuffle([next, others[0], coin() ? others[1] : tok(3)]);
  const nm = x => (byColour ? PK.COL[x.c][0] : x.s), draw = x => PK.shp(x.s, x.c), names = seq.map(nm).join(', ');
  const short = seq.map(x => nm(x).slice(0, 2)).join(','); // colours re bl gr ye pu or, shapes ci sq tr st di: never the same
  return pkQ({
    kind: 'choice', cls: 'pics pk3', ans: String(opts.findIndex(x => key(x) == key(next))), choices: opts.map((x, i) => ({ l: draw(x), v: String(i), h: true })),
    html: `<div class="pkq pkpat sgpat">${seq.map(draw).join('')}<span class="pkunk">?</span></div>${pkTxt('What comes next?')}`, say: `${names}. What comes next?`,
    hint: PK.hint(`<div class="pkhint"><div class="pkpat sgpat pulse">${seq.map((x, i) => `<span class="pko" style="--d:${i * 0.6}s">${draw(x)}</span>`).join('')}</div>`
      + `${pkTxt('Find the part that repeats.')}</div>`, `${names}. Find the part that repeats. What comes next?`),
    label: `${kind} ${short}`,
  });
}

// sort 3: three of one kind (animals, food, vehicles, clothes) and one that is not
const SG_CATS = {
  animals: [['dog', '🐶'], ['cat', '🐱'], ['pig', '🐷'], ['frog', '🐸'], ['duck', '🦆'], ['fish', '🐟'], ['hen', '🐔'], ['fox', '🦊']],
  food: [['apple', '🍎'], ['banana', '🍌'], ['cookie', '🍪'], ['cake', '🎂'], ['milk', '🥛'], ['grapes', '🍇'], ['pizza', '🍕'], ['bread', '🍞']],
  vehicles: [['car', '🚗'], ['bus', '🚌'], ['bike', '🚲'], ['ship', '🚢'], ['plane', '✈'], ['train', '🚂'], ['truck', '🚚'], ['boat', '⛵']],
  clothes: [['hat', '🧢'], ['coat', '🧥'], ['socks', '🧦'], ['shirt', '👔'], ['boots', '👢']],
};
function genSgSort() {
  const [c1, c2] = shuffle(Object.keys(SG_CATS)).slice(0, 2), three = shuffle(SG_CATS[c1]).slice(0, 3), odd = pick(SG_CATS[c2]);
  const all = shuffle([...three.map(x => ({ x, odd: false })), { x: odd, odd: true }]), w = `Three of these are ${c1}.`;
  return pkQ({
    kind: 'choice', cls: 'pics pk4', ans: String(all.findIndex(a => a.odd)),
    choices: all.map((a, i) => ({ l: `<span class="pkcell">${picFor(a.x[0], a.x[1])}</span>`, v: String(i), h: true })),
    html: `<div class="pkq pkask">?</div>${pkTxt('Which one does not belong?')}`, say: 'Which one does not belong?',
    hint: PK.hint(`<div class="pkhint">${pkTxt(w)}</div>`, w), label: `odd ${odd[0]} (${c2}) in ${c1}: ${three.map(x => x[0]).join(',')}`,
  });
}

// tenf: ten frames (VIZ.tenFrame)
function genTenf(lv) {
  if (lv == 1) {
    const n = R(0, 10), w = n == 0 ? 'Zero. The frame is empty.' : n > 5 ? 'Five on top. Then count on.' : 'Count the counters, one by one.';
    return pkQ({
      kind: 'num', ans: String(n), html: `<div class="pkq">${VIZ.tenFrame(n)}</div>${pkTxt('How many counters?')}${sgEq(SLOT)}`,
      say: 'How many counters?', hint: PK.hint(`<div class="pkhint">${VIZ.tenFrame(n, 10, { b: Math.max(0, n - 5) })}${pkTxt(w)}</div>`, w), label: `frame ${n}`,
    });
  }
  if (lv == 2) {
    const n = R(1, 9), w = 'Count the empty boxes. Those are the ones you need.';
    return pkQ({
      kind: 'num', ans: String(10 - n), html: `<div class="pkq">${VIZ.tenFrame(n)}</div>${pkTxt('How many more to make ten?')}${sgEq(SLOT)}`,
      say: 'How many more to make ten?', hint: PK.hint(`<div class="pkhint">${VIZ.tenFrame(10, 10, { b: 10 - n })}${pkTxt(w)}</div>`, w), label: `${n} and ? make 10`,
    });
  }
  const n = R(1, 9), tens = `<div class="sgfrs">${VIZ.tenFrame(10)}${VIZ.tenFrame(n)}</div>`;
  if (coin()) {
    const w = 'One full ten. Then count on.';
    return pkQ({
      kind: 'num', ans: String(10 + n), html: `<div class="pkq">${tens}</div>${pkTxt('How many in all?')}${sgEq(SLOT)}`, say: 'How many in all?',
      hint: PK.hint(`<div class="pkhint">${tens}${pkTxt(w)}</div>`, w), label: `10 and ${n}`,
    });
  }
  const w = `Start at ten. Count on to ${SGN(10 + n)}.`;
  return pkQ({
    kind: 'num', ans: String(n), html: `<div class="pkq">${VIZ.tenFrame(10)}</div>${sgEq(`10 + ${SLOT} = ${10 + n}`)}${pkTxt(`Ten and how many make ${SGN(10 + n)}?`)}`,
    say: `Ten and how many more make ${SGN(10 + n)}?`,
    hint: PK.hint(`<div class="pkhint"><div class="sgfrs">${VIZ.tenFrame(10)}${VIZ.tenFrame(n, 10, { b: n })}</div>${pkTxt(w)}</div>`, w), label: `10 + ? = ${10 + n}`,
  });
}

// pos 1: where is it? above, below, beside, in front of, behind, between. Tap the right one.
const SG_ANI = [['cat', '🐱'], ['dog', '🐶'], ['pig', '🐷'], ['duck', '🦆'], ['frog', '🐸'], ['hen', '🐔'], ['fox', '🦊'], ['bug', '🐛']];
const SG_REF = [['box', '📦'], ['bed', '🛏'], ['house', '🏠'], ['tree', '🌳'], ['car', '🚗'], ['bus', '🚌']];
function genPos() {
  const kind = pick(['above', 'below', 'beside', 'in front of', 'behind', 'between']), ani = shuffle(SG_ANI), ref = pick(SG_REF);
  const pic = a => picFor(a[0], a[1]), tp = (a, v) => `<span class="sgt" data-v="${v}" aria-label="${a[0]}">${pic(a)}</span>`;
  const rf = `<span class="sgref">${pic(ref)}</span>`, A = ani[0], B = ani[1], C = ani[2];
  let html, ans, say, hint, lab;
  if (kind == 'above' || kind == 'below') {
    html = `<div class="sgscene sgcol">${tp(A, 'a')}${rf}${tp(B, 'b')}</div>`; ans = kind == 'above' ? 'a' : 'b';
    say = `Tap the one ${kind} the ${ref[0]}.`; lab = `${kind} the ${ref[0]}: ${A[0]} up, ${B[0]} down`;
    hint = kind == 'above' ? 'Above means higher up. Look at the top.' : 'Below means lower down. Look at the bottom.';
  } else if (kind == 'beside') {
    const flip = coin();
    html = `<div class="sgscene sggrid${flip ? ' sgflip' : ''}">${rf}${tp(A, 'a')}${tp(B, 'b')}</div>`; ans = 'a';
    say = `Tap the one beside the ${ref[0]}.`; lab = `beside the ${ref[0]}: ${A[0]} next to it, ${B[0]} below${flip ? ' (flipped)' : ''}`;
    hint = 'Beside means right next to it, on the same line.';
  } else if (kind == 'between') {
    html = `<div class="sgscene sgrow">${tp(A, 'a')}${tp(C, 'c')}${tp(B, 'b')}</div>`; ans = 'c';
    say = `Tap the one between the ${A[0]} and the ${B[0]}.`; lab = `between ${A[0]} and ${B[0]}: ${C[0]}`;
    hint = 'Between means in the middle, with one on each side.';
  } else {
    const front = kind == 'in front of';
    html = `<div class="sgscene sgdepth"><span class="sgbk">${tp(A, 'a')}</span>${rf}<span class="sgfk">${tp(B, 'b')}</span></div>`;
    ans = front ? 'b' : 'a'; say = `Tap the one ${kind} the ${ref[0]}.`; lab = `${kind} the ${ref[0]}: ${A[0]} back, ${B[0]} front`;
    hint = front ? 'In front means closer to you. It hides part of the other one.' : 'Behind means farther away. Part of it is hidden.';
  }
  return pkQ({ kind: 'tap', ans, html: `<div class="pkq">${html}</div>${pkTxt(say)}`, say, ansSay: 'This one.', hint: PK.hint(`<div class="pkhint">${pkTxt(hint)}</div>`, hint), label: lab });
}

// meas 1: compare two or three things: longer / shorter (bars), taller / shorter (towers), heavier / lighter (a tipped scale)
function genMeas() {
  const kind = pick(['length', 'height', 'weight']), top = coin(), ci = R(0, 5);
  if (kind == 'weight') {
    const a = R(1, 9);
    let b = R(1, 9);
    if (Math.abs(a - b) < 2) b = a <= 4 ? a + 2 + R(0, 3) : a - 2 - R(0, 3);
    const heavy = a > b ? 'l' : 'r', win = top ? heavy : heavy == 'l' ? 'r' : 'l', adj = top ? 'heavier' : 'lighter';
    const w = top ? 'The heavy side goes down.' : 'The light side goes up.';
    return pkQ({
      kind: 'tap', ans: win, label: `${adj} ${a} or ${b}`, say: `Tap the ${adj} side.`, ansSay: `This side is ${adj}.`,
      html: `<div class="pkq"><div class="sgbal" data-l="${a}" data-r="${b}">${VIZ.balance(a, b)}<i data-v="l" aria-label="left side"></i><i data-v="r" aria-label="right side"></i></div></div>${pkTxt(`Tap the ${adj} side.`)}`,
      hint: PK.hint(`<div class="pkhint">${pkTxt(w)}</div>`, w),
    });
  }
  const n = R(2, 3);
  if (kind == 'length') {
    const lens = shuffle([60, 90, 120, 150, 180]).slice(0, n), aligned = coin();
    const offs = lens.map(() => (aligned ? 0 : R(0, 50))), want = top ? Math.max(...lens) : Math.min(...lens), adj = top ? 'longer' : 'shorter';
    const bars = lens.map((l, i) => `<span class="sgt sgbarrow" data-v="${i}" style="margin-left:${offs[i]}px" aria-label="crayon">${PK.bar(l, ci)}</span>`).join('');
    const same = lens.map(l => `<span class="sgbarrow">${PK.bar(l, ci)}</span>`).join('');
    const w = 'Line them up at the start. Which one reaches farther?', nm = n == 2 ? adj : top ? 'longest' : 'shortest';
    return pkQ({
      kind: 'tap', ans: String(lens.indexOf(want)), say: `Tap the ${nm} crayon.`, ansSay: `This crayon is ${nm}.`, label: `${nm} crayon ${lens.join('/')}${aligned ? '' : ' (not lined up)'}`,
      html: `<div class="pkq"><div class="sgcol sgbars">${bars}</div></div>${pkTxt(`Tap the ${nm} crayon.`)}`,
      hint: PK.hint(`<div class="pkhint"><div class="sgcol sgbars sgaligned">${same}</div>${pkTxt(w)}</div>`, w),
    });
  }
  const hs = shuffle([1, 2, 3, 4, 5]).slice(0, n), want = top ? Math.max(...hs) : Math.min(...hs), adj = top ? 'taller' : 'shorter';
  const nm = n == 2 ? adj : top ? 'tallest' : 'shortest', w = 'Stand them on the floor. Which one reaches higher?';
  const towers = hs.map((h, i) => `<span class="sgt" data-v="${i}" aria-label="tower">${PK.tower(h, ci)}</span>`).join('');
  return pkQ({
    kind: 'tap', ans: String(hs.indexOf(want)), say: `Tap the ${nm} tower.`, ansSay: `This tower is ${nm}.`, label: `${nm} tower ${hs.join('/')}`,
    html: `<div class="pkq"><div class="sgrow sgtowers">${towers}</div></div>${pkTxt(`Tap the ${nm} tower.`)}`,
    hint: PK.hint(`<div class="pkhint">${pkTxt(w)}</div>`, w),
  });
}

// the older skills with levels added here: each wrapper sends the new level to the code above and the old ones to the old generator
const genPkCountK = lv => (lv >= 3 ? genSgCount() : genPkCount(lv));
const genPkNumK = lv => (lv >= 3 ? genSgNum() : genPkNum(lv));
const genPkMoreK = lv => (lv >= 2 ? genSgMore() : genPkMore());
const genSortK = lv => (lv == 3 ? genSgSort() : genSort(lv));
const genPatK = lv => (lv >= 2 ? genSgPat() : genPkPat());
const genAddK = lv => (lv == 4 ? genSgAdd() : genAdd(lv));
const genCntK = lv => (lv == 4 ? genSgCnt() : genCnt(lv));
