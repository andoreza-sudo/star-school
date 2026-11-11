/* ---------- Spanish ---------- */
// The words live in src/data/d-es.js (ES_UNITS, SPN). Read them only inside functions: the data file loads after this one.
const esFull=it=>it[3]?it[3]+' '+it[0]:it[0]; // 'la casa' for display and speech; the bare word is what level 3 asks you to spell
function picHTML(it,cap){const p=it[2];const h=p.startsWith('c:')?`<span class="swatch" style="--sw:${p.slice(2)}"></span>`:p.startsWith('n:')?`<span class="numpic">${p.slice(2)}</span>`:p.startsWith('k:')?`<span class="clkpic">${VIZ.clock(+p.split(':')[1],+p.split(':')[2],{nums:true})}</span>`:`<span>${picFor(it[4]||'',p)}</span>`;
  return cap?`<span class="pcap">${h}<small>${esc(it[1])}</small></span>`:h}
// P2-30: a unit from d-es.js becomes the skill es_<id> unless 38-skills.js already has it; spell:1 units go up to level 3
function esReg(u){const id='es_'+u.id;if(!SK[id])SK[id]={t:u.t,e:u.e,area:'es',max:u.spell?3:2,gen:lv=>genEs(u.id,lv)};else if(u.spell)SK[id].max=3}
const esSpellable=it=>/^[a-zñáéíóúü]{1,12}$/.test(it[0]);
function genEs(set,lv){const un=set=='mix'?null:ES_UNITS.find(u=>u.id==set),sn=set=='mix'?pick(ES_UNITS.filter(u=>u.mix).map(u=>u.id)):set,items=SPN[sn],pool=lv==1&&un&&un.l1?items.slice(0,un.l1):items,cap=sn=='greet'||!!(un&&un.cap);
  if(lv==3){const w=pick(items.filter(esSpellable)),a=w[3],f=esFull(w);
    return{kind:'spell',lang:'es',word:w[0],ans:w[0],auto:'must',after:f,afterLang:'es',say:w[5]||f,
      html:`<div class="emo">${picHTML(w,false)}</div><div class="sub">Spell it in Spanish: ${a?esc(a)+' … ':''}<b>${esc(w[1])}</b></div>`
        +`<div class="lslots">${[...w[0]].map((_,i)=>`<span class="ls" id="ls${i}"></span>`).join('')}</div>`,
      hint:{k:'say',lang:'es',w:w[0],s:`It has ${[...w[0]].length} letters and starts with “${w[0][0]}”.`},label:`${w[0]} (spell)`}}
  const it=pick(pool),f=esFull(it),sy=it[5]||f,opts=shuffle([it,...shuffle(pool.filter(x=>x!==it)).slice(0,2)]);
  if(lv==1)return{kind:'choice',cls:'pics',lang:'es',html:`<button class="btn hear" data-sayes="${esc(sy)}">🔊</button><div class="sub">Tap the picture for “${esc(f)}”</div>`,
    say:sy,auto:'must',ans:f,choices:opts.map(x=>({l:picHTML(x,cap),v:esFull(x),h:1})),after:f,afterLang:'es',
    hint:{k:'say',lang:'es',w:sy,s:`“${f}” means “${it[1]}”.`},label:`${f} (listen)`};
  return{kind:'choice',lang:'es',html:`<div class="emo">${picHTML(it,cap)}</div><div class="sub">How do you say it in Spanish?</div>`,ans:f,
    choices:opts.map(x=>({l:esFull(x),v:esFull(x)})),after:f,afterLang:'es',hint:{k:'text',s:`It starts with “${it[0][0].toUpperCase()}”.`},label:`${f} (read)`}}
/* ---------- P2-34 phrases and grammar (CURRICULUM S-gram): es_phrase, es_art, es_ser, es_gusta, es_sent ----------
   Data: ES_GRAM in src/data/d-es-gram.js (that file makes the five skills). Every question has one right answer:
   a phrase has one meaning; a noun has one article; a subject fixes the verb form; a noun is one or many; a sentence has one order
   (the first tile is capitalised and the last carries the dot). Hints teach the rule in English and never give the answer.
   What is read out never gives the answer away: a listening question says its Spanish (lang 'es', auto 'must': with no Spanish voice
   12-speech.js hides the button and the text on screen is enough); a question whose Spanish holds the answer says the English or the noun. */
