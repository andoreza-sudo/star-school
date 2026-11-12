/* ---------- Brain Teasers: Robot Path (P3-13; BRAIN_TEASERS.md 5.8, 7, 8) ----------
   Build a program of blocks, press Go, watch the robot run it step by step. A bump or a stop before the flag is a failed run (one
   mistake; the type allows 3): the robot wobbles, the block that went wrong turns amber, and the child edits.

   Bands and blocks (RB.KIT):
     A  4x4, no walls; arrows up, down, left, right (icons only; tapping a block says its name). Shortest route 3, 4, 5 steps
        (levels 1-4, 5-8, 9-12); from level 7 a gem to pick up on the way. Slots: par + 2.
     B  5x5 with walls; the same arrows (icon and word). Shortest route 6-10 (RB.STEPS); a gem from level 7, two from level 10.
        Slots: par + 3.
     C  6x6 corridor; forward, turn left, turn right, repeat N [ ] (N 2-9, loops nest two deep). Slots: par + 2.
     D  8x8 corridor; as C plus, by level, "repeat until wall" (levels 1-9) or one function (levels 10-12: a second strip of up to 4
        forward and turn blocks, called by the Function block). Slots: par + 1, so a loop (or the function) is needed.
   Worlds: A and B are made here (RB.makeAB): A picks a start and a goal (and a gem) at the right distance; B walks a random path that
   never touches itself, walls every cell off it, then opens walls in random order as long as the shortest route stays as long as the
   walk (a BFS over (cell, gems held) after each one). par = that BFS. C and D come from the bank PUZ.robot (src/data/d-puz-robot.js,
   made and proven by tools/puzzles/robot.js: the exact shortest program is a search too heavy for a tablet). Level L uses bank worlds
   3(L-1)..3L-1 of RB.order(band) (band C: sorted by par, R-01b); the seeded rnd picks one and one of the 8 turns and mirrors (a
   mirror swaps turn left and turn right in the program).

   Puzzle (JSON): {b band, n, w: cells ('.' open, '#' wall, reading order), s start, d facing (0 up 1 right 2 down 3 left), g goal,
     gems: [cells], par, slots, kit: 'abs' (A, B) | '' (C) | 'u' | 'f', ref: {m, f} a shortest program (the BFS route in A and B,
     the bank's intended program in C and D), k bank index or -1, x symmetry 0-7}.
   Programs are flat token lists: up dn lf rt (arrows), fw tl tr, r2..r9 (repeat N, opens a loop), uw (repeat until wall, opens a
     loop), en (ends the innermost loop), fn (call the function). {m: main, f: function}. Blocks counted: every token but en.
   Running (RB.run): the robot stops with a win the moment it reaches the flag holding every gem; a move into a wall or off the
     board is a bump; "repeat until wall" runs its body while the cell ahead is open (40 times at most, then "dizzy"); empty loops
     do nothing; 1,000 steps at most. Otherwise the program ends: short of the flag, or on it without every gem.
   State (api.saveState after every edit and run): {m, f, cs: the strip with the cursor ('m' or 'f'), ci: the cursor (a new block
     goes in there), miss: failed runs, runs, h: undo snapshots [[m, f, cs, ci], ...]}. RB.fit rejects a state that does not fit.
   Editing: tap a palette block to put it in at the cursor (a loop comes with its end; the cursor goes inside, and Repeat asks
     how many times). Tap a placed block to take it away (a loop's head takes the loop away and keeps its blocks; Repeat's head
     opens the number picker, with a Take away key). Tap the end of a loop, or an empty slot, to move the cursor after it. Undo.
   Hints (5.8 tiers; RB.diverge): A, B: the first block that bumps or does not bring the robot one step nearer the flag (BFS);
     C, D: the first block that differs from the reference program (a repeat count the child chose is kept when the program
     still works with it). 1) that block (or the empty slot) glows star yellow and the line says what is wrong; 2) the right
     block shows faintly in its place; 3) the right block is put there (RB.applyHint). A program that already works gets "Press Go".
   Stars: 3 = no hint, at most 3 failed runs and a program of at most par blocks; a longer program wins with 2 stars at most (it
     reports allow + 1 mistakes to the frame).
   Look: one SVG board (tray, floor tiles, stone wall blocks with a shade and a highlight, light from the top left), a drawn robot
     that glides (transform only) and shows where it faces with an orange pointer; reduced motion: short steps without gliding. */
