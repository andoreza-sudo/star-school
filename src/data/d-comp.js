/* Comprehension passages (P2-25: 2nd grade). Format and how to add a grade: header of src/js/37-comp.js.
   Fiction (type 'f') is the comp skill, level 3; nonfiction (type 'n') is the info skill, level 1. Original text, no brands, no real people.
   Append new grades below; never reorder or insert (saved review items remember a passage by its position). */

// ---- grade 2: 60-90 words, 5 questions: detail, sequence, vocabulary, main idea, inference ----
COMPSPEC[2]={words:[60,90],sent:11,maxSent:15,fk:3.5,need:['detail','sequence','vocab','main','infer']};
compAdd([
{id:'g2f01',g:2,type:'f',title:'The Lost Kite',text:[
  'Mia had a red kite with a long tail.',
  'One windy day, she ran to the park to fly it.',
  'The wind pulled hard, and the string slipped from her hand.',
  'The kite floated up over the trees.',
  'Mia felt sad and tried to follow it.',
  'Then she saw her friend Sam at the gate, holding the kite.',
  '"It landed on my fence," he said.',
  'Mia gave him a big hug, and they flew the kite together.'],
 qs:[
  {t:'detail',q:'What color was Mia\'s kite?',a:'red',d:['blue','green','yellow'],ev:[0]},
  {t:'sequence',q:'What happened right after the string slipped from Mia\'s hand?',a:'The kite floated over the trees',
   d:['Sam gave her a big hug at the gate','Mia flew the kite with Sam','Mia ran home to rest'],ev:[2,3]},
  {t:'vocab',q:'In this story, "floated" means...',a:'drifted through the air',d:['fell down fast','broke into bits','got very wet'],ev:[3]},
  {t:'main',q:'What is "The Lost Kite" mostly about?',a:'Mia loses her kite and gets it back',
   d:['Mia builds a brand new kite','Sam wins a kite contest at the park','A storm breaks the kite in two'],ev:[2,3,5,7]},
  {t:'infer',q:'How did Mia feel when she saw Sam with the kite?',a:'happy and thankful',d:['cross and upset','bored and a little sleepy','scared and shy'],ev:[5,7]}]},

{id:'g2f02',g:2,type:'f',title:'Ben and the Big Rain',text:[
  'Ben wanted to play ball outside.',
  'But dark clouds filled the sky, and rain began to fall.',
  'Ben sat by the window and frowned.',
  '"Why not splash instead?" asked Dad.',
  'Ben put on his boots and a yellow coat.',
  'He jumped in every puddle he could find.',
  'Water sprayed up high, and Ben laughed out loud.',
  'When he came in, he said, "Rain is not so bad!"'],
 qs:[
  {t:'detail',q:'What did Ben put on before he went out?',a:'boots and a yellow coat',d:['a blue hat, gloves and a scarf','a swim suit and fins','shorts and sandals'],ev:[4]},
  {t:'sequence',q:'What did Ben do before he put on his boots?',a:'He sat by the window and frowned',
   d:['He jumped in the puddles','He laughed out loud','He said rain is not so bad'],ev:[2,4]},
  {t:'vocab',q:'In this story, "frowned" means...',a:'made a sad or cross face',d:['gave a big smile','fell fast asleep','ran far away'],ev:[2]},
  {t:'main',q:'What is "Ben and the Big Rain" mostly about?',a:'Ben finds a fun way to enjoy a rainy day',
   d:['Ben loses his boots in a puddle','Ben and Dad go to a big ball game at the park','Ben stays inside all day and naps'],ev:[0,3,5,6]},
  {t:'infer',q:'Why did Ben say, "Rain is not so bad!"?',a:'He had fun in the puddles',
   d:['He wanted to stay inside','He lost his ball outside','Dad told him to say it'],ev:[5,6,7]}]},

{id:'g2f03',g:2,type:'f',title:'The Shy Turtle',text:[
  'Tilly the turtle was very shy.',
  'At the pond, the other turtles played tag on the log.',
  'Tilly watched from the reeds and said nothing.',
  'One day, a baby frog fell off the log and cried for help.',
  'Tilly swam fast and let the frog climb on her shell.',
  'She carried him safely to the bank.',
  'The turtles cheered, and Tilly smiled.',
  '"Come play with us!" they said, and she did.'],
 qs:[
  {t:'detail',q:'Where did Tilly carry the frog?',a:'to the bank',d:['to the log','to the reeds','to the deep end'],ev:[5]},
  {t:'sequence',q:'What happened after the baby frog cried for help?',a:'Tilly swam fast and let him climb up',
   d:['The turtles said, "Come play with us!"','The frog fell off the log','Tilly watched from the reeds'],ev:[3,4]},
  {t:'vocab',q:'In this story, "shy" means...',a:'nervous about talking to others',d:['loud and bossy','very fast','hungry and tired'],ev:[0]},
  {t:'main',q:'What is "The Shy Turtle" mostly about?',a:'Tilly helps a frog and makes new friends',
   d:['A frog teaches Tilly how to swim','Tilly wins a big game of tag with the turtles','The turtles move to a new pond'],ev:[3,4,6,7]},
  {t:'infer',q:'Why did the turtles ask Tilly to play?',a:'She was kind and brave',d:['She was the fastest swimmer','She had the biggest shell','She was the oldest turtle'],ev:[4,5,6,7]}]},

{id:'g2f04',g:2,type:'f',title:'The Cookie Surprise',text:[
  'Grandma baked a big batch of cookies.',
  'She set them on the table to cool.',
  'Then the phone rang, and she went to the hall.',
  'Max tiptoed into the kitchen.',
  'He took one cookie, then another, then a third.',
  'When Grandma came back, crumbs were on his shirt.',
  'Max looked down and turned red.',
  '"I am sorry," he said, "I will ask next time."',
  'Grandma smiled and shared a cookie with him.'],
 qs:[
  {t:'detail',q:'Where did Grandma put the cookies to cool?',a:'on the table',d:['in the hall','in a jar','on the porch'],ev:[1]},
  {t:'sequence',q:'What did Max do right after Grandma left the kitchen?',a:'He tiptoed in and took cookies',
   d:['He said he was sorry to her','He baked another big batch','He answered the ringing phone in the hall'],ev:[2,3,4]},
  {t:'vocab',q:'In this story, "batch" means...',a:'a group made at one time',d:['a kind of oven','a loud noise','a small plate'],ev:[0]},
  {t:'main',q:'What is "The Cookie Surprise" mostly about?',a:'Max takes cookies and then says sorry',
   d:['Grandma loses her phone at home','Max bakes cookies with Grandma','Max sells cookies at a small shop'],ev:[3,4,5,7]},
  {t:'infer',q:'How did Max feel when he looked at his shirt?',a:'sorry that he got caught',d:['proud of what he did','sleepy from the long day','full of joy and pride'],ev:[5,6,7]}]},

{id:'g2f05',g:2,type:'f',title:'Zip the Robot',text:[
  'Zip was a small robot who loved to sweep.',
  'One night, his battery ran low and his lights went dim.',
  'Zip rolled slowly to the wall plug.',
  'But the cord was too short to reach.',
  'He beeped for help, and Nina woke up.',
  'She moved the plug to a longer cord.',
  'Soon, Zip\'s lights glowed bright again.',
  '"Thank you," he beeped, and he swept until morning.'],
 qs:[
  {t:'detail',q:'Why could Zip not reach the plug?',a:'The cord was too short',d:['The door was locked','His wheel was broken','Nina was asleep'],ev:[3]},
  {t:'sequence',q:'What did Nina do after she woke up?',a:'She moved the plug to a longer cord',
   d:['She swept the floor for Zip','She turned off all his lights','She gave him a brand new battery pack'],ev:[4,5]},
  {t:'vocab',q:'In this story, "dim" means...',a:'not bright',d:['very loud','very hot','broken in two'],ev:[1]},
  {t:'main',q:'What is "Zip the Robot" mostly about?',a:'Zip needs power and gets help from Nina',
   d:['Zip breaks the kitchen floor','Nina builds a brand new robot','Zip goes to sleep inside a box'],ev:[1,3,4,5,6]},
  {t:'infer',q:'What can you tell about Nina?',a:'She is kind and wants to help',d:['She is afraid of all small robots','She does not like to sweep','She is a robot too'],ev:[4,5,6]}]},

{id:'g2n01',g:2,type:'n',title:'Honey Bees',text:[
  'Honey bees live together in a hive.',
  'Each bee has a job to do.',
  'Some bees fly out to find flowers.',
  'They sip sweet nectar and carry it back.',
  'Other bees stay inside and take care of the babies.',
  'The bees turn nectar into honey.',
  'They store the honey in small wax rooms.',
  'Honey is food that helps the hive through the cold winter.'],
 qs:[
  {t:'detail',q:'What do bees carry back to the hive?',a:'nectar',d:['wax','water','seeds'],ev:[3]},
  {t:'sequence',q:'What do bees do after they bring nectar to the hive?',a:'They turn it into honey',
   d:['They fly out to find flowers','They carry water inside','They build new wax rooms'],ev:[3,5]},
  {t:'vocab',q:'In this passage, "hive" means...',a:'a home where bees live',d:['a big patch of flowers nearby','a jar for honey','a kind of wing'],ev:[0]},
  {t:'main',q:'What is this passage mostly about?',a:'How honey bees live and work',
   d:['How to cook with honey','Why flowers have bright colors','How bees sting people'],ev:[0,1,2,4,5]},
  {t:'infer',q:'What would happen if no bees went to find flowers?',a:'The hive would run out of food',
   d:['The flowers would grow faster','The babies would fly away','The wax rooms would melt'],ev:[2,3,5,7]}]},

{id:'g2n02',g:2,type:'n',title:'The Changing Moon',text:[
  'The moon does not make its own light.',
  'It shines because the sun lights it up.',
  'The moon moves around Earth.',
  'As it moves, we see more or less of its bright side.',
  'First, we see a thin curve in the sky.',
  'Then the curve grows into a half circle.',
  'Later, we see a big round circle.',
  'After that, the shape gets smaller again.'],
 qs:[
  {t:'detail',q:'What lights up the moon?',a:'the sun',d:['Earth','the stars','a lamp'],ev:[1]},
  {t:'sequence',q:'What shape do we see right after the thin curve?',a:'a half circle',d:['a big round circle','no moon at all','a bright star'],ev:[4,5]},
  {t:'vocab',q:'In this passage, "bright" means...',a:'full of light',d:['very small','far away','cold and wet'],ev:[3]},
  {t:'main',q:'What is this passage mostly about?',a:'Why the moon seems to change shape',
   d:['How the sun makes heat','How people travel to visit the moon','Why Earth is round'],ev:[2,3,4,5,6,7]},
  {t:'infer',q:'What would we see if the sun stopped shining on the moon?',a:'The moon would look dark',
   d:['The moon would look bigger','The moon would spin faster','The moon would shine the same'],ev:[0,1]}]},

{id:'g2n03',g:2,type:'n',title:'Frogs Grow Up',text:[
  'A frog starts life as a tiny egg in the water.',
  'After a few days, a tadpole hatches out.',
  'The tadpole has a tail and no legs.',
  'It swims and eats tiny plants.',
  'Soon, back legs grow, and then front legs.',
  'The tail gets shorter and shorter.',
  'At last, a young frog hops onto land.',
  'Now it can live on land and in water.'],
 qs:[
  {t:'detail',q:'What does a tadpole eat?',a:'tiny plants',d:['small fish','big bugs','frog eggs'],ev:[3]},
  {t:'sequence',q:'What grows after the back legs?',a:'front legs',d:['a longer tail','a new egg','two wings'],ev:[4]},
  {t:'vocab',q:'In this passage, "hatches" means...',a:'comes out of an egg',d:['falls into water','grows a long strong tail','jumps very high'],ev:[1]},
  {t:'main',q:'What is this passage mostly about?',a:'How a frog changes as it grows',
   d:['What frogs like to eat','Where frogs sleep at night','How to catch a frog'],ev:[0,1,4,6]},
  {t:'infer',q:'Why does a tadpole need a tail?',a:'to help it swim',d:['to help it hop','to catch its food','to dig in the mud'],ev:[2,3]}]},

{id:'g2n04',g:2,type:'n',title:'Growing a Plant',text:[
  'Plants need a few things to grow.',
  'First, put a seed in soft soil.',
  'Next, water the soil so it stays damp.',
  'Then, set the pot where the sun can shine on it.',
  'After some days, a tiny green shoot pops out.',
  'The shoot keeps growing taller each week.',
  'If you forget the water, the plant will droop.',
  'Daily care helps it stay strong.'],
 qs:[
  {t:'detail',q:'Where should you set the pot?',a:'where the sun can shine on it',d:['in a dark closet','under the bed','in the freezer'],ev:[3]},
  {t:'sequence',q:'What do you do right after you put the seed in the soil?',a:'water the soil',
   d:['set the pot in the sun','wait for a green shoot','pick the plant'],ev:[1,2]},
  {t:'vocab',q:'In this passage, "droop" means...',a:'bend down and look weak',d:['grow very tall','turn bright red in the sun','float away'],ev:[6]},
  {t:'main',q:'What is this passage mostly about?',a:'How to help a seed grow into a plant',
   d:['How to cook with seeds','Why the sun is hot','How to build a pot'],ev:[0,1,2,3,5]},
  {t:'infer',q:'What will happen if you never water the plant?',a:'It will not grow well',
   d:['It will grow faster','It will turn into a tree','It will not need the sun'],ev:[2,6]}]},

{id:'g2n05',g:2,type:'n',title:'Penguins',text:[
  'Penguins are birds that cannot fly.',
  'Their wings work like flippers in the water.',
  'They swim fast to catch fish.',
  'Penguins live in cold places.',
  'A thick layer of fat keeps them warm.',
  'When the wind blows, they stand close together.',
  'Then they take turns standing on the cold outer edge.',
  'This way, every penguin gets to be warm.',
  'Some penguins even carry an egg on their feet.'],
 qs:[
  {t:'detail',q:'What do penguins catch to eat?',a:'fish',d:['bugs','seeds','frogs'],ev:[2]},
  {t:'sequence',q:'What do penguins do after they stand close together?',a:'They take turns on the outer edge',
   d:['They swim far away from the wind','They catch more fish','They grow new feathers'],ev:[5,6]},
  {t:'vocab',q:'In this passage, "flippers" means...',a:'wings that work like paddles',d:['feathers that keep heat','feet that dig holes','tails that point up'],ev:[1]},
  {t:'main',q:'What is this passage mostly about?',a:'How penguins swim and stay warm',
   d:['How birds build nests','Why penguins fly south for winter','What penguins eat at the zoo'],ev:[1,2,4,5,6]},
  {t:'infer',q:'Why do penguins take turns on the outer edge?',a:'So no one stays cold all the time',
   d:['So they can swim faster','Because the middle is empty','To look for more fish'],ev:[5,6,7]}]}
]);
