# Interest: Ocean (ocean)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --pers-draft (xAI API, grok-4.20-0309-non-reasoning); read and rewritten by hand

<!-- For the owner: read the sentences below as the child sees them, change any wording in the JSON ("st" and "things"),
     then replace "unreviewed" above with "reviewed <your name> <date>" (or run: node tools/author.js --pers-approve <id> --by <name>).
     Until then this interest is never offered and story problems stay the default ones: tools/build.py copies reviewed
     interests only (src/js/39q-persw.js). After editing the JSON, node tools/author.js --pers-fix redraws this page. -->

## As the child sees it

```text
Interest: Ocean (ocean)
Things: seashells, toy crabs, toy fish, toy turtles, toy whales, toy octopuses

Story problems, grades K to 2 (the hint the child sees after a miss is under each):
- Joining: Mia finds 4 seashells on the beach. Ben finds 3 more. How many seashells did they find? (answer 7)
    hint: Count them all. Start at 4 and count on 3.
- Joining: Mia has 4 toy crabs in a bucket. Ben puts in 3 more. How many toy crabs are in the bucket now? (answer 7)
    hint: Count them all. Start at 4 and count on 3.
- Taking away: Mia had 9 toy crabs at the beach. Mia gave 4 to Ben. How many toy crabs are left? (answer 5)
    hint: 4 went away. They are the pale ones. Count the ones that are left.
- Taking away: There were 9 toy fish on the sand. A wave took 4. How many are still on the sand? (answer 5)
    hint: 4 went away. They are the pale ones. Count the ones that are left.
- Some more: how many?: Mia has 5 toy fish in a bucket. Ben puts in some more. Now there are 8 toy fish in the bucket. How many toy fish did Ben put in? (answer 3)
    hint: Start at 5. Count on until you get to 8. How many did you count?
- Gave some: how many?: Mia had 11 toy turtles at the beach. Mia gave some to Ben. Now Mia has 6 toy turtles. How many toy turtles did Mia give away? (answer 5)
    hint: 11 at the start. 6 are still here. How many went away?
- Big and small: Mia has 12 toy whales from the beach. 5 are big and the rest are small. How many small toy whales does Mia have? (answer 7)
    hint: 12 in all. 5 are big. Take them away. How many small ones are left?
- Compare: how many more?: At the beach, Mia has 9 toy octopuses and Ben has 4 toy octopuses. How many more toy octopuses does Mia have than Ben? (answer 5)
    hint: Top row: Mia. Bottom row: Ben. Line them up. How many in the top row have no partner?
- Compare: how many fewer?: At the beach, Mia has 9 seashells and Ben has 4 seashells. How many fewer seashells does Ben have than Mia? (answer 5)
    hint: Top row: Mia. Bottom row: Ben. Line them up. How many in the top row have no partner?
- Got more: how many at the start?: Mia had some toy crabs in a bucket. Then Ben put in 4 more. Now there are 10 toy crabs. How many toy crabs were in the bucket at the start? (answer 6)
    hint: Think: what and 4 make 10? Take the 4 new ones away from 10.
- Gave some: how many at the start?: Mia had some toy fish at the beach. Mia gave 5 to Ben. Now Mia has 7 toy fish left. How many toy fish did Mia have at the start? (answer 12)
    hint: Put them back together: 7 left and 5 given away. How many in all?
- Compare: the one with more: Ben has 6 toy turtles from the beach. Mia has 3 more than Ben. How many toy turtles does Mia have? (answer 9)
    hint: Top row: Ben. Bottom row: Mia. Mia has the same, and 3 more.
- Compare: the one with fewer: Mia has 12 toy whales from the beach. Ben has 4 fewer than Mia. How many toy whales does Ben have? (answer 8)
    hint: Top row: Mia. Bottom row: Ben. Ben has 4 fewer. Take 4 away from 12.

Bigger story problems, grades 2 and 3 (the usual sentences, with these things):
- level 4: Ava has 49 seashells. Mia has 9 fewer than Ava. How many seashells do they have together? (answer 89)
- level 4: Mia has 37 toy fish. Ava has 18 more than Mia. How many toy fish do they have together? (answer 92)
- level 5: There are 40 seashells in 10 equal rows. How many seashells are in each row? (answer 4)
- level 5: Mia puts 63 toy fish into bags, 9 in each bag. How many bags is that? (answer 7)
- level 6: Ava has 59 seashells, but 16 are too small to sell. Ava sells the rest for 6 cents each. How many cents does Ava get? (answer 258)
- level 6: Mia has 31 toy fish. Ava gives Mia 32 more. Then Mia shares them equally among 9 friends. How many toy fish does each friend get? (answer 7)
```

## Checks

- All checks pass (slots, the hint agrees, plurals, numbers, pictures, themes, kid-safe).

## Words (the draft itself)

