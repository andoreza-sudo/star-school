/* ---------- Spanish mini dialogues (P2-35, CURRICULUM S-story) ----------
   ES_STORY feeds the generators in src/js/34-gen-es.js ("P2-35 mini dialogues" block) and makes the skill es_story (3 levels).
   Code reads it only inside functions. Latin American Spanish, NFC, built from words the child met in the Spanish worlds; the few
   words that are new are listed in `newWords` (tools/test.js checks every word of every line and question against the units, ES_GRAM
   and that list).
   people   name -> picture, for the "who" answers (the name is always shown under the picture too)
   dialogues  [{id, title, lines:[[speaker, text], ...], qs:[...]}]   title: a short English scene name for the panel header
   A question {t, line, en, es, k, a, d}
     t     who | what | where | how | reply
     line  0-based index of the line that holds the answer
     en    the question for level 1 (English);  es  the question for levels 2 and 3 (Spanish; no English next to it)
     a, d  the right answer and 3 to 5 wrong ones, each [spanish, english, picture, key?]. Picture: an emoji from tools/emoji-allow.txt,
           'n:8' (numeral) or 'c:#rrggbb' (colour swatch). Level 1 shows the English, level 2 the picture, level 3 the Spanish.
           key (default: the Spanish with punctuation and the small words en/un/una/el/la/los/las taken off; ' y ' splits it in two)
           is what must appear in the referenced line for the right answer, and in NO line of that kind for a wrong one
     who:  `k` is the exact phrase quoted in the question; `a` is the name of the speaker of `line`, and the other names are not
   Every question has one right answer, found in the line it points to. Hints are made in code and point at the line. */
