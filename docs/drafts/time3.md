# Draft: Quarter Hours (time3)

status: reviewed owner 2026-11-18
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Quarter Hours (time3), grade 2, the little pet
Idea: The long hand shows the minutes past the hour.

Remember:
  - Do you remember this? Set an o'clock time.
Explore:
  - Move the hands on this clock. Set any time you like!
Name it:
  - You set {time}.
  - The short hand shows the hour.
  - The long hand shows the minutes past the hour.
Together:
  - Set the clock to {time}. Long hand for minutes.
  - Look at the long hand. Count the minutes.
  - Think of the clock at {time}.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The ship leaves soon. Set the clock!
  - The space walk starts soon. Set the clock!
Reasons the pet gives when it is caught:
  hands: I mixed up the hands. The long hand shows the minutes.
Tonight's question: Ask {name}: "What time does our clock show right now?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The picture line said nothing to do; the Show lines do not repeat the time.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "time3",
 "t": "Quarter Hours",
 "grade": 2,
 "age": "little",
 "idea": "The long hand shows the minutes past the hour.",
 "beats": {
  "remember": [
   "Do you remember this? Set an o'clock time."
  ],
  "explore": [
   "Move the hands on this clock. Set any time you like!"
  ],
  "name": [
   "You set {time}.",
   "The short hand shows the hour.",
   "The long hand shows the minutes past the hour."
  ],
  "together": [
   "Set the clock to {time}. Long hand for minutes.",
   "Look at the long hand. Count the minutes.",
   "Think of the clock at {time}."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The ship leaves soon. Set the clock!",
   "The space walk starts soon. Set the clock!"
  ]
 },
 "reasons": {
  "hands": [
   "I mixed up the hands. The long hand shows the minutes."
  ]
 },
 "home": "Ask {name}: \"What time does our clock show right now?\""
}
```

<details><summary>The API's first draft</summary>

```text
Quarter Hours (time3), grade 2, the little pet
Idea: The long hand shows minutes past the hour.

Remember:
  - Do you remember this? Set the clock to {time}.
Explore:
  - Move the hands on this clock. Set any time you like!
Name it:
  - You set {time}.
  - The short hand shows the hour.
  - The long hand shows minutes past {hour}.
Together:
  - Set the clock to show {time}.
  - Look at this clock. What time does it show?
  - At {time} which number does the long hand point to?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space station needs help at {time}. Set the clock.
  - The ship leaves at {time}. Set the clock.
Reasons the pet gives when it is caught:
  hands: Look again. The long hand shows the minutes. | The short hand shows the hour.
Tonight's question: Ask {name}: "What time does our clock show right now?"
About 3.4 minutes.
```

</details>
