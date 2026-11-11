/* ---------- grammar, levels 1-9 (P2-20, P2-21, CURRICULUM E-gram) ---------- */
/* BANK.gram: bank skill `gram`, items in the format of CURRICULUM section 8 (engine: 37-bank.js). P2-21 adds levels 6-9 to the same bank. Every item has exactly one right answer; wrong answers are the common real mistakes. The bank
   validator compares answers without regard to capitals, so a wrong "missing capital" sentence also differs in its end mark.
   GR(lv, topic, hint, form, rows) turns rows into items; the hint teaches the method and never holds the answer:
     choice/wide rows:  [q, answer, wrong, wrong, (wrong)]        tap rows:  [q, sentence, answer]
   Level sizes: 1: 52, 2: 60, 3: 46, 4: 51, 5: 46, 6: LV6, 7: LV7, 8: LV8, 9: LV9.
   A label is the question plus the answer and must stay under 60 characters, so questions and answers are short. */
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
 ['Which two words make "isn\'t"?','is not','it is','is now'],['Which two words make "we\'re"?','we are','we were','we will']]),
// ---- level 6: pronouns, possessives, confusable words (grade 4) ----
GR(6,'confusable','Say "it is" in the blank. If that makes sense, pick the word with an apostrophe. If not, the blank shows who owns something.','choice',[
 ['The dog wagged ___ tail.','its',"it's","its'"],["___ a sunny day today.","It's",'Its',"Its'"],
 ['The bird fed ___ babies.','its',"it's","its'"],["___ time to go home.","It's",'Its',"Its'"],
 ['The tree lost ___ leaves.','its',"it's","its'"],["I think ___ going to rain.","it's",'its',"its'"],
 ['The cat licked ___ paw.','its',"it's","its'"],["___ my favorite book.","It's",'Its',"Its'"],
 ['The ship left ___ port.','its',"it's","its'"],["Look, ___ snowing!","it's",'its',"its'"]]),
GR(6,'confusable','One word shows a place, one shows that people own something, and one squeezes two words together with an apostrophe. Try each in the blank.','choice',[
 ['Put the books over ___.','there','their',"they're"],['The kids lost ___ hats.','their','there',"they're"],
 ["___ going to the zoo.","They're",'Their','There'],['We sat ___ for an hour.','there','their',"they're"],
 ['The twins love ___ new puppy.','their','there',"they're"],["I think ___ late for school.","they're",'their','there'],
 ['___ are three apples in the bowl.','There','Their',"They're"],['The dogs ate ___ dinner.','their','there',"they're"],
 ["Look, ___ playing in the snow.","they're",'their','there'],['My parents sold ___ old car.','their','there',"they're"],
 ['Is the milk ___ on the table?','there','their',"they're"],['Did you see ___ new house?','their','there',"they're"]]),
GR(6,'confusable','Try "you are" in the blank. If it fits, pick the word with the apostrophe. If not, the blank shows what belongs to you.','choice',[
 ["___ my best friend.","You're",'Your','Youre'],['Is this ___ coat?','your',"you're",'youre'],
 ["I know ___ going to win.","you're",'your','youre'],['Please clean ___ room.','your',"you're",'youre'],
 ["Do you think ___ ready?","you're",'your','youre'],['I like ___ new shoes.','your',"you're",'youre'],
 ["___ welcome to join us.","You're",'Your','Youre'],['Where did you put ___ bag?','your',"you're",'youre']]),
GR(6,'confusable','One word is a number, one means also or more than enough, and one points toward a place or comes before a verb. Try each in the blank.','choice',[
 ['We went ___ the park.','to','too','two'],['I have ___ cats.','two','to','too'],['Can I come ___?','too','to','two'],
 ['It is ___ hot to play outside.','too','to','two'],['She wants ___ read a book.','to','too','two'],
 ['Mom bought ___ loaves of bread.','two','to','too'],['I like pizza, ___.','too','to','two'],['Give the ball ___ me.','to','too','two'],
 ['The soup is ___ cold.','too','to','two'],['There were ___ ducks in the pond.','two','to','too']]),
