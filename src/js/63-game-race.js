/* ---------- Star Rally: the racing game (G-02; CSS src/css/49-game-race.css; both go into games.<VER>.js) ----------
   An original Star School game. A race against five friendly animal drivers, seen from behind the car on a pseudo-3D road
   (the road is drawn in strips, cheap on a canvas). Races last 60-90 seconds (2-3 laps), then the shared end card.

   How it plays
   - Easy (default for Pre-K to 2nd grade): the car keeps its speed by itself; two big buttons (or a touch on the left or right
     half of the road) steer; a steering helper keeps the car near the road; the grass and the hedges only slow you down.
   - Pro (default from 3rd grade, switchable in the menu): hold Go to go faster (but wide in tight bends), hold a turn through a
     bend at speed to drift: blue, then orange sparks; let go for a zoom. Boost pads on the road work in both modes.
   - Optional (off by default): steer by tilting the tablet; boost gates with a quick sum (drive through the right answer for a
     zoom; a wrong answer costs nothing).
   - Rivals keep the race close (gentle catch-up): in Easy they ease off when far ahead and hurry when far behind, so a young
     child can win; in Pro the catch-up is small, so winning takes Go, drifts and pads. Nothing ever says "last" or shows red.
   - 4 places (Sunny Meadow, Sandy Bay, Snowy Peaks, Night City) with 3 tracks each. A place opens with stars (1 for finishing,
     1 for the top 3, 1 for winning); the next track of a place opens when the one before it is finished. A best time per track.
   - Sparkles on the road are the game's own currency (not Pet Shop coins): paint and stickers for the car. Car shapes open with
     stars. Every price is shown; nothing is random; nothing changes while the app is closed. No lives, no game over, no ads.

   Game time: paid exactly like the other games (gtStart: 1 s a second while racing, held while paused or hidden, 20 s of grace,
   then the shared time-up card). A race cannot start without game time (ptLeft(), ptWhyNot()).
   Save: S.rally (created when the game is first opened; an old save loads unchanged): {spk, best: {track: ms}, stars: {track: 0-3},
   paint, paints: {hue: 1}, stk, stks: {id: 1}, body, mode, quiz, tilt, place, races}. S.race stays Fact Race's (54-race.js).
   Drawing: object-art style (DESIGN_SYSTEM 6.5: light from the top left, shade, base, gloss, soft ink shadows). Sprites are SVG
   in the --a-* roles, turned into cached canvases once (colours read from the --ill-* tokens); the road is drawn as one path
   per colour each frame; the sky and two parallax layers are cached canvases. No raw colours anywhere in this file. */

/* ---- sizes and speeds (world units: a road segment is RL_SEG long; the road is 2 x RL_ROADW wide) ---- */
const RL_SEG = 200;
const RL_ROADW = 2000;
const RL_VMAX = 9500; // units a second at full speed (Go held)
const RL_CAMH = 1000; // camera height
const RL_PZ = 1000; // the player's car is this far in front of the camera
const RL_DRAW = 150; // segments drawn ahead
const RL_DT = 1 / 60; // fixed simulation step
const RL_START = 24; // the start line is at this segment
const RL_CARW = 0.3; // a car is this wide, in road half-widths
const RL_CRUISE = 0.78; // the speed the car keeps by itself (share of RL_VMAX)
const RL_DEV = { fast: 1, flush: false }; // test hooks (smoke): fast runs the race N times faster; flush times the drawing too

/* ---- places and tracks ---- */
// sky: two --sc-* tokens (top, horizon); grass, road, rumble, lane: --a-* roles (base and the stripe); props: [kind, weight]
const RL_PLACES = [
  { id: 'meadow', name: 'Sunny Meadow', need: 0, sky: ['sky-1', 'sky'], grass: ['g', 'g1'], road: ['e2', 'e'], rumble: ['r', 'w'],
    lane: 'w', edge: 'g2', props: [['tree', 5], ['bush', 3], ['flowers', 3], ['fence', 2]] },
  { id: 'beach', name: 'Sandy Bay', need: 3, sky: ['sea-1', 'sea'], grass: ['t1', 'm'], road: ['e2', 'e'], rumble: ['b', 'w'],
    lane: 'w', edge: 't', props: [['palm', 5], ['umbrella', 3], ['rock', 2], ['hut', 1]] },
  { id: 'snow', name: 'Snowy Peaks', need: 8, sky: ['blue', 'sky-1'], grass: ['w', 'w2'], road: ['e2', 'e'], rumble: ['v', 'w'],
    lane: 'w', edge: 'w3', props: [['pine', 6], ['snowman', 2], ['rock', 1], ['igloo', 1]] },
  { id: 'city', name: 'Night City', need: 15, sky: ['night', 'night-1'], grass: ['k2', 'v3'], road: ['k2', 'e3'], rumble: ['y', 'k2'],
    lane: 'y', edge: 'v3', night: true, props: [['tower', 2], ['tower2', 2], ['lamp', 3], ['cone', 1]] },
];
// a track: name, laps, plan: road sections [enter, hold, leave, curve (+ right), hill (height change in segments)]
const RL_TRACKS = {
  meadow: [
    { name: 'Daisy Lane', laps: 3, plan: [[30, 80, 30, 2, 0], [20, 60, 20, 0, 10], [30, 90, 30, -2, 0], [20, 70, 20, 0, -10],
      [30, 110, 30, 3, 0], [20, 50, 20, 0, 0], [30, 80, 30, -2, 0]] },
    { name: 'Windmill Hill', laps: 3, plan: [[30, 60, 30, 3, 20], [20, 40, 20, 0, -20], [30, 70, 30, -3, 0], [20, 60, 20, 0, 30],
      [30, 60, 30, 2, -30], [30, 70, 30, -3, 0], [20, 40, 20, 0, 0], [30, 80, 30, 3, 0]] },
    { name: 'Butterfly Bends', laps: 3, plan: [[25, 50, 25, 3, 0], [25, 50, 25, -3, 0], [25, 50, 25, 4, 10], [20, 40, 20, 0, -10],
      [25, 60, 25, -4, 0], [25, 40, 25, 3, 0], [25, 40, 25, -3, 0], [20, 60, 20, 0, 15], [25, 50, 25, 4, -15]] },
  ],
  beach: [
    { name: 'Seashell Shore', laps: 3, plan: [[30, 90, 30, -3, 0], [20, 80, 20, 0, 0], [30, 80, 30, 3, 10], [20, 60, 20, 0, -10],
      [30, 100, 30, -3, 0], [20, 40, 20, 0, 0], [30, 90, 30, 2, 0]] },
    { name: 'Palm Parade', laps: 3, plan: [[25, 60, 25, 4, 0], [20, 50, 20, 0, 20], [25, 60, 25, -4, -20], [20, 40, 20, 0, 0],
      [25, 70, 25, 3, 0], [25, 50, 25, -3, 15], [20, 40, 20, 0, -15], [25, 70, 25, 4, 0], [20, 50, 20, 0, 0]] },
    { name: 'Lighthouse Loop', laps: 3, plan: [[25, 50, 25, 5, 0], [20, 40, 20, 0, 25], [25, 50, 25, -4, -25], [25, 40, 25, 4, 0],
      [20, 60, 20, 0, 0], [25, 50, 25, -5, 10], [25, 50, 25, 3, -10], [20, 40, 20, 0, 0], [25, 60, 25, -4, 0]] },
  ],
  snow: [
    { name: 'Snowball Run', laps: 3, plan: [[30, 70, 30, 3, 20], [20, 60, 20, 0, -20], [30, 80, 30, -3, 0], [20, 50, 20, 0, 30],
      [30, 60, 30, 4, -30], [20, 60, 20, 0, 0], [30, 70, 30, -3, 0], [20, 40, 20, 0, 0]] },
    { name: 'Pine Valley', laps: 3, plan: [[25, 60, 25, -4, 30], [25, 50, 25, 4, -30], [20, 50, 20, 0, 0], [25, 60, 25, -5, 20],
      [20, 40, 20, 0, -20], [25, 50, 25, 4, 0], [25, 40, 25, -4, 0], [20, 60, 20, 0, 0], [25, 60, 25, 5, 0]] },
    { name: 'Frosty Summit', laps: 3, plan: [[25, 40, 25, 5, 40], [20, 40, 20, 0, -20], [25, 50, 25, -5, -20], [25, 40, 25, 4, 30],
      [25, 40, 25, -4, -30], [20, 50, 20, 0, 0], [25, 50, 25, 5, 0], [25, 40, 25, -5, 20], [20, 40, 20, 0, -20], [25, 50, 25, 4, 0]] },
  ],
  city: [
    { name: 'Lamp Street', laps: 3, plan: [[20, 60, 20, 4, 0], [20, 80, 20, 0, 0], [20, 60, 20, -4, 0], [20, 60, 20, 0, 10],
      [20, 70, 20, 4, -10], [20, 80, 20, 0, 0], [20, 60, 20, -4, 0], [20, 60, 20, 0, 0]] },
    { name: 'Neon Avenue', laps: 3, plan: [[20, 50, 20, 5, 0], [20, 40, 20, -5, 0], [20, 60, 20, 0, 20], [20, 50, 20, 5, -20],
      [20, 60, 20, 0, 0], [20, 50, 20, -5, 0], [20, 40, 20, 5, 0], [20, 60, 20, 0, 15], [20, 50, 20, -4, -15], [20, 40, 20, 0, 0]] },
    { name: 'Starlight Ring', laps: 3, plan: [[20, 40, 20, 6, 0], [20, 40, 20, -5, 20], [20, 50, 20, 0, -20], [20, 40, 20, 6, 0],
      [20, 40, 20, -6, 0], [20, 60, 20, 0, 25], [20, 40, 20, 5, -25], [20, 40, 20, -5, 0], [20, 50, 20, 0, 0], [20, 40, 20, 6, 0]] },
  ],
};
// every track by id ('meadow-0'), in order
const RL_TRK = {};
const RL_ORDER = [];
for (const pl of RL_PLACES) {
  RL_TRACKS[pl.id].forEach((t, i) => {
    t.id = pl.id + '-' + i;
    t.place = pl.id;
    t.i = i;
    RL_TRK[t.id] = t;
    RL_ORDER.push(t.id);
  });
}

/* ---- the friendly rivals: an animal driver and a kart colour each ---- */
const RL_RIVALS = [
  { id: 'fox', name: 'Fern', kind: 'Fox', car: 'b' },
  { id: 'bunny', name: 'Bo', kind: 'Bunny', car: 'p' },
  { id: 'bear', name: 'Bruno', kind: 'Bear', car: 'y' },
  { id: 'penguin', name: 'Pip', kind: 'Penguin', car: 'c' },
  { id: 'frog', name: 'Fizz', kind: 'Frog', car: 'v' },
];

/* ---- the garage: paint, stickers (bought with sparkles) and car shapes (opened with stars); all prices shown ---- */
// a race pays about 40-60 sparkles, so the whole garage takes about 20 races
const RL_PAINTS = [['r', 'Red', 0], ['b', 'Blue', 40], ['g', 'Green', 50], ['y', 'Yellow', 50], ['o', 'Orange', 60],
  ['p', 'Pink', 60], ['v', 'Purple', 80], ['c', 'Aqua', 80]];
const RL_STICKERS = [['', 'No sticker', 0], ['star', 'Star', 30], ['heart', 'Heart', 40], ['bolt', 'Lightning', 50],
  ['flower', 'Flower', 60], ['paw', 'Paw', 70], ['moon', 'Moon', 80], ['rainbow', 'Rainbow', 100], ['flame', 'Flame', 120]];
const RL_BODIES = [['kart', 'Kart', 0], ['buggy', 'Buggy', 6], ['rocket', 'Rocket car', 15]]; // [id, name, stars needed]

/* ---- the save (S.rally): read with defaults, every number checked; the sparkle count can never go below 0 ---- */
const rlNum = (v, lo, hi) => Math.max(lo, Math.min(hi, Math.floor(+v || 0)));
const rlObj = v => (v && typeof v == 'object' && !Array.isArray(v) ? v : {});
function rlS() {
  const r = (S.rally = rlObj(S.rally));
  r.spk = rlNum(r.spk, 0, 1e7);
  r.races = rlNum(r.races, 0, 1e7);
  r.best = rlObj(r.best);
  r.stars = rlObj(r.stars);
  for (const k in r.best) if (!RL_TRK[k] || !(+r.best[k] > 0)) delete r.best[k];
  for (const k in r.stars) if (!RL_TRK[k]) delete r.stars[k];
  else r.stars[k] = rlNum(r.stars[k], 0, 3);
  r.paints = rlObj(r.paints);
  r.paints.r = 1;
  if (!RL_PAINTS.some(p => p[0] === r.paint) || !r.paints[r.paint]) r.paint = 'r';
  r.stks = rlObj(r.stks);
  if (typeof r.stk != 'string' || (r.stk && !r.stks[r.stk])) r.stk = '';
  if (!RL_BODIES.some(b => b[0] === r.body) || !rlBodyOpen(r.body, r)) r.body = 'kart';
  if (r.mode !== 'easy' && r.mode !== 'pro') delete r.mode;
  r.quiz = !!r.quiz;
  r.tilt = !!r.tilt;
  if (!RL_PLACES.some(p => p.id === r.place)) r.place = 'meadow';
  return r;
}
// the hub and the tests read without creating S.rally
const rlPeek = () => (S.rally && typeof S.rally == 'object' && !Array.isArray(S.rally) ? S.rally : {});
const rlStarsAll = (r = rlPeek()) => RL_ORDER.reduce((a, k) => a + rlNum((r.stars || {})[k], 0, 3), 0);
const rlMode = (r = rlPeek()) => r.mode || ((S.grade == null ? 0 : +S.grade) <= 2 ? 'easy' : 'pro');
const rlPlaceOpen = (pl, r) => rlStarsAll(r) >= pl.need;
function rlTrackOpen(id, r = rlPeek()) {
  const t = RL_TRK[id];
  if (!t || !rlPlaceOpen(RL_PLACES.find(p => p.id === t.place), r)) return false;
  return t.i == 0 || rlNum((r.stars || {})[t.place + '-' + (t.i - 1)], 0, 3) > 0;
}
function rlBodyOpen(id, r) {
  const b = RL_BODIES.find(x => x[0] === id);
  return !!b && rlStarsAll(r) >= b[2];
}
// buy an item: true when bought; never takes more sparkles than there are
function rlBuy(kind, id) {
  const r = rlS(), list = kind == 'paint' ? RL_PAINTS : RL_STICKERS, own = kind == 'paint' ? r.paints : r.stks;
  const it = list.find(x => x[0] === id);
  if (!it || !id || own[id]) return false;
  if (r.spk < it[2]) return false;
  r.spk -= it[2];
  own[id] = 1;
  return true;
}
// a time in ms as 1:05.3
const rlTime = ms => {
  const t = Math.max(0, Math.round(ms / 100)), m = Math.floor(t / 600), s = (t % 600) / 10;
  return m + ':' + (s < 10 ? '0' : '') + s.toFixed(1);
};
const rlOrd = n => n + (n == 1 ? 'st' : n == 2 ? 'nd' : n == 3 ? 'rd' : 'th');

/* ---- drawings (SVG in --a-* roles; the gh* shape helpers are in 59-game-hub.js) ---- */
// a tyre seen from behind: dark rubber, a grey sheen on the left, tread lines
const rlTyre = (x, y, w, h, lite) => ghR(x + 1.2, y + 1.2, w, h, gh1(w * .32), 'k') + ghR(x, y, w, h, gh1(w * .32), 'k2') +
  ghR(x + w * .16, y + h * .1, w * .2, h * .76, gh1(w * .1), 'e3', .6) + (lite ? '' : ghL(`M${gh1(x + w * .2)} ${gh1(y + h * .32)}h${gh1(w * .6)}M${gh1(x + w * .2)} ${gh1(y + h * .52)}h${gh1(w * .6)}` +
    `M${gh1(x + w * .2)} ${gh1(y + h * .72)}h${gh1(w * .6)}`, 'k', 1.4, .55));
