/* Star School data banks v102. BUILT by tools/build.py from src/data/*.js (sorted): never edit by hand.
   index.html v102 loads this file with <script src="data.v102.js"> between the code and the start-up script. */
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

// ---- grade 3: 90-130 words, 5 questions: main idea, detail, cause and effect, vocabulary, character feeling (stories) or text feature (nonfiction) ----
COMPSPEC[3]={words:[90,130],sent:13,maxSent:18,fk:5,need:['main','detail','cause','vocab']};
compAdd([
{id:'g3f01',g:3,type:'f',title:'The Lost Book',text:[
  'Nina\'s library book was due on Friday, but it was not in her bag.',
  'She looked under her bed and behind the couch.',
  'She even checked the refrigerator, because she had been hungry the last time she read it.',
  'Nina felt worried, since she had promised the librarian she would be on time.',
  'Then she heard giggles from the next room.',
  'Her little brother Leo had stacked blocks into a tall tower, and the book was its roof.',
  '"I needed something flat," he said.',
  'Nina smiled and carefully lifted the book away.',
  'The tower wobbled, so she helped him build a new roof from a cookie tray.',
  'She returned the book on Thursday, one day early.'],
 qs:[
  {t:'main',q:'What is this story mostly about?',a:'Nina searches for a lost book and finds it',
   d:['Nina and Leo build the tallest tower ever','Nina forgets to visit the library','Leo learns how to read a new book'],ev:[0,1,5,9]},
  {t:'detail',q:'Where did Nina find the book?',a:'As the roof of a tall tower',
   d:['Behind the couch','In the refrigerator','Under her bed'],ev:[5]},
  {t:'cause',q:'Why did Nina feel worried?',a:'She had promised to return the book on time',
   d:['She was too hungry to read','Her brother was angry with her','The librarian had lost her card'],ev:[0,3]},
  {t:'vocab',q:'In this story, "wobbled" means...',a:'shook from side to side',
   d:['fell flat on the floor','grew much taller','turned bright red'],ev:[8]},
  {t:'feel',q:'How did Nina feel when she could not find her book?',a:'worried that she might be late',
   d:['proud of her search','sleepy and bored','silly and cheerful'],ev:[3]}]},

{id:'g3f02',g:3,type:'f',title:'Rainy Day Recess',text:[
  'Rain fell all morning, so recess was moved inside.',
  'Kai groaned because he had wanted to play soccer.',
  'The other children sat at their desks with long faces.',
  '"We have no room to run," said Zoe.',
  'Kai looked at the chairs, the mats, and a long rope in the supply closet.',
  '"What if we make a game with these?" he asked.',
  'Soon the class had built an indoor obstacle course.',
  'Each child had to crawl under the rope, hop across the mats, and weave around the chairs.',
  'They timed each other with a clock, and everyone cheered.',
  'At the end of the day, Kai said it was the best rainy day ever.'],
 qs:[
  {t:'main',q:'What is "Rainy Day Recess" mostly about?',a:'A class turns a rainy recess into a fun game',
   d:['A class waits for the rain to stop','Kai wins a soccer game outside','Zoe teaches the class a new song'],ev:[0,4,6,9]},
  {t:'detail',q:'What did the children use to time each other?',a:'a clock',
   d:['a stopwatch','a sand timer','a song'],ev:[8]},
  {t:'cause',q:'Why did the class have recess inside?',a:'It rained all morning',
   d:['The playground was being painted','Kai had hurt his foot','The soccer ball was lost'],ev:[0]},
  {t:'vocab',q:'In this story, "groaned" means...',a:'made a sound of being unhappy',
   d:['laughed out loud','sang a short tune','asked a question'],ev:[1]},
  {t:'feel',q:'How did Kai feel at the end of the day?',a:'happy',
   d:['upset about the rain','tired and grumpy','jealous of Zoe'],ev:[9]}]},

{id:'g3f03',g:3,type:'f',title:'Lemonade for Sale',text:[
  'Marta set up a lemonade stand on the corner and waited.',
  'An hour passed, and nobody stopped.',
  'Then a man bought one cup, took a sip, and made a sour face.',
  '"It needs more sugar," he said politely.',
  'Marta tasted it and agreed, so she stirred in three spoonfuls of sugar.',
  'She also drew a bright sign with big yellow letters.',
  'Soon a line of neighbors stretched down the sidewalk.',
  'By afternoon, the pitcher was empty.',
  'Marta counted her coins and smiled.',
  'Next time, she planned to taste her lemonade first.'],
 qs:[
  {t:'main',q:'What is this story mostly about?',a:'Marta makes her lemonade better',
   d:['Marta wins a big prize','Marta buys a new stand','A man teaches her to draw'],ev:[1,4,5,6]},
  {t:'detail',q:'How much sugar did Marta stir in?',a:'three spoonfuls',
   d:['two spoonfuls','one whole cup','a pinch'],ev:[4]},
  {t:'cause',q:'Why did Marta add more sugar?',a:'The lemonade tasted too sour',
   d:['The sign was hard to read','She ran out of cups','Her neighbors asked for ice'],ev:[2,3,4]},
  {t:'vocab',q:'In this story, "politely" means...',a:'in a kind way',
   d:['in a loud voice','with a big grin','in a rush'],ev:[3]},
  {t:'feel',q:'How did Marta feel when she counted her coins?',a:'pleased with her work',
   d:['worried about the sour taste','angry at the man','too tired to count'],ev:[8]}]},

{id:'g3f04',g:3,type:'f',title:'Eli and the Puppy',text:[
  'Eli found a small brown puppy shivering near the bus stop.',
  'It had no collar, so he could not tell who owned it.',
  'Eli carried the puppy home and gave it a bowl of water.',
  '"We must find its family," he told his mom.',
  'Together they made a poster with a drawing of the puppy and their phone number.',
  'They taped it to the lamp posts along Maple Street.',
  'That evening, the phone rang.',
  'A girl named Rosa said her puppy, Pepper, had slipped out the gate.',
  'When Rosa arrived, Pepper leaped into her arms and licked her chin.',
  'Eli felt a little sad to say goodbye, but mostly he felt proud.'],
 qs:[
  {t:'main',q:'What is this story mostly about?',a:'Eli helps a lost puppy get home',
   d:['Eli gets a new pet puppy','Rosa teaches Eli to draw','A bus stop is moved to Maple Street'],ev:[0,3,4,8]},
  {t:'detail',q:'What was on the poster?',a:'a drawing of the puppy',
   d:['a map of Maple Street','a photo of Rosa','a picture of the bus stop'],ev:[4]},
  {t:'cause',q:'Why could Eli not tell who owned the puppy?',a:'The puppy had no collar',
   d:['The puppy ran away from him','Nobody was at the bus stop','His mom said it was too late'],ev:[1]},
  {t:'vocab',q:'In this story, "shivering" means...',a:'shaking from the cold',
   d:['running very fast','sleeping on the ground','barking loudly'],ev:[0]},
  {t:'feel',q:'How did Eli feel at the end of the story?',a:'proud, with a little sadness',
   d:['bored and sleepy','angry at Rosa','afraid of the puppy'],ev:[9]}]},

{id:'g3f05',g:3,type:'f',title:'Dev\'s Paper Boat',text:[
  'Dev built a boat from paper for the class boat race.',
  'He set it on the water, and it sank in a few seconds.',
  'His teammates frowned, and Dev felt like giving up.',
  'Then he remembered that wax keeps water out.',
  'He rubbed a candle stub along the bottom and sides until they shone.',
  'When he tried again, the boat floated across the tub.',
  'Then he added three pennies as cargo, and it still floated.',
  'The class clapped when his boat crossed the finish line first.',
  'Dev learned that one small change can fix a big problem.'],
 qs:[
  {t:'main',q:'What is this story mostly about?',a:'Dev fixes his boat so that it floats',
   d:['Dev loses the boat race on purpose','Dev collects pennies from his class','Dev builds a boat out of candles'],ev:[1,3,4,5]},
  {t:'detail',q:'What did Dev rub on the boat?',a:'a candle stub',
   d:['a wet sponge','a coat of paint','a piece of tape'],ev:[4]},
  {t:'cause',q:'Why did the boat float the second time?',a:'The wax kept the water out',
   d:['The pennies made it heavier','The tub was filled with less water','His teammates held it up'],ev:[3,4,5]},
  {t:'vocab',q:'In this story, "cargo" means...',a:'things a boat carries',
   d:['the sails of a boat','a prize for the winner','the front end of a boat'],ev:[6]},
  {t:'feel',q:'How did Dev feel right after his boat sank?',a:'ready to give up',
   d:['excited to race','proud of his work','calm and sleepy'],ev:[2]}]},

{id:'g3n01',g:3,type:'n',title:'How Bees Make Honey',text:[
  'Honey bees make honey from a sweet liquid called nectar.',
  'First, a worker bee visits flowers and drinks nectar with her long tongue.',
  'She stores the nectar in a special stomach and flies back to the hive.',
  'There, other bees mix the nectar in their mouths and pass it along.',
  'Next, the bees spread the nectar into wax cells.',
  'They fan their wings to dry it out until it becomes thick honey.',
  'Finally, they cover each cell with a lid of wax.',
  'The honey stays safe inside until the bees need food in winter.'],
 qs:[
  {t:'main',q:'What is this passage mostly about?',a:'How bees turn nectar into honey',
   d:['How bees build wax hives','Why flowers grow in spring','How bees keep warm in winter'],ev:[0,1,3,5]},
  {t:'detail',q:'What does a worker bee use to drink nectar?',a:'her long tongue',
   d:['her sharp stinger','her wings','her six legs'],ev:[1]},
  {t:'cause',q:'Why do bees fan their wings over the honey?',a:'To dry it until it is thick',
   d:['To cool the hive down for winter','To call other bees to the flowers','To keep ants out of the cells'],ev:[5]},
  {t:'vocab',q:'In this passage, the "hive" is...',a:'the home where bees live',
   d:['a flower that makes nectar','a tool for making wax','a kind of honey'],ev:[2]},
  {t:'feature',q:'The words "First," "Next," and "Finally" are used to show...',a:'the order of the steps',
   d:['which bee is the biggest','where the flowers grow','how much honey is made'],ev:[1,4,6]}]},

{id:'g3n02',g:3,type:'n',title:'Shapes of the Moon',text:[
  'The Moon does not make its own light.',
  'It shines because it reflects light from the Sun.',
  'The Sun always lights up half of the Moon.',
  'As the Moon travels around Earth, we see different amounts of that bright half.',
  'This is why the Moon seems to change shape.',
  'When we see the whole bright half, it is called a full moon.',
  'When the bright half faces away from us, we cannot see it, and that is a new moon.',
  'It takes about one month for the Moon to go through all of its shapes.',
  'Then the pattern begins again.'],
 qs:[
  {t:'main',q:'What is this passage mostly about?',a:'Why the Moon changes shape',
   d:['How the Sun makes its own light','How far away the Moon is from Earth','Why the Sun rises each morning'],ev:[3,4,7]},
  {t:'detail',q:'What does the Moon reflect?',a:'light from the Sun',
   d:['heat from Earth','light from the stars','water from the sea'],ev:[1]},
  {t:'cause',q:'Why does the Moon seem to change shape?',a:'We see more or less of its bright half as it moves',
   d:['Earth blocks the Moon every night','The Moon makes less light each week','Clouds cover part of the Moon'],ev:[3,4]},
  {t:'vocab',q:'In this passage, "reflects" means...',a:'bounces back',
   d:['gives away','soaks up','turns off'],ev:[1]},
  {t:'feature',q:'What does the title tell the reader?',a:'It explains why the Moon changes',
   d:['It tells a story about a girl','It lists the planets in order','It shows how to make a telescope'],ev:[4]}]},

{id:'g3n03',g:3,type:'n',title:'Rain Forest Layers',text:[
  'A rain forest has four layers, and each one is home to different living things.',
  'The tallest trees poke out above the rest in the top layer, called the emergent layer.',
  'Below it is the canopy, where leaves grow so thick that they form a green roof.',
  'Many monkeys, birds, and frogs live in the canopy.',
  'The understory is darker and has small trees and bushes.',
  'On the forest floor, it is dim and damp.',
  'Only a little sunlight can get through the thick leaves above.',
  'Because of this, few plants grow on the ground.',
  'Fallen leaves rot quickly there and feed the soil.'],
 qs:[
  {t:'main',q:'What is this passage mostly about?',a:'The four layers of a rain forest',
   d:['The animals of a desert','How trees grow from seeds','Why rain forests get so much rain'],ev:[0,2,4,5]},
  {t:'detail',q:'Which animals live in the canopy?',a:'monkeys, birds, and frogs',
   d:['snakes, bats, and ants','deer, wolves, and bears','fish, turtles, and crabs'],ev:[3]},
  {t:'cause',q:'Why do few plants grow on the forest floor?',a:'Only a little sunlight reaches the ground',
   d:['The soil is too dry','Too many monkeys live there','The trees drop too few leaves'],ev:[6,7]},
  {t:'vocab',q:'In this passage, "dim" means...',a:'not very bright',
   d:['very loud','full of animals','hot and dry'],ev:[5]},
  {t:'feature',q:'How does the passage help you understand the word "canopy"?',a:'It says the leaves form a green roof',
   d:['It shows a picture of a monkey','It lists the animals that eat leaves','It puts the word in a title'],ev:[2]}]},

{id:'g3n04',g:3,type:'n',title:'How Maps Help Us',text:[
  'A map is a drawing that shows where places are.',
  'Most maps have a key that explains the small pictures, called symbols.',
  'A tree symbol might show a park, and a blue line might show a river.',
  'Many maps also have a compass rose, which points out north, south, east, and west.',
  'If you know which way is north, you can tell which way to walk.',
  'Some maps have a scale, too.',
  'The scale tells how far a short line on the map is in real life.',
  'For example, one inch on the map might equal one mile on the ground.',
  'With these tools, a map can guide you to a place you have never visited.'],
 qs:[
  {t:'main',q:'What is this passage mostly about?',a:'The parts of a map and how they help us',
   d:['How to draw a picture of a park','Why rivers are blue','Where the oldest maps were found'],ev:[0,1,3,5,8]},
  {t:'detail',q:'What does the key of a map explain?',a:'the small pictures',
   d:['the names of cities','the age of the map','the best road to take'],ev:[1]},
  {t:'cause',q:'Why is a compass rose useful?',a:'It shows which way is north, south, east, and west',
   d:['It tells how long a trip will take','It shows where the rivers begin','It lists the streets in order'],ev:[3,4]},
  {t:'vocab',q:'In this passage, "symbols" are...',a:'small pictures that stand for things',
   d:['long roads between towns','the names of mapmakers','words printed in red'],ev:[1]},
  {t:'feature',q:'Which part of a map tells how far apart two places are?',a:'the scale',
   d:['the key','the compass rose','the title'],ev:[5,6]}]},

{id:'g3n05',g:3,type:'n',title:'How Seeds Travel',text:[
  'Plants cannot walk, so their seeds need other ways to travel.',
  'Some seeds, like those of the dandelion, have fluffy parts that catch the wind.',
  'The wind carries them far from the parent plant.',
  'Other seeds, such as burrs, have tiny hooks.',
  'These hooks stick to the fur of passing animals.',
  'The animals carry the seeds along until they brush them off.',
  'Later, the seeds drop to the ground and begin to grow.',
  'Coconuts travel by water.',
  'A coconut can float across the sea and sprout on a faraway beach.',
  'Moving away gives young plants room to grow.'],
 qs:[
  {t:'main',q:'What is this passage mostly about?',a:'Ways that seeds travel to new places',
   d:['How animals find food in the fur','Why dandelions are yellow','How to plant a garden at home'],ev:[0,1,3,6]},
  {t:'detail',q:'What do burrs have that lets them stick to fur?',a:'tiny hooks',
   d:['fluffy parts','a hard shell','sweet juice'],ev:[3,4]},
  {t:'cause',q:'Why can dandelion seeds travel far?',a:'Their fluffy parts catch the wind',
   d:['They float on the sea','Animals eat them and fly away','Their roots pull them along'],ev:[1,2]},
  {t:'vocab',q:'In this passage, "sprout" means...',a:'start to grow',
   d:['float away','break open','dry out'],ev:[8]},
  {t:'feature',q:'Why does the writer name the dandelion, the burr, and the coconut?',a:'They are examples of different ways seeds travel',
   d:['They are the only plants in the world','They are all grown in the same garden','They are the largest seeds'],ev:[1,3,7]}]}
]);

