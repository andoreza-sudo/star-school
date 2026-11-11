/* ---------- Brain Teasers: Shape Fit (P3-12; BRAIN_TEASERS.md 5.7, 7, 8) ----------
   Fill a grid region with polyomino pieces (2 to 5 squares each). Puzzles are made at run time by construction: a region is chosen
   (a rectangle on odd levels when the size allows one, otherwise a blob without holes), then cut into connected pieces of the band's
   sizes. The cut is the stored solution, so every puzzle is solvable; any tiling wins (SF.solved checks cells, not pieces).

   BANDS AND LEVELS (section 7, "size: smallest to largest"; SF.PLAN). The region grows with the level inside a band:
     A (PK-K)  2 pieces (levels 1-6), then 3; pieces of 2-4 squares; 4 to 11 squares in all; every piece already lies the right way
               (no turning) and the outline of every piece is drawn in the region.
     B (1-2)   3 pieces, then 4; 3-4 squares each; 9 to 16 squares; pieces come turned, so turning is needed; outlines on levels 1-4.
     C (3-4)   5 pieces, then 6; 3-5 squares; 16 to 28 squares; turning; no outlines.
     D (5-6)   7 pieces, then 8; 3-5 squares; 24 to 36 squares; turning and flipping (some pieces come mirrored); no outlines.
   Puzzle (JSON): {b band, w, h (the grid), reg: [[x, y] region squares], pcs: [{s: [[x, y]] the piece's squares as it lies in the
   solution (moved to 0,0), at: [x, y] where it goes, t: [r, f] how it starts in the tray}], ol: 1 when outlines show, turn, flip}.
   A piece's squares for [r, f]: mirrored left-right when f = 1, then turned r x 90 degrees clockwise, then moved back to 0,0 (SF.xf).

   STATE (api.saveState after every move; SF.fit refuses one that does not belong to the puzzle): {pc: per piece [r, f] (tray) or
   [r, f, x, y] (on the board, whole squares), h: the slot (solution piece) a hint is showing, or -1}.
   SOLVED (SF.solved): every piece on the board, every square of every piece inside the region and no square covered twice. The pieces
   add up to the region, so that is an exact cover, whichever way the child found it.

   INPUT (one svg, touch-action none, pointer events): drag a piece from the tray or the board; on drop it snaps to the nearest whole
   square, preferring a place where it fits (SF.snap). A drop on the tray puts it back. Tap a piece to pick it; tap it again to turn it
   90 degrees (bands B-D); Turn, Flip (band D) and Undo buttons; keys R, F, U. With a piece picked, a tap on the board moves it there
   (tap-then-tap, section 8). A piece that sticks out or lies on another gets an amber dashed ring (never red). No mistakes are counted.
   HINTS (5.7): 1) the outline of one slot glows yellow and its piece is picked; 2) that piece turns (and flips) the slot's way;
   3) it goes in, and a piece lying on that slot goes back to the tray. Tiers 1 and 2 never move a piece.
   The geometry helpers TG.outline (one outline path for a set of squares) and the tangram's colours and look are shared. */
