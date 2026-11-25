/* ---------- TEACH-3b: the grade 3-5 math lessons TEACH-3 left out (part teach35, after 52n-bench3b.js; TEACH-PLAN-2 batch 3) ----------
   Each is a drafted lesson like the TEACH-3 ones (lsDraft3, 52i-bench35.js): its code here chooses every number, question, model and
   misconception code; its words are a draft in docs/drafts/<stop>.md that the owner reads (docs/drafts/BATCH3B-READ.md, the read-through
   of batch '3b'); until the owner approves a draft the lesson runs on its hand-written fallback words (the idea, tonight's question, a
   Name it line with the child's own numbers, each code's reason). D.b3b marks the lessons of this batch (tools/author.js --read --batch 3b).
   The stages, as in TEACH-3: 0 build on the model, 1 a picture and a typed answer (or a choice of four), 2 the symbols or the story
   alone; test (the show-me items and Show) is typed or built, never a choice of two. Check me is the pet's own answer on a stage 1
   question (petSt), wrong by the child's held idea or the lesson's codes, as in TEACH-3 (lsPetItem35). */
const ls3B = (id, t, g, o) => Object.assign(ls3(id, t, g, o), {b3b: 1});
const lsPk = (r, a) => a[Math.floor(r() * a.length)];
const ls3bStory = t => `<p class="story">${esc(t)}</p>`;
const LS3B_WHO = ['Ava', 'Leo', 'Mia', 'Sam', 'Zoe', 'Ben'];
const LS3B_THING = [['shells', 'shell'], ['stickers', 'sticker'], ['beads', 'bead'], ['apples', 'apple'], ['crayons', 'crayon'], ['cards', 'card']];
const LS3B_BOX = [['bag', 'bags'], ['box', 'boxes'], ['jar', 'jars'], ['tray', 'trays']];
const ls3bTS = (h, m) => `${h}:${String(m).padStart(2, '0')}`;
const ls3bFrWarm = D => r => { const d = lsRi(r, 3, 6), n = lsRi(r, 1, d - 1); return ls3FQ(D, 0, `${n}/${d}`, `<div class="pkq">${VIZ.fracBar(n, d)}</div>` + lsCap('What fraction is shaded?') + lsEq(SLOT_FRAC),
  'What fraction of the bar is shaded?', {sl: {}, hint: {k: 'text', s: 'All the parts on the bottom, the shaded parts on top.'}}); };
const LS3B_REM = {remember: ['a', 'b']}; // the times-fact warm-up's slots

/* ---- story problems: Story Problems 5 (times and dividing), Story Problems 6 (two steps), Remainder Stories, Fraction Stories ---- */
const LS3B_BRIEF_ST = `Explore: EXP (no slots in the task).
Name it: what they built; lines on it (NAME) and the idea: IDEA.
Together (no slots: each story has its own numbers and the app reads it out): line 1 before building the story's bar model, line 2 before a story with its bar model drawn (they type the answer), line 3 before a story alone.
Remember: a warm-up: WARM.
Show: two stories to solve, no help, inside a small job in the world (no slots).`;
const ls3bBrief = (o) => LS3B_BRIEF_ST.replace('EXP', o.exp).replace('NAME', o.name).replace('IDEA', o.idea).replace('WARM', o.warm || 'a times fact (slots {a} {b})');
function ls3bSt5(id, t, g, idea, home) {
  const D = ls3B(id, t, g, {petSt: 1, bugs: ['wrongOp', 'skip'], idea, home, fb: '{a} boxes of {b} make {sum}.',
    brief: ls3bBrief({exp: 'the child builds any bar model: how many boxes, and how many in each box, with steppers; the app says how many in all',
      name: 'slots {a}: the boxes, {b}: how many in each, {sum}: how many in all', idea: 'equal boxes make a times story; sharing a whole into equal boxes is a dividing story'}),
    slots: {remember: ['a', 'b'], explore: [], name: ['a', 'b', 'sum'], together: [], check: ['ans'], show: []}});
  D.q = (st, r) => {
    const who = lsPk(r, LS3B_WHO), [th] = lsPk(r, LS3B_THING), [box, boxes] = lsPk(r, LS3B_BOX), a = lsRi(r, 2, 9), b = lsRi(r, 2, 9), f = lsRi(r, 0, 2);
    const T = [`${who} has ${a} ${boxes} of ${b} ${th}. How many ${th} in all?`, `${who} puts ${a * b} ${th} in ${boxes} of ${b}. How many ${boxes}?`,
      `${who} shares ${a * b} ${th} into ${a} ${boxes}. How many in each ${box}?`][f];
    const ans = [a * b, a, b][f], bug = f == 0 ? {wrongOp: [a + b], skip: [a * b - b, a * b + b]} : {wrongOp: [a * b - (f == 1 ? b : a), a * b + (f == 1 ? b : a)], skip: [ans - 1, ans + 1].filter(x => x > 0)};
    const hint = {k: 'text', s: f == 0 ? `${a} boxes with ${b} in each: ${a} × ${b}.` : f == 1 ? `How many boxes of ${b} make ${a * b}? ${a * b} ÷ ${b}.` : `Share ${a * b} into ${a} equal boxes: ${a * b} ÷ ${a}.`};
    const pic = f == 0 ? ls3bTape(a, b, {tot: '?'}) : f == 1 ? ls3bTape(1, b, {tot: a * b, rest: 1}) : ls3bTape(a, b, {tot: a * b, q: 1});
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'tape', m: {g: a, n: b}, goal: 'groups', eq: 'value', ans: a * b, ansSay: `${a} boxes of ${b}`, sl: {}, bug: {}, hint,
      html: ls3bStory(T) + lsCap('Build the bar model: the boxes, and how many in each.'), say: T});
    return lsDq(D, Math.min(st, 2), {kind: 'num', ans, sl: {}, bug, hint, html: ls3bStory(T) + (st == 1 ? `<div class="pkq">${pic}</div>` : '') + SLOT, say: T});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'tape', m: {g: 3, n: 4}, goal: 'moved', eq: 'value', ans: 12, raw: 1, sl: {}, demo: [3, 5],
    html: lsCap('Build any bar model you like.'), say: 'Build any bar model. Pick the boxes, and how many go in each.'}), nudge: 'Change the boxes or how many in each, then check.',
  react: v => { const [a, b] = Array.isArray(v) ? v : [3, 5]; return {ctx: {a, b, sum: a * b}, lines: [`${qN(a, 'box', 'boxes')} of ${b} ${qW(a, 'makes', 'make')} ${a * b}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls3bTape(c.a, c.b, {tot: c.sum})}</div>` + lsEq(`${c.a} × ${c.b} = ${c.sum}`), sl: c});
  return D;
}
function ls3bSt6(id, t, g, idea, home) {
  const D = ls3B(id, t, g, {petSt: 1, bugs: ['oneStep', 'wrongOp'], idea, home, fb: '{a} boxes of {b} and {k} more make {sum}.',
    brief: ls3bBrief({exp: 'a bar model of equal boxes and one more box of {k}; the child picks the boxes and how many in each with steppers; the app says how many in all',
      name: 'slots {a}: the boxes, {b}: how many in each, {k}: the extra box, {sum}: how many in all', idea: 'a two-step story: first the equal boxes, then add or take away'}),
    slots: {remember: ['a', 'b'], explore: ['k'], name: ['a', 'b', 'k', 'sum'], together: [], check: ['ans'], show: []}});
  D.q = (st, r) => {
    const who = lsPk(r, LS3B_WHO), [th] = lsPk(r, LS3B_THING), [box, boxes] = lsPk(r, LS3B_BOX), a = lsRi(r, 2, 9), b = lsRi(r, 2, 9), add = r() < .5, c = lsRi(r, 2, Math.min(19, a * b - 1));
    const T = add ? `${who} has ${a} ${boxes} of ${b} ${th}, then finds ${c} more. How many now?`
      : `A shop has ${a} ${boxes} of ${b} ${th}. It sells ${c}. How many are left?`;
    const ans = add ? a * b + c : a * b - c, bug = {oneStep: [a * b], wrongOp: [add ? a * b - c : a * b + c, a + b + c]};
    const hint = {k: 'text', s: `Step 1: ${a} × ${b}. Step 2: ${add ? 'add' : 'take away'} ${c}.`}, ex = [c, add ? '+' : '−'];
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'tape', m: {g: a, n: b, ex}, goal: 'groups', eq: 'value', ans: a * b, ansSay: `${a} boxes of ${b}`, sl: {}, bug: {}, hint,
      html: ls3bStory(T) + lsCap('Step 1: build the equal boxes.'), say: T});
    return lsDq(D, Math.min(st, 2), {kind: 'num', ans, sl: {}, bug, hint, html: ls3bStory(T) + (st == 1 ? `<div class="pkq">${ls3bTape(a, b, {ex, tot: '?'})}</div>` : '') + SLOT, say: T});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'tape', m: {g: 3, n: 4, ex: [5, '+']}, goal: 'moved', eq: 'value', ans: 12, raw: 1, sl: {k: 5}, demo: [3, 4],
    html: lsCap('Build any bar model. One more box of 5 is there.'), say: 'Build any equal boxes. One more box of 5 is there too.'}), nudge: 'Change the boxes or how many in each, then check.',
  react: v => { const [a, b] = Array.isArray(v) ? v : [3, 4]; return {ctx: {a, b, k: 5, sum: a * b + 5}, lines: [`${qN(a, 'box', 'boxes')} of ${b} is ${a * b}, and 5 more make ${a * b + 5}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls3bTape(c.a, c.b, {ex: [c.k, '+'], tot: c.sum})}</div>` + lsEq(`${c.a} × ${c.b} + ${c.k} = ${c.sum}`), sl: c});
  return D;
}
function ls3bSt7(id, t, g, idea, home) {
  const D = ls3B(id, t, g, {petSt: 1, bugs: ['remDrop', 'remUp'], idea, home, fb: '{n} in groups of {b} is {a} groups, {k} left over.',
    brief: ls3bBrief({exp: 'the child picks a number and a group size with steppers; the app says how many full groups and how many are left over',
      name: 'slots {n}: the number, {b}: the group size, {a}: the full groups, {k}: left over', idea: 'divide, then ask what the leftovers mean: one more group, drop them, or the answer itself'}),
    slots: {remember: ['a', 'b'], explore: [], name: ['n', 'b', 'a', 'k'], together: [], check: ['ans'], show: []}});
  D.q = (st, r) => {
    const who = lsPk(r, LS3B_WHO), [th] = lsPk(r, LS3B_THING), [box, boxes] = lsPk(r, LS3B_BOX), s = lsRi(r, 3, 9), q = lsRi(r, 2, 9), m = lsRi(r, 1, s - 1), T = s * q + m, f = lsRi(r, 0, 2);
    const S = [`${T} kids, ${s} in each car. How many cars do they need?`, `${who} has ${T} ${th}. A full ${box} holds ${s}. How many full ${boxes}?`,
      `${who} puts ${T} ${th} in ${boxes} of ${s}. How many are left over?`][f];
    const ans = [q + 1, q, m][f], tgt = f == 0 ? q + 1 : q, bug = f == 1 ? {remUp: [q + 1]} : {remDrop: [q]};
    const hint = {k: 'text', s: `${T} ÷ ${s} = ${q} R ${m}. ${['Everyone needs a seat: the leftovers need one more.', 'Only full ones count.', 'The leftover is the answer.'][f]}`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'left', m: {T, s, target: tgt}, goal: 'value', eq: 'value', ans: tgt, sl: {}, bug: f == 1 ? {remUp: [q + 1]} : f == 0 ? {remDrop: [q]} : {remUp: [q + 1]}, hint,
      html: ls3bStory(S) + lsCap(['Make enough cars for everyone.', `Make only the full ${boxes}.`, `Make the full ${boxes} of ${s}.`][f]), say: S});
    return lsDq(D, Math.min(st, 2), {kind: 'num', ans, sl: {}, bug, hint, html: ls3bStory(S) + (st == 1 ? `<div class="pkq">${ls3bLeft(T, s, q)}</div>` + lsEq(`${T} ÷ ${s} = ${q} R ${m}`) : '') + SLOT, say: S});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'pickn', m: {v: [26, 4], lo: [10, 2], hi: [60, 9], ds: [[1, 10], [1]], lab: ['Number', 'Group size'], fmt: s => `${s[0]} in groups of ${s[1]}`},
    raw: 1, goal: 'mine', eq: 'value', ans: 1, sl: {}, html: lsCap('Pick a number and a group size.'), say: 'Pick a number to put into groups, and the size of each group.'}), nudge: 'Change a number, then check.',
  react: v => { const [n, b] = Array.isArray(v) ? v : [26, 4], a = Math.floor(n / b), k = n % b; return {ctx: {n, b, a, k}, lines: [`${n} in groups of ${b} is ${a} groups, and ${k} left over.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls3bLeft(c.n, c.b, c.a)}</div>` + lsEq(`${c.n} ÷ ${c.b} = ${c.a} R ${c.k}`), sl: c});
  return D;
}
function ls3bSt8(id, t, g, idea, home) {
  const D = ls3B(id, t, g, {petSt: 1, bugs: ['unitOnly', 'fracTop'], idea, home, fb: '{a} parts of {n} cut in fourths make {sum}.',
    brief: ls3bBrief({exp: 'a bar of {n} cut into fourths; the child shades any parts', name: 'slots {n}: the whole amount, {a}: the parts shaded, {sum}: what they are worth',
      idea: 'a fraction of an amount: divide by the bottom number to find one part, then take as many parts as the top number', warm: 'name a shaded fraction (no slots)'}),
    slots: {remember: [], explore: ['n'], name: ['n', 'a', 'sum'], together: [], check: ['ans'], show: []}});
  D.q = (st, r) => {
    const who = lsPk(r, LS3B_WHO), d = lsRi(r, 3, 6), n = lsRi(r, 2, d - 1), u = lsRi(r, 2, 9), T = d * u, f = lsRi(r, 0, 2), F = `${n}/${d}`, Fs = ls3Frs(n, d);
    const S = [`A class has ${T} kids. ${F} of them walk to school. How many walk?`, `A book has ${T} pages. ${who} reads ${F} of it. How many pages?`,
      `A rope is ${T} meters long. ${who} uses ${F} of it. How many meters?`][f];
    const ans = n * u, bug = {unitOnly: [u], fracTop: [T * n]}, hint = {k: 'text', s: `One ${FC_NAMES[d]} of ${T} is ${T} ÷ ${d} = ${u}. Then ${n} of them.`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'parts', m: {shape: 'bar', d, whole: 1}, eq: 'value', ans: F, sl: {}, bug: {}, hint,
      html: ls3bStory(S) + lsCap(`Shade ${F} of the bar.`), say: S.replace(F, Fs).replace(/ How many [a-z]+\?$/, ` Shade ${Fs} of the bar.`), ansSay: Fs}); // WORDS-MATH W71: the voice gives the task on the screen
    return lsDq(D, Math.min(st, 2), {kind: 'num', ans, sl: {}, bug, hint, html: ls3bStory(S) + (st == 1 ? `<div class="pkq">${ls3bFracTape(T, d, n)}</div>` : '') + SLOT, say: S.replace(F, Fs)});
  };
  D.warm = ls3bFrWarm(D);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'parts', m: {shape: 'bar', d: 4, whole: 1}, eq: 'value', goal: 'some', ans: '1/4', sl: {n: 20}, demo: '3/4',
    html: lsEq(20) + lsCap('This bar is 20, cut into fourths. Shade any parts.'), say: 'This bar is 20, cut into fourths. Shade any parts you like.'}), nudge: 'Shade a part or more, then check.',
  react: v => { const a = Math.round(k2Val(v) * 4); return {ctx: {n: 20, a, sum: 5 * a}, lines: [`${qN(a, 'fourth')} of 20 is ${5 * a}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${VIZ.fracBar(c.a, 4, {w: 240})}</div>` + lsEq(`${ls3Fr(c.a, 4)} of ${c.n} = ${c.sum}`), sl: c});
  return D;
}

