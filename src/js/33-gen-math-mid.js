/* ---------- mid-grade math generators (P2-05: Multiply Mountain, CURRICULUM M-3a) ----------
   arr 2        arrays: pick the multiplication sentence, or the swapped fact (4 x 6 = 6 x ?)
   mfact 1-4    multiplication facts, by key factor, then all of them (level 4 adds missing factors)
   dfact 1-4    division facts (dividend = divisor x answer), level 4 adds missing numbers
   mbig 1       one digit times a multiple of 10 or 100
   story 5      one-step multiply or divide word problems within 100 (levels 1-3 stay in genStory, 30-gen-math.js)
   Levels arr 1 and story 4 belong to P2-04 (Treasure Bay). Until that ships, arr 1 asks like arr 2 and story 4 like story 5. */

const MF_KEYS = [[0, 1, 2, 5, 10], [3, 4], [6, 7, 8, 9]]; // key factors taught at mfact levels 1, 2, 3
const DF_KEYS = [[1, 2, 5, 10], [3, 4], [6, 7, 8, 9]];    // divisors taught at dfact levels 1, 2, 3

// One fact question. op is '×' or '÷'; blank is the part the child types ('a', 'b' or 'c').
function facQ(a, op, b, c, blank, vert, hint) {
  const v = {a, b, c}, f = k => k === blank ? SLOT : v[k];
  const html = vert && op == '×' && blank == 'c'
    ? `<div class="veq"><div>${a}</div><div><span class="op">${op}</span>${b}</div><div class="bar"></div><div>${SLOT}</div></div>`
    : `<div class="eq">${f('a')} ${op} ${f('b')} = ${f('c')}</div>`;
  const w = op == '×' ? 'times' : 'divided by', sw = k => k === blank ? 'what' : v[k];
  return {kind: 'num', html, say: `${sw('a')} ${w} ${sw('b')} equals ${sw('c')}?`, ans: String(v[blank]), hint,
    label: `${blank == 'a' ? '?' : a} ${op} ${blank == 'b' ? '?' : b} = ${blank == 'c' ? '?' : c}`};
}

// Hint for a times fact: skip-count row, or a neighbour fact for the hard 6-9 facts.
function mfHint(a, b) {
  const x = Math.max(a, b), y = Math.min(a, b);
  if (y == 0) return {k: 'text', s: 'Zero groups, or groups of zero. How many is that?'};
  if (y == 1) return {k: 'text', s: `Just one group of ${x}. How many is that?`};
  if (y <= 5 || x == 10) {
    const row = Array.from({length: y - 1}, (_, i) => x * (i + 1)).join(', ');
    return {k: 'text', s: `Skip count by ${x}s, ${y} times: ${row}, ?`};
  }
  return {k: 'text', s: `Use a fact you know: ${y} × ${x - 1} = ${y * (x - 1)}. One more ${y} makes ${y} × ${x}.`};
}

function genMfact(lv) {
  if (lv > 1 && lv < 4 && rnd() < .2) lv = R(1, lv - 1); // 20% review of the easier levels
  let a, b;
  if (lv == 4 && rnd() < .35) { // missing factor: 6 × ? = 42 (both factors at least 2, so the answer is the only one)
    a = R(2, 10); b = R(2, 10);
    const blank = coin() ? 'b' : 'a', known = blank == 'b' ? a : b;
    return facQ(a, '×', b, a * b, blank, false, {k: 'text', s: `Think: ${known} times what makes ${a * b}? Count by ${known}s.`});
  }
  if (lv == 1) {a = pick(MF_KEYS[0]); b = R(0, 10)}
  else if (lv == 2) {a = pick(MF_KEYS[1]); b = R(0, 10)}
  else if (lv == 3) {a = pick(MF_KEYS[2]); b = R(2, 10)}
  else {a = R(0, 10); b = R(0, 10)}
  if (coin()) [a, b] = [b, a];
  return facQ(a, '×', b, a * b, 'c', coin(), mfHint(a, b));
}

function genDfact(lv) {
  const d = pick(lv < 4 ? DF_KEYS[lv - 1] : [2, 3, 4, 5, 6, 7, 8, 9, 10]), q = R(1, 10), n = d * q;
  if (lv == 4 && rnd() < .35) {
    if (coin()) return facQ(n, '÷', d, q, 'a', false, {k: 'text', s: `Think: ${d} times ${q} makes the number we want. What is it?`});
    return facQ(n, '÷', d, q, 'b', false, {k: 'text', s: `Think: what times ${q} makes ${n}?`});
  }
  return facQ(n, '÷', d, q, 'c', false, {k: 'text', s: `Think: ${d} times what makes ${n}?`});
}

