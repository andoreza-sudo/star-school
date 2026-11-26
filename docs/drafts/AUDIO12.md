# AUDIO-12: non-reader audio and the last emoji (BEST-APP roadmap 12)

Branch `audio12`, from v197 (VER stays v197). Line numbers are those of this branch.

The owner must approve every new recording. This task records nothing. It does three things:

- lists the gaps, ranked;
- proposes the exact lines to record (section 3);
- says aloud some text the app already shows, for non-readers only (section 4), and draws the emoji a young child sees most (section 5).

## 1. How this was measured

- **Walk.** A Pre-K child ("Mia", 600x960, system Chrome headless) went through these screens:
  - setup, Home, the four maps, a lesson start card;
  - a full math round and a full reading round (the first question answered wrongly once), the chest and the reward card;
  - the Spanish learn cards and a Spanish round, a Discover round;
  - Home again, a mission, the Puzzle of the Day;
  - the Brain Teasers hub, levels screen, and every puzzle type offered to the youngest band at levels 1-3;
  - the Game Room with and without game time, and every game's menu and start;
  - Pet Care (bath, play), the Pet Shop, the sticker book, the streak calendar, Mixed Practice;
  - the three free-sample lock messages.

  On every screen it logged each visible text block and every line the app spoke. `say`, `ttsSay` and `esaPlay` were wrapped, so each line is classed as:
  - **recorded**: EN_AUDIO praise, the teacher voice (EN_TEACH / EN_TEACH0), or ES_AUDIO;
  - **partly recorded**;
  - **device voice**: the tablet's text to speech.
- **Census.** Every Pre-K and K stop of math, reading and Discover (50 stops, 200 seeds each) was generated in Node. Each sentence of `q.say` was checked against the three manifests, the same way `tchRuns` and `enPlan` split it.
- **Code.** I grepped `S.voice`, `say(`, `data-say`, `fb(` and `hear` for the screens the walk could not reach.

Census headline: the Pre-K and K stops say 14,582 sentences in 10,000 questions. **Only 648 (4.4%) are recorded.** They are 3,073 different sentences, and 4 of those are recorded.

## 2. The gaps, ranked by how often a non-reader meets them

"Device voice" means the line is spoken, but by the tablet. Its voice is what the owner called "awful" (REC-ALL). "Silent" means the text is on screen and nothing says it.

| # | Where | What a non-reader meets | Now | How often |
|---|---|---|---|---|
| 1 | Every question, Pre-K and K | The prompt ("How many ducks?", "Watch, then trace it with your finger.", "Which word is this?") | Device voice (96% of sentences) | Every question, 6 to 8 a round |
| 2 | Every answer | The answer said back ("three cookies", "I. I is for igloo!") and the mistake hint (HINTW: "Touch each one as you count. Count each one just once.") | Device voice. These are generated, with numbers and letters | Every question |
| 3 | Round end | "Round complete! Tap the treasure chest!" | **Was silent; now said (AUDIO-12)** | Every round |
| 4 | Reward card | Only "You got N stars! You unlocked the next stop!" is said (recorded). The headline ("Fantastic work!"), game time, coins, streak, "Next stop unlocked: ...", mission and world messages are silent. With 0 stars, the reason the next stop stayed shut was silent | Tip: **now said** to non-readers. The rest is silent | Every round |
| 5 | Map | Nothing is said on arrival. The stop names and world names are text only. A tap on a locked stop showed a silent toast ("Finish the stop before this one!", "Learn it with Sparky first!") | Toasts **now said**. Arrival still silent | Every session, several times |
| 6 | Home | The hatch meter ("20 more to hatch your egg!"), missions, "Today", card subtitles ("Start here!", "Next: Find the Shape") are silent. The greeting is said only on the first visit, in the device voice (it has the name) | Silent | Every session |
| 7 | Picture bar, "Go Home?" | "Home", "Learn", "Games", "Puzzles", "My Pet" are said on tap | Device voice | Every screen change |
| 8 | Pet Care, Pet Shop, Home pet | The pet's lines ("Splish splash!", "I love it!", "Crack crack! Earn stars to hatch me!") | Device voice. tools/en-audio.js leaves them out on purpose ("the pet talking, not a grown-up cheering"), but since TEACH-4 the pet has its own recorded voice | Most sessions |
| 8b | Pet Care, Pet Shop | The status line ("Sparky is doing great!", "Tap an item to try it on!"), snack prices, "Need 3 more coins!" | **Now said** | Most sessions |
| 9 | Brain Teasers, youngest band | Each puzzle's instruction at the start (Sudoku, Mazes, Tangram, Shape Fit, Robot Path, Memory, Copy Cat, Turn It) | Device voice. "What comes next?" is recorded | Each puzzle, and the Puzzle of the Day daily |
| 9b | Brain Teasers | The hub cards, the levels screen's description, the riddle's "Listen to the riddle. Tap the answer." | Silent | Each visit |
| 10 | Game Room | Nothing is said. With no game time, the reason ("Finish a learning round to earn game time!") was silent. So was the toast on tapping a game | **Now said** when closed. The hub with time left is still silent | Daily |
| 10b | Game menus | "Next goal ...", world and stage names, prices (Hill Climb, Block Builder, Star Rally, Snack Stand, Sky Hop, Coloring) | Silent. The game's start line is device voice | Daily |
| 11 | Spanish learn cards | "Tap each card to hear it in English and Spanish!" is device voice. The card's English word is device voice; the Spanish is recorded | Device voice | Each first Spanish stop |
| 12 | Lesson start card | The heading "Learn Count to 5 with Sparky", "Let's learn", "I already know this!" | Silent. The said line is recorded except the name | Each lesson |
| 13 | Sticker book, streak calendar | "Finish a round or a picture to win a sticker! ...", "1 day in a row!" | **Now said** | Weekly |
| 14 | Missions | The three mission titles on Home | Silent. A tap opens the activity, which speaks | Daily |
| 15 | Free-sample lock (Play app only) | "This world opens when a grown-up unlocks Whistlestop." and its two siblings | Device voice. The heading "Not open yet" is silent | Rare |

