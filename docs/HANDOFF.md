# Whistlestop (was Star School): handoff plan to v1.0.0 and Google Play

Written 2026-11-20 so the work can be picked up by any later session (or a person) if this one stops.
Read this first, then the top of docs/PROGRESS.md ("Current version", "Next up", the newest log entries) and docs/PLAY-SETUP.md.

## 1. Where things stand (2026-11-20)

- **Live:** v189 on GitHub Pages (https://andoreza-sudo.github.io/star-school/), from `main`.
- **Branch `claude/beautiful-rubin-1urk3d`:** v190 = v189 plus the owner-approved grade 6 lesson words (batch 6m). Its full
  `bash tools/check.sh` was running when this was written; if it passes, PR it to `main` and merge (see section 4).
- **Branch `rename` (worktree /home/user/wt-rename, v191, in progress):** rename to **Whistlestop**, the owner's domain
  **whistlestoplearning.com**, a privacy policy page (`privacy.html`), an `/.well-known/assetlinks.json` template, and an ordered
  owner checklist in docs/PLAY-SETUP.md. Internal keys (`starschool-v2…`, the service worker cache prefix, IndexedDB name) stay,
  so no save is lost. Recorded voice lines that say "Star School" are listed for the owner, not re-recorded.
- **Everything the owner asked for is built and approved:** lessons for every math stop Pre-K to 6, K-2 reading shapes,
  Spanish and Discover lessons, mistake hints, story themes (Grown-ups only, up to 3 per child), Ask the pet (audio-first),
  a move and a boss per game, job props on maps, the 4-digit Grown-ups PIN with Forgot PIN, picture passwords per child,
  Give game time, the Play free sample (first 5 stops of each subject's start world for the child's grade, all games, Puzzle of
  the Day, one child) and the $9.99 `unlock_all` purchase with `api/ack.js` acknowledging purchases on Vercel.
- **Reviews:** Fable's final release review and its confirming review are fixed (RC-1 v188, RC-2 v189). Verdict: ready for
  v1.0.0 after the owner's tablet test.

## 2. Remaining steps, in order

| # | Step | Who | Done when |
|---|---|---|---|
| 1 | Release v190 (grade 6 words) | Claude | check.sh passes (known load flakes rerun alone), PR merged, live sw.js shows v190 |
| 2 | Finish v191 rename (branch `rename`), Fable review of the rename diff, full check, release | Claude | live site says Whistlestop; old saves and old backup files still load |
| 3 | Owner reads `.claude/RENAME-READ.md` (new lines; recorded lines that say the old name) and says which to re-record | Owner | approval in chat; then `node tools/en-audio.js --teach` (ONLY with the owner's go-ahead) |
| 4 | Vercel: import the repo as a new project, add whistlestoplearning.com, check `/`, `/sw.js`, `/privacy.html`, `/.well-known/assetlinks.json` | Owner (Claude can check URLs) | site loads on the domain over HTTPS |
| 5 | Email forward hello@whistlestoplearning.com | Owner | a test mail arrives |
| 6 | Owner's tablet test of the live app (checklist in section 5) | Owner | owner reports; Claude fixes anything found, release |
| 7 | Play Console: create the app (Families, target ages, content rating, data safety: no data collected), confirm the package name (proposed `com.whistlestoplearning.app`; cannot change after first upload), payments profile | Owner | app shell exists |
| 8 | Package the TWA (Bubblewrap or PWABuilder), start URL `https://whistlestoplearning.com/?src=play`, Play Billing on; put the app-signing SHA-256 into `/.well-known/assetlinks.json` and the package into `PLAY.PKG` | Claude prepares, owner uploads | the app opens full screen with no browser bar |
| 9 | `unlock_all` in-app product at $9.99; Google service account + Vercel env vars `PLAY_SERVICE_ACCOUNT`, `PLAY_PACKAGE` (docs/PLAY-SETUP.md section 3) | Owner | variables set in Vercel |
| 10 | Licence-tester purchase: buy, wait 5 minutes, confirm in Play Console the order is NOT refunded and the Vercel log shows 200 | Owner + Claude | acknowledged order seen |
| 11 | Internal or closed testing (12 testers for 14 days may apply to new apps; the owner's account already has an approved app, so check) | Owner | testing requirement met |
| 12 | Store listing (title "Whistlestop: Kids Math & Reading", short and long description, screenshots from tools/shots.js, privacy URL), submit for review | Owner, Claude drafts text | submitted |
| 13 | Tag v1.0.0 on the release commit | Claude | tag pushed |

The launch plan with budget and marketing is the Claude Docs artifact "Star School Launch Plan"
(https://claude.ai/artifact/2puEc75ez36HiDgxECENov); rename it to Whistlestop when step 2 lands.

## 3. Standing rules (owner's decisions; do not break)

- Every sentence a child sees is approved by the owner. New lines go to a read-through file (`.claude/*-READ.md`, sent to the
  owner) and are gated until approved (`tools/author.js --approve … --by owner` etc.).
- **No text-to-speech recording without the owner's explicit go-ahead in chat.** Use `--dry` to list what would be recorded.
- The xAI key lives only as an environment network secret for api.x.ai; code uses `Authorization: Bearer proxy-injected`.
  Never write a key anywhere; never ask the owner to paste secrets in chat.
- A child's voice never leaves the tablet. No analytics, no accounts, no ads.
- Content: no magic or spells themes, no evolution themes (dragons OK), nothing offensive.
- Agents never edit hashes, thresholds, KNOWN lists, fixtures or expected values just to pass. A design change that changes an
  expected value is listed with its reason. Budget changes need the owner (start-up 2.5 MB, index.html 1,000,000 bytes, code
  precache 15 MB, audio 4.5 MB, teacher lines 200).
- Kill only processes whose working directory is your own worktree; never `pkill node`.
- A command blocked by a permission or safety check is reported, not re-sent another way.
- Push only to `claude/beautiful-rubin-1urk3d`; release by PR to `main`, merged with the full 40-character head SHA.
- Models: Fable for reviews and advice (the owner wants a Fable review before each release); Opus for hard work; Sonnet for
  routine work.

## 4. How a release is done

1. Work on a branch in its own worktree (`git worktree add -b X /home/user/wt-X <base>`; symlink `tools/node_modules` from the
   main checkout). Bump `VER` in tools/build.py; rebuild with `python3 tools/build.py`; never merge built `*.vNNN.js`,
   index.html or sw.js by hand (delete and rebuild after a merge).
2. Fable reviews the diff (read-only). Fix what it finds.
3. `bash tools/check.sh` (about 40 minutes). Known load flakes, rerun alone with `node tools/smoke.js --seg <ID>`: P4-17,
   P5-10, P5-03, KINDS2-*, G-RALLY2, LS-STOP end card, G-MV-*; a11y blocks-build and report-lessons.
4. PR to `main` (body ends with the Claude Code line and the session link), merge with the full head SHA, then
   `git fetch origin main && git merge --ff-only FETCH_HEAD` on the session branch and push. Confirm the live `sw.js` shows the
   new VER.
5. After the move to Vercel, `main` deploys there too; GitHub Pages can stay as a fallback until the owner makes the repo private.

## 5. Owner's tablet test (step 6)

Open the app twice so the update installs. Then:
1. Grown-ups: set the PIN; try a wrong PIN; try Forgot PIN; Give game time +5.
2. Children: both children present; turn on picture passwords; switch children.
3. Each child: the map opens on the right stop; a lesson (first step's picture, Step 1 of 6); a practice round with a wrong
   answer (mistake hint); Ask the pet; one game and its boss; Story themes in a word problem.
4. Note anything confusing, slow, or wrong, with the grade and the screen.

## 6. Known open items (not blockers)

- Start-up is about 2.49 MB of the 2.5 MB budget: the next feature needs code moved to a lazy part first.
- Map "longest task" is a little over its 200 ms soft line on a 6x-throttled CPU.
- British spellings outside lesson text (riddles, Block Builder, "tyres", "favourite", "metres", "Practise") are listed in
  PROGRESS "Ideas and issues".
- Bossy R lessons need new pictures; a few Word Workshop stops need a passage-reading lesson shape.
- Job-frame story lines ("Help fill the reef stall!") were left out (would need owner wording and recordings).
- Many old worktrees under /home/user/wt-* and .claude/worktrees can be removed once their branches are merged.
