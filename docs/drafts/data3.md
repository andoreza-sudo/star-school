# Draft: Scaled Graphs (data3)

status: unreviewed
made: 2026-11-18 by tools/author.js --draft (xAI API)
edited: 2026-11-18 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52h-words.js). -->

## Read-through

```text
Scaled Graphs (data3), grade 3, the kid pet
Idea: Each line or picture can stand for more than one. Count by the scale.

Remember:
  - Warm up with some skip counting.
Explore:
  - Each line on this graph counts {k}. Build any bar graph you like.
Name it:
  - Each line on your graph counts {k}.
  - Your tallest bar shows {a}.
  - Count by the scale, not by the squares.
Together:
  - Build this bar. Count by the scale as you go.
  - Read the graph. Check what each line or picture stands for.
  - No graph this time. Use the key in your head.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The rangers made graphs of the forest animals. Read this one.
  - Here is one more for the rangers.
Reasons the pet gives when it is caught:
  scale: Oops. I counted the squares. Each one stands for more than one.
  skip: Oops. I was one line off. I should count by the scale again.
Tonight's question: Ask {name}: "Each picture means 5. How many is 4 pictures?"
About 3.4 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Explore said "Build any {k} bars" (the slot is the scale, not a number of bars).
- Show said "Make them both": Show reads graphs, it does not build them.
- Tonight's question (cat legs) was not about graphs.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "data3",
 "t": "Scaled Graphs",
 "grade": 3,
 "age": "kid",
 "idea": "Each line or picture can stand for more than one. Count by the scale.",
 "beats": {
  "remember": [
   "Warm up with some skip counting."
  ],
  "explore": [
   "Each line on this graph counts {k}. Build any bar graph you like."
  ],
  "name": [
   "Each line on your graph counts {k}.",
   "Your tallest bar shows {a}.",
   "Count by the scale, not by the squares."
  ],
  "together": [
   "Build this bar. Count by the scale as you go.",
   "Read the graph. Check what each line or picture stands for.",
   "No graph this time. Use the key in your head."
  ],
  "check": [
   "My turn. Check my work.",
   "I think it is {ans}. Am I right?"
  ],
  "show": [
   "The rangers made graphs of the forest animals. Read this one.",
   "Here is one more for the rangers."
  ]
 },
 "reasons": {
  "scale": [
   "Oops. I counted the squares. Each one stands for more than one."
  ],
  "skip": [
   "Oops. I was one line off. I should count by the scale again."
  ]
 },
 "home": "Ask {name}: \"Each picture means 5. How many is 4 pictures?\""
}
```

<details><summary>The API's first draft</summary>

```text
Scaled Graphs (data3), grade 3, the kid pet
Idea: Each line stands for more than one.

Remember:
  - Do you remember this? Count by {k}.
Explore:
  - Build any {k} bars. Each line counts {k}.
Name it:
  - Each line counts {k}.
  - Your tallest bar shows {a}.
  - Each line stands for more than one so count by the scale.
Together:
  - Build a bar to show {a} on a graph where each line counts {k}.
  - Read this bar graph.
  - Read this graph with a key.
Check me:
  - My turn. Check my work.
  - I think it is {ans}. Am I right?
Show:
  - The forest map needs some graphs. Make them both.
  - One more graph for the rangers.
Reasons the pet gives when it is caught:
  scale: Look closer. Each line stands for more than one. | Count by the scale on the side.
  skip: Look closer. I slipped there.
Tonight's question: Ask {name}: "How many legs do you see on our cat?"
About 3.3 minutes.
```

</details>
