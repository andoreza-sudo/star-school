/* ---------- Block Builder (isometric) ----------
   G-01 (R-02 section 3): rebuilt so a 5-year-old can build by touch and a 10-year-old has depth. The world data, the saved
   worlds and the blocks' ids are unchanged; the play screen, the camera, the tools, the blueprints, the menu and the look are new.

   Touch: a short tap builds (or breaks / stamps / lights, by the tool); one finger dragged moves the view; two fingers pinch to
   zoom; press and hold, then slide: the magnifier bubble and the place-here outline follow the finger, lifting places it (and,
   with Line / Wall / Floor / Clear area, the slide draws the shape). A Build tap on a column puts the block on top of that column
   (the "Build on the sides" switch in More puts it beside the face you touched). A Build tap never lights TNT: lighting is the Boom tool.
   Camera: Closer / Farther keep the middle of the view, Left / Right turn the island a quarter with an animation, every edge can be
   brought to the middle by dragging. It opens close up: a block's top is at least 52 CSS px wide.
   Blueprints: only the next layer is drawn as see-through blocks (the layers above are faint and cannot be tapped); a tap is matched
   to a see-through block of that layer first (under the finger, then the column the finger is on, then the nearest one), so a child
   is never told off for the app's own aim; a wrong block counts one mistake per spot and shows the right block in the palette.
   Undo and Redo restore the blocks, the progress and the mistake count together.

   Save (ROADMAP save-field table): S.bb = {worlds: [{name, d, e?, goals?, n?, kinds?}], cur, ch?, bp?}. New and optional:
   bp {blueprintId: stars} (from the old index array ch on first read, ch kept and still written for the old blueprints),
   and per world goals {goalId: 1}, n (blocks built) and kinds (block ids used) for the free-build goals.
   Colours: every colour on the canvas comes from an --ill-* or --sc-* token (bbCol); nothing here is a raw colour.
   Logic that needs no screen (bbMake: camera, drawing order, hit test, targets, blueprint layers, undo) is tested in Node
   (tools/test.js "block builder G-01"); the play screen around it is blockBuilder(). */

const BW = 16, BD = 16, BH = 14;
const bbI = (x, y, z) => (z * BD + y) * BW + x;
// block ids are saved in worlds: never renumber. deco: drawn as a small picture standing on the cell, not a cube.
const BLOCKS = [null,
  { k: 'grass', n: 'Grass' }, { k: 'dirt', n: 'Dirt' }, { k: 'stone', n: 'Stone' }, { k: 'planks', n: 'Planks' }, { k: 'log', n: 'Log' },
  { k: 'leaves', n: 'Leaves', see: 1 }, { k: 'glass', n: 'Glass', see: 1 }, { k: 'brick', n: 'Brick' }, { k: 'sand', n: 'Sand' },
  { k: 'water', n: 'Water', see: 1 }, { k: 'snow', n: 'Snow' }, { k: 'wool', n: 'Pink Wool' }, { k: 'blue', n: 'Blue Wool' },
  { k: 'gold', n: 'Gold', need: 100 }, { k: 'diamond', n: 'Diamond', need: 200 }, { k: 'rainbow', n: 'Rainbow', need: 300 },
  { k: 'flower', n: 'Flower', deco: 1 }, { k: 'mush', n: 'Mushroom', deco: 1 }, { k: 'pet', n: 'My Pet', deco: 1 },
  { k: 'tnt', n: 'TNT' }, { k: 'lava', n: 'Lava', glow: 'orange' }, { k: 'lamp', n: 'Lamp', glow: 'yellow' }, { k: 'pumpkin', n: 'Pumpkin' },
  { k: 'cactus', n: 'Cactus' }, { k: 'obsidian', n: 'Obsidian' }, { k: 'ice', n: 'Ice', see: 1 }];
const BB_TNT = 20, BB_PET = 19;
// the palette, grouped; TNT is last (R-02 M3)
const BB_GROUPS = [
  ['Nature', [1, 2, 3, 9, 10, 11, 26, 5, 6, 24, 23, 17, 18]],
  ['Building', [4, 8, 7, 12, 13, 22, 25, 14, 15, 16]],
  ['Special', [19, 21, 20]],
];
const BBPAL = BB_GROUPS.flatMap(g => g[1]);
const bbSolid = v => !!v && !BLOCKS[v].deco;
const bbOpaque = v => !!v && !BLOCKS[v].see && !BLOCKS[v].deco;

/* ---- colours: tokens only ---- */
const BBCOL = {};
// t: an --ill-* name ('green', 'green-1', 'ink') or 'sc:<name>' for an --sc-* scene token; '' when there is no page (tests)
function bbCol(t) {
  if (BBCOL[t] != null) return BBCOL[t];
  let v = '';
  try {
    const name = t.slice(0, 3) == 'sc:' ? '--sc-' + t.slice(3) : '--ill-' + t;
    v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  } catch (e) { v = ''; }
  return (BBCOL[t] = v);
}
function bbRgb(t) {
  const h = bbCol(t).replace('#', '');
  return h.length >= 6 ? [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)) : [128, 128, 128];
}
const bbA = (t, a) => 'rgba(' + bbRgb(t).join(',') + ',' + a + ')';

/* ---- block faces, drawn in the app's object-art style: soft volume, light from the top left (R-02 C2) ---- */
const BBT = 32, BBTEX = {};
function bbCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h || w;
  return c;
}
function bbRR(x, X, Y, W, H, r) {
  x.beginPath();
  x.moveTo(X + r, Y);
  x.arcTo(X + W, Y, X + W, Y + H, r);
  x.arcTo(X + W, Y + H, X, Y + H, r);
  x.arcTo(X, Y + H, X, Y, r);
  x.arcTo(X, Y, X + W, Y, r);
  x.closePath();
}
function bbTex(k) {
  if (BBTEX[k]) return BBTEX[k];
  let x, r;
  const mk = f => {
    const c = bbCanvas(BBT);
    x = c.getContext('2d');
    r = rng(k.length * 131 + k.charCodeAt(0) * 7 + 3);
    f();
    x.globalAlpha = 1;
    return c;
  };
  const fill = (t, a = 1) => { x.globalAlpha = a; x.fillStyle = bbCol(t); x.fillRect(0, 0, BBT, BBT); };
  const rect = (t, X, Y, W, H, a = 1) => { x.globalAlpha = a; x.fillStyle = bbCol(t); x.fillRect(X, Y, W, H); };
  const rr = (t, X, Y, W, H, rad, a = 1) => { x.globalAlpha = a; x.fillStyle = bbCol(t); bbRR(x, X, Y, W, H, rad); x.fill(); };
  const dot = (t, X, Y, R, a = 1) => { x.globalAlpha = a; x.fillStyle = bbCol(t); x.beginPath(); x.arc(X, Y, R, 0, 7); x.fill(); };
  const ell = (t, X, Y, rx, ry, a = 1) => { x.globalAlpha = a; x.fillStyle = bbCol(t); x.beginPath(); x.ellipse(X, Y, rx, ry, 0, 0, 7); x.fill(); };
  const line = (t, w, pts, a = 1) => {
    x.globalAlpha = a; x.strokeStyle = bbCol(t); x.lineWidth = w; x.lineCap = x.lineJoin = 'round';
    x.beginPath(); pts.forEach(([X, Y], i) => i ? x.lineTo(X, Y) : x.moveTo(X, Y)); x.stroke();
  };
  const R = (a, b) => a + r() * (b - a);
  // the soft edge every opaque face gets: a light rim top and left, a shade rim bottom and right
  const bevel = (s = 1) => {
    rect('white', 0, 0, BBT, 2.5, .3 * s); rect('white', 0, 0, 2.5, BBT, .2 * s);
    rect('ink', 0, BBT - 2.5, BBT, 2.5, .16 * s); rect('ink', BBT - 2.5, 0, 2.5, BBT, .1 * s);
  };
  const dirt = () => {
    fill('brown');
    for (let i = 0; i < 7; i++) { const X = R(3, 29), Y = R(10, 29), q = R(1.4, 2.6); ell('brown-2', X + .6, Y + .7, q, q * .75, .7); ell('brown-1', X, Y, q, q * .75, .8); }
  };
  // a soft frosting on top of a side face (grass, snow): scallops with a shade under them
  const cap = (t, sh, hi) => {
    const sc = (dy, c, a) => {
      x.globalAlpha = a; x.fillStyle = bbCol(c); x.beginPath(); x.moveTo(0, 0); x.lineTo(32, 0); x.lineTo(32, 7 + dy);
      for (let i = 3; i >= 0; i--) x.arc(4 + i * 8, 7 + dy, 4, 0, Math.PI, false);
      x.closePath(); x.fill();
    };
    sc(1.6, sh, .55); sc(0, t, 1); rect(hi, 0, 0, BBT, 2.4, .8);
  };
  const knit = (b, d, h) => {
    fill(b);
    for (let y = 2; y < 32; y += 6) for (let X = 2; X < 32; X += 6) line(d, 1.4, [[X, y], [X + 3, y + 3.5], [X + 6, y]], .55);
    for (let i = 0; i < 5; i++) dot(h, R(4, 28), R(4, 28), 1.3, .6);
  };
  let top, side;
  switch (k) {
    case 'grass':
      top = mk(() => {
        fill('green');
        for (let i = 0; i < 5; i++) dot('green-1', R(4, 28), R(4, 28), R(3, 5), .38);
        for (let i = 0; i < 7; i++) ell('green-2', R(3, 29), R(3, 29), 1, 2.4, .5);
        bevel();
      });
      side = mk(() => { dirt(); cap('green', 'green-3', 'green-1'); bevel(); });
      break;
    case 'dirt': top = side = mk(() => { dirt(); bevel(); }); break;
    case 'stone':
      top = side = mk(() => {
        fill('grey-2');
        for (const [X, Y, W, H] of [[1, 1, 14, 9], [16, 1, 15, 12], [1, 11, 10, 10], [12, 14, 19, 8], [1, 22, 13, 9], [15, 23, 16, 8]]) {
          rr('grey', X, Y, W - 1, H - 1, 3); rr('grey-1', X + 1.5, Y + 1.2, (W - 1) * .55, 2, 1, .75);
        }
        bevel(.6);
      });
      break;
    case 'planks':
      top = side = mk(() => {
        fill('tan');
        for (const y of [0, 8, 16, 24]) {
          rect('tan-1', 0, y + 1, BBT, 1.2, .7);
          line('tan-2', 1, [[R(2, 8), y + 4], [R(14, 22), y + 4.5]], .55);
          rect('tan-3', 0, y + 7, BBT, 1.4, .75);
          rect('tan-3', [9, 23, 5, 18][y / 8], y, 1.4, 8, .6);
        }
        bevel();
      });
      break;
    case 'log':
      side = mk(() => {
        fill('brown-2');
        for (let i = 0; i < 5; i++) { rr('brown', 2 + i * 6.4, 0, 3.4, BBT, 1.7, .85); rect('brown-1', 2.6 + i * 6.4, 0, 1, BBT, .4); }
        bevel();
      });
      top = mk(() => {
        fill('brown-2'); dot('tan', 16, 16, 13);
        x.globalAlpha = .8; x.strokeStyle = bbCol('tan-2'); x.lineWidth = 1.4;
        for (const q of [4, 8, 11]) { x.beginPath(); x.arc(16, 16, q, 0, 7); x.stroke(); }
        dot('tan-3', 16, 16, 1.6); dot('tan-1', 11, 11, 3, .5);
      });
      break;
    case 'leaves':
      top = side = mk(() => {
        fill('green-2');
        for (let i = 0; i < 14; i++) dot('green', R(2, 30), R(2, 30), R(3.5, 5));
        for (let i = 0; i < 9; i++) dot('green-1', R(3, 29), R(3, 29), R(1.4, 2.4), .8);
        for (let i = 0; i < 5; i++) dot('green-3', R(3, 29), R(3, 29), 1.2, .5);
      });
      break;
    case 'glass':
      top = side = mk(() => {
        fill('aqua-1', .35);
        x.globalAlpha = .95; x.strokeStyle = bbCol('white'); x.lineWidth = 3; x.strokeRect(1.5, 1.5, 29, 29);
        line('white', 2, [[7, 21], [15, 13]], .8); line('white', 2, [[11, 25], [21, 15]], .55);
      });
      break;
    case 'brick':
      top = side = mk(() => {
        fill('cream-2');
        for (let row = 0; row < 4; row++) for (let c = -1; c < 3; c++) {
          const X = c * 16 + (row % 2) * 8 + 1, Y = row * 8 + 1;
          rr('red-2', X, Y, 14.5, 6.6, 2); rr('red', X, Y, 13.6, 5.8, 2); rect('red-1', X + 2, Y + 1, 8, 1.2, .55);
        }
        bevel(.6);
      });
      break;
    case 'sand':
      top = side = mk(() => {
        fill('tan-1');
        for (let i = 0; i < 18; i++) dot('tan', R(2, 30), R(2, 30), R(.8, 1.5), .85);
        line('tan-2', 1.2, [[4, 12], [8, 10], [12, 12], [16, 10]], .4); line('tan-2', 1.2, [[16, 24], [20, 22], [24, 24], [28, 22]], .4);
        bevel(.8);
      });
      break;
    case 'water':
      top = side = mk(() => {
        fill('blue', .72);
        for (const [X, Y] of [[5, 8], [17, 5], [10, 19], [22, 17], [6, 28], [24, 27]]) line('blue-1', 1.6, [[X, Y], [X + 3, Y - 2], [X + 6, Y]], .9);
        dot('white', 9, 7, 1.2, .55); dot('white', 24, 22, 1, .45);
      });
      break;
    case 'snow':
      top = mk(() => { fill('white'); for (let i = 0; i < 6; i++) dot('white-2', R(4, 28), R(4, 28), R(3, 5), .55); bevel(.6); });
      side = mk(() => { dirt(); cap('white', 'white-3', 'white'); bevel(); });
      break;
    case 'wool': top = side = mk(() => { knit('pink', 'pink-2', 'pink-1'); bevel(); }); break;
    case 'blue': top = side = mk(() => { knit('blue', 'blue-2', 'blue-1'); bevel(); }); break;
    case 'gold':
      top = side = mk(() => {
        fill('yellow');
        x.globalAlpha = .7; x.fillStyle = bbCol('yellow-1'); x.beginPath(); x.moveTo(4, 0); x.lineTo(14, 0); x.lineTo(0, 14); x.lineTo(0, 4); x.fill();
        x.beginPath(); x.moveTo(20, 0); x.lineTo(24, 0); x.lineTo(0, 24); x.lineTo(0, 20); x.fill();
        x.globalAlpha = 1; x.strokeStyle = bbCol('yellow-2'); x.lineWidth = 2.5; x.strokeRect(1.25, 1.25, 29.5, 29.5);
        dot('white', 23, 9, 1.6, .9);
      });
      break;
    case 'diamond':
      top = side = mk(() => {
        fill('aqua');
        for (const [a, b, c, t, al] of [[[0, 0], [16, 0], [0, 16], 'aqua-1', .7], [[32, 32], [16, 32], [32, 16], 'aqua-2', .6], [[16, 0], [32, 0], [16, 16], 'aqua-1', .35]]) {
          x.globalAlpha = al; x.fillStyle = bbCol(t); x.beginPath(); x.moveTo(...a); x.lineTo(...b); x.lineTo(...c); x.fill();
        }
        dot('white', 9, 9, 1.8, .9); dot('white', 22, 20, 1.3, .8);
        bevel(.6);
      });
      break;
    case 'rainbow':
      top = side = mk(() => {
        ['red', 'orange', 'yellow', 'green', 'blue', 'purple'].forEach((t, i) => rect(t, 0, i * 32 / 6, BBT, 32 / 6 + .5));
        rect('white', 0, 0, BBT, 12, .18); bevel(.6);
      });
      break;
    case 'tnt': // an original "boom box": a red crate with a lightning mark and a fuse (not the famous striped block)
      side = mk(() => {
        fill('red-2'); rr('red', 3, 3, 26, 26, 5); rr('red-1', 5, 5, 22, 3, 1.5, .5);
        const bolt = [[18, 5], [9, 17], [15, 17], [12, 27], [23, 13], [17, 13], [20, 5]];
        for (const [t, d] of [['yellow-2', 1], ['yellow', 0]]) {
          x.globalAlpha = 1; x.fillStyle = bbCol(t); x.beginPath(); bolt.forEach(([X, Y], i) => i ? x.lineTo(X + d, Y + d) : x.moveTo(X + d, Y + d)); x.fill();
        }
      });
      top = mk(() => {
        fill('red-2'); rr('red', 3, 3, 26, 26, 5); dot('cream', 16, 16, 6.5);
        line('ink-2', 2.6, [[16, 16], [19, 12], [16, 9], [20, 6]]); dot('yellow', 21, 5.5, 2.8); dot('orange', 21, 5.5, 1.3);
      });
      break;
    case 'lava':
      top = side = mk(() => {
        fill('orange-2');
        for (let i = 0; i < 8; i++) dot('orange', R(3, 29), R(3, 29), R(3.5, 6));
        for (let i = 0; i < 7; i++) dot('yellow', R(3, 29), R(3, 29), R(1.4, 2.6), .9);
        for (let i = 0; i < 4; i++) dot('red-2', R(3, 29), R(3, 29), 1.4, .5);
      });
      break;
    case 'lamp':
      top = side = mk(() => {
        fill('yellow-2');
        const g = x.createRadialGradient(16, 16, 2, 16, 16, 15);
        g.addColorStop(0, bbCol('yellow-1')); g.addColorStop(1, bbCol('yellow'));
        x.globalAlpha = 1; x.fillStyle = g; x.fillRect(3, 3, 26, 26);
        x.strokeStyle = bbCol('brown-2'); x.lineWidth = 3; x.strokeRect(1.5, 1.5, 29, 29);
        rect('brown-2', 15, 3, 2, 26, .45); rect('brown-2', 3, 15, 26, 2, .45);
      });
      break;
    case 'pumpkin':
      side = mk(() => {
        fill('orange');
        for (const X of [7, 15, 23]) rr('orange-2', X, 0, 2.6, BBT, 1.3, .7);
        for (const X of [3, 11, 19, 27]) rect('orange-1', X, 2, 1.6, 26, .5);
        bevel();
      });
      top = mk(() => { fill('orange'); dot('orange-2', 16, 16, 9, .35); rr('green-2', 13.5, 11, 5, 9, 2); ell('green', 22, 15, 4.5, 2.6); bevel(); });
      break;
    case 'cactus':
      side = mk(() => {
        fill('green');
        for (const X of [4, 12, 20, 28]) rr('green-2', X - 1.2, 0, 2.4, BBT, 1.2, .8);
        for (const X of [8, 16, 24]) rect('green-1', X - .8, 0, 1.6, BBT, .6);
        for (let i = 0; i < 8; i++) dot('cream-1', R(3, 29), R(3, 29), .9);
      });
      top = mk(() => { fill('green-2'); dot('green', 16, 16, 12); dot('green-1', 14, 14, 5, .8); dot('pink', 16, 16, 2.6); bevel(.6); });
      break;
    case 'obsidian':
      top = side = mk(() => {
        fill('purple-3');
        for (let i = 0; i < 7; i++) dot('ink-2', R(3, 29), R(3, 29), R(2.5, 5), .7);
        for (let i = 0; i < 5; i++) dot('purple-1', R(3, 29), R(3, 29), R(.8, 1.4), .9);
        bevel(.8);
      });
      break;
    case 'ice':
      top = side = mk(() => {
        fill('aqua-1', .8);
        line('white', 1.2, [[4, 6], [10, 12], [9, 18], [15, 24]], .8); line('white', 1.2, [[22, 4], [20, 12], [27, 17]], .7);
        rect('white', 5, 4, 7, 1.6, .6); x.globalAlpha = .9; x.strokeStyle = bbCol('white'); x.lineWidth = 2; x.strokeRect(1, 1, 30, 30);
      });
      break;
    default: top = side = mk(() => { fill('grey'); bevel(); });
  }
  return (BBTEX[k] = { top, side });
}
// pre-shaded copies of a block's faces: t top, l left-facing side (light), r right-facing side (shade); n = night
const BBFACE = {};
function bbFaceImgs(v) {
  if (BBFACE[v]) return BBFACE[v];
  const T = bbTex(BLOCKS[v].k), o = {};
  const shade = (src, a, night) => {
    const c = bbCanvas(BBT), x = c.getContext('2d');
    x.drawImage(src, 0, 0);
    x.globalCompositeOperation = 'source-atop';
    if (a) { x.fillStyle = bbA('ink', a); x.fillRect(0, 0, BBT, BBT); }
    if (night) { x.fillStyle = bbA('purple-3', .38); x.fillRect(0, 0, BBT, BBT); }
    return c;
  };
  o.t = shade(T.top, 0); o.l = shade(T.side, .1); o.r = shade(T.side, .26);
  o.tn = shade(T.top, .2, 1); o.ln = shade(T.side, .32, 1); o.rn = shade(T.side, .45, 1);
  return (BBFACE[v] = o);
}
// a block's flat colours (for the quick drawing while the view turns, particles, previews): top, left, right
const BBFLAT = {};
function bbFlat3(v) {
  if (BBFLAT[v]) return BBFLAT[v];
  const avg = img => {
    let c = [128, 128, 128];
    try {
      const d = img.getContext('2d').getImageData(0, 0, BBT, BBT).data, s = [0, 0, 0];
      let n = 0;
      for (let i = 0; i < d.length; i += 4) if (d[i + 3] > 40) { s[0] += d[i]; s[1] += d[i + 1]; s[2] += d[i + 2]; n++; }
      if (n) c = s.map(q => Math.round(q / n));
    } catch (e) {}
    return c;
  };
  let t = [128, 128, 128], sd = t;
  try { const T = bbTex(BLOCKS[v].k); t = avg(T.top); sd = avg(T.side); } catch (e) {}
  const al = ['glass', 'water', 'ice'].includes(BLOCKS[v].k) ? .6 : 1;
  const f = (c, m) => 'rgba(' + c.map(q => Math.round(q * m)).join(',') + ',' + al + ')';
  return (BBFLAT[v] = [f(t, 1), f(sd, .9), f(sd, .74), t]);
}

