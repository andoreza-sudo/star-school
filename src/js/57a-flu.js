/* ---------- Fact Sprint (P5-01): 60 seconds or 20 facts, beat your best ---------- */
/* Saved in S.flu = {key: {best, hist: [[day, sec, right]] (last 30)}}.
   key is the set id ('add10') for the 60-second mode and set id + '-20' ('add10-20') for the 20-facts mode.
   best is the most right answers (60 s) or the fastest seconds (20 facts). Missing fields are read with defaults.
   S.flu[set].paid holds the day game time was last earned for that set. */
// Highest level (1-4) of a math skill the child has passed, 0 when none.
const fluLv = sk => [4, 3, 2, 1].find(l => passedAny('math', sk, l)) || 0;
// R-01b: a set that opens with stop (sk, lv) opens once that stop, or any later stop of the same skill on the math path, is passed,
// or its world was skipped (placement, test out). passedAny counted any level at or above lv anywhere, so Kindergarten's
// "Add to 5" (add 4, before "Adding to 10") opened the sums to 10 and to 20.
function fluFrom(sk, lv) {
  const N = NODES.math || [], a = N.findIndex(n => n.sk == sk && n.lv == lv);
  if (a < 0) return passedAny('math', sk, lv);
  if (worldSkipped('math', N[a].wi)) return true;
  for (let i = a; i < N.length; i++) if (N[i].sk == sk && passed('math', i)) return true;
  return false;
}
const FLU = {
  GOAL: 20, SECS: 60, KEEP: 30, MIN_RIGHT: 5,
  // Sets. `ok` says whether the child has reached the matching skill; mul/div sets are added here later (P2-05).
  SETS: [
    {id: 'add10', e: '➕', t: 'Adding to 10', ok: () => fluFrom('add', 1), // R-01b: after the first adding stop (was always open)
      gen: () => {const a = R(1, 9), b = R(1, 10 - a); return {a, op: '+', b, c: a + b}}},
    {id: 'sub10', e: '➖', t: 'Take away from 10', ok: () => passedAny('math', 'sub', 1),
      gen: () => {const a = R(2, 10), b = R(1, a); return {a, op: '−', b, c: a - b}}},
    {id: 'add20', e: '➕', t: 'Adding to 20', ok: () => fluFrom('add', 2),
      gen: () => {const a = R(1, 10), b = R(Math.max(1, 11 - a), 10); return {a, op: '+', b, c: a + b}}},
    {id: 'sub20', e: '➖', t: 'Take away from 20', ok: () => passedAny('math', 'sub', 2),
      gen: () => {const a = R(11, 20), b = R(1, Math.min(10, a - 1)); return {a, op: '−', b, c: a - b}}},
    // Times and divide facts (P2-05). The facts grow with the highest level of the matching skill the child has passed.
    {id: 'mfact', e: '✖️', t: 'Times facts', ok: () => passedAny('math', 'mfact', 1),
      gen: () => {
        const l = fluLv('mfact'), keys = MF_KEYS.slice(0, Math.max(1, l)).flat();
        let a = l >= 4 ? R(0, 10) : pick(keys), b = R(0, 10);
        if (coin()) [a, b] = [b, a];
        return {a, op: '×', b, c: a * b};
      }},
    {id: 'dfact', e: '÷', t: 'Divide facts', ok: () => passedAny('math', 'dfact', 1),
      gen: () => {
        const l = fluLv('dfact'), d = l >= 4 ? R(1, 10) : pick(DF_KEYS.slice(0, Math.max(1, l)).flat()), q = R(1, 10);
        return {a: d * q, op: '÷', b: d, c: q};
      }},
  ],
  set: id => FLU.SETS.find(s => s.id == id),
  sets: () => FLU.SETS.filter(s => s.ok()),
  // R-01b (R-01 practice review, Must 1): timed fact practice is for facts a child already knows by a strategy, from grade 1. Fact
  // Sprint shows (Home tile, daily mission) from grade 1 once a set is open; Pre-K and K never see it, nor a save with no grade
  // (audit v195: gradeOf() makes it a Kindergartner everywhere else).
  on: () => gradeOf() >= 1 && FLU.sets().length > 0,
  key: (set, mode) => mode == 'n20' ? set + '-20' : set,
  fkey: f => f.a + f.op + f.b,
  // Next fact for a sprint. st = {set, last, redo: [{f, wait}]}. A missed fact comes back after 3 other facts.
  // Never the same fact twice in a row.
  next: st => {
    st.redo.forEach(r => r.wait--);
    const i = st.redo.findIndex(r => r.wait <= 0 && FLU.fkey(r.f) != st.last);
    let f;
    if (i >= 0) f = st.redo.splice(i, 1)[0].f;
    else {
      const s = FLU.set(st.set);
      for (let t = 0; t < 40; t++) {f = s.gen(); if (FLU.fkey(f) != st.last) break}
    }
    st.last = FLU.fkey(f);
    return f;
  },
  miss: (st, f) => st.redo.push({f, wait: 4}),
  // Is v a new record? The first run always is; a tie is not.
  isRecord: (best, v, lower) => best == null || (lower ? v < best : v > best),
  // Store one finished sprint. Returns {rec, prev}.
  record: (flu, key, d, sec, right, lower) => {
    const e = flu[key] || (flu[key] = {best: null, hist: []});
    const v = lower ? sec : right, prev = e.best;
    const rec = FLU.isRecord(prev, v, lower);
    if (rec) e.best = v;
    e.hist = (e.hist || []).concat([[d, sec, right]]).slice(-FLU.KEEP);
    return {rec, prev};
  },
  // Game time in seconds: 1 min once per set per day, +1 min for any new record. A 60 s sprint needs MIN_RIGHT right answers.
  earn: (flu, set, d, rec, right, mode) => {
    if (mode != 'n20' && right < FLU.MIN_RIGHT) return 0;
    const base = flu[set] || (flu[set] = {best: null, hist: []});
    let t = 0;
    if (base.paid !== d) {t += 60; base.paid = d}
    if (rec) t += 60;
    return t;
  },
  // Pausing clock. Call with document.hidden; time spent hidden is not counted.
  tick: (c, now, hidden) => {
    if (!hidden) c.ms += now - c.last;
    c.last = now;
    return c.ms;
  },
  // Best value for each of the last 7 days (oldest first); null where the child did not play.
  week: (e, lower, now) => {
    const out = [];
    for (let i = 6; i >= 0; i--) {
      const dt = new Date(now || Date.now());
      dt.setDate(dt.getDate() - i);
      const k = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
      const v = ((e && e.hist) || []).filter(h => h[0] == k).map(h => lower ? h[1] : h[2]);
      out.push(v.length ? (lower ? Math.min(...v) : Math.max(...v)) : null);
    }
    return out;
  },
};

let FL = null; // the sprint being played
function stopFlu() {
  if (!FL) return;
  clearInterval(FL.iv);
  clearTimeout(FL.to);
  document.removeEventListener('visibilitychange', FL.vis);
  FL = null;
}
