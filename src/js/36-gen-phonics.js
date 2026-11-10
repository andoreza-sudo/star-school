/* ---------- early reading: sounds & rhymes ---------- */
function genSound(lv){const [w,e]=pick(lv==1?CVC.concat(BLEND.filter(x=>!/^(sh|ch|th|wh)/.test(x[0]))):CVC),ch=lv==1?w[0]:w[w.length-1];
  const opts=shuffle([ch,...shuffle([...'bcdfghjklmnprstvw'].filter(x=>x!=ch)).slice(0,2)]);
  return{kind:'choice',cls:'syms',html:`<div class="emo">${e}</div><div class="sub">${lv==1?'What sound does it START with?':'What sound does it END with?'}</div>`,
    say:`${w}. What sound does ${w} ${lv==1?'start':'end'} with?`,auto:true,ans:ch,after:w,choices:opts.map(x=>({l:x,v:x})),
    hint:{k:'say',w:`${w}... ${w}`,s:lv==1?'Say it slowly. Listen to the very first sound.':'Say it slowly. Listen to the very last sound.'},label:`${lv==1?'starts':'ends'}: ${w}`}}
const RHY=[[['cat','🐱'],['bat','🦇'],['hat','🎩'],['rat','🐀']],[['hen','🐔'],['pen','🖊️'],['ten','🔟']],[['bug','🐛'],['mug','☕']],[['dog','🐶'],['frog','🐸']],[['fox','🦊'],['box','📦']],
 [['cake','🎂'],['snake','🐍']],[['king','👑'],['ring','💍']],[['bee','🐝'],['tree','🌳']],[['goat','🐐'],['boat','⛵'],['coat','🧥']],[['sock','🧦'],['clock','🕐']],[['bell','🔔'],['shell','🐚']],
 [['car','🚗'],['star','⭐']],[['moon','🌙'],['spoon','🥄']],[['mouse','🐭'],['house','🏠']]];
function genRhyme(lv){const fi=R(0,RHY.length-1),fam=RHY[fi],[t,r]=shuffle(fam),others=shuffle(RHY.filter((_,i)=>i!=fi)).slice(0,2).map(f=>pick(f));
  const opts=shuffle([r,...others]);
  return{kind:'choice',cls:lv==1?'pics':'',html:`<div class="emo">${t[1]}</div><div class="sub">${lv==1?`Which picture rhymes with “${t[0]}”?`:`Which word rhymes with “${t[0]}”?`}</div>`,
    say:`Which one rhymes with ${t[0]}?`,auto:true,ans:r[0],after:`${t[0]}, ${r[0]}!`,choices:opts.map(x=>({l:lv==1?x[1]:x[0],v:x[0]})),
    hint:{k:'text',s:`Rhymes sound the same at the end: ${t[0].slice(-2)}…`},label:`rhyme: ${t[0]}`}}

