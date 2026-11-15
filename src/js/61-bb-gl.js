/* ---------- Block Builder in 3D (G-BB2: R-03 B1, B2, B3 and section 4) ----------
   A small hand-written WebGL 1 renderer for the 16 x 16 x 14 block world (no library: three.js alone is ~690 KB). It goes into
   games3.<VER>.js with 60-blocks.js (tools/build.py PARTS).
   - Meshes: the world is cut into 16 chunks of 4 x 4 columns. Each chunk is one buffer of the faces that can be seen (a face
     between two solid blocks is left out), with an opaque part and a see-through part (water, glass, ice). When blocks change,
     only the chunks those cells reach are built again (the cell itself, its neighbours for the corner shade, and the cells its
     shadow falls on): bbGlDirty() says which.
   - Light, baked into the vertices: one sun (from the top left, as the object art draws it), a sky light, ambient occlusion
     (inside corners are darker) and a soft sun shadow (each vertex looks towards the sun through the blocks). Lava, lamps, crystal
     and stars glow. Water moves in the shader. Far away fades into the sky colour (fog).
   - Pictures standing on cells (flowers, mushrooms, shells, pine trees, flags, the child's pet) and the animals are camera-facing
     sprites with a soft round shadow under them; the animals hop with a little squash (B2: drawn, not emoji).
   - The camera (bbCam3) circles the focus: one finger turns it (left and right) and tilts it (up and down), two fingers move and
     pinch. Its projection is the one the shader uses, so E.proj places the 2D overlay (outlines, effects, the magnifier) exactly.
   - Picking is exact: E.hit walks the tapped pixel's ray through the cells (a 3D DDA) and returns the first block face it enters,
     in the same shape the 2D renderer's hit test returns, so every tap rule in bbMake (build on top, blueprints, aims) is unchanged.
   - The 2D renderer in 60-blocks.js stays: it is used when WebGL is missing, when the context is lost or a shader fails, and when
     a grown-up turns the 3D look off (More: "3D look", saved as S.bb.gl = 0).
   Colours come from the --ill-* and --sc-* tokens (bbCol / bbRgb); nothing here is a raw colour. */

const BB3 = { fov: .62, tilt: .62, tMin: .3, tMax: 1.2, near: .2, CH: 4, dMin: 3.2 };
BB3.sun = (() => { const v = [-.36, .58, .73], l = Math.hypot(...v); return v.map(q => q / l); })();
const BB3_N = [[0, 0, 1], [0, 0, -1], [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0]];
// the four corners of each face (unit cube), counter-clockwise seen from outside, and each corner's texture u, v
const BB3_Q = [
  [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]], [[0, 1, 0], [1, 1, 0], [1, 0, 0], [0, 0, 0]],
  [[1, 0, 1], [1, 0, 0], [1, 1, 0], [1, 1, 1]], [[0, 1, 1], [0, 1, 0], [0, 0, 0], [0, 0, 1]],
  [[1, 1, 1], [1, 1, 0], [0, 1, 0], [0, 1, 1]], [[0, 0, 1], [0, 0, 0], [1, 0, 0], [1, 0, 1]],
];
const BB3_UV = [[[0, 0], [1, 0], [1, 1], [0, 1]], [[0, 0], [1, 0], [1, 1], [0, 1]]].concat(Array(4).fill([[0, 0], [0, 1], [1, 1], [1, 0]]));

