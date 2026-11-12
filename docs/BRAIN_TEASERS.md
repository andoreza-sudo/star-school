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

File `74-teasers.js` holds the hub and framework; each puzzle type lives in its own file `NN-bt-<id>.js` (built into `bt.<VER>.js`, not index.html; CONTRIBUTING 3.3). Pre-made banks live in `src/data/d-puz-<id>.js`.

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
| 11 | Robot Path (`robot`) | arrows, 3-5 steps | arrows, 6-10 steps | turns + repeat | loops with slot limit | any program that works | A-B runtime (BFS); C-D dev-time bank from templates, turned at runtime (5.8) | P3-13 |
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
As built (P3-03): a clash is amber with a dashed ring and a warning mark (never red, never colour alone) and counts one mistake; Erase and
Undo in bands C and D. When a 9x9 square would be under 46 px (a phone in portrait: 36 px at 380x780; a 1024x600 tablet: 45 px), a zoom
box shows the selected square's 3x3 box at 48 px squares beside the pad: a tap on the board picks a square and brings its box into the
zoom box, where a near miss is put right with one 48 px tap (every square has a 48 px target there).

**Hints**: 1) highlights a row, column or box with only one gap, or says "look at this box". 2) highlights the cell and names the reason ("only a 3 fits here: 1, 2, 4 are already in the row"). 3) fills that cell.

### 5.2 MathDoku (KenKen-style)

**Rules**: each row and column has 1..N once. Each outlined cage shows a target and an operation; the numbers in the cage make that target.

| Band | N | Operations | Cage sizes | Singleton (given) cages |
|------|---|-----------|------------|--------------------------|
| B | 3 | + | 1-3 | 2-3 |
| C | 4 | +, −, × | 1-3 | 1-2 |
| D | 5, then 6 | +, −, ×, ÷ | 1-4 | 0-1 |

