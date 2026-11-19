# Interest: Sports (sports)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --pers-draft (xAI API, grok-4.20-0309-non-reasoning); read and rewritten by hand

<!-- For the owner: read the sentences below as the child sees them, change any wording in the JSON ("st" and "things"),
     then replace "unreviewed" above with "reviewed <your name> <date>" (or run: node tools/author.js --pers-approve <id> --by <name>).
     Until then this interest is never offered and story problems stay the default ones: tools/build.py copies reviewed
     interests only (src/js/39q-persw.js). After editing the JSON, node tools/author.js --pers-fix redraws this page. -->

## As the child sees it

```text
Interest: Sports (sports)
Things: soccer balls, basketballs, tennis balls, trophies, team flags, team caps

Story problems, grades K to 2 (the hint the child sees after a miss is under each):
- Joining: Mia packs 4 soccer balls for practice. Ben packs 3 more. How many soccer balls are in the bags? (answer 7)
    hint: Count them all. Start at 4 and count on 3.
- Joining: At the game, Mia lines up 4 basketballs and Ben lines up 3 more. How many basketballs in all? (answer 7)
    hint: Count them all. Start at 4 and count on 3.
- Taking away: Mia had 9 basketballs at practice. Mia gave 4 to Ben. How many basketballs does Mia have left? (answer 5)
    hint: 4 went away. They are the pale ones. Count the ones that are left.
- Taking away: There were 9 tennis balls on the bench. 4 fell off. How many are still on the bench? (answer 5)
    hint: 4 went away. They are the pale ones. Count the ones that are left.
- Some more: how many?: Mia has 5 tennis balls in the team bag. Ben puts in some more. Now there are 8 tennis balls. How many tennis balls did Ben put in? (answer 3)
    hint: Start at 5. Count on until you get to 8. How many did you count?
- Gave some: how many?: Mia had 11 trophies at the game. Mia gave some to Ben. Now Mia has 6 trophies. How many trophies did Mia give away? (answer 5)
    hint: 11 at the start. 6 are still here. How many went away?
- Big and small: Mia has 12 team flags for the team. 5 are big and the rest are small, for the little kids. How many small team flags are there? (answer 7)
    hint: 12 in all. 5 are big. Take them away. How many small ones are left?
- Compare: how many more?: After the game, Mia has 9 team caps and Ben has 4 team caps. How many more team caps does Mia have than Ben? (answer 5)
    hint: Top row: Mia. Bottom row: Ben. Line them up. How many in the top row have no partner?
- Compare: how many fewer?: After the game, Mia has 9 soccer balls and Ben has 4 soccer balls. How many fewer soccer balls does Ben have than Mia? (answer 5)
    hint: Top row: Mia. Bottom row: Ben. Line them up. How many in the top row have no partner?
- Got more: how many at the start?: Mia had some basketballs at practice. Then Ben brought 4 more. Now Mia has 10 basketballs. How many basketballs did Mia have at the start? (answer 6)
    hint: Think: what and 4 make 10? Take the 4 new ones away from 10.
- Gave some: how many at the start?: Mia had some tennis balls in the team bag. Mia gave 5 to Ben. Now Mia has 7 tennis balls left. How many tennis balls were in the bag at the start? (answer 12)
    hint: Put them back together: 7 left and 5 given away. How many in all?
- Compare: the one with more: On the field, Ben has 6 trophies. Mia has 3 more than Ben. How many trophies does Mia have? (answer 9)
    hint: Top row: Ben. Bottom row: Mia. Mia has the same, and 3 more.
- Compare: the one with fewer: On the field, Mia has 12 team flags. Ben has 4 fewer than Mia. How many team flags does Ben have? (answer 8)
    hint: Top row: Mia. Bottom row: Ben. Ben has 4 fewer. Take 4 away from 12.

Bigger story problems, grades 2 and 3 (the usual sentences, with these things):
- level 4: Ava has 49 soccer balls. Mia has 9 fewer than Ava. How many soccer balls do they have together? (answer 89)
- level 4: Mia has 37 tennis balls. Ava has 18 more than Mia. How many tennis balls do they have together? (answer 92)
- level 5: There are 40 soccer balls in 10 equal rows. How many soccer balls are in each row? (answer 4)
- level 5: Mia puts 63 tennis balls into bags, 9 in each bag. How many bags is that? (answer 7)
- level 6: Ava has 59 soccer balls, but 16 are too small to sell. Ava sells the rest for 6 cents each. How many cents does Ava get? (answer 258)
- level 6: Mia has 31 tennis balls. Ava gives Mia 32 more. Then Mia shares them equally among 9 friends. How many tennis balls does each friend get? (answer 7)
```

## Checks

- All checks pass (slots, the hint agrees, plurals, numbers, pictures, themes, kid-safe).

## Words (the draft itself)

