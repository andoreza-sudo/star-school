/* ---------- Game Room hub and shared game chrome (P4-16; DESIGN_SYSTEM.md 9 row 8; CSS src/css/48-game-hub.css) ----------
   Lives in games.<VER>.js (A11b) and loads before the games (60-blocks ... 72-shapes, NN-game-*.js), so a game file may call GH.reg()
   while it loads. gameRoom() (58-playtime.js, index.html) calls GH.hub() inside a tap, never while loading.

   Adding a game (CONTRIBUTING 3.3): one GH.reg({...}) entry, in the game's own src/js/NN-game-<name>.js or below. The hub card, the
   top-bar badge, the pause sheet and the end card all come from that entry:
     id       short id ('hill'); the card has data-g="<id>"
     btn      the card's element id ('g4x4'; kept for old taps and tests)
     name     the game's name on the card, the pause sheet and the end card
     short    optional shorter name for the top bar ('Hill Climb')
     icon     an ico() name for the small badge in the top bar
     p        colour: play | read | es | math | disc | bt (the component classes s-<p>)
     sky      two --sc-* scene tokens for the picture's backdrop, top and bottom ('sky-1', 'sky')
     art      () => the picture: SVG markup on a 240 x 100 grid (object-art roles var(--a-x) only; keep the subject in x 30-210)
     sub      () => one short line under the name (HTML; escape what is not a literal)
     open     () => the game's first screen (its menu)
     lock     optional () => '' or a reason the game cannot be opened yet (shown on the card and said in a toast)
     tapToPlay  the selector of the button on the game's first screen that starts play (smoke taps it: P4-16 block)
     saved    optional line for the time-up card ('Your picture is saved.')
   Each screen of the game draws its top bar with GH.top(id, o) and wires it with GH.wire(o) after view(); play screens get a Pause
   button that opens the shared sheet (GH.pause); game ends use GH.end(id, o); time running out uses timeUpOverlay() (64-gtimer.js).

   Drawings follow the object-art rules of DESIGN_SYSTEM 6.5: light from the top left, shade / base / highlight per area, a soft ink
   contact shadow, roles var(--a-x) only (class "art"), no ids, gradients, filters, <use>, text or raw colours. Decoration is aria-hidden.
   Nothing here changes a game's rules, scores or saved data; pausing holds the game-time clock while the sheet is open. */
const gh1 = v => Math.round(v * 10) / 10;
const ghF = (c, o) => `fill="var(--a-${c})"` + (o != null && o < 1 ? ` opacity="${o}"` : '');
const ghSt = (c, w, o) => `fill="none" stroke="var(--a-${c})" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"` +
  (o != null && o < 1 ? ` opacity="${o}"` : '');
const ghC = (x, y, r, c, o) => `<circle cx="${gh1(x)}" cy="${gh1(y)}" r="${gh1(r)}" ${ghF(c, o)}/>`;
const ghE = (x, y, rx, ry, c, o, a) => `<ellipse cx="${gh1(x)}" cy="${gh1(y)}" rx="${gh1(rx)}" ry="${gh1(ry)}" ${ghF(c, o)}` +
  (a ? ` transform="rotate(${a} ${gh1(x)} ${gh1(y)})"` : '') + '/>';
const ghR = (x, y, w, h, r, c, o) => `<rect x="${gh1(x)}" y="${gh1(y)}" width="${gh1(w)}" height="${gh1(h)}"${r ? ` rx="${r}"` : ''} ${ghF(c, o)}/>`;
const ghP = (d, c, o) => `<path ${ghF(c, o)} d="${d}"/>`;
const ghL = (d, c, w, o) => `<path ${ghSt(c, w, o)} d="${d}"/>`;
const ghPts = pts => 'M' + pts.map(([x, y]) => gh1(x) + ' ' + gh1(y)).join('L') + 'Z';
// a shaded ball: shade, the base nudged toward the light, a soft highlight
const ghBall = (x, y, r, h) => ghC(x, y, r, h + '2') + ghC(x - r * .12, y - r * .12, r * .86, h) + ghE(x - r * .36, y - r * .4, r * .32, r * .2, 'w', .55, -35);
// a puffy cloud: a shade row, then the white puffs nudged up-left
const ghCloud = (x, y, s) => {
  const puffs = [[-14, 2, 8], [-4, -4, 11], [9, -1, 9], [17, 3, 6]];
  const row = (dx, dy, c) => ghP(puffs.map(([px, py, r]) => {
    const cx = x + (px + dx) * s, cy = y + (py + dy) * s, R = r * s;
    return `M${gh1(cx - R)} ${gh1(cy)}a${gh1(R)} ${gh1(R)} 0 1 0 ${gh1(2 * R)} 0a${gh1(R)} ${gh1(R)} 0 1 0 ${gh1(-2 * R)} 0`;
  }).join('') + `M${gh1(x - 19 * s + dx * s)} ${gh1(y + 5 * s + dy * s)}a${gh1(20.5 * s)} ${gh1(5 * s)} 0 1 0 ${gh1(41 * s)} 0` +
    `a${gh1(20.5 * s)} ${gh1(5 * s)} 0 1 0 ${gh1(-41 * s)} 0`, c);
  return row(1.2, 1.8, 'w2') + row(0, 0, 'w') + ghE(x - 6 * s, y - 8 * s, 5 * s, 2.6 * s, 'w', .9, -20);
};
const ghShad = (x, y, rx, ry, o = .13) => ghE(x, y, rx, ry, 'k', o);
// sun with soft rays (top left: where the light comes from)
const ghSun = (x, y, r) => {
  let d = '';
  for (let i = 0; i < 10; i++) {
    const a = i * Math.PI / 5, c = Math.cos(a), s = Math.sin(a);
    d += `M${gh1(x + c * r * 1.35)} ${gh1(y + s * r * 1.35)}L${gh1(x + c * r * 1.75)} ${gh1(y + s * r * 1.75)}`;
  }
  return ghL(d, 'y1', gh1(r * .22), .9) + ghC(x, y, r * 1.18, 'y1', .45) + ghBall(x, y, r, 'y');
};
// a round tree: trunk, shaded crown
const ghTree = (x, y, s) => ghShad(x + 2 * s, y, 9 * s, 2.2 * s) + ghR(x - 1.6 * s, y - 9 * s, 3.2 * s, 9 * s, 1, 'n2') +
  ghC(x + 1.2 * s, y - 15 * s, 8.6 * s, 'g2') + ghC(x - .4 * s, y - 16.6 * s, 7.4 * s, 'g') + ghE(x - 3.4 * s, y - 20 * s, 3 * s, 1.9 * s, 'g1', .8, -30);
