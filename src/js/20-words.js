/* ---------- word data ---------- */
const DOL=[
'a and away big blue can come down find for funny go help here I in is it jump little look make me my not one play red run said see the three to two up we where yellow you'.split(' '),
'all am are at ate be black brown but came did do eat four get good have he into like must new no now on our out please pretty ran ride saw say she so soon that there they this too under want was well went what white who will with yes'.split(' '),
'after again an any as ask by could every fly from give going had has her him his how just know let live may of old once open over put round some stop take thank them then think walk were when'.split(' ')];
const CVC=[['cat','🐱'],['dog','🐶'],['pig','🐷'],['sun','☀️'],['bus','🚌'],['hat','🎩'],['bed','🛏️'],['cup','🥤'],['fox','🦊'],['bat','🦇'],['bug','🐛'],['hen','🐔'],['box','📦'],['map','🗺️'],['pen','🖊️'],['web','🕸️'],['van','🚐'],['can','🥫'],['bag','👜'],['ant','🐜'],['rat','🐀'],['nut','🥜'],['leg','🦵'],['pin','📌'],['egg','🥚'],['man','👨'],['tub','🛁'],['mug','☕'],['ten','🔟'],['six','6️⃣']];
const BLEND=[['frog','🐸'],['crab','🦀'],['drum','🥁'],['fish','🐟'],['duck','🦆'],['ship','🚢'],['star','⭐'],['milk','🥛'],['tent','⛺'],['hand','✋'],['gift','🎁'],['flag','🚩'],['sock','🧦'],['bell','🔔'],['clock','🕐'],['truck','🚚'],['chick','🐤'],['sled','🛷'],['plug','🔌'],['ring','💍'],['shell','🐚'],['dress','👗']];
const MAGICE=[['cake','🎂'],['kite','🪁'],['bike','🚲'],['ice','🧊'],['rose','🌹'],['bone','🦴'],['note','🎵'],['nose','👃'],['frame','🖼️'],['five','5️⃣'],['nine','9️⃣'],['pine','🌲'],['plane','✈️'],['whale','🐳'],['snake','🐍'],['smile','😊'],['globe','🌍'],['skate','⛸️'],['dice','🎲'],['rice','🍚'],['phone','📱'],['grape','🍇'],['wave','🌊'],['fire','🔥'],['plate','🍽️']];
const TEAMS=[['rain','🌧️'],['boat','⛵'],['tree','🌳'],['bee','🐝'],['goat','🐐'],['coat','🧥'],['feet','🦶'],['sheep','🐑'],['leaf','🍃'],['beach','🏖️'],['train','🚂'],['snail','🐌'],['road','🛣️'],['soap','🧼'],['moon','🌙'],['book','📖'],['spoon','🥄'],['boot','👢'],['cheese','🧀'],['tooth','🦷'],['mail','📬'],['peach','🍑'],['seed','🌱'],['pie','🥧'],['tie','👔'],['cow','🐄'],['owl','🦉'],['mouse','🐭'],['cloud','☁️'],['bowl','🥣']];
const WL=lv=>[CVC,BLEND,MAGICE,TEAMS][Math.min(lv,4)-1];
const NOUNS=[...CVC,...BLEND].filter(w=>!['ten','six','man','leg','pin'].includes(w[0]));
const BAD=/^(fuck|fuk|shit|dick|cock|suck|tit|tits|fag|cum|sex|ass|piss|crap|damn|dam|hell|hoe|slut|cunt|twat|nig|fap|wank|porn|poop|butt|pee|kill|gun)$/;
const art=w=>/^[aeiou]/.test(w)?'an':'a';


