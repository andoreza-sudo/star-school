/* ---------- vocabulary, levels 1-5 (P2-22, CURRICULUM E-vocab) ---------- */
/* BANK.vocab is built once, when this file loads, from the plain lists below. Nothing here uses rnd(): the same file always gives the
   same items, and the round engine (37-bank.js genBank) does all the shuffling at question time.
   Level 1 opposites, 2 synonyms, 3 compound words, 4 prefixes (un re pre dis mis), 5 suffixes (ful less ly er est able).
   Rows are `a|b|c,d` text, one item per line; an optional last column `name,emoji` is a picture for the prompt word (picFor).
   The distractors are real, plausible mistakes: a synonym when the question asks for an opposite, the other prefix or suffix
   meanings of the same base word, and so on. Every item has exactly one right answer. A test (tools/test.js, "vocabulary") checks it all. */

const VOC_HINT = {
  1: 'Say it as a pair, like "black and white". Which word is the very opposite?',
  2: 'Try each word in a sentence in place of the first one. Which still says the same thing?',
  3: 'Listen to the long word. Break it where you hear two small words, then check the pair.',
  4: 'Split off the little start piece. Read the base word first, then think what the start piece adds.',
  5: 'Cover the ending and read the base word. Then think what the ending adds to it.',
};

const VOC_L1 = `hot|cold|warm,wet|hot,🔥
cold|hot|icy,snowy|cold,❄
big|small|huge,tall|big,🐘
small|big|tiny,short|small,🐭
up|down|over,high
in|out|inside,under
day|night|sunny,morning|day,☀
night|day|dark,moon|night,🌙
open|shut|wide,broken|open,🔓
happy|sad|glad,silly|happy,😊
fast|slow|quick,late|fast,🏎
old|new|dusty,tall|old,👴
young|old|little,small|young,👶
wet|dry|damp,cold|wet,💧
full|empty|heavy,more|full,🥛
soft|hard|fluffy,loud
loud|quiet|noisy,busy|loud,🔊
stop|go|halt,wait
push|pull|shove,pick
long|short|wide,thin
front|back|side,top
top|bottom|middle,side
give|take|pass,share
awake|asleep|tired,quiet
early|late|soon,first
clean|dirty|tidy,shiny
easy|hard|simple,fun
dark|bright|black,night
left|right|back,up
near|far|close,here
low|high|small,down
smile|frown|grin,laugh|smile,🙂
win|lose|play,race|win,🏆
laugh|cry|giggle,smile
sweet|sour|sugar,tasty|sweet,🍬
come|go|arrive,walk
buy|sell|pay,shop|buy,🛍
start|end|begin,first
yes|no|maybe,okay
above|below|over,high
thick|thin|fat,wide
heavy|light|big,strong
boy|girl|man,baby|boy,👦
same|different|equal,alike
true|false|real,right
before|after|first,early
always|never|often,usually
many|few|lots,plenty
stand|sit|run,jump
sink|float|swim,drop
rough|smooth|bumpy,hard
tight|loose|snug,small
brave|scared|bold,strong
forget|remember|lose,miss
lost|found|missing,gone
narrow|wide|thin,small`;

const VOC_L2 = `happy|glad|sad,tired
big|large|small,tall
small|tiny|huge,heavy
fast|quick|slow,late
smart|clever|silly,quiet
begin|start|end,wait
end|finish|begin,stay
shout|yell|whisper,hum
pretty|beautiful|messy,plain
look|see|hear,taste
tired|sleepy|hungry,angry
mad|angry|sleepy,silly
sad|unhappy|excited,sleepy
scared|afraid|brave,calm
glad|pleased|upset,tired
nice|kind|rude,loud
quiet|silent|noisy,busy
jump|leap|crawl,sit
walk|stroll|sprint,hop
run|dash|crawl,rest
toss|throw|catch,hold
cold|chilly|warm,damp
rock|stone|sand,hill
road|street|bridge,field|road,🛣
home|house|school,room|home,🏠
couch|sofa|chair,table
little|small|loud,long
huge|giant|tiny,heavy
loud|noisy|quiet,slow
speak|talk|listen,write
shut|close|open,lock
choose|pick|leave,lose
grin|smile|frown,laugh
gift|present|party,wrapper|gift,🎁
kid|child|adult,baby
fix|repair|break,buy
simple|easy|hard,short
fall|drop|rise,float
hurry|rush|rest,wait
stop|halt|start,go
giggle|laugh|cry,shout
cry|weep|laugh,sing
sick|ill|well,tired
story|tale|song,poem|story,📖
bunny|rabbit|kitten,puppy
sea|ocean|lake,river|sea,🌊
under|below|above,beside
pull|tug|push,lift
pal|friend|stranger,teacher
rest|relax|work,run
tidy|neat|messy,dirty
soil|dirt|water,grass`;

