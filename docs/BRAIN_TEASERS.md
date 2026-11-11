# Brain Teasers: Design

A puzzle section inside the learning area. It trains logic, spatial sense, patterns, working memory and flexible number thinking,
matched to the child's grade. Puzzles count as learning: they earn stars and game time, not spend it.

Chunks that build this are P3-01 to P3-17 in ROADMAP.md. Each chunk names the sections here that it implements.

---

## 1. Goals and rules

| Goal | Rule that follows |
|------|-------------------|
| Always solvable | Every puzzle is either built from a solution (constructive) or proven by a solver before it ships. |
| One answer where the puzzle type promises one | Sudoku, MathDoku, logic grids, magic squares, pyramids and pattern questions must have exactly one solution. Proven at dev time or by construction. |
| Light on the tablet | No heavy search at runtime. Uniqueness-critical puzzles ship as pre-verified banks (decision A8). |
| No reading needed in band A | Spoken instructions, picture symbols. |
| Never stuck | Three hint tiers on every puzzle. A child can always finish. |
| Fresh | Runtime transforms (relabel, rotate, mirror, re-theme) make each bank puzzle appear in many forms. |

## 2. Bands and the hub

| Band | Grades | Reading | Typical session |
|------|--------|---------|-----------------|
| A | PK-K | none | 1-2 minute puzzles, 2-4 moves |
| B | 1-2 | short words | 2-3 minutes |
| C | 3-4 | sentences | 3-6 minutes |
| D | 5-6 | paragraphs (logic clues) | 5-10 minutes |

Band comes from `S.grade`. A child can always play one band lower. The next band up unlocks per puzzle type after 10 stars in the current band.

**Hub screen** ("Brain Teasers", entered from a new home card next to the three learning paths):
- Top: Puzzle of the Day card (section 9).
- Grid of puzzle-type cards. Each shows icon, name, star count, and a "level N" chip. Types not offered in the child's band are hidden.
- Tapping a type opens its level strip (12 levels per band, then "Endless"). Levels unlock one at a time; any solved level can be replayed.

## 3. Puzzle framework (chunk P3-01)

File `74-teasers.js` holds the hub and framework; each puzzle type lives in its own file `75-bt-<id>.js`. Pre-made banks live in `src/data/d-puz-<id>.js`.

```js
BT.reg({
  id: 'maze', name: 'Mazes', icon: 'maze', bands: 'ABCD',
  levels: band => 12,
  make(band, level, rnd) { return puzzle },      // plain JSON-safe data, includes or implies the solution
  mount(el, puzzle, api) { return {hint(tier), destroy()} },
  solve(puzzle) { return moves },                // used by tests and the smoke bot
});
// api given to mount():
// api.win({mistakes, hints, sec})   api.sfx.*   api.say(text)   api.saveState(obj)   api.loadState()
```

Framework responsibilities (puzzle code must not redo these): top bar with back, timer (hidden in bands A and B), hint button with
tiers and a 10-second cooldown, win screen, stars, game time, saving an unfinished puzzle (`S.bt.cur`), level unlocking, seeded `rnd`
(level N of a type is the same puzzle for the day, different tomorrow: seed = type + band + level + day).

Save shape: `S.bt[type] = {A:{lvl, stars:[...]}, B:{...}, ...}`, `S.bt.cur`, `S.bt.daily = {day, done:[ids]}`, `S.bt.badges`.

**Stars**: 3 = solved with no hints and within the mistake allowance of the type; 2 = at most one hint; 1 = finished.

## 4. Catalog