/* ---- graphs: Scaled Graphs (a bar or picture graph whose lines count more than one), Line Plots (lengths in fourths, halves, eighths) ---- */
const LS3B_DATA = [['Pets', ['Cats', 'Dogs', 'Fish', 'Birds']], ['Fruit', ['Apples', 'Pears', 'Plums', 'Figs']], ['Sports', ['Soccer', 'Tennis', 'Swim', 'Bike']], ['Colors', ['Red', 'Blue', 'Green', 'Pink']]];
const LS3B_BRIEF_DATA3 = `Explore: a bar graph whose lines count {k}; the child builds any three bars with steppers.
Name it: the graph they built; lines on it (slots {k}: what each line counts, {a}: the tallest bar) and the idea: each line or picture stands for more than one, so count by the scale.
Together (line 1 slots {k} {a}; lines 2 and 3 have none, the value is the answer): line 1 before building one bar to show {a} on a graph whose lines count {k}, line 2 before reading a bar or picture graph (they type the number), line 3 before a key and a count in words only.
Remember: a warm-up: skip counting (slot {k}: the step).
Show: two graph questions to type, no help, inside a small job in the world (no slots).`;
function ls3bData3(id, t, g, idea, home) {
  const D = ls3B(id, t, g, {petSt: 1, bugs: ['scale', 'skip'], brief: LS3B_BRIEF_DATA3, idea, home, fb: 'Each line counts {k}. The tallest bar shows {a}.', test: 1,
    slots: {remember: ['k'], explore: ['k'], name: ['k', 'a'], together: [['k', 'a'], [], []], check: ['ans'], show: []}});
  D.q = (st, r) => {
    const [title, names] = lsPk(r, LS3B_DATA), sc = lsPk(r, [2, 5, 10]), ks = [1, 2, 3, 4, 5, 6].map(x => [r(), x]).sort((a, b) => a[0] - b[0]).slice(0, 4).map(x => x[1]), vals = ks.map(k => k * sc);
    const i = lsRi(r, 0, 3), j = (i + lsRi(r, 1, 3)) % 4, lc = k => names[k].toLowerCase(), head = `<div class="sub"><b>${title}</b></div>`;
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'graph', m: {names, vals, sc, top: 7, ed: [i], target: vals[i]}, goal: 'value', eq: 'value', ans: vals[i], sl: {k: sc, a: vals[i]}, bug: {},
      hint: {k: 'text', s: `Count by ${sc}s up the side to ${vals[i]}.`}, html: head + lsCap(`Each line counts ${sc}. Make the ${names[i]} bar show ${vals[i]}.`),
      say: `Each line on this graph counts ${sc}. Make the ${names[i]} bar show ${vals[i]}.`});
    if (st == 1) {
      const pic = r() < .5, g0 = pic ? VIZ.pictograph(names.map((x, k) => [x, vals[k]]), {per: sc, key: String(sc)}) : ls3bGraph(names, vals, sc, 7);
      const more = r() < .5, hi = vals[i] >= vals[j] ? i : j, lo = hi == i ? j : i;
      const ask = more ? `How many more chose ${lc(hi)} than ${lc(lo)}?` : `How many chose ${lc(i)}?`, ans = more ? vals[hi] - vals[lo] : vals[i];
      const bug = more ? {scale: [ks[hi] - ks[lo]], skip: [ans + sc, ans - sc].filter(x => x > 0)} : {scale: [ks[i]], skip: [ans + sc, ans - sc].filter(x => x > 0)};
      return lsDq(D, 1, {kind: 'num', ans, sl: {}, bug, hint: {k: 'text', s: pic ? `Each picture stands for ${sc}. Count by ${sc}s.` : `Each line counts ${sc}. Count by ${sc}s up the side.`},
        html: head + `<div class="pkq">${g0}</div>` + lsCap(ask) + SLOT, say: `${pic ? `Each picture stands for ${sc}.` : `Each line counts ${sc}.`} ${ask}`});
    }
    return lsDq(D, 2, {kind: 'num', ans: vals[i], sl: {}, bug: {scale: [ks[i]], skip: [vals[i] + sc, vals[i] - sc].filter(x => x > 0), mulAdd: [ks[i] + sc]}, hint: {k: 'text', s: `${qN(ks[i], 'picture')}, each ${sc}: count by ${sc}s.`},
      html: lsCap(`In a picture graph, each picture stands for ${sc}. ${names[i]} has ${ks[i]} picture${ks[i] > 1 ? 's' : ''}. How many is that?`) + SLOT,
      say: `Each picture stands for ${sc}. ${names[i]} has ${ks[i]} picture${ks[i] > 1 ? 's' : ''}. How many?`});
  };
  D.warm = r => { const k = lsPk(r, [2, 5, 10]); return lsSeqQ(D, 0, k * lsRi(r, 1, 5), k); };
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'graph', m: {names: ['Cats', 'Dogs', 'Fish'], vals: [15, 25, 10], sc: 5, top: 6, ed: [0, 1, 2]}, goal: 'some2', eq: 'value', ans: '15', raw: 1, sl: {k: 5}, demo: [3, 5, 2],
    html: lsCap('Each line counts 5. Make any bar graph.'), say: 'Each line on this graph counts 5. Make any bar graph you like.'}), nudge: 'Make a bar taller, then check.',
  react: v => { const s = Array.isArray(v) ? v : [3, 5, 2], a = 5 * Math.max(...s); return {ctx: {k: 5, a, s: s.slice()}, lines: [`Each line counts 5. Your tallest bar shows ${a}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls3bGraph(['Cats', 'Dogs', 'Fish'], (c.s || [c.a / 5, 0, 0]).map(x => 5 * x), 5, 6)}</div>` + lsEq(`1 line = ${c.k}`), sl: c});
  return D;
}
const LS3B_PL = {inch: 'inches', foot: 'feet'};
const LS3B_LP = [[4, 'ribbons', 'inch'], [2, 'ropes', 'foot'], [8, 'worms', 'inch'], [4, 'leaves', 'inch']];
const LS3B_BRIEF_DATA4 = `Explore: a line plot with four marks (fourths of an inch); the child puts any dots on it with a stepper a mark.
Name it: the line plot they made; lines on it (slot {n}: how many dots) and the idea: each dot is one length; to find a total, add the lengths of the dots, not the dots.
Together (no slots: the lengths are fractions on the screen, and the app says them): line 1 before putting a dot on the line plot for each length of a list, line 2 before reading a line plot (they type a total as a fraction), line 3 before the same in words only.
Remember: a warm-up: name a shaded fraction (no slots).
Show: two totals to type as fractions, no help, inside a small job in the world (no slots).`;
function ls3bData4(id, t, g, idea, home) {
  const D = ls3B(id, t, g, {petSt: 1, bugs: ['dotsVal', 'addBot'], brief: LS3B_BRIEF_DATA4, idea, home, fb: 'Each dot is one length. You put {n} dots on the plot.', test: 1,
    slots: {remember: [], explore: [], name: ['n'], together: [], check: ['ans'], show: []}});
  D.q = (st, r) => {
    const [den, things, unit] = lsPk(r, LS3B_LP), ks = [1, 2, 3, 4], cnt = ks.map(() => lsRi(r, 0, 3)), v = lsPk(r, [0, 1, 2, 3].filter(i => ks[i] % den));
    if (cnt[v] < 2) cnt[v] = lsRi(r, 2, 4);
    while (cnt[v] * ks[v] % den == 0) cnt[v]++;
    const fr = k => ls3bFrTxt(k, den), frS = k => (k % den ? fcSay(k, den) : String(k / den)), list = ks.flatMap((k, i) => Array(cnt[i]).fill(k)).map(k => [r(), k]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
    const tot = cnt[v] * ks[v], gc = k2Gcd(tot, den), ans = tot % den ? `${tot / gc}/${den / gc}` : `${tot / den}`, un = x => (x > den ? LS3B_PL[unit] : unit);
    const bug = {dotsVal: [cnt[v]], addBot: [`${tot}/${cnt[v] * den}`]}, hint = {k: 'text', s: `${cnt[v]} dots of ${fr(ks[v])}: add ${fr(ks[v])} ${cnt[v]} times.`};
    const plot = VIZ.linePlot(list.map(k => k / den), {min: 0, max: ks[3] / den, step: 1 / den, den, w: 250});
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'plot', m: {den, ks, target: cnt}, goal: 'plot', eq: 'value', ans: cnt.join(','), sl: {}, bug: {}, hint: {k: 'text', s: 'Count how many of each length, then put that many dots on its mark.'},
      html: lsCap(`The ${things}, in ${LS3B_PL[unit]}:`) + `<div class="eq ls3b-list">${list.map(k => (k % den ? fcFr(k, den) : k / den)).join(', ')}</div>` + lsCap('Put a dot on the line plot for each one.'),
      say: `Put a dot on the line plot for each length of the ${things}.`, ansSay: 'one dot for each length'});
    const ask = `What is the total length of the ${things} at ${frS(ks[v])} ${un(ks[v])}?`;
    if (st == 1) return ls3FQ(D, 1, ans, `<div class="pkq">${plot}</div>` + lsCap(ask) + lsEq(SLOT_FRAC), `Each dot is one ${things.slice(0, -1)}. ${ask}`, {sl: {}, bug, hint, eq: 'value'});
    return ls3FQ(D, 2, ans, lsCap(`${cnt[v]} ${things} are each ${fr(ks[v])} ${un(ks[v])} long. Total length?`) + lsEq(SLOT_FRAC), `${cnt[v]} ${things} are each ${frS(ks[v])} ${un(ks[v])} long. What is their total length?`, {sl: {}, bug, hint, eq: 'value'});
  };
  D.warm = ls3bFrWarm(D);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'plot', m: {den: 4, ks: [1, 2, 3, 4], target: [1, 2, 1, 0]}, goal: 'some2', eq: 'value', ans: '1,2,1,0', raw: 1, sl: {}, demo: [1, 2, 1, 0],
    html: lsCap('Put any dots on the line plot.'), say: 'Put dots on any marks of the line plot. Each dot is one length.'}), nudge: 'Put a dot on a mark, then check.',
  react: v => { const s = Array.isArray(v) ? v : [1, 2, 1, 0], n = s.reduce((a, b) => a + b, 0); return {ctx: {n, s: s.slice()}, lines: [`You put ${qN(n, 'dot')} on the line plot.`]}; }});
  D.name = c => { const s = c.s || [c.n, 0, 0, 0]; return {html: `<div class="pkq">${VIZ.linePlot([1, 2, 3, 4].flatMap((k, i) => Array(s[i]).fill(k / 4)), {min: 0, max: 1, step: .25, den: 4, w: 250})}</div>` + lsEq(`${c.n} dots`), sl: c}; };
  return D;
}

