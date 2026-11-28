# Science Lab (grade 3): proposed "why" lines

status: reviewed owner 2026-11-28 (all 279 review items approved, no notes)

Sample for owner approval. One spoken `after` line for every choice item of the Discover world `d_lab`
(Science Lab, `g:3`, `src/js/42-paths.js`): `sci_life` 2, `sci_earth` 2, `sci_phys` 2, `geo_us` 1, `geo_world` 2.
Items come from `src/data/d-disc2-sci.js` and `src/data/d-disc2-soc.js` at those levels (`genBank` draws by `lv`).
Sort, match, order and mark items (`d-disc3-kinds.js`, `d-disc4-kinds.js`) are not choice items and are left out.

How the line is used (`src/js/50-round.js`): after a right answer it is said after the cheer; after a second miss
it is said **instead of** "The answer is ...". So every line names the right answer itself, explains why, and reads
fine either way. Rules kept: at most 22 words, plain grade-3 words, no praise or "wrong", no questions, nothing
against the item's hint or the existing wrong-answer notes (`KD4WHY`).

## Counts (for the recording estimate)

| Stop | Lines | Characters |
|---|---|---|
| sci_life 2 | 63 | 5,958 |
| sci_earth 2 | 65 | 6,164 |
| sci_phys 2 | 72 | 6,833 |
| geo_world 2 | 73 | 6,642 |
| geo_us 1 | 164 | 15,430 |
| **Total** | **437** | **41,027** |

`geo_us` is counted as rendered (every table row filled in), since each filled row is its own recording.
Written by hand: 273 lines + 4 templates + 2 fixed lines. At about 3 KB of audio per short line,
437 lines is roughly 1.3 MB.


## Life Cycles & Food: `sci_life` level 2 (63 items)