/* ---- the camera: installs the 3D projection, unprojection, hit test and moves on a bbMake world (E) ---- */
function bbCam3(E) {
  E.three = true;
  if (!(E.tilt > 0)) E.tilt = BB3.tilt;
  const C = { k: [] };
  const fpx = () => E.H / 2 / Math.tan(BB3.fov / 2);
  // the camera for the view now (cached until the angle, tilt, zoom, focus or size change)
  const cam = E.cam3 = () => {
    const k = [E.ang, E.tilt, E.zoom, E.F[0], E.F[1], E.F[2], E.W, E.H];
    if (k.every((v, n) => v === C.k[n])) return C;
    C.k = k;
    const c = Math.cos(E.ang), s = Math.sin(E.ang), ct = Math.cos(E.tilt), st = Math.sin(E.tilt);
    const hx = (c + s) / Math.SQRT2, hy = (c - s) / Math.SQRT2;
    C.fpx = fpx();
    C.dist = Math.max(BB3.dMin * .9, C.fpx / (E.a() * Math.SQRT2));
    C.eye = [E.F[0] + hx * ct * C.dist, E.F[1] + hy * ct * C.dist, E.F[2] + st * C.dist];
    C.f = [-hx * ct, -hy * ct, -st];
    // right = up x forward (the 2D view's handedness, so a world looks the same in both), up = forward x right
    const rl = Math.hypot(C.f[0], C.f[1]) || 1;
    C.r = [-C.f[1] / rl, C.f[0] / rl, 0];
    C.u = [C.f[1] * C.r[2] - C.f[2] * C.r[1], C.f[2] * C.r[0] - C.f[0] * C.r[2], C.f[0] * C.r[1] - C.f[1] * C.r[0]];
    C.far = C.dist + 40;
    return C;
  };
  E.dist3 = () => cam().dist;
  E.zMax = () => Math.max(1.2, fpx() / (BB3.dMin * Math.SQRT2 * E.a0));
  E.zMin = () => .7;
  // world (x, y, z) -> canvas point [x, y, depth]; behind the camera: far off the canvas
  E.proj = (X, Y, Z) => {
    const q = cam(), dx = X - q.eye[0], dy = Y - q.eye[1], dz = Z - q.eye[2];
    const z = dx * q.f[0] + dy * q.f[1] + dz * q.f[2];
    if (z < BB3.near) return [-1e5, -1e5, z];
    return [E.W / 2 + (dx * q.r[0] + dy * q.r[1] + dz * q.r[2]) * q.fpx / z, E.H / 2 - (dx * q.u[0] + dy * q.u[1] + dz * q.u[2]) * q.fpx / z, z];
  };
  // the ray under a canvas point
  E.ray = (px, py) => {
    const q = cam(), a = (px - E.W / 2) / q.fpx, b = -(py - E.H / 2) / q.fpx;
    const d = [0, 1, 2].map(n => q.f[n] + q.r[n] * a + q.u[n] * b), l = Math.hypot(...d);
    return [q.eye.slice(), d.map(v => v / l)];
  };
  // canvas point -> world (x, y) on the flat plane at height z (towards the horizon: a point far along the ray)
  E.unproj = (px, py, z) => {
    const [o, d] = E.ray(px, py);
    let t = d[2] < -1e-4 ? (z - o[2]) / d[2] : -1;
    if (!(t > 0)) t = 60;
    t = Math.min(t, 200);
    return [o[0] + d[0] * t, o[1] + d[1] * t];
  };
  // one finger: turn (dx) and tilt (dy), canvas px
  E.orbit = (dx, dy) => {
    E.ang -= dx * Math.PI / Math.max(320, E.W) * 1.1;
    E.tilt = Math.max(BB3.tMin, Math.min(BB3.tMax, E.tilt + dy * 1.6 / Math.max(320, E.H)));
  };
  // two fingers: the world follows the fingers on the plane through the focus
  E.pan = (dx, dy) => {
    const a = E.unproj(E.W / 2, E.H / 2, E.F[2]), b = E.unproj(E.W / 2 - dx, E.H / 2 - dy, E.F[2]);
    let mx = b[0] - a[0], my = b[1] - a[1];
    const m = Math.hypot(mx, my);
    if (m > 3) { mx *= 3 / m; my *= 3 / m; }
    E.F[0] += mx; E.F[1] += my;
    E.clamp();
  };
  const clamp0 = E.clamp;
  E.clamp = () => { clamp0(); E.tilt = Math.max(BB3.tMin, Math.min(BB3.tMax, E.tilt)); };
  E.render = () => (E.faces = []);
  // the corners of a cell's face on the canvas (the shape the 2D hit test returns)
  E.facePoly = (i, j, k, f, nx, ny) => {
    const n = f == 'top' ? 0 : f == 'bot' ? 1 : nx == 1 ? 2 : nx == -1 ? 3 : ny == 1 ? 4 : 5;
    return BB3_Q[n].map(([a, b, c]) => E.proj(i + a, j + b, k + c).slice(0, 2));
  };
  /* exact picking: walk the ray through the cells (Amanatides and Woo); the first cell holding a block (or, for blueprints, a
     see-through block of the layer being built) whose face passes the filter f. Faces: 'top', 'bot' or 'side' with nx, ny. */
  E.hit = (px, py, flt) => {
    const [o, d] = E.ray(px, py), hi = [BW, BD, BH];
    let t0 = 0, t1 = 1e9, ax = -1;
    for (let a = 0; a < 3; a++) {
      if (Math.abs(d[a]) < 1e-9) { if (o[a] < 0 || o[a] > hi[a]) return null; continue; }
      let ta = -o[a] / d[a], tb = (hi[a] - o[a]) / d[a];
      if (ta > tb) [ta, tb] = [tb, ta];
      if (ta > t0) { t0 = ta; ax = a; }
      t1 = Math.min(t1, tb);
    }
    if (t0 > t1) return null;
    const c = [0, 1, 2].map(a => Math.max(0, Math.min(hi[a] - 1, Math.floor(o[a] + d[a] * (t0 + 1e-7))))),
      st = d.map(v => (v > 0 ? 1 : -1)), tM = [0, 1, 2].map(a => (Math.abs(d[a]) < 1e-9 ? 1e9 : (c[a] + (st[a] > 0 ? 1 : 0) - o[a]) / d[a])),
      tD = d.map(v => (Math.abs(v) < 1e-9 ? 1e9 : Math.abs(1 / v)));
    const showG = !!E.goal && E.ghosts(), L = showG ? E.layer() : null;
    for (let n = 0; n < 64; n++) {
      const [i, j, k] = c, idx = bbI(i, j, k), v = E.w[idx];
      let q = null;
      const face = () => (ax == 2 ? (st[2] < 0 ? { f: 'top', nx: 0, ny: 0 } : { f: 'bot', nx: 0, ny: 0 }) : ax == 0 ? { f: 'side', nx: -st[0], ny: 0 } : ax == 1 ? { f: 'side', nx: 0, ny: -st[1] } : { f: 'top', nx: 0, ny: 0 });
      if (v && BLOCKS[v]) q = Object.assign({ i, j, k }, face(), BLOCKS[v].deco ? { deco: 1 } : {});
      else if (showG && !v && k === L && E.goal.has(idx)) q = Object.assign({ i, j, k, ghost: 1 }, face());
      if (q && (!flt || flt(q))) { q.poly = E.facePoly(i, j, k, q.f, q.nx, q.ny); return q; }
      ax = tM[0] < tM[1] ? (tM[0] < tM[2] ? 0 : 2) : (tM[1] < tM[2] ? 1 : 2);
      c[ax] += st[ax];
      if (c[ax] < 0 || c[ax] >= hi[ax] || tM[ax] > t1 + 1e-6) return null;
      tM[ax] += tD[ax];
    }
    return null;
  };
  E.clamp();
  return E;
}
// which cells' faces a change at cell (i, j, k) can alter: the cell and its neighbours (faces, corner shade), and the cells whose
// sun shadow passes through it (down and away from the sun, up to BB3_SH cells along the light)
const BB3_SH = 4;
function bbGlReach(i, j, k) {
  const s = BB3.sun, t = BB3_SH + 1, ex = -s[0] * t, ey = -s[1] * t;
  return [Math.floor(Math.min(i - 1, i - 1 + ex)), Math.floor(Math.min(j - 1, j - 1 + ey)), Math.ceil(Math.max(i + 1, i + 1 + ex)), Math.ceil(Math.max(j + 1, j + 1 + ey))];
}
// the chunks (index cy * 4 + cx) to build again after the cells in `cells` (indices) changed
function bbGlDirty(cells) {
  const out = new Set(), N = BW / BB3.CH;
  for (const n of cells) {
    const i = n % BW, j = Math.floor(n / BW) % BD, k = Math.floor(n / (BW * BD)), [a0, b0, a1, b1] = bbGlReach(i, j, k);
    for (let cx = Math.max(0, Math.floor(a0 / BB3.CH)); cx <= Math.min(N - 1, Math.floor(a1 / BB3.CH)); cx++)
      for (let cy = Math.max(0, Math.floor(b0 / BB3.CH)); cy <= Math.min(N - 1, Math.floor(b1 / BB3.CH)); cy++) out.add(cy * N + cx);
  }
  return out;
}

