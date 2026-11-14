/* ---------- Star Rally: the racing game (G-02, G-02b; CSS src/css/49-game-race.css; both go into games2.<VER>.js) ----------
   An original Star School game. Races against five friendly animal drivers, seen from behind the car on a pseudo-3D road
   (the road is drawn in strips, cheap on a canvas). A race lasts about 60-90 seconds, then the shared end card.

   How it plays
   - Easy (default for Pre-K to 2nd grade): the car keeps its speed by itself; two big buttons (or a touch on the left or right
     half of the road) steer; a steering helper keeps the car near the road. Pro (default from 3rd grade, switchable): hold Go to
     go faster (but wide in tight bends), hold a turn through a bend at speed to drift, let go for a zoom.
   - G-02b: 12 tracks, each with its own layout and length (sweepers, S-bends, hairpins, city corners, big hills and drops, long
     straights, tunnels, bridges with rails, narrow piers, two-way splits with a faster side) and its own hazards (puddles, sand,
     ice, cones, rolling hay rolls / barrels / snowballs, crossing ducks / crabs / penguin chicks). Pick-ups: a boost star and a
     shield bubble. Some races have sunset, rain, snowfall or fog (rain makes puddles slippier, snow the road a little).
   - Crashes suit children: hitting a rail, a wall, a cone, a rolling thing or an animal at speed, or running into a kart from
     behind, spins the car round with cartoon dizzy stars and a short slowdown (the animals hop away; nothing breaks). A light
     touch is a bounce. Off the road is slow. In Pro a harder hit spins longer. In Easy spins are short, the hit boxes a little
     smaller and the helper still keeps the car on the road, so a 5-year-old always finishes, but mistakes visibly cost time.
   - Progress: 4 cups of 3 races (points 10/8/6/5/4/3, standings after each race, a gold / silver / bronze trophy); a cup opens
     with a trophy in the one before (or after racing the one before twice, so nobody is stuck). Rivals get a little faster in
     later cups. Single races on any track of an open cup (stars per track as before), and a time trial against the ghost of the
     child's own best lap. Upgrades (grip, turbo, bumper) bought with sparkles from racing and opened by trophies. The menu shows
     one clear next goal. Nothing is random in what you earn; nothing changes while the app is closed. No lives, no game over.
   - Rivals keep the race close (gentle catch-up); each race they get a seeded pace style (fast start or strong finish, the same
     on average) and the same small chance to miss a hazard. Nothing ever says "last" or shows red.

   Game time: paid exactly like the other games (gtStart: 1 s a second while racing, held while paused or hidden, 20 s of grace,
   then the shared time-up card). A race cannot start without game time (ptLeft(), ptWhyNot()).
   Save: S.rally (created when the game is first opened; an old save loads unchanged): {spk, best: {track: ms}, stars: {track: 0-3},
   paint, paints: {hue: 1}, stk, stks: {id: 1}, body, mode, quiz, tilt, place, races} and from G-02b {cups: {cup: {best: 1-4, runs}},
   cup: {id, i, pts: {who: n}} (a cup being raced), lap: {track: ms}, ghost: {track: {ms, g}}, upg: {grip, turbo, bumper}}.
   Drawing: object-art style (DESIGN_SYSTEM 6.5). Sprites are SVG in the --a-* roles, turned into cached canvases once (with
   half-size copies for far away, so small things do not shimmer); the road is drawn as one path per colour each frame; the sky and
   two parallax layers are cached canvases. No raw colours anywhere in this file. */

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

/* ---- places ---- */
// sky: two --sc-* tokens (top, horizon); grass, road, rumble, lane: --a-* roles (base and the stripe); props: [kind, weight];
// rail: the two stripes of rails and walls; water: under bridges; wall: tunnel walls (two bands); roll: the thing that rolls
// across; crit: the animal that crosses (city: none); wx: the weathers a single race can have (the first is the usual one)
const RL_PLACES = [
  { id: 'meadow', name: 'Sunny Meadow', sky: ['sky-1', 'sky'], grass: ['g', 'g1'], road: ['e2', 'e'], rumble: ['r', 'w'],
    lane: 'w', edge: 'g2', props: [['tree', 5], ['bush', 3], ['flowers', 3], ['fence', 2]],
    rail: ['n', 'm'], water: 'b', wall: ['e2', 'e3'], roll: 'hayroll', crit: 'duck', wx: ['sun', 'dusk', 'rain'] },
  { id: 'beach', name: 'Sandy Bay', sky: ['sea-1', 'sea'], grass: ['t1', 'm'], road: ['e2', 'e'], rumble: ['b', 'w'],
    lane: 'w', edge: 't', props: [['palm', 5], ['umbrella', 3], ['rock', 2], ['hut', 1]],
    rail: ['b', 'w'], water: 'c', wall: ['t2', 't3'], roll: 'barrel', crit: 'crab', wx: ['sun', 'dusk', 'fog'] },
  { id: 'snow', name: 'Snowy Peaks', sky: ['blue', 'sky-1'], grass: ['w', 'w2'], road: ['e2', 'e'], rumble: ['v', 'w'],
    lane: 'w', edge: 'w3', props: [['pine', 6], ['snowman', 2], ['rock', 1], ['igloo', 1]],
    rail: ['w2', 'c1'], water: 'c1', wall: ['b2', 'b3'], roll: 'snowball', crit: 'chick', wx: ['sun', 'snow', 'fog'] },
  { id: 'city', name: 'Night City', sky: ['night', 'night-1'], grass: ['k2', 'v3'], road: ['k2', 'e3'], rumble: ['y', 'k2'],
    lane: 'y', edge: 'v3', night: true, props: [['tower', 2], ['tower2', 2], ['lamp', 3], ['cone', 1]],
    rail: ['r', 'w'], water: 'b3', wall: ['v3', 'k2'], roll: 'barrel', crit: '', wx: ['night', 'rain'] },
];
const rlPl = id => RL_PLACES.find(p => p.id === id) || RL_PLACES[0];
// weather: sky tokens (none = the place's own), grip on puddles and the road, what falls, fog
const RL_WX = {
  sun: { name: '' }, night: { name: '' },
  dusk: { name: 'Sunset', sky: ['dusk', 'dusk-1'] },
  rain: { name: 'Rain', sky: ['stone-2', 'stone'], grip: .85, fall: 'rain' },
  snow: { name: 'Snowfall', sky: ['blue-2', 'stone'], grip: .9, fall: 'snow' },
  fog: { name: 'Fog', sky: ['stone', 'sky-1'], fog: 1 },
};

/* ---- tracks: each its own layout. A plan is road sections [enter, hold, leave, curve (+ right), hill (height change in
   segments), what is on it]. What is on it (letters): W wide, N narrow, B bridge (water and rails), T tunnel, R rails or walls,
   F a two-way split (a divider; one side is faster with boost pads, but has cones); hazards p puddles, s sand, i ice, c cones,
   b something rolling across, a animals crossing; z boost pad, * boost star, o shield bubble, g / G one / two sparkle lines. */
