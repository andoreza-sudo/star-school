/* ---------- reading generators ---------- */
function words(t){return t.split(' ').map(w=>`<span class="w" data-w="${esc(w.replace(/[^A-Za-z']/g,''))}">${esc(w)}</span>`).join(' ')}
function genSight(lv){const L=DOL[lv-1],w=pick(L);
  const sim=x=>(x[0].toLowerCase()==w[0].toLowerCase()?2:0)+(x.length==w.length?1:0);
  const d=shuffle(shuffle(L.filter(x=>x!==w)).sort((x,y)=>sim(y)-sim(x)).slice(0,6)).slice(0,3);
  return{kind:'choice',html:`<button class="btn hear" data-say="${esc(w)}">🔊</button><div class="sub">Tap the word you hear</div>`,
    say:w,auto:'must',ans:w,choices:shuffle([w,...d]).map(x=>({l:x,v:x})),hint:{k:'say',s:`Listen again. It starts with “${w[0]}”.`,w},label:`hear “${w}”`}}
function variants(w){const out=new Set(),V='aeiou',C='bcdfghjklmnprstvwz',vi=[...w].findIndex(c=>V.includes(c));
  for(let t=0;t<40&&out.size<6;t++){let x;const r=t%3;
    if(r==0&&vi>=0)x=w.slice(0,vi)+pick([...V])+w.slice(vi+1);
    else if(r==1)x=pick([...C])+w.slice(1);else x=w.slice(0,-1)+pick([...C]);
    if(x&&x!==w&&!BAD.test(x))out.add(x)}
  let r=shuffle([...out]).slice(0,3);if(/[aeiou][^aeiou]e$/.test(w)){const ne=w.slice(0,-1);if(!BAD.test(ne)&&!r.includes(ne))r=[ne,...r.slice(0,2)]}
  return r}
function genPic(lv){const [w,e]=pick(WL(lv));
  return{kind:'choice',html:`<div class="emo">${picFor(w,e)}</div><div class="sub">Which word is this?</div>`,say:'Which word is this?',after:w,ans:w,
    choices:shuffle([w,...variants(w)]).map(x=>({l:x,v:x})),hint:{k:'say',s:'Listen! Now find it.',w},label:`read “${w}”`}}
function genBuild(lv){const [w,e]=pick(WL(lv)),abc='abcdefghijklmnoprstuw';
  const extra=shuffle([...abc].filter(c=>!w.includes(c))).slice(0,2);
  return{kind:'build',word:w,tiles:shuffle([...w,...extra]),html:`<div class="emo">${picFor(w,e)}</div><div class="lslots">${[...w].map((_,i)=>`<span class="ls" id="ls${i}"></span>`).join('')}</div>`,
    say:w,auto:true,ans:w,hint:{k:'next'},label:`spell “${w}”`}}
const T1=['I see {a} {w}.','Look at the {w}!','Here is {a} {w}.','I like the {w}.','Can you see the {w}?','The {w} is big.','The {w} is little.','Where is the {w}?'];
const T2=['Mom and I see {a} {w} by the door.','We can play with the {w} today.','Look! The {w} is up on the hill.','My friend said, "I want {a} {w}."','Come and find the {w} with me.','The little {w} went down the road.','She saw {a} {w} at the park.','Did you get {a} {w} too?'];
function genSent(lv){const [w,e]=pick(lv==1?NOUNS.filter(x=>CVC.includes(x)):NOUNS);
  let pool=NOUNS.filter(x=>x[0]!==w);
  if(lv==2){const near=pool.filter(x=>x[0][0]==w[0]||x[0].slice(-2)==w.slice(-2));if(near.length>=2)pool=near}
  const d=shuffle(pool).slice(0,2),t=pick(lv==1?T1:T2).replace('{a}',art(w)).replace('{w}',w);
  return{kind:'choice',cls:'pics',html:`<div class="sent">${words(t)}</div><div class="sub">Tap the picture that matches</div>`,say:'Read it, then tap the picture that matches.',
    ans:w,after:t,choices:shuffle([[w,e],...d]).map(x=>({l:x[1],v:x[0]})),hint:{k:'text',s:'Tap any word to hear it!'},label:`“${t}”`}}