GR(6,'confusable','Try "who is" or "who has" in the blank. If it fits, pick the word with the apostrophe. If the blank asks about owning, pick the other one.','choice',[
 ['___ coat is this?','Whose',"Who's",'Whos'],["___ coming to my party?","Who's",'Whose','Whos'],
 ['I know ___ book that is.','whose',"who's",'whos'],["___ at the door?","Who's",'Whose','Whos'],
 ['Tell me ___ turn it is.','whose',"who's",'whos'],["___ got the key?","Who's",'Whose','Whos']]),
GR(6,'pronouns','A pronoun takes the place of a noun. Ask: is it a girl, a boy, a thing, or more than one? Does it do the action or receive it?','choice',[
 ['Tom runs fast. ___ wins races.','He','She','It'],['Mia sings well. ___ loves music.','She','He','They'],
 ['The box is big. ___ is heavy.','It','He','They'],['Sam and Eli swim. ___ like water.','They','He','It'],
 ['My sister and I play. ___ have fun.','We','They','She'],['Dad is tall. Mia looks at ___.','him','he','his'],
 ['Mom called. I talked to ___.','her','she','hers'],['The dogs bark. Dad hears ___.','them','they','their'],
 ['Ana is kind. I gave ___ a card.','her','she','hers'],['Ben is my friend. I like ___.','him','he','his'],
 ['Jan and I read. ___ love books.','We','They','Us'],['The cat is soft. I pet ___.','it','he','they']]),
GR(6,'possessives','An apostrophe and s show that one owner has something. When the owners are plural and end in s, the apostrophe goes after the s.','choice',[
 ['Which shows the bike Sam owns?',"Sam's bike",'Sams bike',"Sams' bike"],
 ['Which shows the toy a puppy owns?',"the puppy's toy",'the puppys toy',"the puppys' toy"],
 ['Which shows the hats two girls own?',"the girls' hats","the girl's hats",'the girls hats'],
 ['Which shows the pen a teacher owns?',"the teacher's pen",'the teachers pen',"the teachers' pen"],
 ['Which shows the nest many birds share?',"the birds' nest","the bird's nest",'the birds nest'],
 ['Which shows the tails of three cats?',"the cats' tails","the cat's tails",'the cats tails']]),
// ---- level 7: commas and quotation marks (grade 4-5) ----
GR(7,'commas','When you list three or more things, put a comma after each one except the last, and join the last two with the little word that means plus.','wide',[
 ['Which is correct?','I packed socks, shoes, and a hat.','I packed socks shoes, and a hat.','I packed, socks, shoes, and a hat.'],
 ['Which is correct?','Mia sings, dances, and jumps.','Mia sings dances, and jumps.','Mia sings, dances, and, jumps.'],
 ['Which is correct?','We saw lions, tigers, and bears.','We saw lions tigers, and bears.','We saw, lions, tigers, and bears.'],
 ['Which is correct?','Buy milk, eggs, and bread.','Buy milk eggs, and bread.','Buy milk, eggs, and, bread.'],
 ['Which is correct?','He is tall, kind, and funny.','He is tall kind, and funny.','He is, tall, kind, and funny.'],
 ['Which is correct?','Pack a book, a pen, and a pad.','Pack a book a pen, and a pad.','Pack a book, a pen, and, a pad.'],
 ['Which is correct?','We need paper, glue, and tape.','We need paper glue, and tape.','We need, paper, glue, and tape.'],
 ['Which is correct?','Pat, Sam, and Lee won.','Pat Sam, and Lee won.','Pat, Sam, and, Lee won.']]),
