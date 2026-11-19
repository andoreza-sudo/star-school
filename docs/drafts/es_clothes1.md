# Draft: ¡A Vestirse! (es_clothes1)

status: unreviewed
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52s-words5.js). -->

## Read-through

```text
¡A Vestirse! (es_clothes1), grade -1, the little pet
Idea: Spanish words for things come with el or la. Learn them together.

Remember:
  - Here is a word from before.
Explore:
  - Listen for el or la. Then sort each picture.
Name it:
  - {a} is an el word.
  - {b} is a la word.
  - Spanish words for things come with el or la. Learn them together.
Together:
  - Sort these into el words and la words.
  - Listen to the whole word. Then tap its picture.
  - Say each one quietly. Which one sounds right?
Check me:
  - My turn. Check me!
  - I pick {ans}. Am I right?
Show:
  - The clothes shop needs price tags. Pick the right words.
Reasons the pet gives when it is caught:
  esArt: Oops. I put the wrong little word in front.
  esEnd: Oops. I went by the last letter. It is only a clue.
  esWord: Oops. I picked a different word.
Tonight's question: Ask {name}: is a shirt "el camisa" or "la camisa"? (la camisa)
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

The first draft's lines were read one by one; most were kept or shortened. Changes:
- The idea said "every Spanish noun": "noun" is a word many of these children do not know yet, and verbs and colours have no el or la, so it now says "words for things".
- Remember said "Tap the right picture" before the app says "Listen. ... Tap its picture.": the same instruction twice; it now only says the word is from before.
- Explore and Together are written once for every Spanish lesson, so the child hears the same steps in each unit: listen for el or la, sort; hear the whole word, tap; say each one quietly and pick.
- Name it lines that said "Listen and say each one with me" came before the app's own "Say it with me!" step: left out (said twice).
- The reasons were advice to the child ("Look again", "Some words break the rule", "That word belongs to a different picture"); each is now the pet's own slip, as the engine says them right after "You caught my mistake!".
- Every line is checked for the little one, the older kid and the teen-like pet (the Spanish map is the same at every grade).
- Name it said "el words and la words go in different bins" (true of the sort, not of the words): left out; the idea says it.
- Show: "label the clothes in the house" became price tags in a shop.
- Tonight's question was about getting dressed, not el or la; it now asks one with its answer.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "es_clothes1",
 "t": "¡A Vestirse!",
 "grade": -1,
 "age": "little",
 "idea": "Spanish words for things come with el or la. Learn them together.",
 "beats": {
  "remember": [
   "Here is a word from before."
  ],
  "explore": [
   "Listen for el or la. Then sort each picture."
  ],
  "name": [
   "{a} is an el word.",
   "{b} is a la word.",
   "Spanish words for things come with el or la. Learn them together."
  ],
  "together": [
   "Sort these into el words and la words.",
   "Listen to the whole word. Then tap its picture.",
   "Say each one quietly. Which one sounds right?"
  ],
  "check": [
   "My turn. Check me!",
   "I pick {ans}. Am I right?"
  ],
  "show": [
   "The clothes shop needs price tags. Pick the right words."
  ]
 },
 "reasons": {
  "esArt": [
   "Oops. I put the wrong little word in front."
  ],
  "esEnd": [
   "Oops. I went by the last letter. It is only a clue."
  ],
  "esWord": [
   "Oops. I picked a different word."
  ]
 },
 "home": "Ask {name}: is a shirt \"el camisa\" or \"la camisa\"? (la camisa)"
}
```

<details><summary>The API's first draft</summary>

```text
¡A Vestirse! (es_clothes1), grade -1, the little pet
Idea: Every Spanish noun comes with el or la.

Remember:
  - Do you remember this? Tap the picture I say.
Explore:
  - Sort the pictures into the el bin and the la bin.
Name it:
  - {a} is an el word.
  - {b} is a la word.
  - el words and la words go in different bins.
Together:
  - Sort these into el words and la words.
  - Hear the word. Tap its picture.
  - Look at the picture. Pick the right way to say it.
Check me:
  - My turn. Check me!
  - I pick {ans}. Am I right?
Show:
  - Help me label the clothes in the house!
Reasons the pet gives when it is caught:
  esArt: Look again. I mixed up el and la.
  esEnd: The last letter can trick us. Listen to the word.
  esWord: That word belongs to the other group.
Tonight's question: Ask {name}: "What clothes do you put on first in the morning?"
About 3.3 minutes.
```

</details>
