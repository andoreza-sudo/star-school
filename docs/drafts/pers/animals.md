# Interest: Animals (animals)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --pers-draft (xAI API, grok-4.20-0309-non-reasoning); read and rewritten by hand

<!-- For the owner: read the sentences below as the child sees them, change any wording in the JSON ("st" and "things"),
     then replace "unreviewed" above with "reviewed <your name> <date>" (or run: node tools/author.js --pers-approve <id> --by <name>).
     Until then this interest is never offered and story problems stay the default ones: tools/build.py copies reviewed
     interests only (src/js/39q-persw.js). After editing the JSON, node tools/author.js --pers-fix redraws this page. -->

## As the child sees it

```text
Interest: Animals (animals)
Things: toy horses, toy cows, toy pigs, toy sheep, toy ducks, toy rabbits

Story problems, grades K to 2 (the hint the child sees after a miss is under each):
- Joining: Mia has 4 toy horses on the toy farm. Ben brings 3 more. How many toy horses are on the farm now? (answer 7)
    hint: Count them all. Start at 4 and count on 3.
- Joining: Mia puts 4 toy cows in the barn and 3 more by the pond. How many toy cows in all? (answer 7)
    hint: Count them all. Start at 4 and count on 3.
- Taking away: Mia had 9 toy cows in the barn. Mia gave 4 to Ben. How many toy cows are left in the barn? (answer 5)
    hint: 4 went away. They are the pale ones. Count the ones that are left.
- Taking away: There were 9 toy pigs in the toy pen. 4 went out the gate. How many are still in the pen? (answer 5)
    hint: 4 went away. They are the pale ones. Count the ones that are left.
- Some more: how many?: Mia has 5 toy pigs on the toy farm. Ben brings some more. Now there are 8 toy pigs. How many toy pigs did Ben bring? (answer 3)
    hint: Start at 5. Count on until you get to 8. How many did you count?
- Gave some: how many?: Mia had 11 toy sheep in the barn. Mia gave some to Ben. Now Mia has 6 toy sheep. How many toy sheep did Mia give away? (answer 5)
    hint: 11 at the start. 6 are still here. How many went away?
- Big and small: Mia has 12 toy ducks on the toy farm. 5 are big and the rest are small babies. How many small toy ducks does Mia have? (answer 7)
    hint: 12 in all. 5 are big. Take them away. How many small ones are left?
- Compare: how many more?: Mia has 9 toy rabbits in the barn. Ben has 4 toy rabbits in the field. How many more toy rabbits does Mia have than Ben? (answer 5)
    hint: Top row: Mia. Bottom row: Ben. Line them up. How many in the top row have no partner?
- Compare: how many fewer?: Mia has 9 toy horses in the barn. Ben has 4 toy horses in the field. How many fewer toy horses does Ben have than Mia? (answer 5)
    hint: Top row: Mia. Bottom row: Ben. Line them up. How many in the top row have no partner?
- Got more: how many at the start?: Mia had some toy cows on the toy farm. Then Ben brought 4 more. Now Mia has 10 toy cows. How many toy cows did Mia have at the start? (answer 6)
    hint: Think: what and 4 make 10? Take the 4 new ones away from 10.
- Gave some: how many at the start?: Mia had some toy pigs in the barn. Mia gave 5 to Ben. Now Mia has 7 toy pigs left. How many toy pigs were in the barn at the start? (answer 12)
    hint: Put them back together: 7 left and 5 given away. How many in all?
- Compare: the one with more: Ben has 6 toy sheep on the toy farm. Mia has 3 more than Ben. How many toy sheep does Mia have? (answer 9)
    hint: Top row: Ben. Bottom row: Mia. Mia has the same, and 3 more.
- Compare: the one with fewer: Mia has 12 toy ducks on the toy farm. Ben has 4 fewer than Mia. How many toy ducks does Ben have? (answer 8)
    hint: Top row: Mia. Bottom row: Ben. Ben has 4 fewer. Take 4 away from 12.

Bigger story problems, grades 2 and 3 (the usual sentences, with these things):
- level 4: Ava has 49 toy horses. Mia has 9 fewer than Ava. How many toy horses do they have together? (answer 89)
- level 4: Mia has 37 toy pigs. Ava has 18 more than Mia. How many toy pigs do they have together? (answer 92)
- level 5: There are 40 toy horses in 10 equal rows. How many toy horses are in each row? (answer 4)
- level 5: Mia puts 63 toy pigs into bags, 9 in each bag. How many bags is that? (answer 7)
- level 6: Ava has 59 toy horses, but 16 are too small to sell. Ava sells the rest for 6 cents each. How many cents does Ava get? (answer 258)
- level 6: Mia has 31 toy pigs. Ava gives Mia 32 more. Then Mia shares them equally among 9 friends. How many toy pigs does each friend get? (answer 7)
```

## Checks

- All checks pass (slots, the hint agrees, plurals, numbers, pictures, themes, kid-safe).

## Words (the draft itself)