| # | Type (id) | A | B | C | D | Unique solution needed | Source of puzzles | Chunk |
|---|-----------|---|---|---|---|------------------------|-------------------|-------|
| 1 | Sudoku (`sudoku`) | 4x4 pictures | 4x4 numbers | 6x6 | 9x9 | yes | dev-time bank | P3-02, P3-03 |
| 2 | MathDoku (`mdoku`) | - | 3x3, + only | 4x4, + − × | 5x5 and 6x6, all ops | yes | dev-time bank | P3-04, P3-05 |
| 3 | Logic Grid (`logic`) | - | 3 kids x 1 thing, picture clues | 3x3 | 4x3 | yes | dev-time bank | P3-06, P3-07 |
| 4 | Mazes (`maze`) | 5x5 | 9x9 | 13x13 + stars | 18x18 + keys | path exists (perfect maze) | runtime | P3-08 |
| 5 | Patterns (`pattern`) | next in AB/ABC, odd one out | number + shape sequences, 2x2 analogies | 3x3 matrices, number rules | harder matrices, two-step rules | yes (one fitting choice) | runtime | P3-09 |
| 6 | Number Pyramid (`pyramid`) | - | 3 rows | 4 rows | 5 rows | yes | runtime with check | P3-10 |
| 7 | Balance (`balance`) | 1 unknown, pictures | 2 unknowns | 3 unknowns | simultaneous | yes | runtime, by construction | P3-10 |
| 8 | Make the Number (`target`) | - | 2 tiles | 3 tiles | 4 tiles (24-style) | at least one | runtime with exhaustive check | P3-10 |
| 9 | Tangram (`tangram`) | 2-3 pieces, outlines | 4-5 pieces, outlines | 7 pieces, one placed | 7 pieces | any exact cover | authored solutions | P3-11, P3-12 |
| 10 | Shape Fit (`fit`) | 2-3 pieces | 3-4 | 5-6 | 7-8 with flips | any exact cover | runtime, by construction | P3-12 |
| 11 | Robot Path (`robot`) | arrows, 3-5 steps | arrows, 6-10 steps | turns + repeat | loops with slot limit | any program that works | runtime, by construction | P3-13 |
| 12 | Riddles (`riddle`) | "Who am I?" pictures | simple | wordplay | lateral and math | one keyed answer | authored bank | P3-14 |
| 13 | Memory Match (`memory`) | 3-4 pairs | 6 pairs | 8 pairs, concept pairs | 10 pairs, concept pairs | n/a | runtime | P3-14 |
| 14 | Copy Cat (`copycat`) | 4 pads | 4 pads faster | 6 pads | 6 pads, reverse mode | n/a | runtime | P3-14 |
| 15 | Word Search (`wsearch`) | - | 5x5 across only | 8x8 | 10x10 with backwards | each word once | runtime with check | P3-15 |
| 16 | Unscramble (`scramble`) | - | 3-4 letters | 5-6 | 7-9 | list anagrams accepted | runtime | P3-15 |
| 17 | Cube Count (`cubes`) | - | up to 2x2x2 | 3x3x3 | 4x4x4 | by construction | runtime | P3-16 |
| 18 | Turn It (`rotate`) | shadow match | 2D turn | 2D turn vs mirror | harder shapes | one matching choice | runtime with check | P3-16 |
| 19 | Mirror (`mirror`) | - | left-right | up-down, diagonal | half-turn | by construction | runtime | P3-16 |

## 5. Puzzle specifications

### 5.1 Sudoku

**Rules shown to the child**: each row, column and box has each symbol once.

| Band | Grid | Boxes | Symbols | Givens (easy / medium / hard levels) | Techniques allowed |
|------|------|-------|---------|--------------------------------------|--------------------|
| A | 4x4 | 2x2 | 4 animal icons | 10 / 9 / 8 | last empty cell in a row, column or box only |
| B | 4x4 | 2x2 | 1-4 | 8 / 6 / 5 | naked and hidden singles |
| C | 6x6 | 2 rows x 3 cols | 1-6 | 22 / 18 / 14 | naked and hidden singles |
| D | 9x9 | 3x3 | 1-9 | 42 / 36 / 31 | singles, plus locked candidates and naked pairs on hard |

