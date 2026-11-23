/* ---------- 4x4 Hill Climb in 2.5D (GL-01): the WebGL look, on the GLX layer (60-gl.js) ----------
   Only the drawing changes: hcNew / hcStep, the controls, stages, stars and saves are the same code as the 2D look. hcStart puts a
   WebGL canvas (#hcgl) under the 2D canvas (#hcv); each frame hcDraw moves the camera as before, then hcGlFrame draws the world
   in 3D and the 2D canvas, cleared, carries only the small things on top (flags, bolts, fuel, stars, dust, rain, the night, the
   speedometer, the patch names). The 2D look (62-hill.js) stays and is used when WebGL is missing or fails or is drawn by the CPU
   (no GPU: HGL.soft), when the context is lost, when a grown-up turns the 3D look off (Grown-ups, Tablet speed: S.hcGl = false), and for the rest of the visit when the
   frame rate stays low even at the lowest pixel scale (hcGlDrop).
   The scene (world units = the simulation's pixels; x along the road, y up, z toward the viewer):
   - The camera (GLX.side) sits HGL.E above and HGL.EX ahead of the 2D camera, HGL.D back. The plane z = 0, where the car and every
     pick-up live, lands on the screen exactly where the 2D look draws it, so the 2D layer on top lines up.
   - The ground in chunks of HGL.CW: the road's top from z = ZF (front) to -ZB (back), lit by its slope; a grass edge and the earth
     on the front face (z = ZF, the world's dirt texture, darker further down); a verge behind the road to -ZV with the world's
     roadside things (trees, cacti, pines ...) standing on it in two rows; water or lava in gaps, fords and under bridges; bridges
     as plank boxes on posts; rocks as lit slabs. One mesh per chunk and kind, made once.
   - Behind: the sky (a screen gradient, stars at night), the sun, moon or Earth and the clouds, then the ranges of the 2D look as
     meshes far back in z (real parallax), shaded by their slopes with a light rim and haze toward the sky at their feet; snow on
     the peaks; trees on the near hills. In front: the foreground tufts and stones (z > ZF).
   - The car: its 2D body art (the paint, toppers and the child's pet) as a stack of slices through the body's depth, darker
     inside, so it has sides; four wheels as lit cylinders with the rim art on their caps; crates as lit boxes; a soft shadow.
   Draw calls stay low (about 25), nothing is allocated per frame (one sprite batch refilled; matrices reused). Colours are the
   --ill-* and --sc-* tokens (hcC). */
