# Draft: More Sight Words (sight2)

status: reviewed owner 2026-11-19
made: 2026-11-19 by tools/author.js --draft (xAI API)
edited: 2026-11-19 by Claude after reading every line (words only; see "After reading")

<!-- For the owner: read the sheet below, change any wording in the JSON, then replace "unreviewed" above with
     "reviewed <your name> <date>" (or run: node tools/author.js --approve <stop> --by <your name>). Until then the lesson
     runs on its short hand-written fallback words: tools/build.py leaves these words out (52k-words4.js). -->

## Read-through

```text
More Sight Words (sight2), grade 1, the little pet
Idea: We know sight words by how they look. Look at every letter.

Remember:
  - Do you remember this word? Tap it.
Explore:
  - Turn the cards over, one at a time. Find {word}.
Name it:
  - You found {word}!
  - {other} starts the same, but it is not {word}.
  - We know sight words by how they look.
Together:
  - Find the card that looks just like {word}.
  - Listen, then look at every letter.
  - Watch the word flash. Then tap the word you saw.
Check me:
  - My turn. Check me!
  - I tap {ans}. Am I right?
Show:
  - The candy shop needs word signs. Tap each word I say!
Reasons the pet gives when it is caught:
  sFirst: Oops. I only looked at the first letter.
Tonight's question: Ask {name} to find the word "they" in a book tonight.
About 3.3 minutes.
```

## Checks

- All checks pass (beats, length, themes, numbers, slots, kid-safe, tone).

## After reading

- Remember said "Find the word we know by sight"; the warm-up is a word of Sight Words 1 to hear and tap, so it now says "Tap it".
- Explore said "Find the word I say", but this line IS what the app says with the cards: it now names {word}.
- Name it did not say why the look-alike is wrong; it now says it starts the same, then the idea.
- Together line 2 repeated the app's own question ("Tap the word ..."); it now coaches looking at every letter.
- Show said "Read each one" for words the child hears; it now says to tap each word heard.
- The reason told the child to look again; it is now the pet's own slip.
- The idea was only "Look at every letter"; it now says what a sight word is.
- The first draft from the API is kept below as it came, for comparison.

## Words (the draft itself)

```json
{
 "id": "sight2",
 "t": "More Sight Words",
 "grade": 1,
 "age": "little",
 "idea": "We know sight words by how they look. Look at every letter.",
 "beats": {
  "remember": [
   "Do you remember this word? Tap it."
  ],
  "explore": [
   "Turn the cards over, one at a time. Find {word}."
  ],
  "name": [
   "You found {word}!",
   "{other} starts the same, but it is not {word}.",
   "We know sight words by how they look."
  ],
  "together": [
   "Find the card that looks just like {word}.",
   "Listen, then look at every letter.",
   "Watch the word flash. Then tap the word you saw."
  ],
  "check": [
   "My turn. Check me!",
   "I tap {ans}. Am I right?"
  ],
  "show": [
   "The candy shop needs word signs. Tap each word I say!"
  ]
 },
 "reasons": {
  "sFirst": [
   "Oops. I only looked at the first letter."
  ]
 },
 "home": "Ask {name} to find the word \"they\" in a book tonight."
}
```

<details><summary>The API's first draft</summary>

```text
More Sight Words (sight2), grade 1, the little pet
Idea: Sight words we know by how they look.

Remember:
  - Do you remember this? Find the word we know by sight.
Explore:
  - Let's turn the cards. Listen for the word I say.
Name it:
  - Look at every letter in {word}.
  - It is not like {other}.
  - Sight words we know by how they look.
Together:
  - Find its twin that looks just the same.
  - Listen for {word}. Tap the one you hear.
  - Watch it flash then hide. Tap the word you saw.
Check me:
  - My turn. Check me!
  - I tap {ans}. Am I right?
Show:
  - The candy shop needs signs. Read each one!
Reasons the pet gives when it is caught:
  sFirst: Look again. I saw only the first letter.
Tonight's question: Ask {name}: "Can you spot any sight words in a book tonight?"
About 3.3 minutes.
```

</details>
