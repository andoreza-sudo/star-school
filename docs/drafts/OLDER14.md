# An older look for grades 4 to 6 (OLDER-14): audit and plan

BEST-APP roadmap item 14 (gap 6, "Grades 4 to 6 look babyish"): a score card with a personal best for that stop, no treasure chest
to tap, and the pet made optional. The new words are in `docs/drafts/OLDER14-READ.md`, and the look stays off until the owner approves
them there (the one-line flip). Line numbers are at commit 78cba3c (v198), before this change.

## 1. What already changes by age

| Where | What changes by grade | Evidence |
|---|---|---|
| Grade bands | `GRADES = [-1..6]`. `gradeOf()` is `S.grade`, else K (0). `gradeCfg()`: 6 questions a round for Pre-K, 8 for K, 10 from 1st; 3 choices for Pre-K; `auto` reading is `all` up to K, `auto` in 1st, `tap` from 2nd; `multi` from 5th | `src/js/42-paths.js:83`, `:85`, `:94-97` |
| Pet age stages | `petAge(g)`: 0 (the little one) for Pre-K to 2nd, 1 (the older kid, "teen-like") for 3rd and 4th, 2 (grown-up) for 5th and 6th | `src/js/17-pets-svg.js:360` |
| Pet age drawings | `PET_AGED[kind]` = [older kid, grown-up] for every species, in the lazy part `petage`; `petAgeWarm()` loads it for grade 3 and up, and Home calls it | `src/js/17b-pet-age.js:2-9`, `tools/build.py:208`, `src/js/17-pets-svg.js:397`, `src/js/46-home.js:341` |
| Non-reader lines (AUDIO-12) | `nrOn()` is true only when `gradeCfg().auto != 'tap'` (Pre-K to 1st), so "Tap the treasure chest!" is spoken only to them | `src/js/12-speech.js:143-144`, `src/js/50-round.js:275` |
| Fact Race | on Home from grade 1 (`raceOn`) | `src/js/54-race.js:9` |
| Games | Hill Climb's driving help, Star Rally's mode, Snack Stand's change and wording, Rally's boost gates follow the grade | `src/js/62-hill.js:184`, `src/js/63-game-race.js:342`, `src/js/65-game-snack.js:207`, `src/js/80-grown.js:73` |
| Spanish | the youngest (Pre-K, K) get read-aloud choices | `src/js/34-gen-es.js:21` |

Nothing about the round end or Home's layout changes by grade today: a 6th grader gets the same chest, the same "You are a
superstar!" and the same pet stage as a Pre-K child (only the pet's drawing grows up).

## 2. The round end today

- `finish()` (`src/js/50-round.js:249-321`) pays everything **before** anything is drawn: stars on the map (`setSt`, :258), a boss
  costume (:259), the world prize (:260), stickers (`award()`, :262, plus the mission and world stickers :266-268), the day's rounds
  and the streak (:264), missions (`MIS.done`, :265), coins, stars and game time (`ptCalc`, `ptEarn`, :269-270), the spaced check-ins
  (:271), then `save()` (:272).
- Then `view(RW.pre())` (:275): the closed chest, "Round complete!" and "Tap the treasure chest!" (`src/js/18-reward-art.js:329-333`).
  It rattles 4 times (:277).
- The tap (`$('#chest').onclick`, :279) only **shows** what was paid: `RW.done()` (`src/js/18-reward-art.js:337-348`) with the score,
  the line by share right ("You are a superstar!" at 90% and up, :284), the stars or, with no stars, the cheering pet (`RW.pet()`,
  `src/js/18-reward-art.js:322-325`), the open chest with the stickers, the game time and coin rows ("+N coins for the pet shop!",
  :306) and the message cards; and the growing overlay `growShow()` when the pet grew (:313, :323-331).

So the chest is a pure reveal: nothing is paid by the tap.

## 3. Home and the pet today

- Home's hero is the pet on its scene (`#pet`), "Name & Pet", the grow meter ("N more stars until Pet grows!"), the missions, the chips
  (`hmHero`, `src/js/46-home.js:225-248`).