/* ---- small pictures standing on a cell: flower, mushroom and the child's drawn pet (R-02 #28: not the emoji) ---- */
const BBSPR = {};
let BBPETIMG = null;
function bbPetImg(redraw) {
  if (BBPETIMG && BBPETIMG.st == stage(S.stars) && BBPETIMG.kind == S.pet) {
    if (!BBPETIMG.img && redraw) BBPETIMG.wait.push(redraw); // still loading: draw again when it is ready
    return BBPETIMG.img;
  }
  try {
    // the pet rig colours are CSS roles (var(--pc-*)): resolve them on a hidden copy, then make an image of the result
    const host = document.createElement('div');
    host.style.cssText = 'position:absolute;left:-9999px;top:0;width:200px;height:200px;pointer-events:none';
    host.innerHTML = petSVG(S.pet, stage(S.stars), 'happy');
    document.body.appendChild(host);
    const svg = host.querySelector('svg');
    for (const el of svg.querySelectorAll('*')) {
      const cs = getComputedStyle(el);
      if (el.getAttribute('fill') && el.getAttribute('fill') != 'none') el.setAttribute('fill', cs.fill);
      if (el.getAttribute('stroke') && el.getAttribute('stroke') != 'none') el.setAttribute('stroke', cs.stroke);
    }
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', '200');
    svg.setAttribute('height', '200');
    const src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.outerHTML);
    host.remove();
    const img = new Image();
    const me = BBPETIMG = { img: null, st: stage(S.stars), kind: S.pet, wait: redraw ? [redraw] : [] };
    img.onload = () => { me.img = img; for (const f of me.wait.splice(0)) try { f(); } catch (e) {} };
    img.src = src;
  } catch (e) { BBPETIMG = { img: null, st: stage(S.stars), kind: S.pet, wait: [] }; }
  return null;
}
function bbSprite(k) {
  if (BBSPR[k]) return BBSPR[k];
  const c = bbCanvas(64), x = c.getContext('2d');
  const dot = (t, X, Y, R, a = 1) => { x.globalAlpha = a; x.fillStyle = bbCol(t); x.beginPath(); x.arc(X, Y, R, 0, 7); x.fill(); };
  const ell = (t, X, Y, rx, ry, a = 1, rot = 0) => { x.globalAlpha = a; x.fillStyle = bbCol(t); x.beginPath(); x.ellipse(X, Y, rx, ry, rot, 0, 7); x.fill(); };
  ell('ink', 32, 60, 14, 3.5, .14);
  if (k == 'flower') {
    x.globalAlpha = 1; x.strokeStyle = bbCol('green-2'); x.lineWidth = 4; x.lineCap = 'round';
    x.beginPath(); x.moveTo(32, 60); x.quadraticCurveTo(30, 44, 32, 30); x.stroke();
    ell('green', 24, 48, 7, 3.5, 1, -.5); ell('green', 40, 44, 7, 3.5, 1, .5);
    for (let i = 0; i < 5; i++) { const a = i * Math.PI * 2 / 5 - Math.PI / 2; dot('pink-2', 33 + Math.cos(a) * 9, 23 + Math.sin(a) * 9, 7.5); dot('pink', 32 + Math.cos(a) * 9, 22 + Math.sin(a) * 9, 7); }
    dot('yellow-2', 33, 23, 5.5); dot('yellow', 32, 22, 4.6); dot('white', 30, 20, 1.6, .7);
  } else if (k == 'mush') {
    x.globalAlpha = 1; x.fillStyle = bbCol('cream-2'); bbRR(x, 24, 34, 17, 25, 7); x.fill();
    x.fillStyle = bbCol('cream'); bbRR(x, 23, 34, 14, 24, 6); x.fill();
    for (const [t, d] of [['red-2', 1.5], ['red', 0]]) { x.fillStyle = bbCol(t); x.beginPath(); x.ellipse(32 + d, 34 + d, 24, 20, 0, Math.PI, 0); x.closePath(); x.fill(); }
    dot('white', 22, 26, 4); dot('white', 36, 20, 3.6); dot('white', 45, 29, 3); ell('white', 25, 18, 5, 2.5, .45, -.5);
  }
  x.globalAlpha = 1;
  return (BBSPR[k] = c);
}

/* ---- worlds ---- */
// S.bb, with defaults filled in place (the same object every time, so a screen may keep it)
function bbS() {
  if (!S.bb || typeof S.bb != 'object' || Array.isArray(S.bb)) S.bb = { worlds: [], cur: 0 };
  const b = S.bb;
  if (!Array.isArray(b.worlds)) b.worlds = [];
  if (b.worlds.some(w => !w || typeof w.d != 'string')) b.worlds = b.worlds.filter(w => w && typeof w.d == 'string');
  if (!b.worlds.length) b.worlds.push({ name: 'My Island', d: bbEncode(bbGen('island', 7)) });
  if (!(b.cur >= 0 && b.cur < b.worlds.length)) b.cur = 0;
  return b;
}
function bbGen(type, seed) {
  const r = rng(seed * 31 + 5), w = new Uint8Array(BW * BD * BH), p = [r() * 6, r() * 6, r() * 6, r() * 6];
  const set = (x, y, z, v) => { if (x >= 0 && y >= 0 && x < BW && y < BD && z >= 0 && z < BH) w[bbI(x, y, z)] = v; };
  if (type == 'flat') { for (let x = 0; x < BW; x++) for (let y = 0; y < BD; y++) w[bbI(x, y, 0)] = 1; return w; }
  const H = (x, y) => Math.sin(x * .45 + p[0]) * 1.2 + Math.sin(y * .38 + p[1]) * 1.2 + Math.sin((x + y) * .25 + p[2]) * 1.5 + Math.sin((x - y) * .6 + p[3]) * .6;
  for (let x = 0; x < BW; x++) for (let y = 0; y < BD; y++) {
    const dc = Math.hypot(x - 7.5, y - 7.5) / 8;
    let h;
    if (type == 'island') h = Math.round(2.6 + H(x, y) * .8 - dc * dc * 4.2);
    else if (type == 'mountain') h = Math.round(3 + H(x, y) * 1.4 + (1 - dc) * 5.5);
    else h = Math.round(1.6 + H(x, y) * .6);
    if (type == 'island' && h < 1) { set(x, y, 0, 10); continue; }
    h = Math.max(1, Math.min(BH - 3, h));
    for (let z = 0; z < h; z++) {
      const top = z == h - 1;
      let v;
      if (type == 'desert') v = z < h - 2 ? 3 : 9;
      else if (type == 'mountain') v = top ? (z >= 7 ? 11 : z >= 5 ? 3 : 1) : (z < h - 3 ? 3 : 2);
      else v = top ? (h <= 2 && dc > .55 ? 9 : 1) : (z < h - 2 ? 3 : 2);
      set(x, y, z, v);
    }
    const T = h;
    if (type == 'island' && w[bbI(x, y, T - 1)] == 1 && r() < .07 && x > 1 && y > 1 && x < BW - 2 && y < BD - 2) {
      for (let z = T; z < T + 3; z++) set(x, y, z, 5);
      for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (let z = T + 2; z < T + 4; z++) {
        if (!(a == 0 && b == 0 && z == T + 2) && !(Math.abs(a) + Math.abs(b) == 2 && z == T + 3)) set(x + a, y + b, z, 6);
      }
    } else if (type == 'island' && w[bbI(x, y, T - 1)] == 1 && r() < .06) set(x, y, T, r() < .6 ? 17 : 18);
    else if (type == 'desert' && r() < .045) { const n = 2 + Math.floor(r() * 2); for (let z = T; z < T + n; z++) set(x, y, z, 24); }
    else if (type == 'mountain' && w[bbI(x, y, T - 1)] == 1 && r() < .08) { set(x, y, T, 5); set(x, y, T + 1, 6); set(x, y, T + 2, 6); }
  }
  if (type == 'desert') { for (let x = 1; x < 5; x++) for (let y = 10; y < 14; y++) if (Math.max(Math.abs(x - 2.5), Math.abs(y - 11.5)) < 2) set(x, y, 1, 10); }
  return w;
}
function bbFlat() {
  const w = new Uint8Array(BW * BD * BH);
  for (let x = 0; x < BW; x++) for (let y = 0; y < BD; y++) w[bbI(x, y, 0)] = 1;
  return w;
}
const bbEncode = w => { let s = ''; for (let i = 0; i < w.length; i += 4096) s += String.fromCharCode(...w.subarray(i, i + 4096)); return btoa(s); };
// a saved world: 16 x 16 x 14 bytes, or the oldest 12 x 12 x 10 worlds (put in the middle of a sea)
const bbDecode = s => {
  try {
    const b = atob(s), w = new Uint8Array(BW * BD * BH);
    if (b.length == 1440) {
      for (let x = 0; x < BW; x++) for (let y = 0; y < BD; y++) w[bbI(x, y, 0)] = 10;
      for (let z = 0; z < 10; z++) for (let y = 0; y < 12; y++) for (let x = 0; x < 12; x++) {
        const v = b.charCodeAt((z * 12 + y) * 12 + x);
        if (v || z == 0) w[bbI(x + 2, y + 2, z)] = v;
      }
      return w;
    }
    for (let i = 0; i < Math.min(b.length, w.length); i++) { const v = b.charCodeAt(i); w[i] = v < BLOCKS.length ? v : 0; }
    return w;
  } catch (e) { return bbGen('island', 1); }
};