// a heart path around (x, y), r about its half-width
const rlHeartD = (x, y, r) => `M${gh1(x)} ${gh1(y + r * .85)}C${gh1(x - r * 1.3)} ${gh1(y)} ${gh1(x - r * .9)} ${gh1(y - r * 1.05)}` +
  ` ${gh1(x)} ${gh1(y - r * .4)}C${gh1(x + r * .9)} ${gh1(y - r * 1.05)} ${gh1(x + r * 1.3)} ${gh1(y)} ${gh1(x)} ${gh1(y + r * .85)}Z`;
// a sticker on a white die-cut disc: star, heart, bolt, flower, paw, moon, rainbow, flame
function rlStk(id, x, y, r) {
  if (!id) return '';
  let s = ghC(x + r * .08, y + r * .1, r, 'w3') + ghC(x, y, r * .95, 'w');
  const q = r * .62;
  if (id == 'star') {
    s += `<path ${ghF('y2')} d="${rwStarD(x + q * .06, y + q * .1, q, q * .46)}"/>` + `<path ${ghF('y')} d="${rwStarD(x - q * .04, y, q * .9, q * .42)}"/>`;
  } else if (id == 'heart') {
    s += ghP(rlHeartD(x + q * .06, y + q * .08, q), 'r2') + ghP(rlHeartD(x, y, q * .9), 'r') + ghE(x - q * .45, y - q * .35, q * .2, q * .13, 'w', .7, -30);
  } else if (id == 'bolt') {
    const bd = (dx, k) => ghPts([[.15, -1], [-.55, .12], [-.05, .12], [-.25, 1], [.6, -.18], [.08, -.18], [.35, -1]]
      .map(([a, b]) => [x + dx + a * q * k, y + dx + b * q * k]));
    s += ghP(bd(q * .08, 1), 'y2') + ghP(bd(0, .92), 'y');
  } else if (id == 'flower') {
    for (let i = 0; i < 5; i++) {
      const a = i * Math.PI * 2 / 5 - Math.PI / 2, px = x + Math.cos(a) * q * .55, py = y + Math.sin(a) * q * .55;
      s += ghC(px + q * .05, py + q * .05, q * .4, 'p2') + ghC(px, py, q * .36, 'p');
    }
    s += ghBall(x, y, q * .34, 'y');
  } else if (id == 'paw') {
    s += ghE(x + q * .05, y + q * .35, q * .5, q * .4, 'n2') + ghE(x, y + q * .3, q * .46, q * .36, 'n');
    for (const [a, b] of [[-.62, -.12], [-.24, -.55], [.24, -.55], [.62, -.12]]) s += ghBall(x + a * q, y + b * q, q * .2, 'n');
  } else if (id == 'moon') {
    const m = (dx, R, c) => `<path ${ghF(c)} d="M${gh1(x + dx)} ${gh1(y - R)}a${gh1(R)} ${gh1(R)} 0 1 0 ${gh1(R * .9)} ${gh1(R * 1.6)}` +
      `a${gh1(R * .8)} ${gh1(R * .8)} 0 0 1 ${gh1(-R * .9)} ${gh1(-R * 1.6)}Z"/>`;
    s += m(q * .1, q, 'y2') + m(0, q * .92, 'y');
  } else if (id == 'rainbow') {
    ['r', 'o', 'y', 'g', 'b'].forEach((c, i) => {
      const R = q * (1 - i * .17);
      s += ghL(`M${gh1(x - R)} ${gh1(y + q * .45)}A${gh1(R)} ${gh1(R)} 0 0 1 ${gh1(x + R)} ${gh1(y + q * .45)}`, c, gh1(q * .18));
    });
  } else if (id == 'flame') {
    const f = (k, c) => ghP(`M${gh1(x)} ${gh1(y - q * k)}C${gh1(x + q * .9 * k)} ${gh1(y - q * .2 * k)} ${gh1(x + q * .85 * k)} ${gh1(y + q)}` +
      ` ${gh1(x)} ${gh1(y + q)}C${gh1(x - q * .85 * k)} ${gh1(y + q)} ${gh1(x - q * .9 * k)} ${gh1(y - q * .2 * k)} ${gh1(x)} ${gh1(y - q * k)}Z`, c);
    s += f(1.05, 'o2') + f(.95, 'o') + f(.5, 'y');
  }
  return s;
}
// a driver's head seen from behind, around (60, 24): the player's helmet (hue h) or an animal
function rlBackHead(who, h) {
  if (who == 'fox') {
    return ghP('M84 46C106 46 114 26 102 14C100 26 94 33 82 38Z', 'o2') + ghP('M84 44C104 44 111 27 102 16C99 27 93 33 82.5 37Z', 'o') +
      ghP('M102 14C108 18 110 24 108.5 30C104 28 101 22 102 14Z', 'w') +
      ghP('M45 18L47 1L58 12Z', 'o2') + ghP('M46 17L47.6 3.4L56.4 12.4Z', 'o') + ghP('M46.6 9L47.4 2.6L51 6Z', 'k2') +
      ghP('M75 18L73 1L62 12Z', 'o2') + ghP('M74 17L72.4 3.4L63.6 12.4Z', 'o') + ghP('M73.4 9L72.6 2.6L69 6Z', 'k2') +
      ghBall(60, 24, 14, 'o');
  }
  if (who == 'bunny') {
    return ghE(51.5, 6, 5.4, 14, 'w3', null, -10) + ghE(51, 5.4, 4.6, 13, 'w', null, -10) + ghE(51.6, 7.5, 2, 8.5, 'p1', .9, -10) +
      ghE(68.5, 6, 5.4, 14, 'w3', null, 10) + ghE(68, 5.4, 4.6, 13, 'w', null, 10) + ghE(68.4, 7.5, 2, 8.5, 'p1', .9, 10) +
      ghC(61, 26, 14.6, 'w3') + ghBall(60, 25, 14, 'w');
  }
  if (who == 'bear') {
    return ghBall(46.5, 12, 6.4, 'n') + ghC(46.5, 12, 2.8, 'n2') + ghBall(73.5, 12, 6.4, 'n') + ghC(73.5, 12, 2.8, 'n2') + ghBall(60, 24, 14.5, 'n');
  }
  if (who == 'penguin') {
    return ghC(61, 25, 15, 'k') + ghC(59.6, 23.6, 13.4, 'k2') + ghE(54.5, 17, 4, 2.4, 'w', .3, -35) +
      ghP('M70 34L88 27L86 37Z', 'r2') + ghP('M70 33.4L86 28.4L84.6 35.6Z', 'r') + ghR(45, 32, 30, 7, 3.5, 'r2') + ghR(45, 31, 30, 6, 3, 'r');
  }
  if (who == 'frog') return ghBall(60, 25, 14.6, 'g') + ghBall(49.5, 14, 6.6, 'g') + ghBall(70.5, 14, 6.6, 'g');
  // the player's helmet: white with a stripe in the car's paint
  return ghC(61, 24, 14.6, 'w3') + ghBall(60, 23, 14, 'w') + ghL('M60 9.4V36.6', h, 5) + ghL('M58.6 10.6V22', h + '1', 1.4, .8) +
    ghR(47, 33, 26, 5, 2.5, 'k2');
}
// a car seen from behind, viewBox 120 x 84 (ground at 80): body kart | buggy | rocket, paint hue h, sticker st, driver who;
// lite leaves out the small details (pipes, glints, tread) for small pictures
function rlCarArt(body, h, st, who, lite) {
  let s = ghShad(60, 79, 56, 5, .18);
  if (body == 'rocket') {
    return s + rlTyre(12, 62, 16, 16) + rlTyre(92, 62, 16, 16) + rlBackHead(who, h) +
      ghP('M30 36L6 72H34Z', h + '2') + ghP('M30 36.6L8.6 70.6H32.6Z', h) + ghP('M90 36L114 72H86Z', h + '2') + ghP('M90 36.6L111.4 70.6H87.4Z', h) +
      ghR(25, 31, 72, 40, 18, h + '2') + ghR(23, 29, 71, 38, 17, h) + ghR(30, 32, 36, 5, 2.5, h + '1', .85) +
      ghR(27, 56, 66, 9, 4.5, h + '3', .45) + ghC(60, 51, 12, 'e3') + ghC(59.4, 50.4, 10.6, 'e1') + ghC(60, 51, 8, 'o') +
      ghC(60, 51, 4.6, 'y1') + ghE(57, 48, 2.2, 1.4, 'w', .8, -30) + ghR(11, 66, 10, 4, 2, 'y') + ghR(99, 66, 10, 4, 2, 'y') +
      rlStk(st, 40, 42, 7.5);
  }
  const big = body == 'buggy', ty = big ? 40 : 46, th = big ? 38 : 31, tw = big ? 27 : 24;
  s += rlTyre(big ? 3 : 6, ty, tw, th, lite) + rlTyre(90, ty, tw, th, lite) + ghR(26, 58, 68, 6, 3, 'k2') + rlBackHead(who, h);
  if (big) s += ghL('M35 38C35 7 85 7 85 38', 'e3', 5.4) + ghL('M34.2 36C34.2 8.6 83.6 8.6 83.6 34', 'e1', 2, .9);
  return s + ghR(20, 35, 82, 34, 13, h + '2') + ghR(18, 33, 80, 32, 12, h) + ghR(25, 36, 42, 5, 2.5, h + '1', .85) +
    ghR(21, 55, 78, 8, 4, h + '3', .4) +
    ghR(23, 41, 13, 8, 4, 'y2') + ghR(22.4, 40.4, 12, 7, 3.5, 'y') + ghR(84, 41, 13, 8, 4, 'y2') + ghR(83.4, 40.4, 12, 7, 3.5, 'y') +
    ghR(27, 66, 67, 7, 3.5, 'e3') + ghR(26, 65, 67, 6, 3, 'e1') + rlStk(st, 60, 47, 9) + (lite ? '' : ghE(25.6, 42.4, 2.4, 1.2, 'w', .8) +
    ghE(86.6, 42.4, 2.4, 1.2, 'w', .8) + ghR(30, 66, 30, 1.6, .8, 'w', .7) + ghC(47, 71, 4, 'e3') + ghC(46.5, 70.5, 3, 'e1') + ghC(47, 71, 1.6, 'k2') +
    ghC(73, 71, 4, 'e3') + ghC(72.5, 70.5, 3, 'e1') + ghC(73, 71, 1.6, 'k2'));
}
// a face from the front (menus, the podium): the five animals or the player's helmet (hue h); centre x, y, scale k (head radius 15k)
function rlFace(who, x, y, k, h = 'r') {
  const X = v => gh1(x + v * k), Y = v => gh1(y + v * k);
  const eyes = (dy = 0, gap = 6) => ghE(x - gap * k, y + (dy - 1) * k, 2.2 * k, 2.8 * k, 'k') + ghE(x + gap * k, y + (dy - 1) * k, 2.2 * k, 2.8 * k, 'k') +
    ghC(x - (gap + .8) * k, y + (dy - 2.2) * k, .85 * k, 'w') + ghC(x + (gap - .8) * k, y + (dy - 2.2) * k, .85 * k, 'w');
  const smile = (dy, w) => ghL(`M${X(-w)} ${Y(dy)}Q${X(0)} ${Y(dy + 3)} ${X(w)} ${Y(dy)}`, 'k', gh1(1.3 * k));
  const cheeks = dy => ghE(x - 10 * k, y + dy * k, 2.6 * k, 1.7 * k, 'p', .6) + ghE(x + 10 * k, y + dy * k, 2.6 * k, 1.7 * k, 'p', .6);
  let s = ghShad(x + 1 * k, y + 17 * k, 13 * k, 2.4 * k, .12);
  if (who == 'fox') {
    s += ghP(`M${X(-13)} ${Y(-4)}L${X(-12)} ${Y(-20)}L${X(-2)} ${Y(-11)}Z`, 'o2') + ghP(`M${X(13)} ${Y(-4)}L${X(12)} ${Y(-20)}L${X(2)} ${Y(-11)}Z`, 'o2') +
      ghP(`M${X(-11)} ${Y(-7)}L${X(-11)} ${Y(-17)}L${X(-4)} ${Y(-11)}Z`, 'w') + ghP(`M${X(11)} ${Y(-7)}L${X(11)} ${Y(-17)}L${X(4)} ${Y(-11)}Z`, 'w') +
      ghBall(x, y, 15 * k, 'o') + ghE(x, y + 6 * k, 9 * k, 6.5 * k, 'w') + eyes() + ghE(x, y + 3.4 * k, 2 * k, 1.5 * k, 'k') + smile(6.6, 2.4) + cheeks(5);
  } else if (who == 'bunny') {
    s += ghE(x - 6 * k, y - 17 * k, 4.4 * k, 12 * k, 'w3', null, -8) + ghE(x - 6.4 * k, y - 17.4 * k, 3.8 * k, 11 * k, 'w', null, -8) +
      ghE(x - 6.2 * k, y - 16 * k, 1.8 * k, 7.5 * k, 'p', .85, -8) + ghE(x + 6 * k, y - 17 * k, 4.4 * k, 12 * k, 'w3', null, 8) +
      ghE(x + 5.6 * k, y - 17.4 * k, 3.8 * k, 11 * k, 'w', null, 8) + ghE(x + 5.8 * k, y - 16 * k, 1.8 * k, 7.5 * k, 'p', .85, 8) +
      ghC(x + 1 * k, y + 1 * k, 15 * k, 'w3') + ghBall(x, y, 14.4 * k, 'w') + eyes() + ghE(x, y + 3.2 * k, 1.8 * k, 1.3 * k, 'p2') +
      smile(6, 2.4) + cheeks(4.5);
  } else if (who == 'bear') {
    s += ghBall(x - 11 * k, y - 11 * k, 5.4 * k, 'n') + ghC(x - 11 * k, y - 11 * k, 2.6 * k, 'n2') + ghBall(x + 11 * k, y - 11 * k, 5.4 * k, 'n') +
      ghC(x + 11 * k, y - 11 * k, 2.6 * k, 'n2') + ghBall(x, y, 15 * k, 'n') + ghE(x, y + 5.5 * k, 7 * k, 5.4 * k, 't1') + eyes(-1) +
      ghE(x, y + 3.2 * k, 2.4 * k, 1.7 * k, 'k') + smile(6.4, 2.2) + cheeks(4);
  } else if (who == 'penguin') {
    s += ghC(x + 1 * k, y + 1 * k, 15 * k, 'k') + ghC(x - .6 * k, y - .6 * k, 13.6 * k, 'k2') + ghE(x - 4.6 * k, y + 1.5 * k, 6.4 * k, 9 * k, 'w') +
      ghE(x + 4.6 * k, y + 1.5 * k, 6.4 * k, 9 * k, 'w') + eyes(0, 5) + ghP(`M${X(-3)} ${Y(3.4)}L${X(3)} ${Y(3.4)}L${X(0)} ${Y(7.4)}Z`, 'o') +
      cheeks(5.5) + ghR(x - 12 * k, y + 12 * k, 24 * k, 5 * k, gh1(2.5 * k), 'r2') + ghR(x - 12 * k, y + 11.4 * k, 24 * k, 4.2 * k, gh1(2 * k), 'r');
  } else if (who == 'frog') {
    s += ghE(x + 1 * k, y + 2 * k, 17 * k, 13 * k, 'g2') + ghE(x - .5 * k, y + .8 * k, 16 * k, 12 * k, 'g') +
      ghBall(x - 7.5 * k, y - 10 * k, 6 * k, 'g') + ghBall(x + 7.5 * k, y - 10 * k, 6 * k, 'g') + ghC(x - 7.5 * k, y - 10 * k, 3.8 * k, 'w') +
      ghC(x + 7.5 * k, y - 10 * k, 3.8 * k, 'w') + ghC(x - 7 * k, y - 9.6 * k, 2 * k, 'k') + ghC(x + 8 * k, y - 9.6 * k, 2 * k, 'k') +
      ghL(`M${X(-7)} ${Y(3)}Q${X(0)} ${Y(9)} ${X(7)} ${Y(3)}`, 'k', gh1(1.4 * k)) + cheeks(3) + ghE(x - 4 * k, y - 3 * k, 4 * k, 2 * k, 'g1', .5, -20);
  } else {
    const visor = (d, c) => ghP(`M${X(-11 + d)} ${Y(-2 - d * .3)}Q${X(0)} ${Y(-8 - d * .4)} ${X(11 - d)} ${Y(-2 - d * .3)}` +
      `Q${X(12 - d)} ${Y(7 - d)} ${X(0)} ${Y(8 - d * 1.2)}Q${X(-12 + d)} ${Y(7 - d)} ${X(-11 + d)} ${Y(-2 - d * .3)}Z`, c);
    s += ghBall(x, y, 15 * k, h) + ghL(`M${X(0)} ${Y(-15)}V${Y(-8)}`, 'w', gh1(2.6 * k)) + visor(0, 'c2') + visor(1, 'c') +
      ghE(x - 5 * k, y - 2.4 * k, 3.2 * k, 1.6 * k, 'w', .8, -15);
  }
  return s;
}

