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

// ---- P2-03 Clock Tower (1st) ----
/* Grade 1 gaps (CURRICULUM M-1): pv 1, add 5-6, meas 2, data 1, shape 4, frac 1, world Clock Tower (m_clock).
   Pictures are VIZ.* (base10, pictograph, shape) or small drawings below that use the same viz classes (32-viz.css, tokens only).
   Randomness: R, rnd, pick, shuffle, coin only. Later chunks add pv 2-3 (P2-04), meas 3, data 2 and frac 2+ to the same skill ids. */
const CT = {
  // svg root with the same classes as VIZ (no ids, no defs); w, h: viewBox size
  root(name, w, h, body, label) {
    return `<svg class="viz viz-${name}" viewBox="0 0 ${w} ${h}" style="--vw:${w}" role="img" aria-label="${label}">${body}</svg>`;
  },
  // outlines on a 40 x 40 grid for the six grade 1 shapes (regular ones computed, rounded to one decimal)
  reg(n, off) {
    return Array.from({length: n}, (_, i) => {
      const a = 2 * Math.PI * (i + off) / n;
      return [Math.round((20 + 17 * Math.sin(a)) * 10) / 10, Math.round((21 - 17 * Math.cos(a)) * 10) / 10];
    });
  },
  // the sides of one polygon lighting one after another (the sides hint); uses the pk classes from 31-pk.css
  sides(name) {
    const P = CT.SHP[name], n = P.length;
    const ls = P.map((p, i) => {
      const q = P[(i + 1) % n];
      return `<line class="pkside" style="--d:${(i * 0.8).toFixed(1)}s;--T:${(n * 0.8).toFixed(1)}s" x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}"/>`;
    }).join('');
    return `<svg class="pks pkbig" viewBox="0 0 40 40" role="img" aria-label="shape"><polygon class="pkf pkdim" points="${P.map(p => p.join(',')).join(' ')}"/>${ls}</svg>`;
  },
  // a row of n unit cubes with an object lying above it (meas 2); o.nums writes 1..n in the cubes (the hint)
  cubes(n, obj, o = {}) {
    const s = 24, P = 8, w = n * s, H = 76;
    let b = '';
    if (obj == 'pencil' && n >= 2) {
      b += `<path class="vpt" d="M${P} 22L${P + 22} 10v24z"/><path class="vpin" d="M${P} 22l5-3v6z"/>`
        + `<rect class="v2" x="${P + 22}" y="10" width="${w - 22}" height="24" rx="3"/>`;
    } else b += `<rect class="v1" x="${P}" y="10" width="${w}" height="24" rx="5"/>`;
    b += `<path class="vgd" d="M${P} 36V44M${P + w} 36V44"/>`;
    for (let i = 0; i < n; i++) {
      b += `<rect class="vwg" x="${P + i * s}" y="44" width="${s}" height="${s}" rx="3"/>`;
      if (o.nums) b += `<text class="vcn" x="${P + i * s + s / 2}" y="62">${i + 1}</text>`;
    }
    return CT.root('cub', w + 2 * P, H, b, 'unit cubes');
  },
  // a circle or rectangle cut into d parts (2 or 4), equal or not (frac 1). 100 x 80 box. Direction of the cuts is random.
  cut(shape, d, eq) {
    const cx = 50, cy = 40, r = 36, x0 = 6, x1 = 94, y0 = 8, y1 = 72, W = x1 - x0, Ht = y1 - y0;
    const f1 = x => Math.round(x * 10) / 10;
    const sgn = coin() ? 1 : -1, sgn2 = coin() ? 1 : -1, horiz = coin();
    const vl = x => { const dy = Math.sqrt(r * r - (x - cx) * (x - cx)); return `M${f1(x)} ${f1(cy - dy)}V${f1(cy + dy)}`; };
    const hl = y => { const dx = Math.sqrt(r * r - (y - cy) * (y - cy)); return `M${f1(cx - dx)} ${f1(y)}H${f1(cx + dx)}`; };
    const rv = x => `M${f1(x)} ${y0}V${y1}`, rh = y => `M${x0} ${f1(y)}H${x1}`;
    let out, ln = '';
    if (shape == 'circle') {
      out = `<circle class="vp" cx="${cx}" cy="${cy}" r="${r}"/>`;
      if (d == 2) ln = horiz ? hl(cy + (eq ? 0 : sgn * 14)) : vl(cx + (eq ? 0 : sgn * 14));
      else ln = eq ? vl(cx) + hl(cy) : vl(cx + sgn * 13) + hl(cy + sgn2 * 11);
    } else {
      out = `<rect class="vp" x="${x0}" y="${y0}" width="${W}" height="${Ht}" rx="4"/>`;
      const at = e => e ? .5 : sgn > 0 ? .3 : .7;
      if (d == 2) ln = horiz ? rh(y0 + Ht * at(eq)) : rv(x0 + W * at(eq));
      else if (eq) {
        const k = pick([0, 1, 2]);
        ln = k == 0 ? rv(x0 + W * .25) + rv(x0 + W * .5) + rv(x0 + W * .75)
          : k == 1 ? rh(y0 + Ht * .25) + rh(y0 + Ht * .5) + rh(y0 + Ht * .75) : rv(x0 + W * .5) + rh(y0 + Ht * .5);
      } else ln = horiz ? rv(x0 + W * .15) + rv(x0 + W * .45) + rv(x0 + W * .65)
        : rv(x0 + W * (sgn > 0 ? .35 : .65)) + rh(y0 + Ht * (sgn2 > 0 ? .35 : .65));
    }
    return CT.root('cut', 100, 80, `${out}<path class="ve" d="${ln}"/>`, shape == 'circle' ? 'a circle cut into parts' : 'a rectangle cut into parts');
  },
};
CT.SHP = {
  triangle: [[20, 5], [36, 35], [4, 35]], square: [[6, 6], [34, 6], [34, 34], [6, 34]], rectangle: [[2, 10], [38, 10], [38, 30], [2, 30]],
  pentagon: CT.reg(5, 0), hexagon: CT.reg(6, 0.5), trapezoid: [[11, 10], [29, 10], [38, 32], [2, 32]],
};
CT.NS = {triangle: 3, square: 4, rectangle: 4, pentagon: 5, hexagon: 6, trapezoid: 4};

