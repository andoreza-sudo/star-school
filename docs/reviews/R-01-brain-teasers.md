# R-01 Brain Teasers: teaching and engagement review

Review of the Brain Teasers section (all 19 puzzle types, bands A to D, 12 levels each), as of v138 (56d3d17).
Written 2026-11-11 by Claude for Andy. No app changes were made.

---

## Part 1. For parents: the short version

### What works well

- **Every puzzle I tried can be solved, and the ones that promise one answer have exactly one.** I generated about 55,000 puzzles
  across every type, band and level and checked them with my own solvers, separate from the app's: 14,400 Sudokus, 10,800
  MathDokus and 10,800 Logic Grids (each has exactly one solution), 3,600 number pyramids, balances and Make the Number puzzles,
  4,800 Turn It, Mirror and Cube puzzles and 10,800 pattern questions. I found no broken puzzle and no Sudoku, MathDoku, Logic Grid,
  Pyramid, Balance, Turn It or number pattern with a second right answer.
- **Pre-K and Kindergarten children are not asked to read.** In band A every type reads its question aloud when it opens
  ("What comes next?", "Which shadow matches the shape?", the riddle itself), uses pictures (animals in the 4x4 Sudoku, drawn
  shapes, fruit on scales) and has a speak button for every line.
- **Hints teach a step, not just the answer.** Sudoku says "Only the pig is missing from this row", the number pyramid says "Add the two
  bricks under it: 8 + 9", the balance says "Take 2 away from both sides", Logic Grid points to a clue and says what it lets you
  mark. The third hint always lets a child finish, so nobody gets stuck.
- **It trains the right kinds of thinking.** Shape puzzles (Tangram, Shape Fit, Turn It, Mirror, Cubes) practise spatial skills,
  which research shows can be improved and which go with later maths. Patterns, Balance and the Pyramid lead into algebra.
  Robot Path is a gentle start to coding (step by step, then loops). Logic Grids and Sudoku practise careful step-by-step reasoning.
- **Kind and fair.** Wrong moves turn amber, not red, there is no "game over", and after three tries at the same level the app
  offers an easier band with no penalty.
- **It works on a phone and a tablet.** I played every type with real taps and drags at 380 x 780 (a phone) and 1024 x 600
  (a small tablet), from the first level of the youngest band to level 10 of the oldest, and won every one (the Pre-K Sudoku run
  stopped because of my test script, not the app). No console errors.

### What to improve, in priority order

Sizes: **S** = an hour or two, **M** = about a day, **L** = several days.

**Must fix**
1. **Patterns: a wrong picture can look exactly like the right size (S).** The answer choices are drawn about 1.6 times bigger
   than the pictures in the pattern row. When a wrong choice differs only in size, the wrong one can match the row by eye. Example:
   the row is big orange ball, small blue ball, big orange ball, small blue ball; the choices are a very large orange ball (right)
   and a medium yellow ball that is the same size on screen as the orange balls in the row (wrong). A young child who matches "the
   same as that one" is marked wrong, and a colour-blind child cannot use orange against yellow to tell them apart. About 1 in 3
   "What comes next?" questions in Pre-K/K levels 1-4 has a size-only wrong choice. Fix: draw the choices at the same scale as the
   row, or leave size-only wrong choices out of band A. Patterns, `src/js/76-bt-pattern.js` and `src/css/49-bt-pattern.css`.
2. **First and second graders must read long instructions (S).** Only band A speaks the first instruction by itself. A 1st grader
   opening MathDoku sees "Each row and column needs 1, 2 and 3 once. The numbers in a cage add up to its number. Tap a square, then
   a number." (25 words, with "cage"), and Logic Grid says "Tap a square once for a cross (no), twice for a tick (yes)". There is a
   speak button, but a child who cannot read it may not know to press it. Fix: speak the first instruction in band B too
   (the `band == 'A'` tests on the intro line in each type file).

I found no broken puzzle and no puzzle with two right answers by the rules.

**Should fix**
3. **Tangram for Pre-K starts with pieces turned the wrong way (S).** The very first Pre-K tangram (two pieces to place) needs a
   triangle to be turned before it fits; turning by tapping a piece is hard at 4. Shape Fit already lets band A pieces lie the
   right way. Let band A tangram pieces arrive turned correctly for levels 1-6. `src/js/80-bt-tangram.js`.