/* ---- angles: Kinds of Angles (open an angle of a kind), Measure Angles (a protractor with two scales; a missing angle) ---- */
const LS3B_KINDS = [['acute', 'Acute'], ['right', 'Right'], ['obtuse', 'Obtuse'], ['straight', 'Straight']];
const LS3B_BRIEF_ANG1 = `Explore: the child opens an angle any amount with steppers; the app says how many degrees and what kind it is.
Name it: the angle they made; lines on it (slot {a}: its degrees) and the idea: a right angle is a square corner; acute is less, obtuse is more, straight is a flat line.
Together (no slots: the kind is the answer): line 1 before opening an angle of a kind the app names, line 2 before a picture of an angle (they choose its kind), line 3 before an angle given in degrees only (they choose its kind).
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two angles to open, no help, inside a small job in the world (no slots).`;
function ls3bAng1(id, t, g, idea, home) {
  const D = ls3B(id, t, g, {petSt: 1, bugs: ['angSw', 'rtAng'], brief: LS3B_BRIEF_ANG1, idea, home, fb: 'Your angle is {a} degrees.', test: 0,
    slots: {remember: ['a', 'b'], explore: [], name: ['a'], together: [], check: ['ans'], show: []}});
  const ch = () => LS3B_KINDS.map(x => [x[0], x[1]]), sw = {acute: 'obtuse', obtuse: 'acute', right: 'acute', straight: 'obtuse'};
  D.q = (st, r) => {
    if (st == 0) {
      const kind = lsPk(r, ['acute', 'obtuse', 'right', 'acute', 'obtuse']), s0 = kind == 'acute' ? 120 : kind == 'obtuse' ? 40 : 60;
      return lsDq(D, 0, {kind: 'make', model: 'ang', m: {kind, s0, show: 1, rot: 0}, goal: 'akind', eq: 'value', ans: {acute: 45, right: 90, obtuse: 135}[kind], s0: [s0], sl: {},
        bug: {angSw: [kind == 'right' ? 120 : 180 - {acute: 45, obtuse: 135}[kind]], rtAng: kind == 'right' ? [80, 100] : [90]}, ansSay: `an ${kind} angle`.replace('an right', 'a right'),
        hint: {k: 'text', s: kind == 'right' ? 'A right angle is a square corner: 90 degrees.' : kind == 'acute' ? 'Acute is less than a square corner, less than 90.' : 'Obtuse is more than a square corner, more than 90.'},
        html: lsCap(`Make ${kind == 'right' ? 'a right' : kind == 'acute' ? 'an acute' : 'an obtuse'} angle.`), say: `Make ${kind == 'right' ? 'a right' : kind == 'acute' ? 'an acute' : 'an obtuse'} angle.`});
    }
    const deg = st == 1 ? lsPk(r, [20, 30, 45, 60, 80, 90, 100, 120, 135, 150, 180, 85, 95]) : lsPk(r, [25, 40, 55, 70, 90, 110, 125, 140, 165, 180, 88, 92]), ans = ls3bKind(deg);
    const bug = {angSw: [sw[ans]], rtAng: Math.abs(deg - 90) <= 20 && deg != 90 ? ['right'] : []};
    const hint = {k: 'html', html: `<div class="pkhint">${VIZ.angle(90, {rot: 10})}<div>A right angle is a square corner, 90°. Acute is less, obtuse is more, straight is a flat line.</div></div>`, w: 'A right angle is a square corner. Acute is less, obtuse is more.'};
    if (st == 1) return lsPick(D.sk, D.lv, 1, ans, `<div class="pkq">${VIZ.angle(deg, {rot: lsPk(r, [0, 15, 30, 200])})}</div>` + lsCap('What kind of angle is it?') + SLOT, 'What kind of angle is this?', ch(),
      {pk: false, sl: {}, bug, hint, after: `It is ${ans == 'acute' || ans == 'obtuse' ? 'an' : 'a'} ${ans} angle.`});
    return lsPick(D.sk, D.lv, 2, ans, lsEq(`${deg}°`) + lsCap('What kind of angle is it?') + SLOT, `An angle of ${deg} degrees. What kind of angle is it?`, ch(),
      {pk: false, sl: {}, bug, hint, after: `It is ${ans == 'acute' || ans == 'obtuse' ? 'an' : 'a'} ${ans} angle.`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'ang', m: {show: 1, s0: 30, target: 110}, goal: 'moved', eq: 'value', ans: 30, raw: 1, sl: {}, demo: [110],
    html: lsCap('Open the angle any amount.'), say: 'Open or close the angle any amount you like.'}), nudge: 'Open or close it, then check.',
  react: v => { const a = Array.isArray(v) ? v[0] : +v; return {ctx: {a}, lines: [`${a} degrees. That is ${ls3bKind(a) == 'acute' || ls3bKind(a) == 'obtuse' ? 'an' : 'a'} ${ls3bKind(a)} angle.`]}; }});
  D.name = c => ({html: `<div class="pkq">${VIZ.angle(c.a, {label: c.a + '°'})}${VIZ.angle(90, {label: '90°'})}</div>` + lsEq(`${c.a}° ${c.a < 90 ? '<' : c.a > 90 ? '>' : '='} 90°`), sl: c});
  return D;
}
const LS3B_BRIEF_ANG2 = `Explore: an angle on a protractor; the child opens it any amount with steppers; the app says how many degrees.
Name it: the angle they made on the protractor; lines on it (slot {a}: its degrees) and the idea: put the zero on the side the angle starts, then count up that scale.
Together (no slots: the degrees are the answer): line 1 before opening an angle on the protractor to a number of degrees the app says, line 2 before reading an angle on a protractor (they type the degrees), line 3 before a missing angle given in words only (they type it).
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two angles to read and type, no help, inside a small job in the world (no slots).`;
function ls3bAng2(id, t, g, idea, home) {
  const D = ls3B(id, t, g, {petSt: 1, bugs: ['proto', 'sup', 'slip'], brief: LS3B_BRIEF_ANG2, idea, home, fb: 'Your angle is {a} degrees.', test: 1,
    slots: {remember: ['a', 'b'], explore: [], name: ['a'], together: [], check: ['ans'], show: []}});
  D.q = (st, r) => {
    const hint = {k: 'text', s: 'Find the zero on the side where the angle starts. Count up that scale to the other side.'};
    if (st < 2) {
      let deg; do deg = 5 * lsRi(r, 3, 33); while (deg == 90);
      const left = r() < .5;
      if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'ang', m: {proto: 1, left, target: deg, s0: deg > 90 ? 30 : 150}, goal: 'value', eq: 'value', ans: deg, s0: [deg > 90 ? 30 : 150], sl: {}, ansSay: `${deg} degrees`,
        bug: {proto: [180 - deg]}, hint, html: lsCap(`Open the angle to ${deg}°. It starts on the ${left ? 'left' : 'right'}.`), say: `Open the angle to ${deg} degrees on the protractor. It starts on the ${left ? 'left' : 'right'}.`});
      return lsDq(D, 1, {kind: 'num', ans: deg, sl: {}, bug: {proto: [180 - deg], slip: [deg + 10, deg - 10]}, hint, max: 3,
        html: `<div class="pkq">${ls3bProto(deg, left)}</div>` + lsCap(`The angle starts on the ${left ? 'left' : 'right'}. How many degrees?`) + `<div class="eq">${SLOT}°</div>`, say: `The angle starts on the ${left ? 'left' : 'right'} side. How many degrees is it?`});
    }
    const right = r() < .5, W = right ? 90 : 180, a = right ? 5 * lsRi(r, 2, 16) : 5 * lsRi(r, 4, 32), b = W - a;
    const S = right ? `A right angle is cut in two. One part is ${a}°. The other?` : `A straight line makes two angles. One is ${a}°. The other?`;
    return lsDq(D, 2, {kind: 'num', ans: b, sl: {}, bug: {sup: [right ? 180 - a : 90 - a].filter(x => x > 0), slip: [b + 10, b - 10].filter(x => x > 0)}, max: 3,
      hint: {k: 'text', s: `${right ? 'A right angle is 90°' : 'A straight line is 180°'}. Take away ${a}.`}, html: lsCap(S) + `<div class="eq">${SLOT}°</div>`, say: S.replace(/°/g, ' degrees')});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'ang', m: {proto: 1, left: false, s0: 30, target: 70}, goal: 'moved', eq: 'value', ans: 30, raw: 1, sl: {}, demo: [70],
    html: lsCap('Open the angle any amount.'), say: 'Open the angle on the protractor any amount you like.'}), nudge: 'Open or close it, then check.',
  react: v => { const a = Array.isArray(v) ? v[0] : +v; return {ctx: {a}, lines: [`It starts at zero on the right. It measures ${a} degrees.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls3bProto(c.a, false)}</div>` + lsEq(`${c.a}°`), sl: c});
  return D;
}