// a drawing placed in a box: a nested <svg> with its own viewBox (pictures may not use scale transforms)
const rlNest = (x, y, w, h, vw, vh, inner) =>
  `<svg x="${gh1(x)}" y="${gh1(y)}" width="${gh1(w)}" height="${gh1(h)}" viewBox="0 0 ${vw} ${vh}">${inner}</svg>`;
// one path of many small rectangles (lit windows, checks): [x, y, w, h] each
const rlRects = (list, c, o) => ghP(list.map(([x, y, w, h]) => `M${gh1(x)} ${gh1(y)}h${gh1(w)}v${gh1(h)}h${gh1(-w)}Z`).join(''), c, o);
// a little flower: five petals round a yellow middle
const rlBloom = (x, y, r, c) => {
  let s = '';
  for (let i = 0; i < 5; i++) {
    const a = i * Math.PI * .4 - Math.PI / 2;
    s += ghC(x + Math.cos(a) * r * .6, y + Math.sin(a) * r * .6, r * .5, c);
  }
  return s + ghC(x, y, r * .38, 'y') + ghC(x - r * .12, y - r * .12, r * .14, 'w', .8);
};
// a snowy pine: three tiers, the light (left) side lighter, a snow cap on each tier
function rlPine(x, y, s) {
  let d = ghShad(x + 2 * s, y, 20 * s, 3 * s) + ghR(x - 4 * s, y - 22 * s, 8 * s, 22 * s, gh1(2 * s), 'n2');
  for (let t = 0; t < 3; t++) {
    const top = y - (116 - t * 30) * s, hw = (17 + t * 8) * s, bot = top + 44 * s;
    d += ghP(ghPts([[x + 2 * s, top], [x + hw + 2 * s, bot + 1 * s], [x - hw + 2 * s, bot + 1 * s]]), 'g3') +
      ghP(ghPts([[x, top], [x + hw, bot], [x - hw, bot]]), 'g2') + ghP(ghPts([[x, top], [x, bot], [x - hw, bot]]), 'g') +
      ghP(`M${gh1(x)} ${gh1(top)}L${gh1(x + hw * .42)} ${gh1(top + 18 * s)}Q${gh1(x + hw * .2)} ${gh1(top + 14 * s)} ${gh1(x)} ${gh1(top + 19 * s)}` +
        `Q${gh1(x - hw * .2)} ${gh1(top + 14 * s)} ${gh1(x - hw * .42)} ${gh1(top + 18 * s)}Z`, 'w');
  }
  return d;
}
// a building with lit windows (city): x, ground y, width, height, hue, window hue
function rlTower(x, y, w, h, c, wc) {
  const win = [], off = [];
  for (let r = 0, yy = y - h + 14; yy < y - 20; r++, yy += 20) {
    for (let k = 0, xx = x + 10; xx < x + w - 14; k++, xx += 18) ((r * 7 + k * 3) % 5 == 1 ? off : win).push([xx, yy, 10, 12]);
  }
  return ghShad(x + w / 2 + 4, y, w / 2 + 4, 4) + ghR(x + 3, y - h + 3, w, h, 4, c + '3') + ghR(x, y - h, w, h, 4, c + '2') +
    ghR(x + 2, y - h + 2, 8, h - 4, 3, c, .7) + rlRects(win, wc) + rlRects(off, c + '3', .7) +
    ghL(`M${gh1(x + w * .7)} ${gh1(y - h)}V${gh1(y - h - 16)}`, 'e3', 2.4) + ghC(x + w * .7, y - h - 17, 3, 'r');
}
// roadside things: viewBox [w, h] with the ground at the bottom middle; wr = width on the road in road half-widths
const RL_PROPS = {
  tree: { vb: [80, 110], wr: 1.1, art: () => ghShad(42, 106, 30, 4.5, .15) + ghR(35.5, 64, 10, 42, 3, 'n2') + ghR(35, 64, 7.5, 42, 3, 'n') +
    ghBall(24, 56, 17, 'g') + ghBall(56, 54, 18, 'g') + ghBall(40, 34, 24, 'g') + ghBall(28, 44, 3.2, 'r') + ghBall(52, 38, 3.2, 'r') +
    ghBall(46, 58, 3.2, 'r') },
  bush: { vb: [90, 52], wr: .75, art: () => ghShad(46, 49, 40, 3.5, .14) + ghBall(24, 35, 15, 'g') + ghBall(66, 34, 16, 'g') +
    ghBall(45, 26, 19, 'g') + rlBloom(30, 22, 7, 'p') + rlBloom(58, 18, 7, 'w') + rlBloom(72, 32, 6, 'p') },
  flowers: { vb: [80, 46], wr: .5, art: () => ghShad(40, 44, 34, 2.6, .12) + ghL('M16 44V24M40 44V14M64 44V24', 'g2', 2.6) +
    ghE(28, 34, 8, 3.4, 'g', null, -30) + ghE(52, 32, 8, 3.4, 'g', null, 30) + rlBloom(16, 22, 11, 'r') + rlBloom(40, 13, 12, 'v') +
    rlBloom(64, 22, 11, 'o') },
  fence: { vb: [110, 52], wr: 1.1, art: () => {
    let s = ghShad(55, 50, 54, 3, .12);
    for (const x of [10, 55, 100]) s += ghP(`M${x - 5} 50V14L${x} 8L${x + 5} 14V50Z`, 'm2') + ghP(`M${x - 5} 50V14L${x} 8L${x + 3} 11V50Z`, 'm');
    return s + ghR(2, 19, 106, 7, 2, 'm2') + ghR(2, 18, 106, 5.4, 2, 'm') + ghR(2, 34, 106, 7, 2, 'm2') + ghR(2, 33, 106, 5.4, 2, 'm') +
      ghR(4, 18.6, 60, 1.4, .7, 'w', .8) + ghR(4, 33.6, 60, 1.4, .7, 'w', .8);
  } },
  palm: { vb: [110, 150], wr: 1.15, art: () => {
    let s = ghShad(52, 147, 24, 3.4, .15);
    for (let i = 0; i < 9; i++) s += ghE(48 + i * i * .14, 144 - i * 13, 7.4 - i * .3, 8, 'n2') + ghE(47 + i * i * .14, 143 - i * 13, 6.4 - i * .3, 6, 'n');
    const leaf = (ex, ey, cx, cy, c) => ghP(`M60 34Q${cx} ${cy - 12} ${ex} ${ey}Q${cx + 4} ${cy + 6} 60 38Z`, c);
    return s + leaf(4, 50, 28, 18, 'g2') + leaf(106, 52, 90, 18, 'g2') + leaf(18, 70, 34, 38, 'g2') + leaf(100, 74, 86, 40, 'g2') +
      leaf(8, 46, 30, 14, 'g') + leaf(102, 46, 86, 14, 'g') + leaf(46, 4, 52, 16, 'g') + leaf(80, 6, 72, 14, 'g') +
      ghBall(55, 42, 5, 'n') + ghBall(65, 43, 5, 'n') + ghBall(60, 47, 5, 'n');
  } },
  umbrella: { vb: [90, 100], wr: .9, art: () => {
    let st = '';
    for (let i = 0; i < 6; i += 2) st += ghPts([[45, 12], [6 + i * 13, 44], [19 + i * 13, 44]]);
    return ghShad(45, 97, 34, 4, .15) + ghL('M46 100V18', 'e3', 3.2) + ghL('M45 100V18', 'e1', 1.4, .8) +
      ghP('M4 46Q8 12 45 10Q82 12 86 46Z', 'r2') + ghP('M5 44Q9 13 45 11.4Q80 13 83 44Z', 'r') + ghP(st, 'w') +
      ghP('M4 44a6.8 5 0 0 0 13.6 0a6.8 5 0 0 0 13.6 0a6.8 5 0 0 0 13.6 0a6.8 5 0 0 0 13.6 0a6.8 5 0 0 0 13.6 0a6.8 5 0 0 0 13.6 0Z', 'r2') +
      ghE(28, 22, 9, 3.6, 'w', .45, -25) + ghBall(45, 10, 3.4, 'y');
  } },
  rock: { vb: [70, 46], wr: .6, art: () => ghShad(36, 44, 32, 3, .14) + ghP('M6 44C4 30 16 14 32 12C50 10 66 24 64 44Z', 'e2') +
    ghP('M8 42C6 30 17 15.6 31 14C46 13 58 24 58 40Z', 'e') + ghE(24, 22, 8, 4, 'e1', .85, -20) + ghE(46, 34, 5, 2.4, 'e2', .6) },
  hut: { vb: [80, 96], wr: 1.0, art: () => ghShad(42, 93, 36, 3.6, .15) + ghR(12, 40, 58, 54, 3, 'b2') + ghR(10, 38, 56, 54, 3, 'b') +
    rlRects([[18, 38, 7, 54], [32, 38, 7, 54], [46, 38, 7, 54]], 'w', .85) + ghR(30, 60, 18, 34, 8, 'n2') + ghR(30, 60, 15, 34, 7, 'n') +
    ghC(42, 78, 1.6, 'y') + ghP('M2 42L40 8L80 42Z', 'r2') + ghP('M3 40L40 9.4L76 40Z', 'r') + ghP('M3 40L40 9.4L30 22Z', 'r1', .5) },
  pine: { vb: [80, 132], wr: .95, art: () => rlPine(40, 129, 1) },
  igloo: { vb: [100, 62], wr: 1.15, art: () => ghShad(50, 59, 48, 3.4, .14) + ghP('M4 60A46 46 0 0 1 96 60Z', 'w3') +
    ghP('M5 59A44 44 0 0 1 91 59Z', 'w2') + ghP('M5 59A43 43 0 0 1 84 46C70 34 40 26 12 44Z', 'w') +
    ghL('M10 46H90M18 34H82M32 24H68M30 46V34M52 46V34M72 46V34M44 34V24M58 34V24', 'w3', 1.4, .8) +
    ghP('M36 60V48A14 14 0 0 1 64 48V60Z', 'b2') + ghP('M40 60V49A10 10 0 0 1 60 49V60Z', 'k2') },
  snowman: { vb: [64, 104], wr: .6, art: () => ghShad(33, 101, 24, 3, .15) + ghC(33, 81, 20, 'w3') + ghBall(32, 80, 19, 'w') +
    ghC(33, 51, 15, 'w3') + ghBall(32, 50, 14, 'w') + ghC(33, 27, 12, 'w3') + ghBall(32, 26, 11, 'w') +
    ghR(19, 33, 27, 6, 3, 'r2') + ghR(19, 32.4, 26, 5, 2.5, 'r') + ghR(35, 34, 6, 15, 3, 'r') + ghC(32, 47, 1.9, 'k2') + ghC(32, 56, 1.9, 'k2') +
    ghC(28, 24, 1.7, 'k') + ghC(36, 24, 1.7, 'k') + ghP('M32 27L44 29.4L32 31Z', 'o') + ghE(26, 30, 2.2, 1.4, 'p', .6) + ghE(38, 30, 2.2, 1.4, 'p', .6) +
    ghR(23, 3, 18, 14, 2, 'k2') + ghR(18, 15, 28, 4, 2, 'k2') + ghR(23, 12, 18, 3, 0, 'r') },
  tower: { vb: [100, 220], wr: 1.2, art: () => rlTower(8, 218, 80, 190, 'v', 'y1') },
  tower2: { vb: [110, 170], wr: 1.3, art: () => rlTower(8, 168, 92, 140, 'b', 'o1') },
  lamp: { vb: [54, 150], wr: .45, art: () => ghC(34, 24, 21, 'y1', .3) + ghC(34, 24, 12, 'y1', .45) + ghShad(20, 148, 12, 2.4, .2) +
    ghL('M19 148V34Q19 20 32 20', 'e3', 4.4) + ghL('M18 146V34Q18 21 30 20', 'e1', 1.4, .7) + ghR(25, 15, 20, 8, 3, 'e2') +
    ghE(35, 24, 7, 3.4, 'y1') + ghR(12, 138, 14, 11, 3, 'e3') },
  cone: { vb: [44, 46], wr: .3, art: () => ghShad(22, 44, 20, 2.4, .18) + ghR(4, 39, 36, 6, 2, 'o2') + ghP('M13 40L22 5L31 40Z', 'o2') +
    ghP('M13 40L21.4 5.6L28 40Z', 'o') + ghP('M17.5 22H26.5L28.3 29H15.7Z', 'w') + ghP('M15 33H29L30 37H14Z', 'w', .9) },
  // the start and finish arch over the road, the boost gate (answers are written on the three boards), a sparkle to collect
  arch: { vb: [300, 132], wr: 2.6, art: () => {
    const sq = [[], []];
    for (let r = 0; r < 2; r++) for (let c = 0; c < 20; c++) sq[(r + c) % 2].push([18 + c * 13.2, 12 + r * 13, 13.2, 13]);
    return ghShad(14, 131, 10, 2, .2) + ghShad(288, 131, 10, 2, .2) + ghR(8, 18, 12, 114, 4, 'e3') + ghR(7, 18, 9, 114, 4, 'e1') +
      ghR(282, 18, 12, 114, 4, 'e3') + ghR(281, 18, 9, 114, 4, 'e1') + ghR(16, 10, 270, 32, 4, 'k') + rlRects(sq[0], 'w') +
      rlRects(sq[1], 'k2') + ghR(18, 12, 264, 3, 1.5, 'w', .5) + ghBall(13, 13, 10, 'r') + ghBall(289, 13, 10, 'b') +
      ghE(9, 9, 3, 2, 'w', .6, -30) + ghE(285, 9, 3, 2, 'w', .6, -30);
  } },
  gate: { vb: [300, 112], wr: 2.6, art: () => {
    let s = ghShad(14, 111, 10, 2, .2) + ghShad(288, 111, 10, 2, .2) + ghR(8, 8, 12, 104, 4, 'v3') + ghR(7, 8, 9, 104, 4, 'v1') +
      ghR(282, 8, 12, 104, 4, 'v3') + ghR(281, 8, 9, 104, 4, 'v1') + ghR(10, 4, 282, 16, 6, 'v2') + ghR(9, 3, 282, 13, 6, 'v');
    for (const x of [77, 150, 223]) {
      s += ghL(`M${x - 18} 18V26M${x + 18} 18V26`, 'e3', 2) + ghR(x - 32, 25, 66, 50, 9, 'v3') + ghR(x - 33, 24, 64, 47, 8, 'w');
    }
    for (const x of [44, 112, 188, 256]) s += `<path ${ghF('y2')} d="${rwStarD(x + .6, 11.6, 6, 2.6)}"/><path ${ghF('y')} d="${rwStarD(x, 11, 5.4, 2.4)}"/>`;
    return s;
  } },
  sparkle: { vb: [40, 40], wr: .3, art: () => ghC(20, 20, 17, 'y1', .35) + `<path ${ghF('y2')} d="${rwStarD(21, 21, 17, 5.6, 4)}"/>` +
    `<path ${ghF('y')} d="${rwStarD(20, 20, 15.6, 5, 4)}"/><path ${ghF('y1')} d="${rwStarD(17.6, 17.6, 6.4, 2.2, 4)}"/>` + ghC(15, 15, 1.6, 'w', .9) },
};

