// STORIES-7 (BEST-APP roadmap 7): the decodability checker for the mini-stories (src/js/52w-story7d.js, ST7).
// A story at a phonics stage may use only
//   (a) words that can be sounded out with the letter-sound patterns taught up to and including its stage (STAGES below), and
//   (b) sight words the reading map has taught by then: the Dolch list (DOL, src/js/20-words.js) of every Sight Words stop that comes
//       before the stage's stop on the reading map (PATHS.read, src/js/42-paths.js). sight1 is DOL[0], sight2 DOL[1], ...
// Every word of every title and sentence is checked. Used by tools/test.js (STORIES-7) and by hand:
//   node tools/decode.js                 every story: OK, or the words that do not fit, and a count per stage
//   node tools/decode.js --doc           the story tables of docs/drafts/STORIES7-READ.md (stage, title, text, words)
//   node tools/decode.js --word <w> [stage]   how one word decodes (or why not), at every stage or one
//
// How a word decodes. The word is split into graphemes (letters or letter teams) known at the stage, every way it can be; it decodes
// when one split obeys the rules of the stage:
//   cvc      (Picture Words, K) single consonants, the short vowels a e i o u, a doubled last letter (egg, hill, mess); one syllable:
//            at most one consonant sound before and one after the vowel
//   blend    (Blends) consonant clusters before and after the vowel (fr, st, nd, mp ...), ng and nk, doubled letters, and words of
//            two closed syllables (picnic, sunset: two consonant letters between the vowels)
//   digraph  (Letter Teams) sh ch th wh ck
//   silente  (Silent E) a vowel, one consonant and a quiet e at the end (cake, kite, bone, cube, Pete; ice and race keep c soft);
//            a quiet e after a vowel team or a bossy r and one consonant (house, horse) once that team is taught
//   team     (Vowel Teams) ai ay ee ea oa
//   rvowel   (Bossy R) ar or er ir ur
//   team2    (Vowel Teams 2) oo ou ow oi oy aw ew
// The rules that keep a word honest at every stage (a word that breaks one is a sight word or not allowed):
//   - a short single vowel never ends a word or a syllable (go, he, robot, lemon need a pattern not taught: open syllables);
//   - two vowel letters side by side must be a taught team; y and w only before a vowel (cow, my, saw are not short-vowel words);
//     h only at the start of a word; x never at the start; q is not taught;
//   - r right after a vowel only as a bossy r (from rvowel); never after a vowel team, and never vowel-r-e (care, more, fire);
//   - c before e, i or y only in a silent-e ending (ice, race); g before e, i or y only in the hard-g words of HARDG (get, gift);
//   - a + l (ball, talk, salt), old, ind, ild, oll and wa/wor words (was, want, work) are not short-vowel words (IRREG_RX), nor
//     the words of IRREG (put, push, son, come, give, have, bread ...): they need a rule not taught, so only a sight list can allow them;
//   - an -s ending (cats, jumps, cakes) or 's (Dad's) on a word that decodes, or on a sight word (looks, likes); never on a word
//     ending s, x, z, sh or ch (that needs -es, not taught).
'use strict';
const STAGES = [
  { id: 'cvc', stop: 'pic1', name: 'short vowels (CVC)' },
  { id: 'blend', stop: 'pic2', name: 'blends' },
  { id: 'digraph', stop: 'sound4', name: 'letter teams sh ch th wh ck' },
  { id: 'silente', stop: 'pic3', name: 'silent e' },
  { id: 'team', stop: 'pic4', name: 'vowel teams ai ay ee ea oa' },
  { id: 'rvowel', stop: 'pic5', name: 'bossy r: ar or er ir ur' },
  { id: 'team2', stop: 'pic6', name: 'vowel teams oo ou ow oi oy aw ew' },
];
const SI = Object.fromEntries(STAGES.map((s, i) => [s.id, i]));
const CONS = 'bcdfghjklmnprstvwxyz'.split('');
const VOW = 'aeiou';
const DOUBLE_OK = 'bdfglmnprstz'; // doubled letters that are one sound (rabbit, egg, hill, mess, fizz)
const DIG = ['sh', 'ch', 'th', 'wh', 'ck'];
const TEAM = ['ai', 'ay', 'ee', 'ea', 'oa'];
const RV = ['ar', 'or', 'er', 'ir', 'ur'];
const TEAM2 = ['oo', 'ou', 'ow', 'oi', 'oy', 'aw', 'ew'];
// words that look regular but are not (they need a rule the stages do not teach); a sight list may still allow them
const IRREG = new Set(('put push pull full bull bush puss son ton won front month mother other brother another come some done gone none one '
  + 'love dove glove shove move prove lose whose give live have are were there where here eye was what want wash watch water any many '
  + 'said says of to do two who you your four pretty very bread head dead read lead great break bear pear wear heart steak friend '
  + 'buy guy your our their they could would should both most post host ghost gross kind mind find wild child old cold gold hold told '
  + 'sold bold fold roll toll poll doll walk talk chalk ball call fall hall tall wall small all also always salt').split(' '));
