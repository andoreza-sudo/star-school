/* ---------- GLX: a small shared WebGL 1 layer for the Game Room (GL-01) ----------
   Plain WebGL 1, no library, works offline. It goes into games.<VER>.js (tools/build.py PARTS) before 62-hill.js, which uses it
   for the 2.5D look of 4x4 Hill Climb (62b-hill-gl.js). Block Builder (61-bb-gl.js) keeps its own renderer for now.
   - GLX.init(canvas) makes a context and three shader programs; it returns null when WebGL is missing, the context cannot be made
     or a shader does not compile (the fallback signal: the game then draws with canvas 2D, exactly as before). GLX.probe() asks
     once per page whether WebGL works at all. A lost context sets R.lost; the game drops to 2D for the rest of the drive. R.soft
     says the WebGL is drawn by the CPU (SwiftShader, llvmpipe): a game should prefer its 2D drawing there.
   - Shaders (all mediump-safe in the fragment stage, lighting per vertex so a cheap Mali GPU does almost nothing per pixel):
       lit  position, normal, colour; one sun and an ambient term (uL, uA), the model matrix turns the normals (uM)
       grad position, colour with alpha (gradients, baked shading, see-through parts); colours are blended premultiplied
       spr  position, texture uv, a tint per vertex (sprites, textured faces); texels under uCut alpha are discarded
   - Meshes: GLX.mesh(R, kind, data, n) puts a Float32Array of interleaved vertices in a buffer (kind: 'lit' 9 floats a vertex,
     'grad' 7, 'spr' 9); GLX.box, GLX.extrude (a convex 2D profile made into a slab), GLX.quad push vertices onto a plain array
     while a mesh is built (never per frame). GLX.batch is a fixed buffer of sprite quads refilled each frame without allocating.
   - Camera: GLX.side() is the side-view perspective the 2.5D games use: the plane z = 0 maps to the screen exactly as the game's
     2D drawing does (sc pixels a world unit around a vanishing point), so a 2D layer drawn on top lines up; nearer things
     (z > 0) grow, farther ones shrink and slide toward the vanishing point (parallax for free).
   - GLX.fit sizes the canvas: device pixels capped at dpr (1.5 by default: cheap tablets) and at px pixels in all, times q.
   Matrices are column-major Float32Arrays; products are made in doubles first (world x reaches 60 000), so nothing jitters. */