// ---- grade 4 (P2-27): 130-180 words, 5 questions: main idea, inference, summary choice, vocabulary, and theme (fiction) or text structure (nonfiction) ----
// comp level 5 (fiction), info level 3 (nonfiction)
COMPSPEC[4]={words:[130,180],sent:17,maxSent:24,fk:7,need:{f:['main','infer','summary','vocab','theme'],n:['main','infer','summary','vocab','structure']}};
compAdd([
{id:'g4f01',g:4,type:'f',title:'The Tuba Problem',text:[
  'Tomás was the smallest kid in the school band, and he had been given the biggest instrument, a shiny brass tuba.',
  'Every time he blew into it, the tuba let out a loud honk like an angry goose.',
  'The other students giggled, and Tomás wanted to quit.',
  '"Every player sounds funny at first," said Ms. Reyes, the band teacher.',
  'She showed him how to sit tall and breathe from his belly instead of his cheeks.',
  'That night Tomás practiced in the garage for twenty minutes, even though his lips felt tired.',
  'He practiced again the next day, and the next.',
  'By Friday, the honks had turned into low, round notes.',
  'At the school concert, the band played a slow song, and Tomás\'s deep notes held the whole tune together.',
  'When it ended, the same students who had giggled cheered the loudest.'],
 qs:[
  {t:'main',q:'What is this story mostly about?',a:'Tomás gets better at the tuba by practicing',
   d:['Tomás is picked to lead the school band','A teacher gets upset about a goose in the music room','Tomás trades his tuba for a smaller instrument'],ev:[0,5,7,8]},
  {t:'infer',q:'Why did the students who had giggled cheer the loudest at the end?',a:'They were surprised by how well he played',
   d:['Ms. Reyes had asked them to cheer','They wanted the long concert to be over','They still thought the tuba was a funny sound'],ev:[9,8]},
  {t:'summary',q:'Which sentence is the best summary of the story?',a:'A boy practices until he can play the tuba well',
   d:['A band gets in trouble for being too noisy','A boy quits the band because others laugh at him','A boy wins a prize for the loudest tuba honk'],ev:[0,4,7,9]},
  {t:'vocab',q:'In this story, "giggled" means...',a:'laughed in a quiet, silly way',d:['shouted in an angry voice','whispered a secret to a friend nearby','clapped with excitement'],ev:[2]},
  {t:'theme',q:'Which lesson does this story teach?',a:'With steady practice, a hard thing gets easier',
   d:['Small kids should wait to join a band','It is best to quit when others laugh','Loud music is better than quiet music'],ev:[4,5,6,7]}]},

{id:'g4f02',g:4,type:'f',title:'The Whale Book',text:[
  'Priya loved the library book about whales, and she had read it three times before it was due on Friday.',
  'On Thursday night, she looked for the book so she could pack it, but it was nowhere in sight.',
  'She searched under her bed, behind the couch, and inside every drawer.',
  'Her stomach felt tight, and for a moment she thought about pretending she had never borrowed it.',
  'Then she remembered Mr. Okafor saying that mistakes are easy to fix when people are honest.',
  'In the morning, Priya went to the desk and told him the whole truth.',
  '"I lost your whale book," she said quietly. "I am so sorry."',
  'Mr. Okafor, the librarian, smiled and said that books get lost all the time.',
  'He asked her to look one more time while he helped the next child.',
  'Priya unzipped the small pocket of her backpack, the one she never used, and there was the book.',
  'She handed it over with a huge grin, glad she had told the truth instead of hiding it.'],
 qs:[
  {t:'main',q:'What is this story mostly about?',a:'Priya tells the truth about a lost library book',
   d:['Priya reads a book about whales three times','A librarian loses a book and asks a child for help','Priya decides to keep a book that she loves'],ev:[1,5,6,10]},
  {t:'infer',q:'How did Priya most likely feel as she walked to the library desk?',a:'nervous, but ready to do the right thing',
   d:['proud that she had kept a secret','bored and eager to get home','angry at the librarian for asking'],ev:[5,3]},
  {t:'summary',q:'Which sentence is the best summary of the story?',a:'After losing a book, a girl admits it and then finds it',
   d:['A girl hides a lost book so no one will find out','A librarian looks all over school for a lost book','A girl reads a whale book three times and then moves away'],ev:[1,5,9,10]},
  {t:'vocab',q:'In this story, "honest" means...',a:'telling the truth',d:['working very fast','keeping quiet about things','being very polite'],ev:[4]},
  {t:'theme',q:'Which lesson does this story teach?',a:'Telling the truth is better than hiding a mistake',
   d:['You should always keep a book in your backpack','It is smart to search every room before you ask for help','Librarians do not mind when a book is lost for good'],ev:[4,5,10]}]},

{id:'g4f03',g:4,type:'f',title:'Lena\'s Rainy Day Stand',text:[
  'Lena had saved lemons, sugar, and cups for weeks so she could open a lemonade stand on Saturday.',
  'When she woke up, gray clouds hung low and a chilly rain tapped on the window.',
  'Lena set up her table anyway and waited under a big umbrella.',
  'An hour passed, and not one person stopped, because nobody wants a cold drink on a cold day.',
  'She was ready to pack up and go inside.',
  'Then her grandfather brought out a pot of warm apple cider and a bag of cinnamon sticks.',
  'Lena had an idea.',
  'She crossed out the word lemonade on her sign and wrote warm cider instead.',
  'Soon neighbors in raincoats lined up, holding out their coins for a hot cup.',
  'By noon the pot was empty, and Lena had earned more than she had planned.'],
 qs:[
  {t:'main',q:'What is this story mostly about?',a:'Lena changes her plan so her stand works in the rain',
   d:['Lena wins a prize for the best lemonade in town','Lena and her grandfather bake apple pies for a fair','Lena gives up and waits inside for the sun to come out'],ev:[1,3,5,7,9]},
  {t:'infer',q:'Why did the neighbors line up for the cider?',a:'A hot drink felt good on a chilly, rainy day',
   d:['They had already bought lemonade from Lena earlier','Lena sold it for less than any other stand','Her new sign was the biggest one on the street'],ev:[8,3]},
  {t:'summary',q:'Which sentence is the best summary of the story?',a:'Rain spoils her plan, so Lena sells warm cider',
   d:['Lena sells all her lemonade by noon on a sunny day','Lena\'s grandfather runs the stand while she watches','Lena waits in the rain and then goes home'],ev:[1,3,5,7,9]},
  {t:'vocab',q:'In this story, "chilly" means...',a:'cool enough to feel cold',d:['bright and sunny','noisy and loud','warm and cozy by the fire'],ev:[1]},
  {t:'theme',q:'Which lesson does this story teach?',a:'When a plan fails, a new idea can save the day',
   d:['Cold drinks sell best when it rains','You should never change a sign once it is made','Grandparents always know what to do'],ev:[4,6,7,9]}]},

{id:'g4f04',g:4,type:'f',title:'The Big Crumb',text:[
  'Early one morning, Ruby the ant found a crumb of bread that was bigger than she was.',
  '"Dinner for the whole colony!" she cheered.',
  'She pushed with all her might, but the crumb would not budge.',
  'Her friend Otis came to help, yet two ants could not move it either.',
  'Soon more ants arrived, and each one pushed from a different side.',
  'The crumb only wobbled in place while the ants bumped into one another and grumbled.',
  'Then old Mabel climbed onto a pebble and called, "Everyone, line up on this side, and push when I count to three!"',
  'The ants squeezed into one long row and pushed together.',
  'The crumb began to slide, slowly at first and then faster, all the way to the nest.',
  'That night, the whole colony shared the feast.'],
 qs:[
  {t:'main',q:'What is this story mostly about?',a:'Ants find a way to move a crumb that is too big for one',
   d:['An ant builds a new nest under a pebble by the path','Two ants race to see who is faster','Mabel gets lost on her way home'],ev:[0,2,6,7,8]},
  {t:'infer',q:'Why did the crumb only wobble when many ants first came to help?',a:'They pushed from different sides instead of together',
   d:['The ants were too tired from digging all night','The crumb was stuck fast to the ground by sticky tree sap','Ruby told everyone to stop pushing'],ev:[4,5]},
  {t:'summary',q:'Which sentence is the best summary of the story?',a:'The ants move a big crumb by pushing together',
   d:['Ruby eats a crumb alone and goes back to the nest','Otis and Ruby carry a crumb while others watch','Mabel finds a pebble and uses it to carry food'],ev:[0,2,6,7,8]},
  {t:'vocab',q:'In this story, "budge" means...',a:'move even a little',d:['break into pieces','taste very sweet and sticky','fall over'],ev:[2]},
  {t:'theme',q:'Which lesson does this story teach?',a:'Teamwork can solve problems one alone cannot',
   d:['The biggest ant is always the strongest','Grumbling helps a job get done faster','Food tastes best when it is eaten at night'],ev:[3,5,7,8]}]},

{id:'g4f05',g:4,type:'f',title:'Room 12',text:[
  'On his first day at Maple School, Amir walked into Room 12 holding his backpack straps tightly.',
  'Everyone else already knew each other, and no one seemed to notice him.',
  'At lunch, he sat at the end of a long table and drew tiny dragons on his napkin.',
  'Chloe, who sat across from him, leaned over and asked, "Did you draw those?"',
  'Amir nodded, a little shy.',
  'That afternoon, Mr. Park asked the class to make a poster for the science fair, but nobody could decide what to put on it.',
  'Chloe said that Amir should draw the picture.',
  'Amir sketched a bold, colorful volcano, and the others added labels and facts.',
  'When the poster was finished, the whole class clapped.',
  'At recess, three kids asked him to join their game, and Amir\'s shoulders finally relaxed.'],
 qs:[
  {t:'main',q:'What is this story mostly about?',a:'A new student makes friends by sharing his art',
   d:['A class argues about which science fair to join','Mr. Park teaches the class all about volcanoes','Chloe loses her lunch and a new student helps'],ev:[2,3,6,7,9]},
  {t:'infer',q:'Why was Amir holding his backpack straps tightly on the first day?',a:'He felt nervous about being new',
   d:['He was in a hurry to get to lunch','His backpack was too heavy to carry','He wanted to leave before class began'],ev:[0,1]},
  {t:'summary',q:'Which sentence is the best summary of the story?',a:'A shy new student shares his art and makes friends',
   d:['A student draws dragons all day and wins a big prize','A teacher asks Chloe to judge a science fair','A new student decides to sit alone at lunch'],ev:[1,2,6,7,9]},
  {t:'vocab',q:'In this story, "bold" means...',a:'strong and easy to see',d:['small and faint','plain and gray','smooth and cold'],ev:[7]},
  {t:'theme',q:'Which lesson does this story teach?',a:'Sharing what you do well can help you make friends',
   d:['It is best to eat lunch alone','Science fair posters are the best part of every school day','Being new is always easy for everyone'],ev:[2,6,7,9]}]},

{id:'g4n01',g:4,type:'n',title:'How Paper Is Made',text:[
  'Most paper starts as a tree.',
  'First, workers cut logs into small chips about the size of a coin.',
  'The chips are cooked in water and chemicals until they break apart.',
  'This makes a wet, mushy mix called pulp.',
  'Next, the pulp is washed, and sometimes it is bleached to make it white.',
  'Then it is spread in a thin layer on a long moving screen.',
  'Water drips through the tiny holes in the screen, but the wood fibers stay on top.',
  'Heavy rollers press the layer flat and squeeze out more water.',
  'After that, hot rollers dry the sheet until it is stiff.',
  'The fibers lock together as they dry, and that is what makes paper strong.',
  'Finally, the long sheet is rolled up and cut into smaller pieces.',
  'Many mills also mix old paper into the pulp, which saves trees.'],
 qs:[
  {t:'main',q:'What is this passage mostly about?',a:'How paper is made from trees',
   d:['Why trees grow so tall','How to fold paper into shapes','Why some paper is white'],ev:[0,1,3,10]},
  {t:'infer',q:'Why does the screen need tiny holes?',a:'So water can drain while fibers stay',
   d:['So the pulp turns white','So the rollers can grab the sheet','So the chips get smaller'],ev:[6]},
  {t:'summary',q:'Which sentence is the best summary of the passage?',a:'Wood is cooked into pulp, then pressed and dried into paper',
   d:['Trees are cut down and sold as logs','Paper is cut into pieces and sold','Pulp is a wet mix that is hard to use'],ev:[1,3,7,8]},
  {t:'vocab',q:'In this passage, "pulp" means...',a:'a wet, mushy mix of wood',d:['a hard wooden chip','a thin dry sheet','a heavy metal roller'],ev:[3]},
  {t:'structure',q:'How is this passage mostly organized?',a:'It tells steps in time order',
   d:['It compares two kinds of trees','It explains a problem and its solution','It describes one place in detail'],ev:[1,4,5,8,10]}]},
{id:'g4n02',g:4,type:'n',title:'Frogs and Toads',text:[
  'Frogs and toads look alike, and they are close relatives.',
  'Both are amphibians, so both begin life in water as tadpoles and later grow legs and lungs.',
  'Both eat insects, which they catch with a long, sticky tongue.',
  'Still, there are some clear differences.',
  'Most frogs have smooth, moist skin, while most toads have dry, bumpy skin.',
  'Frogs have long back legs that help them leap far, but toads have shorter legs and take small hops.',
  'Frogs stay close to ponds and streams, where it is easy to keep their skin moist.',
  'Toads spend more time on dry land and go to water mainly to lay eggs.',
  'Many frogs also have webbed back feet, which help them swim well.',
  'Knowing these clues can help you tell the two animals apart when you see one outdoors.'],
 qs:[
  {t:'main',q:'What is this passage mostly about?',a:'How frogs and toads are alike and different',
   d:['How tadpoles grow into frogs','Where frogs and toads find insects','Why toads have dry, bumpy skin'],ev:[0,3,4,5,7]},
  {t:'infer',q:'A bumpy animal with short legs is found far from any pond. It is most likely...',a:'a toad',
   d:['a frog','a young tadpole','a kind of insect'],ev:[7,4,5]},
  {t:'summary',q:'Which sentence is the best summary of the passage?',a:'Frogs and toads are related, but differ in key ways',
   d:['Frogs and toads are really one animal with two names','Toads catch insects much better than frogs do','Amphibians spend their whole lives in the water'],ev:[0,4,5,7]},
  {t:'vocab',q:'In this passage, "leap" means...',a:'jump a long way',d:['crawl very slowly','dig a deep hole','swim underwater'],ev:[5]},
  {t:'structure',q:'How is this passage mostly organized?',a:'It shows how two things are alike and different',
   d:['It tells what happens first, next, and last in time','It names a problem and then solves it','It gives a cause and then lists its effects'],ev:[0,2,3,4]}]},

{id:'g4n03',g:4,type:'n',title:'Why We Have Seasons',text:[
  'Many places on Earth have warm summers and cold winters.',
  'Some people think Earth moves closer to the sun in summer, but that is not the reason.',
  'The real cause is that Earth is tilted.',
  'Earth spins around an imaginary line called its axis, and that line leans to one side.',
  'As Earth travels around the sun each year, the lean always points the same way in space.',
  'For part of the year, the top half of Earth leans toward the sun.',
  'Sunlight hits that half more directly, and its days are longer, so it has summer.',
  'At the same time, the bottom half leans away from the sun and has winter.',
  'Six months later, the two halves trade places.',
  'That is why it can be summer in Australia while it is winter in Canada.',
  'Without the tilt, there would be almost no seasons at all.'],
 qs:[
  {t:'main',q:'What is this passage mostly about?',a:'Why Earth has seasons',
   d:['How fast Earth spins each day','Why the sun is so hot','How people travel to Australia'],ev:[2,5,6,7]},
  {t:'infer',q:'A town in the bottom half of Earth is having summer. What is true about the top half?',a:'It is having winter',
   d:['It is having summer too','It has stopped spinning','It is closer to the sun'],ev:[5,7,8]},
  {t:'summary',q:'Which sentence is the best summary of the passage?',a:'Earth\'s tilt makes each half face the sun at different times',
   d:['Earth moves closer to the sun every summer','The sun gets hotter in summer and cooler in winter','Australia and Canada always have the same weather'],ev:[2,4,5,8]},
  {t:'vocab',q:'In this passage, "axis" means...',a:'an imaginary line Earth spins around',d:['a path around the sun','a kind of season','a line on a map'],ev:[3]},
  {t:'structure',q:'How is this passage mostly organized?',a:'It explains a cause and its effects',
   d:['It lists steps for making something','It tells a story about a family trip','It describes one animal using facts'],ev:[2,6,7,10]}]},
{id:'g4n04',g:4,type:'n',title:'Lighthouses',text:[
  'Long ago, sailors faced a big problem at night.',
  'Rocky coasts were hard to see in the dark, and ships could crash into hidden rocks.',
  'To solve it, people built tall towers called lighthouses along the shore.',
  'At the top of each tower, a strong light shone out across the water.',
  'Later, a curved glass lens gathered the light into a bright beam that could be seen from many miles away.',
  'Each lighthouse flashes in its own pattern, so a sailor can tell which one it is.',
  'A captain can match the pattern to a map and learn where the ship is.',
  'In fog, some lighthouses also sound a loud horn to warn ships.',
  'Today, most ships also use computers and satellites to find their way, but many lighthouses still shine.'],
 qs:[
  {t:'main',q:'What is this passage mostly about?',a:'How lighthouses help ships stay safe',
   d:['How sailors build tall towers','Why ships sail only at night','How satellites find rocky coasts'],ev:[1,2,5,6]},
  {t:'infer',q:'Why were lighthouses built as tall towers?',a:'A high light can be seen from farther away',
   d:['Tall towers kept fog from reaching the shore','Short towers cost too much to build','Sailors liked to climb up and rest'],ev:[2,4]},
  {t:'summary',q:'Which sentence is the best summary of the passage?',a:'Lighthouses use light and signals to guide ships',
   d:['Sailors avoid the sea at night and in fog','Satellites have replaced all lighthouses today','Lighthouses store lenses for ships that need them'],ev:[1,2,5,7]},
  {t:'vocab',q:'In this passage, "lens" means...',a:'a curved piece of glass that bends light',
   d:['a tall stone tower on a hill','a loud horn that warns ships','a paper map of the coast'],ev:[4]},
  {t:'structure',q:'How is this passage mostly organized?',a:'It names a problem and tells how it was solved',
   d:['It describes steps in order','It compares two kinds of towers','It tells how one event caused another'],ev:[0,1,2]}]},

{id:'g4n05',g:4,type:'n',title:'The Clever Octopus',text:[
  'An octopus is a sea animal with a soft body and eight strong arms.',
  'With no bones, an octopus can squeeze through a space almost as small as its beak, the only hard part of its body.',
  'This helps it hide in narrow cracks between rocks on the sea floor.',
  'An octopus also hides by changing color.',
  'Special cells in its skin let it match the sand, rocks, or seaweed around it.',
  'If a hungry fish gets close, an octopus can squirt a cloud of dark ink and dart away.',
  'Octopuses are also very smart for animals without a backbone.',
  'In labs, they have learned to open jars and find their way through mazes.',
  'In the wild, octopuses mostly eat crabs, shrimp, and clams.',
  'Strangest of all, an octopus has three hearts and blue blood.'],
 qs:[
  {t:'main',q:'What is this passage mostly about?',a:'The special body and skills of an octopus',
   d:['How octopuses lay eggs in the sea','Why mazes are hard for fish','How hearts pump blue blood'],ev:[0,1,3,6,9]},
  {t:'infer',q:'Why is it hard for a hungry fish to catch an octopus?',a:'The octopus can hide, squirt ink, and swim away fast',
   d:['The octopus is bigger than most fish','Its hard beak breaks the fish\'s teeth','It lives only in very deep water, far away from all fish'],ev:[5,3,2]},
  {t:'summary',q:'Which sentence is the best summary of the passage?',a:'An octopus is a soft, clever animal that can hide well',
   d:['An octopus is a hard-shelled animal that rests on sand','An octopus has arms and spends its life in mazes','An octopus is a large fish that is easy to catch'],ev:[0,2,4,7]},
  {t:'vocab',q:'In this passage, "dart" means...',a:'move away quickly',d:['sink slowly','sleep deeply','grow larger'],ev:[5]},
  {t:'structure',q:'How is this passage mostly organized?',a:'It describes one animal using facts and examples',
   d:['It lists steps in time order from first to last one','It compares two sea animals','It gives a problem and a solution'],ev:[0,3,6,9]}]}
]);

