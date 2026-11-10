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

