# Interest: Space (space)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --pers-draft (xAI API, grok-4.20-0309-non-reasoning); read and rewritten by hand

<!-- For the owner: read the sentences below as the child sees them, change any wording in the JSON ("st" and "things"),
     then replace "unreviewed" above with "reviewed <your name> <date>" (or run: node tools/author.js --pers-approve <id> --by <name>).
     Until then this interest is never offered and story problems stay the default ones: tools/build.py copies reviewed
     interests only (src/js/39q-persw.js). After editing the JSON, node tools/author.js --pers-fix redraws this page. -->

## As the child sees it

```text
Interest: Space (space)
Things: toy rockets, star stickers, moon stickers, toy robots, toy spaceships

Story problems, grades K to 2 (the hint the child sees after a miss is under each):
- Joining: Mia has 4 toy rockets at space camp. Ben gives Mia 3 more. How many toy rockets does Mia have now? (answer 7)
    hint: Count them all. Start at 4 and count on 3.
- Joining: Mia lines up 4 star stickers for a trip to the moon. Ben adds 3 more. How many star stickers are lined up? (answer 7)
    hint: Count them all. Start at 4 and count on 3.
- Taking away: Mia had 9 star stickers at space camp. Mia gave 4 to Ben. How many star stickers are left? (answer 5)
    hint: 4 went away. They are the pale ones. Count the ones that are left.
- Taking away: There were 9 moon stickers on the space station table. 4 floated away. How many are still on the table? (answer 5)
    hint: 4 went away. They are the pale ones. Count the ones that are left.
- Some more: how many?: Mia has 5 moon stickers in the rocket box. Ben adds some more. Now there are 8 moon stickers in the box. How many moon stickers did Ben add? (answer 3)
    hint: Start at 5. Count on until you get to 8. How many did you count?
- Gave some: how many?: Mia had 11 toy robots on the space station. Mia sent some to Ben on the moon. Now Mia has 6 toy robots. How many toy robots did Mia send? (answer 5)
    hint: 11 at the start. 6 are still here. How many went away?
- Big and small: Mia has 12 toy spaceships at space camp. 5 are big and the rest are small. How many small toy spaceships does Mia have? (answer 7)
    hint: 12 in all. 5 are big. Take them away. How many small ones are left?
- Compare: how many more?: Mia has 9 toy rockets on the space station. Ben has 4 toy rockets on the moon. How many more toy rockets does Mia have than Ben? (answer 5)
    hint: Top row: Mia. Bottom row: Ben. Line them up. How many in the top row have no partner?
- Compare: how many fewer?: Mia has 9 star stickers on the space station. Ben has 4 star stickers on the moon. How many fewer star stickers does Ben have than Mia? (answer 5)
    hint: Top row: Mia. Bottom row: Ben. Line them up. How many in the top row have no partner?
- Got more: how many at the start?: Mia had some moon stickers at space camp. Then Ben gave Mia 4 more. Now Mia has 10 moon stickers. How many moon stickers did Mia have at the start? (answer 6)
    hint: Think: what and 4 make 10? Take the 4 new ones away from 10.
- Gave some: how many at the start?: Mia had some toy robots on the space station. Mia sent 5 to Ben. Now Mia has 7 toy robots left. How many toy robots did Mia have at the start? (answer 12)
    hint: Put them back together: 7 left and 5 given away. How many in all?
- Compare: the one with more: Ben has 6 toy spaceships at space camp. Mia has 3 more than Ben. How many toy spaceships does Mia have? (answer 9)
    hint: Top row: Ben. Bottom row: Mia. Mia has the same, and 3 more.
- Compare: the one with fewer: Mia has 12 toy rockets at space camp. Ben has 4 fewer than Mia. How many toy rockets does Ben have? (answer 8)
    hint: Top row: Mia. Bottom row: Ben. Ben has 4 fewer. Take 4 away from 12.

Bigger story problems, grades 2 and 3 (the usual sentences, with these things):
- level 4: Ava has 49 toy rockets. Mia has 9 fewer than Ava. How many toy rockets do they have together? (answer 89)
- level 4: Mia has 37 moon stickers. Ava has 18 more than Mia. How many moon stickers do they have together? (answer 92)
- level 5: There are 40 toy rockets in 10 equal rows. How many toy rockets are in each row? (answer 4)
- level 5: Mia puts 63 moon stickers into bags, 9 in each bag. How many bags is that? (answer 7)
- level 6: Ava has 59 toy rockets, but 16 are too small to sell. Ava sells the rest for 6 cents each. How many cents does Ava get? (answer 258)
- level 6: Mia has 31 moon stickers. Ava gives Mia 32 more. Then Mia shares them equally among 9 friends. How many moon stickers does each friend get? (answer 7)
```

## Checks

- All checks pass (slots, the hint agrees, plurals, numbers, pictures, themes, kid-safe).

## Words (the draft itself)