function genCmp(lv){let a,b;
  if(lv==1){a=R(0,20);b=R(0,20)}else if(lv==2){a=R(10,99);b=coin()?Math.floor(a/10)*10+R(0,9):R(10,99)}else{a=R(100,999);b=coin()?Math.floor(a/100)*100+R(0,99):R(100,999)}
  if(rnd()<.15)b=a;const ans=a>b?'>':a<b?'<':'=',w={'>':'greater than','<':'less than','=':'equal to'};
  return{kind:'choice',cls:'syms',html:`<div class="eq">${a} ${SLOT} ${b}</div><div class="sub">Bigger, smaller, or the same?</div>`,
    say:`Is ${a} greater than, less than, or equal to ${b}?`,ans,after:`${a} is ${w[ans]} ${b}`,choices:['<','=','>'].map(x=>({l:x,v:x})),
    hint:{k:'text',s:lv==1?'The hungry alligator mouth opens toward the BIGGER number! 🐊':`Look at the ${lv==2?'tens':'hundreds'} first. The alligator eats the bigger number! 🐊`},label:`${a} ? ${b}`}}
function clockSVG(h,m){const ha=((h%12)+m/60)*30,ma=m*6;let n='';
  for(let i=1;i<=12;i++){const a=i*Math.PI/6;n+=`<text x="${50+35*Math.sin(a)}" y="${50-35*Math.cos(a)+4}" text-anchor="middle" font-size="11" font-weight="700" fill="#2d2a26">${i}</text>`}
  for(let i=0;i<60;i++){const a=i*Math.PI/30,r1=i%5?45:43;n+=`<line x1="${50+r1*Math.sin(a)}" y1="${50-r1*Math.cos(a)}" x2="${50+47*Math.sin(a)}" y2="${50-47*Math.cos(a)}" stroke="#a8a29e" stroke-width="${i%5?.6:1.4}"/>`}
  return`<svg class="clock" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#fff" stroke="#3b82f6" stroke-width="3"/>${n}
  <line x1="50" y1="50" x2="${50+22*Math.sin(ha*Math.PI/180)}" y2="${50-22*Math.cos(ha*Math.PI/180)}" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>
  <line x1="50" y1="50" x2="${50+33*Math.sin(ma*Math.PI/180)}" y2="${50-33*Math.cos(ma*Math.PI/180)}" stroke="#2563eb" stroke-width="3" stroke-linecap="round" opacity=".9"/><circle cx="50" cy="50" r="3" fill="#2d2a26"/></svg>`}
const tstr=(h,m)=>`${h}:${String(m).padStart(2,'0')}`;
function genTime(lv){const h=R(1,12),m=lv==1?0:lv==2?pick([0,30]):pick([0,15,30,45]),ans=tstr(h,m),c=new Set([ans]);
  const hh=x=>((x+11)%12)+1;
  const cand=[tstr(hh(h+1),m),tstr(hh(h-1),m),m?tstr(h,(m+30)%60):tstr(h,30),m?tstr(hh(h+1),m):tstr(12,h*5%60),tstr(hh(h+R(2,5)),m),tstr(h,pick([0,15,30,45]))];
  for(const x of shuffle(cand)){if(c.size>=4)break;if(lv==1&&!x.endsWith(':00'))continue;c.add(x)}
  while(c.size<4)c.add(tstr(R(1,12),lv==1?0:pick([0,30])));
  const spoken=m==0?`${h} o'clock`:m==30?`half past ${h}`:m==15?`quarter past ${h}`:`quarter to ${hh(h+1)}`;
  return{kind:'choice',html:`${clockSVG(h,m)}<div class="sub">What time is it?</div>`,say:'What time does the clock show?',ans,after:`It's ${spoken}!`,
    choices:shuffle([...c]).map(x=>({l:x,v:x})),hint:{k:'text',s:m==0?'The short red hand shows the hour. The long blue hand on 12 means o\'clock.':'Short red hand = hour. Long blue hand: on 3 is :15, on 6 is :30, on 9 is :45.'},label:`clock ${ans}`}}
const COIN={1:['1¢','penny','#c2703d',1],5:['5¢','nickel','#b8bcc2',1.2],10:['10¢','dime','#c9cdd3',.95],25:['25¢','quarter','#aeb3b9',1.35]};
function genCoins(lv){const types=lv==1?[5,1]:lv==2?[10,5,1]:[25,10,5,1];let cs;
  do{cs=Array.from({length:R(lv==1?2:3,lv==1?5:6)},()=>pick(types)).sort((a,b)=>b-a)}while(cs.reduce((a,b)=>a+b,0)>99);
  const tot=cs.reduce((a,b)=>a+b,0),run=[];cs.reduce((a,b)=>(run.push(a+b),a+b),0);
  return{kind:'num',html:`<div class="coins">${cs.map(v=>`<span class="cn" style="--c:${COIN[v][2]};--s:${COIN[v][3]}">${COIN[v][0]}</span>`).join('')}</div><div class="eq" style="font-size:.7em">${SLOT}¢</div>`,
    say:'How many cents?',ans:String(tot),hint:{k:'text',s:`Start with the biggest coin and count on: ${run.slice(0,Math.min(2,run.length-1)).join(', ')}, ...`},label:`coins ${cs.join('+')}`}}