| # | Question | Answer | Why (proposed) |
|---|---|---|---|
| 1 | A butterfly hatches from an egg as a ___. | caterpillar | A butterfly's egg hatches into a caterpillar, a hungry crawler that eats leaves and grows before it makes a chrysalis. |
| 2 | The stage of a butterfly's life spent inside a chrysalis is the ___. | pupa | Inside the chrysalis, the pupa changes its whole body. It goes in a caterpillar and comes out a butterfly. |
| 3 | A young frog that lives in water and has a tail is a ___. | tadpole | Frogs start life in water as tadpoles. A tadpole swims with its tail and breathes with gills, like a fish. |
| 4 | A tadpole grows legs and lungs and becomes a ___. | frog | Legs let a frog hop on land, and lungs let it breathe air, so the tadpole becomes a frog. |
| 5 | A hen's egg hatches into a ___. | chick | Birds hatch from eggs, and a baby chicken is called a chick. Calves, cubs and pups grow inside their mothers. |
| 6 | Which is the first stage in the life cycle of most plants? | seed | Most plants begin as a seed. A tiny new plant and its food are packed inside, waiting to grow. |
| 7 | A seed that starts to grow roots and a shoot is said to ___. | germinate | To germinate means to start growing. Water and warmth wake up the seed, so it sends out a root and a shoot. |
| 8 | The stages of a living thing's life, from birth to death, make up its ___. | life cycle | A life cycle is all the stages from birth to death. The stages repeat when the grown-up has young of its own. |
| 9 | Which animal does NOT change its body shape as it grows, but only gets bigger? | a dog | A puppy already looks like a small dog and just grows bigger. Frogs, butterflies and beetles change shape completely. |
| 10 | Which of these has a pupa stage? | a beetle | Beetles, like butterflies, rest as a pupa while their body changes. Humans, dogs and birds just grow bigger. |
| 11 | In a food chain, plants are called ___ because they make their own food. | producers | Plants are producers because they produce, or make, their own food from sunlight, air and water. |
| 12 | An animal that hunts other animals for food is a ___. | predator | A predator hunts other animals for food. Lions, owls and sharks are predators. |
| 13 | An animal that is hunted by another animal is called ___. | prey | Prey is an animal that gets hunted and eaten. A mouse is prey for an owl. |
| 14 | Mushrooms and some bacteria break down dead plants and animals. They are ___. | decomposers | Decomposers break down dead things into tiny bits. That puts food back into the soil for new plants. |
| 15 | An animal that eats only plants is a ___. | herbivore | Herbivores eat only plants, like grass and leaves. Cows, rabbits and deer are herbivores. |
| 16 | An animal that eats only other animals is a ___. | carnivore | Carnivores eat only other animals. Lions, wolves and sharks are carnivores. |
| 17 | An animal that eats both plants and animals is called ___. | omnivore | Omnivores eat both plants and animals. Bears, raccoons and chickens are omnivores. |
| 18 | An arrow in a food chain shows where the ___ goes. | energy | Each arrow points from the food to the eater. It shows the energy the eater gets for running and growing. |
| 19 | Almost every food chain starts with energy from the ___. | Sun | Plants use sunlight to make food, and animals eat the plants. So the energy first came from the Sun. |
| 20 | A snake that eats mice is the ___ of the mice. | predator | The snake hunts and eats the mice, so the snake is the predator and the mice are its prey. |
| 21 | Which food chain is in the right order, from food to eater? | grass, rabbit, fox | Energy moves from food to eater. The rabbit eats the grass, and then the fox eats the rabbit. |
| 22 | Most of the insects a frog eats disappear from its pond. What happens to the frogs? | they have less food and become fewer | With fewer insects, the frogs have less to eat. When food runs low, fewer frogs can live in the pond. |
| 23 | A polar bear's thick fur and layer of fat help it stay warm in the ___. | Arctic | The Arctic is freezing cold. Thick fur and a layer of fat keep the polar bear's body heat in. |
| 24 | A cactus stores water in its thick stem. This helps it live in the ___. | desert | Deserts get very little rain. A cactus soaks up water when it rains and saves it in its stem. |
| 25 | A giraffe's long neck helps it ___. | reach leaves high in trees | A long neck lets a giraffe reach leaves high in trees, where most other animals cannot reach. |
| 26 | A stick insect looks like a twig. This helps it ___. | hide from hungry animals | Looking like a twig is a kind of hiding. Birds and other hungry animals pass right by without seeing it. |
| 27 | A duck's webbed feet help it ___. | swim | Webbed feet work like paddles. The skin between the toes pushes lots of water, so the duck can swim. |
| 28 | The shape of a bird's beak depends on ___. | the food it eats | A beak is a tool for eating. Strong, thick beaks crack seeds, and long, thin beaks sip nectar from flowers. |
| 29 | A body part or habit that helps a living thing survive where it lives is called ___. | adaptation | An adaptation is a body part or habit that helps a living thing survive, like thick fur in the cold. |
| 30 | Birds that fly far away for the winter to find food and warmth are ___. | migrating | Migrating means traveling far when the seasons change. Many birds fly south to find food and warmth in winter. |
| 31 | A bear sleeps through the cold winter in a den. This is called ___. | hibernation | In hibernation, a bear's body slows way down. It can rest all winter, when food is hard to find. |
| 32 | A camel's wide, flat feet help it walk on ___. | sand | Wide, flat feet spread the camel's weight, so its feet do not sink into soft sand. |
| 33 | Which animal has thick white fur that helps it hide and stay warm in snow? | an Arctic fox | White fur blends in with the snow, and thick fur keeps out the cold. That suits an Arctic fox. |
| 34 | A thick waxy coat on a leaf helps a plant ___. | keep its water in | The waxy coat works like plastic wrap. It keeps water from drying out of the leaf. |
| 35 | Animals with a backbone are called ___. | vertebrates | Vertebrates have a backbone. The small bones down your back are your backbone, so you are a vertebrate too. |
| 36 | Animals without a backbone are called ___. | invertebrates | Invertebrates have no backbone at all. Insects, worms, spiders and snails are all invertebrates. |
| 37 | Which group of animals feeds its babies milk? | mammals | Mammal mothers make milk to feed their babies. That is one big way to tell a mammal. |
| 38 | Which animal is a mammal? | a whale | A whale breathes air with lungs and feeds its babies milk, so it is a mammal, not a fish. |
| 39 | Which animal is a reptile? | a lizard | A lizard has dry, scaly skin and breathes with lungs. That makes it a reptile. |
| 40 | Which animal is an amphibian? | a frog | A frog starts life in water and later lives on land too. Animals like that are amphibians. |
| 41 | Which animal is an insect? | an ant | An ant has six legs and three body parts, like every insect. Spiders have eight legs. |
| 42 | An insect has how many legs? | six | All insects have six legs. Count an ant's or a beetle's legs and you will find six. |
| 43 | A spider is not an insect because it has ___ legs. | eight | Insects have six legs, but spiders have eight. So a spider belongs to a different animal group. |
| 44 | Which group of animals has feathers and lays eggs? | birds | Birds are the only animals with feathers, and all birds lay eggs. |
| 45 | Fish breathe underwater using their ___. | gills | Gills take oxygen out of the water. That is how fish breathe without coming up for air. |
| 46 | A bat can fly, but it is a ___ because it has fur and feeds its babies milk. | mammal | Flying does not make an animal a bird. Bats have fur and feed milk to their babies, like all mammals. |
| 47 | A dolphin is a ___. | mammal | A dolphin breathes air through a blowhole and feeds its babies milk, so it is a mammal. |
| 48 | Water from the soil is taken in by a plant's ___. | roots | Roots grow down into the soil. They drink up water and hold the plant in place. |
| 49 | Which part of a plant holds it up and carries water to the leaves? | stem | The stem is like a straw and a pole. It holds the plant up and carries water to the leaves. |
| 50 | Which part of a plant makes food using sunlight? | leaf | Leaves are a plant's food makers. They use sunlight, air and water to make food. |
| 51 | The part of a plant that makes seeds is the ___. | flower | Flowers are where seeds are made. After a flower gets pollen, seeds start to grow inside it. |
| 52 | Bees carry a yellow dust from flower to flower. It is called ___. | pollen | Pollen is a yellow dust made by flowers. Bees carry it from flower to flower, which helps seeds form. |
| 53 | Seeds can be spread by wind, by water or by ___. | animals | Animals carry seeds in their fur or eat fruit and drop the seeds far away. That spreads the plants. |
| 54 | A dandelion seed floats away on the wind. This helps the plant ___. | spread its seeds | The wind carries the dandelion seed far away. That gives the new plant its own space to grow. |
| 55 | Plants need light, water and air. Which of these does a plant NOT need? | chocolate | Plants need light, water and air to make their own food. Chocolate is a food for people, not plants. |
| 56 | Fossils are the traces of living things from ___. | long ago | Fossils come from living things that died long ago, many thousands of years or more before today. |
| 57 | Where would you most likely find a fossil? | in a layer of rock | Mud and sand bury a living thing and slowly harden into rock. So fossils are found in rock layers. |
| 58 | Which part of an animal is most likely to become a fossil? | a bone | Bones are hard, so they last a very long time. Soft parts like skin and fur rot away first. |
| 59 | Scientists who study fossils are called ___. | paleontologists | Paleontologists are scientists who dig up and study fossils to learn about life long ago. |
| 60 | A fossil footprint can show how an animal ___. | walked | A footprint shows the shape of the feet and how far apart the steps were. That tells how it walked. |
| 61 | Which of these animals is extinct, with none alive today? | a woolly mammoth | Woolly mammoths are extinct. We know about them from bones and fossils, but none are alive today. |
| 62 | Fossils of sea shells are found high on a mountain. The place was once ___. | under the sea | Sea animals live only in the ocean. Finding their shells on a mountain means the sea once covered that land. |
| 63 | Older fossils are usually found in ___ layers of rock. | deeper | New layers pile on top of old ones. So the deeper the rock layer, the older the fossil usually is. |