const RB = {
  DX: [0, 1, 0, -1], DY: [-1, 0, 1, 0],
  ABS: { up: 0, rt: 1, dn: 2, lf: 3 },
  STEPS: { A: [3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5], B: [6, 6, 7, 7, 8, 8, 9, 9, 9, 10, 10, 10] },
  SIZE: { A: 4, B: 5, C: 6, D: 8 },
  EXTRA: { A: 2, B: 3, C: 2, D: 1 }, // slots = par + EXTRA (5.8: C intended + 2, D tight)
  UW_CAP: 40, MAX_STEPS: 1000, FN_MAX: 4, HIST: 40, ALLOW: 3,
  WORD: { up: 'Up', dn: 'Down', lf: 'Left', rt: 'Right', fw: 'Forward', tl: 'Turn left', tr: 'Turn right', rep: 'Repeat',
    uw: 'Until wall', fn: 'Function', en: 'End' },
  cur: null, // the puzzle on screen, for the smoke bot: {p, st(), busy(), inst}

  /* ---------- programs ---------- */
  isLoop: t => /^r[2-9]$/.test(t) || t == 'uw',
  isMove: t => t == 'fw' || t in RB.ABS,
  count(prog) { return [...prog.m, ...(prog.f || [])].filter(t => t != 'en').length; },
  // the tokens a kit allows in the main strip
  kitTokens(kit) {
    if (kit == 'abs') return ['up', 'dn', 'lf', 'rt'];
    const t = ['fw', 'tl', 'tr', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'en'];
    if (kit == 'u') t.push('uw');
    if (kit == 'f') t.push('fn');
    return t;
  },
  // tokens -> tree [{t, i} | {loop: N (0 = until wall), i, e, b: [...]}], or null when unbalanced
  parse(tokens) {
    const root = [], stack = [root], open = [];
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (RB.isLoop(t)) {
        const node = { loop: t == 'uw' ? 0 : +t[1], i, e: -1, b: [] };
        stack[stack.length - 1].push(node);
        stack.push(node.b);
        open.push(node);
      } else if (t == 'en') {
        if (stack.length < 2) return null;
        stack.pop();
        open.pop().e = i;
      } else stack[stack.length - 1].push({ t, i });
    }
    return stack.length == 1 ? root : null;
  },
  // index of the end of the loop opened at i (or of the head of the loop ended at i)
  match(tokens, i) {
    let k = 0;
    if (tokens[i] == 'en') {
      for (let j = i; j >= 0; j--) { if (tokens[j] == 'en') k++; else if (RB.isLoop(tokens[j]) && --k == 0) return j; }
    } else {
      for (let j = i; j < tokens.length; j++) { if (RB.isLoop(tokens[j])) k++; else if (tokens[j] == 'en' && --k == 0) return j; }
    }
    return -1;
  },
  // loops open just before position pos (the depth a block put there would have)
  depthAt(tokens, pos) {
    let k = 0;
    for (let j = 0; j < pos && j < tokens.length; j++) { if (RB.isLoop(tokens[j])) k++; else if (tokens[j] == 'en') k--; }
    return k;
  },
  maxDepth(tokens) {
    let k = 0, m = 0;
    for (const t of tokens) { if (RB.isLoop(t)) m = Math.max(m, ++k); else if (t == 'en') k--; }
    return m;
  },

  /* ---------- the world ---------- */
  front(p, c, d) {
    const n = p.n, x = c % n + RB.DX[d], y = Math.floor(c / n) + RB.DY[d];
    if (x < 0 || y < 0 || x >= n || y >= n) return -1;
    const k = y * n + x;
    return p.w[k] == '.' ? k : -1;
  },
  /* Run a program. -> {steps: [{s ('m' | 'f'), i (token), call (main index of the function call, or -1), L: [[s, i] of the loops
     around], c, d, g (gems held, bits), e: 'go' | 'turn' | 'gem' | 'bump' | 'win'}], out: 'win' | 'bump' | 'short' | 'gems' |
     'dizzy' | 'empty', at: {s, i, call} the block that went wrong (bump, dizzy) or null, c, d, g} */
  run(p, prog) {
    const gems = p.gems || [], full = (1 << gems.length) - 1, abs = p.kit == 'abs';
    const st = { c: p.s, d: p.d, g: 0, steps: [], out: null, at: null };
    const fnTree = RB.parse(prog.f || []) || [];
    if (!RB.count(prog)) return Object.assign(st, { out: 'empty' });
    const exec = (seq, s, call, L) => {
      for (const node of seq) {
        if (st.out) return;
        if (node.t == 'fn') { if (s == 'm') exec(fnTree, 'f', node.i, L.concat([[s, node.i]])); continue; }
        if (node.t) {
          if (st.steps.length >= RB.MAX_STEPS) { st.out = 'dizzy'; st.at = { s, i: node.i, call }; return; }
          let e = 'turn';
          if (node.t == 'tl') st.d = (st.d + 3) % 4;
          else if (node.t == 'tr') st.d = (st.d + 1) % 4;
          else {
            if (abs) st.d = RB.ABS[node.t];
            const k = RB.front(p, st.c, st.d);
            if (k < 0) {
              st.steps.push({ s, i: node.i, call, L, c: st.c, d: st.d, g: st.g, e: 'bump' });
              st.out = 'bump';
              st.at = { s, i: node.i, call };
              return;
            }
            st.c = k;
            e = 'go';
            const gi = gems.indexOf(k);
            if (gi >= 0 && !(st.g >> gi & 1)) { st.g |= 1 << gi; e = 'gem'; }
            if (k == p.g && st.g == full) { e = 'win'; st.out = 'win'; }
          }
          st.steps.push({ s, i: node.i, call, L, c: st.c, d: st.d, g: st.g, e });
        } else if (node.loop) {
          for (let k = 0; k < node.loop && !st.out; k++) exec(node.b, s, call, L.concat([[s, node.i]]));
        } else if (node.b.length) {
          for (let k = 0; !st.out && RB.front(p, st.c, st.d) >= 0; k++) {
            if (k >= RB.UW_CAP) { st.out = 'dizzy'; st.at = { s, i: node.i, call }; return; }
            exec(node.b, s, call, L.concat([[s, node.i]]));
          }
        }
      }
    };
    exec(RB.parse(prog.m) || [], 'm', -1, []);
    if (!st.out) st.out = st.c == p.g ? 'gems' : 'short';
    return st;
  },
  // A, B: the shortest route (arrow tokens) from cell c holding gems m to the flag with every gem, or null. BFS over (cell, gems).
  route(p, c = p.s, m = 0) {
    const gems = p.gems || [], M = 1 << gems.length, full = M - 1, N = p.n * p.n;
    const prev = new Int32Array(N * M).fill(-2), mv = new Int8Array(N * M), q = [c * M + m];
    prev[q[0]] = -1;
    const DIR = ['up', 'rt', 'dn', 'lf'];
    for (let h = 0; h < q.length; h++) {
      const x = q[h], cc = Math.floor(x / M), mm = x % M;
      if (cc == p.g && mm == full) {
        const out = [];
        for (let y = x; prev[y] >= 0; y = prev[y]) out.unshift(DIR[mv[y]]);
        return out;
      }
      for (let d = 0; d < 4; d++) {
        const k = RB.front(p, cc, d);
        if (k < 0) continue;
        const gi = gems.indexOf(k), nm = gi >= 0 ? mm | 1 << gi : mm, y = k * M + nm;
        if (prev[y] != -2) continue;
        prev[y] = x;
        mv[y] = d;
        q.push(y);
      }
    }
    return null;
  },

  /* ---------- making worlds ---------- */
  // Bands A and B. rnd: the seeded stream from the frame.
  makeAB(band, level, rnd) {
    const n = RB.SIZE[band], T = RB.STEPS[band][Math.max(1, Math.min(12, level)) - 1], N = n * n;
    const ri = k => Math.floor(rnd() * k), md = (a, b) => Math.abs(a % n - b % n) + Math.abs(Math.floor(a / n) - Math.floor(b / n));
    const ng = band == 'A' ? (level >= 7 ? 1 : 0) : level >= 10 ? 2 : level >= 7 ? 1 : 0;
    const base = { b: band, n, d: ri(4), kit: 'abs', k: -1, x: 0 };
    if (band == 'A') {
      for (let t = 0; t < 200; t++) {
        const s = ri(N), g = ri(N);
        if (!ng) { if (md(s, g) != T) continue; return RB.finish(Object.assign(base, { w: '.'.repeat(N), s, g, gems: [] })); }
        const gm = ri(N);
        if (gm == s || gm == g || s == g || md(s, gm) + md(gm, g) != T || md(s, g) > T - 2) continue;
        return RB.finish(Object.assign(base, { w: '.'.repeat(N), s, g, gems: [gm] }));
      }
      throw new Error('robot: no A world');
    }
    // B: a path that never touches itself (no shortcut), walls everywhere else, then walls opened while the route keeps its length
    for (let t = 0; t < 400; t++) {
      const path = [ri(N)];
      for (let k = 0; k < T && path.length; k++) {
        const c = path[path.length - 1], opts = [];
        for (let d = 0; d < 4; d++) {
          const x = c % n + RB.DX[d], y = Math.floor(c / n) + RB.DY[d], q = y * n + x;
          if (x < 0 || y < 0 || x >= n || y >= n || path.includes(q)) continue;
          // q may touch only c among the path cells
          let ok = true;
          for (let e = 0; e < 4 && ok; e++) {
            const xx = x + RB.DX[e], yy = y + RB.DY[e];
            if (xx >= 0 && yy >= 0 && xx < n && yy < n && yy * n + xx != c && path.includes(yy * n + xx)) ok = false;
          }
          if (ok) opts.push(q);
        }
        if (!opts.length) break;
        path.push(opts[ri(opts.length)]);
      }
      if (path.length != T + 1) continue;
      const w = Array(N).fill('#');
      path.forEach(c => { w[c] = '.'; });
      const gems = [];
      if (ng == 1) gems.push(path[2 + ri(T - 3)]);
      if (ng == 2) gems.push(path[1 + ri(Math.floor(T / 2) - 1)], path[Math.floor(T / 2) + 1 + ri(T - Math.floor(T / 2) - 2)]);
      const p = Object.assign({}, base, { s: path[0], g: path[T], gems });
      const off = [];
      for (let c = 0; c < N; c++) if (w[c] == '#') off.push(c);
      for (let i = off.length - 1; i > 0; i--) { const j = ri(i + 1); [off[i], off[j]] = [off[j], off[i]]; }
      const keep = Math.max(4, Math.round(off.length * (0.6 - level * 0.01))); // about half of the cells off the path stay walls
      let walls = off.length;
      for (const c of off) {
        if (walls <= keep) break;
        w[c] = '.';
        p.w = w.join('');
        const r = RB.route(p);
        if (!r || r.length != T) w[c] = '#'; else walls--;
      }
      p.w = w.join('');
      const r = RB.route(p);
      if (!r || r.length != T) continue;
      return RB.finish(p);
    }
    throw new Error('robot: no B world');
  },
  finish(p) {
    p.ref = { m: RB.route(p), f: [] };
    p.par = p.ref.m.length;
    p.slots = p.par + RB.EXTRA[p.b];
    return p;
  },
  // Bands C and D: bank world k under symmetry x (0-3 quarter turns clockwise, +4 mirrored left-right)
  fromBank(band, k, x) {
    const L = (typeof PUZ != 'undefined' && PUZ.robot && PUZ.robot[band]) || [];
    const e = String(L[k] || '').split('|');
    if (e.length < 10) throw new Error('robot: no bank world ' + band + k);
    const n = +e[0], w0 = e[1], mir = x >= 4, rot = x % 4;
    const map = c => {
      let cx = c % n, cy = Math.floor(c / n);
      for (let i = 0; i < rot; i++) [cx, cy] = [n - 1 - cy, cx];
      if (mir) cx = n - 1 - cx;
      return cy * n + cx;
    };
    const w = Array(n * n);
    for (let c = 0; c < n * n; c++) w[map(c)] = w0[c];
    let d = (+e[3] + rot) % 4;
    if (mir) d = (4 - d) % 4;
    const flip = t => mir && t == 'tl' ? 'tr' : mir && t == 'tr' ? 'tl' : t;
    const toks = s => s ? s.split(' ').map(flip) : [];
    return { b: band, n, w: w.join(''), s: map(+e[2]), d, g: map(+e[4]), gems: [], par: +e[5], slots: +e[5] + RB.EXTRA[band], kit: e[6],
      ref: { m: toks(e[7]), f: toks(e[8]) }, k, x, tpl: e[9] };
  },
  // The bank worlds in level order. R-01b: band C takes them sorted by par (fewest blocks first; the sort is stable, so worlds of
  // the same par keep the bank's order), so the shortest program never gets shorter from one level to the next. In the bank
  // order it went 2, 3, 5, 5, 6, 4, 4, 6 ... (the nested loops of the "turn" and "ring" worlds are short programs); now 2-3, 3,
  // 4, 4, 5, 5, 5-6, 6, 6, 7, 7, 7. Band D keeps the bank's order (its pars already never drop).
  order(band) {
    const L = (typeof PUZ != 'undefined' && PUZ.robot && PUZ.robot[band]) || [];
    const idx = L.map((_, i) => i);
    if (band != 'C') return idx;
    const par = i => +String(L[i]).split('|')[5] || 0;
    return idx.sort((a, b) => par(a) - par(b) || a - b);
  },
  make(band, level, rnd) {
    if (band == 'A' || band == 'B') return RB.makeAB(band, level, rnd);
    const lv = Math.max(1, Math.min(12, +level || 1)), k = 3 * (lv - 1) + Math.floor(rnd() * 3), x = Math.floor(rnd() * 8);
    const o = RB.order(band);
    return RB.fromBank(band, o[k] == null ? k : o[k], x);
  },

  /* ---------- saved state ---------- */
  fresh: () => ({ m: [], f: [], cs: 'm', ci: 0, miss: 0, runs: 0, h: [] }),
  // is this program (m, f) one the editor could have made for puzzle p?
  okProg(p, m, f) {
    if (!Array.isArray(m) || !Array.isArray(f)) return false;
    const ok = RB.kitTokens(p.kit);
    if (m.some(t => !ok.includes(t)) || !RB.parse(m) || RB.maxDepth(m) > 2) return false;
    if (p.kit != 'f' && f.length) return false;
    if (f.length > RB.FN_MAX || f.some(t => !['fw', 'tl', 'tr'].includes(t))) return false;
    return RB.count({ m, f }) <= p.slots;
  },
  fit(sv, p) {
    if (!sv || typeof sv != 'object' || !RB.okProg(p, sv.m, sv.f || [])) return null;
    const f = (sv.f || []).slice(), cs = sv.cs == 'f' && p.kit == 'f' ? 'f' : 'm', len = cs == 'f' ? f.length : sv.m.length;
    if (!(Number.isInteger(sv.ci) && sv.ci >= 0 && sv.ci <= len)) return null;
    const int = v => Number.isInteger(v) && v >= 0 ? v : null;
    if (int(sv.miss) == null || int(sv.runs || 0) == null) return null;
    const h = (Array.isArray(sv.h) ? sv.h : []).filter(x => Array.isArray(x) && RB.okProg(p, x[0], x[1])).slice(-RB.HIST);
    return { m: sv.m.slice(), f, cs, ci: sv.ci, miss: sv.miss, runs: sv.runs | 0, h };
  },

  /* ---------- editing (pure: take a state, return a new one) ---------- */
  copy: st => ({ m: st.m.slice(), f: st.f.slice(), cs: st.cs, ci: st.ci, miss: st.miss, runs: st.runs, h: st.h }),
  // put token t in at the cursor (a loop comes with its end, the cursor goes inside). null when it is not allowed there.
  add(p, st, t) {
    const o = RB.copy(st), L = o[o.cs];
    if (RB.count(o) >= p.slots) return null;
    if (o.cs == 'f' && (L.length >= RB.FN_MAX || !['fw', 'tl', 'tr'].includes(t))) return null;
    if (RB.isLoop(t)) {
      if (RB.depthAt(L, o.ci) >= 2) return null;
      L.splice(o.ci, 0, t, 'en');
    } else L.splice(o.ci, 0, t);
    o.ci++;
    return o;
  },
  // take away the block at i of strip s (a loop head takes the loop away and keeps its blocks); the cursor goes there
  remove(p, st, s, i) {
    const o = RB.copy(st), L = o[s], t = L[i];
    if (t == null || t == 'en') return null;
    if (RB.isLoop(t)) { const e = RB.match(L, i); L.splice(e, 1); L.splice(i, 1); } else L.splice(i, 1);
    o.cs = s;
    o.ci = i;
    return o;
  },
  // set the count of the repeat at i
  setN(st, s, i, nn) {
    const o = RB.copy(st);
    if (!/^r[2-9]$/.test(o[s][i]) || !(nn >= 2 && nn <= 9)) return null;
    o[s][i] = 'r' + nn;
    return o;
  },
  // move the cursor to position i of strip s
  cursor(p, st, s, i) {
    const o = RB.copy(st);
    if (s == 'f' && p.kit != 'f') return null;
    o.cs = s;
    o.ci = Math.max(0, Math.min(o[s].length, i));
    return o;
  },

  /* ---------- hints ---------- */
  // The first place where the program goes wrong. -> {kind: 'works' | 'fix' (the block at i is wrong; want null: not needed) |
  // 'add' (a block is missing at i) | 'close' (the loop should end at i), s, i, want, why ('bump' | 'far' | '')}
  diverge(p, st) {
    const prog = { m: st.m, f: st.f };
    if (RB.run(p, prog).out == 'win') return { kind: 'works' };
    if (p.kit == 'abs') {
      let c = p.s, g = 0;
      const gems = p.gems || [];
      for (let i = 0; i < st.m.length; i++) {
        const r = RB.route(p, c, g), k = RB.front(p, c, RB.ABS[st.m[i]]);
        if (!r || !r.length) return { kind: 'fix', s: 'm', i, want: null, why: '' };
        if (k < 0) return { kind: 'fix', s: 'm', i, want: r[0], why: 'bump' };
        const gi = gems.indexOf(k), ng = gi >= 0 ? g | 1 << gi : g, r2 = RB.route(p, k, ng);
        if (!r2 || r2.length != r.length - 1) return { kind: 'fix', s: 'm', i, want: r[0], why: 'far' };
        c = k;
        g = ng;
      }
      const r = RB.route(p, c, g);
      return { kind: 'add', s: 'm', i: st.m.length, want: r && r[0], why: '' };
    }
    // C, D: compare with the reference, keeping a repeat count the child chose when the reference still works with it
    const ref = { m: p.ref.m.slice(), f: p.ref.f.slice() };
    const cmp = (s, A, B) => {
      for (let i = 0; i < Math.max(A.length, B.length); i++) {
        const a = A[i], b = B[i];
        if (s == 'm' && a && b && a != b && /^r\d$/.test(a) && /^r\d$/.test(b)) {
          const m2 = ref.m.slice();
          m2[i] = a;
          if (RB.run(p, { m: m2, f: ref.f }).out == 'win') { ref.m = m2; continue; }
        }
        if (a == b) continue;
        if (a == 'en' && st.cs == s && st.ci == i && b != null) return { kind: 'add', s, i, want: b, why: '' };
        if (a == null) return { kind: 'add', s, i, want: b, why: '' };
        if (b == null) return { kind: 'fix', s, i, want: null, why: '' };
        if (b == 'en') return { kind: 'close', s, i, want: 'en', why: '' };
        return { kind: 'fix', s, i, want: b, why: '' };
      }
      return null;
    };
    const dm = cmp('m', st.m, ref.m), df = ref.f.length ? cmp('f', st.f, ref.f) : null;
    if (df && (!dm || st.m.slice(0, dm.i).includes('fn'))) return df;
    return dm || df || { kind: 'fix', s: 'm', i: st.m.length - 1, want: null, why: '' };
  },
  // Tier 3: put the right block in. -> the new state, or null
  applyHint(p, st, dv) {
    if (!dv || dv.kind == 'works') return null;
    const o = RB.copy(st), L = o[dv.s], i = dv.i, w = dv.want, put = (j, t) => { if (RB.isLoop(t)) L.splice(j, 0, t, 'en'); else L.splice(j, 0, t); };
    const unwrap = j => { const e = RB.match(L, j); L.splice(e, 1); L.splice(j, 1); };
    if (dv.kind == 'add') put(i, w);
    else if (dv.kind == 'close') {
      // the loop around i ends here: move its end before the block at i
      let j = i - 1;
      while (j >= 0 && !(RB.isLoop(L[j]) && RB.match(L, j) > i)) j--;
      if (j < 0) return null;
      L.splice(RB.match(L, j), 1);
      L.splice(i, 0, 'en');
    } else {
      const a = L[i];
      if (w == null) { if (RB.isLoop(a)) unwrap(i); else L.splice(i, 1); }
      else if (RB.isLoop(a) && RB.isLoop(w)) L[i] = w;
      else if (RB.isLoop(a)) { unwrap(i); put(i, w); }
      else if (a == 'en') put(i, w);
      else { L.splice(i, 1); put(i, w); }
    }
    // too many blocks now: the last block after i goes (the program was already wrong from i on)
    while (RB.count(o) > p.slots) {
      let j = L.length - 1;
      while (j > i && L[j] == 'en') j--;
      if (j <= i) return null;
      if (RB.isLoop(L[j])) unwrap(j); else L.splice(j, 1);
    }
    o.cs = dv.s;
    o.ci = Math.min(L.length, w == null ? i : i + 1);
    return RB.okProg(p, o.m, o.f) ? o : null;
  },
  // the words of a block for a sentence ("a Turn left block", "Repeat 3 times")
  name(t) {
    if (/^r\d$/.test(t)) return `Repeat ${t[1]} times`;
    return RB.WORD[t] || t;
  },
};

