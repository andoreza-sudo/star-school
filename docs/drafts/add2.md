# Draft: +9 & Doubles (add2)

status: reviewed owner 2026-11-18
made: 2026-11-17 by tools/author.js --draft (xAI API)
edited: 2026-11-17 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     is not live: tools/build.py leaves its words out (52e-words.js) and refuses any script that names this draft. -->

## Read-through

```text
+9 & Doubles (add2), grade 1, the little pet
Idea: Make a ten first, or use a double.

Remember:
  - Do you remember this? Let's make ten.
Explore:
  - Fill this frame with both colours. Any way you like!
Name it:
  - You made {a} and {b}.
  - {a} and {b} make {sum}.
  - Make a ten first, or use a double.
Together:
  - Build it on the frame. Fill the top ten first.
  - Look at the frame. How many in all?
  - Now just the numbers. Make a ten in your head.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The canyon bridge needs boards. Add them up!
Reasons the pet gives when it is caught:
  off1: I was one off. Count each one once.
  given: I said a number I could see. Count them all.
Tonight's question: Ask {name}: "What is 9 plus 6? How did you make a ten?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember line made general (the warm-up says its own number); Together lines fit build, picture and symbols; the Show line no longer asks the child to build (Show items are typed); one off-by-one reason that fits both ways.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "add2",
 "t": "+9 & Doubles",
 "grade": 1,
 "age": "little",
 "idea": "Make a ten first, or use a double.",
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
   "Make a ten first, or use a double."
  ],
  "together": [
   "Build it on the frame. Fill the top ten first.",
   "Look at the frame. How many in all?",
   "Now just the numbers. Make a ten in your head."
  ],
  "check": [
   "My turn. Check me!",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The canyon bridge needs boards. Add them up!"
  ]
 },
 "reasons": {
  "off1": [
   "I was one off. Count each one once."
  ],
  "given": [
   "I said a number I could see. Count them all."
  ]
 },
 "home": "Ask {name}: \"What is 9 plus 6? How did you make a ten?\""
}
```

<details><summary>The API's first draft</summary>

```text
+9 & Doubles (add2), grade 1, the little pet
Idea: Doubles and near doubles help us add.

Remember:
  - Do you remember this? Fill the frame to make ten with {n}.
Explore:
  - Fill this frame with both colours. Any way you like!
Name it:
  - You made {a} and {b}.
  - {a} and {b} make {sum}.
  - Doubles and near doubles help us add.
Together:
  - Build {a} and {b} on the frame.
  - How many do you see all together?
  - {a} and {b} make what?
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - Candy Canyon path needs pieces. Put {a} red and {b} blue.
Reasons the pet gives when it is caught:
  off1: One too many. Look again. | One too few. Check the frame.
  given: I said a number already there. Count all the pieces.
Tonight's question: Ask {name}: "What is nine plus nine?"
About 3.3 minutes.
```

</details>
