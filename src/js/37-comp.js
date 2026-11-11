/* ---------- comprehension framework (P2-25) ----------
   Two skills share the passage engine of 37-bank.js: comp (stories) and info (nonfiction). One grade is one set of 10 passages
   (5 fiction, 5 nonfiction) written in src/data/d-comp.js; CURRICULUM.md section 4 "E-comp" has the table.

   HOW A GRADE IS ADDED (P2-26 to P2-29): in d-comp.js, above the passages of the grade, set the grade's rules and add the passages:
       COMPSPEC[3]={words:[90,130],sent:12,maxSent:18,fk:5,need:['main','detail','cause','vocab','feel']};
       compAdd([{id:'g3f01', g:3, type:'f', title:'...', text:['Sentence one.', ...],
                 qs:[{t:'main', q:'...', a:'...', d:['...','...','...'], ev:[2,5]}, ...]}, ...]);
   then, outside the data file: SK.comp.max and SK.info.max in 38-skills.js, the two stops in the grade's world in 42-paths.js
   (CURRICULUM section 2.2), and the grade's check in tools/test.js calls compProblems(grade) (the P2-25 check loops over every
   grade that has passages, so a new grade is covered as soon as its COMPSPEC row exists). Nothing else changes: compAdd turns the
   passages into PASS.comp / PASS.info items, and the round, hints, review and boss fights already work for them.

   Skill levels: comp 3..7 = grades 2..6 (comp 1 and 2 are the old picture stories of 32-gen-read.js, unchanged); info 1..5 =
   grades 2..6. compLv(type, grade) does the mapping. Never reorder or insert passages in the middle of d-comp.js: saved review
   items remember a passage by its position in PASS (q.bk.bp), so new passages are always appended. Data may be read here only at
   run time.

   Passage data (CURRICULUM section 4): text is a list of sentences; each question has
     t    type: main detail sequence vocab infer (grade 2); cause feel feature summary theme structure compare pov evidence purpose
          figure claim (later grades), see COMPTYPES
     ev   0-based indexes of the sentences that answer it (tested: they exist, and the answer's words are in the passage)
   compAdd also makes the hint: for detail, sequence, vocab and infer it quotes the evidence sentences that fit in 140 characters
   ("Look back at the story"); keep the first evidence sentence short enough to fit.
   A round is COMPN passages in a row (compRound); the passage panel stays open above each question (bankCtx). */
const COMP=[];            // the passages exactly as authored (type 'f' or 'n')
const COMPSPEC={};        // grade -> {words:[min,max], sent: most words per sentence on average, maxSent, fk: most Flesch-Kincaid grade, need:[types]}
const COMPN=2;            // passages in one round
const COMPSK={f:'comp',n:'info'};
const compLv=(type,g)=>type=='f'?g+1:g-1;
const COMPTYPES={
  main:'main idea',detail:'detail',sequence:'sequence',vocab:'vocabulary in context',infer:'inference',cause:'cause and effect',
  feel:'character feeling',feature:'text feature',summary:'summary',theme:'theme',structure:'text structure',compare:'compare',
  pov:'point of view',evidence:'best evidence',purpose:'author purpose',figure:'figurative meaning',claim:'claim'
};
const COMPHINT={
  main:'Think about the whole story. What is it mostly about?',
  detail:'Find the part of the story that tells you.',
  sequence:'Think about the order. What came first, next, and last?',
  vocab:'Read the sentence around the word. Which meaning fits?',
  infer:'The story does not say it. Use the clues to figure it out.'
};

/* Turns authored passages into PASS items (and keeps them in COMP for the tests). Appends only. */
function compAdd(list){
  for(const p of list){
    COMP.push(p);
    const sk=COMPSK[p.type],pool=PASS[sk]||(PASS[sk]=[]);
    pool.push({
      lv:compLv(p.type,p.g),id:p.id,g:p.g,title:p.title,text:p.text.join(' '),sents:p.text,
      qs:p.qs.map((it,j)=>{
        const long=[it.a,...it.d].some(x=>x.length>16);
        let hint=COMPHINT[it.t]||'Read the story again. Which one fits best?';
        if(['detail','sequence','vocab','infer'].includes(it.t)){
          // quote as many of the evidence sentences as fit in a hint (at least the first)
          for(let k=it.ev.length;k>0;k--){
            const h='Look back at the story: "'+it.ev.slice(0,k).map(i=>p.text[i]).join(' ')+'"';
            if(h.length<=140){hint=h;break}
          }
        }
        return{q:it.q,a:it.a,d:it.d,form:long?'wide':'choice',topic:it.t,hint,t:it.t,ev:it.ev,label:p.title+' #'+(j+1)+' '+it.t};
      })
    });
  }
}

/* The dispatcher of the Story Time skill: levels 1-2 are the old picture stories, 3 and up are passages. */
const genCompLv=lv=>lv>2?genPassage('comp',lv):genComp(lv);
const compRoundLv=lv=>lv>2?compRound('comp',lv):null; // null = an ordinary round of generated questions

/* A round of COMPN passages (fewer when the level has fewer), all questions of each in order. Questions are stamped with sk, lv
   and seed like genQ does. A passage is picked like genPassage picks it: never-shown first when a round is live. */
function compRound(sk,lv){
  const ps=PASS[sk]||[],s0=bankSeed();
  let cands=ps.map((p,i)=>i).filter(i=>ps[i].lv==lv);
  if(!cands.length)throw new Error('passages '+sk+' has none at level '+lv);
  const out=[];
  for(let k=0;k<COMPN&&cands.length;k++){
    const bp=bankChoose('P:'+sk,cands,bankSub(s0,k));
    cands=cands.filter(i=>i!=bp);
    ps[bp].qs.forEach((_,qi)=>{
      const q=genPassage(sk,lv,{bp,qi,s:s0});
      q.sk=sk;q.lv=lv;q.seed=s0;
      out.push(q);
    });
  }
  return out;
}

