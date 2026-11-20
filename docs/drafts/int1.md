# Draft: Integers on a Line (int1)

status: reviewed owner 2026-11-20
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Integers on a Line (int1), grade 6, the teen pet
Idea: Negative numbers sit left of zero, and further left is always less.

Remember:
  - A times fact from before.
Explore:
  - Move the dot anywhere on the line, on either side of zero.
Name it:
  - Your dot is at {x}.
  - That is {n} steps from zero.
  - Left of zero is negative, and further left is always less.
Together:
  - Cold days and deep dives sit below zero. Place it.
  - Count on from the nearest label to read the dot.
  - Picture both on the line. The one further right is greater.
Check me:
  - My turn. Check my work.
  - My answer is {ans}.
Show:
  - The weather station compares cold readings. Sort these out.
Reasons the pet gives when it is caught:
  negSide: I put it on the wrong side of zero. Negatives go left.
  negBig: I went by the size and forgot the sign. Further left is less.
Tonight's question: Ask {name}: "Which is colder, -3 degrees or -8 degrees?"
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Together line 3 said "Type it in words" (they type a number); line 1 always said a cold day (it may be a floor or a depth).
- Show was about floors below ground and "pick the lower one", but Show asks for the greater of two numbers.
- Reasons began "Look again", which the engine says itself for the teen pet.
- Tonight's question used number words.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "int1",
 "t": "Integers on a Line",
 "grade": 6,
 "age": "teen",
 "idea": "Negative numbers sit left of zero, and further left is always less.",
 "beats": {
  "remember": [
   "A times fact from before."
  ],
  "explore": [
   "Move the dot anywhere on the line, on either side of zero."
  ],
  "name": [
   "Your dot is at {x}.",
   "That is {n} steps from zero.",
   "Left of zero is negative, and further left is always less."
  ],
  "together": [
   "Cold days and deep dives sit below zero. Place it.",
   "Count on from the nearest label to read the dot.",
   "Picture both on the line. The one further right is greater."
  ],
  "check": [
   "My turn. Check my work.",
   "My answer is {ans}."
  ],
  "show": [
   "The weather station compares cold readings. Sort these out."
  ]
 },
 "reasons": {
  "negSide": [
   "I put it on the wrong side of zero. Negatives go left."
  ],
  "negBig": [
   "I went by the size and forgot the sign. Further left is less."
  ]
 },
 "home": "Ask {name}: \"Which is colder, -3 degrees or -8 degrees?\""
}
```

<details><summary>The API's first draft</summary>

```text
Integers on a Line (int1), grade 6, the teen pet
Idea: Negative numbers sit to the left of zero, and further left is always less.

Remember:
  - Do you remember this? What is {a} times {b}?
Explore:
  - Move the dot anywhere on the line. Use the steppers any way you like.
Name it:
  - You put the dot at {x}.
  - That is {n} steps from zero.
  - Negative numbers sit to the left of zero, and further left is always less.
Together:
  - Picture a cold day. Put a dot on that temperature.
  - Find the dot. Type the number.
  - Which is greater? Type it in words.
Check me:
  - My turn. Check me!
  - I think it is {ans}. Am I right?
Show:
  - The builders need to set the right floor level below ground.
  - Now compare the depths and pick the lower one.
Reasons the pet gives when it is caught:
  negSide: Look again. That number belongs on the other side of zero.
  negBig: Further left is always less. Check which is left of the other.
Tonight's question: Ask {name}: What does ten below zero look like on a number line?
About 3.5 minutes.
```

</details>