4. **Copy Cat asks for longer sequences than most children of that age can hold (S).** Level 12 asks a Pre-K child for 5 in a row,
   a 3rd-4th grader for 7, and a 5th-6th grader for 6 backwards. Typical memory span is about 3-4 at age 5, about 5 at 8-9, and
   about 4-5 backwards at 11. Cap the targets near the age average plus one. `src/js/83-bt-copycat.js`.
5. **Turn It gives 1st-2nd graders a mirror image as a wrong choice before mirror images are taught (S).** In band B about 1 shape in 4
   has its mirror image among the choices. Children this age often see a mirror image as "the same" (that is normal, and fades with
   reading). Keep mirror images for band C, where the puzzle is about them. `src/js/85-bt-rotate.js`.
6. **Using hints halves the game time a puzzle pays (S).** A first solve pays 45-120 seconds with no hints, half that with two.
   Asking for help when stuck is a good habit; stars can show "no hints" but game time should not shrink. `BT.gameSec` in
   `src/js/74-teasers.js`, `ptBT` in `58-playtime.js`.
7. **Difficulty climbs in steps, not a ramp (M).** Most types change only every 4 levels (levels 1-4 are the same size, then a
   jump), and there are big jumps between bands: a maze goes from a 27-step route at Pre-K/K level 12 to 45 steps at grade 1-2 level 1,
   Sudoku from a nearly empty 4x4 to a 6x6, and Robot Path band C's shortest program goes 2, 3, 5, 5, 6, 4, 4, 6 blocks over levels
   1-8. Spread the size and given counts over all 12 levels and sort Robot Path's bank by length. Type files and banks.
8. **Some hints show the way but do not teach a way to think (S each).** Maze hints draw dots ("Follow the dots"), Tangram and Shape
   Fit hints place a piece, and the second Patterns hint in bands C-D states every rule at once (which is the answer). Add one
   strategy line first ("Try the big triangles first", "Find the corner only one piece fits", "In a dead end, go back to the last
   turn", "Look only at the arrows: which way do they point?").
9. **Pre-K patterns are short (S).** "ABC" and "AABB" patterns show only 1.5 to 1.7 copies of the repeating part before the question
   ("A A B B A A ?"). Young children find the repeating unit much more easily after two full copies. Show at least two full units in
   band A.
10. **Big mazes are small on a phone (M).** At 380 x 780 an 18 x 18 maze (grades 5-6, levels 9-12) has 18 px squares (the design
    said at least 28 px). Dragging works, but it is fiddly. Offer the arrow pad by default there, or use 14 x 14 on phones.
    `src/js/75-bt-maze.js`.

**Could do**
11. Hide the running clock in bands C and D, or make it optional (S): it does not affect stars and can add pressure.
12. Order the hub by band (S): a Pre-K child sees Sudoku first; Mazes, Patterns, Memory and Riddles suit them better as first picks.
13. Riddle polish (S): "I have seven colours" (rainbow, B9) but the Pre-K rainbow hint lists six; "a big, hot ball of fire" (sun,
    B20) is not quite right (a ball of hot gas); at least 8 band A answers come back in band B (egg, star, bed, snowman, rainbow,
    tree, sun, clock).
    `src/data/d-riddles.js`.
14. Do not sell Copy Cat and Memory Match as "brain training" (S, wording only): memory games are fun and fine, but practising them
    does not make children better at other thinking tasks.
15. Unscramble band B: "coat" also spells "taco" (S). The picture makes it clear, so it is harmless; drop it if the list is touched.

---

## Part 2. Detailed findings

### 2.1 How the review was done

- **Read**: ROADMAP R-01, docs/BRAIN_TEASERS.md, the PROGRESS entries for P3-01 to P3-17, R-02, and the code: 74-teasers.js and all
  bt part files (75-bt-maze to 88-bt-scramble), the banks in src/data (d-puz-*, d-riddles, d-memory, d-words-bt), 58-playtime.js.
- **tools/test.js**: all 122 checks pass on 56d3d17 (4 min 20 s), including every Brain Teasers check.
- **Generated and checked with my own code** (loaded as tools/test.js loads it; scripts in the session scratchpad `h/`):
  - Sudoku: 14,400 puzzles (4 bands x 12 levels x 300 days, so every runtime turn and symbol swap): own backtracking counter,
    exactly 1 solution each, givens agree with the stored solution.
  - MathDoku: 10,800 puzzles (bands B-D): own cage counter, exactly 1 solution each.
  - Logic Grid: 10,800 puzzles (bands B-D, names swapped at runtime): own brute force over every assignment with my own reading of
    "is", "not", "or", "older/younger", "ahead/behind" and "one apart": exactly 1 solution each, and it is the stored one.
  - Number Pyramid, Balance, Make the Number: 3,600 puzzles. Pyramid: sums, rank of the givens (my own elimination), brute force for 3
    rows, and "two of three known gives the third" fills bands B and C (it does; band D levels 10-12 are marked tricky and need a
    step of algebra). Balance: brute force of every value 1-40: exactly one solution, the stored one. Make the Number: own search
    (whole, non-negative steps): every puzzle has a solution (level 1 has 2-71, level 12 has 1-19).
  - Patterns: 10,800 items. Number sequences checked against a wider rule list than the app's (17 rules: cycles, steps, times,
    x a + b, second differences, Fibonacci-style, any two-term recurrence with whole coefficients, alternating steps, alternating
    + and x, interleaved, squares, cubes, triangular numbers and powers of 2 from any start). No wrong choice fits a rule a child
    could reasonably see. (The only hits were "the second differences go 1, 0, 1, 0" on Fibonacci rows such as 1, 1, 2, 3, 5,
    which no child would use.)
  - Turn It: 4,800 puzzles' items: exactly one choice is the shape turned; every band C and D target is chiral.
  - Cubes, Mirror, Shape Fit, Tangram, Maze, Robot: built by construction and proved by the existing tests; I checked sizes and
    steps per level (2.4).
  - Riddles: all 144 read by hand for a second fair answer, accuracy and age fit. Memory pair lists, Unscramble word lists and
    Word Search grids read for overlaps and anagrams.
