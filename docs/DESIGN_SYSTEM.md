# Star School Design System

The spec for the visual redesign (Phase 4 in ROADMAP.md). Goal: the app should look like one team drew every screen on the same day:
calm, bright, tactile, and clearly made for children, without looking like a pile of emoji.

Everything here must work offline, inside one HTML file, on a slow 7-inch Android tablet.

---

## 1. Design principles

| Principle | In practice |
|-----------|-------------|
| One thing per screen | Each screen has one obvious main action, drawn as the biggest, brightest button. |
| Tactile | Buttons look pressable: a solid "ledge" under them that squashes when tapped. |
| Calm background, bright actions | Warm paper background and white cards. Colour is saved for things you can tap and for subject identity. |
| Drawn, not pasted | Interface icons and characters are our own SVG. Emoji only as content pictures, from the allowlist, until object art replaces them. |
| Consistent subject colours | Math is blue, Reading is berry, Spanish is green, Discover is teal, Brain Teasers is purple, Game Room is orange. Everywhere. |
| Kind feedback | Wrong answers are amber "try again", never red crosses or buzzers. |
| Cheap to draw | Flat fills, two tones, no blur filters, animation only on transform and opacity. |

No dark mode. Children use this in daylight and a second theme doubles the testing.

## 2. Tokens (chunk P4-01)

All tokens are CSS custom properties on `:root` in `src/css/00-tokens.css`. After P4-01, no other file may contain a raw hex colour
(checked by grep in `tools/check.sh`; game canvases in files 60-72 are exempt).

### 2.1 Colour

| Token | Hex | Use |
|-------|-----|-----|
| `--ink` | `#1F2440` | Main text, icons |
| `--ink-2` | `#3D4263` | Secondary text |
| `--ink-3` | `#6B7090` | Hints, captions (still AA on white) |
| `--line` | `#E3E5EF` | Borders, dividers |
| `--paper` | `#FFF9EF` | App background |
| `--surface` | `#FFFFFF` | Cards, buttons |
| `--surface-2` | `#F4F5FB` | Wells, slots, disabled |
| `--brand` | `#3B5BDB` | Primary actions, links, focus |
| `--brand-shade` | `#2F49B8` | Ledge under primary buttons |
| `--brand-tint` | `#E3E9FF` | Selected backgrounds |
| `--star` | `#FFC93C` | Stars, coins, highlights (never text on white) |
| `--star-shade` | `#F5A800` | Star outline, ledge |
| `--star-tint` | `#FFF1C7` | Reward backgrounds |
| `--good` | `#20A556` | Correct fill |
| `--good-ink` | `#147A3C` | Correct text |
| `--good-tint` | `#DDF5E7` | Correct background |
| `--try` | `#FFB020` | Try-again fill |
| `--try-ink` | `#8A4B00` | Try-again text |
| `--try-tint` | `#FFE8B8` | Try-again background |
| `--danger` | `#C92A2A` | Grown-ups area only (reset, delete) |

Subject colours (each has `-tint` for backgrounds and `-shade` for ledges and text on tint):

| Subject | `--x` | `--x-tint` | `--x-shade` |
|---------|-------|-----------|-------------|
| Math `--math` | `#2D6BE4` | `#E1EBFF` | `#1F4FB8` |
| Reading `--read` | `#CD3168` | `#FFE3EC` | `#A61E4D` |
| Spanish `--es` | `#17804F` | `#DDF5E7` | `#0F5F3A` |
| Discover `--disc` | `#0E7C86` | `#D9F3F5` | `#0A5A62` |
| Brain Teasers `--bt` | `#7C3AED` | `#EDE4FF` | `#5B21B6` |
| Game Room `--play` | `#E8590C` | `#FFE8D9` | `#B8420A` |

Contrast rules (verified by `tools/contrast.js`, which P4-01 writes):
- Text on `--surface` or `--paper`: at least 4.5:1. Passing set: `--ink`, `--ink-2`, `--ink-3`, `--brand`, `--good-ink`, `--try-ink`, and every subject base colour except `--play`.
- White text on a colour fill: at least 4.5:1 for text under 24 px, 3:1 for 24 px bold and larger. `--play` and `--good` fills carry only large bold text or icons.
- `-shade` on its `-tint`: at least 4.5:1.
- If the script fails a pair, darken the colour in 4% steps until it passes and record the final hex here.

