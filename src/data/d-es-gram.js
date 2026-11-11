/* ---------- Spanish phrases and first grammar (P2-34, CURRICULUM S-gram) ----------
   ES_GRAM feeds the generators in src/js/34-gen-es.js ("P2-34 phrases and grammar" block). Code reads it only inside functions.
   This file also makes the five skills es_phrase, es_art, es_ser, es_gusta and es_sent (its name sorts before d-es.js, which is fine:
   it needs only SK, which the code files have made by now). Latin American Spanish, NFC, every word is one the child met in a unit.
   phrases  [spanish, english, hint]            level 1 of es_phrase: hear the phrase, pick the English meaning. The hint never holds the meaning
   qa       {t, q, en, ok:[...], h, no:[...]}   level 2: the question (q) and the replies that fit it (ok). Wrong replies are drawn from the
                                                ok lists of OTHER types, never from a type listed in `no` (a reply that could also fit); h = hint
   nouns    [spanish, english, picture, article, plural]   article el | la; the plural is the bare plural word (-s after a vowel, -es after a
                                                consonant). Level 1 of es_art uses only the nouns ending in -o or -a. Every noun has one article
   ser      {1:[...],2:[...],3:[...]}           [subject, person, rest, english]; person 1 yo, 2 tú, 3 él/ella/a noun, 6 they. Level 1 ser, 2 estar,
                                                3 tener. A subject fixes the verb form, so only one form fits
   likes    [article, noun, plural, picture, only]  only 'pl' (grapes: only the plural exists) or 'sg' (milk) or 'an' (an animal: liked in the
                                                plural only, "Me gustan los cerdos"; "Me gusta el cerdo" means "I like pork", R-01s) or ''
   sent     {1:[...],2:[...]}                   [sentence, classes, english]; classes per word: A article, D "mi", B noun that can be the subject,
                                                S pronoun, V verb, J adjective, P preposition, L place noun. The first word is capitalised and the
                                                last carries the dot, so the tiles have one right order (tools/test.js checks every permutation). R-01s: the tiles
                                                show the words in lower case and the dot after the last slot; el / la agree with
                                                their noun, so the order is still one. Level 1 uses ser with traits (alta,
                                                inteligente), never with a feeling, which es_ser 2 teaches with estar */