## Water, Rocks & Moon: `sci_earth` level 2 (65 items)

| # | Question | Answer | Why (proposed) |
|---|---|---|---|
| 1 | Water changing from a liquid into a gas is called ___. | evaporation | Evaporation is liquid water turning into a gas. Heat from the Sun makes the water rise into the air. |
| 2 | Water vapor cooling into tiny drops of water in clouds is called ___. | condensation | When water vapor cools, it turns back into tiny drops. That is condensation, and it is how clouds form. |
| 3 | Rain, snow and hail falling from clouds is called ___. | precipitation | Precipitation is any water falling from clouds, like rain, snow, sleet or hail. |
| 4 | What gives the water cycle the heat it needs to evaporate water? | the Sun | The Sun heats the oceans, lakes and puddles. That heat turns the water into vapor and starts the cycle. |
| 5 | Where is most of Earth's water found? | in the oceans | Oceans cover most of Earth. They hold almost all of Earth's water, far more than rivers, lakes and clouds. |
| 6 | Water that runs downhill over the ground to rivers and seas is called ___. | runoff | Runoff is rain that runs off the ground instead of soaking in. Gravity pulls it downhill to rivers. |
| 7 | After a sunny morning a puddle is gone because its water ___. | evaporated | The sun warmed the puddle, and its water evaporated into the air as vapor you cannot see. |
| 8 | Drops appear on the outside of a cold glass. They come from water vapor in the ___. | air | Air has water vapor in it. The cold glass cools the vapor, and it turns into drops on the glass. |
| 9 | Water in the form of a gas in the air is called water ___. | vapor | Water vapor is water as a gas. It floats in the air, and you cannot see it. |
| 10 | Snow forms when water in clouds freezes into ___. | ice crystals | When clouds are below freezing, water turns into tiny ice crystals. They stick together and fall as snowflakes. |
| 11 | A raindrop falls from a cloud because ___ pulls it down. | gravity | Gravity pulls everything down toward Earth. When raindrops get heavy enough, gravity pulls them out of the cloud. |
| 12 | Tiny pieces of rock mixed with bits of dead plants and animals make ___. | soil | Soil is broken bits of rock mixed with bits of dead plants and animals. That mix helps plants grow. |
| 13 | Rocks are made of one or more ___. | minerals | Minerals are the natural building blocks of rocks. A rock can be made of one mineral or many. |
| 14 | Which of these is the hardest mineral? | diamond | Diamond is the hardest natural mineral. It can scratch every other mineral, so it is used on cutting tools. |
| 15 | The dark top layer of soil, full of plant food, is the ___. | topsoil | Topsoil is the top layer. It is dark because it is full of bits of old plants that feed new plants. |
| 16 | The solid rock far under the soil layers is called ___. | bedrock | Bedrock is the solid rock under all the soil. The soil layers rest on top of it. |
| 17 | Which kind of soil holds water best? | clay | Clay has the tiniest bits, packed very close together. Water gets stuck between them, so clay holds water well. |
| 18 | Which kind of soil lets water drain through quickly? | sand | Sand grains are big with wide spaces between them. Water slips through those spaces quickly. |
| 19 | A scientist uses a ___ to look closely at a rock. | hand lens | A hand lens makes small things look bigger. It helps a scientist see the tiny grains in a rock. |
| 20 | Sand, silt and clay are tiny pieces of ___. | rock | Sand, silt and clay are rock broken into tiny pieces. Sand is the biggest and clay is the smallest. |
| 21 | Earthworms help soil by ___. | digging tunnels that let in air and water | Earthworm tunnels are like tiny hallways. Air and water flow through them down to plant roots. |
| 22 | Wind, water and ice carrying bits of rock and soil away is called ___. | erosion | Erosion is wind, water or ice carrying bits of rock and soil away to a new place. |
| 23 | Moving water or wind drops the pieces it carried in a new place. This is called ___. | deposition | Deposition means dropping off. When wind or water slows down, it drops the sand and soil it was carrying. |
| 24 | The Grand Canyon was carved mostly by ___. | a river | The Colorado River cut the Grand Canyon. Over a very long time, its water wore away layer after layer of rock. |
| 25 | Plant roots slow down erosion because they ___. | hold soil in place | Roots grip the soil like a net. That keeps rain and wind from washing or blowing it away. |
| 26 | Weathering is when rock is slowly ___. | broken into smaller pieces | Weathering breaks rock into smaller pieces. Water, ice, wind and plant roots all slowly crack and wear rock down. |
| 27 | Water freezes in a crack in a rock. As it turns to ice it ___. | expands and widens the crack | Water takes up more space when it freezes. The ice pushes on the crack and makes it wider. |
| 28 | A fast river can carry ___ soil and rock than a slow river. | more | Faster water pushes harder. That push lets a fast river carry more soil and rock than a slow one. |
| 29 | Which can slow erosion on a hillside? | planting grass and trees | Grass and tree roots hold the soil in place, so rain cannot wash the hillside away as easily. |
| 30 | A glacier is a slow-moving river of ___. | ice | A glacier is a huge sheet of ice. Snow piles up for years, packs into ice, and slowly slides downhill. |
| 31 | Sand dunes in a desert are shaped by ___. | wind | Wind blows sand grains along the desert and piles them up into hills. Those sand hills are dunes. |
| 32 | Resources that can be used again and again, like sunlight and wind, are ___. | renewable | Renewable means it comes back again. The Sun keeps shining and the wind keeps blowing. |
| 33 | Coal, oil and natural gas cannot be made again once they are used up, so they are ___ resources. | nonrenewable | Coal, oil and gas took millions of years to form underground. Once we burn them, they are gone for good. |
| 34 | Which energy source is renewable? | wind | Wind keeps blowing, so it will not run out. Coal, oil and gas are used up once they are burned. |
| 35 | Which of these is a natural resource? | water | Water is a natural resource because nature makes it, not people. Cars, phones and bikes are made in factories. |
| 36 | Using less and not wasting a resource is called ___. | conservation | Conservation means using less and not wasting, so a resource lasts longer. Turning off the tap saves water. |
| 37 | Trees cut for wood can be replaced by planting new ones, so wood can be a ___ resource. | renewable | New trees can be planted to replace the ones we cut. That way wood can keep coming back. |
| 38 | Reduce, reuse and ___ are three ways to help the Earth. | recycle | Recycling turns old things, like cans and paper, into new things. That saves resources and makes less trash. |
| 39 | Solar panels change sunlight into ___. | electricity | Solar panels catch sunlight and turn it into electricity that can light a house. |
| 40 | Dirty air, water or land is called ___. | pollution | Pollution is anything that makes the air, water or land dirty. Trash and smoke are kinds of pollution. |
| 41 | The Moon shines because it ___ light from the Sun. | reflects | The Moon makes no light of its own. Sunlight bounces off it, so it reflects light from the Sun. |
| 42 | The changing shape of the Moon that we see in the sky is called the Moon's ___. | phases | The Moon's phases are the shapes we see as more or less of its sunny side faces us. |
| 43 | When we can see the whole round face of the Moon lit up, it is a ___ Moon. | full | At a full Moon, the whole sunlit half faces Earth, so we see a bright, round circle. |
| 44 | When we cannot see the Moon's lit side at all, it is a ___ Moon. | new | At a new Moon, the sunlit half faces away from Earth. The dark side faces us, so we see nothing. |
| 45 | About how long does the Moon take to go through all its phases? | one month | The Moon goes around Earth about once a month, and it shows all its phases on each trip. |
| 46 | The Moon travels around the ___. | Earth | The Moon orbits Earth. Earth's gravity keeps the Moon traveling around and around us. |
| 47 | A Moon that looks like a thin curved slice is a ___ Moon. | crescent | A crescent Moon looks like a thin slice because only a sliver of its sunlit side faces us. |
| 48 | Why does the Moon seem to change shape over a month? | more or less of its sunlit side faces Earth | The Sun always lights half the Moon. As the Moon goes around Earth, we see more or less of that half. |
| 49 | After a new Moon, the lit part we see gets bigger each night. This is called ___. | waxing | Waxing means growing. After a new Moon, we see a little more of the lit side each night. |
| 50 | Which is true about the Moon? | it has no air | The Moon has no air to breathe. That is why astronauts there wear space suits. |
| 51 | The same side of the Moon always faces ___. | Earth | The Moon spins once each time it goes around Earth. So the same side always faces us. |
| 52 | Which planet is closest to the Sun? | Mercury | Mercury is the first planet from the Sun. Its path around the Sun is the smallest of all. |
| 53 | Earth is the ___ planet from the Sun. | third | Going out from the Sun, the planets go Mercury, Venus, then Earth. That makes Earth the third planet. |
| 54 | Which is the biggest planet in our solar system? | Jupiter | Jupiter is the biggest planet. More than a thousand Earths could fit inside it. |
| 55 | Which planet has bright rings you can see with a small telescope? | Saturn | Saturn's rings are made of ice and rock. They shine in sunlight, so even small telescopes can see them. |
| 56 | Which planet is called the Red Planet? | Mars | Mars looks red because its ground is covered in rusty red dust. |
| 57 | The four planets closest to the Sun are made mostly of ___. | rock | Mercury, Venus, Earth and Mars are small, rocky planets. You could stand on their hard ground. |
| 58 | Which of these is a gas giant? | Jupiter | Jupiter is huge and made mostly of gas, so it is called a gas giant. Mars, Venus and Earth are rocky. |
| 59 | Which planet comes right after Earth, going away from the Sun? | Mars | The order goes Mercury, Venus, Earth, Mars. So Mars is the next planet out after Earth. |
| 60 | Which planet is the farthest from the Sun? | Neptune | Neptune is the eighth and last planet. It is so far away that it is dark and icy cold. |
| 61 | Pluto is now called a ___ planet. | dwarf | Pluto is smaller than our Moon and shares its path with many icy objects, so scientists call it a dwarf planet. |
| 62 | Our Sun is a ___. | star | The Sun is a star, a giant ball of hot glowing gas. It looks big because it is our closest star. |
| 63 | A planet travels around the Sun in a path called ___. | orbit | An orbit is a planet's path around the Sun. The Sun's gravity keeps each planet on its path. |
| 64 | How many planets are in our solar system? | eight | There are eight planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune. |
| 65 | Which planet is the hottest, with thick clouds that trap heat? | Venus | Venus is wrapped in thick, cloudy air that traps the Sun's heat. That makes it hotter than Mercury. |

