/* ---------- Sky Hop: bounce your pet through short obstacle courses in the clouds (G-04b, G-04b2; CSS src/css/49-game-skyhop.css) ----------
   An original Whistlestop game (docs/GAMES_RESEARCH.md, "Game B"). Both files go into games2.<VER>.js (tools/build.py PARTS) and
   load after games.<VER>.js, so GH.reg, the gh* drawing helpers and Star Rally's colour helpers (rlCol, rlRes, rlRidge) are there.

   How it plays
   - The hero is the child's own drawn pet (the pet rig, 17-pets-svg.js, wearing its hat and toy and a Sky Hop costume), drawn once
     into a picture. It bounces along puffy cloud paths to a checkered flag and looks for 3 stars hidden off the main path.
   - One-touch (the default up to 2nd grade): the pet runs by itself; tap anywhere to hop; hold to float down slowly; from
     Windy Peaks on, a tap in the air is a second hop. Free move (the default from 3rd grade; a switch on the menu): left and
     right buttons and a jump button; a short press is a small hop, a long press a big one; go back for a missed star.
   - Kind timing: a hop still works a moment after running off an edge, and a tap just before landing counts.
   - Season 1: 24 courses in four worlds (Cloud Meadow, Windy Peaks, Starry Night, Rainbow Bridge), each adding one thing:
     flower springs, wind (gusts and updrafts), moving kite clouds, switches that open gates. Season 2 (G-04b2, R-03 K1): 24 remix
     courses in four more worlds (Sunset Isles: clouds that crumble; Whirly Heights: clouds that go round; Aurora Night: keys and
     doors; Star Castle: all of it together). All 48 courses open in order, one after the other.
   - Goals: 3 stars a course, time medals (fixed targets), a ghost of your own best run to race, a "Next goal" line on the menu,
     "Today's twist" (a course and one special rule picked from the date: the same all day, another tomorrow; 2 bonus stars the
     first time a day; nothing lost on a missed day, no streaks), and costumes for the pet bought with stars (a fixed list).
   - No lives, no game over: a fall puts the pet back on the last cloud checkpoint in a second; after 3 falls from the same
     checkpoint a friendly helper balloon offers a lift to the next one (the child can say no). Friendly puffs only bounce the
     pet back a little. Nobody else's times.
   - Nothing changes while the app is closed, nothing is random, no streaks, no ads.

   Code: worlds and courses (a short text format, hopBuild), the simulation (hopNew, hopStep, hopHelp, hopClone: no DOM, fixed
   1/60 s step, deterministic; the tests play every course with bots), the ghost (hopRec, hopGhostIn, hopGhostAt), today's twist
   (hopDaily), the drawings (SVG in the --a-* roles, object-art style DESIGN_SYSTEM 6.5, made once into canvases with the colours
   read from the tokens), the 2.5D canvas renderer (R-03 4.3: the far layers composed into one backdrop picture, each nearer layer
   cached at its own band height and faded toward the sky, sprites for every particle, adaptive render scale), the music and
   the screens.
   Game time: exactly like the other games (ptLeft() before a course, gtStart while it runs, held by the pause sheet, the shared
   time-up card). view() stops the course through hopStop().
   Save: S.hop (created when the game is first opened; old saves load unchanged), read field by field by hopS():
   {runs, best: {course: ms}, stars: {course: 0-7 bits}, medal: {course: 0-3}, mode, world, trail, cur,
    G-04b2: ghost: {course: text}, own: {costume: 1}, wear, spent, bonus, day: {k, c, tw, done}}. */

const HOP_DEV = { fast: 1 }; // test hook (smoke): the course runs this many times faster

/* ---- physics (units: tiles; y goes up; seconds) ---- */
const HOP_DT = 1 / 60;
const HOP_P = {
  G: 38, // gravity
  RUN: 5, // one-touch: the speed the pet runs by itself
  FREE: 6.2, // free move: top speed
  JUMP: 13.5, // hop (about 2.4 tiles high)
  JUMP2: 11.5, // the second hop in the air (from Windy Peaks)
  LOW: 5, // free move: letting go early cuts the hop to this speed
  SPRING: 20, // a flower spring (about 5 tiles high)
  FLOAT: -2.6, // holding: fall no faster than this
  FALL: -20,
  COY: 0.12, // a hop still works this long after running off an edge
  BUF: 0.16, // a tap this long before landing still counts
  PW: 0.8, // the pet's box
  PH: 1.2,
  LIFT: 60, // an updraft pushes up this hard
  KILL: -5, // below this the pet has fallen
};

/* ---- worlds and courses ----
   A course is a list of tokens read left to right with a cursor x and a ground height h:
     F<n> a cloud floor n tiles wide      B<n> a bridge (wood; a rainbow in Rainbow Bridge)   G<n> a gap of n tiles
     U<n> / D<n> the next floor is n higher / lower   S a 1-tile floor with a flower spring
     H<w>,<a> a kite cloud w wide that glides a tiles to and fro (fills w+a)   V<w>,<a> one that rises a tiles and back (fills w)
     W<n>,<s> wind over the next n tiles (s tiles a second; minus blows against you)   L<n>,<t> an updraft over the next n tiles, t high
     P<dx>,<dy> a friendly puff   K a 2-tile floor with a switch   X a 1-tile floor with a gate (opened by the last switch)
     R the place a closed gate bounces you back to   *<dx>,<dy> a hidden star   f<w>,<dx>,<dy> a side cloud
     o<n> a row of n sparkles   C a checkpoint (more are added every ~36 tiles)   E the end: a floor with the flag
     G-04b2: Q<n> a cloud floor that crumbles a moment after the pet lands on it and comes back later
     O<w>,<r> a cloud w wide that goes round a circle of radius r (fills w+2r)   Y<dx>,<dy> a key (opens the next door)
     Z a 1-tile floor with a door (opened by the key before it; a closed door bounces you back like a gate)
   Phrases (HOP_PH) are named bits of course; a course's plan is phrase names and plain tokens. */
// sky: the menu's two --sc-* colours; grad: the course sky from the top to the horizon (roles or sc- tokens); cloud: [base, shade, deep]
const HOP_WORLDS = [
  { id: 'meadow', name: 'Cloud Meadow', sky: ['sky-1', 'sky'], grad: ['b1', 'sc-sky', 'sc-sky-1'], cloud: ['w', 'w2', 'w3'], dj: false, adds: 'Flower springs' },
  { id: 'peaks', name: 'Windy Peaks', sky: ['blue', 'sky-1'], grad: ['b1', 'sc-blue-2', 'sc-sea-1'], cloud: ['w', 'c1', 'c'], dj: true, adds: 'Wind and a second hop' },
  { id: 'night', name: 'Starry Night', sky: ['night', 'night-1'], grad: ['sc-night', 'v2', 'sc-night-1'], cloud: ['v1', 'v', 'v2'], dj: true, adds: 'Kite clouds that move' },
  { id: 'rainbow', name: 'Rainbow Bridge', sky: ['candy-1', 'candy'], grad: ['p1', 'sc-candy', 'sc-candy-1'], cloud: ['w', 'p1', 'p'], dj: true, adds: 'Switches and gates' },
  // season 2 (G-04b2): remixes of the first four, each with one new thing
  { id: 'sunset', name: 'Sunset Isles', sky: ['dusk', 'peach'], grad: ['o1', 'sc-dusk', 'sc-sun'], cloud: ['m1', 'p1', 'p'], dj: true, adds: 'Clouds that crumble', s2: 1 },
  { id: 'whirl', name: 'Whirly Heights', sky: ['sea', 'blue'], grad: ['c', 'c1', 'sc-sea-1'], cloud: ['w', 'w2', 'c1'], dj: true, adds: 'Clouds that go round', s2: 1 },
  { id: 'aurora', name: 'Aurora Night', sky: ['night', 'mint-2'], grad: ['sc-night', 'b3', 'c3'], cloud: ['c1', 'c', 'c2'], dj: true, adds: 'Keys and doors', s2: 1 },
  { id: 'castle', name: 'Star Castle', sky: ['lilac', 'candy'], grad: ['v1', 'sc-lilac-2', 'sc-candy'], cloud: ['w', 'v1', 'v'], dj: true, adds: 'All the tricks together', s2: 1 },
];
const HOP_SEASONS = [[0, 'Season 1: Sky Trip'], [4, 'Season 2: Sky Remix']]; // [first world, title]
const HOP_PH = {
  // Cloud Meadow
  gap: 'F6 G2 F5', gap3: 'F5 G3 F4', up: 'F4 U1 F5', down: 'F4 D1 F5', step: 'F4 U1 F4 U1 F5 D2 F5',
  stones: 'F3 G2 F2 G2 F2 G2 F4', hole: 'F5 G2 F3 G3 F5', puff: 'F3 P3,1.2 F7', puffs: 'F3 P2,1.2 F5 P3,1.2 F6',
  spring: 'F4 S G2 U3 F5 D3 F4', springg: 'F4 S G4 F5', ledge: 'F4 U2 F5 D2 F4',
  row: 'o5 F7', bridge: 'F3 B6 F4', ups: 'F3 U1 F3 U1 F3 D1 F3 D1 F4',
  starHigh: 'F4 S *2.6,5.2 F6', starLow: 'F5 f3,1,-3.2 *2.3,-2 G4 F2 U1 F5 D1', starNook: 'F4 f3,1.5,2.2 *2.8,3.2 F6',
  starArc: 'F5 G3 *-1.6,3.4 F5', starSpring: 'F3 S f3,2,5 *3.5,6 F7',
  // Windy Peaks
  wind: 'W12,-2 F12', gust: 'W8,2.5 F4 G4 F5', lift: 'F4 L7,6 G7 F5', liftHi: 'F4 L6,7 G6 U3 F5 D3', dbl: 'F4 G5 F5',
  dblUp: 'F4 U3 F5 D3', windGap: 'W10,-1.5 F4 G2 F5', starLift: 'F4 L6,8 *3,7 G6 F5', starDbl: 'F5 *2.5,4.4 F4',
  // Starry Night
  kite: 'F4 H3,4 F5', kiteV: 'F4 V3,3 G1 U3 F5 D3', kites: 'F4 H3,3 F2 H3,3 F5', kiteHi: 'F4 V3,4 G1 U4 F6 D4',
  starKite: 'F4 V3,5 *1.5,7.2 G1 F5', starKiteH: 'F4 H3,5 *4,4 F5',
  // Rainbow Bridge
  gate: 'F3 R F3 U1 K D1 F2 X F5', gateHi: 'F3 R F2 U2 K D2 F2 X F5', gateLow: 'F3 R F2 G2 U1 K D1 F2 X F5',
  rbow: 'F3 B7 F4', starGate: 'F3 R F2 U2 K *1,2.5 D2 F2 X F5',
  // Sunset Isles: clouds that crumble a moment after you land on them (and come back)
  crumble: 'F4 G1 Q3 G2 F5', crumbles: 'F4 G1 Q2 G2 Q2 G2 F5', crumbleUp: 'F4 G1 U1 Q3 G2 D1 F5', crumbleRow: 'F3 G2 Q2 G2 Q2 G2 Q2 G2 F5',
  crumbleSpr: 'F4 S G2 U3 Q4 D3 G1 F4', starCrumble: 'F4 G1 Q2 *1,3.6 G2 F5', starCrumbleLow: 'F4 G1 Q2 f2,1.5,-2.6 *2.6,-1.6 G3 F5',
  // Whirly Heights: clouds that go round in a circle
  circ: 'F4 O3,2 F5', circHi: 'F4 O3,2 U2 F4 D2 F4', circs: 'F4 O3,1.5 F3 O3,1.5 F5', circWind: 'W10,2 F4 O3,1.5 F5',
  starCirc: 'F4 *4.5,4.8 O3,2.5 F5',
  // Aurora Night: a key opens the next door (R marks where a closed door bounces you back to)
  door: 'F3 R F3 Y-1.5,1 F2 Z F5', doorHi: 'F3 R F2 U2 F3 Y-1.5,1.2 D2 F2 Z F5', doorJump: 'F3 R F3 Y-1,3 F2 Z F5',
  doorGap: 'F3 R F2 G2 F3 Y-1.5,1 G2 F2 Z F5', starDoor: 'F3 R F3 Y-1.5,1 F2 *1,3.6 Z F5',
};
// [id, name, world, gold target in seconds (the one-touch bot of tools/test.js with no falls, plus 3 s), plan]
const HOP_COURSES = [
  ['m1', 'First Hops', 0, 48, 'F8 starHigh gap row gap3 up down puff gap stones row gap bridge gap3 starArc up down hole starNook E'],
  ['m2', 'Puffy Path', 0, 48, 'F8 starArc gap puff hole row stones up down gap3 puffs gap bridge step starLow gap starHigh E'],
  ['m3', 'Spring Garden', 0, 46, 'F8 spring gap puff springg row starSpring gap3 step stones spring puffs starArc hole starHigh E'],
  ['m4', 'Sunny Steps', 0, 45, 'F8 springg ups gap3 starNook step puff spring stones row ledge starLow hole gap3 starSpring E'],
  ['m5', 'Daisy Drops', 0, 53, 'F8 springg stones puffs ledge starHigh gap3 hole spring row ups starLow step gap3 springg puff starSpring E'],
  ['m6', 'Meadow Run', 0, 56, 'F8 spring hole puffs stones ups starSpring gap3 springg ledge row starLow step puff spring hole gap3 starNook E'],
  ['p1', 'Breezy Start', 1, 50, 'F8 wind dbl gap3 row lift starDbl up gust down stones starLift spring dbl starHigh lift gust dbl E'],
  ['p2', 'Updraft Hill', 1, 51, 'F8 lift dblUp windGap starLift puff liftHi row gust dbl starDbl stones lift spring starHigh lift gust dbl E'],
  ['p3', 'Gusty Gaps', 1, 53, 'F8 gust windGap dbl lift starDbl puffs liftHi wind hole springg starLift dblUp gust starSpring lift gust dbl E'],
  ['p4', 'Kite Valley', 1, 57, 'F8 windGap liftHi dbl starDbl gust stones lift puff dblUp starLift wind spring hole liftHi starHigh lift gust dbl E'],
  ['p5', 'Peak Path', 1, 57, 'F8 dblUp gust lift starLift ledge windGap dbl puffs liftHi starDbl springg wind gap3 lift dblUp starSpring lift gust dbl E'],
  ['p6', 'Top of the Wind', 1, 57, 'F8 liftHi gust dbl windGap starDbl lift ups puff starLift dblUp wind springg liftHi gust dbl starHigh lift gust dbl E'],
  ['n1', 'Moonlight Kites', 2, 55, 'F8 kite gap3 row kiteV starKite dbl puff kites lift starKiteH stones kiteHi starDbl kite lift kiteV dbl E'],
  ['n2', 'Lantern Lane', 2, 58, 'F8 kiteV kite starKiteH dbl lift puffs kites spring starKite gust kiteHi stones starDbl kite lift kiteV dbl E'],
  ['n3', 'Owl Hollow', 2, 56, 'F8 kites dblUp kiteV starKite windGap kite puff liftHi starKiteH kiteHi dbl springg starLift kite lift kiteV dbl E'],
  ['n4', 'Star Steps', 2, 59, 'F8 kiteHi kite starDbl gust kiteV lift kites starKite puffs dbl kiteV starKiteH springg kite kite lift kiteV dbl E'],
  ['n5', 'Comet Climb', 2, 63, 'F8 kiteV liftHi kites starKiteH dblUp kite gust starKite kiteHi puff lift kites starLift dbl kiteV kite lift kiteV dbl E'],
  ['n6', 'Night Sky High', 2, 61, 'F8 kites kiteHi starKite windGap kiteV dbl starKiteH liftHi kite puffs kiteHi gust kites starDbl kite lift kiteV dbl E'],
  ['r1', 'Rainbow Start', 3, 59, 'F8 gate rbow gap3 row starGate dbl kite lift gateLow starHigh puff rbow gateHi starDbl gate kite liftHi gateLow rbow E'],
  ['r2', 'Candy Gates', 3, 62, 'F8 gate kite rbow starGate lift gateLow puffs dblUp starKite gateHi wind kites starDbl gate kite liftHi gateLow rbow E'],
  ['r3', 'Bridge of Colours', 3, 66, 'F8 rbow gateHi kiteV starGate liftHi gate dbl puffs starLift rbow kites gateLow kiteHi starKiteH gate kite liftHi gateLow rbow E'],
  ['r4', 'Twisty Rainbow', 3, 64, 'F8 gateLow kites starGate windGap gate liftHi rbow starKite kiteV gateHi dbl puffs springg starDbl gate kite liftHi gateLow rbow E'],
  ['r5', 'Sky Castle Road', 3, 64, 'F8 gateHi liftHi kites starGate gust gate kiteV dblUp starKiteH rbow gateLow kiteHi puffs starLift gate kite liftHi gateLow rbow E'],
  ['r6', 'Over the Rainbow', 3, 66, 'F8 gate kiteHi starGate liftHi gateLow kites dblUp starKite rbow gateHi kiteV gust dbl lift starDbl gate kite liftHi gateLow rbow E'],
  // season 2: remixes of the season 1 bits with one new thing per world
  ['q1', 'Golden Hour', 4, 48, 'F8 crumble gap3 row starHigh crumbles spring dbl starCrumble puff crumbleUp bridge starArc crumble hole dbl E'],
  ['q2', 'Crumbly Clouds', 4, 46, 'F8 crumbles stones starCrumble springg crumbleUp dbl puffs starLow crumbleRow gap3 spring starSpring crumble E'],
  ['q3', 'Peach Puffs', 4, 46, 'F8 puffs crumble starDbl crumbleSpr hole crumbles starCrumbleLow puff crumbleUp step dbl starHigh crumbleRow E'],
  ['q4', 'Sunset Springs', 4, 45, 'F8 crumbleSpr springg starSpring crumbles lift dbl crumbleUp starCrumble gust crumbleRow spring starNook crumble E'],
  ['q5', 'Amber Arches', 4, 50, 'F8 crumbleRow wind starCrumbleLow kite crumbles liftHi dbl starCrumble crumbleSpr kiteV puffs starDbl crumbleUp crumble E'],
  ['q6', 'Last Light', 4, 53, 'F8 crumbleUp kites starCrumble crumbleRow gate dbl starCrumbleLow crumbleSpr liftHi crumbles starKite crumble windGap crumbleRow E'],
  ['t1', 'Round and Round', 5, 46, 'F8 circ gap3 row starCirc crumble dbl circWind lift starDbl circ spring puff starHigh circs E'],
  ['t2', 'Whirlwind Way', 5, 47, 'F8 circWind circ starCirc gust dbl crumbles circHi starLift lift circs windGap starDbl circ E'],
  ['t3', 'Twirl Top', 5, 46, 'F8 circHi liftHi starCirc circs crumbleUp dbl gust starDbl circWind kite puffs starLift circ E'],
  ['t4', 'Breezy Loop', 5, 44, 'F8 circs windGap starDbl circ crumbles liftHi starCirc circWind kiteV dbl starCrumble circHi E'],
  ['t5', 'Merry-Go-Cloud', 5, 48, 'F8 circ circHi starCirc crumbleRow circs dblUp starLift circWind kites gust starDbl circ crumble E'],
  ['t6', 'High Twirl', 5, 46, 'F8 circHi circWind starCirc liftHi circs crumbleSpr starKite gate circ dbl starDbl circs E'],
  ['a1', 'Key Keeper', 6, 45, 'F8 door gap3 row starDoor kite dbl doorHi lift starHigh crumble door circ starDbl doorGap E'],
  ['a2', 'Northern Lights', 6, 43, 'F8 doorHi kite starDoor crumbles door circ starKite doorJump lift dbl starDbl doorGap E'],
  ['a3', 'Lantern Lock', 6, 48, 'F8 doorJump kiteV starDoor circs doorGap crumbleUp starCirc door liftHi starDbl kites doorHi E'],
  ['a4', 'Shimmer Door', 6, 45, 'F8 doorGap circ starDoor kites doorHi crumbleRow starKite doorJump gust dbl starCrumble door E'],
  ['a5', 'Dream Door', 6, 43, 'F8 door crumbles starDoor kiteHi doorJump circWind starCirc doorGap liftHi starDbl kite doorHi E'],
  ['a6', 'Aurora Peak', 6, 47, 'F8 doorHi circHi starDoor kites doorGap crumbleSpr starKite doorJump circs starCrumble liftHi door E'],
  ['c1', 'Castle Gate', 7, 47, 'F8 gate crumble starGate circ door kite starDoor lift dbl gateLow starCirc crumbles doorHi E'],
  ['c2', 'Tower Hop', 7, 44, 'F8 doorHi gateHi starCrumble circs kiteV starGate crumbleUp door liftHi starDoor circ gate E'],
  ['c3', 'Moat Jump', 7, 48, 'F8 crumbleRow gate starCirc doorGap kites starDoor circHi gateLow crumbleSpr starKite door circ E'],
  ['c4', 'Royal Road', 7, 45, 'F8 circWind doorJump starGate crumbles kiteHi starCrumble gate circs doorHi starDoor liftHi gateLow E'],
  ['c5', 'Throne in the Clouds', 7, 48, 'F8 gateHi circHi starDoor crumbleSpr door kites starCirc doorGap gate crumbleUp starKite circs E'],
  ['c6', 'Star Castle Top', 7, 52, 'F8 doorGap gateLow starCirc crumbleRow circHi starDoor kiteHi gate doorJump starCrumble circWind gateHi crumbles door E'],
].map(([id, name, w, gold, plan], i) => ({ id, name, w, gold, plan, i }));
const HOP_BY = {};
for (const c of HOP_COURSES) HOP_BY[c.id] = c;

