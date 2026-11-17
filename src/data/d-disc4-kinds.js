/* ---------- KINDS2-E: more Discover items for the new kinds (sort, mark) and why on existing choice items ---------- */
/* Second content pass after d-disc3-kinds.js. Per stop and level: 2 or 3 sort items and 1 or 2 mark items (tap the word or words in a
   sentence), pushed at the END of each bank (a saved review item keeps its bank index; K2.off and the K2OLD tests never draw or see
   them). Level 1 of sci_life, sci_earth, sci_phys, geo_world and civ is Kindergarten to 2nd grade: aloud items, and a picture on each
   sort chip when DISC_PIC (d-disc.js) has one for every item (no new pictures). Topics are the ones the Discover tests know.
   Format of each form: the header of 37-bank.js. KD4WHY gives some existing choice items [text, why] wrong answers (spec 5): a short
   sentence on the likely misconception, shown after a first miss. bankBuild turns the pair back into the plain text, so the draws of an
   item (shuffle, hash, label) do not change; K2.off does not read the why at all. */
const KD4CP = ws => { // a picture for every sort item, from the pictures the K-2 items already use; none when one is missing
  const o = {};
  for (const w of ws) { const k = [w, 'a ' + w, 'an ' + w, 'the ' + w].find(x => DISC_PIC[x]); if (!k) return null; o[w] = DISC_PIC[k]; }
  return o;
};
const KD4 = (id, lv, list, kg) => BANK[id].push(...list.map(it => {
  const x = Object.assign({lv}, kg ? {aloud: true} : {}, it);
  if (kg && x.form == 'sort') { const cp = KD4CP(Object.values(x.bins).flat()); if (cp) x.cp = cp; }
  return x;
}));
const kd4s = (topic, q, hint, bins) => ({form: 'sort', topic, q, hint, bins});
const kd4m = (topic, q, hint, sent, a) => ({form: 'mark', topic, q, hint, sent, a});

// ---- Living Things ----
KD4('sci_life', 1, [
  kd4s('habitat', 'Sort the animals: fly or swim?', 'Does it have wings, or fins?', {fly: ['bird', 'owl', 'butterfly'], swim: ['fish', 'whale']}),
  kd4s('plants', 'Sort them: plant or animal?', 'A plant stays in one place and grows from a seed.', {plant: ['tree', 'daisy', 'sunflower'], animal: ['frog', 'hen']}),
  kd4m('covers', 'Tap the word that tells what covers a bird.', 'Think about a bird you have touched or seen.', 'A bird has soft feathers.', 'feathers'),
], true);
KD4('sci_life', 2, [
  kd4s('classify', 'Count the legs: six legs or eight legs?', 'An insect and a spider have different numbers of legs.', {'six legs': ['ant', 'bee', 'ladybug'], 'eight legs': ['spider', 'scorpion']}),
  kd4s('classify', 'Sort the animals: warm-blooded or cold-blooded?', 'Warm-blooded animals keep their own body heat. Cold-blooded ones warm up in the sun.', {'warm-blooded': ['dog', 'eagle', 'whale'], 'cold-blooded': ['frog', 'snake', 'lizard']}),
  kd4m('foodchain', 'Tap the producer.', 'A producer makes its own food from sunlight.', 'The grass is eaten by the rabbit.', 'grass'),
]);
KD4('sci_life', 3, [
  kd4s('body', 'Sort the parts: skeletal system or nervous system?', 'One system holds the body up. The other sends messages.', {skeletal: ['skull', 'ribs', 'femur'], nervous: ['brain', 'nerves']}),
  kd4s('ecosystem', 'Sort them: producer or decomposer?', 'One makes food from light. The other breaks down what is left.', {producer: ['oak tree', 'grass', 'algae'], decomposer: ['mushroom', 'bacteria']}),
  kd4m('photo', 'Tap the gas that plants give off.', 'Plants take in carbon dioxide and give off a different gas.', 'Plants give off oxygen in the light.', 'oxygen'),
]);