// ---- grade 5: 180-230 words, 5 questions: inference with evidence, compare, point of view, vocabulary, theme (fiction) or author's purpose (nonfiction) ----
COMPSPEC[5]={words:[180,230],sent:17,maxSent:26,fk:8.5,need:['infer','compare','pov','vocab']};
compAdd([
{id:'g5f01',g:5,type:'f',title:'Sam\'s Soccer Switch',text:[
  'Sam had one dream on the soccer field, and it was to score goals.',
  'At every practice, he stood near the other team\'s net and waited for the ball.',
  'So he was upset when Coach Diaz moved him to defense for the Saturday game.',
  '"Defenders just kick the ball away," he muttered to his friend Jada, who played goalie.',
  'Jada shrugged and said that scoring means little if the other team scores more.',
  'At the game, the other team\'s fastest player kept racing toward the net.',
  'Sam stayed back, watched her feet, and stepped in front of the ball again and again.',
  'Each time, he sent a long pass up the field to a teammate.',
  'One of those passes led to the only goal of the first half.',
  'Sam felt a warm glow when his team cheered for him.',
  'In the last minute, the fast player broke free, but Sam slid in and stole the ball.',
  'The whistle blew, and his team won by one goal.',
  'After the game, Coach Diaz said that a team needs players who stop goals as well as players who score them.',
  'Sam grinned and asked if he could play defense again next week.'],
 qs:[
  {t:'infer',q:'What does Sam\'s last question to the coach show?',a:'He now sees defense as an important job.',
   d:['He wants to quit the team.','He is still upset about the move.','He wants to play goalie like Jada.'],ev:[13,9]},
  {t:'compare',q:'How did Sam\'s view of defense at the start differ from his view at the end?',a:'First it seemed dull, then it seemed important.',
   d:['First it seemed fun, then it seemed boring.','First it seemed scary, then it seemed silly.','First it seemed unfair, then it seemed too easy.'],ev:[3,12,13]},
  {t:'pov',q:'How does Jada see Sam\'s complaint?',a:'Scoring matters little if the team lets in more.',
   d:['Defense is a job for players who cannot score.','Sam should ask to join another team.','Defenders are the most important players.'],ev:[4]},
  {t:'vocab',q:'In this story, "muttered" means...',a:'said in a low, unhappy voice',
   d:['shouted with joy','sang a happy tune','whispered a secret'],ev:[3]},
  {t:'theme',q:'Which sentence states the lesson of this story?',a:'Each player\'s job helps the whole team.',
   d:['Only the players who score can win games.','Fast players do not need any teammates.','Coaches should never change a plan.'],ev:[8,10,12]}]},

{id:'g5f02',g:5,type:'f',title:'The Quilt for Grandpa',text:[
  'Last winter, my sister Rosa and I decided to sew a quilt for Grandpa\'s birthday.',
  'We had twelve squares to fill, and we did not agree on a single one.',
  'I wanted a pattern of blue waves, because Grandpa loved the sea.',
  'Rosa wanted yellow stars, because he always told his stories under the night sky.',
  'We argued all afternoon, and Rosa finally stormed off to her room.',
  'I sat alone with the fabric and felt a knot in my stomach.',
  'Then I remembered that Grandpa liked to say a good story needs both a sea and a sky.',
  'I knocked on Rosa\'s door and held out a blue square with one small yellow star.',
  'She studied it for a moment and began to smile.',
  '"What if the bottom of the quilt is the sea and the top is the sky?" she asked.',
  'We spent the next week sewing waves along the bottom and stars along the top.',
  'Each of us taught the other our favorite stitch.',
  'On his birthday, Grandpa ran his fingers over the stitches and said it was the best gift he had ever gotten.',
  'I was proud that we had made it together, even though we had started out as rivals.'],
 qs:[
  {t:'infer',q:'How did the narrator feel after Rosa stormed off?',a:'Sad and worried about the fight',
   d:['Proud of the blue waves','Sleepy after a long day','Angry at Grandpa'],ev:[5,4]},
  {t:'compare',q:'How were the sisters\' first ideas different?',a:'One wanted blue waves, and one wanted yellow stars.',
   d:['One wanted a plain quilt, and one wanted stripes.','One wanted to sew a quilt, and one wanted to buy it.','One wanted a small quilt, and one wanted a huge one.'],ev:[2,3]},
  {t:'pov',q:'From whose point of view is the story told?',a:'The sister who wanted blue waves',
   d:['Rosa, who wanted yellow stars','Grandpa, who received the quilt','A neighbor who watched them sew'],ev:[0,2]},
  {t:'vocab',q:'In this story, "studied" means...',a:'looked at it carefully',
   d:['sewed it together','put it away','forgot all about it'],ev:[8]},
  {t:'theme',q:'Which idea is the theme of the story?',a:'Joining two ideas can beat either one alone.',
   d:['Arguing is the best way to make a choice.','Sisters should avoid making gifts together.','Store gifts are always better than made ones.'],ev:[9,10,13]}]},

{id:'g5f03',g:5,type:'f',title:'Hiro and the Missing Key',text:[
  'Hiro came home from school and found that his house key was not in his backpack.',
  'His parents were at work, and the front door was locked.',
  'At first, he dumped everything out on the porch and shoved it all back in, but the key still did not appear.',
  'He felt his heart pounding and wanted to run to a neighbor\'s house.',
  'Instead, he sat on the step and took a deep breath.',
  '"Think," he told himself. "Where did I last use it?"',
  'He remembered that he had unlocked the door that morning and put the key in his jacket pocket.',
  'Then he remembered something else: he had taken off the jacket at lunch because the sun was hot.',
  'Hiro walked back to school and found the jacket hanging on a hook in the hallway.',
  'The key was still zipped inside the pocket.',
  'He hurried home and let himself in.',
  'That night, he told his parents what had happened.',
  'They suggested a hook by the door, where he would always hang his key.',
  'Hiro put one up the next day, and he never lost the key again.'],
 qs:[
  {t:'infer',q:'Why was Hiro finally able to find the key?',a:'He thought back through his day step by step.',
   d:['A neighbor found it for him.','His parents brought a spare key.','He looked in his backpack again.'],ev:[6,7]},
  {t:'compare',q:'How were Hiro\'s first search and his later search different?',a:'First he searched at random, then he thought it through.',
   d:['First he thought it through, then he searched at random.','First he called a neighbor, then he called his parents.','First he waited for help, then he broke the lock.'],ev:[2,5,6]},
  {t:'pov',q:'At the start, how does Hiro feel about being locked out?',a:'Worried and ready to rush to a neighbor',
   d:['Calm and happy to wait','Angry at his parents','Bored and ready for a nap'],ev:[3]},
  {t:'vocab',q:'In this story, "pounding" means...',a:'beating hard and fast',
   d:['slowing down','making a song','getting cold'],ev:[3]},
  {t:'theme',q:'Which idea is the theme of this story?',a:'Staying calm helps you solve a problem.',
   d:['Backpacks should never be opened.','Neighbors always know where keys are.','Jackets are not worth wearing.'],ev:[4,5,6,7]}]},

{id:'g5f04',g:5,type:'f',title:'Marcus and the Solo',text:[
  'Marcus loved to sing in the shower, in the kitchen, and on long car rides.',
  'But when Ms. Reyes announced a solo for the spring concert, his stomach did a flip.',
  'Singing alone in front of the whole school was a different thing.',
  'He pictured hundreds of faces looking at him, and his voice shrank to a squeak.',
  '"You do not have to decide today," said Ms. Reyes kindly.',
  'That night, Marcus practiced in his room with the door closed.',
  'The next day, his friend Pilar offered to be his audience of one.',
  'She sat on a bench in the music room and clapped loudly when he finished.',
  'He had wobbled on the high note, but she did not seem to mind.',
  'The following week, Pilar brought two friends, and then a few more.',
  'Little by little, the crowd grew, and Marcus got used to being watched.',
  'On concert night, his hands still shook as he stepped to the front.',
  'He found Pilar\'s face in the third row and sang to her as if no one else were there.',
  'When the last note faded, the room burst into applause, and Marcus finally let out his breath.',
  'Afterward, he told Ms. Reyes that he wanted a solo again next year.'],
 qs:[
  {t:'infer',q:'What was Pilar\'s plan really helping Marcus do?',a:'Get used to singing for bigger groups',
   d:['Learn the words to the song','Sing louder than the rest of the choir','Win a prize at the concert'],ev:[10,9]},
  {t:'compare',q:'How did Marcus feel about singing alone at the start of the story and at the end?',a:'Afraid at first, and ready to do it again at the end',
   d:['Bored at first, and excited about a prize at the end','Calm at first, and afraid at the end','Proud at first, and embarrassed at the end'],ev:[1,3,14]},
  {t:'pov',q:'How does Ms. Reyes see Marcus\'s fear?',a:'As something he can take time to think about',
   d:['As a good reason to cancel the concert','As a sign that he cannot sing','As a silly worry that is not worth talking about'],ev:[4]},
  {t:'vocab',q:'In this story, "wobbled" means...',a:'shook in an unsteady way',
   d:['sang every note in perfect tune','ran out of breath','stood up straight'],ev:[8]},
  {t:'theme',q:'Which idea is the theme of this story?',a:'Practice and support can help you face a fear.',
   d:['Singing alone is easier than singing in a group.','Friends should do the hard jobs for you.','Teachers should pick the shiest children.'],ev:[6,10,13]}]},

{id:'g5f05',g:5,type:'f',title:'The Borrowed Telescope',text:[
  'Zoe\'s neighbor, Mr. Tran, kept an old brass telescope on his porch.',
  'He had promised to show her the rings of Saturn on the first clear night.',
  'One cloudy afternoon, Zoe asked to borrow the telescope so she could practice setting it up.',
  'Mr. Tran said yes, as long as she was careful.',
  'Zoe carried it home with both hands, but she tripped on the front steps.',
  'The small finder scope on top snapped off and clattered to the ground.',
  'She thought about gluing it back and returning the telescope quickly, hoping he would not notice.',
  'But the glue left a bumpy line, and she knew he would see it.',
  'All evening she felt a heavy lump in her chest, and she could not finish her dinner.',
  'The next morning, she walked to his porch with the telescope and the broken piece in her hands.',
  '"I dropped it, and I am very sorry," she said.',
  'Mr. Tran looked it over and smiled gently.',
  '"Thank you for telling me the truth," he said.',
  '"A finder scope is easy to repair, but trust is harder to mend."',
  'They fixed it together that afternoon, and on Saturday night the sky cleared, and Saturn\'s rings shone in the lens.'],
 qs:[
  {t:'infer',q:'Why did Zoe feel a heavy lump in her chest?',a:'She felt guilty about hiding what happened.',
   d:['She was hungry because dinner was served late.','She was sad that the sky was cloudy.','She was afraid of the front steps.'],ev:[8,6]},
  {t:'compare',q:'How did Zoe\'s choice the next morning differ from her first plan?',a:'She told the truth instead of hiding the damage.',
   d:['She asked for a new telescope instead of fixing it.','She hid the damage instead of using glue.','She kept the telescope instead of returning it.'],ev:[6,9,10]},
  {t:'pov',q:'How does Mr. Tran see Zoe\'s honesty?',a:'As something to be thankful for',
   d:['As proof that she is careless','As a reason to take the telescope back','As a small thing that does not matter'],ev:[12,13]},
  {t:'vocab',q:'In this story, "repair" means...',a:'fix something that is broken',
   d:['carry something home','pay a lot of money for something','look through something'],ev:[13]},
  {t:'theme',q:'What is the theme of this story?',a:'Telling the truth beats hiding a mistake.',
   d:['Old telescopes are too hard for children to use.','Borrowing things is always a bad idea.','Glue can fix almost any problem.'],ev:[8,12,13]}]},

{id:'g5n01',g:5,type:'n',title:'Built for the Desert',text:[
  'A camel can walk through a hot desert for days with very little to drink.',
  'Many people believe that its hump holds water, but the hump actually stores fat.',
  'When food is hard to find, the camel\'s body uses this fat for energy, and the hump shrinks.',
  'A thirsty camel can also gulp a huge amount of water in just a few minutes.',
  'Its body is built for the desert in many other ways.',
  'Wide, flat feet spread out like snowshoes, so the camel does not sink into soft sand.',
  'Long eyelashes in two rows keep blowing sand out of its eyes.',
  'It can even close its nostrils to keep sand from getting in.',
  'A thick coat does more than keep a camel warm.',
  'It also shields the animal\'s skin from the hot sun.',
  'For thousands of years, people have counted on camels to carry goods and travelers across deserts.',
  'It is no surprise that camels are often called ships of the desert.',
  'Few other large animals are so well suited to such dry, hot, and sandy lands all year long.'],
 qs:[
  {t:'infer',q:'Why would a camel\'s hump shrink after a long trip?',a:'The camel used up fat when food was scarce.',
   d:['The camel drank all the water in the hump.','The camel lost its thick coat.','The camel grew too tired to eat.'],ev:[2,1]},
  {t:'compare',q:'How is the camel\'s hump different from what many people think?',a:'It stores fat, not water.',
   d:['It stores water, not fat.','It stores sand, not fat.','It holds air to keep the camel cool.'],ev:[1]},
  {t:'pov',q:'How does the author seem to feel about camels?',a:'Admiring of how well they fit the desert',
   d:['Worried that they are in danger','Bored by their slow walk','Sure that they are not very useful'],ev:[11,12]},
  {t:'vocab',q:'In this passage, "shields" means...',a:'guards from harm',
   d:['warms up','makes brighter','points toward'],ev:[9]},
  {t:'purpose',q:'Why did the author most likely write this passage?',a:'To explain how camels live in deserts',
   d:['To persuade readers to ride camels','To tell a story about a lost camel','To compare camels with horses'],ev:[0,1,5,6,7]}]},

{id:'g5n02',g:5,type:'n',title:'Two Ways to Cross a River',text:[
  'Long ago, people crossed rivers by laying a log or a flat stone across the water.',
  'Today, builders use two clever designs to carry roads over much wider gaps: the arch bridge and the suspension bridge.',
  'An arch bridge is built from a curved shape.',
  'When a heavy truck rolls across, the curve pushes the weight down and outward to strong supports at each end.',
  'Because the load spreads this way, stone arches built by ancient Romans still stand today.',
  'A suspension bridge works in a very different way.',
  'Tall towers rise from the riverbed, and thick steel cables hang between them in long curves.',
  'Smaller cables drop from these curves and hold up the flat road below.',
  'The main cables are anchored deep in the ground at both ends.',
  'Instead of pushing the weight, the cables pull, and steel is very good at being pulled.',
  'This is why suspension bridges can cross much wider spaces than arch bridges can.',
  'Arch bridges, however, are usually simpler and cheaper to build over narrow rivers.',
  'Engineers pick the design that best fits the place.',
  'Whichever they choose, a good bridge must be strong enough to carry its own weight plus everyone on it.'],
 qs:[
  {t:'infer',q:'Why would engineers pick a suspension bridge for a very wide river?',a:'Its cables let it cross wide gaps.',
   d:['It is always cheaper than an arch.','It is made of stone that lasts longer.','It needs no towers or supports.'],ev:[10,9]},
  {t:'compare',q:'How do the two kinds of bridges handle weight?',a:'Arches push it to the ends; suspension cables pull.',
   d:['Arches hang it from cables; suspension bridges push.','Both of them send it straight down into the water.','Both of them use stone blocks to hold it up.'],ev:[3,7,9]},
  {t:'pov',q:'Which statement best shows the author\'s view of choosing a bridge design?',a:'The best design depends on the place.',
   d:['Suspension bridges are always the best choice.','Arch bridges are too old to be useful.','Builders should avoid wide rivers.'],ev:[12]},
  {t:'vocab',q:'In this passage, "anchored" means...',a:'held firmly in place',
   d:['painted a bright color','lifted high into the air','cut into two parts'],ev:[8]},
  {t:'purpose',q:'The author wrote this passage mostly to...',a:'explain how two kinds of bridges work',
   d:['persuade towns to build more arch bridges','tell about a famous trip across a river','teach readers how to cross water on a log'],ev:[1,3,7,10]}]},

{id:'g5n03',g:5,type:'n',title:'Reading the Rings of a Tree',text:[
  'If you look at the cut end of a tree trunk, you can see a pattern of rings, like ripples in a pond.',
  'Each ring is one year of the tree\'s life.',
  'Counting the rings tells you how old the tree was.',
  'Every year, a tree grows a new layer of wood just under its bark.',
  'In spring and early summer, growth is fast, and the wood is light in color.',
  'Later, growth slows, and the wood becomes darker and denser.',
  'One light band and one dark band together make a single ring.',
  'The width of a ring also holds clues.',
  'In a year with plenty of sun and rain, the tree grows a lot, so the ring is wide.',
  'In a dry or very cold year, the ring is narrow.',
  'Scientists study rings from old trees to learn about the weather long ago.',
  'They often take a thin core with a hollow drill, so the tree does not have to be cut down.',
  'By matching patterns from many trees, they can measure time back thousands of years.',
  'A tree can be thought of as a diary of its own life.'],
 qs:[
  {t:'infer',q:'What can you tell about a year when a tree\'s ring is very narrow?',a:'The weather was dry or very cold.',
   d:['The tree was cut down early.','The tree grew a lot that year.','The wood turned light in color.'],ev:[9,8]},
  {t:'compare',q:'How is wood grown in spring different from wood grown later?',a:'Spring wood is lighter, and later wood is darker.',
   d:['Spring wood is darker, and later wood is lighter.','Spring wood is softer, and later wood is wetter.','Spring wood is thinner, and later wood is hollow.'],ev:[4,5]},
  {t:'pov',q:'How does the author see an old tree?',a:'As a record of the past',
   d:['As a danger to people','As a useless piece of wood','As a toy for scientists'],ev:[13,10]},
  {t:'vocab',q:'In this passage, "denser" means...',a:'packed more tightly',
   d:['much lighter in weight','easier to bend','brighter in color'],ev:[5]},
  {t:'purpose',q:'Why did the author most likely write this passage?',a:'To explain what tree rings can tell us',
   d:['To persuade readers to plant trees','To describe a trip to the forest','To teach how to cut down a tree'],ev:[1,2,8,10]}]},

{id:'g5n04',g:5,type:'n',title:'From Sand to Glass',text:[
  'Windows, jars, and eyeglasses all start with something as plain as sand.',
  'To make glass, workers mix sand with a little soda ash and limestone.',
  'The mixture goes into a furnace that is far hotter than any kitchen oven.',
  'At that heat, the sand melts into a glowing, thick liquid.',
  'While it is still soft, the glass can be shaped in several ways.',
  'A glassblower gathers some on the end of a long pipe and blows into it, like inflating a balloon.',
  'Factories make flat window glass in another way.',
  'They let the hot liquid float on melted tin, where it spreads out smooth and flat.',
  'Another method presses the soft glass into a mold to make jars and bottles.',
  'When the glass cools, it becomes hard and clear.',
  'Glass has a special advantage over many materials.',
  'It can be melted and shaped into new objects again and again without losing its quality.',
  'That makes glass one of the easiest things to recycle.',
  'So an old jar from your kitchen might be melted and become a brand new bottle on the shelf next year.'],
 qs:[
  {t:'infer',q:'Why do factories float melted glass on melted tin?',a:'To let it spread out smooth and flat',
   d:['To cool it down very fast','To turn it back into sand','To color it bright blue'],ev:[7,6]},
  {t:'compare',q:'How is blown glass different from window glass?',a:'Blown glass is shaped by air; window glass is floated.',
   d:['Blown glass is floated; window glass is shaped by air.','Blown glass is made of tin; window glass is made of sand.','Blown glass is pressed; window glass is blown.'],ev:[5,7]},
  {t:'pov',q:'What does the author think is special about glass?',a:'It can be recycled again and again.',
   d:['It is cheap to make.','It is heavier than most things.','It is very hard to break.'],ev:[11,12]},
  {t:'vocab',q:'In this passage, "advantage" means...',a:'a helpful strength',
   d:['a kind of danger','an old tool','a high price'],ev:[10]},
  {t:'purpose',q:'Why did the author most likely write this passage?',a:'To explain how glass is made and reused',
   d:['To persuade readers to buy windows','To tell a story about a glassblower','To compare sand with tin'],ev:[1,3,5,7,12]}]},

{id:'g5n05',g:5,type:'n',title:'Gift of the Nile',text:[
  'Ancient Egypt was mostly desert, yet one of the world\'s first great civilizations grew there.',
  'The reason was the Nile River, which flows north through the dry land to the sea.',
  'Each summer, heavy rains far to the south made the river rise and spill over its banks.',
  'When the water drained away, it left behind a layer of rich, dark mud called silt.',
  'Farmers planted wheat and barley in this fertile soil, and harvests were large.',
  'Egyptians watched the river closely, because a flood that was too high or too low could bring hard times.',
  'The Nile also gave them papyrus, a tall reed that grows along its banks.',
  'Workers cut the stems into strips, pressed them together, and dried them into smooth sheets for writing.',
  'Papyrus was lighter and easier to carry than the clay tablets used in other lands.',
  'Boats sailed up and down the river carrying grain, stone, and people.',
  'The current helped boats travel north, while the wind helped them sail south.',
  'Long ago, a Greek writer called Egypt the gift of the Nile, and it is easy to see why.'],
 qs:[
  {t:'infer',q:'Why would a flood that never came be a problem for Egyptians?',a:'Fields would get no fresh silt.',
   d:['The boats could not carry any stone.','The papyrus would grow too tall.','The desert would turn into a lake.'],ev:[3,5]},
  {t:'compare',q:'How was papyrus different from clay tablets?',a:'Papyrus was lighter and easier to carry.',
   d:['Papyrus was heavier and harder to carry.','Papyrus was used in other lands, but tablets were not.','Papyrus was made from mud, and tablets were made from reeds.'],ev:[7,8]},
  {t:'pov',q:'What does the author think about the Nile\'s importance?',a:'Egypt owed much of its success to the river.',
   d:['The river brought more trouble than good to farmers.','The desert mattered more than the river did.','Only farmers needed the river.'],ev:[11]},
  {t:'vocab',q:'In this passage, "fertile" means...',a:'good for growing crops',
   d:['dry and cracked like old clay','covered by water','hard to dig'],ev:[4]},
  {t:'purpose',q:'Why did the author most likely write this passage?',a:'To explain how a river helped Egypt grow',
   d:['To persuade readers to take a trip to the desert','To tell a story about a farmer','To show how to build a boat'],ev:[1,3,4,6,11]}]}
]);