/* ---------- ABC Beach data (P2-15; CURRICULUM E-PK, E-K) ---------- */
// Letters in the order they are introduced (CURRICULUM E-PK). The first 13 are drawn twice as often.
const ABCO='SATPINMDGOCKEURHBFLJVWXYZQ';
const ABCP=[...ABCO.slice(0,13),...ABCO];
// Look-alike groups: wrong choices come from the group first (E/F, M/W, O/Q, P/R; b/d/p/q, n/h, i/l, u/n).
const LOOKU=['EFLT','MWNH','OQCG','PRBD','IJLT','KXYV','UVWY','SZ'];
const LOOKL=['bdpq','nhru','il','uvwy','mn','ceo','fkt','agqy','sz','jy'];
// A word for each letter, said in the hint ("B is for ball"). Words only: no picture is needed.
const LETW={S:'sun',A:'apple',T:'tiger',P:'pig',I:'igloo',N:'nose',M:'moon',D:'dog',G:'goat',O:'octopus',C:'cat',K:'king',E:'egg',U:'umbrella',
  R:'rabbit',H:'hat',B:'ball',F:'fish',L:'lion',J:'jam',V:'van',W:'whale',X:'x-ray',Y:'yo-yo',Z:'zebra',Q:'queen'};
// Middle-vowel words for sound 3: three letters, consonant-vowel-consonant, from CVC.
// R-01r: pin and six are back (the word is spoken, so the picture matters less), and bin joins, so short i is not almost missing;
// genSoundB picks the vowel first, then a word with it, so each of the five vowels is asked about as often.
const CVCM=CVC.filter(x=>/^[^aeiou][aeiou][^aeiou]$/.test(x[0])&&!['ten','man','leg'].includes(x[0])).concat([['bin','🗑️']]);
// Digraph picture words for sound 4: [word, emoji, digraph, 's' starts with it | 'e' ends with it].
const DIGR=[['ship','🚢','sh','s'],['shell','🐚','sh','s'],['sheep','🐑','sh','s'],['shark','🦈','sh','s'],['fish','🐟','sh','e'],['dish','🍽️','sh','e'],['brush','🖌️','sh','e'],
  ['chick','🐤','ch','s'],['cheese','🧀','ch','s'],['peach','🍑','ch','e'],['beach','🏖️','ch','e'],
  ['thumb','👍','th','s'],['tooth','🦷','th','e'],['bath','🛁','th','e'],['mouth','👄','th','e'],
  ['whale','🐳','wh','s'],
  ['duck','🦆','ck','e'],['sock','🧦','ck','e'],['clock','🕐','ck','e'],['truck','🚚','ck','e'],['lock','🔒','ck','e'],['brick','🧱','ck','e'],['chick','🐤','ck','e']];
// Syllable picture words for syl 1 (40): [word, emoji, syllables 1-3].
const SYLP=[['cat','🐱',1],['dog','🐶',1],['sun','☀️',1],['bus','🚌',1],['fish','🐟',1],['frog','🐸',1],['star','⭐',1],['moon','🌙',1],['tree','🌳',1],['cake','🎂',1],['duck','🦆',1],['ship','🚢',1],
  ['apple','🍎',2],['rabbit','🐰',2],['pizza','🍕',2],['candy','🍬',2],['pencil','✏️',2],['penguin','🐧',2],['turtle','🐢',2],['cookie','🍪',2],['doughnut','🍩',2],['rainbow','🌈',2],
  ['guitar','🎸',2],['trumpet','🎺',2],['balloon','🎈',2],['dragon','🐉',2],['castle','🏰',2],['pumpkin','🎃',2],
  ['banana','🍌',3],['elephant','🐘',3],['butterfly','🦋',3],['octopus','🐙',3],['strawberry','🍓',3],['ladybug','🐞',3],['crocodile','🐊',3],['volcano','🌋',3],
  ['sunflower','🌻',3],['bicycle','🚲',3],['dinosaur','🦖',3],['triangle','🔺',3]];
// Syllable words for syl 2 (60, printed, no picture), by number of syllables (index 0 = one syllable).
const SYLW=[
  'cat jump stop black train house light plant spoon bread smile thumb'.split(' '),
  'tiger apple window happy monkey pencil garden rabbit table circle summer winter finger basket pillow button yellow market'.split(' '),
  'banana elephant umbrella bicycle family computer dinosaur tomato potato animal butterfly beautiful yesterday remember strawberry kangaroo marshmallow vitamin'.split(' '),
  'alligator watermelon caterpillar dictionary helicopter motorcycle celebration elevator invitation category refrigerate generation'.split(' ')];