/* ---------- drawings (inline SVG, colours from the tokens through classes in 49-bt-robot.css) ---------- */
RB.GLYPH = {
  fw: '<path d="M12 19V6M6.5 11.2L12 5.6L17.5 11.2"/><path d="M8 21.5H16"/>',
  tl: '<path d="M16.5 21V13a5.5 5.5 0 0 0-5.5-5.5H5.5"/><path d="M9.6 3.4L5.4 7.5L9.6 11.6"/>',
  tr: '<path d="M7.5 21V13a5.5 5.5 0 0 1 5.5-5.5H18.5"/><path d="M14.4 3.4L18.6 7.5L14.4 11.6"/>',
  rep: '<path d="M4.6 11.2a7.4 7.4 0 0 1 12.8-4.4"/><path d="M18 2.8V7.3H13.5"/><path d="M19.4 12.8a7.4 7.4 0 0 1-12.8 4.4"/><path d="M6 21.2V16.7H10.5"/>',
  uw: '<path d="M3.5 13.5a6.5 6.5 0 0 1 10.8-4.9"/><path d="M15 4.5V9H10.5"/><path d="M18.5 3.5V20.5M15.8 9.2H21.2M15.8 14.8H21.2" stroke-width="2.4"/>',
  fn: '<rect x="3.5" y="4" width="17" height="16" rx="4.5"/><path d="M8.5 9.5H15.5M8.5 14.5H12.5"/>',
  en: '<path d="M9 4H15.5V20H9"/>',
};
RB.glyph = t => {
  if (t in RB.ABS) return ico({ up: 'arrow-up', dn: 'arrow-down', lf: 'arrow-left', rt: 'arrow-right' }[t], 30);
  const k = /^r\d$/.test(t) ? 'rep' : t;
  return `<svg class="rb-g" viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">${RB.GLYPH[k] || ''}</svg>`;
};
RB.kind = t => t in RB.ABS || t == 'fw' ? 'mv' : t == 'tl' || t == 'tr' ? 'tn' : /^r\d$/.test(t) || t == 'rep' ? 'rep' : t;
// the robot, drawn around (0, 0) in a 100-unit cell; light from the top left (shade lower right, gloss upper left)
RB.botSvg = () =>
  '<ellipse class="rb-sh" cx="4" cy="38" rx="31" ry="8"/>' +
  '<g class="rb-body">' +
  '<rect class="rb-whl" x="-31" y="12" width="15" height="25" rx="7"/><rect class="rb-whl" x="16" y="12" width="15" height="25" rx="7"/>' +
  '<rect class="rb-bd2" x="-21" y="-3" width="46" height="36" rx="13"/><rect class="rb-bd" x="-24" y="-6" width="46" height="36" rx="13"/>' +
  '<rect class="rb-bd1" x="-18" y="-2" width="14" height="5" rx="2.5"/><circle class="rb-led" cx="-1" cy="13" r="6.5"/>' +
  '<path class="rb-ant" d="M16 -38L19 -46"/><circle class="rb-ball" cx="20" cy="-49" r="6"/><circle class="rb-ball1" cx="18" cy="-51" r="2"/>' +
  '<rect class="rb-hd2" x="-27" y="-38" width="58" height="38" rx="15"/><rect class="rb-hd" x="-30" y="-41" width="58" height="38" rx="15"/>' +
  '<rect class="rb-scr" x="-23" y="-34" width="44" height="25" rx="10"/>' +
  '<g class="rb-eyes"><circle class="rb-eye" cx="-10" cy="-23" r="5.5"/><circle class="rb-eye" cx="8" cy="-23" r="5.5"/>' +
  '<path class="rb-smile" d="M-7 -15.5Q-1 -11.5 5 -15.5"/></g><rect class="rb-gl" x="-25" y="-37.5" width="15" height="5" rx="2.5"/>' +
  '</g>' +
  // where the robot faces: an orange pointer at the edge of its cell, drawn on top so it never hides behind the robot
  '<g class="rb-dir"><path class="rb-ptr2" d="M-11 -38L2 -50L15 -38Z"/><path class="rb-ptr" d="M-13 -40L0 -52L13 -40Z"/></g>';
