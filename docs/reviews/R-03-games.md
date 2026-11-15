# R-03 Game look, feel and staying power

Chunk R-03, written 2026-11-15 by Claude, on the merged state v155 (commit 0429838). No app changes.

The owner asked: "For the games, do they match current graphics (these are cheap tablets but I believe more 3D and more
detail are possible), playability and engagement... do the games get boring?" Earlier: the games were "very, very
repetitive... like you're on level one and stuck there."

This review looks at all six games in the Game Room: Block Builder, 4x4 Hill Climb, Star Rally, Snack Stand, Sky Hop and Art
Studio (Coloring: mandalas, glass, animals, Neon, number pictures, pixel art). Star Rally (G-02b) and Block Builder (G-01b)
have already been reworked for progression; Hill Climb is being reworked at the same time as this review; Snack Stand, Sky Hop
and Art Studio are next and should follow sections 2 and 3.

How it was done (details in section 7): every game screenshotted at 380 x 780 and 1024 x 600 (2x) and looked at; every game
played by touch with its frame rate and tap-to-screen time measured at 6x CPU slow-down; two throwaway prototypes (a 3D WebGL
scene and a richer 2.5D canvas scene) built and measured the same way; and each game fast-forwarded to a child's session 1, 5,
20 and 50 by editing the save, to see what is left to do.

---

## 1. Summary for parents

**The short answer.** The games are clean, friendly and easy to use, but most of them look like good 2015 phone games, not
like the games children play today: flat colours, little depth, no lighting, little movement in the background, and no
music. A cheap tablet can do more, and section 4 shows how much more with measured numbers. On staying power: every game
now has goals and a clear end to each round, but most games **run out of new things to do in one to two weeks of normal
play** (about 5 to 10 visits). After that the child can only repeat what they have done, and the coins and sparkles they
keep earning have nothing left to buy. That is the "stuck on level one" feeling the owner describes, just a little later.