// ---- Sky & Earth ----
KD4('sci_earth', 1, [
  kd4s('weather', 'Sort the weather: wet or not wet?', 'Does anything fall from the sky?', {wet: ['rain', 'snow'], 'not wet': ['sun', 'wind']}),
  kd4s('seasons', 'Sort the clothes: hot day or cold day?', 'What would you wear to stay cool, or to stay warm?', {'hot day': ['shorts', 'sandals'], 'cold day': ['coat', 'mittens', 'scarf']}),
  kd4m('seasons', 'Tap the word that names a season.', 'There are four seasons in a year.', 'We swim at the lake in summer.', 'summer'),
], true);
KD4('sci_earth', 2, [
  kd4s('watercycle', 'Water has three forms: ice, liquid or gas?', 'Ice is hard. A liquid pours. A gas is in the air.', {ice: ['snow', 'hail'], liquid: ['rain', 'puddle'], gas: ['water vapor']}),
  kd4s('erosion', 'Sort the changes to land: slow or fast?', 'Some changes take a very long time. Others happen in a moment.', {slow: ['a river digs a canyon', 'wind wears rock smooth'], fast: ['a volcano erupts', 'a landslide', 'an earthquake']}),
  kd4m('moonphase', 'Tap the word for the Moon\'s changing shapes.', 'The Moon looks different from night to night.', 'The Moon goes through phases each month.', 'phases'),
]);
KD4('sci_earth', 3, [
  kd4s('atmosphere', 'Sort them: weather or climate?', 'Weather is what the air is doing now. Climate is the usual pattern.', {weather: ['rainy today', 'windy this morning'], climate: ['dry all year', 'cold winters every year', 'hot summers each year']}),
  kd4s('solarscale', 'Sort them: star, planet or moon?', 'A star makes its own light. A moon goes around a planet.', {star: ['Sun'], planet: ['Earth', 'Mars'], moon: ['Moon', 'Titan']}),
  kd4m('rockcycle', 'Tap the word for melted rock above the ground.', 'Magma is underground. What is it called when it comes out?', 'Hot lava flows from the volcano.', 'lava'),
]);

// ---- Push, Pull & Stuff ----
KD4('sci_phys', 1, [
  kd4s('stuff', 'Sort them: hard or soft?', 'Press on it. Does it give?', {hard: ['rock', 'brick', 'spoon'], soft: ['sponge', 'blanket']}),
  kd4s('stuff', 'Sort them: hot or cold?', 'Would you want to touch it, or to hold it in your hand?', {hot: ['fire', 'soup'], cold: ['ice', 'snow']}),
  kd4m('soundlight', 'Tap the word that tells how a drum sounds when you hit it hard.', 'A soft tap and a hard hit sound different.', 'A hard hit makes a loud sound.', 'loud'),
], true);
KD4('sci_phys', 2, [
  kd4s('states', 'Sort the changes: heat added or heat taken away?', 'Ice melts when it gets warm. What about the others?', {'heat added': ['ice melting', 'water boiling', 'a puddle drying'], 'heat taken away': ['juice freezing', 'dew forming']}),
  kd4s('machines', 'Sort the simple machines: lever or ramp?', 'A lever turns on a point. A ramp is a slope.', {lever: ['seesaw', 'crowbar'], ramp: ['slide', 'wheelchair ramp', 'loading ramp']}),
  kd4m('circuits', 'Tap the word for a material that blocks electricity.', 'Think about the rubber on a cord.', 'Rubber is a good insulator.', 'insulator'),
]);
KD4('sci_phys', 3, [
  kd4s('gravity', 'Sort the forces: touching or at a distance?', 'Some forces need to touch. Others reach across the air.', {touching: ['pushing a door', 'friction', 'kicking a ball'], 'at a distance': ['gravity', 'a magnet pulling a nail']}),
  kd4s('mixtures', 'Sort them: element or compound?', 'An element has one kind of atom. A compound joins two or more kinds.', {element: ['gold', 'oxygen'], compound: ['water', 'salt', 'carbon dioxide']}),
  kd4m('transfer', 'Tap the way heat moves through a solid.', 'Heat can travel along a metal spoon in hot soup.', 'Heat moves through a metal spoon by conduction.', 'conduction'),
]);