const SF = (() => {
  const PLAN = {
    A: lv => ({ n: lv <= 6 ? 2 : 3, lo: 2, hi: 4, size: 4 + Math.round((lv - 1) * 7 / 11), turn: 0, flip: 0, ol: 1 }),
    B: lv => ({ n: lv <= 6 ? 3 : 4, lo: 3, hi: 4, size: 9 + Math.round((lv - 1) * 7 / 11), turn: 1, flip: 0, ol: lv <= 4 ? 1 : 0 }),
    C: lv => ({ n: lv <= 6 ? 5 : 6, lo: 3, hi: 5, size: 16 + Math.round((lv - 1) * 12 / 11), turn: 1, flip: 0, ol: 0 }),
    D: lv => ({ n: lv <= 6 ? 7 : 8, lo: 3, hi: 5, size: 24 + Math.round((lv - 1) * 12 / 11), turn: 1, flip: 1, ol: 0 }),
  };
  const MAXW = 7; // the grid is at most 7 squares wide and 7 high (44 px squares or more on a phone)
  const COLOUR = ['red', 'blue', 'yellow', 'green', 'pink', 'orange', 'light blue', 'purple'];
  const NB = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const K = (x, y) => x + ',' + y;

  /* ---------- squares ---------- */
  const norm = cs => {
    const mx = Math.min(...cs.map(c => c[0])), my = Math.min(...cs.map(c => c[1]));
    return cs.map(([x, y]) => [x - mx, y - my]).sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  };
  // the squares of shape s turned r x 90 degrees clockwise (y down), mirrored first when f = 1, moved back to 0,0
  function xf(s, r, f) {
    let o = s.map(([x, y]) => [f ? -x : x, y]);
    for (let i = 0; i < r; i++) o = o.map(([x, y]) => [-y, x]);
    return norm(o);
  }
  const key = cs => norm(cs).map(c => c.join(',')).join(';');
  const cellsOf = (p, i, e) => xf(p.pcs[i].s, e[0], e[1]).map(([x, y]) => [x + e[2], y + e[3]]);
  const slotCells = (p, s) => p.pcs[s].s.map(([x, y]) => [x + p.pcs[s].at[0], y + p.pcs[s].at[1]]);

  /* ---------- making a puzzle ---------- */
  // a connected blob of n squares inside MAXW x MAXW with no holes, grown from the middle, preferring squares with more neighbours
  function blob(n, rnd) {
    for (let at = 0; at < 60; at++) {
      const c = Math.floor(MAXW / 2), got = new Set([K(c, c)]), list = [[c, c]];
      while (list.length < n) {
        const fr = [];
        for (const [x, y] of list) for (const [dx, dy] of NB) {
          const a = x + dx, b = y + dy;
          if (a < 0 || b < 0 || a >= MAXW || b >= MAXW || got.has(K(a, b)) || fr.some(q => q[0] == a && q[1] == b)) continue;
          const w = NB.filter(([ex, ey]) => got.has(K(a + ex, b + ey))).length;
          fr.push([a, b, w * w + rnd() * 2]);
        }
        fr.sort((p, q) => q[2] - p[2]);
        const pick = fr[Math.floor(rnd() * Math.min(3, fr.length))];
        got.add(K(pick[0], pick[1]));
        list.push([pick[0], pick[1]]);
      }
      if (!holes(list)) return norm(list);
    }
    return null;
  }
  // does a set of squares enclose a hole? (flood the outside of its box, one square wider)
  function holes(cs) {
    const set = new Set(cs.map(c => K(...c))), xs = cs.map(c => c[0]), ys = cs.map(c => c[1]);
    const x0 = Math.min(...xs) - 1, x1 = Math.max(...xs) + 1, y0 = Math.min(...ys) - 1, y1 = Math.max(...ys) + 1;
    const seen = new Set([K(x0, y0)]), st = [[x0, y0]];
    while (st.length) {
      const [x, y] = st.pop();
      for (const [dx, dy] of NB) {
        const a = x + dx, b = y + dy;
        if (a < x0 || b < y0 || a > x1 || b > y1 || seen.has(K(a, b)) || set.has(K(a, b))) continue;
        seen.add(K(a, b));
        st.push([a, b]);
      }
    }
    return seen.size + set.size < (x1 - x0 + 1) * (y1 - y0 + 1);
  }
  // the region: a rectangle (odd levels, when one at most MAXW wide with sides 2+ and a ratio of 3 or less fits), else a blob
  function region(n, level, rnd) {
    if (level % 2) {
      const opt = [];
      for (let w = 2; w <= MAXW; w++) if (n % w == 0) { const h = n / w; if (h >= 2 && h <= MAXW && Math.max(w, h) <= 3 * Math.min(w, h)) opt.push([w, h]); }
      if (opt.length) {
        opt.sort((a, b) => Math.abs(a[0] - a[1]) - Math.abs(b[0] - b[1]));
        const [w, h] = opt[Math.min(opt.length - 1, Math.floor(rnd() * Math.min(2, opt.length)))];
        const out = [];
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) out.push([x, y]);
        return out;
      }
    }
    return blob(n, rnd);
  }
  const connected = cs => {
    if (!cs.length) return true;
    const set = new Set(cs.map(c => K(...c))), seen = new Set([K(...cs[0])]), st = [cs[0]];
    while (st.length) {
      const [x, y] = st.pop();
      for (const [dx, dy] of NB) { const k = K(x + dx, y + dy); if (set.has(k) && !seen.has(k)) { seen.add(k); st.push([x + dx, y + dy]); } }
    }
    return seen.size == set.size;
  };
  // cut the region into n connected pieces with sizes lo..hi (adding up to the region); the remaining squares stay connected
  function cut(reg, n, lo, hi, rnd) {
    const T = reg.length;
    for (let at = 0; at < 300; at++) {
      const sizes = new Array(n).fill(lo);
      let left = T - n * lo;
      while (left > 0) { const i = Math.floor(rnd() * n); if (sizes[i] < hi) { sizes[i]++; left--; } }
      const free = new Set(reg.map(c => K(...c))), pieces = [];
      const freeN = (x, y) => NB.filter(([dx, dy]) => free.has(K(x + dx, y + dy))).length;
      let ok = true;
      for (let i = 0; i < n && ok; i++) {
        if (i == n - 1) { const rest = [...free].map(k => k.split(',').map(Number)); if (rest.length != sizes[i]) ok = false; else pieces.push(rest); break; }
        const cand = [...free].map(k => k.split(',').map(Number)).map(([x, y]) => [x, y, freeN(x, y) + rnd()]);
        cand.sort((a, b) => a[2] - b[2]);
        const piece = [[cand[0][0], cand[0][1]]];
        free.delete(K(cand[0][0], cand[0][1]));
        while (piece.length < sizes[i]) {
          const fr = [];
          for (const [x, y] of piece) for (const [dx, dy] of NB) {
            const a = x + dx, b = y + dy;
            if (free.has(K(a, b)) && !fr.some(q => q[0] == a && q[1] == b)) fr.push([a, b, freeN(a, b) + rnd() * 1.5]);
          }
          if (!fr.length) { ok = false; break; }
          fr.sort((a, b) => a[2] - b[2]);
          const q = fr[0];
          piece.push([q[0], q[1]]);
          free.delete(K(q[0], q[1]));
        }
        if (ok && !connected([...free].map(k => k.split(',').map(Number)))) ok = false;
        if (ok) pieces.push(piece);
      }
      if (ok && pieces.length == n) return pieces;
    }
    return null;
  }
  // the turns a shape can take that look different (a square piece has one, a bar two, ...)
  function forms(s, flip) {
    const seen = new Set(), out = [];
    for (let f = 0; f < (flip ? 2 : 1); f++) for (let r = 0; r < 4; r++) { const k = key(xf(s, r, f)); if (!seen.has(k)) { seen.add(k); out.push([r, f]); } }
    return out;
  }
  function make(band, level, rnd) {
    const plan = PLAN[band](level);
    for (let at = 0; at < 40; at++) {
      const reg = region(plan.size, level + at, rnd);
      if (!reg) continue;
      const pieces = cut(reg, plan.n, plan.lo, plan.hi, rnd);
      if (!pieces) continue;
      const pcs = pieces.map(cs => {
        const s = norm(cs), at = [Math.min(...cs.map(c => c[0])), Math.min(...cs.map(c => c[1]))];
        let t = [0, 0];
        if (plan.turn) {
          // start turned (and in band D sometimes mirrored) so that it does not already lie the right way, when the shape allows it
          const f = plan.flip && rnd() < 0.5 ? 1 : 0;
          const want = key(s), opts = [0, 1, 2, 3].filter(r => key(xf(s, r, f)) != want);
          t = [opts.length ? opts[Math.floor(rnd() * opts.length)] : Math.floor(rnd() * 4), f];
        }
        return { s, at, t };
      });
      const xs = reg.map(c => c[0]), ys = reg.map(c => c[1]);
      return { b: band, lv: level, w: Math.max(...xs) + 1, h: Math.max(...ys) + 1, reg, pcs, ol: plan.ol, turn: plan.turn, flip: plan.flip };
    }
    throw new Error('shapefit: no puzzle');
  }

  /* ---------- state, checks, snapping ---------- */
  const fresh = p => ({ pc: p.pcs.map(q => [q.t[0], q.t[1]]), h: -1 });
  function fit(p, st) {
    if (!st || typeof st != 'object' || Array.isArray(st) || !Array.isArray(st.pc) || st.pc.length != p.pcs.length) return false;
    for (let i = 0; i < p.pcs.length; i++) {
      const e = st.pc[i], t = p.pcs[i].t;
      if (!Array.isArray(e) || (e.length != 2 && e.length != 4)) return false;
      if (!Number.isInteger(e[0]) || e[0] < 0 || e[0] > 3 || (e[1] !== 0 && e[1] !== 1)) return false;
      if (!p.turn && e[0] != t[0]) return false;
      if (!p.flip && e[1] != t[1]) return false;
      if (e.length == 4 && !(Number.isInteger(e[2]) && Number.isInteger(e[3]) && e[2] >= -5 && e[3] >= -5 && e[2] <= p.w + 5 && e[3] <= p.h + 5)) return false;
    }
    if (!Number.isInteger(st.h) || st.h < -1 || st.h >= p.pcs.length) return false;
    return true;
  }
  const regSet = p => new Set(p.reg.map(c => K(...c)));
  // squares of the other pieces on the board
  function taken(p, st, skip) {
    const out = new Map();
    st.pc.forEach((e, j) => { if (j != skip && e.length == 4) for (const c of cellsOf(p, j, e)) out.set(K(...c), j); });
    return out;
  }
  // does piece i lie at e inside the region, on no other piece?
  function fits(p, st, i, e) {
    const R = regSet(p), T = taken(p, st, i);
    return cellsOf(p, i, e).every(c => R.has(K(...c)) && !T.has(K(...c)));
  }
  function solved(p, st) {
    if (!st.pc.every(e => e.length == 4)) return false;
    const R = regSet(p), seen = new Set();
    for (let i = 0; i < p.pcs.length; i++) for (const c of cellsOf(p, i, st.pc[i])) {
      const k = K(...c);
      if (!R.has(k) || seen.has(k)) return false;
      seen.add(k);
    }
    return seen.size == R.size;
  }
  // where piece i (turn r, flip f) lands when dropped with its corner at (x, y) in squares (not whole numbers):
  // the whole-square places within `tol` squares, a place where it fits first, then the nearest; {x, y, ok}
  function snap(p, st, i, r, f, x, y, tol = 0.8) {
    let best = null;
    for (let a = Math.floor(x - tol); a <= Math.ceil(x + tol); a++) for (let b = Math.floor(y - tol); b <= Math.ceil(y + tol); b++) {
      const d = Math.hypot(a - x, b - y);
      if (d > tol + 1e-9) continue;
      const ok = fits(p, st, i, [r, f, a, b]), s = [ok ? 1 : 0, -d];
      if (!best || s[0] > best.s[0] || (s[0] == best.s[0] && s[1] > best.s[1])) best = { s, x: a, y: b, ok };
    }
    if (!best) { const a = Math.round(x), b = Math.round(y); return { x: a, y: b, ok: fits(p, st, i, [r, f, a, b]) }; }
    return { x: best.x, y: best.y, ok: best.ok };
  }
  // the middle of a piece in squares, and the corner that keeps a turned or flipped piece's middle where it was
  const midOf = cs => [cs.reduce((s, c) => s + c[0] + 0.5, 0) / cs.length, cs.reduce((s, c) => s + c[1] + 0.5, 0) / cs.length];
  function about(p, i, e, r2, f2) {
    const m = midOf(cellsOf(p, i, e)), m2 = midOf(xf(p.pcs[i].s, r2, f2));
    return [Math.round(m[0] - m2[0]), Math.round(m[1] - m2[1])];
  }

  /* ---------- hints ---------- */
  // which slots are filled exactly by some piece, and by which
  function filled(p, st) {
    const by = new Array(p.pcs.length).fill(-1), used = new Set();
    for (let s = 0; s < p.pcs.length; s++) {
      const want = slotCells(p, s).map(c => K(...c)).sort().join('|');
      for (let j = 0; j < p.pcs.length; j++) {
        if (used.has(j) || st.pc[j].length != 4) continue;
        if (cellsOf(p, j, st.pc[j]).map(c => K(...c)).sort().join('|') == want) { by[s] = j; used.add(j); break; }
      }
    }
    return { by, used };
  }
  // the turn [r, f] that makes piece j lie like slot s, keeping what the band cannot change; or null
  function orient(p, st, j, s) {
    const e = st.pc[j], want = key(p.pcs[s].s);
    for (let f = 0; f < 2; f++) for (let r = 0; r < 4; r++) {
      if (!p.turn && r != e[0]) continue;
      if (!p.flip && f != e[1]) continue;
      if (key(xf(p.pcs[j].s, r, f)) == want) return [r, f];
    }
    return null;
  }
  function hintTarget(p, st) {
    const { by, used } = filled(p, st);
    const inTray = j => st.pc[j].length == 2;
    const pieceFor = s => {
      const c = p.pcs.map((q, j) => j).filter(j => !used.has(j) && orient(p, st, j, s));
      const pref = [s].concat(c.filter(inTray), c);
      return pref.find(j => c.includes(j)) != null ? pref.find(j => c.includes(j)) : -1;
    };
    if (st.h >= 0 && by[st.h] < 0 && pieceFor(st.h) >= 0) return { s: st.h, i: pieceFor(st.h) };
    const order = p.pcs.map((q, s) => s).sort((a, b) => p.pcs[b].s.length - p.pcs[a].s.length || a - b);
    const open = order.filter(s => by[s] < 0 && pieceFor(s) >= 0);
    if (!open.length) return null;
    const s = open.find(x => inTray(pieceFor(x))) != null ? open.find(x => inTray(pieceFor(x))) : open[0];
    return { s, i: pieceFor(s) };
  }
  function hint(p, st, tier) {
    const tg = hintTarget(p, st);
    if (!tg) return null;
    const n = JSON.parse(JSON.stringify(st)), { s, i } = tg, e = n.pc[i], o = orient(p, st, i, s), back = [];
    n.h = s;
    if (tier == 2) {
      if (e.length == 2) n.pc[i] = [o[0], o[1]];
      else { const [x, y] = about(p, i, e, o[0], o[1]); n.pc[i] = [o[0], o[1], x, y]; }
    } else if (tier >= 3) {
      const sc = slotCells(p, s), at = [Math.min(...sc.map(c => c[0])), Math.min(...sc.map(c => c[1]))];
      n.pc[i] = [o[0], o[1], at[0], at[1]];
      n.h = -1;
      const want = new Set(sc.map(c => K(...c)));
      n.pc.forEach((q, j) => {
        if (j == i || q.length != 4) return;
        if (cellsOf(p, j, q).some(c => want.has(K(...c)))) { n.pc[j] = [q[0], q[1]]; back.push(j); }
      });
    }
    return { st: n, s, i, tier, back };
  }
  // the moves that win (tests and the smoke bot): every piece to its own slot, the way it lies there: [i, r, f, x, y]
  const solve = p => p.pcs.map((q, i) => [i, 0, 0, q.at[0], q.at[1]]);

  return { PLAN, MAXW, COLOUR, norm, xf, key, cellsOf, slotCells, blob, holes, region, connected, cut, forms, make, fresh, fit, fits, solved,
    snap, midOf, about, filled, orient, hintTarget, hint, solve, cur: null };
})();