// pv 1: base-ten picture -> number; "How many tens in 47?"; "30 + 6 = ?"  (tens 1-9, ones 0-9; the three forms mixed evenly)
function genPv1() {
  const t = R(1, 9), form = pick(['pic', 'tens', 'sum']);
  if (form == 'pic') {
    const u = R(0, 9), n = t * 10 + u;
    return {kind: 'num', html: `${VIZ.base10(n)}<div class="sub">How many in all?</div>${SLOT}`,
      say: 'How many blocks in all? Count the rods by tens, then the little cubes by ones.', ans: String(n),
      label: `pv picture ${t} tens ${u} ones`, hint: {k: 'text', s: 'Count the rods by tens first.'}};
  }
  if (form == 'tens') {
    const n = t * 10 + R(0, 9);
    return {kind: 'num', html: `<div class="eq">${n}</div><div class="sub">How many tens?</div>${SLOT}`,
      say: `How many tens are in ${n}?`, ans: String(t), label: `pv tens in ${n}`,
      hint: {k: 'text', s: `The first digit tells the tens. In ${n}, look at the ${t}.`}};
  }
  const u = R(1, 9), n = t * 10 + u;
  return {kind: 'num', html: `<div class="eq">${t * 10} + ${u} = ${SLOT}</div>`, say: `${t * 10} plus ${u} equals what?`,
    ans: String(n), label: `${t * 10} + ${u} = ?`, hint: {k: 'text', s: `${t} tens is ${t * 10}. Put the ${u} ones with it.`}};
}

// add 5: three addends, sum <= 20; two of them make ten or are a double in 60% of the items, the rest have neither
function genAdd5() {
  const hasTen = v => v[0] + v[1] == 10 || v[0] + v[2] == 10 || v[1] + v[2] == 10;
  const hasDbl = v => v[0] == v[1] || v[0] == v[2] || v[1] == v[2];
  const special = rnd() < 0.6;
  let v;
  do v = [R(1, 9), R(1, 9), R(1, 9)];
  while (v[0] + v[1] + v[2] > 20 || (special ? !(hasTen(v) || hasDbl(v)) : hasTen(v) || hasDbl(v)));
  const s = v[0] + v[1] + v[2];
  const hint = hasTen(v) ? 'Look for a pair that makes 10.' : hasDbl(v) ? 'Look for a double, like 4 + 4.' : 'Add two numbers first. Then add the last one.';
  v = shuffle(v);
  return {kind: 'num', html: `<div class="eq">${v[0]} + ${v[1]} + ${v[2]} = ${SLOT}</div>`, say: `${v[0]} plus ${v[1]} plus ${v[2]} equals what?`,
    ans: String(s), label: `${v[0]} + ${v[1]} + ${v[2]} = ?`, hint: {k: 'text', s: hint}};
}

