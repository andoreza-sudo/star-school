# R-01 Reading: teaching and engagement review

Review of the whole Reading and Language Arts section, Pre-K to 6th grade, all 10 reading worlds (ABC Beach to Legend Lab), as of v134 (cb5cd66).
Written 2026-11-11 by Claude for Andy. No app changes were made.

---

## Part 1. For parents: the short version

### What works well

- **It covers almost every grade-level topic.** Letter names, tracing, rhymes, first, last and middle sounds, syllables, the phonics patterns
  (short vowels, blends, digraphs, magic e, vowel teams, "bossy r"), the Dolch sight words through 3rd grade, spelling to 6th grade,
  grammar from capital letters to pronoun case, vocabulary from opposites to Greek and Latin roots, and 50 original reading passages
  (25 stories, 25 nonfiction) for grades 2 to 6.
- **The passages are good.** I read all 50 passages and all 250 of their questions. They are well written, interesting, mostly accurate and
  at the right length for each grade. Every question can be answered from the passage, and I found no passage question with a wrong answer.
  The question types grow with the grades in the way the standards ask: detail and sequence in 2nd grade, then main idea and cause, then
  theme and text structure, then point of view and author's purpose, and "which sentence shows..." evidence questions in 6th grade.
- **The grammar and vocabulary hints teach a method.** For example "Say 'it is' in the blank. If that makes sense, pick the word with an
  apostrophe", or "Say the sentence with only one person in it". They never just give the answer.
- **Pre-K letter work is well designed.** Letters come in the order teachers use (s, a, t, p, i, n first), wrong choices are the letters
  children really mix up (b, d, p, q), and letter tracing shows the stroke order with numbered start dots and arrows.
- **Read-aloud support is everywhere.** Pre-K and K prompts are read aloud, every word in a sentence or passage can be tapped to hear it,
  and each passage has a "Hear the story" button. This lets a child practise comprehension above their decoding level.
- **Spelling is spoken in a sentence** ("cat. The cat sat on the mat. cat."), which is how spelling should be tested.

### What to improve, in priority order

Sizes: **S** = an hour or two, **M** = about a day, **L** = several days.

**Must fix**
1. **Racial slurs and rude words appear as wrong answers (S).** In "Picture Words" the app makes up wrong choices by changing one letter of
   the right word. The safety filter misses many words, so a child can see a racial slur ("bike" becomes "kike", "moon" and "coin" become
   "coon", "book" becomes "gook", "dog" becomes "wog", "map" becomes "jap") or a rude word ("pube", "grope", "boob", "vag", "queer",
   "bum", "weed", "bong"). This happens in about 1 in 50 Picture Words questions (up to 1 in 35 in some stops) in Letter Meadow (K),
   Candy Canyon and Ocean Reef (1st), Space Station and Word Workshop (2nd). `variants()` and `phonVariants()` in 32-gen-read.js, `BAD` and `PHBAD` in 20-words.js.
2. **Most made-up wrong choices are not even possible English words (M).** "snake" comes with "snakb" and "cnake", "sock" with "socb",
   "egg" with "bgg", "pig" with "pih". More than half of the Blends and Magic E questions have one. A child can find the answer by
   rejecting the impossible spellings, so the question stops testing reading. Good phonics practice contrasts real words that differ by
   the pattern being taught (cap and cape, kit and kite). Same functions as item 1.
3. **Sight words: two answers sound the same (S).** "Tap the word you hear" can say "two" and offer both "to" and "two" (Letter Meadow,
   1 in 40 questions), or say "right" and offer "write" (Space Station). The child cannot know which one is meant. `genSight` in
   32-gen-read.js.
4. **Eight grammar and vocabulary questions are wrong or have two right answers (S).** For example "Which is happening now?" expects
   "Dad cooks dinner every night"; "The puppy wagged ___ tail" marks "his" wrong; "___ kids love recess" marks "Our" wrong. The full list
   with seeds is in 2.4. src/data/d-gram.js, src/data/d-vocab.js.
5. **Some Kindergarten help is only written, not spoken (S).** In Rhyme Time the help ("Rhymes sound the same at the end: ug...") is
   text a 5-year-old cannot read, and the answer pictures are never named aloud. The picture for "mug" is a coffee cup, so a child who
   says "cup" cannot find the rhyme for "bug". The same goes for the help in "Match Big & Little" and "Read & Match". 36-gen-phonics.js,
   32-gen-read.js, 39-hints.js.
6. **"Letter Teams" shows the answer in the question (S).** "Which letters end **moth**?" prints the word, so the child can copy "th"
   from it. And the moth is drawn as a butterfly. `genSoundB` in 32-gen-read.js, `DIGR` in 20-words.js.

**Should fix**
7. **No reading fluency practice (M to L).** Reading quickly and smoothly is one of the five pillars of reading, and standards ask for it
   in every grade from 1st to 5th. The app never asks a child to read connected text at speed. A "Word Sprint" (like Fact Sprint, for
   sight words and decodable words), a read-along mode that highlights each word as it is spoken, and "read it again" repeated reading would
   cover it without a microphone.
8. **No decodable stories (M to L).** After a child learns magic e, they should read short stories made mostly of magic-e words and words
   already learned. The app's early stories use words like "birthday", "friend", "door" and "park" that a 1st grader cannot yet decode.