// ---- grade 6 (P2-29): 230-300 words, 5 questions: central idea, inference, figurative meaning, best evidence, author's purpose or claim ----
COMPSPEC[6]={words:[230,300],sent:24,maxSent:34,fk:10.5,need:['main','infer','figure','evidence']};
compAdd([
{id:'g6f01',g:6,type:'f',title:'The Silent Foghorn',text:[
  'Nell had lived her whole life on Gull Rock, where her grandfather kept the lighthouse.',
  'Every foggy night, the great foghorn gave three low blasts to warn the fishing boats away from the rocks.',
  'Then one gray evening, the horn coughed, rattled, and went quiet.',
  '"The motor is worn out," Grandpa said, wiping oil from his hands. "The part I need will not arrive until Friday."',
  'Nell stared out at the fog, which pressed against the window like a wet wool blanket.',
  'Three boats were still out on the water, and none of them could see the lamp through the thick air.',
  'Grandpa paced the floor, but Nell was thinking hard.',
  'She remembered the old brass bell in the shed, which her great-grandmother had rung to call the crews home.',
  '"Grandpa, a bell can carry across water too," she said.',
  'He frowned, and then a slow smile spread across his face.',
  'Together they dragged the heavy bell to the rocky edge of the island and hung it from an iron post.',
  'Nell took the rope and pulled three times, waited, and pulled three times again, the same pattern as the horn.',
  'Hour after hour her arms ached and her hands stung, but she kept the rhythm steady.',
  'Near midnight, a faint horn answered from the dark, and then another, and then another.',
  'One by one, the boats slid out of the fog and turned toward the harbor, safe.',
  'In the morning, Grandpa set the old bell on a shelf inside the lighthouse. "Some tools," he said, "just wait for their turn."'],
 qs:[
  {t:'main',q:'Which statement best expresses the central idea of the story?',a:'Nell finds a new use for an old bell',
   d:'Fog is the greatest danger a lighthouse keeper faces|A broken motor can be fixed with a little oil|Grandparents always know the best way to work'.split('|'),ev:[7,8,10,11,13]},
  {t:'infer',q:'Why did Grandpa frown before he smiled?',a:'He first had to think about her idea',
   d:'He thought the bell was too valuable to use|He was upset that Nell had spoken up|He had not heard what Nell said'.split('|'),ev:[8,9]},
  {t:'figure',q:'The fog "pressed against the window like a wet wool blanket." This comparison shows that the fog was...',a:'thick and heavy',
   d:'warm and comforting|thin and patchy|quick to disappear'.split('|'),ev:[4]},
  {t:'evidence',q:'Which detail best shows that Nell kept going even though it hurt?',a:'"her arms ached and her hands stung"',
   d:'"She remembered the old brass bell in the shed"|"a faint horn answered from the dark"|"Nell stared out at the fog"'.split('|'),ev:[12]},
  {t:'purpose',q:'Why does the author end with Grandpa saying that some tools "just wait for their turn"?',a:'To show old things still have value',
   d:'To explain why the motor broke down|To hint that Grandpa will sell the bell|To show that Nell wants all new tools'.split('|'),ev:[15]}]},

{id:'g6f02',g:6,type:'f',title:'The Wobbling Robot Arm',text:[
  'Rosa had spent three weeks building a robot arm for the science fair, and she was sure it would win.',
  'It could lift a cup, turn, and set the cup down, all on its own.',
  'But on the morning of the fair, the arm shook like a leaf in the wind and spilled the cup across the table.',
  'Rosa tightened every screw, yet the wobble remained.',
  'Her classmate Dev, whose own project was only a plain chart about soil, watched from the next table.',
  '"Can I try something?" he asked quietly.',
  'Rosa hesitated, because she did not think he could possibly help.',
  'But the judges were only twenty minutes away, so she nodded.',
  'Dev did not touch the arm at all. He looked at the table and pressed on one corner.',
  '"Your table is uneven," he said. "Every time the arm swings, the whole thing rocks."',
  'Rosa felt her cheeks grow warm. She had checked every part of the robot except the one thing under it.',
  'Dev folded a card into a small square and slid it beneath the short leg.',
  'The arm lifted the cup, turned, and set it down without a drop spilled.',
  'The judges did not give Rosa the first prize, which went to a team with a solar oven.',
  'But they praised her robot, and Rosa walked straight to Dev\'s table.',
  '"Your sharp eyes saved my project," she said. "I am sorry I thought yours was too simple to matter."'],
 qs:[
  {t:'main',q:'What is the central idea of this story?',a:'Help can come from unexpected people',
   d:'Science fairs are won by the best builders|A wobbly robot can never be repaired|Charts are better projects than robots'.split('|'),ev:[4,9,12,15]},
  {t:'infer',q:'Why did Rosa\'s cheeks grow warm?',a:'She was embarrassed by her own mistake',
   d:'She was angry that Dev had touched her robot|She was excited about winning the prize|She was hot from standing near the table'.split('|'),ev:[9,10]},
  {t:'figure',q:'The arm "shook like a leaf in the wind." This means the arm was...',a:'trembling and unsteady',
   d:'moving smoothly and silently|spinning in fast circles|breaking into small pieces'.split('|'),ev:[2]},
  {t:'evidence',q:'Which detail shows that Rosa at first looked down on Dev?',a:'"she did not think he could possibly help"',
   d:'"Rosa tightened every screw"|"The judges did not give Rosa the first prize"|"he asked quietly"'.split('|'),ev:[6]},
  {t:'purpose',q:'Why does the author mention that the first prize went to a team with a solar oven?',a:'To show winning was not the main point',
   d:'To suggest that the judges were not fair|To explain why Dev\'s chart did not win|To show that robots never win prizes'.split('|'),ev:[13,14,15]}]},

{id:'g6f03',g:6,type:'f',title:'Water for Alder Creek',text:[
  'By midsummer, the spring that fed the village of Alder Creek had slowed to a trickle.',
  'Gardens drooped, and the town\'s only pump coughed up more air than water.',
  'Neighbors gathered in the square, and the talk grew louder with every minute.',
  '"We should dig a deeper well," said one man. "Or haul water from the lake," said another.',
  'Twelve-year-old Teo listened from the back, holding a bucket he knew was nearly empty.',
  'Both plans would take weeks, and weeks was longer than the gardens could wait.',
  'He thought about the spring itself. A storm last month had knocked trees across the hillside path, and no one had gone up to look.',
  '"Maybe the water is not gone," he said. "Maybe it is only stuck."',
  'A few adults smiled kindly, but nobody moved.',
  'So the next morning, Teo and his sister Ana climbed the hill alone, carrying gloves and a shovel.',
  'Near the top, they found the channel jammed with branches, leaves, and one broken log, with a pool of clear water backed up behind it.',
  'The two of them tugged and lifted for an hour, until their arms shook.',
  'When the last branch slid free, the water leapt forward and raced down the channel, laughing over the stones.',
  'By afternoon, the pump in the square was running strong again.',
  'The villagers were quiet for a moment. Then the man who had wanted a new well tipped his hat to Teo.',
  '"Next time," he said, "we ask the spring before we dig."'],
 qs:[
  {t:'main',q:'Which statement best expresses the central idea?',a:'A close look can beat a big plan',
   d:'A village should always dig a deeper well|Storms are the cause of every dry summer|Children are stronger than adults in a crisis'.split('|'),ev:[6,7,10,12,15]},
  {t:'infer',q:'Why did the adults smile kindly but not follow Teo?',a:'They doubted a boy\'s guess was worth a climb',
   d:'They were too busy hauling water from the lake|They had already cleared the hillside path|They were afraid of the steep hill'.split('|'),ev:[7,8]},
  {t:'figure',q:'The water raced down the channel, "laughing over the stones." This phrase suggests the water was moving...',a:'quickly and happily',
   d:'slowly and angrily|quietly and carefully|coldly and silently'.split('|'),ev:[12]},
  {t:'evidence',q:'Which sentence best shows that the storm caused the problem?',a:'"A storm last month had knocked trees"',
   d:'"Gardens drooped"|"Neighbors gathered in the square"|"The two of them tugged and lifted for an hour"'.split('|'),ev:[6]},
  {t:'purpose',q:'Why does the author end with the man\'s remark about asking the spring before digging?',a:'To show that the adults learned from Teo',
   d:'To show that he still wants a new well|To explain how the pump was fixed|To suggest that the spring will dry up again'.split('|'),ev:[14,15]}]},

{id:'g6f04',g:6,type:'f',title:'Marisol\'s Map',text:[
  'When Marisol\'s family moved to Pine Street, the whole neighborhood felt like a book written in a language she could not read.',
  'Every house looked the same to her, and every face belonged to a stranger.',
  'At school she ate lunch quietly and counted the minutes until she could go home.',
  'One rainy Saturday, she took out a pencil and a big sheet of paper and began to draw a map of the street.',
  'She drew her own house first, then the corner store, then the crooked maple tree by the bus stop.',
  'But soon she ran out of things to draw, and the map stayed mostly empty, like a table set for guests who had not arrived.',
  'The next day she carried the map up the street and knocked on a door.',
  '"I am making a map," she said, her voice barely a whisper. "Is there anything on this block that should be on it?"',
  'The woman who answered laughed. "You must add the pond behind the library, where the ducks sleep!"',
  'At the next house, a boy told her about a shortcut through the alley, and at the third, an old man described a bakery that opened at five every morning.',
  'By dusk, Marisol\'s paper was crowded with ink, arrows, and tiny drawings, and her pencil had worn down to a stub.',
  'More than that, she now knew eleven names she had not known before.',
  'On Monday, she pinned the map to the school bulletin board, and soon a small crowd gathered.',
  '"That is my street!" someone shouted. "You forgot the dog park!"',
  'Marisol grinned, picked up her pencil, and added it.'],
 qs:[
  {t:'main',q:'What is the central idea of the story?',a:'Reaching out turns a strange place into home',
   d:'Drawing is the best way to pass a rainy day|Every neighborhood has a pond with ducks|Shy people should not move to a brand new town'.split('|'),ev:[2,7,11,12,14]},
  {t:'infer',q:'Why was Marisol\'s voice barely a whisper at the first door?',a:'She felt shy about knocking',
   d:'She did not want anyone else to hear|She was tired from all her drawing|She was angry about moving away'.split('|'),ev:[7]},
  {t:'figure',q:'The neighborhood felt "like a book written in a language she could not read." This means it seemed...',a:'strange and hard to understand',
   d:'full of libraries and stories|bright and easy to enjoy|noisy and crowded with visitors'.split('|'),ev:[0,1]},
  {t:'evidence',q:'Which detail best shows that the map did more than show places?',a:'"eleven names she had not known before"',
   d:'"her pencil had worn down to a stub"|"the crooked maple tree by the bus stop"|"a bakery that opened at five every morning"'.split('|'),ev:[11]},
  {t:'purpose',q:'Why does the author end with Marisol adding the dog park?',a:'To show she now belongs on the street',
   d:'To prove that her first map was wrong|To explain why dogs live on Pine Street|To suggest that she will draw a second map'.split('|'),ev:[13,14]}]},

{id:'g6f05',g:6,type:'f',title:'The Tuba and the Train',text:[
  'Jonah loved the tuba because nobody could ignore it.',
  'When he blew, the low notes rolled across the band room and rattled the music stands.',
  'Mr. Lund, the band director, kept raising his hand to ask for softer playing, but Jonah thought softer meant smaller, and he did not want to be small.',
  'Before the spring concert, the flutes and clarinets complained that they could not hear themselves.',
  '"Your tuba is a freight train," whispered one clarinet player.',
  'Jonah\'s face burned, and that night he hid his horn in the closet and decided to quit.',
  'His older sister, who played in a community orchestra, found him sulking. "Do you know what the best tuba players do?" she asked. "They listen more than they play."',
  'She explained that a tuba is like the floor of a house: if the floor is steady, everything above it can stand.',
  'The next day, Jonah took out his horn and played softly while he listened to the melody above him.',
  'For the first time, he noticed how the flutes rose and fell like birds, and how his low notes could cradle them.',
  'At the concert, he matched his volume to the clarinets in the quiet parts and swelled only when the whole band swelled.',
  'When the last chord faded, the audience stayed silent for a heartbeat, then burst into applause.',
  'Afterward, the clarinet player who had teased him smiled. "Today," she said, "I could finally hear the whole song."'],
 qs:[
  {t:'main',q:'Which statement best expresses the central idea?',a:'Strength helps most when it supports the group',
   d:'Band directors should always ask for louder playing|The tuba is the hardest instrument to learn|Quitting is the best answer to teasing'.split('|'),ev:[2,7,10,12]},
  {t:'infer',q:'Why did Jonah hide his horn in the closet?',a:'He felt hurt and embarrassed',
   d:'He thought the horn was broken|He wanted to trade it for a flute|He planned to practice in secret'.split('|'),ev:[4,5]},
  {t:'figure',q:'The clarinet player says, "Your tuba is a freight train." She means that Jonah\'s playing was...',a:'loud and overpowering',
   d:'slow but very pleasant|smooth and easy to follow|too quiet to be heard'.split('|'),ev:[3,4]},
  {t:'evidence',q:'Which detail shows Jonah put his sister\'s advice into action at the concert?',a:'"he matched his volume to the clarinets"',
   d:'"Jonah\'s face burned"|"hid his horn in the closet"|"the audience stayed silent for a heartbeat"'.split('|'),ev:[10]},
  {t:'purpose',q:'Why does the author include the sister\'s comparison of a tuba to the floor of a house?',a:'To show that quiet roles matter',
   d:'To explain how houses are built|To show that she dislikes loud music|To prove tubas are the loudest instruments'.split('|'),ev:[7]}]},

{id:'g6n01',g:6,type:'n',title:'Riding the Tides',text:[
  'If you stand on a beach for six hours, you will notice that the sea does not stay still.',
  'The water creeps up the sand, covers the rocks, and later slides back out again.',
  'This rising and falling is called the tide, and it follows the moon.',
  'The moon\'s gravity pulls on everything on Earth, but water can move, so the ocean bulges toward the moon.',
  'A second bulge forms on the opposite side of Earth, because the whole planet is pulled toward the moon more strongly than the far water is.',
  'As Earth spins, a coastline passes through both bulges, so most coasts have two high tides and two low tides each day.',
  'The sun pulls on the ocean as well, but its pull is far weaker than the moon\'s, because the sun is so much farther away.',
  'When the sun, Earth, and moon line up at new moon and full moon, their pulls combine, and the tides grow extra large.',
  'These are called spring tides, even though they have nothing to do with the season.',
  'When the moon is at a quarter phase, the pulls work against each other, and the tides are smaller, called neap tides.',
  'Tides matter to people in many ways.',
  'Sailors in shallow harbors wait for high water so that their ships will not scrape the bottom.',
  'Walkers on the shore check tide tables so that rising water does not trap them on a narrow path.',
  'Scientists understand tides so well that these tables can be printed years ahead of time.',
  'The sea may look as if it is simply breathing in and out, but it is really answering a call from the moon.'],
 qs:[
  {t:'main',q:'What is the central idea of the passage?',a:'The moon makes the ocean rise and fall',
   d:'Sailors need tables to find harbors|The sun is the strongest force on Earth|Beaches change shape every season'.split('|'),ev:[2,3,5]},
  {t:'infer',q:'Based on the passage, what would be true of a shallow harbor at low tide?',a:'Ships could scrape the bottom',
   d:'Ships could sail in more easily|The tide would be at its highest|Sailors would not need tide tables'.split('|'),ev:[11]},
  {t:'figure',q:'The sea is "answering a call from the moon." This phrase means the ocean is...',a:'reacting to the moon\'s pull',
   d:'making noise at night|chasing the moon across the sky|sending signals to sailors'.split('|'),ev:[14,3]},
  {t:'evidence',q:'Which sentence best shows that the sun has less effect on tides than the moon?',a:'"its pull is far weaker than the moon\'s"',
   d:'"the ocean bulges toward the moon"|"the tides grow extra large"|"these tables can be printed years ahead"'.split('|'),ev:[6]},
  {t:'purpose',q:'Why does the author point out that spring tides have nothing to do with the season?',a:'To clear up a possible mix-up about the name',
   d:'To argue that spring is the best time to visit a beach|To show that tides change with the weather|To explain how the sun heats the ocean'.split('|'),ev:[8]}]},

{id:'g6n02',g:6,type:'n',title:'How Bees Share Directions',text:[
  'A honeybee that finds a patch of flowers has a problem, because the news is useless unless she can tell her sisters.',
  'Bees solve this with a dance, performed in the dark hive on the upright wall of the honeycomb, where the comb becomes a message board.',
  'When the flowers are very close, the bee runs in small circles.',
  'When they are farther away, she dances a figure eight with a straight middle run, during which she wiggles her whole body.',
  'That wiggling run is called the waggle.',
  'If the waggle points straight up the comb, the flowers lie in the same direction as the sun.',
  'If it points to the right of straight up, the flowers lie to the right of the sun.',
  'The length of the waggle tells the distance, since the longer the run, the farther away the flowers are.',
  'Other bees crowd close and touch the dancer with their antennae, learning the scent of the flowers she carries.',
  'Then they fly out and find the patch for themselves.',
  'Because the sun moves across the sky, a dancer who keeps dancing for hours slowly changes her angle to match.',
  'Researchers have confirmed this code by building a small robot bee that copied the dance, and real bees flew to the place the robot pointed.',
  'A brain smaller than a sesame seed can hold a message that carries both a direction and a distance.',
  'The waggle dance is one of the few animal signals that is known to share exact information with others of its kind.'],
 qs:[
  {t:'main',q:'What is the central idea of the passage?',a:'Honeybees use a dance to share where food is',
   d:'Bees build honeycombs in the dark|Robot bees can replace real bees|Flowers grow best in the direction of the sun'.split('|'),ev:[0,1,5,7,13]},
  {t:'infer',q:'What would most likely happen if a dancing bee gave the wrong angle?',a:'Other bees would search the wrong way',
   d:'The hive would move to a new tree|The other bees would stop eating honey|The flowers would grow in the new place'.split('|'),ev:[5,6,9]},
  {t:'figure',q:'The honeycomb "becomes a message board." This phrase means that the comb is...',a:'a place to share information',
   d:'a wall covered in paper notes|a surface the bees paint on|a spot where bees rest after work'.split('|'),ev:[1]},
  {t:'evidence',q:'Which sentence shows that distance is part of the dance\'s message?',a:'"the longer the run, the farther away"',
   d:'"the bee runs in small circles"|"touch the dancer with their antennae"|"the flowers lie to the right of the sun"'.split('|'),ev:[7]},
  {t:'claim',q:'Which claim does the author make about the waggle dance?',a:'It shares exact information',
   d:'It is the loudest sound a bee makes|It is easy for people to copy|It is only done by the oldest bees'.split('|'),ev:[12,13]}]},

{id:'g6n03',g:6,type:'n',title:'Roads That Built an Empire',text:[
  'More than two thousand years ago, the Roman government began paving roads that would eventually stretch across Europe, North Africa, and parts of Asia.',
  'The roads were built for soldiers, but they soon carried merchants, messengers, and ordinary travelers too.',
  'Roman engineers dug a trench and filled it in layers, with large stones at the bottom, then gravel and sand, and then a top of fitted flat stones.',
  'The surface curved slightly upward in the middle, so rain ran off into ditches on both sides and the road stayed dry.',
  'Whenever possible, the builders made the road straight, because a straight line is the shortest way to travel.',
  'Where a river or valley was in the way, they built bridges and arches, and some still stand today.',
  'Stone markers along the roads told travelers how far they were from the nearest town, a help to anyone tired or lost.',
  'Messages moved far faster than a single rider could manage, because riders changed horses at stations along the route.',
  'With such roads, the government could send soldiers to trouble spots, collect taxes, and move grain to hungry cities.',
  'Historians agree that the roads helped hold the huge empire together, like threads in a woven cloth.',
  'When the empire weakened, many roads went unrepaired, yet their routes lasted.',
  'Many highways in Europe today still follow the paths that Roman builders chose, which shows how well those paths were planned.'],
 qs:[
  {t:'main',q:'What is the central idea of the passage?',a:'Roman roads helped connect a large empire',
   d:'Roman soldiers preferred to travel by river|Straight lines are always the best design|Only messengers were allowed on the roads'.split('|'),ev:[1,7,8,9]},
  {t:'infer',q:'Which conclusion is best supported by the passage?',a:'Roman engineers built roads to last',
   d:'Roman roads were built in a single year|Roman builders did not care about rain|Travelers in Rome never needed bridges'.split('|'),ev:[2,3,5,11]},
  {t:'figure',q:'The roads were "like threads in a woven cloth." This comparison shows that the roads...',a:'tied the empire together',
   d:'were made of soft fabric|were too thin to be useful|could easily be pulled apart'.split('|'),ev:[9]},
  {t:'evidence',q:'Which detail best supports the idea that Roman roads were built to last?',a:'"some still stand today"',
   d:'"The roads were built for soldiers"|"told travelers how far they were"|"riders changed horses at stations"'.split('|'),ev:[5]},
  {t:'claim',q:'Which claim does the author make about Roman roads?',a:'They helped the empire stay united',
   d:'They were more useful than Roman ships|They were built mainly for sightseeing|They caused the empire to grow too large'.split('|'),ev:[8,9]}]},

{id:'g6n04',g:6,type:'n',title:'Why Leaves Change Color',text:[
  'In spring and summer, leaves are green because they are packed with chlorophyll, a substance that captures sunlight.',
  'The tree uses that light to turn air and water into sugar, which is its food.',
  'Yet green was never the leaf\'s only color.',
  'Yellow and orange pigments called carotenoids have been in the leaf all along, hidden beneath the green.',
  'As autumn arrives, the days grow shorter and the nights cooler.',
  'The tree senses these changes and begins to seal off the base of each leaf stem, closing the tiny tubes that carry water and food.',
  'Without a fresh supply of water, the leaf stops making chlorophyll, and the green slowly fades.',
  'Now the yellow and orange are revealed, as if someone had pulled a curtain aside.',
  'Reds and purples have a different story.',
  'Some trees make a new pigment in autumn from sugars trapped in the leaf.',
  'Bright, sunny days and cool nights help produce plenty of it, which is why some years the red is more brilliant than others.',
  'Brown comes from waste left in the leaf after the other colors are gone.',
  'At last, a thin layer of cells at the base of the stem weakens, and the leaf drops.',
  'The tree is not being wasteful.',
  'By letting go of leaves it could not keep supplied through winter, when water is frozen and sunlight is weak, the tree saves its energy.'],
 qs:[
  {t:'main',q:'What is the central idea of the passage?',a:'Leaf colors change as the tree changes',
   d:'Trees lose their leaves because of wind|Red is the most common color in nature|Leaves are only green in the spring'.split('|'),ev:[3,6,7,10,14]},
  {t:'infer',q:'Why might a cloudy, warm autumn make the reds less brilliant?',a:'Less red pigment would form',
   d:'The trees would grow new green leaves|The yellow pigment would turn brown|The leaves would drop in summer'.split('|'),ev:[10]},
  {t:'figure',q:'The yellow and orange are revealed "as if someone had pulled a curtain aside." This means the colors...',a:'had been hidden from view',
   d:'were painted on by the tree|were blown in by the wind|were brand new to the leaf'.split('|'),ev:[7,3]},
  {t:'evidence',q:'Which sentence best shows that yellow was in the leaf before autumn?',a:'"have been in the leaf all along"',
   d:'"the days grow shorter and the nights cooler"|"the leaf stops making chlorophyll"|"a thin layer of cells at the base"'.split('|'),ev:[3]},
  {t:'purpose',q:'Why does the author end by saying the tree is "not being wasteful"?',a:'To show leaf loss helps the tree survive',
   d:'To argue that trees should keep their leaves|To explain why leaves turn red and purple|To warn that leaves can harm a tree'.split('|'),ev:[13,14]}]},

{id:'g6n05',g:6,type:'n',title:'Coral Reefs, Cities Under the Sea',text:[
  'A coral reef looks like a garden of rock, but it is built by animals.',
  'Each coral polyp is a soft creature with tentacles, usually only a few millimeters across.',
  'A polyp takes calcium from seawater and uses it to build a hard cup of limestone around its body.',
  'When polyps die, their skeletons remain, and new polyps build on top, so a reef grows very slowly over thousands of years.',
  'Living inside the polyps are tiny algae that make food from sunlight and share some of it with the coral.',
  'This is why reefs need clear, shallow, sunlit water, and why most of them form in warm seas.',
  'Reefs cover only a tiny part of the ocean floor, yet scientists estimate that about a quarter of all ocean species spend part of their lives there.',
  'Fish hide among the branches, crabs squeeze into cracks, and young sea creatures grow up in the shelter.',
  'A reef is a crowded city with food, homes, and nurseries all in one place.',
  'Reefs also protect coastlines by breaking the force of waves during storms.',
  'But corals are sensitive to change.',
  'If the water becomes too warm, polyps push out their algae and turn pale, an event called bleaching.',
  'A bleached coral is not yet dead and may recover if cooler water returns soon.',
  'That is why keeping ocean water clean and cool matters so much to reefs.'],
 qs:[
  {t:'main',q:'What is the central idea of the passage?',a:'Reefs are animal-built homes for sea life',
   d:'Reefs are made of rocks that grow in the dark|Warm water is harmful to all ocean animals|Polyps live longer than other sea creatures'.split('|'),ev:[0,2,6,8]},
  {t:'infer',q:'Why would a reef most likely fail to grow in deep, dark water?',a:'The algae inside need sunlight',
   d:'Crabs cannot live in the cold|Waves would break the limestone cups|Polyps cannot make calcium at all'.split('|'),ev:[4,5]},
  {t:'figure',q:'A reef is called "a crowded city." This comparison shows that a reef is...',a:'a busy place full of living things',
   d:'a place with buildings made of stone|a noisy place full of traffic|a quiet place where few animals live'.split('|'),ev:[8,7]},
  {t:'evidence',q:'Which detail best supports the claim that reefs are important to ocean life?',a:'"about a quarter of all ocean species"',
   d:'"usually only a few millimeters across"|"a hard cup of limestone"|"push out their algae and turn pale"'.split('|'),ev:[6]},
  {t:'purpose',q:'Why does the author explain bleaching near the end of the passage?',a:'To show how a change in water can harm a reef',
   d:'To prove that corals are dead rock|To explain how polyps build limestone|To argue that reefs should be moved to cooler seas'.split('|'),ev:[10,11,13]}]}
]);
/* Demo content for the bank format (P1-09). Small on purpose: it proves the format, the validator and the passage panel.
   Real content arrives with the Phase 2 chunks (d-gram.js, d-vocab.js, d-comp.js, ...). There is no demo skill in SK: tests,
   smoke and screenshots register one by hand (see the skill examples in 37-bank.js). */
BANK.demo=[
  {lv:1,q:'One mouse, two ___.',a:'mice',d:['mouses','mices','mouse'],topic:'plurals'},
  {lv:1,q:'The sun is ___ in the sky.',a:'high',d:['hie','hy','hi'],form:'wide',topic:'spelling'},
  {lv:1,q:'Tap the word that tells what the dog does.',sent:'The dog runs fast.',a:'runs',form:'tap',topic:'verbs'},
  {lv:1,q:'Spell the word for a baby cat.',a:'kitten',form:'spell',topic:'spelling'},
  {lv:1,q:'Which one is a color?',a:'green',d:['table','jump','happy'],hint:'A color is what you see when you look at the grass or the sky.',topic:'vocabulary'},
  {lv:1,q:'Which word means the same as big?',a:'large',d:['tiny','slow','soft'],form:'wide',topic:'vocabulary'},
];
PASS.demo=[
  {lv:1,title:'The Red Kite',
    text:'Mia has a red kite. The wind is strong today. She runs to the big hill with her dad. Up goes the kite, high above the trees. '
      +'A little bird flies close to it. Mia laughs and waves. At the end of the day, she winds the string and goes home.',
    qs:[
      {q:'What color is the kite?',a:'red',d:['blue','green','yellow']},
      {q:'Who goes to the hill with Mia?',a:'her dad',d:['her dog','her friend','her teacher'],form:'wide'},
      {q:'Where does the kite fly?',a:'above the trees',d:['under a bridge','in a room','into the water'],form:'wide'},
      {q:'What flies close to the kite?',a:'a little bird',d:['a big plane','a bee','a bat'],form:'wide'},
      {q:'What does Mia do at the end of the day?',a:'goes home',d:['goes to sleep','buys a kite','swims'],form:'wide'},
    ]},
];
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
/* MathDoku banks (P3-04, BRAIN_TEASERS 5.2). GENERATED by `node tools/puzzles/build-banks.js mathdoku` from seed 'star-school-mathdoku-1':
   do not edit by hand; change the generator (tools/puzzles/mathdoku.js) and rerun it. Same seed, same file, byte for byte.
   PUZ.mathdoku[band] = [36 puzzles]: band B 3x3 (+), C 4x4 (+ - *), D 5x5 then 6x6 (+ - * /), sorted by difficulty score
   (D: the 18 5x5 first), so level L (1-12) is entries 3(L-1) to 3L-1. Each puzzle is 'N|cages|solution|grade|score':
   cages comma-separated, each = its cells (one base-36 character per cell index, row * N + col, ascending; the first is
   the top-left cell, where the label goes) + operation (+ - * / or = for a single given cell) + target, e.g. '01+3';
   solution = N*N digits in reading order; grade = hardest technique of the cage-aware grader in tools/puzzles/mathdoku.js
   (1 last cell, 2 cage single, 3 hidden single, 4 cage in a line, 5 naked pair); score = solver nodes x 1000 + effort.
   Every puzzle has exactly one solution (tools/test.js proves it with its own counter). PUZ is shared by all puzzle banks. */