/* ---- building a course from its plan ---- */
const HOP_BUILT = {};
function hopBuild(id) {
  if (HOP_BUILT[id]) return HOP_BUILT[id];
  const c = HOP_BY[id], W = HOP_WORLDS[c.w];
  const C = { id, c, W, floors: [], movers: [], springs: [], puffs: [], winds: [], lifts: [], stars: [], spk: [], cps: [], pads: [], gates: [],
    keys: [], side: [], goal: null, L: 0, dj: W.dj };
  const toks = c.plan.split(/\s+/).flatMap(t => (HOP_PH[t] ? HOP_PH[t].split(' ') : [t]));
  let x = 0, h = 2, lastCp = 0, retry = null, pad = null, prevEnd = null;
  const floor = (n, kind) => {
    const f = { x0: x, x1: x + n, y: h, k: kind };
    C.floors.push(f);
    // a checkpoint at the start of a floor every ~36 tiles (none on the first, none on a cloud that crumbles)
    if (n >= 2 && kind != 'q' && x - lastCp >= 36 && C.cps.length) {
      C.cps.push({ x: x + 1.2, y: h });
      lastCp = x;
    }
    // sparkles arc over the jump from the floor before (a hint where to hop)
    if (prevEnd && x - prevEnd.x >= 2) {
      const a = prevEnd.x, b = x, top = Math.max(prevEnd.y, h) + 1.6 + (b - a) * .12;
      for (let k = 1; k <= 3; k++) {
        const t = k / 4, px = a + (b - a) * t;
        C.spk.push({ x: px, y: prevEnd.y + (h - prevEnd.y) * t + (top - Math.max(prevEnd.y, h)) * 4 * t * (1 - t) + 1 });
      }
    }
    x += n;
    prevEnd = { x, y: h };
    return f;
  };
  C.cps.push({ x: 2, y: h });
  for (const t of toks) {
    const k = t[0], a = t.slice(1).split(',').map(Number), n = a[0] || 0;
    if (k == 'F') floor(n, 'c');
    else if (k == 'B') floor(n, 'b');
    else if (k == 'Q') floor(n, 'q');
    else if (k == 'G') x += n;
    else if (k == 'U') h += n;
    else if (k == 'D') h -= n;
    else if (k == 'S') {
      floor(1, 'c');
      C.springs.push({ x: x - .5, y: h });
    } else if (k == 'H') {
      C.movers.push({ x: x, y: h, w: n, ax: a[1], ay: 0, T: 1.6 + a[1] * .45 });
      x += n + a[1];
      prevEnd = null;
    } else if (k == 'V') {
      C.movers.push({ x: x, y: h, w: n, ax: 0, ay: a[1], T: 1.6 + a[1] * .45 });
      x += n;
      prevEnd = null;
    } else if (k == 'O') {
      C.movers.push({ x: x, y: h, w: n, ax: 0, ay: 0, r: a[1], T: 3 + a[1] * .8 });
      x += n + 2 * a[1];
      prevEnd = null;
    } else if (k == 'W') C.winds.push({ x0: x, x1: x + n, s: a[1] });
    else if (k == 'L') C.lifts.push({ x0: x, x1: x + n, y0: h - 7, y1: h + a[1] });
    else if (k == 'P') C.puffs.push({ x: x + n, y: h + a[1] });
    else if (k == 'K') {
      floor(2, 'c');
      pad = { x0: x - 1.6, x1: x - .4, y: h, g: C.gates.length };
      C.pads.push(pad);
    } else if (k == 'Y') C.keys.push({ x: x + n, y: h + a[1], g: C.gates.length });
    else if (k == 'X' || k == 'Z') {
      floor(1, 'c');
      C.gates.push({ x0: x - .8, x1: x - .2, y0: h, y1: h + 3.2, back: retry || C.cps[C.cps.length - 1], door: k == 'Z' });
      retry = null;
    } else if (k == 'R') retry = { x: x - .6, y: h };
    else if (k == '*') C.stars.push({ x: x + n, y: h + a[1] });
    else if (k == 'f') C.side.push(C.floors[C.floors.push({ x0: x + a[1], x1: x + a[1] + n, y: h + a[2], k: 's' }) - 1]);
    else if (k == 'o') for (let i = 0; i < n; i++) C.spk.push({ x: x + .5 + i, y: h + 1 });
    else if (k == 'C') {
      C.cps.push({ x: x - 1, y: h });
      lastCp = x;
    } else if (k == 'E') {
      floor(9, 'c');
      C.goal = { x: x - 4, y: h };
    }
  }
  C.L = x;
  // a floor next to a lower one reaches down to it (a step is a wall, not a ledge to walk under)
  for (const f of C.floors) {
    f.dep = 1.2;
    if (f.k != 's' && f.k != 'q') for (const g of C.floors) if (g.k != 's' && g.k != 'q' && (g.x1 == f.x0 || g.x0 == f.x1)) f.dep = Math.max(f.dep, f.y - g.y + 1.2);
  }
  // a floor a kite cloud starts next to: one-touch waits there for it
  for (const f of C.floors) f.mv = C.movers.findIndex(m => Math.abs(m.x - f.x1) < .01 && Math.abs(m.y - f.y) < .01);
  // a column index of the solid floors (collision looks only at the columns under the pet)
  C.col = [];
  for (let i = 0; i <= Math.ceil(x) + 2; i++) C.col.push([]);
  C.floors.forEach((f, j) => {
    for (let i = Math.max(0, Math.floor(f.x0) - 1); i <= Math.min(C.col.length - 1, Math.ceil(f.x1)); i++) C.col[i].push(j);
  });
  // and of the things near each column: kite clouds, springs, puffs, sparkles (the step looks only at these)
  C.near = C.col.map(() => ({ mv: [], sp: [], pf: [], sk: [] }));
  const put = (a, b, k, v) => {
    for (let i = Math.max(0, Math.floor(a) - 2); i <= Math.min(C.near.length - 1, Math.ceil(b) + 2); i++) C.near[i][k].push(v);
  };
  C.movers.forEach((m, j) => put(m.x, m.x + m.w + m.ax + 2 * (m.r || 0), 'mv', j));
  C.springs.forEach(q => put(q.x, q.x, 'sp', q));
  C.puffs.forEach(q => put(q.x, q.x, 'pf', q));
  C.spk.forEach((q, j) => put(q.x, q.x, 'sk', j));
  return (HOP_BUILT[id] = C);
}

/* ---- the simulation (no DOM; the tests play whole courses) ---- */
// a kite cloud's place at time t (it glides with an easy-in-out to and fro)
function hopMover(m, t) {
  if (m.r) { // round and round: from its start over the top to the far side, then back underneath
    const a = 2 * Math.PI * t / m.T;
    return { x: m.x + m.r * (1 - Math.cos(a)), y: m.y + m.r * Math.sin(a) };
  }
  const u = .5 - Math.cos(2 * Math.PI * t / m.T) / 2;
  return { x: m.x + m.ax * u, y: m.y + m.ay * u };
}
const hopPuffY = (p, t) => p.y + Math.sin(t * 2.2 + p.x) * .3;
// a crumbling cloud shakes for CR_FALL s after the pet lands on it, is gone from CR_FALL to CR_BACK s, then it is back
const HOP_CR = { FALL: .7, BACK: 3.2 };
// today's twists (hopDaily): [id, name, what it does, physics: gravity x, hop speed x, run speed x]
const HOP_TW = [
  ['moon', 'Moon hops', 'Floaty hops today: your pet floats like on the moon!', .78, .883, 1],
  ['zoom', 'Zoomy shoes', 'Zoomy shoes today: your pet runs extra fast!', 1, 1, 1.2],
  ['spark', 'Sparkle hunt', 'Sparkle hunt today: catch lots of sparkles!', 1, 1, 1],
  ['lamp', 'Lantern night', 'Lantern night today: hop through the dark with a lantern!', 1, 1, 1],
];
const HOP_TWB = {};
for (const t of HOP_TW) HOP_TWB[t[0]] = t;
function hopNew(id, o = {}) {
  const C = hopBuild(id), c0 = C.cps[0], tw = HOP_TWB[o.tw] || HOP_TW[2];
  return {
    C, id, mode: o.mode == 'free' ? 'free' : 'one', t: 0, dj: C.dj, tw: HOP_TWB[o.tw] ? o.tw : '', gm: tw[3], jm: tw[4], sm: tw[5], crum: {},
    p: { x: c0.x, y: c0.y, vx: 0, vy: 0, gr: true, on: -1, jl: 0, coy: 0, buf: 0, held: false, face: 1, kb: 0, hit: 0, dl: 0, dsh: 0 },
    dash: !!o.dash, dashes: 0, boss: o.boss ? { w: o.boss.w, n: o.boss.n | 0, T: hopBossT(o.boss.w, o.boss.n), lost: false } : null, // G-MOVES
    cp: 0, cpF: C.cps.map(() => 0), falls: 0, bumps: 0, got: new Uint8Array(C.spk.length), spk: 0, stars: 0, gates: 0,
    wait: 'start', wt: .8, anim: null, offer: -1, helped: 0, done: false, ev: [],
  };
}
function hopClone(st) {
  const s = Object.assign({}, st);
  s.p = Object.assign({}, st.p);
  s.cpF = st.cpF.slice();
  s.got = st.got.slice();
  s.anim = st.anim && Object.assign({}, st.anim);
  s.crum = Object.assign({}, st.crum);
  s.boss = st.boss && Object.assign({}, st.boss);
  s.ev = [];
  return s;
}
// a floor is there unless it is a crumbling cloud that has fallen
const hopThere = (st, j) => { const t0 = st.crum[j]; return t0 == null || st.t - t0 < HOP_CR.FALL || st.t - t0 >= HOP_CR.BACK; };
// the surfaces under the pet: floors (solid) and kite clouds (land on top only)
function hopSupport(st, x, y, eps) {
  const C = st.C, P = HOP_P, l = x - P.PW / 2 + .06, r = x + P.PW / 2 - .06;
  for (const j of C.col[Math.max(0, Math.min(C.col.length - 1, Math.floor(x)))] || []) {
    const f = C.floors[j];
    if (hopThere(st, j) && r > f.x0 && l < f.x1 && Math.abs(y - f.y) <= eps) return j;
  }
  for (const j of hopNear(C, x).mv) {
    const m = C.movers[j], q = hopMover(m, st.t);
    if (r > q.x && l < q.x + m.w && Math.abs(y - q.y) <= eps) return 1000 + j;
  }
  return -1;
}
const hopNear = (C, x) => C.near[Math.max(0, Math.min(C.near.length - 1, Math.floor(x)))];
const hopIn = (z, x) => x >= z.x0 && x < z.x1;
// one fixed step. inp: {jump: held (one-touch: the screen or the Hop button), dir: -1 | 0 | 1 (free move)}
function hopStep(st, inp = {}) {
  if (st.done || st.wait == 'offer') return;
  const C = st.C, P = HOP_P, p = st.p, dt = HOP_DT;
  const press = !!inp.jump && !p.held;
  if (!inp.jump && p.held && st.mode == 'free' && p.vy > P.LOW * st.jm && !p.spr) p.vy = P.LOW * st.jm; // a short press: a small hop
  p.held = !!inp.jump;
  st.t += dt;
  if (st.boss) st.boss.x = hopRivalX(st); // G-MOVES: the bird's place, once a step (the drawing reads it)
  if (st.boss && !st.boss.lost && st.boss.x >= C.goal.x) { // G-MOVES: the bird is at the flag (the race goes on)
    st.boss.lost = true;
    st.ev.push(['rival']);
  }
  // waits: falling (back on the checkpoint in a moment), bounced back by a gate, carried by the helper balloon, ready
  if (st.wait == 'fall') {
    if ((st.wt -= dt) > 0) return;
    const cp = C.cps[st.cp];
    Object.assign(p, { x: cp.x, y: cp.y, vx: 0, vy: 0, gr: true, on: -1, kb: 0, buf: 0, coy: 0, spr: false, dsh: 0 });
    st.ev.push(['back']);
    if (st.cpF[st.cp] >= 3 && st.cp < C.cps.length - 1) {
      st.wait = 'offer';
      st.offer = st.cp;
      st.ev.push(['offer']);
    } else {
      st.wait = 'start';
      st.wt = .5;
    }
    return;
  }
  if (st.wait == 'back' || st.wait == 'lift') {
    const A = st.anim;
    A.t += dt;
    const u = Math.min(1, A.t / A.d), e = .5 - Math.cos(Math.PI * u) / 2;
    p.x = A.x0 + (A.x1 - A.x0) * e;
    p.y = A.y0 + (A.y1 - A.y0) * e + A.arc * Math.sin(Math.PI * u);
    p.vx = 0;
    p.vy = 0;
    if (u >= 1) {
      Object.assign(p, { x: A.x1, y: A.y1, gr: true, on: -1, kb: 0, buf: 0, spr: false });
      if (st.wait == 'lift') {
        st.cp = A.cp;
        st.ev.push(['cp', A.cp]);
      }
      st.anim = null;
      st.wait = 'start';
      st.wt = .4;
    }
    return;
  }
  if (st.wait == 'start' && (st.wt -= dt) <= 0) st.wait = null;
  // the kite cloud under the pet carries it
  if (p.gr && p.on >= 1000) {
    const m = C.movers[p.on - 1000], a = hopMover(m, st.t - dt), b = hopMover(m, st.t);
    p.x += b.x - a.x;
    p.y = b.y;
  }
  // horizontal: run by itself (one-touch) or follow the buttons (free move); wind adds to it
  let wind = 0;
  for (const z of C.winds) if (hopIn(z, p.x)) wind = z.s;
  // one-touch: the pet waits at the edge for a kite cloud to come, and stands on it while it carries it (it walks off by itself
  // onto a cloud that lines up, or the child hops off)
  const one = st.mode == 'one', ready = st.wait != 'start';
  let stay = false;
  if (one && p.gr && p.on >= 1000) stay = hopSupport(st, p.x + .7, p.y, .06) < 0 || hopSupport(st, p.x + .7, p.y, .06) >= 1000;
  else if (one && p.gr && p.on >= 0) {
    const f = C.floors[p.on];
    if (f.mv >= 0 && p.x + P.PW / 2 >= f.x1 - .05) {
      const m = C.movers[f.mv], q = hopMover(m, st.t);
      stay = q.x > f.x1 + .2 || Math.abs(q.y - f.y) > .12;
    }
  }
  const want = (one ? (ready && !stay ? P.RUN * st.sm : 0) : (ready ? (inp.dir || 0) * P.FREE * st.sm : 0)) + (ready ? wind : 0);
  // G-MOVES: the Dash, in the air, once until the pet lands
  if (p.gr) p.dl = 1;
  if (inp.dash && st.dash && !p.gr && p.dl > 0 && ready && p.kb <= 0) {
    p.dl = 0;
    p.dsh = HOP_DASH_T;
    st.dashes++;
    st.ev.push(['dash']);
  }
  if (p.dsh > 0) {
    p.dsh -= dt;
    p.vx = HOP_DASH_V * (one ? 1 : p.face);
    p.vy = Math.max(p.vy, 0);
  } else if (p.kb > 0) p.kb -= dt;
  else {
    const acc = (one ? (p.gr ? 30 : 14) : (p.gr ? 45 : 26)) * dt;
    p.vx += Math.max(-acc, Math.min(acc, want - p.vx));
  }
  if (!one && inp.dir) p.face = inp.dir;
  // hops: on the ground, just after an edge (coyote time), or a second hop in the air; a press is remembered a moment
  if (press) p.buf = P.BUF;
  if (p.gr) p.jl = st.dj ? 1 : 0;
  if (p.buf > 0 && ready) {
    if (p.gr || p.coy > 0) {
      p.vy = P.JUMP * st.jm;
      p.gr = false;
      p.on = -1;
      p.coy = 0;
      p.buf = 0;
      p.spr = false;
      st.ev.push(['jump']);
    } else if (press && st.dj && p.jl > 0) {
      p.vy = P.JUMP2 * st.jm;
      p.jl--;
      p.buf = 0;
      p.spr = false;
      st.ev.push(['jump2']);
    }
  }
  p.buf = Math.max(0, p.buf - dt);
  p.coy = Math.max(0, p.coy - dt);
  // gravity, floating (hold), updrafts
  if (!p.gr && !(p.dsh > 0)) {
    p.vy -= P.G * st.gm * dt;
    if (p.held && p.vy < P.FLOAT) p.vy = P.FLOAT;
    for (const z of C.lifts) if (hopIn(z, p.x) && p.y > z.y0 && p.y < z.y1) p.vy = Math.min(7, p.vy + P.LIFT * dt);
    p.vy = Math.max(P.FALL, p.vy);
  }
  // move across, then stop at the side of a floor or a closed gate
  const ox = p.x;
  p.x += p.vx * dt;
  const solidHit = (x0, x1, y0, y1) => {
    if (p.y >= y1 - .05 || p.y + P.PH <= y0) return false;
    const l = p.x - P.PW / 2, r = p.x + P.PW / 2;
    if (r <= x0 || l >= x1) return false;
    if (ox <= x0 + .01 + P.PW / 2 && p.vx >= 0) p.x = x0 - P.PW / 2 - .001;
    else if (ox >= x1 - .01 - P.PW / 2) p.x = x1 + P.PW / 2 + .001;
    p.vx = 0;
    return true;
  };
  for (let i = Math.max(0, Math.floor(p.x) - 1); i <= Math.min(C.col.length - 1, Math.floor(p.x) + 1); i++) {
    for (const j of C.col[i]) {
      const f = C.floors[j];
      if (f.k != 's' && f.k != 'q') solidHit(f.x0, f.x1, f.y - f.dep, f.y);
    }
  }
  C.gates.forEach((g, i) => {
    if (st.gates & (1 << i)) return;
    if (solidHit(g.x0, g.x1, g.y0, g.y1)) {
      // a closed gate: boing, back to before the switch
      st.bumps++;
      st.ev.push(['gate', i]);
      st.wait = 'back';
      st.anim = { t: 0, d: .8, x0: p.x, y0: p.y, x1: g.back.x, y1: g.back.y, arc: 2.5 };
    }
  });
  if (st.wait == 'back') return;
  // move up or down: land on a floor top or a kite cloud when falling onto it (from below you pass through)
  const oy = p.y;
  if (!p.gr) p.y += p.vy * dt;
  if (!p.gr && p.vy <= 0) {
    const l = p.x - P.PW / 2 + .06, r = p.x + P.PW / 2 - .06;
    let best = -1, by = -1e9;
    for (let i = Math.max(0, Math.floor(p.x) - 1); i <= Math.min(C.col.length - 1, Math.floor(p.x) + 1); i++) {
      for (const j of C.col[i]) {
        const f = C.floors[j];
        if (r > f.x0 && l < f.x1 && oy >= f.y - .001 && p.y <= f.y && f.y > by && hopThere(st, j)) {
          best = j;
          by = f.y;
        }
      }
    }
    for (const j of hopNear(C, p.x).mv) {
      const m = C.movers[j], q0 = hopMover(m, st.t - dt), q = hopMover(m, st.t);
      if (r > q.x && l < q.x + m.w && oy >= q0.y - .05 && p.y <= q.y + .02 && q.y > by) {
        best = 1000 + j;
        by = q.y;
      }
    }
    if (best >= 0) {
      p.y = by;
      p.vy = 0;
      p.gr = true;
      p.on = best;
      p.jl = st.dj ? 1 : 0;
      st.ev.push(['land']);
      // a flower spring: boing, way up
      for (const s of hopNear(C, p.x).sp) {
        if (best < 1000 && Math.abs(p.x - s.x) < .5 + P.PW / 2 - .1 && Math.abs(by - s.y) < .01) {
          p.vy = P.SPRING;
          p.gr = false;
          p.on = -1;
          p.spr = true;
          st.ev.push(['spring']);
          break;
        }
      }
    }
  } else if (p.gr) {
    // still standing on something? if not, start falling (with a moment of coyote time)
    const j = hopSupport(st, p.x, p.y, .04);
    if (j < 0) {
      p.gr = false;
      p.on = -1;
      p.coy = P.COY;
      p.vy = Math.min(p.vy, 0);
    } else p.on = j;
  }
  // a crumbling cloud starts to shake when the pet stands on it; a fallen one comes back after a while
  for (const j in st.crum) if (st.t - st.crum[j] >= HOP_CR.BACK) delete st.crum[j];
  if (p.gr && p.on >= 0 && p.on < 1000 && C.floors[p.on].k == 'q' && st.crum[p.on] == null) {
    st.crum[p.on] = st.t;
    st.ev.push(['crumble', p.on]);
  }
  // a spring under the pet when it walks onto it
  if (p.gr && p.on < 1000) {
    for (const s of hopNear(C, p.x).sp) {
      if (Math.abs(p.x - s.x) < .45 && Math.abs(p.y - s.y) < .01) {
        p.vy = P.SPRING;
        p.gr = false;
        p.on = -1;
        p.spr = true;
        st.ev.push(['spring']);
        break;
      }
    }
  }
  // friendly puffs bounce the pet back a little
  if (p.hit > 0) p.hit -= dt;
  else {
    for (const f of hopNear(C, p.x).pf) {
      const fy = hopPuffY(f, st.t), dx = Math.max(Math.abs(p.x - f.x) - P.PW / 2, 0), dy = Math.max(fy - (p.y + P.PH), p.y - fy, 0);
      if (dx * dx + dy * dy < .55 * .55) {
        p.vx = -6 * (p.vx >= 0 ? 1 : -1);
        p.vy = 7;
        p.gr = false;
        p.on = -1;
        p.kb = .35;
        p.hit = .6;
        st.bumps++;
        st.ev.push(['puff']);
        break;
      }
    }
  }
  // sparkles, stars, switches, checkpoints, the flag
  const cx = p.x, cy = p.y + P.PH / 2, near = (q, r) => Math.abs(q.x - cx) < P.PW / 2 + r && Math.abs(q.y - cy) < P.PH / 2 + r;
  for (const i of hopNear(C, p.x).sk) {
    if (!st.got[i] && near(C.spk[i], .3)) {
      st.got[i] = 1;
      st.spk++;
      st.ev.push(['spk', st.spk]);
    }
  }
  C.stars.forEach((s, i) => {
    if (!(st.stars & (1 << i)) && near(s, .4)) {
      st.stars |= 1 << i;
      st.ev.push(['star', i]);
    }
  });
  for (const q of C.keys) {
    if (!(st.gates & (1 << q.g)) && near(q, .4)) {
      st.gates |= 1 << q.g;
      st.ev.push(['key', q.g]);
    }
  }
  if (p.gr) {
    for (const d of C.pads) {
      if (!(st.gates & (1 << d.g)) && p.x > d.x0 - .3 && p.x < d.x1 + .3 && Math.abs(p.y - d.y) < .01) {
        st.gates |= 1 << d.g;
        st.ev.push(['switch', d.g]);
      }
    }
  }
  if (st.cp < C.cps.length - 1 && p.x >= C.cps[st.cp + 1].x - .2 && p.gr) {
    st.cp++;
    st.ev.push(['cp', st.cp]);
  }
  if (C.goal && p.x >= C.goal.x && p.gr) {
    st.done = true;
    st.ev.push(['goal']);
    return;
  }
  // fell below the clouds: poof, back on the checkpoint
  if (p.y < P.KILL) {
    st.falls++;
    st.cpF[st.cp]++;
    st.wait = 'fall';
    st.wt = .7;
    st.ev.push(['fall']);
  }
}
/* ---- G-MOVES (v188): a new move, the Dash, and a boss per world, the sky race ----
   Dash (opens when HOP_DASH_NEED courses are finished, the first world): a button (D or Shift on a keyboard). In the air, once
   until the pet lands again, the pet shoots ahead at HOP_DASH_V tiles a second for HOP_DASH_T s without falling, over a wide gap
   or ahead of a rival. No course needs it. The move card shows once on the menu (S.hop.mv = 1 once seen).
   Sky race (opens when the world's last course is finished): a friendly bird flies the world's last course at a steady pace and
   reaches the flag hopBossT(w, n) seconds after the start: a little quicker than a perfect one-touch run (gold - 3 s, the bot's
   time) on the first race, HOP_BOSS_EASE of that more for each race not won, up to HOP_BOSS_MAX. Reach the flag first to win;
   the bird first costs nothing. A win: stars to spend (more the first time) and a crown on the world. Twists, ghosts, medals and
   course records are not touched by a race. S.hop.bs {worldIndex: {n: races not won, w: wins}}. */
