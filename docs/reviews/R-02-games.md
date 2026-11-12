# R-02 Game replay review

Chunk R-02, written 2026-11-11 by Claude, on the merged state v132 (commit be9e428). No app changes.

What this review asks: for every game and game-like part of Star School, what makes a child want to come back again and
again in a healthy way, what makes them stop, and what to change first. Block Builder gets the most room, because the
owner says it is "really hard to use" and G-01 will fix it.

Two chunks are being built at the same time and are not in this commit: game-time rules v2 (P5-09) and motion and sound
polish (P4-17). This review describes the rules as they are today and marks the places where those chunks may change them.

---

## 1. Summary for parents

**The good news.** The Game Room is built on a healthy idea: game time is earned by learning, there is a daily limit
(30 minutes by default), every game ends with a clear "well done" card, the clock stops when the game is paused, and
nothing nags a child to come back. There are no ads, no real-money shop, no lives that run out, no random prize boxes to
buy. The new Game Room screen looks lovely and inviting.

**What works best.**
- **Hill Climb** is the strongest game. Driving, flips and collecting bolts are fun straight away; there is a lot to
  unlock (7 places, 6 vehicles, upgrades, paint, 56 levels with stars), and every run ends with a clear result and a
  "drive again" button. Children will come back to beat their own record.
- **Coloring** has a lot of variety (mandalas, stained glass, geometric animals, neon drawing, number pictures, pixel art)
  and some nice learning modes (colour by maths facts, colour by Spanish words).
- **Missions, stickers, the Pet Shop and the boss fights** give children goals for today, this week and the long run.

**What needs fixing.**
- **Block Builder is genuinely hard to use on a phone or small tablet.** The blocks are drawn very small (on a phone a
  block is about the size of a fingernail, and in the copy-the-blueprint puzzles even smaller), the buttons are small,
  there is no simple way to move the view with one finger, tapping a TNT block to build on it blows up the nearby
  blocks, and in the bigger blueprint puzzles a child who does everything right can be told "Oops! That spot needs
  Brick" again and again and lose stars for it. Section 3 lists every point where a child gets stuck.
- **One way of earning game time is too easy to repeat.** Speed Race gives 1 minute of game time for every 60-second race
  with 5 or more right answers, with no daily limit. An older child can race over and over for game time.
- **A few things lean on gentle pressure.** The pet gets hungry and bored while the app is closed ("Sparky is hungry!"
  after a day away), stickers are drawn at random so the last few take a very long time to collect, and the boss teases
  "Ha ha! Missed me!" after a wrong answer. None of this is serious, but each is easy to make kinder.
- **Long-term goals run out.** Everything in the Pet Shop costs 595 coins in all, which a child earns in about 40 rounds.
  After that, coins only buy pet snacks.

**What I recommend first** (the full list is in section 2): fix Block Builder's touch controls and blueprints (G-01),
close the Speed Race game-time loop, make the pet and stickers kinder, and give coins a longer life.

---

## 2. Prioritised improvements

Sizes: S = up to half a day of work, M = about a day, L = several days. "Must" = fix before adding new games; "should" =
soon, makes children come back for the right reasons; "could" = nice to have.

### Must

