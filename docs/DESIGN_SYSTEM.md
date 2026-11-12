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

Each component is a CSS class set in `src/css/10-components.css`, plus a tiny JS helper in `src/js/14-ui.js` (`UI.*`) that returns its HTML
(text arguments are escaped; `html` arguments are not). A sheet page (`node tools/shots.js components`) shows every variant and state at the
three sizes and checks itself (overflow, words broken over two lines, targets under 48 px, sideways scroll); `comp-sheet` and `comp-toast`
show the live modal and toast over Home.

Built in P4-04 as shipped. Where the planned class name was already used by the app with another look (`.card`, `.chip`, `.meter`, `.tile`,
`.slot`, `.bubble`, `.node`, `.empty`, `.danger`), the component got a new name so old screens do not change until their own chunk switches
them. A bare `.btn` keeps its old look; a variant class opts in. `tools/test.js` fails if `10-components.css` restyles any of those old classes.

Style: a solid ledge under everything you can press (squashes 3-4 px on press, transform only), a soft blur shadow only on panels, sheets and
toasts, a thin gloss (`--hi`) on coloured fills, generous corners. Subject colour comes from a class `.s-math`, `.s-read`, `.s-es`, `.s-disc`,
`.s-bt`, `.s-play` on the component or any parent (sets `--c`, `--c-tint`, `--c-shade`; `.s-play` fills buttons with `--play-shade`).