let BB = null;
// stamps: offsets from the tapped cell (the view's turn is applied so a stamp faces the child)
const BBSTAMPS = (() => {
  const L = [];
  const add = (n, f) => { const c = []; f((x, y, z, v) => c.push([x, y, z, v])); L.push({ n, c }); };
  add('Tree', p => { for (let z = 0; z < 4; z++) p(0, 0, z, 5); for (let x = -2; x <= 2; x++) for (let y = -2; y <= 2; y++) for (let z = 3; z <= 4; z++) if (!(Math.abs(x) == 2 && Math.abs(y) == 2) && !(x == 0 && y == 0 && z == 3)) p(x, y, z, 6); for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) if (!(x && y)) p(x, y, 5, 6); });
  add('House', p => { for (let x = -2; x <= 2; x++) for (let y = -2; y <= 2; y++) { const edge = Math.abs(x) == 2 || Math.abs(y) == 2; if (edge) for (let z = 0; z < 3; z++) { if (x == 0 && y == 2 && z < 2) continue; p(x, y, z, z == 1 && ((Math.abs(x) == 2 && y == 0) || (x == 0 && y == -2) || (Math.abs(x) == 1 && y == 2)) ? 7 : 4); } p(x, y, 3, 8); } for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) p(x, y, 4, 8); p(0, 0, 5, 8); p(0, 0, 0, 22); });
  add('Tower', p => { for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) { if (!x && !y) continue; for (let z = 0; z < 6; z++) p(x, y, z, z == 3 && (!x || !y) ? 7 : 3); if (x && y) p(x, y, 6, 3); } p(0, 0, 5, 14); });
  add('Pool', p => { for (let x = -2; x <= 2; x++) for (let y = -2; y <= 2; y++) p(x, y, 0, Math.abs(x) == 2 || Math.abs(y) == 2 ? 3 : 10); });
  add('Car', p => { for (let x = -2; x <= 1; x++) for (let y = 0; y <= 1; y++) { p(x, y, 1, 12); if (x == -2 || x == 1) p(x, y, 0, 25); } p(-1, 0, 2, 7); p(0, 0, 2, 7); p(-1, 1, 2, 7); p(0, 1, 2, 7); p(2, 0, 1, 22); p(2, 1, 1, 22); });
  add('Rocket', p => { for (let z = 0; z < 6; z++) p(0, 0, z, z == 4 ? 7 : 11); p(0, 0, 6, 12); p(0, 0, 7, 12); for (const [x, y] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (let z = 0; z < 2; z++) p(x, y, z, 13); });
  add('Snowman', p => { for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) p(x, y, 0, 11); for (const [x, y] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) p(x, y, 1, 11); p(0, 0, 2, 11); p(0, 0, 3, 23); p(0, 0, 4, 13); });
  add('Pyramid', p => { for (let k = 0; k < 3; k++) for (let x = -3 + k; x <= 3 - k; x++) for (let y = -3 + k; y <= 3 - k; y++) p(x, y, k, 9); p(0, 0, 3, 14); });
  add('Lamp Post', p => { for (let z = 0; z < 4; z++) p(0, 0, z, 25); p(0, 0, 4, 22); });
  add('Volcano', p => { for (let k = 0; k < 3; k++) for (let x = -3 + k; x <= 3 - k; x++) for (let y = -3 + k; y <= 3 - k; y++) p(x, y, k, k == 2 && !x && !y ? 21 : k < 1 ? 3 : 25); p(0, 0, 3, 21); });
  add('Bridge', p => { for (let x = -3; x <= 3; x++) { const z = 3 - Math.min(3, Math.abs(x)); p(x, 0, z, 4); p(x, 1, z, 4); p(x, -1, z + 1, 5); p(x, 2, z + 1, 5); } });
  add('Flowers', p => { for (const [x, y] of [[0, 0], [1, 1], [-1, 1], [2, -1], [-2, 0], [1, -2], [-1, -1]]) p(x, y, 0, (x + y) % 2 ? 17 : 18); });
  return L;
})();

/* ---- blueprints: copy the see-through build. Saved by id (S.bb.bp); old: the index in the old list (S.bb.ch) ---- */
const BBP = [
  { id: 'tower', n: 'Stone Tower', old: 0, c: () => [1, 2, 3].map(z => [6, 6, z, 3]) },
  { id: 'stairs', n: 'Stairs', c: () => { const o = []; for (let x = 5; x <= 7; x++) for (let z = 1; z <= 8 - x; z++) o.push([x, 6, z, 4]); return o; } },
  { id: 'wall', n: 'Brick Wall', old: 1, c: () => { const o = []; for (let x = 4; x <= 7; x++) for (let z = 1; z <= 2; z++) o.push([x, 6, z, 8]); return o; } },
  { id: 'gate', n: 'Garden Gate', c: () => { const o = []; for (const x of [5, 8]) for (let z = 1; z <= 3; z++) o.push([x, 6, z, 3]); for (let x = 5; x <= 8; x++) o.push([x, 6, 4, 4]); return o; } },
  { id: 'tree', n: 'Tree', old: 2, c: () => { const o = [[6, 6, 1, 5], [6, 6, 2, 5], [6, 6, 3, 5], [6, 6, 5, 6]]; for (let x = 5; x <= 7; x++) for (let y = 5; y <= 7; y++) o.push([x, y, 4, 6]); return o; } },
  { id: 'bridge', n: 'Rainbow Bridge', old: 5, c: () => [[3, 6, 1, 12], [4, 6, 2, 12], [5, 6, 3, 12], [6, 6, 3, 12], [7, 6, 3, 12], [8, 6, 2, 12], [9, 6, 1, 12], [4, 6, 1, 13], [5, 6, 2, 13], [7, 6, 2, 13], [8, 6, 1, 13], [6, 6, 1, 10], [5, 6, 1, 10], [7, 6, 1, 10]] },
  { id: 'pond', n: 'Pond', old: 3, c: () => { const o = []; for (let x = 4; x <= 7; x++) for (let y = 4; y <= 7; y++) o.push([x, y, 1, x > 4 && x < 7 && y > 4 && y < 7 ? 10 : 9]); return o; } },
  { id: 'snowman', n: 'Snowman', old: 4, c: () => { const o = []; for (let x = 5; x <= 7; x++) for (let y = 5; y <= 7; y++) o.push([x, y, 1, 11]); for (const [x, y] of [[6, 6], [5, 6], [7, 6], [6, 5], [6, 7]]) o.push([x, y, 2, 11]); o.push([6, 6, 3, 11], [6, 6, 4, 13]); return o; } },
  { id: 'boat', n: 'Sail Boat', c: () => { const o = []; for (let x = 4; x <= 8; x++) o.push([x, 6, 1, 4]); for (let x = 5; x <= 7; x++) o.push([x, 5, 1, 4], [x, 7, 1, 4]); o.push([4, 6, 2, 4], [8, 6, 2, 4]); for (let z = 2; z <= 4; z++) o.push([6, 6, z, 5]); o.push([7, 6, 3, 12], [7, 6, 4, 12], [6, 6, 5, 13]); return o; } },
  { id: 'castle', n: 'Castle Tower', old: 7, c: () => { const o = []; for (let x = 5; x <= 7; x++) for (let y = 5; y <= 7; y++) { if (x == 6 && y == 6) continue; for (let z = 1; z <= 3; z++) o.push([x, y, z, 3]); if ((x + y) % 2 == 0) o.push([x, y, 4, 3]); } o.push([6, 6, 1, 14]); return o; } },
  { id: 'house', n: 'Little House', old: 6, c: () => { const o = []; for (let x = 5; x <= 7; x++) for (let y = 5; y <= 7; y++) { if (x == 6 && y == 6) continue; for (let z = 1; z <= 2; z++) { if (x == 6 && y == 7 && z == 1) continue; o.push([x, y, z, x == 5 && y == 6 && z == 2 || x == 7 && y == 6 && z == 2 ? 7 : 4]); } } for (let x = 4; x <= 8; x++) for (let y = 5; y <= 7; y++) o.push([x, y, 3, 8]); return o; } },
  { id: 'pyramid', n: 'Pyramid', old: 8, c: () => { const o = []; for (let x = 4; x <= 8; x++) for (let y = 4; y <= 8; y++) o.push([x, y, 1, 9]); for (let x = 5; x <= 7; x++) for (let y = 5; y <= 7; y++) o.push([x, y, 2, 9]); o.push([6, 6, 3, 14]); return o; } },
  { id: 'palace', n: 'Diamond Palace', old: 9, c: () => { const o = []; for (let x = 3; x <= 8; x++) for (let y = 3; y <= 8; y++) { const edge = x == 3 || x == 8 || y == 3 || y == 8; if (!edge) continue; const corner = (x == 3 || x == 8) && (y == 3 || y == 8); for (let z = 1; z <= (corner ? 4 : 2); z++) o.push([x, y, z, corner ? 3 : (z == 2 && (x == 5 || x == 6 || y == 5 || y == 6) ? 7 : 8)]); } for (let z = 1; z <= 3; z++) o.push([5, 5, z, 15]); o.push([5, 5, 4, 16]); return o; } },
];
const BB_OLD = BBP.filter(b => b.old != null).sort((a, b) => a.old - b.old).map(b => b.id); // the old list's order (S.bb.ch)
const bbGoal = bp => new Map(bp.c().map(([a, b, z, v]) => [bbI(a + 2, b + 2, z), v]));
// blueprint stars by id; made once from the old index array (S.bb.ch), which is kept
function bbBP() {
  const b = bbS();
  if (!b.bp || typeof b.bp != 'object' || Array.isArray(b.bp)) {
    b.bp = {};
    (Array.isArray(b.ch) ? b.ch : []).forEach((s, i) => { const id = BB_OLD[i]; if (id && s > 0) b.bp[id] = Math.min(3, Math.max(b.bp[id] || 0, s | 0)); });
  }
  return b.bp;
}
const bbStars = i => { const s = bbBP()[BBP[i].id]; return s > 0 ? Math.min(3, s | 0) : 0; };
// a blueprint is open when it is the first, or one before it (or itself, or any later one) has stars: nothing done ever locks again
function bbOpen(i) {
  if (i <= 0) return true;
  for (let j = i - 1; j < BBP.length; j++) if (bbStars(j) > 0) return true;
  return false;
}
function bbHubLine() {
  const n = BBP.filter((b, i) => bbStars(i) > 0).length;
  return `<span>Build your own 3D world</span><span>${ico('blocks', 18)}<b>${n} of ${BBP.length}</b> blueprints</span>`;
}

/* ---- free-build goals (saved per world as goals {id: 1}) ---- */
const BB_GOALS = [
  ['ten', 'Build 10 blocks', 'plus'],
  ['tower', 'Build a tower 6 blocks tall', 'arrow-up'],
  ['kinds', 'Use 5 kinds of blocks', 'palette'],
  ['pethouse', 'Make a house for your pet: a roof over My Pet', 'home'],
  ['night', 'Light a lamp at night', 'moon'],
  ['boom', 'Set off a TNT block with Boom', 'sparkle'],
];
const bbGoalsOf = w => (w && w.goals && typeof w.goals == 'object' ? w.goals : {});
const bbGoalN = w => BB_GOALS.filter(g => bbGoalsOf(w)[g[0]]).length;

/* ---- the builder's logic, with no screen: camera, drawing, hit test, targets, blueprint layers, undo ----
   bbMake(w, goal): w the world (Uint8Array), goal a Map index -> block for a blueprint (or null). The play screen sizes it (size),
   draws it (render) and sends it taps (tap). Coordinates passed in are canvas pixels (CSS px x dpr). */
