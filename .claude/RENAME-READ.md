# RENAME (v191): Star School is now Whistlestop. Lines for the owner to read

Owner decision 2026-11-20: the app is **Whistlestop** (Play title "Whistlestop: Kids Math & Reading"). Second owner decision
2026-11-20, "App on a subdomain": the app is at **app.whistlestoplearning.com**; **whistlestoplearning.com** is a small information
page (site/landing.html) with the Play link, the privacy policy and the e-mail.
Every line below is new or changed in v191. Change any wording here and tell Claude; nothing waits on this file to ship.

## Recorded lines (audio/teach, audio/en, audio/es)

**None says "Star School".** Searched the three recording manifests (src/data/d-teach-audio.js: 112 teacher lines;
src/data/d-en-audio.js: 73 cheer lines x 6 voices; src/data/d-es-audio.js: the Spanish) and tools/en-audio.js, tools/es-audio.js:
no line contains "Star School" in any spelling. Nothing needs re-recording, and nothing was recorded.

## Children see or hear

Each is the old line with "Star School" changed to "Whistlestop". Lines marked "spoken" are said by the tablet's own voice (not a
recording), so the spoken words change with the text.

| Where | Line |
|---|---|
| Home, top left; the first-run setup screen's title; the browser tab and installed app name | Whistlestop |
| Home, bottom | Whistlestop 1.0.0 (build v191) |
| Play app, a locked world (sheet; spoken) | This world opens when a grown-up unlocks Whistlestop. |
| Play app, a locked stop (sheet; spoken) | This stop opens when a grown-up unlocks Whistlestop. |
| Play app, locked puzzles (sheet; spoken) | These puzzles open when a grown-up unlocks Whistlestop. The Puzzle of the Day is open every day. |
| Play app, a locked child in "Who is playing?" (sheet; spoken) | This child can play once a grown-up unlocks Whistlestop. |
| Home banner when the tablet cannot save (spoken) | Whistlestop can't save right now: ask a grown-up to free some space. |
| Update screen when a file is missing | Whistlestop needs to finish updating. Connect to the internet, then tap Try again. |
| Toast when the tablet has no voice | No voice here. Open Whistlestop in Chrome or the installed app. |
| Microphone blocked (Say it! and Your voice) | The microphone is blocked for Whistlestop. To allow it: ... press and hold the Whistlestop icon, then App info, Permissions, Microphone, Allow. ... Speaking practice tries again the next time Whistlestop opens. Recordings are never kept. |
| Your voice, in a preview window | Recording is turned off in this preview window. Open Whistlestop on the tablet (the installed app or Chrome) and record there. |

## Grown-ups see

### New lines