| # | Problem | Change | Where | Size |
|---|---------|--------|-------|------|
| M1 | Block Builder blocks are tiny tap targets: a block's top is 36 x 18 px on a 380 px phone and 43 x 22 px on a 1024 x 600 tablet; a side face is 18 px wide; blueprint puzzles open zoomed out, where a whole block is 21 x 21 px (phone) | Open close up (block tops at least 48 px wide), let one finger move the view, keep the island centred, and place on top of the tapped column by default (side placement as an option) | Block Builder, `src/js/60-blocks.js` (`layout`, `blockBuilder`, pointer handlers) - G-01 | M |
| M2 | Blueprint puzzles count a "wrong block" when the tap lands on a different see-through block than the child meant. In "Little House" 6 of the 15 blocks a child can build next are hidden behind floating roof blocks; tapping them with the right block chosen gave "Oops! That spot needs Brick" 38 times in a row and the stars drop | Show only the next layer of the blueprint, never count a miss for a block the child could not reach, test the tap against the see-through block under the finger first, and keep the progress chip in sync with Undo | `act`, `ghost`, `hit`, `bbProg`, `#bbundo` in `60-blocks.js` - G-01 | M |
| M3 | Tapping a TNT block with the Block tool lights it and blows up 20-30 blocks (seen: 23 at 380, 29 at 1024). TNT is the first block in the list, so a young child picks it often | Build tool places on top of TNT; lighting is a separate, clearly named action (a "Boom" button or a long press with a countdown); move TNT to the end of the list | `pointerdown`/`up`, `BBPAL` in `60-blocks.js` - G-01 | S |
| M4 | Block Builder tools are 33-50 px emoji buttons with 10 px labels sitting on top of the scene in two rows; the palette shows 5 of 26 blocks on a phone, with no names; undo has no label and does not update the blueprint progress | Move tools off the scene into one labelled bar of 48 px+ drawn icons (Build, Break, Undo, Turn, Zoom in/out); show block names; group blocks (Nature, Building, Special) | `blockBuilder` view and `40-games.css` `.bb*` rules - G-01 | M |
| M5 | Speed Race pays +1 minute of game time for every race with 5+ right, no daily limit, so it can be repeated for game time (a 60 s race buys 60 s of play) | Pay once per category per day plus a new record, like Fact Sprint; or fold Speed Race's maths into Fact Sprint as the P5-01 note suggests | `src/js/54-race.js` line 36 - P5-09 | S |

### Should

| # | Problem | Change | Where | Size |
|---|---------|--------|-------|------|
| S1 | Pet meters drop while the app is closed (food -4 % an hour, fun -5 %), so after a day away the pet is "hungry" and wants to play: a gentle "come back or your pet suffers" pull | Stop the drop at a floor (for example 50 %) or pause it while the app is closed; greet a returning child with a happy pet | `careTick()` in `src/js/56-petcare.js` | S |
| S2 | Stickers are drawn at random from 48 with repeats (the test save already has x2 and x3 doubles with 6 of 48 collected); finishing the book takes about 200 draws | Give a new sticker until the book is full (or one in two new), and let doubles be swapped for a chosen sticker | `award()` in `src/js/50-round.js` | S |
| S3 | Coins run out of meaning: the whole Pet Shop costs 595 coins (hats 165, toys 210, places 220), about 40 rounds | Add a fixed, visible catalogue in stages (more places, pet room decorations, Block Builder or Hill Climb cosmetics bought with coins), unlocked by stars as well as coins so it stays tied to learning | `SHOP` in `42-paths.js`, `48-shop.js` | M |
| S4 | Hill Climb flips young drivers a lot (holding the gas: 5 crashes in about 35 s), the distance chip is cut to "13..." on a phone and the fuel gauge is a thin line | An "easy driving" helper on by default for Pre-K to 1st (auto-level in the air, softer gas on steep slopes), a wider fuel bar, room for the distance | `hcStep`, `hcStart`, `48-game-hub.css` `.gh-hud` | M |
| S5 | Coloring pieces are small on a phone: in a mandala the smallest pieces are 4 px and half are under 15 px at 380 px; animal pictures have 837 facets (median 17 px). A mandala has no "finished" moment | A "big pieces" set for young children, open zoomed in on phones, and a Done button that shows the picture on the shared end card and saves it to a gallery | `70-art.js` `artPage`, `mandala` | M |
| S6 | Block Builder's free build has no goals; the blueprints (the part with goals) are below the fold in an old-looking menu, and the first blueprints jump from 3 blocks to a 30-block house | Put blueprints first with a picture of each, more small steps between 3 and 30 blocks, and small free-build goals ("build a house for your pet", "a tower 8 high") | `bbMenu`, `BBCH` - G-01 | M |
| S7 | The boss taunts after a wrong answer ("Ha ha! Missed me!", "Hee hee!") | Keep the boss silly but never mocking: "Whoa, close one!", "Try again, I'm getting dizzy!" | `50-round.js` line 113 | S |
| S8 | The Game Room's "How to earn more game time" list leaves out the main way (finishing a learning round, up to 3 minutes) and Brain Teasers | Add "Finish a learning round" first and a Brain Teasers line; keep it in sync with P5-09 | `GH.hub` earn list in `59-game-hub.js` | S |