| Component | Class / helper | Variants and states | Notes |
|-----------|----------------|---------------------|-------|
| Button | `.btn` + `primary`, `soft`, `subject`, `ghost`, `risk` (the planned `danger`); `UI.btn(label, {kind, size, icon, p, id, wide, off})` | sizes `sm` 48, md (default) 56, `lg` 72; `wide`; pressed (`:active` or `.is-press`), focus ring, `:disabled` | Icon + label on child screens. `risk` (danger fill) is for Grown-ups only |
| Icon button | `.btn.icon` (+ `primary`, `subject`); `UI.ibtn(icon, aria, o)` | round 48 (`sm`), 56, 64 (`lg`) | Helper always sets `aria-label` |
| Key | `.keys` grid > `.key`, `.key.go`, `.key.del`; `.keys.abc` letter pad | pressed, disabled | 64 px tall (56 on phones, 48 in short landscape) |
| Choice | `.choice` (+ `pic`, `sym`, `wide`) in a `.picks` grid (`.three`, `.one`); `UI.choice(html, o)` | idle, `.sel`, `.right` (green + check badge + pop), `.wrong` (amber + soft cross badge + shake), `:disabled`/`.off` | Badges are CSS only, so no extra markup is needed |
| Tile and slot | `.piece` (+ `word`, `num`), `.socket` (+ `word`) | piece: idle, `.sel` (lifted), `.used`, pressed; socket: empty (dashed), `.on` (next), `.full`, `.right`, `.wrong` | Shared by build, order, spell |
| Card | `.panel` (+ `tint`, `big`) with `h3` and `p` | plain, tinted (subject), hero | 22 px radius, 2 px line; hero 28 px with a tint wash |
| Path card | `.pathcard.s-x`; `UI.pathcard({p, title, done, total, next})` | per subject, pressed, disabled | Icon badge, title, gauge, "Next: ..." line (ellipsis), play disc |
| Top bar | `.top.tbar` (+ `round`, `adult`) with `.ttl` | home, in-round (dots in the middle), grown-ups | Back button left (`UI.ibtn('back', 'Back', {size: 'sm'})`), title, chips right |
| Stat chip | `.stat` (+ `star`, `coin`, `ticket`, `flame`, `timer`, `.off`); `UI.chip(kind, n, {tap, id})`, `UI.setChip(el, n)` | `button.stat` is tappable; `.bump` when the number changes | Pill, icon + tabular number |
| Meter | `.gauge` > `i` with `--v` (0..1) (+ `grow`, `good`, `lg`, subject); `UI.meter(v, {kind, p, label})` | progress, pet growth, done | 16 px (24 `lg`); the fill moves by transform |
| Round dots | `.dots` > `i` (`.done`, `.try`, `.cur`); `UI.dots(total, cur, res)` | | Fits 10 on a phone top bar; past about 12 questions use a gauge |
| Star rating | `UI.stars(n, of, size, {arc})` -> `.rate` > `.rs(.on)` | 0-3, `arc` lifts the middle star | Filled `--star` on a `--star-shade` ledge, empty `--line` |
| Toast | `UI.toast(text, kind, ms, icon)` -> `#toast.toast` | `good`, `try`, `info`, `streak` | Top-centre pill with an icon disc (on the question screen it sits just under the top bar). Since P4-10 `fb(text, cls, ms)` shows it: `warn`/`bad` try, `again` try with the replay arrow, `info`/`pl-fb` info, `streak` flame, `zap` bolt, anything else good |
| Speech bubble | `.speech` (+ `r`, `l`); `UI.speech(text, side)` | tail bottom-left, bottom-right, left | |
| Sheet / modal | `UI.sheet(html, {stay, onClose})` -> `.sheet-bg` > `.sheet` (`.sh-art`, `h2`, `p`, `.acts`) | slides up (portrait), centred (landscape) | Lives inside `#app`, so `view()` removes it. One primary action |
| Hint panel | `.hintp` > `.hb` + `.hx`; `UI.hint(html, {steps, at, next})` | text, picture (`.hpic`), steps (`.hsteps` li `.on`/`.later`, "Next step" button `#hintnext`) | Amber tint, bulb icon. In rounds, step hints (`hint.k='steps'`, P2-08) use `.hs` instead (`src/css/39-steps.css`): pips, a white work board with an amber ledge (digits used now in an amber ring, new digits in brand blue with a pop, carries and regroup marks in `--read`, the last step's "?" in a dashed amber box) beside or above the caption; the round's Help button reads "Next step" while steps remain |
| Context panel | `details.ctx` > `summary` + `.ctx-b`; `UI.ctx(title, html, open)` | open, closed | Scrolls inside (40vh), 60ch lines, text selectable |
| Segmented control | `.seg` (+ `full`) > `button[aria-pressed]`; `UI.seg(opts, cur, o)`, `UI.segOn(el, cb)` | selected, disabled | Grown-ups and puzzle settings |
| Switch | `label.switch` > `input[role=switch]` + `.sw` + label; `UI.sw(label, on, id)` | on, off, disabled, focus | Replaces raw checkboxes |
| Table | `.tblw` > `table.tbl` (`th`, `td.n`) | | Zebra rows, sticky header |
| Tag | `.tag` (+ `new`, `mast`, `skip`, `chal`); `UI.tag(text, kind, icon)` | | Small pill, 16 px text, sentence case ("New") |
| Empty state | `.blank` > `.bi` + `p` + one button; `UI.empty(icon, line, actionHtml)` | | For "nothing due", "no game time yet" |
| Map node | `.mapnode` (+ `lock`, `open`, `done`, `mast`, `skip`, `boss`); `UI.mapnode({p, state, boss, icon, html, stars, isNew})` | as section 7; `open` pulses a ring | 64 px, boss 84 px. P4-09 owns the map and may change it |

Labels never break inside a word: components set `overflow-wrap: normal`, and the helpers keep hyphenated words ("Grown-ups") whole with `.nw`.

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
| Style | Solid rounded shapes filled with `currentColor`; inner detail as cut-outs or `--ic2`. Two tones (P4-03): a soft second tone for back planes, containers and lesser parts (see 5.2a) |
| Corners | Rounded, radius 1.5 or more. No sharp spikes except star points (rounded 0.75) |
| Detail | Nothing thinner than 1.75 units. Must read at 20 px |
| Perspective | Flat, front view. No gradients, no shadows inside icons |
| Size | Under 600 bytes per icon, coordinates to one decimal |
| Feature icons | Same drawings may be shown at 48-64 px inside a tinted circle "badge" with the subject colour |
| Naming | lowercase, hyphenated: `sound-on`, `skill-add` |
| How (set in P4-02) | Rounded corners come from stroking the inset shape with `currentColor` (stroke-width 3 for r 1.5, 1.5 for star points); cut-outs use `fill-rule="evenodd"`; `--ic2` only where a cut-out cannot work. Full recipe in the header of `src/js/15-icons.js`; review sheet: `node tools/shots.js icons` |

#### 5.2a Two tones (P4-03)

UI icons stay crisp glyphs (they are not illustrations), but most now carry a confident second tone so they match the shaded object art,
the dragon and the ledged components instead of looking like flat 2010 glyphs.

| Rule | Value |
|------|-------|
| Soft tone | `fill="var(--ic3,currentColor)" opacity=".4"` on the element (a stroked soft part uses `stroke="var(--ic3,currentColor)"`). It follows the icon colour on any background: grey-ink on white, pale on a brand fill, mid-blue on a tint. Set `--ic3` to tint it another colour |
| Where | Back planes and containers (house walls, tray, clock face, tub bubbles, lens, the far one of two people, the pages under a book), never the part that names the icon |
| Primary alone reads | Take the soft layer away and the icon must still read; `tools/test.js` fails an icon with no full-colour shape |
| Size | Soft shapes are areas at least 4 units across (or strokes 2.6+ wide), never thin lines or small details |
| Order | Soft shapes first. A soft shape over a primary one vanishes (same colour). A primary detail on a soft area is bold (2.4+ stroke or 3+ unit shape), because on a coloured fill the soft area is pale |
| Symbols stay one tone | `check`, `close`, `plus`, `minus`, `times`, `divide`, `play`, `pause`, `back`, arrows, chevrons, `star`, `heart`, `bolt`: one tone, so keys and small chips stay sharp |
| `--ic2` | Still the knock-out tone for a few inner details (coin face, flame core, trophy star, bulb glint); set it to the fill colour on coloured fills |
| Colour helpers | `.ic-star`, `.ic-flame`, `.ic-good`, `.ic-off`, `.ic-rec`, `.ic-brand`, `.ic-math`, `.ic-read`, `.ic-es`, `.ic-disc`, `.ic-bt`, `.ic-play` in `20-base.css` (icons inside text on old screens; component classes colour their own icons) |

### 5.3 First 40 icons (P4-02)

`star, coin, ticket, flame, home, back, map, play, pause, replay, sound-on, sound-off, speak, gear, lock, check, close, hint, heart, gift,
trophy, target, bolt, paw, bag, sticker-book, gamepad, puzzle, path-math, path-read, path-es, path-disc, plus, minus, times, divide,
backspace, go, calendar, crown`

### 5.4 Remaining icons (P4-03, as shipped: 66 new, 7 of the first 40 refined)

| Group | Icons |
|-------|-------|
| Utility (29) | `info, warning, question, circle, check-circle, download, upload, trash, edit, mic, record, stop, undo, redo, rotate, flip, eye, timer, clock, chart, user, users, arrow-right, arrow-left, arrow-up, arrow-down, chevron-right, chevron-left, more` |
| Chrome and rewards (20) | `rocket, balloon, party, globe, moon, hat, teddy, image, food, bath, ball, drop, car, nut, palette, blocks, medal, sparkle, review, thumbs-up` |
| Skills (17) | `skill-count, skill-num, skill-shape, skill-frac, skill-abc, skill-story, skill-pattern, skill-array, skill-geo, scale, ruler, ear, doc, music, clap, pin, wave` |
| Refined in P4-03 (same names) | `home` (soft walls), `map` (soft middle panel), `gift` (soft box), `hint` (soft base), `path-disc` (soft lens), `target` (soft ring), `calendar` (soft page) |

Skill icons: `ICO_SK` in `15-icons.js` maps every skill id to an icon and `icoSk(id)` returns it (a skill missing from the map gets its
subject's icon, so new content never shows a blank). Shared drawings are reused instead of drawn twice: `add` plus, `sub` minus, `mult`/`mfact`/`mbig`
times, `dfact` divide, `time` clock, `coins` coin, `data` chart, `meas` ruler, `sight` eye, `spell` edit, `pic` image, `sort`/`build` puzzle,
`eo`/`pv` blocks, `cmp`/`pk_more` scale, Spanish: `es_greet` wave, `es_color` palette, `es_num`/`es_teen` skill-num, `es_animal` paw,
`es_food` food, `es_body` user, `es_family` users, `es_mix` trophy. `SK[id].e` and `PATHS[p].e` stay (the emoji field stays until P4-17
removes the last use); subject icons are `UI.SUBJ_ICON`.

Not drawn in P4-03: the planned `skill-dec`, `skill-alg`, `skill-gram`, `skill-vocab`, `skill-trace` (no such skills yet; the content chunk
that adds one adds its icon, or `icoSk` falls back to the subject icon) and the 19 Brain Teaser puzzle-type icons (P3 not built yet).

Every emoji used as chrome (titles, buttons, tiles, toasts) is replaced by an icon, screen by screen as each screen chunk lands.
Where each icon goes is listed in the P4-03 entry of PROGRESS.md.

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
- As built (P4-06): dino, bird and sea pal (`ocean`) use the same rig, stages, faces, anchors, motion and shading as the dragon
  (shade rim, base moved up-left, translucent white highlight, dark contact accent; light from the top left; no outlines).
  Dino: blue, cream belly and snout, rounded orange plates on the head, back (the `extra` group) and tail, darker spots, stubby arms,
  a thick tail; its egg is pale blue with spots and a plate poking out. Bird: a round yellow chick-bird with a feather tuft, wings
  for arms (they lift on cheer), a fan tail, orange toes and its own faces (`PET_RIG.bird.face`: the shared eyes, the beak is the
  mouth and opens for happy, cheer and hungry); its speckled egg sits in a straw nest. Sea pal: a little aqua whale with a white chin
  and belly (throat grooves), a blue head fin and side fins, blue flippers and flipper feet, light spots and a tail fluke; its egg is
  aqua with white waves and bubbles. Each pet's palette is a `.pet-k-<kind>` block in 41-pet.css made of `--ill-*` tokens.
  Source per pet 4.9-6.4 KB, one drawing at most 8.8 KB (test.js "pets on the rig P4-06"). Review: `node tools/shots.js pets`.

Pet palettes: dragon green `#34B56A` with yellow belly; dino blue `#3E8BFF` with cream belly; bird yellow `#FFC93C` with orange beak; sea pal aqua `#22B8CF` with white belly.

### 6.3 Bosses

Four bosses (Gloop, Robo-Bonk, Captain Inky, Zorp) drawn in the same style, one pose plus a "hit" pose. Silly, never scary. Built in P4-11.

As built (P4-11, `src/js/18-reward-art.js`, `src/css/42-rewards.css`): the bosses use the object-art style of 6.5 (roles `var(--a-x)`,
light from the top left, shade / base / highlight per area, no outlines, gradients, filters or ids) on a 200x200 grid with the ground at y 184,
like the pets. Gloop is a purple jelly with a curl and one tooth, Robo-Bonk an aqua robot with a screen face and springy arms, Captain Inky
a pink octopus in a pirate hat with a curly moustache, Zorp a green three-eyed alien. `RW.boss(name, 'idle' | 'hit')` draws both faces in
one SVG (`.rb-idle`, `.rb-hit`); CSS shows one, and `.bossE.hit` (a zap in the round's top bar) shows the dizzy face with a ring of stars.
A boss name without a drawing returns '' and the caller keeps its emoji. The same file draws the treasure chest (3/4 view, closed and open
with gold and gems), the reward star (the object-art star, and an empty slot), the prize rosette (the costume emoji in the middle) and soft
light rays, and returns the markup of the reward screens (`RW.pre`, `RW.done`, `RW.bossIn`). Review sheet: `node tools/shots.js rewards`.

### 6.4 Wearables, shop items, stickers (chunk P4-07)

- Hats (cap, bow, top hat, helmet, grad cap, crown) and toys (balloon, lollipop, ball, teddy, kite, wand, trophy) as SVG symbols on a 64x64 grid, placed at the rig anchors.
- Boss prizes become small badge-like hats in the same style.
- Sticker book: stickers get a white die-cut border (a 3 px white stroke behind the art) and a slight rotation. Emoji stickers stay until object art covers them; the border treatment makes both look consistent.
- Scenes (meadow, beach, candy, rainbow, space, castle) use the scene generator from section 7.
- As built (P4-07): every item the shop sells or a boss gives is drawn in the pets' style (shade / base / highlight per area, light from
  the top left, a soft dark contact accent where a hat meets the head; roles `var(--a-x)` of 21-art.css, also defined on `.pw-hat` /
  `.pw-toy`; no outlines, gradients, filters, ids, text or `<use>`). Hats: cap (blue, worn a little sideways, gold star), bow, top hat,
  rescue helmet, grad cap, crown. Toys: balloon and kite float above the hand on a string, lollipop and magic wand on a stick, ball,
  teddy, trophy. The 12 boss prizes are badge hats: a headband in the prize's colour with a gold rosette, the prize's emblem (daisy,
  star, party popper, planet, rainbow, flame, gem, clover, moon, lightning, donut, music notes) on its white face; the same emblem is now
  drawn in the boss-intro rosette (`RW.badge`). Drawings: `WEAR[id]` / `WEAR_EMB[id]` in `src/data/d-wear.js`, keyed by the emoji ids the
  save already stores, so saves do not change; an id without a drawing still shows its emoji. Helpers in `src/js/17-wear.js`
  (`wearOf(id)` for petSVG, `wearPic(id, size)` for cards, `wearBox(svg)` for bounds). 64 grid: a hat's bottom centre (32, 60) sits on the
  head, a toy is held at (32, 32). The anchors were lowered onto the head and scaled up (hats 0.78-0.98, toys 0.74-0.98) so a hat is worn
  rather than perched; every item on every pet at every stage stays inside the 200 x 200 viewBox (test-enforced).
  Review sheet: `node tools/shots.js wear` (every item at 96 and 40 px, the emblems in the rosette, every pet x stage wearing every item).
- Pet Shop as built (P4-07, `shop()` in 48-shop.js, `src/css/43-shop.css`): a sticky stage with the pet on its place (Home's drawn
  scenes) wearing what the child tries on; an info bar (item picture, name, coin price or "It is yours", one action: Buy / Put it on /
  Take it off / Need N more); tabs Hats / Toys / Places as a segmented strip; cards with the drawing on a soft well, the name and a coin
  price chip, a blue "Yours" tag, a green "On" tag with a green ring, a gold "Prize" tag for boss prizes, a blue ring on the item being
  tried on. Owned items go on and off with one tap, as before; an item the child does not own is tried on with a tap and bought with
  Buy, then a sheet ("Buy the crown? It costs 60 coins. You will have 4 left." Yes, buy it / Not now). Wide landscape: stage left,
  shelf right.
- Sticker book as built (P4-07, `book()` in 46-home.js): a header card (progress meter, how to win stickers, Puzzle badges), then
  pages of 12 on cream paper with a ring binding (two pages side by side from 560 px). A collected sticker is its emoji (collectible
  content) cut out as a die-cut sticker: a white border that follows the picture (stacked text shadows), a soft drop shadow, a slight
  turn, a "x2" pill for doubles. An empty slot is a soft cream square with a faint star (no filter).

### 6.5 Object art (chunks P4-13 to P4-15; style reset in P4-13b)

Pictures for counting, picture words and Spanish vocabulary, in `src/js/16-art-a.js` (set A, in index.html), `src/data/d-art-b.js` (set B, in the data file since P4-14) and `src/data/d-art-c.js` (set C, P4-15, the same way) as `Object.assign(ART, {name: '...'})`
(ART, `picArt(name, size)` and `picFor(word, emoji)` live in `src/js/15-pics.js`; the names `art` and `artSVG` are already taken by the a/an helper and the Art Studio).
Reference: set A (`node tools/shots.js art`). This section replaces the flat two-tone rule of 6.1 for object art.

**The bar.** Every picture reads as THE word, with no other plausible name, for a 4-year-old at 24 px, at 48 px and at 1em inside a question.
It should look like a current, well-made kids' app: soft, chunky, with real volume. If a picture could be called something else
(ladybug for bug, mug for cup, glove for hand, boat for ship), add the cue that settles it (a beetle, a saucer, a sleeve, funnels).

| Rule | Value |
|------|-------|
| Grid | 64x64 viewBox, about 2 units of margin, the object fills the square (chunky proportions, no thin long shapes) |
| Light | Always from the top left. Shade on the lower right, highlights on the upper left |
| Tones | Up to four per colour area, all from one hue: base, shade (`2`), highlight (`1`), deep accent (`3`) for creases, holes, insides and contact. White glints (small, often with `opacity`) for shiny things |
| Volume recipe | Shade shape first, then the base shape shrunk about 8-12% and moved 1-2 units toward the light, so a crescent of shade shows on the lower right; then a highlight. Spheres use a crescent path (offset circle) |
| Outlines | None. White or cream objects (bone, milk, plate, pillow) get an edge in their own deep tone (`w3`, `m3`) so they hold on white |
| Faces | Only on animals, the sun and the star: ink ovals with a white glint at the top left, a small smile, pink cheeks at opacity .5-.7. Never on objects or food |
| View | Front or side view; 3/4 view for boxy things (box, gift, tent, drum, cake) so they show two faces |
| Detail | Nothing thinner than about 1.4 units; anything that must read at 24 px at least 2.5 units. Small decorative detail is fine when the silhouette already reads |
| Colour | Only `var(--a-x)` roles from `src/css/21-art.css`, which map to the `--ill-*` palette in `00-tokens.css` (13 hues x 4 tones + white and ink). An element with no fill is ink. `currentColor` is allowed but avoided (it follows the parent text colour) |
| Hues | r red, o orange, y yellow, g green, c aqua, b blue, v purple, p pink, n brown, t tan, s skin, m cream, e grey, w white (w, w2, w3), k ink (k, k2) |
| Elements | `<path>`, `<circle>`, `<ellipse>`, `<rect>`, self-closing. Attributes: geometry, `fill`, `stroke`, `stroke-width`, `opacity`, `transform="rotate(a cx cy)"` |
| Not allowed | ids, `<defs>`, gradients, masks, clip paths, patterns, filters, `<use>`, text, `style`, `url()`, raw hex. Gradients are not used: the same picture often appears several times on one screen (counting), and gradient ids would repeat |
| Size | Up to 2,500 bytes and 40 elements per picture, coordinates to one decimal; set A is about 53 KB in all |
| Review | `node tools/shots.js art` (24/48/96 px on white and on a tint) and `art-question` (inside a real question at 380x780). Look before shipping |
| Checked by | `tools/test.js` "art set A" (rules above, every role maps to an `--ill-*` token). Sets B and C add their names to a copy of that check |
| Set B check | `tools/test.js` "object art set B P4-14": the same rules, every number on the 64 grid, each word asked for by content, drawings shown by picture words and Spanish units. Review: `node tools/shots.js art-b art art-b-question` |
| Set C check | `tools/test.js` "object art set C P4-15": the same rules and limits as set B, plus every art name used by a Spanish item has a drawing and bank pictures (vocabulary, Discover) show it; picture, build, digraph and syllable questions and Spanish units show the drawings. Review: `node tools/shots.js art-c art art-c-question` |

How set A was authored: shapes were written with small helpers (volume, crescent, eye, rotate) in a scratch script and the output pasted into `16-art-a.js`;
the file is the source of truth. Any authoring approach is fine as long as the output follows the rules.

| Set | Contents (40 each) |
|-----|--------------------|
| A | Counting and core nouns: apple, banana, cookie, ball, star, fish, duck, car, flower, cat, dog, pig, sun, bus, hat, bed, cup, fox, bat, bug, hen, box, map, pen, web, frog, crab, drum, ship, milk, tent, hand, gift, flag, cake, kite, bike, rose, bone, nose |
| B | Remaining picture words (vowel teams, r-controlled, diphthongs) and the Spanish units: animals, food, body, family, house, clothes, school |
| B as built (P4-14) | balloon book moon sock cow cheese bell bird egg pencil plane bread tree coat foot cloud rainbow house grapes truck train tooth shirt mouth mouse table horse bee turtle water ear owl helicopter rocket tie boots dice chair bear dress: the 40 picFor words used most by the content that had no drawing (count in PROGRESS P4-14). Spanish items name their drawing in the `art` field (jacket uses `coat`, socks `sock`, class `bell`, airplane `plane`, good night `moon`) |
| C (stretch) | Science and remaining Spanish units, places, transport, weather, feelings faces |
| C as built (P4-15) | pizza snowflake elephant icecream beach rabbit sunflower giraffe road tub lion backpack dish school snowman window shell cap shoes eraser scissors soap sofa paper chick spoon pants butterfly church motorcycle leaf door sheep umbrella storm boat clock books lamp gamepad: the next 40 picFor words with no drawing, counted as for set B (PROGRESS P4-15). Shared pictures by art name: Spanish restaurant `dish`, library `books`, bathroom `tub`, garden `sunflower`, living room `sofa`, street `road`, winter `snowman`, it is raining `umbrella`, it is snowing `snowflake`, it is cool `leaf`, there is a storm `storm`, to eat `pizza`, to play `gamepad`, big `elephant`, tall `giraffe`, clean `soap`; and set A/B drawings for park `tree`, bicycle `bike`, it is sunny `sun`, it is cloudy `cloud`, to read `book`, to write `pencil`, slow `turtle`, pretty `flower`; vocabulary cold `snowflake`, big `elephant`, small `mouse`, sailboat `boat`, bathtub `tub`, seashell `shell`. Feelings faces, people, calendar pages and gestures stay emoji (reasons in PROGRESS P4-15). The snowman keeps coal eyes and a carrot nose: they are what make him a snowman, the one face on an object |

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

As built (P4-09, `src/js/43-scenes.js` `SCN`, data in `src/data/d-scenes.js`, CSS `src/css/47-scenes.css`, tokens `--sc-*`):
- Every world band is a scene: a CSS gradient from its sky (two `--sc-*` tokens, the second at the horizon) to its ground, a ledge in
  the ground's `-2` tone, and one SVG: sun (or moon and stars) top left where the light comes from, clouds, light rays (reef), a papel
  picado garland (plaza, fiesta, repaso), 2 horizon ridges (hills, peaks, blocks for skylines, puffs, a cave ceiling hanging from the
  top, the sea behind a beach), rolling ground (a soft crest every 200-260 px, every other layer a shade deeper, a light rim), the
  world's landmark (clock tower, volcano, rocket, castle, fountain ...), props down the sides with small companions in front, and
  ground marks (tufts, pebbles, sparkles, bubbles, sprinkles). 29 themes, 94 props (64 drawings and 30 hue variants), 35 worlds; worlds that
  share a name share a theme, others change landmarks or props (Letter Meadow, Story Summit, La Casa).
- Props use the object-art style of 6.5 (shade, base up-left, highlight, ink ground shadow at .1, tokens only) in a compact
  language (`d-scenes.js` header). They are placed only where no stop (disc, ring, ledge), label, New tag, world title, Test out
  banner, pet or trail is, so the map stays readable; stops are never on a prop.
- Quiet: every scene token except the night skies keeps `--ink` at 7:1 and each path colour at 3:1 (stop rings), in tools/contrast.js.
- Cheap: props are stamped into shared layers (one path per shape position and look, so all tree crowns of a scene are one path):
  at most about 70 elements and 36 KB a scene; at most 24 props a scene; scenes are cached by what they depend on.
- Trail: a worn path (ink rim at .1, pale cream bed) with stepping stones (grey shade, white-2 stone, white gloss) every 25 px, gold
  stones up to the current stop ("the walked part"), and a little plank bridge with rails over each gap between two worlds.
- No ids, gradients, filters, `<use>` or text inside the SVG; no animation (reduced motion and calm mode need nothing).
- Review: `node tools/shots.js scenes` (every world, a sheet) and `scene-math`, `scene-read`, `scene-es`, `scene-disc`.

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

### 8.3 As built (P4-17, v131)

- Motion tokens: the four in 2.4 plus three moment tokens in `00-tokens.css`: `--t-shake` 240 ms (wrong-answer shake), `--t-cele` 1200 ms
  (confetti and other celebrations), `--t-loop` 2400 ms (one idle loop: pet bob, the current stop's pulse). In the chrome CSS
  (10-components, 20-base, 42-question, 42-rewards, 43-shop, 46-home, 47-gfx, 48-game-hub, 48-setup-grown-care, 48-teasers, 50-motion)
  every animation and transition runs for one of them (or a `calc()` of one) with `--ease`, `--spring`, `linear` or `ease-in-out`.
  Every CSS file, the parts included, animates only `transform` and `opacity`; the two exceptions are inside games (Hill Climb's fuel
  gauge width, the colouring page's fill), named in the test.
- Screen change: `#app` fades in with an 8 px rise (`--t-slow`, `--ease`); overlays fade in (`--t-slow`); sheets and toasts as P4-04.
  Press: `.btn` squashes onto its ledge (`--t-fast`). The legacy aliases (`--bg`, `--blue` ...) are gone.
- Particles are drawn, never emoji: `burst(x, y, kind)` (12-speech.js) throws 10 shaded pieces (Pet Care's heart, star and sparkle
  drawings, plus a bolt and a coin): `star` for a right answer, `heart` for Home's pet tap, `zap` for a boss hit, `coin` for a balloon.
  `confetti(n)` is the drawn `RW.burst` on the body (fixed, above overlays), at most 40 pieces for 1.2 s. The boss life bar is a shaded
  red pill that shrinks with `scaleX`.
- Nothing loops forever except the pet's idle (bob, shadow, blink), the current stop's pulse, Pre-K's side-by-side count (the question
  itself) and Hill Climb's low-fuel blink. The chest rattles 4 times (sound too), Home's thought bubble bobs 4 times.
- The reward screen puts every sticker, earned row and message card in its place at once as a faint slot (`.rw-wait`: the card or
  tile at 40%, a row keeps its icon disc) and shows them in turn, so nothing on the screen moves while they arrive.
- Reduced motion (OS) and Calm mode (new Grown-ups switch "Calm mode: less movement, no confetti", saved as `S.calm`, read with a
  default; every screen adds `html.calm`): every animation and transition ends at once (20-base.css), and no particle is shown
  (`.burst`, `.rw-burst`, `.fly`, `.pc-fx`). Everything still reads from the screen itself (the green choice, the tick, the toast,
  the hearts, the counts).
- Sound (`10-sfx.js`): the set in 8.2 retuned to soft waves (sine, triangle) at those lengths, plus `star` (the star landing on its
  chip) and `tick` (the last seconds of Balloons, Speed Race and Fact Sprint, which used to beep even with sound off). One master
  gain at .8; each effect has its own gain node and a 4th effect at once fades the oldest out; while the voice talks (speech or a
  recorded clip) the master ducks to 30%. `tone()` and `noise()` (used by the games) are silent with Sound effects off; music keeps its
  own switch. Measured levels (test.js "motion and sound P4-17", envelope x wave loudness): tap .03 (the quietest), coin .04,
  whoosh .035, fanfare .056, star .058, Try again .071 (under Right .094), open .075, boss hit .10; all under .13. No vibration
  (left out: it is optional and many tablets have none).

## 9. Migration plan, screen by screen

Order matters: tokens, then icons, then components, then screens from most seen to least seen. Each row is one chunk; behaviour never changes in these chunks.

| # | Screen | Chunk | What changes |
|---|--------|-------|--------------|
| 1 | Setup and onboarding | P4-12 | Welcome with the app logo, name, pet picker with SVG pets, grade picker; spoken guidance; 3 steps with progress dots. Shipped (P4-12): one page of three numbered step cards (name in a drawn field, pet egg cards, grade tiles); a step's number turns into a green tick when done; a speaker reads the steps; two columns with "Let's go!" under the pets on a wide landscape screen; styles in `src/css/48-setup-grown-care.css` |
| 2 | Home | P4-08 | Hero card with SVG pet and scene, stat chips (stars, coins, streak, game time), path cards per subject with icons and meters, a "Today" row (review due, fact sprint, puzzle of the day), secondary actions as an icon row, version in the footer |
| 3 | Map | P4-09 | Scenes, new nodes, world picker (section 7) |
| 4 | Question screen | P4-10 | Clean top bar (back, progress dots, streak chip), prompt area on a white card, new keypad and choices, hint panel, pet in a corner bubble, amber/green feedback. Portrait and landscape layouts. Shipped (P4-10): the dots form a track the drawn pet walks along to a gift, with its speech bubble; streak (flame) and star chips; the card has a subject-colour top edge; kinds use `.key`, `.choice`, `.piece`, `.socket`; right and wrong carry badges and a toast; styles in `src/css/42-question.css` |
| 5 | Rewards: round complete, chest, boss intro and fight, test out | P4-11 | Star pop sequence, "why you earned this game time" list with icons, next-step primary button, SVG bosses |
| 6 | Grown-ups and Pet Care | P4-12 | Pet Care gets the SVG pet with moods and icon meters. Grown-ups: plain, adult layout: sections as cards, switches, segmented controls, readable tables. Uses `--fs-2`, no cartoon styling. Shipped (P4-12): Grown-ups is a column of cards (two on a wide screen) built with `GW.card` (icon disc + title + line), fields (`.fld`), switches, segmented rows, a sticky-header table and a closed App log; the report card uses the same cards and keeps its Print online note. P5-07 adds a Backup card (Save, Load, Undo last load; the Save buttons carry the online note) above Start over, and a summary sheet for loading. P5-10 adds a Children card after the summary (a row per child: their pet on their place, name, stars, a "Playing now" tag, 48 px Rename and Delete icon buttons; Add a child, Who is playing?), a delete sheet that asks twice, and "Save all children" in Backup. The "Who is playing?" picker (more than one child, at every start) is one big card per child: the pet on its drawn place, the name, a star count; two columns on a phone, one row on a wide screen; Home's top bar gets a hold-to-switch button (`users` icon). Styles in `src/css/45-profiles.css` Pet Care stands the pet on Home's drawn scene (also the shop stage), meters and snacks in cards, two columns in landscape; care actions show drawn hearts, bubbles, stars and sparkles (`careFx`, none with reduced motion or calm mode) |
| 7 | Pet Shop, Stickers | P4-07 | SVG wearables, item cards with price chips, die-cut stickers |
| 8 | Game Room hub and shared game chrome | P4-16 | Hub cards, game-time chip, pause and exit buttons. Game canvases themselves are not restyled. Shipped (P4-16, `src/js/59-game-hub.js`, `src/css/48-game-hub.css`, both in `games.<VER>.js`): the hub is a drawn fair (Ferris wheel, big top, stalls, hot-air balloons, bunting, hills; 960 x 180, the middle third is what a phone sees) on a scene-token sky, with the game time on a drawn orange ticket (star stub, cream face; grey with "No game time yet" and Go earn game time when there is none), then one card per registered game (`GH.reg`): its own picture on a 240 x 100 grid in the object-art style on a scene-token backdrop (a red jeep on a hill with bolts and a finish flag; an easel with a rainbow, a palette, brush and crayons; a block island on the sea with a tree, TNT and a block dropping in), the name, one line, a play disc in the card's colour; "Needs game time" or a lock reason as a pill on a washed picture. Every screen of every game has the shared top bar `.gh-top` (Back on menus, Pause on play screens, the game's badge and name with the picture name under it, icon tools, chips, the ticket time chip that turns amber with the last seconds, Hill Climb's sound button; over a canvas as `.gh-hud`), the same pause sheet (the game's picture, "Paused", Keep playing / Quit; the game-time clock holds) and the same end card `.gh-end` (picture or the child's finished picture, game name, title, stars, stat tiles, icon lines, one primary action; rays and drawn confetti for a win; side by side in short landscape) |
| 8b | Star Rally, the racing game (G-02) | G-02 | Built new on the P4-16 chrome: `GH.reg` card (a red kart from behind racing a fox to a checkered arch), the shared top bar over the canvas (`.gh-hud`: Pause, place, lap, sparkles, time), pause sheet and end card (a podium with the first three as animal faces or the child's kart). The race is a pseudo-3D road on a canvas: every sprite (5 animal karts, 3 car shapes in 8 paints with 8 stickers, 15 roadside things, an arch, a boost gate, sparkles) and the 4 places' far and near layers are SVG in the 6.5 object-art style turned into canvases once; road colours are `--a-*` roles and skies `--sc-*` tokens read from CSS. Menu, garage and race controls in `src/css/49-game-race.css` (tokens only; 96-132 px steer buttons with a ledge) |
| 8c | Snack Stand (G-04a) | G-04a | Built new on the P4-16 chrome (`GH.reg` card: the stand with a striped awning, a cat ordering an ice cream; shared top bar with Pause, coins and time; pause sheet; end card with the child's stand and a Closed sign). HTML and inline SVG, no canvas: the place behind the stand (park, beach, snowy hill, fair, moon; 400 x 200, `--sc-*` sky), an awning redrawn with as many stripes as the width needs (the scallops keep their shape), a sign that flips to Closed, customers (the app's ART animals) with order bubbles of 48-84 px food pictures that tick as the food goes on the plate, a patience heart bar in Busy, the counter (labelled Undo, the plate drawn as the snack builds up, Serve, all 64 px+), station tabs and food buttons (64 px+, picture and name), a grill with two pans, a till with drawn coins. Food pictures reuse ART (bread, cheese, egg, cookie, cake, milk, pizza, apple, grapes) and add tomato, lettuce, four ice creams on cones, four juices, hot cocoa, a star cookie, pancakes, in the 6.5 style; decorations (flower pot, little tree, balloons, menu board, bunting, lantern, bell, tip jar, helper bird) the same. CSS `src/css/49-game-snack.css` (tokens only; counters in wood, mint tiles or candy stripes from `--ill-*`) |
| 9 | Brain Teasers, Fact Sprint, streak calendar, report card | built new | Built with tokens and components from the start (they come after P4-01 and P4-02) |
| 10 | App icon, splash, manifest colours | P4-12 | New star mark on `--brand`, maskable-safe padding, `theme_color` = `--paper`. Shipped (P4-12): a shaded star with a face (light rim top left, shade rim and ledge bottom right, two sparkles) on `--brand` with a soft gloss, drawn by `tools/build.py` at 4x and scaled to 192 and 512; full bleed and opaque, everything inside the 40% safe circle, so both files are listed as `any` and `maskable`; `theme_color` and `background_color` are `--paper` |

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
- [ ] No time pressure by default: timers appear only in Fact Sprint and Fact Race (once Speed Race), which are optional.
- [ ] Works in portrait and landscape; nothing depends on hover.