/* ---- Coordinate Grid: a point is across, then up ---- */
const LS3B_BRIEF_XY = `Explore: a point on a coordinate grid; the child moves it anywhere with an across stepper and an up stepper.
Name it: the point they placed; lines on it (slots {x}: how far across, {y}: how far up) and the idea: an ordered pair says across first, then up, both counted from zero.
Together (line 1 slots {x} {y}; lines 2 and 3 have none, the point is the answer): line 1 before placing a point at ({x}, {y}), line 2 before reading a point on the grid (they type both numbers), line 3 before a move told in words only (they type where it ends).
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two points to read and type, no help, inside a small job in the world (no slots).`;
function ls3bXY(id, t, g, idea, home) {
  const D = ls3B(id, t, g, {petSt: 0, bugs: ['swapXY', 'gridOff'], brief: LS3B_BRIEF_XY, idea, home, fb: 'Your point is {x} across and {y} up.', test: 1,
    slots: {remember: ['a', 'b'], explore: [], name: ['x', 'y'], together: [['x', 'y'], [], []], check: ['ans'], show: []}});
  const vs = v => { const [x, y] = String(v).split(',').map(Number); return `${x} across and ${y} up`; };
  const hint = {k: 'text', s: 'Start at zero, in the corner. Go across first, then up.'};
  D.q = (st, r) => {
    let x, y; do { x = lsRi(r, 0, 5); y = lsRi(r, 0, 5); } while (x == y || x + y < 2 || (!x || !y) && r() < .7);
    const ans = `${x},${y}`, bug = {swapXY: [`${y},${x}`], gridOff: [`${x + 1},${y + 1}`]};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'xy', m: {max: 6, target: ans}, goal: 'xy', eq: 'value', ans, sl: {x, y}, bug, hint, vsay: vs, ansSay: vs(ans),
      html: lsEq(`(${x}, ${y})`) + lsCap('Put point A there.'), say: `Put point A at ${x}, ${y}. Go ${x} across, then ${y} up.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', sep: 'xy', ans, sl: {}, bug, hint, vsay: vs, html: `<div class="pkq">${VIZ.coordGrid({max: 6, points: [[x, y, 'A']]})}</div>` + lsCap('Where is point A?') + `<div class="eq">${ccXY}</div>`,
      say: 'Where is point A? Type how far across, then how far up.'});
    const a = lsRi(r, 1, 3), b = lsRi(r, 1, 3), x0 = Math.max(0, x - a), y0 = Math.max(0, y - b), A = `${x0 + a},${y0 + b}`;
    return lsDq(D, 2, {kind: 'num', sep: 'xy', ans: A, sl: {}, bug: {swapXY: [`${y0 + b},${x0 + a}`], gridOff: [`${x0 + a + 1},${y0 + b + 1}`]}, hint, vsay: vs,
      html: lsCap(`Start at (${x0}, ${y0}). Go ${a} across and ${b} up. Where are you?`) + `<div class="eq">${ccXY}</div>`, say: `Start at ${x0}, ${y0}. Go ${a} across and ${b} up. Where are you now?`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'xy', m: {max: 6, target: '3,5'}, goal: 'moved', eq: 'value', ans: '3,5', raw: 1, sl: {}, demo: [4, 2], vsay: vs,
    html: lsCap('Put point A anywhere on the grid.'), say: 'Move point A anywhere you like on the grid.'}), nudge: 'Move the point, then check.',
  react: v => { const [x, y] = Array.isArray(v) ? v : String(v).split(',').map(Number); return {ctx: {x, y}, lines: [`Your point is ${x} across and ${y} up.`]}; }});
  D.name = c => ({html: `<div class="pkq">${VIZ.coordGrid({max: 6, points: [[c.x, c.y, 'A']]})}</div>` + lsEq(`(${c.x}, ${c.y})`), sl: c});
  return D;
}

/* ---- Rulers & Scales: a kitchen scale and a measuring jug (count by the marks' step), and a ruler that does not start at zero ---- */
const LS3B_DIAL = [[0, 'g', 500, 50, 'grams'], [0, 'g', 1000, 100, 'grams'], [0, 'kg', 20, 2, 'kilograms'], [1, 'mL', 500, 50, 'milliliters'], [1, 'mL', 1000, 100, 'milliliters'], [1, 'L', 10, 2, 'liters']];
const LS3B_BRIEF_MEAS4 = `Explore: a kitchen scale whose marks are {k} grams; the child moves the needle to any mark with a stepper.
Name it: the scale they set; lines on it (slots {k}: each mark, {n}: what the needle shows) and the idea: find what one mark is worth, then count by it; on a ruler, start where the object starts.
Together (no slots: the reading is the answer, and the app says the units): line 1 before moving a scale's needle or a jug's water to an amount, line 2 before reading a scale, a jug or a ruler (they type it), line 3 before a reading told in words only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two readings to type, no help, inside a small job in the world (no slots).`;
function ls3bMeas4(id, t, g, idea, home) {
  const D = ls3B(id, t, g, {petSt: 1, bugs: ['mark1', 'rEnd', 'skip'], brief: LS3B_BRIEF_MEAS4, idea, home, fb: 'Each mark is {k} grams. Yours shows {n}.', test: 1,
    slots: {remember: ['a', 'b'], explore: ['k'], name: ['k', 'n'], together: [], check: ['ans'], show: []}});
  D.q = (st, r) => {
    const [jug, unit, max, step, uname] = lsPk(r, LS3B_DIAL), n = max / step, k = lsRi(r, 2, n - 1), val = k * step, lab = n <= 6 ? 1 : 2, last = Math.floor(k / lab) * lab;
    const hint = {k: 'text', s: `Each mark is ${step} ${unit}. Count by ${step}s.`}, bug = {mark1: [last * step + (k - last), k].filter(x => x != val), skip: [val + step, val - step].filter(x => x > 0)};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'dial', m: {jug, max, step, unit, target: val}, goal: 'value', eq: 'value', ans: val, sl: {}, bug: {}, hint, ansSay: `${val} ${uname}`,
      html: lsCap(`Each mark is ${step} ${unit}. Make it show ${val} ${unit}.`), say: `Each mark is ${step} ${uname}. Make the ${jug ? 'water' : 'scale'} show ${val} ${uname}.`});
    if (st == 1 && r() < .35) {
      const from = lsRi(r, 1, 4), len = lsRi(r, 3, 8);
      return lsDq(D, 1, {kind: 'num', ans: len, sl: {}, bug: {rEnd: [from + len], skip: [len + 1, len - 1]}, hint: {k: 'text', s: `It starts at ${from}. Count the centimeters from ${from} to the end.`},
        html: `<div class="pkq">${VIZ.ruler(len, 'cm', 'pencil', {from})}</div>` + lsCap('How long is the pencil?') + `<div class="eq">${SLOT} cm</div>`, say: 'How long is the pencil? The ruler is in centimeters.'});
    }
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: val, sl: {}, bug, hint, max: 4, html: `<div class="pkq">${(jug ? ffJug : ffDial)(val, max, step, unit)}</div>` + lsCap(jug ? 'How much water is in the jug?' : 'How heavy is the bag?') + `<div class="eq">${SLOT} ${unit}</div>`,
      say: `${jug ? 'How much water is in the jug?' : 'How heavy is the bag on the scale?'} Each mark is ${step} ${uname}.`});
    const at = last * step, more = k - last || 1, V = at + more * step;
    return lsDq(D, 2, {kind: 'num', ans: V, sl: {}, bug: {mark1: [at + more], skip: [V + step, V - step]}, hint, max: 4,
      html: lsCap(`Each mark is ${step} ${unit}. The ${jug ? 'water' : 'needle'} is ${more} mark${more > 1 ? 's' : ''} past ${at} ${unit}. How much?`) + `<div class="eq">${SLOT} ${unit}</div>`,
      say: `Each mark is ${step} ${uname}. The ${jug ? 'water' : 'needle'} is ${more} mark${more > 1 ? 's' : ''} past ${at}. How much is it?`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'dial', m: {jug: 0, max: 500, step: 50, unit: 'g', target: 250}, goal: 'moved', eq: 'value', ans: 50, raw: 1, sl: {k: 50}, demo: [5],
    html: lsCap('Each mark is 50 g. Move the needle anywhere.'), say: 'Each mark is 50 grams. Move the needle to any mark you like.'}), nudge: 'Move the needle, then check.',
  react: v => { const n = (Array.isArray(v) ? v[0] : +v / 50) * 50; return {ctx: {k: 50, n}, lines: [`Each mark is 50 grams. The needle shows ${n} grams.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ffDial(c.n, 500, c.k, 'g')}</div>` + lsEq(`${c.n} g`), sl: c});
  return D;
}

/* ---- How Much Time Passed: count up to the next hour, then on ---- */
const LS3B_BRIEF_TIME6 = `Explore: a clock that starts at 3 o'clock; the child moves the hands to any later time.
Name it: lines on what they set (slots {time}: the time they set, {n}: the minutes from 3 o'clock) and the idea: count the minutes up to the next hour, then on from it.
Together (no slots: the times are on the screen and the app says them): line 1 before moving a clock's hands a number of minutes later, line 2 before two clocks (they type the minutes that passed), line 3 before two times written only.
Remember: a warm-up: set an o'clock time (slot {time}).
Show: two times that passed to type, no help, inside a small job in the world (no slots).`;
function ls3bTime6(id, t, g, idea, home) {
  const D = ls3B(id, t, g, {petSt: 1, bugs: ['hr100', 'minOnly'], brief: LS3B_BRIEF_TIME6, idea, home, fb: 'From the start to {time} is {n} minutes.', test: 1,
    slots: {remember: ['time'], explore: [], name: ['time', 'n'], together: [], check: ['ans'], show: []}});
  D.q = (st, r) => {
    let h, m, d; do { h = lsRi(r, 1, 10); m = 5 * lsRi(r, 1, 11); d = 5 * lsRi(r, 3, 15); } while (m + d < 60 && r() < .85 || m + d == 60 || m + d >= 120);
    const eh = h + Math.floor((m + d) / 60), em = (m + d) % 60, s = ls3bTS(h, m), e = ls3bTS(eh, em), ss = mmTimeSay(h, m), es = mmTimeSay(eh, em);
    const bug = {hr100: [eh * 100 + em - h * 100 - m], minOnly: [Math.abs(em - m)].filter(x => x)}, hint = {k: 'text', s: em >= m && eh == h ? `Same hour: ${em} − ${m}.` : `From ${s} to ${ls3bTS(h + 1, 0)} is ${60 - m} minutes. Then ${em} more.`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'hands', m: {one: false}, eq: 'exact', ans: e, ansSay: es, hm: [eh, em], s0: [h, m], sl: {}, bug: {}, hint,
      html: lsEq(s) + lsCap(`Move the clock ${d} minutes later.`), say: `It is ${ss}. Move the clock ${d} minutes later.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: d, sl: {}, bug, hint, max: 3, html: `<div class="ffrow"><div>${VIZ.clock(h, m)}<div>Start</div></div><div>${VIZ.clock(eh, em)}<div>End</div></div></div>`
      + lsCap('How many minutes passed?') + `<div class="eq">${SLOT} minutes</div>`, say: `It starts at ${ss} and ends at ${es}. How many minutes passed?`});
    return lsDq(D, 2, {kind: 'num', ans: d, sl: {}, bug, hint, max: 3, html: `<div class="eq"><div>Start <b>${s}</b></div><div>End <b>${e}</b></div></div>` + lsCap('How many minutes passed?') + `<div class="eq">${SLOT} minutes</div>`,
      say: `Start at ${ss}. End at ${es}. How many minutes passed?`});
  };
  D.warm = lsWarmHour(D);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'hands', m: {one: false}, eq: 'exact', ans: '3:00', goal: 'moved', s0: [3, 0], sl: {}, demo: '3:40',
    html: lsEq('3:00') + lsCap('Move the hands to any later time.'), say: "It is 3 o'clock. Move the hands to any later time."}), nudge: 'Move a hand, then check.',
  react: v => { const [h, m] = String(Array.isArray(v) ? K2MM.hands.val({}, v) : v).split(':').map(Number), n = ((h % 12) * 60 + m - 180 + 720) % 720;
    return {ctx: {time: mmTimeSay(h, m), n, h, m}, lines: [`From 3 o'clock to ${mmTimeSay(h, m)} is ${n} minutes.`]}; }});
  D.name = c => ({html: `<div class="ffrow"><div>${VIZ.clock(3, 0)}</div><div>${VIZ.clock(c.h || 3, c.m || 0)}</div></div>` + lsEq(`${c.n} minutes`), sl: c});
  return D;
}

