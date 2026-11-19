# Interest: Vehicles (vehicles)

status: unreviewed
made: 2026-11-19 by tools/author.js --pers-draft (xAI API, grok-4.20-0309-non-reasoning); read and rewritten by hand

<!-- For the owner: read the sentences below as the child sees them, change any wording in the JSON ("st" and "things"),
     then replace "unreviewed" above with "reviewed <your name> <date>" (or run: node tools/author.js --pers-approve <id> --by <name>).
     Until then this interest is never offered and story problems stay the default ones: tools/build.py copies reviewed
     interests only (src/js/39q-persw.js). After editing the JSON, node tools/author.js --pers-fix redraws this page. -->

## As the child sees it

```text
Interest: Vehicles (vehicles)
Things: toy cars, toy trucks, toy buses, toy trains, toy boats, toy planes

Story problems, grades K to 2 (the hint the child sees after a miss is under each):
- Joining: Mia parks 4 toy cars on the play mat. Ben parks 3 more. How many toy cars are on the mat? (answer 7)
    hint: Count them all. Start at 4 and count on 3.
- Joining: Mia has 4 toy trucks. Ben gives Mia 3 more for the race. How many toy trucks does Mia have now? (answer 7)
    hint: Count them all. Start at 4 and count on 3.
- Taking away: Mia had 9 toy trucks on the play mat. Mia gave 4 to Ben. How many toy trucks are left on the mat? (answer 5)
    hint: 4 went away. They are the pale ones. Count the ones that are left.
- Taking away: There were 9 toy buses on the toy bridge. 4 fell off. How many are still on the bridge? (answer 5)
    hint: 4 went away. They are the pale ones. Count the ones that are left.
- Some more: how many?: Mia has 5 toy buses in the toy garage. Ben brings in some more. Now there are 8 toy buses in the garage. How many toy buses did Ben bring in? (answer 3)
    hint: Start at 5. Count on until you get to 8. How many did you count?
- Gave some: how many?: Mia had 11 toy trains in the toy box. Mia gave some to Ben. Now Mia has 6 toy trains. How many toy trains did Mia give away? (answer 5)
    hint: 11 at the start. 6 are still here. How many went away?
- Big and small: Mia has 12 toy boats on the play mat. 5 are big and the rest are small. How many small toy boats does Mia have? (answer 7)
    hint: 12 in all. 5 are big. Take them away. How many small ones are left?
- Compare: how many more?: Mia has 9 toy planes in the race. Ben has 4 toy planes in the race. How many more toy planes does Mia have than Ben? (answer 5)
    hint: Top row: Mia. Bottom row: Ben. Line them up. How many in the top row have no partner?
- Compare: how many fewer?: Mia has 9 toy cars in the race. Ben has 4 toy cars in the race. How many fewer toy cars does Ben have than Mia? (answer 5)
    hint: Top row: Mia. Bottom row: Ben. Line them up. How many in the top row have no partner?
- Got more: how many at the start?: Mia had some toy trucks in the toy garage. Then Ben brought 4 more. Now there are 10 toy trucks. How many toy trucks were in the garage at the start? (answer 6)
    hint: Think: what and 4 make 10? Take the 4 new ones away from 10.
- Gave some: how many at the start?: Mia had some toy buses on the shelf. Mia gave 5 to Ben. Now Mia has 7 toy buses left. How many toy buses did Mia have at the start? (answer 12)
    hint: Put them back together: 7 left and 5 given away. How many in all?
- Compare: the one with more: Ben has 6 toy trains at the toy show. Mia has 3 more than Ben. How many toy trains does Mia have? (answer 9)
    hint: Top row: Ben. Bottom row: Mia. Mia has the same, and 3 more.
- Compare: the one with fewer: Mia has 12 toy boats at the toy show. Ben has 4 fewer than Mia. How many toy boats does Ben have? (answer 8)
    hint: Top row: Mia. Bottom row: Ben. Ben has 4 fewer. Take 4 away from 12.

Bigger story problems, grades 2 and 3 (the usual sentences, with these things):
- level 4: Ava has 49 toy cars. Mia has 9 fewer than Ava. How many toy cars do they have together? (answer 89)
- level 4: Mia has 37 toy buses. Ava has 18 more than Mia. How many toy buses do they have together? (answer 92)
- level 5: There are 40 toy cars in 10 equal rows. How many toy cars are in each row? (answer 4)
- level 5: Mia puts 63 toy buses into bags, 9 in each bag. How many bags is that? (answer 7)
- level 6: Ava has 59 toy cars, but 16 are too small to sell. Ava sells the rest for 6 cents each. How many cents does Ava get? (answer 258)
- level 6: Mia has 31 toy buses. Ava gives Mia 32 more. Then Mia shares them equally among 9 friends. How many toy buses does each friend get? (answer 7)
```

## Checks

- All checks pass (slots, the hint agrees, plurals, numbers, pictures, themes, kid-safe).

## Words (the draft itself)