function bbMake(w, goal) {
  const E = {
    w, goal: goal || null, sel: 4, tool: 'build', side: false, miss: 0, missAt: new Set(), undo: [], redo: [], placed: new Set(),
    zoom: 1, F: [8, 8, 2], ang: 0, rot: 0, night: false, faces: [], W: 320, H: 320, dpr: 1, a0: 10, drop: null,
  };
  const get = E.get = (i, j, k) => (i < 0 || j < 0 || k < 0 || i >= BW || j >= BD || k >= BH ? 0 : E.w[bbI(i, j, k)]);
  E.a = () => E.a0 * E.zoom;
  E.size = (W, H, dpr) => {
    E.W = W; E.H = H; E.dpr = dpr || 1;
    E.a0 = Math.min(W / (BW + BD + 2), H / ((BW + BD) / 2 + 7));
  };
  E.zMin = () => .9;
  E.zMax = () => Math.max(3.6, 64 * E.dpr / E.a0);
  // world (x, y, z) -> canvas point; the focus F sits in the middle of the canvas
  E.proj = (X, Y, Z) => {
    const c = Math.cos(E.ang), s = Math.sin(E.ang), A = E.a(), dx = X - E.F[0], dy = Y - E.F[1];
    const rx = dx * c - dy * s, ry = dx * s + dy * c;
    return [E.W / 2 + (rx - ry) * A, E.H / 2 + (rx + ry) * A / 2 - (Z - E.F[2]) * A];
  };
  // canvas point -> world (x, y) on the flat plane at height z
  E.unproj = (px, py, z) => {
    const c = Math.cos(E.ang), s = Math.sin(E.ang), A = E.a();
    const u = (px - E.W / 2) / A, v = 2 * (py - E.H / 2 + (z - E.F[2]) * A) / A, rx = (u + v) / 2, ry = (v - u) / 2;
    return [rx * c + ry * s + E.F[0], -rx * s + ry * c + E.F[1]];
  };
  E.clamp = () => {
    E.zoom = Math.max(E.zMin(), Math.min(E.zMax(), E.zoom));
    E.F[0] = Math.max(0, Math.min(BW, E.F[0]));
    E.F[1] = Math.max(0, Math.min(BD, E.F[1]));
  };
  // move the view so the world follows the finger (dx, dy canvas px)
  E.pan = (dx, dy) => {
    const A = E.a(), c = Math.cos(E.ang), s = Math.sin(E.ang);
    const drx = (-dx / A - 2 * dy / A) / 2, dry = (-2 * dy / A + dx / A) / 2;
    E.F[0] += drx * c + dry * s;
    E.F[1] += -drx * s + dry * c;
    E.clamp();
  };
  // zoom by factor k around canvas point (px, py) (the middle by default: Closer / Farther keep the centre)
  E.zoomAt = (k, px = E.W / 2, py = E.H / 2) => {
    const before = E.unproj(px, py, E.F[2]);
    E.zoom *= k;
    E.clamp();
    const after = E.unproj(px, py, E.F[2]);
    E.F[0] += before[0] - after[0];
    E.F[1] += before[1] - after[1];
    E.clamp();
  };
  // where the view opens: close up (block tops >= 52 CSS px), centred on the island or on the blueprint
  E.home = () => {
    const tops = [];
    let box = null;
    if (E.goal) {
      for (const i of E.goal.keys()) {
        const x = i % BW, y = Math.floor(i / BW) % BD, z = Math.floor(i / (BW * BD));
        box = box ? [Math.min(box[0], x), Math.min(box[1], y), Math.min(box[2], z), Math.max(box[3], x), Math.max(box[4], y), Math.max(box[5], z)] : [x, y, z, x, y, z];
      }
      const wx = box[3] - box[0] + 1, wy = box[4] - box[1] + 1, hz = box[5] + 1;
      const fit = Math.min(.82 * E.W / (wx + wy), .72 * E.H / ((wx + wy) / 2 + hz));
      E.F = [(box[0] + box[3] + 1) / 2, (box[1] + box[4] + 1) / 2, (box[5] + 1) / 2 + .5];
      E.zoom = Math.max(26 * E.dpr, Math.min(fit, 46 * E.dpr)) / E.a0;
    } else {
      for (let i = 0; i < BW; i++) for (let j = 0; j < BD; j++) { const t = E.topZ(i, j); if (t > 0) tops.push(t); }
      const mean = tops.length ? tops.reduce((a, b) => a + b, 0) / tops.length : 1;
      E.F = [BW / 2, BD / 2, Math.max(1, mean)];
      E.zoom = Math.max(1, Math.min(3.4, 26 * E.dpr / E.a0));
    }
    E.clamp();
  };
  // the first cell above the solid blocks of a column (deco counts as empty), from height k
  E.topZ = (i, j, k = 0) => {
    let z = BH - 1;
    while (z >= k && !bbSolid(get(i, j, z))) z--;
    return z + 1;
  };
  E.above = (i, j, k) => { while (k < BH && bbSolid(get(i, j, k))) k++; return k; };

  /* blueprint layers: the lowest height with a see-through block still to build. Only that layer can be built (and tapped). */
  E.layer = () => {
    if (!E.goal) return null;
    let L = null;
    for (const [i, v] of E.goal) if (E.w[i] != v) { const z = Math.floor(i / (BW * BD)); if (L == null || z < L) L = z; }
    return L;
  };
  E.todo = () => { const L = E.layer(); return L == null ? [] : [...E.goal].filter(([i, v]) => E.w[i] != v && Math.floor(i / (BW * BD)) == L).map(([i]) => i); };
  E.prog = () => (E.goal ? [...E.goal].filter(([i, v]) => E.w[i] == v).length : 0);
  E.done = () => !!E.goal && E.prog() == E.goal.size;

  /* history: whole states (blocks + mistakes), so Undo / Redo bring back the progress and the mistake count with the blocks */
  const state = () => ({ w: E.w.slice(), miss: E.miss, at: [...E.missAt] });
  const restore = s => { E.w.set(s.w); E.miss = s.miss; E.missAt = new Set(s.at); };
  E.push = () => { E.undo.push(state()); if (E.undo.length > 40) E.undo.shift(); E.redo.length = 0; };
  E.doUndo = () => { if (!E.undo.length) return false; E.redo.push(state()); restore(E.undo.pop()); return true; };
  E.doRedo = () => { if (!E.redo.length) return false; E.undo.push(state()); restore(E.redo.pop()); return true; };

  /* drawing: painter's order (far to near, low to high) at any turn angle; o.fast = flat colours (while the view turns);
     o.x = the 2D context (null: only the faces for hit testing). Records E.faces: {i, j, k, f, nx, ny, poly, ghost, deco}. */
  E.render = (o = {}) => {
    const x = o.x, fast = !!o.fast || !x, A = E.a(), c = Math.cos(E.ang), s = Math.sin(E.ang), F = E.F, cx = E.W / 2, cy = E.H / 2;
    const P = (X, Y, Z) => { const dx = X - F[0], dy = Y - F[1], rx = dx * c - dy * s, ry = dx * s + dy * c; return [cx + (rx - ry) * A, cy + (rx + ry) * A / 2 - (Z - F[2]) * A]; };
    const sides = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([nx, ny]) => {
      const rx = nx * c - ny * s, ry = nx * s + ny * c;
      return { nx, ny, vis: rx + ry > 1e-6, left: rx - ry < 0 };
    }).filter(q => q.vis);
    const L = E.layer(), faces = [], items = [];
    const drop = E.drop;
    for (let k = 0; k < BH; k++) for (let j = 0; j < BD; j++) for (let i = 0; i < BW; i++) {
      const idx = bbI(i, j, k), v = E.w[idx];
      let g = 0;
      if (!v) { if (E.goal && E.goal.has(idx)) g = E.goal.get(idx); else continue; }
      else if (!BLOCKS[v]) continue;
      if (v) {
        // skip blocks with no face open to the view
        const B = BLOCKS[v], open = (dv) => !bbOpaque(dv) && !(B.see && dv == v);
        if (!B.deco && !open(get(i, j, k + 1)) && !sides.some(q => open(get(i + q.nx, j + q.ny, k)))) continue;
      }
      const dx = i + .5 - F[0], dy = j + .5 - F[1];
      items.push({ i, j, k, v, g, key: (dx * c - dy * s + dx * s + dy * c) * 64 + k });
    }
    items.sort((p, q) => p.key - q.key);
    const tf = (img, O, U, V, grow) => {
      let o0 = O[0], o1 = O[1], u0 = U[0], u1 = U[1], v0 = V[0], v1 = V[1];
      if (grow) { // overlap neighbours by about half a pixel, so no hairline seams show
        const eu = .7 / (Math.hypot(u0, u1) || 1), ev = .7 / (Math.hypot(v0, v1) || 1);
        o0 -= (u0 * eu + v0 * ev) / 2; o1 -= (u1 * eu + v1 * ev) / 2; u0 *= 1 + eu; u1 *= 1 + eu; v0 *= 1 + ev; v1 *= 1 + ev;
      }
      x.setTransform(u0 / BBT, u1 / BBT, v0 / BBT, v1 / BBT, o0, o1);
      x.drawImage(img, 0, 0);
    };
    const poly4 = (O, U, V) => [O, [O[0] + U[0], O[1] + U[1]], [O[0] + U[0] + V[0], O[1] + U[1] + V[1]], [O[0] + V[0], O[1] + V[1]]];
    const fillPoly = (pts, style) => {
      x.fillStyle = style; x.beginPath(); x.moveTo(...pts[0]); for (let n = 1; n < pts.length; n++) x.lineTo(...pts[n]); x.closePath(); x.fill();
    };
    // the faces of one cube at (i, j, k + dz): top and the visible sides that are open
    const cube = (it, cb) => {
      const { i, j, k } = it, dz = it.dz || 0, z1 = k + 1 + dz, z0 = k + dz;
      const O = P(i, j, z1), Ux = P(i + 1, j, z1), Vy = P(i, j + 1, z1);
      cb('top', 0, 0, O, [Ux[0] - O[0], Ux[1] - O[1]], [Vy[0] - O[0], Vy[1] - O[1]]);
      for (const q of sides) {
        let e0, e1;
        if (q.nx == 1) { e0 = [i + 1, j]; e1 = [i + 1, j + 1]; } else if (q.nx == -1) { e0 = [i, j + 1]; e1 = [i, j]; }
        else if (q.ny == 1) { e0 = [i + 1, j + 1]; e1 = [i, j + 1]; } else { e0 = [i, j]; e1 = [i + 1, j]; }
        const So = P(e0[0], e0[1], z1), S1 = P(e1[0], e1[1], z1), Sb = P(e0[0], e0[1], z0);
        cb(q.left ? 'l' : 'r', q.nx, q.ny, So, [S1[0] - So[0], S1[1] - So[1]], [Sb[0] - So[0], Sb[1] - So[1]]);
      }
    };
    for (const it of items) {
      const { i, j, k, v, g } = it;
      if (g) { // a see-through blueprint block
        const cur = k === L, al = cur ? .62 : .1;
        if (x) {
          x.globalAlpha = al;
          const fl = bbFlat3(g), im = fast ? null : bbFaceImgs(g);
          cube(it, (f, nx, ny, O, U, V) => { if (im) tf(im[(f == 'top' ? 't' : f) + (E.night ? 'n' : '')], O, U, V, false); else fillPoly(poly4(O, U, V), fl[f == 'top' ? 0 : f == 'l' ? 1 : 2]); });
          x.setTransform(1, 0, 0, 1, 0, 0);
          x.globalAlpha = 1;
          if (cur) { // a high-contrast outline: dark under a white dashed line
            const outline = () => { x.beginPath(); cube(it, (f, nx, ny, O, U, V) => { const p = poly4(O, U, V); x.moveTo(...p[0]); for (let n = 1; n < 4; n++) x.lineTo(...p[n]); x.closePath(); }); };
            x.lineJoin = 'round'; x.strokeStyle = bbA('ink', .78); x.lineWidth = Math.max(2, A * .09); x.setLineDash([]); outline(); x.stroke();
            x.strokeStyle = bbCol('white'); x.lineWidth = Math.max(1.2, A * .045); x.setLineDash([A * .18, A * .1]); outline(); x.stroke(); x.setLineDash([]);
          }
        }
        if (cur) cube(it, (f, nx, ny, O, U, V) => faces.push({ i, j, k, f: f == 'top' ? 'top' : 'side', nx, ny, poly: poly4(O, U, V), ghost: 1 }));
        continue;
      }
      const B = BLOCKS[v];
      if (drop && drop.i == bbI(i, j, k)) it.dz = drop.dz || 0;
      if (B.deco) {
        const p = P(i + .5, j + .5, k + (it.dz || 0)), sz = A * (B.k == 'pet' ? 2.4 : 1.5); // the pet drawing has room around it
        if (x) {
          x.setTransform(1, 0, 0, 1, 0, 0);
          const img = B.k == 'pet' ? (o.pet || null) : (fast ? null : bbSprite(B.k));
          if (img) x.drawImage(img, p[0] - sz / 2, p[1] - sz * .94, sz, sz);
          else { x.fillStyle = bbCol(B.k == 'pet' ? 'green' : B.k == 'mush' ? 'red' : 'pink'); x.beginPath(); x.arc(p[0], p[1] - A * .5, A * .35, 0, 7); x.fill(); }
        }
        faces.push({ i, j, k, f: 'top', deco: 1, poly: [[p[0] - A * .55, p[1] - A * 1.3], [p[0] + A * .55, p[1] - A * 1.3], [p[0] + A * .55, p[1] + A * .2], [p[0] - A * .55, p[1] + A * .2]] });
        continue;
      }
      const im = fast ? null : bbFaceImgs(v), fl = x ? bbFlat3(v) : null;
      const open = dv => !bbOpaque(dv) && !(B.see && dv == v);
      cube(it, (f, nx, ny, O, U, V) => {
        if (f == 'top' ? !open(get(i, j, k + 1)) : !open(get(i + nx, j + ny, k))) return;
        if (x) {
          if (im) tf(im[(f == 'top' ? 't' : f) + (E.night ? 'n' : '')], O, U, V, !B.see);
          else fillPoly(poly4(O, U, V), fl[f == 'top' ? 0 : f == 'l' ? 1 : 2]);
          if (im && f == 'top') { // soft shade where taller blocks stand next to this top
            let n = 0;
            for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (bbOpaque(get(i + a, j + b, k + 1))) n++;
            if (n) { x.setTransform(1, 0, 0, 1, 0, 0); fillPoly(poly4(O, U, V), bbA('ink', Math.min(.24, n * .07))); }
          }
        }
        faces.push({ i, j, k, f: f == 'top' ? 'top' : 'side', nx, ny, poly: poly4(O, U, V) });
      });
    }
    if (x) x.setTransform(1, 0, 0, 1, 0, 0);
    E.faces = faces;
    return faces;
  };
  const inPoly = (px, py, P) => {
    let r = false;
    for (let a = 0, b = P.length - 1; a < P.length; b = a++) {
      const [xa, ya] = P[a], [xb, yb] = P[b];
      if ((ya > py) != (yb > py) && px < (xb - xa) * (py - ya) / (yb - ya) + xa) r = !r;
    }
    return r;
  };
  // the front-most face under a canvas point (f: optional filter); null = none
  E.hit = (px, py, f) => {
    for (let n = E.faces.length - 1; n >= 0; n--) { const q = E.faces[n]; if ((!f || f(q)) && inPoly(px, py, q.poly)) return q; }
    return null;
  };
  // the ground cell under a canvas point (the plane z = 0), or null outside the island
  E.ground = (px, py) => {
    const [gx, gy] = E.unproj(px, py, 0), i = Math.floor(gx), j = Math.floor(gy);
    return i >= 0 && j >= 0 && i < BW && j < BD ? { i, j, k: -1, f: 'top', ground: 1 } : null;
  };
  // the cell a Build tap fills: on top of the tapped column (or beside the face with E.side); {high} when the column is full
  E.target = (px, py) => {
    const h = E.hit(px, py, q => !q.ghost) || E.ground(px, py);
    if (!h) return null;
    if (h.deco) return { i: h.i, j: h.j, k: h.k };
    let { i, j } = h, k;
    if (E.side && h.f == 'side') {
      i += h.nx; j += h.ny; k = h.k;
      if (i < 0 || j < 0 || i >= BW || j >= BD || bbSolid(get(i, j, k))) return null;
    } else k = E.above(i, j, h.ground ? 0 : h.k + 1);
    return k >= BH ? { high: 1 } : { i, j, k };
  };
  // the cells a tool fills from t0 to t1 (a drag); one cell for a tap
  E.cells = (t0, t1, tool = E.tool) => {
    t1 = t1 || t0;
    const o = [];
    const line = (a0, b0, a1, b1) => {
      const r = [], dx = Math.abs(a1 - a0), dy = Math.abs(b1 - b0), sx = a0 < a1 ? 1 : -1, sy = b0 < b1 ? 1 : -1;
      let e = dx - dy;
      for (let n = 0; n < 64; n++) { r.push([a0, b0]); if (a0 == a1 && b0 == b1) break; const e2 = 2 * e; if (e2 > -dy) { e -= dy; a0 += sx; } if (e2 < dx) { e += dx; b0 += sy; } }
      return r;
    };
    if (tool == 'build') o.push([t0.i, t0.j, t0.k, E.sel]);
    else if (tool == 'line' || tool == 'wall') for (const [a, b] of line(t0.i, t0.j, t1.i, t1.j)) for (let n = 0; n < (tool == 'wall' ? 3 : 1); n++) o.push([a, b, t0.k + n, E.sel]);
    else if (tool == 'floor' || tool == 'clear') {
      for (let a = Math.min(t0.i, t1.i); a <= Math.max(t0.i, t1.i); a++) for (let b = Math.min(t0.j, t1.j); b <= Math.max(t0.j, t1.j); b++) o.push([a, b, t0.k, tool == 'clear' ? 0 : E.sel]);
    } else if (tool == 'stamp') {
      const st = BBSTAMPS[E.stamp || 0], q = ((E.rot % 4) + 4) % 4;
      for (const [dx, dy, dz, v] of st.c) {
        const [rx, ry] = q == 0 ? [dx, dy] : q == 1 ? [dy, -dx] : q == 2 ? [-dx, -dy] : [-dy, dx];
        o.push([t0.i + rx, t0.j + ry, t0.k + dz, v]);
      }
    }
    const inB = c => c[0] >= 0 && c[1] >= 0 && c[2] >= 0 && c[0] < BW && c[1] < BD && c[2] < BH;
    return o.filter(c => inB(c) && (tool == 'clear' ? !!get(c[0], c[1], c[2]) : !bbSolid(get(c[0], c[1], c[2]))));
  };
  // put cells in (one history step); returns the indices placed
  E.put = cells => {
    if (!cells.length) return [];
    E.push();
    const out = [];
    if (cells.some(q => q[3] == BB_PET)) for (let n = 0; n < E.w.length; n++) if (E.w[n] == BB_PET) E.w[n] = 0;
    for (const [a, b, z, v] of cells) { const n = bbI(a, b, z); E.w[n] = v; if (v) { out.push(n); E.placed.add(n); } }
    return out;
  };
  // a deco block (flower, mushroom, pet) needs a block or water under it
  E.decoOk = (i, j, k, v) => !BLOCKS[v].deco || k == 0 || bbOpaque(get(i, j, k - 1)) || get(i, j, k - 1) == 10;

  /* a short tap at a canvas point. Returns what happened: {kind: 'place'|'break'|'light'|'wrong'|'miss'|'none'|'high'|'deco'|'notnt', ...};
     the screen adds sound, messages, effects and saving. A Build tap on TNT builds on top of it: lighting is only the Boom tool. */
  E.tap = (px, py) => {
    if (E.goal) return E.bpTap(px, py);
    const T = E.tool;
    if (T == 'break') {
      const h = E.hit(px, py, q => !q.ghost);
      if (!h) return { kind: 'none' };
      const n = bbI(h.i, h.j, h.k), v = E.w[n];
      if (!v) return { kind: 'none' };
      E.push(); E.w[n] = 0;
      return { kind: 'break', cells: [n], v, at: [h.i, h.j, h.k] };
    }
    if (T == 'boom') {
      const h = E.hit(px, py, q => !q.ghost);
      if (h && get(h.i, h.j, h.k) == BB_TNT) return { kind: 'light', at: [h.i, h.j, h.k] };
      return { kind: 'notnt' };
    }
    if (T == 'clear') return { kind: 'none', clear: 1 };
    const t = E.target(px, py);
    if (!t) return { kind: 'none', why: 'sky' };
    if (t.high) return { kind: 'high' };
    const cells = E.cells(t, t, T);
    if (!cells.length) return { kind: 'none', why: 'full' };
    if (T != 'stamp' && cells.some(([a, b, z, v]) => !E.decoOk(a, b, z, v))) return { kind: 'deco' };
    return { kind: 'place', cells: E.put(cells), tool: T };
  };
  // a blueprint tap: match it to a see-through block of the current layer, kindly
  E.bpTap = (px, py) => {
    const L = E.layer();
    if (L == null) return { kind: 'none' };
    let idx = null, sure = true;
    const g = E.hit(px, py, q => q.ghost); // 1. a see-through block under the finger
    if (g) idx = bbI(g.i, g.j, g.k);
    if (idx == null) { // 2. the column under the finger: the cell on top of it
      const h = E.hit(px, py, q => !q.ghost) || E.ground(px, py);
      if (h) { const k = E.above(h.i, h.j, h.ground ? 0 : h.k + 1), n = bbI(h.i, h.j, Math.min(k, BH - 1)); if (k == L && E.goal.get(n) && E.w[n] != E.goal.get(n)) idx = n; }
    }
    if (idx == null) { // 3. the nearest see-through block of this layer, within about a block
      let best = null, bd = E.a() * 1.15;
      for (const n of E.todo()) {
        const i = n % BW, j = Math.floor(n / BW) % BD, p = E.proj(i + .5, j + .5, L + .5), d = Math.hypot(p[0] - px, p[1] - py);
        if (d < bd) { bd = d; best = n; }
      }
      idx = best; sure = false;
    }
    if (idx == null) return { kind: 'miss' }; // nowhere near: a tip, never a mistake
    const want = E.goal.get(idx);
    if (E.sel != want) {
      const counted = sure && !E.missAt.has(idx);
      if (counted) { E.miss++; E.missAt.add(idx); }
      return { kind: 'wrong', want, idx, counted };
    }
    E.push();
    E.w[idx] = want;
    return { kind: 'place', cells: [idx], layer: E.layer(), win: E.done() };
  };
  return E;
}

