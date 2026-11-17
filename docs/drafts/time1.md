# Draft: O'Clock (time1)

status: unreviewed
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
O'Clock (time1), grade 1, the little pet
Idea: The short hand shows the hour.

Remember:
  - Do you remember counting on?
Explore:
  - Move the hands. Make any time you like.
Name it:
  - Look at your clock.
  - You set {time}.
  - The short hand shows the hour.
Together:
  - Set the clock to {time}. Short hand first.
  - Look at the short hand. What time is it?
  - Think of the clock at {time}.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The boat needs a time to leave. Set the clock!
  - The fish need a time to eat. Set the clock!
Reasons the pet gives when it is caught:
  hands: I mixed up the hands. The short hand shows the hour.
Tonight's question: Ask {name}: "Can you show me 5 o'clock on our clock?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The symbols line no longer gives the answer; the Show lines do not repeat the time the app says next.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "time1",
 "t": "O'Clock",
 "grade": 1,
 "age": "little",
 "idea": "The short hand shows the hour.",
 "beats": {
  "remember": [
   "Do you remember counting on?"
  ],
  "explore": [
   "Move the hands. Make any time you like."
  ],
  "name": [
   "Look at your clock.",
   "You set {time}.",
   "The short hand shows the hour."
  ],
  "together": [
   "Set the clock to {time}. Short hand first.",
   "Look at the short hand. What time is it?",
   "Think of the clock at {time}."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The boat needs a time to leave. Set the clock!",
   "The fish need a time to eat. Set the clock!"
  ]
 },
 "reasons": {
  "hands": [
   "I mixed up the hands. The short hand shows the hour."
  ]
 },
 "home": "Ask {name}: \"Can you show me 5 o'clock on our clock?\""
}
```

<details><summary>The API's first draft</summary>

```text
O'Clock (time1), grade 1, the little pet
Idea: The short hand shows the hour.

Remember:
  - Do you remember this? What comes after {n}?
Explore:
  - Move the hands. Make any time you like.
Name it:
  - Look at the clocks.
  - You set {time}.
  - The short hand shows the {hour}.
Together:
  - Set the clock to show {time}.
  - Look at this clock. What time is it?
  - At {time} which number does the long hand point to?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The boat leaves at {time}. Set the clock.
  - The fish swim at {time}. Set the clock.
Reasons the pet gives when it is caught:
  hands: The long hand shows minutes. The short hand shows the hour.
Tonight's question: Ask {name}: "Can you show me 5 o'clock on our clock?"
About 3.3 minutes.
```

</details>
