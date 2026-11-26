/* ---------- pets ---------- */
const PETS={dragon:{n:'Dragon',s:['🥚','🐍','🐲','🐉'],def:'Sparky'},dino:{n:'Dino',s:['🥚','🦎','🦕','🦖'],def:'Rex'},
  bird:{n:'Bird',s:['🥚','🐣','🐥','🦅'],def:'Tweety'},ocean:{n:'Sea pal',s:['🥚','🐟','🐬','🐳'],def:'Bubbles'}};
const GROW=[0,20,70,160,300];
const stage=(st=S.stars)=>GROW.filter(g=>st>=g).length-1;
const petE=(st=S.stars)=>PETS[S.pet].s[Math.min(stage(st),3)];
const petAura=(st=S.stars)=>'rig'; // P4-05/P4-06: 'rig' = drawn pet (17-pets-svg.js); every pet is drawn now
const petN=()=>S.petName||PETS[S.pet].def;
const STK=[...'🐠🐬🦖🚀🌈🍩🎸🏆🦁🐼🍕🎈🌟🐙🦋🍦🚂⚽🎨🐢🦊🍉🏰🛸🌻🐝🍪🎃🐳🦉🏀🚁🧁🍓🐧🦒🎡⛵🌋🦜🧸🎺🐞🍭🌙🦈🚒🐘'.matchAll(/\p{Extended_Pictographic}️?/gu)].map(m=>m[0]);
// how many of a sticker the child has; the fish also counts an old sticker (U+1F984) a save may still hold (CONTENT-01: no such theme, saves are not rewritten)
const stkN=s=>(S.stickers[s]||0)+(s=='\u{1F420}'?(S.stickers['\u{1F984}']||0):0);
/* EMOJI-12: a sticker shows a drawing when the app has one for it, else its emoji (docs/drafts/AUDIO12.md part B: the sticker won at
   the end of every round was the emoji a child met most). 12 are new (src/data/d-art-e.js, also the Pre-K syllable pictures), 21 are
   object art the app already drew (the soccer ball keeps its emoji: the drawn ball is a beach ball). Saves keep the emoji (S.stickers keys); only the picture on screen changes. ART is read inside
   stkPic (the data file loads after this file). */
const STK_ART={'\u{1F420}':'fish','\u{1F996}':'dinosaur','\u{1F680}':'rocket','\u{1F308}':'rainbow','\u{1F369}':'doughnut','\u{1F3B8}':'guitar',
  '\u{1F981}':'lion','\u{1F355}':'pizza','\u{1F388}':'balloon','\u{1F31F}':'star','\u{1F419}':'octopus','\u{1F98B}':'butterfly','\u{1F366}':'icecream',
  '\u{1F682}':'train','\u{1F422}':'turtle','\u{1F98A}':'fox','\u{1F3F0}':'castle','\u{1F33B}':'sunflower','\u{1F41D}':'bee',
  '\u{1F36A}':'cookie','\u{1F383}':'pumpkin','\u{1F433}':'whale','\u{1F989}':'owl','\u{1F681}':'helicopter','\u{1F353}':'strawberry',
  '\u{1F427}':'penguin','\u{1F992}':'giraffe','\u26F5':'boat','\u{1F30B}':'volcano','\u{1F3BA}':'trumpet','\u{1F41E}':'ladybug',
  '\u{1F319}':'moon','\u{1F418}':'elephant'};
const stkPic=s=>{const n=STK_ART[s];return n&&typeof ART!='undefined'&&ART[n]&&typeof picArt=='function'?picArt(n):esc(s)};