### Could

| # | Problem | Change | Where | Size |
|---|---------|--------|-------|------|
| C1 | Block Builder, the Hill Climb garage, the Coloring menus and the colour-mode chooser still use the old look and emoji (as P4-16 noted) | Move their bodies onto components and drawn icons | games pass of P4-18 / G-01 | M |
| C2 | Block Builder's textures (grass block with dirt sides, a red TNT block with "TNT" on it, pickaxe icon) look a lot like one famous block game; the hub card already shows a softer, original block style | Redraw the blocks in the hub card's object-art style (smooth shading, light from the top left); also easier to read at small sizes | `bbTex` in `60-blocks.js` - G-01 or later | M |
| C3 | Wrong taps flash red in number pictures and the Block Builder palette hint ring is red (the design system says amber "try again") | Use `--try` amber | `72-shapes.js`, `66-colornum.js`, `40-games.css` `.bbk.hint` | S |
| C4 | The Block Builder and Coloring hub cards show no progress | Show "3 of 10 blueprints" / "5 pictures finished" like Hill Climb's best distance | `GH.reg` `sub` in `59-game-hub.js` | S |
| C5 | There is no place to show a grown-up what you made (UNICEF: sharing is how children make solo play social) | A "My gallery" of finished pictures, builds (a snapshot) and best drives, with a "Show a grown-up" full-screen view | new, small | M |
| C6 | The Speed Race name will clash with the new racing game | Rename it "Fact Race" (or merge into Fact Sprint) before G-02 ships | `54-race.js`, Home tile | S |
| C7 | Toasts sit over the top bar, covering Pause and the blueprint progress chip while they show | Show game toasts under the bar | `14-ui.js` toast position on game screens | S |

---

## 3. Block Builder: every point where a child gets stuck (for G-01)

How I played it: real touch (Playwright with touch input, taps, presses, drags and two-finger pinches sent as touch
events) on the midway test save, at 380 x 780 (phone), 1024 x 600 and 1024 x 552 (a 7-inch tablet with the browser bar),
screenshots at 2x. Screenshot names are in brackets; they are in the session scratchpad (`r02/`), not in the repo, and can
be made again with the steps in section 9.

### 3.1 Placing blocks

1. **The blocks are too small to hit.** Free build opens at zoom 1.7: a block's top is 36 x 18 px on a phone and 43 x 22 px
   on a 1024 x 600 tablet; a side face is 18 x 27 px (phone). A child's fingertip covers about 40 px, so it covers two or three
   blocks at once. [bb-free-start-380, bb-free-start-1024]
2. **Blueprints are even smaller.** Blueprint puzzles open at zoom 1 (the zoom boost is only for free build): a whole
   see-through block is 21 x 21 px on a phone and 27 x 27 px on a tablet, and the flat world fills a band in the middle of
   the screen. [bb-bp0-miss-380, bb-bp6-start-380]
3. **Building beside a block needs a side face.** A tap on a top face puts the block on top; a tap on a side face puts it
   next to it. The side faces are the smallest targets, and a 5-year-old does not know which face they touched. Most
   children's builders place on top of the column you tap; sideways placement could be an option.
4. **A tap on the sky does nothing but a "wrong" sound,** with no message. A tap on an animal turns the animal round instead
   of placing (the animals wander over the island, so they get in the way).
5. **Tapping TNT to build on it blows it up.** With the Block tool, a tap on a TNT block lights it; it explodes 1.6 s later and
   removed 23 blocks (phone) and 29 (tablet) around it. Undo brings them back, but only if the child knows to press the
   unlabelled arrow. [bb-free-tnt-lit-380, bb-free-tnt-boom-380]
6. **What works:** press and slide shows a magnifier bubble with a cross and the white outline of where the block will go;
   lifting the finger places it. This is a good idea to keep. [bb-free-hold-loupe-380] The outline is white and thin, though,
   and hard to see against the sky, water and glass.