**Dev-time generator** (`tools/puzzles/mathdoku.js`, P3-04; the bank is `PUZ.mathdoku` in `src/data/d-puz-mathdoku.js`, the type id stays `mdoku`):
1. Random Latin square of size N.
2. Partition cells into cages by random growth from seeds (connected, size limits above). `−` and `÷` cages are exactly 2 cells; `÷` only when one value divides the other. `×` targets are at most 144 (the times tables).
3. Compute targets. Run the counting solver (backtracking with row/column and cage pruning), stopping at 2 solutions.
4. If not unique: repair the largest cage on which two solutions differ: a 2-cell cage first gets another operation; a bigger cage is split into two connected parts (or a cell turned into a singleton) while the band's singleton limit allows, otherwise it gets another operation. Retry up to 30 times, then discard.
5. Grade with a cage-aware human-style solver (techniques: 1 last cell in a line or cage, 2 cage single = only one candidate after listing the cage's number sets, 3 hidden single, 4 cage in a line = a value every number set of a cage puts in one row or column leaves the rest of it, 5 naked pair). Discard a puzzle it cannot finish (it would need guessing), and duplicates under the 8 rotations and mirrors.
6. Difficulty score = solver search nodes with propagation only (csp.js), times 1000, plus the human-style effort (sum of the technique numbers of all steps) to break ties. Sort the bank by score and cut into 12 levels of 3 (band D: the 18 5x5 puzzles are levels 1-6, the 18 6x6 levels 7-12).
7. Format: `PUZ.mathdoku[band] = [36 strings]`, level L = entries 3(L-1) to 3L-1. Each string is `N|cages|solution|grade|score`: cages comma-separated, each = its cells as one base-36 character per cell index (row × N + col, ascending, so the first is the top-left cell where the label goes) + op (`+ - * /`, or `=` for a singleton) + target, e.g. `4|01+3,23*8,...`; solution = N×N digits in reading order; grade = the hardest technique above; score as in step 6. Bank: 36 per band, 108 puzzles, about 10 KB.

**Runtime variety**: the 8 rotations and mirrors of the grid (symbol permutation is not allowed because of the arithmetic).

**UI**: same grid and pad as sudoku (shared code). The cage label sits in the top-left cell of each cage; cage borders are thick. When a cage is full and wrong, its label turns amber.
As built (P3-05, `src/js/79-bt-mdoku.js`, own code modelled on the sudoku screen rather than shared, so sudoku stays untouched): the
grid is drawn as buttons with an svg on top for the lines (thin inside a cage, thick between cages); single-cell cages are givens
printed in ink. Nothing is judged right or wrong while playing: a number already in its row or column is a clash (amber, dashed
ring, warning mark, one mistake), and a full cage that misses its number turns its label amber with a warning mark while the line
says why ("2 + 3 = 5, but this cage needs 6. Change a number.", one mistake). Erase and Undo in every band, Notes in C and D.
Variety: one of the level's three bank puzzles and one of the 8 rotations and mirrors, from the seeded rnd. Squares stay at least
48 px at 380x780 for 6x6 (56 px), so no zoom box is needed.

**Hints**: 1) points to the cage with the fewest possibilities. 2) lists the number sets that can make that target ("6 with × in two cells: 1 and 6, or 2 and 3"). 3) fills one cell.
As built: the steps follow the bank grader: a wrong number first, then a cage with one gap its arithmetic fixes, a row or column
with one gap, a cage single (the cage with the fewest ways to make it first: "Only 1 and 4 make 3− in two squares. 4 is already
in this square's row or column, so it is 1."), a hidden single, then a cage in a line or a naked pair until a single shows.

### 5.3 Logic Grid

Example (band C): "Three friends each have one pet and one favourite colour. Use the clues to match them."

| Band | Size | Clue types | Clues | Solving needs |
|------|------|-----------|-------|---------------|
| B | 3 people x 1 category | positive, negative; shown as pictures with a tick or a cross | 2-3 | direct elimination |
| C | 3 people x 2 categories | + link clues between categories ("the cat's owner likes red"), negative links | 4-5 | elimination only (no case splitting) |
| D | 4 people x 2 categories, one of them ordered (age, house number, finishing place) | + either/or, comparison ("older than"), next-to | 5-8 | elimination plus at most one chain of two inferences |

**Dev-time generator** (`tools/puzzles/logic.js`, P3-06; the bank is `PUZ.logic` in `src/data/d-puz-logic.js`):
1. Pick the categories, items and names, then a random solution (a permutation per category). Vocabulary (`CATS`, `NAMES` in logic.js): 34 short first names (different first letters inside a puzzle; band B at most 4 letters); unordered categories pet, snack, sport, hobby, music (instruments), ride (vehicles), colour; ordered categories (band D) age 6-9, house number 1-4, race place first-fourth. Band B uses the six picture categories (every item has an allow-listed emoji and is a `picFor` name); band C two unordered categories, never sport with music (both "plays"); band D one unordered category with at least 4 items plus one ordered category.
2. Build the pool of every true clue of the types allowed in the band whose sentence fits the band's word limit (B 6, C 11, D 14 words). B: child is / is not item. C: the same plus links between the two categories ("The cat's owner likes red.", "The child who reads does not eat the apple."). D: plus "or" ("Mia is 7 or 9.", "The cat's owner is Mia or Leo."), comparison ("Mia is older than the cat's owner.", `gt` / `lt`) and one apart ("Mia and Leo are one year apart.", "lives next door to", "finished one place apart", `nx`) between two different children named by name or by their unordered item.
3. Add random clues from the pool (weights per band and tier: the easy, medium and hard thirds of a band's slots lean more and more on negatives, links and comparisons) until exactly one assignment fits; a clue that rules nothing more out is skipped. The counter enumerates all assignments (at most 24 x 24 = 576) and filters by clues.
4. Minimize: try removing each clue; keep it out if the puzzle stays unique. No stored clue is redundant (the test proves it).
5. Grade with a human-style solver on the grid (a tick always crosses the rest of its row and column in its block, as the UI does). Techniques, easiest first; the grade is the hardest one needed: 1 clue mark (an is / is not clue), 2 only place left (a row or column of a block with one open cell), 3 link (through a tick, copy ticks and crosses to the third block), 4 two-way clue (an or, comparison or one-apart clue crosses what it rules out with the marks so far, and its two children are different), 5 chain (tick an open cell, apply 1-4 for at most 2 steps, reach a contradiction, so cross it). Band B allows grade 2, band C grade 3 (elimination only, no chain), band D grade 5 with at most one chain; band D's hard third must use its chain. Also kept only with the band's clue count, a link clue in band C, a comparison or one-apart clue in band D, and no duplicate (same clues with the children renamed and items handed round, same items).
6. Difficulty score = grade x 100 + effort (the sum of the technique numbers of all steps). Each band is sorted by score, so level L is entries 3(L-1) to 3L-1.
7. Format: `PUZ.logic = {cats, B, C, D}`; each band holds 36 puzzles, each an array `[head, clue, clue, ...]`. `head = 'names|cat=item,item,...[;cat=...]|solution|grade|score'`, e.g. `'Ella,Ben,Tom|hobby=paint,draw,puzzle|201|2|204'`; solution = per category (joined by `;`) the item index of each child in name order. An entity is `(category, item)`: category 0 = the children (item = name index), 1.. = the categories in head order. Clues keep the structure and the sentence (last; the first entity is its subject): `['is', c1, i1, c2, i2, text]`, `['not', ...]`, `['or', c, i, d, j1, j2, text]`, `['gt' | 'lt' | 'nx', c1, i1, c2, i2, text]` (comparisons on the ordered category's item index; for race places a smaller index finished ahead). `cats[id] = {label, ordered, pics: {item: emoji}}` gives the grid labels and the emoji fallback for `picFor(item, emoji)`, so band B can draw each clue as child + picture + tick or cross. Bank: 36 per band, 108 puzzles, about 43 KB.

**Runtime**: the bank stores finished words and sentences (reviewed once, here, rather than templates per theme), so the UI needs no grammar. Names can still be shuffled at runtime: a name appears in a sentence only as itself (`Mia`, never a possessive), so replacing every name of a puzzle by another set with different first letters keeps it correct. Planets were left out of the themes (no distinct pictures, harder words).

**UI**: band B: cards. Tap a pet, tap a child, a line connects them. Bands C and D: the classic triangular grid; tap cycles empty -> cross -> tick; placing a tick auto-crosses the rest of its row and column inside that block (can be switched off in band D). Clues listed beside (landscape) or below (portrait); tap a clue to hear it and to strike it through. "Check" button counts wrong marks without showing them unless hints are used.
As built (P3-07, `src/js/80-bt-logic.js`): every band uses the grid (band B: one 3x3 block with big picture heads), because band B's
clues are drawn as child + picture + tick or cross, which are exactly the grid's marks, and the hints place marks; there are no
cards with lines. A tap cycles blank -> cross -> tick -> blank; taking a tick away takes its auto-crosses. Each clue card is struck
through by a tap and read by its own speak button. A mark that breaks a rule the child can see (two ticks in a line, a line all
crossed, a clue, the marks through a tick) turns amber with a dashed ring and a line in words at once (a cross on its way to a tick is
judged after a short pause) and is not a mistake; Check counts each wrong mark once and shows them only after a hint. The children's
names are swapped at runtime (seeded, different first letters). When a two-category grid's squares would be under 44 px the grid
shows the children's two blocks side by side with the third on a tab, or (band D on a phone) one block per tab.

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

**UI**: drag from the character; the trail follows cell to cell and cannot cross walls; lifting the finger keeps the place; dragging back erases. An on-screen arrow pad is offered in settings for children who struggle with dragging. Drawn on one canvas; walls 4 px; cell at least 28 px (R-01b: on a phone the maze side is capped by the screen to keep that, `MZ.cap`: 11 x 11 at 380 x 780).

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
- As built (P3-11, `src/js/80-bt-tangram.js`, bank `src/data/d-puz-tangram.js`): the format, units and exact numbers are documented at the top of the bank file (a placement is `[k, f, x, y]`, x and y a number or a pair `[a, b]` = a + b·√2/2, pieces in the order L L M S S Q P). P3-11 ships house, rocket, sailboat, fish, cat, rabbit, turtle, swan (in order of difficulty: level L uses entry L-1); P3-12 adds entries at the end of the bank in order of difficulty and needs no code change (with 12 or more entries each level gets its own slice). Win check: polygon clipping, not a raster (an exact cover within 0.02 unit² per piece; any arrangement counts). Snap tolerance 0.45 unit (16-30 px). Bands: A 2-3 big pieces to place, the rest built, outlines; B 4-5 pieces, outlines; C all but one (a big triangle on levels 1-6); D all seven. Hints: 1 slot glows and its piece is picked, 2 the piece turns the right way, 3 it goes in. `tools/test.js` "tangrams P3-11" proves every entry exactly (no overlap, edge-connected, areas, outline).

**Shape Fit** (Sonnet, P3-12): fill a grid region with polyomino pieces.
- Generator: choose a region (rectangle or a blob of 12-36 cells), grow random connected pieces of 2-5 cells until the region is partitioned. Solvable by construction.
- Bands: A 2-3 pieces in the right orientation; B 3-4 pieces, rotation needed; C 5-6; D 7-8, pieces may need flipping.
- Check: every cell covered once. Any tiling wins.
- As built (P3-12, `src/js/84-bt-shapefit.js`, object `SF`, id `fit`, name "Shape Fit"; look in `src/css/49-bt-shapefit.css`, reusing the
  tangram's screen and piece look): made at run time by construction (a rectangle on odd levels when the size allows one at most 7
  wide, else a blob without holes; then cut into connected pieces whose leftover squares stay connected); the region grows with the level
  (section 7 size lever). A: 2 pieces (levels 1-6) then 3, 2-4 squares each, 4-11 squares, pieces lie the right way (no Turn), outlines
  drawn. B: 3 then 4 pieces, 3-4 squares, 9-16 squares, pieces come turned, outlines on levels 1-4. C: 5 then 6 pieces, 3-5 squares,
  16-28 squares. D: 7 then 8 pieces, 3-5 squares, 24-36 squares, about half start mirrored (Flip button). Drag, tap twice to turn,
  tap-then-tap, Undo, keys R F U; a drop snaps to the nearest whole square where the piece fits. Solved: every square of the region
  covered once (any tiling). Hints as for tangrams (slot glows, piece turns, piece goes in). No mistakes are counted.
- Tangram pack (P3-12): 32 puzzles in `src/data/d-puz-tangram.js` (the 8 of P3-11 and 24 more), ordered by a difficulty score written
  in the bank's header (outline length, outline corners, pieces turned against the rest, pairs meeting only at a corner); with 12+
  entries each level plays its own slice of 2-3 puzzles. `tools/test.js` "tangram pack and Shape Fit P3-12" checks the order and that no
  two silhouettes are alike; "tangrams P3-11" still proves every entry exactly.

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

As built (P3-13, `src/js/81-bt-robot.js`, `src/css/49-bt-robot.css`, `tools/puzzles/robot.js`, bank `src/data/d-puz-robot.js`):
- Bands: A 4x4 no walls, arrows (icons only, a tapped block says its name), shortest route 3/4/5 (levels 1-4/5-8/9-12), a gem
  to pick up from level 7, slots par + 2. B 5x5 with walls, arrows with words, route 6-10, a gem from level 7 and two from level 10,
  slots par + 3. C 6x6: forward, turn left, turn right, repeat N (2-9), loops nest two deep, slots par + 2. D 8x8, slots par + 1:
  levels 1-9 add "repeat until wall" (its body runs while the cell ahead is open, at most 40 times), levels 10-12 add one function
  (a second strip of up to 4 forward and turn blocks, called by a Function block). One new block at a time on purpose: with
  "repeat until wall" a robot can follow almost any corridor in 6-8 blocks by spinning tricks, so a function would never be needed.
- A and B are made at run time: A picks a start and a goal (and a gem) at the level's distance; B walks a random path that never
  touches itself, walls the rest, then opens walls in random order while a BFS over (cell, gems held) keeps the route as long as the
  walk. par = that BFS.
- C and D worlds are corridors (only the cells of one path are open) from templates: line, turn, ring, stairs, stairs + run and
  rectangle (C); ring and spiral with "until wall", irregular stairs, and two staircases with a straight bit for the function (D).
  par must be the fewest blocks of any program, loops included, which needs a search far too heavy for a tablet, so they come from a
  dev-time bank (decision A8): `tools/puzzles/robot.js` keeps a world only when its exact shortest-program search (effects of every
  piece of program by cost, then a cheapest path over top-level pieces) proves the template's intended program is a shortest one,
  no program of plain blocks fits the slots, and on a function level every program without the function is longer. The bank holds
  36 worlds a band, 3 per level in level order; the app picks one of the level's three and one of the 8 turns and mirrors (a mirror
  swaps turn left and turn right in the program). `tools/test.js` proves every bank par again with its own search.
- Mistakes: a failed run (a bump, stopping short of the flag, on the flag without every gem, a loop going round more than 40 times);
  the type allows 3. A winning program longer than par is reported as allow + 1 mistakes, so it earns 2 stars at most.
- Editing: tap a palette block to put it in at the cursor (a loop comes with its end bracket and the cursor goes inside; Repeat asks
  how many times); tap a placed block to take it away (a loop's head keeps its blocks; Repeat's head opens the number picker with Take
  it away); tap a loop's end bracket or an empty slot to move the cursor after it; Undo. No dragging.
- Running: the whole run is worked out first, then shown step by step (170-380 ms a step; reduced motion: short steps without
  gliding): the block running is lifted with a purple ring and the robot glides; a bump: the robot wobbles, an amber star marks the
  wall, the block that bumped turns amber with a dashed ring and a warning mark, never red.
- Hints: A, B: the first arrow that bumps or does not bring the robot one step nearer the flag (BFS); C, D: the first block that
  differs from the bank's intended program (a repeat count the child chose is kept when the program still wins with it). 1) that
  block, or the empty place, glows star yellow and the line says why; 2) the right block shows faintly there; 3) it is put in.