| Where | Line |
|---|---|
| Grown-ups, top, **only on the old address andoreza-sudo.github.io** (changed after Fable's review: the app's address is now app.whistlestoplearning.com; new steps "finish setting up there first" and "remove the old icon") | We moved to app.whistlestoplearning.com, and the app is now called Whistlestop. To keep progress: 1. Tap Save a backup (or Save all children) under Backup below. 2. Open app.whistlestoplearning.com in Chrome and finish setting up there first (any name and grade: the backup replaces it). 3. Open Grown-ups there, choose a PIN, tap Load a backup, pick the file and tap Yes, replace (each further child: Add as a new child). 4. When the progress is there, remove the old icon (the one that opens this address) from the home screen: press and hold it, then Uninstall or Remove. |
| Grown-ups, About Whistlestop, a button (opens the privacy policy, also offline) | Privacy policy |
| The privacy policy page, privacy.html (whistlestoplearning.com/privacy.html and app.whistlestoplearning.com/privacy.html; also the Play listing's privacy policy) | The whole page is new: please read it. Title "Whistlestop privacy policy", effective November 20, 2026, contact hello@whistlestoplearning.com. Added after Fable's review: **Who we are** names the developer as `DEVELOPER_NAME`, a placeholder: tell Claude your developer name exactly as Play Console shows it. **Children**: "Because we collect no personal information, we do not ask for parental consent. If a parent or a child sends us an e-mail, we use it only to reply, and we delete it on request." **Reading aloud** (new paragraph): when the tablet has no voice installed for English or Spanish, Chrome may use an online voice, and the words being read (the app's text, and the child's name or nickname in a greeting such as "Hi, Mia!") go to that voice's provider, usually Google. **Deleting data** (rewritten): each child in Grown-ups (Start over, or Delete next to a child; a copy is kept for Undo until the app is next opened); everything, including the PIN, by clearing the site's data (Chrome asks when uninstalling, or Chrome > Settings > Site settings > app.whistlestoplearning.com). **Contact**: "We use e-mail sent to this address only to reply to it." The app's files and /api/ack are named on app.whistlestoplearning.com. |
| The information page, whistlestoplearning.com/ (site/landing.html; new) | Whistlestop. Kids math & reading, Pre-K to 6th grade. "Whistlestop is a learning app for children from Pre-K to 6th grade. Children practise a little every day, with short lessons and hints when they get stuck, and earn game time by learning." Math, Reading, Spanish, Discover. "Works offline once it is installed. No ads, no accounts, no tracking. Progress stays on the tablet. Made for Android tablets." Get Whistlestop: "Get it on Google Play" (a button; the link is a placeholder until the listing is live) "Coming soon." "Free to try. One payment unlocks everything for every child on the tablet." Privacy: "Nothing about your child is sent to us. Read the privacy policy." Questions: hello@whistlestoplearning.com. It does not mention the web app. |
| The installed app's description (manifest) | Offline math, reading, Spanish and discovery practice for Pre-K to 6th grade, with game time earned by learning. |

### Changed after Fable's review: NEEDS THE OWNER'S OK

| Where | Was | Now |
|---|---|---|
| Grown-ups, About Whistlestop, the privacy line | It works without internet once it has loaded. Progress is stored only on this device. Nothing is sent anywhere. | It works without internet once it has loaded. Progress and recordings stay on this device; nothing about your child is sent anywhere. In the Google Play app, the purchase is confirmed with Google Play. |

Why: "Nothing is sent anywhere" was not true in the Play app (the purchase is confirmed with Google Play and our /api/ack). Note
for the owner: on a tablet with no voice installed for a language, the words read aloud (which can include the child's name in a
greeting) go to Chrome's online voice; the privacy policy says so. If you want "nothing about your child" to hold there too, the
greetings could skip the name when only an online voice is available (not done; ask Claude).

### Changed lines (Star School -> Whistlestop)

| Where | Line |
|---|---|
| Grown-ups, card title | About Whistlestop |
| About Whistlestop | Whistlestop is offline practice in math, reading and Spanish for children, with game time earned by learning. It has no accounts, no ads and no tracking. |
| About Whistlestop, licences | Everything else (pictures, icons, sounds, games and questions) was made for Whistlestop. No other fonts, libraries or outside files are used. |
| Play app, Grown-ups card and sheet title | Unlock Whistlestop |
| Play app, after buying | Whistlestop is unlocked for every child on this tablet. Thank you! |
| Play app, payment pending | Google Play is still finishing the payment. Whistlestop opens by itself once it is paid; you can also tap Restore purchase later. |
| Play app, billing unavailable | Google Play billing is not available right now. Buying works in Whistlestop installed from Google Play, with the Play Store app up to date. |
| Play app, adding a second child | More children can play once Whistlestop is unlocked (see Unlock Whistlestop in Grown-ups). |
| Backup, a file of another app | That isn't a Whistlestop backup. |
| Backup, a too-big file | That file is too big to be a Whistlestop backup. |
| Backup, from a newer version | That backup was made by a newer Whistlestop. Update the app on this tablet first, then try again. |
| Backup, the share sheet title | Whistlestop backup |
| Backup file name | whistlestop-<child>-<date>.json (was starschool-<child>-<date>.json) |
| Backup, after Erase everything / after Delete | You can undo it until Whistlestop is opened again. / You can undo it in Grown-ups until Whistlestop is opened again. |
| Report card, under the title | <date>, <year> · grade <grade> · Whistlestop |

Old backup files (made before v191, "Star School" inside) still load. Files made by v191 say "Whistlestop" inside; an older,
not-yet-updated copy of the app (v190 or earlier) would refuse them as "not a Star School backup". Tablets update by themselves on
wifi, so this only matters for a tablet that stays offline.

## Not changed on purpose

The storage keys (starschool-v2...), the IndexedDB names (starschool, starschool-say), the backup file's field names and the
service worker caches (starschool-...) keep the old name, so no save, recording or download is lost. Nobody sees them.
The app icon (a star with a face) has no text and is unchanged. The star is still the app's mark.
