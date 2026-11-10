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
  return{kind:'choice',html:`<div class="emo">${e}</div><div class="sub">Which word is this?</div>`,say:'Which word is this?',after:w,ans:w,
    choices:shuffle([w,...variants(w)]).map(x=>({l:x,v:x})),hint:{k:'say',s:'Listen! Now find it.',w},label:`read “${w}”`}}
function genBuild(lv){const [w,e]=pick(WL(lv)),abc='abcdefghijklmnoprstuw';
  const extra=shuffle([...abc].filter(c=>!w.includes(c))).slice(0,2);
  return{kind:'build',word:w,tiles:shuffle([...w,...extra]),html:`<div class="emo">${e}</div><div class="lslots">${[...w].map((_,i)=>`<span class="ls" id="ls${i}"></span>`).join('')}</div>`,
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
  if(Math.random()<.15)b=a;const ans=a>b?'>':a<b?'<':'=',w={'>':'greater than','<':'less than','=':'equal to'};
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