const ES_GRAM={
 phrases:[
  ['¿Cómo te llamas?','What is your name?','Ask this to find out who a new friend is.'],
  ['Me llamo Sofía.','My name is Sofía.','You say this when you tell someone who you are.'],
  ['¿Cómo estás?','How are you?','A friendly question you ask to find out how a person feels today.'],
  ['Estoy bien.','I am fine.','A good answer when a friend asks about your day.'],
  ['¿Cuántos años tienes?','How old are you?','Listen for the word años. It is a question about birthdays.'],
  ['Tengo ocho años.','I am eight years old.','It tells how many birthdays you have had. Listen for the number.'],
  ['¿Dónde está el baño?','Where is the bathroom?','Dónde asks about a place. Listen for the last word: it is a room in a house.'],
  ['Mucho gusto.','Nice to meet you.','You say this when you shake hands with someone new.'],
  ['De nada.','You are welcome.','People say this right after someone says gracias.'],
  ['Lo siento.','I am sorry.','You say this when you bump into someone or make a mistake.'],
  ['Hasta luego.','See you later.','You say this when you leave, because you will see the person again.'],
  ['¿Qué es esto?','What is this?','Point at something you do not know and ask about it. Qué is the question word.'],
  ['No entiendo.','I do not understand.','You say this when someone talks too fast and you feel lost.']],
 qa:[
  {t:'name',q:'¿Cómo te llamas?',en:'What is your name?',ok:['Me llamo Ana.','Me llamo Luis.','Me llamo Sofía.','Me llamo Carlos.'],no:['meet'],
   h:'The question asks for a name. Which reply gives one?'},
  {t:'how',q:'¿Cómo estás?',en:'How are you?',ok:['Estoy bien.','Estoy muy bien, gracias.','Estoy feliz.','Estoy triste.'],no:[],
   h:'The question asks how someone feels. Which reply tells a feeling?'},
  {t:'age',q:'¿Cuántos años tienes?',en:'How old are you?',ok:['Tengo seis años.','Tengo siete años.','Tengo ocho años.','Tengo nueve años.','Tengo diez años.'],no:[],
   h:'The question asks for a number of birthdays. Which reply has a number?'},
  {t:'where',q:'¿Dónde está el gato?',en:'Where is the cat?',ok:['Está en la casa.','Está en la mesa.','Está en la cocina.','Está en el jardín.'],no:[],
   h:'The question asks about a place. Which reply tells a place?'},
  {t:'where',q:'¿Dónde está mi libro?',en:'Where is my book?',ok:['Está en la casa.','Está en la mesa.','Está en la cocina.','Está en el jardín.'],no:[],
   h:'The question asks about a place. Which reply tells a place?'},
  {t:'what',q:'¿Qué es esto?',en:'What is this?',ok:['Es un libro.','Es un gato.','Es una mesa.','Es un lápiz.'],no:[],
   h:'The question asks what a thing is. Which reply names a thing?'},
  {t:'thanks',q:'Gracias.',en:'Thank you.',ok:['De nada.'],no:['meet'],
   h:'Someone is being thankful. What do you say back to be polite?'},
  {t:'meet',q:'Mucho gusto.',en:'Nice to meet you.',ok:['Mucho gusto.','Igualmente.'],no:['bye','name'],
   h:'Two people are meeting for the first time. What does the other person say?'},
  {t:'bye',q:'Hasta luego.',en:'See you later.',ok:['Adiós.','Hasta luego.'],no:['meet'],
   h:'It is time to leave. What does the other person say back?'}],
 nouns:[
  ['perro','dog','🐶','el','perros'],['gato','cat','🐱','el','gatos'],['pato','duck','🦆','el','patos'],['oso','bear','🐻','el','osos'],
  ['conejo','rabbit','🐰','el','conejos'],['cerdo','pig','🐷','el','cerdos'],['caballo','horse','🐴','el','caballos'],
  ['pájaro','bird','🐦','el','pájaros'],['libro','book','📖','el','libros'],['vestido','dress','👗','el','vestidos'],
  ['sombrero','hat','🎩','el','sombreros'],['zapato','shoe','👟','el','zapatos'],['huevo','egg','🥚','el','huevos'],
  ['queso','cheese','🧀','el','quesos'],['helado','ice cream','🍦','el','helados'],['plátano','banana','🍌','el','plátanos'],
  ['barco','ship','🚢','el','barcos'],['carro','car','🚗','el','carros'],['abuelo','grandpa','👴','el','abuelos'],['hermano','brother','👦','el','hermanos'],
  ['casa','house','🏠','la','casas'],['mesa','table','🍽','la','mesas'],['silla','chair','🪑','la','sillas'],['cama','bed','🛏','la','camas'],
  ['puerta','door','🚪','la','puertas'],['ventana','window','🪟','la','ventanas'],['manzana','apple','🍎','la','manzanas'],
  ['galleta','cookie','🍪','la','galletas'],['rana','frog','🐸','la','ranas'],['vaca','cow','🐄','la','vacas'],['mochila','backpack','🎒','la','mochilas'],
  ['camisa','shirt','👕','la','camisas'],['chamarra','jacket','🧥','la','chamarras'],['bicicleta','bicycle','🚲','la','bicicletas'],
  ['escuela','school','🏫','la','escuelas'],['tienda','store','🏪','la','tiendas'],['playa','beach','🏖','la','playas'],
  ['abuela','grandma','👵','la','abuelas'],['hermana','sister','👧','la','hermanas'],['oreja','ear','👂','la','orejas'],['pierna','leg','🦵','la','piernas'],
  ['papel','paper','📄','el','papeles'],['lápiz','pencil','✏','el','lápices'],['goma','eraser','🧽','la','gomas'],['tren','train','🚂','el','trenes'],
  ['avión','airplane','✈','el','aviones'],['camión','truck','🚚','el','camiones'],['autobús','bus','🚌','el','autobuses'],
  ['jardín','garden','🌻','el','jardines'],['hospital','hospital','🏥','el','hospitales'],['león','lion','🦁','el','leones'],
  ['pez','fish','🐟','el','peces'],['nariz','nose','👃','la','narices'],['diente','tooth','🦷','el','dientes'],['cohete','rocket','🚀','el','cohetes']],
 ser:{
  1:[['Yo',1,'Lucía','I am Lucía.'],['Tú',2,'Mateo','You are Mateo.'],['Ella',3,'Sofía','She is Sofía.'],['Él',3,'Pablo','He is Pablo.'],
     ['Yo',1,'de México','I am from Mexico.'],['Tú',2,'de Colombia','You are from Colombia.'],['Ella',3,'de Perú','She is from Peru.'],
     ['Él',3,'de Chile','He is from Chile.'],['Yo',1,'estudiante','I am a student.'],['Tú',2,'muy amable','You are very kind.'],
     ['Yo',1,'muy inteligente','I am very smart.'],['Mi perro',3,'grande','My dog is big.'],['Mi mamá',3,'doctora','My mom is a doctor.'],
     ['Mi papá',3,'alto','My dad is tall.'],['Mi hermana',3,'muy simpática','My sister is very nice.'],['La casa',3,'blanca','The house is white.'],
     ['El gato',3,'negro','The cat is black.'],['Tú',2,'de Texas','You are from Texas.']],
  2:[['Yo',1,'feliz','I am happy.'],['Tú',2,'triste','You are sad.'],['Ella',3,'enojada','She is angry.'],['Él',3,'cansado','He is tired.'],
     ['Yo',1,'bien','I am fine.'],['Tú',2,'bien','You are fine.'],['Mi mamá',3,'tranquila','My mom is calm.'],['Yo',1,'en la escuela','I am at school.'],
     ['Tú',2,'en el parque','You are at the park.'],['Ella',3,'en la cocina','She is in the kitchen.'],['Él',3,'en la playa','He is at the beach.'],
     ['El gato',3,'en la cama','The cat is on the bed.'],['Mi libro',3,'en la mochila','My book is in the backpack.'],
     ['Los niños',6,'felices','The children are happy.'],['Mis amigos',6,'en el parque','My friends are at the park.'],
     ['Las niñas',6,'en la escuela','The girls are at school.'],['Mis hermanas',6,'tristes','My sisters are sad.']],
  3:[['Yo',1,'hambre','I am hungry.'],['Yo',1,'sed','I am thirsty.'],['Tú',2,'frío','You are cold.'],['Tú',2,'calor','You are hot.'],
     ['Ella',3,'hambre','She is hungry.'],['Él',3,'sed','He is thirsty.'],['Mi mamá',3,'frío','My mom is cold.'],['Mi perro',3,'calor','My dog is hot.'],
     ['Yo',1,'ocho años','I am eight years old.'],['Tú',2,'nueve años','You are nine years old.'],['Mi hermano',3,'cinco años','My brother is five years old.'],
     ['Mi abuela',3,'setenta años','My grandma is seventy years old.'],['Ana',3,'siete años','Ana is seven years old.'],['Él',3,'diez años','He is ten years old.']]},
 likes:[
  ['la','manzana','manzanas','🍎',''],['el','plátano','plátanos','🍌',''],['la','galleta','galletas','🍪',''],['el','helado','helados','🍦',''],
  ['el','queso','quesos','🧀',''],['el','huevo','huevos','🥚',''],['el','pan','panes','🍞',''],['la','leche','','🥛','sg'],
  ['el','perro','perros','🐶','an'],['el','gato','gatos','🐱','an'],['el','pájaro','pájaros','🐦','an'],['el','pez','peces','🐟','an'],
  ['la','vaca','vacas','🐄','an'],['el','caballo','caballos','🐴','an'],['el','cerdo','cerdos','🐷','an'],['el','pato','patos','🦆','an'],
  ['el','oso','osos','🐻','an'],['el','conejo','conejos','🐰','an'],['el','león','leones','🦁','an'],['la','rana','ranas','🐸','an'],
  ['las','uvas','uvas','🍇','pl']],
 sent:{
  1:[['El gato es negro.','A B V J','The cat is black.'],['La casa es blanca.','A B V J','The house is white.'],['El perro es grande.','A B V J','The dog is big.'],
     ['La mesa es pequeña.','A B V J','The table is small.'],['Los zapatos son rojos.','A B V J','The shoes are red.'],['Las botas son negras.','A B V J','The boots are black.'],
     ['La camisa es azul.','A B V J','The shirt is blue.'],['El libro es nuevo.','A B V J','The book is new.'],['Mi mamá es alta.','D B V J','My mom is tall.'],
     ['Mi perro es rápido.','D B V J','My dog is fast.'],['Ella es alta.','S V J','She is tall.'],['Yo soy inteligente.','S V J','I am smart.'],
     ['Tú eres amable.','S V J','You are kind.'],['La rana es verde.','A B V J','The frog is green.'],['La bicicleta es roja.','A B V J','The bike is red.'],
     ['El sombrero es amarillo.','A B V J','The hat is yellow.'],['La silla es vieja.','A B V J','The chair is old.'],['El conejo es pequeño.','A B V J','The rabbit is small.'],
     ['El carro es nuevo.','A B V J','The car is new.'],['La leche es blanca.','A B V J','The milk is white.']],
  2:[['Yo como en la cocina.','S V P A L','I eat in the kitchen.'],['Yo duermo en mi cama.','S V P D L','I sleep in my bed.'],
     ['Mi papá lee en la sala.','D B V P A L','My dad reads in the living room.'],['El gato duerme en la cama.','A B V P A L','The cat sleeps on the bed.'],
     ['Ana juega en el parque.','B V P A L','Ana plays in the park.'],['Los niños juegan en el parque.','A B V P A L','The children play in the park.'],
     ['Yo leo en la escuela.','S V P A L','I read at school.'],['El perro corre en el jardín.','A B V P A L','The dog runs in the garden.'],
     ['Ella nada en la playa.','S V P A L','She swims at the beach.'],['Mi hermano come en la cocina.','D B V P A L','My brother eats in the kitchen.'],
     ['Yo juego en el parque.','S V P A L','I play in the park.'],['Nosotros caminamos en la calle.','S V P A L','We walk in the street.'],
     ['Mi mamá baila en la sala.','D B V P A L','My mom dances in the living room.'],['La maestra lee en la clase.','A B V P A L','The teacher reads in class.'],
     ['Los pájaros cantan en el jardín.','A B V P A L','The birds sing in the garden.'],['Yo nado en la playa.','S V P A L','I swim at the beach.'],
     ['Mi abuela duerme en la cama.','D B V P A L','My grandma sleeps in the bed.'],['Él salta en el jardín.','S V P A L','He jumps in the garden.']]}
};
// the five skills (the units are made by esReg in d-es.js)
Object.assign(SK,{
 es_phrase:{t:'Phrases',e:'🎤',area:'es',max:2,gen:lv=>genEsPhrase(lv)},
 es_art:{t:'El, La, Un, Una',e:'🔤',area:'es',max:2,gen:lv=>genEsArt(lv)},
 es_ser:{t:'Ser, Estar, Tener',e:'🧩',area:'es',max:3,gen:lv=>genEsSer(lv)},
 es_gusta:{t:'Me Gusta',e:'😊',area:'es',max:2,gen:lv=>genEsGusta(lv)},
 es_sent:{t:'Spanish Sentences',e:'🧱',area:'es',max:2,gen:lv=>genEsSent(lv)}});
