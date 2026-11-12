/* ---------- Sky Hop: bounce your pet through short obstacle courses in the clouds (G-04b; CSS src/css/49-game-skyhop.css) ----------
   An original Star School game (docs/GAMES_RESEARCH.md, "Game B"). Both files go into games2.<VER>.js (tools/build.py PARTS) and
   load after games.<VER>.js, so GH.reg, the gh* drawing helpers and Star Rally's colour helpers (rlCol, rlRes) are there.

   How it plays
   - The hero is the child's own drawn pet (the pet rig, 17-pets-svg.js, wearing its hat and toy), drawn once into a picture.
     It bounces along puffy cloud paths to a checkered flag and looks for 3 stars hidden off the main path.
   - One-touch (the default up to 2nd grade): the pet runs by itself; tap anywhere to hop; hold to float down slowly; from
     Windy Peaks on, a tap in the air is a second hop. Free move (the default from 3rd grade; a switch on the menu): left and
     right buttons and a jump button; a short press is a small hop, a long press a big one; go back for a missed star.
   - Kind timing: a hop still works a moment after running off an edge, and a tap just before landing counts.
   - 24 courses of 40 to 90 seconds in four drawn worlds (Cloud Meadow, Windy Peaks, Starry Night, Rainbow Bridge). Each world
     adds one thing: flower springs, wind (gusts and updrafts), moving kite clouds, switches that open gates. A course opens when
     the one before it is finished. Stars open sparkle trails for the pet (cosmetic).
   - No lives, no game over: a fall puts the pet back on the last cloud checkpoint in a second; after 3 falls from the same
     checkpoint a friendly helper balloon offers a lift to the next one (the child can say no). Friendly puffs only bounce the
     pet back a little. Time medals are fixed targets per course plus the child's own best time; nobody else's times.
   - Nothing changes while the app is closed, nothing is random, no streaks, no ads.

   Code: worlds and courses (a short text format, hopBuild), the simulation (hopNew, hopStep, hopHelp, hopClone: no DOM, fixed
   1/60 s step, deterministic; the tests play every course with bots), the drawings (SVG in the --a-* roles, object-art style
   DESIGN_SYSTEM 6.5, made once into canvases with the colours read from the tokens), the canvas renderer and the screens.
   Game time: exactly like the other games (ptLeft() before a course, gtStart while it runs, held by the pause sheet, the shared
   time-up card). view() stops the course through hopStop().
   Save: S.hop (created when the game is first opened; old saves load unchanged), read field by field by hopS():
   {runs, best: {course: ms}, stars: {course: 0-7 bits}, medal: {course: 0-3}, mode, world, trail}. */

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
   Phrases (HOP_PH) are named bits of course; a course's plan is phrase names and plain tokens. */
const HOP_WORLDS = [
  { id: 'meadow', name: 'Cloud Meadow', sky: ['sky-1', 'sky'], cloud: ['w', 'w2', 'w3'], dj: false, adds: 'Flower springs' },
  { id: 'peaks', name: 'Windy Peaks', sky: ['blue', 'sky-1'], cloud: ['w', 'c1', 'c'], dj: true, adds: 'Wind and a second hop' },
  { id: 'night', name: 'Starry Night', sky: ['night', 'night-1'], cloud: ['v1', 'v', 'v2'], dj: true, adds: 'Kite clouds that move' },
  { id: 'rainbow', name: 'Rainbow Bridge', sky: ['candy-1', 'candy'], cloud: ['w', 'p1', 'p'], dj: true, adds: 'Switches and gates' },
];
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
};
// [id, name, world, gold target in seconds (the one-touch bot of tools/test.js with no falls, plus 3 s), plan]
const HOP_COURSES = [
  ['m1', 'First Hops', 0, 48, 'F8 gap row gap3 up down puff gap stones row gap starHigh bridge gap3 starArc up down hole starNook E'],
  ['m2', 'Puffy Path', 0, 48, 'F8 gap puff hole row stones up down gap3 starArc puffs gap bridge step starLow gap starHigh E'],
  ['m3', 'Spring Garden', 0, 46, 'F8 spring gap puff springg row starSpring gap3 step stones spring puffs starArc hole starHigh E'],
  ['m4', 'Sunny Steps', 0, 45, 'F8 ups gap3 springg starNook step puff spring stones row ledge starLow hole gap3 starSpring E'],
  ['m5', 'Daisy Drops', 0, 53, 'F8 stones springg puffs ledge starHigh gap3 hole spring row ups starLow step gap3 springg puff starSpring E'],
  ['m6', 'Meadow Run', 0, 56, 'F8 hole spring puffs stones ups starSpring gap3 springg ledge row starLow step puff spring hole gap3 starNook E'],
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
  ['r1', 'Rainbow Start', 3, 59, 'F8 rbow gate gap3 row starGate dbl kite lift gateLow starHigh puff rbow gateHi starDbl gate kite liftHi gateLow rbow E'],
  ['r2', 'Candy Gates', 3, 62, 'F8 gate kite rbow starGate lift gateLow puffs dblUp starKite gateHi wind kites starDbl gate kite liftHi gateLow rbow E'],
  ['r3', 'Bridge of Colours', 3, 66, 'F8 rbow gateHi kiteV starGate liftHi gate dbl puffs starLift rbow kites gateLow kiteHi starKiteH gate kite liftHi gateLow rbow E'],
  ['r4', 'Twisty Rainbow', 3, 64, 'F8 gateLow kites starGate windGap gate liftHi rbow starKite kiteV gateHi dbl puffs springg starDbl gate kite liftHi gateLow rbow E'],
  ['r5', 'Sky Castle Road', 3, 64, 'F8 gateHi liftHi kites starGate gust gate kiteV dblUp starKiteH rbow gateLow kiteHi puffs starLift gate kite liftHi gateLow rbow E'],
  ['r6', 'Over the Rainbow', 3, 66, 'F8 gate kiteHi starGate liftHi gateLow kites dblUp starKite rbow gateHi kiteV gust dbl lift starDbl gate kite liftHi gateLow rbow E'],
].map(([id, name, w, gold, plan], i) => ({ id, name, w, gold, plan, i }));
const HOP_BY = {};
for (const c of HOP_COURSES) HOP_BY[c.id] = c;

