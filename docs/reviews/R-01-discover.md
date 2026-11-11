# R-01 Discover: teaching and engagement review

Review of the whole Discover section (science, geography and civics), all 3 worlds and 15 stops (Nature Trail for K-2, Science Lab
for grades 3-4, Star Observatory for grades 5-6), as of v137 (b56c976).
Written 2026-11-11 by Claude for Andy. No app changes were made.

---

## Part 1. For parents: the short version

### What works well

Discover is accurate, neat and easy to play, but it is mostly a vocabulary quiz.

- **The facts are almost all right.** I read every one of the 1,118 questions and checked each fact. One answer key is wrong and one
  question has two right answers (both in Must fix below). A handful more are out of date or could be read two ways. Everything else is
  correct and stated the way a school book states it.
- **The tables are right.** All 50 state capitals, the five regions (states that books place differently are left out on purpose) and
  every "which state shares a border" answer were checked against a map. States that only touch at a corner, like Arizona and Colorado,
  are never used. That is careful work.
- **Some questions tackle well-known mistaken ideas.** Venus, not Mercury, is the hottest planet. A light-year is a distance, not a time.
  Astronauts float because they are falling around Earth, not because there is no gravity. A feather and a hammer land together on the
  Moon. A mushroom cannot make its own food. Lava is melted rock above ground and magma is melted rock below it. Mass stays the same on
  the Moon but weight does not.
- **Civics is neutral and kind.** It covers how government works and never names a living person. Job names are gender-neutral
  (firefighter, police officer, mail carrier).
- **Fair to play.** The right answer is equally likely to be in any position, hints never give the answer away, and missed questions come
  back for review. On a phone and a tablet nothing is cut off and the buttons are big.

### What to improve, in priority order

Sizes: **S** = an hour or two, **M** = about a day, **L** = several days.

**Must fix**
1. **One wrong answer (S).** "In a pond, most of the insects that frogs eat die. Over time the number of insects will ___." The app marks
   "go up" as right. If the insects die, their number goes down. The writer surely meant "most of the frogs die". Cells & Ecosystems
   (`sci_life` 3, seed 201), src/data/d-disc2-sci.js.
2. **Two right answers (S).** "Freedom of religion means people may ___." "Choose their own beliefs" is marked right, but "not practice
   at all" is offered as a wrong answer, and it is also true. Freedom of religion protects people who follow no religion. The app
   currently teaches the opposite. Government & Money (`civ` 2, seed 40), src/data/d-disc2-soc.js.
3. **Kindergarteners cannot play Nature Trail on their own (M).** Nature Trail is the K-2 world. The question is read aloud, but the
   answer buttons are written words ("calf", "foal", "lamb", "piglet") and nothing reads them out. A 5-year-old who cannot read yet can
   only guess. The help text is not read aloud either. The app's own rule for Pre-K and K is "no reading required" (CURRICULUM 1.4). Read
   the choices aloud as part of the question ("A baby cow is called a ... calf, foal, lamb or piglet?") or let a child tap a choice to hear
   it, read hints aloud for K, and use pictures as answers where the answer is a thing (baby animals, weather, landforms). All five Nature
   Trail stops; 37-bank.js (`bankBuild`, `say`), 39-hints.js (text hints), src/data/d-disc.js, d-disc2-soc.js.
4. **The map questions have no maps (M).** Grids & Climate asks "Start at (0, 0). Go 3 across and 2 up. Where are you?" and the hint
   says "Count the squares ... starting from the corner marked (0, 0)", but no grid is drawn (`geo_world` 2, seed 66). States & Capitals
   asks which region or neighbouring state with no map of the country. Children are never asked to read a map, which is the main skill
   geography is meant to teach at this age. The math section already has a coordinate-grid picture (`VIZ.coordGrid`). Draw the grid for
   the 15 grid questions now, and add simple maps (see Should 6).

**Should fix**
5. **Nothing explains the answer (M to L).** After a second wrong try the app shows the right button and says "Here's the answer", with
   no reason. For a fact question the reason is the lesson ("Snow is frozen water: when water gets cold enough it turns to ice"). Add one
   short spoken sentence to every item (the bank format can take it as `after`) and show it after a miss and after a right answer.
6. **Almost no pictures (L).** Only 30 of the 1,118 questions have a picture: 26 in the K-2 world and 4 in Science Lab. Grades 3-6 science and all
   of geography and civics are text only: a big white card with one line of writing. The water cycle, moon phases, food webs, circuits,
   life cycles, plate boundaries, rock layers, the US map and the world map are the pictures science and geography books are built on.