const IRREG_RX = /a(ll|l[^aeiouy])|old|olt|oll|i[ln]d|wa(s|t|sh|nt|nd|lk|ll|r|tch|p|ter)|wor|^(most|post|host|ghost)/;
const HARDG = new Set('get gets gift gifts girl girls give gig'.split(' ')); // g before e, i or y that is hard (girl: once ir is taught)

// all the graphemes known at stage k: [text, type] with type C (consonant), V (short vowel), T (vowel team), R (bossy r)
function graphemes(k) {
  const g = CONS.map(c => [c, 'C']).concat([...VOW].map(v => [v, 'V']));
  for (const c of DOUBLE_OK) g.push([c + c, 'D']);
  if (k >= SI.blend) g.push(['ng', 'C'], ['nk', 'C']);
  if (k >= SI.digraph) for (const d of DIG) g.push([d, 'C']);
  if (k >= SI.team) for (const t of TEAM) g.push([t, 'T']);
  if (k >= SI.rvowel) for (const t of RV) g.push([t, 'R']);
  if (k >= SI.team2) for (const t of TEAM2) g.push([t, 'T']);
  return g;
}
const GCACHE = STAGES.map((s, k) => graphemes(k));

// every split of w into graphemes of stage k (a silent-e ending is marked E on the final e)
function splits(w, k) {
  const out = [], G = GCACHE[k];
  const go = (i, acc) => {
    if (out.length > 200) return;
    if (i === w.length) { out.push(acc); return; }
    for (const [t, ty] of G) if (w.startsWith(t, i)) go(i + t.length, acc.concat([[t, ty]]));
    if (k >= SI.silente && i === w.length - 1 && w[i] === 'e') go(i + 1, acc.concat([['e', 'E']])); // a quiet e at the end
  };
  go(0, []);
  return out;
}
const isNuc = ty => ty === 'V' || ty === 'T' || ty === 'R';
// why one split does not fit stage k ('' when it fits)
function splitBad(w, s, k) {
  const n = s.length, nuc = s.map((x, i) => isNuc(x[1]) ? i : -1).filter(i => i >= 0);
  if (!nuc.length) return 'no vowel';
  if (k < SI.blend && nuc.length > 1) return 'two syllables';
  for (let i = 0; i < n; i++) {
    const [t, ty] = s[i], prev = s[i - 1], next = s[i + 1];
    if (ty === 'E') {
      // a quiet e: after one consonant that follows a nucleus (a short vowel makes it long: cake; a team or bossy r keeps it: house)
      if (i !== n - 1 || !prev || prev[1] !== 'C' || prev[0].length !== 1 || 'hwxyr'.includes(prev[0])) return 'a quiet e that does not fit';
      const v = s[i - 2];
      if (!v || !isNuc(v[1])) return 'a quiet e that does not fit';
      if (v[1] === 'V' && s[i - 3] && isNuc(s[i - 3][1])) return 'a quiet e that does not fit';
      continue;
    }
    if (ty === 'V' && next && isNuc(next[1])) return 'two vowels side by side';
    if (ty === 'T' && next && isNuc(next[1])) return 'a vowel after a vowel team';
    if (ty === 'R' && next && isNuc(next[1])) return 'a vowel after a bossy r';
    if (ty === 'V') {
      // a short vowel closes its syllable: never last, and two consonant letters before the next vowel (sunset, rabbit; not lemon)
      if (!next) return 'an open syllable';
      const nx = nuc.find(j => j > i);
      if (nx != null) {
        const between = s.slice(i + 1, nx).reduce((a, x) => a + x[0].length, 0);
        if (between < 2) return 'an open syllable (one consonant between two vowels)';
      }
    }
    if (ty === 'C' || ty === 'D') {
      if (t === 'h' && i !== 0) return 'h not at the start';
      if ((t === 'y' || t === 'w') && !(next && isNuc(next[1]))) return t + ' not before a vowel';
      if (t === 'y' && i !== 0) return 'y not at the start';
      if (t === 'x' && i === 0) return 'x at the start';
      if (t === 'wh' && i !== 0) return 'wh not at the start';
      if ((t === 'ck' || t === 'ng' || t === 'nk' || ty === 'D') && !(prev && prev[1] === 'V')) return t + ' not after a short vowel';
      if (ty === 'D' && k < SI.blend && i !== n - 1) return 'a doubled letter inside a word';
      if (t === 'r' || t === 'rr') { if (prev && isNuc(prev[1])) return 'r after a vowel'; }
      const nl = w[s.slice(0, i + 1).reduce((a, x) => a + x[0].length, 0)];
      if (t === 'c' && /[eiy]/.test(nl || '') && !(next && next[1] === 'E')) return 'a soft c';
      if (t === 'c' && nl === 'k') return 'ck read as two sounds';
      if (t === 'g' && /[eiy]/.test(nl || '') && !HARDG.has(w)) return 'a soft g';
    }
  }
  // consonant clusters: at cvc, one consonant sound each side of the vowel
  if (k < SI.blend) {
    const v = nuc[0];
    if (v > 1 || n - 1 - v > 1) return 'a consonant blend';
  }
  if (/[aeiou]re$/.test(w)) return 'vowel-r-e';
  if (/([xz]|sh|ch)s$/.test(w)) return 'an -s that needs -es';
  return '';
}
// decodes at stage k? returns '' or the reason it does not
function whyNot(w, k) {
  if (!/^[a-z]+$/.test(w)) return 'not a plain word';
  if (IRREG.has(w)) return 'irregular';
  if (IRREG_RX.test(w)) return 'irregular pattern';
  let why = 'no split';
  for (const s of splits(w, k)) { const b = splitBad(w, s, k); if (!b) return ''; why = b; }
  return why;
}
// the lowest stage index at which w decodes (with an -s or 's ending), or -1
function minStage(w) {
  let m = -1;
  for (let k = 0; k < STAGES.length; k++) if (!whyNot(w, k)) { m = k; break; }
  const base = suffixBase(w), b = base ? minStage(base) : -1;
  return b >= 0 && (m < 0 || b < m) ? b : m;
}
// the word without an -s or 's ending, when it may take one (null otherwise)
function suffixBase(w) {
  if (w.endsWith("'s")) return w.slice(0, -2) || null;
  if (w.length > 2 && w.endsWith('s') && !/(s|x|z|sh|ch)s$/.test(w) && !w.endsWith('ss')) return w.slice(0, -1);
  return null;
}
// a token of a story as it is checked: lower case, no punctuation round it, curly apostrophes made straight
const clean = tok => tok.toLowerCase().replace(/[’‘]/g, "'").replace(/^[^a-z']+|[^a-z']+$/g, '').replace(/^'+|'+$/g, '');
// the sight words taught by the stage's stop: DOL lists of the Sight Words stops before it on the reading map (NODES order)
function sightAt(stage, ctx) {
  const st = STAGES[SI[stage]], order = ctx.readOrder, at = order.indexOf(st.stop), set = new Set(), lists = [];
  if (at < 0) return { set, lists };
  order.slice(0, at).forEach(id => { const m = /^sight(\d)$/.exec(id); if (m && ctx.DOL[+m[1] - 1]) { lists.push(id); ctx.DOL[+m[1] - 1].forEach(x => set.add(x.toLowerCase())); } });
  return { set, lists };
}
// one word at a stage: {w, ok, kind: 'decode' | 'sight', at (min stage index), why}
function wordAt(w, stage, sight) {
  const k = SI[stage], m = minStage(w);
  if (m >= 0 && m <= k) return { w, ok: true, kind: 'decode', at: m };
  if (sight.has(w)) return { w, ok: true, kind: 'sight', at: -1 };
  const b = suffixBase(w);
  if (b && sight.has(b)) return { w, ok: true, kind: 'sight', at: -1 };
  return { w, ok: false, kind: m >= 0 ? 'later' : 'none', at: m, why: m >= 0 ? 'needs ' + STAGES[m].id : whyNot(w, k) };
}
// every word of a story (title and sentences)
const storyWords = st => [st.t, ...st.s].join(' ').split(/\s+/).map(clean).filter(Boolean);
function checkStory(st, ctx) {
  const sight = sightAt(st.st, ctx).set, res = storyWords(st).map(w => wordAt(w, st.st, sight));
  const bad = res.filter(r => !r.ok), k = SI[st.st];
  const uniq = a => [...new Set(a)];
  return {
    id: st.id, bad, words: res,
    pattern: uniq(res.filter(r => r.kind === 'decode' && r.at === k).map(r => r.w)), // the stage's own new pattern
    sight: uniq(res.filter(r => r.kind === 'sight').map(r => r.w)),
    earlier: uniq(res.filter(r => r.kind === 'decode' && r.at < k).map(r => r.w)),
  };
}