// add 6: mental two-digit: +10, -10, + a multiple of 10 (sum <= 99), and +/- inside the same ten (34 + 5)
function genAdd6() {
  const f = pick(['p10', 'm10', 'pm', 'pu', 'mu']);
  const T = s => ({hint: {k: 'text', s}});
  if (f == 'p10') { const n = R(10, 89); return mathQ(n, '+', 10, n + 10, 'c', false, T('Only the tens digit changes. One more ten.')); }
  if (f == 'm10') { const n = R(20, 99); return mathQ(n, '-', 10, n - 10, 'c', false, T('Only the tens digit changes. One less ten.')); }
  if (f == 'pm') {
    const k = R(2, 8), n = R(10, 99 - 10 * k);
    return mathQ(n, '+', k * 10, n + k * 10, 'c', false, T(`Only the tens digit changes. Add ${k} tens.`));
  }
  const t = R(1, 9);
  if (f == 'pu') {
    const a = R(0, 8), u = R(1, 9 - a), n = t * 10 + a;
    return mathQ(n, '+', u, n + u, 'c', false, T(`The tens stay the same. Add the ones: ${a} + ${u}.`));
  }
  const a = R(1, 9), u = R(1, a), n = t * 10 + a;
  return mathQ(n, '-', u, n - u, 'c', false, T(`The tens stay the same. Take away from the ones: ${a} - ${u}.`));
}

// meas 2: an object above a row of unit cubes, 1 to 12 cubes long. Level 1 is reserved for P2-02 (K) and asks the same until it ships.
function genMeas2(lv) {
  const n = R(1, 12), obj = n >= 2 && coin() ? 'pencil' : 'strip', name = obj == 'pencil' ? 'pencil' : 'paper strip';
  return {kind: 'num', html: `${CT.cubes(n, obj)}<div class="sub">How many cubes long is the ${name}?</div>${SLOT}`,
    say: `How many cubes long is the ${name}?`, ans: String(n), label: `meas ${name} ${n} cubes`,
    hint: {k: 'html', html: `<div class="pkhint">${CT.cubes(n, obj, {nums: true})}<div class="sub">Count the cubes under it, one by one.</div></div>`,
      w: 'Count the cubes under it, one by one.'}};
}

// data 1: picture graph, 3 categories, values 1-8 (all different), one symbol = 1; five question forms
const CT_DATA = [['Our pets', ['Cats', 'Dogs', 'Fish', 'Birds']], ['Favorite fruit', ['Apples', 'Pears', 'Plums', 'Grapes']],
  ['Playground fun', ['Swings', 'Slides', 'Tag', 'Ball']], ['Favorite colors', ['Red', 'Blue', 'Green', 'Pink']]];
function genData1() {
  const [title, pool] = pick(CT_DATA), names = shuffle(pool).slice(0, 3), vals = shuffle([1, 2, 3, 4, 5, 6, 7, 8]).slice(0, 3);
  const g = `<div class="sub"><b>${esc(title)}</b></div>${VIZ.pictograph(names.map((x, i) => [x, vals[i]]), {key: 1})}`;
  const form = pick(['count', 'most', 'least', 'more', 'sum']);
  const i = R(0, 2), lc = k => names[k].toLowerCase(), gist = names.map((x, k) => `${x} ${vals[k]}`).join(' ');
  const num = (ask, ans, label, hint) => ({kind: 'num', html: `${g}<div class="sub">${ask}</div>${SLOT}`, say: ask, ans: String(ans), label, hint: {k: 'text', s: hint}});
  if (form == 'count') return num(`How many ${lc(i)}?`, vals[i], `data count ${names[i]}: ${gist}`, 'Count the circles in that row. Touch each one.');
  if (form == 'most' || form == 'least') {
    const most = form == 'most', want = most ? Math.max(...vals) : Math.min(...vals), a = vals.indexOf(want);
    return {kind: 'choice', html: `${g}<div class="sub">Which has the ${most ? 'most' : 'least'}?</div>`, say: `Which has the ${most ? 'most' : 'least'}?`,
      ans: names[a], after: `${names[a]} has the ${most ? 'most' : 'least'}`, choices: names.map(x => ({l: x, v: x})),
      label: `data ${form}: ${gist}`, hint: {k: 'text', s: `Count each row. The row with the ${most ? 'longest' : 'shortest'} line wins.`}};
  }
  const j = pick([0, 1, 2].filter(x => x != i));
  if (form == 'more') {
    const [hi, lo] = vals[i] > vals[j] ? [i, j] : [j, i];
    return num(`How many more ${lc(hi)} than ${lc(lo)}?`, vals[hi] - vals[lo], `data more ${names[hi]} than ${names[lo]}: ${gist}`,
      'Count each row, then find the difference.');
  }
  return num(`How many ${lc(i)} and ${lc(j)} in all?`, vals[i] + vals[j], `data total ${names[i]} ${names[j]}: ${gist}`, 'Count each row, then add the two numbers.');
}