/* ---------- P2-18 phonics 1st-2nd (CURRICULUM E-phon) ---------- */
// sight 4 = Dolch second grade (46 words), sight 5 = Dolch third grade (41 words): they become DOL[3] and DOL[4].
DOL.push(
'always around because been before best both buy call cold does don\'t fast first five found gave goes green its made many off or pull read right sing sit sleep tell their these those upon us use very wash which why wish work would write your'.split(' '),
'about better bring carry clean cut done draw drink eight fall far full got grow hold hot hurt if keep kind laugh light long much myself never only own pick seven shall show six small start ten today together try warm'.split(' '));
// pic 5 / build 5: r-controlled vowels. [word, emoji, the r-vowel]. Wrong choices swap the r-vowel (bird / bard / burd).
const RVW=[['car','🚗','ar'],['star','⭐','ar'],['yarn','🧶','ar'],['shark','🦈','ar'],['scarf','🧣','ar'],['cart','🛒','ar'],['dart','🎯','ar'],
  ['horse','🐴','or'],['unicorn','🦄','or'],['corn','🌽','or'],['forest','🌲','or'],['sword','⚔️','or'],
  ['hammer','🔨','er'],['monster','👾','er'],['flower','🌸','er'],['water','💧','er'],['tower','🗼','er'],
  ['bird','🐦','ir'],['girl','👧','ir'],['circle','⚪','ir'],['birthday','🎉','ir'],
  ['turtle','🐢','ur'],['purse','👜','ur'],['church','⛪','ur']];
// pic 6 / build 6: other vowel teams and diphthongs. [word, emoji, the team].
const VTW=[['moon','🌙','oo'],['spoon','🥄','oo'],['book','📖','oo'],['foot','🦶','oo'],
  ['house','🏠','ou'],['mouse','🐭','ou'],['cloud','☁️','ou'],['mouth','👄','ou'],
  ['cow','🐄','ow'],['crown','👑','ow'],['owl','🦉','ow'],['clown','🤡','ow'],
  ['coin','🪙','oi'],['noise','🔊','oi'],['boy','👦','oy'],['toy','🧸','oy'],
  ['paw','🐾','aw'],['hawk','🦅','aw'],['dawn','🌅','aw'],['draw','✏️','aw'],
  ['screw','🔩','ew'],['broom','🧹','oo'],['jewel','💎','ew'],['dew','💧','ew']];
const RVP=['ar','or','er','ir','ur'],VTP=['oo','ou','ow','oi','oy','aw','ew'];
// Spellings that could look rude must never be offered as wrong choices.
const PHBAD=/^(poo|shart|fark|furk|ferk|firk|sherk|fuk|dik|dirk|cum|tit)$/;