**Dev-time generator** (`tools/puzzles/sudoku.js`, Opus, P3-02):
1. Fill a full valid grid by randomized backtracking.
2. Remove givens in random order (symmetric pairs for 9x9). After each removal run the counting solver; if the count is not 1, put the given back.
3. Stop at the target number of givens for the level.
4. Grade with a human-style solver that applies techniques in order of difficulty. The grade is the hardest technique needed. Reject the puzzle if its grade exceeds what the band allows, or if the human solver cannot finish (would need guessing).
5. Emit `givens|solution|grade` strings (`.` = empty cell; grade = the human solver's hardest technique, 1-5, see `tools/puzzles/human.js`). Bank: 20 per band and difficulty (240 puzzles, about 20 KB) in `PUZ.sudoku` (`src/data/d-puz-sudoku.js`).

**Runtime variety** (all preserve uniqueness and grade): permute symbols; swap rows within a band of boxes; swap box bands; same for columns; transpose (4x4 and 9x9 only).

**UI**: tap a cell, then tap a symbol on the pad (pad shows how many of each symbol are left). Bands A and B: a wrong symbol wiggles and bounces out (counts as a mistake). Bands C and D: conflicts are tinted, and a "notes" toggle allows pencil marks. Cell size at 600 px wide: 9x9 -> 60 px, never under 36 px on a phone.

**Hints**: 1) highlights a row, column or box with only one gap, or says "look at this box". 2) highlights the cell and names the reason ("only a 3 fits here: 1, 2, 4 are already in the row"). 3) fills that cell.

### 5.2 MathDoku (KenKen-style)

**Rules**: each row and column has 1..N once. Each outlined cage shows a target and an operation; the numbers in the cage make that target.

| Band | N | Operations | Cage sizes | Singleton (given) cages |
|------|---|-----------|------------|--------------------------|
| B | 3 | + | 1-3 | 2-3 |
| C | 4 | +, −, × | 1-3 | 1-2 |
| D | 5, then 6 | +, −, ×, ÷ | 1-4 | 0-1 |

**Dev-time generator** (`tools/puzzles/mdoku.js`, Opus, P3-04):
1. Random Latin square of size N.
2. Partition cells into cages by random growth from seeds (connected, size limits above). `−` and `÷` cages are exactly 2 cells; `÷` only when one value divides the other.
3. Compute targets. Run the counting solver (backtracking with row/column and cage pruning), stopping at 2 solutions.
4. If not unique: split the largest ambiguous cage or turn one of its cells into a singleton, and retry (up to 30 times, then discard).
5. Difficulty score = solver search nodes with propagation only. Sort the bank by score and cut into 12 levels.
6. Format: `N;cells-op-target;...` with cells as indexes. Bank: 36 per band.

**Runtime variety**: the 8 rotations and mirrors of the grid (symbol permutation is not allowed because of the arithmetic).

**UI**: same grid and pad as sudoku (shared code). The cage label sits in the top-left cell of each cage; cage borders are thick. When a cage is full and wrong, its label turns amber.

**Hints**: 1) points to the cage with the fewest possibilities. 2) lists the number sets that can make that target ("6 with × in two cells: 1 and 6, or 2 and 3"). 3) fills one cell.

### 5.3 Logic Grid

Example (band C): "Three friends each have one pet and one favourite colour. Use the clues to match them."

| Band | Size | Clue types | Clues | Solving needs |
|------|------|-----------|-------|---------------|
| B | 3 people x 1 category | positive, negative; shown as pictures with a tick or a cross | 2-3 | direct elimination |
| C | 3 people x 2 categories | + link clues between categories ("the cat's owner likes red"), negative links | 4-5 | elimination only (no case splitting) |
| D | 4 people x 2 categories, one of them ordered (age, house number, finishing place) | + either/or, comparison ("older than"), next-to | 5-8 | elimination plus at most one chain of two inferences |