// shape 4: sides, corners and "which shape has 4 sides?". Levels 2-3 are K (P2-02) and ask the Pre-K shape question until it ships.
const CT_SH = ['triangle', 'square', 'rectangle', 'pentagon', 'hexagon', 'trapezoid'];
function genShape(lv) {
  if (lv < 4) return genPkShape(lv);
  const form = pick(['sides', 'corners', 'which']);
  if (form == 'which') {
    const ans = pick(['square', 'rectangle', 'trapezoid']), ch = [ans, ...shuffle(['triangle', 'pentagon', 'hexagon']).slice(0, 2)];
    return {kind: 'choice', cls: 'pics', ans, choices: shuffle(ch).map(x => ({l: VIZ.shape(x), v: x, h: true})),
      html: '<div class="pkq pkask">4</div><div class="sub">Which shape has 4 sides?</div>', say: 'Which shape has 4 sides?',
      after: `A ${ans} has 4 sides`, label: `which has 4 sides: ${ch.join(' ')}`,
      hint: {k: 'html', html: `<div class="pkhint">${CT.sides(ans)}<div class="sub">Count the sides. Which shape has 4?</div></div>`, w: 'Count the sides. Which shape has 4?'}};
  }
  const name = pick(CT_SH), word = form == 'sides' ? 'sides' : 'corners';
  const hint = form == 'sides'
    ? {k: 'html', html: `<div class="pkhint">${CT.sides(name)}<div class="sub">Count the sides as they light up.</div></div>`, w: 'Count the sides as they light up.'}
    : {k: 'html', html: `<div class="pkhint">${VIZ.shape(name, {dots: true})}<div class="sub">A corner is where two sides meet. Count the dots.</div></div>`,
      w: 'A corner is where two sides meet. Count the dots.'};
  return {kind: 'num', html: `${VIZ.shape(name)}<div class="sub">How many ${word}?</div>${SLOT}`, say: `How many ${word} does this shape have?`,
    ans: String(CT.NS[name]), label: `${word} of ${name}`, hint};
}

// frac 1: circles and rectangles cut in 2 or 4 parts, equal or not. "Which shows halves?" "Which shows fourths?" "Is it cut into equal parts?"
function genFrac1() {
  const shape = coin() ? 'circle' : 'rect', form = pick(['halves', 'fourths', 'equal']);
  if (form == 'equal') {
    const d = pick([2, 4]), eq = coin();
    return {kind: 'choice', cls: 'syms', html: `${CT.cut(shape, d, eq)}<div class="sub">Is it cut into equal parts?</div>`, say: 'Is it cut into equal parts?',
      ans: eq ? 'yes' : 'no', after: eq ? 'Yes, the parts are all the same size' : 'No, the parts are not the same size',
      choices: [{l: 'Yes', v: 'yes'}, {l: 'No', v: 'no'}], label: `equal parts? ${shape} ${d} ${eq ? 'yes' : 'no'}`,
      hint: {k: 'text', s: 'Equal shares are the same size. Could you lay one part on top of another?'}};
  }
  const d = form == 'halves' ? 2 : 4;
  const spec = [[d, true], ...shuffle([[2, true], [2, false], [4, true], [4, false]].filter(x => !(x[0] == d && x[1]))).slice(0, 2)];
  const items = shuffle(spec.map((s, i) => ({s, right: i == 0})));
  const at = items.findIndex(x => x.right);
  return {kind: 'choice', cls: 'pics', ans: String(at), choices: items.map((x, i) => ({l: CT.cut(shape, x.s[0], x.s[1]), v: String(i), h: true})),
    html: `<div class="sub">Which one shows ${form}?</div>`, say: `Which one shows ${form}?`, after: `That one shows ${form}`,
    label: `which shows ${form}: ${shape} ${spec.slice(1).map(x => x[0] + (x[1] ? 'eq' : 'un')).sort().join(' ')}`,
    hint: {k: 'text', s: `Equal shares are the same size. ${form == 'halves' ? 'Halves are 2 equal parts.' : 'Fourths are 4 equal parts.'}`}};
}

// ---- P2-04 Treasure Bay (2nd) ----
/* Grade 2 gaps (CURRICULUM M-2): pv 2-3, big 5, sub 5, time 4, coins 4-5, meas 3, data 2, arr 1, cnt 5, story 4, pat 3, world Treasure Bay (m_bay).
   Pictures are VIZ.* (base10, clock, coinSVG, ruler, barGraph, array). Hints with several steps are a numbered list (class hsteps, 10-components.css).
   Randomness: R, rnd, pick, shuffle, coin only. Each function below is one level; 38-skills.js calls it for that level and the old generator for the rest. */
const BAY = {
  // a numbered list hint; w (spoken) defaults to the steps read one after another
  steps(list, w) {
    return {k: 'html', html: `<ol class="hsteps">${list.map(s => `<li>${esc(s)}</li>`).join('')}</ol>`, w: w || list.join(' ')};
  },
  txt: s => ({k: 'text', s}),
  // "$3.45" from cents
  money: c => '$' + (c / 100).toFixed(2),
  // the right value plus distractors in the order given (shuffled), then fill-ins, up to 4 unique values
  pick4(ans, bad, fill = []) {
    const out = [ans];
    for (const x of [...shuffle(bad), ...shuffle(fill)]) if (out.length < 4 && !out.includes(x)) out.push(x);
    return out;
  },
};