const RL_TRACKS = {
  meadow: [
    // gentle and wide: sweepers, a pond bridge, one puddle stretch, ducks
    { name: 'Daisy Lane', laps: 3, plan: [[20, 80, 20, 2, 0, 'Wg'], [0, 50, 0, 0, 0, 'z'], [25, 60, 25, -2, 6, 'pg'], [0, 40, 0, 0, -6, 'a*'],
      [10, 40, 10, 0, 0, 'Bg'], [25, 90, 25, 3, 0, 'WG'], [0, 40, 0, 0, 0, 'z'], [20, 50, 20, -2, 0, 'g']] },
    // long and hilly: a tunnel through the hill, hay rolls, a narrow farm bridge, a big drop
    { name: 'Windmill Hill', laps: 2, plan: [[30, 60, 30, 2, 25, 'g'], [10, 40, 10, 0, -10, 'z'], [0, 70, 0, 0, 0, 'Tg'], [20, 40, 20, -3, 15, 'b'],
      [20, 60, 20, 0, -35, 'G'], [25, 50, 25, 3, 0, 'pa'], [10, 50, 10, 0, 0, 'NB*'], [20, 60, 20, -2, 20, 'b'], [20, 40, 20, 0, -15, 'z'],
      [25, 70, 25, 4, 0, 'g'], [20, 80, 20, -3, 10, 'Rc'], [0, 60, 0, 0, -10, 'g'], [10, 40, 10, 0, 0, 'o']] },
    // a chain of S-bends, a hairpin with rails, a split, cones in the chicane
    { name: 'Butterfly Bends', laps: 3, plan: [[10, 20, 10, 4, 0, 'g'], [10, 20, 10, -4, 0, ''], [10, 20, 10, 4, 0, 'c'], [10, 20, 10, -4, 0, ''],
      [0, 40, 0, 0, 0, 'z'], [15, 30, 15, 7, 0, 'R'], [0, 30, 0, 0, 8, 'a'], [10, 20, 10, -5, -8, 'g'], [0, 100, 0, 0, 0, 'Fg'],
      [15, 40, 15, 3, 0, 'p*'], [10, 20, 10, -4, 0, ''], [10, 20, 10, 4, 0, 'c'], [20, 60, 20, -2, 10, 'g'], [0, 40, 0, 0, -10, 'oz']] },
  ],
  beach: [
    // long straights by the sea, sand at the edges, crabs, a boardwalk bridge
    { name: 'Seashell Shore', laps: 3, plan: [[0, 120, 0, 0, 0, 'Wsg'], [30, 60, 30, -2, 0, 'z'], [0, 80, 0, 0, 0, 'aG'], [30, 80, 30, 3, 8, 's'],
      [10, 60, 10, 0, -8, 'B*'], [30, 50, 30, -3, 0, 'g'], [0, 60, 0, 0, 0, 'Wz'], [20, 40, 20, 2, 0, 's']] },
    // fast sweepers, a narrow palm road, a long narrow pier with rails, rolling barrels
    { name: 'Palm Parade', laps: 2, plan: [[25, 90, 25, 3, 0, 'g'], [25, 90, 25, -3, 10, 'z'], [0, 60, 0, 0, -10, 'Nb'], [20, 60, 20, 4, 0, 'Ng'],
      [0, 140, 0, 0, 0, 'NBbo'], [25, 80, 25, -4, 0, 'G'], [0, 50, 0, 0, 15, 'z'], [25, 70, 25, 2, -15, 'ap'], [20, 60, 20, -3, 0, '*g'],
      [0, 60, 0, 0, 0, 'b'], [30, 70, 30, 3, 0, 'g']] },
    // a long climbing curve round the lighthouse, a hairpin at the top, the drop back, a split with a sandy side
    { name: 'Lighthouse Loop', laps: 3, plan: [[0, 60, 0, 0, 0, 'z'], [30, 150, 30, 3, 40, 'Rg'], [15, 25, 15, 7, 0, 'R*'], [20, 60, 20, -2, -20, 'b'],
      [30, 60, 30, -3, -20, 'g'], [0, 90, 0, 0, 0, 'Fsg'], [20, 40, 20, 4, 0, 'a'], [0, 40, 0, 0, 0, 'z'], [15, 30, 15, -5, 0, 'o']] },
  ],
  snow: [
    // ice on the straights, snowballs rolling down, gentle hills
    { name: 'Snowball Run', laps: 3, plan: [[25, 60, 25, 2, 10, 'g'], [0, 80, 0, 0, -10, 'iz'], [25, 60, 25, -3, 0, 'b'], [10, 50, 10, 0, 15, 'G'],
      [25, 70, 25, 3, -15, 'b*'], [0, 70, 0, 0, 0, 'i'], [20, 50, 20, -2, 0, 'gz'], [0, 40, 0, 0, 0, 'b']] },
    // a long valley: up, then a long run down, an icy tunnel, pine S-bends, a narrow log bridge, penguin chicks
    { name: 'Pine Valley', laps: 2, plan: [[30, 80, 30, -2, 30, 'g'], [0, 60, 0, 0, 0, 'z'], [30, 100, 30, 3, -50, 'G'], [0, 80, 0, 0, 0, 'Ti'],
      [15, 30, 15, -4, 0, 'a'], [15, 30, 15, 4, 0, ''], [15, 30, 15, -4, 0, 'c'], [0, 70, 0, 0, 0, 'NB*'], [30, 60, 30, 3, 20, 'g'],
      [0, 50, 0, 0, 0, 'iz'], [25, 60, 25, -3, 0, 'ao'], [20, 80, 20, 2, -10, 'bg'], [0, 90, 0, 0, 10, 'Wz']] },
    // switchbacks up the mountain between snow banks, ice on the bends, a long drop, a split
    { name: 'Frosty Summit', laps: 3, plan: [[0, 40, 0, 0, 0, 'z'], [15, 30, 15, 6, 20, 'R'], [0, 40, 0, 0, 15, 'Rg'], [15, 30, 15, -6, 20, 'Ri'],
      [0, 40, 0, 0, 15, 'Rb'], [15, 30, 15, 7, 10, 'R*'], [30, 90, 30, 0, -70, 'G'], [0, 80, 0, 0, 0, 'Fi'], [20, 50, 20, -3, 0, 'a'],
      [0, 40, 0, 0, 0, 'zo'], [20, 40, 20, 3, 0, 'c']] },
  ],
  city: [
    // city blocks: sharp corners between straights, walls, cones and puddles
    { name: 'Lamp Street', laps: 3, plan: [[0, 90, 0, 0, 0, 'Rg'], [8, 12, 8, 6, 0, ''], [0, 80, 0, 0, 0, 'pz'], [8, 12, 8, -6, 0, ''], [0, 70, 0, 0, 0, 'cg'],
      [8, 12, 8, 6, 0, ''], [0, 60, 0, 0, 6, '*'], [8, 12, 8, 6, -6, ''], [0, 90, 0, 0, 0, 'Gp'], [8, 12, 8, -6, 0, 'c'], [0, 70, 0, 0, 0, 'Rb'],
      [8, 12, 8, 6, 0, ''], [0, 60, 0, 0, 0, 'z']] },
    // an underpass tunnel, a wide boulevard with rolling barrels, a river bridge
    { name: 'Neon Avenue', laps: 2, plan: [[0, 60, 0, 0, 0, 'Wg'], [20, 50, 20, 3, 0, 'z'], [0, 100, 0, 0, 0, 'Tg'], [20, 50, 20, -3, 15, ''],
      [0, 120, 0, 0, -15, 'WbbG'], [25, 50, 25, 4, 0, 'p'], [0, 110, 0, 0, 0, 'B*'], [20, 40, 20, -4, 0, 'c'], [0, 80, 0, 0, 0, 'Wzp'],
      [25, 60, 25, 3, 10, 'o'], [0, 60, 0, 0, -10, 'g'], [20, 60, 20, -2, 0, 'gb']] },
    // a ring high above the city between walls: long banked bends, sharp turns, a split, ice on the top bend
    { name: 'Starlight Ring', laps: 3, plan: [[0, 50, 0, 0, 0, 'Rz'], [30, 120, 30, 4, 10, 'RG'], [0, 40, 0, 0, -10, 'Rc'], [20, 40, 20, -6, 0, 'R'],
      [0, 90, 0, 0, 0, 'Fbg'], [30, 100, 30, 5, 15, 'Ri*'], [0, 40, 0, 0, -15, 'Rp'], [15, 30, 15, -6, 0, 'R'], [0, 50, 0, 0, 0, 'Ro'],
      [20, 60, 20, 3, 0, 'Rg']] },
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
// the cups: 3 races each (track, weather), harder in order; tier makes the rivals a little faster
const RL_CUPS = [
  { id: 'sprout', name: 'Sprout Cup', hue: 'g', races: [['meadow-0', 'sun'], ['beach-0', 'sun'], ['meadow-1', 'dusk']] },
  { id: 'wave', name: 'Wave Cup', hue: 'b', races: [['beach-1', 'sun'], ['snow-0', 'snow'], ['meadow-2', 'rain']] },
  { id: 'frost', name: 'Frost Cup', hue: 'c', races: [['snow-1', 'snow'], ['city-0', 'night'], ['beach-2', 'fog']] },
  { id: 'star', name: 'Star Cup', hue: 'v', races: [['city-1', 'rain'], ['snow-2', 'sun'], ['city-2', 'night']] },
];
RL_CUPS.forEach((c, i) => { c.tier = i; for (const [t] of c.races) RL_TRK[t].cup = i; });
const RL_PTS = [10, 8, 6, 5, 4, 3]; // cup points by place
const RL_TROPHY = ['', 'Gold', 'Silver', 'Bronze'];

/* ---- the friendly rivals: an animal driver and a kart colour each ---- */
const RL_RIVALS = [
  { id: 'fox', name: 'Fern', kind: 'Fox', car: 'b' },
  { id: 'bunny', name: 'Bo', kind: 'Bunny', car: 'p' },
  { id: 'bear', name: 'Bruno', kind: 'Bear', car: 'y' },
  { id: 'penguin', name: 'Pip', kind: 'Penguin', car: 'c' },
  { id: 'frog', name: 'Fizz', kind: 'Frog', car: 'v' },
];

/* ---- the garage: paint, stickers (bought with sparkles), car shapes (opened with stars), upgrades (sparkles + trophies) ---- */
// a race pays about 40-60 sparkles, so paint and stickers take about 20 races
const RL_PAINTS = [['r', 'Red', 0], ['b', 'Blue', 40], ['g', 'Green', 50], ['y', 'Yellow', 50], ['o', 'Orange', 60],
  ['p', 'Pink', 60], ['v', 'Purple', 80], ['c', 'Aqua', 80]];
const RL_STICKERS = [['', 'No sticker', 0], ['star', 'Star', 30], ['heart', 'Heart', 40], ['bolt', 'Lightning', 50],
  ['flower', 'Flower', 60], ['paw', 'Paw', 70], ['moon', 'Moon', 80], ['rainbow', 'Rainbow', 100], ['flame', 'Flame', 120]];
const RL_BODIES = [['kart', 'Kart', 0], ['buggy', 'Buggy', 6], ['rocket', 'Rocket car', 15]]; // [id, name, stars needed]
// upgrades: [id, name, what it does, icon, levels [sparkles, trophies needed]]
const RL_UPG = [
  ['grip', 'Grippy tyres', 'Less sliding on ice and puddles; bends push you less.', 'target', [[60, 0], [120, 1], [200, 2]]],
  ['turbo', 'Turbo', 'Zooms from pads, stars and drifts last longer.', 'bolt', [[60, 0], [120, 1], [200, 3]]],
  ['bumper', 'Bouncy bumper', 'Spins after a bump are shorter.', 'replay', [[50, 0], [100, 1], [180, 2]]],
];

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
  // G-02b fields (absent in older saves): cups won, a cup being raced, best laps, ghosts, upgrades
  r.cups = rlObj(r.cups);
  for (const k in r.cups) {
    if (!RL_CUPS.some(c => c.id === k)) { delete r.cups[k]; continue; }
    const c = (r.cups[k] = rlObj(r.cups[k]));
    c.best = rlNum(c.best, 1, 4);
    c.runs = rlNum(c.runs, 0, 1e6);
  }
  if (r.cup != null) {
    const c = rlObj(r.cup), cup = RL_CUPS.find(x => x.id === c.id);
    if (!cup || !rlCupOpen(RL_CUPS.indexOf(cup), r)) delete r.cup;
    else {
      const pts = {};
      for (const w of ['you'].concat(RL_RIVALS.map(v => v.id))) pts[w] = rlNum(rlObj(c.pts)[w], 0, 30);
      r.cup = { id: c.id, i: rlNum(c.i, 0, 2), pts };
    }
  }
  r.lap = rlObj(r.lap);
  for (const k in r.lap) if (!RL_TRK[k] || !(+r.lap[k] > 0)) delete r.lap[k];
  else r.lap[k] = Math.round(+r.lap[k]);
  r.ghost = rlObj(r.ghost);
  for (const k in r.ghost) {
    const g = rlObj(r.ghost[k]);
    if (!RL_TRK[k] || !(+g.ms > 0) || typeof g.g != 'string' || g.g.length % 2 || g.g.length > 2400 || !/^[A-Za-z0-9_-]*$/.test(g.g)) delete r.ghost[k];
    else r.ghost[k] = { ms: Math.round(+g.ms), g: g.g };
  }
  const u = (r.upg = rlObj(r.upg));
  for (const k in u) if (!RL_UPG.some(x => x[0] === k)) delete u[k];
  for (const [k] of RL_UPG) u[k] = rlNum(u[k], 0, 3);
  return r;
}
// the hub and the tests read without creating S.rally
const rlPeek = () => (S.rally && typeof S.rally == 'object' && !Array.isArray(S.rally) ? S.rally : {});
const rlStarsAll = (r = rlPeek()) => RL_ORDER.reduce((a, k) => a + rlNum((r.stars || {})[k], 0, 3), 0);
const rlMode = (r = rlPeek()) => r.mode || ((S.grade == null ? 0 : +S.grade) <= 2 ? 'easy' : 'pro');
const rlCupRec = (r, id) => rlObj(rlObj(r.cups)[id]);
// trophies: cups finished in the top 3
const rlTrophies = (r = rlPeek()) => RL_CUPS.filter(c => { const b = rlNum(rlCupRec(r, c.id).best, 0, 4); return b >= 1 && b <= 3; }).length;
// a cup opens with a trophy in the one before, after racing the one before twice, or when one of its tracks was raced (old saves)
function rlCupOpen(i, r = rlPeek()) {
  const cup = RL_CUPS[i];
  if (!cup) return false;
  if (i == 0 || cup.races.some(([t]) => rlNum((r.stars || {})[t], 0, 3) > 0)) return true;
  const p = rlCupRec(r, RL_CUPS[i - 1].id), b = rlNum(p.best, 0, 4);
  return (b >= 1 && b <= 3) || rlNum(p.runs, 0, 1e6) >= 2;
}
// a track can be raced on its own (and timed) when its cup is open or it was raced before
const rlTrackOpen = (id, r = rlPeek()) => !!RL_TRK[id] && (rlCupOpen(RL_TRK[id].cup, r) || rlNum((r.stars || {})[id], 0, 3) > 0);
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
// the next level of an upgrade: {lv, cost, need} or null at the top
function rlUpNext(id, r = rlPeek()) {
  const u = RL_UPG.find(x => x[0] === id);
  if (!u) return null;
  const lv = rlNum(rlObj(r.upg)[id], 0, 3);
  return lv >= u[4].length ? null : { lv: lv + 1, cost: u[4][lv][0], need: u[4][lv][1] };
}
function rlBuyUp(id) {
  const r = rlS(), nx = rlUpNext(id, r);
  if (!nx || r.spk < nx.cost || rlTrophies(r) < nx.need) return false;
  r.spk -= nx.cost;
  r.upg[id] = nx.lv;
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
// G-02b: things on the road (hazards, pick-ups) in the same style; wr = width on the road in road half-widths
Object.assign(RL_PROPS, {
  duck: { vb: [66, 58], wr: .3, art: () => ghShad(32, 55, 22, 3, .16) + ghL('M25 50V56M36 50V56', 'o2', 2.6) + ghE(32, 40, 21, 13, 'y2') +
    ghE(30.6, 38.6, 20, 12, 'y') + ghE(25, 37, 10, 6, 'y2', .8, -12) + ghBall(47, 20, 11, 'y') + ghP('M56 18L66 22L56 26Z', 'o2') +
    ghP('M56 18L64.6 21.4L56 23.6Z', 'o') + ghC(49, 16.6, 1.9, 'k') + ghC(49.6, 16, .6, 'w') + ghE(43, 24, 2.4, 1.5, 'p', .6) },
  crab: { vb: [70, 46], wr: .34, art: () => ghShad(35, 43, 28, 3, .16) + ghL('M19 33L9 42M23 35L15 44M51 33L61 42M47 35L55 44', 'r2', 2.6) +
    ghE(35, 30, 20, 12, 'r2') + ghE(34, 29, 19, 11, 'r') + ghE(28, 25, 8, 3.4, 'r1', .7, -10) + ghBall(10, 18, 7, 'r') + ghBall(60, 18, 7, 'r') +
    ghP('M5 13L12 18L3 20Z', 'r2') + ghP('M65 13L58 18L67 20Z', 'r2') + ghL('M30 20V12M40 20V12', 'r2', 2) + ghC(30, 11, 3.4, 'w') +
    ghC(40, 11, 3.4, 'w') + ghC(30.6, 11, 1.7, 'k') + ghC(40.6, 11, 1.7, 'k') + ghL('M30 32Q35 35 40 32', 'k', 1.4) },
  chick: { vb: [52, 62], wr: .26, art: () => ghShad(26, 59, 17, 2.6, .16) + ghE(18, 58, 5, 2.4, 'o') + ghE(34, 58, 5, 2.4, 'o') +
    ghE(27, 39, 17, 19, 'e2') + ghE(26, 38, 16, 18, 'e') + ghE(26, 30, 11, 10, 'w') + ghE(21, 26, 4, 2.6, 'e1', .6, -30) +
    ghC(21.6, 28, 2, 'k') + ghC(30.4, 28, 2, 'k') + ghC(22.2, 27.4, .6, 'w') + ghC(31, 27.4, .6, 'w') + ghP('M23 33H29L26 37Z', 'k2') +
    ghE(11, 42, 4, 9, 'e2', null, 20) + ghE(41, 42, 4, 9, 'e2', null, -20) },
  hayroll: { vb: [64, 64], wr: .5, art: () => ghShad(32, 62, 24, 3, .16) + ghC(33, 33, 28, 't2') + ghC(31.6, 31.6, 26.6, 't') +
    ghL('M32 32m-4 0a4 4 0 1 1 8 0a9 9 0 1 1 -18 0a14 14 0 1 1 28 0a19 19 0 1 1 -38 0', 't3', 2.2, .7) + ghE(21, 19, 7, 4, 't1', .7, -35) },
  barrel: { vb: [60, 60], wr: .42, art: () => ghShad(30, 58, 22, 3, .16) + ghC(31, 31, 27, 'e3') + ghC(30, 30, 26, 'e2') + ghC(30, 30, 21, 'n2') +
    ghC(29, 29, 19.6, 'n') + ghL('M29 10V48M15 15L43 43M43 15L15 43', 'n2', 1.6, .6) + ghC(29, 29, 5, 'n2') + ghE(21, 20, 6, 3.4, 'n1', .7, -35) +
    ghE(18, 14, 4, 2, 'e1', .8, -40) },
  snowball: { vb: [60, 60], wr: .44, art: () => ghShad(30, 58, 22, 3, .16) + ghBall(30, 30, 26, 'w') + ghC(40, 40, 3, 'w3') + ghC(20, 42, 2.4, 'w3') +
    ghC(36, 18, 1.8, 'w3') },
  pstar: { vb: [48, 48], wr: .3, art: () => ghC(24, 24, 22, 'y1', .35) + `<path ${ghF('o')} d="${rwStarD(25, 25.4, 19, 8)}"/>` +
    `<path ${ghF('y')} d="${rwStarD(24, 24, 18, 7.6)}"/><path ${ghF('y1')} d="${rwStarD(21, 20, 7, 3)}"/>` + ghC(17, 16, 1.8, 'w', .9) },
  bubble: { vb: [48, 48], wr: .3, art: () => ghC(24, 24, 22, 'c1', .5) + ghC(25, 25, 17, 'c2', .25) + ghL('M24 3a21 21 0 1 1 -.1 0', 'c', 2.6) +
    ghE(15, 14, 6, 3.4, 'w', .85, -40) + ghC(31, 33, 2, 'w', .7) },
});
// a trophy cup (viewBox 0 0 100 100) in gold y, silver e or bronze o
const rlCupArt = h => ghShad(50, 95, 30, 4, .14) + ghR(30, 80, 40, 13, 3, 'n2') + ghR(29, 79, 40, 12, 3, 'n') + ghR(33, 82, 18, 2, 1, 'n1', .7) +
  ghR(42, 61, 16, 20, 2, h + '2') + ghR(41, 61, 14, 20, 2, h) + ghL('M25 21C8 21 10 45 32 47', h + '2', 6) + ghL('M75 21C92 21 90 45 68 47', h + '2', 6) +
  ghP('M21 13H79C79 44 67 63 50 63C33 63 21 44 21 13Z', h + '2') + ghP('M21 13H77C77 42 65 61 50 61C35 61 21 42 21 13Z', h) +
  ghE(33, 26, 5, 12, 'w', .45, -12) + `<path ${ghF('w', .8)} d="${rwStarD(50, 34, 10, 4.2)}"/>` + ghR(20, 10, 60, 6, 3, h + '2') + ghR(20, 9, 58, 5, 2.5, h + '1');

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

/* ---- tracks: built once from their plan (curves, hills and widths eased in and out), with what stands by and on the road ----
   T.cv curve, T.hy height, T.rw road half-width (1 = normal), T.fl bits (1 tunnel, 2 bridge, 4 rails or walls), T.dv the split's
   divider; T.sf surface patches per segment [x0, x1, kind]; T.ob things that stand (cones), T.mv things that roll or walk across,
   T.pk pick-ups, T.sp sparkles, T.pads boost pads; *At: the same by segment. */
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
const rlAt = (n, list) => {
  const a = new Array(n).fill(null);
  list.forEach((o, i) => { const s = rlMod(o.s, n); (a[s] = a[s] || []).push(i); });
  return a;
};
function rlTrack(id) {
  if (RL_BUILT[id]) return RL_BUILT[id];
  const t = RL_TRK[id], pl = rlPl(t.place), cv = [], hy = [], wd = [], fl = [], secs = [];
  let y = 0;
  const sec = (a, h, l, c, dy, f = '') => {
    const n = a + h + l, y0 = y, y1 = y + dy * RL_SEG, s0 = cv.length;
    const w = f.includes('F') ? 1.25 : f.includes('W') ? 1.3 : f.includes('N') ? .78 : f.includes('B') ? .88 : 1;
    const bits = (f.includes('T') ? 1 : 0) | (f.includes('B') ? 2 : 0) | (/[RTB]/.test(f) ? 4 : 0);
    for (let i = 0; i < n; i++) {
      cv.push(i < a ? c * (i / a) * (i / a) : i < a + h ? c : c * (1 - rlIO((i - a - h) / l)));
      hy.push(y0 + (y1 - y0) * rlIO(i / n));
      wd.push(w);
      fl.push(bits);
    }
    y = y1;
    secs.push([s0, a, h, l, f]);
  };
  sec(0, 40, 0, 0, 0); // the start straight (the start line is at RL_START)
  for (const s of t.plan) sec(...s);
  sec(0, 10, 50, 0, -y / RL_SEG); // back to the start height on the finishing straight
  const n = cv.length, L = n * RL_SEG, r = rlRng(rlHash(id));
  // widths change smoothly (over 13 segments)
  const rw = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let j = -6; j <= 6; j++) s += wd[rlMod(i + j, n)];
    rw[i] = s / 13;
  }
  const dv = new Uint8Array(n), sfAt = new Array(n).fill(null), ob = [], mv = [], pk = [], sp = [], pads = [], forks = [];
  const patch = (s0, len, x0, x1, k) => { for (let j = 0; j < len; j++) (sfAt[rlMod(s0 + j, n)] = sfAt[rlMod(s0 + j, n)] || []).push([x0, x1, k]); };
  const pick = a => a[Math.floor(r() * a.length)];
  for (const [s0, a, h, l, f] of secs) {
    if (!f) continue;
    const hs = h >= 8 ? s0 + a : s0, hl = h >= 8 ? h : a + h + l, at = q => hs + Math.floor(hl * q);
    for (const ch of f) {
      if (ch == 'p') for (let k = 0; k < 3; k++) { const x = (k % 2 ? 1 : -1) * (r() < .5 ? .35 : .45) * (r() < .5 ? 1 : -1); patch(at((k + 1) / 4), 5, x - .26, x + .26, 'p'); }
      else if (ch == 'i') { const sd = r() < .5 ? -1 : 1; patch(at(.2), 12, sd < 0 ? -1.4 : -.05, sd < 0 ? .05 : 1.4, 'i'); patch(at(.62), 10, sd < 0 ? -.05 : -1.4, sd < 0 ? 1.4 : .05, 'i'); }
      else if (ch == 's') for (const q of [.15, .6]) { const sd = r() < .5 ? -1 : 1; patch(at(q), 14, sd < 0 ? -1.6 : .42, sd < 0 ? -.42 : 1.6, 's'); }
      else if (ch == 'c' || (ch == 'a' && !pl.crit)) {
        const xs = pick([[-.5, .45, 0], [.5, -.45, 0], [0, -.55, .55]]);
        xs.forEach((x, k) => ob.push({ s: at(.3) + k * 7, x, w: .12, k: 'cone' }));
      } else if (ch == 'b') mv.push({ s: at(r() < .5 ? .4 : .6), k: pl.roll, a: 1.35, sp: .38 + r() * .14, ph: r() * 4, w: .17 });
      else if (ch == 'a') mv.push({ s: at(.45), k: pl.crit, a: 1.4, sp: .24 + r() * .06, ph: r() * 4, w: .13 });
      else if (ch == 'z') pads.push([at(.5) - 3, pick([-.45, .45])]);
      else if (ch == '*' || ch == 'o') pk.push({ s: at(ch == '*' ? .62 : .72), x: pick([-.45, 0, .45]), k: ch == '*' ? 'star' : 'shield' });
      else if (ch == 'g' || ch == 'G') for (const q of ch == 'g' ? [.18] : [.12, .6]) { const x = pick([-.5, 0, .5]); for (let j = 0; j < 5; j++) sp.push([at(q) + j * 3, x]); }
      else if (ch == 'F') {
        const sd = r() < .5 ? -1 : 1, a0 = hs + 6, a1 = hs + hl - 4;
        for (let i = a0; i < a1; i++) dv[rlMod(i, n)] = 1;
        forks.push([a0, a1, sd]);
        pads.push([a0 + Math.floor((a1 - a0) * .22), sd * .62], [a0 + Math.floor((a1 - a0) * .62), sd * .62]);
        ob.push({ s: a0 + Math.floor((a1 - a0) * .42), x: sd * .45, w: .12, k: 'cone' }, { s: a0 + Math.floor((a1 - a0) * .82), x: sd * .85, w: .12, k: 'cone' });
      }
    }
  }
  // roadside things: a weighted pick per side every few segments, never on the start line, in tunnels or over water
  const kinds = pl.props.map(p => p[0]), wsum = pl.props.reduce((a, p) => a + p[1], 0);
  const pickK = () => {
    let v = r() * wsum;
    for (const [k, w] of pl.props) if ((v -= w) < 0) return k;
    return kinds[0];
  };
  const pr = new Array(n).fill(null);
  const put = (i, k, x) => (pr[i] = pr[i] || []).push(k, x);
  for (let i = 0; i < n; i++) {
    if ((i >= RL_START - 2 && i <= RL_START + 2) || fl[i] & 3) continue;
    for (const side of [-1, 1]) {
      if (r() < (pl.id == 'city' ? .09 : .14)) {
        const k = pickK(), P = RL_PROPS[k];
        put(i, k, side * (rw[i] + .3 + P.wr / 2 + (k.startsWith('tower') ? .5 + r() * 2.5 : r() * 1.6)));
      }
    }
    if (pl.id == 'city' && i % 14 == 0) put(i, 'lamp', (i % 28 ? 1 : -1) * (rw[i] + .55));
  }
  put(RL_START, 'arch', 0);
  // the boost gate (used when boost gates are on): on a straight without a split, over half way round
  const plain = i => { for (let j = -6; j < 14; j++) { const k = rlMod(i + j, n); if (cv[k] !== 0 || dv[k] || fl[k] & 1) return false; } return true; };
  let gate = Math.floor(n * .55);
  while (!plain(gate) && gate < n - 70) gate++;
  if (!plain(gate)) for (gate = 60; gate < n && !plain(gate); gate++);
  const spAt = new Array(n).fill(null), padAt = new Array(n).fill(null);
  sp.forEach(([s], i) => (spAt[rlMod(s, n)] = spAt[rlMod(s, n)] || []).push(i));
  pads.forEach(([s, x]) => { for (let j = 0; j < 6; j++) padAt[rlMod(s + j, n)] = x; });
  return (RL_BUILT[id] = { id, pl, n, L, cv: Float32Array.from(cv), hy: Float32Array.from(hy), rw, fl: Uint8Array.from(fl), dv, sfAt, pr, sp, pads,
    spAt, padAt, gate, ob, obAt: rlAt(n, ob), mv, mvAt: rlAt(n, mv), pk, pkAt: rlAt(n, pk), forks });
}
// the surface under x on a segment: '' road, 'p' puddle, 's' sand, 'i' ice
function rlSurf(T, seg, x) {
  const a = T.sfAt[seg];
  if (a) for (const [x0, x1, k] of a) if (x >= x0 && x <= x1) return k;
  return '';
}
// where something rolling or walking across is at race time t: from side to side and back
const rlMvX = (m, t) => {
  const u = rlMod(t * m.sp / (2 * m.a) + m.ph, 2);
  return m.a * (u < 1 ? 2 * u - 1 : 3 - 2 * u);
};
// shape numbers of a track (tests, docs): length, mean and largest bend, share of straight and of tight road, bend direction
// changes, the hill range, tunnels, bridges, splits and hazards
function rlShape(id) {
  const T = rlTrack(id), n = T.n;
  let abs = 0, mx = 0, str = 0, tight = 0, flips = 0, last = 0, hmax = 0, hmin = 0, tun = 0, bri = 0, nar = 0;
  for (let i = 0; i < n; i++) {
    const c = T.cv[i], s = Math.abs(c) > .5 ? Math.sign(c) : 0;
    abs += Math.abs(c);
    mx = Math.max(mx, Math.abs(c));
    if (Math.abs(c) < .05) str++;
    if (Math.abs(c) >= 4) tight++;
    if (s && last && s != last) flips++;
    if (s) last = s;
    hmax = Math.max(hmax, T.hy[i]);
    hmin = Math.min(hmin, T.hy[i]);
    if (T.fl[i] & 1) tun++;
    if (T.fl[i] & 2) bri++;
    if (T.rw[i] < .9) nar++;
  }
  const sf = { p: 0, s: 0, i: 0 };
  for (const a of T.sfAt) if (a) for (const q of a) sf[q[2]]++;
  return { n, laps: RL_TRK[id].laps, mean: abs / n, max: mx, straight: str / n, tight: tight / n, flips, hill: (hmax - hmin) / RL_SEG,
    tunnel: tun, bridge: bri, narrow: nar, forks: T.forks.length, cones: T.ob.length, movers: T.mv.length, puddle: sf.p, sand: sf.s, ice: sf.i };
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
   ['lap', n], ['pass', rival], ['bump'], ['wall'], ['crash', why], ['pop'], ['dizzy', rival], ['get', 'star' | 'shield'],
   ['surf', kind], ['gate', right, answer], ['best', ms] (a new best lap in a time trial), ['finish']. */
// rivals: base speeds (share of RL_VMAX, shuffled each race) and the catch-up: ka eases a rival that is ahead (per second of
// lead), kb hurries one that is behind, lo and hi are the limits; miss: the chance a rival does not steer round a hazard;
// tier: how much faster per cup. Tuned with test bots (tools/test.js "Star Rally 2 G-02b").
const RL_CU = {
  easy: { base: [.73, .75, .77, .79, .82], ka: .2, kb: .07, lo: .56, hi: 1.12, miss: .4, tier: .015 },
  pro: { base: [.9, .92, .94, .96, .98], ka: .06, kb: .03, lo: .9, hi: 1.05, miss: .2, tier: .02 },
};
// o: {seed, mode, quiz, grade, tier (0-3; default the track's cup), wx (weather; default by seed), up (upgrades), trial (no
// rivals, laps timed), ghost ({ms, g} of the best lap to race against)}
function rlNew(tid, o = {}) {
  const T = rlTrack(tid), t = RL_TRK[tid], rnd = rlRng(o.seed || 1), mode = o.mode == 'pro' ? 'pro' : 'easy', pl = T.pl;
  const lane = k => (k % 2 ? .45 : -.45), row = k => (RL_START - 3 - Math.floor(k / 2) * 3.2) * RL_SEG;
  const CU = RL_CU[mode], tier = o.tier != null ? rlNum(o.tier, 0, 3) : t.cup || 0, base = CU.base.map(b => b * (1 + tier * CU.tier));
  for (let i = base.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [base[i], base[j]] = [base[j], base[i]]; }
  const wx = RL_WX[o.wx] ? o.wx : rnd() < .4 && pl.wx.length > 1 ? pl.wx[1 + Math.floor(rnd() * (pl.wx.length - 1))] : pl.wx[0];
  const slots = [0, 1, 2, 3, 5];
  const cars = o.trial ? [] : RL_RIVALS.map((rv, i) => ({ rv, d: row(slots[i]), x: lane(slots[i]), lx: lane(slots[i]) * .9, tx: lane(slots[i]), v: 0,
    base: base[i], wob: 0, wobT: rnd() * 3, fin: 0, e: (rnd() - .5) * .05, spin: 0, dizzy: 0, miss: {}, fs: 0, hits: 0 }));
  const up = {};
  for (const [k] of RL_UPG) up[k] = rlNum((o.up || {})[k], 0, 3);
  const st = { tid, T, laps: t.laps, mode, quiz: !!o.quiz && !o.trial, grade: o.grade, rnd, cd: 3, rt: 0, done: false, ev: [], cars, tier, wx, W: RL_WX[wx], up,
    trial: !!o.trial, fin: RL_START * RL_SEG + t.laps * T.L, taken: new Int16Array(T.sp.length), pkT: new Int16Array(T.pk.length),
    kn: new Float32Array(T.ob.length).fill(-9), knL: new Int16Array(T.ob.length), knS: new Int8Array(T.ob.length), padKey: -1, seen: {},
    P: { d: row(o.trial ? 1 : 4), x: o.trial ? 0 : lane(4), v: 0, s: 0, vx: 0, dh: 0, dsp: 0, drifting: false, boost: 0, bumpT: 0, spin: 0, spinD: 0,
      dizzy: 0, shield: 0, hits: 0, lap: 1, place: o.trial ? 1 : 6, spk: 0, time: 0, off: false, surf: '', lap0: 0, laps: [] } };
  if (st.trial) {
    st.rec = { cur: '', n: 0, d0: 0, best: null };
    st.gh = rlGhostIn(o.ghost);
  }
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
// the ghost: a lap as two letters every 0.1 s (distance moved in steps of 20 units, carried exactly; x in 64 steps)
const RL_G64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const RL_GQ = 20;
function rlGhostIn(g) {
  if (!g || typeof g.g != 'string' || !g.g.length) return null;
  const d = [0], x = [];
  for (let i = 0; i < g.g.length; i += 2) {
    const a = RL_G64.indexOf(g.g[i]), b = RL_G64.indexOf(g.g[i + 1]);
    if (a < 0 || b < 0) return null;
    d.push(d[d.length - 1] + a * RL_GQ);
    x.push(b / 63 * 3.2 - 1.6);
  }
  x.push(x[x.length - 1] || 0);
  return { ms: g.ms, d, x };
}
// where the ghost is, tau seconds into a lap: {d (from the lap's start), x} or null after its lap
function rlGhostAt(gh, tau) {
  if (!gh || tau < 0) return null;
  const f = tau * 10, i = Math.floor(f);
  if (i + 1 >= gh.d.length) return null;
  const u = f - i;
  return { d: gh.d[i] + (gh.d[i + 1] - gh.d[i]) * u, x: gh.x[i] + (gh.x[i + 1] - gh.x[i]) * u };
}
// a spin (crash) or, with the shield up, a pop. why: 'wall', 'cone', 'roll', 'crit', 'bonk'; sev 0-1 (Pro: harder = longer)
function rlCrash(st, car, why, sev = 0) {
  const me = car === st.P, easy = st.mode == 'easy';
  if (car.spin > 0) return;
  if (me && car.shield > 0) {
    car.shield = 0;
    car.v *= .88;
    st.ev.push(['pop']);
    return;
  }
  const bonk = why == 'bonk';
  let dur = easy ? (bonk ? .5 : .75) : (bonk ? .65 : .95 + .6 * Math.min(1, sev));
  if (me) dur *= 1 - .15 * st.up.bumper;
  car.spin = car.spinD = dur;
  car.v *= easy ? .6 : bonk ? .55 : .42;
  car.hits = (car.hits || 0) + 1;
  if (me) {
    car.boost = 0;
    car.drifting = false;
    car.dh = car.dsp = 0;
    car.vx *= .2;
    st.ev.push(['crash', why]);
  } else st.ev.push(['dizzy', car.rv, why]);
}
// hit a rail, wall or the split's divider: a bounce, or a spin when it was hard (sideways speed into it)
function rlWall(st, car, side, at, vin) {
  const easy = st.mode == 'easy', sp = car.v / RL_VMAX;
  car.x = at;
  const hard = vin > (easy ? 1.2 : 1.0) && sp > .45;
  if (car === st.P) {
    car.vx = -side * Math.min(.7, .3 + vin * .25);
    if (hard) rlCrash(st, car, 'wall', (vin - 1) / 1.2);
    else {
      car.v *= 1 - Math.min(.12, vin * .06);
      if (car.bumpT <= 0) {
        car.bumpT = .5;
        st.ev.push(['wall']);
      }
    }
  } else if (hard) rlCrash(st, car, 'wall', 0);
}
// did a car at x hit a cone, a rolling thing or an animal while moving from d0 to d1? (the Easy hit box is a little smaller)
function rlHits(st, car, d0, d1) {
  const T = st.T, L = T.L, k = st.mode == 'easy' ? .78 : 1, me = car === st.P;
  const s0 = Math.floor(d0 / RL_SEG), s1 = Math.floor(d1 / RL_SEG);
  for (let s = s0; s <= s1; s++) {
    const seg = rlMod(s, T.n), oa = T.obAt[seg], ma = T.mvAt[seg];
    if (oa) for (const i of oa) {
      const o = T.ob[i], z = (Math.floor(s / T.n) * T.n + seg) * RL_SEG + RL_SEG / 2;
      if (z <= d0 || z > d1) continue;
      const lap = Math.floor(z / L) + 1;
      if (st.knL[i] == lap) continue;
      if (Math.abs(car.x - o.x) < (RL_CARW * .5 + o.w) * k) {
        st.knL[i] = lap;
        st.kn[i] = st.rt;
        st.knS[i] = car.x < o.x ? 1 : -1;
        rlCrash(st, car, 'cone', .3);
      }
    }
    if (ma) for (const i of ma) {
      const m = T.mv[i], z = (Math.floor(s / T.n) * T.n + seg) * RL_SEG + RL_SEG / 2;
      if (z <= d0 || z > d1) continue;
      if (Math.abs(car.x - rlMvX(m, st.rt)) < (RL_CARW * .5 + m.w) * k) rlCrash(st, car, m.k == 'duck' || m.k == 'crab' || m.k == 'chick' ? 'crit' : 'roll', .6);
    }
    if (me && T.pkAt[seg]) for (const i of T.pkAt[seg]) {
      const p = T.pk[i], z = (Math.floor(s / T.n) * T.n + seg) * RL_SEG + RL_SEG / 2;
      if (z <= d0 || z > d1) continue;
      const lap = Math.floor(z / L) + 1;
      if (st.pkT[i] == lap || Math.abs(car.x - p.x) > .3) continue;
      st.pkT[i] = lap;
      if (p.k == 'star') car.boost = Math.max(car.boost, 1.6 * (1 + .15 * st.up.turbo));
      else car.shield = 14;
      st.ev.push(['get', p.k]);
    }
  }
}
// a rival looks ahead for hazards in its lane and moves over (unless it misses this one: the same small chance for all)
function rlLook(st, c) {
  const T = st.T, n = T.n, s0 = Math.floor(c.d / RL_SEG), CU = RL_CU[st.mode];
  for (let j = 2; j < 15; j++) {
    const seg = rlMod(s0 + j, n), xs = [];
    if (T.obAt[seg]) for (const i of T.obAt[seg]) if (st.knL[i] != Math.floor((s0 + j) * RL_SEG / T.L) + 1) xs.push([T.ob[i].x, 'o' + i]);
    if (T.mvAt[seg]) for (const i of T.mvAt[seg]) xs.push([rlMvX(T.mv[i], st.rt + j * RL_SEG / Math.max(2000, c.v)), 'm' + i]);
    if (T.sfAt[seg]) for (const [x0, x1, k] of T.sfAt[seg]) if (x1 - x0 < 1.2) xs.push([(x0 + x1) / 2, 's' + seg + k]);
    for (const [x, key] of xs) {
      if (Math.abs(x - c.tx) > .34) continue;
      if (c.miss[key] == null) c.miss[key] = st.rnd() < CU.miss;
      if (c.miss[key]) continue;
      const w = Math.max(.6, T.rw[seg]), alt = [-.5, 0, .5].map(v => v * w).filter(v => Math.abs(v - x) > .38);
      if (alt.length) c.tx = alt.reduce((b, v) => (Math.abs(v - c.x) < Math.abs(b - c.x) ? v : b));
      return;
    }
  }
}
function rlStep(st, inp = {}) {
  const dt = RL_DT, P = st.P, T = st.T, L = T.L, easy = st.mode == 'easy', U = st.up, n = T.n;
  if (st.done) return;
  if (st.cd > 0) {
    st.cd -= dt;
    if (st.cd <= 0) st.ev.push(['go']);
    return;
  }
  st.rt += dt;
  const seg = rlMod(Math.floor(P.d / RL_SEG), n), cur = T.cv[seg], sp = P.v / RL_VMAX, rw = T.rw[seg];
  let steer = Math.max(-1, Math.min(1, +inp.steer || 0));
  if (P.spin > 0) steer = 0;
  // the surface: puddles slip and slow, sand slows, ice slides; rain or snow makes it a little worse; grippy tyres help
  const sf = rlSurf(T, seg, P.x);
  let grip = 1, cap = 9;
  if (sf == 'p') { grip = st.W.fall == 'rain' ? .22 : .35; cap = easy ? .68 : .72; }
  else if (sf == 's') { grip = .7; cap = easy ? .55 : .5; }
  else if (sf == 'i') grip = .1;
  grip *= st.W.grip || 1;
  grip += (1 - grip) * .2 * U.grip;
  if (sf && sf != P.surf && !st.seen[sf]) { st.seen[sf] = 1; st.ev.push(['surf', sf]); }
  P.surf = sf;
  // speed: Easy keeps its speed by itself; Pro has Go; the grass slows you; pads, stars and drifts zoom; a spin slows
  let tgt = easy ? RL_CRUISE : inp.go ? 1 : .8;
  P.off = Math.abs(P.x) > rw + .02;
  if (P.off) tgt = Math.min(tgt, easy ? .62 : .5);
  tgt = Math.min(tgt, cap);
  if (P.boost > 0) {
    P.boost -= dt;
    tgt = 1.18 + .03 * U.turbo;
  }
  if (P.spin > 0) {
    P.spin -= dt;
    tgt = easy ? .32 : .22;
    if (P.spin <= 0) P.dizzy = .9;
  } else if (P.dizzy > 0) P.dizzy -= dt;
  if (P.shield > 0) P.shield -= dt;
  if (P.bumpT > 0) P.bumpT -= dt;
  const dv = tgt * RL_VMAX - P.v;
  P.v += Math.max(-(P.off || P.spin > 0 ? 1.2 : .6) * RL_VMAX * dt, Math.min(.45 * RL_VMAX * dt, dv));
  // steering, the drift (Pro: hold a turn into a bend at speed) and the push of a bend
  let turn = 1.7;
  if (!easy && P.spin <= 0) {
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
        P.boost = Math.min(1.4, .45 + P.dsp * .45) * (1 + .15 * U.turbo);
        st.ev.push(['zoom']);
      }
      P.drifting = false;
      P.dh = 0;
      P.dsp = 0;
    }
    if (P.drifting) turn *= 1.5;
  }
  P.s += (steer - P.s) * Math.min(1, dt * 10); // for the car's lean on screen
  const want = steer * turn * sp - .35 * cur * sp * sp * (easy ? .3 : 1) * (1 - .08 * U.grip);
  P.vx += (want - P.vx) * Math.min(1, grip * dt * 30);
  const x0 = P.x;
  P.x += P.vx * dt;
  if (easy && !steer && P.spin <= 0 && Math.abs(P.x) > .7 * rw) P.x -= Math.sign(P.x) * .6 * dt; // the steering helper
  // rails, walls and the split's divider; off the road, hedges stop you at last
  const bar = T.fl[seg] & 4 ? rw + .1 - RL_CARW / 2 : 0, vin = Math.abs(P.x - x0) / dt;
  if (bar && Math.abs(P.x) > bar) rlWall(st, P, Math.sign(P.x), Math.sign(P.x) * bar, vin);
  else if (Math.abs(P.x) > rw + .5) {
    P.x = Math.sign(P.x) * (rw + .5);
    P.v *= 1 - 1.5 * dt;
  }
  const band = .12 + RL_CARW / 2;
  if (T.dv[seg] && Math.abs(P.x) < band) {
    const side = Math.sign(x0) || 1;
    if (!T.dv[rlMod(seg - 1, n)] || Math.abs(x0) < band) rlCrash(st, P, 'wall', .8), P.x = side * band;
    else rlWall(st, P, -side, side * band, vin);
  }
  // Easy: before a split, the helper eases the car off the divider's nose
  if (easy && !steer && Math.abs(P.x) < band + .1) for (let j = 1; j < 10; j++) if (T.dv[rlMod(seg + j, n)]) { P.x += (Math.sign(P.x) || 1) * .5 * dt; break; }
  const d0 = P.d;
  P.d += P.v * dt;
  rlHits(st, P, d0, P.d);
  // sparkles (each one once a lap), boost pads, the gate
  const s0 = Math.floor(d0 / RL_SEG), s1 = Math.floor(P.d / RL_SEG);
  for (let s = s0; s <= s1; s++) {
    const a = T.spAt[rlMod(s, n)];
    if (a) for (const i of a) {
      const [ss, x] = T.sp[i], at = rlCross(L, d0, P.d, rlMod(ss, n) * RL_SEG + RL_SEG / 2);
      if (at < 0) continue;
      const id = Math.floor(at / L) + 1;
      if (st.taken[i] != id && Math.abs(P.x - x) < .26) {
        st.taken[i] = id;
        P.spk++;
        st.ev.push(['spark', P.spk]);
      }
    }
  }
  const px = T.padAt[seg];
  if (px != null && Math.abs(P.x - px) < .3 && P.spin <= 0) {
    const key = Math.floor(P.d / L) * 1000 + T.pads.findIndex(p => rlMod(seg - p[0], n) < 6);
    if (key != st.padKey) {
      st.padKey = key;
      P.boost = Math.max(P.boost, 1.1 * (1 + .15 * U.turbo));
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
  // the rivals: gentle catch-up, a pace style, a wobble now and then, lanes, hazards, spins
  const last = P.d > st.fin - L * .35, CU = RL_CU[st.mode], span = st.fin - RL_START * RL_SEG;
  for (const c of st.cars) {
    const cs = rlMod(Math.floor(c.d / RL_SEG), n), crw = T.rw[cs], gap = (c.d - P.d) / (RL_VMAX * .8);
    let f = Math.max(CU.lo, Math.min(CU.hi, 1 - (gap > 0 ? CU.ka : CU.kb) * gap));
    if (easy && last && gap > 0 && gap < 2.5) f *= .97;
    if ((c.wobT -= dt) <= 0) {
      c.wobT = 2 + st.rnd() * 3;
      c.wob = (st.rnd() - .5) * .06;
    }
    const cc = Math.abs(T.cv[cs]), prog = (c.d - RL_START * RL_SEG) / span, csf = rlSurf(T, cs, c.x);
    let ct = c.base * f * (1 + c.wob) * (1 + (prog < .5 ? c.e : -c.e)) * (1 - Math.max(0, cc - 3) * .03) * RL_VMAX;
    if (csf) ct *= csf == 's' ? .75 : .9;
    if (c.spin > 0) {
      c.spin -= dt;
      ct = .28 * RL_VMAX;
    } else {
      // keep a lane: move over for hazards and for someone just ahead, otherwise drift back to the own lane
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
      rlLook(st, c);
      // at a split each rival picks a side when it gets there (seeded) and keeps to it
      let fk = 0;
      for (let j = 0; j < 12 && !fk; j++) if (T.dv[rlMod(cs + j, n)]) fk = 1;
      if (fk) {
        if (!c.fs) c.fs = st.rnd() < .5 ? -1 : 1;
        c.tx = c.fs * Math.max(.45, Math.min(Math.abs(c.tx), crw - .3));
      } else c.fs = 0;
      c.tx = Math.max(-(crw - .25), Math.min(crw - .25, c.tx));
      c.x += Math.max(-.9 * dt, Math.min(.9 * dt, c.tx - c.x));
    }
    c.v += Math.max(-.6 * RL_VMAX * dt, Math.min(.42 * RL_VMAX * dt, ct - c.v));
    const cd0 = c.d;
    c.d += c.v * dt;
    if (c.spin <= 0) rlHits(st, c, cd0, c.d);
    if (c.dizzy > 0) c.dizzy -= dt;
    if (!c.fin && c.d >= st.fin) c.fin = st.rt;
    // contact with the player: running into a kart from behind (fast) gives the one behind a dizzy bounce; otherwise a nudge
    const dd = c.d - P.d;
    if (Math.abs(dd) < RL_SEG * .8 && Math.abs(c.x - P.x) < RL_CARW * .95) {
      const side = Math.sign(P.x - c.x) || (P.x < 0 ? -1 : 1), back = dd > 0 ? P : c, front = dd > 0 ? c : P;
      if (st.rt > 3 && back.v - front.v > .2 * RL_VMAX && Math.abs(dd) > RL_SEG * .3 && back.spin <= 0) {
        rlCrash(st, back, 'bonk');
        back.v = Math.min(back.v, front.v * .7);
      }
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
  // laps (a time trial times each lap and records it for the ghost), places, the finish
  if (st.trial) rlRec(st);
  const lap = rlLap(st, P.d);
  if (lap != P.lap && lap <= st.laps + 1) {
    const over = (P.d - (RL_START * RL_SEG + (lap - 1) * L)) / Math.max(1, P.v), lt = st.rt - over - P.lap0;
    P.laps.push(lt);
    P.lap0 = st.rt - over;
    if (st.trial) rlRecLap(st, lt);
    if (lap <= st.laps) {
      P.lap = lap;
      st.ev.push(['lap', lap]);
    }
  }
  if (!st.trial) {
    const pl = rlPlace(st);
    if (pl < P.place) {
      const by = st.cars.filter(c => c.d < P.d).sort((a, b) => b.d - a.d)[0];
      if (by) st.ev.push(['pass', by.rv]);
    }
    P.place = pl;
  }
  if (P.d >= st.fin) {
    st.done = true;
    P.time = st.rt - (P.d - st.fin) / Math.max(1, P.v);
    P.place = st.trial ? 1 : 1 + st.cars.filter(c => c.fin && c.fin <= P.time).length;
    st.ev.push(['finish']);
  }
}
// time trial: a sample every 6 steps (0.1 s) of the lap; the best lap is kept as the next ghost
function rlRec(st) {
  const R = st.rec, P = st.P;
  if (++R.n % 6) return;
  const lapD = P.d - (RL_START * RL_SEG + (P.lap - 1) * st.T.L), q = Math.max(0, Math.min(63, Math.round((lapD - R.d0) / RL_GQ)));
  R.d0 += q * RL_GQ; // the ghost's distance is exactly the sum of what is written, so the next sample makes up any rounding
  R.cur += RL_G64[q] + RL_G64[Math.max(0, Math.min(63, Math.round((P.x + 1.6) / 3.2 * 63)))];
}
function rlRecLap(st, lt) {
  const R = st.rec, ms = Math.round(lt * 1000);
  if (R.cur.length && R.cur.length <= 2400 && (!R.best || ms < R.best.ms)) {
    R.best = { ms, g: R.cur };
    st.ev.push(['best', ms]);
  }
  R.cur = '';
  R.d0 = 0;
  R.n = 0;
}
// stars for a finish: 1 for finishing, 1 more for the top 3, 1 more for winning
const rlStarsFor = place => 1 + (place <= 3 ? 1 : 0) + (place == 1 ? 1 : 0);
// sparkles a race pays: the ones collected, plus a little for the place
const rlPay = (spk, place) => spk + [0, 10, 7, 5, 3, 3, 3][place || 6];
// the finishing order of a race: who finished before the player, the player, then the others by how far they got
const rlOrder = st => st.cars.filter(c => c.fin && c.fin <= st.P.time).sort((a, b) => a.fin - b.fin).map(c => c.rv.id).concat(['you'],
  st.cars.filter(c => !(c.fin && c.fin <= st.P.time)).sort((a, b) => b.d - a.d).map(c => c.rv.id));
// cup standings: points added for a race's order; the table sorted by points (ties: the better place in the last race)
function rlCupAdd(pts, order) {
  order.forEach((w, i) => { pts[w] = (pts[w] || 0) + (RL_PTS[i] || 0); });
  return pts;
}
const rlCupTable = (pts, order) => Object.keys(pts).sort((a, b) => pts[b] - pts[a] || order.indexOf(a) - order.indexOf(b));

/* ---- drawing the race on a canvas ----
   Colours come from the tokens (--ill-* for the --a-* roles, --sc-* for skies), read once. Sprites are the SVG drawings above,
   turned into canvases once (async; drawn as soon as they are ready), each with half-size copies down to 16 px so that small far
   things are drawn from a copy near their size (no shimmer). Each frame: the sky (one gradient), two parallax layers, the ground,
   the road as one path per colour (grass stripe, water, rumble, road, patches, lane marks, start line, pads); stripes too thin to
   draw (under 2 px, near the horizon) are not drawn; then, far to near, tunnel walls, rails, the split's divider, roadside things,
   sparkles, hazards, pick-ups and every car (the player's too) in the order of their distance, clipped behind hills.
   G-02b fixed the flashing cars: a car was placed with its distance from the camera but drawn between the road edges of the
   wrong segment (the camera's part-segment was not added), so it jumped by up to a segment every time the camera passed a
   segment line, and cars next to the player were drawn in front of or behind it by segment, not by distance. */
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
// an SVG drawing as a canvas of pxw pixels wide (cached by key; .c is set once the image has loaded; .m: c and its half-size copies)
const RL_SPR = {};
function rlSprite(key, vw, vh, inner, pxw) {
  const k = key + '@' + Math.round(pxw);
  if (RL_SPR[k]) return RL_SPR[k];
  const w = Math.max(2, Math.round(pxw)), h = Math.max(2, Math.round(pxw * vh / vw)), s = (RL_SPR[k] = { c: null, m: [], w, h, ar: vh / vw });
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    c.getContext('2d').drawImage(img, 0, 0, w, h);
    const m = [c];
    for (let p = c; p.width > 32;) {
      const q = document.createElement('canvas');
      q.width = Math.ceil(p.width / 2);
      q.height = Math.max(1, Math.ceil(p.height / 2));
      q.getContext('2d').drawImage(p, 0, 0, q.width, q.height);
      m.push((p = q));
    }
    s.m = m;
    s.c = c;
  };
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${vh}" ` +
    `width="${w}" height="${h}">${rlRes(inner)}</svg>`);
  return s;
}
// the copy of a sprite to draw at w pixels: the smallest that is still at least w wide
const rlMip = (s, w) => {
  let i = 0;
  while (i + 1 < s.m.length && s.m[i + 1].width >= w) i++;
  return s.m[i];
};
const rlCalm = () => !!S.calm || (typeof matchMedia == 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches);
// sizes and the cached pictures for this screen size
function rlSize(R) {
  const cv = R.cv, cw = Math.max(1, cv.clientWidth), ch = Math.max(1, cv.clientHeight);
  // k0: the full pixel scale (sprites are made at it); k: the canvas's, lower when frames are slow (R.q, see rlRace's loop)
  const k0 = Math.min(Math.min(1.5, devicePixelRatio || 1), Math.sqrt(1.2e6 / (cw * ch))), k = k0 * (R.q || 1), sc = k / k0;
  cv.width = Math.round(cw * k);
  cv.height = Math.round(ch * k);
  const W = cv.width, H = cv.height, port = ch > cw * 1.1, st = R.st, pl = st.T.pl, c = R.ctx;
  const hz = Math.round(H * (port ? .3 : .37)), ground = H - (port ? 136 : 12) * k, rw = W * (port ? .95 : .52);
  const V = { W, H, k, sc, port, hz, ground, rw, KX: rw * RL_PZ / RL_ROADW, KY: (ground - hz) * RL_PZ / RL_CAMH };
  const sky = !pl.night && st.W.sky ? st.W.sky : pl.sky;
  V.sky = c.createLinearGradient(0, 0, 0, hz);
  V.sky.addColorStop(0, rlCol('sc-' + sky[0]));
  V.sky.addColorStop(1, rlCol('sc-' + sky[1]));
  V.haze = c.createLinearGradient(0, hz - H * .02, 0, hz + H * .06);
  V.haze.addColorStop(0, rlCol('sc-' + sky[1]));
  V.haze.addColorStop(1, 'transparent');
  V.fog = c.createLinearGradient(0, hz - H * .1, 0, hz + H * .22);
  V.fog.addColorStop(0, rlCol('sc-' + sky[1]));
  V.fog.addColorStop(.55, rlCol('sc-' + sky[1]));
  V.fog.addColorStop(1, 'transparent');
  const B = RL_BACK[pl.id], fh = hz / sc * .66, nh = Math.max(24, hz / sc * .34);
  V.far = rlSprite('far-' + pl.id, 960, 200, B.far(), 960 * fh / 200);
  V.near = rlSprite('near-' + pl.id, 960, 120, B.near(), 960 * nh / 120);
  V.sun = rlSprite('sky-' + pl.id, 100, 100, RL_SKY[pl.id](), hz / sc * .4);
  // cars: the player's and the five rivals'; props, sparkle, arch, gate, hazards and pick-ups at a size they are often seen at
  const rs = rw / sc, cw2 = Math.min(360, RL_CARW * rs * 1.25), r = rlS();
  V.me = rlSprite(`me-${r.body}-${r.paint}-${r.stk}`, 120, 84, rlCarArt(r.body, r.paint, r.stk, 'you'), cw2);
  V.rv = {};
  for (const rv of RL_RIVALS) V.rv[rv.id] = rlSprite('rv-' + rv.id, 120, 84, rlCarArt('kart', rv.car, '', rv.id), cw2 * .8);
  V.pr = {};
  for (const k2 of new Set(pl.props.map(p => p[0]).concat(['arch', 'gate', 'sparkle', 'lamp', 'cone', 'pstar', 'bubble', pl.roll, pl.crit || 'duck']))) {
    const P = RL_PROPS[k2];
    V.pr[k2] = rlSprite('pr-' + k2, P.vb[0], P.vb[1], P.art(), Math.min(480, P.wr * rs * .55));
    V.pr[k2].wr = P.wr;
  }
  V.col = {};
  for (const [k2, v] of [['g0', pl.grass[0]], ['g1', pl.grass[1]], ['ra', pl.rumble[0]], ['rb', pl.rumble[1]], ['da', pl.road[0]],
    ['db', pl.road[1]], ['ln', pl.lane], ['w', 'w'], ['k', 'k2'], ['pa', 'o'], ['pb', 'y'], ['ink', 'k'], ['edge', pl.edge], ['spk', 'y1'],
    ['dr1', 'c1'], ['dr2', 'o1'], ['la', pl.rail[0]], ['lb', pl.rail[1]], ['wa', pl.wall[0]], ['wb', pl.wall[1]], ['wat', pl.water],
    ['sp', 'c'], ['ss', 't'], ['si', 'c1'], ['sh', 'c1'], ['shl', 'c']]) V.col[k2] = rlCol(v);
  const D = RL_DRAW + 2;
  V.e = {};
  for (const a of ['x', 'X', 'Y', 'Wd', 'R', 'clip', 'cx', 'cy', 'cw', 'cr']) V.e[a] = new Float64Array(D);
  V.e.ok = new Uint8Array(D);
  // falling rain or snow: fixed spots (moved each frame by the race clock)
  V.fall = [];
  for (let i = 0; i < 90; i++) V.fall.push([(Math.sin(i * 12.9898) * 43758.5453) % 1, (Math.sin(i * 78.233) * 12543.123) % 1].map(Math.abs));
  R.v = V;
}
// draw a layer (a cached canvas) repeated across the screen, shifted by off pixels, with its bottom at y
function rlTile(c, s, off, y, W, sc) {
  if (!s.c) return;
  const w = s.w * sc, h = s.h * sc;
  for (let x = -rlMod(off, w); x < W; x += w) c.drawImage(s.c, Math.round(x), Math.round(y - h), Math.ceil(w), Math.ceil(h));
}
// a sprite standing on the road: centre x, ground y, width w, hidden below the clip line; ang turns it round its middle
function rlStand(c, s, x, y, w, clip, alpha, ang) {
  if (!s || !s.c || w < 2 || x + w / 2 < 0 || x - w / 2 > c.canvas.width) return;
  const h = w * s.ar, top = y - h;
  if (top >= clip || y < 0) return;
  const vis = Math.min(1, (clip - top) / h), m = rlMip(s, w);
  if (alpha != null) c.globalAlpha = alpha;
  if (ang) {
    c.save();
    c.translate(x, y - h / 2);
    c.rotate(ang);
    c.drawImage(m, -w / 2, -h / 2, w, h);
    c.restore();
  } else c.drawImage(m, 0, 0, m.width, m.height * vis, x - w / 2, top, w, h * vis);
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
// an upright strip (a rail, a wall's foot) standing on the line from (x1, y1) to (x2, y2), h1 / h2 high
function rlFence(p, x1, y1, h1, x2, y2, h2) {
  p.moveTo(x1, y1);
  p.lineTo(x2, y2);
  p.lineTo(x2, y2 - h2);
  p.lineTo(x1, y1 - h1);
  p.closePath();
}
// spinning: a full turn over the spin (calm mode: a small wobble instead)
const rlSpinA = (car, t, calm) => (car.spin > 0 ? (calm ? Math.sin(t * 14) * .18 : (1 - car.spin / car.spinD) * Math.PI * 2 * (car.spinD > .8 ? 2 : 1)) : 0);
// dizzy stars going round above a car (x, top y, width w)
function rlDizzy(R, x, y, w) {
  const s = R.v.pr.pstar;
  for (let i = 0; i < 3; i++) {
    const a = R.t * 6 + i * 2.1;
    rlStand(R.ctx, s, x + Math.cos(a) * w * .32, y + Math.sin(a) * w * .06, w * .2, 1e9);
  }
}
function rlDraw(R) {
  const c = R.ctx, V = R.v, st = R.st, T = st.T, N = T.n, P = st.P, W = V.W, H = V.H, hz = V.hz, col = V.col, E = V.e, wx = st.W;
  const D = wx.fog ? 80 : RL_DRAW, calm = R.calm, t = R.t || 0;
  // a short shake after a crash (none in calm mode or with reduced motion)
  const sh = !calm && R.shake > 0 ? Math.sin(t * 70) * R.shake * 20 * V.k : 0;
  c.save();
  if (sh) c.translate(sh, sh * .3);
  c.fillStyle = V.sky;
  c.fillRect(-30, -30, W + 60, hz + 32);
  if (V.sun.c && !wx.fall && !wx.fog) c.drawImage(V.sun.c, W * .1, hz * .12, V.sun.w * V.sc, V.sun.h * V.sc);
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
    const p = 1 / ((e - frac) * RL_SEG), i = rlMod(base + e, N);
    E.X[e] = W / 2 + (E.x[e] - camX) * p * V.KX;
    E.Y[e] = hz + (camY - T.hy[i]) * p * V.KY;
    E.Wd[e] = RL_ROADW * p * V.KX;
    E.R[e] = E.Wd[e] * T.rw[i];
  }
  // the road, near to far, each colour in one path; a segment behind a hill top is skipped, one partly behind it is cut
  const pG = new Path2D(), pRa = new Path2D(), pRb = new Path2D(), pDa = new Path2D(), pDb = new Path2D(), pL = new Path2D();
  const pW = new Path2D(), pK = new Path2D(), pPa = new Path2D(), pPb = new Path2D(), pWa = new Path2D(), pDv = new Path2D();
  const pS = { p: new Path2D(), s: new Path2D(), i: new Path2D() };
  let maxy = H;
  for (let n = 1; n < D; n++) {
    E.clip[n] = maxy;
    E.ok[n] = 0;
    let x1 = E.X[n], y1 = E.Y[n], w1 = E.Wd[n], r1 = E.R[n];
    const x2 = E.X[n + 1], y2 = E.Y[n + 1], w2 = E.Wd[n + 1], r2 = E.R[n + 1];
    if (y2 >= maxy || y2 >= y1) continue;
    if (y1 > maxy) {
      const q = (maxy - y2) / (y1 - y2);
      x1 = x2 + (x1 - x2) * q;
      w1 = w2 + (w1 - w2) * q;
      r1 = r2 + (r1 - r2) * q;
      y1 = maxy;
    }
    E.ok[n] = 1;
    E.cx[n] = x1;
    E.cy[n] = y1;
    E.cw[n] = w1;
    E.cr[n] = r1;
    const i = rlMod(base + n, N), fine = y1 - y2 >= 2 * V.k, band = fine ? Math.floor(i / 3) & 1 : 0, rr1 = r1 / w1, rr2 = r2 / w2;
    if (T.fl[i] & 2) pWa.rect(0, y2, W, y1 - y2 + 1);
    else if (band) pG.rect(0, y2, W, y1 - y2 + 1);
    rlQuad(band ? pRa : pRb, x1, y1, r1, x2, y2, r2, -1 - .14 / rr1, -1);
    rlQuad(band ? pRa : pRb, x1, y1, r1, x2, y2, r2, 1, 1 + .14 / rr1);
    rlQuad(band ? pDa : pDb, x1, y1 + .5, r1, x2, y2, r2, -1, 1);
    const sf = T.sfAt[i];
    if (sf) for (const [a, b, k] of sf) rlQuad(pS[k], x1, y1, w1, x2, y2, w2, Math.max(a, -rr1 - .1), Math.min(b, rr1 + .1));
    if (fine && (i & 7) < 4 && !T.dv[i]) {
      rlQuad(pL, x1, y1, r1, x2, y2, r2, -.36, -.33);
      rlQuad(pL, x1, y1, r1, x2, y2, r2, .33, .36);
    }
    if (T.dv[i]) rlQuad(pDv, x1, y1, w1, x2, y2, w2, -.14, .14);
    if (i == RL_START || i == RL_START + 1) for (let q = 0; q < 8; q++) rlQuad((q + i) & 1 ? pW : pK, x1, y1, r1, x2, y2, r2, -1 + q / 4, -.75 + q / 4);
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
  c.fillRect(-30, Math.min(hz, maxy), W + 60, H + 30);
  const fill = (p, k, a) => {
    c.fillStyle = col[k];
    if (a) c.globalAlpha = a;
    c.fill(p);
    if (a) c.globalAlpha = 1;
  };
  fill(pG, 'g1', .55);
  fill(pWa, 'wat');
  fill(pRa, 'ra');
  fill(pRb, 'rb');
  fill(pDa, 'da');
  fill(pDb, 'db');
  fill(pS.s, 'ss', .9);
  fill(pS.p, 'sp', .7);
  fill(pS.i, 'si', .85);
  fill(pL, 'ln');
  fill(pW, 'w');
  fill(pK, 'k');
  fill(pPa, 'pa');
  fill(pPb, 'pb');
  fill(pDv, 'edge');
  c.fillStyle = V.haze;
  c.globalAlpha = .7;
  c.fillRect(-30, hz - H * .02, W + 60, H * .08);
  c.globalAlpha = 1;
  // cars, the ghost and the player by the segment they are in (u: in units of the edges above, which start frac behind)
  const at = R.at || (R.at = []);
  at.length = 0;
  const add = (it, d) => {
    const u = (d - camD) / RL_SEG + frac, n = u < 1 && u > .4 ? 1 : Math.floor(u); // just in front of the camera: drawn from the first edge
    if (n >= 1 && n < D) (at[n] = at[n] || []).push([d, it]);
  };
  for (const car of st.cars) add(car, car.d);
  add(P, P.d);
  if (st.gh && P.lap <= st.laps) {
    const g = rlGhostAt(st.gh, st.rt - P.lap0);
    if (g) {
      R.ghost = { ghost: 1, d: RL_START * RL_SEG + (P.lap - 1) * T.L + g.d, x: g.x };
      add(R.ghost, R.ghost.d);
    }
  }
  const lapOf = d => Math.floor(d / T.L) + 1;
  // rails, divider and tunnel walls are collected and filled just before the next sprite (so a nearer one covers a farther one)
  let pLa = new Path2D(), pLb = new Path2D(), pTa = new Path2D(), any = 0;
  const flush = () => {
    if (!any) return;
    fill(pLb, 'lb');
    fill(pLa, 'la');
    fill(pTa, 'la');
    pLa = new Path2D();
    pLb = new Path2D();
    pTa = new Path2D();
    any = 0;
  };
  const fogN = wx.fog ? 26 : 0;
  let meOK = 0;
  for (let n = D - 1; n >= 1; n--) {
    if (n == fogN) {
      flush();
      c.fillStyle = V.fog;
      c.globalAlpha = .85;
      c.fillRect(-30, hz - H * .1, W + 60, H * .32);
      c.globalAlpha = 1;
    }
    const i = rlMod(base + n, N), X = E.X[n], Y = E.Y[n], Wd = E.Wd[n], clip = E.clip[n], fl = T.fl[i];
    if (E.ok[n]) {
      const x1 = E.cx[n], y1 = E.cy[n], w1 = E.cw[n], r1 = E.cr[n], x2 = E.X[n + 1], y2 = E.Y[n + 1], w2 = E.Wd[n + 1], r2 = E.R[n + 1];
      const fine = y1 - y2 >= 2 * V.k, band = fine ? Math.floor(i / 3) & 1 : 0;
      if (fl & 1) {
        // a tunnel slice: everything round its far opening (and its piece of road) is wall
        flush();
        const a1 = r1 + .1 * w1, a2 = r2 + .1 * w2, t1 = w1 * 1.25, t2 = w2 * 1.25, p = new Path2D();
        p.rect(x1 - a1 - 2.2 * w1, y1 - t1 - .9 * w1, 2 * a1 + 4.4 * w1, t1 + .9 * w1);
        p.moveTo(x1 - a1, y1);
        p.lineTo(x2 - a2, y2);
        p.lineTo(x2 - a2, y2 - t2);
        p.lineTo(x2 + a2, y2 - t2);
        p.lineTo(x2 + a2, y2);
        p.lineTo(x1 + a1, y1);
        p.closePath();
        c.fillStyle = band ? col.wb : col.wa;
        c.fill(p, 'evenodd');
      } else if (fl & 4) {
        // rails or walls on both sides, striped in the place's two colours
        const pp = band ? pLb : pLa, a1 = r1 + .1 * w1, a2 = r2 + .1 * w2, h1 = w1 * .16, h2 = w2 * .16;
        rlFence(pp, x1 - a1, y1, h1, x2 - a2, y2, h2);
        rlFence(pp, x1 + a1, y1, h1, x2 + a2, y2, h2);
        any = 1;
      }
      if (T.dv[i]) {
        // the split's divider: a low striped wall with a top
        const h1 = w1 * .14, h2 = w2 * .14;
        rlFence(band ? pLb : pLa, x1 - .14 * w1, y1, h1, x2 - .14 * w2, y2, h2);
        rlFence(band ? pLb : pLa, x1 + .14 * w1, y1, h1, x2 + .14 * w2, y2, h2);
        rlQuad(pTa, x1, y1 - h1, w1, x2, y2 - h2, w2, -.14, .14);
        if (!T.dv[rlMod(i - 1, N)]) rlFence(pLb, x1 - .14 * w1, y1, h1, x1 + .14 * w1, y1, h1);
        any = 1;
      }
    }
    if (E.Y[n] < 0 && E.Y[n + 1] < 0) continue;
    const pr = T.pr[i], sp = T.spAt[i], ob = T.obAt[i], mv = T.mvAt[i], pk = T.pkAt[i], cs = at[n];
    if (!(pr || sp || ob || mv || pk || cs || (st.quiz && i == T.gate))) continue;
    flush();
    if (pr) {
      for (let j = 0; j < pr.length; j += 2) {
        const s = V.pr[pr[j]];
        if (s) rlStand(c, s, X + Wd * pr[j + 1], Y, s.wr * Wd, clip);
      }
    }
    if (st.quiz && i == T.gate) rlDrawGate(R, X, Y, Wd, clip);
    const zl = lapOf((base + n) * RL_SEG + RL_SEG / 2);
    if (sp) {
      for (const k of sp) {
        if (st.taken[k] == zl) continue;
        const b = 1 + .12 * Math.sin(t * 6 + k);
        rlStand(c, V.pr.sparkle, X + Wd * T.sp[k][1], Y - Wd * .06, V.pr.sparkle.wr * Wd * b, clip);
      }
    }
    if (pk) for (const k of pk) {
      if (st.pkT[k] == zl) continue;
      const p = T.pk[k], s = V.pr[p.k == 'star' ? 'pstar' : 'bubble'];
      rlStand(c, s, X + Wd * p.x, Y - Wd * (.1 + .03 * Math.sin(t * 4 + k)), s.wr * Wd, clip, null, p.k == 'star' && !calm ? Math.sin(t * 3) * .3 : 0);
    }
    if (ob) for (const k of ob) {
      const o = T.ob[k], s = V.pr[o.k];
      if (st.knL[k] == zl) {
        // knocked over: it tumbles off the road, then is gone for this lap
        const a = st.rt - st.kn[k];
        if (a < .8) rlStand(c, s, X + Wd * (o.x + st.knS[k] * a * 1.8), Y - Wd * Math.sin(a * 4) * .25, s.wr * Wd, 1e9, null, st.knS[k] * a * 9);
      } else rlStand(c, s, X + Wd * o.x, Y, s.wr * Wd, clip);
    }
    if (mv) for (const k of mv) {
      const m = T.mv[k], s = V.pr[m.k], mx = rlMvX(m, st.rt), crit = m.k == 'duck' || m.k == 'crab' || m.k == 'chick';
      const hop = crit && !calm ? Math.abs(Math.sin(t * 9 + k)) * Wd * .05 : 0;
      rlStand(c, s, X + Wd * mx, Y - hop, s.wr * Wd, clip, null, crit ? 0 : mx * 3.2);
    }
    if (cs) {
      cs.sort((a, b) => b[0] - a[0]);
      for (const [d, car] of cs) {
        if (car === P) { rlDrawMe(R); meOK = 1; continue; }
        const f = (d - camD) / RL_SEG + frac - n, cx = X + (E.X[n + 1] - X) * f, cy = Y + (E.Y[n + 1] - Y) * f, cw = Wd + (E.Wd[n + 1] - Wd) * f;
        if (car.ghost) { rlStand(c, V.me, cx + cw * car.x, cy, RL_CARW * cw, clip, .45); continue; }
        const s = V.rv[car.rv.id], w = RL_CARW * cw;
        rlStand(c, s, cx + cw * car.x, cy, w, clip, null, rlSpinA(car, t, calm));
        if ((car.spin > 0 || car.dizzy > 0) && cy - w * s.ar < clip) rlDizzy(R, cx + cw * car.x, cy - w * s.ar * 1.05, w);
      }
    }
  }
  flush();
  if (!meOK) rlDrawMe(R);
  // rain or snow falling
  if (wx.fall) {
    const p = new Path2D(), nf = calm ? 40 : 90, rain = wx.fall == 'rain', k = V.k;
    for (let j = 0; j < nf; j++) {
      const [a, b] = V.fall[j], fx = rlMod(a * W + (rain ? -.08 : .03 * Math.sin(t + j)) * W * t, W), fy = rlMod(b * H + t * H * (rain ? 1.4 + a * .5 : .16 + a * .1), H);
      if (rain) { p.moveTo(fx, fy); p.lineTo(fx - 5 * k, fy + 20 * k); }
      else { p.moveTo(fx + (2 + a * 2.5) * k, fy); p.arc(fx, fy, (2 + a * 2.5) * k, 0, Math.PI * 2); }
    }
    if (rain) {
      c.strokeStyle = col.w;
      c.globalAlpha = .5;
      c.lineWidth = 2 * k;
      c.stroke(p);
    } else {
      c.fillStyle = col.w;
      c.globalAlpha = .9;
      c.fill(p);
    }
    c.globalAlpha = 1;
  }
  c.restore();
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
// the player's car: centred near the bottom, leaning into turns, shaking a little on the grass, spinning after a crash;
// drift sparks, the shield bubble, dizzy stars and speed lines
function rlDrawMe(R) {
  const c = R.ctx, V = R.v, P = R.st.P, s = V.me, w = RL_CARW * V.rw, t = R.t || 0, calm = R.calm;
  if (!s.c) return;
  const h = w * s.ar, bob = P.off && !calm ? Math.sin(t * 40) * 2 * V.k : Math.sin(t * 9) * .6 * V.k;
  const ang = P.s * .05 + (P.drifting ? Math.sign(P.s) * .12 : 0) + rlSpinA(P, t, calm), x = V.W / 2 + P.s * w * .06, y = V.ground + bob;
  c.save();
  c.translate(x, y - h / 2);
  c.rotate(ang);
  c.drawImage(s.c, -w / 2, -h / 2, w, h);
  c.restore();
  if (P.shield > 0) {
    const p = new Path2D(), a = P.shield < 2 && !calm ? .35 + .25 * Math.sin(t * 12) : .55;
    p.ellipse(x, y - h * .5, w * .66, h * .78, 0, 0, Math.PI * 2);
    c.globalAlpha = a * .35;
    c.fillStyle = V.col.sh;
    c.fill(p);
    c.globalAlpha = a;
    c.strokeStyle = V.col.shl;
    c.lineWidth = 4 * V.k;
    c.stroke(p);
    c.globalAlpha = 1;
  }
  if (P.spin > 0 || P.dizzy > 0) rlDizzy(R, x, y - h * 1.05, w);
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

/* ---- the screens: menu (next goal, cups, single races and time trials, how to drive), garage, the race, the end cards ---- */
let RL = null; // the race on screen
const rlPic = (inner, cls = '') => `<svg class="art${cls ? ' ' + cls : ''}" viewBox="0 0 240 100" preserveAspectRatio="xMidYMid slice" ` +
  `aria-hidden="true" focusable="false">${inner}</svg>`;
const rlCarSVG = (body, h, st, cls = '') => `<svg class="art${cls ? ' ' + cls : ''}" viewBox="0 0 120 84" aria-hidden="true" focusable="false">` +
  `${rlCarArt(body, h, st, 'you')}</svg>`;
const rlCupSVG = (h, cls = '') => `<svg class="art${cls ? ' ' + cls : ''}" viewBox="0 0 100 100" aria-hidden="true" focusable="false">${rlCupArt(h)}</svg>`;
const rlSpkChip = (n, id = 'rlspk') => `<span class="stat rl-spk" id="${id}" aria-label="Sparkles">${ico('sparkle', 32)}<b>${n}</b></span>`;
const rlSnd = () => !!S.sound;
const rlTone = (...a) => { if (rlSnd()) tone(...a); };
const rlTiltOK = () => typeof window != 'undefined' && 'DeviceOrientationEvent' in window && (navigator.maxTouchPoints || 0) > 0;
const rlTrophyHue = b => ['', 'y', 'e', 'o'][b] || '';
const rlWho = id => (id == 'you' ? (S.name || 'You') : (RL_RIVALS.find(v => v.id === id) || {}).name || id);
// the one next goal on the menu
function rlGoal(r) {
  if (r.cup) {
    const c = RL_CUPS.find(x => x.id === r.cup.id);
    return `Finish the ${c.name}: race ${r.cup.i + 1} of 3 is next.`;
  }
  const open = RL_CUPS.map((c, i) => rlCupOpen(i, r)), k = open.lastIndexOf(true), b = rlNum(rlCupRec(r, RL_CUPS[k].id).best, 0, 4);
  if (k < RL_CUPS.length - 1 && !(b >= 1 && b <= 3)) return `Win a trophy in the ${RL_CUPS[k].name} to open the ${RL_CUPS[k + 1].name}.`;
  const g = RL_CUPS.findIndex((c, i) => open[i] && rlNum(rlCupRec(r, c.id).best, 0, 4) != 1);
  if (g >= 0) return `Win the gold trophy in the ${RL_CUPS[g].name}.`;
  const up = RL_UPG.map(u => [u, rlUpNext(u[0], r)]).find(([, nx]) => nx && rlTrophies(r) >= nx.need);
  if (up) return r.spk >= up[1].cost ? `Get ${up[0][1]} level ${up[1].lv} in the garage.` : `Collect ${up[1].cost - r.spk} more sparkles for ${up[0][1]} level ${up[1].lv}.`;
  const tt = RL_ORDER.find(id => !r.ghost[id]);
  if (tt) return `Race a time trial on ${RL_TRK[tt].name} to make your ghost.`;
  const id = RL_ORDER[r.races % RL_ORDER.length];
  return `Beat your ghost on ${RL_TRK[id].name}: best lap ${rlTime(r.ghost[id].ms)}.`;
}
function rlMenu(place) {
  const r = rlS();
  if (place && RL_PLACES.some(p => p.id === place)) r.place = place;
  let pl = rlPl(r.place);
  const tracksOpen = p => RL_TRACKS[p.id].some(t => rlTrackOpen(t.id, r));
  if (!tracksOpen(pl)) pl = RL_PLACES[0];
  const stars = rlStarsAll(r), mode = rlMode(r);
  const ccard = (c, i) => {
    const open = rlCupOpen(i, r), rec = rlCupRec(r, c.id), b = rlNum(rec.best, 0, 4), run = r.cup && r.cup.id === c.id ? r.cup : null;
    const sub = !open ? `Win a trophy in the ${esc(RL_CUPS[i - 1].name)} to open` : run ? `Go on: race ${run.i + 1} of 3` :
      b >= 1 && b <= 3 ? `${RL_TROPHY[b]} trophy` : rec.runs ? 'Raced, no trophy yet' : 'Not raced yet';
    return `<button class="rl-cup${open ? '' : ' lock'}${b >= 1 && b <= 3 ? ' won' : ''}" data-cup="${i}" data-ok="${open ? 1 : 0}">` +
      `<span class="rl-cpic s-${c.hue}">${rlCupSVG(rlTrophyHue(b) || c.hue)}${open ? '' : `<span class="rl-plock">${ico('lock', 22)}</span>`}</span>` +
      `<span class="rl-ci"><b>${esc(c.name)}</b><span>${c.races.map(([t]) => esc(RL_TRK[t].name)).join(', ')}</span><span class="rl-cs">${sub}</span></span>` +
      `<span class="rl-go" aria-hidden="true">${ico(open ? 'play' : 'lock')}</span></button>`;
  };
  const pcard = p => {
    const open = tracksOpen(p), got = RL_TRACKS[p.id].reduce((a, t) => a + (r.stars[t.id] || 0), 0);
    return `<button class="rl-place${p.id === pl.id ? ' on' : ''}${open ? '' : ' lock'}" data-pl="${p.id}" aria-pressed="${p.id === pl.id}">` +
      `<span class="rl-ppic" style="--gh-a:var(--sc-${p.sky[0]});--gh-b:var(--sc-${p.sky[1]})">${rlPic(RL_ART.place(p.id))}` +
      `${open ? '' : `<span class="rl-plock">${ico('lock', 22)}</span>`}</span><span class="rl-pname">${esc(p.name)}</span>` +
      `<span class="rl-psub">${ico('star', 18)}${open ? `<b>${got}</b> of 9` : 'Opens with a cup'}</span></button>`;
  };
  const tcard = t => {
    const ok = rlTrackOpen(t.id, r), best = r.best[t.id], lap = r.lap[t.id];
    return `<div class="rl-trow"><button class="rl-trk${ok ? '' : ' lock'}" data-trk="${t.id}" data-ok="${ok ? 1 : 0}"><span class="rl-tn">${t.i + 1}</span>` +
      `<span class="rl-ti"><b>${esc(t.name)}</b><span>${ok ? (best ? 'Best time ' + rlTime(best) : t.laps + ' laps') : `Opens with the ${esc(RL_CUPS[t.cup].name)}`}</span>` +
      (ok ? UI.stars(r.stars[t.id] || 0, 3, 22) : '') + `</span><span class="rl-go" aria-hidden="true">${ico(ok ? 'play' : 'lock')}</span></button>` +
      (ok ? `<button class="rl-tt" data-tt="${t.id}" aria-label="Time trial on ${esc(t.name)}">${ico('timer', 24)}<span>${lap ? rlTime(lap) : 'Time trial'}</span></button>` : '') + '</div>';
  };
  const how = (mode == 'pro' ? [['bolt', 'Hold Go to go faster. Let go in tight bends!'],
    ['rotate', 'Hold a turn all through a bend to drift. Let go for a zoom!']] : [['arrow-right', 'Tap the big arrows, or the sides of the road, to steer.']])
    .concat([['warning', 'Rails, cones, rolling things and animals make you spin. Off the road is slow.'],
      ['star', 'Grab a boost star to zoom, or a bubble to keep you safe from one bump.'], ['play', 'Drive over the orange pads to zoom.'],
      ['trophy', 'A cup is 3 races. Points for every place, a trophy at the end.'], ['timer', 'Time trial: race your ghost, your own best lap.'],
      ['sparkle', 'Collect sparkles. Spend them on paint, stickers and upgrades.']]);
  view(`${GH.top('rally')}<div class="scroll rl-menu">
  <section class="rl-hero"><div class="rl-hcar">${rlCarSVG(r.body, r.paint, r.stk)}</div><div class="rl-hinfo">
   <p class="rl-hl">${ico('trophy', 22)}<b>${rlTrophies(r)}</b> of 4 trophies</p><p class="rl-hl">${ico('star', 22)}<b>${stars}</b> of 36 stars</p>
   <p class="rl-hl">${ico('sparkle', 22)}<b>${r.spk}</b> sparkles</p>
   ${UI.btn('Garage', { icon: 'palette', id: 'rlgar', wide: true })}</div></section>
  <p class="rl-goal" id="rlgoal"><span class="rl-hi">${ico('target', 22)}</span><span><b>Next goal:</b> ${esc(rlGoal(r))}</span></p>
  <h2 class="rl-h">Cups</h2><div class="rl-cups">${RL_CUPS.map(ccard).join('')}</div>
  <h2 class="rl-h">Single races</h2><div class="rl-places">${RL_PLACES.map(pcard).join('')}</div>
  <h3 class="rl-h3">${esc(pl.name)}</h3><div class="rl-trks">${RL_TRACKS[pl.id].map(tcard).join('')}</div>
  <h2 class="rl-h">Your rivals</h2><div class="rl-rivals">${RL_RIVALS.map(v => `<div class="rl-rv"><svg class="art" viewBox="0 0 50 54" aria-hidden="true" focusable="false">` +
    `${rlFace(v.id, 25, 30, 1.2)}</svg><b>${esc(v.name)}</b><span>${esc(v.kind)}</span></div>`).join('')}</div>
  <section class="rl-opts"><h2 class="rl-h">How to drive</h2>
   <div class="rl-mode">${UI.seg([['easy', 'Easy'], ['pro', 'Pro']], mode, { id: 'rlmode', label: 'Driving' })}
   <p>${mode == 'pro' ? 'Pro: hold Go to speed up, drift through bends; bumps cost more time and the animals race hard.' : 'Easy: the car drives by itself. You steer.'}</p></div>
   <ul class="rl-how">${how.map(([i, t]) => `<li><span class="rl-hi">${ico(i, 22)}</span><span>${esc(t)}</span></li>`).join('')}</ul>
   ${UI.sw('Boost gates: drive through the right answer to zoom', r.quiz, 'rlquiz')}
   ${rlTiltOK() ? UI.sw('Steer by tilting the tablet', r.tilt, 'rltilt') : ''}</section></div>`);
  GH.wire({ back: () => gameRoom() });
  const again = () => { const y = $('.scroll').scrollTop; rlMenu(); $('.scroll').scrollTop = y; };
  const gt = () => {
    if (ptLeft() > 0) return true;
    SFX.wrong();
    fb(ptWhyNot(), 'warn long', 3000);
    return false;
  };
  $('#rlgar').onclick = () => { SFX.whoosh(); rlGarage(); };
  $$('[data-cup]').forEach(b => b.onclick = () => {
    const i = +b.dataset.cup, c = RL_CUPS[i];
    if (!rlCupOpen(i, r)) {
      SFX.wrong();
      fb(`Win a trophy in the ${RL_CUPS[i - 1].name} to open the ${c.name}!`, 'warn long', 2800);
      return;
    }
    if (!gt()) return;
    SFX.whoosh();
    rlCupGo(i);
  });
  $$('[data-pl]').forEach(b => b.onclick = () => {
    const p = rlPl(b.dataset.pl);
    if (!tracksOpen(p)) {
      SFX.wrong();
      fb(`${p.name} opens with a cup. Race the cups to open it!`, 'warn long', 2600);
      return;
    }
    SFX.pop(2);
    r.place = p.id;
    save();
    again();
  });
  $$('[data-trk]').forEach(b => b.onclick = () => {
    const t = RL_TRK[b.dataset.trk];
    if (!rlTrackOpen(t.id, r)) {
      SFX.wrong();
      fb(`${t.name} opens with the ${RL_CUPS[t.cup].name}!`, 'warn long', 2600);
      return;
    }
    if (!gt()) return;
    SFX.whoosh();
    rlRace(t.id);
  });
  $$('[data-tt]').forEach(b => b.onclick = () => {
    if (!gt()) return;
    SFX.whoosh();
    rlRace(b.dataset.tt, { trial: true });
  });
  UI.segOn($('#rlmode'), v => { r.mode = v; save(); again(); });
  $('#rlquiz').onchange = e => { r.quiz = e.target.checked; save(); };
  if ($('#rltilt')) $('#rltilt').onchange = e => {
    r.tilt = e.target.checked;
    save();
    // some tablets ask before they share the tilt
    if (r.tilt && window.DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) DeviceOrientationEvent.requestPermission().catch(() => {});
  };
}
// start or go on with a cup: its next race
function rlCupGo(i) {
  const r = rlS(), c = RL_CUPS[i];
  if (!r.cup || r.cup.id !== c.id) {
    const pts = { you: 0 };
    for (const v of RL_RIVALS) pts[v.id] = 0;
    r.cup = { id: c.id, i: 0, pts };
    save();
  }
  rlRace(c.races[r.cup.i][0], { cup: c });
}

/* ---- the garage: try a paint, sticker or car shape on the car; buy it, or an upgrade, with sparkles (prices shown) ---- */
function rlGarage(sel) {
  const r = rlS(), stars = rlStarsAll(r), tro = rlTrophies(r);
  sel = sel || null;
  const look = { body: r.body, paint: r.paint, stk: r.stk };
  let bar = '';
  if (sel) {
    let name, cost;
    if (sel.k == 'upg') {
      const u = RL_UPG.find(x => x[0] === sel.id), nx = rlUpNext(sel.id, r);
      name = `${u[1]} level ${nx.lv}`;
      cost = nx.cost;
    } else {
      const it = (sel.k == 'paint' ? RL_PAINTS : RL_STICKERS).find(x => x[0] === sel.id);
      look[sel.k == 'paint' ? 'paint' : 'stk'] = sel.id;
      name = it[1];
      cost = it[2];
    }
    const left = r.spk - cost;
    bar = `<div class="rl-buy"><p><b>${esc(name)}</b> for ${ico('sparkle', 22)}<b>${cost}</b></p><p>${left >= 0 ? `You will have ${left} sparkles left.` :
      `You need ${-left} more sparkles. Collect them on the track!`}</p><div class="rl-bacts">` +
      UI.btn('Buy', { kind: 'primary', size: 'lg', icon: 'check', id: 'rlbuy', off: left < 0 }) + UI.btn('Not now', { icon: 'close', id: 'rlno' }) + '</div></div>';
  }
  const tile = (k, id, label, pic, own, on, price, need, needIc = 'star') => `<button class="rl-item${on ? ' on' : ''}${own ? '' : ' new'}" data-k="${k}" data-id="${id}" ` +
    `aria-pressed="${on}"><span class="rl-ipic">${pic}</span><span class="rl-iname">${esc(label)}</span><span class="rl-iprice">` +
    (on ? ico('check', 18) + 'On' : own ? 'Yours' : need != null ? ico('lock', 18) + need + ' ' + ico(needIc, 18) : ico('sparkle', 18) + price) + '</span></button>';
  const swatch = h => `<svg class="art" viewBox="0 0 40 40" aria-hidden="true" focusable="false">${ghBall(20, 20, 15, h)}</svg>`;
  const stk = id => `<svg class="art" viewBox="0 0 40 40" aria-hidden="true" focusable="false">${id ? rlStk(id, 20, 20, 15) : ghC(20, 20, 14, 'e1') +
    ghL('M13 13L27 27', 'e3', 3)}</svg>`;
  const upTile = ([id, name, what, icon, lv]) => {
    const nx = rlUpNext(id, r), have = r.upg[id];
    return `<button class="rl-item rl-up" data-k="upg" data-id="${id}"><span class="rl-ipic rl-upic">${ico(icon, 36)}</span>` +
      `<span class="rl-iname">${esc(name)}</span><span class="rl-pips" aria-label="Level ${have} of ${lv.length}">${lv.map((x, i) => `<i class="${i < have ? 'on' : ''}"></i>`).join('')}</span>` +
      `<span class="rl-iprice">${!nx ? ico('check', 18) + 'Top level' : tro < nx.need ? ico('lock', 18) + nx.need + ' ' + ico('trophy', 18) : ico('sparkle', 18) + nx.cost}</span>` +
      `<span class="rl-iwhat">${esc(what)}</span></button>`;
  };
  view(`${GH.top('rally', { sub: 'Garage', chips: rlSpkChip(r.spk) })}<div class="scroll rl-gar">
  <section class="rl-gcar" style="--gh-a:var(--sc-sky-1);--gh-b:var(--sc-sky)">${rlCarSVG(look.body, look.paint, look.stk, 'rl-big')}${bar}</section>
  <h2 class="rl-h">Upgrades</h2><div class="rl-items rl-ups">${RL_UPG.map(upTile).join('')}</div>
  <p class="rl-note">Upgrades open with trophies from the cups and make the car easier to drive.</p>
  <h2 class="rl-h">Cars</h2><div class="rl-items">${RL_BODIES.map(([id, n, need]) => tile('body', id, n, rlCarSVG(id, r.paint, ''),
    stars >= need, r.body === id, 0, stars >= need ? null : need)).join('')}</div>
  <p class="rl-note">New car shapes open with stars from racing. They all drive the same.</p>
  <h2 class="rl-h">Paint</h2><div class="rl-items">${RL_PAINTS.map(([id, n, c]) => tile('paint', id, n, swatch(id), !!r.paints[id], r.paint === id && !sel, c)).join('')}</div>
  <h2 class="rl-h">Stickers</h2><div class="rl-items">${RL_STICKERS.map(([id, n, c]) => tile('stk', id, n, stk(id), !id || !!r.stks[id], r.stk === id && !sel, c)).join('')}</div>
  </div>`);
  GH.wire({ back: () => rlMenu() });
  $$('.rl-item').forEach(b => b.onclick = () => {
    const k = b.dataset.k, id = b.dataset.id;
    if (k == 'upg') {
      const nx = rlUpNext(id, r);
      if (!nx) return SFX.pop(1), fb('That one is at the top level!', 'long', 2000);
      if (tro < nx.need) {
        SFX.wrong();
        fb(`Win ${nx.need - tro} more ${nx.need - tro == 1 ? 'trophy' : 'trophies'} in the cups to open it!`, 'warn long', 2600);
        return;
      }
      return SFX.pop(1), rlGarage({ k, id });
    }
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
      if (!(sel.k == 'upg' ? rlBuyUp(sel.id) : rlBuy(sel.k, sel.id))) {
        SFX.wrong();
        return;
      }
      if (sel.k == 'paint') r.paint = sel.id;
      else if (sel.k == 'stk') r.stk = sel.id;
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
// o: {cup (a cup being raced: its race r.cup.i), trial (a time trial against the ghost)}
function rlRace(tid, o = {}) {
  const r = rlS(), t = RL_TRK[tid], mode = rlMode(r), cup = o.cup || null, trial = !!o.trial;
  r.place = t.place;
  save();
  const btn = (id, icon, aria, txt) => `<button class="rl-btn" id="${id}" data-k="${id.slice(2)}" aria-label="${aria}">${ico(icon, 48)}` +
    `${txt ? `<span>${txt}</span>` : ''}</button>`;
  const seed = ((Date.now() & 0xffffff) ^ (r.races * 7919)) >>> 0 || 1;
  const st = rlNew(tid, { mode, quiz: r.quiz, grade: S.grade, seed, up: r.upg, trial, ghost: trial ? r.ghost[tid] : null,
    tier: cup ? cup.tier : null, wx: cup ? cup.races[r.cup.i][1] : null });
  const wxn = st.W.name, sub = (cup ? `${cup.name} ${r.cup.i + 1}/3: ` : trial ? 'Time trial: ' : '') + t.name + (wxn ? ', ' + wxn : '');
  view(`${GH.top('rally', { play: true, hud: true, sub, chips: (trial ? `<span class="stat rl-pos" id="rlpos" aria-label="Lap time">${ico('timer', 32)}<b>0:00.0</b></span>` :
    `<span class="stat rl-pos" id="rlpos" aria-label="Place">${ico('trophy', 32)}<b>6th</b></span>`) +
    `<span class="stat rl-lap" id="rllap" aria-label="Lap">${ico('replay', 32)}<b>1/${t.laps}</b></span>${rlSpkChip(0)}` })}
  <div class="rl rl-${mode}" id="rl"><canvas id="rlcv" role="img" aria-label="The race track"></canvas><div class="rl-msg" id="rlmsg" aria-live="polite"></div>
  <div class="rl-q" id="rlq" hidden></div><div class="rl-ctl">${btn('rll', 'arrow-left', 'Steer left')}${btn('rlr', 'arrow-right', 'Steer right')}` +
    `${mode == 'pro' ? btn('rlgo', 'bolt', 'Go faster', 'Go') : ''}</div></div>`);
  const cv = $('#rlcv');
  RL = { st, cv, ctx: cv.getContext('2d', { alpha: false }), ptr: {}, key: {}, tilt: 0, bgx: 0, t: 0, acc: 0, last: 0, raf: 0, paused: false, ft: [], fi: [],
    cd: 4, chips: {}, q: 1, fc: 0, qAt: 0, cup, trial, shake: 0, calm: rlCalm(), msgT: 0 };
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
  if (S.voice) say(trial ? 'Race your ghost!' : wxn ? `${wxn} today. Ready?` : 'Ready? Steer with the arrows!');
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
      if (RL.shake > 0) RL.shake -= dt;
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
const RL_CRIT = { duck: 'duck', crab: 'crab', chick: 'penguin chick' };
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
    else if (k == 'bump' || k == 'wall') rlTone(300, .25, 0, 'triangle', .14, 120);
    else if (k == 'crash') {
      // a cartoon spin: a wobbly falling whistle and a boing
      rlTone(900, .5, 0, 'sine', .09, 260);
      rlTone(180, .2, .05, 'triangle', .12, 90);
      if (!RL.calm) RL.shake = .3;
      rlMsg(a == 'crit' ? `Whoa! The ${RL_CRIT[st.T.pl.crit] || 'animal'} hopped away. Dizzy!` : a == 'cone' ? 'Bonk! A cone! Dizzy!' :
        a == 'bonk' ? 'Bonk! Too close! Dizzy!' : 'Whoa! Spin! Dizzy!', 1300);
    } else if (k == 'pop') {
      rlTone(1200, .12, 0, 'sine', .1, 600);
      rlMsg('Pop! Your bubble kept you safe.', 1300);
    } else if (k == 'get') {
      SFX.right(2);
      rlMsg(a == 'star' ? 'Star zoom!' : 'Bubble shield!', 900);
    } else if (k == 'surf') {
      rlMsg(a == 'p' ? 'Splash! Puddles are slippery.' : a == 's' ? 'Sand slows you down.' : 'Ice! Steer gently.', 1300);
      rlTone(a == 'i' ? 1500 : 400, .15, 0, 'sine', .05, a == 'i' ? 1900 : 250);
    } else if (k == 'dizzy') {
      if (Math.abs(st.cars.find(c => c.rv === a).d - P.d) < RL_SEG * 25 && RL.t > RL.msgT) {
        RL.msgT = RL.t + 2;
        rlMsg(`Oops! ${a.name} spun round.`, 1000);
      }
    } else if (k == 'lap') {
      const lt = P.laps[P.laps.length - 1];
      rlMsg(st.trial && lt ? `Lap ${a}. Last lap ${rlTime(lt * 1000)}` : a == st.laps ? 'Last lap!' : 'Lap ' + a, 1300);
      [0, 4, 7].forEach((d, i) => rlTone(NOTE(76 + d), .14, i * .09, 'triangle', .08));
    } else if (k == 'best') {
      rlMsg('Best lap! ' + rlTime(a), 1300);
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
  set('rlpos', st.trial ? rlTime((st.done ? P.laps[P.laps.length - 1] || 0 : st.rt - P.lap0) * 1000) : rlOrd(P.place));
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
// the cup standings as a list (the child's row marked)
function rlStandHTML(pts, order, h) {
  return `<ol class="rl-stand" aria-label="Cup standings">${rlCupTable(pts, order).map((w, i) => `<li${w == 'you' ? ' class="me"' : ''}><span class="rl-sn">${i + 1}</span>` +
    `<svg class="art" viewBox="0 0 50 54" aria-hidden="true" focusable="false">${rlFace(w, 25, 30, 1.2, h)}</svg><b>${esc(rlWho(w))}</b>` +
    `<span>${pts[w]} points</span></li>`).join('')}</ol>`;
}
// the finish: stars, the best time, sparkles, what opened; a cup's standings and trophy; a time trial's best lap and ghost
function rlFinish() {
  const st = RL.st, P = st.P, r = rlS(), tid = st.tid, t = RL_TRK[tid], cup = RL.cup, trial = st.trial;
  const openCups = RL_CUPS.map((c, i) => rlCupOpen(i, r)), bodies = RL_BODIES.filter(b => rlBodyOpen(b[0], r)).map(b => b[0]);
  const ms = Math.round(P.time * 1000), lines = [], order = rlOrder(st);
  let n = null, pay, title, extra = '', pic = '', rec = false, had = r.best[tid], tag = '', win = P.place <= 3, stats;
  if (trial) {
    const b = st.rec.best, old = r.lap[tid];
    rec = !!b && (!old || b.ms < old);
    if (rec) {
      r.lap[tid] = b.ms;
      r.ghost[tid] = { ms: b.ms, g: b.g };
    }
    pay = P.spk + (rec ? 5 : 0);
    title = rec ? 'New best lap!' : 'Time trial done!';
    tag = rec && old ? 'Faster than your ghost!' : '';
    win = rec;
    stats = [[b ? rlTime(b.ms) : '-', 'best lap', 'timer'], [rlTime(ms), 'time', 'replay'], ['+' + pay, 'sparkles', 'sparkle']];
    lines.push(['car', rec ? 'Your ghost will race you next time: that is this lap.' : `Your ghost's lap is ${rlTime(old)}. Try again to beat it!`]);
  } else {
    n = rlStarsFor(P.place);
    rec = !had || ms < had;
    if (rec) r.best[tid] = ms;
    r.stars[tid] = Math.max(r.stars[tid] || 0, n);
    pay = rlPay(P.spk, P.place);
    title = P.place == 1 ? 'You won!' : P.place <= 3 ? rlOrd(P.place) + ' place!' : 'You finished the race!';
    tag = rec && had ? 'New best time!' : '';
    stats = [[rlOrd(P.place), 'place', 'trophy'], [rlTime(ms), rec ? (had ? 'new best' : 'your time') : 'best ' + rlTime(r.best[tid]), 'timer'], ['+' + pay, 'sparkles', 'sparkle']];
    pic = rlPic(RL_ART.podium(order.slice(0, 3), r.paint, r), 'gh-art');
  }
  let final = false, rank = 0;
  if (cup && r.cup && r.cup.id === cup.id) {
    rlCupAdd(r.cup.pts, order);
    extra = `<p class="rl-sth">${esc(cup.name)} after race ${r.cup.i + 1} of 3</p>` + rlStandHTML(r.cup.pts, order, r.paint);
    r.cup.i++;
    if (r.cup.i >= 3) {
      final = true;
      rank = rlCupTable(r.cup.pts, order).indexOf('you') + 1;
      const c = (r.cups[cup.id] = rlObj(r.cups[cup.id])), was = rlNum(c.best, 0, 4) || 4;
      c.best = Math.min(was, rank <= 3 ? rank : 4);
      c.runs = rlNum(c.runs, 0, 1e6) + 1;
      delete r.cup;
      title = rank <= 3 ? `${RL_TROPHY[rank]} trophy!` : `You raced the whole ${cup.name}!`;
      win = rank <= 3;
      if (rank <= 3) pic = `<div class="rl-epic">${rlCupSVG(rlTrophyHue(rank), 'rl-etro')}</div>`;
      lines.push(['trophy', rank <= 3 ? `You won the ${RL_TROPHY[rank].toLowerCase()} trophy in the ${esc(cup.name)}!` : `${rlOrd(rank)} in the cup. Race it again for a trophy!`]);
    }
  }
  r.spk += pay;
  r.races++;
  save();
  rlStop();
  gtStop();
  RL_CUPS.forEach((c, i) => { if (rlCupOpen(i, r) && !openCups[i]) lines.push(['sparkle', `New cup open: ${esc(c.name)}! Its tracks are open too.`]); });
  for (const b of RL_BODIES) if (rlBodyOpen(b[0], r) && !bodies.includes(b[0])) lines.push(['car', `New car in the garage: ${esc(b[1])}!`]);
  if (!trial && P.hits) lines.push(['replay', `${P.hits} ${P.hits == 1 ? 'spin' : 'spins'} this race. ${P.hits > 2 ? 'Steer round the cones, rails and animals to go faster!' : ''}`]);
  if (!trial && P.place > 3 && !cup) lines.push(['hint', st.mode == 'pro' ? 'Tip: drift through the bends, then let go to zoom.' : 'Tip: drive over the orange pads and grab the stars to zoom past.']);
  const time = ptLeft() > 0, nextC = cup && !final;
  const next = RL_ORDER[RL_ORDER.indexOf(tid) + 1], nextOk = !cup && !trial && next && rlTrackOpen(next, r) && !r.stars[next];
  const o = GH.end('rally', { win, title, stars: n, tag, pic: pic || undefined, stats, lines, extra,
    btns: (time ? (nextC ? UI.btn(`Race ${r.cup.i + 1} of 3`, { kind: 'primary', size: 'lg', icon: 'arrow-right', id: 'rlnextc', wide: true }) :
      UI.btn(final ? 'Race the cup again' : 'Race again', { kind: 'primary', size: 'lg', icon: 'replay', id: 'rlagain', wide: true })) +
      (nextOk ? UI.btn('Next track', { icon: 'arrow-right', id: 'rlnext', wide: true }) : '') :
      UI.btn('Earn more game time', { kind: 'primary', size: 'lg', icon: 'path-read', id: 'rllearn', wide: true })) +
      UI.btn(cup ? 'Cups' : 'Tracks', { icon: 'map', id: 'rlmenu', wide: true }) });
  if (S.voice) say(final && rank <= 3 ? `${RL_TROPHY[rank]} trophy! Well done, ${S.name}!` : trial ? (rec ? 'New best lap!' : 'Good driving!') :
    P.place == 1 ? `You won! Well done, ${S.name}!` : P.place <= 3 ? `${rlOrd(P.place)} place! Great racing!` : 'You finished the race! Well done!');
  const go = f => { o.remove(); f(); };
  const ci = cup ? RL_CUPS.indexOf(cup) : -1;
  if (o.querySelector('#rlnextc')) o.querySelector('#rlnextc').onclick = () => go(() => (ptLeft() > 0 ? rlCupGo(ci) : rlMenu()));
  if (o.querySelector('#rlagain')) o.querySelector('#rlagain').onclick = () => go(() => (cup ? rlCupGo(ci) : rlRace(tid, { trial })));
  if (o.querySelector('#rlnext')) o.querySelector('#rlnext').onclick = () => go(() => rlRace(next));
  if (o.querySelector('#rllearn')) o.querySelector('#rllearn').onclick = () => go(() => home());
  o.querySelector('#rlmenu').onclick = () => go(() => rlMenu(t.place));
}

// The Game Room card (59-game-hub.js shows it after the other three)
GH.reg({
  id: 'rally', btn: 'grally', name: 'Star Rally', icon: 'car', p: 'math', sky: ['sky-1', 'sky'], art: () => RL_ART.hub(),
  sub: () => {
    const r = rlPeek(), n = rlStarsAll(r);
    return n || r.spk ? `<span>${ico('trophy', 18)}<b>${rlTrophies(r)}</b> of 4 cups</span><span>${ico('star', 18)}<b>${n}</b> of 36 stars</span>`
      : '<span>Race the animals: 4 cups, 12 tracks</span>';
  },
  open: () => rlMenu(), tapToPlay: '.rl-trk[data-ok="1"]', saved: 'Your sparkles are saved.',
});
