# Draft: A la Escuela (es_school1)

status: unreviewed
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52s-words5.js). -->

## Read-through

```text
A la Escuela (es_school1), grade -1, the little pet
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
  - The classroom needs labels. Pick the right words.
Reasons the pet gives when it is caught:
  esArt: Oops. I put the wrong little word in front.
  esEnd: Oops. I went by the last letter. It is only a clue.
  esWord: Oops. I picked a different word.
Tonight's question: Ask {name} to say "el libro" and "la mochila".
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
- Together line 1 was "Sort these with me" (it did not say how); now the same line as every Spanish lesson.
- Tonight's question asked about things at home in a school lesson; it now names two school words.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "es_school1",
 "t": "A la Escuela",
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
   "The classroom needs labels. Pick the right words."
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
 "home": "Ask {name} to say \"el libro\" and \"la mochila\"."
}
```

<details><summary>The API's first draft</summary>

```text
A la Escuela (es_school1), grade -1, the little pet
Idea: Every Spanish noun comes with el or la.

Remember:
  - Do you remember this? Tap the right picture.
Explore:
  - Sort these pictures. Put each with its el or la bin.
Name it:
  - {a} is an el word.
  - {b} is a la word.
  - Every Spanish noun comes with el or la.
Together:
  - Sort these with me.
  - Hear the word. Tap its picture.
  - Look at the picture. Which way is right?
Check me:
  - My turn. Check me!
  - I pick {ans}. Am I right?
Show:
  - The school needs signs. Tap the right way for each!
Reasons the pet gives when it is caught:
  esArt: Look again. We mix up el and la sometimes.
  esEnd: The last letter is a clue. It is not a rule.
Tonight's question: Ask {name}: "Which things at home are el words or la words?"
About 3.3 minutes.
```

</details>