const HOP_DASH_NEED = 6, HOP_DASH_V = 11, HOP_DASH_T = .22;
const hopDashOpen = (r = hopPeek()) => hopDone(r) >= HOP_DASH_NEED;
// the rival of each world: [name, face, goggles colour, line]
const HOP_BOSS = [['Breezy', 'bird', 'y', 'Race me to the flag!'], ['Gusty', 'owl', 'c', 'Whoosh! Catch me!'], ['Twinkle', 'bird', 'v', 'Race me under the stars!'],
  ['Rainbow', 'bird', 'p', 'Can you beat me over the bridge?'], ['Sunny', 'bird', 'o', 'Race me to the islands!'], ['Whirl', 'owl', 'g', 'Round and round, then race!'],
  ['Glow', 'bird', 'c', 'Race me in the lights!'], ['Captain Cloud', 'owl', 'r', 'The last race! Ready?']];
const HOP_BOSS_PACE = .96, HOP_BOSS_EASE = .1, HOP_BOSS_MAX = 8, HOP_BOSS_PAY = [3, 1];
const hopBossCourse = w => HOP_COURSES[w * 6 + 5];
const hopBossOpen = (w, r = hopPeek()) => w < HOP_BOSS.length && hopNum(hopObj(r.best)[hopBossCourse(w).id], 0, 36e5) > 0;
const hopBossRec = (w, r = hopPeek()) => hopObj(hopObj(r.bs)[String(w)]);
const hopBossT = (w, n) => (hopGold(hopBossCourse(w)) - 3) * (HOP_BOSS_PACE + HOP_BOSS_EASE * Math.min(HOP_BOSS_MAX, Math.max(0, n | 0)));
// where the bird is at time t: from the start to the flag in T seconds (after the 0.8 s start). Review fix (v186): once the races
// not won reach HOP_BOSS_MAX the bird may not pass the child: it stays HOP_BOSS_GAP tiles behind the furthest the pet has got
// (st.boss.px, which a fall never takes back), so it flies on at its pace until it catches up, then keeps just behind
const HOP_BOSS_GAP = 1.5;
const hopRivalX = (st, t = st.t) => {
  const C = st.C, B = st.boss, x0 = C.cps[0].x, x = x0 + (C.goal.x - x0) * Math.min(1, Math.max(0, t - .8) / B.T);
  if (B.n < HOP_BOSS_MAX) return x;
  B.px = Math.max(B.px || x0, st.p.x);
  return Math.min(x, Math.max(x0, Math.min(B.px - HOP_BOSS_GAP, C.goal.x - .5))); // (the pet can be past the flag's x before it lands there)
};
function hopBossMenu(w) {
  const B = HOP_BOSS[w], c = hopBossCourse(w), rec = hopBossRec(w, hopS());
  GH.boss({ id: 'hop', key: `${HOP_WORLDS[w].name}: sky race`, name: B[0], kind: B[1], hat: 'goggles', line: B[3], goal: `Reach the flag on ${c.name} before ${B[0]}.`,
    prize: `Win: ${HOP_BOSS_PAY[0]} stars to spend the first time and a crown.`, won: !!rec.w, tries: hopNum(rec.n, 0, 999),
    easier: `${B[0]} flies a little slower each time you try.`, go: `Race ${B[0]}!`, start: () => hopPlay(c.id, null, true), back: () => hopMenu(w) });
}
// the end of a sky race (won: first at the flag); quitting or game time running out counts as a race not won
function hopBossDone(st, won) {
  const r = hopS(), k = String(st.boss.w), rec = (r.bs[k] = r.bs[k] || { n: 0, w: 0 }), first = won && !rec.w;
  if (won) rec.w++;
  else rec.n = Math.min(999, rec.n + 1);
  const pay = won ? HOP_BOSS_PAY[first ? 0 : 1] : 0;
  r.bonus += pay;
  st.boss.done = 1;
  return { first, pay };
}
function hopBossEnd() {
  const st = HP.st, w = st.boss.w, B = HOP_BOSS[w], won = !st.boss.lost, res = hopBossDone(st, won), r = hopS();
  r.runs++;
  r.stars[HP.c.id] = (r.stars[HP.c.id] || 0) | st.stars;
  save();
  hopStop();
  const lines = won ? [['crown', res.first ? `A crown for ${esc(HOP_WORLDS[w].name)}! Plus ${res.pay} stars to spend.` : `You won again! Plus ${res.pay} star to spend.`]] :
    [['heart', `${esc(B[0])} got there first. Nothing is lost!`], ['go', `${esc(B[0])} will fly a little slower next time.`]];
  if (st.dashes) lines.push(['arrow-right', `${st.dashes} ${st.dashes == 1 ? 'dash' : 'dashes'}!`]);
  const time = ptLeft() > 0;
  const o = GH.end('hop', { win: won, title: won ? `You beat ${B[0]}!` : `${B[0]} won this time`, pic: `<div class="hp-epic">${GH.faceSVG(B[1], 'goggles', B[2])}</div>`,
    stats: [[hopTime(Math.round(st.t * 1000)), 'your time', 'timer'], won && st.t > st.boss.T + .8 ? ['2nd', `${B[0]}'s place`, 'go'] : [hopTime(Math.round((st.boss.T + .8) * 1000)), `${B[0]}'s time`, 'go'], [String(hopWallet(r)), 'stars to spend', 'star']], lines,
    btns: time ? NAV.end3({ again: 'hpagain', home: 'hpmenu' }) : NAV.end3({ next: 'hplearn', home: 'hpmenu' }) });
  if (S.voice) say(won ? `You beat ${B[0]}!` : `${B[0]} won this time. Try again!`);
  const go = f => { o.remove(); f(); };
  if (o.querySelector('#hpagain')) o.querySelector('#hpagain').onclick = () => go(() => (ptLeft() > 0 ? hopPlay(HP_BOSSC, null, true) : hopMenu()));
  if (o.querySelector('#hplearn')) o.querySelector('#hplearn').onclick = () => go(() => learnHub());
  o.querySelector('#hpmenu').onclick = () => go(() => home());
}
let HP_BOSSC = ''; // the course of the last sky race (Play again)
// G-MOVES: the world's sky race on the menu (the bird's face, a crown once beaten, a lock until the world's last course is finished)
function hopBossCard(w, r) {
  const B = HOP_BOSS[w], ok = hopBossOpen(w, r), rec = hopBossRec(w, r);
  return `<button class="hp-boss${ok ? '' : ' lock'}" id="hpboss" aria-label="${esc(ok ? `Sky race: race ${B[0]}${rec.w ? ', you won' : ''}` : `Sky race with ${B[0]}: locked`)}">` +
    `<span class="hp-bface">${GH.faceSVG(B[1], 'goggles', B[2])}</span><span class="hp-bt"><b>Sky race: ${esc(B[0])}</b><small>${ok ? (rec.w ? 'You won! Race again any time.' :
      esc(B[3])) : `Finish ${esc(hopBossCourse(w).name)} first.`}</small></span>${ico(!ok ? 'lock' : rec.w ? 'crown' : 'play', 32)}</button>`;
}
// the helper balloon: yes carries the pet to the next checkpoint; no plays on (it asks again after 3 more falls)
function hopHelp(st, yes) {
  if (st.wait != 'offer') return;
  const C = st.C, p = st.p;
  st.cpF[st.cp] = 0;
  st.offer = -1;
  if (!yes) {
    st.wait = 'start';
    st.wt = .5;
    return;
  }
  const to = C.cps[st.cp + 1];
  st.helped++;
  st.wait = 'lift';
  st.anim = { t: 0, d: Math.max(2, Math.hypot(to.x - p.x, to.y - p.y) / 7), x0: p.x, y0: p.y, x1: to.x, y1: to.y, arc: 3.5, cp: st.cp + 1 };
  st.ev.push(['lift']);
}
// medals: 3 gold, 2 silver, 1 bronze (any finish); targets per course
const hopGold = c => c.gold || 90;
const hopMedal = (c, sec) => (sec <= hopGold(c) ? 3 : sec <= Math.ceil(hopGold(c) * 1.3) ? 2 : 1);

/* ---- the ghost: the pet's place every 0.2 s of the best run, two letters a sample (G-04b2) ----
   A sample is the move since the last one: across in 1/16 tile (-31..32), up in 1/8 tile; a bigger jump (a fall back to a flag,
   a balloon ride) is '.' and the place itself (x in 1/8 tile, 3 letters; y + 20 in 1/8 tile, 2 letters). The place is carried
   exactly (the next move makes up for rounding), so the ghost never drifts. At most HOP_GMAX letters (about 160 s). */
const HOP_G64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_', HOP_GMAX = 1600;
const hopG = (v, n) => { let s = ''; for (let i = 0; i < n; i++, v = Math.floor(v / 64)) s += HOP_G64[v % 64]; return s; };
const hopGv = (s, i, n) => { let v = 0; for (let k = n - 1; k >= 0; k--) { const d = HOP_G64.indexOf(s[i + k]); if (d < 0) return NaN; v = v * 64 + d; } return v; };
function hopRec(R, st) {
  if (R.k++ % 12) return;
  const p = st.p, qx = Math.round((p.x - R.x) * 16), qy = Math.round((p.y - R.y) * 8);
  if (R.s.length >= HOP_GMAX - 5) return;
  if (!R.s.length || Math.abs(qx - .5) > 31.5 || Math.abs(qy - .5) > 31.5) {
    const ax = Math.max(0, Math.min(262143, Math.round(p.x * 8))), ay = Math.max(0, Math.min(4095, Math.round((p.y + 20) * 8)));
    R.s += '.' + hopG(ax, 3) + hopG(ay, 2);
    R.x = ax / 8;
    R.y = ay / 8 - 20;
  } else {
    R.s += HOP_G64[qx + 31] + HOP_G64[qy + 31];
    R.x += qx / 16;
    R.y += qy / 8;
  }
}
const hopRecNew = () => ({ k: 0, x: 0, y: 0, s: '' });
// a saved ghost as its places ({x: [], y: []}, one every 0.2 s), or null when the text is damaged
function hopGhostIn(s) {
  if (typeof s != 'string' || !s.length || s.length > HOP_GMAX || s[0] != '.') return null;
  const x = [], y = [];
  let cx = 0, cy = 0;
  for (let i = 0; i < s.length;) {
    if (s[i] == '.') {
      cx = hopGv(s, i + 1, 3) / 8;
      cy = hopGv(s, i + 4, 2) / 8 - 20;
      i += 6;
    } else {
      const a = HOP_G64.indexOf(s[i]), b = HOP_G64.indexOf(s[i + 1]);
      if (a < 0 || b < 0) return null;
      cx += (a - 31) / 16;
      cy += (b - 31) / 8;
      i += 2;
    }
    if (!isFinite(cx) || !isFinite(cy)) return null;
    x.push(cx);
    y.push(cy);
  }
  return { x, y };
}
// where the ghost is t seconds into the course (between two samples), or null after its run
function hopGhostAt(g, t) {
  if (!g || t < 0) return null;
  const f = t * 5, i = Math.floor(f);
  if (i + 1 >= g.x.length) return null;
  const u = f - i, x = g.x[i] + (g.x[i + 1] - g.x[i]) * u, y = g.y[i] + (g.y[i + 1] - g.y[i]) * u;
  return { x, y, jump: Math.abs(g.x[i + 1] - g.x[i]) > 3 || Math.abs(g.y[i + 1] - g.y[i]) > 5 };
}

/* ---- today's twist: a course the child has finished and one special rule, from the date (G-04b2, R-03 A5) ----
   The same all day, another one tomorrow; the first finish a day that keeps the rule earns 2 stars to spend. Nothing is lost on a
   missed day and nothing counts days in a row. */
