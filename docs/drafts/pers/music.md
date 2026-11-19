# Interest: Music (music)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --pers-draft (xAI API, grok-4.20-0309-non-reasoning); read and rewritten by hand

<!-- For the owner: read the sentences below as the child sees them, change any wording in the JSON ("st" and "things"),
     then replace "unreviewed" above with "reviewed <your name> <date>" (or run: node tools/author.js --pers-approve <id> --by <name>).
     Until then this interest is never offered and story problems stay the default ones: tools/build.py copies reviewed
     interests only (src/js/39q-persw.js). After editing the JSON, node tools/author.js --pers-fix redraws this page. -->

## As the child sees it

```text
Interest: Music (music)
Things: toy drums, bells, toy guitars, toy trumpets, toy microphones

Story problems, grades K to 2 (the hint the child sees after a miss is under each):
- Joining: Mia brings 4 toy drums to music class. Ben brings 3 more. How many toy drums are in the class? (answer 7)
    hint: Count them all. Start at 4 and count on 3.
- Joining: The band has 4 bells. Mia gives the band 3 more. How many bells does the band have now? (answer 7)
    hint: Count them all. Start at 4 and count on 3.
- Taking away: Mia had 9 bells for the band. Mia gave 4 to Ben. How many bells are left? (answer 5)
    hint: 4 went away. They are the pale ones. Count the ones that are left.
- Taking away: There were 9 toy guitars on the stage. 4 went back in the box. How many are still on the stage? (answer 5)
    hint: 4 went away. They are the pale ones. Count the ones that are left.
- Some more: how many?: Mia has 5 toy guitars on the stage. Ben brings some more. Now there are 8 toy guitars on the stage. How many toy guitars did Ben bring? (answer 3)
    hint: Start at 5. Count on until you get to 8. How many did you count?
- Gave some: how many?: Mia had 11 toy trumpets in music class. Mia gave some to Ben. Now Mia has 6 toy trumpets. How many toy trumpets did Mia give away? (answer 5)
    hint: 11 at the start. 6 are still here. How many went away?
- Big and small: Mia has 12 toy microphones for the show. 5 are big and the rest are small. How many small toy microphones does Mia have? (answer 7)
    hint: 12 in all. 5 are big. Take them away. How many small ones are left?
- Compare: how many more?: In the band, Mia has 9 toy drums and Ben has 4 toy drums. How many more toy drums does Mia have than Ben? (answer 5)
    hint: Top row: Mia. Bottom row: Ben. Line them up. How many in the top row have no partner?
- Compare: how many fewer?: In the band, Mia has 9 bells and Ben has 4 bells. How many fewer bells does Ben have than Mia? (answer 5)
    hint: Top row: Mia. Bottom row: Ben. Line them up. How many in the top row have no partner?
- Got more: how many at the start?: Mia had some toy guitars for the show. Then Ben brought 4 more. Now Mia has 10 toy guitars. How many toy guitars did Mia have at the start? (answer 6)
    hint: Think: what and 4 make 10? Take the 4 new ones away from 10.
- Gave some: how many at the start?: Mia had some toy trumpets in music class. Mia gave 5 to Ben. Now Mia has 7 toy trumpets left. How many toy trumpets did Mia have at the start? (answer 12)
    hint: Put them back together: 7 left and 5 given away. How many in all?
- Compare: the one with more: Ben has 6 toy microphones in the band. Mia has 3 more than Ben. How many toy microphones does Mia have? (answer 9)
    hint: Top row: Ben. Bottom row: Mia. Mia has the same, and 3 more.
- Compare: the one with fewer: Mia has 12 toy drums in the band. Ben has 4 fewer than Mia. How many toy drums does Ben have? (answer 8)
    hint: Top row: Mia. Bottom row: Ben. Ben has 4 fewer. Take 4 away from 12.

Bigger story problems, grades 2 and 3 (the usual sentences, with these things):
- level 4: Ava has 49 toy drums. Mia has 9 fewer than Ava. How many toy drums do they have together? (answer 89)
- level 4: Mia has 37 toy guitars. Ava has 18 more than Mia. How many toy guitars do they have together? (answer 92)
- level 5: There are 40 toy drums in 10 equal rows. How many toy drums are in each row? (answer 4)
- level 5: Mia puts 63 toy guitars into bags, 9 in each bag. How many bags is that? (answer 7)
- level 6: Ava has 59 toy drums, but 16 are too small to sell. Ava sells the rest for 6 cents each. How many cents does Ava get? (answer 258)
- level 6: Mia has 31 toy guitars. Ava gives Mia 32 more. Then Mia shares them equally among 9 friends. How many toy guitars does each friend get? (answer 7)
```