GR(7,'commas','In a date, a comma goes between the day and the year. In a place, a comma goes between the city and the state.','wide',[
 ['Which is correct?','Her birthday is June 4, 2015.','Her birthday is June, 4 2015.','Her birthday is June 4 2015.'],
 ['Which is correct?','We moved on May 9, 2019.','We moved on May, 9 2019.','We moved on May 9 2019.'],
 ['Which is correct?','School began on August 20, 2024.','School began on August, 20 2024.','School began on August 20 2024.'],
 ['Which is correct?','I was born in Austin, Texas.','I was born in Austin Texas.','I was born, in Austin Texas.'],
 ['Which is correct?','We visited Denver, Colorado.','We visited Denver Colorado.','We visited, Denver Colorado.'],
 ['Which is correct?','She lives in Reno, Nevada.','She lives in Reno Nevada.','She lives, in Reno Nevada.'],
 ['Which is correct?','Dad was born on March 3, 1980.','Dad was born on March, 3 1980.','Dad was born on March 3 1980.'],
 ['Which is correct?','We left on July 1, 2022.','We left on July, 1 2022.','We left on July 1 2022.']]),
GR(7,'commas','Use a comma to set off a name when you speak to someone, and after a starting word that is not part of the main idea.','wide',[
 ['Which is correct?','Yes, I can come.','Yes I can come.','Yes I, can come.'],
 ['Which is correct?','No, thank you.','No thank you.','No thank, you.'],
 ['Which is correct?','Mia, please sit down.','Mia please sit down.','Mia please, sit down.'],
 ['Which is correct?','Well, it is time to go.','Well it is time to go.','Well it is time, to go.'],
 ['Which is correct?','First, wash your hands.','First wash your hands.','First wash, your hands.'],
 ['Which is correct?','Dad, can we go now?','Dad can we go now?','Dad can, we go now?'],
 ['Which is correct?','Thank you, Grandma.','Thank you Grandma.','Thank, you Grandma.'],
 ['Which is correct?','Next, add the eggs.','Next add the eggs.','Next add, the eggs.'],
 ['Which is correct?','Oh, I forgot my hat.','Oh I forgot my hat.','Oh I forgot, my hat.']]),
GR(7,'commas','When a little joining word links two whole sentences, put a comma before it. A comma alone cannot do the joining.','wide',[
 ['Which is correct?','We were tired, so we slept.','We were tired so, we slept.','We were, tired so we slept.'],
 ['Which is correct?','It rained, but we played.','It rained but, we played.','It, rained but we played.'],
 ['Which is correct?','I like cats, and Mia likes dogs.','I like cats and, Mia likes dogs.','I like, cats and Mia likes dogs.'],
 ['Which is correct?','Dad cooked, and I set the table.','Dad cooked and, I set the table.','Dad, cooked and I set the table.'],
 ['Which is correct?','The sun set, so we went home.','The sun set so, we went home.','The sun, set so we went home.']]),
GR(7,'quotes','Spoken words go inside quotation marks. A comma separates the speaker from the words, and the end mark sits inside the closing marks.','wide',[
 ['Which is correct?','Mia said, "I am hungry."','Mia said, "I am hungry".','Mia said "I am hungry."','Mia said, I am hungry.'],
 ['Which is correct?','Dad asked, "Are you ready?"','Dad asked, "Are you ready"?','Dad asked "Are you ready?"','Dad asked, Are you ready?'],
 ['Which is correct?','Ben yelled, "Look out!"','Ben yelled, "Look out"!','Ben yelled "Look out!"','Ben yelled, Look out!'],
 ['Which is correct?','"I like pie," said Jo.','"I like pie." said Jo.','"I like pie", said Jo.','I like pie, said Jo.'],
 ['Which is correct?','"Come in," said Mom.','"Come in". said Mom.','"Come in" said Mom.'],
 ['Which is correct?','Ana said, "It is late."','Ana said, "It is late".','Ana said "It is late."'],
 ['Which is correct?','The teacher said, "Sit down."','The teacher said, "Sit down".','The teacher said "Sit down."'],
 ['Which is correct?','"Where is it?" asked Tia.','"Where is it", asked Tia.','"Where is it?", asked Tia.'],
 ['Which is correct?','Sam whispered, "Be quiet."','Sam whispered, "Be quiet".','Sam whispered "Be quiet."'],
 ['Which is correct?','Liv asked, "Can I help?"','Liv asked, "Can I help"?','Liv asked "Can I help?"'],
 ['Which is correct?','"Run!" yelled Kim.','"Run" yelled Kim.','"Run!," yelled Kim.']]),