/* ---- building a course from its plan ---- */
const HOP_BUILT = {};
function hopBuild(id) {
  if (HOP_BUILT[id]) return HOP_BUILT[id];
  const c = HOP_BY[id], W = HOP_WORLDS[c.w];
  const C = { id, c, W, floors: [], movers: [], springs: [], puffs: [], winds: [], lifts: [], stars: [], spk: [], cps: [], pads: [], gates: [],
    side: [], goal: null, L: 0, dj: W.dj };
  const toks = c.plan.split(/\s+/).flatMap(t => (HOP_PH[t] ? HOP_PH[t].split(' ') : [t]));
  let x = 0, h = 2, lastCp = 0, retry = null, pad = null, prevEnd = null;
  const floor = (n, kind) => {
    const f = { x0: x, x1: x + n, y: h, k: kind };
    C.floors.push(f);
    // a checkpoint at the start of a floor every ~36 tiles (none on the first)
    if (n >= 2 && x - lastCp >= 36 && C.cps.length) {
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
    } else if (k == 'W') C.winds.push({ x0: x, x1: x + n, s: a[1] });
    else if (k == 'L') C.lifts.push({ x0: x, x1: x + n, y0: h - 7, y1: h + a[1] });
    else if (k == 'P') C.puffs.push({ x: x + n, y: h + a[1] });
    else if (k == 'K') {
      floor(2, 'c');
      pad = { x0: x - 1.6, x1: x - .4, y: h, g: C.gates.length };
      C.pads.push(pad);
    } else if (k == 'X') {
      floor(1, 'c');
      C.gates.push({ x0: x - .8, x1: x - .2, y0: h, y1: h + 3.2, back: retry || C.cps[C.cps.length - 1] });
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
    if (f.k != 's') for (const g of C.floors) if (g.k != 's' && (g.x1 == f.x0 || g.x0 == f.x1)) f.dep = Math.max(f.dep, f.y - g.y + 1.2);
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
  C.movers.forEach((m, j) => put(m.x, m.x + m.w + m.ax, 'mv', j));
  C.springs.forEach(q => put(q.x, q.x, 'sp', q));
  C.puffs.forEach(q => put(q.x, q.x, 'pf', q));
  C.spk.forEach((q, j) => put(q.x, q.x, 'sk', j));
  return (HOP_BUILT[id] = C);
}

/* ---- the simulation (no DOM; the tests play whole courses) ---- */
// a kite cloud's place at time t (it glides with an easy-in-out to and fro)
function hopMover(m, t) {
  const u = .5 - Math.cos(2 * Math.PI * t / m.T) / 2;
  return { x: m.x + m.ax * u, y: m.y + m.ay * u };
}
const hopPuffY = (p, t) => p.y + Math.sin(t * 2.2 + p.x) * .3;
function hopNew(id, o = {}) {
  const C = hopBuild(id), c0 = C.cps[0];
  return {
    C, id, mode: o.mode == 'free' ? 'free' : 'one', t: 0, dj: C.dj,
    p: { x: c0.x, y: c0.y, vx: 0, vy: 0, gr: true, on: -1, jl: 0, coy: 0, buf: 0, held: false, face: 1, kb: 0, hit: 0 },
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
  s.ev = [];
  return s;
}
// the surfaces under the pet: floors (solid) and kite clouds (land on top only)
function hopSupport(st, x, y, eps) {
  const C = st.C, P = HOP_P, l = x - P.PW / 2 + .06, r = x + P.PW / 2 - .06;
  for (const j of C.col[Math.max(0, Math.min(C.col.length - 1, Math.floor(x)))] || []) {
    const f = C.floors[j];
    if (r > f.x0 && l < f.x1 && Math.abs(y - f.y) <= eps) return j;
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
  if (!inp.jump && p.held && st.mode == 'free' && p.vy > P.LOW && !p.spr) p.vy = P.LOW; // a short press: a small hop
  p.held = !!inp.jump;
  st.t += dt;
  // waits: falling (back on the checkpoint in a moment), bounced back by a gate, carried by the helper balloon, ready
  if (st.wait == 'fall') {
    if ((st.wt -= dt) > 0) return;
    const cp = C.cps[st.cp];
    Object.assign(p, { x: cp.x, y: cp.y, vx: 0, vy: 0, gr: true, on: -1, kb: 0, buf: 0, coy: 0, spr: false });
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
  const want = (one ? (ready && !stay ? P.RUN : 0) : (ready ? (inp.dir || 0) * P.FREE : 0)) + (ready ? wind : 0);
  if (p.kb > 0) p.kb -= dt;
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
      p.vy = P.JUMP;
      p.gr = false;
      p.on = -1;
      p.coy = 0;
      p.buf = 0;
      p.spr = false;
      st.ev.push(['jump']);
    } else if (press && st.dj && p.jl > 0) {
      p.vy = P.JUMP2;
      p.jl--;
      p.buf = 0;
      p.spr = false;
      st.ev.push(['jump2']);
    }
  }
  p.buf = Math.max(0, p.buf - dt);
  p.coy = Math.max(0, p.coy - dt);
  // gravity, floating (hold), updrafts
  if (!p.gr) {
    p.vy -= P.G * dt;
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
      if (f.k != 's') solidHit(f.x0, f.x1, f.y - f.dep, f.y);
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
        if (r > f.x0 && l < f.x1 && oy >= f.y - .001 && p.y <= f.y && f.y > by) {
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

/* ---- drawings (SVG in the --a-* roles; a tile is 40 units; made once into canvases) ---- */
// round puffs as one path: [x, y, r] each
const hopPuffs = (list, c, o) => ghP(list.map(([x, y, r]) => `M${gh1(x - r)} ${gh1(y)}a${gh1(r)} ${gh1(r)} 0 1 0 ${gh1(2 * r)} 0` +
  `a${gh1(r)} ${gh1(r)} 0 1 0 ${gh1(-2 * r)} 0`).join(''), c, o);
// swap colour roles in a drawing ({w: 'v1'}: white becomes light purple)
const hopTint = (svg, map) => svg.replace(/var\(--a-([a-z]\d?)\)/g, (m, r) => `var(--a-${map[r] || r})`);
// a cloud floor w tiles wide and dep tiles deep: puffy top, shaded underside; pal = [base, shade, deep]; the walking surface is y 10
function hopCloudArt(w, dep, pal) {
  const W = w * 40, D = Math.max(34, dep * 40 - 4), top = [], bot = [];
  const nt = Math.max(1, Math.round(W / 30)), nb = Math.max(1, Math.round(W / 26));
  for (let i = 0; i < nt; i++) top.push([8 + (i + .5) * W / nt, 13, Math.min(10, W / nt * .5)]);
  for (let i = 0; i < nb; i++) bot.push([8 + (i + .5) * W / nb, 4 + D, Math.min(13, W / nb * .62)]);
  const sh = (l, dx, dy) => l.map(([x, y, r]) => [x + dx, y + dy, r]);
  return hopPuffs(sh(bot, 2, 4), pal[2]) + ghR(10, 14, W - 2, D - 8, 14, pal[2]) + hopPuffs(bot, pal[1]) + ghR(8, 10, W, D - 8, 14, pal[1]) +
    ghR(8, 8, W - 3, Math.min(D - 16, 22), 12, pal[0]) + hopPuffs(sh(top, -1, -2), pal[0]) + ghE(8 + Math.min(W * .25, 22), 8, Math.min(W * .18, 14), 2.6, 'w', .8);
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
// the worlds' far and near layers (960 x 200 and 960 x 120) and what stays put in the sky (100 x 100). Hills: Star Rally's rlRidge.
const HOP_SKY = {
  meadow: () => ghSun(50, 50, 24), peaks: () => ghSun(50, 50, 20), rainbow: () => ghSun(50, 50, 22),
  night: () => ghC(50, 50, 30, 'y1', .22) + `<path ${ghF('m')} d="M46 26a24 24 0 1 0 22 34a19 19 0 0 1 -22 -34Z"/>`,
};
// a bank of clouds along the bottom of the near layer
function hopBank(y, c1, c2) {
  const a = [], b = [];
  for (let x = 0; x <= 960; x += 60) {
    const r = 26 + ((x * 7) % 5) * 6;
    a.push([x + 3, y + 4, r]);
    b.push([x, y, r]);
  }
  return hopPuffs(a, c2) + ghR(0, y + 4, 960, 120, 0, c2) + hopPuffs(b, c1) + ghR(0, y + 10, 960, 120, 0, c1);
}
const HOP_BACK = {
  meadow: {
    far: () => ghCloud(300, 50, 1.6) + ghCloud(700, 70, 1.3) + ghP(rlRidge(168, [[14, 3, .5], [8, 7, 1.2]], 200), 'g1', .8) +
      ghP(rlRidge(184, [[8, 4, 1.4], [5, 9, .3]], 200), 'g', .7),
    near: () => hopBank(70, 'w', 'w2'),
  },
  peaks: {
    far: () => {
      const m = [[40, 3, .2], [22, 6, 1.4], [10, 11, .5]];
      return ghCloud(240, 46, 1.3) + ghCloud(760, 64, 1.1) + ghP(rlRidge(130, m, 200, 6, 4), 'b2', .45) + ghP(rlRidge(130, m, 200), 'b1') +
        ghP(rlCap(130, m, 22), 'w');
    },
    near: () => hopBank(66, 'w', 'w2'),
  },
  night: {
    far: () => rlStars(46) + hopTint(ghCloud(420, 110, 1.3) + ghCloud(820, 80, 1), { w: 'v1', w2: 'v' }) +
      ghP(rlRidge(178, [[10, 3, .7], [6, 8, 2]], 200, 6, 3), 'v3', .5) + ghP(rlRidge(178, [[10, 3, .7], [6, 8, 2]], 200), 'v2', .8),
    near: () => hopBank(72, 'v1', 'v'),
  },
  rainbow: {
    far: () => {
      let s = '';
      ['r', 'o', 'y', 'g', 'b', 'v'].forEach((c, i) => { s += ghL(`M${200 + i * 9} 200A${280 - i * 9} ${230 - i * 9} 0 0 1 ${760 - i * 9} 200`, c, 9, .6); });
      return s + ghCloud(180, 160, 1.8) + ghCloud(790, 160, 1.8) + ghCloud(500, 50, 1.1);
    },
    near: () => hopBank(70, 'w', 'w2'),
  },
};
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
// a world's picture for the menu (its far and near layers over the sky colours)
const hopWorldPic = w => `<svg class="art" viewBox="0 0 960 200" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">` +
  `${HOP_BACK[w.id].far()}<g transform="translate(0 104)">${HOP_BACK[w.id].near()}</g></svg>`;

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
  r.world = hopOpen(HOP_COURSES[hopNum(r.world, 0, 3) * 6], r) ? hopNum(r.world, 0, 3) : HOP_BY[r.cur].w;
  return r;
}
const hopPeek = () => (S.hop && typeof S.hop == 'object' && !Array.isArray(S.hop) ? S.hop : {});
const hopBits = v => (v & 1) + (v >> 1 & 1) + (v >> 2 & 1);
const hopStarsAll = (r = hopPeek()) => HOP_COURSES.reduce((a, c) => a + hopBits(hopNum(hopObj(r.stars)[c.id], 0, 7)), 0);
const hopDone = (r = hopPeek()) => HOP_COURSES.filter(c => hopNum(hopObj(r.best)[c.id], 0, 36e5) > 0).length;
// a course opens when the one before it is finished
const hopOpen = (c, r = hopPeek()) => !c.i || hopNum(hopObj(r.best)[HOP_COURSES[c.i - 1].id], 0, 36e5) > 0;
const hopTime = ms => (ms / 1000).toFixed(1) + ' s';

/* ---- the renderer: sprites, colours and the canvas ---- */
const HOP_SPR = {};
// an SVG drawing as a canvas pxw pixels wide (cached; .c is set once it has loaded, .p resolves then)
function hopSprite(key, vw, vh, inner, pxw) {
  const k = key + '@' + Math.round(pxw);
  if (HOP_SPR[k]) return HOP_SPR[k];
  const w = Math.max(2, Math.round(pxw)), h = Math.max(2, Math.round(pxw * vh / vw)), s = (HOP_SPR[k] = { c: null, w, h, vw, vh });
  s.p = new Promise(ok => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      s.c = c;
      ok();
    };
    img.onerror = () => ok();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${vh}" ` +
      `width="${w}" height="${h}">${rlRes(inner)}</svg>`);
  });
  return s;
}
// the child's pet with its hat and toy: the rig's colours are CSS roles, so they are read from a hidden copy first
function hopPetSprite(mood, px) {
  const w = S.wear || {}, key = ['pet', S.pet, stage(S.stars), mood, w.hat || '', w.toy || ''].join('-');
  if (HOP_SPR[key + '@' + px]) return HOP_SPR[key + '@' + px];
  let inner = '';
  try {
    const host = document.createElement('div');
    host.style.cssText = 'position:absolute;left:-9999px;top:0;width:200px;height:200px;pointer-events:none';
    host.innerHTML = petSVG(S.pet, stage(S.stars), mood, { hat: wearOf(w.hat), toy: wearOf(w.toy) });
    document.body.appendChild(host);
    const svg = host.querySelector('svg');
    const els = [...svg.querySelectorAll('*')], gone = els.filter(el => getComputedStyle(el).display == 'none');
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
  return hopSprite(key, 200, 200, inner, px);
}
let HP = null; // the course on screen
const hopNow = () => (window.__realNow || (() => performance.now()))();
const hopCalm = () => !!S.calm || (typeof matchMedia == 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches);
// sounds: through tone() and SFX (silent with Sound effects off); softer in calm mode
const hopTone = (f, d, t, type, vol, slide) => tone(f, d, t, type, vol * (hopCalm() ? .6 : 1), slide);
// sizes and the pictures at this screen size
function hopSize(R) {
  const cv = R.cv, cw = Math.max(1, cv.clientWidth), ch = Math.max(1, cv.clientHeight);
  const k0 = Math.min(Math.min(1.5, devicePixelRatio || 1), Math.sqrt(1.2e6 / (cw * ch))), k = k0 * (R.q || 1);
  cv.width = Math.round(cw * k);
  cv.height = Math.round(ch * k);
  const C = R.st.C, W = C.W, T0 = Math.min(ch / 9.5, cw / 9), T = T0 * k, sp = T0 * k0; // T: canvas pixels a tile; sp: sprite pixels a tile
  const V = { cw, ch, k, T, sc: (R.q || 1), W: cv.width, H: cv.height, base: Math.round(cv.height * .64) };
  V.sky = R.ctx.createLinearGradient(0, 0, 0, V.H);
  V.sky.addColorStop(0, rlCol('sc-' + W.sky[0]));
  V.sky.addColorStop(1, rlCol('sc-' + W.sky[1]));
  const B = HOP_BACK[W.id], fh = Math.max(ch * .42, 120) * k0, nh = Math.max(ch * .2, 70) * k0;
  V.far = hopSprite('far-' + W.id, 960, 200, B.far(), 960 * fh / 200);
  V.near = hopSprite('near-' + W.id, 960, 120, B.near(), 960 * nh / 120);
  V.sun = hopSprite('sky-' + W.id, 100, 100, HOP_SKY[W.id](), T0 * k0 * 2.2);
  V.fl = C.floors.map(f => {
    if (f.k == 'b') return hopSprite(`br-${W.id}-${f.x1 - f.x0}`, (f.x1 - f.x0) * 40 + 16, 40, hopBridgeArt(f.x1 - f.x0, W.id == 'rainbow'), ((f.x1 - f.x0) + .4) * sp);
    const dep = Math.round((f.dep || 1.2) * 4) / 4, w = f.x1 - f.x0;
    return hopSprite(`cl-${W.id}-${w}-${dep}`, w * 40 + 16, dep * 40 + 24, hopCloudArt(w, dep, W.cloud), (w + .4) * sp);
  });
  V.mv = C.movers.map(m => hopSprite(`cl-${W.id}-${m.w}-1`, m.w * 40 + 16, 64, hopCloudArt(m.w, 1, W.cloud), (m.w + .4) * sp));
  for (const [n, vw, vh, art, wt] of [['spring', 48, 48, HOP_ART.spring(), 1.2], ['puff', 48, 48, HOP_ART.puff(), 1.3], ['star', 40, 40, HOP_ART.star(), 1],
    ['spark', 24, 24, HOP_ART.spark(), .55], ['flag0', 40, 80, HOP_ART.flag(0), 1], ['flag1', 40, 80, HOP_ART.flag(1), 1], ['goal', 80, 140, HOP_ART.goal(), 2],
    ['pad0', 48, 24, HOP_ART.pad(0), 1.2], ['pad1', 48, 24, HOP_ART.pad(1), 1.2], ['gate0', 40, 140, HOP_ART.gate(0), 1],
    ['gate1', 40, 140, HOP_ART.gate(1), 1], ['kite', 40, 80, HOP_ART.kite(), 1], ['balloon', 80, 120, HOP_ART.balloon(), 2]]) {
    V[n] = hopSprite('h-' + n, vw, vh, art, wt * sp);
  }
  const ps = Math.round(sp * 2.1);
  V.pet = { happy: hopPetSprite('happy', ps), cheer: hopPetSprite('cheer', ps), oops: hopPetSprite('oops', ps) };
  V.col = {};
  for (const r of ['w', 'w2', 'y', 'y1', 'p', 'c', 'g', 'v', 'r', 'o', 'b']) V.col[r] = rlCol(r);
  R.v = V;
  const all = Object.values(V).flatMap(x => (x && x.p ? [x] : Array.isArray(x) ? x : x && typeof x == 'object' && x.happy ? Object.values(x) : []));
  R.ready = false;
  Promise.all(all.map(s => s.p)).then(() => { if (R.v === V) R.ready = true; });
}
// draw a picture (a cached canvas) with its top left at x, y and w canvas pixels wide
function hopImg(c, s, x, y, w, h) {
  if (s && s.c) c.drawImage(s.c, Math.round(x), Math.round(y), Math.round(w), Math.round(h || w * s.h / s.w));
}
function hopTile(c, s, off, y, W) {
  if (!s.c) return;
  const w = s.w * HP.v.sc, h = s.h * HP.v.sc;
  for (let x = -(((off % w) + w) % w); x < W; x += w) c.drawImage(s.c, Math.round(x), Math.round(y - h), Math.ceil(w) + 1, Math.ceil(h));
}
function hopDraw(R, dt) {
  const c = R.ctx, V = R.v, st = R.st, C = st.C, p = st.p, T = V.T;
  // the camera: the pet a third in from the left (looking ahead), its feet a little below the middle; it eases along
  const lead = st.mode == 'one' ? .3 : .4, tx = p.x - V.W * lead / T, ty = p.y;
  if (R.cx == null) { R.cx = tx; R.cy = ty; }
  const e = Math.min(1, dt * 6);
  R.cx += (tx - R.cx) * Math.min(1, dt * 10);
  R.cy += (ty - R.cy) * (p.y < R.cy - 3 ? Math.min(1, dt * 12) : e);
  let sx = 0, sy = 0;
  if (R.shake > 0 && !hopCalm()) {
    R.shake = Math.max(0, R.shake - dt * 2);
    sx = Math.sin(st.t * 70) * R.shake * T * .25;
    sy = Math.cos(st.t * 55) * R.shake * T * .2;
  }
  const X = x => (x - R.cx) * T + sx, Y = y => V.base - (y - R.cy) * T + sy;
  // the sky and the sun or moon: made once into an opaque picture of the screen's size (one quick copy a frame)
  if (!V.bg && V.sun.c) {
    V.bg = document.createElement('canvas');
    V.bg.width = V.W;
    V.bg.height = V.H;
    const b = V.bg.getContext('2d', { alpha: false });
    b.fillStyle = V.sky;
    b.fillRect(0, 0, V.W, V.H);
    hopImg(b, V.sun, V.W - V.sun.w * V.sc - T * .8, T * 1.6, V.sun.w * V.sc);
  }
  if (V.bg) c.drawImage(V.bg, 0, 0);
  else {
    c.fillStyle = V.sky;
    c.fillRect(0, 0, V.W, V.H);
  }
  // far hills and a bank of clouds below, moving slower than the course (they sink a little as the pet climbs)
  const dv = Math.max(-V.H * .04, Math.min(V.H * .1, (R.cy - 2) * T * .06));
  hopTile(c, V.far, R.cx * T * .1, V.H * .9 + dv, V.W);
  hopTile(c, V.near, R.cx * T * .3, V.H + dv * 1.6 + V.near.h * V.sc * .12, V.W);
  const x0 = R.cx - 2, x1 = R.cx + V.W / T + 2, vis = (a, b) => b > x0 && a < x1;
  // wind (streaks) and updrafts (rising dots)
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
      c.beginPath();
      c.arc(X(wx + Math.sin(st.t * 3 + i) * .2), Y(wy), T * .07, 0, 6.3);
      c.fill();
    }
  }
  c.globalAlpha = 1;
  // floors, springs, switches, gates, checkpoints, the flag
  C.floors.forEach((f, i) => {
    if (!vis(f.x0, f.x1)) return;
    const s = V.fl[i];
    if (f.k == 'b') hopImg(c, s, X(f.x0 - .2), Y(f.y) - T * .25, (f.x1 - f.x0 + .4) * T);
    else hopImg(c, s, X(f.x0 - .2), Y(f.y) - T * .25, (f.x1 - f.x0 + .4) * T);
  });
  for (const s of C.springs) if (vis(s.x - 1, s.x + 1)) {
    const sq = R.boing && R.boing.x == s.x ? 1 - Math.max(0, R.boing.t) * 1.5 : 1;
    const h = 1.2 * T * Math.max(.55, sq);
    hopImg(c, V.spring, X(s.x - .6), Y(s.y) - h + T * .05, 1.2 * T, h);
  }
  C.pads.forEach(d => { if (vis(d.x0, d.x1)) hopImg(c, V[(st.gates >> d.g) & 1 ? 'pad1' : 'pad0'], X(d.x0 - .1), Y(d.y) - .55 * T, 1.4 * T); });
  C.gates.forEach((g, i) => { if (vis(g.x0 - 1, g.x1 + 1)) hopImg(c, V[(st.gates >> i) & 1 ? 'gate1' : 'gate0'], X(g.x0 - .2), Y(g.y1) - T * .2, T, 3.5 * T); });
  C.cps.forEach((q, i) => { if (i && vis(q.x - 1, q.x + 1)) hopImg(c, V[i <= st.cp ? 'flag1' : 'flag0'], X(q.x - .3), Y(q.y) - 2 * T, T, 2 * T); });
  if (C.goal && vis(C.goal.x - 2, C.goal.x + 3)) hopImg(c, V.goal, X(C.goal.x - .45), Y(C.goal.y) - 3.5 * T, 2 * T, 3.5 * T);
  // kite clouds with their kites
  C.movers.forEach((m, i) => {
    const q = hopMover(m, st.t);
    if (!vis(q.x - 1, q.x + m.w + 2)) return;
    hopImg(c, V.kite, X(q.x + m.w - .4), Y(q.y + 2.6), T, 2 * T);
    hopImg(c, V.mv[i], X(q.x - .2), Y(q.y) - T * .25, (m.w + .4) * T);
  });
  // sparkles, stars, puffs
  const bob = Math.sin(st.t * 3) * .12;
  C.spk.forEach((s, i) => { if (!st.got[i] && vis(s.x - 1, s.x + 1)) hopImg(c, V.spark, X(s.x - .275), Y(s.y + .275 + bob), .55 * T); });
  C.stars.forEach((s, i) => { if (!(st.stars >> i & 1) && vis(s.x - 1, s.x + 1)) hopImg(c, V.star, X(s.x - .5), Y(s.y + .5 - bob), T); });
  for (const f of C.puffs) if (vis(f.x - 1, f.x + 1)) hopImg(c, V.puff, X(f.x - .65), Y(hopPuffY(f, st.t) + .65), 1.3 * T);
  // little bits: dust when landing, sparkles when collecting, the trail, the poof of a fall
  for (let i = R.fx.length - 1; i >= 0; i--) {
    const q = R.fx[i];
    q.life -= dt;
    if (q.life <= 0) { R.fx.splice(i, 1); continue; }
    q.x += q.vx * dt;
    q.y += q.vy * dt;
    c.globalAlpha = Math.min(1, q.life * 2.5);
    c.fillStyle = V.col[q.c] || V.col.w;
    c.beginPath();
    c.arc(X(q.x), Y(q.y), q.r * T * (q.grow ? 1 + (1 - q.life) : 1), 0, 6.3);
    c.fill();
  }
  c.globalAlpha = 1;
  // the pet: stretched when it hops, squashed when it lands, tipped a little forward when it runs; hidden while it poofs
  if (st.wait != 'fall') {
    const s = V.pet[p.vy > 1 && !p.gr ? 'cheer' : st.wait == 'back' || p.kb > 0 ? 'oops' : 'happy'];
    R.sq = Math.max(0, (R.sq || 0) - dt * 4);
    const str = p.gr ? 1 - R.sq * .18 : 1 + Math.min(.12, Math.abs(p.vy) * .008), wid = 2.1 * T / Math.sqrt(str);
    c.save();
    c.translate(X(p.x), Y(p.y) + T * .08);
    c.rotate(p.gr ? Math.max(-.12, Math.min(.12, p.vx * .012)) : Math.max(-.2, Math.min(.2, p.vx * .02 - p.vy * .004)));
    if (p.face < 0) c.scale(-1, 1);
    if (s.c) c.drawImage(s.c, -wid / 2, -wid * str * .92, wid, wid * str);
    c.restore();
  }
  // the helper balloon: offered next to the pet, or carrying it
  if (st.wait == 'lift' || st.wait == 'offer') {
    const lift = st.wait == 'lift', bx = lift ? p.x - .1 : p.x + 1.4, by = (lift ? p.y + 1.2 : p.y + 1.6) + Math.sin(st.t * 2) * .15;
    hopImg(c, V.balloon, X(bx - 1), Y(by + 3), 2 * T, 3 * T);
  }
}
// the bits: [x, y, vx, vy, life, radius, colour, grows]
function hopFx(x, y, n, c, sp, r = .08, grow) {
  if (!HP || (hopCalm() && n > 3)) n = Math.min(n, 3);
  for (let i = 0; i < n; i++) {
    const a = i / n * 6.28 + (HP.fx.length % 7);
    HP.fx.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * .7 + sp * .3, life: .5 + (i % 3) * .1, r, c, grow });
  }
  if (HP.fx.length > 80) HP.fx.splice(0, HP.fx.length - 80);
}

