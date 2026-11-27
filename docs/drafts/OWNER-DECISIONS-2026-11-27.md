# Owner decisions, 2026-11-27

On 2026-11-27 the owner approved every item on the review page, with no change notes. This file records the 14 quick decisions on
the free sample (docs/drafts/SAMPLE-REHEARSAL.md, "Questions for the owner" and "Wording proposals") and what was done for each.
Build v198 (VER unchanged). Branch `approve`.

## The review gates (approved, no change notes)

| Read-through | Gate | Now |
|---|---|---|
| docs/drafts/PARENT11-READ.md | PARENT_ON | `status: reviewed owner 2026-11-27`, PARENT_ON = 1 |
| docs/drafts/STORIES7-READ.md | STORY7_ON | `status: reviewed owner 2026-11-27`, STORY7_ON = 1 |
| docs/drafts/OLDER14-READ.md | OLDER_ON | `status: reviewed owner 2026-11-27`, OLDER_ON = 1 |
| docs/drafts/DEEP15-READ.md | DEEP15_ON | `status: reviewed owner 2026-11-27`, DEEP15_ON = 1 |
| docs/drafts/FEEDBACK-READ.md | none | its new sentences marked approved by the owner 2026-11-27 |

## The 14 quick decisions

| # | Decision | What was done |
|---|---|---|
| 1 | Sample size: keep 5 stops per subject. | Nothing to change (PLAY.FREE_STOPS stays 5). |
| 2 | PIN when buying: no second PIN for Unlock or restore when Grown-ups was opened with the PIN in the last 2 minutes. | `NAV.pinT` (41-nav.js), set only when Grown-ups is opened by typing the PIN (PIN.enter passes 1); in memory only, never saved, so a reload asks again. `PLAY.cardBind` (89-play.js) opens the Unlock sheet at once while `NAV.pinOk()`, else asks the PIN as before. The map's and Brain Teasers' "Grown-ups: unlock everything" button still always asks. Smoke PLAY-01 now checks both: the PIN asked again after 2 minutes, none within; SAMPLE-10MIN checks no second PIN seconds after the first. |
| 3 | Unlock card first in Grown-ups while the app is the locked free sample. | `grown()` (80-grown.js) draws Unlock Whistlestop first while `PLAY.locked()`; unlocked it stays third. Layout only. |
| 4 | Lesson waits: from 3rd grade up, a tap on the pet's speech bubble ends the line and wakes the controls at once. | `LS.talk` (52-lesson.js): for grade 3 and up the bubble takes a tap, or Enter or Space (it is in the Tab order), stops the voice (hush) and wakes the controls once. Below 3rd grade the bubble does nothing, as before. |
| 5 | Puzzles tab in the sample: only the Puzzle of the Day plus "More puzzles open when a grown-up unlocks Whistlestop." | `BT.hub` (74-teasers.js): while `PLAY.locked()`, the Puzzle of the Day card, the line on screen (`BT.MORE`) and the quiet grown-ups button; no locked cards. The owner confirmed on 2026-11-27 that the grown-ups button stays next to the Puzzle of the Day. The line is read out for a non-reader (nrSay, as the hub's other line). |
| 6 | Day-one Home: "Nothing to review yet" instead of "All caught up!" for a brand-new child; the first mission's line "Start your first stop!" while that subject has no stop passed. | `hmFresh()` / `hmToday()` (46-home.js): no round played (no stop round, no logged round of any kind, no star on a map). `MIS.sub` (55-missions.js) for the "round" mission. A grown-up's pinned stop keeps "Picked for you today!". |
| 7 | Mixed Practice, day one: "A bit of every subject!" for a child with nothing learned; the same for Learn's line while nothing is learned. | `MIS.none()` (no stop passed in any subject); `MIS.sub` for the "mix" mission and `learnHub` (41-nav.js). |
| 8 | Mission line: "Mission done: Learn and play 2 times today!". | Checked: the "more" mission is done by `day().r`, which a stop round, a Mixed Practice or review round, a lesson (LS.record) and a badge check-in all add to. So the new words are accurate: `MIS.title` for "more" is now "Learn and play 2 times today" (the Home card and the "Mission done: ...!" line). |
| 9 | Skipped-stop report line: "Checked a skipped stop: {stop name}. Practice it again." | `spcTry` (59-review.js) notes a skipped stop's light check-in answered wrong in `S.spc.x` (cleared when a later check-in of it is right on its own); the report card's Needs practice section (82-report.js, `REP.skipMiss`) shows the line first, as SPACED9.md drafted. |
| 10 | Audio budget raised to about 12 MB. | Done by the recordings agent, not here. |
| 11 | Calm mode keeps speech on. | Keep as is (nothing to change). |
| 12 | Granite. | Keep as is. |
| 13 | "How to earn". | Keep as is. |
| 14 | "lápices". | Keep as is. |

## Checks whose expectations changed because of an approved feature

- test.js report card (P5-06): 8 sections with the Parent corner (PARENT_ON = 1 and the gate part loaded), else 7.
- test.js DEEP-15: the gate-off comparison sets DEEP15_ON = 0 itself; index.html carries the flag the status line asks for.
- test.js FEEDBACK-4: the read-through may say "approved by the owner <date>" instead of "pending owner approval".
- test.js missions (R-01b Should 6): the "more" title is "Learn and play 2 times today".
- test.js home (TEACH-5S review tile): a brand-new child sees "Nothing to review yet"; "All caught up!" once a round was played.
- smoke PLAY-01 and SAMPLE-10MIN: the second PIN only after 2 minutes.
- smoke PARENT-11 and STORIES-7: "before approval" / "gate off" now set the flag to 0 in the page.
- smoke SAMPLE-10MIN: on a day the top mission is a new DEEP-15 stop (no lesson yet), the child goes Home and takes Math's
  glowing stop to the lesson.

Fix found on the way: with DEEP-15 on, a Discover or Spanish mission picked its stop on the old map (a 1st grader's Nature Trail
stop, outside the free sample's new start world). MIS.go now loads the new stops first (d15Then) and picks the stop then.

New check: test.js `OWNER-1127` covers decisions 2 to 9.
