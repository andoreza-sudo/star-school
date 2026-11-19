# Interest: Cooking (cooking)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --pers-draft (xAI API, grok-4.20-0309-non-reasoning); read and rewritten by hand

<!-- For the owner: read the sentences below as the child sees them, change any wording in the JSON ("st" and "things"),
     then replace "unreviewed" above with "reviewed <your name> <date>" (or run: node tools/author.js --pers-approve <id> --by <name>).
     Until then this interest is never offered and story problems stay the default ones: tools/build.py copies reviewed
     interests only (src/js/39q-persw.js). After editing the JSON, node tools/author.js --pers-fix redraws this page. -->

## As the child sees it

```text
Interest: Cooking (cooking)
Things: cookies, cupcakes, bread rolls, mini pizzas, pies

Story problems, grades K to 2 (the hint the child sees after a miss is under each):
- Joining: Mia bakes 4 cookies. Then Ben bakes 3 more. How many cookies are on the tray? (answer 7)
    hint: Count them all. Start at 4 and count on 3.
- Joining: Mia made 4 cupcakes in the morning and 3 more after lunch. How many cupcakes is that? (answer 7)
    hint: Count them all. Start at 4 and count on 3.
- Taking away: Mia baked 9 cupcakes. Mia gave 4 to Ben. How many cupcakes are left? (answer 5)
    hint: 4 went away. They are the pale ones. Count the ones that are left.
- Taking away: There were 9 bread rolls on the cooling rack. Ben ate 4. How many are still on the rack? (answer 5)
    hint: 4 went away. They are the pale ones. Count the ones that are left.
- Some more: how many?: Mia has 5 bread rolls on the tray. Ben bakes some more. Now there are 8 bread rolls on the tray. How many bread rolls did Ben bake? (answer 3)
    hint: Start at 5. Count on until you get to 8. How many did you count?
- Gave some: how many?: Mia baked 11 mini pizzas. Mia gave some to Ben. Now Mia has 6 mini pizzas. How many mini pizzas did Mia give away? (answer 5)
    hint: 11 at the start. 6 are still here. How many went away?
- Big and small: Mia bakes 12 pies. 5 are big and the rest are small. How many small pies did Mia bake? (answer 7)
    hint: 12 in all. 5 are big. Take them away. How many small ones are left?
- Compare: how many more?: Mia baked 9 cookies and Ben baked 4 cookies. How many more cookies did Mia bake than Ben? (answer 5)
    hint: Top row: Mia. Bottom row: Ben. Line them up. How many in the top row have no partner?
- Compare: how many fewer?: Mia baked 9 cupcakes and Ben baked 4 cupcakes. How many fewer cupcakes did Ben bake than Mia? (answer 5)
    hint: Top row: Mia. Bottom row: Ben. Line them up. How many in the top row have no partner?
- Got more: how many at the start?: Mia baked some bread rolls. Then Ben baked 4 more. Now there are 10 bread rolls. How many bread rolls did Mia bake first? (answer 6)
    hint: Think: what and 4 make 10? Take the 4 new ones away from 10.
- Gave some: how many at the start?: Mia baked some mini pizzas. Mia gave 5 to Ben. Now Mia has 7 mini pizzas left. How many mini pizzas did Mia bake? (answer 12)
    hint: Put them back together: 7 left and 5 given away. How many in all?
- Compare: the one with more: Ben baked 6 pies. Mia baked 3 more than Ben. How many pies did Mia bake? (answer 9)
    hint: Top row: Ben. Bottom row: Mia. Mia has the same, and 3 more.
- Compare: the one with fewer: Mia baked 12 cookies. Ben baked 4 fewer than Mia. How many cookies did Ben bake? (answer 8)
    hint: Top row: Mia. Bottom row: Ben. Ben has 4 fewer. Take 4 away from 12.

Bigger story problems, grades 2 and 3 (the usual sentences, with these things):
- level 4: Ava has 49 cookies. Mia has 9 fewer than Ava. How many cookies do they have together? (answer 89)
- level 4: Mia has 37 bread rolls. Ava has 18 more than Mia. How many bread rolls do they have together? (answer 92)
- level 5: There are 40 cookies in 10 equal rows. How many cookies are in each row? (answer 4)
- level 5: Mia puts 63 bread rolls into bags, 9 in each bag. How many bags is that? (answer 7)
- level 6: Ava has 59 cookies, but 16 are too small to sell. Ava sells the rest for 6 cents each. How many cents does Ava get? (answer 258)
- level 6: Mia has 31 bread rolls. Ava gives Mia 32 more. Then Mia shares them equally among 9 friends. How many bread rolls does each friend get? (answer 7)
```

