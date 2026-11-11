# R-01 Math: teaching and engagement review

Review of the whole Math section, Pre-K to 6th grade, all 16 worlds (Tiny Town to Galaxy Core), as of v133 (b0904d2).
Written 2026-11-11 by Claude for Andy. No app changes were made.

---

## Part 1. For parents: the short version

### What works well

Star School's math is broad and mostly accurate.

- **It covers almost every grade-level topic.** Most Common Core topics from counting to 20 up to ratios, negative numbers and equations have a stop.
- **No wrong answers.** I generated about 300,000 questions across all 170 math skill levels and recomputed about 41,000 of them independently: none had a wrong answer key.
- **The step-by-step hints from grade 2 up are excellent.** For long multiplication, long division, fractions and equations, the Help button reveals one step at a time and stops before the final answer. That is a worked example, which is one of the best-supported ways to teach a method.
- **Pictures come first in the early fraction and place-value work.** Base-ten blocks, ten frames, fraction bars, number lines, area models and arrays all appear. This picture-first approach (concrete, then pictorial, then abstract) is what research recommends.
- **Rounds adapt to the child.** A fast, accurate child gets harder "Challenge" questions, and a struggling child gets easier ones with the hint already showing. Missed questions come back on a schedule (after 1, 3, 7 and 21 days), and every round mixes in a few older skills.
- **Pre-K and Kindergarten are audio-first.** Every question is read aloud, the answer buttons are pictures or big numbers, and the screens are calm.

### What to improve, in priority order

Sizes: **S** = an hour or two, **M** = about a day, **L** = several days.

**Must fix**
1. **Rounding hint contradicts the answer (S).** In "Round to 10" and "Round to 100", when a number sits exactly halfway (135, 55, 750), the hint asks "Is it past halfway? Then round up." The number is not past halfway, so a child who follows the hint rounds down and is marked wrong. This happens in about 1 in 9 "Round to 10" questions. The hint should say "halfway or more". Fraction Forest, `ffRound` in 33-gen-math-mid.js. **Done in R-01m (v136):** the hint says "Halfway or more? Round up. Less than halfway? Round down." `round 3` and `round 4` now say "It is an 8".
2. **Early fact hints teach counting, not strategies (M).** The stop called "+9 & Doubles" (Candy Canyon) and the stops "All the Facts", "Take Away to 18" and "Missing to 18" all show the same hint: two strips of blocks and "Count them all!" or "Cross out 9". For 9 + 7, that means counting 16 blocks one by one. First graders should learn "make a 10" (9 + 7 is 10 + 6), doubles and near doubles, and "think addition" for subtraction. Facts learned through these strategies stick. Facts learned by counting do not. The hint is in 39-hints.js (`blocks`), used by `add 2`, `add 3`, `sub 2` and `miss 2`. **Done in R-01m (v136):** `factHint` (30-gen-math.js) gives each fact one strategy with a ten-frame or number-line picture: count on from the bigger number (+1 to +3), doubles, near doubles, ten and some more, ten pairs, +9 as +10 then take 1 away, make a ten; for take away and missing numbers, count back, count up, and think addition (jump to 10, then on). Kindergarten levels keep the counting blocks.
3. **Word problems in K to 2 come in only three kinds (M).** Grade 1 and 2 standards ask for joining, separating, part-part-whole and comparing problems, with the unknown at the start, in the middle or at the end. Star School's Kindergarten to grade 1 story problems only ever ask "how many now?" or "how many left?". The Kindergarten ones have no picture, so a child who cannot read only hears the story once. Story levels 1-3, `genStory` in 30-gen-math.js. **Done in R-01m (v136):** story 1 (K) adds take-away stories and shows the objects in the prompt; story 2 adds change-unknown (add to and take from), put-together with one part unknown, and compare "how many more / fewer"; story 3 adds start-unknown (add to and take from) and compare with the bigger or smaller amount unknown. Every story hint draws its objects (two lined-up rows for compare).
4. **"Ava has 1 pencils" (S).** A quarter of the Kindergarten story problems use a plural with 1 ("1 pencils", "1 cookies"), and the voice reads it aloud. The same mistake appears in "costs 1 dollars and 50 cents" (Making Change), "gives away 1 bags", "1 degrees" and "1 centimeters long", and in hints such as "1 tens is 10" and "1 hundreds". **Done in R-01m (v136):** one helper, `qN(n, one, many)` (22-qhelpers.js), in every place found; a test scans every math level over 2,000 seeds. Also fixed: "how many halfs", "1 steps", "1 parts", "1 bag", "1 half inches long".