/* ---- the far and near layers behind each place (960 wide and periodic, so they wrap; the horizon is their bottom) ---- */
const rlWave = (base, waves, x) => waves.reduce((y, [a, k, p]) => y - a * Math.sin(Math.PI * 2 * k * x / 960 + p), base);
function rlRidge(base, waves, bottom, dx = 0, dy = 0) {
  let d = `M0 ${bottom}`;
  for (let x = 0; x <= 960; x += 16) d += `L${x} ${gh1(rlWave(base, waves, x - dx) + dy)}`;
  return d + `L960 ${bottom}Z`;
}
// a band along a ridge's crest (snow on mountain tops)
function rlCap(base, waves, t) {
  const pts = [];
  for (let x = 0; x <= 960; x += 16) pts.push([x, rlWave(base, waves, x)]);
  return ghPts(pts.concat(pts.slice().reverse().map(([x, y]) => [x, y + t])));
}
const rlStars = n => {
  let d = '';
  for (let i = 0; i < n; i++) {
    const x = (i * 263 + 37) % 960, y = 12 + (i * 97) % 110, r = 1 + (i % 3) * .5;
    d += `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
  }
  return ghP(d, 'w', .85);
};
// the sun (or the moon) stays put in the sky: it is far away, so it does not move with the layers (100 x 100)
const RL_SKY = {
  meadow: () => ghSun(50, 50, 24), beach: () => ghSun(50, 50, 26), snow: () => ghC(50, 50, 34, 'w', .3) + ghC(50, 50, 24, 'w', .85),
  city: () => ghC(50, 50, 30, 'y1', .22) + `<path ${ghF('m')} d="M46 26a24 24 0 1 0 22 34a19 19 0 0 1 -22 -34Z"/>`,
};
const RL_BACK = {
  meadow: {
    far: () => {
      const m = [[30, 2, .5], [16, 5, 1.2], [6, 9, 2]], h = [[10, 3, 1], [6, 7, .3]];
      return ghCloud(320, 60, 1.6) + ghCloud(640, 80, 1.2) + ghCloud(860, 50, 1.4) +
        ghP(rlRidge(150, m, 200, 0, 0), 'b1', .55) + ghP(rlRidge(150, m, 200, 8, 4), 'c1', .6) + ghP(rlRidge(178, h, 200), 'g1');
    },
    near: () => {
      const w = [[12, 3, .2], [7, 7, 1.7]];
      let s = ghP(rlRidge(92, w, 120, 0, 2), 'g2') + ghP(rlRidge(92, w, 120, -4, 0), 'g');
      for (const x of [70, 150, 172, 420, 690, 712, 880]) s += ghTree(x, rlWave(92, w, x + 4) + 4, 1.1);
      const bx = 280, by = rlWave(92, w, bx + 4) + 6;
      s += ghShad(bx + 18, by, 26, 3) + ghR(bx, by - 26, 36, 26, 1, 'r2') + ghR(bx, by - 26, 32, 26, 1, 'r') + ghP(`M${bx - 3} ${by - 24}L${bx + 18} ${by - 40}L${bx + 39} ${by - 24}Z`, 'r3') +
        ghR(bx + 12, by - 16, 12, 16, 1, 'm') + ghL(`M${bx + 12} ${by - 16}L${bx + 24} ${by}M${bx + 24} ${by - 16}L${bx + 12} ${by}`, 'r2', 1.4);
      const wx = 560, wy = rlWave(92, w, wx + 4) + 6;
      s += ghShad(wx + 2, wy, 14, 2.4) + ghP(`M${wx - 9} ${wy}L${wx - 5} ${wy - 40}H${wx + 5}L${wx + 9} ${wy}Z`, 'm2') +
        ghP(`M${wx - 9} ${wy}L${wx - 5} ${wy - 40}H${wx + 2}L${wx + 3} ${wy}Z`, 'm') +
        ghL(`M${wx - 22} ${wy - 62}L${wx + 22} ${wy - 18}M${wx + 22} ${wy - 62}L${wx - 22} ${wy - 18}`, 'w', 5) + ghBall(wx, wy - 40, 4, 'e');
      return s;
    },
  },
  beach: {
    far: () => {
      let s = ghCloud(380, 70, 1.4) + ghCloud(760, 54, 1.6) + ghR(0, 158, 960, 42, 0, 'c') + ghR(0, 158, 960, 7, 0, 'c1', .8);
      let wv = '';
      for (let i = 0; i < 24; i++) wv += `M${(i * 151) % 960} ${172 + (i * 37) % 24}h${18 + (i % 3) * 8}`;
      s += ghL(wv, 'w', 2, .6) + ghP('M600 160C620 140 680 136 720 160Z', 'g2') + ghP('M604 160C624 143 670 140 708 158Z', 'g1');
      return s + ghP('M240 152L270 152L264 160H246Z', 'r') + ghL('M256 152V122', 'n2', 1.6) + ghP('M257 124L274 148H257Z', 'w') +
        ghP('M255 126L242 148H255Z', 'w2');
    },
    near: () => {
      const w = [[5, 3, .4], [3, 8, 1.1]];
      let s = ghP(rlRidge(108, w, 120, 0, 2), 't2') + ghP(rlRidge(108, w, 120, -4, 0), 't');
      const lx = 730, ly = 112;
      s += ghShad(lx, ly, 18, 2.6) + ghP(`M${lx - 12} ${ly}L${lx - 7} ${ly - 70}H${lx + 7}L${lx + 12} ${ly}Z`, 'w2') +
        ghP(`M${lx - 12} ${ly}L${lx - 7} ${ly - 70}H${lx + 3}L${lx + 5} ${ly}Z`, 'w') +
        ghP(`M${lx - 10.2} ${ly - 24}L${lx - 9} ${ly - 38}H${lx + 9}L${lx + 10.2} ${ly - 24}Z`, 'r') +
        ghP(`M${lx - 8.2} ${ly - 52}L${lx - 7.6} ${ly - 62}H${lx + 7.6}L${lx + 8.2} ${ly - 52}Z`, 'r') +
        ghR(lx - 9, ly - 82, 18, 12, 2, 'y1') + ghP(`M${lx - 11} ${ly - 82}L${lx} ${ly - 94}L${lx + 11} ${ly - 82}Z`, 'r2');
      for (const x of [90, 330, 520, 880]) s += rlNest(x - 22, 46, 44, 60, 110, 150, RL_PROPS.palm.art());
      return s;
    },
  },
  snow: {
    far: () => {
      const m = [[40, 3, .2], [22, 6, 1.4], [10, 11, .5]], h = [[8, 4, 1], [5, 9, .3]];
      return ghCloud(260, 50, 1.4) + ghCloud(720, 70, 1.2) +
        ghP(rlRidge(140, m, 200, 6, 4), 'b2', .5) + ghP(rlRidge(140, m, 200), 'b1') + ghP(rlCap(140, m, 22), 'w') +
        ghP(rlRidge(182, h, 200), 'w2');
    },
    near: () => {
      const w = [[10, 3, 2.2], [6, 6, .7]];
      let s = ghP(rlRidge(96, w, 120, 0, 2), 'w3') + ghP(rlRidge(96, w, 120, -4, 0), 'w');
      for (const x of [60, 84, 300, 330, 620, 646, 850]) s += rlNest(x - 16, rlWave(96, w, x + 4) - 52, 32, 54, 80, 132, rlPine(40, 129, 1));
      return s;
    },
  },
  city: {
    far: () => {
      let s = rlStars(40);
      const win = [];
      let x = 0, i = 0;
      while (x < 960) {
        const w = 40 + (i * 37) % 36, h = 40 + (i * 53) % 70;
        s += ghR(x, 200 - h, w - 4, h, 2, i % 2 ? 'v3' : 'b3', .9);
        for (let yy = 200 - h + 8; yy < 194; yy += 12) for (let xx = x + 6; xx < x + w - 12; xx += 10) if ((xx * 3 + yy * 7) % 13 < 5) win.push([xx, yy, 4, 5]);
        x += w;
        i++;
      }
      return s + rlRects(win, 'y1', .75);
    },
    near: () => {
      let s = '', x = 0, i = 0;
      const win = [];
      while (x < 960) {
        const w = 60 + (i * 41) % 40, h = 30 + (i * 29) % 50;
        if (i % 3 != 2) {
          s += ghR(x, 120 - h, w - 8, h, 3, 'k2') + ghR(x, 120 - h, 6, h, 2, 'v3', .8);
          for (let yy = 120 - h + 8; yy < 114; yy += 13) for (let xx = x + 10; xx < x + w - 16; xx += 12) if ((xx * 5 + yy * 3) % 11 < 6) win.push([xx, yy, 6, 7]);
        }
        x += w;
        i++;
      }
      return s + rlRects(win, 'y', .9) + ghR(0, 112, 960, 8, 0, 'k2');
    },
  },
};

/* ---- pictures for the hub card, the places and the podium (240 x 100, the --a-* roles) ---- */
// a road running into the distance (vanishing point vx, vy) with rumble edges and a centre line
function rlRoadPic(vx, vy, rc, road = 'e2') {
  const L = [[vx - 3, vy], [40, 100]], R = [[vx + 3, vy], [236, 100]];
  let s = ghP(`M${vx - 3} ${vy}L${vx + 3} ${vy}L250 100H26Z`, road) + ghP(`M${vx - 3} ${vy}L${vx - 2} ${vy}L50 100H26Z`, rc) +
    ghP(`M${vx + 2} ${vy}L${vx + 3} ${vy}L250 100H226Z`, rc);
  let d = '', dw = '';
  for (let i = 0; i < 6; i++) {
    const t0 = Math.pow(i / 6, 1.8), t1 = Math.pow((i + .45) / 6, 1.8), y0 = vy + (100 - vy) * t0, y1 = vy + (100 - vy) * t1;
    const lx = t => L[0][0] + (L[1][0] - L[0][0]) * t, rx = t => R[0][0] + (R[1][0] - R[0][0]) * t;
    d += `M${gh1(lx(t0))} ${gh1(y0)}L${gh1(lx(t1))} ${gh1(y1)}M${gh1(rx(t0))} ${gh1(y0)}L${gh1(rx(t1))} ${gh1(y1)}`;
    dw += `M${gh1(vx + (138 - vx) * t0)} ${gh1(y0)}L${gh1(vx + (138 - vx) * t1)} ${gh1(y1)}`;
  }
  return s + ghL(d, 'w', 2.6, .9) + ghL(dw, 'w', 2.4, .85);
}
const RL_ART = {
  // the hub card: a red kart from behind racing a fox to the finish arch, sparkles on the road
  hub() {
    return ghSun(26, 20, 9) + ghCloud(86, 14, .7) + ghCloud(206, 20, .6) +
      ghP('M0 52Q40 38 84 48T160 44T240 50V100H0Z', 'g1') + ghR(0, 50, 240, 50, 0, 'g') + ghP('M0 60Q60 54 120 56T240 58V100H0Z', 'g', .6) +
      rlRoadPic(146, 50, 'r') + rlNest(126, 26, 40, 24, 300, 132, RL_PROPS.arch.art()) +
      ghTree(30, 64, .8) + ghTree(210, 58, .7) + rlNest(148, 58, 16, 16, 40, 40, RL_PROPS.sparkle.art()) +
      rlNest(168, 50, 32, 22, 120, 84, rlCarArt('kart', 'b', '', 'fox', true)) +
      rlNest(66, 50, 84, 59, 120, 84, rlCarArt('kart', 'r', 'star', 'you', true)) + ghL('M50 96h-16M56 88h-22M48 80h-10', 'w', 2.4, .7);
  },
  // a place: its ground and road, two of its things by the road
  place(id) {
    const pl = RL_PLACES.find(p => p.id === id) || RL_PLACES[0], [g] = pl.grass;
    const P = RL_PROPS, a = { meadow: ['tree', 'bush'], beach: ['palm', 'umbrella'], snow: ['pine', 'snowman'], city: ['tower', 'lamp'] }[pl.id];
    const pa = P[a[0]], pb = P[a[1]], aw = Math.min(48, 70 * pa.vb[0] / pa.vb[1]), bw = Math.min(50, 54 * pb.vb[0] / pb.vb[1]);
    const far = { meadow: ghSun(30, 18, 8) + ghP('M0 50Q50 30 110 44T240 40V100H0Z', 'b1', .6),
      beach: ghSun(30, 18, 8) + ghR(0, 40, 240, 12, 0, 'c') + ghR(0, 40, 240, 3, 0, 'c1'),
      snow: ghP('M0 50L30 26L52 40L84 14L120 42L150 22L186 44L214 24L240 38V100H0Z', 'b1') + ghP('M72 24L84 14L96 26L88 23L84 27Z', 'w') +
        ghP('M140 30L150 22L160 30L154 28L150 31Z', 'w'),
      city: rlStars(8) + ghR(0, 26, 30, 30, 2, 'v3') + ghR(34, 16, 26, 40, 2, 'b3') + ghR(180, 20, 30, 36, 2, 'v3') + ghR(214, 30, 26, 26, 2, 'b3') }[pl.id];
    return far + ghR(0, 50, 240, 50, 0, g) + rlRoadPic(120, 50, pl.rumble[0], pl.road[0]) +
      rlNest(4, 92 - aw * pa.vb[1] / pa.vb[0], aw, aw * pa.vb[1] / pa.vb[0], pa.vb[0], pa.vb[1], pa.art()) +
      rlNest(206 - bw / 2, 96 - bw * pb.vb[1] / pb.vb[0], bw, bw * pb.vb[1] / pb.vb[0], pb.vb[0], pb.vb[1], pb.art()) +
      rlNest(150, 54, 22, 22, 40, 40, P.sparkle.art()) + ghShad(120, 99, 60, 2, .1);
  },
  // the podium: the first three, each a face on a step (who: the ids in order, 'you' for the player)
  podium(who, h, r = {}) {
    const step = (x, y, w, c) => ghR(x + 2, y + 2, w, 100 - y, 4, c + '2') + ghR(x, y, w, 100 - y, 4, c) + ghR(x + 3, y + 3, w * .5, 3, 1.5, c + '1', .8);
    let s = ghShad(120, 99, 96, 3, .12) + step(84, 50, 72, 'y') + step(14, 64, 68, 'e') + step(158, 72, 68, 'o');
    s += `<path ${ghF('y2')} d="${rwStarD(120.8, 66.6, 9, 4)}"/><path ${ghF('y')} d="${rwStarD(120, 66, 8, 3.6)}"/>`;
    const at = [[120, 30], [48, 44], [192, 52]];
    who.slice(0, 3).forEach((w, i) => {
      const [x, y] = at[i], k = i ? 1 : 1.15;
      s += w == 'you' ? rlNest(x - 26 * k, y - 22 * k, 52 * k, 36.4 * k, 120, 84, rlCarArt(r.body || 'kart', h, r.stk || '', 'you')) : rlFace(w, x, y, k, h);
    });
    for (const [x, y, c, a] of [[30, 14, 'r', 20], [70, 8, 'b', -30], [168, 12, 'g', 40], [212, 22, 'p', -15], [100, 6, 'y', 10], [146, 20, 'v', -40]]) {
      s += ghR(x, y, 7, 3.4, 1, c, null) .replace('/>', ` transform="rotate(${a} ${x} ${y})"/>`);
    }
    return s;
  },
};

/* ---- tracks: built once from their plan (curves and hills eased in and out), with the roadside things, sparkles and boost pads ---- */
// a small seeded random number generator (the same seed gives the same race)
function rlRng(seed) {
  let a = seed >>> 0 || 1;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rlHash = s => [...s].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0, 2166136261);
const rlMod = (i, n) => ((i % n) + n) % n;
const rlIO = t => .5 - Math.cos(Math.PI * Math.max(0, Math.min(1, t))) / 2;
const RL_BUILT = {};
function rlTrack(id) {
  if (RL_BUILT[id]) return RL_BUILT[id];
  const t = RL_TRK[id], pl = RL_PLACES.find(p => p.id === t.place), cv = [], hy = [];
  let y = 0;
  const sec = (a, h, l, c, dy) => {
    const n = a + h + l, y0 = y, y1 = y + dy * RL_SEG;
    for (let i = 0; i < n; i++) {
      cv.push(i < a ? c * (i / a) * (i / a) : i < a + h ? c : c * (1 - rlIO((i - a - h) / l)));
      hy.push(y0 + (y1 - y0) * rlIO(i / n));
    }
    y = y1;
  };
  sec(0, 40, 0, 0, 0); // the start straight (the start line is at RL_START)
  for (const s of t.plan) sec(...s);
  sec(0, 10, 50, 0, -y / RL_SEG); // back to the start height on the finishing straight
  const n = cv.length, L = n * RL_SEG, r = rlRng(rlHash(id));
  // roadside things: a weighted pick per side every few segments, never on the start line
  const kinds = pl.props.map(p => p[0]), wsum = pl.props.reduce((a, p) => a + p[1], 0);
  const pickK = () => {
    let v = r() * wsum;
    for (const [k, w] of pl.props) if ((v -= w) < 0) return k;
    return kinds[0];
  };
  const pr = new Array(n).fill(null);
  const put = (i, k, x) => (pr[i] = pr[i] || []).push(k, x);
  for (let i = 0; i < n; i++) {
    if (i >= RL_START - 2 && i <= RL_START + 2) continue;
    for (const side of [-1, 1]) {
      if (r() < (pl.id == 'city' ? .09 : .14)) {
        const k = pickK(), P = RL_PROPS[k];
        put(i, k, side * (1.25 + P.wr / 2 + (k.startsWith('tower') ? .5 + r() * 2.5 : r() * 1.6)));
      }
    }
    if (pl.id == 'city' && i % 14 == 0) put(i, 'lamp', (i % 28 ? 1 : -1) * 1.55);
  }
  put(RL_START, 'arch', 0);
  // sparkles: lines of five down one lane; boost pads on straights; the gate (used when boost gates are on) half way round
  const sp = [], pads = [];
  const lines = 7, gap = (n - 120) / lines;
  for (let k = 0; k < lines; k++) {
    const s0 = Math.floor(60 + k * gap + r() * gap * .4), x0 = [-.5, 0, .5][Math.floor(r() * 3)];
    for (let j = 0; j < 5; j++) sp.push([s0 + j * 3, x0]);
  }
  const straight = i => {
    for (let j = 0; j < 14; j++) if (cv[rlMod(i + j, n)] !== 0) return false;
    return true;
  };
  for (const at of [.22, .5, .78]) {
    let i = Math.floor(n * at);
    while (!straight(i) && i < n - 20) i++;
    if (straight(i)) pads.push([i, r() < .5 ? -.45 : .45]);
  }
  let gate = Math.floor(n * .62);
  while (!straight(gate - 6) && gate < n - 30) gate++;
  const spAt = new Array(n).fill(null), padAt = new Array(n).fill(null);
  sp.forEach(([s], i) => (spAt[s] = spAt[s] || []).push(i));
  pads.forEach(([s, x]) => { for (let j = 0; j < 6; j++) padAt[s + j] = x; });
  return (RL_BUILT[id] = { id, pl, n, L, cv: Float32Array.from(cv), hy: Float32Array.from(hy), pr, sp, pads, spAt, padAt, gate });
}

/* ---- boost gate questions (only when the grown-up or child turns them on): a sum or a times fact by grade, three answers ---- */
function rlQuiz(grade, rnd) {
  const g = grade == null ? 1 : +grade, R = (a, b) => a + Math.floor(rnd() * (b - a + 1));
  let q, a;
  if (g <= 0) {
    const x = R(0, 3), y = R(1, 2);
    q = x + ' + ' + y; a = x + y;
  } else if (g == 1) {
    const x = R(1, 6), y = R(1, 4);
    q = x + ' + ' + y; a = x + y;
  } else if (g == 2) {
    if (rnd() < .5) { const x = R(4, 12), y = R(2, 8); q = x + ' + ' + y; a = x + y; }
    else { const x = R(8, 18), y = R(2, 7); q = x + ' − ' + y; a = x - y; }
  } else {
    const x = R(2, g >= 5 ? 12 : 10), y = R(2, g >= 5 ? 12 : 9);
    q = x + ' × ' + y; a = x * y;
  }
  const opts = [a];
  for (const d of [1, -1, 2, -2, 10, 3]) if (opts.length < 3 && a + d >= 0 && !opts.includes(a + d) && rnd() < .7) opts.push(a + d);
  for (let d = 1; opts.length < 3; d++) if (!opts.includes(a + d)) opts.push(a + d);
  for (let i = 2; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [opts[i], opts[j]] = [opts[j], opts[i]]; }
  return { q, a, opts };
}

/* ---- the race: rlNew makes it, rlStep moves it on by one fixed step. No drawing, no DOM: the tests run whole races ----
   st.ev collects what happened (sounds and messages for the screen): ['go'], ['spark', n], ['pad'], ['zoom'], ['drift'],
   ['lap', n], ['pass', rival], ['bump'], ['gate', right, answer], ['finish']. */
// rivals: base speeds (share of RL_VMAX, shuffled each race) and the catch-up: ka eases a rival that is ahead (per second of
// lead), kb hurries one that is behind, lo and hi are the limits. Tuned with test bots (tools/test.js "racing game G-02").
const RL_CU = {
  easy: { base: [.75, .77, .79, .81, .84], ka: .12, kb: .07, lo: .66, hi: 1.12 },
  pro: { base: [.92, .94, .96, .98, 1], ka: .04, kb: .03, lo: .92, hi: 1.05 },
};
function rlNew(tid, o = {}) {
  const T = rlTrack(tid), t = RL_TRK[tid], rnd = rlRng(o.seed || 1), mode = o.mode == 'pro' ? 'pro' : 'easy';
  const lane = k => (k % 2 ? .45 : -.45), row = k => (RL_START - 3 - Math.floor(k / 2) * 3.2) * RL_SEG;
  const CU = RL_CU[mode], base = CU.base.slice();
  for (let i = base.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [base[i], base[j]] = [base[j], base[i]]; }
  const slots = [0, 1, 2, 3, 5];
  const cars = RL_RIVALS.map((rv, i) => ({ rv, d: row(slots[i]), x: lane(slots[i]), lx: lane(slots[i]) * .9, tx: lane(slots[i]), v: 0,
    base: base[i], wob: 0, wobT: rnd() * 3, fin: 0 }));
  const st = { tid, T, laps: t.laps, mode, quiz: !!o.quiz, grade: o.grade, rnd, cd: 3, rt: 0, done: false, ev: [], cars,
    fin: RL_START * RL_SEG + t.laps * T.L, taken: new Int16Array(T.sp.length), padKey: -1,
    P: { d: row(4), x: lane(4), v: 0, s: 0, dh: 0, dsp: 0, drifting: false, boost: 0, bumpT: 0, lap: 1, place: 5, spk: 0, time: 0, off: false } };
  if (st.quiz) st.q = rlQuiz(st.grade, rnd);
  return st;
}
const rlLap = (st, d) => Math.max(1, Math.floor((d - RL_START * RL_SEG) / st.T.L) + 1);
const rlPlace = st => 1 + st.cars.filter(c => c.d > st.P.d).length;
// crossed the point z of the lap going from d0 to d1?
const rlCross = (L, d0, d1, z) => {
  const k = Math.ceil((d0 - z) / L);
  return z + k * L > d0 && z + k * L <= d1 ? z + k * L : -1;
};
function rlStep(st, inp = {}) {
  const dt = RL_DT, P = st.P, T = st.T, L = T.L, easy = st.mode == 'easy';
  if (st.done) return;
  if (st.cd > 0) {
    st.cd -= dt;
    if (st.cd <= 0) st.ev.push(['go']);
    return;
  }
  st.rt += dt;
  const seg = rlMod(Math.floor(P.d / RL_SEG), T.n), cur = T.cv[seg], sp = P.v / RL_VMAX;
  const steer = Math.max(-1, Math.min(1, +inp.steer || 0));
  // speed: Easy keeps its speed by itself; Pro has Go; the grass slows you; pads and drifts zoom
  let tgt = easy ? RL_CRUISE : inp.go ? 1 : .8;
  P.off = Math.abs(P.x) > 1.02;
  if (P.off) tgt = Math.min(tgt, easy ? .62 : .5);
  if (P.boost > 0) {
    P.boost -= dt;
    tgt = 1.18;
  }
  if (P.bumpT > 0) P.bumpT -= dt;
  const dv = tgt * RL_VMAX - P.v;
  P.v += Math.max(-(P.off ? 1.2 : .6) * RL_VMAX * dt, Math.min(.45 * RL_VMAX * dt, dv));
  // steering, the drift (Pro: hold a turn into a bend at speed) and the push of a bend
  let turn = 1.7;
  if (!easy) {
    const into = Math.abs(steer) > .5 && Math.sign(steer) == Math.sign(cur) && Math.abs(cur) >= 2 && sp > .74;
    if (into) {
      P.dh += dt;
      if (P.dh > .35) {
        if (!P.drifting) st.ev.push(['drift']);
        P.drifting = true;
        P.dsp += dt;
      }
    } else {
      if (P.drifting && P.dsp > .5) {
        P.boost = Math.min(1.4, .45 + P.dsp * .45);
        st.ev.push(['zoom']);
      }
      P.drifting = false;
      P.dh = 0;
      P.dsp = 0;
    }
    if (P.drifting) turn *= 1.5;
  }
  P.s += (steer - P.s) * Math.min(1, dt * 10); // for the car's lean on screen
  P.x += steer * turn * sp * dt;
  P.x -= .35 * cur * sp * sp * dt * (easy ? .3 : 1);
  if (easy && !steer && Math.abs(P.x) > .7) P.x -= Math.sign(P.x) * .6 * dt; // the steering helper
  if (Math.abs(P.x) > 1.5) {
    P.x = Math.sign(P.x) * 1.5;
    P.v *= 1 - 1.5 * dt;
  }
  const d0 = P.d;
  P.d += P.v * dt;
  // sparkles (each one once a lap), boost pads, the gate
  T.sp.forEach(([s, x], i) => {
    const at = rlCross(L, d0, P.d, s * RL_SEG + RL_SEG / 2);
    if (at < 0) return;
    const id = Math.floor(at / L) + 1;
    if (st.taken[i] != id && Math.abs(P.x - x) < .26) {
      st.taken[i] = id;
      P.spk++;
      st.ev.push(['spark', P.spk]);
    }
  });
  const px = T.padAt[seg];
  if (px != null && Math.abs(P.x - px) < .3) {
    const key = Math.floor(P.d / L) * 1000 + T.pads.findIndex(p => seg >= p[0] && seg < p[0] + 6);
    if (key != st.padKey) {
      st.padKey = key;
      P.boost = Math.max(P.boost, 1.1);
      st.ev.push(['pad']);
    }
  }
  if (st.quiz && rlCross(L, d0, P.d, T.gate * RL_SEG) >= 0) {
    const lanes = [-.62, 0, .62], k = lanes.reduce((b, l, i) => (Math.abs(P.x - l) < Math.abs(P.x - lanes[b]) ? i : b), 0);
    const ok = st.q.opts[k] === st.q.a;
    if (ok) P.boost = Math.max(P.boost, 1.4);
    st.ev.push(['gate', ok, st.q.a]);
    st.q = rlQuiz(st.grade, st.rnd);
  }
  // the rivals: gentle catch-up (Easy: they ease off ahead and hurry behind; Pro: a little), a wobble now and then, lanes
  const last = P.d > st.fin - L * .35;
  for (const c of st.cars) {
    const gap = (c.d - P.d) / (RL_VMAX * .8);
    const CU = RL_CU[st.mode];
    let f = Math.max(CU.lo, Math.min(CU.hi, 1 - (gap > 0 ? CU.ka : CU.kb) * gap));
    if (easy && last && gap > 0 && gap < 2.5) f *= .97;
    if ((c.wobT -= dt) <= 0) {
      c.wobT = 2 + st.rnd() * 3;
      c.wob = (st.rnd() - .5) * .06;
    }
    const cc = Math.abs(T.cv[rlMod(Math.floor(c.d / RL_SEG), T.n)]);
    let ct = c.base * f * (1 + c.wob) * (1 - Math.max(0, cc - 3) * .02) * RL_VMAX;
    // keep a lane: move over when someone is just ahead, otherwise drift back to the own lane
    let block = null;
    for (const o of st.cars.concat([P])) {
      if (o === c) continue;
      const dd = o.d - c.d;
      if (dd > 0 && dd < RL_SEG * 3 && Math.abs(o.x - c.x) < .42 && (!block || dd < block.d - c.d)) block = o;
    }
    if (block) {
      c.tx = Math.max(-.75, Math.min(.75, block.x + (block.x > c.x || (block.x == c.x && c.x < 0) ? -.6 : .6)));
      if (block.d - c.d < RL_SEG * 1.2) ct = Math.min(ct, (block.v || 0) * .98);
    } else c.tx += (c.lx - c.tx) * Math.min(1, dt * .5);
    c.x += Math.max(-.9 * dt, Math.min(.9 * dt, c.tx - c.x));
    c.v += Math.max(-.6 * RL_VMAX * dt, Math.min(.42 * RL_VMAX * dt, ct - c.v));
    c.d += c.v * dt;
    if (!c.fin && c.d >= st.fin) c.fin = st.rt;
    // bumps with the player: only slow down and nudge apart, never a crash
    const dd = c.d - P.d;
    if (Math.abs(dd) < RL_SEG * .8 && Math.abs(c.x - P.x) < RL_CARW * .95) {
      const side = Math.sign(P.x - c.x) || (P.x < 0 ? -1 : 1);
      if (dd > 0) {
        P.v = Math.min(P.v, c.v * .9);
        P.d = Math.min(P.d, c.d - RL_SEG * .8);
      } else {
        c.v = Math.min(c.v, P.v * .9);
        c.d = Math.min(c.d, P.d - RL_SEG * .8);
      }
      P.x += side * .05;
      c.x -= side * .05;
      if (P.bumpT <= 0) {
        P.bumpT = .6;
        st.ev.push(['bump']);
      }
    }
  }
  // laps, places, the finish
  const lap = rlLap(st, P.d);
  if (lap != P.lap && lap <= st.laps) {
    P.lap = lap;
    st.ev.push(['lap', lap]);
  }
  const pl = rlPlace(st);
  if (pl < P.place) {
    const by = st.cars.filter(c => c.d < P.d).sort((a, b) => b.d - a.d)[0];
    if (by) st.ev.push(['pass', by.rv]);
  }
  P.place = pl;
  if (P.d >= st.fin) {
    st.done = true;
    P.time = st.rt - (P.d - st.fin) / Math.max(1, P.v);
    P.place = 1 + st.cars.filter(c => c.fin && c.fin <= P.time).length;
    st.ev.push(['finish']);
  }
}
// stars for a finish: 1 for finishing, 1 more for the top 3, 1 more for winning
const rlStarsFor = place => 1 + (place <= 3 ? 1 : 0) + (place == 1 ? 1 : 0);
// sparkles a race pays: the ones collected, plus a little for the place
const rlPay = (spk, place) => spk + [0, 10, 7, 5, 3, 3, 3][place || 6];

/* ---- drawing the race on a canvas ----
   Colours come from the tokens (--ill-* for the --a-* roles, --sc-* for skies), read once. Sprites are the SVG drawings above,
   turned into canvases once (async; drawn as soon as they are ready). Each frame: the sky (one gradient), two parallax layers
   (cached canvases), the ground, the road as one path per colour (grass stripe, rumble, road, lane marks, start line, pads),
   a haze at the horizon, then the roadside things, sparkles and cars from far to near, clipped behind hills. */
const RL_HUE = { r: 'red', o: 'orange', y: 'yellow', g: 'green', c: 'aqua', b: 'blue', v: 'purple', p: 'pink', n: 'brown', t: 'tan',
  s: 'skin', m: 'cream', e: 'grey', w: 'white', k: 'ink' };
let RL_COL = {};
// a role ('g2', 'w', 'k2') or a scene token ('sc-sky') as the colour its token holds
function rlCol(role) {
  if (RL_COL[role]) return RL_COL[role];
  const cs = getComputedStyle(document.documentElement);
  const tok = role.startsWith('sc-') ? '--' + role : '--ill-' + RL_HUE[role[0]] + (role[1] ? '-' + role[1] : '');
  return (RL_COL[role] = cs.getPropertyValue(tok).trim() || cs.getPropertyValue('--ink').trim());
}
const rlRes = svg => svg.replace(/var\(--a-([a-z]\d?)\)/g, (m, r) => rlCol(r));
// an SVG drawing as a canvas of pxw pixels wide (cached by key; .c is set once the image has loaded)
const RL_SPR = {};
function rlSprite(key, vw, vh, inner, pxw) {
  const k = key + '@' + Math.round(pxw);
  if (RL_SPR[k]) return RL_SPR[k];
  const w = Math.max(2, Math.round(pxw)), h = Math.max(2, Math.round(pxw * vh / vw)), s = (RL_SPR[k] = { c: null, w, h, ar: vh / vw });
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    c.getContext('2d').drawImage(img, 0, 0, w, h);
    s.c = c;
  };
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${vh}" ` +
    `width="${w}" height="${h}">${rlRes(inner)}</svg>`);
  return s;
}
// sizes and the cached pictures for this screen size
function rlSize(R) {
  const cv = R.cv, cw = Math.max(1, cv.clientWidth), ch = Math.max(1, cv.clientHeight);
  // k0: the full pixel scale (sprites are made at it); k: the canvas's, lower when frames are slow (R.q, see rlRace's loop)
  const k0 = Math.min(Math.min(1.5, devicePixelRatio || 1), Math.sqrt(1.2e6 / (cw * ch))), k = k0 * (R.q || 1), sc = k / k0;
  cv.width = Math.round(cw * k);
  cv.height = Math.round(ch * k);
  const W = cv.width, H = cv.height, port = ch > cw * 1.1, pl = R.st.T.pl, c = R.ctx;
  const hz = Math.round(H * (port ? .3 : .37)), ground = H - (port ? 136 : 12) * k, rw = W * (port ? .95 : .52);
  const V = { W, H, k, sc, port, hz, ground, rw, KX: rw * RL_PZ / RL_ROADW, KY: (ground - hz) * RL_PZ / RL_CAMH };
  V.sky = c.createLinearGradient(0, 0, 0, hz);
  V.sky.addColorStop(0, rlCol('sc-' + pl.sky[0]));
  V.sky.addColorStop(1, rlCol('sc-' + pl.sky[1]));
  V.haze = c.createLinearGradient(0, hz - H * .02, 0, hz + H * .06);
  V.haze.addColorStop(0, rlCol('sc-' + pl.sky[1]));
  V.haze.addColorStop(1, 'transparent');
  const B = RL_BACK[pl.id], fh = hz / sc * .66, nh = Math.max(24, hz / sc * .34);
  V.far = rlSprite('far-' + pl.id, 960, 200, B.far(), 960 * fh / 200);
  V.near = rlSprite('near-' + pl.id, 960, 120, B.near(), 960 * nh / 120);
  V.sun = rlSprite('sky-' + pl.id, 100, 100, RL_SKY[pl.id](), hz / sc * .4);
  // cars: the player's and the five rivals'; props, sparkle, arch, gate at a size they are often seen at
  const rs = rw / sc, cw2 = Math.min(360, RL_CARW * rs * 1.25), r = rlS();
  V.me = rlSprite(`me-${r.body}-${r.paint}-${r.stk}`, 120, 84, rlCarArt(r.body, r.paint, r.stk, 'you'), cw2);
  V.rv = {};
  for (const rv of RL_RIVALS) V.rv[rv.id] = rlSprite('rv-' + rv.id, 120, 84, rlCarArt('kart', rv.car, '', rv.id), cw2 * .8);
  V.pr = {};
  for (const k2 of pl.props.map(p => p[0]).concat(['arch', 'gate', 'sparkle', 'lamp'])) {
    const P = RL_PROPS[k2];
    V.pr[k2] = rlSprite('pr-' + k2, P.vb[0], P.vb[1], P.art(), Math.min(480, P.wr * rs * .55));
    V.pr[k2].wr = P.wr;
  }
  V.col = {};
  for (const [k2, v] of [['g0', pl.grass[0]], ['g1', pl.grass[1]], ['ra', pl.rumble[0]], ['rb', pl.rumble[1]], ['da', pl.road[0]],
    ['db', pl.road[1]], ['ln', pl.lane], ['w', 'w'], ['k', 'k2'], ['pa', 'o'], ['pb', 'y'], ['ink', 'k'], ['edge', pl.edge], ['spk', 'y1'],
    ['dr1', 'c1'], ['dr2', 'o1']]) V.col[k2] = rlCol(v);
  const D = RL_DRAW + 2;
  V.e = { x: new Float64Array(D), X: new Float64Array(D), Y: new Float64Array(D), Wd: new Float64Array(D), clip: new Float64Array(D) };
  R.v = V;
}
// draw a layer (a cached canvas) repeated across the screen, shifted by off pixels, with its bottom at y
function rlTile(c, s, off, y, W, sc) {
  if (!s.c) return;
  const w = s.w * sc, h = s.h * sc;
  for (let x = -rlMod(off, w); x < W; x += w) c.drawImage(s.c, Math.round(x), Math.round(y - h), Math.ceil(w), Math.ceil(h));
}
// a sprite standing on the road: centre x, ground y, width w, hidden below the clip line
function rlStand(c, s, x, y, w, clip, alpha) {
  if (!s || !s.c || w < 2 || x + w / 2 < 0 || x - w / 2 > c.canvas.width) return;
  const h = w * s.ar, top = y - h;
  if (top >= clip || y < 0) return;
  const vis = Math.min(1, (clip - top) / h);
  if (alpha != null) c.globalAlpha = alpha;
  c.drawImage(s.c, 0, 0, s.w, s.h * vis, x - w / 2, top, w, h * vis);
  if (alpha != null) c.globalAlpha = 1;
}
// a trapezoid of the road from a near edge (x1, y1, half-width w1) to a far edge, between a and b (in half-widths)
function rlQuad(p, x1, y1, w1, x2, y2, w2, a, b) {
  p.moveTo(x1 + w1 * a, y1);
  p.lineTo(x1 + w1 * b, y1);
  p.lineTo(x2 + w2 * b, y2);
  p.lineTo(x2 + w2 * a, y2);
  p.closePath();
}
function rlDraw(R) {
  const c = R.ctx, V = R.v, st = R.st, T = st.T, N = T.n, P = st.P, W = V.W, H = V.H, hz = V.hz, col = V.col, E = V.e, D = RL_DRAW;
  c.fillStyle = V.sky;
  c.fillRect(0, 0, W, hz + 2);
  if (V.sun.c) c.drawImage(V.sun.c, W * .1, hz * .12, V.sun.w * V.sc, V.sun.h * V.sc);
  rlTile(c, V.far, R.bgx * V.far.w * V.sc * .5, hz + 2, W, V.sc);
  rlTile(c, V.near, R.bgx * V.near.w * V.sc, hz + 2, W, V.sc);
  // edges of the segments ahead: x of the bending road, then projection (camera RL_PZ behind the player, following the car)
  const camD = P.d - RL_PZ, base = Math.floor(camD / RL_SEG), frac = camD / RL_SEG - base;
  let x = 0, dx = -T.cv[rlMod(base, N)] * frac;
  for (let e = 0; e <= D; e++) {
    E.x[e] = x;
    x += dx;
    dx += T.cv[rlMod(base + e, N)];
  }
  const ep = RL_PZ / RL_SEG + frac, ei = Math.floor(ep);
  const camX = E.x[ei] + (E.x[ei + 1] - E.x[ei]) * (ep - ei) + P.x * RL_ROADW;
  const pi = rlMod(Math.floor(P.d / RL_SEG), N), pf = P.d / RL_SEG - Math.floor(P.d / RL_SEG);
  const camY = RL_CAMH + T.hy[pi] + (T.hy[(pi + 1) % N] - T.hy[pi]) * pf;
  for (let e = 1; e <= D; e++) {
    const p = 1 / ((e - frac) * RL_SEG);
    E.X[e] = W / 2 + (E.x[e] - camX) * p * V.KX;
    E.Y[e] = hz + (camY - T.hy[rlMod(base + e, N)]) * p * V.KY;
    E.Wd[e] = RL_ROADW * p * V.KX;
  }
  // the road, near to far, each colour in one path; a segment behind a hill top is skipped, one partly behind it is cut
  const pG = new Path2D(), pRa = new Path2D(), pRb = new Path2D(), pDa = new Path2D(), pDb = new Path2D(), pL = new Path2D();
  const pW = new Path2D(), pK = new Path2D(), pPa = new Path2D(), pPb = new Path2D();
  let maxy = H;
  for (let n = 1; n < D; n++) {
    E.clip[n] = maxy;
    let x1 = E.X[n], y1 = E.Y[n], w1 = E.Wd[n];
    const x2 = E.X[n + 1], y2 = E.Y[n + 1], w2 = E.Wd[n + 1];
    if (y2 >= maxy || y2 >= y1) continue;
    if (y1 > maxy) {
      const t = (maxy - y2) / (y1 - y2);
      x1 = x2 + (x1 - x2) * t;
      w1 = w2 + (w1 - w2) * t;
      y1 = maxy;
    }
    const i = rlMod(base + n, N), band = Math.floor(i / 3) & 1;
    if (band) pG.rect(0, y2, W, y1 - y2 + 1);
    rlQuad(band ? pRa : pRb, x1, y1, w1, x2, y2, w2, -1.14, -1);
    rlQuad(band ? pRa : pRb, x1, y1, w1, x2, y2, w2, 1, 1.14);
    rlQuad(band ? pDa : pDb, x1, y1 + .5, w1, x2, y2, w2, -1, 1);
    if ((i & 7) < 4) {
      rlQuad(pL, x1, y1, w1, x2, y2, w2, -.36, -.33);
      rlQuad(pL, x1, y1, w1, x2, y2, w2, .33, .36);
    }
    if (i == RL_START || i == RL_START + 1) for (let q = 0; q < 8; q++) rlQuad((q + i) & 1 ? pW : pK, x1, y1, w1, x2, y2, w2, -1 + q / 4, -.75 + q / 4);
    const px = T.padAt[i];
    if (px != null) {
      rlQuad(i & 1 ? pPa : pPb, x1, y1, w1, x2, y2, w2, px - .22, px + .22);
      rlQuad(i & 1 ? pPb : pPa, x1, y1, w1, x2, y2, w2, px - .1, px + .1);
    }
    maxy = y2;
  }
  for (let n = D; n < D + 2; n++) E.clip[n] = maxy;
  // the ground, up to the horizon or to the top of a hill that hides it
  c.fillStyle = col.g0;
  c.fillRect(0, Math.min(hz, maxy), W, H);
  const fill = (p, k) => {
    c.fillStyle = col[k];
    c.fill(p);
  };
  c.globalAlpha = .55;
  fill(pG, 'g1');
  c.globalAlpha = 1;
  fill(pRa, 'ra');
  fill(pRb, 'rb');
  fill(pDa, 'da');
  fill(pDb, 'db');
  fill(pL, 'ln');
  fill(pW, 'w');
  fill(pK, 'k');
  fill(pPa, 'pa');
  fill(pPb, 'pb');
  c.fillStyle = V.haze;
  c.globalAlpha = .7;
  c.fillRect(0, hz - H * .02, W, H * .08);
  c.globalAlpha = 1;
  // cars by the segment they are in
  const at = R.at || (R.at = []);
  at.length = 0;
  for (const car of st.cars) {
    const n = Math.floor((car.d - camD) / RL_SEG);
    if (n >= 1 && n < D) (at[n] = at[n] || []).push(car);
  }
  const lapOf = d => Math.floor(d / T.L) + 1, tw = R.t || 0;
  let meDrawn = false;
  for (let n = D - 1; n >= 1; n--) {
    if (!meDrawn && n < ep) {
      rlDrawMe(R);
      meDrawn = true;
    }
    if (E.Y[n] < 0 && E.Y[n + 1] < 0) continue;
    const i = rlMod(base + n, N), X = E.X[n], Y = E.Y[n], Wd = E.Wd[n], clip = E.clip[n];
    const pr = T.pr[i];
    if (pr) {
      for (let j = 0; j < pr.length; j += 2) {
        const s = V.pr[pr[j]];
        if (s) rlStand(c, s, X + Wd * pr[j + 1], Y, s.wr * Wd, clip);
      }
    }
    if (st.quiz && i == T.gate) rlDrawGate(R, X, Y, Wd, clip);
    const sp = T.spAt[i];
    if (sp) {
      const id = lapOf((base + n) * RL_SEG + RL_SEG / 2);
      for (const k of sp) {
        if (st.taken[k] == id) continue;
        const b = 1 + .12 * Math.sin(tw * 6 + k);
        rlStand(c, V.pr.sparkle, X + Wd * T.sp[k][1], Y - Wd * .06, V.pr.sparkle.wr * Wd * b, clip);
      }
    }
    const cs = at[n];
    if (cs) {
      cs.sort((a, b) => b.d - a.d);
      for (const car of cs) {
        const f = (car.d - camD) / RL_SEG - n, cx = X + (E.X[n + 1] - X) * f, cy = Y + (E.Y[n + 1] - Y) * f, cw = Wd + (E.Wd[n + 1] - Wd) * f;
        rlStand(c, V.rv[car.rv.id], cx + cw * car.x, cy, RL_CARW * cw, clip);
      }
    }
  }
  if (!meDrawn) rlDrawMe(R);
}
// the boost gate: the sprite, then the three answers written on its boards
function rlDrawGate(R, X, Y, Wd, clip) {
  const c = R.ctx, s = R.v.pr.gate, w = s.wr * Wd, h = w * s.ar;
  rlStand(c, s, X, Y, w, clip);
  if (!s.c || w < 60 || Y - h >= clip || !R.st.q) return;
  c.fillStyle = R.v.col.ink;
  c.font = `700 ${Math.round(h * .3)}px Andika, sans-serif`;
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  R.st.q.opts.forEach((o, i) => c.fillText(String(o), X - w / 2 + w * [77, 150, 223][i] / 300, Y - h + h * 47 / 112));
}
// the player's car: centred near the bottom, leaning into turns, shaking a little on the grass; drift sparks and speed lines
function rlDrawMe(R) {
  const c = R.ctx, V = R.v, P = R.st.P, s = V.me, w = RL_CARW * V.rw, t = R.t || 0;
  if (!s.c) return;
  const h = w * s.ar, bob = P.off ? Math.sin(t * 40) * 2 * V.k : Math.sin(t * 9) * .6 * V.k;
  const ang = P.s * .05 + (P.drifting ? Math.sign(P.s) * .12 : 0), x = V.W / 2 + P.s * w * .06, y = V.ground + bob;
  c.save();
  c.translate(x, y);
  c.rotate(ang);
  c.drawImage(s.c, -w / 2, -h, w, h);
  c.restore();
  if (P.drifting) {
    const p = new Path2D();
    for (let i = 0; i < 6; i++) {
      const sx = x + (i < 3 ? -1 : 1) * w * .38 + Math.sin(t * 50 + i * 2) * w * .05, sy = y - h * .05 - Math.abs(Math.cos(t * 37 + i)) * h * .25;
      p.moveTo(sx + w * .025, sy);
      p.arc(sx, sy, w * .025, 0, Math.PI * 2);
    }
    c.fillStyle = P.dsp > 1 ? V.col.dr2 : V.col.dr1;
    c.fill(p);
  }
  if (P.boost > 0) {
    const p = new Path2D(), cx = V.W / 2, cy = V.hz + (V.ground - V.hz) * .3;
    for (let i = 0; i < 12; i++) {
      const a = i / 12 * Math.PI * 2 + t * 3, r0 = V.W * (.42 + (i % 3) * .05), r1 = r0 + V.W * .12;
      p.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0 * .7);
      p.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1 * .7);
    }
    c.strokeStyle = V.col.w;
    c.globalAlpha = .55;
    c.lineWidth = 3 * V.k;
    c.stroke(p);
    c.globalAlpha = 1;
  }
}

