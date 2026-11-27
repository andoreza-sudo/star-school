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
| 1 | Release v190. It is NOT on `main` yet (`git log origin/main` shows f23a64d = v189). Rerun `bash tools/check.sh` on the session branch, then PR and merge (section 4) | Claude | live `sw.js` shows v190 |
| 2 | Finish v191 rename (branch `rename`, worktree /home/user/wt-rename; commit it often), Fable review of the rename diff (also verify that non-index navigations such as privacy.html and assetlinks never overwrite the cached index.html), full check, release | Claude | live site says Whistlestop; old saves and old backup files still load |
| 3 | Owner reads `.claude/RENAME-READ.md` (new lines; recorded lines that say the old name) and says which to re-record | Owner | approval in chat; then `node tools/en-audio.js --teach` (ONLY with the owner's go-ahead) |
| 4 | Vercel, **two projects from the same repo** (owner decision 2026-11-20: app on a subdomain; docs/PLAY-SETUP.md step 1; production builds from `main` only). Project A (repo root) gets **app.whistlestoplearning.com** (a CNAME `app` record): it serves the app, `/privacy.html` and `/.well-known/assetlinks.json`, which must return 200 with no redirect **on app.whistlestoplearning.com**. Project B (Root Directory `site`) gets **whistlestoplearning.com** (apex, the static info page `site/landing.html`) and **www**, redirected to the apex. Saves are per origin, so only `app.` may ever serve the app; the apex has no app files and never registers the service worker. Vercel handles HTTPS. Check Vercel's plan terms: Hobby is non-commercial, so a paid app likely needs Pro | Owner (Claude can check URLs) | `/`, `/sw.js`, `/privacy.html`, `/.well-known/assetlinks.json` all 200 on **app.whistlestoplearning.com**; the apex shows the info page and `/privacy.html`; www lands on the apex |
| 4b | Move each family tablet: on the old github.io site, Grown-ups > Save a backup; on **app.whistlestoplearning.com**, finish setup first (Load a backup is in Grown-ups, reached only after setup and a new PIN), then Grown-ups > Load a backup > Yes, replace; then remove the old home-screen icon. The moved notice says these steps. Keep github.io live with a "we moved" notice in Grown-ups. Do not make the repo private (that unpublishes Pages) until every tablet has moved, or the old app shows a 404 online and its Backup button is unreachable | Owner (Claude adds the notice) | every tablet runs on the new domain with its progress |
| 5 | Email forward hello@whistlestoplearning.com | Owner | a test mail arrives |
| 6 | Owner's tablet test on **app.whistlestoplearning.com** (checklist in section 5) | Owner | owner reports; Claude fixes anything found, release |
| 7 | Today, in parallel: Play Console payments profile and identity verification (takes days; a personal account selling an app shows the owner's legal name and address publicly). Check the Console for "Apply for production": if it is there, the 12-testers-for-14-days rule applies to this app, so recruit 12 Google accounts now | Owner | payments profile verified; testers lined up |
| 8 | Create the app in Play Console; confirm the package name (proposed `com.whistlestoplearning.app`; it cannot change after the first upload) | Owner | app shell exists |
| 9 | Package the TWA with the latest Bubblewrap or PWABuilder **on the owner's own computer**; keep the keystore and its passwords out of the repo and out of chat. Package from `https://app.whistlestoplearning.com/manifest.json` (host `app.whistlestoplearning.com`); hand-edit `startUrl` to `/?src=play`, so the start URL is `https://app.whistlestoplearning.com/?src=play` (Bubblewrap takes `./` from the manifest); Play Billing on. Check the current minimum target SDK and Billing Library that Play requires. Upload the AAB to **Internal testing**. Commit `twa-manifest.json` (never the keystore) and add its folder to `.vercelignore` | Owner, Claude prepares the config | AAB on the internal track |
| 10 | Copy the **Play App Signing** SHA-256 (Play Console > App signing; it exists only after the first upload) and the upload-key SHA-256 into `/.well-known/assetlinks.json` (served by the app project at `https://app.whistlestoplearning.com/.well-known/assetlinks.json`, 200, no redirect); put the package name in `PLAY.PKG`; release that web version. Only then install from the internal track | Claude + owner | installed from the internal track (not sideloaded): no browser bar, a stop past the fifth is locked, and the Unlock sheet shows Play's price. If any of these fail, the app is running fully open: stop and fix assetlinks or the start URL |
| 11 | Create the `unlock_all` in-app product at $9.99 (needs an uploaded build). Set up the Google service account and the Vercel variables `PLAY_SERVICE_ACCOUNT` and `PLAY_PACKAGE` a day before the test purchase, because permissions can lag (docs/PLAY-SETUP.md section 3) | Owner | product active; variables set in Vercel |
| 12 | Licence-tester purchase: buy, wait 5 minutes, confirm in Play Console that the order is NOT refunded and the Vercel function log shows 200 | Owner + Claude | acknowledged order seen |
| 13 | App content and store listing, before closed testing (closed tests are reviewed): Families target ages, content rating, data safety as in PLAY-SETUP section 4 (purchase history, ephemeral), privacy URL `https://whistlestoplearning.com/privacy.html` (also at `https://app.whistlestoplearning.com/privacy.html`; it must name Vercel's request logs, the purchase token sent to `app.whistlestoplearning.com/api/ack`, and the developer: replace the `DEVELOPER_NAME` placeholder with the exact Play Console developer name), the App access reviewer note from PLAY-SETUP section 4, support email hello@whistlestoplearning.com, title "Whistlestop: Kids Math & Reading", short and long description, 512 px icon, 1024x500 feature graphic, phone, 7-inch and 10-inch tablet screenshots (tools/shots.js). Teacher Approved needs no application: Google assesses Families apps itself | Owner, Claude drafts text and images | listing complete |
| 14 | Closed test (12 testers for 14 days if step 7 found the rule applies), then apply for production | Owner | production access granted |
| 15 | Tag v1.0.0 on the release commit | Claude | tag pushed |

Owner decision to keep on record: the web app is fully unlocked in any browser (github.io and app.whistlestoplearning.com), and the
repo is public until step 4b is done. Owner decision 2026-11-20: the app is on app.whistlestoplearning.com; the apex
whistlestoplearning.com is a static info page that does not offer the web app. Only the Play app has the free sample and the unlock.

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
  precache 15 MB, audio 12 MB, teacher lines 1500: REC-2, owner decision 2026-11-24 (9.0 MB); audio 9.5 MB: owner decision 2026-11-24 (D2);
  audio 12 MB: owner decision 2026-11-27, read-along stories and new Spanish words).
- Kill only processes whose working directory is your own worktree; never `pkill node`.
- A command blocked by a permission or safety check is reported, not re-sent another way.
- Push releases only to the session's own `claude/…` branch (this session: `claude/beautiful-rubin-1urk3d`); release by PR to
  `main`, merged with the full 40-character head SHA.
- Commit work in progress at least hourly. Nothing that exists only in /home/user/wt-* survives the session, so get finished
  work onto the session branch and pushed promptly. Pushing any other branch (for example `wip/<name>`) needs the owner's OK.
- Models: Fable for reviews and advice (the owner wants a Fable review before each release); Opus for hard work; Sonnet for
  routine work.

## 4. How a release is done

1. Work on a branch in its own worktree (`git worktree add -b X /home/user/wt-X <base>`; symlink `tools/node_modules` from the
   main checkout). Bump `VER` in tools/build.py; rebuild with `python3 tools/build.py`; never merge built `*.vNNN.js`,
   index.html or sw.js by hand (delete and rebuild after a merge).
2. Fable reviews the diff (read-only). Fix what it finds.
3. `bash tools/check.sh` (about 40 minutes). Known load flakes, rerun alone with `node tools/smoke.js --seg <ID>`: P4-17,
   P5-10, P5-03, KINDS2-*, G-RALLY2, LS-STOP end card, G-MV-*; a11y blocks-build and report-lessons.
4. PR to `main` (body ends with the Claude Code line and the session link). Merge with the full 40-character head SHA (the
   GitHub MCP `merge_pull_request` with `expectedHeadSha`, or `gh pr merge <n> --merge --match-head-commit <SHA>`). Then
   `git fetch origin main && git merge --ff-only FETCH_HEAD` on the session branch and push. Confirm the live service worker:
   `curl -s https://app.whistlestoplearning.com/sw.js | head -c 30` (and the github.io address while it lives) shows `starschool-vNNN`.
   A known flake counts as passing only if it passes unmodified when rerun alone.
5. Never rebuild under an existing VER: the versioned parts are cached as immutable for a year. Roll back with a revert PR and a
   new VER.
6. Web releases update the Play app with no new AAB. A new AAB is needed only for the yearly target-SDK rise.
7. After the move to Vercel, `main` deploys there too; GitHub Pages stays live until step 4b is done.

## 5. Owner's tablet test (step 6)

Open the app twice so the update installs. Then:
1. Grown-ups: set the PIN; try a wrong PIN; try Forgot PIN; Give game time +5.
2. Children: both children present; turn on picture passwords; switch children.
3. Each child: the map opens on the right stop; a lesson (first step's picture, Step 1 of 6); a practice round with a wrong
   answer (mistake hint); Ask the pet; one game and its boss; Story themes in a word problem.
4. Note anything confusing, slow, or wrong, with the grade and the screen.

## 6. Known open items (not blockers)

- Start-up is about 2.38 MB of the 2.5 MB budget (TRIM-START, v196: the Brain Teaser data moved from data.<VER>.js into the lazy part bt,
  2.51 -> 2.38 MB); bt is about 722 KB of its 800 KB fail limit, so the next big move needs another part.
- Map "longest task" is a little over its 200 ms soft line on a 6x-throttled CPU.
- British spellings outside lesson text (riddles, Block Builder, "tyres", "favourite", "metres", "Practise") are listed in
  PROGRESS "Ideas and issues".
- Bossy R lessons need new pictures; a few Word Workshop stops need a passage-reading lesson shape.
- Job-frame story lines ("Help fill the reef stall!") were left out (would need owner wording and recordings).
- Many old worktrees under /home/user/wt-* and .claude/worktrees can be removed once their branches are merged.
- Headless tooling (v195 small fixes; not app bugs):
  - **Playwright's own headless browser crashes as soon as Home opens** (the `midway` fixture; `fresh` stops at setup, before
    Home). Cause: Home's daily missions (MIS.ctx, 55-missions.js) call `spkProbe()`, which calls `SpeechRecognition.available({langs, processLocally: true})`
    (50-say.js). `chrome-headless-shell` (what `chromium.launch()` runs when no `executablePath` is given,
    /opt/pw-browsers/chromium_headless_shell-*) has no browser-side handler for `media.mojom.OnDeviceSpeechRecognition`, so the
    browser kills the page ("Terminating render process for bad Mojo message ... OnDeviceSpeechRecognition", seen with
    `DEBUG=pw:browser`). A one-line page with just that call crashes the same way; the full Chrome (`/usr/bin/google-chrome`,
    which tools/lib/browser.js uses, and Chrome on tablets, where the Play app runs) answers `downloadable`. It cannot be caught
    in JavaScript. Workaround: launch through `tools/lib/browser.js` (or pass `executablePath: '/usr/bin/google-chrome'`); for a
    one-off script on the headless shell, add an init script that deletes `window.SpeechRecognition` and
    `window.webkitSpeechRecognition` (the app then treats Spanish listening as unavailable).
  - **Smoke flake P5-10 "all saves gone after a reload"** is not the app losing a save. Each smoke context is a Playwright
    `newContext()`, an off-the-record profile whose localStorage lives only in Chrome's storage service process; if that process
    dies (a busy shared machine), every localStorage key is gone while sessionStorage stays, so lib/browser.js does not seed the
    fixture again and the app starts as new. Reproduced by killing the storage process (`--utility-sub-type=storage...`): all
    keys gone. The app's own write-then-reload never lost a write: 300 runs of `localStorage.setItem` followed at once by
    `location.reload()` (200 of them with the CPU oversubscribed 2x) read the new value every time. On a tablet (a profile on
    disk) the same crash loses only the writes of the last few seconds (Chrome writes localStorage to disk in batches; a write
    4 s old was lost, one 6 s old kept), with or without a reload, and no web API forces that write. `reloadSaved()` (00-core.js)
    keeps its 250 ms wait. Workaround: rerun the segment alone.
