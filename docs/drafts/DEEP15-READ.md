# DEEP-15 read-through: new Discover and Spanish items (BEST-APP roadmap 15)

status: reviewed owner 2026-11-27

**What this is.** Every new question, answer, wrong choice, hint and word that roadmap item 15 drafted, with the reason for each. None of it
reaches a child yet. The audit and the plan behind it are in `docs/drafts/DEEP15.md`.

**How to approve.** Read the tables. Change anything you like in `src/data/d-deep15.js` (or ask Claude to). When you are happy, change the
status line above to `status: reviewed <your name> <YYYY-MM-DD>` and run `python3 tools/build.py`. That writes `DEEP15_ON = 1` into
`src/js/42d-deep15on.js`, and the items appear on the Discover and Spanish maps. With the line as it is, Discover and Spanish are exactly as
before.

**Rules every item follows.** No item teaches change over time in living things, and none uses magic or spells (CONTENT-01). Facts were
checked against the sources named in the Why column (NGSS, the C3 social-studies framework, NOAA and the National Weather Service, USGS,
NASA). A hint teaches a way to think and never names the answer or a word of it. The right answer is not the longest choice too often (under
40% of questions per stop, the civics rule of R-01d). Pictures are drawings the app already has, or emoji on the allow list. Every item is
read aloud with its choices, like Nature Trail, because grades 1 and 2 are still early readers.

**New words on screen (outside the questions).**

| Where | Words |
|---|---|
| Discover map, new world | Discovery Garden |
| Its stops | Seeds & Plants; Weather Watch; Rocks, Soil & Sand; Ramps & Wheels; Long Ago & Today; Goods & Jobs |
| Spanish map, new stops | Toys, Read Toys (end of La Casa); Nature, Read Nature (end of La Ciudad) |
| Spanish unit names (learn screen, report) | Toys & Play; Nature |
| While the new stops load (a second or less) | Getting the new stops ready... |

**Recordings.** REC-198 (the owner's budget decision of 2026-11-27, the audio budget 9.5 -> 12 MB): the Spanish words are recorded,
whatever the status line says, so they are ready when the items are turned on. `node tools/es-audio.js` recorded 135 files (1,140
characters): the 81 words below marked "needs one" (the shown form, "la fresa"), the bare word of the 18 new words of the spell units
(house, clothes, school), the 38 wrong-article forms the Spanish lessons read aloud for the new nouns ("el fresa", the D2 rule), less one
already recorded; "gris" moved from Leo to Eve with its unit (the color unit is an Eve unit), so its Leo file went. The Discover questions
are not recorded (not part of the decision); the tablet's voice reads them. The estimate made before the decision:

| Lines | Count | Characters | Bytes per character | Estimate |
|---|---|---|---|---|
| Spanish words (marked "needs one" below) | 81 | 709 | about 244 (short Spanish lines) | about 173 KB (0.17 MB) |
| Discover questions read aloud with their choices, and their hints (teacher voice) | 629 (203 items: each prompt with its choices, its hint, and each sort chip, match word and order tile) | 26,576 | about 144 | about 3.8 MB |

**Changes a flip makes beyond the items.** A 1st or 2nd grader's Discover map now opens on Discovery Garden (it was Nature Trail, which stays
open below it). In the Play app's free sample, such a child's free Discover world is then Discovery Garden. The bosses of Science Lab and
Star Observatory are drawn in turn by world position, so their boss characters change (their stars do not). The Discover card on Home counts
25 stops instead of 18.

## Discover: Discovery Garden, a new world for grades 1 and 2

World: **Discovery Garden**, after Nature Trail. Grade 1 and 2 children start here; it opens for a kindergartner once Nature Trail is done. Every item is read aloud with its choices (as in Nature Trail), and its hint is read aloud too. "Pictures" means the choices show drawings with the word under each.

### Seeds & Plants (`sci_plant` 1), Science, grades 1-2

| # | Question | Answer | Wrong choices | Hint (when not the topic hint) | Why |
|---|---|---|---|---|---|
| D1 | Most plants start out as a tiny ___. | seed | leaf; stem; fruit |  | Seeds grow into new plants (NGSS 1-LS1, 1-LS3). Wrong answers are other plant parts a child knows. |
| D2 | A seed is planted and watered. What grows out of it first? | a tiny root | a big flower; a ripe fruit; a pine cone |  | In a sprouting seed the root (radicle) comes out first, then the shoot. A common bean-in-a-cup observation. |
| D3 | A young plant that has just come up out of the soil is called a ___. | seedling | pebble; puddle; petal |  | Vocabulary of the plant life cycle. "Sprout" is also right, so it is not offered as a wrong answer. |
| D4 | What does a bean plant grow from? | a bean seed | a small rock; a raindrop; a feather |  | Plants grow from seeds of the same kind of plant (1-LS3-1, young plants are like their parents). |
| D5 | Many plants grow flowers. What can a flower make? | seeds | rocks; sand; rain |  | Flowers make seeds; this closes the life-cycle loop. |
| D6 | A seedling gets water and sunlight for many days. What happens? | it grows taller | it gets shorter; it turns into a seed; it stays the same size |  | Growth over time with water and light (K-LS1-1). |
| D7 | What do plants need to live and grow? | water and sunlight | darkness and ice; milk and juice; salt and sand |  | Plants need water and light to grow (2-LS2-1). Wrong answers are things children drink or know, never jokes. |
| D8 | A plant is kept in a dark closet for many days. What will happen to it? | it turns pale and weak | it grows stronger; it grows more flowers; it stays just the same |  | Plants kept in the dark grow pale, thin and weak (2-LS2-1 investigation). |
| D9 | A plant gets no water for a long time. What happens? | it wilts and droops | it grows taller; it makes more fruit; it gets new leaves |  | A plant without water wilts (2-LS2-1). |
| D10 | Water goes into a plant through its ___. | roots | petals; flowers; seeds |  | Roots take in water (1-LS1-1, plant parts and their jobs). |
| D11 | Plants need light. Where would a plant grow best? | by a sunny window | inside a dark box; inside a freezer; under a thick rug | Think about the places in a house where light comes in. | Light is a need of plants; a choice between places. |
| D12 | Two plants get the same water. One sits in the sun and one sits in a dark cupboard. Which grows better? | the one in the sun | the one in the cupboard; they grow the same; neither one grows |  | A fair test: only the light is different (2-LS2-1, planning an investigation). |
| D13 | Plants growing too close together have a hard time. What do they need more of? | space | noise; salt; ice |  | Crowded plants compete for room, water and light; space is the K-2 word. |
| D14 | Plants make their own food. What do they use to make it? | sunlight, air and water | soil, rocks and sand; milk, eggs and bread; snow, ice and wind |  | Plants make food from light, air (carbon dioxide) and water. The common mistaken idea, that plants eat soil, is a wrong answer. |
| D15 | When you eat a carrot, which part of the plant are you eating? | the root | the flower; the leaf; the seed |  | A carrot is a root (a taproot). |
| D16 | When you eat lettuce, which part of the plant are you eating? | the leaves | the roots; the seeds; the flowers |  | Lettuce is leaves. |
| D17 | When you eat a peanut, you are eating a plant's ___. | seed | root; leaf; flower |  | A peanut is the seed of the peanut plant (it grows underground in a pod). |
| D18 | An apple is the ___ of an apple tree. | fruit | root; leaf; stem |  | An apple is a fruit: the part that holds the seeds. |
| D19 | A pea pod holds the plant's ___. | seeds | roots; leaves; flowers |  | Peas are seeds; the pod is the fruit around them. |
| D20 | A dandelion seed has a fluffy top. What carries it far away? | the wind | a worm; a snail; a ladybug |  | Seeds spread by wind (2-LS2-2, animals and wind move seeds). |
| D21 | A burr is a seed with tiny hooks. How does it travel? | it sticks to animal fur | it floats on the wind; it rolls down hills; it swims in ponds |  | Hooked seeds ride on animal fur (2-LS2-2). |
| D22 | A coconut can float. How can a coconut seed get to a new island? | by floating on water | by flying on the wind; by rolling on roads; by sticking to fur |  | Coconuts are carried by the sea (seed dispersal by water). |
| D23 | A squirrel buries acorns and forgets some. What can a forgotten acorn do? | grow into an oak tree | turn into a stone; become a maple tree; grow into a berry bush |  | Animals that bury seeds help plants spread (2-LS2-2). An acorn is an oak seed. |
| D24 | Bees visit flowers. What do they carry from flower to flower that helps make seeds? | pollen | honey; water; sand |  | Bees move pollen between flowers (pollination, 2-LS2-2). |

| # | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|
| D25 | sort | Sort them: a plant or an animal? | **plant**: tree, flower, sunflower; **animal**: bee, frog, bird | Plants grow in one place and make their own food. Animals move around to find food. | Telling plants from animals (K-LS1-1). Every chip is drawn. |
| D26 | sort | Sort them: can it grow from a seed, or not? | **grows from a seed**: tree, sunflower, pumpkin; **does not**: rock, shell, coin | Living plants come from seeds. Things that were never alive do not. | Living plants grow from seeds; rocks, shells and coins do not. |
| D27 | match | Match each food to the plant part: carrot, lettuce and apple. | carrot = root; lettuce = leaf; apple = fruit | One grows under the ground, one is green and flat, and one holds seeds. | Plant parts we eat. |
| D28 | match | Match each seed to how it travels: dandelion, burr and coconut. | dandelion = wind; burr = animal fur; coconut = water | Fluffy seeds fly, hooked seeds hold on, and big round seeds can float. | Three ways seeds spread (2-LS2-2). |
| D29 | order | Put them in order: how does a bean plant grow? | seed → sprout → young plant → plant with beans | Start with what you put in the soil. | The plant life cycle in order. |
| D30 | sort | Sort the foods: is it a fruit or a root? | **fruit**: apple, grapes, banana; **root**: carrot, radish | Does it grow under the ground, or does it hold seeds? | Plant parts we eat: carrots and radishes are roots. |
| D31 | sort | Sort them: is it a seed, or not? | **seed**: acorn, peanut, bean; **not a seed**: rock, button | If you plant it and water it, will a new plant come up? | Telling seeds from things that are not seeds. |
| D32 | match | Match each plant part to its job: roots, leaves and flower. | roots = take in water; leaves = make food; flower = makes seeds | One is under the ground, one faces the sun, and one is colorful. | Plant parts and their jobs (1-LS1-1). |
| D33 | order | Put them in order: how does an apple tree make apples? | flower → small green fruit → ripe apple | In spring the tree is covered in white and pink. | Apple blossoms become fruit, which ripens. |

### Weather Watch (`sci_wx` 1), Science, grades 1-2

| # | Question | Answer | Wrong choices | Hint (when not the topic hint) | Why |
|---|---|---|---|---|---|
| D34 | Which tool tells you how hot or cold it is outside? | a thermometer | a ruler; a clock; a measuring cup |  | Measuring temperature (K-ESS2-1, describe weather with tools). |
| D35 | The red line in a thermometer goes up. What does that mean? | it is getting warmer | it is getting colder; it is getting darker; it is getting windier |  | The liquid in a thermometer rises as it warms. |
| D36 | A rain gauge is a tool that measures ___. | how much rain fell | how hot it is; how fast the wind blows; how tall the clouds are |  | Weather tools and what they measure. |
| D37 | A windsock is flapping straight out. What does that tell you? | it is windy | it is raining; it is hot; it is snowing |  | A windsock shows wind. |
| D38 | A forecast tells us ___. | what the weather will probably be | what day of the week it is; how many hours are in a day; what time the school bus will come | Think about the person on TV or the radio who talks about tomorrow's sky. | What a forecast is (K-ESS3-2). |
| D39 | The forecast says it will rain all day. What should you take outside? | an umbrella | a sled; a beach ball |  | Using a forecast to prepare (K-ESS3-2). Picture answers. |
| D40 | The forecast says it will be very cold and snowy. What should you wear? | a warm coat and mittens | shorts, a T-shirt and sandals; a swimsuit; a sun hat |  | Using a forecast to prepare. |
| D41 | You hear thunder outside. What should you do? | go inside a building | stand under a tall tree; go for a swim; fly a kite |  | Lightning safety: "When thunder roars, go indoors" (US National Weather Service). |
| D42 | Why is it not safe to stand under a tall tree in a thunderstorm? | lightning can hit tall things | trees make thunder; leaves are slippery; tall trees pull in all the rain |  | Lightning tends to strike tall objects (National Weather Service). |
| D43 | A tornado warning comes on the radio. Where is the safest place to go? | the lowest floor, away from windows | next to a big glass window; up on the highest floor of the house; outside in the open yard |  | Tornado safety: a small room on the lowest floor, away from windows (National Weather Service). |
| D44 | A tornado is a ___. | spinning funnel of wind | very large, heavy snowflake; kind of rainbow; thick morning fog |  | Severe weather vocabulary (K-ESS3-2). |
| D45 | A hurricane is a giant storm that forms over ___. | warm ocean water | cold mountain tops; dry deserts; frozen lakes |  | Hurricanes form over warm ocean water (NOAA). |
| D46 | What happens to a puddle on a hot, sunny day? | it dries up | it gets deeper; it freezes; it turns into snow |  | Sunlight warms water and it evaporates (K-PS3-1). |
| D47 | You stand in bright sun, then you step under a big leafy tree. Where do you feel cooler? | in the shade | in the sun; both feel the same |  | Shade blocks sunlight, so it is cooler (K-PS3-1, K-PS3-2). |
| D48 | Sunlight shines on a rock all afternoon. How does the rock feel? | warm | icy cold; wet; soft |  | Sunlight warms Earth's surface (K-PS3-1). |
| D49 | Which season usually has the most hours of daylight? | summer | winter; fall; spring |  | Days are longest in summer (1-ESS1-2). True in both halves of the world, since each has its summer when its days are longest. |
| D50 | In winter, the sun usually sets ___ than in summer. | earlier | later; at the same time |  | Shorter days in winter (1-ESS1-2). "Usually" because near the equator the change is small. |
| D51 | What happens in the sky every single day? | the sun rises and sets | a rainbow; a tornado; snow falling from clouds |  | The sun rising and setting is a pattern (1-ESS1-1). |
| D52 | The Moon seems to change shape. About how long does it take to show all its shapes? | a month | a day; an hour; a hundred years |  | The Moon goes through its phases in about 29 and a half days (NASA). |
| D53 | Where does the sun come up in the morning? | in the east | in the west; in the north; in the south |  | The sun rises in the east (1-ESS1-1). |
| D54 | A thunderstorm is coming. What do the clouds look like? | tall and dark | small, white and puffy; thin and wispy; there are no clouds |  | Thunderstorm clouds (cumulonimbus) are tall and dark. |
| D55 | Hail is ___. | balls of ice from storm clouds | warm drops of rain; tiny bits of sand; soft flakes of snow from winter clouds |  | Hail is ice that forms in thunderstorm clouds (NOAA). |
| D56 | A person whose job is to study the weather is a ___. | meteorologist | dentist; photographer; plumber |  | Who makes forecasts. |

| # | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|
| D57 | sort | Sort the weather: fine for playing outside, or time to go inside? | **play outside**: sunny day, cloudy day, light breeze; **go inside**: thunder, lightning, tornado | Thunder, lightning and strong winds mean danger. Go where it is safe. | Weather safety (K-ESS3-2). |
| D58 | sort | Sort them: is it a weather tool, or not? | **weather tool**: thermometer, rain gauge, windsock; **not a weather tool**: spoon, pencil | A weather tool tells you about the air, the rain or the wind. | Weather tools. |
| D59 | match | Match each tool to what it tells you: thermometer, rain gauge and windsock. | thermometer = how hot or cold; rain gauge = how much rain; windsock = which way the wind blows | One has a red line, one catches drops, and one flaps in the air. | Weather tools and what they measure. |
| D60 | match | Match the forecast to what you bring: rain, snow and hot sun. | rain = umbrella; snow = sled; hot sun = water bottle | Think of what keeps you dry, what you ride on, and what keeps you from getting thirsty. | Using a forecast to prepare (K-ESS3-2). |
| D61 | order | Put the seasons in order, starting with winter. | winter → spring → summer → fall | After the cold time, flowers start to bloom. | The seasons as a pattern (1-ESS1-2). |
| D62 | sort | Sort the clothes: for a hot day or a cold day? | **hot day**: shorts, sun hat, sandals; **cold day**: mittens, warm coat, scarf | Which ones keep you cool, and which ones keep you warm? | Dressing for the weather. |
| D63 | sort | Sort them: seen in the day sky, at night, or both? | **day**: sun, rainbow; **night**: stars; **both**: moon, clouds | The Moon can be up in the daytime too. | Patterns in the sky (1-ESS1-1). The Moon is seen in the day too, so it is in both. |
| D64 | match | Match each weather word to what it means: hail, fog and drizzle. | hail = balls of ice; fog = a cloud near the ground; drizzle = very light rain | One is hard, one is hard to see through, and one is gentle. | Weather words. Fog is a cloud at ground level (NOAA). |
| D65 | order | Put the days in order, from coldest to hottest. | snowy day → cool fall day → hot summer day | Which day would the thermometer show lowest? | Ordering by temperature. |

### Rocks, Soil & Sand (`sci_rock` 1), Science, grades 1-2

| # | Question | Answer | Wrong choices | Hint (when not the topic hint) | Why |
|---|---|---|---|---|---|
| D66 | Sand is made of tiny pieces of ___. | rock | sugar; salt; wood |  | Sand is mostly tiny bits of rock and minerals (USGS), with some bits of shell. |
| D67 | Which one is the hardest? | a pebble | a sponge; a banana; a cookie |  | Describing materials by how hard they are (2-PS1-1). Picture answers. |
| D68 | A very big rock is called a ___. | boulder | pebble; grain; crumb |  | Rock size words. |
| D69 | A small, smooth, round rock from a river is a ___. | pebble | boulder; mountain; cliff |  | Rock size words. |
| D70 | Why are rocks in a river often smooth and round? | moving water rubs them for a long time | the sun melts their edges; they are made smooth in a factory; they grow that way |  | Water wears rocks smooth slowly (2-ESS1-1, slow changes). |
| D71 | What is soil good for? | growing plants | making ice cubes; washing dishes; cooking soup |  | Soil holds water and helps plants grow. |
| D72 | Which animal makes soil better by digging tunnels in it? | an earthworm | a goldfish; a hungry parrot; a butterfly |  | Earthworms loosen and mix soil, letting in air and water. |
| D73 | Which kind of soil is sticky and can be shaped like dough when it is wet? | clay | sand; gravel; pebbles |  | Properties of soils (2-PS1-1). |
| D74 | You pour water on dry sand. What happens? | it soaks in quickly | it sits on top in a puddle; it turns into ice; it turns the sand into rock |  | Water drains fast through sand. |
| D75 | Fossils are often found inside ___. | rock | clouds; rain; air |  | Fossils are the remains of plants and animals kept in rock (as the app already teaches; no change over time is taught here). |
| D76 | Which of these is NOT made of rock? | a wooden bench | a mountain; a pebble; a big stone wall |  | Telling rock from other materials. |
| D77 | Which material would make the best window? | glass | wood; cloth; metal |  | Choosing a material by its properties: you can see through glass (2-PS1-2). |
| D78 | Which material is best for a warm winter hat? | wool | glass; paper; metal |  | Choosing a material for a job (2-PS1-2). |
| D79 | Which would keep you dry in the rain? | a plastic raincoat | a paper bag; a cotton towel; a thick wool sweater |  | Waterproof materials (2-PS1-2). |
| D80 | Which would make the strongest walls for a house? | bricks | paper; cloth; cardboard |  | Strong materials (2-PS1-2). |
| D81 | Which material bends and stretches easily? | rubber | stone; glass; brick |  | Flexible materials (2-PS1-1). |
| D82 | Most of the water on Earth is in the ___. | oceans | lakes; rivers; clouds | Picture a globe. What covers most of it, and is it fresh or salty? | About 97 percent of Earth's water is in the oceans (USGS; 2-ESS2-3). |
| D83 | An earthquake shakes the ground for a few seconds. That is a ___ change to the land. | quick | slow; tiny |  | Some Earth changes happen quickly (2-ESS1-1). |
| D84 | A river slowly carves a deep canyon. How long does that take? | a very long time | one afternoon; one week; one year | Water wears away rock only a tiny bit each year. So is a deep canyon quick to make? | Canyons form slowly (2-ESS1-1). The wording says "a very long time" and gives no number of years. |
| D85 | Wind blows sand against a rock for many years. What happens to the rock? | it slowly wears away | it grows bigger; it turns into wood; it starts to melt |  | Wind wears rock away slowly (2-ESS1-1). |
| D86 | How can a farmer stop wind from blowing away soil? | plant rows of trees | cut down every tree; dig up the grass; leave the ground bare |  | Windbreaks slow wind and protect soil (2-ESS2-1, ways to slow wind and water changing the land). |
| D87 | Rain is washing a hill of dirt away. What can help hold the dirt in place? | planting grass | digging more holes; pulling up the plants; spraying more water |  | Plant roots hold soil (2-ESS2-1). |

| # | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|
| D88 | sort | Sort them: made of rock, or not? | **rock**: pebble, boulder, sand; **not rock**: leaf, feather, apple | Rock is hard and comes from the ground. Some bits of it are very tiny. | Rock in its different sizes (2-PS1-1). |
| D89 | sort | Sort the changes to the land: fast or slow? | **fast**: an earthquake, a landslide, a volcano erupting; **slow**: a river carving a canyon, wind wearing down a rock | Did it happen in a few minutes, or over a very long time? | Fast and slow Earth changes (2-ESS1-1). |
| D90 | match | Match each material to its best use: glass, wool and brick. | glass = window; wool = warm hat; brick = strong wall | One you can see through, one is soft and warm, and one is strong and hard. | Choosing materials (2-PS1-2). |
| D91 | match | Match each word to what it means: boulder, pebble and sand. | boulder = very big rock; pebble = small smooth rock; sand = tiny bits of rock | They are all rock. Think about how big each one is. | Rock size words. |
| D92 | order | Put them in order, from biggest to smallest. | boulder → rock → pebble → sand | Start with the one too big to lift. | Ordering by size. |
| D93 | sort | Sort the materials: can you see through it, or not? | **see through**: glass, clear plastic, water; **cannot see through**: wood, brick | Hold it up to a window. Does the light come through? | Describing materials (2-PS1-1). |
| D94 | sort | Sort them: does it bend easily, or is it stiff? | **bends**: rubber band, paper, cloth; **stiff**: brick, rock | Try to fold it in your hands. | Describing materials (2-PS1-1). |
| D95 | match | Match each soil to what it is like: sand, clay and topsoil. | sand = gritty and loose; clay = sticky when wet; topsoil = dark and good for plants | Rub each one between your fingers. | Kinds of soil. |
| D96 | order | Put the changes in order, from fastest to slowest. | an earthquake → a flood → a canyon forming | One is over in seconds. | Fast and slow Earth changes (2-ESS1-1): seconds, hours or days, a very long time. |

### Ramps & Wheels (`sci_mach` 1), Science, grades 1-2

| # | Question | Answer | Wrong choices | Hint (when not the topic hint) | Why |
|---|---|---|---|---|---|
| D97 | Which simple machine is a slanted surface that helps move things up? | a ramp | a wheel; a pulley; a screw |  | The inclined plane, the simplest machine. |
| D98 | It is easier to push a heavy box up a ___ than to lift it straight up. | ramp | wall; fence; window |  | A ramp lets you use less force over a longer path. |
| D99 | A wheel turns on a rod. What is the rod called? | an axle | an anchor; an elbow; a ladder |  | Wheel and axle. |
| D100 | A seesaw is a kind of ___. | lever | pulley; wheel; wedge |  | A seesaw is a lever with the pivot in the middle. |
| D101 | A rope on a flagpole goes over a small wheel at the top. That wheel is a ___. | pulley | ramp; wedge; screw |  | A pulley changes the direction of a pull. |
| D102 | An ax splits wood. Its sharp blade is a ___. | wedge | wheel; pulley; screw |  | A wedge pushes things apart. |
| D103 | Which simple machine is like a ramp wrapped around a pole? | a screw | a wedge; a pulley; a seesaw |  | A screw is an inclined plane wound around a post. |
| D104 | Wagons and bikes are easy to move because they have ___. | wheels | wings; feathers; pockets |  | Wheels make moving loads easier. |
| D105 | A doorknob is a kind of ___. | wheel and axle | ramp; pulley; wedge |  | A doorknob turns a rod: a wheel and axle. |
| D106 | A slide at the playground is shaped like a ___. | ramp | pulley; wheel; wedge |  | Everyday inclined planes. |
| D107 | A shovel helps you lift dirt. It works like a ___. | lever | pulley; wheel; screw |  | A shovel is a lever. |
| D108 | A doorstop is pushed under a door to hold it open. A doorstop is a ___. | wedge | wheel; pulley; screw |  | A doorstop is a wedge. |
| D109 | A jar lid twists on and off. The ridges on the lid work like a ___. | screw | wheel; pulley; lever |  | Screw threads hold the lid. |
| D110 | Simple machines help us by making work ___. | easier | harder; louder; messier | Would you use a tool that makes a job harder? Think about why people use ramps and wheels. | What machines are for. |
| D111 | You push a toy car softly, then hard. When does it go farther? | after the hard push | after the soft push; they go the same distance |  | A bigger push makes a bigger change in motion (K-PS2-1). |
| D112 | A ball rolls toward you and you push it back. What happens? | it goes back the other way | it keeps rolling toward you; it rolls faster toward you |  | A push can change which way something moves (K-PS2-1). |
| D113 | Pulling a sled on snow is easier than on grass. Why? | snow is smooth and slippery | snow is bumpy; snow is sticky; grass is smooth |  | Smooth surfaces have less friction. |
| D114 | A shopping cart full of food is harder to push than an empty one. Why? | it is heavier | it is shinier; it is louder; it is newer |  | Heavier things need a bigger push (K-PS2-1). |
| D115 | Which takes the smallest push to move? | a toy car with wheels | a heavy brick; a big box of books; a stack of plates |  | Wheels make things easier to move. |
| D116 | A magnet pulls on which one? | a steel paper clip | a crayon; a wooden block; a plastic spoon |  | Magnets pull on iron and steel (2nd-3rd grade, 3-PS2-3 start). |
| D117 | What makes a swing go higher? | a bigger push | a smaller push; no push at all |  | Stronger push, bigger motion (K-PS2-1). |
| D118 | Two ramps go up to the same step: a long, gentle ramp and a short, steep ramp. Which one is easier to push a wagon up? | the longer one | the shorter one; both are the same |  | A longer, gentler ramp needs less force. |

| # | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|
| D119 | sort | Sort them: does it have wheels, or not? | **wheels**: bike, car, bus; **no wheels**: boat, sled | Look for round parts that roll along the ground. | Wheels in everyday life. Every chip is drawn. |
| D120 | sort | Sort them: does it roll or slide when you push it? | **rolls**: ball, marble, wheel; **slides**: book, box, sled | Round things roll. Flat things slide. | Shape changes how things move. |
| D121 | match | Match each simple machine to an example: ramp, pulley and wedge. | ramp = playground slide; pulley = flagpole rope; wedge = doorstop | One you slide down, one lifts a flag, and one holds a door. | Simple machines around us. |
| D122 | match | Match each simple machine to an example: lever, screw and wheel and axle. | lever = seesaw; screw = jar lid; wheel and axle = doorknob | One goes up and down, one twists, and one turns to open a door. | Simple machines around us. |
| D123 | order | Put the carts in order, from easiest to hardest to push. | an empty cart → a cart with two books → a cart full of rocks | The more it holds, the heavier it is. | Heavier needs a bigger push (K-PS2-1). |
| D124 | sort | Sort them: a push or a pull? | **push**: kick a ball, press a button; **pull**: open a drawer, tug a rope, pick an apple | A push moves something away from you. A pull brings it closer. | Pushes and pulls (K-PS2-1). |
| D125 | sort | Sort them: a lever, or a wheel and axle? | **lever**: seesaw, shovel; **wheel and axle**: doorknob, wagon wheel, bike wheel | One kind tips up and down. The other kind turns round and round. | Two simple machines. |
| D126 | match | Match each job to the simple machine that helps: lift a flag, split wood and roll a heavy load. | lift a flag = pulley; split wood = wedge; roll a heavy load = wheel and axle | Think of a rope, a blade and something round. | Simple machines and their jobs. |
| D127 | order | Put the ramps in order, from easiest to hardest to push a cart up. | a long gentle ramp → a medium ramp → a short steep ramp | The gentler the slope, the smaller the push. | Ramps and force. |

### Long Ago & Today (`civ_past` 1), Social studies, grades 1-2

| # | Question | Answer | Wrong choices | Hint (when not the topic hint) | Why |
|---|---|---|---|---|---|
| D128 | Long ago, before electric lights, people lit their homes with ___. | candles | flashlights; light bulbs; televisions |  | Life before electricity (C3 D2.His.2.K-2, compare life in the past and today). |
| D129 | Long ago, before cars, many people traveled on land by ___. | horse and wagon | airplane; bus; motorcycle |  | Transport long ago. |
| D130 | Long ago, people sent messages far away by writing ___. | letters | emails; text messages; video calls |  | Communication long ago. |
| D131 | Long ago, people kept food cold in an icebox. Today we use a ___. | refrigerator | toaster; oven; dishwasher |  | Then and now in the kitchen. |
| D132 | Long ago, many children went to a school with ___. | one room for all grades | a computer for every child; a big gym and a lunchroom; a tablet on every desk |  | One-room schoolhouses were common in rural America in the 1800s. |
| D133 | Long ago, people washed clothes by hand on a ___. | washboard | washing machine; dishwasher; vacuum |  | Chores long ago. |
| D134 | Which of these is from long ago? | a horse-drawn wagon | a tablet computer; a cell phone; a video game |  | Telling old things from new ones. |
| D135 | Which one did people NOT have long ago? | cell phones | candles; horses; books | Candles, horses and books are very old. Which one needs a battery and a signal? | Telling old things from new ones. Candles, horses and books were all around long ago. |
| D136 | Long ago, people cooked over a fire. Today many people cook in a ___. | microwave oven | washboard; candle; icebox |  | Then and now. The wrong answers are long-ago things. |
| D137 | Long ago, people used a spinning wheel to make ___. | yarn | bread; soap; paper |  | A spinning wheel twists wool or cotton into yarn and thread. |
| D138 | Long ago, there were no big supermarkets. Many families got food by ___. | growing it on a farm | ordering it on a computer; driving to a big store; using a vending machine |  | Farm life long ago. |
| D139 | What did children play long ago that children still play today? | tag | tablet games; phone games; online games |  | Some things stay the same over time (D2.His.2.K-2). |
| D140 | Which is true about life long ago and today? | some things changed and some stayed the same | nothing has ever changed at all; everything changes every single day; people long ago had phones too |  | Continuity and change (D2.His.2.K-2). |
| D141 | Which word means the time that already happened? | past | present; future |  | Past, present and future (D2.His.1.K-2). |
| D142 | Which word means the time that has not happened yet? | future | past; present |  | Past, present and future. |
| D143 | The time that is happening right now is called the ___. | present | past; future |  | Past, present and future. |
| D144 | A timeline puts events in order by ___. | when they happened | how big they are; what color they are; how much they cost | Look at the first and last things on a timeline. Which one came earlier? | What a timeline shows (D2.His.1.K-2). |
| D145 | A calendar helps us keep track of ___. | days, weeks and months | how tall we are; how hot it is; how far away a town is |  | Measuring time. |
| D146 | How many days are in one week? | seven | five; ten; twelve |  | Measuring time. |
| D147 | Many photos from long ago are in ___. | black and white | bright neon colors; moving video |  | Early photographs were black and white. |
| D148 | Which of these can show the history of your family? | old photos and letters | a weather report; a grocery list; a bus schedule |  | Primary sources for family history (D2.His.3.K-2). |
| D149 | A museum is a place where we can see ___. | things from long ago | only brand-new toys for sale; today's lunch menu; cars being fixed |  | Where history is kept. |

| # | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|
| D150 | sort | Sort them: used long ago, or new today? | **long ago**: candle, horse and wagon, washboard; **new today**: cell phone, tablet, video game | Was it around before electricity, or does it need a battery or a plug? | Then and now (D2.His.2.K-2). |
| D151 | sort | Sort the words: past or future? | **past**: yesterday, last year; **future**: tomorrow, next week, next year | Did it already happen, or is it still coming? | Time words (D2.His.1.K-2). |
| D152 | match | Match long ago to today: icebox, horse and wagon, and letter. | icebox = refrigerator; horse and wagon = car; letter = email | Think of what does the same job today. | Then and now. |
| D153 | match | Match each word to its time: yesterday, today and tomorrow. | yesterday = past; today = present; tomorrow = future | One already happened, one is now, and one is coming. | Past, present and future. |
| D154 | order | Put them in order, from oldest to youngest. | grandma → mom → baby | Think about who was born first in the family. | Generations in order (family history). |
| D155 | sort | Sort the lights: from long ago, or from today? | **long ago**: candle, oil lamp; **today**: light bulb, flashlight, lamp with a switch | Does it need a flame, or electricity? | Then and now (D2.His.2.K-2). |
| D156 | sort | Sort the ways to travel: from long ago, or newer? | **long ago**: horse, wagon, sailing ship; **newer**: airplane, car | Which ones need an engine? | Then and now: the first cars came about 140 years ago and the first airplane about 120 years ago. |
| D157 | match | Match each old thing to what does its job today: washboard, candle and quill pen. | washboard = washing machine; candle = light bulb; quill pen = ballpoint pen | Think of washing, lighting and writing. | Then and now. |
| D158 | order | Put them in order, from long ago to today. | horse and wagon → the first cars → cars of today | Before engines, animals pulled people along. | Change over time in how people travel (history, not living things). |

### Goods & Jobs (`civ_work` 1), Social studies, grades 1-2

| # | Question | Answer | Wrong choices | Hint (when not the topic hint) | Why |
|---|---|---|---|---|---|
| D159 | Things people make or grow to sell, like bread and shoes, are called ___. | goods | services; rules; chores |  | Goods and services (C3 D2.Eco.1.K-2). |
| D160 | Jobs people do to help others, like fixing teeth or cutting hair, are called ___. | services | goods; tools; toys |  | Goods and services. |
| D161 | Which of these is a good you can buy? | a loaf of bread | a haircut; a checkup at the doctor; a bus ride |  | Telling goods from services. |
| D162 | Which of these is a service someone does for you? | a haircut | a toy car; a pair of shoes; an apple |  | Telling goods from services. |
| D163 | A mail carrier brings letters to your home. That job is a ___. | service | good; tool; toy |  | Telling goods from services. |
| D164 | A farmer who grows apples to sell is a ___. | producer | consumer; shopper |  | Producers and consumers (D2.Eco.2.K-2). |
| D165 | A person who buys and uses goods is called a ___. | consumer | producer; factory; store |  | Producers and consumers. |
| D166 | What does a factory do? | makes goods | puts out fires; teaches children; brings the mail |  | Where goods are made. |
| D167 | A farmer grows wheat. A baker uses the wheat to make ___. | bread | shoes; bricks; glass |  | People depend on each other to make goods. |
| D168 | Who fixes leaky pipes and sinks? | a plumber | a pilot; a librarian; a chef |  | Jobs in the community (new jobs; Our Community already asks about firefighters, doctors and bakers). |
| D169 | Who flies an airplane? | a pilot | a plumber; a chef; a mechanic |  | Jobs in the community. |
| D170 | Who cooks meals in a restaurant? | a chef | a pilot; a plumber; a mechanic |  | Jobs in the community. |
| D171 | Who fixes cars when they break? | a mechanic | a chef; a pilot; a librarian |  | Jobs in the community. |
| D172 | Who builds things out of wood, like tables and shelves? | a carpenter | a pilot; a chef; a dentist |  | Jobs in the community. |
| D173 | Most grown-ups work at jobs to ___. | earn money | lose money; get taller; stay asleep |  | Why people work (D2.Eco.1.K-2). |
| D174 | You want a bike, but it costs more than you have. What can you do? | save your money | throw your money away; hide it and forget it; spend it all today |  | Saving for a goal. |
| D175 | A place that keeps money safe is a ___. | bank | bakery; library; park |  | What a bank does. |
| D176 | Giving something to get something else back is called ___. | trading | sleeping; reading; running |  | Trade (D2.Eco.3.K-2). |
| D177 | The amount of money something costs is its ___. | price | color; size; name |  | Price. |
| D178 | Coins and paper bills are kinds of ___. | money | food; toys; stamps |  | What money is. |
| D179 | Where do people go to buy food? | a grocery store | a fire station; a library; a post office |  | Places in the community where goods are sold. |

| # | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|
| D180 | sort | Sort them: a good or a service? | **good**: bread, shoes, toy car; **service**: haircut, teeth cleaning | Can you hold it in your hands, or is it a job someone does for you? | Goods and services (D2.Eco.1.K-2). |
| D181 | sort | Sort them: grown on a farm, or made in a factory? | **farm**: apples, eggs, corn; **factory**: cars, crayons | Plants and animals live on farms. Machines make things in factories. | Where goods come from. |
| D182 | match | Match each worker to a tool: chef, plumber and carpenter. | chef = pot; plumber = wrench; carpenter = saw | One cooks, one fixes pipes, and one cuts wood. | Workers and their tools. |
| D183 | match | Match each place to what it does: bank, factory and store. | bank = keeps money safe; factory = makes goods; store = sells goods | One keeps money, one makes things, and one sells things. | Places in an economy. |
| D184 | order | Put the steps in order: how does bread get to you? | farmer grows wheat → baker bakes bread → store sells bread → you buy bread | It starts as a plant in a field. | From producer to consumer. |
| D185 | sort | Sort the workers: do they make goods or give services? | **goods**: baker, farmer, toy maker; **services**: barber, teacher, mail carrier | Does the worker make a thing you can hold, or do a job for you? | Producers of goods and of services (D2.Eco.1.K-2). |
| D186 | sort | Sort them: is it money, or not? | **money**: coin, dollar bill; **not money**: button, sticker, leaf | Could you pay for something at a store with it? | What money is. |
| D187 | match | Match each worker to what they do: pilot, mechanic and chef. | pilot = flies planes; mechanic = fixes cars; chef = cooks food | Think of a plane, a car and a kitchen. | Jobs in the community. |
| D188 | order | Put the steps in order: how do you buy something at a store? | choose what you want → pay the price → take it home | You cannot take it home before you pay. | Buying goods. |

### Topic hints of the new stops (read aloud; never name an answer)

