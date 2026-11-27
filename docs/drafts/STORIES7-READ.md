# Decodable mini-stories with read-along: read-through (STORIES-7)

BEST-APP roadmap item 7. Each phonics stage of the reading map gets six short stories that use only the sounds taught so far and a
few sight words. In each story the app reads to the child while every word lights up as it is spoken ("Read to me"), then the
child reads it ("Now you read it", tapping any word to hear it, then "I read it!"), then answers one or two picture questions.

status: reviewed owner 2026-11-27

Status: **pending owner approval**. Every story, every question and every new sentence of the screens is below. The code is built
and tested, but no child sees any of it until the owner approves it. **Recorded (REC-198)**: after the owner's budget decision of
2026-11-27 every story, question and spoken screen sentence, and every word for word taps, is recorded in the pet's teacher voice
(see "Audio plan").

## How to approve (the one-line flip)

Change the status line above from `status: unreviewed` to `status: reviewed <your name> <YYYY-MM-DD>` (for example
`status: reviewed Sam 2026-11-27`), then run `python3 tools/build.py`. The build writes `src/js/42c-story7on.js` with
`STORY7_ON = 1`, and the reading map shows a Stories stop after each phonics stop. With any other status line it writes
`STORY7_ON = 0` and the reading map is exactly as before. To change a story, change it in `src/js/52w-story7d.js`, check it with
`node tools/decode.js`, and paste the new tables from `node tools/decode.js --doc` between the two markers below; tools/test.js
(STORIES-7) checks that every story is decodable and that this file shows exactly the stories the app has. To change a sentence of
the screens, change it in `src/js/52x-story7.js` (ST7W) or `src/js/42c-story7.js` and in the table below.

## How it works

- **Where a child finds it.** On the reading map, a round Stories stop (a book) stands right after each phonics stop: Picture Words
  (K), Blends and Letter Teams (1st, Candy Canyon), Silent E (1st, Ocean Reef), Vowel Teams and Bossy R (2nd, Space Station),
  Vowel Teams 2 (2nd, Word Workshop). It opens when that stop's practice opens (the stop is reached and its lesson is done), the same
  rule as practice. A tap opens the Stories shelf at that stage; the shelf lists every stage, its stories when open, a lock when not.
  The stories load with the reading lessons' part (teachrd), not at start-up.
- **Read to me.** Each word of the title and the story lights up (a yellow ring) while it is spoken, one word at a time, with a short
  pause after each sentence. The words follow a timing array, one start and end time per word. Today the times are estimated from
  the words and the tablet's voice says each word in turn (each word waits for the voice to finish). When a story is recorded, its
  file and its own word times replace the estimate (ST7A in the code: `{f: file, t: [[start, end], ...]}`), and the same lights follow
  the recording. Tapping Stop, a word, or Now you read it stops the reading.
- **Now you read it.** The words stay still; the child reads, and taps any word to hear it (the tapped word is shaded). "I read it!"
  is the last button.
- **The questions.** One or two picture questions per story, with the round's own picture-choice buttons. The question is read out
  (and can be heard again). A wrong picture is marked and greyed and the child tries again; a right one goes on. Each answer is a
  word of the story, and the two other pictures are not in the story, so exactly one picture is right. Then an end card: "Read it
  again" or "More stories".
- **Nothing is saved.** No stars, no game time, no change to any stop. (Showing which stories were read is easy to add later.)
- **Pictures.** Every story uses an existing drawing (the object art sets); no new art was made.

## How decodability is checked

`tools/decode.js` checks every word of every title and sentence; tools/test.js runs it on every story (STORIES-7). A word passes
when it can be sounded out with the patterns taught up to and including the story's stage, or when it is a sight word of a Sight
Words stop that comes before the stage's stop on the reading map (the Dolch lists the app teaches: Sight Words, More Sight Words,
Sight Words 3, 4 and 5). The stages add, in this order:

| Stage | After the stop | Grade | Adds | Sight words taught by then |
|---|---|---|---|---|
| cvc | Picture Words | K | single consonants, short a e i o u, a doubled last letter (egg, hill); one syllable, one consonant each side | Sight Words |
| blend | Blends | 1st | consonant blends (fr, st, nd, mp ...), ng, nk, two closed syllables (picnic) | + More Sight Words |
| digraph | Letter Teams | 1st | sh, ch, th, wh, ck | + More Sight Words |
| silente | Silent E | 1st | vowel, consonant, quiet e (cake, kite, bone, Pete; ice keeps c soft) | + Sight Words 3 |
| team | Vowel Teams | 2nd | ai, ay, ee, ea, oa | + Sight Words 3 (Sight Words 4 comes after this stop) |
| rvowel | Bossy R | 2nd | ar, or, er, ir, ur | + Sight Words 4 |
| team2 | Vowel Teams 2 | 2nd | oo, ou, ow, oi, oy, aw, ew | + Sight Words 5 |

The rules that keep a word honest: a single vowel never ends a syllable (go, he, robot are not short-vowel words); two vowels side
by side must be a taught team; y and w only before a vowel; r after a vowel only as a bossy r; c and g before e, i or y are soft and
not taught (except the hard g of get and gift); words like ball, talk, cold, find, was, want, put, come, give and bread need a rule
that is not taught, so only a sight list can allow them. An -s ending (cats, jumps, cakes) and 's (Dad's) are allowed on a word that
decodes or on a sight word (looks, likes). Names follow the same rules (Gus, Glen, Kate, Gail, Bart, Roy).

In the tables, "Pattern words" are the words that use the stage's new pattern; "Sight words" are the words that pass only as sight
words. Every other word decodes with an earlier stage's patterns.

## Proposed wording of the screens (pending owner approval)

`{stop}`, `{n}`, `{all}` and `{title}` are filled in by the app. Every spoken sentence is also on the screen.

| Where | Proposed text | Why |
|---|---|---|
| Reading map: the label under the Stories stop; the shelf's title | Stories | Short, and a 5-year-old knows the word. |
| Reading map: the Stories stop's spoken name (screen readers) | Stories: {stop} | Says which stop the stories go with. |
| While the stories load (a slow tablet) | Getting the stories ready... | The same pattern as the Game Room's "Getting the games ready...". |
| Shelf: the line at the top (said aloud for a non-reader) | Pick a story. I read it to you, then you read it! | Tells the child the two steps in the pet's voice. |
| Shelf: a stage that is not open yet | Opens with {stop} | Says when, not "locked". |
| Story: the first button | Read to me | The roadmap's name for the read-along. |
| Story: the same button while reading | Stop | Lets a child or grown-up stop the voice. |
| Story: the second button | Now you read it | The roadmap's words: the child's turn. |
| Story: the last button, in the child's turn | I read it! | The roadmap's words; the child says they are done. |
| Story: the line under the story at first | Tap Read to me. Each word lights up as I say it. | Explains the lights before they start. |
| Story: the line while reading | Look at each word as I say it. | Asks the child to follow the words, which is the point of read-along. |
| Story: the line after the reading (said aloud) | Now you read it! | Hands the turn to the child. |
| Story: the line in the child's turn (said aloud) | Read the story. Tap a word if you need help. | Tapping a word is the only help, so it says so. |
| Questions: above the question | Question {n} of {all} | How many are left. |
| Questions: the button that says the question again | Hear it | The same words as the round's button. |
| Questions: a right picture (shown and said) | Yes! That is right. | Plain and warm. |
| Questions: a wrong picture (shown and said) | Not that one. Look at the story again. | Kind, and points back to the story, where the answer is. |
| End card: the big line (said aloud) | You read {title}! | Names the story the child read. |
| End card: first button | Read it again | Rereading builds fluency. |
| End card: second button | More stories | Back to the shelf at this stage. |