/* ---- the screens: menu (places, tracks, how to drive), garage, the race, the end card ---- */
let RL = null; // the race on screen
const rlPic = (inner, cls = '') => `<svg class="art${cls ? ' ' + cls : ''}" viewBox="0 0 240 100" preserveAspectRatio="xMidYMid slice" ` +
  `aria-hidden="true" focusable="false">${inner}</svg>`;
const rlCarSVG = (body, h, st, cls = '') => `<svg class="art${cls ? ' ' + cls : ''}" viewBox="0 0 120 84" aria-hidden="true" focusable="false">` +
  `${rlCarArt(body, h, st, 'you')}</svg>`;
const rlSpkChip = (n, id = 'rlspk') => `<span class="stat rl-spk" id="${id}" aria-label="Sparkles">${ico('sparkle', 32)}<b>${n}</b></span>`;
const rlSnd = () => !!S.sound;
const rlTone = (...a) => { if (rlSnd()) tone(...a); };
const rlTiltOK = () => typeof window != 'undefined' && 'DeviceOrientationEvent' in window && (navigator.maxTouchPoints || 0) > 0;

function rlMenu(place) {
  const r = rlS();
  if (place && RL_PLACES.some(p => p.id === place)) r.place = place;
  const pl = RL_PLACES.find(p => p.id === r.place), stars = rlStarsAll(r), mode = rlMode(r);
  const pcard = p => {
    const open = rlPlaceOpen(p, r), got = RL_TRACKS[p.id].reduce((a, t) => a + (r.stars[t.id] || 0), 0);
    return `<button class="rl-place${p.id === pl.id ? ' on' : ''}${open ? '' : ' lock'}" data-pl="${p.id}" aria-pressed="${p.id === pl.id}">` +
      `<span class="rl-ppic" style="--gh-a:var(--sc-${p.sky[0]});--gh-b:var(--sc-${p.sky[1]})">${rlPic(RL_ART.place(p.id))}` +
      `${open ? '' : `<span class="rl-plock">${ico('lock', 22)}</span>`}</span><span class="rl-pname">${esc(p.name)}</span>` +
      `<span class="rl-psub">${ico('star', 18)}${open ? `<b>${got}</b> of 9` : `<b>${p.need - stars}</b> more to open`}</span></button>`;
  };
  const tcard = t => {
    const ok = rlTrackOpen(t.id, r), best = r.best[t.id];
    return `<button class="rl-trk${ok ? '' : ' lock'}" data-trk="${t.id}" data-ok="${ok ? 1 : 0}"><span class="rl-tn">${t.i + 1}</span>` +
      `<span class="rl-ti"><b>${esc(t.name)}</b><span>${ok ? (best ? 'Best time ' + rlTime(best) : t.laps + ' laps') : 'Finish track ' + t.i + ' to open'}</span></span>` +
      (ok ? UI.stars(r.stars[t.id] || 0, 3, 22) : '') + `<span class="rl-go" aria-hidden="true">${ico(ok ? 'play' : 'lock')}</span></button>`;
  };
  const how = (mode == 'pro' ? [['bolt', 'Hold Go to go faster. Let go in tight bends!'],
    ['rotate', 'Hold a turn all through a bend to drift. Let go for a zoom!']] : [['arrow-right', 'Tap the big arrows, or the sides of the road, to steer.']])
    .concat([['sparkle', 'Collect sparkles. Spend them on paint and stickers.'], ['play', 'Drive over the orange pads to zoom.'],
      ['trophy', 'A star for finishing, one for the top 3, one for winning.']]);
  view(`${GH.top('rally')}<div class="scroll rl-menu">
  <section class="rl-hero"><div class="rl-hcar">${rlCarSVG(r.body, r.paint, r.stk)}</div><div class="rl-hinfo">
   <p class="rl-hl">${ico('star', 22)}<b>${stars}</b> of 36 stars</p><p class="rl-hl">${ico('sparkle', 22)}<b>${r.spk}</b> sparkles</p>
   ${UI.btn('Garage', { icon: 'palette', id: 'rlgar', wide: true })}</div></section>
  <h2 class="rl-h">Places</h2><div class="rl-places">${RL_PLACES.map(pcard).join('')}</div>
  <h2 class="rl-h">${esc(pl.name)}</h2><div class="rl-trks">${RL_TRACKS[pl.id].map(tcard).join('')}</div>
  <h2 class="rl-h">Your rivals</h2><div class="rl-rivals">${RL_RIVALS.map(v => `<div class="rl-rv"><svg class="art" viewBox="0 0 50 54" aria-hidden="true" focusable="false">` +
    `${rlFace(v.id, 25, 30, 1.2)}</svg><b>${esc(v.name)}</b><span>${esc(v.kind)}</span></div>`).join('')}</div>
  <section class="rl-opts"><h2 class="rl-h">How to drive</h2>
   <div class="rl-mode">${UI.seg([['easy', 'Easy'], ['pro', 'Pro']], mode, { id: 'rlmode', label: 'Driving' })}
   <p>${mode == 'pro' ? 'Pro: hold Go to speed up, drift through bends, and the animals race hard.' : 'Easy: the car drives by itself. You steer.'}</p></div>
   <ul class="rl-how">${how.map(([i, t]) => `<li><span class="rl-hi">${ico(i, 22)}</span><span>${esc(t)}</span></li>`).join('')}</ul>
   ${UI.sw('Boost gates: drive through the right answer to zoom', r.quiz, 'rlquiz')}
   ${rlTiltOK() ? UI.sw('Steer by tilting the tablet', r.tilt, 'rltilt') : ''}</section></div>`);
  GH.wire({ back: () => gameRoom() });
  $('#rlgar').onclick = () => { SFX.whoosh(); rlGarage(); };
  $$('[data-pl]').forEach(b => b.onclick = () => {
    const p = RL_PLACES.find(x => x.id === b.dataset.pl);
    if (!rlPlaceOpen(p, r)) {
      SFX.wrong();
      fb(`Get ${p.need - rlStarsAll(r)} more stars to open ${p.name}!`, 'warn long', 2600);
      return;
    }
    SFX.pop(2);
    r.place = p.id;
    save();
    const y = $('.scroll').scrollTop;
    rlMenu();
    $('.scroll').scrollTop = y;
  });
  $$('[data-trk]').forEach(b => b.onclick = () => {
    const t = RL_TRK[b.dataset.trk];
    if (!rlTrackOpen(t.id, r)) {
      SFX.wrong();
      fb(`Finish ${RL_TRACKS[t.place][t.i - 1].name} first!`, 'warn long', 2600);
      return;
    }
    if (ptLeft() <= 0) {
      SFX.wrong();
      fb(ptWhyNot(), 'warn long', 3000);
      return;
    }
    SFX.whoosh();
    rlRace(t.id);
  });
  UI.segOn($('#rlmode'), v => {
    r.mode = v;
    save();
    const y = $('.scroll').scrollTop;
    rlMenu();
    $('.scroll').scrollTop = y;
  });
  $('#rlquiz').onchange = e => { r.quiz = e.target.checked; save(); };
  if ($('#rltilt')) $('#rltilt').onchange = e => {
    r.tilt = e.target.checked;
    save();
    // some tablets ask before they share the tilt
    if (r.tilt && window.DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) DeviceOrientationEvent.requestPermission().catch(() => {});
  };
}