9. **Phonemic awareness is thin (M).** Children hear first, last and middle sounds, but never blend sounds into a word, count the sounds
   in a word, or change a sound ("cat" with /h/ makes "hat"). Sound boxes built with tiles, and "Which picture starts with b?" (letter to
   sound), would fill the gap.
10. **Passages on a phone (M).** At 380 px wide the passage window shows 4 lines of a 230-word text, the question is in small print, and
    after a wrong answer the help box is cut off below the answers. For detail questions the help quotes the sentence that holds the
    answer ("Look back at the story: 'Mia had a red kite...'") instead of asking the child to find it.
11. **Factual and wording slips (S).** For example the 6th grade tides passage says the sun's pull on the ocean is "far weaker than the
    moon's" (the sun's pull is stronger; its tide effect is about half), and the spelling list teaches "february" and "wednesday" in
    small letters, which contradicts the grammar stop that teaches capitals for days. List in 2.4.
12. **Grammar "Tap the noun / verb / adjective" uses 16 sentences of one shape (M).** Every sentence is "The tiny frog hops": adjective
    second, noun third, verb last. A child can answer by position without knowing the parts of speech.
13. **Pictures (M).** First Sounds and Rhyme Time show emoji, not the app's drawings, and about 15 picture words do not match their
    picture (queen is a princess, burn is fire, farm is a tractor, cube is ice, home is a house, king and crown share a crown).
14. **Too few stories in the 1st grade Story Time (M).** 12 one-question stories per stop, so a 10-question round repeats about 3 of them.
    The passage set also repeats plots across grades (two lost library books, two lemonade stands, two tuba players, three bee passages).
15. **The middle-vowel stop almost never asks short i (S).** Only 4% of "Middle Sounds" questions have "i" (one word, pig), against 35% "a".
    It also comes last in Letter Meadow, after the child has already been reading and building CVC words.

**Could do**
16. Writing: every grammar item asks the child to pick, never to produce. Add building sentences from tiles above 2nd grade, combining
    sentences with tiles, and "fix this sentence" editing (M to L).
17. Teach multi-syllable decoding (2nd to 4th grade) and -ed and -ing endings (1st grade); move common vowel teams into 1st grade (M).
18. Smaller polish: analogy prompts read aloud as "first colon last colon colon begin" (add a spoken form), "opposite of boy is girl",
    "full of thank", "in a old way", ambiguous idiom-or-metaphor items, near-duplicate main-idea and summary questions in 4th grade (S).

---

## Part 2. Detailed findings

### 2.1 How the review was done

- **Read**: ROADMAP R-01, CURRICULUM sections 1, 2.2, 4, 7, 8 and 9, the PROGRESS entries for P2-15 to P2-29 and P2-17, and the code:
  32-gen-read.js, 36-gen-phonics.js, 20-words.js, 15-pics.js, 37-bank.js, 37-comp.js, 38-skills.js, 39-hints.js, 42-paths.js, 47-trace.js,
  50-round.js, 49-kinds.js (choice), and the data: d-comp.js, d-gram.js, d-vocab.js, d-spell.js, d-trace.js.
- **Read every authored item**: all 50 passages and 250 questions, the 24 picture-story questions (`comp 1-2`), all 474 grammar items,
  all 648 vocabulary items, all 400 spelling words with their sentences, the 40 unscramble, 40 cloze and 12 story-order sentences.
- **Generated**: 2,000 to 5,000 seeded questions (`genQ(sk, lv, seed)` with the code loaded as tools/test.js does) for every generated
  level: abc 1-4, sound 1-4, rhyme 1-2, syl 1-2, pic 1-6, build 1-6, sight 1-5, sent 1-5, spell 1-7. Checks: every wrong choice against a
  list of about 100 slurs and rude words; wrong choices that cannot be English spellings; homophones among sight-word choices; c and k
  offered together; answer position; answer distribution; repeats within a 10-question round; pictures without a drawing; hints that
  point at the wrong answer.
- **Played** in the built app (index.html, v134) with Playwright and Chromium at 380x780 and 1024x600, deviceScaleFactor 2, through the real
  round engine (`start('read', i)` then the seeded question), with wrong answers to open the hints. 32 stops, 64 screenshots, all looked
  at, in the session scratchpad `r01-read/` folder (for example `06-meadow-rhyme1-mug-380x780.png`, `14-reef-pic3-nonwords-380x780.png`,
  `21-workshop-comp3-hint-380x780.png`, `13-candy-sound4-moth-380x780.png`). No console errors.
- Speech was checked from the `say` and `hint.w` strings; the headless browser has no voice, so no sound was heard.

**Wrong answers found** (each is a must-fix, see 2.4 for detail):

| Skill, level | Seed | Item | Problem |
|---|---|---|---|
| gram 4 | 22 | "Which is happening now?" → "Dad cooks dinner every night." | A habit, not happening now; the hint ("now and every mean present") teaches the confusion |
| gram 4 | 13, 37, 29 | "Right now, the baby ___ in her crib." → "sleeps" (also "Right now, we ___ a new song" → "sing", "Right now, the rain ___ on the roof" → "falls") | With "right now" English needs "is sleeping"; the key teaches a non-standard form |
| gram 8 | 83 | "Tap the adverb. We walked slowly home." → "slowly" | "home" is also an adverb here; a correct tap is marked wrong |
| gram 9 | 77 | "___ kids love recess." → "We" | "Our kids love recess." is also correct |
| gram 9 | 51 | "Mom picked ___ kids up." → "us" | "Mom picked our kids up." is also correct |
| vocab 6 | 116 | "The puppy wagged ___ tail." → "its" | "his" is offered and is also correct |
| vocab 6 | 73 | "Have you ___ my red hat?" → "seen" | "sewn" is offered and is also correct |
| sight 1 | 190069 | hear "two": to / two / three / you | "to" sounds the same (2.5% of sight 1) |
| sight 4 | 7932 | hear "right": right / would / which / write | "write" sounds the same (0.4% of sight 4) |