// ---- level 8: more parts of speech and perfect tenses (grade 5) ----
GR(8,'adverbs','An adverb tells how, when or where an action happens. Many end in -ly. Find the word that describes the action.','tap',[
 ['Tap the adverb.','The dog barked loudly.','loudly'],['Tap the adverb.','She sings softly.','softly'],
 ['Tap the adverb.','He ran quickly.','quickly'],['Tap the adverb.','We walked slowly home.','slowly'],
 ['Tap the adverb.','Kids play outside.','outside'],['Tap the adverb.','He spoke kindly.','kindly'],
 ['Tap the adverb.','The cat sleeps quietly.','quietly'],['Tap the adverb.','Mom drives carefully.','carefully'],
 ['Tap the adverb.','He jumped happily.','happily']]),
GR(8,'adverbs','Does the blank tell how the action is done? A word that describes an action usually ends in -ly.','choice',[
 ['The turtle moves ___.','slowly','slow','slower'],['He spoke ___ to the baby.','softly','soft','softer'],
 ['She ran ___ to school.','quickly','quick','quicker'],['The band played ___.','loudly','loud','louder'],
 ['Please walk ___.','carefully','careful','care'],['We waited ___ for the bus.','patiently','patient','patience']]),
GR(8,'prepositions','A preposition shows where something is or when it happens, and it comes before a noun. Ask: where, or when?','tap',[
 ['Tap the preposition.','Cats sleep under beds.','under'],['Tap the preposition.','Birds fly over us.','over'],
 ['Tap the preposition.','Sit beside me.','beside'],['Tap the preposition.','Hide behind trees.','behind'],
 ['Tap the preposition.','Frogs sit on logs.','on'],['Tap the preposition.','Fish swim in ponds.','in'],
 ['Tap the preposition.','Dogs run through mud.','through'],['Tap the preposition.','We eat after school.','after']]),
GR(8,'conjunctions','A conjunction is a small joining word. It links two words, two phrases, even two sentences.','tap',[
 ['Tap the conjunction.','Cats and dogs play.','and'],['Tap the conjunction.','Pick tea or milk.','or'],
 ['Tap the conjunction.','Tired but happy.','but'],['Tap the conjunction.','Small yet strong.','yet']]),
GR(8,'interjections','An interjection shows a sudden feeling such as surprise or pain. It often comes first, with a comma or a mark after it.','tap',[
 ['Tap the interjection.','Wow, so big!','Wow'],['Tap the interjection.','Ouch, that hurts!','Ouch'],
 ['Tap the interjection.','Hooray, we won!','Hooray'],['Tap the interjection.','Yikes, a snake!','Yikes'],
 ['Tap the interjection.','Oops, I spilled.','Oops']]),
GR(8,'wordtypes','Ask what job the word does: telling how, showing where, joining ideas, or showing a sudden feeling.','wide',[
 ['What kind of word is "gently"?','adverb','adjective','preposition'],['What kind of word is "under"?','preposition','adverb','conjunction'],
 ['What kind of word is "beside"?','preposition','interjection','noun'],['What kind of word is "because"?','conjunction','preposition','adverb'],
 ['What kind of word is "but"?','conjunction','interjection','adverb'],['What kind of word is "wow"?','interjection','conjunction','adjective'],
 ['What kind of word is "ouch"?','interjection','noun','adverb'],['What kind of word is "carefully"?','adverb','adjective','verb'],
 ['What kind of word is "across"?','preposition','conjunction','verb'],['What kind of word is "or"?','conjunction','preposition','interjection'],
 ['What kind of word is "between"?','preposition','adverb','noun']]),
