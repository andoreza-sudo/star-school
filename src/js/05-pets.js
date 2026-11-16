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