The Stories stop also uses two lines the app already says: "Learn it with {pet} first!" (the stop's lesson is not done) and
"Finish the stop before this one!".

## The stories (pending owner approval)

42 stories: 6 for each of the 7 stages. Each is 3 to 6 short sentences. No magic or spells, no brands, no real characters. The
picture of each story is the drawing named in `src/js/52w-story7d.js` (pic). The questions show three pictures; the answer is first
in the table ("not" lists the other two).

<!-- stories:begin -->
### Stage: cvc (short vowels (CVC); after the stop pic1; sight words from sight1)

| Story | Title | Text | Pattern words | Sight words | Questions |
|---|---|---|---|---|---|
| cvc-1 | Pig in the Mud | Pig is in the mud. Pig can sit in the mud. Pig can dig in the mud. A cat ran up. “Not me!” said the cat. | pig, in, mud, is, can, sit, dig, cat, ran, up, not | the, a, me, said | Who is in the mud? (pig; not dog, hen)<br>Who ran up? (cat; not duck, cow) |
| cvc-2 | The Big Red Bus | Gus has a big red bus. A cat gets on. A dog gets on. A big pig gets on. The bus can not go! | big, red, bus, gus, has, cat, gets, on, dog, pig, can, not | the, a, go | What does Gus have? (bus; not car, truck)<br>Who gets on last? (pig; not cow, duck) |
| cvc-3 | Hen and the Egg | Hen has an egg. Hen sits and sits. Tap, tap, tap! Up pops a little hen. Hen hugs the little hen. | hen, egg, has, an, sits, tap, up, pops, hugs | and, the, a, little | What does Hen sit on? (egg; not ball, hat) |
| cvc-4 | Max the Fox | Max is a fox. Max has a big red hat. Max sets the hat on a cat. Max sets the hat on a pig. It is a hat for a fox! | max, fox, is, has, big, red, hat, sets, on, cat, pig, it | the, a, for | Who is Max? (fox; not dog, cow)<br>What does Max have? (hat; not cup, sock) |
| cvc-5 | The Bug and the Rug | A red bug sat on a rug. A big dog sat on the rug. Run, bug, run! The bug hid in a cup. The dog can not see it. | bug, rug, red, sat, on, big, dog, run, hid, in, cup, can, not, it | the, and, a, see | Where did the bug hide? (cup; not box, hat)<br>Who sat on the rug too? (dog; not cat, pig) |
| cvc-6 | Fun in the Sun | The sun is up. Kim and Dad sit in the sun. Dad has a hat on. Kim has a hat on. The dog has a hat on! Kim, Dad and the dog nap. | fun, in, sun, is, up, kim, dad, sit, has, hat, on, dog, nap | the, and, a | What is up in the sky? (sun; not moon, star)<br>Who has a hat on too? (dog; not cat, hen) |

### Stage: blend (blends; after the stop pic2; sight words from sight1, sight2)

| Story | Title | Text | Pattern words | Sight words | Questions |
|---|---|---|---|---|---|
| blend-1 | Frog on a Log | A frog sits on a log. A crab swims past. “Can you jump?” the frog asks. “Not me!” the crab yells. The frog jumps into the pond. Plop! | frog, crab, swims, past, jump, asks, jumps, pond, plop | a, you, the, me, into | Who sits on the log? (frog; not fish, bird)<br>Who swims past? (crab; not duck, turtle) |
| blend-2 | The Crab Band | Brad the crab has a red drum. Bam! Bam! Bam! A frog hops up. A bug hops up. They all clap and stomp. It is a crab band! | crab, band, brad, drum, frog, clap, and, stomp | the, a, they, all | What does Brad have? (drum; not bell, guitar)<br>Who is Brad? (crab; not fish, turtle) |
| blend-3 | A Gift for Gran | Fran has a gift for Gran. The gift is in a big box. Is it a mug? Gran lifts the lid. It is a drum! Bam, bam, bam! | gift, gran, fran, lifts, drum | a, for, the | What is in the box? (drum; not bell, ball) |
| blend-4 | The Wet Tent | Brent and Dad set up a tent. They get in the tent. Drip, drop, drip! The tent gets wet. Brent and Dad still grin. It is fun to camp! | tent, brent, and, drip, drop, still, grin, camp | the, a, they, to | Where do Brent and Dad sit? (tent; not house, car) |
| blend-5 | Glen Can Do It | Glen can do a handstand. His legs go up. His hands go flat. Glen spins. Flop! Glen lands on the grass and grins. | glen, handstand, hands, flat, spins, flop, lands, grass, and, grins | do, a, go, the | What goes flat on the grass? (hand; not foot, ear) |
| blend-6 | Spill! | Stef has milk in a cup. The cat jumps up on the desk. Spill! The milk drips on the rug. The cat drinks it up fast. Stef grins at the cat. | spill, stef, milk, jumps, desk, drips, drinks, fast, grins | a, the | What does Stef have in the cup? (milk; not water, apple)<br>Who drinks it up? (cat; not dog, fish) |

### Stage: digraph (letter teams sh ch th wh ck; after the stop sound4; sight words from sight1, sight2)

| Story | Title | Text | Pattern words | Sight words | Questions |
|---|---|---|---|---|---|
| digraph-1 | The Fish Wish | Seth has a fish. The fish is in a dish. The fish looks at the big pond. “I wish I had a pond,” said the fish. Seth and Mom let it swim in the pond. Splash! | fish, wish, seth, dish, splash | the, a, looks, i, said | What does Seth have? (fish; not bird, cat)<br>What is the fish in at the start? (dish; not cup, box) |
| digraph-2 | Chip the Chick | Chip is a little chick. Chip pecks at a bug. Chip pecks at a nut. Chip pecks at Dad’s sock! “Stop that, Chip!” said Dad. | chip, chick, pecks, sock, that | the, a, little, said | Who is Chip? (chick; not duck, owl)<br>What does Chip peck on Dad? (sock; not shoes, hat) |
| digraph-3 | Josh and the Ship | Josh has a red ship. The ship is in the tub. Josh adds a shell. The shell sits on the ship. Then the ship tips! Splash! | josh, ship, shell, then, splash | the, a | What sits on the ship? (shell; not fish, ball)<br>Where is the ship? (tub; not bed, box) |
| digraph-4 | Thump in the Shed | Thump! Thud! What is in the shed? Beth and Chad check. It is not a moth. It is a duck with a drum! | thump, shed, thud, beth, chad, check, moth, duck, with | the, what, a | What is in the shed? (duck; not cat, horse)<br>What does the duck have? (drum; not bell, ball) |
| digraph-5 | No Bun for Whit | Whit packs a bun for lunch. He sits on a bench. His dog sniffs the bun. Munch, munch! No bun for Whit! | whit, packs, lunch, bench, munch | no, for, a, he, the | Who gets the bun? (dog; not cat, bird) |
| digraph-6 | The Thin Moth | A thin moth sits on a lamp. Click! The lamp is on. The moth spins and spins. Click! The lamp is off, and the moth can rest. | thin, moth, click | the, a | What does the moth sit on? (lamp; not chair, door) |

### Stage: silente (silent e; after the stop pic3; sight words from sight1, sight2, sight3)

| Story | Title | Text | Pattern words | Sight words | Questions |
|---|---|---|---|---|---|
| silente-1 | Kate and the Kite | Kate has a red kite. Kate and Mike run up a hill. The kite rises up, up, up! Then it dives. It lands on Mike’s nose! Mike smiles. | kate, kite, mike, rises, dives, mike's, nose, smiles | the, a | What does Kate have? (kite; not balloon, ball)<br>Where does the kite land? (nose; not hand, foot) |
| silente-2 | A Cake for Mom | Jake bakes a cake for Mom. He puts grapes on top. The dog wakes up. It sniffs the cake. Then it takes a bite! Jake has to bake a new cake. | cake, jake, bakes, grapes, wakes, takes, bite, bake | a, for, he, the, to, new | What does Jake put on top? (grapes; not banana, strawberry)<br>Who takes a bite? (dog; not cat, mouse) |
| silente-3 | Pete Rides His Bike | Pete rides his bike to the lake. He rides past a cat on a gate. The cat smiles at Pete. Pete smiles at the cat. Then Pete rides home fast! | pete, rides, bike, lake, gate, smiles, home | to, the, he, a | What does Pete ride? (bike; not car, bus)<br>Who smiles at Pete? (cat; not dog, horse) |
| silente-4 | Duke and the Bone | Rose has a dog. His name is Duke. Duke hides his bone in a hole. Then he can not find it! Rose and Duke dig and dig. At last, there it is! | duke, bone, rose, name, hides, hole | the, a, he, find, there | What does Duke hide? (bone; not ball, sock) |
| silente-5 | Dave and the Plane | Dave has a white plane. Zip! It glides up and up. Then it glides down. It lands on a cake at the picnic! Mom and Dave smile at the plane. | dave, plane, white, glides, cake, smile | the, a, down | What does Dave have? (plane; not car, rocket)<br>Where does the plane land? (cake; not hat, box) |
| silente-6 | The Dice Game | Lin and Gabe play a game with dice. Lin tosses five and five. Gabe tosses six and six! “I win!” yells Gabe. Lin smiles. “Let us play again!” | dice, game, gabe, five, smiles | the, play, a, i, again | What do Lin and Gabe play with? (dice; not ball, crayon) |

### Stage: team (vowel teams ai ay ee ea oa; after the stop pic4; sight words from sight1, sight2, sight3)

| Story | Title | Text | Pattern words | Sight words | Questions |
|---|---|---|---|---|---|
| team-1 | The Sheep in the Boat | A sheep gets in a boat. The boat floats on the sea. A big wave rocks the boat. The sheep keeps eating oats. What a brave sheep! | sheep, boat, floats, sea, keeps, eating, oats | the, a, what | Who is in the boat? (sheep; not cow, horse)<br>What is the sheep in? (boat; not car, train) |
| team-2 | A Wet Day | It rains and rains. Gail has a red coat. Dean has a green coat. They jump and splash in the rain. Then the sun peeks out. What a fun day! | day, rains, gail, coat, dean, green, rain, peeks | a, they, the, out, what | What does Gail have on? (coat; not shirt, dress)<br>What peeks out? (sun; not moon, cloud) |
| team-3 | Bea the Bee | Bea the bee sleeps on a leaf. The leaf is in a tree. Then the leaf drops. Bea wakes up on a sheep! The sheep eats the leaf. Bea zips away. | bea, bee, sleeps, leaf, tree, sheep, eats | the, a, away | What does Bea sleep on? (leaf; not flower, apple)<br>Where does Bea wake up? (sheep; not cow, horse) |
| team-4 | Jay and the Train | Jay and Dad wait for the train. Here it is! They get on and sit in a seat. The train speeds past green trees. Jay waves at a sheep. The sheep just eats. | jay, train, wait, seat, speeds, green, trees, sheep, eats | the, for, here, they, a | What do Jay and Dad ride? (train; not bus, plane)<br>Who does Jay wave at? (sheep; not cow, horse) |
| team-5 | Ray and the Soap | Ray has mud on his feet. Mom hands him the soap. Scrub, scrub, scrub! The soap slips and sails into the pail. Splash! Now Ray has clean feet. | ray, soap, feet, sails, pail, clean | the, into, now | What slips? (soap; not shoes, cup)<br>What has mud on it? (feet; not nose, ear) |
| team-6 | A Goat on the Road | Neal and Gran go on a road trip. They eat peanuts and sing. Then a goat sits on the road! Beep, beep! The goat just sits. So Neal and Gran eat peanuts and wait. | goat, road, neal, eat, peanuts, beep, wait | a, the, go, they, so | Where does the goat sit? (road; not beach, school) |

### Stage: rvowel (bossy r: ar or er ir ur; after the stop pic5; sight words from sight1, sight2, sight3, sight4)

| Story | Title | Text | Pattern words | Sight words | Questions |
|---|---|---|---|---|---|
| rvowel-1 | A Star for Bart | Bart sits in the yard after dark. He looks up and sees the first star. Bart makes a wish for a pet shark. The next day, Mom gets him a fish. It is a start! | star, for, bart, yard, after, dark, first, shark, start | a, the, he, looks | What does Bart see? (star; not moon, sun)<br>What does Mom get Bart? (fish; not dog, turtle) |
| rvowel-2 | Fern the Bird | Fern is a bird. She has a nest in a birch tree. Fern chirps to her three chicks. The chicks chirp back. Chirp, chirp, chirp! It is a bird song. | fern, bird, birch, chirps, her, chirp | the, a, she, to | Who is Fern? (bird; not butterfly, bee)<br>Where is the nest? (tree; not house, car) |
| rvowel-3 | Corn on the Farm | Norm has a farm with lots of corn. Then a storm starts. Norm runs to the barn. Thunder! The corn gets lots of rain. Now the corn is up to Norm’s chin! | corn, farm, norm, storm, starts, barn, thunder, norm's | the, a, of, to, now | What comes to the farm? (storm; not snowman, rainbow) |
| rvowel-4 | The Jam Star | Kirk has a shirt with a star on it. At lunch, he drips jam on the shirt. Kirk and Mom scrub and scrub. The jam spot is still there. So Mom turns it into a jam star. Now Kirk has two stars! | star, kirk, shirt, turns, stars | the, a, he, there, so, into, now, two | What does Kirk drip jam on? (shirt; not pants, hat)<br>What is on the shirt? (star; not moon, sun) |
| rvowel-5 | The Car Race | Mark and Herb have a car race. Herb’s car is fast. Mark’s car is faster. Then Mark’s car tips over! Herb stops his car to help him. They cross the line side by side. | car, mark, herb, herb's, mark's, faster | the, have, a, over, to, they, by | What do Mark and Herb race? (car; not bike, train) |
| rvowel-6 | The Fort | Barb and Kurt make a fort. They hang a sheet on top. They tell jokes by a torch. Then the dog barks and jumps in! The fort tips over. Barb, Kurt and the dog are in a heap. | fort, barb, kurt, torch, barks | the, a, they, by, over, are | What is in the fort? (torch; not lamp, crayon)<br>Who jumps in? (dog; not cat, rabbit) |

### Stage: team2 (vowel teams oo ou ow oi oy aw ew; after the stop pic6; sight words from sight1, sight2, sight3, sight4, sight5)

| Story | Title | Text | Pattern words | Sight words | Questions |
|---|---|---|---|---|---|
| team2-1 | Brook and the Moon | Brook looks out at the moon. It is big and round. She holds up her spoon. “I will scoop up the moon!” Brook and Mom laugh and laugh. | brook, moon, looks, out, round, spoon, scoop | the, she, holds, i, laugh | What does Brook hold up? (spoon; not cup, pencil)<br>What does Brook look at? (moon; not sun, star) |
| team2-2 | A Mouse in the House | A brown mouse lives in our house. One day it sneaks out of its hole. It finds a crust of toast on the couch. “Wow!” it shouts. “A feast!” Then it sees the cat and zooms home! | mouse, house, brown, out, couch, wow, shouts, zooms | a, the, lives, our, one, of, finds | Who lives in the house? (mouse; not rabbit, bird)<br>Who does the mouse see? (cat; not dog, owl) |
| team2-3 | The Cow and the Owl | A cow and an owl live on a farm. The cow eats grass all day. The owl sleeps all day. When the moon comes up, the owl hoots and hoots. The cow can not sleep! So now the cow naps in the day, too. | cow, owl, moon, hoots, now, too | the, a, live, all, comes, so | Who hoots? (owl; not duck, frog)<br>Who naps in the day now? (cow; not horse, sheep) |
| team2-4 | The Toy Boat | Roy has a toy boat. He sails it on the pool. Oops, the boat floats away! Then his dog jumps in with a splash. The dog swims and brings the boat back to Roy. What a good dog! | toy, roy, pool, oops, good | the, a, he, away, to, what | What does Roy have? (boat; not car, kite)<br>Who brings the boat back? (dog; not cat, duck) |
| team2-5 | Drew Draws | Drew likes to draw. He draws a crown. He draws a clown with a red nose. Then he draws a cow that jumps over the moon! Gran tapes them up in her room. | drew, draws, draw, crown, clown, cow, moon, room | to, he, a, over, the | What does Drew like to do? (draw; not guitar, ball)<br>What jumps over the moon? (cow; not sheep, horse) |
| team2-6 | Scout and the Hawk | Scout is a brown hound. He digs a bone out of the ground. Then a hawk swoops down and grabs it! Scout howls and howls. The hawk drops the bone. Scout has his bone back. | scout, hawk, brown, hound, out, ground, swoops, down, howls | the, a, he, of | Who grabs the bone? (hawk; not cat, frog)<br>What does Scout dig up? (bone; not ball, shoes) |
<!-- stories:end -->

## Audio plan (the owner's budget decision of 2026-11-27: recorded, REC-198)

**Recorded (REC-198).** The owner raised the audio budget (AUDIO_FAIL in tools/test.js) from 9.5 to 12 MB on 2026-11-27 "for the
read-along stories and the new Spanish words", and approved every story and sentence here. `node tools/en-audio.js --story --words`
recorded, in the teacher voice luna at the little pet's speed 0.95 (audio/story/, manifest src/data/d-story-audio.js in the teachrd part):

| Recorded | Files | Characters sent | Bytes |
|---|---|---|---|
| The 42 stories, each read whole (title, then the sentences), with one [start, end] time in ms per word (ST7A) | 42 | 6,435 | 977,395 |
| The 73 questions and the 6 screen sentences the reader says aloud (shelfTip, tipStart, tipAfter, tipYou, right, wrong; the other 12 are button labels or carry a title or a number, so they are not said or not fixed) (ST7S.lines) | 79 | 1,743 | 254,053 |
| Every different word, lower case, for a tap on a word (ST7S.w) | 397 | 1,625 | 584,715 |

**Word times.** Each new story file was checked with xAI speech to text, which returns word timestamps; the story's words are lined up
with the words heard (the same word, a near miss, two words heard as one or one as two; a word not lined up shares the gap around it by
its letters) and kept only when at least 85% line up (all 42 did, at the first take). Where speech to text cannot be reached, the tool
estimates the times from the file's length, split by syllables with pauses after each sentence (ST7A marks such a story `e: 1`; none is).
The reader lights the words on the recording's clock, one word at a time in order (st7Tick), through the speech module (storyPlay in
12-speech.js: it ducks the music, stops on hush and waits while the app is hidden). Recordings off (Tablet voice, no Opus) or a file
that fails: the word-by-word tablet voice, as before. The word taps were recorded because all the audio stays more than 300 KB under the
budget (11,579,513 of 12,000,000 bytes). tools/test.js "REC-198" checks it all.

