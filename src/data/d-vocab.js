/* ---------- vocabulary, levels 1-10 (P2-22 levels 1-5, P2-23 levels 6-10; CURRICULUM E-vocab) ---------- */
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
cold|hot|icy,snowy|snowflake,❄
big|small|huge,tall|elephant,🐘
small|big|tiny,short|mouse,🐭
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
sailboat|sail|boat|boat,⛵
sandbox|sand|box
snowman|snow|man|snowman,⛄
starfish|star|fish|starfish,⭐
toothbrush|tooth|brush
backpack|back|pack
bathtub|bath|tub|tub,🛁
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
seashell|sea|shell|shell,🐚
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
  // R-01r: "full of thanks" (not "full of thank"), "in an old way" (not "in a old way")
  const nf = b => b == 'thank' ? 'thanks' : b, way = b => `in ${/^[aeiou]/.test(b) ? 'an' : 'a'} ${b} way`;
  for (const b of VOC_L5_FUL) A5(b + 'ful', `full of ${nf(b)}`, [`without ${nf(b)}`, `more ${nf(b)}`, `the most ${nf(b)}`]);
  for (const b of VOC_L5_LESS) A5(b + 'less', `without ${b}`, [`full of ${b}`, `more ${b}`, `the most ${b}`]);
  for (const b of VOC_L5_LY) A5(b + 'ly', way(b), [`more ${b}`, `the most ${b}`, `not ${b}`]);
  for (const b of VOC_L5_ER) A5(b + 'er', `more ${b}`, [way(b), `the most ${b}`, `not ${b}`]);
  for (const b of VOC_L5_EST) A5(b + 'est', `the most ${b}`, [`more ${b}`, way(b), `not ${b}`]);
  for (const [w, v, s] of VOC_ROWS(VOC_L5_AGENT)) A5(w, `a person who ${s}`, [`${v} again`, `${v} the wrong way`, `${v} before`]);
  for (const [w, v, pp, vs] of VOC_ROWS(VOC_L5_ABLE)) A5(w, `able to be ${pp}`, [`a person who ${vs}`, `${v} again`, `not able to be ${pp}`]);
  // add-the-ending items: base + ___ = meaning
  const B5 = [];
  for (const b of VOC_L5_FUL.slice(0, 4)) B5.push([b, 'ful', `full of ${b}`]);
  for (const b of VOC_L5_LESS.slice(0, 4)) B5.push([b, 'less', `without ${b}`]);
  for (const b of VOC_L5_LY.slice(0, 4)) B5.push([b, 'ly', way(b)]);
  for (const b of VOC_L5_ER.slice(0, 3)) B5.push([b, 'er', `more ${b}`]);
  for (const b of VOC_L5_EST.slice(0, 3)) B5.push([b, 'est', `the most ${b}`]);
  for (const [, v, pp] of VOC_ROWS(VOC_L5_ABLE).slice(0, 3)) B5.push([v, 'able', `able to be ${pp}`]);
  B5.forEach(([b, s, m], i) => out.push(VOC_IT(5, 'suffix', `${b} + ___ = ${m}`, s, sfx(s, i), '')));
  return out;
}


/* ---------- levels 6-10 (P2-23) ----------
   Level 6 homophones (cloze), 7 context clues (the harder word shows in bold), 8 figurative language (idiom meanings and which
   kind of language), 9 Greek and Latin roots, 10 analogies and shades of meaning. Every item has 4 choices and one right answer;
   the tests check that no choice is also right. Order-by-strength needs the `order` builder that does not exist yet (PROGRESS,
   Ideas and issues), so level 10 asks for the strongest or the weakest word as a choice. A word between * stars * prints in bold. */

const VOC_HINT_B = {
  6: 'Say each choice out loud: they sound alike. Pick the spelling whose meaning this sentence needs.',
  7: 'Read the words around the bold word. They give clues. Put each choice in its place and see which one fits.',
  8: 'Do not read the words one by one. Picture what the writer really means, then pick the choice that says it plainly.',
  8.1: 'Look for the clue words "like" or "as". Does a thing act like a person? Is one thing said to BE another? Or is it a saying?',
  9: 'Split the word into its root pieces. Put the piece meanings together, then find the choice that matches.',
  9.1: 'Think of two words you know that share this piece. What do they have in common?',
  10: 'Say how the first pair is connected in a sentence. Then use the very same connection for the second pair.',
  10.1: 'Picture the words as steps on a ladder, from a little to a lot. Which step is at the very end the question asks about?',
};

