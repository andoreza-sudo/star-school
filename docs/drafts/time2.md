# Draft: Half Past (time2)

status: reviewed owner 2026-11-18
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Half Past (time2), grade 1, the little pet
Idea: Half past: the long hand points straight down.

Remember:
  - Do you remember this? Set an o'clock time.
Explore:
  - Move the hands to show any time you like.
Name it:
  - You set {time}.
  - The short hand shows the hour.
  - Half past: the long hand points straight down.
Together:
  - Set the clock to {time}. Watch the long hand.
  - Look at the long hand. Is it up or down?
  - Think of the clock at {time}.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The crab wakes up soon. Set the clock!
  - The fish eat soon. Set the clock!
Reasons the pet gives when it is caught:
  hands: I mixed up the hands. The long hand shows the minutes.
Tonight's question: Ask {name}: "Where does the long hand point at half past 4?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The idea had a slot ({min}); Together line 3 now fits; the Show lines do not repeat the time.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "time2",
 "t": "Half Past",
 "grade": 1,
 "age": "little",
 "idea": "Half past: the long hand points straight down.",
 "beats": {
  "remember": [
   "Do you remember this? Set an o'clock time."
  ],
  "explore": [
   "Move the hands to show any time you like."
  ],
  "name": [
   "You set {time}.",
   "The short hand shows the hour.",
   "Half past: the long hand points straight down."
  ],
  "together": [
   "Set the clock to {time}. Watch the long hand.",
   "Look at the long hand. Is it up or down?",
   "Think of the clock at {time}."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The crab wakes up soon. Set the clock!",
   "The fish eat soon. Set the clock!"
  ]
 },
 "reasons": {
  "hands": [
   "I mixed up the hands. The long hand shows the minutes."
  ]
 },
 "home": "Ask {name}: \"Where does the long hand point at half past 4?\""
}
```

<details><summary>The API's first draft</summary>

```text
Half Past (time2), grade 1, the little pet
Idea: Half past means {min} minutes past the hour.

Remember:
  - Do you remember this? Set the clock to {time}.
Explore:
  - Move the hands to show any time you like.
Name it:
  - You set {time}.
  - The short hand shows the {hour}.
  - Half past means {min} minutes past the hour.
Together:
  - Set the clock to show {time}.
  - Look at this clock. What time does it show?
  - At {time} which number does the long hand point to?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The fish swims at {time}. Set the clock.
  - The crab wakes at {time}. Set the clock.
Reasons the pet gives when it is caught:
  hands: Look! The long hand shows the minutes. | The short hand shows the hour.
Tonight's question: Ask {name}: "What time does the clock show at half past 4?"
About 3.3 minutes.
```

</details>