```json
{
 "id": "animals",
 "name": "Animals",
 "pic": [
  "horse",
  "🐴"
 ],
 "things": [
  [
   "toy horses",
   "toy horse",
   "horse",
   "🐴"
  ],
  [
   "toy cows",
   "toy cow",
   "cow",
   "🐄"
  ],
  [
   "toy pigs",
   "toy pig",
   "pig",
   "🐷"
  ],
  [
   "toy sheep",
   "toy sheep",
   "sheep",
   "🐑"
  ],
  [
   "toy ducks",
   "toy duck",
   "duck",
   "🦆"
  ],
  [
   "toy rabbits",
   "toy rabbit",
   "rabbit",
   "🐰"
  ]
 ],
 "st": {
  "join": [
   "{who} has {a things} on the toy farm. {other} brings {b} more. How many {pl} are on the farm now?",
   "{who} puts {a things} in the barn and {b} more by the pond. How many {pl} in all?"
  ],
  "sep": [
   "{who} had {a things} in the barn. {who} gave {b} to {other}. How many {pl} are left in the barn?",
   "There were {a things} in the toy pen. {b} went out the gate. How many are still in the pen?"
  ],
  "chg": [
   "{who} has {a things} on the toy farm. {other} brings some more. Now there are {c things}. How many {pl} did {other} bring?"
  ],
  "chgS": [
   "{who} had {c things} in the barn. {who} gave some to {other}. Now {who} has {a things}. How many {pl} did {who} give away?"
  ],
  "part": [
   "{who} has {c things} on the toy farm. {a} are big and the rest are small babies. How many small {pl} does {who} have?"
  ],
  "cmpDm": [
   "{who} has {x things} in the barn. {other} has {y things} in the field. How many more {pl} does {who} have than {other}?"
  ],
  "cmpDf": [
   "{who} has {x things} in the barn. {other} has {y things} in the field. How many fewer {pl} does {other} have than {who}?"
  ],
  "start": [
   "{who} had some {pl} on the toy farm. Then {other} brought {b} more. Now {who} has {c things}. How many {pl} did {who} have at the start?"
  ],
  "startS": [
   "{who} had some {pl} in the barn. {who} gave {b} to {other}. Now {who} has {a things} left. How many {pl} were in the barn at the start?"
  ],
  "cmpB": [
   "{other} has {y things} on the toy farm. {who} has {d} more than {other}. How many {pl} does {who} have?"
  ],
  "cmpS": [
   "{who} has {x things} on the toy farm. {other} has {d} fewer than {who}. How many {pl} does {other} have?"
  ]
 },
 "api": {
  "name": "toy animals",
  "pic": "🐷",
  "things": [
   [
    "toy pigs",
    "toy pig",
    "pig",
    "🐷"
   ],
   [
    "toy cows",
    "toy cow",
    "cow",
    "🐄"
   ],
   [
    "toy horses",
    "toy horse",
    "horse",
    "🐴"
   ],
   [
    "toy sheep",
    "toy sheep",
    "sheep",
    "🐑"
   ],
   [
    "toy chickens",
    "toy chicken",
    "chicken",
    "🐔"
   ],
   [
    "toy ducks",
    "toy duck",
    "duck",
    "🦆"
   ]
  ],
  "st": {
   "join": [
    "{who} lines up {a things} on the toy farm. {other} gives {who} {b} more. How many {pl} does {who} have now?"
   ],
   "sep": [
    "{who} had {a things} in the toy barn. {who} gave {b} to {other}. How many {pl} are left?"
   ],
   "chg": [
    "{who} has {a things} at the toy farm. {other} gives {who} some more. Now {who} has {c things}. How many {pl} did {other} give {who}?"
   ],
   "chgS": [
    "{who} had {c things} at the toy farm. {who} gave some to {other}. Now {who} has {a things}. How many {pl} did {who} give away?"
   ],
   "part": [
    "{who} has {c things} in the toy pen. {a} are big and the rest are small. How many small {pl} does {who} have?"
   ],
   "cmpDm": [
    "{who} has {x things} at the toy farm. {other} has {y things}. How many more {pl} does {who} have than {other}?"
   ],
   "cmpDf": [
    "{who} has {x things} at the toy farm. {other} has {y things}. How many fewer {pl} does {other} have than {who}?"
   ],
   "start": [
    "{who} had some {pl} at the toy farm. Then {other} gave {who} {b} more. Now {who} has {c things}. How many {pl} did {who} have at the start?"
   ],
   "startS": [
    "{who} had some {pl} at the toy farm. {who} gave {b} to {other}. Now {who} has {a things} left. How many {pl} did {who} have at the start?"
   ],
   "cmpB": [
    "{other} has {y things} at the toy farm. {who} has {d} more than {other}. How many {pl} does {who} have?"
   ],
   "cmpS": [
    "{who} has {x things} at the toy farm. {other} has {d} fewer than {who}. How many {pl} does {other} have?"
   ]
  }
 },
 "notes": "Name \"toy animals\" -> \"Animals\" (the picker shows it). Pictures fixed (the API put an emoji where the drawing goes; chicken has no drawing, rabbit does). Most API sentences were the usual ones with \"at the toy farm\" added; rewritten with the barn, the pen, the field and the pond. Kept: a second join and sep sentence, like the usual ones. \"left in the barn\" keeps the take-away question."
}
```