Existing variables (`--bg`, `--blue`, `--green`, `--red`, `--muted`, `--card`, `--math`, `--read`) are kept as aliases to the new tokens during migration and removed in P4-17.

### 2.2 Type

| Font | Licence | Use |
|------|---------|-----|
| **Andika** 400, 700 (already embedded) | SIL OFL | All reading content, prompts, body text. Chosen for early readers: single-storey a and g, clear l/I/1. Do not replace for content. |
| **Fredoka** 600 (to add, Latin + Spanish subset) | SIL OFL | Display only: screen titles, big buttons, numbers in rewards. |

Gate for Fredoka: add it only if the subset `woff2` is under 40 KB. If it cannot be obtained or is larger, use Andika 700 for display and skip it.
Record the choice in PROGRESS.md. The licence text for every embedded font goes in the in-app About section.

| Token | Size | Line height | Use |
|-------|------|-------------|-----|
| `--fs-1` | 14 px | 1.4 | Grown-ups fine print only |
| `--fs-2` | 16 px | 1.45 | Captions, table text. Minimum on any child screen |
| `--fs-3` | 18 px | 1.45 | Body |
| `--fs-4` | 22 px | 1.3 | Buttons, card titles |
| `--fs-5` | 28 px | 1.25 | Screen titles |
| `--fs-6` | 36 px | 1.2 | Hero text, scores |
| `--fs-7` | 48 px | 1.1 | Celebration numbers |
| `--fs-prompt` | `clamp(44px, 11vmin, 96px)` | 1.1 | The question itself (existing `--big`) |

Rules: sentence case everywhere, no all-caps words. Left-aligned for anything longer than one line. Timers and scores use `font-variant-numeric: tabular-nums`.

### 2.3 Space, shape, depth

| Group | Tokens |
|-------|--------|
| Spacing `--s-1`..`--s-8` | 4, 8, 12, 16, 20, 24, 32, 48 px |
| Radius | `--r-chip` 10, `--r-btn` 16, `--r-card` 22, `--r-hero` 28, `--r-pill` 999 |
| Ledge (signature depth) | `--ledge: 0 4px 0` + a shade colour. Pressed: `translateY(3px)` and ledge `0 1px 0` |
| Soft shadow | `--shadow: 0 6px 16px rgba(31,36,64,.08)`. At most 6 elements with blur shadow on a screen |
| Border | 2 px `--line` on white-on-paper cards |
| Touch target | `--tap: 48px` minimum width and height; 56 px for primary; 64 px for PK-K choices |

### 2.4 Motion

| Token | Value | Use |
|-------|-------|-----|
| `--t-fast` | 90 ms | Press |
| `--t` | 180 ms | Small moves, fades |
| `--t-slow` | 320 ms | Screen enter, panels |
| `--t-xl` | 600 ms | Celebrations |
| `--ease` | `cubic-bezier(.2,.8,.2,1)` | Default |
| `--spring` | `cubic-bezier(.34,1.56,.64,1)` | Pop-in of rewards, stars |

## 3. Base layer (chunk P4-01)

- Reset: `box-sizing`, no tap highlight, no text selection on child screens, `touch-action: manipulation`.
- Background: `--paper` with one very soft radial highlight top-left. No busy gradients behind content.
- Layout shell: `.top` (bar), `.scroll` or `.center` (content), optional `.dock` (bottom actions). Safe-area padding via `env()`.
- Breakpoints: phone `max-width: 480px`; tablet portrait is the default; landscape `(orientation: landscape)`; short landscape `(max-height: 520px)`.
- Focus: `:focus-visible` shows a 3 px `--brand` ring with 2 px offset.
- Reduced motion: `@media (prefers-reduced-motion: reduce)` and `html.calm` both set all animation and transition durations to 0.01 ms and hide confetti.