Not gaps: the lessons (REC-ALL: every fixed lesson sentence is recorded), the Spanish words (ES-AUDIO), and the praise and try-again lines (EN-PRAISE).

The speaker emoji in the sight-word questions is not seen either: UI.hear swaps it for the drawn speaker when the prompt is drawn.

## 3. Lines proposed for recording

The voice is the pet's teacher voice (`luna`, speed 0.95, TEACH_FORMAT), because the pet is one speaker. The tools record by sentence (`tchRuns`), so a line like "Hi Mia! Pick a game!" plays "Pick a game!" from the recording and the name in the device voice.

Bytes are estimated with tools/en-audio.js `estBytes`: 354 bytes a file plus 137 a character, fitted on the TEACH-4 files.

Budget (tools/test.js, ES-AUDIO check): AUDIO_FAIL is 9,500,000 bytes. **9,165,120 are used (2,656 files), so 334,880 are left.**

| Tier | Lines | Characters | Estimated bytes | Audio total after |
|---|---|---|---|---|
| **1 (proposed now)** | **89** | **2,053** | **~312,800** | **~9,477,900 (under 9.5 MB, ~22 KB to spare)** |
| 2 (needs about 0.06 MB more budget) | 21 | 411 | ~63,700 | ~9,541,600 |
| New wording (needs approval of the words) | 2 | 50 | ~7,600 | |

All Tier 1 and Tier 2 lines are existing approved text, so nothing is new wording.
- "existing" means the sentence is in the source word for word.
- "existing (generator)" means a generator builds it from fixed parts, such as "How many ${things}?" with the stop's objects. It is said exactly as listed.

"Seen" is how many times the sentence came up in the 10,000-question census (Pre-K and K stops, 200 seeds each). It is blank for lines outside questions.

### How to record them (for the follow-up task, after approval)

- Add one TEACH_GROUPS entry ("AUDIO-12 non-reader lines") to tools/en-audio.js with these lines, and run `node tools/en-audio.js --teach`.
- None of these lines is recorded today: I checked each against EN_AUDIO and EN_TEACH.
- **Generated lines.** "How many ducks?" and the other generator lines are not in the code word for word. So `teachStart()` would leave them out of EN_TEACH0, and they would play only once teach12 has loaded (a map does load it).
  - The tool should add this group to EN_TEACH0 directly. That costs about 3 KB in the data file at start: one manifest line each.

### Tier 1: 89 lines, proposed now