/* ---------- validator (run by tools/test.js; reused by P2-26 to P2-29) ---------- */
const COMPSTOP=new Set('the and was were her his she they them then that this with from have had has for are not but all can out one you its our your who how what when why where which than into over under after before while each some very just also too'.split(' '));
const compContent=t=>bankWords(t).map(w=>w.toLowerCase()).filter(w=>w.length>=3&&!COMPSTOP.has(w));
function compSyl(w){
  w=w.toLowerCase().replace(/[^a-z]/g,'');
  if(w.length<=3)return 1;
  w=w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,'').replace(/^y/,'');
  const m=w.match(/[aeiouy]{1,2}/g);
  return m?m.length:1;
}
// Flesch-Kincaid grade of a list of sentences
function compFK(sents){
  const ws=sents.flatMap(bankWords);
  const syl=ws.reduce((a,w)=>a+compSyl(w),0);
  return .39*ws.length/sents.length+11.8*syl/ws.length-15.59;
}
// problems with the passages of one grade (a spec for the grade must exist in COMPSPEC)
function compProblems(g){
  const sp=COMPSPEC[g],ps=COMP.filter(p=>p.g==g),p=[];
  if(!sp)return['COMPSPEC['+g+'] is missing'];
  const ids=new Set();
  for(const t of ['f','n']){
    const n=ps.filter(x=>x.type==t).length;
    if(n!==5)p.push('grade '+g+' has '+n+' '+(t=='f'?'fiction':'nonfiction')+' passages, needs 5');
  }
  const longest=[]; // is the right answer the longest choice?
  for(const x of ps){
    const w=x.id+': ';
    if(ids.has(x.id))p.push(w+'id used twice');
    ids.add(x.id);
    if(!/^g\d[fn]\d\d$/.test(x.id)||x.id[1]!=g||x.id[2]!=x.type)p.push(w+'id must look like g'+g+(x.type||'f')+'01');
    if(!Array.isArray(x.text)||!x.text.length||x.text.some(s=>typeof s!=='string'||!s.trim())){p.push(w+'text must be a list of sentences');continue}
    const words=x.text.flatMap(bankWords),lens=x.text.map(s=>bankWords(s).length);
    if(words.length<sp.words[0]||words.length>sp.words[1])p.push(w+words.length+' words, needs '+sp.words.join(' to '));
    if(Math.max(...lens)>sp.maxSent)p.push(w+'a sentence has '+Math.max(...lens)+' words, most is '+sp.maxSent);
    if(words.length/x.text.length>sp.sent)p.push(w+'sentences average '+(words.length/x.text.length).toFixed(1)+' words, most is '+sp.sent);
    const fk=compFK(x.text);
    if(fk>sp.fk)p.push(w+'reading grade '+fk.toFixed(1)+', most is '+sp.fk);
    const body=new Set(words.map(v=>v.toLowerCase()));
    if(x.qs.length!==5)p.push(w+'needs 5 questions');
    const types=x.qs.map(q=>q.t);
    for(const need of sp.need)if(!types.includes(need))p.push(w+'no '+need+' question');
    x.qs.forEach((q,j)=>{
      const ww=w+'qs['+j+'] ';
      if(!COMPTYPES[q.t])p.push(ww+'unknown type '+q.t);
      if(!Array.isArray(q.ev)||!q.ev.length||q.ev.some(i=>!Number.isInteger(i)||i<0||i>=x.text.length)){p.push(ww+'ev must list sentence indexes that exist');return}
      const evw=new Set(q.ev.flatMap(i=>compContent(x.text[i])));
      if(q.t=='detail'||q.t=='sequence'){
        const miss=compContent(q.a).filter(v=>!body.has(v));
        if(miss.length)p.push(ww+'answer words not in the passage: '+miss.join(' '));
        if(!compContent(q.a).some(v=>evw.has(v)))p.push(ww+'no answer word is in the evidence sentences');
      }
      if(q.t=='detail')for(const d of q.d){
        const c=compContent(d);
        if(c.length&&c.every(v=>evw.has(v)))p.push(ww+'wrong choice "'+d+'" is also supported by the evidence');
      }
      if(q.t=='vocab'){
        const m=/"([^"]+)"/.exec(q.q);
        if(!m)p.push(ww+'vocab question must quote the word');
        else if(!q.ev.some(i=>x.text[i].toLowerCase().includes(m[1].toLowerCase())))p.push(ww+'quoted word "'+m[1]+'" is not in the evidence sentence');
      }
      longest.push([q.a,...q.d].every(v=>v===q.a||v.length<q.a.length));
    });
  }
  const share=longest.filter(Boolean).length/(longest.length||1);
  if(share>.5)p.push('the right answer is the longest choice in '+Math.round(share*100)+'% of the questions (most 50%)');
  // the PASS items hold exactly these passages, in order
  for(const sk of ['comp','info']){
    const items=(PASS[sk]||[]).filter(q=>q.g==g);
    const want=ps.filter(x=>COMPSK[x.type]==sk);
    if(items.length!==want.length)p.push('PASS.'+sk+' has '+items.length+' grade '+g+' passages, COMP has '+want.length);
    items.forEach((it,i)=>{
      const x=want[i];
      if(x&&(it.text!==x.text.join(' ')||it.lv!==compLv(x.type,g)))p.push('PASS.'+sk+' '+it.id+' does not match its source');
    });
  }
  return p;
}