**Dev-time generator** (`tools/puzzles/logic.js`, Opus, P3-06):
1. Pick a random solution (a permutation per category).
2. Build the pool of every true clue of the types allowed in the band.
3. Add random clues from the pool (weighted toward negatives and links for harder levels) until the solver finds exactly one solution. The solver enumerates all assignments (at most 24 x 24 = 576) and filters by clues.
4. Minimize: try removing each clue; keep it out if the puzzle stays unique.
5. Grade with an elimination-only solver (the rules a child uses on the grid: a tick clears its row and column; a single remaining cell gets a tick; links transfer crosses). Bands B and C must be fully solved by it. Band D may need one extra inference step; reject anything harder.
6. Store abstractly: `{n, cats, sol, clues:[[type, a, b, ...]]}` with indexes only. Bank: 36 per band.

**Runtime**: a theme pack supplies names, category words and sentence templates per clue type (8 themes: pets, sports, snacks, planets, instruments, colours, vehicles, hobbies). Names are shuffled, so one stored puzzle reads as many. Clue text must be reviewed for every template (grammar with `a/an`, plurals).

**UI**: band B: cards. Tap a pet, tap a child, a line connects them. Bands C and D: the classic triangular grid; tap cycles empty -> cross -> tick; placing a tick auto-crosses the rest of its row and column inside that block (can be switched off in band D). Clues listed beside (landscape) or below (portrait); tap a clue to hear it and to strike it through. "Check" button counts wrong marks without showing them unless hints are used.

**Hints**: 1) points at a clue not yet used. 2) explains what that clue lets you mark. 3) places one correct mark.

### 5.4 Mazes

**Generator** (runtime, Sonnet): recursive backtracker on a W x H grid gives a perfect maze (exactly one path between any two cells). Start and goal are the two cells farthest apart (two BFS passes).

| Band | Size | Extras | Check |
|------|------|--------|-------|
| A | 5x5, then 6x6; wide paths, bias toward long straight corridors | none | reach the goal |
| B | 8x8 to 10x10 | none | reach the goal |
| C | 12x12 to 14x14 | collect 3 stars placed at dead ends before the exit opens | all stars then goal |
| D | 16x16 to 18x18 | 1-2 keys and doors; "steps" counter with a par | BFS over (cell, keys held) proves solvable; par = shortest route |

Keys and doors: put a door on the solution path, put its key in a side branch that starts before the door. Verify with the state BFS.

**UI**: drag from the character; the trail follows cell to cell and cannot cross walls; lifting the finger keeps the place; dragging back erases. An on-screen arrow pad is offered in settings for children who struggle with dragging. Drawn on one canvas; walls 4 px; cell at least 28 px.

**Hints**: 1) flashes the direction of the goal. 2) shows the next 5 cells of the route. 3) shows the route to the next junction past the child's position.

### 5.5 Patterns, matrices, odd one out

**Sequences ("What comes next?")**
- Visual items have attributes: shape (6), colour (6), size (3), rotation (8 steps), count (1-5).
- Rule library: cycle of length 2-4 on one attribute; growth (+1 count, +45 or +90 degrees); in band D two attributes change with different cycle lengths.
- Number rules: B: +n or −n. C: ×2, ×3, alternating +a/+b, squares. D: ×a+b, Fibonacci-style, triangular numbers, two interleaved sequences.
- Uniqueness: build 4 choices; run every choice through every rule in the library; exactly one choice may be explained by any rule. Regenerate otherwise.

**Matrices** (C: 3x3 with 1-2 changing attributes; D: 2-3 changing attributes; B: 2x2 "A is to B as C is to ?")
- For each attribute choose a row rule: constant, progression, or each-value-once (a Latin row). The missing cell is bottom-right and is fully determined.
- Six choices: the answer, four that differ from it in exactly one attribute, one that differs in two.
- Check that no distractor also satisfies all row rules and that the same holds reading by columns.

**Odd one out** (A-B): four items, one attribute splits them 3-1. Check that no other attribute also splits 3-1 with a different odd item.

