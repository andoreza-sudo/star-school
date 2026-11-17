/* ---------- Star Rally in 2.5D (GL-02): the WebGL look, on the GLX layer (60-gl.js, games part, loaded before rally) ----------
   Only the drawing changes: rlNew / rlStep, the controls, tracks, rivals, stars and saves are the same code as the 2D look, and the
   3D view uses the 2D look's own projection (the camera RL_PZ behind the car, RL_CAMH up, the same bends and hills), so every
   car, hazard, pad and pick-up is exactly where the 2D look puts it. rlRace puts a WebGL canvas (#rlgl) under the 2D canvas
   (#rlcv); each frame rlDraw calls rlGlFrame and the 2D canvas, cleared, carries only the small things on top (the shield, dizzy
   stars and drift sparks of the child's car, the speed lines, rain and snow). The 2D look stays and is used when WebGL is missing
   or fails or is drawn by the CPU (no GPU: RGL.soft turns 3D on there anyway, for tools/smoke.js and the screenshots), when the
   context is lost, when it is turned off (the Star Rally menu, "3D look": S.rlGl = false), and for the rest of the visit when
   frames stay slow even at the lowest pixel scale (rlGlPace, rlGlDrop).
   The scene (camera space: x right, y up, z ahead; world units as the simulation's; heights scaled like the 2D look's, AK):
   - The ground is one mesh, rebuilt each frame into one buffer (the road bends round the camera, as in the 2D look), drawn far to
     near in a single draw call with the depth test off and depth written, so a nearer hill top covers the road behind it as the
     2D look's clip line does, and the depth buffer then hides the sprites behind it. Each row: water by bridges, the land on both
     sides (flat by the road, then rising into hills that are fixed in track space, lit by their slope and hazy far away), the
     raised kerbs, the road with its bands, lanes, puddles, sand, ice, pads and the start line, rails and walls as lit boxes, the
     split's divider, bridge decks on pillars, tunnels with walls, a roof, lamps and a face round their mouth in a hill.
   - Behind: the sky, the sun and clouds, the place's two painted layers (the 2D look's), a haze band. Ahead of the ground's own
     haze (distance fog toward the sky colour, much more in Fog).
   - Sprites: the roadside things, sparkles, pick-ups, hazards, the rivals and the ghost are the 2D look's art in one texture atlas
     (mipmapped, so far things do not shimmer), drawn far to near in one batch with the depth test on; flat soft shadows under the
     cars and the big roadside things. The child's car is drawn where the 2D look draws it, with the depth test off (so a hill or a
     wall never hides it, the FIX3 lesson of Hill Climb's bridge rail), then only the sprites nearer than it, as in the 2D look.
   - Each race has its own light (rlMood, from the race's seed; drawing only): the sun's side and height, a warm or cool tint, where
     the painted layers start, the clouds, and the shape of the hills, so no two races look quite the same. The 2D look uses the
     sun's place and the layers' start too.
   About 10 draw calls a frame; the buffers, matrices and draw options are made once per race. Colours are the --ill-* and --sc-*
   tokens (rlCol). */