7. **Too much "what is this called", too little "why" and "what would happen" (L).** About 9 in 10 questions ask for a word or a fact.
   Today's science standards (NGSS) ask children to explain things they can see happen, find cause and effect, plan a fair test and read
   a data table or a graph. There are a few good cause-and-effect questions (fossil shells on a mountain, frogs losing their insects);
   make that the norm.
8. **Wrong answers should be real mistakes (M).** The best wrong answers are the mistaken ideas children really hold. "The seasons are
   caused mainly by Earth's ___" offers speed, size and colour, but not "distance from the Sun", which is the mistake most children and
   adults make. Moon phases offer "cold, rainy, frozen" but not "Earth's shadow". About 20 wrong answers are jokes ("turns to ice cream",
   "free candy", "only in winter") that any child can rule out. In civics the right answer is also the longest one 41-45% of the time
   (25% would be fair), which lets a child guess.
9. **Missing topics (L in total).** Big gaps: there is **no history at all** in any grade (the C3 social-studies framework has history from
   kindergarten), almost nothing about people and cultures around the world, no civics for grades 3-4, no world geography for grades
   5-6. In science: severe weather and staying safe, how young animals look like their parents, slow and fast changes to the land,
   designing and testing a solution, conservation of matter, atoms and molecules, where a plant's mass comes from, and climate change
   (a grade 6 standard). See 2.3.
10. **Big jumps between grades (L).** There are worlds only for K, grade 3 and grade 5. A first or second grader replays the same K-2 stops
    (51 to 95 questions each) that a kindergartener had; a fourth grader the grade 3 stops; a sixth grader the grade 5 stops. A child sees
    every question in a stop within 6 to 10 rounds. Add worlds (or levels) for grades 1-2, 4 and 6.
11. **Questions with two possible answers (S).** "Which region is Nevada in?" and "...Utah in?" offer Southwest as a wrong answer, and
    the hint ("Where in the country is this state?") pushes toward it; many maps put both in the Southwest (`geo_us` 1, seeds 10 and
    249). "The United States is in the Northern and ___ Hemispheres" marks Eastern wrong, but Alaska's western Aleutian Islands are in the
    Eastern Hemisphere (`geo_world` 2, seed 225; say "Most of the United States"). "Which is NOT a right of every citizen?" lists "voting
    at 18" as a right of every citizen; a 9-year-old citizen cannot vote (`civ` 2, seed 86).
12. **Names that changed (S).** Since 2025 the US government calls Denali "Mount McKinley" and the Gulf of Mexico the "Gulf of America";
    Alaska still says Denali, and most of the world says Gulf of Mexico. A child may meet either name in a newer book. Give both names
    without taking a side ("Denali, also called Mount McKinley") (`geo_us` 2, seeds 50, 239). Most US maps now show five oceans,
    including the Southern Ocean (National Geographic 2021, NOAA), and the app never mentions it.
13. **Hints that cannot help (M).** Most hints are one general sentence per topic. "Think about the continent where this famous place is"
    is the hint for "The Ganges flows through ___" (answer India, a country) and for Mount Fuji and the Yangtze. "Picture the planets in
    order" does not help a child who does not know the order; a memory sentence would ("My Very Educated Mother Just Served Us
    Noodles"). The fossil hint says fossils are from "a time before there were any people", but the same stop teaches woolly mammoths,
    which lived alongside people. Write hints that give a clue for that item.
14. **On a phone, the question shrinks to tiny print when the hint opens (S to M).** With a long question, four full-width answer buttons
    and the hint, the question text is squeezed to about 11 px at 380 px wide (screenshot `11-life3-insects-hint-380x780`). Keep the
    question at a readable size and let the card scroll, or put long answers two to a row.

**Could do**
15. Use the other answer types the app already has: put a life cycle or the planets in order, match baby animals to parents, "tap every
    living thing" (M; the bank needs `BANKF.order`, `.match`, `.multi` builders).
16. Seasons are taught only as four temperate, northern seasons (spring flowers, autumn leaves). One or two items on wet and dry
    seasons in the tropics and opposite seasons south of the equator would make it true for every child (S).
17. Small wording fixes: "A simple machine helps us by making work easier" (it makes the push or pull smaller; the work stays the
    same), "Mountain Time is ___ hour(s) ahead" (spoken as "hour s"), "Where does a bee live? in a hive" (true for honeybees; most bees
    live alone in the ground), "Which animal lives in a very cold, icy place? a penguin" (some penguins live in warm places) (S).