// a hexagon nut (the bolts Hill Climb pays in)
const ghNut = (x, y, r) => {
  const hx = (cx, cy, R) => ghPts([0, 1, 2, 3, 4, 5].map(i => [cx + Math.cos(i * Math.PI / 3) * R, cy + Math.sin(i * Math.PI / 3) * R]));
  return ghP(hx(x + r * .12, y + r * .14, r), 'y3') + ghP(hx(x - r * .04, y - r * .04, r * .9), 'y') + ghC(x, y, r * .38, 'y3') +
    ghL(`M${gh1(x - r * .62)} ${gh1(y - r * .5)}L${gh1(x - r * .2)} ${gh1(y - r * .78)}`, 'y1', gh1(r * .26));
};

/* ---- the three games' pictures (240 x 100) ---- */
const GH_ART = {
  // 4x4 Hill Climb: a red jeep climbing a grassy hill to a finish flag, bolts ahead, dust behind
  hill() {
    const S = 'M0 86C60 86 100 80 140 64S206 38 240 36';
    const S9 = 'M0 95C60 95 100 89 140 73S206 47 240 45';
    // the jeep in its own frame: wheels on y 0, x -26 and 26; drawn level, then tilted onto the slope
    const wheel = x => ghC(x + 1, 1, 13, 'k') + ghC(x, 0, 12.4, 'k2') + ghC(x - .6, -.6, 6.6, 'e1') + ghC(x + .6, .6, 5, 'e') +
      ghC(x, 0, 2.4, 'e3') + ghE(x - 5.6, -7, 3.4, 1.8, 'w', .35, -40);
    const jeep = ghShad(2, 13.5, 44, 3.4, .16) +
      ghL('M-58 4l-7 -2M-56 -3l-9 -4', 'w', 3, .8) + ghC(-50, 6, 5.4, 'w', .8) + ghC(-58, 2, 4, 'w', .65) +
      ghP('M-12 -22L-7 -40H17L25 -22Z', 'r2') + ghP('M-11 -23L-6.5 -39H15.5L22.5 -23Z', 'r') +
      ghP('M-6 -24L-2.6 -35.5H13L18.5 -24Z', 'c1') + ghP('M-2.6 -35.5H5L-1 -24H-6Z', 'w', .65) +
      ghR(-42, -24, 86, 22, 7, 'r2') + ghR(-43, -26, 84, 20, 7, 'r') + ghR(-39, -24, 76, 5, 2.5, 'r1', .7) +
      ghR(-40, -12, 80, 4, 2, 'r3', .55) + ghR(38, -21, 8, 9, 3, 'y2') + ghC(41, -18, 3, 'y1') + ghR(-47, -14, 9, 7, 2.5, 'k2') +
      ghR(-44, -9, 88, 6, 3, 'r3') + ghL('M-40 -6a14 14 0 0 1 28 0M12 -6a14 14 0 0 1 28 0', 'k2', 4) + wheel(-26) + wheel(26) + ghL('M-30 -46L-30 -30', 'e3', 1.8) + ghP('M-30 -46L-19 -42L-30 -38Z', 'y');
    let pebbles = '';
    for (const [x, y, r] of [[18, 97, 2.2], [52, 98, 1.6], [86, 96, 2.4], [150, 88, 2], [196, 72, 2.6], [228, 62, 1.8], [118, 94, 1.5]]) {
      pebbles += ghE(x, y, r * 1.4, r, 'n2') + ghE(x - r * .3, y - r * .35, r * .6, r * .35, 'n1', .8);
    }
    return ghSun(30, 22, 11) + ghCloud(86, 20, 1) + ghCloud(196, 15, .78) +
      ghP('M0 66Q30 46 66 58T136 50T206 44T240 50V100H0Z', 'g1') +
      ghTree(168, 50, .7) + ghTree(182, 48, .55) + ghTree(40, 62, .6) +
      ghP(S + 'V100H0Z', 'g') + ghP(S9 + 'V100H0Z', 'n') + ghL(S9, 'g2', 3) + ghL(S, 'g1', 2.2) + pebbles +
      ghL('M223 39V12', 'e3', 2) + ghR(223, 12, 15, 10, 1, 'w') +
      ghP('M223 12h5v5h-5ZM233 12h5v5h-5ZM228 17h5v5h-5Z', 'k2') + ghShad(224, 39, 5, 1.4) +
      ghNut(160, 50, 4.6) + ghNut(176, 43, 4.6) + ghNut(192, 34, 4.6) +
      `<g transform="translate(104 70) rotate(-16)">${jeep}</g>`;
  },
  // Coloring: an easel with a rainbow painting, a wooden palette with paint, a brush and two crayons
  art() {
    const blob = (x, y, c) => ghE(x + .6, y + .8, 6, 4.4, c + '2') + ghE(x - .3, y - .3, 5.2, 3.8, c) + ghE(x - 2, y - 1.6, 1.8, 1, 'w', .7, -20);
    let arcs = '';
    ['r', 'o', 'y', 'g', 'b', 'v'].forEach((c, i) => {
      const R = 30 - i * 4.4;
      arcs += ghL(`M${gh1(120 - R)} 66A${gh1(R)} ${gh1(R)} 0 0 1 ${gh1(120 + R)} 66`, c, 4.6);
    });
    const crayon = (x, y, a, c) => `<g transform="rotate(${a} ${x} ${y})">` + ghShad(x + 1, y + 6, 20, 2.4) +
      ghR(x - 18, y - 4, 32, 8, 2, c + '2') + ghR(x - 18, y - 4.6, 32, 7, 2, c) + ghR(x - 8, y - 4.6, 10, 7, 0, 'w', .85) +
      ghP(`M${x + 14} ${y - 4.6}L${x + 23} ${y - .6}L${x + 14} ${y + 3.6}Z`, c + '2') + ghR(x - 16, y - 3.4, 26, 1.6, .8, c + '1', .8) + '</g>';
    return ghShad(120, 97, 46, 3.6) + ghL('M120 8L95 97M120 8L145 97', 'n2', 4.6) + ghL('M120 40L120 97', 'n3', 4) +
      ghL('M118 8L94.5 96', 'n1', 1.2, .7) +
      ghR(82, 9, 78, 58, 3, 'w3') + ghR(80, 7, 78, 58, 3, 'w') + ghR(84, 11, 70, 50, 2, 'm', .55) +
      ghSun(98, 22, 5.4) + ghCloud(140, 22, .5) + arcs + ghR(78, 64, 84, 6, 2.5, 'n2') + ghR(78, 63, 84, 4.4, 2, 'n') +
      ghShad(64, 96, 38, 3.4) +
      `<path ${ghF('t2')} fill-rule="evenodd" d="M30 80C30 66 48 58 66 60C86 62 100 70 98 82C96 92 84 96 70 94C62 93 62 87 56 87C48 87 44 95 36 92C31 90 30 86 30 80ZM44 76a5 4 0 1 0 10 0a5 4 0 1 0 -10 0Z"/>` +
      `<path ${ghF('t')} fill-rule="evenodd" d="M31 78C31 65 48 58 65 59C84 61 97 68 96 79C95 89 84 93 71 91C63 90 63 84 56 84C48 84 44 92 37 89C32 87 31 83 31 78ZM44 76a5 4 0 1 0 10 0a5 4 0 1 0 -10 0Z"/>` +
      ghL('M38 69C44 63 54 61 62 61', 't1', 2.4, .9) +
      blob(64, 68, 'r') + blob(80, 70, 'y') + blob(88, 81, 'b') + blob(74, 84, 'g') + blob(40, 82, 'v') +
      ghShad(186, 97, 22, 2.6) + ghL('M170 95L198 52', 'n2', 6) + ghL('M169 94L197 51', 'n', 4.6) + ghL('M171 89L192 57', 'n1', 1.4, .8) +
      ghL('M197 51L202.5 43', 'e2', 7) + ghL('M196.5 50.5L201.5 43', 'e1', 4.4) +
      ghP('M200 45C201 40 206 33 212 30C213 36 210 43 205 48Z', 'p2') + ghP('M200 45C201 40 205 34 210 31C210.5 36 208 42 203.5 46.5Z', 'p') +
      ghC(209, 38, 1.4, 'w', .7) +
      crayon(196, 90, -8, 'b') + crayon(150, 93, 6, 'g') +
      ghE(176, 58, 3, 2.2, 'b') + ghE(165, 66, 2, 1.5, 'r') + ghE(30, 52, 2.6, 2, 'y2') + ghE(22, 60, 1.6, 1.2, 'g');
  },
  // Block Builder: a little block island on the sea: grass, a tree, stone, TNT and a block on its way down
  blocks() {
    const a = 12, ox = 118, oy = 54;
    const at = (i, j, k) => [ox + (i - j) * a, oy + (i + j) * a / 2 - k * a];
    const KIND = {
      grass: ['g1', 'n', 'n2', 'g', 'g2'], stone: ['e1', 'e', 'e2'], wood: ['t1', 'n1', 'n'], leaf: ['g1', 'g', 'g2'],
      tnt: ['r1', 'r', 'r2'], sand: ['t1', 't', 't2'],
    };
    const cube = (i, j, k, kind) => {
      const [X, Y] = at(i, j, k), T = KIND[kind];
      const top = ghPts([[X, Y - a / 2], [X + a, Y], [X, Y + a / 2], [X - a, Y]]);
      const left = ghPts([[X - a, Y], [X, Y + a / 2], [X, Y + a * 1.5], [X - a, Y + a]]);
      const right = ghPts([[X, Y + a / 2], [X + a, Y], [X + a, Y + a], [X, Y + a * 1.5]]);
      let h = ghP(top, T[0]) + ghP(left, T[1]) + ghP(right, T[2]);
      if (kind == 'grass') h += ghP(ghPts([[X - a, Y], [X, Y + a / 2], [X, Y + a * .85], [X - a, Y + a * .35]]), T[3]) +
        ghP(ghPts([[X, Y + a / 2], [X + a, Y], [X + a, Y + a * .35], [X, Y + a * .85]]), T[4]);
      if (kind == 'tnt') h += ghP(ghPts([[X - a, Y + a * .32], [X, Y + a * .82], [X, Y + a * 1.12], [X - a, Y + a * .62]]), 'w') +
        ghP(ghPts([[X, Y + a * .82], [X + a, Y + a * .32], [X + a, Y + a * .62], [X, Y + a * 1.12]]), 'w2');
      if (kind == 'stone') h += ghL(`M${gh1(X - a * .7)} ${gh1(Y + a * .5)}l${gh1(a * .3)} ${gh1(a * .3)}l${gh1(a * .15)} ${gh1(-a * .1)}`, 'e2', 1.2) +
        ghL(`M${gh1(X + a * .3)} ${gh1(Y + a * .9)}l${gh1(a * .35)} ${gh1(-a * .3)}`, 'e3', 1.2);
      if (kind == 'wood') h += ghL(`M${gh1(X - a * .5)} ${gh1(Y + a * .3)}v${gh1(a * .9)}`, 'n2', 1.2, .7);
      return h + ghL(`M${gh1(X - a)} ${gh1(Y)}L${gh1(X)} ${gh1(Y - a / 2)}`, 'w', 1.2, .55);
    };
    // the sea: a flat diamond under the island with a deep edge and waves
    const [sx, sy] = at(1, 1, 0);
    const sea = (d, c) => ghP(ghPts([[sx, sy - 52 + d], [sx + 104, sy + d], [sx, sy + 52 + d], [sx - 104, sy + d]]), c);
    let waves = '';
    for (const [x, y] of [[54, 72], [74, 84], [168, 78], [186, 70], [150, 92], [92, 94]]) waves += `M${x} ${y}q4 -3 8 0t8 0`;
    const blocks = [];
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) blocks.push([i, j, 0, i == 2 && j == 2 ? 'sand' : 'grass']);
    blocks.push([2, 0, 1, 'wood'], [2, 0, 2, 'leaf'], [1, 0, 2, 'leaf'], [2, 1, 2, 'leaf'], [2, 0, 3, 'leaf'],
      [0, 0, 1, 'stone'], [0, 1, 1, 'stone'], [0, 0, 2, 'tnt']);
    blocks.sort((p, q) => (p[0] + p[1]) - (q[0] + q[1]) || p[2] - q[2] || p[0] - q[0]);
    const [gx, gy] = at(1, 2, 1);
    return ghSun(30, 22, 11) + ghCloud(196, 16, .8) + ghCloud(62, 34, .55) +
      sea(5, 'b2') + sea(0, 'b') + ghP(ghPts([[sx, sy - 52], [sx + 104, sy], [sx + 70, sy + 2], [sx - 4, sy - 44], [sx - 70, sy - 14], [sx - 104, sy]]), 'b1', .45) +
      ghL(waves, 'w', 1.6, .8) + ghShad(sx + 4, sy + 26, 54, 12, .14) +
      blocks.map(b => cube(...b)).join('') +
      // a ghost outline where the next block will land, and the grass block dropping into it
      ghL(ghPts([[gx, gy - a / 2], [gx + a, gy], [gx, gy + a / 2], [gx - a, gy]]), 'w', 1.6, .9) +
      `<g transform="translate(0 -22)">${cube(1, 2, 1, 'grass')}</g>` +
      ghL(`M${gx - 6} ${gy - 30}v-6M${gx} ${gy - 33}v-7M${gx + 6} ${gy - 30}v-6`, 'w', 1.6, .8);
  },
};

