# Interest: Dinosaurs (dinosaurs)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --pers-draft (xAI API, grok-4.20-0309-non-reasoning); read and rewritten by hand

<!-- For the owner: read the sentences below as the child sees them, change any wording in the JSON ("st" and "things"),
     then replace "unreviewed" above with "reviewed <your name> <date>" (or run: node tools/author.js --pers-approve <id> --by <name>).
     Until then this interest is never offered and story problems stay the default ones: tools/build.py copies reviewed
     interests only (src/js/39q-persw.js). After editing the JSON, node tools/author.js --pers-fix redraws this page. -->

## As the child sees it

```text
Interest: Dinosaurs (dinosaurs)
Things: toy dinosaurs, dinosaur stickers, dinosaur eggs, dinosaur bones, dinosaur books

Story problems, grades K to 2 (the hint the child sees after a miss is under each):
- Joining: Mia digs up 4 toy dinosaurs in the sandbox. Ben digs up 3 more. How many toy dinosaurs did they find? (answer 7)
    hint: Count them all. Start at 4 and count on 3.
- Taking away: Mia had 9 dinosaur stickers in the sandbox. Mia gave 4 to Ben. How many dinosaur stickers are left? (answer 5)
    hint: 4 went away. They are the pale ones. Count the ones that are left.
- Taking away: There were 9 dinosaur eggs in the dig pit. Ben took 4 home. How many are still in the pit? (answer 5)
    hint: 4 went away. They are the pale ones. Count the ones that are left.
- Some more: how many?: Mia has 5 dinosaur eggs in the sandbox. Ben hides some more there. Now there are 8 dinosaur eggs in the sandbox. How many dinosaur eggs did Ben hide? (answer 3)
    hint: Start at 5. Count on until you get to 8. How many did you count?
- Gave some: how many?: Mia had 11 dinosaur bones. Mia gave some to Ben for the dino show. Now Mia has 6 dinosaur bones. How many dinosaur bones did Mia give away? (answer 5)
    hint: 11 at the start. 6 are still here. How many went away?
- Big and small: Mia has 12 dinosaur books. 5 are big and the rest are small, like baby dinosaurs. How many small dinosaur books does Mia have? (answer 7)
    hint: 12 in all. 5 are big. Take them away. How many small ones are left?
- Compare: how many more?: Mia has 9 toy dinosaurs at the dino dig. Ben has 4 toy dinosaurs. How many more toy dinosaurs does Mia have than Ben? (answer 5)
    hint: Top row: Mia. Bottom row: Ben. Line them up. How many in the top row have no partner?
- Compare: how many fewer?: Mia has 9 dinosaur stickers at the dino dig. Ben has 4 dinosaur stickers. How many fewer dinosaur stickers does Ben have than Mia? (answer 5)
    hint: Top row: Mia. Bottom row: Ben. Line them up. How many in the top row have no partner?
- Got more: how many at the start?: Mia had some dinosaur eggs in the sandbox. Then Ben added 4 more. Now there are 10 dinosaur eggs. How many dinosaur eggs were in the sandbox at the start? (answer 6)
    hint: Think: what and 4 make 10? Take the 4 new ones away from 10.
- Gave some: how many at the start?: Mia had some dinosaur bones. Mia gave 5 to Ben for the dino show. Now Mia has 7 dinosaur bones left. How many dinosaur bones did Mia have at the start? (answer 12)
    hint: Put them back together: 7 left and 5 given away. How many in all?
- Compare: the one with more: Ben has 6 dinosaur books for the dino show. Mia has 3 more than Ben. How many dinosaur books does Mia have? (answer 9)
    hint: Top row: Ben. Bottom row: Mia. Mia has the same, and 3 more.
- Compare: the one with fewer: Mia has 12 toy dinosaurs for the dino show. Ben has 4 fewer than Mia. How many toy dinosaurs does Ben have? (answer 8)
    hint: Top row: Mia. Bottom row: Ben. Ben has 4 fewer. Take 4 away from 12.

Bigger story problems, grades 2 and 3 (the usual sentences, with these things):
- level 4: Ava has 49 toy dinosaurs. Mia has 9 fewer than Ava. How many toy dinosaurs do they have together? (answer 89)
- level 4: Mia has 37 dinosaur eggs. Ava has 18 more than Mia. How many dinosaur eggs do they have together? (answer 92)
- level 5: There are 40 toy dinosaurs in 10 equal rows. How many toy dinosaurs are in each row? (answer 4)
- level 5: Mia puts 63 dinosaur eggs into bags, 9 in each bag. How many bags is that? (answer 7)
- level 6: Ava has 59 toy dinosaurs, but 16 are too small to sell. Ava sells the rest for 6 cents each. How many cents does Ava get? (answer 258)
- level 6: Mia has 31 dinosaur eggs. Ava gives Mia 32 more. Then Mia shares them equally among 9 friends. How many dinosaur eggs does each friend get? (answer 7)
```

## Checks

- All checks pass (slots, the hint agrees, plurals, numbers, pictures, themes, kid-safe).

## Words (the draft itself)