var PUZ = PUZ || {};
PUZ.mathdoku = {
  B: [
    '3|03+5,1=1,2=3,45+3,67+4,8=2|213321132|1|1006',
    '3|0=2,14+3,2=3,3=3,58+3,67+4|213321132|1|1006',
    '3|0=2,14+4,2=3,36+4,5=2,78+3|213132321|1|1006',
    '3|0=3,12+3,3=1,4=3,58+5,67+3|321132213|1|1006',
    '3|01+3,25+5,3=3,478+5,6=2|123312231|1|1007',
    '3|013+5,2=3,467+7,5=1,8=2|123231312|2|1007',
    '3|03+3,12+4,4=3,5=2,6=3,78+3|213132321|2|1007',
    '3|03+3,14+5,2=1,5=3,6=3,78+3|231123312|2|1007',
    '3|03+3,1=3,2=2,45+4,6=3,78+3|132213321|2|1007',
    '3|034+8,12+3,58+4,6=1,7=2|312231123|1|1007',
    '3|036+6,124+7,5=1,7=1,8=3|132321213|2|1007',
    '3|036+6,125+4,4=3,7=2,8=3|312231123|2|1007',
    '3|0=1,1=3,2=2,34+3,58+4,67+5|132213321|2|1007',
    '3|0=2,12+4,36+4,45+3,7=3,8=2|213321132|2|1007',
    '3|0=2,12+4,36+4,45+5,7=1,8=2|231123312|2|1007',
    '3|0=3,14+3,25+4,3=2,67+4,8=2|321213132|2|1007',
    '3|0=3,14+3,2=2,36+3,58+4,7=3|312123231|2|1007',
    '3|01+3,25+4,346+8,7=1,8=2|123231312|2|1008',
    '3|01+3,2=3,34+4,578+6,6=2|123312231|2|1008',
    '3|01+4,2=2,36+3,457+8,8=1|312123231|2|1008',
    '3|01+5,25+3,3=3,467+4,8=3|231312123|2|1008',
    '3|01+5,2=1,34+3,578+8,6=1|321213132|2|1008',
    '3|01+5,2=1,36+4,478+6,5=2|231312123|2|1008',
    '3|012+6,3=2,47+5,58+4,6=1|312231123|2|1008',
    '3|03+3,14+4,2=3,578+5,6=3|213132321|2|1008',
    '3|03+5,1=1,245+6,67+3,8=3|312231123|2|1008',
    '3|0=2,125+6,34+4,6=3,78+3|213132321|2|1008',
    '3|0=2,1=3,245+6,36+4,78+3|231123312|2|1008',
    '3|01+3,25+4,367+6,4=3,8=2|123231312|2|1009',
    '3|01+3,2=3,367+8,4=1,58+3|123312231|2|1009',
    '3|012+6,34+3,5=3,6=2,78+4|312123231|2|1009',
    '3|0=1,12+5,367+6,4=3,58+3|123231312|2|1009',
    '3|0=2,147+6,25+5,36+4,8=1|213132321|2|1009',
    '3|0=3,125+4,36+3,47+5,8=3|312231123|2|1009',
    '3|013+6,245+6,6=1,7=2,8=3|312231123|2|2008',
    '3|0=3,124+6,3=1,578+6,6=2|321132213|2|2008',
  ],
  C: [
    '4|01*4,237+8,48+3,5=4,6=2,9a+7,bef*4,cd+5|4132142323413214|2|1016',
    '4|01+4,26a+9,37+3,4=3,59*4,8=2,bef*12,cd-2|1342342121344213|2|1017',
    '4|04-2,12*4,37+4,56-1,8c*3,9d-1,a=1,b=2,ef-2|2143423134121324|2|1017',
    '4|0=1,15+6,237*6,489*24,6=3,abf+7,cde+8|1423423123143142|2|1017',
    '4|0=3,12-2,37-1,45*12,6a-1,8c-1,9=4,bf-1,de*3|3241431214232134|2|1017',
    '4|0=3,1=4,26*6,37*4,45-1,8c-3,9d*6,ab+4,ef+6|3421213442131342|2|1017',
    '4|01*12,2=1,37+3,48*4,59-1,6a+6,b=3,cd*2,ef+7|3412432112432134|2|1018',
    '4|01*4,23-1,458+6,6=2,7b-1,9=4,aef+6,cd+5|4132132424133241|2|1018',
    '4|01-2,23+4,4=1,569*36,7b+3,8cd*6,ae-2,f=4|4213143223413124|2|1018',
    '4|04*4,12*6,37b*6,5=3,6a+5,89-2,cde+6,f=4|4231134224133124|2|1018',
    '4|04+6,1=2,2=3,37b+8,56-3,8c-2,9d*12,aef+5|4231214313243412|2|1018',
    '4|045+5,126+11,3=1,7b*6,8c*12,9d-2,a=1,ef*8|2431124343123124|2|1018',
    '4|048*12,1=3,237+5,59*2,6=4,ab*12,cd+6,ef*3|4321314212342413|2|1018',
    '4|0=1,123+9,45*8,67b+6,8=3,9a+5,cd*2,ef-1|1324423134122143|2|1018',
    '4|01-3,267*4,3=3,489*18,5=4,ab-3,cd+3,ef+7|4123341223411234|2|1019',
    '4|014*36,236+7,5=1,7b-1,8c*2,9a+5,de+5,f=4|4321314224131234|2|1019',
    '4|015*18,236*8,48c*8,7=1,9=1,ade*48,bf*6|3214432121431432|2|1019',
    '4|04-1,12+4,3=2,59+7,6=2,7b-3,8cd*4,aef+8|4132342123141243|3|1019',
    '4|048+7,123*12,59d+9,6=3,7ab+5,c=3,ef-3|2143143243213214|2|1019',
    '4|048+7,1=4,23+5,56a+7,7=3,9cd+7,bef+7|1432421323413124|2|1019',
    '4|0=3,15-3,267+7,3=1,489+7,ab+7,cd-1,ef-3|3421413212432314|2|1019',
    '4|014*24,23*3,5=2,67b*8,89c+6,aef*24,d=3|2413324141321324|2|1020',
    '4|014+5,236*12,59-3,7=3,8cd*36,ae-2,bf-1|1234241331424321|2|1020',
    '4|01+5,23+5,48-3,567+6,9a+6,bf*12,c=3,de*2|2341413214233214|3|1021',
    '4|01+5,23-1,458+7,69a*8,7bf+7,cd-2,e=3|4123134232142431|3|1021',
    '4|014+8,237+5,56-1,8c-1,9a*2,b=4,de-3,f=3|4321143232142143|2|1021',
    '4|015+9,23*6,489+7,6a-3,7bf*12,c=1,de+5|4132241332411324|3|1021',
    '4|04+6,15-3,26a+8,3=3,7bf+7,89c*6,de-1|2413413232411324|3|1021',
    '4|04-1,15*6,23*4,6=3,7bf*24,89a+7,cde*12|2341123441233412|2|1021',
    '4|048+9,159+6,237+9,6=2,abf+6,cde+8|2341312442131432|3|1021',
    '4|014*4,26a+9,37b+7,59*6,8c-1,d=4,ef-2|4132132432412413|3|1022',
    '4|015+7,23+6,4=2,6a*2,7b+7,89+5,cd-2,ef+4|3142231414234231|2|2019',
    '4|0=2,15-1,23+5,489+9,67a+6,bf-1,c=3,de+5|2314423114233142|2|2019',
    '4|01*3,2=4,367+7,459*24,8cd+7,aef*18,b=1|1342321424314123|2|2020',
    '4|014+7,23*6,5=1,67a+8,8=3,9cd+9,bef*8|1432214332144321|3|2021',
    '4|045*6,1=1,237+9,6=4,8c-1,9de+7,abf*6|2134134234214213|4|4024',
  ],
  D: [
    '5|056+6,12+8,38-3,49e*20,7c/2,abf*60,di+4,gkl+7,h=1,jo-1,mn-1|1532432451432155413221543|3|1034',
    '5|016+9,23*6,4=4,5a-2,7bc+10,89+3,dejo+12,fkl*60,gh-1,imn*40|1532443512214355214334251|3|1036',
    '5|056b+8,123*60,489*20,7=1,afg*20,cdi*12,ejo*24,hmn*15,kl-1|2345132145512341452345312|2|1036',
    '5|015+11,2349+11,67c*8,8d*12,ab*15,ej-3,fg*2,hi*15,kl*12,m=1,no-3|2451351432352411235443125|3|1037',
    '5|0125*24,349*60,67-4,8=2,ab+8,cde*8,fk-3,gl*12,hmno*30,ij-3|1235441523354125324124135|3|1038',
    '5|015+7,2=5,3489*90,6b-1,7c/2,afk+9,di/2,ej-1,gl+5,hmno*48|4153224153352141342552341|3|1038',
    '5|0=4,12*10,38/3,49+7,5af*30,67c+10,bgkl+9,de*10,hijo+11,mn/2|4251325134314525432113245|3|1038',
    '5|01+9,2567*48,349*15,8bcd*20,af+5,ej*12,glm+12,hino+10,k=1|5423142315215433512413452|3|1039',
    '5|015+12,23-2,489d+11,67*4,afk*12,bg*12,chi+12,e=1,jo*15,lmn*8|2531451432435211425332145|3|1039',
    '5|0125*24,34*20,6bg+10,78*6,9ej+6,afk+9,cd*20,hi*10,lmno+10|2314545231314521452352314|3|1040',
    '5|015*12,234*30,67/2,8cd+11,9ej+6,ab+7,fg-3,him+8,kl-4,no/2|1423532451435122514351324|3|1040',
    '5|0=3,12/2,34*5,5a+3,67+7,89e+11,bc-4,di+5,fg-1,hm/2,jno+8,kl+8|3241514352215344512353241|3|2035',
    '5|01+3,2389+12,4=5,56ab+13,7chm+12,di-1,ej*2,fk+9,gl-1,no*15|2134535214145325342142153|3|2040',
    '5|01-2,27+8,38-3,49-3,5afk+13,6b+5,cdei+11,glm+8,h=4,jno*12|2431513542421533542151234|3|3039',
    '5|0126+12,3789*60,4=2,5a-1,bg/5,chlm+13,de-1,fk+3,ijno+16|5413232415453212154313254|4|4041',
    '5|016*12,27*15,34/2,5a+7,8di+10,9ej+8,bc-1,fg*20,hmn*4,kl-1,o=5|1354224351512344512332415|4|4045',
    '5|05+5,123+10,49e*10,6=4,78-2,ab*2,cd-1,fk-2,gh*10,ijno*48,lm-1|4352114352214353521452143|4|4053',
    '5|05a+9,16+8,23-3,4=2,7bcd+14,89/2,ejo*15,fghk+10,in-1,lm*2|3541213524542312134542153|4|6043',
    '6|06/2,1238+20,4a+5,5b+9,7d*5,9=4,ci*24,ef+5,gh/6,jk*15,lms+10,ntz+6,opu+10,qr-2,vw-3,xy*12|163524216435452316635142324651541263|3|1051',
    '6|067+7,1238+15,45-2,9a-4,bh+10,cdjp+14,ek/4,fg-2,io-4,lr+6,mns*24,qw+11,t=1,uv-3,xyz+7|142635513264421356654123236541365412|3|1052',
    '6|01+5,23+11,4a/5,5bhn+14,67cd*36,89/4,efgk*72,ij*30,lqrx+14,msyz+12,opu*16,t=6,vw-3|326514634152213645561423145236452361|3|1056',
    '6|0=5,127*60,349a*32,5bh+6,6cd*72,8e+8,fl/3,gmn*15,iou+7,jpv*6,kqw*24,rs+11,txyz+18|562143653421345612416235231564124356|3|1056',
    '6|017d*60,2348*36,5=2,6c+6,9f+7,abg*96,ejk+13,hn+8,iop*36,lm*8,qrs+12,tz*6,uv-2,wxy*15|453612132564516243361425624351245136|3|2052',
    '6|016+6,2=3,3789+18,45ab+15,ci-3,dej+12,fgm*6,hn+7,klq+14,opuv+17,rwx+4,sy*20,tz-2|413562152634245316536421624153361245|3|2054',
    '6|01+5,289+8,345b*60,6c*6,7d/2,agh+14,eflr+20,ijk*18,mn+6,opqu+16,sy-3,tz+4,vw*18,x=2|234165641352125436316524452613563241|3|2055',
    '6|06-3,1278+11,345b+18,9f+8,ag+4,ci/3,djk*48,e=4,hn+8,lm/5,opuv+17,qw/5,rstx*16,yz-2|153642412536624315246153365421531264|3|2057',
    '6|0123+12,45+9,67*5,89-1,ab+8,cd/2,ejkl*54,fgm+11,hn-3,io*20,pq/2,rsy+14,tz+4,u=6,vwx+11|361254154326243615536142412563625431|3|2058',
    '6|0128+11,34-2,59ab*90,67+10,ciou*24,dj/2,efg*30,hnt+9,kl/4,ms+7,pv*10,qrx*90,w=4,yz-5|513246642135435612261453156324324561|4|4063',
    '6|01-3,234*72,5b+4,6c-1,78+10,9agh+18,def+8,io*12,j=5,kqw*10,lmnt+14,puv+13,rx/6,syz+9|526341164523213456351264435612642135|4|5062',
    '6|017*32,23+8,45ab*36,6=1,89-1,cdek*24,flm+12,gh+11,iou+13,jp/2,nstz+12,qr/3,vwxy+13|425316146523314265532641263154651432|4|7074',
    '6|06c+10,12*12,34+5,5b*30,789f*90,ag+7,de*2,hn*4,ijkq+18,lm+7,ou-5,pvw+11,rxy*30,s=2,tz+5|326415251346512634463251645123134562|4|9058',
    '6|06-2,128*48,39*15,45-4,7d-2,ag-1,bh-2,cijk*75,eflm+15,nt+10,opqw+11,r=4,sxyz*40,uv-3|426315264531541623153264312456635142|4|11064',
    '6|017+10,23+11,45*2,6c-4,8de+8,9abf*72,glm*40,hn-1,iou+12,jp-5,kq*15,rxy+10,stz+9,vw-4|346512532461124356613245465123251634|4|12074',
    '6|0127*72,3459+17,6c+6,8e-1,afgm*48,bhnt+12,dij*45,klqr+12,ou*24,pvwx+9,s=6,yz-2|216354163542534621352416425163641235|4|17061',
    '6|067+12,12*20,39/6,45*3,8def*24,ab-2,ci-2,ghn+11,jklr+17,mstz+17,opuv+14,qw/5,xy*8|254613642135316254163542425361531426|5|18085',
    '6|0128+15,39fg*18,45ab*80,6c+7,7=6,dj-1,ekq+9,hmn+14,iou+11,lr*30,pv+7,st*12,wx-1,yz+3|356214261345524136412653143562635421|4|19069',
  ],
};
/* Sudoku banks (P3-02, BRAIN_TEASERS 5.1). GENERATED by `node tools/puzzles/build-banks.js sudoku` from seed 'star-school-sudoku-1':
   do not edit by hand; change the generator (tools/puzzles/sudoku.js) and rerun it. Same seed, same file, byte for byte.
   PUZ.sudoku[band] = {n, bw, bh, easy: [...], medium: [...], hard: [...]}: band A 4x4 (pictures), B 4x4, C 6x6, D 9x9;
   boxes are bw columns x bh rows. Each puzzle is 'givens|solution|grade': n*n cells in reading order, '.' = empty,
   symbols 1..n; grade = hardest technique the human-style grader (tools/puzzles/human.js) needs: 1 last empty cell,
   2 naked single, 3 hidden single, 4 locked candidates, 5 naked pair. Every puzzle has exactly one solution, and
   tools/test.js proves it with its own counter. PUZ is shared by all puzzle banks: never declare it with const or let. */
var PUZ = PUZ || {};
PUZ.sudoku = {
  A: {n: 4, bw: 2, bh: 2,
    easy: [
      '321....34.322.41|3214142341322341|1',
      '32.4.4.241.3.3.1|3214143241232341|1',
      '.132..14.4211..3|4132231434211243|1',
      '.43.231.4..3.241|1432231441233241|1',
      '234...3.3..44213|2341143231244213|1',
      '1...23413.2.4.13|1432234131244213|1',
      '..244.1.314.243.|1324421331422431|1',
      '..43432134...13.|1243432134122134|1',
      '43211..3.134...2|4321124321343412|1',
      '321...322..11.23|3214413223411423|1',
      '..4.42313.24.41.|1342423131242413|1',
      '24...3.23.1.4123|2431134232144123|1',
      '3.41142....223.4|3241142341322314|1',
      '321441..1..2..41|3214412314322341|1',
      '.3121.3.21.3..21|4312123421433421|1',
      '1..2243.3.14.12.|1342243132144123|1',
      '..434312.2.43.2.|2143431212343421|1',
      '..1313.231244...|2413134231244231|1',
      '4..32314.2.1..32|4123231432411432|1',
      '1.3.3.1223...123|1234341223414123|1',
    ],
    medium: [
      '32..1.23...223.1|3214142341322341|1',
      '24.3.3.43...413.|2413132432414132|1',
      '4..1312.1.4...13|4231312413422413|1',
      '3142..1.1.2..4.1|3142421313242431|1',
      '2..414233..1.1..|2314142332414132|1',
      '4132.31.....1.23|4132231432411423|1',
      '.32.423....224.3|1324423131422413|1',
      '24..13.2.12...31|2413134231244231|1',
      '...4.41.4.21.243|2134341243211243|1',
      '312..4.3.3...231|3124241313424231|1',
      '2143.32.143.....|2143432114323214|1',
      '2.41...2.12442..|2341143231244213|1',
      '13..243....242.3|1324243131424213|1',
      '3..141...3.4143.|3241412323141432|1',
      '42.31..2..2424..|4213134231242431|1',
      '14323..1....23.4|1432324141232314|1',
      '.1.42...1.43431.|3124243112434312|1',
      '.1.4243...424..3|3124243113424213|1',
      '4..313.23..42.3.|4213134231242431|1',
      '24.1.....213132.|2431314242131324|1',
    ],
    hard: [
      '214.3..1.2..4..2|2143342112344312|1',
      '431..14..2..3.2.|4312214312343421|1',
      '4.2.2..13.14..3.|4123234132141432|1',
      '4.1.214..4..1..4|4312214334211234|1',
      '31...21.23.1..3.|3124421323411432|1',
      '4..332...342..3.|4123321413422431|1',
      '.3422..3..3.3..4|1342241342313124|1',
      '3....231..2.231.|3142423114232314|1',
      '....3.12.34.412.|1234341223414123|1',
      '324....31....314|3241412314322314|1',
      '4.32...4.423.3..|4132321414232341|1',
      '4.3.32..2..1.42.|4132321423411423|1',
      '..4..3122....421|1243431221343421|1',
      '.243..1..1.443..|1243341221344321|1',
      '1..2..3.3.2.241.|1342423131242413|1',
      '4..1.1.22...1.24|4231314224131324|1',
      '.24.1..343.2..3.|3241142343122134|1',
      '32.14....4.31..4|3241413224131324|1',
      '1.2.2..44..2.2.1|1423231441323241|1',
      '4.2.321....2.34.|4123321414322341|1',
    ],
  },
  B: {n: 4, bw: 2, bh: 2,
    easy: [
      '.42.2...41.2.24.|1423231441323241|1',
      '.42..241....4.32|1423324123144132|1',
      '1...2.4...32321.|1423234141323214|2',
      '14..32.1...2.31.|1423324141322314|2',
      '42.1...41..22..3|4231312413422413|2',
      '21.3.42..3.2...4|2143342143121234|2',
      '..31..2.2.1..142|4231132424133142|2',
      '14....1.2...4123|1432321423414123|2',
      '.4.1312.42.3....|2431312442131342|1',
      '2...314.423...2.|2413314242311324|1',
      '...24213.1..24..|1342421331242431|2',
      '.4..1..4..4.4231|2413132431424231|2',
      '2.14..3..24.1..3|2314413232411423|1',
      '.1.33.14..4.1..2|4123321423411432|1',
      '3.2.42.1...31.4.|3124423124131342|1',
      '.4.3...44.311.4.|2413312442311342|2',
      '1.3.23....1441..|1432234132144123|2',
      '4..2324...23.3..|4132324114232314|1',
      '24.1..24..1.31..|2431132442133142|2',
      '..313...4312..4.|2431312443121243|2',
    ],
    medium: [
      '43..12........13|4321123431422413|2',
      '..41....3..44..2|2341142332144132|2',
      '4.23......3..2.4|4123234114323214|2',
      '..3113....4.2...|4231132431422413|2',
      '.....1.2.32.2..1|4213314213242431|2',
      '.2.1.1.....223..|3241412314322314|2',
      '4..32.....32...1|4123231414323241|2',
      '2..4..3..4.33...|2314413214233241|2',
      '4..1..4.3.....13|4231134231242413|2',
      '.4.2...3..2.12..|3412214343211234|2',
      '4..2.3.....3.21.|4132234114233214|2',
      '..3..21.1...2..1|4132321414232341|2',
      '....134.3....4.3|4231134231242413|2',
      '.31.12.....13...|4312124324313124|2',
      '.4.22......11..3|3412213443211243|2',
      '.2...31....43.2.|1243431221343421|2',
      '.1.....2..343..1|2143431212343421|2',
      '2....4.....34.12|2134342112434312|2',
      '314..43.4.......|3142243142131324|2',
      '.2.14....41.1...|3241413224131324|2',
    ],
    hard: [
      '..3.3..4.41.....|4231312424131342|2',
      '.34...1.3....2..|1342241331244231|2',
      '.2414......2....|3241412314322314|2',
      '.321.....2..1...|4321214332141432|2',
      '4..1....3...1..4|4321214334121234|2',
      '.3...2.1..4....3|1324423131422413|2',
      '3.....31...24...|3124243113424213|2',
      '.......32..41.3.|3241412323141432|2',
      '...2.4......41.3|1342243132144123|2',
      '.42.2.....41....|1423231432414132|2',
      '4.......3..2.1.4|4321124334122134|2',
      '4..1...4.3....1.|4231312413422413|2',
      '3....2.4..12....|3421123443122143|2',
      '.....2...4.2..14|4123324114322314|2',
      '...31.4.....21..|4213134234212134|2',
      '14...2.....2.1..|1423324143122134|2',
      '...43......1.24.|2134341243211243|2',
      '.421.........14.|3421123443122143|2',
      '.....4.1.2..3.2.|1342243142133124|2',
      '.....3.4.2...43.|4123231432411432|2',
    ],
  },
  C: {n: 6, bw: 3, bh: 2,
    easy: [
      '.1634.453.1234.2..1...53..4.36.3152.|216345453612345261162453524136631524|2',
      '61.54.5.2..125...6.3...4.65123321.65|613542542631254316136254465123321465|2',
      '165.433..5.6..34...42631.513.44.6.5.|165243324516613425542631251364436152|2',
      '.5.21..235464..635..5124.4.3622....1|654213123546412635365124541362236451|2',
      '2.563.643.5.46..155314.6156.4.....6.|215634643152462315531426156243324561|2',
      '.2.4656..12346.53....6.1.34.1621.3.4|123465645123461532352641534216216354|2',
      '.6.3.44312566.45.32..46.3.6..51..63.|562314431256614523253461326145145632|2',
      '..652.12..6...3.426.231536125425....|436521125463513642642315361254254136|2',
      '624513..1.4.4...2121.65...216.1.6.32|624513531246465321213654342165156432|2',
      '3..56.6.4..2.362..215.4.54.6131..425|321564654132436251215346542613163425|2',
      '6.134.2346.5.63.214.2.....5.6.32615.|651342234615563421412536145263326154|2',
      '.43.6.1..2345.23...34521.2...33614.2|243165156234512346634521425613361452|2',
      '2...4.54.6.2135.6462..3.412..635.4.1|261543543612135264624135412356356421|2',
      '.6132.2.4.6..251..1462.5453.12.12...|561324234561325146146235453612612453|2',
      '..356.5614.36.43...356.2...2.44521.6|243561561423624315135642316254452136|2',
      '..4.5635612.123.65..52.1.4.6.36...42|214356356124123465465231542613631542|2',
      '.1452.3.2.61.63.....1..64.621.125634|614523352461563142241356436215125634|2',
      '5.4.6161.5..43..15..1.363.514..4265.|524361613524436215251436365142142653|2',
      '23416.1..4323.65.45.1.264...5...32.1|234165165432326514541326412653653241|2',
      '.3.14.54162...53.26.345.3542...6.53.|236145541623415362623451354216162534|2',
    ],
    medium: [
      '61.53..3.2...2....3561.2..34.1..136.|612534435216124653356142563421241365|2',
      '.1.46.65...31..65..65......34.34.512|213465654123132654465231521346346512|2',
      '....4554...3.1.3644365...6.2511.....|623145541623215364436512364251152436|2',
      '...2.332..6.6524..41.5..5.6..223..5.|165243324165652431413526546312231654|2',
      '.6..51..5.63.4.5.22.16..53.1.612....|362451415263643512251634534126126345|2',
      '.3..12...4.5.5....162.433.52..6.135.|534612216435453126162543345261621354|2',
      '.51..42...3.64.1...1.642.2..15.3.4.6|351264264531642153513642426315135426|2',
      '.2.436.3.2.5.6.15..5...4..6342....61|125436634215462153351624516342243561|2',
      '4.16..326..1643.1521..6...2.5.....3.|451623326541643215215364132456564132|2',
      '1.3...625.1.3.21.646.2.321.63.......|143562625314352146461253214635536421|2',
      '...3..63..243.41...2564....4.5.4623.|452316631524364152125643213465546231|2',
      '.6...5.256.41......46...514.26.32.41|461235325614153462246153514326632541|2',
      '...6.2....1.1..43.5.4.6.3.5146.415.3|413652256314162435534261325146641523|2',
      '...21.241..3....3212.465..6...312..6|635214241653564132123465456321312546|2',
      '265.1...3.5664.....5.1.4.3.5.2..4.31|265413413256641325352164136542524631|2',
      '2.6...154..6.4..1.51.2...216..465.3.|236451154326642513513264321645465132|2',
      '3..2..6425131..63..63..2........5326|351264642513124635563142236451415326|2',
      '4.1.3236.41.62.34.1.4........3.1.5.4|451632362415625341134256546123213564|2',
      '46.31..35..25...366.31..3..6..2.65..|462315135462541236623154354621216543|2',
      '2.65....463.5.321..213..31.45......3|236541154632563214421365312456645123|2',
    ],
    hard: [
      '1....565.23......2...36...3.5.46.1..|132645654231346512521364213456465123|2',
      '.....66.4.214.51....65.....61.1..2..|321456654321435162216534542613163245|2',
      '4.26533......4...16...2.534.......3.|412653365142243561651324534216126435|2',
      '31...2..4...1.5...64.5.....2344...1.|316452254163125346643521561234432615|2',
      '5.43..3.214.2........6...21.6...32..|514326362145236451145632421563653214|2',
      '.....6..5....42.611..42..631....1..2|324516615243542361136425263154451632|2',
      '.....624..13....54.1....4.23.1.6..2.|135246246513623154514632452361361425|2',
      '.6...14....55.......26....1..435412.|265341413265536412142653621534354126|2',
      '.......3.2.42......5..62..35.65.2.43|124635635214246351351462413526562143|3',
      '13.65..6..43.......1.4...263......26|134652265143453261612435526314341526|2',
      '6...3.42.6...5.3.2...5.6...4233.....|615234423651156342234516561423342165|2',
      '15.....4...64...52.256416...3.......|156423243516461352325641614235532164|2',
      '.4...31..6.5...12.6.....351...2..5.1|546213123645435126612354351462264531|2',
      '.64..3..3..5..6...352.6.....24.2.1..|564213213645146352352461631524425136|2',
      '.4..2..614..1.4.63.3..........3.5.41|543126261435154263632514416352325641|2',
      '163.5..4...1.3...2426.3...4..3......|163254245361531642426135614523352416|2',
      '.4..25.6534...15..3.6..461..........|143625265341421536356214612453534162|2',
      '.3.26.....4....31..6.4.565....321...|435261216543542316163425654132321654|2',
      '..3...4.61.....3211...6.3.4..2..1.5.|513246426135645321132564354612261453|2',
      '..16..4...51....2......416...5.4316.|251643436251314526625314162435543162|2',
    ],
  },
  D: {n: 9, bw: 3, bh: 3,
    easy: [
      '1835..6.2746..2.9..92...8......459.8.578.326.4.872......5...42..7.2..3592.9..4786|183597642746182593592436817321645978957813264468729135635978421874261359219354786|2',
      '..148...38.4....6.9671...423257...1971.....8448...125754...7936.9....1.81...634..|251486793834279561967135842325748619719652384486391257542817936693524178178963425|2',
      '2.3.157....6439.1.51.8..463...5628....2...1....8193...637..1.42.2.3569....527.3.6|243615798786439215519827463971562834362748159458193627637981542824356971195274386|2',
      '...3.5..145.217.8.61....53.2.5.3..1.9718.6325.3..5.6.9.98....62.4.621.931..9.3...|789365241453217986612498537265739418971846325834152679398574162547621893126983754|2',
      '5....2916.1....7..27614...36.138742..8.....7..392148.53...61258..7....3.1254....7|543872916918653742276149583651387429482596371739214865394761258867925134125438697|2',
      '7...4.25.85279..611.9..57.8...2....6216...5439....6...6.85..3.242..67985.37.8...4|763148259852793461149625738374251896216879543985436127698514372421367985537982614|2',
      '859137..27....28.1.6.45.9..5.6.24.....79.15.....57.3.4..1.65.4.6.47....59..243618|859137462743692851162458973596324187437981526218576394321865749684719235975243618|2',
      '524963..11.97....63..2....9..35.9.6..623.851..4.1.69..6....7..24....26.52..695147|524963781189754326376281459713549268962378514845126973651437892497812635238695147|2',
      '.7.14.6..12..9.48..592....35..7..32626.5.3.49931..6..87....126..12.5..37..8.72.5.|873145692126397485459268713584719326267583149931426578795831264612954837348672951|2',
      '243.1...85..427..1.7.38.2..435.9.1..8.7...4.3..6.3.759..2.59.6.3..678..26...4.817|243915678568427931971386245435792186897561423126834759782159364314678592659243817|2',
      '..97...5.384.5...75.13.948.9265....88.3...9.44....2563.481.62.56...7.149.9...38..|269748351384251697571369482926534718853617924417982563748196235632875149195423876|2',
      '6.573..14.7...83653..6.5..91425..67...........67..19234..8.7..27389...4.25..148.7|685739214974128365321645789142593678893276451567481923419867532738952146256314897|2',
      '.5.....3629..3.5...63275894..7..3.81..67.14..81.4..9..64915732...1.4..6557.....4.|754819236298634517163275894427593681936781452815426973649157328381942765572368149|2',
      '57.83.2...16....4.982514.3.1..38...4..71.93..4...72..9.4.763918.9....57...8.51.62|574836291316297845982514637169385724827149356453672189245763918691428573738951462|2',
      '36..25.17..941..3.4..386...67..598....31.45....473..61...693..4.4..713..73.84..96|368925417259417638417386925671259843823164579594738261182693754946571382735842196|3',
      '.......1.6.52.83.4.48951...164.879.25..4.2..62.316.485...81576.8.67.32.1.9.......|927346518615278394348951627164587932589432176273169485432815769856793241791624853|2',
      '.1...542.89..4..63.276..5.8..198..7.98.2.7.41.4..368..3.9..178.17..6..32.583...1.|613895427895742163427613598531984276986257341742136859369421785174568932258379614|2',
      '3651.4..7.......548.9.7632..8.9..24693.....15214..5.3..2179.5.369.......7..6.1492|365124987172389654849576321587913246936247815214865739421798563693452178758631492|2',
      '...371...9.1..83.682.6.4..1..2.869.434.1.9.575.643.1..6..7.5.292.79..4.5...842...|465371298971258346823694571712586934348129657596437182634715829287963415159842763|2',
      '..98...75584..2.9.1.356.8.264.35.....3.1.6.5.....27.364.6.735.1.2.4..76971...53..|269834175584712693173569842642358917937146258851927436496273581325481769718695324|2',
    ],
    medium: [
      '..3.4..69.4..67..262.1...7...6..842..8.6.3.5..374..6...9...5.467..23..8.45..9.2..|173542869849367512625189374516978423984623157237451698392815746761234985458796231|2',
      '.9......7..82.693...18954...376.2.4....5.9....6.7.132...43582...859.47..9......5.|296413587458276931371895462537682149142539678869741325714358296685924713923167854|2',
      '..9..5.675.76.2.81.1...732.38....5.....2.4.....2....79.784...5.95.7.82.446.5..7..|829135467537642981614897325386971542795284136142356879278419653953768214461523798|3',
      '..8..26.1..367..5.....158...3.2..964.82...13.749..3.2...593.....6..512..8.47..3..|458392671913678452276415893531287964682549137749163528125934786367851249894726315|2',
      '32...67...67234.5.5..7.86..21.5......4.....7......9.42..64.5..8.7.68341...81...67|321956784867234951594718623219547836643821579785369142136475298972683415458192367|2',
      '.9.13.6.....9.2.131.4..8.......437.6.678.534.3.861.......7..5.987.3.9.....9.26.3.|792134658685972413134568972951243786267895341348617295423781569876359124519426837|2',
      '23..4.7.8..12....945....1...6.4.58..34.7.8.91..79.6.5...6....178....74..7.4.5..86|239541768671283549458679132962415873345728691187936254526894317893167425714352986|2',
      '93.157...17..9.35...6.4.91...268.....9.....4.....291...83.1.4...69.7..31...963.78|934157826178296354526348917342681795891735642657429183783512469269874531415963278|3',
      '.6..9......8.741.9.798.1..4..69.8.1.93.....52.8.4.27..5..2.967.8.754.3......8..4.|461395287258674139379821564726958413934167852185432796543219678897546321612783945|2',
      '5.7..69...43.29.....6.....8.592.847...13.46...385.729.1.....7.....67.82...24..1.9|517836942843129567926745318659218473271394685438567291184952736395671824762483159|2',
      '..9.2...6...6..4.8.684.5..2.3.75.2...752.698...4.13.6.8..3.974.7.3..4...6...7.8..|419827356527631498368495172936758214175246983284913567852369741793184625641572839|2',
      '7..9..5..5.9.462..8...7...43..28..46.1.4.7.8.49..31..59...1...7..736.9.2..6..5..3|764928531539146278821573694375289146612457389498631725953812467187364952246795813|2',
      '..196...5..5...136.3..14..23.9.576...6.....7...842.3.97..84..9.924...8..8...795..|281963745495782136637514982349157628562398471178426359756841293924635817813279564|2',
      '12.3..6.58.3.5.4...6.2..3.16..47.8.2.........3.4.28..72.8..4.9...6.9.7.39.7..5.18|129347685873156429465289371691473852782561934354928167238714596516892743947635218|2',
      '42..5.6.......273..756.19..7.49....65..3.7..29....85.7..95.386..568.......7.1..59|423759618691482735875631924714925386568347192932168547249573861156894273387216459|2',
      '.4..2..73..64....98297.315.2......1.9..6.1..7.8......5.148.75323....48..59..3..4.|145928673736415289829763154267549318953681427481372965614897532372154896598236741|2',
      '....8.2.7..1.2..8.2685...4...9.476181.......538691.7...1...6859.9..5.3..6.5.9....|453681297971423586268579143529347618147862935386915724714236859892754361635198472|2',
      '.85.3.4..92.4.7.31..4..825...8..13.9.........5.18..6...621..7..81.2.4.63..7.8.91.|185632497926457831734918256678541329243769185591823674362195748819274563457386912|3',
      '254.98..7.7.2.68...8..7..2.39.......861...395.......18.1..8..7...69.1.8.5..76.941|254198637173246859689573124397815462861427395425639718912384576746951283538762941|2',
      '..7..1..53...9.71..24.37....5.3.46..492...538..68.9.2....68.45..48.1...35..7..8..|987261345365498712124537986851324697492176538736859124279683451648915273513742869|2',
    ],
    hard: [
      '.......9.3..5.1.2...1..7..51.3..8.56.5.416.8.86.7..9.42..1..4...1.3.4..9.8.......|475862193398541627621937845143298756957416382862753914239175468516384279784629531|4',
      '..72...93..3.9...5...7..18.4.1.8....39..7..64....3.2.1.16..8...7...6.5..58...76..|857216493163894725249753186421685937395172864678439251916548372732961548584327619|4',
      '2.9.1..5.1....6..34........69.14.7....59286....1.73.29........55..2....6.7..8.3.2|269317854187456293453892167692145738735928641841673529324761985518239476976584312|4',
      '73....489.....82....1.4.53....78.....1.436.5.....52....54.1.3....75.....923....15|732165489546398271891247536365781942219436758478952163654819327187523694923674815|4',
      '..28..46...81.4.2..5.76.3.....4...3....685....2...7.....3.76.5..4.3.96...69..82..|972853461638194527451762389597421836314685792826937145183276954245319678769548213|4',
      '14...37...8....5....3.....1.9..28...854716392...43..7.9.....6....6....4...26...89|145293768289167534763854921397528416854716392621439875918342657576981243432675189|4',
      '..2389..7......3.8.8....592..91.3.....8.6.7.....5.81..873....5.1.5......6..7358..|562389417941257368387416592759143286418962735236578149873621954125894673694735821|4',
      '.5.7...2...9..48.1...8..6....6.1.2..14.278.69..2.9.4....7..5...3.41..7...2...7.8.|658731924279654831431829657596413278143278569782596413817965342364182795925347186|4',
      '12...6..4.475......934.8...4...6..1...6.5.4...7..8...5...8.356......523.9..6...41|128736954647529183593418726459267318386951472271384695712843569864195237935672841|4',
      '6...2.7.3..........9431.258...2..1..3..165..2..2..7...159.8342..........4.8.5...6|681529743523874961794316258965238174347165892812497635159683427236741589478952316|4',
      '......43.5.......6..85.671...6857.....94216.....6391...429.85..6.......1.91......|967182435514793826238546719126857394379421658485639172742918563653274981891365247|4',
      '.........3...94.68..4.3.7.24...2.5..85.476.13..6.5...75.9.4.2..74.36...5.........|615287349327594168984631752473129586852476913196853427569748231741362895238915674|4',
      '...4..29...4.9..6....3.2.....6..485784..1..297928..4.....1.8....2..5.1...13..9...|351467298284591763679382541136924857845716329792835416567148932928653174413279685|4',
      '......2..7495...6..8.1.94.787.6....1....8....2....1.969.82.7.3..5...3912..3......|561734289749528163382169457874695321196382745235471896918257634657843912423916578|4',
      '8.23...1..7..2..63.....7..835.8...2....276....2...3.867..5.....28..6..3..9...28.4|862345719471928563539617248356891427948276351127453986713584692284769135695132874|4',
      '38.....127..3.198.4.....5...7.4.5.3.....2.....2.8.3.9...4.....5.375.6..165.....79|385964712762351984419287563976415238843629157521873496194738625237596841658142379|4',
      '......91.9....7..5..349867...5..1..3..6.7.5..2..5..7...217368..4..1....7.87......|678352914942617385153498672795821463836974521214563798521736849469185237387249156|4',
      '..3.9582.9..6.2..55.........57.6.....6.254.7.....3.56.........82..1.6..4.9154.2..|613495827984672315572813649357961482168254973429738561746329158235186794891547236|4',
      '3..4.965.9.1....2....12...8....4...24.3.1.5.92...3....1...64....3....4.5.453.2..7|328479651971658324564123798716945832483216579259837146197564283832791465645382917|4',
      '.....1....56.7.8.33....876...5....37.9.752.8.87....9...398....46.8.1.52....9.....|987631245156274893324598761265189437493752186871463952739825614648317529512946378|4',
    ],
  },
};
/* ---------- spelling words (P2-19, CURRICULUM E-spell) ---------- */
/* SPELL_WORDS[lv] is one string per level, one word per line as `word|sentence`. The sentence holds the word exactly once (a capital
   letter at the start is fine); the app shows it with the word blanked out and speaks word, sentence, word.
   Homophones (their/there, knight/night ...) have sentences that only one of them fits. Words are a-z only, 12 letters at most,
   and pass the BAD filter (tools/test.js checks all of this). Level 1 has 40 words, levels 2 to 7 have 60. */
