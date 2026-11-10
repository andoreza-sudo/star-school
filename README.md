# Star School

Offline math, reading and Spanish practice for kids, with earned game time. A single-page PWA made for cheap 7-inch Android tablets:
no accounts, no ads, no tracking, and no internet needed after the first load.

**Install on a tablet:** open https://andoreza-sudo.github.io/star-school/ in Chrome, tap the menu, then **Install app**.
Open it once on wifi; it works offline after that. The version number is at the bottom of the home screen.

## Status

- Today (v30): three learning paths (math, reading, beginner Spanish) for roughly K to 2nd grade, a pet and rewards, and a Game Room
  (4x4 Hill Climb, Art Studio, Block Builder) paid for with game time earned by learning.
- Planned: Pre-K through 6th grade, a Brain Teasers section, a full visual redesign, daily fact sprints, spaced review and a grown-ups report card.
  What has shipped so far is in [docs/PROGRESS.md](docs/PROGRESS.md).

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

Bump `VER` in `tools/build.py` on every release so tablets pick up the update. Details in [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md).

Fonts: Andika (SIL Open Font License).