// pv 2: base-ten picture with flats, rods and units (100-999; zero tens or ones in 30% of the items) -> number; or "What is the value of the 5 in 352?"
function genBayPv2() {
  if (rnd() < 0.55) {
    const h = R(1, 9), z = rnd() < 0.3 ? pick(['t', 'o', 'to']) : '';
    const t = z.includes('t') ? 0 : R(1, 9), u = z.includes('o') ? 0 : R(1, 9), n = h * 100 + t * 10 + u;
    return {kind: 'num', html: `${VIZ.base10(n)}<div class="sub">How many in all?</div>${SLOT}`,
      say: 'How many blocks in all? Count the flats by hundreds, the rods by tens, then the little cubes by ones.', ans: String(n),
      label: `pv picture ${n}`, hint: BAY.steps(['Count the flats. Each flat is 100.', 'Count the rods. Each rod is 10.', 'Count the little cubes. Each is 1.'])};
  }
  let d;
  do d = [R(1, 9), R(1, 9), R(1, 9)]; while (new Set(d).size < 3);
  const p = R(0, 2), n = d[0] * 100 + d[1] * 10 + d[2], place = ['hundreds', 'tens', 'ones'][p], val = d[p] * [100, 10, 1][p];
  const shown = d.map((x, i) => (i == p ? `<b><u>${x}</u></b>` : x)).join('');
  return {kind: 'choice', html: `<div class="eq">${shown}</div><div class="sub">What is the value of the ${d[p]} in ${n}?</div>`,
    say: `What is the value of the ${d[p]} in ${n}?`, ans: String(val), after: `The ${d[p]} is in the ${place} place, so it is worth ${val}`,
    choices: [d[p], d[p] * 10, d[p] * 100].map(x => ({l: String(x), v: String(x)})),
    label: `value of ${d[p]} in ${n}`,
    hint: BAY.txt('Look at which place the digit is in: hundreds, tens or ones. The place tells how much it is worth.')};
}

// pv 3: expanded form to 999: "400 + 30 + 7 = ?", "600 + ? + 2 = 652", "Which is 508?"
function genBayPv3() {
  const form = pick(['exp', 'miss', 'which']);
  const parts = (h, t, u) => [h * 100, t * 10, u].filter(x => x > 0);
  const hint = BAY.txt('Hundreds, then tens, then ones.');
  if (form == 'exp') {
    const h = R(1, 9), t = rnd() < 0.2 ? 0 : R(1, 9), u = rnd() < 0.2 ? 0 : R(1, 9), p = parts(h, t, u), n = h * 100 + t * 10 + u;
    return {kind: 'num', html: `<div class="eq">${p.join(' + ')} = ${SLOT}</div>`, say: `${p.join(' plus ')} equals what?`,
      ans: String(n), label: `${p.join(' + ')} = ?`, hint};
  }
  if (form == 'miss') {
    const d = [R(1, 9), R(1, 9), R(1, 9)], b = pick([0, 1, 1, 1, 2]), v = [d[0] * 100, d[1] * 10, d[2]], n = v[0] + v[1] + v[2];
    return {kind: 'num', html: `<div class="eq">${v.map((x, i) => (i == b ? SLOT : x)).join(' + ')} = ${n}</div>`,
      say: `${v.map((x, i) => (i == b ? 'what' : x)).join(' plus ')} equals ${n}`, ans: String(v[b]),
      label: `${v.map((x, i) => (i == b ? '?' : x)).join(' + ')} = ${n}`, hint};
  }
  let h, t, u, ch, ans;
  for (;;) {
    h = R(1, 9); t = rnd() < 0.5 ? 0 : R(1, 9); u = R(1, 9);
    ans = parts(h, t, u).join(' + ');
    ch = BAY.pick4(ans, [parts(h, u, t).join(' + '), parts(t, h, u).join(' + '), [h, t, u].filter(x => x > 0).join(' + '),
      parts(u, t, h).join(' + ')]);
    if (ch.length == 4) break;
  }
  const n = h * 100 + t * 10 + u;
  return {kind: 'choice', cls: 'wide', html: `<div class="sub">Which one is ${n}?</div>`, say: `Which one is ${n}?`, ans, after: `${ans} makes ${n}`,
    choices: shuffle(ch).map(x => ({l: x, v: x})), label: `which is ${n}`, hint};
}

