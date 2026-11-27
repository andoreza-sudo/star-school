# DISC-46 read-through: two new Discover worlds, for grades 4 and 6

status: draft

**What this is.** Every new question, answer, wrong choice, hint and line for two drafted Discover worlds, with the reason for each:
**Canyon Trail** for 4th grade and **Volcano Ridge** for 6th grade. In all: 322 items: 242 choice questions, 32 sort, 24 match and 24 order items, in 12 stops (6 per world), plus 37 topic hints. None of it reaches a child yet.

**Why.** Discover had worlds for K (Nature Trail), grades 1 and 2 (Discovery Garden, DEEP-15), 3 (Science Lab) and 5 (Star Observatory).
A 4th grader started in Science Lab and a 6th grader in Star Observatory, with no world of their own. These two worlds fill the gaps.
They follow Discovery Garden's pattern: six stops each, choice questions plus sort, match and order items, and one gate.

**How to approve.** Read the tables. Change anything you like in `src/data/d-disc46.js` (or ask Claude to). When you are happy, change the
status line above to `status: reviewed <your name> <YYYY-MM-DD>` and run `python3 tools/build.py`. That writes `DISC46_ON = 1` into
`src/js/42m-disc46on.js`, and the worlds appear on the Discover map. With the line as it is, Discover is exactly as before.

**Rules every item follows.** No item teaches change over time in living things, and none presents fantasy as fact
(CONTENT-01). Facts were checked against the standards and sources named in the Why column (NGSS, the C3 social-studies framework, USGS,
NOAA and the National Weather Service). Civics is neutral: how government works, never who is in it. History is about people, places,
inventions and how cities were run. It does not cover the beliefs of any faith. No brand names. A hint teaches a way to think and never
names the answer or a word of it. The right answer is not the single longest choice too often (under 40% of questions in every stop, the
civics rule of R-01d). No question repeats a question that is already in Discover. Pictures are drawings the app already has, or emoji
on the allow list. They show the question's subject (an owl, a volcano), never the answer. The new stops use the question kinds Discover
already has: choice, sort, match and order.

**New words on screen (outside the questions).**

| Where | Words |
|---|---|
| Discover map, new worlds | Canyon Trail; Volcano Ridge |
| Canyon Trail's stops | Energy at Work; Light & Sound; Shaping the Land; Body Parts at Work; Our State Government; Regions & Resources |
| Volcano Ridge's stops | Food Webs & Balance; Inside the Earth; Weather Systems; Water & Resources; Early River Valleys; Greece, Rome & China |
| While the new stops load (a second or less) | Getting the new stops ready... (the line DEEP-15 already uses, already approved) |

**Recordings: none (not part of this draft).** Recording needs the owner's approval, and the audio budget is nearly full (about 11.6 of
12 MB used). Without recordings, the tablet's own voice reads the questions, as it does for Science Lab and Star Observatory. If the owner
wanted the teacher voice for these worlds, here is the estimate, made the same way as DEEP15-READ.md:

| Lines | Count | Characters | Bytes per character | Estimate |
|---|---|---|---|---|
| Each question with its choices, each hint of its own, each sort chip, match word and order tile, the topic hints, the world and stop names | about 940 | about 49,400 | about 144 (teacher voice) | about 7.1 MB |

That is about 18 times the 0.4 MB left in the 12 MB budget. Recording these worlds would need a bigger budget, or recording only part
(for example only the 37 topic hints, about 4,000 characters, about 0.6 MB, which still does not fit).

**Changes a flip makes beyond the items.**
- A 4th grader's Discover map now opens on Canyon Trail (it was Science Lab, which stays open below it). A 6th grader's opens on Volcano
  Ridge (it was Star Observatory). Grades K to 3 and 5 start where they did before.
- For a 4th grader, Star Observatory now opens once Canyon Trail is done (it opened when Science Lab was done). Stars and progress already
  earned never move, and a world a child has already played in stays open.
- In the Play app's free sample, a 4th or 6th grader's free Discover world is then the new world.
- Bosses are drawn in turn by world position, so the boss characters of Star Observatory change (their stars do not).
- The Discover card on Home counts 14 more stops (12 stops and 2 bosses).
- The report card lists the new stops under Science and under Geography and civics.
- Where the content lives: the items are in the lazily loaded part `teaches` (with DEEP-15), not in the start-up files. Only the gate flag
  and the map hooks (about 1.8 KB) are in the start-up page.

## Discover: Canyon Trail, a new world for grade 4

World: **Canyon Trail** (🏜), right after Science Lab. Grade 4 children start here. Items are not read aloud with their choices (as in Science Lab); the child can tap the speaker to hear the question. A "Picture" is a small drawing of the question's subject above it, never of the answer.

### Energy at Work (`sci_enr` 1), Science, grade 4

| # | Question | Answer | Wrong choices | Hint (when not the topic hint) | Picture | Why |
|---|---|---|---|---|---|---|
| G1 | Two balls are the same size. One rolls fast and one rolls slowly. Which has more energy? | the fast ball | the slow ball; they have the same; neither ball |  |  | NGSS 4-PS3-1 and 4-PS3-3: a faster object has more energy; when objects collide, energy is passed on and changes into sound and heat. |
| G2 | A bike speeds up as it goes down a hill. What happens to its energy of motion? | it gets bigger | it gets smaller; it stays the same; it disappears |  |  | NGSS 4-PS3-1 and 4-PS3-3: a faster object has more energy; when objects collide, energy is passed on and changes into sound and heat. |
| G3 | A bowling ball hits the pins and they fly apart. What did the ball pass to the pins? | energy | water; color; air |  |  | NGSS 4-PS3-1 and 4-PS3-3: a faster object has more energy; when objects collide, energy is passed on and changes into sound and heat. |
| G4 | A crash at high speed does more damage than a crash at low speed. Why? | the fast car has more energy | the slow car is heavier; fast cars are softer; slow cars have more energy than fast ones |  |  | NGSS 4-PS3-1 and 4-PS3-3: a faster object has more energy; when objects collide, energy is passed on and changes into sound and heat. |
| G5 | Two toy cars bump into each other. Which of these is made when they bump? | sound | ice; sunlight; rain |  |  | NGSS 4-PS3-1 and 4-PS3-3: a faster object has more energy; when objects collide, energy is passed on and changes into sound and heat. |
| G6 | A soccer ball is kicked harder than before. What happens? | it moves faster | it moves slower; it stops at once; it gets heavier |  |  | NGSS 4-PS3-1 and 4-PS3-3: a faster object has more energy; when objects collide, energy is passed on and changes into sound and heat. |
| G7 | When you rub your hands together quickly, they get ___. | warm | wet; cold; sticky |  |  | NGSS 4-PS3-2 and 4-PS3-4: energy moves from place to place by sound, light, heat and electric currents, and devices change its form. |
| G8 | A doorbell button is pushed. The electricity is changed into ___. | sound | ice; water; wind |  | 🔔 | NGSS 4-PS3-2 and 4-PS3-4: energy moves from place to place by sound, light, heat and electric currents, and devices change its form. |
| G9 | Electric energy travels from a power plant to your home through ___. | wires | pipes; roads; clouds |  |  | NGSS 4-PS3-2 and 4-PS3-4: energy moves from place to place by sound, light, heat and electric currents, and devices change its form. |
| G10 | A calculator has a small solar panel. The panel turns ___ into electricity. | light | sound; wind; water |  |  | NGSS 4-PS3-2 and 4-PS3-4: energy moves from place to place by sound, light, heat and electric currents, and devices change its form. |
| G11 | A toy car with a battery rolls across the floor. The battery's stored energy became ___. | motion | water; color; sand |  |  | NGSS 4-PS3-2 and 4-PS3-4: energy moves from place to place by sound, light, heat and electric currents, and devices change its form. |
| G12 | How does the sound of a bell travel to your ears? | as vibrations in the air | as light in the sky; as drops of water; as tiny sparks |  |  | NGSS 4-PS3-2 and 4-PS3-4: energy moves from place to place by sound, light, heat and electric currents, and devices change its form. |
| G13 | You hold a cup of hot cocoa. Which way does the heat move? | from the cup to your hands | from your hands to the cup; from the cup to the ceiling only; it does not move at all |  |  | NGSS 4-PS3-2 and 4-PS3-4: energy moves from place to place by sound, light, heat and electric currents, and devices change its form. |
| G14 | Which one changes electricity into sound? | a speaker | a lamp; a heater; a toaster |  |  | NGSS 4-PS3-2 and 4-PS3-4: energy moves from place to place by sound, light, heat and electric currents, and devices change its form. |
| G15 | Coal, oil and natural gas formed from the remains of plants and animals that lived ___. | long ago | last year; last week; yesterday |  |  | NGSS 4-ESS3-1: energy and fuels come from natural resources; using them affects the environment; some are renewable and some are not. |
| G16 | Why are coal and oil called nonrenewable? | they take a very long time to form | they are found everywhere; they never run out; they grow back in a few weeks like grass |  |  | NGSS 4-ESS3-1: energy and fuels come from natural resources; using them affects the environment; some are renewable and some are not. |
| G17 | Which energy source will not run out? | sunlight | coal; oil; natural gas |  |  | NGSS 4-ESS3-1: energy and fuels come from natural resources; using them affects the environment; some are renewable and some are not. |
| G18 | A dam on a river uses moving ___ to make electricity. | water | sand; ice; rock |  |  | NGSS 4-ESS3-1: energy and fuels come from natural resources; using them affects the environment; some are renewable and some are not. |
| G19 | Burning fuels like coal and oil can make the air ___. | dirty | cleaner; colder; wetter |  |  | NGSS 4-ESS3-1: energy and fuels come from natural resources; using them affects the environment; some are renewable and some are not. |
| G20 | Which is a way to save energy at home? | turn off lights you are not using | leave the TV on all night; open the fridge door often; run hot water when nobody needs it |  |  | NGSS 4-ESS3-1: energy and fuels come from natural resources; using them affects the environment; some are renewable and some are not. |

| # | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|
| G21 | sort | Sort the energy sources: renewable or nonrenewable? | **renewable**: sunlight, wind, moving water; **nonrenewable**: coal, oil, natural gas | Ask if nature makes more of it soon, or if it took a very long time to form. | NGSS 4-ESS3-1: energy and fuels come from natural resources; using them affects the environment; some are renewable and some are not. |
| G22 | sort | Sort them: does it change electricity into light, or into sound? | **light**: lamp, flashlight, ceiling light; **sound**: doorbell, speaker, radio | Think about what you notice when each one is switched on: do you see it or hear it? | NGSS 4-PS3-2 and 4-PS3-4: energy moves from place to place by sound, light, heat and electric currents, and devices change its form. |
| G23 | sort | Sort them: is it moving energy or stored energy? | **moving**: a rolling ball, a spinning fan, a flying kite; **stored**: a battery, a stretched rubber band, a log of firewood | Is it moving right now, or is it holding energy to use later? | NGSS 4-PS3-1 and 4-PS3-3: a faster object has more energy; when objects collide, energy is passed on and changes into sound and heat. |
| G24 | match | Match each thing to the energy it gives off: drum, oven and flashlight. | drum = sound; oven = heat; flashlight = light | One you hear, one warms the kitchen, and one helps you see in the dark. | NGSS 4-PS3-2 and 4-PS3-4: energy moves from place to place by sound, light, heat and electric currents, and devices change its form. |
| G25 | match | Match each machine to what it uses to make electricity: solar panel, wind turbine and dam. | solar panel = sunlight; wind turbine = moving air; dam = moving water | Think about what shines on it, blows on it or flows through it. | NGSS 4-ESS3-1: energy and fuels come from natural resources; using them affects the environment; some are renewable and some are not. |
| G26 | order | Put them in order: how does electricity get from a power plant to a lamp? | power plant → wires → outlet in the wall → lamp | Start where the electricity is made. | NGSS 4-PS3-2 and 4-PS3-4: energy moves from place to place by sound, light, heat and electric currents, and devices change its form. |
| G27 | order | Put the balls in order from least to most energy of motion. | a ball sitting still → a ball rolling slowly → a ball rolling fast | A ball that is not moving has none. The quicker it goes, the more it has. | NGSS 4-PS3-1 and 4-PS3-3: a faster object has more energy; when objects collide, energy is passed on and changes into sound and heat. |

