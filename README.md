# Star School

Offline math, reading and Spanish practice for kids, with earned game time. A single-page PWA made for cheap 7-inch Android tablets:
no accounts, no ads, no tracking, and no internet needed after the first load.

## For parents

**What it is.** Star School is practice in math, reading and Spanish, plus a Discover path (science and social studies) and Brain Teasers (puzzles),
for children from Pre-K through 6th grade. Learning rounds earn stars, coins and game time. The coins dress and feed a pet, and the game time
opens the Game Room. There are no accounts, no ads and no tracking.

**Install on a tablet (add to home screen).** Open https://andoreza-sudo.github.io/star-school/ in Chrome while the tablet is on wifi.
Tap the menu (three dots), then **Install app** (or **Add to Home screen**). Open it once; after that it works with no internet.

**Spanish voices.** Spanish is spoken by recorded voices (a man's voice, and a woman's for the women and girls in the stories and some
units), so it sounds the same on every tablet and needs no Spanish voice on the tablet. The recordings come with the app and work offline
after the first visit. English questions are read by the tablet's own voice.

**Cheer voices.** The praise after a right answer ("Great job!", "Way to go!"), the try-again lines and the well-done lines at the end of a
round or game are recorded in six friendly voices, three women and three men, taking turns so the same voice does not cheer twice in a
row. In Grown-ups, **Sound and voice**, **Cheer voices** picks Mixed (the default), Female, Male, or Tablet voice (the tablet's own voice,
as before); it is kept for each child. When you record your own cheers in **Your voice**, yours play and the recorded voices do not. The
recordings come with the app and work offline.

**How updates arrive.** Whenever the tablet is on wifi and the app is opened, it checks for a new version and keeps it ready; the new version
starts the next time the app is opened (close it fully once and open it again). The version is at the bottom of the home screen
("Star School 1.0.0", then the build number) and in Grown-ups, under **About Star School**. Progress is kept when the app updates.

**Privacy.** The app works offline and keeps progress only on the device it runs on, in the browser's own storage. Nothing is sent anywhere.
Voice recordings you make stay on the device too. Your child's Spanish "Say it!" recordings never leave the tablet: the tablet checks them
itself (by its own on-device listening, or by comparing with the recorded Spanish), keeps the last few for the Listening corner in Grown-ups,
and deletes them automatically (after 1 day unless you choose 1 week or not to keep them). Clearing the browser's site data erases progress, so use **Save a backup** in Grown-ups
now and then. Grown-ups is the labelled button at the top of the home screen. Tap it and type your 4-digit **Grown-ups PIN**; the PIN keeps
children out of the settings. The first time, answer the times-table question, then choose a PIN and type it again (**Change PIN** is in
Grown-ups). Forgot it? Tap **Forgot PIN?** on the number pad and answer three multiplications to choose a new one (a wrong answer waits 15
minutes; progress is kept). Five wrong PINs in a row make the pad wait a minute, then longer.
**Erase everything** and deleting a child ask for the PIN again first. If you erase by mistake, Grown-ups offers **Undo erase** (under Backup)
until the app is opened again.
With more than one child, each child can have a **picture password** (3 pictures in order), set in Grown-ups under Children, so brothers and
sisters cannot play as each other. **Game time**: in Grown-ups you can give 5, 10 or 15 minutes, or take 5 away; it goes straight into the
bank, does not count as learning, and the daily limit still applies.

**Licences.** Lettering is Andika by SIL International, under the SIL Open Font License 1.1 ([LICENSES/OFL-Andika.txt](LICENSES/OFL-Andika.txt);
also in Grown-ups, About Star School). Everything else was made for Star School.

## Release notes: 1.0.0

- **Subjects.** Math Adventure, Reading Adventure and Spanish Adventure, each a map of worlds and stops from Pre-K to 6th grade (counting and
  shapes through fractions, decimals and ratios; letters, phonics, sight words, stories and comprehension; beginner Spanish words, phrases and
  mini dialogues). Discover covers science, geography and civics. A short placement helps a child start at the right world.
- **Practice.** Mixed practice, the Tricky Mix and a Daily Review bring missed questions back; Fact Sprints build speed; daily missions, streaks
  and stickers keep it fun; hints and step-by-step help; tracing for letters and digits; the tablet's voice reads questions aloud.
- **Brain Teasers.** Sudoku, MathDoku, logic grids, mazes, patterns, tangrams, Robot Path, riddles, memory match, copy cat, cube counting,
  rotations, symmetry, word search and unscramble, with a Puzzle of the Day.
- **Pet and rewards.** A drawn pet that grows, a Pet Shop with wearables and scenes, Pet Care, a sticker book and a reward chest after each round.
- **Game Room.** Six games paid for with game time: 4x4 Hill Climb, Coloring (Art Studio), Block Builder, Star Rally, Snack Stand and Sky Hop.
- **Grown-ups.** Up to four children on one tablet, each with their own progress; grade and level; game-time rules (minutes per round, daily
  maximum, learn first, pause); your own recorded voice lines; a skills table and a printable report card (tap "Practise this next" on a stop that needs
  practice to make it tomorrow's first mission); Star Rally boost gates (a quick number fact to zoom, on from 1st grade); Save a backup, Load a backup and
  Undo; Calm mode (less movement, no confetti) and sound switches; Start over; About Star School with the version, build and licences.
- **Made to be gentle.** Works offline on cheap 7-inch tablets; large 48 px touch targets, readable type, visible focus, nothing relies on colour
  or sound alone; wrong answers are gentle and come back later for another try.

## Status

This is release 1.0.0. What shipped, chunk by chunk, is in [docs/PROGRESS.md](docs/PROGRESS.md). The open ideas are listed there too
(more Discover topics, spaced check-ins, speaking practice in Spanish).

## Docs

| Doc | What it is |
|-----|------------|
| [docs/ROADMAP.md](docs/ROADMAP.md) | The master plan: phases, 102 small chunks, risks, save-data rules |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | How to pick up a chunk, build, test and release. Includes the copy-paste prompt for AI sessions |
| [docs/CURRICULUM.md](docs/CURRICULUM.md) | What is taught in each grade and the exact spec for every skill level |
| [docs/BRAIN_TEASERS.md](docs/BRAIN_TEASERS.md) | Puzzle section design |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | Colours, type, icons, characters, motion, accessibility |
| [docs/PROGRESS.md](docs/PROGRESS.md) | What is done and what is next |

## Build

```bash
python3 tools/build.py   # src/ -> index.html, sw.js, manifest.json, icons (needs Pillow)
node tools/test.js       # checks every question generator
```

Bump `VER` in `tools/build.py` on every change so tablets pick up the update (the release number parents see is `RELEASE` in `src/js/00-core.js`). Details in [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md).

Fonts: Andika (SIL Open Font License, see [LICENSES/OFL-Andika.txt](LICENSES/OFL-Andika.txt)).