// level 6: sentence | right word | the word that sounds the same | two words that do not fit
const VOC_L6 = `I can ___ the whole ocean from here.|see|sea|saw,seed
The big ship sailed across the ___.|sea|see|seat,sell
Please ___ your name at the top of the page.|write|right|wrote,wrap
Turn ___ at the stop sign.|right|write|ride,white
I ___ the answer to the riddle yesterday.|knew|new|know,no
She wore a ___ red coat to school today.|new|knew|now,know
The kids hung ___ coats on the hooks.|their|there|they're,them
Look over ___ by the big tree.|there|their|then,these
I think ___ going to win the game.|they're|their|there,them
I have ___ pet fish at home.|two|to|too,tow
Can I come with you, ___?|too|to|two,toe
We walked ___ the park after lunch.|to|too|two,toe
Is this ___ lunch box?|your|you're|you,yours
I think ___ very kind to share.|you're|your|you,yours
The puppy wagged ___ tail.|its|it's|is,it
___ raining outside, so take an umbrella.|it's|its|him,his
Can you ___ the music from the next room?|hear|here|hair,heard
Come over ___ and sit next to me.|here|hear|her,hire
I will ___ a new notebook at the store.|buy|by|bye,bay
Wave and say ___ to your friend!|bye|buy|by,bike
Please sit ___ the window.|by|buy|bye,bay
I have ___ crayons in my box.|four|for|fore,fur
This gift is ___ you.|for|four|fore,far
Our team ___ the game on Friday.|won|one|want,own
I ate only ___ cookie after dinner.|one|won|on,own
The ___ is bright and warm today.|sun|son|sin,run
Her ___ plays the drums in a band.|son|sun|sin,soon
Mom mixed ___ and eggs to make a cake.|flour|flower|floor,flow
A bee landed on the yellow ___.|flower|flour|floor,flow
The ___ arrived with a postcard from Gran.|mail|male|mile,pail
A rooster is a ___ chicken.|male|mail|mall,mile
The cat's long ___ was soft and fluffy.|tail|tale|tall,toil
Grandpa told us a funny ___ at bedtime.|tale|tail|tall,tile
The ___ landed safely at the airport.|plane|plain|plan,lane
She wore a ___ white shirt with no pictures.|plain|plane|plan,plant
I ate a juicy ___ for a snack.|pear|pair|peer,pearl
She bought a new ___ of shoes.|pair|pear|peer,pail
Let's ___ at the park at noon.|meet|meat|met,melt
Dad cooked ___ for dinner.|meat|meet|beat,seat
We go to the library once a ___.|week|weak|weep,wick
The baby bird was too ___ to fly.|weak|week|weep,wake
The sky is ___ today.|blue|blew|blow,glue
The wind ___ my hat right off.|blew|blue|blow,glow
She ___ a big lunch at school.|ate|eight|eat,at
I have ___ stickers in my pocket.|eight|ate|eat,at
___ Grandma, thank you for the gift.|dear|deer|door,dare
We saw a ___ eating grass in the woods.|deer|dear|door,dare
The mole dug a ___ in the yard.|hole|whole|hall,hold
I ate the ___ pizza by myself.|whole|hole|hold,hall
Yesterday we ___ our bikes to school.|rode|road|ride,rod
The car drove down the long ___.|road|rode|ride,rod
The boat has a big white ___.|sail|sale|sell,soil
All the shoes are on ___ at the store.|sale|sail|sell,sole
He walked up each ___ one by one.|stair|stare|star,steer
It is rude to ___ at people.|stare|stair|star,steer
Please ___ for me by the door.|wait|weight|wet,white
The ___ of the backpack surprised me.|weight|wait|wet,white
The table is made of ___.|wood|would|hood,wouldn't
I ___ like some juice, please.|would|wood|hood,wool
A ___ rode across the sky on a broom.|witch|which|wish,watch
___ coat is yours?|which|witch|wish,watch
Be careful not to ___ the glass.|break|brake|bread,bleak
Press the ___ to stop the bike.|brake|break|bark,bake
A tiny red ___ carried a crumb up the leaf.|ant|aunt|and,at
My ___ lives in Texas and sends me cards.|aunt|ant|and,hunt
A big brown ___ ate the berries.|bear|bare|bean,beard
We walked on the sand in our ___ feet.|bare|bear|beard,bar
The brave ___ rode a horse to the castle.|knight|night|light,kit
The stars shine in the dark ___.|night|knight|light,right
I ate a ___ of cake at the party.|piece|peace|pace,place
After the war, the land was at ___.|peace|piece|pole,pearl
We left ___ boots by the door.|our|hour|out,are
The movie was one ___ long.|hour|our|out,ore
Read the poem ___ to the class.|aloud|allowed|aloof,along
Dogs are not ___ in the pool.|allowed|aloud|alone,ahead
I wonder ___ it will rain tomorrow.|whether|weather|wither,feather
The ___ is sunny and warm today.|weather|whether|wither,feather
She ___ the ball to me.|threw|through|thrown,three
We walked ___ the long tunnel.|through|threw|though,thought
Have you ___ my red hat?|seen|scene|seem,seat
The last ___ of the play was funny.|scene|seen|seem,scent
The lion shook his big ___.|mane|main|man,mine
The ___ road was busy with cars.|main|mane|man,mean
The bridge is made of strong ___.|steel|steal|stool,steep
It is wrong to ___ a toy from a shop.|steal|steel|steam,stale
Our team will ___ the other team.|beat|beet|bead,belt
The red ___ grew in the garden.|beet|beat|beep,belt
I will ___ my old bike to a neighbor.|sell|cell|sale,seal
The smallest living part of a plant is a ___.|cell|sell|seal,sill
It is not ___ to cheat at games.|fair|fare|far,fire
The bus ___ was two dollars.|fare|fair|far,fire
A cut will ___ in a few days.|heal|heel|heat,head
The back of your foot is your ___.|heel|heal|heat,head
I was ___ on the long car trip.|bored|board|bird,bared
Write your name on the ___ with chalk.|board|bored|bird,beard`;