/* ---------- R-01r: safe, real wrong choices ---------- */
// Picture Words 1-4 (genPic): the wrong choices are real, everyday words that differ from the picture word by a letter or two, or by
// the pattern the level teaches (kit / kite, boat / boot). Nothing is made up by changing letters at random any more.
// Each set was checked by a person: no homophone of the picture word (son / sun, male / mail), no other name for the same picture
// (mug for cup, cap for hat), nothing rude. Three of each set are drawn at random. tools/test.js checks every set against the
// blocklist (KIDSAFE, src/data/d-kidsafe.js) and the spelling rules below.
const PWC=Object.fromEntries(`cat:cut cot can cap
dog:dig dot log fog
pig:pin peg big wig
sun:bun run fun sum
bus:bun but bud bad
hat:hot hit ham mat
bed:bad red beg bet
cup:cap cut pup cub
fox:fix box fog
bat:bit but bag bad
bug:big bag bud hug rug
hen:pen men ten her
box:fox bog bop
map:mop mat cap nap
pen:pan pin pet ten
web:wet wed wig
van:fan man can vet
can:cat cap fan cab
bag:big bug rag tag
ant:and art act
rat:rot rag ram cat
nut:not net cut hut
leg:log lag beg peg
pin:pan pig pit win
egg:leg beg peg end
man:mat map fan pan
tub:tab tug cub rub
mug:mud hug rug mad
ten:tan tin hen net
six:sit sip fix mix
frog:fog from frost frown
crab:cab crib grab drab
drum:drip drop dim
fish:dish wish fist
duck:dock deck luck tuck
ship:shop chip slip sip
star:stir scar stay
milk:silk mill mild
tent:tint test rent bent
hand:band land sand had
gift:lift sift left
flag:flat flap lag
sock:sack rock lock sick
bell:ball bill belt well
clock:click cluck lock block
truck:track trick tuck stuck
chick:check chin chip thick
sled:slid sped led
plug:plum slug plus
ring:rang rung wing sing
shell:shall sell smell spell
dress:press mess less
cake:cape came cane lake
kite:kit bite site
bike:bake like hike bite
ice:ace mice nice
rose:rope rise rode hose
bone:cone tone bond
note:not vote nose
nose:not rose hose note
frame:flame fame from
five:dive fine fire give
nine:line mine nice
pine:pin pane line pie
plane:plan plant lane plate
whale:while whole tale
snake:snack shake stake
smile:smell mile slim
globe:glove glob robe
skate:state slate skit
dice:dime dive mice
rice:race ride ripe nice
phone:shone stone zone
grape:grade drape grab
wave:save cave wade
fire:fir fine hire
plate:late slate plane
rain:ran rail pain main
boat:bat boot beat
tree:free three try
bee:bed see beg
goat:got gate goal
coat:cot cat cost
feet:feel meet fed
sheep:ship sleep sheet
leaf:loaf lean leap
beach:bench reach teach
train:trail grain brain
snail:nail sail snap
road:rod read toad
soap:sap soup soak
moon:mood noon soon
book:look cook hook
spoon:soon spin span
boot:bat boat root
cheese:chess cheek chase
tooth:booth truth too
mail:nail main meal
peach:reach teach patch
seed:need feed send
pie:pin pig pit
tie:toe tin tip
cow:cot how crow
owl:own oil howl
mouse:moose mouth house
cloud:loud cloth proud
bowl:bow howl blow`.split('\n').map(r=>{const [w,d]=r.split(':');return [w,d.split(' ')]}));
// Words that sound the same: a listening question never offers two of them together (hear "two", see "to" and "two").
const SAMESOUND=['to two too','for four','right write','there their','no know','eight ate','by buy','red read','new knew','our hour','one won',
  'blue blew','be bee','see sea','so sew','some sum','here hear','would wood','which witch','whole hole','its it\'s','your you\'re',
  'not knot','i eye','made maid','wait weight','been bin','sun son','tail tale','mail male','road rode','rain rein','feet feat',
  'meet meat','week weak','pair pear','flour flower','night knight','dear deer','where wear'].map(g=>g.split(' '));
const sameSound=w=>{const k=String(w).toLowerCase();return SAMESOUND.filter(g=>g.includes(k)).flat().filter(x=>x!==k)};

// The blocklist itself lives in src/data/d-kidsafe.js as hashes only (KIDSAFE). ksHash is cyrb53 (public domain), in base 36.
function ksHash(str){
  let h1=0xdeadbeef,h2=0x41c6ce57;
  for(let i=0;i<str.length;i++){const c=str.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677)}
  h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);
  h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);
  return(4294967296*(2097151&h2)+(h1>>>0)).toString(36);
}
const KS={L:null,memo:new Map()};
// The lists as sets, built on first use (KIDSAFE is in the data file, which loads after this code).
function ksLists(){
  if(KS.L)return KS.L;
  const K=typeof KIDSAFE=='object'&&KIDSAFE?KIDSAFE:null,set=t=>new Set(String(t||'').split(' ').filter(Boolean));
  const L={w:set(K&&K.w),s:set(K&&K.s),sl:(K&&K.sl)||[],c:set(K&&K.c)};
  if(K)KS.L=L; // never cache an empty list
  return L;
}
// 0: fine, 1: a blocked word or piece (list w or s), 2: a word that is never offered as a choice (list c). Memoised per word.
function ksWord(t){
  let v=KS.memo.get(t);
  if(v!==undefined)return v;
  const L=ksLists(),h=ksHash(t);
  v=L.w.has(h)?1:0;
  for(const n of L.sl)for(let i=0;!v&&i+n<=t.length;i++)if(L.s.has(ksHash(t.slice(i,i+n))))v=1;
  if(!v&&L.c.has(h))v=2;
  if(KS.L)KS.memo.set(t,v);
  return v;
}
// true when a text holds a blocked word, in any case form; with choice true, also a word that is never offered as a choice.
function ksBad(text,choice){
  for(const t of String(text).toLowerCase().split(/[^a-z]+/)){
    if(!t)continue;
    const v=ksWord(t);
    if(v==1||(v==2&&choice))return true;
  }
  return false;
}
// Spelling rules for a made-up word (a wrong choice that is not a real word): it must look like an English word a child could
// sound out. Consonant groups at the start and end that English uses, legal vowel spellings, consonant groups in the middle that
// split into an ending and a start. Rejects "snakb", "cnake", "socb", "bgg", "pih"; accepts "bird", "bard", "berd", "burd".
const KS_ON=new Set(('b bl br c ch chr cl cr d dr dw f fl fr g gl gr h j k kn l m n p ph pl pr q r s sc scr sh shr sk sl sm sn sp spl '+
  'spr sq st str sw t th thr tr tw v w wh wr y z').split(' '));