**Should fix**
5. **Some facts come up far too often (S).** In "Missing to 18" and "Take Away to 18", 31% of answers are 9. In "Easy Times Facts", 28% of questions are times 0. In "Divide 2-Digit Numbers", 26% of answers are 11. Other facts, such as 13 − 5 or 6 × 7 inside its own stop, come up rarely. The fix is to pick facts evenly. **Done in R-01m (v136)** for the four named stops: `miss 2` and `sub 2` pick one of the 45 facts that cross 10 evenly (answer 9 now 20%: the largest answer still has the most facts), times 0 is 1 question in 12 in `mfact 1`, and `dbig 1` picks one of its 98 divisions evenly (quotient 11 now 8%).
6. **Wrong answers get only "Try again!" (M to L).** The wrong-answer choices are well designed, built from common mistakes such as swapped digits or adding instead of multiplying, but the app never says which mistake was made. After the second miss it shows the answer with "Here's the answer", with no explanation. A short message for the commonest mistakes, and the full worked solution after the second miss, would turn errors into lessons.
7. **Missing grade-level topics (L in total; each piece S to M).** Grade 1: what "=" means ("Is 7 = 8 − 1 true?"). Grade 4: "times as many" comparison problems. Grade 6: equivalent expressions (3(x + 2) = 3x + 6), surface area and nets, box plots and spread. There are also smaller gaps (see 2.3).
8. **Some skills sit a grade early (S).** Even and odd is a grade 2 topic, but it is the third stop of Number Meadow (Kindergarten) and comes again in Ocean Reef (grade 1). Two-digit minus two-digit (`sub 3`) is in a grade 1 world, but it is a grade 2 standard.
9. **Kindergarten adding is numbers only (M).** In Number Meadow (K), "Adding to 10", "Take Away" and "Missing Number" show only the number sentence "6 + 2 = ?", with no objects, until the child gets one wrong. Shape Garden's "Add to 5" does show dots, so the pattern already exists.
10. **Coins are circles with the value printed on them (M).** Knowing a dime from a nickel by its look is part of the grade 2 money standard. In "Pennies & Nickels", "Dimes Too" and "Quarters", every coin has "10¢" or "5¢" written on it, so the child never practises recognising coins.
11. **Colour-only patterns (S).** In Tiny Town's "What Comes Next" and "Which One Is Different", some patterns differ only by colour (red, blue, red, blue, with a green choice). About 1 boy in 12 has red-green colour blindness and cannot solve these. Add a second cue, such as shape or a pattern fill, or avoid red with green. **Done in R-01m (v136):** in colour patterns (`pat 1`, `pat 2`) every colour has its own shape, and red and green never appear together; in "Which one does not belong" by colour (`sort 1`) the odd colour is a pair colour-blind children tell apart (blue or purple against a warm colour, or yellow against red).
12. **Two confusing pictures (S).** In the multiply-fractions area model (Crystal Caves), the hint says "the orange rows show 4/5", but only one column is orange. In Shape Garden's "Count to 20", the hint says "One full ten and 10 more" for 20, where "two full tens" would teach place value. **Done in R-01m (v136):** the `fop 5` hint says "4 of the 5 rows are colored: that is 4/5 ...", and 20 is "Two full tens".
13. **On a phone, the hint can be below the screen (S).** At 380 px wide, after a wrong answer on a ten-frame question, the hint opens under the picture and is cut off by the number pad. A child may never see it. **Done in R-01m (v136):** after a miss the card scrolls so the whole hint shows above the pad (the Help button already did); checked at 380x780 by a smoke step.

**Could do**
14. More kinds of questions in the middle grades: "find the mistake" items, estimation, true or false and "which is bigger without working it out" (M each).
15. Better times-table hints. Skip-count by the easy factor (for 8 × 5, count by 5s), and derive the hard facts from 10s and 5s, not from 7 × 8 (S).
16. Replace "add a zero on the end" (Times Tens) and the alligator mouth for < and > with the real reasons: ten times as many, and "is greater than" (S).
17. Make Fact Sprint remember which facts are slow from day to day, and add times facts to Speed Race for older children (M).
18. Placement asks 4 random questions per world, so a child can skip whole topics (for example fractions) without being asked about them. Ask one question per strand instead, and queue the skipped skills for review (M).
19. Polish: a few prompts lack a question mark; "=" is never the answer in "Compare Fractions"; "Making Change" repeats ($2.50 change) and asks for "250 cents"; a GCF word problem with the answer 1 team (S).

---

## Part 2. Detailed findings

### 2.1 How the review was done

- **Read**: ROADMAP R-01, CURRICULUM sections 1-3, 7 and 9, the PROGRESS entries for the math chunks, and the code: 30-gen-math.js, 31-gen-math-early.js,
  33-gen-math-mid.js, 35-gen-math-upper.js, 32-gen-read.js (old cmp, time, coins, mult), 23-viz.js, 39-hints.js, 39b-steps.js, 38-skills.js, 42-paths.js,
  50-round.js, 51-mastery.js, 59-review.js, 57-fluency.js, 54-race.js, 45-placement.js.
- **Generated**: 1,500 seeded questions for every math skill and level (170 levels, about 255,000 questions) with the code loaded as tools/test.js does. Checks:
  the answer recomputed from the label for every plain sum, difference, product and quotient. A second independent check of about 41,000 fraction-operation,
  simplest-form, percent, long-division, equation, expression, rounding, statistics and GCF/LCM answers. Also checked: whether a hint states the answer,
  plural grammar with 1, how varied the items are, and where the right choice sits. Six full sample questions per level, with hints, were read by hand.