// level 7: sentence with the hard word in *stars* | its meaning | three meanings that do not fit
const VOC_L7 = `The *enormous* elephant was bigger than our house.|very large|very small,very loud,very old
Sam was *ecstatic*, jumping and cheering for his win.|very happy|very tired,very angry,very scared
The *timid* kitten hid under the bed from the thunder.|shy and easily scared|bold and brave,sleepy,hungry
It was a *scorching* day, and the sand burned our feet.|extremely hot|slightly cool,rainy,windy
The *ancient* ruins were thousands of years old.|very old|brand new,very tall,very clean
Dad was *exhausted* after he ran the long race.|very tired|very hungry,very proud,very excited
The *vast* desert stretched as far as we could see.|huge in size|tiny,very hot,very narrow
Mia *hesitated* at the door, unsure if she should knock.|paused because she was unsure|ran quickly,shouted loudly,walked away angry
The soup was *bland*, so I added salt for flavor.|having little flavor|very spicy,very hot,very sweet
The *fragile* vase broke when it fell on the floor.|easily broken|very heavy,very old,very bright
We were *famished* after hiking all day, so we ate a huge dinner.|very hungry|very sleepy,very cold,very dirty
The thief moved *stealthily* so no one would hear him.|quietly and secretly|loudly,slowly and sadly,quickly and happily
The *dense* fog made it hard to see the road.|thick|thin,warm,fast
Leo was *reluctant* to jump in the cold lake, so he waited.|unwilling|eager,able,allowed
The *meager* meal was only one slice of bread.|very small in amount|very large,very tasty,very hot
The teacher *praised* Ana for her hard work and good grades.|said good things about|scolded,ignored,forgot
A *vivid* rainbow stretched across the sky in bright colors.|bright and clear|dull,faint,tiny
The *novice* skater fell often because it was her first day.|a beginner|an expert,a teacher,a judge
After the storm, the river *swelled* and covered the path.|grew bigger|dried up,froze,slowed down
The *frigid* water made me shiver all over.|very cold|very deep,very clean,very salty
The twins looked *identical*, and I could not tell them apart.|exactly alike|very different,very young,very tall
Be *cautious* when you cross the busy street.|careful|loud,quick,rude
The tiny puppy was *adorable*, and everyone smiled at it.|very cute|very loud,very dirty,very fast
She gave a *brief* talk that lasted only one minute.|short|long,boring,loud
The *rickety* bridge shook and creaked under our feet.|shaky and falling apart|strong and new,very long,very high
My grandpa is *generous* and shares everything he has.|giving and kind|selfish,lazy,loud
The magician's trick *baffled* us, and we could not figure it out.|confused|bored,frightened,pleased
It was *drizzling*, just a few light drops of rain.|raining lightly|pouring hard,snowing,thundering
The *rowdy* crowd cheered and shouted all night long.|noisy and wild|calm and quiet,tired,hungry
Tom was *furious* when his sister broke his model plane.|very angry|very sad,very surprised,very sleepy
The *sturdy* table held all of the heavy books.|strong|weak,small,old
We *dashed* to the bus when we heard it coming.|ran quickly|walked slowly,crawled,waited
The cave was *gloomy*, with dark shadows in every corner.|dark and sad-looking|bright and cheerful,warm,huge
A *gigantic* wave rose above the tiny boat.|extremely big|extremely thin,extremely slow,extremely loud
The *curious* cat sniffed every corner of the new house.|eager to find out|sleepy,afraid,hungry
The *tranquil* lake was calm and quiet at dawn.|peaceful|stormy,crowded,cold
Please *conserve* water by turning off the tap.|save|waste,pour,boil
He spoke *sternly*, with a serious face, so we listened.|in a strict way|in a silly way,in a sleepy way,in a joyful way
The *abandoned* house had empty rooms and broken windows.|left empty and uncared for|newly built,full of visitors,very small
The *colossal* statue was taller than a ten-story building.|enormous|tiny,fragile,plain
Nora *pondered* the puzzle for a long time before she answered.|thought about it carefully|laughed at it,threw it away,forgot about it
The soldiers were *valiant* and never gave up the fight.|brave|afraid,lazy,rude
His *tattered* coat had holes and loose threads.|old and torn|new and clean,warm,bright
The *spacious* room had plenty of space for everyone to sit.|having a lot of room|crowded,dark,cold
The *nimble* acrobat jumped and twisted with ease.|quick and graceful|slow and clumsy,loud,tall
When the baby cried, Mom *soothed* her with a soft song.|calmed|frightened,woke up,teased
They were *thrilled* by the roller coaster, screaming and laughing.|very excited|bored,sleepy,confused`;