GR(8,'perfect','A helper word plus a special form of the verb tells about something finished earlier. Check the clue: already, twice, since, before.','choice',[
 ['Mia ___ her lunch already.','has eaten','has ate','have eaten'],['We ___ our homework twice.','have done','have did','has done'],
 ['The bird ___ away before we came.','had flown','had flew','has flown'],['I ___ this movie two times.','have seen','have saw','has seen'],
 ['Dad ___ the car already.','has washed','have washed','has wash'],['They ___ to the zoo three times.','have gone','have went','has gone'],
 ['By noon, she ___ her work.','had finished','has finish','had finish'],['The kids ___ their toys away.','have put','has put','have putted'],
 ['Sam ___ his shoes before he left.','had tied','has tied','had tie'],['The sun ___ before we woke up.','had risen','had rose','has risen'],
 ['Mom ___ three books this week.','has read','has readed','have read'],['We ___ our bikes since morning.','have ridden','have rode','has ridden'],
 ['She ___ the same song twice.','has sung','has sang','have sung'],['The class ___ the test.','has taken','has took','have taken']]),
// ---- level 9: sentence craft (grade 6) ----
GR(9,'sentences','A complete sentence names who or what and tells what happens, and it makes sense alone. If it leaves you waiting, it is not finished.','wide',[
 ['Which is a complete sentence?','The dog barked loudly.','The dog in the yard.','Barking loudly at night.'],
 ['Which is a complete sentence?','Birds sing every morning.','Singing every morning.','Birds in the tall tree.'],
 ['Which is a complete sentence?','Mia found a coin.','Found a shiny coin.','A coin in her pocket.'],
 ['Which is a complete sentence?','We ate lunch.','After we ate lunch.','Eating lunch outside.'],
 ['Which is a complete sentence?','Rain fell all day.','Falling all day.','Because rain fell all day.'],
 ['Which is a complete sentence?','The baby laughed.','The laughing baby.','When the baby laughed.'],
 ['Which is a complete sentence?','Dad fixed the sink.','Fixing the sink.','The sink in the kitchen.'],
 ['Which is a complete sentence?','The bus stopped.','The bus at the corner.','Stopping at the corner.'],
 ['Which is a complete sentence?','Kids play outside.','Playing outside.','Kids in the yard.']]),
GR(9,'sentences','A fragment is missing a subject, a verb or a finished thought. Read each one alone: which one leaves you waiting for more?','wide',[
 ['Which is a fragment?','Under the old bridge.','Trolls live under bridges.','The bridge is old.'],
 ['Which is a fragment?','Because it was late.','It was late.','We went home.'],
 ['Which is a fragment?','Running down the hill.','She ran down the hill.','The hill is steep.'],
 ['Which is a fragment?','My best friend Sam.','Sam is my best friend.','Sam lives nearby.'],
 ['Which is a fragment?','After the movie ended.','The movie ended.','We left after it.'],
 ['Which is a fragment?','When the bell rings.','The bell rings.','Class ends soon.'],
 ['Which is a fragment?','Hoping for snow.','We hope for snow.','Snow is fun.']]),
GR(9,'sentences','A run-on jams two sentences together. Fix it with a comma plus a joining word, or split it in two. A comma alone is not enough.','wide',[
 ['Fix it: We ran we hid.','We ran, and we hid.','We ran we, hid.','We ran, we hid.'],
 ['Fix it: It is hot I swim.','It is hot, so I swim.','It is hot, I swim.','It is hot I, swim.'],
 ['Fix it: Mom sang I danced.','Mom sang, and I danced.','Mom sang, I danced.','Mom sang I, danced.'],
 ['Fix it: Dogs bark cats hiss.','Dogs bark, and cats hiss.','Dogs bark, cats hiss.','Dogs, bark cats hiss.'],
 ['Fix it: We won we cheered.','We won, so we cheered.','We won, we cheered.','We won we, cheered.'],
 ['Fix it: Ben fell he cried.','Ben fell, and he cried.','Ben fell, he cried.','Ben, fell he cried.'],
 ['Fix it: It snowed we sledded.','It snowed, so we sledded.','It snowed, we sledded.','It, snowed we sledded.'],
 ['Fix it: I am tired I nap.','I am tired, so I nap.','I am tired, I nap.','I am, tired I nap.']]),