const SPELL_WORDS={
1:`cat|The cat sat on the mat.
bed|I go to bed at night.
pig|The pig rolled in the mud.
hot|The soup is too hot to eat.
sun|The sun is up in the sky.
dog|My dog likes to run and play.
hat|She put a hat on her head.
cup|Please fill my cup with milk.
bus|We ride the bus to school.
fox|A red fox ran into the woods.
bug|I found a little bug on a leaf.
hen|The hen sat on her egg.
box|The toy is in the big box.
map|We looked at the map to find the park.
pen|Write your name with a pen.
van|Dad drove the van to the shop.
bag|Put your lunch in the bag.
rat|A rat ran under the barn.
nut|The squirrel ate a nut.
egg|She cracked the egg into a bowl.
tub|The baby splashed in the tub.
mug|He drank cocoa from a warm mug.
net|The fish swam into the net.
jam|I like jam on my toast.
lip|He bit his lip.
fin|The shark has a big fin.
log|A frog sat on the log.
mop|Please use the mop on the floor.
top|The ball is on the top shelf.
pot|Mom cooked soup in a pot.
red|My kite is red.
wet|The dog got wet in the rain.
yes|Can I have more? Yes, you can!
run|I can run very fast.
sit|Please sit down on the rug.
hop|The bunny will hop away.
dig|We dig a hole in the sand.
fan|A fan keeps us cool.
lid|Put the lid on the jar.
gum|Do not stick gum under the desk.`,
2:`ship|The ship sailed across the sea.
chat|We like to chat after lunch.
thin|The paper is very thin.
frog|The frog jumped into the pond.
duck|A duck swam on the lake.
bell|The school bell rang.
grass|The cows eat the green grass.
dress|She wore a red dress.
chip|I dropped a chip of wood.
shop|We went to the shop for bread.
fish|The fish swam in the bowl.
that|Look at that big dog.
this|This is my favorite book.
when|Tell me when you are ready.
with|Come and play with me.
crab|The crab walked on the sand.
drum|He beat the drum loudly.
flag|The flag waves in the wind.
step|Take one step forward.
clap|Clap your hands to the beat.
swim|I learned to swim last summer.
stop|Stop at the red light.
plan|We made a plan for the picnic.
trip|We took a trip to the zoo.
snap|I heard a twig snap.
skip|The girls skip rope at recess.
spot|The cat has a white spot.
clock|The clock on the wall says six.
truck|A big truck carried the sand.
sock|I lost one sock in the wash.
kick|Kick the ball to me.
neck|A giraffe has a long neck.
back|Put the book back on the shelf.
pack|Pack your bag for the trip.
rock|He found a smooth rock.
tick|I can hear the clock tick.
doll|She hugged her soft doll.
hill|We rolled down the hill.
mill|The old mill is by the river.
fill|Fill the glass with water.
well|I do not feel well today.
toss|Toss the ball to your friend.
moss|Green moss grows on the log.
miss|I miss my grandma.
fuss|The baby began to fuss.
glad|I am glad you came.
slip|Do not slip on the wet floor.
brush|Brush your teeth twice a day.
splash|The kids splash in the puddle.
chest|The pirate hid gold in a chest.
shell|I found a shell on the beach.
cloth|Wipe the table with a cloth.
film|We watched a film at school.
tent|We slept in a tent.
nest|A bird built a nest in the tree.
milk|I drink milk with my dinner.
gift|She gave me a gift.
sand|The sand is warm and soft.
lamp|Turn on the lamp to read.
jump|Can you jump over the rope?`,
3:`cake|We ate cake at the party.
kite|The kite flew high in the sky.
bike|I ride my bike to the park.
home|It is time to go home.
rose|A red rose grew by the gate.
bone|The dog buried a bone.
nose|A clown has a red nose.
game|Let us play a game.
five|I have five fingers on my hand.
nine|The clock struck nine.
plane|The plane flew over the town.
snake|A snake slid through the grass.
smile|Her smile is big and bright.
wave|Wave goodbye to Grandpa.
slide|We took turns on the slide.
stone|He skipped a stone on the lake.
rain|The rain tapped on the window.
boat|We rowed the boat to the shore.
tree|A bird sat in the tree.
train|The train rolled into the station.
snail|A snail moves very slowly.
road|The road winds up the hill.
soap|Wash your hands with soap.
moon|The moon shines at night.
book|I read a book before bed.
boot|He lost a boot in the snow.
cheese|I like cheese on my pizza.
tooth|My loose tooth fell out.
mail|The mail came early today.
seed|Plant a seed in the dirt.
leaf|A leaf floated down the stream.
feet|My feet are cold.
sheep|The sheep ate grass on the farm.
goat|The goat climbed the rocks.
coat|Wear your coat outside.
team|Our team won the game.
meat|We cooked meat on the grill.
beach|We built castles at the beach.
paint|Paint a picture of the sea.
wait|Please wait for me.
play|The children play at recess.
day|It was a sunny day.
gray|The sky turned gray.
light|Turn on the light.
night|The stars come out at night.
right|Turn right at the corner.
jumped|The cat jumped on the sofa.
helped|She helped me carry the bags.
walked|We walked to the park.
played|They played ball all afternoon.
looked|He looked out the window.
painted|We painted the fence white.
jumping|The frog is jumping in the pond.
playing|The kids are playing outside.
singing|Birds are singing in the morning.
asking|She is asking a question.
reading|I am reading a funny story.
tube|Squeeze the tube of paste.
pine|A pine tree smells fresh.
cold|The water in the lake is cold.`,
4:`first|I was first in line.
girl|The girl waved at us.
bird|A bird sang in the tree.
turn|It is my turn to play.
hurt|Did you hurt your knee?
star|The star twinkled at night.
farm|The cows live on the farm.
barn|The horse sleeps in the barn.
corn|We ate corn at dinner.
horse|The horse ran across the field.
fork|Use a fork to eat your peas.
storm|A big storm blew in last night.
shirt|He wore a blue shirt.
sport|Soccer is my favorite sport.
dark|It is dark in the cave.
cloud|One white cloud floated by.
house|Our house has a red door.
mouse|A mouse hid in the wall.
brown|The brown bear ate honey.
clown|The clown made us laugh.
town|We walked to town.
flower|She picked a yellow flower.
coin|I found a coin on the ground.
oil|Oil and water do not mix.
boy|The boy kicked the ball.
toy|My toy is under the bed.
join|Join us for a snack.
hopping|The bunny is hopping across the yard.
running|We are running in the race.
sitting|She is sitting on the porch.
swimming|The ducks are swimming in the pond.
stopped|The bus stopped at the corner.
planned|We planned a surprise party.
making|Dad is making pancakes.
taking|She is taking a picture.
hoping|I am hoping for snow.
riding|He is riding his bike.
babies|The babies are asleep.
puppies|Three puppies played in the yard.
families|Many families came to the show.
boxes|We packed the boxes in the car.
wishes|She made three wishes.
buses|Two buses stopped at the school.
dishes|Please wash the dishes.
friend|My friend lives next door.
said|She said hello to me.
were|We were at the park.
people|Many people came to the fair.
because|I was happy because it was my birthday.
again|Please read it again.
water|I drink a glass of water.
very|The soup is very hot.
once|Once there was a little pig.
only|I have only one pencil.
done|I am done with my chores.
could|I wish I could fly.
would|Would you like some tea?
laugh|The jokes made us laugh.
two|I have two sisters.
eight|The movie starts at eight.`,
5:`unhappy|He was unhappy when the toy broke.
unfair|It is unfair to cut in line.
unlock|Use the key to unlock the door.
unkind|It is unkind to laugh at someone who falls.
undo|Please undo the knot in my shoelace.
replay|Let us replay the song.
rewrite|Please rewrite your story neatly.
preheat|Preheat the oven before you bake.
preview|We watched a preview of the new movie.
disagree|I disagree with that idea.
dislike|I dislike loud noises.
careful|Be careful with the glass.
helpful|She is a very helpful girl.
joyful|The joyful crowd cheered.
painful|A splinter can be painful.
playful|The playful puppy chased his tail.
useless|A broken pencil is useless.
kindness|Her kindness made me smile.
slowly|The turtle walked slowly.
quickly|He ran quickly to the door.
quietly|She tiptoed quietly past the baby.
teacher|My teacher reads to us every day.
knight|The brave knight rode a horse.
knee|I scraped my knee.
knife|Use a knife to cut the apple.
know|Do you know the answer?
write|Write your name at the top.
wrist|He wears a watch on his wrist.
wrong|That answer is wrong.
wrap|Wrap the present in paper.
gnat|A tiny gnat buzzed by my ear.
lamb|The lamb stayed close to its mother.
comb|Comb your hair before school.
climb|We climb the tall hill.
thumb|I hurt my thumb.
listen|Listen to the music.
castle|The castle sits on a hill.
their|The kids put on their coats.
there|Put the book over there.
hear|I can hear birds singing.
here|Come over here and sit.
to|We went to the park.
too|I want to come too.
see|I see a bird in the tree.
sea|The ship sailed on the sea.
son|Their son plays the drums.
new|I got a new bike.
knew|I knew the answer right away.
by|She sat by the window.
buy|We buy fruit at the market.
flour|Mix the flour with the eggs.
week|We have school five days a week.
weak|The baby bird was weak.
tail|The dog wagged its tail.
tale|Grandpa told a tale about a giant.
meet|I will meet you at the gate.
bear|A bear sleeps all winter.
pair|I bought a new pair of shoes.
wood|We burned wood in the fireplace.
would|Would you like some tea?`,
6:`nation|Our nation has fifty states.
station|The train left the station.
action|The movie was full of action.
fraction|One half is a fraction.
question|May I ask a question?
mention|Please do not mention the surprise.
section|Read the first section of the book.
collection|She has a collection of shells.
direction|Which direction is the park?
invention|The lightbulb was a great invention.
vacation|We went to the lake on vacation.
education|A good education opens many doors.
decision|It was a hard decision.
vision|Glasses help improve your vision.
division|We learned long division today.
television|We watched television after dinner.
confusion|There was confusion at the door.
possible|Anything is possible if you try.
terrible|The storm was terrible.
horrible|The monster in the story was horrible.
visible|The moon was visible through the clouds.
sensible|It is sensible to wear a helmet.
comfortable|This chair is very comfortable.
reasonable|The price of the shirt is reasonable.
capable|She is capable of lifting the box.
valuable|The old coin is valuable.
enjoyable|The picnic was enjoyable.
believable|His story was not believable.
separate|Please separate the red beads from the blue.
necessary|It is necessary to wear shoes.
different|My sister and I are different.
beautiful|The garden is beautiful in spring.
favorite|Blue is my favorite color.
interesting|That was an interesting book.
vegetable|Carrot is a vegetable.
library|I borrowed a book from the library.
february|My birthday is in february.
government|The government makes the laws.
neighbor|My neighbor waves from her porch.
exercise|We do exercise every morning.
important|It is important to drink water.
probably|It will probably rain today.
surprise|The party was a big surprise.
business|He runs a small business.
calendar|Look at the calendar to see the date.
camera|She took a photo with her camera.
thermometer|The thermometer shows the temperature.
telephone|Please answer the telephone.
microscope|We looked at a leaf under the microscope.
autograph|The singer signed an autograph for me.
photograph|I framed a photograph of my family.
geography|In geography we studied maps.
biology|Biology is the study of living things.
automatic|The door is automatic.
century|A century is one hundred years.
describe|Describe the animal you saw.
unusual|A purple cow is unusual.
whether|I wonder whether it will snow.
believe|I believe you are right.
receive|I hope to receive a letter.`,
7:`accommodate|The hotel can accommodate fifty guests.
rhythm|The drummer kept a steady rhythm.
environment|We must protect the environment.
definitely|I will definitely be there.
embarrass|Do not embarrass your little brother.
occasion|A birthday is a special occasion.
occurred|The accident occurred last night.
recommend|I recommend this book to you.
familiar|That song sounds familiar.
committee|The committee voted on the plan.
address|Write your address on the envelope.
success|Hard work leads to success.
across|The bridge goes across the river.
tomorrow|We will visit grandma tomorrow.
paragraph|Each paragraph has a main idea.
conscience|Her conscience told her to tell the truth.
disappear|Magicians make rabbits disappear.
disappoint|I did not want to disappoint my coach.
immediately|Please come immediately.
independent|She is an independent girl.
parallel|The two roads run parallel to each other.
privilege|Having a pet is a privilege.
pronounce|Can you pronounce that long word?
restaurant|We ate dinner at the restaurant.
schedule|My schedule is full on Tuesday.
sincerely|Sincerely, your friend, Sam.
temperature|The temperature dropped overnight.
vocabulary|She learns new vocabulary every week.
awkward|He felt awkward at the dance.
column|Read the first column of the page.
exaggerate|Do not exaggerate when you tell the story.
foreign|She speaks a foreign language.
height|The height of the tree surprised us.
humorous|The humorous story made us giggle.
jewelry|Her jewelry sparkled in the light.
leisure|He reads in his leisure time.
miniature|The museum had a miniature train.
mischievous|The mischievous kitten unrolled the yarn.
noticeable|The scratch on the car was noticeable.
opportunity|This is a great opportunity to learn.
perseverance|Perseverance helped him finish the race.
physical|Running is good physical activity.
playwright|The playwright wrote a new show.
possession|The coat is my favorite possession.
guarantee|The shop will guarantee the repair.
reference|Use a dictionary for reference.
relevant|Keep your answer relevant to the question.
responsible|I am responsible for feeding the dog.
sandwich|She packed a ham sandwich.
secretary|The secretary answered the phone.
silhouette|We saw a silhouette against the wall.
suppose|I suppose you are right.
symbol|A dove is a symbol of peace.
technique|She practiced her painting technique.
thorough|He gave the room a thorough cleaning.
twelfth|Her birthday is on the twelfth of June.
unanimous|The vote was unanimous.
variety|The store sells a variety of fruit.
wednesday|We have art class on wednesday.
yacht|The yacht sailed past the island.`
};