Seeds for bank items are for `genQ` outside a live round (in a live round the least recently shown item is picked instead). The item
numbers in BANK are: gram 207, 187, 189, 192, 363, 458, 459; vocab 335, 400.

No wrong answer key was found in the passages (`comp 3-7`, `info 1-5`), the picture stories (`comp 1-2`), spelling, phonics or the
other bank levels.

### 2.2 Evidence base used

| Practice | Source | What it asks of an app |
|---|---|---|
| The five pillars: phonemic awareness, phonics, fluency, vocabulary, comprehension | National Reading Panel 2000, *Teaching Children to Read* (NICHD) | Explicit, systematic teaching of all five |
| Reading = decoding × language comprehension; the strands that grow fluent reading | Gough & Tunmer 1986 (*RASE*), Scarborough 2001 (the Reading Rope); Castles, Rastle & Nation 2018 (*PSPI*, "Ending the reading wars") | Word recognition and language comprehension both taught; read-aloud for comprehension above decoding level |
| Foundational skills K-3 | Foorman et al. 2016, IES/WWC practice guide *Foundational Skills to Support Reading for Understanding in K-3* (WWC 2016-4008) | Rec. 2: phonemic awareness with letters (blending, segmenting); rec. 3: decode words, analyse word parts, write and recognise words; rec. 4: read connected text daily for accuracy, fluency and understanding |
| Phonemic awareness | Ehri et al. 2001 (*Reading Research Quarterly*, NRP meta-analysis); Kilpatrick 2015, *Equipped for Reading Success* | Blending and segmenting most effective, best with letters; manipulation for older strugglers |
| Orthographic mapping, minimal-contrast word work | Ehri 2014 (*Scientific Studies of Reading*); Moats 2020, *Speech to Print* | Contrast real words that differ by one grapheme (cap/cape, bird/bard); no implausible foils |
| Decodable text | Cheatham & Allor 2012 (*Reading and Writing*); Mesmer 2001 | Early connected text controlled to the phonics taught so far, then faded |
| Fluency | Kuhn & Stahl 2003 (*J. Educ. Psych.*); Rasinski 2010, *The Fluent Reader*; Therrien 2004 (repeated reading meta-analysis) | Repeated and assisted (read-along) reading; word-level automaticity |
| Vocabulary | Beck, McKeown & Kucan 2013, *Bringing Words to Life* | Tier 2 words in context, rich examples, many encounters |
| Comprehension K-3 | Shanahan et al. 2010, IES/WWC *Improving Reading Comprehension in K-3* | Teach strategies (look back, summarise), text structure, discussion of meaning, text that supports it |
| Background knowledge | Cabell & Hwang 2020 (*RRQ*); Hwang, Cabell & Joyner 2022 | Topic sets that build knowledge; varied content, not repeated plots |
| Writing and grammar in context | Graham et al. 2012, IES/WWC *Teaching Elementary School Students to Be Effective Writers*; Graham & Hebert 2010, *Writing to Read*; Saddler & Graham 2005 (sentence combining) | Grammar through sentence building and combining, not only recognition |
| Feedback | Hattie & Timperley 2007; Shute 2008 | Task-level feedback; hints that make the learner do the step |
| Standards | Common Core State Standards for ELA (2010): RF, L, RL, RI | The grade-by-grade list in 2.3 |
| Audio-first and accessibility | CURRICULUM 1.4; WCAG 2.1 (1.1.1, 1.4.4) | Pre-readers hear every instruction and hint; pictures named; text resizable |

### 2.3 Standards coverage (CCSS ELA), by grade

Present and well covered: letter names and formation (RF.K.1d, tracing), rhyme and syllables (RF.K.2a-b), first, last and middle sounds
(RF.K.2d), CVC, blends, digraphs, magic e, vowel teams, r-controlled (RF.1.3a-c, RF.2.3a-b), Dolch sight words to 3rd grade (RF.K.3c,
RF.1.3g, RF.2.3f), conventions L.1.2 to L.6.2 (capitals, end marks, commas, quotation marks, spelling), L.1.1 to L.6.1 (parts of speech,
plurals, tenses, agreement, pronouns, fragments and run-ons, pronoun case), vocabulary L.1.5 to L.6.5 (opposites, synonyms, compound
words, affixes, homophones, context clues, figurative language, roots, analogies, shades of meaning), and RL/RI grades 2-6 question types.