**Hints**: 1) names the attribute to watch ("look at the colours"). 2) states the rule for one row. 3) removes two wrong choices.

### 5.6 Number puzzles

**Number Pyramid**: each brick is the sum of the two below it.
- Generate the bottom row (B: 1-9, C: 1-12, D: 1-20), compute everything, then hide bricks.
- Keep exactly as many givens as the bottom row has bricks. Accept only if (a) the system has full rank (small Gaussian elimination), and (b) for bands B and C a simple propagation finds everything (any triple with two known gives the third). Band D may keep puzzles that fail (b) and marks them "tricky".
- Input: tap a brick, number pad.

**Balance (picture algebra)**: fruits stand for hidden whole numbers.
- A: one unknown, shown on a scale ("apple + apple = 6").
- B: two unknowns, triangular: each new equation adds exactly one new fruit, so it solves step by step. Values 1-10.
- C: three unknowns, triangular, with repeated fruits (3 apples) and a final question that is an expression ("apple + banana × 2 = ?").
- D: not triangular: two equations in two unknowns (sum and difference, or 2a + b and a + b), later three. Check determinant non-zero and whole-number solutions.

**Make the Number**:
- B: target 5-20, choose two of five number tiles and + or −.
- C: three given numbers, + − ×, target up to 50; combine by tapping number, operation, number (the two merge into the result).
- D: four numbers 1-13, all four operations, target 24 or a random 10-100.
- Generator: build a random valid expression to get the target, then run an exhaustive solver (at most a few thousand combinations) restricted to whole, non-negative intermediate results. Difficulty = fewer distinct solutions. Any correct combination wins.

**Magic Square** (C-D, part of the pyramid chunk): the 3x3 square under its 8 symmetries, optionally plus a constant; magic sum shown; hide 4-6 cells so that line-by-line propagation solves it.

### 5.7 Tangram and Shape Fit

**Tangram** (engine by Opus, P3-11)
- Seven pieces: two large triangles, one medium, two small, a square, a parallelogram. Rotation in 45-degree steps; the parallelogram can flip.
- A puzzle is stored as its **solution**: for each piece `[rotation, flip, x, y]`. The silhouette is the union of the placed pieces, so every puzzle is solvable by construction.
- Dev validator: pieces must not overlap (rasterize: sum of piece areas equals union area within 2%) and the silhouette must be one connected shape.
- Winning check (any arrangement counts, not just the stored one): rasterize silhouette and the child's pieces to a 96x96 mask; win when coverage >= 96% and spill <= 4%.
- Touch: drag to move; tap a piece to rotate 45 degrees; a flip button appears for the parallelogram; on drop, snap to the nearest silhouette corner or piece corner within 12 px. Pieces start in a tray, already scaled to fit.
- Bands: A uses 2-3 piece mini silhouettes with the piece outlines drawn inside. B: 4-5 pieces with outlines. C: all 7, outlines hidden, one piece pre-placed. D: all 7, no help.
- Content: 8 puzzles with the engine (P3-11), 24 more in P3-12 (cat, swan, boat, house, rabbit, runner, fish, tree, rocket, candle, bird, fox and so on). Each new one is checked on the screenshot sheet `tools/shots.js tangram`.

**Shape Fit** (Sonnet, P3-12): fill a grid region with polyomino pieces.
- Generator: choose a region (rectangle or a blob of 12-36 cells), grow random connected pieces of 2-5 cells until the region is partitioned. Solvable by construction.
- Bands: A 2-3 pieces in the right orientation; B 3-4 pieces, rotation needed; C 5-6; D 7-8, pieces may need flipping.
- Check: every cell covered once. Any tiling wins.

**Hints (both)**: 1) outlines where one piece goes. 2) rotates that piece correctly. 3) places it.

### 5.8 Robot Path (pre-coding)

Build a program of arrows, press Go, watch the robot run it. If it crashes, the failing step is highlighted and the child edits.