const hopHash = s => { let h = 2166136261; for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
// day: a day key (today()); done: how many courses are finished in order (0-48) -> {c: course id, tw: twist id}
function hopDaily(day, done) {
  const h = hopHash('hop' + day), n = Math.max(1, Math.min(HOP_COURSES.length, done));
  return { c: HOP_COURSES[(h >>> 3) % n].id, tw: HOP_TW[h % HOP_TW.length][0] };
}
// what the twist asks for its bonus: Sparkle hunt wants about half the sparkles; the others want the flag
const hopTwNeed = (tw, id) => (tw == 'spark' ? Math.max(10, Math.floor(hopBuild(id).spk.length * .5)) : 0);
const hopTwOk = (st) => !st.tw || st.tw != 'spark' || st.spk >= hopTwNeed('spark', st.id);

/* ---- costumes for the pet, bought with stars (G-04b2, R-03 K3): a fixed list, each with its price; never random ----
   Stars to spend = stars found + 1 for each gold medal + today's-twist bonus stars - stars spent. Buying never takes a found star
   off a course. [id, name, price] */
const HOP_WEAR = [['leaf', 'Leaf Cape', 4], ['cape', 'Hero Cape', 8], ['bal', 'Balloon Bunch', 12], ['bfly', 'Butterfly Wings', 16],
  ['kite', 'Kite Tail', 20], ['brolly', 'Cloud Umbrella', 25], ['jet', 'Bubble Jetpack', 30], ['halo', 'Star Ring', 36],
  ['dragon', 'Dragon Wings', 42], ['rbow', 'Rainbow Cape', 50]];
const HOP_WEARB = {};
for (const w of HOP_WEAR) HOP_WEARB[w[0]] = w;

/* ---- drawings (SVG in the --a-* roles; a tile is 40 units; made once into canvases) ---- */
// round puffs as one path: [x, y, r] each
const hopPuffs = (list, c, o) => ghP(list.map(([x, y, r]) => `M${gh1(x - r)} ${gh1(y)}a${gh1(r)} ${gh1(r)} 0 1 0 ${gh1(2 * r)} 0` +
  `a${gh1(r)} ${gh1(r)} 0 1 0 ${gh1(-2 * r)} 0`).join(''), c, o);
// swap colour roles in a drawing ({w: 'v1'}: white becomes light purple)
const hopTint = (svg, map) => svg.replace(/var\(--a-([a-z]\d?)\)/g, (m, r) => `var(--a-${map[r] || r})`);
// a cloud floor w tiles wide and dep tiles deep, as a thick 2.5D block lit from the top left (G-04b2): a flat top face seen a
// little from above with a puffy back rim and a light front edge, a shaded side face with puffs underneath, a soft dark band
// under the top's lip; crack: a crumbling cloud (dashed cracks on the side). pal = [base, shade, deep]; the walking surface is y 10
function hopCloudArt(w, dep, pal, crack) {
  const W = w * 40, D = Math.max(34, dep * 40 - 4), top = [], bot = [];
  const nt = Math.max(1, Math.round(W / 26)), nb = Math.max(1, Math.round(W / 26));
  for (let i = 0; i < nt; i++) top.push([8 + (i + .5) * W / nt, 7, Math.min(8, W / nt * .5)]);
  for (let i = 0; i < nb; i++) bot.push([8 + (i + .5) * W / nb, 4 + D, Math.min(13, W / nb * .62)]);
  const sh = (l, dx, dy) => l.map(([x, y, r]) => [x + dx, y + dy, r]);
  let s = hopPuffs(sh(bot, 2, 4), pal[2]) + ghR(10, 16, W - 2, D - 10, 14, pal[2]) + hopPuffs(bot, pal[1]) + ghR(8, 14, W, D - 12, 14, pal[1]);
  // a tall cloud: puffy sides and a side face that darkens toward the bottom
  if (D > 60) {
    const side = [];
    for (let y = 34; y < D - 6; y += 24) side.push([10, y, 8], [6 + W, y + 12, 8]);
    s += hopPuffs(side, pal[1]);
    for (let k = 0; k < 3; k++) s += ghR(8, 14 + (D - 12) * (.35 + k * .2), W, (D - 12) * (.65 - k * .2), 14, pal[2], .2);
  }
  s += ghR(12, 19, W - 8, 6, 3, pal[2], .45) + hopPuffs(sh(top, 1, 1), pal[1]) + hopPuffs(top, pal[0]) + ghR(8, 5, W, 14, 7, pal[0]) +
    ghR(10, 15.5, W - 4, 2.4, 1.2, 'w', .7) + ghE(8 + Math.min(W * .22, 20), 5, Math.min(W * .16, 12), 2.2, 'w', .5);
  if (crack) {
    let d = '';
    for (let x = 22; x < W - 6; x += 30) d += `M${x} 22l5 7l-4 6l6 8`;
    s += ghL(d, 'k2', 1.6, .35) + ghR(8, 5, W, 3, 1.5, 'o1', .7);
  }
  return s;
}
// a bridge: wood planks on rope rails, or a rainbow bridge in the last world (the walking surface is y 10)
function hopBridgeArt(w, rainbow) {
  const W = w * 40, H = ['r', 'o', 'y', 'g', 'b', 'v'];
  let s = ghR(10, 15, W, 12, 4, 'n3') + ghR(8, 12, W, 12, 4, rainbow ? 'v2' : 'n2');
  if (rainbow) for (let i = 0; i < 6; i++) s += ghR(8, 10 + i * 2.2, W, 2.6, 0, H[i]);
  else for (let x = 8; x < 4 + W; x += 14) s += ghR(x + 1, 10, 12, 11, 2, 'n') + ghR(x + 2, 11, 6, 2.6, 1, 'n1', .9);
  if (rainbow) s += ghR(8, 10, W, 3, 1, 'w', .5);
  return s;
}
const HOP_ART = {
  // a flower spring: a coiled green stem and a big pink flower to bounce on (48 x 48, the floor at the bottom)
  spring: () => ghShad(25, 46, 14, 2.2) + ghL('M24 46C14 42 34 38 24 34C14 30 34 26 24 22', 'g2', 4.4) +
    ghL('M23 45C13 41 33 37 23 33C13 29 33 25 23 21', 'g', 3) + ghE(14, 38, 6, 3, 'g', 1, -30) + ghE(34, 30, 6, 3, 'g2', 1, 30) +
    hopPuffs([[12, 16, 7], [36, 16, 7], [18, 9, 7], [30, 9, 7], [24, 19, 7]], 'p2') + hopPuffs([[11, 14, 6], [35, 14, 6], [17, 7, 6], [29, 7, 6]], 'p') +
    ghBall(24, 14, 6.5, 'y') + ghE(15, 11, 3, 1.6, 'w', .6, -30),
  // a friendly puff: a round little cloud with a face (48 x 48)
  puff: () => hopPuffs([[26, 28, 16], [14, 30, 10], [38, 30, 10]], 'w3') + hopPuffs([[24, 25, 16], [12, 28, 10], [36, 28, 10], [24, 14, 9]], 'w') +
    hopPuffs([[17, 26, 2.6], [31, 26, 2.6]], 'k2') + ghC(16.2, 25, 1, 'w') + ghC(30.2, 25, 1, 'w') + ghE(12, 32, 3.4, 2, 'p1', .9) +
    ghE(36, 32, 3.4, 2, 'p1', .9) + ghL('M20 32Q24 36 28 32', 'k2', 1.8) + ghE(17, 14, 5, 2.4, 'w2', .6, -20),
  star: () => rwStud(20, 21, 15) + rwSpark(33, 7, 4, 'w', .9),
  spark: () => rwSpark(13, 13, 11, 'y2') + rwSpark(12, 12, 10, 'y') + rwSpark(12, 12, 4.5, 'w', .9),
  // a checkpoint flag on a short pole, pale before you reach it, green after (40 x 80)
  flag: on => ghShad(12, 78, 9, 2) + ghR(10, 12, 5, 66, 2, 'e2') + ghR(10, 12, 3, 66, 1.5, 'e') + ghBall(12.5, 10, 4.5, 'y') +
    ghP('M15 16Q28 20 38 18Q30 26 38 34Q28 32 15 36Z', on ? 'g2' : 'e1') + ghP('M15 15Q27 18 35 17Q28 24 35 31Q26 30 15 33Z', on ? 'g' : 'w2') +
    ghE(21, 20, 4, 1.6, 'w', .55, 10),
  // the goal: a big checkered flag (80 x 140)
  goal: () => {
    const sq = [];
    for (let r = 0; r < 4; r++) for (let k = 0; k < 5; k++) if ((r + k) % 2) sq.push(`M${20 + k * 11} ${14 + r * 10}h11v10h-11Z`);
    return ghShad(18, 136, 14, 3) + ghR(14, 8, 7, 128, 3, 'e2') + ghR(14, 8, 4.5, 128, 2, 'e') + ghBall(17.5, 7, 6.5, 'y') +
      ghR(22, 16, 55, 40, 3, 'k') + ghR(20, 14, 55, 40, 3, 'w') + ghP(sq.join(''), 'k2') + ghE(30, 17, 8, 2, 'w', .5);
  },
  // a switch: a round button on a little base (48 x 24): red until pressed, then green and pressed down
  pad: on => ghShad(24, 22, 20, 2.2) + ghR(4, 14, 40, 9, 4, 'e2') + ghR(4, 13, 38, 7, 4, 'e') +
    (on ? ghE(24, 13, 13, 3.6, 'g2') + ghE(23, 12, 12, 3, 'g') : ghE(24, 11, 13, 6, 'r2') + ghE(23, 9, 12, 5, 'r') + ghE(19, 7, 5, 1.6, 'w', .6)),
  // a gate: candy-striped posts; closed, three bars between them (40 x 140, the floor at the bottom)
  gate: open => {
    let s = ghShad(20, 138, 18, 2.4);
    for (const x of [4, 28]) {
      s += ghR(x + 1.5, 6, 9, 132, 4, 'p2') + ghR(x, 4, 8, 132, 4, 'w');
      let d = '';
      for (let y = 10; y < 130; y += 18) d += `M${x} ${y}h8v6l-8 4Z`;
      s += ghP(d, 'p') + ghBall(x + 4, 4, 5.5, 'p');
    }
    if (!open) for (const y of [26, 62, 98]) s += ghR(8, y + 2, 26, 9, 4, 'y2') + ghR(7, y, 26, 8, 4, 'y') + ghR(10, y + 1, 12, 2, 1, 'w', .6);
    return s;
  },
  // a kite flying from a kite cloud (40 x 80; the string ends at the bottom left)
  kite: () => ghL('M4 78Q14 56 24 30', 'k2', 1.4, .6) + ghP('M25 2L38 18L25 36L13 18Z', 'r2') + ghP('M24 1L36 17L24 33L12 17Z', 'r') +
    ghP('M24 1L24 33L12 17Z', 'o') + ghL('M24 1V33M12 17H36', 'y1', 1.6, .8) + ghL('M24 33Q20 44 26 50Q32 56 26 64', 'b', 2) + ghE(19, 11, 3, 1.4, 'w', .6, -40),
  // the helper balloon: a big smiling balloon with a string to hold (80 x 120)
  balloon: () => ghL('M40 72Q34 92 40 118', 'k2', 1.6, .7) + ghP('M36 70L44 70L40 76Z', 'b3') + ghC(42, 38, 32, 'b2') + ghC(39, 35, 30, 'b') +
    ghE(28, 22, 9, 5, 'w', .6, -35) + ghC(31, 38, 3, 'k2') + ghC(47, 38, 3, 'k2') + ghC(30, 37, 1.1, 'w') + ghC(46, 37, 1.1, 'w') +
    ghE(25, 46, 4, 2.4, 'p1', .9) + ghE(53, 46, 4, 2.4, 'p1', .9) + ghL('M32 48Q39 55 46 48', 'k2', 2.4),
};
/* ---- the worlds' scenery (G-04b2, R-03 K2): 4-5 depth layers a world, each 960 wide and periodic (it wraps) ----
   bd: the backdrop, 960 x 260 (sky things, far islands or mountains; composed once with the sky into one picture, it hardly moves);
   far: 960 x 150 hills; near: 960 x 130 hills with trees, houses or towers; bank: 960 x 120 a bank of clouds. The renderer fades
   each layer toward the sky colour by its distance (atmospheric perspective) and draws each at its own band height. */
// the crest line of a ridge (a light rim along the top of a hill)
const hopCrest = (base, waves) => {
  let d = '';
  for (let x = 0; x <= 960; x += 16) d += `${x ? 'L' : 'M'}${x} ${gh1(rlWave(base, waves, x))}`;
  return d;
};
// a lit hill: a darker copy shifted right for the shade side, the hill, a light rim just inside its crest
const hopHill = (base, waves, bot, c, c2, rimO = .45) => ghP(rlRidge(base, waves, bot, 10, 5), c2) + ghP(rlRidge(base, waves, bot), c) +
  ghL(hopCrest(base + 3, waves), 'w', 3, rimO);
// things in a row along a ridge (kept inside 30..930 so nothing is cut where the layer wraps)
const hopRow = (base, waves, n, f) => {
  let s = '';
  for (let i = 0; i < n; i++) { const x = 30 + (i + .5) * 900 / n + ((i * 37) % 23) - 11; s += f(x, rlWave(base, waves, x) + 3, i); }
  return s;
};
const hopPine = (x, y, s, c) => ghP(`M${gh1(x + 2 * s)} ${gh1(y - 30 * s)}L${gh1(x + 13 * s)} ${gh1(y)}L${gh1(x - 9 * s)} ${gh1(y)}Z`, c + '2') +
  ghP(`M${gh1(x)} ${gh1(y - 30 * s)}L${gh1(x + 10 * s)} ${gh1(y - 1)}L${gh1(x - 10 * s)} ${gh1(y - 1)}Z`, c) + ghR(x - 1.5 * s, y - 2, 3 * s, 4, 0, 'n2');
const hopPalm = (x, y, s) => ghL(`M${x} ${y}Q${gh1(x + 6 * s)} ${gh1(y - 14 * s)} ${gh1(x + 2 * s)} ${gh1(y - 28 * s)}`, 'n', 3 * s) +
  hopPuffs([[x - 6 * s, y - 28 * s, 6 * s], [x + 10 * s, y - 28 * s, 6 * s], [x + 2 * s, y - 32 * s, 6 * s]], 'g2') +
  hopPuffs([[x - 5 * s, y - 30 * s, 5 * s], [x + 9 * s, y - 30 * s, 5 * s], [x + 2 * s, y - 34 * s, 5 * s]], 'g');
const hopHouse = (x, y, s, c) => ghR(x - 9 * s, y - 14 * s, 18 * s, 14 * s, 1, c) + ghP(`M${gh1(x - 11 * s)} ${gh1(y - 13 * s)}L${x} ${gh1(y - 24 * s)}` +
  `L${gh1(x + 11 * s)} ${gh1(y - 13 * s)}Z`, c + '2') + ghR(x - 4 * s, y - 10 * s, 4 * s, 4 * s, .5, 'y1') + ghR(x + 2 * s, y - 10 * s, 4 * s, 4 * s, .5, 'y', .8);
const hopTower = (x, y, s, c, roof) => ghR(x - 7 * s, y - 34 * s, 14 * s, 34 * s, 1, c) + ghR(x + 2 * s, y - 34 * s, 5 * s, 34 * s, 0, c + '2', .5) +
  ghP(`M${gh1(x - 10 * s)} ${gh1(y - 33 * s)}L${x} ${gh1(y - 52 * s)}L${gh1(x + 10 * s)} ${gh1(y - 33 * s)}Z`, roof) +
  ghR(x - 2 * s, y - 26 * s, 4 * s, 7 * s, 2, 'y1') + ghL(`M${x} ${gh1(y - 52 * s)}V${gh1(y - 60 * s)}`, 'e2', 1.4) + ghR(x, y - 60 * s, 7 * s, 4 * s, 0, 'p');
const hopMill = (x, y, s) => ghP(`M${gh1(x - 5 * s)} ${y}L${gh1(x - 3 * s)} ${gh1(y - 26 * s)}H${gh1(x + 3 * s)}L${gh1(x + 5 * s)} ${y}Z`, 'w2') +
  ghL(`M${gh1(x - 14 * s)} ${gh1(y - 40 * s)}L${gh1(x + 14 * s)} ${gh1(y - 12 * s)}M${gh1(x - 14 * s)} ${gh1(y - 12 * s)}L${gh1(x + 14 * s)} ${gh1(y - 40 * s)}`, 'w', 3 * s) +
  ghC(x, y - 26 * s, 2.4 * s, 'r');
const hopLolly = (x, y, s) => ghL(`M${x} ${y}V${gh1(y - 20 * s)}`, 'w', 2 * s) + ghBall(x, y - 26 * s, 8 * s, ['p', 'y', 'c', 'v'][Math.round(x) % 4]) +
  ghL(`M${gh1(x - 4 * s)} ${gh1(y - 26 * s)}a${gh1(4 * s)} ${gh1(4 * s)} 0 1 1 ${gh1(4 * s)} ${gh1(4 * s)}`, 'w', 1.6 * s, .8);
// a floating island: a grassy top on a rock that tapers down, with something on top
const hopIsle = (x, y, s, top, rock, on = '') => ghP(`M${gh1(x - 34 * s)} ${y}Q${gh1(x - 22 * s)} ${gh1(y + 30 * s)} ${gh1(x + 2 * s)} ${gh1(y + 50 * s)}` +
  `Q${gh1(x + 22 * s)} ${gh1(y + 28 * s)} ${gh1(x + 34 * s)} ${y}Z`, rock + '2') +
  ghP(`M${gh1(x - 34 * s)} ${y}Q${gh1(x - 22 * s)} ${gh1(y + 26 * s)} ${gh1(x - 4 * s)} ${gh1(y + 44 * s)}Q${gh1(x + 4 * s)} ${gh1(y + 20 * s)} ${gh1(x + 10 * s)} ${y}Z`, rock) +
  ghE(x, y, 35 * s, 7 * s, top + '2') + ghE(x - 1, y - 1.5 * s, 34 * s, 6 * s, top) + ghE(x - 14 * s, y - 3 * s, 10 * s, 2 * s, top + '1', .8) + on;
const hopRbow = (x, y, r, w, o) => ['r', 'o', 'y', 'g', 'b', 'v'].map((c, i) => ghL(`M${x - r + i * w} ${y}A${r - i * w} ${r - i * w} 0 0 1 ${x + r - i * w} ${y}`, c, w, o)).join('');
const hopAurora = () => ghP('M0 70C120 30 220 110 360 60S600 20 720 80S900 40 960 70V100C860 80 760 120 640 100S400 70 300 110S80 80 0 100Z', 'g1', .35) +
  ghP('M0 110C160 80 260 140 420 100S700 70 820 120S940 100 960 110V128C860 120 720 150 560 130S280 120 160 140S40 120 0 128Z', 'c1', .3);
const HOP_SCENE = {
  meadow: {
    sky: () => ghSun(50, 50, 24),
    bd: () => ghCloud(140, 40, 1.4) + ghCloud(520, 70, 1.8) + ghCloud(820, 30, 1.2) + hopIsle(300, 110, .6, 'g', 'n') +
      hopIsle(720, 70, .45, 'g', 'n', ghTree(720, 66, .6)) + hopHill(236, [[14, 3, .5], [8, 7, 1.2]], 260, 'b1', 'b2', .3),
    far: () => hopHill(70, [[16, 2, .4], [9, 5, 1.1]], 150, 'g1', 'g', .5) + hopRow(70, [[16, 2, .4], [9, 5, 1.1]], 9, (x, y) => ghTree(x, y, .8)),
    near: () => hopHill(64, [[12, 3, 1.4], [6, 8, .3]], 130, 'g', 'g2') + hopRow(64, [[12, 3, 1.4], [6, 8, .3]], 7, (x, y) => ghTree(x, y, 1.4)),
    bank: () => hopBank(70, 'w', 'w2'),
  },
  peaks: {
    sky: () => ghSun(50, 50, 20),
    bd: () => {
      const m = [[46, 3, .2], [24, 6, 1.4], [10, 11, .5]];
      return ghCloud(240, 40, 1.3) + ghCloud(760, 60, 1.1) + ghP(rlRidge(170, m, 260, 8, 5), 'b2') + ghP(rlRidge(170, m, 260), 'b1') + ghP(rlCap(170, m, 12), 'w', .85);
    },
    far: () => {
      const m = [[30, 2, 1], [14, 5, .2], [6, 9, 2]];
      return hopHill(70, m, 150, 'c1', 'c') + ghP(rlCap(70, m, 8), 'w');
    },
    near: () => hopHill(70, [[10, 3, .6], [6, 7, 2]], 130, 'g2', 'g3') + hopRow(70, [[10, 3, .6], [6, 7, 2]], 14, (x, y) => hopPine(x, y, 1, 'g')),
    bank: () => hopBank(66, 'w', 'w2'),
  },
  night: {
    sky: () => ghC(50, 50, 30, 'y1', .22) + `<path ${ghF('m')} d="M46 26a24 24 0 1 0 22 34a19 19 0 0 1 -22 -34Z"/>`,
    bd: () => rlStars(60) + hopTint(ghCloud(420, 150, 1.3) + ghCloud(820, 120, 1), { w: 'v1', w2: 'v' }) + hopIsle(220, 130, .6, 'v', 'v') +
      hopIsle(640, 160, .5, 'v', 'v', hopHouse(640, 157, .7, 'v')),
    far: () => hopHill(76, [[10, 3, .7], [6, 8, 2]], 150, 'v2', 'v3', .25),
    near: () => hopHill(72, [[12, 2, 1.2], [5, 6, .4]], 130, 'v3', 'k2', .2) + hopRow(72, [[12, 2, 1.2], [5, 6, .4]], 6, (x, y) => hopHouse(x, y, 1.3, 'v')),
    bank: () => hopBank(72, 'v1', 'v'),
  },
  rainbow: {
    sky: () => ghSun(50, 50, 22),
    bd: () => hopRbow(480, 260, 300, 10, .55) + ghCloud(180, 220, 1.8) + ghCloud(790, 220, 1.8) + ghCloud(500, 90, 1.1) +
      hopIsle(120, 120, .7, 'p', 'v', hopLolly(120, 116, .9)),
    far: () => hopHill(74, [[14, 2, 1], [7, 6, .2]], 150, 'p1', 'p'),
    near: () => hopHill(70, [[12, 3, .2], [5, 7, 1.6]], 130, 'g1', 'g') + hopRow(70, [[12, 3, .2], [5, 7, 1.6]], 9, (x, y) => hopLolly(x, y, 1.3)),
    bank: () => hopBank(70, 'w', 'w2'),
  },
  sunset: {
    sky: () => ghC(50, 50, 46, 'o1', .3) + ghBall(50, 50, 30, 'o'),
    bd: () => hopTint(ghCloud(160, 60, 1.6) + ghCloud(600, 40, 1.2) + ghCloud(860, 90, 1.4), { w: 'p1', w2: 'o1' }) +
      hopIsle(360, 130, .7, 't', 'o', hopPalm(366, 127, .8)) + hopIsle(760, 160, .5, 't', 'o') + hopHill(240, [[10, 3, .3], [6, 6, 1]], 260, 'o1', 'o'),
    far: () => hopHill(74, [[12, 2, 2], [8, 5, .7]], 150, 'p1', 'p', .4),
    near: () => hopHill(76, [[9, 3, .9], [6, 6, .1]], 130, 't', 't2') + hopRow(76, [[9, 3, .9], [6, 6, .1]], 6, (x, y) => hopPalm(x, y, 1.4)),
    bank: () => hopBank(70, 'm1', 'm'),
  },
  whirl: {
    sky: () => ghSun(50, 50, 20),
    bd: () => {
      const m = [[36, 2, 1.7], [18, 5, .3], [8, 12, 1]];
      return ghCloud(120, 50, 1.2) + ghCloud(470, 30, 1.6) + ghCloud(800, 70, 1.3) + ghP(rlRidge(180, m, 260, 8, 5), 'b2') + ghP(rlRidge(180, m, 260), 'b1') +
        ghP(rlCap(180, m, 10), 'w', .85);
    },
    far: () => hopHill(72, [[12, 2, .2], [8, 6, 1.4]], 150, 'g1', 'g') + hopRow(72, [[12, 2, .2], [8, 6, 1.4]], 4, (x, y) => hopMill(x, y, 1.1)),
    near: () => hopHill(66, [[12, 3, 1.1], [5, 8, .6]], 130, 'g', 'g2') + hopRow(66, [[12, 3, 1.1], [5, 8, .6]], 8, (x, y, i) => (i % 2 ? ghTree(x, y, 1.3) : hopPine(x, y, 1, 'g'))),
    bank: () => hopBank(68, 'w', 'w2'),
  },
  aurora: {
    sky: () => ghC(50, 50, 22, 'w', .25) + ghC(50, 50, 16, 'm'),
    bd: () => {
      const m = [[40, 3, .9], [20, 6, .1], [9, 13, 1.3]];
      return rlStars(70) + hopAurora() + ghP(rlRidge(196, m, 260, 8, 5), 'b3') + ghP(rlRidge(196, m, 260), 'b2') + ghP(rlCap(196, m, 22), 'c1', .8);
    },
    far: () => {
      const m = [[24, 2, .4], [12, 5, 1.6]];
      return hopHill(72, m, 150, 'c2', 'c3', .3) + ghP(rlCap(72, m, 12), 'c1');
    },
    near: () => hopHill(74, [[10, 3, 2], [5, 7, .5]], 130, 'b3', 'k2', .2) + hopRow(74, [[10, 3, 2], [5, 7, .5]], 15, (x, y) => hopPine(x, y, 1.1, 'b')),
    bank: () => hopBank(72, 'c1', 'c'),
  },
  castle: {
    sky: () => ghSun(50, 50, 20),
    bd: () => ghCloud(160, 50, 1.4) + ghCloud(820, 40, 1.2) + hopRbow(700, 230, 160, 7, .4) +
      hopIsle(420, 160, 1, 'v', 'e', hopTower(400, 156, 1.1, 'w', 'v') + hopTower(440, 156, .8, 'w', 'p')),
    far: () => hopHill(74, [[12, 2, .8], [7, 6, 2]], 150, 'v1', 'v'),
    near: () => hopHill(70, [[12, 3, 1.5], [5, 7, .3]], 130, 'p1', 'p') + hopRow(70, [[12, 3, 1.5], [5, 7, .3]], 5, (x, y, i) => hopTower(x, y, 1.1, 'w', ['v', 'p', 'b'][i % 3])),
    bank: () => hopBank(70, 'w', 'w2'),
  },
};
// what goes in the sky now and then: a drifting cloud, a bird (two wing pictures), a firefly
const HOP_DECO = {
  drift: () => ghCloud(60, 30, 1.6),
  bird0: () => ghL('M3 12Q10 3 18 10Q26 3 33 12', 'k2', 2.6, .75),
  bird1: () => ghL('M3 7Q10 15 18 10Q26 15 33 7', 'k2', 2.6, .75),
  shadow: () => ghE(40, 12, 38, 11, 'k', .07) + ghE(40, 12, 28, 8, 'k', .08) + ghE(40, 12, 18, 5, 'k', .1),
  glint: () => rwSpark(20, 20, 18, 'w', .95),
  key: () => ghL('M12 22a7 7 0 1 0 0.1 0', 'y2', 6) + ghL('M12 21a7 7 0 1 0 0.1 0', 'y', 4.4) + ghR(18, 18, 18, 5, 2, 'y2') + ghR(18, 17, 17, 4.4, 2, 'y') +
    ghR(30, 20, 3.4, 7, 1, 'y') + ghR(24, 20, 3.4, 5, 1, 'y') + ghE(8, 16, 2.6, 1.4, 'w', .7, -40),
  // a door in a cloud-stone arch: closed (a wooden door with a keyhole) or open (swung back) (40 x 140, the floor at the bottom)
  door: open => ghShad(20, 138, 18, 2.4) + ghP('M0 140V30A20 22 0 0 1 40 30V140Z', 'e2') + ghP('M2 140V32A18 20 0 0 1 38 32V140Z', 'e1') +
    (open ? ghP('M7 140V36A13 15 0 0 1 33 36V140Z', 'v3') + ghR(26, 34, 7, 104, 2, 'n2') + ghR(27, 34, 4, 104, 2, 'n') :
      ghP('M6 140V36A14 16 0 0 1 34 36V140Z', 'n2') + ghP('M6 140V36A13 15 0 0 1 32 36V140Z', 'n') + ghL('M14 34V140M24 32V140', 'n2', 1.6, .7) +
      ghC(20, 86, 4, 'k2') + ghR(18.5, 87, 3, 8, 1, 'k2') + ghBall(28, 96, 3, 'y') + ghE(12, 44, 3, 6, 'n1', .5)),
};
// pet costumes (200 x 200, drawn behind the pet with its picture; the pet's feet at y 184, its middle about x 100)
const hopCape = (cs, o = 1) => cs.map((c, i) => ghP(`M${70 + i * 3} ${104 + i * 3}Q100 ${96 + i * 3} ${130 - i * 3} ${104 + i * 3}L${150 - i * 4} ${178 - i * 3}` +
  `Q100 ${190 - i * 4} ${50 + i * 4} ${178 - i * 3}Z`, c, o)).join('');
const hopWing = (x, y, rx, ry, a, c) => ghE(x, y, rx, ry, c + '2', .9, a) + ghE(x - 1, y - 1, rx * .9, ry * .86, c, .9, a) + ghE(x - rx * .3, y - ry * .3, rx * .3, ry * .2, 'w', .7, a);
const HOP_COSTUME = {
  leaf: () => hopCape(['g2', 'g']) + ghL('M100 104V180M100 130L78 150M100 130L122 150M100 158L84 172M100 158L116 172', 'g3', 2, .6),
  cape: () => hopCape(['r2', 'r']) + ghE(84, 112, 10, 4, 'r1', .6, -10),
  bal: () => ghL('M118 112Q130 70 150 46M118 112Q150 80 176 64M118 112Q128 86 132 70', 'k2', 1.4, .7) + ghBall(150, 34, 14, 'r') + ghBall(176, 52, 13, 'b') +
    ghBall(132, 58, 12, 'y'),
  bfly: () => hopWing(64, 96, 30, 16, -35, 'c') + hopWing(136, 96, 30, 16, 35, 'c') + hopWing(70, 132, 20, 11, 30, 'p') + hopWing(130, 132, 20, 11, -30, 'p'),
  kite: () => ghL('M80 150C60 130 50 160 30 140S10 150 0 132', 'k2', 2, .7) + ['r', 'y', 'b'].map((c, i) => ghP(`M${54 - i * 22} 140l10-10l3 13Z`, c + '2') + ghP(`M${54 - i * 22} 140l9-9l1 8Z`, c)).join(''),
  brolly: () => ghL('M128 150V44', 'n2', 4) + hopPuffs([[86, 40, 18], [114, 32, 22], [142, 32, 22], [170, 40, 18]], 'w2') +
    hopPuffs([[86, 36, 18], [114, 28, 22], [142, 28, 22], [170, 36, 18]], 'w') + ghE(104, 22, 10, 4, 'w', .9, -10),
  jet: () => ghR(44, 102, 40, 58, 14, 'c2') + ghR(42, 100, 38, 56, 13, 'c') + ghR(50, 106, 10, 30, 5, 'c1', .8) + ghC(52, 172, 6, 'w', .9) + ghC(70, 176, 5, 'w', .8) +
    ghC(60, 188, 4, 'w', .7),
  halo: () => [0, 1, 2, 3, 4].map(i => { const a = i * 1.257, x = 100 + Math.cos(a) * 34, y = 22 + Math.sin(a) * 9; return `<path ${ghF('y2')} d="${rwStarD(x + 1, y + 1, 8, 4)}"/><path ${ghF('y')} d="${rwStarD(x, y, 8, 4)}"/>`; }).join(''),
  dragon: () => ['M78 112L20 64L36 100L8 102L40 124L22 140L74 136Z', 'M122 112L180 64L164 100L192 102L160 124L178 140L126 136Z'].map(d => ghP(d, 'v2')).join('') +
    ghP('M78 110L26 70L40 102L16 106L44 124L30 136L74 132Z', 'v') + ghP('M122 110L174 70L160 102L184 106L156 124L170 136L126 132Z', 'v'),
  rbow: () => hopCape(['v2', 'v', 'b', 'g', 'y', 'o', 'r']),
};
// a bank of clouds along the bottom of a layer
function hopBank(y, c1, c2) {
  const a = [], b = [];
  for (let x = 0; x <= 960; x += 60) {
    const r = 26 + ((x * 7) % 5) * 6;
    a.push([x + 3, y + 4, r]);
    b.push([x, y, r]);
  }
  return hopPuffs(a, c2) + ghR(0, y + 4, 960, 120, 0, c2) + hopPuffs(b, c1) + ghR(0, y + 10, 960, 120, 0, c1);
}
// the Game Room card (240 x 100): a little green critter mid-hop between clouds, a flower spring, a star and the checkered flag
function hopHubArt() {
  const cl = (x, y, w) => hopPuffs([[x + 8, y + 9, 8], [x + w - 8, y + 9, 8]], 'w3') + ghR(x, y, w, 12, 6, 'w2') + ghR(x, y - 2, w - 2, 9, 5, 'w') +
    hopPuffs([[x + w * .3, y - 1, 6], [x + w * .65, y - 2, 5]], 'w');
  const sq = 'M206 14h5.5v4.7h-5.5ZM217 14h5.5v4.7h-5.5ZM211.5 18.7h5.5v4.6h-5.5ZM222.5 18.7h5.5v4.6h-5.5ZM206 23.3h5.5v4.7h-5.5ZM217 23.3h5.5v4.7h-5.5Z';
  return ghCloud(46, 24, .6) + cl(14, 80, 74) + cl(148, 60, 80) + `<g transform="translate(58 34)">${HOP_ART.spring()}</g>` +
    ghL('M84 58Q96 10 122 30', 'w', 2.6, .9) + ghShad(176, 61, 9, 1.6) +
    ghE(110, 34, 6, 4, 'g2', 1, -30) + ghC(126, 38, 13, 'g2') + ghC(124, 36, 12, 'g') + ghE(126, 42, 7, 6, 'y') + ghE(119, 28, 4, 2.4, 'w', .55, -30) +
    ghC(120, 33, 2.2, 'k2') + ghC(129, 33, 2.2, 'k2') + ghC(119.4, 32.2, .8, 'w') + ghC(128.4, 32.2, .8, 'w') + ghL('M121 39Q124.5 42 128 39', 'k2', 1.4) +
    ghE(117, 38, 2.2, 1.3, 'p1', .9) + ghE(132, 38, 2.2, 1.3, 'p1', .9) +
    `<path ${ghF('y2')} d="${rwStarD(158, 20, 9, 4.5)}"/><path ${ghF('y')} d="${rwStarD(157, 19, 8, 4)}"/>` + ghShad(206, 59, 7, 1.4) +
    ghR(202, 12, 3, 46, 1.5, 'e2') + ghBall(203.5, 11, 3, 'y') + ghR(207, 15, 22, 14, 1, 'k') + ghR(206, 14, 22, 14, 1, 'w') + ghP(sq, 'k2');
}
// a world's picture for the menu (its layers over the sky colours)
const hopWorldPic = w => {
  const L = HOP_SCENE[w.id];
  return `<svg class="art" viewBox="0 0 960 200" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">` +
    `<g transform="translate(0 -96)">${L.bd()}</g><g transform="translate(0 70)">${L.far()}</g><g transform="translate(0 104)">${L.near()}</g>` +
    `<g transform="translate(0 150)">${L.bank()}</g></svg>`;
};

/* ---- the save (S.hop): read with defaults, every value checked ---- */
const hopNum = (v, lo, hi) => Math.max(lo, Math.min(hi, Math.floor(+v || 0)));
const hopObj = v => (v && typeof v == 'object' && !Array.isArray(v) ? v : {});
const HOP_TRAILS = [['none', 'No trail', 0, ''], ['sun', 'Sunshine', 3, 'y'], ['pink', 'Bubblegum', 9, 'p'], ['sky', 'Sky blue', 18, 'c'],
  ['leaf', 'Leafy', 30, 'g'], ['grape', 'Grape', 45, 'v'], ['rainbow', 'Rainbow', 60, 'r']]; // [id, name, stars needed, hue]
function hopS() {
  const r = (S.hop = hopObj(S.hop)), keep = (o, lo, hi) => {
    const out = {};
    for (const c of HOP_COURSES) if (o[c.id] != null && hopNum(o[c.id], lo, hi) > 0) out[c.id] = hopNum(o[c.id], lo, hi);
    return out;
  };
  r.runs = hopNum(r.runs, 0, 1e7);
  r.best = keep(hopObj(r.best), 0, 36e5);
  r.stars = keep(hopObj(r.stars), 0, 7);
  r.medal = keep(hopObj(r.medal), 0, 3);
  if (r.mode !== 'one' && r.mode !== 'free') r.mode = (S.grade == null ? 0 : +S.grade) <= 2 ? 'one' : 'free';
  const tr = HOP_TRAILS.find(t => t[0] === r.trail);
  if (!tr || hopStarsAll(r) < tr[2]) r.trail = 'none';
  if (!HOP_BY[r.cur] || !hopOpen(HOP_BY[r.cur], r)) r.cur = (HOP_COURSES.find(c => hopOpen(c, r) && !r.best[c.id]) || HOP_COURSES[0]).id;
  const nw = HOP_WORLDS.length - 1;
  r.world = hopOpen(HOP_COURSES[hopNum(r.world, 0, nw) * 6], r) ? hopNum(r.world, 0, nw) : HOP_BY[r.cur].w;
  // G-04b2: ghosts of the best runs (only for finished courses), costumes, stars spent and earned, today's twist
  const gh = hopObj(r.ghost);
  r.ghost = {};
  for (const id in gh) if (r.best[id] && HOP_BY[id] && hopGhostIn(gh[id])) r.ghost[id] = gh[id];
  const own = hopObj(r.own);
  if (own['fai' + 'ry']) { own.bfly = 1; if (r.wear === 'fai' + 'ry') r.wear = 'bfly'; } // the wings' old id (saves before v167)
  r.own = {};
  for (const w of HOP_WEAR) if (own[w[0]]) r.own[w[0]] = 1;
  r.bonus = hopNum(r.bonus, 0, 1e6);
  r.spent = hopNum(r.spent, 0, 1e6);
  if (!r.own[r.wear]) r.wear = 'none';
  const d = hopObj(r.day);
  r.day = typeof d.k == 'string' && HOP_BY[d.c] && HOP_TWB[d.tw] ? { k: d.k, c: d.c, tw: d.tw, done: d.done ? 1 : 0 } : {};
  // G-MOVES: mv (1 once the Dash card was seen), bs (the sky races: {worldIndex: {n: races not won, w: wins}})
  if (r.mv !== 1) delete r.mv;
  r.bs = GH.bossRec(r.bs, k => /^[0-9]$/.test(k) && +k < HOP_BOSS.length);
  return r;
}
// today's twist (made once a day from the date and kept, so finishing a course today does not change it)
function hopToday(r) {
  const k = today();
  if (r.day.k !== k) {
    const n = HOP_COURSES.findIndex(c => !r.best[c.id]);
    r.day = Object.assign({ k, done: 0 }, hopDaily(k, n < 0 ? HOP_COURSES.length : n));
  }
  return r.day;
}
const hopGolds = (r = hopPeek()) => HOP_COURSES.filter(c => hopNum(hopObj(r.medal)[c.id], 0, 3) == 3).length;
// stars to spend: found + gold medals + twist bonus - spent (never below 0)
const hopWallet = r => Math.max(0, hopStarsAll(r) + hopGolds(r) + hopNum(r.bonus, 0, 1e6) - hopNum(r.spent, 0, 1e6));
function hopBuy(r, id) {
  const w = HOP_WEARB[id];
  if (!w || r.own[id] || hopWallet(r) < w[2]) return false;
  r.spent += w[2];
  r.own[id] = 1;
  r.wear = id;
  return true;
}
const hopPeek = () => (S.hop && typeof S.hop == 'object' && !Array.isArray(S.hop) ? S.hop : {});
const hopBits = v => (v & 1) + (v >> 1 & 1) + (v >> 2 & 1);
const hopStarsAll = (r = hopPeek()) => HOP_COURSES.reduce((a, c) => a + hopBits(hopNum(hopObj(r.stars)[c.id], 0, 7)), 0);
const hopDone = (r = hopPeek()) => HOP_COURSES.filter(c => hopNum(hopObj(r.best)[c.id], 0, 36e5) > 0).length;
// a course opens when the one before it is finished
const hopOpen = (c, r = hopPeek()) => !c.i || hopNum(hopObj(r.best)[HOP_COURSES[c.i - 1].id], 0, 36e5) > 0;
const hopTime = ms => (ms / 1000).toFixed(1) + ' s';
// the menu's "Next goal" line: the next course, then missing stars, then gold medals, then a costume to save for, then ghosts
function hopGoal(r) {
  const nx = HOP_COURSES.find(c => !r.best[c.id]);
  if (nx) {
    const after = HOP_COURSES[nx.i + 1];
    if (!nx.i) return `Hop to the flag on ${nx.name}.`;
    if (!after) return `Finish ${nx.name}, the very last course!`;
    if (HOP_WORLDS[after.w].s2 && !HOP_WORLDS[nx.w].s2) return `Finish ${nx.name} to start Season 2!`;
    return after.w != nx.w ? `Finish ${nx.name} to open ${HOP_WORLDS[after.w].name}.` : `Finish ${nx.name} to open ${after.name}.`;
  }
  const st = HOP_COURSES.find(c => hopBits(r.stars[c.id] || 0) < 3);
  if (st) return `Find the ${3 - hopBits(r.stars[st.id] || 0) == 1 ? 'last star' : 'missing stars'} on ${st.name}.`;
  const md = HOP_COURSES.find(c => (r.medal[c.id] || 0) < 3);
  const w = HOP_WEAR.find(x => !r.own[x[0]]), cash = hopWallet(r);
  if (w && cash >= w[2]) return `You have ${cash} stars: get the ${w[1]} for your pet!`;
  if (md) return `Win gold on ${md.name}: be quicker than ${hopGold(md)} s.`;
  if (w) return `Save ${w[2] - cash} more stars for the ${w[1]}. Play today's twist for bonus stars!`;
  const c = HOP_COURSES[r.runs % HOP_COURSES.length];
  return `Race your ghost on ${c.name}: your best is ${hopTime(r.best[c.id])}.`;
}

/* ---- the renderer: sprites, colours and the canvas ----
   R-03 4.3 (G-04b2): the sky gradient, the sun and the far scenery are composed once into one opaque backdrop picture that slides
   very slowly; the nearer layers are cached each at its own band height (so only that band's pixels are copied each frame) and
   faded toward the horizon colour by distance; platforms, the pet, its costume, its shadow and every particle are cached
   sprites; the canvas has at most 1.2 M pixels and drops to 85 / 70 / 60 % when frames run long (adaptive render scale). */
const HOP_SPR = {};
// an SVG drawing as a canvas pxw pixels wide (cached; .c is set once it has loaded, .p resolves then); fade: [colour, 0-1] mixes
// the picture toward a colour (the far layers toward the sky); ink (GFX-1): a thin outline in a dark shade of its own colours,
// [width in sprite pixels, tone token, mix], baked in once (JFX.ink, 59b-fx.js) so a frame still only stamps it
function hopSprite(key, vw, vh, inner, pxw, fade, ink) {
  const k = key + '@' + Math.round(pxw) + (fade ? fade.join() : '') + (ink ? '~' + ink.join() : '');
  if (HOP_SPR[k]) return HOP_SPR[k];
  const w = Math.max(2, Math.round(pxw)), h = Math.max(2, Math.round(pxw * vh / vw)), s = (HOP_SPR[k] = { c: null, w, h, vw, vh });
  s.p = new Promise(ok => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const x = c.getContext('2d');
      x.drawImage(img, 0, 0, w, h);
      if (fade && fade[1] > 0) {
        x.globalCompositeOperation = 'source-atop';
        x.globalAlpha = fade[1];
        x.fillStyle = fade[0];
        x.fillRect(0, 0, w, h);
      }
      s.c = ink && typeof JFX != 'undefined' ? JFX.ink(c, ink[0], { tone: ink[1], mix: ink[2] }) : c;
      ok();
    };
    img.onerror = () => ok();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${vh}" ` +
      `width="${w}" height="${h}">${rlRes(inner)}</svg>`);
  });
  return s;
}
// the child's pet with its hat and toy: the rig's colours are CSS roles, so they are read from a hidden copy first. Its own
// ground shadow is left out: the course draws a soft shadow on the cloud under the pet that shrinks as it hops (G-04b2)
function hopPetSprite(mood, px) {
  const w = S.wear || {}, key = ['pet', S.pet, stage(S.stars), mood, w.hat || '', w.toy || ''].join('-');
  const ink = HOP_INK.hero(px), memo = key + '@' + px + '~' + ink.join(); // the same key hopSprite keeps it under
  if (HOP_SPR[memo]) return HOP_SPR[memo];
  let inner = '';
  try {
    const host = document.createElement('div');
    host.style.cssText = 'position:absolute;left:-9999px;top:0;width:200px;height:200px;pointer-events:none';
    host.innerHTML = petSVG(S.pet, stage(S.stars), mood, { hat: wearOf(w.hat), toy: wearOf(w.toy) });
    document.body.appendChild(host);
    const svg = host.querySelector('svg');
    const els = [...svg.querySelectorAll('*')], gone = els.filter(el => getComputedStyle(el).display == 'none' || el.classList.contains('pg-shadow'));
    for (const el of els) {
      if (!/^(path|circle|ellipse|rect|polygon|text)$/.test(el.tagName)) continue;
      const cs = getComputedStyle(el);
      if (el.getAttribute('fill') != 'none') el.setAttribute('fill', cs.fill);
      if (el.getAttribute('stroke') && el.getAttribute('stroke') != 'none') el.setAttribute('stroke', cs.stroke);
    }
    for (const el of els) el.removeAttribute('class'); // only after every colour is read (the wearables' roles come from their class)
    for (const el of gone) el.remove();
    inner = svg.innerHTML;
    host.remove();
  } catch (e) {}
  return hopSprite(key, 200, 200, inner, px, null, ink);
}
// GFX-1 outlines: the hero strongest (about 2.5 px on a tablet), what the child lands on or picks up thinner and cooler
const HOP_INK = {
  hero: px => [Math.max(1.5, Math.round(px / 64 * 10) / 10), '--ill-ink', .72],
  thing: px => [Math.max(1, Math.round(px / 90 * 10) / 10), '--ill-ink', .6],
  cloud: () => [1.6, '--ill-blue-3', .55],
};
// GFX-1: the pet drawn this many tiles wide (about 30 % bigger than before; its feet and the rules are unchanged)
const HOP_PETW = 2.7;
let HP = null; // the course on screen
const hopNow = () => (window.__realNow || (() => performance.now()))();
const hopCalm = () => !!S.calm || (typeof matchMedia == 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches);
// sounds: through tone() and SFX (silent with Sound effects off); softer in calm mode
const hopTone = (f, d, t, type, vol, slide) => tone(f, d, t, type, vol * (hopCalm() ? .6 : 1), slide);
const HOP_DOTS = ['w', 'w2', 'y', 'y1', 'p', 'c', 'g', 'v', 'r', 'o', 'b', 'c1'];
const HOP_DARK = { night: 1, aurora: 1 };
// GFX-1: the things the child lands on or picks up get a thin outline (the hero a stronger one)
const HOP_TOUCH = { spring: 1, puff: 1, star: 1, key: 1, kite: 1, balloon: 1, goal: 1, flag0: 1, flag1: 1 };
// sizes and the pictures at this screen size
function hopSize(R) {
  const cv = R.cv, cw = Math.max(1, cv.clientWidth), ch = Math.max(1, cv.clientHeight);
  const k0 = Math.min(Math.min(1.5, devicePixelRatio || 1), Math.sqrt(1.2e6 / (cw * ch))), k = k0 * (R.q || 1);
  cv.width = Math.round(cw * k);
  cv.height = Math.round(ch * k);
  const C = R.st.C, W = C.W, T0 = Math.min(ch / 9.5, cw / 9), T = T0 * k, sp = T0 * k0; // T: canvas pixels a tile; sp: sprite pixels a tile
  const V = { cw, ch, k, T, sc: (R.q || 1), W: cv.width, H: cv.height, base: Math.round(cv.height * .64), ps: cw < 600 && ch > cw ? 1.4 : 1 };
  V.sky = R.ctx.createLinearGradient(0, 0, 0, V.H * .8);
  W.grad.forEach((g, i) => V.sky.addColorStop(i / (W.grad.length - 1), rlCol(g)));
  const hz = rlCol(W.grad[W.grad.length - 1]), L = HOP_SCENE[W.id], H0 = ch * k0;
  // the backdrop (composed below once it has loaded), then three bands, each faded toward the horizon by its distance
  V.bdh = H0 * .62;
  V.bd = hopSprite('bd-' + W.id, 960, 260, L.bd(), 960 * V.bdh / 260, [hz, .45]);
  V.far = hopSprite('far-' + W.id, 960, 150, L.far(), 960 * Math.max(H0 * .3, 110 * k0) / 150, [hz, .3]);
  // the near hills and the cloud bank in front of them share one band (one copy a frame instead of two)
  V.near = hopSprite('near-' + W.id, 960, 190, L.near() + `<g transform="translate(0 70)">${L.bank()}</g>`, 960 * Math.max(H0 * .34, 120 * k0) / 190, [hz, .06]);
  V.sun = hopSprite('sky-' + W.id, 100, 100, L.sky(), T0 * k0 * 2.2);
  const pal = W.cloud;
  V.fl = C.floors.map(f => {
    if (f.k == 'b') return hopSprite(`br-${W.id}-${f.x1 - f.x0}`, (f.x1 - f.x0) * 40 + 16, 40, hopBridgeArt(f.x1 - f.x0, W.id == 'rainbow'), ((f.x1 - f.x0) + .4) * sp);
    const dep = Math.round((f.dep || 1.2) * 4) / 4, w = f.x1 - f.x0;
    return hopSprite(`cl-${W.id}-${w}-${dep}${f.k == 'q' ? 'q' : ''}`, w * 40 + 16, dep * 40 + 24, hopCloudArt(w, dep, pal, f.k == 'q'), (w + .4) * sp, null,
      HOP_INK.cloud());
  });
  V.mv = C.movers.map(m => hopSprite(`cl-${W.id}-${m.w}-1`, m.w * 40 + 16, 64, hopCloudArt(m.w, 1, pal), (m.w + .4) * sp, null, HOP_INK.cloud()));
  for (const [n, vw, vh, art, wt] of [['spring', 48, 48, HOP_ART.spring(), 1.2], ['puff', 48, 48, HOP_ART.puff(), 1.3], ['star', 40, 40, HOP_ART.star(), 1],
    ['spark', 24, 24, HOP_ART.spark(), .55], ['flag0', 40, 80, HOP_ART.flag(0), 1], ['flag1', 40, 80, HOP_ART.flag(1), 1], ['goal', 80, 140, HOP_ART.goal(), 2],
    ['pad0', 48, 24, HOP_ART.pad(0), 1.2], ['pad1', 48, 24, HOP_ART.pad(1), 1.2], ['gate0', 40, 140, HOP_ART.gate(0), 1],
    ['gate1', 40, 140, HOP_ART.gate(1), 1], ['kite', 40, 80, HOP_ART.kite(), 1], ['balloon', 80, 120, HOP_ART.balloon(), 2],
    ['door0', 40, 140, HOP_DECO.door(0), 1], ['door1', 40, 140, HOP_DECO.door(1), 1], ['key', 40, 40, HOP_DECO.key(), 1], ['glint', 40, 40, HOP_DECO.glint(), 1],
    ['shadow', 80, 24, HOP_DECO.shadow(), 2], ['drift', 120, 60, HOP_DECO.drift(), 3], ['fore', 120, 60, hopTint(HOP_DECO.drift(), { w: pal[0], w2: pal[1] }), 3], ['bird0', 36, 18, HOP_DECO.bird0(), .7], ['bird1', 36, 18, HOP_DECO.bird1(), .7]]) {
    V[n] = hopSprite('h-' + n, vw, vh, art, wt * sp, null, HOP_TOUCH[n] ? HOP_INK.thing(wt * sp) : null);
  }
  V.dot = {};
  for (const c of HOP_DOTS) V.dot[c] = hopSprite('dot-' + c, 24, 24, ghC(12, 12, 12, c, .22) + ghC(12, 12, 8.5, c, .5) + ghC(12, 12, 5.5, c), .5 * sp);
  const ps = Math.round(sp * HOP_PETW * V.ps);
  V.pet = { happy: hopPetSprite('happy', ps), cheer: hopPetSprite('cheer', ps), oops: hopPetSprite('oops', ps) };
  V.cos = HOP_COSTUME[R.r.wear] ? hopSprite('cos-' + R.r.wear, 200, 200, HOP_COSTUME[R.r.wear](), ps, null, HOP_INK.hero(ps)) : null;
  V.col = { w: rlCol('w') };
  V.dark = HOP_DARK[W.id] || R.st.tw == 'lamp';
  R.v = V;
  const all = Object.values(V).flatMap(x => (x && x.p ? [x] : Array.isArray(x) ? x : x && typeof x == 'object' && !(x instanceof CanvasGradient) ? Object.values(x).filter(y => y && y.p) : []));
  const done = () => {
    hopBackdrop(V);
    V.farB = hopBand(V.far, V.sc);
    V.nearB = hopBand(V.near, V.sc);
    if (R.st.tw == 'lamp') hopLamp(V);
    R.ready = true;
  };
  // a new render scale: every picture is already there, so the new backdrop is made at once (no frame without it)
  if (all.every(s => s.c)) return done();
  R.ready = false;
  Promise.all(all.map(s => s.p)).then(() => { if (R.v === V) done(); });
}
// the backdrop: the sky, the sun or moon and the far scenery in one opaque picture one layer-period wide
function hopBackdrop(V) {
  const s = V.bd, w = Math.max(V.W, Math.round(s.w * V.sc)), c = document.createElement('canvas');
  c.width = w;
  c.height = V.H;
  const b = c.getContext('2d', { alpha: false });
  b.fillStyle = V.sky;
  b.fillRect(0, 0, w, V.H);
  hopImg(b, V.sun, V.W * .8 - V.sun.w * V.sc, V.T * 1.3, V.sun.w * V.sc);
  // GFX-1: the far sky is not empty: rows of pale clouds, smaller and fainter higher up (they move with the backdrop, so they cost
  // nothing a frame); on a tall phone screen more rows fill the extra sky
  const d = V.drift;
  if (d && d.c) {
    const rows = V.H > V.W ? 4 : 2, dim = V.dark ? .2 : 1, hs = i => Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
    for (let r = 0; r < rows; r++) {
      const gap = d.w * V.sc * (2.4 - r * .3);
      for (let i = 0, x = -gap * hs(r + 7) * .5; x < w; i++, x += gap) {
        const h = hs(i * 3.1 + r * 17), k = (.42 + r * .14 + h * .2) * V.sc;
        if (h < .22) continue;
        b.globalAlpha = dim * (.3 + r * .1 + h * .1);
        b.drawImage(d.c, Math.round(x + h * gap * .5), Math.round(V.H * (.12 + (r + h * .6) * (.4 / rows))), Math.round(d.w * k), Math.round(d.h * k));
      }
    }
    b.globalAlpha = 1;
  }
  if (s.c) for (let x = 0; x < w; x += s.w * V.sc) b.drawImage(s.c, Math.round(x), Math.round(V.H * .74 - s.h * V.sc), Math.ceil(s.w * V.sc) + 1, Math.ceil(s.h * V.sc));
  V.bg = c;
}
// Lantern night (today's twist): a dark sky-coloured cover with a soft round hole, at half size, drawn round the pet
function hopLamp(V) {
  const c = document.createElement('canvas'), w = Math.ceil(V.W / 2) * 2, h = Math.ceil(V.H / 2) * 2;
  c.width = w;
  c.height = h;
  const x = c.getContext('2d');
  x.fillStyle = rlCol('sc-night');
  x.globalAlpha = .78;
  x.fillRect(0, 0, w, h);
  x.globalAlpha = 1;
  x.globalCompositeOperation = 'destination-out';
  const r = Math.min(w, h) * .2, g = x.createRadialGradient(w / 2, h / 2, r * .35, w / 2, h / 2, r);
  g.addColorStop(0, rlCol('k'));
  g.addColorStop(1, 'transparent');
  x.fillStyle = g;
  x.fillRect(0, 0, w, h);
  V.lamp = c;
}
// draw a picture (a cached canvas) with its top left at x, y and w canvas pixels wide
function hopImg(c, s, x, y, w, h) {
  if (s && s.c) c.drawImage(s.c, Math.round(x), Math.round(y), Math.round(w), Math.round(h || w * s.h / s.w));
}
// a layer across the screen, repeated; y is its bottom
// (a band: a copy made at the canvas's own scale without the layer's empty top rows, so each frame copies it pixel for pixel,
// with no scaling, and only where it has something to show)
function hopTile(c, b, off, y, W) {
  if (!b) return;
  const w = b.w, top = Math.round(y - b.h);
  for (let x = -Math.round(((off % w) + w) % w); x < W; x += w) c.drawImage(b.c, x, top);
}
function hopBand(s, sc) {
  if (!s.c) return null;
  if (s.y0 == null) {
    s.y0 = 0;
    try {
      const d = s.c.getContext('2d').getImageData(0, 0, s.w, s.h).data;
      let y = 0;
      for (; y < s.h; y++) {
        let any = false;
        for (let i = y * s.w * 4 + 3, e = (y + 1) * s.w * 4; i < e; i += 8) if (d[i]) { any = true; break; }
        if (any) break;
      }
      s.y0 = Math.max(0, y - 2);
    } catch (e) {}
  }
  const w = Math.max(1, Math.round(s.w * sc)), h = Math.max(1, Math.round((s.h - s.y0) * sc)), c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  c.getContext('2d').drawImage(s.c, 0, s.y0, s.w, s.h - s.y0, 0, 0, w, h);
  return { c, w, h, full: Math.round(s.h * sc) };
}
// the top of the floor or kite cloud under x at or below y (for the pet's shadow), or null
function hopGround(st, x, y) {
  const C = st.C;
  let g = null;
  for (const j of C.col[Math.max(0, Math.min(C.col.length - 1, Math.floor(x)))] || []) {
    const f = C.floors[j];
    if (x > f.x0 - .2 && x < f.x1 + .2 && f.y <= y + .01 && (g == null || f.y > g) && hopThere(st, j)) g = f.y;
  }
  for (const j of hopNear(C, x).mv) {
    const m = C.movers[j], q = hopMover(m, st.t);
    if (x > q.x - .2 && x < q.x + m.w + .2 && q.y <= y + .05 && (g == null || q.y > g)) g = q.y;
  }
  return g;
}
function hopDraw(R, dt) {
  const c = R.ctx, V = R.v, st = R.st, C = st.C, p = st.p, T = V.T, calm = hopCalm();
  R.tt = (R.tt || 0) + dt;
  const tt = R.tt;
  // the camera: the pet a third in from the left (looking ahead), its feet a little below the middle; it eases along
  const lead = st.mode == 'one' ? .3 : .4, tx = p.x - V.W * lead / T, ty = p.y;
  if (R.cx == null) { R.cx = tx; R.cy = ty; }
  const e = Math.min(1, dt * 6);
  R.cx += (tx - R.cx) * Math.min(1, dt * 10);
  R.cy += (ty - R.cy) * (p.y < R.cy - 3 ? Math.min(1, dt * 12) : e);
  let sx = 0, sy = 0;
  if (R.shake > 0 && !calm) {
    R.shake = Math.max(0, R.shake - dt * 2);
    sx = Math.sin(st.t * 70) * R.shake * T * .25;
    sy = Math.cos(st.t * 55) * R.shake * T * .2;
  }
  const X = x => (x - R.cx) * T + sx, Y = y => V.base - (y - R.cy) * T + sy;
  // 1. the backdrop (sky, sun, far scenery): one opaque picture that slides very slowly
  if (V.bg) {
    const bw = V.bg.width, o = ((R.cx * T * .03) % bw + bw) % bw;
    c.drawImage(V.bg, -Math.round(o), 0);
    if (bw - o < V.W) c.drawImage(V.bg, Math.round(bw - o), 0);
  } else {
    c.fillStyle = V.sky;
    c.fillRect(0, 0, V.W, V.H);
  }
  // 2. what moves in the sky by itself: drifting clouds, birds by day, fireflies by night (not in calm mode)
  if (!calm) {
    const s = V.drift, w = s.w * V.sc;
    hopImg(c, s, V.W - ((tt * T * .3) % (V.W + w)), V.H * .12, w);
    if (V.dark) {
      for (let i = 0; i < 7; i++) {
        c.globalAlpha = .45 + .45 * Math.sin(tt * 2.3 + i * 1.7);
        hopImg(c, V.dot.y1, ((i * .23 + tt * .015 * (1 + i % 3)) % 1) * V.W, V.H * (.3 + ((i * .37) % 1) * .4) + Math.sin(tt + i) * T * .4, T * .35);
      }
      c.globalAlpha = 1;
    } else {
      for (let i = 0; i < 2; i++) {
        const s = V[(Math.floor(tt * 5 + i * 2) % 2) ? 'bird1' : 'bird0'], u = ((tt * .045 + i * .5) % 1.4) - .2;
        hopImg(c, s, u * V.W, V.H * (.16 + i * .08) + Math.sin(tt * 1.5 + i) * T * .25, s.w * V.sc * (1 - i * .2));
      }
    }
  }
  // 3. the hills and the cloud bank, moving slower than the course (they sink a little as the pet climbs)
  const dv = Math.max(-V.H * .04, Math.min(V.H * .1, (R.cy - 2) * T * .06));
  hopTile(c, V.farB, R.cx * T * .12, V.H * .86 + dv, V.W);
  if (V.nearB) hopTile(c, V.nearB, R.cx * T * .3, V.H + dv * 1.5 + V.nearB.full * .08, V.W);
  const x0 = R.cx - 2, x1 = R.cx + V.W / T + 2, vis = (a, b) => b > x0 && a < x1;
  // wind (moving lines) and updrafts (rising dots)
  c.globalAlpha = .5;
  c.fillStyle = V.col.w;
  for (const z of C.winds) {
    if (!vis(z.x0, z.x1)) continue;
    for (let i = 0; i < (z.x1 - z.x0) * 1.5; i++) {
      const L = z.x1 - z.x0, u = ((i * .37 + st.t * z.s * .35) % 1 + 1) % 1, wx = z.x0 + u * L, wy = 2 + ((i * 1.7) % 5) + (C.floors[0].y - 2);
      c.fillRect(X(wx), Y(wy + Math.sin(i) * .4), T * .9, Math.max(1, T * .06));
    }
  }
  for (const z of C.lifts) {
    if (!vis(z.x0, z.x1)) continue;
    for (let i = 0; i < (z.x1 - z.x0) * 2; i++) {
      const u = ((i * .29 + st.t * .5) % 1), wx = z.x0 + ((i * .61) % 1) * (z.x1 - z.x0), wy = z.y0 + 4 + u * (z.y1 - z.y0 - 4);
      hopImg(c, V.dot.w, X(wx + Math.sin(st.t * 3 + i) * .2) - T * .1, Y(wy) - T * .1, T * .2);
    }
  }
  c.globalAlpha = 1;
  // floors (a crumbling cloud shakes, drops and fades, and fades back in), springs, switches, gates and doors, keys, flags
  C.floors.forEach((f, i) => {
    if (!vis(f.x0, f.x1)) return;
    let dx = 0, dy = 0, a = 1;
    const t0 = st.crum[i];
    if (t0 != null) {
      const u = st.t - t0, F = HOP_CR.FALL;
      if (u < F) dx = calm ? 0 : Math.sin(u * 55) * T * .05 * (u / F);
      else if (u < F + .45) { dy = (u - F) * (u - F) * 30 * T; a = 1 - (u - F) / .45; }
      else if (u < HOP_CR.BACK - .45) return;
      else a = 1 - (HOP_CR.BACK - u) / .45;
    }
    c.globalAlpha = Math.max(0, Math.min(1, a));
    hopImg(c, V.fl[i], X(f.x0 - .2) + dx, Y(f.y) - T * .25 + dy, (f.x1 - f.x0 + .4) * T);
  });
  c.globalAlpha = 1;
  for (const s of C.springs) if (vis(s.x - 1, s.x + 1)) {
    const sq = R.boing && R.boing.x == s.x ? 1 - Math.max(0, R.boing.t) * 1.5 : 1;
    const h = 1.2 * T * Math.max(.55, sq);
    hopImg(c, V.spring, X(s.x - .6), Y(s.y) - h + T * .05, 1.2 * T, h);
  }
  C.pads.forEach(d => { if (vis(d.x0, d.x1)) hopImg(c, V[(st.gates >> d.g) & 1 ? 'pad1' : 'pad0'], X(d.x0 - .1), Y(d.y) - .55 * T, 1.4 * T); });
  C.gates.forEach((g, i) => {
    if (vis(g.x0 - 1, g.x1 + 1)) hopImg(c, V[(g.door ? 'door' : 'gate') + ((st.gates >> i) & 1)], X(g.x0 - .2), Y(g.y1) - T * .2, T, 3.5 * T);
  });
  const bob = Math.sin(st.t * 3) * .12;
  C.keys.forEach(q => {
    if ((st.gates >> q.g) & 1 || !vis(q.x - 1, q.x + 1)) return;
    hopImg(c, V.key, X(q.x - .5), Y(q.y + .5 + bob), T);
    const g = (st.t * .7 + q.x * .13) % 1;
    if (g < .3) { c.globalAlpha = Math.sin(g / .3 * Math.PI); hopImg(c, V.glint, X(q.x - .1), Y(q.y + .6 + bob), T * .5); c.globalAlpha = 1; }
  });
  C.cps.forEach((q, i) => { if (i && vis(q.x - 1, q.x + 1)) hopImg(c, V[i <= st.cp ? 'flag1' : 'flag0'], X(q.x - .3), Y(q.y) - 2 * T, T, 2 * T); });
  if (C.goal && vis(C.goal.x - 2, C.goal.x + 3)) hopImg(c, V.goal, X(C.goal.x - .45), Y(C.goal.y) - 3.5 * T, 2 * T, 3.5 * T);
  // kite clouds with their kites; a cloud that goes round shows its path as faint dots
  C.movers.forEach((m, i) => {
    const q = hopMover(m, st.t);
    if (!vis(m.x - 1, m.x + m.w + m.ax + 2 * (m.r || 0) + 2)) return;
    if (m.r) {
      c.globalAlpha = .35;
      for (let k = 0; k < 12; k++) {
        const a = k * Math.PI / 6;
        hopImg(c, V.dot.w, X(m.x + m.w / 2 + m.r * (1 - Math.cos(a))) - T * .12, Y(m.y + m.r * Math.sin(a) - .3) - T * .12, T * .24);
      }
      c.globalAlpha = 1;
    } else hopImg(c, V.kite, X(q.x + m.w - .4), Y(q.y + 2.6), T, 2 * T);
    hopImg(c, V.mv[i], X(q.x - .2), Y(q.y) - T * .25, (m.w + .4) * T);
  });
  // sparkles, stars (with a glint now and then), puffs
  C.spk.forEach((s, i) => { if (!st.got[i] && vis(s.x - 1, s.x + 1)) hopImg(c, V.spark, X(s.x - .275), Y(s.y + .275 + bob), .55 * T); });
  C.stars.forEach((s, i) => {
    if ((st.stars >> i & 1) || !vis(s.x - 1, s.x + 1)) return;
    hopImg(c, V.star, X(s.x - .5), Y(s.y + .5 - bob), T);
    const g = (st.t * .5 + i * .31) % 1;
    if (g < .25 && !calm) { c.globalAlpha = Math.sin(g / .25 * Math.PI); hopImg(c, V.glint, X(s.x + .05), Y(s.y + .65 - bob), T * .55); c.globalAlpha = 1; }
  });
  for (const f of C.puffs) if (vis(f.x - 1, f.x + 1)) hopImg(c, V.puff, X(f.x - .65), Y(hopPuffY(f, st.t) + .65), 1.3 * T);
  // the pet's soft shadow on the cloud under it: smaller and lighter the higher it is
  const hidden = st.wait == 'fall';
  if (!hidden) {
    const gy = hopGround(st, p.x, p.y);
    if (gy != null && p.y - gy < 7) {
      const u = Math.max(.25, 1 - (p.y - gy) / 6), w = 2.2 * T * V.ps * u;
      c.globalAlpha = u;
      hopImg(c, V.shadow, X(p.x) - w / 2, Y(gy) - w * .15 - T * .06, w);
      c.globalAlpha = 1;
    }
  }
  // the ghost of the best run: the pet's picture, see-through
  const g = R.gh && hopGhostAt(R.gh, st.t);
  if (g && !g.jump && V.pet.happy.c) {
    const wid = HOP_PETW * T * V.ps;
    c.globalAlpha = .38;
    c.drawImage(V.pet.happy.c, X(g.x) - wid / 2, Y(g.y) + T * .08 - wid * .92, wid, wid);
    c.globalAlpha = 1;
  }
  // G-MOVES: the rival bird of a sky race, flying a little over the clouds at its place (its face, drawn once into a picture)
  if (st.boss) {
    const B = HOP_BOSS[st.boss.w], bx = st.boss.x != null ? st.boss.x : hopRivalX(st), gy = hopGround(st, bx, 60);
    const s = hopSprite('rival' + st.boss.w, 100, 100, R.rvf || (R.rvf = GH.face(B[1], 'goggles', B[2])), 1.6 * T); // the face's SVG made once
    R.rvy = gy != null ? gy : R.rvy != null ? R.rvy : p.y;
    const by = R.rvy + 1.6 + (calm ? 0 : Math.sin(tt * 4) * .15);
    hopImg(c, s, X(bx) - .8 * T, Y(by) - .8 * T, 1.6 * T);
  }
  // little bits: dust when landing, sparkles when collecting, the trail, the poof of a fall (sprites)
  R.fx.frame(dt);
  R.fx.step(dt);
  R.fx.each(q => {
    c.globalAlpha = Math.min(1, q.life * 2.5);
    const r = q.r * T * (q.grow ? 1 + (1 - q.life) : 1) * 2.2;
    if (q.k == 'star') hopImg(c, V.glint, X(q.x) - r * 1.6, Y(q.y) - r * 1.6, 3.2 * r);
    else hopImg(c, V.dot[q.c] || V.dot.w, X(q.x) - r, Y(q.y) - r, 2 * r);
  });
  c.globalAlpha = 1;
  // the pet (with its costume behind it): stretched when it hops, squashed when it lands, tipped a little forward when it runs
  if (!hidden) {
    const s = V.pet[p.vy > 1 && !p.gr ? 'cheer' : st.wait == 'back' || p.kb > 0 ? 'oops' : 'happy'];
    R.sq = Math.max(0, (R.sq || 0) - dt * 4);
    R.ant = Math.max(0, (R.ant || 0) - dt);
    // GFX-1: squash on landing (about 15 % flatter, springing back a touch past round), a quick crouch as it leaves the ground
    let str = p.gr ? 1 - R.sq * .18 + (R.sq > 0 && R.sq < .4 ? Math.sin(R.sq / .4 * Math.PI) * .05 : 0) : 1 + Math.min(.12, Math.abs(p.vy) * .008);
    if (R.ant > 0 && !calm) str = 1 - .16 * Math.sin(R.ant / .09 * Math.PI);
    const wid = HOP_PETW * T * V.ps / Math.sqrt(str);
    c.save();
    c.translate(X(p.x), Y(p.y) + T * .08);
    c.rotate(p.gr ? Math.max(-.12, Math.min(.12, p.vx * .012)) : Math.max(-.2, Math.min(.2, p.vx * .02 - p.vy * .004)));
    if (p.face < 0) c.scale(-1, 1);
    if (V.cos && V.cos.c) c.drawImage(V.cos.c, -wid / 2, -wid * str * .92, wid, wid * str);
    if (s.c) c.drawImage(s.c, -wid / 2, -wid * str * .92, wid, wid * str);
    // GFX-1: a short white hit flash when a puff bumps the pet (the tint is made once per picture, JFX.tint)
    if (s.c && p.kb > 0 && !calm && typeof JFX != 'undefined') {
      c.globalAlpha = Math.min(.55, p.kb * 2);
      c.drawImage(JFX.tint(s.c), -wid / 2, -wid * str * .92, wid, wid * str);
      c.globalAlpha = 1;
    }
    c.restore();
  }
  // the helper balloon: offered next to the pet, or carrying it
  if (st.wait == 'lift' || st.wait == 'offer') {
    const lift = st.wait == 'lift', bx = lift ? p.x - .1 : p.x + 1.4, by = (lift ? p.y + 1.2 : p.y + 1.6) + Math.sin(st.t * 2) * .15;
    hopImg(c, V.balloon, X(bx - 1), Y(by + 3), 2 * T, 3 * T);
  }
  // foreground clouds that pass in front, low on the screen (faster than the course: they are nearer)
  {
    const s = V.fore, w = s.w * V.sc * 1.9, gap = 26 * T * 1.6, o = R.cx * T * 1.6;
    for (let x = -((o % gap) + gap) % gap - w; x < V.W; x += gap) if (Math.floor((x + o) / gap) % 3 != 1) hopImg(c, s, x, V.H - w * .24, w);
  }
  // Lantern night: the dark around the pet
  if (V.lamp) c.drawImage(V.lamp, Math.round(X(p.x) - V.W), Math.round(Y(p.y + .6) - V.H), V.W * 2, V.H * 2);
}
// the bits: [x, y, vx, vy, life, radius, colour, grows]
// (GFX-1: kept in the shared pool, JFX.pool in 59b-fx.js: at most 30 alive, half that while frames are slow; k 'star': a glint)
function hopFx(x, y, n, c, sp, r = .08, grow, k) {
  if (!HP) return;
  if (hopCalm() && n > 3) n = 3;
  HP.fx.burst(x, y, n, c, sp, { r, grow, k, up: sp * .3 });
}
// a pool without the kit (a game file loaded on its own, as in some tests): the old plain list, at most 30
const hopPool = () => (typeof JFX != 'undefined' ? JFX.pool(30) : { list: [], frame() {}, step(dt) { this.list = this.list.filter(q => (q.life -= dt) > 0); },
  each(fn) { this.list.forEach(q => fn(q, 1)); }, burst() {} });
