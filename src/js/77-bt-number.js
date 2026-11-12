/* ---------- Brain Teasers: number puzzles (P3-10; BRAIN_TEASERS.md 5.6, 7) ----------
   Three types, registered separately as the catalog lists them (section 4):
     pyramid  Number Pyramid, bands B C D: each brick is the sum of the two under it. 3 / 4 / 5 rows, bottom numbers 1-9 / 1-12 / 1-20.
              As many givens as the bottom row has bricks (plus 2, 1, 0 extra over levels 1-3, 4-7, 8-12). Accepted only when the
              givens fix every brick (full rank, small Gaussian elimination) and, in bands B and C, when "two of a triple known gives
              the third" fills the pyramid. Band D levels 10-12 look for puzzles that need more than that and mark them tricky.
     balance  Balance, bands A B C D: pictures stand for hidden whole numbers on level scales. A one unknown (1-5); B two, triangular
              (each scale adds one new picture, 1-10); C three, triangular, repeated pictures, and a last question that is an
              expression (apple + banana x 2 = ?, 1-12); D not triangular: two scales in two unknowns (sum and difference,
              2a + b and a + b, a + 2b and 2a + b), from level 9 three in three (pair sums, a sum and two differences), 1-20.
              Built from the answer, so there is exactly one (the determinant is checked).
     target   Make the Number, bands B C D: B two of five tiles with + or - (target 5-20); C all of three tiles with + - x (target
              up to 50); D all of four tiles 1-13 with + - x / (target 24 on levels 1-6, 10-100 after). Built from a random
              expression; an exhaustive search (whole, non-negative steps) counts the different solutions, and a level picks among
              six candidates by that count: level 1 the most solutions, level 12 the fewest. Any correct way wins.
   Entry uses the question screen's number pad (padHTML from 49-kinds.js) laid out in two rows; a wrong number counts a mistake,
   shakes, and on a balance tips the scale to the heavier side. The pure rules (make, check, hint, solve) live in BTN so tools/test.js
   can run them without a page. Hints: tier 1 points (marks), tier 2 says how (never the number), tier 3 fills one answer or does
   one step; pressing again fills the next one, so a child can always finish.
   Drawing: tokens only (classes in src/css/49-bt-number.css), light from the top left (gloss upper left, shade and ledge lower
   right). The balance is inline SVG whose arm turns and whose trays move with CSS transforms. */