// ---- Maps & World ----
KD4('geo_world', 1, [
  kd4s('landforms', 'Sort them: made by nature or made by people?', 'Was it here before people built things?', {nature: ['mountain', 'river', 'beach'], 'by people': ['road', 'bridge']}),
  kd4s('continents', 'Where do they live: Africa or Antarctica?', 'One continent is hot and one is covered in ice.', {Africa: ['giraffe', 'lion', 'zebra'], Antarctica: ['penguin', 'seal']}),
  kd4m('oceans', 'Tap the word that names the biggest ocean.', 'It is the ocean on the west side of the United States.', 'The Pacific is the biggest ocean.', 'Pacific'),
], true);
KD4('geo_world', 2, [
  kd4s('hemi', 'Sort the lines: latitude or longitude?', 'Latitude lines go around like rings. Longitude lines go from pole to pole.', {latitude: ['equator', 'Arctic Circle'], longitude: ['Prime Meridian']}),
  kd4s('key', 'Sort the map tools: direction or distance?', 'One tells which way. One tells how far.', {direction: ['compass rose', 'north arrow'], distance: ['map scale', 'scale bar']}),
  kd4s('climate', 'Sort the places: tropical or polar?', 'Is it hot all year, or icy all year?', {tropical: ['Amazon rain forest', 'Hawaii', 'Indonesia'], polar: ['Antarctica', 'Greenland']}),
  kd4m('key', 'Tap the word for the tool that shows directions.', 'It has an arrow that points north.', 'A compass rose shows north, south, east and west.', 'compass'),
]);

// ---- United States ----
KD4('geo_us', 1, [
  kd4s('states', 'Sort the places: a state or a city?', 'A state is big and has many cities inside it.', {state: ['Texas', 'Ohio', 'Maine'], city: ['Denver', 'Boston']}),
  kd4s('borders', 'Sort the states: on a coast or inland?', 'Does the state touch an ocean?', {coast: ['Florida', 'Oregon', 'Maine'], inland: ['Kansas', 'Utah', 'Iowa']}),
  kd4m('capitals', 'Tap the city that is our nation\'s capital.', 'The President works there.', 'Our nation\'s capital is Washington, D.C.', 'Washington'),
  kd4m('states', 'Tap the two state names.', 'Look for the words that name states.', 'Ohio and Texas are states.', ['Ohio', 'Texas']),
]);
KD4('geo_us', 2, [
  kd4s('landmarks', 'Sort the places: national park or city?', 'A national park keeps wild land safe.', {'national park': ['Yellowstone', 'Grand Canyon', 'Yosemite'], city: ['Chicago', 'Seattle']}),
  kd4s('timezones', 'Sort the cities: Eastern or Central Time?', 'Central Time is one hour behind Eastern Time.', {Eastern: ['Atlanta', 'Boston', 'Miami'], Central: ['Dallas', 'Chicago']}),
  kd4m('mountains', 'Tap the word that names the old mountains in the East.', 'These mountains have low, round peaks.', 'The Appalachian Mountains are in the East.', 'Appalachian'),
  kd4m('landmarks', 'Tap the word that names the biggest Great Lake.', 'It is the biggest freshwater lake in North America.', 'Lake Superior is the biggest Great Lake.', 'Superior'),
]);

// ---- Community & Citizens ----
KD4('civ', 1, [
  kd4s('symbols', 'Sort them: a US symbol or a toy?', 'A symbol stands for our country.', {'US symbol': ['flag', 'bald eagle', 'Statue of Liberty'], toy: ['doll', 'kite']}),
  kd4s('rules', 'Sort them: kind or unkind?', 'Would it make a friend feel good?', {kind: ['share a toy', 'say thank you', 'help a friend'], unkind: ['push in line', 'take a toy']}),
  kd4m('needswants', 'Tap the one thing we need to live.', 'A need is something we cannot live without.', 'We need water more than candy.', 'water'),
], true);
KD4('civ', 2, [
  kd4s('branches', 'Sort the jobs: President or Congress?', 'One signs and carries out laws. The other writes them.', {President: ['signs a bill', 'leads the military', 'names Cabinet members'], Congress: ['writes bills', 'votes on bills']}),
  kd4s('constitution', 'Sort the jobs: federal or state government?', 'Federal means the whole country. State means one state.', {federal: ['coins money', 'runs the Army', 'declares war'], state: ['gives driver licenses', 'runs state parks']}),
  kd4m('branches', 'Tap the leader of a state.', 'The President leads the country. Who leads a state?', 'A governor leads a state.', 'governor'),
  kd4m('constitution', 'Tap the word for a proposed law.', 'It is not a law yet.', 'A bill becomes law after the vote.', 'bill'),
]);