```json
{
 "id": "sports",
 "name": "Sports",
 "pic": [
  "ball",
  "⚽"
 ],
 "things": [
  [
   "soccer balls",
   "soccer ball",
   "ball",
   "⚽"
  ],
  [
   "basketballs",
   "basketball",
   "",
   "🏀"
  ],
  [
   "tennis balls",
   "tennis ball",
   "",
   "🎾"
  ],
  [
   "trophies",
   "trophy",
   "",
   "🏆"
  ],
  [
   "team flags",
   "team flag",
   "flag",
   "🚩"
  ],
  [
   "team caps",
   "team cap",
   "cap",
   ""
  ]
 ],
 "st": {
  "join": [
   "{who} packs {a things} for practice. {other} packs {b} more. How many {pl} are in the bags?",
   "At the game, {who} lines up {a things} and {other} lines up {b} more. How many {pl} in all?"
  ],
  "sep": [
   "{who} had {a things} at practice. {who} gave {b} to {other}. How many {pl} does {who} have left?",
   "There were {a things} on the bench. {b} fell off. How many are still on the bench?"
  ],
  "chg": [
   "{who} has {a things} in the team bag. {other} puts in some more. Now there are {c things}. How many {pl} did {other} put in?"
  ],
  "chgS": [
   "{who} had {c things} at the game. {who} gave some to {other}. Now {who} has {a things}. How many {pl} did {who} give away?"
  ],
  "part": [
   "{who} has {c things} for the team. {a} are big and the rest are small, for the little kids. How many small {pl} are there?"
  ],
  "cmpDm": [
   "After the game, {who} has {x things} and {other} has {y things}. How many more {pl} does {who} have than {other}?"
  ],
  "cmpDf": [
   "After the game, {who} has {x things} and {other} has {y things}. How many fewer {pl} does {other} have than {who}?"
  ],
  "start": [
   "{who} had some {pl} at practice. Then {other} brought {b} more. Now {who} has {c things}. How many {pl} did {who} have at the start?"
  ],
  "startS": [
   "{who} had some {pl} in the team bag. {who} gave {b} to {other}. Now {who} has {a things} left. How many {pl} were in the bag at the start?"
  ],
  "cmpB": [
   "On the field, {other} has {y things}. {who} has {d} more than {other}. How many {pl} does {who} have?"
  ],
  "cmpS": [
   "On the field, {who} has {x things}. {other} has {d} fewer than {who}. How many {pl} does {other} have?"
  ]
 },
 "api": {
  "name": "sports",
  "pic": "⚽",
  "things": [
   [
    "balls",
    "ball",
    "🏀",
    ""
   ],
   [
    "helmets",
    "helmet",
    "⛑",
    ""
   ],
   [
    "bats",
    "bat",
    "",
    "⚾"
   ],
   [
    "gloves",
    "glove",
    "",
    ""
   ],
   [
    "flags",
    "flag",
    "🏁",
    ""
   ],
   [
    "trophies",
    "trophy",
    "🏆",
    ""
   ]
  ],
  "st": {
   "join": [
    "{who} lines up {a things} at practice. {other} brings {b} more from the bag. How many {pl} does {who} have now?"
   ],
   "sep": [
    "{who} had {a things} in the team box. {who} gave {b} to {other} after the game. How many {pl} are left?"
   ],
   "chg": [
    "{who} has {a things} on the bench. {other} gives {who} some more from the bag. Now {who} has {c things}. How many {pl} did {other} give {who}?"
   ],
   "chgS": [
    "{who} had {c things} before the match. {who} gave some to {other} after the game. Now {who} has {a things}. How many {pl} did {who} give away?"
   ],
   "part": [
    "{who} has {c things} in the sports bag. {a} are new and the rest are old. How many old {pl} does {who} have?"
   ],
   "cmpDm": [
    "{who} has {x things} at practice. {other} has {y things}. How many more {pl} does {who} have than {other}?"
   ],
   "cmpDf": [
    "{who} has {x things} at practice. {other} has {y things}. How many fewer {pl} does {other} have than {who}?"
   ],
   "start": [
    "{who} had some {pl} in the team bag. Then {other} gave {who} {b} more at practice. Now {who} has {c things}. How many {pl} did {who} have at the start?"
   ],
   "startS": [
    "{who} had some {pl} before the game. {who} gave {b} to {other} after practice. Now {who} has {a things} left. How many {pl} did {who} have at the start?"
   ],
   "cmpB": [
    "{other} has {y things} in the bag. {who} has {d} more than {other} at the game. How many {pl} does {who} have?"
   ],
   "cmpS": [
    "{who} has {x things} on the field. {other} has {d} fewer than {who} at practice. How many {pl} does {other} have?"
   ]
  }
 },
 "notes": "Things: the API's \"balls\" (too plain), \"helmets\" (its picture was a first-aid helmet), \"bats\" (a bat is also an animal; its baseball emoji is not allowed) and \"gloves\" (no picture) replaced with soccer balls, basketballs, tennis balls, team flags and team caps; trophies kept. The part sentence said \"new and old\", which the hint (\"big ... small ones\") would contradict: big and small again. Two sentences were over 30 words; shortened. \"after the game\" / \"after practice\" pairs that changed the time mid-story removed."
}
```