const BTN = (() => {
  const ri = (rnd, a, b) => a + Math.floor(rnd() * (b - a + 1));
  const pickR = (rnd, a) => a[Math.floor(rnd() * a.length)];
  const shuf = (rnd, a) => {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  };
  const ramp = level => (Math.min(12, Math.max(1, level)) - 1) / 11; // 0 at level 1, 1 at level 12

  /* ================= Number Pyramid ================= */
  // Bricks are numbered row by row from the bottom: row r (0 = bottom) has n - r bricks; brick (r, i) sits on (r-1, i) and (r-1, i+1).
  const PYR = {
    ROWS: { B: 3, C: 4, D: 5 },
    MAX: { B: 9, C: 12, D: 20 }, // bottom numbers 1..MAX
    id(n, r, i) {
      let k = 0;
      for (let q = 0; q < r; q++) k += n - q;
      return k + i;
    },
    // [[r, i], ...] for every brick index
    cells(n) {
      const out = [];
      for (let r = 0; r < n; r++) for (let i = 0; i < n - r; i++) out.push([r, i]);
      return out;
    },
    // every triple: [top, left, right] brick indices
    triples(n) {
      const out = [];
      for (let r = 1; r < n; r++) for (let i = 0; i < n - r; i++) out.push([PYR.id(n, r, i), PYR.id(n, r - 1, i), PYR.id(n, r - 1, i + 1)]);
      return out;
    },
    values(bottom) {
      const n = bottom.length, v = bottom.slice();
      for (let r = 1; r < n; r++) for (let i = 0; i < n - r; i++) v.push(v[PYR.id(n, r - 1, i)] + v[PYR.id(n, r - 1, i + 1)]);
      return v;
    },
    // the coefficients of brick (r, i) on the bottom row: binomials C(r, k) at i..i+r
    coef(n, r, i) {
      const c = new Array(n).fill(0);
      let b = 1;
      for (let k = 0; k <= r; k++) {
        c[i + k] = b;
        b = b * (r - k) / (k + 1);
      }
      return c;
    },
    // rank of the givens' rows (Gaussian elimination with partial pivoting; numbers are small)
    rank(n, given) {
      const cells = PYR.cells(n), m = given.map(g => PYR.coef(n, cells[g][0], cells[g][1]));
      let rank = 0;
      for (let col = 0; col < n && rank < m.length; col++) {
        let piv = rank;
        for (let r = rank + 1; r < m.length; r++) if (Math.abs(m[r][col]) > Math.abs(m[piv][col])) piv = r;
        if (Math.abs(m[piv][col]) < 1e-9) continue;
        [m[rank], m[piv]] = [m[piv], m[rank]];
        for (let r = 0; r < m.length; r++) {
          if (r == rank) continue;
          const f = m[r][col] / m[rank][col];
          if (f) for (let c = col; c < n; c++) m[r][c] -= f * m[rank][c];
        }
        rank++;
      }
      return rank;
    },
    // "two of a triple known gives the third", repeated. known: array of booleans (changed in place). Returns the number filled.
    spread(n, v, known) {
      const T = PYR.triples(n);
      let added = 0, more = true;
      while (more) {
        more = false;
        for (const [t, a, b] of T) {
          const k = known[t] + known[a] + known[b];
          if (k != 2) continue;
          if (!known[t]) known[t] = true; else if (!known[a]) known[a] = true; else known[b] = true;
          added++;
          more = true;
        }
      }
      return added;
    },
    // the first brick that can be worked out now from the known ones, as {at, from: [x, y], how: 'add' | 'sub'} or null
    nextStep(p, known) {
      for (const [t, a, b] of PYR.triples(p.n)) {
        if (!known[t] && known[a] && known[b]) return { at: t, from: [a, b], how: 'add' };
        if (known[t] && !known[a] && known[b]) return { at: a, from: [t, b], how: 'sub' };
        if (known[t] && known[a] && !known[b]) return { at: b, from: [t, a], how: 'sub' };
      }
      return null;
    },
    make(band, level, rnd) {
      const n = PYR.ROWS[band], hi = Math.max(4, Math.round(PYR.MAX[band] * (0.5 + 0.5 * ramp(level))));
      const extra = level <= 3 ? 2 : level <= 7 ? 1 : 0, need = n + extra, all = n * (n + 1) / 2;
      const wantTricky = band == 'D' && level >= 10;
      let best = null;
      for (let at = 0; at < 400; at++) {
        const bottom = [];
        for (let i = 0; i < n; i++) bottom.push(ri(rnd, 1, hi));
        const v = PYR.values(bottom);
        let given;
        if (level <= 3) { // the whole bottom row and a few more: only adding
          given = [...Array(n).keys()].concat(shuf(rnd, [...Array(all - n).keys()].map(k => k + n)).slice(0, extra));
        } else given = shuf(rnd, [...Array(all).keys()]).slice(0, need);
        if (PYR.rank(n, given) < n) continue;
        const known = new Array(all).fill(false);
        given.forEach(g => known[g] = true);
        PYR.spread(n, v, known);
        const easy = known.every(Boolean);
        if (!easy && band != 'D') continue;
        const p = { n, v, g: v.map((x, k) => given.includes(k) ? 1 : 0), tricky: !easy };
        if (wantTricky ? !easy : easy) return p;
        if (easy && !best) best = p; // a tricky one was wanted but not found yet: keep a fair one in reserve
      }
      if (best) return best;
      const bottom = [];
      for (let i = 0; i < n; i++) bottom.push(ri(rnd, 1, hi));
      const v = PYR.values(bottom);
      return { n, v, g: v.map((x, k) => k < n ? 1 : 0), tricky: false };
    },
    hidden: p => p.v.map((x, k) => k).filter(k => !p.g[k]),
    known(p, st) {
      return p.v.map((x, k) => !!p.g[k] || st.done.includes(k));
    },
    // Hint for the current state (st.done = bricks filled). Returns {say, mark: [bricks], fill: brick | null} or null when finished.
    hint(p, st, tier) {
      const known = PYR.known(p, st);
      if (known.every(Boolean)) return null;
      const s = PYR.nextStep(p, known);
      if (s) {
        const [x, y] = s.from;
        if (tier == 1) return { say: s.how == 'add' ? 'You can find the glowing brick now: it sits on two bricks you know.'
          : 'You can find the glowing brick now: look at the brick above it and the brick next to it.', mark: [s.at], fill: null };
        if (tier == 2) return { say: s.how == 'add' ? `Add the two bricks under it: ${p.v[x]} + ${p.v[y]}.`
          : `The brick above is ${p.v[x]}. Take away the brick next to it, ${p.v[y]}.`, mark: [s.at, x, y], fill: null };
        const say = `${p.v[x]} ${s.how == 'add' ? '+' : '−'} ${p.v[y]} = ${p.v[s.at]}`;
        return { say, mark: [s.at, x, y], fill: s.at };
      }
      // tricky: no brick follows from two others. The brick to try is the one that lets the most bricks follow.
      let at = -1, most = -1;
      for (const k of PYR.hidden(p)) {
        if (known[k]) continue;
        const kn = known.slice();
        kn[k] = true;
        const got = PYR.spread(p.n, p.v, kn);
        if (got > most) { most = got; at = k; }
      }
      if (tier == 1) {
        return { say: 'A tricky one! No brick follows from two others yet. Start with the glowing brick.', mark: [at], fill: null };
      }
      if (tier == 2) return { say: 'Guess a number for the glowing brick and work up the pyramid. If the bricks above come out too big, '
        + 'guess smaller.', mark: [at], fill: null };
      return { say: `This brick is ${p.v[at]}.`, mark: [at], fill: at };
    },
    // the bricks to fill, in an order a child could find them (used by tests and the smoke bot): [[brick, value], ...]
    solve(p) {
      const st = { done: [] }, out = [];
      for (let guard = 0; guard < 40; guard++) {
        const h = PYR.hint(p, st, 3);
        if (!h) break;
        st.done.push(h.fill);
        out.push([h.fill, p.v[h.fill]]);
      }
      return out;
    },
  };

  /* ================= Balance ================= */
  // A puzzle: {f: [art names], v: [values], eqs: [{l: [count per picture], lc, r: [...], rc}], q: {c: [counts], v} | null, form}
  // Slots the child fills: 0..m-1 (the pictures) and 'q' (band C's last question).
  const BAL = {
    PICS: ['apple', 'banana', 'cookie', 'cake', 'ball', 'gift'],
    NAME: { apple: ['apple', 'apples'], banana: ['banana', 'bananas'], cookie: ['cookie', 'cookies'], cake: ['cake', 'cakes'],
      ball: ['ball', 'balls'], gift: ['present', 'presents'] },
    VMAX: { A: [3, 5], B: [5, 10], C: [6, 12], D: [8, 20] }, // value range 1..max, the max grows from the first to the second number
    eq(m, l, lc, r, rc) {
      const z = () => new Array(m).fill(0), L = z(), R = z();
      l.forEach(k => L[k]++);
      r.forEach(k => R[k]++);
      return { l: L, lc: lc || 0, r: R, rc: rc || 0 };
    },
    side: (cs, k, v) => cs.reduce((a, c, i) => a + c * v[i], k),
    net: (e, i) => e.l[i] - e.r[i],
    det(M) {
      if (M.length == 1) return M[0][0];
      if (M.length == 2) return M[0][0] * M[1][1] - M[0][1] * M[1][0];
      return M[0].reduce((s, a, j) => s + (j % 2 ? -1 : 1) * a * BAL.det(M.slice(1).map(row => row.filter((x, k) => k != j))), 0);
    },
    make(band, level, rnd) {
      const [m0, m1] = BAL.VMAX[band], vmax = Math.round(m0 + (m1 - m0) * ramp(level));
      const val = (lo, hi) => ri(rnd, lo, Math.max(lo, hi));
      const distinct = (k, lo, hi) => { // k different values in lo..hi
        const pool = shuf(rnd, [...Array(hi - lo + 1).keys()].map(x => x + lo));
        return pool.slice(0, k);
      };
      const m = { A: 1, B: 2, C: 3, D: level <= 8 ? 2 : 3 }[band];
      const f = shuf(rnd, BAL.PICS).slice(0, m);
      const E = (l, lc, r, rc) => BAL.eq(m, l, lc, r, rc);
      let v, eqs, q = null, form;
      if (band == 'A') {
        // apple + k = W, then apple + apple = W, then three apples or two apples and a weight; totals stay at 10 or less
        if (level <= 3) {
          v = [val(1, vmax)];
          const k = val(1, Math.min(3, 10 - v[0]));
          eqs = [E([0], k, [], v[0] + k)];
          form = 'a+k';
        } else if (level <= 8 || rnd() < 0.5) {
          v = [val(1, vmax)];
          eqs = [E([0, 0], 0, [], 2 * v[0])];
          form = 'aa';
        } else if (rnd() < 0.5) {
          v = [val(1, 3)];
          eqs = [E([0, 0, 0], 0, [], 3 * v[0])];
          form = 'aaa';
        } else {
          v = [val(1, 4)];
          const k = val(1, 10 - 2 * v[0]);
          eqs = [E([0, 0], k, [], 2 * v[0] + k)];
          form = 'aa+k';
        }
        if (level >= 6 && rnd() < 0.5) eqs = eqs.map(e => ({ l: e.r, lc: e.rc, r: e.l, rc: e.lc })); // the picture on the right
      } else if (band == 'B') {
        v = distinct(2, 1, vmax);
        const [x, y] = v;
        const e1 = level <= 4 ? 'xx' : level <= 8 ? pickR(rnd, ['xx', 'x+k']) : pickR(rnd, x <= 6 ? ['xxx', 'xx+k'] : ['xx+k']);
        const k = val(1, 5);
        eqs = [{ xx: () => E([0, 0], 0, [], 2 * x), 'x+k': () => E([0], k, [], x + k), xxx: () => E([0, 0, 0], 0, [], 3 * x),
          'xx+k': () => E([0, 0], k, [], 2 * x + k) }[e1]()];
        const e2s = level <= 4 ? ['x+y'] : level <= 8 ? ['x+y', 'x+yy'] : (y > x ? ['x+yy', 'y=x+k', 'yy+x'] : ['x+yy', 'yy+x']);
        const e2 = pickR(rnd, e2s);
        eqs.push({
          'x+y': () => E([0, 1], 0, [], x + y),
          'x+yy': () => E([0, 1, 1], 0, [], x + 2 * y),
          'yy+x': () => E([1, 1, 0], 0, [], x + 2 * y),
          'y=x+k': () => E([1], 0, [0], y - x),
        }[e2]());
        form = e1 + ',' + e2;
        if (level >= 9 && rnd() < 0.6) eqs.reverse();
      } else if (band == 'C') {
        v = distinct(3, 1, vmax);
        const [x, y, z] = v, k = val(1, 6);
        const e1 = pickR(rnd, x <= 8 ? ['xx', 'xxx', 'xx+k'] : ['xx', 'xx+k']);
        eqs = [{
          xx: () => E([0, 0], 0, [], 2 * x),
          xxx: () => E([0, 0, 0], 0, [], 3 * x),
          'xx+k': () => E([0, 0], k, [], 2 * x + k),
        }[e1]()];
        const [a2, b2] = pickR(rnd, [[1, 1], [1, 2], [2, 1]]);
        eqs.push(E([...Array(a2).fill(0), ...Array(b2).fill(1)], 0, [], a2 * x + b2 * y));
        const p3 = rnd() < 0.5 ? 0 : 1, [a3, b3] = pickR(rnd, [[1, 1], [1, 2], [2, 1]]);
        eqs.push(E([...Array(a3).fill(p3), ...Array(b3).fill(2)], 0, [], a3 * v[p3] + b3 * z));
        const qc = pickR(rnd, [[1, 2, 0], [2, 1, 0], [0, 1, 2], [0, 2, 1], [1, 0, 2], [2, 0, 1], [2, 1, 1], [1, 2, 1], [1, 1, 2]]);
        q = { c: qc, v: BAL.side(qc, 0, v) };
        form = e1 + ',' + a2 + b2 + ',' + a3 + b3;
        if (level >= 7) eqs = shuf(rnd, eqs);
      } else {
        if (m == 2) {
          form = level <= 4 ? 'sd' : pickR(rnd, ['pq', 'xy']);
          if (form == 'sd') { // x + y = s, x = y + d
            const y = val(1, vmax - 1), x = val(y + 1, vmax);
            v = [x, y];
            eqs = [E([0, 1], 0, [], x + y), E([0], 0, [1], x - y)];
          } else if (form == 'pq') { // 2x + y = p, x + y = q
            v = distinct(2, 1, vmax);
            eqs = [E([0, 0, 1], 0, [], 2 * v[0] + v[1]), E([0, 1], 0, [], v[0] + v[1])];
          } else { // x + 2y = p, 2x + y = q
            v = distinct(2, 1, vmax);
            eqs = [E([0, 1, 1], 0, [], v[0] + 2 * v[1]), E([0, 0, 1], 0, [], 2 * v[0] + v[1])];
          }
        } else {
          form = pickR(rnd, ['pair', 'chain']);
          if (form == 'pair') { // x + y, y + z, x + z
            v = distinct(3, 1, vmax);
            eqs = [E([0, 1], 0, [], v[0] + v[1]), E([1, 2], 0, [], v[1] + v[2]), E([0, 2], 0, [], v[0] + v[2])];
          } else { // x + y + z = s, x = y + d, z = y + e
            const y = val(1, vmax - 2), [d, e] = distinct(2, 1, Math.max(2, Math.min(9, vmax - y)));
            v = [y + d, y, y + e];
            eqs = [E([0, 1, 2], 0, [], 3 * y + d + e), E([0], 0, [1], d), E([2], 0, [1], e)];
          }
        }
        if (level >= 5 && rnd() < 0.5) eqs = shuf(rnd, eqs);
      }
      if (BAL.det(eqs.slice(0, m).map(e => e.l.map((c, i) => c - e.r[i]))) == 0) throw new Error('balance: singular');
      return { f, v, eqs, q, form };
    },
    slots: p => [...p.v.keys()].concat(p.q ? ['q'] : []),
    answer: (p, s) => s === 'q' ? p.q.v : p.v[s],
    // an equation where picture i is the only one not solved yet (and does not cancel out), or -1
    lone(p, solved, i) {
      return p.eqs.findIndex(e => BAL.net(e, i) != 0 && e.l.every((c, j) => j == i || solved.includes(j) || (!c && !e.r[j])));
    },
    // the scale a wrong number for picture i is tried on: a scale where it is the only unknown left, else any with it
    tryOn(p, solved, i) {
      const k = BAL.lone(p, solved, i);
      return k >= 0 ? k : p.eqs.findIndex(e => BAL.net(e, i) != 0);
    },
    // which way scale k tips when picture i weighs w (the others their real weight): -1 left down, 1 right down, 0 level
    tip(p, k, i, w) {
      const v = p.v.slice();
      v[i] = w;
      const e = p.eqs[k];
      return Math.sign(BAL.side(e.r, e.rc, v) - BAL.side(e.l, e.lc, v));
    },
    nm: (p, i, c) => BAL.NAME[p.f[i]][c == 1 ? 0 : 1],
    // Hint for the current state (st.done = slots solved). {say, mark: {eqs: [k], slot}, fill: slot | null} or null when finished.
    hint(p, st, tier) {
      const solved = st.done.filter(s => s !== 'q');
      const open = p.v.map((x, i) => i).filter(i => !solved.includes(i));
      if (!open.length) {
        if (!p.q || st.done.includes('q')) return null;
        const terms = [];
        p.q.c.forEach((c, i) => { for (let j = 0; j < c; j++) terms.push(p.v[i]); });
        const mark = { eqs: [], slot: 'q' };
        if (tier == 1) return { say: 'Now put the weight of each picture into the last question.', mark, fill: null };
        if (tier == 2) return { say: `Add them up: ${terms.join(' + ')}.`, mark, fill: null };
        return { say: `${terms.join(' + ')} = ${p.q.v}`, mark, fill: 'q' };
      }
      // a scale with one unknown picture left
      for (const i of open) {
        const k = BAL.lone(p, solved, i);
        if (k < 0) continue;
        const e = p.eqs[k], left = BAL.net(e, i) > 0, c = Math.abs(BAL.net(e, i));
        const mine = left ? [e.l, e.lc] : [e.r, e.rc], other = left ? [e.r, e.rc] : [e.l, e.lc];
        const w1 = BAL.side(mine[0].map((x, j) => j == i ? 0 : x), mine[1], p.v), w2 = BAL.side(other[0], other[1], p.v);
        const one = BAL.nm(p, i, 1), many = BAL.nm(p, i, 2);
        const mark = { eqs: [k], slot: i };
        if (tier == 1) return { say: `Start with the glowing scale. Only the ${one} is still a mystery there.`, mark, fill: null };
        if (tier == 2) {
          let say;
          if (w1 && c > 1) say = `Take ${w1} away from both sides. Then share what is left between the ${c} ${many}.`;
          else if (w1) say = `Take ${w1} away from both sides. What is left weighs the same as one ${one}.`;
          else if (c > 1) say = `${c} ${many} weigh ${w2}. Share ${w2} into ${c} equal parts.`;
          else say = `One ${one} weighs the same as everything on the other side. Add up that side.`;
          return { say, mark, fill: null };
        }
        return { say: `One ${one} weighs ${p.v[i]}.`, mark, fill: i };
      }
      // no scale has a single unknown (band D): compare the scales. Tier 3 gives the picture the form's trick finds first.
      const nm = i => BAL.nm(p, i, 1), eqk = p.eqs.map((e, k) => k), pref = { sd: 1, chain: 1 }[p.form] || 0;
      const at = open.includes(pref) ? pref : open[0];
      const mark = { eqs: eqk, slot: at };
      if (tier == 1) return { say: 'Compare the scales. What is the same on both, and what is different?', mark, fill: null };
      if (tier == 2) {
        const sum = p.eqs.reduce((a, e) => a + e.lc + e.rc, 0), diff = p.eqs.find(e => e.r.some(Boolean));
        const say = {
          sd: () => `The ${nm(0)} weighs ${diff.rc} more than the ${nm(1)}. Take ${diff.rc} away from the two together, `
            + 'then share the rest equally.',
          pq: () => `One scale has one more ${nm(0)} than the other. That extra ${nm(0)} makes the difference in weight.`,
          xy: () => `Put both scales together: 3 of each picture weigh ${sum}. So one ${nm(0)} and one ${nm(1)} weigh a third of that.`,
          pair: () => `Put all three scales together: every picture is there twice. Half of ${sum} is one of each picture.`,
          chain: () => `Take the extra weights off the ${nm(0)} and the ${nm(2)}: then all three weigh the same as the ${nm(1)}.`,
        }[p.form];
        return { say: say ? say() : 'Compare the scales.', mark, fill: null };
      }
      return { say: `One ${nm(at)} weighs ${p.v[at]}.`, mark, fill: at };
    },
    solve(p) {
      const st = { done: [] }, out = [];
      for (let guard = 0; guard < 10; guard++) {
        const h = BAL.hint(p, st, 3);
        if (!h) break;
        st.done.push(h.fill);
        out.push([h.fill, BAL.answer(p, h.fill)]);
      }
      return out;
    },
  };

  /* ================= Make the Number ================= */
  // A puzzle: {nums, target, ops ('+-', '+-x', '+-x/'), use: 2 (two tiles) | 0 (all tiles), sols (different solutions)}.
  // Tiles have ids: the numbers are 0..k-1 and every join makes the next id. A step is [leftId, op, rightId].
  const TGT = {
    OPS: { B: '+-', C: '+-x', D: '+-x/' },
    SIGN: { '+': '+', '-': '−', x: '×', '/': '÷' },
    ICON: { '+': 'plus', '-': 'minus', x: 'times', '/': 'divide' },
    NAME: { '+': 'Add', '-': 'Take away', x: 'Times', '/': 'Share' },
    // a op b with whole, non-negative results only; null otherwise
    calc(a, op, b) {
      if (op == '+') return a + b;
      if (op == '-') return a >= b ? a - b : null;
      if (op == 'x') return a * b;
      if (op == '/') return b > 0 && a % b == 0 ? a / b : null;
      return null;
    },
    // canonical text of a join, so a + b and b + a (and the order of a chain of + or x) count once
    canon(a, op, b) {
      if (op == '+' || op == 'x') {
        const part = t => t.op == op ? t.parts : [t.s];
        const parts = part(a).concat(part(b)).sort();
        return { s: '(' + parts.join(op) + ')', op, parts };
      }
      return { s: '(' + a.s + op + b.s + ')', op, parts: null };
    },
    // Exhaustive search. vals: numbers; use: 2 = any two of them, 0 = all of them. Returns {n: different solutions, first: steps as
    // [i, op, j] positions in the list at that moment (the result replaces j, i is removed)}.
    search(vals, target, ops, use) {
      const seen = new Set();
      let first = null;
      const go = (list, steps) => {
        if (use == 0 ? list.length == 1 : steps.length == 1) {
          const hit = use == 0 ? (list[0].v == target ? list[0] : null) : list.find(t => t.made && t.v == target);
          if (hit) {
            seen.add(hit.s);
            if (!first) first = steps.slice();
          }
          return;
        }
        for (let i = 0; i < list.length; i++) for (let j = 0; j < list.length; j++) {
          if (i == j) continue;
          for (const op of ops) {
            if ((op == '+' || op == 'x') && i > j) continue; // the same join the other way round
            const r = TGT.calc(list[i].v, op, list[j].v);
            if (r == null) continue;
            const c = TGT.canon(list[i], op, list[j]);
            const next = list.map((t, k) => k == j ? { v: r, s: c.s, op: c.op, parts: c.parts, made: true } : t).filter((t, k) => k != i);
            steps.push([i, op, j]);
            go(next, steps);
            steps.pop();
          }
        }
      };
      go(vals.map(v => ({ v, s: String(v), op: null, parts: null, made: false })), []);
      return { n: seen.size, first };
    },
    // a random expression of every number (C, D): its value, or null when a step is not whole and non-negative
    randExpr(rnd, vals, ops) {
      let list = vals.slice();
      while (list.length > 1) {
        const i = Math.floor(rnd() * list.length);
        let j = Math.floor(rnd() * (list.length - 1));
        if (j >= i) j++;
        const r = TGT.calc(list[i], pickR(rnd, ops.split('')), list[j]);
        if (r == null) return null;
        list = list.map((x, k) => k == j ? r : x).filter((x, k) => k != i);
      }
      return list[0];
    },
    make(band, level, rnd) {
      const ops = TGT.OPS[band], cands = [];
      for (let at = 0; at < 400 && cands.length < 6; at++) {
        let nums, target, use;
        if (band == 'B') {
          use = 2;
          const hi = level <= 6 ? 10 : 15;
          nums = shuf(rnd, [...Array(hi).keys()].map(x => x + 1)).slice(0, 5);
          const a = nums[0], b = nums[1], op = level <= 4 ? '+' : pickR(rnd, ['+', '-']);
          target = op == '+' ? a + b : Math.abs(a - b);
        } else if (band == 'C') {
          use = 0;
          nums = [ri(rnd, 1, 10), ri(rnd, 1, 10), ri(rnd, 1, 10)];
          target = TGT.randExpr(rnd, nums, level <= 3 ? '+-' : ops);
          if (target == null || target < 5 || target > 50) continue;
        } else {
          use = 0;
          nums = [ri(rnd, 1, 13), ri(rnd, 1, 13), ri(rnd, 1, 13), ri(rnd, 1, 13)];
          target = level <= 6 ? 24 : TGT.randExpr(rnd, nums, ops);
          if (target == null || target < 10 || target > 100) continue;
        }
        if (band == 'B' && (target < 5 || target > 20)) continue;
        if (band == 'C' && level >= 4 && !nums.some(x => x > 1)) continue;
        const s = TGT.search(nums, target, ops, use);
        if (!s.n) continue;
        if (cands.some(c => c.nums.join() == nums.join())) continue;
        cands.push({ nums, target, ops, use, sols: s.n });
      }
      if (!cands.length) { // never seen; a fixed fair puzzle so make() always returns one
        const nums = { B: [2, 3, 5, 7, 9], C: [2, 3, 4], D: [1, 2, 3, 4] }[band];
        const target = { B: 12, C: 10, D: 24 }[band], use = band == 'B' ? 2 : 0;
        return { nums, target, ops, use, sols: TGT.search(nums, target, ops, use).n };
      }
      cands.sort((a, b) => b.sols - a.sols);
      return cands[Math.min(cands.length - 1, Math.floor((Math.min(12, level) - 1) * cands.length / 12))];
    },
    // the tiles at the start: [{id, v}]
    start: p => p.nums.map((v, id) => ({ id, v })),
    // Join two tiles in a state {tiles, next, hist}. Returns {err: 'neg' | 'frac'} or {v} (and changes st).
    join(st, aId, op, bId) {
      const i = st.tiles.findIndex(t => t.id == aId), j = st.tiles.findIndex(t => t.id == bId);
      if (i < 0 || j < 0 || i == j) return { err: 'tile' };
      const a = st.tiles[i].v, b = st.tiles[j].v, r = TGT.calc(a, op, b);
      if (r == null) return { err: op == '-' ? 'neg' : 'frac' };
      const t = { id: st.next++, v: r };
      st.hist.push({ a: st.tiles[i], ai: i, b: st.tiles[j], bi: j, op, r: t.id });
      st.tiles[j] = t;
      st.tiles.splice(i, 1);
      return { v: r, id: t.id };
    },
    undo(st) {
      const h = st.hist.pop();
      if (!h) return false;
      const k = st.tiles.findIndex(t => t.id == h.r);
      st.tiles.splice(k, 1, h.b);
      st.tiles.splice(h.ai, 0, h.a);
      return true;
    },
    fresh: p => ({ tiles: TGT.start(p), next: p.nums.length, hist: [], miss: 0 }),
    won(p, st) {
      return p.use == 2 ? st.hist.length == 1 && st.tiles.some(t => t.id == st.hist[0].r && t.v == p.target)
        : st.tiles.length == 1 && st.tiles[0].v == p.target;
    },
    // the next step from this state as [leftId, op, rightId], or null when these tiles cannot make the target
    next(p, st) {
      if (p.use == 2 && st.hist.length) return null;
      const s = TGT.search(st.tiles.map(t => t.v), p.target, p.ops, p.use);
      if (!s.first) return null;
      const [i, op, j] = s.first[0];
      return [st.tiles[i].id, op, st.tiles[j].id];
    },
    // Hint: {say, mark: [tile ids], step: [l, op, r] | null, reset: bool} or null when won
    hint(p, st, tier) {
      if (TGT.won(p, st)) return null;
      let s = TGT.next(p, st), reset = false;
      if (!s) {
        if (tier < 3) {
          const say = `These numbers cannot make ${p.target} any more. Tap Undo to go back.`;
          return { say, mark: [], step: null, reset: false, undo: true };
        }
        reset = true;
        s = TGT.next(p, TGT.fresh(p));
      }
      const val = id => (reset ? TGT.start(p) : st.tiles).find(t => t.id == id).v;
      const last = p.use == 2 || st.tiles.length == 2;
      if (tier == 1) return { say: `Start with ${val(s[0])}.`, mark: [s[0]], step: null, reset: false };
      if (tier == 2) return { say: last ? `Use ${val(s[0])} and ${val(s[2])}. Which sign makes ${p.target}?`
        : `Try ${val(s[0])} ${TGT.SIGN[s[1]]} ${val(s[2])} first.`, mark: [s[0], s[2]], step: null, reset: false };
      const say = `${val(s[0])} ${TGT.SIGN[s[1]]} ${val(s[2])} = ${TGT.calc(val(s[0]), s[1], val(s[2]))}`;
      return { say, mark: [s[0], s[2]], step: s, reset };
    },
    solve(p) {
      const st = TGT.fresh(p), out = [];
      for (let guard = 0; guard < 6 && !TGT.won(p, st); guard++) {
        const s = TGT.next(p, st);
        if (!s) break;
        TGT.join(st, ...s);
        out.push(s);
      }
      return out;
    },
  };

  /* ================= screens ================= */
  const pad = () => padHTML('', false).replace('class="keys qpad pad"', 'class="keys qpad pad bn-pad"');
  // the frame of every number puzzle: a talk line (message + speak), the board, the controls
  const frame = (kind, board, ctl) => `<div class="bn bn-${kind}"><div class="bn-say"><p class="bn-msg" aria-live="polite"></p>` +
    `${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'bn-spk' })}</div>` +
    `<div class="bn-board">${board}</div><div class="bn-ctl">${ctl}</div></div>`;

  // shared wiring: message line, speak button, number pad (with the hardware keys), timers that destroy() clears
  function kit(el, api) {
    const timers = [];
    let msg = '', onKey = null;
    const k = {
      later(fn, ms) { timers.push(setTimeout(fn, ms)); },
      say(text, kind, speak) {
        msg = text;
        const m = el.querySelector('.bn-msg');
        if (m) {
          m.textContent = text;
          m.className = 'bn-msg' + (kind ? ' ' + kind : '');
        }
        if (speak) api.say(text);
      },
      keys(fn) { onKey = fn; },
      shake(node) {
        if (!node) return;
        node.classList.remove('bn-shake');
        void node.offsetWidth;
        node.classList.add('bn-shake');
      },
      bind() {
        const sp = el.querySelector('.bn-spk');
        if (sp) sp.onclick = () => { try { say(msg); } catch (e) {} };
        el.querySelectorAll('.bn-pad .k[data-k]').forEach(b => b.onclick = () => onKey && onKey(b.dataset.k));
      },
      destroy() {
        timers.forEach(clearTimeout);
        document.removeEventListener('keydown', hw);
      },
    };
    const hw = e => {
      if (!onKey || !el.isConnected || document.querySelector('.bt-win,.sheet')) return;
      const key = /^\d$/.test(e.key) ? e.key : e.key == 'Backspace' ? 'del' : e.key == 'Enter' ? 'go' : null;
      if (key) { e.preventDefault(); onKey(key); }
    };
    document.addEventListener('keydown', hw);
    return k;
  }

  // typing into a selected box: returns the new text, or null for 'go'
  const typeKey = (typed, key, max) => {
    if (key == 'del') { SFX.del(); return typed.slice(0, -1); }
    if (key == 'go') return null;
    if (typed.length >= max || (typed == '0')) return typed;
    SFX.key(+key);
    return typed + key;
  };

  /* ---------- pyramid screen ---------- */
  function mountPyr(el, p, api) {
    const st = api.loadState() || { done: [], hinted: [], sel: -1, miss: 0 };
    const k = kit(el, api), n = p.n, cells = PYR.cells(n), maxLen = 3;
    let typed = '', marks = [];
    const open = () => PYR.hidden(p).filter(b => !st.done.includes(b));
    if (st.sel < 0 || !open().includes(st.sel)) st.sel = open()[0] != null ? open()[0] : -1;
    const brick = b => {
      const [r, i] = cells[b], given = !!p.g[b], done = st.done.includes(b), sel = b == st.sel;
      const look = given ? ' giv' : done ? (st.hinted.includes(b) ? ' ok hn' : ' ok') : ' hid';
      const cls = 'bn-br' + look + (sel ? ' sel' : '') + (marks.includes(b) ? ' hl' : '');
      const face = given || done ? p.v[b] : sel && typed ? typed : '?';
      const lab = given || done ? `Brick ${p.v[b]}` : 'Missing brick';
      // rows are drawn top first; the brick spans two of the 2n grid columns, shifted half a brick per row
      const tag = given || done ? 'div' : 'button';
      return `<${tag} class="${cls}" data-b="${b}" style="grid-row:${n - r};grid-column:${r + 2 * i + 1}/span 2" aria-label="${lab}"` +
        `${tag == 'div' ? ' role="img"' : ''}><span>${face}</span></${tag}>`;
    };
    const draw = () => {
      el.querySelector('.bn-pyrw').innerHTML = cells.map((c, b) => brick(b)).join('');
      el.querySelectorAll('.bn-br.hid').forEach(b => b.onclick = () => {
        SFX.click();
        st.sel = +b.dataset.b;
        typed = '';
        api.saveState(st);
        draw();
      });
    };
    el.innerHTML = frame('pyr', `<div class="bn-pyrw" style="--n:${n}" role="group" aria-label="Number pyramid"></div>` +
      (p.tricky ? `<p class="bn-tag">${UI.tag('Tricky', 'new', 'sparkle')}</p>` : ''), pad());
    k.bind();
    const intro = 'Each brick is the two bricks under it added together. Tap a missing brick and type its number.';
    k.say(st.done.length ? 'Keep going! Tap a missing brick.' : intro, '', api.band == 'A' || (api.band == 'B' && !st.done.length)); // R-01b: band B speaks its first instruction too
    draw();
    const fill = b => {
      st.done.push(b);
      typed = '';
      st.sel = open()[0] != null ? open()[0] : -1;
      api.saveState(st);
      draw();
      if (!open().length) {
        k.say('The pyramid is complete!', 'good');
        el.querySelector('.bn-pyrw').classList.add('win');
        api.win({ mistakes: st.miss });
      }
    };
    k.keys(key => {
      if (st.sel < 0 || !open().length) return;
      const t = typeKey(typed, key, maxLen);
      if (t != null) { typed = t; return draw(); }
      if (!typed) return k.say('Type a number first, then tap the tick.', 'try');
      marks = [];
      if (+typed == p.v[st.sel]) {
        SFX.right();
        k.say(pickR(Math.random, ['Yes!', 'That fits!', 'Right!']), 'good');
        fill(st.sel);
      } else {
        SFX.wrong();
        st.miss++;
        api.saveState(st);
        k.say(`Not ${typed}. Check the bricks next to it and try again.`, 'try');
        typed = '';
        draw();
        k.shake(el.querySelector('.bn-br.sel'));
      }
    });
    return {
      hint(tier) {
        const h = PYR.hint(p, st, tier);
        if (!h) return false;
        marks = h.mark;
        if (h.fill != null) {
          st.hinted.push(h.fill);
          k.say(h.say, 'hint', true);
          fill(h.fill);
        } else {
          if (!st.done.includes(h.mark[0]) && !p.g[h.mark[0]]) { st.sel = h.mark[0]; typed = ''; }
          draw();
          k.say(h.say, 'hint', true);
        }
        return true;
      },
      destroy: k.destroy,
    };
  }

  /* ---------- balance screen ---------- */
  // Geometry in viewBox units: the pin at (cx, py); the trays' posts stand on the arm `half` out from the pin, so a tilt of `tilt`
  // degrees moves them half x sin(tilt) up and down (the CSS in 49-bt-number.css uses the same 10.45).
  const W = { box: 340, h: 110, cx: 170, py: 82, half: 100, tilt: 6, pic: 36 };
  const pic = (name, x, y, s) =>
    `<svg class="art" x="${x}" y="${y}" width="${s}" height="${s}" viewBox="0 0 64 64">${ART[name] || ''}</svg>`;
  const wWidth = n => Math.max(32, 16 + 11 * String(n).length);
  // a weight block with a handle and its number
  function weightSVG(x, base, n) {
    const t = String(n), w = wWidth(n), h = 30, y = base - h;
    return `<g class="bn-w"><path class="bn-wh" d="M${x - 8} ${y + 1}a8 8 0 0 1 16 0"/>` +
      `<rect class="bn-wb" x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="8"/>` +
      `<path class="bn-ws" d="M${x + w / 2 - 4} ${y + 8}v${h - 13}"/>` +
      `<path class="bn-wg" d="M${x - w / 2 + 6} ${y + 6}h${Math.max(4, w / 2 - 10)}"/>` +
      `<text x="${x}" y="${y + 21.5}">${t}</text></g>`;
  }
  // the things on one tray, centred on cx and standing on base: pictures first, then the weight; a solved picture wears its weight
  function trayItems(p, cs, k, cx, base, known, bad) {
    const items = [];
    cs.forEach((c, i) => { for (let j = 0; j < c; j++) items.push({ i }); });
    if (k) items.push({ k });
    const S = W.pic, wid = it => it.k != null ? wWidth(it.k) + 4 : S + 2;
    let x = cx - items.reduce((a, it) => a + wid(it), 0) / 2, out = '';
    for (const it of items) {
      const w = wid(it), mid = x + w / 2;
      if (it.k != null) out += weightSVG(mid, base, it.k);
      else {
        out += `<g class="bn-pic" data-f="${it.i}">${pic(p.f[it.i], mid - S / 2, base - S - 1, S)}`;
        if (known[it.i] != null) {
          out += `<g class="bn-vt${it.i === bad ? ' bad' : ''}"><circle cx="${mid + 13}" cy="${base - S + 1}" r="10"/>` +
            `<text x="${mid + 13}" y="${base - S + 5.5}">${known[it.i]}</text></g>`;
        }
        out += '</g>';
      }
      x += w;
    }
    return out;
  }
  // known: the weight shown on each picture (null: none); bad: the picture that wears the child's wrong guess
  function scaleSVG(p, e, k, known, bad) {
    const { cx, py, half, h } = W, ty = py - 16;
    // a tray: a post down to the arm, a shallow dish (gloss on its upper left, shade underneath), the things on it
    const tray = (cls, x, cs, kk) => `<g class="bn-tray ${cls}">` +
      `<rect class="bn-post" x="${x - 3}" y="${ty}" width="6" height="${py - ty}"/>` +
      `<path class="bn-dish" d="M${x - 66} ${ty - 6}h132a66 10 0 0 1-132 0z"/>` +
      `<path class="bn-dsh" d="M${x - 50} ${ty + 1.5}a66 10 0 0 0 100 0"/>` +
      `<path class="bn-pgl" d="M${x - 58} ${ty - 3}h36"/>${trayItems(p, cs, kk, x, ty - 6, known, bad)}</g>`;
    return `<svg class="bn-sv" viewBox="0 0 ${W.box} ${h}" role="img" aria-label="Scale ${k + 1}">` +
      `<path class="bn-stand" d="M${cx - 5} ${py}h10l18 ${h - py - 8}h-46z"/>` +
      `<path class="bn-sts" d="M${cx + 2} ${py}h3l18 ${h - py - 8}h-11z"/>` +
      `<rect class="bn-base" x="${cx - 48}" y="${h - 10}" width="96" height="9" rx="4.5"/>` +
      `<g transform="translate(${cx} ${py})"><g class="bn-arm">` +
      `<rect class="bn-beam" x="${-half - 12}" y="-5.5" width="${2 * half + 24}" height="11" rx="5.5"/>` +
      `<path class="bn-bsh" d="M${-half - 4} 3h${2 * half + 8}"/><path class="bn-bgl" d="M${-half - 4} -2.5h${half - 24}"/>` +
      `<path class="bn-nd" d="M0 -6V-26"/></g>` +
      `<circle class="bn-pin" r="7"/><circle class="bn-pgl2" cx="-2" cy="-2" r="2"/></g>` +
      tray('l', cx - half, e.l, e.lc) + tray('r', cx + half, e.r, e.rc) + '</svg>';
  }
  function mountBal(el, p, api) {
    const st = api.loadState() || { done: [], hinted: [], sel: 0, miss: 0 };
    const k = kit(el, api), slots = BAL.slots(p);
    let typed = '', marks = { eqs: [], slot: null }, guess = null; // guess: {e, i, w, dir} a wrong number tried on scale e
    const open = () => slots.filter(s => !st.done.includes(s));
    if (!open().some(s => String(s) == String(st.sel))) st.sel = open()[0];
    const known = () => p.v.map((x, i) => st.done.includes(i) ? x : null);
    const maxLen = 3;
    const nm = i => BAL.nm(p, i, 1);
    const slotBtn = s => {
      const done = st.done.includes(s), sel = String(s) == String(st.sel);
      const face = done ? BAL.answer(p, s) : sel && typed ? typed : '?';
      const cls = 'bn-slot' + (done ? (st.hinted.includes(s) ? ' ok hn' : ' ok') : '') + (sel && !done ? ' sel' : '') +
        (String(marks.slot) == String(s) ? ' hl' : '');
      const aria = s === 'q' ? 'Answer' : 'Weight of the ' + nm(s);
      return `<button class="${cls}" data-s="${s}" aria-label="${aria}"${done ? ' aria-disabled="true"' : ''}>${face}</button>`;
    };
    const drawSlots = () => {
      let h = p.v.map((x, i) => `<span class="bn-sg">${picArt(p.f[i], 34)}<b aria-hidden="true">=</b>${slotBtn(i)}</span>`).join('');
      if (p.q) {
        const terms = p.q.c.map((c, i) => c ? picArt(p.f[i], 30) + (c > 1 ? `<b class="bn-x">× ${c}</b>` : '') : '').filter(Boolean);
        h += `<span class="bn-sg bn-qq">${terms.join('<b>+</b>')}<b aria-hidden="true">=</b>${slotBtn('q')}</span>`;
      }
      el.querySelector('.bn-slots').innerHTML = h;
      el.querySelectorAll('.bn-slot:not(.ok)').forEach(b => b.onclick = () => {
        SFX.click();
        unTip();
        st.sel = b.dataset.s == 'q' ? 'q' : +b.dataset.s;
        typed = '';
        api.saveState(st);
        drawSlots();
      });
    };
    const drawScales = () => {
      const kn = known();
      el.querySelector('.bn-scs').innerHTML = p.eqs.map((e, i) => {
        const g = guess && guess.e == i, kk = g ? kn.map((x, j) => j == guess.i ? guess.w : x) : kn;
        return `<div class="bn-sc${marks.eqs.includes(i) ? ' hl' : ''}" data-e="${i}">${scaleSVG(p, e, i, kk, g ? guess.i : -1)}</div>`;
      }).join('');
      const sc = guess && el.querySelector(`.bn-sc[data-e="${guess.e}"]`);
      if (sc && guess.dir) {
        void sc.getBoundingClientRect(); // so the arm turns from level
        sc.classList.add(guess.dir < 0 ? 'tl' : 'tr');
      }
    };
    // the next tap after a wrong guess sets the scale level again, then takes the guess off it
    const unTip = () => {
      if (!guess) return;
      const sc = el.querySelector(`.bn-sc[data-e="${guess.e}"]`);
      guess = null;
      if (sc) sc.classList.remove('tl', 'tr');
      k.later(() => { if (!guess) drawScales(); }, 650);
    };
    const ask = {
      A: `How much does one ${nm(0)} weigh?`,
      C: 'How much does each picture weigh? Then answer the last question.',
      D: 'The scales are level. How much does each picture weigh?',
    }[api.band] || 'How much does each picture weigh?';
    el.innerHTML = frame('bal', `<div class="bn-scs n${p.eqs.length}"></div>`, `<div class="bn-slots"></div>${pad()}`);
    k.bind();
    k.say(st.done.length ? 'Keep going!' : ask, '', api.band == 'A' || (api.band == 'B' && !st.done.length)); // R-01b: band B speaks its first instruction too
    drawScales();
    drawSlots();
    const fill = s => {
      st.done.push(s);
      typed = '';
      st.sel = open()[0];
      api.saveState(st);
      drawScales();
      drawSlots();
      if (!open().length) {
        k.say('Every scale balances. You solved it!', 'good');
        el.querySelector('.bn-scs').classList.add('win');
        api.win({ mistakes: st.miss });
      }
    };
    k.keys(key => {
      if (st.sel == null || !open().length) return;
      unTip();
      const t = typeKey(typed, key, maxLen);
      if (t != null) { typed = t; return drawSlots(); }
      if (!typed) return k.say('Type a number first, then tap the tick.', 'try');
      marks = { eqs: [], slot: null };
      const want = BAL.answer(p, st.sel), got = +typed;
      if (got == want) {
        SFX.right();
        k.say(st.sel === 'q' ? 'Yes!' : `Yes! One ${nm(st.sel)} weighs ${want}.`, 'good');
        return fill(st.sel);
      }
      SFX.wrong();
      st.miss++;
      api.saveState(st);
      typed = '';
      if (st.sel === 'q') k.say(`Not ${got}. Put each weight in and add again.`, 'try');
      else {
        const e = BAL.tryOn(p, st.done.filter(s => s !== 'q'), st.sel), dir = BAL.tip(p, e, st.sel, got);
        const heavy = dir == 0 ? '' : (BAL.net(p.eqs[e], st.sel) > 0) == (dir < 0) ? 'too heavy' : 'too light';
        k.say(`With ${got} the scale tips: that is ${heavy}. Try again.`, 'try');
        guess = { e, i: st.sel, w: got, dir };
        drawScales();
      }
      drawSlots();
      k.shake(el.querySelector(`.bn-slot[data-s="${st.sel}"]`));
    });
    return {
      hint(tier) {
        const h = BAL.hint(p, st, tier);
        if (!h) return false;
        guess = null;
        marks = h.mark;
        if (h.fill != null) {
          st.hinted.push(h.fill);
          k.say(h.say, 'hint', true);
          fill(h.fill);
        } else {
          if (h.mark.slot != null && !st.done.includes(h.mark.slot)) { st.sel = h.mark.slot; typed = ''; }
          drawScales();
          drawSlots();
          k.say(h.say, 'hint', true);
        }
        return true;
      },
      destroy: k.destroy,
    };
  }

  /* ---------- make the number screen ---------- */
  function mountTgt(el, p, api) {
    const st = api.loadState() || TGT.fresh(p);
    const k = kit(el, api);
    let pick = null, op = null, marks = [], busy = false;
    const goal = `<div class="bn-goal" role="img" aria-label="Make ${p.target}"><span class="bn-ring"><b>${p.target}</b></span></div>`;
    const opsH = p.ops.split('').map(o =>
      `<button class="bn-op" data-op="${o}" aria-label="${TGT.NAME[o]}">${ico(TGT.ICON[o], 30)}</button>`);
    el.innerHTML = frame('tgt', `${goal}<div class="bn-tiles n${p.nums.length}" role="group" aria-label="Number tiles"></div>` +
      `<div class="bn-ops">${opsH.join('')}</div>`,
      `<ol class="bn-trail" aria-label="Your steps"></ol><div class="bn-acts">${UI.btn('Undo', { icon: 'undo', cls: 'bn-undo' })}</div>`);
    k.bind();
    const intro = p.use == 2 ? `Pick two numbers and + or − to make ${p.target}.`
      : `Use every number once to make ${p.target}. Tap a number, a sign, then another number.`;
    k.say(st.hist.length ? 'Keep going!' : intro, '', api.band == 'A' || (api.band == 'B' && !st.hist.length)); // R-01b: band B speaks its first instruction too
    const draw = () => {
      el.querySelector('.bn-undo').classList.remove('hl');
      el.querySelector('.bn-tiles').innerHTML = st.tiles.map(t => `<button class="bn-tile${t.id == pick ? ' sel' : ''}` +
        `${t.id >= p.nums.length ? ' made' : ''}` +
        `${marks.includes(t.id) ? ' hl' : ''}" data-t="${t.id}" aria-label="${t.v}"><b>${t.v}</b></button>`).join('');
      el.querySelectorAll('.bn-op').forEach(b => b.classList.toggle('sel', b.dataset.op == op));
      el.querySelector('.bn-trail').innerHTML = st.hist.map(h => {
        const r = st.tiles.find(t => t.id == h.r) || { v: TGT.calc(h.a.v, h.op, h.b.v) };
        return `<li>${h.a.v} ${TGT.SIGN[h.op]} ${h.b.v} = <b>${r.v}</b></li>`;
      }).join('');
      el.querySelector('.bn-undo').disabled = !st.hist.length || busy;
      el.querySelectorAll('.bn-tile').forEach(b => b.onclick = () => tapTile(+b.dataset.t));
    };
    const save = () => api.saveState(st);
    const afterJoin = r => {
      if (TGT.won(p, st)) {
        SFX.right();
        k.say(`You made ${p.target}!`, 'good');
        busy = true;
        draw();
        el.querySelector('.bn-tiles').classList.add('win');
        return api.win({ mistakes: st.miss });
      }
      if (p.use == 2 || st.tiles.length == 1) { // used up, and not the target: a mistake; the tiles come back
        SFX.wrong();
        st.miss++;
        save();
        busy = true;
        k.say(`That makes ${r.v}, not ${p.target}. Try again!`, 'try');
        k.shake(el.querySelector(`.bn-tile[data-t="${r.id}"]`));
        return k.later(() => {
          busy = false;
          while (st.hist.length) TGT.undo(st);
          save();
          draw();
        }, 1300);
      }
      SFX.pop();
      if (st.tiles.some(t => t.v == p.target)) k.say(`That is ${p.target}, but use every number!`, '');
      else k.say(`${r.v}! ${st.tiles.length} numbers left.`, '');
    };
    function tapTile(id) {
      if (busy) return;
      if (pick == null || op == null) {
        SFX.click();
        pick = pick == id ? null : id;
        return draw();
      }
      if (pick == id) { pick = null; op = null; return draw(); }
      const r = TGT.join(st, pick, op, id);
      if (r.err) {
        SFX.wrong();
        k.say(r.err == 'neg' ? 'That would go below zero. Try the bigger number first.'
          : 'That does not share out evenly. Try other numbers.', 'try');
        k.shake(el.querySelector(`.bn-tile[data-t="${id}"]`));
        pick = null;
        op = null;
        return draw();
      }
      pick = null;
      op = null;
      marks = [];
      save();
      draw();
      afterJoin(r);
    }
    el.querySelectorAll('.bn-op').forEach(b => b.onclick = () => {
      if (busy) return;
      if (pick == null) return k.say('Tap a number first.', 'try');
      SFX.click();
      op = op == b.dataset.op ? null : b.dataset.op;
      draw();
    });
    el.querySelector('.bn-undo').onclick = () => {
      if (busy || !TGT.undo(st)) return;
      SFX.del();
      pick = null;
      op = null;
      save();
      draw();
      k.say('One step back.', '');
    };
    draw();
    return {
      hint(tier) {
        if (busy) return false;
        const h = TGT.hint(p, st, tier);
        if (!h) return false;
        marks = h.mark;
        pick = null;
        op = null;
        if (h.step) {
          if (h.reset) while (st.hist.length) TGT.undo(st);
          const r = TGT.join(st, ...h.step);
          marks = [r.id];
          save();
          draw();
          k.say(h.say, 'hint', true);
          if (TGT.won(p, st)) afterJoin(r);
          return true;
        }
        draw();
        if (h.undo) el.querySelector('.bn-undo').classList.add('hl');
        k.say(h.say, 'hint', true);
        return true;
      },
      destroy: k.destroy,
    };
  }

  return { PYR, BAL, TGT, ri, shuf, mountPyr, mountBal, mountTgt, scaleSVG };
})();

BT.reg({
  id: 'pyramid', name: 'Number Pyramid', icon: 'blocks', bands: 'BCD',
  rules: 'Each brick is the two bricks under it added together. Find the missing bricks.',
  make: (band, level, rnd) => BTN.PYR.make(band, level, rnd),
  mount: (el, p, api) => BTN.mountPyr(el, p, api),
  solve: p => BTN.PYR.solve(p),
});
BT.reg({
  id: 'balance', name: 'Balance', icon: 'scale', bands: 'ABCD',
  rules: 'The scales are level, so both sides weigh the same. Find what each picture weighs.',
  make: (band, level, rnd) => BTN.BAL.make(band, level, rnd),
  mount: (el, p, api) => BTN.mountBal(el, p, api),
  solve: p => BTN.BAL.solve(p),
});
BT.reg({
  id: 'target', name: 'Make the Number', icon: 'target', bands: 'BCD',
  rules: 'Join the numbers with the signs to make the number in the circle.',
  make: (band, level, rnd) => BTN.TGT.make(band, level, rnd),
  mount: (el, p, api) => BTN.mountTgt(el, p, api),
  solve: p => BTN.TGT.solve(p),
});