function genMbig(lv) {
  const a = R(2, 9), t = R(1, 9), tens = coin(), b = t * (tens ? 10 : 100);
  const hint = {k: 'text', s: `Do ${a} × ${t} first. Then add ${tens ? 'one zero' : 'two zeros'} on the end.`};
  if (coin()) return facQ(a, '×', b, a * b, 'c', true, hint);
  const q = facQ(b, '×', a, a * b, 'c', coin(), hint); // big number first: 40 × 6
  return q;
}

// Arrays: the multiplication sentence, or the swapped fact.
function genArr(lv) {
  const r = R(2, 6);
  let c = R(2, 9);
  if (c == r) c = c == 9 ? 8 : c + 1;
  if (coin()) { // swapped fact: r rows of c dots, r × c = c × ?
    return {kind: 'num', html: `${VIZ.array(r, c)}<div class="eq" style="font-size:.7em">${r} × ${c} = ${c} × ${SLOT}</div>`,
      say: `${r} times ${c} equals ${c} times what?`, ans: String(r), label: `${r} × ${c} = ${c} × ?`,
      hint: {k: 'text', s: `Turn the array on its side. ${c} rows of ${r}. How many dots in each row now?`}};
  }
  const sent = [`${r} × ${c} = ${r * c}`, `${r} + ${c} = ${r + c}`, `${r + 1} × ${c} = ${(r + 1) * c}`, `${r} × ${r} = ${r * r}`];
  const seen = new Set(), ch = [];
  for (const s of sent) if (!seen.has(s)) {seen.add(s); ch.push({l: s, v: s})}
  return {kind: 'choice', html: `${VIZ.array(r, c)}<div class="sub">Which sentence matches the array?</div>`,
    say: `There are ${r} rows of ${c} dots. Which sentence matches the array?`, ans: sent[0], choices: shuffle(ch),
    hint: {k: 'text', s: `Count the rows: ${r}. Count the dots in one row. Rows times dots in a row.`}, label: `array ${r} × ${c}`};
}

// One-step times or divide stories within 100: equal groups, arrays, sharing (4 templates each).
function genStoryMul(lv) {
  const me = S.name || 'Sam', n2 = pick([S.buddy, S.buddy, petN(), ...NAMES].filter(n => n && n !== me));
  const th = pick(THINGS)[0], who = pick([me, n2]);
  let t, ans, hint, label;
  if (coin()) { // times: a groups of b
    const a = R(2, 9), b = R(2, Math.min(10, Math.floor(100 / a)));
    t = pick([
      `${who} has ${a} bags. Each bag has ${b} ${th}. How many ${th} in all?`,
      `${who} puts ${th} in ${a} rows. There are ${b} in each row. How many ${th} in all?`,
      `${a} friends each get ${b} ${th}. How many ${th} do they have all together?`,
      `A box holds ${b} ${th}. ${who} has ${a} boxes. How many ${th} does ${who} have?`]);
    ans = a * b; label = `story ${a} × ${b}`;
    hint = {k: 'text', s: `Make ${a} groups of ${b}. Count by ${b}s, ${a} times.`};
  } else { // divide: n shared into d groups
    const d = R(2, 10), q = R(2, Math.min(10, Math.floor(100 / d))), n = d * q;
    t = pick([
      `${n} ${th} are shared equally by ${d} friends. How many ${th} does each friend get?`,
      `${who} puts ${n} ${th} into bags, ${d} in each bag. How many bags is that?`,
      `There are ${n} ${th} in ${d} equal rows. How many ${th} are in each row?`,
      `${who} has ${n} ${th} and makes ${d} equal groups. How many ${th} are in each group?`]);
    ans = q; label = `story ${n} ÷ ${d}`;
    hint = {k: 'text', s: `Think: ${d} times what makes ${n}?`};
  }
  return {kind: 'num', html: `<p class="story">${words(t)}</p><div>${SLOT}</div>`, say: t, auto: true, ans: String(ans), hint, label};
}
const genStoryAll = lv => lv <= 3 ? genStory(lv) : genStoryMul(lv);