| Grade | Standard | Status | Suggested home |
|---|---|---|---|
| PK-K | RF.K.2c, e: blend and segment onset-rime and phonemes; add or change a sound | Missing (no blending, segmenting or manipulation) | new `sound` levels with sound-box tiles; recorded phonemes (ROADMAP 11) for blending |
| K | RF.K.3a: letter → sound (see "b", find the picture that starts with it) | Only picture → letter (`sound 1`) | new `abc` or `sound` level |
| K | RF.K.4: read emergent-reader texts with purpose | `sent 1` single sentences only | decodable mini-books (Should 8) |
| 1 | RF.1.2b-d: blend, isolate and segment all phonemes | Middle vowel only | as K |
| 1 | RF.1.3e-f: two-syllable words; inflectional endings (-s, -ed, -ing) | Missing in reading (only spelling 3) | `pic`/`build` level 7 |
| 1 | RF.1.3c: common vowel teams | Taught in a grade 2 world (Space Station) | move `pic 4` / `build 4` earlier, or accept |
| 1-5 | RF.1.4 to RF.5.4: fluency (accuracy, rate, expression), reading on-level text | **Missing** | Word Sprint, read-along, repeated reading (Should 7) |
| 2 | RF.2.3c-e: two-syllable long-vowel words, common prefixes and suffixes when reading, inconsistent spellings | Only meaning (vocab 4-5), no decoding | `pic` level for multi-syllable words |
| 3 | RF.3.3a-c: decode Latin suffixes and multisyllable words | Missing | as above |
| 1-6 | W.1-6 (writing), L.x.3 (knowledge of language: choose words for effect) | Recognition only; no production | Could 16 |
| 2-6 | RL.x.7 / RI.x.7: pictures, maps, diagrams in texts | Passages have no pictures or diagrams; "text feature" questions ask about words | add one diagram or map to some `info` passages |
| 2-6 | RL/RI.x.9: compare two texts on the same topic | Missing; the repeated topics (bees, moon, frogs) could be paired on purpose | a paired-passage round |
| 3-6 | RL.x.5: parts of a story, poem or drama | No poems or plays at all | a few poems (rhythm, stanza) in `comp` |

### 2.4 Findings by world

Each finding names the skill and level, the file, and a sample (seed, as `genQ(sk, lv, seed)`).

#### ABC Beach (Pre-K): abc 1, abc 2, trace 2, abc 3, syl 1, trace 3, abc 4

- **Strong**: letters in s-a-t-p-i-n order with the first 13 drawn twice as often; look-alike distractors (seed 31676: P, B, R; abc 2: b, p,
  q, d); spoken "Find the big letter P" and "P is for pig" hint; tracing with numbered start dots, arrows and the three guide levels
  (screenshot `03-abc-trace2`). Round length 6. Good fit for age 4 (letter-name knowledge predicts later reading; NRP 2000).
- `abc 1` and `abc 2` are not marked `pk`, so they get the small "Hear it" and "Help" buttons and a mostly empty card with a speaker icon
  (screenshot `01-abc-abc1-380x780`), unlike Tiny Town's big Pre-K replay button. Could: set `pk:true` and show the "P is for pig" picture
  (ART has pig) in the hint; for b/d add the "bat then ball" stroke cue.
- Hint wording "p and P is for pig" (abc 2). Could: "Little p and big P are for pig."
- `abc 3` (match) hint is text only and not spoken ("Tap a big letter, then tap the little letter..."). Must 5.
- `abc 4` speaks "What letter comes after a?" with a lower-case a (1 in 25 items): many voices read "a" as "uh". Could: say "the letter A".
- `syl 1`: picture words with 1-3 claps, clap-star buttons. Good. Picture and word mismatches matter less here because the word is spoken.

#### Letter Meadow (K): sound 1, sight 1, rhyme 1, pic 1, sound 2, build 1, sent 1, sound 3

- **Order (Should 15).** Middle vowels (`sound 3`) are the last stop, after "Picture Words" (`pic 1`) and "Build a Word" (`build 1`) have
  asked the child to read and spell CVC words. Phoneme isolation of the vowel should come before CVC decoding (Foorman et al. 2016 rec. 2).
  Stops are permanent, but the path order can change (CURRICULUM 1.5 fixes levels, not positions).
- **Short i almost missing (Should 15).** `CVCM` drops "pin" and "six", so only "pig" has i: 4% of 4,000 `sound 3` items, against a 35%,
  u 31%, e 18%, o 13%. Add hip, lid, bib, zip, kid (pictures exist or are cheap).
- **First and last sounds** (`sound 1`, `sound 2`): the picture is a raw emoji (`html` uses `e`, not `picFor`), so the cat is an emoji face
  while the same cat is a drawing in `sound 3` (screenshot `05-meadow-sound1-emoji`). 300 of 300 sampled. The prompt says "What sound does
  it START with?" but the buttons are letters: say "Which letter...". c and k are both offered for a /k/ word in 72 of 4,000 items (seed
  728561, cat: c, k, f): k is also the right sound. Exclude k when the answer is c and c when it is k.
- **Rhyme Time** (`rhyme 1`, Must 5): seed 74, "Which picture rhymes with bug?" (a caterpillar); choices socks, dog, coffee cup; the answer
  is "mug" (screenshot `06-meadow-rhyme1-mug`). The pictures are emoji and are never named, so the child must guess that the cup is a
  "mug". Other weak pictures: hen (chicken), king (crown), rat (looks like a mouse next to the mouse picture, seed 7), ten (a keycap 10).
  The hint "Rhymes sound the same at the end: ug..." is `k:'text'`, so it is not spoken. Fix: say the three names in the prompt
  ("Which rhymes with bug: sock, dog or mug?") or on tap, speak the hint, and use drawings.
- **Rhyme hint points to a wrong family**: the hint uses the last two letters, so for "goat", "boat" and "coat" it says "at..." and the
  cat family ("cat", "hat") fits the hint (and the reverse). Use the rime ("oat").