// level 8 idioms: phrase | what it means | three meanings that do not fit
const VOC_L8A = `it's raining cats and dogs|it is raining very hard|pets are falling from the sky,it is raining a little,the rain has stopped
a piece of cake|very easy|a dessert,very hard,a birthday gift
break the ice|start a friendly talk|crack some frozen water,end a fight,go ice skating
under the weather|feeling sick|standing outside,caught in a storm,very cold
spill the beans|tell a secret|drop some food,cook dinner,tell a lie
hit the books|study hard|throw books away,buy new books,close a book
let the cat out of the bag|share a secret by mistake|find a lost pet,open a bag,be very noisy
cost an arm and a leg|be very expensive|hurt a person,be free,be cheap
once in a blue moon|very rarely|every night,when it is dark,on your birthday
bite off more than you can chew|take on too much|eat too fast,take a big bite,be very hungry
on cloud nine|extremely happy|high in the sky,very sad,lost
the ball is in your court|it is your turn to act|you are playing tennis,you lost the ball,you must wait
burn the midnight oil|stay up late working|light a lamp,waste some oil,cook at night
hold your horses|wait and be patient|stop riding,get a horse,hurry up
a blessing in disguise|something good that seemed bad at first|a funny costume,a bad surprise,a hidden gift
a couch potato|someone who sits and watches TV a lot|a kind of vegetable,a farmer,a fast runner
butterflies in my stomach|a nervous feeling|a stomach ache from bugs,a hungry feeling,a tasty snack
through thick and thin|in good times and bad times|in a forest,in a hurry,with a thin friend
go the extra mile|try harder than expected|run a long race,travel far away,quit early
a drop in the bucket|a very small part of what is needed|a leaking pail,a big part,a lot of water
cry over spilled milk|be upset about something that cannot be changed|clean up a mess,drink some milk,pour a glass
the early bird catches the worm|people who start early do well|birds eat worms,wake up late,worms hide
sit on the fence|not choose a side|build a fence,rest outside,climb up high
jump on the bandwagon|join something popular|ride in a parade,play in a band,leave early
feeling blue|feeling sad|feeling cold,feeling sick,feeling sleepy
get cold feet|become nervous and back out|have chilly toes,start to run,feel brave`;