**Score per game** (graphics 1 = dated, 5 = matches today's best children's games; "boring from" = the visit, of about 10
minutes, after which there is nothing new, measured with the game's own save; section 5 has the details):

| Game | Graphics | Boring from (about) | Top 3 fixes |
|------|----------|---------------------|-------------|
| **Block Builder** | 3 / 5 | Visit 10-12 for the goals (all 24 blueprints done); free building lasts longer | 1. Real 3D look: soft shadows and shading in the corners of blocks, a smooth camera you can turn with a finger (section 4). 2. Taps answer slowly (0.2-0.4 s, up to 0.9 s on a slow tablet): draw only what changed. 3. Drawn animals instead of emoji, and a fifth chapter plus new free-build goals (only 18 goals in all, 9 of them the same in every world) |
| **4x4 Hill Climb** | 2 / 5 | Visit 20-25 (the deepest game: 56 levels, 6 vehicles) | 1. It runs at 10-15 pictures a second on a slow tablet (all other games run at 30-60): fix first. 2. Fill the empty sky on phones (the truck is small, half the screen is sky), layered hills with depth. 3. Drawn driver (the pet) instead of an emoji, garage and missions without emoji |
| **Star Rally** | 3 / 5 | Visit 8-10 (all 12 tracks by visit 3, all trophies by visit 5, the shop bought out by visit 7) | 1. A second season: mirror cups (the 12 tracks backwards) and a fifth cup. 2. Something to save sparkles for (they pile up: about 13,000 unspent by visit 50). 3. More speed and depth on screen: drift smoke, speed lines, dust, lighting on the karts |
| **Snack Stand** | 3 / 5 | Visit 6-8 (all 5 places by visit 3, the 30-item shop bought out by visit 7, then the same day again) | 1. New kinds of days: party orders, a picky customer, a "today's special", recipes with steps. 2. A second tier of places and a café upgrade path, so coins keep meaning (about 6,000 unspent by visit 50). 3. More life on screen: customers that blink and bounce, steam and sparkles, a short tune |
| **Sky Hop** | 2 / 5 | Visit 5 for courses, visit 10-15 for stars: the first game to run out | 1. Richer look: 4-5 layers of background, shaded thick platforms, a bigger pet on phones. 2. 24 "remix" courses (mirrored, windy, night) and a ghost to race. 3. A "next goal" line and a reason to come back (costumes for the pet from stars) |
| **Art Studio** | 2 / 5 | Visit 2-3 for a child who likes goals; open-ended for a child who loves colouring | 1. A "Done!" moment and one gallery in the main save (Neon drawings live in a separate store today). 2. Bigger pixels (22 px on a phone) and no numbers in coloured squares; menus without emoji. 3. Picture packs that open with stars, and fills that sparkle and animate |

**What I recommend first** (the full list is in section 2):

1. Make Hill Climb run smoothly (for the rework that is already running).
2. Give Sky Hop and Snack Stand a "second season" before anything else: they run out first.
3. Make one small 3D drawing engine (about 15-25 KB, written for the app, no big library) and use it first for Block
   Builder, where 3D helps most. Use richer 2.5D drawing (layers, light, shadow, particles) for Hill Climb, Sky Hop and Star
   Rally, and keep Snack Stand and Art Studio as drawn pictures with more movement.
4. Add music to the games (they have none today) and give every game a "next goal" line and something to save for.

**What stays as it is:** no ads, no random prize boxes, no lives, no timers that pull a child back, no streaks in the games,
every round ends with the shared end card and nothing starts by itself, game time is earned by learning. Nothing in this
review asks to change that. "More to do" never means "harder to stop": every new goal in section 2 is a fixed, visible list
that can be finished.

---

## 2. Prioritised plan per game

Sizes: S = up to half a day, M = about a day, L = several days. Must = before the next game chunk ships; should = soon;
could = nice to have. "Visit" = a sitting of about 10 minutes of game time in that game.

### 2.1 Across all games

| # | Pri | Problem | Change | Size |
|---|-----|---------|--------|------|
| A1 | Must | No game has music (only Home and the map play a tune); modern children's games always have a theme per place | A short calm loop per game (and per place in Rally, Sky Hop, Snack Stand), made with `tone()` like the Home tune, on the existing Music switch (`S.music`), off in Calm mode, ducked under the voice | M |
| A2 | Must | Each game's currency stops meaning anything once its shop is bought (Rally 12,940 sparkles, Snack 5,977 coins, Hill 7,200 bolts unspent at visit 50) | A second, fixed and visible catalogue per game that opens when the first is done (section 2.2-2.7), never random, never pay-to-win; show "next thing to save for" on the menu | M each |
| A3 | Should | Only Star Rally and Block Builder have a "Next goal" line on the menu | Add one to Sky Hop, Snack Stand, Hill Climb and Art Studio (the same component) | S each |
| A4 | Should | No haptics anywhere | A 10-20 ms `navigator.vibrate` on landing, crash, serve, block placed; a Grown-ups switch, off in Calm mode | S |
| A5 | Should | Every game's world is the same every visit apart from Block Builder's build of the day | A "today's twist" from the date (like `bbDaily`): Rally weather or reverse track, Sky Hop a remixed course, Snack Stand a special customer, Hill Climb a daily challenge run; a small bonus the first time a day, nothing lost on a missed day, no streak | M |
| A6 | Could | The emoji left in game scenes and menus (Block Builder animals, Hill Climb driver and the Earth on the moon, Art Studio tabs and palette buttons, Hill Climb garage) break the drawn look and render differently on old Android emoji fonts | Draw them (object-art style, tokens) | M |

### 2.2 Block Builder

| # | Pri | Problem | Change | Size |
|---|-----|---------|--------|------|
| B1 | Must | A tap takes 0.21 s (phone) to 0.39 s (tablet) to show, up to 0.9 s, at 6x slow-down; turning the view costs 56 ms of script a frame (p90 187 ms) | Keep the island in a cached image and redraw only the changed column and what is in front of it; or move to the 3D renderer (B3), which redraws everything in about 1-2 ms of script | M |
| B2 | Should | Animals are emoji drawn with `fillText` | Drawn animal sprites (the hub's object-art style), with a little hop animation | S |
| B3 | Should | Flat isometric look: no light, no shadow, four fixed turns that jump | A WebGL voxel renderer (section 4): baked ambient occlusion (darker inside corners), one sun light, soft round shadows, animated water, a smooth camera turned with one finger; the current renderer stays as the fallback when WebGL is missing | L |
| B4 | Should | Only 18 free-build goals; 9 are the same in every world | 30+ goals with themes per world kind (build a bridge over water, a lighthouse on the beach, a snowman family) and two "big projects" per world | M |
| B5 | Could | After 24 blueprints there is only the build of the day | A fifth chapter (G-01b already lists it) and more build-of-the-day kinds (arch, bridge, maze) | M |

### 2.3 4x4 Hill Climb (for the rework running now)

| # | Pri | Problem | Change | Size |
|---|-----|---------|--------|------|
| H1 | Must | 67 ms a frame at 1024 x 600 (1x) and 100-117 ms at 2x on 6x slow-down: 9-15 frames a second; the physics then runs in slow motion (dt capped at 50 ms) | Draw hills, sky, sun and props once into band-cropped images (section 4.3), the terrain in cached chunks, the truck from a cached sprite; cap pixels at 1.2 M with Star Rally's adaptive resolution; no emoji `fillText` per frame | M |
| H2 | Must | On a phone half the screen is sky and the truck is small | Zoom so the truck is about 25 % of the width; 4-5 parallax layers fill the sky | S |
| H3 | Should | Driver is the pet emoji; garage and missions use emoji | The drawn pet (Sky Hop's `hopPetSprite` way), drawn garage | M |
| H4 | Should | Free drive is the same terrain every run (seeded per place) | A daily seed for Free Drive (A5), keeping the fixed levels as they are | S |

### 2.4 Star Rally

| # | Pri | Problem | Change | Size |
|---|-----|---------|--------|------|
| R1 | Should | All 12 tracks seen by about visit 3, all trophies by visit 5; then only ghosts | Mirror cups (each track flipped and raced the other way: new to the child, little new code), opened by the four trophies; a fifth cup | M |
| R2 | Should | The garage (2,060 sparkles) is bought by about visit 7 | Second garage tier: body kits, wheels, horns, a trail, each with its price, opened by the mirror cups | M |
| R3 | Could | Fast but flat: no smoke, no dust, no light | Drift smoke and dust puffs (sprite particles), speed lines at boost, a sun glare, shaded kart sprites, a gentle camera tilt in bends | M |

### 2.5 Snack Stand

| # | Pri | Problem | Change | Size |
|---|-----|---------|--------|------|
| N1 | Must | Every day is the same task with 2-5 day goals; the shop (923 coins) is gone by about visit 7, all places by visit 3 | Day kinds: a party (one big order for a table), a picky customer ("no cheese, please"), a recipe with steps (toast, then fill), a "special of the day" with a picture card, a food-truck day in a new place; one new kind opens every few days of play, listed on the menu | L |
| N2 | Should | Coins pile up | A second tier: a café upgrade (seats where customers sit and eat, a second counter, a helper), 3 new places (the farm, the castle, under the sea) at 18, 24, 30 stars | M |
| N3 | Should | The scene is still: customers slide in and wait | Idle animation (blink, little bounce, look at the food), steam on hot food, a sparkle on a perfect plate, customers eating and leaving with a wave | M |
| N4 | Could | The day's first message is a three-line toast over the customers on a phone (seen in Busy mode at 380 px) | Show the day goal on the sign or above the counter | S |

### 2.6 Sky Hop

| # | Pri | Problem | Change | Size |
|---|-----|---------|--------|------|
| K1 | Must | Runs out first: 24 courses by about visit 5, 72 stars by visit 10-15 | 24 remix courses opened by stars (mirrored, wind added, night, "collect every sparkle"); a ghost of your best run (Star Rally's ghost code); a "next goal" line | L |
| K2 | Must | Looks sparse: one band of hills, pale sky, flat cloud strips, a tall unfinished-looking grey cloud pillar, the pet about 50 px on a phone | Richer 2.5D (section 4.3): 4-5 parallax layers per world (far islands, clouds, hills, near bushes), thick shaded platforms with a light top edge and a soft shadow under the pet, foreground clouds that pass in front, dust on landing, a 1.4x bigger pet on phones | M |
| K3 | Should | Stars only open trails | Costumes or a hat for the pet from stars, shown in the pet's own Pet Shop too | M |

### 2.7 Art Studio (Coloring, Neon, pixel art)

| # | Pri | Problem | Change | Size |
|---|-----|---------|--------|------|
| T1 | Must | No goals, no finish, no gallery for most modes (Neon saves to its own browser store outside the main save) | A Done button on every page, one gallery in `S` for all modes (the shared end card shows the picture), and a "show a grown-up" full-screen view | M |
| T2 | Must | Pixel art squares are about 22 px on a phone with a number in every square; it looks like a spreadsheet | Zoom in on phones (40 px+ squares), drag to colour, hide the number once a square is coloured, draw coloured squares as rounded beads with a light edge | M |
| T3 | Should | Menus and palettes still use emoji tabs and buttons (P4-16 left them) | The shared components and drawn icons | M |
| T4 | Should | Nothing opens: the same 8 mandala and 6 glass designs, 8 animals, 14 number pictures, 12 pixel pictures | Picture packs (animals, vehicles, space, seasons) that open with learning stars; a sticker for each finished picture in the sticker book | M |
| T5 | Could | Fills are instant colour | A short fill animation from the tap point, texture fills (dots, stripes, sparkles), and a finished picture that "comes alive" (a gentle shine or wiggle); pixel art shown as a 3D block model with the B3 renderer | M |

---

## 3. The top 10 across all games, in order

1. **Hill Climb smooth frame rate** (H1, M, must; for the running rework).
2. **Sky Hop second season** (K1, L, must) and **richer look** (K2, M, must).
3. **Snack Stand day kinds** (N1, L, must).
4. **Art Studio Done + one gallery** (T1, M, must) and **pixel art that looks like art** (T2, M, must).
5. **Music in every game** (A1, M, must).
6. **Something to save for in every game** (A2 with R2, N2, K3; M each, must for the next game chunks).
7. **Block Builder tap speed** (B1, M, must).
8. **Tiny shared 3D renderer, first in Block Builder** (B3, L, should; section 4).
9. **Star Rally mirror cups** (R1, M, should).
10. **Today's twist from the date in every game** (A5, M, should), plus the **next-goal line** everywhere (A3, S each).

---

## 4. What a cheap tablet can really do: 3D and more detail, measured

### 4.1 How it was measured

Two throwaway prototypes were built in the session scratchpad (not in the app) and measured in Playwright Chromium (Chrome
153, headless) with the CPU slowed 6x (the same rule the app's own `tools/perf.js` and smoke steps use for a cheap tablet).

- **WebGL 3D** (`r03-proto-webgl.html`): a hand-written WebGL 1 renderer, no library: a 40 x 40 hilly ground and 300 low-poly
  objects (trees, rocks, houses, a moving car, 20 bouncing objects), 12,772 triangles, flat shading, a sun light with a sky /
  ground ambient light, distance fog, and real shadows from a 1024 x 1024 shadow map with 4-tap soft edges. Options: no
  shadows, objects merged into one buffer or drawn one by one, render scale.
- **2.5D canvas** (`r03-proto-canvas.html`): a side view like Hill Climb and Sky Hop: a sky gradient, 5 parallax hill layers
  with gradients and a light rim on each ridge, 60 shaded trees per layer with soft blurred shadows, a hero that hops with
  squash and stretch and a contact shadow that shrinks in the air, 200 glowing particles, a light and vignette overlay. Three
  ways to draw it: `live` (every path, gradient and blur every frame), `cached` (each layer drawn once into a full-height
  image), `band` (each layer drawn once into an image only as tall as its band of the screen; sprites for particles).

The software stand-ins are the realistic worst case: 3D runs on **SwiftShader** (WebGL drawn by the CPU, as on a tablet whose
graphics chip Chrome does not trust) and the canvas on Chrome's **software** canvas (`--disable-gpu`, as the app's own tests
run). A real cheap tablet draws both on its graphics chip, which is much faster at filling pixels than SwiftShader, so the
script time ("JS") is the number that carries over best; the frame interval is an upper bound. The machine was shared with
other sessions (load 3 to 8 on 4 cores), so numbers move by about +-30 % between runs; each case was run twice and the
better run kept. All at 1024 x 600 CSS pixels.

### 4.2 Results

**3D WebGL scene** (6x CPU, SwiftShader):

| Case | Pixels drawn | Draw calls | Script per frame (median / 90th) | Frame interval (median / 90th) |
|------|--------------|------------|----------------------------------|--------------------------------|
| No shadows, objects merged | 1024 x 600 | 23 | **0.9-1.4 ms** / 2.6-9.8 ms | 50 ms / 67-100 ms |
| No shadows, 0.75 render scale | 768 x 450 | 23 | 0.9-1.1 ms / 4.2-4.6 ms | **33 ms** / 50 ms |
| No shadows, 0.5 render scale | 512 x 300 | 23 | 0.2 ms / 3.0 ms | 33 ms / 50 ms |
| Shadow map 1024, soft edges | 1024 x 600 | 46 | 1.2-1.3 ms / 4.8-5.9 ms | 67-83 ms / 133-167 ms |
| Shadow map 512, hard edges, 0.75 scale | 768 x 450 | 46 | 1.0-1.6 ms / 2.6-6.5 ms | 50 ms / 83-100 ms |
| Shadows, 1.5 pixel ratio | 1536 x 900 | 46 | 1.2 ms / 6.5 ms | 100 ms / 200 ms |
| Not merged (one call per object) | 1024 x 600 | 604 | 3.3 ms / 13.5 ms | 100 ms / 183 ms |
| 1,000 objects (34,952 triangles), merged, no shadows | 1024 x 600 | 23 | 0.7 ms / 2.3 ms | 67 ms / 133 ms |

What this says: the script side of a few hundred low-poly objects is tiny (about 1 ms a frame at 6x when static objects are
merged into one buffer; 3.3 ms with 600 separate draw calls). The cost is filling pixels: on SwiftShader every extra pixel and
the shadow pass are expensive (shadows add 35-100 %), and only 0.75 render scale without shadow maps holds 30 frames a second.
On a real tablet chip (Mali-G52 / G57, PowerVR GE8320 class) a 1-megapixel flat-shaded scene of this size is light work, so
the 30 fps target is safe with these rules: merged static geometry (under ~50 draw calls), under ~20,000 triangles, no
shadow map (use a soft round "blob" shadow under each moving thing and bake light into vertex colours), CSS-pixel resolution
(do not render at 2x), and Star Rally's adaptive resolution (drop to 85 / 70 / 60 % when frames run long).

**Important:** Chrome no longer falls back to software WebGL by itself (the test needed `--enable-unsafe-swiftshader`), so a
tablet whose graphics chip is blocked gets **no WebGL at all**. Any 3D game must check `getContext('webgl')` and keep a 2D
fallback (Block Builder's current renderer is a ready one).

**2.5D canvas scene** (6x CPU, software canvas):

| Case | Pixels | Script incl. drawing (median / 90th) | Frame interval (median / 90th) |
|------|--------|--------------------------------------|--------------------------------|
| `live`: paths, gradients, blur every frame | 1024 x 600 | 194-210 ms / 215-322 ms | 200-217 ms (about 5 fps) |
| `cached`: full-height layer images + light overlay | 1024 x 600 | 86-96 ms / 99-131 ms | 83-100 ms |
| `band`: band-cropped layers, 200 sprite particles | 1024 x 600 | 48 ms / 73 ms | 50 ms / 83 ms |
| `band`, 60 particles | 1024 x 600 | 40 ms / 55 ms | 50 ms / 67 ms |
| `band`, no particles | 1024 x 600 | 39 ms / 52 ms | 33 ms / 67 ms |
| `band`, 0.75 render scale | 768 x 450 | 30 ms / 50 ms | **33 ms** / 50 ms |
| `band`, 1.5 pixel ratio | 1536 x 900 | 95 ms / 130 ms | 100 ms / 133 ms |

What this says: on a software canvas the cost is the number of full-screen pixels touched per frame. Drawing shapes and
blurs every frame is out of the question (5 fps); caching each layer is required; cropping each layer to its band halves
the cost again; and holding 30 fps needs either fewer stacked layers or the 0.75 adaptive resolution. On a real tablet the
canvas is drawn by the graphics chip and image copies are cheap, so this is the worst case.

**The app's own games, same machine, same day** (6x CPU, software canvas, frame interval median / 90th, script median):

| Game (playing) | 1x pixels | 2x pixels |
|----------------|-----------|-----------|
| Star Rally (Windmill Hill) | 16.7 / 50 ms, JS 4.1 ms | 33 / 67 ms, JS 4.2 ms (capped at 1.2 MP) |
| Sky Hop (Spring Garden) | 16.7 / 16.8 ms, JS 0.3 ms | 33 / 50 ms, JS 1.1 ms |
| Sky Hop (Moonlight Kites) | | 16.7 / 33 ms, JS 0.6 ms |
| Block Builder (idle) | 16.7 / 16.7 ms | 16.7 / 33 ms |
| Block Builder (turning the view) | | 83 / 200 ms, **JS 56 / 187 ms** |
| **Hill Climb (holding gas)** | **67 / 100 ms, JS 13 ms** | **100-117 / 133-150 ms, JS 12-17 ms** |
| Snack Stand, Art Studio | HTML / SVG, no animation loop: taps answer in 16-56 ms (section 6) | |

So Sky Hop and Star Rally have room to spend on more detail; Hill Climb must be fixed before it gets more.

### 4.3 Recommendation per game

| Game | Technique for "more 3D, more detail" | Expected cost on a slow tablet | Size |
|------|--------------------------------------|--------------------------------|------|
| **Block Builder** | **Real 3D with a small app-made WebGL renderer** (shared module in a games part): one mesh per island with hidden faces removed (greedy meshing), baked corner shading (ambient occlusion) and sun shading in vertex colours, a soft blob shadow under animals and the pet, animated water in the shader, a free orbit camera (one finger) with smooth turns, fog for depth; the current isometric renderer as the fallback | Script about 1-2 ms a frame (measured 0.9-1.4 ms for a similar scene); a voxel island of 16 x 16 x 12 is well under 20,000 triangles after meshing | +15-25 KB (prototype renderer and scene: 14.0 KB source, 5.4 KB gzip) |
| **Hill Climb** | Rich 2.5D canvas: band-cropped cached parallax layers (4-5), terrain drawn in cached chunks with a texture and a light top edge, sprites for the truck and pet, particles from a small sprite set, adaptive resolution like Star Rally | 30-50 ms worst case measured for 5 layers + 200 particles at full size, 33 ms at 0.75; today 67-117 ms | +5-10 KB |
| **Sky Hop** | The same 2.5D recipe as Hill Climb (it already draws cached sprites and has adaptive resolution): more layers, foreground clouds, shaded platforms, dust and sparkle particles | From 16.7 ms today to about 33 ms worst case | +5-10 KB |
| **Star Rally** | Stay pseudo-3D (it reads as racing, it is fast): sprite particles (smoke, dust, sparks), speed lines, a sun glare, shaded kart sprites, roadside detail density by speed; a WebGL road is possible later but not needed | 16.7-33 ms today, room for about 5-10 ms more | +5 KB |
| **Snack Stand** | Keep HTML and SVG (taps answer in 16-24 ms median): CSS transform animations (idle bob, blink, eat), a few CSS sprite particles (steam, sparkle), a soft light gradient over the scene, a slow parallax of the background when a customer arrives | Transforms and opacity only, so nothing is laid out again | +3-6 KB |
| **Art Studio** | Keep SVG: fill animations, pattern fills, a shine on finished pictures; could add a 3D "block model" view of pixel art with Block Builder's renderer | Small | +3-6 KB |

**Why not three.js?** It is about 692 KB minified (three.js r170 `three.module.min.js`: 691,648 bytes, 171 KB gzip). The app's
precache budget is 3.6 MB and the precached files are 3,363,002 bytes today, so only about 237 KB is left: three.js alone
is almost three times that. A small library such as OGL is about 156 KB of source for its core and maths before
minifying. The app needs only a few things (buffers, two shaders, a camera, picking a block under the finger), which fits in
an app-made module of about 15-25 KB, loaded with the games on demand (P6-02) like every other game file, so the start-up
budget (3.0 MB) does not change. If games2 (323 KB) grows past its 400 KB warning, the renderer gets its own lazy part.

---

## 5. Does it get boring? Session 1, 5, 20 and 50

### 5.1 How it was simulated

Each game was opened with the midway save and its own save fields set to what a child would have after N visits of about
10 minutes (`r03-sessions.js`). The rates come from the games' own numbers: Star Rally about 6 races a visit and about 50
sparkles a race (the code's own estimate in `63-game-race.js`); Sky Hop about 8 course runs a visit and 1.6 tries a new
course; Snack Stand 3 days a visit and about 46 coins a Calm day (G-04a: 923 coins is about 20 Calm days); Block Builder 3
small blueprints a visit at first and about 2 bigger ones later; Hill Climb 5 runs a visit and 25-45 bolts a run; Art Studio
has no saved progress. Then the menu was opened and screenshotted and the game's own next-goal line and lists were read.
This is a model of an average child, not a measurement of children; a keen child reaches each point sooner.

### 5.2 What a child finds

| Game | Visit 1 | Visit 5 | Visit 20 | Visit 50 |
|------|---------|---------|----------|----------|
| **Star Rally** | 3 of 12 tracks, 1 trophy, 6 garage items bought. Goal: "Win a trophy in the Wave Cup to open the Frost Cup." | All 12 tracks, 4 of 4 trophies, 24/36 stars, every paint and sticker, 6/9 upgrades. Goal: "Win the gold trophy in the Star Cup." | Everything done and bought (2,060 sparkles in all), 3,940 unspent. Goal: make and beat ghosts | Same, 12,940 sparkles unspent and nothing to buy |
| **Sky Hop** | 5 of 24 courses, 5 stars, 2 trails | All 24 courses, 40/72 stars, 5/7 trails | 72/72 stars, 24 gold medals, all trails. No next-goal line, no new course | Same; nothing new |
| **Snack Stand** | 3 places of 5 open, 8 of 30 shop items | All 5 places, 15/15 stars, 26/30 items | Shop bought out (923 coins), 1,837 unspent | Same day loop, 5,977 coins unspent |
| **Block Builder** | 3 of 24 blueprints, build of the day. "Build the Garden Gate ... 1 more opens Sunny Beach." | 12 of 24, chapter 3 open | All 24, all trophies. Next goal: "Try today's build of the day." Free-build goals: 13 per world, but 9 are the same in every world (18 different in all) | Build of the day, free build, gallery: open-ended but no new goals |
| **Hill Climb** | 1 of 56 levels, 1 place | 8 levels, 5 places, most upgrades | 33 levels, all vehicles and upgrades | All 56 levels; 7,200 bolts unspent; missions repeat from a list of 11 |
| **Art Studio** | Everything is there at once: 8 mandala and 6 glass designs (plus new random ones), 8 animals, 14 number pictures, 12 pixel pictures, Neon, Free Paint | Same | Same | Same |

### 5.3 Against what keeps children engaged in a healthy way

The research the app already uses (docs/GAMES_RESEARCH.md) and a few more classics:

- **Competence, autonomy, relatedness** (Ryan, Rigby and Przybylski, 2006): children come back when they feel they are
  getting better, can choose, and can share. All games are good on competence early (stars, medals, best times); they go
  flat once every star is won, because the challenge stops growing. Choice is good in Block Builder and Art Studio, thin in
  Snack Stand and Sky Hop. Sharing ("show a grown-up") exists only in Block Builder's gallery.
- **Challenge, curiosity and fantasy** (Malone, 1981, "Toward a theory of intrinsically motivating instruction", Cognitive
  Science 5(4)): curiosity needs something new around the corner. This is what runs out first: Sky Hop at visit 5, Star Rally
  at 3 for tracks, Snack Stand at 3 for places.
- **Clear, near goals** (Locke and Latham, 2002, "Building a practically useful theory of goal setting and task motivation",
  American Psychologist 57(9)): specific goals at the right size work. Star Rally's and Block Builder's "Next goal" line do
  this well; the other four games have no such line, and every game's goals end.
- **Natural stopping points** (Hiniker and others, 2016, "Screen time tantrums", CHI 2016): transitions away from a screen go
  better at the end of a unit than in the middle of an open-ended activity. Every game here ends rounds with the shared end
  card and never autoplays: keep it.
- **No manipulative design** (Radesky and others, 2022, JAMA Network Open; UK ICO Children's Code, Standard 13; UNICEF
  Innocenti RITEC, 2024): new content must be a fixed visible list, daily twists must not punish a missed day, no streaks or
  "come back" pressure in games, no random prizes. All changes in section 2 follow these rules.

### 5.4 Per game: where it stops being interesting

- **Star Rally.** Visit 1-5 is strong: new tracks every cup, hazards and weather vary between rounds (40 % chance of the
  other weather), a clear next goal, a gentle difficulty curve by cup (the G-02b bots: a well-steering child wins 77 % of
  Easy races, a child who only steers back from the edge wins 2 %, so later cups stay a stretch for younger children).
  From visit 8-10: no new track, no new item; ghosts are a good goal for older children but not for a 5-year-old. Fix: R1, R2.
- **Sky Hop.** Strong one-touch fun and kind failure (no lives, a balloon after 3 falls). But each course is fixed and the
  whole game is seen in about 5 visits; stars and medals hold a keen child to about visit 15. Difficulty rises world by
  world (each adds one thing) and then stops. Fix: K1, K3.
- **Snack Stand.** Pretend play is strong for 5-8 year olds and the Give change mode is a good stretch. But the day is the
  same loop with random orders from a short menu, two to five kinds of day goal, and the shop runs out by visit 7. Busy mode
  is the only difficulty step. Fix: N1, N2.
- **Block Builder.** The best long-term game: building is open-ended, and G-01b added chapters, challenge kinds, build of
  the day and a gallery. The goals end around visit 10-12, and free-build goals repeat across worlds. Fix: B4, B5.
- **Hill Climb.** The deepest content (56 levels, 4,050 bolts of things to buy), so it lasts to about visit 20-25; the run
  itself repeats (the same terrain every Free Drive). Fix: H4 and the running rework.
- **Art Studio.** Calm, creative and fine without goals for a child who loves colouring (the random mandala and glass designs
  never run out). For a goal-driven child there is no finish, nothing to collect and nowhere to show it, so it is dropped
  after a visit or two. Fix: T1, T4.

---

## 6. Playability

Played by touch (Playwright with `hasTouch`, taps through the touchscreen) at 380 x 780 and 1024 x 600, 2x, midway save. Tap
to screen time is the browser's Event Timing measure (tap to the next drawn frame) at 6x CPU slow-down, 6 taps on the main
control.

| Game | Main controls (all 48 px or more?) | Tap to screen, median / worst (phone; tablet) | Feedback | Notes |
|------|-----------------------------------|----------------------------------------------|----------|-------|
| Block Builder | Yes (48 controls checked) | 208 / 328 ms; 392 / 904 ms | Drop-in animation, sounds, magnifier | Slow taps on a slow tablet (B1); emoji animals |
| Hill Climb | Yes (pedals 96-140 px) | 232 / 328 ms; 376 / 552 ms | Engine sound, crashes, bolts, giggles | 10-15 fps at 6x (H1): the gas feels late |
| Star Rally | Yes (steer buttons) | 120 / 192 ms; 168 / 224 ms | Messages ("You passed Pip!"), sounds | Smooth (G-02b fixed the flashing cars) |
| Sky Hop | Yes (Hop 96 px, tap anywhere) | 88 / 152 ms; 144 / 216 ms | Boings, squash and stretch, poof | Forgiving timing (coyote time and early taps count); the pet is small on phones |
| Snack Stand | Yes | 16 / 120 ms; 24 / 96 ms | Pops, chirps, ticks on the order | Fastest game to answer; the day's goal toast can cover the customers for 3 s on a phone (N4) |
| Mandala | Palette yes; pieces no (R-02: smallest 4 px) | 56 / 64 ms; 48 / 104 ms | Pop sound, fill animation | Mirror fill is very satisfying |
| Pixel art | Palette yes; squares about 22 px on a phone | 48 / 56 ms; 40 / 64 ms | Pop sound | Looks like a table of numbers (T2) |

Also checked: no console errors in any run; Pause holds every game (P4-16); no flicker seen (the Star Rally car flashing
fixed in G-02b did not come back in 4 tracks of shots). No game uses haptics (A4). No game has music (A1). Sound effects
exist in every game and respect the Sound switch.

---

## 7. Graphics compared with today's children's games

No specific game is copied or named as a model here; these are the techniques the popular games in each genre use.

- **Block building (voxel sandbox) games** today are true 3D with a free camera, soft lighting with corner darkening
  (ambient occlusion), a sun with shadows or soft blob shadows, animated water and leaves, a day and night sky, particles
  when a block lands or breaks, and animated animals. **Block Builder** has good textures and a lovely drop-in, but a fixed
  isometric view with four jumping turns, no light or shadow, flat water, and emoji animals. **3/5.**
- **Side-view hill driving games** use 4-6 parallax layers, a textured ground with a lit top edge, a big detailed vehicle
  with suspension that visibly squashes, dust and mud particles, a camera that zooms out with speed, and lots of props.
  **Hill Climb** has the physics comedy but a flat ground, two background bands, a small truck on a phone, an emoji driver and
  a slow frame rate. **2/5.**
- **Kart racing games for children** are full 3D with bright lighting, drift smoke, boost flames, speed lines, track-side
  crowds and bouncing items. **Star Rally**'s pseudo-3D road is fast and reads well, with weather, a tunnel and hazards; it
  lacks particles, light and depth effects. **3/5.**
- **Cooking and shop games** use bouncy, constantly animated characters (blink, react, eat), steam and sparkle effects,
  a cosy lit room with depth, satisfying "juice" on every tap, and music. **Snack Stand**'s drawn food and animals are
  attractive and clear, but the scene is still and silent apart from effects. **3/5.**
- **Platform games for children** use rich layered backgrounds (5+ layers with atmospheric fading), thick platforms with
  shading and grass tufts, foreground objects passing in front, a well animated hero, dust and sparkles, and music. **Sky
  Hop** has a well-drawn pet with squash and stretch but pale, sparse backgrounds, one hill band, flat cloud strips and a
  large empty sky; the rainbow world is pink on pink. **2/5.**
- **Colouring apps** use textured and glittery fills, animated fills, finished pictures that animate, collections and
  galleries. **Art Studio** has shiny and glitter paints and mirror fill (good), but emoji menus and palettes, a pixel-art grid
  that looks like a table of numbers, and no finish or gallery. **2/5.**

What makes them look dated, in one list: flat colour without a light direction in the scene (the object art has it; the
scenes do not), few depth layers, nothing moving in the background, small heroes on phones, emoji mixed with drawn art, no
particles in most games, and silence (no music).

---

## 8. Files

Scratchpad (`/tmp/claude-0/-home-user-star-school/77e28198-f99e-5c3b-a61b-2fc79635f1f7/scratchpad/r03/`), not in the repo:

- `r03-proto-webgl.html`: the WebGL 1 low-poly prototype (URL options `n`, `shadow`, `merge`, `rs`, `dprmax`, `smap`, `pcf`, `finish`).
- `r03-proto-canvas.html`: the 2.5D canvas prototype (`mode=live|cached|band`, `p`, `rs`, `dprmax`, `props`, `flush`).
- `r03-perf-proto.js`: measures the prototypes at 6x (SwiftShader or software canvas); `r03-proto-*.png` its screenshots.
- `r03-perf-games.js`: frame times of the app's games at 6x (`r03-perf-games-*.json`).
- `r03-sessions.js`: the session 1/5/20/50 fast-forward (`r03-sessions.json`, screenshots in `sessions/`).
- `r03-touch.js`: control sizes and tap-to-screen times by touch (screenshots in `touch/`).
- `r03-snack-busy.js`: Snack Stand Busy layout check (`r03-snack-busy-*.png`).
- `shots/`: 78 screenshots of every game (the `@p416 @g02 @g01 @g04a @g04b` groups of `tools/shots.js`) at 380 x 780 and
  1024 x 600, 2x; `r03-sheet-*.png` contact sheets; `r03-sheet.py` makes them.
- `r03-npm/`: the three.js, OGL and twgl packages unpacked only to measure their size.

To repeat the game screenshots: `SHOTS_OUT=<dir> SHOTS_SCALE=2 SHOTS_SIZES=380x780,1024x600 SMOKE_SPEED=1 node tools/shots.js
@p416 @g02 @g01 @g04a @g04b`.

Not done: no real tablet was measured (the 6x slow-down and software drawing stand in for it; ROADMAP 7.2's real-tablet
check should include a Block Builder 3D prototype before B3 is built); no children were observed.