/* ---- meshing (no GL: tested in Node) ----
   bbGlMesh(w, cx, cy, skip): the visible faces of chunk (cx, cy) as {o: opaque, t: see-through}, each {v: [x, y, z, u, v, light,
   alpha, kind, ...], i: [indices]}. skip: a cell index meshed as empty (the block dropping in). kind: 0 block, 1 water top edge
   (moves), 2 glow. Light = sun and sky x corner shade x shadow, in 0.35 .. 1.05. */
const BB3_AO = [.5, .68, .84, 1];
function bbGlMesh(w, cx, cy, skip = -1) {
  const CH = BB3.CH, s = BB3.sun, o = { v: [], i: [] }, t = { v: [], i: [] };
  const at = (i, j, k) => (i < 0 || j < 0 || k < 0 || i >= BW || j >= BD || k >= BH ? 0 : w[bbI(i, j, k)]);
  const get = (i, j, k) => { const n = bbI(i, j, k); return n == skip && i >= 0 && j >= 0 && k >= 0 && i < BW && j < BD && k < BH ? 0 : at(i, j, k); };
  const opq = (i, j, k) => bbOpaque(get(i, j, k));
  // a soft sun shadow at a point: anything opaque on the way to the sun (a few cells)
  const shadow = (x, y, z) => {
    for (let n = 1; n <= BB3_SH; n++) {
      const X = Math.floor(x + s[0] * n * .9), Y = Math.floor(y + s[1] * n * .9), Z = Math.floor(z + s[2] * n * .9);
      if (Z >= BH) return 1;
      if (opq(X, Y, Z)) return .72;
    }
    return 1;
  };
  for (let j = cy * CH; j < cy * CH + CH; j++) for (let i = cx * CH; i < cx * CH + CH; i++) for (let k = 0; k < BH; k++) {
    const v = get(i, j, k), B = v && BLOCKS[v];
    if (!B || B.deco) continue;
    const see = !!B.see, open = dv => !bbOpaque(dv) && !(see && dv == v);
    const water = B.k == 'water', glow = !!B.glow, tr = water || B.k == 'glass' || B.k == 'ice', out = tr ? t : o;
    const al = water ? .8 : B.k == 'glass' ? .62 : B.k == 'ice' ? .84 : 1;
    for (let f = 0; f < 6; f++) {
      const [nx, ny, nz] = BB3_N[f];
      if (f == 1 && k == 0) continue; // the island's underside is never seen
      if (!open(get(i + nx, j + ny, k + nz))) continue;
      const base = out.v.length / 8, ao = [], tile = 2 * v + (f < 2 ? 0 : 1);
      const lit = .58 + .5 * Math.max(0, nx * s[0] + ny * s[1] + nz * s[2]) + (nz > 0 ? .02 : 0);
      BB3_Q[f].forEach(([a, b, c], q) => {
        // the corner's shade: the two cells beside it and the one across, in the layer the face looks into
        const X = i + a, Y = j + b, Z = k + c;
        const t1 = nx ? [0, b ? 1 : -1, 0] : [a ? 1 : -1, 0, 0], t2 = nz ? [0, b ? 1 : -1, 0] : [0, 0, c ? 1 : -1];
        const L = [i + nx, j + ny, k + nz];
        const s1 = opq(L[0] + t1[0], L[1] + t1[1], L[2] + t1[2]) ? 1 : 0, s2 = opq(L[0] + t2[0], L[1] + t2[1], L[2] + t2[2]) ? 1 : 0;
        const cr = opq(L[0] + t1[0] + t2[0], L[1] + t1[1] + t2[1], L[2] + t1[2] + t2[2]) ? 1 : 0;
        const a3 = s1 && s2 ? 0 : 3 - s1 - s2 - cr;
        ao.push(a3);
        const sh = lit > .7 ? shadow(X + nx * .05 + (a ? -.02 : .02), Y + ny * .05 + (b ? -.02 : .02), Z + nz * .05 + (c ? -.02 : .02)) : 1;
        const [u0, v0] = BB3_UV[f][q], tu = (tile % 16) * 32, tv = Math.floor(tile / 16) * 32;
        const kind = glow ? 2 : water && c == 1 && get(i, j, k + 1) != v ? 1 : 0;
        out.v.push(X, Y, Z, (tu + .5 + u0 * 31) / 512, (tv + .5 + v0 * 31) / 256, glow ? 1 : lit * BB3_AO[a3] * sh, al, kind);
      });
      // split the quad along the brighter diagonal, so the shade does not show a crease
      if (ao[0] + ao[2] > ao[1] + ao[3]) out.i.push(base, base + 1, base + 2, base, base + 2, base + 3);
      else out.i.push(base + 1, base + 2, base + 3, base + 1, base + 3, base);
    }
  }
  return { o, t };
}
// the blueprint's see-through blocks: the layer being built strong, the ones above faint; a pattern build's are white
function bbGlGhost(E) {
  const m = { v: [], i: [] };
  if (!E.goal || !E.ghosts()) return m;
  const L = E.layer(), pat = E.mode == 'pat';
  for (const [n, g] of E.goal) {
    if (E.w[n] == g) continue;
    const i = n % BW, j = Math.floor(n / BW) % BD, k = Math.floor(n / (BW * BD)), cur = k === L;
    const al = pat ? (cur ? .5 : .12) : cur ? .62 : .1;
    for (let f = 0; f < 6; f++) {
      if (f == 1 && k == 0) continue;
      const base = m.v.length / 8, tile = pat ? 0 : 2 * g + (f < 2 ? 0 : 1), tu = (tile % 16) * 32, tv = Math.floor(tile / 16) * 32;
      const [nx, ny, nz] = BB3_N[f], lit = .62 + .45 * Math.max(0, nx * BB3.sun[0] + ny * BB3.sun[1] + nz * BB3.sun[2]);
      BB3_Q[f].forEach(([a, b, c], q) => { const [u0, v0] = BB3_UV[f][q]; m.v.push(i + a, j + b, k + c, (tu + .5 + u0 * 31) / 512, (tv + .5 + v0 * 31) / 256, lit, al, 3); });
      m.i.push(base, base + 1, base + 2, base, base + 2, base + 3);
    }
  }
  return m;
}