## Checks

- All checks pass (slots, the hint agrees, plurals, numbers, pictures, themes, kid-safe).

## Words (the draft itself)

```json
{
 "id": "music",
 "name": "Music",
 "pic": [
  "drum",
  "🥁"
 ],
 "things": [
  [
   "toy drums",
   "toy drum",
   "drum",
   "🥁"
  ],
  [
   "bells",
   "bell",
   "bell",
   "🔔"
  ],
  [
   "toy guitars",
   "toy guitar",
   "",
   "🎸"
  ],
  [
   "toy trumpets",
   "toy trumpet",
   "",
   "🎺"
  ],
  [
   "toy microphones",
   "toy microphone",
   "",
   "🎤"
  ]
 ],
 "st": {
  "join": [
   "{who} brings {a things} to music class. {other} brings {b} more. How many {pl} are in the class?",
   "The band has {a things}. {who} gives the band {b} more. How many {pl} does the band have now?"
  ],
  "sep": [
   "{who} had {a things} for the band. {who} gave {b} to {other}. How many {pl} are left?",
   "There were {a things} on the stage. {b} went back in the box. How many are still on the stage?"
  ],
  "chg": [
   "{who} has {a things} on the stage. {other} brings some more. Now there are {c things} on the stage. How many {pl} did {other} bring?"
  ],
  "chgS": [
   "{who} had {c things} in music class. {who} gave some to {other}. Now {who} has {a things}. How many {pl} did {who} give away?"
  ],
  "part": [
   "{who} has {c things} for the show. {a} are big and the rest are small. How many small {pl} does {who} have?"
  ],
  "cmpDm": [
   "In the band, {who} has {x things} and {other} has {y things}. How many more {pl} does {who} have than {other}?"
  ],
  "cmpDf": [
   "In the band, {who} has {x things} and {other} has {y things}. How many fewer {pl} does {other} have than {who}?"
  ],
  "start": [
   "{who} had some {pl} for the show. Then {other} brought {b} more. Now {who} has {c things}. How many {pl} did {who} have at the start?"
  ],
  "startS": [
   "{who} had some {pl} in music class. {who} gave {b} to {other}. Now {who} has {a things} left. How many {pl} did {who} have at the start?"
  ],
  "cmpB": [
   "{other} has {y things} in the band. {who} has {d} more than {other}. How many {pl} does {who} have?"
  ],
  "cmpS": [
   "{who} has {x things} in the band. {other} has {d} fewer than {who}. How many {pl} does {other} have?"
  ]
 },
 "api": {
  "name": "music",
  "pic": "🎵",
  "things": [
   [
    "drums",
    "drum",
    "🥁",
    ""
   ],
   [
    "bells",
    "bell",
    "🔔",
    ""
   ],
   [
    "kazoos",
    "kazoo",
    "",
    ""
   ],
   [
    "maracas",
    "maraca",
    "",
    ""
   ],
   [
    "harmonicas",
    "harmonica",
    "🎙",
    ""
   ],
   [
    "castanets",
    "castanet",
    "",
    ""
   ]
  ],
  "st": {
   "join": [
    "{who} has {a things}. {other} gives {who} {b} more. How many {pl} does {who} have now?"
   ],
   "sep": [
    "{who} had {a things}. {who} gave {b} to {other}. How many {pl} are left?"
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
 "notes": "All eleven API sentences were the usual ones word for word: written new, around music class, the band, the stage and the show. Things: kazoos, maracas and castanets have no picture, and the API gave harmonicas a microphone picture; now toy drums, bells, toy guitars, toy trumpets and toy microphones, each with its own picture."
}
```