P4-01 changes tokens and base only. It maps old variables to new ones so the app looks nearly the same but slightly cleaner; real screen changes come later.

## 4. Components (chunk P4-04)

Each component is a CSS class set in `src/css/10-components.css`, plus, where useful, a tiny JS helper that returns HTML. A sheet page (`tools/shots.js components`) shows every variant.

| Component | Class / helper | Variants | Notes |
|-----------|----------------|----------|-------|
| Button | `.btn` | `primary` (brand fill, white text), `soft` (white, ledge), `subject` (uses `--c`, `--c-shade` set inline by subject), `ghost`, `danger`; sizes `sm`, `md`, `lg` | Always icon + label on child screens when space allows |
| Icon button | `.btn.icon` | round 48 or 56 px | Needs `aria-label` |
| Key | `.key` | number pad, letter pad, `go`, `del` | 56 px min on tablet portrait |
| Choice | `.choice` | text, picture, symbol, wide; states idle, selected, right, wrong, disabled | Right = green tint + check icon; wrong = amber tint + shake |
| Tile and slot | `.tile`, `.slot` | letter, word, number | Shared by build, order, spell |
| Card | `.card` | plain, tinted (subject), hero | 22 px radius, 2 px line |
| Path card | `.pathcard` | per subject | Icon badge, title, progress meter, "Next: ..." line, play arrow |
| Top bar | `.top` | home, in-round, grown-ups | Back button left, title, chips right |
| Stat chip | `.chip` | star, coin, ticket, flame, timer | Icon + number, pill shape, bumps when the number changes |
| Meter | `.meter` | progress, pet growth, round progress dots | 16 px high, rounded |
| Star rating | `stars(n, of)` | 1-3 | Filled `--star`, empty `--line` |
| Toast | `fb()` | good, try, info | Top-centre pill with icon |
| Speech bubble | `.bubble` | pet says | Tail points to the pet |
| Sheet / modal | `.sheet` | confirm, test out, hint | Dim backdrop, slides up, one primary action |
| Hint panel | `.hintp` | text, picture, steps | Amber tint, bulb icon, "next step" button for steps |
| Context panel | `.ctx` | passage | Collapsible, scrolls inside |
| Segmented control | `.seg` | 2-4 options | Grown-ups and puzzle settings |
| Switch | `.switch` | on/off | Replaces raw checkboxes |
| Table | `.tbl` | report card | Zebra rows, sticky header |
| Tag | `.tag` | NEW, mastered, skipped, challenge | Small pill |
| Empty state | `.empty` | icon, one line, one action | For "nothing due", "no game time yet" |
| Map node | `.node` | locked, open, passed (1-3 stars), mastered, skipped, new, boss | See section 7 |

Microcopy rules: short, warm, concrete. "Try again" not "Wrong". "3 more stars to hatch your egg" not "Progress 85%". No exclamation marks on every line; save them for wins.

## 5. Icons (chunks P4-02, P4-03)

### 5.1 Technique

- `src/js/15-icons.js` holds `const ICONS = {name: '<path .../>'}`. At startup one hidden `<svg>` sprite with a `<symbol id="i-name" viewBox="0 0 24 24">` per icon is added to the page.
- `ico(name, size = 24, cls = '')` returns `<svg class="ic" width height aria-hidden="true"><use href="#i-name"/></svg>`.
- Icons take their colour from `currentColor`. A second tone is available through `var(--ic2, #fff)`.
- `tools/shots.js icons` renders every icon at 20, 32 and 64 px on white and on a colour, for review.

### 5.2 Drawing rules (the style Opus sets in P4-02 and everyone follows)