const gSub=t=>`<div class="sub">${t}</div>`;
const gSay=sp=>({lang:'es',auto:'must',say:sp,after:sp,afterLang:'es'}); // reads the Spanish on show and after the answer
const gPlArt=a=>a=='el'?'los':a=='la'?'las':a;
const gEnPl=w=>({fish:'fish',tooth:'teeth',bus:'buses',dress:'dresses'}[w]||w+'s');
function genEsPhrase(lv){const G=ES_GRAM;
  if(lv==1){const it=pick(G.phrases),opts=shuffle([it,...shuffle(G.phrases.filter(x=>x!==it)).slice(0,2)]);
    return{kind:'choice',cls:'wide',...gSay(it[0]),html:`<div class="sent">${esc(it[0])}</div>${gSub('What does it mean?')}`,ans:it[1],
      choices:opts.map(x=>({l:x[1],v:x[1]})),hint:{k:'say',lang:'es',w:it[0],s:it[2]},label:`${it[0]} (meaning)`}}
  const qa=pick(G.qa),right=pick(qa.ok),types=shuffle([...new Set(G.qa.map(x=>x.t))].filter(t=>t!=qa.t&&!qa.no.includes(t))),
    wrong=types.slice(0,2).map(t=>pick(pick(G.qa.filter(x=>x.t==t)).ok));
  return{kind:'choice',cls:'wide',...gSay(qa.q),after:right,html:`<div class="sent">${esc(qa.q)}</div>${gSub('Which reply fits?')}`,ans:right,
    choices:shuffle([right,...wrong]).map(x=>({l:x,v:x})),hint:{k:'text',s:qa.h},label:`${qa.q} (reply)`}}
// article: -o words are el / un, -a words are la / una (level 1 and the "a" half of level 2); the plural half of level 2 is los / las + -s / -es
function genEsArt(lv){const N=ES_GRAM.nouns,regular=N.filter(n=>/[oa]$/.test(n[0]));
  if(lv==2&&R(0,1)){ // plurals: the right article for the gender AND the right ending
    const n=pick(N),art=gPlArt(n[3]),oth=art=='los'?'las':'los',right=`${art} ${n[4]}`,vowel=/[aeiou]$/.test(n[0]),
      bad=vowel?pick([n[0],n[0]+'es']):pick([n[0],n[0]+'s']),opts=shuffle([right,`${oth} ${n[4]}`,`${art} ${bad}`]);
    return{kind:'choice',cls:'wide',say:`More than one ${gEnPl(n[1])}!`,after:right,afterLang:'es',
      html:`<div class="emo">${picFor('',n[2])}${picFor('',n[2])}</div>${gSub(`More than one! How do you say “the ${esc(gEnPl(n[1]))}”?`)}`,
      ans:right,choices:opts.map(x=>({l:x,v:x})),
      hint:{k:'text',s:'Many things: change the ending (a vowel at the end takes -s, a consonant takes -es), and use the small word that goes with boy words or girl words.'},label:`${right} (plural)`}}
  const n=pick(regular),a=lv==2?(n[3]=='el'?'un':'una'):n[3],ch=lv==2?['un','una']:['el','la'],
    hint=(/o$/.test(n[0])?'This word ends in -o. Words that end in -o are usually “boy” words (masculine).':'This word ends in -a. Words that end in -a are usually “girl” words (feminine).')
      +(lv==2?' The word for “a” has a boy form and a girl form too.':'');
  return{kind:'choice',cls:'syms',lang:'es',auto:'must',say:n[0],after:a+' '+n[0],afterLang:'es',
    html:`<div class="emo">${picFor('',n[2])}</div><div class="sent">${SLOT} ${esc(n[0])}</div>${gSub(`“${lv==2?'a':'the'} ${esc(n[1])}”: which word goes in the blank?`)}`,
    ans:a,choices:ch.map(x=>({l:x,v:x})),hint:{k:'text',s:hint},label:`${a} ${n[0]}`}}