/* ---- the animals (B2): drawings from the object art (ART, the hub's style) made into small pictures once ---- */
const BB_AN = ['pig', 'hen', 'sheep', 'cow', 'rabbit', 'cat', 'dog', 'chick', 'mouse', 'turtle'];
const BBANIMG = {};
// a picture made from an SVG drawing whose colours are CSS roles: resolved on a hidden copy, then drawn into a canvas (cb when ready)
function bbSvgCanvas(markup, vb, size, cb) {
  try {
    const host = document.createElement('div');
    host.style.cssText = 'position:absolute;left:-9999px;top:0;width:' + size + 'px;height:' + size + 'px;pointer-events:none';
    host.innerHTML = `<svg class="art" xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${size}" height="${size}">${markup}</svg>`;
    document.body.appendChild(host);
    const svg = host.querySelector('svg');
    for (const el of svg.querySelectorAll('*')) {
      const cs = getComputedStyle(el);
      if (el.getAttribute('fill') && el.getAttribute('fill') != 'none') el.setAttribute('fill', cs.fill);
      if (el.getAttribute('stroke') && el.getAttribute('stroke') != 'none') el.setAttribute('stroke', cs.stroke);
    }
    const src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.outerHTML);
    host.remove();
    const img = new Image();
    img.onload = () => { const c = bbCanvas(size); c.getContext('2d').drawImage(img, 0, 0, size, size); cb(c); };
    img.onerror = () => cb(null);
    img.src = src;
  } catch (e) { cb(null); }
}
// an animal's picture (128 px), or null while it is being made (redraw is called when it is ready)
function bbAnimalImg(k, redraw) {
  const o = BBANIMG[k];
  if (o) { if (!o.c && redraw) o.wait.push(redraw); return o.c; }
  const me = BBANIMG[k] = { c: null, wait: redraw ? [redraw] : [] };
  if (typeof ART == 'undefined' || !ART[k]) return null;
  bbSvgCanvas(ART[k], '0 0 64 64', 128, c => { me.c = c; for (const f of me.wait.splice(0)) try { f(k); } catch (e) {} });
  return null;
}
// an animal's hop: height above its cell and the squash (width, height) at hop progress h (0..1; 1 = standing)
function bbHopShape(h, t) {
  if (h >= 1) { const b = Math.sin(t * 3.1) * .025; return [0, 1 - b, 1 + b]; } // standing: a slow breath
  const up = Math.sin(h * Math.PI) * .45, sq = h < .15 ? (.15 - h) / .15 : h > .85 ? (h - .85) / .15 : 0;
  return [up, 1 + sq * .16 - (sq ? 0 : .06), 1 - sq * .18 + (sq ? 0 : .1)];
}