The estimate made before the decision used the teacher voice the lessons already have (audio/teach: 1,509 recorded lines, 43,283 characters, 6,245,807
bytes, so about **144 bytes per character** of text, Opus 16 kbps mono):

| What would be recorded | Characters | Estimated size |
|---|---|---|
| The 42 stories, title and sentences (one file per story, read at an even pace, with its word times) | 6,394 | about 0.92 MB |
| The 73 questions (they are read aloud) | 1,529 | about 0.22 MB |
| The screens' 18 sentences (Read to me, Now you read it ...) | 377 | about 0.05 MB |
| Every different word once (392 words), for "tap a word to hear it" (a one-word file is about 1.7 KB at the least) | 1,596 | about 0.67 MB |
| **All of it** | | **about 1.9 MB** |

Options for the owner: (a) record the stories only (about 0.92 MB, the read-along itself; questions and word taps stay on the tablet
voice); (b) everything (about 1.9 MB); (c) keep the tablet's voice. (a) or (b) means raising AUDIO_FAIL (to about 10.4 or 11.4 MB) or
recording something else at a lower bit rate. (No budget was changed for the STORIES-7 chunk itself.) A recorded story needs its word times (the
start and end of each word, in ms) as well as the file; the speech tool's word timestamps, or a forced aligner run once, give them.
