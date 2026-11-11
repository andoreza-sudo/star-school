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