// ---- loading the app's data in Node (the CLI; tools/test.js passes its own) ----
function appCtx(root = require('path').join(__dirname, '..')) {
  const fs = require('fs'), path = require('path'), vm = require('vm');
  const rd = f => fs.readFileSync(path.join(root, 'src', 'js', f), 'utf8');
  const c = vm.createContext({migrate() {}, S: {maps: {}}});
  vm.runInContext(rd('20-words.js') + ';' + rd('42-paths.js') + ';' + rd('52w-story7d.js')
    + ';this.__o={DOL,readOrder:NODES.read.map(n=>nid(n)),ST7};', c);
  return c.__o;
}
function report(ctx) {
  const out = [], per = {};
  let bad = 0;
  for (const st of ctx.ST7.list) {
    const r = checkStory(st, ctx);
    per[st.st] = (per[st.st] || 0) + 1;
    if (r.bad.length) { bad++; out.push(st.id + ' "' + st.t + '": ' + r.bad.map(b => b.w + ' (' + b.why + ')').join(', ')); }
  }
  return { bad, out, per };
}
function docTables(ctx) {
  const lines = [], esc = s => s.replace(/\|/g, '\\|');
  for (const sg of STAGES) {
    const list = ctx.ST7.list.filter(s => s.st === sg.id);
    if (!list.length) continue;
    const sw = sightAt(sg.id, ctx);
    lines.push('', `### Stage: ${sg.id} (${sg.name}; after the stop ${sg.stop}; sight words from ${sw.lists.join(', ') || 'none'})`, '');
    lines.push('| Story | Title | Text | Pattern words | Sight words | Questions |', '|---|---|---|---|---|---|');
    for (const st of list) {
      const r = checkStory(st, ctx);
      lines.push(`| ${st.id} | ${esc(st.t)} | ${esc(st.s.join(' '))} | ${r.pattern.join(', ') || '-'} | ${r.sight.join(', ') || '-'} | `
        + st.q.map(q => esc(q[0]) + ' (' + q[1] + '; not ' + q[2].join(', ') + ')').join('<br>') + ' |');
    }
  }
  return lines.join('\n');
}
module.exports = { STAGES, SI, whyNot, minStage, wordAt, sightAt, checkStory, storyWords, clean, appCtx, report, docTables, IRREG, HARDG };

if (require.main === module) {
  const a = process.argv.slice(2), ctx = appCtx();
  if (a[0] === '--doc') { console.log(docTables(ctx)); process.exit(0); }
  if (a[0] === '--word') {
    const w = clean(a[1] || ''), ks = a[2] ? [SI[a[2]]] : STAGES.map((s, k) => k);
    for (const k of ks) console.log(STAGES[k].id.padEnd(8), whyNot(w, k) || 'decodes', '| with the sight words:', JSON.stringify(wordAt(w, STAGES[k].id, sightAt(STAGES[k].id, ctx).set)));
    process.exit(0);
  }
  const r = report(ctx);
  for (const l of r.out) console.log('NOT DECODABLE ' + l);
  console.log((r.bad ? r.bad + ' stories have words that do not fit' : 'every story is decodable at its stage') + ': '
    + STAGES.map(s => s.id + ' ' + (r.per[s.id] || 0)).join(', ') + ' (' + ctx.ST7.list.length + ' stories)');
  process.exit(r.bad ? 1 : 0);
}
