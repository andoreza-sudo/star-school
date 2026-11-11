/* ---------- content banks (P1-09) ---------- */
/* Fact content (grammar, vocabulary, passages, science) is DATA in src/data/d-*.js and is turned into questions here.
   Data files load after all code, so a data file may do `BANK.gram=[...]` at load time, but code in this file may read
   BANK and PASS only inside functions (at run time).

   BANK[id] = [item, ...]   item (CURRICULUM.md section 8):
     lv     skill level (whole number, 1 and up)                      required
     q      question text; '___' marks a blank (shown as a slot)      required (not for match)
     a      right answer (a list for form 'multi')
     d      2 or 3 wrong answers (forms choice, wide, multi)
     form   'choice' (default) | 'wide' | 'tap' | 'spell' | 'order' | 'match' | 'multi'
     sent   tap: the sentence; the child taps the word that is the answer
     order  order: the items in the right order      pairs  match: [[left, right], ...]
     label  short unique name for the report and review (default: q + answer; passages use title + number)
     topic  strand tag for the report card   hint  teaching hint   pic  icon name from ICONS   say  text to read instead of q
     em     [art name, emoji]: a picture of a thing above the prompt, through picFor (P2-22)
   choice and wide make a `choice` question (wide = one button per row), tap a `choice` over the words of the sentence,
   spell a `build` question. order, match and multi need their own question kind (P1-03/P1-04): such a kind registers its
   builder as BANKF.form=(item, id)=>question; until it does, those items are never drawn.

   PASS[id] = [{lv, title, text, qs:[item, ...]}]: one passage and its questions (items as above, forms choice or wide).
   Every question of a passage carries q.ctx = {title, text}; renderQ shows it in a collapsible, scrollable panel
   (bankCtx) above the prompt; the words of the text are tap-to-hear.

   A skill uses a bank by calling genBank in its gen. A passage skill also gives a round hook: start() in 50-round.js calls
   SK[sk].round(lv) and plays the returned list of questions as the whole round (round length = list length).
     SK.gram={t:'Grammar',e:'...',area:'read',max:5,bank:'gram',gen:lv=>genBank('gram',lv)}
     SK.story={t:'Story',e:'...',area:'read',max:2,bank:'story',gen:lv=>genPassage('story',lv),round:lv=>passageRound('story','story',lv)}

   Choosing an item: in live play (a round has started: BANKLIVE) the least recently shown item of the level comes first, and
   never-shown ones before shown ones. Without a round (tests, review, race) the choice depends on the seed only, so
   genQ(sk, lv, seed) is reproducible. Every question carries q.bk, a small spec; bankRebuild(q.bk) makes the same question again. */
const BANK={};
const PASS={};
const BANKF={}; // builders for forms that need another question kind: BANKF.order=(item, id)=>question
const BANKFORMS=['choice','wide','tap','spell','order','match','multi'];
let BANKLIVE=false; // set by bankRound() when a round starts
let BANKTICK=0;
const BANKMEM={}; // 'id' or 'P:id' -> {index: tick when last shown}; this session only, never saved

function bankRound(){BANKLIVE=true}
function bankReset(){
  BANKLIVE=false;
  BANKTICK=0;
  for(const k in BANKMEM)delete BANKMEM[k];
}