/* ---- In and Out Tables, Two Rules: the rule goes across, from in to out ---- */
const LS3B_BRIEF_RULE = `Explore: an in and out table; the child sets any rule (a sign and a number) and sees what it does to each in number.
Name it: the rule they set; lines on it (slots {a}: an in number, {sum}: what their rule makes of it) and the idea: IDEA.
Together (no slots: the numbers are in the table, and the app reads them): line 1 before setting the rule that makes a table true, line 2 before a table with one out missing (they type it), line 3 before a rule and an in number in words only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two missing numbers to type, no help, inside a small job in the world (no slots).`;
function ls3bRule(id, t, g, two, idea, home) {
  const D = ls3B(id, t, g, {petSt: 1, bugs: two ? ['rowJump', 'skip'] : ['rowJump', 'mulAdd'], idea, home, fb: 'Your rule turns {a} into {sum}.', test: 1,
    brief: LS3B_BRIEF_RULE.replace('IDEA', two ? 'two patterns from zero: find how each number of one is made from the number beside it' : 'the rule goes across, from each in number to its out number; test it on every row'),
    slots: {remember: ['a', 'b'], explore: [], name: ['a', 'sum'], together: [], check: ['ans'], show: []}});
  const head = two ? ['A', 'B'] : ['In', 'Out'];
  D.q = (st, r) => {
    let rows, o, k, x4, ans, bug;
    if (two) {
      const a = lsRi(r, 2, 6), m = lsRi(r, 2, 5), b = a * m, i = lsRi(r, 5, 9);
      rows = [1, 2, 3].map(j => [a * j, b * j]); o = 2; k = m; x4 = a * i; ans = b * i; bug = {rowJump: [x4 + b - a], skip: [ans + b, ans - b]};
      if (st == 2) { const S = `From 0, A adds ${a} and B adds ${b}. When A is ${x4}, what is B?`;
        return lsDq(D, 2, {kind: 'num', ans, sl: {}, bug, max: 3, hint: {k: 'text', s: `B is ${m} times A.`}, html: lsCap(S) + SLOT, say: S}); }
    } else {
      o = lsPk(r, [0, 1, 2, 2]); k = o == 2 ? lsRi(r, 2, 9) : lsRi(r, 2, 12);
      const s = o == 1 ? lsRi(r, k + 1, k + 6) : lsRi(r, 1, 6);
      rows = [s, s + 1, s + 2].map(x => [x, ls3bApply(o, k, x)]); x4 = s + lsRi(r, 4, 7); ans = ls3bApply(o, k, x4);
      const j = rows[1][1] - rows[0][1]; bug = {rowJump: [rows[2][1] + j], mulAdd: o == 2 ? [x4 + k] : []};
      if (st == 2) { const X = o == 1 ? lsRi(r, k + 1, k + 12) : lsRi(r, 3, 12), Y = ls3bApply(o, k, X), S = `The rule is ${LS3B_OPSAY[o]} ${k}. The in number is ${X}. What is the out number?`;
        return lsDq(D, 2, {kind: 'num', ans: Y, sl: {}, bug: {mulAdd: o == 2 ? [X + k] : [], rowJump: [Y + 1]}, max: 3, hint: {k: 'text', s: `Do the rule to ${X}: ${X} ${LS3B_OPS[o]} ${k}.`},
          html: lsEq(`${LS3B_OPS[o]} ${k}`) + lsCap(`In ${X}. Out?`) + SLOT, say: S}); }
    }
    const tgt = LS3B_OPS[o] + k, hint = {k: 'text', s: `Look across row 1: what turns ${rows[0][0]} into ${rows[0][1]}? Test it on every row.`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'rule', m: {head, rows, target: tgt}, goal: 'rule', eq: 'value', ans: k, sl: {}, hint, vsay: v => `${LS3B_OPSAY[LS3B_OPS.indexOf(String(v)[0])]} ${String(v).slice(1)}`,
      bug: {rowJump: [`+${rows[1][1] - rows[0][1]}`].filter(x => x != tgt)}, ansSay: `${LS3B_OPSAY[o]} ${k}`, html: lsCap(two ? 'What turns each A number into its B number?' : 'Find the rule.'),
      say: two ? 'Set the rule that turns each A number into the B number beside it.' : 'Set the rule that turns each in number into its out number.'});
    return lsDq(D, 1, {kind: 'num', ans, sl: {}, bug, hint, max: 3, html: `<div class="pkq">${ls3bTable(head, rows.concat([[x4, '?']]))}</div>` + lsCap(two ? `When ${head[0]} is ${x4}, what is ${head[1]}?` : 'What number goes in the box?') + SLOT,
      say: two ? `Look at the table. When A is ${x4}, what is B?` : `Find the rule in the table. What is the out number for ${x4}?`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'rule', m: {head: [head[0], head[1]], rows: [[1, 3], [2, 6], [3, 9]], target: '×3'}, goal: 'moved', eq: 'value', ans: 3, raw: 1, sl: {}, demo: [0, 4],
    vsay: v => String(v), html: lsCap('Set any rule. See what it does to each number.'), say: 'Set any rule you like, and see what it does to each number.'}), nudge: 'Change the sign or the number, then check.',
  react: v => { const [o, k] = Array.isArray(v) ? v : [0, 4], x = ls3bApply(o, k, 2); return {ctx: {a: 2, sum: x == null ? 0 : x, o, k}, lines: [x == null ? `${LS3B_OPSAY[o]} ${k} does not work on 2.` : `${LS3B_OPSAY[o]} ${k} turns 2 into ${x}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls3bTable(head, [1, 2, 3].map(x => [x, ls3bApply(c.o || 0, c.k || 4, x)]).map(([x, y]) => [x, y == null ? '–' : y]))}</div>` + lsEq(`${LS3B_OPS[c.o || 0]} ${c.k || 4}`), sl: c});
  return D;
}

/* ---- Shape Families (the facts of quadrilaterals), Symmetry & Lines (fold lines) ---- */
const LS3B_PMIX = {square: '1110', rectangle: '1111', rhombus: '1111', parallelogram: '1011', trapezoid: '1001', kite: '1100'};
const LS3B_NMIX = {square: 'rhombus', rectangle: 'square', rhombus: 'square', parallelogram: 'rectangle', trapezoid: 'parallelogram', kite: 'rhombus'};
const LS3B_DESC = {square: 'All sides equal and four right angles.', rectangle: 'Four right angles, but not all sides equal.', rhombus: 'All sides equal, but no right angles.',
  parallelogram: 'Both pairs of sides parallel, no right angles, not all sides equal.', trapezoid: 'Only one pair of sides parallel.', kite: 'Two pairs of equal sides next to each other, and no parallel sides.'};
const ls3bCap = s => s[0].toUpperCase() + s.slice(1);
const LS3B_BRIEF_SH5 = `Explore: a rectangle and four facts (four sides, all sides equal, four right angles, both pairs of sides parallel); the child taps the facts they think are true.
Name it: a square, a rectangle and a rhombus side by side (no slots) and the idea: shapes are sorted by their sides and their corners; a square is a rectangle and a rhombus too.
Together (no slots: the shape is on the screen and the app names it): line 1 before tapping every fact that is true for a shape, line 2 before a picture of a shape (they choose its best name), line 3 before a shape described in words only (they choose its name).
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two shapes to tap the true facts of, no help, inside a small job in the world (no slots).`;
function ls3bShape5(id, t, g, idea, home) {
  const D = ls3B(id, t, g, {petSt: 1, bugs: ['propMix'], brief: LS3B_BRIEF_SH5, idea, home, fb: 'Check the sides first, then the corners.', test: 0,
    slots: {remember: ['a', 'b'], explore: [], name: [], together: [], check: ['ans'], show: []}});
  const NM = Object.keys(LS3B_PROPS), hint = {k: 'text', s: 'Check the sides first: are they all equal? Then the corners: are they square? Then the parallel sides.'};
  const chs = (r, ans) => { const o = [ans, LS3B_NMIX[ans]]; while (o.length < 4) { const x = lsPk(r, NM); if (!o.includes(x)) o.push(x); } return o.map(x => [x, ls3bCap(x)]).sort((a, b) => (a[0] < b[0] ? -1 : 1)); };
  D.q = (st, r) => {
    const sh = lsPk(r, NM), name = sh;
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'props', m: {shape: sh}, goal: 'props', eq: 'value', ans: LS3B_PROPS[sh].join(''), sl: {}, bug: {propMix: [LS3B_PMIX[sh]]}, hint,
      ansSay: `A ${name}: ` + LS3B_FACT.filter((f, i) => LS3B_PROPS[sh][i]).join(', ').toLowerCase(), html: lsCap(`This is a ${name}. Tap every fact that is true.`), say: `This is a ${name}. Tap every fact that is true for it.`});
    if (st == 1) return lsPick(D.sk, D.lv, 1, sh, `<div class="pkq">${ls3bShape(sh)}</div>` + lsCap('What is its best name?') + SLOT, 'What is the best name for this shape?', chs(r, sh),
      {pk: false, sl: {}, bug: {propMix: [LS3B_NMIX[sh]]}, hint, after: `It is a ${sh}.`});
    return lsPick(D.sk, D.lv, 2, sh, lsCap(`A shape with four sides. ${LS3B_DESC[sh]} What is it?`) + SLOT, `${LS3B_DESC[sh]} What is it?`, chs(r, sh),
      {pk: false, sl: {}, bug: {propMix: [LS3B_NMIX[sh]]}, hint, after: `It is a ${sh}.`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'props', m: {shape: 'rectangle'}, goal: 'moved', eq: 'value', ans: '1011', raw: 1, sl: {}, demo: [1, 0, 1, 1],
    html: lsCap('Tap the facts you think are true.'), say: 'Here is a rectangle. Tap the facts you think are true. Any way is fine.'}), nudge: 'Tap a fact, then check.',
  react: () => ({ctx: {}, lines: ['A rectangle has four sides, four right angles, and both pairs of sides parallel.']})});
  D.name = c => ({html: `<div class="ls3b-row">${['square', 'rectangle', 'rhombus'].map(s => `<div>${ls3bShape(s)}<div>${ls3bCap(s)}</div></div>`).join('')}</div>`, sl: c});
  return D;
}
const LS3B_SMIX = {diag: {square: null, rectangle: '1111', rhombus: '1111', kite: '1100', trapezoid: '1011', parallelogram: '0011'}, axis: {square: '1100'}};
const LS3B_SDESC = {square: 'a square', rectangle: 'a rectangle that is not a square', rhombus: 'a rhombus that is not a square', kite: 'a kite', trapezoid: 'a trapezoid with two equal slanted sides', parallelogram: 'a parallelogram that is not a rectangle'};
const ls3bSymN = s => LS3B_SYM[s].reduce((a, b) => a + b, 0);
const LS3B_BRIEF_SH6 = `Explore: a square and four fold lines (up and down, across, two slants); the child taps the lines they think fold it in half.
Name it: the square with its fold lines (slot {n}: how many) and the idea: a line of symmetry folds a shape into two halves that match exactly.
Together (no slots: the shape is on the screen and the app names it): line 1 before tapping every fold line of a shape, line 2 before a picture of a shape (they type how many lines of symmetry), line 3 before a shape named in words only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two shapes to count the lines of symmetry of, no help, inside a small job in the world (no slots).`;
function ls3bShape6(id, t, g, idea, home) {
  const D = ls3B(id, t, g, {petSt: 1, bugs: ['diag', 'axis'], brief: LS3B_BRIEF_SH6, idea, home, fb: 'A square has {n} lines of symmetry.', test: 1,
    slots: {remember: ['a', 'b'], explore: [], name: ['n'], together: [], check: ['ans'], show: []}});
  const hint = {k: 'text', s: 'Fold it in your mind along the line. Do both halves match exactly?'};
  const nOf = b => (b ? b.split('').reduce((a, x) => a + +x, 0) : null);
  D.q = (st, r) => {
    const sh = lsPk(r, st == 0 ? ['square', 'rectangle', 'rhombus', 'kite', 'trapezoid'] : ['square', 'rectangle', 'rhombus', 'kite', 'trapezoid', 'parallelogram']), n = ls3bSymN(sh);
    const pb = {diag: [LS3B_SMIX.diag[sh]].filter(Boolean), axis: [LS3B_SMIX.axis[sh]].filter(Boolean)};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'sym', m: {shape: sh}, goal: 'sym', eq: 'value', ans: LS3B_SYM[sh].join(''), sl: {}, bug: pb, hint, ansSay: `${n} fold line${n == 1 ? '' : 's'}`,
      html: lsCap(`A ${sh}. Tap every line that folds it into matching halves.`), say: `Here is a ${sh}. Tap every line that folds it into two matching halves.`});
    const bug = {diag: pb.diag.map(nOf), axis: pb.axis.map(nOf)};
    if (st == 1) return lsDq(D, 1, {kind: 'num', ans: n, sl: {}, bug, hint, max: 1, html: `<div class="pkq">${ls3bShape(sh)}</div>` + lsCap('How many lines of symmetry?') + SLOT, say: `How many lines of symmetry does this ${sh} have?`});
    return lsDq(D, 2, {kind: 'num', ans: n, sl: {}, bug, hint, max: 1, html: lsCap(`How many lines of symmetry does ${LS3B_SDESC[sh]} have?`) + SLOT, say: `How many lines of symmetry does ${LS3B_SDESC[sh]} have?`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'sym', m: {shape: 'square'}, goal: 'moved', eq: 'value', ans: '1111', raw: 1, sl: {}, demo: [1, 1, 0, 0],
    html: lsCap('Tap the lines you think fold it in half.'), say: 'Here is a square. Tap the lines you think fold it into matching halves.'}), nudge: 'Tap a line, then check.',
  react: v => { const s = Array.isArray(v) ? v : String(v).split('').map(Number), c = s.filter(Boolean).length; return {ctx: {n: 4}, lines: [`You tapped ${c}. A square folds in half along all four lines.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls3bShape('square', [1, 1, 1, 1])}</div>` + lsEq(`${c.n} lines`), sl: c});
  return D;
}