// soft: also draw in 3D when WebGL is drawn by the CPU (GLX R.soft: no GPU). Off: there the 2D look is faster. tools/smoke.js and
// the screenshots turn it on, because headless Chrome draws WebGL with SwiftShader.
const HGL = { D: 700, E: 250, EX: 80, ZF: 60, ZB: 60, ZV: 360, CW: 640, near: 40, far: 40000, LAY: 60, soft: false };
let HC_GLOFF = false; // set for the rest of the visit when the 3D look was too slow (hcGlDrop)
// the 3D look is wanted: not turned off by a grown-up, not dropped for speed this visit
const hcGlWant = () => S.hcGl !== false && !HC_GLOFF;
// make the renderer on canvas cv for drive H; null when WebGL is missing or fails (the drive then draws in 2D)
function hcGlStart(H, cv) {
  if (!hcGlWant()) return null;
  const R = GLX.init(cv);
  if (!R) return null;
  if (R.soft && !HGL.soft) { GLX.end(R); H.glWhy = 'software'; return null; }
  const G = { R, cv, ch: new Map(), lays: null, W: 0, Hh: 0, col: {}, B: GLX.batch(R, 64), VP: null, mvp: new Float32Array(16), M: new Float32Array(16), mm: new Array(16).fill(0),
    tmp: new Array(16).fill(0), y0: null, slow: 0, off: false, frames: 0, q: 1, fq: 0, ps: 0, pf: 0,
    VP: new Array(16).fill(0), VP32: new Float32Array(16), SCR: new Float32Array(16), SCR2: new Float32Array(16) };
  // the draw options, made once and reused every frame (M is the model matrix hgMVP keeps)
  G.O = { dirt: { tex: null }, lit: { M: G.M }, cut: { tex: null, cut: .5 }, sil: { tex: null, cut: .5 }, tyre: { M: G.M, A: .5 }, crates: { M: G.M, n: 0 }, sh: { tex: null, T: [1, 1, 1, 1] },
    far: [.62, .62, .62, 1], tn: [1, 1, 1, 1], cloud: [1, 1, 1, .9] };
  return G;
}
// the 3D look stops for this drive (and for the rest of the visit when it was too slow); the 2D look takes over at once
function hcGlDrop(H, why) {
  const G = H.gl;
  if (!G) return;
  G.off = true;
  if (why == 'slow') HC_GLOFF = true;
  try { G.cv.style.display = 'none'; } catch (e) {}
  H.glWhy = why;
}
// frames running long: the 3D canvas first draws fewer pixels (.8, .64, then .5 of them a side, stretched to the screen), before
// the drive's own pixel steps (hcStart) and, last, the 2D look (hcGlDrop). True when it stepped (the drive's counters start again).
function hcGlPace(H, dt) {
  const G = H.gl;
  if (!G || G.off) return false;
  if (dt > .026) G.ps++; else if (dt > 0) G.pf++;
  if (G.ps + G.pf < 20) return false;
  const slow = G.ps > 10;
  G.ps = G.pf = 0;
  if (slow && G.q > .51) { G.q = G.q > .9 ? .8 : G.q > .7 ? .64 : .5; return true; }
  return false;
}
const hgC = (G, role) => G.col[role] || (G.col[role] = GLX.rgb(hcC(role)));
// mvp = VP x (translate (x, y, z), turn a about z); M keeps the model matrix (for the lit program's normals)
function hgMVP(G, x, y, z, a) { GLX.model(G.mm, x, y, z, a || 0); for (let i = 0; i < 16; i++) G.M[i] = G.mm[i]; GLX.mul(G.tmp, G.VP, G.mm); G.mvp.set(G.tmp); return G.mvp; }
// the screen height of the 2D look's range at layer position t (hcStrip's ridge)
const hgRidge = (L, t, Hh, sc) => L.props ? Hh * L.yb - (Math.sin(t * L.f1) * 55 + Math.sin(t * L.f2 + 1) * 25) * sc : Hh * L.yb - (Math.abs(Math.sin(t * L.f1)) * L.amp + Math.sin(t * L.f2) * L.amp * .25) * sc;
// the layers of the 2D look (hcLayers) and the hazy range behind them, far to near
function hgLayers(Wd, portrait) {
  const ls = hcLayers(Wd, portrait), out = [], pre = ls[0][9];
  if (pre) out.push({ par: .042, col: ls[0][1], yb: pre[0], amp: pre[1], f1: pre[2], f2: pre[3], alpha: pre[4], haze: [.15, .55] });
  for (const [par, col, yb, amp, f1, f2, cap, alpha, props] of ls) out.push({ par, col, yb, amp, f1, f2, cap, alpha, props, haze: par < .1 ? [.12, .5] : par < .3 ? [0, .35] : [0, .12] });
  return out;
}
// the roadside things of a world as a texture: four variants side by side (cells of 140 x 170 units at 1.6 pixels a unit)
function hgPropTex(G, Wd) {
  if (G.props !== undefined) return G.props;
  if (!Wd.prop) return G.props = null;
  const A = 1.6, cw = 140, chh = 170, c = hcCan(cw * A * 4, chh * A), x = c.getContext('2d');
  for (let v = 0; v < 4; v++) hcProp(x, Wd.prop, (v + .5) * cw * A, chh * A - 3, 1.15 * A, v);
  return G.props = { c, cw, chh };
}
// a range as a mesh: rows from the ridge (light rim) down past the screen's foot, haze toward the sky colour at the foot
function hgLayerMesh(G, H, L, t0, t1) {
  const R = G.R, sc = G.sc, Hh = G.Hh, cy0 = Hh * G.base - HGL.E * sc + HGL.LAY * sc, par = L.par, Z = HGL.D - HGL.D / par, X0 = t0 / par, o = [], sp = [];
  const col = hgC(G, L.col), sky = hgC(G, G.skyCols[1]), wh = hgC(G, 'w'), rim = G.dark ? .1 : .3, a = L.alpha;
  // the foot: as low as the 2D look's strip (the nearest range reaches the bottom of the screen)
  const P = (t, sy, z = 0) => [t / par - X0, (cy0 - sy) / (sc * par), Z + z], foot = L.props ? Hh * 1.25 : Math.min(Hh * 1.25, Hh * L.yb + L.amp * .25 * sc + 60 * sc + HGL.LAY * sc), dt = 8 / sc;
  const C4 = (c, al) => [c[0], c[1], c[2], al];
  let prev = null;
  for (let t = t0; t <= t1 + dt; t += dt) {
    const sy = hgRidge(L, t, Hh, sc), sl = (hgRidge(L, t + dt, Hh, sc) - hgRidge(L, t - dt, Hh, sc)) / 16, lit = 1 + Math.max(-1, Math.min(1, -sl)) * .2;
    const base = GLX.mulc(col, lit), top0 = Hh * L.yb - L.amp * sc, hz = y => L.haze[0] + (L.haze[1] - L.haze[0]) * Math.max(0, Math.min(1, (y - top0) / Math.max(1, foot - top0)));
    const rows = [[sy, C4(GLX.mix(base, wh, rim), a)], [sy + 3 * sc, C4(base, a)], [sy + (foot - sy) * .4, C4(GLX.mix(col, sky, hz(sy + (foot - sy) * .4)), a)], [foot, C4(GLX.mix(col, sky, L.haze[1]), a)]].map(([y, c]) => [P(t, y), c]);
    if (prev) for (let r = 0; r < 3; r++) GLX.quad(o, 'grad', prev[r + 1][0], rows[r + 1][0], rows[r][0], prev[r][0], prev[r + 1][1], rows[r + 1][1], rows[r][1], prev[r][1]);
    prev = rows;
  }
  // snow on the peaks (the 2D look's caps)
  if (L.cap) for (let t = t0 + dt; t < t1; t += dt) {
    const y = hgRidge(L, t, Hh, sc);
    if (y < hgRidge(L, t - dt, Hh, sc) && y <= hgRidge(L, t + dt, Hh, sc) && y < Hh * L.yb - L.amp * .75 * sc) {
      const w = [wh[0], wh[1], wh[2], 1];
      o.push(...P(t - 20, y + 18 * sc, .5), ...w, ...P(t + 20, y + 18 * sc, .5), ...w, ...P(t, y, .5), ...w);
    }
  }
  // trees on the near hills
  const PT = L.props && hgPropTex(G, HCW[H.wi]);
  if (PT) for (let i = Math.floor(t0 / 150) - 1; i < t1 / 150 + 1; i++) {
    const t = i * 150 + ((i * 73) % 60);
    if ((i * 7) % 3 == 0) continue;
    const sy = hgRidge(L, t, Hh, sc), v = ((i % 4) + 4) % 4, s = .8 / par, w = PT.cw * s, h = PT.chh * s, b = P(t, sy, 1), x = b[0], y = b[1] - 4 * s;
    GLX.quad(sp, 'spr', [x - w / 2, y, b[2]], [x + w / 2, y, b[2]], [x + w / 2, y + h, b[2]], [x - w / 2, y + h, b[2]], [.85, .85, .9, 1], 0, 0, 0, [[v / 4, 1], [(v + 1) / 4, 1], [(v + 1) / 4, 0], [v / 4, 0]]);
  }
  if (L.m) GLX.free(R, L.m);
  if (L.sp) GLX.free(R, L.sp);
  L.m = GLX.arr(R, 'grad', o); L.sp = GLX.arr(R, 'spr', sp); L.t0 = t0; L.t1 = t1; L.X0 = X0; L.Z = Z;
}
// the foreground strip (hcFore): stones and tufts at the foot of the screen, nearer than the road (z > ZF)
function hgForeMesh(G, H, L, t0, t1) {
  const R = G.R, sc = G.sc, Hh = G.Hh, cy0 = Hh * G.base - HGL.E * sc - 0, par = 1.25, Z = HGL.D - HGL.D / par, X0 = t0 / par, o = [], Wd = HCW[H.wi];
  const P = (t, sy) => [t / par - X0, (cy0 - sy) / (sc * par), Z], k = hgC(G, 'k'), dk = [k[0], k[1], k[2], G.dark ? .35 : .2], tuft = hgC(G, Wd.id == 'snow' ? 'w2' : Wd.top2), wh = hgC(G, 'w');
  const grass = Wd.id == 'meadow' || Wd.id == 'jungle' || Wd.id == 'snow', bot = Hh + 2;
  for (let i = Math.floor(t0 / 90) - 1; i < t1 / 90 + 1; i++) {
    const hsh = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
    if (hsh < .3) continue;
    const t = i * 90 + hsh * 50, r = (14 + hsh * 20) * sc, c = P(t, bot + r * .2);
    for (let s = 0; s < 8; s++) {
      const a0 = Math.PI * s / 8, a1 = Math.PI * (s + 1) / 8, p0 = P(t + Math.cos(a0) * r * 1.4 / sc, bot + r * .2 - Math.sin(a0) * r), p1 = P(t + Math.cos(a1) * r * 1.4 / sc, bot + r * .2 - Math.sin(a1) * r);
      o.push(...c, ...dk, ...p0, ...dk, ...p1, ...dk);
    }
    if (grass) for (let q = -2; q <= 2; q++) {
      const bx = t + q * r * .45 / sc, ty = bot - r * (.7 - Math.abs(q) * .14) - 0, w = [tuft[0], tuft[1], tuft[2], 1];
      o.push(...P(bx - 3, bot - r * .25), ...w, ...P(bx + 3, bot - r * .25), ...w, ...P(bx + q * 2, ty), ...w);
    } else { const w = [wh[0], wh[1], wh[2], .18], cx = t - r * .4 / sc, cyy = bot - r * .55; for (let s = 0; s < 6; s++) { const a0 = s / 6 * 6.283, a1 = (s + 1) / 6 * 6.283; o.push(...P(cx, cyy), ...w, ...P(cx + Math.cos(a0) * r * .35 / sc, cyy + Math.sin(a0) * r * .18), ...w, ...P(cx + Math.cos(a1) * r * .35 / sc, cyy + Math.sin(a1) * r * .18), ...w); } }
  }
  if (L.m) GLX.free(R, L.m);
  L.m = GLX.arr(R, 'grad', o); L.t0 = t0; L.t1 = t1; L.X0 = X0; L.Z = Z; L.par = par;
}
// a ground chunk (HGL.CW units from x0 = k CW): road, front face, verge, water, bridges, rocks, roadside things
function hgChunk(G, H, k) {
  let ch = G.ch.get(k);
  if (ch) return ch;
  const R = G.R, C = H.C, Wd = HCW[H.wi], x0 = k * HGL.CW, x1 = x0 + HGL.CW, ZF = HGL.ZF, ZB = HGL.ZB, ZV = HGL.ZV, L = GLX.SUN;
  const gH = w0 => { const i = hcIx(C, w0); if (C.fl[i] & 4) { const b = C.bridges.find(q => w0 >= q.x0 && w0 <= q.x1); if (b) { const u = Math.min(1, (w0 - b.x0) / 40, (b.x1 - w0) / 40); return b.y - 90 * Math.max(0, u); } } return hcH(C, w0); };
  const top = hgC(G, Wd.top), top2 = hgC(G, Wd.top2), dirt = hgC(G, Wd.dirt), sky = hgC(G, G.skyCols[1]), wh = hgC(G, 'w');
  const g = [], f = [], l = [], nr = [], sp = [], xs = [], ys = [], cs = [], lit = [];
  let lo = 1e9;
  for (let w0 = x0 - 10; w0 <= x1 + 10; w0 += 10) {
    const y = gH(w0), i = hcIx(C, w0), sl = (gH(w0 + 10) - gH(w0 - 10)) / 20, nl = Math.hypot(sl, 1), d = Math.max(0, (-sl * L[0] + L[1]) / nl);
    const so = C.sk[i] && !(C.fl[i] & 1) ? SOFT[HC_SK[C.sk[i]]] : null;
    xs.push(w0 - x0); ys.push(y); lit.push((.7 + .3 * d) / .92);
    cs.push(C.fl[i] & 5 ? GLX.mulc(dirt, 1.05) : so ? hgC(G, so.c) : top);
    lo = Math.min(lo, y);
  }
  const n = xs.length, A1 = c => [c[0], c[1], c[2], 1];
  const bot = lo - 1500;
  for (let i = 0; i < n - 1; i++) {
    const xa = xs[i], xb = xs[i + 1], ya = ys[i], yb = ys[i + 1], ca = GLX.mulc(cs[i], lit[i]), cb = GLX.mulc(cs[i + 1], lit[i + 1]);
    // the road's top, front to back: a light lip, the road, a darker back edge
    const rows = [[ZF, .28, 1], [ZF - 5, 0, 1], [-ZB + 8, 0, .94], [-ZB, 0, .86]];
    for (let r = 0; r < 3; r++) {
      const [z0, w0, k0] = rows[r], [z1, w1, k1] = rows[r + 1];
      GLX.quad(g, 'grad', [xa, ya, z0], [xb, yb, z0], [xb, yb, z1], [xa, ya, z1], A1(GLX.mulc(GLX.mix(ca, wh, w0), k0)), A1(GLX.mulc(GLX.mix(cb, wh, w0), k0)), A1(GLX.mulc(GLX.mix(cb, wh, w1), k1)), A1(GLX.mulc(GLX.mix(ca, wh, w1), k1)));
    }
    // the verge behind the road, fading toward the sky colour at the back
    const va = GLX.mulc(top2, lit[i] * .92), vb = GLX.mulc(top2, lit[i + 1] * .92), vr = [[-ZB, 0], [-ZB - 60, .08], [-ZV, .32]];
    for (let r = 0; r < 2; r++) {
      const [z0, h0] = vr[r], [z1, h1] = vr[r + 1];
      GLX.quad(g, 'grad', [xa, ya, z0], [xb, yb, z0], [xb, yb, z1], [xa, ya, z1], A1(GLX.mix(va, sky, h0)), A1(GLX.mix(vb, sky, h0)), A1(GLX.mix(vb, sky, h1)), A1(GLX.mix(va, sky, h1)));
    }
    // the front face: the grass edge, a dark line, then the earth (textured), darker further down
    const ea = GLX.mulc(cs[i], .8), eb = GLX.mulc(cs[i + 1], .8), ln = GLX.mulc(top2, .8);
    GLX.quad(g, 'grad', [xa, ya - 14, ZF], [xb, yb - 14, ZF], [xb, yb, ZF], [xa, ya, ZF], A1(ea), A1(eb), A1(eb), A1(ea));
    GLX.quad(g, 'grad', [xa, ya - 18, ZF], [xb, yb - 18, ZF], [xb, yb - 14, ZF], [xa, ya - 14, ZF], A1(ln));
    const U = x => (x + x0) / 154, V = y => -y / 154, fr = [[0, 18, .98], [1, 120, .8], [2, 700, .55]];
    for (let r = 0; r < 3; r++) {
      const ta = ya - fr[r][1], tb = yb - fr[r][1], ba = r < 2 ? ya - fr[r + 1][1] : bot, bb = r < 2 ? yb - fr[r + 1][1] : bot, k0 = fr[r][2], k1 = r < 2 ? fr[r + 1][2] : .45;
      GLX.quad(f, 'spr', [xa, ba, ZF], [xb, bb, ZF], [xb, tb, ZF], [xa, ta, ZF], [k1, k1, k1, 1], [k1, k1, k1, 1], [k0, k0, k0, 1], [k0, k0, k0, 1], [[U(xa), V(ba)], [U(xb), V(bb)], [U(xb), V(tb)], [U(xa), V(ta)]]);
    }
    // grass blades along the front edge
    if ((Wd.id == 'meadow' || Wd.id == 'jungle') && !(C.fl[hcIx(C, xa + x0)]) && !C.sk[hcIx(C, xa + x0)] && i % 2 == 0) {
      const t2 = A1(top2), bx = xa + 5, by = ya + (yb - ya) * .5;
      g.push(bx - 3, by - 2, ZF + .6, ...t2, bx + 3, by - 2, ZF + .6, ...t2, bx + ((i / 2) % 2 ? 2 : -2), by + 9, ZF + .6, ...t2);
    }
  }
  // water (or lava) in the gaps, fords and under bridges: a top face and a front face down to the ground
  const wcol = hgC(G, Wd.water), wtop = hgC(G, Wd.pit == 'lava' ? 'y' : Wd.pit == 'crater' ? 'e3' : 'c1'), wt = GLX.mix(wcol, wtop, .3);
  const pool = (a, b, lvl) => {
    if (b < x0 - 20 || a > x1 + 20) return;
    const xa = Math.max(a, x0 - 10) - x0, xb = Math.min(b, x1 + 10) - x0;
    if (xb <= xa) return;
    GLX.quad(g, 'grad', [xa, lvl, ZF + .4], [xb, lvl, ZF + .4], [xb, lvl, -ZV], [xa, lvl, -ZV], A1(wt), A1(wt), A1(GLX.mix(wt, sky, .3)), A1(GLX.mix(wt, sky, .3)));
    for (let w0 = Math.ceil((xa + x0) / 10) * 10 - x0 - 10; w0 < xb; w0 += 10) {
      const p = Math.max(xa, w0), q = Math.min(xb, w0 + 10);
      if (q <= p) continue;
      const yp = Math.min(lvl, gH(p + x0)), yq = Math.min(lvl, gH(q + x0));
      if (yp >= lvl && yq >= lvl) continue;
      GLX.quad(g, 'grad', [p, yp, ZF + .5], [q, yq, ZF + .5], [q, lvl, ZF + .5], [p, lvl, ZF + .5], A1(GLX.mulc(wcol, .82)), A1(GLX.mulc(wcol, .82)), A1(wcol), A1(wcol));
      GLX.quad(g, 'grad', [p, lvl - 3, ZF + .6], [q, lvl - 3, ZF + .6], [q, lvl, ZF + .6], [p, lvl, ZF + .6], A1(wtop));
    }
  };
  if (Wd.pit != 'crater') for (const p of C.pits) pool(p.x0 + 4, p.x1 - 4, p.y - p.d * .5);
  for (const b of C.bridges) pool(b.x0 + 20, b.x1 - 20, b.y - 60);
  for (const fd of C.fords) pool(fd.x0, fd.x1, fd.y);
  // bridges: planks on a deck, posts and rails on both sides. The near side's posts and rail go in their own mesh (nr), drawn after
  // the car so the car stays in front of them (FIX3: the near rail at z = ZF - 10 is nearer than the car and drew over its lower body)
  const n2 = hgC(G, 'n2'), nn = hgC(G, 'n'), n3 = hgC(G, 'n3');
  for (const b of C.bridges) {
    if (b.x1 < x0 - 30 || b.x0 > x1 + 30) continue;
    const a = b.x0 - x0, e = b.x1 - x0;
    GLX.box(l, a, b.y - 10, -ZB + 6, e, b.y - 4, ZF - 6, n2);
    for (let w0 = a; w0 < e; w0 += 24) GLX.box(l, w0 + 1, b.y - 4, -ZB + 8, Math.min(e, w0 + 23), b.y, ZF - 8, nn, n2);
    const m = Math.max(1, Math.round((b.x1 - b.x0) / 120));
    for (const z of [ZF - 10, -ZB + 10]) {
      const o = z > 0 ? nr : l;
      for (let j = 0; j <= m; j++) { const w0 = a + (e - a) * j / m; GLX.box(o, w0 - 3, b.y - 40, z - 3, w0 + 3, b.y + 46, z + 3, n3); }
      GLX.box(o, a, b.y + 38, z - 1.5, e, b.y + 42, z + 1.5, n3);
    }
  }
  // rocks: the 2D look's half ellipse as a lit slab
  const rk = hgC(G, Wd.space ? 'e' : 'e2'), rk2 = hgC(G, Wd.space ? 'e1' : 'e');
  for (const r of C.rocks) {
    if (r.x1 < x0 - 40 || r.x0 > x1 + 40) continue;
    const bx = (r.x0 + r.x1) / 2 - x0, rw = (r.x1 - r.x0) / 2 * 1.05, rh = r.h + 3, pts = [];
    for (let s = 0; s <= 10; s++) { const a = Math.PI * s / 10; pts.push([bx + Math.cos(a) * rw, r.y - 12 + Math.sin(a) * (rh + 12)]); }
    GLX.extrude(l, pts, -ZB + 14, ZF - 14, rk, rk2, rk);
  }
  // roadside things on the verge, in two rows
  const PT = hgPropTex(G, Wd);
  if (PT) {
    const put = (w0, z, v, s) => {
      const y = gH(w0) - 3, w = PT.cw * s, h = PT.chh * s, x = w0 - x0, tint = GLX.mix([1, 1, 1], sky, Math.min(.4, -z / ZV * .25));
      GLX.quad(sp, 'spr', [x - w / 2, y, z], [x + w / 2, y, z], [x + w / 2, y + h, z], [x - w / 2, y + h, z], [tint[0], tint[1], tint[2], 1], 0, 0, 0, [[v / 4, 1], [(v + 1) / 4, 1], [(v + 1) / 4, 0], [v / 4, 0]]);
    };
    for (let i = Math.floor((x0 - 120) / 230); i < (x1 + 120) / 230; i++) {
      if ((i * 13) % 5 < 2) continue;
      const w0 = i * 230 + ((i * 57) % 90);
      if (w0 < x0 || w0 >= x1 || w0 < 200 || C.fl[hcIx(C, w0)] || C.fl[hcIx(C, w0 + 60)] || C.fl[hcIx(C, w0 - 60)]) continue;
      put(w0, -ZB - 45, (((i + 3) % 4) + 4) % 4, 1);
    }
    for (let i = Math.floor(x0 / 170); i < x1 / 170; i++) {
      if ((i * 7) % 3 == 0) continue;
      const w0 = i * 170 + ((i * 41) % 70);
      if (w0 < x0 || w0 >= x1 || C.fl[hcIx(C, w0)] & 1) continue;
      put(w0, -ZV + 70 + ((i * 29) % 90), ((i % 4) + 4) % 4, 1.1);
    }
  }
  ch = { k, x0, g: GLX.arr(R, 'grad', g), f: GLX.arr(R, 'spr', f), l: GLX.arr(R, 'lit', l), nr: GLX.arr(R, 'lit', nr), sp: GLX.arr(R, 'spr', sp) };
  G.ch.set(k, ch);
  for (const [kk, c] of G.ch) if (kk < k - 4 || kk > k + 4) { for (const m of [c.g, c.f, c.l, c.nr, c.sp]) GLX.free(R, m); G.ch.delete(kk); }
  return ch;
}
// the car's parts that do not change during a drive: a wheel (a lit cylinder), the crate boxes, the shadow
function hgCar(G, H) {
  if (G.car && G.car.veh === H.veh) return G.car;
  const R = G.R, V = VEH[H.veh] || VEH.jeep, bike = H.veh == 'bike', w = [], c = [], s = [], tyre = hgC(G, 'k2'), tread = GLX.mulc(hgC(G, 'k2'), .8), half = bike ? 4 : 7;
  const pts = []; for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2; pts.push([Math.cos(a) * V.R, Math.sin(a) * V.R]); }
  GLX.extrude(w, pts, -half, half, tyre, tread, tyre);
  const cn = hgC(G, 'n'), cn3 = hgC(G, 'n3'), cp = { jeep: [-44, -18], buggy: [-30, -12], monster: [-50, -30], bike: [-26, -20], tractor: [14, -26], bus: [-30, -50] }[H.veh] || [-40, -18];
  for (let i = 0; i < 3; i++) { const ox = cp[0] + (i == 2 ? 9 : i * 18), oy = cp[1] - (i == 2 ? 17 : 0) - 17; GLX.box(c, ox, -(oy + 17), -9, ox + 17, -oy, 9, cn, GLX.mix(cn, cn3, .5)); }
  GLX.quad(s, 'spr', [-58, 0, -36], [58, 0, -36], [58, 0, 36], [-58, 0, 36], [1, 1, 1, 1], 0, 0, 0, [[0, 0], [1, 0], [1, 1], [0, 1]]);
  if (G.car) for (const m of [G.car.w, G.car.c, G.car.s]) GLX.free(R, m);
  return G.car = { veh: H.veh, w: GLX.arr(R, 'lit', w), c: GLX.arr(R, 'lit', c), s: GLX.arr(R, 'spr', s), half, body: bike ? 5 : 15, wz: bike ? 0 : 26 };
}
// the box round the drawn pixels of a sprite canvas [x0, y0, x1, y1] (the slices of the car cover only its art: a cheap GPU
// pays for every pixel a quad touches, drawn or not)
function hgCrop(c) {
  if (c._crop) return c._crop;
  let b = [0, 0, c.width, c.height];
  try {
    const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data, w = c.width, h = c.height;
    let x0 = w, y0 = h, x1 = 0, y1 = 0;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (d[(y * w + x) * 4 + 3] > 8) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    if (x1 >= x0 && y1 >= y0) b = [Math.max(0, x0 - 1), Math.max(0, y0 - 1), Math.min(w, x1 + 2), Math.min(h, y1 + 2)];
  } catch (e) {}
  return c._crop = b;
}
// the sun (or the moon, or the Earth) as a small texture: the 2D look's shapes (hcSun) round the middle of the canvas
function hgSunTex(G, R2, wx, Wd) {
  if (G.sun !== undefined) return G.sun;
  const sc = R2.sc, r = 40 * sc * 1.6, c = hcCan(r * 2 + 4, r * 2 + 4), x = c.getContext('2d'), m = c.width / 2;
  if (Wd.space) { const er = 34 * sc; x.fillStyle = hcC('b'); x.beginPath(); x.arc(m, m, er, 0, 7); x.fill(); x.fillStyle = hcC('g'); x.beginPath(); x.ellipse(m - er * .3, m - er * .2, er * .35, er * .5, .4, 0, 7); x.ellipse(m + er * .4, m + er * .3, er * .3, er * .25, 0, 0, 7); x.fill(); return G.sun = { c, x: .8, y: .17 }; }
  if (R2.dark) { x.fillStyle = hcC('m'); x.beginPath(); x.arc(m, m, 26 * sc, 0, 7); x.fill(); x.fillStyle = hcC(R2.skyCols[0]); x.beginPath(); x.arc(m + 10 * sc, m - 6 * sc, 24 * sc, 0, 7); x.fill(); return G.sun = { c, x: .82, y: .15 }; }
  if (wx == 'rain' || wx == 'ash') return G.sun = null;
  const r0 = 40 * sc; x.fillStyle = hcA(wx == 'dusk' ? 'o1' : 'y1', .5); x.beginPath(); x.arc(m, m, r0 * 1.6, 0, 7); x.fill(); x.fillStyle = hcC(wx == 'dusk' ? 'o' : 'y'); x.beginPath(); x.arc(m, m, r0, 0, 7); x.fill();
  return G.sun = { c, x: .84, y: .14 };
}
// a soft round shadow (darkest in the middle)
function hgShadow(G) {
  if (G.shc) return G.shc;
  const c = hcCan(64, 64), x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 2, 32, 32, 31);
  g.addColorStop(0, hcA('k', .9)); g.addColorStop(.6, hcA('k', .5)); g.addColorStop(1, hcA('k', 0));
  x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  return G.shc = c;
}
// the sky as a screen mesh: the gradient and, at night or in space, the stars
function hgSky(G) {
  const R = G.R, W = G.W, Hh = G.Hh, o = [], a = hgC(G, G.skyCols[0]), b = hgC(G, G.skyCols[1]), A = c => [c[0], c[1], c[2], 1];
  GLX.quad(o, 'grad', [0, 0, 0], [W, 0, 0], [W, Hh, 0], [0, Hh, 0], A(a), A(a), A(b), A(b));
  if (G.dark) { const w = hgC(G, 'w'); for (let t = 0; t < W * 2; t += 23) { const h = Math.abs(Math.sin(t * 12.9898) * 43758.5453) % 1; if (h > .5) continue; const x = t / 2, y = h * 2 * Hh * .55, z = (1 + (h * 6 | 0) % 3 * .5) * G.dpr, c = [w[0], w[1], w[2], Math.min(1, .4 + h)]; GLX.quad(o, 'grad', [x, y, 0], [x + z, y, 0], [x + z, y + z, 0], [x, y + z, 0], c); } }
  if (G.sky) GLX.free(R, G.sky);
  G.sky = GLX.arr(R, 'grad', o);
}
// one frame of the 3D look; false when it cannot draw (the 2D look draws this frame instead). A failure drops to the 2D look for
// the drive and is kept in the app log (Grown-ups), never shown to the child.
function hcGlFrame(H, W, Hh, dpr, sh) {
  try { return hgFrame(H, W, Hh, dpr, sh); } catch (e) { hcGlDrop(H, 'error'); logErr('Hill Climb 3D look: ' + (e && e.message)); return false; }
}
function hgFrame(H, W, Hh, dpr, sh) {
  const G = H.gl;
  if (!G || G.off) return false;
  const R = G.R, gl = R.gl;
  if (R.lost || gl.isContextLost()) { hcGlDrop(H, 'lost'); return false; }
  const Wd = HCW[H.wi], wx = H.wx || 'day', R2 = hcRC(H, W, Hh, dpr), sc = R2.sc, D = HGL.D, T = H.calm ? 0 : H.t;
  if (G.W !== W || G.Hh !== Hh || !G.lays) {
    // a new screen size: new layers, sky and textures (the chunks are in world units and stay)
    G.W = W; G.Hh = Hh; G.sc = sc; G.base = R2.base; G.dark = R2.dark; G.skyCols = R2.skyCols; G.dpr = dpr;
    if (G.lays) for (const L of G.lays.concat(G.fore || [])) { GLX.free(R, L.m); GLX.free(R, L.sp); }
    G.lays = hgLayers(Wd, R2.portrait); G.fore = [{}]; G.sun = undefined;
    hgSky(G);
    G.fq = 0;
    G.SCR.set(GLX.screen(W, Hh, .99995)); G.SCR2.set(GLX.screen(W, Hh, .9999));
  }
  if (G.fq !== G.q) { GLX.fit(G.cv, { dpr: 1.5, px: 1e6, q: G.q }); G.fq = G.q; }
  const cv = G.cv;
  gl.viewport(0, 0, cv.width, cv.height);
  const cx = (H.w1.x + H.w2.x) / 2, cy = (H.w1.y + H.w2.y) / 2, ang = hcAng(H), ex = H.camX + HGL.EX, ey = H.camY + HGL.E;
  const px = W * .38 + HGL.EX * sc + sh, py = Hh * R2.base - HGL.E * sc + sh;
  GLX.side(W, Hh, sc, D, 0, 0, px, py, HGL.near, HGL.far, G.VP); G.VP32.set(G.VP);
  const B = G.B, O = G.O;
  if (G.y0 == null) G.y0 = H.camY;
  R.draws = 0;
  const sk = hgC(G, G.skyCols[1]);
  gl.clearColor(sk[0], sk[1], sk[2], 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  // ---- the ground (depth on) ----
  gl.enable(gl.DEPTH_TEST); gl.depthMask(true); gl.disable(gl.BLEND);
  const s0 = D / (D + HGL.ZV), xa = ex - px / (sc * s0) - 20, xb = ex + (W - px) / (sc * s0) + 20, dirt = GLX.tex(R, 'dirt' + H.wi, texFor(H.wi), true);
  const PT = hgPropTex(G, Wd), ptex = PT && GLX.tex(R, 'props', PT.c), ka = Math.floor(xa / HGL.CW), kb = Math.floor(xb / HGL.CW);
  let near = false; // a bridge's near rail in view (drawn after the car)
  for (let k = ka; k <= kb; k++) {
    const ch = hgChunk(G, H, k), mvp = hgMVP(G, ch.x0 - ex, -ey, 0);
    if (ch.nr) near = true;
    GLX.draw(R, ch.g, mvp);
    O.dirt.tex = dirt; GLX.draw(R, ch.f, mvp, O.dirt);
    if (ch.l) GLX.draw(R, ch.l, mvp, O.lit);
    if (ch.sp) { gl.enable(gl.BLEND); O.cut.tex = ptex; GLX.draw(R, ch.sp, mvp, O.cut); gl.disable(gl.BLEND); }
  }
  // ---- the car (it blinks while it starts again) ----
  if (H.crashT <= 0 || Math.floor(H.crashT * 8) % 2) {
    const K = hgCar(G, H), V = VEH[H.veh] || VEH.jeep, lift = H.R + 6, bx = cx - Math.sin(ang) * lift, by = cy + Math.cos(ang) * lift, gy = hcH(H.C, cx);
    // the shadow on the road
    gl.enable(gl.BLEND); gl.depthMask(false);
    const dist = Math.max(0, (cy - gy) * sc), al = Math.max(.08, .5 - dist / 400);
    O.sh.tex = GLX.tex(R, 'shadow', hgShadow(G)); O.sh.T[3] = al;
    GLX.draw(R, K.s, hgMVP(G, cx - ex, gy + 2 - ey, 0, hcSlope(H.C, cx)), O.sh);
    gl.depthMask(true); gl.disable(gl.BLEND);
    const wh = hcSpr(R2, 'wh' + H.veh + H.paint + (H.rim || ''), V.R * sc * 2 + 8 * sc, V.R * sc * 2 + 8 * sc, (y, w, h) => wheel(y, w / 2, h / 2, 0, sc, 0, 0, 0, H.paint, V.R, H.rim)), wtex = GLX.tex(R, 'wheel', wh), ws = wh.width / sc;
    const c0 = Math.cos(ang), s0b = Math.sin(ang), wyo = V.R + 6;
    // the wheels on one side (z): lit cylinders, then the rim art on their caps (darker on the far side)
    const wheelsAt = z => {
      gl.disable(gl.BLEND);
      for (let j = 0; j < 2; j++) { const ox = j ? V.L / 2 : -V.L / 2, rot = j ? H.w2.rot : H.w1.rot; GLX.draw(R, K.w, hgMVP(G, bx + ox * c0 + wyo * s0b - ex, by + ox * s0b - wyo * c0 - ey, z, -rot), O.tyre); }
      gl.enable(gl.BLEND);
      const t = z < 0 ? O.far : GLX.ONE;
      for (let j = 0; j < 2; j++) { const ox = j ? V.L / 2 : -V.L / 2, rot = j ? H.w2.rot : H.w1.rot; GLX.bq(B, bx + ox * c0 + wyo * s0b - ex, by + ox * s0b - wyo * c0 - ey, z + K.half + .3, ws, ws, -rot, 0, 0, 1, 1, t); }
      GLX.bflush(R, B, G.VP32, wtex, O.cut);
    };
    if (K.wz) wheelsAt(-K.wz);
    // the body: slices of its art through its depth, back (darker) to front, in the car's frame
    const body = hcBody(R2, H), cr = hgCrop(body), btex = GLX.tex(R, 'body', body), W0 = body.width, H0 = body.height;
    // GFX-1: the landing squash (H.sq, 62-hill.js): a little wider and flatter for a moment, its foot kept on the axles
    const q = H.sq || 0, bw0 = (cr[2] - cr[0]) / sc, bh0 = (cr[3] - cr[1]) / sc, bw = bw0 * (1 + .08 * q), bh = bh0 * (1 - .15 * q);
    const bxc = ((cr[0] + cr[2]) / 2 - body.ox) / sc, byc = (body.oy - (cr[1] + cr[3]) / 2) / sc + H.bob - (bh0 - bh) / 2;
    gl.enable(gl.BLEND); gl.depthMask(false);
    const NS = H.veh == 'bike' ? 3 : 7, tn = O.tn;
    for (let i = 0; i < NS; i++) { const u = i / (NS - 1), z = -K.body + 2 * K.body * u; tn[0] = tn[1] = tn[2] = i == NS - 1 ? 1 : .5 + .25 * u; GLX.bq(B, bxc, byc, z, bw, bh, 0, cr[0] / W0, cr[1] / H0, cr[2] / W0, cr[3] / H0, tn); }
    GLX.bflush(R, B, hgMVP(G, bx - ex, by - ey, 0, ang), btex);
    gl.depthMask(true); gl.disable(gl.BLEND);
    if (H.crates) { O.crates.n = H.crates * 36; GLX.draw(R, K.c, hgMVP(G, bx - ex, by - ey, 0, ang), O.crates); }
    wheelsAt(K.wz);
    if (near) {
      // FIX3: the car's outline (body slices, wheels, crates) into the depth buffer at the nearest depth, no colour, so the near rail
      // drawn next stays behind the car whatever its z (the body slices are see-through and write no depth when they are drawn)
      gl.colorMask(false, false, false, false); gl.depthRange(0, 0);
      for (let i = 0; i < NS; i++) { const u = i / (NS - 1), z = -K.body + 2 * K.body * u; GLX.bq(B, bxc, byc, z, bw, bh, 0, cr[0] / W0, cr[1] / H0, cr[2] / W0, cr[3] / H0, GLX.ONE); }
      O.sil.tex = btex; GLX.bflush(R, B, hgMVP(G, bx - ex, by - ey, 0, ang), btex, O.sil);
      if (H.crates) GLX.draw(R, K.c, hgMVP(G, bx - ex, by - ey, 0, ang), O.crates);
      for (const z of K.wz ? [-K.wz, K.wz] : [0]) for (let j = 0; j < 2; j++) { const ox = j ? V.L / 2 : -V.L / 2, rot = j ? H.w2.rot : H.w1.rot; GLX.draw(R, K.w, hgMVP(G, bx + ox * c0 + wyo * s0b - ex, by + ox * s0b - wyo * c0 - ey, z, -rot), O.tyre); }
      gl.depthRange(0, 1); gl.colorMask(true, true, true, true);
    }
  }
  // the bridges' near posts and rails: in front of the deck and the water, behind the car
  if (near) for (let k = ka; k <= kb; k++) { const ch = hgChunk(G, H, k); if (ch.nr) GLX.draw(R, ch.nr, hgMVP(G, ch.x0 - ex, -ey, 0), O.lit); }
  // ---- behind, drawn after the ground and the car so the depth test skips what they hide (a cheap GPU pays per pixel):
  //      the ranges near to far, the sky (at the far end of the depth range), then the sun and the clouds just in front of it ----
  gl.enable(gl.DEPTH_TEST); gl.depthMask(true); gl.disable(gl.BLEND);
  const vs = Math.max(-Hh * .08, Math.min(Hh * .08, (H.camY - G.y0) * sc * .12));
  for (let i = G.lays.length - 1; i >= 0; i--) if (G.lays[i].alpha >= 1) hgRange(G, H, G.lays[i], ex, px, vs);
  const SCR = G.SCR, SCR2 = G.SCR2;
  GLX.draw(R, G.sky, SCR);
  // the see-through hazy range over the sky, then the sun and clouds over both
  gl.enable(gl.BLEND); gl.depthMask(false);
  for (const L of G.lays) if (L.alpha < 1) hgRange(G, H, L, ex, px, vs);
  gl.enable(gl.BLEND);
  const sun = hgSunTex(G, R2, wx, Wd);
  if (sun) { const s = sun.c.width; GLX.bq(B, W * sun.x, Hh * sun.y, 0, s, s, 0, 0, 1, 1, 0, GLX.ONE); GLX.bflush(R, B, SCR2, GLX.tex(R, 'sun', sun.c)); }
  const ct = O.cloud, cl = R2.cloud;
  ct[3] = wx == 'night' ? .25 : .9;
  if (!Wd.space) for (let i = 0; i < 5; i++) { const x = ((i * 420 - H.camX * .08 * sc - T * 12 * dpr) % (W + 300) + W + 300) % (W + 300) - 150, y = Hh * (.06 + (i % 3) * .08); GLX.bq(B, x + cl.width / 2, y + cl.height / 2, 0, cl.width, cl.height, 0, 0, 1, 1, 0, ct); }
  GLX.bflush(R, B, SCR2, GLX.tex(R, 'cloud', cl));
  gl.depthMask(true);
  // ---- in front: the foreground tufts and stones ----
  gl.disable(gl.DEPTH_TEST); gl.enable(gl.BLEND);
  const F = G.fore[0], ftl = ex * 1.25 - px / sc, ftr = ex * 1.25 + (W - px) / sc;
  if (!F.m || ftl < F.t0 || ftr > F.t1) hgForeMesh(G, H, F, ftl - W * .6 / sc, ftr + W * .6 / sc);
  GLX.draw(R, F.m, hgMVP(G, F.X0 - ex, 0, 0));
  gl.disable(gl.BLEND);
  G.frames++;
  return true;
}
// a range: its mesh (made again when the view has moved past it) and the trees on it
function hgRange(G, H, L, ex, px, vs) {
  const R = G.R, gl = R.gl, sc = G.sc, W = G.W, tl = ex * L.par - px / sc, tr = ex * L.par + (W - px) / sc;
  if (!L.m && !L.sp || tl < L.t0 || tr > L.t1) hgLayerMesh(G, H, L, tl - W * .6 / sc, tr + W * .6 / sc);
  GLX.draw(R, L.m, hgMVP(G, L.X0 - ex, -vs * (L.par / .35) / (sc * L.par), 0));
  if (L.sp) { const was = gl.isEnabled(gl.BLEND); gl.enable(gl.BLEND); G.O.cut.tex = GLX.tex(R, 'props', G.props.c); GLX.draw(R, L.sp, G.mvp, G.O.cut); if (!was) gl.disable(gl.BLEND); }
}
// in the 3D look the 2D layer names the soft patches (the 2D look paints the names into its ground chunks)
function hcGlLabels(x, H, SX, SY, left, right, sc) {
  const C = H.C;
  for (const s of C.soft) {
    const mx = (s.x0 + s.x1) / 2;
    if (mx < left || mx > right) continue;
    x.fillStyle = hcC(s.k == 'ice' ? 'b3' : 'w'); x.font = `bold ${13 * sc}px sans-serif`; x.fillText(SOFT[s.k].label, SX(mx), SY(hcH(C, mx) + 46));
  }
}