| Band | Grid | Commands | Constraint |
|------|------|----------|------------|
| A | 4x4, no walls | up, down, left, right | 3-5 steps |
| B | 5x5 with walls | same | 6-10 steps |
| C | 6x6 | forward, turn left, turn right, `repeat N [ ]` | slot limit = intended length + 2 |
| D | 8x8 | + `repeat until wall`, one reusable function | tight slot limit, so a loop is required |

Generator: A-B: random self-avoiding walk from start; walls placed off the path; par = BFS shortest length. C-D: generated from loop templates (staircase, square spiral, zig-zag) with random sizes, so the intended program exists and fits the slots; verified by running it in the simulator. Any program that reaches the goal within the slot limit wins. 3 stars = at or under par.

### 5.9 Riddles, Memory Match, Copy Cat

**Riddles**: authored bank, 30 per band, original or traditional (public domain). Format `{band, q, a, d:[...], pic}`. Spoken. Band A: "I am yellow. I am a fruit. Monkeys love me. What am I?" with picture choices. D: lateral thinking and number riddles. A riddle never repeats until the band's set is used up. No scary, rude or culturally narrow riddles.

**Memory Match**: flip two cards. Pair types tie into learning: A picture-picture, upper-lower case; B number-dots, word-picture; C fraction-picture, Spanish-English, synonym pairs; D equivalent fractions, fraction-decimal-percent, root-meaning. Stars by number of flips over the minimum.

**Copy Cat**: watch the pads light in order, repeat. Sequence grows by one each turn. Each pad has a colour, a shape and a tone (never colour alone). Band D adds "backwards" mode. Star thresholds: sequence length 4 / 6 / 8 (scaled by band).

### 5.10 Word Search and Unscramble (stretch)

**Word Search**: words come from the child's grade spelling list (5 to 10 words). Place words in allowed directions (B: left-to-right; C: + down and diagonal; D: + backwards), overlaps allowed when letters agree; fill the rest with letters weighted by English frequency. Post-checks: each target word appears exactly once in any direction; no entry of the bad-word list appears in any line in either direction. Drag to select; found words are struck off and spoken.

**Unscramble**: shuffle the letters of a list word (never left in the original order). If the letters spell another word in the app's lists, accept that too. Hint 2 places the first letter.

### 5.11 Spatial (stretch)

**Cube Count**: an isometric stack defined by a height map (so hidden cubes are always supported and countable). "How many cubes?" Number pad. Own small SVG renderer in `23-viz.js` style; do not use Block Builder internals. Hint 2 shows the stack layer by layer.

**Turn It**: a polyomino target and 4 choices: one is the target rotated; the others are mirrored or have one cell moved. The target must be chiral (its mirror image cannot be rotated to match; test by comparing canonical forms of all 8 symmetries). Band A is "which shadow matches?" with simple shapes.

**Mirror**: half of a picture on a grid; tap cells to complete the reflection across the marked line. B: vertical line, 6x6. C: horizontal or diagonal, 8x8. D: half-turn about the centre.

## 6. Dev-time solver core (chunk P3-02, Opus)

`tools/puzzles/` (Node, never shipped in the app):

| File | Purpose |
|------|---------|
| `csp.js` | Small constraint solver for grid puzzles: cells with candidate sets, all-different groups, custom group constraints, propagation, backtracking, `countSolutions(limit)` |
| `human.js` | Technique-ordered solver for sudoku (last cell, naked single, hidden single, locked candidates, naked pair) that reports the hardest technique used |
| `sudoku.js`, `mdoku.js`, `logic.js` | Generators as specified above |
| `build-banks.js` | Runs the generators with a fixed seed and writes `src/data/d-puz-*.js`. Deterministic: same seed, same file |
| `verify-banks.js` | Re-checks every stored puzzle: exactly one solution, grade within band. Called from `tools/test.js` |
| `rng.js` | Seeded random numbers (`rng(seedString)`) shared by the generators; never `Math.random` in `tools/puzzles/` |

