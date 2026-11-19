# Draft: El or La? (es_art1)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52s-words5.js). -->

## Read-through

```text
El or La? (es_art1), grade -1, the little pet
Idea: Listen for el or la. The last letter is only a clue.

Remember:
  - Here is a word from before.
Explore:
  - Listen for el or la. Then sort each picture.
Name it:
  - {a} is an el word.
  - {b} is a la word.
  - Listen for el or la. The last letter is only a clue.
Together:
  - Sort these into el words and la words.
  - Listen to the whole word. Then tap its picture.
  - Say each one quietly. Which one sounds right?
Check me:
  - My turn. Check me!
  - I pick {ans}. Am I right?
Show:
  - The market needs price tags. Pick the right words.
Reasons the pet gives when it is caught:
  esArt: Oops. I put the wrong little word in front.
  esEnd: Oops. I went by the last letter. It is only a clue.
  esWord: Oops. I picked a different word.
Tonight's question: Ask {name} for a word that ends in o but takes la. (la mano)
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
- The idea said "Every Spanish word comes with el or la": this lesson is about the clue of the last letter, so the idea says that.
- Together line 3 said "Hear the picture" (a picture is seen); it is the same line as the other Spanish lessons.
- Tonight's question was open; it now asks for a word that breaks the rule, with an answer for the grown-up.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "es_art1",
 "t": "El or La?",
 "grade": -1,
 "age": "little",
 "idea": "Listen for el or la. The last letter is only a clue.",
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
   "Listen for el or la. The last letter is only a clue."
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
   "The market needs price tags. Pick the right words."
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
 "home": "Ask {name} for a word that ends in o but takes la. (la mano)"
}
```

<details><summary>The API's first draft</summary>

```text
El or La? (es_art1), grade -1, the little pet
Idea: Every Spanish word comes with el or la.

Remember:
  - Do you remember this? Tap the picture of the word you hear.
Explore:
  - Sort the pictures into the el bin and the la bin.
Name it:
  - {a} is an el word.
  - {b} is a la word.
  - Listen and say each one with me.
Together:
  - Sort these into el words and la words.
  - Hear the word. Tap its picture.
  - Hear the picture. Pick the right way to say it.
Check me:
  - My turn. Check me!
  - I pick {ans}. Am I right?
Show:
  - The market needs signs. Choose the right one for each picture.
Reasons the pet gives when it is caught:
  esArt: Look again. We use el with some words and la with others.
  esEnd: The last letter is a clue. It is not always the rule.
  esWord: Each word has its own pair. Listen for the right one.
Tonight's question: Ask {name}: "What is something that is an el word or a la word?"
About 3.3 minutes.
```

</details>