| Rule | Value |
|------|-------|
| Grid | 24x24, 2 px safe margin, shapes centred optically |
| Style | Solid rounded shapes filled with `currentColor`; inner detail as cut-outs or `--ic2` |
| Corners | Rounded, radius 1.5 or more. No sharp spikes except star points (rounded 0.75) |
| Detail | Nothing thinner than 1.75 units. Must read at 20 px |
| Perspective | Flat, front view. No gradients, no shadows inside icons |
| Size | Under 600 bytes per icon, coordinates to one decimal |
| Feature icons | Same drawings may be shown at 48-64 px inside a tinted circle "badge" with the subject colour |
| Naming | lowercase, hyphenated: `sound-on`, `skill-add` |
| How (set in P4-02) | Rounded corners come from stroking the inset shape with `currentColor` (stroke-width 3 for r 1.5, 1.5 for star points); cut-outs use `fill-rule="evenodd"`; `--ic2` only where a cut-out cannot work. Full recipe in the header of `src/js/15-icons.js`; review sheet: `node tools/shots.js icons` |

### 5.3 First 40 icons (P4-02)

`star, coin, ticket, flame, home, back, map, play, pause, replay, sound-on, sound-off, speak, gear, lock, check, close, hint, heart, gift,
trophy, target, bolt, paw, bag, sticker-book, gamepad, puzzle, path-math, path-read, path-es, path-disc, plus, minus, times, divide,
backspace, go, calendar, crown`

### 5.4 Remaining icons (P4-03, about 60)

One per skill family (`skill-add`, `skill-sub`, `skill-count`, `skill-shape`, `skill-clock`, `skill-coin`, `skill-frac`, `skill-dec`, `skill-geo`,
`skill-data`, `skill-ruler`, `skill-alg`, `skill-abc`, `skill-sound`, `skill-sight`, `skill-spell`, `skill-gram`, `skill-vocab`, `skill-story`,
`skill-trace`, `skill-sent`, plus Spanish unit icons), puzzle-type icons (19), and utility (`info, warning, download, upload, trash, edit, mic,
record, stop, undo, redo, rotate, flip, eye, timer, chart, user, users, arrow-up, arrow-down, arrow-left, arrow-right, more`).

Every emoji used as chrome (titles, buttons, tiles, toasts) is replaced by an icon. `SK[id].e` and `PATHS[p].e` gain an `ic` field; the emoji field stays until P4-17 removes the last use.

## 6. Characters and illustration

### 6.1 Style

Flat, friendly, geometric. Two tones per colour area (base and a darker shade for depth) plus one white highlight. No black outlines.
Big eyes with a white glint, small mouth, round cheeks. Everything built from circles, ellipses, rounded rectangles and a few smooth paths.

### 6.2 Pet rig (chunk P4-05, Opus)

- One SVG per pet, `viewBox="0 0 200 200"`, built from named groups: `shadow, tail, body, belly, arm-l, arm-r, head, eyes, mouth, cheeks, extra` (wings, spikes, fins).
- Anchor points `hat` (top of head) and `toy` (near a hand) are stored per pet and stage so wearables sit correctly.
- `petSVG(kind, stage, mood)` returns the markup. Stages: `egg`, `baby`, `kid`, `grown`; "super" adds a glow ring behind (a plain circle with opacity, not a filter).
- Moods swap only the `eyes` and `mouth` groups: `idle`, `happy`, `oops`, `cheer`, `sleepy`, `hungry`.
- Animation by CSS on groups: body bob (transform), blink (eyes `scaleY` every 4 s), tail wag, jump, sad wobble, cheer bounce. No SMIL, no filters.
- Budget: under 6 KB per pet for all stages (stages reuse shapes with different proportions).
- The dragon is the reference. P4-06 builds dino, bird and sea pal by copying the rig and changing shapes and colours.

Pet palettes: dragon green `#34B56A` with yellow belly; dino blue `#3E8BFF` with cream belly; bird yellow `#FFC93C` with orange beak; sea pal aqua `#22B8CF` with white belly.

### 6.3 Bosses

Four bosses (Gloop, Robo-Bonk, Captain Inky, Zorp) drawn in the same style, one pose plus a "hit" pose. Silly, never scary. Built in P4-11.

### 6.4 Wearables, shop items, stickers (chunk P4-07)

- Hats (cap, bow, top hat, helmet, grad cap, crown) and toys (balloon, lollipop, ball, teddy, kite, wand, trophy) as SVG symbols on a 64x64 grid, placed at the rig anchors.
- Boss prizes become small badge-like hats in the same style.
- Sticker book: stickers get a white die-cut border (a 3 px white stroke behind the art) and a slight rotation. Emoji stickers stay until object art covers them; the border treatment makes both look consistent.
- Scenes (meadow, beach, candy, rainbow, space, castle) use the scene generator from section 7.