7. **Stamps disappear into the scene.** A Tree stamp placed in the middle of the island blends into the existing trees; there
   is no highlight on what was just added. [bb-free-stamped-380]

### 3.2 Blueprint puzzles (copy the see-through build)

8. **The child's tap reaches a different see-through block.** In "Little House" the roof blocks that hang over the edge, and
   the one over the hollow middle, can be built straight away, so they float in the air in front of the wall blocks. 6 of the
   15 blocks that can be built next are covered by another see-through block at the middle of their top. When I chose the
   block that the see-through block showed and tapped it, the app answered "Oops! That spot needs Brick" 38 times in a row,
   the counter went to "2/30 · 38 wrong", and the stars would drop to 1. [bb-bp6-mid-380, bb-bp6-mid-1024]
9. **All layers show at once.** The whole 30-block house is drawn as overlapping see-through blocks; the layer that cannot be
   built yet is very faint (14 % opacity) but still there. A child cannot tell which block is next.
10. **A wrong colour costs stars, a wrong spot does not.** Tapping a see-through block with another block chosen counts a
    mistake ("Oops! That spot needs Brick" and the palette button flashes red); stars are 3 for at most one mistake. With M2's
    targeting fault this punishes children for the app's own mistake.
11. **"Build on the see-through blocks!"** appears for any tap next to them, with a ghost emoji, and covers the top bar
    (Pause and the progress chip) while it shows. [bb-bp0-miss-380]
12. **The jump in difficulty.** Blueprint 1 is 3 stone blocks (good, it finished in 3 taps) [bb-bp0-win-380]; blueprint 7 is a
    30-block house with three kinds of block. There are 10 blueprints in all, then nothing new.

### 3.3 Choosing blocks

13. **Only 5 of 26 blocks show on a phone,** in a row you scroll sideways, with no names in free build (names show only in
    blueprints, in 9 px type). Grass, leaves and cactus look alike at 44 px; glass is white on a white button.
    [bb-free-start-380, bb-free-palette-end-380]
14. **TNT is first in the list,** before grass and dirt, so it is the block a child is most likely to try.
15. **Locked blocks** (gold, diamond, rainbow) show "⭐100" etc. and need 100, 200 and 300 stars in total. That link to
    learning is good; the lock just needs a clearer drawing and a line saying how many stars are still needed.
16. **Choosing a block while Break or Stamps is on switches back to Build** (good), but there is no sign of the switch.

### 3.4 The camera

17. **One finger cannot move the view.** A one-finger drag moves the place-here outline instead; dragging from an empty corner
    did nothing (pan stayed 0, 0). The only way to move is a two-finger pinch, which young children find hard. The tip says
    so ("pinch with 2 fingers to zoom and move"), which tells us the problem is known. [bb-free-zoom1-380]
18. **The zoom button goes in a circle:** 1.7, then 2.5, then 1 (smaller than when the game opened), then 1.7. A third tap
    makes everything tiny, and every tap jumps the view back to the middle. [bb-free-zoom2-380]
19. **Zoomed in, the edges are out of reach** without pinching, and the two tool rows cover the top of the scene.
    [bb-free-zoom1-380]
20. **On a phone the island sits in the lower middle** with a large empty sky above it (about a third of the canvas) while the
    tools cover the top. [bb-free-start-380]
21. **Turning the view** (the ⟲ and ⟳ buttons, 33 px wide, no label) jumps a quarter turn with no animation, so the child
    loses track of what they built. [bb-free-rot-380]
22. **On a 1024 x 552 tablet** (the usual size inside the browser) the palette moves to a column on the right and the front of
    the island is cut off at the bottom. [bb-free-start-1024x552]

### 3.5 Undo, break and the tools

23. **Undo is an unlabelled ↩️ emoji button, 40 px,** in the second row on top of the scene, far from the hand that is
    building. There is no redo. In blueprints, Undo takes a block away but the progress chip does not change and the mistake
    count is never given back.
24. **Break is a separate tool;** once on, every tap breaks a block until the child changes tool. A drag breaks a whole area.
    This is easy to do by accident and hard to notice.