const KS_CODA=new Set(('b c ck ct d dd dg f ff ft g gg gh ght k l ld lf lk ll lm lp lt m mb mp n nc nch nd ng nk nn nt p pt r rb rc rch rd rf rg rk '+
  'rl rm rn rp rs rsh rst rt rth s sh sk sm sp ss st t tch th v x z zz ch').split(' '));
// (a team that ends in w or y may run into the next vowel: tower, jewel, royal)
const KS_VOW=new Set('a e i o u y ai ay au aw ea ee ei ey ie oa oe oi oo ou ow oy ue ui ew eo ia io ua'.split(' ')
  .concat(['aw','ew','ow','ay','ey','oy'].flatMap(t=>[...'aeiou'].map(v=>t+v))));
function ksLegal(word){
  const w=String(word);
  if(!/^[a-z]{1,12}$/.test(w)||!/[aeiouy]/.test(w)||/(.)\1\1/.test(w)||/q(?!u)/.test(w)||/[jvq]$/.test(w))return false;
  // runs of consonants and of vowels; y and w after a vowel belong to it (day, cow), y after a consonant is a vowel at the end or
  // before a consonant (fly, gym); qu counts as one consonant
  const s=w.replace(/qu/g,'q'),runs=[];
  for(let i=0;i<s.length;i++){
    const c=s[i],prevV=runs.length>0&&runs[runs.length-1].v;
    const v=/[aeiou]/.test(c)||((c=='y'||c=='w')&&prevV)||(c=='y'&&i>0&&(i==s.length-1||!/[aeiou]/.test(s[i+1])));
    if(runs.length&&runs[runs.length-1].v==v)runs[runs.length-1].t+=c;else runs.push({v,t:c});
  }
  if(runs.some(r=>r.v&&!KS_VOW.has(r.t)))return false;
  // a silent final e (cake, horse) and a final consonant + le (turtle) go with the consonant group before them
  const last=runs[runs.length-1];
  let fin='',le=false;
  if(last.v&&last.t=='e'&&runs.length>2&&!runs[runs.length-2].v){runs.pop();fin=runs.pop().t}
  else if(!last.v)fin=runs.pop().t;
  else if(['i','u','ai','au','oi','ou','ui'].includes(last.t))return false; // no English word ends in these spellings
  if(!runs.some(r=>r.v))return false;
  if(fin.length>1&&fin.endsWith('l')&&w.endsWith('le')){le=true;fin=fin.slice(0,-1)}
  if(fin&&!KS_CODA.has(fin)&&!(le&&(fin.length==1||KS_CODA.has(fin.slice(0,-1)))))return false;
  if(!runs[0].v&&!KS_ON.has(runs[0].t))return false;
  for(let i=1;i<runs.length;i++){
    if(runs[i].v)continue;
    const m=runs[i].t;
    let ok=false;
    for(let k=0;k<=m.length&&!ok;k++){const a=m.slice(0,k),b=m.slice(k);ok=(!a||KS_CODA.has(a))&&(!b||KS_ON.has(b))}
    if(!ok)return false;
  }
  return true;
}