/* ---- the garage: try a paint, sticker or car shape on the car; buy it with sparkles (the price and what is left are shown) ---- */
function rlGarage(sel) {
  const r = rlS(), stars = rlStarsAll(r);
  sel = sel || null;
  const look = { body: r.body, paint: r.paint, stk: r.stk };
  let bar = '';
  if (sel) {
    const list = sel.k == 'paint' ? RL_PAINTS : RL_STICKERS, it = list.find(x => x[0] === sel.id);
    look[sel.k == 'paint' ? 'paint' : 'stk'] = sel.id;
    const left = r.spk - it[2];
    bar = `<div class="rl-buy"><p><b>${esc(it[1])}</b> for ${ico('sparkle', 22)}<b>${it[2]}</b></p><p>${left >= 0 ? `You will have ${left} sparkles left.` :
      `You need ${-left} more sparkles. Collect them on the track!`}</p><div class="rl-bacts">` +
      UI.btn('Buy', { kind: 'primary', size: 'lg', icon: 'check', id: 'rlbuy', off: left < 0 }) + UI.btn('Not now', { icon: 'close', id: 'rlno' }) + '</div></div>';
  }
  const tile = (k, id, label, pic, own, on, price, need) => `<button class="rl-item${on ? ' on' : ''}${own ? '' : ' new'}" data-k="${k}" data-id="${id}" ` +
    `aria-pressed="${on}"><span class="rl-ipic">${pic}</span><span class="rl-iname">${esc(label)}</span><span class="rl-iprice">` +
    (on ? ico('check', 18) + 'On' : own ? 'Yours' : need != null ? ico('lock', 18) + need + ' ' + ico('star', 18) : ico('sparkle', 18) + price) + '</span></button>';
  const swatch = h => `<svg class="art" viewBox="0 0 40 40" aria-hidden="true" focusable="false">${ghBall(20, 20, 15, h)}</svg>`;
  const stk = id => `<svg class="art" viewBox="0 0 40 40" aria-hidden="true" focusable="false">${id ? rlStk(id, 20, 20, 15) : ghC(20, 20, 14, 'e1') +
    ghL('M13 13L27 27', 'e3', 3)}</svg>`;
  view(`${GH.top('rally', { sub: 'Garage', chips: rlSpkChip(r.spk) })}<div class="scroll rl-gar">
  <section class="rl-gcar" style="--gh-a:var(--sc-sky-1);--gh-b:var(--sc-sky)">${rlCarSVG(look.body, look.paint, look.stk, 'rl-big')}${bar}</section>
  <h2 class="rl-h">Cars</h2><div class="rl-items">${RL_BODIES.map(([id, n, need]) => tile('body', id, n, rlCarSVG(id, r.paint, ''),
    stars >= need, r.body === id, 0, stars >= need ? null : need)).join('')}</div>
  <p class="rl-note">New car shapes open with stars from racing. They all drive the same.</p>
  <h2 class="rl-h">Paint</h2><div class="rl-items">${RL_PAINTS.map(([id, n, c]) => tile('paint', id, n, swatch(id), !!r.paints[id], r.paint === id && !sel, c)).join('')}</div>
  <h2 class="rl-h">Stickers</h2><div class="rl-items">${RL_STICKERS.map(([id, n, c]) => tile('stk', id, n, stk(id), !id || !!r.stks[id], r.stk === id && !sel, c)).join('')}</div>
  </div>`);
  GH.wire({ back: () => rlMenu() });
  $$('.rl-item').forEach(b => b.onclick = () => {
    const k = b.dataset.k, id = b.dataset.id;
    if (k == 'body') {
      const need = RL_BODIES.find(x => x[0] === id)[2];
      if (stars < need) {
        SFX.wrong();
        fb(`Win ${need - stars} more stars to open it!`, 'warn long', 2400);
        return;
      }
      r.body = id;
    } else if (k == 'paint' ? r.paints[id] : !id || r.stks[id]) {
      if (k == 'paint') r.paint = id;
      else r.stk = id;
    } else return SFX.pop(1), rlGarage({ k, id });
    SFX.pop(2);
    save();
    rlGarage();
  });
  if (sel) {
    $('#rlno').onclick = () => rlGarage();
    $('#rlbuy').onclick = () => {
      if (!rlBuy(sel.k, sel.id)) {
        SFX.wrong();
        return;
      }
      if (sel.k == 'paint') r.paint = sel.id;
      else r.stk = sel.id;
      save();
      SFX.fanfare();
      rlGarage();
    };
  }
}