```json
{
 "id": "dinosaurs",
 "name": "Dinosaurs",
 "pic": [
  "",
  "🦕"
 ],
 "things": [
  [
   "toy dinosaurs",
   "toy dinosaur",
   "",
   "🦕"
  ],
  [
   "dinosaur stickers",
   "dinosaur sticker",
   "",
   "🦖"
  ],
  [
   "dinosaur eggs",
   "dinosaur egg",
   "egg",
   "🥚"
  ],
  [
   "dinosaur bones",
   "dinosaur bone",
   "bone",
   "🦴"
  ],
  [
   "dinosaur books",
   "dinosaur book",
   "book",
   "📗"
  ]
 ],
 "st": {
  "join": [
   "{who} digs up {a things} in the sandbox. {other} digs up {b} more. How many {pl} did they find?"
  ],
  "sep": [
   "{who} had {a things} in the sandbox. {who} gave {b} to {other}. How many {pl} are left?",
   "There were {a things} in the dig pit. {other} took {b} home. How many are still in the pit?"
  ],
  "chg": [
   "{who} has {a things} in the sandbox. {other} hides some more there. Now there are {c things} in the sandbox. How many {pl} did {other} hide?"
  ],
  "chgS": [
   "{who} had {c things}. {who} gave some to {other} for the dino show. Now {who} has {a things}. How many {pl} did {who} give away?"
  ],
  "part": [
   "{who} has {c things}. {a} are big and the rest are small, like baby dinosaurs. How many small {pl} does {who} have?"
  ],
  "cmpDm": [
   "{who} has {x things} at the dino dig. {other} has {y things}. How many more {pl} does {who} have than {other}?"
  ],
  "cmpDf": [
   "{who} has {x things} at the dino dig. {other} has {y things}. How many fewer {pl} does {other} have than {who}?"
  ],
  "start": [
   "{who} had some {pl} in the sandbox. Then {other} added {b} more. Now there are {c things}. How many {pl} were in the sandbox at the start?"
  ],
  "startS": [
   "{who} had some {pl}. {who} gave {b} to {other} for the dino show. Now {who} has {a things} left. How many {pl} did {who} have at the start?"
  ],
  "cmpB": [
   "{other} has {y things} for the dino show. {who} has {d} more than {other}. How many {pl} does {who} have?"
  ],
  "cmpS": [
   "{who} has {x things} for the dino show. {other} has {d} fewer than {who}. How many {pl} does {other} have?"
  ]
 },
 "api": {
  "name": "dinosaurs",
  "pic": "🦕",
  "things": [
   [
    "bones",
    "bone",
    "🦴",
    ""
   ],
   [
    "fossils",
    "fossil",
    "",
    "🪨"
   ],
   [
    "eggs",
    "egg",
    "🥚",
    ""
   ],
   [
    "rocks",
    "rock",
    "",
    "🪨"
   ],
   [
    "shells",
    "shell",
    "🐚",
    ""
   ],
   [
    "teeth",
    "tooth",
    "🦷",
    ""
   ]
  ],
  "st": {
   "join": [
    "{who} found {a things} at the dig site. {other} gave {who} {b} more. How many {pl} does {who} have now?"
   ],
   "sep": [
    "{who} had {a things} in the toy box. {who} gave {b} to {other}. How many {pl} are left?"
   ],
   "chg": [
    "{who} had {a things} at the museum. {other} gave {who} some more. Now {who} has {c things}. How many {pl} did {other} give {who}?"
   ],
   "chgS": [
    "{who} had {c things} on the table. {who} gave some to {other}. Now {who} has {a things}. How many {pl} did {who} give away?"
   ],
   "part": [
    "{who} has {c things} from the dig. {a} are big and the rest are small. How many small {pl} does {who} have?"
   ],
   "cmpDm": [
    "{who} has {x things} at the dig site. {other} has {y things}. How many more {pl} does {who} have than {other}?"
   ],
   "cmpDf": [
    "{who} has {x things} from the museum. {other} has {y things}. How many fewer {pl} does {other} have than {who}?"
   ],
   "start": [
    "{who} had some {pl} in a bag. Then {other} gave {who} {b} more. Now {who} has {c things}. How many {pl} did {who} have at the start?"
   ],
   "startS": [
    "{who} had some {pl} on the shelf. {who} gave {b} to {other}. Now {who} has {a things} left. How many {pl} did {who} have at the start?"
   ],
   "cmpB": [
    "{other} has {y things} at the toy store. {who} has {d} more than {other}. How many {pl} does {who} have?"
   ],
   "cmpS": [
    "{who} has {x things} from the dig. {other} has {d} fewer than {who}. How many {pl} does {other} have?"
   ]
  }
 },
 "notes": "The API's things were not about dinosaurs (\"rocks\", \"shells\", \"teeth\") and two had a picture marked risky; now toy dinosaurs, dinosaur stickers, eggs, bones and books (dragons are fine, but nothing here needs one). \"fossils\" left out: no picture, and the owner's rule keeps out anything about long ages. The museum and the toy store (where a child does not own things) became the sandbox, the dig pit and the dino show. One join sentence only (the API's second was the usual one)."
}
```