const bankSeed=()=>Math.floor(rnd()*4294967296)>>>0;
const bankSub=(s,i)=>(s^Math.imul(i+1,0x9E3779B1))>>>0;
// run fn with a private seeded random stream; the caller's stream is restored even when fn throws
function bankWith(seed,fn){
  const prev=RNG;
  RNG=mulberry32(seed>>>0);
  try{return fn()}
  finally{RNG=prev}
}
// which candidate index comes next. Live: least recently shown, never-shown first. Otherwise: by the seed only.
function bankChoose(key,cands,s){
  const P=mulberry32(s);
  if(!BANKLIVE)return cands[Math.floor(P()*cands.length)];
  const mem=BANKMEM[key]||(BANKMEM[key]={});
  const lo=Math.min(...cands.map(i=>mem[i]||0));
  const tie=cands.filter(i=>(mem[i]||0)==lo);
  const i=tie[Math.floor(P()*tie.length)];
  mem[i]=++BANKTICK;
  return i;
}
const bankCan=it=>it.form=='order'||it.form=='match'||it.form=='multi'?!!(BANKF[it.form]&&KIND[it.form]):true;
const bankTxt=t=>esc(t).replace(/\*([^*]+)\*/g,'<b>$1</b>').replace(/___/g,SLOT); // a word between * stars * prints in bold (P2-23)
const bankSay=t=>String(t).replace(/\*/g,'').replace(/___/g,'blank');
const bankWords=t=>String(t).split(/[^A-Za-z']+/).filter(Boolean);

// One question from one item. Call it inside bankWith so shuffle() uses the item's own random stream.
function bankBuild(id,it,pass){
  const form=it.form||'choice';
  const pic=it.em?`<div class="bpic bem">${picFor(it.em[0],it.em[1])}</div>`:it.pic&&ICONS[it.pic]?`<div class="bpic">${ico(it.pic,64)}</div>`:'';
  let q;
  if(form=='spell'){
    const w=it.a,abc='abcdefghijklmnoprstuw';
    const extra=shuffle([...abc].filter(c=>!w.includes(c))).slice(0,2);
    q={kind:'build',word:w,tiles:shuffle([...w,...extra]),ans:w,hint:{k:'next'},
      html:`${pic}<div class="bq">${esc(it.q)}</div><div class="lslots">${[...w].map((_,i)=>`<span class="ls" id="ls${i}"></span>`).join('')}</div>`};
  }
  else if(form=='tap'){
    const seen=new Set();
    const ws=bankWords(it.sent).filter(x=>!seen.has(x)&&seen.add(x));
    q={kind:'choice',cls:'bwords',ans:it.a,choices:ws.map(x=>({v:x,l:x})),
      html:`${pic}<div class="bq">${esc(it.q)}</div><div class="bsent">${esc(it.sent)}</div>`};
  }
  else if(form!='choice'&&form!='wide')q=BANKF[form](it,id);
  else q={kind:'choice',cls:(form=='wide'?'wide':'')+(pass?' bpass':''),ans:it.a,choices:shuffle([it.a,...it.d]).map(x=>({v:x,l:x})),
    html:`${pic}<div class="bq">${bankTxt(it.q)}</div>`};
  if(!q.hint)q.hint={k:'text',s:it.hint||'Read it again slowly. Which one fits best?'};
  else if(it.hint&&q.hint.k=='text')q.hint.s=it.hint;
  q.say=it.say||bankSay(it.q);
  if(it.label)q.label=it.label; // label: optional, for long prompts (passages)
  else{const a=(Array.isArray(it.a)?it.a.join(','):it.a).slice(0,24);q.label=it.q.replace(/\*/g,'').slice(0,56-a.length)+' = '+a} // under 60 letters in all (P2-23)
  if(it.topic)q.topic=it.topic;
  if(pass)q.ctx={title:pass.title,text:pass.text};
  return q;
}

/* genBank(id, lv): one question from BANK[id] at level lv. o.bi forces the item and o.s the seed (both used by bankRebuild). */
function genBank(id,lv,o={}){
  const items=BANK[id]||[];
  const s0=o.s!=null?o.s:bankSeed();
  const cands=items.map((it,i)=>i).filter(i=>items[i].lv==lv&&bankCan(items[i]));
  if(!cands.length)throw new Error('bank '+id+' has no usable item at level '+lv);
  const bi=o.bi!=null?o.bi:bankChoose(id,cands,s0);
  const q=bankWith(bankSub(s0,bi),()=>bankBuild(id,items[bi]));
  q.bk={id,lv,bi,s:s0};
  return q;
}

/* genPassage(id, lv): one question (with its passage as q.ctx) from a passage of level lv. Used as the skill's gen, so
   boss fights, mixed rounds and review can ask a passage question on its own. o.bp, o.qi, o.s force passage, question, seed. */
function genPassage(id,lv,o={}){
  const ps=PASS[id]||[];
  const s0=o.s!=null?o.s:bankSeed();
  const cands=ps.map((p,i)=>i).filter(i=>ps[i].lv==lv);
  if(!cands.length)throw new Error('passages '+id+' has none at level '+lv);
  const bp=o.bp!=null?o.bp:bankChoose('P:'+id,cands,s0);
  const qs=ps[bp].qs;
  const qi=o.qi!=null?o.qi:Math.floor(mulberry32(bankSub(s0,99))()*qs.length);
  const q=bankWith(bankSub(s0,bp*16+qi),()=>bankBuild(id,qs[qi],ps[bp]));
  q.bk={id,lv,bp,qi,s:s0};
  return q;
}

/* passageRound(sk, id, lv): a whole round for the SK[sk].round hook: one passage, all its questions in order. Questions are
   stamped with sk, lv and seed like genQ does (check() reads q.sk). */
function passageRound(sk,id,lv){
  const ps=PASS[id]||[];
  const s0=bankSeed();
  const cands=ps.map((p,i)=>i).filter(i=>ps[i].lv==lv);
  if(!cands.length)throw new Error('passages '+id+' has none at level '+lv);
  const bp=bankChoose('P:'+id,cands,s0);
  return ps[bp].qs.map((_,qi)=>{
    const q=genPassage(id,lv,{bp,qi,s:s0});
    q.sk=sk;q.lv=lv;q.seed=s0;
    return q;
  });
}

// the same question again from a saved q.bk
function bankRebuild(bk){
  return bk.qi!=null?genPassage(bk.id,bk.lv,{bp:bk.bp,qi:bk.qi,s:bk.s}):genBank(bk.id,bk.lv,{bi:bk.bi,s:bk.s});
}

/* The passage panel (q.ctx): a <details> that is open by default; the body scrolls when the text is long.
   renderQ puts bankCtx(q.ctx) above the prompt. The words use the existing .w spans, so renderQ's tap-to-hear works.
   The "Hear it" button uses data-say, which renderQ also binds. ontoggle re-fits the question after open/close. */
function bankCtx(c){
  return `<details class="bctx" open ontoggle="fit()"><summary class="bctx-h"><span class="bctx-t">${esc(c.title||'Read')}</span>`
    +'<span class="bctx-s"><span class="bctx-hide">Hide</span><span class="bctx-show">Show</span></span></summary>'
    +`<div class="bctx-b"><button class="btn sm bctx-say" data-say="${esc(c.text)}">${ico('speak',22)} Hear the story</button>`
    +`<p class="bctx-p">${words(c.text)}</p></div></details>`;
}

/* ---------- validator (run by tools/test.js; reused by content chunks) ---------- */
const BANKLIM={q:140,choice:60,hint:140,text:1200,title:40};
function bankBadWords(t){return bankWords(t).map(w=>w.toLowerCase()).filter(w=>BAD.test(w))}
// problems with one item; where is a label for the message
function bankItemProblems(it,where){
  const p=[],form=it.form||'choice',w=where+': ';
  const str=(v,max,name)=>{
    if(typeof v!=='string'||!v.trim()){p.push(w+name+' is not a text');return false}
    if(v.length>max)p.push(w+name+' is longer than '+max);
    for(const b of bankBadWords(v))p.push(w+name+' has a bad word: '+b);
    return true;
  };
  if(!Number.isInteger(it.lv)||it.lv<1)p.push(w+'lv must be a whole number from 1');
  if(!BANKFORMS.includes(form)){p.push(w+'unknown form '+form);return p}
  if(form!='match')str(it.q,BANKLIM.q,'q');
  if(it.hint!=null)str(it.hint,BANKLIM.hint,'hint');
  if(it.say!=null)str(it.say,BANKLIM.q,'say');
  if(it.pic!=null&&typeof ICONS!=='undefined'&&!ICONS[it.pic])p.push(w+'pic '+it.pic+' is not an icon');
  if(it.em!=null&&!(Array.isArray(it.em)&&it.em.length==2&&/^[a-z-]+$/.test(it.em[0])&&typeof it.em[1]=='string'&&it.em[1]))p.push(w+'em must be [art name, emoji]');
  const distinct=(a,name)=>{if(new Set(a.map(x=>String(x).toLowerCase())).size!==a.length)p.push(w+name+' has duplicates')};
  if(form=='choice'||form=='wide'||form=='multi'){
    const as=form=='multi'?it.a:[it.a];
    if(form=='multi'&&(!Array.isArray(it.a)||it.a.length<2||it.a.length>4))p.push(w+'multi needs 2 to 4 answers in a');
    else{
      if(!Array.isArray(it.d)||it.d.length<2||it.d.length>3)p.push(w+'d needs 2 or 3 distractors');
      else{
        const all=[...as,...it.d];
        if(all.every(x=>str(x,BANKLIM.choice,'choice "'+x+'"')))distinct(all,'a and d');
      }
    }
  }
  else if(form=='tap'){
    str(it.sent,BANKLIM.q,'sent');
    if(typeof it.sent==='string'&&typeof it.a==='string'){
      const n=bankWords(it.sent).filter(x=>x==it.a).length;
      if(n!==1)p.push(w+'a must be one word that appears exactly once in sent (found '+n+')');
      if(bankWords(it.sent).length<2)p.push(w+'sent needs at least 2 words');
    }
  }
  else if(form=='spell'){
    if(typeof it.a!=='string'||!/^[a-z]{2,12}$/.test(it.a))p.push(w+'spell a must be 2 to 12 lowercase letters');
    else for(const b of bankBadWords(it.a))p.push(w+'a has a bad word: '+b);
  }
  else if(form=='order'){
    if(!Array.isArray(it.order)||it.order.length<3||it.order.length>6)p.push(w+'order needs 3 to 6 items');
    else if(it.order.every(x=>str(x,BANKLIM.choice,'order item')))distinct(it.order,'order');
  }
  else if(form=='match'){
    if(!Array.isArray(it.pairs)||it.pairs.length<3||it.pairs.length>5||it.pairs.some(x=>!Array.isArray(x)||x.length!==2))
      p.push(w+'pairs needs 3 to 5 [left, right] pairs');
    else if(it.pairs.flat().every(x=>str(x,BANKLIM.choice,'pair text'))){
      distinct(it.pairs.map(x=>x[0]),'pair lefts');
      distinct(it.pairs.map(x=>x[1]),'pair rights');
    }
  }
  return p;
}
// problems with a whole bank: every item, no duplicate q+a, at least min items for each level in levels
function bankProblems(id,o={}){
  const items=BANK[id],p=[];
  if(!Array.isArray(items)||!items.length)return['BANK.'+id+' is missing or empty'];
  const seen=new Set();
  items.forEach((it,i)=>{
    p.push(...bankItemProblems(it,'BANK.'+id+'['+i+']'));
    const k=(it.q||'')+'|'+JSON.stringify(it.a!=null?it.a:it.pairs||it.order);
    if(seen.has(k))p.push('BANK.'+id+'['+i+']: same q and a as an earlier item');
    seen.add(k);
  });
  for(const lv of o.levels||[]){
    const n=items.filter(it=>it.lv==lv).length;
    if(n<(o.min||0))p.push('BANK.'+id+' level '+lv+' has '+n+' items, needs '+(o.min));
  }
  return p;
}
// problems with the passages of one id
function passageProblems(id){
  const ps=PASS[id],p=[];
  if(!Array.isArray(ps)||!ps.length)return['PASS.'+id+' is missing or empty'];
  ps.forEach((x,i)=>{
    const w='PASS.'+id+'['+i+']';
    if(!Number.isInteger(x.lv)||x.lv<1)p.push(w+': lv must be a whole number from 1');
    for(const [k,max] of [['title',BANKLIM.title],['text',BANKLIM.text]]){
      if(typeof x[k]!=='string'||!x[k].trim())p.push(w+': '+k+' is not a text');
      else{
        if(x[k].length>max)p.push(w+': '+k+' is longer than '+max);
        for(const b of bankBadWords(x[k]))p.push(w+': '+k+' has a bad word: '+b);
      }
    }
    if(!Array.isArray(x.qs)||x.qs.length<3||x.qs.length>6)p.push(w+': qs needs 3 to 6 questions');
    else x.qs.forEach((it,j)=>{
      p.push(...bankItemProblems({lv:x.lv,...it},w+'.qs['+j+']'));
      if(it.form&&it.form!='choice'&&it.form!='wide')p.push(w+'.qs['+j+']: passage questions use choice or wide');
    });
  });
  return p;
}