// big 5: 3-digit + 3-digit, regrouping in the ones, the tens or both, sum <= 999, vertical
function genBayBig5() {
  const kind = pick(['ones', 'tens', 'both']);
  let d;
  for (;;) {
    d = [R(1, 8), R(0, 9), R(0, 9), R(1, 8), R(0, 9), R(0, 9)]; // a2 a1 a0 b2 b1 b0
    const c0 = d[2] + d[5] >= 10 ? 1 : 0, c1 = d[1] + d[4] + c0 >= 10 ? 1 : 0;
    if (d[0] + d[3] + c1 > 9) continue;
    if ((kind == 'ones' && c0 && !c1) || (kind == 'tens' && !c0 && c1) || (kind == 'both' && c0 && c1)) break;
  }
  const a = d[0] * 100 + d[1] * 10 + d[2], b = d[3] * 100 + d[4] * 10 + d[5];
  const hint = BAY.steps([`Ones: ${d[2]} + ${d[5]}. Carry a ten if you can.`, 'Tens: add them and the carried ten.', 'Hundreds: add them and any carried hundred.']);
  return mathQ(a, '+', b, a + b, 'c', true, {hint, label: `${a} + ${b} = ?`});
}

// sub 5: 3-digit - 3-digit, no regrouping, vertical
function genBaySub5() {
  const d = [R(2, 9), R(0, 9), R(0, 9)], e = [R(1, d[0] - 1), R(0, d[1]), R(0, d[2])];
  const a = d[0] * 100 + d[1] * 10 + d[2], b = e[0] * 100 + e[1] * 10 + e[2];
  const hint = BAY.steps([`Ones first: ${d[2]} - ${e[2]}.`, `Then the tens: ${d[1]} - ${e[1]}.`, `Then the hundreds: ${d[0]} - ${e[0]}.`]);
  return mathQ(a, '-', b, a - b, 'c', true, {hint, label: `${a} - ${b} = ?`});
}

// time 4: analog clock to the nearest 5 minutes -> the digital time (hands swapped, next hour and 5-minute neighbour as distractors)
function genBayTime4() {
  const h = R(1, 12), m = rnd() < 0.75 ? pick([5, 10, 20, 25, 35, 40, 50, 55]) : pick([0, 15, 30, 45]);
  const hh = x => ((x + 11) % 12) + 1, ans = tstr(h, m);
  const swap = tstr(hh(m / 5), (h * 5) % 60), next = tstr(hh(h + 1), m), nb = tstr(h, m == 55 ? 50 : m + 5), nb2 = m ? tstr(h, m - 5) : tstr(h, 5);
  const ch = BAY.pick4(ans, [swap, next, nb, nb2], [tstr(hh(h - 1), m), tstr(hh(h + 2), m), tstr(h, (m + 30) % 60)]);
  return {kind: 'choice', html: `${VIZ.clock(h, m)}<div class="sub">What time is it?</div>`, say: 'What time does the clock show?', ans,
    after: `It's ${ans}`, choices: shuffle(ch).map(x => ({l: x, v: x})), label: `clock to 5 min ${ans}`,
    hint: BAY.txt('The short pink hand shows the hour. The long blue hand shows the minutes: count by 5s from the 12.')};
}

// coins 4: dollar bills (1, 5) and coins up to $9.99. How much? (four amounts like $3.45)
function genBayCoins4() {
  let list, tot;
  do {
    const b5 = pick([0, 0, 1]), b1 = R(b5 ? 0 : 1, 4), cs = Array.from({length: R(1, 4)}, () => pick([25, 10, 5, 1])).sort((x, y) => y - x);
    list = [...Array(b5).fill(500), ...Array(b1).fill(100), ...cs];
    tot = list.reduce((x, y) => x + y, 0);
  } while (tot > 999 || list.length > 8);
  const hasFive = list.includes(500);
  const ch = BAY.pick4(tot, [tot + 10, tot - 10, tot + 100, tot - 100, tot + 5, tot - 5, hasFive ? tot - 400 : tot + 25].filter(x => x > 0 && x <= 1100));
  return {kind: 'choice', cls: 'wide', html: `${VIZ.coinSVG(list)}<div class="sub">How much money?</div>`, say: 'How much money is this?', ans: BAY.money(tot),
    after: `That is ${BAY.money(tot)}`, choices: shuffle(ch).map(x => ({l: BAY.money(x), v: BAY.money(x)})), label: `money ${list.join('+')}`,
    hint: BAY.txt('Count the bills first, biggest to smallest. Then count on with the coins, biggest to smallest.')};
}