// word, first part, second part, optional picture name and emoji. Every word is the two parts joined.
const VOC_L3 = `rainbow|rain|bow|rainbow,🌈
sunflower|sun|flower|sunflower,🌻
football|foot|ball
basketball|basket|ball|basketball,🏀
cupcake|cup|cake|cupcake,🧁
bedroom|bed|room|bedroom,🛏
birthday|birth|day|birthday,🎂
butterfly|butter|fly|butterfly,🦋
goldfish|gold|fish|goldfish,🐟
notebook|note|book
pancake|pan|cake
playground|play|ground
popcorn|pop|corn
raincoat|rain|coat
sailboat|sail|boat|sailboat,⛵
sandbox|sand|box
snowman|snow|man|snowman,⛄
starfish|star|fish|starfish,⭐
toothbrush|tooth|brush
backpack|back|pack
bathtub|bath|tub|bathtub,🛁
bookshelf|book|shelf
doghouse|dog|house
doorbell|door|bell
firefly|fire|fly
haircut|hair|cut
homework|home|work
ladybug|lady|bug|ladybug,🐞
lunchbox|lunch|box
mailbox|mail|box|mailbox,📬
moonlight|moon|light
newspaper|news|paper
outside|out|side
paintbrush|paint|brush
seashell|sea|shell|seashell,🐚
shoelace|shoe|lace
sidewalk|side|walk
sunshine|sun|shine
sunset|sun|set|sunset,🌅
upstairs|up|stairs
windmill|wind|mill
weekend|week|end
airplane|air|plane|airplane,✈
anthill|ant|hill
baseball|base|ball
beehive|bee|hive|beehive,🐝
blueberry|blue|berry
classroom|class|room
daydream|day|dream
fireplace|fire|place
bluebird|blue|bird|bluebird,🐦`;

// prefixes: un (not, or undo), re (again), pre (before), dis (not), mis (wrong).
// kind n = not + adjective, d = not + verb, u = undo (meaning written out), a = again, b = before, m = the wrong way.
// row: kind|prefix|base|meaning (u only)
const VOC_L4A = `n|un|happy
n|un|fair
n|un|safe
n|un|kind
n|un|clear
n|un|lucky
n|dis|honest
d|dis|like
d|dis|agree
d|dis|obey
d|dis|trust
u|un|lock|open a lock
u|un|tie|undo a knot
u|un|pack|take things out of a bag
u|un|wrap|take the wrapping off
u|un|zip|open a zipper
u|un|button|open a button
a|re|do
a|re|read
a|re|write
a|re|play
a|re|fill
a|re|build
a|re|heat
a|re|tell
a|re|paint
a|re|open
a|re|use
b|pre|heat
b|pre|pay
b|pre|wash
b|pre|test
b|pre|view
b|pre|order
m|mis|spell
m|mis|read
m|mis|use
m|mis|label
m|mis|behave
m|mis|judge
m|mis|hear`;

// add-the-start-piece items: prefix|base|meaning. Only the prefix named makes a word with exactly that meaning.
const VOC_L4B = `un|happy|not happy
un|kind|not kind
un|fair|not fair
un|safe|not safe
un|lock|open a lock
un|tie|undo a knot
re|do|do again
re|read|read again
re|write|write again
re|fill|fill again
re|build|build again
pre|heat|heat before
pre|pay|pay before
pre|wash|wash before
pre|view|view before
dis|agree|not agree
dis|obey|not obey
dis|honest|not honest
mis|spell|spell the wrong way
mis|read|read the wrong way
mis|place|put in the wrong place
mis|use|use the wrong way`;