- **Played** in the built app (index.html, v133) with Playwright and Chromium at 380x780 and 1024x600, deviceScaleFactor 2: 50 questions from every world in the
  real round engine, several after a wrong answer and with the step hint advanced. Screenshots are in the session scratchpad `r01-math/` folder
  (for example `11-candy-add2-hint-380x780.png`, `38-caves-fop5-1024x600.png`, `04-shape-pkcount3-20-380x780.png`).

**Wrong answers found: none.** No answer key was wrong in any sample. The rounding hint (Must 1) is the only item where following the app's own advice gives a
wrong answer.

### 2.2 Evidence base used

| Practice | Source | What it asks of an app |
|---|---|---|
| Concrete, then pictorial, then abstract; concreteness fading | Bruner 1966; Fyfe, McNeil, Son & Goldstone 2014 (*Educ. Psych. Review*) | Pictures and models before bare symbols, fading out over levels |
| Number sense and learning trajectories in early math | NRC 2009, *Mathematics Learning in Early Childhood*; Clements & Sarama 2014, *Learning and Teaching Early Math* | Subitising, ten frames, part-whole, counting on, linear number lines |
| Fact fluency built on strategies, not counting | Baroody 2006 (*Teaching Children Mathematics*); Henry & Brown 2008 (*JRME*); NCTM 2014, *Principles to Actions* | Make-ten, doubles, near doubles, think-addition, derived facts |
| Problem types and schemas for word problems | Carpenter et al., *Children's Mathematics: Cognitively Guided Instruction* (2nd ed. 2015); Fuchs et al. 2021, IES/WWC practice guide *Assisting Students Struggling with Mathematics* | All join, separate, part-whole and compare types, with the unknown in every position; bar or tape diagrams |
| Visual representations, number lines, explicit instruction, timed fluency practice | Fuchs et al. 2021 (WWC 2021-006); Gersten et al. 2009 (WWC RtI guide); Siegler et al. 2010 (WWC fractions guide) | Number lines across grades; short daily timed practice of known facts; fractions as numbers on a line |
| Worked examples, spacing, interleaving | Pashler et al. 2007 (IES *Organizing Instruction and Study*); Rohrer & Taylor 2007; Rohrer, Dedrick & Stershic 2015 | Step-by-step solutions; spaced review; mixed problem types |
| Informative feedback | Hattie & Timperley 2007; Shute 2008 (*Review of Educational Research*) | Say what was wrong and why, not just "wrong" |
| Learning from errors | Booth, Lange, Koedinger & Newton 2013 (*Learning and Instruction*) | "Find the mistake" worked examples |
| Meaning of the equal sign | Knuth, Stephens, McNeil & Alibali 2006 (*JRME*); McNeil 2008 | Non-standard equations (7 = 8 − 1, 3 + 4 = □ + 2) |
| Rules that expire | Karp, Bush & Dougherty 2014 (*Teaching Children Mathematics*) | Avoid "add a zero", "the alligator eats", keyword tricks |
| Mastery learning | Bloom 1968; Kulik, Kulik & Bangert-Drowns 1990 | High pass bar (80-90%) and correction before moving on |
| Standards | Common Core State Standards for Mathematics (2010) | The grade-by-grade topic list in 2.3 |
| Accessibility | Birch 2012 (*JOSA A*): red-green colour vision deficiency in about 8% of males of European descent | Never use colour as the only cue |

### 2.3 Standards coverage gaps (CCSS), by grade

Present and well covered: almost everything in CURRICULUM section 3 ships as specified. The gaps below are standards with no stop, or with only a thin one.

