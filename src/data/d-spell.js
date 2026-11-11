/* ---------- spelling words (P2-19, CURRICULUM E-spell) ---------- */
/* SPELL_WORDS[lv] is one string per level, one word per line as `word|sentence`. The sentence holds the word exactly once (a capital
   letter at the start is fine); the app shows it with the word blanked out and speaks word, sentence, word.
   Homophones (their/there, knight/night ...) have sentences that only one of them fits. Words are a-z only, 12 letters at most,
   and pass the BAD filter (tools/test.js checks all of this). Level 1 has 40 words, levels 2 to 7 have 60.
   No days or months (R-01r): they need a capital, and the keyboard spells in small letters. */
const SPELL_WORDS={
1:`cat|The cat sat on the mat.
bed|I go to bed at night.
pig|The pig rolled in the mud.
hot|The soup is too hot to eat.
sun|The sun is up in the sky.
dog|My dog likes to run and play.
hat|She put a hat on her head.
cup|Please fill my cup with milk.
bus|We ride the bus to school.
fox|A red fox ran into the woods.
bug|I found a little bug on a leaf.
hen|The hen sat on her egg.
box|The toy is in the big box.
map|We looked at the map to find the park.
pen|Write your name with a pen.
van|Dad drove the van to the shop.
bag|Put your lunch in the bag.
rat|A rat ran under the barn.
nut|The squirrel ate a nut.
egg|She cracked the egg into a bowl.
tub|The baby splashed in the tub.
mug|He drank cocoa from a warm mug.
net|The fish swam into the net.
jam|I like jam on my toast.
lip|He bit his lip.
fin|The shark has a big fin.
log|A frog sat on the log.
mop|Please use the mop on the floor.
top|The ball is on the top shelf.
pot|Mom cooked soup in a pot.
red|My kite is red.
wet|The dog got wet in the rain.
yes|Can I have more? Yes, you can!
run|I can run very fast.
sit|Please sit down on the rug.
hop|The bunny will hop away.
dig|We dig a hole in the sand.
fan|A fan keeps us cool.
lid|Put the lid on the jar.
gum|Do not stick gum under the desk.`,
2:`ship|The ship sailed across the sea.
chat|We like to chat after lunch.
thin|The paper is very thin.
frog|The frog jumped into the pond.
duck|A duck swam on the lake.
bell|The school bell rang.
grass|The cows eat the green grass.
dress|She wore a red dress.
chip|I dropped a chip of wood.
shop|We went to the shop for bread.
fish|The fish swam in the bowl.
that|Look at that big dog.
this|This is my favorite book.
when|Tell me when you are ready.
with|Come and play with me.
crab|The crab walked on the sand.
drum|He beat the drum loudly.
flag|The flag waves in the wind.
step|Take one step forward.
clap|Clap your hands to the beat.
swim|I learned to swim last summer.
stop|Stop at the red light.
plan|We made a plan for the picnic.
trip|We took a trip to the zoo.
snap|I heard a twig snap.
skip|The girls skip rope at recess.
spot|The cat has a white spot.
clock|The clock on the wall says six.
truck|A big truck carried the sand.
sock|I lost one sock in the wash.
kick|Kick the ball to me.
neck|A giraffe has a long neck.
back|Put the book back on the shelf.
pack|Pack your bag for the trip.
rock|He found a smooth rock.
tick|I can hear the clock tick.
doll|She hugged her soft doll.
hill|We rolled down the hill.
mill|The old mill is by the river.
fill|Fill the glass with water.
well|I do not feel well today.
toss|Toss the ball to your friend.
moss|Green moss grows on the log.
miss|I miss my grandma.
fuss|The baby began to fuss.
glad|I am glad you came.
slip|Do not slip on the wet floor.
brush|Brush your teeth twice a day.
splash|The kids splash in the puddle.
chest|The pirate hid gold in a chest.
shell|I found a shell on the beach.
cloth|Wipe the table with a cloth.
film|We watched a film at school.
tent|We slept in a tent.
nest|A bird built a nest in the tree.
milk|I drink milk with my dinner.
gift|She gave me a gift.
sand|The sand is warm and soft.
lamp|Turn on the lamp to read.
jump|Can you jump over the rope?`,
3:`cake|We ate cake at the party.
kite|The kite flew high in the sky.
bike|I ride my bike to the park.
home|It is time to go home.
rose|A red rose grew by the gate.
bone|The dog buried a bone.
nose|A clown has a red nose.
game|Let us play a game.
five|I have five fingers on my hand.
nine|The clock struck nine.
plane|The plane flew over the town.
snake|A snake slid through the grass.
smile|Her smile is big and bright.
wave|Wave goodbye to Grandpa.
slide|We took turns on the slide.
stone|He skipped a stone on the lake.
rain|The rain tapped on the window.
boat|We rowed the boat to the shore.
tree|A bird sat in the tree.
train|The train rolled into the station.
snail|A snail moves very slowly.
road|The road winds up the hill.
soap|Wash your hands with soap.
moon|The moon shines at night.
book|I read a book before bed.
boot|He lost a boot in the snow.
cheese|I like cheese on my pizza.
tooth|My loose tooth fell out.
mail|The mail came early today.
seed|Plant a seed in the dirt.
leaf|A leaf floated down the stream.
feet|My feet are cold.
sheep|The sheep ate grass on the farm.
goat|The goat climbed the rocks.
coat|Wear your coat outside.
team|Our team won the game.
meat|We cooked meat on the grill.
beach|We built castles at the beach.
paint|Paint a picture of the sea.
wait|Please wait for me.
play|The children play at recess.
day|It was a sunny day.
gray|The sky turned gray.
light|Turn on the light.
night|The stars come out at night.
right|Turn right at the corner.
jumped|The cat jumped on the sofa.
helped|She helped me carry the bags.
walked|We walked to the park.
played|They played ball all afternoon.
looked|He looked out the window.
painted|We painted the fence white.
jumping|The frog is jumping in the pond.
playing|The kids are playing outside.
singing|Birds are singing in the morning.
asking|She is asking a question.
reading|I am reading a funny story.
tube|Squeeze the tube of paste.
pine|A pine tree smells fresh.
cold|The water in the lake is cold.`,
4:`first|I was first in line.
girl|The girl waved at us.
bird|A bird sang in the tree.
turn|It is my turn to play.
hurt|Did you hurt your knee?
star|The star twinkled at night.
farm|The cows live on the farm.
barn|The horse sleeps in the barn.
corn|We ate corn at dinner.
horse|The horse ran across the field.
fork|Use a fork to eat your peas.
storm|A big storm blew in last night.
shirt|He wore a blue shirt.
sport|Soccer is my favorite sport.
dark|It is dark in the cave.
cloud|One white cloud floated by.
house|Our house has a red door.
mouse|A mouse hid in the wall.
brown|The brown bear ate honey.
clown|The clown made us laugh.
town|We walked to town.
flower|She picked a yellow flower.
coin|I found a coin on the ground.
oil|Oil and water do not mix.
boy|The boy kicked the ball.
toy|My toy is under the bed.
join|Join us for a snack.
hopping|The bunny is hopping across the yard.
running|We are running in the race.
sitting|She is sitting on the porch.
swimming|The ducks are swimming in the pond.
stopped|The bus stopped at the corner.
planned|We planned a surprise party.
making|Dad is making pancakes.
taking|She is taking a picture.
hoping|I am hoping for snow.
riding|He is riding his bike.
babies|The babies are asleep.
puppies|Three puppies played in the yard.
families|Many families came to the show.
boxes|We packed the boxes in the car.
wishes|She made three wishes.
buses|Two buses stopped at the school.
dishes|Please wash the dishes.
friend|My friend lives next door.
said|She said hello to me.
were|We were at the park.
people|Many people came to the fair.
because|I was happy because it was my birthday.
again|Please read it again.
water|I drink a glass of water.
very|The soup is very hot.
once|Once there was a little pig.
only|I have only one pencil.
done|I am done with my chores.
could|I wish I could fly.
would|Would you like some tea?
laugh|The jokes made us laugh.
two|I have two sisters.
eight|The movie starts at eight.`,
5:`unhappy|He was unhappy when the toy broke.
unfair|It is unfair to cut in line.
unlock|Use the key to unlock the door.
unkind|It is unkind to laugh at someone who falls.
undo|Please undo the knot in my shoelace.
replay|Let us replay the song.
rewrite|Please rewrite your story neatly.
preheat|Preheat the oven before you bake.
preview|We watched a preview of the new movie.
disagree|I disagree with that idea.
dislike|I dislike loud noises.
careful|Be careful with the glass.
helpful|She is a very helpful girl.
joyful|The joyful crowd cheered.
painful|A splinter can be painful.
playful|The playful puppy chased his tail.
useless|A broken pencil is useless.
kindness|Her kindness made me smile.
slowly|The turtle walked slowly.
quickly|He ran quickly to the door.
quietly|She tiptoed quietly past the baby.
teacher|My teacher reads to us every day.
knight|The brave knight rode a horse.
knee|I scraped my knee.
knife|Use a knife to cut the apple.
know|Do you know the answer?
write|Write your name at the top.
wrist|He wears a watch on his wrist.
wrong|That answer is wrong.
wrap|Wrap the present in paper.
gnat|A tiny gnat buzzed by my ear.
lamb|The lamb stayed close to its mother.
comb|Comb your hair before school.
climb|We climb the tall hill.
thumb|I hurt my thumb.
listen|Listen to the music.
castle|The castle sits on a hill.
their|The kids put on their coats.
there|Put the book over there.
hear|I can hear birds singing.
here|Come over here and sit.
to|We went to the park.
too|I want to come too.
see|I see a bird in the tree.
sea|The ship sailed on the sea.
son|Their son plays the drums.
new|I got a new bike.
knew|I knew the answer right away.
by|She sat by the window.
buy|We buy fruit at the market.
flour|Mix the flour with the eggs.
week|We have school five days a week.
weak|The baby bird was weak.
tail|The dog wagged its tail.
tale|Grandpa told a tale about a giant.
meet|I will meet you at the gate.
bear|A bear sleeps all winter.
pair|I bought a new pair of shoes.
wood|We burned wood in the fireplace.
would|Would you like some tea?`,
6:`nation|Our nation has fifty states.
station|The train left the station.
action|The movie was full of action.
fraction|One half is a fraction.
question|May I ask a question?
mention|Please do not mention the surprise.
section|Read the first section of the book.
collection|She has a collection of shells.
direction|Which direction is the park?
invention|The lightbulb was a great invention.
vacation|We went to the lake on vacation.
education|A good education opens many doors.
decision|It was a hard decision.
vision|Glasses help improve your vision.
division|We learned long division today.
television|We watched television after dinner.
confusion|There was confusion at the door.
possible|Anything is possible if you try.
terrible|The storm was terrible.
horrible|The monster in the story was horrible.
visible|The moon was visible through the clouds.
sensible|It is sensible to wear a helmet.
comfortable|This chair is very comfortable.
reasonable|The price of the shirt is reasonable.
capable|She is capable of lifting the box.
valuable|The old coin is valuable.
enjoyable|The picnic was enjoyable.
believable|His story was not believable.
separate|Please separate the red beads from the blue.
necessary|It is necessary to wear shoes.
different|My sister and I are different.
beautiful|The garden is beautiful in spring.
favorite|Blue is my favorite color.
interesting|That was an interesting book.
vegetable|Carrot is a vegetable.
library|I borrowed a book from the library.
knowledge|Reading books adds to your knowledge.
government|The government makes the laws.
neighbor|My neighbor waves from her porch.
exercise|We do exercise every morning.
important|It is important to drink water.
probably|It will probably rain today.
surprise|The party was a big surprise.
business|He runs a small business.
calendar|Look at the calendar to see the date.
camera|She took a photo with her camera.
thermometer|The thermometer shows the temperature.
telephone|Please answer the telephone.
microscope|We looked at a leaf under the microscope.
autograph|The singer signed an autograph for me.
photograph|I framed a photograph of my family.
geography|In geography we studied maps.
biology|Biology is the study of living things.
automatic|The door is automatic.
century|A century is one hundred years.
describe|Describe the animal you saw.
unusual|A purple cow is unusual.
whether|I wonder whether it will snow.
believe|I believe you are right.
receive|I hope to receive a letter.`,
7:`accommodate|The hotel can accommodate fifty guests.
rhythm|The drummer kept a steady rhythm.
environment|We must protect the environment.
definitely|I will definitely be there.
embarrass|Do not embarrass your little brother.
occasion|A birthday is a special occasion.
occurred|The accident occurred last night.
recommend|I recommend this book to you.
familiar|That song sounds familiar.
committee|The committee voted on the plan.
address|Write your address on the envelope.
success|Hard work leads to success.
across|The bridge goes across the river.
tomorrow|We will visit grandma tomorrow.
paragraph|Each paragraph has a main idea.
conscience|Her conscience told her to tell the truth.
disappear|Magicians make rabbits disappear.
disappoint|I did not want to disappoint my coach.
immediately|Please come immediately.
independent|She is an independent girl.
parallel|The two roads run parallel to each other.
privilege|Having a pet is a privilege.
pronounce|Can you pronounce that long word?
restaurant|We ate dinner at the restaurant.
schedule|My schedule is full on Tuesday.
sincerely|Sincerely, your friend, Sam.
temperature|The temperature dropped overnight.
vocabulary|She learns new vocabulary every week.
awkward|He felt awkward at the dance.
column|Read the first column of the page.
exaggerate|Do not exaggerate when you tell the story.
foreign|She speaks a foreign language.
height|The height of the tree surprised us.
humorous|The humorous story made us giggle.
jewelry|Her jewelry sparkled in the light.
leisure|He reads in his leisure time.
miniature|The museum had a miniature train.
mischievous|The mischievous kitten unrolled the yarn.
noticeable|The scratch on the car was noticeable.
opportunity|This is a great opportunity to learn.
perseverance|Perseverance helped him finish the race.
physical|Running is good physical activity.
playwright|The playwright wrote a new show.
possession|The coat is my favorite possession.
guarantee|The shop will guarantee the repair.
reference|Use a dictionary for reference.
relevant|Keep your answer relevant to the question.
responsible|I am responsible for feeding the dog.
sandwich|She packed a ham sandwich.
secretary|The secretary answered the phone.
silhouette|We saw a silhouette against the wall.
suppose|I suppose you are right.
symbol|A dove is a symbol of peace.
technique|She practiced her painting technique.
thorough|He gave the room a thorough cleaning.
twelfth|Her birthday is on the twelfth of June.
unanimous|The vote was unanimous.
variety|The store sells a variety of fruit.
muscle|Your heart is a strong muscle.
yacht|The yacht sailed past the island.`
};