18. Show the topic tags (water cycle, food chains, branches...) on the grown-ups report so a parent sees which topics are shaky (M).
19. When people and history are added, include Native nations and people from many places, and give names their origin
    (Denali is a Koyukon Athabascan name) (part of 9).

---

## Part 2. Detailed findings

### 2.1 How the review was done

- **Read**: ROADMAP R-01, CURRICULUM 1, 2.4, 6 and 8, the PROGRESS entries for P2-36 and P2-37, R-01-math.md for format, and the code:
  38-skills.js (`sci_*`, `geo_world`, `geo_us`, `civ`), 42-paths.js (worlds, `startBelow`), 37-bank.js (`genBank`, `bankBuild`,
  `bankChoose`), 49-kinds.js (choice kind), 39-hints.js, 50-round.js (`check`, reveal), and every line of the three data files
  src/data/d-disc.js (208 items), d-disc2-sci.js (419 items) and d-disc2-soc.js (491 items, 166 of them built from the state tables).
- **Checked every fact** of all 1,118 items against standard references: NASA Solar System Exploration (planets, Moon, Sun), USGS
  (plates, rocks, earthquakes, Mariana Trench, Crater Lake, Great Lakes), NOAA (atmosphere, oceans, Southern Ocean), National Geographic
  Education (continents, landforms, biomes), the National Park Service (landmarks), the US Constitution and the USCIS civics test
  (branches, amendments, dates), Executive Order 14172 (2025, Denali and Gulf names), and the state capitals and borders on a US map.
  Every capital, region and border answer was checked state by state.
- **Generated** 3,000 seeded questions for each of the 15 Discover levels (45,000) with the code loaded as tools/test.js does. Checked:
  every item drawn (all were), right-answer position, how often the right answer is the longest choice, pictures, own versus default
  hints, items with only 2 wrong answers. Seeds below are `genQ(sk, lv, seed)` outside a round (the bank picks by seed only there).
- **Played** in the built app (index.html v137) with Playwright and Chromium at 380x780 and 1024x600, deviceScaleFactor 2: Home, the
  Discover map at grades K, 3 and 5, one question from every stop, a wrong answer with the hint open on every stop, and the "Here's the
  answer" screen. Screenshots are in the session scratchpad `r01-disc/` folder (for example `01-life1-cow-380x780.png`,
  `10-geo2-grid-hint-1024x600.png`, `20-life3-insects-exact-reveal-380x780.png`).

**Wrong answers found: 1** (`sci_life` 3 seed 201). **Two right answers: 1** (`civ` 2 seed 40). Plus 4 ambiguous items (Should 11).

### 2.2 Evidence base used

| Practice | Source | What it asks of an app |
|---|---|---|
| Three-dimensional science: ideas, practices, crosscutting concepts, explained phenomena | NRC 2012, *A Framework for K-12 Science Education*; NGSS Lead States 2013, *Next Generation Science Standards*; STEM Teaching Tools #28 (2015) on anchoring phenomena | Questions about things children can see happen, cause and effect, fair tests, data |
| Children's mistaken ideas in science | Driver, Squires, Rushworth & Wood-Robinson 1994, *Making Sense of Secondary Science*; AAAS Project 2061 misconception item bank; Vosniadou & Brewer 1992 (Earth and day/night); Schneps 1987, *A Private Universe* (seasons) | Wrong answers built from the real mistakes; items that make the child choose between the mistake and the science |
| Social studies inquiry by grade | NCSS 2013, *College, Career, and Civic Life (C3) Framework* | Civics, economics, geography and history from K, with questions and sources |
| Geography standards and map learning | NCGE 2012, *Geography for Life* (2nd ed.); Liben & Downs 1993 (*Developmental Psychology*) on children's map understanding | Read and make real maps; space, place and human-environment links |
| Explanatory feedback | Butler, Karpicke & Roediger 2008 (*JEP: LMC*); Shute 2008 (*Review of Educational Research*); Hattie & Timperley 2007 | After an error, explain why; right/wrong alone teaches little |
| Retrieval and spacing | Roediger & Karpicke 2006; Pashler et al. 2007 (IES practice guide) | Quizzing plus spaced review (the app does this) |
| Multiple-choice item writing | Haladyna, Downing & Rodriguez 2002 (*Applied Measurement in Education*) | Plausible distractors from common errors; no longest-answer cue; one defensible answer |
| Pictures with words | Mayer 2009, *Multimedia Learning* | Diagrams beside the words for processes and places |
| Early readers | CURRICULUM 1.4 (this repo); Cervetti et al. 2012 (*JRST*) on science and literacy | Pre-readers hear everything; vocabulary taught in context |