| Topic | Hint |
|---|---|
| grow | Think about planting something small in a cup of soil and looking at it day after day. What happens first, and what comes later? |
| pneeds | Think about a plant on a sunny windowsill that someone waters. What does it get there every day? |
| eat | Picture the whole plant from the bottom to the top. Which part of it is this food? |
| spread | A seed cannot walk. Think about what could carry it far away from the plant it grew on. |
| wtool | Think about what each tool tells you: hot or cold, wet or dry, or which way the air is moving. |
| wsafe | Think about how to stay safe and far from danger until a storm is over. |
| wsky | Think about the sky over many days and nights. What happens again and again? |
| wsun | Think about standing in bright sunshine, and then standing where a tree blocks the light. How does each one feel? |
| wfore | A forecast tells what the weather will probably be. Think about what you would wear or carry that day. |
| rocks | Imagine holding it in your hand. Is it hard or soft, big or small, smooth or rough? |
| soil | Think about digging in a garden. What do you find in the dirt, and what lives in it? |
| mater | Think about the job the thing has to do. Which material could do that job well? |
| change | Some changes to the land happen in a few minutes. Others take a very long time. Which kind is this? |
| mach | A simple machine makes work easier. Think about what the tool helps you lift, move, split, hold or turn. |
| move | Think about how strong the force is, how much the thing weighs, and where it ends up. |
| longago | Think about how people lived long ago, before electric lights, cars and phones. What did they use instead? |
| timeline | Think of time as a line: what already happened, what is happening now, and what has not happened yet. |
| history | History is the story of the past. Which one could show how people lived before? |
| goods | Some things you can hold in your hands. Other times a worker does a job for you. Which is this? |
| jobs | Think about what this worker does all day, and the tools they use to do it. |
| money | Think about what grown-ups do with what they are paid, and where they go to buy and keep things. |

## Discover: Nature Trail (K-2) top-up

A round draws match items 15% and order items 10% of the time, but each Nature Trail stop has only 2 match items and 1 order item, so they come back within a round. These double them. Read aloud like the rest of Nature Trail.

| # | Stop | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|---|
| D189 | sci_life 1 | match | Match each baby to its grown-up: puppy, kitten and calf. | puppy = dog; kitten = cat; calf = cow | Think of who each baby's mom is. | Baby animals (K-LS1). |
| D190 | sci_life 1 | match | Match each animal to what covers it: bird, fish and bear. | bird = feathers; fish = scales; bear = fur | Think about touching each animal. | Body coverings. |
| D191 | sci_life 1 | order | Put them in order: how does a frog grow up? | egg → tadpole → frog | It starts in the water, very small. | A frog's life cycle (egg, tadpole, frog). |
| D192 | sci_earth 1 | match | Match each season to what you might see: winter, spring and fall. | winter = snow; spring = new flowers; fall = falling leaves | Think about the trees and the ground outside. | Seasons, as Sky & Earth already teaches them. |
| D193 | sci_earth 1 | match | Match each word to what it means: lake, river and beach. | lake = water with land all around; river = water that flows; beach = sand by the water | Think about where the water is, and if it moves. | Land and water words. |
| D194 | sci_earth 1 | order | Put the seasons in order, starting with spring. | spring → summer → fall → winter | After the flowers bloom, it gets hot. | The seasons as a pattern. |
| D195 | sci_phys 1 | match | Match each one to what it is: ice, water and steam. | ice = solid; water = liquid; steam = gas | Which keeps its shape, which pours, and which floats into the air? | Solid, liquid and gas. |
| D196 | sci_phys 1 | match | Match each one to how it moves: ball, sled and swing. | ball = rolls; sled = slides; swing = goes back and forth | Think about pushing each one. | Kinds of motion. |
| D197 | sci_phys 1 | order | Put them in order, from quietest to loudest. | a whisper → talking → a shout | Which one could you hardly hear? | Loud and soft sounds. |
| D198 | geo_world 1 | match | Match each word to what it means: island, mountain and desert. | island = land with water all around; mountain = very high land; desert = very dry land | Think about water, height and rain. | Landforms. |
| D199 | geo_world 1 | match | Match each direction to its letter on a compass rose. | north = N; south = S; east = E; west = W | Each letter is the first letter of its word. | Cardinal directions. |
| D200 | geo_world 1 | order | Put them in order, from smallest to biggest. | town → state → country → continent | A town is inside a state. | Nested places: my town is in my state, in my country, on my continent. |
| D201 | civ 1 | match | Match each helper to where they work: teacher, doctor and firefighter. | teacher = school; doctor = hospital; firefighter = fire station | Think of the building each one goes to every day. | Community helpers and places. |
| D202 | civ 1 | match | Match each symbol to what it is: bald eagle, flag and Liberty Bell. | bald eagle = national bird; flag = stars and stripes; Liberty Bell = bell with a crack | One flies, one waves, and one rings. | US symbols. The Liberty Bell does have a famous crack. |
| D203 | civ 1 | order | Put the steps in order to cross a street safely. | stop at the curb → look left and right → cross when it is clear | What do you do before you step off the curb? | Safety rules. |

## Spanish: new words in existing units

Format as every unit: the article, the word, the English, the picture. "Recording" is the line the app says ("la jirafa"): **needs one** means the tablet's own voice says it until it is recorded.

