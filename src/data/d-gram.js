/* ---------- grammar, levels 1-5 (P2-20, CURRICULUM E-gram) ---------- */
/* BANK.gram: bank skill `gram`, items in the format of CURRICULUM section 8 (engine: 37-bank.js). P2-21 adds levels 6-9 to the same bank
   (append more GR(...) groups below). Every item has exactly one right answer; wrong answers are the common real mistakes. The bank
   validator compares answers without regard to capitals, so a wrong "missing capital" sentence also differs in its end mark.
   GR(lv, topic, hint, form, rows) turns rows into items; the hint teaches the method and never holds the answer:
     choice/wide rows:  [q, answer, wrong, wrong, (wrong)]        tap rows:  [q, sentence, answer]
   Level sizes: 1: 52, 2: 60, 3: 46, 4: 51, 5: 46. */
const GR=(lv,topic,hint,form,rows)=>rows.map(r=>form=='tap'
  ?{lv,topic,hint,form,q:r[0],sent:r[1],a:r[2],say:r[0]+' '+r[1]}
  :{lv,topic,hint,form,q:r[0],a:r[1],d:r.slice(2)});
BANK.gram=[].concat(
// ---- level 1: capital letters and end marks (grade 1) ----
GR(1,'caps','Check three things: a capital letter to start, capitals for names and the word I, and the right end mark.','wide',[
 ['Which sentence is correct?','The cat sat on the mat.','the cat sat on the mat','The cat sat on the mat?'],
 ['Which sentence is correct?','My dog likes to run.','my dog likes to run','My dog likes to run?'],
 ['Which sentence is correct?','We went to the park.','we went to the park','We went to the park?'],
 ['Which sentence is correct?','I have a red ball.','i have a red ball','I have a red ball?'],
 ['Which sentence is correct?','Dad made soup for dinner.','dad made soup for dinner','Dad made soup for dinner?'],
 ['Which sentence is correct?','The sun is hot today.','the sun is hot today','The sun is hot today?'],
 ['Which sentence is correct?','Mia can ride a bike.','mia can ride a bike','Mia can ride a bike?'],
 ['Which sentence is correct?','Where is my hat?','where is my hat','Where is my hat.'],
 ['Which sentence is correct?','Can we play outside?','can we play outside.','Can we play outside'],
 ['Which sentence is correct?','What is your name?','what is your name','What is your name.'],
 ['Which sentence is correct?','Who is at the door?','who is at the door.','Who is at the door'],
 ['Which sentence is correct?','Do you like apples?','do you like apples','Do you like apples.'],
 ['Which sentence is correct?','We had fun at the beach.','we had fun at the beach','We had fun at the beach?'],
 ['Which sentence is correct?','The bird sings in the tree.','the bird sings in the tree?','The bird sings in the tree'],
 ['Which sentence is correct?','Tom and I play ball.','tom and i play ball','Tom and I play ball?'],
 ['Which sentence is correct?','Today is Monday.','today is Monday','Today is Monday?'],
 ['Which sentence is correct?','Look at that big rainbow!','look at that big rainbow','Look at that big rainbow?'],
 ['Which sentence is correct?','Wow, that was fun!','wow, that was fun','Wow, that was fun?'],
 ['Which sentence is correct?','Our class has a pet fish.','our class has a pet fish','Our class has a pet fish?'],
 ['Which sentence is correct?','Ben has a new puppy.','ben has a new puppy','Ben has a new puppy?']]),
GR(1,'endmarks','A telling sentence ends with a period. A question ends with a question mark. A big feeling ends with an exclamation mark.','choice',[
 ...['The cat is on the mat','I like to read books','We eat lunch at noon','The moon is round','My sister has a kite','Birds can fly','The bus is yellow','Dad cooks dinner']
   .map(s=>['Which end mark? '+s+' ___','.','?','!']),
 ...['Where is my hat','Can you help me','What time is it','Who is that','Is it raining','How old are you','Why is the sky blue','Do you have a pencil']
   .map(s=>['Which end mark? '+s+' ___','?','.','!']),
 ...['Wow, I won the race','Hooray, it is my birthday','Ouch, that is hot','Yay, we are going to the zoo','Look out, a big bee','Oh no, I dropped my snack','Wow, what a big dog','Hooray, the sun is out']
   .map(s=>['Which end mark? '+s+' ___','!','.','?'])]),
GR(1,'caps','Names of people, the days of the week and the word I start with a capital letter. Look for one written small.','tap',[
 ['Tap the word that needs a capital letter.','The girl is mia.','mia'],
 ['Tap the word that needs a capital letter.','My friend ben runs.','ben'],
 ['Tap the word that needs a capital letter.','We go on monday.','monday'],
 ['Tap the word that needs a capital letter.','Today is friday.','friday'],
 ['Tap the word that needs a capital letter.','My cat is luna.','luna'],
 ['Tap the word that needs a capital letter.','Then i went home.','i'],
 ['Tap the word that needs a capital letter.','We saw sam.','sam'],
 ['Tap the word that needs a capital letter.','Her name is ana.','ana']]),
// ---- level 2: nouns, verbs, adjectives (grade 2) ----
(()=>{
  // [sentence, noun, verb, adjective]: each sentence has exactly one of each, and no word is used twice
  const S=[['The tiny frog hops.','frog','hops','tiny'],['A happy puppy barks.','puppy','barks','happy'],['The loud bell rings.','bell','rings','loud'],
    ['My brave dog runs.','dog','runs','brave'],['The soft kitten sleeps.','kitten','sleeps','soft'],['A shiny fish swims.','fish','swims','shiny'],
    ['The tall giraffe eats.','giraffe','eats','tall'],['Our funny teacher sings.','teacher','sings','funny'],['A sleepy bear yawns.','bear','yawns','sleepy'],
    ['The fluffy rabbit jumps.','rabbit','jumps','fluffy'],['The sweet baby giggles.','baby','giggles','sweet'],['A big wave crashes.','wave','crashes','big'],
    ['The cold wind blows.','wind','blows','cold'],['Her little sister laughs.','sister','laughs','little'],['The yellow duck quacks.','duck','quacks','yellow'],
    ['The busy bee buzzes.','bee','buzzes','busy']];
  const HN='A noun names a person, place or thing. Which word names something you could point to?';
  const HV='A verb is an action word. Which word tells what someone or something does?';
  const HA='An adjective describes a noun. Which word tells what kind or how it looks?';
  return [].concat(
    GR(2,'noun',HN,'tap',S.map(s=>['Tap the noun.',s[0],s[1]])),
    GR(2,'verb',HV,'tap',S.map(s=>['Tap the verb.',s[0],s[2]])),
    GR(2,'adjective',HA,'tap',S.map(s=>['Tap the adjective.',s[0],s[3]])),
    GR(2,'noun',HN,'choice',[
      ['Which word is a noun?','tiger','eat','happy'],['Which word is a noun?','window','sing','tiny'],
      ['Which word is a noun?','banana','hop','loud'],['Which word is a noun?','bridge','throw','soft']]),
    GR(2,'verb',HV,'choice',[
      ['Which word is a verb?','sing','table','tall'],['Which word is a verb?','hop','apple','shiny'],
      ['Which word is a verb?','eat','pencil','brave'],['Which word is a verb?','throw','garden','sleepy']]),
    GR(2,'adjective',HA,'choice',[
      ['Which word is an adjective?','happy','farmer','hop'],['Which word is an adjective?','soft','pencil','throw'],
      ['Which word is an adjective?','loud','window','eat'],['Which word is an adjective?','funny','garden','sing']]));
})(),
// ---- level 3: plurals (grades 2-3) ----
(()=>{
  const P=(hint,rows)=>GR(3,'plurals',hint,'choice',rows.map(r=>['One '+r[0]+', two ___.',r[1],...r.slice(2)]));
  return [].concat(
    P('Most words just add s to mean more than one. Say it out loud.',[['cat','cats','cat','cates'],['dog','dogs','dog','doges'],
      ['book','books','book','bookes'],['tree','trees','tree','treees'],['star','stars','star','stares'],['pig','pigs','pig','piges'],
      ['cup','cups','cup','cupes'],['bed','beds','bed','bedes'],['ball','balls','ball','balles'],['duck','ducks','duck','duckes']]),
    P('Words that end in x, s, sh or ch add es. Say each choice out loud and listen.',[['box','boxes','boxs','boxies'],['bus','buses','buss','busies'],
      ['dish','dishes','dishs','dishies'],['watch','watches','watchs','watchies'],['fox','foxes','foxs','foxies'],
      ['glass','glasses','glasss','glassies'],['brush','brushes','brushs','brushies'],['bench','benches','benchs','benchies'],
      ['peach','peaches','peachs','peachies'],['dress','dresses','dresss','dressies']]),
    P('When a word ends in a consonant and y, change the y to i and add es.',[['baby','babies','babys','babyes'],['puppy','puppies','puppys','puppyes'],
      ['berry','berries','berrys','berryes'],['city','cities','citys','cityes'],['fly','flies','flys','flyes'],['story','stories','storys','storyes'],
      ['lady','ladies','ladys','ladyes'],['penny','pennies','pennys','pennyes'],['family','families','familys','familyes']]),
    P('Some words that end in f or fe change to ves. Say each choice out loud.',[['leaf','leaves','leafs','leafes'],['wolf','wolves','wolfs','wolfes'],
      ['shelf','shelves','shelfs','shelfes'],['knife','knives','knifes','knifs'],['loaf','loaves','loafs','loafes'],['calf','calves','calfs','calfes'],
      ['wife','wives','wifes','wifs'],['life','lives','lifes','lifs']]),
    P('Some words change in a special way. Say the sentence out loud: which one sounds right?',[['man','men','mans','mens'],['woman','women','womans','womens'],
      ['foot','feet','foots','feets'],['mouse','mice','mouses','mices'],['child','children','childs','childrens'],['tooth','teeth','tooths','teeths'],
      ['goose','geese','gooses','geeses'],['sheep','sheep','sheeps','sheepes'],['ox','oxen','oxes','oxens']]));
})(),
// ---- level 4: verb tense (grade 3) ----
GR(4,'tense','Words like yesterday and last night mean it already happened. Many past words end in ed. Which verb fits the clue?','choice',[
 ['Yesterday, the dog ___ in the yard.','played','play','will play'],['Last week, we ___ a big cake.','baked','bake','will bake'],
 ['Yesterday, I ___ my teeth.','brushed','brush','will brush'],['Last night, Mom ___ the door.','opened','open','will open'],
 ['Last summer, we ___ at the lake.','camped','camp','will camp'],['Yesterday, the baby ___ at me.','smiled','smile','will smile'],
 ['Last Monday, Ben ___ his bike.','washed','wash','will wash'],['Yesterday, the cat ___ up the tree.','climbed','climb','will climb']]),
GR(4,'tense','Some verbs change in a special way for the past. Read the clue word, then say each choice out loud.','choice',[
 ['Yesterday, we ___ to the zoo.','went','goed','gone'],['Last week, Dad ___ to work early.','went','goed','gone'],
 ['Last night, I ___ a bright star.','saw','seen','seed'],['Yesterday, Mia ___ a deer at the park.','saw','seen','seed'],
 ['Last night, I ___ all my peas.','ate','eated','eaten'],['Yesterday, the goat ___ the grass.','ate','eated','eaten'],
 ['Yesterday, Sam ___ in the big race.','ran','runned','run'],['Last week, the dog ___ away from the bath.','ran','runned','run'],
 ['Last Friday, Dad ___ us to the beach.','took','taked','taken'],['Yesterday, I ___ my lunch to school.','took','taked','taken'],
 ['Last night, Grandpa ___ me a hug.','gave','gived','given'],['Yesterday, we ___ the horse some hay.','gave','gived','given'],
 ['Yesterday, my cousin ___ to my house.','came','comed','come'],['Last week, the mail ___ late.','came','comed','come'],
 ['Yesterday, Mom ___ new shoes.','bought','buyed','boughted'],['Last Sunday, we ___ fresh bread.','bought','buyed','boughted'],
 ['Last night, I ___ about my dream.','thought','thinked','thinking'],['Yesterday, Lily ___ of a good idea.','thought','thinked','thinking'],
 ['Yesterday, I ___ a letter to Gran.','wrote','writed','written'],['Last night, Jo ___ a short story.','wrote','writed','written']]),
GR(4,'tense','Words like every day and right now tell about the present. Which verb fits the clue?','choice',[
 ['Every day, Dad ___ the bus to work.','takes','took','will take'],['Right now, the baby ___ in her crib.','sleeps','slept','will sleep'],
 ['Every day, I ___ my teeth.','brush','brushed','will brush'],['Right now, we ___ a new song.','sing','sang','will sing'],
 ['Every week, Gran ___ us a card.','sends','sent','will send'],['Each day, the sun ___ in the east.','rises','rose','will rise'],
 ['Right now, the rain ___ on the roof.','falls','fell','will fall']]),
GR(4,'tense','Words like tomorrow and next week mean it has not happened yet. Which choice looks ahead?','choice',[
 ['Tomorrow, we ___ the zoo.','will visit','visited','have visited'],['Next week, I ___ eight years old.','will be','was','were'],
 ['Tomorrow, we ___ go to the lake.','will','did','were'],['Next month, Dad ___ fix the fence.','will','did','had'],
 ['Next year, I ___ be in third grade.','will','was','did'],['Tomorrow, I ___ my grandma.','will call','called','have called'],
 ['Next Saturday, we ___ a picnic.','will have','had','have had'],['Tonight, the stars ___ shine.','will','did','were']]),
GR(4,'tense','Look for clue words: yesterday and last mean past, now and every mean present, tomorrow and next mean future.','wide',[
 ['Which is in the future?','We will plant seeds tomorrow.','We planted seeds yesterday.','We plant seeds every spring.'],
 ['Which is in the future?','The bus will come soon.','The bus came early.','The bus comes every day.'],
 ['Which is in the past?','Mom baked a pie last night.','Mom bakes a pie every Friday.','Mom will bake a pie tomorrow.'],
 ['Which is in the past?','I rode my bike yesterday.','I ride my bike every day.','I will ride my bike later.'],
 ['Which is in the past?','The bird flew away.','The bird flies away.','The bird will fly away.'],
 ['Which is happening now?','The kids are playing right now.','The kids played all day.','The kids will play soon.'],
 ['Which is happening now?','Dad cooks dinner every night.','Dad cooked dinner last night.','Dad will cook dinner soon.'],
 ['Which is in the future?','Our team will win next time.','Our team won last time.','Our team wins every time.']]),
// ---- level 5: subject-verb agreement and contractions (grade 3) ----
GR(5,'agreement','Look at the subject: is it one thing or more than one? Then say each choice out loud and listen for the one that sounds right.','choice',[
 ['The cats ___ asleep.','are','is','am'],['My shoe ___ under the bed.','is','are','am'],['The apples ___ red.','are','is','am'],
 ['A bird ___ on the fence.','is','are','am'],['Mom and Dad ___ home.','are','is','am'],['The box ___ empty.','is','are','am'],
 ['The children ___ in the gym.','are','is','am'],['The soup ___ hot.','is','are','am'],['I ___ ready for lunch.','am','is','are'],
 ['You ___ my best friend.','are','is','am'],
 ['Last night, the boys ___ at the park.','were','was','is'],['Last night, the moon ___ bright.','was','were','is'],
 ['The dogs ___ barking all night.','were','was','is'],['My sister ___ sick last week.','was','were','is'],
 ['The flowers ___ pretty yesterday.','were','was','is'],['I ___ happy at the party yesterday.','was','were','is'],
 ['Last Monday, we ___ late for school.','were','was','is'],
 ['The girls ___ new bikes.','have','has','having'],['My dog ___ a long tail.','has','have','having'],['We ___ a big garden.','have','has','having'],
 ['She ___ a blue backpack.','has','have','having'],['The twins ___ the same hat.','have','has','having'],
 ['Our teacher ___ a red pen.','has','have','having'],['I ___ two cats.','have','has','having'],
 ['The dogs ___ fast every day.','run','runs','running'],['The bird ___ in the morning.','sings','sing','singing'],
 ['My brothers ___ soccer on Friday.','play','plays','playing'],['The baby ___ a lot.','sleeps','sleep','sleeping'],
 ['Frogs ___ in the pond.','swim','swims','swimming'],['My mom ___ dinner each night.','cooks','cook','cooking'],
 ['The boys ___ to school.','walk','walks','walking'],['A cow ___ grass.','eats','eat','eating']]),
GR(5,'contractions','An apostrophe shows where letters were left out. Say the two words, then squeeze them together.','choice',[
 ['Which is the short way to write "do not"?',"don't",'dont',"do'nt"],['Which is the short way to write "can not"?',"can't",'cant',"ca'nt"],
 ['Which is the short way to write "it is"?',"it's",'its',"it'is"],['Which is the short way to write "we are"?',"we're",'were',"we'er"],
 ['Which is the short way to write "I am"?',"I'm",'Im',"I'am"],['Which is the short way to write "is not"?',"isn't",'isnt',"is'nt"],
 ['Which is the short way to write "they are"?',"they're",'their',"they'er"],['Which is the short way to write "she is"?',"she's",'shes',"sh'es"],
 ['Which is the short way to write "will not"?',"won't","willn't",'wont'],['Which is the short way to write "did not"?',"didn't",'didnt',"did'nt"],
 ['Which is the short way to write "you are"?',"you're",'your',"you'er"],['Which is the short way to write "let us"?',"let's",'lets',"let'us"],
 ['Which two words make "isn\'t"?','is not','it is','is now'],['Which two words make "we\'re"?','we are','we were','we will']])
);
