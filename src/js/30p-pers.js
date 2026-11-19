/* ---------- PERS-01: story problems about the child's interests (part gen) ----------
   A grown-up (or the child) picks up to 3 interests (S.ints, ids; 39p-pers.js draws the picker). The words of each interest are
   written at authoring time and approved by the owner: docs/drafts/pers/<id>.md, copied by tools/build.py into 39q-persw.js (PERSW,
   part hints, loaded as a Practice round starts) only when its status says "reviewed". Nothing is made up on the tablet.
   An interest has things (objects a child can hold, pack and share: [plural, singular, drawing, emoji]) and, for the story kinds of
   levels 1-3, its own sentences with {slots}. The math never changes: the generator draws exactly as before (the same rnd() calls,
   numbers, answer, label and hint steps); only its nouns and sentence change. A question with no reviewed interest (none picked,
   none reviewed, or the hints part not loaded yet) is the default question, word for word. tools/test.js "story themes PERS-01". */

// the child's interests that have reviewed words, in the order picked ([] when none: the default problems)
function persOn() {
  if (typeof PERSW == 'undefined' || !S || !Array.isArray(S.ints)) return [];
  return S.ints.filter(id => PERSW[id] && Array.isArray(PERSW[id].things) && PERSW[id].things.length);
}
/* The thing of a story: the generator's own pick(THINGS) entry, or a themed one in THINGS' shape [plural, emoji, singular, drawing].
   The entry's index chooses the interest and its thing, so no rnd() call is added. A themed entry carries its sentences (st). */
function persTh(th) {
  const on = persOn(), i = THINGS.indexOf(th);
  if (!on.length || i < 0) return th;
  const P = PERSW[on[i % on.length]], x = P.things[i % P.things.length], t = [x[0], x[3] || '', x[1], x[2] || x[1]];
  t.st = P.st || {};
  return t;
}
/* The sentence of a story. def: the default sentences (an array: chosen with one rnd() call, as pick() does) or the one default
   sentence (a string: no call). A themed thing with its own sentences for this kind uses one of them instead, chosen by the same
   draw (one sentence: by the numbers), with its {slots} filled from v. */
function stT(th, kind, def, v) {
  const arr = Array.isArray(def), r = arr ? rnd() : 0, L = th.st && th.st[kind];
  if (!L || !L.length) return arr ? def[Math.floor(r * def.length)] : def;
  const n = Object.values(v).reduce((s, x) => s + (typeof x == 'number' ? x : 0), 0);
  return persFill(L[arr ? Math.floor(r * L.length) : n % L.length], th, v);
}
/* Fill a themed sentence: {who} {other} names, {a} a number, {a things} a number with the thing ("1 drum", "3 drums"), {pl} the
   plural, {an} the singular with "a" or "an". Each sentence starts with a capital letter. */
function persFill(t, th, v) {
  const an = w => (/^[aeiou]/i.test(w) ? 'an ' : 'a ') + w;
  const s = String(t).replace(/\{(\w+)( things)?\}/g, (m, k, n) =>
    n ? qN(v[k], th[2], th[0]) : k == 'pl' ? th[0] : k == 'an' ? an(th[2]) : k in v ? String(v[k]) : m);
  return s.replace(/(^|[.?!] )([a-z])/g, (m, a, b) => a + b.toUpperCase());
}