const FRUIT=['🍎','🍓','🍪','⭐','🐟','🌸','🍩','🐞'];
function genMult(lv){const g=R(2,lv==1?4:5),n=lv==1?pick([2,5,10]):R(2,5),e=pick(FRUIT);
  return{kind:'num',html:`<div class="groups">${Array.from({length:g},()=>`<span class="grp" style="--c:${n>5?5:n}">${`<i style="font-style:normal">${e}</i>`.repeat(n)}</span>`).join('')}</div><div class="eq" style="font-size:.7em">${g} groups of ${n} = ${SLOT}</div>`,
    say:`${g} groups of ${n}. How many in all?`,ans:String(g*n),hint:{k:'text',s:`Count by ${n}s: ${[1,2].map(i=>i*n).join(', ')}, ...`},label:`${g} × ${n}`}}
const STORIES=[[
 ['Sam has a red ball. He kicks it to Pam.','Who did Sam kick the ball to?','Pam',['Mom','Dad']],
 ['The cat sat on the mat. The cat is fat and black.','What color is the cat?','black',['red','white']],
 ['I have a big dog. My dog likes to run and jump.','What does the dog like to do?','run and jump',['eat and sleep','swim and dig']],
 ['Ben got a pet fish. He named it Bob.','What is the fish named?','Bob',['Ben','Max']],
 ['Mom made a cake. It was for my birthday.','Why did Mom make a cake?','for a birthday',['for the dog','for school']],
 ['We went to the park. I went down the big slide.','Where did they go?','the park',['the store','the zoo']],
 ['The sun is hot. Let us play in the pool!','Where will they play?','in the pool',['in the snow','in the house']],
 ['A frog sat on a log. It jumped into the pond.','Where did the frog jump?','into the pond',['into a tree','onto a bus']],
 ['Liz has three red pens and one blue pen.','How many red pens does Liz have?','three',['one','four']],
 ['It is raining. I need my boots and a hat.','What is the weather like?','rainy',['sunny','snowy']],
 ['The duck is in the van. The van goes fast!','What is in the van?','a duck',['a pig','a cat']],
 ['Tim fed the hen. The hen gave him an egg.','What did the hen give Tim?','an egg',['a nut','a bug']]],[
 ['Mia wanted to bake cookies. She got flour, sugar, and eggs. When the cookies were done, she gave one to her little brother.','Who got a cookie from Mia?','her little brother',['her mom','her teacher']],
 ['The class went on a trip to the farm. They saw cows, pigs, and a horse. Jake liked the pigs best because they were muddy.','Why did Jake like the pigs?','they were muddy',['they were big','they ran fast']],
 ['Ana planted a seed in a pot. She gave it water every day. After two weeks, a little green sprout came up.','What did Ana do every day?','gave it water',['sang to it','dug it up']],
 ['It was snowing outside. Leo put on his coat, hat, and mittens. Then he built a big snowman with a carrot nose.','What was the snowman\'s nose?','a carrot',['a stick','a rock']],
 ['Grandpa took Emma fishing at the lake. They sat in the boat for a long time. At last, Emma caught a fish!','Where did they go fishing?','at the lake',['at the sea','in a pool']],
 ['Max lost his blue sock. He looked under the bed and in the closet. He found it in the dog\'s bed!','Where was the sock?','in the dog\'s bed',['under the bed','in the closet']],
 ['The bus was late. The kids waited and waited. When it came, they were glad to get out of the cold.','How did the kids feel when the bus came?','glad',['sad','angry']],
 ['Owls sleep in the day and hunt at night. They have big eyes to help them see in the dark.','When do owls hunt?','at night',['in the morning','at lunch']],
 ['Sara and her dad made a bird house. They painted it yellow. The next day, two birds moved in.','What color was the bird house?','yellow',['red','blue']],
 ['Kim had a loose tooth. She wiggled it all day. At dinner, it fell out when she bit an apple!','When did the tooth fall out?','at dinner',['at school','in bed']],
 ['Bees fly from flower to flower. They take nectar back to the hive. They use it to make honey.','What do bees make?','honey',['milk','juice']],
 ['Noah had five crayons. He gave two to his friend. Then he drew a picture with the rest.','How many crayons did Noah keep?','three',['five','two']]]];
