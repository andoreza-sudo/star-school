/* ---------- Brain Teasers: Tangrams (P3-11; BRAIN_TEASERS.md 5.7, 7, 8) ----------
   The seven classic pieces (two big triangles L, a middle triangle M, two small triangles S, a square Q, a parallelogram P) fill a
   silhouette. Puzzles are authored in src/data/d-puz-tangram.js (PUZ.tangram, format documented there) as their SOLUTION, so every
   puzzle is solvable by construction; tools/test.js proves each one exactly (no overlap, one connected shape, exact cover).

   UNITS AND EXACT NUMBERS. The big square that the seven pieces make has side 4, so the pieces are (k = 0, before any move):
     L (0,0) (4,0) (2,2)    M (0,0) (2,0) (0,2)    S (0,0) (2,0) (1,1)    Q (1,0) (2,1) (1,2) (0,1)    P (0,0) (2,0) (3,1) (1,1)
   (y points down, as on screen). A placement is [k, f, x, y]: flip f (x -> -x, the parallelogram only), then turn k x 45 degrees
   clockwise about (0,0), then move by (x, y). Turning by 45 degrees brings in sqrt(2), so the data keeps x and y exact as a number
   or a pair [a, b] = a + b * sqrt(2)/2 (a and b whole or half numbers); every corner of every piece is then such a pair too.
   On the screen positions are plain numbers in units: two corners closer than 1e-4 unit are the same point, and areas within 0.02
   unit^2 (2% of a small triangle) are equal. Snapping lands pieces exactly on corners, so a right answer is exact up to rounding.

   BANDS AND LEVELS (section 7, "help: outlines -> one piece placed -> nothing"; TG.PLAN). Level L uses puzzle L-1 of the bank (the
   bank is in order of difficulty); past the end of the bank a level picks one of the harder half by the seeded rnd. The seeded rnd
   also mirrors the picture (left-right) and picks which pieces the child places and how they lie in the tray:
     A (PK-K)  2 pieces to place (levels 1-6), then 3; only big pieces (the big triangles, the middle triangle, the square); the
               rest of the picture is already built; the outline of every missing piece is drawn; levels 1-4 the tray pieces already
               lie the right way round, then they need turning.
     B (1-2)   4 pieces (levels 1-6), then 5, any of the seven; outlines drawn; turning needed; the parallelogram comes the right way
               up until level 8, then it may need a flip.
     C (3-4)   all seven, outlines hidden, one piece placed for you (levels 1-6 a big triangle, then any other piece).
     D (5-6)   all seven, no help.
   Puzzle (JSON): {id, name, say, b band, n bank index, m mirrored 0/1, pcs: [[k, f, x, y] x 7 exact, pieces in the order
   L L M S S Q P], fix: [piece indexes placed for you], ol: 1 when outlines show, tray: [[k, f] x 7 how each piece starts]}.

   SOLVED (TG.solved): every piece is on the board, no two pieces overlap (intersection area <= 0.02), and every piece lies inside
   the silhouette (its overlap with the solution pieces adds up to its own area within 0.02). Since the pieces' areas add up to
   the silhouette's, that is an exact cover. Any arrangement counts, not only the stored one, so the two big and the two small
   triangles are interchangeable, the square can be turned 90 degrees, and so on.

   STATE (api.saveState after every move; TG.fit refuses one that does not belong to the puzzle): {pc: per piece null (placed for
   you), [k, f] (in the tray) or [k, f, x, y] (on the board, units), h: the slot (solution piece) a hint is showing, or -1}.

   INPUT (one svg, touch-action none, pointer events for touch, pen and mouse): drag a piece from the tray or the board; on drop it
   snaps (TG.snap): among the moves of up to 0.45 unit (at least 16 px, at most 30 px) that put one of its corners on a corner of the
   silhouette, of the hidden solution or of another piece, it takes the one that fits (inside, no overlap), then the one with the
   most corners landing on corners, then the shortest. A drop on the tray puts the piece back. Tap a piece to pick it (a purple
   ring); tap the picked piece again to turn it 45 degrees clockwise (about its middle, then it snaps again). With a piece picked, a
   tap on the board moves it there (tap-then-tap, section 8). Buttons: Turn, Flip (only for the parallelogram), Undo (40 steps,
   not saved). Keys: R turns, F flips, U undoes. A piece that sticks out or lies on another gets an amber dashed ring.
   HINTS (5.7): 1) the outline of one slot glows yellow and its piece is picked; 2) that piece turns (and flips) the right way;
   3) it goes in (a piece in the way goes back to the tray). Tiers 1 and 2 never move a piece. No mistakes are counted: a piece in
   the wrong place is part of trying.
   DRAWING: the silhouette is one path (TG.outline joins the solution pieces and drops the inner edges), dark slate with a shadow
   along its top-left inside edge (light from the top left). Pieces: a ledge in the shade tone below, the base colour, a light edge
   on the sides facing the light, a deep outline; colours are --ill-* tokens (.tg-c0 .. .tg-c6), and the shapes differ anyway. */