/* ---- the renderer ---- */
const BB3_VS = 'attribute vec3 p;attribute vec2 t;attribute vec3 l;uniform mat4 M;uniform vec3 O,Y;uniform float T;' +
  'varying vec2 vt;varying vec3 vl;varying float vd;varying vec3 vp;' +
  'void main(){vec3 q=p+O;if(l.z>.5&&l.z<1.5)q.z+=sin(T*1.7+q.x*1.3+q.y*.9)*.05-.12;vt=t;vl=l;vp=q;vd=distance(q,Y);gl_Position=M*vec4(q,1.);}';
const BB3_FS = 'precision mediump float;uniform sampler2D S;uniform float W,N,C,A;uniform vec3 F;uniform vec2 R;' +
  'varying vec2 vt;varying vec3 vl;varying float vd;varying vec3 vp;' +
  'void main(){vec4 c=texture2D(S,vt);float a=c.a*vl.y*A;if(a<C)discard;vec3 k=c.rgb*vl.x;' +
  'if(vl.z>.5&&vl.z<1.5)k+=.06*sin(W*2.3+(vp.x-vp.y)*2.6)+.05*sin(W*1.3+vp.y*3.1)+.03;' +
  'if(vl.z>1.5&&vl.z<2.5)k=c.rgb*(1.02+.08*sin(W*3.+vp.x+vp.y));else k=mix(k,k*vec3(.46,.44,.72),N);' +
  'k=mix(k,F,clamp((vd-R.x)/(R.y-R.x),0.,1.)*.55);gl_FragColor=vec4(k*a,a);}';
// sprites: b the foot (world), o the corner offset (x along the camera's right, y up; or on the ground when m = 1)
const BB3_SVS = 'attribute vec3 b;attribute vec2 o;attribute vec2 t;attribute vec2 m;uniform mat4 M;uniform vec3 R,U;' +
  'varying vec2 vt;varying float va;void main(){vec3 q=m.x>.5?b+vec3(o,.03):b+R*o.x+U*o.y;vt=t;va=m.y;gl_Position=M*vec4(q,1.);}';
const BB3_SFS = 'precision mediump float;uniform sampler2D S;uniform float N;uniform float C;varying vec2 vt;varying float va;' +
  'void main(){vec4 c=texture2D(S,vt);float a=c.a*va;if(a<C)discard;vec3 k=mix(c.rgb,c.rgb*vec3(.5,.48,.75),N);gl_FragColor=vec4(k*a,a);}';
