# Draft: Missing to 18 (miss2)

status: unreviewed
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Missing to 18 (miss2), grade 1, the little pet
Idea: Count on from one part to the whole.

Remember:
  - Do you remember this? Let's make ten.
Explore:
  - Fill this frame with both colours. Any way you like!
Name it:
  - You made {a} and {b}.
  - {a} and {b} make {sum}.
  - Count on from one part to the whole.
Together:
  - There are {a}. Put in more to make {t}.
  - Count the empty boxes up to {t}.
  - Count on from {a} to {t}.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The canyon path needs stones. How many more?
Reasons the pet gives when it is caught:
  op: I added both numbers. We need the missing part.
  given: I said a number I could see. Count on to find it.
Tonight's question: Ask {name}: "I have 9 grapes. How many more make 15?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The idea had a slot; "{x} colours" in Explore; the reasons now fit a missing-number problem.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "miss2",
 "t": "Missing to 18",
 "grade": 1,
 "age": "little",
 "idea": "Count on from one part to the whole.",
 "beats": {
  "remember": [
   "Do you remember this? Let's make ten."
  ],
  "explore": [
   "Fill this frame with both colours. Any way you like!"
  ],
  "name": [
   "You made {a} and {b}.",
   "{a} and {b} make {sum}.",
   "Count on from one part to the whole."
  ],
  "together": [
   "There are {a}. Put in more to make {t}.",
   "Count the empty boxes up to {t}.",
   "Count on from {a} to {t}."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The canyon path needs stones. How many more?"
  ]
 },
 "reasons": {
  "op": [
   "I added both numbers. We need the missing part."
  ],
  "given": [
   "I said a number I could see. Count on to find it."
  ]
 },
 "home": "Ask {name}: \"I have 9 grapes. How many more make 15?\""
}
```

<details><summary>The API's first draft</summary>

```text
Missing to 18 (miss2), grade 1, the little pet
Idea: Parts can make {sum}.

Remember:
  - Do you remember this? Show me {n}.
Explore:
  - Fill this frame with {x} colours. Any way you like!
Name it:
  - You made {a} and {b}.
  - {a} and {b} make {sum}.
  - Parts can make {sum}.
Together:
  - There are {a} counters. Put in more to make {t}.
  - How many more to make {t}?
  - {a} and how many make {t}?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The path needs {t} rocks. {a} are down. How many more?
Reasons the pet gives when it is caught:
  op: I added instead of taking away. Let's look again.
  given: I said a number I could see. Count the empty spots!
Tonight's question: Ask {name}: "If I have 9 candies, how many more make 18?"
About 3.3 minutes.
```

</details>
