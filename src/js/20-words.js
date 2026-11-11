/* ---------- word data ---------- */
const DOL=[
'a and away big blue can come down find for funny go help here I in is it jump little look make me my not one play red run said see the three to two up we where yellow you'.split(' '),
'all am are at ate be black brown but came did do eat four get good have he into like must new no now on our out please pretty ran ride saw say she so soon that there they this too under want was well went what white who will with yes'.split(' '),
'after again an any as ask by could every fly from give going had has her him his how just know let live may of old once open over put round some stop take thank them then think walk were when'.split(' ')];
const CVC=[['cat','🐱'],['dog','🐶'],['pig','🐷'],['sun','☀️'],['bus','🚌'],['hat','🎩'],['bed','🛏️'],['cup','🥤'],['fox','🦊'],['bat','🦇'],['bug','🐛'],['hen','🐔'],['box','📦'],['map','🗺️'],['pen','🖊️'],['web','🕸️'],['van','🚐'],['can','🥫'],['bag','👜'],['ant','🐜'],['rat','🐀'],['nut','🥜'],['leg','🦵'],['pin','📌'],['egg','🥚'],['man','👨'],['tub','🛁'],['mug','☕'],['ten','🔟'],['six','6️⃣']];
const BLEND=[['frog','🐸'],['crab','🦀'],['drum','🥁'],['fish','🐟'],['duck','🦆'],['ship','🚢'],['star','⭐'],['milk','🥛'],['tent','⛺'],['hand','✋'],['gift','🎁'],['flag','🚩'],['sock','🧦'],['bell','🔔'],['clock','🕐'],['truck','🚚'],['chick','🐤'],['sled','🛷'],['plug','🔌'],['ring','💍'],['shell','🐚'],['king','👑']];
const MAGICE=[['cake','🎂'],['kite','🪁'],['bike','🚲'],['cube','🧊'],['rose','🌹'],['bone','🦴'],['cone','🍦'],['nose','👃'],['game','🎮'],['five','5️⃣'],['nine','9️⃣'],['vase','🏺'],['plane','✈️'],['whale','🐳'],['snake','🐍'],['smile','😊'],['globe','🌍'],['skate','⛸️'],['dice','🎲'],['rice','🍚'],['home','🏠'],['grape','🍇'],['wave','🌊'],['fire','🔥'],['plate','🍽️']];
const TEAMS=[['rain','🌧️'],['boat','⛵'],['tree','🌳'],['bee','🐝'],['goat','🐐'],['coat','🧥'],['feet','🦶'],['sheep','🐑'],['leaf','🍃'],['queen','👸'],['train','🚂'],['snail','🐌'],['road','🛣️'],['soap','🧼'],['moon','🌙'],['book','📖'],['spoon','🥄'],['boot','👢'],['cheese','🧀'],['tooth','🦷'],['mail','📬'],['peach','🍑'],['seed','🌱'],['pie','🥧'],['tie','👔'],['cow','🐄'],['owl','🦉'],['mouse','🐭'],['cloud','☁️'],['bowl','🥣']];
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
const CVCM=CVC.filter(x=>/^[^aeiou][aeiou][^aeiou]$/.test(x[0])&&!['ten','six','man','leg','pin'].includes(x[0]));
// Digraph picture words for sound 4: [word, emoji, digraph, 's' starts with it | 'e' ends with it].
const DIGR=[['ship','🚢','sh','s'],['shell','🐚','sh','s'],['sheep','🐑','sh','s'],['shark','🦈','sh','s'],['fish','🐟','sh','e'],['dish','🍽️','sh','e'],['brush','🖌️','sh','e'],
  ['chick','🐤','ch','s'],['cheese','🧀','ch','s'],['peach','🍑','ch','e'],['beach','🏖️','ch','e'],
  ['thumb','👍','th','s'],['tooth','🦷','th','e'],['bath','🛁','th','e'],['moth','🦋','th','e'],
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
const RVW=[['car','🚗','ar'],['star','⭐','ar'],['farm','🚜','ar'],['shark','🦈','ar'],['arm','💪','ar'],['chart','📈','ar'],['dart','🎯','ar'],
  ['horse','🐴','or'],['unicorn','🦄','or'],['morning','🌅','or'],['forest','🌲','or'],['sword','⚔️','or'],
  ['hammer','🔨','er'],['monster','👾','er'],['flower','🌸','er'],['water','💧','er'],['tower','🗼','er'],
  ['bird','🐦','ir'],['girl','👧','ir'],['circle','⚪','ir'],['birthday','🎉','ir'],
  ['turtle','🐢','ur'],['purse','👜','ur'],['burn','🔥','ur']];
// pic 6 / build 6: other vowel teams and diphthongs. [word, emoji, the team].
const VTW=[['moon','🌙','oo'],['spoon','🥄','oo'],['book','📖','oo'],['foot','🦶','oo'],
  ['house','🏠','ou'],['mouse','🐭','ou'],['cloud','☁️','ou'],['mouth','👄','ou'],
  ['cow','🐄','ow'],['crown','👑','ow'],['owl','🦉','ow'],['down','⬇️','ow'],
  ['coin','🪙','oi'],['noise','🔊','oi'],['boy','👦','oy'],['toy','🧸','oy'],
  ['paw','🐾','aw'],['hawk','🦅','aw'],['dawn','🌅','aw'],['draw','✏️','aw'],
  ['screw','🔩','ew'],['stew','🥣','ew'],['jewel','💎','ew'],['new','🆕','ew']];
const RVP=['ar','or','er','ir','ur'],VTP=['oo','ou','ow','oi','oy','aw','ew'];
// Spellings that could look rude must never be offered as wrong choices.
const PHBAD=/^(poo|shart|fark|furk|ferk|firk|sherk|fuk|dik|dirk|cum|tit)$/;