### 6.5 Object art (chunks P4-13 to P4-15)

Pictures for counting, picture words and Spanish vocabulary. 64x64 grid, same flat two-tone style, under 900 bytes each, in `src/js/16-art-a.js`, `-b`, `-c` as `Object.assign(ART, {name: '...'})` (ART, `picArt(name, size)` and `picFor(word, emoji)` live in `src/js/15-pics.js`; the names `art` and `artSVG` are already taken by the a/an helper and the Art Studio).

| Set | Contents (40 each) |
|-----|--------------------|
| A | Counting and core nouns: apple, banana, cookie, ball, star, fish, duck, car, flower, cat, dog, pig, sun, bus, hat, bed, cup, fox, bat, bug, hen, box, map, pen, web, frog, crab, drum, ship, milk, tent, hand, gift, flag, cake, kite, bike, rose, bone, nose |
| B | Remaining picture words (vowel teams, r-controlled, diphthongs) and the Spanish units: animals, food, body, family, house, clothes, school |
| C (stretch) | Science and remaining Spanish units, places, transport, weather, feelings faces |

`picFor(word)` returns object art when it exists, else the emoji, so replacement is gradual and nothing breaks. The emoji allowlist test still applies to whatever remains.

## 7. Map and world scenes (chunk P4-09, Opus)

- **Scene generator**: `scene(recipe)` returns one static SVG used as the world backdrop and as the small world chip.
  Recipe: `{sky: [top, bottom], hills: [{c, h, wave}], ground, props: [{k, x, s}]}`. Prop library of about 22 symbols: tree, pine, palm, cloud, sun,
  moon, stars, mountain, cactus, candy cane, lollipop, coral, fish, bubbles, rocket, planet, castle, volcano, crystal, gears, book stack, clock tower.
- One recipe per world (30+ worlds), each visually distinct by colour family and props. Recipes live next to the world definitions.
- **Path**: a smooth dotted trail in white at 70% opacity snaking between nodes; the walked part is solid.
- **Nodes**: 64 px circles with ledge; boss nodes 84 px showing the boss.

| State | Look |
|-------|------|
| Locked | Grey fill, lock icon, no ledge |
| Open (current) | Subject colour, white skill icon, slow pulsing ring, pet stands next to it |
| Passed | Subject colour, 1-3 small stars under it |
| Mastered | Gold rim |
| Skipped by placement | White with a check |
| New | Small "NEW" tag |

- World picker strip at the top: chips grouped by grade, current world highlighted.
- Performance: only the selected world's nodes are in the DOM; the scene is one SVG with no animation except an optional drifting cloud (transform only).

## 8. Motion and sound (chunk P4-17)

### 8.1 Motion

| Moment | Motion |
|--------|--------|
| Screen change | Fade + 8 px rise, `--t-slow`. No sliding whole screens sideways |
| Button press | Squash onto ledge, `--t-fast` |
| Right answer | Choice pops (scale 1 -> 1.08 -> 1, `--spring`), check icon draws in, pet does `cheer` |
| Wrong answer | Prompt shakes 6 px twice (240 ms), choice turns amber; pet does `oops` |
| Star earned | Star flies to the star chip (transform), chip bumps |
| Round complete | Stars pop in one by one (120 ms apart), confetti of at most 40 pieces for 1.2 s |
| Streak | Flame chip pulses once |

Rules: animate only `transform` and `opacity`. No `filter`, `backdrop-filter`, or animated `box-shadow`. Nothing loops forever except the pet's idle bob and the current node's pulse. Calm mode removes shakes, confetti and loops.

### 8.2 Sound

All sounds stay synthesized (WebAudio), no audio files.