/* ---- the screens ---- */
const hopStarChip = (n, of = 3, id = 'hpst') => `<span class="stat star" id="${id}" aria-label="Stars found">${ico('star', 32)}<b>${n}/${of}</b></span>`;
const hopPetPic = () => {
  const w = S.wear || {};
  return petSVG(S.pet, stage(S.stars), 'happy', { hat: wearOf(w.hat), toy: wearOf(w.toy) });
};
function hopMenu(world) {
  const r = hopS();
  if (world != null && hopOpen(HOP_COURSES[world * 6], r)) r.world = world;
  const W = HOP_WORLDS[r.world], cur = HOP_BY[r.cur], all = hopStarsAll(r), done = hopDone(r), one = r.mode == 'one';
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
  view(`${GH.top('hop')}<div class="scroll hp-menu">
  <section class="hp-hero" style="--gh-a:var(--sc-${W.sky[0]});--gh-b:var(--sc-${W.sky[1]})">
   <div class="hp-hpet"><span class="hp-pet">${hopPetPic()}</span><svg class="art hp-hcl" viewBox="0 0 136 60" aria-hidden="true" focusable="false">` +
     `${hopCloudArt(3, .9, W.cloud)}</svg></div>
   <div class="hp-hinfo"><p class="hp-hl">${ico('star', 26)}<b>${all}</b> of 72 stars</p><p class="hp-hl">${ico('trophy', 26)}<b>${done}</b> of 24 courses</p>
   ${UI.btn('Play ' + cur.name, { kind: 'primary', size: 'lg', icon: 'play', id: 'hopgo', wide: true })}</div></section>
  <section class="hp-opts"><h2 class="hp-h">How do you hop?</h2>
   <div class="hp-mode">${UI.seg([['one', 'One-touch'], ['free', 'Free move']], r.mode, { id: 'hpmode', label: 'How to hop' })}
   <p>${one ? 'One-touch: your pet runs by itself. Tap anywhere to hop. Hold to float down slowly.' :
    'Free move: the arrows walk left and right. Jump hops; hold it longer to hop higher. Go back for a star you missed!'}</p></div></section>
  <h2 class="hp-h">Worlds</h2><div class="hp-worlds">${HOP_WORLDS.map(wcard).join('')}</div>
  <h2 class="hp-h">${esc(W.name)}: ${esc(W.adds.toLowerCase())}</h2><div class="hp-crss">${HOP_COURSES.filter(c => c.w == r.world).map(ccard).join('')}</div>
  <h2 class="hp-h">Sparkle trail</h2><div class="hp-trs">${HOP_TRAILS.map(trail).join('')}</div>
  <ul class="hp-how">${[['flag', 'Hop to the checkered flag.'], ['star', 'Three stars hide on every course. Look up high and down low!'],
    ['replay', 'Fall off? No problem: you start again at the last little flag.'], ['medal', 'Be quick for a gold medal. Beat your own best time!']]
    .map(([i, t]) => `<li><span class="hp-hi">${ico(i == 'flag' ? 'target' : i, 22)}</span><span>${esc(t)}</span></li>`).join('')}</ul></div>`);
  GH.wire({ back: () => gameRoom() });
  $('#hopgo').onclick = () => hopTry(r.cur);
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
function hopTry(id) {
  if (ptLeft() <= 0) {
    SFX.wrong();
    fb(ptWhyNot(), 'warn long', 3000);
    return;
  }
  SFX.whoosh();
  hopPlay(id);
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
function hopPlay(id) {
  const r = hopS(), c = HOP_BY[id], mode = r.mode, W = HOP_WORLDS[c.w];
  r.cur = id;
  r.world = c.w;
  save();
  const btn = (bid, icon, aria, txt) => `<button class="hp-btn" id="${bid}" data-k="${bid.slice(2)}" aria-label="${aria}">${ico(icon, 44)}` +
    `${txt ? `<span>${txt}</span>` : ''}</button>`;
  view(`${GH.top('hop', { play: true, hud: true, sub: c.name, chips: hopStarChip(0) + UI.chip('timer', '0:00', { id: 'hpclk', aria: 'Course time' }) })}
  <div class="hpg hp-${mode} hp-w-${W.id}" id="hp"><canvas id="hpcv"></canvas><div class="hp-msg" id="hpmsg" aria-live="polite"></div>
  <div class="hp-ctl">${mode == 'free' ? btn('hpl', 'arrow-left', 'Walk left') + btn('hpr', 'arrow-right', 'Walk right') : ''}${btn('hpj', 'arrow-up', 'Hop', mode == 'free' ? 'Jump' : 'Hop')}</div>
  <div class="hp-offer" id="hpoffer" hidden><div class="hp-ocard" role="dialog" aria-label="The helper balloon">
   <svg class="art hp-obal" viewBox="0 0 80 120" aria-hidden="true" focusable="false">${HOP_ART.balloon()}</svg>
   <p>Need a lift? The balloon can carry you to the next flag.</p>
   <div class="hp-oacts">${UI.btn('Yes, please', { kind: 'primary', size: 'lg', icon: 'balloon', id: 'hpyes' })}${UI.btn('No, thanks', { size: 'lg', icon: 'replay', id: 'hpno' })}</div></div></div></div>`);
  const st = hopNew(id, { mode }), cv = $('#hpcv');
  HP = { st, c, r, cv, ctx: cv.getContext('2d', { alpha: false }), ptr: {}, key: {}, pend: false, acc: 0, last: 0, raf: 0, paused: false,
    ft: [], fi: [], q: 1, fc: 0, qAt: 0, fx: [], shake: 0, sec: -1, said: {} };
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
    for (const k of ['l', 'r', 'j']) if ($('#hp' + k)) $('#hp' + k).classList.toggle('on', on.has(k));
    HP.on = on;
  };
  box.addEventListener('pointerdown', e => {
    if (!HP || e.target.closest('.gh-top, .hp-offer')) return;
    e.preventDefault();
    const k = keyOf(e);
    if (!k) return;
    HP.ptr[e.pointerId] = k;
    if (k == 'j') HP.pend = true;
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
  const KEYS = { ArrowLeft: 'l', ArrowRight: 'r', ArrowUp: 'j', ' ': 'j' };
  HP.kd = e => {
    if (!HP || !KEYS[e.key] || (mode == 'one' && KEYS[e.key] != 'j')) return;
    if (KEYS[e.key] == 'j' && !HP.key.j) HP.pend = true;
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
    const tip = c.w && !HOP_COURSES.slice(0, c.i).some(x => x.w == c.w && r.best[x.id]) ? ['', 'Tap again in the air to hop higher!', 'Hop onto a kite cloud for a ride!',
      'Step on the red switch to open the gate!'][c.w] : '';
    hopMsg(first || !tip ? (mode == 'one' ? 'Tap to hop!' : 'Arrows to walk, Jump to hop!') : tip, 2200);
    if (S.voice) say(first ? 'Tap to hop! Find the three stars and reach the flag!' : tip || c.name);
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
    if (HP.ready && !document.hidden && !HP.paused && !GH.held && !st.done && st.wait != 'offer') {
      HP.acc += dt * HOP_DEV.fast;
      let n = 0;
      while (HP.acc >= HOP_DT && n < 8 * HOP_DEV.fast && !st.done && st.wait != 'offer') {
        const on = HP.on || new Set();
        hopStep(st, { jump: HP.pend || on.has('j'), dir: (on.has('r') ? 1 : 0) - (on.has('l') ? 1 : 0) });
        HP.pend = false;
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
    if (++HP.fc % 90 == 0 && HP.fi.length >= 60) {
      const med = HP.fi.slice(-60).sort((a, b) => a - b)[30], q = HP.q;
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
      if (tr && tr[3]) hopFx(p.x, p.y + .2, 4, tr[0] == 'rainbow' ? ['r', 'o', 'y', 'g', 'b', 'v'][Math.floor(st.t * 7) % 6] : tr[3], 1.2, .1);
    } else if (k == 'spring') {
      hopTone(220, .3, 0, 'triangle', .08, 900);
      HP.boing = { x: hopSpringAt(st), t: .3 };
      HP.shake = .5;
      hopMsg('Boing!', 700);
    } else if (k == 'land') {
      if (!hopCalm()) hopFx(p.x, p.y + .05, 4, 'w', 1.4, .1);
      HP.sq = 1;
    } else if (k == 'spk') {
      hopTone(NOTE(HOP_SCALE[(a - 1) % 8] + 12), .08, 0, 'sine', .06);
      hopFx(p.x, p.y + .8, 3, 'y', 2, .07);
    } else if (k == 'star') {
      SFX.star();
      hopFx(p.x, p.y + .8, 8, 'y', 3, .1);
      const n = hopBits(st.stars);
      hopMsg(n == 3 ? 'All three stars!' : `A star! ${n} of 3`, 1400, 'big');
      UI.setChip($('#hpst'), n + '/3');
    } else if (k == 'puff') {
      SFX.giggle();
      HP.shake = .6;
      hopMsg('Boing! A friendly puff.', 1000);
    } else if (k == 'gate') {
      hopTone(300, .3, 0, 'triangle', .08, 120);
      hopMsg('Step on the switch to open the gate!', 1800);
    } else if (k == 'switch') {
      hopTone(660, .08, 0, 'square', .04);
      hopTone(990, .14, .08, 'triangle', .06);
      hopMsg('The gate is open!', 1200);
    } else if (k == 'cp') {
      [0, 4, 7].forEach((d, i) => hopTone(NOTE(79 + d), .12, i * .07, 'triangle', .06));
      if (st.wait != 'lift') hopMsg('Checkpoint!', 900);
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
    } else if (k == 'lift') SFX.magic();
    else if (k == 'goal') {
      hopMsg('You made it!', 1500, 'big');
      SFX.fanfare();
      gtStop();
      HP.endT = setTimeout(() => { if (HP && HP.st === st) hopFinish(); }, hopCalm() ? 400 : 1300);
    }
  }
  st.ev.length = 0;
  const s = Math.floor(st.t);
  if (s != HP.sec) {
    HP.sec = s;
    const el = $('#hpclk b');
    if (el) el.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }
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
  hopKeepStars();
  save();
  hopStop();
  gtStop();
  hopMenu();
}
function hopTimeUp() {
  hopKeepStars();
  save();
  hopStop();
  timeUpOverlay();
}
// the flag: the time and the medal, the stars, what opened; the shared end card
// what a finished course changes in the save: the best time (lowest), the stars found (added), the medal (highest), the next course
function hopRecord(r, c, st) {
  const before = hopStarsAll(r), had = r.best[c.id], ms = Math.max(1, Math.round(st.t * 1000)), md = hopMedal(c, st.t);
  const next = HOP_COURSES[c.i + 1], opening = !!next && !hopOpen(next, r), rec = !had || ms < had;
  if (rec) r.best[c.id] = ms;
  r.stars[c.id] = (r.stars[c.id] || 0) | st.stars;
  r.medal[c.id] = Math.max(r.medal[c.id] || 0, md);
  r.runs++;
  if (next) r.cur = next.id;
  const trails = HOP_TRAILS.filter(t => t[2] && before < t[2] && hopStarsAll(r) >= t[2]);
  return { ms, md, had, rec, next, opening, trails, gotNow: hopBits(st.stars), gotAll: hopBits(r.stars[c.id]) };
}
function hopFinish() {
  const st = HP.st, c = HP.c, r = hopS(), id = c.id;
  const { ms, md, had, rec, next, opening, trails, gotNow, gotAll } = hopRecord(r, c, st);
  save();
  hopStop();
  const lines = [], MED = ['', 'Bronze', 'Silver', 'Gold'];
  lines.push(['medal', `${MED[md]} medal! Gold: ${hopGold(c)} s.` + (had && !rec ? ` Your best: ${hopTime(had)}.` : '')]);
  lines.push(['star', gotAll == 3 ? 'You found all three stars on this course!' : `Stars found on this course: ${gotAll} of 3. Look up high and down low!`]);
  if (opening) lines.push(['sparkle', next.w != c.w ? `New world: ${esc(HOP_WORLDS[next.w].name)}!` : `New course: ${esc(next.name)}!`]);
  for (const t of trails) lines.push(['sparkle', `New sparkle trail: ${esc(t[1])}!`]);
  if (st.helped) lines.push(['balloon', 'The helper balloon gave you a lift. Try it on your own next time!']);
  const time = ptLeft() > 0;
  const o = GH.end('hop', { win: true, title: 'You reached the flag!', stars: gotNow, tag: rec && had ? 'New best time!' : '',
    stats: [[hopTime(ms), 'time', 'timer'], [String(st.spk), 'sparkles', 'sparkle'], [MED[md], 'medal', 'medal']], lines,
    btns: (time ? (next ? UI.btn('Next course', { kind: 'primary', size: 'lg', icon: 'play', id: 'hpnext', wide: true }) : '') +
      UI.btn('Play again', { kind: next ? 'soft' : 'primary', size: next ? 'md' : 'lg', icon: 'replay', id: 'hpagain', wide: true }) :
      UI.btn('Earn more game time', { kind: 'primary', size: 'lg', icon: 'path-read', id: 'hplearn', wide: true })) +
      UI.btn('Courses', { icon: 'map', id: 'hpmenu', wide: true }) });
  if (S.voice) say(`You reached the flag! ${gotNow ? `You found ${gotNow} ${gotNow == 1 ? 'star' : 'stars'}. ` : ''}Well done, ${S.name || 'friend'}!`);
  const go = f => { o.remove(); f(); };
  const again = cid => go(() => (ptLeft() > 0 ? hopPlay(cid) : hopMenu()));
  if (o.querySelector('#hpnext')) o.querySelector('#hpnext').onclick = () => again(next.id);
  if (o.querySelector('#hpagain')) o.querySelector('#hpagain').onclick = () => again(id);
  if (o.querySelector('#hplearn')) o.querySelector('#hplearn').onclick = () => go(() => home());
  o.querySelector('#hpmenu').onclick = () => go(() => hopMenu());
}

// The Game Room card (59-game-hub.js shows it after the games file's games)
GH.reg({
  id: 'hop', btn: 'ghop', name: 'Sky Hop', icon: 'balloon', p: 'disc', sky: ['sky-1', 'sky'], art: () => hopHubArt(),
  sub: () => {
    const r = hopPeek();
    return hopNum(r.runs, 0, 1e7) ? `<span>${ico('star', 18)}<b>${hopStarsAll(r)}</b> of 72 stars</span><span>${ico('trophy', 18)}<b>${hopDone(r)}</b> of 24</span>`
      : '<span>Hop through the clouds with your pet</span>';
  },
  open: () => hopMenu(), tapToPlay: '#hopgo', saved: 'Your stars are saved.',
});
