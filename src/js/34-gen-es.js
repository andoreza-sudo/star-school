/* ---------- Spanish ---------- */
// The words live in src/data/d-es.js (ES_UNITS, SPN). Read them only inside functions: the data file loads after this one.
const esFull=it=>it[3]?it[3]+' '+it[0]:it[0]; // 'la casa' for display and speech; the bare word is what level 3 asks you to spell
function picHTML(it,cap){const p=it[2];const h=p.startsWith('c:')?`<span class="swatch" style="--sw:${p.slice(2)}"></span>`:p.startsWith('n:')?`<span class="numpic">${p.slice(2)}</span>`:`<span>${picFor(it[4]||'',p)}</span>`;
  return cap?`<span class="pcap">${h}<small>${esc(it[1])}</small></span>`:h}
// P2-30: a unit from d-es.js becomes the skill es_<id> unless 38-skills.js already has it; spell:1 units go up to level 3
function esReg(u){const id='es_'+u.id;if(!SK[id])SK[id]={t:u.t,e:u.e,area:'es',max:u.spell?3:2,gen:lv=>genEs(u.id,lv)};else if(u.spell)SK[id].max=3}
const esSpellable=it=>/^[a-zñáéíóúü]{1,12}$/.test(it[0]);
function genEs(set,lv){const un=set=='mix'?null:ES_UNITS.find(u=>u.id==set),sn=set=='mix'?pick(ES_UNITS.filter(u=>u.mix).map(u=>u.id)):set,items=SPN[sn],cap=sn=='greet'||!!(un&&un.cap);
  if(lv==3){const w=pick(items.filter(esSpellable)),a=w[3],f=esFull(w);
    return{kind:'spell',lang:'es',word:w[0],ans:w[0],auto:'must',after:f,afterLang:'es',say:w[5]||f,
      html:`<div class="emo">${picHTML(w,false)}</div><div class="sub">Spell it in Spanish: ${a?esc(a)+' … ':''}<b>${esc(w[1])}</b></div>`
        +`<div class="lslots">${[...w[0]].map((_,i)=>`<span class="ls" id="ls${i}"></span>`).join('')}</div>`,
      hint:{k:'say',lang:'es',w:w[0],s:`It has ${[...w[0]].length} letters and starts with “${w[0][0]}”.`},label:`${w[0]} (spell)`}}
  const it=pick(items),f=esFull(it),sy=it[5]||f,opts=shuffle([it,...shuffle(items.filter(x=>x!==it)).slice(0,2)]);
  if(lv==1)return{kind:'choice',cls:'pics',lang:'es',html:`<button class="btn hear" data-sayes="${esc(sy)}">🔊</button><div class="sub">Tap the picture for “${esc(f)}”</div>`,
    say:sy,auto:'must',ans:f,choices:opts.map(x=>({l:picHTML(x,cap),v:esFull(x),h:1})),after:f,afterLang:'es',
    hint:{k:'say',lang:'es',w:sy,s:`“${f}” means “${it[1]}”.`},label:`${f} (listen)`};
  return{kind:'choice',lang:'es',html:`<div class="emo">${picHTML(it,cap)}</div><div class="sub">How do you say it in Spanish?</div>`,ans:f,
    choices:opts.map(x=>({l:esFull(x),v:esFull(x)})),after:f,afterLang:'es',hint:{k:'text',s:`It starts with “${it[0][0].toUpperCase()}”.`},label:`${f} (read)`}}