/* ---- drawn tool icons (24 grid, currentColor; the soft tone at opacity .4, DESIGN_SYSTEM 5.2a); the rest are ICONS ---- */
const BBI = {
  build: '<path opacity=".4" d="M12 2.6l8.6 4.7L12 12 3.4 7.3z"/><path d="M3.4 9.2L11 13.4v8.3l-7.6-4.2zM13 13.4l7.6-4.2v8.3L13 21.7z"/>',
  break: '<path d="M3.4 8.2L10.6 4.6l1.4 3.6-2 3 1.6 3.5-1.4 6-6.8-3.7z"/><path opacity=".4" d="M13.6 4.6l7 3.6v9L13.4 21l1-5.6-1.6-3.6 2-3z"/>',
  stamp: '<circle cx="12" cy="5.2" r="3"/><path d="M10.4 7.6h3.2v4.4h-3.2z"/><rect x="4.6" y="11.6" width="14.8" height="5.4" rx="1.6"/><rect opacity=".4" x="3.4" y="18.6" width="17.2" height="2.6" rx="1.3"/>',
  boom: '<path d="M12 1.8l2.2 5.6 5.6-2.4-2.4 5.6 5.4 2.2-5.4 2.2 2.4 5.6-5.6-2.4L12 23.8l-2.2-5.6-5.6 2.4 2.4-5.6L1.2 12.8l5.4-2.2-2.4-5.6 5.6 2.4z"/><circle opacity=".4" cx="12" cy="12.8" r="4"/>',
  closer: '<circle opacity=".4" cx="10.4" cy="10.4" r="7.4"/><path fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" d="M15.6 15.6l5.4 5.4M7 10.4h6.8M10.4 7v6.8"/>',
  farther: '<circle opacity=".4" cx="10.4" cy="10.4" r="7.4"/><path fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" d="M15.6 15.6l5.4 5.4M7 10.4h6.8"/>',
  line: '<rect x="1.8" y="9" width="6" height="6" rx="1.6"/><rect x="9" y="9" width="6" height="6" rx="1.6"/><rect opacity=".4" x="16.2" y="9" width="6" height="6" rx="1.6"/>',
  wall: '<rect x="2" y="3" width="9" height="5.4" rx="1.4"/><rect x="13" y="3" width="9" height="5.4" rx="1.4"/><rect opacity=".4" x="2" y="9.4" width="4" height="5.4" rx="1.4"/><rect x="7.6" y="9.4" width="9" height="5.4" rx="1.4"/><rect opacity=".4" x="18" y="9.4" width="4" height="5.4" rx="1.4"/><rect x="2" y="15.8" width="9" height="5.4" rx="1.4"/><rect x="13" y="15.8" width="9" height="5.4" rx="1.4"/>',
  floor: '<path opacity=".4" d="M12 4l10 5.4L12 14.8 2 9.4z"/><path d="M2 12.2l10 5.4 10-5.4v2.6l-10 5.4-10-5.4z"/>',
};
const bbIco = (n, sz = 24, cls = '') => BBI[n]
  ? `<svg class="ic${cls ? ' ' + cls : ''}" width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${BBI[n]}</svg>`
  : ico(n, sz, cls);
// a labelled tool button (48 px and up): icon over a short label
const bbTB = (id, icon, label, o = {}) => `<button class="bb-tb${o.cls ? ' ' + o.cls : ''}" id="${id}"${o.v ? ` data-tool="${o.v}"` : ''}` +
  ` aria-label="${esc(o.aria || label)}"${o.on != null ? ` aria-pressed="${o.on ? 'true' : 'false'}"` : ''}>${bbIco(icon)}<span>${esc(label)}</span></button>`;

/* ---- a small picture of blocks (blueprint cards, stamps, worlds, palette): the same drawing at a fixed view ---- */
function bbMini(cv, cells, o = {}) {
  const w = new Uint8Array(BW * BD * BH);
  let box = [99, 99, 99, -1, -1, -1];
  for (const [a, b, z, v] of cells) {
    if (a < 0 || b < 0 || z < 0 || a >= BW || b >= BD || z >= BH) continue;
    w[bbI(a, b, z)] = v;
    box = [Math.min(box[0], a), Math.min(box[1], b), Math.min(box[2], z), Math.max(box[3], a), Math.max(box[4], b), Math.max(box[5], z)];
  }
  if (box[3] < 0) return;
  const E = bbMake(w, null), W = cv.width, H = cv.height, wx = box[3] - box[0] + 1, wy = box[4] - box[1] + 1, hz = box[5] - box[2] + 1;
  E.size(W, H, 1);
  const A = Math.min(.92 * W / (wx + wy), .9 * H / ((wx + wy) / 2 + hz));
  E.zoom = A / E.a0;
  E.F = [(box[0] + box[3] + 1) / 2, (box[1] + box[4] + 1) / 2, box[2] + hz / 2];
  const x = cv.getContext('2d');
  x.clearRect(0, 0, W, H);
  E.render({ x, pet: o.pet });
}