// ---- why: [text, why] on existing choice items (found by their q and a; an item that is not found is skipped) ----
const KD4WHY = {
  sci_life: [
    ['A bat can fly, but it is a ___ because it has fur and feeds its babies milk.', 'mammal', {bird: 'Flying does not make a bird. Birds have feathers.'}],
    ['A spider is not an insect because it has ___ legs.', 'eight', {six: 'Insects have six legs. A spider has more.'}],
    ['Which animal is a mammal?', 'a whale', {'a shark': 'A shark is a fish. It breathes with gills, not lungs.'}],
    ['In photosynthesis, plants use sunlight, water and ___.', 'carbon dioxide', {oxygen: 'Plants give this gas off. They take in a different one.'}],
  ],
  sci_earth: [
    ['Water changing from a liquid into a gas is called ___.', 'evaporation', {condensation: 'Condensation is gas to liquid. This one is liquid to gas.'}],
    ['Why does the Moon seem to change shape over a month?', 'more or less of its sunlit side faces Earth', {"Earth's shadow covers part of it": "Earth's shadow makes an eclipse. Phases come from the lit side."}],
    ['Which one is closest to Earth?', 'the Moon', {'the Sun': 'It looks big, but it is far away. Something else is closer.'}],
  ],
  sci_phys: [
    ['Which one is NOT matter?', 'light', {air: 'Air is a gas. It has mass and takes up space.'}],
    ['Which would a magnet NOT pick up?', 'a plastic button', {'a nail': 'A nail is iron or steel, so a magnet picks it up.'}],
    ['How does a simple machine, like a ramp or a lever, help us?', 'we can push or pull less hard', {'the load weighs less': 'The load weighs the same. The push gets smaller.'}],
    ['Oil floats on water because it is ___.', 'less dense', {heavier: 'Oil is lighter for its size, so it floats.'}],
    ['Air is a mixture of ___.', 'gases', {'only oxygen': 'Air is mostly nitrogen. Oxygen is only a part.'}],
  ],
  geo_world: [
    ['Land with water on three sides is a ___.', 'peninsula', {island: 'An island has water on every side.'}],
    ['Lines of latitude run ___ around Earth.', 'east and west', {'north and south': 'Latitude lines are rings around the globe.'}],
    ['On a scale where 1 inch equals 10 miles, 3 inches on the map is ___ miles.', '30', {'13': 'Do not add. Multiply 3 inches by 10 miles.'}],
  ],
  geo_us: [
    ['What is the capital of California?', 'Sacramento', {'Los Angeles': 'Los Angeles is the biggest city, but the capital is not.'}],
    ['What is the capital of Alaska?', 'Juneau', {Anchorage: 'Anchorage is the biggest city, but the capital is not.'}],
    ['The capital of the United States is ___.', 'Washington, D.C.', {'New York City': 'New York City is big, but it is not our capital.'}],
    ['When it is 3 p.m. in Eastern Time, it is ___ in Pacific Time.', 'noon', {'6 p.m.': 'Going west, clocks go back. Pacific is earlier.'}],
  ],
  civ: [
    ['Which is a need?', 'food', {'fancy sneakers': 'Sneakers are nice, but we can live without fancy ones.'}],
    ['A President can say no to a bill by using a ___.', 'veto', {vote: 'A vote makes a choice. This word says no to a bill.'}],
    ['Congress makes the laws. It is part of the ___ branch.', 'legislative', {executive: 'The executive branch carries out laws. Congress makes them.'}],
  ],
};
let KD4N = 0; // how many existing items got a why (the test counts them)
for (const id in KD4WHY) for (const [q, a, w] of KD4WHY[id]) {
  const it = BANK[id].find(x => (x.form || 'choice') == 'choice' && x.q === q && x.a === a && Array.isArray(x.d) && Object.keys(w).every(k => x.d.includes(k)));
  if (!it) continue;
  it.d = it.d.map(x => w[x] ? [x, w[x]] : x);
  KD4N++;
}

// ---- how often each new form is drawn in Discover (BANKMIX, 49b-kinds2.js): about 45% of a stop's questions, choice the rest ----
for (const id of ['sci_life', 'sci_earth', 'sci_phys', 'geo_world', 'geo_us', 'civ']) {
  BANKMIX[id] = {};
  for (let lv = 1; lv <= (id.startsWith('sci_') ? 3 : 2); lv++) BANKMIX[id][lv] = {sort: .2, mark: .1, order: .06, match: .1};
}
