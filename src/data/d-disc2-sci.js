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