/* ---------- spelling generator (P2-19) ---------- */
/* Skill `spell`, levels 1-7. Data is read only inside these functions (data files load after the code). */
const SPELL_CACHE={};
// [[word, sentence], ...] of a level, parsed once
function spellList(lv){
  if(!SPELL_CACHE[lv])SPELL_CACHE[lv]=String(SPELL_WORDS[lv]||'').split('\n').map(l=>l.split('|'));
  return SPELL_CACHE[lv];
}
// A picture for words the reading lists already have an emoji for; picFor swaps in the drawing when one exists
function spellPic(w){
  for(const L of [CVC,BLEND,MAGICE,TEAMS])for(const [x,e] of L)if(x==w)return picFor(w,e);
  return '';
}
function genSpell(lv){
  const [w,s]=pick(spellList(lv));
  const blanked=s.replace(new RegExp('\\b'+w+'\\b','i'),'_____'); // the visible clue when speech is off
  const pic=spellPic(w);
  return{kind:'spell',word:w,ans:w,auto:true,after:w,
    html:`${pic?`<div class="emo">${pic}</div>`:''}<div class="bq">${esc(blanked)}</div>`
      +`<div class="lslots">${[...w].map((_,i)=>`<span class="ls" id="ls${i}"></span>`).join('')}</div>`,
    say:`${w}. ${s} ${w}.`,
    hint:{k:'say',w,s:`It has ${w.length} letters and starts with “${w[0]}”.`},
    label:`spelling “${w}”`};
}
/* ---------- tracing glyphs (P2-16 digits; P2-17 adds A-Z and a-z in the same format) ----------
   Read by the tracing engine (src/js/47-trace.js, kind 'trace') only inside functions: this file loads after all code (A11).

   FORMAT
   TRACE.sets[setId] = {
     n:      what one glyph is called when spoken ('number', 'letter')
     lines:  {top, mid, base[, desc]}  y of the handwriting lines drawn on the board (top line, dashed middle line, base line,
             optional descender line). Digits and capitals sit from top to base; P2-17 lowercase uses mid as the x-height and
             desc for the tails of g j p q y.
     order:  the glyph keys in teaching order (digits '0'..'9'; P2-17 letters in the same order as abc 1)
     glyphs: {key: {say, s}}
       say   the spoken name ('three')
       s     the strokes, in handwriting order (1 to 4 per glyph). A stroke is a list of points [x, y] on the centre line of the
             pen, in a fixed 100 x 100 box (x right, y down; whole numbers or one decimal), in the direction the pen moves.
             The pen goes smoothly through the points (a Catmull-Rom curve, drawn and checked as the same curve), so:
               - two points make a straight line;
               - a third value 1 ([x, y, 1]) makes that point a sharp corner (the pen stops and turns: the 7, the foot of the 2,
                 the 4's L, the top of the 9's stem);
               - a stroke whose last point equals its first is a closed loop (0, 8): the curve runs smoothly through the join;
               - a stroke of one point is a dot (the dot of i and j in P2-17): a tap on it.
             Put points about 8 to 14 units apart along curves (ovals: 10 to 12 points), never two equal points in a row.
   Stroke order and direction follow the school manuscript model (top to bottom, left to right, CURRICULUM E-trace):
     0  one stroke: start at the top, curve left (down the left side), around and back up to the start
     1  one stroke: straight down
     2  one stroke: start below the top line on the left, curve up and around to the right, slant down to the bottom left,
        slide right along the base line
     3  one stroke: start top left, curve around to the middle, then around again to the bottom left
     4  two strokes: (1) down from the top, then slide right; (2) the long line down from the top, crossing the slide
     5  two strokes: (1) down from the top to the middle, then around the belly; (2) the top flag, sliding right
     6  one stroke: start top right, curve down and left to the bottom, around and up to close the loop
     7  one stroke: slide right along the top line, then slant down to the base line
     8  one stroke: start at the top, curve left and make an S down to the bottom, then go back up the other way to the start
     9  one stroke: start on the right of the ball, circle up and left all the way around, then straight down
   The tests (tools/test.js "tracing P2-16") check every stroke: inside the box and between the lines, long enough, points apart,
   the stroke count and start direction above, and that ideal and noisy traces along it pass while wrong ones fail. */
const TRACE = {
  sets: {
    digit: {
      n: 'number',
      lines: { top: 10, mid: 50, base: 90 },
      order: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      glyphs: {
        '0': { say: 'zero', s: [
          [[50, 10], [38.5, 15.4], [30.1, 30], [27, 50], [30.1, 70], [38.5, 84.6], [50, 90], [61.5, 84.6], [69.9, 70], [73, 50],
            [69.9, 30], [61.5, 15.4], [50, 10]],
        ] },
        '1': { say: 'one', s: [
          [[50, 10], [50, 90]],
        ] },
        '2': { say: 'two', s: [
          [[29, 25], [35, 15], [46, 10], [58, 10.5], [68, 16], [71, 27], [68, 39], [59, 51], [46, 65], [28, 90, 1], [74, 90]],
        ] },
        '3': { say: 'three', s: [
          [[30, 19], [39, 12], [51, 10], [63, 13], [69, 22], [67, 33], [58, 42], [46, 47, 1], [60, 51], [70, 59], [73, 71],
            [69, 83], [58, 90], [44, 90], [31, 84]],
        ] },
        '4': { say: 'four', s: [
          [[33, 10], [29, 60, 1], [76, 60]],
          [[62, 10], [62, 90]],
        ] },
        '5': { say: 'five', s: [
          [[34, 10], [32, 47, 1], [43, 41], [56, 41], [67, 47], [72, 58], [72, 71], [66, 83], [55, 90], [42, 90], [31, 85]],
          [[34, 10], [70, 10]],
        ] },
        '6': { say: 'six', s: [
          [[66, 14], [56, 10], [45, 12], [36, 21], [30, 34], [28, 50], [29, 66], [35, 80], [46, 89], [58, 89], [68, 81],
            [72, 69], [68, 57], [58, 50], [46, 50], [36, 55], [29, 63]],
        ] },
        '7': { say: 'seven', s: [
          [[27, 10], [73, 10, 1], [44, 90]],
        ] },
        '8': { say: 'eight', s: [
          [[50, 10], [40, 13], [35, 22], [38, 33], [50, 46], [63, 56], [70, 67], [68, 80], [58, 89], [44, 89], [33, 81], [31, 68],
            [37, 57], [50, 46], [61, 35], [65, 23], [60, 13], [50, 10]],
        ] },
        '9': { say: 'nine', s: [
          [[68, 25], [63, 14], [52, 10], [41, 12], [33, 20], [31, 31], [36, 42], [47, 48], [59, 46], [67, 37], [68, 25, 1],
            [68, 90]],
        ] },
      },
    },
  },
};
/* ---------- vocabulary, levels 1-10 (P2-22 levels 1-5, P2-23 levels 6-10; CURRICULUM E-vocab) ---------- */
/* BANK.vocab is built once, when this file loads, from the plain lists below. Nothing here uses rnd(): the same file always gives the
   same items, and the round engine (37-bank.js genBank) does all the shuffling at question time.
   Level 1 opposites, 2 synonyms, 3 compound words, 4 prefixes (un re pre dis mis), 5 suffixes (ful less ly er est able).
   Rows are `a|b|c,d` text, one item per line; an optional last column `name,emoji` is a picture for the prompt word (picFor).
   The distractors are real, plausible mistakes: a synonym when the question asks for an opposite, the other prefix or suffix
   meanings of the same base word, and so on. Every item has exactly one right answer. A test (tools/test.js, "vocabulary") checks it all. */

const VOC_HINT = {
  1: 'Say it as a pair, like "black and white". Which word is the very opposite?',
  2: 'Try each word in a sentence in place of the first one. Which still says the same thing?',
  3: 'Listen to the long word. Break it where you hear two small words, then check the pair.',
  4: 'Split off the little start piece. Read the base word first, then think what the start piece adds.',
  5: 'Cover the ending and read the base word. Then think what the ending adds to it.',
};

const VOC_L1 = `hot|cold|warm,wet|hot,🔥
cold|hot|icy,snowy|cold,❄
big|small|huge,tall|big,🐘
small|big|tiny,short|small,🐭
up|down|over,high
in|out|inside,under
day|night|sunny,morning|day,☀
night|day|dark,moon|night,🌙
open|shut|wide,broken|open,🔓
happy|sad|glad,silly|happy,😊
fast|slow|quick,late|fast,🏎
old|new|dusty,tall|old,👴
young|old|little,small|young,👶
wet|dry|damp,cold|wet,💧
full|empty|heavy,more|full,🥛
soft|hard|fluffy,loud
loud|quiet|noisy,busy|loud,🔊
stop|go|halt,wait
push|pull|shove,pick
long|short|wide,thin
front|back|side,top
top|bottom|middle,side
give|take|pass,share
awake|asleep|tired,quiet
early|late|soon,first
clean|dirty|tidy,shiny
easy|hard|simple,fun
dark|bright|black,night
left|right|back,up
near|far|close,here
low|high|small,down
smile|frown|grin,laugh|smile,🙂
win|lose|play,race|win,🏆
laugh|cry|giggle,smile
sweet|sour|sugar,tasty|sweet,🍬
come|go|arrive,walk
buy|sell|pay,shop|buy,🛍
start|end|begin,first
yes|no|maybe,okay
above|below|over,high
thick|thin|fat,wide
heavy|light|big,strong
boy|girl|man,baby|boy,👦
same|different|equal,alike
true|false|real,right
before|after|first,early
always|never|often,usually
many|few|lots,plenty
stand|sit|run,jump
sink|float|swim,drop
rough|smooth|bumpy,hard
tight|loose|snug,small
brave|scared|bold,strong
forget|remember|lose,miss
lost|found|missing,gone
narrow|wide|thin,small`;

const VOC_L2 = `happy|glad|sad,tired
big|large|small,tall
small|tiny|huge,heavy
fast|quick|slow,late
smart|clever|silly,quiet
begin|start|end,wait
end|finish|begin,stay
shout|yell|whisper,hum
pretty|beautiful|messy,plain
look|see|hear,taste
tired|sleepy|hungry,angry
mad|angry|sleepy,silly
sad|unhappy|excited,sleepy
scared|afraid|brave,calm
glad|pleased|upset,tired
nice|kind|rude,loud
quiet|silent|noisy,busy
jump|leap|crawl,sit
walk|stroll|sprint,hop
run|dash|crawl,rest
toss|throw|catch,hold
cold|chilly|warm,damp
rock|stone|sand,hill
road|street|bridge,field|road,🛣
home|house|school,room|home,🏠
couch|sofa|chair,table
little|small|loud,long
huge|giant|tiny,heavy
loud|noisy|quiet,slow
speak|talk|listen,write
shut|close|open,lock
choose|pick|leave,lose
grin|smile|frown,laugh
gift|present|party,wrapper|gift,🎁
kid|child|adult,baby
fix|repair|break,buy
simple|easy|hard,short
fall|drop|rise,float
hurry|rush|rest,wait
stop|halt|start,go
giggle|laugh|cry,shout
cry|weep|laugh,sing
sick|ill|well,tired
story|tale|song,poem|story,📖
bunny|rabbit|kitten,puppy
sea|ocean|lake,river|sea,🌊
under|below|above,beside
pull|tug|push,lift
pal|friend|stranger,teacher
rest|relax|work,run
tidy|neat|messy,dirty
soil|dirt|water,grass`;

// word, first part, second part, optional picture name and emoji. Every word is the two parts joined.
const VOC_L3 = `rainbow|rain|bow|rainbow,🌈
sunflower|sun|flower|sunflower,🌻
football|foot|ball
basketball|basket|ball|basketball,🏀
cupcake|cup|cake|cupcake,🧁
bedroom|bed|room|bedroom,🛏
birthday|birth|day|birthday,🎂
butterfly|butter|fly|butterfly,🦋
goldfish|gold|fish|goldfish,🐟
notebook|note|book
pancake|pan|cake
playground|play|ground
popcorn|pop|corn
raincoat|rain|coat
sailboat|sail|boat|sailboat,⛵
sandbox|sand|box
snowman|snow|man|snowman,⛄
starfish|star|fish|starfish,⭐
toothbrush|tooth|brush
backpack|back|pack
bathtub|bath|tub|bathtub,🛁
bookshelf|book|shelf
doghouse|dog|house
doorbell|door|bell
firefly|fire|fly
haircut|hair|cut
homework|home|work
ladybug|lady|bug|ladybug,🐞
lunchbox|lunch|box
mailbox|mail|box|mailbox,📬
moonlight|moon|light
newspaper|news|paper
outside|out|side
paintbrush|paint|brush
seashell|sea|shell|seashell,🐚
shoelace|shoe|lace
sidewalk|side|walk
sunshine|sun|shine
sunset|sun|set|sunset,🌅
upstairs|up|stairs
windmill|wind|mill
weekend|week|end
airplane|air|plane|airplane,✈
anthill|ant|hill
baseball|base|ball
beehive|bee|hive|beehive,🐝
blueberry|blue|berry
classroom|class|room
daydream|day|dream
fireplace|fire|place
bluebird|blue|bird|bluebird,🐦`;

// prefixes: un (not, or undo), re (again), pre (before), dis (not), mis (wrong).
// kind n = not + adjective, d = not + verb, u = undo (meaning written out), a = again, b = before, m = the wrong way.
// row: kind|prefix|base|meaning (u only)
const VOC_L4A = `n|un|happy
n|un|fair
n|un|safe
n|un|kind
n|un|clear
n|un|lucky
n|dis|honest
d|dis|like
d|dis|agree
d|dis|obey
d|dis|trust
u|un|lock|open a lock
u|un|tie|undo a knot
u|un|pack|take things out of a bag
u|un|wrap|take the wrapping off
u|un|zip|open a zipper
u|un|button|open a button
a|re|do
a|re|read
a|re|write
a|re|play
a|re|fill
a|re|build
a|re|heat
a|re|tell
a|re|paint
a|re|open
a|re|use
b|pre|heat
b|pre|pay
b|pre|wash
b|pre|test
b|pre|view
b|pre|order
m|mis|spell
m|mis|read
m|mis|use
m|mis|label
m|mis|behave
m|mis|judge
m|mis|hear`;

// add-the-start-piece items: prefix|base|meaning. Only the prefix named makes a word with exactly that meaning.
const VOC_L4B = `un|happy|not happy
un|kind|not kind
un|fair|not fair
un|safe|not safe
un|lock|open a lock
un|tie|undo a knot
re|do|do again
re|read|read again
re|write|write again
re|fill|fill again
re|build|build again
pre|heat|heat before
pre|pay|pay before
pre|wash|wash before
pre|view|view before
dis|agree|not agree
dis|obey|not obey
dis|honest|not honest
mis|spell|spell the wrong way
mis|read|read the wrong way
mis|place|put in the wrong place
mis|use|use the wrong way`;

// suffixes. Rows: word|base|ending|meaning; the other meanings come from the base word. Kinds are set by the section.
const VOC_L5_FUL = 'care help hope joy color thank play pain peace use cheer power'.split(' ');
const VOC_L5_LESS = 'care help hope fear end use harm pain sleep thought'.split(' ');
const VOC_L5_LY = 'slow quick quiet soft sad loud brave glad kind bad'.split(' ');
const VOC_L5_ER = 'tall fast small old cold strong slow bright'.split(' ');
const VOC_L5_EST = 'tall fast small old cold strong warm bright'.split(' ');
// agent -er: word|verb|"one who" word|past form for "able to be"
const VOC_L5_AGENT = `teacher|teach|teaches
singer|sing|sings
painter|paint|paints
driver|drive|drives
farmer|farm|farms
builder|build|builds`;
// -able: word|verb|past form|verb with s
const VOC_L5_ABLE = `washable|wash|washed|washes
breakable|break|broken|breaks
readable|read|read|reads
wearable|wear|worn|wears
fixable|fix|fixed|fixes
bendable|bend|bent|bends
playable|play|played|plays`;

const VOC_ROWS = t => t.split('\n').map(r => r.split('|'));
const VOC_EM = c => (c ? c.split(',') : undefined);
const VOC_IT = (lv, topic, q, a, d, form, em) => {
  const it = { lv, q, a, d, topic, hint: VOC_HINT[lv] };
  if (form) it.form = form;
  if (em) it.em = em;
  return it;
};

function vocBuild() {
  const out = [];
  // level 1 opposites and level 2 synonyms
  for (const [w, a, d, em] of VOC_ROWS(VOC_L1)) out.push(VOC_IT(1, 'opposites', `What is the opposite of ${w}?`, a, d.split(','), '', VOC_EM(em)));
  for (const [w, a, d, em] of VOC_ROWS(VOC_L2)) out.push(VOC_IT(2, 'synonyms', `Which word means the same as ${w}?`, a, d.split(','), '', VOC_EM(em)));
  // level 3 compound words: which two words make it, and what do two words make
  const L = VOC_ROWS(VOC_L3), words = new Set(L.map(x => x[0])), n = L.length;
  const other = (i, k, ok) => { // the next part from another compound (k steps on) that passes ok
    for (let j = 1; j < n; j++) { const c = L[(i + k * j) % n]; if (ok(c)) return c; }
    return L[(i + 1) % n];
  };
  L.forEach(([w, a, b, em], i) => {
    const e = em ? em.split(',') : undefined;
    const d1 = other(i, 7, c => c[2] !== b && !words.has(a + c[2]));
    const d2 = other(i, 11, c => c[1] !== a && !words.has(c[1] + b));
    const d3 = !words.has(b + a) && b + a !== w ? b + ' + ' + a : other(i, 13, c => c[1] !== a && c[2] !== b && !words.has(c[1] + d1[2])).slice(1, 3).join(' + ');
    out.push(VOC_IT(3, 'compound', `Which two words make ${w}?`, a + ' + ' + b, [a + ' + ' + d1[2], d2[1] + ' + ' + b, d3], 'wide', e));
  });
  L.forEach(([w, a, b], i) => {
    if (i % 3) return; // one in three also gets the "put them together" form (16 items)
    const near = L.filter(x => x[0] !== w && (x[1] === a || x[2] === b || x[1] === b || x[2] === a)).map(x => x[0]);
    const d = [...new Set([...near, ...[5, 9, 14, 20].map(k => L[(i + k) % n][0])])].filter(x => x !== w).slice(0, 3);
    out.push(VOC_IT(3, 'compound', `What do ${a} and ${b} make together?`, w, d, ''));
  });
  // level 4 prefixes
  const P4 = ['un', 're', 'pre', 'dis', 'mis'];
  VOC_ROWS(VOC_L4A).forEach(([k, p, b, m]) => {
    const word = p + b, not = `not ${b}`, again = `${b} again`, before = `${b} before`, wrong = `${b} the wrong way`;
    let a, d;
    if (k == 'n') { a = not; d = [`very ${b}`, again, `more ${b}`]; }
    else if (k == 'd') { a = not; d = [again, before, wrong]; }
    else if (k == 'u') { a = m; d = [again, before, wrong]; }
    else if (k == 'a') { a = again; d = [not, before, wrong]; }
    else if (k == 'b') { a = before; d = [not, again, wrong]; }
    else { a = wrong; d = [not, again, before]; }
    out.push(VOC_IT(4, 'prefix', `What does ${word} mean?`, a, d, 'wide'));
  });
  VOC_ROWS(VOC_L4B).forEach(([p, b, m], i) => {
    const sib = p == 'un' ? 'dis' : p == 'dis' ? 'un' : '';
    const rest = P4.filter(x => x != p && x != sib);
    const d = [...(sib ? [sib] : []), ...rest.slice(i % rest.length), ...rest.slice(0, i % rest.length)].slice(0, 3);
    out.push(VOC_IT(4, 'prefix', `___${b} = ${m}. Which start piece?`, p, d, ''));
  });
  // level 5 suffixes
  const S5 = ['ful', 'less', 'ly', 'er', 'est', 'able'];
  const sfx = (a, i) => { const r = S5.filter(x => x != a); const o = i % 3; return [r[o], r[(o + 2) % 5], r[(o + 3) % 5]]; };
  const A5 = (word, m, d) => out.push(VOC_IT(5, 'suffix', `What does ${word} mean?`, m, d, 'wide'));
  for (const b of VOC_L5_FUL) A5(b + 'ful', `full of ${b}`, [`without ${b}`, `more ${b}`, `the most ${b}`]);
  for (const b of VOC_L5_LESS) A5(b + 'less', `without ${b}`, [`full of ${b}`, `more ${b}`, `the most ${b}`]);
  for (const b of VOC_L5_LY) A5(b + 'ly', `in a ${b} way`, [`more ${b}`, `the most ${b}`, `not ${b}`]);
  for (const b of VOC_L5_ER) A5(b + 'er', `more ${b}`, [`in a ${b} way`, `the most ${b}`, `not ${b}`]);
  for (const b of VOC_L5_EST) A5(b + 'est', `the most ${b}`, [`more ${b}`, `in a ${b} way`, `not ${b}`]);
  for (const [w, v, s] of VOC_ROWS(VOC_L5_AGENT)) A5(w, `a person who ${s}`, [`${v} again`, `${v} the wrong way`, `${v} before`]);
  for (const [w, v, pp, vs] of VOC_ROWS(VOC_L5_ABLE)) A5(w, `able to be ${pp}`, [`a person who ${vs}`, `${v} again`, `not able to be ${pp}`]);
  // add-the-ending items: base + ___ = meaning
  const B5 = [];
  for (const b of VOC_L5_FUL.slice(0, 4)) B5.push([b, 'ful', `full of ${b}`]);
  for (const b of VOC_L5_LESS.slice(0, 4)) B5.push([b, 'less', `without ${b}`]);
  for (const b of VOC_L5_LY.slice(0, 4)) B5.push([b, 'ly', `in a ${b} way`]);
  for (const b of VOC_L5_ER.slice(0, 3)) B5.push([b, 'er', `more ${b}`]);
  for (const b of VOC_L5_EST.slice(0, 3)) B5.push([b, 'est', `the most ${b}`]);
  for (const [, v, pp] of VOC_ROWS(VOC_L5_ABLE).slice(0, 3)) B5.push([v, 'able', `able to be ${pp}`]);
  B5.forEach(([b, s, m], i) => out.push(VOC_IT(5, 'suffix', `${b} + ___ = ${m}`, s, sfx(s, i), '')));
  return out;
}


/* ---------- levels 6-10 (P2-23) ----------
   Level 6 homophones (cloze), 7 context clues (the harder word shows in bold), 8 figurative language (idiom meanings and which
   kind of language), 9 Greek and Latin roots, 10 analogies and shades of meaning. Every item has 4 choices and one right answer;
   the tests check that no choice is also right. Order-by-strength needs the `order` builder that does not exist yet (PROGRESS,
   Ideas and issues), so level 10 asks for the strongest or the weakest word as a choice. A word between * stars * prints in bold. */

const VOC_HINT_B = {
  6: 'Say each choice out loud: they sound alike. Pick the spelling whose meaning this sentence needs.',
  7: 'Read the words around the bold word. They give clues. Put each choice in its place and see which one fits.',
  8: 'Do not read the words one by one. Picture what the writer really means, then pick the choice that says it plainly.',
  8.1: 'Look for the clue words "like" or "as". Does a thing act like a person? Is one thing said to BE another? Or is it a saying?',
  9: 'Split the word into its root pieces. Put the piece meanings together, then find the choice that matches.',
  9.1: 'Think of two words you know that share this piece. What do they have in common?',
  10: 'Say how the first pair is connected in a sentence. Then use the very same connection for the second pair.',
  10.1: 'Picture the words as steps on a ladder, from a little to a lot. Which step is at the very end the question asks about?',
};