## Forces & Matter: `sci_phys` level 2 (72 items)

| # | Question | Answer | Why (proposed) |
|---|---|---|---|
| 1 | The three common states of matter are solid, liquid and ___. | gas | Matter comes in three common states: solid like ice, liquid like water and gas like steam. |
| 2 | Matter that keeps its own shape and size is a ___. | solid | A solid's tiny pieces are packed tight and locked in place, so it keeps its own shape and size. |
| 3 | Matter that takes the shape of its container but keeps its size is a ___. | liquid | A liquid's tiny pieces can slide past each other. It pours and takes the container's shape but keeps its size. |
| 4 | Matter that spreads out to fill its whole container is a ___. | gas | A gas's tiny pieces zoom around far apart, so a gas spreads out to fill any container. |
| 5 | When a solid turns into a liquid, it ___. | melts | Heat makes a solid's tiny pieces move faster and break loose. Then the solid melts into a liquid, like ice. |
| 6 | When a liquid turns into a solid, it ___. | freezes | Taking heat away slows a liquid's tiny pieces until they lock together. That is freezing, like water into ice. |
| 7 | When a liquid turns into a gas, it ___. | evaporates | Heat gives a liquid's tiny pieces enough energy to fly off into the air. That is evaporating. |
| 8 | When a gas cools and turns into a liquid, it ___. | condenses | When a gas cools, its pieces slow down and come together as drops. That is condensing. |
| 9 | Water freezes at ___. | 0 degrees Celsius | Water freezes at 0 degrees Celsius, which is 32 degrees Fahrenheit. Below that, puddles turn to ice. |
| 10 | Water boils at ___. | 100 degrees Celsius | Water boils at 100 degrees Celsius, or 212 degrees Fahrenheit. At that heat, it bubbles and turns into steam. |
| 11 | Anything that has mass and takes up space is called ___. | matter | Matter is anything that has mass and takes up space. Rocks, water and even air are matter. |
| 12 | Which one is NOT matter? | light | Light has no mass and takes up no space, so it is not matter. Air, water and rocks are matter. |
| 13 | Which of these is a gas? | the air in a bike tire | The air inside a tire is a gas. It spreads out to fill the whole tire. |
| 14 | Mass is the amount of ___ in an object. | matter | Mass is how much matter, or stuff, is in something. A bowling ball has more mass than a balloon. |
| 15 | You can measure mass with a ___. | balance | A balance compares an object with measuring weights until both sides level out. That tells its mass. |
| 16 | You can measure temperature with a ___. | thermometer | A thermometer shows how hot or cold something is. Thermo means heat, and meter means measure. |
| 17 | A push or a pull is called a ___. | force | Any push or pull is a force. Forces make things start moving, stop, speed up or turn. |
| 18 | The force that pulls things down toward Earth is ___. | gravity | Gravity is the pull that makes things fall. Earth's gravity pulls everything down toward the ground. |
| 19 | The force that slows down things that rub together is ___. | friction | Friction happens when surfaces rub together. It works against motion and slows things down. |
| 20 | Which surface has the most friction? | sandpaper | Rough surfaces rub more, so they have more friction. Sandpaper is very rough, while ice and glass are smooth. |
| 21 | A magnet pulls on objects made of ___. | iron | Magnets pull on iron and things made with iron, like steel. Wood, plastic and glass are not pulled. |
| 22 | Which would a magnet pick up? | a steel paper clip | Steel is made mostly of iron, so a magnet pulls on a steel paper clip. |
| 23 | Which would a magnet NOT pick up? | a plastic button | Magnets only pull on certain metals, like iron. A plastic button has no iron, so the magnet does not pull it. |
| 24 | Every magnet has two ends called ___. | poles | A magnet's pull is strongest at its two ends, called the north pole and the south pole. |
| 25 | Two north poles of magnets will ___ each other. | push away | Same poles push away from each other. Two north poles always push apart. |
| 26 | The north pole of one magnet and the south pole of another will ___ each other. | pull toward | Opposite poles pull together. A north pole and a south pole attract each other. |
| 27 | Which force can act without touching an object? | magnetism | A magnet can pull a paper clip from a short distance away. Kicking, throwing and pulling a rope all need touching. |
| 28 | A ball rolling across grass slows down and stops mostly because of ___. | friction | As the ball rolls, it rubs against the grass. That friction slows it down until it stops. |
| 29 | If the forces on an object are balanced, the object ___. | does not change how it is moving | Balanced forces cancel each other out, like a tie in tug of war. So the motion does not change. |
| 30 | A bigger push makes a ball go ___. | faster and farther | A bigger force makes a bigger change in motion. So a harder push sends the ball faster and farther. |
| 31 | Wheels on a wagon make it easier to move because they ___. | cut down friction | Wheels roll instead of drag. Rolling makes much less friction than sliding, so the wagon moves easily. |
| 32 | A ramp is a kind of simple machine called ___. | inclined plane | A ramp is a flat surface set at a slant. Inclined means slanted, so it is called an inclined plane. |
| 33 | A seesaw is a ___. | lever | A seesaw is a long bar that tips on a turning point in the middle. That makes it a lever. |
| 34 | A knife blade works as a ___. | wedge | A knife blade is thin on one edge and thicker at the back. That shape is a wedge, which splits things apart. |
| 35 | A flagpole uses a rope and a wheel called a ___. | pulley | A pulley is a wheel with a rope around it. Pulling down on the rope raises the flag up the pole. |
| 36 | A jar lid works like a ___. | screw | A screw is a ramp wrapped around in a spiral. The jar lid's twisting ridges work the same way. |
| 37 | How does a simple machine, like a ramp or a lever, help us? | we can push or pull less hard | A simple machine lets you use a smaller push or pull. The load weighs the same, but the job feels easier. |
| 38 | Lever, pulley, wheel and axle, inclined plane, wedge and ___ are the six simple machines. | screw | The six simple machines are the lever, pulley, wheel and axle, inclined plane, wedge and screw. |
| 39 | A doorknob is an example of a ___. | wheel and axle | The knob is a big wheel, and the rod inside is the axle. Turning the big knob easily turns the rod. |
| 40 | A crowbar is a ___. | lever | A crowbar is a bar that tips on a turning point. A small push on the long end lifts a heavy load. |
| 41 | A ramp makes it easier to lift a heavy box because you push it over a ___ distance. | longer | Pushing up a long ramp takes less force than lifting straight up. You trade a longer path for an easier push. |
| 42 | The turning point of a lever is called the ___. | fulcrum | The fulcrum is the point a lever turns on, like the middle of a seesaw. |
| 43 | Which one is NOT a simple machine? | a toaster | A toaster has many parts and runs on electricity. A simple machine has few or no moving parts and no motor. |
| 44 | A bicycle wheel turns on a rod called the ___. | axle | An axle is the rod at the center of a wheel. The wheel spins around it. |
| 45 | Energy of motion is called ___ energy. | kinetic | Kinetic energy is the energy of anything moving. The faster it moves, the more kinetic energy it has. |
| 46 | A ball held high up has stored energy called ___ energy. | potential | A ball held up high has potential energy. Gravity can pull it down, turning stored energy into motion. |
| 47 | The Sun gives us light and ___. | heat | The Sun gives off light and heat. Its warmth is why a sunny sidewalk feels hot. |
| 48 | A ringing bell gives off ___ energy. | sound | A ringing bell shakes back and forth very fast. Those shakes travel through the air as sound energy. |
| 49 | A cup of hot cocoa warms your hands with ___ energy. | heat | Heat moves from warm things to cooler things. The hot cocoa passes its heat into your cold hands. |
| 50 | A toaster changes electrical energy into ___. | heat | Electricity flows through thin wires in the toaster. The wires get very hot, and that heat toasts the bread. |
| 51 | A light bulb changes electrical energy into light and ___. | heat | Light bulbs make light, but some energy always turns into heat. That is why a bulb feels warm. |
| 52 | Food gives your body ___ energy. | chemical | Food stores chemical energy. Your body breaks the food down and uses that energy to move and grow. |
| 53 | Plants use ___ energy to make food. | light | Plants catch light energy from the Sun with their leaves and use it to make food. |
| 54 | Which one has stored energy? | a stretched rubber band | A stretched rubber band stores energy. Let it go and the stored energy turns into motion. |
| 55 | A wind turbine changes the energy of moving air into ___. | electricity | Moving air spins the turbine's blades. A machine inside turns that spinning into electricity. |
| 56 | Which one gives off both light and heat? | a campfire | Burning wood gives off both light and heat. The Moon only reflects light, and a mirror just bounces it. |
| 57 | Which is an example of kinetic energy? | a running dog | A running dog is moving, and the energy of motion is kinetic energy. A book on a shelf is not moving. |
| 58 | A battery stores ___ energy. | chemical | Chemicals inside a battery store energy. In a circuit, that chemical energy changes into electricity. |
| 59 | A complete path that electricity can flow around is a ___. | circuit | A circuit is a complete path, like a circle. Electricity flows from the battery, around the loop and back. |
| 60 | A circuit has to be ___ for a bulb to light. | closed | A closed circuit has no gaps. Electricity can flow all the way around, so the bulb lights. |
| 61 | A switch turns a circuit off by making a ___ in it. | gap | A switch opens a gap in the path. With the loop broken, electricity stops flowing. |
| 62 | Which material lets electricity flow through it? | copper wire | Copper is a metal, and metals let electricity flow easily. That is why wires are made of copper. |
| 63 | A material that does NOT let electricity flow easily is called ___. | insulator | An insulator blocks electricity. Rubber, plastic and wood are insulators. |
| 64 | A material that lets electricity flow easily is a ___. | conductor | A conductor lets electricity flow easily, the way metals like copper do. |
| 65 | The plastic around a wire keeps us safe because plastic is a good ___. | insulator | Plastic is an insulator, so electricity cannot get through it. The plastic coat keeps the electricity inside the wire. |
| 66 | Which would NOT carry electricity in a circuit? | a rubber band | Rubber is an insulator and blocks electricity. Paper clips, wires and keys are metal, so they carry it. |
| 67 | Which part of a flashlight gives it power? | the batteries | Batteries store energy that becomes electricity. Without them, the flashlight bulb has no power. |
| 68 | Electricity from a wall outlet can be very ___, so never touch it. | dangerous | Electricity from a wall outlet is strong enough to badly hurt people, so never poke anything into an outlet. |
| 69 | In a circuit, the wire is like a ___ for the electricity. | path | Electricity travels along the wire like cars on a road. The wire is its path. |
| 70 | Lightning is a huge spark of ___ electricity. | static | Lightning is static electricity. Charges build up in storm clouds and then jump in a giant spark. |
| 71 | Rubbing a balloon on your hair can make ___ electricity. | static | Rubbing moves tiny charges from your hair onto the balloon. That built-up charge is static electricity. |
| 72 | A bulb in a circuit does not light. Which is a good first check? | whether all the wires are touching | A bulb only lights if the loop is complete. A loose wire leaves a gap, so check the wires first. |