// suffixes. Rows: word|base|ending|meaning; the other meanings come from the base word. Kinds are set by the section.
const VOC_L5_FUL = 'care help hope joy color thank play pain peace use cheer power'.split(' ');
const VOC_L5_LESS = 'care help hope fear end use harm pain sleep thought'.split(' ');
const VOC_L5_LY = 'slow quick quiet soft sad loud brave glad kind bad'.split(' ');
const VOC_L5_ER = 'tall fast small old cold strong slow bright'.split(' ');
const VOC_L5_EST = 'tall fast small old cold strong warm bright'.split(' ');
// agent -er: word|verb|"one who" word|past form for "able to be"
const VOC_L5_AGENT = `teacher|teach|teaches
singer|sing|sings
painter|paint|paints
driver|drive|drives
farmer|farm|farms
builder|build|builds`;
// -able: word|verb|past form|verb with s
const VOC_L5_ABLE = `washable|wash|washed|washes
breakable|break|broken|breaks
readable|read|read|reads
wearable|wear|worn|wears
fixable|fix|fixed|fixes
bendable|bend|bent|bends
playable|play|played|plays`;

const VOC_ROWS = t => t.split('\n').map(r => r.split('|'));
const VOC_EM = c => (c ? c.split(',') : undefined);
const VOC_IT = (lv, topic, q, a, d, form, em) => {
  const it = { lv, q, a, d, topic, hint: VOC_HINT[lv] };
  if (form) it.form = form;
  if (em) it.em = em;
  return it;
};