```json
{
 "id": "ocean",
 "name": "Ocean",
 "pic": [
  "shell",
  "🐚"
 ],
 "things": [
  [
   "seashells",
   "seashell",
   "shell",
   "🐚"
  ],
  [
   "toy crabs",
   "toy crab",
   "crab",
   "🦀"
  ],
  [
   "toy fish",
   "toy fish",
   "fish",
   "🐟"
  ],
  [
   "toy turtles",
   "toy turtle",
   "turtle",
   "🐢"
  ],
  [
   "toy whales",
   "toy whale",
   "",
   "🐳"
  ],
  [
   "toy octopuses",
   "toy octopus",
   "",
   "🐙"
  ]
 ],
 "st": {
  "join": [
   "{who} finds {a things} on the beach. {other} finds {b} more. How many {pl} did they find?",
   "{who} has {a things} in a bucket. {other} puts in {b} more. How many {pl} are in the bucket now?"
  ],
  "sep": [
   "{who} had {a things} at the beach. {who} gave {b} to {other}. How many {pl} are left?",
   "There were {a things} on the sand. A wave took {b}. How many are still on the sand?"
  ],
  "chg": [
   "{who} has {a things} in a bucket. {other} puts in some more. Now there are {c things} in the bucket. How many {pl} did {other} put in?"
  ],
  "chgS": [
   "{who} had {c things} at the beach. {who} gave some to {other}. Now {who} has {a things}. How many {pl} did {who} give away?"
  ],
  "part": [
   "{who} has {c things} from the beach. {a} are big and the rest are small. How many small {pl} does {who} have?"
  ],
  "cmpDm": [
   "At the beach, {who} has {x things} and {other} has {y things}. How many more {pl} does {who} have than {other}?"
  ],
  "cmpDf": [
   "At the beach, {who} has {x things} and {other} has {y things}. How many fewer {pl} does {other} have than {who}?"
  ],
  "start": [
   "{who} had some {pl} in a bucket. Then {other} put in {b} more. Now there are {c things}. How many {pl} were in the bucket at the start?"
  ],
  "startS": [
   "{who} had some {pl} at the beach. {who} gave {b} to {other}. Now {who} has {a things} left. How many {pl} did {who} have at the start?"
  ],
  "cmpB": [
   "{other} has {y things} from the beach. {who} has {d} more than {other}. How many {pl} does {who} have?"
  ],
  "cmpS": [
   "{who} has {x things} from the beach. {other} has {d} fewer than {who}. How many {pl} does {other} have?"
  ]
 },
 "api": {
  "name": "ocean",
  "pic": "🏖",
  "things": [
   [
    "seashells",
    "seashell",
    "shell",
    "🐚"
   ],
   [
    "toy fish",
    "toy fish",
    "fish",
    "🐟"
   ],
   [
    "toy boats",
    "toy boat",
    "boat",
    "⛵"
   ],
   [
    "toy crabs",
    "toy crab",
    "crab",
    "🦀"
   ],
   [
    "beach balls",
    "beach ball",
    "ball",
    "🏖"
   ],
   [
    "toy sharks",
    "toy shark",
    "shark",
    ""
   ]
  ],
  "st": {
   "join": [
    "At the beach {who} finds {a things}. {other} gives {who} {b} more. How many {pl} does {who} have now?"
   ],
   "sep": [
    "At the beach {who} had {a things}. {who} gave {b} to {other}. How many {pl} are left?"
   ],
   "chg": [
    "On the sand {who} has {a things}. {other} gives {who} some more. Now {who} has {c things}. How many {pl} did {other} give {who}?"
   ],
   "chgS": [
    "At the beach {who} had {c things}. {who} gave some to {other}. Now {who} has {a things}. How many {pl} did {who} give away?"
   ],
   "part": [
    "By the waves {who} has {c things}. {a} are big and the rest are small. How many small {pl} does {who} have?"
   ],
   "cmpDm": [
    "At the beach {who} has {x things}. {other} has {y things}. How many more {pl} does {who} have than {other}?"
   ],
   "cmpDf": [
    "At the beach {who} has {x things}. {other} has {y things}. How many fewer {pl} does {other} have than {who}?"
   ],
   "start": [
    "{who} had some {pl}. Then {other} gave {who} {b} more. Now {who} has {c things}. How many {pl} did {who} have at the start?"
   ],
   "startS": [
    "{who} had some {pl}. {who} gave {b} to {other}. Now {who} has {a things} left. How many {pl} did {who} have at the start?"
   ],
   "cmpB": [
    "{other} has {y things}. {who} has {d} more than {other}. How many {pl} does {who} have?"
   ],
   "cmpS": [
    "{who} has {x things}. {other} has {d} fewer than {who}. How many {pl} does {other} have?"
   ]
  }
 },
 "notes": "Name \"Ocean\" with a seashell picture (the API's was a beach umbrella). Things: \"toy boats\" belongs to Vehicles, \"beach balls\" had the beach picture, \"toy sharks\" has no picture (and can look scary): now seashells, toy crabs, toy fish, toy turtles, toy whales and toy octopuses. \"By the waves\" and \"On the sand\" openers made the who-has-what unclear; rewritten around the beach and a bucket."
}
```
