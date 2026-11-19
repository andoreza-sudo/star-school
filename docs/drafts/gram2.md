# Draft: Parts of Speech (gram2)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
Parts of Speech (gram2), grade 2, the little pet
Idea: A naming word names a thing. A doing word is an action.

Remember:
  - Do you remember this word? Tap it.
Explore:
  - Sort the words: naming words and doing words.
Name it:
  - {a} is a naming word.
  - {b} is a doing word.
  - A doing word is something you can do.
Together:
  - Sort them with me. Can you do it?
  - Look at the picture. Then read the sentence.
  - Read the sentence. Who is it about? What do they do?
Check me:
  - My turn. Check me!
  - I tap {ans}. Am I right?
Show:
  - The pet shop needs signs. Find each word!
Reasons the pet gives when it is caught:
  posSwap: Oops. I mixed up the naming word and the doing word.
Tonight's question: Ask {name} for doing words you can do at home.
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Explore said "here" twice (the child cannot see where the pet points); it now names the two groups.
- The reason said the rule to the child; it is now the pet's slip (the rule is the repair line the app says).
- Together lines 2 and 3 said "Tap the naming word or the doing word" (the app asks which); they now coach reading the sentence.
- Remember said "Find the sight word we know"; the warm-up says its word.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "gram2",
 "t": "Parts of Speech",
 "grade": 2,
 "age": "little",
 "idea": "A naming word names a thing. A doing word is an action.",
 "beats": {
  "remember": [
   "Do you remember this word? Tap it."
  ],
  "explore": [
   "Sort the words: naming words and doing words."
  ],
  "name": [
   "{a} is a naming word.",
   "{b} is a doing word.",
   "A doing word is something you can do."
  ],
  "together": [
   "Sort them with me. Can you do it?",
   "Look at the picture. Then read the sentence.",
   "Read the sentence. Who is it about? What do they do?"
  ],
  "check": [
   "My turn. Check me!",
   "I tap {ans}. Am I right?"
  ],
  "show": [
   "The pet shop needs signs. Find each word!"
  ]
 },
 "reasons": {
  "posSwap": [
   "Oops. I mixed up the naming word and the doing word."
  ]
 },
 "home": "Ask {name} for doing words you can do at home."
}
```

<details><summary>The API's first draft</summary>

```text
Parts of Speech (gram2), grade 2, the little pet
Idea: Naming words name things. Doing words show action.

Remember:
  - Do you remember this? Find the sight word we know.
Explore:
  - Let's sort the words. Put naming words here and doing words here.
Name it:
  - {a} is a naming word.
  - {b} is a doing word.
  - Naming words name things. Doing words show action.
Together:
  - Sort the words with me.
  - Look at the picture. Tap the naming word or the doing word.
  - Read the sentence. Tap the naming word or the doing word.
Check me:
  - My turn. Check me!
  - I tap {ans}. Am I right?
Show:
  - The pet shop needs signs. Pick the right word for each sign!
Reasons the pet gives when it is caught:
  posSwap: Look again. Naming words name things. Doing words show action.
Tonight's question: Ask {name}: "Can you say a naming word and a doing word?"
About 3.4 minutes.
```

</details>