- Only 14 rhyme families; `rhyme 2` reuses them as words.
- **Sight words** (`sight 1`, Must 3): seed 190069, the voice says "two" and the choices are to, two, three, you (screenshot
  `10-meadow-sight1-to-two`). 100 of 4,000 items (2.5%). `genSight` sorts distractors by "same first letter", which makes homophones
  likely. Fix: never offer a homophone of the target (to/two/too, write/right, for/four...). Also only one direction (hear → find); add
  see the word → find the picture or sentence.
- **Picture Words** (`pic 1`, Musts 1 and 2): seed 79203, pig: pif, pih, vig (screenshot `07-meadow-pic1-nonwords`). 17% of `pic 1` items
  have a wrong choice that cannot be an English spelling (pih, nuj, bgg for egg, cnt for ant). Rude or slur choices in 2.8% of 5,000:
  "wog" (seed 1346243, dog), "jap" (seed 3040909, map), "vag" (seed 1813464, bag), "bum", "pis", "sux". The hint says the word aloud
  ("Listen! Now find it."), which turns the item into hear-and-find on the second try; fine as support.
- **Read & Match** (`sent 1`): decodable sentences from CVC words and sight words 1 ("I see a cat.", "Where is the pen?"). This is the only
  decodable connected text in the app, and it is good. The hint "Tap any word to hear it!" is text only (Must 5). 178 of 8,000 `sent 1`/`sent 2`
  sentences have "a sun", "a milk" or "a hand" ("I see a sun.", seed 348449; "She saw a milk at the park.", seed 245502).

#### Candy Canyon (1st): sight 2, rhyme 2, pic 2, build 2, sent 2, comp 1, sound 4, syl 2, spell 1

- **Blends** (`pic 2`): 71% of items have an impossible wrong choice (seed 13, sock: socb; seed 79203, crab: crah, vrab; screenshot of the
  same pattern in `14-reef-pic3-nonwords`). Rude: "cuck" (seed 1449190, duck), "slag" (seed 1987682, flag), "drug" (seed 1227458, drum).
  The list mixes digraph words (fish, ship, duck, bell, king) into "blends"; fine if the title says "Blends & Teams".
- **Read Sentences** (`sent 2`): sentences such as "Mom and I see a crab by the door." and "My friend said, 'I want a hand.'" (seed 134636)
  use door, friend, park, road and said, which a 1st grader cannot decode yet (Should 8). Tap-to-hear rescues the child, but then the item
  tests listening, not decoding.
- **Story Time** (`comp 1`): 12 one-sentence stories, one question each, read aloud when "Read questions out loud" is on (screenshot
  `12-candy-comp1`). Correct and kind, but a 10-question round repeats 2.7 stories on average (300 simulated rounds). The CURRICULUM calls
  levels 1-2 "picture stories", but there are no pictures. Should 14: 30+ stories, two or three questions each, a picture each.
- **Letter Teams** (`sound 4`, Must 6): "Which letters end **moth**?" prints the word in the prompt, so the answer is on screen; the moth is
  a butterfly emoji (screenshot `13-candy-sound4-moth`). Also printed for ship, fish, thumb and the rest. Show only the picture and speak
  the word. Other weak pictures: brush (paintbrush), dish (plate), bath (bathtub). "wh" has a single word (whale, 11% of items).
- **Count the Claps** (`syl 2`): printed words, 1-4 syllables. "family" is said with 2 or 3 syllables depending on the speaker; drop it.
- **Spell Short Words** (`spell 1`): good list (40 CVC words), word in a sentence, letter count in the hint.

#### Ocean Reef (1st): sight 3, pic 3, build 3, comp 2, spell 2, vocab 1, gram 1

- **Magic E** (`pic 3`): seed 13, snake: snakb, snak, cnake (screenshot `14-reef-pic3-nonwords-380x780`). 61% of items have an impossible
  choice. The one good distractor is the word without its e ("snak", "bik"), which is exactly the contrast the level teaches; build the
  whole choice set that way: cap/cape, kit/kite, hop/hope, cub/cube, real words where possible. Rude or slur choices in 1.6%: "kike"
  (seed 4371301, bike), "grope" (seed 2407389, grape), "pube" (seed 1227458, cube), "lube", "bong", "bonk", "wine".
- Pictures that name something else (Should 13): cube (an ice cube), cone (an ice cream), home (a house), smile (a face), game (a game
  controller), vase (an amphora). 17 of 25 magic-e words have no drawing.
- **Opposites** (`vocab 1`): good, with pictures for many items. "What is the opposite of boy?" → girl (seed 8): most current word lists
  avoid gender as an opposite (Could 18). Bank prompts are not read automatically for 1st graders unless the voice setting is on.
- **Capitals & End Marks** (`gram 1`): correct items. The "!" items ("Wow, I won the race ___") would also accept a period; the hint
  explains the convention, so this is fine for 1st grade.
- **Story Time 2** (`comp 2`): 12 slightly longer stories, same repetition issue as `comp 1`. Content correct (owls hunt at night,
  bees make honey).

#### Space Station (2nd): pic 4, build 4, sight 4, pic 5, build 5, spell 3, sent 3