- Under the paths, Fact Race, Pet Care, Pet Shop and Stickers (`hmActs`, `src/js/46-home.js:312-320`). The bar has a "My Pet" tab
  (`src/js/41-nav.js:20`). The map draws the pet beside the current stop (`src/js/46-home.js:429`).
- Pet Care (`care()`, `src/js/56-petcare.js:59`) is opened only by Home's Pet Care button and the My Pet tab; the Pet Shop (`shop()`,
  `src/js/48-shop.js`) only by Home's Pet Shop button. Missions never involve the pet (`src/js/55-missions.js:1-20`, the kinds are
  round, other, perfect, more, sprint, teaser, review, mix, speak). Coins are earned by rounds and spent in the shop.

## 4. What this change does

All of it is behind `OLDER_ON` (`src/js/50a-olderon.js`, written by `tools/build.py` from the status line of OLDER14-READ.md) and
only for a child in grade 4, 5 or 6 (`OLD14.on()`, `src/js/50b-older.js`). With the gate off, or a child in 3rd grade or below, every
screen is exactly as before.

1. **The score card** (`finish()`, `RW.done({card})`). After the same payout code, `OLD14.card()` returns the card's data and the
   chest step is skipped: the reveal runs at once (the old tap's body is now `reveal()`, called by the chest tap or straight away). The
   card shows the score ("9 out of 10", the approved form), the stars (`RW.rate`), the line, the **Time** of the round, **Your best** for
   that stop and **New best!** when it was beaten. Stickers sit in a plain row instead of the open chest. The game time, coin and message
   rows, the three end buttons and the bonus game are the same. "You are a superstar!" becomes "Excellent round!" on the card (needs
   approval); the other three lines are the approved ones.
2. **Payouts.** No payout code was touched: the card is drawn after `save()`, by the same `reveal()` the chest tap calls. `OLD14.card()`
   writes only `S.pb`. tools/test.js OLDER-14 plays the same rounds both ways and compares every save field and every row.
3. **Personal bests.** `S.pb['<path>:<stop id>'] = [right, questions, ms]`, kept for stop rounds (not a Tricky Mix, Daily Review,
   test-out or boss round, which show their time only). A round is better with a bigger share right, or the same share in less time.
   "New best!" shows only when an earlier best was beaten (the first round of a stop just sets it). The time is from the round's start
   (`G.t0`, set in `newG`) to its end.
4. **Show my pet** (Grown-ups, Grade and level card; grades 4 to 6 with the gate on). Off sets `S.petOff = true`; on deletes it. With it
   off: Home's hero has the name, missions and chips but no pet stage or grow meter; Pet Care and Pet Shop leave Home and the My Pet tab
   leaves the bar; the map draws no pet; the round end draws no cheering pet and no growing overlay, and the coin row says "+N coins!"
   (the shop is hidden). Nothing is deleted: the pet, its stage, costumes, care meters, coins and stickers stay in the save and come back
   when the switch is on again, or when the grade goes below 4.
5. **Old saves.** No migration. `S.pb` and `S.petOff` are absent in old saves: the bests start empty and the pet is shown. Seeding the
   bests from the stop stars was considered and not done: stars do not say the score (2 stars is anything from 8 to 9 of 10) or the time,
   so a seeded best would show numbers the child never got.

## 5. Kept on purpose (owner may want to decide later)

- The pet still walks along the question track in a round (`src/js/50-round.js:153`, the progress marker) and still teaches the lessons
  ("Lessons with Sparky"). Hiding those is a larger change to the round and lesson screens.
- The pet in Sky Hop and Block Builder (games) is unchanged.
- A boss prize still says "New costume for Pet: ..." with the pet hidden; the costume is saved for later.
- Care meters still drop while the pet is hidden (as they do when a child does not visit Pet Care), so a pet turned back on may be hungry.
- The setting is in Grown-ups only (not on the child's side), so it cannot be turned off and lost by a tap.