| # | Unit | Spanish | English | Picture | Recording | Why (per unit) |
|---|---|---|---|---|---|---|
| S1 | animal | el elefante | elephant | 🐘 (drawing: elephant) | needs one | Animals children know from the Discover stops and picture books; every one already has a drawing or an allowed emoji. |
| S2 | animal | la jirafa | giraffe | 🦒 (drawing: giraffe) | needs one |  |
| S3 | animal | la tortuga | turtle | 🐢 (drawing: turtle) | needs one |  |
| S4 | animal | la oveja | sheep | 🐑 (drawing: sheep) | needs one |  |
| S5 | animal | la gallina | hen | 🐔 (drawing: hen) | needs one |  |
| S6 | animal | el ratón | mouse | 🐭 (drawing: mouse) | needs one |  |
| S7 | animal | la mariposa | butterfly | 🦋 (drawing: butterfly) | needs one |  |
| S8 | animal | la ballena | whale | 🐳 (drawing: whale) | needs one |  |
| S9 | food | la fresa | strawberry | 🍓 (drawing: strawberry) | needs one | Common foods (Mexican Spanish, like the rest of the app: el cacahuate, not el maní). El maíz is understood everywhere; Mexico also says el elote for corn on the cob. |
| S10 | food | la sandía | watermelon | 🍉 | needs one |  |
| S11 | food | la zanahoria | carrot | 🥕 | needs one |  |
| S12 | food | el maíz | corn | 🌽 | needs one |  |
| S13 | food | la pizza | pizza | 🍕 (drawing: pizza) | needs one |  |
| S14 | food | el pastel | cake | 🎂 (drawing: cake) | needs one |  |
| S15 | food | el arroz | rice | 🍚 | needs one |  |
| S16 | food | el cacahuate | peanut | 🥜 | needs one |  |
| S17 | body | la cara | face | 🙂 | needs one | More body words with clear pictures. El corazón shows the heart symbol, as picture books do. |
| S18 | body | el brazo | arm | 💪 | needs one |  |
| S19 | body | el corazón | heart | ❤ | needs one |  |
| S20 | body | el hueso | bone | 🦴 (drawing: bone) | needs one |  |
| S21 | family | la familia | family | 👪 | needs one | La familia, the word for the whole group (the family emoji). |
| S22 | color | gris | gray | color swatch #9ca3af | recorded already | Gray, the one common color the unit is missing. |
| S23 | greet | buenas tardes | Good afternoon | ☀ (drawing: sun) | needs one | Buenas tardes completes the three greetings of the day; de nada answers gracias. |
| S24 | greet | de nada | You're welcome | 😊 | needs one |  |
| S25 | house | el espejo | mirror | 🪞 | needs one | Things in the house with clear pictures. |
| S26 | house | el reloj | clock | ⏰ (drawing: clock) | needs one |  |
| S27 | house | el jabón | soap | 🧼 (drawing: soap) | needs one |  |
| S28 | house | la escoba | broom | 🧹 | needs one |  |
| S29 | house | la cuchara | spoon | 🥄 (drawing: spoon) | needs one |  |
| S30 | house | la taza | cup | ☕ | needs one |  |
| S31 | clothes | la bufanda | scarf | 🧣 | needs one | More clothes and things you wear (Mexican Spanish: la bolsa for a purse). |
| S32 | clothes | la bolsa | purse | 👜 (drawing: purse) | needs one |  |
| S33 | clothes | el anillo | ring | 💍 | needs one |  |
| S34 | school | el crayón | crayon | 🖍 (drawing: crayon) | needs one | Classroom things (Mexican Spanish: la pluma for a pen). El mapa is masculine although it ends in -a. |
| S35 | school | la regla | ruler | 📏 | needs one |  |
| S36 | school | la pluma | pen | 🖊 (drawing: pen) | needs one |  |
| S37 | school | el pincel | paintbrush | 🖌 | needs one |  |
| S38 | school | el cuaderno | notebook | 📒 | needs one |  |
| S39 | school | el mapa | map | 🗺 (drawing: map) | needs one |  |
| S40 | trans | el tractor | tractor | 🚜 | needs one | Two more ways to travel with their own pictures. |
| S41 | trans | el trineo | sled | 🛷 | needs one |  |
| S42 | place | la panadería | bakery | 🍞 (drawing: bread) | needs one | Places in town (Mexican Spanish: la gasolinera). |
| S43 | place | la gasolinera | gas station | ⛽ | needs one |  |
| S44 | place | el aeropuerto | airport | ✈ (drawing: plane) | needs one |  |
| S45 | place | el puente | bridge | 🌉 | needs one |  |
| S46 | verb | cocinar | to cook | 🍳 | needs one | More action words; the picture shows the action. |
| S47 | verb | pintar | to paint | 🎨 | needs one |  |
| S48 | verb | escuchar | to listen | 👂 (drawing: ear) | needs one |  |
| S49 | verb | mirar | to look | 👀 | needs one |  |
| S50 | verb | abrir | to open | 🔓 | needs one |  |
| S51 | verb | cerrar | to close | 🔒 | needs one |  |
| S52 | adj | abierto | open | 🔓 | needs one | Two more opposite pairs: abierto / cerrado, duro / suave. |
| S53 | adj | cerrado | closed | 🔒 | needs one |  |
| S54 | adj | duro | hard | 🪨 (drawing: rock) | needs one |  |
| S55 | adj | suave | soft | 🧸 | needs one |  |

## Spanish: two new units

### Nature (`es_nature`): stops "Nature" (listen) and "Read Nature" (read), at the end of La Ciudad

A new unit: nature words a child sees outside, matching Discover. El sol and la estrella are both here; the pictures are distinct (sun and star) and picture books use them this way.

| # | Spanish | English | Picture | Recording |
|---|---|---|---|---|
| S56 | el sol | sun | ☀ (drawing: sun) | needs one |
| S57 | la luna | moon | 🌙 (drawing: moon) | needs one |
| S58 | la estrella | star | ⭐ (drawing: star) | needs one |
| S59 | el árbol | tree | 🌳 (drawing: tree) | needs one |
| S60 | la flor | flower | 🌷 (drawing: flower) | needs one |
| S61 | la hoja | leaf | 🍃 (drawing: leaf) | needs one |
| S62 | la nube | cloud | ☁ (drawing: cloud) | needs one |
| S63 | la montaña | mountain | 🏔 | needs one |
| S64 | el mar | sea | 🌊 | needs one |
| S65 | la isla | island | 🏝 | needs one |
| S66 | la piedra | rock | 🪨 (drawing: rock) | needs one |
| S67 | la concha | shell | 🐚 (drawing: shell) | needs one |
| S68 | el hongo | mushroom | 🍄 | needs one |
| S69 | el desierto | desert | 🏜 | needs one |

### Toys & Play (`es_toy`): stops "Toys" (listen) and "Read Toys" (read), at the end of La Casa

A new unit: toys and play things, the words children use most at home (Mexican Spanish: el papalote for a kite).

| # | Spanish | English | Picture | Recording |
|---|---|---|---|---|
| S70 | la pelota | ball | ⚽ (drawing: ball) | needs one |
| S71 | el globo | balloon | 🎈 (drawing: balloon) | needs one |
| S72 | el papalote | kite | 🪁 (drawing: kite) | needs one |
| S73 | el osito | teddy bear | 🧸 | needs one |
| S74 | el tambor | drum | 🥁 (drawing: drum) | needs one |
| S75 | la guitarra | guitar | 🎸 (drawing: guitar) | needs one |
| S76 | el robot | robot | 🤖 | needs one |
| S77 | el dado | dice | 🎲 (drawing: dice) | needs one |
| S78 | el rompecabezas | puzzle | 🧩 | needs one |
| S79 | la piñata | piñata | 🪅 | needs one |
| S80 | la trompeta | trumpet | 🎺 (drawing: trumpet) | needs one |
| S81 | el videojuego | video game | 🎮 (drawing: gamepad) | needs one |
| S82 | el patín | skate | ⛸ | needs one |