// level 8 kinds of language: phrase | kind (simile, metaphor, personification, idiom)
const VOC_L8B = `as busy as a bee|simile
as cold as ice|simile
ran like the wind|simile
slept like a log|simile
as quiet as a mouse|simile
her eyes sparkled like stars|simile
as light as a feather|simile
as brave as a lion|simile
as sweet as honey|simile
swam like a fish|simile
Time is a thief.|metaphor
Her smile is sunshine.|metaphor
The moon is a silver coin.|metaphor
Life is a roller coaster.|metaphor
The snow was a white blanket.|metaphor
He is a rock in hard times.|metaphor
The city is a jungle.|metaphor
Books are keys to new worlds.|metaphor
The stars were diamonds in the sky.|metaphor
The wind whispered through the trees.|personification
The sun smiled down on us.|personification
The flowers danced in the breeze.|personification
The old house groaned in the storm.|personification
The moon winked at the sleepy town.|personification
The leaves clapped in the wind.|personification
My alarm clock screamed at me.|personification
The waves reached out to hug the shore.|personification
He spilled the beans.|idiom
She is under the weather.|idiom
The test was a piece of cake.|idiom
It cost an arm and a leg.|idiom
Hold your horses!|idiom
We will break the ice.|idiom`;

// level 9 roots: root | meaning | two example words
const VOC_L9R = `bio|life|biology, biography
geo|earth|geography, geology
graph|write|autograph, paragraph
tele|far|telephone, television
photo|light|photograph, photocopy
aqua|water|aquarium, aquatic
port|carry|transport, portable
rupt|break|erupt, interrupt
spect|look|inspect, spectator
struct|build|structure, construct
scrib|write|describe, scribble
dict|say|predict, dictate
micro|small|microscope, microphone
therm|heat|thermometer, thermos
chron|time|chronicle, chronological
phon|sound|telephone, microphone
meter|measure|thermometer, centimeter
ject|throw|eject, reject
aud|hear|audience, audible
auto|self|autograph, automatic
cred|believe|credit, incredible
astro|star|astronaut, astronomy
ped|foot|pedal, pedestrian
dent|tooth|dentist, dental`;