| Grade | Standard | Status | Suggested home |
|---|---|---|---|
| K | K.OA.1-2 add/subtract word problems with objects | Story 1 is text only (picture only in the hint) | story 1: show the objects in the prompt |
| K | K.G.6 compose shapes | Only in Brain Teasers (tangram) | could stay there |
| 1 | 1.OA.1 all problem types, unknown in all positions | Only result-unknown join/separate and put-together | story 1-3 new templates (Must 3) |
| 1 | 1.OA.6 strategies (make ten, doubles, decompose) | Stops exist, hints teach counting | Must 2 |
| 1 | 1.OA.7 meaning of = (true/false, 7 = 8 − 1) | Missing | new `eq` level or a `miss` level |
| 1-2 | 1.MD.1 / 2.MD.4 indirect comparison, length difference | Thin | meas |
| 2 | 2.OA.1 compare problems with unknown in all positions | Story 4 has "more/fewer than" only as step 1 of a total | story 4 |
| 2 | 2.MD.5-6 length word problems on a number line diagram | Missing; number lines are barely used before grade 3 | new level of `meas` or `big` with an open number line |
| 2 | 2.MD.7 a.m. and p.m. | Missing | time 4 |
| 2 | 2.MD.9 line plot of whole-number lengths | Missing (line plots start at grade 5) | data 2 |
| 2 | 2.G.3 thirds | frac 1 has halves and fourths only | frac 1 |
| 3 | 3.NF.3c whole numbers as fractions (3 = 3/1, 4/4 = 1) | Partly (number line 0-2) | frac 5 |
| 3 | 3.MD.7c-d area with the distributive property, rectilinear shapes | L-shapes arrive in grade 4 | geo 2 |
| 4 | 4.OA.1-2 multiplicative comparison ("3 times as many as") | Missing | story 7 or a new `mult` level |
| 4 | 4.NF.5 tenths + hundredths (3/10 + 4/100) | Missing | dec 1 |
| 4 | 4.MD.4 line plot with fractions | At grade 5 only | fine (data 4) |
| 5 | 5.NF.3 fraction as division (3/4 = 3 ÷ 4) | Missing | fop 6 or story 8 |
| 5 | 5.NF.5 multiplication as scaling (is 3/4 × 12 more or less than 12?) | Missing | fop 5 choice item |
| 5 | 5.G.3-4 hierarchy of 2D shapes | Only grade 3 classification | shape |
| 6 | 6.NS.4 distributive property with GCF (36 + 8 = 4(9 + 2)) | Missing | fact 3 |
| 6 | 6.NS.7 ordering rational numbers (−1/2, −0.75, 0.3) | Integers only | int 1 |
| 6 | 6.EE.2-4 parts of an expression, writing and equivalent expressions | Only evaluation (ooo 3) | new `alg` level |
| 6 | 6.EE.9 dependent and independent variables (tables, graphs) | Partly (pat 5 at grade 5) | alg |
| 6 | 6.G.2-4 volume with fractional edges, polygons on the coordinate plane, nets and surface area | Missing | geo 5 / new geo level |
| 6 | 6.SP.1-5 statistical questions, distribution shape, MAD, IQR, box plots, histograms | Only mean, median, mode and range | data 5 / new data level |

### 2.4 Findings by world

Each finding names the skill and level, the file, and a sample (seed, as `genQ(sk, lv, seed)`).

#### Tiny Town (Pre-K): pk_count 1-2, shape 1, pk_num 1-2, sort 1-2, pk_more 1, pat 1, trace 1

- **Strong**: audio-first, 3 big choices, objects in a row then scattered, 6-question rounds, the hint pulses the objects while counting. Pre-K counting
  and the subitising range (1-5) are right for age 4 (Clements & Sarama).
- **Colour-only items (Should 11).** `pat 1` seed 31676: "red, blue, red, blue, red. What comes next?" with choices blue, red, green circles of the same shape
  (screenshot `03-tiny-pat1`). `sort 1` "odd red triangle in yellow" picks the odd one by colour alone. Fix: colour patterns use shapes too, or patterned fills;
  never red together with green. 31-gen-math-early.js (`genPatK`, sort generator).
- `pk_count 1` label "count 1 frogs" (label only, not shown).
- Could: add a "show me 4" production task (tap 4 apples into a basket). Producing a set is a different skill from counting one (K.CC.5, second half).

#### Shape Garden (K): pk_count 3, pk_num 3, tenf 1-3, pk_more 2, shape 2-3, add 4, pat 2, cnt 4, sort 3, pos 1, meas 1

- **Strong**: ten frames (fill, make ten, ten and more), teen numbers as "ten and some more", `add 4` with dot pictures, "pair them up" hint for
  more and fewer. This is the best-designed world for its age.
- `pk_count 3` and `pk_num 3` hint for 20: "One full ten and 10 more" (seed 15838; screenshot `04-shape-pkcount3-20-1024x600`). True, but at the very moment the
  child learns teen structure it hides that 20 is two tens. Say "Two full tens" for 20 (Should 12). 31-gen-math-early.js (`genSgCount`, `genPkNumK`).
- On a phone the ten-frame hint opens below the fold (screenshot `04-shape-pkcount3-20-380x780`: hint box cut by the number pad). Should 13.
- Shape items are upright or lightly rotated; good. Could: one "not a triangle" distractor (a triangle with a curved side or an open corner) teaches the
  defining attributes (K.G.4).

#### Number Meadow (K): add 1, cnt 1, eo 1, miss 1, sub 1, story 1

- **Abstract too soon (Should 9).** `add 1` seed 7919 shows "6 + 2 = ?" with no picture. The rods only appear in the hint after a miss
  (screenshot `08-meadow-add1`). Kindergarten standards (K.OA.2) say "using objects or drawings". `add 4` in Shape Garden already shows dots; do the same for
  `add 1`, `sub 1` and `miss 1` at K (a fading picture: dots in the first half of the levels, none later). 30-gen-math.js `genAdd`, `genSub`, `genMiss`.
- **Even and odd is grade 2 (Should 8).** `eo 1` (0-20) is the third stop of a K world, and `eo 2` (21-99) is in Ocean Reef (grade 1). CCSS 2.OA.3. Move
  both stops to Space Station or Treasure Bay (stop ids stay). The pairing-dots hint is good, but for numbers over 20 the hint is just a rule
  ("Is the last digit 0, 2, 4, 6 or 8?").
