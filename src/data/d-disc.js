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