// level 9 words: word | what it means | three meanings that do not fit
const VOC_L9W = `biology|the study of living things|the study of the earth,the study of the stars,the study of water
geography|the study of the earth and its places|the study of living things,the study of heat,the study of sounds
autograph|a person's own signature|a call from far away,a picture made with light,a book about life
telephone|a device that carries sound from far away|a tool that measures heat,a tool for seeing tiny things,a way to write fast
telescope|a tool for seeing things far away|a tool for seeing tiny things,a tool for measuring heat,a tool for writing
microscope|a tool for seeing very small things|a tool for seeing far away,a tool for measuring heat,a tool for writing
thermometer|a tool that measures heat|a tool that sees far away,a tool that measures sound,a tool that measures water
photograph|a picture made with light|a drawing of the earth,a story about a life,a call from far away
aquarium|a tank of water for fish|a cage for birds,a house for plants,a room for heat
aquatic|living or happening in water|living on land,living in the air,living underground
transport|to carry from one place to another|to break apart,to look closely,to write down
portable|able to be carried|able to be broken,able to be seen,able to be built
erupt|to burst out suddenly|to build up slowly,to look at,to write down
interrupt|to break into what someone is saying|to carry across,to write between,to look carefully
inspect|to look at closely|to build up,to break in,to carry in
spectator|a person who watches|a person who builds,a person who writes,a person who carries
structure|something that is built|something that is written,something that is broken,something that is carried
construct|to build|to break,to carry,to write
describe|to write or tell what something is like|to build with care,to break into pieces,to carry far away
scribble|to write quickly and messily|to look quickly,to carry roughly,to build slowly
manuscript|a book or paper written by hand|a tool for seeing far,a picture made with light,a machine that builds
dictate|to say words out loud for someone to write|to build with words,to look at closely,to carry out
predict|to say what will happen before it does|to build ahead,to break in front,to carry before
chronological|in the order that things happened in time|in size order,in alphabet order,in color order
microphone|a tool that makes small sounds louder|a tool that makes far things near,a tool that measures heat,a tool that writes
automatic|working by itself|working far away,working with heat,working in water
biography|the written story of a person's life|a picture of the earth,a tool for tiny things,a map of the sky
geology|the study of the earth's rocks and soil|the study of living things,the study of heat,the study of the stars
export|to carry goods out to another place|to carry goods in,to break goods apart,to look at goods
import|to bring goods in from another place|to send goods out,to build goods,to write about goods
audible|able to be heard|able to be seen,able to be carried,able to be written
audience|a group of people who gather to hear something|a group of people who build something,a group that writes a book,a group that measures time
transmit|to send across a distance|to break across,to see across,to write across
thermal|having to do with heat|having to do with light,having to do with sound,having to do with water
eject|to throw out|to carry out,to break out,to look out
astronaut|a traveler among the stars|a collector of rocks,a measurer of heat,a writer of books
pedestrian|a person who travels on foot|a person who travels by train,a person who travels by boat,a person who flies a plane
dentist|a doctor who cares for teeth|a doctor who cares for feet,a doctor who cares for eyes,a doctor who cares for ears`;

// level 10 analogies: first : second :: third : ? | answer | three words that do not fit
const VOC_L10A = `hot : cold :: up : ?|down|high,over,top
big : small :: fast : ?|slow|quick,speedy,race
puppy : dog :: kitten : ?|cat|mouse,bird,fish
bird : nest :: bee : ?|hive|honey,flower,wing
pen : write :: scissors : ?|cut|paper,hand,sharp
finger : hand :: toe : ?|foot|leg,shoe,sock
dog : animal :: rose : ?|flower|garden,red,petal
teacher : school :: doctor : ?|hospital|patient,medicine,nurse
happy : sad :: day : ?|night|sun,sleep,moon
cold : freezing :: hot : ?|scorching|warm,cool,summer
glove : hand :: sock : ?|foot|shoe,toe,leg
sing : song :: paint : ?|picture|brush,color,paper
eye : see :: ear : ?|hear|sound,head,loud
fish : swim :: bird : ?|fly|wing,nest,feather
leaf : tree :: page : ?|book|read,paper,word
cow : milk :: hen : ?|egg|feathers,farm,chicken
shoe : foot :: hat : ?|head|cap,hair,sun
tall : short :: wide : ?|narrow|long,large,deep
cub : bear :: calf : ?|cow|hen,dog,pig
clock : time :: ruler : ?|length|wood,draw,desk
north : south :: east : ?|west|up,sun,map
student : learn :: chef : ?|cook|eat,food,kitchen
smile : happy :: frown : ?|sad|glad,funny,loud
light : dark :: loud : ?|quiet|noisy,sound,big
apple : fruit :: carrot : ?|vegetable|orange,garden,snack
car : road :: boat : ?|water|wheel,sky,sand
wheel : car :: wing : ?|airplane|boat,tree,truck
smooth : rough :: soft : ?|hard|fluffy,quiet,warm
first : last :: begin : ?|end|start,open,middle
hot : sun :: cold : ?|ice|sand,fire,desert
kind : mean :: honest : ?|dishonest|truthful,fair,careful
author : book :: artist : ?|painting|pencil,gallery,museum
mouse : squeak :: dog : ?|bark|bite,tail,fur
scared : terrified :: tired : ?|exhausted|sleepy,bed,rested
week : seven days :: dozen : ?|twelve|ten,twenty,six
island : water :: oasis : ?|desert|ocean,forest,mountain`;