## Grids & Climate: `geo_world` level 2 (73 items)

| # | Question | Answer | Why (proposed) |
|---|---|---|---|
| 1 | In the point (4, 2), the first number tells how far to go ___. | across | In a point, the first number tells how far to go across. You walk along first, then climb up. |
| 2 | In the point (4, 2), the second number tells how far to go ___. | up | The second number tells how far to go up. Across comes first, then up. |
| 3 | Start at (0, 0). Go 3 across and 2 up. Where are you? | (3, 2) | Going 3 across and 2 up lands on (3, 2). Across is always written first, then up. |
| 4 | Start at (0, 0). Go 1 across and 4 up. Where are you? | (1, 4) | Going 1 across and 4 up lands on (1, 4). The across number is always written first. |
| 5 | A treasure is at (2, 5). From (0, 0) you go ___. | 2 across and 5 up | In (2, 5), the first number, 2, means across, and the second number, 5, means up. |
| 6 | A park is at (3, 4) and a school is at (3, 1). The school is ___ squares south of the park. | 3 | Both are 3 across, so only the up number changes. From 4 down to 1 is 3 squares south. |
| 7 | A library is at (1, 2) and a zoo is at (5, 2). The zoo is ___ squares east of the library. | 4 | Both are 2 up, so only the across number changes. From 1 to 5 is 4 squares east. |
| 8 | A bank is at (2, 2). Go 3 squares east and 1 square north. Where are you? | (5, 3) | East adds to across and north adds to up. 2 plus 3 is 5, and 2 plus 1 is 3. |
| 9 | Which point is farthest to the east: (2, 1), (6, 1), (4, 4) or (1, 6)? | (6, 1) | East is to the right, so the biggest across number is farthest east. 6 is the biggest first number. |
| 10 | Which point is farthest north: (1, 2), (4, 6), (5, 3) or (6, 1)? | (4, 6) | North is up, so the biggest up number is farthest north. 6 is the biggest second number. |
| 11 | How many squares apart are (1, 1) and (1, 5)? | 4 | Both points are 1 across. From 1 up to 5 up is 4 squares. |
| 12 | How many squares apart are (2, 3) and (7, 3)? | 5 | Both points are 3 up. From 2 across to 7 across is 5 squares. |
| 13 | Which point is 2 across and 6 up from (0, 0)? | (2, 6) | Across comes first and up comes second, so 2 across and 6 up is written (2, 6). |
| 14 | A kite is at (3, 3). Move it 2 squares west. Where is it? | (1, 3) | West moves left, so the across number gets smaller. 3 take away 2 is 1, so the kite is at (1, 3). |
| 15 | A boat is at (4, 5). Move it 3 squares south. Where is it? | (4, 2) | South moves down, so the up number gets smaller. 5 take away 3 is 2, so the boat is at (4, 2). |
| 16 | A compass rose shows ___. | directions | A compass rose shows north, south, east and west, so you can tell which way to go. |
| 17 | NE on a compass rose stands for ___. | northeast | NE is halfway between north and east. The N is for north and the E is for east. |
| 18 | Which direction is between south and west? | southwest | Halfway between south and west is southwest. Its name joins the two directions together. |
| 19 | A map scale tells you ___. | how map distance matches real distance | A map is much smaller than the real place. The scale tells how much real distance each inch or centimeter stands for. |
| 20 | On a scale where 1 inch equals 10 miles, 3 inches on the map is ___ miles. | 30 | Each inch stands for 10 miles. Three inches is 10 plus 10 plus 10, which makes 30 miles. |
| 21 | On a map where 1 centimeter equals 5 kilometers, two towns 4 centimeters apart are ___ kilometers apart. | 20 | Each centimeter stands for 5 kilometers. Four centimeters is 4 times 5, which makes 20 kilometers. |
| 22 | On most maps, blue stands for ___. | water | Most maps color water blue, like a lake or the sea on a sunny day. |
| 23 | A map title tells you ___. | what the map is about | The title is the map's name. It tells you what place or idea the map shows. |
| 24 | A political map shows ___. | borders of countries or states | Political maps show where countries and states begin and end. Those lines are called borders. |
| 25 | A physical map shows ___. | landforms and water | Physical maps show the land itself, like mountains, valleys, rivers and lakes. |
| 26 | To find how far apart two towns are, use the map ___. | scale | The scale turns map distance into real distance. Measure on the map, then use the scale to find the real miles. |
| 27 | To find out what a map symbol means, check the ___. | key | The key lists each symbol and what it means, like a tiny tent meaning a campground. |
| 28 | To find which way is north, check the ___. | compass rose | The compass rose points to north, south, east and west. Its N arrow shows which way is north. |
| 29 | A road map is most useful for ___. | planning a car trip | A road map shows highways and streets between towns, so it helps you plan a car trip. |
| 30 | The equator divides Earth into the Northern and ___ Hemispheres. | Southern | The equator cuts Earth in half around the middle. The top half is northern and the bottom half is southern. |
| 31 | The imaginary line around the middle of Earth is the ___. | equator | The equator is an imaginary line around Earth's middle, the same distance from the North Pole and the South Pole. |
| 32 | Places near the equator are usually ___. | hot | Near the equator, the Sun shines almost straight down all year, so it is usually hot. |
| 33 | The North Pole is in the ___ Hemisphere. | Northern | The North Pole is at the very top of Earth, north of the equator, so it is in the Northern Hemisphere. |
| 34 | The Prime Meridian divides Earth into the Eastern and ___ Hemispheres. | Western | The Prime Meridian runs from pole to pole and splits Earth into an eastern half and a western half. |
| 35 | Most of the United States is in the Northern and ___ Hemispheres. | Western | The United States is north of the equator and west of the Prime Meridian, so it is mostly Northern and Western. |
| 36 | Australia is in the ___ Hemisphere. | Southern | Australia lies south of the equator, so it is in the Southern Hemisphere. Its summer comes in December. |
| 37 | Lines of latitude run ___ around Earth. | east and west | Latitude lines are rings that circle the globe going east and west, side by side like ladder rungs. |
| 38 | Lines of longitude run from ___. | pole to pole | Longitude lines run from the North Pole to the South Pole, like the slices of an orange. |
| 39 | Latitude tells how far a place is north or south of the ___. | equator | Latitude measures how far north or south a place is, starting from the equator at zero. |
| 40 | Longitude tells how far a place is east or west of the ___. | Prime Meridian | Longitude measures how far east or west a place is, starting from the Prime Meridian at zero. |
| 41 | The farthest north place on Earth is the ___. | North Pole | The North Pole is as far north as you can go. Every direction from there is south. |
| 42 | A globe is a ___ model of Earth. | round | Earth is shaped like a ball, so a round globe shows its true shape best. |
| 43 | Places far from the equator, near the poles, are usually ___. | cold | Near the poles, sunlight comes in at a low slant and spreads out, so those places stay cold. |
| 44 | The usual weather of a place over many years is its ___. | climate | Climate is the weather pattern a place keeps over many years. One rainy day is weather, not climate. |
| 45 | Weather is what the sky is doing today. Climate is ___. | the usual weather over many years | Weather can change in an hour. Climate is the usual weather a place has year after year. |
| 46 | A tropical climate near the equator is ___ all year. | warm | Near the equator, the Sun shines strongly all year, so tropical places stay warm in every season. |
| 47 | A desert climate is ___. | dry | A desert climate gets very little rain or snow all year, so the land stays dry. |
| 48 | A polar climate is ___. | very cold | Polar places are near the poles, where the Sun's light is weak and slanted. So they stay very cold. |
| 49 | A tropical rain forest gets ___ rain. | a lot of | Rain forests are warm, wet places. Rain falls there most days, which helps the thick forest grow. |
| 50 | Which place has a polar climate? | Antarctica | Antarctica surrounds the South Pole. It is covered in ice, so it has a polar climate. |
| 51 | Which place usually has a desert climate? | the Sahara | The Sahara gets very little rain all year, so it has a desert climate. |
| 52 | It is colder near the poles because the Sun's light hits Earth there ___. | at a slant and spreads out | Near the poles, sunlight hits at a slant and spreads over more ground, so each spot gets less warmth. |
| 53 | The top of a high mountain is colder because the air there is ___. | thinner | High up, the air is thinner and holds less heat. That is why mountaintops can have snow even in summer. |
| 54 | A place near the ocean usually has ___ temperatures than a place far inland. | milder | Oceans warm up and cool down slowly. That keeps nearby places from getting very hot or very cold. |
| 55 | The three main climate zones are tropical, temperate and ___. | polar | Going from the equator to the poles, the zones are tropical, then temperate, then polar. |
| 56 | A temperate climate has ___. | four seasons | Temperate places sit between the hot tropics and the cold poles, so they get summer, fall, winter and spring. |
| 57 | Most of the United States has a ___ climate. | temperate | Most of the United States is between the tropics and the poles, so it has four seasons and a temperate climate. |
| 58 | Mount Everest is the tallest mountain on Earth above sea level. It is in the ___ Mountains. | Himalaya | Mount Everest is in the Himalaya, a giant mountain range in Asia with many of the world's tallest peaks. |
| 59 | The Himalayas are in ___. | Asia | The Himalayas run across southern Asia, through countries like Nepal, India and China. |
| 60 | The Andes Mountains run along the west side of ___. | South America | The Andes are the longest mountain range on land. They run all along South America's west coast. |
| 61 | The Alps are a mountain range in ___. | Europe | The Alps are in Europe, crossing countries like France, Switzerland, Italy and Austria. |
| 62 | The Nile River flows through ___. | Africa | The Nile flows north through Africa into the Mediterranean Sea. It is one of the longest rivers on Earth. |
| 63 | The Amazon River is in ___. | South America | The Amazon River flows across South America, through the giant Amazon rain forest, to the Atlantic Ocean. |
| 64 | The Sahara, the largest hot desert, is in ___. | Africa | The Sahara covers much of northern Africa. It is the biggest hot desert on Earth. |
| 65 | The Rocky Mountains are in ___. | North America | The Rocky Mountains run through the western United States and Canada, which are in North America. |
| 66 | The Ganges River flows through ___. | India | The Ganges begins high in the Himalaya mountains and flows across northern India toward the sea. |
| 67 | The Danube River flows through ___. | Europe | The Danube flows across Europe, through many countries, before it reaches the Black Sea. |
| 68 | Mount Kilimanjaro is the tallest mountain in ___. | Africa | Mount Kilimanjaro is in Tanzania, in eastern Africa. It is the tallest mountain on the whole continent. |
| 69 | The Great Barrier Reef is off the coast of ___. | Australia | The Great Barrier Reef lies off Australia's northeast coast. It is the largest coral reef system on Earth. |
| 70 | Mount Fuji, a famous volcano, is in ___. | Japan | Mount Fuji is the tallest mountain in Japan, an island country in Asia. It is a quiet volcano. |
| 71 | The Yangtze River flows through ___. | China | The Yangtze is the longest river in Asia, and it flows across China from west to east. |
| 72 | The biggest island in the world that is not a continent is ___. | Greenland | Australia is counted as a continent, so the next biggest, Greenland, is the largest island. |
| 73 | The deepest spot in the ocean is in the Mariana ___. | Trench | A trench is a long, deep crack in the ocean floor. The Mariana Trench in the Pacific is the deepest. |