RB.flagSvg = () =>
  '<ellipse class="rb-pad2" cx="3" cy="30" rx="34" ry="12"/><ellipse class="rb-pad" cx="0" cy="27" rx="34" ry="12"/>' +
  '<path class="rb-pole" d="M-12 27V-36"/><path class="rb-fg2" d="M-10 -34H28L19 -21L28 -8H-10Z"/><path class="rb-fg" d="M-10 -36H25L16 -23.5L25 -11H-10Z"/>' +
  '<rect class="rb-fg1" x="-6" y="-32" width="14" height="4" rx="2"/>';
RB.gemSvg = () =>
  '<path class="rb-gm2" d="M-15 -6L-6 -17H10L19 -6L2 18Z"/><path class="rb-gm" d="M-18 -9L-9 -20H7L16 -9L-1 15Z"/>' +
  '<path class="rb-gm1" d="M-9 -20H7L4 -9H-6Z"/><path class="rb-gm3" d="M-1 15L4 -9H16Z"/>';
// one stone block (shadow, side, top, highlight, seam) in the cell at (x, y)
RB.wallSvg = (x, y) =>
  `<rect class="rb-ws" x="${x + 10}" y="${y + 12}" width="88" height="88" rx="14"/><rect class="rb-w2" x="${x + 5}" y="${y + 9}" width="90" height="88" rx="14"/>` +
  `<rect class="rb-w" x="${x + 5}" y="${y + 4}" width="90" height="84" rx="14"/><rect class="rb-w1" x="${x + 14}" y="${y + 11}" width="34" height="9" rx="4.5"/>` +
  `<path class="rb-wl" d="M${x + 12} ${y + 47}H${x + 88}M${x + 50} ${y + 47}V${y + 86}"/>`;