const RGL = { soft: false, near: 100, far: 40000, AT: 1024, MAXF: 168000, DL: [0, .5, 1.3, 2.6, 4.5, 8, 15, 30, 150] };
let RL_GLOFF = false; // set for the rest of the visit when the 3D look was too slow (rlGlDrop)
// the 3D look is wanted: not turned off (Star Rally menu), not dropped for speed this visit
const rlGlWant = () => S.rlGl !== false && !RL_GLOFF;
// the race's own light and scenery (drawing only, never the race): from the race's seed, with its own random numbers
function rlMood(seed) {
  const r = rlRng(((seed >>> 0) ^ 0x5bd1e995) >>> 0 || 7), side = r() < .5 ? -1 : 1, hi = .5 + r() * .35, warm = r() * 2 - 1, sx = side < 0 ? .06 + r() * .2 : .5 + r() * .24;
  const L = [side * (.35 + r() * .45), hi, .3], l = Math.hypot(L[0], L[1], L[2]);
  return { sx, bg: r() * 2, side, warm, ph: r() * 60, hill: .75 + r() * .5, cl: r(), L: L.map(v => v / l),
    tint: warm > 0 ? [1, 1 - .03 * warm, 1 - .09 * warm] : [1 + .02 * warm, 1, 1 - .05 * warm] };
}
// make the renderer on canvas cv for race R; null when WebGL is missing or fails (the race then draws in 2D)
function rlGlStart(R, cv) {
  if (!rlGlWant()) return null;
  const X = GLX.init(cv);
  if (!X) return null;
  if (X.soft && !RGL.soft) { GLX.end(X); R.glWhy = 'software'; return null; }
  const f = new Float32Array(RGL.MAXF), D = 154;
  const G = { R: X, cv, off: false, q: 1, fq: 0, slow: 0, frames: 0, f, k: 0, gm: GLX.mesh(X, 'grad', f, 0, true), B: GLX.batch(X, 900),
    VP: new Float32Array(16), SCR: new Float32Array(16), ex: new Float64Array(D), ez: new Float64Array(D), ey: new Float64Array(D), ew: new Float64Array(D),
    ys: new Float64Array(D), bx: new Float64Array(8), by: new Float64Array(4), ei: new Int32Array(D), ok: new Uint8Array(D), cr: new Int8Array(8), cd: new Float64Array(8), L: [0, 1, 0], amb: .6, l0: 1,
    T: [1, 1, 1], F: [1, 1, 1], f0: 0, fk: 0, fm: 0, col: {}, tid: '', at: null, W: 0, H: 0, V: null, tex: null, gq: null, gate: null, O: {} };
  G.O = { gnd: { n: 0 }, lt: { n: 0, first: 0 }, spr: { tex: null }, me: { tex: null }, far: { tex: null }, near: { tex: null }, gate: { tex: null } };
  G.put = (k, x, y, sz, a) => rgTrailPut(G, k, x, y, sz, a);
  return G;
}
// the 3D look stops for this race (and for the rest of the visit when it was too slow); the 2D look takes over at once
function rlGlDrop(R, why) {
  const G = R.gl;
  if (!G) return;
  G.off = true;
  if (why == 'slow') RL_GLOFF = true;
  try { G.cv.style.display = 'none'; } catch (e) {}
  try { R.ctx.clearRect(0, 0, R.cv.width, R.cv.height); } catch (e) {}
  R.glWhy = why;
}
// every 90 frames with the median frame time (ms): slow frames first draw fewer WebGL pixels (.8, .64, then .5 of them a side,
// stretched to the screen), then, still slow 3 times running, the 2D look (rlGlDrop). True while the 3D look is drawing.
function rlGlPace(R, med) {
  const G = R.gl;
  if (!G || G.off) return false;
  if (med > 26) {
    if (G.q > .51) { G.q = G.q > .9 ? .8 : G.q > .7 ? .64 : .5; G.slow = 0; }
    else if (++G.slow >= 3) { rlGlDrop(R, 'slow'); return false; }
  } else G.slow = 0;
  return true;
}
// one frame of the 3D look; false when it cannot draw (the 2D look draws this frame instead). A failure drops to the 2D look for
// the race and is kept in the app log (Grown-ups), never shown to the child.
function rlGlFrame(R) {
  try { return rgFrame(R); } catch (e) { rlGlDrop(R, 'error'); logErr('Star Rally 3D look: ' + (e && e.message)); return false; }
}
const rgC = (G, role) => G.col[role] || (G.col[role] = GLX.rgb(rlCol(role)));
const rgRamp = (v, a, b) => (v <= a ? 0 : v >= b ? 1 : (v - a) / (b - a));
// the track's tunnels and bridges spread over the segments round them (the hills over a tunnel, the dip down to a bridge's water)
function rgTrackOf(G, T) {
  if (G.tid === T.id) return;
  const n = T.n, tm = new Float32Array(n), bd = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    let a = 0, b = 0;
    for (let j = -12; j <= 12; j++) {
      const fl = T.fl[rlMod(i + j, n)], d = Math.abs(j);
      if (fl & 1) a = Math.max(a, 1 - rgRamp(d, 0, 12));
      if (fl & 2 && d <= 5) b = Math.max(b, 1 - rgRamp(d, 0, 5));
    }
    tm[i] = a * a * (3 - 2 * a);
    bd[i] = b;
  }
  G.tm = tm; G.bd = bd; G.tid = T.id;
}
// the land's height d road half-widths beyond the kerb on side s of segment i (fixed in track space: it does not swim)
function rgTh(G, i, s, d) {
  let h = 0;
  const A = G.amp;
  if (A) {
    const p = G.ph + s * 3.1, r1 = rgRamp(d, .8, 4), r2 = rgRamp(d, 4, 18);
    if (r1 > 0) h = A * (r1 * r1 * (3 - 2 * r1) * (650 + 450 * Math.sin(i * .061 + p)) + r2 * (2400 + 1500 * Math.sin(i * .017 + p * 1.7) + 700 * Math.sin(i * .043 + p * .6)));
  }
  const tm = G.tm[i];
  if (tm > 0) h = Math.max(h, tm * G.Hm * rgRamp(d, 0, 2.6) * (1 - .4 * rgRamp(d, 6, 16)));
  const bd = G.bd[i];
  if (bd > 0) h += (G.WD - h) * (bd >= .99 ? 1 : bd * rgRamp(d, 0, .8));
  return h;
}
// ---- the ground buffer: lit, hazy vertices (grad program: x, y, z, r, g, b, a) ----
function rgV(G, x, y, z, c, l, a) {
  const f = G.f, F = G.F, T = G.T, t = Math.min(G.fm, Math.max(0, (z - G.f0) * G.fk));
  let k = G.k;
  const r = c[0] * l * T[0], g = c[1] * l * T[1], b = c[2] * l * T[2];
  f[k++] = x; f[k++] = y; f[k++] = z; f[k++] = r + (F[0] - r) * t; f[k++] = g + (F[1] - g) * t; f[k++] = b + (F[2] - b) * t; f[k++] = a;
  G.k = k;
}
// a quad a b c d (a to b across, a to d along), colour c lit by its slope (lit false: as it is); a its alpha
function rgQ(G, ax, ay, az, bx, by, bz, cx, cy, cz, dx, dy, dz, c, lit, a) {
  if (G.k + 42 > G.f.length) return;
  let l = 1;
  if (lit !== false) {
    const ux = dx - ax, uy = dy - ay, uz = dz - az, vx = bx - ax, vy = by - ay, vz = bz - az, L = G.L;
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    if (nx * (ax + cx) + ny * (ay + cy) + nz * (az + cz) > 0) { nx = -nx; ny = -ny; nz = -nz; } // the side the camera sees
    const nl = Math.hypot(nx, ny, nz) || 1;
    l = Math.min(1.25, (G.amb + (1 - G.amb) * Math.max(0, (nx * L[0] + ny * L[1] + nz * L[2]) / nl)) / G.l0);
  }
  if (a == null) a = 1;
  rgV(G, ax, ay, az, c, l, a); rgV(G, bx, by, bz, c, l, a); rgV(G, cx, cy, cz, c, l, a);
  rgV(G, ax, ay, az, c, l, a); rgV(G, cx, cy, cz, c, l, a); rgV(G, dx, dy, dz, c, l, a);
}
// a strip along the row from edge e0 to e1 between u0 and u1 (world units from the road's middle) at heights h0, h1 over the road
function rgS(G, e0, e1, u0, u1, h, c, lit) {
  const ex = G.ex, ey = G.ey, ez = G.ez;
  rgQ(G, ex[e0] + u0, ey[e0] + h, ez[e0], ex[e0] + u1, ey[e0] + h, ez[e0], ex[e1] + u1, ey[e1] + h, ez[e1], ex[e1] + u0, ey[e1] + h, ez[e1], c, lit);
}
// the same, but u in road half-widths of each edge (the road's own width changes along the track)
function rgSW(G, e0, e1, u0, u1, h, c, lit) {
  const ex = G.ex, ey = G.ey, ez = G.ez, w0 = G.ew[e0], w1 = G.ew[e1];
  rgQ(G, ex[e0] + u0 * w0, ey[e0] + h, ez[e0], ex[e0] + u1 * w0, ey[e0] + h, ez[e0], ex[e1] + u1 * w1, ey[e1] + h, ez[e1], ex[e1] + u0 * w1, ey[e1] + h, ez[e1], c, lit);
}
// an upright face along the row at x = u from the road (or uw road half-widths more), from height h0 to h1
function rgWall(G, e0, e1, s, uw, ux, h0, h1, c) {
  const ex = G.ex, ey = G.ey, ez = G.ez, xa = ex[e0] + s * (G.ew[e0] * uw + ux), xb = ex[e1] + s * (G.ew[e1] * uw + ux);
  rgQ(G, xa, ey[e0] + h0, ez[e0], xb, ey[e1] + h0, ez[e1], xb, ey[e1] + h1, ez[e1], xa, ey[e0] + h1, ez[e0], c);
}
const RGL_MIX = [0, 0, 0];
const rgMix = (a, b, t, o = RGL_MIX) => { o[0] = a[0] + (b[0] - a[0]) * t; o[1] = a[1] + (b[1] - a[1]) * t; o[2] = a[2] + (b[2] - a[2]) * t; return o; };
// one row of the ground, from edge n to edge n + s (s > 1 far away, where one segment is a pixel or two)
function rgRow(G, R, n, s) {
  const st = R.st, T = st.T, N = T.n, RW = RL_ROADW, AK = G.AK, e0 = n, e1 = n + s, i = G.ei[n], i1 = G.ei[e1], fl = T.fl[i];
  let ok = 0;
  for (let q = 0; q < s; q++) ok |= G.ok[n + q];
  const fine = s == 1 && G.ys[e0] - G.ys[e1] >= 2 * R.v.k, band = fine ? Math.floor(i / 3) & 1 : 0, C = G.cc, z0 = G.ez[e0];
  const DL = RGL.DL, J = z0 > 20000 ? RGL_JF : z0 > 8000 ? RGL_JM : RGL_JN, kw = .14 * RW, tun = fl & 1;
  // water by bridges (the land dips to it), shimmering in bands
  if (G.bd[i] > .01 || G.bd[i1] > .01) rgS(G, e0, e1, -150 * RW, 150 * RW, G.WL, band ? C.wat2 : C.wat, false);
  // the land on both sides, from far out in to the kerb (the nearer piece is drawn over the farther one)
  for (let sd = -1; sd <= 1; sd += 2) {
    for (let q = J.length - 1; q > 0; q--) {
      const j0 = J[q - 1], j1 = J[q], d0 = DL[j0], d1 = DL[j1];
      const xa0 = G.ex[e0] + sd * (G.ew[e0] + kw + d0 * RW), xa1 = G.ex[e0] + sd * (G.ew[e0] + kw + d1 * RW);
      const xb0 = G.ex[e1] + sd * (G.ew[e1] + kw + d0 * RW), xb1 = G.ex[e1] + sd * (G.ew[e1] + kw + d1 * RW);
      const c = d0 < 1.2 ? (band ? C.g1 : C.g0) : rgMix(C.g0, C.gf, rgRamp(d0, 1.2, 12) * .8);
      if (d0 >= 1.2 && (i + q + sd) % 3 == 0) { c[0] *= .96; c[1] *= .97; c[2] *= .97; } // a low-poly mottle
      rgQ(G, xa0, G.ey[e0] + rgTh(G, i, sd, d0), z0, xa1, G.ey[e0] + rgTh(G, i, sd, d1), z0, xb1, G.ey[e1] + rgTh(G, i1, sd, d1), G.ez[e1],
        xb0, G.ey[e1] + rgTh(G, i1, sd, d0), G.ez[e1], c);
    }
  }
  // bridge pillars down to the water (every 5th segment)
  if (fl & 2 && i % 5 == 0) for (let sd = -1; sd <= 1; sd += 2) {
    const x = G.ex[e0] + sd * G.ew[e0] * .7, y = G.ey[e0];
    rgQ(G, x - .07 * RW, y + G.WL, z0 + 1, x + .07 * RW, y + G.WL, z0 + 1, x + .07 * RW, y - 120 * AK, z0 + 1, x - .07 * RW, y - 120 * AK, z0 + 1, C.wa);
  }
  // the road's sides: a deck edge on bridges, a bank down to low land, a wall up to high land (a cutting before a tunnel)
  for (let sd = -1; sd <= 1; sd += 2) {
    const h0 = rgTh(G, i, sd, 0), h1 = rgTh(G, i1, sd, 0);
    if (fl & 2) rgWall(G, e0, e1, sd, 1, kw, -140 * AK, 0, C.lb);
    else if (h0 < -5 || h1 < -5) rgQ(G, G.ex[e0] + sd * (G.ew[e0] + kw), G.ey[e0] + Math.min(0, h0), z0, G.ex[e1] + sd * (G.ew[e1] + kw), G.ey[e1] + Math.min(0, h1), G.ez[e1],
      G.ex[e1] + sd * (G.ew[e1] + kw), G.ey[e1], G.ez[e1], G.ex[e0] + sd * (G.ew[e0] + kw), G.ey[e0], z0, C.e);
    else if (h0 > 5 || h1 > 5) rgQ(G, G.ex[e0] + sd * (G.ew[e0] + kw), G.ey[e0], z0, G.ex[e1] + sd * (G.ew[e1] + kw), G.ey[e1], G.ez[e1],
      G.ex[e1] + sd * (G.ew[e1] + kw), G.ey[e1] + Math.max(0, h1), G.ez[e1], G.ex[e0] + sd * (G.ew[e0] + kw), G.ey[e0] + Math.max(0, h0), z0, band ? C.wb : C.wa);
  }
  // over a tunnel: the hill's top across the road (under the tunnel's roof, seen only from outside)
  if (tun) {
    const h0 = rgTh(G, i, 1, 2.6), h1 = rgTh(G, i1, 1, 2.6);
    rgQ(G, G.ex[e0] - G.ew[e0] - kw, G.ey[e0] + h0, z0, G.ex[e0] + G.ew[e0] + kw, G.ey[e0] + h0, z0, G.ex[e1] + G.ew[e1] + kw, G.ey[e1] + h1, G.ez[e1],
      G.ex[e1] - G.ew[e1] - kw, G.ey[e1] + h1, G.ez[e1], C.gf);
  }
  if (ok) {
    // the raised kerbs (the 2D look's rumble strips), then the road with its bands
    const hk = .025 * RW * AK, rc = band ? C.ra : C.rb;
    for (let sd = -1; sd <= 1; sd += 2) {
      rgQ(G, G.ex[e0] + sd * G.ew[e0], G.ey[e0] + hk, z0, G.ex[e0] + sd * (G.ew[e0] + kw), G.ey[e0] + hk, z0, G.ex[e1] + sd * (G.ew[e1] + kw), G.ey[e1] + hk, G.ez[e1],
        G.ex[e1] + sd * G.ew[e1], G.ey[e1] + hk, G.ez[e1], rc);
      rgWall(G, e0, e1, sd, 1, 0, 0, hk, rgMix(rc, C.k, .25));
    }
    rgSW(G, e0, e1, -1, 1, 0, band ? C.da : C.db);
    if (fine) {
      const sf = T.sfAt[i], rr = T.rw[i];
      if (sf) for (const [a, b, k] of sf) rgS(G, e0, e1, Math.max(a, -rr - .1) * RW, Math.min(b, rr + .1) * RW, 0, rgMix(band ? C.da : C.db, C['s' + k], k == 's' ? .9 : k == 'p' ? .7 : .85), false);
      if ((i & 7) < 4 && !T.dv[i]) { rgSW(G, e0, e1, -.36, -.33, 0, C.ln, false); rgSW(G, e0, e1, .33, .36, 0, C.ln, false); }
      if (i == RL_START || i == RL_START + 1) for (let q = 0; q < 8; q++) rgSW(G, e0, e1, -1 + q / 4, -.75 + q / 4, 0, (q + i) & 1 ? C.w : C.k, false);
      const px = T.padAt[i];
      if (px != null) { rgS(G, e0, e1, (px - .22) * RW, (px + .22) * RW, 0, i & 1 ? C.pa : C.pb, false); rgS(G, e0, e1, (px - .1) * RW, (px + .1) * RW, 0, i & 1 ? C.pb : C.pa, false); }
    }
  }
  // rails or walls on both sides: lit boxes in the place's two colours, a light top
  if (fl & 4 && !tun) {
    const h = .16 * RW * AK, lc = band ? C.lb : C.la;
    for (let sd = -1; sd <= 1; sd += 2) {
      rgWall(G, e0, e1, sd, 1, .14 * RW, 0, h, rgMix(lc, C.k, .2));
      rgWall(G, e0, e1, sd, 1, .1 * RW, 0, h, lc);
      rgQ(G, G.ex[e0] + sd * (G.ew[e0] + .1 * RW), G.ey[e0] + h, z0, G.ex[e0] + sd * (G.ew[e0] + .14 * RW), G.ey[e0] + h, z0,
        G.ex[e1] + sd * (G.ew[e1] + .14 * RW), G.ey[e1] + h, G.ez[e1], G.ex[e1] + sd * (G.ew[e1] + .1 * RW), G.ey[e1] + h, G.ez[e1], rgMix(lc, C.w, .3));
    }
  }
  // the split's divider: a low striped wall with a top (the face nearer the camera drawn last)
  if (T.dv[i]) {
    const h = .14 * RW * AK, lc = band ? C.lb : C.la, sd = G.ex[e0] > 0 ? -1 : 1;
    rgWall(G, e0, e1, sd, 0, .14 * RW, 0, h, lc);
    rgWall(G, e0, e1, -sd, 0, .14 * RW, 0, h, lc);
    rgS(G, e0, e1, -.14 * RW, .14 * RW, h, C.la);
    if (!T.dv[rlMod(i - 1, N)]) rgQ(G, G.ex[e0] - .14 * RW, G.ey[e0], z0, G.ex[e0] + .14 * RW, G.ey[e0], z0, G.ex[e0] + .14 * RW, G.ey[e0] + h, z0, G.ex[e0] - .14 * RW, G.ey[e0] + h, z0, C.lb);
  }
  // a tunnel: walls, the roof, a lamp on each wall every 4th segment
  if (tun) {
    const h = 1.25 * RW * AK, wc = band ? C.wb : C.wa;
    for (let sd = -1; sd <= 1; sd += 2) rgWall(G, e0, e1, sd, 1, .1 * RW, 0, h, wc);
    rgQ(G, G.ex[e0] - G.ew[e0] - .1 * RW, G.ey[e0] + h, z0, G.ex[e0] + G.ew[e0] + .1 * RW, G.ey[e0] + h, z0, G.ex[e1] + G.ew[e1] + .1 * RW, G.ey[e1] + h, G.ez[e1],
      G.ex[e1] - G.ew[e1] - .1 * RW, G.ey[e1] + h, G.ez[e1], rgMix(C.wb, C.k, .35), false);
    if (fine && i % 4 == 0) for (let sd = -1; sd <= 1; sd += 2) {
      const x0 = G.ex[e0] + sd * (G.ew[e0] + .09 * RW), x1 = G.ex[e1] + sd * (G.ew[e1] + .09 * RW), y0 = G.ey[e0] + h * .72, y1 = G.ey[e1] + h * .72;
      rgQ(G, x0, y0, z0, x0 + (x1 - x0) * .5, y0 + (y1 - y0) * .5, z0 + (G.ez[e1] - z0) * .5, x0 + (x1 - x0) * .5, y0 + (y1 - y0) * .5 + .05 * RW * AK, z0 + (G.ez[e1] - z0) * .5,
        x0, y0 + .05 * RW * AK, z0, C.lamp, false);
    }
  }
  // a tunnel's mouth: a stone face in the hill round the opening (left, right and over it), a dark rim
  for (let q = 0; q < s; q++) {
    const iq = G.ei[n + q];
    if (!(T.fl[iq] & 1) || T.fl[rlMod(iq - 1, N)] & 1) continue;
    const e = n + q, x = G.ex[e], y = G.ey[e], z = G.ez[e] - 2, a = G.ew[e] + .1 * RW, b = a + 2.2 * RW, h = 1.25 * RW * AK, top = Math.max(h + .9 * RW * AK, rgTh(G, iq, 1, 2.6));
    rgQ(G, x - b, y, z, x - a, y, z, x - a, y + top, z, x - b, y + top, z, C.wa);
    rgQ(G, x + a, y, z, x + b, y, z, x + b, y + top, z, x + a, y + top, z, C.wa);
    rgQ(G, x - a, y + h, z, x + a, y + h, z, x + a, y + top, z, x - a, y + top, z, C.wa);
    const r = .12 * RW;
    rgQ(G, x - b, y + top - .05 * RW * AK, z - 1, x + b, y + top - .05 * RW * AK, z - 1, x + b, y + top, z - 1, x - b, y + top, z - 1, C.gf, false);
    rgQ(G, x - a - r, y, z - 1, x - a, y, z - 1, x - a, y + h + r * AK, z - 1, x - a - r, y + h + r * AK, z - 1, C.wb);
    rgQ(G, x + a, y, z - 1, x + a + r, y, z - 1, x + a + r, y + h + r * AK, z - 1, x + a, y + h + r * AK, z - 1, C.wb);
    rgQ(G, x - a - r, y + h, z - 1, x + a + r, y + h, z - 1, x + a + r, y + h + r * AK, z - 1, x - a - r, y + h + r * AK, z - 1, C.wb);
  }
}
const RGL_JN = [0, 1, 2, 3, 4, 5, 6, 7, 8], RGL_JM = [0, 2, 4, 6, 8], RGL_JF = [0, 4, 8];
// ---- sprites: one atlas of the place's things, the rivals, the sun, a shadow, a cloud, a glow and the trail's pieces ----
function rgAtlas(G, R) {
  if (G.at) return true;
  const st = R.st, pl = st.T.pl, r = rlPeek();
  if (!G.want) {
    G.want = [];
    for (const k of new Set(pl.props.map(p => p[0]).concat(['arch', 'sparkle', 'lamp', 'cone', 'pstar', 'bubble', pl.roll, pl.crit || 'duck']))) {
      const P = RL_PROPS[k];
      G.want.push(['pr-' + k, rlSprite('pr-' + k, P.vb[0], P.vb[1], P.art(), Math.min(256, Math.max(64, P.wr * 190))), P.wr]);
    }
    for (const rv of RL_RIVALS) G.want.push(['rv-' + rv.id, rlSprite('rv-' + rv.id, 120, 84, rlCarArt('kart', rv.car, '', rv.id), 224)]);
    G.want.push(['sky', rlSprite('sky-' + pl.id, 100, 100, RL_SKY[pl.id](), 160)]);
    if (r.trail && RL_TRAIL_ART[r.trail]) RL_TRAIL_ART[r.trail]().forEach((a, i) => G.want.push(['tr' + i, rlSprite('tr-' + r.trail + i, 40, 40, a, 64)]));
    const P = RL_PROPS.gate;
    G.gs = rlSprite('pr-gate', P.vb[0], P.vb[1], P.art(), 512);
  }
  if (G.want.some(w => !w[1].c) || !G.gs.c) return false;
  // shelves of cells (6 pixels apart, so a mipmap does not mix two), smaller when they do not fit
  const A = RGL.AT, c = document.createElement('canvas');
  c.width = c.height = A;
  const x = c.getContext('2d'), cells = G.want.map(([k, s]) => [k, s.c]);
  const mk = (w, h, f) => { const q = document.createElement('canvas'); q.width = w; q.height = h; f(q.getContext('2d'), w, h); return q; };
  cells.push(['shadow', mk(96, 48, (y, w, h) => { const g = y.createRadialGradient(w / 2, h / 2, 1, w / 2, h / 2, h / 2); g.addColorStop(0, rlCol('k')); g.addColorStop(1, 'transparent');
    y.setTransform(w / h, 0, 0, 1, 0, 0); y.fillStyle = g; y.fillRect(0, 0, h, h); y.globalAlpha = 1; })]);
  cells.push(['glow', mk(64, 64, (y, w, h) => { const g = y.createRadialGradient(32, 32, 1, 32, 32, 31); g.addColorStop(0, rlCol('y1')); g.addColorStop(1, 'transparent'); y.fillStyle = g; y.fillRect(0, 0, w, h); })]);
  cells.push(['cloud', mk(224, 96, (y) => { y.fillStyle = rlCol('w'); for (const [a, b, rr] of [[60, 62, 30], [104, 48, 40], [150, 60, 32], [180, 70, 22], [36, 74, 18]]) { y.beginPath(); y.arc(a, b, rr, 0, 7); y.fill(); }
    y.fillRect(36, 62, 150, 30); })]);
  let k = 1;
  for (; k > .4; k *= .85) {
    let px = 6, py = 6, rh = 0, fit = true;
    const pos = [];
    for (const [, cv] of cells.slice().sort((a, b) => b[1].height - a[1].height)) {
      const w = Math.ceil(cv.width * k), h = Math.ceil(cv.height * k);
      if (px + w + 6 > A) { px = 6; py += rh + 8; rh = 0; }
      if (py + h + 6 > A) { fit = false; break; }
      pos.push([cv, px, py, w, h]);
      px += w + 8; rh = Math.max(rh, h);
    }
    if (!fit) continue;
    G.cell = {};
    for (const [cv, px2, py2, w, h] of pos) {
      x.drawImage(cv, px2, py2, w, h);
      const key = cells.find(q => q[1] === cv)[0];
      G.cell[key] = [px2 / A, py2 / A, (px2 + w) / A, (py2 + h) / A, cv.height / cv.width];
    }
    break;
  }
  if (!G.cell) return false;
  const gl = G.R.gl, t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  G.at = t;
  G.wr = {};
  for (const [k2, , wr] of G.want) if (wr) G.wr[k2] = wr;
  G.trc = G.want.filter(w => /^tr\d/.test(w[0])).map(w => G.cell[w[0]]);
  G.gc = document.createElement('canvas');
  G.gc.width = G.gs.c.width; G.gc.height = G.gs.c.height;
  return true;
}
// the boost gate's picture with the three answers written on its boards (made again when the question changes)
function rgGate(G, R) {
  const q = R.st.q || null;
  if (G.gq === q && G.gate) return G.gate;
  const c = G.gc, x = c.getContext('2d'), w = c.width, h = c.height;
  x.clearRect(0, 0, w, h);
  x.drawImage(G.gs.c, 0, 0, w, h);
  if (q) {
    x.fillStyle = rlCol('k');
    x.font = `700 ${Math.round(h * .3)}px Andika, sans-serif`;
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    q.opts.forEach((o, i) => x.fillText(String(o), w * [77, 150, 223][i] / 300, h * 47 / 112));
  }
  c._dirty = true;
  G.gq = q;
  return (G.gate = GLX.tex(G.R, 'gate', c));
}
// a sprite standing at (x, y, z) (camera space, its bottom middle), ww world units wide, ar its height / width as drawn, turned by
// a (screen radians, as the 2D look turns it) round its middle; cell its atlas rectangle; tint r g b, alpha al. The corners are
// placed in screen pixels first (the 2D look's turn), then taken back to camera space at the sprite's depth.
function rgBB(G, x, y, z, ww, ar, a, u, r, g, b, al) {
  const B = G.B;
  if (B.n >= B.max || z < RGL.near) return;
  const zx = z / G.KX, zy = z / G.KY, w = ww / zx, h = w * ar, f = B.f, c = Math.cos(a), sn = Math.sin(a), hw = w / 2, hh = h / 2, my = y + hh * zy;
  let k = B.n * 54;
  for (let v = 0; v < 6; v++) {
    const cn = RGL_TRI[v], px = cn & 1 ? hw : -hw, py = cn & 2 ? hh : -hh;
    f[k++] = x + (px * c - py * sn) * zx; f[k++] = my - (px * sn + py * c) * zy; f[k++] = z;
    f[k++] = cn & 1 ? u[2] : u[0]; f[k++] = cn & 2 ? u[3] : u[1]; f[k++] = r; f[k++] = g; f[k++] = b; f[k++] = al;
  }
  B.n++;
}
const RGL_TRI = [0, 1, 3, 0, 3, 2]; // corners: bit 1 right, bit 2 bottom (screen)
// a flat quad on the ground at (x, y, z): sw wide, sd deep (a soft shadow)
function rgFlat(G, x, y, z, sw, sd, u, al) {
  const B = G.B;
  if (B.n >= B.max || z - sd / 2 < RGL.near) return;
  const f = B.f;
  let k = B.n * 54;
  for (let v = 0; v < 6; v++) {
    const cn = RGL_TRI[v];
    f[k++] = x + (cn & 1 ? sw : -sw) / 2; f[k++] = y; f[k++] = z + (cn & 2 ? -sd : sd) / 2;
    f[k++] = cn & 1 ? u[2] : u[0]; f[k++] = cn & 2 ? u[3] : u[1]; f[k++] = 1; f[k++] = 1; f[k++] = 1; f[k++] = al;
  }
  B.n++;
}
// a quad in screen pixels (the 2D look's coordinates): middle (x, y), w x h, turned by a
function rgSQ(G, x, y, w, h, a, u, al) {
  const B = G.B;
  if (B.n >= B.max) return;
  const f = B.f, c = Math.cos(a), sn = Math.sin(a), hw = w / 2, hh = h / 2;
  let k = B.n * 54;
  for (let v = 0; v < 6; v++) {
    const cn = RGL_TRI[v], px = cn & 1 ? hw : -hw, py = cn & 2 ? hh : -hh;
    f[k++] = x + px * c - py * sn; f[k++] = y + px * sn + py * c; f[k++] = 0;
    f[k++] = cn & 1 ? u[2] : u[0]; f[k++] = cn & 2 ? u[3] : u[1]; f[k++] = 1; f[k++] = 1; f[k++] = 1; f[k++] = al;
  }
  B.n++;
}
function rgFlush(G, mvp, tex) { if (G.B.n) { G.O.spr.tex = tex; GLX.bflush(G.R, G.B, mvp, tex, G.O.spr); } }
// the trail's pieces (rlTrail moves them; here they are drawn under the car, in screen pixels)
function rgTrailPut(G, k, x, y, sz, a) { const u = G.trc && G.trc[k]; if (u) rgSQ(G, x, y, sz, sz, 0, u, a); }
const RGL_FULL = [0, 0, 1, 1];
// the row of the 2D look's car list a car at distance d is drawn in (just in front of the camera: the first)
function rgRowOf(d, camD, frac) { const u = (d - camD) / RL_SEG + frac; return u < 1 && u > .4 ? 1 : Math.floor(u); }
// the haze of a sprite at depth z (it fades into the hazy distance, more in Fog)
const rgHaze = (G, z) => 1 - Math.min(G.fm, Math.max(0, (z - G.f0) * G.fk)) * .95;
// the projection (camera space to clip space, column-major): the 2D look's own, x at W / 2 + KX x / z and y at hz - KY y / z (game
// pixels), shifted by a crash's shake sh as rlDraw shifts its canvas; w = z, depth -1 at RGL.near and 1 at RGL.far
function rgVP(o, W, H, hz, KX, KY, sh) {
  const n = RGL.near, f = RGL.far;
  o.fill(0);
  o[0] = 2 * KX / W; o[5] = 2 * KY / H; o[8] = 2 * sh / W; o[9] = 1 - 2 * (hz + sh * .3) / H; o[10] = (f + n) / (f - n); o[11] = 1; o[14] = -2 * f * n / (f - n);
  return o;
}
// sizes, colours and the screen meshes for this screen (rlSize makes a new R.v on a resize)
function rgScreen(G, R) {
  const X = G.R, V = R.v, st = R.st, pl = st.T.pl, wx = st.W, W = V.W, H = V.H, hz = V.hz, mood = R.mood || rlMood(1);
  G.W = W; G.H = H; G.V = V; G.KX = V.KX; G.KY = V.KY; G.AK = V.KX / V.KY;
  const sky = !pl.night && wx.sky ? wx.sky : pl.sky, s0 = rgC(G, 'sc-' + sky[0]), s1 = rgC(G, 'sc-' + sky[1]);
  const cc = {};
  for (const [k, v] of [['g0', pl.grass[0]], ['g1', pl.grass[1]], ['ra', pl.rumble[0]], ['rb', pl.rumble[1]], ['da', pl.road[0]], ['db', pl.road[1]], ['ln', pl.lane],
    ['w', 'w'], ['k', 'k2'], ['pa', 'o'], ['pb', 'y'], ['la', pl.rail[0]], ['lb', pl.rail[1]], ['wa', pl.wall[0]], ['wb', pl.wall[1]], ['wat', pl.water], ['sp', 'c'],
    ['ss', 't'], ['si', 'c1'], ['e', 'e3'], ['lamp', 'y1']]) cc[k] = rgC(G, v);
  cc.g1 = GLX.mix(cc.g0, cc.g1, .55); // the 2D look's band (g1 at 55 % over g0)
  cc.gf = { meadow: rgC(G, 'g2'), beach: rgC(G, 't'), snow: rgC(G, 'w2'), city: rgC(G, 'v3'), woods: rgC(G, 'o2') }[pl.id] || cc.g0;
  cc.wat2 = GLX.mix(cc.wat, cc.w, .12);
  G.cc = cc;
  // the light: the race's sun, a lower light at night; the ground's own haze toward the sky's horizon colour
  G.L = mood.L; G.T = mood.tint; G.amb = pl.night ? .72 : .58; G.l0 = G.amb + (1 - G.amb) * Math.max(0, G.L[1]);
  G.F = s1; G.f0 = wx.fog ? 1200 : 5000; G.fm = wx.fog ? .94 : pl.night ? .55 : .62; G.fk = 1 / (wx.fog ? 6500 : 26000);
  G.amp = ({ meadow: 1, beach: .35, snow: 1.35, city: 0, woods: 1.1 }[pl.id] || 0) * mood.hill; G.ph = mood.ph;
  G.Hm = 2.15 * RL_ROADW * G.AK; G.WL = -420; G.WD = -600;
  // the sky (screen pixels): the gradient to the horizon, the horizon colour below it; then a haze band over the painted layers
  const o = [], A = (c, a) => [c[0], c[1], c[2], a], hb = [];
  GLX.quad(o, 'grad', [-40, -40, 0], [W + 40, -40, 0], [W + 40, hz, 0], [-40, hz, 0], A(s0, 1), A(s0, 1), A(s1, 1), A(s1, 1));
  GLX.quad(o, 'grad', [-40, hz, 0], [W + 40, hz, 0], [W + 40, H + 40, 0], [-40, H + 40, 0], A(s1, 1));
  const fog = !!wx.fog, y0 = hz - H * (fog ? .1 : .02), y1 = hz + H * (fog ? .06 : .03), al = fog ? .85 : .7;
  GLX.quad(hb, 'grad', [-40, y0, 0], [W + 40, y0, 0], [W + 40, hz, 0], [-40, hz, 0], A(s1, 0), A(s1, 0), A(s1, al), A(s1, al));
  GLX.quad(hb, 'grad', [-40, hz, 0], [W + 40, hz, 0], [W + 40, y1, 0], [-40, y1, 0], A(s1, al), A(s1, al), A(s1, 0), A(s1, 0));
  for (const m of [G.sky, G.haze]) GLX.free(X, m);
  G.sky = GLX.arr(X, 'grad', o); G.haze = GLX.arr(X, 'grad', hb);
  G.SCR.set(GLX.screen(W, H, 0));
  G.fq = 0; // the WebGL canvas is sized again
}
function rgFrame(R) {
  const G = R.gl;
  if (!G || G.off) return false;
  const X = G.R, gl = X.gl;
  if (X.lost || gl.isContextLost()) { rlGlDrop(R, 'lost'); return false; }
  const V = R.v, st = R.st, T = st.T, N = T.n, P = st.P, wx = st.W, calm = R.calm, t = R.t || 0;
  if (!V || !V.me.c || !V.far.c || !V.near.c || !V.sun.c) return false;
  if (!rgAtlas(G, R)) return false;
  rgTrackOf(G, T);
  if (G.V !== V) rgScreen(G, R);
  if (G.fq !== G.q) { GLX.fit(G.cv, { dpr: 1.5, px: 1.2e6, q: G.q }); G.fq = G.q; }
  const W = V.W, H = V.H, hz = V.hz, D = Math.min(wx.fog ? 80 : RL_DRAW, G.ex.length - 3), RW = RL_ROADW, AK = G.AK, mood = R.mood, cell = G.cell, O = G.O;
  const sh = !calm && R.shake > 0 ? Math.sin(t * 70) * R.shake * 20 * V.k : 0;
  gl.viewport(0, 0, G.cv.width, G.cv.height);
  X.draws = 0;
  const VP = rgVP(G.VP, W, H, hz, G.KX, G.KY, sh), f0 = RGL.far;
  // the edges of the segments ahead, exactly as the 2D look finds them (rlDraw), in camera space
  const ex = G.ex, ey = G.ey, ez = G.ez, ew = G.ew, ei = G.ei, ys = G.ys, okr = G.ok;
  const camD = P.d - RL_PZ, base = Math.floor(camD / RL_SEG), frac = camD / RL_SEG - base;
  let x = 0, dx = -T.cv[rlMod(base, N)] * frac;
  for (let e = 0; e <= D + 1; e++) { ex[e] = x; x += dx; dx += T.cv[rlMod(base + e, N)]; }
  const ep = RL_PZ / RL_SEG + frac, eq = Math.floor(ep);
  const camX = ex[eq] + (ex[eq + 1] - ex[eq]) * (ep - eq) + P.x * RW;
  const pi = rlMod(Math.floor(P.d / RL_SEG), N), pf = P.d / RL_SEG - Math.floor(P.d / RL_SEG);
  const camY = RL_CAMH + T.hy[pi] + (T.hy[(pi + 1) % N] - T.hy[pi]) * pf;
  for (let e = 0; e <= D + 1; e++) {
    const i = rlMod(base + e, N);
    ex[e] -= camX; ez[e] = (e - frac) * RL_SEG; ey[e] = T.hy[i] - camY; ew[e] = RW * T.rw[i]; ei[e] = i;
    ys[e] = ez[e] > 1 ? hz - ey[e] * G.KY / ez[e] : 1e9;
  }
  // a row behind a hill top is not drawn (the 2D look's clip line): its road is hidden by a nearer one
  let maxy = H;
  for (let n = 1; n < D; n++) { okr[n] = 0; const y1 = ys[n], y2 = ys[n + 1]; if (y2 >= maxy || y2 >= y1) continue; okr[n] = 1; maxy = y2; }
  // ---- behind: the sky, the sun and clouds, the painted layers, the haze ----
  gl.disable(gl.DEPTH_TEST); gl.depthMask(false); gl.disable(gl.BLEND);
  gl.clearColor(G.F[0], G.F[1], G.F[2], 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  GLX.draw(X, G.sky, G.SCR);
  gl.enable(gl.BLEND);
  if (!wx.fall && !wx.fog) rgSQ(G, W * mood.sx + V.sun.w * V.sc / 2, hz * .12 + V.sun.h * V.sc / 2, V.sun.w * V.sc, V.sun.h * V.sc, 0, cell.sky, 1);
  if (!wx.fall && !wx.fog && !T.pl.night) for (let j = 0; j < 4; j++) {
    const cw = W * (.22 + .1 * ((j + mood.cl * 7) % 3)), ch = cw * cell.cloud[4], span = W + cw * 2;
    rgSQ(G, rlMod(W * ((mood.cl * 3.7 + j * .29) % 1) - R.bgx * W * .06 + t * W * .004 * (1 + j % 2), span) - cw, hz * (.16 + .17 * ((j * 7 + Math.floor(mood.cl * 9)) % 4) / 3), cw, ch, 0, cell.cloud, .8);
  }
  rgFlush(G, G.SCR, G.at);
  for (const [s, off, key] of [[V.far, R.bgx * V.far.w * V.sc * .5, 'far'], [V.near, R.bgx * V.near.w * V.sc, 'near']]) {
    const w = s.w * V.sc, h = s.h * V.sc;
    for (let xx = -rlMod(off, w); xx < W; xx += w) rgSQ(G, Math.round(xx) + w / 2, hz + 2 - h / 2, Math.ceil(w) + .5, Math.ceil(h), 0, RGL_FULL, 1);
    rgFlush(G, G.SCR, GLX.tex(X, key, s.c));
  }
  GLX.draw(X, G.haze, G.SCR);
  gl.disable(gl.BLEND);
  // ---- the ground: one mesh, far to near, depth written but not tested ----
  G.k = 0;
  // a far ground plane up to the horizon (under the farthest row)
  const zf = ez[D] * 1.02, C = G.cc;
  rgQ(G, -400 * RW, ey[D] - 1, zf, 400 * RW, ey[D] - 1, zf, 400 * RW, ey[D] - 1, f0 * .98, -400 * RW, ey[D] - 1, f0 * .98, C.gf, false);
  for (let n = D - 1; n >= 1;) {
    const s = n > 90 ? 3 : n > 55 ? 2 : 1, a = Math.max(1, n - s + 1);
    rgRow(G, R, a, n - a + 1);
    n = a - 1;
  }
  const kg = G.k;
  // headlights (at night and in or near tunnels, never by day): two warm beams lying on the road from the car's lamps, widening
  // ahead in the road's perspective and fading out, added to the light of the road (the sprites, rivals too, are drawn over them)
  const dark = T.pl.night || wx.fog || T.fl[pi] & 1 || T.fl[rlMod(pi + 6, N)] & 1, lamps = T.pl.night || T.fl[pi] & 1 || T.fl[rlMod(pi + 6, N)] & 1;
  if (lamps) {
    const ly = rgC(G, 'y'), lh = .03 * RW * AK, fm = G.fm, NS = 9;
    G.fm = 0; // light is not hazed
    for (let q = -1; q <= 1; q += 2) for (let j = 0; j < NS; j++) {
      const k0 = j / NS, k1 = (j + 1) / NS;
      for (let h = 0; h < 2; h++) {
        const kk = h ? k1 : k0, z = RL_PZ + 90 + kk * 1500, f = z / RL_SEG + frac, e = Math.min(D - 1, Math.floor(f)), t2 = f - e;
        const cx = ex[e] + (ex[e + 1] - ex[e]) * t2 + P.x * RW + q * (.1 + .32 * kk) * RW, cy = ey[e] + (ey[e + 1] - ey[e]) * t2 + lh, w = (.06 + .62 * kk) * RW, al = .36 * (1 - kk) * (1 - kk);
        G.bx[h * 4] = cx - w; G.bx[h * 4 + 1] = cx; G.bx[h * 4 + 2] = cx + w; G.bx[h * 4 + 3] = al; G.by[h * 2] = cy; G.by[h * 2 + 1] = z;
      }
      const B = G.bx, Y = G.by;
      for (let c = 0; c < 2; c++) { // the bright middle to each soft edge
        const o = c * 2;
        rgV(G, B[o], Y[0], Y[1], ly, 1, c ? B[3] : 0); rgV(G, B[o + 1], Y[0], Y[1], ly, 1, c ? 0 : B[3]); rgV(G, B[4 + o + 1], Y[2], Y[3], ly, 1, c ? 0 : B[7]);
        rgV(G, B[o], Y[0], Y[1], ly, 1, c ? B[3] : 0); rgV(G, B[4 + o + 1], Y[2], Y[3], ly, 1, c ? 0 : B[7]); rgV(G, B[4 + o], Y[2], Y[3], ly, 1, c ? B[7] : 0);
      }
    }
    G.fm = fm;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, G.gm.b); gl.bufferSubData(gl.ARRAY_BUFFER, 0, G.f.subarray(0, G.k));
  gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.ALWAYS); gl.depthMask(true);
  O.gnd.n = kg / 7; GLX.draw(X, G.gm, VP, O.gnd);
  if (G.k > kg) { gl.depthMask(false); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE); O.lt.first = kg / 7; O.lt.n = (G.k - kg) / 7; GLX.draw(X, G.gm, VP, O.lt); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); }
  // ---- sprites, far to near, against the ground's depth (a hill top or a wall hides what is behind it) ----
  gl.depthFunc(gl.LEQUAL); gl.depthMask(false); gl.enable(gl.BLEND);
  const tn = G.T, sp = T.spAt, prA = T.pr;
  // the cars by row, as the 2D look sorts them (the ghost too): cr row, cd distance; the player is index 7
  const cars = st.cars, nc = cars.length, cr = G.cr, cdv = G.cd;
  for (let j = 0; j < 8; j++) cr[j] = -1;
  for (let j = 0; j < nc; j++) { cr[j] = rgRowOf(cars[j].d, camD, frac); cdv[j] = cars[j].d; }
  let gh = null;
  if (st.gh && P.lap <= st.laps) {
    const g = rlGhostAt(st.gh, st.rt - P.lap0);
    if (g) { gh = R.ghost || (R.ghost = { ghost: 1 }); gh.d = RL_START * RL_SEG + (P.lap - 1) * T.L + g.d; gh.x = g.x; cr[6] = rgRowOf(gh.d, camD, frac); cdv[6] = gh.d; }
  }
  cr[7] = rgRowOf(P.d, camD, frac); cdv[7] = P.d;
  let meOK = false, tex = G.at;
  for (let n = D - 1; n >= 1; n--) {
    if (ys[n] < 0 && ys[n + 1] < 0) continue;
    const i = ei[n], X0 = ex[n], Y0 = ey[n], Z = ez[n] - 2;
    if (Z < RGL.near) continue;
    const hzA = rgHaze(G, Z), dim = T.fl[i] & 1 ? .62 : 1, tr = tn[0] * dim, tg = tn[1] * dim, tb = tn[2] * dim;
    const pr = prA[i];
    if (pr) for (let j = 0; j < pr.length; j += 2) {
      const k = 'pr-' + pr[j], u = cell[k];
      if (!u) continue;
      const xr = pr[j + 1], wr = G.wr[k], sd = xr < 0 ? -1 : 1, d = Math.abs(xr) - T.rw[i] - .14, hy = d > 0 ? rgTh(G, i, sd, d) : 0, px = X0 + RW * xr;
      if (wr >= .75 && Z < 9000) rgFlat(G, px + mood.L[0] * -.35 * RW * wr, Y0 + hy + 3, Z + 60, wr * RW * 1.25, wr * RW * .7, cell.shadow, .3 * hzA);
      rgBB(G, px, Y0 + hy, Z, wr * RW, u[4], 0, u, tr, tg, tb, hzA);
    }
    if (st.quiz && i == T.gate) {
      rgFlush(G, VP, tex);
      const P2 = RL_PROPS.gate, gt = rgGate(G, R);
      rgBB(G, X0, Y0, Z, P2.wr * RW, P2.vb[1] / P2.vb[0], 0, RGL_FULL, tr, tg, tb, hzA);
      rgFlush(G, VP, gt);
    }
    const zl = Math.floor(((base + n) * RL_SEG + RL_SEG / 2) / T.L) + 1, spi = sp[i];
    if (spi) for (const k of spi) {
      if (st.taken[k] == zl) continue;
      const b = 1 + .12 * Math.sin(t * 6 + k), u = cell['pr-sparkle'];
      rgBB(G, X0 + RW * T.sp[k][1], Y0 + .06 * RW * AK, Z, G.wr['pr-sparkle'] * RW * b, u[4], 0, u, tr, tg, tb, hzA);
    }
    const pk = T.pkAt[i];
    if (pk) for (const k of pk) {
      if (st.pkT[k] == zl) continue;
      const p = T.pk[k], key = p.k == 'star' ? 'pr-pstar' : 'pr-bubble', u = cell[key];
      rgFlat(G, X0 + RW * p.x, Y0 + 2, Z + 40, G.wr[key] * RW, G.wr[key] * RW * .5, cell.shadow, .25 * hzA);
      rgBB(G, X0 + RW * p.x, Y0 + (.1 + .03 * Math.sin(t * 4 + k)) * RW * AK, Z, G.wr[key] * RW, u[4], p.k == 'star' && !calm ? Math.sin(t * 3) * .3 : 0, u, tr, tg, tb, hzA);
    }
    const ob = T.obAt[i];
    if (ob) for (const k of ob) {
      const o = T.ob[k], key = 'pr-' + o.k, u = cell[key];
      if (!u) continue;
      if (st.knL[k] == zl) {
        const a = st.rt - st.kn[k];
        if (a < .8) rgBB(G, X0 + RW * (o.x + st.knS[k] * a * 1.8), Y0 + Math.sin(a * 4) * .25 * RW * AK, Z, G.wr[key] * RW, u[4], st.knS[k] * a * 9, u, tr, tg, tb, hzA);
      } else rgBB(G, X0 + RW * o.x, Y0, Z, G.wr[key] * RW, u[4], 0, u, tr, tg, tb, hzA);
    }
    const mv = T.mvAt[i];
    if (mv) for (const k of mv) {
      const m = T.mv[k], key = 'pr-' + m.k, u = cell[key], mx = rlMvX(m, st.rt), crit = !!RL_CRIT[m.k];
      if (!u) continue;
      const hop = crit && !calm ? Math.abs(Math.sin(t * 9 + k)) * .05 * RW * AK : 0;
      rgFlat(G, X0 + RW * mx, Y0 + 2, Z + 40, G.wr[key] * RW, G.wr[key] * RW * .45, cell.shadow, .3 * hzA);
      rgBB(G, X0 + RW * mx, Y0 + hop, Z, G.wr[key] * RW, u[4], crit ? 0 : mx * 3.2, u, tr, tg, tb, hzA);
    }
    // the cars in this row, farthest first
    for (;;) {
      let j = -1;
      for (let q = 0; q < 8; q++) if (cr[q] == n && (j < 0 || cdv[q] > cdv[j])) j = q;
      if (j < 0) break;
      cr[j] = -1;
      const f2 = (cdv[j] - camD) / RL_SEG + frac - n, px = ex[n] + (ex[n + 1] - ex[n]) * f2, py = ey[n] + (ey[n + 1] - ey[n]) * f2, z = ez[n] + (ez[n + 1] - ez[n]) * f2 - 4, hz3 = rgHaze(G, z);
      if (j == 7) {
        // the child's car: its shadow, then (depth test off) the trail and the car where the 2D look draws them, then the rest
        rgFlat(G, px + P.x * RW - mood.L[0] * .04 * RW, py + 3, z + 40, RL_CARW * RW * 1.12, 160, cell.shadow, .32);
        rgFlush(G, VP, tex);
        rgMe(G, R, sh);
        meOK = true;
        continue;
      }
      if (j == 6) {
        if (!gh) continue;
        rgFlush(G, VP, tex);
        rgBB(G, px + RW * gh.x, py, z, RL_CARW * RW, V.me.ar, 0, RGL_FULL, 1, 1, 1, .45 * hz3);
        O.me.tex = GLX.tex(X, 'me', V.me.c); rgFlush(G, VP, O.me.tex);
        continue;
      }
      const car = cars[j], key = 'rv-' + car.rv.id, u = cell[key], w = RL_CARW * RW, cx = px + RW * car.x, ang = rlSpinA(car, t, calm);
      rgFlat(G, cx - mood.L[0] * .04 * RW, py + 3, z + 40, RL_CARW * RW * 1.12, 160, cell.shadow, .3 * hz3);
      rgBB(G, cx, py, z, w, u[4], ang, u, tr, tg, tb, hz3);
      if (dark && !ang) for (let q = -1; q <= 1; q += 2) rgBB(G, cx + q * w * .25, py + w * u[4] * AK * .35, z - 6, w * .24, 1, 0, cell.glow, 1, 1, 1, .7 * hz3);
      if (car.spin > 0 || car.dizzy > 0) for (let q = 0; q < 3; q++) {
        const a = t * 6 + q * 2.1, us = cell['pr-pstar'];
        rgBB(G, cx + Math.cos(a) * w * .32, py + w * u[4] * AK * 1.05 - Math.sin(a) * w * .06 * AK, z - 8, w * .2, us[4], 0, us, 1, 1, 1, hz3);
      }
    }
  }
  if (!meOK) { rgFlush(G, VP, tex); rgMe(G, R, sh); }
  rgFlush(G, VP, tex);
  gl.disable(gl.BLEND); gl.depthMask(true); gl.depthFunc(gl.LEQUAL);
  G.frames++;
  return true;
}
// the child's car where the 2D look draws it (screen pixels, rlDrawMe's place, lean and spin), over the world; the trail under it
function rgMe(G, R, sh) {
  const X = G.R, gl = X.gl, V = R.v, P = R.st.P, s = V.me, t = R.t || 0, calm = R.calm, w = RL_CARW * V.rw, h = w * s.ar;
  const bob = P.off && !calm ? Math.sin(t * 40) * 2 * V.k : Math.sin(t * 9) * .6 * V.k;
  const ang = P.s * .05 + (P.drifting ? Math.sign(P.s) * .12 : 0) + rlSpinA(P, t, calm), x = V.W / 2 + P.s * w * .06 + sh, y = V.ground + bob + sh * .3;
  gl.disable(gl.DEPTH_TEST);
  if (V.trail && G.trc && G.trc.length) { rlTrail(R, x, y, w, h, G.put); rgFlush(G, G.SCR, G.at); }
  rgSQ(G, x, y - h / 2, w, h, ang, RGL_FULL, 1);
  G.O.me.tex = GLX.tex(X, 'me', s.c);
  rgFlush(G, G.SCR, G.O.me.tex);
  gl.enable(gl.DEPTH_TEST);
}
// in the 3D look the 2D canvas carries only what is drawn over the car: its shield, dizzy stars, drift sparks, the speed lines,
// and the rain or snow
function rlGlTop(R) {
  const c = R.ctx, V = R.v, t = R.t || 0;
  const sh = !R.calm && R.shake > 0 ? Math.sin(t * 70) * R.shake * 20 * V.k : 0;
  c.clearRect(0, 0, V.W, V.H);
  c.save();
  if (sh) c.translate(sh, sh * .3);
  rlDrawMe(R, true);
  rlFall(R);
  c.restore();
}
