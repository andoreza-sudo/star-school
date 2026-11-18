# Draft: Groups to 5×5 (mult2)

status: reviewed owner 2026-11-18
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
Groups to 5×5 (mult2), grade 2, the little pet
Idea: Skip count equal groups to find how many.

Remember:
  - Do you remember skip counting? Count by {k}s.
Explore:
  - Make any equal groups you like with the dots.
Name it:
  - You made {a} groups of {b}.
  - {a} groups of {b} is {sum} in all.
  - Skip count equal groups to find how many.
Together:
  - Let's make {a} groups of {b}.
  - Skip count by {b}s. How many in all?
  - Times means groups of. Skip count by {b}s.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space station stacks power cells in equal groups.
Reasons the pet gives when it is caught:
  given: I said a number I could see. Count every dot!
  off1: I was one off. Skip count each group.
Tonight's question: Ask {name}: "Show 4 groups of 3 fingers. How many fingers?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- The idea said little; the symbols line explains the times sign; the Show line no longer asks the child to build.
- Tonight's question made shorter (90 characters at most, like the hand-written lessons).
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "mult2",
 "t": "Groups to 5×5",
 "grade": 2,
 "age": "little",
 "idea": "Skip count equal groups to find how many.",
 "beats": {
  "remember": [
   "Do you remember skip counting? Count by {k}s."
  ],
  "explore": [
   "Make any equal groups you like with the dots."
  ],
  "name": [
   "You made {a} groups of {b}.",
   "{a} groups of {b} is {sum} in all.",
   "Skip count equal groups to find how many."
  ],
  "together": [
   "Let's make {a} groups of {b}.",
   "Skip count by {b}s. How many in all?",
   "Times means groups of. Skip count by {b}s."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The space station stacks power cells in equal groups."
  ]
 },
 "reasons": {
  "given": [
   "I said a number I could see. Count every dot!"
  ],
  "off1": [
   "I was one off. Skip count each group."
  ]
 },
 "home": "Ask {name}: \"Show 4 groups of 3 fingers. How many fingers?\""
}
```

<details><summary>The API's first draft</summary>

```text
Groups to 5×5 (mult2), grade 2, the little pet
Idea: Equal groups can make bigger totals.

Remember:
  - Do you remember this? Show me {n}.
Explore:
  - Make any equal groups you like with the dots.
Name it:
  - You made {a} groups of {b}.
  - {a} groups of {b} is {sum} in all.
  - Equal groups can make bigger totals.
Together:
  - Let's make {a} groups of {b}.
  - Look at the groups. How many in all?
  - How many is {a} groups of {b}?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The space station needs power cells. Fix {a} groups of {b}.
Reasons the pet gives when it is caught:
  given: I said a number I could see. Count every dot!
  off1: One too many. Let us count again together.
Tonight's question: Ask {name}: "Show me four groups of three with your fingers. How many fingers in all?"
About 3.3 minutes.
```

</details>