```json
{
 "id": "vehicles",
 "name": "Vehicles",
 "pic": [
  "car",
  "🚗"
 ],
 "things": [
  [
   "toy cars",
   "toy car",
   "car",
   "🚗"
  ],
  [
   "toy trucks",
   "toy truck",
   "truck",
   "🚚"
  ],
  [
   "toy buses",
   "toy bus",
   "bus",
   "🚌"
  ],
  [
   "toy trains",
   "toy train",
   "train",
   "🚂"
  ],
  [
   "toy boats",
   "toy boat",
   "boat",
   "⛵"
  ],
  [
   "toy planes",
   "toy plane",
   "plane",
   "✈"
  ]
 ],
 "st": {
  "join": [
   "{who} parks {a things} on the play mat. {other} parks {b} more. How many {pl} are on the mat?",
   "{who} has {a things}. {other} gives {who} {b} more for the race. How many {pl} does {who} have now?"
  ],
  "sep": [
   "{who} had {a things} on the play mat. {who} gave {b} to {other}. How many {pl} are left on the mat?",
   "There were {a things} on the toy bridge. {b} fell off. How many are still on the bridge?"
  ],
  "chg": [
   "{who} has {a things} in the toy garage. {other} brings in some more. Now there are {c things} in the garage. How many {pl} did {other} bring in?"
  ],
  "chgS": [
   "{who} had {c things} in the toy box. {who} gave some to {other}. Now {who} has {a things}. How many {pl} did {who} give away?"
  ],
  "part": [
   "{who} has {c things} on the play mat. {a} are big and the rest are small. How many small {pl} does {who} have?"
  ],
  "cmpDm": [
   "{who} has {x things} in the race. {other} has {y things} in the race. How many more {pl} does {who} have than {other}?"
  ],
  "cmpDf": [
   "{who} has {x things} in the race. {other} has {y things} in the race. How many fewer {pl} does {other} have than {who}?"
  ],
  "start": [
   "{who} had some {pl} in the toy garage. Then {other} brought {b} more. Now there are {c things}. How many {pl} were in the garage at the start?"
  ],
  "startS": [
   "{who} had some {pl} on the shelf. {who} gave {b} to {other}. Now {who} has {a things} left. How many {pl} did {who} have at the start?"
  ],
  "cmpB": [
   "{other} has {y things} at the toy show. {who} has {d} more than {other}. How many {pl} does {who} have?"
  ],
  "cmpS": [
   "{who} has {x things} at the toy show. {other} has {d} fewer than {who}. How many {pl} does {other} have?"
  ]
 },
 "api": {
  "name": "vehicles",
  "pic": "🚗",
  "things": [
   [
    "cars",
    "car",
    "🚗",
    ""
   ],
   [
    "trucks",
    "truck",
    "🚚",
    ""
   ],
   [
    "buses",
    "bus",
    "🚌",
    ""
   ],
   [
    "boats",
    "boat",
    "⛵",
    ""
   ],
   [
    "planes",
    "plane",
    "✈",
    ""
   ],
   [
    "trains",
    "train",
    "🚂",
    ""
   ]
  ],
  "st": {
   "join": [
    "{who} lines up {a things} at the toy shop. {other} brings {who} {b} more. How many {pl} does {who} have now?"
   ],
   "sep": [
    "{who} had {a things} at the race track. {who} gave {b} to {other}. How many {pl} are left?"
   ],
   "chg": [
    "{who} has {a things} on the play mat. {other} gives {who} some more. Now {who} has {c things}. How many {pl} did {other} give {who}?"
   ],
   "chgS": [
    "{who} had {c things} in the big box. {who} gave some to {other}. Now {who} has {a things}. How many {pl} did {who} give away?"
   ],
   "part": [
    "{who} has {c things} at the garage. {a} are big and the rest are small. How many small {pl} does {who} have?"
   ],
   "cmpDm": [
    "{who} has {x things} at the car show. {other} has {y things}. How many more {pl} does {who} have than {other}?"
   ],
   "cmpDf": [
    "{who} has {x things} at the car show. {other} has {y things}. How many fewer {pl} does {other} have than {who}?"
   ],
   "start": [
    "{who} had some {pl} in the toy bin. Then {other} gave {who} {b} more. Now {who} has {c things}. How many {pl} did {who} have at the start?"
   ],
   "startS": [
    "{who} had some {pl} on the shelf. {who} gave {b} to {other}. Now {who} has {a things} left. How many {pl} did {who} have at the start?"
   ],
   "cmpB": [
    "{other} has {y things} at the track. {who} has {d} more than {other}. How many {pl} does {who} have?"
   ],
   "cmpS": [
    "{who} has {x things} at the track. {other} has {d} fewer than {who}. How many {pl} does {other} have?"
   ]
  }
 },
 "notes": "Things are toys (\"toy cars\" ...), so packing them in boxes and selling them reads right in the bigger problems; all six have drawings. \"lines up {a} at the toy shop\" (whose are they?) and \"at the race track\"/\"at the car show\" (boats and planes) rewritten: the play mat, the toy garage, the toy bridge, the race, the toy show. Every sentence works for boats and planes too (\"brings in\", not \"drives in\")."
}
```