/* ---- the play screen ---- */
function blockBuilder(ci) {
  const bs = bbS(), bp = ci == null ? null : BBP[ci], world = bp ? null : bs.worlds[bs.cur];
  const E = BB = bbMake(bp ? bbFlat() : bbDecode(world.d), bp ? bbGoal(bp) : null);
  E.ch = bp ? ci : null;
  E.world = world;
  E.stamp = 0;
  const need = bp ? [...new Set(E.goal.values())] : null;
  if (need) E.sel = need[0];
  const lockLeft = b => (b.need && S.stars < b.need ? b.need - S.stars : 0);
  const blockBtn = i => {
    const b = BLOCKS[i], left = need ? 0 : lockLeft(b);
    return `<button class="bb-k${left ? ' lock' : ''}" data-b="${i}" aria-pressed="false" aria-label="${esc(b.n + (left ? ': ' + left + ' more stars to unlock' : ''))}">` +
      `<canvas width="96" height="96" data-bc="${i}"></canvas>` +
      (left ? `<span class="bb-kn bb-kl">${ico('lock', 16)}${left} more</span>` : `<span class="bb-kn">${esc(b.n)}</span>`) + '</button>';
  };
  const groups = need ? [['Blocks for this build', need]] : BB_GROUPS;
  const pal = groups.map(([g, ids]) => `<div class="bb-grp"><span class="bb-gh">${esc(g)}</span><div class="bb-gb">${ids.map(blockBtn).join('')}</div></div>`).join('');
  const stamps = BBSTAMPS.map((t, i) => `<button class="bb-k bb-sk" data-stamp="${i}" aria-pressed="${i == 0}" aria-label="${esc(t.n)}">` +
    `<canvas width="96" height="96" data-sc="${i}"></canvas><span class="bb-kn">${esc(t.n)}</span></button>`).join('');
  const seg = `<div class="bb-seg" role="group" aria-label="Tool">${bbTB('bbm-build', 'build', 'Build', { v: 'build', on: true })}` +
    `${bbTB('bbm-break', 'break', 'Break', { v: 'break', on: false })}${bbTB('bbm-stamp', 'stamp', 'Stamp', { v: 'stamp', on: false })}</div>`;
  const hist = bbTB('bbundo', 'undo', 'Undo') + bbTB('bbredo', 'redo', 'Redo');
  const cam = bbTB('bbrl', 'rotate', 'Left', { aria: 'Turn left', cls: 'bb-flip' }) + bbTB('bbrr', 'rotate', 'Right', { aria: 'Turn right' }) +
    bbTB('bbzo', 'farther', 'Farther', { aria: 'Zoom out' }) + bbTB('bbzi', 'closer', 'Closer', { aria: 'Zoom in' });
  const bar = bp ? `<div class="bb-row">${hist}${cam}</div>`
    : `<div class="bb-row">${seg}${hist}</div><div class="bb-row">${cam}${bbTB('bbboom', 'boom', 'Boom', { v: 'boom', on: false, aria: 'Boom: light a TNT block' })}` +
      `${bbTB('bbmore', 'more', 'More', { aria: 'More tools' })}</div>`;
  const chips = bp ? `<span class="stat gh-st bb-prog" aria-label="Blocks built">${ico('blocks', 28)}<b id="bbprog"></b></span>`
    : `<span class="stat gh-st bb-prog" aria-label="Goals done">${ico('target', 28)}<b id="bbgoal"></b></span>`;
  view(`${GH.top('blocks', { play: true, sub: bp ? bp.n : world.name, chips })}
   <div class="bb-wrap${bp ? ' bb-isbp' : ''}"><div class="bb-cv" id="bbcv"><canvas id="bbc"></canvas><div class="bb-msg" id="bbmsg" aria-live="polite"></div><div class="bb-tip" id="bbtip"></div></div>
    <div class="bb-side"><div class="bb-bar">${bar}</div>
     <div class="bb-pal" id="bbpal"><div class="bb-ps">${pal}</div></div>${bp ? '' : `<div class="bb-pal" id="bbst" hidden><div class="bb-ps"><div class="bb-grp"><span class="bb-gh">Stamps</span><div class="bb-gb">${stamps}</div></div></div></div>`}</div></div>`);
  const cv = $('#bbc'), x = cv.getContext('2d'), wrap = $('#bbcv');
  const bg = bbCanvas(1), bgx = bg.getContext('2d');
  let dpr = Math.min(2, devicePixelRatio || 1);
  const FX = { parts: [], fuses: [], lit: new Set(), shake: 0, dirty: 1, last: 0, flash: [], anim: null, hold: null };
  E.animals = [];
  const pet = () => bbPetImg(() => { E.dirty = 1; });
  const redraw = () => { E.dirty = 1; };

  // the whole scene into the back buffer (only when something changed); fast = flat colours while the view turns
  function scene(fast) {
    const W = cv.width, H = cv.height, A = E.a();
    const g = bgx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, bbCol(E.night ? 'sc:night' : 'sc:sky'));
    g.addColorStop(1, bbCol(E.night ? 'sc:night-1' : 'sc:sky-1'));
    bgx.setTransform(1, 0, 0, 1, 0, 0);
    bgx.fillStyle = g; bgx.fillRect(0, 0, W, H);
    if (E.night) {
      bgx.fillStyle = bbCol('white');
      for (let n = 0; n < 50; n++) { bgx.globalAlpha = .4 + (n % 3) * .2; bgx.fillRect((n * 97) % W, (n * 53) % (H * .5), 2 * dpr, 2 * dpr); }
      bgx.globalAlpha = 1;
      const mx = W * .86, my = H * .12, mr = Math.min(W, H) * .05;
      bgx.fillStyle = bbCol('yellow-1'); bgx.beginPath(); bgx.arc(mx, my, mr, 0, 7); bgx.fill();
      bgx.fillStyle = bbCol('sc:night'); bgx.beginPath(); bgx.arc(mx + mr * .45, my - mr * .25, mr * .85, 0, 7); bgx.fill();
    } else {
      const sx = W * .86, sy = H * .12, sr = Math.min(W, H) * .05;
      bgx.fillStyle = bbA('yellow-1', .5); bgx.beginPath(); bgx.arc(sx, sy, sr * 1.25, 0, 7); bgx.fill();
      bgx.fillStyle = bbCol('yellow'); bgx.beginPath(); bgx.arc(sx, sy, sr, 0, 7); bgx.fill();
      bgx.fillStyle = bbA('white', .55); bgx.beginPath(); bgx.ellipse(sx - sr * .35, sy - sr * .38, sr * .32, sr * .2, -.6, 0, 7); bgx.fill();
    }
    // a soft shadow under the island
    const c = [E.proj(0, 0, 0), E.proj(BW, 0, 0), E.proj(BW, BD, 0), E.proj(0, BD, 0)];
    bgx.fillStyle = bbA('ink', .1); bgx.beginPath();
    c.forEach(([X, Y], n) => n ? bgx.lineTo(X, Y + A * .6) : bgx.moveTo(X, Y + A * .6)); bgx.closePath(); bgx.fill();
    E.render({ x: bgx, fast, pet: pet() });
    // glow of lava and lamps
    const glows = [];
    for (let n = 0; n < E.w.length; n++) { const v = E.w[n]; if (v && BLOCKS[v].glow) glows.push([n, BLOCKS[v].glow]); }
    if (glows.length && !fast) {
      bgx.globalCompositeOperation = 'lighter';
      for (const [n, t] of glows.slice(0, 60)) {
        const i = n % BW, j = Math.floor(n / BW) % BD, k = Math.floor(n / (BW * BD)), p = E.proj(i + .5, j + .5, k + .5), rr = A * (E.night ? 3.2 : 1.3);
        const g2 = bgx.createRadialGradient(p[0], p[1], 0, p[0], p[1], rr);
        g2.addColorStop(0, bbA(t, E.night ? .65 : .25)); g2.addColorStop(1, bbA(t, 0));
        bgx.fillStyle = g2; bgx.fillRect(p[0] - rr, p[1] - rr, rr * 2, rr * 2);
      }
      bgx.globalCompositeOperation = 'source-over';
    }
    FX.dirty = 1;
  }
  function size() {
    const r = wrap.getBoundingClientRect();
    if (!r.width || !r.height) return;
    dpr = Math.min(2, devicePixelRatio || 1);
    const W = Math.round(r.width * dpr), H = Math.round(r.height * dpr);
    if (E.sized && W == cv.width && H == cv.height) return;
    cv.width = bg.width = W;
    cv.height = bg.height = H;
    const first = !E.sized;
    E.size(cv.width, cv.height, dpr);
    if (first) { E.home(); E.sized = 1; } else E.clamp();
    E.dirty = 1;
  }

  /* ---- messages: inside the scene, under the top bar, so they never cover Pause or the progress chip (R-02 #11, C7) ---- */
  const say1 = (t, kind = 'info', ms = 1900) => {
    const m = $('#bbmsg');
    if (!m) return;
    m.className = 'bb-msg on ' + kind;
    m.innerHTML = `<span class="bb-mi">${ico(kind == 'good' ? 'check' : kind == 'try' ? 'hint' : 'info', 22)}</span><span>${esc(t)}</span>`;
    clearTimeout(m._t);
    m._t = setTimeout(() => m.classList.remove('on'), ms);
  };
  const tip = t => {
    const el = $('#bbtip');
    if (!el) return;
    el.textContent = t;
    el.classList.add('on');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('on'), 2600);
  };

  /* ---- effects ---- */
  const cellXYZ = n => [n % BW, Math.floor(n / BW) % BD, Math.floor(n / (BW * BD))];
  function puff(i, j, k, v) {
    const B = BLOCKS[v];
    if (!B) return;
    const p = E.proj(i + .5, j + .5, k + .5), A = E.a(), col = B.deco ? bbCol('green') : bbFlat3(v)[0];
    for (let n = 0; n < 8; n++) FX.parts.push({ x: p[0], y: p[1], vx: (Math.random() - .5) * A * .25, vy: -Math.random() * A * .3, l: .6 + Math.random() * .3, c: col, s: A * (.14 + Math.random() * .12) });
  }
  function flash(cells) { FX.flash = cells.slice(0, 200).map(n => ({ n, t: performance.now() })); }
  function light(i, j, k, t) {
    const n = bbI(i, j, k);
    if (FX.lit.has(n)) return;
    FX.lit.add(n);
    FX.fuses.push({ i, j, k, n, t });
    tone(880, .05, 0, 'square', .08);
  }
  function boom(f) {
    FX.lit.delete(f.n);
    if (E.w[f.n] != BB_TNT) return;
    if (!FX.snap) { E.push(); FX.snap = 1; setTimeout(() => { FX.snap = 0; }, 600); }
    const R0 = 2.6, A = E.a(), c = E.proj(f.i + .5, f.j + .5, f.k + .5);
    E.w[f.n] = 0;
    for (let dz = -3; dz <= 3; dz++) for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
      const d = Math.hypot(dx, dy, dz * 1.2);
      if (d > R0) continue;
      const a = f.i + dx, b = f.j + dy, z = f.k + dz;
      if (a < 0 || b < 0 || z < 0 || a >= BW || b >= BD || z >= BH) continue;
      const n = bbI(a, b, z), v = E.w[n];
      if (!v) continue;
      if (v == BB_TNT) { light(a, b, z, .15 + d * .06); continue; }
      const p = E.proj(a + .5, b + .5, z + .5);
      if (FX.parts.length < 220) FX.parts.push({ x: p[0], y: p[1], vx: (p[0] - c[0]) * .08 + (Math.random() - .5) * A * .3, vy: -A * (.2 + Math.random() * .35) + (p[1] - c[1]) * .05, l: 1 + Math.random() * .6, c: BLOCKS[v].deco ? bbCol('green') : bbFlat3(v)[0], s: A * (.18 + Math.random() * .22) });
      E.w[n] = 0;
    }
    E.animals = E.animals.filter(an => Math.hypot(an.x - f.i, an.y - f.j, (an.z - f.k) * 1.2) > R0 + .6);
    FX.parts.push({ x: c[0], y: c[1], l: .25, flash: 1, s: A * 4 });
    for (let n = 0; n < 10; n++) FX.parts.push({ x: c[0] + (Math.random() - .5) * A * 2, y: c[1] + (Math.random() - .5) * A, vx: (Math.random() - .5) * A * .1, vy: -A * .05, l: 1.2 + Math.random(), smoke: 1, s: A * (.5 + Math.random() * .6) });
    FX.shake = .5;
    noise(.8, 0, .5, 900, 80); tone(70, .6, 0, 'sawtooth', .28, 28); tone(46, .8, .05, 'sine', .3, 20);
    goal('boom');
    E.dirty = 1; after();
  }
  function spawn() {
    if (E.animals.length >= 10) { say1('That is a lot of animals!', 'info'); return; }
    for (let n = 0; n < 60; n++) {
      const a = Math.floor(Math.random() * BW), b = Math.floor(Math.random() * BD), z = E.topZ(a, b);
      const under = z > 0 ? E.get(a, b, z - 1) : 0;
      if (z > 0 && z < BH && under != 10 && under != 21) {
        const e = pick(['🐷', '🐔', '🐑', '🐄', '🐰', '🐱', '🐶', '🦆']);
        E.animals.push({ e, x: a, y: b, z, fx: a, fy: b, fz: z, tx: a, ty: b, tz: z, hop: 1, t: .5, dir: 1 });
        tone(660, .08, 0, 'sine', .12); tone(990, .08, .08, 'sine', .12);
        return;
      }
    }
  }

  /* ---- the free-build goals ---- */
  function goal(id) {
    if (!world) return;
    const g = world.goals = bbGoalsOf(world);
    if (g[id]) return;
    g[id] = 1;
    save();
    const G = BB_GOALS.find(q => q[0] == id);
    setTimeout(() => { SFX.magic(); say1('Goal done: ' + G[1] + '!', 'good', 2600); }, 250);
    goalChip();
  }
  function goalChip() { const c = $('#bbgoal'); if (c) c.textContent = bbGoalN(world) + '/' + BB_GOALS.length; }
  function checkGoals(placed) {
    if (!world) return;
    world.n = (world.n | 0) + placed.length;
    const kinds = new Set(Array.isArray(world.kinds) ? world.kinds : []);
    for (const n of placed) kinds.add(E.w[n]);
    world.kinds = [...kinds].filter(v => v > 0 && v < BLOCKS.length);
    if (world.n >= 10) goal('ten');
    if (world.kinds.length >= 5) goal('kinds');
    for (const n of placed) {
      const [i, j, k] = cellXYZ(n);
      // a stack of 6 blocks built here (this visit), ending at or through this cell
      let lo = k, hi = k;
      while (lo > 0 && E.placed.has(bbI(i, j, lo - 1)) && E.w[bbI(i, j, lo - 1)]) lo--;
      while (hi < BH - 1 && E.placed.has(bbI(i, j, hi + 1)) && E.w[bbI(i, j, hi + 1)]) hi++;
      if (hi - lo + 1 >= 6) goal('tower');
      if (E.w[n] == 22 && E.night) goal('night');
    }
    for (let n = 0; n < E.w.length; n++) if (E.w[n] == BB_PET) {
      const [i, j, k] = cellXYZ(n);
      for (let z = k + 1; z <= k + 3; z++) if (bbOpaque(E.get(i, j, z))) { goal('pethouse'); break; }
      break;
    }
  }

  /* ---- after a change: save, progress, buttons ---- */
  function bbProg() {
    const p = $('#bbprog');
    if (p) p.textContent = E.prog() + '/' + E.goal.size + (E.miss ? ' · ' + E.miss + (E.miss == 1 ? ' mistake' : ' mistakes') : '');
  }
  function after() {
    if (bp) bbProg(); else bbSave();
    for (const [id, ok] of [['#bbundo', E.undo.length], ['#bbredo', E.redo.length]]) { const b = $(id); if (b) b.setAttribute('aria-disabled', ok ? 'false' : 'true'); }
    E.dirty = 1;
  }
  let lastLayer = E.layer();
  function layerNote() {
    const L = E.layer();
    if (!bp || L == null || L === lastLayer) { lastLayer = L; return; }
    lastLayer = L;
    const want = [...new Set(E.todo().map(n => E.goal.get(n)))];
    say1('Next layer! ' + (want.length == 1 ? 'It needs ' + BLOCKS[want[0]].n + '.' : 'Copy the see-through blocks.'), 'info', 2200);
    if (!want.includes(E.sel)) hintBlock(want[0], false);
  }
  function hintBlock(v, scroll = true) {
    const q = $(`[data-b="${v}"]`);
    if (!q) return;
    q.classList.remove('hint');
    void q.offsetWidth;
    q.classList.add('hint');
    setTimeout(() => q.classList.remove('hint'), 2400);
    if (scroll && q.scrollIntoView) try { q.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' }); } catch (e) {}
  }
  // what a tap (or a lifted aim) did: sound, effects, messages
  function result(r) {
    if (r.kind == 'place') {
      const top = Math.max(...r.cells.map(n => cellXYZ(n)[2]));
      if (r.cells.length == 1) E.drop = { i: r.cells[0], t: performance.now(), dz: 1.2 };
      tone(300 + top * 50, .08, 0, 'square', .08); tone(600 + top * 50, .06, .04, 'sine', .1);
      if (r.cells.length > 3) { tone(800, .08, .08, 'sine', .1); tone(1000, .1, .14, 'sine', .1); }
      flash(r.cells);
      after();
      if (bp) { if (r.win) setTimeout(bbWin, 450); else layerNote(); } else checkGoals(r.cells);
    } else if (r.kind == 'break') {
      SFX.hit(); puff(...r.at, r.v); after();
    } else if (r.kind == 'light') {
      light(...r.at, 1.6); say1('Stand back! 3, 2, 1...', 'info', 1500);
    } else if (r.kind == 'notnt') {
      say1('Boom lights TNT. Tap a red TNT block!', 'info');
    } else if (r.kind == 'wrong') {
      SFX.wrong();
      say1('This one needs ' + BLOCKS[r.want].n + '. It is shining below.', 'try', 2400);
      hintBlock(r.want);
      bbProg();
      FX.pulse = { n: r.idx, t: performance.now() };
    } else if (r.kind == 'miss') {
      say1('Tap a see-through block to build it.', 'info');
      FX.pulse = { all: 1, t: performance.now() };
    } else if (r.kind == 'high') say1('That is as high as it goes!', 'info');
    else if (r.kind == 'deco') { SFX.wrong(); say1('Put it on top of a block.', 'try'); }
    else if (r.clear) tip('Clear area: hold, then slide over the blocks to clear.');
    else if (r.why == 'sky') say1('Tap on the island to build.', 'info', 1500);
    else if (r.why == 'full') say1('No room there. Try another spot.', 'info', 1500);
  }

  /* ---- the frame loop: camera moves, the turn, TNT, particles, animals, the preview and the magnifier ---- */
  function frame() {
    if (!document.body.contains(cv)) return;
    requestAnimationFrame(frame);
    const now = performance.now(), dt = Math.min(.05, FX.last ? (now - FX.last) / 1000 : 0);
    FX.last = now;
    let fast = false;
    if (FX.anim) { // a smooth turn or zoom
      const a = FX.anim, p = Math.min(1, (now - a.t0) / a.ms), e = 1 - Math.pow(1 - p, 3);
      if (a.ang != null) { E.ang = a.ang0 + (a.ang - a.ang0) * e; fast = p < 1; }
      if (a.zoom != null) { E.zoom = a.zoom0 * Math.pow(a.zoom / a.zoom0, e); E.clamp(); }
      if (p >= 1) { if (a.ang != null) E.ang = a.ang; FX.anim = null; }
      E.dirty = 1;
    }
    if (E.drop) { const p = (now - E.drop.t) / 170; E.drop.dz = p >= 1 ? 0 : (1 - p) * (1 - p) * 1.2; if (p >= 1) E.drop = null; E.dirty = 1; }
    for (const f of FX.fuses) { f.t -= dt; if (f.t <= 0) { f.done = 1; boom(f); } }
    FX.fuses = FX.fuses.filter(f => !f.done);
    for (const an of E.animals) {
      if (an.hop < 1) {
        an.hop = Math.min(1, an.hop + dt / .32);
        const k = an.hop;
        an.x = an.fx + (an.tx - an.fx) * k; an.y = an.fy + (an.ty - an.fy) * k; an.z = an.fz + (an.tz - an.fz) * k + Math.sin(k * Math.PI) * .45;
      } else {
        const cz = E.topZ(Math.round(an.x), Math.round(an.y));
        if (cz > 0 && cz != an.z) an.z = cz;
        an.t -= dt;
        if (an.t <= 0) {
          an.t = .5 + Math.random() * 1.4;
          const [dx, dy] = pick([[1, 0], [-1, 0], [0, 1], [0, -1]]), nx = Math.round(an.x) + dx, ny = Math.round(an.y) + dy, nz = E.topZ(nx, ny);
          if (nx >= 0 && ny >= 0 && nx < BW && ny < BD && nz > 0 && nz < BH && Math.abs(nz - Math.round(an.z)) <= 1 && E.get(nx, ny, nz - 1) != 10) {
            Object.assign(an, { fx: an.x, fy: an.y, fz: Math.round(an.z), tx: nx, ty: ny, tz: nz, hop: 0, dir: dx - dy || an.dir });
          }
        }
      }
    }
    for (const p of FX.parts) { p.l -= dt; if (p.vx !== undefined) { p.x += p.vx * dt * 20; p.y += p.vy * dt * 20; if (!p.smoke) p.vy += E.a() * dt * 1.6; } }
    FX.parts = FX.parts.filter(p => p.l > 0);
    FX.flash = FX.flash.filter(f => now - f.t < 900);
    if (FX.pulse && now - FX.pulse.t > 1200) FX.pulse = null;
    if (E.dirty) { scene(fast); E.dirty = 0; }
    const busy = FX.parts.length || FX.fuses.length || E.animals.length || FX.shake > 0 || FX.flash.length || FX.pulse || G1.aim || G1.hold;
    if (!busy) { if (FX.dirty) { x.setTransform(1, 0, 0, 1, 0, 0); x.drawImage(bg, 0, 0); FX.dirty = 0; } return; }
    FX.dirty = 1;
    const A = E.a();
    let sh = 0;
    if (FX.shake > 0) { FX.shake -= dt; sh = (Math.random() - .5) * A * .6 * FX.shake; }
    x.setTransform(1, 0, 0, 1, 0, 0);
    x.drawImage(bg, sh, sh * .7);
    // a lit fuse blinks
    for (const f of FX.fuses) { x.globalAlpha = Math.sin(now / (f.t < .6 ? 40 : 90)) * .35 + .4; outline(f.i, f.j, f.k, bbCol('white'), null, true); x.globalAlpha = 1; }
    // just built: a bright outline that fades (stamps no longer vanish into the scene)
    for (const f of FX.flash) { const [i, j, k] = cellXYZ(f.n); x.globalAlpha = 1 - (now - f.t) / 900; outline(i, j, k, null, bbCol('yellow-1')); }
    x.globalAlpha = 1;
    if (FX.pulse) { // a wrong tap or a tap away: the see-through blocks of this layer bounce a little
      const p = (now - FX.pulse.t) / 1200, al = Math.sin(p * Math.PI * 4) * .5 + .5;
      x.globalAlpha = al * (1 - p);
      for (const n of FX.pulse.all ? E.todo() : [FX.pulse.n]) { const [i, j, k] = cellXYZ(n); outline(i, j, k, null, bbCol('yellow-2')); }
      x.globalAlpha = 1;
    }
    // the place-here preview while aiming: block colour, a thick dark edge and a white inner edge
    if (G1.aim && G1.prev && G1.prev.length) {
      const del = E.tool == 'break' || E.tool == 'clear', pul = Math.sin(now / 160) * .12 + .62;
      for (const [i, j, k, v] of G1.prev.slice(0, 300)) {
        x.globalAlpha = pul;
        outline(i, j, k, del ? bbA('orange', .55) : v && BLOCKS[v] && !BLOCKS[v].deco ? bbFlat3(v)[0] : bbA('white', .6), null, true);
        x.globalAlpha = 1;
        outline(i, j, k, null, bbCol('ink'), false, Math.max(2.5, A * .1));
        outline(i, j, k, null, bbCol(del ? 'yellow' : 'white'), false, Math.max(1.2, A * .045));
      }
      if (G1.prev.length > 1) {
        const l = G1.prev[G1.prev.length - 1], p = E.proj(l[0] + .5, l[1] + .5, l[2] + 1.6);
        x.font = `bold ${Math.round(A * .8)}px sans-serif`; x.textAlign = 'center'; x.lineWidth = A * .15;
        x.strokeStyle = bbA('ink', .6); x.fillStyle = bbCol('white');
        x.strokeText('x' + G1.prev.length, p[0], p[1]); x.fillText('x' + G1.prev.length, p[0], p[1]);
      }
    }
    // the hold ring: a circle that closes while the finger rests (then aiming starts)
    if (G1.hold) {
      const p = Math.min(1, (now - G1.hold.t) / BB_HOLD), r = 26 * dpr;
      x.lineWidth = 5 * dpr; x.strokeStyle = bbA('white', .9);
      x.beginPath(); x.arc(G1.hold.x, G1.hold.y, r, -Math.PI / 2, -Math.PI / 2 + p * Math.PI * 2); x.stroke();
    }
    // animals (emoji are content pictures here)
    x.textAlign = 'center'; x.textBaseline = 'bottom'; x.font = `${Math.round(A * 1.3)}px sans-serif`;
    const order = E.animals.map(an => { const c = Math.cos(E.ang), s = Math.sin(E.ang), dx = an.x - E.F[0], dy = an.y - E.F[1]; return [dx * c - dy * s + dx * s + dy * c, an]; }).sort((p, q) => p[0] - q[0]);
    for (const [, an] of order) {
      const p = E.proj(an.x + .5, an.y + .5, an.z), gd = E.proj(an.x + .5, an.y + .5, Math.floor(an.z + .01));
      an.sx = p[0]; an.sy = p[1] - A * .4;
      x.fillStyle = bbA('ink', .18); x.beginPath(); x.ellipse(gd[0], gd[1], A * .35, A * .15, 0, 0, 7); x.fill();
      x.save(); x.translate(p[0], p[1] + A * .1); if (an.dir < 0) x.scale(-1, 1); x.fillStyle = bbCol('ink'); x.fillText(an.e, 0, 0); x.restore();
    }
    for (const p of FX.parts) {
      x.globalAlpha = Math.min(1, p.l * 1.5);
      if (p.flash) {
        const g2 = x.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.s);
        g2.addColorStop(0, bbCol('white')); g2.addColorStop(.4, bbA('yellow', .8)); g2.addColorStop(1, bbA('orange', 0));
        x.fillStyle = g2; x.globalAlpha = Math.min(1, p.l * 4); x.beginPath(); x.arc(p.x, p.y, p.s, 0, 7); x.fill();
      } else if (p.smoke) { x.fillStyle = bbCol('grey-3'); x.globalAlpha = Math.min(.5, p.l * .4); x.beginPath(); x.arc(p.x, p.y, p.s * (2 - p.l * .5), 0, 7); x.fill(); }
      else if (p.heart) { x.fillStyle = bbCol('pink-2'); heart(p.x, p.y, p.s); }
      else { x.fillStyle = p.c; x.fillRect(p.x - p.s / 2, p.y - p.s / 2, p.s, p.s); x.fillStyle = bbA('ink', .2); x.fillRect(p.x - p.s / 2, p.y, p.s, p.s / 2); }
    }
    x.globalAlpha = 1;
    // the magnifier bubble while aiming (R-02 #6: kept), with a cross over the target
    if (G1.aim && G1.fp) {
      const [fx, fy] = G1.fp, Rr = Math.min(cv.width, cv.height) * .16, src = Rr * .9;
      const ly = fy - Rr * 1.9 < Rr + 4 ? fy + Rr * 1.9 : fy - Rr * 1.9, lx = Math.max(Rr + 4, Math.min(cv.width - Rr - 4, fx));
      x.save(); x.beginPath(); x.arc(lx, ly, Rr, 0, 7); x.closePath(); x.fillStyle = bbCol('sc:sky'); x.fill(); x.clip();
      x.imageSmoothingEnabled = false; x.drawImage(cv, fx - src / 2, fy - src / 2, src, src, lx - Rr, ly - Rr, Rr * 2, Rr * 2); x.restore();
      x.strokeStyle = bbCol('white'); x.lineWidth = 5 * dpr; x.beginPath(); x.arc(lx, ly, Rr, 0, 7); x.stroke();
      x.strokeStyle = bbA('ink', .45); x.lineWidth = 1.5 * dpr; x.beginPath(); x.arc(lx, ly, Rr + 3 * dpr, 0, 7); x.stroke();
      x.strokeStyle = bbCol('ink'); x.lineWidth = 2.5 * dpr; x.beginPath();
      x.moveTo(lx - 10 * dpr, ly); x.lineTo(lx + 10 * dpr, ly); x.moveTo(lx, ly - 10 * dpr); x.lineTo(lx, ly + 10 * dpr); x.stroke();
    }
  }
  function heart(px, py, s) {
    x.beginPath(); x.moveTo(px, py + s * .3);
    x.bezierCurveTo(px - s * .6, py - s * .1, px - s * .3, py - s * .6, px, py - s * .25);
    x.bezierCurveTo(px + s * .3, py - s * .6, px + s * .6, py - s * .1, px, py + s * .3); x.fill();
  }
  // a cube's outline (stroke) or fill at the current view
  function outline(i, j, k, fill, stroke, solid, lw) {
    const P = E.proj, z1 = k + 1;
    const T = [P(i, j, z1), P(i + 1, j, z1), P(i + 1, j + 1, z1), P(i, j + 1, z1)], Bt = [P(i, j, k), P(i + 1, j, k), P(i + 1, j + 1, k), P(i, j + 1, k)];
    // the silhouette: the top's corners and the bottom corners that show (the lowest three on screen)
    const all = T.concat(Bt), cx = all.reduce((s, p) => s + p[0], 0) / 8, cy = all.reduce((s, p) => s + p[1], 0) / 8;
    const hull = bbHull(all);
    x.beginPath(); hull.forEach((p, n) => n ? x.lineTo(...p) : x.moveTo(...p)); x.closePath();
    if (fill) { x.fillStyle = fill; x.fill(); }
    if (stroke) {
      x.strokeStyle = stroke; x.lineWidth = lw || Math.max(2, E.a() * .08); x.lineJoin = 'round'; x.stroke();
      if (!solid) { // the top edges too, so it reads as a cube
        x.beginPath(); T.forEach((p, n) => n ? x.lineTo(...p) : x.moveTo(...p)); x.closePath(); x.stroke();
      }
    }
    return [cx, cy];
  }

  /* ---- touch: tap builds, one finger moves the view, hold then slide aims (or draws a shape), two fingers pinch ---- */
  const G1 = { ptrs: new Map(), g: null, pinch: null, aim: false, prev: null, fp: null, hold: null };
  BB.gest = G1;
  const cpos = (cx, cy) => { const r = cv.getBoundingClientRect(); return [(cx - r.left) * dpr, (cy - r.top) * dpr]; };
  // the cells the aim shows: from where the hold started (t0) to under the finger now
  function aimAt(p) {
    G1.fp = p;
    const T = E.tool;
    if (bp) {
      G1.prev = null;
      const r = E.hit(p[0], p[1], q => q.ghost);
      if (r) G1.prev = [[r.i, r.j, r.k, E.goal.get(bbI(r.i, r.j, r.k))]];
      return;
    }
    if (T == 'break' || T == 'boom' || T == 'clear') {
      const h = E.hit(p[0], p[1], q => !q.ghost);
      if (T == 'clear' && G1.t0) {
        const [gx, gy] = E.unproj(p[0], p[1], G1.t0.k + 1), t1 = { i: Math.max(0, Math.min(BW - 1, Math.floor(gx))), j: Math.max(0, Math.min(BD - 1, Math.floor(gy))), k: G1.t0.k };
        G1.prev = E.cells(G1.t0, t1, 'clear');
        return;
      }
      G1.prev = h ? [[h.i, h.j, h.k, 0]] : null;
      if (T == 'clear' && h) G1.t0 = { i: h.i, j: h.j, k: h.k };
      return;
    }
    if ((T == 'line' || T == 'wall' || T == 'floor') && G1.t0) {
      const [gx, gy] = E.unproj(p[0], p[1], G1.t0.k), t1 = { i: Math.max(0, Math.min(BW - 1, Math.floor(gx))), j: Math.max(0, Math.min(BD - 1, Math.floor(gy))), k: G1.t0.k };
      G1.prev = E.cells(G1.t0, t1);
      return;
    }
    const t = E.target(p[0], p[1]);
    if (T == 'build' || T == 'stamp' || !G1.t0) G1.t0 = t && !t.high ? t : null;
    G1.prev = G1.t0 ? E.cells(G1.t0, G1.t0) : null;
  }
  function startAim() {
    const g = G1.g;
    if (!g || g.mode != 'wait') return;
    g.mode = 'aim';
    G1.hold = null;
    G1.aim = true;
    G1.t0 = null;
    aimAt(g.p);
    tone(520, .04, 0, 'sine', .06);
  }
  function endAim(commit) {
    const T = E.tool, prev = G1.prev;
    G1.aim = false; G1.prev = null; G1.fp = null;
    if (!commit || !prev || !prev.length) { FX.dirty = 1; return; }
    if (bp) { const [i, j, k] = prev[0], p = E.proj(i + .5, j + .5, k + .5); result(E.bpTap(...hitPoint(i, j, k, p))); return; }
    if (T == 'break') { const [i, j, k] = prev[0], v = E.get(i, j, k); if (v) { E.push(); E.w[bbI(i, j, k)] = 0; result({ kind: 'break', at: [i, j, k], v }); } return; }
    if (T == 'boom') { const [i, j, k] = prev[0]; result(E.get(i, j, k) == BB_TNT ? { kind: 'light', at: [i, j, k] } : { kind: 'notnt' }); return; }
    if (T == 'clear') { askClear(prev); return; }
    if (prev.some(([a, b, z, v]) => T != 'stamp' && !E.decoOk(a, b, z, v))) { result({ kind: 'deco' }); return; }
    result({ kind: 'place', cells: E.put(prev), tool: T });
  }
  // the canvas point of a see-through block's middle (so a lifted aim is the same as a tap on it)
  const hitPoint = (i, j, k) => { const f = E.faces.find(q => q.ghost && q.i == i && q.j == j && q.k == k && q.f == 'top'); if (!f) return E.proj(i + .5, j + .5, k + 1); const p = f.poly; return [(p[0][0] + p[2][0]) / 2, (p[0][1] + p[2][1]) / 2]; };
  function askClear(cells) {
    const n = cells.length;
    const s = UI.sheet(`<div class="bb-sheet"><h2>Clear ${n} ${n == 1 ? 'block' : 'blocks'}?</h2><p>Undo can bring them back.</p>` +
      `<div class="acts">${UI.btn('Clear them', { kind: 'primary', size: 'lg', icon: 'trash', id: 'bbclr', wide: true })}${UI.btn('Keep them', { icon: 'close', id: 'bbkeep', wide: true })}</div></div>`);
    s.el.querySelector('#bbclr').onclick = () => {
      s.close();
      E.push();
      let shown = 0;
      for (const [a, b, z] of cells) { const v = E.get(a, b, z); if (!v) continue; E.w[bbI(a, b, z)] = 0; if (shown++ < 14) puff(a, b, z, v); }
      SFX.hit(); after();
    };
    s.el.querySelector('#bbkeep').onclick = () => s.close();
  }
  cv.addEventListener('pointerdown', e => {
    e.preventDefault();
    try { cv.setPointerCapture(e.pointerId); } catch (er) {}
    G1.ptrs.set(e.pointerId, [e.clientX, e.clientY]);
    if (G1.ptrs.size == 2) { // two fingers: pinch (whatever the first finger was doing stops)
      if (G1.g && G1.g.timer) clearTimeout(G1.g.timer);
      G1.g = null; G1.aim = false; G1.prev = null; G1.hold = null; G1.fp = null;
      const [p1, p2] = [...G1.ptrs.values()];
      G1.pinch = { d: Math.hypot(p1[0] - p2[0], p1[1] - p2[1]), mx: (p1[0] + p2[0]) / 2, my: (p1[1] + p2[1]) / 2 };
      return;
    }
    if (G1.ptrs.size > 2 || G1.pinch) return;
    const p = cpos(e.clientX, e.clientY);
    // an animal under the finger turns round with a heart; the tap still builds (R-02 #4: animals never get in the way)
    const an = E.animals.find(a => a.sx && Math.hypot(a.sx - p[0], a.sy - p[1]) < E.a() * .6);
    if (an) {
      an.dir *= -1;
      FX.parts.push({ x: an.sx, y: an.sy - E.a() * .4, vx: 0, vy: -E.a() * .05, l: 1, heart: 1, smoke: 1, s: E.a() * .8 });
    }
    G1.g = { id: e.pointerId, p0: p, p, last: p, t0: performance.now(), mode: 'wait' };
    G1.hold = { x: p[0], y: p[1], t: performance.now() };
    G1.g.timer = setTimeout(startAim, BB_HOLD);
  });
  cv.addEventListener('pointermove', e => {
    if (!G1.ptrs.has(e.pointerId)) return;
    G1.ptrs.set(e.pointerId, [e.clientX, e.clientY]);
    if (G1.pinch && G1.ptrs.size >= 2) {
      const [p1, p2] = [...G1.ptrs.values()], d = Math.hypot(p1[0] - p2[0], p1[1] - p2[1]), mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2;
      const m = cpos(mx, my);
      if (G1.pinch.d > 0) E.zoomAt(d / G1.pinch.d, m[0], m[1]);
      E.pan((mx - G1.pinch.mx) * dpr, (my - G1.pinch.my) * dpr);
      Object.assign(G1.pinch, { d, mx, my });
      E.dirty = 1;
      return;
    }
    const g = G1.g;
    if (!g || g.id != e.pointerId) return;
    const p = cpos(e.clientX, e.clientY);
    g.p = p;
    if (g.mode == 'wait' && Math.hypot(p[0] - g.p0[0], p[1] - g.p0[1]) > BB_SLOP * dpr) { // a drag: move the view
      clearTimeout(g.timer);
      g.mode = 'pan';
      G1.hold = null;
    }
    if (g.mode == 'pan') { E.pan(p[0] - g.last[0], p[1] - g.last[1]); g.last = p; E.dirty = 1; }
    else if (g.mode == 'aim') aimAt(p);
  });
  const up = e => {
    G1.ptrs.delete(e.pointerId);
    if (G1.pinch) { if (G1.ptrs.size < 2) { G1.pinch = null; G1.g = null; } return; }
    const g = G1.g;
    if (!g || g.id != e.pointerId) return;
    clearTimeout(g.timer);
    G1.g = null; G1.hold = null;
    if (g.mode == 'wait') result(E.tap(...g.p0));
    else if (g.mode == 'aim') endAim(true);
    FX.dirty = 1;
  };
  cv.addEventListener('pointerup', up);
  cv.addEventListener('pointercancel', e => {
    G1.ptrs.delete(e.pointerId);
    if (G1.g) clearTimeout(G1.g.timer);
    G1.g = null; G1.pinch = null; G1.hold = null;
    endAim(false);
  });
  cv.addEventListener('wheel', e => { e.preventDefault(); const p = cpos(e.clientX, e.clientY); E.zoomAt(e.deltaY < 0 ? 1.12 : 1 / 1.12, p[0], p[1]); E.dirty = 1; }, { passive: false });

  /* ---- the tool bar and the palette ---- */
  const TIPS = {
    build: 'Tap to build. Drag to look around.',
    break: 'Tap a block to break it, one at a time.',
    stamp: 'Pick a stamp below, then tap where it goes.',
    boom: 'Tap a TNT block to light it. Undo puts everything back.',
    line: 'Line: hold, then slide to draw a line of blocks.',
    wall: 'Wall: hold, then slide to build a wall 3 blocks tall.',
    floor: 'Floor: hold, then slide to fill a floor.',
    clear: 'Clear area: hold, then slide over the blocks to clear.',
  };
  const EXTRA = { line: ['line', 'Line'], wall: ['wall', 'Wall'], floor: ['floor', 'Floor'], clear: ['trash', 'Clear'] };
  function setTool(t, quiet) {
    E.tool = t;
    for (const q of $$('[data-tool]')) q.setAttribute('aria-pressed', String(q.dataset.tool == t));
    const more = $('#bbmore');
    if (more) { // More shows the extra tool that is on (Line, Wall, Floor, Clear), pressed
      const ex = EXTRA[t] || ['more', 'More'];
      more.innerHTML = bbIco(ex[0]) + `<span>${ex[1]}</span>`;
      more.setAttribute('aria-pressed', String(!!EXTRA[t]));
    }
    const st = $('#bbst');
    if (st) { st.hidden = t != 'stamp'; $('#bbpal').hidden = t == 'stamp'; edges(); }
    if (!quiet && !bp) tip(TIPS[t] || '');
  }
  for (const b of $$('.bb-seg [data-tool], #bbboom')) b.onclick = () => { const t = b.dataset.tool; setTool(E.tool == t && t == 'boom' ? 'build' : t); SFX.pop(1); };
  for (const b of $$('[data-b]')) b.onclick = () => {
    const i = +b.dataset.b, B = BLOCKS[i], left = need ? 0 : lockLeft(B);
    if (left) { SFX.wrong(); anim(b, 'sad'); say1(`Earn ${left} more ${left == 1 ? 'star' : 'stars'} in learning to unlock ${B.n}.`, 'info', 2800); return; }
    E.sel = i;
    for (const q of $$('[data-b]')) q.setAttribute('aria-pressed', String(q == b));
    SFX.pop(2);
    // choosing a block never switches the tool without saying so (R-02 #16)
    if (!bp && (E.tool == 'break' || E.tool == 'boom' || E.tool == 'clear')) { setTool('build', true); say1('Build: ' + B.n, 'info', 1400); anim($('#bbm-build'), 'jump'); }
  };
  for (const b of $$('[data-stamp]')) b.onclick = () => {
    E.stamp = +b.dataset.stamp;
    for (const q of $$('[data-stamp]')) q.setAttribute('aria-pressed', String(q == b));
    SFX.pop(2);
  };
  // the palette's scroll edges: a soft fade shows there is more on that side
  function edges() {
    for (const p of $$('.bb-pal')) {
      const s = p.firstElementChild;
      if (!s) continue;
      const v = getComputedStyle(s).flexDirection == 'column';
      const a = v ? s.scrollTop : s.scrollLeft, m = v ? s.scrollHeight - s.clientHeight : s.scrollWidth - s.clientWidth;
      p.classList.toggle('can-a', a > 2);
      p.classList.toggle('can-b', a < m - 2);
      p.classList.toggle('vert', v);
    }
  }
  for (const s of $$('.bb-ps')) s.addEventListener('scroll', edges, { passive: true });
  $('#bbundo').onclick = () => { if (E.doUndo()) { SFX.del(); after(); if (bp) lastLayer = E.layer(); } else say1('Nothing to undo yet.', 'info', 1200); };
  $('#bbredo').onclick = () => { if (E.doRedo()) { SFX.pop(2); after(); if (bp) lastLayer = E.layer(); } else say1('Nothing to redo.', 'info', 1200); };
  const turn = d => {
    E.rot = E.rot + d;
    FX.anim = { t0: performance.now(), ms: 360, ang0: E.ang, ang: E.rot * Math.PI / 2 };
    SFX.whoosh();
  };
  $('#bbrl').onclick = () => turn(-1);
  $('#bbrr').onclick = () => turn(1);
  const zoomBy = k => { FX.anim = { t0: performance.now(), ms: 240, zoom0: E.zoom, zoom: Math.max(E.zMin(), Math.min(E.zMax(), E.zoom * k)) }; SFX.pop(1); };
  $('#bbzi').onclick = () => zoomBy(1.4);
  $('#bbzo').onclick = () => zoomBy(1 / 1.4);
  if ($('#bbmore')) $('#bbmore').onclick = () => more();
  // More: the shape tools, Clear area, night, animals, building on the sides, the goals
  function more() {
    const t = (id, icon, label, on) => `<button class="bb-mt" data-mt="${id}" aria-pressed="${on ? 'true' : 'false'}">${bbIco(icon, 28)}<span>${esc(label)}</span></button>`;
    const g = bbGoalsOf(world);
    const s = UI.sheet(`<div class="bb-sheet bb-more"><h2>More tools</h2>
      <div class="bb-mts">${t('line', 'line', 'Line', E.tool == 'line')}${t('wall', 'wall', 'Wall', E.tool == 'wall')}${t('floor', 'floor', 'Floor', E.tool == 'floor')}` +
      `${t('clear', 'trash', 'Clear area', E.tool == 'clear')}${t('night', E.night ? 'sparkle' : 'moon', E.night ? 'Day' : 'Night', false)}${t('pet', 'paw', 'Add animal', false)}</div>
      ${UI.sw('Build on the sides of blocks', E.side, 'bbside')}
      <h3>Goals in this world</h3><ul class="bb-goals">${BB_GOALS.map(([id, txt, ic]) => `<li class="${g[id] ? 'on' : ''}">${ico(g[id] ? 'check-circle' : ic, 24)}<span>${esc(txt)}</span></li>`).join('')}</ul>
      <div class="acts">${UI.btn('Done', { kind: 'primary', size: 'lg', icon: 'check', id: 'bbmdone', wide: true })}</div></div>`);
    s.el.querySelector('#bbmdone').onclick = () => s.close();
    const sw = s.el.querySelector('#bbside');
    if (sw) sw.onchange = () => { E.side = !!sw.checked; say1(E.side ? 'Tap the side of a block to build next to it.' : 'Taps build on top again.', 'info'); };
    for (const b of s.el.querySelectorAll('[data-mt]')) b.onclick = () => {
      const k = b.dataset.mt;
      s.close();
      if (k == 'night') { E.night = !E.night; E.dirty = 1; SFX.whoosh(); if (E.night && E.w.includes(22)) goal('night'); return; }
      if (k == 'pet') { spawn(); return; }
      setTool(E.tool == k ? 'build' : k);
      SFX.pop(1);
    };
  }
  E.setNight = on => { E.night = !!on; E.dirty = 1; };

  GH.wire({quit: () => { bbSave(); gtStop(); bbMenu(); }});
  // the palette pictures, the stamp pictures
  for (const c of $$('[data-bc]')) bbIcon(c.getContext('2d'), +c.dataset.bc, c.width);
  for (const c of $$('[data-sc]')) bbMini(c, BBSTAMPS[+c.dataset.sc].c.map(([a, b, z, v]) => [a + 8, b + 8, z, v]));
  const selBtn = $(`[data-b="${E.sel}"]`);
  if (selBtn) selBtn.setAttribute('aria-pressed', 'true');
  BB.api = { tap: E.tap, hit: E.hit, get faces() { return E.faces; }, proj: E.proj, size, scene: () => scene(false), say: say1 };
  BB.resize = size;
  size();
  // the scene follows its box (the palette, the fonts and turning the tablet change it)
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => { if (!document.body.contains(cv)) { ro.disconnect(); return; } size(); });
    ro.observe(wrap);
  }
  scene(false);
  E.dirty = 0;
  if (bp) bbProg(); else goalChip();
  after();
  edges();
  requestAnimationFrame(frame);
  if (!bp) { spawn(); spawn(); }
  if (!window._bbrs) {
    window._bbrs = 1;
    let rs;
    addEventListener('resize', () => { clearTimeout(rs); rs = setTimeout(() => { if ($('#bbc') && BB && BB.resize) BB.resize(); }, 120); });
  }
  gtStart('#gtm', () => { bbSave(); timeUpOverlay(); });
  if (!bp && !bbS().seen) { bbS().seen = 1; save(); setTimeout(() => tip(TIPS.build), 500); }
  if (S.voice) setTimeout(() => say(bp ? `Build the ${bp.n}! Tap the see-through blocks.` : 'Tap to build! Drag to look around.'), 300);
}
const BB_HOLD = 300, BB_SLOP = 10; // ms a finger rests before aiming starts; CSS px a finger moves before it drags the view
// convex hull of points (the outline of a cube on screen)
function bbHull(pts) {
  const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]), cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [], hi = [];
  for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  for (let n = p.length - 1; n >= 0; n--) { const q = p[n]; while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], q) <= 0) hi.pop(); hi.push(q); }
  return lo.slice(0, -1).concat(hi.slice(0, -1));
}
function bbWin() {
  if (!BB || BB.ch == null || !$('#bbc')) return;
  const ci = BB.ch, P0 = BBP[ci], st = BB.miss <= 1 ? 3 : BB.miss <= 4 ? 2 : 1, bp = bbBP(), old = bp[P0.id] || 0;
  bp[P0.id] = Math.max(old, st);
  if (P0.old != null) { const ch = bbS().ch = Array.isArray(bbS().ch) ? bbS().ch : []; ch[P0.old] = Math.max(ch[P0.old] || 0, st); }
  const coins = Math.max(0, st - old) * 3 + 1;
  S.coins += coins;
  save();
  SFX.fanfare();
  if (S.voice) say(st == 3 ? 'Perfect build! Three stars!' : 'You built it!');
  // P4-16: the shared end card
  const o = GH.end('blocks', {
    win: true, title: `${P0.n} built!`, stars: st,
    stats: [[String(BB.miss), BB.miss == 1 ? 'mistake' : 'mistakes', 'blocks'], ['+' + coins, 'coins', 'coin']],
    lines: BB.miss ? [] : [['check-circle', 'No mistakes!']],
    btns: (ci + 1 < BBP.length ? UI.btn('Next build', { kind: 'primary', size: 'lg', icon: 'go', id: 'bbnx', wide: true }) : '') +
      UI.btn('Again', { icon: 'replay', id: 'bbre', wide: true }) + UI.btn('All builds', { icon: 'blocks', id: 'bbls', wide: true }),
  });
  const go = f => { o.remove(); f(); };
  if (o.querySelector('#bbnx')) o.querySelector('#bbnx').onclick = () => go(() => blockBuilder(ci + 1));
  o.querySelector('#bbre').onclick = () => go(() => blockBuilder(ci));
  o.querySelector('#bbls').onclick = () => go(() => { gtStop(); bbMenu(); });
}
function bbSave() {
  if (!BB || BB.ch != null || !BB.world) return;
  BB.world.d = bbEncode(BB.w);
  save();
}
// a block's picture in the palette: the cube (or the picture) on a canvas of sz x sz
function bbIcon(x, i, sz) {
  const B = BLOCKS[i];
  x.clearRect(0, 0, sz, sz);
  if (B.deco) {
    const img = B.k == 'pet' ? bbPetImg(() => { const c = document.querySelector(`[data-bc="${i}"]`); if (c) bbIcon(c.getContext('2d'), i, c.width); }) : bbSprite(B.k);
    if (img) { if (B.k == 'pet') x.drawImage(img, -sz * .2, -sz * .32, sz * 1.4, sz * 1.4); else x.drawImage(img, sz * .06, sz * .02, sz * .88, sz * .88); }
    return;
  }
  const im = bbFaceImgs(i), a = sz * .42, cx = sz / 2, top = sz * .08;
  const f = (img, O, U, V) => { x.setTransform(U[0] / BBT, U[1] / BBT, V[0] / BBT, V[1] / BBT, O[0], O[1]); x.drawImage(img, 0, 0); };
  f(im.t, [cx, top], [a, a / 2], [-a, a / 2]);
  f(im.l, [cx - a, top + a / 2], [a, a / 2], [0, a]);
  f(im.r, [cx, top + a], [a, -a / 2], [0, a]);
  x.setTransform(1, 0, 0, 1, 0, 0);
}

