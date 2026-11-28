/* ---------- DEEP-15 (BEST-APP roadmap 15): deeper Discover and Spanish, DRAFTED for the owner (part teaches) ----------
   Every item here is listed with its reason in docs/drafts/DEEP15-READ.md and reaches a child only once that file's status line says
   "status: reviewed <name> <YYYY-MM-DD>" (DEEP15_ON, 42d-deep15on.js, BUILT by tools/build.py). deep15Apply (52y-deep15.js) adds them:
   - Discover: a world for grades 1-2, Discovery Garden (after Nature Trail), with six new stops (choice rows in the format of d-disc.js:
     question | answer | wrong answers split by ; | topic | picture (art name,emoji) | hint; a missing hint is the topic's own, D15_HINT),
     each with sort, match and order items in the KINDS2 format; and two match items and one order item at the END of each Nature Trail bank
     (a saved review item keeps its bank index).
   - Spanish: words at the END of thirteen units (the format of d-es.js: [spanish, english, picture, article, art]) and two new units.
   Pictures are ART drawings or emoji from tools/emoji-allow.txt. Nothing here draws at random. No item teaches change over time in living things. */
const D15_HINT = {
  grow: 'Think about planting something small in a cup of soil and looking at it day after day. What happens first, and what comes later?',
  pneeds: 'Think about a plant on a sunny windowsill that someone waters. What does it get there every day?',
  eat: 'Picture the whole plant from the bottom to the top. Which part of it is this food?',
  spread: 'A seed cannot walk. Think about what could carry it far away from the plant it grew on.',
  wtool: 'Think about what each tool tells you: hot or cold, wet or dry, or which way the air is moving.',
  wsafe: 'Think about how to stay safe and far from danger until a storm is over.',
  wsky: 'Think about the sky over many days and nights. What happens again and again?',
  wsun: 'Think about standing in bright sunshine, and then standing where a tree blocks the light. How does each one feel?',
  wfore: 'A forecast tells what the weather will probably be. Think about what you would wear or carry that day.',
  rocks: 'Imagine holding it in your hand. Is it hard or soft, big or small, smooth or rough?',
  soil: 'Think about digging in a garden. What do you find in the dirt, and what lives in it?',
  mater: 'Think about the job the thing has to do. Which material could do that job well?',
  change: 'Some changes to the land happen in a few minutes. Others take a very long time. Which kind is this?',
  mach: 'A simple machine makes work easier. Think about what the tool helps you lift, move, split, hold or turn.',
  move: 'Think about how strong the force is, how much the thing weighs, and where it ends up.',
  longago: 'Think about how people lived long ago, before electric lights, cars and phones. What did they use instead?',
  timeline: 'Think of time as a line: what already happened, what is happening now, and what has not happened yet.',
  history: 'History is the story of the past. Which one could show how people lived before?',
  goods: 'Some things you can hold in your hands. Other times a worker does a job for you. Which is this?',
  jobs: 'Think about what this worker does all day, and the tools they use to do it.',
  money: 'Think about what grown-ups do with what they are paid, and where they go to buy and keep things.',
};
// picture answers for the new items, with Discover's own list (DISC_PIC, d-disc.js): an item whose every choice has one shows pictures
const D15_PIC = {sunflower: ['sunflower', '🌻'], 'an umbrella': ['umbrella', '☔'], 'a sled': ['sled', '🛷'], 'a beach ball': ['ball', '⚽'], 'a pebble': ['rock', '🪨'], 'a sponge': ['sponge', '🧽'], 'a cookie': ['cookie', '🍪'], 'a banana': ['banana', '🍌'], tree: ['tree', '🌳'], flower: ['flower', '🌷'], bee: ['bee', '🐝'], frog: ['frog', '🐸'], bird: ['bird', '🐦'], pumpkin: ['pumpkin', '🎃'], rock: ['rock', '🪨'], shell: ['shell', '🐚'], coin: ['coin', '🪙'], apple: ['apple', '🍎'], grapes: ['grapes', '🍇'], carrot: ['carrot', '🥕'], bike: ['bike', '🚲'], car: ['car', '🚗'], boat: ['boat', '⛵'], sled: ['sled', '🛷'], bus: ['bus', '🚌'], ball: ['ball', '⚽'], book: ['book', '📖'], box: ['box', '📦'], 'cell phone': ['phone', '📱'], bread: ['bread', '🍞'], shoes: ['shoes', '👟']};
const D15 = {
  world: {id: 'd_garden', g: 1, n: 'Discovery Garden', e: '🌻', c: '#dcfce7', nodes: [['sci_plant', 1, 'Seeds & Plants'], ['sci_wx', 1, 'Weather Watch'], ['sci_rock', 1, 'Rocks, Soil & Sand'], ['sci_mach', 1, 'Ramps & Wheels'], ['civ_past', 1, 'Long Ago & Today'], ['civ_work', 1, 'Goods & Jobs']]},
  // Science and Social studies: Discover's report strands (REP.STRANDS, 82-report.js)
  strands: {Science: 'sci_plant sci_wx sci_rock sci_mach', 'Geography and civics': 'civ_past civ_work'},
  disc: [
    {id: 'sci_plant', t: 'Seeds & Plants', e: '🌱', ico: 'seedling', rows: `
Most plants start out as a tiny ___.|seed|leaf;stem;fruit|grow
A seed is planted and watered. What grows out of it first?|a tiny root|a big flower;a ripe fruit;a pine cone|grow
A young plant that has just come up out of the soil is called a ___.|seedling|pebble;puddle;petal|grow
What does a bean plant grow from?|a bean seed|a small rock;a raindrop;a feather|grow
Many plants grow flowers. What can a flower make?|seeds|rocks;sand;rain|grow|flower,🌷
A seedling gets water and sunlight for many days. What happens?|it grows taller|it gets shorter;it turns into a seed;it stays the same size|grow
What do plants need to live and grow?|water and sunlight|darkness and ice;milk and juice;salt and sand|pneeds
A plant is kept in a dark closet for many days. What will happen to it?|it turns pale and weak|it grows stronger;it grows more flowers;it stays just the same|pneeds
A plant gets no water for a long time. What happens?|it wilts and droops|it grows taller;it makes more fruit;it gets new leaves|pneeds
Water goes into a plant through its ___.|roots|petals;flowers;seeds|pneeds
Plants need light. Where would a plant grow best?|by a sunny window|inside a dark box;inside a freezer;under a thick rug|pneeds||Think about the places in a house where light comes in.
Two plants get the same water. One sits in the sun and one sits in a dark cupboard. Which grows better?|the one in the sun|the one in the cupboard;they grow the same;neither one grows|pneeds
Plants growing too close together have a hard time. What do they need more of?|space|noise;salt;ice|pneeds
Plants make their own food. What do they use to make it?|sunlight, air and water|soil, rocks and sand;milk, eggs and bread;snow, ice and wind|pneeds
When you eat a carrot, which part of the plant are you eating?|the root|the flower;the leaf;the seed|eat|carrot,🥕
When you eat lettuce, which part of the plant are you eating?|the leaves|the roots;the seeds;the flowers|eat
When you eat a peanut, you are eating a plant's ___.|seed|root;leaf;flower|eat|peanut,🥜
An apple is the ___ of an apple tree.|fruit|root;leaf;stem|eat|apple,🍎
A pea pod holds the plant's ___.|seeds|roots;leaves;flowers|eat
A dandelion seed has a fluffy top. What carries it far away?|the wind|a worm;a snail;a ladybug|spread
A burr is a seed with tiny hooks. How does it travel?|it sticks to animal fur|it floats on the wind;it rolls down hills;it swims in ponds|spread
A coconut can float. How can a coconut seed get to a new island?|by floating on water|by flying on the wind;by rolling on roads;by sticking to fur|spread
A squirrel buries acorns and forgets some. What can a forgotten acorn do?|grow into an oak tree|turn into a stone;become a maple tree;grow into a berry bush|spread
Bees visit flowers. What do they carry from flower to flower that helps make seeds?|pollen|honey;water;sand|spread|bee,🐝
`,
      kinds: [
        {form: 'sort', topic: 'grow', q: 'Sort them: a plant or an animal?', hint: 'Plants grow in one place and make their own food. Animals move around to find food.', bins: {plant: ['tree', 'flower', 'sunflower'], animal: ['bee', 'frog', 'bird']}},
        {form: 'sort', topic: 'grow', q: 'Sort them: can it grow from a seed, or not?', hint: 'Living plants come from seeds. Things that were never alive do not.', bins: {'grows from a seed': ['tree', 'sunflower', 'pumpkin'], 'does not': ['rock', 'shell', 'coin']}},
        {form: 'match', topic: 'eat', q: 'Match each food to the plant part: carrot, lettuce and apple.', hint: 'One grows under the ground, one is green and flat, and one holds seeds.', pairs: [['carrot', 'root'], ['lettuce', 'leaf'], ['apple', 'fruit']]},
        {form: 'match', topic: 'spread', q: 'Match each seed to how it travels: dandelion, burr and coconut.', hint: 'Fluffy seeds fly, hooked seeds hold on, and big round seeds can float.', pairs: [['dandelion', 'wind'], ['burr', 'animal fur'], ['coconut', 'water']]},
        {form: 'order', topic: 'grow', q: 'Put them in order: how does a bean plant grow?', hint: 'Start with what you put in the soil.', order: ['seed', 'sprout', 'young plant', 'plant with beans']},
        {form: 'sort', topic: 'eat', q: 'Sort the foods: is it a fruit or a root?', hint: 'Does it grow under the ground, or does it hold seeds?', bins: {fruit: ['apple', 'grapes', 'banana'], root: ['carrot', 'radish']}},
        {form: 'sort', topic: 'grow', q: 'Sort them: is it a seed, or not?', hint: 'If you plant it and water it, will a new plant come up?', bins: {seed: ['acorn', 'peanut', 'bean'], 'not a seed': ['rock', 'button']}},
        {form: 'match', topic: 'pneeds', q: 'Match each plant part to its job: roots, leaves and flower.', hint: 'One is under the ground, one faces the sun, and one is colorful.', pairs: [['roots', 'take in water'], ['leaves', 'make food'], ['flower', 'makes seeds']]},
        {form: 'order', topic: 'grow', q: 'Put them in order: how does an apple tree make apples?', hint: 'In spring the tree is covered in white and pink.', order: ['flower', 'small green fruit', 'ripe apple']}]},
    {id: 'sci_wx', t: 'Weather Watch', e: '🌧', ico: 'cloud', rows: `
Which tool tells you how hot or cold it is outside?|a thermometer|a ruler;a clock;a measuring cup|wtool
The red line in a thermometer goes up. What does that mean?|it is getting warmer|it is getting colder;it is getting darker;it is getting windier|wtool
A rain gauge is a tool that measures ___.|how much rain fell|how hot it is;how fast the wind blows;how tall the clouds are|wtool
A windsock is flapping straight out. What does that tell you?|it is windy|it is raining;it is hot;it is snowing|wtool
A forecast tells us ___.|what the weather will probably be|what day of the week it is;how many hours are in a day;what time the school bus will come|wfore||Think about the person on TV or the radio who talks about tomorrow's sky.
The forecast says it will rain all day. What should you take outside?|an umbrella|a sled;a beach ball|wfore
The forecast says it will be very cold and snowy. What should you wear?|a warm coat and mittens|shorts, a T-shirt and sandals;a swimsuit;a sun hat|wfore
You hear thunder outside. What should you do?|go inside a building|stand under a tall tree;go for a swim;fly a kite|wsafe
Why is it not safe to stand under a tall tree in a thunderstorm?|lightning can hit tall things|trees make thunder;leaves are slippery;tall trees pull in all the rain|wsafe
A tornado warning comes on the radio. Where is the safest place to go?|the lowest floor, away from windows|next to a big glass window;up on the highest floor of the house;outside in the open yard|wsafe
A tornado is a ___.|spinning funnel of wind|very large, heavy snowflake;kind of rainbow;thick morning fog|wsafe
A hurricane is a giant storm that forms over ___.|warm ocean water|cold mountain tops;dry deserts;frozen lakes|wsafe
What happens to a puddle on a hot, sunny day?|it dries up|it gets deeper;it freezes;it turns into snow|wsun
You stand in bright sun, then you step under a big leafy tree. Where do you feel cooler?|in the shade|in the sun;both feel the same|wsun
Sunlight shines on a rock all afternoon. How does the rock feel?|warm|icy cold;wet;soft|wsun|rock,🪨
Which season usually has the most hours of daylight?|summer|winter;fall;spring|wsky
In winter, the sun usually sets ___ than in summer.|earlier|later;at the same time|wsky
What happens in the sky every single day?|the sun rises and sets|a rainbow;a tornado;snow falling from clouds|wsky
The Moon seems to change shape. About how long does it take to show all its shapes?|a month|a day;an hour;a hundred years|wsky|moon,🌙
Where does the sun come up in the morning?|in the east|in the west;in the north;in the south|wsky|sun,☀️
A thunderstorm is coming. What do the clouds look like?|tall and dark|small, white and puffy;thin and wispy;there are no clouds|wsky
Hail is ___.|balls of ice from storm clouds|warm drops of rain;tiny bits of sand;soft flakes of snow from winter clouds|wsky
A person whose job is to study the weather is a ___.|meteorologist|dentist;photographer;plumber|wfore
`,
      kinds: [
        {form: 'sort', topic: 'wsafe', q: 'Sort the weather: fine for playing outside, or time to go inside?', hint: 'Thunder, lightning and strong winds mean danger. Go where it is safe.', bins: {'play outside': ['sunny day', 'cloudy day', 'light breeze'], 'go inside': ['thunder', 'lightning', 'tornado']}},
        {form: 'sort', topic: 'wtool', q: 'Sort them: is it a weather tool, or not?', hint: 'A weather tool tells you about the air, the rain or the wind.', bins: {'weather tool': ['thermometer', 'rain gauge', 'windsock'], 'not a weather tool': ['spoon', 'pencil']}},
        {form: 'match', topic: 'wtool', q: 'Match each tool to what it tells you: thermometer, rain gauge and windsock.', hint: 'One has a red line, one catches drops, and one flaps in the air.', pairs: [['thermometer', 'how hot or cold'], ['rain gauge', 'how much rain'], ['windsock', 'which way the wind blows']]},
        {form: 'match', topic: 'wfore', q: 'Match the forecast to what you bring: rain, snow and hot sun.', hint: 'Think of what keeps you dry, what you ride on, and what keeps you from getting thirsty.', pairs: [['rain', 'umbrella'], ['snow', 'sled'], ['hot sun', 'water bottle']]},
        {form: 'order', topic: 'wsky', q: 'Put the seasons in order, starting with winter.', hint: 'After the cold time, flowers start to bloom.', order: ['winter', 'spring', 'summer', 'fall']},
        {form: 'sort', topic: 'wfore', q: 'Sort the clothes: for a hot day or a cold day?', hint: 'Which ones keep you cool, and which ones keep you warm?', bins: {'hot day': ['shorts', 'sun hat', 'sandals'], 'cold day': ['mittens', 'warm coat', 'scarf']}},
        {form: 'sort', topic: 'wsky', q: 'Sort them: seen in the day sky, at night, or both?', hint: 'The Moon can be up in the daytime too.', bins: {day: ['sun', 'rainbow'], night: ['stars'], both: ['moon', 'clouds']}},
        {form: 'match', topic: 'wsky', q: 'Match each weather word to what it means: hail, fog and drizzle.', hint: 'One is hard, one is hard to see through, and one is gentle.', pairs: [['hail', 'balls of ice'], ['fog', 'a cloud near the ground'], ['drizzle', 'very light rain']]},
        {form: 'order', topic: 'wtool', q: 'Put the days in order, from coldest to hottest.', hint: 'Which day would the thermometer show lowest?', order: ['snowy day', 'cool fall day', 'hot summer day']}]},
    {id: 'sci_rock', t: 'Rocks, Soil & Sand', e: '🪨', ico: 'globe', rows: `
Sand is made of tiny pieces of ___.|rock|sugar;salt;wood|rocks|beach,🏖️
Which one is the hardest?|a pebble|a sponge;a banana;a cookie|rocks
A very big rock is called a ___.|boulder|pebble;grain;crumb|rocks
A small, smooth, round rock from a river is a ___.|pebble|boulder;mountain;cliff|rocks
Why are rocks in a river often smooth and round?|moving water rubs them for a long time|the sun melts their edges;they are made smooth in a factory;they grow that way|rocks
What is soil good for?|growing plants|making ice cubes;washing dishes;cooking soup|soil
Which animal makes soil better by digging tunnels in it?|an earthworm|a goldfish;a hungry parrot;a butterfly|soil
Which kind of soil is sticky and can be shaped like dough when it is wet?|clay|sand;gravel;pebbles|soil
You pour water on dry sand. What happens?|it soaks in quickly|it sits on top in a puddle;it turns into ice;it turns the sand into rock|soil
Fossils are often found inside ___.|rock|clouds;rain;air|rocks
Which of these is NOT made of rock?|a wooden bench|a mountain;a pebble;a big stone wall|rocks
Which material would make the best window?|glass|wood;cloth;metal|mater|window,🪟
Which material is best for a warm winter hat?|wool|glass;paper;metal|mater
Which would keep you dry in the rain?|a plastic raincoat|a paper bag;a cotton towel;a thick wool sweater|mater
Which would make the strongest walls for a house?|bricks|paper;cloth;cardboard|mater|house,🏠
Which material bends and stretches easily?|rubber|stone;glass;brick|mater
Most of the water on Earth is in the ___.|oceans|lakes;rivers;clouds|change||Picture a globe. What covers most of it, and is it fresh or salty?
An earthquake shakes the ground for a few seconds. That is a ___ change to the land.|quick|slow;tiny|change
A river slowly carves a deep canyon. How long does that take?|a very long time|one afternoon;one week;one year|change||Water wears away rock only a tiny bit each year. So is a deep canyon quick to make?
Wind blows sand against a rock for many years. What happens to the rock?|it slowly wears away|it grows bigger;it turns into wood;it starts to melt|change
How can a farmer stop wind from blowing away soil?|plant rows of trees|cut down every tree;dig up the grass;leave the ground bare|change
Rain is washing a hill of dirt away. What can help hold the dirt in place?|planting grass|digging more holes;pulling up the plants;spraying more water|change
`,
      kinds: [
        {form: 'sort', topic: 'rocks', q: 'Sort them: made of rock, or not?', hint: 'Rock is hard and comes from the ground. Some bits of it are very tiny.', bins: {rock: ['pebble', 'boulder', 'sand'], 'not rock': ['leaf', 'feather', 'apple']}},
        {form: 'sort', topic: 'change', q: 'Sort the changes to the land: fast or slow?', hint: 'Did it happen in a few minutes, or over a very long time?', bins: {fast: ['an earthquake', 'a landslide', 'a volcano erupting'], slow: ['a river carving a canyon', 'wind wearing down a rock']}},
        {form: 'match', topic: 'mater', q: 'Match each material to its best use: glass, wool and brick.', hint: 'One you can see through, one is soft and warm, and one is strong and hard.', pairs: [['glass', 'window'], ['wool', 'warm hat'], ['brick', 'strong wall']]},
        {form: 'match', topic: 'rocks', q: 'Match each word to what it means: boulder, pebble and sand.', hint: 'They are all rock. Think about how big each one is.', pairs: [['boulder', 'very big rock'], ['pebble', 'small smooth rock'], ['sand', 'tiny bits of rock']]},
        {form: 'order', topic: 'rocks', q: 'Put them in order, from biggest to smallest.', hint: 'Start with the one too big to lift.', order: ['boulder', 'rock', 'pebble', 'sand']},
        {form: 'sort', topic: 'mater', q: 'Sort the materials: can you see through it, or not?', hint: 'Hold it up to a window. Does the light come through?', bins: {'see through': ['glass', 'clear plastic', 'water'], 'cannot see through': ['wood', 'brick']}},
        {form: 'sort', topic: 'mater', q: 'Sort them: does it bend easily, or is it stiff?', hint: 'Try to fold it in your hands.', bins: {bends: ['rubber band', 'paper', 'cloth'], stiff: ['brick', 'rock']}},
        {form: 'match', topic: 'soil', q: 'Match each soil to what it is like: sand, clay and topsoil.', hint: 'Rub each one between your fingers.', pairs: [['sand', 'gritty and loose'], ['clay', 'sticky when wet'], ['topsoil', 'dark and good for plants']]},
        {form: 'order', topic: 'change', q: 'Put the changes in order, from fastest to slowest.', hint: 'One is over in seconds.', order: ['an earthquake', 'a flood', 'a canyon forming']}]},
    {id: 'sci_mach', t: 'Ramps & Wheels', e: '🛞', ico: 'bolt', rows: `
Which simple machine is a slanted surface that helps move things up?|a ramp|a wheel;a pulley;a screw|mach
It is easier to push a heavy box up a ___ than to lift it straight up.|ramp|wall;fence;window|mach|box,📦
A wheel turns on a rod. What is the rod called?|an axle|an anchor;an elbow;a ladder|mach
A seesaw is a kind of ___.|lever|pulley;wheel;wedge|mach
A rope on a flagpole goes over a small wheel at the top. That wheel is a ___.|pulley|ramp;wedge;screw|mach|flag,🚩
An ax splits wood. Its sharp blade is a ___.|wedge|wheel;pulley;screw|mach
Which simple machine is like a ramp wrapped around a pole?|a screw|a wedge;a pulley;a seesaw|mach
Wagons and bikes are easy to move because they have ___.|wheels|wings;feathers;pockets|mach|bike,🚲
A doorknob is a kind of ___.|wheel and axle|ramp;pulley;wedge|mach|door,🚪
A slide at the playground is shaped like a ___.|ramp|pulley;wheel;wedge|mach
A shovel helps you lift dirt. It works like a ___.|lever|pulley;wheel;screw|mach
A doorstop is pushed under a door to hold it open. A doorstop is a ___.|wedge|wheel;pulley;screw|mach
A jar lid twists on and off. The ridges on the lid work like a ___.|screw|wheel;pulley;lever|mach
Simple machines help us by making work ___.|easier|harder;louder;messier|mach||Would you use a tool that makes a job harder? Think about why people use ramps and wheels.
You push a toy car softly, then hard. When does it go farther?|after the hard push|after the soft push;they go the same distance|move|car,🚗
A ball rolls toward you and you push it back. What happens?|it goes back the other way|it keeps rolling toward you;it rolls faster toward you|move|ball,⚽
Pulling a sled on snow is easier than on grass. Why?|snow is smooth and slippery|snow is bumpy;snow is sticky;grass is smooth|move
A shopping cart full of food is harder to push than an empty one. Why?|it is heavier|it is shinier;it is louder;it is newer|move
Which takes the smallest push to move?|a toy car with wheels|a heavy brick;a big box of books;a stack of plates|move
A magnet pulls on which one?|a steel paper clip|a crayon;a wooden block;a plastic spoon|move
What makes a swing go higher?|a bigger push|a smaller push;no push at all|move
Two ramps go up to the same step: a long, gentle ramp and a short, steep ramp. Which one is easier to push a wagon up?|the longer one|the shorter one;both are the same|move
`,
      kinds: [
        {form: 'sort', topic: 'mach', q: 'Sort them: does it have wheels, or not?', hint: 'Look for round parts that roll along the ground.', bins: {wheels: ['bike', 'car', 'bus'], 'no wheels': ['boat', 'sled']}},
        {form: 'sort', topic: 'move', q: 'Sort them: does it roll or slide when you push it?', hint: 'Round things roll. Flat things slide.', bins: {rolls: ['ball', 'marble', 'wheel'], slides: ['book', 'box', 'sled']}},
        {form: 'match', topic: 'mach', q: 'Match each simple machine to an example: ramp, pulley and wedge.', hint: 'One you slide down, one lifts a flag, and one holds a door.', pairs: [['ramp', 'playground slide'], ['pulley', 'flagpole rope'], ['wedge', 'doorstop']]},
        {form: 'match', topic: 'mach', q: 'Match each simple machine to an example: lever, screw and wheel and axle.', hint: 'One goes up and down, one twists, and one turns to open a door.', pairs: [['lever', 'seesaw'], ['screw', 'jar lid'], ['wheel and axle', 'doorknob']]},
        {form: 'order', topic: 'move', q: 'Put the carts in order, from easiest to hardest to push.', hint: 'The more it holds, the heavier it is.', order: ['an empty cart', 'a cart with two books', 'a cart full of rocks']},
        {form: 'sort', topic: 'move', q: 'Sort them: a push or a pull?', hint: 'A push moves something away from you. A pull brings it closer.', bins: {push: ['kick a ball', 'press a button'], pull: ['open a drawer', 'tug a rope', 'pick an apple']}},
        {form: 'sort', topic: 'mach', q: 'Sort them: a lever, or a wheel and axle?', hint: 'One kind tips up and down. The other kind turns round and round.', bins: {lever: ['seesaw', 'shovel'], 'wheel and axle': ['doorknob', 'wagon wheel', 'bike wheel']}},
        {form: 'match', topic: 'mach', q: 'Match each job to the simple machine that helps: lift a flag, split wood and roll a heavy load.', hint: 'Think of a rope, a blade and something round.', pairs: [['lift a flag', 'pulley'], ['split wood', 'wedge'], ['roll a heavy load', 'wheel and axle']]},
        {form: 'order', topic: 'move', q: 'Put the ramps in order, from easiest to hardest to push a cart up.', hint: 'The gentler the slope, the smaller the push.', order: ['a long gentle ramp', 'a medium ramp', 'a short steep ramp']}]},
    {id: 'civ_past', t: 'Long Ago & Today', e: '⏰', ico: 'clock', rows: `
Long ago, before electric lights, people lit their homes with ___.|candles|flashlights;light bulbs;televisions|longago
Long ago, before cars, many people traveled on land by ___.|horse and wagon|airplane;bus;motorcycle|longago|horse,🐴
Long ago, people sent messages far away by writing ___.|letters|emails;text messages;video calls|longago|mail,📬
Long ago, people kept food cold in an icebox. Today we use a ___.|refrigerator|toaster;oven;dishwasher|longago
Long ago, many children went to a school with ___.|one room for all grades|a computer for every child;a big gym and a lunchroom;a tablet on every desk|longago|school,🏫
Long ago, people washed clothes by hand on a ___.|washboard|washing machine;dishwasher;vacuum|longago
Which of these is from long ago?|a horse-drawn wagon|a tablet computer;a cell phone;a video game|longago
Which one did people NOT have long ago?|cell phones|candles;horses;books|longago||Candles, horses and books are very old. Which one needs a battery and a signal?
Long ago, people cooked over a fire. Today many people cook in a ___.|microwave oven|washboard;candle;icebox|longago
Long ago, people used a spinning wheel to make ___.|yarn|bread;soap;paper|longago
Long ago, there were no big supermarkets. Many families got food by ___.|growing it on a farm|ordering it on a computer;driving to a big store;using a vending machine|longago
What did children play long ago that children still play today?|tag|tablet games;phone games;online games|longago
Which is true about life long ago and today?|some things changed and some stayed the same|nothing has ever changed at all;everything changes every single day;people long ago had phones too|longago
Which word means the time that already happened?|past|present;future|timeline
Which word means the time that has not happened yet?|future|past;present|timeline
The time that is happening right now is called the ___.|present|past;future|timeline
A timeline puts events in order by ___.|when they happened|how big they are;what color they are;how much they cost|timeline||Look at the first and last things on a timeline. Which one came earlier?
A calendar helps us keep track of ___.|days, weeks and months|how tall we are;how hot it is;how far away a town is|timeline|month-jan,📆
How many days are in one week?|seven|five;ten;twelve|timeline
Many photos from long ago are in ___.|black and white|bright neon colors;moving video|history
Which of these can show the history of your family?|old photos and letters|a weather report;a grocery list;a bus schedule|history
A museum is a place where we can see ___.|things from long ago|only brand-new toys for sale;today's lunch menu;cars being fixed|history
`,
      kinds: [
        {form: 'sort', topic: 'longago', q: 'Sort them: used long ago, or new today?', hint: 'Was it around before electricity, or does it need a battery or a plug?', bins: {'long ago': ['candle', 'horse and wagon', 'washboard'], 'new today': ['cell phone', 'tablet', 'video game']}},
        {form: 'sort', topic: 'timeline', q: 'Sort the words: past or future?', hint: 'Did it already happen, or is it still coming?', bins: {past: ['yesterday', 'last year'], future: ['tomorrow', 'next week', 'next year']}},
        {form: 'match', topic: 'longago', q: 'Match long ago to today: icebox, horse and wagon, and letter.', hint: 'Think of what does the same job today.', pairs: [['icebox', 'refrigerator'], ['horse and wagon', 'car'], ['letter', 'email']]},
        {form: 'match', topic: 'timeline', q: 'Match each word to its time: yesterday, today and tomorrow.', hint: 'One already happened, one is now, and one is coming.', pairs: [['yesterday', 'past'], ['today', 'present'], ['tomorrow', 'future']]},
        {form: 'order', topic: 'timeline', q: 'Put them in order, from oldest to youngest.', hint: 'Think about who was born first in the family.', order: ['grandma', 'mom', 'baby']},
        {form: 'sort', topic: 'longago', q: 'Sort the lights: from long ago, or from today?', hint: 'Does it need a flame, or electricity?', bins: {'long ago': ['candle', 'oil lamp'], today: ['light bulb', 'flashlight', 'lamp with a switch']}},
        {form: 'sort', topic: 'longago', q: 'Sort the ways to travel: from long ago, or newer?', hint: 'Which ones need an engine?', bins: {'long ago': ['horse', 'wagon', 'sailing ship'], newer: ['airplane', 'car']}},
        {form: 'match', topic: 'longago', q: 'Match each old thing to what does its job today: washboard, candle and quill pen.', hint: 'Think of washing, lighting and writing.', pairs: [['washboard', 'washing machine'], ['candle', 'light bulb'], ['quill pen', 'ballpoint pen']]},
        {form: 'order', topic: 'longago', q: 'Put them in order, from long ago to today.', hint: 'Before engines, animals pulled people along.', order: ['horse and wagon', 'the first cars', 'cars of today']}]},
    {id: 'civ_work', t: 'Goods & Jobs', e: '🛍', ico: 'coin', rows: `
Things people make or grow to sell, like bread and shoes, are called ___.|goods|services;rules;chores|goods
Jobs people do to help others, like fixing teeth or cutting hair, are called ___.|services|goods;tools;toys|goods
Which of these is a good you can buy?|a loaf of bread|a haircut;a checkup at the doctor;a bus ride|goods
Which of these is a service someone does for you?|a haircut|a toy car;a pair of shoes;an apple|goods
A mail carrier brings letters to your home. That job is a ___.|service|good;tool;toy|goods
A farmer who grows apples to sell is a ___.|producer|consumer;shopper|goods
A person who buys and uses goods is called a ___.|consumer|producer;factory;store|goods
What does a factory do?|makes goods|puts out fires;teaches children;brings the mail|goods
A farmer grows wheat. A baker uses the wheat to make ___.|bread|shoes;bricks;glass|goods
Who fixes leaky pipes and sinks?|a plumber|a pilot;a librarian;a chef|jobs
Who flies an airplane?|a pilot|a plumber;a chef;a mechanic|jobs|plane,✈️
Who cooks meals in a restaurant?|a chef|a pilot;a plumber;a mechanic|jobs
Who fixes cars when they break?|a mechanic|a chef;a pilot;a librarian|jobs|car,🚗
Who builds things out of wood, like tables and shelves?|a carpenter|a pilot;a chef;a dentist|jobs
Most grown-ups work at jobs to ___.|earn money|lose money;get taller;stay asleep|money
You want a bike, but it costs more than you have. What can you do?|save your money|throw your money away;hide it and forget it;spend it all today|money|bike,🚲
A place that keeps money safe is a ___.|bank|bakery;library;park|money
Giving something to get something else back is called ___.|trading|sleeping;reading;running|money
The amount of money something costs is its ___.|price|color;size;name|money
Coins and paper bills are kinds of ___.|money|food;toys;stamps|money|coin,🪙
Where do people go to buy food?|a grocery store|a fire station;a library;a post office|money
`,
      kinds: [
        {form: 'sort', topic: 'goods', q: 'Sort them: a good or a service?', hint: 'Can you hold it in your hands, or is it a job someone does for you?', bins: {good: ['bread', 'shoes', 'toy car'], service: ['haircut', 'teeth cleaning']}},
        {form: 'sort', topic: 'goods', q: 'Sort them: grown on a farm, or made in a factory?', hint: 'Plants and animals live on farms. Machines make things in factories.', bins: {farm: ['apples', 'eggs', 'corn'], factory: ['cars', 'crayons']}},
        {form: 'match', topic: 'jobs', q: 'Match each worker to a tool: chef, plumber and carpenter.', hint: 'One cooks, one fixes pipes, and one cuts wood.', pairs: [['chef', 'pot'], ['plumber', 'wrench'], ['carpenter', 'saw']]},
        {form: 'match', topic: 'money', q: 'Match each place to what it does: bank, factory and store.', hint: 'One keeps money, one makes things, and one sells things.', pairs: [['bank', 'keeps money safe'], ['factory', 'makes goods'], ['store', 'sells goods']]},
        {form: 'order', topic: 'goods', q: 'Put the steps in order: how does bread get to you?', hint: 'It starts as a plant in a field.', order: ['farmer grows wheat', 'baker bakes bread', 'store sells bread', 'you buy bread']},
        {form: 'sort', topic: 'goods', q: 'Sort the workers: do they make goods or give services?', hint: 'Does the worker make a thing you can hold, or do a job for you?', bins: {goods: ['baker', 'farmer', 'toy maker'], services: ['barber', 'teacher', 'mail carrier']}},
        {form: 'sort', topic: 'money', q: 'Sort them: is it money, or not?', hint: 'Could you pay for something at a store with it?', bins: {money: ['coin', 'dollar bill'], 'not money': ['button', 'sticker', 'leaf']}},
        {form: 'match', topic: 'jobs', q: 'Match each worker to what they do: pilot, mechanic and chef.', hint: 'Think of a plane, a car and a kitchen.', pairs: [['pilot', 'flies planes'], ['mechanic', 'fixes cars'], ['chef', 'cooks food']]},
        {form: 'order', topic: 'money', q: 'Put the steps in order: how do you buy something at a store?', hint: 'You cannot take it home before you pay.', order: ['choose what you want', 'pay the price', 'take it home']}]},
  ],
  top: {
    sci_life: [
      {form: 'match', topic: 'babies', q: 'Match each baby to its grown-up: puppy, kitten and calf.', hint: 'Think of who each baby\'s mom is.', pairs: [['puppy', 'dog'], ['kitten', 'cat'], ['calf', 'cow']]},
      {form: 'match', topic: 'covers', q: 'Match each animal to what covers it: bird, fish and bear.', hint: 'Think about touching each animal.', pairs: [['bird', 'feathers'], ['fish', 'scales'], ['bear', 'fur']]},
      {form: 'order', topic: 'babies', q: 'Put them in order: how does a frog grow up?', hint: 'It starts in the water, very small.', order: ['egg', 'tadpole', 'frog']}],
    sci_earth: [
      {form: 'match', topic: 'seasons', q: 'Match each season to what you might see: winter, spring and fall.', hint: 'Think about the trees and the ground outside.', pairs: [['winter', 'snow'], ['spring', 'new flowers'], ['fall', 'falling leaves']]},
      {form: 'match', topic: 'landwater', q: 'Match each word to what it means: lake, river and beach.', hint: 'Think about where the water is, and if it moves.', pairs: [['lake', 'water with land all around'], ['river', 'water that flows'], ['beach', 'sand by the water']]},
      {form: 'order', topic: 'seasons', q: 'Put the seasons in order, starting with spring.', hint: 'After the flowers bloom, it gets hot.', order: ['spring', 'summer', 'fall', 'winter']}],
    sci_phys: [
      {form: 'match', topic: 'solid', q: 'Match each one to what it is: ice, water and steam.', hint: 'Which keeps its shape, which pours, and which floats into the air?', pairs: [['ice', 'solid'], ['water', 'liquid'], ['steam', 'gas']]},
      {form: 'match', topic: 'push', q: 'Match each one to how it moves: ball, sled and swing.', hint: 'Think about pushing each one.', pairs: [['ball', 'rolls'], ['sled', 'slides'], ['swing', 'goes back and forth']]},
      {form: 'order', topic: 'soundlight', q: 'Put them in order, from quietest to loudest.', hint: 'Which one could you hardly hear?', order: ['a whisper', 'talking', 'a shout']}],
    geo_world: [
      {form: 'match', topic: 'landforms', q: 'Match each word to what it means: island, mountain and desert.', hint: 'Think about water, height and rain.', pairs: [['island', 'land with water all around'], ['mountain', 'very high land'], ['desert', 'very dry land']]},
      {form: 'match', topic: 'mapwords', q: 'Match each direction to its letter on a compass rose.', hint: 'Each letter is the first letter of its word.', pairs: [['north', 'N'], ['south', 'S'], ['east', 'E'], ['west', 'W']]},
      {form: 'order', topic: 'mapwords', q: 'Put them in order, from smallest to biggest.', hint: 'A town is inside a state.', order: ['town', 'state', 'country', 'continent']}],
    civ: [
      {form: 'match', topic: 'helpers', q: 'Match each helper to where they work: teacher, doctor and firefighter.', hint: 'Think of the building each one goes to every day.', pairs: [['teacher', 'school'], ['doctor', 'hospital'], ['firefighter', 'fire station']]},
      {form: 'match', topic: 'symbols', q: 'Match each symbol to what it is: bald eagle, flag and Liberty Bell.', hint: 'One flies, one waves, and one rings.', pairs: [['bald eagle', 'national bird'], ['flag', 'stars and stripes'], ['Liberty Bell', 'bell with a crack']]},
      {form: 'order', topic: 'rules', q: 'Put the steps in order to cross a street safely.', hint: 'What do you do before you step off the curb?', order: ['stop at the curb', 'look left and right', 'cross when it is clear']}]},
  es: {
    animal: [['elefante', 'elephant', '🐘', 'el', 'elephant'], ['jirafa', 'giraffe', '🦒', 'la', 'giraffe'], ['tortuga', 'turtle', '🐢', 'la', 'turtle'], ['oveja', 'sheep', '🐑', 'la', 'sheep'], ['gallina', 'hen', '🐔', 'la', 'hen'], ['ratón', 'mouse', '🐭', 'el', 'mouse'], ['mariposa', 'butterfly', '🦋', 'la', 'butterfly'], ['ballena', 'whale', '🐳', 'la', 'whale']],
    food: [['fresa', 'strawberry', '🍓', 'la', 'strawberry'], ['sandía', 'watermelon', '🍉', 'la'], ['zanahoria', 'carrot', '🥕', 'la'], ['maíz', 'corn', '🌽', 'el'], ['pizza', 'pizza', '🍕', 'la', 'pizza'], ['pastel', 'cake', '🎂', 'el', 'cake'], ['arroz', 'rice', '🍚', 'el'], ['cacahuate', 'peanut', '🥜', 'el']],
    body: [['cara', 'face', '🙂', 'la'], ['brazo', 'arm', '💪', 'el'], ['corazón', 'heart', '❤', 'el'], ['hueso', 'bone', '🦴', 'el', 'bone']],
    family: [['familia', 'family', '👪', 'la']],
    color: [['gris', 'gray', 'c:#9ca3af', '']],
    greet: [['buenas tardes', 'Good afternoon', '☀', '', 'sun'], ['de nada', 'You\'re welcome', '😊', '']],
    house: [['espejo', 'mirror', '🪞', 'el'], ['reloj', 'clock', '⏰', 'el', 'clock'], ['jabón', 'soap', '🧼', 'el', 'soap'], ['escoba', 'broom', '🧹', 'la'], ['cuchara', 'spoon', '🥄', 'la', 'spoon'], ['taza', 'cup', '☕', 'la']],
    clothes: [['bufanda', 'scarf', '🧣', 'la'], ['bolsa', 'purse', '👜', 'la', 'purse'], ['anillo', 'ring', '💍', 'el']],
    school: [['crayón', 'crayon', '🖍', 'el', 'crayon'], ['regla', 'ruler', '📏', 'la'], ['pluma', 'pen', '🖊', 'la', 'pen'], ['pincel', 'paintbrush', '🖌', 'el'], ['cuaderno', 'notebook', '📒', 'el'], ['mapa', 'map', '🗺', 'el', 'map']],
    trans: [['tractor', 'tractor', '🚜', 'el'], ['trineo', 'sled', '🛷', 'el']],
    place: [['panadería', 'bakery', '🍞', 'la', 'bread'], ['gasolinera', 'gas station', '⛽', 'la'], ['aeropuerto', 'airport', '✈', 'el', 'plane'], ['puente', 'bridge', '🌉', 'el']],
    verb: [['cocinar', 'to cook', '🍳', ''], ['pintar', 'to paint', '🎨', ''], ['escuchar', 'to listen', '👂', '', 'ear'], ['mirar', 'to look', '👀', ''], ['abrir', 'to open', '🔓', ''], ['cerrar', 'to close', '🔒', '']],
    adj: [['abierto', 'open', '🔓', ''], ['cerrado', 'closed', '🔒', ''], ['duro', 'hard', '🪨', '', 'rock'], ['suave', 'soft', '🧸', '']]},
  // RELA-PICS: never offered together (the family picture shows a mom, a dad and a child; the face shows its eyes, nose and mouth)
  esConfuse: {family: [['familia', 'mamá'], ['familia', 'papá'], ['familia', 'hermano'], ['familia', 'hermana']], body: [['cara', 'ojos'], ['cara', 'nariz'], ['cara', 'boca']]},
  esNew: [
    {id: 'nature', t: 'Nature', e: '🌳', theme: 'Nature: sky, land, water and growing things', items: [['sol', 'sun', '☀', 'el', 'sun'], ['luna', 'moon', '🌙', 'la', 'moon'], ['estrella', 'star', '⭐', 'la', 'star'], ['árbol', 'tree', '🌳', 'el', 'tree'], ['flor', 'flower', '🌷', 'la', 'flower'], ['hoja', 'leaf', '🍃', 'la', 'leaf'], ['nube', 'cloud', '☁', 'la', 'cloud'], ['montaña', 'mountain', '🏔', 'la'], ['mar', 'sea', '🌊', 'el'], ['isla', 'island', '🏝', 'la'], ['piedra', 'rock', '🪨', 'la', 'rock'], ['concha', 'shell', '🐚', 'la', 'shell'], ['hongo', 'mushroom', '🍄', 'el'], ['desierto', 'desert', '🏜', 'el']]},
    {id: 'toy', t: 'Toys & Play', e: '🧸', theme: 'Toys and play things', items: [['pelota', 'ball', '⚽', 'la', 'ball'], ['globo', 'balloon', '🎈', 'el', 'balloon'], ['papalote', 'kite', '🪁', 'el', 'kite'], ['osito', 'teddy bear', '🧸', 'el'], ['tambor', 'drum', '🥁', 'el', 'drum'], ['guitarra', 'guitar', '🎸', 'la', 'guitar'], ['robot', 'robot', '🤖', 'el'], ['dado', 'dice', '🎲', 'el', 'dice'], ['rompecabezas', 'puzzle', '🧩', 'el'], ['piñata', 'piñata', '🪅', 'la'], ['trompeta', 'trumpet', '🎺', 'la', 'trumpet'], ['videojuego', 'video game', '🎮', 'el', 'gamepad'], ['patín', 'skate', '⛸', 'el']]}],
  esAt: {e_ciudad: [['es_nature', 1, 'Nature'], ['es_nature', 2, 'Read Nature']], e_casa: [['es_toy', 1, 'Toys'], ['es_toy', 2, 'Read Toys']]},
};
deep15Apply(); // the app loads this part after the data file, so the banks are there; the gate decides (52y-deep15.js). In tools/test.js, which reads
// the parts before the data, the banks are not there yet and this does nothing