**Recorded (REC-12, owner approval 2026-11-26).** tools/en-audio.js `NR_LIT`, `NR_GEN` and `NR_NEW` hold these 89 lines and the 2 new-wording lines. 90 of the 91 are recorded (luna, speed 0.95, 2,099 characters, 325,258 bytes). "Mmm!" (48) was heard as nothing by the speech to text check in all 6 takes, so it stays the tablet's voice (`NO_REC`). "How many cars?" and "How many apples?" are generator lines too (`PK.OBJ`), so 19 lines are generated, not 17.
- All 90 are also in EN_TEACH0, so they play from the start. The 19 generated prompts are added by name (owner decision 2026-11-26: the AUDIO-12 generated prompts play from start-up). For them the TEACH-4 limit on src/data/d-teach-start.js went from 6,000 to 7,000 bytes.
- Audio total: 9,490,378 bytes (AUDIO_FAIL 9,500,000).

Groups:
- A: question prompts, Pre-K and K;
- B: the pet talking;
- C: the picture bar and "Go Home?";
- D: lines AUDIO-12 now says;
- E: Brain Teasers for the youngest band;
- F: Spanish cards, free-sample locks.

| # | Group | Line | Text is | Chars | Seen* |
|---|---|---|---|---|---|
| 1 | A | Watch, then trace it with your finger. | existing | 38 | 600 |
| 2 | A | Which one does not belong? | existing | 26 | 293 |
| 3 | A | Match each big letter to its little letter. | existing | 43 | 200 |
| 4 | A | Which word is this? | existing | 19 | 200 |
| 5 | A | Sort them! | existing | 10 | 194 |
| 6 | A | Say each word. | existing | 14 | 163 |
| 7 | A | Put the pin on the missing number. | existing | 34 | 152 |
| 8 | A | Count on. | existing | 9 | 119 |
| 9 | A | Count back. | existing | 11 | 81 |
| 10 | A | Sort the numbers: even or odd? | existing | 30 | 117 |
| 11 | A | How many counters? | existing | 18 | 116 |
| 12 | A | How many more to make ten? | existing | 26 | 106 |
| 13 | A | Ten counters are in the frame. | existing | 30 | 78 |
| 14 | A | Put the big ones in the big box and the small ones in the small box. | existing | 68 | 87 |
| 15 | A | Put them in the rhyme box. | existing | 26 | 84 |
| 16 | A | The others go in no rhyme. | existing | 26 | 84 |
| 17 | A | Do they have the same number? | existing | 29 | 31 |
| 18 | A | How many are still on the table? | existing | 32 | 39 |
| 19 | A | How many cars? | existing | 14 | 67 |
| 20 | A | How many ducks? | existing (generator) | 15 | 65 |
| 21 | A | How many balloons? | existing (generator) | 18 | 61 |
| 22 | A | How many stars? | existing (generator) | 15 | 60 |
| 23 | A | How many balls? | existing (generator) | 15 | 52 |
| 24 | A | How many frogs? | existing (generator) | 15 | 50 |
| 25 | A | How many cookies? | existing (generator) | 17 | 50 |
| 26 | A | How many apples? | existing | 16 | 48 |
| 27 | A | How many fish? | existing (generator) | 14 | 36 |
| 28 | A | How many flowers? | existing (generator) | 17 | 33 |
| 29 | A | Which pond has more ducks? | existing (generator) | 26 | 66 |
| 30 | A | Which plate has more cookies? | existing (generator) | 29 | 56 |
| 31 | A | Which bowl has more apples? | existing (generator) | 27 | 54 |
| 32 | A | Which box has more cars? | existing (generator) | 24 | 49 |
| 33 | A | Which basket has more balls? | existing (generator) | 28 | 46 |
| 34 | A | Tap the square. | existing (generator) | 15 | 55 |
| 35 | A | Tap the rectangle. | existing (generator) | 18 | 54 |
| 36 | A | Tap the circle. | existing (generator) | 15 | 46 |
| 37 | A | Tap the triangle. | existing (generator) | 17 | 45 |
| 38 | B | Crack crack! | existing | 12 |  |
| 39 | B | Earn stars to hatch me! | existing | 23 |  |
| 40 | B | I am almost ready to hatch! | existing | 27 |  |
| 41 | B | Let's go on an adventure! | existing | 25 |  |
| 42 | B | I love stars! | existing | 13 |  |
| 43 | B | You're my best friend! | existing | 22 |  |
| 44 | B | Pick a game! | existing | 12 |  |
| 45 | B | Yum yum! | existing | 8 |  |
| 46 | B | Delicious! | existing | 10 |  |
| 47 | B | Thank you! | existing | 10 |  |
| 48 | B | Mmm! | existing | 4 |  |
| 49 | B | Splish splash! | existing | 14 |  |
| 50 | B | So clean! | existing | 9 |  |
| 51 | B | Bubbles! | existing | 8 |  |
| 52 | B | Wheee! | existing | 6 |  |
| 53 | B | Again! Again! | existing | 13 |  |
| 54 | B | That was fun! | existing | 13 |  |
| 55 | B | I love it! | existing | 10 |  |
| 56 | B | So cool! | existing | 8 |  |
| 57 | B | Looking good! | existing | 13 |  |
| 58 | C | Home | existing | 4 |  |
| 59 | C | Learn | existing | 5 |  |
| 60 | C | Games | existing | 5 |  |
| 61 | C | Puzzles | existing | 7 |  |
| 62 | C | My Pet | existing | 6 |  |
| 63 | C | Go Home? | existing | 8 |  |
| 64 | D | Tap the treasure chest! | existing | 23 |  |
| 65 | D | Finish the stop before this one! | existing | 32 |  |
| 66 | D | Tap an item to try it on! | existing | 25 |  |
| 67 | D | Finish a round or a picture to win a sticker! | existing | 45 |  |
| 68 | D | Finish a learning round to earn game time! | existing | 42 |  |
| 69 | D | Game time is almost up! | existing | 23 |  |
| 70 | D | Finish a round to light your flame! | existing | 35 |  |
| 71 | E | Each row, each column and each box needs every animal once. | existing | 59 |  |
| 72 | E | Tap a square, then tap an animal. | existing | 33 |  |
| 73 | E | Drag the bear to the flag. | existing | 26 |  |
| 74 | E | Drag each piece into its outline. | existing | 33 |  |
| 75 | E | Tap a piece, then tap it again to turn it. | existing | 42 |  |
| 76 | E | Drag the pieces into the shape. | existing | 31 |  |
| 77 | E | Each one has its own place. | existing | 27 |  |
| 78 | E | Tap the arrows to help the robot get to the flag. | existing | 49 |  |
| 79 | E | Then press Go. | existing | 14 |  |
| 80 | E | Find two pictures that are the same. | existing | 36 |  |
| 81 | E | Watch the cat. | existing | 14 |  |
| 82 | E | Then tap the pads in the same order. | existing | 36 |  |
| 83 | E | Your turn! | existing | 10 |  |
| 84 | E | Which shadow matches the shape? | existing | 31 |  |
| 85 | F | Tap each card to hear it in English and Spanish! | existing | 48 |  |
| 86 | F | This world opens when a grown-up unlocks Whistlestop. | existing | 53 |  |
| 87 | F | This stop opens when a grown-up unlocks Whistlestop. | existing | 52 |  |
| 88 | F | These puzzles open when a grown-up unlocks Whistlestop. | existing | 55 |  |
| 89 | F | The Puzzle of the Day is open every day. | existing | 40 |  |