### 2.3 Standards coverage

**Science (NGSS performance expectations), by grade.** Covered = a group of items asks it; Thin = one or two items or vocabulary only.

| Grade | Covered | Thin | Missing |
|---|---|---|---|
| K | K-LS1-1 needs of living things; K-PS2-1 push and pull | K-PS3-1 sunlight warms; K-ESS2-1 weather patterns (words only, no data); K-ESS3-1 habitats | K-ESS2-2 animals and plants change their surroundings; K-ESS3-2 forecasts and severe weather; K-ESS3-3 reduce human impact |
| 1 | 1-PS4-3 see-through, shiny | 1-PS4-1 vibration makes sound (one guitar item); 1-PS4-2 light lets us see; 1-ESS1-1 sun, moon, stars | 1-LS1-1 copying nature to solve problems; 1-LS1-2 parents help young survive; 1-LS3-1 young like but not exactly like parents; 1-ESS1-2 daylight through the year; 1-PS4-4 signals with light and sound |
| 2 | 2-ESS2-2 land and water shapes; 2-PS1-1 properties | 2-PS1-4 heating/cooling (melting only); 2-LS4-1 habitats; 2-ESS2-3 water as solid/liquid | 2-LS2-2 pollination and seed spreading (only at level 2); 2-ESS1-1 fast and slow Earth events; 2-ESS2-1 slowing erosion (only at level 2); 2-PS1-2/3 test materials, build from parts |
| 3 | 3-LS1-1 life cycles; 3-LS4-1 fossils; 3-LS4-3 adaptations; 3-PS2-1/3/4 forces and magnets | 3-ESS2-2 climates (in geo_world 2) | 3-ESS2-1 weather data tables and graphs; 3-ESS3-1 weather hazards; 3-LS2-1 animal groups; 3-LS3-1/2 traits (only at level 3); 3-LS4-4 a changing habitat |
| 4 | 4-PS3-2/4 energy and conversion; 4-ESS2-1 weathering and erosion; 4-ESS3-1 resources; 4-ESS1-1 rock layers | 4-LS1-1 structures; 4-ESS2-2 Earth-feature patterns (level 3) | 4-PS4-2 we see by reflected light entering the eye; 4-LS1-2 senses and the brain; 4-PS4-3 coded information; 4-ESS3-2 reduce hazard damage |
| 5 | 5-PS2-1 gravity; 5-PS3-1 energy in food came from the Sun; 5-LS2-1 food webs | 5-ESS2-2 fresh and salt water; 5-ESS1-1/2 Sun brightness, shadows | 5-PS1-1 matter is made of tiny particles; 5-PS1-2 mass is conserved; 5-LS1-1 plant mass comes mostly from air and water; 5-ESS2-1 Earth's spheres interact |
| 6 (MS) | MS-LS1-1/2/3 cells and body systems; MS-LS3 genes; MS-ESS2-3 plates; MS-ESS2-1 rock cycle; MS-PS4 waves; MS-PS1-2 chemical change | MS-ESS1-3 solar system scale | MS-PS1-1 atoms and molecules; MS-ESS3-5 rising global temperatures (climate change; the greenhouse effect item stops short of it); MS-LS2 human impact beyond one "pollution" item |
| All | | | Science and engineering practices (asking questions, fair tests, reading data, models, arguing from evidence); engineering design (K-2-ETS1, 3-5-ETS1) |

**Social studies (C3 Framework, NCSS 2013).**

| Band | Civics | Economics | Geography | History |
|---|---|---|---|---|
| K-2 | Covered: helpers, rules, symbols, voting to decide | Needs and wants covered; goods and services, producers and consumers missing (D2.Eco.1-3.K-2) | Map words, landforms, continents, oceans covered; how places shape how people live and cultures around the world missing (D2.Geo.4-6) | **Missing**: past and present, timelines, family and community history (D2.His.1-3) |
| 3-5 | **No level** (civ has K-2 and 5-6 only); state and local government missing | At grade 5-6 only | Grid, key, scale, hemispheres, climate, US states and regions covered (without maps); human movement and culture missing | **Missing**: Native nations, colonies, independence, how the country grew (except two dates) |
| 6 | Branches, Constitution, rights, federalism covered | Goods, services, supply and demand covered | **No world level** (geo_world stops at 3-4); US landmarks only | **Missing**: early civilisations or world history (the usual grade 6 course) |