GR(9,'combining','Joining two short sentences with a joining word makes one smooth sentence. If both parts have their own subject and verb, use a comma first.','wide',[
 ['Combine: Tim ran. Tim fell.','Tim ran and fell.','Tim ran fell and.','Tim and ran fell.'],
 ['Combine: I am sad. I am hungry.','I am sad and hungry.','I am sad and I hungry.','I am and sad hungry.'],
 ['Combine: Mia sings. Mia plays.','Mia sings and plays.','Mia and sings plays.','Mia sings plays and.'],
 ['Join: I am cold. I shiver.','I am cold, so I shiver.','I am cold so, I shiver.','I am cold, I shiver.'],
 ['Join: It rained. We played.','It rained, but we played.','It rained but, we played.','It rained, we played.'],
 ['Join: I was late. I ran.','I was late, so I ran.','I was late so, I ran.','I was late, I ran.'],
 ['Join: Al is tall. Jo is not.','Al is tall, but Jo is not.','Al is tall but, Jo is not.','Al is tall, Jo is not.']]),
GR(9,'pronoun case','Say the sentence with only one person in it. Pick the form for the one doing the action, or the form for the one it happens to.','choice',[
 ['Tom and ___ went to the park.','I','me','mine'],['Mom gave Ben and ___ a snack.','me','I','mine'],
 ['Jo and ___ built a fort.','I','me','mine'],['The prize went to Ana and ___.','me','I','mine'],
 ['Dad took Meg and ___ to the zoo.','me','I','mine'],['Sara and ___ won the game.','I','me','mine'],
 ['Tia and ___ sang a song.','he','him','his'],['The teacher helped Jan and ___.','her','she','hers'],
 ['___ and I ate lunch.','She','Her','Hers'],['Sit with Tom and ___.','him','he','his'],
 ['___ kids love recess.','We','Us','Our'],['Mom picked ___ kids up.','us','we','our']]),
GR(9,'who or whom','One word does the action and one receives it. Replace the blank with he or him, then pick the matching word.','choice',[
 ['___ ate the last cookie?','Who','Whom','Whose'],['To ___ did you give it?','whom','who','whose'],
 ['___ is calling you?','Who','Whom','Whose'],['With ___ did you go?','whom','who','whose'],
 ['___ wants some pizza?','Who','Whom','Whose'],['For ___ is this gift?','whom','who','whose']]),
GR(9,'clear pronouns','A pronoun must point to one clear noun. If it could mean two people, or nothing at all, say the name again.','wide',[
 ['Which is clear?','Tim told Ben that Tim was late.','Tim told Ben he was late.','He told Ben he was late.'],
 ['Which is clear?','Mia told Ann that Ann won.','Mia told Ann she won.','She told Ann she won.'],
 ['Which is clear?','Pam hugged Kay, and Kay smiled.','Pam hugged Kay, and she smiled.','She hugged Kay, and she smiled.'],
 ['Which is clear?','Ben called Sam, and Ben was late.','Ben called Sam, and he was late.','He called Sam, and he was late.'],
 ['Which is clear?','Mom told Gran that Mom was ill.','Mom told Gran she was ill.','She told Gran she was ill.'],
 ['Which is clear?','Al saw Ed, and Ed waved.','Al saw Ed, and he waved.','He saw Ed, and he waved.'],
 ['Which is clear?','The book says owls hunt at night.','They say owls hunt at night.','In the book, they say owls hunt.'],
 ['Which is clear?','The sign says to keep off.','It says to keep off.','They say to keep off.']])
);