Bank files are generated output but are committed (so a normal build needs no Node step). Regenerate only when a generator changes.

## 7. Difficulty inside a band

Every type has 12 levels per band. A level is a parameter set, not a fixed puzzle.

| Lever | Types | How it ramps over levels 1-12 |
|-------|-------|-------------------------------|
| Size | maze, fit, memory, wsearch, cubes | smallest to largest size of the band |
| Givens | sudoku, pyramid, magic square | most givens to fewest |
| Solver score | mdoku, logic, target | bank sorted by score, 3 puzzles per level |
| Rule count | pattern | 1 attribute -> 2 -> 3 |
| Steps | robot, copycat | shortest to longest |
| Help | tangram | outlines -> one piece placed -> nothing |

After level 12: "Endless" serves random level 9-12 puzzles. If a child fails or quits the same level 3 times, offer the previous band's version without penalty.

## 8. Touch, layout and accessibility rules

- Tap-then-tap is always possible; dragging is never the only way (except mazes, which offer the arrow pad).
- Minimum target 44 px inside dense grids (9x9 on a phone may go to 36 px), 48 px everywhere else.
- Portrait: board on top, controls below. Landscape: board left, controls right. Board is always a square sized to the smaller dimension.
- Undo button on every puzzle with state. Restart asks first.
- Symbols never depend on colour alone (shape or number too).
- Every instruction and clue has a speak button; band A speaks automatically.
- Calm mode and reduced motion turn off win confetti and board shakes.
- Unfinished puzzles are saved and resume exactly.

## 9. Rewards, game time, Puzzle of the Day, badges

| Event | Stars | Game time (tuned in P5-09) |
|-------|-------|----------------------------|
| First solve of a level, band A / B / C / D | 1-3 | 45 s / 60 s / 90 s / 120 s, multiplied by stars/3 (minimum half) |
| Replay of a solved level | none new unless improved | 15 s |
| Puzzle of the Day | 1-3 + 5 coins | +60 s bonus |
| Hints | lower stars only | no change |

Teaser-earned game time is capped at half of the grown-up's daily cap, so puzzles cannot replace all coursework. Three puzzles solved counts as one "round" for daily missions and the streak.

**Puzzle of the Day** (P3-17): one puzzle picked by date from the types the child has unlocked, at the child's level in that type. Same for the whole day. Shown on the hub and as a small card on home.

**Badges** (P3-17): first solve of each type; 10, 25, 50, 100 puzzles; 7 daily puzzles in a row; all 12 levels of a type in a band. Shown in the sticker book as a new page.

## 10. Who builds what

| Part | Model | Why |
|------|-------|-----|
| Solver core, sudoku generator and grader, banks | Opus | Uniqueness and difficulty grading must be right; everything else depends on it |
| MathDoku generator | Opus | Cage partitioning with uniqueness repair |
| Logic grid generator | Opus | Clue pool, minimization, elimination grader |
| Tangram engine | Opus | Geometry with irrational coordinates, snapping, raster win check |
| Hub, framework, all UIs, mazes, patterns, number puzzles, Shape Fit, robot, riddles, memory, Copy Cat, word puzzles, spatial, daily and badges | Sonnet | Constructive generators and UI work with clear specs above |

## 11. Tests (every puzzle chunk)

1. Property test in `tools/test.js`: 1,000 generated puzzles per band (or the full bank): `solve(puzzle)` exists, applying it wins, size limits hold, uniqueness where the catalog says so.
2. Determinism: same seed gives the same puzzle.
3. Smoke bot: opens the type, plays the `solve()` moves through the real UI for one puzzle per band, sees the win screen.
4. Screenshots: one per band at 600x960, plus band D at 380x780 and 1024x600.
5. Performance: `make()` under 50 ms at 6x CPU throttle; no runtime call into dev-time solvers.