// music (R-03 A1): a gentle loop for each world, made of soft notes; only with Sound effects and Music on and not in calm mode;
// it waits while the course waits (paused, hidden, the balloon's question) and goes quiet under the voice (the shared duck)
const HOP_SCALE5 = [[0, 2, 4, 7, 9, 12, 14, 16, 19], [0, 3, 5, 7, 10, 12, 15, 17, 19]];
const HOP_MEL = [[4, 2, 4, 5, 4, 2, 0, -1, 2, 4, 5, 7, 5, 4, 2, -1], [0, 2, 4, 2, 5, 4, 2, -1, 4, 5, 7, 5, 4, 2, 0, -1],
  [7, 5, 4, 5, 4, 2, 4, -1, 2, 0, 2, 4, 5, 4, 2, -1], [2, 4, 5, 7, 5, 4, 2, 4, 5, 7, 8, 7, 5, -1, 4, -1]];
// per world: [root note, melody, minor (0/1), step in seconds]
const HOP_TUNE = { meadow: [67, 0, 0, .26], peaks: [69, 1, 0, .24], night: [64, 2, 1, .3], rainbow: [72, 3, 0, .24],
  sunset: [65, 1, 0, .28], whirl: [70, 3, 0, .22], aurora: [62, 0, 1, .3], castle: [67, 2, 0, .25] };