## States & Capitals: `geo_us` level 1 (164 items, built from tables)

All rows here come from the tables `DISC_ST` and `DISC_ADJ` in `src/data/d-disc2-soc.js`, so each row type gets one template.
Slots are filled from that row's table entry. Rows per type: capitals 48, states 28, regions 39, borders 47, plus 2 fixed rows.

| Row type | Question pattern | Answer | Why template |
|---|---|---|---|
| capitals (48) | What is the capital of {state}? | {capital} | {capital} is the capital of {state}. That is the city where the state's leaders meet to make its laws. |
| states (28) | {capital} is the capital of which state? | {state} | {capital} is the capital of {state}, so {state}'s leaders meet in {capital} to make the state's laws. |
| regions (39) | Which region of the United States is {state} in? | {region} | {state} is in {where} of the country, so it belongs to the {region} region. |
| borders (47) | Which state shares a border with {state}? | {neighbor} (the row's right answer) | {neighbor} and {state} are neighbors. On a map, they touch along a shared border line. |

`{where}` for the regions template, by region code:

| Region | `{where}` |
|---|---|
| Northeast | the northeast corner |
| Southeast | the southeast corner |
| Midwest | the north-central part |
| Southwest | the southwest part |
| West | the far west |

Example: "Ohio is in the north-central part of the country, so it belongs to the Midwest region."

Two rows are fixed text, not from a table:

| # | Question | Answer | Why (proposed) |
|---|---|---|---|
| 1 | The capital of the United States is ___. | Washington, D.C. | Washington, D.C. is our nation's capital. Congress, the President and the Supreme Court all work there. |
| 2 | How many states are in the United States? | 50 | The United States has 50 states, and each one has its own star on the flag. |