| Sound | Character | Length |
|-------|-----------|--------|
| Tap | Soft wooden tick | 30 ms |
| Right | Two rising notes (major third) | 180 ms |
| Try again | One soft low "boop", quieter than Right | 150 ms |
| Star | Bright ping with a short tail | 250 ms |
| Coin | Double ping | 200 ms |
| Chest open | Rising arpeggio | 700 ms |
| Unlock / new world | Four-note fanfare | 1.1 s |
| Boss hit | Short zap | 200 ms |
| Whoosh | Filtered noise sweep | 250 ms |

Rules: one master gain; effects never louder than the voice; duck effects and music to 30% while speech is playing; never more than 3 effects at once;
separate switches for Voice, Sound effects and Music in Grown-ups (today sound and music share one switch); optional light vibration (10 ms) on key taps where supported.

## 9. Migration plan, screen by screen

Order matters: tokens, then icons, then components, then screens from most seen to least seen. Each row is one chunk; behaviour never changes in these chunks.

| # | Screen | Chunk | What changes |
|---|--------|-------|--------------|
| 1 | Setup and onboarding | P4-12 | Welcome with the app logo, name, pet picker with SVG pets, grade picker; spoken guidance; 3 steps with progress dots |
| 2 | Home | P4-08 | Hero card with SVG pet and scene, stat chips (stars, coins, streak, game time), path cards per subject with icons and meters, a "Today" row (review due, fact sprint, puzzle of the day), secondary actions as an icon row, version in the footer |
| 3 | Map | P4-09 | Scenes, new nodes, world picker (section 7) |
| 4 | Question screen | P4-10 | Clean top bar (back, progress dots, streak chip), prompt area on a white card, new keypad and choices, hint panel, pet in a corner bubble, amber/green feedback. Portrait and landscape layouts |
| 5 | Rewards: round complete, chest, boss intro and fight, test out | P4-11 | Star pop sequence, "why you earned this game time" list with icons, next-step primary button, SVG bosses |
| 6 | Grown-ups and Pet Care | P4-12 | Pet Care gets the SVG pet with moods and icon meters. Grown-ups: plain, adult layout: sections as cards, switches, segmented controls, readable tables. Uses `--fs-2`, no cartoon styling |
| 7 | Pet Shop, Stickers | P4-07 | SVG wearables, item cards with price chips, die-cut stickers |
| 8 | Game Room hub and shared game chrome | P4-16 | Hub cards, game-time chip, pause and exit buttons. Game canvases themselves are not restyled |
| 9 | Brain Teasers, Fact Sprint, streak calendar, report card | built new | Built with tokens and components from the start (they come after P4-01 and P4-02) |
| 10 | App icon, splash, manifest colours | P4-12 | New star mark on `--brand`, maskable-safe padding, `theme_color` = `--paper` |

For each screen chunk: take "before" screenshots first, restyle, take "after" screenshots at 600x960, 1024x600 and 380x780, list both sets in PROGRESS.md.

## 10. Accessibility checklist (used by every P4 chunk and audited in P6-01)

- [ ] Text contrast at least 4.5:1 (3:1 for 24 px bold and larger); verified by `tools/contrast.js`.
- [ ] Every tappable thing is at least 48x48 CSS px with 8 px between targets (36 px allowed only inside 9x9 puzzle grids on phones).
- [ ] Colour is never the only signal: right and wrong also use an icon and a sound; puzzle symbols also differ by shape.
- [ ] Sound is never the only signal: every spoken prompt can also be read or seen, except listening tasks, which have a replay button and a "no voice" fallback.
- [ ] Icon-only buttons have `aria-label`. Decorative SVG has `aria-hidden="true"`.
- [ ] Visible focus ring; logical focus order; Enter and Space activate buttons (helps with external keyboards and switch devices).
- [ ] `prefers-reduced-motion` respected, plus an in-app "Calm mode" switch in Grown-ups.
- [ ] No flashing more than 3 times per second.
- [ ] Text never below 16 px on child screens; layouts survive the browser's 130% text zoom without overlap.
- [ ] Reading content uses Andika; no italics for early readers; line length under 60 characters in passages.
- [ ] No time pressure by default: timers appear only in Fact Sprint and Speed Race, which are optional.
- [ ] Works in portrait and landscape; nothing depends on hover.