- **Played** in the built app (index.html v138) with Playwright and Chromium, deviceScaleFactor 2, real taps and drags
  (touch emulation at 380 x 780, mouse at 1024 x 600): Home -> Brain Teasers -> type -> level, hint 1, hint 2 (after the cooldown),
  then solved through the real controls (dragging the maze bear, dragging tangram and Shape Fit pieces, dragging words in Word Search,
  tapping everything else) to the win card.
  - 380 x 780, level 1 of the youngest band: all 11 band A types and all 8 types that start in band B. Sudoku band A: my bot's pad
    tap missed (a script problem: the hint and board worked and are covered by the smoke test).
  - 1024 x 600, band D level 10: all 19 types, all won.
  - 380 x 780, band D level 10: Sudoku, MathDoku, Logic Grid, Maze, Word Search, Tangram, Shape Fit, Patterns, Robot Path, all won.
  - About 190 screenshots, looked at as contact sheets, in the session scratchpad `r01-btp/` folder (for example
    `pattern-A1-380x780-1start.png`, `patsize-A4-1024x600.png`, `tangram-A1-380x780-1start.png`, `maze-D10-380x780-1start.png`,
    `logic-D10-380x780-1start.png`).

**Broken or multi-solution puzzles found: none.** The one must-fix puzzle problem (Must 1) is about how patterns are drawn, not
about the rule.

### 2.2 Evidence base used