25. **12 tool buttons in two rows** (Block, Line, Wall, Floor, Stamps, Break, Undo, turn left, turn right, Zoom, Night,
    Animals), 33-50 px wide and 40-44 px tall, all under the 48 px minimum, with 10 px labels. Line, Wall and Floor are
    powerful but unexplained beyond a 2-second tip. [bb-free-start-380]

### 3.6 Menu and goals

26. **The menu opens on the free-build world list;** the blueprints (the part with goals and stars) are below the fold, and
    the tip mentions a 💣 button that does not exist (TNT is a block). [bb-menu-380]
27. **Free build has no goals or progress** beyond a block count, and at most 4 worlds.
28. **The pet in the world is the old emoji** (`petE()`), not the drawn pet the child sees everywhere else.

### 3.7 What G-01 should keep

The magnifier while pressing, the drop-in animation, the night mode with glowing lamps, animals that hop around, the
blueprints idea (a goal with stars), stamps, and saving the world automatically. The hub card's drawing shows how the
game could look.

---

## 4. Game-time economy

### 4.1 The rules today (v132)

| Source | Game time | Limits |
|--------|-----------|--------|
| Start of the app | 3 min in the bank | once |
| Learning round | 1, 2 or 3 min by accuracy (setting "per round", default 3), + 1 min new stop, + ½ min beat old score, + up to 1½ min harder world, + 1 min perfect, + 2 min boss, + 20 s per old mistake fixed; a mastered stop pays 1 min | the same stop again today pays 60 %, then 35 %; at least 30 s |
| Test out | 4 min if passed, 1 min if not | |
| Mixed practice / review | 60 % of a round, + 30 s per tricky one fixed | |
| Fact Sprint | 1 min the first sprint of a set each day, + 1 min for any new record | 60 s mode needs a few right answers |
| Brain Teasers | 45-120 s for a first solve (by band and stars), 15 s for a replay, + 1 min for the Puzzle of the Day | at most half the daily limit from puzzles |
| Speed Race | 1 min for 5 or more right | **none** |
| Grown-ups | + 5 min button, empty the bank, pause | |
| Spending | 1 s per second in any Game Room game; the clock holds while paused or hidden; 20 s grace when time runs out (Hill Climb 25 s) | daily limit (default 30 min) |

Free extras with no game-time cost: the Balloon bonus after every round (30 s, coins only), Pet Care, Pet Shop, stickers.

### 4.2 What is healthy

- A round of about 4-6 minutes earns about 3 minutes of play: roughly one minute of play for two of learning, which is a
  fair, simple deal for this age.