### Light & Sound (`sci_lite` 1), Science, grade 4

| # | Question | Answer | Wrong choices | Hint (when not the topic hint) | Picture | Why |
|---|---|---|---|---|---|---|
| G28 | A toy boat floats on a pond. A wave passes by. What does the boat do? | it bobs up and down | it races to the shore; it sinks to the bottom; it spins in a circle |  | ⛵ | NGSS 4-PS4-1: waves have a pattern of amplitude and wavelength, and waves can make objects move. |
| G29 | How tall a wave is, from its resting level to its top, is called its ___. | amplitude | wavelength; speed; color |  |  | NGSS 4-PS4-1: waves have a pattern of amplitude and wavelength, and waves can make objects move. |
| G30 | Two waves are the same height. The one with tops farther apart has a longer ___. | wavelength | amplitude; shadow; echo |  |  | NGSS 4-PS4-1: waves have a pattern of amplitude and wavelength, and waves can make objects move. |
| G31 | Big ocean waves carry ___ energy than small ripples. | more | less; the same; no |  |  | NGSS 4-PS4-1: waves have a pattern of amplitude and wavelength, and waves can make objects move. |
| G32 | A loud drum beat and a soft drum beat: which sound wave has a bigger amplitude? | the loud beat | the soft beat; they are the same; neither has one |  | 🥁 | NGSS 4-PS4-1: waves have a pattern of amplitude and wavelength, and waves can make objects move. |
| G33 | Over many years, ocean waves can slowly wear away a ___. | rocky cliff | cloud; rainbow; shadow |  |  | NGSS 4-PS4-1: waves have a pattern of amplitude and wavelength, and waves can make objects move. |
| G34 | Sound is made when something ___. | vibrates | freezes; melts; shrinks |  |  | NGSS 4-PS4-1: waves have a pattern of amplitude and wavelength, and waves can make objects move. |
| G35 | You can see a book because light bounces off it and enters your ___. | eyes | ears; nose; hands |  |  | NGSS 4-PS4-2: an object can be seen when light reflected from it enters the eye. |
| G36 | In a completely dark room, can you see a red ball? | no, because no light reaches your eyes | yes, if you stare at it for a long time; yes, red things shine; only if it is big | Think about what has to bounce off the ball and travel to you before you can see it. |  | NGSS 4-PS4-2: an object can be seen when light reflected from it enters the eye. |
| G37 | Which surface reflects light best? | a smooth mirror | a black rug; a fuzzy wool sweater; a pile of dirt |  |  | NGSS 4-PS4-2: an object can be seen when light reflected from it enters the eye. |
| G38 | Light travels in ___ lines. | straight | curly; zigzag; looping |  |  | NGSS 4-PS4-2: an object can be seen when light reflected from it enters the eye. |
| G39 | A shadow forms when an object ___ light. | blocks | makes; bends; speeds up |  |  | NGSS 4-PS4-2: an object can be seen when light reflected from it enters the eye. |
| G40 | Light passes easily through ___. | clear glass | a brick wall; a wooden door; a metal pan |  |  | NGSS 4-PS4-2: an object can be seen when light reflected from it enters the eye. |
| G41 | You see lightning before you hear its thunder. Why? | light travels faster than sound | sound travels faster than light; thunder happens much later; your ears are asleep | Both happen at the same moment. Which one gets to you first, and what does that tell you? |  | NGSS 4-PS4-2: an object can be seen when light reflected from it enters the eye. |
| G42 | Long ago people sent messages over wires as long and short clicks. This was ___. | Morse code | a radio show; a phone call; a letter |  |  | NGSS 4-PS4-3: patterns can be used to send information (codes, digital signals). |
| G43 | A computer stores pictures and words as patterns of ___. | numbers | colors; sounds; tiny drawings |  |  | NGSS 4-PS4-3: patterns can be used to send information (codes, digital signals). |
| G44 | A light that blinks on and off in a pattern can send a ___. | message | smell; taste; temperature |  |  | NGSS 4-PS4-3: patterns can be used to send information (codes, digital signals). |
| G45 | A drum pattern can carry a message far away because sound ___. | travels through the air | stays in one place; turns into light; cannot be heard |  |  | NGSS 4-PS4-3: patterns can be used to send information (codes, digital signals). |
| G46 | When you send a text, your words travel as a ___. | coded signal | paper letter; puff of smoke; loud shout |  |  | NGSS 4-PS4-3: patterns can be used to send information (codes, digital signals). |

| # | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|
| G47 | sort | Sort them: does light pass through it, or is light blocked? | **light passes through**: clear glass, clean water, plastic wrap; **light is blocked**: a brick, a book, a wooden board | Could you read a book held behind it? | NGSS 4-PS4-2: an object can be seen when light reflected from it enters the eye. |
| G48 | sort | Sort them: does it send a message with sound, or with light? | **sound**: drum beats, a whistle, a ringing bell; **light**: a blinking flashlight, a lighthouse beam, a traffic light | Would you hear it or see it? | NGSS 4-PS4-3: patterns can be used to send information (codes, digital signals). |
| G49 | sort | Sort them: does it give off its own light, or only reflect light? | **gives off light**: the Sun, a lamp, a campfire; **only reflects light**: the Moon, a mirror, a spoon | Would it still shine in a dark room with every other light off? | NGSS 4-PS4-2: an object can be seen when light reflected from it enters the eye. |
| G50 | match | Match each word to what it means: amplitude, wavelength and vibration. | amplitude = how tall a wave is; wavelength = the distance from top to top; vibration = a quick back and forth motion | One is about height, one is about distance, and one is about shaking. | NGSS 4-PS4-1: waves have a pattern of amplitude and wavelength, and waves can make objects move. |
| G51 | match | Match each body part to what it senses: eyes, ears and skin. | eyes = light; ears = sound; skin = heat | Think about what you see, what you hear and what you feel. | NGSS 4-PS4-2: an object can be seen when light reflected from it enters the eye. |
| G52 | order | Put them in order: how do you see a tree? | the Sun gives off light → light bounces off the tree → light enters your eyes → your brain makes sense of it | Start where the light begins. | NGSS 4-PS4-2: an object can be seen when light reflected from it enters the eye. |
| G53 | order | Put the waves in order from smallest to biggest amplitude. | a ripple in a puddle → a wave on a lake → a big ocean wave | Think about how tall each wave is. | NGSS 4-PS4-1: waves have a pattern of amplitude and wavelength, and waves can make objects move. |

### Shaping the Land (`sci_shape` 1), Science, grade 4

| # | Question | Answer | Wrong choices | Hint (when not the topic hint) | Picture | Why |
|---|---|---|---|---|---|---|
| G54 | A river cuts deeper and deeper into rock. Over a very long time it can make a ___. | canyon | volcano; island; glacier |  |  | NGSS 4-ESS2-1: water, ice, wind, living things and gravity break rocks and soils apart and move them. |
| G55 | Water seeps into a crack in a rock and freezes. What happens to the crack? | it gets wider | it gets smaller; it fills with sand; it closes up |  | 🧊 | NGSS 4-ESS2-1: water, ice, wind, living things and gravity break rocks and soils apart and move them. |
| G56 | A tree's roots grow into a crack in a rock. Over time the roots can ___. | split the rock | glue the rock; melt the rock; polish the rock |  |  | NGSS 4-ESS2-1: water, ice, wind, living things and gravity break rocks and soils apart and move them. |
| G57 | Rocks that tumble along a fast stream for a long time become ___. | smooth and round | sharp and jagged; bigger and heavier; soft and sticky |  |  | NGSS 4-ESS2-1: water, ice, wind, living things and gravity break rocks and soils apart and move them. |
| G58 | Strong winds blow sand against a rock for many years. What happens to the rock? | it wears down | it grows bigger; it turns to ice; it gets heavier |  |  | NGSS 4-ESS2-1: water, ice, wind, living things and gravity break rocks and soils apart and move them. |
| G59 | A heavy rain washes soil off a bare hillside. This is ___. | erosion | melting; freezing; evaporation |  |  | NGSS 4-ESS2-1: water, ice, wind, living things and gravity break rocks and soils apart and move them. |
| G60 | Where a river slows down and enters the sea, it drops sand and mud. This can build a ___. | delta | canyon; cave; volcano |  |  | NGSS 4-ESS2-1: water, ice, wind, living things and gravity break rocks and soils apart and move them. |
| G61 | In rock layers that have not been moved, which one is usually the oldest? | the one at the bottom | the one on top; the one in the middle; the thinnest one |  |  | NGSS 4-ESS1-1: patterns in rock layers and fossils show how a landscape changed over time. |
| G62 | A rock layer holds fossils of ferns that need a lot of rain. What was the place like when that layer formed? | wet and green | icy and frozen; dry and sandy; deep under the sea |  |  | NGSS 4-ESS1-1: patterns in rock layers and fossils show how a landscape changed over time. |
| G63 | Rock layers are like pages in a history book because they show ___. | what happened in the past | what will happen next year; what people think; how to build a house |  |  | NGSS 4-ESS1-1: patterns in rock layers and fossils show how a landscape changed over time. |
| G64 | A layer with fish fossils lies under a layer with fossils of land plants. What changed? | water turned into dry land | dry land turned into a sea; the place got icy; nothing changed at all |  |  | NGSS 4-ESS1-1: patterns in rock layers and fossils show how a landscape changed over time. |
| G65 | Scientists who study rocks and the history of Earth are called ___. | geologists | astronauts; chefs; pilots |  |  | NGSS 4-ESS1-1: patterns in rock layers and fossils show how a landscape changed over time. |
| G66 | On a map of the world, earthquakes and volcanoes are not spread out evenly. How are most of them found? | in long belts | evenly everywhere; only near the poles; only in deserts |  |  | NGSS 4-ESS2-2 and 4-ESS3-2: maps show patterns of earthquakes and volcanoes; people design ways to reduce the impact of natural hazards. |
| G67 | A flood warning is given for your town. What is the safest thing to do? | move to higher ground | go and look at the river; stay in the basement; drive through deep water |  |  | NGSS 4-ESS2-2 and 4-ESS3-2: maps show patterns of earthquakes and volcanoes; people design ways to reduce the impact of natural hazards. |
| G68 | Engineers build some buildings to sway a little in an earthquake so they ___. | do not fall down | fall down faster; sink into the ground; make more noise |  |  | NGSS 4-ESS2-2 and 4-ESS3-2: maps show patterns of earthquakes and volcanoes; people design ways to reduce the impact of natural hazards. |
| G69 | A levee is a high bank of earth built along a river to ___. | keep floods out of towns | make the river faster; catch fish; help boats cross the river |  |  | NGSS 4-ESS2-2 and 4-ESS3-2: maps show patterns of earthquakes and volcanoes; people design ways to reduce the impact of natural hazards. |
| G70 | Scientists watch a volcano for small earthquakes and gas. These can be signs that it may ___. | erupt soon | freeze over; turn into a lake; stop forever |  | 🌋 | NGSS 4-ESS2-2 and 4-ESS3-2: maps show patterns of earthquakes and volcanoes; people design ways to reduce the impact of natural hazards. |
| G71 | A landslide is most likely on a ___. | steep hill after heavy rain | flat field on a dry day; sandy beach at low tide; parking lot in summer |  |  | NGSS 4-ESS2-2 and 4-ESS3-2: maps show patterns of earthquakes and volcanoes; people design ways to reduce the impact of natural hazards. |
| G72 | Planting trees on a bare hillside helps stop ___. | soil from washing away | the wind from blowing; the Sun from shining; rain from falling |  |  | NGSS 4-ESS2-2 and 4-ESS3-2: maps show patterns of earthquakes and volcanoes; people design ways to reduce the impact of natural hazards. |

| # | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|
| G73 | sort | Sort them: does the change happen fast or slowly? | **fast**: an earthquake, a landslide, a flood; **slowly**: a river carving a canyon, wind wearing down a rock, a glacier moving | Some changes take minutes. Others take a very long time. | NGSS 4-ESS2-2 and 4-ESS3-2: maps show patterns of earthquakes and volcanoes; people design ways to reduce the impact of natural hazards. |
| G74 | sort | Sort them: weathering (breaking rock apart) or erosion (carrying it away)? | **weathering**: ice cracking a rock, roots splitting a rock; **erosion**: a river carrying sand, wind blowing dust away, a glacier pushing rocks | Does the rock stay where it is in smaller pieces, or do the pieces travel? | NGSS 4-ESS2-1: water, ice, wind, living things and gravity break rocks and soils apart and move them. |
| G75 | sort | Sort them: a natural hazard, or a way to stay safe? | **natural hazard**: flood, earthquake, volcano; **way to stay safe**: levee, warning siren, flood map | Does it cause harm, or does it protect people from harm? | NGSS 4-ESS2-2 and 4-ESS3-2: maps show patterns of earthquakes and volcanoes; people design ways to reduce the impact of natural hazards. |
| G76 | match | Match each problem to a way to stay safer: flood, earthquake and landslide. | flood = a levee; earthquake = buildings that sway; landslide = plants on the hillside | One needs a wall, one needs strong buildings, and one needs roots to hold the soil. | NGSS 4-ESS2-2 and 4-ESS3-2: maps show patterns of earthquakes and volcanoes; people design ways to reduce the impact of natural hazards. |
| G77 | match | Match each landform to what shaped it: canyon, sand dune and delta. | canyon = a river cutting down; sand dune = wind piling up sand; delta = a river dropping mud | Which ones are made by water, and which by wind? Does the water cut or drop? | NGSS 4-ESS2-1: water, ice, wind, living things and gravity break rocks and soils apart and move them. |
| G78 | order | Put the rock layers in order from oldest to youngest. | bottom layer → middle layer → top layer | The first layer to settle ends up under the others. | NGSS 4-ESS1-1: patterns in rock layers and fossils show how a landscape changed over time. |
| G79 | order | Put them in order: how does a delta form? | rain falls on the land → a river carries sand and mud → the river slows at the sea → sand and mud pile up | Start high up, where the water first falls. | NGSS 4-ESS2-1: water, ice, wind, living things and gravity break rocks and soils apart and move them. |

### Body Parts at Work (`sci_part` 1), Science, grade 4

| # | Question | Answer | Wrong choices | Hint (when not the topic hint) | Picture | Why |
|---|---|---|---|---|---|---|
| G80 | A rose has sharp thorns on its stem. How do the thorns help the rose? | they keep animals from eating it | they help it drink water; they make it smell sweet; they catch sunlight to make food for the leaves |  |  | NGSS 4-LS1-1: plants and animals have outside structures that help them survive, grow, behave and make young. |
| G81 | A turtle's hard shell helps it ___. | stay safe from predators | swim faster; find food; see in the dark |  |  | NGSS 4-LS1-1: plants and animals have outside structures that help them survive, grow, behave and make young. |
| G82 | A flower's bright colors and sweet smell help bring ___ to it. | bees and butterflies | rain and snow; rocks and sand; worms and snails |  |  | NGSS 4-LS1-1: plants and animals have outside structures that help them survive, grow, behave and make young. |
| G83 | An eagle's sharp, curved claws help it ___. | grab and hold its food | dig deep tunnels; swim in the sea; keep its eggs cool |  | 🦅 | NGSS 4-LS1-1: plants and animals have outside structures that help them survive, grow, behave and make young. |
| G84 | A fish uses its fins to ___. | steer and swim | breathe air; see in the dark; eat |  |  | NGSS 4-LS1-1: plants and animals have outside structures that help them survive, grow, behave and make young. |
| G85 | A porcupine's sharp quills help it ___. | protect itself | fly; dig; swim |  |  | NGSS 4-LS1-1: plants and animals have outside structures that help them survive, grow, behave and make young. |
| G86 | A duck's feathers are coated with oil. This keeps the duck ___. | dry in the water | hot in the sun; heavy in the air; hidden in the grass |  |  | NGSS 4-LS1-1: plants and animals have outside structures that help them survive, grow, behave and make young. |
| G87 | Which part inside your body is a muscle that keeps working even while you sleep? | the heart | the stomach; the skull; the hair |  |  | NGSS 4-LS1-1: plants and animals have inside structures with jobs (heart, gills, skeleton, stem tubes). |
| G88 | Fish take in oxygen from the water with their ___. | gills | fins; scales; tails |  | 🐟 | NGSS 4-LS1-1: plants and animals have inside structures with jobs (heart, gills, skeleton, stem tubes). |
| G89 | Your skeleton gives your body its shape and ___. | support | color; taste; a sense of smell |  |  | NGSS 4-LS1-1: plants and animals have inside structures with jobs (heart, gills, skeleton, stem tubes). |
| G90 | Tiny tubes inside a plant's stem carry ___ up from the roots to the leaves. | water | light; seeds; soil |  |  | NGSS 4-LS1-1: plants and animals have inside structures with jobs (heart, gills, skeleton, stem tubes). |
| G91 | Muscles move your bones by ___. | pulling on them | growing hair on them; pumping blood into them; making them hollow |  |  | NGSS 4-LS1-1: plants and animals have inside structures with jobs (heart, gills, skeleton, stem tubes). |
| G92 | Your stomach helps your body ___. | break down food | see colors; hear sounds; pump blood |  |  | NGSS 4-LS1-1: plants and animals have inside structures with jobs (heart, gills, skeleton, stem tubes). |
| G93 | Your skull protects your ___. | brain | heart; stomach; lungs |  |  | NGSS 4-LS1-1: plants and animals have inside structures with jobs (heart, gills, skeleton, stem tubes). |
| G94 | You touch a hot pan and pull your hand away fast. What carried the message? | your nerves | your hair; your bones; your fingernails |  |  | NGSS 4-LS1-2: animals take in information through their senses, the brain processes it, and they respond. |
| G95 | Where does your body make sense of what your eyes see? | in the brain | in the stomach; in the hands; in the feet |  |  | NGSS 4-LS1-2: animals take in information through their senses, the brain processes it, and they respond. |
| G96 | A rabbit hears a twig snap and runs away. Which sense warned it? | hearing | taste; touch; eyesight |  |  | NGSS 4-LS1-2: animals take in information through their senses, the brain processes it, and they respond. |
| G97 | An owl hunts at night. What helps it find mice in the dark? | sharp hearing | a long tail; bright colors; strong legs |  | 🦉 | NGSS 4-LS1-2: animals take in information through their senses, the brain processes it, and they respond. |
| G98 | You smell smoke and leave the room. Your brain used a message from your ___. | nose | ears; knees; tongue |  |  | NGSS 4-LS1-2: animals take in information through their senses, the brain processes it, and they respond. |
| G99 | A snake flicks its tongue in and out to ___. | smell the air | cool its body; make a sound; clean its teeth |  | 🐍 | NGSS 4-LS1-2: animals take in information through their senses, the brain processes it, and they respond. |

| # | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|
| G100 | sort | Sort them: a part on the outside of the body, or one inside it? | **outside**: skin, hair, fingernails; **inside**: heart, lungs, stomach | Could you see it in a mirror? | NGSS 4-LS1-1: plants and animals have inside structures with jobs (heart, gills, skeleton, stem tubes). |
| G101 | sort | Sort the parts: does it help protect, or help move? | **protect**: turtle shell, rose thorns, porcupine quills; **move**: fish fins, bird wings, frog legs | Does it keep the plant or animal safe, or carry it from place to place? | NGSS 4-LS1-1: plants and animals have outside structures that help them survive, grow, behave and make young. |
| G102 | sort | Sort the plant parts: does it help make new plants, or move water? | **makes new plants**: flower, seed, fruit; **moves water**: roots, stem | Think about where seeds come from, and how water gets from the soil to the leaves. | NGSS 4-LS1-1: plants and animals have inside structures with jobs (heart, gills, skeleton, stem tubes). |
| G103 | match | Match each part to its job: heart, lungs and stomach. | heart = pumps blood; lungs = take in air; stomach = breaks down food | One works with blood, one with air, and one with food. | NGSS 4-LS1-1: plants and animals have inside structures with jobs (heart, gills, skeleton, stem tubes). |
| G104 | match | Match each animal to the part that helps it get food: eagle, woodpecker and frog. | eagle = sharp claws; woodpecker = strong beak; frog = sticky tongue | One grabs, one pecks wood, and one catches flies. | NGSS 4-LS1-1: plants and animals have outside structures that help them survive, grow, behave and make young. |
| G105 | order | Put them in order: what happens when you hear your name? | sound reaches your ear → nerves carry the message → your brain understands it → you turn your head | Start with the sound in the air. | NGSS 4-LS1-2: animals take in information through their senses, the brain processes it, and they respond. |
| G106 | order | Put them in order: how does water travel through a plant? | roots take in water → tubes in the stem carry it up → water reaches the leaves | Start under the ground. | NGSS 4-LS1-1: plants and animals have inside structures with jobs (heart, gills, skeleton, stem tubes). |

### Our State Government (`civ_gov4` 1), Social studies, grade 4

| # | Question | Answer | Wrong choices | Hint (when not the topic hint) | Picture | Why |
|---|---|---|---|---|---|---|
| G107 | Who signs bills to make them state laws? | the governor | the mayor; the principal; the President |  |  | C3 framework D2.Civ (grades 3-5): the roles of state government, its leaders and its laws. |
| G108 | The group of elected people who make the laws for a state is the state ___. | legislature | school board; city council; library board |  |  | C3 framework D2.Civ (grades 3-5): the roles of state government, its leaders and its laws. |
| G109 | A state's capital city is where ___. | lawmakers and the governor work | the most people in the state live; the oldest tree grows; the longest river starts |  |  | C3 framework D2.Civ (grades 3-5): the roles of state government, its leaders and its laws. |
| G110 | Who decides if someone broke a state law? | courts and judges | the governor alone; the city council; the fire department |  |  | C3 framework D2.Civ (grades 3-5): the roles of state government, its leaders and its laws. |
| G111 | Every state has its own constitution. It is a plan for ___. | how its government works | how many trees to plant; where the beaches are; which songs to sing |  |  | C3 framework D2.Civ (grades 3-5): the roles of state government, its leaders and its laws. |
| G112 | State governments use tax money to pay for things like ___. | highways and parks | people's own cars; the toys in stores; the food in your kitchen |  |  | C3 framework D2.Civ (grades 3-5): the roles of state government, its leaders and its laws. |
| G113 | Each state sends people to Congress in Washington, D.C. Congress makes laws for ___. | the whole country | only one town; only one school; only the state capital |  |  | C3 framework D2.Civ (grades 3-5): the roles of state government, its leaders and its laws. |
| G114 | In many cities, the group that makes local laws is the ___. | city council | Supreme Court; Congress; state legislature |  |  | C3 framework D2.Civ (grades 3-5): local government and the services it gives a community. |
| G115 | Which service is usually run by a city or town? | trash and recycling pickup | printing money; the army; delivering the mail |  |  | C3 framework D2.Civ (grades 3-5): local government and the services it gives a community. |
| G116 | Most states are divided into smaller areas called ___. | counties | continents; countries; hemispheres |  |  | C3 framework D2.Civ (grades 3-5): local government and the services it gives a community. |
| G117 | A school board makes decisions about ___. | the public schools in an area | the state highways; the country's army; the forests and parks of the nation |  |  | C3 framework D2.Civ (grades 3-5): local government and the services it gives a community. |
| G118 | A town's public library is paid for mostly by ___. | local taxes | library fines; bake sales; selling old books |  |  | C3 framework D2.Civ (grades 3-5): local government and the services it gives a community. |
| G119 | People in a town want a new park. Who should they ask? | their city council | the President; a judge; the governor of another state |  |  | C3 framework D2.Civ (grades 3-5): local government and the services it gives a community. |
| G120 | Which job belongs to the national government, not a state or a town? | printing money | fixing a town's potholes; running a city park; picking up trash |  |  | C3 framework D2.Civ.1-2 (grades 3-5): local, state and national government each have their own jobs. |
| G121 | Which is usually done by a state government? | giving out driver's licenses | printing money; running the post office; picking up trash |  |  | C3 framework D2.Civ.1-2 (grades 3-5): local, state and national government each have their own jobs. |
| G122 | A mayor leads a city. A governor leads a state. Who leads the whole country? | the President | the mayor; the governor; the judge |  |  | C3 framework D2.Civ.1-2 (grades 3-5): local, state and national government each have their own jobs. |
| G123 | Citizens choose their governor by ___. | voting in an election | drawing names from a hat; picking the oldest person; having a race |  |  | C3 framework D2.Civ.1-2 (grades 3-5): local, state and national government each have their own jobs. |
| G124 | A town, a state and the nation each have a government. This means people follow ___. | laws from all three | only town laws; only national laws; no laws at all |  |  | C3 framework D2.Civ.1-2 (grades 3-5): local, state and national government each have their own jobs. |
| G125 | Why do towns have their own governments? | to take care of local needs | to print their own money; to have their own army; to choose the President |  |  | C3 framework D2.Civ.1-2 (grades 3-5): local, state and national government each have their own jobs. |

| # | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|
| G126 | sort | Sort the jobs: town government or state government? | **town**: trash pickup, city parks, the town library; **state**: driver's licenses, state highways, state parks | Does the job cover one town, or the whole state? | C3 framework D2.Civ.1-2 (grades 3-5): local, state and national government each have their own jobs. |
| G127 | sort | Sort the jobs: national government or town government? | **national**: printing money, the army, the post office; **town**: fixing town streets, trash pickup, the town fire station | Is it the same for the whole country, or does each town take care of it? | C3 framework D2.Civ.1-2 (grades 3-5): local, state and national government each have their own jobs. |
| G128 | match | Match each leader to what they lead: mayor, governor and President. | mayor = a city; governor = a state; President = the country | Think from small to big: a city, a state, the country. | C3 framework D2.Civ.1-2 (grades 3-5): local, state and national government each have their own jobs. |
| G129 | match | Match each group to the laws it makes: city council, state legislature and Congress. | city council = town laws; state legislature = state laws; Congress = national laws | Match the size of the group's area to the size of the area its laws cover. | C3 framework D2.Civ (grades 3-5): the roles of state government, its leaders and its laws. |
| G130 | order | Put them in order from smallest area to biggest. | town → county → state → country | A town is inside a county, and a county is inside a state. | C3 framework D2.Civ (grades 3-5): local government and the services it gives a community. |
| G131 | order | Put them in order: how does a bill become a state law? | a lawmaker writes a bill → the legislature votes yes → the governor signs it → it becomes a law | Someone has to write it first, and the governor comes near the end. | C3 framework D2.Civ (grades 3-5): the roles of state government, its leaders and its laws. |

### Regions & Resources (`civ_reg` 1), Social studies, grade 4

| # | Question | Answer | Wrong choices | Hint (when not the topic hint) | Picture | Why |
|---|---|---|---|---|---|---|
| G132 | The Midwest has flat land and rich soil. It is known for growing ___. | corn and wheat | oranges and lemons; coconuts; bananas |  |  | C3 framework D2.Geo (grades 3-5): US regions and how land and climate shape the work people do. |
| G133 | The Southwest has many deserts. Its weather is mostly ___. | hot and dry | cold and snowy; rainy all year; foggy and cool |  |  | C3 framework D2.Geo (grades 3-5): US regions and how land and climate shape the work people do. |
| G134 | The Rocky Mountains run through the ___ region. | West | Southeast; Northeast; Midwest |  |  | C3 framework D2.Geo (grades 3-5): US regions and how land and climate shape the work people do. |
| G135 | Many of the oldest cities in the United States, like Boston, are in the ___. | Northeast | Southwest; West; Midwest |  |  | C3 framework D2.Geo (grades 3-5): US regions and how land and climate shape the work people do. |
| G136 | Florida, in the Southeast, is famous for growing ___. | oranges | apples; cranberries; wheat |  |  | C3 framework D2.Geo (grades 3-5): US regions and how land and climate shape the work people do. |
| G137 | The Pacific Ocean is along the coast of the ___ region. | West | Northeast; Southeast; Midwest |  |  | C3 framework D2.Geo (grades 3-5): US regions and how land and climate shape the work people do. |
| G138 | Which region has much of the Great Plains, with its many farms and ranches? | the Midwest | the Northeast; the Southeast; the Pacific coast |  |  | C3 framework D2.Geo (grades 3-5): US regions and how land and climate shape the work people do. |
| G139 | Why do many people in the Northeast work in fishing and shipping? | it is next to the Atlantic Ocean | it has no rivers; it is in a desert; it is far from any ocean or lake |  |  | C3 framework D2.Geo (grades 3-5): US regions and how land and climate shape the work people do. |
| G140 | Which region is most often hit by hurricanes in late summer and fall? | the Southeast | the Midwest; the Rocky Mountains; the Great Plains |  |  | C3 framework D2.Geo (grades 3-5): US regions and how land and climate shape the work people do. |
| G141 | Water, trees and soil are ___ resources. | natural | human; capital; money |  |  | C3 framework D2.Eco (grades 3-5): natural, human and capital resources. |
| G142 | A doctor's skills and knowledge are a ___ resource. | human | natural; capital; mineral |  |  | C3 framework D2.Eco (grades 3-5): natural, human and capital resources. |
| G143 | A tractor a farmer uses to grow crops is a ___ resource. | capital | natural; human; water |  | 🚜 | C3 framework D2.Eco (grades 3-5): natural, human and capital resources. |
| G144 | A sawmill turns logs into boards. The logs come from which natural resource? | trees | rocks; oil; sand |  |  | C3 framework D2.Eco (grades 3-5): natural, human and capital resources. |
| G145 | Which one is a human resource? | a teacher's skill at teaching | a forest; a river; a hammer |  |  | C3 framework D2.Eco (grades 3-5): natural, human and capital resources. |
| G146 | Why can't every place make everything it needs? | places have different resources | every place is the same; nothing grows anywhere; there are no tools |  |  | C3 framework D2.Eco (grades 3-5): natural, human and capital resources. |
| G147 | Florida grows oranges and Idaho grows potatoes. How can people in each state get both? | by trading | by stopping all trucks; by growing only one; by closing the stores |  |  | C3 framework D2.Eco (grades 3-5): specialization and trade; imports and exports. |
| G148 | Goods a country buys from other countries are called ___. | imports | exports; taxes; savings |  |  | C3 framework D2.Eco (grades 3-5): specialization and trade; imports and exports. |
| G149 | Goods a country sells to other countries are called ___. | exports | imports; loans; wages |  |  | C3 framework D2.Eco (grades 3-5): specialization and trade; imports and exports. |
| G150 | When a region makes a lot of one thing it does well, it is ___. | specializing | borrowing; saving; voting |  |  | C3 framework D2.Eco (grades 3-5): specialization and trade; imports and exports. |
| G151 | Trucks, trains and ships help trade because they ___. | carry goods between cities and states | grow food on the way; print money; change the weather |  |  | C3 framework D2.Eco (grades 3-5): specialization and trade; imports and exports. |

| # | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|
| G152 | sort | Sort the resources: natural, or capital (a tool people made to make other things)? | **natural**: trees, water, soil; **capital**: a tractor, a factory machine, a delivery truck | Did nature make it, or did people build it? | C3 framework D2.Eco (grades 3-5): natural, human and capital resources. |
| G153 | sort | Sort the resources: natural or human? | **natural**: a river, a forest, a field of soil; **human**: a nurse's skill, a builder's work, a teacher's knowledge | Is it part of the land, or is it what a person knows how to do? | C3 framework D2.Eco (grades 3-5): natural, human and capital resources. |
| G154 | sort | Sort the regions: on the Atlantic coast, or not? | **on the Atlantic coast**: Northeast, Southeast; **not on it**: Midwest, Southwest, West | Picture the map. The Atlantic is along the east side of the country. | C3 framework D2.Geo (grades 3-5): US regions and how land and climate shape the work people do. |
| G155 | match | Match each region to what it is known for: Midwest, Southwest and Northeast. | Midwest = corn and wheat farms; Southwest = hot, dry deserts; Northeast = old cities by the sea | Think about farms in the middle, deserts in the southwest, and old cities by the sea. | C3 framework D2.Geo (grades 3-5): US regions and how land and climate shape the work people do. |
| G156 | match | Match each word to its meaning: import, export and trade. | import = to buy from another place; export = to sell to another place; trade = to swap goods or services | Im- means in, ex- means out. | C3 framework D2.Eco (grades 3-5): specialization and trade; imports and exports. |
| G157 | order | Put them in order: how does wheat from a Midwest farm become bread in a store far away? | farmers grow wheat → a mill grinds it into flour → a bakery bakes bread → trucks bring it to stores | Start in the field where the wheat grows. | C3 framework D2.Eco (grades 3-5): specialization and trade; imports and exports. |
| G158 | order | Put the regions in order from east to west. | Northeast → Midwest → West | Start on the Atlantic coast. | C3 framework D2.Geo (grades 3-5): US regions and how land and climate shape the work people do. |

## Discover: Volcano Ridge, a new world for grade 6

World: **Volcano Ridge** (🌋), right after Star Observatory. Grade 6 children start here. Items are not read aloud with their choices (as in Star Observatory); the child can tap the speaker to hear the question. A "Picture" is a small drawing of the question's subject above it, never of the answer.

### Food Webs & Balance (`sci_web` 1), Science, grade 6