// ser (level 1), estar (2), tener (3): the subject fixes the form, so one answer fits. The English line says what the sentence means and is
// what "Hear it" reads (the Spanish sentence holds the answer); the Spanish sentence is said after the answer
const ES_FORMS=[null,{1:'soy',2:'eres',3:'es'},{1:'estoy',2:'estás',3:'está',6:'están'},{1:'tengo',2:'tienes',3:'tiene'}];
const ES_SER_HINT=[null,'Who is the sentence about? One form goes with “yo” (I), another with “tú” (you), and a third with he, she, it or a name.',
  'Match the person: I, you, he or she, or more than one. This verb is for how you feel and where you are.',
  'Spanish says “I have hunger” where English says “I am hungry”. Match the form to the person: I, you, or he or she.'];
function genEsSer(lv){const it=pick(ES_GRAM.ser[lv]),F=ES_FORMS[lv],a=F[it[1]],opts=shuffle([a,...shuffle(Object.values(F).filter(x=>x!=a)).slice(0,2)]),
  sp=`${it[0]} ${a} ${it[2]}.`;
  return{kind:'choice',cls:'wide',say:it[3],after:sp,afterLang:'es',html:`<div class="sent">${esc(it[0])} ${SLOT} ${esc(it[2])}.</div>${gSub(esc(it[3]))}`,
    ans:a,choices:opts.map(x=>({l:x,v:x})),hint:{k:'text',s:ES_SER_HINT[lv]},label:`${it[0]} ___ ${it[2]}`}}
// gusta: level 1 hear "Me gusta + one thing" or "No me gusta ...", tap the picture with the right face; level 2 gusta or gustan
const gFace=(f,p)=>`<span class="gcd"><i>${f}</i><b>${p}</b></span>`;
function genEsGusta(lv){const L=ES_GRAM.likes;
  if(lv==1){const sg=L.filter(x=>x[4]!='pl'),it=pick(sg),neg=R(0,1)==1,sp=(neg?'No me gusta ':'Me gusta ')+it[0]+' '+it[1]+'.',oth=pick(sg.filter(x=>x!==it)),
      face=neg?'😢':'😊',key=(x,f)=>x[1]+(f=='😊'?'+':'-'),opts=shuffle([[it,face],[it,face=='😊'?'😢':'😊'],[oth,face]]);
    return{kind:'choice',cls:'pics',...gSay(sp),html:`<div class="sent">${esc(sp)}</div>${gSub('Tap the picture that matches.')}`,ans:key(it,face),
      choices:opts.map(([x,f])=>({l:gFace(f,picFor('',x[3])),v:key(x,f),h:1})),
      hint:{k:'text',s:'Is there a “no” at the start of the sentence? Then the person does not like it. Check the face and the picture.'},label:`${sp} (picture)`}}
  const it=pick(L),pl=it[4]=='pl'||(it[4]!='sg'&&R(0,1)==1),neg=R(0,9)<3,np=pl?gPlArt(it[0])+' '+it[2]:it[0]+' '+it[1],a=pl?'gustan':'gusta',
    sp=`${neg?'No me':'Me'} ${a} ${np}.`;
  return{kind:'choice',cls:'wide',lang:'es',auto:'must',say:np,after:sp,afterLang:'es',
    html:`<div class="emo">${picFor('',it[3])}${pl?picFor('',it[3]):''}</div><div class="sent">${neg?'No me':'Me'} ${SLOT} ${esc(np)}.</div>${gSub('Which word fits?')}`,
    ans:a,choices:['gusta','gustan'].map(x=>({l:x,v:x})),hint:{k:'text',s:'Look at the thing in the sentence. Is it one thing or more than one? The verb has to match the number.'},label:`me ___ ${np}`}}
// sentence tiles: the first word is capitalised and the last has the dot, so the tiles have one right order
const ES_SENT_HINT=[null,'In Spanish a describing word, like a color or a size, comes after the thing it describes. The capital letter starts the sentence and the dot ends it.',
  'Start with the capital letter. Say who it is, then what they do, then where it happens. The dot ends the sentence.'];
function genEsSent(lv){const it=pick(ES_GRAM.sent[lv]),ws=it[0].split(' '),items=ws.map(w=>({v:w,l:w}));
  return{...sentOrder(items,ws,{html:`Put the words in order: “${esc(it[2])}”`,say:'Put the words in order: '+it[2]},{k:'text',s:ES_SENT_HINT[lv]},it[0]),after:it[0],afterLang:'es'}}