- **Vowel Teams** (`pic 4`): 39% of items have an impossible choice (seed 13, spoon: bpoon, cpoon). Rude or slur choices in 1.8%: "coon"
  (seed 8481262, moon), "gook" (seed 6739082, book), "queer" (seed 712723, queen), "boob" (seed 1480866, boot), "weed" (seed 2027277,
  seed), "die", "wee". queen is shown as a princess emoji.
- **Bossy R** (`pic 5`): the swap-the-r-vowel distractors (bird, bard, berd, burd) are exactly what the spec asks and are all legal
  spellings: the best-designed phonics level. But the word list moved away from the spec's one-syllable words (horn, corn, fork, storm,
  shirt, fern, nurse) to two-syllable and irregular ones: water (the "a" says /aw/), sword (silent w), hammer, monster, tower, unicorn.
  Pictures: farm is a tractor, burn is a fire, arm is a flexed muscle, chart is a graph (Could).
- **Sight Words 4** (`sight 4`): seed 7932, hear "right": right, would, which, write (Must 3).
- **Build Sentences** (`sent 3`): unscramble with a capital first word and the end mark on the last tile; test.js proves one order. Good.

#### Word Workshop (2nd): sight 5, pic 6, build 6, gram 2, vocab 2, sent 4, vocab 3, gram 3, sent 5, comp 3, info 1

- **Vowel Teams 2** (`pic 6`): legal swaps, but "coin" can become "coon" (seed 981969: cown, cewn, coon, coin): 2.7% of items have a word
  from the list in 2.1. Pictures without a drawing: crown, down (an arrow), noise (a speaker), new (the NEW sign), draw (a pencil), stew
  (a bowl, the same emoji as "bowl" in pic 4), jewel, screw, hawk (an eagle). dawn and morning share the sunrise emoji.
- **Parts of Speech** (`gram 2`, Should 12): 48 of the 60 items are the same 16 sentences, all article + adjective + noun + verb (seed 9:
  "A big wave crashes.", screenshot `19-workshop-gram2-tap`). Vary the shape: "Dogs run in the park.", "The cat and the dog nap.",
  "Mia kicks the red ball."
- **Plurals** (`gram 3`): correct, with the real irregular errors (mouses, foots). The regular items use made-up wrong forms ("treees",
  "cates", "doges") that no child writes; the spec asks for the common real error. Use "tree" (no ending), "treeses", or -es where it does
  not belong ("bookes" is the real error, "cates" is not).
- **Synonyms, Compound Words, Fill the Gap, Sentence Stories** (`vocab 2`, `vocab 3`, `sent 4`, `sent 5`): all items correct and
  age-fit. "look" = "see" and "home" = "house" are loose synonyms; fine at grade 2.
- **Read a Story / Learn About It** (`comp 3`, `info 1`): 10 passages, 60-77 words, all questions answerable with one right answer. Notes:
  "Zip the Robot" (g2f05): "She moved the plug to a longer cord" is hard to picture (you cannot move a wall plug); "Penguins" (g2n05)
  "Penguins live in cold places" (some live in warm places: "Most penguins..."); "The Cookie Surprise" (g2f04) Q5 key "sorry that he got
  caught" frames the apology as being caught; "sorry and embarrassed" teaches the better lesson.
- **Passage layout on a phone** (Should 10): screenshot `21-workshop-comp3-hint-380x780`: 4 lines of passage visible, the question in
  small print under the panel, and after a wrong answer the hint box is cut off by the answer buttons ("Look back at the story:" and
  nothing more is visible). At 1024x600 the hint also runs off the bottom (`21-workshop-comp3-hint-1024x600`). For detail questions the
  hint quotes the answer sentence ("Look back at the story: 'Mia had a red kite with a long tail.'"), which gives the answer away. Better:
  highlight the evidence sentence in the passage panel (the `ev` indexes exist) and say "Find the yellow sentence. What does it say?"

#### Story Summit (3rd): spell 4, gram 4, vocab 4, gram 5, vocab 5, comp 4, info 2

- **Verb Tenses** (`gram 4`, wrong answers): seed 22, "Which is happening now?" → "Dad cooks dinner every night." (screenshot
  `22-summit-gram4-happening-now-380x780`); the tense hint says "now and every mean present". Seeds 13, 37, 29: "Right now, the baby ___
  in her crib." → "sleeps" (and "sing", "falls"); with "right now" English uses "is sleeping". Fix: change "Right now" to "Every night",
  "Each spring", or offer "is sleeping"; for "happening now" use "The kids are playing right now." (item 206 already does).
- **Prefixes, Suffixes** (`vocab 4`, `vocab 5`): good, consistent distractors (the other affix meanings). "thankful" = "full of thank"
  (seed 259): "full of thanks". Distractors "in a old way" (items 274, 282): "in an old way". Defining -er and -est as "more tall" and
  "the most tall" models non-standard English; "taller = more tall" is a common classroom bridge, so this is Could only.
- **Contractions & Agreeing** (`gram 5`): correct. "can not" → "can't" (the standard spelling is "cannot").
- **Read a Story 2 / Learn About It 2** (`comp 4`, `info 2`): correct. "Shapes of the Moon" (g3n02) Q5 "What does the title tell the
  reader?" → "It explains why the Moon changes": a title names the topic; it does not explain. Use "It names the topic: the Moon's shapes."
  "The Lost Book" (g3f01) Q3 (why worried) and Q5 (how she felt) ask the same thing from sentence 3.

#### Dragon Library (4th): spell 5, gram 6, vocab 6, vocab 7, gram 7, vocab 8, comp 5, info 3