/* ---- the menu: blueprints first (visible without scrolling), then the worlds with their goals, then how to play ---- */
const BBWT = [['island', 'Island', 'Hills, beach, trees and sea'], ['mountain', 'Mountains', 'Tall peaks with snow on top'], ['desert', 'Desert', 'Sand, cactus and an oasis'], ['flat', 'Flat', 'Empty grass for big builds']];
const bbCells = w => { const o = []; for (let n = 0; n < w.length; n++) if (w[n]) o.push([n % BW, Math.floor(n / BW) % BD, Math.floor(n / (BW * BD)), w[n]]); return o; };
function bbMenu() {
  const bs = bbS(), stars = BBP.reduce((s, b, i) => s + bbStars(i), 0);
  const bpCard = (b, i) => {
    const ok = bbOpen(i), sv = bbStars(i), n = b.c().length;
    return `<button class="bb-bp${ok ? '' : ' lock'}${sv ? ' done' : ''}" data-ch="${i}" aria-label="${esc((i + 1) + '. ' + b.n + (ok ? '' : ', locked'))}">` +
      `<span class="bb-bpic"><canvas width="200" height="150" data-bpc="${i}"></canvas>${ok ? '' : `<span class="bb-lk">${ico('lock', 26)}</span>`}</span>` +
      `<span class="bb-bpn">${i + 1}. ${esc(b.n)}</span>` +
      (ok ? `<span class="bb-bps">${UI.stars(sv, 3, 20)}<span>${n} blocks</span></span>` : `<span class="bb-bpl">Finish ${esc(BBP[i - 1].n)} first</span>`) + '</button>';
  };
  const wCard = (w, i) => {
    const d = bbDecode(w.d), n = d.filter(v => v).length, gn = bbGoalN(w);
    return `<div class="bb-wrow"><button class="bb-w" data-w="${i}" aria-label="${esc('Play ' + w.name)}"><span class="bb-wpic"><canvas width="220" height="150" data-wc="${i}"></canvas></span>` +
      `<span class="bb-wi"><b>${esc(w.name)}</b><span>${n} blocks</span><span class="bb-wg">${ico('target', 18)}${gn} of ${BB_GOALS.length} goals</span></span>` +
      `<span class="bb-go" aria-hidden="true">${ico('play')}</span></button>` +
      (bs.worlds.length > 1 ? UI.ibtn('trash', 'Delete ' + w.name, { size: 'sm', cls: 'bb-del', attrs: `data-del="${i}"` }) : '') + '</div>';
  };
  const how = [['build', 'Tap a spot to build on top of it.'], ['arrow-right', 'Drag one finger to look around. Pinch with two to zoom.'],
    ['closer', 'Closer and Farther zoom. Left and Right turn the island.'], ['stamp', 'Build, Break and Stamp are at the bottom.'],
    ['undo', 'Undo takes a step back. Redo puts it back.'], ['boom', 'Boom lights a TNT block. Building on TNT is safe.'],
    ['hint', 'Hold your finger still, then slide: the bubble shows where it goes.']];
  view(`${GH.top('blocks')}
  <div class="scroll bb-menu"><section class="bb-sec"><h2>${ico('blocks', 28)}<span>Blueprints</span><span class="bb-sc">${ico('star', 20, 'ic-star')}${stars} of ${BBP.length * 3}</span></h2>
   <p class="bb-lead">Copy the see-through build, one layer at a time.</p><div class="bb-bpg">${BBP.map(bpCard).join('')}</div></section>
  <section class="bb-sec"><h2>${ico('home', 28)}<span>My worlds</span></h2><div class="bb-wl">${bs.worlds.map(wCard).join('')}
   ${bs.worlds.length < 4 ? `<button class="bb-w bb-new" id="bbnew"><span class="bb-wpic bb-plus">${ico('plus', 40)}</span><span class="bb-wi"><b>New world</b><span>Island, mountains, desert or flat</span></span></button>` : ''}</div></section>
  <section class="bb-sec bb-how"><h2>${ico('info', 28)}<span>How to build</span></h2><ul>${how.map(([i, t]) => `<li>${bbIco(i, 26)}<span>${esc(t)}</span></li>`).join('')}</ul></section></div>`);
  GH.wire({ back: gameRoom });
  for (const b of $$('[data-ch]')) b.onclick = () => {
    const i = +b.dataset.ch;
    if (!bbOpen(i)) { SFX.wrong(); anim(b, 'sad'); fb('Finish ' + BBP[i - 1].n + ' first!', 'warn'); return; }
    if (ptLeft() <= 0) { SFX.wrong(); fb(ptWhyNot(), 'warn long', 3000); return; }
    SFX.whoosh();
    blockBuilder(i);
  };
  for (const b of $$('[data-w]')) b.onclick = () => {
    if (ptLeft() <= 0) { SFX.wrong(); fb(ptWhyNot(), 'warn long', 3000); return; }
    bs.cur = +b.dataset.w;
    save();
    SFX.whoosh();
    blockBuilder();
  };
  for (const b of $$('[data-del]')) b.onclick = () => {
    const i = +b.dataset.del;
    const s = UI.sheet(`<div class="bb-sheet"><h2>Delete ${esc(bs.worlds[i].name)}?</h2><p>This world and everything built in it will be gone.</p>` +
      `<div class="acts">${UI.btn('Keep it', { kind: 'primary', size: 'lg', icon: 'check', id: 'bbkeepw', wide: true })}${UI.btn('Delete', { icon: 'trash', id: 'bbdelw', wide: true })}</div></div>`);
    s.el.querySelector('#bbkeepw').onclick = () => s.close();
    s.el.querySelector('#bbdelw').onclick = () => { s.close(); bs.worlds.splice(i, 1); bs.cur = 0; save(); SFX.del(); bbMenu(); };
  };
  if ($('#bbnew')) $('#bbnew').onclick = () => {
    const s = UI.sheet(`<div class="bb-sheet"><h2>Pick a world</h2><div class="bb-wl">${BBWT.map(([k, n, d]) => `<button class="bb-w" data-t="${k}"><span class="bb-wpic"><canvas width="220" height="150" data-tc="${k}"></canvas></span>` +
      `<span class="bb-wi"><b>${esc(n)}</b><span>${esc(d)}</span></span></button>`).join('')}</div><div class="acts">${UI.btn('Cancel', { icon: 'close', id: 'bbwx', wide: true })}</div></div>`);
    s.el.querySelector('#bbwx').onclick = () => s.close();
    for (const c of s.el.querySelectorAll('[data-tc]')) bbMini(c, bbCells(bbGen(c.dataset.tc, 7)));
    for (const b of s.el.querySelectorAll('[data-t]')) b.onclick = () => {
      const t = BBWT.find(q => q[0] == b.dataset.t);
      bs.worlds.push({ name: `${t[1]} ${bs.worlds.length + 1}`, d: bbEncode(bbGen(t[0], R(1, 9999))) });
      bs.cur = bs.worlds.length - 1;
      save();
      s.close();
      SFX.magic();
      if (ptLeft() > 0) blockBuilder(); else bbMenu();
    };
  };
  // the pictures: each blueprint as it will look, each world as it is now
  const petImg = bbPetImg(() => { for (const c of $$('[data-wc]')) bbMini(c, bbCells(bbDecode(bs.worlds[+c.dataset.wc].d)), { pet: BBPETIMG && BBPETIMG.img }); });
  for (const c of $$('[data-bpc]')) bbMini(c, BBP[+c.dataset.bpc].c().map(([a, b, z, v]) => [a + 2, b + 2, z, v]));
  // the row of blueprints starts at the next one to build
  const nx = BBP.findIndex((b, i) => bbOpen(i) && !bbStars(i)), card = nx > 0 && $(`[data-ch="${nx}"]`);
  if (card && card.parentNode) card.parentNode.scrollLeft = Math.max(0, card.offsetLeft - card.parentNode.offsetLeft - 24);
  for (const c of $$('[data-wc]')) bbMini(c, bbCells(bbDecode(bs.worlds[+c.dataset.wc].d)), { pet: petImg });
}