```json
{
 "id": "space",
 "name": "Space",
 "pic": [
  "rocket",
  "🚀"
 ],
 "things": [
  [
   "toy rockets",
   "toy rocket",
   "rocket",
   "🚀"
  ],
  [
   "star stickers",
   "star sticker",
   "star",
   "⭐"
  ],
  [
   "moon stickers",
   "moon sticker",
   "moon",
   "🌙"
  ],
  [
   "toy robots",
   "toy robot",
   "",
   "🤖"
  ],
  [
   "toy spaceships",
   "toy spaceship",
   "",
   "🛸"
  ]
 ],
 "st": {
  "join": [
   "{who} has {a things} at space camp. {other} gives {who} {b} more. How many {pl} does {who} have now?",
   "{who} lines up {a things} for a trip to the moon. {other} adds {b} more. How many {pl} are lined up?"
  ],
  "sep": [
   "{who} had {a things} at space camp. {who} gave {b} to {other}. How many {pl} are left?",
   "There were {a things} on the space station table. {b} floated away. How many are still on the table?"
  ],
  "chg": [
   "{who} has {a things} in the rocket box. {other} adds some more. Now there are {c things} in the box. How many {pl} did {other} add?"
  ],
  "chgS": [
   "{who} had {c things} on the space station. {who} sent some to {other} on the moon. Now {who} has {a things}. How many {pl} did {who} send?"
  ],
  "part": [
   "{who} has {c things} at space camp. {a} are big and the rest are small. How many small {pl} does {who} have?"
  ],
  "cmpDm": [
   "{who} has {x things} on the space station. {other} has {y things} on the moon. How many more {pl} does {who} have than {other}?"
  ],
  "cmpDf": [
   "{who} has {x things} on the space station. {other} has {y things} on the moon. How many fewer {pl} does {other} have than {who}?"
  ],
  "start": [
   "{who} had some {pl} at space camp. Then {other} gave {who} {b} more. Now {who} has {c things}. How many {pl} did {who} have at the start?"
  ],
  "startS": [
   "{who} had some {pl} on the space station. {who} sent {b} to {other}. Now {who} has {a things} left. How many {pl} did {who} have at the start?"
  ],
  "cmpB": [
   "{other} has {y things} at space camp. {who} has {d} more than {other}. How many {pl} does {who} have?"
  ],
  "cmpS": [
   "{who} has {x things} at space camp. {other} has {d} fewer than {who}. How many {pl} does {other} have?"
  ]
 },
 "api": {
  "name": "space",
  "pic": "🚀",
  "things": [
   [
    "rockets",
    "rocket",
    "🚀",
    ""
   ],
   [
    "stars",
    "star",
    "⭐",
    ""
   ],
   [
    "moons",
    "moon",
    "🌙",
    ""
   ],
   [
    "planets",
    "planet",
    "",
    "🪐"
   ],
   [
    "spaceships",
    "spaceship",
    "🛸",
    ""
   ],
   [
    "flags",
    "flag",
    "🏁",
    ""
   ]
  ],
  "st": {
   "join": [
    "{who} lines up {a things} on the space table. {other} gives {who} {b} more. How many {pl} does {who} have now?"
   ],
   "sep": [
    "{who} had {a things} in a space box. {who} gave {b} to {other}. How many {pl} are left?"
   ],
   "chg": [
    "{who} has {a things} at space camp. {other} gives {who} some more. Now {who} has {c things}. How many {pl} did {other} give {who}?"
   ],
   "chgS": [
    "{who} had {c things} at the space show. {who} gave some to {other}. Now {who} has {a things}. How many {pl} did {who} give away?"
   ],
   "part": [
    "{who} has {c things} in the space bag. {a} are big and the rest are small. How many small {pl} does {who} have?"
   ],
   "cmpDm": [
    "{who} has {x things} at space play. {other} has {y things}. How many more {pl} does {who} have than {other}?"
   ],
   "cmpDf": [
    "{who} has {x things} at space play. {other} has {y things}. How many fewer {pl} does {other} have than {who}?"
   ],
   "start": [
    "{who} had some {pl} at space camp. Then {other} gave {who} {b} more. Now {who} has {c things}. How many {pl} did {who} have at the start?"
   ],
   "startS": [
    "{who} had some {pl} at the space show. {who} gave {b} to {other}. Now {who} has {a things} left. How many {pl} did {who} have at the start?"
   ],
   "cmpB": [
    "{other} has {y things} at space play. {who} has {d} more than {other}. How many {pl} does {who} have?"
   ],
   "cmpS": [
    "{who} has {x things} at space play. {other} has {d} fewer than {who}. How many {pl} does {other} have?"
   ]
  }
 },
 "notes": "Things: the API's \"stars\", \"moons\" and \"planets\" are not things a child can hold or put in a bag (and its planet emoji is marked risky), \"flags\" had a race-flag picture: now toy rockets, star stickers, moon stickers, toy robots and toy spaceships. \"space play\" and \"the space show\" (unclear) replaced with space camp, the space station and the moon. Sending to a friend on the moon is giving away, so the take-away hints stay true."
}
```
