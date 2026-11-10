/* ---------- Spanish ---------- */
const SPN={
 greet:[['hola','Hello','👋'],['adiós','Goodbye','🚶'],['gracias','Thank you','🙏'],['por favor','Please','🥺'],['buenos días','Good morning','🌅'],['buenas noches','Good night','🌙'],['sí','Yes','👍'],['no','No','👎']],
 color:[['rojo','red','c:#ef4444'],['azul','blue','c:#3b82f6'],['verde','green','c:#22c55e'],['amarillo','yellow','c:#facc15'],['naranja','orange','c:#f97316'],['morado','purple','c:#a855f7'],['rosa','pink','c:#f9a8d4'],['negro','black','c:#1c1917'],['blanco','white','c:#ffffff'],['café','brown','c:#92400e']],
 num:[['uno','one','n:1'],['dos','two','n:2'],['tres','three','n:3'],['cuatro','four','n:4'],['cinco','five','n:5'],['seis','six','n:6'],['siete','seven','n:7'],['ocho','eight','n:8'],['nueve','nine','n:9'],['diez','ten','n:10']],
 teen:[['once','eleven','n:11'],['doce','twelve','n:12'],['trece','thirteen','n:13'],['catorce','fourteen','n:14'],['quince','fifteen','n:15'],['dieciséis','sixteen','n:16'],['diecisiete','seventeen','n:17'],['dieciocho','eighteen','n:18'],['diecinueve','nineteen','n:19'],['veinte','twenty','n:20']],
 animal:[['perro','dog','🐶'],['gato','cat','🐱'],['pájaro','bird','🐦'],['pez','fish','🐟'],['vaca','cow','🐄'],['caballo','horse','🐴'],['cerdo','pig','🐷'],['pato','duck','🦆'],['oso','bear','🐻'],['conejo','rabbit','🐰'],['león','lion','🦁'],['rana','frog','🐸']],
 food:[['manzana','apple','🍎'],['plátano','banana','🍌'],['leche','milk','🥛'],['pan','bread','🍞'],['agua','water','💧'],['queso','cheese','🧀'],['huevo','egg','🥚'],['helado','ice cream','🍦'],['galleta','cookie','🍪'],['uvas','grapes','🍇']],
 body:[['ojos','eyes','👀'],['nariz','nose','👃'],['boca','mouth','👄'],['oreja','ear','👂'],['mano','hand','✋'],['pie','foot','🦶'],['pierna','leg','🦵'],['diente','tooth','🦷']],
 family:[['mamá','mom','👩'],['papá','dad','👨'],['hermano','brother','👦'],['hermana','sister','👧'],['abuela','grandma','👵'],['abuelo','grandpa','👴'],['bebé','baby','👶']]};
function picHTML(it,cap){const p=it[2];const h=p.startsWith('c:')?`<span class="swatch" style="--sw:${p.slice(2)}"></span>`:p.startsWith('n:')?`<span class="numpic">${p.slice(2)}</span>`:`<span>${p}</span>`;
  return cap?`<span class="pcap">${h}<small>${esc(it[1])}</small></span>`:h}
function genEs(set,lv){const sn=set=='mix'?pick(Object.keys(SPN)):set,items=SPN[sn],it=pick(items),cap=sn=='greet';
  const opts=shuffle([it,...shuffle(items.filter(x=>x!==it)).slice(0,2)]);
  if(lv==1)return{kind:'choice',cls:'pics',lang:'es',html:`<button class="btn hear" data-sayes="${esc(it[0])}">🔊</button><div class="sub">Tap the picture for “${esc(it[0])}”</div>`,
    say:it[0],auto:'must',ans:it[0],choices:opts.map(x=>({l:picHTML(x,cap),v:x[0],h:1})),after:it[0],afterLang:'es',
    hint:{k:'say',lang:'es',w:it[0],s:`“${it[0]}” means “${it[1]}”.`},label:`${it[0]} (listen)`};
  return{kind:'choice',lang:'es',html:`<div class="emo">${picHTML(it,cap)}</div><div class="sub">How do you say it in Spanish?</div>`,ans:it[0],
    choices:opts.map(x=>({l:x[0],v:x[0]})),after:it[0],afterLang:'es',hint:{k:'text',s:`It starts with “${it[0][0].toUpperCase()}”.`},label:`${it[0]} (read)`}}