const TG = (() => {
  const H = Math.SQRT1_2;
  const KIND = 'LLMSSQP';
  const SHAPE = {
    L: [[0, 0], [4, 0], [2, 2]], M: [[0, 0], [2, 0], [0, 2]], S: [[0, 0], [2, 0], [1, 1]],
    Q: [[1, 0], [2, 1], [1, 2], [0, 1]], P: [[0, 0], [2, 0], [3, 1], [1, 1]],
  };
  const AREA = { L: 4, M: 2, S: 1, Q: 2, P: 2 };
  const COLOUR = ['red', 'blue', 'yellow', 'green', 'pink', 'orange', 'light blue'];
  const SAME = 1e-4, EPS_A = 0.02;
  // how each band is helped (section 7): pieces to place by level, outlines, pieces placed for you, tray turned right
  const PLAN = {
    A: lv => ({ move: lv <= 6 ? 2 : 3, ol: 1, big: 1, turned: lv <= 4, flip: 0 }),
    B: lv => ({ move: lv <= 6 ? 4 : 5, ol: 1, big: 0, turned: false, flip: lv >= 9 }),
    C: lv => ({ move: 6, ol: 0, big: 0, turned: false, flip: 1, given: lv <= 6 ? 'L' : 'other' }),
    D: () => ({ move: 7, ol: 0, big: 0, turned: false, flip: 1 }),
  };
  const nameOf = (t, b) => ({ L: 'big triangle', M: 'middle triangle', S: 'small triangle', Q: 'square',
    P: b == 'A' || b == 'B' ? 'slanted piece' : 'parallelogram' })[t];

  /* ---------- exact numbers: n or [a, b] = a + b * sqrt(2)/2; exact points [xa, xb, ya, yb] ---------- */
  const pair = v => Array.isArray(v) ? [+v[0], +v[1]] : [+v, 0];
  const num = v => { const p = pair(v); return p[0] + p[1] * H; };
  const dataOf = (a, b) => b === 0 ? a : [a, b];
  const xrot = p => [(p[1] - p[3]) / 2, p[0] - p[2], (p[1] + p[3]) / 2, p[0] + p[2]];
  const xflip = p => [-p[0], -p[1], p[2], p[3]];
  function xlocal(t, k, f) {
    return SHAPE[t].map(([x, y]) => {
      let p = [x, 0, y, 0];
      if (f) p = xflip(p);
      for (let i = 0; i < k; i++) p = xrot(p);
      return p;
    });
  }
  // the exact corners of a placement (x, y in the data form)
  function xverts(t, k, f, x, y) {
    const X = pair(x), Y = pair(y);
    return xlocal(t, k, f).map(p => [p[0] + X[0], p[1] + X[1], p[2] + Y[0], p[3] + Y[1]]);
  }
  const xeq = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  // the same piece without a flip, for the pieces whose mirror image is the piece itself turned (all but the parallelogram)
  function xnorm(t, k, f, x, y) {
    if (!f || t == 'P') return [k, f, x, y];
    const want = xverts(t, k, f, x, y);
    for (let k2 = 0; k2 < 8; k2++) {
      const loc = xlocal(t, k2, 0);
      for (const w of want) {
        const d = [w[0] - loc[0][0], w[1] - loc[0][1], w[2] - loc[0][2], w[3] - loc[0][3]];
        const got = loc.map(p => [p[0] + d[0], p[1] + d[1], p[2] + d[2], p[3] + d[3]]);
        if (got.every(g => want.some(v => xeq(g, v)))) return [k2, 0, dataOf(d[0], d[1]), dataOf(d[2], d[3])];
      }
    }
    throw new Error('tangram: no unflipped form of ' + t);
  }
  // the picture mirrored left-right: x -> -x for every corner
  function xmirror(t, pc) {
    const X = pair(pc[2]);
    return xnorm(t, (8 - pc[0]) % 8, 1 - pc[1], dataOf(-X[0], -X[1]), pc[3]);
  }

  /* ---------- plain-number geometry (units) ---------- */
  const LOC = {};
  for (const t in SHAPE) for (let f = 0; f < 2; f++) for (let k = 0; k < 8; k++) {
    LOC[t + k + f] = xlocal(t, k, f).map(p => [p[0] + p[1] * H, p[2] + p[3] * H]);
  }
  const local = (t, k, f) => LOC[t + k + (f ? 1 : 0)];
  const poly = (t, k, f, x, y) => local(t, k, f).map(([a, b]) => [a + x, b + y]);
  const mid = pl => [pl.reduce((s, q) => s + q[0], 0) / pl.length, pl.reduce((s, q) => s + q[1], 0) / pl.length];
  const area2 = pl => pl.reduce((s, q, i) => { const r = pl[(i + 1) % pl.length]; return s + q[0] * r[1] - r[0] * q[1]; }, 0);
  const area = pl => Math.abs(area2(pl)) / 2;
  const ccw = pl => area2(pl) < 0 ? pl.slice().reverse() : pl;
  // the area two convex polygons share (Sutherland-Hodgman)
  function shared(a, b) {
    let o = ccw(a);
    b = ccw(b);
    for (let i = 0; i < b.length && o.length; i++) {
      const [ax, ay] = b[i], [bx, by] = b[(i + 1) % b.length], ex = bx - ax, ey = by - ay;
      const side = q => ex * (q[1] - ay) - ey * (q[0] - ax);
      const inp = o;
      o = [];
      for (let j = 0; j < inp.length; j++) {
        const P = inp[j], Q = inp[(j + 1) % inp.length], sp = side(P), sq = side(Q);
        if (sp >= 0) o.push(P);
        if ((sp >= 0) != (sq >= 0)) { const t = sp / (sp - sq); o.push([P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t]); }
      }
    }
    return o.length > 2 ? area(o) : 0;
  }
  const near = (a, b, e = SAME) => Math.abs(a[0] - b[0]) < e && Math.abs(a[1] - b[1]) < e;
  const samePoly = (a, b) => a.length == b.length && a.every(q => b.some(r => near(q, r)));
  // The outline of a set of pieces that do not overlap: every edge is cut at the corners lying on it; a piece of edge that two
  // pieces share runs both ways and is dropped; the rest are joined into loops (outer loops turn one way, holes the other).
  function outline(polys) {
    const V = [];
    const at = q => { let i = V.findIndex(r => near(q, r, 1e-6)); if (i < 0) { i = V.length; V.push(q); } return i; };
    polys.forEach(pl => ccw(pl).forEach(at));
    const E = new Map();
    for (const pl of polys.map(ccw)) {
      for (let i = 0; i < pl.length; i++) {
        const a = pl[i], b = pl[(i + 1) % pl.length], dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy;
        const cut = V.map((q, j) => [j, ((q[0] - a[0]) * dx + (q[1] - a[1]) * dy) / L2, Math.abs((q[0] - a[0]) * dy - (q[1] - a[1]) * dx) / Math.sqrt(L2)])
          .filter(([, t, d]) => t > 1e-9 && t < 1 - 1e-9 && d < 1e-6).sort((p, q) => p[1] - q[1]).map(c => c[0]);
        const chain = [at(a), ...cut, at(b)];
        for (let j = 0; j + 1 < chain.length; j++) {
          const f = chain[j], g = chain[j + 1], back = g + '>' + f;
          if (E.has(back)) E.delete(back); else E.set(f + '>' + g, [f, g]);
        }
      }
    }
    const left = [...E.values()], loops = [];
    while (left.length) {
      const loop = [], first = left.shift();
      let cur = first;
      loop.push(cur[0]);
      for (let guard = 0; guard < 999; guard++) {
        const n = left.findIndex(e => e[0] == cur[1]);
        if (n < 0) break;
        cur = left.splice(n, 1)[0];
        loop.push(cur[0]);
      }
      // drop corners where the outline runs straight on
      const pts = loop.map(i => V[i]).filter((q, i, a) => {
        const p = a[(i + a.length - 1) % a.length], r = a[(i + 1) % a.length];
        return Math.abs((q[0] - p[0]) * (r[1] - q[1]) - (q[1] - p[1]) * (r[0] - q[0])) > 1e-9;
      });
      if (pts.length > 2) loops.push(pts);
    }
    return loops;
  }

  /* ---------- puzzles ---------- */
  const bank = () => (typeof PUZ != 'undefined' && PUZ.tangram) || []; // the data file loads after the code: read it only in functions
  // the bank entry a level uses (the bank is ordered easy to hard)
  function pickIndex(level, rnd) {
    const n = bank().length;
    if (n >= 12) { const a = Math.floor((level - 1) * n / 12), b = Math.max(a + 1, Math.floor(level * n / 12)); return a + Math.floor(rnd() * (b - a)); }
    if (level <= n) return level - 1;
    const lo = Math.floor(n / 2);
    return lo + Math.floor(rnd() * (n - lo));
  }
  function make(band, level, rnd) {
    const n = pickIndex(level, rnd), e = bank()[n];
    if (!e) throw new Error('tangram: no puzzle ' + n);
    const m = rnd() < 0.5 ? 1 : 0, plan = PLAN[band](level);
    const pcs = e.pcs.map((pc, i) => m ? xmirror(KIND[i], pc) : xnorm(KIND[i], pc[0], pc[1], pc[2], pc[3]));
    // the pieces the child places
    let move;
    const all = [0, 1, 2, 3, 4, 5, 6], order = all.slice();
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    if (plan.move >= 7) move = all;
    else if (plan.move == 6) {
      const given = plan.given == 'L' ? (rnd() < 0.5 ? 0 : 1) : order.find(i => KIND[i] != 'L');
      move = all.filter(i => i != given);
    } else move = order.filter(i => !plan.big || 'LMQ'.includes(KIND[i])).slice(0, plan.move).sort((a, b) => a - b);
    const tray = pcs.map((pc, i) => {
      if (!move.includes(i)) return [pc[0], pc[1]];
      const f = KIND[i] == 'P' && plan.flip ? 0 : pc[1];
      if (plan.turned) return [pc[0], f];
      let k = Math.floor(rnd() * 8);
      if (k == pc[0] && f == pc[1]) k = (k + 3) % 8; // the tray never starts with the answer's turn when turning is part of the level
      return [k, f];
    });
    return { id: e.id, name: e.name, say: e.say, b: band, n, m, pcs, fix: all.filter(i => !move.includes(i)), ol: plan.ol, tray };
  }
  const solPoly = (p, i) => { const s = p.pcs[i]; return poly(KIND[i], s[0], s[1], num(s[2]), num(s[3])); };
  const solPolys = p => p.pcs.map((s, i) => solPoly(p, i));
  const movable = p => [0, 1, 2, 3, 4, 5, 6].filter(i => !p.fix.includes(i));
  const fresh = p => ({ pc: p.tray.map((t, i) => p.fix.includes(i) ? null : [t[0], t[1]]), h: -1 });
  // the polygon of piece i now (units), or null while it is in the tray
  function piecePoly(p, st, i) {
    if (p.fix.includes(i)) return solPoly(p, i);
    const e = st.pc[i];
    return e && e.length == 4 ? poly(KIND[i], e[0], e[1], e[2], e[3]) : null;
  }
  // a saved state that belongs to this puzzle
  function fit(p, st) {
    if (!st || typeof st != 'object' || Array.isArray(st) || !Array.isArray(st.pc) || st.pc.length != 7) return false;
    for (let i = 0; i < 7; i++) {
      const e = st.pc[i];
      if (p.fix.includes(i)) { if (e !== null) return false; continue; }
      if (!Array.isArray(e) || (e.length != 2 && e.length != 4)) return false;
      if (!Number.isInteger(e[0]) || e[0] < 0 || e[0] > 7 || (e[1] !== 0 && e[1] !== 1) || (e[1] && KIND[i] != 'P')) return false;
      if (e.length == 4 && !(typeof e[2] == 'number' && typeof e[3] == 'number' && Math.abs(e[2]) < 60 && Math.abs(e[3]) < 60)) return false;
    }
    if (!Number.isInteger(st.h) || st.h < -1 || st.h > 6 || (st.h >= 0 && p.fix.includes(st.h))) return false;
    return true;
  }
  // does polygon pl (piece i) lie inside the silhouette without covering another piece?
  function fits(p, st, i, pl) {
    const sol = solPolys(p);
    if (sol.reduce((s, q) => s + shared(pl, q), 0) < area(pl) - EPS_A) return false;
    for (let j = 0; j < 7; j++) {
      if (j == i) continue;
      const q = piecePoly(p, st, j);
      if (q && shared(pl, q) > EPS_A) return false;
    }
    return true;
  }
  function solved(p, st) {
    const sol = solPolys(p), pls = [];
    for (let i = 0; i < 7; i++) { const q = piecePoly(p, st, i); if (!q) return false; pls.push(q); }
    for (let i = 0; i < 7; i++) for (let j = i + 1; j < 7; j++) if (shared(pls[i], pls[j]) > EPS_A) return false;
    return pls.every(pl => sol.reduce((s, q) => s + shared(pl, q), 0) >= area(pl) - EPS_A);
  }
  // corners a dropped piece may snap to: the silhouette's and the hidden solution's, and those of the other pieces on the board
  function corners(p, st, skip) {
    const out = [];
    const add = q => { if (!out.some(r => near(q, r))) out.push(q); };
    solPolys(p).forEach(pl => pl.forEach(add));
    for (let j = 0; j < 7; j++) if (j != skip) { const q = piecePoly(p, st, j); if (q) q.forEach(add); }
    return out;
  }
  // where piece i (turn k, flip f) lands when dropped at (x, y), tol in units: {x, y, snapped, ok}
  function snap(p, st, i, k, f, x, y, tol) {
    const t = KIND[i], pl = poly(t, k, f, x, y), C = corners(p, st, i), seen = [];
    let best = null;
    for (const v of pl) for (const c of C) {
      const dx = c[0] - v[0], dy = c[1] - v[1], d = Math.hypot(dx, dy);
      if (d > tol || seen.some(s => near(s, [dx, dy]))) continue;
      seen.push([dx, dy]);
      const q = pl.map(r => [r[0] + dx, r[1] + dy]);
      const hits = q.filter(r => C.some(c2 => near(r, c2))).length, ok = fits(p, st, i, q);
      const s = [ok ? 1 : 0, hits, -d];
      if (!best || s[0] > best.s[0] || (s[0] == best.s[0] && (s[1] > best.s[1] || (s[1] == best.s[1] && s[2] > best.s[2])))) best = { s, dx, dy, ok };
    }
    if (!best) return { x, y, snapped: false, ok: fits(p, st, i, pl) };
    return { x: x + best.dx, y: y + best.dy, snapped: true, ok: best.ok };
  }
  // a piece turned or flipped about its middle: the new x, y that keep the middle where it was
  function about(t, k, f, x, y, k2, f2) {
    const a = mid(poly(t, k, f, x, y)), b = mid(local(t, k2, f2));
    return [a[0] - b[0], a[1] - b[1]];
  }
  // which solution slots are filled by a piece of their own kind lying exactly there; and by which piece
  function filled(p, st) {
    const sol = solPolys(p), by = new Array(7).fill(-1), used = new Set();
    for (let s = 0; s < 7; s++) for (let j = 0; j < 7; j++) {
      if (used.has(j) || KIND[j] != KIND[s]) continue;
      const q = piecePoly(p, st, j);
      if (q && samePoly(q, sol[s])) { by[s] = j; used.add(j); break; }
    }
    return { by, used };
  }
  const HINT_ORDER = [0, 1, 2, 6, 5, 3, 4]; // big pieces first
  // the slot a hint is about and the piece that goes there: {s, i} or null when every slot is filled
  function hintTarget(p, st) {
    const { by, used } = filled(p, st);
    const inTray = j => st.pc[j] && st.pc[j].length == 2;
    const pieceFor = s => {
      const c = movable(p).filter(j => KIND[j] == KIND[s] && !used.has(j));
      return c.find(inTray) != null ? c.find(inTray) : c.length ? c[0] : -1;
    };
    if (st.h >= 0 && by[st.h] < 0 && pieceFor(st.h) >= 0) return { s: st.h, i: pieceFor(st.h) };
    const open = HINT_ORDER.filter(s => by[s] < 0 && pieceFor(s) >= 0);
    if (!open.length) return null;
    const s = open.find(x => inTray(pieceFor(x))) != null ? open.find(x => inTray(pieceFor(x))) : open[0];
    return { s, i: pieceFor(s) };
  }
  // a hint as a change of state (the screen shows it): {st, s, i, tier, back: pieces sent back to the tray} or null
  function hint(p, st, tier) {
    const tg = hintTarget(p, st);
    if (!tg) return null;
    const n = JSON.parse(JSON.stringify(st)), { s, i } = tg, sp = p.pcs[s], t = KIND[i], e = n.pc[i], back = [];
    n.h = s;
    if (tier == 2) {
      if (e.length == 2) n.pc[i] = [sp[0], sp[1]];
      else { const [x, y] = about(t, e[0], e[1], e[2], e[3], sp[0], sp[1]); n.pc[i] = [sp[0], sp[1], x, y]; }
    } else if (tier >= 3) {
      n.pc[i] = [sp[0], sp[1], num(sp[2]), num(sp[3])];
      n.h = -1;
      const slot = solPoly(p, s);
      for (const j of movable(p)) {
        if (j == i || n.pc[j].length != 4) continue;
        if (shared(slot, poly(KIND[j], n.pc[j][0], n.pc[j][1], n.pc[j][2], n.pc[j][3])) > EPS_A) { n.pc[j] = [n.pc[j][0], n.pc[j][1]]; back.push(j); }
      }
    }
    return { st: n, s, i, tier, back };
  }
  // the moves that win (tests and the smoke bot): every piece to its own slot, [i, k, f, x, y]
  const solve = p => movable(p).map(i => { const s = p.pcs[i]; return [i, s[0], s[1], num(s[2]), num(s[3])]; });

  return { H, KIND, SHAPE, AREA, COLOUR, PLAN, SAME, EPS_A, nameOf, pair, num, xrot, xflip, xlocal, xverts, xnorm, xmirror, local, poly, mid,
    area, shared, samePoly, outline, bank, pickIndex, make, solPoly, solPolys, movable, fresh, piecePoly, fit, fits, solved, corners, snap,
    about, filled, hintTarget, hint, solve, cur: null };
})();