function hopMusic(R, run) {
  const a = typeof AC != 'undefined' && AC;
  if (!run || !S.sound || !S.music || hopCalm() || !a || a.state != 'running') { R.mb = 0; return; }
  const [root, mi, minor, step] = HOP_TUNE[R.st.C.W.id], sc = HOP_SCALE5[minor], mel = HOP_MEL[mi];
  if (!R.mb || R.mb < a.currentTime) R.mb = a.currentTime + .05;
  while (R.mb < a.currentTime + .15) {
    const i = R.mi = ((R.mi || 0) + 1) % 64, n = mel[i % 16], t = R.mb - a.currentTime;
    if (n >= 0) tone(NOTE(root + sc[n] + (i >= 32 && i % 2 ? 12 : 0)), step * 1.6, t, 'triangle', .028);
    if (i % 4 == 0) tone(NOTE(root - 24 + [0, 5, 7, 5][(i >> 4) % 4]), step * 3.6, t, 'sine', .04);
    R.mb += step;
  }
}
/* ---- the screens ---- */
const hopStarChip = (n, of = 3, id = 'hpst') => `<span class="stat star" id="${id}" aria-label="Stars found">${ico('star', 32)}<b>${n}/${of}</b></span>`;
const hopPetPic = () => {
  const w = S.wear || {};
  return petSVG(S.pet, stage(S.stars), 'happy', { hat: wearOf(w.hat), toy: wearOf(w.toy) });
};
const hopCosPic = (id, cls = 'hp-cos') => (HOP_COSTUME[id] ? `<svg class="art ${cls}" viewBox="0 0 200 200" aria-hidden="true" focusable="false">${HOP_COSTUME[id]()}</svg>` : '');
// a shop card's picture: the costume on a soft pet-shaped stand
const hopShopPic = id => `<svg class="art hp-wart" viewBox="0 0 200 200" aria-hidden="true" focusable="false">${HOP_COSTUME[id] ? HOP_COSTUME[id]() : ''}` +
  `${ghShad(100, 184, 44, 6)}${ghE(100, 146, 40, 38, 'w3')}${ghE(98, 144, 37, 35, 'w2')}${ghC(100, 86, 36, 'w3')}${ghC(98, 84, 33, 'w2')}${ghE(86, 70, 10, 6, 'w', .8, -30)}</svg>`;
