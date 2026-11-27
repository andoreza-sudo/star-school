/* ---------- DISC-46: Discover worlds for grades 4 and 6, DRAFTED for the owner (part teaches) ----------
   Every item here is listed in docs/drafts/DISC46-READ.md and reaches a child only once that file's status line says
   "status: reviewed <name> <YYYY-MM-DD>" (DISC46_ON, 42m-disc46on.js, BUILT by tools/build.py). disc46Apply (52z-disc46.js) adds them:
   - Canyon Trail (g 4), right after Science Lab, and Volcano Ridge (g 6), right after Star Observatory, with six new stops each.
   - Each stop: choice rows in the format of d-disc.js (question | answer | wrong answers split by ; | topic | picture (art name,emoji) |
     hint; a missing hint is the topic's own, D46_HINT), then sort, match and order items in the KINDS2 format.
   Pictures are ART drawings or emoji from tools/emoji-allow.txt, and only show the subject of a question, never its answer.
   Nothing here draws at random. No item teaches change over time in living things. */
const D46_HINT = {
  // Canyon Trail (grade 4)
  enspeed: 'Think about how hard something hits when it is slow, and then when it is quick.',
  enmove: 'Follow the energy from where it starts to where it ends up. What does it turn into along the way?',
  ensource: 'Ask where the energy comes from, and whether nature can make more of it soon.',
  wavepat: 'Picture ripples on a pond: how tall they are, how far apart they are, and what they do to things they pass.',
  seeing: 'Think about where the light starts, what it hits, and where it goes next.',
  codes: 'Think about how words can be turned into a pattern, like taps, flashes or digits, and turned back again.',
  wear: 'Think about what pushes, scrapes or carries the land, and how long it keeps working.',
  layers: 'Picture a stack of pancakes. Which went down first, and which went on last?',
  hazards: 'Think about what could happen to people and buildings, and what would help protect them.',
  outside: 'Look at the part on the outside of the plant or animal. Ask what job it does for it.',
  inside: 'Think about the parts you cannot see from the outside, and what each one does to keep the body alive.',
  signals: 'Think about how a body notices something and then decides what to do about it.',
  stategov: 'Think about who runs a state, who writes its rules, and where they do it.',
  localgov: 'Think about your own town or county, and the services close to home.',
  levels: 'Ask how big an area the job covers: one town, one whole state, or the whole nation.',
  usreg: 'Picture the map of the country. Think about the land, the weather and the work people do in each part.',
  resource: 'Ask if it comes from nature, from a person and what they know how to do, or is a tool made to make other things.',
  trade: 'Think about what each place makes best, and how people get the things they cannot make themselves.',
  // Volcano Ridge (grade 6)
  pyramid: 'Picture a stack of blocks that gets smaller at each step up. Think about what eats what, and how much is passed along.',
  partner: 'Ask who gains and who is harmed, or if one of them is not affected at all.',
  limits: 'Think about what a population needs to survive. What happens when one of those needs runs short?',
  layers6: 'Picture cutting Earth open like a peach. Think about what each part is like as you go deeper.',
  motion: 'Picture slabs of rock riding on a slowly flowing layer. Think about how they move against each other.',
  quakes: 'Think about what shakes, what the shaking can cause, and what people can do to stay safe.',
  airmass: 'Think about where the weather came from: over land or sea, near the poles or near the equator, and what happens when two kinds meet.',
  pressure: 'Think about air being squeezed or spread out, and what rising and sinking air do to the sky.',
  storms: 'Think about what each storm needs to form and grow, and where it gets its energy.',
  local: 'Think about where the air or weather starts, what it passes over on its trip, and what changes along the way.',
  ground: 'Follow the rain after it lands. Does it run off, soak in, or collect somewhere?',
  spread: 'Think about how Earth made the resource, and why it is found in some places and not others.',
  impact: 'Think about what people do, what it changes in nature, and what could be done instead.',
  river: 'Think about what a big river gives the people who live along it, and picture where each one flows.',
  invent: 'Think about what problem each new idea solved for the people of long ago.',
  life: 'Think about how life changed once farmers could grow more food than their families needed.',
  greece: 'Think about how the people of Athens and Sparta ran their towns, and the ideas they gave the world.',
  rome: 'Think about how Rome was run and what the Romans built that lasted.',
  china: 'Think about what the people of that land made, traded and built.',
};
const D46 = {
  // after: the world each new one follows (by id, so it does not matter whether DEEP-15's Discovery Garden is in yet); scene: SCN_W theme (a canyon, not Decimal Desert's pyramids; no lab flasks)
  worlds: [
    {after: 'd_lab', scene: ['desert', {lm: ['mountain', 'cactus'], pr: ['cactus', 'rock', 'dune', 'mountain', 'cactus', 'rock']}], w: {id: 'd_canyon', g: 4, n: 'Canyon Trail', e: '🏜', c: '#ffedd5', nodes: [['sci_enr', 1, 'Energy at Work'], ['sci_lite', 1, 'Light & Sound'], ['sci_shape', 1, 'Shaping the Land'], ['sci_part', 1, 'Body Parts at Work'], ['civ_gov4', 1, 'Our State Government'], ['civ_reg', 1, 'Regions & Resources']]}},
    {after: 'd_cosmos', scene: ['volcano', {lm: ['volcano', 'mountain'], pr: ['rock', 'volcano', 'crystal', 'pine', 'rock', 'mountain']}], w: {id: 'd_ridge', g: 6, n: 'Volcano Ridge', e: '🌋', c: '#ffe4e6', nodes: [['sci_web', 1, 'Food Webs & Balance'], ['sci_deep', 1, 'Inside the Earth'], ['sci_storm', 1, 'Weather Systems'], ['sci_wres', 1, 'Water & Resources'], ['civ_river', 1, 'Early River Valleys'], ['civ_class', 1, 'Greece, Rome & China']]}}],
  // Science and Social studies: Discover's report strands (REP.STRANDS, 82-report.js)
  strands: {Science: 'sci_enr sci_lite sci_shape sci_part sci_web sci_deep sci_storm sci_wres', 'Geography and civics': 'civ_gov4 civ_reg civ_river civ_class'},
  disc: [
    // ---------------- Canyon Trail (grade 4) ----------------
    {id: 'sci_enr', t: 'Energy at Work', e: '⚡', ico: 'bolt', grade: '4', rows: `
Two balls are the same size. One rolls fast and one rolls slowly. Which has more energy?|the fast ball|the slow ball;they have the same;neither ball|enspeed
A bike speeds up as it goes down a hill. What happens to its energy of motion?|it gets bigger|it gets smaller;it stays the same;it disappears|enspeed
A bowling ball hits the pins and they fly apart. What did the ball pass to the pins?|energy|water;color;air|enspeed
A crash at high speed does more damage than a crash at low speed. Why?|the fast car has more energy|the slow car is heavier;fast cars are softer;slow cars have more energy than fast ones|enspeed
Two toy cars bump into each other. Which of these is made when they bump?|sound|ice;sunlight;rain|enspeed
A soccer ball is kicked harder than before. What happens?|it moves faster|it moves slower;it stops at once;it gets heavier|enspeed
When you rub your hands together quickly, they get ___.|warm|wet;cold;sticky|enmove
A doorbell button is pushed. The electricity is changed into ___.|sound|ice;water;wind|enmove|bell,🔔
Electric energy travels from a power plant to your home through ___.|wires|pipes;roads;clouds|enmove
A calculator has a small solar panel. The panel turns ___ into electricity.|light|sound;wind;water|enmove
A toy car with a battery rolls across the floor. The battery's stored energy became ___.|motion|water;color;sand|enmove
How does the sound of a bell travel to your ears?|as vibrations in the air|as light in the sky;as drops of water;as tiny sparks|enmove
You hold a cup of hot cocoa. Which way does the heat move?|from the cup to your hands|from your hands to the cup;from the cup to the ceiling only;it does not move at all|enmove
Which one changes electricity into sound?|a speaker|a lamp;a heater;a toaster|enmove
Coal, oil and natural gas formed from the remains of plants and animals that lived ___.|long ago|last year;last week;yesterday|ensource
Why are coal and oil called nonrenewable?|they take a very long time to form|they are found everywhere;they never run out;they grow back in a few weeks like grass|ensource
Which energy source will not run out?|sunlight|coal;oil;natural gas|ensource
A dam on a river uses moving ___ to make electricity.|water|sand;ice;rock|ensource
Burning fuels like coal and oil can make the air ___.|dirty|cleaner;colder;wetter|ensource
Which is a way to save energy at home?|turn off lights you are not using|leave the TV on all night;open the fridge door often;run hot water when nobody needs it|ensource
`,
      kinds: [
        {form: 'sort', topic: 'ensource', q: 'Sort the energy sources: renewable or nonrenewable?', hint: 'Ask if nature makes more of it soon, or if it took a very long time to form.', bins: {renewable: ['sunlight', 'wind', 'moving water'], nonrenewable: ['coal', 'oil', 'natural gas']}},
        {form: 'sort', topic: 'enmove', q: 'Sort them: does it change electricity into light, or into sound?', hint: 'Think about what you notice when each one is switched on: do you see it or hear it?', bins: {light: ['lamp', 'flashlight', 'ceiling light'], sound: ['doorbell', 'speaker', 'radio']}},
        {form: 'sort', topic: 'enspeed', q: 'Sort them: is it moving energy or stored energy?', hint: 'Is it moving right now, or is it holding energy to use later?', bins: {moving: ['a rolling ball', 'a spinning fan', 'a flying kite'], stored: ['a battery', 'a stretched rubber band', 'a log of firewood']}},
        {form: 'match', topic: 'enmove', q: 'Match each thing to the energy it gives off: drum, oven and flashlight.', hint: 'One you hear, one warms the kitchen, and one helps you see in the dark.', pairs: [['drum', 'sound'], ['oven', 'heat'], ['flashlight', 'light']]},
        {form: 'match', topic: 'ensource', q: 'Match each machine to what it uses to make electricity: solar panel, wind turbine and dam.', hint: 'Think about what shines on it, blows on it or flows through it.', pairs: [['solar panel', 'sunlight'], ['wind turbine', 'moving air'], ['dam', 'moving water']]},
        {form: 'order', topic: 'enmove', q: 'Put them in order: how does electricity get from a power plant to a lamp?', hint: 'Start where the electricity is made.', order: ['power plant', 'wires', 'outlet in the wall', 'lamp']},
        {form: 'order', topic: 'enspeed', q: 'Put the balls in order from least to most energy of motion.', hint: 'A ball that is not moving has none. The quicker it goes, the more it has.', order: ['a ball sitting still', 'a ball rolling slowly', 'a ball rolling fast']}]},
    {id: 'sci_lite', t: 'Light & Sound', e: '🔦', ico: 'eye', grade: '4', rows: `
A toy boat floats on a pond. A wave passes by. What does the boat do?|it bobs up and down|it races to the shore;it sinks to the bottom;it spins in a circle|wavepat|boat,⛵
How tall a wave is, from its resting level to its top, is called its ___.|amplitude|wavelength;speed;color|wavepat
Two waves are the same height. The one with tops farther apart has a longer ___.|wavelength|amplitude;shadow;echo|wavepat
Big ocean waves carry ___ energy than small ripples.|more|less;the same;no|wavepat
A loud drum beat and a soft drum beat: which sound wave has a bigger amplitude?|the loud beat|the soft beat;they are the same;neither has one|wavepat|drum,🥁
Over many years, ocean waves can slowly wear away a ___.|rocky cliff|cloud;rainbow;shadow|wavepat
Sound is made when something ___.|vibrates|freezes;melts;shrinks|wavepat
You can see a book because light bounces off it and enters your ___.|eyes|ears;nose;hands|seeing
In a completely dark room, can you see a red ball?|no, because no light reaches your eyes|yes, if you stare at it for a long time;yes, red things shine;only if it is big|seeing||Think about what has to bounce off the ball and travel to you before you can see it.
Which surface reflects light best?|a smooth mirror|a black rug;a fuzzy wool sweater;a pile of dirt|seeing
Light travels in ___ lines.|straight|curly;zigzag;looping|seeing
A shadow forms when an object ___ light.|blocks|makes;bends;speeds up|seeing
Light passes easily through ___.|clear glass|a brick wall;a wooden door;a metal pan|seeing
You see lightning before you hear its thunder. Why?|light travels faster than sound|sound travels faster than light;thunder happens much later;your ears are asleep|seeing||Both happen at the same moment. Which one gets to you first, and what does that tell you?
Long ago people sent messages over wires as long and short clicks. This was ___.|Morse code|a radio show;a phone call;a letter|codes
A computer stores pictures and words as patterns of ___.|numbers|colors;sounds;tiny drawings|codes
A light that blinks on and off in a pattern can send a ___.|message|smell;taste;temperature|codes
A drum pattern can carry a message far away because sound ___.|travels through the air|stays in one place;turns into light;cannot be heard|codes
When you send a text, your words travel as a ___.|coded signal|paper letter;puff of smoke;loud shout|codes
`,
      kinds: [
        {form: 'sort', topic: 'seeing', q: 'Sort them: does light pass through it, or is light blocked?', hint: 'Could you read a book held behind it?', bins: {'light passes through': ['clear glass', 'clean water', 'plastic wrap'], 'light is blocked': ['a brick', 'a book', 'a wooden board']}},
        {form: 'sort', topic: 'codes', q: 'Sort them: does it send a message with sound, or with light?', hint: 'Would you hear it or see it?', bins: {sound: ['drum beats', 'a whistle', 'a ringing bell'], light: ['a blinking flashlight', 'a lighthouse beam', 'a traffic light']}},
        {form: 'sort', topic: 'seeing', q: 'Sort them: does it give off its own light, or only reflect light?', hint: 'Would it still shine in a dark room with every other light off?', bins: {'gives off light': ['the Sun', 'a lamp', 'a campfire'], 'only reflects light': ['the Moon', 'a mirror', 'a spoon']}},
        {form: 'match', topic: 'wavepat', q: 'Match each word to what it means: amplitude, wavelength and vibration.', hint: 'One is about height, one is about distance, and one is about shaking.', pairs: [['amplitude', 'how tall a wave is'], ['wavelength', 'the distance from top to top'], ['vibration', 'a quick back and forth motion']]},
        {form: 'match', topic: 'seeing', q: 'Match each body part to what it senses: eyes, ears and skin.', hint: 'Think about what you see, what you hear and what you feel.', pairs: [['eyes', 'light'], ['ears', 'sound'], ['skin', 'heat']]},
        {form: 'order', topic: 'seeing', q: 'Put them in order: how do you see a tree?', hint: 'Start where the light begins.', order: ['the Sun gives off light', 'light bounces off the tree', 'light enters your eyes', 'your brain makes sense of it']},
        {form: 'order', topic: 'wavepat', q: 'Put the waves in order from smallest to biggest amplitude.', hint: 'Think about how tall each wave is.', order: ['a ripple in a puddle', 'a wave on a lake', 'a big ocean wave']}]},
    {id: 'sci_shape', t: 'Shaping the Land', e: '🏔', ico: 'globe', grade: '4', rows: `
A river cuts deeper and deeper into rock. Over a very long time it can make a ___.|canyon|volcano;island;glacier|wear
Water seeps into a crack in a rock and freezes. What happens to the crack?|it gets wider|it gets smaller;it fills with sand;it closes up|wear|ice,🧊
A tree's roots grow into a crack in a rock. Over time the roots can ___.|split the rock|glue the rock;melt the rock;polish the rock|wear
Rocks that tumble along a fast stream for a long time become ___.|smooth and round|sharp and jagged;bigger and heavier;soft and sticky|wear
Strong winds blow sand against a rock for many years. What happens to the rock?|it wears down|it grows bigger;it turns to ice;it gets heavier|wear
A heavy rain washes soil off a bare hillside. This is ___.|erosion|melting;freezing;evaporation|wear
Where a river slows down and enters the sea, it drops sand and mud. This can build a ___.|delta|canyon;cave;volcano|wear
In rock layers that have not been moved, which one is usually the oldest?|the one at the bottom|the one on top;the one in the middle;the thinnest one|layers
A rock layer holds fossils of ferns that need a lot of rain. What was the place like when that layer formed?|wet and green|icy and frozen;dry and sandy;deep under the sea|layers
Rock layers are like pages in a history book because they show ___.|what happened in the past|what will happen next year;what people think;how to build a house|layers
A layer with fish fossils lies under a layer with fossils of land plants. What changed?|water turned into dry land|dry land turned into a sea;the place got icy;nothing changed at all|layers
Scientists who study rocks and the history of Earth are called ___.|geologists|astronauts;chefs;pilots|layers
On a map of the world, earthquakes and volcanoes are not spread out evenly. How are most of them found?|in long belts|evenly everywhere;only near the poles;only in deserts|hazards
A flood warning is given for your town. What is the safest thing to do?|move to higher ground|go and look at the river;stay in the basement;drive through deep water|hazards
Engineers build some buildings to sway a little in an earthquake so they ___.|do not fall down|fall down faster;sink into the ground;make more noise|hazards
A levee is a high bank of earth built along a river to ___.|keep floods out of towns|make the river faster;catch fish;help boats cross the river|hazards
Scientists watch a volcano for small earthquakes and gas. These can be signs that it may ___.|erupt soon|freeze over;turn into a lake;stop forever|hazards|volcano,🌋
A landslide is most likely on a ___.|steep hill after heavy rain|flat field on a dry day;sandy beach at low tide;parking lot in summer|hazards
Planting trees on a bare hillside helps stop ___.|soil from washing away|the wind from blowing;the Sun from shining;rain from falling|hazards
`,
      kinds: [
        {form: 'sort', topic: 'hazards', q: 'Sort them: does the change happen fast or slowly?', hint: 'Some changes take minutes. Others take a very long time.', bins: {fast: ['an earthquake', 'a landslide', 'a flood'], slowly: ['a river carving a canyon', 'wind wearing down a rock', 'a glacier moving']}},
        {form: 'sort', topic: 'wear', q: 'Sort them: weathering (breaking rock apart) or erosion (carrying it away)?', hint: 'Does the rock stay where it is in smaller pieces, or do the pieces travel?', bins: {weathering: ['ice cracking a rock', 'roots splitting a rock'], erosion: ['a river carrying sand', 'wind blowing dust away', 'a glacier pushing rocks']}},
        {form: 'sort', topic: 'hazards', q: 'Sort them: a natural hazard, or a way to stay safe?', hint: 'Does it cause harm, or does it protect people from harm?', bins: {'natural hazard': ['flood', 'earthquake', 'volcano'], 'way to stay safe': ['levee', 'warning siren', 'flood map']}},
        {form: 'match', topic: 'hazards', q: 'Match each problem to a way to stay safer: flood, earthquake and landslide.', hint: 'One needs a wall, one needs strong buildings, and one needs roots to hold the soil.', pairs: [['flood', 'a levee'], ['earthquake', 'buildings that sway'], ['landslide', 'plants on the hillside']]},
        {form: 'match', topic: 'wear', q: 'Match each landform to what shaped it: canyon, sand dune and delta.', hint: 'Which ones are made by water, and which by wind? Does the water cut or drop?', pairs: [['canyon', 'a river cutting down'], ['sand dune', 'wind piling up sand'], ['delta', 'a river dropping mud']]},
        {form: 'order', topic: 'layers', q: 'Put the rock layers in order from oldest to youngest.', hint: 'The first layer to settle ends up under the others.', order: ['bottom layer', 'middle layer', 'top layer']},
        {form: 'order', topic: 'wear', q: 'Put them in order: how does a delta form?', hint: 'Start high up, where the water first falls.', order: ['rain falls on the land', 'a river carries sand and mud', 'the river slows at the sea', 'sand and mud pile up']}]},
    {id: 'sci_part', t: 'Body Parts at Work', e: '🦉', ico: 'paw', grade: '4', rows: `
A rose has sharp thorns on its stem. How do the thorns help the rose?|they keep animals from eating it|they help it drink water;they make it smell sweet;they catch sunlight to make food for the leaves|outside
A turtle's hard shell helps it ___.|stay safe from predators|swim faster;find food;see in the dark|outside
A flower's bright colors and sweet smell help bring ___ to it.|bees and butterflies|rain and snow;rocks and sand;worms and snails|outside
An eagle's sharp, curved claws help it ___.|grab and hold its food|dig deep tunnels;swim in the sea;keep its eggs cool|outside|eagle,🦅
A fish uses its fins to ___.|steer and swim|breathe air;see in the dark;eat|outside
A porcupine's sharp quills help it ___.|protect itself|fly;dig;swim|outside
A duck's feathers are coated with oil. This keeps the duck ___.|dry in the water|hot in the sun;heavy in the air;hidden in the grass|outside
Which part inside your body is a muscle that keeps working even while you sleep?|the heart|the stomach;the skull;the hair|inside
Fish take in oxygen from the water with their ___.|gills|fins;scales;tails|inside|fish,🐟
Your skeleton gives your body its shape and ___.|support|color;taste;a sense of smell|inside
Tiny tubes inside a plant's stem carry ___ up from the roots to the leaves.|water|light;seeds;soil|inside
Muscles move your bones by ___.|pulling on them|growing hair on them;pumping blood into them;making them hollow|inside
Your stomach helps your body ___.|break down food|see colors;hear sounds;pump blood|inside
Your skull protects your ___.|brain|heart;stomach;lungs|inside
You touch a hot pan and pull your hand away fast. What carried the message?|your nerves|your hair;your bones;your fingernails|signals
Where does your body make sense of what your eyes see?|in the brain|in the stomach;in the hands;in the feet|signals
A rabbit hears a twig snap and runs away. Which sense warned it?|hearing|taste;touch;eyesight|signals
An owl hunts at night. What helps it find mice in the dark?|sharp hearing|a long tail;bright colors;strong legs|signals|owl,🦉
You smell smoke and leave the room. Your brain used a message from your ___.|nose|ears;knees;tongue|signals
A snake flicks its tongue in and out to ___.|smell the air|cool its body;make a sound;clean its teeth|signals|snake,🐍
`,
      kinds: [
        {form: 'sort', topic: 'inside', q: 'Sort them: a part on the outside of the body, or one inside it?', hint: 'Could you see it in a mirror?', bins: {outside: ['skin', 'hair', 'fingernails'], inside: ['heart', 'lungs', 'stomach']}},
        {form: 'sort', topic: 'outside', q: 'Sort the parts: does it help protect, or help move?', hint: 'Does it keep the plant or animal safe, or carry it from place to place?', bins: {protect: ['turtle shell', 'rose thorns', 'porcupine quills'], move: ['fish fins', 'bird wings', 'frog legs']}},
        {form: 'sort', topic: 'inside', q: 'Sort the plant parts: does it help make new plants, or move water?', hint: 'Think about where seeds come from, and how water gets from the soil to the leaves.', bins: {'makes new plants': ['flower', 'seed', 'fruit'], 'moves water': ['roots', 'stem']}},
        {form: 'match', topic: 'inside', q: 'Match each part to its job: heart, lungs and stomach.', hint: 'One works with blood, one with air, and one with food.', pairs: [['heart', 'pumps blood'], ['lungs', 'take in air'], ['stomach', 'breaks down food']]},
        {form: 'match', topic: 'outside', q: 'Match each animal to the part that helps it get food: eagle, woodpecker and frog.', hint: 'One grabs, one pecks wood, and one catches flies.', pairs: [['eagle', 'sharp claws'], ['woodpecker', 'strong beak'], ['frog', 'sticky tongue']]},
        {form: 'order', topic: 'signals', q: 'Put them in order: what happens when you hear your name?', hint: 'Start with the sound in the air.', order: ['sound reaches your ear', 'nerves carry the message', 'your brain understands it', 'you turn your head']},
        {form: 'order', topic: 'inside', q: 'Put them in order: how does water travel through a plant?', hint: 'Start under the ground.', order: ['roots take in water', 'tubes in the stem carry it up', 'water reaches the leaves']}]},
    {id: 'civ_gov4', t: 'Our State Government', e: '⚖', ico: 'scale', grade: '4', rows: `
Who signs bills to make them state laws?|the governor|the mayor;the principal;the President|stategov
The group of elected people who make the laws for a state is the state ___.|legislature|school board;city council;library board|stategov
A state's capital city is where ___.|lawmakers and the governor work|the most people in the state live;the oldest tree grows;the longest river starts|stategov
Who decides if someone broke a state law?|courts and judges|the governor alone;the city council;the fire department|stategov
Every state has its own constitution. It is a plan for ___.|how its government works|how many trees to plant;where the beaches are;which songs to sing|stategov
State governments use tax money to pay for things like ___.|highways and parks|people's own cars;the toys in stores;the food in your kitchen|stategov
Each state sends people to Congress in Washington, D.C. Congress makes laws for ___.|the whole country|only one town;only one school;only the state capital|stategov
In many cities, the group that makes local laws is the ___.|city council|Supreme Court;Congress;state legislature|localgov
Which service is usually run by a city or town?|trash and recycling pickup|printing money;the army;delivering the mail|localgov
Most states are divided into smaller areas called ___.|counties|continents;countries;hemispheres|localgov
A school board makes decisions about ___.|the public schools in an area|the state highways;the country's army;the forests and parks of the nation|localgov
A town's public library is paid for mostly by ___.|local taxes|library fines;bake sales;selling old books|localgov
People in a town want a new park. Who should they ask?|their city council|the President;a judge;the governor of another state|localgov
Which job belongs to the national government, not a state or a town?|printing money|fixing a town's potholes;running a city park;picking up trash|levels
Which is usually done by a state government?|giving out driver's licenses|printing money;running the post office;picking up trash|levels
A mayor leads a city. A governor leads a state. Who leads the whole country?|the President|the mayor;the governor;the judge|levels
Citizens choose their governor by ___.|voting in an election|drawing names from a hat;picking the oldest person;having a race|levels
A town, a state and the nation each have a government. This means people follow ___.|laws from all three|only town laws;only national laws;no laws at all|levels
Why do towns have their own governments?|to take care of local needs|to print their own money;to have their own army;to choose the President|levels
`,
      kinds: [
        {form: 'sort', topic: 'levels', q: 'Sort the jobs: town government or state government?', hint: 'Does the job cover one town, or the whole state?', bins: {town: ['trash pickup', 'city parks', 'the town library'], state: ["driver's licenses", 'state highways', 'state parks']}},
        {form: 'sort', topic: 'levels', q: 'Sort the jobs: national government or town government?', hint: 'Is it the same for the whole country, or does each town take care of it?', bins: {national: ['printing money', 'the army', 'the post office'], town: ['fixing town streets', 'trash pickup', 'the town fire station']}},
        {form: 'match', topic: 'levels', q: 'Match each leader to what they lead: mayor, governor and President.', hint: 'Think from small to big: a city, a state, the country.', pairs: [['mayor', 'a city'], ['governor', 'a state'], ['President', 'the country']]},
        {form: 'match', topic: 'stategov', q: 'Match each group to the laws it makes: city council, state legislature and Congress.', hint: 'Match the size of the group\'s area to the size of the area its laws cover.', pairs: [['city council', 'town laws'], ['state legislature', 'state laws'], ['Congress', 'national laws']]},
        {form: 'order', topic: 'localgov', q: 'Put them in order from smallest area to biggest.', hint: 'A town is inside a county, and a county is inside a state.', order: ['town', 'county', 'state', 'country']},
        {form: 'order', topic: 'stategov', q: 'Put them in order: how does a bill become a state law?', hint: 'Someone has to write it first, and the governor comes near the end.', order: ['a lawmaker writes a bill', 'the legislature votes yes', 'the governor signs it', 'it becomes a law']}]},
    {id: 'civ_reg', t: 'Regions & Resources', e: '🗺', ico: 'map', grade: '4', rows: `
The Midwest has flat land and rich soil. It is known for growing ___.|corn and wheat|oranges and lemons;coconuts;bananas|usreg
The Southwest has many deserts. Its weather is mostly ___.|hot and dry|cold and snowy;rainy all year;foggy and cool|usreg
The Rocky Mountains run through the ___ region.|West|Southeast;Northeast;Midwest|usreg
Many of the oldest cities in the United States, like Boston, are in the ___.|Northeast|Southwest;West;Midwest|usreg
Florida, in the Southeast, is famous for growing ___.|oranges|apples;cranberries;wheat|usreg
The Pacific Ocean is along the coast of the ___ region.|West|Northeast;Southeast;Midwest|usreg
Which region has much of the Great Plains, with its many farms and ranches?|the Midwest|the Northeast;the Southeast;the Pacific coast|usreg
Why do many people in the Northeast work in fishing and shipping?|it is next to the Atlantic Ocean|it has no rivers;it is in a desert;it is far from any ocean or lake|usreg
Which region is most often hit by hurricanes in late summer and fall?|the Southeast|the Midwest;the Rocky Mountains;the Great Plains|usreg
Water, trees and soil are ___ resources.|natural|human;capital;money|resource
A doctor's skills and knowledge are a ___ resource.|human|natural;capital;mineral|resource
A tractor a farmer uses to grow crops is a ___ resource.|capital|natural;human;water|resource|tractor,🚜
A sawmill turns logs into boards. The logs come from which natural resource?|trees|rocks;oil;sand|resource
Which one is a human resource?|a teacher's skill at teaching|a forest;a river;a hammer|resource
Why can't every place make everything it needs?|places have different resources|every place is the same;nothing grows anywhere;there are no tools|resource
Florida grows oranges and Idaho grows potatoes. How can people in each state get both?|by trading|by stopping all trucks;by growing only one;by closing the stores|trade
Goods a country buys from other countries are called ___.|imports|exports;taxes;savings|trade
Goods a country sells to other countries are called ___.|exports|imports;loans;wages|trade
When a region makes a lot of one thing it does well, it is ___.|specializing|borrowing;saving;voting|trade
Trucks, trains and ships help trade because they ___.|carry goods between cities and states|grow food on the way;print money;change the weather|trade
`,
      kinds: [
        {form: 'sort', topic: 'resource', q: 'Sort the resources: natural, or capital (a tool people made to make other things)?', hint: 'Did nature make it, or did people build it?', bins: {natural: ['trees', 'water', 'soil'], capital: ['a tractor', 'a factory machine', 'a delivery truck']}},
        {form: 'sort', topic: 'resource', q: 'Sort the resources: natural or human?', hint: 'Is it part of the land, or is it what a person knows how to do?', bins: {natural: ['a river', 'a forest', 'a field of soil'], human: ["a nurse's skill", "a builder's work", "a teacher's knowledge"]}},
        {form: 'sort', topic: 'usreg', q: 'Sort the regions: on the Atlantic coast, or not?', hint: 'Picture the map. The Atlantic is along the east side of the country.', bins: {'on the Atlantic coast': ['Northeast', 'Southeast'], 'not on it': ['Midwest', 'Southwest', 'West']}},
        {form: 'match', topic: 'usreg', q: 'Match each region to what it is known for: Midwest, Southwest and Northeast.', hint: 'Think about farms in the middle, deserts in the southwest, and old cities by the sea.', pairs: [['Midwest', 'corn and wheat farms'], ['Southwest', 'hot, dry deserts'], ['Northeast', 'old cities by the sea']]},
        {form: 'match', topic: 'trade', q: 'Match each word to its meaning: import, export and trade.', hint: 'Im- means in, ex- means out.', pairs: [['import', 'to buy from another place'], ['export', 'to sell to another place'], ['trade', 'to swap goods or services']]},
        {form: 'order', topic: 'trade', q: 'Put them in order: how does wheat from a Midwest farm become bread in a store far away?', hint: 'Start in the field where the wheat grows.', order: ['farmers grow wheat', 'a mill grinds it into flour', 'a bakery bakes bread', 'trucks bring it to stores']},
        {form: 'order', topic: 'usreg', q: 'Put the regions in order from east to west.', hint: 'Start on the Atlantic coast.', order: ['Northeast', 'Midwest', 'West']}]},
    // ---------------- Volcano Ridge (grade 6) ----------------
    {id: 'sci_web', t: 'Food Webs & Balance', e: '🦊', ico: 'paw', grade: '6', rows: `
In an energy pyramid, which level has the most energy?|the producers at the bottom|the top predators;the middle consumers;the large hunters at the very top|pyramid
About how much of the energy at one level of an energy pyramid passes up to the next level?|10 percent|90 percent;all of it;none of it|pyramid
Most of the energy at each level is not passed up. Where does it go?|it is used for living and lost as heat|it turns into soil;it goes back to the Sun;it is saved forever inside the animal|pyramid
Why are there fewer hawks than mice in a field?|less energy reaches the top level|hawks are younger;mice hunt hawks;hawks never eat|pyramid
A bear eats berries, fish and insects. This makes it ___.|an omnivore|a herbivore;a producer;a decomposer|pyramid|bear,🐻
Fungi and bacteria break down dead things and return nutrients to the soil. They are ___.|decomposers|producers;predators;herbivores|pyramid|mushroom,🍄
In a food web, an arrow points from the grass to the grasshopper. What does the arrow show?|which way the energy flows|where the grasshopper lives;how tall the grass grows;which one is older|pyramid
A tick feeds on a dog's blood and harms the dog. This relationship is ___.|parasitism|mutualism;commensalism;competition|partner
A bird builds a nest in a tree. The bird is helped and the tree is not affected. This is ___.|commensalism|parasitism;mutualism;predation|partner|tree,🌳
Bees get nectar from flowers and carry pollen between them. Both are helped. This is ___.|mutualism|parasitism;commensalism;predation|partner|bee,🐝
An owl hunts and eats a mouse. In this relationship the owl is the ___.|predator|prey;producer;parasite|partner|owl,🦉
In parasitism, the living thing that is harmed is called the ___.|host|predator;producer;partner|partner
Sea otters eat sea urchins, and sea urchins eat kelp. What happens to the kelp if the otters disappear?|it gets eaten away|it grows faster;it stays the same;it spreads farther|partner
Anything that keeps a population from growing larger, like a shortage of food or space, is a ___.|limiting factor|food chain;habitat;producer|limits
The largest population an area can support over time is its ___.|carrying capacity|food web;energy pyramid;habitat size|limits
A dry summer leaves little grass on a prairie. What will likely happen to the number of prairie dogs?|it will go down|it will go up;it will double;it will stay exactly the same|limits
Deer have plenty of food and no wolves nearby. Their population will likely ___.|grow|shrink;disappear;stay tiny|limits
Two kinds of birds want the same few nesting holes in old trees. What are they competing for?|shelter|water;sunlight;food|limits
Wolves were brought back to a park and began hunting elk there. Over time the number of elk ___.|went down|went up;doubled;stayed the same|limits
Which is a non-living factor that can limit a population?|the amount of water|the number of hawks;the number of mice;a disease germ|limits
`,
      kinds: [
        {form: 'sort', topic: 'pyramid', q: 'Sort the living things: producer or consumer?', hint: 'Does it make its own food from sunlight, or does it eat other living things?', bins: {producer: ['grass', 'an oak tree', 'algae'], consumer: ['a hawk', 'a deer', 'a grasshopper']}},
        {form: 'sort', topic: 'pyramid', q: 'Sort the eaters: herbivore or carnivore?', hint: 'Does it eat plants, or other animals?', bins: {herbivore: ['a deer', 'a rabbit', 'a cow'], carnivore: ['a wolf', 'a shark', 'an eagle']}},
        {form: 'sort', topic: 'limits', q: 'Sort them: does it help a deer population grow, or make it shrink?', hint: 'Does it give the deer more of what they need, or take something away?', bins: {grow: ['plenty of food', 'a mild winter', 'lots of space'], shrink: ['more wolves', 'a long drought', 'a disease']}},
        {form: 'match', topic: 'partner', q: 'Match each relationship to an example: mutualism, commensalism and parasitism.', hint: 'Both helped, one helped and one not affected, or one helped and one harmed.', pairs: [['mutualism', 'bees and flowers'], ['commensalism', 'a bird nesting in a tree'], ['parasitism', 'a tick on a dog']]},
        {form: 'match', topic: 'pyramid', q: 'Match each role to an example: producer, consumer and decomposer.', hint: 'One makes food, one eats food, and one breaks down what is left.', pairs: [['producer', 'grass'], ['consumer', 'a fox'], ['decomposer', 'a mushroom']]},
        {form: 'order', topic: 'pyramid', q: 'Put the food chain in order, starting with where the energy comes from.', hint: 'Start in the sky, then the plant, then follow who eats whom.', order: ['the Sun', 'grass', 'grasshopper', 'frog', 'snake']},
        {form: 'order', topic: 'pyramid', q: 'Put the levels of an energy pyramid in order from most energy to least.', hint: 'Start at the wide bottom of the pyramid.', order: ['producers', 'plant eaters', 'animals that eat plant eaters', 'top predators']}]},
    {id: 'sci_deep', t: 'Inside the Earth', e: '🌋', ico: 'globe', grade: '6', rows: `
As you go deeper inside Earth, the temperature ___.|goes up|goes down;stays the same;drops to freezing|layers6
The stiff outer shell made of the crust and the very top of the mantle is the ___.|lithosphere|atmosphere;hydrosphere;inner core|layers6
The soft, slowly flowing part of the mantle that the plates ride on is the ___.|asthenosphere|crust;inner core;ozone layer|layers6
The inner core is hotter than the outer core, but it is solid. Why?|the pressure there is so great|it is made of ice;it is far from the Sun;it is cooled by the ocean above it|layers6
Earth's core is made mostly of the metals iron and ___.|nickel|gold;silver;copper|layers6
How do scientists learn about Earth's deep layers, where no one has ever been?|by studying earthquake waves|by digging to the center;by looking with telescopes;by drilling a hole all the way through|layers6
Which part of Earth do we live on?|the crust|the mantle;the outer core;the inner core|layers6
Heat from deep inside Earth makes mantle rock flow in slow loops called ___.|convection currents|ocean waves;jet streams;tides|motion
Along the mid-ocean ridge, plates pull apart and new ___ forms.|seafloor|ice sheet;coral reef;sand dune|motion
A deep ocean trench forms where one plate ___.|sinks under another|pulls away from another;slides past another;stops moving|motion
The Hawaiian Islands formed as a plate moved slowly over a ___.|hot spot|trench;glacier;cold front|motion
The Himalaya Mountains are still growing taller because two plates are ___.|pushing together|pulling apart;sliding past each other;standing still|motion|mountain,🏔
Earth's plates move very slowly, about as fast as ___.|your fingernails grow|a person walks;a river flows;a snail crawls|motion
In East Africa, the land is slowly splitting as two plates pull apart. This makes a long ___.|rift valley|sand dune;coral reef;ice sheet|motion
Hot, melted rock rising up from the mantle can break through the crust and form a ___.|volcano|glacier;canyon;delta|motion
An earthquake under the ocean can push up a giant wave called a ___.|tsunami|hurricane;tornado;high tide|quakes
If you feel an earthquake indoors, what should you do?|drop, cover and hold on|run outside right away;stand by a window;ride the elevator down|quakes
The point deep underground where an earthquake begins is the ___.|focus|epicenter;crater;summit|quakes
Most earthquakes happen when rocks along a ___ suddenly slip.|fault|river;cloud;cave|quakes
Why do people use bendable steel frames for buildings in places with many earthquakes?|so they bend instead of breaking|so they look shiny;so they cost less;so they stay warm in the winter months|quakes
Scientists cannot yet predict the exact day of an earthquake, but they can ___.|map where earthquakes are likely|stop earthquakes from happening;make earthquakes smaller;move the plates back|quakes
`,
      kinds: [
        {form: 'sort', topic: 'layers6', q: 'Sort the layers: solid, or liquid or soft?', hint: 'The very middle is squeezed so hard it stays solid. The part around it is melted metal.', bins: {solid: ['crust', 'inner core'], 'liquid or soft': ['outer core', 'asthenosphere']}},
        {form: 'sort', topic: 'motion', q: 'Sort them: does it form where plates pull apart, or where they push together?', hint: 'New crust fills a gap. Crashing plates fold up or one sinks.', bins: {'pull apart': ['mid-ocean ridge', 'rift valley'], 'push together': ['ocean trench', 'Himalaya Mountains']}},
        {form: 'sort', topic: 'quakes', q: 'Sort them: safe or not safe to do in an earthquake?', hint: 'Stay low, protect your head, and keep away from glass.', bins: {'safe to do': ['drop to the floor', 'cover your head', 'hold on to a table'], 'not safe': ['stand by a window', 'run down the stairs', 'use the elevator']}},
        {form: 'match', topic: 'motion', q: 'Match each boundary to how the plates move: divergent, convergent and transform.', hint: 'Diverge means to go apart; converge means to come together.', pairs: [['divergent', 'pull apart'], ['convergent', 'push together'], ['transform', 'slide past']]},
        {form: 'match', topic: 'layers6', q: 'Match each layer to what it is like: crust, mantle and outer core.', hint: 'One is thin, one is thick, and one is melted.', pairs: [['crust', 'thin and rocky'], ['mantle', 'thick hot rock that flows slowly'], ['outer core', 'liquid metal']]},
        {form: 'order', topic: 'layers6', q: "Put Earth's layers in order from the surface to the center.", hint: 'Start where you are standing.', order: ['crust', 'mantle', 'outer core', 'inner core']},
        {form: 'order', topic: 'quakes', q: 'Put them in order: what happens in an undersea earthquake?', hint: 'Start deep under the seafloor.', order: ['rocks slip along a fault', 'the seafloor jerks up', 'a tsunami wave forms', 'the wave reaches the shore']}]},
    {id: 'sci_storm', t: 'Weather Systems', e: '🌧', ico: 'drop', grade: '6', rows: `
A huge body of air with about the same temperature and moisture all through it is called ___.|an air mass|a jet stream;an ocean current;a cold snap|airmass
An air mass that forms over the warm Gulf of Mexico is ___.|warm and humid|cold and dry;cold and humid;warm and dry|airmass
The boundary where two different air masses meet is called a ___.|front|fault;current;crest|airmass
A cold front moves in fast. What weather often comes with it?|thunderstorms, then cooler air|a long, warm, sunny week;thick fog all day;light drizzle that lasts for many days|airmass
When a warm front passes, the weather usually becomes ___.|warmer|colder;much windier;frozen|airmass
In winter, an air mass from northern Canada brings ___ weather.|cold, dry|hot, humid;warm, rainy;hot, dry|airmass
Wind blows from areas of ___.|high pressure to low pressure|low pressure to high pressure;cold water to warm water;day to night|pressure
A high-pressure system usually brings ___.|clear, fair weather|heavy storms;thick clouds;rain all week|pressure
In a low-pressure system, air rises and cools and forms ___.|clouds|clear skies;dry dust;rainbows|pressure
A falling barometer reading often means ___.|stormy weather is coming|sunny weather is coming;the air is getting drier;it will be hot and still|pressure
Hurricanes form over ___.|warm ocean water|cold, dry land;icy polar seas;high mountains|storms
Why does a hurricane get weaker when it moves over land?|it loses its supply of warm, moist air|the land pushes it back;trees soak up its wind;mountains freeze it|storms
The calm center of a hurricane is called the ___.|eye|eyewall;rain band;front|storms
A spinning column of air that reaches from a thunderstorm down to the ground is a ___.|tornado|hurricane;blizzard;monsoon|storms
You see lightning and count 10 seconds before the thunder. About how far away is the storm?|2 miles|10 miles;50 miles;right overhead|storms
Scientists who study and forecast the weather are called ___.|meteorologists|geologists;astronomers;botanists|storms
A blizzard is a storm with strong winds and ___.|lots of blowing snow|hot sunshine;falling leaves;dust only|storms
Over most of the United States, weather usually moves from ___.|west to east|east to west;north to south only;the sea to the mountains|local
The jet stream is a band of very fast wind ___.|high up in the atmosphere|deep under the ocean;inside a tornado;just above the treetops in a forest|local
On a sunny afternoon at the beach, a cool wind often blows from the sea toward the land. Why?|the land heats up faster than the water|the sea is warmer than the land;the sand cools the air;the Moon pulls the wind|local
Moist air rises up the side of a tall mountain and drops rain. The other side of the mountain is often ___.|dry|very wet;frozen solid;covered in lakes|local|mountain,🏔
A warm ocean current called the Gulf Stream flows up the East Coast and across the Atlantic. It makes the places it passes ___.|milder in winter|colder in winter;drier all year;windless|local
`,
      kinds: [
        {form: 'sort', topic: 'pressure', q: 'Sort the clues: is fair weather or stormy weather on the way?', hint: 'Rising pressure means sinking, settled air. Falling pressure means rising air and clouds.', bins: {fair: ['rising air pressure', 'a high-pressure system', 'clear skies to the west'], stormy: ['falling air pressure', 'a cold front coming', 'dark clouds building']}},
        {form: 'sort', topic: 'pressure', q: 'Sort the weather words: about air pressure, or about water in the air?', hint: 'Is it about how hard the air presses down, or about wet air, drops and dew?', bins: {'air pressure': ['barometer', 'high-pressure system', 'low-pressure system'], 'water in the air': ['humidity', 'dew point', 'precipitation']}},
        {form: 'sort', topic: 'airmass', q: 'Sort the air masses: warm or cold?', hint: 'Think about where each one comes from: near the equator, or near the North Pole?', bins: {warm: ['air from the Gulf of Mexico', 'air from the desert Southwest'], cold: ['air from northern Canada', 'air from the Arctic']}},
        {form: 'match', topic: 'airmass', q: 'Match each weather system to what it often brings: cold front, warm front and high-pressure system.', hint: 'One is quick and stormy, one is slow and gentle, and one is calm.', pairs: [['cold front', 'short, strong storms'], ['warm front', 'long, gentle rain'], ['high-pressure system', 'clear skies']]},
        {form: 'match', topic: 'storms', q: 'Match each storm to what it is: hurricane, tornado and blizzard.', hint: 'One forms over the sea, one is a narrow funnel, and one is cold and white.', pairs: [['hurricane', 'a huge storm that forms over warm seas'], ['tornado', 'a spinning funnel of wind'], ['blizzard', 'a snowstorm with strong wind']]},
        {form: 'order', topic: 'storms', q: 'Put them in order: how does a hurricane form and end?', hint: 'Start over the warm sea, and end on land.', order: ['warm, moist air rises over the ocean', 'storm clouds begin to spin', 'the storm grows stronger at sea', 'it reaches land and weakens']},
        {form: 'order', topic: 'airmass', q: 'Put them in order: what happens as a cold front passes a town?', hint: 'Start with the air that is there before the front arrives.', order: ['warm air sits over the town', 'cold air pushes in and lifts the warm air', 'thunderstorms form', 'cooler, drier air arrives']}]},
    {id: 'sci_wres', t: 'Water & Resources', e: '💧', ico: 'drop', grade: '6', rows: `
All the land that drains into one river or lake is called a ___.|watershed|water table;flood plain;delta|ground
Rain soaks into the ground and fills spaces in rock and sand. This water is called ___.|groundwater|runoff;water vapor;sea water|ground
A layer of rock or sand underground that holds lots of water is called ___.|an aquifer|a glacier;a canyon;a river delta|ground
Most of the fresh water on Earth is frozen in ___.|glaciers and ice caps|lakes and rivers;clouds;deep underground caves|ground
About how much of Earth's water is fresh water?|3 percent or less|half of it;almost all of it;about 75 percent|ground
Pollution dumped into a stream far upstream can harm people who live ___.|downstream|upstream;on mountaintops;far uphill|ground
People pump water out of an aquifer faster than rain can refill it. The water table will ___.|drop|rise;freeze;stay the same|ground
Oil and natural gas formed from tiny ocean plants and animals buried long ago. So they are often found where ___.|ancient seas once were|volcanoes erupt today;rainforests grow today;cities are built|spread
Why do some countries have lots of oil while others have almost none?|it formed only where conditions were right|oil grows back each year;people moved it there;it falls from the sky|spread
Rich farm soil is often found near rivers because floods leave behind ___.|fresh mud full of nutrients|sharp rocks;salt crystals;dry dust|spread
Metal ores, like iron and copper, are dug out of the ground in a ___.|mine|well;dam;farm|spread
A resource that people use faster than nature can replace it will ___.|run low or run out|last forever;grow larger;turn into a new one|spread
Wind farms are often built on open plains and coasts because ___.|the wind is strong and steady there|the land is very wet;there are many trees;it is always dark|spread
Fertilizer washing off farms into a lake can cause ___.|too much algae to grow|the lake to freeze;fish to grow bigger;the water to turn sweet|impact
Cutting down a whole forest on a hillside can lead to ___.|more soil erosion|more rain;cleaner rivers;stronger tree roots|impact
Which choice helps protect a river's water?|keeping chemicals out of storm drains|washing paint into the gutter;cutting trees by the banks;dumping oil on the ground|impact
Farmers plant rows across a slope, not up and down it, to ___.|slow water and save soil|make the field look nice;help weeds grow;keep birds away|impact
A city's treatment plant takes in river water and ___.|cleans it so it is safe to drink|pumps oil out of it;makes electricity from it;turns it into soil|impact
Planting new trees where a forest was cut down is called ___.|reforestation|deforestation;irrigation;erosion|impact
A city builds bike lanes and better buses. This helps ___.|cut air pollution from cars|make more traffic;use more gasoline;make the air dirtier and smokier|impact
`,
      kinds: [
        {form: 'sort', topic: 'impact', q: 'Sort them: does it help keep water clean, or make it dirty?', hint: 'Think about what ends up in the stream after it rains.', bins: {'keeps it clean': ['picking up litter', 'a water treatment plant', 'planting trees by streams'], 'makes it dirty': ['oil spilled on a road', 'too much fertilizer', 'trash in a storm drain']}},
        {form: 'sort', topic: 'ground', q: 'Sort the water: fresh water or salt water?', hint: 'Could you drink it after it is cleaned, or is it full of salt?', bins: {fresh: ['a glacier', 'a river', 'an aquifer'], salt: ['the ocean', 'a sea', 'the Great Salt Lake']}},
        {form: 'match', topic: 'ground', q: 'Match each word to its meaning: watershed, aquifer and runoff.', hint: 'One is land, one is under the ground, and one flows over the ground.', pairs: [['watershed', 'land that drains into one river'], ['aquifer', 'underground rock that holds water'], ['runoff', 'rain that flows over the ground']]},
        {form: 'match', topic: 'spread', q: 'Match each resource to where it is often found: oil, rich soil and iron ore.', hint: 'Think about how each one was made: by old seas, by floods, or in rock.', pairs: [['oil', 'where ancient seas were'], ['rich soil', 'along rivers that flood'], ['iron ore', 'in rock dug from mines']]},
        {form: 'order', topic: 'ground', q: 'Put them in order: how does rain become well water?', hint: 'Start in the sky and end at the pump.', order: ['rain falls', 'it soaks into the soil', 'it fills spaces in rock underground', 'a well pumps it up']},
        {form: 'order', topic: 'impact', q: 'Put them in order: how does a city clean its drinking water?', hint: 'Start where the water is taken in, and end at the tap.', order: ['water comes in from a river or lake', 'dirt settles to the bottom', 'filters catch tiny bits', 'it is treated to kill germs', 'it flows to homes']}]},
    {id: 'civ_river', t: 'Early River Valleys', e: '🏺', ico: 'map', grade: '6', rows: `
The name Mesopotamia means "the land between the ___."|rivers|mountains;seas;deserts|river
Mesopotamia grew up between which two rivers?|the Tigris and the Euphrates|the Nile and the Amazon;the Indus and the Ganges;the Mississippi and the Ohio|river
Ancient Egypt grew up along the ___ River.|Nile|Amazon;Yellow;Indus|river
Every year the Nile flooded and left behind ___.|rich, dark soil|piles of gold;sharp rocks;a layer of salty sand|river
Early Chinese civilization began along the Yellow River, also called the ___.|Huang He|Nile;Tigris;Mississippi|river
Why did early farmers dig canals from rivers?|to bring water to their fields|to keep fish as pets;to make the river saltier;to stop the rain|river
The ancient cities of Harappa and Mohenjo-daro were along the ___ River.|Indus|Nile;Tigris;Yellow|river
The Yellow River was sometimes called "China's Sorrow" because ___.|its floods could destroy farms and towns|its water was too salty to use;it had no fish;it was too small for boats|river
The people of Sumer, in Mesopotamia, wrote by pressing marks into wet clay. This writing is called ___.|cuneiform|hieroglyphs;the alphabet;Morse code|invent
Ancient Egyptians wrote with picture signs called ___.|hieroglyphs|cuneiform;Latin letters;numbers|invent
Egyptians wrote on sheets made from a reed plant called ___.|papyrus|bamboo;cotton;maple bark|invent
Hammurabi, a king of Babylon, is famous for writing down a set of ___.|laws|songs;recipes;maps|invent
Which invention from ancient Mesopotamia helped carts and potters?|the wheel|the airplane;the light bulb;the telephone|invent
Why did early people begin to write?|to keep records of crops, trade and laws|to decorate their caves for fun;to stop speaking;to count stars only|invent
The great pyramids of Egypt were built as ___.|tombs for pharaohs|homes for farmers;schools;markets|life
A ruler of ancient Egypt was called a ___.|pharaoh|senator;mayor;president|life
When farmers grew more food than they needed, they had a ___.|surplus|shortage;drought;famine|life
Because not everyone had to farm, some people could work as ___.|potters, weavers and traders|factory workers;train drivers;computer coders|life
Having different people do different jobs is called ___.|specialization|irrigation;migration;transportation|life
Early cities built walls around them mostly for ___.|protection|decoration;shade;keeping cool|life
The streets of Mohenjo-daro were laid out in a grid, and many houses had ___.|drains for waste water|electric lights;glass windows;elevators|life
People in Mesopotamia built tall stepped towers of mud brick called ___.|ziggurats|pyramids;castles;skyscrapers|life
`,
      kinds: [
        {form: 'sort', topic: 'invent', q: 'Sort them: Mesopotamia or Egypt?', hint: 'One wrote on clay and built stepped towers; the other wrote in pictures by the Nile.', bins: {Mesopotamia: ['cuneiform', 'ziggurats', 'Code of Hammurabi'], Egypt: ['hieroglyphs', 'pyramids', 'pharaohs']}},
        {form: 'sort', topic: 'river', q: 'Sort them: part of nature, or made by people?', hint: 'Was it there before anyone lived there, or did people build or make it?', bins: {'part of nature': ['the Nile River', 'yearly floods', 'rich soil'], 'made by people': ['canals', 'pyramids', 'clay tablets']}},
        {form: 'match', topic: 'river', q: 'Match each river to its civilization: Nile, Tigris and Euphrates, and Huang He.', hint: 'Picture Africa, the land between two rivers, and China.', pairs: [['Nile', 'Egypt'], ['Tigris and Euphrates', 'Mesopotamia'], ['Huang He', 'China']]},
        {form: 'match', topic: 'invent', q: 'Match each word to its meaning: cuneiform, hieroglyphs and papyrus.', hint: 'Two are kinds of writing; one is what people wrote on.', pairs: [['cuneiform', 'marks pressed in clay'], ['hieroglyphs', 'picture signs'], ['papyrus', 'sheets made from reeds']]},
        {form: 'order', topic: 'life', q: 'Put them in order: how did farming lead to cities?', hint: 'Start with growing food.', order: ['people learned to farm', 'farmers grew extra food', 'some people did other jobs', 'towns grew into cities']},
        {form: 'order', topic: 'river', q: 'Put a year by the Nile in order.', hint: 'Start with the water rising.', order: ['the river floods', 'the water goes down', 'farmers plant in the wet soil', 'farmers harvest their crops']}]},
    {id: 'civ_class', t: 'Greece, Rome & China', e: '📖', ico: 'doc', grade: '6', rows: `
Ancient Greece was made up of many independent ___.|city-states|provinces of Egypt;farms with no towns;parts of one empire|greece
In Athens, citizens voted on laws themselves. This was an early form of ___.|democracy|monarchy;dictatorship;empire|greece
In ancient Athens, who could vote?|free men who were citizens|everyone, including children;only the king;only women|greece
The Olympic Games began in ancient ___.|Greece|Rome;China;Mesopotamia|greece
Sparta was a Greek city-state known for its strong ___.|army|libraries;theaters;rice farms|greece
Greek thinkers like Socrates asked questions to search for truth. They are called ___.|philosophers|pharaohs;senators;shipbuilders|greece
Many English words, like "telephone" and "geography", come from ___ words.|Greek|Chinese;Egyptian;Mayan|greece
Before it had emperors, Rome was a republic. In a republic, citizens ___.|elect leaders to make decisions|obey one king forever;never vote;let the army choose|rome
The Roman Senate was a group of leaders who ___.|advised and helped make laws|built the roads alone;ran the Olympic Games;led the army of Egypt|rome
Romans built stone channels called ___ to carry water to their cities.|aqueducts|pyramids;ziggurats;walls|rome
The language of ancient Rome was ___.|Latin|Greek;Spanish;English|rome
Roman roads were so well built that ___.|some are still used today|they fell apart in a year;they were made of wood;nobody used them|rome
The Romans were skilled builders who used arches and ___.|concrete|plastic;steel beams;glass towers|rome
Many English words come from Latin. Which English word comes from the Latin word "aqua," meaning water?|aquarium|airplane;library;mountain|rome
Paper was first made in ancient ___.|China|Greece;Rome;Mesopotamia|china
The Silk Road was a set of routes for ___.|trade between China and the West|racing horses;building walls;sailing to America|china
The Great Wall of China was built mainly to ___.|protect against invaders from the north|keep the rivers from flooding;mark a trade road;hold back the sea|china
Silk is a soft cloth made from the threads of ___.|silkworm cocoons|cotton plants;sheep's wool;tree bark|china
The Chinese thinker Confucius taught that people should ___.|respect their families and act kindly|never work;fight their neighbors;ignore their elders|china
A family of rulers in China, like the Han, was called a ___.|dynasty|republic;senate;city-state|china
`,
      kinds: [
        {form: 'sort', topic: 'greece', q: 'Sort them: ancient Greece or ancient Rome?', hint: 'Athens and Sparta were Greek. The Senate met in Rome.', bins: {Greece: ['the Olympic Games', 'democracy in Athens', 'Sparta'], Rome: ['aqueducts', 'the Senate', 'Latin']}},
        {form: 'sort', topic: 'china', q: 'Sort them: from ancient China, or not?', hint: 'Think about which ones came along the Silk Road from the east.', bins: {'ancient China': ['paper', 'silk', 'the Great Wall'], 'not from China': ['the Olympic Games', 'aqueducts', 'hieroglyphs']}},
        {form: 'match', topic: 'greece', q: 'Match each place to a word you learned: Athens, Rome and China.', hint: 'Citizens voting on laws, citizens electing leaders, and a family of rulers.', pairs: [['Athens', 'democracy'], ['Rome', 'republic'], ['China', 'dynasty']]},
        {form: 'match', topic: 'rome', q: 'Match each thing to its use: aqueduct, Great Wall and Silk Road.', hint: 'One moves water, one keeps people out, and one moves goods.', pairs: [['aqueduct', 'carrying water'], ['Great Wall', 'keeping out invaders'], ['Silk Road', 'trading goods']]},
        {form: 'order', topic: 'greece', q: 'Put them in order from oldest to newest.', hint: 'The river valleys came first. Rome came after Greece.', order: ['the first cities of Mesopotamia', 'the pyramids of Giza', 'democracy in Athens', 'the Roman Empire']},
        {form: 'order', topic: 'china', q: 'Put them in order: how did silk get from China to Rome?', hint: 'Start with the tiny animals that spin the thread.', order: ['silkworms spin cocoons in China', 'workers make silk cloth', 'traders carry it along the Silk Road', 'buyers in Rome get it']}]},
  ],
};
disc46Apply(); // the app loads this part after the data file, so the banks are there; the gate decides (52z-disc46.js). In tools/test.js, which
// reads the parts before the data, the banks are not there yet and this does nothing