### Tier 2: 21 lines, when the budget allows

More question prompts (Tap the number..., the four harder shapes), the game start lines, "Who is playing? Tap your picture." (tablets with more than one child), and two second sentences.

| # | Group | Line | Text is | Chars | Seen* |
|---|---|---|---|---|---|
| 90 | A | Even is on the left. | existing | 20 | 83 |
| 91 | A | Tap the number zero. | existing (generator) | 20 | 62 |
| 92 | A | Tap the number one. | existing (generator) | 19 | 48 |
| 93 | A | Tap the number two. | existing (generator) | 19 | 50 |
| 94 | A | Tap the number three. | existing (generator) | 21 | 51 |
| 95 | A | Tap the number four. | existing (generator) | 20 | 51 |
| 96 | A | Tap the number five. | existing (generator) | 20 | 50 |
| 97 | A | Tap the trapezoid. | existing (generator) | 18 | 58 |
| 98 | A | Tap the hexagon. | existing (generator) | 16 | 57 |
| 99 | A | Tap the oval. | existing (generator) | 13 | 43 |
| 100 | A | Tap the rhombus. | existing (generator) | 16 | 42 |
| 101 | D | Get 10 out of 10 for a bonus one. | existing | 33 |  |
| 102 | F | Match the numbers to the colors! | existing | 32 |  |
| 103 | F | Tap to build! | existing | 13 |  |
| 104 | F | Drag to turn around. | existing | 20 |  |
| 105 | F | Ready? | existing | 6 |  |
| 106 | F | Steer with the arrows! | existing | 22 |  |
| 107 | F | Tap to hop! | existing | 11 |  |
| 108 | F | Find the three stars and reach the flag! | existing | 40 |  |
| 109 | F | Who is playing? | existing | 15 |  |
| 110 | F | Tap your picture. | existing | 17 |  |