/* ---------- the screen ---------- */
TG.mount = function (el, p, api) {
  const band = p.b || api.band, K = TG.KIND, mv = TG.movable(p), sol = TG.solPolys(p), timers = new Set();
  const later = (f, ms) => { const t = setTimeout(() => { timers.delete(t); f(); }, ms); timers.add(t); return t; };
  let st = api.loadState();
  if (!TG.fit(p, st)) st = TG.fresh(p);
  let sel = -1, drag = null, done = false, msg = '', undo = [], z = mv.slice(), tip = -1;
  const SVGNS = 'http://www.w3.org/2000/svg';
  const intro = `${p.say} ` + (band == 'A' || band == 'B' ? 'Drag each piece into its outline. Tap a piece, then tap it again to turn it.'
    : band == 'C' ? 'One piece is in already. Drag the others in. Tap a piece, then tap it again to turn it.'
      : 'Use all seven pieces. Drag them in. Tap a piece, then tap it again to turn it.');

  el.innerHTML = `<div class="tg tg-${band}"><div class="tg-say">${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'tg-spk' })}` +
    `<p class="tg-msg" aria-live="polite"></p></div><div class="tg-main"><svg class="tg-svg" role="img" aria-label="Tangram: ${esc(p.name)}"></svg></div>` +
    `<div class="tg-ctl">${UI.btn('Turn', { icon: 'rotate', cls: 'tg-turn' })}${UI.btn('Flip', { icon: 'flip', cls: 'tg-flip' })}` +
    `${UI.btn('Undo', { icon: 'undo', cls: 'tg-undo' })}</div></div>`;
  const root = el.querySelector('.tg'), svg = root.querySelector('.tg-svg'), main = root.querySelector('.tg-main');
  const say_ = root.querySelector('.tg-say'), ctl = root.querySelector('.tg-ctl'), msgEl = root.querySelector('.tg-msg');
  const bTurn = root.querySelector('.tg-turn'), bFlip = root.querySelector('.tg-flip'), bUndo = root.querySelector('.tg-undo');
  const side = document.createElement('div');
  side.className = 'tg-side';
  root.append(side);

  function tell(text, kind, speak) {
    msg = text;
    msgEl.textContent = text;
    msgEl.className = 'tg-msg' + (kind ? ' ' + kind : '');
    if (speak) api.say(text);
  }
  root.querySelector('.tg-spk').onclick = () => { try { say(msg); } catch (e) {} };

  /* ---------- svg layers ---------- */
  const mk = (tag, cls, parent) => { const e = document.createElementNS(SVGNS, tag); if (cls) e.setAttribute('class', cls); if (parent) parent.append(e); return e; };
  const clipId = 'tg-clip-' + Math.floor(Math.random() * 1e9);
  const defs = mk('defs', '', svg), clip = mk('clipPath', '', defs);
  clip.setAttribute('id', clipId);
  const clipPath = mk('path', '', clip);
  const gBoard = mk('rect', 'tg-board', svg), gTray = mk('rect', 'tg-tray', svg);
  const gSil = mk('g', 'tg-sil', svg);
  const silBase = mk('path', 'tg-sb', gSil), silLit = mk('path', 'tg-sl', gSil), silEdge = mk('path', 'tg-se', gSil);
  silLit.setAttribute('clip-path', `url(#${clipId})`);
  const gOl = mk('g', 'tg-ols', svg), hintEl = mk('polygon', 'tg-hl', svg);
  const gPcs = mk('g', 'tg-pcs', svg);
  const PE = [];
  for (let i = 0; i < 7; i++) {
    const g = mk('g', `tg-pc tg-c${i}${p.fix.includes(i) ? ' fixed' : ''}`, gPcs), a = mk('g', 'tg-pa', g);
    g.dataset.i = i;
    g.style.setProperty('--d', i * 60 + 'ms');
    PE.push({ g, sh: mk('polygon', 'tg-sh', a), ld: mk('polygon', 'tg-ld', a), bs: mk('polygon', 'tg-bs', a), hi: mk('path', 'tg-hi', a), rg: mk('polygon', 'tg-rg', a) });
  }

  /* ---------- layout: board (silhouette) and tray; portrait: talk line, svg, buttons; landscape: svg, then a side column ---------- */
  const sp = sol.flat(), minX = Math.min(...sp.map(q => q[0])), maxX = Math.max(...sp.map(q => q[0]));
  const minY = Math.min(...sp.map(q => q[1])), maxY = Math.max(...sp.map(q => q[1])), SW = maxX - minX, SH = maxY - minY;
  let W = 300, Hh = 300, u = 40, ox = 0, oy = 0, board = null, tray = null, ut = 20, cells = {}, lastW = 0, lastH = 0;
  function arrange(land) {
    if (land) { root.append(main, side); side.append(say_, ctl); } else root.append(say_, main, ctl);
    root.classList.toggle('land', land);
  }
  // the tray: the pieces in it, each in a cell the size of its box as it lies now (at least 56 px), packed in rows (shelf packing)
  // at the biggest tray scale that fits, never bigger than the board's, so the pieces grow as the tray empties
  const box = l => { const xs = l.map(q => q[0]), ys = l.map(q => q[1]); return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]; };
  function packTray(s) { // {fits, cells} at tray scale s
    const out = {}, rows = [];
    let row = { w: 0, h: 0, items: [] };
    for (const i of mv) {
      if (st.pc[i].length != 2) continue;
      const b = box(TG.local(K[i], st.pc[i][0], st.pc[i][1])), cw = Math.max(56, Math.ceil((b[2] - b[0]) * s + 14)), ch = Math.max(56, Math.ceil((b[3] - b[1]) * s + 14));
      if (row.items.length && row.w + cw > tray.w - 12) { rows.push(row); row = { w: 0, h: 0, items: [] }; }
      row.items.push([i, cw]);
      row.w += cw;
      row.h = Math.max(row.h, ch);
    }
    rows.push(row);
    const th = rows.reduce((a, r) => a + r.h, 0);
    let y = tray.y + (tray.h - th) / 2;
    for (const r of rows) {
      let x = tray.x + (tray.w - r.w) / 2;
      for (const [i, c] of r.items) { out[i] = { x, y, w: c, h: r.h, cx: x + c / 2, cy: y + r.h / 2 }; x += c; }
      y += r.h;
    }
    return { fits: th <= tray.h - 8 && rows.every(r => r.w <= tray.w - 12 + 1e-6), cells: out };
  }
  function packAll() {
    let lo = 4, hi = Math.max(4, u);
    if (packTray(hi).fits) lo = hi;
    else for (let it = 0; it < 16; it++) { const m = (lo + hi) / 2; if (packTray(m).fits) lo = m; else hi = m; }
    ut = lo;
    cells = packTray(ut).cells;
  }
  function layout() {
    if (!el.isConnected) return;
    const ps = getComputedStyle(el);
    const aw = el.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
    const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
    lastW = el.clientWidth; lastH = el.clientHeight;
    const land = aw > ah * 1.15 && aw >= 640, gap = 10, few = mv.length <= 3;
    arrange(land);
    if (land) { W = Math.floor(aw - side.offsetWidth - 16); Hh = Math.floor(ah); }
    else { W = Math.floor(aw); Hh = Math.floor(ah - say_.offsetHeight - ctl.offsetHeight - 2 * gap); }
    W = Math.max(240, W); Hh = Math.max(240, Hh);
    // the board takes the room the silhouette can use at the full width (or height); the tray gets the rest, but at least a share
    const pad = 14;
    if (land) {
      const need = Math.ceil(SW * (Hh - 2 * pad) / SH + 2 * pad), tw = Math.max(Math.round(W * (few ? 0.26 : 0.34)), W - gap - need);
      board = { x: 0, y: 0, w: W - tw - gap, h: Hh };
      tray = { x: W - tw, y: 0, w: tw, h: Hh };
    } else {
      const need = Math.ceil(SH * (W - 2 * pad) / SW + 2 * pad), th = Math.min(Math.round(Hh * 0.5), Math.max(Math.round(Hh * (few ? 0.26 : 0.32)), Hh - gap - need));
      board = { x: 0, y: 0, w: W, h: Hh - th - gap };
      tray = { x: 0, y: Hh - th, w: W, h: th };
    }
    u = Math.min((board.w - 2 * pad) / SW, (board.h - 2 * pad) / SH, 96);
    ox = board.x + (board.w - SW * u) / 2 - minX * u;
    oy = board.y + (board.h - SH * u) / 2 - minY * u;
    svg.setAttribute('width', W);
    svg.setAttribute('height', Hh);
    svg.setAttribute('viewBox', `0 0 ${W} ${Hh}`);
    const rr = (e, r) => { e.setAttribute('x', r.x + 2); e.setAttribute('y', r.y + 2); e.setAttribute('width', r.w - 4); e.setAttribute('height', r.h - 4); e.setAttribute('rx', 20); };
    rr(gBoard, board);
    rr(gTray, tray);
    // the silhouette: one outline path; a lighter copy moved toward the bottom right, clipped to the shape, leaves a shadow along
    // the top-left inside edge
    const d = TG.outline(sol).map(l => 'M' + l.map(q => px(q).map(v => v.toFixed(1)).join(' ')).join('L') + 'Z').join('');
    silBase.setAttribute('d', d);
    silEdge.setAttribute('d', d);
    clipPath.setAttribute('d', d);
    silLit.setAttribute('d', d);
    silLit.setAttribute('transform', `translate(${Math.max(2, u * 0.06).toFixed(1)} ${Math.max(2, u * 0.08).toFixed(1)})`);
    gOl.innerHTML = '';
    if (p.ol) for (const i of mv) { const e = mk('polygon', 'tg-ol', gOl); e.setAttribute('points', pts(sol[i].map(px))); }
    draw();
  }
  const px = q => [ox + q[0] * u, oy + q[1] * u];
  const unit = (x, y) => [(x - ox) / u, (y - oy) / u];
  const pts = a => a.map(q => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' ');

  /* ---------- drawing ---------- */
  // the piece's corners in px: on the board, in its tray cell, or lifted under the finger (scale u, middle at the point)
  function shapePx(i) {
    const e = p.fix.includes(i) ? null : st.pc[i];
    if (drag && drag.i == i && drag.moved) {
      const l = TG.local(K[i], e[0], e[1]), c = TG.mid(l);
      return l.map(q => [drag.x + drag.gx + (q[0] - c[0]) * u, drag.y + drag.gy + (q[1] - c[1]) * u]);
    }
    const pl = TG.piecePoly(p, st, i);
    if (pl) return pl.map(px);
    const l = TG.local(K[i], e[0], e[1]), b = box(l), cell = cells[i], c = [(b[0] + b[2]) / 2, (b[1] + b[3]) / 2];
    return l.map(q => [cell.cx + (q[0] - c[0]) * ut, cell.cy + (q[1] - c[1]) * ut]);
  }
  // the light edges: the sides whose outside faces up and to the left, drawn a little inside the piece
  function litPath(a) {
    const c = TG.mid(a), cw = a.reduce((s, q, i) => { const r = a[(i + 1) % a.length]; return s + q[0] * r[1] - r[0] * q[1]; }, 0) > 0;
    let d = '';
    for (let i = 0; i < a.length; i++) {
      const q = a[i], r = a[(i + 1) % a.length], ex = r[0] - q[0], ey = r[1] - q[1], L = Math.hypot(ex, ey);
      let nx = ey / L, ny = -ex / L; // outward normal for a clockwise (on screen) polygon
      if (!cw) { nx = -nx; ny = -ny; }
      if (nx + ny > -0.2) continue;
      const ins = 3.2, sh = (t, s) => [t[0] - nx * ins + (c[0] - t[0]) * s, t[1] - ny * ins + (c[1] - t[1]) * s];
      const A = sh(q, 0.12), B = sh(r, 0.12);
      d += `M${A[0].toFixed(1)} ${A[1].toFixed(1)}L${B[0].toFixed(1)} ${B[1].toFixed(1)}`;
    }
    return d;
  }
  function drawPiece(i, bad) {
    const E = PE[i], a = shapePx(i), lifted = drag && drag.i == i && drag.moved, inTray = !p.fix.includes(i) && st.pc[i].length == 2 && !lifted;
    const lw = Math.max(2, Math.min(5, (inTray ? ut : u) * 0.07));
    const P = pts(a);
    E.bs.setAttribute('points', P);
    E.rg.setAttribute('points', P);
    E.ld.setAttribute('points', pts(a.map(q => [q[0], q[1] + lw])));
    E.sh.setAttribute('points', pts(a.map(q => [q[0] + 7, q[1] + 10])));
    E.hi.setAttribute('d', litPath(a));
    E.g.classList.toggle('lift', !!lifted);
    E.g.classList.toggle('sel', i == sel);
    E.g.classList.toggle('bad', !!bad);
    E.g.classList.toggle('tip', i == tip);
    E.g.classList.toggle('intray', inTray);
  }
  function draw() {
    if (!board) return;
    packAll();
    const busy = drag && drag.moved;
    for (let i = 0; i < 7; i++) {
      let bad = false;
      if (!busy && !done && !p.fix.includes(i)) { const pl = TG.piecePoly(p, st, i); bad = !!pl && !TG.fits(p, st, i, pl); }
      drawPiece(i, bad);
    }
    // stacking: pieces placed for you at the bottom, then the order the child moved them, the piece in the hand on top
    for (const i of p.fix) gPcs.append(PE[i].g);
    for (const i of z) gPcs.append(PE[i].g);
    if (sel >= 0 && !p.fix.includes(sel)) gPcs.append(PE[sel].g);
    if (drag && drag.moved) gPcs.append(PE[drag.i].g);
    if (st.h >= 0 && !done) { hintEl.setAttribute('points', pts(sol[st.h].map(px))); hintEl.style.display = ''; }
    else hintEl.style.display = 'none';
    const s = sel >= 0 ? sel : -1;
    bTurn.disabled = s < 0 || done;
    bFlip.hidden = !(s >= 0 && K[s] == 'P');
    bUndo.disabled = !undo.length || done;
  }

  /* ---------- moves ---------- */
  const store = () => api.saveState(st);
  const remember = () => { undo.push(JSON.stringify(st)); if (undo.length > 40) undo.shift(); };
  const toTop = i => { z = z.filter(j => j != i); z.push(i); };
  const tolU = () => Math.min(30, Math.max(16, 0.45 * u)) / u;
  function after(i, res) {
    tip = -1;
    if (TG.solved(p, st)) return finish();
    if (res && st.pc[i].length == 4) {
      if (!res.ok) tell(`The ${TG.COLOUR[i]} ${TG.nameOf(K[i], band)} sticks out or lies on another piece. Move it or turn it.`, 'try');
      else if (res.snapped) { api.sfx.pop(2); tell(msgAfter(), ''); }
      else tell('Drop it closer to a corner and it will click into place.', '');
    }
  }
  function msgAfter() {
    const left = mv.filter(j => st.pc[j].length == 2).length;
    return left ? `Good! ${left} more ${left == 1 ? 'piece' : 'pieces'} to go.` : 'All the pieces are out. Fix the ones that do not fit.';
  }
  function place(i, k, f, x, y) {
    const r = TG.snap(p, st, i, k, f, x, y, tolU());
    st.pc[i] = [k, f, r.x, r.y];
    if (st.h >= 0 && TG.filled(p, st).by[st.h] >= 0) st.h = -1;
    toTop(i);
    return r;
  }
  function turn(i, flip) {
    if (done || i < 0 || p.fix.includes(i)) return;
    if (flip && K[i] != 'P') return;
    remember();
    const e = st.pc[i], k2 = flip ? e[0] : (e[0] + 1) % 8, f2 = flip ? 1 - e[1] : e[1];
    api.sfx.click();
    let r = null;
    if (e.length == 2) st.pc[i] = [k2, f2];
    else { const [x, y] = TG.about(K[i], e[0], e[1], e[2], e[3], k2, f2); r = place(i, k2, f2, x, y); }
    sel = i;
    if (!r) tell(flip ? 'Flipped over.' : 'Turned. Tap again to keep turning.', '');
    after(i, r);
    store();
    draw();
  }
  function moveTo(i, cx, cy) { // the piece's middle to (cx, cy) in px
    if (done) return;
    remember();
    const e = st.pc[i], l = TG.local(K[i], e[0], e[1]), c = TG.mid(l);
    const qx = Math.max(board.x + 4, Math.min(board.x + board.w - 4, cx)), qy = Math.max(board.y + 4, Math.min(board.y + board.h - 4, cy));
    const [ux, uy] = unit(qx, qy);
    const r = place(i, e[0], e[1], ux - c[0], uy - c[1]);
    after(i, r);
    store();
  }
  function toTray(i) {
    remember();
    st.pc[i] = [st.pc[i][0], st.pc[i][1]];
    tell('Back in the tray.', '');
    store();
  }
  function finish() {
    done = true;
    sel = -1;
    st.h = -1;
    root.classList.add('won');
    api.sfx.magic();
    tell(`You made the ${p.name.toLowerCase()}!`, 'good', true);
    store();
    draw();
    api.win({ mistakes: 0 });
  }

  /* ---------- pointer input ---------- */
  function hit(x, y) {
    const order = z.slice().reverse();
    if (sel >= 0 && !p.fix.includes(sel)) order.unshift(sel);
    for (const i of order) { // board pieces first, the top one first; a margin around each makes small pieces easy to catch
      const pl = TG.piecePoly(p, st, i);
      if (!pl) continue;
      const a = pl.map(px);
      if (inside(a, x, y) || edgeDist(a, x, y) <= 12) return i;
    }
    for (const i of mv) { const c = cells[i]; if (c && st.pc[i].length == 2 && x >= c.x && x <= c.x + c.w && y >= c.y && y <= c.y + c.h) return i; }
    return -1;
  }
  function inside(a, x, y) {
    let r = false;
    for (let i = 0, j = a.length - 1; i < a.length; j = i++) {
      if ((a[i][1] > y) != (a[j][1] > y) && x < (a[j][0] - a[i][0]) * (y - a[i][1]) / (a[j][1] - a[i][1]) + a[i][0]) r = !r;
    }
    return r;
  }
  function edgeDist(a, x, y) {
    let m = 1e9;
    for (let i = 0; i < a.length; i++) {
      const q = a[i], r = a[(i + 1) % a.length], dx = r[0] - q[0], dy = r[1] - q[1];
      const t = Math.max(0, Math.min(1, ((x - q[0]) * dx + (y - q[1]) * dy) / (dx * dx + dy * dy)));
      m = Math.min(m, Math.hypot(x - q[0] - t * dx, y - q[1] - t * dy));
    }
    return m;
  }
  const pos = e => { const r = svg.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const inRect = (r, x, y) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
  svg.addEventListener('pointerdown', e => {
    if (done || drag) return;
    e.preventDefault();
    try { svg.setPointerCapture(e.pointerId); } catch (er) {}
    const [x, y] = pos(e), i = hit(x, y);
    let gx = 0, gy = 0;
    if (i >= 0) {
      const pl = TG.piecePoly(p, st, i);
      if (pl) { const c = px(TG.mid(pl)); gx = c[0] - x; gy = c[1] - y; }
    }
    drag = { id: e.pointerId, i, sx: x, sy: y, x, y, gx, gy, moved: false };
  });
  svg.addEventListener('pointermove', e => {
    if (!drag || e.pointerId != drag.id) return;
    const [x, y] = pos(e);
    drag.x = x; drag.y = y;
    if (!drag.moved && Math.hypot(x - drag.sx, y - drag.sy) > 7 && drag.i >= 0) {
      drag.moved = true;
      sel = drag.i;
      tip = -1;
      api.sfx.click();
    }
    if (drag.moved) { drawPiece(drag.i, false); gPcs.append(PE[drag.i].g); }
  });
  const up = e => {
    if (!drag || e.pointerId != drag.id) return;
    const d = drag, [x, y] = pos(e);
    drag = null;
    if (e.type == 'pointercancel') { draw(); return; }
    if (d.moved) {
      if (inRect(tray, x, y) && !inRect(board, x, y)) toTray(d.i);
      else moveTo(d.i, x + d.gx, y + d.gy);
    } else if (d.i >= 0) {
      if (sel == d.i) return turn(d.i, false);
      sel = d.i;
      api.sfx.click();
      tell(`The ${TG.COLOUR[d.i]} ${TG.nameOf(K[d.i], band)}. Drag it, tap it again to turn it, or tap where it should go.`, '');
    } else if (sel >= 0 && inRect(board, x, y)) moveTo(sel, x, y);
    else sel = -1;
    draw();
  };
  svg.addEventListener('pointerup', up);
  svg.addEventListener('pointercancel', up);
  bTurn.onclick = () => turn(sel, false);
  bFlip.onclick = () => turn(sel, true);
  bUndo.onclick = () => {
    if (!undo.length || done) return;
    st = JSON.parse(undo.pop());
    api.sfx.del();
    tell('Undone.', '');
    store();
    draw();
  };
  const keyd = e => {
    if (!svg.isConnected || $('.ovl') || done || /^(INPUT|TEXTAREA)$/.test((e.target && e.target.tagName) || '')) return;
    const k = (e.key || '').toLowerCase();
    if (k == 'r') turn(sel, false);
    else if (k == 'f') turn(sel, true);
    else if (k == 'u') bUndo.onclick();
  };
  document.addEventListener('keydown', keyd);
  let rz = 0;
  const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { if (el.clientWidth != lastW || el.clientHeight != lastH) layout(); }, 120); };
  window.addEventListener('resize', onResize);

  /* ---------- hints ---------- */
  function hintNow(tier) {
    if (done) return false;
    const h = TG.hint(p, st, tier);
    if (!h) return false;
    remember();
    st = h.st;
    const nm = `${TG.COLOUR[h.i]} ${TG.nameOf(K[h.i], band)}`;
    if (tier == 1) {
      sel = h.i; tip = h.i;
      tell(`See the yellow outline? The ${nm} goes there.`, 'hint', true);
    } else if (tier == 2) {
      sel = h.i; tip = h.i;
      tell(`The ${nm} is turned the right way now. Drag it into the yellow outline.`, 'hint', true);
    } else {
      sel = -1; tip = -1;
      toTop(h.i);
      tell(`Here is where the ${nm} goes.` + (h.back.length ? ' A piece in its way went back to the tray.' : ''), 'hint', true);
      if (TG.solved(p, st)) { store(); finish(); return true; }
    }
    store();
    draw();
    return true;
  }

  /* ---------- start ---------- */
  const fresh_ = mv.every(i => st.pc[i].length == 2);
  tell(fresh_ ? intro : 'Keep going! Drag the pieces into the shape.', '', fresh_ && band == 'A');
  layout();
  later(layout, 60); // the stage can still be settling (fonts, the frame's top bar): look again once
  const inst = {
    hint: hintNow,
    destroy() {
      timers.forEach(clearTimeout);
      timers.clear();
      clearTimeout(rz);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('keydown', keyd);
      if (TG.cur && TG.cur.inst === inst) TG.cur = null;
    },
  };
  // for the smoke bot and the screenshots: where things are on the page
  TG.cur = {
    inst, p, st: () => st, sel: () => sel, u: () => u, ut: () => ut,
    page(q) { const r = svg.getBoundingClientRect(), a = px(q); return { x: r.left + a[0], y: r.top + a[1] }; },
    // the middle of piece i on the page: its tray cell, or its middle on the board
    at(i) {
      const r = svg.getBoundingClientRect(), pl = TG.piecePoly(p, st, i);
      if (pl) { const a = px(TG.mid(pl)); return { x: r.left + a[0], y: r.top + a[1] }; }
      return { x: r.left + cells[i].cx, y: r.top + cells[i].cy };
    },
    cell: i => cells[i] && { w: cells[i].w, h: cells[i].h },
    box: i => { const a = shapePx(i), xs = a.map(q => q[0]), ys = a.map(q => q[1]); return { w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) }; },
  };
  return inst;
};

BT.reg({
  id: 'tangram', name: 'Tangram', icon: 'tangram', bands: 'ABCD',
  rules: 'Fill the shape with the pieces. Drag a piece in; tap a piece twice to turn it.',
  make: (band, level, rnd) => TG.make(band, level, rnd),
  mount: (el, p, api) => TG.mount(el, p, api),
  solve: p => TG.solve(p),
});