// coins 5: making change. Pay $1.00 for a price of 5 to 95 cents, or pay $5 for whole dollars and 50 cents. Change in cents.
const BAY_ITEMS = [['apple', '🍎'], ['cookie', '🍪'], ['ball', '⚽'], ['toy car', '🚗'], ['crayon', '🖍️'], ['pencil', '✏️'], ['fish', '🐟']];
function genBayCoins5() {
  const [it, e] = pick(BAY_ITEMS), art = `<div class="eq">${picFor(it, e)}</div>`, ex = /^[aeiou]/.test(it) ? 'An' : 'A';
  if (coin()) {
    const p = 5 * R(1, 19), t = `${ex} ${it} costs ${p} cents. You pay 1 dollar. How many cents do you get back?`;
    return {kind: 'num', html: `${art}<p class="story">${esc(t)}</p><div class="eq" style="font-size:.7em">${SLOT}¢</div>`, say: t, auto: true,
      ans: String(100 - p), label: `change from 100 for ${p}`, hint: BAY.txt(`Count up from ${p} to 100. How many cents is that?`)};
  }
  const d = R(1, 4), p = d * 100 + 50, t = `${ex} ${it} costs $${d}.50. You pay 5 dollars. How many cents do you get back?`;
  return {kind: 'num', html: `${art}<p class="story">${esc(t)}</p><div class="eq" style="font-size:.7em">${SLOT}¢</div>`,
    say: `${ex} ${it} costs ${d} dollars and 50 cents. You pay 5 dollars. How many cents do you get back?`, auto: true, ans: String(500 - p),
    label: `change from 500 for ${p}`, hint: BAY.txt(`Count up from $${d}.50 to the next dollar, then on to $5.00. Add the two jumps.`)};
}

// meas 3: ruler (inches 0-12 or cm 0-15), object from 0 (70%) or from another mark (30%). How long?
function genBayMeas3() {
  const unit = coin() ? 'in' : 'cm', max = unit == 'in' ? 12 : 15, from = rnd() < 0.3 ? R(1, 6) : 0, len = R(2, max - from);
  const obj = coin() ? 'pencil' : 'bar', name = obj == 'pencil' ? 'pencil' : 'paper strip', word = unit == 'in' ? 'inches' : 'cm';
  const q = `How long is the ${name}?`;
  return {kind: 'num', html: `${VIZ.ruler(len, unit, obj, {from, max})}<div class="sub">${q}</div><div class="eq" style="font-size:.7em">${SLOT} ${word}</div>`,
    say: `${q} Say how many ${unit == 'in' ? 'inches' : 'centimeters'}.`, ans: String(len), label: `ruler ${unit} from ${from} to ${from + len}`,
    hint: BAY.txt(from ? 'The object does not start at 0. Subtract where it starts from where it ends.' : 'The left end sits at 0. Read the number where the right end is.')};
}

// data 2: bar graph, 4 categories, scale 1, values 0-10 (all different); count, most, least, how many more, two together, all together
function genBayData2() {
  const [title, pool] = pick(CT_DATA), names = shuffle(pool), vals = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 4);
  const g = `<div class="sub"><b>${esc(title)}</b></div>${VIZ.barGraph(names.map((x, i) => [x, vals[i]]), 1)}`;
  const form = pick(['count', 'most', 'least', 'more', 'two', 'all']), gist = names.map((x, k) => x.slice(0, 2) + vals[k]).join(' ');
  const lc = k => names[k].toLowerCase(), i = R(0, 3);
  const num = (ask, ans, label, hint) => ({kind: 'num', html: `${g}<div class="sub">${ask}</div>${SLOT}`, say: ask, ans: String(ans), label, hint: BAY.txt(hint)});
  if (form == 'count') return num(`How many ${lc(i)}?`, vals[i], `bar count ${names[i]}: ${gist}`, 'Find the top of the bar. Read the number on the side.');
  if (form == 'most' || form == 'least') {
    const most = form == 'most', a = vals.indexOf(most ? Math.max(...vals) : Math.min(...vals));
    return {kind: 'choice', html: `${g}<div class="sub">Which has the ${most ? 'most' : 'least'}?</div>`, say: `Which has the ${most ? 'most' : 'least'}?`,
      ans: names[a], after: `${names[a]} has the ${most ? 'most' : 'least'}`, choices: names.map(x => ({l: x, v: x})), label: `bar ${form}: ${gist}`,
      hint: BAY.txt(`The ${most ? 'tallest' : 'shortest'} bar is the one with the ${most ? 'most' : 'least'}.`)};
  }
  if (form == 'all') return num('How many in all?', vals.reduce((x, y) => x + y, 0), `bar total: ${gist}`, 'Read each bar, then add all four numbers.');
  const j = pick([0, 1, 2, 3].filter(x => x != i));
  if (form == 'more') {
    const [hi, lo] = vals[i] > vals[j] ? [i, j] : [j, i];
    return num(`How many more ${lc(hi)} than ${lc(lo)}?`, vals[hi] - vals[lo], `bar more ${names[hi]} than ${names[lo]}: ${gist}`, 'Read both bars, then find the difference.');
  }
  return num(`How many ${lc(i)} and ${lc(j)} in all?`, vals[i] + vals[j], `bar two ${names[i]} ${names[j]}: ${gist}`, 'Read both bars, then add the two numbers.');
}