| # | Question | Answer | Wrong choices | Hint (when not the topic hint) | Picture | Why |
|---|---|---|---|---|---|---|
| G159 | In an energy pyramid, which level has the most energy? | the producers at the bottom | the top predators; the middle consumers; the large hunters at the very top |  |  | NGSS MS-LS2-3: energy flows and matter cycles through producers, consumers and decomposers; only about a tenth of the energy passes up each level. |
| G160 | About how much of the energy at one level of an energy pyramid passes up to the next level? | 10 percent | 90 percent; all of it; none of it |  |  | NGSS MS-LS2-3: energy flows and matter cycles through producers, consumers and decomposers; only about a tenth of the energy passes up each level. |
| G161 | Most of the energy at each level is not passed up. Where does it go? | it is used for living and lost as heat | it turns into soil; it goes back to the Sun; it is saved forever inside the animal |  |  | NGSS MS-LS2-3: energy flows and matter cycles through producers, consumers and decomposers; only about a tenth of the energy passes up each level. |
| G162 | Why are there fewer hawks than mice in a field? | less energy reaches the top level | hawks are younger; mice hunt hawks; hawks never eat |  |  | NGSS MS-LS2-3: energy flows and matter cycles through producers, consumers and decomposers; only about a tenth of the energy passes up each level. |
| G163 | A bear eats berries, fish and insects. This makes it ___. | an omnivore | a herbivore; a producer; a decomposer |  | 🐻 | NGSS MS-LS2-3: energy flows and matter cycles through producers, consumers and decomposers; only about a tenth of the energy passes up each level. |
| G164 | Fungi and bacteria break down dead things and return nutrients to the soil. They are ___. | decomposers | producers; predators; herbivores |  | 🍄 | NGSS MS-LS2-3: energy flows and matter cycles through producers, consumers and decomposers; only about a tenth of the energy passes up each level. |
| G165 | In a food web, an arrow points from the grass to the grasshopper. What does the arrow show? | which way the energy flows | where the grasshopper lives; how tall the grass grows; which one is older |  |  | NGSS MS-LS2-3: energy flows and matter cycles through producers, consumers and decomposers; only about a tenth of the energy passes up each level. |
| G166 | A tick feeds on a dog's blood and harms the dog. This relationship is ___. | parasitism | mutualism; commensalism; competition |  |  | NGSS MS-LS2-2: patterns of interaction: predation, competition, mutualism, commensalism and parasitism. |
| G167 | A bird builds a nest in a tree. The bird is helped and the tree is not affected. This is ___. | commensalism | parasitism; mutualism; predation |  | 🌳 | NGSS MS-LS2-2: patterns of interaction: predation, competition, mutualism, commensalism and parasitism. |
| G168 | Bees get nectar from flowers and carry pollen between them. Both are helped. This is ___. | mutualism | parasitism; commensalism; predation |  | 🐝 | NGSS MS-LS2-2: patterns of interaction: predation, competition, mutualism, commensalism and parasitism. |
| G169 | An owl hunts and eats a mouse. In this relationship the owl is the ___. | predator | prey; producer; parasite |  | 🦉 | NGSS MS-LS2-2: patterns of interaction: predation, competition, mutualism, commensalism and parasitism. |
| G170 | In parasitism, the living thing that is harmed is called the ___. | host | predator; producer; partner |  |  | NGSS MS-LS2-2: patterns of interaction: predation, competition, mutualism, commensalism and parasitism. |
| G171 | Sea otters eat sea urchins, and sea urchins eat kelp. What happens to the kelp if the otters disappear? | it gets eaten away | it grows faster; it stays the same; it spreads farther |  |  | NGSS MS-LS2-2: patterns of interaction: predation, competition, mutualism, commensalism and parasitism. |
| G172 | Anything that keeps a population from growing larger, like a shortage of food or space, is a ___. | limiting factor | food chain; habitat; producer |  |  | NGSS MS-LS2-1: resource availability limits populations (limiting factors, carrying capacity). |
| G173 | The largest population an area can support over time is its ___. | carrying capacity | food web; energy pyramid; habitat size |  |  | NGSS MS-LS2-1: resource availability limits populations (limiting factors, carrying capacity). |
| G174 | A dry summer leaves little grass on a prairie. What will likely happen to the number of prairie dogs? | it will go down | it will go up; it will double; it will stay exactly the same |  |  | NGSS MS-LS2-1: resource availability limits populations (limiting factors, carrying capacity). |
| G175 | Deer have plenty of food and no wolves nearby. Their population will likely ___. | grow | shrink; disappear; stay tiny |  |  | NGSS MS-LS2-1: resource availability limits populations (limiting factors, carrying capacity). |
| G176 | Two kinds of birds want the same few nesting holes in old trees. What are they competing for? | shelter | water; sunlight; food |  |  | NGSS MS-LS2-1: resource availability limits populations (limiting factors, carrying capacity). |
| G177 | Wolves were brought back to a park and began hunting elk there. Over time the number of elk ___. | went down | went up; doubled; stayed the same |  |  | NGSS MS-LS2-1: resource availability limits populations (limiting factors, carrying capacity). |
| G178 | Which is a non-living factor that can limit a population? | the amount of water | the number of hawks; the number of mice; a disease germ |  |  | NGSS MS-LS2-1: resource availability limits populations (limiting factors, carrying capacity). |

| # | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|
| G179 | sort | Sort the living things: producer or consumer? | **producer**: grass, an oak tree, algae; **consumer**: a hawk, a deer, a grasshopper | Does it make its own food from sunlight, or does it eat other living things? | NGSS MS-LS2-3: energy flows and matter cycles through producers, consumers and decomposers; only about a tenth of the energy passes up each level. |
| G180 | sort | Sort the eaters: herbivore or carnivore? | **herbivore**: a deer, a rabbit, a cow; **carnivore**: a wolf, a shark, an eagle | Does it eat plants, or other animals? | NGSS MS-LS2-3: energy flows and matter cycles through producers, consumers and decomposers; only about a tenth of the energy passes up each level. |
| G181 | sort | Sort them: does it help a deer population grow, or make it shrink? | **grow**: plenty of food, a mild winter, lots of space; **shrink**: more wolves, a long drought, a disease | Does it give the deer more of what they need, or take something away? | NGSS MS-LS2-1: resource availability limits populations (limiting factors, carrying capacity). |
| G182 | match | Match each relationship to an example: mutualism, commensalism and parasitism. | mutualism = bees and flowers; commensalism = a bird nesting in a tree; parasitism = a tick on a dog | Both helped, one helped and one not affected, or one helped and one harmed. | NGSS MS-LS2-2: patterns of interaction: predation, competition, mutualism, commensalism and parasitism. |
| G183 | match | Match each role to an example: producer, consumer and decomposer. | producer = grass; consumer = a fox; decomposer = a mushroom | One makes food, one eats food, and one breaks down what is left. | NGSS MS-LS2-3: energy flows and matter cycles through producers, consumers and decomposers; only about a tenth of the energy passes up each level. |
| G184 | order | Put the food chain in order, starting with where the energy comes from. | the Sun → grass → grasshopper → frog → snake | Start in the sky, then the plant, then follow who eats whom. | NGSS MS-LS2-3: energy flows and matter cycles through producers, consumers and decomposers; only about a tenth of the energy passes up each level. |
| G185 | order | Put the levels of an energy pyramid in order from most energy to least. | producers → plant eaters → animals that eat plant eaters → top predators | Start at the wide bottom of the pyramid. | NGSS MS-LS2-3: energy flows and matter cycles through producers, consumers and decomposers; only about a tenth of the energy passes up each level. |

### Inside the Earth (`sci_deep` 1), Science, grade 6

| # | Question | Answer | Wrong choices | Hint (when not the topic hint) | Picture | Why |
|---|---|---|---|---|---|---|
| G186 | As you go deeper inside Earth, the temperature ___. | goes up | goes down; stays the same; drops to freezing |  |  | NGSS MS-ESS2-1 and MS-ESS2-3 (with USGS): Earth's layers, heat and pressure; how earthquake waves show what is inside. |
| G187 | The stiff outer shell made of the crust and the very top of the mantle is the ___. | lithosphere | atmosphere; hydrosphere; inner core |  |  | NGSS MS-ESS2-1 and MS-ESS2-3 (with USGS): Earth's layers, heat and pressure; how earthquake waves show what is inside. |
| G188 | The soft, slowly flowing part of the mantle that the plates ride on is the ___. | asthenosphere | crust; inner core; ozone layer |  |  | NGSS MS-ESS2-1 and MS-ESS2-3 (with USGS): Earth's layers, heat and pressure; how earthquake waves show what is inside. |
| G189 | The inner core is hotter than the outer core, but it is solid. Why? | the pressure there is so great | it is made of ice; it is far from the Sun; it is cooled by the ocean above it |  |  | NGSS MS-ESS2-1 and MS-ESS2-3 (with USGS): Earth's layers, heat and pressure; how earthquake waves show what is inside. |
| G190 | Earth's core is made mostly of the metals iron and ___. | nickel | gold; silver; copper |  |  | NGSS MS-ESS2-1 and MS-ESS2-3 (with USGS): Earth's layers, heat and pressure; how earthquake waves show what is inside. |
| G191 | How do scientists learn about Earth's deep layers, where no one has ever been? | by studying earthquake waves | by digging to the center; by looking with telescopes; by drilling a hole all the way through |  |  | NGSS MS-ESS2-1 and MS-ESS2-3 (with USGS): Earth's layers, heat and pressure; how earthquake waves show what is inside. |
| G192 | Which part of Earth do we live on? | the crust | the mantle; the outer core; the inner core |  |  | NGSS MS-ESS2-1 and MS-ESS2-3 (with USGS): Earth's layers, heat and pressure; how earthquake waves show what is inside. |
| G193 | Heat from deep inside Earth makes mantle rock flow in slow loops called ___. | convection currents | ocean waves; jet streams; tides |  |  | NGSS MS-ESS2-2 and MS-ESS2-3 (with USGS): plate motion driven by heat in the mantle; ridges, trenches, hot spots and mountains. |
| G194 | Along the mid-ocean ridge, plates pull apart and new ___ forms. | seafloor | ice sheet; coral reef; sand dune |  |  | NGSS MS-ESS2-2 and MS-ESS2-3 (with USGS): plate motion driven by heat in the mantle; ridges, trenches, hot spots and mountains. |
| G195 | A deep ocean trench forms where one plate ___. | sinks under another | pulls away from another; slides past another; stops moving |  |  | NGSS MS-ESS2-2 and MS-ESS2-3 (with USGS): plate motion driven by heat in the mantle; ridges, trenches, hot spots and mountains. |
| G196 | The Hawaiian Islands formed as a plate moved slowly over a ___. | hot spot | trench; glacier; cold front |  |  | NGSS MS-ESS2-2 and MS-ESS2-3 (with USGS): plate motion driven by heat in the mantle; ridges, trenches, hot spots and mountains. |
| G197 | The Himalaya Mountains are still growing taller because two plates are ___. | pushing together | pulling apart; sliding past each other; standing still |  | 🏔 | NGSS MS-ESS2-2 and MS-ESS2-3 (with USGS): plate motion driven by heat in the mantle; ridges, trenches, hot spots and mountains. |
| G198 | Earth's plates move very slowly, about as fast as ___. | your fingernails grow | a person walks; a river flows; a snail crawls |  |  | NGSS MS-ESS2-2 and MS-ESS2-3 (with USGS): plate motion driven by heat in the mantle; ridges, trenches, hot spots and mountains. |
| G199 | In East Africa, the land is slowly splitting as two plates pull apart. This makes a long ___. | rift valley | sand dune; coral reef; ice sheet |  |  | NGSS MS-ESS2-2 and MS-ESS2-3 (with USGS): plate motion driven by heat in the mantle; ridges, trenches, hot spots and mountains. |
| G200 | Hot, melted rock rising up from the mantle can break through the crust and form a ___. | volcano | glacier; canyon; delta |  |  | NGSS MS-ESS2-2 and MS-ESS2-3 (with USGS): plate motion driven by heat in the mantle; ridges, trenches, hot spots and mountains. |
| G201 | An earthquake under the ocean can push up a giant wave called a ___. | tsunami | hurricane; tornado; high tide |  |  | NGSS MS-ESS3-2 (with USGS and Ready.gov safety advice): earthquakes and tsunamis, and how people lower the risk. |
| G202 | If you feel an earthquake indoors, what should you do? | drop, cover and hold on | run outside right away; stand by a window; ride the elevator down |  |  | NGSS MS-ESS3-2 (with USGS and Ready.gov safety advice): earthquakes and tsunamis, and how people lower the risk. |
| G203 | The point deep underground where an earthquake begins is the ___. | focus | epicenter; crater; summit |  |  | NGSS MS-ESS3-2 (with USGS and Ready.gov safety advice): earthquakes and tsunamis, and how people lower the risk. |
| G204 | Most earthquakes happen when rocks along a ___ suddenly slip. | fault | river; cloud; cave |  |  | NGSS MS-ESS3-2 (with USGS and Ready.gov safety advice): earthquakes and tsunamis, and how people lower the risk. |
| G205 | Why do people use bendable steel frames for buildings in places with many earthquakes? | so they bend instead of breaking | so they look shiny; so they cost less; so they stay warm in the winter months |  |  | NGSS MS-ESS3-2 (with USGS and Ready.gov safety advice): earthquakes and tsunamis, and how people lower the risk. |
| G206 | Scientists cannot yet predict the exact day of an earthquake, but they can ___. | map where earthquakes are likely | stop earthquakes from happening; make earthquakes smaller; move the plates back |  |  | NGSS MS-ESS3-2 (with USGS and Ready.gov safety advice): earthquakes and tsunamis, and how people lower the risk. |

| # | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|
| G207 | sort | Sort the layers: solid, or liquid or soft? | **solid**: crust, inner core; **liquid or soft**: outer core, asthenosphere | The very middle is squeezed so hard it stays solid. The part around it is melted metal. | NGSS MS-ESS2-1 and MS-ESS2-3 (with USGS): Earth's layers, heat and pressure; how earthquake waves show what is inside. |
| G208 | sort | Sort them: does it form where plates pull apart, or where they push together? | **pull apart**: mid-ocean ridge, rift valley; **push together**: ocean trench, Himalaya Mountains | New crust fills a gap. Crashing plates fold up or one sinks. | NGSS MS-ESS2-2 and MS-ESS2-3 (with USGS): plate motion driven by heat in the mantle; ridges, trenches, hot spots and mountains. |
| G209 | sort | Sort them: safe or not safe to do in an earthquake? | **safe to do**: drop to the floor, cover your head, hold on to a table; **not safe**: stand by a window, run down the stairs, use the elevator | Stay low, protect your head, and keep away from glass. | NGSS MS-ESS3-2 (with USGS and Ready.gov safety advice): earthquakes and tsunamis, and how people lower the risk. |
| G210 | match | Match each boundary to how the plates move: divergent, convergent and transform. | divergent = pull apart; convergent = push together; transform = slide past | Diverge means to go apart; converge means to come together. | NGSS MS-ESS2-2 and MS-ESS2-3 (with USGS): plate motion driven by heat in the mantle; ridges, trenches, hot spots and mountains. |
| G211 | match | Match each layer to what it is like: crust, mantle and outer core. | crust = thin and rocky; mantle = thick hot rock that flows slowly; outer core = liquid metal | One is thin, one is thick, and one is melted. | NGSS MS-ESS2-1 and MS-ESS2-3 (with USGS): Earth's layers, heat and pressure; how earthquake waves show what is inside. |
| G212 | order | Put Earth's layers in order from the surface to the center. | crust → mantle → outer core → inner core | Start where you are standing. | NGSS MS-ESS2-1 and MS-ESS2-3 (with USGS): Earth's layers, heat and pressure; how earthquake waves show what is inside. |
| G213 | order | Put them in order: what happens in an undersea earthquake? | rocks slip along a fault → the seafloor jerks up → a tsunami wave forms → the wave reaches the shore | Start deep under the seafloor. | NGSS MS-ESS3-2 (with USGS and Ready.gov safety advice): earthquakes and tsunamis, and how people lower the risk. |

### Weather Systems (`sci_storm` 1), Science, grade 6

| # | Question | Answer | Wrong choices | Hint (when not the topic hint) | Picture | Why |
|---|---|---|---|---|---|---|
| G214 | A huge body of air with about the same temperature and moisture all through it is called ___. | an air mass | a jet stream; an ocean current; a cold snap |  |  | NGSS MS-ESS2-5 (with the National Weather Service): air masses meet at fronts and change the weather. |
| G215 | An air mass that forms over the warm Gulf of Mexico is ___. | warm and humid | cold and dry; cold and humid; warm and dry |  |  | NGSS MS-ESS2-5 (with the National Weather Service): air masses meet at fronts and change the weather. |
| G216 | The boundary where two different air masses meet is called a ___. | front | fault; current; crest |  |  | NGSS MS-ESS2-5 (with the National Weather Service): air masses meet at fronts and change the weather. |
| G217 | A cold front moves in fast. What weather often comes with it? | thunderstorms, then cooler air | a long, warm, sunny week; thick fog all day; light drizzle that lasts for many days |  |  | NGSS MS-ESS2-5 (with the National Weather Service): air masses meet at fronts and change the weather. |
| G218 | When a warm front passes, the weather usually becomes ___. | warmer | colder; much windier; frozen |  |  | NGSS MS-ESS2-5 (with the National Weather Service): air masses meet at fronts and change the weather. |
| G219 | In winter, an air mass from northern Canada brings ___ weather. | cold, dry | hot, humid; warm, rainy; hot, dry |  |  | NGSS MS-ESS2-5 (with the National Weather Service): air masses meet at fronts and change the weather. |
| G220 | Wind blows from areas of ___. | high pressure to low pressure | low pressure to high pressure; cold water to warm water; day to night |  |  | NGSS MS-ESS2-5 (with the National Weather Service): air pressure, wind and clouds. |
| G221 | A high-pressure system usually brings ___. | clear, fair weather | heavy storms; thick clouds; rain all week |  |  | NGSS MS-ESS2-5 (with the National Weather Service): air pressure, wind and clouds. |
| G222 | In a low-pressure system, air rises and cools and forms ___. | clouds | clear skies; dry dust; rainbows |  |  | NGSS MS-ESS2-5 (with the National Weather Service): air pressure, wind and clouds. |
| G223 | A falling barometer reading often means ___. | stormy weather is coming | sunny weather is coming; the air is getting drier; it will be hot and still |  |  | NGSS MS-ESS2-5 (with the National Weather Service): air pressure, wind and clouds. |
| G224 | Hurricanes form over ___. | warm ocean water | cold, dry land; icy polar seas; high mountains |  |  | NGSS MS-ESS3-2 (with NOAA): how storms form and how they are forecast. The 5-second rule for thunder is the National Weather Service's. |
| G225 | Why does a hurricane get weaker when it moves over land? | it loses its supply of warm, moist air | the land pushes it back; trees soak up its wind; mountains freeze it |  |  | NGSS MS-ESS3-2 (with NOAA): how storms form and how they are forecast. The 5-second rule for thunder is the National Weather Service's. |
| G226 | The calm center of a hurricane is called the ___. | eye | eyewall; rain band; front |  |  | NGSS MS-ESS3-2 (with NOAA): how storms form and how they are forecast. The 5-second rule for thunder is the National Weather Service's. |
| G227 | A spinning column of air that reaches from a thunderstorm down to the ground is a ___. | tornado | hurricane; blizzard; monsoon |  |  | NGSS MS-ESS3-2 (with NOAA): how storms form and how they are forecast. The 5-second rule for thunder is the National Weather Service's. |
| G228 | You see lightning and count 10 seconds before the thunder. About how far away is the storm? | 2 miles | 10 miles; 50 miles; right overhead |  |  | NGSS MS-ESS3-2 (with NOAA): how storms form and how they are forecast. The 5-second rule for thunder is the National Weather Service's. |
| G229 | Scientists who study and forecast the weather are called ___. | meteorologists | geologists; astronomers; botanists |  |  | NGSS MS-ESS3-2 (with NOAA): how storms form and how they are forecast. The 5-second rule for thunder is the National Weather Service's. |
| G230 | A blizzard is a storm with strong winds and ___. | lots of blowing snow | hot sunshine; falling leaves; dust only |  |  | NGSS MS-ESS3-2 (with NOAA): how storms form and how they are forecast. The 5-second rule for thunder is the National Weather Service's. |
| G231 | Over most of the United States, weather usually moves from ___. | west to east | east to west; north to south only; the sea to the mountains |  |  | NGSS MS-ESS2-6 (with NOAA): the land, the oceans and the atmosphere shape weather and climate (sea breezes, rain shadows, ocean currents, the jet stream). |
| G232 | The jet stream is a band of very fast wind ___. | high up in the atmosphere | deep under the ocean; inside a tornado; just above the treetops in a forest |  |  | NGSS MS-ESS2-6 (with NOAA): the land, the oceans and the atmosphere shape weather and climate (sea breezes, rain shadows, ocean currents, the jet stream). |
| G233 | On a sunny afternoon at the beach, a cool wind often blows from the sea toward the land. Why? | the land heats up faster than the water | the sea is warmer than the land; the sand cools the air; the Moon pulls the wind |  |  | NGSS MS-ESS2-6 (with NOAA): the land, the oceans and the atmosphere shape weather and climate (sea breezes, rain shadows, ocean currents, the jet stream). |
| G234 | Moist air rises up the side of a tall mountain and drops rain. The other side of the mountain is often ___. | dry | very wet; frozen solid; covered in lakes |  | 🏔 | NGSS MS-ESS2-6 (with NOAA): the land, the oceans and the atmosphere shape weather and climate (sea breezes, rain shadows, ocean currents, the jet stream). |
| G235 | A warm ocean current called the Gulf Stream flows up the East Coast and across the Atlantic. It makes the places it passes ___. | milder in winter | colder in winter; drier all year; windless |  |  | NGSS MS-ESS2-6 (with NOAA): the land, the oceans and the atmosphere shape weather and climate (sea breezes, rain shadows, ocean currents, the jet stream). |

| # | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|
| G236 | sort | Sort the clues: is fair weather or stormy weather on the way? | **fair**: rising air pressure, a high-pressure system, clear skies to the west; **stormy**: falling air pressure, a cold front coming, dark clouds building | Rising pressure means sinking, settled air. Falling pressure means rising air and clouds. | NGSS MS-ESS2-5 (with the National Weather Service): air pressure, wind and clouds. |
| G237 | sort | Sort the weather words: about air pressure, or about water in the air? | **air pressure**: barometer, high-pressure system, low-pressure system; **water in the air**: humidity, dew point, precipitation | Is it about how hard the air presses down, or about wet air, drops and dew? | NGSS MS-ESS2-5 (with the National Weather Service): air pressure, wind and clouds. |
| G238 | sort | Sort the air masses: warm or cold? | **warm**: air from the Gulf of Mexico, air from the desert Southwest; **cold**: air from northern Canada, air from the Arctic | Think about where each one comes from: near the equator, or near the North Pole? | NGSS MS-ESS2-5 (with the National Weather Service): air masses meet at fronts and change the weather. |
| G239 | match | Match each weather system to what it often brings: cold front, warm front and high-pressure system. | cold front = short, strong storms; warm front = long, gentle rain; high-pressure system = clear skies | One is quick and stormy, one is slow and gentle, and one is calm. | NGSS MS-ESS2-5 (with the National Weather Service): air masses meet at fronts and change the weather. |
| G240 | match | Match each storm to what it is: hurricane, tornado and blizzard. | hurricane = a huge storm that forms over warm seas; tornado = a spinning funnel of wind; blizzard = a snowstorm with strong wind | One forms over the sea, one is a narrow funnel, and one is cold and white. | NGSS MS-ESS3-2 (with NOAA): how storms form and how they are forecast. The 5-second rule for thunder is the National Weather Service's. |
| G241 | order | Put them in order: how does a hurricane form and end? | warm, moist air rises over the ocean → storm clouds begin to spin → the storm grows stronger at sea → it reaches land and weakens | Start over the warm sea, and end on land. | NGSS MS-ESS3-2 (with NOAA): how storms form and how they are forecast. The 5-second rule for thunder is the National Weather Service's. |
| G242 | order | Put them in order: what happens as a cold front passes a town? | warm air sits over the town → cold air pushes in and lifts the warm air → thunderstorms form → cooler, drier air arrives | Start with the air that is there before the front arrives. | NGSS MS-ESS2-5 (with the National Weather Service): air masses meet at fronts and change the weather. |

### Water & Resources (`sci_wres` 1), Science, grade 6