/* ---- the race ---- */
const rlNow = () => (window.__realNow || (() => performance.now()))();
function rlStop() {
  if (!RL) return;
  cancelAnimationFrame(RL.raf);
  clearTimeout(RL.endT);
  if (RL.eng) {
    try {
      RL.eng.g.gain.setTargetAtTime(0, ac().currentTime, .05);
      RL.eng.o.stop(ac().currentTime + .2);
      RL.eng.o2.stop(ac().currentTime + .2);
    } catch (e) {}
  }
  removeEventListener('resize', RL.rs);
  removeEventListener('keydown', RL.kd);
  removeEventListener('keyup', RL.ku);
  removeEventListener('deviceorientation', RL.ori);
  RL = null;
}
function rlMsg(t, ms = 1200, cls = '') {
  const m = $('#rlmsg');
  if (!m) return;
  m.textContent = t;
  m.className = 'rl-msg on' + (cls ? ' ' + cls : '');
  clearTimeout(m._t);
  m._t = setTimeout(() => m.classList.remove('on'), ms);
}
function rlRace(tid) {
  const r = rlS(), t = RL_TRK[tid], mode = rlMode(r);
  r.place = t.place;
  save();
  const btn = (id, icon, aria, txt) => `<button class="rl-btn" id="${id}" data-k="${id.slice(2)}" aria-label="${aria}">${ico(icon, 48)}` +
    `${txt ? `<span>${txt}</span>` : ''}</button>`;
  view(`${GH.top('rally', { play: true, hud: true, sub: t.name, chips: `<span class="stat rl-pos" id="rlpos" aria-label="Place">${ico('trophy', 32)}` +
    `<b>5th</b></span><span class="stat rl-lap" id="rllap" aria-label="Lap">${ico('replay', 32)}<b>1/${t.laps}</b></span>${rlSpkChip(0)}` })}
  <div class="rl rl-${mode}" id="rl"><canvas id="rlcv"></canvas><div class="rl-msg" id="rlmsg" aria-live="polite"></div>
  <div class="rl-q" id="rlq" hidden></div><div class="rl-ctl">${btn('rll', 'arrow-left', 'Steer left')}${btn('rlr', 'arrow-right', 'Steer right')}` +
    `${mode == 'pro' ? btn('rlgo', 'bolt', 'Go faster', 'Go') : ''}</div></div>`);
  const st = rlNew(tid, { mode, quiz: r.quiz, grade: S.grade, seed: ((Date.now() & 0xffffff) ^ (r.races * 7919)) >>> 0 || 1 });
  const cv = $('#rlcv');
  RL = { st, cv, ctx: cv.getContext('2d', { alpha: false }), ptr: {}, key: {}, tilt: 0, bgx: 0, t: 0, acc: 0, last: 0, raf: 0, paused: false, ft: [], fi: [],
    cd: 4, chips: {}, q: 1, fc: 0, qAt: 0 };
  rlSize(RL);
  RL.rs = () => { if (RL) rlSize(RL); };
  addEventListener('resize', RL.rs);
  // steering: the buttons (several fingers at once), the left or right half of the road in Easy, the arrow keys, tilting
  const box = $('#rl'), keyOf = e => {
    const b = e.target.closest && e.target.closest('.rl-btn');
    if (b) return b.dataset.k;
    return mode == 'easy' ? (e.clientX < innerWidth / 2 ? 'l' : 'r') : '';
  };
  const show = () => {
    const on = new Set(Object.values(RL.ptr).concat(Object.keys(RL.key).filter(k => RL.key[k])));
    for (const k of ['l', 'r', 'go']) {
      const b = $('#rl' + k);
      if (b) b.classList.toggle('on', on.has(k));
    }
    RL.on = on;
  };
  box.addEventListener('pointerdown', e => {
    if (!RL || e.target.closest('.gh-top')) return;
    e.preventDefault();
    const k = keyOf(e);
    if (!k) return;
    RL.ptr[e.pointerId] = k;
    try { box.setPointerCapture(e.pointerId); } catch (x) {}
    show();
  });
  const up = e => {
    if (!RL) return;
    delete RL.ptr[e.pointerId];
    show();
  };
  box.addEventListener('pointerup', up);
  box.addEventListener('pointercancel', up);
  box.addEventListener('contextmenu', e => e.preventDefault());
  const KEYS = { ArrowLeft: 'l', ArrowRight: 'r', ArrowUp: 'go', ' ': 'go' };
  RL.kd = e => { if (RL && KEYS[e.key]) { RL.key[KEYS[e.key]] = 1; show(); } };
  RL.ku = e => { if (RL && KEYS[e.key]) { RL.key[KEYS[e.key]] = 0; show(); } };
  addEventListener('keydown', RL.kd);
  addEventListener('keyup', RL.ku);
  RL.ori = e => {
    if (!RL || !r.tilt) return;
    const a = (screen.orientation && screen.orientation.angle) || +window.orientation || 0;
    const v = a == 90 ? e.beta : a == 270 || a == -90 ? -e.beta : a == 180 ? -e.gamma : e.gamma;
    RL.tilt = Math.abs(v) < 3 ? 0 : Math.max(-1, Math.min(1, v / 18));
  };
  if (r.tilt) addEventListener('deviceorientation', RL.ori);
  show();
  // the shared Pause sheet holds the race and the game-time clock; Quit keeps the sparkles collected so far
  GH.wire({quit: () => rlQuit(), hold: on => {
    if (!RL) return;
    RL.paused = on;
    RL.ptr = {};
    show();
    rlEngine();
  } });
  gtStart('#gtm', () => rlTimeUp());
  if (S.voice) say('Ready? Steer with the arrows!');
  const loop = ts => {
    if (!RL || RL.st !== st) return;
    if (!document.getElementById('rlcv')) return rlStop();
    const t0 = rlNow(), dt = RL.last ? Math.min(.1, (ts - RL.last) / 1000) : 0;
    if (RL.last) {
      RL.fi.push(ts - RL.last);
      if (RL.fi.length > 240) RL.fi.shift();
    }
    RL.last = ts;
    if (!document.hidden && !RL.paused && !GH.held && !st.done) {
      const on = RL.on || new Set();
      const inp = { steer: Math.max(-1, Math.min(1, (on.has('r') ? 1 : 0) - (on.has('l') ? 1 : 0) + RL.tilt)), go: on.has('go') };
      RL.acc += dt * RL_DEV.fast;
      let n = 0;
      while (RL.acc >= RL_DT && n < 10 * RL_DEV.fast && !st.done) {
        const seg = rlMod(Math.floor(st.P.d / RL_SEG), st.T.n);
        rlStep(st, inp);
        RL.bgx += st.T.cv[seg] * st.P.v * RL_DT / RL_SEG * .0009;
        RL.acc -= RL_DT;
        n++;
      }
      RL.acc = Math.min(RL.acc, RL_DT);
      RL.t += dt;
      rlEvents();
    }
    rlEngine();
    rlDraw(RL);
    if (RL_DEV.flush) RL.ctx.getImageData(0, 0, 1, 1);
    RL.ft.push(rlNow() - t0);
    if (RL.ft.length > 240) RL.ft.shift();
    // a slow tablet: fewer pixels (down to 60 %) when frames take long; back up when there is time to spare
    if (++RL.fc % 90 == 0 && RL.fi.length >= 60) {
      const med = RL.fi.slice(-60).sort((a, b) => a - b)[30], q = RL.q;
      if (med > 26 && RL.q > .6) RL.q = Math.max(.6, RL.q - .15);
      else if (med < 18 && RL.q < 1 && RL.fc - RL.qAt > 300) RL.q = Math.min(1, RL.q + .1);
      if (RL.q != q) {
        RL.qAt = RL.fc;
        rlSize(RL);
      }
    }
    RL.raf = requestAnimationFrame(loop);
  };
  RL.raf = requestAnimationFrame(loop);
}
// the engine: a soft hum that follows the speed (only with sound on; silent while paused and after the finish)
function rlEngine() {
  if (!RL) return;
  const P = RL.st.P, want = rlSnd() && !RL.paused && !GH.held && !RL.st.done && !document.hidden && RL.st.cd < 3;
  try {
    if (want && !RL.eng) {
      const a = ac(), o = a.createOscillator(), o2 = a.createOscillator(), f = a.createBiquadFilter(), g = a.createGain();
      o.type = 'sawtooth';
      o2.type = 'triangle';
      f.type = 'lowpass';
      f.frequency.value = 420;
      g.gain.value = 0;
      o.connect(f);
      o2.connect(f);
      f.connect(g).connect(MG);
      o.start();
      o2.start();
      RL.eng = { o, o2, g };
    }
    if (RL.eng) {
      const now = ac().currentTime, fr = 52 + 70 * P.v / RL_VMAX + (P.boost > 0 ? 18 : 0);
      RL.eng.o.frequency.setTargetAtTime(fr, now, .08);
      RL.eng.o2.frequency.setTargetAtTime(fr * 1.5, now, .08);
      RL.eng.g.gain.setTargetAtTime(want ? .022 : 0, now, .08);
    }
  } catch (e) {}
}
// what happened in the race: sounds, messages, the chips
function rlEvents() {
  const st = RL.st, P = st.P;
  const cd = Math.ceil(st.cd);
  if (st.cd > 0 && cd != RL.cd && cd <= 3) {
    RL.cd = cd;
    rlMsg(String(cd), 700, 'big');
    rlTone(520, .14, 0, 'square', .1);
  }
  for (const [k, a, b] of st.ev) {
    if (k == 'go') {
      rlMsg('Go!', 900, 'big');
      rlTone(1040, .3, 0, 'square', .1);
      rlTone(1560, .3, .08, 'triangle', .08);
    } else if (k == 'spark') {
      const m = [72, 74, 76, 79, 81, 84][a % 6];
      rlTone(NOTE(m + 12), .08, 0, 'sine', .07);
      rlTone(NOTE(m + 19), .12, .05, 'triangle', .04);
    } else if (k == 'pad' || k == 'zoom') {
      SFX.whoosh();
      rlMsg(k == 'pad' ? 'Zoom!' : 'Drift zoom!', 700);
    } else if (k == 'drift') rlTone(1800, .1, 0, 'sine', .05, 2400);
    else if (k == 'bump') rlTone(300, .25, 0, 'triangle', .14, 120);
    else if (k == 'lap') {
      rlMsg(a == st.laps ? 'Last lap!' : 'Lap ' + a, 1300);
      [0, 4, 7].forEach((d, i) => rlTone(NOTE(76 + d), .14, i * .09, 'triangle', .08));
    } else if (k == 'pass') {
      rlMsg('You passed ' + a.name + '!', 1000);
      rlTone(600, .12, 0, 'sine', .08, 900);
    } else if (k == 'gate') {
      if (a) { SFX.right(3); rlMsg('Right! Zoom!', 1000); }
      else { rlTone(320, .18, 0, 'triangle', .12, 200); rlMsg('It was ' + b + '. Next time!', 1400); }
    } else if (k == 'finish') {
      rlMsg('Finish!', 1500, 'big');
      SFX.fanfare();
      RL.endT = setTimeout(() => { if (RL && RL.st === st) rlFinish(); }, 1100);
    }
  }
  st.ev.length = 0;
  const set = (id, v) => {
    if (RL.chips[id] === v) return;
    RL.chips[id] = v;
    UI.setChip($('#' + id), v);
  };
  set('rlpos', rlOrd(P.place));
  set('rllap', Math.min(P.lap, st.laps) + '/' + st.laps);
  set('rlspk', P.spk);
  // the boost gate's question shows a few seconds before the gate
  const q = $('#rlq');
  if (q && st.quiz && st.q) {
    const ahead = rlMod(st.T.gate * RL_SEG - P.d, st.T.L), show = st.cd <= 0 && ahead < P.v * 3.5 + 1;
    if (show != !q.hidden || q.dataset.q != st.q.q) {
      q.hidden = !show;
      q.dataset.q = st.q.q;
      q.textContent = st.q.q + ' = ?';
      if (show && S.voice) say(st.q.q.replace('−', 'minus').replace('×', 'times') + '?');
    }
  }
}
function rlQuit() {
  const r = rlS();
  if (RL) r.spk += RL.st.P.spk;
  save();
  rlStop();
  gtStop();
  rlMenu();
}
function rlTimeUp() {
  const r = rlS();
  if (RL) r.spk += RL.st.P.spk;
  save();
  rlStop();
  timeUpOverlay();
}
// the finish: stars, the best time, sparkles, what opened; the shared end card with the podium
function rlFinish() {
  const st = RL.st, P = st.P, r = rlS(), tid = st.tid, t = RL_TRK[tid];
  const opened = RL_ORDER.filter(id => rlTrackOpen(id, r)), bodies = RL_BODIES.filter(b => rlBodyOpen(b[0], r)).map(b => b[0]);
  const n = rlStarsFor(P.place), ms = Math.round(P.time * 1000), pay = rlPay(P.spk, P.place), had = r.best[tid];
  const rec = !had || ms < had;
  if (rec) r.best[tid] = ms;
  r.stars[tid] = Math.max(r.stars[tid] || 0, n);
  r.spk += pay;
  r.races++;
  save();
  rlStop();
  gtStop();
  const lines = [];
  for (const id of RL_ORDER) {
    if (rlTrackOpen(id, r) && !opened.includes(id)) {
      const nt = RL_TRK[id], np = RL_PLACES.find(p => p.id === nt.place);
      lines.push(['sparkle', `New track: ${esc(nt.name)}${nt.i == 0 ? ' in ' + esc(np.name) : ''}!`]);
    }
  }
  for (const b of RL_BODIES) if (rlBodyOpen(b[0], r) && !bodies.includes(b[0])) lines.push(['car', `New car in the garage: ${esc(b[1])}!`]);
  if (P.place > 3) lines.push(['hint', st.mode == 'pro' ? 'Tip: drift through the bends, then let go to zoom.' : 'Tip: drive over the orange pads to zoom past.']);
  // the first three: rivals who finished before you, you, then the others by how far they got
  const order = st.cars.filter(c => c.fin && c.fin <= P.time).sort((a, b) => a.fin - b.fin).map(c => c.rv.id).concat(['you'],
    st.cars.filter(c => !(c.fin && c.fin <= P.time)).sort((a, b) => b.d - a.d).map(c => c.rv.id));
  const title = P.place == 1 ? 'You won!' : P.place <= 3 ? rlOrd(P.place) + ' place!' : 'You finished the race!';
  const next = RL_ORDER[RL_ORDER.indexOf(tid) + 1], nextOk = next && rlTrackOpen(next, r) && !r.stars[next];
  const time = ptLeft() > 0;
  const o = GH.end('rally', { win: P.place <= 3, title, stars: n, tag: rec && had ? 'New best time!' : '',
    pic: rlPic(RL_ART.podium(order.slice(0, 3), r.paint, r), 'gh-art'),
    stats: [[rlOrd(P.place), 'place', 'trophy'], [rlTime(ms), rec ? (had ? 'new best' : 'your time') : 'best ' + rlTime(r.best[tid]), 'timer'],
      ['+' + pay, 'sparkles', 'sparkle']],
    lines,
    btns: (time ? UI.btn('Race again', { kind: 'primary', size: 'lg', icon: 'replay', id: 'rlagain', wide: true }) +
      (nextOk ? UI.btn('Next track', { icon: 'arrow-right', id: 'rlnext', wide: true }) : '') :
      UI.btn('Earn more game time', { kind: 'primary', size: 'lg', icon: 'path-read', id: 'rllearn', wide: true })) +
      UI.btn('Tracks', { icon: 'map', id: 'rlmenu', wide: true }) });
  if (S.voice) say(P.place == 1 ? `You won! Well done, ${S.name}!` : P.place <= 3 ? `${rlOrd(P.place)} place! Great racing!` : 'You finished the race! Well done!');
  const go = f => { o.remove(); f(); };
  if (o.querySelector('#rlagain')) o.querySelector('#rlagain').onclick = () => go(() => rlRace(tid));
  if (o.querySelector('#rlnext')) o.querySelector('#rlnext').onclick = () => go(() => rlRace(next));
  if (o.querySelector('#rllearn')) o.querySelector('#rllearn').onclick = () => go(() => home());
  o.querySelector('#rlmenu').onclick = () => go(() => rlMenu(t.place));
}

// The Game Room card (59-game-hub.js shows it after the other three)
GH.reg({
  id: 'rally', btn: 'grally', name: 'Star Rally', icon: 'car', p: 'math', sky: ['sky-1', 'sky'], art: () => RL_ART.hub(),
  sub: () => {
    const r = rlPeek(), n = rlStarsAll(r);
    return n || r.spk ? `<span>${ico('star', 18)}<b>${n}</b> of 36 stars</span><span>${ico('sparkle', 18)}<b>${rlNum(r.spk, 0, 1e7)}</b> sparkles</span>`
      : '<span>Race the animals on 12 tracks</span>';
  },
  open: () => rlMenu(), tapToPlay: '.rl-trk[data-ok="1"]', saved: 'Your sparkles are saved.',
});