### 2.4 Fact check: every item that needs a change

| Skill, level, seed | Item | Problem | Fix |
|---|---|---|---|
| sci_life 3, 201 | "In a pond, most of the insects that frogs eat die. Over time the number of insects will ___." → go up | **Wrong key.** Insects die, so insects go down | "Most of the frogs in a pond die. Over time the number of insects they ate will ___." → go up |
| civ 2, 40 | "Freedom of religion means people may ___." → choose their own beliefs; wrong: "not practice at all" | **Two right answers**; teaches that non-belief is not protected | Replace the distractor ("be punished for their beliefs") |
| geo_us 1, 10 and 249 | Nevada, Utah region → West; wrong: Southwest | Many textbook maps place both in the Southwest; the hint "by position" points there | Leave Nevada and Utah out of region items (as AR, CO, OK already are) or never offer Southwest for them |
| geo_world 2, 225 | "The United States is in the Northern and ___ Hemispheres." → Western; wrong: Eastern | The Aleutians west of 180° are in the Eastern Hemisphere | "Most of the United States is in..." |
| civ 2, 86 | "Which is NOT a right of every citizen?" → a free car; "voting at 18" shown as a right of every citizen | Children who are citizens cannot vote | "Which is NOT a right of citizens?" or "voting (at 18 and over)" |
| geo_us 2, 50 and 103 | Denali | US federal name since EO 14172 (2025) is Mount McKinley; Alaska and the park keep Denali | "Denali (also called Mount McKinley)" |
| geo_us 2, 239 | "The Mississippi River flows into the ___." → Gulf of Mexico | US federal name since 2025 is Gulf of America; international name unchanged | Keep, and name both in the item or its explanation |
| geo_world 1, oceans | Four oceans only | Five oceans in most US references (Southern Ocean: National Geographic 2021, NOAA) | Add the Southern Ocean around Antarctica |
| sci_life 2, 18 | Fossil hint: "a time before there were any people" | Same stop teaches mammoths (lived with people); fossils are usually over 10,000 years old | "Think of animals like dinosaurs and mammoths. Was it this year, or thousands and thousands of years ago?" |
| geo_world 2, 33 / 253 / 45 | Ganges → India, Mount Fuji → Japan, Yangtze → China | Default hint asks for the continent; the answers are countries | Item hints ("It is a big country in South Asia...") |
| geo_world 2, 66 (all 15 grid items) | "Count the squares ... from the corner marked (0, 0)" | No grid on screen | Draw the grid (`VIZ.coordGrid`) |
| geo_world 1, 29 | "Which continent is also one country?" → Australia | True as US schools teach it; many atlases call the continent Australia/Oceania or Sahul (it includes New Guinea) | Fine for K-2; could say "Which continent is mostly one country?" |
| sci_phys 2, 41 | "A simple machine helps us by making work ___." → easier | Physics: the force gets smaller, the work does not | "...by letting us use a smaller push or pull" |
| sci_life 1, 188 / 41 / 40 | bee → hive; penguin → icy place; bird nest → in a tree (wrong: "under the sand") | Honeybees only; some penguins live in warm places; terns and plovers nest on sand | "a honeybee"; "a polar bear"; drop "under the sand" |
| geo_us 2, 12 | "Mountain Time is ___ hour(s) ahead of Pacific Time." | "hour(s)" is read aloud oddly | "...is how many hours ahead...?" |

Everything else was checked and is correct as written, including all 50 capitals, all border pairs and the 43 region assignments,
the planet facts, Earth's layers, the atmosphere, the Constitution dates and the Bill of Rights.

### 2.5 Findings by world and stop

#### Nature Trail (K-2): sci_life 1, sci_earth 1, sci_phys 1, geo_world 1, civ 1

- **Strong**: content fits K-2 (needs of living things, baby animals, weather words, push and pull, solid and liquid, helpers, rules,
  needs and wants). Pictures show the subject without giving the answer (the cow for "A baby cow is called a ___", screenshot
  `01-life1-cow-380x780`). Good cause-and-effect starters: "A plant on a dark shelf gets weak. What is it missing?", "A ball rolls on the
  grass and nobody pushes it again. What happens?".