/* ---------- spelling generator (P2-19) ---------- */
/* Skill `spell`, levels 1-7. Data is read only inside these functions (data files load after the code). */
const SPELL_CACHE={};
// [[word, sentence], ...] of a level, parsed once
function spellList(lv){
  if(!SPELL_CACHE[lv])SPELL_CACHE[lv]=String(SPELL_WORDS[lv]||'').split('\n').map(l=>l.split('|'));
  return SPELL_CACHE[lv];
}
// A picture for words the reading lists already have an emoji for; picFor swaps in the drawing when one exists
function spellPic(w){
  for(const L of [CVC,BLEND,MAGICE,TEAMS])for(const [x,e] of L)if(x==w)return picFor(w,e);
  return '';
}
function genSpell(lv){
  const [w,s]=pick(spellList(lv));
  const blanked=s.replace(new RegExp('\\b'+w+'\\b','i'),'_____'); // the visible clue when speech is off
  const pic=spellPic(w);
  return{kind:'spell',word:w,ans:w,auto:true,after:w,
    html:`${pic?`<div class="emo">${pic}</div>`:''}<div class="bq">${esc(blanked)}</div>`
      +`<div class="lslots">${[...w].map((_,i)=>`<span class="ls" id="ls${i}"></span>`).join('')}</div>`,
    say:`${w}. ${s} ${w}.`,
    hint:{k:'say',w,s:`It has ${w.length} letters and starts with “${w[0]}”.`},
    label:`spelling “${w}”`};
}
