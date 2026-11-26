# The free sample, rehearsed as a new family (BEST-APP roadmap item 3)

Built at v197 (branch `sample3`). For the owner. The goal from BEST-APP: **within 10 minutes of a fresh install, a child finishes a
lesson, wins something and plays a game, and the unlock sits behind the grown-up check.**

**Short answer: yes, with a lot of room.** Every run reached a running game in under 2 minutes of the app's own time, and in about
2.5 to 4 minutes with a child's thinking time added. Nothing on the way showed the child a lock, a price or a dead end. The purchase
asked for the Grown-ups PIN, twice, before Google Play was touched. One real fault was found and fixed: **the PIN chosen in first
setup lost a digit when a grown-up typed it twice at a normal pace.**

## How it was run

- A Playwright script (kept outside the repo) drove the built app in system Chrome (`--headless=new`), from empty storage, in Play
  mode (`?src=play` with a stand-in Google Play billing, as smoke PLAY-01 and PLAY-02 do). No speed-up: the app's own clock, the
  real lesson waits, the real recorded voice files.
- **The tablet voice.** Headless Chrome has no speech voice, so lines the app says with the tablet's voice took a modelled time of
  150 words a minute times the app's own rate (0.88). Recorded lines played for real. Without this the lesson waits would look shorter
  than on a tablet.