// level 6: sentence | right word | the word that sounds the same | two words that do not fit
const VOC_L6 = `I can ___ the whole ocean from here.|see|sea|saw,seed
The big ship sailed across the ___.|sea|see|seat,sell
Please ___ your name at the top of the page.|write|right|wrote,wrap
Turn ___ at the stop sign.|right|write|ride,white
I ___ the answer to the riddle yesterday.|knew|new|know,no
She wore a ___ red coat to school today.|new|knew|now,know
The kids hung ___ coats on the hooks.|their|there|they're,them
Look over ___ by the big tree.|there|their|then,these
I think ___ going to win the game.|they're|their|there,them
I have ___ pet fish at home.|two|to|too,tow
Can I come with you, ___?|too|to|two,toe
We walked ___ the park after lunch.|to|too|two,toe
Is this ___ lunch box?|your|you're|you,yours
I think ___ very kind to share.|you're|your|you,yours
The puppy wagged ___ tail.|its|it's|his,is
___ raining outside, so take an umbrella.|it's|its|him,his
Can you ___ the music from the next room?|hear|here|hair,heard
Come over ___ and sit next to me.|here|hear|her,hire
I will ___ a new notebook at the store.|buy|by|bye,bay
Wave and say ___ to your friend!|bye|buy|by,bike
Please sit ___ the window.|by|buy|bye,bay
I have ___ crayons in my box.|four|for|fore,fur
This gift is ___ you.|for|four|fore,far
Our team ___ the game on Friday.|won|one|want,own
I ate only ___ cookie after dinner.|one|won|on,own
The ___ is bright and warm today.|sun|son|sin,run
Her ___ plays the drums in a band.|son|sun|sin,soon
Mom mixed ___ and eggs to make a cake.|flour|flower|floor,flow
A bee landed on the yellow ___.|flower|flour|floor,flow
The ___ arrived with a postcard from Gran.|mail|male|mile,pail
A rooster is a ___ chicken.|male|mail|mall,mile
The cat's long ___ was soft and fluffy.|tail|tale|tall,toil
Grandpa told us a funny ___ at bedtime.|tale|tail|tall,tile
The ___ landed safely at the airport.|plane|plain|plan,lane
She wore a ___ white shirt with no pictures.|plain|plane|plan,plant
I ate a juicy ___ for a snack.|pear|pair|peer,pearl
She bought a new ___ of shoes.|pair|pear|peer,pail
Let's ___ at the park at noon.|meet|meat|met,melt
Dad cooked ___ for dinner.|meat|meet|beat,seat
We go to the library once a ___.|week|weak|weep,wick
The baby bird was too ___ to fly.|weak|week|weed,wake
The sky is ___ today.|blue|blew|blow,glue
The wind ___ my hat right off.|blew|blue|blow,glow
She ___ a big lunch at school.|ate|eight|eat,at
I have ___ stickers in my pocket.|eight|ate|eat,at
___ Grandma, thank you for the gift.|dear|deer|door,dare
We saw a ___ eating grass in the woods.|deer|dear|door,dare
The mole dug a ___ in the yard.|hole|whole|hall,hold
I ate the ___ pizza by myself.|whole|hole|hold,hall
Yesterday we ___ our bikes to school.|rode|road|ride,rod
The car drove down the long ___.|road|rode|ride,rod
The boat has a big white ___.|sail|sale|sell,soil
All the shoes are on ___ at the store.|sale|sail|sell,sole
He walked up each ___ one by one.|stair|stare|star,steer
It is rude to ___ at people.|stare|stair|star,steer
Please ___ for me by the door.|wait|weight|wet,white
The ___ of the backpack surprised me.|weight|wait|wet,white
The table is made of ___.|wood|would|hood,wouldn't
I ___ like some juice, please.|would|wood|hood,wool
A ___ rode across the sky on a broom.|witch|which|wish,watch
___ coat is yours?|which|witch|wish,watch
Be careful not to ___ the glass.|break|brake|bread,bleak
Press the ___ to stop the bike.|brake|break|bark,bake
A tiny red ___ carried a crumb up the leaf.|ant|aunt|and,at
My ___ lives in Texas and sends me cards.|aunt|ant|and,hunt
A big brown ___ ate the berries.|bear|bare|bean,beard
We walked on the sand in our ___ feet.|bare|bear|beard,bar
The brave ___ rode a horse to the castle.|knight|night|light,kit
The stars shine in the dark ___.|night|knight|light,right
I ate a ___ of cake at the party.|piece|peace|pace,place
After the war, the land was at ___.|peace|piece|pole,pearl
We left ___ boots by the door.|our|hour|out,are
The movie was one ___ long.|hour|our|out,ore
Read the poem ___ to the class.|aloud|allowed|aloof,along
Dogs are not ___ in the pool.|allowed|aloud|alone,ahead
I wonder ___ it will rain tomorrow.|whether|weather|wither,feather
The ___ is sunny and warm today.|weather|whether|wither,feather
She ___ the ball to me.|threw|through|thrown,three
We walked ___ the long tunnel.|through|threw|though,thought
Have you ___ my red hat?|seen|scene|seem,sewn
The last ___ of the play was funny.|scene|seen|seem,scent
The lion shook his big ___.|mane|main|man,mine
The ___ road was busy with cars.|main|mane|man,mean
The bridge is made of strong ___.|steel|steal|stool,steep
It is wrong to ___ a toy from a shop.|steal|steel|steam,stale
Our team will ___ the other team.|beat|beet|beer,belt
The red ___ grew in the garden.|beet|beat|beer,belt
I will ___ my old bike to a neighbor.|sell|cell|sale,seal
Every living thing is made of a tiny ___.|cell|sell|seal,sill
It is not ___ to cheat at games.|fair|fare|far,fire
The bus ___ was two dollars.|fare|fair|far,fire
A cut will ___ in a few days.|heal|heel|heat,head
The back of your foot is your ___.|heel|heal|heat,head
I was ___ on the long car trip.|bored|board|bird,bared
Write your name on the ___ with chalk.|board|bored|bird,beard`;

// level 7: sentence with the hard word in *stars* | its meaning | three meanings that do not fit
const VOC_L7 = `The *enormous* elephant was bigger than our house.|very large|very small,very loud,very old
Sam was *ecstatic*, jumping and cheering for his win.|very happy|very tired,very angry,very scared
The *timid* kitten hid under the bed from the thunder.|shy and easily scared|bold and brave,sleepy,hungry
It was a *scorching* day, and the sand burned our feet.|extremely hot|slightly cool,rainy,windy
The *ancient* ruins were thousands of years old.|very old|brand new,very tall,very clean
Dad was *exhausted* after he ran the long race.|very tired|very hungry,very proud,very excited
The *vast* desert stretched as far as we could see.|huge in size|tiny,very hot,very narrow
Mia *hesitated* at the door, unsure if she should knock.|paused because she was unsure|ran quickly,shouted loudly,walked away angry
The soup was *bland*, so I added salt for flavor.|having little flavor|very spicy,very hot,very sweet
The *fragile* vase broke when it fell on the floor.|easily broken|very heavy,very old,very bright
We were *famished* after hiking all day, so we ate a huge dinner.|very hungry|very sleepy,very cold,very dirty
The thief moved *stealthily* so no one would hear him.|quietly and secretly|loudly,slowly and sadly,quickly and happily
The *dense* fog made it hard to see the road.|thick|thin,warm,fast
Leo was *reluctant* to jump in the cold lake, so he waited.|unwilling|eager,able,allowed
The *meager* meal was only one slice of bread.|very small in amount|very large,very tasty,very hot
The teacher *praised* Ana for her hard work and good grades.|said good things about|scolded,ignored,forgot
A *vivid* rainbow stretched across the sky in bright colors.|bright and clear|dull,faint,tiny
The *novice* skater fell often because it was her first day.|a beginner|an expert,a teacher,a judge
After the storm, the river *swelled* and covered the path.|grew bigger|dried up,froze,slowed down
The *frigid* water made me shiver all over.|very cold|very deep,very clean,very salty
The twins looked *identical*, and I could not tell them apart.|exactly alike|very different,very young,very tall
Be *cautious* when you cross the busy street.|careful|loud,quick,rude
The tiny puppy was *adorable*, and everyone smiled at it.|very cute|very loud,very dirty,very fast
She gave a *brief* talk that lasted only one minute.|short|long,boring,loud
The *rickety* bridge shook and creaked under our feet.|shaky and falling apart|strong and new,very long,very high
My grandpa is *generous* and shares everything he has.|giving and kind|selfish,lazy,loud
The magician's trick *baffled* us, and we could not figure it out.|confused|bored,frightened,pleased
It was *drizzling*, just a few light drops of rain.|raining lightly|pouring hard,snowing,thundering
The *rowdy* crowd cheered and shouted all night long.|noisy and wild|calm and quiet,tired,hungry
Tom was *furious* when his sister broke his model plane.|very angry|very sad,very surprised,very sleepy
The *sturdy* table held all of the heavy books.|strong|weak,small,old
We *dashed* to the bus when we heard it coming.|ran quickly|walked slowly,crawled,waited
The cave was *gloomy*, with dark shadows in every corner.|dark and sad-looking|bright and cheerful,warm,huge
A *gigantic* wave rose above the tiny boat.|extremely big|extremely thin,extremely slow,extremely loud
The *curious* cat sniffed every corner of the new house.|eager to find out|sleepy,afraid,hungry
The *tranquil* lake was calm and quiet at dawn.|peaceful|stormy,crowded,cold
Please *conserve* water by turning off the tap.|save|waste,pour,boil
He spoke *sternly*, with a serious face, so we listened.|in a strict way|in a silly way,in a sleepy way,in a joyful way
The *abandoned* house had empty rooms and broken windows.|left empty and uncared for|newly built,full of visitors,very small
The *colossal* statue was taller than a ten-story building.|enormous|tiny,fragile,plain
Nora *pondered* the puzzle for a long time before she answered.|thought about it carefully|laughed at it,threw it away,forgot about it
The soldiers were *valiant* and never gave up the fight.|brave|afraid,lazy,rude
His *tattered* coat had holes and loose threads.|old and torn|new and clean,warm,bright
The *spacious* room had plenty of space for everyone to sit.|having a lot of room|crowded,dark,cold
The *nimble* acrobat jumped and twisted with ease.|quick and graceful|slow and clumsy,loud,tall
When the baby cried, Mom *soothed* her with a soft song.|calmed|frightened,woke up,teased
They were *thrilled* by the roller coaster, screaming and laughing.|very excited|bored,sleepy,confused`;

// level 8 idioms: phrase | what it means | three meanings that do not fit
const VOC_L8A = `it's raining cats and dogs|it is raining very hard|pets are falling from the sky,it is raining a little,the rain has stopped
a piece of cake|very easy|a dessert,very hard,a birthday gift
break the ice|start a friendly talk|crack some frozen water,end a fight,go ice skating
under the weather|feeling sick|standing outside,caught in a storm,very cold
spill the beans|tell a secret|drop some food,cook dinner,tell a lie
hit the books|study hard|throw books away,buy new books,close a book
let the cat out of the bag|share a secret by mistake|find a lost pet,open a bag,be very noisy
cost an arm and a leg|be very expensive|hurt a person,be free,be cheap
once in a blue moon|very rarely|every night,when it is dark,on your birthday
bite off more than you can chew|take on too much|eat too fast,take a big bite,be very hungry
on cloud nine|extremely happy|high in the sky,very sad,lost
the ball is in your court|it is your turn to act|you are playing tennis,you lost the ball,you must wait
burn the midnight oil|stay up late working|light a lamp,waste some oil,cook at night
hold your horses|wait and be patient|stop riding,get a horse,hurry up
a blessing in disguise|something good that seemed bad at first|a funny costume,a bad surprise,a hidden gift
a couch potato|someone who sits and watches TV a lot|a kind of vegetable,a farmer,a fast runner
butterflies in my stomach|a nervous feeling|a stomach ache from bugs,a hungry feeling,a tasty snack
through thick and thin|in good times and bad times|in a forest,in a hurry,with a thin friend
go the extra mile|try harder than expected|run a long race,travel far away,quit early
a drop in the bucket|a very small part of what is needed|a leaking pail,a big part,a lot of water
cry over spilled milk|be upset about something that cannot be changed|clean up a mess,drink some milk,pour a glass
the early bird catches the worm|people who start early do well|birds eat worms,wake up late,worms hide
sit on the fence|not choose a side|build a fence,rest outside,climb up high
jump on the bandwagon|join something popular|ride in a parade,play in a band,leave early
feeling blue|feeling sad|feeling cold,feeling sick,feeling sleepy
get cold feet|become nervous and back out|have chilly toes,start to run,feel brave`;

// level 8 kinds of language: phrase | kind (simile, metaphor, personification, idiom)
const VOC_L8B = `as busy as a bee|simile
as cold as ice|simile
ran like the wind|simile
slept like a log|simile
as quiet as a mouse|simile
her eyes sparkled like stars|simile
as light as a feather|simile
as brave as a lion|simile
as sweet as honey|simile
swam like a fish|simile
Time is a thief.|metaphor
Her smile is sunshine.|metaphor
The moon is a silver coin.|metaphor
Life is a roller coaster.|metaphor
The snow was a white blanket.|metaphor
He is a rock in hard times.|metaphor
The city is a jungle.|metaphor
Books are keys to new worlds.|metaphor
The stars were diamonds in the sky.|metaphor
The wind whispered through the trees.|personification
The sun smiled down on us.|personification
The flowers danced in the breeze.|personification
The old house groaned in the storm.|personification
The moon winked at the sleepy town.|personification
The leaves clapped in the wind.|personification
My alarm clock screamed at me.|personification
The waves reached out to hug the shore.|personification
He spilled the beans.|idiom
She is under the weather.|idiom
The test was a piece of cake.|idiom
It cost an arm and a leg.|idiom
Hold your horses!|idiom
We will break the ice.|idiom`;

// level 9 roots: root | meaning | two example words
const VOC_L9R = `bio|life|biology, biography
geo|earth|geography, geology
graph|write|autograph, paragraph
tele|far|telephone, television
photo|light|photograph, photocopy
aqua|water|aquarium, aquatic
port|carry|transport, portable
rupt|break|erupt, interrupt
spect|look|inspect, spectator
struct|build|structure, construct
scrib|write|describe, scribble
dict|say|predict, dictate
micro|small|microscope, microphone
therm|heat|thermometer, thermos
chron|time|chronicle, chronological
phon|sound|telephone, microphone
meter|measure|thermometer, centimeter
ject|throw|eject, reject
aud|hear|audience, audible
auto|self|autograph, automatic
cred|believe|credit, incredible
astro|star|astronaut, astronomy
ped|foot|pedal, pedestrian
dent|tooth|dentist, dental`;

// level 9 words: word | what it means | three meanings that do not fit
const VOC_L9W = `biology|the study of living things|the study of the earth,the study of the stars,the study of water
geography|the study of the earth and its places|the study of living things,the study of heat,the study of sounds
autograph|a person's own signature|a call from far away,a picture made with light,a book about life
telephone|a device that carries sound from far away|a tool that measures heat,a tool for seeing tiny things,a way to write fast
telescope|a tool for seeing things far away|a tool for seeing tiny things,a tool for measuring heat,a tool for writing
microscope|a tool for seeing very small things|a tool for seeing far away,a tool for measuring heat,a tool for writing
thermometer|a tool that measures heat|a tool that sees far away,a tool that measures sound,a tool that measures water
photograph|a picture made with light|a drawing of the earth,a story about a life,a call from far away
aquarium|a tank of water for fish|a cage for birds,a house for plants,a room for heat
aquatic|living or happening in water|living on land,living in the air,living underground
transport|to carry from one place to another|to break apart,to look closely,to write down
portable|able to be carried|able to be broken,able to be seen,able to be built
erupt|to burst out suddenly|to build up slowly,to look at,to write down
interrupt|to break into what someone is saying|to carry across,to write between,to look carefully
inspect|to look at closely|to build up,to break in,to carry in
spectator|a person who watches|a person who builds,a person who writes,a person who carries
structure|something that is built|something that is written,something that is broken,something that is carried
construct|to build|to break,to carry,to write
describe|to write or tell what something is like|to build with care,to break into pieces,to carry far away
scribble|to write quickly and messily|to look quickly,to carry roughly,to build slowly
manuscript|a book or paper written by hand|a tool for seeing far,a picture made with light,a machine that builds
dictate|to say words out loud for someone to write|to build with words,to look at closely,to carry out
predict|to say what will happen before it does|to build ahead,to break in front,to carry before
chronological|in the order that things happened in time|in size order,in alphabet order,in color order
microphone|a tool that makes small sounds louder|a tool that makes far things near,a tool that measures heat,a tool that writes
automatic|working by itself|working far away,working with heat,working in water
biography|the written story of a person's life|a picture of the earth,a tool for tiny things,a map of the sky
geology|the study of the earth's rocks and soil|the study of living things,the study of heat,the study of the stars
export|to carry goods out to another place|to carry goods in,to break goods apart,to look at goods
import|to bring goods in from another place|to send goods out,to build goods,to write about goods
audible|able to be heard|able to be seen,able to be carried,able to be written
audience|a group of people who gather to hear something|a group of people who build something,a group that writes a book,a group that measures time
transmit|to send across a distance|to break across,to see across,to write across
thermal|having to do with heat|having to do with light,having to do with sound,having to do with water
eject|to throw out|to carry out,to break out,to look out
astronaut|a traveler among the stars|a collector of rocks,a measurer of heat,a writer of books
pedestrian|a person who travels on foot|a person who travels by train,a person who travels by boat,a person who flies a plane
dentist|a doctor who cares for teeth|a doctor who cares for feet,a doctor who cares for eyes,a doctor who cares for ears`;

// level 10 analogies: first : second :: third : ? | answer | three words that do not fit
const VOC_L10A = `hot : cold :: up : ?|down|high,over,top
big : small :: fast : ?|slow|quick,speedy,race
puppy : dog :: kitten : ?|cat|mouse,bird,fish
bird : nest :: bee : ?|hive|honey,flower,wing
pen : write :: scissors : ?|cut|paper,hand,sharp
finger : hand :: toe : ?|foot|leg,shoe,sock
dog : animal :: rose : ?|flower|garden,red,petal
teacher : school :: doctor : ?|hospital|patient,medicine,nurse
happy : sad :: day : ?|night|sun,sleep,moon
cold : freezing :: hot : ?|scorching|warm,cool,summer
glove : hand :: sock : ?|foot|shoe,toe,leg
sing : song :: paint : ?|picture|brush,color,paper
eye : see :: ear : ?|hear|sound,head,loud
fish : swim :: bird : ?|fly|wing,nest,feather
leaf : tree :: page : ?|book|read,paper,word
cow : milk :: hen : ?|egg|feathers,farm,chicken
shoe : foot :: hat : ?|head|cap,hair,sun
tall : short :: wide : ?|narrow|long,large,deep
cub : bear :: calf : ?|cow|hen,dog,pig
clock : time :: ruler : ?|length|wood,draw,desk
north : south :: east : ?|west|up,sun,map
student : learn :: chef : ?|cook|eat,food,kitchen
smile : happy :: frown : ?|sad|glad,funny,loud
light : dark :: loud : ?|quiet|noisy,sound,big
apple : fruit :: carrot : ?|vegetable|orange,garden,snack
car : road :: boat : ?|water|wheel,sky,sand
wheel : car :: wing : ?|airplane|boat,tree,truck
smooth : rough :: soft : ?|hard|fluffy,quiet,warm
first : last :: begin : ?|end|start,open,middle
hot : sun :: cold : ?|ice|sand,fire,desert
kind : mean :: honest : ?|dishonest|truthful,fair,careful
author : book :: artist : ?|painting|pencil,gallery,museum
mouse : squeak :: dog : ?|bark|bite,tail,fur
scared : terrified :: tired : ?|exhausted|sleepy,bed,rested
week : seven days :: dozen : ?|twelve|ten,twenty,six
island : water :: oasis : ?|desert|ocean,forest,mountain`;

// level 10 shades of meaning: four words from weak to strong | question for the strongest | question for the weakest
const VOC_L10S = `bothered,annoyed,angry,furious|Which word shows the MOST anger?|Which word shows the LEAST anger?
content,glad,joyful,ecstatic|Which word shows the MOST joy?|Which word shows the LEAST joy?
nervous,afraid,frightened,terrified|Which word shows the MOST fear?|Which word shows the LEAST fear?
sleepy,tired,worn out,exhausted|Which word shows the MOST tiredness?|Which word shows the LEAST tiredness?
cool,chilly,cold,freezing|Which word means the coldest?|Which word means the least cold?
mild,warm,hot,scorching|Which word means the hottest?|Which word means the least hot?
small,big,huge,gigantic|Which word means the biggest?|Which word means the smallest?
stroll,walk,jog,sprint|Which word means the fastest way to move?|Which word means the slowest way to move?
whisper,talk,shout,scream|Which word means the loudest way to speak?|Which word means the quietest way to speak?
okay,good,great,fantastic|Which word shows the best?|Which word shows the least good?
mist,drizzle,rain,downpour|Which word means the heaviest rain?|Which word means the lightest rain?
breeze,wind,gale,hurricane|Which word means the strongest wind?|Which word means the gentlest wind?
dim,bright,brilliant,blinding|Which word means the brightest light?|Which word means the faintest light?
few,some,many,countless|Which word means the greatest amount?|Which word means the smallest amount?`;

function vocBuildB() {
  const out = [];
  // long choices get one button per row (form wide), short ones sit two to a row
  const it = (lv, topic, q, a, d, hint) => {
    const item = { lv, q, a, d, topic, hint: hint || VOC_HINT_B[lv] };
    if (Math.max(a.length, ...d.map(x => x.length)) > 8) item.form = 'wide';
    out.push(item);
  };
  // level 6 homophones: the word that sounds the same is always one of the choices
  VOC_ROWS(VOC_L6).forEach(([s, a, h, d]) => it(6, 'homophones', s, a, [h, ...d.split(',')]));
  // level 7 context clues
  VOC_ROWS(VOC_L7).forEach(([s, a, d]) => it(7, 'context clues', `${s} What does *${s.match(/\*([^*]+)\*/)[1]}* mean?`, a, d.split(',')));
  // level 8 figurative language
  VOC_ROWS(VOC_L8A).forEach(([p, a, d]) => it(8, 'idioms', `What does "${p}" mean?`, a, d.split(',')));
  const KINDS = ['simile', 'metaphor', 'personification', 'idiom'];
  VOC_ROWS(VOC_L8B).forEach(([p, k]) => it(8, 'figurative language', `Which kind of language is "${p}"?`, k, KINDS.filter(x => x != k), VOC_HINT_B[8.1]));
  // level 9: what a root means (the wrong choices are other roots' meanings), then what a word built from roots means
  const R = VOC_ROWS(VOC_L9R), meanings = [...new Set(R.map(r => r[1]))];
  R.forEach(([r, m, ex], i) => {
    const pool = meanings.filter(x => x != m);
    it(9, 'word roots', `What does the root *${r}* mean? (${ex})`, m, [0, 7, 13].map(k => pool[(i * 3 + k) % pool.length]), VOC_HINT_B[9.1]);
  });
  VOC_ROWS(VOC_L9W).forEach(([w, a, d]) => it(9, 'word roots', `What does *${w}* mean?`, a, d.split(',')));
  // level 10: analogies, then the strongest and the weakest word of a set
  VOC_ROWS(VOC_L10A).forEach(([q, a, d]) => it(10, 'analogies', q, a, d.split(',')));
  VOC_ROWS(VOC_L10S).forEach(([w, top, low]) => {
    const ws = w.split(',');
    it(10, 'shades of meaning', top, ws[3], ws.slice(0, 3), VOC_HINT_B[10.1]);
    it(10, 'shades of meaning', low, ws[0], ws.slice(1), VOC_HINT_B[10.1]);
  });
  return out;
}

BANK.vocab = vocBuild().concat(vocBuildB());

var DATA_VER='v102'; // last line: the whole file ran (checked by dataReady() before the app starts)