/* ---------- the screen ---------- */
SF.mount = function (el, p, api) {
  const band = p.b || api.band, n = p.pcs.length, all = p.pcs.map((q, i) => i), timers = new Set();
  const later = (f, ms) => { const t = setTimeout(() => { timers.delete(t); f(); }, ms); timers.add(t); return t; };
  let st = api.loadState();
  if (!SF.fit(p, st)) st = SF.fresh(p);
  let sel = -1, drag = null, done = false, msg = '', undo = [], z = all.slice(), tip = -1;
  const SVGNS = 'http://www.w3.org/2000/svg';
  const intro = band == 'A' ? 'Drag the pieces into the shape. Each one has its own place.'
    : `Fill the shape with all ${n} pieces. Drag them in. Tap a piece, then tap it again to turn it.` + (p.flip ? ' Flip turns it over.' : '');

  el.innerHTML = `<div class="sf tg sf-${band}"><div class="tg-say">${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'tg-spk' })}` +
    `<p class="tg-msg" aria-live="polite"></p></div><div class="tg-main"><svg class="tg-svg sf-svg" role="img" aria-label="Shape Fit: fill the shape"></svg></div>` +
    `<div class="tg-ctl">${UI.btn('Turn', { icon: 'rotate', cls: 'tg-turn' })}${UI.btn('Flip', { icon: 'flip', cls: 'tg-flip' })}` +
    `${UI.btn('Undo', { icon: 'undo', cls: 'tg-undo' })}</div></div>`;
  const root = el.querySelector('.sf'), svg = root.querySelector('.sf-svg'), main = root.querySelector('.tg-main');
  const say_ = root.querySelector('.tg-say'), ctl = root.querySelector('.tg-ctl'), msgEl = root.querySelector('.tg-msg');
  const bTurn = root.querySelector('.tg-turn'), bFlip = root.querySelector('.tg-flip'), bUndo = root.querySelector('.tg-undo');
  if (!p.turn) bTurn.hidden = true;
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
  const gBoard = mk('rect', 'tg-board', svg), gTray = mk('rect', 'tg-tray', svg);
  const regEl = mk('path', 'sf-reg', svg), gridEl = mk('path', 'sf-grid', svg), edgeEl = mk('path', 'sf-edge', svg);
  const gOl = mk('g', 'sf-ols', svg), hintEl = mk('path', 'tg-hl', svg), gPcs = mk('g', 'tg-pcs', svg);
  const PE = all.map(i => {
    const g = mk('g', `tg-pc sf-pc sf-c${i % 8}`, gPcs), a = mk('g', 'tg-pa', g);
    g.dataset.i = i;
    g.style.setProperty('--d', i * 60 + 'ms');
    return { g, sh: mk('path', 'tg-sh', a), ld: mk('path', 'tg-ld', a), bs: mk('path', 'tg-bs', a), hi: mk('path', 'tg-hi', a), rg: mk('path', 'tg-rg', a) };
  });

  /* ---------- layout (the tangram's: board on top or left, tray below or right) ---------- */
  let W = 300, Hh = 300, u = 40, ox = 0, oy = 0, board = null, tray = null, ut = 20, cells = {}, lastW = 0, lastH = 0;
  const loopD = (cs, f) => TG.outline(cs.map(([x, y]) => [[x, y], [x + 1, y], [x + 1, y + 1], [x, y + 1]]))
    .map(l => 'M' + l.map(q => f(q).map(v => v.toFixed(1)).join(' ')).join('L') + 'Z').join('');
  function arrange(land) {
    if (land) { root.append(main, side); side.append(say_, ctl); } else root.append(say_, main, ctl);
    root.classList.toggle('land', land);
  }
  const box = cs => [Math.max(...cs.map(c => c[0])) + 1, Math.max(...cs.map(c => c[1])) + 1];
  function packTray(s) {
    const out = {}, rows = [];
    let row = { w: 0, h: 0, items: [] };
    const hOf = i => box(SF.xf(p.pcs[i].s, st.pc[i][0], st.pc[i][1]))[1];
    for (const i of all.filter(j => st.pc[j].length == 2).sort((a, b) => hOf(b) - hOf(a) || a - b)) { // tallest first: rows waste less
      const b = box(SF.xf(p.pcs[i].s, st.pc[i][0], st.pc[i][1])), cw = Math.max(56, Math.ceil(b[0] * s + 14)), ch = Math.max(56, Math.ceil(b[1] * s + 14));
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
    let lo = 6, hi = Math.max(6, u);
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
    const land = aw > ah * 1.15 && aw >= 640, gap = 10, pad = 14, few = n <= 3;
    arrange(land);
    if (land) { W = Math.floor(aw - side.offsetWidth - 16); Hh = Math.floor(ah); }
    else { W = Math.floor(aw); Hh = Math.floor(ah - say_.offsetHeight - ctl.offsetHeight - 2 * gap); }
    W = Math.max(240, W); Hh = Math.max(240, Hh);
    if (land) {
      const need = Math.ceil(p.w * (Hh - 2 * pad) / p.h + 2 * pad), tw = Math.max(Math.round(W * (few ? 0.28 : 0.38)), W - gap - need);
      board = { x: 0, y: 0, w: W - tw - gap, h: Hh };
      tray = { x: W - tw, y: 0, w: tw, h: Hh };
    } else {
      const need = Math.ceil(p.h * (W - 2 * pad) / p.w + 2 * pad), th = Math.min(Math.round(Hh * 0.5), Math.max(Math.round(Hh * (few ? 0.28 : n >= 6 ? 0.4 : 0.36)), Hh - gap - need));
      board = { x: 0, y: 0, w: W, h: Hh - th - gap };
      tray = { x: 0, y: Hh - th, w: W, h: th };
    }
    u = Math.min((board.w - 2 * pad) / p.w, (board.h - 2 * pad) / p.h, 80);
    ox = board.x + (board.w - p.w * u) / 2;
    oy = board.y + (board.h - p.h * u) / 2;
    svg.setAttribute('width', W);
    svg.setAttribute('height', Hh);
    svg.setAttribute('viewBox', `0 0 ${W} ${Hh}`);
    const rr = (e, r) => { e.setAttribute('x', r.x + 2); e.setAttribute('y', r.y + 2); e.setAttribute('width', r.w - 4); e.setAttribute('height', r.h - 4); e.setAttribute('rx', 20); };
    rr(gBoard, board);
    rr(gTray, tray);
    const d = loopD(p.reg, px);
    regEl.setAttribute('d', d);
    edgeEl.setAttribute('d', d);
    gridEl.setAttribute('d', p.reg.map(([x, y]) => { const a = px([x, y]); return `M${a[0].toFixed(1)} ${a[1].toFixed(1)}h${u.toFixed(1)}v${u.toFixed(1)}h${(-u).toFixed(1)}Z`; }).join(''));
    gOl.innerHTML = '';
    if (p.ol) for (const i of all) { const e = mk('path', 'sf-ol', gOl); e.setAttribute('d', loopD(SF.slotCells(p, i), px)); }
    draw();
  }
  const px = q => [ox + q[0] * u, oy + q[1] * u];
  const unit = (x, y) => [(x - ox) / u, (y - oy) / u];

  /* ---------- drawing ---------- */
  // the piece's squares in px space: on the board, in its tray cell, or lifted under the finger (board size)
  function placePx(i) {
    const e = st.pc[i], sh = SF.xf(p.pcs[i].s, e[0], e[1]);
    if (drag && drag.i == i && drag.moved) {
      const m = SF.midOf(sh);
      return { cs: sh, f: q => [drag.x + drag.gx + (q[0] - m[0]) * u, drag.y + drag.gy + (q[1] - m[1]) * u], s: u };
    }
    if (e.length == 4) return { cs: sh.map(([x, y]) => [x + e[2], y + e[3]]), f: px, s: u };
    const b = box(sh), c = cells[i];
    return { cs: sh, f: q => [c.cx + (q[0] - b[0] / 2) * ut, c.cy + (q[1] - b[1] / 2) * ut], s: ut };
  }
  // the light edges of a piece: the sides facing up or left, a little inside
  function litD(cs, f, s) {
    const set = new Set(cs.map(c => c[0] + ',' + c[1])), ins = Math.max(2, s * 0.08);
    let d = '';
    for (const [x, y] of cs) {
      if (!set.has(x + ',' + (y - 1))) { const a = f([x, y]), b = f([x + 1, y]); d += `M${(a[0] + ins).toFixed(1)} ${(a[1] + ins).toFixed(1)}H${(b[0] - ins).toFixed(1)}`; }
      if (!set.has((x - 1) + ',' + y)) { const a = f([x, y]), b = f([x, y + 1]); d += `M${(a[0] + ins).toFixed(1)} ${(a[1] + ins).toFixed(1)}V${(b[1] - ins).toFixed(1)}`; }
    }
    return d;
  }
  function drawPiece(i, bad) {
    const E = PE[i], P = placePx(i), lifted = drag && drag.i == i && drag.moved, inTray = st.pc[i].length == 2 && !lifted;
    const lw = Math.max(2, Math.min(5, P.s * 0.07));
    const d = loopD(P.cs, P.f);
    E.bs.setAttribute('d', d);
    E.rg.setAttribute('d', d);
    E.ld.setAttribute('d', loopD(P.cs, q => { const a = P.f(q); return [a[0], a[1] + lw]; }));
    E.sh.setAttribute('d', loopD(P.cs, q => { const a = P.f(q); return [a[0] + 7, a[1] + 10]; }));
    E.hi.setAttribute('d', litD(P.cs, P.f, P.s));
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
    for (const i of all) drawPiece(i, !busy && !done && st.pc[i].length == 4 && !SF.fits(p, st, i, st.pc[i]));
    for (const i of z) gPcs.append(PE[i].g);
    if (sel >= 0) gPcs.append(PE[sel].g);
    if (drag && drag.moved) gPcs.append(PE[drag.i].g);
    if (st.h >= 0 && !done) { hintEl.setAttribute('d', loopD(SF.slotCells(p, st.h), px)); hintEl.style.display = ''; }
    else hintEl.style.display = 'none';
    bTurn.disabled = sel < 0 || done;
    bFlip.hidden = !(p.flip && sel >= 0);
    bUndo.disabled = !undo.length || done;
  }

  /* ---------- moves ---------- */
  const store = () => api.saveState(st);
  const remember = () => { undo.push(JSON.stringify(st)); if (undo.length > 40) undo.shift(); };
  const toTop = i => { z = z.filter(j => j != i); z.push(i); };
  const nameOf = i => `${SF.COLOUR[i % 8]} piece`;
  function after(i, res) {
    tip = -1;
    if (SF.solved(p, st)) return finish();
    if (res && st.pc[i].length == 4) {
      if (!res.ok) tell(`The ${nameOf(i)} sticks out or lies on another piece. Move it or turn it.`, 'try');
      else {
        api.sfx.pop(2);
        const left = all.filter(j => st.pc[j].length == 2).length;
        tell(left ? `Good! ${left} more ${left == 1 ? 'piece' : 'pieces'} to go.` : 'All the pieces are out. Fix the ones that do not fit.', '');
      }
    }
  }
  function place(i, r, f, x, y) {
    const res = SF.snap(p, st, i, r, f, x, y);
    st.pc[i] = [r, f, res.x, res.y];
    if (st.h >= 0 && SF.filled(p, st).by[st.h] >= 0) st.h = -1;
    toTop(i);
    return res;
  }
  function turn(i, flip) {
    if (done || i < 0) return;
    if (flip ? !p.flip : !p.turn) return;
    remember();
    const e = st.pc[i], r2 = flip ? e[0] : (e[0] + 1) % 4, f2 = flip ? 1 - e[1] : e[1];
    // flipping a turned piece over (left-right on the screen) is the mirrored piece turned the other way
    const R = flip ? (4 - e[0]) % 4 : r2;
    api.sfx.click();
    let res = null;
    if (e.length == 2) st.pc[i] = [R, f2];
    else { const [x, y] = SF.about(p, i, e, R, f2); res = place(i, R, f2, x, y); }
    sel = i;
    if (!res) tell(flip ? 'Flipped over.' : 'Turned. Tap again to keep turning.', '');
    after(i, res);
    store();
    draw();
  }
  function moveTo(i, cx, cy) { // the piece's middle to (cx, cy) in px
    if (done) return;
    remember();
    const e = st.pc[i], sh = SF.xf(p.pcs[i].s, e[0], e[1]), m = SF.midOf(sh);
    const qx = Math.max(board.x + 4, Math.min(board.x + board.w - 4, cx)), qy = Math.max(board.y + 4, Math.min(board.y + board.h - 4, cy));
    const [ux, uy] = unit(qx, qy);
    const res = place(i, e[0], e[1], ux - m[0], uy - m[1]);
    after(i, res);
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
    tell('You filled the whole shape!', 'good', true);
    store();
    draw();
    api.win({ mistakes: 0 });
  }

  /* ---------- pointer input ---------- */
  function hit(x, y) {
    const order = z.slice().reverse();
    if (sel >= 0) order.unshift(sel);
    for (const i of order) { // board pieces first, the top one first, with a margin of 10 px
      const e = st.pc[i];
      if (e.length != 4) continue;
      const [ux, uy] = unit(x, y), m = 10 / u;
      if (SF.cellsOf(p, i, e).some(([a, b]) => ux >= a - m && ux <= a + 1 + m && uy >= b - m && uy <= b + 1 + m)) return i;
    }
    for (const i of all) { const c = cells[i]; if (c && st.pc[i].length == 2 && x >= c.x && x <= c.x + c.w && y >= c.y && y <= c.y + c.h) return i; }
    return -1;
  }
  const pos = e => { const r = svg.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const inRect = (r, x, y) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
  const midPx = i => { const P = placePx(i), m = SF.midOf(P.cs); return P.f(m); };
  svg.addEventListener('pointerdown', e => {
    if (done || drag) return;
    e.preventDefault();
    try { svg.setPointerCapture(e.pointerId); } catch (er) {}
    const [x, y] = pos(e), i = hit(x, y);
    let gx = 0, gy = 0;
    if (i >= 0 && st.pc[i].length == 4) { const c = midPx(i); gx = c[0] - x; gy = c[1] - y; }
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
      if (sel == d.i && p.turn) return turn(d.i, false);
      sel = d.i;
      api.sfx.click();
      tell(`The ${nameOf(d.i)}. Drag it` + (p.turn ? ', tap it again to turn it,' : '') + ' or tap where it should go.', '');
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
    const h = SF.hint(p, st, tier);
    if (!h) return false;
    remember();
    st = h.st;
    const nm = nameOf(h.i);
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
      if (SF.solved(p, st)) { store(); finish(); return true; }
    }
    store();
    draw();
    return true;
  }

  /* ---------- start ---------- */
  const fresh_ = all.every(i => st.pc[i].length == 2);
  tell(fresh_ ? intro : 'Keep going! Drag the pieces into the shape.', '', fresh_ && band == 'A');
  layout();
  later(layout, 60);
  const inst = {
    hint: hintNow,
    destroy() {
      timers.forEach(clearTimeout);
      timers.clear();
      clearTimeout(rz);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('keydown', keyd);
      if (SF.cur && SF.cur.inst === inst) SF.cur = null;
    },
  };
  // for the smoke bot and the screenshots
  SF.cur = {
    inst, p, st: () => st, sel: () => sel, u: () => u, ut: () => ut,
    page(q) { const r = svg.getBoundingClientRect(), a = px(q); return { x: r.left + a[0], y: r.top + a[1] }; },
    at(i) { const r = svg.getBoundingClientRect(), a = midPx(i); return { x: r.left + a[0], y: r.top + a[1] }; },
    cell: i => cells[i] && { w: cells[i].w, h: cells[i].h },
  };
  return inst;
};

BT.reg({
  id: 'fit', name: 'Shape Fit', icon: 'fit', bands: 'ABCD',
  rules: 'Fill the shape with all the pieces. Drag a piece in; tap a piece twice to turn it.',
  make: (band, level, rnd) => SF.make(band, level, rnd),
  mount: (el, p, api) => SF.mount(el, p, api),
  solve: p => SF.solve(p),
});