## Checks

- All checks pass (slots, the hint agrees, plurals, numbers, pictures, themes, kid-safe).

## Words (the draft itself)

```json
{
 "id": "cooking",
 "name": "Cooking",
 "pic": [
  "cookie",
  "🍪"
 ],
 "things": [
  [
   "cookies",
   "cookie",
   "cookie",
   "🍪"
  ],
  [
   "cupcakes",
   "cupcake",
   "cake",
   "🎂"
  ],
  [
   "bread rolls",
   "bread roll",
   "bread",
   "🍞"
  ],
  [
   "mini pizzas",
   "mini pizza",
   "pizza",
   "🍕"
  ],
  [
   "pies",
   "pie",
   "",
   "🥧"
  ]
 ],
 "st": {
  "join": [
   "{who} bakes {a things}. Then {other} bakes {b} more. How many {pl} are on the tray?",
   "{who} made {a things} in the morning and {b} more after lunch. How many {pl} is that?"
  ],
  "sep": [
   "{who} baked {a things}. {who} gave {b} to {other}. How many {pl} are left?",
   "There were {a things} on the cooling rack. {other} ate {b}. How many are still on the rack?"
  ],
  "chg": [
   "{who} has {a things} on the tray. {other} bakes some more. Now there are {c things} on the tray. How many {pl} did {other} bake?"
  ],
  "chgS": [
   "{who} baked {c things}. {who} gave some to {other}. Now {who} has {a things}. How many {pl} did {who} give away?"
  ],
  "part": [
   "{who} bakes {c things}. {a} are big and the rest are small. How many small {pl} did {who} bake?"
  ],
  "cmpDm": [
   "{who} baked {x things} and {other} baked {y things}. How many more {pl} did {who} bake than {other}?"
  ],
  "cmpDf": [
   "{who} baked {x things} and {other} baked {y things}. How many fewer {pl} did {other} bake than {who}?"
  ],
  "start": [
   "{who} baked some {pl}. Then {other} baked {b} more. Now there are {c things}. How many {pl} did {who} bake first?"
  ],
  "startS": [
   "{who} baked some {pl}. {who} gave {b} to {other}. Now {who} has {a things} left. How many {pl} did {who} bake?"
  ],
  "cmpB": [
   "{other} baked {y things}. {who} baked {d} more than {other}. How many {pl} did {who} bake?"
  ],
  "cmpS": [
   "{who} baked {x things}. {other} baked {d} fewer than {who}. How many {pl} did {other} bake?"
  ]
 },
 "api": {
  "name": "cooking",
  "pic": "🍪",
  "things": [
   [
    "cookies",
    "cookie",
    "🍪",
    ""
   ],
   [
    "cupcakes",
    "cupcake",
    "🧁",
    ""
   ],
   [
    "muffins",
    "muffin",
    "",
    ""
   ],
   [
    "brownies",
    "brownie",
    "",
    ""
   ],
   [
    "pies",
    "pie",
    "🥧",
    ""
   ],
   [
    "cakes",
    "cake",
    "🎂",
    ""
   ]
  ],
  "st": {
   "join": [
    "{who} bakes {a things}. {other} helps and adds {b} more. How many {pl} do they have now?"
   ],
   "sep": [
    "{who} baked {a things}. {who} shares {b} with {other}. How many {pl} are left?"
   ],
   "chg": [
    "{who} has {a things}. {other} gives {who} some more. Now {who} has {c things}. How many {pl} did {other} give {who}?"
   ],
   "chgS": [
    "{who} had {c things}. {who} gave some to {other}. Now {who} has {a things}. How many {pl} did {who} give away?"
   ],
   "part": [
    "{who} has {c things}. {a} are big and the rest are small. How many small {pl} does {who} have?"
   ],
   "cmpDm": [
    "{who} has {x things}. {other} has {y things}. How many more {pl} does {who} have than {other}?"
   ],
   "cmpDf": [
    "{who} has {x things}. {other} has {y things}. How many fewer {pl} does {other} have than {who}?"
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
 "notes": "Pictures fixed (the API put emoji in the drawing place; muffins and brownies have no picture, a whole cake is not a baked thing a child shares out by the dozen): cookies, cupcakes, bread rolls, mini pizzas, pies. The join sentence \"How many do they have\" lost who has them: now \"on the tray\". Ten of the eleven API sentences were the usual ones: rewritten around baking. \"shares {b} with\" became \"gave {b} to\" (sharing could mean they still both have them)."
}
```