function vocBuild() {
  const out = [];
  // level 1 opposites and level 2 synonyms
  for (const [w, a, d, em] of VOC_ROWS(VOC_L1)) out.push(VOC_IT(1, 'opposites', `What is the opposite of ${w}?`, a, d.split(','), '', VOC_EM(em)));
  for (const [w, a, d, em] of VOC_ROWS(VOC_L2)) out.push(VOC_IT(2, 'synonyms', `Which word means the same as ${w}?`, a, d.split(','), '', VOC_EM(em)));
  // level 3 compound words: which two words make it, and what do two words make
  const L = VOC_ROWS(VOC_L3), words = new Set(L.map(x => x[0])), n = L.length;
  const other = (i, k, ok) => { // the next part from another compound (k steps on) that passes ok
    for (let j = 1; j < n; j++) { const c = L[(i + k * j) % n]; if (ok(c)) return c; }
    return L[(i + 1) % n];
  };
  L.forEach(([w, a, b, em], i) => {
    const e = em ? em.split(',') : undefined;
    const d1 = other(i, 7, c => c[2] !== b && !words.has(a + c[2]));
    const d2 = other(i, 11, c => c[1] !== a && !words.has(c[1] + b));
    const d3 = !words.has(b + a) && b + a !== w ? b + ' + ' + a : other(i, 13, c => c[1] !== a && c[2] !== b && !words.has(c[1] + d1[2])).slice(1, 3).join(' + ');
    out.push(VOC_IT(3, 'compound', `Which two words make ${w}?`, a + ' + ' + b, [a + ' + ' + d1[2], d2[1] + ' + ' + b, d3], 'wide', e));
  });
  L.forEach(([w, a, b], i) => {
    if (i % 3) return; // one in three also gets the "put them together" form (16 items)
    const near = L.filter(x => x[0] !== w && (x[1] === a || x[2] === b || x[1] === b || x[2] === a)).map(x => x[0]);
    const d = [...new Set([...near, ...[5, 9, 14, 20].map(k => L[(i + k) % n][0])])].filter(x => x !== w).slice(0, 3);
    out.push(VOC_IT(3, 'compound', `What do ${a} and ${b} make together?`, w, d, ''));
  });
  // level 4 prefixes
  const P4 = ['un', 're', 'pre', 'dis', 'mis'];
  VOC_ROWS(VOC_L4A).forEach(([k, p, b, m]) => {
    const word = p + b, not = `not ${b}`, again = `${b} again`, before = `${b} before`, wrong = `${b} the wrong way`;
    let a, d;
    if (k == 'n') { a = not; d = [`very ${b}`, again, `more ${b}`]; }
    else if (k == 'd') { a = not; d = [again, before, wrong]; }
    else if (k == 'u') { a = m; d = [again, before, wrong]; }
    else if (k == 'a') { a = again; d = [not, before, wrong]; }
    else if (k == 'b') { a = before; d = [not, again, wrong]; }
    else { a = wrong; d = [not, again, before]; }
    out.push(VOC_IT(4, 'prefix', `What does ${word} mean?`, a, d, 'wide'));
  });
  VOC_ROWS(VOC_L4B).forEach(([p, b, m], i) => {
    const sib = p == 'un' ? 'dis' : p == 'dis' ? 'un' : '';
    const rest = P4.filter(x => x != p && x != sib);
    const d = [...(sib ? [sib] : []), ...rest.slice(i % rest.length), ...rest.slice(0, i % rest.length)].slice(0, 3);
    out.push(VOC_IT(4, 'prefix', `___${b} = ${m}. Which start piece?`, p, d, ''));
  });
  // level 5 suffixes
  const S5 = ['ful', 'less', 'ly', 'er', 'est', 'able'];
  const sfx = (a, i) => { const r = S5.filter(x => x != a); const o = i % 3; return [r[o], r[(o + 2) % 5], r[(o + 3) % 5]]; };
  const A5 = (word, m, d) => out.push(VOC_IT(5, 'suffix', `What does ${word} mean?`, m, d, 'wide'));
  for (const b of VOC_L5_FUL) A5(b + 'ful', `full of ${b}`, [`without ${b}`, `more ${b}`, `the most ${b}`]);
  for (const b of VOC_L5_LESS) A5(b + 'less', `without ${b}`, [`full of ${b}`, `more ${b}`, `the most ${b}`]);
  for (const b of VOC_L5_LY) A5(b + 'ly', `in a ${b} way`, [`more ${b}`, `the most ${b}`, `not ${b}`]);
  for (const b of VOC_L5_ER) A5(b + 'er', `more ${b}`, [`in a ${b} way`, `the most ${b}`, `not ${b}`]);
  for (const b of VOC_L5_EST) A5(b + 'est', `the most ${b}`, [`more ${b}`, `in a ${b} way`, `not ${b}`]);
  for (const [w, v, s] of VOC_ROWS(VOC_L5_AGENT)) A5(w, `a person who ${s}`, [`${v} again`, `${v} the wrong way`, `${v} before`]);
  for (const [w, v, pp, vs] of VOC_ROWS(VOC_L5_ABLE)) A5(w, `able to be ${pp}`, [`a person who ${vs}`, `${v} again`, `not able to be ${pp}`]);
  // add-the-ending items: base + ___ = meaning
  const B5 = [];
  for (const b of VOC_L5_FUL.slice(0, 4)) B5.push([b, 'ful', `full of ${b}`]);
  for (const b of VOC_L5_LESS.slice(0, 4)) B5.push([b, 'less', `without ${b}`]);
  for (const b of VOC_L5_LY.slice(0, 4)) B5.push([b, 'ly', `in a ${b} way`]);
  for (const b of VOC_L5_ER.slice(0, 3)) B5.push([b, 'er', `more ${b}`]);
  for (const b of VOC_L5_EST.slice(0, 3)) B5.push([b, 'est', `the most ${b}`]);
  for (const [, v, pp] of VOC_ROWS(VOC_L5_ABLE).slice(0, 3)) B5.push([v, 'able', `able to be ${pp}`]);
  B5.forEach(([b, s, m], i) => out.push(VOC_IT(5, 'suffix', `${b} + ___ = ${m}`, s, sfx(s, i), '')));
  return out;
}

BANK.vocab = vocBuild();
