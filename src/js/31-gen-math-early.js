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