function hopMenu(world) {
  const r = hopS(), nw = HOP_WORLDS.length;
  if (world != null && world >= 0 && world < nw && hopOpen(HOP_COURSES[world * 6], r)) r.world = world;
  const W = HOP_WORLDS[r.world], cur = HOP_BY[r.cur], all = hopStarsAll(r), done = hopDone(r), one = r.mode == 'one', cash = hopWallet(r);
  const day = hopToday(r), dc = HOP_BY[day.c], tw = HOP_TWB[day.tw], need = hopTwNeed(day.tw, day.c);
  save();
  const wcard = (w, i) => {
    const open = hopOpen(HOP_COURSES[i * 6], r), got = HOP_COURSES.filter(c => c.w == i).reduce((a, c) => a + hopBits(r.stars[c.id] || 0), 0);
    return `<button class="hp-world${i == r.world ? ' on' : ''}${open ? '' : ' lock'}" data-w="${i}" aria-pressed="${i == r.world}">` +
      `<span class="hp-wpic" style="--gh-a:var(--sc-${w.sky[0]});--gh-b:var(--sc-${w.sky[1]})">${hopWorldPic(w)}` +
      `${open ? '' : `<span class="hp-wlock">${ico('lock', 22)}</span>`}</span><span class="hp-wname">${esc(w.name)}</span>` +
      `<span class="hp-wsub">${open ? `${ico('star', 18)}<b>${got}</b> of 18` : 'Finish the world before'}</span></button>`;
  };
  const ccard = c => {
    const open = hopOpen(c, r), best = r.best[c.id], md = r.medal[c.id] || 0;
    return `<button class="hp-crs${open ? '' : ' lock'}${c.id == r.cur ? ' on' : ''}" data-c="${c.id}" data-ok="${open ? 1 : 0}">` +
      `<span class="hp-cn">${c.i % 6 + 1}</span><span class="hp-ci"><b>${esc(c.name)}</b><span>${open ? (best ? 'Best ' + hopTime(best) :
        'Gold in ' + hopGold(c) + ' s') : 'Finish the course before'}</span></span>` +
      `<span class="hp-cr">${open ? UI.stars(hopBits(r.stars[c.id] || 0), 3, 18) : ''}${md ? `<span class="hp-md m${md}">${ico('medal', 22)}</span>` : ''}</span>` +
      `<span class="hp-go" aria-hidden="true">${ico(open ? 'play' : 'lock')}</span></button>`;
  };
  const trail = t => {
    const ok = all >= t[2];
    return `<button class="hp-tr${t[0] === r.trail ? ' on' : ''}${ok ? '' : ' lock'}" data-tr="${t[0]}" aria-pressed="${t[0] === r.trail}">` +
      `<span class="hp-dot hp-t-${t[0]}" aria-hidden="true"></span><span>${esc(t[1])}</span>` +
      `${ok ? '' : `<small>${ico('star', 16)}${t[2]}</small>`}</button>`;
  };
  const wear = w => {
    const own = !!r.own[w[0]], on = r.wear === w[0];
    return `<button class="hp-wear${on ? ' on' : ''}${own || cash >= w[2] ? '' : ' lock'}" data-wear="${w[0]}" aria-pressed="${on}">` +
      `<span class="hp-wpet">${hopShopPic(w[0])}</span><span class="hp-wn">${esc(w[1])}</span>` +
      `<span class="hp-wp">${own ? (on ? 'Wearing' : 'Wear it') : `${ico('star', 18)}<b>${w[2]}</b>`}</span></button>`;
  };
  const seasons = HOP_SEASONS.map(([w0, t], k) => `<h2 class="hp-h">${esc(t)}</h2><div class="hp-worlds">` +
    HOP_WORLDS.slice(w0, (HOP_SEASONS[k + 1] || [nw])[0]).map((w, j) => wcard(w, w0 + j)).join('') + '</div>').join('');
  view(`${GH.top('hop')}<div class="scroll hp-menu">
  <section class="hp-hero" style="--gh-a:var(--sc-${W.sky[0]});--gh-b:var(--sc-${W.sky[1]})">
   <div class="hp-hpet"><span class="hp-pet">${hopCosPic(r.wear)}${hopPetPic()}</span><svg class="art hp-hcl" viewBox="0 0 136 60" aria-hidden="true" focusable="false">` +
     `${hopCloudArt(3, .9, W.cloud)}</svg></div>
   <div class="hp-hinfo"><p class="hp-hl">${ico('star', 26)}<b>${all}</b> of ${HOP_COURSES.length * 3} stars found</p><p class="hp-hl">${ico('trophy', 26)}<b>${done}</b> of ${HOP_COURSES.length} courses</p>
   ${UI.btn('Play ' + cur.name, { kind: 'primary', size: 'lg', icon: 'play', id: 'hopgo', wide: true })}</div></section>
  <p class="hp-goal" id="hpgoal"><span class="hp-hi">${ico('target', 22)}</span><span><b>Next goal:</b> ${esc(hopGoal(r))}</span></p>
  <section class="hp-day" aria-label="Today's twist"><div class="hp-dtx"><h2 class="hp-h">Today's twist: ${esc(tw[1])}</h2>
   <p>${esc(tw[2])} The course: <b>${esc(dc.name)}</b>.${need ? ` Catch ${need} sparkles.` : ''}</p>
   <p class="hp-dst">${day.done ? `${ico('check', 20)} Done today! A new twist comes tomorrow.` : `${ico('star', 20)} Finish it for 2 bonus stars.`}</p></div>
   ${UI.btn('Play the twist', { kind: day.done ? 'soft' : 'primary', size: 'lg', icon: 'play', id: 'hptw' })}</section>
  <section class="hp-opts"><h2 class="hp-h">How do you hop?</h2>
   <div class="hp-mode">${UI.seg([['one', 'One-touch'], ['free', 'Free move']], r.mode, { id: 'hpmode', label: 'How to hop' })}
   <p>${one ? 'One-touch: your pet runs by itself. Tap anywhere to hop. Hold to float down slowly.' :
    'Free move: the arrows walk left and right. Jump hops; hold it longer to hop higher. Go back for a star you missed!'}</p></div></section>
  ${seasons}
  <h2 class="hp-h">${esc(W.name)}: ${esc(W.adds.toLowerCase())}</h2><div class="hp-crss">${HOP_COURSES.filter(c => c.w == r.world).map(ccard).join('')}</div>
  ${hopBossCard(r.world, r)}
  <h2 class="hp-h">Costumes for your pet</h2><p class="hp-cash" id="hpcash">${ico('star', 26)}<span><b>${cash}</b> stars to spend. Stars come from the stars you find, gold medals and today's twist.</span></p>
  <div class="hp-wears"><button class="hp-wear${r.wear === 'none' ? ' on' : ''}" data-wear="none" aria-pressed="${r.wear === 'none'}"><span class="hp-wpet">${hopShopPic('none')}</span>` +
    `<span class="hp-wn">No costume</span><span class="hp-wp">${r.wear === 'none' ? 'Wearing' : 'Wear it'}</span></button>${HOP_WEAR.map(wear).join('')}</div>
  <h2 class="hp-h">Sparkle trail</h2><div class="hp-trs">${HOP_TRAILS.map(trail).join('')}</div>
  <ul class="hp-how">${[['flag', 'Hop to the checkered flag.'], ['star', 'Three stars hide on every course. Look up high and down low!'],
    ['replay', 'Fall off? No problem: you start again at the last little flag.'], ['medal', 'Be quick for a gold medal. Race the ghost of your best run!']]
    .concat(hopDashOpen(r) ? [['arrow-right', 'In the air, tap Dash to shoot ahead.']] : []).map(([i, t]) => `<li><span class="hp-hi">${ico(i == 'flag' ? 'target' : i, 22)}</span><span>${esc(t)}</span></li>`).join('')}</ul></div>`);
  GH.wire({ back: () => gameRoom() });
  $('#hopgo').onclick = () => hopTry(r.cur);
  $('#hptw').onclick = () => hopTry(day.c, day.tw);
  $('#hpboss').onclick = () => {
    const w = r.world;
    if (!hopBossOpen(w, r)) {
      SFX.wrong();
      fb(`Finish ${hopBossCourse(w).name} to meet ${HOP_BOSS[w][0]}!`, 'warn long', 2600);
      return;
    }
    SFX.pop(2);
    hopBossMenu(w);
  };
  // G-MOVES: the Dash card, once
  if (hopDashOpen(r) && !r.mv) GH.moveNew({ name: 'Dash', icon: 'arrow-right', line: 'In the air, tap Dash to shoot ahead!', done: () => { r.mv = 1; save(); } });
  $$('[data-c]').forEach(b => b.onclick = () => {
    const c = HOP_BY[b.dataset.c];
    if (!hopOpen(c, r)) {
      SFX.wrong();
      fb(`Finish ${HOP_COURSES[c.i - 1].name} to open ${c.name}!`, 'warn long', 2600);
      return;
    }
    r.cur = c.id;
    save();
    hopTry(c.id);
  });
  $$('[data-w]').forEach(b => b.onclick = () => {
    const i = +b.dataset.w;
    if (!hopOpen(HOP_COURSES[i * 6], r)) {
      SFX.wrong();
      fb(`Finish ${HOP_WORLDS[i - 1].name} to open ${HOP_WORLDS[i].name}!`, 'warn long', 2600);
      return;
    }
    SFX.pop(2);
    r.world = i;
    save();
    hopKeep(() => hopMenu());
  });
  $$('[data-tr]').forEach(b => b.onclick = () => {
    const t = HOP_TRAILS.find(x => x[0] === b.dataset.tr);
    if (all < t[2]) {
      SFX.wrong();
      fb(`Find ${t[2] - all} more stars for the ${t[1]} trail!`, 'warn long', 2600);
      return;
    }
    SFX.pop(3);
    r.trail = t[0];
    save();
    hopKeep(() => hopMenu());
  });
  $$('[data-wear]').forEach(b => b.onclick = () => {
    const id = b.dataset.wear, w = HOP_WEARB[id];
    if (id == 'none' || r.own[id]) {
      SFX.pop(3);
      r.wear = id;
    } else if (hopBuy(r, id)) {
      SFX.coin();
      SFX.chime();
      fb(`You got the ${w[1]}! Your pet wears it now.`, 'good', 2400);
    } else {
      SFX.wrong();
      fb(`You need ${w[2] - cash} more stars for the ${w[1]}. Find stars, win gold medals and play today's twist!`, 'warn long', 3000);
      return;
    }
    save();
    hopKeep(() => hopMenu());
  });
  UI.segOn($('#hpmode'), v => {
    r.mode = v;
    save();
    hopKeep(() => hopMenu());
  });
}
// redraw the menu and keep the scroll place
function hopKeep(f) {
  const y = $('.scroll') ? $('.scroll').scrollTop : 0;
  f();
  if ($('.scroll')) $('.scroll').scrollTop = y;
}
function hopTry(id, tw) {
  if (ptLeft() <= 0) {
    SFX.wrong();
    fb(ptWhyNot(), 'warn long', 3000);
    return;
  }
  SFX.whoosh();
  hopPlay(id, tw);
}