| # | Question | Answer | Wrong choices | Hint (when not the topic hint) | Picture | Why |
|---|---|---|---|---|---|---|
| G243 | All the land that drains into one river or lake is called a ___. | watershed | water table; flood plain; delta |  |  | NGSS MS-ESS2-4 and MS-ESS3-1 (with USGS): where water goes and how much of it is fresh. |
| G244 | Rain soaks into the ground and fills spaces in rock and sand. This water is called ___. | groundwater | runoff; water vapor; sea water |  |  | NGSS MS-ESS2-4 and MS-ESS3-1 (with USGS): where water goes and how much of it is fresh. |
| G245 | A layer of rock or sand underground that holds lots of water is called ___. | an aquifer | a glacier; a canyon; a river delta |  |  | NGSS MS-ESS2-4 and MS-ESS3-1 (with USGS): where water goes and how much of it is fresh. |
| G246 | Most of the fresh water on Earth is frozen in ___. | glaciers and ice caps | lakes and rivers; clouds; deep underground caves |  |  | NGSS MS-ESS2-4 and MS-ESS3-1 (with USGS): where water goes and how much of it is fresh. |
| G247 | About how much of Earth's water is fresh water? | 3 percent or less | half of it; almost all of it; about 75 percent |  |  | NGSS MS-ESS2-4 and MS-ESS3-1 (with USGS): where water goes and how much of it is fresh. |
| G248 | Pollution dumped into a stream far upstream can harm people who live ___. | downstream | upstream; on mountaintops; far uphill |  |  | NGSS MS-ESS2-4 and MS-ESS3-1 (with USGS): where water goes and how much of it is fresh. |
| G249 | People pump water out of an aquifer faster than rain can refill it. The water table will ___. | drop | rise; freeze; stay the same |  |  | NGSS MS-ESS2-4 and MS-ESS3-1 (with USGS): where water goes and how much of it is fresh. |
| G250 | Oil and natural gas formed from tiny ocean plants and animals buried long ago. So they are often found where ___. | ancient seas once were | volcanoes erupt today; rainforests grow today; cities are built |  |  | NGSS MS-ESS3-1: Earth's resources are spread unevenly because of the processes that formed them. |
| G251 | Why do some countries have lots of oil while others have almost none? | it formed only where conditions were right | oil grows back each year; people moved it there; it falls from the sky |  |  | NGSS MS-ESS3-1: Earth's resources are spread unevenly because of the processes that formed them. |
| G252 | Rich farm soil is often found near rivers because floods leave behind ___. | fresh mud full of nutrients | sharp rocks; salt crystals; dry dust |  |  | NGSS MS-ESS3-1: Earth's resources are spread unevenly because of the processes that formed them. |
| G253 | Metal ores, like iron and copper, are dug out of the ground in a ___. | mine | well; dam; farm |  |  | NGSS MS-ESS3-1: Earth's resources are spread unevenly because of the processes that formed them. |
| G254 | A resource that people use faster than nature can replace it will ___. | run low or run out | last forever; grow larger; turn into a new one |  |  | NGSS MS-ESS3-1: Earth's resources are spread unevenly because of the processes that formed them. |
| G255 | Wind farms are often built on open plains and coasts because ___. | the wind is strong and steady there | the land is very wet; there are many trees; it is always dark |  |  | NGSS MS-ESS3-1: Earth's resources are spread unevenly because of the processes that formed them. |
| G256 | Fertilizer washing off farms into a lake can cause ___. | too much algae to grow | the lake to freeze; fish to grow bigger; the water to turn sweet |  |  | NGSS MS-ESS3-3: people change the environment, and can design ways to protect it. |
| G257 | Cutting down a whole forest on a hillside can lead to ___. | more soil erosion | more rain; cleaner rivers; stronger tree roots |  |  | NGSS MS-ESS3-3: people change the environment, and can design ways to protect it. |
| G258 | Which choice helps protect a river's water? | keeping chemicals out of storm drains | washing paint into the gutter; cutting trees by the banks; dumping oil on the ground |  |  | NGSS MS-ESS3-3: people change the environment, and can design ways to protect it. |
| G259 | Farmers plant rows across a slope, not up and down it, to ___. | slow water and save soil | make the field look nice; help weeds grow; keep birds away |  |  | NGSS MS-ESS3-3: people change the environment, and can design ways to protect it. |
| G260 | A city's treatment plant takes in river water and ___. | cleans it so it is safe to drink | pumps oil out of it; makes electricity from it; turns it into soil |  |  | NGSS MS-ESS3-3: people change the environment, and can design ways to protect it. |
| G261 | Planting new trees where a forest was cut down is called ___. | reforestation | deforestation; irrigation; erosion |  |  | NGSS MS-ESS3-3: people change the environment, and can design ways to protect it. |
| G262 | A city builds bike lanes and better buses. This helps ___. | cut air pollution from cars | make more traffic; use more gasoline; make the air dirtier and smokier |  |  | NGSS MS-ESS3-3: people change the environment, and can design ways to protect it. |

| # | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|
| G263 | sort | Sort them: does it help keep water clean, or make it dirty? | **keeps it clean**: picking up litter, a water treatment plant, planting trees by streams; **makes it dirty**: oil spilled on a road, too much fertilizer, trash in a storm drain | Think about what ends up in the stream after it rains. | NGSS MS-ESS3-3: people change the environment, and can design ways to protect it. |
| G264 | sort | Sort the water: fresh water or salt water? | **fresh**: a glacier, a river, an aquifer; **salt**: the ocean, a sea, the Great Salt Lake | Could you drink it after it is cleaned, or is it full of salt? | NGSS MS-ESS2-4 and MS-ESS3-1 (with USGS): where water goes and how much of it is fresh. |
| G265 | match | Match each word to its meaning: watershed, aquifer and runoff. | watershed = land that drains into one river; aquifer = underground rock that holds water; runoff = rain that flows over the ground | One is land, one is under the ground, and one flows over the ground. | NGSS MS-ESS2-4 and MS-ESS3-1 (with USGS): where water goes and how much of it is fresh. |
| G266 | match | Match each resource to where it is often found: oil, rich soil and iron ore. | oil = where ancient seas were; rich soil = along rivers that flood; iron ore = in rock dug from mines | Think about how each one was made: by old seas, by floods, or in rock. | NGSS MS-ESS3-1: Earth's resources are spread unevenly because of the processes that formed them. |
| G267 | order | Put them in order: how does rain become well water? | rain falls → it soaks into the soil → it fills spaces in rock underground → a well pumps it up | Start in the sky and end at the pump. | NGSS MS-ESS2-4 and MS-ESS3-1 (with USGS): where water goes and how much of it is fresh. |
| G268 | order | Put them in order: how does a city clean its drinking water? | water comes in from a river or lake → dirt settles to the bottom → filters catch tiny bits → it is treated to kill germs → it flows to homes | Start where the water is taken in, and end at the tap. | NGSS MS-ESS3-3: people change the environment, and can design ways to protect it. |

### Early River Valleys (`civ_river` 1), Social studies, grade 6

| # | Question | Answer | Wrong choices | Hint (when not the topic hint) | Picture | Why |
|---|---|---|---|---|---|---|
| G269 | The name Mesopotamia means "the land between the ___." | rivers | mountains; seas; deserts |  |  | C3 framework D2.Geo and D2.His (grades 6-8): the early river-valley civilizations of Mesopotamia, Egypt, the Indus Valley and China. |
| G270 | Mesopotamia grew up between which two rivers? | the Tigris and the Euphrates | the Nile and the Amazon; the Indus and the Ganges; the Mississippi and the Ohio |  |  | C3 framework D2.Geo and D2.His (grades 6-8): the early river-valley civilizations of Mesopotamia, Egypt, the Indus Valley and China. |
| G271 | Ancient Egypt grew up along the ___ River. | Nile | Amazon; Yellow; Indus |  |  | C3 framework D2.Geo and D2.His (grades 6-8): the early river-valley civilizations of Mesopotamia, Egypt, the Indus Valley and China. |
| G272 | Every year the Nile flooded and left behind ___. | rich, dark soil | piles of gold; sharp rocks; a layer of salty sand |  |  | C3 framework D2.Geo and D2.His (grades 6-8): the early river-valley civilizations of Mesopotamia, Egypt, the Indus Valley and China. |
| G273 | Early Chinese civilization began along the Yellow River, also called the ___. | Huang He | Nile; Tigris; Mississippi |  |  | C3 framework D2.Geo and D2.His (grades 6-8): the early river-valley civilizations of Mesopotamia, Egypt, the Indus Valley and China. |
| G274 | Why did early farmers dig canals from rivers? | to bring water to their fields | to keep fish as pets; to make the river saltier; to stop the rain |  |  | C3 framework D2.Geo and D2.His (grades 6-8): the early river-valley civilizations of Mesopotamia, Egypt, the Indus Valley and China. |
| G275 | The ancient cities of Harappa and Mohenjo-daro were along the ___ River. | Indus | Nile; Tigris; Yellow |  |  | C3 framework D2.Geo and D2.His (grades 6-8): the early river-valley civilizations of Mesopotamia, Egypt, the Indus Valley and China. |
| G276 | The Yellow River was sometimes called "China's Sorrow" because ___. | its floods could destroy farms and towns | its water was too salty to use; it had no fish; it was too small for boats |  |  | C3 framework D2.Geo and D2.His (grades 6-8): the early river-valley civilizations of Mesopotamia, Egypt, the Indus Valley and China. |
| G277 | The people of Sumer, in Mesopotamia, wrote by pressing marks into wet clay. This writing is called ___. | cuneiform | hieroglyphs; the alphabet; Morse code |  |  | C3 framework D2.His (grades 6-8): writing, laws and inventions of early civilizations. |
| G278 | Ancient Egyptians wrote with picture signs called ___. | hieroglyphs | cuneiform; Latin letters; numbers |  |  | C3 framework D2.His (grades 6-8): writing, laws and inventions of early civilizations. |
| G279 | Egyptians wrote on sheets made from a reed plant called ___. | papyrus | bamboo; cotton; maple bark |  |  | C3 framework D2.His (grades 6-8): writing, laws and inventions of early civilizations. |
| G280 | Hammurabi, a king of Babylon, is famous for writing down a set of ___. | laws | songs; recipes; maps |  |  | C3 framework D2.His (grades 6-8): writing, laws and inventions of early civilizations. |
| G281 | Which invention from ancient Mesopotamia helped carts and potters? | the wheel | the airplane; the light bulb; the telephone |  |  | C3 framework D2.His (grades 6-8): writing, laws and inventions of early civilizations. |
| G282 | Why did early people begin to write? | to keep records of crops, trade and laws | to decorate their caves for fun; to stop speaking; to count stars only |  |  | C3 framework D2.His (grades 6-8): writing, laws and inventions of early civilizations. |
| G283 | The great pyramids of Egypt were built as ___. | tombs for pharaohs | homes for farmers; schools; markets |  |  | C3 framework D2.His and D2.Eco (grades 6-8): food surplus, new jobs and the growth of cities. |
| G284 | A ruler of ancient Egypt was called a ___. | pharaoh | senator; mayor; president |  |  | C3 framework D2.His and D2.Eco (grades 6-8): food surplus, new jobs and the growth of cities. |
| G285 | When farmers grew more food than they needed, they had a ___. | surplus | shortage; drought; famine |  |  | C3 framework D2.His and D2.Eco (grades 6-8): food surplus, new jobs and the growth of cities. |
| G286 | Because not everyone had to farm, some people could work as ___. | potters, weavers and traders | factory workers; train drivers; computer coders |  |  | C3 framework D2.His and D2.Eco (grades 6-8): food surplus, new jobs and the growth of cities. |
| G287 | Having different people do different jobs is called ___. | specialization | irrigation; migration; transportation |  |  | C3 framework D2.His and D2.Eco (grades 6-8): food surplus, new jobs and the growth of cities. |
| G288 | Early cities built walls around them mostly for ___. | protection | decoration; shade; keeping cool |  |  | C3 framework D2.His and D2.Eco (grades 6-8): food surplus, new jobs and the growth of cities. |
| G289 | The streets of Mohenjo-daro were laid out in a grid, and many houses had ___. | drains for waste water | electric lights; glass windows; elevators |  |  | C3 framework D2.His and D2.Eco (grades 6-8): food surplus, new jobs and the growth of cities. |
| G290 | People in Mesopotamia built tall stepped towers of mud brick called ___. | ziggurats | pyramids; castles; skyscrapers |  |  | C3 framework D2.His and D2.Eco (grades 6-8): food surplus, new jobs and the growth of cities. |

| # | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|
| G291 | sort | Sort them: Mesopotamia or Egypt? | **Mesopotamia**: cuneiform, ziggurats, Code of Hammurabi; **Egypt**: hieroglyphs, pyramids, pharaohs | One wrote on clay and built stepped towers; the other wrote in pictures by the Nile. | C3 framework D2.His (grades 6-8): writing, laws and inventions of early civilizations. |
| G292 | sort | Sort them: part of nature, or made by people? | **part of nature**: the Nile River, yearly floods, rich soil; **made by people**: canals, pyramids, clay tablets | Was it there before anyone lived there, or did people build or make it? | C3 framework D2.Geo and D2.His (grades 6-8): the early river-valley civilizations of Mesopotamia, Egypt, the Indus Valley and China. |
| G293 | match | Match each river to its civilization: Nile, Tigris and Euphrates, and Huang He. | Nile = Egypt; Tigris and Euphrates = Mesopotamia; Huang He = China | Picture Africa, the land between two rivers, and China. | C3 framework D2.Geo and D2.His (grades 6-8): the early river-valley civilizations of Mesopotamia, Egypt, the Indus Valley and China. |
| G294 | match | Match each word to its meaning: cuneiform, hieroglyphs and papyrus. | cuneiform = marks pressed in clay; hieroglyphs = picture signs; papyrus = sheets made from reeds | Two are kinds of writing; one is what people wrote on. | C3 framework D2.His (grades 6-8): writing, laws and inventions of early civilizations. |
| G295 | order | Put them in order: how did farming lead to cities? | people learned to farm → farmers grew extra food → some people did other jobs → towns grew into cities | Start with growing food. | C3 framework D2.His and D2.Eco (grades 6-8): food surplus, new jobs and the growth of cities. |
| G296 | order | Put a year by the Nile in order. | the river floods → the water goes down → farmers plant in the wet soil → farmers harvest their crops | Start with the water rising. | C3 framework D2.Geo and D2.His (grades 6-8): the early river-valley civilizations of Mesopotamia, Egypt, the Indus Valley and China. |

### Greece, Rome & China (`civ_class` 1), Social studies, grade 6

| # | Question | Answer | Wrong choices | Hint (when not the topic hint) | Picture | Why |
|---|---|---|---|---|---|---|
| G297 | Ancient Greece was made up of many independent ___. | city-states | provinces of Egypt; farms with no towns; parts of one empire |  |  | C3 framework D2.Civ and D2.His (grades 6-8): ancient Greece, its city-states and an early democracy. |
| G298 | In Athens, citizens voted on laws themselves. This was an early form of ___. | democracy | monarchy; dictatorship; empire |  |  | C3 framework D2.Civ and D2.His (grades 6-8): ancient Greece, its city-states and an early democracy. |
| G299 | In ancient Athens, who could vote? | free men who were citizens | everyone, including children; only the king; only women |  |  | C3 framework D2.Civ and D2.His (grades 6-8): ancient Greece, its city-states and an early democracy. |
| G300 | The Olympic Games began in ancient ___. | Greece | Rome; China; Mesopotamia |  |  | C3 framework D2.Civ and D2.His (grades 6-8): ancient Greece, its city-states and an early democracy. |
| G301 | Sparta was a Greek city-state known for its strong ___. | army | libraries; theaters; rice farms |  |  | C3 framework D2.Civ and D2.His (grades 6-8): ancient Greece, its city-states and an early democracy. |
| G302 | Greek thinkers like Socrates asked questions to search for truth. They are called ___. | philosophers | pharaohs; senators; shipbuilders |  |  | C3 framework D2.Civ and D2.His (grades 6-8): ancient Greece, its city-states and an early democracy. |
| G303 | Many English words, like "telephone" and "geography", come from ___ words. | Greek | Chinese; Egyptian; Mayan |  |  | C3 framework D2.Civ and D2.His (grades 6-8): ancient Greece, its city-states and an early democracy. |
| G304 | Before it had emperors, Rome was a republic. In a republic, citizens ___. | elect leaders to make decisions | obey one king forever; never vote; let the army choose |  |  | C3 framework D2.Civ and D2.His (grades 6-8): the Roman Republic and Roman building. |
| G305 | The Roman Senate was a group of leaders who ___. | advised and helped make laws | built the roads alone; ran the Olympic Games; led the army of Egypt |  |  | C3 framework D2.Civ and D2.His (grades 6-8): the Roman Republic and Roman building. |
| G306 | Romans built stone channels called ___ to carry water to their cities. | aqueducts | pyramids; ziggurats; walls |  |  | C3 framework D2.Civ and D2.His (grades 6-8): the Roman Republic and Roman building. |
| G307 | The language of ancient Rome was ___. | Latin | Greek; Spanish; English |  |  | C3 framework D2.Civ and D2.His (grades 6-8): the Roman Republic and Roman building. |
| G308 | Roman roads were so well built that ___. | some are still used today | they fell apart in a year; they were made of wood; nobody used them |  |  | C3 framework D2.Civ and D2.His (grades 6-8): the Roman Republic and Roman building. |
| G309 | The Romans were skilled builders who used arches and ___. | concrete | plastic; steel beams; glass towers |  |  | C3 framework D2.Civ and D2.His (grades 6-8): the Roman Republic and Roman building. |
| G310 | Many English words come from Latin. Which English word comes from the Latin word "aqua," meaning water? | aquarium | airplane; library; mountain |  |  | C3 framework D2.Civ and D2.His (grades 6-8): the Roman Republic and Roman building. |
| G311 | Paper was first made in ancient ___. | China | Greece; Rome; Mesopotamia |  |  | C3 framework D2.His (grades 6-8): ancient China: dynasties, paper, silk, the Silk Road and the Great Wall. |
| G312 | The Silk Road was a set of routes for ___. | trade between China and the West | racing horses; building walls; sailing to America |  |  | C3 framework D2.His (grades 6-8): ancient China: dynasties, paper, silk, the Silk Road and the Great Wall. |
| G313 | The Great Wall of China was built mainly to ___. | protect against invaders from the north | keep the rivers from flooding; mark a trade road; hold back the sea |  |  | C3 framework D2.His (grades 6-8): ancient China: dynasties, paper, silk, the Silk Road and the Great Wall. |
| G314 | Silk is a soft cloth made from the threads of ___. | silkworm cocoons | cotton plants; sheep's wool; tree bark |  |  | C3 framework D2.His (grades 6-8): ancient China: dynasties, paper, silk, the Silk Road and the Great Wall. |
| G315 | The Chinese thinker Confucius taught that people should ___. | respect their families and act kindly | never work; fight their neighbors; ignore their elders |  |  | C3 framework D2.His (grades 6-8): ancient China: dynasties, paper, silk, the Silk Road and the Great Wall. |
| G316 | A family of rulers in China, like the Han, was called a ___. | dynasty | republic; senate; city-state |  |  | C3 framework D2.His (grades 6-8): ancient China: dynasties, paper, silk, the Silk Road and the Great Wall. |

| # | Kind | Question | Right answer | Hint | Why |
|---|---|---|---|---|---|
| G317 | sort | Sort them: ancient Greece or ancient Rome? | **Greece**: the Olympic Games, democracy in Athens, Sparta; **Rome**: aqueducts, the Senate, Latin | Athens and Sparta were Greek. The Senate met in Rome. | C3 framework D2.Civ and D2.His (grades 6-8): ancient Greece, its city-states and an early democracy. |
| G318 | sort | Sort them: from ancient China, or not? | **ancient China**: paper, silk, the Great Wall; **not from China**: the Olympic Games, aqueducts, hieroglyphs | Think about which ones came along the Silk Road from the east. | C3 framework D2.His (grades 6-8): ancient China: dynasties, paper, silk, the Silk Road and the Great Wall. |
| G319 | match | Match each place to a word you learned: Athens, Rome and China. | Athens = democracy; Rome = republic; China = dynasty | Citizens voting on laws, citizens electing leaders, and a family of rulers. | C3 framework D2.Civ and D2.His (grades 6-8): ancient Greece, its city-states and an early democracy. |
| G320 | match | Match each thing to its use: aqueduct, Great Wall and Silk Road. | aqueduct = carrying water; Great Wall = keeping out invaders; Silk Road = trading goods | One moves water, one keeps people out, and one moves goods. | C3 framework D2.Civ and D2.His (grades 6-8): the Roman Republic and Roman building. |
| G321 | order | Put them in order from oldest to newest. | the first cities of Mesopotamia → the pyramids of Giza → democracy in Athens → the Roman Empire | The river valleys came first. Rome came after Greece. | C3 framework D2.Civ and D2.His (grades 6-8): ancient Greece, its city-states and an early democracy. |
| G322 | order | Put them in order: how did silk get from China to Rome? | silkworms spin cocoons in China → workers make silk cloth → traders carry it along the Silk Road → buyers in Rome get it | Start with the tiny animals that spin the thread. | C3 framework D2.His (grades 6-8): ancient China: dynasties, paper, silk, the Silk Road and the Great Wall. |

### Topic hints of the new stops (shown and read when a question has no hint of its own; never name an answer)

| Topic | Hint |
|---|---|
| enspeed | Think about how hard something hits when it is slow, and then when it is quick. |
| enmove | Follow the energy from where it starts to where it ends up. What does it turn into along the way? |
| ensource | Ask where the energy comes from, and whether nature can make more of it soon. |
| wavepat | Picture ripples on a pond: how tall they are, how far apart they are, and what they do to things they pass. |
| seeing | Think about where the light starts, what it hits, and where it goes next. |
| codes | Think about how words can be turned into a pattern, like taps, flashes or digits, and turned back again. |
| wear | Think about what pushes, scrapes or carries the land, and how long it keeps working. |
| layers | Picture a stack of pancakes. Which went down first, and which went on last? |
| hazards | Think about what could happen to people and buildings, and what would help protect them. |
| outside | Look at the part on the outside of the plant or animal. Ask what job it does for it. |
| inside | Think about the parts you cannot see from the outside, and what each one does to keep the body alive. |
| signals | Think about how a body notices something and then decides what to do about it. |
| stategov | Think about who runs a state, who writes its rules, and where they do it. |
| localgov | Think about your own town or county, and the services close to home. |
| levels | Ask how big an area the job covers: one town, one whole state, or the whole nation. |
| usreg | Picture the map of the country. Think about the land, the weather and the work people do in each part. |
| resource | Ask if it comes from nature, from a person and what they know how to do, or is a tool made to make other things. |
| trade | Think about what each place makes best, and how people get the things they cannot make themselves. |
| pyramid | Picture a stack of blocks that gets smaller at each step up. Think about what eats what, and how much is passed along. |
| partner | Ask who gains and who is harmed, or if one of them is not affected at all. |
| limits | Think about what a population needs to survive. What happens when one of those needs runs short? |
| layers6 | Picture cutting Earth open like a peach. Think about what each part is like as you go deeper. |
| motion | Picture slabs of rock riding on a slowly flowing layer. Think about how they move against each other. |
| quakes | Think about what shakes, what the shaking can cause, and what people can do to stay safe. |
| airmass | Think about where the weather came from: over land or sea, near the poles or near the equator, and what happens when two kinds meet. |
| pressure | Think about air being squeezed or spread out, and what rising and sinking air do to the sky. |
| storms | Think about what each storm needs to form and grow, and where it gets its energy. |
| local | Think about where the air or weather starts, what it passes over on its trip, and what changes along the way. |
| ground | Follow the rain after it lands. Does it run off, soak in, or collect somewhere? |
| spread | Think about how Earth made the resource, and why it is found in some places and not others. |
| impact | Think about what people do, what it changes in nature, and what could be done instead. |
| river | Think about what a big river gives the people who live along it, and picture where each one flows. |
| invent | Think about what problem each new idea solved for the people of long ago. |
| life | Think about how life changed once farmers could grow more food than their families needed. |
| greece | Think about how the people of Athens and Sparta ran their towns, and the ideas they gave the world. |
| rome | Think about how Rome was run and what the Romans built that lasted. |
| china | Think about what the people of that land made, traded and built. |