### 5.9 Riddles, Memory Match, Copy Cat

**Riddles**: authored bank, 30 per band, original or traditional (public domain). Format `{band, q, a, d:[...], pic}`. Spoken. Band A: "I am yellow. I am a fruit. Monkeys love me. What am I?" with picture choices. D: lateral thinking and number riddles. A riddle never repeats until the band's set is used up. No scary, rude or culturally narrow riddles.

**Memory Match**: flip two cards. Pair types tie into learning: A picture-picture, upper-lower case; B number-dots, word-picture; C fraction-picture, Spanish-English, synonym pairs; D equivalent fractions, fraction-decimal-percent, root-meaning. Stars by number of flips over the minimum.

**Copy Cat**: watch the pads light in order, repeat. Sequence grows by one each turn. Each pad has a colour, a shape and a tone (never colour alone). Band D adds "backwards" mode. Star thresholds: sequence length 4 / 6 / 8 (scaled by band).

As built (P3-14, `src/js/81-bt-riddle.js`, `82-bt-memory.js`, `83-bt-copycat.js`; data `src/data/d-riddles.js` and `d-memory.js`):
- Riddles (`riddle`): 36 per band, easiest first (format `{q, a, d: [...], h: [nudge, strong clue]}`; bands A and B name pictures,
  `RIDDLES.pics` gives the emoji fallback for `picFor`). Level L plays riddles 3(L-1) to 3L-1, so the band's set is used up before a
  riddle repeats; the seeded rnd shuffles the choices. A: 3 picture choices, read aloud by itself; B: 4 choices, picture and word;
  C: wordplay, 4 words; D: lateral and number riddles, 4 choices. Hints per riddle: nudge, strong clue, then all wrong choices but one go.
  A wrong choice turns amber and counts one mistake (`allow` 1). The test checks the answer (also as a number word) is in neither the
  riddle nor its hints, choices differ, reading length per band (words per sentence grows A to D), BAD, pictures allow-listed.
