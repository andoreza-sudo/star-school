/* Star School data banks v127. BUILT by tools/build.py from src/data/*.js (sorted): never edit by hand.
   index.html v127 loads this file with <script src="data.v127.js"> between the code and the start-up script. */
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
/* ---------- Discover: science for K-2 (P2-36; CURRICULUM section 6, Lv 1 column) ---------- */
/* Three banks, one stop each: BANK.sci_life (living things), BANK.sci_earth (sky and Earth), BANK.sci_phys (push, pull, stuff,
   sound, light). P2-37 adds levels 2 and 3 to the same banks, the Science 3-6 items, and geography and civics.
   Built once at load from the rows below. Nothing here uses rnd(): the same file always gives the same items.
   Row = question | right answer | wrong answers (split by ;) | topic | picture (art name,emoji) | hint
   The picture and the hint are optional. A missing hint is the topic's own hint (DISC_HINT). A hint teaches the method and never
   names the answer. A picture shows the subject of the question (the grown-up animal, the weather), never the answer's object,
   and goes through picFor (BANK engine em field). Every fact is settled textbook science, stated the way a K-2 book states it.
   No item needs a map or a picture to be answered: a picture only helps. tools/test.js ("Discover science K-2 P2-36") checks it all. */

const DISC_HINT = {
  // sci_life
  living: 'Living things grow, need food and water, and can have young. Ask whether this one does those things.',
  babies: 'Think of a farm or a zoo. Say the grown-up animal, then think what its young one is called.',
  covers: 'Picture the animal and look at what its body is covered with.',
  habitat: 'Think about where you have seen this animal in a book or at the zoo.',
  plants: 'Picture a whole plant from the bottom to the top. Each part has its own job.',
  needs: 'Think about what you need every day to stay healthy and strong.',
  senses: 'Think about which part of your body does that job. Point to it!',
  // sci_earth
  weather: 'Picture the sky outside. What is it doing, and what would you wear or carry?',
  seasons: 'Think of the year as a circle that goes round and round, with the weather changing a little at a time.',
  daynight: 'Think about the sky. When is it bright and when is it dark? What do you see up there?',
  sunmoon: 'Think about what you can see in the sky in the daytime and what you can see at night.',
  landwater: 'Picture a trip to go and see it. Is it ground you could walk on, or something you would swim in?',
  // sci_phys
  push: 'Think: does the thing move away from you, or toward you?',
  stuff: 'Imagine touching it or looking at it closely. What is it like?',
  soundlight: 'Close your eyes and picture it. What would you hear, or what would you see?',
  solid: 'Imagine spilling it on the floor. Does it spread out, or does it stay in one piece?',
};

// Grade band of each level (CURRICULUM 6: Lv 1 is K-2, Lv 2 is 3-4, Lv 3 is 5-6). Every item carries it as `grade`.
const DISC_GRADE = {1: 'K-2', 2: '3-4', 3: '5-6'};

// grade: the grade band of a bank whose levels do not follow DISC_GRADE (P2-37: geo_us and civ start at levels 3-4 and 5-6)
function discRows(lv, text, grade) {
  return text.trim().split('\n').map(r => {
    const f = r.split('|'), it = {lv, grade: grade || DISC_GRADE[lv], q: f[0], a: f[1], d: f[2].split(';'), topic: f[3]};
    if (f[4]) it.em = f[4].split(',');
    it.hint = f[5] || DISC_HINT[f[3]];
    return it;
  });
}

BANK.sci_life = discRows(1, `
Which one is alive?|a tree|a rock;a chair;a ball|living
Which one is alive?|a puppy|a pillow;a pencil;a toy truck|living
Which one is alive?|a daisy|a brick;a cup;a shoe|living
Which one is alive?|a goldfish|a pebble;a book;a toy boat|living
Which one is alive?|a butterfly|a kite;a balloon;a button|living
Which one is alive?|a worm|a sock;a crayon;a marble|living
Which one is NOT alive?|a rock|a bird;a flower;a fish|living
Which one is NOT alive?|a spoon|a frog;a tree;a bee|living
Which one is NOT alive?|a toy robot|a puppy;a tulip;a duck|living
Which one is NOT alive?|a bicycle|a horse;a rose;a hen|living
Which one is NOT alive?|a blanket|a cat;a pine tree;a snail|living
Which one is NOT alive?|a snowman|a rabbit;a sunflower;a turtle|living
Which one needs food and water to live?|a hamster|a doll;a stone;a ball|living
Which thing do ALL living things do?|grow and change|ride a bike;sing songs;read books|living||Think about a tiny seed or a baby, and what happens to it as time goes by.
A baby dog is called a ___.|puppy|kitten;cub;calf|babies|dog,🐶
A baby cat is called a ___.|kitten|puppy;chick;lamb|babies|cat,🐱
A baby cow is called a ___.|calf|foal;lamb;piglet|babies|cow,🐄
A baby sheep is called a ___.|lamb|calf;chick;cub|babies|sheep,🐑
A baby horse is called a ___.|foal|calf;lamb;kitten|babies|horse,🐴
A baby pig is called a ___.|piglet|puppy;foal;duckling|babies|pig,🐷
A baby chicken is called a ___.|chick|lamb;calf;kitten|babies|hen,🐔
A baby duck is called a ___.|duckling|chick;calf;kitten|babies|duck,🦆
A baby frog is called a ___.|tadpole|puppy;chick;kitten|babies|frog,🐸
A baby bear is called a ___.|cub|calf;foal;lamb|babies|bear,🐻
A baby lion is called a ___.|cub|puppy;chick;calf|babies|lion,🦁
A baby goat is called a ___.|kid|lamb;calf;foal|babies|goat,🐐
Which baby animal hatches from an egg?|a chick|a puppy;a kitten;a calf|babies
A puppy grows up to be a ___.|dog|cat;horse;cow|babies||Think about who a puppy's mom and dad are.
A kitten grows up to be a ___.|cat|dog;sheep;hen|babies||Think about who a kitten's mom and dad are.
A tadpole grows up to be a ___.|frog|fish;duck;snake|babies||A tadpole lives in a pond and its legs grow as it gets older. What animal is it becoming?
Which animal is covered in feathers?|a duck|a cat;a frog;a fish|covers
Which animal has fur?|a bear|a fish;a duck;a frog|covers
Which animal has scales?|a fish|a rabbit;a duck;a sheep|covers
Which animal has a hard shell on its back?|a turtle|a horse;a cow;a pig|covers||Think of an animal that can pull its head inside to stay safe.
Which animal has thick wool?|a sheep|a frog;a duck;a fish|covers||Think of the soft stuff that is made into warm sweaters and socks.
What covers a bird's body?|feathers|fur;scales;wool|covers|bird,🐦
What covers a fish's body?|scales|fur;feathers;wool|covers|fish,🐟
What covers a dog's body?|fur|scales;feathers;shell|covers|dog,🐶
A turtle has a hard ___ on its back.|shell|fur;feathers;wool|covers|turtle,🐢|Think about what keeps a turtle safe, like a little suit of armor.
Which animal does NOT have fur?|a fish|a cat;a bear;a rabbit|covers
Which animal lays eggs?|a hen|a dog;a cow;a horse|covers||Think of where eggs for breakfast come from.
What do wings and feathers help most birds do?|fly|dig tunnels;spin webs;grow roots|covers
Fur helps keep an animal ___.|warm|wet;hungry;loud|covers||Think about a cat curled up on a cold day.
Where does a fish live?|in water|in a tree;in a nest;in a burrow|habitat|fish,🐟|Think about what a fish uses to swim and breathe.
The place where an animal lives is its ___.|habitat|habit;hobby;hatch|habitat||It is the animal's home in nature, with food, water and shelter.
Which animal lives in the ocean?|a whale|a cow;a hen;a rabbit|habitat
Which animal lives in a pond?|a frog|a camel;a polar bear;a monkey|habitat
Which animal lives in a very cold, icy place?|a penguin|a camel;a monkey;a parrot|habitat
Which animal lives in a hot, dry desert?|a camel|a penguin;a frog;a duck|habitat
Which animal lives on a farm?|a cow|a lion;a shark;a camel|habitat
Which animal lives in a tree?|a monkey|a fish;a crab;a whale|habitat
Where does a bird build its nest?|in a tree|in the ocean;in a puddle;under the sand|habitat
Where does a bee live?|in a hive|in a pond;in a cave;in a burrow|habitat
Where does a rabbit make its home?|in a burrow|in a hive;in a pond;in a treetop|habitat||A rabbit digs a hole in the ground to be safe.
Which animal lives in a forest?|a deer|a shark;a camel;a penguin|habitat
A polar bear lives in a place that is ___.|cold and icy|hot and sandy;warm and wet|habitat
A shark lives in the ___.|ocean|desert;forest;barn|habitat
A cactus grows in the ___.|desert|ocean;pond;snow|habitat
A water lily grows in a ___.|pond|desert;cave;sandbox|habitat
Which part of a plant is under the ground?|roots|flowers;leaves;fruit|plants
Which part of a plant takes in water from the soil?|roots|leaves;flower;seed|plants
Which part of a plant holds it up tall?|stem|flower;seed;leaf|plants
The colorful part that makes seeds is the ___.|flower|root;stem;leaf|plants||It is the bright, sweet-smelling part that bees visit.
Which part of a plant is usually green and flat?|leaf|root;seed;stem|plants
Leaves use sunlight to help a plant make its ___.|food|dirt;wind;rain|plants
A new plant can grow from a ___.|seed|pebble;feather;button|plants
What do seeds need to start growing?|water and warmth|wind and snow;darkness and dust;nothing at all|plants||Think about a seed that is planted in the garden in a good season.
Which part of a plant is a carrot?|root|flower;leaf;stem|plants
Which part of a plant is lettuce?|leaf|root;seed;flower|plants
The pretty rose is the plant's ___.|flower|root;stem;seed|plants|rose,🌹|Think about the bright part of a plant that has soft, colored petals.
Where do most plants get their water?|from the soil|from a feather;from the moon;from a rock|plants
Which part of a flower smells sweet and has bright colors?|petals|roots;bark;soil|plants
The tall, strong middle part of a tree is its ___.|trunk|petal;seed;fruit|plants
What do plants need to grow?|sunlight and water|candy and toys;noise and music;dark and dust|needs
What do animals need to live?|food, water and air|toys, books and games;candy, soda and chips;blankets and pillows|needs
Which one do all living things need?|water|a toy;a bed;shoes|needs||Without it, plants droop and animals get thirsty. Think about what you drink every day.
A plant on a dark shelf gets weak. What is it missing?|light|sand;sound;salt|needs
A dog is thirsty. What does it need?|water|a ball;a blanket;a brush|needs
A hungry kitten needs ___.|food|a leash;a bell;a ball|needs
A plant that never gets any water will ___.|droop and dry up|grow very tall;turn into a tree;make more seeds|needs
What do we breathe in?|air|sand;milk;juice|needs
A shelter is ___.|a safe place to stay|something to eat;something to drink|needs||Think of a house, a nest or a den, and what it does for the one living in it.
Which one does a living thing NOT need to stay alive?|a video game|food;water;air|needs
Which body part do you use to see?|eyes|ears;nose;tongue|senses
Which body part do you use to hear?|ears|eyes;nose;hands|senses
Which body part do you use to smell?|nose|eyes;ears;feet|senses
Which body part do you use to taste?|tongue|nose;ears;hands|senses
Which part of your body feels if something is soft or rough?|skin|eyes;ears;nose|senses
You smell a flower with your ___.|nose|eyes;ears;knees|senses
You taste ice cream with your ___.|tongue|nose;ears;hands|senses
Which sense do you use to read a book?|sight|hearing;smell;taste|senses
Which sense do you use to hear music?|hearing|sight;smell;taste|senses
Which sense tells you that a blanket is soft?|touch|taste;hearing;sight|senses
Which sense tells you that a lemon is sour?|taste|smell;hearing;touch|senses||Think about what happens in your mouth when you bite one.
How many main senses do people have?|five|two;three;eight|senses||Count them on your hand: one for each way we find out about the world.
`);

BANK.sci_earth = discRows(1, `
What do you wear on a rainy day?|a raincoat|a sun hat;sandals;shorts|weather
What falls from clouds on a rainy day?|rain|sand;flowers;rocks|weather
Snow is frozen ___.|water|milk;juice;sand|weather|snow,❄
A kite flies best on a ___ day.|windy|snowy;rainy;foggy|weather|kite,🪁
What do we use to measure how hot or cold it is?|a thermometer|a ruler;a clock;a scale|weather
A rainbow can appear when the sun shines after ___.|rain|snow;night;dust|weather
Which word tells about the weather?|cloudy|crunchy;bumpy;sticky|weather
It is hot and bright and the sun is shining. What kind of day is it?|sunny|snowy;rainy;windy|weather
What kind of day is it when white flakes fall from the sky?|snowy|sunny;rainy;windy|weather
Puddles, gray clouds and umbrellas. What kind of day is it?|rainy|sunny;snowy;windy|weather
Leaves and flags flutter and kites zoom up high. What kind of day is it?|windy|sunny;snowy;rainy|weather
The sky is gray and full of clouds, but no rain is falling. What kind of day is it?|cloudy|sunny;snowy;windy|weather
What do you wear on a cold, snowy day?|mittens|a swimsuit;sandals;shorts|weather
What can you hold over your head to stay dry in the rain?|an umbrella|a kite;a bucket;a sun hat|weather
Which one is NOT weather?|a tree|rain;wind;snow|weather
Clouds are made of tiny drops of ___.|water|smoke;cotton;dust|weather|cloud,☁
Which season is usually the coldest?|winter|summer;spring;fall|seasons
Which season is usually the hottest?|summer|winter;spring;fall|seasons
In which season do flowers start to bloom?|spring|winter;fall;summer|seasons
In which season do many leaves turn red and orange and drop?|fall|spring;summer;winter|seasons||Think of orange, red and yellow leaves coming down just before the cold season.
How many seasons are in a year?|four|two;three;five|seasons||Think about the calendar year and count how many big changes in weather come one after another.
Which season comes after winter?|spring|summer;fall|seasons
Which season comes after spring?|summer|fall;winter|seasons
Which season comes after summer?|fall|spring;winter|seasons
Which season comes after fall?|winter|spring;summer|seasons
We build snowmen in the ___.|winter|summer;spring|seasons
Swimming at the beach is most fun in the ___.|summer|winter;fall|seasons
Mittens, hot cocoa and a snowman. Which season is it?|winter|summer;spring;fall|seasons
When can we see stars in the sky?|at night|at noon;at breakfast;at recess|daynight
The sun rises in the ___.|morning|evening;night|daynight
The sun sets in the ___.|evening|morning;noon|daynight
Which part of the day is dark?|night|noon;morning;afternoon|daynight
During the day, most of our light comes from the ___.|sun|moon;rain|daynight
Which one shines in the night sky?|the moon|the sun;a rainbow|daynight
Which animal is usually awake at night?|an owl|a robin;a butterfly;a hen|daynight
A shadow is made when something blocks the ___.|light|wind;water;heat|daynight
Day ends and night begins when the sun ___.|goes down|comes up;turns blue;gets bigger|daynight
What time of day is it when the sun is high in the sky?|noon|midnight;bedtime|daynight
Which one is NOT in the sky at night?|a rainbow|the moon;stars;a cloud|daynight
The sun is a ___.|star|planet;moon;cloud|sunmoon|sun,☀
Which one gives us heat and light?|the sun|the moon;a cloud;the wind|sunmoon
The moon shines because light from the ___ bounces off it.|sun|ocean;clouds|sunmoon
What shape does a full moon look like?|a circle|a square;a triangle|sunmoon
Which one twinkles in the night sky?|stars|clouds;rainbows;kites|sunmoon
How does the sun make us feel on a bright summer day?|warm|cold;wet;frozen|sunmoon
The sun looks small because it is very ___ away.|far|close;near|sunmoon
The star closest to Earth is the ___.|sun|moon;North Star|sunmoon
The sun gives our world ___.|light and heat|rain and snow;wind and clouds;rocks and sand|sunmoon
What is the moon mostly made of?|rock|cheese;wood;sugar|sunmoon||Look at photos of the moon: the ground is gray, bumpy and dusty.
Most of the Earth is covered by ___.|water|land;sand|landwater
A very big body of salty water is an ___.|ocean|pond;puddle;river|landwater
Water that flows along in a long line is a ___.|river|hill;pond;beach|landwater
Land with water all around it is an ___.|island|lake;valley;beach|landwater
A big body of water with land all around it is a ___.|lake|island;hill;beach|landwater
A very tall, rocky piece of land is a ___.|mountain|valley;pond;beach|landwater
The low land between mountains is a ___.|valley|island;mountain;lake|landwater
A small, round bump of land is a ___.|hill|island;river;lake|landwater
Sand along the edge of the ocean is a ___.|beach|valley;hill;river|landwater
A very dry place with lots of sand is a ___.|desert|lake;ocean;island|landwater
Ocean water tastes ___.|salty|sweet;sour;spicy|landwater
Which one is NOT a body of water?|a hill|a lake;a river;an ocean|landwater
Which one is land, not water?|a mountain|a river;an ocean;a lake|landwater
`);

BANK.sci_phys = discRows(1, `
Kicking a ball is a ___.|push|pull;twist|push|ball,⚽
Pulling a wagon by its handle is a ___.|pull|push;twist|push
Pushing a friend on a swing is a ___.|push|pull;twist|push
Opening a drawer by its knob is a ___.|pull|push;twist|push
Closing a door by pressing on it is a ___.|push|pull;twist|push
Which one is a pull?|tugging a rope|kicking a ball;pushing a cart|push
Which one is a push?|pushing a stroller|pulling a wagon;tugging a rope|push
A push or a pull can make an object ___.|move|melt;shrink;grow|push||Think about what happens to a ball when someone kicks it or tugs it.
What do we call a push or a pull?|a force|a color;a sound|push
Which push will send a ball the farthest?|a big push|a small push;no push|push
A ball rolls on the grass and nobody pushes it again. What happens?|it slows down and stops|it floats away;it speeds up|push
You let go of a ball. Which way does it fall?|down|up;sideways|push||Think about dropping a pencil. Where does it end up?
Which one is soft?|a pillow|a rock;a brick;a spoon|stuff
Which one is hard?|a rock|a pillow;a cotton ball;a sponge|stuff
Which one is rough?|sandpaper|a ribbon;a feather;a marshmallow|stuff
Which one is smooth?|a glass marble|tree bark;sandpaper;a pinecone|stuff
Which one is shiny?|a mirror|a sock;a towel;a sponge|stuff
Which one is bendy?|a rubber band|a rock;a glass cup;a brick|stuff
Which one can you see through?|a window|a brick wall;a wooden door;a book|stuff
A log from a tree is made of ___.|wood|metal;glass;plastic|stuff
A window is made of ___.|glass|wood;cloth;paper|stuff
A woolly sweater is made from the ___ of a sheep.|wool|shell;scales;feathers|stuff
Which one would float on water?|a rubber duck|a coin;a rock;a key|stuff
Which one would sink in water?|a rock|a leaf;a feather;a rubber duck|stuff
Which one soaks up water best?|a sponge|a plastic cup;a rock;a spoon|stuff
What could keep you dry in the rain?|a raincoat|a net;a paper towel;a sock|stuff
Which one can you bend easily?|paper|a brick;a glass bottle;a rock|stuff
How do you make sound with a drum?|hit it|smell it;paint it;freeze it|soundlight|drum,🥁
When you pluck a guitar string you can see it ___.|shake|melt;glow;grow|soundlight|guitar,🎸
Which one is the loudest?|a fire truck siren|a whisper;a mouse squeak;a falling leaf|soundlight
Which one is the quietest?|a whisper|a siren;a trumpet;a drum|soundlight
Which one makes its own light?|a flashlight|a mirror;a book;the moon|soundlight
Which one makes its own light?|the sun|the moon;a mirror;a window|soundlight
What do you see when something blocks the light?|a shadow|a rainbow;a puddle|soundlight
A mirror ___ light so you can see yourself.|bounces|hides;swallows|soundlight
Which one can you hear but NOT hold in your hand?|a song|a drum;a bell;a flute|soundlight
If you hit a bell harder, the sound gets ___.|louder|softer;colder|soundlight
In a dark room, what helps you see?|a flashlight|a blanket;a rug;a pillow|soundlight
Which one makes a sound when you shake it?|a rattle|a feather;a pillow;a sock|soundlight
Which one is a liquid?|water|a block;a rock;a pencil|solid
Which one is a solid?|a ball|juice;milk;water|solid
Which one keeps its shape on a table?|a block|juice;milk;water|solid
Which one spreads out into a puddle if you spill it?|juice|a block;a spoon;a toy car|solid
Which one can be poured into a cup?|milk|a rock;a book;a block|solid
Ice is water that is ___.|frozen|boiling;empty|solid|ice,🧊
When ice gets warm it ___.|melts|freezes;grows|solid
Water put in the freezer becomes ___.|ice|steam;sand|solid
Which one is a solid?|ice|water;juice;milk|solid
Which one is a liquid?|honey|a brick;a coin;a book|solid
Which one is NOT a liquid?|a crayon|water;milk;juice|solid
A liquid takes the shape of the ___ it is poured into.|container|color;weight;smell|solid
`);
/* ---------- Discover: science for grades 3-6 (P2-37; CURRICULUM section 6, Lv 2 and Lv 3 columns) ---------- */
/* Levels 2 (grades 3-4) and 3 (grades 5-6) of BANK.sci_life, BANK.sci_earth and BANK.sci_phys. Same row format and the same helpers
   as d-disc.js (discRows, DISC_HINT), which loads first (its file name sorts before this one: "d-disc." < "d-disc2").
   Row = question | right answer | wrong answers (split by ;) | topic | picture (art name,emoji) | hint
   Every fact is settled textbook science. A hint teaches the method and never names the answer; no item needs a picture or a map.
   tools/test.js ("Discover 3-6, geography and civics P2-37") checks all of it. */

Object.assign(DISC_HINT, {
  // sci_life 2
  lifecycle: 'A life cycle is a set of stages that repeat. Think about what the young one looks like and what it does at each stage.',
  foodchain: 'Follow the energy. Who makes food, who eats the plant, who eats that animal, and what happens to the leftovers?',
  adapt: 'Match the body part or the habit to the place the animal lives and to the job it does for the animal.',
  classify: 'Think about the whole body: what covers it, how it breathes and how its babies are born.',
  plantfn: 'Each part of a plant has its own job. Think about where the part is on the plant and what it does for it.',
  fossils: 'Fossils are clues. Think about how long ago things lived and how layers of mud and sand can bury them.',
  // sci_life 3
  cells: 'Cells are the tiny building blocks of living things. Picture a small room where each part has a job to do.',
  ecosystem: 'An ecosystem is the living and non-living things of one place working together. Think about who depends on whom.',
  photo: 'Plants make their own food. Think about what goes in, what comes out and what gives the power.',
  body: 'Each body system has one main job. Think about what the organs in it do together.',
  traits: 'Some traits are passed from parents to young and some are learned or happen to you. Sort them that way.',
  // sci_earth 2
  watercycle: 'Follow one drop of water on its trip around the Earth. What happens to it at each step, and what powers the trip?',
  rocks: 'Think about what the ground is made of and what each layer or kind is like to touch.',
  erosion: 'Things in nature that move, like streams and weather, carry bits of land away. Think about what slows that down or speeds it up.',
  resources: 'Ask whether nature makes more of it fast enough to use again, or whether it takes a very long time.',
  moonphase: 'The Moon does not shine on its own. Think about which half the Sun lights and how much of that half we can see.',
  planets: 'Picture the Sun in the middle and the planets going out in order, with the small inner ones first.',
  // sci_earth 3
  plates: 'Earth is made of layers, and the top layer is cracked into slabs that move slowly. Think about what happens at the edges.',
  rockcycle: 'Think about how the rock was made: cooled from melted rock, pressed from layers, or changed by heat and pressure.',
  atmosphere: 'Our blanket of gas has layers. Think about which layer is lowest, and what changes as you go up.',
  solarscale: 'Think big. Compare how large things are and how much space lies between them, step by step.',
  rotrev: 'Earth spins and Earth travels. Decide which motion makes the pattern in the question.',
  // sci_phys 2
  states: 'Think about how the tiny pieces are packed and what happens to shape and size as heat is added or taken away.',
  forces: 'Think about what makes a ball start rolling or stop, and whether anything has to touch it.',
  machines: 'A simple machine changes the size or direction of a force. Picture the tool and how it is used.',
  energy: 'Energy comes in forms and can change form. Ask what the thing is doing, or what it is storing.',
  circuits: 'Electricity needs a complete loop to flow. Think about what the loop is made of and if it is broken anywhere.',
  // sci_phys 3
  mixtures: 'Ask whether the parts can still be told apart or are spread out evenly, and what you could do to pull them apart.',
  change: 'Ask yourself if a brand new substance is made, or if it is the same stuff that only looks different.',
  gravity: 'Think about what makes things fall to the ground, and how it depends on how much stuff there is and how far apart things are.',
  transfer: 'Follow the power from where it starts to where it ends up, and think about what it turns into along the way.',
  waves: 'A wave moves along without the water or air itself traveling far. Think about what it really carries.',
});

BANK.sci_life.push(...discRows(2, `
A butterfly hatches from an egg as a ___.|caterpillar|chrysalis;tadpole;seed|lifecycle|butterfly,🦋
The stage of a butterfly's life spent inside a chrysalis is the ___.|pupa|egg;caterpillar;adult|lifecycle
A young frog that lives in water and has a tail is a ___.|tadpole|caterpillar;chick;pupa|lifecycle
A tadpole grows legs and lungs and becomes a ___.|frog|fish;snake;lizard|lifecycle
A hen's egg hatches into a ___.|chick|calf;cub;pup|lifecycle
Which is the first stage in the life cycle of most plants?|seed|flower;fruit;leaf|lifecycle
A seed that starts to grow roots and a shoot is said to ___.|germinate|migrate;hibernate;evaporate|lifecycle
The stages of a living thing's life, from birth to death, make up its ___.|life cycle|food chain;habitat;migration|lifecycle||Think of a circle: a plant makes seeds, the seeds grow, and the new plant makes seeds again.
Which animal does NOT change its body shape as it grows, but only gets bigger?|a dog|a frog;a butterfly;a beetle|lifecycle
Which of these has a pupa stage?|a beetle|a human;a dog;a bird|lifecycle
In a food chain, plants are called ___ because they make their own food.|producers|consumers;predators;decomposers|foodchain
An animal that hunts other animals for food is a ___.|predator|producer;decomposer;prey|foodchain
An animal that is hunted by another animal is called ___.|prey|a predator;a producer;a decomposer|foodchain
Mushrooms and some bacteria break down dead plants and animals. They are ___.|decomposers|producers;predators;herbivores|foodchain|mushroom,🍄
An animal that eats only plants is a ___.|herbivore|carnivore;omnivore;decomposer|foodchain
An animal that eats only other animals is a ___.|carnivore|herbivore;omnivore;producer|foodchain
An animal that eats both plants and animals is an ___.|omnivore|herbivore;carnivore;decomposer|foodchain
An arrow in a food chain shows where the ___ goes.|energy|rain;wind;sound|foodchain||The arrow points from the food to the eater. Think about what the eater gets from the food that lets it run, grow and play.
Almost every food chain starts with energy from the ___.|Sun|soil;wind;rain|foodchain
A snake that eats mice is the ___ of the mice.|predator|producer;decomposer;prey|foodchain
Which food chain is in the right order, from food to eater?|grass, rabbit, fox|fox, rabbit, grass;rabbit, grass, fox;fox, grass, rabbit|foodchain
Most of the insects a frog eats disappear from its pond. What happens to the frogs?|they have less food and become fewer|there are more frogs;nothing changes;they grow wings|foodchain||Think about a hungry frog with almost no bugs to catch. What would happen to its meals, and then to how many frogs can live there?
A polar bear's thick fur and layer of fat help it stay warm in the ___.|Arctic|desert;rain forest;ocean floor|adapt||Think about the places the bear lives and what the weather is like there. What would the fur and fat protect it from?
A cactus stores water in its thick stem. This helps it live in the ___.|desert|ocean;rain forest;Arctic|adapt
A giraffe's long neck helps it ___.|reach leaves high in trees|swim fast;dig holes;hide in snow|adapt|giraffe,🦒
A stick insect looks like a twig. This helps it ___.|hide from hungry animals|sing loudly;swim fast;dig holes|adapt
A duck's webbed feet help it ___.|swim|climb trees;dig holes;run fast|adapt|duck,🦆
The shape of a bird's beak depends on ___.|the food it eats|its color;its age;the weather|adapt
A body part or habit that helps a living thing survive where it lives is an ___.|adaptation|invention;accident;illness|adapt
Birds that fly far away for the winter to find food and warmth are ___.|migrating|hibernating;camouflaging;hatching|adapt
A bear sleeps through the cold winter in a den. This is called ___.|hibernation|migration;camouflage;adaptation|adapt
A camel's wide, flat feet help it walk on ___.|sand|ice;tree branches;a wall|adapt
Which animal has thick white fur that helps it hide and stay warm in snow?|an Arctic fox|a camel;a lizard;a toucan|adapt
A thick waxy coat on a leaf helps a plant ___.|keep its water in|catch more snow;sing;move|adapt
Animals with a backbone are called ___.|vertebrates|invertebrates;insects;plants|classify
Animals without a backbone are called ___.|invertebrates|vertebrates;mammals;reptiles|classify
Which group of animals feeds its babies milk?|mammals|reptiles;birds;fish|classify
Which animal is a mammal?|a whale|a shark;a turtle;a penguin|classify
Which animal is a reptile?|a lizard|a frog;a whale;a robin|classify
Which animal is an amphibian?|a frog|a lizard;a snake;a turtle|classify
Which animal is an insect?|an ant|a spider;a worm;a snail|classify
An insect has how many legs?|six|four;eight;ten|classify
A spider is not an insect because it has ___ legs.|eight|six;four;ten|classify
Which group of animals has feathers and lays eggs?|birds|reptiles;mammals;fish|classify
Fish breathe underwater using their ___.|gills|lungs;wings;fur|classify
A bat can fly, but it is a ___ because it has fur and feeds its babies milk.|mammal|bird;insect;reptile|classify
A dolphin is a ___.|mammal|fish;reptile;amphibian|classify
Water from the soil is taken in by a plant's ___.|roots|leaves;flower;fruit|plantfn
Which part of a plant holds it up and carries water to the leaves?|stem|root;seed;petal|plantfn
Which part of a plant makes food using sunlight?|leaf|root;stem;seed|plantfn
The part of a plant that makes seeds is the ___.|flower|root;stem;leaf|plantfn
Bees carry a yellow dust from flower to flower. It is called ___.|pollen|sap;seeds;roots|plantfn
Seeds can be spread by wind, by water or by ___.|animals|rocks;shadows;sunlight|plantfn
A dandelion seed floats away on the wind. This helps the plant ___.|spread its seeds|make food;drink water;stay warm|plantfn
Plants need light, water and air. Which of these does a plant NOT need?|chocolate|sunlight;water;air|plantfn
Fossils are the traces of living things from ___.|long ago|yesterday;next year;this week|fossils||Think about animals like dinosaurs. Was it this year, or a time before there were any people?
Where would you most likely find a fossil?|in a layer of rock|on a tree branch;in a bird's nest;in a puddle|fossils
Which part of an animal is most likely to become a fossil?|a bone|its fur;its skin;its voice|fossils
Scientists who study fossils are called ___.|paleontologists|astronomers;chemists;meteorologists|fossils
A fossil footprint can show how an animal ___.|walked|sounded;smelled;dreamed|fossils
Which of these animals is extinct, with none alive today?|a woolly mammoth|an elephant;a tiger;a horse|fossils
Fossils of sea shells are found high on a mountain. The place was once ___.|under the sea|a desert;a big city;a volcano|fossils
Older fossils are usually found in ___ layers of rock.|deeper|higher;thinner;warmer|fossils
`));

BANK.sci_life.push(...discRows(3, `
All living things are made of tiny building blocks called ___.|cells|crystals;grains;bubbles|cells||Under a microscope you can see that skin, leaves and wood are all made of tiny boxes joined together.
Which cell part controls what the cell does?|nucleus|cell wall;chloroplast;vacuole|cells
Which part is found in plant cells but NOT in animal cells?|cell wall|nucleus;cell membrane;cytoplasm|cells
Which part of a plant cell makes food using sunlight?|chloroplast|nucleus;cell membrane;cytoplasm|cells
The cell membrane ___.|controls what goes in and out|makes sunlight;stores bones;digests food for the body|cells
Which tool do scientists use to see cells?|a microscope|a telescope;a thermometer;a ruler|cells
The jelly-like liquid that fills a cell is the ___.|cytoplasm|nucleus;chloroplast;cell wall|cells
Which living thing is made of just one cell?|an amoeba|a frog;an oak tree;a mushroom|cells
Many similar cells that work together form a ___.|tissue|atom;planet;mineral|cells
Tissues that work together form an ___.|organ|atom;cell;mineral|cells
The heart is an example of an ___.|organ|cell;atom;mineral|cells
Where do new cells come from?|from other cells dividing|from sunlight;from water alone;from rocks|cells||Think about a growing child. The body gets bigger when the tiny building blocks split in two.
Which part of a cell holds its instructions, called DNA?|nucleus|membrane;wall;cytoplasm|cells
All the living and non-living things in one place make up an ___.|ecosystem|organism;population;skeleton|ecosystem||Think of a pond with its fish, plants, water, rocks and sunlight all working together as one team.
All the deer living in one forest are a ___.|population|community;ecosystem;food chain|ecosystem
All the different populations living in one area form a ___.|community|population;organism;cell|ecosystem
Parts of an ecosystem that are not alive, like water and sunlight, are ___ factors.|abiotic|biotic;animal;plant|ecosystem
Which of these is a living, or biotic, part of an ecosystem?|a mushroom|sunlight;a stream;a rock|ecosystem
Many connected food chains in one ecosystem make a food ___.|web|net;tower;ladder|ecosystem
In a pond, most of the insects that frogs eat die. Over time the number of insects will ___.|go up|vanish;turn into frogs;stay exactly the same|ecosystem
Two animals trying to eat the same food are in ___.|competition|cooperation;migration;photosynthesis|ecosystem
A clownfish and a sea anemone protect and feed each other. This kind of partnership is ___.|mutualism|competition;predation;decay|ecosystem
Which ecosystem is hot and dry and gets very little rain?|a desert|a rain forest;the tundra;an ocean|ecosystem
A very cold ecosystem with no trees and frozen ground is the ___.|tundra|desert;wetland;grassland|ecosystem
Which is a way that people can harm an ecosystem?|pollution|planting trees;recycling;saving water|ecosystem
Energy in nearly every ecosystem first comes from the ___.|Sun|soil;wind;decomposers|ecosystem
A vulture is a scavenger. It eats ___.|dead animals|only grass;only seeds;rocks|ecosystem
An invasive species can harm an ecosystem because it ___.|competes with native species|adds shade;makes rain;feeds the soil|ecosystem
Plants make their own food through a process called ___.|photosynthesis|digestion;evaporation;migration|photo
In photosynthesis, plants use sunlight, water and ___.|carbon dioxide|oxygen;sugar;salt|photo
During photosynthesis, plants give off ___.|oxygen|carbon dioxide;smoke;nitrogen|photo
The food a plant makes in its leaves is a kind of ___.|sugar|plastic;salt;oil|photo
The green material in leaves that traps sunlight is ___.|chlorophyll|pollen;nectar;sap|photo
Leaves take in air through tiny openings called ___.|stomata|roots;petals;veins|photo
Which part of the plant takes in the water used for photosynthesis?|the roots|the flowers;the petals;the seeds|photo
A plant kept in the dark for weeks would ___.|become weak and pale|grow taller and greener;turn blue;make more sugar|photo
Which of these can make food by photosynthesis?|a tree|a mushroom;a dog;a worm|photo
Photosynthesis changes light energy into ___ energy stored in food.|chemical|sound;wind;magnetic|photo
Animals depend on photosynthesis because it gives them food and ___.|oxygen|sunlight;gravity;soil|photo
Which system carries blood around the body?|the circulatory system|the digestive system;the nervous system;the skeletal system|body||The heart pushes blood through tubes all over the body. Which body team has that job?
Which system breaks down the food you eat?|the digestive system|the respiratory system;the muscular system;the skeletal system|body||Food goes in your mouth and down a long path to your stomach. Which body team handles that trip?
The brain, spinal cord and nerves make up the ___ system.|nervous|digestive;circulatory;skeletal|body
Your bones make up the ___ system.|skeletal|muscular;respiratory;nervous|body
Which organs bring oxygen into the body?|the lungs|the kidneys;the stomach;the heart|body
The job of the heart is to ___.|pump blood|break down food;send messages;clean the air|body
Muscles that pull on bones help the body ___.|move|digest food;see;taste|body
Most nutrients from food pass into the blood in the ___.|small intestine|mouth;lungs;heart|body
The kidneys ___.|filter waste out of the blood|pump blood;make bones;move food|body
The skin is the ___ organ of the body.|largest|smallest;oldest;only|body
Which tubes carry blood away from the heart?|arteries|veins;nerves;bones|body
The ribs protect the ___.|heart and lungs|brain;feet;eyes|body
Tiny air sacs in the lungs let oxygen pass into the ___.|blood|bones;stomach;brain|body
A trait you get from your parents is called ___.|inherited|learned;lost;bought|traits
Which trait is inherited?|eye color|riding a bike;speaking Spanish;knowing a song|traits
Which is a learned behavior?|riding a bike|having curly hair;eye color;skin color|traits
The instructions for traits are carried in ___.|genes|bones;muscles;nerves|traits
A baby gets genes from ___ of its parents.|both|only one;neither;a friend|traits
Can a scar from a cut be passed on to a child?|no|yes;always;only in winter|traits
Identical twins have almost exactly the same ___.|genes|friends;clothes;memories|traits
Which of these did a lion cub get from its parents?|its golden fur|a scar from a fight;a trick it was taught;a name|traits
Members of one kind of animal are not all exactly alike. This is called ___.|variation|migration;adaptation;extinction|traits
Over many generations, traits that help living things survive become ___.|more common|less common;impossible;harmless|traits
`));

BANK.sci_earth.push(...discRows(2, `
Water changing from a liquid into a gas is called ___.|evaporation|condensation;precipitation;collection|watercycle
Water vapor cooling into tiny drops of water in clouds is called ___.|condensation|evaporation;precipitation;erosion|watercycle
Rain, snow and hail falling from clouds is called ___.|precipitation|evaporation;condensation;erosion|watercycle
What gives the water cycle the heat it needs to evaporate water?|the Sun|the Moon;the wind;the soil|watercycle
Where is most of Earth's water found?|in the oceans|in rivers;in lakes;in clouds|watercycle
Water that runs downhill over the ground to rivers and seas is called ___.|runoff|vapor;fog;frost|watercycle
After a sunny morning a puddle is gone because its water ___.|evaporated|froze;melted;condensed|watercycle
Drops appear on the outside of a cold glass. They come from water vapor in the ___.|air|glass;drink;table|watercycle
Water in the form of a gas in the air is called water ___.|vapor|rain;ice;fog|watercycle
Snow forms when water in clouds freezes into ___.|ice crystals|raindrops;vapor;fog|watercycle
A raindrop falls from a cloud because ___ pulls it down.|gravity|wind;the Moon;the Sun|watercycle
Tiny pieces of rock mixed with bits of dead plants and animals make ___.|soil|lava;ice;metal|rocks
Rocks are made of one or more ___.|minerals|bones;cloth;plastic|rocks
Which of these is the hardest mineral?|diamond|chalk;gold;talc|rocks
The dark top layer of soil, full of plant food, is the ___.|topsoil|bedrock;gravel;clay|rocks
The solid rock far under the soil layers is called ___.|bedrock|topsoil;gravel;sand|rocks
Which kind of soil holds water best?|clay|sand;gravel;pebbles|rocks
Which kind of soil lets water drain through quickly?|sand|clay;mud;topsoil|rocks
A scientist uses a ___ to look closely at a rock.|hand lens|thermometer;stopwatch;calendar|rocks
Sand, silt and clay are tiny pieces of ___.|rock|wood;plastic;paper|rocks
Earthworms help soil by ___.|digging tunnels that let in air and water|freezing it;painting it;making it hard|rocks
Wind, water and ice carrying bits of rock and soil away is called ___.|erosion|evaporation;pollution;migration|erosion
Moving water or wind drops the pieces it carried in a new place. This is called ___.|deposition|erosion;gravity;condensation|erosion
The Grand Canyon was carved mostly by ___.|a river|an earthquake;a volcano;a meteor|erosion
Plant roots slow down erosion because they ___.|hold soil in place|make rain;create wind;melt rock|erosion
Weathering is when rock is slowly ___.|broken into smaller pieces|turned into metal;grown bigger;painted|erosion
Water freezes in a crack in a rock. As it turns to ice it ___.|expands and widens the crack|shrinks;melts the rock;glows|erosion
A fast river can carry ___ soil and rock than a slow river.|more|less;exactly the same|erosion
Which can slow erosion on a hillside?|planting grass and trees|cutting down all the plants;digging up the soil;adding more rain|erosion
A glacier is a slow-moving river of ___.|ice|sand;lava;mud|erosion||Think about a very cold place where snow piles up for years and slowly squeezes into something solid.
Sand dunes in a desert are shaped by ___.|wind|volcanoes;glaciers;the Moon|erosion
Resources that can be used again and again, like sunlight and wind, are ___.|renewable|nonrenewable;plastic;extinct|resources
Coal, oil and natural gas take millions of years to form, so they are ___ resources.|nonrenewable|renewable;endless;new|resources
Which energy source is renewable?|wind|coal;oil;natural gas|resources
Which of these is a natural resource?|water|a car;a phone;a bicycle|resources
Using less and not wasting a resource is called ___.|conservation|pollution;erosion;evaporation|resources
Trees cut for wood can be replaced by planting new ones, so wood can be a ___ resource.|renewable|nonrenewable;useless;endless|resources
Reduce, reuse and ___ are three ways to help the Earth.|recycle|remove;replace;repeat|resources
Oil and coal formed from plants and animals that lived ___.|millions of years ago|last year;last week;yesterday|resources
Solar panels change sunlight into ___.|electricity|rain;rocks;sound|resources
Dirty air, water or land is called ___.|pollution|conservation;erosion;weather|resources
The Moon shines because it ___ light from the Sun.|reflects|makes;eats;hides|moonphase
The changing shape of the Moon that we see in the sky is called the Moon's ___.|phases|seasons;tides;eclipses|moonphase
When we can see the whole round face of the Moon lit up, it is a ___ Moon.|full|new;crescent;quarter|moonphase
When we cannot see the Moon's lit side at all, it is a ___ Moon.|new|full;half;crescent|moonphase
About how long does the Moon take to go through all its phases?|one month|one day;one week;one year|moonphase
The Moon travels around the ___.|Earth|Mars;Jupiter;the stars|moonphase
A Moon that looks like a thin curved slice is a ___ Moon.|crescent|full;new;round|moonphase
Moon phases happen because we see different amounts of the Moon's ___ side.|sunlit|cold;rainy;frozen|moonphase
After a new Moon, the lit part we see gets bigger each night. This is called ___.|waxing|waning;falling;shrinking|moonphase
Which is true about the Moon?|it has no air|it has oceans;it has rain;it has forests|moonphase
The same side of the Moon always faces ___.|Earth|the Sun;Mars;away from us|moonphase
Which planet is closest to the Sun?|Mercury|Venus;Earth;Mars|planets
Earth is the ___ planet from the Sun.|third|second;fourth;first|planets
Which is the biggest planet in our solar system?|Jupiter|Saturn;Neptune;Earth|planets
Which planet has bright rings you can see with a small telescope?|Saturn|Mars;Mercury;Venus|planets
Which planet is called the Red Planet?|Mars|Venus;Jupiter;Mercury|planets
The four planets closest to the Sun are made mostly of ___.|rock|gas;water;fire|planets
Which of these is a gas giant?|Jupiter|Mars;Venus;Earth|planets
Which planet comes right after Earth, going away from the Sun?|Mars|Venus;Jupiter;Mercury|planets
Which planet is the farthest from the Sun?|Neptune|Uranus;Saturn;Jupiter|planets
Pluto is now called a ___ planet.|dwarf|giant;gas;rocky|planets
Our Sun is a ___.|star|planet;moon;comet|planets
A planet travels around the Sun in a path called an ___.|orbit|equator;horizon;axis|planets
How many planets are in our solar system?|eight|seven;nine;ten|planets
Which planet is the hottest, with thick clouds that trap heat?|Venus|Mercury;Mars;Neptune|planets
`));

BANK.sci_earth.push(...discRows(3, `
Earth's outer shell is broken into huge slabs called ___ plates.|tectonic|crystal;desert;ocean|plates
Earth's plates move slowly, about a few ___ each year.|centimeters|kilometers;meters;miles|plates
Earthquakes happen most often where plates ___.|meet and rub or push|stay far from edges;disappear;stop for good|plates
Mountains can form where two plates push together. This is a ___ boundary.|convergent|divergent;transform;central|plates
Where plates pull apart, the boundary is called ___.|divergent|convergent;transform;central|plates
The San Andreas Fault in California is where two plates ___.|slide past each other|crash head-on;pull apart;sink into the sea|plates
Most volcanoes form near plate ___.|boundaries|centers;deserts;poles|plates
The Ring of Fire, with many volcanoes and earthquakes, circles the ___ Ocean.|Pacific|Atlantic;Indian;Arctic|plates
Earth's layers from outside to inside are crust, mantle, outer core and ___.|inner core|atmosphere;ocean;surface|plates
Which layer of Earth is the thinnest?|the crust|the mantle;the outer core;the inner core|plates
Which layer of Earth is the thickest?|the mantle|the crust;the outer core;the inner core|plates
The outer core is made of hot, liquid ___.|metal|water;ice;sand|plates
Scientists use a ___ to record earthquakes.|seismograph|thermometer;barometer;telescope|plates
The spot on the ground right above where an earthquake starts is the ___.|epicenter|crater;core;summit|plates
Long ago the continents were joined in one huge landmass called ___.|Pangaea|Atlantis;Eurasia;Antarctica|plates
Melted rock that flows out of a volcano onto the ground is called ___.|lava|magma;soot;ore|plates
Rock that forms when melted rock cools and hardens is ___.|igneous|sedimentary;metamorphic;fossil|rockcycle
Rock that forms when layers of sediment are pressed together is ___.|sedimentary|igneous;metamorphic;volcanic|rockcycle
Rock that is changed by heat and pressure is ___.|metamorphic|igneous;sedimentary;crystal|rockcycle
Granite is an ___ rock.|igneous|sedimentary;metamorphic;liquid|rockcycle
Limestone is a ___ rock.|sedimentary|igneous;metamorphic;liquid|rockcycle
Marble forms from limestone that is squeezed and heated deep down, so it is ___.|metamorphic|igneous;sedimentary;volcanic|rockcycle
Which kind of rock most often holds fossils?|sedimentary|igneous;metamorphic;lava|rockcycle
Melted rock that is still underground is called ___.|magma|lava;sand;sediment|rockcycle
Layers of sediment get squeezed together by the weight above them. This is called ___.|compaction|erosion;melting;eruption|rockcycle
Any rock can slowly become any other kind of rock. This is the rock ___.|cycle|chain;web;line|rockcycle
Which process breaks rock down into sediment?|weathering|melting;cooling;cementing|rockcycle
Sand and mud carried by a river and dropped at its mouth are called ___.|sediment|magma;lava;bedrock|rockcycle
Melted rock that cools slowly deep underground forms ___ crystals.|large|tiny;no;glassy|rockcycle
Rock layers in a canyon wall were laid down one on top of another from mud and sand. They are ___ rock.|sedimentary|igneous;metamorphic;volcanic|rockcycle
The layer of air nearest the ground is the ___.|troposphere|stratosphere;mesosphere;thermosphere|atmosphere
Almost all weather happens in the ___.|troposphere|stratosphere;mesosphere;exosphere|atmosphere
The ozone layer is found in the ___.|stratosphere|troposphere;thermosphere;exosphere|atmosphere
The ozone layer protects us from the Sun's harmful ___ rays.|ultraviolet|radio;sound;rain|atmosphere
Most of the air around us is ___.|nitrogen|oxygen;carbon dioxide;hydrogen|atmosphere
About one fifth of the air is ___.|oxygen|nitrogen;helium;argon|atmosphere
As you climb a tall mountain, the air gets ___.|thinner|thicker;heavier;wetter|atmosphere
Air pressure is greatest ___.|at sea level|at the top of a mountain;in space;high in the sky|atmosphere
A barometer measures ___.|air pressure|temperature;wind speed;rainfall|atmosphere
Which layer is the highest, where the air is very thin and fades into space?|the exosphere|the troposphere;the stratosphere;the mesosphere|atmosphere
Gases such as carbon dioxide trap heat near Earth. This is called the ___ effect.|greenhouse|rainbow;ozone;wind|atmosphere
In the troposphere, the temperature ___ as you go higher.|gets colder|gets warmer;stays the same;turns to ice cream|atmosphere
The colorful lights called auroras glow in the upper atmosphere, in the ___.|thermosphere|troposphere;stratosphere;mesosphere|atmosphere
Light from the Sun takes about ___ to reach Earth.|8 minutes|8 seconds;8 hours;8 days|solarscale
About how many Earths could fit side by side across the Sun?|100|10;1,000;1,000,000|solarscale
One astronomical unit (AU) is the distance from ___.|Earth to the Sun|Earth to the Moon;Sun to Jupiter;Mars to Earth|solarscale
A light-year is a measure of ___.|distance|time;speed;brightness|solarscale
Which planet has the longest year?|Neptune|Mercury;Earth;Mars|solarscale
Which is the largest object in our solar system?|the Sun|Jupiter;Earth;the Moon|solarscale
The belt of rocky pieces between Mars and Jupiter is the ___ belt.|asteroid|comet;moon;dust|solarscale
The tail of a comet always points ___.|away from the Sun|toward the Sun;toward Earth;down|solarscale
Which one is closest to Earth?|the Moon|the Sun;Mars;Jupiter|solarscale
Jupiter's Great Red Spot is a giant ___.|storm|volcano;lake;crater|solarscale
Which planet spins on its side?|Uranus|Mars;Earth;Mercury|solarscale
Which planet has the shortest year?|Mercury|Venus;Earth;Mars|solarscale
Which is made of ice, dust and rock and grows a glowing tail near the Sun?|a comet|an asteroid;a moon;a planet|solarscale
Which of these is a rocky planet?|Mars|Saturn;Neptune;Jupiter|solarscale
The Sun holds about ___ of all the mass in our solar system.|99 percent|50 percent;10 percent;1 percent|solarscale
Earth spins once on its axis about every ___.|24 hours|365 days;12 hours;one month|rotrev
Earth travels once around the Sun in about ___.|365 days|24 hours;30 days;7 days|rotrev
Day and night are caused by Earth's ___.|rotation|revolution;tilt;orbit|rotrev
The seasons are caused mainly by Earth's ___ as it travels around the Sun.|tilt|speed;size;color|rotrev
Earth's axis is tilted about ___ degrees.|23|90;45;10|rotrev
When it is summer in the Northern Hemisphere, it is ___ in the Southern Hemisphere.|winter|summer;autumn;spring|rotrev
Earth spins in one direction, so the Sun seems to rise in the ___.|east|west;north;south|rotrev
A year is about 365 and a quarter days, so every four years we add a ___.|leap day|extra week;moon day;second summer|rotrev
A solar eclipse happens when the ___ passes between Earth and the Sun.|Moon|Sun;a comet;Venus|rotrev
A lunar eclipse happens when Earth is between the Sun and the ___.|Moon|stars;Mars;Venus|rotrev
Summer days are longer because Earth's tilt points your half of the world ___ the Sun.|toward|away from;sideways to;behind|rotrev
Near the equator, day and night are about the same length ___.|all year|in winter only;in summer only;never|rotrev
The Sun is at its highest point in the sky around ___.|noon|sunrise;sunset;midnight|rotrev
Earth's path around the Sun is called its ___.|orbit|axis;equator;rotation|rotrev
The imaginary line Earth spins around is its ___.|axis|orbit;equator;horizon|rotrev
`));

BANK.sci_phys.push(...discRows(2, `
The three common states of matter are solid, liquid and ___.|gas|metal;powder;foam|states
Matter that keeps its own shape and size is a ___.|solid|liquid;gas;vapor|states
Matter that takes the shape of its container but keeps its size is a ___.|liquid|solid;gas;crystal|states
Matter that spreads out to fill its whole container is a ___.|gas|solid;liquid;block|states
When a solid turns into a liquid, it ___.|melts|freezes;condenses;evaporates|states
When a liquid turns into a solid, it ___.|freezes|melts;boils;evaporates|states
When a liquid turns into a gas, it ___.|evaporates|freezes;melts;hardens|states
When a gas cools and turns into a liquid, it ___.|condenses|melts;burns;breaks|states
Water freezes at ___.|0 degrees Celsius|100 degrees Celsius;50 degrees Celsius;10 degrees Celsius|states
Water boils at ___.|100 degrees Celsius|0 degrees Celsius;50 degrees Celsius;10 degrees Celsius|states
Anything that has mass and takes up space is called ___.|matter|energy;light;sound|states
Which one is NOT matter?|light|air;water;a rock|states
Which of these is a gas?|the air in a bike tire|a rubber tire;water;sand|states
Mass is the amount of ___ in an object.|matter|color;heat;light|states
You can measure mass with a ___.|balance|ruler;thermometer;clock|states
You can measure temperature with a ___.|thermometer|ruler;balance;measuring cup|states
A push or a pull is called a ___.|force|matter;mass;volume|forces
The force that pulls things down toward Earth is ___.|gravity|magnetism;friction;wind|forces
The force that slows down things that rub together is ___.|friction|gravity;magnetism;light|forces
Which surface has the most friction?|sandpaper|ice;glass;a wet floor|forces
A magnet pulls on objects made of ___.|iron|wood;plastic;glass|forces
Which would a magnet pick up?|a steel paper clip|a rubber band;a wooden spoon;a plastic cup|forces
Which would a magnet NOT pick up?|a plastic button|a nail;a steel screw;a paper clip|forces
Every magnet has two ends called ___.|poles|sides;wires;handles|forces
Two north poles of magnets will ___ each other.|push away|pull toward;stick to;ignore|forces
The north pole of one magnet and the south pole of another will ___ each other.|pull toward|push away;ignore;melt|forces
Which force can act without touching an object?|magnetism|kicking it;throwing it;pulling it with a rope|forces
A ball rolling across grass slows down and stops mostly because of ___.|friction|magnetism;light;sound|forces
If the forces on an object are balanced, the object ___.|does not change how it is moving|speeds up;gets heavier;turns magnetic|forces
A bigger push makes a ball go ___.|faster and farther|slower;nowhere;backward|forces
Wheels on a wagon make it easier to move because they ___.|cut down friction|add weight;make it magnetic;make it stick|forces
A ramp is a kind of simple machine called an ___.|inclined plane|lever;pulley;wheel and axle|machines
A seesaw is a ___.|lever|ramp;pulley;wedge|machines
A knife blade works as a ___.|wedge|screw;pulley;wheel and axle|machines
A flagpole uses a rope and a wheel called a ___.|pulley|lever;wedge;screw|machines
A jar lid works like a ___.|screw|wedge;pulley;lever|machines
A simple machine helps us by making work ___.|easier|louder;colder;slower|machines
Lever, pulley, wheel and axle, inclined plane, wedge and ___ are the six simple machines.|screw|spring;gear;engine|machines
A doorknob is an example of a ___.|wheel and axle|wedge;ramp;pulley|machines
A crowbar is a ___.|lever|wedge;screw;pulley|machines
A ramp makes it easier to lift a heavy box because you push it over a ___ distance.|longer|shorter;zero;smaller|machines
The turning point of a lever is called the ___.|fulcrum|plane;wedge;axle|machines
Which one is NOT a simple machine?|a toaster|a ramp;a lever;a pulley|machines
A bicycle wheel turns on a rod called the ___.|axle|wedge;ramp;lever|machines
Energy of motion is called ___ energy.|kinetic|potential;static;solar|energy
A ball held high up has stored energy called ___ energy.|potential|kinetic;sound;heat|energy
The Sun gives us light and ___.|heat|ice;rain;sound|energy
A ringing bell gives off ___ energy.|sound|chemical;magnetic;nuclear|energy
A cup of hot cocoa warms your hands with ___ energy.|heat|sound;light;motion|energy
A toaster changes electrical energy into ___.|heat|sound;wind;food|energy
A light bulb changes electrical energy into light and ___.|heat|sound;ice;rain|energy
Food gives your body ___ energy.|chemical|electrical;sound;wind|energy
Plants use ___ energy to make food.|light|sound;wind;magnetic|energy
Which one has stored energy?|a stretched rubber band|a rolling ball;a flying bird;running water|energy
A wind turbine changes the energy of moving air into ___.|electricity|sunlight;rocks;water|energy
Which one gives off both light and heat?|a campfire|a mirror;the Moon;ice|energy
Which is an example of kinetic energy?|a running dog|a book on a shelf;a battery;a sleeping cat|energy
A battery stores ___ energy.|chemical|motion;sound;heat|energy
A complete path that electricity can flow around is a ___.|circuit|battery;switch;magnet|circuits
A circuit has to be ___ for a bulb to light.|closed|open;broken;empty|circuits
A switch turns a circuit off by making a ___ in it.|gap|bulb;battery;wire|circuits
Which material lets electricity flow through it?|copper wire|rubber;plastic;wood|circuits
A material that does NOT let electricity flow easily is an ___.|insulator|conductor;battery;wire|circuits
A material that lets electricity flow easily is a ___.|conductor|insulator;shadow;spring|circuits
The plastic around a wire keeps us safe because plastic is a good ___.|insulator|conductor;battery;magnet|circuits
Which would NOT carry electricity in a circuit?|a rubber band|a metal paper clip;a copper wire;a steel key|circuits
Which part of a flashlight gives it power?|the batteries|the case;the switch;the lens|circuits
Electricity from a wall outlet can be very ___, so never touch it.|dangerous|tasty;slow;quiet|circuits
In a circuit, the wire is like a ___ for the electricity.|path|battery;storm;door|circuits
Lightning is a huge spark of ___ electricity.|static|battery;solar;wall|circuits
Rubbing a balloon on your hair can make ___ electricity.|static|solar;nuclear;wind|circuits
A bulb in a circuit does not light. Which is a good first check?|whether all the wires are touching|the color of the wire;the size of the room;the time of day|circuits
`));

BANK.sci_phys.push(...discRows(3, `
Salt stirred into water until it seems to disappear makes a ___.|solution|solid;pure metal;gas|mixtures
In salt water, the salt is the solute and the water is the ___.|solvent|solute;filter;crystal|mixtures
Sand mixed in water can be separated by ___.|filtering|using a magnet;freezing;burning|mixtures
Iron filings mixed with sand can be separated with a ___.|magnet|filter;thermometer;microscope|mixtures
Which one is a mixture?|trail mix|pure water;a gold bar;oxygen|mixtures
Which one is a solution?|sugar dissolved in tea|sand in water;oil in water;pebbles in a jar|mixtures
To get salt back out of salt water, you can let the water ___.|evaporate|be filtered;be magnetized;be shaken|mixtures
The parts of a mixture can be ___.|separated without making anything new|turned into a new substance;destroyed;changed into gas|mixtures
Oil floats on water because it is ___.|less dense|more dense;warmer;heavier|mixtures
Which helps sugar dissolve faster in water?|stirring|using bigger lumps;adding no water;keeping it cold|mixtures
Air is a mixture of ___.|gases|only oxygen;liquids;solids|mixtures
Which is a pure substance?|distilled water|ocean water;soil;orange juice|mixtures
Sugar dissolves faster in hot water than in cold water because heat ___.|speeds up the tiny particles|slows the sugar down;stops the stirring;makes the sugar heavier|mixtures
Which is a physical change?|ice melting|wood burning;a nail rusting;milk going sour|change
Which is a chemical change?|wood burning|ice melting;paper tearing;sugar dissolving|change
A new substance is made in a ___ change.|chemical|physical;slow;small|change
Which is a sign of a chemical change?|a new color and gas bubbles|a change in size;a change in shape;crushing|change||Think about an egg being cooked or a nail left in the rain. What do you see that was not there before?
Rusting iron is a ___.|chemical change|physical change;change of state;mixture|change
Cutting paper into pieces is a ___.|physical change|chemical change;burning;rusting|change
Baking cake batter makes new substances. It is a ___ change.|chemical|physical;shape;size|change
Water boiling into steam is a ___ change because it is still water.|physical|chemical;rusting;burning|change
Which one can be undone easily?|freezing water|burning a log;baking bread;rusting a bike|change
An apple slice turning brown is a ___ change.|chemical|physical;size;shape|change
Baking soda mixed with vinegar makes bubbles of new gas. This is a ___ change.|chemical|physical;shape;state|change
Crushing a can is a ___ change.|physical|chemical;burning;rusting|change
Dissolving sugar in water is a ___ change.|physical|chemical;rusting;burning|change
Which one is NOT a physical change?|bread toasting|chopping wood;melting butter;breaking glass|change
When matter changes state, it ___.|is still the same kind of matter|turns into a new substance;disappears;weighs nothing|change||Think of ice melting into water and then freezing again. Is it ever a different material?
The Moon's gravity is ___ than Earth's.|weaker|stronger;the same;zero|gravity
On the Moon you would weigh ___ than on Earth.|less|more;the same;nothing|gravity
Your mass is the same on the Moon because mass is the amount of ___ in you.|matter|pull;weight;height|gravity
Weight is a measure of the pull of ___ on an object.|gravity|friction;magnetism;wind|gravity
Gravity pulls objects ___.|toward the center of Earth|away from Earth;sideways;upward|gravity
A feather and a hammer dropped together on the airless Moon will ___.|land at the same time|float upward;fall very slowly;land at different times|gravity
The more mass an object has, the ___ its gravity.|stronger|weaker;shorter;colder|gravity
The farther apart two objects are, the ___ the pull of gravity between them.|weaker|stronger;the same;heavier|gravity
What keeps the Moon traveling around Earth?|gravity|friction;magnetism;wind|gravity
The Sun's gravity keeps the planets ___.|in their orbits|still;from spinning;frozen|gravity
Weight is measured in units called ___.|newtons|meters;liters;seconds|gravity
A crumpled paper falls faster than a flat sheet because of less ___.|air resistance|gravity;mass;magnetism|gravity
Astronauts seem to float in orbit because they are ___.|falling around Earth|beyond all gravity;magnetized;very light|gravity
Heat always flows from ___.|hot things to cold things|cold things to hot things;cold things to cold things;nowhere|transfer
Heat moving through a solid by touch is called ___.|conduction|convection;radiation;evaporation|transfer
Heat moving in liquids and gases as they flow is called ___.|convection|conduction;radiation;insulation|transfer
Heat from the Sun reaches Earth through space by ___.|radiation|conduction;convection;friction|transfer
A metal spoon left in hot soup gets hot by ___.|conduction|radiation;evaporation;melting|transfer
Which material is the best insulator?|foam|copper;aluminum;iron|transfer
Which is a good conductor of heat?|metal|wood;plastic;wool|transfer
A hot air balloon rises because warm air is ___.|less dense|more dense;heavier;colder|transfer
At the top of a hill, a roller coaster has the most ___ energy.|potential|kinetic;sound;chemical|transfer
At the bottom of a hill, a roller coaster has the most ___ energy.|kinetic|potential;stored;chemical|transfer
Energy cannot be created or destroyed. It can only ___.|change from one form to another|be made from nothing;be lost forever;be used up|transfer
Rubbing your hands together changes motion energy into ___.|heat|chemical energy;magnetism;sunlight|transfer
A solar cell changes light into ___.|electrical energy|chemical energy;sound;wind|transfer
Most of the energy an old-style light bulb uses is wasted as ___.|heat|sound;sparks;magnetism|transfer
A fan changes electrical energy into ___.|motion|chemical energy;light only;rain|transfer
The highest point of a wave is the ___.|crest|trough;wavelength;wave bottom|waves
The lowest point of a wave is the ___.|trough|crest;wavelength;peak|waves
The distance from one crest to the next crest is the ___.|wavelength|amplitude;frequency;trough|waves
Sound cannot travel through ___.|empty space|water;steel;air|waves
Which can travel through empty space?|light|sound;ocean waves;an earthquake|waves
A higher pitch means the sound wave has a higher ___.|frequency|loudness;crest;gravity|waves
The loudness of a sound depends on the wave's ___.|amplitude|wavelength;color;speed of light|waves
Light bouncing off a surface is called ___.|reflection|refraction;absorption;evaporation|waves
Light bending as it passes from air into water is called ___.|refraction|reflection;absorption;condensation|waves
A straw looks bent in a glass of water because of ___.|refraction|reflection;gravity;evaporation|waves
Sound travels fastest through ___.|a solid|a gas;a liquid;empty space|waves
An echo is a sound that has ___.|bounced back|bent;slowed to a stop;turned into light|waves
A rainbow shows that white light is made of ___.|many colors|one color;no color;only heat|waves
A red apple looks red because it ___ red light.|reflects|absorbs;makes;blocks all|waves
Waves carry ___ from place to place.|energy|matter;water;air|waves
Radio waves, microwaves and visible light are all ___ waves.|electromagnetic|sound;ocean;seismic|waves
Earthquake waves are called ___ waves.|seismic|solar;light;radio|waves
`));
/* ---------- Discover: geography and civics (P2-37; CURRICULUM section 6) ---------- */
/* Three skills: geo_world (levels 1 and 2: grades K-2 and 3-4), geo_us (levels 1 and 2: grades 3-4 and 5-6) and civ (levels 1 and 2:
   grades K-2 and 5-6). CURRICULUM 6 leaves the cells "n/a" where a skill has no content for a grade band, so the levels of a skill
   count only the bands it has (geo_us 1 is the 3-4 column, geo_us 2 the 5-6 column, civ 2 the 5-6 column). Each item's `grade` says which.
   Same row format and helpers as d-disc.js (discRows, DISC_HINT). Map skills are asked in words (map words, coordinates written as
   pairs such as (3, 2), a key described in a sentence): no item needs a map or a picture. States, capitals, regions and borders are
   made from the tables below, in this file's order, with no random numbers, so the same file always gives the same items.
   Civics is neutral and age-appropriate: how government works, never who is in it; no living person and no holiday of one faith.
   Row = question | right answer | wrong answers (split by ;) | topic | picture (art name,emoji) | hint
   tools/test.js ("Discover 3-6, geography and civics P2-37") checks all of it. */

Object.assign(DISC_HINT, {
  // geo_world 1
  mapwords: 'Picture a drawing of a place the way a bird sees it. Think about the four main directions and where each one points.',
  landforms: 'Picture the shape of the land or water. Is it high or low, flat or steep, wet or dry?',
  continents: 'Think of the giant pieces of ground on Earth that the oceans separate. Which one has what the question describes?',
  oceans: 'Think of the huge seas on Earth. Picture which lands each one touches.',
  // geo_world 2
  grid: 'Count the squares one step at a time, starting from the corner marked (0, 0).',
  key: 'A drawing like this comes with small helpers around its edges. Decide which helper does this job.',
  hemi: 'Imagine lines drawn on the ball that is Earth. Think about which line splits it into which halves.',
  climate: 'Think about how far a place is from the middle of Earth and how high it is, and what the sky is usually like there.',
  features: 'Think about the continent where this famous place is. Say the continent in your head before you choose.',
  // geo_us 1
  capitals: 'The capital is where the state leaders meet. It is often not the biggest place in the state.',
  states: 'Each capital belongs to one state. Think about the part of the country it is in.',
  regions: 'Think of the country cut into five big areas by position. Where in the country is this state?',
  borders: 'Imagine the states as puzzle pieces. A neighbor touches this one along a line.',
  // geo_us 2
  landmarks: 'Think about the part of the country where this famous place is. Which state would you cross the country to reach it?',
  rivers: 'Follow the water from where it starts to where it ends, and think about which way the land slopes.',
  mountains: 'Think about where in the country this big line of peaks is, and how old and worn down it is.',
  timezones: 'Count the zones between the two places and decide which way the clock moves.',
  // civ 1
  helpers: 'Think about the job. What does this person do all day, and who do they help?',
  rules: 'Think about what could go wrong, or be unfair, if nobody had to follow the same rule.',
  symbols: 'Think about what a sign or a picture makes you think of when you see it.',
  needswants: 'Ask if you could do without it and still be well tomorrow. If not, it is a must-have.',
  community: 'Think about the neighborhood around you and who and what keeps it going smoothly for everyone.',
  // civ 2
  branches: 'Our government splits its jobs into three branches: making laws, carrying them out and judging them. Match the job to the branch.',
  constitution: 'Think about the written plan the nation agreed on long ago, and how it can be changed.',
  rights: 'Ask if it is something you are allowed to do, or something you should do to help the group.',
  economy: 'Think about what is being made, sold or bought, and who is doing it. Is it a thing you can hold or work done for you?',
  supply: 'Think about a store: how much is on the shelves, how many shoppers are lining up, and what happens to the price tag when one changes.',
});

BANK.geo_world = discRows(1, `
On a compass, the letter N stands for ___.|north|south;east;west|mapwords
On most maps, north is at the ___ of the map.|top|bottom;left;right|mapwords
On most maps, south is at the ___ of the map.|bottom|top;left;right|mapwords
On most maps, east is on the ___ side of the map.|right|left;top;bottom|mapwords
On most maps, west is on the ___ side of the map.|left|right;top;bottom|mapwords
The Sun comes up in the east and goes down in the ___.|west|north;south;east|mapwords
The opposite of north is ___.|south|east;west;up|mapwords
The opposite of east is ___.|west|north;south;left|mapwords
If you face north, east is on your ___.|right|left;back;front|mapwords
If you face north, west is on your ___.|left|right;back;front|mapwords
A map is a drawing of a place as seen from ___.|above|the side;inside;underneath|mapwords
The tool that shows which way is north is a ___.|compass|clock;ruler;scale|mapwords
A small picture on a map, such as a tree or a house, is a ___.|symbol|number;border;grid|mapwords
A map key tells you what the ___ on the map mean.|symbols|sounds;seasons;days|mapwords
Which one is a direction word?|south|sun;song;sand|mapwords
A map of your classroom shows ___.|where things are|what things smell like;what things cost;who is tallest|mapwords
Which one is a compass direction?|west|up;left;under|mapwords
If you walk toward the place where the Sun sets, you are walking ___.|west|east;north;south|mapwords
On a map, the top is north. Which way is the bottom of the map?|south|east;west;north|mapwords
A very tall landform with a peak is a ___.|mountain|valley;island;lake|landforms
A low area of land between mountains or hills is a ___.|valley|mountain;island;desert|landforms
Land that has water all around it is an ___.|island|valley;mountain;plain|landforms
A big flat area of land is a ___.|plain|mountain;island;volcano|landforms
A hill is ___ than a mountain.|smaller|taller;wetter;wider|landforms
A large area of very dry land with little rain is a ___.|desert|lake;island;bay|landforms
A body of water with land all around it is a ___.|lake|island;peninsula;desert|landforms
A stream of water that flows across the land to the sea is a ___.|river|lake;valley;island|landforms
A mountain that can erupt with hot melted rock is a ___.|volcano|valley;plain;island|landforms
Land with water on three sides is a ___.|peninsula|island;lake;valley|landforms
A deep, narrow valley with steep sides, often cut by a river, is a ___.|canyon|plain;lake;hill|landforms
The sandy or rocky land beside the sea is a ___.|beach|valley;mountain;volcano|landforms
Which one is NOT a landform?|a cloud|a hill;a valley;an island|landforms
Which one is a body of water?|an ocean|a hill;a plain;a mountain|landforms
A flat-topped area of high land is a ___.|plateau|valley;island;lake|landforms
A river that drops over a high cliff makes a ___.|waterfall|valley;island;plain|landforms
A part of the ocean that cuts into the land is a ___.|bay|island;plain;hill|landforms
Which landform is usually the highest?|a mountain|a hill;a valley;a plain|landforms
How many continents are there?|seven|five;six;eight|continents||Say the names of the continents you know and count them on your fingers.
Which continent is the biggest?|Asia|Africa;Europe;Australia|continents
Which continent is the coldest and covered in ice?|Antarctica|Asia;Africa;Europe|continents
People in the United States live on the continent of ___.|North America|South America;Europe;Asia|continents
Which continent has the Amazon rain forest?|South America|Africa;Europe;Antarctica|continents
Which continent is also one country?|Australia|Africa;Asia;Europe|continents
Which continent has the Sahara Desert?|Africa|Asia;Europe;Australia|continents
Giraffes live in the wild on the continent of ___.|Africa|Asia;Europe;Antarctica|continents
The South Pole is on the continent of ___.|Antarctica|Asia;Europe;North America|continents
China is on the continent of ___.|Asia|Africa;Europe;South America|continents
Mexico is on the continent of ___.|North America|South America;Europe;Asia|continents
Brazil is on the continent of ___.|South America|North America;Africa;Europe|continents
France is on the continent of ___.|Europe|Asia;Africa;Australia|continents
A continent is a very large piece of ___.|land|water;sky;ice cream|continents
Africa, Antarctica, Asia, Australia, Europe, North America and ___ are the seven continents.|South America|Greenland;the Arctic;the Pacific|continents
Which one of these is a continent?|Europe|Pacific;Sahara;Amazon|continents
Which continent has the most people?|Asia|Africa;Europe;North America|continents
Which is the biggest ocean?|the Pacific Ocean|the Atlantic Ocean;the Indian Ocean;the Arctic Ocean|oceans
Which is the smallest ocean?|the Arctic Ocean|the Pacific Ocean;the Atlantic Ocean;the Indian Ocean|oceans
Which ocean is between North America and Europe?|the Atlantic Ocean|the Pacific Ocean;the Indian Ocean;the Arctic Ocean|oceans
Which ocean touches the west coast of the United States?|the Pacific Ocean|the Atlantic Ocean;the Arctic Ocean;the Indian Ocean|oceans
Which ocean touches the east coast of the United States?|the Atlantic Ocean|the Pacific Ocean;the Arctic Ocean;the Indian Ocean|oceans
Most of Earth's surface is covered by ___.|water|land;ice;sand|oceans
Which one is an ocean?|the Atlantic|Asia;Africa;Europe|oceans
Ocean water tastes ___.|salty|sweet;sour;like lemons|oceans
Which ocean is at the very top of the world, around the North Pole?|the Arctic Ocean|the Pacific Ocean;the Atlantic Ocean;the Indian Ocean|oceans
`);

BANK.geo_world.push(...discRows(2, `
In the point (4, 2), the first number tells how far to go ___.|across|up;down;back|grid||Think of walking along a hallway first, and then climbing stairs. Which move comes first when you read a point?
In the point (4, 2), the second number tells how far to go ___.|up|across;down;back|grid||Think of walking along a hallway first, and then climbing stairs. Which move comes second when you read a point?
Start at (0, 0). Go 3 across and 2 up. Where are you?|(3, 2)|(2, 3);(3, 3);(5, 0)|grid
Start at (0, 0). Go 1 across and 4 up. Where are you?|(1, 4)|(4, 1);(1, 1);(5, 5)|grid
A treasure is at (2, 5). From (0, 0) you go ___.|2 across and 5 up|5 across and 2 up;2 across and 2 up|grid
A park is at (3, 4) and a school is at (3, 1). The school is ___ squares south of the park.|3|1;4;2|grid
A library is at (1, 2) and a zoo is at (5, 2). The zoo is ___ squares east of the library.|4|2;5;6|grid
A bank is at (2, 2). Go 3 squares east and 1 square north. Where are you?|(5, 3)|(3, 5);(2, 2);(1, 3)|grid
Which point is farthest to the east: (2, 1), (6, 1), (4, 4) or (1, 6)?|(6, 1)|(2, 1);(4, 4);(1, 6)|grid
Which point is farthest north: (1, 2), (4, 6), (5, 3) or (6, 1)?|(4, 6)|(1, 2);(5, 3);(6, 1)|grid
How many squares apart are (1, 1) and (1, 5)?|4|5;6;1|grid
How many squares apart are (2, 3) and (7, 3)?|5|4;6;9|grid
Which point is 2 across and 6 up from (0, 0)?|(2, 6)|(6, 2);(2, 2);(8, 0)|grid
A kite is at (3, 3). Move it 2 squares west. Where is it?|(1, 3)|(5, 3);(3, 1);(3, 5)|grid
A boat is at (4, 5). Move it 3 squares south. Where is it?|(4, 2)|(7, 5);(4, 8);(1, 5)|grid
A compass rose shows ___.|directions|distance;weather;time|key
NE on a compass rose stands for ___.|northeast|northwest;southeast;southwest|key
Which direction is between south and west?|southwest|northwest;southeast;northeast|key
A map scale tells you ___.|how map distance matches real distance|which way is north;what colors mean;the name of the map|key
On a scale where 1 inch equals 10 miles, 3 inches on the map is ___ miles.|30|13;3;10|key
On a map where 1 centimeter equals 5 kilometers, two towns 4 centimeters apart are ___ kilometers apart.|20|9;4;45|key
On most maps, blue stands for ___.|water|forests;roads;deserts|key
A map title tells you ___.|what the map is about|how long the trip is;the scale;the compass|key
A political map shows ___.|borders of countries or states|rainfall;mountain height only;animals|key
A physical map shows ___.|landforms and water|city populations;borders only;bus routes|key
To find how far apart two towns are, use the map ___.|scale|key;title;border|key
To find out what a map symbol means, check the ___.|key|scale;title;border|key
To find which way is north, check the ___.|compass rose|scale;key;title|key
A road map is most useful for ___.|planning a car trip|finding the highest mountain;checking rainfall;choosing a pet|key
The equator divides Earth into the Northern and ___ Hemispheres.|Southern|Eastern;Western;Central|hemi
The imaginary line around the middle of Earth is the ___.|equator|Prime Meridian;horizon;border|hemi
Places near the equator are usually ___.|hot|cold;snowy;frozen|hemi
The North Pole is in the ___ Hemisphere.|Northern|Southern;Tropical;Equatorial|hemi
The Prime Meridian divides Earth into the Eastern and ___ Hemispheres.|Western|Northern;Southern;Central|hemi
The United States is in the Northern and ___ Hemispheres.|Western|Southern;Eastern;Polar|hemi
Australia is in the ___ Hemisphere.|Southern|Northern;Western;Arctic|hemi
Lines of latitude run ___ around Earth.|east and west|north and south;diagonally;up and down|hemi
Lines of longitude run from ___.|pole to pole|east to west;sea to sea;the equator only|hemi
Latitude tells how far a place is north or south of the ___.|equator|Prime Meridian;compass;key|hemi
Longitude tells how far a place is east or west of the ___.|Prime Meridian|equator;North Pole;key|hemi
The farthest north place on Earth is the ___.|North Pole|equator;South Pole;Prime Meridian|hemi
A globe is a ___ model of Earth.|round|flat;square;paper-flat|hemi||Think of the shape Earth really is, and of the shape you can spin on a desk.
Places far from the equator, near the poles, are usually ___.|cold|hot;rainy;tropical|hemi
The usual weather of a place over many years is its ___.|climate|forecast;season;storm|climate||Today's rain or sun is one thing. This word is about the pattern a place keeps for a very long time.
Weather is what the sky is doing today. Climate is ___.|the usual weather over many years|tomorrow's weather;what you wear;only rain|climate||Think about a pattern that a place keeps for a long time, not just one day.
A tropical climate near the equator is ___ all year.|warm|freezing;snowy;dry and icy|climate
A desert climate is ___.|dry|rainy;icy;cloudy|climate
A polar climate is ___.|very cold|hot;tropical;warm and wet|climate
A tropical rain forest gets ___ rain.|a lot of|very little;no;only snow|climate
Which place has a polar climate?|Antarctica|the Amazon;the Sahara;Hawaii|climate
Which place usually has a desert climate?|the Sahara|the Amazon rain forest;Hawaii;Iceland|climate
It is colder near the poles because the Sun's light hits Earth there ___.|at a slant and spreads out|straight down;more brightly;for more hours a day|climate
The top of a high mountain is colder because the air there is ___.|thinner|thicker;heavier;wetter|climate
A place near the ocean usually has ___ temperatures than a place far inland.|milder|hotter;wilder;shorter|climate
The three main climate zones are tropical, temperate and ___.|polar|desert;mountain;ocean|climate
A temperate climate has ___.|four seasons|only summer;only winter;no seasons|climate
Most of the United States has a ___ climate.|temperate|polar;tropical;desert|climate
Mount Everest is the tallest mountain on Earth above sea level. It is in the ___ Mountains.|Himalaya|Alps;Andes;Rockies|features
The Himalayas are in ___.|Asia|Europe;Africa;South America|features
The Andes Mountains run along the west side of ___.|South America|Africa;Europe;Asia|features
The Alps are a mountain range in ___.|Europe|Asia;Africa;North America|features
The Nile River flows through ___.|Africa|Asia;Europe;South America|features
The Amazon River is in ___.|South America|Africa;Asia;Europe|features
The Sahara, the largest hot desert, is in ___.|Africa|Asia;Australia;South America|features
The Rocky Mountains are in ___.|North America|Europe;Asia;Africa|features
The Ganges River flows through ___.|India|Brazil;Egypt;Mexico|features
The Danube River flows through ___.|Europe|Asia;Africa;Australia|features
Mount Kilimanjaro is the tallest mountain in ___.|Africa|Asia;Europe;South America|features
The Great Barrier Reef is off the coast of ___.|Australia|Africa;Canada;Brazil|features
Mount Fuji, a famous volcano, is in ___.|Japan|Brazil;Egypt;Canada|features
The Yangtze River flows through ___.|China|India;Egypt;Brazil|features
The biggest island in the world that is not a continent is ___.|Greenland|Iceland;Hawaii;Cuba|features
The deepest spot in the ocean is in the Mariana ___.|Trench|Canyon;Mountain;Island|features
`));

/* ---------- geo_us: the 50 states, their capitals, five regions and neighbours, all from tables ---------- */
// code | state | capital | region (NE, SE, MW, SW, W, or - when books disagree) | a big city that is NOT the capital
const DISC_ST = `
AL|Alabama|Montgomery|SE|Birmingham
AK|Alaska|Juneau|W|Anchorage
AZ|Arizona|Phoenix|SW|Tucson
AR|Arkansas|Little Rock|-|Fort Smith
CA|California|Sacramento|W|Los Angeles
CO|Colorado|Denver|-|Colorado Springs
CT|Connecticut|Hartford|NE|New Haven
DE|Delaware|Dover|-|Wilmington
FL|Florida|Tallahassee|SE|Miami
GA|Georgia|Atlanta|SE|Savannah
HI|Hawaii|Honolulu|W|Hilo
ID|Idaho|Boise|W|Idaho Falls
IL|Illinois|Springfield|MW|Chicago
IN|Indiana|Indianapolis|MW|Fort Wayne
IA|Iowa|Des Moines|MW|Cedar Rapids
KS|Kansas|Topeka|MW|Wichita
KY|Kentucky|Frankfort|-|Louisville
LA|Louisiana|Baton Rouge|-|New Orleans
ME|Maine|Augusta|NE|Portland
MD|Maryland|Annapolis|-|Baltimore
MA|Massachusetts|Boston|NE|Springfield
MI|Michigan|Lansing|MW|Detroit
MN|Minnesota|Saint Paul|MW|Minneapolis
MS|Mississippi|Jackson|SE|Biloxi
MO|Missouri|Jefferson City|MW|Kansas City
MT|Montana|Helena|W|Billings
NE|Nebraska|Lincoln|MW|Omaha
NV|Nevada|Carson City|W|Las Vegas
NH|New Hampshire|Concord|NE|Manchester
NJ|New Jersey|Trenton|NE|Newark
NM|New Mexico|Santa Fe|SW|Albuquerque
NY|New York|Albany|NE|New York City
NC|North Carolina|Raleigh|SE|Charlotte
ND|North Dakota|Bismarck|MW|Fargo
OH|Ohio|Columbus|MW|Cleveland
OK|Oklahoma|Oklahoma City|-|Tulsa
OR|Oregon|Salem|W|Portland
PA|Pennsylvania|Harrisburg|NE|Philadelphia
RI|Rhode Island|Providence|NE|Newport
SC|South Carolina|Columbia|SE|Charleston
SD|South Dakota|Pierre|MW|Sioux Falls
TN|Tennessee|Nashville|SE|Memphis
TX|Texas|Austin|SW|Houston
UT|Utah|Salt Lake City|W|Provo
VT|Vermont|Montpelier|NE|Burlington
VA|Virginia|Richmond|-|Norfolk
WA|Washington|Olympia|W|Seattle
WV|West Virginia|Charleston|-|Huntington
WI|Wisconsin|Madison|MW|Milwaukee
WY|Wyoming|Cheyenne|W|Casper
`;
// states that share a border (a line on the ground; a state touching another at one point, or across water only, is not listed)
const DISC_ADJ = `
AL: FL GA MS TN
AZ: CA NV UT NM
AR: LA MS MO OK TN TX
CA: AZ NV OR
CO: KS NE NM OK UT WY
CT: MA NY RI
DE: MD NJ PA
FL: AL GA
GA: AL FL NC SC TN
ID: MT NV OR UT WA WY
IL: IN IA KY MO WI
IN: IL KY MI OH
IA: IL MN MO NE SD WI
KS: CO MO NE OK
KY: IL IN MO OH TN VA WV
LA: AR MS TX
ME: NH
MD: DE PA VA WV
MA: CT NH NY RI VT
MI: IN OH WI
MN: IA ND SD WI
MS: AL AR LA TN
MO: AR IL IA KS KY NE OK TN
MT: ID ND SD WY
NE: CO IA KS MO SD WY
NV: AZ CA ID OR UT
NH: ME MA VT
NJ: DE NY PA
NM: AZ CO OK TX
NY: CT MA NJ PA VT
NC: GA SC TN VA
ND: MN MT SD
OH: IN KY MI PA WV
OK: AR CO KS MO NM TX
OR: CA ID NV WA
PA: DE MD NJ NY OH WV
RI: CT MA
SC: GA NC
SD: IA MN MT NE ND WY
TN: AL AR GA KY MS MO NC VA
TX: AR LA NM OK
UT: AZ CO ID NV WY
VT: MA NH NY
VA: KY MD NC TN WV
WA: ID OR
WV: KY MD OH PA VA
WI: IA IL MI MN
WY: CO ID MT NE SD UT
`;
// pairs that touch at a point or across water: never a right answer, never a wrong one
const DISC_TOUCH = ['AZ CO', 'NM UT', 'IL MI', 'MI MN', 'NY RI', 'MD DC'];

(function () {
  const ST = DISC_ST.trim().split('\n').map(r => {
    const f = r.split('|');
    return {c: f[0], n: f[1], cap: f[2], reg: f[3], big: f[4]};
  });
  const byC = {};
  ST.forEach(s => { byC[s.c] = s; });
  const adj = {};
  DISC_ADJ.trim().split('\n').forEach(r => { adj[r.split(':')[0]] = r.split(':')[1].trim().split(' '); });
  const NAME = {NE: 'Northeast', SE: 'Southeast', MW: 'Midwest', SW: 'Southwest', W: 'West'};
  const REGS = ['NE', 'SE', 'MW', 'SW', 'W'];
  const rows = [];
  // capitals: state -> capital. Wrong: the big city that is not the capital (when it has one) and capitals of other states
  ST.forEach((s, i) => {
    if (s.cap.includes(s.n)) return; // Oklahoma City: the state's name would give the answer away
    const ds = [s.big];
    for (let k = 1; ds.length < 3; k++) {
      const o = ST[(i + k * 13 + 5) % ST.length];
      if (o.c !== s.c && o.cap !== s.cap && !ds.includes(o.cap)) ds.push(o.cap);
    }
    rows.push(`What is the capital of ${s.n}?|${s.cap}|${ds.join(';')}|capitals`);
  });
  rows.push('The capital of the United States is ___.|Washington, D.C.|New York City;Philadelphia;Chicago|capitals');
  // states: capital -> state, for 28 states, the wrong states chosen from the same region first
  ST.forEach((s, i) => {
    if (s.cap.includes(s.n) || i % 2 === 1 && i % 7 !== 0) return;
    const same = ST.filter(o => o.c !== s.c && s.reg !== '-' && o.reg === s.reg);
    const rest = ST.filter(o => o.c !== s.c && !same.includes(o));
    const ds = [];
    for (let k = 0; ds.length < 3; k++) {
      const o = k < same.length && k < 3 ? same[(i + k * 3) % same.length] : rest[(i * 5 + k * 11) % rest.length];
      if (!ds.includes(o.n) && o.n !== s.n) ds.push(o.n);
    }
    rows.push(`${s.cap} is the capital of which state?|${s.n}|${ds.join(';')}|states`);
  });
  rows.push('How many states are in the United States?|50|48;51;52|states');
  // regions: five regions, 43 states whose region books agree on
  ST.forEach((s, i) => {
    if (s.reg === '-') return;
    const others = REGS.filter(r => r !== s.reg), ds = [];
    for (let k = 0; ds.length < 3; k++) ds.push(NAME[others[(i + k) % others.length]]);
    rows.push(`Which region of the United States is ${s.n} in?|${NAME[s.reg]}|${[...new Set(ds)].join(';')}|regions`);
  });
  // borders: one neighbour as the right answer (rotating through the list), three states that do not touch it, from the same region first
  ST.forEach((s, i) => {
    const nb = adj[s.c];
    if (!nb || nb.length < 2) return;
    const right = byC[nb[(i * 3) % nb.length]];
    const touch = new Set([...nb, s.c]);
    DISC_TOUCH.forEach(p => { const [x, y] = p.split(' '); if (x === s.c) touch.add(y); if (y === s.c) touch.add(x); });
    const far = ST.filter(o => !touch.has(o.c) && o.c !== 'AK' && o.c !== 'HI');
    const near = far.filter(o => o.reg === s.reg && s.reg !== '-'), ds = [];
    for (let k = 0; ds.length < 3; k++) {
      const o = k < near.length && k < 1 ? near[(i + k) % near.length] : far[(i * 7 + k * 17) % far.length];
      if (!ds.includes(o.n)) ds.push(o.n);
    }
    rows.push(`Which state shares a border with ${s.n}?|${right.n}|${ds.join(';')}|borders`);
  });
  BANK.geo_us = discRows(1, rows.join('\n'), '3-4');
})();

BANK.geo_us.push(...discRows(2, `
The Statue of Liberty stands in the harbor of ___.|New York|Boston;Washington, D.C.;Florida|landmarks
The Grand Canyon is mostly in ___.|Arizona|Texas;Utah;Colorado|landmarks
Mount Rushmore, with four presidents carved in rock, is in ___.|South Dakota|Montana;Wyoming;Nebraska|landmarks
The Golden Gate Bridge is in ___.|California|Oregon;New York;Florida|landmarks
The Gateway Arch is in ___.|Missouri|Illinois;Ohio;Kansas|landmarks
Old Faithful, a famous geyser, is in ___ National Park.|Yellowstone|Yosemite;Zion;Acadia|landmarks
The Liberty Bell is in ___.|Philadelphia|Boston;Chicago;Atlanta|landmarks
The Space Needle is in ___.|Seattle|Denver;Dallas;Miami|landmarks
Niagara Falls is on the border between New York and ___.|Canada|Mexico;Vermont;Ohio|landmarks
The Alamo is in ___.|Texas|Florida;Arizona;Louisiana|landmarks
Denali, the highest mountain in North America, is in ___.|Alaska|Colorado;Washington;Wyoming|landmarks
The Everglades, a huge wetland, are in ___.|Florida|Georgia;Texas;Louisiana|landmarks
The White House is in ___.|Washington, D.C.|New York City;Boston;Philadelphia|landmarks
Crater Lake, the deepest lake in the United States, is in ___.|Oregon|Washington;Idaho;Nevada|landmarks
Mount St. Helens is a volcano in ___.|Washington|Oregon;Idaho;Montana|landmarks
Death Valley, one of the hottest places on Earth, is mostly in ___.|California|Arizona;Nevada;Texas|landmarks
Lake Michigan is the only Great Lake entirely inside the ___.|United States|Canada;Mexico;Alaska|landmarks
Which is the biggest of the Great Lakes?|Lake Superior|Lake Erie;Lake Ontario;Lake Michigan|landmarks
Cape Canaveral, where rockets are launched, is in ___.|Florida|Texas;California;Alaska|landmarks
The Mississippi River flows into the ___.|Gulf of Mexico|Pacific Ocean;Atlantic Ocean;Great Lakes|rivers
The Mississippi River flows mostly from north to ___.|south|east;west;north|rivers
The Colorado River carved the ___.|Grand Canyon|Rocky Mountains;Great Lakes;Death Valley|rivers
The Ohio River flows into the ___ River.|Mississippi|Colorado;Hudson;Columbia|rivers
The Hudson River runs through ___.|New York|Texas;Oregon;Florida|rivers
The Rio Grande forms part of the border between Texas and ___.|Mexico|Canada;Oklahoma;Florida|rivers
The Columbia River flows through the Pacific ___.|Northwest|Southwest;Northeast;Southeast|rivers
The Missouri River flows into the ___ River.|Mississippi|Ohio;Hudson;Colorado|rivers
The Great Lakes are in the northern United States, next to ___.|Canada|Mexico;the Gulf;Alaska|rivers
The Great Salt Lake is in ___.|Utah|Nevada;Idaho;Colorado|rivers
The Great Plains are mostly ___.|flat grassland|snowy mountains;thick rain forest;sand dunes|rivers
A river that flows into a bigger river is called a ___.|tributary|delta;canyon;harbor|rivers
Where a river meets the sea and spreads out, it often builds a ___.|delta|canyon;peak;volcano|rivers
The Appalachian Mountains run through the ___ part of the United States.|eastern|western;central;far northern|mountains
The Rocky Mountains are in the ___ part of the United States.|western|eastern;southern coast;central plains|mountains
The Sierra Nevada mountains are in ___.|California|Maine;Florida;Ohio|mountains
Which mountain range is older, with lower and rounder peaks worn down over time?|the Appalachian Mountains|the Rocky Mountains;the Sierra Nevada;the Cascades|mountains
The Cascade Range, with volcanoes like Mount St. Helens, is in the ___.|Pacific Northwest|Southeast;Midwest;Northeast|mountains
The Appalachian Mountains stretch from Canada south to ___.|Alabama|Texas;Nebraska;Utah|mountains
Which is the tallest mountain in the United States?|Denali|Mount Rainier;Mount Whitney;Mount Mitchell|mountains
The long mountain chain down the western side of North America, with peaks over 14,000 feet, is the ___.|Rocky Mountains|Appalachians;Ozarks;Alps|mountains
The ___ Mountains are in the northeast of the United States and include Mount Washington.|White|Rocky;Sierra;Cascade|mountains
Mount Whitney, the highest peak in the lower 48 states, is in the ___ mountains.|Sierra Nevada|Appalachian;Ozark;Catskill|mountains
Mauna Loa and Kilauea are volcanoes in ___.|Hawaii|Alaska;Oregon;Florida|mountains
The lower 48 United States have ___ main time zones.|four|two;three;six|timezones
Which is the easternmost main time zone of the lower 48 states?|Eastern|Pacific;Central;Mountain|timezones
When it is noon in New York (Eastern), it is ___ in Chicago (Central).|11 a.m.|1 p.m.;noon;10 a.m.|timezones
When it is 3 p.m. in Eastern Time, it is ___ in Pacific Time.|noon|6 p.m.;2 p.m.;1 p.m.|timezones
Going west across time zones, the clock time gets ___.|earlier|later;the same;stuck|timezones||The Sun is high for the east coast before the west coast. Think about what that does to the clocks as you go.
Going east across time zones, the clock time gets ___.|later|earlier;the same;stuck|timezones||The Sun is high for the east coast before the west coast. Think about what that does to the clocks as you go.
Time zones exist because Earth ___.|spins|is flat;is hot inside;has oceans|timezones||Think about the ball of Earth turning, so the Sun shines on one side at a time.
Los Angeles is in the ___ time zone.|Pacific|Eastern;Central;Mountain|timezones
Chicago is in the ___ time zone.|Central|Eastern;Pacific;Mountain|timezones
Denver is in the ___ time zone.|Mountain|Pacific;Central;Eastern|timezones
New York City is in the ___ time zone.|Eastern|Central;Pacific;Mountain|timezones
When it is 9 a.m. in Pacific Time, it is ___ in Mountain Time.|10 a.m.|8 a.m.;9 a.m.;noon|timezones
A game starts at 8 p.m. Eastern Time. A fan in the Central time zone should tune in at ___.|7 p.m.|9 p.m.;8 p.m.;6 p.m.|timezones
Earth is divided into about ___ main time zones.|24|12;7;50|timezones
Each time zone is about ___ wide in clock time.|one hour|ten hours;half a day;one minute|timezones||There are 24 zones around the whole Earth, and a day is 24 of what?
Pacific Time is ___ hours behind Eastern Time.|3|1;2;4|timezones
Mountain Time is ___ hour(s) ahead of Pacific Time.|1|2;3;0|timezones
`, '5-6'));

BANK.civ = discRows(1, `
Who helps put out fires?|a firefighter|a baker;a pilot;a farmer|helpers
Who helps keep us safe in our town?|a police officer|a baker;a farmer;a painter|helpers
Who helps sick people feel better?|a doctor|a baker;a pilot;a farmer|helpers
Who brings letters and packages to our homes?|a mail carrier|a dentist;a teacher;a builder|helpers
Who teaches students at school?|a teacher|a pilot;a farmer;a baker|helpers
Who takes care of your teeth?|a dentist|a baker;a pilot;a firefighter|helpers
Who grows food for us on a farm?|a farmer|a librarian;a dentist;a firefighter|helpers
Who drives the big yellow bus to school?|a bus driver|a pilot;a chef;a vet|helpers
Who helps you find and borrow books?|a librarian|a farmer;a vet;a builder|helpers
Who takes care of sick pets and farm animals?|a veterinarian|a baker;a firefighter;a pilot|helpers
Who builds houses and buildings?|a builder|a dentist;a vet;a librarian|helpers
Who collects the trash and recycling?|a sanitation worker|a baker;a pilot;a dentist|helpers
Community helpers are people who ___.|do jobs that help others|only watch TV;never work;live alone|helpers||Think of the firefighter, the teacher and the mail carrier. What do they all have in common?
Who makes bread and cakes in a bakery?|a baker|a pilot;a dentist;a vet|helpers
Why do we have rules at school?|to keep everyone safe and fair|to make people sad;to stop learning;to be mean|rules
What should you do before you cross a street?|stop and look both ways|run fast;close your eyes;hop|rules
At a red light, cars must ___.|stop|go fast;sing;honk|rules
A rule made for everyone in a town, state or country is called a ___.|law|toy;game;story|rules
Who must follow the law?|everyone|only kids;only grown-ups;nobody|rules
A good rule for the playground is to ___.|take turns|push others;grab all the balls;shout|rules
If someone breaks a rule, there is a ___.|consequence|prize;party;holiday|rules
Wearing a seat belt is a rule that keeps you ___.|safe|late;hungry;cold|rules
Raising your hand in class helps everyone ___.|get a turn to talk|talk at once;nap;go home|rules
Which is a fair way to share a toy?|take turns|take it and run;hide it;say it is yours|rules
A good citizen follows the rules and ___.|helps others|is rude;takes things;litters|rules
Voting is a fair way for a group to ___.|make a choice|sleep;pay bills;fly|rules
Walking in the hallway at school helps keep everyone ___.|safe|loud;late;hungry|rules
The flag of the United States has ___ stripes.|13|10;50;7|symbols
The flag of the United States has ___ stars.|50|13;48;100|symbols
Each star on the United States flag stands for a ___.|state|president;city;holiday|symbols
The 13 stripes on the flag stand for the first 13 ___.|colonies|cities;kings;oceans|symbols
The Statue of Liberty is a symbol of ___.|freedom|money;sports;weather|symbols
The bald eagle is a symbol of the ___.|United States|Mexico;Antarctica;Moon|symbols
The colors of the United States flag are red, white and ___.|blue|green;yellow;black|symbols
The Statue of Liberty holds a ___ in her raised hand.|torch|book;flag;sword|symbols
A symbol is a picture or thing that stands for an ___.|idea|owner;lunch;address|symbols
A red eight-sided sign on a street corner tells drivers to ___.|stop|go fast;sing;honk|symbols
A national anthem is a ___ about a country.|song|map;game;rule|symbols
Which one is a United States symbol?|the bald eagle|a dragon;a unicorn;a kangaroo|symbols
The White House is where the President lives and ___.|works|swims;sleeps only;plays ball|symbols
Washington, D.C. is the ___ of the United States.|capital|farm;lake;island|symbols
Which is a need?|food|a video game;a toy;a candy bar|needswants
Which is a want?|a new toy|water;a home;food|needswants
Which is a need?|clean water|a bike;a puzzle;ice cream|needswants
Which is a want?|a game|a warm coat;water;a home|needswants
People need ___ to stay safe from the weather.|shelter|a game;candy;a phone|needswants
Food, water, clothes and a home are all ___.|needs|wants;toys;games|needswants
Things we would like to have but can live without are ___.|wants|needs;rules;laws|needswants
A need is something you must have to ___.|live and stay healthy|have fun;look cool;win a game|needswants||Think about food, water and a home. What do they let you do?
Which is a need on a freezing day?|a warm coat|a toy;a game;candy|needswants
Which is a want?|a toy robot|a bed;a coat;breakfast|needswants
Saving money means keeping some to use ___.|later|never;now only;yesterday|needswants
A community is a group of people who ___.|live, work or play in the same place|live far from everyone;never talk;are all one age|community
Where can you borrow books for free?|a library|a bank;a gas station;a bakery|community
A big place with many people and tall buildings is a ___.|city|farm;pond;hill|community
A town park is a place for everyone to ___.|share and enjoy|own;sell;hide|community
People in a community can help each other by ___.|working together|staying apart;being mean;never sharing|community
A mayor is the leader of a ___.|town or city|school;state;family|community
A principal is the leader of a ___.|school|town;state;country|community
Which is a way to be a good neighbor?|helping with a chore|making loud noise at night;tossing trash;ignoring them|community
What do we call the people who live near you?|neighbors|astronauts;kings;pilots|community
A fire station is where ___ work.|firefighters|doctors;teachers;bakers|community
A post office is where you can ___.|mail a letter|see a movie;borrow a book;buy food|community
A hospital is a place where ___.|sick people get care|people mail letters;books are kept;food is grown|community
A bus or a train helps people ___.|get from place to place|cook;sleep;paint|community
`);

BANK.civ.push(...discRows(2, `
The three branches of the United States government are legislative, executive and ___.|judicial|military;federal;political|branches
Congress makes the laws. It is part of the ___ branch.|legislative|executive;judicial;military|branches
The President leads the ___ branch.|executive|legislative;judicial;military|branches
Courts and judges are part of the ___ branch.|judicial|legislative;executive;military|branches
Which branch decides what laws mean and whether they were broken?|judicial|legislative;executive;military|branches
Which branch carries out and enforces the laws?|executive|legislative;judicial;state|branches
Congress has two parts, the Senate and the ___.|House of Representatives|Supreme Court;Cabinet;White House|branches
How many senators does each state have?|two|one;three;fifty|branches
The highest court in the United States is the ___.|Supreme Court|Senate;Cabinet;House|branches
Three branches keep any one group from having too much power. This idea is called ___.|checks and balances|majority rule;free trade;taxes|branches
A President can say no to a bill by using a ___.|veto|vote;verdict;visa|branches
A proposed law is called a ___.|bill|ballot;budget;bond|branches
The leader of a state government is a ___.|governor|mayor;senator;judge|branches
The leader of a city or town is a ___.|mayor|governor;senator;judge|branches
A government in which people choose their leaders by voting is a ___.|democracy|monarchy;empire;colony|branches
In a republic, the people choose ___ to make decisions for them.|representatives|kings;judges only;relatives|branches
Congress meets in the Capitol building in ___.|Washington, D.C.|New York City;Philadelphia;Boston|branches
The Constitution is the ___ of the United States.|supreme law of the land|oldest song;first map;flag|constitution
The first words of the Constitution are "We the ___."|People|Kings;States only;Judges|constitution
A change added to the Constitution is called an ___.|amendment|invention;election;island|constitution
The first ten amendments are called the ___.|Bill of Rights|Declaration;Pledge;Preamble|constitution
The Bill of Rights protects the rights of ___.|the people|only the President;only judges;only soldiers|constitution
The Constitution was written in the year ___.|1787|1492;1620;1865|constitution
The Declaration of Independence said the colonies were free from ___ rule.|British|French;Spanish;Mexican|constitution
The Declaration of Independence was adopted in ___.|1776|1492;1812;1865|constitution
The delegates met in ___ to write the Constitution.|Philadelphia|Boston;Washington, D.C.;New York|constitution
A constitution is a set of basic ___ for how a government works.|rules|songs;maps;prices|constitution
The Preamble is the ___ of the Constitution.|introduction|last part;list of states;signature page|constitution
The First Amendment protects freedom of speech, religion, the press, assembly and ___.|petition|travel;money;weather|constitution
Under the Constitution, every state also has ___.|its own state government|no laws;no governor;no courts|constitution
Power shared between the national government and the state governments is called ___.|federalism|monarchy;trade;taxes|constitution
The Constitution can be changed by ___.|adding an amendment|a coin toss;one person's order;nothing, it never changes|constitution
Which is a responsibility of a citizen?|obeying the laws|ignoring the laws;skipping every rule;breaking promises|rights
Which is a right of people in the United States?|freedom of speech|a free car;a day off every week;free candy|rights
Citizens aged 18 and over have the right to ___.|vote|drive a bus;be a judge;skip taxes|rights
Serving on a jury is a ___ of citizens.|duty|prize;game;hobby|rights
Paying taxes is a ___ of citizens.|responsibility|right to refuse;prize;choice|rights
Taxes pay for things like roads, schools and ___.|fire departments|video games;candy;vacations|rights
Which is a way to be a good citizen?|helping clean up a park|littering;ignoring neighbors;breaking rules|rights
A fair trial is a right of people ___ of a crime.|accused|bored;proud;young|rights
Freedom of religion means people may ___.|choose their own beliefs|be forced to follow one;hide their beliefs;not practice at all|rights
Which is NOT a right of every citizen?|a free car|freedom of speech;voting at 18;a fair trial|rights
Freedom of the press means newspapers can ___.|report the news without government control|print only what the government says;never print;sell nothing|rights
A citizen is a person who belongs to a ___.|country|club;band;team|rights
Rights come with ___.|responsibilities|nothing;gifts;holidays|rights
A student who returns a library book on time is showing ___.|responsibility|bravery;luck;speed|rights
Something you can touch and buy, like a shirt, is a ___.|good|service;tax;job|economy
Work done for you, like a haircut, is a ___.|service|good;product;tax|economy
Which one is a service?|a dentist cleaning teeth|a loaf of bread;a toy car;a jacket|economy
Which one is a good?|a bicycle|a haircut;a bus ride;a lesson|economy
A person who buys goods and services is a ___.|consumer|producer;banker;farmer|economy
A person or company that makes goods is a ___.|producer|consumer;customer;shopper|economy
Money earned from a job is called ___.|income|tax;debt;a loan|economy
Trading things without using money is called ___.|bartering|banking;taxing;voting|economy
Money that people pay to the government for public services is called ___.|taxes|wages;prices;profits|economy
A place where people keep their money safe is a ___.|bank|market;library;factory|economy
Spending less than you earn lets you ___.|save|owe;lose;trade|economy
Something that is hard to get and that many people want is said to be ___.|scarce|plentiful;free;cheap|economy
A budget is a plan for how to ___ money.|spend and save|lose;hide;print|economy
A factory line where each worker does one job is an example of ___.|division of labor|a budget;scarcity;bartering|economy
Supply is how much of something is ___.|for sale or available|wanted;taxed;wasted|supply
Demand is how much people ___ something.|want to buy|sell;make;hide|supply
Many people want a toy but there are few of them. The price usually ___.|goes up|goes down;stays zero;disappears|supply
A store has too many apples and few buyers. The price usually ___.|goes down|goes up;triples;stays high forever|supply
When demand goes up and supply stays the same, prices tend to ___.|rise|fall;vanish;stay free|supply
When supply goes up and demand stays the same, prices tend to ___.|fall|rise;double;never change|supply
A frost destroys many orange trees. The supply of oranges ___.|goes down|goes up;stays the same;doubles|supply
More people want umbrellas on a rainy day. The demand ___.|goes up|goes down;stays zero;is gone|supply
A price is the amount of money you pay for ___.|a good or service|a vote;a law;a river|supply
Competition between businesses often leads to ___.|lower prices and better goods|higher prices only;no choices;empty stores|supply
A market is any place where buyers and ___ meet.|sellers|judges;voters;firefighters|supply
Very few diamonds exist and many people want them. Their price is ___.|high|low;zero;always the same|supply
A shop has too many winter coats left in spring. It may ___ the price to sell them.|lower|raise;triple;hide|supply
Which would make the price of gas go up?|less gas being supplied|more gas being made;fewer drivers;a new gas well|supply
`, '5-6'));
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
   likes    [article, noun, plural, picture, only]  only 'pl' (grapes: only the plural exists) or 'sg' (milk) or ''
   sent     {1:[...],2:[...]}                   [sentence, classes, english]; classes per word: A article, D "mi", B noun that can be the subject,
                                                S pronoun, V verb, J adjective, P preposition, L place noun. The first word is capitalised and the
                                                last carries the dot, so the tiles have one right order (tools/test.js checks every permutation) */
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
  ['camisa','shirt','👕','la','camisas'],['chaqueta','jacket','🧥','la','chaquetas'],['bicicleta','bicycle','🚲','la','bicicletas'],
  ['escuela','school','🏫','la','escuelas'],['tienda','store','🏪','la','tiendas'],['playa','beach','🏖','la','playas'],
  ['abuela','grandma','👵','la','abuelas'],['hermana','sister','👧','la','hermanas'],['oreja','ear','👂','la','orejas'],['pierna','leg','🦵','la','piernas'],
  ['papel','paper','📄','el','papeles'],['lápiz','pencil','✏','el','lápices'],['borrador','eraser','🧽','el','borradores'],['tren','train','🚂','el','trenes'],
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
  ['el','perro','perros','🐶',''],['el','gato','gatos','🐱',''],['el','pájaro','pájaros','🐦',''],['el','pez','peces','🐟',''],
  ['la','vaca','vacas','🐄',''],['el','caballo','caballos','🐴',''],['el','cerdo','cerdos','🐷',''],['el','pato','patos','🦆',''],
  ['el','oso','osos','🐻',''],['el','conejo','conejos','🐰',''],['el','león','leones','🦁',''],['la','rana','ranas','🐸',''],
  ['las','uvas','uvas','🍇','pl']],
 sent:{
  1:[['El gato es negro.','A B V J','The cat is black.'],['La casa es blanca.','A B V J','The house is white.'],['El perro es grande.','A B V J','The dog is big.'],
     ['La mesa es pequeña.','A B V J','The table is small.'],['Los zapatos son rojos.','A B V J','The shoes are red.'],['Las botas son negras.','A B V J','The boots are black.'],
     ['La camisa es azul.','A B V J','The shirt is blue.'],['El libro es nuevo.','A B V J','The book is new.'],['Mi mamá es alta.','D B V J','My mom is tall.'],
     ['Mi perro es rápido.','D B V J','My dog is fast.'],['Ella es feliz.','S V J','She is happy.'],['Yo soy feliz.','S V J','I am happy.'],
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
/* ---------- Spanish unit data (P2-30, CURRICULUM S-frame) ----------
   ES_UNITS is the one place Spanish vocabulary lives. A unit is
     {id, t, e, theme, items:[...], cap?, spell?, l1?, mix?}
   id     skill id without the prefix: unit 'house' is skill 'es_house' (esReg makes the skill when 38-skills.js has none)
   t, e   skill title and emoji;  theme  what the words have in common (for authors and tests)
   cap    1: show the English under each picture (words whose picture alone is not enough, like greetings)
   spell  1: the unit has level 3 (hear it, spell it); the skill gets max 3; its words must be single a-z/ñáéíóúü words of 12 letters or fewer
   l1     N: level 1 draws only from the first N items (level 2 uses them all), for units whose later items are the harder ones (big numbers, time)
   mix    1: the unit is drawn into the es_mix "Big Review" (the first 8 units are; later units are not unless a chunk says so)
   An item is [spanish, english, picture, article, art, say]
   spanish  the bare word, NFC, lowercase (la casa -> 'casa'); level 3 asks for exactly this
   english  the gloss
   picture  emoji from tools/emoji-allow.txt, or 'c:#rrggbb' (colour swatch), 'n:12' (numeral), or 'k:3:30' (analogue clock showing 3:30)
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
 {id:'house',t:'House',e:'🏠',theme:'The house',spell:1,items:[
  ['casa','house','🏠','la'],
  ['puerta','door','🚪','la'],
  ['ventana','window','🪟','la'],
  ['mesa','table','🍽','la'],
  ['silla','chair','🪑','la'],
  ['cama','bed','🛏','la','bed'],
  ['cocina','kitchen','🍳','la'],
  ['baño','bathroom','🛁','el'],
  ['jardín','garden','🌻','el'],
  ['lámpara','lamp','💡','la'],
  ['sala','living room','🛋','la']]},
 {id:'clothes',t:'Clothes',e:'👕',theme:'Clothes',spell:1,items:[
  ['camisa','shirt','👕','la'],
  ['pantalones','pants','👖','los'],
  ['vestido','dress','👗','el'],
  ['zapatos','shoes','👟','los'],
  ['sombrero','hat','🎩','el','hat'],
  ['chaqueta','jacket','🧥','la'],
  ['calcetines','socks','🧦','los'],
  ['gorra','cap','🧢','la'],
  ['botas','boots','👢','las'],
  ['corbata','tie','👔','la']]},
 {id:'school',t:'School',e:'🎒',theme:'School',spell:1,items:[
  ['libro','book','📖','el'],
  ['lápiz','pencil','✏','el'],
  ['mochila','backpack','🎒','la'],
  ['papel','paper','📄','el'],
  ['maestra','teacher (woman)','👩','la'],
  ['maestro','teacher (man)','👨','el'],
  ['escuela','school','🏫','la'],
  ['clase','class','🔔','la'],
  ['tijeras','scissors','✂','las'],
  ['borrador','eraser','🧽','el']]},
 {id:'feel',t:'Feelings',e:'😊',theme:'Feelings',items:[
  ['feliz','happy','😊',''],
  ['triste','sad','😢',''],
  ['enojado','angry','😠',''],
  ['cansado','tired','😴',''],
  ['asustado','scared','😨',''],
  ['enfermo','sick','🤒',''],
  ['emocionado','excited','🥳',''],
  ['tranquilo','calm','😌',''],
  ['sorprendido','surprised','😮','']]},
 {id:'days',t:'Days of the Week',e:'📅',theme:'Days of the week, today, tomorrow, yesterday',cap:1,items:[
  ['lunes','Monday','📅','el'],
  ['martes','Tuesday','📅','el'],
  ['miércoles','Wednesday','📅','el'],
  ['jueves','Thursday','📅','el'],
  ['viernes','Friday','📅','el'],
  ['sábado','Saturday','📅','el'],
  ['domingo','Sunday','📅','el'],
  ['hoy','today','📌',''],
  ['mañana','tomorrow','🌅',''],
  ['ayer','yesterday','◀','']]},
 {id:'months',t:'Months & Seasons',e:'📆',theme:'Months and seasons',cap:1,items:[
  ['enero','January','📆',''],
  ['febrero','February','📆',''],
  ['marzo','March','📆',''],
  ['abril','April','📆',''],
  ['mayo','May','📆',''],
  ['junio','June','📆',''],
  ['julio','July','📆',''],
  ['agosto','August','📆',''],
  ['septiembre','September','📆',''],
  ['octubre','October','📆',''],
  ['noviembre','November','📆',''],
  ['diciembre','December','📆',''],
  ['primavera','spring','🌸','la'],
  ['verano','summer','🏖','el'],
  ['otoño','fall','🍂','el'],
  ['invierno','winter','⛄','el']]},
 {id:'weather',t:'Weather',e:'☀',theme:'Weather',items:[
  ['hace sol','it is sunny','☀',''],
  ['hace calor','it is hot','🥵',''],
  ['hace frío','it is cold','🥶',''],
  ['hace viento','it is windy','💨',''],
  ['llueve','it is raining','☔',''],
  ['nieva','it is snowing','❄',''],
  ['está nublado','it is cloudy','☁',''],
  ['hace fresco','it is cool','🍃',''],
  ['hay tormenta','there is a storm','⚡',''],
  ['arco iris','rainbow','🌈','el']]},
 {id:'big',t:'Numbers to 100',e:'💯',theme:'Tens to 100, then any number 21 to 99',l1:8,items:[
  ['treinta','thirty','n:30',''],
  ['cuarenta','forty','n:40',''],
  ['cincuenta','fifty','n:50',''],
  ['sesenta','sixty','n:60',''],
  ['setenta','seventy','n:70',''],
  ['ochenta','eighty','n:80',''],
  ['noventa','ninety','n:90',''],
  ['cien','one hundred','n:100',''],
  ['veintiuno','twenty-one','n:21',''],
  ['veintitrés','twenty-three','n:23',''],
  ['veintisiete','twenty-seven','n:27',''],
  ['treinta y cinco','thirty-five','n:35',''],
  ['cuarenta y dos','forty-two','n:42',''],
  ['cincuenta y ocho','fifty-eight','n:58',''],
  ['sesenta y uno','sixty-one','n:61',''],
  ['setenta y cuatro','seventy-four','n:74',''],
  ['ochenta y nueve','eighty-nine','n:89',''],
  ['noventa y nueve','ninety-nine','n:99','']]},
 {id:'time',t:'Telling Time',e:'⏰',theme:'The time on the hour, half past and quarter past',l1:12,items:[
  ['es la una','1:00','k:1:00',''],
  ['son las dos','2:00','k:2:00',''],
  ['son las tres','3:00','k:3:00',''],
  ['son las cuatro','4:00','k:4:00',''],
  ['son las cinco','5:00','k:5:00',''],
  ['son las seis','6:00','k:6:00',''],
  ['son las siete','7:00','k:7:00',''],
  ['son las ocho','8:00','k:8:00',''],
  ['son las nueve','9:00','k:9:00',''],
  ['son las diez','10:00','k:10:00',''],
  ['son las once','11:00','k:11:00',''],
  ['son las doce','12:00','k:12:00',''],
  ['es la una y media','1:30','k:1:30',''],
  ['son las tres y media','3:30','k:3:30',''],
  ['son las seis y media','6:30','k:6:30',''],
  ['son las ocho y media','8:30','k:8:30',''],
  ['son las dos y cuarto','2:15','k:2:15',''],
  ['son las cuatro y cuarto','4:15','k:4:15',''],
  ['son las siete y cuarto','7:15','k:7:15',''],
  ['son las diez y cuarto','10:15','k:10:15','']]},
 {id:'place',t:'Places in Town',e:'🏙',theme:'Places in town',cap:1,items:[
  ['parque','park','🌳','el'],
  ['tienda','store','🏪','la'],
  ['biblioteca','library','📚','la'],
  ['hospital','hospital','🏥','el'],
  ['playa','beach','🏖','la'],
  ['restaurante','restaurant','🍽','el'],
  ['iglesia','church','⛪','la'],
  ['mercado','market','🥕','el'],
  ['calle','street','🛣','la'],
  ['banco','bank','🏦','el'],
  ['cine','movie theater','🎬','el']]},
 {id:'trans',t:'Transport',e:'🚌',theme:'Ways to travel',items:[
  ['carro','car','🚗','el'],
  ['autobús','bus','🚌','el'],
  ['tren','train','🚂','el'],
  ['avión','airplane','✈','el'],
  ['bicicleta','bicycle','🚲','la'],
  ['barco','ship','🚢','el'],
  ['camión','truck','🚚','el'],
  ['moto','motorcycle','🏍','la'],
  ['helicóptero','helicopter','🚁','el'],
  ['cohete','rocket','🚀','el']]},
 {id:'verb',t:'Action Words',e:'🏃',theme:'Action verbs (infinitives)',cap:1,items:[
  ['correr','to run','🏃',''],
  ['saltar','to jump','🦘',''],
  ['comer','to eat','🍕',''],
  ['beber','to drink','🥤',''],
  ['dormir','to sleep','🛌',''],
  ['leer','to read','📖',''],
  ['escribir','to write','✏',''],
  ['jugar','to play','🎮',''],
  ['cantar','to sing','🎤',''],
  ['bailar','to dance','💃',''],
  ['nadar','to swim','🏊',''],
  ['caminar','to walk','🚶','']]},
 {id:'adj',t:'Opposites',e:'🐘',theme:'Adjectives, masculine singular, as opposite pairs',cap:1,items:[
  ['grande','big','🐘',''],
  ['pequeño','small','🐜',''],
  ['alto','tall','🦒',''],
  ['bajo','short','⬇',''],
  ['rápido','fast','🏎',''],
  ['lento','slow','🐢',''],
  ['nuevo','new','🆕',''],
  ['viejo','old','👴',''],
  ['caliente','hot','🔥',''],
  ['frío','cold','🧊',''],
  ['bonito','pretty','🌸',''],
  ['limpio','clean','🧼',''],
  ['sucio','dirty','🗑','']]},
];
const SPN={};ES_UNITS.forEach(u=>{SPN[u.id]=u.items}); // old name: unit id -> items (balloons, speed race, learn screen)
ES_UNITS.forEach(esReg);
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
/* Memory Match words (P3-14, BRAIN_TEASERS 5.9). Data only; read by src/js/82-bt-memory.js inside functions (A11).
   themes: picture names (emoji fallback in RIDDLES.pics, src/data/d-riddles.js) for band A picture-picture and band B word-picture.
   syn: band C synonym pairs; no word is a synonym of a word in another pair, so every card has exactly one partner.
   roots: band D word roots and their meaning; no two meanings overlap (hear / sound, write / draw were left out for that).
   Band C Spanish-English pairs come from SPN (src/js/34-gen-es.js); fractions, decimals, percents, numbers and dots are made in code. */
var MEMW = {
  themes: {
    animals: ['cat', 'dog', 'pig', 'duck', 'frog', 'fish', 'hen', 'cow', 'owl', 'bee', 'snail', 'turtle', 'mouse', 'elephant',
      'giraffe', 'penguin', 'octopus', 'ant'],
    food: ['apple', 'banana', 'cookie', 'cake', 'milk', 'cheese', 'grapes', 'egg', 'bread', 'pizza', 'watermelon', 'icecream'],
    toys: ['ball', 'drum', 'kite', 'teddy', 'robot', 'gift', 'hat', 'cup', 'bed', 'book', 'bell', 'crown', 'dice'],
    go: ['car', 'bus', 'bike', 'ship', 'rocket', 'plane', 'tractor', 'helicopter', 'fire-engine'],
    sky: ['sun', 'moon', 'star', 'cloud', 'rainbow', 'tree', 'flower', 'snowman', 'web', 'shell'],
  },
  syn: [['big', 'large'], ['small', 'tiny'], ['happy', 'glad'], ['sad', 'unhappy'], ['fast', 'quick'], ['start', 'begin'],
    ['end', 'finish'], ['shut', 'close'], ['smart', 'clever'], ['angry', 'mad'], ['loud', 'noisy'], ['jump', 'leap'],
    ['shout', 'yell'], ['rock', 'stone'], ['gift', 'present'], ['easy', 'simple'], ['sick', 'ill'], ['cold', 'chilly'],
    ['talk', 'speak'], ['wet', 'damp']],
  roots: [['bio', 'life'], ['geo', 'earth'], ['tele', 'far'], ['micro', 'small'], ['phon', 'sound'], ['graph', 'write'],
    ['aqua', 'water'], ['astro', 'star'], ['chron', 'time'], ['port', 'carry'], ['therm', 'heat'], ['photo', 'light'],
    ['auto', 'self'], ['dent', 'tooth'], ['spect', 'look'], ['tri', 'three'], ['cent', 'hundred'], ['multi', 'many'],
    ['mono', 'one'], ['rupt', 'break'], ['struct', 'build'], ['cycl', 'circle'], ['manu', 'hand']],
};
/* Logic grid banks (P3-06, BRAIN_TEASERS 5.3). GENERATED by `node tools/puzzles/build-banks.js logic` from seed 'star-school-logic-1':
   do not edit by hand; change the generator (tools/puzzles/logic.js) and rerun it. Same seed, same file, byte for byte.
   PUZ.logic[band] = [36 puzzles]: B 3 children x 1 picture category, C 3 x 2 categories, D 4 x 2 (the second ordered),
   sorted by score, so level L (1-12) is entries 3(L-1) to 3L-1. A puzzle is [head, clue, clue, ...]:
   head = 'names|cat=item,item,...[;cat=...]|solution|grade|score'; solution = per category (joined by ;) the item index of
   each child in name order. An entity is (category, item): category 0 = the children (item = name index), 1.. = head order.
   Clues (the sentence is last; the first entity is its subject):
     ['is', c1, i1, c2, i2, text]   same child            ['not', c1, i1, c2, i2, text]  different children
     ['or', c, i, d, j1, j2, text]  (c,i) has item j1 or j2 of category d
     ['gt' | 'lt' | 'nx', c1, i1, c2, i2, text]  in the ordered category, (c1,i1)'s item index is bigger / smaller /
     one apart (race places: a smaller index finished ahead).
   grade = hardest technique of the grader in tools/puzzles/logic.js (1 clue mark, 2 only place left, 3 link, 4 two-way
   clue, 5 chain); score = grade x 100 + effort. Every puzzle has exactly one solution and no clue can be left out
   (tools/test.js proves both with its own counter). cats[id] = {label, ordered, pics: {item: emoji fallback for
   picFor(item, emoji)}}. PUZ is shared by all puzzle banks. */
var PUZ = PUZ || {};
PUZ.logic = {
  cats: {
    pet: {label: 'Pet', pics: {cat: '🐱', dog: '🐶', fish: '🐟', rabbit: '🐰', bird: '🐦', frog: '🐸', turtle: '🐢', mouse: '🐭'}},
    snack: {label: 'Snack', pics: {apple: '🍎', banana: '🍌', grapes: '🍇', cheese: '🧀', cookie: '🍪', cupcake: '🧁', pizza: '🍕', watermelon: '🍉'}},
    sport: {label: 'Sport', pics: {soccer: '⚽', tennis: '🎾', basketball: '🏀', swim: '🏊', skate: '⛸️'}},
    hobby: {label: 'Hobby', pics: {paint: '🎨', read: '📖', draw: '✏️', puzzle: '🧩'}},
    music: {label: 'Music', pics: {drum: '🥁', guitar: '🎸', trumpet: '🎺'}},
    ride: {label: 'Ride', pics: {bike: '🚲', bus: '🚌', train: '🚂', boat: '⛵', tractor: '🚜'}},
    colour: {label: 'Colour'},
    age: {label: 'Age', ordered: 1},
    house: {label: 'House', ordered: 1},
    race: {label: 'Race', ordered: 1},
  },
  B: [
    ['Ella,Ben,Tom|hobby=paint,draw,puzzle|201|2|204',
      ['is', 0, 1, 1, 0, 'Ben paints.'],
      ['is', 0, 0, 1, 2, 'Ella does puzzles.'],
    ],
    ['Finn,Kim,Ana|ride=bus,boat,tractor|102|2|204',
      ['is', 0, 2, 1, 2, 'Ana rides the tractor.'],
      ['is', 0, 1, 1, 0, 'Kim rides the bus.'],
    ],
    ['Finn,Omar,Ada|sport=tennis,basketball,swim|102|2|204',
      ['is', 0, 1, 1, 0, 'Omar plays tennis.'],
      ['is', 0, 2, 1, 2, 'Ada swims.'],
    ],
    ['Tom,Ivan,Noah|snack=grapes,cheese,cupcake|021|2|204',
      ['is', 0, 0, 1, 0, 'Tom eats the grapes.'],
      ['is', 0, 1, 1, 2, 'Ivan eats the cupcake.'],
    ],
    ['Yuki,Hugo,Jun|music=drum,guitar,trumpet|210|2|204',
      ['is', 0, 1, 1, 1, 'Hugo plays the guitar.'],
      ['is', 0, 2, 1, 0, 'Jun plays the drum.'],
    ],
    ['Ada,Kai,Tara|pet=fish,turtle,mouse|120|2|206',
      ['is', 0, 2, 1, 0, 'Tara has the fish.'],
      ['not', 0, 0, 1, 2, 'Ada does not have the mouse.'],
    ],
    ['Ana,Luca,Kai|ride=bike,bus,tractor|012|2|206',
      ['is', 0, 1, 1, 1, 'Luca rides the bus.'],
      ['not', 0, 2, 1, 0, 'Kai does not ride the bike.'],
    ],
    ['Ava,Finn,Dev|hobby=paint,read,puzzle|021|2|206',
      ['is', 0, 0, 1, 0, 'Ava paints.'],
      ['not', 0, 2, 1, 2, 'Dev does not do puzzles.'],
    ],
    ['Eli,Dev,Finn|snack=grapes,cookie,pizza|012|2|206',
      ['not', 0, 0, 1, 2, 'Eli does not eat the pizza.'],
      ['is', 0, 1, 1, 1, 'Dev eats the cookie.'],
    ],
    ['Eli,Jun,Leo|snack=cheese,cupcake,pizza|210|2|206',
      ['is', 0, 0, 1, 2, 'Eli eats the pizza.'],
      ['not', 0, 2, 1, 1, 'Leo does not eat the cupcake.'],
    ],
    ['Eli,Omar,Raj|pet=fish,bird,mouse|021|2|206',
      ['not', 0, 2, 1, 2, 'Raj does not have the mouse.'],
      ['is', 0, 0, 1, 0, 'Eli has the fish.'],
    ],
    ['Ella,Raj,Dev|ride=bus,boat,tractor|102|2|206',
      ['not', 0, 2, 1, 0, 'Dev does not ride the bus.'],
      ['is', 0, 0, 1, 1, 'Ella rides the boat.'],
    ],
    ['Hugo,Ravi,Mia|sport=tennis,basketball,skate|210|2|206',
      ['is', 0, 1, 1, 1, 'Ravi plays basketball.'],
      ['not', 0, 0, 1, 0, 'Hugo does not play tennis.'],
    ],
    ['Jun,Eli,Kim|hobby=paint,draw,puzzle|021|2|206',
      ['not', 0, 0, 1, 2, 'Jun does not do puzzles.'],
      ['is', 0, 2, 1, 1, 'Kim draws.'],
    ],
    ['Leo,Theo,Ravi|pet=dog,bird,mouse|201|2|206',
      ['is', 0, 1, 1, 0, 'Theo has the dog.'],
      ['not', 0, 2, 1, 2, 'Ravi does not have the mouse.'],
    ],
    ['Max,Zoe,Owen|sport=tennis,swim,skate|012|2|206',
      ['is', 0, 2, 1, 2, 'Owen skates.'],
      ['not', 0, 1, 1, 0, 'Zoe does not play tennis.'],
    ],
    ['Maya,Kim,Ana|pet=cat,rabbit,turtle|012|2|206',
      ['is', 0, 2, 1, 2, 'Ana has the turtle.'],
      ['not', 0, 0, 1, 1, 'Maya does not have the rabbit.'],
    ],
    ['Maya,Kim,Zoe|sport=soccer,basketball,skate|021|2|206',
      ['is', 0, 0, 1, 0, 'Maya plays soccer.'],
      ['not', 0, 1, 1, 1, 'Kim does not play basketball.'],
    ],
    ['Noah,Zoe,Kai|snack=banana,grapes,cupcake|012|2|206',
      ['is', 0, 2, 1, 2, 'Kai eats the cupcake.'],
      ['not', 0, 1, 1, 0, 'Zoe does not eat the banana.'],
    ],
    ['Theo,Owen,Ella|music=drum,guitar,trumpet|201|2|206',
      ['not', 0, 1, 1, 2, 'Owen does not play the trumpet.'],
      ['is', 0, 2, 1, 1, 'Ella plays the guitar.'],
    ],
    ['Tom,Maya,Ella|snack=apple,grapes,pizza|201|2|206',
      ['not', 0, 0, 1, 1, 'Tom does not eat the grapes.'],
      ['is', 0, 1, 1, 0, 'Maya eats the apple.'],
    ],
    ['Zara,Finn,Max|sport=soccer,tennis,swim|201|2|206',
      ['is', 0, 2, 1, 1, 'Max plays tennis.'],
      ['not', 0, 1, 1, 2, 'Finn does not swim.'],
    ],
    ['Ada,Zoe,Mia|snack=banana,pizza,watermelon|012|2|209',
      ['not', 0, 0, 1, 1, 'Ada does not eat the pizza.'],
      ['not', 0, 2, 1, 1, 'Mia does not eat the pizza.'],
      ['not', 0, 0, 1, 2, 'Ada does not eat the watermelon.'],
    ],
    ['Ava,Eli,Yuki|hobby=paint,read,puzzle|012|2|209',
      ['not', 0, 2, 1, 0, 'Yuki does not paint.'],
      ['not', 0, 2, 1, 1, 'Yuki does not read.'],
      ['not', 0, 1, 1, 0, 'Eli does not paint.'],
    ],
    ['Ben,Eli,Theo|snack=apple,banana,cookie|201|2|209',
      ['not', 0, 0, 1, 1, 'Ben does not eat the banana.'],
      ['not', 0, 1, 1, 1, 'Eli does not eat the banana.'],
      ['not', 0, 0, 1, 0, 'Ben does not eat the apple.'],
    ],
    ['Eli,Tara,Max|snack=cheese,cookie,cupcake|021|2|209',
      ['not', 0, 0, 1, 2, 'Eli does not eat the cupcake.'],
      ['not', 0, 0, 1, 1, 'Eli does not eat the cookie.'],
      ['not', 0, 2, 1, 2, 'Max does not eat the cupcake.'],
    ],
    ['Ella,Nora,Kim|ride=bike,bus,boat|012|2|209',
      ['not', 0, 0, 1, 1, 'Ella does not ride the bus.'],
      ['not', 0, 0, 1, 2, 'Ella does not ride the boat.'],
      ['not', 0, 2, 1, 1, 'Kim does not ride the bus.'],
    ],
    ['Ivan,Ben,Hugo|snack=banana,grapes,pizza|201|2|209',
      ['not', 0, 1, 1, 1, 'Ben does not eat the grapes.'],
      ['not', 0, 2, 1, 2, 'Hugo does not eat the pizza.'],
      ['not', 0, 1, 1, 2, 'Ben does not eat the pizza.'],
    ],
    ['Luca,Ella,Tom|hobby=paint,read,draw|201|2|209',
      ['not', 0, 2, 1, 0, 'Tom does not paint.'],
      ['not', 0, 2, 1, 2, 'Tom does not draw.'],
      ['not', 0, 0, 1, 0, 'Luca does not paint.'],
    ],
    ['Max,Luca,Tom|snack=banana,cheese,cupcake|210|2|209',
      ['not', 0, 1, 1, 2, 'Luca does not eat the cupcake.'],
      ['not', 0, 1, 1, 0, 'Luca does not eat the banana.'],
      ['not', 0, 0, 1, 0, 'Max does not eat the banana.'],
    ],
    ['Max,Zoe,Tara|sport=soccer,tennis,basketball|012|2|209',
      ['not', 0, 0, 1, 1, 'Max does not play tennis.'],
      ['not', 0, 0, 1, 2, 'Max does not play basketball.'],
      ['not', 0, 1, 1, 2, 'Zoe does not play basketball.'],
    ],
    ['Maya,Luca,Ben|snack=grapes,cookie,cupcake|201|2|209',
      ['not', 0, 1, 1, 2, 'Luca does not eat the cupcake.'],
      ['not', 0, 1, 1, 1, 'Luca does not eat the cookie.'],
      ['not', 0, 2, 1, 2, 'Ben does not eat the cupcake.'],
    ],
    ['Nia,Theo,Ada|music=drum,guitar,trumpet|021|2|209',
      ['not', 0, 0, 1, 2, 'Nia does not play the trumpet.'],
      ['not', 0, 2, 1, 2, 'Ada does not play the trumpet.'],
      ['not', 0, 2, 1, 0, 'Ada does not play the drum.'],
    ],
    ['Raj,Dev,Omar|snack=grapes,cupcake,watermelon|102|2|209',
      ['not', 0, 0, 1, 2, 'Raj does not eat the watermelon.'],
      ['not', 0, 0, 1, 0, 'Raj does not eat the grapes.'],
      ['not', 0, 1, 1, 2, 'Dev does not eat the watermelon.'],
    ],
    ['Sam,Tara,Leo|ride=bike,train,boat|012|2|209',
      ['not', 0, 2, 1, 0, 'Leo does not ride the bike.'],
      ['not', 0, 1, 1, 2, 'Tara does not ride the boat.'],
      ['not', 0, 1, 1, 0, 'Tara does not ride the bike.'],
    ],
    ['Zoe,Ivan,Dev|sport=soccer,swim,skate|021|2|209',
      ['not', 0, 0, 1, 1, 'Zoe does not swim.'],
      ['not', 0, 1, 1, 1, 'Ivan does not swim.'],
      ['not', 0, 1, 1, 0, 'Ivan does not play soccer.'],
    ],
  ],
  C: [
    ['Finn,Ravi,Nia|hobby=read,draw,puzzle;colour=yellow,purple,orange|102;012|3|316',
      ['is', 0, 2, 1, 2, 'Nia does puzzles.'],
      ['is', 1, 1, 2, 0, 'The child who draws likes yellow.'],
      ['is', 2, 2, 1, 2, 'The child who likes orange does puzzles.'],
      ['is', 0, 0, 1, 1, 'Finn draws.'],
    ],
    ['Ella,Kim,Yuki|sport=soccer,basketball,skate;ride=bike,bus,train|021;012|3|318',
      ['is', 0, 0, 1, 0, 'Ella plays soccer.'],
      ['not', 1, 2, 2, 0, 'The child who skates does not ride the bike.'],
      ['is', 0, 2, 2, 2, 'Yuki rides the train.'],
      ['is', 2, 2, 1, 1, 'The child who rides the train plays basketball.'],
    ],
    ['Kai,Hugo,Amir|hobby=read,draw,puzzle;colour=red,green,orange|102;201|3|318',
      ['is', 0, 1, 1, 0, 'Hugo reads.'],
      ['is', 0, 2, 1, 2, 'Amir does puzzles.'],
      ['is', 2, 0, 1, 0, 'The child who likes red reads.'],
      ['not', 2, 1, 1, 1, 'The child who likes green does not draw.'],
    ],
    ['Leo,Ava,Ivan|hobby=paint,draw,puzzle;snack=apple,cupcake,pizza|210;201|3|318',
      ['is', 0, 0, 1, 2, 'Leo does puzzles.'],
      ['is', 1, 1, 2, 0, 'The child who draws eats the apple.'],
      ['is', 0, 1, 2, 0, 'Ava eats the apple.'],
      ['not', 1, 2, 2, 1, 'The child who does puzzles does not eat the cupcake.'],
    ],
    ['Zara,Max,Ada|snack=grapes,cupcake,pizza;ride=bike,bus,boat|102;012|3|318',
      ['is', 0, 0, 2, 0, 'Zara rides the bike.'],
      ['not', 0, 2, 1, 0, 'Ada does not eat the grapes.'],
      ['is', 2, 0, 1, 1, 'The child who rides the bike eats the cupcake.'],
      ['is', 1, 2, 2, 2, 'The child who eats the pizza rides the boat.'],
    ],
    ['Ana,Mia,Yuki|pet=cat,rabbit,bird;ride=bike,train,boat|210;120|3|320',
      ['not', 0, 2, 2, 2, 'Yuki does not ride the boat.'],
      ['is', 0, 0, 2, 1, 'Ana rides the train.'],
      ['is', 1, 2, 2, 1, 'The bird\'s owner rides the train.'],
      ['not', 0, 2, 1, 1, 'Yuki does not have the rabbit.'],
    ],
    ['Eli,Maya,Kai|sport=basketball,swim,skate;snack=cheese,cookie,watermelon|210;012|3|320',
      ['not', 0, 0, 2, 2, 'Eli does not eat the watermelon.'],
      ['is', 0, 1, 2, 1, 'Maya eats the cookie.'],
      ['is', 1, 2, 2, 0, 'The child who skates eats the cheese.'],
      ['not', 0, 2, 1, 1, 'Kai does not swim.'],
    ],
    ['Ella,Sam,Amir|colour=blue,green,orange;music=drum,guitar,trumpet|201;102|3|320',
      ['not', 0, 2, 1, 2, 'Amir does not like orange.'],
      ['not', 1, 2, 2, 2, 'The child who likes orange does not play the trumpet.'],
      ['is', 1, 0, 2, 0, 'The child who likes blue plays the drum.'],
      ['is', 0, 1, 2, 0, 'Sam plays the drum.'],
    ],
    ['Jun,Mia,Luca|snack=cheese,pizza,watermelon;music=drum,guitar,trumpet|012;021|3|320',
      ['not', 0, 2, 1, 1, 'Luca does not eat the pizza.'],
      ['is', 2, 1, 1, 2, 'The child who plays the guitar eats the watermelon.'],
      ['not', 2, 2, 1, 0, 'The child who plays the trumpet does not eat the cheese.'],
      ['is', 0, 0, 2, 0, 'Jun plays the drum.'],
    ],
    ['Kim,Eli,Sam|music=drum,guitar,trumpet;ride=bike,bus,boat|201;012|3|320',
      ['not', 0, 0, 2, 1, 'Kim does not ride the bus.'],
      ['is', 0, 2, 1, 1, 'Sam plays the guitar.'],
      ['is', 1, 0, 2, 1, 'The child who plays the drum rides the bus.'],
      ['not', 2, 0, 1, 1, 'The child who rides the bike does not play the guitar.'],
    ],
    ['Noah,Kim,Ava|pet=rabbit,frog,turtle;music=drum,guitar,trumpet|120;201|3|320',
      ['not', 1, 2, 2, 2, 'The turtle\'s owner does not play the trumpet.'],
      ['not', 0, 1, 2, 2, 'Kim does not play the trumpet.'],
      ['is', 2, 1, 1, 0, 'The child who plays the guitar has the rabbit.'],
      ['is', 0, 2, 2, 1, 'Ava plays the guitar.'],
    ],
    ['Nora,Kim,Luca|music=drum,guitar,trumpet;snack=cookie,pizza,watermelon|021;201|3|320',
      ['not', 0, 0, 1, 1, 'Nora does not play the guitar.'],
      ['is', 0, 1, 2, 0, 'Kim eats the cookie.'],
      ['is', 1, 2, 2, 0, 'The child who plays the trumpet eats the cookie.'],
      ['is', 0, 2, 2, 1, 'Luca eats the pizza.'],
    ],
    ['Zara,Noah,Lena|hobby=read,draw,puzzle;ride=bike,boat,tractor|102;120|3|320',
      ['not', 0, 1, 2, 0, 'Noah does not ride the bike.'],
      ['is', 1, 2, 2, 0, 'The child who does puzzles rides the bike.'],
      ['not', 2, 2, 1, 1, 'The child who rides the tractor does not draw.'],
      ['is', 0, 0, 1, 1, 'Zara draws.'],
    ],
    ['Zoe,Hugo,Omar|ride=bike,bus,train;hobby=paint,read,puzzle|120;021|3|320',
      ['is', 0, 2, 1, 0, 'Omar rides the bike.'],
      ['not', 1, 1, 2, 1, 'The child who rides the bus does not read.'],
      ['is', 2, 2, 1, 2, 'The child who does puzzles rides the train.'],
      ['not', 0, 0, 1, 2, 'Zoe does not ride the train.'],
    ],
    ['Ben,Tara,Ada|music=drum,guitar,trumpet;pet=cat,fish,frog|120;102|3|322',
      ['is', 0, 2, 1, 0, 'Ada plays the drum.'],
      ['not', 0, 1, 1, 1, 'Tara does not play the guitar.'],
      ['is', 2, 2, 1, 0, 'The frog\'s owner plays the drum.'],
      ['not', 0, 0, 2, 0, 'Ben does not have the cat.'],
    ],
    ['Lena,Ben,Maya|hobby=paint,read,draw;music=drum,guitar,trumpet|201;201|3|322',
      ['is', 1, 1, 2, 1, 'The child who reads plays the guitar.'],
      ['not', 0, 1, 1, 1, 'Ben does not read.'],
      ['not', 0, 0, 1, 0, 'Lena does not paint.'],
      ['is', 0, 0, 2, 2, 'Lena plays the trumpet.'],
    ],
    ['Nia,Tara,Lena|ride=train,boat,tractor;colour=blue,green,purple|102;120|3|322',
      ['is', 0, 1, 1, 0, 'Tara rides the train.'],
      ['not', 0, 2, 2, 1, 'Lena does not like green.'],
      ['is', 1, 2, 2, 0, 'The child who rides the tractor likes blue.'],
      ['not', 0, 1, 2, 1, 'Tara does not like green.'],
    ],
    ['Nora,Kai,Eli|snack=banana,grapes,cookie;pet=cat,turtle,mouse|210;021|3|322',
      ['not', 2, 1, 1, 2, 'The turtle\'s owner does not eat the cookie.'],
      ['is', 0, 1, 2, 2, 'Kai has the mouse.'],
      ['not', 0, 2, 1, 1, 'Eli does not eat the grapes.'],
      ['is', 0, 0, 1, 2, 'Nora eats the cookie.'],
    ],
    ['Tara,Mia,Zoe|music=drum,guitar,trumpet;pet=dog,fish,mouse|201;120|3|322',
      ['not', 1, 1, 2, 2, 'The child who plays the guitar does not have the mouse.'],
      ['is', 0, 0, 2, 1, 'Tara has the fish.'],
      ['not', 1, 1, 2, 1, 'The child who plays the guitar does not have the fish.'],
      ['is', 0, 1, 1, 0, 'Mia plays the drum.'],
    ],
    ['Ana,Nora,Eli|music=drum,guitar,trumpet;colour=green,yellow,orange|102;210|3|323',
      ['not', 0, 0, 1, 0, 'Ana does not play the drum.'],
      ['not', 2, 1, 1, 2, 'The child who likes yellow does not play the trumpet.'],
      ['not', 2, 2, 1, 2, 'The child who likes orange does not play the trumpet.'],
      ['is', 0, 2, 2, 0, 'Eli likes green.'],
      ['not', 2, 2, 1, 0, 'The child who likes orange does not play the drum.'],
    ],
    ['Dev,Jun,Yuki|sport=soccer,basketball,skate;snack=apple,banana,pizza|012;102|3|323',
      ['is', 0, 1, 2, 0, 'Jun eats the apple.'],
      ['not', 1, 2, 2, 0, 'The child who skates does not eat the apple.'],
      ['not', 1, 0, 2, 0, 'The child who plays soccer does not eat the apple.'],
      ['not', 0, 0, 1, 2, 'Dev does not skate.'],
      ['is', 0, 2, 2, 2, 'Yuki eats the pizza.'],
    ],
    ['Luca,Max,Zoe|pet=dog,fish,turtle;ride=bike,boat,tractor|021;012|3|323',
      ['not', 0, 0, 1, 1, 'Luca does not have the fish.'],
      ['not', 0, 0, 2, 1, 'Luca does not ride the boat.'],
      ['not', 0, 2, 2, 1, 'Zoe does not ride the boat.'],
      ['is', 1, 0, 2, 0, 'The dog\'s owner rides the bike.'],
      ['not', 2, 2, 1, 2, 'The child who rides the tractor does not have the turtle.'],
    ],
    ['Max,Zara,Ava|pet=cat,dog,mouse;ride=bus,boat,tractor|120;021|3|323',
      ['not', 1, 1, 2, 1, 'The dog\'s owner does not ride the boat.'],
      ['not', 0, 1, 1, 0, 'Zara does not have the cat.'],
      ['not', 0, 1, 2, 0, 'Zara does not ride the bus.'],
      ['is', 1, 2, 2, 2, 'The mouse\'s owner rides the tractor.'],
      ['not', 0, 2, 2, 0, 'Ava does not ride the bus.'],
    ],
    ['Mia,Finn,Kai|snack=grapes,pizza,watermelon;music=drum,guitar,trumpet|021;021|3|323',
      ['not', 2, 0, 1, 2, 'The child who plays the drum does not eat the watermelon.'],
      ['not', 0, 0, 2, 1, 'Mia does not play the guitar.'],
      ['is', 1, 1, 2, 1, 'The child who eats the pizza plays the guitar.'],
      ['not', 0, 1, 2, 1, 'Finn does not play the guitar.'],
      ['not', 0, 0, 1, 2, 'Mia does not eat the watermelon.'],
    ],
    ['Ravi,Ava,Tara|sport=soccer,tennis,skate;ride=bike,boat,tractor|201;012|3|323',
      ['not', 0, 1, 1, 1, 'Ava does not play tennis.'],
      ['not', 1, 2, 2, 1, 'The child who skates does not ride the boat.'],
      ['not', 2, 2, 1, 2, 'The child who rides the tractor does not skate.'],
      ['not', 0, 1, 2, 0, 'Ava does not ride the bike.'],
      ['is', 0, 2, 2, 2, 'Tara rides the tractor.'],
    ],
    ['Theo,Kim,Ravi|hobby=read,draw,puzzle;colour=blue,yellow,orange|021;201|3|323',
      ['is', 0, 2, 2, 1, 'Ravi likes yellow.'],
      ['not', 0, 1, 1, 1, 'Kim does not draw.'],
      ['not', 0, 1, 1, 0, 'Kim does not read.'],
      ['not', 2, 1, 1, 0, 'The child who likes yellow does not read.'],
      ['not', 0, 1, 2, 2, 'Kim does not like orange.'],
    ],
    ['Ada,Leo,Omar|pet=frog,turtle,mouse;sport=soccer,tennis,basketball|210;201|3|324',
      ['is', 0, 0, 1, 2, 'Ada has the mouse.'],
      ['not', 2, 0, 1, 2, 'The child who plays soccer does not have the mouse.'],
      ['not', 0, 2, 2, 2, 'Omar does not play basketball.'],
      ['not', 2, 0, 1, 0, 'The child who plays soccer does not have the frog.'],
      ['is', 0, 1, 1, 1, 'Leo has the turtle.'],
    ],
    ['Hugo,Kai,Nia|sport=soccer,tennis,swim;pet=dog,bird,frog|012;210|3|324',
      ['is', 1, 2, 2, 0, 'The child who swims has the dog.'],
      ['is', 0, 1, 2, 1, 'Kai has the bird.'],
      ['not', 0, 1, 1, 0, 'Kai does not play soccer.'],
      ['not', 0, 0, 2, 0, 'Hugo does not have the dog.'],
    ],
    ['Yuki,Amir,Ben|pet=cat,bird,mouse;ride=bus,boat,tractor|210;021|3|324',
      ['is', 0, 2, 1, 0, 'Ben has the cat.'],
      ['not', 0, 0, 1, 1, 'Yuki does not have the bird.'],
      ['is', 1, 0, 2, 1, 'The cat\'s owner rides the boat.'],
      ['not', 0, 1, 2, 0, 'Amir does not ride the bus.'],
    ],
    ['Ella,Sam,Ava|hobby=paint,draw,puzzle;colour=blue,green,purple|201;120|3|325',
      ['not', 0, 2, 1, 2, 'Ava does not do puzzles.'],
      ['not', 0, 1, 1, 2, 'Sam does not do puzzles.'],
      ['is', 2, 2, 1, 0, 'The child who likes purple paints.'],
      ['not', 0, 2, 1, 0, 'Ava does not paint.'],
      ['not', 0, 0, 2, 0, 'Ella does not like blue.'],
    ],
    ['Ivan,Kai,Hugo|sport=soccer,tennis,basketball;pet=cat,frog,mouse|120;012|3|325',
      ['not', 0, 0, 2, 2, 'Ivan does not have the mouse.'],
      ['not', 2, 2, 1, 2, 'The mouse\'s owner does not play basketball.'],
      ['not', 0, 1, 1, 0, 'Kai does not play soccer.'],
      ['not', 0, 0, 1, 2, 'Ivan does not play basketball.'],
      ['is', 1, 1, 2, 0, 'The child who plays tennis has the cat.'],
    ],
    ['Leo,Finn,Yuki|ride=bike,train,tractor;sport=tennis,basketball,skate|021;201|3|325',
      ['not', 0, 2, 2, 2, 'Yuki does not skate.'],
      ['not', 0, 2, 1, 0, 'Yuki does not ride the bike.'],
      ['is', 1, 2, 2, 0, 'The child who rides the tractor plays tennis.'],
      ['not', 0, 2, 1, 2, 'Yuki does not ride the tractor.'],
      ['not', 0, 0, 2, 0, 'Leo does not play tennis.'],
    ],
    ['Nia,Kai,Zara|colour=red,green,orange;music=drum,guitar,trumpet|120;120|3|325',
      ['not', 0, 0, 1, 2, 'Nia does not like orange.'],
      ['not', 2, 0, 1, 1, 'The child who plays the drum does not like green.'],
      ['not', 0, 0, 1, 0, 'Nia does not like red.'],
      ['not', 1, 0, 2, 2, 'The child who likes red does not play the trumpet.'],
      ['is', 0, 1, 2, 2, 'Kai plays the trumpet.'],
    ],
    ['Yuki,Sam,Eli|sport=basketball,swim,skate;colour=red,blue,orange|210;120|3|325',
      ['is', 0, 0, 2, 1, 'Yuki likes blue.'],
      ['not', 0, 1, 2, 0, 'Sam does not like red.'],
      ['not', 0, 0, 1, 1, 'Yuki does not swim.'],
      ['not', 2, 1, 1, 0, 'The child who likes blue does not play basketball.'],
      ['not', 2, 0, 1, 1, 'The child who likes red does not swim.'],
    ],
    ['Kim,Jun,Raj|ride=bike,bus,train;colour=red,yellow,orange|021;120|3|326',
      ['not', 0, 2, 2, 1, 'Raj does not like yellow.'],
      ['not', 0, 1, 1, 1, 'Jun does not ride the bus.'],
      ['not', 1, 1, 2, 2, 'The child who rides the bus does not like orange.'],
      ['not', 0, 0, 2, 2, 'Kim does not like orange.'],
      ['is', 0, 0, 1, 0, 'Kim rides the bike.'],
    ],
    ['Mia,Dev,Ana|sport=soccer,basketball,swim;colour=yellow,purple,orange|021;102|3|326',
      ['not', 2, 2, 1, 2, 'The child who likes orange does not swim.'],
      ['not', 0, 0, 2, 0, 'Mia does not like yellow.'],
      ['not', 1, 0, 2, 0, 'The child who plays soccer does not like yellow.'],
      ['not', 0, 2, 1, 0, 'Ana does not play soccer.'],
      ['is', 0, 2, 2, 2, 'Ana likes orange.'],
    ],
  ],
  D: [
    ['Ivan,Ana,Finn,Max|snack=apple,cheese,cupcake,pizza;house=1,2,3,4|1230;2301|4|432',
      ['is', 0, 3, 1, 0, 'Max eats the apple.'],
      ['nx', 0, 0, 1, 2, 'Ivan lives next door to the child who eats the cupcake.'],
      ['or', 1, 3, 0, 2, 3, 'The child who eats the pizza is Finn or Max.'],
      ['is', 0, 0, 2, 2, 'Ivan lives at number 3.'],
      ['is', 1, 0, 2, 1, 'The child who eats the apple lives at number 2.'],
    ],
    ['Owen,Ada,Yuki,Zoe|snack=cheese,cookie,pizza,watermelon;race=first,second,third,fourth|3201;2310|4|444',
      ['not', 0, 2, 2, 3, 'Yuki did not come fourth.'],
      ['not', 0, 0, 2, 3, 'Owen did not come fourth.'],
      ['is', 0, 1, 1, 2, 'Ada eats the pizza.'],
      ['not', 0, 0, 1, 1, 'Owen does not eat the cookie.'],
      ['nx', 0, 0, 1, 2, 'Owen and the child who eats the pizza finished one place apart.'],
      ['lt', 1, 1, 0, 2, 'The child who eats the cookie finished ahead of Yuki.'],
      ['gt', 1, 3, 1, 0, 'The child who eats the watermelon finished behind the child who eats the cheese.'],
    ],
    ['Ravi,Zoe,Nora,Ivan|ride=bike,bus,boat,tractor;race=first,second,third,fourth|2301;2130|4|444',
      ['is', 0, 1, 1, 3, 'Zoe rides the tractor.'],
      ['is', 0, 3, 2, 0, 'Ivan came first.'],
      ['lt', 0, 0, 1, 0, 'Ravi finished ahead of the child who rides the bike.'],
      ['gt', 0, 0, 1, 3, 'Ravi finished behind the child who rides the tractor.'],
      ['lt', 0, 3, 1, 2, 'Ivan finished ahead of the child who rides the boat.'],
    ],
    ['Sam,Ben,Zara,Jun|sport=soccer,tennis,basketball,swim;race=first,second,third,fourth|0312;0312|4|444',
      ['nx', 0, 2, 1, 0, 'Zara and the child who plays soccer finished one place apart.'],
      ['nx', 0, 2, 0, 3, 'Zara and Jun finished one place apart.'],
      ['is', 0, 2, 1, 1, 'Zara plays tennis.'],
      ['gt', 1, 2, 0, 0, 'The child who plays basketball finished behind Sam.'],
      ['is', 0, 0, 2, 0, 'Sam came first.'],
      ['is', 0, 1, 1, 3, 'Ben swims.'],
    ],
    ['Hugo,Luca,Nora,Zara|sport=soccer,tennis,basketball,swim;race=first,second,third,fourth|1230;0132|4|445',
      ['is', 0, 3, 2, 2, 'Zara came third.'],
      ['not', 0, 3, 1, 3, 'Zara does not swim.'],
      ['not', 0, 3, 1, 1, 'Zara does not play tennis.'],
      ['not', 0, 3, 1, 2, 'Zara does not play basketball.'],
      ['gt', 1, 3, 1, 0, 'The child who swims finished behind the child who plays soccer.'],
      ['or', 2, 0, 0, 0, 2, 'The child who came first is Hugo or Nora.'],
      ['nx', 0, 1, 1, 1, 'Luca and the child who plays tennis finished one place apart.'],
      ['gt', 0, 2, 0, 3, 'Nora finished behind Zara.'],
    ],
    ['Maya,Kai,Ana,Dev|pet=rabbit,bird,frog,mouse;race=first,second,third,fourth|0312;2013|4|447',
      ['gt', 0, 2, 1, 3, 'Ana finished behind the mouse\'s owner.'],
      ['or', 1, 0, 2, 0, 2, 'The rabbit\'s owner came first or third.'],
      ['is', 0, 3, 2, 3, 'Dev came fourth.'],
      ['or', 2, 1, 1, 1, 0, 'The child who came second has the bird or the rabbit.'],
      ['or', 1, 0, 0, 0, 3, 'The rabbit\'s owner is Maya or Dev.'],
    ],
    ['Tara,Ravi,Maya,Lena|ride=bus,train,boat,tractor;race=first,second,third,fourth|3102;3012|4|447',
      ['lt', 0, 1, 0, 2, 'Ravi finished ahead of Maya.'],
      ['not', 0, 3, 2, 0, 'Lena did not come first.'],
      ['is', 0, 0, 2, 3, 'Tara came fourth.'],
      ['is', 2, 0, 1, 1, 'The child who came first rides the train.'],
      ['gt', 1, 2, 1, 0, 'The child who rides the boat finished behind the child who rides the bus.'],
      ['or', 0, 3, 1, 1, 2, 'Lena rides the train or the boat.'],
    ],
    ['Dev,Sam,Ada,Jun|sport=soccer,tennis,basketball,skate;race=first,second,third,fourth|2031;3120|4|448',
      ['nx', 0, 0, 1, 3, 'Dev and the child who skates finished one place apart.'],
      ['is', 0, 3, 1, 1, 'Jun plays tennis.'],
      ['nx', 0, 2, 1, 2, 'Ada and the child who plays basketball finished one place apart.'],
      ['gt', 1, 2, 1, 0, 'The child who plays basketball finished behind the child who plays soccer.'],
      ['not', 1, 0, 2, 0, 'The child who plays soccer did not come first.'],
      ['is', 0, 0, 2, 3, 'Dev came fourth.'],
    ],
    ['Ivan,Kim,Theo,Amir|sport=soccer,tennis,basketball,swim;age=6,7,8,9|3012;0213|4|449',
      ['lt', 0, 2, 1, 0, 'Theo is younger than the child who plays soccer.'],
      ['or', 1, 3, 0, 0, 3, 'The child who swims is Ivan or Amir.'],
      ['or', 2, 3, 1, 2, 1, 'The 9-year-old plays basketball or tennis.'],
      ['lt', 0, 1, 1, 2, 'Kim is younger than the child who plays basketball.'],
      ['is', 0, 2, 2, 1, 'Theo is 7.'],
      ['not', 0, 0, 2, 3, 'Ivan is not 9.'],
    ],
    ['Mia,Theo,Finn,Kai|hobby=paint,read,draw,puzzle;age=6,7,8,9|0213;3120|4|449',
      ['is', 0, 1, 1, 2, 'Theo draws.'],
      ['or', 2, 3, 1, 0, 1, 'The 9-year-old paints or reads.'],
      ['lt', 1, 2, 1, 1, 'The child who draws is younger than the child who reads.'],
      ['or', 2, 1, 0, 1, 2, 'The 7-year-old is Theo or Finn.'],
      ['gt', 0, 0, 1, 1, 'Mia is older than the child who reads.'],
      ['not', 2, 1, 1, 1, 'The 7-year-old does not read.'],
      ['not', 0, 3, 2, 2, 'Kai is not 8.'],
    ],
    ['Eli,Dev,Omar,Nora|sport=soccer,tennis,basketball,skate;house=1,2,3,4|3021;1023|4|450',
      ['is', 0, 2, 1, 2, 'Omar plays basketball.'],
      ['nx', 0, 0, 0, 1, 'Eli lives next door to Dev.'],
      ['is', 1, 3, 2, 1, 'The child who skates lives at number 2.'],
      ['gt', 0, 2, 1, 0, 'Omar lives at a bigger number than the child who plays soccer.'],
      ['or', 0, 3, 2, 1, 3, 'Nora lives at number 2 or number 4.'],
      ['or', 0, 0, 2, 1, 2, 'Eli lives at number 2 or number 3.'],
    ],
    ['Kai,Tara,Ella,Finn|colour=blue,green,yellow,purple;house=1,2,3,4|2310;1320|4|451',
      ['gt', 0, 1, 1, 1, 'Tara lives at a bigger number than the child who likes green.'],
      ['or', 2, 3, 1, 3, 1, 'The child at number 4 likes purple or green.'],
      ['lt', 0, 3, 1, 2, 'Finn lives at a smaller number than the child who likes yellow.'],
      ['or', 1, 2, 2, 1, 3, 'The child who likes yellow lives at number 2 or number 4.'],
      ['is', 1, 0, 2, 0, 'The child who likes blue lives at number 1.'],
      ['not', 0, 0, 1, 1, 'Kai does not like green.'],
    ],
    ['Mia,Nia,Kim,Lena|colour=red,blue,yellow,orange;age=6,7,8,9|3201;3102|4|451',
      ['or', 0, 0, 2, 1, 3, 'Mia is 7 or 9.'],
      ['gt', 0, 3, 1, 2, 'Lena is older than the child who likes yellow.'],
      ['or', 2, 3, 1, 2, 3, 'The 9-year-old likes yellow or orange.'],
      ['not', 0, 0, 1, 2, 'Mia does not like yellow.'],
      ['or', 2, 2, 1, 3, 1, 'The 8-year-old likes orange or blue.'],
      ['gt', 1, 2, 0, 2, 'The child who likes yellow is older than Kim.'],
    ],
    ['Kim,Owen,Yuki,Tom|ride=bike,bus,train,tractor;house=1,2,3,4|0123;0132|4|453',
      ['or', 1, 2, 2, 1, 3, 'The child who rides the train lives at number 2 or number 4.'],
      ['or', 0, 1, 2, 0, 1, 'Owen lives at number 1 or number 2.'],
      ['or', 0, 0, 2, 0, 3, 'Kim lives at number 1 or number 4.'],
      ['or', 2, 1, 1, 3, 1, 'The child at number 2 rides the tractor or the bus.'],
      ['not', 0, 0, 2, 3, 'Kim does not live at number 4.'],
      ['is', 2, 2, 1, 3, 'The child at number 3 rides the tractor.'],
      ['gt', 0, 2, 0, 3, 'Yuki lives at a bigger number than Tom.'],
    ],
    ['Ava,Nora,Eli,Leo|pet=cat,fish,frog,mouse;age=6,7,8,9|3210;1032|4|454',
      ['lt', 1, 2, 1, 0, 'The frog\'s owner is younger than the cat\'s owner.'],
      ['is', 0, 0, 2, 1, 'Ava is 7.'],
      ['not', 0, 3, 1, 2, 'Leo does not have the frog.'],
      ['or', 0, 3, 2, 0, 2, 'Leo is 6 or 8.'],
      ['or', 2, 2, 1, 0, 2, 'The 8-year-old has the cat or the frog.'],
      ['lt', 0, 1, 1, 3, 'Nora is younger than the mouse\'s owner.'],
      ['or', 1, 3, 2, 0, 1, 'The mouse\'s owner is 6 or 7.'],
    ],
    ['Luca,Raj,Nia,Finn|pet=rabbit,bird,turtle,mouse;age=6,7,8,9|3102;2031|4|455',
      ['not', 0, 0, 1, 0, 'Luca does not have the rabbit.'],
      ['or', 0, 3, 2, 1, 3, 'Finn is 7 or 9.'],
      ['lt', 0, 3, 1, 3, 'Finn is younger than the mouse\'s owner.'],
      ['or', 2, 1, 1, 0, 2, 'The 7-year-old has the rabbit or the turtle.'],
      ['or', 2, 3, 1, 2, 0, 'The 9-year-old has the turtle or the rabbit.'],
      ['not', 2, 1, 1, 0, 'The 7-year-old does not have the rabbit.'],
      ['gt', 0, 0, 0, 1, 'Luca is older than Raj.'],
    ],
    ['Ana,Ben,Eli,Yuki|sport=soccer,basketball,swim,skate;house=1,2,3,4|3021;3210|4|456',
      ['or', 1, 2, 0, 2, 0, 'The child who swims is Eli or Ana.'],
      ['gt', 0, 1, 0, 2, 'Ben lives at a bigger number than Eli.'],
      ['is', 0, 2, 2, 1, 'Eli lives at number 2.'],
      ['nx', 1, 0, 1, 3, 'The child who plays soccer lives next door to the child who skates.'],
      ['nx', 0, 0, 1, 0, 'Ana lives next door to the child who plays soccer.'],
      ['lt', 0, 1, 1, 3, 'Ben lives at a smaller number than the child who skates.'],
    ],
    ['Ivan,Nia,Mia,Sam|ride=bike,bus,boat,tractor;race=first,second,third,fourth|0132;3021|4|456',
      ['gt', 1, 0, 1, 3, 'The child who rides the bike finished behind the child who rides the tractor.'],
      ['or', 1, 3, 2, 2, 3, 'The child who rides the tractor came third or fourth.'],
      ['gt', 0, 2, 1, 2, 'Mia finished behind the child who rides the boat.'],
      ['or', 2, 1, 1, 2, 3, 'The child who came second rides the boat or the tractor.'],
      ['not', 0, 1, 1, 2, 'Nia does not ride the boat.'],
      ['is', 0, 0, 1, 0, 'Ivan rides the bike.'],
    ],
    ['Kai,Eli,Ravi,Lena|hobby=paint,read,draw,puzzle;race=first,second,third,fourth|3120;1023|4|456',
      ['lt', 1, 2, 0, 3, 'The child who draws finished ahead of Lena.'],
      ['lt', 0, 0, 1, 0, 'Kai finished ahead of the child who paints.'],
      ['lt', 0, 0, 1, 2, 'Kai finished ahead of the child who draws.'],
      ['lt', 0, 1, 0, 2, 'Eli finished ahead of Ravi.'],
      ['not', 0, 1, 2, 1, 'Eli did not come second.'],
      ['is', 2, 1, 1, 3, 'The child who came second does puzzles.'],
    ],
    ['Ana,Dev,Raj,Lena|pet=fish,bird,frog,mouse;race=first,second,third,fourth|0312;3210|4|458',
      ['lt', 1, 1, 0, 1, 'The bird\'s owner finished ahead of Dev.'],
      ['lt', 0, 1, 0, 0, 'Dev finished ahead of Ana.'],
      ['gt', 1, 0, 1, 3, 'The fish\'s owner finished behind the mouse\'s owner.'],
      ['nx', 0, 1, 1, 1, 'Dev and the bird\'s owner finished one place apart.'],
      ['is', 0, 2, 2, 1, 'Raj came second.'],
      ['or', 1, 2, 2, 0, 1, 'The frog\'s owner came first or second.'],
    ],
    ['Kai,Raj,Owen,Lena|sport=soccer,basketball,swim,skate;age=6,7,8,9|2031;1230|4|460',
      ['gt', 1, 2, 0, 3, 'The child who swims is older than Lena.'],
      ['or', 0, 1, 1, 2, 0, 'Raj swims or plays soccer.'],
      ['gt', 0, 0, 0, 3, 'Kai is older than Lena.'],
      ['or', 2, 2, 0, 3, 1, 'The 8-year-old is Lena or Raj.'],
      ['nx', 1, 1, 1, 2, 'The child who plays basketball and the child who swims are one year apart.'],
      ['gt', 1, 0, 0, 0, 'The child who plays soccer is older than Kai.'],
      ['not', 0, 3, 1, 3, 'Lena does not skate.'],
    ],
    ['Zoe,Tara,Amir,Finn|ride=bike,bus,train,boat;age=6,7,8,9|2310;2013|4|461',
      ['lt', 1, 1, 0, 3, 'The child who rides the bus is younger than Finn.'],
      ['or', 0, 3, 1, 1, 0, 'Finn rides the bus or the bike.'],
      ['or', 2, 3, 1, 0, 1, 'The 9-year-old rides the bike or the bus.'],
      ['nx', 0, 2, 1, 3, 'Amir and the child who rides the boat are one year apart.'],
      ['gt', 0, 0, 1, 3, 'Zoe is older than the child who rides the boat.'],
      ['or', 1, 1, 2, 1, 3, 'The child who rides the bus is 7 or 9.'],
    ],
    ['Tara,Ada,Eli,Yuki|sport=tennis,basketball,swim,skate;age=6,7,8,9|1302;2013|4|463',
      ['is', 0, 1, 2, 0, 'Ada is 6.'],
      ['lt', 1, 3, 1, 0, 'The child who skates is younger than the child who plays tennis.'],
      ['or', 2, 2, 0, 0, 3, 'The 8-year-old is Tara or Yuki.'],
      ['gt', 1, 1, 1, 0, 'The child who plays basketball is older than the child who plays tennis.'],
      ['or', 0, 3, 2, 1, 3, 'Yuki is 7 or 9.'],
      ['gt', 0, 0, 0, 2, 'Tara is older than Eli.'],
      ['not', 0, 0, 1, 0, 'Tara does not play tennis.'],
      ['nx', 0, 0, 1, 2, 'Tara and the child who swims are one year apart.'],
    ],
    ['Ivan,Owen,Zoe,Tara|hobby=paint,read,draw,puzzle;age=6,7,8,9|0231;0123|4|464',
      ['gt', 1, 3, 0, 1, 'The child who does puzzles is older than Owen.'],
      ['not', 0, 2, 2, 1, 'Zoe is not 7.'],
      ['nx', 0, 1, 1, 3, 'Owen and the child who does puzzles are one year apart.'],
      ['or', 2, 1, 0, 2, 1, 'The 7-year-old is Zoe or Owen.'],
      ['gt', 1, 1, 1, 2, 'The child who reads is older than the child who draws.'],
      ['or', 0, 0, 2, 0, 1, 'Ivan is 6 or 7.'],
      ['lt', 0, 2, 0, 3, 'Zoe is younger than Tara.'],
      ['or', 0, 0, 1, 3, 0, 'Ivan does puzzles or paints.'],
    ],
    ['Owen,Jun,Sam,Tara|hobby=paint,read,draw,puzzle;house=1,2,3,4|1302;1230|5|559',
      ['or', 1, 3, 0, 1, 3, 'The child who does puzzles is Jun or Tara.'],
      ['lt', 1, 2, 0, 0, 'The child who draws lives at a smaller number than Owen.'],
      ['lt', 0, 3, 1, 0, 'Tara lives at a smaller number than the child who paints.'],
      ['not', 2, 3, 1, 3, 'The child at number 4 does not do puzzles.'],
      ['or', 0, 0, 1, 1, 2, 'Owen reads or draws.'],
      ['nx', 0, 1, 0, 2, 'Jun lives next door to Sam.'],
      ['not', 0, 0, 2, 3, 'Owen does not live at number 4.'],
    ],
    ['Yuki,Eli,Ben,Tom|pet=bird,frog,turtle,mouse;house=1,2,3,4|1023;1203|5|559',
      ['or', 0, 3, 2, 2, 3, 'Tom lives at number 3 or number 4.'],
      ['nx', 0, 3, 1, 0, 'Tom lives next door to the bird\'s owner.'],
      ['gt', 0, 0, 1, 2, 'Yuki lives at a bigger number than the turtle\'s owner.'],
      ['nx', 0, 0, 1, 0, 'Yuki lives next door to the bird\'s owner.'],
      ['not', 0, 2, 2, 2, 'Ben does not live at number 3.'],
      ['not', 1, 3, 2, 1, 'The mouse\'s owner does not live at number 2.'],
    ],
    ['Nia,Ella,Ravi,Kai|ride=bike,bus,boat,tractor;house=1,2,3,4|3201;2103|5|560',
      ['or', 0, 1, 1, 1, 2, 'Ella rides the bus or the boat.'],
      ['or', 0, 2, 2, 0, 3, 'Ravi lives at number 1 or number 4.'],
      ['lt', 0, 2, 0, 0, 'Ravi lives at a smaller number than Nia.'],
      ['gt', 0, 0, 1, 2, 'Nia lives at a bigger number than the child who rides the boat.'],
      ['nx', 0, 0, 0, 1, 'Nia lives next door to Ella.'],
      ['is', 1, 1, 2, 3, 'The child who rides the bus lives at number 4.'],
      ['not', 0, 0, 1, 0, 'Nia does not ride the bike.'],
      ['not', 0, 3, 2, 1, 'Kai does not live at number 2.'],
    ],
    ['Zara,Hugo,Jun,Lena|snack=apple,banana,cookie,pizza;age=6,7,8,9|0123;0312|5|564',
      ['lt', 1, 2, 0, 1, 'The child who eats the cookie is younger than Hugo.'],
      ['or', 1, 1, 2, 0, 3, 'The child who eats the banana is 6 or 9.'],
      ['nx', 0, 3, 1, 1, 'Lena and the child who eats the banana are one year apart.'],
      ['or', 1, 0, 2, 0, 3, 'The child who eats the apple is 6 or 9.'],
      ['or', 1, 0, 0, 3, 0, 'The child who eats the apple is Lena or Zara.'],
      ['nx', 0, 3, 1, 2, 'Lena and the child who eats the cookie are one year apart.'],
    ],
    ['Zoe,Lena,Ava,Dev|sport=soccer,basketball,swim,skate;race=first,second,third,fourth|0231;0312|5|566',
      ['nx', 1, 1, 1, 3, 'The child who plays basketball and the child who skates finished one place apart.'],
      ['or', 2, 2, 1, 1, 3, 'The child who came third plays basketball or skates.'],
      ['not', 0, 0, 2, 3, 'Zoe did not come fourth.'],
      ['or', 1, 2, 2, 2, 3, 'The child who swims came third or fourth.'],
      ['nx', 0, 2, 0, 3, 'Ava and Dev finished one place apart.'],
      ['nx', 0, 2, 1, 0, 'Ava and the child who plays soccer finished one place apart.'],
      ['gt', 0, 3, 1, 3, 'Dev finished behind the child who skates.'],
    ],
    ['Nia,Eli,Theo,Dev|colour=red,blue,green,yellow;race=first,second,third,fourth|3021;0213|5|567',
      ['gt', 0, 3, 1, 0, 'Dev finished behind the child who likes red.'],
      ['or', 2, 0, 0, 2, 0, 'The child who came first is Theo or Nia.'],
      ['nx', 0, 0, 0, 2, 'Nia and Theo finished one place apart.'],
      ['gt', 1, 0, 1, 2, 'The child who likes red finished behind the child who likes green.'],
      ['lt', 0, 0, 1, 1, 'Nia finished ahead of the child who likes blue.'],
      ['or', 2, 1, 1, 2, 1, 'The child who came second likes green or blue.'],
      ['or', 1, 2, 0, 2, 1, 'The child who likes green is Theo or Eli.'],
    ],
    ['Ivan,Noah,Theo,Kai|sport=soccer,tennis,basketball,swim;house=1,2,3,4|2031;0213|5|568',
      ['gt', 1, 3, 0, 0, 'The child who swims lives at a bigger number than Ivan.'],
      ['lt', 0, 0, 1, 1, 'Ivan lives at a smaller number than the child who plays tennis.'],
      ['is', 0, 2, 1, 3, 'Theo swims.'],
      ['nx', 0, 1, 0, 2, 'Noah lives next door to Theo.'],
      ['or', 1, 0, 0, 0, 1, 'The child who plays soccer is Ivan or Noah.'],
      ['lt', 0, 2, 1, 0, 'Theo lives at a smaller number than the child who plays soccer.'],
      ['nx', 0, 0, 0, 2, 'Ivan lives next door to Theo.'],
    ],
    ['Ben,Eli,Kai,Raj|ride=bike,bus,train,boat;race=first,second,third,fourth|3201;0231|5|569',
      ['or', 2, 1, 0, 1, 3, 'The child who came second is Eli or Raj.'],
      ['gt', 1, 2, 0, 0, 'The child who rides the train finished behind Ben.'],
      ['or', 0, 1, 2, 1, 2, 'Eli came second or third.'],
      ['not', 2, 2, 1, 0, 'The child who came third does not ride the bike.'],
      ['or', 1, 0, 0, 1, 2, 'The child who rides the bike is Eli or Kai.'],
      ['not', 2, 1, 1, 0, 'The child who came second does not ride the bike.'],
      ['or', 2, 2, 0, 0, 1, 'The child who came third is Ben or Eli.'],
      ['or', 1, 1, 0, 2, 3, 'The child who rides the bus is Kai or Raj.'],
    ],
    ['Tom,Zoe,Amir,Eli|hobby=paint,read,draw,puzzle;race=first,second,third,fourth|3012;0132|5|569',
      ['or', 0, 3, 2, 0, 2, 'Eli came first or third.'],
      ['or', 0, 0, 2, 0, 1, 'Tom came first or second.'],
      ['nx', 1, 1, 1, 2, 'The child who reads and the child who draws finished one place apart.'],
      ['nx', 1, 0, 1, 2, 'The child who paints and the child who draws finished one place apart.'],
      ['nx', 0, 0, 1, 0, 'Tom and the child who paints finished one place apart.'],
      ['or', 1, 1, 0, 0, 2, 'The child who reads is Tom or Amir.'],
      ['lt', 1, 3, 1, 1, 'The child who does puzzles finished ahead of the child who reads.'],
    ],
    ['Tom,Ella,Hugo,Ava|sport=soccer,tennis,basketball,swim;age=6,7,8,9|2013;0312|5|571',
      ['lt', 0, 2, 1, 3, 'Hugo is younger than the child who swims.'],
      ['lt', 0, 0, 0, 2, 'Tom is younger than Hugo.'],
      ['not', 0, 1, 1, 3, 'Ella does not swim.'],
      ['nx', 0, 3, 1, 1, 'Ava and the child who plays tennis are one year apart.'],
      ['gt', 1, 0, 1, 1, 'The child who plays soccer is older than the child who plays tennis.'],
    ],
    ['Jun,Noah,Omar,Tom|ride=bus,train,boat,tractor;race=first,second,third,fourth|0132;0213|5|573',
      ['or', 0, 1, 2, 1, 2, 'Noah came second or third.'],
      ['lt', 0, 0, 1, 1, 'Jun finished ahead of the child who rides the train.'],
      ['or', 0, 0, 1, 0, 1, 'Jun rides the bus or the train.'],
      ['or', 2, 2, 1, 1, 0, 'The child who came third rides the train or the bus.'],
      ['or', 1, 3, 0, 2, 0, 'The child who rides the tractor is Omar or Jun.'],
      ['or', 2, 1, 1, 1, 3, 'The child who came second rides the train or the tractor.'],
    ],
    ['Eli,Luca,Ravi,Kai|snack=apple,banana,grapes,cookie;age=6,7,8,9|2031;0321|5|575',
      ['lt', 0, 2, 0, 1, 'Ravi is younger than Luca.'],
      ['or', 0, 2, 1, 0, 3, 'Ravi eats the apple or the cookie.'],
      ['or', 1, 2, 0, 0, 1, 'The child who eats the grapes is Eli or Luca.'],
      ['nx', 0, 1, 1, 3, 'Luca and the child who eats the cookie are one year apart.'],
      ['or', 0, 3, 2, 1, 3, 'Kai is 7 or 9.'],
      ['lt', 0, 3, 1, 0, 'Kai is younger than the child who eats the apple.'],
    ],
  ],
};
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
/* Robot Path worlds for bands C and D (P3-13, BRAIN_TEASERS 5.8). GENERATED by `node tools/puzzles/build-banks.js robot` from
   seed 'star-school-robot-1': do not edit by hand; change the generator (tools/puzzles/robot.js) and rerun it. Same seed, same file.
   PUZ.robot[band] = [36 worlds], 3 per level in level order (level L is entries 3(L-1) to 3L-1). Each world is
   'n|cells|start|facing|goal|par|kit|main|fn|template': cells n*n characters (. open, # wall) in reading order; facing
   0 up, 1 right, 2 down, 3 left; kit = blocks added to forward, turns and repeat (u repeat until wall, f the function);
   main and fn = the intended program, a shortest one (fw tl tr, r2..r9 repeat N, uw repeat until wall, en end of a loop,
   fn call the function); par = its blocks. tools/test.js proves par with its own search. */
var PUZ = PUZ || {};
PUZ.robot = {
  C: [
    '6|##################......############|18|1|23|2||r5 fw en||line',
    '6|####.#####.#####.#####.#####.#####.#|34|0|4|2||r5 fw en||line',
    '6|##.#####.#####.#####.#####.#####.###|2|1|32|3||tr r5 fw en||line',
    '6|############......##################|17|0|12|3||tl r5 fw en||line',
    '6|##############################......|30|0|35|3||tr r5 fw en||line',
    '6|########################......######|29|2|24|3||tr r5 fw en||line',
    '6|....#####.#####.#####.#####.#####.##|0|1|33|5||r3 fw en tr r5 fw en||turn',
    '6|######......#####.#####.#####.######|29|0|6|5||r3 fw en tl r5 fw en||turn',
    '6|.....#####.#####.#####.#############|22|0|0|5||r3 fw en tl r4 fw en||turn',
    '6|######.#####..#####..#####..#####..#|6|2|34|5||r4 fw tl fw tr en||stairs',
    '6|#######..#####..#####..#####..#####.|7|1|35|5||r4 fw tr fw tl en||stairs',
    '6|######..#####..#####..#####..#####.#|34|0|6|5||r4 fw tl fw tr en||stairs',
    '6|#########..###..###..###..####.#####|30|3|10|6||tr r4 fw tr fw tl en||stairs',
    '6|.#####..#####..#####..#####..#####..|0|2|35|5||r5 fw tl fw tr en||stairs',
    '6|..#####..#####..#####..#####..#####.|0|0|35|6||tr r5 fw tr fw tl en||stairs',
    '6|#.....#####.#####.#####.#####.######|1|1|29|4||r2 r4 fw en tr en||turn',
    '6|#################.#####.#####.#.....|31|1|17|4||r2 r4 fw en tl en||turn',
    '6|.#####.#####.#####.#####......######|29|3|0|4||r2 r5 fw en tr en||turn',
    '6|#.....#.#####.###.#.###.#.....######|5|3|17|4||r4 r4 fw en tl en||ring',
    '6|....#..####..####..####..####.......|5|2|3|4||r4 r5 fw en tr en||ring',
    '6|##....##.#####.##.##....############|5|3|17|4||r4 r3 fw en tl en||ring',
    '6|####..####.####..####.#####.########|5|3|27|6||r2 fw tl fw fw tr en||stairs',
    '6|#############...#####...#####.######|29|0|13|6||r2 fw tl fw fw tr en||stairs',
    '6|###.#####.#####..#####.#####..######|29|3|3|6||r2 fw tr fw fw tl en||stairs',
    '6|######...#####...#####.#############|6|1|22|6||r2 fw fw tr fw tl en||stairs',
    '6|###...#...###.######################|13|0|5|6||r2 fw tr fw fw tl en||stairs',
    '6|##########.#####.####..####.####..##|32|1|10|6||r2 fw tl fw fw tr en||stairs',
    '6|###.#####.#####.#####..#####..#####.|35|0|3|7||r2 fw tl fw tr en r3 fw en||stairsRun',
    '6|###########.####..###..####.#####.##|11|2|33|7||r2 fw tr fw tl en r2 fw en||stairsRun',
    '6|############...#####..#####..#######|28|3|12|7||r2 fw tr fw tl en r2 fw en||stairsRun',
    '6|#.##.##.##.##.##.##.##.##.##.##....#|1|2|4|7||r2 r5 fw en tl r3 fw en tl en||rect',
    '6|######.......#####.#####.#####......|35|3|11|7||r2 r5 fw en tr r4 fw en tr en||rect',
    '6|######......#####.......############|6|1|18|7||r2 r5 fw en tr r2 fw en tr en||rect',
    '6|############......#####.......######|12|1|24|7||r2 r5 fw en tr r2 fw en tr en||rect',
    '6|##################......#####.......|30|1|18|7||r2 r5 fw en tl r2 fw en tl en||rect',
    '6|######.......#####.#####.#####......|11|3|35|7||r2 r5 fw en tl r4 fw en tl en||rect',
  ],
  D: [
    '8|########.........#######.#######.#######.#######.#######........|63|3|15|4|u|r3 uw fw en tr en||ringU',
    '8|#.......#.#######.#######.#######.......########################|7|3|39|4|u|r3 uw fw en tl en||ringU',
    '8|#.###.###.###.###.###.###.###.###.###.###.###.###.###.###.....##|1|2|5|4|u|r3 uw fw en tl en||ringU',
    '8|.##.####.##.####.##.####.##.####.##.####.##.####.##.####....####|0|2|3|4|u|r3 uw fw en tl en||ringU',
    '8|########......##.#######.#######.#######.#######.#######......##|61|3|13|4|u|r3 uw fw en tr en||ringU',
    '8|.....#######.###.###.###.....###################################|0|1|16|4|u|r4 uw fw en tr en||ringU',
    '8|.........######..#....#..####.#..####.#..####.#..####.#.......#.|63|0|18|4|u|r6 uw fw en tl en||spiral',
    '8|#.......#.#####.#.#...#.#.###.#.#.###.#.#.###.#.#.....#.########|55|0|19|4|u|r6 uw fw en tl en||spiral',
    '8|.........######..######..######..######..######.#######.........|56|1|40|4|u|r4 uw fw en tl en||spiral',
    '8|.#.......#.####..#.####..#.####..#.####..#.####..######.........|0|2|42|4|u|r5 uw fw en tl en||spiral',
    '8|.#.....#.#.###.#.#.###.#.#.###.#.#.###.#.#####.#.......#########|0|2|34|4|u|r5 uw fw en tl en||spiral',
    '8|#########......##.####.##.####.##....#.#######.##......#########|49|1|36|4|u|r5 uw fw en tl en||spiral',
    '8|####.#######.#######..#######..#######.#######.#######..#######.|4|2|63|6|u|r4 uw fw en tl fw tr en||stairsU',
    '8|#########..#######...#######..#######..#######..################|9|1|47|6|u|r5 uw fw en tr fw tl en||stairsU',
    '8|################...#######...#######..#######..#######..########|55|3|16|6|u|r5 uw fw en tr fw tl en||stairsU',
    '8|###############.######..#####..#####..#####..######.#######.####|59|0|15|6|u|r5 uw fw en tr fw tl en||stairsU',
    '8|########################...#######..#######..#######....########|24|1|55|6|u|r4 uw fw en tr fw tl en||stairsU',
    '8|################..#######..#######..#######...#######...########|16|1|55|6|u|r5 uw fw en tr fw tl en||stairsU',
    '8|####....###..#####..#####..#####..##############################|32|1|7|6|u|r5 uw fw en tl fw tr en||stairsU',
    '8|#####################################...####..####...###...#####|39|3|56|6|u|r4 uw fw en tl fw tr en||stairsU',
    '8|##.#######..#######..#######.#######..#######.#######.#######.##|61|0|2|6|u|r4 uw fw en tl fw tr en||stairsU',
    '8|#.#######..#######.#######..#######.#######..#######.#######.###|1|2|60|6|u|r4 uw fw en tl fw tr en||stairsU',
    '8|###.#######.#######..#######..#######..#######..#######.#######.|63|0|3|6|u|r5 uw fw en tl fw tr en||stairsU',
    '8|######..#####..####...####..####...#############################|7|3|32|6|u|r5 uw fw en tl fw tr en||stairsU',
    '8|################################..#######..#######...#######....|63|2|32|7|u|tr r4 uw fw en tr fw tl en||stairsU',
    '8|##############################..#####..###....##...#############|31|0|48|7|u|tl r4 uw fw en tl fw tr en||stairsU',
    '8|################..#######...#######...#######...################|16|0|47|7|u|tr r4 uw fw en tr fw tl en||stairsU',
    '8|#########..#######..#######..#######..#######.#######..#######.#|62|0|9|8|f|fn fw r4 fn en|fw tl fw tr|hills',
    '8|#####.######..######.######..#####..#####..#####################|5|2|41|8|f|fn fw r3 fn en|fw tr fw tl|hills',
    '8|#######.######..#####..####...####..############################|34|1|7|8|f|fn fw r3 fn en|fw tl fw tr|hills',
    '8|######..#####..#####..######.#######.######..#####..######.#####|58|0|7|10|f|r2 fn en r2 fw en r3 fn en|fw tr fw tl|hills',
    '8|###############.######..#####..###....###..#####..##############|48|1|15|10|f|r2 fn en r2 fw en r3 fn en|fw tl fw tr|hills',
    '8|###############.######..#####..#####..#####..####...####..######|56|1|15|8|f|fn fw r5 fn en|fw tl fw tr|hills',
    '8|#.#######..#######..#######.#######..#######..#######..#######..|1|3|63|10|f|tl r2 fn en fw r4 fn en|fw tl fw tr|hills',
    '8|..#######..#######..#######..#######.#######..#######..#######.#|62|3|0|10|f|tr r2 fn en fw r4 fn en|fw tl fw tr|hills',
    '8|########.#######..#######..#######..#######....#######..########|55|2|8|10|f|tr fn r2 fw en r4 fn en|fw tr fw tl|hills',
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
/* Tangram puzzles (P3-11, BRAIN_TEASERS 5.7). Written by hand; tools/test.js (check "tangrams P3-11") proves every entry exactly.
   PUZ.tangram = [puzzle, ...] in order of difficulty: level L of every band uses entry L-1 (levels past the end pick one of the
   harder half by the day's seed; with 12 or more entries each level gets its own slice, so P3-12 only has to add entries).
   A puzzle: {id, name, say, pcs}
     id    lowercase letters, unique            name  shown and spoken ("You made the house!")
     say   the spoken prompt, one short sentence for a pre-reader ("Make a house with a big roof.")
     pcs   the SOLUTION, seven placements in the order L L M S S Q P (big, big, middle, small, small triangles, square,
           parallelogram); the silhouette is the union of the placed pieces, so the puzzle is solvable by construction.
   A placement is [k, f, x, y] (TG in src/js/80-bt-tangram.js): the piece in its start position
     L (0,0) (4,0) (2,2)   M (0,0) (2,0) (0,2)   S (0,0) (2,0) (1,1)   Q (1,0) (2,1) (1,2) (0,1)   P (0,0) (2,0) (3,1) (1,1)
   (units: the big square of all seven has side 4; y points down) is flipped if f = 1 (x -> -x; only P may flip, the others
   use f = 0), turned k x 45 degrees clockwise about (0,0) (k = 0..7), then moved by (x, y).
   x and y are exact: a number (whole or half), or a pair [a, b] meaning a + b * sqrt(2)/2. Turning by 45 degrees maps a corner
   (x, y) to (h(x - y), h(x + y)) with h = sqrt(2)/2, so with pairs every corner stays exact: for corner (xa + xb h, ya + yb h)
   the turned corner is ((xb - yb)/2 + (xa - ya) h, (xb + yb)/2 + (xa + ya) h). Pieces must meet along edges (a shared corner
   alone does not join them), must not overlap, and must make one connected shape; the check compares corners exactly.
   How to write a new one: place a piece so that one of its corners lands on a corner of a piece already placed (the test prints
   every corner of a failing entry), and look at it with `node tools/shots.js bt-tg-sheet` (every silhouette and its solution).
   ORDER (P3-12): 32 puzzles, the 8 of P3-11 and 24 more, sorted by a difficulty score (written after each entry's say):
     score = the outline's length in units + half the number of its corners + the number of pieces turned 45 degrees against the
             rest + half the number of piece pairs that meet only at a corner
   A spread-out silhouette with many corners, thin parts and mixed turns is harder to read than a compact one; ties keep the older
   entry first. tools/test.js recomputes the score and checks the order. With 32 entries each level gets its own slice of 2 or 3
   puzzles (TG.pickIndex). Most of the new entries stand the square upright (odd turns); only the picture counts, not the turns. */
var PUZ = PUZ || {};
PUZ.tangram = [
  { id: 'boat', name: 'Sailboat', say: 'Make a sailboat with two sails.', // 25.16
    pcs: [[4, 0, 6, 0], [6, 0, 2, 0], [4, 0, 2, 0], [5, 0, [0, 2], [0, 2]],
      [3, 0, [0, 6], 0], [1, 0, [0, 3], [0, -1]], [3, 0, [0, 8], 0]] },
  { id: 'house', name: 'House', say: 'Make a house with a big roof.', // 25.81
    pcs: [[1, 0, 0, 0], [5, 0, [0, 4], [0, 4]], [1, 0, [0, 2], [0, -4]], [7, 0, [0, -2], 0],
      [1, 0, [0, 2], [0, -2]], [5, 0, [0, 1], [0, 1]], [5, 1, [0, 2], [0, -2]]] },
  { id: 'snail', name: 'Snail', say: 'Make a snail with a shell on its back.', // 25.99
    pcs: [[7, 0, [0, -2], [0, 4]], [1, 0, [0, 2], 0], [5, 0, [0, 2], [0, 6]], [1, 0, 0, [0, 4]],
      [7, 0, [0, 2], [0, 6]], [1, 0, [0, 5], [0, 3]], [3, 1, [0, 6], [0, 6]]] },
  { id: 'key', name: 'Key', say: 'Make a key for a door.', // 26.97
    pcs: [[5, 0, [0, 4], [0, 4]], [1, 0, 0, 0], [5, 0, [0, 8], [0, 5]], [1, 0, [0, 4], [0, 1]],
      [5, 0, [0, 8], [0, 3]], [1, 0, [0, 9], 0], [1, 1, [0, 8], [0, 3]]] },
  { id: 'kangaroo', name: 'Kangaroo', say: 'Make a kangaroo with a long tail.', // 28.14
    pcs: [[7, 0, [0, 2], [0, 4]], [1, 0, 0, [0, 2]], [5, 0, [0, 2], [0, 4]], [1, 0, [0, 6], [0, -2]],
      [3, 0, [0, 8], [0, 2]], [1, 0, [0, 7], [0, -1]], [1, 1, [0, 6], [0, 6]]] },
  { id: 'fish', name: 'Fish', say: 'Make a fish with a big tail.', // 28.31
    pcs: [[4, 0, 4, 0], [0, 0, 0, 0], [7, 0, 4, 0], [0, 0, 3, -1],
      [4, 0, 5, 1], [0, 0, 2, 1], [0, 0, 2, -2]] },
  { id: 'teapot', name: 'Teapot', say: 'Make a teapot with a spout and a lid.', // 28.49
    pcs: [[5, 0, [0, 6], [0, 6]], [1, 0, [0, 2], [0, 2]], [1, 0, [0, 4], 0], [7, 0, 0, [0, 4]],
      [5, 0, [0, 2], [0, 6]], [1, 0, [0, 4], [0, 5]], [3, 1, [0, 6], [0, 6]]] },
  { id: 'candle', name: 'Candle', say: 'Make a candle with a little flame.', // 29.47
    pcs: [[5, 0, [0, 4], [0, 6]], [1, 0, 0, [0, 2]], [5, 0, [0, 2], [0, 8]], [1, 0, 0, [0, 6]],
      [7, 0, [0, 2], [0, 8]], [1, 0, [0, 2], [0, 7]], [1, 1, [0, 3], [0, 2]]] },
  { id: 'butterfly', name: 'Butterfly', say: 'Make a butterfly with big wings.', // 29.66
    pcs: [[7, 0, [0, -4], [0, 4]], [1, 0, [0, 2], 0], [5, 0, [0, -2], [0, 6]], [5, 0, [0, 4], [0, 6]],
      [3, 0, [0, 6], [0, 4]], [1, 0, [0, 1], [0, 1]], [1, 1, [0, 4], [0, 6]]] },
  { id: 'boot', name: 'Boot', say: 'Make a boot for rainy days.', // 29.97
    pcs: [[5, 0, [0, 4], [0, 6]], [1, 0, 0, [0, 2]], [5, 0, [0, 2], [0, 8]], [1, 0, 0, [0, 6]],
      [7, 0, [0, 2], [0, 8]], [1, 0, [0, 5], [0, 5]], [1, 1, [0, 3], [0, 2]]] },
  { id: 'bird', name: 'Bird', say: 'Make a bird flying.', // 29.99
    pcs: [[7, 0, 0, [0, 4]], [3, 0, [0, 8], [0, 2]], [5, 0, [0, 2], [0, 2]], [3, 0, [0, 8], 0],
      [5, 0, [0, 4], [0, 6]], [1, 0, [0, 5], [0, -1]], [3, 0, [0, 2], [0, 4]]] },
  { id: 'fox', name: 'Fox', say: 'Make a fox face with big pointy ears.', // 30.14
    pcs: [[7, 0, [0, 2], [0, 4]], [3, 0, [0, 6], [0, 4]], [5, 0, [0, 2], [0, 4]], [1, 0, 0, 0],
      [7, 0, [0, 2], [0, 8]], [1, 0, [0, 1], [0, 5]], [1, 0, 0, [0, 2]]] },
  { id: 'umbrella', name: 'Umbrella', say: 'Make an umbrella for the rain.', // 30.31
    pcs: [[7, 0, 0, [0, 4]], [1, 0, [0, 4], 0], [5, 0, [0, 6], [0, 8]], [1, 0, [0, 8], [0, 2]],
      [5, 0, [0, 8], [0, 4]], [1, 0, [0, 5], [0, 3]], [1, 1, [0, 8], [0, 2]]] },
  { id: 'seal', name: 'Seal', say: 'Make a seal with a ball on its nose.', // 30.31
    pcs: [[5, 0, [0, 4], [0, 6]], [1, 0, 0, [0, 2]], [7, 0, [0, -2], [0, 4]], [3, 0, [0, 8], 0],
      [1, 0, [0, 4], [0, 4]], [1, 0, [0, 7], [0, -3]], [3, 1, [0, 4], [0, 4]]] },
  { id: 'plane', name: 'Plane', say: 'Make a plane flying in the sky.', // 30.31
    pcs: [[1, 0, 0, [0, -2]], [3, 0, [0, 6], [0, 4]], [3, 0, [0, 8], [0, 3]], [1, 0, 0, [0, 2]],
      [5, 0, [0, 4], [0, 4]], [1, 0, [0, 5], [0, 1]], [1, 1, [0, 4], [0, 4]]] },
  { id: 'rocket', name: 'Rocket', say: 'Make a rocket flying up to the stars.', // 30.81
    pcs: [[1, 0, 0, 0], [5, 0, [0, 4], [0, 4]], [1, 0, [0, 2], [0, -2]], [7, 0, [0, -2], [0, 4]],
      [1, 0, [0, 4], [0, 2]], [1, 0, [0, 2], [0, 3]], [3, 0, [0, 3], [0, 6]]] },
  { id: 'flag', name: 'Flag', say: 'Make a flag on a pole.', // 30.88
    pcs: [[5, 0, [0, 6], [0, 4]], [1, 0, [0, 2], 0], [7, 0, 0, [0, 2]], [3, 0, [0, 2], 0],
      [1, 0, 0, [0, 2]], [1, 0, [0, 1], [0, 3]], [1, 1, [0, 3], [0, 8]]] },
  { id: 'lightning', name: 'Lightning', say: 'Make a lightning bolt.', // 30.99
    pcs: [[3, 0, [0, 6], 0], [7, 0, 0, [0, 6]], [5, 0, [0, 2], [0, 8]], [1, 0, [0, 4], [0, -4]],
      [3, 0, [0, 6], [0, 4]], [1, 0, [0, 5], [0, 1]], [3, 0, [0, 6], [0, -2]]] },
  { id: 'pine', name: 'Pine tree', say: 'Make a pine tree.', // 31.31
    pcs: [[7, 0, [0, -2], [0, 4]], [1, 0, [0, 4], 0], [1, 0, [0, 3], [0, -2]], [5, 0, [0, 4], [0, 2]],
      [1, 0, [0, 2], [0, 2]], [1, 0, [0, 3], [0, 3]], [1, 0, [0, 2], 0]] },
  { id: 'seahorse', name: 'Seahorse', say: 'Make a seahorse.', // 31.31
    pcs: [[1, 0, 0, [0, -4]], [3, 0, [0, 4], 0], [5, 0, [0, 2], [0, -2]], [7, 0, 0, [0, 4]],
      [7, 0, [0, -2], [0, 2]], [1, 0, [0, -1], [0, 1]], [1, 1, [0, 4], [0, 6]]] },
  { id: 'camel', name: 'Camel', say: 'Make a camel with a hump.', // 31.49
    pcs: [[7, 0, 0, [0, 4]], [1, 0, [0, 4], 0], [5, 0, [0, 6], [0, 6]], [5, 0, [0, 8], [0, 4]],
      [3, 0, [0, 2], [0, 4]], [1, 0, [0, 7], [0, -1]], [3, 0, [0, 10], [0, -2]]] },
  { id: 'arrow', name: 'Arrow', say: 'Make an arrow pointing the way.', // 31.64
    pcs: [[3, 0, [0, 10], [0, 2]], [1, 0, [0, 6], [0, -2]], [7, 0, [0, -2], [0, 2]], [1, 0, 0, [0, 1]],
      [5, 0, [0, 4], [0, 3]], [1, 0, [0, 5], 0], [1, 1, [0, 4], [0, 3]]] },
  { id: 'train', name: 'Train', say: 'Make a train engine with a chimney.', // 31.8
    pcs: [[5, 0, [0, 4], [0, 4]], [1, 0, 0, 0], [5, 0, [0, 6], [0, 4]], [1, 0, [0, 4], [0, 2]],
      [7, 0, [0, 6], [0, 4]], [1, 0, [0, 7], [0, -1]], [1, 0, [0, 8], [0, 2]]] },
  { id: 'robot', name: 'Robot', say: 'Make a robot waving its arm.', // 32.31
    pcs: [[5, 0, [0, 4], [0, 6]], [1, 0, 0, [0, 2]], [7, 0, [0, -2], [0, 4]], [3, 0, [0, 2], [0, 6]],
      [5, 0, [0, 4], [0, 8]], [1, 0, [0, 2], [0, -1]], [1, 0, [0, 4], [0, 2]]] },
  { id: 'cat', name: 'Cat', say: 'Make a cat sitting up, with pointy ears and a tail.', // 32.49
    pcs: [[4, 0, 4, 4], [2, 0, 4, 0], [0, 0, 0, 2], [6, 0, 2, 0],
      [2, 0, 4, -2], [0, 0, 2, -1], [6, 0, 4, 4]] },
  { id: 'rabbit', name: 'Rabbit', say: 'Make a rabbit with a long ear and a fluffy tail.', // 32.49
    pcs: [[4, 0, 4, 4], [2, 0, 4, 0], [0, 0, 0, 2], [2, 0, 4, -2],
      [6, 0, 4, 4], [0, 0, 2, -1], [6, 0, 2, 0]] },
  { id: 'swan', name: 'Swan', say: 'Make a swan with a long neck.', // 32.66
    pcs: [[5, 0, [0, 4], [0, 4]], [3, 0, [0, 8], 0], [1, 0, [0, 4], [0, -2]], [7, 0, [0, 6], 0],
      [7, 0, [0, -4], [0, -2]], [1, 0, [0, -1], [0, -5]], [5, 1, [0, -2], [0, -2]]] },
  { id: 'duck', name: 'Duck', say: 'Make a duck swimming on a pond.', // 32.97
    pcs: [[3, 0, [0, 10], 0], [7, 0, [0, 4], [0, 6]], [5, 0, [0, 4], [0, 8]], [1, 0, 0, [0, 2]],
      [3, 0, [0, 4], [0, 4]], [1, 0, [0, 1], [0, 3]], [3, 0, [0, 6], [0, 4]]] },
  { id: 'whale', name: 'Whale', say: 'Make a whale with a big tail.', // 33.23
    pcs: [[3, 0, [0, 4], 0], [7, 0, 0, [0, 4]], [3, 0, [0, 8], [0, 3]], [1, 0, [0, 4], 0],
      [3, 0, [0, 4], [0, 4]], [1, 0, [0, 5], [0, 1]], [1, 1, [0, 5], 0]] },
  { id: 'pig', name: 'Pig', say: 'Make a pig with a curly tail.', // 33.73
    pcs: [[5, 0, [0, 4], [0, 4]], [1, 0, 0, 0], [1, 0, [0, 3], [0, -2]], [3, 0, [0, 2], [0, 4]],
      [5, 0, [0, 4], [0, 6]], [1, 0, [0, 5], 0], [1, 0, [0, -2], [0, -2]]] },
  { id: 'dinosaur', name: 'Dinosaur', say: 'Make a dinosaur with plates on its back.', // 33.97
    pcs: [[7, 0, 0, [0, 4]], [1, 0, [0, 4], 0], [5, 0, [0, 2], [0, 2]], [3, 0, [0, 2], [0, 2]],
      [5, 0, [0, 8], [0, 6]], [1, 0, [0, 2], [0, 3]], [1, 1, [0, 10], [0, 4]]] },
  { id: 'turtle', name: 'Turtle', say: 'Make a turtle out for a walk.', // 36.47
    pcs: [[7, 0, 0, 0], [1, 0, [0, 4], [0, -4]], [5, 0, 0, 0], [0, 0, [0, 1], 0],
      [0, 0, [-1, 8], -1], [0, 0, [-1, -2], [0, -2]], [0, 0, 3, 0]] },
];
/* Riddles bank (P3-14, BRAIN_TEASERS 5.9). Data only; read by src/js/81-bt-riddle.js inside functions (A11).
   RIDDLES[band] = 36 riddles, easiest first; level L (1-12) plays riddles 3(L-1) to 3L-1, so a band's set is used up before
   any riddle repeats. A riddle: {q: the riddle (read aloud), a: the answer, d: wrong choices, h: [tier 1 nudge, tier 2 strong clue]}.
     A (PK-K)  "Who am I?" / "What am I?" with 3 picture choices: a and d are picture names (RIDDLES.pics), no reading needed
     B (1-2)   simple riddles, 4 choices, each a picture with its word
     C (3-4)   wordplay, 4 word choices
     D (5-6)   lateral thinking and number riddles, 4 word choices
   Rules (checked in tools/test.js "riddles, memory, copy cat P3-14"): one clear answer; the wrong choices are different from the
   answer and from each other and are not also a fair answer; the answer (and its number word) is not in the riddle or its hints;
   sentence and riddle length per band; every word passes BAD; every picture is a picFor name with an allow-listed emoji.
   Original wording; a few are retold folk riddles. Nothing scary, rude or culturally narrow. */
var RIDDLES = {
  // picture name -> emoji fallback for picFor(name, emoji) (tools/emoji-allow.txt); names with a drawing in ART show it
  pics: {
    ant: '🐜', apple: '🍎', ball: '⚽', banana: '🍌', bat: '🦇', bed: '🛏', bee: '🐝', bell: '🔔', bike: '🚲', bird: '🐦',
    book: '📖', box: '📦', bread: '🍞', bus: '🚌', butterfly: '🦋', cake: '🎂', car: '🚗', cat: '🐱', cheese: '🧀', clock: '🕐',
    cloud: '☁', coat: '🧥', cookie: '🍪', cow: '🐄', crown: '👑', cup: '☕', dice: '🎲', dog: '🐶', dolphin: '🐬', drum: '🥁',
    duck: '🦆', ear: '👂', egg: '🥚', elephant: '🐘', 'fire-engine': '🚒', fish: '🐟', flag: '🚩', flower: '🌼', foot: '🦶',
    frog: '🐸', gift: '🎁', giraffe: '🦒', grapes: '🍇', hand: '✋', hat: '🎩', helicopter: '🚁', hen: '🐔', icecream: '🍦',
    kite: '🪁', map: '🗺', milk: '🥛', moon: '🌙', mouse: '🐭', nose: '👃', octopus: '🐙', owl: '🦉', pencil: '✏', penguin: '🐧',
    pig: '🐷', pizza: '🍕', plane: '✈', rainbow: '🌈', ring: '💍', robot: '🤖', rocket: '🚀', shell: '🐚', ship: '🚢',
    snail: '🐌', snowman: '⛄', sock: '🧦', spoon: '🥄', sponge: '🧽', star: '⭐', sun: '☀', teddy: '🧸', tent: '⛺',
    tooth: '🦷', tractor: '🚜', tree: '🌳', turtle: '🐢', watermelon: '🍉', web: '🕸',
  },
  // how a picture name is said and written when it is not the plain name
  names: { 'fire-engine': 'fire engine', icecream: 'ice cream', teddy: 'teddy bear' },
  A: [
    { q: 'I live on a farm. I say moo. I give you milk. Who am I?', a: 'cow', d: ['pig', 'duck'],
      h: ['Think of a big farm animal.', 'Moo! It has spots and eats grass.'] },
    { q: 'I wag my tail. I say woof. I love to play fetch. Who am I?', a: 'dog', d: ['cat', 'duck'],
      h: ['Think of a pet.', 'Woof, woof! It barks at the door.'] },
    { q: 'I say meow. I purr when I am happy. Who am I?', a: 'cat', d: ['dog', 'cow'],
      h: ['Think of a pet.', 'It has soft fur and long whiskers.'] },
    { q: 'I swim on the pond. I say quack. Who am I?', a: 'duck', d: ['pig', 'cat'],
      h: ['Think of a bird.', 'Quack, quack! It has webbed feet.'] },
    { q: 'I am pink. I roll in the mud. I say oink. Who am I?', a: 'pig', d: ['cow', 'hen'],
      h: ['Think of a farm animal.', 'Oink! It has a curly tail.'] },
    { q: 'I am green. I hop and I say ribbit. Who am I?', a: 'frog', d: ['duck', 'cat'],
      h: ['It lives near a pond.', 'Ribbit! It jumps from lily pad to lily pad.'] },
    { q: 'I live on a farm. I lay eggs. I say cluck. Who am I?', a: 'hen', d: ['pig', 'dog'],
      h: ['Think of a bird on a farm.', 'Cluck, cluck! It sits on its eggs to keep them warm.'] },
    { q: 'I buzz from flower to flower. I make honey. Who am I?', a: 'bee', d: ['fish', 'cow'],
      h: ['It is a small bug that flies.', 'Buzz, buzz! It has yellow and black stripes.'] },
    { q: 'I am awake at night. I say hoo, hoo. Who am I?', a: 'owl', d: ['duck', 'pig'],
      h: ['Think of a bird.', 'It has big round eyes and sits in a tree at night.'] },
    { q: 'I live in the water. I have fins, not legs. Who am I?', a: 'fish', d: ['dog', 'hen'],
      h: ['It swims.', 'It has scales and swims all day long.'] },
    { q: 'I am a long yellow fruit. Monkeys love me. What am I?', a: 'banana', d: ['apple', 'grapes'],
      h: ['Think of a fruit.', 'You peel it before you eat it.'] },
    { q: 'I am red and crunchy. I grow on a tree. What am I?', a: 'apple', d: ['banana', 'cheese'],
      h: ['Think of a fruit.', 'It is round. It crunches when you bite it.'] },
    { q: 'I am big and hot. I shine in the sky all day. What am I?', a: 'sun', d: ['moon', 'cake'],
      h: ['Look up in the sky.', 'It keeps us warm in the day.'] },
    { q: 'I shine in the night sky. Sometimes I am round and sometimes I am thin. What am I?', a: 'moon', d: ['sun', 'tree'],
      h: ['Look up at night.', 'It glows at night. Sometimes it looks like a smile.'] },
    { q: 'I twinkle in the dark sky. When you draw me, I have five points. What am I?', a: 'star', d: ['sun', 'ball'],
      h: ['Look up at night.', 'Twinkle, twinkle, little ...'] },
    { q: 'I am very slow. I carry my house on my back. Who am I?', a: 'snail', d: ['bee', 'dog'],
      h: ['It is a small animal.', 'It has a shell and leaves a shiny trail.'] },
    { q: 'I am big and grey. I have a long trunk. Who am I?', a: 'elephant', d: ['mouse', 'duck'],
      h: ['Think of a very big animal.', 'It sprays water with its long nose.'] },
    { q: 'I have a very long neck. I eat leaves from tall trees. Who am I?', a: 'giraffe', d: ['pig', 'frog'],
      h: ['Think of a very tall animal.', 'It has spots and the longest neck of all.'] },
    { q: 'I am a bird, but I cannot fly. I swim in icy water. Who am I?', a: 'penguin', d: ['owl', 'cat'],
      h: ['It lives where it is very cold.', 'It is black and white and waddles on the ice.'] },
    { q: 'I have a hard shell. I walk slowly and I can swim. Who am I?', a: 'turtle', d: ['bee', 'cat'],
      h: ['It is a slow animal.', 'It can hide its head inside its shell.'] },
    { q: 'A hen lays me. You can crack me. A chick can come out of me. What am I?', a: 'egg', d: ['apple', 'ball'],
      h: ['Think of breakfast.', 'It is white or brown on the outside and yellow in the middle.'] },
    { q: 'I am sweet. On your birthday I have candles on top. What am I?', a: 'cake', d: ['bread', 'milk'],
      h: ['Think of a party.', 'You blow out the candles on it and make a wish.'] },
    { q: 'I am tall. I have leaves. Birds build nests in me. What am I?', a: 'tree', d: ['car', 'cake'],
      h: ['Look outside in the park.', 'It has a trunk and branches.'] },
    { q: 'I grow in a garden. I smell nice. Bees visit me. What am I?', a: 'flower', d: ['hat', 'bus'],
      h: ['It grows in the ground.', 'It has pretty petals of many colours.'] },
    { q: 'I come after the rain. I have many colours. I look like a bridge in the sky. What am I?', a: 'rainbow', d: ['moon', 'tree'],
      h: ['Look up when the sun comes out after a shower.', 'Red, orange, yellow, green, blue and purple, all in an arch.'] },
    { q: 'Children make me out of snow. I have a carrot nose. What am I?', a: 'snowman', d: ['teddy', 'robot'],
      h: ['Think of winter.', 'It melts when the sun comes out.'] },
    { q: 'I am round. You can kick me, throw me and bounce me. What am I?', a: 'ball', d: ['box', 'hat'],
      h: ['Think of a toy.', 'It bounces up and down.'] },
    { q: 'I am soft and furry. I am a toy. I sleep in your bed with you. What am I?', a: 'teddy', d: ['ball', 'drum'],
      h: ['Think of a cuddly toy.', 'It is a toy bear.'] },
    { q: 'Hit me with sticks. Boom, boom, boom! What am I?', a: 'drum', d: ['cup', 'ball'],
      h: ['It makes music.', 'Bang it to make a loud sound.'] },
    { q: 'I have two wheels. You push my pedals to go. What am I?', a: 'bike', d: ['car', 'bus'],
      h: ['You ride it.', 'It has two wheels and a bell.'] },
    { q: 'I zoom up into space. Three, two, one, blast off! What am I?', a: 'rocket', d: ['car', 'ship'],
      h: ['It goes very, very high.', 'It flies all the way to the moon.'] },
    { q: 'I float on the sea. I carry people across the water. What am I?', a: 'ship', d: ['car', 'bike'],
      h: ['It goes on water.', 'It is a very big boat.'] },
    { q: 'You sleep on me at night. I have a pillow and a blanket. What am I?', a: 'bed', d: ['cup', 'car'],
      h: ['Think of your bedroom.', 'You lie down on it to sleep.'] },
    { q: 'You wear me on your head. I keep the sun off your face. What am I?', a: 'hat', d: ['sock', 'cup'],
      h: ['You wear it.', 'It goes on top of your head.'] },
    { q: 'I have a face and two hands. I tell you the time. What am I?', a: 'clock', d: ['book', 'cup'],
      h: ['Look on the wall.', 'Tick, tock, tick, tock!'] },
    { q: 'I am white and hard. I live in your mouth. You brush me. What am I?', a: 'tooth', d: ['nose', 'hand'],
      h: ['It is a part of you.', 'You chew your food with it.'] },
  ],
  B: [
    { q: 'What has hands but cannot clap?', a: 'clock', d: ['book', 'bell', 'sock'],
      h: ['Its hands move round and round.', 'It tells you the time.'] },
    { q: 'What has to be broken before you can use it?', a: 'egg', d: ['cup', 'box', 'ball'],
      h: ['Think of breakfast.', 'A hen lays it.'] },
    { q: 'I have a trunk, but I am not an elephant. I have leaves, but I am not a book. What am I?', a: 'tree', d: ['elephant', 'book', 'flower'],
      h: ['It grows in the park.', 'Birds build nests in its branches.'] },
    { q: 'I come out at night. I twinkle far, far away. What am I?', a: 'star', d: ['sun', 'kite', 'bell'],
      h: ['Look up at night.', 'Twinkle, twinkle, little ...'] },
    { q: 'I am full of holes, but I can still hold water. What am I?', a: 'sponge', d: ['book', 'sock', 'hat'],
      h: ['You use it to wash.', 'It is soft and soaks up water.'] },
    { q: 'I have four legs, but I cannot walk. You sleep on me. What am I?', a: 'bed', d: ['cat', 'cup', 'kite'],
      h: ['Think of your bedroom.', 'It has a pillow and a blanket.'] },
    { q: 'I have a carrot nose and coal eyes. When the sun comes out, I melt. What am I?', a: 'snowman', d: ['teddy', 'robot', 'cake'],
      h: ['Think of winter.', 'Children build it out of snow.'] },
    { q: 'I have a sharp point. I help you write and draw. You can erase what I make. What am I?', a: 'pencil', d: ['spoon', 'sock', 'flag'],
      h: ['You use it at school.', 'It often has an eraser on its end.'] },
    { q: 'I show up when the sun shines after the rain. I have seven colours. What am I?', a: 'rainbow', d: ['cloud', 'moon', 'kite'],
      h: ['Look up in the sky.', 'It is a colourful arch.'] },
    { q: 'Ding, dong! I ring to tell you that someone is at the door. What am I?', a: 'bell', d: ['drum', 'kite', 'sock'],
      h: ['Listen for it.', 'You press a button by the door to make it ring.'] },
    { q: 'I am cold and sweet. I sit in a cone. Eat me fast before I melt! What am I?', a: 'icecream', d: ['cake', 'cookie', 'milk'],
      h: ['Think of a treat on a hot day.', 'It comes in scoops.'] },
    { q: 'I start as a little crawling bug. Then I sleep in a case. I wake up with pretty wings. What am I?', a: 'butterfly', d: ['bee', 'bird', 'snail'],
      h: ['It flies from flower to flower.', 'A caterpillar turns into one.'] },
    { q: 'I sleep upside down all day. At night I fly out to catch bugs. What am I?', a: 'bat', d: ['duck', 'frog', 'fish'],
      h: ['It flies at night.', 'It hangs by its feet in a cave.'] },
    { q: 'I live in the sea. I have eight long arms. What am I?', a: 'octopus', d: ['fish', 'dolphin', 'turtle'],
      h: ['It has lots of arms.', 'It can squirt ink to hide.'] },
    { q: 'A spider spins me out of silk. I catch flies. What am I?', a: 'web', d: ['box', 'tent', 'kite'],
      h: ['Look in a corner of the shed.', 'It is sticky and has lots of thin threads.'] },
    { q: 'You sleep in me when you go camping. I fold up small. What am I?', a: 'tent', d: ['box', 'car', 'ship'],
      h: ['Think of camping.', 'You put it up with poles and pegs.'] },
    { q: 'I am made from milk. I am yellow and I may have holes. Mice love me. What am I?', a: 'cheese', d: ['bread', 'egg', 'cake'],
      h: ['It is a food.', 'You put it on pizza.'] },
    { q: 'I have a spine, but I have no bones. I am full of pages. What am I?', a: 'book', d: ['fish', 'hand', 'bed'],
      h: ['You read it.', 'It has a cover and a story inside.'] },
    { q: 'You wear me over your clothes when it is cold outside. What am I?', a: 'coat', d: ['crown', 'ring', 'drum'],
      h: ['You wear it.', 'It has sleeves and buttons.'] },
    { q: 'I am up in the sky. I give you light and keep you warm. What am I?', a: 'sun', d: ['moon', 'cloud', 'kite'],
      h: ['Look up in the day.', 'It is a big, hot ball of fire far away.'] },
    { q: 'I float in the sky. I am white and fluffy. Sometimes I bring rain. What am I?', a: 'cloud', d: ['sun', 'star', 'kite'],
      h: ['Look up in the sky.', 'It looks like cotton wool.'] },
    { q: 'I am round and flat. I have cheese and sauce on top. You eat me in slices. What am I?', a: 'pizza', d: ['cake', 'apple', 'milk'],
      h: ['It is a food.', 'It is baked in a very hot oven.'] },
    { q: 'I am green on the outside and red on the inside. I have black seeds. What am I?', a: 'watermelon', d: ['apple', 'banana', 'cheese'],
      h: ['It is a fruit.', 'It is big, round and very juicy.'] },
    { q: 'I have six sides and lots of dots. You roll me in games. What am I?', a: 'dice', d: ['ball', 'cup', 'book'],
      h: ['You play games with it.', 'Roll it to see how many steps to move.'] },
    { q: 'You find me on the beach. Hold me to your ear to hear the sea. What am I?', a: 'shell', d: ['ball', 'hat', 'bus'],
      h: ['Look on the sand.', 'A sea animal once lived inside it.'] },
    { q: 'I am made of metal. I beep and do what I am told. I am not alive. What am I?', a: 'robot', d: ['teddy', 'dog', 'cat'],
      h: ['It is a machine.', 'It has lights, buttons and metal arms.'] },
    { q: 'I am tiny. I live in a hill with lots of friends. I can carry big crumbs. What am I?', a: 'ant', d: ['dog', 'cow', 'fish'],
      h: ['It is a small bug.', 'It walks in a long line with the others.'] },
    { q: 'I work on a farm. I have big back wheels. I pull heavy things. What am I?', a: 'tractor', d: ['bus', 'bike', 'ship'],
      h: ['It is on a farm.', 'A farmer drives it across the fields.'] },
    { q: 'I race to help. I am red, with a long ladder and a loud siren. What am I?', a: 'fire-engine', d: ['bus', 'tractor', 'bike'],
      h: ['It helps people.', 'It carries water to put out fires.'] },
    { q: 'I fly, but I have no wings. My blades spin round on top. What am I?', a: 'helicopter', d: ['plane', 'bird', 'kite'],
      h: ['It flies.', 'It can go straight up and straight down.'] },
    { q: 'A king or a queen wears me on their head. I am gold and shiny. What am I?', a: 'crown', d: ['ring', 'sock', 'cup'],
      h: ['Think of a castle.', 'It has points and jewels.'] },
    { q: 'I am baked in an oven. You slice me and spread butter or jam on me. What am I?', a: 'bread', d: ['cheese', 'egg', 'apple'],
      h: ['It is a food.', 'You make sandwiches with it.'] },
    { q: 'I have four fingers and a thumb. I help you hold things. What am I?', a: 'hand', d: ['foot', 'nose', 'ear'],
      h: ['It is a part of you.', 'You wave it to say hello.'] },
    { q: 'I fly high on a long string on a windy day. What am I?', a: 'kite', d: ['ball', 'ship', 'bird'],
      h: ['Take it to the park.', 'It has a long tail and dances in the wind.'] },
    { q: 'I show you the way. I have roads and rivers, but I am flat. What am I?', a: 'map', d: ['kite', 'flag', 'cup'],
      h: ['You use it on a trip.', 'It shows where places are.'] },
    { q: 'I am wrapped in paper with a bow. You open me on your birthday. What am I?', a: 'gift', d: ['cake', 'moon', 'tree'],
      h: ['Think of a party.', 'There is a surprise inside.'] },
  ],
  C: [
    { q: 'What has lots of keys but cannot open a single lock?', a: 'a piano', d: ['a door', 'a car', 'a box'],
      h: ['Think of music.', 'You press its black and white keys to play a tune.'] },
    { q: 'What has a neck but no head?', a: 'a bottle', d: ['a giraffe', 'a ball', 'a book'],
      h: ['Think of something you drink from.', 'You pour juice out of its narrow top.'] },
    { q: 'What has one eye but cannot see?', a: 'a needle', d: ['an owl', 'a cat', 'a spoon'],
      h: ['Think of sewing.', 'Thread goes through its tiny hole.'] },
    { q: 'What gets wetter the more it dries?', a: 'a towel', d: ['the sun', 'the wind', 'a cloud'],
      h: ['Think of bath time.', 'You use it after a shower.'] },
    { q: 'What can you catch but never throw?', a: 'a cold', d: ['a ball', 'a stick', 'a stone'],
      h: ['It is not a thing you can hold.', 'It can make you sneeze and cough.'] },
    { q: 'What goes up every year but never comes down?', a: 'your age', d: ['a ball', 'a kite', 'a plane'],
      h: ['It changes on your birthday.', 'It is how old you are.'] },
    { q: 'What has many teeth but cannot bite?', a: 'a comb', d: ['a shark', 'a dog', 'a lion'],
      h: ['Think of your hair.', 'You pull it through your hair to make it neat.'] },
    { q: 'What can travel around the world while staying in a corner?', a: 'a stamp', d: ['a plane', 'a ship', 'a bird'],
      h: ['Think of letters in the mail.', 'It sits in the corner of an envelope.'] },
    { q: 'What is full of holes but still catches fish?', a: 'a net', d: ['a bucket', 'a fishing rod', 'a boat'],
      h: ['Think of fishing.', 'It is made of string tied in knots.'] },
    { q: 'The more you take, the more you leave behind. What are they?', a: 'footsteps', d: ['cookies', 'coins', 'books'],
      h: ['Think of walking.', 'You leave them in the sand or the snow.'] },
    { q: 'What belongs to you, but other people use it more than you do?', a: 'your name', d: ['your bike', 'your bed', 'your toys'],
      h: ['Other people call it out.', 'Your friends say it when they call you.'] },
    { q: 'What runs but never walks, and has a bed but never sleeps?', a: 'a river', d: ['a dog', 'a clock', 'a horse'],
      h: ['Think of water.', 'It flows all the way to the sea.'] },
    { q: 'I have cities but no houses, forests but no trees, and water but no fish. What am I?', a: 'a map', d: ['a book', 'a zoo', 'a park'],
      h: ['You use it to find your way.', 'It shows places, drawn flat on paper.'] },
    { q: 'What has a thumb and four fingers but is not alive?', a: 'a glove', d: ['a hand', 'a sock', 'a hat'],
      h: ['You wear it.', 'You put it on to keep your hand warm on a cold day.'] },
    { q: 'What kind of room has no doors and no windows?', a: 'a mushroom', d: ['a bedroom', 'a classroom', 'a bathroom'],
      h: ['This room is not in a house.', 'It grows in the forest after the rain.'] },
    { q: 'What can fill a whole room but takes up no space?', a: 'light', d: ['water', 'boxes', 'a bed'],
      h: ['Think of what helps you see.', 'You switch it on when it is dark.'] },
    { q: 'What has a head and a tail but no body?', a: 'a coin', d: ['a snake', 'a dog', 'a fish'],
      h: ['You can flip it.', 'You can buy things with it.'] },
    { q: 'What building has the most stories?', a: 'a library', d: ['a house', 'a garage', 'a shed'],
      h: ['A story can be a floor or a book.', 'You borrow books there.'] },
    { q: 'What has words but never speaks?', a: 'a book', d: ['a parrot', 'a radio', 'a teacher'],
      h: ['Think of reading.', 'It has pages and a cover.'] },
    { q: 'What gets bigger the more you take away from it?', a: 'a hole', d: ['a cake', 'a pile', 'a bucket'],
      h: ['Think of digging.', 'You dig it with a spade.'] },
    { q: 'What can you break without ever touching it?', a: 'a promise', d: ['a plate', 'a glass', 'a stick'],
      h: ['It is something you say.', 'You say you will do something, and then you must do it.'] },
    { q: 'What goes through towns and up hills but never moves?', a: 'a road', d: ['a car', 'a bus', 'a horse'],
      h: ['Cars drive on it.', 'It is made of stone and tar.'] },
    { q: 'What has ears but cannot hear?', a: 'corn', d: ['a rabbit', 'a dog', 'a cat'],
      h: ['It is a plant.', 'It is yellow and you can eat it off the cob.'] },
    { q: 'What has a tongue but cannot taste, and goes on your foot?', a: 'a shoe', d: ['a sock', 'a glove', 'a hat'],
      h: ['You wear it.', 'You tie its laces.'] },
    { q: 'I am an odd number. Take away one letter and I become even. What number am I?', a: 'seven', d: ['three', 'five', 'nine'],
      h: ['Spell each number.', 'Take away the first letter and read what is left.'] },
    { q: 'Which letter of the alphabet is a drink?', a: 'T', d: ['B', 'C', 'I'],
      h: ['Say each letter out loud.', 'It sounds like a hot drink you can have with milk.'] },
    { q: 'What kind of tree can you carry in your hand?', a: 'a palm', d: ['an oak', 'a pine', 'an apple tree'],
      h: ['Look at your hand.', 'It is also the name of the inside of your hand.'] },
    { q: 'What goes up when the rain comes down?', a: 'an umbrella', d: ['a kite', 'a balloon', 'a flag'],
      h: ['It keeps you dry.', 'You open it over your head.'] },
    { q: 'What has one head, one foot and four legs?', a: 'a bed', d: ['a dog', 'a chair', 'a horse'],
      h: ['You use it every night.', 'You lay your head on its pillow.'] },
    { q: 'In a big cave I repeat everything you shout, but I have no mouth. What am I?', a: 'an echo', d: ['a bat', 'a bell', 'a drum'],
      h: ['Listen in a cave or a valley.', 'It is your own voice bouncing back.'] },
    { q: 'What is at the end of time and at the end of space?', a: 'the letter E', d: ['the letter T', 'the letter S', 'the moon'],
      h: ['Look at the words, not at the sky.', 'Spell time and space. How do they end?'] },
    { q: 'I am tall when I am young and short when I am old. I glow. What am I?', a: 'a candle', d: ['a tree', 'a pencil', 'a flower'],
      h: ['It gives light.', 'You light it on a birthday cake.'] },
    { q: 'I make you cry, but I never tell a sad story. What am I?', a: 'an onion', d: ['a movie', 'a sad book', 'a teddy bear'],
      h: ['It is a vegetable.', 'You cut it up and your eyes water.'] },
    { q: 'I let light in but keep the wind out. You can see through me. What am I?', a: 'a window', d: ['a door', 'a wall', 'a curtain'],
      h: ['Look at your house.', 'It is made of glass.'] },
    { q: 'What starts with E, ends with E, and has only one letter inside?', a: 'an envelope', d: ['an eagle', 'an engine', 'an elephant'],
      h: ['Think of the mail.', 'You put a letter inside it before you post it.'] },
    { q: 'I follow you all day, but I vanish in the dark. What am I?', a: 'your shadow', d: ['your dog', 'your cat', 'your friend'],
      h: ['Stand in the sun.', 'It is dark and shaped just like you.'] },
  ],
  D: [
    { q: 'Some months have 31 days and some have 30. How many months have 28 days?', a: 'All 12', d: ['Just 1', '2', 'None'],
      h: ['Read the question very carefully.', 'Does January have 28 days in it? Does March?'] },
    { q: 'I am a two-digit number whose tens digit is twice its ones digit, and my digits add up to 9. What am I?', a: '63', d: ['36', '42', '81'],
      h: ['Try numbers whose digits add up to 9.', 'One digit is 2 times the other, so the digits are 6 and 3. Which way round?'] },
    { q: 'If you have me, you want to share me. Once you share me, you do not have me any more. What am I?', a: 'A secret', d: ['A joke', 'A song', 'A smile'],
      h: ['It is something you know.', 'Once you tell it, it is not hidden any more.'] },
    { q: 'I am a number: multiply me by 4, then add 5, and you get 29. What am I?', a: '6', d: ['4', '7', '9'],
      h: ['Work backwards from 29.', '29 take away 5 is 24. What times 4 makes 24?'] },
    { q: 'A rooster lays an egg on the very top of a pointed roof. Which way does the egg roll?', a: 'Roosters do not lay eggs', d: ['To the left', 'To the right', 'Down the windy side'],
      h: ['Think about who lays eggs.', 'A rooster is a father chicken.'] },
    { q: 'What can you put in a bucket to make it lighter?', a: 'A hole', d: ['Water', 'Sand', 'A stone'],
      h: ['Think of taking something out, not adding something.', 'What would let everything drain out?'] },
    { q: 'Which is heavier: a kilogram of feathers or a kilogram of bricks?', a: 'They weigh the same', d: ['The feathers', 'The bricks', 'Nobody can tell'],
      h: ['Look at the amounts, not at the things.', 'A kilogram is a kilogram.'] },
    { q: 'A boy and his dad have ages that add up to 36. The dad is 30 years older. How old is the boy?', a: '3', d: ['6', '30', '33'],
      h: ['Guess an age for the boy and check both facts.', 'If the boy is b, the dad is b + 30, and together they make 36.'] },
    { q: 'Multiply together all ten digits, from the smallest to the biggest. What do you get?', a: '0', d: ['45', '100', '362,880'],
      h: ['Look at the smallest digit.', 'What do you get when you multiply by the smallest digit?'] },
    { q: 'I am a three-digit number with 0 as my tens digit. My hundreds digit is 2 more than my ones digit, and my digits add up to 8. What am I?', a: '503', d: ['305', '404', '602'],
      h: ['The middle digit is 0, so the other two digits add up to 8.', 'Which two digits add up to 8 and are 2 apart?'] },
    { q: 'What happens once in a minute, twice in a moment, but never in a thousand years?', a: 'The letter M', d: ['The letter O', 'A second', 'A blink'],
      h: ['Look at the words, not at the times.', 'Spell minute and moment. Which letter is in both?'] },
    { q: 'I am taken from a mine and shut in a wooden case. I am never let out, yet nearly everyone uses me. What am I?', a: 'Pencil lead', d: ['Gold', 'A diamond', 'Coal'],
      h: ['You use it to write.', 'The wooden case has a sharp point at one end.'] },
    { q: 'What has thirteen hearts but no brain?', a: 'A pack of cards', d: ['An octopus', 'A valentine', 'A teddy bear'],
      h: ['Think of games.', 'It has hearts, spades, clubs and diamonds.'] },
    { q: 'Two fathers and two sons each catch one fish. No fish is lost, but only three fish come home. How can that be?', a: 'There are only three people', d: ['One fish was very small', 'They forgot to count', 'One of them fell asleep'],
      h: ['Count the people, not the fish.', 'A grandad is a father, and his son is a father too.'] },
    { q: 'I am an even number between 20 and 30, and my digits add up to 10. What am I?', a: '28', d: ['26', '37', '46'],
      h: ['Check the even numbers between 20 and 30.', 'The tens digit is 2. What must the ones digit be?'] },
    { q: 'What is the smallest number above zero that 2, 3, 4, 5 and 6 all divide into exactly?', a: '60', d: ['30', '120', '12'],
      h: ['It must be a multiple of 4 and of 5.', 'Try the multiples of 20. Which one also works for 3 and 6?'] },
    { q: 'A brick weighs one kilogram plus half a brick. How much does a whole brick weigh?', a: '2 kilograms', d: ['1.5 kilograms', '1 kilogram', '3 kilograms'],
      h: ['Half a brick plus one kilogram is the whole brick.', 'So the other half of the brick must weigh one kilogram.'] },
    { q: 'A snail climbs a wall 10 metres high. Each day it climbs 3 metres, and each night it slides down 2 metres. On which day does it reach the top?', a: 'Day 8', d: ['Day 10', 'Day 5', 'Day 7'],
      h: ['It gains one metre each whole day and night.', 'After 7 nights it is at 7 metres. How far does it climb the next day?'] },
    { q: 'I have no feet, no hands and no wings, but I climb up to the sky. What am I?', a: 'Smoke', d: ['A bird', 'A squirrel', 'A frog'],
      h: ['Think of a campfire.', 'It is grey and rises from a chimney.'] },
    { q: 'When does 9 plus 5 make 2?', a: 'On a clock', d: ['When you count backwards', 'Never', 'In Spanish'],
      h: ['Think of telling the time.', 'What time is it 5 hours after 9 o\'clock?'] },
    { q: 'What has a neck but no head, and two arms but no hands?', a: 'A shirt', d: ['A bottle', 'A robot', 'A guitar'],
      h: ['You wear it.', 'You put your arms through its sleeves.'] },
    { q: 'A girl has as many brothers as sisters. Each brother has half as many brothers as sisters. How many children are in the family?', a: '7', d: ['5', '6', '8'],
      h: ['Try a small family and test both facts.', 'The girl does not count herself, and a brother does not count himself.'] },
    { q: 'I am a number: halve me, then halve me again, and you get 5. What am I?', a: '20', d: ['10', '15', '25'],
      h: ['Work backwards: double 5.', 'Double 5 is 10. Double that once more.'] },
    { q: 'An electric train is going north. Which way does its smoke blow?', a: 'It has no smoke', d: ['South', 'North', 'East'],
      h: ['What does an electric train run on?', 'Only trains that burn fuel make smoke.'] },
    { q: 'What gets sharper the more you use it?', a: 'Your brain', d: ['A knife', 'Scissors', 'A pencil'],
      h: ['It is inside you.', 'You use it to think and to learn.'] },
    { q: 'I am four times as old as my daughter. In 20 years I will be twice as old as her. How old is she now?', a: '10', d: ['20', '5', '15'],
      h: ['Try an age for her and check both facts.', 'If she is 5, I am 20. In 20 years that is 25 and 40: not twice. Try a bigger age.'] },
    { q: 'How can you throw a ball as hard as you can and make it come back to you, without it hitting anything?', a: 'Throw it straight up', d: ['Throw it sideways', 'Throw it very fast', 'Bounce it on the floor'],
      h: ['Think about what pulls things down.', 'What brings a ball back down to the ground?'] },
    { q: 'A word has six letters. Take away one letter and twelve is left. What is the word?', a: 'Dozens', d: ['Twelve', 'Eleven', 'Months'],
      h: ['Think of another word for 12.', 'Twelve eggs make one ...'] },
    { q: 'I am the only number whose letters are in alphabet order. What number am I?', a: 'Forty', d: ['Fifty', 'Eight', 'Ninety'],
      h: ['Look at the order of the letters in each word.', 'It is between 30 and 50.'] },
    { q: 'If you write all the numbers from 1 to 100, how many times do you write the digit 7?', a: '20', d: ['10', '11', '19'],
      h: ['Count the 7s in the ones place, then in the tens place.', 'There are ten in each place, and 77 has two.'] },
    { q: 'The more of me there is, the less you see. What am I?', a: 'Darkness', d: ['Light', 'Water', 'Sand'],
      h: ['Think of night time.', 'When the lights go out, it is all around you.'] },
    { q: 'Forward I am heavy, but backward I am not. What am I?', a: 'Ton', d: ['Rock', 'Bag', 'Lead'],
      h: ['Read each word backwards.', 'It is a very big weight.'] },
    { q: 'What has keys but no locks, space but no room, and lets you enter but not go inside?', a: 'A keyboard', d: ['A piano', 'A house', 'A car'],
      h: ['Think of a computer.', 'You type on it.'] },
    { q: 'I am a number: add me to myself, then multiply the answer by me, and you get 50. What am I?', a: '5', d: ['10', '25', '2'],
      h: ['Try small numbers.', 'If the number is n, then n plus n, times n, is 2 times n times n.'] },
    { q: 'A book and a pen cost 110 coins together. The book costs 100 coins more than the pen. How much is the pen?', a: '5 coins', d: ['10 coins', '100 coins', '55 coins'],
      h: ['Try 10 for the pen and check: what would the book cost then?', 'If the pen is p, the book is p + 100, and together they make 110.'] },
    { q: 'A clock strikes 6 times in 5 seconds. How many seconds does it take to strike 12 times?', a: '11', d: ['10', '12', '6'],
      h: ['Count the gaps between the strikes, not the strikes.', '6 strikes have 5 gaps, so each gap is one second.'] },
  ],
};
/* Map scenes (P4-09, DESIGN_SYSTEM 7): the props, themes and the world -> theme table that SCN (src/js/43-scenes.js) draws from.
   Data only, read inside functions (A11).

   SCN_P: a prop is "hw hh|shape;shape;..." on its own grid: the ground point is 0,0, the drawing stands up into negative y,
   hw = half its width and hh = its height (for placement). A shape is "tone [opacity] kind numbers... [@deg]":
     tone   one letter + optional digit for an --ill-* token (DESIGN_SYSTEM 6.5 hues: r o y g c b v p n t s m e w k;
            1 highlight, none base, 2 shade, 3 deep), or a word for an --sc-* scene token (sand, green-2 ...)
     kind   c cx cy r | e cx cy rx ry | r x y w h rx | p d... (fill) | l w d... (round stroke; "w/a,b" adds a dash)
            | o w cx cy rx ry (ellipse outline; "w/a,b" adds a dash); @deg rotates an e or o about its centre
   Light from the top left: shade shape first, the base moved up-left over it, then a highlight. Ground shadows are ink at .1.
   SCN_V: variants that swap one hue for another (tree in autumn orange, a blue-roof house ...).
   SCN_T: a theme: sky [top, horizon] and ground [base, ledge] scene tokens, sun 'sun' | 'moon', cl clouds, st stars,
     hz horizon ridges back to front [kind q|l|b|a, unit width, heights, tone, hang from the top, move up], lm landmarks, pr props
     (cycled down the sides), sm small companions set in front of some props, tx ground texture [[kind tuft|dot|spark|bub|dash, tone]], pp a papel picado garland (tones),
     rays light shafts from the top (under water).
   SCN_W: every world id -> theme, or [theme, overrides]. */
var SCN_P = {
  tree: '18 56|k .1 e 1 0 16 3.5;n2 r -3.5 -22 7 22 2;n r -3.5 -22 4.5 22 2;g2 c 1 -33 17;g c -1.5 -35.5 14;g1 .7 c -7 -41 4.5',
  pine: '16 60|k .1 e 0 0 13 3;n2 r -2.5 -11 5 11 1.5;g2 p M0 -58L11 -36H6L16 -11H-16L-6 -36H-11Z;g p M0 -58L-11 -36H-6L-16 -11H2Z' +
    ';g1 .6 l 2 M-2 -51L-7 -40M-6 -30L-12 -17',
  bush: '20 24|k .1 e 0 0 19 3.5;g2 p M-18 0C-21 -10 -12 -17 -6 -14C-3 -22 9 -22 11 -13C18 -14 21 -5 18 0Z' +
    ';g p M-17 -2C-19 -10 -12 -16 -7 -13C-4 -20 7 -20 9 -12C13 -13 16 -7 13 -2Z;g1 .7 e -8 -12 4 2.5 @-20',
  flowers: '10 20|g2 l 1.6 M-6 0V-9M0 0V-13M6 0V-8;p c -6 -11 3.6;y c 0 -15 3.9;v1 c 6 -10 3.3;w .85 c -6 -11 1.3;o c 0 -15 1.5;w .85 c 6 -10 1.2',
  tulip: '9 30|g2 l 2 M0 0V-18;g p M0 -3Q-10 -8 -9 -18Q-2 -13 0 -3Z;r2 p M-7 -29L-3.5 -25L0 -29L3.5 -25L7 -29Q8 -16 0 -16Q-8 -16 -7 -29Z' +
    ';r p M-7 -29L-3.5 -25L0 -29L1.5 -26Q2 -18 -0.5 -17Q-7.5 -17 -7 -29Z;r1 .7 l 1.6 M-4.5 -24Q-5 -20 -3 -18.5',
  sunflower: '18 72|k .1 e 0 0 12 3;g2 r -1.6 -50 3.2 50 1.6;g p M0 -18Q-12 -22 -15 -31Q-4 -29 0 -18Z;g2 p M0 -26Q12 -28 14 -37Q4 -35 0 -26Z' +
    ';y2 e 0 -56 16 6.5;y2 e 0 -56 16 6.5 @45;y2 e 0 -56 16 6.5 @90;y2 e 0 -56 16 6.5 @135;y e -1 -57 13 5 @22;y e -1 -57 13 5 @112' +
    ';n2 c 0 -56 7;n c -1 -57 5.5;n1 .6 c -3 -59 1.8',
  rock: '14 16|k .1 e 0 0 14 3;e2 p M-13 0C-14 -9 -6 -14 1 -13C8 -12 14 -7 13 0Z;e p M-12 -2C-13 -9 -6 -12.5 0 -12C5 -11.5 9 -8 8 -2Z' +
    ';e1 .8 e -6 -8.5 3.5 2 @-20',
  mushroom: '12 22|k .1 e 0 0 10 2.5;m2 r -4 -12 8 12 3;m r -4 -12 6 12 3;r2 p M-12 -10C-12 -25 12 -25 12 -10Z' +
    ';r p M-12 -11C-12 -23 7 -25 9 -12Z;w c -5 -17 2.2;w c 3 -19 1.7;w c 7 -13 1.3',
  house: '20 42|k .1 e 0 0 20 3.5;m2 r -15 -23 30 23;m r -15 -23 23 23;r2 p M-19 -21L0 -40L19 -21Z;r p M-19 -21L0 -40L3 -37L-13 -21Z' +
    ';e2 r 7 -40 5 9;n2 r -4 -13 8 13 2;b1 r -12 -18 6 6 1;b1 r 7 -18 5 6 1;w .5 r -12 -18 2.5 2.5 1',
  topiary: '12 44|k .1 e 0 0 11 2.5;n2 r -8 -10 16 10 2;n r -8 -10 12 10 2;n2 r -1.5 -16 3 7;g2 c 0 -26 11;g c -1.5 -27.5 9;g1 .7 c -5 -32 3' +
    ';g2 p M0 -44L6 -36H-6Z;g p M0 -44L-6 -36H1Z',
  lolli: '14 52|k .1 e 0 0 9 2.5;w2 r -1.6 -38 3.2 38 1.6;w r -1.6 -38 2 38 1;p2 c 0 -40 13;p c -1.5 -41.5 11' +
    ';w .85 l 2.6 M-1.5 -41.5m-1 0a1.6 1.6 0 1 1 3.2 0a4.2 4.2 0 1 1 -7.6 0a6.8 6.8 0 1 1 12.4 0;w .6 c -7 -46 2.4',
  cane: '10 48|k .1 e 0 0 8 2.5;w2 l 7.5 M3.5 0V-31A7 7 0 0 0 -10.5 -31;w l 6 M2 0V-31A7 7 0 0 0 -12 -31' +
    ';r l 6/4.5,4.5 M2 0V-31A7 7 0 0 0 -12 -31;w .8 l 1.4 M0.8 -3V-28',
  gum: '12 20|k .1 e 0 0 12 2.5;p2 p M-11 0C-12 -19 12 -19 11 0Z;p p M-11 -1.5C-12 -16 7 -17.5 7.5 -2Z;w .7 e -5 -10 2.6 1.6 @-35' +
    ';w .8 c 1 -7 .9;w .8 c -6 -4 .8;w .8 c 4 -12 .8',
  cupcake: '13 34|k .1 e 0 0 11 2.5;p2 p M-10 -12L-7 0H7L10 -12Z;p p M-10 -12L-7 -1H2L3 -12Z;m2 c 0 -16 11;m c -2 -18 9' +
    ';m c 0 -26 6;r c 1 -32 3.4;r1 .7 c 0 -33 1.1;w .7 c -6 -21 2',
  clocktower: '20 88|k .1 e 0 0 18 3.5;e2 r -12 -66 24 66;e r -12 -66 17 66;w .35 r -10 -64 3 62 1.5;r2 p M-15 -64L0 -86L15 -64Z' +
    ';r p M-15 -64L0 -86L2 -64Z;y2 c 0 -48 10;w c 0 -48 8;k2 l 1.8 M0 -48V-54M0 -48H4.5;b1 r -3 -32 6 9 3;n3 r -4.5 -14 9 14 4.5',
  lamp: '7 48|k .1 e 0 0 7 2;k2 r -1.6 -42 3.2 42 1.2;k2 r -5 -47 10 6 2.5;y1 .45 c 0 -38 7;y c 0 -39 3.6;w .8 c -1 -40 1.2',
  coral: '15 34|k .1 e 0 0 13 2.5;p2 l 5 M0 0V-12L-8 -22V-31M0 -12L7 -21V-32M-8 -22L-13 -17V-23M7 -21L12 -16V-23' +
    ';p l 3.4 M-1 -1V-12L-9 -22V-31M-1 -12L6 -21V-32M-9 -22L-14 -17V-23M6 -21L11 -16V-23;p1 .8 c -9 -31 1.8;p1 .8 c 6 -32 1.8',
  fan: '15 30|k .1 e 0 0 12 2.5;v2 p M-1 0L-14 -16C-16 -30 14 -32 14 -16Z;v p M-1 -1L-14 -17C-15 -28 8 -31 9 -18Z' +
    ';v1 .7 l 1.2 M-1 -2L-9 -24M-1 -2L-1 -28M-1 -2L7 -24',
  weed: '9 42|g2 l 4.5 M0 0C-7 -10 6 -18 0 -28C-4 -34 3 -38 1 -42;g l 2.8 M-1 0C-8 -10 5 -18 -1 -28C-5 -34 2 -38 0 -42' +
    ';g2 l 3.5 M5 0C1 -8 10 -14 6 -22;g l 2.2 M4.5 0C.5 -8 9.5 -14 5.5 -22',
  fish: '16 34|o2 e 0 -24 10 7;o p M8 -24L17 -30V-18Z;o e -1.5 -25.5 8 5;o1 .7 e -3 -28 3.2 1.4 @-10;k c -5 -25 1.5;w c -5.5 -25.5 .5',
  shell: '10 14|k .1 e 0 0 10 2;p2 p M-9 0C-10 -15 10 -15 9 0Z;p1 p M-8 -1.5C-9 -13 5 -14 5.5 -2Z;p2 l 1 M0 -1V-11M-4 -1L-6 -9M4 -1L5.5 -9',
  star: '11 22|k .1 e 0 0 10 2;o2 p M0 -22L2.7 -14.7L10.5 -14.4L4.4 -9.6L6.5 -2.1L0 -6.4L-6.5 -2.1L-4.4 -9.6L-10.5 -14.4L-2.7 -14.7Z' +
    ';o p M-1 -21L1.2 -15.1L7.6 -14.8L2.6 -10.8L4.3 -4.7L-1 -8.2L-6.3 -4.7L-4.6 -10.8L-9.6 -14.8L-3.2 -15.1Z;o1 .8 c -2 -14 1.6',
  planet: '20 40|o2 c 0 -22 12;o c -2 -24 10;o1 .6 c -6 -28 3.4;o2 .5 e 3 -18 4 2;y o 2.6 0 -22 20 5.5 @-16;y1 .7 l 1.4 M-17 -21Q-14 -27 -8 -29',
  rocket: '16 62|k .1 e 0 0 10 2.5;r2 p M-8 -22L-15 -8V-4L-7 -10Z;r2 p M8 -22L15 -8V-4L7 -10Z;w2 p M-9 -10C-11 -34 -4 -50 0 -58C4 -50 11 -34 9 -10Z' +
    ';w p M-9 -10C-11 -34 -4 -50 0 -58C2 -50 4 -34 3 -10Z;r p M-5.5 -49C-3 -54 -1.5 -56.5 0 -58C1.5 -56.5 3 -54 5.5 -49Z;b2 c 0 -34 5.5;b1 c -.8 -34.8 3.8' +
    ';o p M-5 -9L0 3L5 -9Z;y p M-2.5 -9L0 -2L2.5 -9Z',
  crater: '16 10|e2 e 0 -3 15 5;e3 .45 e 1 -2.5 10 3;e1 .7 l 1.4 M-12 -5A12 4 0 0 1 4 -7.5',
  spark: '8 26|y p M0 -26Q1 -19 7 -18Q1 -17 0 -10Q-1 -17 -7 -18Q-1 -19 0 -26Z;w .7 c -.5 -19 1.3',
  palm: '24 62|k .1 e 2 0 14 3;n2 l 6.5 M0 0C2 -20 -2 -38 4 -50;n l 3.6 M-1.2 0C.8 -20 -3.2 -38 2.8 -50' +
    ';g2 p M4 -50C14 -60 26 -54 28 -42C20 -50 12 -50 4 -50Z;g2 p M4 -50C-6 -58 -18 -54 -22 -44C-12 -50 -4 -50 4 -50Z' +
    ';g p M4 -50C-2 -64 -14 -66 -22 -62C-10 -58 -2 -54 4 -50Z;g p M4 -50C8 -64 20 -68 26 -62C16 -60 8 -56 4 -50Z;n3 c 1.5 -47.5 2.6;n3 c 6 -47 2.4',
  chest: '16 26|k .1 e 0 0 16 3;n2 r -14 -15 28 15 2;n r -14 -15 22 15 2;n2 p M-15 -15C-15 -26 15 -26 15 -15Z' +
    ';n1 p M-15 -15C-15 -25 9 -26 9.5 -15Z;y2 r -15 -16 30 3;y r -2.5 -18 5 7 1.5;y1 .8 c -10 -21 1.6',
  ship: '28 54|n2 p M-26 -8L-19 0H19L26 -8Z;n p M-26 -8L-19 -1.5H12L15 -8Z;n3 r -1.2 -50 2.4 42;w2 p M2 -46Q16 -32 20 -14H2Z' +
    ';w p M-1 -46Q-14 -32 -19 -14H-1Z;r p M1 -50L12 -46.5L1 -43Z;w .5 l 1.2 M-22 -5H8',
  mountain: '30 58|k .1 e 0 0 28 4;e2 p M-30 0L-3 -56L30 0Z;e p M-30 0L-3 -56L-1 -40L-6 0Z;w2 p M-3 -56L7 -36L2 -38L-2 -34L-6 -38L-12 -38Z' +
    ';w p M-3 -56L-1 -39L-6 -38L-12 -38Z',
  flag: '9 32|k .1 e 0 0 6 2;e3 r -1.1 -31 2.2 31 1;r p M1.1 -30L14 -25.5L1.1 -21Z;r2 p M1.1 -25.5L14 -25.5L1.1 -21Z',
  gear: '18 36|k .1 e 0 0 14 3;b2 o 8/5.5,5.5 0 -18 14 14;b2 c 0 -18 14;b c -1.5 -19.5 12;b3 c 0 -18 4.5;b1 .7 l 2 M-9 -24A10 10 0 0 1 -3 -29',
  crate: '14 26|k .1 e 0 0 14 3;t2 r -12 -22 24 22 2;t r -12 -22 18 22 2;t3 .6 l 1.4 M-12 -11H12M-6 -22V0M2 -22V0;t1 .8 l 1.6 M-10 -20H4',
  factory: '30 70|k .1 e 0 0 30 4;r2 r 13 -58 9 30;r r 13 -58 6.5 30;w2 c 21 -64 5.5;w c 25 -72 7;w c 19 -66 4;e2 r -28 -30 56 30' +
    ';e r -28 -30 44 30;b2 p M-28 -30L-18 -40V-30L-8 -40V-30L2 -40V-30L12 -40V-30L22 -40V-30Z;y1 r -22 -23 8 8 1;y1 r -9 -23 8 8 1;n2 r 6 -14 9 14 2',
  cactus: '14 46|k .1 e 0 0 11 2.5;g2 l 6.5 M-5 -20H-10V-31;g2 l 6.5 M5 -14H10V-25;g2 r -5.5 -42 11 42 5.5;g r -5.5 -42 8 42 4' +
    ';g l 3.6 M-6 -21H-10.5V-31M6 -15H9.5V-25;g1 .7 l 1.6 M-2.5 -37V-8;p c 0 -43 3',
  pyramid: '32 46|k .1 e 0 0 32 4;t2 p M0 -44L32 0H5Z;t p M0 -44L5 0H-32Z;t3 .45 l 1.2 M-22 -14H2.5M-12 -28H3.5;t1 .7 l 1.6 M-2 -40L-26 -4',
  dune: '26 14|t p M-26 0C-14 -16 6 -16 26 0Z;t2 p M-2 -12C8 -12 16 -7 26 0H6Z;t1 .7 l 1.4 M-18 -5C-12 -10 -6 -12 -2 -12',
  volcano: '36 66|k .1 e 0 0 34 4;n2 p M-34 0L-10 -48H10L34 0Z;n p M-34 0L-10 -48H-1L-6 0Z' +
    ';r p M-10 -48H10L7 -44L4 -38L1 -43L-3 -35L-6 -44Z;o l 3 M3 -44L7 -30;y .8 l 1.4 M-7 -47H6;e1 .8 c -2 -56 6;e1 .8 c 6 -63 8;w .6 c -4 -58 2.6',
  crystal: '14 36|k .1 e 0 0 13 2.5;v2 p M-3 0V-24L3 -34L9 -24V0Z;v1 p M-3 0V-24L3 -34V0Z;c2 p M-13 0V-12L-9 -19L-5 -12V0Z' +
    ';c1 p M-13 0V-12L-9 -19V0Z;w .8 l 1.4 M0 -24V-8',
  isle: '24 46|n2 p M-22 -16C-16 -2 -6 4 2 6C6 -2 16 -6 22 -16Z;n p M-21 -16C-15 -4 -6 1 0 2C2 -6 6 -12 8 -16Z;g2 e 0 -16 24 5;g e -2 -17 21 3.8' +
    ';b2 r -6 -40 12 22;b r -6 -40 8 22;b3 p M-8 -40L0 -48L8 -40Z;y1 r -3 -34 3.5 4.5;y1 r -3 -27 3.5 4.5',
  balloon: '12 50|r2 c 0 -36 12;r c -1.5 -37.5 10.5;y l 2.2 M0 -48Q-6 -36 0 -24M-6 -46Q-12 -36 -6 -26;w .6 e -6 -41 2.4 3.6;k2 .5 l .9 M-9 -29L-4 -18M9 -29L4 -18' +
    ';n r -4.5 -18 9 7 2',
  cloud: '24 22|w2 p M-22 0C-26 -8 -16 -14 -10 -10C-8 -20 6 -20 8 -11C14 -15 24 -9 20 0Z;w p M-21 -2C-24 -9 -15 -13 -10 -10.5C-8 -18.5 5 -18.5 6.5 -11C11 -14 18 -9 16 -2Z',
  galaxy: '22 36|v1 .5 e 0 -18 21 8 @-15;w .9 l 2 M0 -18m-2 0a3 2 -15 1 1 5 -1a8 4 -15 1 1 -13 2a14 6 -15 1 1 24 -4;y c 0 -18 3.6;w .8 c -.8 -18.8 1.4',
  umbrella: '19 46|k .1 e 0 0 10 2.5;w2 l 2.2 M2 0L-1 -36;r2 p M-19 -34C-15 -50 15 -51 19 -37Z;r p M-19 -34C-15 -48 1 -51 6 -41Z' +
    ';w p M-9 -36C-8 -45 -3 -49 0 -49C-1 -45 -2 -41 -3 -37Z;w .6 l 1.4 M-15 -38C-13 -43 -10 -46 -6 -48',
  bucket: '12 26|k .1 e 0 0 10 2.5;b2 p M-8 -14L-6 0H6L8 -14Z;b p M-8 -14L-6 0H2L3 -14Z;b1 r -9 -16 18 3 1.5;k2 .6 l 1.2 M-8 -15C-8 -24 8 -24 8 -15' +
    ';y2 l 2.4 M11 0L4 -20;y p M3 -27L8.5 -25.5L6 -18.5L1.5 -20Z',
  pencils: '13 42|k .1 e 0 0 12 2.5;y l 4.5 M-4 -18L-7 -34;r l 4.5 M1 -18V-38;g l 4.5 M5 -18L9 -32;t1 c -7.2 -35.5 2.3;t1 c 1 -39.5 2.3;t1 c 9.3 -33.5 2.3' +
    ';b2 r -10 -19 20 19 2;b r -10 -19 15 19 2;b1 .7 r -8 -17 3 15 1.5',
  books: '16 28|k .1 e 0 0 16 3;r2 r -14 -8 28 8 1.5;r r -14 -8 23 8 1.5;b2 r -12 -16 25 8 1.5;b r -12 -16 20 8 1.5;g2 r -13 -24 24 8 1.5' +
    ';g r -13 -24 19 8 1.5;m p M9 -7h4v6h-4zM8.5 -15h3.5v6h-3.5zM6.5 -23h3.5v6h-3.5z;w .5 l 1.2 M-11 -21H2',
  tower: '15 66|k .1 e 0 0 14 3;e2 r -10 -46 20 46;e r -10 -46 14 46;e2 r -12 -52 24 7 1;e r -12 -52 18 7 1;v2 p M-13 -52L0 -66L13 -52Z' +
    ';v p M-13 -52L0 -66L2 -52Z;k2 r -2.5 -36 5 9 2.5;n3 r -4 -14 8 14 4',
  castle: '34 74|k .1 e 0 0 34 4;e2 r -20 -30 40 30;e r -20 -30 32 30;n3 p M-6 0V-12A6 6 0 0 1 6 -12V0Z;e2 r -32 -50 16 50;e r -32 -50 12 50' +
    ';e2 r 16 -50 16 50;e r 16 -50 12 50;v2 p M-34 -50L-24 -66L-14 -50Z;v p M-34 -50L-24 -66L-23 -50Z;v2 p M14 -50L24 -66L34 -50Z' +
    ';v p M14 -50L24 -66L25 -50Z;r p M24 -66V-74L31 -71L24 -68Z;k2 r -26 -38 4 7 2;k2 r 22 -38 4 7 2',
  fountain: '22 38|k .1 e 0 0 21 3.5;e2 p M-20 -10H20L16 0H-16Z;e p M-20 -10H12L10 0H-16Z;c1 e 0 -10 18 3.4;e r -3 -26 6 16 1.5' +
    ';c .9 l 2.4 M0 -27C-6 -38 -13 -32 -15 -12M0 -27C6 -38 13 -32 15 -12;c1 c 0 -29 4;w .8 c -1 -30 1.4',
  pinata: '16 58|n3 l 1.2 M0 -58V-44;o2 p M0 -45L3.5 -36.9L12.4 -36L5.7 -30.1L7.6 -21.5L0 -26L-7.6 -21.5L-5.7 -30.1L-12.4 -36L-3.5 -36.9Z' +
    ';o p M-1 -44L1.9 -37L9.5 -36.4L3.8 -31.5L5.5 -24.1L-1 -28L-7.5 -24.1L-5.8 -31.5L-11.5 -36.4L-3.9 -37Z;p c 0 -32 3.4' +
    ';p l 2 M-6 -23L-9 -10M0 -26V-12M6 -23L9 -11;c l 2 M-3 -25L-4 -14M3 -25L4 -13',
  pballoons: '12 52|k2 .5 l .9 M0 0L-6 -30M0 0L1 -36M0 0L7 -28;r c -6 -34 6.5;y c 1 -41 6.5;c c 7 -32 6.5;w .6 c -8 -36 1.8;w .6 c -1 -43 1.8;w .6 c 5 -34 1.8',
  trophy: '16 46|k .1 e 0 0 12 2.5;n2 r -10 -8 20 8 2;n r -10 -8 15 8 2;y2 r -3 -18 6 10;y2 l 3 M-10 -38C-18 -38 -16 -26 -7 -26M10 -38C18 -38 16 -26 7 -26' +
    ';y2 p M-11 -44H11C11 -28 6 -20 0 -20C-6 -20 -11 -28 -11 -44Z;y p M-11 -44H5C5 -29 2 -21 0 -20.5C-6 -21 -11 -28 -11 -44Z;y1 .8 l 2 M-7 -40C-7 -33 -5 -28 -3 -26',
  snowman: '14 42|k .1 e 0 0 12 2.5;w2 c 0 -11 11;w c -1.5 -12.5 9;w2 c 0 -29 8;w c -1 -30 6.6;k c -3 -31 1.1;k c 2 -31 1.1;o p M0 -28.5L6 -27.5L0 -26.5Z' +
    ';r l 3 M-6 -22H6;n2 l 1.4 M-9 -15L-16 -21M9 -15L15 -22',
  rainbow: '28 32|r l 4 M-24 0A24 24 0 0 1 24 0;o l 4 M-20 0A20 20 0 0 1 20 0;y l 4 M-16 0A16 16 0 0 1 16 0;g l 4 M-12 0A12 12 0 0 1 12 0' +
    ';b l 4 M-8 0A8 8 0 0 1 8 0;w c -24 -1 5;w c -18 1 4;w c 21 -1 5;w c 26 1 4',
  building: '14 58|k .1 e 0 0 14 3;b2 r -12 -54 24 54;b r -12 -54 17 54;e2 r -1 -60 2 6;b1 p M-9 -50h4v5h-4zM-1 -50h4v5h-4zM-9 -40h4v5h-4zM-1 -40h4v5h-4z' +
    'M-9 -30h4v5h-4zM-1 -30h4v5h-4zM-9 -20h4v5h-4zM-1 -20h4v5h-4z;n3 r -3 -9 6 9 1.5',
  traffic: '7 46|k .1 e 0 0 6 2;k2 r -1.5 -30 3 30 1;k r -6 -46 12 20 3;r c 0 -41 2.6;y .45 c 0 -36 2.6;g .45 c 0 -31 2.6;w .4 c -.8 -41.8 .9',
  sign: '15 38|k .1 e 0 0 10 2.5;n2 r -2 -34 4 34 1.5;n p M-14 -31H8L12 -27L8 -23H-14Z;n2 p M14 -19H-6L-10 -15L-6 -11H14Z;n1 .8 l 1.4 M-12 -29H6',
  flask: '13 32|k .1 e 0 0 11 2.5;e1 r -3.5 -30 7 12 1;c1 p M-3.5 -19L-11 -3C-12 0 -11 1 -9 1H9C11 1 12 0 11 -3L3.5 -19Z' +
    ';g p M-7.6 -10H7.6L11 -3C12 0 11 1 9 1H-9C-11 1 -12 0 -11 -3Z;g2 p M3 -10H7.6L11 -3C12 0 11 1 9 1H6Z;w c -3 -6 1.6;w c 2 -3 1.1;w .7 l 1.6 M-5 -16L-9 -6',
  bulb: '12 38|y1 .4 c 0 -26 15;y c 0 -26 11;y1 c -1.5 -27.5 8;e2 r -5 -15 10 8 2;e3 l 1.2 M-5 -12H5;y2 l 1.4 M-3 -21L-1 -27L1 -21L3 -27;w .8 c -5 -31 2.6',
  dome: '28 62|k .1 e 0 0 28 4;e2 r -20 -24 40 24;e r -20 -24 32 24;w2 p M-22 -24C-22 -52 22 -52 22 -24Z;w p M-22 -24C-22 -50 4 -52 8 -26Z' +
    ';b3 p M-3 -48C-1 -48.5 2 -48 3 -47.5V-24H-3Z;e2 l 4.5 M2 -40L22 -56;n3 r -4 -14 8 14 4;w .7 l 1.6 M-17 -28C-17 -38 -12 -44 -6 -46',
  tele: '16 44|k .1 e 0 0 12 2.5;k2 l 1.6 M0 -20L-9 0M0 -20L9 0M0 -20V0;b2 l 9 M-11 -26L12 -38;b l 5.5 M-12 -27.5L7 -37.5;c1 c 12.5 -38.5 3.4',
  kite: '12 50|k2 .6 l 1 M2 -20C-4 -12 6 -8 0 0;p c -1 -9 1.8;y c 2 -4 1.8;r2 p M0 -50L11 -36L2 -18L-10 -34Z;r p M0 -50L2 -34.5L2 -18L-10 -34Z;y l 1 M0 -50L2 -18M-10 -34L11 -36',
  maracas: '14 34|r2 l 2.6 M-4 0L-8 -16;g2 l 2.6 M5 0L9 -16;r e -9.5 -22 6 8 @-15;g e 10.5 -22 6 8 @15;y l 1.6 M-14 -24L-6 -18M6 -18L14 -24;w .6 c -11 -26 1.6;w .6 c 9 -26 1.6'
};
var SCN_V = {
  treeO: ['tree', 'g', 'o'], treeP: ['tree', 'g', 'p'], treeY: ['tree', 'g', 'y'], houseB: ['house', 'r', 'b'], houseG: ['house', 'r', 'g'],
  gumG: ['gum', 'p', 'g'], gumC: ['gum', 'p', 'c'], gumY: ['gum', 'p', 'y'], lolliC: ['lolli', 'p', 'c'], lolliV: ['lolli', 'p', 'v'],
  coralO: ['coral', 'p', 'o'], fanC: ['fan', 'v', 'c'], fishB: ['fish', 'o', 'y'], crystalP: ['crystal', 'v', 'p'], crystalB: ['crystal', 'v', 'b'],
  buildingO: ['building', 'b', 'o'], buildingG: ['building', 'b', 'g'], balloonB: ['balloon', 'r', 'b'], balloonG: ['balloon', 'r', 'g'],
  planetC: ['planet', 'o', 'c'], planetP: ['planet', 'o', 'p'], umbrellaB: ['umbrella', 'r', 'b'], tulipY: ['tulip', 'r', 'y'],
  tulipV: ['tulip', 'r', 'v'], flagB: ['flag', 'r', 'b'], gearO: ['gear', 'b', 'o'], starY: ['star', 'o', 'y'], kiteB: ['kite', 'r', 'b'],
  crateB: ['crate', 't', 'n'], towerB: ['tower', 'v', 'b']
};
var SCN_T = {
  town: { sm: ['bush', 'flowers'], sky: ['sky', 'sky-1'], g: ['green', 'green-2'], sun: 'sun', cl: 2, hz: [['q', 120, [26, 16, 22], 'g1 .45'], ['q', 170, [12, 18], 'green']],
    lm: ['house', 'houseB'], pr: ['tree', 'houseB', 'bush', 'flowers', 'house', 'treeY'], tx: [['tuft', 'g2']] },
  garden: { sm: ['flowers', 'bush'], sky: ['sky', 'sky-1'], g: ['green', 'green-2'], sun: 'sun', cl: 1, hz: [['a', 70, [16, 22, 12], 'g1 .5'], ['q', 160, [10, 16], 'green']],
    lm: ['topiary', 'tulip'], pr: ['tulip', 'bush', 'topiary', 'tulipY', 'flowers', 'tulipV'], tx: [['tuft', 'g2'], ['dot', 'p1']] },
  meadow: { sm: ['flowers', 'bush'], sky: ['sky', 'sky-1'], g: ['green', 'green-2'], sun: 'sun', cl: 2, hz: [['q', 110, [30, 18, 26], 'g1 .45'], ['q', 150, [14, 22, 10], 'green']],
    lm: ['sunflower', 'tree'], pr: ['tree', 'flowers', 'bush', 'sunflower', 'tulip', 'treeY'], tx: [['tuft', 'g2'], ['dot', 'y']] },
  candy: { sm: ['gum', 'gumC'], sky: ['candy', 'candy-1'], g: ['pink', 'pink-2'], sun: 'sun', cl: 2, hz: [['a', 60, [18, 26, 14], 'p1 .7'], ['q', 140, [12, 18], 'pink']],
    lm: ['lolli', 'cane'], pr: ['lolli', 'gumG', 'cane', 'cupcake', 'lolliC', 'gumY', 'lolliV', 'gum'], tx: [['dash', 'c'], ['dash', 'y']] },
  clock: { sm: ['bush', 'flowers'], sky: ['sky', 'sky-1'], g: ['sun', 'sun-2'], sun: 'sun', cl: 2, hz: [['b', 46, [26, 38, 20, 32], 'e1 .55'], ['q', 160, [10, 14], 'sun']],
    lm: ['clocktower', 'tree'], pr: ['tree', 'lamp', 'bush', 'house', 'flowers', 'treeO'], tx: [['dot', 't1']] },
  reef: { sm: ['shell', 'rock'], sky: ['sea-1', 'sea'], g: ['sea', 'sea-2'], rays: 1, hz: [['a', 80, [14, 20, 10], 'c1 .6'], ['q', 150, [8, 12], 'sea']],
    lm: ['coral', 'fan'], pr: ['coral', 'weed', 'fish', 'shell', 'fanC', 'coralO', 'fishB', 'star'], tx: [['bub', 'w']] },
  space: { sm: ['crater'], sky: ['night', 'night-1'], g: ['lilac', 'lilac-2'], sun: 'moon', st: 12, hz: [['a', 90, [10, 16, 8], 'v1 .7'], ['q', 170, [8, 12], 'lilac']],
    lm: ['rocket', 'planet'], pr: ['planet', 'crater', 'spark', 'planetC', 'rocket', 'crater'], tx: [['spark', 'y1']] },
  bay: { sm: ['shell', 'rock'], sky: ['sky', 'sky-1'], g: ['sand', 'sand-2'], sun: 'sun', cl: 2, hz: [['q', 70, [2, 3], 'c1 .8', 0, -22], ['q', 180, [8, 12], 'sand']],
    lm: ['ship', 'palm'], pr: ['palm', 'chest', 'shell', 'rock', 'star', 'umbrellaB'], tx: [['dot', 't2']] },
  mountain: { sm: ['rock', 'bush'], sky: ['sky', 'sky-1'], g: ['green', 'green-2'], sun: 'sun', cl: 2, hz: [['l', 90, [44, 30, 52, 36], 'e1 .7'], ['q', 140, [14, 20], 'green']],
    lm: ['mountain', 'pine'], pr: ['pine', 'rock', 'mountain', 'pine', 'bush', 'flagB'], tx: [['tuft', 'g2']] },
  forest: { sm: ['mushroom', 'bush'], sky: ['sky', 'sky-1'], g: ['mint', 'mint-2'], sun: 'sun', cl: 1, hz: [['l', 26, [26, 34, 22, 30], 'g1 .55'], ['q', 150, [12, 18], 'mint']],
    lm: ['tree', 'mushroom'], pr: ['pine', 'tree', 'mushroom', 'bush', 'treeY', 'rock'], tx: [['tuft', 'g2']] },
  factory: { sm: ['crate'], sky: ['sky', 'sky-1'], g: ['stone', 'stone-2'], sun: 'sun', cl: 2, hz: [['b', 40, [30, 44, 22, 36], 'b1 .4'], ['q', 170, [8, 12], 'stone']],
    lm: ['factory', 'gear'], pr: ['gear', 'crate', 'lamp', 'gearO', 'crateB', 'bush'], tx: [['dot', 'e1']] },
  desert: { sm: ['rock'], sky: ['dusk', 'dusk-1'], g: ['sand', 'sand-2'], sun: 'sun', hz: [['q', 160, [22, 30, 16], 't1 .8'], ['q', 200, [10, 16], 'sand']],
    lm: ['pyramid', 'cactus'], pr: ['cactus', 'rock', 'dune', 'cactus', 'dune', 'pyramid'], tx: [['dot', 't2']] },
  volcano: { sm: ['rock'], sky: ['dusk', 'dusk-1'], g: ['peach', 'peach-2'], sun: 'sun', cl: 1, hz: [['l', 110, [36, 22, 44], 'n1 .3'], ['q', 160, [10, 14], 'peach']],
    lm: ['volcano', 'flask'], pr: ['rock', 'flask', 'crystal', 'volcano', 'rock', 'crystalP'], tx: [['dot', 'n1']] },
  caves: { sm: ['rock', 'crystalP'], sky: ['lilac-2', 'lilac'], g: ['lilac', 'lilac-2'], hz: [['l', 34, [-18, -28, -12, -24], 'v1 .55', 1], ['q', 160, [10, 14], 'lilac']],
    lm: ['crystal', 'crystalB'], pr: ['crystal', 'rock', 'crystalB', 'mushroom', 'crystalP', 'rock'], tx: [['spark', 'w']] },
  skycity: { sm: ['cloud'], sky: ['sky', 'sky-1'], g: ['sky-1', 'sky'], sun: 'sun', hz: [['a', 70, [16, 24, 12], 'w'], ['a', 90, [10, 14], 'sky-1']],
    lm: ['isle', 'balloon'], pr: ['cloud', 'balloon', 'isle', 'kite', 'balloonB', 'balloonG', 'kiteB'], tx: [['dot', 'w']] },
  galaxy: { sm: ['spark'], sky: ['night', 'night-1'], g: ['blue', 'blue-2'], sun: 'moon', st: 14, hz: [['a', 100, [12, 8, 16], 'b1 .6'], ['q', 170, [8, 12], 'blue']],
    lm: ['galaxy', 'planetP'], pr: ['planet', 'galaxy', 'spark', 'planetC', 'crater', 'planetP'], tx: [['spark', 'y1']] },
  beach: { sm: ['shell', 'starY'], sky: ['sky', 'sky-1'], g: ['sand', 'sand-2'], sun: 'sun', cl: 2, hz: [['q', 70, [2, 3], 'c1 .8', 0, -22], ['q', 180, [8, 12], 'sand']],
    lm: ['umbrella', 'bucket'], pr: ['bucket', 'shell', 'star', 'umbrellaB', 'palm', 'starY'], tx: [['dot', 't2']] },
  workshop: { sm: ['books'], sky: ['dusk', 'dusk-1'], g: ['sand', 'sand-2'], sun: 'sun', cl: 1, hz: [['b', 24, [14, 16], 'n1 .5'], ['q', 180, [8, 10], 'sand']],
    lm: ['pencils', 'books'], pr: ['crate', 'books', 'pencils', 'gearO', 'lamp', 'crateB'], tx: [['dot', 'n1']] },
  library: { sm: ['books'], sky: ['candy', 'candy-1'], g: ['rose', 'rose-2'], sun: 'sun', cl: 1, hz: [['b', 22, [30, 24], 'e1 .6'], ['q', 170, [8, 12], 'rose']],
    lm: ['tower', 'books'], pr: ['books', 'lamp', 'towerB', 'bush', 'flag', 'books'], tx: [['dot', 'r1']] },
  island: { sm: ['shell', 'rock'], sky: ['sky', 'sky-1'], g: ['sand', 'sand-2'], sun: 'sun', cl: 2, hz: [['q', 260, [2, 18, 3], 'c1 .8', 0, -22], ['q', 180, [8, 12], 'sand']],
    lm: ['palm', 'chest'], pr: ['palm', 'shell', 'rock', 'bush', 'star', 'palm'], tx: [['dot', 't2']] },
  legend: { sm: ['spark'], sky: ['lilac-2', 'lilac'], g: ['lilac', 'lilac-2'], sun: 'moon', st: 6, hz: [['l', 120, [30, 20, 40], 'v1 .5'], ['q', 160, [10, 14], 'lilac']],
    lm: ['castle', 'crystal'], pr: ['tower', 'crystal', 'flagB', 'spark', 'flask', 'crystalP'], tx: [['spark', 'w']] },
  plaza: { sm: ['flowers'], sky: ['sky', 'sky-1'], g: ['peach', 'peach-2'], sun: 'sun', pp: ['p', 'y', 'c', 'g'], hz: [['b', 52, [28, 20, 34], 'o1 .45'], ['q', 180, [8, 10], 'peach']],
    lm: ['fountain', 'cactus'], pr: ['cactus', 'lamp', 'umbrella', 'flowers', 'pballoons', 'tree'], tx: [['dot', 'o1']] },
  fiesta: { sm: ['flowers'], sky: ['dusk', 'dusk-1'], g: ['sun', 'sun-2'], sun: 'sun', pp: ['r', 'c', 'y', 'v'], hz: [['q', 70, [2, 3], 'c1 .8', 0, -22], ['q', 180, [8, 12], 'sun']],
    lm: ['pinata', 'palm'], pr: ['pballoons', 'maracas', 'palm', 'flowers', 'cactus', 'pinata'], tx: [['dash', 'p'], ['dash', 'c']] },
  repaso: { sm: ['spark'], sky: ['sky', 'sky-1'], g: ['blue', 'blue-2'], sun: 'sun', cl: 2, pp: ['y', 'b', 'r'], hz: [['a', 90, [14, 20], 'b1 .5'], ['q', 170, [8, 12], 'blue']],
    lm: ['trophy', 'flag'], pr: ['flag', 'pballoons', 'spark', 'flagB', 'trophy', 'starY'], tx: [['spark', 'y']] },
  tiempo: { sm: ['flowers'], sky: ['sky', 'sky-1'], g: ['green', 'green-2'], sun: 'sun', cl: 2, hz: [['q', 130, [24, 16], 'g1 .45'], ['q', 160, [10, 16], 'green']],
    lm: ['rainbow', 'snowman'], pr: ['treeP', 'umbrellaB', 'tree', 'snowman', 'treeO', 'flowers'], tx: [['tuft', 'g2']] },
  city: { sm: ['bush'], sky: ['sky', 'sky-1'], g: ['stone', 'stone-2'], sun: 'sun', cl: 2, hz: [['b', 34, [40, 26, 54, 32, 46], 'b1 .4'], ['q', 180, [8, 10], 'stone']],
    lm: ['building', 'buildingO'], pr: ['buildingO', 'tree', 'lamp', 'traffic', 'buildingG', 'bush'], tx: [['dot', 'e1']] },
  nature: { sm: ['mushroom', 'flowers'], sky: ['sky', 'sky-1'], g: ['mint', 'mint-2'], sun: 'sun', cl: 2, hz: [['l', 30, [24, 32, 20], 'g1 .55'], ['q', 150, [12, 18], 'mint']],
    lm: ['sign', 'pine'], pr: ['pine', 'mushroom', 'tree', 'flowers', 'rock', 'bush'], tx: [['tuft', 'g2']] },
  lab: { sm: ['flask'], sky: ['sky', 'sky-1'], g: ['sea', 'sea-2'], sun: 'sun', cl: 1, hz: [['b', 60, [24, 36], 'b1 .4'], ['q', 170, [8, 12], 'sea']],
    lm: ['flask', 'bulb'], pr: ['flask', 'bulb', 'gear', 'books', 'flask', 'tele'], tx: [['bub', 'c1']] },
  observatory: { sm: ['spark'], sky: ['night', 'night-1'], g: ['lilac', 'lilac-2'], sun: 'moon', st: 14, hz: [['q', 160, [26, 14, 30], 'v1 .6'], ['q', 170, [8, 12], 'lilac']],
    lm: ['dome', 'tele'], pr: ['tele', 'planet', 'spark', 'rock', 'planetC', 'spark'], tx: [['spark', 'y1']] }
};
var SCN_W = {
  m_tiny: 'town', m_shape: 'garden', m_meadow: 'meadow', m_candy: 'candy', m_clock: 'clock', m_reef: 'reef', m_space: 'space', m_bay: 'bay',
  m_mult: 'mountain', m_frac: 'forest', m_factory: 'factory', m_desert: 'desert', m_volcano: 'volcano', m_caves: 'caves', m_sky: 'skycity',
  m_galaxy: 'galaxy',
  r_abc: 'beach', r_meadow: ['meadow', { lm: ['sunflower', 'tulip'] }], r_candy: ['candy', { lm: ['cane', 'cupcake'] }],
  r_reef: ['reef', { lm: ['fan', 'weed'] }], r_space: ['space', { lm: ['planet', 'rocket'] }], r_workshop: 'workshop',
  r_summit: ['mountain', { lm: ['mountain', 'flag'], pr: ['pine', 'flag', 'rock', 'pine', 'mountain', 'bush'] }], r_library: 'library',
  r_island: 'island', r_legend: 'legend',
  e_plaza: 'plaza', e_fiesta: 'fiesta', e_repaso: 'repaso', e_casa: ['town', { lm: ['houseG', 'tree'], pr: ['houseG', 'flowers', 'tree', 'house', 'bush', 'treeP'] }],
  e_tiempo: 'tiempo', e_ciudad: 'city', e_frases: 'fiesta', // e_frases: P2-34's world (merged in parallel with P4-09; added in P4-16)
  d_nature: 'nature', d_lab: 'lab', d_cosmos: 'observatory'
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
     n:      what one glyph is called when spoken ('number', 'big letter', 'little letter')
     lines:  {top, mid, base[, desc]}  y of the handwriting lines drawn on the board (top line, dashed middle line, base line,
             optional descender line). Digits and capitals sit from top to base; lowercase uses mid as the x-height and desc
             for the tails of g j p q y.
     order:  the glyph keys in teaching order (digits '0'..'9'; P2-17 letters in the same order as abc 1)
     glyphs: {key: {say, s}}
       say   the spoken name ('three'; a letter's name is its capital, 'A', as abc 1 says it: "the little letter A")
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
   LETTERS (P2-17): neat school print (manuscript, ball and stick), drawn to sit on Andika bold, the app's font: the sheet
   `node tools/shots.js trace-upper-sheet trace-lower-sheet` shows every stroke over the Andika letter at 30% opacity.
   Like the digits, the pen's centre line runs on the handwriting lines (tops on top or mid, bottoms on base, tails on desc) and
   down the middle of every stem and bowl. Capitals: top 10, middle 50, base 90 (Q's tail dips below the base, as in the font).
   Lowercase: the lines are set to Andika's proportions, ascender 10, x-height (mid) 34, base 75, descender 94; f does not
   descend (Andika's f sits on the base, as in ball-and-stick print). Strokes, in order (lift the pen between strokes):
     A  slant down left from the top; slant down right from the top; slide across
     B  down; from the top: slide right, curve round to the middle; from the middle: curve round to the base
     C  start top right, curve back (left) round to the bottom right                      D  down; from the top round to the base
     E  down; slide right on top; slide right in the middle; slide right on the base       F  down; top slide; middle slide
     G  like C, up the right side to the middle, slide left                               H  down; down; slide across
     I  slide across the top; down the middle; slide across the base                      J  down and curve back left
     K  down; from the top right slant in to the line, then slant out to the base          L  down, slide right
     M  down; from the top: slant down to the middle, slant up, down the right side        N  down; slant down right, push up
     O  start at the top, curve back (left) all the way round                             P  down; from the top round to the middle
     Q  as O; then the tail, slanting right                                               R  as P; then the leg, slanting right
     S  start top right, curve back, then curve forward to the bottom left                 T  slide across the top; down the middle
     U  down, round the bottom, push up                                                   V  slant down right, slant up
     W  slant down, up, down, up                                                          X  slant down right; slant down left
     Y  slant down right to the middle; slant down left to the middle and straight down   Z  slide right, slant down left, slide right
     a  c-curve (start at the right, curve back round and up); then down on the right      b  down; from the line, round the bowl
     c  start at the right, curve back to the bottom right                                d  c-curve; then the tall line down
     e  slide across the middle, then curve back round to the bottom right                f  curve back from the top, down; slide across
     g  c-curve; then down past the base and hook back left                               h  down; from the line, over and down
     i  down; dot                                                                         j  down past the base, hook back left; dot
     k  down; from the middle right slant in to the line, slant out                       l  down
     m  down; over and down; over and down                                                n  down; over and down
     o  start at the top, curve back (left) all the way round                             p  down past the base; from the line, round
     q  c-curve; then down past the base                                                  r  down; from the line, up and over
     s  start top right, curve back, then forward to the bottom left                      t  down and curve right; slide across
     u  down, round the bottom and up; then down on the right                             v  slant down right, slant up
     w  slant down, up, down, up                                                          x  slant down right; slant down left
     y  slant down right to the base; slant down left, down past the base, hook left       z  slide right, slant down left, slide right
   The tests (tools/test.js "tracing P2-16", "tracing letters P2-17") check every stroke: inside the box and between the lines,
   long enough, points apart, the stroke count and start direction above, and that ideal and noisy traces along it pass while
   wrong ones fail. */
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
    upper: {
      n: 'big letter',
      lines: { top: 10, mid: 50, base: 90 },
      order: 'SATPINMDGOCKEURHBFLJVWXYZQ'.split(''),
      glyphs: {
        A: { say: 'A', s: [
          [[49.5, 10], [20.5, 90]],
          [[49.5, 10], [78.5, 90]],
          [[29, 66], [70, 66]],
        ] },
        B: { say: 'B', s: [
          [[29, 10], [29, 90]],
          [[29, 10], [44, 10], [56, 11.5], [64, 16], [68, 24], [68.5, 33], [65, 41], [56, 46.5], [44, 48.5], [29, 48.5]],
          [[29, 48.5], [46, 48.5], [58, 49.5], [67, 54], [72, 61], [72.5, 70], [69, 79], [61, 86.5], [50, 89.5], [40, 90], [29, 90]],
        ] },
        C: { say: 'C', s: [
          [[73, 20], [66, 13], [56, 10], [45, 11], [35, 16], [28, 25], [24.5, 37], [24, 50], [25.5, 62], [30, 73], [38, 82], [49, 89],
            [60, 89.5], [69, 86], [75, 80]],
        ] },
        D: { say: 'D', s: [
          [[26, 10], [26, 90]],
          [[26, 10], [40, 10], [52, 11], [62, 15], [70, 22], [74.5, 32], [76.3, 43], [76.3, 55], [74.5, 66], [70, 76], [62, 84], [52, 89],
            [40, 90], [26, 90]],
        ] },
        E: { say: 'E', s: [
          [[34, 10], [34, 90]],
          [[34, 10], [73, 10]],
          [[34, 49], [68, 49]],
          [[34, 90], [74, 90]],
        ] },
        F: { say: 'F', s: [
          [[34, 10], [34, 90]],
          [[34, 10], [74, 10]],
          [[34, 49], [69, 49]],
        ] },
        G: { say: 'G', s: [
          [[73, 20], [66, 13], [56, 10], [45, 11], [35, 16], [28, 25], [23.5, 37], [22.6, 50], [24, 63], [29, 74], [38, 83], [50, 89.5],
            [62, 89], [71, 85], [75.5, 77], [75.5, 65], [75.5, 53.4, 1], [54, 53.4]],
        ] },
        H: { say: 'H', s: [
          [[25.5, 10], [25.5, 90]],
          [[73, 10], [73, 90]],
          [[25.5, 49.4], [73, 49.4]],
        ] },
        I: { say: 'I', s: [
          [[31, 10], [68, 10]],
          [[49.5, 10], [49.5, 90]],
          [[31, 90], [68, 90]],
        ] },
        J: { say: 'J', s: [
          [[60.5, 10], [60.5, 52], [60, 64], [57, 75], [50, 84], [41, 89.5], [32, 87.5], [26, 82]],
        ] },
        K: { say: 'K', s: [
          [[28, 10], [28, 90]],
          [[72, 10], [38, 51, 1], [75, 90]],
        ] },
        L: { say: 'L', s: [
          [[36, 10], [36, 90, 1], [75, 90]],
        ] },
        M: { say: 'M', s: [
          [[17.5, 10], [15.5, 90]],
          [[20, 10], [49.5, 89, 1], [78, 10, 1], [83, 90]],
        ] },
        N: { say: 'N', s: [
          [[24, 10], [24, 90]],
          [[24, 10], [74.5, 90, 1], [74.5, 10]],
        ] },
        O: { say: 'O', s: [
          [[49.4, 10], [40, 12.4], [31.8, 19.4], [25.7, 30], [22.4, 43.1], [22.4, 56.9], [25.7, 70], [31.8, 80.6], [40, 87.6], [49.4, 90],
            [58.8, 87.6], [67, 80.6], [73.1, 70], [76.4, 56.9], [76.4, 43.1], [73.1, 30], [67, 19.4], [58.8, 12.4], [49.4, 10]],
        ] },
        P: { say: 'P', s: [
          [[32, 10], [32, 90]],
          [[32, 10], [46, 10], [58, 11.5], [67, 16.5], [72, 25], [73, 35], [70.5, 45], [63, 52.5], [52, 56], [40, 56.5], [32, 56.5]],
        ] },
        Q: { say: 'Q', s: [
          [[48.2, 10], [38.8, 12.4], [30.6, 19.4], [24.5, 30], [21.2, 43.1], [21.2, 56.9], [24.5, 70], [30.6, 80.6], [38.8, 87.6],
            [48.2, 90], [57.6, 87.6], [65.8, 80.6], [71.9, 70], [75.2, 56.9], [75.2, 43.1], [71.9, 30], [65.8, 19.4], [57.6, 12.4],
            [48.2, 10]],
          [[57, 83], [66, 89], [76, 93], [87, 95]],
        ] },
        R: { say: 'R', s: [
          [[29, 10], [29, 90]],
          [[29, 10], [44, 10], [56, 11.5], [64, 16], [68, 24], [68.5, 33], [65.5, 42], [58, 49], [47, 52.4], [29, 52.4]],
          [[49, 52.4], [75, 90]],
        ] },
        S: { say: 'S', s: [
          [[71, 20], [63, 13], [53, 10], [43, 11], [35, 16], [31.5, 25], [32, 34], [37, 41], [46, 46], [55, 51], [64, 56.5], [69.5, 63],
            [70.5, 71], [67, 80], [59, 87], [48, 90], [37, 89], [29.5, 85], [25.5, 79]],
        ] },
        T: { say: 'T', s: [
          [[20, 10], [79, 10]],
          [[49.3, 10], [49.3, 90]],
        ] },
        U: { say: 'U', s: [
          [[26.2, 10], [26.2, 55], [27.2, 66], [31, 76], [38.5, 84.5], [49.3, 90], [60, 84.5], [67.5, 76], [71.3, 66], [72.3, 55],
            [72.3, 10]],
        ] },
        V: { say: 'V', s: [
          [[21, 10], [49.4, 89, 1], [78, 10]],
        ] },
        W: { say: 'W', s: [
          [[5, 10], [24.5, 89, 1], [49, 10, 1], [74, 89, 1], [93.5, 10]],
        ] },
        X: { say: 'X', s: [
          [[27, 10], [73.5, 90]],
          [[72, 10], [24.5, 90]],
        ] },
        Y: { say: 'Y', s: [
          [[23, 10], [49.4, 52]],
          [[76, 10], [49.4, 52, 1], [49.4, 90]],
        ] },
        Z: { say: 'Z', s: [
          [[25, 10], [76.5, 10, 1], [22, 90, 1], [77, 90]],
        ] },
      },
    },
    lower: {
      n: 'little letter',
      lines: { top: 10, mid: 34, base: 75, desc: 94 },
      order: 'satpinmdgockeurhbfljvwxyzq'.split(''),
      glyphs: {
        a: { say: 'A', s: [
          [[61, 40], [55, 35], [46, 34.5], [39, 39], [35, 47], [34.3, 56], [36, 66], [41.5, 74], [49, 71], [54, 64], [59, 57.5]],
          [[63.5, 34], [65.5, 75]],
        ] },
        b: { say: 'B', s: [
          [[36.5, 10], [36.5, 75]],
          [[37, 46], [42, 38.5], [50, 34.6], [58.5, 36], [63.5, 43], [65.3, 52], [65, 61], [61, 69], [53.5, 74], [45, 74.5], [37.5, 71]],
        ] },
        c: { say: 'C', s: [
          [[62.5, 40.5], [56, 35], [48, 35], [41.5, 40], [38.5, 48], [38.5, 57], [41, 65], [47, 71.5], [55, 74.5], [63, 70]],
        ] },
        d: { say: 'D', s: [
          [[61, 40], [55, 35], [46, 34.5], [38.5, 39], [35, 47], [34.2, 56], [35.5, 65], [41, 72], [49, 74.5], [56.5, 72], [62, 66]],
          [[63.7, 10], [64.8, 75]],
        ] },
        e: { say: 'E', s: [
          [[37.5, 53], [62.5, 53, 1], [61.5, 44.5], [57, 38], [50.5, 34.5], [43.5, 36], [38.5, 42], [36.8, 50.5], [37.3, 59.5], [40.5, 67],
            [47, 72.5], [55.5, 74.5], [63.5, 70]],
        ] },
        f: { say: 'F', s: [
          [[65, 18.5], [58.5, 11.5], [50.5, 12], [48.7, 22], [48.7, 75]],
          [[37, 35.5], [62.5, 35.5]],
        ] },
        g: { say: 'G', s: [
          [[61, 40], [55, 35], [46, 34.5], [39.5, 39], [36.3, 47], [35.8, 56], [37.5, 65], [43, 72], [50.5, 74.5], [57, 71.5], [62, 66]],
          [[63.1, 34], [63.1, 74], [62, 83], [57, 90], [49, 93.5], [41.5, 92], [36, 86.5]],
        ] },
        h: { say: 'H', s: [
          [[36.2, 10], [36.2, 75]],
          [[37, 47], [42, 39], [49.5, 34.8], [57.5, 35.5], [62.5, 41.5], [64.1, 50], [64.1, 75]],
        ] },
        i: { say: 'I', s: [
          [[50, 34], [50.2, 75]],
          [[50, 19.5]],
        ] },
        j: { say: 'J', s: [
          [[50.9, 34], [50.9, 77], [48.5, 86], [42, 92.5], [33.5, 86.5]],
          [[51, 19.5]],
        ] },
        k: { say: 'K', s: [
          [[38.1, 10], [38.1, 75]],
          [[63.5, 34], [44.5, 52.5, 1], [65.5, 75]],
        ] },
        l: { say: 'L', s: [
          [[49.8, 10], [50.2, 75]],
        ] },
        m: { say: 'M', s: [
          [[26, 34], [26.8, 75]],
          [[27.5, 46], [32.5, 38], [40.5, 34.5], [47.5, 37], [50.3, 46], [50.3, 75]],
          [[51, 46], [56, 38], [64, 34.5], [71, 37], [73.8, 46], [73.8, 75]],
        ] },
        n: { say: 'N', s: [
          [[35.5, 34], [36.4, 75]],
          [[37, 46], [42, 38.5], [50, 34.6], [57.5, 35.5], [62.5, 41], [64.3, 50], [64.3, 75]],
        ] },
        o: { say: 'O', s: [
          [[49.9, 34], [42.3, 37.3], [37.2, 46], [36, 57.4], [39.3, 67.9], [46, 74.2], [53.8, 74.2], [60.5, 67.9], [63.8, 57.4], [62.6, 46],
            [57.5, 37.3], [49.9, 34]],
        ] },
        p: { say: 'P', s: [
          [[35.5, 34], [36.8, 94]],
          [[37, 46], [42, 38.5], [50, 34.6], [58.5, 36], [63.5, 43], [65.4, 52], [65, 61], [61, 69], [53.5, 74], [45, 74.5], [37.5, 71]],
        ] },
        q: { say: 'Q', s: [
          [[61, 40], [55, 35], [46, 34.5], [39, 39], [35.8, 47], [35.3, 56], [37, 65], [42.5, 72], [50, 74.5], [57, 71.5], [61.5, 66]],
          [[62.9, 34], [63.3, 94]],
        ] },
        r: { say: 'R', s: [
          [[39.8, 34], [41.4, 75]],
          [[41.4, 58], [41.5, 47], [45, 39], [52, 34.7], [59.5, 36], [64.5, 44]],
        ] },
        s: { say: 'S', s: [
          [[61.5, 40.5], [56, 35.5], [48, 34.5], [41.5, 38], [39.3, 45], [44, 51.5], [52.5, 55.5], [60, 59.5], [62.6, 67.5], [57.5, 73.5],
            [49, 75], [41, 73], [36.5, 67.5]],
        ] },
        t: { say: 'T', s: [
          [[46.6, 21], [46.6, 58], [48.5, 67.5], [55, 74], [63, 70.5]],
          [[35, 35.5], [61, 35.5]],
        ] },
        u: { say: 'U', s: [
          [[36.2, 34], [36.4, 56], [37.5, 65], [42, 72.5], [49, 74], [55.5, 70], [60.5, 63.5], [63.2, 55], [63.3, 34]],
          [[63.3, 34], [65.5, 75]],
        ] },
        v: { say: 'V', s: [
          [[34.5, 34], [50, 74.5, 1], [65.5, 34]],
        ] },
        w: { say: 'W', s: [
          [[25.5, 34], [37.3, 74.5, 1], [49.9, 34, 1], [62.6, 74.5, 1], [74.5, 34]],
        ] },
        x: { say: 'X', s: [
          [[35, 34], [65, 75]],
          [[64.8, 34], [34.5, 75]],
        ] },
        y: { say: 'Y', s: [
          [[35, 34], [50.5, 68]],
          [[65.3, 34], [51, 67, 1], [50.7, 77], [47.5, 86.5], [40.5, 93], [32.5, 87.5]],
        ] },
        z: { say: 'Z', s: [
          [[35.5, 34], [65, 34, 1], [34.5, 75, 1], [65, 75]],
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
/* Wearable drawings (P4-07; DESIGN_SYSTEM.md 6.4). Code and rules: src/js/17-wear.js (helpers wVol, wBall, wLn, wHi, wStar ...; rwStarD / rwSpark from 18-reward-art.js).
   WEAR[id] = markup on the 64 grid, keyed by the item id the save stores (the emoji in 42-paths.js SHOP and BPRIZE).
   Hats: bottom centre (32, 60) sits on the head. Toys: the hand holds (32, 32). WEAR_EMB[id] = a prize emblem on the 64 grid,
   centred on (32, 32), shown on a gold rosette (the boss-prize hats here, and RW.badge on the boss intro).
   This file only builds strings while it loads (the helpers are code, loaded before it). */
// item names, shown and spoken on the shop cards
var WEAR_NAME = {
  '🧢': 'Cap', '🎀': 'Bow', '🎩': 'Top hat', '⛑️': 'Helmet', '🎓': 'Grad cap', '👑': 'Crown',
  '🎈': 'Balloon', '🍭': 'Lollipop', '⚽': 'Ball', '🧸': 'Teddy', '🪁': 'Kite', '🪄': 'Magic wand', '🏆': 'Trophy',
  '🌼': 'Daisy badge', '⭐': 'Star badge', '🎉': 'Party badge', '🪐': 'Planet badge', '🌈': 'Rainbow badge', '🔥': 'Fire badge',
  '💎': 'Gem badge', '🍀': 'Clover badge', '🌙': 'Moon badge', '⚡': 'Lightning badge', '🍩': 'Donut badge', '🎵': 'Music badge',
};
var WEAR = WEAR || {};
var WEAR_EMB = WEAR_EMB || {};

// ---- hats ----
// cap: a blue cap worn a little sideways, the peak to the right, a gold star on the front
WEAR['🧢'] = wContact(21) +
  wVol('M10 58C9 38 19 25 32 25C45 25 55 38 54 58Q32 64 10 58Z', 'b2', 'b') +
  wLn('M32 27.5Q31 42 32 58M21 31Q18.5 44 20 59M43 31Q45.5 44 44 59', 'b2', 1.6, .7) +
  wHi(19.5, 39, 3.4, 8, 18, 'b1', .9) +
  `<path ${wF('b3')} d="M11 54Q32 60 53.5 54L54 58Q32 64 10 58Z" opacity=".55"/>` +
  `<path ${wF('b3')} d="M37 55Q51 51 61.5 55.5Q63.5 60 58.5 62Q46 65 35 62Z"/>` +
  `<path ${wF('b2')} d="M36 54Q50 49.5 60.5 53.5Q62.5 57.5 58 59.5Q46 62 34.5 59.5Z"/>` +
  `<path ${wF('b')} d="M37 53.5Q49 49.5 58.5 52.5Q55 54.5 46 55.5Q40 56.5 36 56Z"/>` +
  wStar(31, 43, 7.2) +
  `<circle cx="32" cy="25.5" r="3.6" ${wF('b2')}/><circle cx="31.3" cy="24.8" r="2.7" ${wF('b')}/>`;

// bow: a big red bow with a knot and two short tails
WEAR['🎀'] = (() => {
  const loop = 'M30 46C22 35 7 30 4.5 39.5C2.5 48 7 58.5 14.5 58C21 57.5 27 53 30 49.5Z';
  const fold = 'M29 47.5C24 42 16 40 14 43.5C17.5 46 23 48.5 29 50Z';
  const tail = 'M29.5 51L19 63.5L24.5 62.5L26.5 67L33 54Z';
  return wVol(tail, 'r3', 'r2', .9) + wVol(wFlip(tail), 'r3', 'r2', .9) +
    wVol(loop, 'r2', 'r') + wVol(wFlip(loop), 'r2', 'r') +
    `<path ${wF('r3')} d="${fold}" opacity=".7"/><path ${wF('r3')} d="${wFlip(fold)}" opacity=".7"/>` +
    wLn('M25 41.5C18 36.5 10.5 34.5 8.5 39', 'r1', 2.4, .9) + wLn('M39 41.5C45 37 52 35.5 55 37.5', 'r1', 2.2, .6) +
    `<ellipse cx="32.4" cy="49.6" rx="6.6" ry="7.6" ${wF('r2')}/><ellipse cx="31.6" cy="48.6" rx="5.6" ry="6.6" ${wF('r')}/>` +
    wHi(29.8, 45.8, 2, 2.8, 20, 'r1', .95);
})();

// top hat: ink, a red band, the top face catching the light
WEAR['🎩'] = wContact(23) +
  wVol('M5 56.5Q5 50 32 50Q59 50 59 56.5Q59 62.5 32 62.5Q5 62.5 5 56.5Z', 'k', 'k2', .95) +
  `<path ${wF('k')} d="M14.5 53L16.5 24Q32 19.5 47.5 24L49.5 53Q32 58.5 14.5 53Z"/>` +
  `<path ${wF('k2')} d="M14.5 52L16.5 24Q31 20 44.5 23L46 53.5Q30 56.5 14.5 52Z"/>` +
  `<ellipse cx="32" cy="24" rx="15.5" ry="4" ${wF('e3')}/><ellipse cx="31" cy="23.7" rx="12" ry="2.6" ${wF('e2')} opacity=".5"/>` +
  `<path ${wF('r2')} d="M15.2 42.5Q32 47.5 48.8 42.5L49.5 53Q32 58.5 14.5 53Z"/>` +
  `<path ${wF('r')} d="M15.2 42.5Q31 46.8 45.5 43.3L46 51.5Q30 55.5 14.6 51.3Z"/>` +
  wLn('M17.5 45.2Q24 47.2 31 47.4', 'r1', 1.8, .9) +
  wLn('M21 28.5L20 40', 'e2', 3, .45) + wLn('M7 57Q8 53 18 52', 'e2', 2.2, .5);

// helmet: a red rescue helmet with a white cross
WEAR['⛑️'] = wContact(23) +
  wVol('M9 57C9 35 19 22 32 22C45 22 55 35 55 57Q32 61 9 57Z', 'r2', 'r') +
  `<path ${wF('r3')} d="M4.5 56.5Q32 50.5 59.5 56.5Q61.5 61.5 57 62.8Q32 58 7 62.8Q2.5 61.5 4.5 56.5Z"/>` +
  `<path ${wF('r2')} d="M5 55.8Q32 50 59 55.8Q59.5 58.5 56.5 59.6Q32 55 7.5 59.6Q4.5 58.5 5 55.8Z"/>` +
  `<rect x="28.4" y="29.4" width="8.4" height="21" rx="1.6" ${wF('w3')}/><rect x="22.4" y="35.6" width="20.4" height="8.4" rx="1.6" ${wF('w3')}/>` +
  `<rect x="27.6" y="28.6" width="8.2" height="20.6" rx="1.6" ${wF('w')}/><rect x="21.6" y="34.8" width="20.2" height="8.2" rx="1.6" ${wF('w')}/>` +
  wHi(18.5, 35, 3.6, 8.5, 28, 'r1', .9) + wHi(23, 27.5, 1.8, 2.6, 40, 'w', .7);

// graduation cap: an ink board and cap, a gold button and tassel
WEAR['🎓'] = wContact(17) +
  wVol('M15.5 38L15.5 54Q32 62.5 48.5 54L48.5 38Z', 'k', 'k2', .94) +
  `<path ${wF('k')} d="M1.5 33L32 21L62.5 33L62.5 36.5L32 48.5L1.5 36.5Z"/>` +
  `<path ${wF('k2')} d="M1.5 33L32 21L62.5 33L32 45Z"/>` +
  `<path ${wF('e3')} d="M5.5 32.6L32 22.4L32 32.8Z" opacity=".6"/>` +
  wLn('M32 33Q45 34.5 53 37.5L53 47', 'y2', 2.4) +
  `<path ${wF('y2')} d="M50 46.5Q53 44.5 56 46.5L57.5 58Q53 60.5 48.5 58Z"/><path ${wF('y')} d="M50.4 46.4Q52.6 45.2 54.8 46.4L55.6 56.6Q52.4 58.4 49.6 56.6Z"/>` +
  wLn('M51.6 48.5L51.2 55.5', 'y1', 1.6, .9) + wLn('M6.5 33.2L30 24.4', 'e3', 2, .7) +
  `<circle cx="32" cy="33" r="3" ${wF('y2')}/><circle cx="31.4" cy="32.4" r="2.2" ${wF('y')}/><circle cx="30.8" cy="31.8" r=".8" ${wF('y1')}/>`;

// crown: gold, five points with balls, red and blue gems
WEAR['👑'] = wContact(22) +
  wVol('M10 58L7.5 28L20.5 39L32 23L43.5 39L56.5 28L54 58Q32 62.5 10 58Z', 'y2', 'y') +
  `<path ${wF('y3')} d="M10.5 50Q32 54.5 53.5 50L54 58Q32 62.5 10 58Z"/>` +
  `<path ${wF('y2')} d="M10.4 49Q32 53.2 53.6 49L53.8 54.6Q32 58.8 10.3 54.6Z"/>` +
  wBall(7.5, 26.5, 3.8, 'y', 0) + wBall(32, 20.5, 4.2, 'y', 0) + wBall(56.5, 26.5, 3.8, 'y', 0) +
  wLn('M11.5 33L12.8 47', 'y1', 2.4, .9) + wLn('M27 32.5L30.5 27.5', 'y1', 2, .8) +
  `<ellipse cx="32.4" cy="52.4" rx="4.6" ry="3.6" ${wF('r3')}/><ellipse cx="31.8" cy="51.8" rx="3.8" ry="2.9" ${wF('r')}/>` +
  `<circle cx="30.6" cy="50.9" r="1.2" ${wF('w')} opacity=".8"/>` +
  `<circle cx="19.4" cy="51.5" r="2.8" ${wF('b2')}/><circle cx="18.9" cy="51" r="2.1" ${wF('b')}/>` +
  `<circle cx="44.6" cy="51.5" r="2.8" ${wF('b2')}/><circle cx="44.1" cy="51" r="2.1" ${wF('b')}/>`;

// ---- toys (the hand holds 32, 32) ----
// balloon: red, floating up and to the right on a string
WEAR['🎈'] = wLn('M38.5 25C34 28 37 31 33 34C29.5 37 33.5 40 31 44', 'e3', 1.6) +
  wVol('M38.5 -16C48.5 -16 55.5 -7.5 55.5 2.5C55.5 13 47 21.5 38.5 22.5C30 21.5 21.5 13 21.5 2.5C21.5 -7.5 28.5 -16 38.5 -16Z', 'r2', 'r', .93) +
  `<path ${wF('r2')} d="M35.5 25.5L38.5 21.5L41.5 25.5Z"/>` +
  wHi(29.5, -2.5, 4, 8, 22, 'r1', .95) + wHi(30.5, -9.5, 2, 2.6, 30, 'w', .85);

// lollipop: a pink and white swirl on a white stick
WEAR['🍭'] = (() => {
  let sp = '';
  for (let i = 0, n = 36; i <= n; i++) {
    const t = i / n * 4.6 * Math.PI, r = 1.2 + t * .92;
    sp += (i ? 'L' : 'M') + wr1(32 + Math.cos(t) * r) + ' ' + wr1(2 + Math.sin(t) * r);
  }
  return `<path ${wF('w3')} d="M30.2 12L34.2 12L34.2 47Q32.2 49.5 30.2 47Z"/><path ${wF('w')} d="M30.2 12L32.8 12L32.8 47Q31.5 48.4 30.2 47Z"/>` +
    `<circle cx="32.6" cy="2.6" r="17" ${wF('p3')}/><circle cx="31.8" cy="1.8" r="15.9" ${wF('p')}/>` +
    wLn(sp, 'w', 3.2) + wLn('M19.5 11.5Q25 17.5 33.5 17.5Q43 17 47.5 8', 'p2', 3, .55) +
    wHi(23.5, -6, 2.6, 4.6, 40, 'w', .8);
})();

// ball: a white football with ink patches (the ones at the edge are cut by the ball's outline)
WEAR['⚽'] = (() => {
  const X = 31, Y = 29, RB = 13;
  const pent = (x, y, r, a) => {
    let d = '';
    for (let i = 0; i < 5; i++) {
      const q = (a + i * 72) * Math.PI / 180;
      let px = x + Math.cos(q) * r, py = y + Math.sin(q) * r;
      const dx = px - X, dy = py - Y, l = Math.hypot(dx, dy);
      if (l > RB) { px = X + dx / l * RB; py = Y + dy / l * RB; } // keep the patch inside the ball
      d += (i ? 'L' : 'M') + wr1(px) + ' ' + wr1(py);
    }
    return d + 'Z';
  };
  let rim = '', lines = '';
  for (let i = 0; i < 5; i++) {
    const v = (-90 + i * 72) * Math.PI / 180, q = (-54 + i * 72) * Math.PI / 180;
    lines += `M${wr1(X + Math.cos(v) * 4.4)} ${wr1(Y + Math.sin(v) * 4.4)}L${wr1(X + Math.cos(v) * 13)} ${wr1(Y + Math.sin(v) * 13)}`;
    rim += `<path ${wF('k2')} stroke="var(--a-k2)" stroke-width="1.2" stroke-linejoin="round" d="${pent(X + Math.cos(q) * 13.6, Y + Math.sin(q) * 13.6, 4.6, -54 + i * 72 + 180)}"/>`;
  }
  return `<circle cx="32" cy="30" r="16" ${wF('w3')}/><circle cx="32" cy="30.2" r="14.9" ${wF('w2')}/>` +
    `<circle cx="${X}" cy="${Y}" r="13.6" ${wF('w')}/>` + wLn(lines, 'w3', 1.3) + rim +
    `<path ${wF('k2')} stroke="var(--a-k2)" stroke-width="1.4" stroke-linejoin="round" d="${pent(X, Y, 4.8, -90)}"/>` +
    wHi(24.6, 21.6, 2.2, 3.4, 40, 'w', 1);
})();

// teddy: a brown bear with a red bow tie
WEAR['🧸'] = wBall(22.5, 7.5, 5, 'n', 0) + wBall(41.5, 7.5, 5, 'n', 0) +
  `<circle cx="22.4" cy="7.6" r="2.4" ${wF('t')}/><circle cx="41.4" cy="7.6" r="2.4" ${wF('t')}/>` +
  wVol('M32 25C42 25 45 32 45 39C45 47 39 51 32 51C25 51 19 47 19 39C19 32 22 25 32 25Z', 'n2', 'n') +
  `<ellipse cx="31.4" cy="40" rx="6.4" ry="7" ${wF('t')}/>` +
  wVol('M16 30C12.5 31 11.5 37 14 40C16 42.5 19.5 40.5 20.5 37Z', 'n2', 'n', .9) +
  wVol(wFlip('M16 30C12.5 31 11.5 37 14 40C16 42.5 19.5 40.5 20.5 37Z'), 'n2', 'n', .9) +
  `<ellipse cx="24.8" cy="50" rx="6" ry="4.6" ${wF('n2')}/><ellipse cx="24.2" cy="49.4" rx="5.2" ry="3.9" ${wF('n')}/><ellipse cx="24.4" cy="50.3" rx="2.8" ry="2.2" ${wF('t')}/>` +
  `<ellipse cx="39.6" cy="50" rx="6" ry="4.6" ${wF('n2')}/><ellipse cx="39" cy="49.4" rx="5.2" ry="3.9" ${wF('n')}/><ellipse cx="39.2" cy="50.3" rx="2.8" ry="2.2" ${wF('t')}/>` +
  wBall(32, 16.5, 11.6, 'n', 0) +
  `<ellipse cx="32" cy="21" rx="5.6" ry="4.2" ${wF('t1')}/><ellipse cx="32" cy="18.8" rx="2.3" ry="1.7" ${wF('k')}/>` +
  wLn('M30 23.4Q32 24.8 34 23.4', 'k', 1.4) +
  `<circle cx="27.2" cy="14.4" r="1.8" ${wF('k')}/><circle cx="36.8" cy="14.4" r="1.8" ${wF('k')}/>` +
  `<circle cx="26.7" cy="13.8" r=".7" ${wF('w')}/><circle cx="36.3" cy="13.8" r=".7" ${wF('w')}/>` +
  `<path ${wF('r2')} d="M32 28.5L25.5 25L25.5 32ZM32 28.5L38.5 25L38.5 32Z"/><path ${wF('r')} d="M31.5 28.2L26.2 25.5L26.2 30.6ZM32.5 28.2L37.6 25.5L37.6 30.6Z"/>` +
  `<circle cx="32" cy="28.5" r="2.2" ${wF('r2')}/>`;

// kite: a red and yellow diamond kite with a tail of blue bows; the string runs down to the hand
WEAR['🪁'] = (() => {
  const T = [46, -22], R = [62, -5], B = [46, 16], L = [30, -5], C = [46, -5];
  const tri = (a, b, c, f) => `<path ${wF(f)} d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}L${c[0]} ${c[1]}Z"/>`;
  const bow = (x, y) => `<path ${wF('b2')} d="M${x} ${y}L${x - 4} ${y - 3}L${x - 4} ${y + 3}ZM${x} ${y}L${x + 4} ${y - 3}L${x + 4} ${y + 3}Z"/>` +
    `<path ${wF('b')} d="M${x} ${y}L${x - 3.4} ${y - 2.4}L${x - 3.4} ${y + 1.6}ZM${x} ${y}L${x + 3.4} ${y - 2.4}L${x + 3.4} ${y + 1.6}Z"/>`;
  return wLn('M44.5 -2Q35 14 33 33', 'e3', 1.5) + wLn('M46 16Q53 22 48.5 28.5Q44 35 50 41', 'e3', 1.5) +
    bow(49.5, 25) + bow(47, 36) +
    `<path ${wF('k')} d="M46 -23.5L63.6 -5L46 17.6L28.4 -5Z" opacity=".15"/>` +
    tri(T, C, L, 'y') + tri(T, R, C, 'r') + tri(L, C, B, 'r2') + tri(C, R, B, 'y2') +
    wLn('M46 -21L46 15M31.5 -5L60.5 -5', 'n2', 1.6) + wLn('M38 -11.5L43.5 -17.5', 'y1', 2.2, .9);
})();

// magic wand: a purple wand with a gold star and sparkles
WEAR['🪄'] = `<path ${wF('v3')} d="M23.6 46.4L36.6 9.6L40.4 11L27.4 47.8Q25 49.4 23.6 46.4Z"/>` +
  `<path ${wF('v')} d="M23.6 45.6L36.6 9.6L38.8 10.4L26 46.6Q24.6 47.6 23.6 45.6Z"/>` +
  wLn('M30.5 27L34.4 28.4M27.8 34.6L31.7 36', 'w', 2, .75) +
  wStar(40, 2, 13.5) + rwSpark(55, 13, 4.4, 'y1') + rwSpark(23, -8, 3.6, 'y1') + rwSpark(53.5, -11, 3, 'y');

// trophy: a gold cup with handles on a brown base
WEAR['🏆'] = wLn('M17.5 12Q6.5 11.5 8.5 20Q10.5 27 20 26.5M46.5 12Q57.5 11.5 55.5 20Q53.5 27 44 26.5', 'y2', 3.6) +
  wLn('M17 13.6Q9.2 13.4 10.4 19.4', 'y', 1.8, .9) +
  wVol('M15.5 7L48.5 7Q49 30.5 32 34.5Q15 30.5 15.5 7Z', 'y2', 'y', .93) +
  `<ellipse cx="32" cy="7.5" rx="16.2" ry="3.6" ${wF('y3')}/><ellipse cx="32" cy="8.6" rx="13.4" ry="2.2" ${wF('y2')}/>` +
  wStar(31.6, 19.4, 6.6, 'y') + wLn('M20 12Q20 24 25 29', 'w', 2.2, .6) +
  wVol('M28.5 33L35.5 33L36.5 42L27.5 42Z', 'y2', 'y', .9) +
  wVol('M19.5 42L44.5 42L46.5 51.5L17.5 51.5Z', 'n2', 'n', .95) +
  `<rect x="27" y="44.6" width="10" height="3.8" rx="1.2" ${wF('y1')}/>`;

// ---- boss prizes: emblems (64 grid, centre 32, 32), worn as a gold rosette badge on a headband ----
WEAR_EMB['🌼'] = (() => {
  const petal = 'M32 31C27 26 26 14 32 7C38 14 37 26 32 31Z';
  let sh = '', b = '';
  for (let i = 0; i < 8; i++) {
    sh += `<path ${wF('y2')} d="${wRot(petal, i * 45 + 2, 32.8, 32.8)}"/>`;
    b += `<path ${wF('y')} d="${wRot(wMap(petal, ([x, y]) => [x - .6, y + 1.6]), i * 45, 31.6, 31.6)}"/>`;
  }
  return sh + b + wBall(32, 32, 8.4, 'o', .7);
})();
WEAR_EMB['⭐'] = wStar(32, 33.5, 25);
WEAR_EMB['🎉'] = wVol('M6 58L19.5 25L39 44.5Z', 'y2', 'y', .9) +
  wLn('M11.5 45L21.5 52M15 36.5L29.5 47', 'r', 3.6) +
  `<ellipse cx="29.5" cy="34.5" rx="13" ry="4.4" transform="rotate(45 29.5 34.5)" ${wF('y3')}/>` +
  wLn('M33 28Q36 18 44 17Q52 16 51 8', 'p', 3) + wLn('M38 33Q46 31 50 36Q54 41 60 38', 'b', 3) +
  `<rect x="40" y="22" width="5" height="5" rx="1" transform="rotate(20 42.5 24.5)" ${wF('g')}/>` +
  `<rect x="27" y="10" width="5" height="5" rx="1" transform="rotate(-25 29.5 12.5)" ${wF('v')}/>` +
  `<circle cx="55" cy="22" r="2.8" ${wF('r')}/><circle cx="36" cy="7" r="2.4" ${wF('o')}/><circle cx="48" cy="46" r="2.4" ${wF('v')}/>`;
WEAR_EMB['🪐'] = `<ellipse cx="32" cy="33" rx="28" ry="8" transform="rotate(-18 32 33)" fill="none" stroke="var(--a-o2)" stroke-width="4.4"/>` +
  wBall(32, 32, 17, 'v', .8) + wLn('M18 30Q26 26 40 21', 'v1', 3, .5) +
  `<path fill="none" stroke="var(--a-o)" stroke-width="4.4" stroke-linecap="round" d="M5.2 41.7Q12 47 32 41.5Q52 35.5 58.8 24.3"/>`;
WEAR_EMB['🌈'] = wLn('M8 46C8 32 19 22 32 22C45 22 56 32 56 46', 'r', 4.6) +
  wLn('M12.5 46C12.5 35 21 26.5 32 26.5C43 26.5 51.5 35 51.5 46', 'o', 4.6) +
  wLn('M17 46C17 37.5 23.5 31 32 31C40.5 31 47 37.5 47 46', 'y', 4.6) +
  wLn('M21.5 46C21.5 40 26 35.5 32 35.5C38 35.5 42.5 40 42.5 46', 'g', 4.6) +
  wLn('M26 46C26 42.5 28.5 40 32 40C35.5 40 38 42.5 38 46', 'b', 4.6) +
  [[10, 47], [54, 47]].map(([x, y]) => {
    const cloud = `M${x - 10} ${y + 5}C${x - 11} ${y - 1} ${x - 6} ${y - 4} ${x - 2} ${y - 2}C${x} ${y - 7} ${x + 8} ${y - 6} ${x + 8} ${y - 1}` +
      `C${x + 12} ${y - 1} ${x + 12} ${y + 5} ${x + 8} ${y + 5}Z`;
    return `<path ${wF('w3')} d="${cloud}"/><path ${wF('w')} d="${wMap(cloud, ([u, v]) => [x + 1 + (u - x - 1) * .92 - .6, y + (v - y) * .9 - 1.2])}"/>`;
  }).join('');
WEAR_EMB['🔥'] = wVol('M32 4C39 16 52 23 50 40C49 52 41 59 32 59C23 59 14 52 14 41C14 31 21 27 23 18C28 24 28 30 30 32C29 21 28 13 32 4Z', 'r2', 'r', .93) +
  `<path ${wF('o')} d="M31.5 22C36 30 44 34 43 44C42 51 37 55 31.5 55C25.5 55 20.5 50.5 20.5 44C20.5 37 26 34 27 28C29.5 31 30 34 31 36C31 31 30 27 31.5 22Z"/>` +
  `<path ${wF('y')} d="M31.5 36C34 41 37.5 43 37 48C36.6 52 34.2 54 31.5 54C28.6 54 26 52 26 48.5C26 45 28.6 43.4 29.6 40.4C30.6 42 31 43 31.4 44C31.6 41 31 39 31.5 36Z"/>` +
  wHi(22, 38, 2.4, 5, 20, 'o1', .8);
WEAR_EMB['💎'] = `<path ${wF('c2')} d="M6 25L17 11L47 11L58 25L32 57Z"/>` +
  `<path ${wF('c1')} d="M17 11L25 25L32 11Z"/><path ${wF('c')} d="M32 11L39 25L47 11Z"/>` +
  `<path ${wF('c')} d="M6 25L17 11L25 25Z"/><path ${wF('c2')} d="M47 11L58 25L39 25Z"/>` +
  `<path ${wF('w')} d="M25 25L32 11L39 25Z" opacity=".75"/>` +
  `<path ${wF('c')} d="M6 25L25 25L32 57Z"/><path ${wF('c1')} d="M25 25L39 25L32 57Z"/><path ${wF('c3')} d="M39 25L58 25L32 57Z" opacity=".75"/>` +
  rwSpark(16.5, 18.5, 3.6, 'w');
WEAR_EMB['🍀'] = (() => {
  const leaf = 'M32 31C26 26 18.5 24 18.5 16.5C18.5 10 26.5 8 32 14C37.5 8 45.5 10 45.5 16.5C45.5 24 38 26 32 31Z';
  let h = wLn('M33 33Q37 46 44 56', 'g3', 4);
  for (const a of [0, 90, 180, 270]) h += wVol(wRot(leaf, a), 'g2', 'g', .9);
  return h + wLn('M24 13.5Q22 16 23.5 19.5', 'g1', 2.4, .9) + `<circle cx="32" cy="32" r="3.2" ${wF('g2')}/>`;
})();
WEAR_EMB['🌙'] = wVol('M41 6C25 8 13 20 13 35C13 49 25 59 39 59C47 59 53 55 56 50C47 52 37 49 32 41C25 30 29 14 41 6Z', 'y2', 'y', .93) +
  wLn('M23 20Q18 28 18.5 37', 'y1', 3, .9) + rwSpark(48, 18, 5, 'y1') + rwSpark(53, 34, 3, 'y1');
WEAR_EMB['⚡'] = wVol('M39 3L14 35L30 35L23 61L51 25L35 25L44 3Z', 'y2', 'y', .93) + wLn('M36.5 9L22.5 28.5', 'y1', 2.6, .9);
WEAR_EMB['🍩'] = `<circle cx="32.6" cy="33.6" r="24" ${wF('t2')}/><circle cx="31.6" cy="32.6" r="22.6" ${wF('t')}/>` +
  `<path ${wF('p2')} d="M12 30C12 18 21 11 32 11C44 11 52.5 19 52.5 30C52.5 37 49 38 47 41C45 44 43 46 40 46C37 46 36 48 33 49C29 50 26 46 23 46C19 46 18 42 16 40C13.5 38 12 36 12 30Z"/>` +
  `<path ${wF('p')} d="M12 29C12 17.5 21 10.5 31.5 10.5C43 10.5 51 18 51 28.5C51 35 48 36.5 46 39.5C44 42.5 42 44 39 44C36 44 35 46 32.5 47C29 48 26 44.5 23 44.5C19.5 44.5 18.5 40.5 16.5 38.5C14 36.5 12 34.5 12 29Z"/>` +
  `<circle cx="32" cy="32" r="7.2" ${wF('t3')}/><circle cx="32.6" cy="32.6" r="6" ${wF('w')}/>` +
  [[20, 22, 30, 'y'], [27, 16, -40, 'b'], [41, 17, 20, 'w'], [45, 27, -60, 'y'], [22, 33, 70, 'w'], [38, 41, 10, 'b'], [26, 41, -30, 'y'], [44, 35, 45, 'g']]
    .map(([x, y, a, c]) => `<rect x="${x - 2.6}" y="${y - 1}" width="5.2" height="2" rx="1" transform="rotate(${a} ${x} ${y})" ${wF(c)}/>`).join('') +
  wHi(19, 17, 2.4, 4.4, 45, 'w', .6);
WEAR_EMB['🎵'] = `<path ${wF('v2')} d="M21 15L49 7L49 15L21 23Z"/>` +
  `<rect x="20" y="16" width="4" height="34" rx="1.6" ${wF('v2')}/><rect x="45.4" y="8.6" width="4" height="34" rx="1.6" ${wF('v2')}/>` +
  `<ellipse cx="17.6" cy="50" rx="8" ry="6" transform="rotate(-20 17.6 50)" ${wF('v2')}/><ellipse cx="16.8" cy="49.2" rx="6.8" ry="4.8" transform="rotate(-20 16.8 49.2)" ${wF('v')}/>` +
  `<ellipse cx="43" cy="43" rx="8" ry="6" transform="rotate(-20 43 43)" ${wF('v2')}/><ellipse cx="42.2" cy="42.2" rx="6.8" ry="4.8" transform="rotate(-20 42.2 42.2)" ${wF('v')}/>` +
  `<path ${wF('v')} d="M21 14.2L48.2 6.6L48.2 11.4L21 19Z"/>` + wHi(14.6, 47.6, 2, 1.2, -20, 'v1', .9) + wHi(40, 40.6, 2, 1.2, -20, 'v1', .9);

// the prize hat: a headband in the prize's colour with a gold rosette, the emblem on its white face
(() => {
  const BAND = { '🌼': 'g', '⭐': 'b', '🎉': 'v', '🪐': 'v', '🌈': 'b', '🔥': 'r', '💎': 'c', '🍀': 'g', '🌙': 'b', '⚡': 'v', '🍩': 'p', '🎵': 'r' };
  for (const [id, h] of Object.entries(BAND)) {
    WEAR[id] = wContact(21, 62) +
      wVol('M5 64.5Q5 52 32 52Q59 52 59 64.5L52.5 64.5Q52.5 59 32 59Q11.5 59 11.5 64.5Z', h + '2', h, .96) +
      wLn('M9.5 59Q15 54.6 25 53.8', h + '1', 2, .8) +
      `<path ${wF('y2')} stroke="var(--a-y2)" stroke-width="3" stroke-linejoin="round" d="${rwStarD(32.7, 38.7, 20, 17.2, 14)}"/>` +
      `<path ${wF('y')} stroke="var(--a-y)" stroke-width="2" stroke-linejoin="round" d="${rwStarD(31.7, 37.7, 18.8, 16.2, 14)}"/>` +
      `<circle cx="32" cy="38" r="14" ${wF('y3')}/><circle cx="31.5" cy="37.5" r="13.2" ${wF('w')}/>` +
      `<g transform="translate(31.5 37.5) scale(.46) translate(-32 -32)">${WEAR_EMB[id]}</g>` +
      wLn('M16.5 31Q19 22 27.5 19.2', 'y1', 2.2, .9);
  }
})();
/* ---------- Brain Teasers word puzzles (P3-15; BRAIN_TEASERS.md 5.10) ----------
   The words themselves come from the lists the app already has: Word Search from the spelling lists (SPELL_WORDS, d-spell.js),
   Unscramble from the picture words in 20-words.js (band B, only words with a drawing) and the spelling lists with their sentences
   (bands C and D). This file only holds what those lists do not:
   - rude: letter runs a word search grid must never spell, in any direction (the BAD filter's words and a few more). A grid word
     that holds one of them, forwards or backwards (grass, shell, button ...), is not used in a word search.
   - more: real words that are not in the app's lists but are anagrams of words they hold (dog / god, star / rats, section /
     notices ...). Unscramble never uses a word whose letters spell another real word, so a scramble has exactly one answer;
     tools/test.js checks every word it can use against every word in the app's lists and these. Read only inside functions (A11). */
var BTW = {
  rude: 'fuck fuk shit dick cock suck tit tits fag cum sex ass piss crap damn hell hoe slut cunt twat nig fap wank porn poop poo butt pee fart ' +
    'turd boob kill gun',
  more: 'act god tab sub arc hips rats arts tsar sore ores eros roes ebon ones eons carb murd nett rifts ports strop prost writs ' +
    'notices auctioned reflow fowler cleats fluor pam deb nus gorf shore could cloud finder player grown silent enlist tinsel ' +
    'three ether there pots tops opts post spot stop evil vile veil live lemon melon thing night elbow below bowel north thorn ' +
    'inch chin cheap peach study dusty canoe ocean charm march cried cider taste state words sword petal plate pleat leapt ' +
    'steal least slate tales stale cheat teach diary dairy fired fried earth heart hater stone notes tones onset angle angel ' +
    'glean parts strap traps tea eat ate nip pin top pot opt tar art rat now own won tub but bus',
};

var DATA_VER='v127'; // last line: the whole file ran (checked by dataReady() before the app starts)