- **Homophones** (`vocab 6`, wrong answers): seed 116, "The puppy wagged ___ tail." offers "his" (also right; screenshot
  `24-library-vocab6-his-380x780`). Seed 73, "Have you ___ my red hat?" offers "sewn" (also right). Seed 3, "Every living thing is made
  of a tiny ___." → "cell": living things are made of cells (many); say "Every living thing is made of tiny ___s" or "The smallest living
  part is a ___." Seeds 33 and 196: "beer" is a distractor for beat/beet; replace it in a children's app.
- **Pronouns & Look-Alikes** (`gram 6`): correct. Seed 33 "The cat is soft. I pet ___." → "it", with "he" offered (many children call
  their cat "he"; Could).
- **Context Clues** (`vocab 7`): strong items; the clue is always in the sentence; Tier 2 words (hesitated, reluctant, meager).
- **Commas & Quotes** (`gram 7`): correct, consistent US style with the serial comma.
- **Figurative Language** (`vocab 8`): idiom meanings good. Classification has two-answer items: seed 70 "The test was a piece of cake." →
  idiom (it is also a metaphor in form); seed 41 "slept like a log" → simile (it is also a fixed idiom). Keep the classification items to
  clear cases, or say "Which kind is it most like?" with a hint that idioms are fixed sayings.
- **Read a Story 3 / Learn About It 3** (`comp 5`, `info 3`): very good (seasons from tilt, with the "closer to the sun" misconception as a
  distractor; frogs and toads compare-contrast; lighthouses problem-solution). The main-idea and summary questions often have almost the
  same answer ("Tomás gets better at the tuba by practicing" and "A boy practices until he can play the tuba well", g4f01; also g4f05).
  Make the summary question about the whole sequence, or ask for the best summary sentence among three summaries of different scope.
  Two plots repeat from 3rd grade: lost library book (g3f01, g4f02), lemonade stand (g3f03, g4f03).

#### Author Island (5th): spell 6, gram 8, vocab 9, comp 6, info 4

- **More Parts of Speech** (`gram 8`): seed 83 "Tap the adverb. We walked slowly home." → "slowly"; "home" is also an adverb (wrong answer).
  Use "We walked slowly to school." (one adverb only). "What kind of word is 'under'?" → preposition
  (in isolation it can be an adverb; Could).
- **Word Roots** (`vocab 9`): good. The roots are spoken by the voice as written ("tele", "chron", "aud", "dict"), which many voices
  mispronounce; add `say` respellings (Could).
- **Read a Story 4 / Learn About It 4** (`comp 6`, `info 4`): strong, accurate (camel humps store fat, arch vs suspension bridges, tree
  rings, float glass on tin, the Nile flood and papyrus). "The Quilt for Grandpa" (g5f02): the narrator is never said to be a girl, but Q2
  says "the sisters" and Q3's key is "The sister who wanted blue waves"; use "The narrator, who wanted blue waves." "Hiro and the Missing
  Key" Q3 is tagged point of view but asks a feeling.

#### Legend Lab (6th): spell 7, gram 9, vocab 10, comp 7, info 5

- **Sentence Craft** (`gram 9`, wrong answers): seed 77 "___ kids love recess." → We, with "Our" (also right); seed 51 "Mom picked ___ kids
  up." → us, with "our" (also right; screenshot `29-legend-gram9-our-380x780`). Fix: "___ kids (we/us) love recess" type framing, or
  drop "our" for "me". The fragment, run-on, combining and vague-pronoun items are good.
- **Analogies** (`vocab 10`, Could 18): spoken as written: "first : last :: begin : ?" (screenshot `28-legend-vocab10-analogy`). Add `say`
  "first is to last as begin is to what?" and show the reading of the notation once in the hint. Shades of meaning: "sleepy" as the
  "least tired" of sleepy, tired, worn out, exhausted is arguable.
- **Spell Tough Words** (`spell 7`): "wednesday" (and "february" in `spell 6`) are spelled in lower case, and the sentences write them
  lower case ("We have art class on wednesday."). This contradicts `gram 1` ("We go on monday." → tap "monday", it needs a capital). Either
  drop proper nouns from spelling, or let the keyboard check a capital first letter (screenshot `30-legend-spell7-380x780`).