// arr 1: array of dots, r and c in 2-5, with "3 rows of 4" shown; how many in all?
function genBayArr1() {
  const r = R(2, 5), c = R(2, 5);
  return {kind: 'num', html: `${VIZ.array(r, c)}<div class="sub">${r} rows of ${c}</div><div class="sub">How many in all?</div>${SLOT}`,
    say: `${r} rows of ${c}. How many in all?`, ans: String(r * c), label: `array ${r} rows of ${c}`,
    hint: BAY.txt(`Each row has ${c}. Add ${Array(r).fill(c).join(' + ')}.`)};
}

// cnt 5: skip count by 3s, 4s or 100s; 5 terms within 1000, one blank
function genBayCnt5() {
  const step = pick([3, 4, 100]), start = step == 100 ? 100 * R(0, 6) : step * R(0, 30), bi = R(1, 4);
  const seq = [0, 1, 2, 3, 4].map(i => start + i * step);
  return {kind: 'num', html: `<div class="seq">${seq.map((n, i) => (i == bi ? SLOT : n)).join(', ')}</div><div class="sub">Count by ${step}s</div>`,
    say: `Count by ${step}s. ` + seq.map((n, i) => (i == bi ? 'what' : n)).join(', '), ans: String(seq[bi]),
    hint: BAY.txt(`Add ${step} each time. What comes after ${seq[bi - 1]}?`), label: `skip ${seq.map((n, i) => (i == bi ? '_' : n)).join(',')}`};
}

// story 4: two-step add/subtract within 100 (get some then lose some, lose then get, compare then total)
function genBayStory4() {
  const me = S.name || 'Sam', n2 = pick([S.buddy, S.buddy, petN(), ...NAMES].filter(n => n && n !== me));
  const th = pick(THINGS)[0], who = pick([me, n2]), other = who == me ? n2 : me;
  let t, ans, label, hint;
  const form = pick(['gl', 'lg', 'more', 'fewer']);
  if (form == 'gl' || form == 'lg') {
    const a = R(15, 50), b = R(10, 40), c = R(5, Math.min(a + b - 5, 40));
    if (form == 'gl') {
      t = pick([`${who} has ${a} ${th}. ${other} gives ${who} ${b} more. Then ${who} gives away ${c}. How many ${th} does ${who} have now?`,
        `${who} had ${a} ${th}. ${who} found ${b} more and then lost ${c}. How many ${th} are left?`]);
      ans = a + b - c; label = `2-step ${a} + ${b} - ${c}`;
      hint = BAY.steps([`First find how many ${who} has after getting ${b} more.`, `Then take away ${c} from that number.`], 'Do one step at a time.');
    } else {
      const c2 = Math.min(c, a - 1);
      t = `${who} had ${a} ${th}. ${who} gave ${c2} to ${other}. Then ${who} got ${b} more. How many ${th} does ${who} have now?`;
      ans = a - c2 + b; label = `2-step ${a} - ${c2} + ${b}`;
      hint = BAY.steps([`First take away the ${c2} ${who} gave.`, `Then add the ${b} more.`], 'Do one step at a time.');
    }
  } else if (form == 'more') {
    const a = R(10, 40), b = R(5, Math.min(25, 100 - 2 * a));
    t = `${who} has ${a} ${th}. ${other} has ${b} more than ${who}. How many ${th} do they have together?`;
    ans = 2 * a + b; label = `2-step ${a} + (${a} + ${b})`;
    hint = BAY.steps([`First find how many ${other} has: ${b} more than ${a}.`, `Then add ${who}'s ${th} and ${other}'s ${th}.`], 'Do one step at a time.');
  } else {
    const a = R(15, 50), b = R(5, 20);
    t = `${who} has ${a} ${th}. ${other} has ${b} fewer than ${who}. How many ${th} do they have together?`;
    ans = 2 * a - b; label = `2-step ${a} + (${a} - ${b})`;
    hint = BAY.steps([`First find how many ${other} has: ${b} fewer than ${a}.`, `Then add ${who}'s ${th} and ${other}'s ${th}.`], 'Do one step at a time.');
  }
  return {kind: 'num', html: `<p class="story">${words(t)}</p><div>${SLOT}</div>`, say: t, auto: true, ans: String(ans), hint, label};
}

// pat 3: growing number pattern, rule +2..+10 or -2..-10, start 0-50, 4 terms shown, give the 5th
function genBayPat3() {
  const d = R(2, 10), up = coin(), start = up ? R(0, 50) : R(4 * d, Math.max(4 * d, 50)), s = up ? d : -d;
  const seq = [0, 1, 2, 3, 4].map(i => start + i * s);
  return {kind: 'num', html: `<div class="seq">${seq.slice(0, 4).join(', ')}, ${SLOT}</div><div class="sub">What comes next?</div>`,
    say: `${seq.slice(0, 4).join(', ')}, what comes next?`, ans: String(seq[4]), label: `grow ${seq.slice(0, 4).join(',')}`,
    hint: BAY.txt(`What is ${up ? 'added' : 'taken away'} each time? Look at ${seq[0]} and ${seq[1]}.`)};
}