- **Not playable by a non-reader (Must 3).** The prompt is spoken (`gradeCfg().auto==='all'` for K), but `bankBuild` sets `say` to the
  question only, the choice buttons have no audio (49-kinds.js `choice.render`), and `k:'text'` hints are never spoken (39-hints.js line 4).
  Screenshot `01-life1-cow-hint-380x780`: four word buttons and a written hint. The R-01 reading and Spanish reviews found the same
  unspoken text hints; one fix in 39-hints.js serves all three.
- **Pictures**: 26 of 208 science items and 0 of 128 geography and civics items have one. Landforms ("A low area of land between mountains
  or hills is a ___", screenshot `04-geo1-380x780`) are pure description for a 5-year-old; a drawing of each landform is the standard
  way to teach them.
- **Vocabulary first**: "habitat", "shelter", "force", "consequence", "symbol" appear as definitions. NGSS K-2 asks for observation and
  patterns: "Which animal could live here?" with a picture of a pond, "Which push makes the ball go farther?" as two pictured kicks.
- **Missing (2.3)**: offspring like parents, severe weather, fast and slow land changes, history (past and present, then and now).
- `sci_earth` 1 and `sci_phys` 1 have 33 items with only two wrong answers (3 buttons), which is fine for K.

#### Science Lab (grades 3-4): sci_life 2, sci_earth 2, sci_phys 2, geo_us 1, geo_world 2

- **Strong**: life cycles with the pupa stage, food chains with producers, consumers and decomposers, adaptations matched to habitats,
  the water cycle steps, erosion and deposition, renewable resources, moon phases, forces and magnets, simple machines, circuits with
  conductors and insulators. Good items: "Fossils of sea shells are found high on a mountain. The place was once ___", "Water freezes in a
  crack in a rock. As it turns to ice it ___", "A bulb in a circuit does not light. Which is a good first check?".
- **Misconceptions missed (Should 8).** "Moon phases happen because we see different amounts of the Moon's ___ side" (seed 77) offers
  cold, rainy, frozen; the misconception to beat is Earth's shadow (that is an eclipse). Same pattern in "Which kind of soil holds water
  best?" and "Water vapor cooling... is called ___" (fine, but no item asks where the drops on a cold glass come from with "the glass
  leaks" as a choice; the existing item offers glass, drink and table, close to it).
- **Few pictures**: 4 of the 201 science items (a butterfly, giraffe, duck and mushroom). Life cycle, water cycle, food chain and circuit diagrams carry most of the meaning
  at this grade.
- **States & Capitals (`geo_us` 1)**: 166 items, accurate, built from tables with good wrong answers (the big non-capital city: Chicago
  for Illinois, Miami for Florida). But 78 of 166 items are capital memorisation, and regions and borders are asked with no map
  (screenshot `09-us1-nevada-hint-380x780`). With a US map (one SVG, states as paths) each item becomes "tap the state", "which state
  touches Kansas?" with the map shown, and regions can be coloured. Nevada and Utah (Should 11).
- **Grids & Climate (`geo_world` 2)**: grid items ask in words only and the hint refers to squares that are not drawn (Must 4,
  screenshot `10-geo2-grid-hint-1024x600`). Map scale and key items are good but would be better as a real map with a key and a scale bar.
  Features hint mismatch (2.4). Climate items are strong ("It is colder near the poles because the Sun's light hits Earth there at a
  slant and spreads out").
- **Missing**: weather data tables (3-ESS2-1), hazards (3-ESS3-1, 4-ESS3-2), how we see (4-PS4-2), civics for 3-4, history.

#### Star Observatory (grades 5-6): sci_life 3, sci_earth 3, sci_phys 3, geo_us 2, civ 2

- **Strong**: cells and organ levels, photosynthesis inputs and outputs, body systems, inherited versus learned traits ("Can a scar from a
  cut be passed on to a child?"), plate boundaries, rock cycle, atmosphere layers, scale of the solar system, rotation versus revolution,
  physical versus chemical change, gravity with mass and distance, conduction/convection/radiation, wave parts. Excellent misconception
  items: astronauts falling, feather and hammer, mass versus weight, Venus, light-year.
- **Wrong key (Must 1)**: `sci_life` 3 seed 201, screenshots `11-life3-insects-380x780` (question) and
  `20-life3-insects-exact-reveal-380x780` ("go up" shown as the answer).
- **Seasons (seed 131)**: "The seasons are caused mainly by Earth's ___" → tilt; offer "distance from the Sun" as a wrong answer.
  Schneps 1987 filmed Harvard graduates giving that wrong answer; the item is the right place to meet it.
- **Plant mass (5-LS1-1)**: "In photosynthesis, plants use sunlight, water and ___" is good. Add the classic: "A tree grows from a seed
  to a ton of wood. Most of that mass came from... the air / the soil / the water" (answer: carbon dioxide from the air).
- **US Landmarks (`geo_us` 2)**: accurate and varied (landmarks, rivers, mountains, time zones with real time arithmetic). Names (Should
  12). The landmarks hint ("Which state would you cross the country to reach it?") is unclear, and is shown for city answers too.
- **Government & Money (`civ` 2)**: accurate and neutral. Two-right religion item (Must 2), "voting at 18" (Should 11), longest-answer
  cue (2.7). Supply and demand items are well built as cause and effect ("A frost destroys many orange trees. The supply of oranges ___").
- **Missing**: atoms and molecules, conservation of mass, climate change (MS-ESS3-5; the greenhouse-effect item is there, so the next
  step is small), world geography and history.

### 2.6 Across the section

**Feedback (Should 5).** `check()` in 50-round.js: first miss → "Try again!" and the topic hint; second miss → the right button lights,
"Here's the answer" covers the question, and the answer word is spoken (`K.spoken(q)` = the answer only), then the next question after
2.6 s. Butler et al. 2008 found explanation feedback after an error improves later recall and transfer over answer-only feedback. The
bank already supports `after` in the question object; adding `after` text to each row (a seventh `|` field in `discRows`) needs no new
code beyond passing it through `bankBuild`.

**Item format.** Every Discover question is one 2-4 button choice with text answers. The engine has `order`, `match` and `multi` kinds
(49-kinds.js) but the bank has no builders for them (`BANKF` is empty), so they cannot be used from data yet (Could 15). Life cycles,
planet order, the water cycle, layers of the Earth and the branches of government are natural order and match items.

**Distractors (Should 8).** About 20 wrong answers are jokes (2.7 has the list). The CURRICULUM 1.3 rule says distractors are plausible
mistakes. Joke options turn a 4-choice item into a 2- or 3-choice one and make the item test reading, not science. In `civ` 1 and 2 the
right answer is the single longest choice 45% and 41% of the time (fair would be about 25%), in `sci_life` 2 38.5%.

**Hints (Should 13).** 65 of the 1,118 items have their own hint; the rest share one sentence per topic (for example every grid item gets
"Count the squares..."). A topic hint can remind a child of a method ("Follow the energy...") but cannot help with a fact the child does
not know. For recall items the hint should give a clue that narrows the choice: a mnemonic for planet order, the first letter, a
description ("It is the big country south of China, and the river is holy to many people there").

**Reading load.** From grade 2 up prompts are read only when the child taps Hear it (`gradeCfg` 'tap'), as elsewhere in the app. Grade 3-4
items carry heavy words (germinate, paleontologists, precipitation, condensation, deposition); grade 5-6 items (stomata, chloroplast,
convergent, troposphere, federalism). That is grade-appropriate vocabulary, but each word is met only as a definition question. Words
in a picture or a short explanation stick better (Cervetti et al. 2012).

**Engagement and look.** The Discover map, colours and stop icons are bright and clear (screenshot `00-map-g0-380x780`), and the Home
mission "Play a Discover round" brings children in. Inside a round the card is mostly white space with one line of text and, from
grade 3, no picture at all (`02-earth1-snow-1024x600`, `15-civ2-religion-1024x600`). Science is the subject where children most want to
see things; Discover is currently the least visual section of the app.

**Phone layout (Should 14).** At 380x780, a long question with four wide answers and an open hint shrinks the question to about 11 px
(`11-life3-insects-hint-380x780`); after the second miss the "Here's the answer" toast covers it entirely
(`20-life3-insects-exact-reveal-380x780`). At 1024x600 everything fits.

**Grade structure (Should 10).** `PATHS.disc.startBelow` correctly starts a 1st or 2nd grader on Nature Trail and a 4th grader on Science
Lab, and Discover has no placement (`noPlace`), so a child plays every stop from the start world. The bank's least-recently-shown rule
means a child meets every item of a stop before any repeats, which is good, but 51-95 items cover a 3-year band.

**Respect and accuracy about people and places.** Nothing insensitive was found. Places are named factually, civics avoids parties and
living people, helpers have gender-neutral titles, and "no holiday of one faith" is respected. The gap is absence: no people, cultures,
languages or histories of any place, and no Native nations in a section that teaches US geography. When those are added (Should 9),
describe cultures in the present tense, by their own names, from reliable sources, and avoid "costume" pictures.

### 2.7 Statistics (3,000 generated per level)

| Skill level | Items | Distinct in 3,000 | Pictures | Own hints | Right answer is longest choice | Topics |
|---|---|---|---|---|---|---|
| sci_life 1 | 95 | 95 | 18 | 19 | 26.7% | living 14, babies 16, covers 13, habitat 16, plants 14, needs 10, senses 12 |
| sci_earth 1 | 62 | 62 | 4 | 3 | 13.8% | weather 16, seasons 12, daynight 11, sunmoon 10, landwater 13 |
| sci_phys 1 | 51 | 51 | 4 | 2 | 27.3% | push 12, stuff 15, soundlight 12, solid 12 |
| geo_world 1 | 63 | 63 | 0 | 1 | 34.2% | mapwords 19, landforms 18, continents 17, oceans 9 |
| civ 1 | 65 | 65 | 0 | 2 | **45.0%** | helpers 14, rules 13, symbols 14, needswants 11, community 13 |
| sci_life 2 | 63 | 63 | 4 | 5 | 38.5% | lifecycle 10, foodchain 12, adapt 12, classify 13, plantfn 8, fossils 8 |
| sci_earth 2 | 66 | 66 | 0 | 1 | 30.0% | watercycle 11, rocks 10, erosion 10, resources 10, moonphase 11, planets 14 |
| sci_phys 2 | 72 | 72 | 0 | 16 | 33.5% | states 16, forces 15, machines 13, energy 14, circuits 14 |
| geo_us 1 | 166 | 166 | 0 | 0 | 7.9% | capitals 49, states 29, regions 41, borders 47 |
| geo_world 2 | 73 | 73 | 0 | 5 | 26.1% | grid 15, key 14, hemi 14, climate 14, features 16 |
| sci_life 3 | 62 | 62 | 0 | 5 | 26.1% | cells 13, ecosystem 15, photo 11, body 13, traits 10 |
| sci_earth 3 | 73 | 73 | 0 | 0 | 23.2% | plates 16, rockcycle 14, atmosphere 13, solarscale 15, rotrev 15 |
| sci_phys 3 | 73 | 73 | 0 | 2 | 29.1% | mixtures 13, change 15, gravity 13, transfer 15, waves 17 |
| geo_us 2 | 60 | 60 | 0 | 4 | 33.0% | landmarks 19, rivers 13, mountains 11, timezones 17 |
| civ 2 | 74 | 74 | 0 | 0 | **41.2%** | branches 17, constitution 15, rights 14, economy 14, supply 14 |

Right-answer position is even (about 25% per button wherever a level has 4 choices). Joke distractors (Should 8), by seed:
sci_life 1 seeds 15, 81 (candy and toys); sci_life 2 seed 70 (dreamed); sci_life 3 seeds 3 (only in winter), 13 (turn blue);
sci_earth 1 seed 81 (cheese); sci_earth 2 seed 23 (glows); sci_earth 3 seed 13 (turns to ice cream); sci_phys 1 seed 86 (glow);
sci_phys 2 seed 70 (tasty); geo_world 1 seed 20 (ice cream); geo_us 2 seeds 81, 20 (stuck); civ 1 seeds 38 (dragon, unicorn), 50, 29,
1, 8 (candy, ice cream); civ 2 seeds 5 (free candy, free car), 41 (candy, vacations).

### 2.8 Top 10 (for Andy)

1. Fix the wrong answer: frogs and insects, `sci_life` 3 seed 201 (S).
2. Fix the two-right religion item, `civ` 2 seed 40 (S).
3. Make Nature Trail playable for kindergarteners: read the choices and hints aloud, picture answers where possible (M).
4. Draw the grid for coordinate questions, then add a US map and a world map to the geography stops (M, then L).
5. Add a one-sentence explanation to every item, spoken after a miss and after a right answer (M to L).
6. Add diagrams to grade 3-6 science: water cycle, moon phases, food web, circuit, life cycle, plate boundaries, rock layers (L).
7. Rewrite wrong answers as real misconceptions (seasons by distance, phases by Earth's shadow) and remove the 20 joke choices and the
   longest-answer cue in civics (M).
8. Move from "what is it called" to phenomena, cause and effect, fair tests and data tables (L).
9. Fill the gaps: history from K, cultures and people, civics 3-4, world geography 5-6, and the missing NGSS topics (2.3) (L).
10. Fix the ambiguous and outdated items: Nevada and Utah regions, "Northern and Western", "voting at 18", Denali and the Gulf names,
    the Southern Ocean, the fossil and features hints (S).
