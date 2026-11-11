/* ---------- Spanish unit data (P2-30, CURRICULUM S-frame) ----------
   ES_UNITS is the one place Spanish vocabulary lives. A unit is
     {id, t, e, theme, items:[...], cap?, spell?, mix?}
   id     skill id without the prefix: unit 'house' is skill 'es_house' (esReg makes the skill when 38-skills.js has none)
   t, e   skill title and emoji;  theme  what the words have in common (for authors and tests)
   cap    1: show the English under each picture (words whose picture alone is not enough, like greetings)
   spell  1: the unit has level 3 (hear it, spell it); the skill gets max 3; its words must be single a-z/ñáéíóúü words of 12 letters or fewer
   mix    1: the unit is drawn into the es_mix "Big Review" (the first 8 units are; later units are not unless a chunk says so)
   An item is [spanish, english, picture, article, art, say]
   spanish  the bare word, NFC, lowercase (la casa -> 'casa'); level 3 asks for exactly this
   english  the gloss
   picture  emoji from tools/emoji-allow.txt, or 'c:#rrggbb' (colour swatch), or 'n:12' (numeral)
   article  'el' | 'la' | 'los' | 'las' | '' ; shown in front of the word in levels 1 and 2 ('la casa'), and as a clue in level 3
   art      optional art name for picFor(art, picture): the drawing when ART has it, else the emoji
   say      optional text to speak when it differs from the shown word
   Code reads ES_UNITS and SPN only inside functions. The level 3 stop is added to the world by id (CURRICULUM 2.3). */
const ES_UNITS=[
 {id:'greet',t:'Hello & Thank You',e:'👋',theme:'Hello and thank you',mix:1,cap:1,items:[
  ['hola','Hello','👋',''],
  ['adiós','Goodbye','🚶',''],
  ['gracias','Thank you','🙏',''],
  ['por favor','Please','🥺',''],
  ['buenos días','Good morning','🌅',''],
  ['buenas noches','Good night','🌙',''],
  ['sí','Yes','👍',''],
  ['no','No','👎','']]},
 {id:'color',t:'Colors',e:'🎨',theme:'Colors',mix:1,items:[
  ['rojo','red','c:#ef4444',''],
  ['azul','blue','c:#3b82f6',''],
  ['verde','green','c:#22c55e',''],
  ['amarillo','yellow','c:#facc15',''],
  ['naranja','orange','c:#f97316',''],
  ['morado','purple','c:#a855f7',''],
  ['rosa','pink','c:#f9a8d4',''],
  ['negro','black','c:#1c1917',''],
  ['blanco','white','c:#ffffff',''],
  ['café','brown','c:#92400e','']]},
 {id:'num',t:'Numbers 1–10',e:'🔟',theme:'Numbers 1 to 10',mix:1,items:[
  ['uno','one','n:1',''],
  ['dos','two','n:2',''],
  ['tres','three','n:3',''],
  ['cuatro','four','n:4',''],
  ['cinco','five','n:5',''],
  ['seis','six','n:6',''],
  ['siete','seven','n:7',''],
  ['ocho','eight','n:8',''],
  ['nueve','nine','n:9',''],
  ['diez','ten','n:10','']]},
 {id:'teen',t:'Numbers 11–20',e:'2️⃣',theme:'Numbers 11 to 20',mix:1,items:[
  ['once','eleven','n:11',''],
  ['doce','twelve','n:12',''],
  ['trece','thirteen','n:13',''],
  ['catorce','fourteen','n:14',''],
  ['quince','fifteen','n:15',''],
  ['dieciséis','sixteen','n:16',''],
  ['diecisiete','seventeen','n:17',''],
  ['dieciocho','eighteen','n:18',''],
  ['diecinueve','nineteen','n:19',''],
  ['veinte','twenty','n:20','']]},
 {id:'animal',t:'Animals',e:'🐶',theme:'Animals',mix:1,items:[
  ['perro','dog','🐶',''],
  ['gato','cat','🐱',''],
  ['pájaro','bird','🐦',''],
  ['pez','fish','🐟',''],
  ['vaca','cow','🐄',''],
  ['caballo','horse','🐴',''],
  ['cerdo','pig','🐷',''],
  ['pato','duck','🦆',''],
  ['oso','bear','🐻',''],
  ['conejo','rabbit','🐰',''],
  ['león','lion','🦁',''],
  ['rana','frog','🐸','']]},
 {id:'food',t:'Food',e:'🍎',theme:'Food',mix:1,items:[
  ['manzana','apple','🍎',''],
  ['plátano','banana','🍌',''],
  ['leche','milk','🥛',''],
  ['pan','bread','🍞',''],
  ['agua','water','💧',''],
  ['queso','cheese','🧀',''],
  ['huevo','egg','🥚',''],
  ['helado','ice cream','🍦',''],
  ['galleta','cookie','🍪',''],
  ['uvas','grapes','🍇','']]},
 {id:'body',t:'My Body',e:'👃',theme:'The body',mix:1,items:[
  ['ojos','eyes','👀',''],
  ['nariz','nose','👃',''],
  ['boca','mouth','👄',''],
  ['oreja','ear','👂',''],
  ['mano','hand','✋',''],
  ['pie','foot','🦶',''],
  ['pierna','leg','🦵',''],
  ['diente','tooth','🦷','']]},
 {id:'family',t:'Family',e:'👪',theme:'Family',mix:1,items:[
  ['mamá','mom','👩',''],
  ['papá','dad','👨',''],
  ['hermano','brother','👦',''],
  ['hermana','sister','👧',''],
  ['abuela','grandma','👵',''],
  ['abuelo','grandpa','👴',''],
  ['bebé','baby','👶','']]},
];
const SPN={};ES_UNITS.forEach(u=>{SPN[u.id]=u.items}); // old name: unit id -> items (balloons, speed race, learn screen)
ES_UNITS.forEach(esReg);