function genComp(lv){const [t,qq,a,d]=pick(STORIES[Math.min(lv,2)-1]);
  return{kind:'choice',cls:'wide',html:`<p class="story">${words(t)}</p><p class="story" style="color:#1d4ed8">${words(qq)}</p>`,say:t+' '+qq,auto:true,ans:a,
    choices:shuffle([a,...d]).map(x=>({l:x,v:x})),hint:{k:'say',s:'Listen to the story again. Tap any word to hear it.',w:t},label:qq}}


/* ---------- ABC Beach (P2-15): letters, middle vowels, digraphs, syllables ---------- */
const ABC_LOW='abcdefghijklmnopqrstuvwxyz',ABC_UP=ABC_LOW.toUpperCase();
// Wrong letters: look-alikes first, then any other letter. Returns n shuffled options that include L.
function abcOpts(L,groups,n,all){
  const near=[]; // members of the first group that holds L come first (b: d p q before the other groups)
  for(const g of groups.filter(g=>g.includes(L)))for(const c of shuffle([...g].filter(x=>x!=L)))if(!near.includes(c))near.push(c);
  const rest=shuffle([...all].filter(x=>x!=L&&!near.includes(x)));
  return shuffle([L,...near.concat(rest).slice(0,n-1)])}
const HEARBTN=w=>`<button class="btn hear" data-say="${esc(w)}">${ico('speak','1em')}</button>`;
function genAbc(lv){
  const AL=ABC_LOW;
  if(lv<=2){ // hear a letter name, tap the big (1) or little (2) letter
    const L=pick(ABCP),low=lv==2,ans=low?L.toLowerCase():L,w=LETW[L],size=low?'little':'big',s=`Find the ${size} letter ${L}.`;
    const opts=abcOpts(ans,low?LOOKL:LOOKU,low?4:3,low?ABC_LOW:ABC_UP);
    return{kind:'choice',cls:low?'syms sym4':'syms',html:`${HEARBTN(s)}<div class="sub">Tap the ${size} letter you hear</div>`,
      say:s,auto:'must',ans,after:`${ans}. ${L} is for ${w}!`,choices:opts.map(x=>({l:x,v:x})),
      hint:{k:'say',w:`${L}. ${L} is for ${w}.`,s:`${low?L.toLowerCase()+' and '+L:L} is for ${w}. Look for the ${size} ${ans}.`},label:`${size} ${L}`}}
  if(lv==3){ // match 4 big letters to their little letters
    const Ls=[];while(Ls.length<4){const x=pick(ABCP);if(!Ls.includes(x))Ls.push(x)}
    const items=Ls.map(x=>({v:x,l:x})),opts=shuffle(Ls.map(x=>({v:x,l:x.toLowerCase()})));
    return{kind:'match',html:'<div class="sub">Match each big letter to its little letter</div>',say:'Match each big letter to its little letter.',
      items,opts,ans:[...Ls].sort().join('|'),after:'Big and little letters are partners!',
      hint:{k:'text',s:'Tap a big letter, then tap the little letter that is its partner. They often look alike.'},label:`match ${[...Ls].sort().join('')}`}}
  // lv 4: what comes after a letter (choice) or fill the gap in a run of four (build)
  const up=coin(),f=s=>up?s.toUpperCase():s;
  if(coin()){
    const i=R(0,24),L=AL[i],ans=AL[i+1];
    const d=shuffle([AL[i-1],AL[i+2],AL[i+3],AL[i-2]].filter(x=>x&&x!=ans&&x!=L)).slice(0,2);
    return{kind:'choice',cls:'syms',html:`<div class="emo">${f(L)}</div><div class="sub">What letter comes next in the ABC?</div>`,
      say:`What letter comes after ${L}?`,auto:true,ans:f(ans),after:`${f(L)}, ${f(ans)}!`,choices:shuffle([ans,...d]).map(x=>({l:f(x),v:f(x)})),
      hint:{k:'say',w:AL.slice(Math.max(0,i-3),i+1).split('').join(', '),s:`Sing the ABC song up to ${f(L)}. The very next letter is the answer.`},label:`after ${f(L)}`}}
  const s=R(1,22),g=R(1,2),miss=AL[s+g],word=f(miss);
  // 3 wrong tiles: letters just outside the run (never one that is shown in it), topped up with others
  const wrong=[AL[s-1],AL[s+4],AL[s-2],AL[s+5]].filter(x=>x&&x!=miss);
  const fill=shuffle([...AL].filter(x=>!AL.slice(s,s+4).includes(x)&&!wrong.includes(x)));
  const tiles=shuffle([word,...[...new Set(wrong.concat(fill))].slice(0,3).map(f)]);
  const run=[0,1,2,3].map(k=>k==g?'<span class="ls" id="ls0"></span>':`<span class="ab-l">${f(AL[s+k])}</span>`).join('');
  const sp=[0,1,2,3].map(k=>k==g?'blank':AL[s+k]).join(', ');
  return{kind:'build',word,tiles,html:`<div class="lslots">${run}</div><div class="sub">Which letter is missing?</div>`,say:`Which letter is missing? ${sp}.`,auto:true,ans:word,
    hint:{k:'next'},label:`gap ${f(AL[s])}${g}`}}