/* ---- Divide by 2-Digit: try how many fit, multiply back, check what is left ---- */
const LS3B_BRIEF_DB4 = `Explore: the child picks a number and a 2-digit divisor with steppers; the app says how many times it fits and what is left.
Name it: lines on their pick (slots {n}: the number, {b}: the divisor, {a}: how many times it fits, {k}: what is left) and the idea: guess how many fit, multiply back, then check what is left is less than the divisor.
Together (slots {n}: the number, {b}: the divisor; never the answer): line 1 before trying how many fit with a stepper (the work shows too much, more fit, or right), line 2 before a table of tens times the divisor (they type the answer and what is left), line 3 before the division in symbols only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two divisions to type, no help, inside a small job in the world (slots {n} {b}).`;
function ls3bDb4(id, t, g, idea, home) {
  const D = ls3B(id, t, g, {petSt: 1, bugs: ['remBig', 'slip'], brief: LS3B_BRIEF_DB4, idea, home, fb: '{n} divided by {b} is {a}, with {k} left over.', test: 2,
    slots: {remember: ['a', 'b'], explore: [], name: ['n', 'b', 'a', 'k'], together: ['n', 'b'], check: ['ans'], show: ['n', 'b']}});
  const vs = v => String(v).replace(/ ?R ?/, ' remainder ');
  D.q = (st, r) => {
    const d = lsRi(r, 12, 29), q = lsRi(r, 11, 39), m = lsRi(r, 1, d - 1), n = d * q + m, sl = {n, b: d}, ans = `${q}R${m}`, hint = {k: 'text', s: `Try ${d} × ${Math.floor(q / 10) * 10} first. Multiply back, then check what is left.`};
    const bug = {remBig: [`${q - 1}R${m + d}`], slip: [`${q + 1}R${m}`, `${q}R${m + 1}`]};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'qtry', m: {n, d, target: q}, goal: 'value', eq: 'value', ans: q, sl, bug: {remBig: [q - 1], slip: [q + 1]}, hint, ansSay: `${q}, with ${m} left over`,
      html: lsEq(`${n} ÷ ${d}`) + lsCap(`How many ${d}s fit in ${n}? Try a number.`), say: `${n} divided by ${d}. How many ${d}s fit? Try a number, then check.`});
    if (st == 1) return lsDq(D, 1, {kind: 'num', sep: 'R', ans, sl, bug, hint, vsay: vs, html: `<div class="pkq">${ls3bTable(['×', String(d)], [10, 20, 30, 40].map(x => [x, x * d]))}</div>` + lsEq(`${n} ÷ ${d} = ${SLOT_R}`),
      say: `${n} divided by ${d}. How many times does it fit, and what is left?`});
    return lsDq(D, 2, {kind: 'num', sep: 'R', ans, sl, bug, hint, vsay: vs, html: ST.ldiv(n, d, SLOT_R), say: `${n} divided by ${d} equals what?`});
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'pickn', m: {v: [250, 12], lo: [100, 11], hi: [999, 30], ds: [[1, 10, 100], [1, 10]], lab: ['Number', 'Divide by'], fmt: s => `${s[0]} ÷ ${s[1]}`},
    raw: 1, goal: 'mine', eq: 'value', ans: 1, sl: {}, html: lsCap('Pick a number and a divisor.'), say: 'Pick a number, and a number from 11 to 30 to divide it by.'}), nudge: 'Change a number, then check.',
  react: v => { const [n, b] = Array.isArray(v) ? v : [250, 12], a = Math.floor(n / b), k = n % b; return {ctx: {n, b, a, k}, lines: [`${n} divided by ${b} is ${a}, with ${k} left over.`]}; }});
  D.name = c => ({html: lsEq(`${c.b} × ${c.a} = ${c.b * c.a}`) + lsEq(`${c.n} − ${c.b * c.a} = ${c.k}`), sl: c});
  return D;
}