- **Every tap was a real tap** on the screen: setup (name, grade, the PIN chosen and typed again), Home, the top mission ("Play a Math
  round"), the lesson's start card, every lesson screen, Practice, the treasure chest, Home, Games, 4x4 Hill Climb, its first stage.
  Then the grown-up: Grown-ups, the PIN, Unlock or restore, the PIN again, Unlock.
- **The child answers instantly**, so the measured times are the app's floor. The "with a child" column adds 2 seconds for each
  decision (an answer, a Next, a button to choose) and 0.3 seconds for each further tap (a digit, a counter).
- Three children: Pre-K, 1st grade, 4th grade; each at phone size (380x780) and tablet size (1024x600), and once at phone size getting
  some answers wrong (the first try at a Together and Check me item, and about every third Practice question).
- Also: a "curious child" pass that tapped each of the 23 things on a new 1st grader's first Home once, and a run through the whole
  Math sample (stop after stop with Next) to see how long the sample lasts.

## Times and taps

Seconds from the setup screen on screen (app time, instant child). Taps are counted from the start; typing the name is one tap.

| Child, size | Home | Lesson done | Win (chest) | Game started | Taps: Home / lesson / win / game | Decisions | With a child (min) | Lesson waits |
|---|---|---|---|---|---|---|---|---|
| Pre-K, phone | 2.1 | 63 | 81 | 90 | 11 / 37 / 48 / 52 | 28 | 2.6 | 40 s over 9 screens |
| Pre-K, tablet | 2.1 | 63 | 81 | 90 | 11 / 31 / 40 / 44 | 28 | 2.5 | 40 s over 9 screens |
| Pre-K, phone, some wrong | 2.1 | 66 | 86 | 94 | 11 / 35 / 49 / 53 | 33 | 2.8 | 42 s over 11 screens |
| 1st, phone | 2.0 | 78 | 98 | 107 | 11 / 71 / 118 / 122 | 33 | 3.3 | 51 s over 10 screens |
| 1st, tablet | 2.3 | 79 | 99 | 108 | 11 / 72 / 116 / 120 | 33 | 3.3 | 51 s over 10 screens |
| 1st, phone, some wrong | 2.1 | 83 | 104 | 112 | 11 / 103 / 166 / 170 | 40 | 3.9 | 53 s over 14 screens |
| 4th, phone | 2.1 | 81 | 101 | 111 | 11 / 61 / 91 / 95 | 34 | 3.3 | 53 s over 11 screens |
| 4th, tablet | 2.0 | 81 | 100 | 110 | 11 / 50 / 79 / 83 | 34 | 3.2 | 53 s over 11 screens |
| 4th, phone, some wrong | 2.1 | 86 | 106 | 114 | 11 / 76 / 112 / 116 | 41 | 3.6 | 55 s over 15 screens |

- Setup itself is 11 taps: the name, the grade, Let's go!, then 4 + 4 PIN digits. A grown-up reading the setup screen and choosing a
  PIN will add about a minute that the table does not count.
- **The purchase: 11 taps in about 3 seconds of app time** in every run: Grown-ups, 4 PIN digits, Unlock or restore (after scrolling
  to the card), 4 PIN digits again, Unlock. Google Play was asked nothing before the second PIN; the price appeared only on the sheet.
- The first game could start much sooner: a new child already has 3:00 of game time and Games is one tap from Home.
- Round lengths: Pre-K 6 questions, 1st and 4th 10. With some wrong answers: 9 answers for 6 (Pre-K), 13 for 10.
- No console errors and no network requests in any run.

**How long the free sample lasts (Math only, right answers, following Next):** every one of the first 5 Math stops starts with a
lesson. Pre-K: the 5 stops took 7.3 minutes of app time (88 s a stop); 1st grade: 8.3 minutes (100 s a stop, 434 taps). Then the
map's 6th stop said "Not open yet. This stop opens when a grown-up unlocks Whistlestop." 4th grade: 106 to 117 s a stop for the first
4 (the bot could not answer a screen of the 5th). So Math alone is about 7 to 9 minutes of app time, roughly 15 to 20 minutes for a
real child, and the game-time bank held 52 minutes at the end (the 30-minute daily limit still applies). The same 5 stops wait in Reading, Spanish and Discover.

## Friction, ranked

| # | Severity | Where | What a family meets | Done |
|---|---|---|---|---|
| 1 | **High** | First setup, the PIN | A grown-up who types the new PIN and at once types it again, at a tap every quarter second, lost the first digit of the second entry: the old pad closed and a new one opened under the finger. The pad then sat at 3 of 4 dots with no word; a grown-up who typed on got "They didn't match" or a different PIN. At faster tapping it went wrong outright. This is the very first thing a family does. | **Fixed** (see below) |
| 2 | Medium | Buying | The PIN is asked twice within seconds: once to open Grown-ups, again for Unlock or restore. 8 of the 11 purchase taps are PIN digits. | Owner question 2 |
| 3 | Medium | Buying | The Unlock Whistlestop card is the third card in Grown-ups, 973 px down at phone size (894 px at 1024x600): more than a screen of scrolling past the summary and the children card. | Owner question 3 |
| 4 | Medium | Lessons | The answer controls stay asleep until each line is said (by design, up to 6 s a screen). This is 40 to 55 s of every 60 to 85 s lesson. "Check me" hit the 6 s ceiling in every run. Right for a non-reader; slow for a 4th grader who has already read it. | Owner question 4 |
| 5 | Medium | Lessons and Practice, 1st grade | Counters and blocks go in one tap at a time: "+9 & Doubles" took 58 taps for one lesson, and the Practice round 46 taps for 10 questions (making 14 on a frame is 14 taps). Taps per lesson: Pre-K 24, 4th 37 to 48, 1st 58 to 90. | No: roadmap item 10 (touch the model directly) |
| 6 | Low | Home, a new child | Before anything is played: the Today tile says "All caught up!", the first mission is "Play a Math round" with "Make it stronger!" under it, and "Play Mixed Practice: A bit of everything!" (Mixed Practice opens a "Tricky mix!" of every subject for a child who has learned nothing yet; it works, it is just not what the words promise). | Wording below |
| 7 | Low | Pre-K, a child who struggles | Pre-K two-choice questions get one try. Three misses in six left "3 out of 6", no stars and "Get 5 right to open the next stop", so a struggling Pre-K child repeats stop 1. Not a fault; it does mean the sample can feel short of wins for that child. | Note |
| 8 | Low | The Puzzles tab | One tap from Home, 18 of the 19 puzzle cards show a lock. A tap on one says, aloud, "Not open yet. These puzzles open when a grown-up unlocks Whistlestop. The Puzzle of the Day is open every day." and OK. Explained, no price, but it is the most locks a child sees on day one. | Owner question 5 |
| 9 | Low | Game time | A new child starts with 3:00, and each sample stop (lesson + round) earned about 10 minutes: after the 5 Pre-K Math stops the bank held 52 minutes (the daily limit of 30 minutes still applies). | Note for item 8 of BEST-APP "Things NOT to do" |
| 10 | Info | The rest | No dead end: each of the 23 things on a new child's Home led somewhere sensible (missions, Mixed Practice, Puzzle of the Day, the four subjects, Game Room, Fact Race, Pet Care, Pet Shop, Stickers, the streak, Ask Sparky, the five tabs). No lock was shown to a child on the path, the paywall was never reached early, and locked world chips and stops say why when tapped. | |

Not friction, for the record: the round end's biggest button is "Bonus game", a 30-second balloon game; the Game Room is two taps
away (Home, Games). The Hill Climb stage starts in 3 taps from the Game Room and loads in well under a second here.

## What was fixed

**The PIN pad keeps every digit** (`src/js/41b-pin.js`, the `gate` part). Choosing a PIN now uses one pad for both entries: after
the fourth digit the same pad changes its words to "Type it again" (and to "They didn't match. Choose a PIN again." after a mismatch)
instead of closing and opening a second pad. A digit typed while the fourth dot shows (the pad's 150 ms pause) is kept for the next
entry instead of being dropped. The same pad serves first setup, Change PIN, Forgot PIN and the first-time Grown-ups entry. No words
changed. Measured with real taps at the app's real clock: before, a tap every 150 or 250 ms failed (3 dots, or a lost entry);
after, 150, 250 and 350 ms all reach Home.

**A new smoke segment, `SAMPLE-10MIN`** (tools/smoke.js), modelled on PLAY-02: a fresh install in Play mode at 380x780 goes, by taps
only, through setup (the PIN typed twice at a tap every 250 ms on the real clock, which fails without the fix), the top mission's
lesson through every beat, Practice, the chest (stickers, stars and game time must grow), Home, Games, 4x4 Hill Climb to a running
stage. It fails on any wait that does not lead on, any lock sheet shown to the child, and any Google Play call before the grown-up's
PIN; then it checks that Grown-ups asks the PIN, the card has no price, Unlock or restore asks the PIN again, and only then the sheet
shows the price and Unlock opens Google Play (cancelled: nothing unlocked). tools/test.js's fake pad learned the new `next` (the
assertions are unchanged).

## Wording proposals (owner approval needed; nothing was changed)

1. Home, a new child's Today tile: "All caught up!" → **"Nothing to review yet"** until the first round is done.
2. Missions, the first day: "Play a Math round / Make it stronger!" → **"Play a Math round / Start your first stop!"** while the
   subject has no stop passed.
3. Missions: "Play Mixed Practice / A bit of everything!" for a child with nothing learned yet: either do not draw it on day one, or
   **"A bit of every subject!"**. (Learn's line "A bit of everything you learned" has the same problem.)
4. The round end after the first lesson: "Mission done: Play 2 rounds today!" counts the lesson as a round. Either count lessons in
   the line (**"Mission done: Learn and play 2 times today!"**) or do not count the lesson.

## Questions for the owner

1. **Is 5 stops per subject the right size?** Evidence: every one of the first 5 Math stops has a lesson; a stop (lesson + Practice)
   took 88 s (Pre-K), 100 s (1st) and about 110 s (4th) of app time, so the Math sample is 7 to 9 minutes of app time and about 15 to 20 minutes for
   a real child; with Reading, Spanish and Discover the whole sample is roughly an hour of learning, and well past the 10-minute goal.
   The 6th stop's lock is calm and explained. Against a bigger sample: by the end of 5 stops a child has met every kind of screen
   (lesson beats, Practice, chest, games) and has 50 minutes of game time banked. For a smaller one: none of this evidence argues for
   it. My reading: 5 is enough to judge the app and short enough to want more; keep it, and look again at the share of sample families
   who buy once Play Console has numbers.
2. **The PIN twice when buying.** Grown-ups asks the PIN, then Unlock or restore asks it again seconds later. Would you accept "no
   second PIN when Grown-ups was opened by the PIN in the last 2 minutes"? It saves 4 taps and a moment of "did it not work?". (Kept
   as is: PLAY-01 asserts the second PIN, and it is your gate design.)
3. **Put Unlock Whistlestop first in Grown-ups while the app is the free sample?** It is the third card now, more than a screen
   down on a phone. A parent who opens Grown-ups to buy would see it at once. Layout only, no new words.
4. **Lesson waits for older children.** The controls wake when the line has been said (up to 6 s). Would you like a tap on the
   pet's speech bubble to wake them early from 3rd grade up? It would cut the 4th grader's lesson from about 80 s toward 40 s.
5. **The Puzzles tab in the sample.** 18 locked cards one tap from Home. Keep (each explains itself), or show only the Puzzle of the
   Day and one quiet "More puzzles open when a grown-up unlocks Whistlestop." line in the sample (new wording)?

## Screenshots (docs/drafts/sample3/)

- `phone-1-setup-to-lesson.png`: 1st grader, 380x780: setup, the PIN pad, the first Home, the first lesson screen, the lesson's end.
- `phone-2-win-game-unlock.png`: the chest and round end, the Game Room, Hill Climb running, the Grown-ups unlock card, the unlock
  sheet (caught as it slides in) after the second PIN.
- `tablet-prek-lesson-4th-win.png`: 1024x600: Pre-K's first lesson screen; a 4th grader's round end.