- Memory Match (`memory`): A 3 pairs (levels 1-6), 4 (7-12); B 6; C 8; D 10. Kinds by level tier (1-4 / 5-8 / 9-12): A same picture,
  same picture, big and small letter; B number and dots (1-6), word and picture, number and dots (4-10); C fraction and circle,
  Spanish and English (SPN), synonyms; D equal fractions, fraction / decimal / percent, word root and meaning. Values in a puzzle are all
  different, so each card has exactly one partner. Face-down cards hold no face in the page. A "slip" is a miss when the partner of
  the first card, or the second card, had been seen; the win reports the slips over the band's free ones (A 0, B 1, C 2, D 3), `allow` 1.
  Hints: peek one card, show one pair, match one pair.
- Copy Cat (`copycat`): A 4 pads from length 1 to 3 / 4 / 4; B 4 pads from 2 to 4 / 5 / 5, faster; C 6 pads from 2 to 5 / 5 / 6;
  D 6 pads from 3 to 6 forward, then 4 and 5 backwards (levels 5-12). (R-01b: was 3/4/5, 4/5/6, 5/6/7, 7 then 5/6; now the typical
  span for the age plus about one.) The "4 / 6 / 8" star thresholds became these target lengths
  (the frame's stars count hints and mistakes). A wrong pad: amber ring, "Oops! Watch again.", the round shown again a little slower
  (one mistake, `allow` 2). Hints: the round again slower, the next pad ringed, the next pad tapped for the child.

### 5.10 Word Search and Unscramble (stretch)

**Word Search**: words come from the child's grade spelling list (5 to 10 words). Place words in allowed directions (B: left-to-right; C: + down and diagonal; D: + backwards), overlaps allowed when letters agree; fill the rest with letters weighted by English frequency. Post-checks: each target word appears exactly once in any direction; no entry of the bad-word list appears in any line in either direction. Drag to select; found words are struck off and spoken.

**Unscramble**: shuffle the letters of a list word (never left in the original order). If the letters spell another word in the app's lists, accept that too. Hint 2 places the first letter.

As built (P3-15, `src/js/87-bt-wsearch.js` object `WS`, `88-bt-scramble.js` object `US`; data `src/data/d-words-bt.js` `BTW`):
- Word Search (`wsearch`, bands BCD, `allow` 3): B spelling levels 1-3, 5 x 5 with 5 words across (levels 1-4), across and down
  (5-8), 6 x 6 with 6 words (9-12); C levels 4-5, 7 x 7 with 6 words across, down, down slant (1-4), 8 x 8 + the up slant with 7 / 8
  words; D levels 5-7, every direction including backwards, 9 x 9 with 8 words, 10 x 10 with 9 / 10. Two words share at most the one
  letter where they cross. Words holding a rude run (either way), palindromes, and words that hold another listed word or its reverse
  are not put in one grid. Drag (snaps to 8 directions) or tap the first and then the last letter, either end first. Found: a soft
  coloured band under the letters, the list entry struck through with a tick, the word spoken. Hints per word: ring the first letter,
  shade its row / column / slanted line, find it. On a 380 px phone a 10 x 10 grid has 36 px squares (as section 8 allows 9 x 9).
- Unscramble (`scramble`, bands BCD, `allow` 2): B a picture (picture words with a drawing), 3 words of 3 letters / 3 of 4 / 4 of 4;
  C a sentence with a gap (spelling levels 4-5), 3 of 5 / 4 of 5-6 / 4 of 6; D the same (levels 6-7), 3 of 7 / 4 of 7-8 / 4 of 8-9.
  Change from the text above: instead of accepting a second word with the same letters, only words whose letters spell no other real
  word (the app's lists and `BTW.more`) are used, so every scramble has exactly one answer. A full row is checked; wrong letters go
  back, right ones stay. Hints per word: first and last letters named, the first letter placed (as above), then the next letter.

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
| `sudoku.js` | Sudoku generator as specified above |
| `logic.js` | Logic grid generator (5.3), its human-style grid grader `grade(p)` (clue mark, only place left, link, two-way clue, chain), `render(p, clue)` for the sentences, and the vocabulary (`CATS`, `NAMES`). Writes `src/data/d-puz-logic.js`: `PUZ.logic[band]` = 36 puzzles `[head, clue, ...]`, head `names\|cat=items\|solution\|grade\|score`, clue `[kind, ...indexes, sentence]`, sorted by score; `PUZ.logic.cats` = labels and picture emoji |
| `mathdoku.js` | MathDoku generator (5.2), its cage-aware human-style grader `grade(N, cages)` and `score()`. Writes `src/data/d-puz-mathdoku.js`: `PUZ.mathdoku[band]` = 36 strings `N\|cages\|solution\|grade\|score`, sorted by score; a cage is base-36 cell characters + op (`+ - * / =`) + target, e.g. `01+3` |
| `robot.js` | Robot Path worlds for bands C and D (5.8, P3-13): templates, corridor layout, the exact shortest-program search `search(world, {K, until, fn})` and the bank builder. Writes `src/data/d-puz-robot.js`: `PUZ.robot[band]` = 36 strings `n\|cells\|start\|facing\|goal\|par\|kit\|main\|fn\|template`, 3 per level in level order |
| `build-banks.js` | Runs the generators with a fixed seed and writes `src/data/d-puz-*.js`. Deterministic: same seed, same file |
| `verify-banks.js` | Re-checks every stored puzzle: exactly one solution (its own counters `countSimple`, `countCages` and `countLogic`, not csp.js or the generators), grade within band; for logic grids also every clue true and none redundant, sentence = `render()`. Called from `tools/test.js` |
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
| First solve of a level, band A / B / C / D | 1-3 | 45 s / 60 s / 90 s / 120 s, multiplied by stars/3 (minimum half), the stars counted without hints (R-01b) |
| Replay of a solved level | none new unless improved | 15 s |
| Puzzle of the Day | 1-3 + 5 coins | +60 s bonus |
| Hints | lower stars only | no change (R-01b: until v143 two hints halved it) |

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