const GH = {
  games: [],
  cur: null, // id of the game whose top bar is on screen (end and time-up cards use it)
  held: false, // the pause sheet is open: the game-time clock does not count (64-gtimer.js, Hill Climb's loop)

  // register a game (see the header); a second entry with the same id replaces the first
  reg(g) {
    GH.games = GH.games.filter(x => x.id !== g.id).concat([g]);
    return g;
  },
  get(id) {
    return GH.games.find(g => g.id === id) || null;
  },

  // the game's picture as an SVG; cls adds a class (the well's size comes from CSS)
  pic(id, cls = '') {
    const g = GH.get(id);
    if (!g || !g.art) return '';
    return `<svg class="art gh-art${cls ? ' ' + cls : ''}" viewBox="0 0 240 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${g.art()}</svg>`;
  },
  // the picture's backdrop (two scene tokens), as an inline style
  sky(g) {
    const [a, b] = g.sky || ['sky-1', 'sky'];
    return `--gh-a:var(--sc-${a});--gh-b:var(--sc-${b})`;
  },

  /* ---- the hub: a fairground scene with the game-time ticket, a drawn card per game, how to earn more ---- */
  hub() {
    const left = ptLeft(), on = left > 0;
    GH.cur = null;
    const card = g => {
      const lock = g.lock ? g.lock() : '', need = !lock && !on;
      const state = lock ? ' lock' : need ? ' need' : '';
      const flag = lock ? `<span class="gh-flag">${ico('lock', 20)}<span>${esc(lock)}</span></span>`
        : need ? `<span class="gh-flag">${ico('ticket', 20)}<span>Needs game time</span></span>` : '';
      return `<button class="gh-card s-${g.p}${state}" id="${g.btn}" data-g="${g.id}"${lock ? ' aria-disabled="true"' : ''}>` +
        `<span class="gh-pic" style="${GH.sky(g)}">${GH.pic(g.id)}${flag}</span>` +
        `<span class="gh-info"><span class="gh-name">${UI.t(g.name)}</span><span class="gh-sub">${g.sub ? g.sub() : ''}</span></span>` +
        `<span class="gh-go" aria-hidden="true">${ico(lock ? 'lock' : 'play')}</span></button>`;
    };
    const R_ = n => `<span class="gh-ei">${ico(n, 22)}</span>`;
    const earn = ptEarnList(); // P5-09: the same list as ptRules (58-playtime.js)
    view(`<div class="gh-room"><div class="top tbar gh-top gh-mtop s-play">${UI.ibtn('back', 'Back', { size: 'sm', id: 'back' })}` +
      `<div class="ttl gh-ttl"><span class="gh-tb">${ico('gamepad', 24)}</span><span class="gh-tt"><span class="gh-gn">Game Room</span></span></div>` +
      `${UI.chip('ticket', fmtT(left), { aria: 'Game time', id: 'gtm' })}</div>
  <div class="scroll gh-scroll"><section class="gh-hero${on ? '' : ' off'}">${GH.scene()}
    <div class="gh-tk" role="img" aria-label="${on ? esc(fmtT(left) + ' of game time left') : 'No game time yet'}">${GH.ticket(on)}
      <span class="gh-tkt"><b>${on ? fmtT(left) : '0:00'}</b><span>${on ? 'game time left' : 'No game time yet'}</span></span></div></section>
  ${on ? '' : `<div class="gh-why"><p>${esc(ptWhyNot())}</p>${UI.btn('Go earn game time', { kind: 'primary', size: 'lg', icon: 'path-read', id: 'learn' })}</div>`}
  <div class="gh-grid">${GH.games.map(card).join('')}</div>
  <section class="gh-earn"><h2>${ico('ticket', 26)}<span>How to earn more game time</span></h2>
   <ul>${earn.map(([i, t, v]) => `<li>${R_(i)}<span>${esc(t)}</span><b>${esc(v)}</b></li>`).join('')}</ul>
   <p>Replaying a stop you already mastered, or the same stop over and over, earns less.</p></section></div></div>`);
    $('#back').onclick = () => home();
    if ($('#learn')) $('#learn').onclick = () => home();
    for (const g of GH.games) {
      const b = $('#' + g.btn);
      if (b) b.onclick = () => {
        const why = g.lock ? g.lock() : '';
        if (why) {
          SFX.wrong();
          fb(why, 'warn long', 2600);
          return;
        }
        SFX.whoosh();
        g.open();
      };
    }
  },

  // the hub's scene: a fair on green hills under bunting (960 x 180, the sky is the CSS gradient behind it). The middle third
  // (Ferris wheel, balloons, big top) is what a phone shows; wider screens also see the stalls, hot-air balloons and trees.
  scene() {
    const hues = ['r', 'y', 'b', 'g', 'p', 'o'];
    // bunting: four sagging strings, flags grouped by colour into one path per tone
    let str = '';
    const fl = {};
    for (let k = 0; k < 4; k++) {
      const x0 = k * 240, x1 = x0 + 240, cx = x0 + 120, y0 = 6, cy = 46;
      str += `M${x0} ${y0}Q${cx} ${cy} ${x1} ${y0}`;
      for (let i = 1; i < 12; i++) {
        const t = i / 12, x = (1 - t) * (1 - t) * x0 + 2 * t * (1 - t) * cx + t * t * x1, y = (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * cy + t * t * y0;
        const h = hues[(i + k * 2) % hues.length];
        fl[h] = fl[h] || ['', ''];
        fl[h][0] += ghPts([[x - 7, y], [x + 7, y], [x, y + 15]]);
        fl[h][1] += ghPts([[x, y], [x + 7, y], [x, y + 15]]);
      }
    }
    let flags = '';
    for (const h of hues) if (fl[h]) flags += ghP(fl[h][0], h) + ghP(fl[h][1], h + '2', .55);
    // Ferris wheel
    const wx = 376, wy = 94, R = 47;
    let spokes = '', cars = '';
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4 + .2, x = wx + Math.cos(a) * R, y = wy + Math.sin(a) * R, h = hues[i % 5];
      spokes += `M${wx} ${wy}L${gh1(x)} ${gh1(y)}`;
      cars += ghL(`M${gh1(x)} ${gh1(y)}v5`, 'e3', 1.4) + ghR(x - 7, y + 4.6, 14, 10, 3.4, h + '2') + ghR(x - 7.6, y + 4, 13, 8.6, 3.2, h) +
        ghR(x - 5, y + 5.4, 8, 2, 1, 'w', .55);
    }
    const wheel = ghShad(wx, 162, 42, 4) + ghL(`M${wx - 34} 162L${wx} ${wy}L${wx + 34} 162`, 'e3', 6) +
      ghL(`M${wx - 33} 161L${wx - 1} ${wy}M${wx + 1} ${wy}L${wx + 33} 161`, 'e1', 2.2, .9) +
      `<circle cx="${wx}" cy="${wy}" r="${R}" ${ghSt('v2', 5)}/>` + `<circle cx="${wx - .8}" cy="${wy - .8}" r="${R}" ${ghSt('v', 3)}/>` +
      `<circle cx="${wx}" cy="${wy}" r="${R - 9}" ${ghSt('v1', 1.6, .9)}/>` + ghL(spokes, 'w2', 1.6) + cars + ghBall(wx, wy, 6.5, 'y');
    // big top tent
    const tx = 596, ty = 104, tw = 58;
    let roof = '', wall = '';
    for (let i = -3; i < 3; i += 2) {
      roof += ghPts([[tx, ty - 58], [tx + i * tw / 3, ty], [tx + (i + 1) * tw / 3, ty]]);
      wall += `M${gh1(tx + i * tw / 3)} ${ty}h${gh1(tw / 3)}v52h${gh1(-tw / 3)}Z`;
    }
    let scal = `M${tx - tw - 2} ${ty}`;
    for (let i = 0; i < 8; i++) scal += `a${gh1((tw + 2) / 8)} 7 0 0 0 ${gh1((tw + 2) / 4)} 0`;
    const tent = ghShad(tx + 6, 157, 70, 5) + ghR(tx - tw + 2, ty, tw * 2 - 4, 52, 0, 'w') + ghP(wall, 'r') +
      ghP(`M${tx} ${ty + 12}C${tx - 14} ${ty + 12} ${tx - 16} ${ty + 30} ${tx - 16} ${ty + 52}H${tx + 16}C${tx + 16} ${ty + 30} ${tx + 14} ${ty + 12} ${tx} ${ty + 12}Z`, 'k2') +
      ghP(`M${tx} ${ty + 12}C${tx - 14} ${ty + 12} ${tx - 16} ${ty + 30} ${tx - 16} ${ty + 52}H${tx - 8}C${tx - 8} ${ty + 34} ${tx - 4} ${ty + 20} ${tx} ${ty + 12}Z`, 'r2') +
      ghP(`M${tx - tw - 4} ${ty}L${tx} ${ty - 58}L${tx + tw + 4} ${ty}Z`, 'w') + ghP(roof, 'r') + ghP(scal + 'Z', 'y') +
      ghP(`M${tx} ${ty - 58}L${tx + tw + 4} ${ty}H${tx}Z`, 'k', .12) + ghR(tx, ty, tw - 2, 52, 0, 'k', .1) +
      ghL(`M${tx} ${ty - 58}V${ty - 76}`, 'e3', 2) + ghP(`M${tx} ${ty - 76}L${tx + 15} ${ty - 71}L${tx} ${ty - 66}Z`, 'y') + ghBall(tx, ty - 58, 3.4, 'y');
    // a bunch of balloons tied to a post
    const bal = (x, y, h) => ghE(x + .8, y + .8, 9, 11, h + '2') + ghE(x - .4, y - .6, 7.8, 9.8, h) + ghE(x - 3.4, y - 4.6, 2.4, 3.6, 'w', .6, 25) +
      ghP(`M${x - 2} ${y + 10}h4l-2 3Z`, h + '2');
    const bx = 484;
    const balloons = ghL(`M${bx} 118C${bx - 2} 110 ${bx - 10} 104 ${bx - 10} 92M${bx} 118C${bx} 106 ${bx + 6} 98 ${bx + 8} 80` +
      `M${bx} 118C${bx + 4} 110 ${bx + 20} 104 ${bx + 24} 96`, 'e3', 1.1, .8) +
      bal(bx - 10, 82, 'p') + bal(bx + 8, 69, 'y') + bal(bx + 25, 86, 'b') + ghR(bx - 2, 116, 4, 44, 2, 'n2') + ghShad(bx, 160, 10, 2);
    // a game stall with a striped awning and prizes on the counter
    const stall = (x, h) => {
      let stripes = '', sc = `M${x - 34} 112`;
      for (let i = 0; i < 4; i++) stripes += ghPts([[x - 26 + i * 13, 98], [x - 19.5 + i * 13, 98], [x - 25.5 + i * 17, 112], [x - 34 + i * 17, 112]]);
      for (let i = 0; i < 4; i++) sc += `a8.5 6 0 0 0 17 0`;
      return ghShad(x + 4, 158, 38, 3.4) + ghL(`M${x - 27} 158V110M${x + 27} 158V110`, 'n2', 3.4) + ghR(x - 26, 110, 52, 24, 0, 'm2') +
        ghBall(x - 13, 127, 5, 'p') + ghBall(x, 125, 6, 'g') + ghBall(x + 13, 127, 5, 'b') +
        ghR(x - 30, 132, 62, 26, 3, 't2') + ghR(x - 31, 131, 60, 24, 3, 't') + ghR(x - 29, 133, 56, 3.6, 1.8, 't1', .8) +
        ghR(x - 18, 139, 36, 12, 3, h) + ghR(x - 16, 140, 20, 3, 1.5, h + '1', .7) +
        ghP(`M${x - 26} 98H${x + 26}L${x + 34} 112H${x - 34}Z`, 'w') + ghP(stripes, h) + ghP(sc + 'Z', h + '2') +
        ghP(`M${x} 98H${x + 26}L${x + 34} 112H${x}Z`, 'k', .1);
    };
    // a hot-air balloon far away
    const hot = (x, y, h) => ghE(x + 1.6, y + 1.6, 21, 25, h + '2') + ghE(x - .8, y - 1, 19, 23.4, h) + ghE(x, y, 7, 24, 'w', .5) +
      ghE(x - 9, y - 10, 4, 7, 'w', .45, 20) + ghL(`M${x - 11} ${y + 19}L${x - 6} ${y + 35}M${x + 11} ${y + 19}L${x + 6} ${y + 35}`, 'e3', 1.2) +
      ghR(x - 7, y + 34, 14, 10, 3, 'n2') + ghR(x - 7.5, y + 33.5, 13, 8.5, 3, 'n') + ghR(x - 6, y + 35, 9, 2, 1, 'n1', .8);
    // hills, bushes and the ground
    let trees = '';
    for (const [x, y, s] of [[34, 138, .9], [92, 134, .7], [150, 138, 1], [300, 134, .8], [452, 140, .6], [672, 136, .9], [700, 140, .6],
      [812, 134, 1], [866, 138, .7], [930, 134, .9]]) trees += ghTree(x, y, s);
    let tufts = '';
    for (let x = 12; x < 960; x += 37) tufts += `M${x} ${166 + (x % 3) * 3}l-2 -6M${x + 3} ${166 + (x % 3) * 3}v-7M${x + 6} ${166 + (x % 3) * 3}l2 -6`;
    return `<svg class="art gh-scene" viewBox="0 0 960 180" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">` +
      ghSun(332, 30, 13) + ghCloud(108, 42, 1) + ghCloud(528, 30, .9) + ghCloud(888, 40, 1.1) + ghCloud(690, 70, .7) +
      hot(212, 62, 'v') + hot(780, 56, 'c') +
      ghP('M0 122Q50 98 110 112T230 104T350 100T470 108T590 102T710 106T830 100T960 108V180H0Z', 'g1') + trees +
      ghP('M0 146Q70 132 150 142T300 138T450 144T600 138T750 144T900 140T960 142V180H0Z', 'g2') +
      ghP('M0 150Q70 136 150 146T300 142T450 148T600 142T750 148T900 144T960 146V180H0Z', 'g') +
      ghL('M0 150Q70 136 150 146T300 142T450 148T600 142T750 148T900 144T960 146', 'g1', 2.4, .9) + ghL(tufts, 'g2', 1.6, .8) +
      stall(248, 'b') + stall(740, 'g') + wheel + tent + balloons + ghL(str, 'e3', 1.4) + flags + '</svg>';
  },

  // the game-time ticket (300 x 104): an orange ticket with a star stub and a cream face for the time (grey when there is none)
  ticket(on) {
    const h = on ? 'o' : 'e', st = on ? 'y' : 'w';
    const body = (dx, dy) => `M${16 + dx} ${4 + dy}H${79 + dx}a9 9 0 0 0 18 0H${284 + dx}a12 12 0 0 1 12 12V${84 + dy}a12 12 0 0 1 -12 12` +
      `H${97 + dx}a9 9 0 0 0 -18 0H${16 + dx}a12 12 0 0 1 -12 -12V${16 + dy}a12 12 0 0 1 12 -12Z`;
    return `<svg class="art gh-tks" viewBox="0 0 300 104" aria-hidden="true" focusable="false">` + ghShad(150, 100, 136, 4) +
      ghP(body(0, 4), h + '3') + ghP(body(0, 0), h + '2') + ghP(body(-1.4, -1.6), h) +
      ghL('M18 9H76M100 9H282', h + '1', 3, .75) + ghL('M88 20V84', 'm', 2.4) +
      `<path ${ghF(st + (on ? '2' : '3'))} d="${rwStarD(45, 52, 25, 12.5)}"/>` + `<path ${ghF(st)} d="${rwStarD(43.6, 50.4, 22, 11)}"/>` +
      ghE(37, 44, 4.6, 2.8, 'w', on ? .7 : .9, -30) +
      ghR(102, 16, 184, 74, 10, 'm2') + ghR(102, 14, 184, 72, 10, 'm1') + '</svg>';
  },

  /* ---- the shared top bar ---- */
  // id: the registered game. o: {play: true for a play screen (Pause instead of Back), sub: text under the name (escaped here),
  //   chips: html before the time chip, tools: html of icon buttons (play screens), sound: html of the sound button, timeId: the time
  //   chip's id (default gtm), hud: true over a full-screen canvas}
  top(id, o = {}) {
    const g = GH.get(id) || { name: id, icon: 'gamepad', p: 'play' };
    GH.cur = g.id || null;
    const lead = o.play ? UI.ibtn('pause', 'Pause', { size: 'sm', id: 'gpause', cls: 'gh-pz' }) : UI.ibtn('back', 'Back', { size: 'sm', id: 'back' });
    const cls = 'top tbar gh-top s-' + g.p + (o.play ? ' gh-play' : '') + (o.hud ? ' gh-hud' : '') + (o.tools ? ' gh-hastools' : '') +
      ((o.tools || '').split('<button').length > 2 ? ' gh-wrap' : '');
    return `<div class="${cls}" data-g="${esc(g.id || id)}">${lead}<div class="ttl gh-ttl"><span class="gh-tb">${ico(g.icon || 'gamepad', 24)}</span>` +
      `<span class="gh-tt${o.sub ? ' two' : ''}"><b class="gh-gn">${UI.t(g.short || g.name)}</b>${o.sub ? `<span class="gh-gs">${esc(o.sub)}</span>` : ''}</span></div>` +
      (o.tools ? `<span class="gh-tools">${o.tools}</span>` : '') + (o.chips || '') +
      UI.chip('ticket', fmtT(ptLeft()), { aria: 'Game time left', id: o.timeId || 'gtm' }) + (o.sound || '') + '</div>';
  },
  // after view(): back runs o.back; Pause opens the sheet, whose Quit runs o.quit
  wire(o = {}) {
    const b = $('#back');
    if (b && o.back) b.onclick = o.back;
    const p = $('#gpause');
    if (p && o.quit) p.onclick = () => GH.pause(o);
  },
  // a small icon button for a play screen's top bar
  tool(icon, aria, id, on) {
    return UI.ibtn(icon, aria, { size: 'sm', id, cls: 'gh-tool' + (on ? ' on' : ''), attrs: on != null ? `aria-pressed="${on ? 'true' : 'false'}"` : '' });
  },
  // set a time chip: seconds left, or the last seconds of grace after time ran out (up)
  setTime(el, up) {
    if (!el) return;
    el.classList.toggle('gh-up', up != null);
    UI.setChip(el, up != null ? Math.max(0, Math.ceil(up)) + 's' : fmtT(ptLeft()));
  },

  /* ---- the pause sheet: Keep playing / Quit. The game-time clock holds while it is open; o.hold(true|false) pauses the game ---- */
  pause(o = {}) {
    if (GH.held) return;
    const g = GH.get(GH.cur) || { name: 'Game', p: 'play' };
    GH.held = true;
    if (o.hold) o.hold(true);
    let quit = false;
    const s = UI.sheet(`<div class="gh-sheet s-${g.p}"><div class="gh-spic" style="${GH.sky(g)}">${GH.pic(g.id)}</div>` +
      `<h2>Paused</h2><p>${UI.t(g.name)} is waiting for you. Your game time stops while you rest.</p>` +
      `<div class="acts gh-acts">${UI.btn('Keep playing', { kind: 'primary', size: 'lg', icon: 'play', id: 'gresume', wide: true })}` +
      `${UI.btn('Quit', { icon: 'close', id: 'gquit', wide: true })}</div></div>`, {
      onClose: () => {
        GH.held = false;
        if (!quit && o.hold) o.hold(false);
      },
    });
    s.el.querySelector('#gresume').onclick = () => {
      SFX.pop(2);
      s.close();
    };
    s.el.querySelector('#gquit').onclick = () => {
      quit = true;
      s.close();
      SFX.whoosh();
      if (o.quit) o.quit();
    };
    return s;
  },

  /* ---- the end-of-game card (over a dim backdrop; append is done here; returns the overlay so callers wire their buttons) ----
     o: {title, win (rays, a glow and drawn confetti), pic (html instead of the game's picture), made (pic is the child's own picture),
         stars (0-3 or null), tag (a "New record!" line), stats: [[value, label, icon]], extra (html, e.g. a gauge), lines: [[icon, html]],
         btns (html: buttons with the caller's ids)} */
  end(id, o = {}) {
    const g = GH.get(id || GH.cur) || { name: 'Game', p: 'play' };
    const el = document.createElement('div');
    el.className = 'ovl rw-ovl gh-ovl';
    const stats = (o.stats || []).filter(Boolean);
    el.innerHTML = `<div class="rw-card gh-end s-${g.p}${o.win ? ' rw-growc' : ''}" role="dialog" aria-modal="true" aria-label="${esc(o.title || g.name)}">` +
      (o.win ? RW.rays() : '') +
      `<div class="gh-epic${o.made ? ' made' : ''}" style="${GH.sky(g)}">${o.pic || GH.pic(g.id)}</div>` +
      `<p class="gh-ename">${UI.t(g.name)}</p><h1>${esc(o.title || '')}</h1>` +
      (o.stars != null ? `<div class="gh-estars">${UI.stars(o.stars, 3, 40, { arc: true })}</div>` : '') +
      (o.tag ? `<p class="gh-etag">${UI.tag(o.tag, 'new', 'sparkle')}</p>` : '') +
      (stats.length ? `<div class="gh-stats n${stats.length}" style="--n:${stats.length}">${stats.map(([v, l, ic]) => `<div class="gh-stat">${ic ? ico(ic, 22, ic == 'coin' ? 'ic-coin' : '') : ''}` +
        `<b>${esc(v)}</b><span>${esc(l)}</span></div>`).join('')}</div>` : '') + (o.extra ? `<div class="gh-extra">${o.extra}</div>` : '') +
      (o.lines || []).map(([ic, h]) => `<p class="gh-line">${ico(ic, 22)}<span>${h}</span></p>`).join('') +
      `<div class="rw-acts gh-acts">${o.btns || ''}</div></div>`;
    document.body.appendChild(el);
    if (o.win) RW.burst(el.firstChild, 28); // drawn confetti (hidden in calm mode)
    return el;
  },
};