### New wording: 2 lines, approved by the owner on 2026-11-26

The map and the Brain Teasers hub have no sentence of their own to say on arrival. The owner approved both lines, exactly as written, on 2026-11-26 (REC-12). They are said only to a non-reader (`nrOn()`: Pre-K to 1st grade with S.voice on):
- 111, on arrival at any map with a glowing stop (46-home.js `pathMap`);
- 112, in the Brain Teasers hub, for the youngest band only (band A, Pre-K and K; not in the free sample, and not when a badge or easier-level sheet opens; 74-teasers.js `BT.hub`).

| # | Group | Line | Text is | Chars | Seen* |
|---|---|---|---|---|---|
| 111 | N | Tap the glowing stop to play! | **new wording, approved 2026-11-26** | 29 |  |
| 112 | N | Tap a puzzle to play! | **new wording, approved 2026-11-26** | 21 |  |

## 4. Speech wired in this task (existing text only)

These lines are said only for a non-reader. That means three things together:
- Pre-K, K or 1st grade (`gradeCfg().auto` is 'all' or 'auto', the bands whose questions are read out);
- "Read questions out loud" (S.voice) is on;
- the line is shown on screen.

A reader (2nd grade and up) hears nothing new. Nothing new moves or flashes, so calm mode ("less movement, no confetti") is unchanged.

The helpers are in src/js/12-speech.js:
- `nrOn()`: the condition above.
- `nrSay(text, sel, ms)`: says a screen's own line once it is drawn, only while `sel` is still on screen. It waits behind a cheer.
- `fbSay(text, cls, ms)`: the toast as before, and said at once for a non-reader.

| Screen | Line (already on screen) | Where |
|---|---|---|
| Round end, before the chest | "Tap the treasure chest!" | 50-round.js `finish` |
| Reward card, no stars or a failed test-out | The tip under the score ("Get 4 right to open the next stop. You can do it!" and the others) | 50-round.js, after the stars line |
| Map, a locked stop | "Finish the stop before this one!", "Learn it with Sparky first!" | 46-home.js `drawMap` |
| Pet Care, on arrival (not on the redraw after a snack) | The line over the pet ("Sparky is doing great!", "... could use a snack!" ...) | 56-petcare.js `care` |
| Pet Care, Pet Shop toasts | "Sparky is full!", "Need 3 more coins!", "Need 5 more coins! Finish a round to earn some." | 56-petcare.js, 48-shop.js |
| Pet Shop, on arrival with nothing tried on | "Tap an item to try it on!" | 48-shop.js `shop` |
| Sticker book | "Finish a round or a picture to win a sticker! Get 10 out of 10 for a bonus one." | 46-home.js `book` |
| Streak calendar (this month) | "1 day in a row!" / "Finish a round to light your flame!" | 55-streak.js |
| Game Room with no game time | ptWhyNot(): "Finish a learning round to earn game time!" and the others | 59-game-hub.js `hub` |
| Game Room and game menus, a tap with no time or on a locked game | ptWhyNot() and the lock reason | 59-game-hub.js, 60-blocks, 62-hill, 63-game-race, 65-game-snack, 67-game-skyhop, 70-art |
| In a game | "Game time is almost up!" | 64-gtimer.js |

The walk confirms these on screen.

tools/test.js `AUDIO-12` checks:
- each line is said in Pre-K, K and 1st;
- nothing is said in 2nd, 3rd or 5th, or with the voice off;
- Pet Care and the Shop say nothing again on a redraw;
- the Game Room with time left says nothing new;
- the round, map and game call sites use the helpers.

A mutation (the band condition removed) makes the check fail.

Left silent on purpose (each would be new chatter, or needs new wording):
- Home's arrival and the map's arrival;
- the missions;
- the reward card's other rows;
- the game menus;
- the Brain Teasers hub.

The two new-wording lines in Tier "new" are the proposal for the map and the hub.

## 5. Emoji still shown to children (part B)

Census: every stop of every map, 40 seeds each, emoji in the question html and choices. The walk adds the reward card, the sticker book and the Spanish learn cards. Ranked by how often a young child sees them:

| # | Where | Emoji | Status |
|---|---|---|---|
| 1 | **The sticker** on every reward card, the sticker book, the swap screen, mission and coloring rewards | 48 sticker emoji | **33 now drawn** (12 new drawings, 21 drawings the app had). 15 keep their emoji: dolphin, trophy, panda, palette, watermelon, UFO, soccer ball (the drawn ball is a beach ball), basketball, cupcake, Ferris wheel, parrot, teddy, lollipop, shark, fire truck |
| 2 | Spanish vocabulary pictures, all ages, from the first Spanish stop (Hola Plaza) and its learn cards | About 70 items with no art name: greetings (wave, walking, praying hands, pleading face, sunrise, thumbs), family (seven people), feelings (faces), food, places, verbs | Not done. People, faces and hand gestures need a set of their own (a style decision for the owner) |
| 3 | **Pre-K ABC Beach, Clap the Syllables** | octopus, penguin, dinosaur, strawberry, castle, volcano, ladybug, pumpkin, doughnut, guitar, trumpet, bicycle, dragon, triangle, candy | **11 now drawn.** Bicycle, dragon, triangle and candy remain |
| 4 | **K math, Story Problems (Number Meadow)** | Crayons as the counted objects (about 1 question in 9, several crayons each) | **Drawn** (also the coins stop's toy shop) |
| 5 | K reading, Letter Meadow CVC words (First, Middle, Last Sounds, Picture Words, Build a Word, Read & Match) | bag, man, rat, van, can, nut, mug, leg, ant, ten, sled, plug, ring, six, bin, pin | Not done. Next candidates: rat, van, can, nut, mug, leg, ant, sled, plug, ring. Bag stays the handbag by the DRAW8 check; man needs the people set |
| 6 | K math, Shape Garden | Socks (Sort by Kind), can and cone (Solid Shapes) | Not done |
| 7 | K Discover, Nature Trail | daisy, wind, candy, teddy, shoe, eyes, rain, swim, sled, brick, bulb, fire, fire truck, snail, desert, island, eagle, kangaroo, panda | Octopus, whale, trumpet and volcano are now drawn here too |
| 8 | 1st and 2nd grade reading (rhyme goat and snake, silent e, vowel teams, bossy r) | About 40 words | Not done (readers) |
| 9 | 2nd grade math, Equal Groups | Apple, flower, fish, strawberry, cookie, ladybug, star as raw emoji, even where drawings exist | Not done. The generator writes the emoji itself, not picFor, so the fix is a generator change with new seeds |

### The drawings

They are in **src/data/d-art-e.js** (the data file; plain data). The art name is the word, so picFor shows each one wherever the content asks:
- octopus, penguin, dinosaur, strawberry, castle, volcano, ladybug, pumpkin, doughnut, guitar, trumpet, whale, crayon.

Each follows the object art rules:
- 64x64 grid, light from the top left;
- `var(--a-x)` roles only, `path`/`circle`/`ellipse`/`rect` only;
- at most 2,500 bytes and 40 elements.

The thirteen together are 19,194 bytes.

The stickers find their drawing through `STK_ART` and `stkPic` (src/js/05-pets.js).
- A sticker with no drawing, or code running without the data file, shows the emoji as before.
- Saves keep the emoji keys.

The Pre-K and K lessons that pick only drawn words now also use the new syllable pictures. The lesson checks pass.

Review sheet: **docs/drafts/EMOJI12.png**.
- Each new drawing is at 96, 48 and 24 px, on white and on a tint, beside its emoji.
- Then the 21 stickers that use a drawing the app already had.

tools/test.js `object art EMOJI-12` checks:
- the rules;
- that every drawing differs from all others;
- that the 33 stickers show their drawing and never their emoji on the reward card;
- that the 15 others keep their emoji;
- that 400 syllable questions show all 11 and never their emoji;
- that the story problems never show the crayon emoji;
- that the book and swap screens use `stkPic`;
- the data file location and the emoji fallback without it.

## 6. Sizes

- Start-up (index.html + start parts + data file): 2,436,332 to **2,462,072 bytes** (+25,740; the budget is 2,500,000).
  - The drawings are 22,246 bytes of source in the data file.
  - `STK_ART`, `stkPic` and the speech helpers are about 3.5 KB in index.html.
- index.html: 971,038 to 974,532 bytes.
- Audio: unchanged, 9,165,120 bytes. Tier 1 would bring it to about 9.48 MB.