- **Read a Story 5 / Learn About It 5** (`comp 7`, `info 5`): excellent passages with figurative-language, evidence and purpose questions.
  One factual error: "Riding the Tides" (g6n01) sentence 6 says "The sun pulls on the ocean as well, but its pull is far weaker than the
  moon's, because the sun is so much farther away." The sun's gravitational pull on Earth is about 180 times the moon's; what is weaker is
  the tide-raising effect (about half the moon's), because tides come from the difference in pull across Earth. Q4's key quotes the wrong
  sentence. Fix: "its tide-making effect is only about half the moon's, because the sun is so much farther away." 230-280 words in a
  4-line panel on a phone means about 12 scrolls per read (screenshot `27-legend-info5-tides-380x780`).

### 2.5 Across the section

**Distractors.** Authored items (banks, passages, spelling) have well-chosen, plausible wrong answers. Generated phonics items do not:
`variants()` replaces the first letter, the last letter or the first vowel with a random letter, then filters a short rude-word list. The
result is impossible strings in many items and, about 1 time in 50, a slur or rude word. The fix is curated contrast sets per word
(e.g. `['cape','cap','cope','cake']` for "cape"), checked once by a person, or at least: build only from legal onsets and rimes, keep
real words, and run every candidate against a long blocklist (a maintained list such as LDNOOBW, filtered for false positives). The same
check belongs in test.js so a new word can never bring one back.

**Pictures.** CURRICULUM 4 says picture words need a picture that matches. `sound 1-2` and `rhyme 1-2` put the emoji into the prompt
directly (15-pics.js forbids this), and about 100 of the roughly 220 picture-word entries still have no drawing. Words whose emoji names something else
should either get a drawing or leave the list (Should 13).

**Audio-first.** Prompts for Pre-K and K are spoken; text hints (`k:'text'`) are never spoken (39-hints.js returns the text only).
`rhyme 1`, `abc 3` and `sent 1` use text hints in K. Choice pictures and words are never spoken on tap in a choice question, so a child
cannot check what a picture is meant to be. Fix: speak `k:'text'` hints for grades PK-K (one line in `hintHTML`), and add a long-press or
small speaker to picture choices.

**Fluency and connected text (Should 7, 8).** The app has word work and passage comprehension, but nothing in between: no decodable
stories, no repeated reading, no timed word reading. Without a microphone the app can still offer: (1) a Word Sprint of sight words and
pattern words (hear and tap, 60 seconds, beat your best, like Fact Sprint); (2) read-along with word-by-word highlighting at the child's
pace, then "now read it yourself" (assisted reading, Kuhn & Stahl 2003); (3) six to ten decodable mini-stories per phonics stage, each
followed by two questions.

**Feedback.** As in math, a wrong answer gives "Try again!" and the hint; a second miss shows the answer. For phonics the commonest
mistakes are predictable (picked the word without the e; picked the other r-vowel; picked the homophone); one sentence each ("Look at the
end. Magic e makes the a say its name.") would teach more than "Listen! Now find it."

**Engagement.** Rounds are short (6 in PK, 8 in K, 10 above), every stop has a visible goal and progress dots, praise is kind, and the
passages are genuinely interesting. Flat spots: the Pre-K and K screens are mostly empty white cards (`01-abc-abc1`); bank items are text
on white with the same layout for 9 grammar and 10 vocabulary levels; and small pools repeat (comp 1-2, sound 3-4, pic 5-6 repeat 1.4
to 2.7 items per round). Picking without replacement inside a round (as banks already do) would remove the repeats for generated levels.

**Accessibility.** Text is large and dark on white; touch targets are big. Colour is never the only cue. The passage question can shrink
to small print when the passage panel is tall (`21-workshop-comp3-hint-1024x600`: "What color was Mia's kite?" in about 14 px), which is
a fit() side effect; keep the question at the prompt size and let the panel scroll.

### 2.6 Variety statistics (selected)

| Skill level | Pool | Note |
|---|---|---|
| comp 1, comp 2 | 12 stories each | 2.7 repeats per 10-question round |
| sound 3 | 28 CVC words | short i in 4% of items |
| sound 4 | 23 picture items | wh is one word (whale), 11% |
| rhyme 1-2 | 14 families | |
| pic 1-6 | 30, 22, 25, 30, 24, 24 words | pic 1-4 distractors random; pic 5-6 legal swaps |
| sight 1-5 | 40, 52, 41, 46, 41 words | full Dolch lists PP to grade 3 |
| gram 1-9 | 52, 60, 46, 51, 46, 64, 41, 57, 57 items | gram 2 is 16 sentences x 3 |
| vocab 1-10 | 56, 52, 68, 63, 82, 95, 47, 59, 62, 64 items | |
| spell 1-7 | 40, then 60 per level | |
| comp 3-7, info 1-5 | 5 passages per level, 5 questions each | 2 passages per round |

Answer position is even (about 25% per place) in every generated level sampled.

### 2.7 Top 10 (for Andy)

1. Stop slurs and rude words appearing as wrong choices in Picture Words (`variants`, `phonVariants`, `BAD`; pic 1, 3, 4, 6) (S).
2. Replace random-letter wrong choices with real-word or legal contrast sets (pic 1-4: "cap/cape", not "snakb/cnake") (M).
3. Fix the 9 wrong or two-answer items: gram 4 (seeds 22, 13, 37, 29), gram 8 (83), gram 9 (77, 51), vocab 6 (116, 73), and never offer a
   homophone in sight words (sight 1 seed 190069, sight 4 seed 7932) (S).
4. Speak every hint in Pre-K and K, name picture choices, and use clear pictures in Rhyme Time (mug, king, rat) (S).
5. Don't print the word in Letter Teams; draw the moth; fix the other picture mismatches (sound 4, pic 3-6) (S + M).
6. Add fluency practice: Word Sprint, read-along highlighting, repeated reading (M-L).
7. Add decodable mini-stories for each phonics stage, and more 1st grade Story Time stories with pictures (M-L).
8. Add phonemic awareness with sound boxes (blend, segment, change a sound) and letter-to-sound items; move Middle Sounds earlier and add
   short i words (M + S).
9. Make passages readable on a phone (read view first, question at full size, hint visible) and highlight evidence instead of quoting it (M).
10. Fix the factual and wording slips (tides g6n01, g3n02 title, g5f02 narrator, "made of a tiny cell", "full of thank", "february" and
    "wednesday", "a sun"/"a milk"), vary the gram 2 sentences, and add writing-by-tiles items above 2nd grade (S + M + L).