// The Game Room's games, in hub order. Each game file keeps its own code; only these entries tell the hub about it.
GH.reg({
  id: 'hill', btn: 'g4x4', name: '4x4 Hill Climb', short: 'Hill Climb', icon: 'car', p: 'play', sky: ['sky-1', 'sky'], art: GH_ART.hill,
  sub: () => {
    const gs = garageS();
    return `<span>Best <b>${Math.max(gs.best.meadow || 0, gs.best.moon || 0)} m</b></span><span>${ico('nut', 18)}<b>${gs.bolts}</b> bolts</span>`;
  },
  open: () => garage(), tapToPlay: '[data-st="meadow"]',
});
GH.reg({
  id: 'art', btn: 'gcbn', name: 'Coloring', icon: 'palette', p: 'read', sky: ['lilac', 'pink'], art: GH_ART.art,
  sub: () => '<span>Mandalas, animals, pixel art and free paint</span>',
  open: () => colorMenu(), tapToPlay: '.sttile[data-k]', saved: 'Your picture is saved.',
});
GH.reg({
  id: 'blocks', btn: 'gbb', name: 'Block Builder', icon: 'blocks', p: 'es', sky: ['sea-1', 'sea'], art: GH_ART.blocks,
  sub: () => '<span>Build your own 3D world</span>',
  open: () => bbMenu(), tapToPlay: '[data-w="0"]', saved: 'Your world is saved.',
});
