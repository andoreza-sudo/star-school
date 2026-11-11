/* ---------- pets ---------- */
const PETS={dragon:{n:'Dragon',s:['🥚','🐍','🐲','🐉'],def:'Sparky'},dino:{n:'Dino',s:['🥚','🦎','🦕','🦖'],def:'Rex'},
  bird:{n:'Bird',s:['🥚','🐣','🐥','🦅'],def:'Tweety'},ocean:{n:'Sea pal',s:['🥚','🐟','🐬','🐳'],def:'Bubbles'}};
const GROW=[0,20,70,160,300];
const stage=(st=S.stars)=>GROW.filter(g=>st>=g).length-1;
const petE=(st=S.stars)=>PETS[S.pet].s[Math.min(stage(st),3)];
const petAura=(st=S.stars)=>petRig()?'rig':stage(st)>=4?'aura':''; // P4-05: 'rig' = drawn pet (17-pets-svg.js)
const petN=()=>S.petName||PETS[S.pet].def;
const STK=[...'🦄🐬🦖🚀🌈🍩🎸🏆🦁🐼🍕🎈🌟🐙🦋🍦🚂⚽🎨🐢🦊🍉🏰🛸🌻🐝🍪🎃🐳🦉🏀🚁🧁🍓🐧🦒🎡⛵🌋🦜🧸🎺🐞🍭🌙🦈🚒🐘'.matchAll(/\p{Extended_Pictographic}️?/gu)].map(m=>m[0]);