// level 10 shades of meaning: four words from weak to strong | question for the strongest | question for the weakest
const VOC_L10S = `bothered,annoyed,angry,furious|Which word shows the MOST anger?|Which word shows the LEAST anger?
content,glad,joyful,ecstatic|Which word shows the MOST joy?|Which word shows the LEAST joy?
nervous,afraid,frightened,terrified|Which word shows the MOST fear?|Which word shows the LEAST fear?
sleepy,tired,worn out,exhausted|Which word shows the MOST tiredness?|Which word shows the LEAST tiredness?
cool,chilly,cold,freezing|Which word means the coldest?|Which word means the least cold?
mild,warm,hot,scorching|Which word means the hottest?|Which word means the least hot?
small,big,huge,gigantic|Which word means the biggest?|Which word means the smallest?
stroll,walk,jog,sprint|Which word means the fastest way to move?|Which word means the slowest way to move?
whisper,talk,shout,scream|Which word means the loudest way to speak?|Which word means the quietest way to speak?
okay,good,great,fantastic|Which word shows the best?|Which word shows the least good?
mist,drizzle,rain,downpour|Which word means the heaviest rain?|Which word means the lightest rain?
breeze,wind,gale,hurricane|Which word means the strongest wind?|Which word means the gentlest wind?
dim,bright,brilliant,blinding|Which word means the brightest light?|Which word means the faintest light?
few,some,many,countless|Which word means the greatest amount?|Which word means the smallest amount?`;

function vocBuildB() {
  const out = [];
  // long choices get one button per row (form wide), short ones sit two to a row
  const it = (lv, topic, q, a, d, hint) => {
    const item = { lv, q, a, d, topic, hint: hint || VOC_HINT_B[lv] };
    if (Math.max(a.length, ...d.map(x => x.length)) > 8) item.form = 'wide';
    out.push(item);
  };
  // level 6 homophones: the word that sounds the same is always one of the choices
  VOC_ROWS(VOC_L6).forEach(([s, a, h, d]) => it(6, 'homophones', s, a, [h, ...d.split(',')]));
  // level 7 context clues
  VOC_ROWS(VOC_L7).forEach(([s, a, d]) => it(7, 'context clues', `${s} What does *${s.match(/\*([^*]+)\*/)[1]}* mean?`, a, d.split(',')));
  // level 8 figurative language
  VOC_ROWS(VOC_L8A).forEach(([p, a, d]) => it(8, 'idioms', `What does "${p}" mean?`, a, d.split(',')));
  const KINDS = ['simile', 'metaphor', 'personification', 'idiom'];
  VOC_ROWS(VOC_L8B).forEach(([p, k]) => it(8, 'figurative language', `Which kind of language is "${p}"?`, k, KINDS.filter(x => x != k), VOC_HINT_B[8.1]));
  // level 9: what a root means (the wrong choices are other roots' meanings), then what a word built from roots means
  const R = VOC_ROWS(VOC_L9R), meanings = [...new Set(R.map(r => r[1]))];
  R.forEach(([r, m, ex], i) => {
    const pool = meanings.filter(x => x != m);
    it(9, 'word roots', `What does the root *${r}* mean? (${ex})`, m, [0, 7, 13].map(k => pool[(i * 3 + k) % pool.length]), VOC_HINT_B[9.1]);
  });
  VOC_ROWS(VOC_L9W).forEach(([w, a, d]) => it(9, 'word roots', `What does *${w}* mean?`, a, d.split(',')));
  // level 10: analogies, then the strongest and the weakest word of a set
  VOC_ROWS(VOC_L10A).forEach(([q, a, d]) => it(10, 'analogies', q, a, d.split(',')));
  VOC_ROWS(VOC_L10S).forEach(([w, top, low]) => {
    const ws = w.split(',');
    it(10, 'shades of meaning', top, ws[3], ws.slice(0, 3), VOC_HINT_B[10.1]);
    it(10, 'shades of meaning', low, ws[0], ws.slice(1), VOC_HINT_B[10.1]);
  });
  return out;
}

BANK.vocab = vocBuild().concat(vocBuildB());