/* ---- Mixed Numbers (5th grade: add and take away, trading parts and wholes), Unit Fraction Division ---- */
const LS3B_BRIEF_FOP4 = `Explore: whole bars and fourths; the child makes any mixed number with steppers, and can trade four fourths for a whole or break a whole.
Name it: what they made (slots {a}: the wholes, {b}: the fourths) and the idea: add or take away the parts, then the wholes; trade parts for a whole, or break a whole when the parts run out.
Together (no slots: the mixed numbers are on the screen and the app says them): line 1 before building the answer with bars (trading or breaking a whole), line 2 before a picture of bars (they type the mixed number), line 3 before the problem in symbols only.
Remember: a warm-up: name a shaded fraction (no slots).
Show: two problems to type as mixed numbers, no help, inside a small job in the world (no slots).`;
function ls3bFop4(id, t, g, idea, home) {
  const D = ls3B(id, t, g, {petSt: 1, bugs: ['mixSub', 'addBot'], brief: LS3B_BRIEF_FOP4, idea, home, fb: 'Wholes: {a}. Fourths: {b}.', test: 2,
    slots: {remember: [], explore: [], name: ['a', 'b'], together: [], check: ['ans'], show: []}});
  D.q = (st, r) => {
    let d, w1, a, w2, c, add;
    do { d = lsRi(r, 3, 8); add = r() < .5; w1 = lsRi(r, add ? 1 : 3, add ? 5 : 6); w2 = lsRi(r, 1, add ? 3 : w1 - 2); a = lsRi(r, 1, d - 1); c = lsRi(r, 1, d - 1); }
    while (add ? a + c <= d : a >= c);
    const W = add ? w1 + w2 + 1 : w1 - w2 - 1, P = add ? a + c - d : a + d - c, ans = `${W} ${P}/${d}`, F = (w, n) => `${w} ${fcFr(n, d)}`, Fs = (w, n) => `${w} and ${ls3Frs(n, d)}`;
    const e = `${F(w1, a)} ${add ? '+' : '−'} ${F(w2, c)}`, se = `${Fs(w1, a)} ${add ? 'plus' : 'minus'} ${Fs(w2, c)}`;
    const bug = add ? {addBot: [`${w1 + w2} ${a + c}/${2 * d}`]} : {mixSub: [`${w1 - w2} ${c - a}/${d}`]}, hint = {k: 'text', s: add ? `The parts make ${a + c} ${FC_NAMES[d]}s: trade ${d} of them for a whole.` : `${qN(a, FC_NAMES[d])} is not enough to take ${c}: break a whole into ${d} parts.`};
    if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'mixb', m: {d, target: ans, s0: add ? [w1 + w2, a + c] : [w1, a]}, s0: add ? [w1 + w2, a + c] : [w1, a], goal: 'mixv', eq: 'value', ans, sl: {}, bug, hint, vsay: ls3Say, ansSay: ls3Say(ans),
      html: lsEq(e) + lsCap(add ? 'All the bars are in. Trade parts for a whole.' : `Take away ${qN(w2, 'whole')} and ${qN(c, 'part')}.`), say: `${se}. ${add ? 'Trade parts for a whole.' : 'Break a whole if you need to.'}`});
    const o = {kind: 'num', sep: 'mix', eq: 'value', ans, sl: {}, bug, hint, vsay: ls3Say};
    if (st == 1) return lsDq(D, 1, Object.assign(o, {html: `<div class="pkq">${ls3bMixBars(w1, a, d)}${add ? ls3bMixBars(w2, c, d) : ''}</div>` + lsEq(`${e} = ${SLOT_MIX}`), say: `${se} equals what?`}));
    return lsDq(D, 2, Object.assign(o, {html: lsEq(`${e} = ${SLOT_MIX}`), say: `${se} equals what?`}));
  };
  D.warm = ls3bFrWarm(D);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'mixb', m: {d: 4, target: '1 1/4'}, goal: 'moved', eq: 'value', ans: '1 1/4', raw: 1, sl: {}, demo: [2, 3],
    html: lsCap('Make any mixed number with bars.'), say: 'Make any mixed number with whole bars and fourths.'}), nudge: 'Change the bars, then check.',
  react: v => { const [a, b] = Array.isArray(v) ? v : [2, 3]; return {ctx: {a, b}, lines: [b >= 4 ? `${qN(a, 'whole')} and ${b} fourths. Four fourths could make one more whole.` : `You made ${a} and ${ls3Frs(b, 4)}.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ls3bMixBars(c.a, c.b, 4)}</div>` + lsEq(`${c.a} ${fcFr(c.b, 4)}`), sl: c});
  return D;
}
const LS3B_BRIEF_FOP6 = `Explore: three whole bars; the child cuts each into any number of equal parts with a stepper; the app counts the pieces.
Name it: the cut bars (slots {n}: the bars, {b}: the parts in each, {sum}: all the pieces) and the idea: a whole number divided by a unit fraction is how many of those pieces fit; a unit fraction divided by a whole number cuts one piece smaller.
Together (no slots: the problem is on the screen and the app says it): line 1 before cutting whole bars into the parts a problem names, line 2 before a picture of cut bars (they type the answer), line 3 before the problem in symbols only.
Remember: a warm-up: name a shaded fraction (no slots).
Show: two divisions to type, no help, inside a small job in the world (no slots).`;
function ls3bFop6(id, t, g, idea, home) {
  const D = ls3B(id, t, g, {petSt: 1, bugs: ['flipDiv', 'mulFrac', 'slip'], brief: LS3B_BRIEF_FOP6, idea, home, fb: '{n} bars cut into {b} parts each make {sum} pieces.', test: 2,
    slots: {remember: [], explore: [], name: ['n', 'b', 'sum'], together: [], check: ['ans'], show: []}});
  D.q = (st, r) => {
    const big = st == 0 || r() < .55;
    if (big) {
      const w = lsRi(r, 2, 6), d = lsRi(r, 2, 8), ans = w * d, e = `${w} ÷ ${ls3Fr(1, d)}`, se = `${w} divided by ${ls3Frs(1, d)}`, bug = {flipDiv: [`1/${w * d}`], mulFrac: [`${w}/${d}`], slip: [ans + 1, ans - 1]};
      const hint = {k: 'text', s: `Each whole has ${d} ${ccPl(d)}. ${w} wholes: ${w} × ${d}.`};
      if (st == 0) return lsDq(D, 0, {kind: 'make', model: 'cut', m: {w, target: ans}, goal: 'value', eq: 'value', ans, sl: {}, bug: {slip: [ans + w]}, hint, ansSay: `${ans} ${ccPl(d)}`,
        html: lsEq(e) + lsCap(`How many ${ccPl(d)} fit in ${w}? Cut each bar into ${ccPl(d)}.`), say: `${se}. How many ${ccPl(d)} fit in ${w} wholes? Cut each bar into ${ccPl(d)}.`});
      return lsDq(D, Math.min(st, 2), {kind: 'num', ans, sl: {}, bug, hint, max: 2, html: (st == 1 ? `<div class="pkq">${ccBars(w, d)}</div>` : '') + lsEq(`${e} = ${SLOT}`), say: `${se} equals what?`});
    }
    const d = lsRi(r, 2, 6), n = lsRi(r, 2, 4), e = `${ls3Fr(1, d)} ÷ ${n}`, se = `${ls3Frs(1, d)} divided by ${n}`, ans = `1/${d * n}`;
    return ls3FQ(D, Math.min(st, 2), ans, (st == 1 ? `<div class="pkq">${ccSplit(d, n)}</div>` : '') + lsEq(`${e} = ${SLOT_FRAC}`), `${se} equals what?`,
      {sl: {}, eq: 'value', bug: {flipDiv: [d * n], mulFrac: [`${n}/${d}`], slip: [`1/${d + n}`]}, hint: {k: 'text', s: `Cut one ${FC_NAMES[d]} into ${n} pieces. The whole has ${d} × ${n} of them.`}});
  };
  D.warm = ls3bFrWarm(D);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'cut', m: {w: 3, target: 6}, goal: 'moved', eq: 'value', ans: 6, raw: 1, sl: {}, demo: [4],
    html: lsCap('Cut the bars into any number of equal parts.'), say: 'Cut each bar into any number of equal parts you like.'}), nudge: 'Cut the bars, then check.',
  react: v => { const b = Array.isArray(v) ? v[0] : +v / 3; return {ctx: {n: 3, b, sum: 3 * b}, lines: [`3 bars cut into ${b} parts each make ${3 * b} pieces.`]}; }});
  D.name = c => ({html: `<div class="pkq">${ccBars(c.n, c.b)}</div>` + lsEq(`${c.n} ÷ ${ls3Fr(1, c.b)} = ${c.sum}`), sl: c});
  return D;
}

