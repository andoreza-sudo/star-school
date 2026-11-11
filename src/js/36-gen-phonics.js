/* ---------- early reading: sounds & rhymes ---------- */
function genSound(lv){const [w,e]=pick(lv==1?CVC.concat(BLEND.filter(x=>!/^(sh|ch|th|wh)/.test(x[0]))):CVC),ch=lv==1?w[0]:w[w.length-1];
  // R-01r: c and k are never offered together (both are right for /k/), and the picture goes through picFor (drawings)
  const opts=shuffle([ch,...shuffle([...'bcdfghjklmnprstvw'].filter(x=>x!=ch&&!(ch=='c'&&x=='k')&&!(ch=='k'&&x=='c'))).slice(0,2)]);
  return{kind:'choice',cls:'syms',html:`<div class="emo">${picFor(w,e)}</div><div class="sub">${lv==1?'What sound does it START with?':'What sound does it END with?'}</div>`,
    say:`${w}. What sound does ${w} ${lv==1?'start':'end'} with?`,auto:true,ans:ch,after:w,choices:opts.map(x=>({l:x,v:x})),
    hint:{k:'say',w:`${w}... ${w}`,s:lv==1?'Say it slowly. Listen to the very first sound.':'Say it slowly. Listen to the very last sound.'},label:`${lv==1?'starts':'ends'}: ${w}`}}
// R-01r: every picture names one thing a child would say: no mug drawn as a coffee cup, no king drawn as a crown, no rat that looks
// like the mouse, no ten drawn as a keycap. The families with those words became duck / truck and nose / rose (all drawn).
const RHY=[[['cat','🐱'],['bat','🦇'],['hat','🎩']],[['hen','🐔'],['pen','🖊️']],[['duck','🦆'],['truck','🚚']],[['dog','🐶'],['frog','🐸']],[['fox','🦊'],['box','📦']],
 [['cake','🎂'],['snake','🐍']],[['nose','👃'],['rose','🌹']],[['bee','🐝'],['tree','🌳']],[['goat','🐐'],['boat','⛵'],['coat','🧥']],[['sock','🧦'],['clock','🕐']],[['bell','🔔'],['shell','🐚']],
 [['car','🚗'],['star','⭐']],[['moon','🌙'],['spoon','🥄']],[['mouse','🐭'],['house','🏠']]];
// The rime: the word from its first vowel on (goat: oat, duck: uck). The hint names it, so it never fits another family (oat, not at).
const rime=w=>w.slice(w.search(/[aeiou]/));
function genRhyme(lv){const fi=R(0,RHY.length-1),fam=RHY[fi],[t,r]=shuffle(fam);
  // other families whose words end in the same letters are left out (goat and cat: oat ends in at), so the hint fits one choice only
  const near=f=>f.some(x=>x[0].endsWith(rime(t[0]))||t[0].endsWith(rime(x[0])));
  const others=shuffle(RHY.filter((f,i)=>i!=fi&&!near(f))).slice(0,2).map(f=>pick(f));
  const opts=shuffle([r,...others]),names=opts.map(x=>x[0]);
  // R-01r: pictures through picFor; in Rhyme Time (level 1, Kindergarten) the three pictures are named aloud and the help is spoken
  const say=lv==1?`Which one rhymes with ${t[0]}: ${names[0]}, ${names[1]} or ${names[2]}?`:`Which one rhymes with ${t[0]}?`;
  return{kind:'choice',cls:lv==1?'pics':'',html:`<div class="emo">${picFor(t[0],t[1])}</div><div class="sub">${lv==1?`Which picture rhymes with “${t[0]}”?`:`Which word rhymes with “${t[0]}”?`}</div>`,
    say,auto:true,ans:r[0],after:`${t[0]}, ${r[0]}!`,choices:opts.map(x=>lv==1?{l:picFor(x[0],x[1]),v:x[0],h:true}:{l:x[0],v:x[0]}),
    hint:{k:'say',s:`Rhymes sound the same at the end: ${rime(t[0])}…`,w:`${t[0]}. Rhymes sound the same at the end. Which one ends like ${t[0]}?`},label:`rhyme: ${t[0]}`}}