/* ---- a course ---- */
function hopStop() {
  if (!HP) return;
  cancelAnimationFrame(HP.raf);
  clearTimeout(HP.endT);
  removeEventListener('resize', HP.rs);
  removeEventListener('keydown', HP.kd);
  removeEventListener('keyup', HP.ku);
  HP = null;
}
function hopMsg(t, ms = 1300, cls = '') {
  const m = $('#hpmsg');
  if (!m) return;
  m.textContent = t;
  m.className = 'hp-msg on' + (cls ? ' ' + cls : '');
  clearTimeout(m._t);
  m._t = setTimeout(() => m.classList.remove('on'), ms);
}
function hopPlay(id, tw, race) {
  const r = hopS(), c = HOP_BY[id], mode = r.mode, W = HOP_WORLDS[c.w];
  const boss = !!race && hopBossCourse(c.w) === c && hopBossOpen(c.w, r), twist = boss ? null : HOP_TWB[tw], dash = hopDashOpen(r); // G-MOVES
  if (boss) HP_BOSSC = id;
  if (!twist) {
    r.cur = id;
    r.world = c.w;
  }
  save();
  const btn = (bid, icon, aria, txt) => `<button class="hp-btn" id="${bid}" data-k="${bid.slice(2)}" aria-label="${aria}">${ico(icon, 44)}` +
    `${txt ? `<span>${txt}</span>` : ''}</button>`;
  view(`${GH.top('hop', { play: true, hud: true, sub: boss ? `Race ${HOP_BOSS[c.w][0]}: ${c.name}` : twist ? twist[1] + ': ' + c.name : c.name, chips: hopStarChip(0) + UI.chip('timer', '0:00', { id: 'hpclk', aria: 'Course time' }) })}
  <div class="hpg hp-${mode} hp-w-${W.id}" id="hp"><canvas id="hpcv"></canvas><div class="hp-msg" id="hpmsg" aria-live="polite"></div>
  <div class="hp-ctl">${mode == 'free' ? btn('hpl', 'arrow-left', 'Walk left') + btn('hpr', 'arrow-right', 'Walk right') : ''}${btn('hpj', 'arrow-up', 'Hop', mode == 'free' ? 'Jump' : 'Hop')}${dash ? btn('hpd', 'arrow-right', 'Dash', 'Dash') : ''}</div>
  <div class="hp-offer" id="hpoffer" hidden><div class="hp-ocard" role="dialog" aria-label="The helper balloon">
   <svg class="art hp-obal" viewBox="0 0 80 120" aria-hidden="true" focusable="false">${HOP_ART.balloon()}</svg>
   <p>Need a lift? The balloon can carry you to the next flag.</p>
   <div class="hp-oacts">${UI.btn('Yes, please', { kind: 'primary', size: 'lg', icon: 'balloon', id: 'hpyes' })}${UI.btn('No, thanks', { size: 'lg', icon: 'replay', id: 'hpno' })}</div></div></div></div>`);
  const st = hopNew(id, { mode, tw: twist && twist[0], dash, boss: boss ? { w: c.w, n: hopNum(hopBossRec(c.w, r).n, 0, 999) } : null }), cv = $('#hpcv');
  cv.setAttribute('role', 'img'); // G-MOVES: the course canvas has a name (P6-01, like Hill Climb's)
  cv.setAttribute('aria-label', 'The clouds and your pet');
  HP = { st, c, r, cv, ctx: cv.getContext('2d', { alpha: false }), ptr: {}, key: {}, pend: false, acc: 0, last: 0, raf: 0, paused: false,
    ft: [], fi: [], q: 1, fc: 0, qAt: 0, fx: hopPool(), shake: 0, sec: -1, said: {},
    rec: hopRecNew(), gh: twist || boss ? null : hopGhostIn(r.ghost[id]), ghMs: r.best[id] || 0, dpend: false };
  hopRec(HP.rec, st);
  hopSize(HP);
  HP.rs = () => { if (HP) hopSize(HP); };
  addEventListener('resize', HP.rs);
  // input: one-touch takes a touch anywhere (several fingers at once are fine); free move uses the buttons; keys work too
  const box = $('#hp'), keyOf = e => {
    const b = e.target.closest && e.target.closest('.hp-btn');
    if (b) return b.dataset.k;
    return mode == 'one' ? 'j' : '';
  };
  const show = () => {
    const on = new Set(Object.values(HP.ptr).concat(Object.keys(HP.key).filter(k => HP.key[k])));
    for (const k of ['l', 'r', 'j', 'd']) if ($('#hp' + k)) $('#hp' + k).classList.toggle('on', on.has(k));
    HP.on = on;
  };
  box.addEventListener('pointerdown', e => {
    if (!HP || e.target.closest('.gh-top, .hp-offer')) return;
    e.preventDefault();
    const k = keyOf(e);
    if (!k) return;
    HP.ptr[e.pointerId] = k;
    if (k == 'j') HP.pend = true;
    if (k == 'd') HP.dpend = true;
    try { box.setPointerCapture(e.pointerId); } catch (x) {}
    show();
  });
  const up = e => {
    if (!HP) return;
    delete HP.ptr[e.pointerId];
    show();
  };
  box.addEventListener('pointerup', up);
  box.addEventListener('pointercancel', up);
  box.addEventListener('contextmenu', e => e.preventDefault());
  const KEYS = { ArrowLeft: 'l', ArrowRight: 'r', ArrowUp: 'j', ' ': 'j', d: 'd', D: 'd', Shift: 'd' };
  HP.kd = e => {
    if (!HP || !KEYS[e.key] || (mode == 'one' && KEYS[e.key] != 'j' && KEYS[e.key] != 'd') || (KEYS[e.key] == 'd' && !dash)) return;
    if (KEYS[e.key] == 'j' && !HP.key.j) HP.pend = true;
    if (KEYS[e.key] == 'd' && !HP.key.d) HP.dpend = true;
    HP.key[KEYS[e.key]] = 1;
    show();
  };
  HP.ku = e => { if (HP && KEYS[e.key]) { HP.key[KEYS[e.key]] = 0; show(); } };
  addEventListener('keydown', HP.kd);
  addEventListener('keyup', HP.ku);
  show();
  $('#hpyes').onclick = () => hopAnswer(true);
  $('#hpno').onclick = () => hopAnswer(false);
  GH.wire({quit: () => hopQuit(), hold: on => {
    if (!HP) return;
    HP.paused = on;
    HP.ptr = {};
    show();
  } });
  gtStart('#gtm', () => hopTimeUp());
  const first = !r.runs && !c.i;
  setTimeout(() => {
    if (!HP || HP.st !== st) return;
    const tip = boss ? `${HOP_BOSS[c.w][0]}: ${HOP_BOSS[c.w][3]}` : twist ? twist[1] + '!' : c.w && !HOP_COURSES.slice(0, c.i).some(x => x.w == c.w && r.best[x.id]) ? ['', 'Tap again in the air to hop higher!',
      'Hop onto a kite cloud for a ride!', 'Step on the red switch to open the gate!', 'Clouds with cracks crumble: keep hopping!',
      'Ride a cloud that goes round and round!', 'Grab the key to open the door!', 'All the tricks together. You can do it!'][c.w] : HP.gh ? 'Race your ghost!' : '';
    hopMsg(first || !tip ? (mode == 'one' ? 'Tap to hop!' : 'Arrows to walk, Jump to hop!') : tip, 2400);
    if (S.voice) say(first ? 'Tap to hop! Find the three stars and reach the flag!' : twist ? twist[2] : tip || c.name);
  }, 250);
  const loop = ts => {
    if (!HP || HP.st !== st) return;
    if (!document.getElementById('hpcv')) return hopStop();
    const t0 = hopNow(), dt = HP.last ? Math.min(.1, (ts - HP.last) / 1000) : 0;
    if (HP.last) {
      HP.fi.push(ts - HP.last);
      if (HP.fi.length > 240) HP.fi.shift();
    }
    HP.last = ts;
    const run = HP.ready && !document.hidden && !HP.paused && !GH.held && !st.done && st.wait != 'offer';
    hopMusic(HP, run);
    if (run) {
      HP.acc += dt * HOP_DEV.fast;
      let n = 0;
      while (HP.acc >= HOP_DT && n < 8 * HOP_DEV.fast && !st.done && st.wait != 'offer') {
        const on = HP.on || new Set();
        hopStep(st, { jump: HP.pend || on.has('j'), dir: (on.has('r') ? 1 : 0) - (on.has('l') ? 1 : 0), dash: HP.dpend });
        hopRec(HP.rec, st);
        HP.pend = false;
        HP.dpend = false;
        hopEvents();
        HP.acc -= HOP_DT;
        n++;
      }
      HP.acc = Math.min(HP.acc, HOP_DT);
    }
    if (HP.boing) HP.boing.t -= dt;
    hopDraw(HP, HP.ready ? dt : 0);
    HP.ft.push(hopNow() - t0);
    if (HP.ft.length > 240) HP.ft.shift();
    // a slow tablet: fewer pixels (down to 60 %) when frames take long; back up when there is time to spare
    if (++HP.fc % 30 == 0 && HP.fi.length >= 30 && HP.fc - HP.qAt >= 30) {
      const med = HP.fi.slice(-30).sort((a, b) => a - b)[15], q = HP.q;
      if (med > 26 && HP.q > .6) HP.q = Math.max(.6, HP.q - .15);
      else if (med < 18 && HP.q < 1 && HP.fc - HP.qAt > 300) HP.q = Math.min(1, HP.q + .1);
      if (HP.q != q) {
        HP.qAt = HP.fc;
        hopSize(HP);
      }
    }
    HP.raf = requestAnimationFrame(loop);
  };
  HP.raf = requestAnimationFrame(loop);
}
// what happened in the course: sounds, bits, messages, the chips
const HOP_SCALE = [72, 74, 76, 79, 81, 84, 86, 88];
function hopEvents() {
  const st = HP.st, p = st.p, tr = HOP_TRAILS.find(t => t[0] === HP.r.trail);
  for (const [k, a] of st.ev) {
    if (k == 'jump' || k == 'jump2') {
      hopTone(k == 'jump' ? 330 : 520, .12, 0, 'sine', .07, k == 'jump' ? 640 : 980);
      HP.ant = .09;
      if (tr && tr[3]) hopFx(p.x, p.y + .2, 4, tr[0] == 'rainbow' ? ['r', 'o', 'y', 'g', 'b', 'v'][Math.floor(st.t * 7) % 6] : tr[3], 1.2, .1);
    } else if (k == 'spring') {
      hopTone(220, .3, 0, 'triangle', .08, 900);
      HP.boing = { x: hopSpringAt(st), t: .3 };
      HP.shake = .5;
      hopMsg('Boing!', 700);
    } else if (k == 'land') {
      if (!hopCalm()) hopFx(p.x, p.y + .05, 5, 'w', 1.6, .11);
      HP.sq = 1;
    } else if (k == 'spk') {
      hopTone(NOTE(HOP_SCALE[(a - 1) % 8] + 12), .08, 0, 'sine', .06);
      hopFx(p.x, p.y + .8, 3, 'y', 2, .07);
    } else if (k == 'star') {
      SFX.star();
      hopFx(p.x, p.y + .8, 8, 'y', 3, .1);
      hopFx(p.x, p.y + .8, 4, 'w', 1.8, .12, false, 'star');
      hopFly('#hpst');
      const n = hopBits(st.stars);
      hopMsg(n == 3 ? 'All three stars!' : `A star! ${n} of 3`, 1400, 'big');
      UI.setChip($('#hpst'), n + '/3');
    } else if (k == 'puff') {
      SFX.giggle();
      HP.shake = .6;
      hopMsg('Boing! A friendly puff.', 1000);
    } else if (k == 'gate') {
      hopTone(300, .3, 0, 'triangle', .08, 120);
      hopMsg(st.C.gates[a].door ? 'Grab the key to open the door!' : 'Step on the switch to open the gate!', 1800);
    } else if (k == 'key') {
      [0, 4, 7, 12].forEach((d, i) => hopTone(NOTE(76 + d), .14, i * .06, 'triangle', .06));
      hopFx(p.x, p.y + .8, 6, 'y', 2.4, .09);
      hopMsg('The key! The door is open.', 1300);
    } else if (k == 'crumble') {
      noise(.18, 0, .03, 900, 400);
      if (!hopCalm()) hopFx(p.x, p.y - .1, 3, 'w2', 1, .1);
    } else if (k == 'switch') {
      hopTone(660, .08, 0, 'square', .04);
      hopTone(990, .14, .08, 'triangle', .06);
      hopMsg('The gate is open!', 1200);
    } else if (k == 'cp') {
      [0, 4, 7].forEach((d, i) => hopTone(NOTE(79 + d), .12, i * .07, 'triangle', .06));
      if (st.wait != 'lift') hopMsg('Checkpoint!', 900);
      if (!hopCalm()) hopFx(st.C.cps[a].x, st.C.cps[a].y + 1.6, 6, 'g', 1.8, .08);
    } else if (k == 'fall') {
      noise(.25, 0, .06, 300, 1400);
      hopTone(500, .25, 0, 'sine', .05, 200);
      hopFx(p.x, Math.max(p.y, st.C.cps[st.cp].y - 2), 6, 'w', 2, .25, true);
    } else if (k == 'back') hopMsg(st.cpF[st.cp] >= 3 ? '' : 'Whoops! Try again from the flag.', 1100);
    else if (k == 'offer') {
      SFX.pop(3);
      const o = $('#hpoffer');
      if (o) o.hidden = false;
      if (S.voice) say('Need a lift? The balloon can carry you to the next flag.');
    } else if (k == 'lift') SFX.chime();
    else if (k == 'goal') {
      hopMsg('You made it!', 1500, 'big');
      SFX.fanfare();
      gtStop();
      HP.endT = setTimeout(() => { if (HP && HP.st === st) (st.boss ? hopBossEnd() : hopFinish()); }, hopCalm() ? 400 : 1300);
    } else if (k == 'dash') { // G-MOVES
      hopTone(440, .14, 0, 'triangle', .07, 1200);
      if (!hopCalm()) hopFx(p.x - .4, p.y + .5, 5, 'w', 2, .1);
    } else if (k == 'rival') hopMsg(`${HOP_BOSS[st.boss.w][0]} is at the flag! Keep going!`, 2200);
  }
  st.ev.length = 0;
  const s = Math.floor(st.t);
  if (s != HP.sec) {
    HP.sec = s;
    const el = $('#hpclk b');
    if (el) el.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }
}
// GFX-1: a star flies from the pet to its chip in the top bar (JFX.fly: off in calm mode)
function hopFly(to) {
  const R = HP, V = R && R.v;
  if (!V || typeof JFX == 'undefined' || !R.cv) return;
  const b = R.cv.getBoundingClientRect(), T = V.T, p = R.st.p, k = b.width / V.W;
  JFX.fly(b.left + ((p.x - R.cx) * T) * k, b.top + (V.base - (p.y + 1 - R.cy) * T) * k, to, 'star');
}
const hopSpringAt = st => {
  let best = null;
  for (const s of st.C.springs) if (!best || Math.abs(s.x - st.p.x) < Math.abs(best.x - st.p.x)) best = s;
  return best ? best.x : 0;
};
function hopAnswer(yes) {
  if (!HP) return;
  const o = $('#hpoffer');
  if (o) o.hidden = true;
  hopHelp(HP.st, yes);
  SFX.pop(yes ? 3 : 1);
  if (!yes) hopMsg('Okay! You can do it!', 1300);
}
// keep the stars found so far (quit, time up, the flag)
function hopKeepStars() {
  if (!HP) return;
  const r = hopS();
  if (HP.st.stars) r.stars[HP.c.id] = (r.stars[HP.c.id] || 0) | HP.st.stars;
}
function hopQuit() {
  if (HP && HP.st.boss && !HP.st.boss.done) hopBossDone(HP.st, HP.st.done && !HP.st.boss.lost); // G-MOVES: a race left counts once
  hopKeepStars();
  save();
  hopStop();
  gtStop();
  hopMenu();
}
function hopTimeUp() {
  if (HP && HP.st.boss && !HP.st.boss.done) hopBossDone(HP.st, HP.st.done && !HP.st.boss.lost); // G-MOVES
  hopKeepStars();
  save();
  hopStop();
  timeUpOverlay();
}
// the flag: the time and the medal, the stars, what opened; the shared end card
// what a finished course changes in the save: the best time (lowest) and its ghost, the stars found (added), the medal (highest), the
// next course; today's twist instead keeps its stars and gives its bonus once a day (its time is not a course record)
function hopRecord(r, c, st, rec) {
  const before = hopStarsAll(r), cash0 = hopWallet(r), had = r.best[c.id], ms = Math.max(1, Math.round(st.t * 1000)), md = hopMedal(c, st.t);
  const tw = st.tw, next = HOP_COURSES[c.i + 1], opening = !tw && !!next && !hopOpen(next, r), isRec = !tw && (!had || ms < had);
  if (isRec) r.best[c.id] = ms;
  if (!tw && rec && rec.s.length >= 8 && (isRec || !r.ghost[c.id]) && hopGhostIn(rec.s)) r.ghost[c.id] = rec.s;
  r.stars[c.id] = (r.stars[c.id] || 0) | st.stars;
  if (!tw) r.medal[c.id] = Math.max(r.medal[c.id] || 0, md);
  r.runs++;
  if (!tw && next) r.cur = next.id;
  let bonus = 0;
  if (tw) {
    const d = hopToday(r);
    if (d.c == c.id && d.tw == tw && !d.done && hopTwOk(st)) {
      d.done = 1;
      r.bonus += 2;
      bonus = 2;
    }
  }
  const trails = HOP_TRAILS.filter(t => t[2] && before < t[2] && hopStarsAll(r) >= t[2]);
  const wear = HOP_WEAR.find(w => !r.own[w[0]] && cash0 < w[2] && hopWallet(r) >= w[2]);
  return { ms, md, had, rec: isRec, next, opening, trails, gotNow: hopBits(st.stars), gotAll: hopBits(r.stars[c.id]), bonus, wear, tw };
}
function hopFinish() {
  const st = HP.st, c = HP.c, r = hopS(), id = c.id, gh = HP.gh;
  const { ms, md, had, rec, next, opening, trails, gotNow, gotAll, bonus, wear, tw } = hopRecord(r, c, st, HP.rec);
  save();
  hopStop();
  const lines = [], MED = ['', 'Bronze', 'Silver', 'Gold'], twist = HOP_TWB[tw];
  if (twist) {
    const need = hopTwNeed(tw, id);
    lines.push(['star', bonus ? `Today's twist done: 2 bonus stars to spend!` : r.day.done && r.day.c == id && r.day.tw == tw ? 'You did today\'s twist already. A new one comes tomorrow!' :
      need ? `Catch ${need} sparkles for the bonus: you caught ${st.spk}. Try again!` : 'Well done!']);
  } else {
    lines.push(['medal', `${MED[md]} medal! Gold: ${hopGold(c)} s.` + (had && !rec ? ` Your best: ${hopTime(had)}.` : '')]);
    if (gh) {
      const gms = (gh.x.length - 1) * 200, d = Math.abs(ms - gms) / 1000;
      lines.push(['replay', ms < gms ? `You beat your ghost by ${d.toFixed(1)} s!` : `Your ghost was ${d.toFixed(1)} s quicker. Race it again!`]);
    }
  }
  lines.push(['star', gotAll == 3 ? 'You found all three stars on this course!' : `Stars found on this course: ${gotAll} of 3. Look up high and down low!`]);
  if (opening) lines.push(['sparkle', next.w != c.w ? (HOP_WORLDS[next.w].s2 && !HOP_WORLDS[c.w].s2 ? `Season 2 is open: ${esc(HOP_WORLDS[next.w].name)}!` :
    `New world: ${esc(HOP_WORLDS[next.w].name)}!`) : `New course: ${esc(next.name)}!`]);
  for (const t of trails) lines.push(['sparkle', `New sparkle trail: ${esc(t[1])}!`]);
  if (wear) lines.push(['gift', `You have enough stars for the ${esc(wear[1])}! Get it on the menu.`]);
  if (st.helped) lines.push(['balloon', 'The helper balloon gave you a lift. Try it on your own next time!']);
  const time = ptLeft() > 0, nx = !twist && next;
  const o = GH.end('hop', { win: true, title: 'You reached the flag!', stars: gotNow, tag: rec && had ? 'New best time!' : '',
    stats: [[hopTime(ms), 'time', 'timer'], [String(st.spk), 'sparkles', 'sparkle'], twist ? [String(hopWallet(r)), 'stars to spend', 'star'] : [MED[md], 'medal', 'medal']], lines,
    // NAV-01: Play again, Next (the next course), Home; with no game time left, Next goes to Learn
    btns: time ? NAV.end3({ again: 'hpagain', next: nx ? 'hpnext' : '', home: 'hpmenu' }) : NAV.end3({ next: 'hplearn', home: 'hpmenu' }) });
  if (S.voice) say(`You reached the flag! ${gotNow ? `You found ${gotNow} ${gotNow == 1 ? 'star' : 'stars'}. ` : ''}Well done, ${S.name || 'friend'}!`);
  const go = f => { o.remove(); f(); };
  const again = (cid, t) => go(() => (ptLeft() > 0 ? hopPlay(cid, t) : hopMenu()));
  if (o.querySelector('#hpnext')) o.querySelector('#hpnext').onclick = () => again(next.id);
  if (o.querySelector('#hpagain')) o.querySelector('#hpagain').onclick = () => again(id, tw);
  if (o.querySelector('#hplearn')) o.querySelector('#hplearn').onclick = () => go(() => learnHub());
  o.querySelector('#hpmenu').onclick = () => go(() => home());
}

// The Game Room card (59-game-hub.js shows it after the games file's games)
GH.reg({
  id: 'hop', btn: 'ghop', name: 'Sky Hop', icon: 'balloon', p: 'disc', sky: ['sky-1', 'sky'], art: () => hopHubArt(),
  sub: () => {
    const r = hopPeek();
    return hopNum(r.runs, 0, 1e7) ? `<span>${ico('star', 18)}<b>${hopStarsAll(r)}</b> of ${HOP_COURSES.length * 3} stars</span><span>${ico('trophy', 18)}<b>${hopDone(r)}</b> of ${HOP_COURSES.length}</span>`
      : '<span>Hop through the clouds with your pet</span>';
  },
  open: () => hopMenu(), tapToPlay: '#hopgo', saved: 'Your stars are saved.',
});