// the sprite sheet (1024 x 512): row 0 cells of 64 px: flower, mush, shell, pine, flag, a soft round shadow; animals in 128 px
// cells from y 128 (8 a row); the child's pet at x 0, y 384 (128 px)
const BB3_SPK = ['flower', 'mush', 'shell', 'pine', 'flag'];
function bbGL(cv) {
  let gl = null;
  try { gl = cv.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true, depth: true, powerPreference: 'low-power' }); } catch (e) { gl = null; }
  if (!gl) return null;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error('shader: ' + gl.getShaderInfoLog(s)); return s; };
  const prog = (vs, fs, at) => {
    const p = gl.createProgram();
    gl.attachShader(p, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs));
    at.forEach((a, n) => gl.bindAttribLocation(p, n, a));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error('link: ' + gl.getProgramInfoLog(p));
    const u = {}, nu = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (let n = 0; n < nu; n++) { const a = gl.getActiveUniform(p, n); u[a.name] = gl.getUniformLocation(p, a.name); }
    return { p, u };
  };
  const R = { gl, ch: [], N: BW / BB3.CH, prev: null, drop: -1, ghost: null, gkey: '', deco: [], frames: 0, built: 0, lost: false };
  try {
    R.P = prog(BB3_VS, BB3_FS, ['p', 't', 'l']);
    R.Q = prog(BB3_SVS, BB3_SFS, ['b', 'o', 't', 'm']);
  } catch (e) { try { logErr('Block Builder 3D: ' + e.message); } catch (er) {} return null; }
  // the block faces atlas (512 x 256): tile 2v the top of block v, 2v + 1 its side; tile 0 plain white (a pattern build's blocks)
  const atlas = bbCanvas(512, 256), ax = atlas.getContext('2d');
  ax.fillStyle = bbCol('white'); ax.fillRect(0, 0, 32, 32);
  for (let v = 1; v < BLOCKS.length; v++) {
    if (BLOCKS[v].deco) continue;
    try {
      const T = bbTex(BLOCKS[v].k);
      for (const [n, img] of [[2 * v, T.top], [2 * v + 1, T.side]]) ax.drawImage(img, (n % 16) * 32, Math.floor(n / 16) * 32);
    } catch (e) {}
  }
  const tex = (src, smooth) => {
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, smooth ? gl.LINEAR : gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, smooth ? gl.LINEAR : gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return t;
  };
  R.tA = tex(atlas, true);
  // the sprite sheet: drawn now, animals and the pet added when their pictures are ready
  const sp = R.sheet = bbCanvas(1024, 512), sx = sp.getContext('2d');
  BB3_SPK.forEach((k, n) => { try { sx.drawImage(bbSprite(k), n * 64, 0); } catch (e) {} });
  const g = sx.createRadialGradient(5 * 64 + 32, 32, 0, 5 * 64 + 32, 32, 31);
  g.addColorStop(0, bbA('ink', .5)); g.addColorStop(.55, bbA('ink', .3)); g.addColorStop(1, bbA('ink', 0));
  sx.fillStyle = g; sx.fillRect(5 * 64, 0, 64, 64);
  R.tS = tex(sp, true);
  R.sheetDirty = false;
  R.anOk = {};
  R.addAnimal = k => {
    const c = bbAnimalImg(k, () => R.addAnimal(k));
    if (!c || R.anOk[k]) return;
    const n = BB_AN.indexOf(k);
    sx.clearRect((n % 8) * 128, 128 + Math.floor(n / 8) * 128, 128, 128);
    sx.drawImage(c, (n % 8) * 128, 128 + Math.floor(n / 8) * 128);
    R.anOk[k] = 1; R.sheetDirty = true;
  };
  R.petOk = null;
  R.setPet = img => {
    if (!img || R.petOk === img) return;
    sx.clearRect(0, 384, 128, 128);
    try { sx.drawImage(img, 0, 384, 128, 128); } catch (e) { return; }
    R.petOk = img; R.sheetDirty = true;
  };
  const buf = () => ({ vb: gl.createBuffer(), ib: gl.createBuffer(), no: 0, nt: 0 });
  for (let n = 0; n < R.N * R.N; n++) R.ch.push(buf());
  R.gb = buf(); R.db = buf(); R.sb = gl.createBuffer();
  const upload = (b, m) => {
    const v = new Float32Array(m.o.v.concat(m.t.v)), off = m.o.v.length / 8, idx = new Uint16Array(m.o.i.concat(m.t.i.map(q => q + off)));
    gl.bindBuffer(gl.ARRAY_BUFFER, b.vb); gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    b.no = m.o.i.length; b.nt = m.t.i.length;
  };
  R.build = (w, n, skip) => { const m = bbGlMesh(w, n % R.N, Math.floor(n / R.N), skip); upload(R.ch[n], m); R.built++; };
  // what changed since the last frame: rebuild only the chunks those cells reach (and the one the dropping block is in)
  R.sync = E => {
    const w = E.w, d = E.drop ? E.drop.i : -1, changed = [];
    let first = false;
    if (!R.prev) { R.prev = new Uint8Array(w.length); first = true; }
    for (let n = 0; n < w.length; n++) if (w[n] != R.prev[n]) changed.push(n);
    if (d != R.drop) { if (d >= 0) changed.push(d); if (R.drop >= 0) changed.push(R.drop); }
    if (!changed.length && !first) return 0;
    R.prev.set(w);
    const dirty = first ? new Set(R.ch.map((_, n) => n)) : bbGlDirty(changed);
    for (const n of dirty) R.build(w, n, d);
    if (d != R.drop) {
      R.drop = d;
      if (d >= 0) { const v = w[d], one = new Uint8Array(w.length); one[d] = v; const m = bbGlMesh(one, Math.floor(d % BW / BB3.CH), Math.floor(Math.floor(d / BW) % BD / BB3.CH)); upload(R.db, m); }
    }
    R.deco = [];
    for (let n = 0; n < w.length; n++) if (w[n] && BLOCKS[w[n]] && BLOCKS[w[n]].deco) R.deco.push(n);
    R.lastDirty = dirty.size;
    return dirty.size;
  };
  // the see-through blueprint blocks, built again when the world or the layer changes
  R.syncGhost = E => {
    const key = E.goal ? E.layer() + ':' + E.prog() + ':' + E.mode : '';
    if (key === R.gkey) return;
    R.gkey = key;
    upload(R.gb, { o: bbGlGhost(E), t: { v: [], i: [] } });
  };
  R.resize = (W, H) => { cv.width = W; cv.height = H; };
  cv.addEventListener('webglcontextlost', e => { e.preventDefault(); R.lost = true; });
  const mat = (E, q) => { // projection x view, column-major
    const f = 1 / Math.tan(BB3.fov / 2), asp = E.W / E.H, n = BB3.near, fa = q.far, a = (fa + n) / (n - fa), b = 2 * fa * n / (n - fa);
    const r = q.r, u = q.u, F = q.f, e = q.eye;
    const V = [r[0], u[0], -F[0], 0, r[1], u[1], -F[1], 0, r[2], u[2], -F[2], 0,
      -(r[0] * e[0] + r[1] * e[1] + r[2] * e[2]), -(u[0] * e[0] + u[1] * e[1] + u[2] * e[2]), F[0] * e[0] + F[1] * e[1] + F[2] * e[2], 1];
    const P = [f / asp, 0, 0, 0, 0, f, 0, 0, 0, 0, a, -1, 0, 0, b, 0], M = new Float32Array(16);
    for (let c = 0; c < 4; c++) for (let rr = 0; rr < 4; rr++) { let s = 0; for (let k = 0; k < 4; k++) s += P[k * 4 + rr] * V[c * 4 + k]; M[c * 4 + rr] = s; }
    return M;
  };
  const attribs = (list, stride) => { list.forEach(([n, size, off]) => { gl.enableVertexAttribArray(n); gl.vertexAttribPointer(n, size, gl.FLOAT, false, stride, off); }); };
  /* one frame: o = {t: seconds, night, fog: [r, g, b] 0..1, animals: [{k, x, y, z, hop, dir, t}], pet: image or null} */
  R.draw = (E, o) => {
    if (R.lost || gl.isContextLost()) { R.lost = true; return false; }
    R.sync(E); R.syncGhost(E);
    if (o.pet) R.setPet(o.pet);
    if (R.sheetDirty) { gl.bindTexture(gl.TEXTURE_2D, R.tS); try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sp); } catch (e) {} R.sheetDirty = false; }
    const q = E.cam3(), M = mat(E, q);
    gl.viewport(0, 0, cv.width, cv.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL);
    gl.disable(gl.CULL_FACE);
    // the blocks
    const P = R.P;
    gl.useProgram(P.p);
    gl.uniformMatrix4fv(P.u.M, false, M);
    gl.uniform3fv(P.u.Y, q.eye); gl.uniform1f(P.u.T, o.t); gl.uniform1f(P.u.W, o.t % 1000); gl.uniform1f(P.u.N, o.night ? 1 : 0);
    gl.uniform3fv(P.u.F, o.fog); gl.uniform2f(P.u.R, q.dist + 4, q.dist + 26);
    gl.uniform1i(P.u.S, 0); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, R.tA);
    gl.disableVertexAttribArray(3);
    const drawBuf = (b, from, count, off) => {
      if (!count) return;
      gl.uniform3fv(P.u.O, off || [0, 0, 0]);
      gl.bindBuffer(gl.ARRAY_BUFFER, b.vb); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.ib);
      attribs([[0, 3, 0], [1, 2, 12], [2, 3, 20]], 32);
      gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, from * 2);
    };
    gl.disable(gl.BLEND); gl.depthMask(true);
    gl.uniform1f(P.u.C, .5); gl.uniform1f(P.u.A, 1);
    for (const b of R.ch) drawBuf(b, 0, b.no);
    if (R.drop >= 0 && E.drop) drawBuf(R.db, 0, R.db.no, [0, 0, E.drop.dz || 0]);
    // sprites and the soft round shadows under them
    const sv = [], put = (bx, by, bz, w, h, u, v, us, vs, flat, a, flip) => {
      const c = [[-w / 2, 0, 0, 1], [w / 2, 0, 1, 1], [w / 2, h, 1, 0], [-w / 2, h, 0, 0]];
      for (const [ox, oy, tu, tv] of [c[0], c[1], c[2], c[0], c[2], c[3]]) {
        const uu = flip ? 1 - tu : tu;
        sv.push(bx, by, bz, flat ? ox : ox, flat ? oy - h / 2 : oy, (u + uu * us) / 1024, (v + tv * vs) / 512, flat ? 1 : 0, a);
      }
    };
    const shadows = [];
    for (const n of R.deco) {
      const v = E.w[n], k = BLOCKS[v].k, i = n % BW, j = Math.floor(n / BW) % BD, z = Math.floor(n / (BW * BD));
      const dz = E.drop && E.drop.i == n ? E.drop.dz || 0 : 0;
      if (k == 'pet') { if (R.petOk) { put(i + .5, j + .5, z + dz - .08, 1.55, 1.55, 0, 384, 128, 128, 0, 1); shadows.push([i + .5, j + .5, z, .5]); } continue; }
      const c = BB3_SPK.indexOf(k);
      if (c < 0) continue;
      put(i + .5, j + .5, z + dz - .04, 1.02, 1.02, c * 64, 0, 64, 64, 0, 1);
      shadows.push([i + .5, j + .5, z, .34]);
    }
    for (const an of o.animals || []) {
      const n = BB_AN.indexOf(an.k);
      if (n < 0 || !R.anOk[an.k]) { if (n >= 0) R.addAnimal(an.k); continue; }
      const [up, sw, shh] = bbHopShape(an.hop, o.t + (an.ph || 0)), s = .92;
      put(an.x + .5, an.y + .5, an.z + up - .03, s * sw, s * shh, (n % 8) * 128, 128 + Math.floor(n / 8) * 128, 128, 128, 0, 1, an.dir < 0);
      shadows.push([an.x + .5, an.y + .5, an.gz != null ? an.gz : Math.floor(an.z + .01), .36 * (1 - up * .6)]);
    }
    const nSpr = sv.length / 9;
    for (const [x, y, z, r] of shadows) put(x, y, z, r * 2, r * 2, 5 * 64, 0, 64, 64, 1, .9);
    if (sv.length) {
      const Q = R.Q;
      gl.useProgram(Q.p);
      gl.uniformMatrix4fv(Q.u.M, false, M);
      const hl = Math.hypot(q.r[0], q.r[1]) || 1;
      gl.uniform3f(Q.u.R, q.r[0] / hl, q.r[1] / hl, 0); gl.uniform3fv(Q.u.U, q.u);
      gl.uniform1f(Q.u.N, o.night ? 1 : 0);
      gl.uniform1i(Q.u.S, 0); gl.bindTexture(gl.TEXTURE_2D, R.tS);
      gl.bindBuffer(gl.ARRAY_BUFFER, R.sb); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sv), gl.DYNAMIC_DRAW);
      attribs([[0, 3, 0], [1, 2, 12], [2, 2, 20], [3, 2, 28]], 36);
      gl.uniform1f(Q.u.C, .5);
      gl.drawArrays(gl.TRIANGLES, 0, nSpr);
      gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.depthMask(false);
      gl.uniform1f(Q.u.C, .01);
      gl.drawArrays(gl.TRIANGLES, nSpr, sv.length / 9 - nSpr);
      gl.disableVertexAttribArray(3);
      gl.useProgram(P.p);
      gl.bindTexture(gl.TEXTURE_2D, R.tA);
    }
    // the see-through blocks (far chunks first), then the blueprint's
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.depthMask(false);
    gl.uniform1f(P.u.C, .01);
    const far = R.ch.map((b, n) => { const cx = (n % R.N + .5) * BB3.CH, cy = (Math.floor(n / R.N) + .5) * BB3.CH; return [Math.hypot(cx - q.eye[0], cy - q.eye[1]), b]; }).sort((a, b) => b[0] - a[0]);
    for (const [, b] of far) drawBuf(b, b.no, b.nt);
    if (R.drop >= 0 && E.drop) drawBuf(R.db, R.db.no, R.db.nt, [0, 0, E.drop.dz || 0]);
    if (R.gb.no) drawBuf(R.gb, 0, R.gb.no);
    gl.depthMask(true); gl.disable(gl.BLEND);
    R.frames++;
    return true;
  };
  return R;
}