- Replays of the same stop pay less, and mastered stops pay little, so a child cannot farm an easy stop.
- The daily limit is enforced on spending, the clock pauses, the time-up card is kind ("Your world is saved. Learn a little
  to earn more time!") and nothing starts again by itself. [timeup-bb-380]
- The Game Room with no time left explains why and offers one button back to learning, with the games still visible.
  [hub-empty-380]
- Missions (P5-08) are all learning tasks; none asks a child to play a game.

### 4.3 What to change (for P5-09)

1. **Close the Speed Race loop** (M5).
2. **Cap the bank.** The bank has no ceiling: a keen weekend can store hours, which makes "earn it by learning" meaningless
   for the next days. A cap of about two days' limit (60 min by default) keeps saving possible without hoarding.
3. **One clear earn list.** The hub list (S8), the finish screen lines and the rules should come from one table, so children
   and grown-ups see the same thing.
4. **Fact Sprint records** pay +1 min every time, so a child who is improving fast can sprint many times a day for minutes.
   Fine for now (it rewards real skill); P5-09 could make records after the first of the day pay 30 s.
5. **Keep games free of game-time rewards.** No game should pay game time back (none does today); bolts, coins and stars
   inside games stay cosmetic.
6. **Coins.** Coins come from learning (1 per right answer, mission bonus, world finish) and from the Balloon bonus (1 per
   balloon). They buy the Pet Shop and pet snacks. Once the shop is bought out (S3) they lose meaning. Keep each new game's
   currency inside that game (like Hill Climb's bolts), so new games do not flood the Pet Shop and can be tuned alone.

---

## 5. Detailed findings per game

Each part has: what brings children back, what makes them stop, and the changes (with the section 2 number where there is one).

### 5.1 Game Room hub (P4-16)

- **Brings them back:** a bright fair scene, the big ticket with the time left, one large card per game with its own
  drawing; it works in one column on a phone and three across on a tablet. [hub-380, hub-1024]
- **Stops them:** nothing serious. The earn list misses the main source (S8). Two cards show no progress (C4).
- With no game time, the cards say "Needs game time" on a washed picture and one button goes back to learning: clear and kind.

### 5.2 4x4 Hill Climb

- **Brings them back:** instant fun (gas and brake, big 96-140 px pedals), physical comedy (flips, wheelies, splashes),
  bolts flying, a distance record to beat, missions with progress bars, 7 places, 6 vehicles, 3 upgrades, 8 paints, 4 modes
  (Free, Delivery, Coin Rush, Night) and 56 levels with stars (168 stars). Goals at three time scales: this run, the next
  unlock, the whole garage. Every run ends with the shared end card and "Drive again". [hill-drive-gas-1024, hill-end-380]
- **Stops them:** young children hold the gas and flip (5 crashes in about 35 s of holding); the first run on the starter
  truck ended out of gas at 138 m, and the next place needs 300 m. Mission rewards must be claimed in the garage (one more
  step). The garage is a long scroll of old-look emoji cards. At 380 the distance chip is cut ("13...") and the fuel gauge is
  a thin line. [hill-drive-gas2-380, hill-garage-380]
- **Healthy?** Yes. Coin Rush has a 60-second countdown, but it is optional. Crashing never ends the run (only fuel or game
  time do).
- **Changes:** S4; move missions and upgrades onto components (C1); show "next unlock at 300 m" on the end card.

### 5.3 Coloring (Art Studio)

- **Brings them back:** huge variety and endless new designs (New Mandala gives a fresh design each time), mirror fill that
  colours a whole ring with one tap (very satisfying), shiny and glitter paints, six palettes, neon kaleidoscope drawing,
  number pictures with maths-fact and Spanish modes (a good, optional learning tie-in), pixel art with drag to colour.
  [art-mandala1-380, art-modechooser-380]
- **Stops them:** small pieces on phones (S5); the mandala, glass and animal pages have no end, so there is no "I made
  this!" moment; the number pictures hide small number-1 pieces (on the elephant the "1" is a thin gap by the tusk); the
  menus are old-look tabs with emoji; neon drawings are kept in their own browser storage key, outside the main save.
  [art-number-tap-380]
- **Changes:** S5, C3, C5; a "big pieces" filter for Pre-K to 1st.

### 5.4 Block Builder

See section 3. In short: a strong idea (building is the top genre for this age) let down by tiny targets, a camera that
needs two fingers, tools on top of the scene, blueprints that count the app's own targeting faults as mistakes, and TNT
that goes off when you try to build on it. Changes M1-M4, S6, C2.

### 5.5 Balloons (bonus after a round)

- **Brings them back:** 30 seconds, big 88 x 106 px balloons, a spoken rule with a replay button, a learning twist (even
  numbers, sums, rhymes, sight words, Spanish colours), coins for each pop, no penalty for a wrong pop. [balloons2-380]
- **Stops them:** nothing much. It is offered after every round with no limit (it costs no game time), which is fine
  because it is short and asks for learning. The end card's "Keep going" sends the child to the next stop, a good nudge.
- **Changes:** P4-17 will replace the emoji burst; keep the rule card readable for pre-readers (it is spoken).

### 5.6 Speed Race

- **Brings them back:** a 60-second race against your own best, in maths, sight words or Spanish.
- **Stops them:** it looks and plays almost the same as Fact Sprint (both are 60-second keypads) [race-q2-380,
  sprint-menu-380]; its game-time reward has no daily limit (M5).
- **Changes:** M5, C6.

### 5.7 Fact Sprint

- **Brings them back:** a personal best, a 7-day sparkline, a record fanfare, two modes (60 seconds / 20 facts), a
  mission now and then.
- **Stops them:** it is a timed drill, so some children will find it stressful; it is optional and never forced (good).
- **Changes:** none needed for R-02; see the R-01 practice-systems review for the teaching side.

### 5.8 Pet Care

- **Brings them back:** the drawn pet reacts (jumps, bubbles, hearts), snacks cost coins, a once-a-day 5-coin gift when all
  three meters are high. [care-380]
- **Stops them / pressure:** meters fall while the app is closed (S1), and the gift for keeping all meters above 80 % is a
  small daily-login reward. Bath and Play are free and instant, so there is little to do after the first visit.
- **Changes:** S1; replace the daily gift with something the child does (teach the pet a trick after a learning round);
  short mini-interactions (brush, tickle, throw a ball) would give Pet Care more to do without any decay.

### 5.9 Pet Shop and stickers

- **Brings them back:** try-on before buying, a clear price and "you will have N left", boss prizes as special hats, the
  sticker book with pages and a count. [shop-380, book-380]
- **Stops them:** the shop is small (S3); stickers are random with doubles that do nothing (S2).
- **Changes:** S2, S3.

### 5.10 Streaks and missions

- **Brings them back:** three daily missions that fit the child (always one round in the weakest subject), a sticker for
  each, a bonus for all three; the streak forgives one missed day a week and rewards 3, 7, 14 and 30 days. [home-380,
  streak-380]
- **Pressure:** a streak is a known nudge (the UK Children's Code names it). Star School's version is mild: no warnings, no
  "you will lose it", a rest day. Keep it that way; never add "don't break your streak" messages or notifications.
- **Changes:** none. If P5-09 prices missions in game time, keep it small (the round already pays).

### 5.11 Boss fights

- **Brings them back:** a silly drawn boss, a health bar and hearts, a costume prize, 3 stars for winning fast.
  [boss-intro-380]
- **Stops them:** the taunts (S7) [boss-wrong-380]; losing a boss fight costs nothing but time, which is right.
- **Changes:** S7; P4-17 will replace the emoji zap burst.

---

## 6. What brings children back, in one list

The pattern across the games, for G-01, G-02 and G-04 to copy:

1. **A first success in 10 seconds** (Hill Climb, balloons). Block Builder fails this test today.
2. **Big, forgiving controls**: 64 px+ for main actions, nothing a child must hit under 44 px.
3. **A clear end with a result** (the shared end card) and one obvious "again" button. Never start the next round by itself.
4. **Your own best** to beat (distance, time, stars), never someone else's.
5. **A collection with an end** that fills up visibly (levels with stars, a book, a garage). Never random draws you cannot finish.
6. **Make it mine**: paint, hats, places, a named world.
7. **Goals at three sizes**: this run, the next unlock, the whole game.
8. **Physical comedy and surprise**: flips, splashes, animals hopping, night mode.
9. **Kind failure**: no game over, a checkpoint, a tip; mistakes cost a star, never progress.
10. **Nothing happens while the app is closed.**

---

## 7. Guidance for G-02 (racing game)

- **Make it different from Hill Climb.** Hill Climb is a side-view physics drive; the racing game should be a race against
  other drivers on a track, seen from behind the car (a "pseudo-3D" road drawn in strips: cheap on a canvas and feels fast)
  or from above. Behind the car reads as "racing" to children at once.
- **Controls, two ways.** Easy (default for Pre-K to 2nd): the car drives itself; two big 96 px+ buttons (or touching the
  left/right half) steer; walls are soft and bumping only slows you; a steering helper keeps you near the road. Pro: hold to
  boost, a drift button, pick-ups. Test with real touch at 380 x 780, 1024 x 600 and 1024 x 552; on a phone in portrait the
  road must fill the height.
- **A race is 60-90 seconds** (2-3 laps), then the shared end card (`GH.end`) with place, time and stars (for example:
  finish, top 3, beat the target time). Nothing starts by itself.
- **Rivals** are friendly animal drivers in the app's style. Keep them close (gentle catch-up) so young children sometimes
  win; never show "last" in red. A "ghost" of your own best lap is a great challenge for older children.
- **Progress:** cups of 3 tracks in themed places (meadow, beach, snow, space), stars unlock the next cup; a fixed list of
  cars, paints and stickers on the car, bought with the game's own currency (not Pet Shop coins), all prices shown.
- **Learning tie-in only if it stays fun:** optional "boost gates" where you steer through the right answer, off by default,
  never stopping the race for a question.
- **Speed on a cheap tablet:** fixed physics step like Hill Climb's, cars and props drawn once into images and reused, no
  filters or shadows on the canvas, at most a few hundred road strips. Aim for 60 fps, never below 30.
- **Name:** rename the old Speed Race first (C6) so children do not confuse them; do not use any famous racing game's name,
  characters or item ideas (no shells, bananas or a plumber).
- **Plumbing:** one file `src/js/NN-game-race.js` (+ CSS), `GH.reg`, `gtStart` for the clock, `GH.wire` for Pause, a
  `tapToPlay` button, a smoke step that drives a race by touch.

## 8. Guidance for G-04 (new games from GAMES_RESEARCH.md)

I agree with G-03's order: **Snack Stand** first, **Sky Hop** second, **Fishing Day** as a calm third. R-02 adds:

- **Every game:** check the 10 points of section 6; touch targets 64 px for the main actions; play it by touch at 380 x 780,
  1024 x 600 and 1024 x 552 before shipping; no meters that drop while closed; no random rewards except "which fish swims by"
  with the promised catch-up; its own currency; a progress line on its hub card; toasts below the top bar.
- **Snack Stand:** ingredient buttons in a bottom row must stay 64 px at 380 px wide (5 across fits; use two rows or pages for
  more). Picture orders at least 48 px. Undo must be a labelled button next to the plate (Block Builder's lesson). In Busy
  mode, never let a customer leave unserved; missing a tip is the only cost, as designed. The upgrade list should be about
  30 things so it lasts longer than the Pet Shop does.
- **Sky Hop:** one-touch by default with the forgiving timing in the design (late and early jumps count); the balloon helper
  after 3 falls; checkpoints every few seconds; the child's drawn pet (not the emoji) as the hero. Build 12 courses first and
  measure frame rate on a slow device before the next 12.
- **Fishing Day:** make sure the "missing for a long time" rule really guarantees the book can be finished in a sensible
  number of trips (count it in a test); Easy reel default; facts read aloud.
- **What not to repeat from Block Builder:** a camera that needs two fingers, tools on top of the play area, tiny targets,
  a destructive action on a normal tap, and mistakes counted for the app's own targeting.

---

## 9. How the games were played

- Built app `index.html` at v132, opened from the file system in Chromium (Playwright), network blocked, the midway test save
  (`tools/fixtures/midway.json`) with 60 min of game time set (the 30-minute daily limit applied). Contexts with touch on
  (`hasTouch`), taps through `page.touchscreen.tap`, presses, drags and pinches through CDP touch events, at 380 x 780 and
  1024 x 600 (plus Block Builder at 1024 x 552), device scale factor 2. About 130 screenshots, all looked at.
- Played: Game Room hub (with and without game time); Hill Climb garage, a free drive held on the gas until out of fuel, the
  end card, the levels list; Coloring menu, a new mandala (taps with mirror fill and two colours), geometric animal, the
  colour-mode chooser, a number picture, pixel art in maths mode, neon drawing; Block Builder menu, free build (tap, press and
  slide, drag, one-finger drag on empty space, stamps, turn, zoom button three times, pinch, break, undo, TNT, night),
  blueprints 1, 2 and 7 (Stone Tower to the end, Brick Wall, Little House with every next see-through block tapped); the
  time-up card in Block Builder; Balloons; Speed Race; Pet Care; Pet Shop; stickers; Fact Sprint menu; streak calendar; a
  boss fight with one wrong answer. No console errors in any run.
- Measurements came from the page (`BB.api.faces`, `getBoundingClientRect`, `BB.zoom`) during play. To repeat: open the app
  as `tools/lib/browser.js` does, with `hasTouch: true`, go Home -> Game Room -> Block Builder by taps, and read
  `BB.api.faces` for face sizes.