const ES_STORY={
 newWords:['dice','quién','quiero','quieres','quiere','aquí','también','con','tu','para','tiempo','color','animal','animales','al','final','mascota'],
 people:{'Ana':'👧','Sofía':'👧','Lucía':'👧','Luis':'👦','Carlos':'👦','Mateo':'👦','Pablo':'👦','Mamá':'👩','Papá':'👨','Abuela':'👵','Abuelo':'👴','La maestra':'👩'},
 dialogues:[
  {id:'hola',title:'Hello, new friend',lines:[
    ['Ana','Hola. ¿Cómo te llamas?'],['Luis','Me llamo Luis. ¿Y tú?'],['Ana','Me llamo Ana. Mucho gusto.'],
    ['Luis','Igualmente. ¿Cómo estás?'],['Ana','Estoy bien, gracias.']],
   qs:[
    {t:'who',line:0,k:'¿Cómo te llamas?',en:'Who says: “¿Cómo te llamas?”',es:'¿Quién dice “¿Cómo te llamas?”?',a:['Ana'],d:['Luis','Sofía','Mateo']},
    {t:'reply',line:3,en:'Ana says it is nice to meet him. What does Luis answer?',es:'Ana dice “Mucho gusto”. ¿Qué dice Luis?',
     a:['Igualmente.','Same to you.','🙂'],d:[['De nada.','You are welcome.','🙏'],['Adiós.','Goodbye.','🚶'],['Lo siento.','I am sorry.','😢'],['Por favor.','Please.','🥺']]},
    {t:'how',line:4,en:'How is Ana?',es:'¿Cómo está Ana?',a:['bien','fine','🙂'],
     d:[['triste','sad','😢'],['enojada','angry','😠'],['asustada','scared','😨'],['cansada','tired','😴']]}]},
  {id:'manana',title:'Good morning',lines:[
    ['La maestra','Buenos días, Sofía.'],['Sofía','Buenos días, maestra.'],['La maestra','¿Cómo estás hoy?'],['Sofía','Estoy feliz. Hoy hace sol.']],
   qs:[
    {t:'how',line:3,en:'How is Sofía today?',es:'¿Cómo está Sofía hoy?',a:['feliz','happy','😊'],
     d:[['triste','sad','😢'],['enojada','angry','😠'],['asustada','scared','😨'],['cansada','tired','😴']]},
    {t:'what',line:3,en:'What is the weather today?',es:'¿Qué tiempo hace hoy?',a:['Hace sol.','It is sunny.','☀'],
     d:[['Llueve.','It is raining.','☔'],['Nieva.','It is snowing.','❄'],['Hace viento.','It is windy.','💨'],['Está nublado.','It is cloudy.','☁']]},
    {t:'who',line:2,k:'¿Cómo estás hoy?',en:'Who says: “¿Cómo estás hoy?”',es:'¿Quién dice “¿Cómo estás hoy?”?',a:['La maestra'],d:['Sofía','Ana','Carlos']}]},
  {id:'mercado',title:'At the market',lines:[
    ['Mamá','¡Qué grande es el mercado! ¿Qué quieres, Luis?'],['Luis','Quiero manzanas y queso, por favor.'],
    ['Mamá','Aquí están. ¿Quieres un helado?'],['Luis','Sí, gracias, mamá.']],
   qs:[
    {t:'where',line:0,en:'Where are Mamá and Luis?',es:'¿Dónde están Luis y mamá?',a:['en el mercado','at the market','🥕','mercado'],
     d:[['en la escuela','at school','🏫'],['en el parque','at the park','🌳'],['en la playa','at the beach','🏖'],['en la tienda','at the store','🏪']]},
    {t:'what',line:1,en:'What does Luis want?',es:'¿Qué quiere Luis?',a:['manzanas y queso','apples and cheese','🍎🧀'],
     d:[['galletas y leche','cookies and milk','🍪🥛'],['pan y huevos','bread and eggs','🍞🥚'],['plátanos y uvas','bananas and grapes','🍌🍇']]},
    {t:'reply',line:3,en:'Mamá asks if he wants some ice cream. What does Luis say?',es:'Mamá dice “¿Quieres un helado?”. ¿Qué dice Luis?',
     a:['Sí, gracias.','Yes, thank you.','👍'],d:[['No, gracias.','No, thank you.','👎'],['De nada.','You are welcome.','🙏'],['Adiós.','Goodbye.','🚶'],['Lo siento.','I am sorry.','😢']]}]},
  {id:'lapiz',title:'The lost pencil',lines:[
    ['Carlos','¿Dónde está mi lápiz?'],['Lucía','¿Está en la mesa?'],['Carlos','No, aquí no está.'],
    ['Lucía','¡Aquí está! Está en tu mochila.'],['Carlos','¡Gracias, Lucía!']],
   qs:[
    {t:'where',line:3,en:'Where is the pencil?',es:'¿Dónde está el lápiz?',a:['en la mochila','in the backpack','🎒','mochila'],
     d:[['en la mesa','on the table','🍽'],['en la silla','on the chair','🪑'],['en la cama','on the bed','🛏'],['en la puerta','at the door','🚪']]},
    {t:'who',line:1,k:'¿Está en la mesa?',en:'Who says: “¿Está en la mesa?”',es:'¿Quién dice “¿Está en la mesa?”?',a:['Lucía'],d:['Carlos','Mateo','Sofía']},
    {t:'reply',line:4,en:'What does Carlos say at the end?',es:'¿Qué dice Carlos al final?',a:['Gracias.','Thank you.','🙏'],
     d:[['Adiós.','Goodbye.','🚶'],['Lo siento.','I am sorry.','😢'],['No entiendo.','I do not understand.','❓'],['Hola.','Hello.','👋']]}]},
  {id:'parque',title:'A phone call from the park',lines:[
    ['Mateo','¡Hola, Pablo! ¿Dónde estás?'],['Pablo','Estoy en el parque con mi perro.'],['Mateo','¿Es grande tu perro?'],
    ['Pablo','No, es pequeño. Corre mucho.'],['Mateo','¡Yo también quiero jugar!']],
   qs:[
    {t:'where',line:1,en:'Where is Pablo?',es:'¿Dónde está Pablo?',a:['en el parque','at the park','🌳','parque'],
     d:[['en la casa','at home','🏠'],['en la escuela','at school','🏫'],['en la playa','at the beach','🏖'],['en la biblioteca','at the library','📚']]},
    {t:'how',line:3,en:'What is Pablo’s dog like?',es:'¿Cómo es el perro de Pablo?',a:['pequeño','small','🐜'],
     d:[['grande','big','🐘'],['lento','slow','🐢'],['viejo','old','👴'],['sucio','dirty','🗑']]},
    {t:'who',line:4,k:'quiero jugar',en:'Who says: “Yo también quiero jugar”',es:'¿Quién dice “Yo también quiero jugar”?',a:['Mateo'],d:['Pablo','Luis','Ana']}]},
  {id:'abuela',title:'At grandma’s house',lines:[
    ['Abuela','Hola, Ana. ¿Cómo estás?'],['Ana','Hola, abuela. Estoy cansada. Tengo sed.'],['Abuela','Aquí tienes agua. ¿Tienes hambre?'],
    ['Ana','Sí. Quiero pan y queso, por favor.']],
   qs:[
    {t:'how',line:1,en:'How is Ana?',es:'¿Cómo está Ana?',a:['cansada','tired','😴'],
     d:[['feliz','happy','😊'],['triste','sad','😢'],['enojada','angry','😠'],['asustada','scared','😨']]},
    {t:'what',line:3,en:'What does Ana want to eat?',es:'¿Qué quiere comer Ana?',a:['pan y queso','bread and cheese','🍞🧀'],
     d:[['galletas y leche','cookies and milk','🍪🥛'],['manzanas y uvas','apples and grapes','🍎🍇'],['huevos y plátanos','eggs and bananas','🥚🍌']]},
    {t:'who',line:2,k:'¿Tienes hambre?',en:'Who says: “¿Tienes hambre?”',es:'¿Quién dice “¿Tienes hambre?”?',a:['Abuela'],d:['Ana','Mamá','Papá']}]},
  {id:'mascotas',title:'Pets',lines:[
    ['Lucía','¿Tienes una mascota, Pablo?'],['Pablo','Sí, tengo un perro. Me gusta mucho.'],
    ['Lucía','Yo tengo un gato. Es negro y muy bonito.'],['Pablo','¡Me gustan los gatos!']],
   qs:[
    {t:'what',line:1,en:'What pet does Pablo have?',es:'¿Qué animal tiene Pablo?',a:['un perro','a dog','🐶','perro'],
     d:[['un gato','a cat','🐱'],['un pez','a fish','🐟'],['un pájaro','a bird','🐦'],['un conejo','a rabbit','🐰']]},
    {t:'what',line:2,en:'What color is Lucía’s cat?',es:'¿De qué color es el gato de Lucía?',a:['negro','black','c:#1c1917'],
     d:[['blanco','white','c:#ffffff'],['rojo','red','c:#ef4444'],['azul','blue','c:#3b82f6'],['verde','green','c:#22c55e']]},
    {t:'who',line:3,k:'Me gustan los gatos',en:'Who says: “Me gustan los gatos”',es:'¿Quién dice “Me gustan los gatos”?',a:['Pablo'],d:['Lucía','Ana','Mateo']}]},
  {id:'playa',title:'A hot day at the beach',lines:[
    ['Mateo','¡Qué calor! Estoy en la playa.'],['Ana','Yo también. Quiero nadar.'],['Mateo','Yo quiero helado. Tengo calor.'],
    ['Ana','¡Sí! Me gusta el helado.']],
   qs:[
    {t:'where',line:0,en:'Where is Mateo?',es:'¿Dónde está Mateo?',a:['en la playa','at the beach','🏖','playa'],
     d:[['en el parque','at the park','🌳'],['en la escuela','at school','🏫'],['en la tienda','at the store','🏪'],['en la casa','at home','🏠']]},
    {t:'what',line:1,en:'What does Ana want to do?',es:'¿Qué quiere Ana?',a:['nadar','to swim','🏊'],
     d:[['correr','to run','🏃'],['dormir','to sleep','🛌'],['bailar','to dance','💃'],['leer','to read','📖']]},
    {t:'how',line:2,en:'How does Mateo feel?',es:'¿Cómo está Mateo?',a:['Tiene calor.','He is hot.','🥵','tengo calor'],
     d:[['Tiene frío.','He is cold.','🥶','tengo frío'],['Tiene sed.','He is thirsty.','💧','tengo sed'],['Tiene hambre.','He is hungry.','🍕','tengo hambre']]}]},
  {id:'escuela',title:'Off to school',lines:[
    ['Papá','Son las ocho. ¿Tienes tu mochila?'],['Luis','Sí, papá. Mi mochila está aquí.'],
    ['Papá','¡Muy bien! El autobús está en la calle.'],['Luis','¡Adiós, papá! Hasta luego.']],
   qs:[
    {t:'who',line:0,k:'¿Tienes tu mochila?',en:'Who says: “¿Tienes tu mochila?”',es:'¿Quién dice “¿Tienes tu mochila?”?',a:['Papá'],d:['Luis','Mamá','La maestra']},
    {t:'where',line:2,en:'Where is the bus?',es:'¿Dónde está el autobús?',a:['en la calle','in the street','🛣','calle'],
     d:[['en el parque','at the park','🌳'],['en la playa','at the beach','🏖'],['en la escuela','at school','🏫'],['en el jardín','in the garden','🌻']]},
    {t:'reply',line:3,en:'What does Luis say at the end?',es:'¿Qué dice Luis al final?',a:['Hasta luego.','See you later.','🚶'],
     d:[['Buenos días.','Good morning.','🌅'],['Buenas noches.','Good night.','🌙'],['Mucho gusto.','Nice to meet you.','🙂'],['Gracias.','Thank you.','🙏']]}]},
  {id:'anos',title:'How old are you?',lines:[
    ['Abuelo','¿Cuántos años tienes, Sofía?'],['Sofía','Tengo ocho años. ¿Y tú, abuelo?'],
    ['Abuelo','Yo tengo setenta años. ¡Soy muy viejo!'],['Sofía','No, abuelo. ¡Eres muy rápido!']],
   qs:[
    {t:'what',line:1,en:'How old is Sofía?',es:'¿Cuántos años tiene Sofía?',a:['ocho','eight','n:8'],
     d:[['siete','seven','n:7'],['nueve','nine','n:9'],['diez','ten','n:10'],['seis','six','n:6']]},
    {t:'what',line:2,en:'How old is Grandpa?',es:'¿Cuántos años tiene el abuelo?',a:['setenta','seventy','n:70'],
     d:[['sesenta','sixty','n:60'],['ochenta','eighty','n:80'],['cincuenta','fifty','n:50'],['noventa','ninety','n:90']]},
    {t:'who',line:3,k:'Eres muy rápido',en:'Who says: “Eres muy rápido”',es:'¿Quién dice “Eres muy rápido”?',a:['Sofía'],d:['Abuelo','Mamá','Luis']}]},
  {id:'noche',title:'Good night',lines:[
    ['Mamá','Buenas noches, Mateo. ¿Estás cansado?'],['Mateo','Sí, mamá. Y tengo sed.'],['Mamá','Aquí está la leche.'],
    ['Mateo','Gracias. Buenas noches, mamá.']],
   qs:[
    {t:'how',line:1,en:'How does Mateo feel?',es:'¿Qué tiene Mateo?',a:['Tiene sed.','He is thirsty.','💧','tengo sed'],
     d:[['Tiene hambre.','He is hungry.','🍕','tengo hambre'],['Tiene frío.','He is cold.','🥶','tengo frío'],['Tiene calor.','He is hot.','🥵','tengo calor']]},
    {t:'what',line:2,en:'What is here for Mateo?',es:'¿Qué hay aquí para Mateo?',a:['la leche','the milk','🥛','leche'],
     d:[['el pan','the bread','🍞'],['el helado','the ice cream','🍦'],['las galletas','the cookies','🍪'],['el queso','the cheese','🧀']]},
    {t:'reply',line:3,en:'What does Mateo say at the end?',es:'¿Qué dice Mateo al final?',a:['Buenas noches.','Good night.','🌙'],
     d:[['Buenos días.','Good morning.','🌅'],['Hola.','Hello.','👋'],['De nada.','You are welcome.','🙏'],['Lo siento.','I am sorry.','😢']]}]},
  {id:'biblioteca',title:'At the library',lines:[
    ['Sofía','¡Hola, Carlos! ¿Estás en la biblioteca?'],['Carlos','Sí, leo un libro. ¡Me gusta mucho!'],
    ['Sofía','¿Qué animales hay en el libro?'],['Carlos','Hay un león y un oso.'],['Sofía','¡Qué bonito!']],
   qs:[
    {t:'where',line:0,en:'Where is Carlos?',es:'¿Dónde está Carlos?',a:['en la biblioteca','in the library','📚','biblioteca'],
     d:[['en la tienda','at the store','🏪'],['en el cine','at the movies','🎬'],['en el banco','at the bank','🏦'],['en el hospital','at the hospital','🏥']]},
    {t:'what',line:3,en:'Which animals are in the book?',es:'¿Qué animales hay en el libro?',a:['un león y un oso','a lion and a bear','🦁🐻'],
     d:[['un perro y un gato','a dog and a cat','🐶🐱'],['una rana y un pato','a frog and a duck','🐸🦆'],['un caballo y una vaca','a horse and a cow','🐴🐄'],
        ['un pez y un pájaro','a fish and a bird','🐟🐦']]},
    {t:'who',line:1,k:'leo un libro',en:'Who says: “Leo un libro”',es:'¿Quién dice “Leo un libro”?',a:['Carlos'],d:['Sofía','Pablo','Lucía']}]}
 ]
};
// the skill (the generators are in 34-gen-es.js, "P2-35 mini dialogues"); a round is two dialogues, all their questions in order
Object.assign(SK,{
 es_story:{t:'Stories',e:'🎙',area:'es',max:3,gen:lv=>genEsStory(lv),round:lv=>esStoryRound(lv)}});