// sound 3 (K): the middle vowel of a picture word. sound 4 (1st): digraph at the start or end of a picture word.
function genSoundB(lv){
  if(lv==3){
    const [w,e]=pick(CVCM),mid=w[1];
    const opts=shuffle([mid,...shuffle([...'aeiou'].filter(x=>x!=mid)).slice(0,2)]);
    return{kind:'choice',cls:'syms',html:`<div class="emo">${picFor(w,e)}</div><div class="sub">Which vowel is in the middle?</div><div class="sent">${w[0]} ${SLOT} ${w[2]}</div>`,
      say:`${w}. Which vowel is in the middle of ${w}?`,auto:true,ans:mid,after:`${w}!`,choices:opts.map(x=>({l:x,v:x})),
      hint:{k:'say',w:`${w}... ${w}`,s:'Say it slowly. Listen to the sound in the middle.'},label:`middle: ${w}`}}
  const dg=pick(['sh','ch','th','ck','sh','ch','th','ck','wh']),[w,e,,pos]=pick(DIGR.filter(x=>x[2]==dg)),st=pos=='s';
  const pool=st?['sh','ch','th','wh']:['sh','ch','th','ck'];
  return{kind:'choice',cls:'syms sym4',html:`<div class="emo">${picFor(w,e)}</div><div class="sub">Which letters ${st?'start':'end'} <b>${w}</b>?</div>`,
    say:`${w}. Which letters ${st?'start':'end'} ${w}?`,auto:true,ans:dg,after:`${w}: ${dg}!`,choices:shuffle(pool).map(x=>({l:x,v:x})),
    hint:{k:'say',w:`${w}... ${w}`,s:`Two letters work together to make one sound. Listen to the ${st?'start':'end'} of ${w}.`},label:`${st?'starts':'ends'} ${dg}: ${w}`}}

// syl 1 (K): picture words, 1-3 claps. syl 2 (1st): printed words, 1-4 claps. Buttons show the number and that many clap stars.
function sylChoices(max){
  return Array.from({length:max},(_,i)=>({v:String(i+1),h:true,
    l:`<b>${i+1}</b><span class="clp">${ico('star','1em').repeat(i+1)}</span>`}))}
function genSyl(lv){
  if(lv==1){
    const n=R(1,3),[w,e]=pick(SYLP.filter(x=>x[2]==n));
    return{kind:'choice',cls:'syms clps',html:`<div class="emo">${picFor(w,e)}</div><div class="sub">How many claps in <b>${w}</b>?</div>`,say:`${w}. How many claps in ${w}?`,
      auto:true,ans:String(n),after:`${w} has ${n} ${n==1?'clap':'claps'}!`,choices:sylChoices(3),
      hint:{k:'say',w:`${w}... ${w}`,s:'Clap each beat as you say the word slowly.'},label:`claps: ${w}`}}
  const n=R(1,4),w=pick(SYLW[n-1]);
  return{kind:'choice',cls:'syms sym4 clps',html:`${HEARBTN(w)}<div class="sent">${esc(w)}</div><div class="sub">How many claps?</div>`,say:`${w}. How many claps in ${w}?`,
    auto:true,ans:String(n),after:`${w} has ${n} ${n==1?'clap':'claps'}!`,choices:sylChoices(4),
    hint:{k:'say',w:`${w}... ${w}`,s:'Clap each beat as you say the word slowly.'},label:`syllables: ${w}`}}