/* ---------- the screen ---------- */
RB.mount = (el, p, api) => {
  const band = p.b, abs = p.kit == 'abs', n = p.n, gems = p.gems || [];
  let st = RB.fit(api.loadState(), p) || RB.fresh();
  let busy = false, won = false, pick = -1, mark = null, bad = null, away = false, ang = p.d * 90, told = '';
  const timers = new Set(), later = (f, ms) => { const t = setTimeout(() => { timers.delete(t); f(); }, ms); timers.add(t); return t; };
  const reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const V = 100, M = 14, SZ = n * V + 2 * M, cx = c => M + (c % n) * V + V / 2, cy = c => M + Math.floor(c / n) * V + V / 2;

  // ---- markup: the board (drawn once) and the side panel ----
  let floor = '', walls = '';
  for (let c = 0; c < n * n; c++) {
    const x = M + (c % n) * V, y = M + Math.floor(c / n) * V;
    if (p.w[c] == '#') walls += RB.wallSvg(x, y);
    else floor += `<rect class="rb-fl2" x="${x + 5}" y="${y + 7}" width="93" height="93" rx="12"/>` +
      `<rect class="rb-fl" x="${x + 3}" y="${y + 3}" width="92" height="92" rx="12"/>`;
  }
  const items = `<g transform="translate(${cx(p.s)} ${cy(p.s)})"><circle class="rb-st2" cx="2" cy="4" r="36"/><circle class="rb-st" r="35"/>` +
    '<circle class="rb-st1" r="24"/></g>' +
    `<g transform="translate(${cx(p.g)} ${cy(p.g)})">${RB.flagSvg()}</g>` +
    gems.map((c, k) => `<g transform="translate(${cx(c)} ${cy(c)})"><g class="rb-gem" data-k="${k}">${RB.gemSvg()}</g></g>`).join('');
  const aria = `Robot world, ${n} by ${n}. The robot starts facing ${['up', 'right', 'down', 'left'][p.d]}.` +
    (gems.length ? ` ${gems.length} gem${gems.length > 1 ? 's' : ''} to pick up.` : '');
  const fnStrip = p.kit == 'f' ? `<div class="rb-sw rb-fw"><div class="rb-hd"><span class="rb-lab">${RB.glyph('fn')}<span>Function</span></span></div>` +
    '<div class="rb-strip" data-s="f"></div></div>' : '';
  el.innerHTML = `<div class="rb rb-${band}${abs ? ' rb-abs' : ''}"><div class="rb-board">` +
    `<svg class="rb-svg" viewBox="0 0 ${SZ} ${SZ}" role="img" aria-label="${esc(aria)}">` +
    `<rect class="rb-tray2" x="5" y="7" width="${SZ - 5}" height="${SZ - 7}" rx="30"/><rect class="rb-tray" width="${SZ - 5}" height="${SZ - 7}" rx="30"/>` +
    `<g>${floor}</g><g>${walls}</g><g class="rb-trail"></g><g>${items}</g><g class="rb-bot">${RB.botSvg()}</g>` +
    '<g class="rb-bonk" visibility="hidden"><path d="M0 -21L6 -7L21 -7L9 2L13 17L0 8L-13 17L-9 2L-21 -7L-6 -7Z"/></g></svg></div>' +
    `<div class="rb-side"><div class="rb-talk"><p class="rb-msg" role="status" aria-live="polite"></p>${UI.ibtn('speak', 'Hear it', { size: 'sm', cls: 'rb-say' })}</div>` +
    `<div class="rb-prog${fnStrip ? ' rb-two' : ''}"><div class="rb-sw rb-mw">` +
    `${fnStrip ? `<div class="rb-hd"><span class="rb-lab">${ico('robot', 22)}<span>Program</span></span></div>` : ''}` +
    `<div class="rb-strip" data-s="m"></div></div>${fnStrip}</div><div class="rb-pal"></div>` +
    `<div class="rb-act">${UI.ibtn('undo', 'Undo', { cls: 'rb-undo' })}<span class="rb-cnt" role="status"></span>` +
    `${UI.btn('Go', { kind: 'primary', icon: 'play', cls: 'rb-go' })}</div></div></div>`;
  const root = el.querySelector('.rb'), svg = root.querySelector('.rb-svg'), bot = root.querySelector('.rb-bot'), dirEl = root.querySelector('.rb-dir');
  const eyes = root.querySelector('.rb-eyes'), body = root.querySelector('.rb-body'), trail = root.querySelector('.rb-trail'), bonk = root.querySelector('.rb-bonk');
  const msgEl = root.querySelector('.rb-msg'), side = root.querySelector('.rb-side'), pal = root.querySelector('.rb-pal');
  const goBtn = root.querySelector('.rb-go'), undoBtn = root.querySelector('.rb-undo');

  // ---- the robot on the board ----
  function setBot(c, d, glide) {
    bot.classList.toggle('glide', !!glide && !reduce);
    bot.style.transform = `translate(${cx(c)}px, ${cy(c)}px)`;
    let a = d * 90;
    while (a - ang > 180) a -= 360; // turn the short way round
    while (ang - a > 180) a += 360;
    ang = a;
    dirEl.style.transform = `rotate(${a}deg)`;
    eyes.style.transform = `translate(${RB.DX[d] * 3}px, ${RB.DY[d] * 2}px)`;
  }
  function playClass(cls) {
    body.classList.remove('wob', 'hop');
    void body.getBoundingClientRect(); // restart the animation
    body.classList.add(cls);
  }
  function home() { // back to the start: gems back, trail and bump mark gone
    setBot(p.s, p.d, false);
    trail.innerHTML = '';
    bonk.setAttribute('visibility', 'hidden');
    root.querySelectorAll('.rb-gem').forEach(g => g.classList.remove('got'));
    body.classList.remove('wob', 'hop');
    away = false;
  }

  // ---- the program strips ----
  const cnt = () => RB.count(st), full = () => cnt() >= p.slots;
  const warn = (s, i) => bad && bad.s == s && bad.i == i ? ico('warning', 18, 'rb-warn') : '';
  function stripHTML(s) {
    const L = st[s], tree = RB.parse(L) || [], cur = st.cs == s && !busy && !won ? st.ci : -1, mk = mark && mark.dv.s == s ? mark : null;
    // tier 1 marks the place, tier 2 shows the right block faintly there
    const ghost = i => {
      if (!mk || mk.dv.i != i) return '';
      const w = mk.dv.want;
      if (mk.tier >= 2 && w && w != 'en') {
        return `<span class="rb-ghost rb-k-${RB.kind(w)}" aria-hidden="true">${RB.glyph(w)}${/^r\d$/.test(w) ? `<b>${w[1]}</b>` : ''}</span>`;
      }
      return mk.dv.kind == 'add' ? '<span class="rb-ghost rb-gslot" aria-hidden="true"></span>' : '';
    };
    const before = i => { const g = ghost(i); return (i == cur && i < L.length && !g ? '<span class="rb-cur" aria-hidden="true"></span>' : '') + g; };
    const cls = i => (bad && bad.s == s && bad.i == i ? ' bad' : '') + (mk && mk.dv.i == i && mk.dv.kind != 'add' ? ' hint' : '');
    const node = seq => seq.map(nd => {
      if (nd.t) {
        return before(nd.i) + `<button class="rb-b rb-k-${RB.kind(nd.t)}${cls(nd.i)}" data-s="${s}" data-i="${nd.i}" ` +
          `aria-label="${esc(RB.name(nd.t))}, block ${nd.i + 1}. Tap to take it away.">${RB.glyph(nd.t)}${warn(s, nd.i)}</button>`;
      }
      const t = L[nd.i], rep = /^r\d$/.test(t), k = RB.kind(t);
      const endHint = mk && mk.dv.kind == 'close' && mk.tier >= 2 && nd.i < mk.dv.i && nd.e > mk.dv.i ? ' hint' : '';
      return before(nd.i) + `<div class="rb-loop rb-k-${k}" data-s="${s}" data-i="${nd.i}">` +
        `<button class="rb-b rb-lh rb-k-${k}${cls(nd.i)}" data-s="${s}" data-i="${nd.i}" ` +
        `aria-label="${rep ? `Repeat ${t[1]} times. Tap to change.` : 'Repeat until wall. Tap to take it away.'}">` +
        `${RB.glyph(t)}${rep ? `<b>${t[1]}</b>` : ''}${warn(s, nd.i)}</button>${node(nd.b)}${before(nd.e)}` +
        `<button class="rb-end rb-k-${k}${endHint}" data-s="${s}" data-e="${nd.e}" aria-label="End of the loop. Tap to put the next block after it.">` +
        `${RB.glyph('en')}</button></div>`;
    }).join('');
    // empty slots (A, B: one box for every block left; C, D: one, to keep the strip short); the first one is the cursor when the
    // cursor is at the end (a hint mark at the end takes its place)
    const left = Math.max(0, s == 'f' ? Math.min(RB.FN_MAX - L.length, p.slots - cnt()) : p.slots - cnt()), room = abs ? left : Math.min(1, left);
    const g = ghost(L.length);
    let html = node(tree) + g;
    for (let k = g ? 1 : 0; k < room; k++) {
      const isCur = k == 0 && cur == L.length;
      const aria = isCur ? 'The next block goes here' : 'Empty slot. Tap to put the next block here.';
      html += `<button class="rb-slot${isCur ? ' cur' : ''}" data-s="${s}" aria-label="${aria}"></button>`;
    }
    return html;
  }
  function palHTML() {
    if (pick >= 0) {
      const t = st.m[pick] || '', now = /^r\d$/.test(t) ? +t[1] : 0;
      let nums = '';
      for (let k = 2; k <= 9; k++) {
        nums += `<button class="rb-nk${k == now ? ' on' : ''}" data-n="${k}" aria-pressed="${k == now}" aria-label="${k} times">${k}</button>`;
      }
      return `<div class="rb-pick"><p>${RB.glyph('rep')}<span>How many times?</span></p><div class="rb-nums">${nums}</div>` +
        `${UI.btn('Take it away', { icon: 'trash', cls: 'rb-del' })}</div>`;
    }
    const toks = abs ? ['up', 'lf', 'dn', 'rt'] : ['fw', 'tl', 'tr', 'rep', ...(p.kit == 'u' ? ['uw'] : []), ...(p.kit == 'f' ? ['fn'] : [])];
    const inF = st.cs == 'f', deep = RB.depthAt(st[st.cs], st.ci) >= 2;
    return `<div class="rb-pals${abs ? ' rb-pad' : ''}">` + toks.map(t => {
      const off = busy || won || full() || (inF && (!['fw', 'tl', 'tr'].includes(t) || st.f.length >= RB.FN_MAX)) || ((t == 'rep' || t == 'uw') && deep);
      return `<button class="rb-p rb-k-${RB.kind(t)}" data-t="${t}" aria-label="${esc(RB.WORD[t])}"${off ? ' disabled' : ''}>${RB.glyph(t)}` +
        `${band == 'A' ? '' : `<span>${esc(RB.WORD[t])}</span>`}</button>`;
    }).join('') + '</div>';
  }
  function render() {
    root.querySelectorAll('.rb-strip').forEach(e => { e.innerHTML = stripHTML(e.dataset.s); });
    const c = root.querySelector('.rb-cnt');
    c.innerHTML = `<b>${cnt()} of ${p.slots}</b><span>blocks</span>`;
    c.setAttribute('aria-label', `${cnt()} of ${p.slots} blocks used`);
    c.classList.toggle('full', full());
    pal.innerHTML = palHTML();
    root.querySelectorAll('.rb-fw').forEach(e => e.classList.toggle('on', st.cs == 'f'));
    goBtn.querySelector('span').textContent = busy ? 'Stop' : 'Go';
    goBtn.classList.toggle('stop', busy);
    goBtn.disabled = won;
    undoBtn.disabled = busy || won || !st.h.length;
    wire();
    layout();
  }

  // ---- the talk line ----
  const msg = (t, kind, speak) => {
    msgEl.textContent = t;
    msgEl.className = 'rb-msg' + (kind ? ' ' + kind : '');
    told = t;
    if (speak) api.say(t);
    layout(); // the line may now take more or fewer rows
  };
  const intro = abs
    ? (gems.length ? `Pick up the gem${gems.length > 1 ? 's' : ''}, then go to the flag. Tap the arrows, then press Go.`
      : 'Tap the arrows to help the robot get to the flag. Then press Go.')
    : p.kit == 'u' ? 'Repeat until wall goes on while the way ahead is open.'
    : p.kit == 'f' ? 'Put moves in the function once, then use it again and again.'
    : `Use Repeat to fit the program in ${p.slots} blocks.`;

  // ---- editing ----
  const save = () => { if (!won) api.saveState(st); };
  function edit(o, say) {
    if (!o || busy || won) return false;
    o.h = st.h.concat([[st.m.slice(), st.f.slice(), st.cs, st.ci]]).slice(-RB.HIST);
    st = o;
    mark = null;
    bad = null;
    if (away) home();
    save();
    render();
    if (say) msg(say);
    return true;
  }
  function addTok(t) {
    if (busy || won) return;
    if (full()) { msg(`All ${p.slots} blocks are used. Tap a block to take it away.`, 'try'); return; }
    const o = RB.add(p, st, t == 'rep' ? 'r2' : t);
    if (!o) return;
    api.sfx.pop(Math.min(5, cnt()));
    if (band == 'A') api.say(RB.WORD[t]);
    if (t == 'rep') { pick = o.ci - 1; edit(o, 'How many times? Then put blocks inside the repeat.'); }
    else if (t == 'uw') edit(o, 'Put blocks inside. They repeat while the way ahead is open.');
    else edit(o);
  }
  function wire() {
    pal.querySelectorAll('.rb-p').forEach(b => { b.onclick = () => addTok(b.dataset.t); });
    pal.querySelectorAll('.rb-nk').forEach(b => {
      b.onclick = () => {
        const at = pick, fresh = !st.m[at + 1] || st.m[at + 1] == 'en';
        pick = -1;
        api.sfx.click();
        if (!edit(RB.setN(st, 'm', at, +b.dataset.n), fresh ? 'Now put blocks inside. Then tap the end bracket to go on after the loop.' : '')) render();
      };
    });
    const del = pal.querySelector('.rb-del');
    if (del) del.onclick = () => { const at = pick; pick = -1; api.sfx.del(); if (!edit(RB.remove(p, st, 'm', at))) render(); };
    root.querySelectorAll('.rb-strip .rb-b').forEach(b => {
      b.onclick = () => {
        if (busy || won) return;
        const s = b.dataset.s, i = +b.dataset.i;
        if (/^r\d$/.test(st[s][i])) { pick = pick == i ? -1 : i; api.sfx.click(); render(); return; }
        pick = -1;
        api.sfx.del();
        edit(RB.remove(p, st, s, i));
      };
    });
    root.querySelectorAll('.rb-end').forEach(b => {
      b.onclick = () => { if (busy || won) return; pick = -1; api.sfx.click(); edit(RB.cursor(p, st, b.dataset.s, +b.dataset.e + 1)); };
    });
    root.querySelectorAll('.rb-slot').forEach(b => {
      b.onclick = () => {
        if (busy || won) return;
        const s = b.dataset.s, other = s != st.cs;
        pick = -1;
        api.sfx.click();
        edit(RB.cursor(p, st, s, st[s].length), other ? (s == 'f' ? 'Put moves in the function: forward and turns.' : 'Back to the program.') : '');
      };
    });
  }
  undoBtn.onclick = () => {
    if (busy || won || !st.h.length) return;
    const h = st.h.slice(), [m, f, cs, ci] = h.pop();
    st = Object.assign(RB.copy(st), { m: m.slice(), f: f.slice(), cs, ci, h });
    pick = -1;
    mark = null;
    bad = null;
    if (away) home();
    api.sfx.del();
    save();
    render();
  };
  root.querySelector('.rb-say').onclick = () => { try { say(told); } catch (e) {} };

  // ---- running: the whole run is worked out first (RB.run), then shown step by step ----
  function highlight(stp) {
    root.querySelectorAll('.rb-strip .on').forEach(e => e.classList.remove('on'));
    if (!stp) return;
    const on = (s, i) => root.querySelectorAll(`.rb-strip [data-s="${s}"][data-i="${i}"]`).forEach(e => e.classList.add('on'));
    on(stp.s, stp.i);
    if (stp.call >= 0) on('m', stp.call);
    for (const [s, i] of stp.L) on(s, i);
  }
  function go() {
    if (won) return;
    if (busy) { stopRun(); return; }
    if (!cnt()) { msg('Put some blocks in first. Then press Go.', 'try', band == 'A'); return; }
    pick = -1;
    mark = null;
    bad = null;
    home();
    const tr = RB.run(p, { m: st.m, f: st.f }), steps = tr.steps;
    busy = true;
    render();
    msg('Go, robot, go!');
    // a step lasts 170-380 ms (long runs go faster); reduced motion: short steps, no gliding
    const dt = reduce ? 160 : Math.max(170, Math.min(380, Math.round(8000 / Math.max(1, steps.length))));
    root.style.setProperty('--rb-t', Math.round(dt * 0.85) + 'ms');
    let k = 0;
    const tick = () => {
      if (!busy) return;
      const s = steps[k++];
      if (!s) { later(() => end(tr), Math.round(dt * 0.5)); return; }
      highlight(s);
      setBot(s.c, s.d, true);
      away = true;
      if (s.e == 'bump') {
        const x = cx(s.c) + RB.DX[s.d] * 50, y = cy(s.c) + RB.DY[s.d] * 50;
        bonk.setAttribute('transform', `translate(${x} ${y})`);
        bonk.setAttribute('visibility', 'visible');
        playClass('wob');
        api.sfx.rattle();
      } else if (s.e != 'turn') {
        trail.insertAdjacentHTML('beforeend', `<circle class="rb-dot" cx="${cx(s.c)}" cy="${cy(s.c)}" r="9"/>`);
        api.sfx.click();
        gems.forEach((c, gi) => {
          const e = root.querySelector(`.rb-gem[data-k="${gi}"]`);
          if (s.g >> gi & 1 && e && !e.classList.contains('got')) { e.classList.add('got'); api.sfx.coin(gi); }
        });
      }
      later(tick, dt);
    };
    later(tick, 120);
  }
  function stopRun() {
    timers.forEach(clearTimeout);
    timers.clear();
    busy = false;
    highlight(null);
    home();
    render();
    msg('Stopped. Change the program, or press Go again.');
  }
  function end(tr) {
    busy = false;
    highlight(null);
    st.runs++;
    if (tr.out == 'win') {
      won = true;
      playClass('hop');
      api.sfx.magic();
      const over = cnt() > p.par;
      render();
      msg(over ? `You made it with ${cnt()} blocks! It can be done with ${p.par}.` : 'You made it!', 'good', true);
      api.saveState(st);
      api.win({ mistakes: over ? Math.max(st.miss, RB.ALLOW + 1) : st.miss });
      return;
    }
    st.miss++; // a failed run is one mistake
    bad = tr.at ? { s: tr.at.s, i: tr.at.i } : null;
    const words = {
      bump: `Bump! The robot hit a wall. Change the amber ${abs ? 'arrow' : 'block'}.`,
      dizzy: 'The robot got dizzy: that loop went round and round. Change the amber block.',
      short: 'The robot stopped before the flag. Add more blocks, or change some.',
      gems: 'The robot is on the flag, but a gem is missing. Pick it up first.',
    }[tr.out] || 'Not there yet. Try again!';
    if (tr.out != 'bump') api.sfx.wrong();
    save();
    render();
    msg(words, 'try', true);
  }
  goBtn.onclick = go;
  const keyd = e => {
    if (!root.isConnected || $('.ovl') || $('.bt-win')) return;
    const t = { ArrowUp: 'up', ArrowDown: 'dn', ArrowLeft: 'lf', ArrowRight: 'rt' }[e.key];
    if (t && abs) { e.preventDefault(); addTok(t); }
    else if (e.key == 'Backspace' && st.ci > 0 && !busy && st[st.cs][st.ci - 1] != 'en') { e.preventDefault(); edit(RB.remove(p, st, st.cs, st.ci - 1)); }
  };
  document.addEventListener('keydown', keyd);

  // ---- layout (BRAIN_TEASERS 8): the board is the biggest square left above the controls (portrait) or beside them (landscape) ----
  function layout() {
    const ps = getComputedStyle(el), aw = el.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
    const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
    const land = aw > ah * 1.2 && aw >= 640;
    root.classList.toggle('land', land);
    // a long program: closer rows, so the panel still fits beside the board (landscape) or leaves it room (portrait)
    root.classList.remove('tight');
    if (land ? side.offsetHeight > ah : ah - side.offsetHeight - 12 < Math.min(aw, 240)) root.classList.add('tight');
    let bs = land ? Math.min(ah, aw - side.offsetWidth - 20) : Math.min(aw, ah - side.offsetHeight - 12);
    bs = Math.max(150, Math.min(bs, 640));
    svg.style.width = svg.style.height = Math.floor(bs) + 'px';
  }
  let rz = 0;
  const onResize = () => { clearTimeout(rz); rz = setTimeout(layout, 120); };
  window.addEventListener('resize', onResize);

  // ---- hints ----
  function hintNow(tier) {
    if (busy || won) return false;
    const dv = RB.diverge(p, st);
    if (dv.kind == 'works') { msg('Your program works! Press Go.', 'good', true); return false; }
    pick = -1;
    if (tier >= 3) {
      const o = RB.applyHint(p, st, dv);
      if (!edit(o)) return false;
      msg(dv.want == null ? 'I took away a block that was not needed.' : dv.kind == 'close' ? 'I ended the loop there.' : `I put in ${RB.name(dv.want)}.`, 'hint', true);
      return true;
    }
    mark = { tier, dv };
    bad = null;
    if (away) home();
    render();
    const t1 = dv.kind == 'add' ? (cnt() ? 'So far so good! The next block goes here.' : 'Start here. Which block comes first?')
      : dv.kind == 'close' ? 'The loop should end before this block.'
      : dv.want == null ? 'This block is not needed.'
      : dv.why == 'bump' ? 'This arrow bumps into a wall.' : dv.why == 'far' ? 'This arrow takes the robot the long way.'
      : 'Look at this block. Something else goes here.';
    const t2 = dv.kind == 'close' ? 'End the loop here: tap the end of the loop, then put the next blocks after it.'
      : dv.want == null ? 'Take this block away.' : `Try ${RB.name(dv.want)} here.`;
    msg(tier == 1 ? t1 : t2, 'hint', true);
    return true;
  }

  // ---- start ----
  home();
  render();
  msg(intro, '', !st.m.length && !st.runs && (band == 'A' || band == 'B')); // R-01b: band B speaks its first instruction too
  const inst = {
    hint: hintNow,
    destroy() {
      timers.forEach(clearTimeout);
      timers.clear();
      clearTimeout(rz);
      busy = false;
      window.removeEventListener('resize', onResize);
      document.removeEventListener('keydown', keyd);
      if (RB.cur && RB.cur.inst === inst) RB.cur = null;
    },
  };
  RB.cur = { inst, p, st: () => st, busy: () => busy, won: () => won, mark: () => mark };
  return inst;
};

BT.reg({
  id: 'robot', name: 'Robot Path', icon: 'robot', bands: 'ABCD', allow: RB.ALLOW,
  rules: 'Tap blocks to build a program. Press Go and the robot follows it to the flag.',
  make(band, level, rnd) { return RB.make(band, level, rnd); },
  solve(p) { return { m: p.ref.m.slice(), f: p.ref.f.slice() }; },
  mount(el, p, api) { return RB.mount(el, p, api); },
});