const GLX = {
  ok: null,
  probe() {
    if (GLX.ok != null) return GLX.ok;
    try { const c = document.createElement('canvas'), g = c.getContext && (c.getContext('webgl') || c.getContext('experimental-webgl')); GLX.ok = !!g; if (g) { const e = g.getExtension('WEBGL_lose_context'); if (e) e.loseContext(); } } catch (e) { GLX.ok = false; }
    return GLX.ok;
  },
  VS: {
    lit: 'attribute vec3 aP;attribute vec3 aN;attribute vec3 aC;uniform mat4 uMVP;uniform mat4 uM;uniform vec3 uL;uniform float uA;uniform vec3 uT;varying vec3 vC;' +
      'void main(){vec3 n=normalize((uM*vec4(aN,0.)).xyz);float d=max(dot(n,uL),0.);vC=aC*uT*(uA+(1.-uA)*d+.12*max(n.y,0.));gl_Position=uMVP*vec4(aP,1.);}',
    grad: 'attribute vec3 aP;attribute vec4 aC;uniform mat4 uMVP;uniform vec4 uT;varying vec4 vC;void main(){vC=aC*uT;gl_Position=uMVP*vec4(aP,1.);}',
    spr: 'attribute vec3 aP;attribute vec2 aU;attribute vec4 aC;uniform mat4 uMVP;uniform vec4 uT;varying vec2 vU;varying vec4 vC;void main(){vU=aU;vC=aC*uT;gl_Position=uMVP*vec4(aP,1.);}',
  },
  FS: {
    lit: 'precision mediump float;varying vec3 vC;void main(){gl_FragColor=vec4(vC,1.);}',
    grad: 'precision mediump float;varying vec4 vC;void main(){gl_FragColor=vec4(vC.rgb*vC.a,vC.a);}',
    spr: 'precision mediump float;uniform sampler2D uS;uniform float uCut;varying vec2 vU;varying vec4 vC;void main(){vec4 t=texture2D(uS,vU);float a=t.a*vC.a;if(a<uCut)discard;gl_FragColor=vec4(t.rgb*vC.rgb*vC.a,a);}',
  },
  LAY: { lit: [['aP', 3], ['aN', 3], ['aC', 3]], grad: [['aP', 3], ['aC', 4]], spr: [['aP', 3], ['aU', 2], ['aC', 4]] },
  init(cv, o = {}) {
    let gl = null;
    try { gl = cv.getContext('webgl', { alpha: false, antialias: !!o.aa, depth: true, premultipliedAlpha: true, powerPreference: 'low-power' }); } catch (e) { gl = null; }
    if (!gl) return null;
    const R = { gl, cv, lost: false, P: {}, cur: null, tex: new Map(), m: new Float32Array(16), id: new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]), draws: 0 };
    try {
      const sh = (t, s) => { const x = gl.createShader(t); gl.shaderSource(x, s); gl.compileShader(x); if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) throw new Error('shader: ' + gl.getShaderInfoLog(x)); return x; };
      for (const k in GLX.VS) {
        const p = gl.createProgram(), lay = GLX.LAY[k];
        gl.attachShader(p, sh(gl.VERTEX_SHADER, GLX.VS[k])); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, GLX.FS[k]));
        lay.forEach(([a], n) => gl.bindAttribLocation(p, n, a));
        gl.linkProgram(p);
        if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error('link: ' + gl.getProgramInfoLog(p));
        const u = {}, nu = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
        for (let n = 0; n < nu; n++) { const a = gl.getActiveUniform(p, n); u[a.name] = gl.getUniformLocation(p, a.name); }
        R.P[k] = { p, u, lay, st: lay.reduce((s, [, n]) => s + n, 0) * 4 };
      }
    } catch (e) { try { const x = gl.getExtension('WEBGL_lose_context'); if (x) x.loseContext(); } catch (_) {} return null; }
    // a WebGL drawn by the CPU (SwiftShader, llvmpipe: no GPU, or one the browser does not trust) is slower than canvas 2D
    try { const x = gl.getExtension('WEBGL_debug_renderer_info'); R.name = String(gl.getParameter(x ? x.UNMASKED_RENDERER_WEBGL : gl.RENDERER) || ''); } catch (e) { R.name = ''; }
    R.soft = /swiftshader|llvmpipe|softpipe|software/i.test(R.name);
    cv.addEventListener('webglcontextlost', e => { e.preventDefault(); R.lost = true; });
    gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    return R;
  },
  // the context is given back at once (a browser keeps only a few alive; a new one is made for each drive)
  end(R) { if (!R || R.ended) return; R.ended = true; try { const x = R.gl.getExtension('WEBGL_lose_context'); if (x) x.loseContext(); } catch (e) {} },
  // size the canvas to its box: at most dpr device pixels a css pixel and px pixels in all, times q (a slow tablet lowers q)
  fit(cv, o = {}) {
    const cw = Math.max(1, cv.clientWidth), ch = Math.max(1, cv.clientHeight), d = typeof devicePixelRatio == 'number' ? devicePixelRatio : 1;
    const k = Math.min(d, o.dpr || 1.5, Math.sqrt((o.px || 1e6) / (cw * ch))) * (o.q || 1), w = Math.max(1, Math.round(cw * k)), h = Math.max(1, Math.round(ch * k));
    if (cv.width !== w) cv.width = w;
    if (cv.height !== h) cv.height = h;
    return k;
  },
  // ---- meshes ----
  mesh(R, kind, data, n, dyn) {
    const gl = R.gl, b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, data, dyn ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW);
    return { b, kind, n: n == null ? data.length / (R.P[kind].st / 4) : n };
  },
  free(R, m) { if (m && m.b) { R.gl.deleteBuffer(m.b); m.b = null; } },
  // a mesh from a plain array of numbers (null when it is empty)
  arr(R, kind, a) { return a.length ? GLX.mesh(R, kind, new Float32Array(a)) : null; },
  // lit vertices: p position, n normal, c [r, g, b]
  v9(o, x, y, z, nx, ny, nz, c) { o.push(x, y, z, nx, ny, nz, c[0], c[1], c[2]); },
  // a lit box from (x0, y0, z0) to (x1, y1, z1): 12 triangles; c the colour, cs the sides (default c)
  box(o, x0, y0, z0, x1, y1, z1, c, cs) {
    cs = cs || c;
    const F = (a, b, d, e, n, col) => { for (const p of [a, b, d, a, d, e]) GLX.v9(o, p[0], p[1], p[2], n[0], n[1], n[2], col); };
    F([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], [0, 0, 1], c);
    F([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], [0, 0, -1], cs);
    F([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], [0, 1, 0], c);
    F([x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [0, -1, 0], cs);
    F([x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [1, 0, 0], cs);
    F([x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], [-1, 0, 0], cs);
  },
  // a convex 2D profile pts [[x, y], ...] (counter-clockwise) made into a slab from z0 to z1: the caps (front c, back cb) and the
  // sides (cs) with their own normals, so it is lit like a solid
  extrude(o, pts, z0, z1, c, cs, cb) {
    cs = cs || c; cb = cb || c;
    const n = pts.length;
    for (let i = 1; i < n - 1; i++) {
      for (const p of [pts[0], pts[i], pts[i + 1]]) GLX.v9(o, p[0], p[1], z1, 0, 0, 1, c);
      for (const p of [pts[0], pts[i + 1], pts[i]]) GLX.v9(o, p[0], p[1], z0, 0, 0, -1, cb);
    }
    for (let i = 0; i < n; i++) {
      const a = pts[i], b = pts[(i + 1) % n], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, nx = dy / l, ny = -dx / l;
      for (const [p, z] of [[a, z1], [a, z0], [b, z0], [a, z1], [b, z0], [b, z1]]) GLX.v9(o, p[0], p[1], z, nx, ny, 0, cs);
    }
  },
  // a flat quad for the grad or spr programs: corners a, b, c, d (each [x, y, z]), colours ca..cd ([r, g, b, a]), uvs (spr only)
  quad(o, kind, a, b, c, d, ca, cb, cc, cd, uv) {
    const P = [a, b, c, a, c, d], C = [ca, cb || ca, cc || ca, ca, cc || ca, cd || ca], U = uv ? [uv[0], uv[1], uv[2], uv[0], uv[2], uv[3]] : null;
    for (let i = 0; i < 6; i++) { const p = P[i], q = C[i]; o.push(p[0], p[1], p[2]); if (kind == 'spr') o.push(U[i][0], U[i][1]); o.push(q[0], q[1], q[2], q[3]); }
  },
  // ---- a reusable buffer of sprite quads, refilled each frame (no allocation) ----
  batch(R, max) { const f = new Float32Array(max * 54); return { f, n: 0, max, m: GLX.mesh(R, 'spr', f, 0, true) }; },
  // a quad of w x h centred on (x, y) at depth z, turned by a (radians), texture rectangle u0, v0, u1, v1, tint t [r, g, b, a]
  bq(B, x, y, z, w, h, a, u0, v0, u1, v1, t) {
    if (B.n >= B.max) return;
    const c = Math.cos(a), s = Math.sin(a), hw = w / 2, hh = h / 2, f = B.f;
    let i = B.n * 54;
    const P = [[-hw, -hh, u0, v1], [hw, -hh, u1, v1], [hw, hh, u1, v0], [-hw, -hh, u0, v1], [hw, hh, u1, v0], [-hw, hh, u0, v0]];
    for (const [px, py, u, v] of P) { f[i++] = x + px * c - py * s; f[i++] = y + px * s + py * c; f[i++] = z; f[i++] = u; f[i++] = v; f[i++] = t[0]; f[i++] = t[1]; f[i++] = t[2]; f[i++] = t[3]; }
    B.n++;
  },
  // draw the quads in the batch with texture tex (o: the draw options, such as cut; reused, not copied)
  bflush(R, B, mvp, tex, o) {
    if (!B.n) return;
    const gl = R.gl, q = o || B.o || (B.o = {});
    gl.bindBuffer(gl.ARRAY_BUFFER, B.m.b); gl.bufferSubData(gl.ARRAY_BUFFER, 0, B.f.subarray(0, B.n * 54));
    B.m.n = B.n * 6;
    q.tex = tex;
    GLX.draw(R, B.m, mvp, q);
    B.n = 0;
  },
  // ---- textures: one per canvas (made again when the canvas object changes) ----
  tex(R, key, cv, rep) {
    const gl = R.gl, old = R.tex.get(key);
    if (old && old.cv === cv && !cv._dirty) return old.t;
    const t = old ? old.t : gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cv); } catch (e) {}
    const w = rep ? gl.REPEAT : gl.CLAMP_TO_EDGE;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, w); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, w);
    cv._dirty = false;
    R.tex.set(key, { t, cv });
    return t;
  },
  // ---- drawing: one mesh with one program; o: {M model matrix (lit), L sun, A ambient, T tint, tex, cut, n vertex count, first} ----
  draw(R, m, mvp, o) {
    if (!m || !m.b) return;
    o = o || GLX.NONE;
    const gl = R.gl, P = R.P[m.kind], u = P.u;
    if (R.cur !== P) { gl.useProgram(P.p); R.cur = P; }
    gl.bindBuffer(gl.ARRAY_BUFFER, m.b);
    let off = 0;
    P.lay.forEach(([, n], i) => { gl.enableVertexAttribArray(i); gl.vertexAttribPointer(i, n, gl.FLOAT, false, P.st, off); off += n * 4; });
    for (let i = P.lay.length; i < 3; i++) gl.disableVertexAttribArray(i);
    gl.uniformMatrix4fv(u.uMVP, false, mvp);
    if (m.kind == 'lit') {
      gl.uniformMatrix4fv(u.uM, false, o.M || R.id);
      const L = o.L || GLX.SUN; gl.uniform3f(u.uL, L[0], L[1], L[2]); gl.uniform1f(u.uA, o.A == null ? .55 : o.A);
      const T = o.T || GLX.ONE; gl.uniform3f(u.uT, T[0], T[1], T[2]);
    } else {
      const T = o.T || GLX.ONE; gl.uniform4f(u.uT, T[0], T[1], T[2], T[3] == null ? 1 : T[3]);
      if (m.kind == 'spr') { gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, o.tex); gl.uniform1i(u.uS, 0); gl.uniform1f(u.uCut, o.cut == null ? .004 : o.cut); }
    }
    gl.drawArrays(gl.TRIANGLES, o.first || 0, o.n == null ? m.n : o.n);
    R.draws++;
  },
  SUN: (() => { const v = [-.42, .74, .52], l = Math.hypot(...v); return v.map(q => q / l); })(),
  ONE: [1, 1, 1, 1],
  NONE: {},
  // ---- matrices ----
  // the side view: eye at (ex, ey, D) looking down -z; the plane z = 0 is drawn at f / D (= sc) pixels a unit with the eye's point at
  // pixel (cx, cy) on a W x H screen of the game's own pixels. Returns a plain array (doubles) to multiply with a model matrix.
  side(W, H, sc, D, ex, ey, cx, cy, near, far, out) {
    const f = sc * D, a = 2 * cx / W - 1, b = 1 - 2 * cy / H, c = -(far + near) / (far - near), d = -2 * far * near / (far - near);
    // rows: [2f/W, 0, -a, -2f/W ex + a D], [0, 2f/H, -b, -2f/H ey + b D], [0, 0, c, -c D + d], [0, 0, -1, D]
    const o = out || new Array(16);
    o[0] = 2 * f / W; o[1] = o[2] = o[3] = o[4] = 0; o[5] = 2 * f / H; o[6] = o[7] = 0; o[8] = -a; o[9] = -b; o[10] = c; o[11] = -1;
    o[12] = -2 * f / W * ex + a * D; o[13] = -2 * f / H * ey + b * D; o[14] = -c * D + d; o[15] = D;
    return o;
  },
  // screen pixels (W x H, y down) at a depth: a flat 2D layer under or over the 3D (sky, clouds)
  screen(W, H, z) { return [2 / W, 0, 0, 0, 0, -2 / H, 0, 0, 0, 0, 0, 0, -1, 1, z == null ? .9999 : z, 1]; },
  // out = a x b (column-major), written into the Float32Array out
  mul(out, a, b) {
    for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) out[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
    return out;
  },
  // a model matrix: translate (x, y, z), turn by a about z, scale s (plain array)
  model(o, x, y, z, a = 0, s = 1) { const c = Math.cos(a) * s, n = Math.sin(a) * s; o[0] = c; o[1] = n; o[2] = 0; o[3] = 0; o[4] = -n; o[5] = c; o[6] = 0; o[7] = 0; o[8] = 0; o[9] = 0; o[10] = s; o[11] = 0; o[12] = x; o[13] = y; o[14] = z; o[15] = 1; return o; },
  // a token colour '#rrggbb' as [r, g, b] in 0..1 (anything else: grey)
  rgb(hex) { if (!/^#[0-9a-f]{6}$/i.test(hex || '')) return [.6, .6, .6]; const n = parseInt(hex.slice(1), 16); return [(n >> 16) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; },
  mix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; },
  mulc(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; },
};