| Area | Source | What it asks of a puzzle app |
|---|---|---|
| Spatial skills can be trained, and the gains last and transfer within spatial tasks | Uttal, Meadow, Tipton et al. 2013, *Psychological Bulletin* (meta-analysis, 217 studies) | Plenty of practice with rotation, composition and visualisation; it is worth doing |
| Spatial skill and early maths | Verdine, Golinkoff, Hirsh-Pasek et al. 2014, *Child Development*; Cheng & Mix 2014, *J. Cognition and Development*; Mix & Cheng 2012 | Spatial puzzles (assembly, rotation) go with, and in training studies improve, early number and calculation |
| Puzzle play | Levine, Ratliff, Huttenlocher & Cannon 2012, *Developmental Psychology* | Jigsaw and shape puzzles at 2-4 predict spatial transformation skill at 4-5 |
| Shape composition trajectory | Clements & Sarama 2014, *Learning and Teaching Early Math: The Learning Trajectories Approach*; Sarama & Clements 2009 | Pre-K "picture makers" fill outlines with pieces that already face the right way; turning pieces comes later |
| Mental rotation in young children | Frick, Möhring & Newcombe 2014, *Frontiers in Psychology* | Rotation is hard before 5-6; start with small turns and matching, not mirror judgements |
| Mirror images and literacy | Dehaene, Nakamura, Jobert et al. 2010, *NeuroImage*; Cornell 1985 | Children treat mirror images as "the same" until reading teaches b/d; mirror distractors belong after age 7-8 |
| Symmetry | Bornstein, Ferdinandsen & Gross 1981, *Developmental Psychology* | Vertical symmetry is seen first, then horizontal, then diagonal: the Mirror band order is right |
| Repeating patterns | Rittle-Johnson, Fyfe, Loehr & Miller 2015, *Early Childhood Research Quarterly*; Papic, Mulligan & Mitchelmore 2011, *JRME*; Fyfe, Evans, Matz, Hunt & Alibali 2017 | Teach the "unit of repeat"; show it at least twice; patterning skill predicts later maths |
| Early algebra | Carraher, Schliemann, Brizuela & Earnest 2006, *JRME*; Blanton & Kaput 2005 | Balances, unknowns and growing patterns are a sound route to algebra from grade 1 |
| Early coding | Bers, Flannery, Kazakoff & Sullivan 2014, *Computers & Education*; Kazakoff, Sullivan & Bers 2013 | Sequencing, debugging and loops are learnable at 4-7 with blocks and immediate runs |
| Working memory norms and training | Gathercole, Pickering, Ambridge & Wearing 2004, *Developmental Psychology*; Farrell Pagulayan, Busch, Medina et al. 2006 (Corsi norms); Melby-Lervåg & Hulme 2013; Melby-Lervåg, Redick & Hulme 2016, *Perspectives on Psychological Science* | Span targets near the age average; memory games do not transfer to reasoning |
| Far transfer of "brain games" | Sala & Gobet 2017, *Current Directions in Psychological Science*; Simons, Boot, Charness et al. 2016, *Psych. Science in the Public Interest* | Puzzles build the skills they practise; do not promise general intelligence gains |
| Scaffolding and hints | Wood, Bruner & Ross 1976, *J. Child Psychology and Psychiatry*; Aleven, Stahl, Schworm, Fischer & Wallace 2003, *Review of Educational Research* | Contingent hints that teach a step; help-seeking should be encouraged, not penalised |
| Rewards and interest | Deci, Koestner & Ryan 1999, *Psychological Bulletin*; Hidi & Renninger 2006 | Expected, tangible rewards for an interesting task can lower interest; informational rewards are safer |
| Children and touch | Anthony, Brown, Nias & Tate 2013 (children's touch targets); Hourcade 2015, *Child-Computer Interaction* | Large targets, forgiving drags, no fine motor precision for under-6s |

### 2.3 Reasoning skills: what each type builds

| Type | Skill | Evidence strength | Notes |
|---|---|---|---|
| Tangram, Shape Fit | spatial composition, rotation | strong (Clements & Sarama; Levine 2012; Uttal 2013) | Band A tangram needs turning too early (Should 3) |
| Turn It, Cubes, Mirror | mental rotation, 3D visualisation, symmetry | strong (Uttal 2013; Cheng & Mix 2014) | Cubes only uses stacks where every column's height can be seen (good); Mirror order matches the symmetry research |
| Patterns | repeating and growing patterns, analogy, matrices | good (Rittle-Johnson 2015; Fyfe 2017) | Must 1, Should 9 |
| Balance, Pyramid, Make the Number | early algebra, number sense, flexible arithmetic | good (Carraher 2006) | Band D tricky pyramids need one algebra step; the hints say so |
| Robot Path | sequencing, debugging, loops, functions | good (Bers 2014) | Band D adds "repeat until wall" then a function, one at a time (well judged) |
| Logic Grid, Sudoku, MathDoku | deduction by elimination | moderate: builds the skill itself; far transfer is weak (Sala & Gobet 2017) | Banks graded by a human-style solver: a strong design |
| Riddles | language, inference, lateral thinking | moderate | Band D adds genuine word problems with guess-and-check hints |
| Memory Match, Copy Cat | working memory, vocabulary pairs | low as training (Melby-Lervåg 2016); fine as play | Memory pairs teach content (fractions, roots, Spanish) |
| Word Search, Unscramble | spelling recognition | moderate (spelling lists of the child's grade) | |

### 2.4 Findings by type

Each item names the type, band, level and a sample (day, as `BT.make(type, band, level, {day})`).

#### Patterns (`pattern`, 76-bt-pattern.js), bands A-D

- **Solvable, one rule**: 10,800 items, no wrong choice fits a sensible rule (2.1).
- **Must 1, size at two scales.** Choice tiles are about 1.6 times the row tiles, and shapes are drawn as a share of their tile.
  `pattern A 4 2026-1-1` item 3: row big orange, small blue, big orange, small blue; choices big orange (right, 220 px tall on
  screen at 2x), medium yellow (170 px, the same as the row's orange at 150 px), blue heart, medium blue
  [patsize-A4-1024x600]. `pattern A 1 2026-1-1` item 3: row small red, big orange; the small yellow choice is the row's red size
  [patsize-A1-380x780]. Share of "What comes next?" items with a size-only wrong choice: A1-A4 30-34% (21-25% a smaller one),
  A5-A12 13-21%, B5-B12 39-59%. The colour change that comes with size is often orange against yellow, a weak pair for colour-blind
  children (the R-01m rule keeps red away from green but not orange from yellow).
- **Should 9**: repeats shown in band A: AB 2-2.5 units, ABC 1.67-2, ABB 1.67-2, AABB 1.5.
- **Should 8**: hint 2 in bands C-D lists every attribute's rule ("In each row the arrows point down, right and left, in some
  order. In each row, the shapes get bigger. In each row, every picture has the same number of shapes.") [pattern-D10-380x780-3hint2].
  That is the whole answer; the spec says "the rule for one row". Give one attribute per hint press.
- Good: colour never works alone (each colour follows another attribute); odd-one-out has a 2-2 distracting split only at tier 3;
  matrices are checked by rows and by columns.

#### Sudoku (`sudoku`, 78-bt-sudoku.js), bands A-D

- 14,400 puzzles, exactly one solution each. Givens: A 10/9/8, B 8/6/5, C 22/18/14 (6x6), D 42/36/31; technique grade: B-C 2,
  D levels 9-12 grade 4 (locked candidates or naked pairs).
- Band A with animals and the "how many left" dots under each animal is excellent for Pre-K [sudoku-A1-380x780-1start]. The hint
  names the reason ("Only the pig is missing from this row").
- Should 7: B12 (4x4, 5 givens) to C1 (6x6, 22 of 36) is a big jump in time; C has no technique step (all grade 2). D9 jumps from
  grade 2 to grade 4 without a level that teaches the new technique; the hint explains it, but a "new trick" card before D9 would help.
- 9x9 on a phone: 36 px squares with the 48 px zoom box, played to a win at 380 x 780 [sudoku-D10-380x780-4mid].

#### MathDoku (`mdoku`, 79-bt-mdoku.js), bands B-D

- 10,800 puzzles, exactly one solution each. Played to a win at B1 (380) and D10 (both sizes).
- Must 2: the band B instruction is 25 words with "cage" and is not spoken by itself [mdoku-B1-380x780-1start].
- Band B is addition only on 3x3 (grade 1-2 fit: sums to 6). Good.

#### Logic Grid (`logic`, 80-bt-logic.js), bands B-D

- 10,800 puzzles, exactly one solution each under my own reading of the clue words; no redundant clue (test).
- Band B draws each clue as child + picture + tick or cross [logic-B1-380x780-1start]: good for early readers, but the
  instruction line is text (Must 2).
- Band D on a phone: the grid shows one block per tab and the clue list sits under it, so a child scrolls between clue and grid
  (two clue cards visible, the rest below the fold) [logic-D10-380x780-1start]. Could: let a tapped clue pin above the grid.
- The win card says the answer in words ("Kai likes yellow and came first."), which closes the loop nicely.

#### Mazes (`maze`, 75-bt-maze.js), bands A-D

- Perfect mazes by construction; keys and doors proved by the state search (test). Played to a win at A1 (380), D10 (both sizes).
- Route length (median par over 40 days): A 19-21 (5x5), 27-29 (6x6); B 45 / 56 / 66; C 105-115 / 127-138 / 153-163; D 156-161 /
  178-198 / 211-220. A12 to B1 goes 27 -> 45 (Should 7). Band A level 1 is a 20-cell route on 5x5: one long drag rather than the
  "2-4 moves" the design table set for band A, but it is a single gesture and the arrow pad is offered.
- Should 10: at 380 x 780 an 18 x 18 maze has 18 px squares [maze-D10-380x780-1start]; the design said 28 px.
- Should 8: hints are "Follow the dots" (route shown). A strategy line (dead ends, keep a hand on one wall, plan from the goal back)
  would teach.

#### Number Pyramid, Balance, Make the Number (`pyramid`, `balance`, `target`, 77-bt-number.js)

- All 3,600 checked puzzles unique (pyramid, balance) or solvable (target). Played to wins at B1 / A1 (380) and D10 (1024).
- Pyramid tops: B 5-32, C 12-81, D 41-254. Bands B and C solve by "two known gives the third"; band D levels 10-12 need one step of
  algebra and are marked tricky. Hints are worked steps ("The brick above is 17. Take away the brick next to it, 9.").
- Balance: A is one unknown with pictures ("present + 2 = 4"); B two unknowns, triangular; C three; D simultaneous (sum and difference,
  pair sums: "Put all three scales together: every picture is there twice. Half of 54 is one of each picture."). This is
  a strong early-algebra sequence (Carraher 2006). Band A "aa" forms (two apples weigh 10) ask halving at 4-5; fine with the hint.
  Band B "xxx" forms (three of the same weigh 27) ask division by 3 in grade 1-2: rare (23 of 360 samples) and hinted.
- Make the Number: level 1 has many solutions, level 12 few (B 2-5 -> 1-2, D 7-71 -> 1-19): a good difficulty lever.

#### Tangram and Shape Fit (`tangram` 80-bt-tangram.js, `fit` 84-bt-shapefit.js)

- Any exact cover wins; pieces snap. Played to wins with real drags at A1 (380) and D10 (both sizes), including turning by tapping.
- Should 3: tangram A1 on the day played ("Sailboat") needs the big triangle turned before it fits
  [tangram-A1-380x780-1start]. Shape Fit band A pieces arrive the right way (good) [fit-A1-380x780-1start].
- Pieces to place: tangram A 2 (levels 1-6) then 3, B 4 then 5, C 6, D 7; Shape Fit A 2-3 pieces of 4-11 squares, D 7-8 of 24-36
  squares. Smooth inside bands.
- Should 8: hints glow the slot, turn the piece, place it; no strategy line.

#### Robot Path (`robot`, 81-bt-robot.js)

- Any program that reaches the flag wins; C-D bank pars proved shortest (test). Played to wins at A1 (380), D10 (both sizes).
- Band A arrow blocks say their names when tapped; the board and Go button are large [robot-A1-380x780-1start].
- Should 7: band C par by level (median over 20 days): 2, 3, 5, 5, 6, 4, 4, 6, 6, 7, 7, 7; level 1 is "repeat 5: forward" (2 blocks),
  easier than level 6 or 7 dips. Sort the C bank by par and template inside each tier.

#### Riddles (`riddle`, 81-bt-riddle.js, d-riddles.js)

- All 144 read. Each has one fair answer among its choices; distractors are good (a pencil is a near miss for the candle riddle,
  "I glow" rules it out). Band D's number riddles are correct (63, 503, 28, 60, Day 8 for the snail, 7 children, daughter 10,
  20 sevens, 11 seconds, pen 5 coins) and the hints model guess-and-check and working backwards.
- Could 13: B9 "seven colours" against A25's six-colour hint; B20 "a big, hot ball of fire"; overlap A/B: egg (A21/B2),
  star (A15/B4, both hint "Twinkle, twinkle, little ..."), bed (A33/B6), snowman (A26/B7), rainbow (A25/B9), tree (A23/B3), sun
  (A13/B20), clock (A35/B1) and others. A15's second hint "Twinkle, twinkle, little ..." gives the answer away.

#### Memory Match and Copy Cat (`memory` 82-bt-memory.js, `copycat` 83-bt-copycat.js)

- Memory: every card has one partner (values differ; synonym and root lists have no cross-pair overlap). The pairs carry content:
  letters, number-dots, fractions, Spanish, synonyms, equivalent fractions, word roots. Good use of a memory game.
- Copy Cat target lengths by level tier: A 3 / 4 / 5, B 4 / 5 / 6, C 5 / 6 / 7, D forward 7, then backward 5 / 6. Should 4 with norms:
  forward spatial span about 3-4 at 5, 5 at 8-9, 5-6 at 11; backward about 4-5 at 11 (Gathercole 2004; Farrell Pagulayan 2006). The
  hints (replay slower, ring the next pad, tap it) let everyone finish, so the top levels are mostly finished with hints.

#### Cubes, Turn It, Mirror (`cubes` 84-bt-cubes.js, `rotate` 85-bt-rotate.js, `mirror` 86-bt-mirror.js)

- Cubes: only stacks where every column's top (or floor) is in view are used, so the count is fixed by the picture. Cubes per
  stack: B 2-8 (hidden 0-1), C 5-20 (hidden up to 8), D 10-36 (hidden up to 17). Played to wins.
- Turn It: one turned match per item (checked). Band A shadows are not turned on levels 1-6, turned from 7 (good ramp). Should 5:
  band B has a mirror-image wrong choice in 26% of shapes (1,920 shapes).
- Mirror: B vertical line, C horizontal or diagonal, D half-turn: matches the symmetry research order. Played to wins.

#### Word Search and Unscramble (`wsearch` 87-bt-wsearch.js, `scramble` 88-bt-scramble.js)

- Words come from the child's grade spelling lists; each word once (test). Played to wins with real drags.
- Unscramble words used (all 143 seen across 80 days): no anagram problem except band B "coat" (taco), where the picture decides
  (Could 15).

#### Framework (74-teasers.js)

- Strong: one shared frame, three hint tiers with a cooldown, saving and resuming a puzzle, an easier-band offer after three quits,
  Puzzle of the Day, badges that only add.
- Should 6: game time = 45 / 60 / 90 / 120 s x stars / 3 (at least half). Two hints make 1 star, so half the time ("+23 sec Puzzle
  solved with 2 hints" at band A). Stars can carry the "no hints" message; game time should not.
- Could 11: the clock is shown in bands C and D; nothing uses it.
- Could 12: hub order is the catalog order, Sudoku first, for every band [hub-A-380x780].
- Rewards and motivation: puzzles are naturally interesting, and paying game time for each one is the kind of expected,
  tangible reward that Deci, Koestner & Ryan (1999) found can lower interest in an interesting task. The current amounts are small
  and capped at half the daily limit, which is sensible; if game time is retuned, keep Brain Teasers paying less than learning rounds
  and lean on stars, badges and Puzzle of the Day.

### 2.5 Touch and layout at 380 x 780 and 1024 x 600

- Every type was played to a win with real input at both sizes (band D level 10), and at 380 x 780 for the first band's level 1.
- No sideways scroll and no control off screen in any run. Buttons are 48 px or more except the dense grids, as designed:
  9x9 Sudoku squares are 36 px on a phone (zoom box with 48 px squares beside the pad).
- Below the design minimum: 18 x 18 maze squares at 18 px on a phone (Should 10).
- Band D Logic Grid on a phone: clue cards partly below the fold (Could, 2.4).

### 2.6 Top 10 for Brain Teasers

1. Draw pattern choices at the row's scale; no size-only lookalikes in band A (Must 1, S).
2. Speak the first instruction in band B (Must 2, S).
3. Band A tangram pieces arrive turned the right way (S).
4. Stop halving game time for hints (S).
5. Copy Cat targets near age norms (S).
6. No mirror-image wrong choices in Turn It band B (S).
7. Smoother levels: spread size and givens over 12 levels; sort Robot band C by par (M).
8. Strategy lines in maze, tangram, Shape Fit hints; one rule per Patterns hint (S each).
9. Two full repeats in Pre-K patterns (S).
10. Bigger mazes on phones: arrow pad or a size cap (M).