/* ---- Convert Both Ways: to a smaller unit multiply, to a bigger unit divide ---- */
const LS3B_UNITS = [['feet', 'inches', 12, 'foot'], ['yards', 'feet', 3, 'yard'], ['meters', 'centimeters', 100, 'meter'], ['kilograms', 'grams', 1000, 'kilogram'],
  ['hours', 'minutes', 60, 'hour'], ['minutes', 'seconds', 60, 'minute'], ['gallons', 'quarts', 4, 'gallon'], ['pounds', 'ounces', 16, 'pound']];
const LS3B_BRIEF_MEAS6 = `Explore: the child picks how many feet with a stepper (no slots in the task); the app says how many inches that is, and back.
Name it: lines on their pick (slots {n}: the feet, {sum}: the inches) and the idea: to a smaller unit you need more of them, so multiply; to a bigger unit you need fewer, so divide.
Together (no slots: the units change from item to item and the app says them): line 1 before a table that counts up by one unit, line 2 before one unit's size and a problem, line 3 before the problem only.
Remember: a warm-up: a times fact (slots {a} {b}).
Show: two to type, no help, inside a small job in the world (no slots).`;
function ls3bMeas6(id, t, g, idea, home) {
  const D = ls3B(id, t, g, {petSt: 1, bugs: ['convDir', 'conv'], brief: LS3B_BRIEF_MEAS6, idea, home, fb: '{n} feet is {sum} inches.', test: 2,
    slots: {remember: ['a', 'b'], explore: [], name: ['n', 'sum'], together: [], check: ['ans'], show: []}});
  D.q = (st, r) => {
    const [B, S, k, one] = lsPk(r, LS3B_UNITS), n = lsRi(r, 2, 9), up = r() < .55, big = n * k, ans = up ? n : big;
    const from = up ? `${big} ${S}` : `${n} ${B}`, to = up ? B : S, bug = up ? {convDir: [big * k], conv: [big - k].filter(x => x > 0)} : {conv: [n + k], convDir: [n * k * k]};
    const hint = {k: 'text', s: up ? `${k} ${S} make one ${one}. How many groups of ${k} in ${big}?` : `One ${one} is ${k} ${S}. ${n} of them: ${n} × ${k}.`};
    const o = {kind: 'num', ans, sl: {}, bug, hint, max: 5};
    if (st == 0) return lsDq(D, 0, Object.assign(o, {html: `<div class="pkq">${VIZ.tableInOut([[1, k], [2, 2 * k], [3, 3 * k], up ? ['?', big] : [n, '?']], {head: [B, S]})}</div>` + lsEq(`${from} = ${SLOT} ${to}`),
      say: `The table counts ${B} and ${S}. How many ${to} is ${from}?`}));
    if (st == 1) return lsDq(D, 1, Object.assign(o, {html: lsCap(`1 ${one} = ${k} ${S}`) + lsEq(`${from} = ${SLOT} ${to}`), say: `One ${one} is ${k} ${S}. How many ${to} is ${from}?`}));
    return lsDq(D, 2, Object.assign(o, {html: lsEq(`${from} = ${SLOT} ${to}`), say: `How many ${to} is ${from}?`}));
  };
  D.warm = ls3WarmFact(D, 2, 9);
  D.exp = () => ({q: lsDq(D, 0, {kind: 'make', model: 'pickn', m: {v: [3], lo: [1], hi: [9], ds: [[1]], lab: ['Feet'], fmt: s => `${s[0]} feet`}, raw: 1, goal: 'mine', eq: 'value', ans: 1, sl: {},
    html: lsCap('Pick how many feet.'), say: 'Pick how many feet. I will tell you the inches, and back again.'}), nudge: 'Change the number, then check.',
  react: v => { const n = Array.isArray(v) ? v[0] : 3; return {ctx: {n, sum: 12 * n}, lines: [`${n} feet is ${12 * n} inches. And ${12 * n} inches is ${n} feet.`]}; }});
  D.name = c => ({html: `<div class="pkq">${VIZ.tableInOut([[1, 12], [c.n, c.sum]], {head: ['feet', 'inches']})}</div>` + lsEq(`${c.n} × 12 = ${c.sum}`) + lsEq(`${c.sum} ÷ 12 = ${c.n}`), sl: c});
  return D;
}

// ---- the lessons, in map order (Multiply Mountain and Fraction Forest: 3rd grade; Decimal Desert: 4th grade; Volcano Lab and Crystal
// Caves: 5th grade). The idea and tonight's question here are the hand-written fallback. ----
lsDraft3('story5', ls3bSt5('story5', 'Story Problems 5', 3, 'Draw the story as equal boxes, then multiply or divide.', 'Ask {name}: "4 bags with 6 apples in each. How many apples?"'));
lsDraft3('data3', ls3bData3('data3', 'Scaled Graphs', 3, 'Each line or picture can stand for more than one: count by the scale.', 'Ask {name}: "Each picture means 5. How many is 4 pictures?"'));
lsDraft3('shape5', ls3bShape5('shape5', 'Shape Families', 3, 'Sort shapes by their sides and corners: a square is a rectangle too.', 'Ask {name}: "Is a square a rectangle? Why?"'));
lsDraft3('time6', ls3bTime6('time6', 'How Much Time Passed', 3, 'Count the minutes up to the next hour, then on from it.', 'Ask {name}: "How long from 2:40 to 3:15?"'));
lsDraft3('meas4', ls3bMeas4('meas4', 'Rulers & Scales', 3, 'Find what one mark is worth, then count by it.', 'Ask {name} to read the marks on a measuring cup.'));
lsDraft3('story6', ls3bSt6('story6', 'Story Problems 6', 3, 'A two-step story: do the first step, then use its answer.', 'Ask {name}: "3 boxes of 8 crayons, and 5 more. How many?"'));
lsDraft3('ang1', ls3bAng1('ang1', 'Kinds of Angles', 4, 'Compare an angle with a square corner: less is acute, more is obtuse.', 'Ask {name} to find a right angle, an acute angle and an obtuse angle at home.'));
lsDraft3('ang2', ls3bAng2('ang2', 'Measure Angles', 4, 'Start at zero on the side the angle starts, then count up that scale.', 'Ask {name}: "A straight line is split into two angles. One is 50°. The other?"'));
lsDraft3('shape6', ls3bShape6('shape6', 'Symmetry & Lines', 4, 'A line of symmetry folds a shape into two matching halves.', 'Ask {name} to fold a paper square every way that makes matching halves.'));
lsDraft3('pat4', ls3bRule('pat4', 'In and Out Tables', 4, false, 'The rule goes across, from in to out: test it on every row.', 'Ask {name}: "In 2, out 8. In 3, out 12. What is the rule?"'));
lsDraft3('story7', ls3bSt7('story7', 'Remainder Stories', 4, 'After dividing, ask what the leftovers mean in the story.', 'Ask {name}: "26 kids, 4 in each car. How many cars?"'));
lsDraft3('dbig4', ls3bDb4('dbig4', 'Divide by 2-Digit', 5, 'Guess how many fit, multiply back, then check what is left.', 'Ask {name}: "How many 24s fit in 500?"'));
lsDraft3('fop4', ls3bFop4('fop4', 'Mixed Numbers', 5, 'Work the parts, then the wholes; trade or break a whole when you need to.', 'Ask {name}: "What is 3 1/4 take away 1 3/4?"'));
lsDraft3('coord1', ls3bXY('coord1', 'Coordinate Grid', 5, 'An ordered pair is across first, then up, both from zero.', 'Ask {name} to mark (3, 5) on squared paper.'));
lsDraft3('fop6', ls3bFop6('fop6', 'Unit Fraction Division', 5, 'Dividing by a unit fraction counts how many pieces fit.', 'Ask {name}: "How many quarter pizzas are in 3 pizzas?"'));
lsDraft3('meas6', ls3bMeas6('meas6', 'Convert Both Ways', 5, 'To a smaller unit multiply; to a bigger unit divide.', 'Ask {name}: "How many feet is 36 inches?"'));
lsDraft3('data4', ls3bData4('data4', 'Line Plots', 5, 'Each dot is a length: to find a total, add the lengths, not the dots.', 'Ask {name} to measure 5 pencils to the nearest half inch and make a line plot.'));
lsDraft3('pat5', ls3bRule('pat5', 'Two Rules', 5, true, 'Two patterns from zero: find how each B number is made from its A number.', 'Ask {name}: "Count by 3s and by 6s. How do the two lists match up?"'));
lsDraft3('story8', ls3bSt8('story8', 'Fraction Stories', 5, 'To find a fraction of an amount, divide by the bottom, then times the top.', 'Ask {name}: "What is 3/4 of 24?"'));