- **Story problems (Must 3, Must 4).** `story 1` is text read aloud with no picture (seed 39595: "Ava has 1 pencils. Sparky gives Ava 4 more. How many pencils
  does Ava have now?", screenshot `09-meadow-story1-1pencils`). 25% of `story 1` items have "1 [plural]" (a = R(1, s−1)). Only 3 add and 2 take-away templates,
  44 distinct items in 1,500. Show the objects, and add put-together and take-apart with both addends unknown (K.OA.3).

#### Candy Canyon (grade 1): add 2, big 1, cnt 2, cmp 1, miss 2, sub 2, story 2

- **Strategy hints (Must 2).** `add 2` is "+9, +8, +10 and doubles". Seed 31676, 9 + 7: hint "Count them all!" with a 9-strip and a 7-strip
  (screenshot `11-candy-add2-hint-380x780`). Better: a ten frame filled with 9, one of the 7 moved across ("9 + 1 = 10, then 10 + 6"). For doubles:
  "6 + 6 = 12, double 6". For +10: "10 and 7 is 17". The same hint is used by `add 3` ("All the Facts"), `miss 2` and `sub 2` (seed 7919, 16 − 9:
  "Cross out 9. How many are left?", screenshot `12-candy-sub2-hint-1024x600`). For subtraction, use "think addition: 9 + ? = 16" or "back to 10: 16 − 6 = 10,
  then 3 more". The rule is in `hintHTML` k 'blocks' (39-hints.js). It applies to every fact over 10 (for sums over 20 it already says "count on from the
  bigger number").
- **Uneven fact frequency (Should 5).** `miss 2` and `sub 2`: answer 9 in 31% of 1,500 items, because `a = R(c−9, 9)` with c uniform makes 9 the
  only option for c = 18 and likely for c = 17 and 16. Fix: pick the fact pair uniformly from the list of facts in range.
- `big 1` adds hundreds (600 + 200) in a grade 1 world (CCSS 2.NBT.8); tens are fine for grade 1. Hint grammar: "Think: 8 hundreds + 1 hundreds".
- `cmp 1` hint "The hungry alligator mouth opens toward the BIGGER number!" (Could 16). The choice label "Bigger, smaller, or the same?" is good; the
  spoken "Is 14 greater than, less than, or equal to 15?" is good. Teach the reading ("14 is less than 15") rather than the alligator, which is one of the
  "rules that expire".

#### Clock Tower (grade 1): pv 1, add 5, meas 2, add 6, data 1, shape 4, frac 1

- **Strong**: base-ten picture with rods grouped by fives (screenshot `13-clock-pv1pic`), "add three, look for a ten" with a matching hint, mental +10 and −10,
  picture graphs, equal-parts fractions. Good grade 1 fit.
- `pv 1` hint "1 tens is 10" (seed 31676, "10 + 9"): grammar (Must 4).
- Could: `add 6` hints are good ("Only the tens digit changes"); a hundred chart picture for +10 and −10 would show why.

#### Ocean Reef (grade 1): add 3, time 1, big 2, coins 1, eo 2, cmp 2, time 2, sub 3, story 3

- `sub 3` (two-digit minus two-digit, no borrowing) is a grade 2 standard (2.NBT.5); grade 1 subtracts only multiples of 10 (1.NBT.6). Should 8.
- `big 2` (46 + 52) goes beyond 1.NBT.4 (two-digit + one-digit, + tens) but is a reasonable stretch.
- **Coins (Should 10).** `coins 1-3` draw silver and copper discs with "5¢", "10¢" or "25¢" printed on them (screenshot `19-space-coins3`). Sizes are right
  (dime smaller than nickel), but identification is never practised. Draw the coin faces, and keep the value label only in the hint or early items.
- `time 1-3`: fine; distractors include swapped hands and the neighbouring hour, as the spec asks. The "o'clock" items in `time 2` and `time 3` are good review.

#### Space Station (grade 2): big 3, mult 1, coins 2, cnt 3, sub 4, time 3, big 4, mult 2, cmp 3, coins 3

- **Strong**: `mult 1` and `mult 2` show equal groups in dashed boxes, arranged as 2 rows of 5 (screenshot `18-space-mult1`).
- `sub 4` hint: "6 − 9? Too small! Borrow a ten: 16 − 9 = 7. Now the tens: 4 − 3." It is correct, but the words "borrow" and "too small" are the expiring
  kind. Use "trade 1 ten for 10 ones" (and a base-ten picture, as `pv 1` already has). The old `big 3/4` and `sub 4` are text hints. PROGRESS notes they
  are frozen by the "old levels unchanged" test; the new step builders (`stepsSub`) would fit them.
- `mult 1`: only 9 distinct items (2-4 groups of 2, 5 or 10), so a round repeats.

#### Treasure Bay (grade 2): pv 2, big 5, pv 3, sub 5, time 4, coins 4, meas 3, data 2, arr 1, cnt 5, coins 5, story 4, pat 3

- **Strong**: flats, rods and units for 3-digit place value, rulers starting at a non-zero mark, bar graphs, arrays, two-step stories, step hints for `big 5`.
- `coins 5` (Making Change): only 23 distinct items in 1,500. The $5 half uses 4 prices ($1.50 to $4.50), and its answer is asked in cents
  ("How many cents do you get back?" → 250, seed 7919). Spoken: "An apple costs 1 dollars and 50 cents" (Must 4). Ask in dollars and cents
  ($2.50) for the $5 half, use any price ending in 0 or 5, and say "1 dollar".
- `story 4`: the hint is plain text ("First find how many Leo has..."). A bar model (tape diagram) is the recommended representation for compare and
  two-step problems (Fuchs et al. 2021, rec. 4). Rarely degenerate: "Ava has 15 toy cars. Ben has 15 fewer" (Ben has 0; 8 in 3,000).
- `time 4`: no a.m./p.m. (2.MD.7).

#### Multiply Mountain (grade 3): arr 2, mfact 1-4, dfact 1-4, mbig 1, story 5

- **Strong**: the arrays-to-sentences order and the commutative "5 × 7 = 7 × ?" item; the facts are grouped by strategy family (0, 1, 2, 5, 10 first, then 3 and
  4, then 6-9), which is the order research recommends.
- **Too many zero facts (Should 5).** `mfact 1`: 28% of items have the answer 0 (seed 31676 "0 × 7"). Zero is one rule, learnt in two items.
- **Hints (Could 15).** `mfact 1` seed 7919, 8 × 5: "Skip count by 8s, 5 times: 8, 16, 24, 32, ?" when the level's point is the fives. Count by the key factor
  (5, 10, 15, ... 40). `mfact 3` seed 47514, 7 × 9: "Use a fact you know: 7 × 8 = 56" (7 × 8 is itself one of the hardest facts); "7 × 10 = 70, take away
  7" is the standard derived fact. 33-gen-math-mid.js `genMfact`.
- `dfact` hints "Think: 8 times what makes 64?" are right (division as unknown factor) but have no picture. One array or equal-groups picture in level 1
  would link division to sharing (3.OA.2).
- `mbig 1` hint "Do 7 × 7 first. Then add one zero on the end." Use "7 × 7 tens = 49 tens = 490" (place value). Karp et al. 2014 list "add a zero" as a
  rule that expires: it fails for 0.7 × 10.

#### Fraction Forest (grade 3): frac 2-5, round 1-2, sub 6-7, geo 1-2, time 5-6, data 3, shape 5, meas 4, story 6

- **Strong**: fractions on a number line (frac 3, including beyond 1), comparing with same numerator and same denominator using bars, equivalent fractions
  with a "cut every part into 2" picture. This follows the WWC fractions guide (Siegler et al. 2010) closely. Elapsed time with a "jump to the hour" hint is good.
- **Rounding hint (Must 1).** `round 1` seed 3: "Round 135 to the nearest 10" (answer 140). Hint and voice: "135 sits between 130 and 140. Halfway is 135.
  Is it past halfway? Then round up." 135 is not past halfway, so the hint leads to 130. This is 10.8% of `round 1` items (numbers ending in 5) and 1.1%
  of `round 2` (seed 74: 750). 33-gen-math-mid.js line 320-321 (`ffRound`). Fix: "Is it halfway or past it? Then round up." The number-line picture in the
  same hint is good. `round 3` and `round 4` say "Is 4 5 or more?", which is right.
- `frac 4`: "=" is offered but is never the answer (0 of 1,500), so children learn to ignore it. Add equal pairs (3/6 and 3/6 is trivial; better:
  same-numerator pairs whose bars are equal, such as 2/4 with 1/2 if the level allows).
- `time 6` hint "Subtract the minutes: 20 − 0" when the start is on the hour; the hint is the answer. 43 of 1,500. Minor.
- `story 6` "gives away 1 bags" (Must 4).
- Could: `geo 1` perimeter items are labelled side sums; a "same perimeter, different area" item (3.MD.8) would add thinking.

#### Factor Factory (grade 4): mfact 5, pv 4, mbig 2-4, big 6-7, dbig 1-3, sub 8, fact 1-2, round 3

- **Strong**: partial-product step hints with a lined-up board (screenshot `31-factory-mbig4-steps-380x780`: "Multiply: 7 × 9 = 63, so 70 × 9 = 630"), long
  division with remainders in a separate slot, prime or composite. It fits on a phone.
- `dbig 1`: quotient 11 in 26% of items (2-digit ÷ 1-digit with quotient ≥ 11 leaves few dividends for large divisors). Pick the quotient first, then the divisor
  (Should 5). 35-gen-math-upper.js `fyDbig`.
- `sub 8` and `big 7`: 6-digit numbers with 3 addends are within 4.NBT.4 but long. They are fine as the last stops of a world.
- Missing 4.OA.1-2 "times as many" (Should 7).

#### Decimal Desert (grade 4): frac 6-8, fop 1-2, dec 1-2, ang 1-2, geo 3, shape 6, meas 5, pat 4, story 7

- **Strong**: benchmark-to-1/2 hints for comparing unlike fractions, then common denominators; decimal grids and number lines; protractor reading;
  remainder stories that must be interpreted (round up, drop, or the remainder is the answer). The remainder stories are an excellent, often-skipped standard.
- `meas 5` hint step 1 lists the whole conversion table (about 10 facts). Shorten it to the one fact needed, with the table behind a tap.
- `fop 2` answers like 20/6 are accepted as fractions; the step "write in simplest form" is not required, which is right for grade 4.
- Missing 4.NF.5 (tenths + hundredths).

#### Volcano Lab (grade 5): pv 5-6, mbig 5, dec 3-5, dbig 4, round 4, ooo 1

- **Strong**: decimal word form, place-value charts, powers of ten as "moving the digits" (correctly described as digits moving, not the point jumping),
  ragged decimals lined up in the step hint, "make the divisor whole" for decimal division.
- `pv 6` hint for 10⁴: "write 10 4 times with × between them", then "Each 10 you multiply in adds one more zero". Fine for whole powers. Keep the
  "digits move" language from the multiply items here too.
- `ooo 1` "write the expression" items are good (5.OA.2). Could add "which needs parentheses?" items.

#### Crystal Caves (grade 5): fop 3-6, geo 4, coord 1, meas 6, data 4, pat 5, story 8

- **Strong**: area model for fraction × fraction, bar picture for unit-fraction division, unit cubes for volume, a line plot of fractional lengths
  (screenshot `40-caves-data4-380x780`), two-rule patterns.
- **Area-model colour key (Should 12).** `fop 5` seed 31676 (4/5 × 5/6): the hint says "The orange rows show 4/5. The blue columns show 5/6." In the picture
  the 4 × 5 overlap is dark blue, one column is pale orange and one row is pale blue (screenshot `38-caves-fop5-1024x600`). A child looks for 4 orange
  rows and finds one orange column. Describe what is drawn: "4 of the 5 rows are coloured, 5 of the 6 columns are coloured, the dark boxes are in both".
  Or draw the rows and columns as two overlapping translucent colours. 35-gen-math-upper.js line 1135 (`ccFop5`).
- Missing 5.NF.3 (fraction as division) and 5.NF.5 (scaling).
- `story 8` is varied and real (recipes, money, distances). Good.

#### Sky City (grade 6): ratio 1-4, int 1-3, fop 7

- **Strong**: ratio tables, unit rates, better buy, percent of and percent whole, temperatures and floors for integers, a number-line step hint for integer
  addition (screenshot `42-sky-int3`), absolute value including negatives.
- `ratio 2` prices are odd for the items (8 apples for $28.40; 8 books for $23.20). Use realistic prices so the "better buy" makes sense.
- `int 1` "1 degrees" (Must 4).
- `fop 7` hint "Flip and multiply" is a procedure without meaning. Add the "how many 1/7s fit in 2/3" picture first (like fop 6), then the shortcut.
- Missing 6.NS.7 rational-number ordering beyond integers.

#### Galaxy Core (grade 6): ooo 2-3, alg 1-3, geo 5, coord 2, fact 3, data 5, story 9

- **Strong**: balance-scale hint for one-step equations, "undo in reverse order" for two-step equations, inequality number lines with an open dot
  (screenshot `44-galaxy-alg3`), "a triangle is half a rectangle" for area, four-quadrant reflection, mean as "fair share".
- `fact 3`: GCF answer 1 or 2 in many items (19% answer 2). Seed 47514 is a word problem with GCF 1 ("18 boys and 29 girls... greatest number of teams" → 1).
  Use pairs with GCF 3-12 in word problems.
- `data 5`: the mean is always a whole number (as specified); no MAD, IQR, box plot or histogram (6.SP gaps, Should 7).
- Missing 6.EE.2-4 equivalent expressions and 6.G.2-4 (Should 7). These are the biggest grade 6 gaps.
- Prompt without a question mark: "Which number line shows x > 2" (also `time 6` "What time will it be 75 minutes after 9:20", `frac 2` "Which picture shows
  1/2", `frac 5`).

### 2.5 Across the section

**Feedback on errors (Should 6).** `check()` in 50-round.js: first miss → "Try again!", a pet line and the hint; second miss → the answer is revealed with
"Here's the answer" and spoken, then the next question after 2.6 s. Distractors already encode misconceptions (CURRICULUM 1.3: swapped digits, wrong operation,
longer-is-bigger). Map the commonest wrong values to one sentence each, for example "You added. This one says 'times'." or "0.25 has more digits, but 3 tenths
is more than 2 tenths." After the second miss, show the step hint opened to its last step plus the answer, a complete worked example. Shute 2008 and
Hattie & Timperley 2007 both find that specific, task-level feedback beats right/wrong.

**Representations fade too early in places.** Pictures are strong in K, place value and fractions, and absent in Number Meadow (K, Should 9), the fact stops
(add 2-3, sub 2, miss, mfact, dfact) and every story problem. Bar models, which make word problems easier (Fuchs et al. 2021), never appear. A tape diagram in
the story hints from grade 1 to grade 6 would be one shared VIZ function.

**Interleaving and spacing are good; the pass bar is low.** Every stop round mixes in an older stop at questions 4 and 8 and due review items at 2, 4, 6 and 8.
Missed items follow 0/1/3/7/21-day boxes. Mixed Practice and the boss mix a world. This matches Pashler et al. 2007 and Rohrer et al. 2015. A stop opens
the next at 7 of 10. Mastery-learning studies use 80-90%. Because the review system catches misses, 7/10 is defensible for unlocking, but the report card's
"mastered" (90% over 20 tries and 2 days) is the better signal. Could: unlock at 7/10 but require 8/10 on the boss.

**Variety and engagement.** Most stops from grade 1 up are one bare equation and a number pad (add 1-3, sub, big, mfact, dfact, mbig, dec 3-5, round, alg 1-2).
They are accurate but flat. Low-cost variety that also teaches: "find the mistake" (Booth et al. 2013), estimate first ("is 49 × 21 nearer 100, 1,000 or
10,000?"), true or false equations (1.OA.7), "make this true" with two blanks, and context sentences for bare computation in the review slots (Could 14).

**Pre-K and K language load** is low and audio-first everywhere. From grade 2 the prompts are not read automatically ('tap' in `gradeCfg`). Grade 2 to 3
story and data prompts are 15-30 words, which is reasonable with the Hear it button.

**Boss taunts.** On a wrong answer in a boss round the boss says "Ha ha! Missed me!" with a giggle sound (50-round.js line 113). It is playful, but for
5-year-olds it reads as being laughed at. "So close! Try again!" keeps the game feel without mocking (Could; engagement review R-02 may cover it).

### 2.6 Practice systems, where they touch math

- **Fact Sprint** (57-fluency.js): 60 seconds or 20 facts, beat your own best, missed facts come back after 3 others. This is good, self-referenced timed
  practice of known facts (Fuchs et al. 2021 rec. 6). Facts are drawn at random each time, with no memory of which facts are slow across days. Could 17: keep
  a per-fact latency record and serve the slow facts more (incremental rehearsal).
- **Speed Race** (54-race.js): the math race is add and subtract within 18 for every child, so a grade 5 child races 3 + 4. Could 17: use times and divide
  facts once `mfact 1` is passed.
- **Daily Review and Mixed Practice** (59-review.js, 50-round.js): rebuild the exact missed question by seed, which is correct. When a generator changes, a
  fresh question of the same skill is used. Good.
- **Placement** (45-placement.js): 4 random stops per world testlet, 3 of 4 to pass a world. In Fraction Forest (16 stops) a child can pass without one
  fraction question, and the world is then skipped. Could 18: draw the testlet one per strand (CURRICULUM 9), and send skipped worlds' fraction and
  measurement stops to review once.

### 2.7 Variety statistics (1,500 generated per level; selected)

| Skill level | Distinct items | Note |
|---|---|---|
| shape 1, shape 2 | 4 each | fine for Pre-K/K with random colour and rotation |
| mult 1 | 9 | a 10-question round repeats |
| tenf 2 | 9 | fine for K |
| coins 5 | 23 | repeats often; $5 half has 4 prices |
| story 1 | 44 | 25% "1 [plural]" |
| miss 2, sub 2 | 90, 45 | answer 9 in 31% |
| mfact 1 | 85 | answer 0 in 28% |
| dbig 1 | 97 | answer 11 in 26% |
| fact 3 | 1,062 | answer 2 in 19% |
| frac 4 | 219 | "=" never the answer |
| big 5 to 7, sub 6 to 8, dec 3 | about 1,500 | effectively endless |

The right answer's position is random: about 25% per position wherever a level always has 4 choices. Uneven columns (pv 4, fact 2, shape 5) come from levels that mix 2-, 3- and 4-choice items, not from bias.

### 2.8 Top 10 (for Andy)

1. Rounding hint says "past halfway" for exactly halfway numbers; the hint leads to a wrong answer (`ffRound`, round 1 seed 3) (S). Done in R-01m.
2. Replace the counting hint for facts with make-ten, doubles and think-addition hints (`add 2-3`, `sub 2`, `miss 2`, 39-hints.js) (M). Done in R-01m.
3. Add the missing word-problem types and pictures in K to 2 (`story 1-3`) (M). Done in R-01m.
4. Fix "1 pencils" style plurals in stories, coins 5, story 6, int 1, geo 1, shape 6 and hints (S). Done in R-01m.
5. Even out fact frequencies (`miss 2`, `sub 2`, `mfact 1`, `dbig 1`) (S). Done in R-01m.
6. Misconception-specific feedback, and a full worked example after the second miss (50-round.js and generators) (M-L).
7. Fill the standards gaps: = meaning (1), times-as-many (4), equivalent expressions, surface area and box plots (6) (L in total).
8. Move even/odd to grade 2 and `sub 3` to grade 2; add pictures to Number Meadow's K adding and subtracting (S + M).
9. Real coin faces in coins 1-3; no colour-only patterns; clear area-model colours in fop 5 (M + S + S). Patterns and fop 5 done in R-01m; coins not yet.
10. Keep the hint visible on phones after a miss (S). Done in R-01m.
