# Batch 5r read-through: the K-2 reading stops in new lesson shapes

19 lessons, in map order (Letter Meadow, Candy Canyon, Ocean Reef, Space Station,
Word Workshop). Each is what the child hears: the six beats, the pet's
reasons when it is caught, and tonight's question for you. All of them hear the little one pet.

The app fills in each {slot} from the question on screen: {word} is the word of the question,
{other} a second word, {a} and {b} the two words or pictures of Name it, {letter}
a letter pattern, {n} a number of claps, {ans} the pet's answer. So words are always right.
The app also says each question itself (and tells each story) after the Together and Show lines.

Until you approve a lesson, it runs on short hand-written lines
(its idea, a Name it line, the pet's reasons), so it works now.

The new lesson shapes: word cards to turn over and a word that flashes (sight words),
a rhyme sorter, clap-to-count, letter tiles for a word the child hears (spelling),
a short picture story with who, what and where questions, an opposite (or same-meaning)
pairs match, a sentence fixer (capital letter and end mark), word tiles in order,
a naming and doing word sorter, and an add s or add es sorter (plurals).

To change a word: edit the JSON in that lesson's file in docs/drafts/.
When you are happy, say so, or run:

`node tools/author.js --approve all --batch 5r --by <your name>`

(or name the lessons instead of all). Approved lessons use their words at the next build.
Note: --approve all WITHOUT --batch 5r also approves 21 lessons of other batches still waiting.

## 1. Sight Words (sight1)

```text
Idea: We know sight words by how they look. Look at every letter.

Remember:
  - Do you remember this? Find the letter.
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
  - The meadow path needs signs. Find each word I say!
Reasons the pet gives when it is caught:
  sFirst: Oops. I only looked at the first letter.
Tonight's question: Ask {name} to find the word "the" in a book.
About 3.3 minutes.
```

## 2. Rhyme Time (rhyme1)

```text
Idea: Words that rhyme sound the same at the end.

Remember:
  - Do you remember this? Listen for the first sound.
Explore:
  - Say each picture with {word}. Does it rhyme?
Name it:
  - {a} and {b} sound the same at the end.
  - That is a rhyme!
  - Words that rhyme sound the same at the end.
Together:
  - Say {word}. Then find the one that rhymes.
  - Listen to the end of {word}.
  - Listen to the word. Then find its rhyme.
Check me:
  - My turn. Check me!
  - I pick {ans}. It rhymes with {word}!
Show:
  - The garden needs rhyme labels. Find each rhyme!
Reasons the pet gives when it is caught:
  rFirst: Oops. It starts the same, but the end is different.
  rVow: Oops. Same middle sound, but the end is different.
Tonight's question: Ask {name}: "What rhymes with dog?"
About 3.3 minutes.
```

## 3. More Sight Words (sight2)

```text
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

## 4. Rhyme & Read (rhyme2)

```text
Idea: Words that rhyme sound the same at the end.

Remember:
  - Do you remember this? Find the first sound.
Explore:
  - Say each picture with {word}. Rhyme, or no rhyme?
Name it:
  - {a} and {b} rhyme.
  - Listen: they sound the same at the end.
  - Words that rhyme sound the same at the end.
Together:
  - Say {word}. Which picture rhymes?
  - Read the words. Which one rhymes with {word}?
  - Read the first word. Then find its rhyme.
Check me:
  - My turn. Check me!
  - I pick {ans}. It rhymes with {word}!
Show:
  - The candy shop needs rhyme labels. Read and find each rhyme!
Reasons the pet gives when it is caught:
  rFirst: Oops. That starts the same. Rhymes end the same.
  rVow: Oops. Same middle, but the end is different.
Tonight's question: Ask {name} to read "dog" and "frog" and say why they rhyme.
About 3.3 minutes.
```

## 5. Story Time (comp1)

```text
Idea: A story tells who, what and where. Listen for each one.

Remember:
  - Do you remember this word? Tap it.
Explore:
  - Sort the pictures: who, what or where?
Name it:
  - The {a} is a who.
  - The {b} is a what.
  - A story tells who, what and where.
Together:
  - Look at the pictures as you listen.
  - Listen to the story. Then answer.
  - Listen, then read the words to answer.
Check me:
  - My turn. Check me!
  - I pick {ans}. Am I right?
Show:
  - The candy shop has story time. Answer each question!
Reasons the pet gives when it is caught:
  stWho: Oops. I mixed up who did what.
  stOut: Oops. That was not in the story.
Tonight's question: Ask {name}: "Who was in a story you heard today?"
About 3.2 minutes.
```

## 6. Count the Claps (syl2)

```text
Idea: Words have parts. Clap once for each part you say.

Remember:
  - Do you remember this? Clap the parts of the word.
Explore:
  - {word}! Say it slowly and clap each part.
Name it:
  - {word} has {n} parts.
  - We clapped once for each part.
  - Words have parts. Clap once for each part.
Together:
  - Clap {word} with me. Tap Clap for each part.
  - Say {word} slowly. Count your claps.
  - Read {word} and say it. Count the claps.
Check me:
  - My turn. Check me!
  - I clap {ans}. Am I right?
Show:
  - The candy shop has a clapping game. Clap each word!
Reasons the pet gives when it is caught:
  clap: Oops. I clapped one too many or too few.
Tonight's question: Ask {name} to clap "butterfly". How many claps?
About 3.3 minutes.
```

## 7. Spell Short Words (spell1)

```text
Idea: Listen to each sound. Write a letter for each one.

Remember:
  - Do you remember this? Listen for the first sound.
Explore:
  - Listen: {word}. Build it with the tiles any way you think.
Name it:
  - Look at {word}.
  - Every sound you hear got its letter.
  - Listen to each sound. Write a letter for each one.
Together:
  - Listen to {word}. Build it with me.
  - Listen to {word}. Which word is right?
  - Listen to {word}. Say each sound as you build.
Check me:
  - My turn. Check me!
  - I wrote {ans}. Am I right?
Show:
  - The candy shop needs name tags. Build each word I say!
Reasons the pet gives when it is caught:
  first: Oops. I wrote the first sound wrong.
  last: Oops. I wrote the last sound wrong.
  mid: Oops. I wrote the middle sound wrong.
Tonight's question: Say "map" and ask {name} to write it.
About 3.3 minutes.
```

## 8. Sight Words 3 (sight3)

```text
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
  - The reef needs word signs. Tap each word I say!
Reasons the pet gives when it is caught:
  sFirst: Oops. I only looked at the first letter.
Tonight's question: Ask {name} to find the word "could" in a book tonight.
About 3.3 minutes.
```

## 9. Story Time 2 (comp2)

```text
Idea: Listen to the whole story. Each part tells us something.

Remember:
  - Do you remember this word? Tap it.
Explore:
  - Sort the pictures: who, what or where?
Name it:
  - The {a} is a who.
  - The {b} is a what.
  - Each part of the story tells us something.
Together:
  - Look at the pictures as you listen.
  - Listen to every part. Then answer.
  - Listen, then read the words to answer.
Check me:
  - My turn. Check me!
  - I pick {ans}. Am I right?
Show:
  - The reef has story time. Answer each question!
Reasons the pet gives when it is caught:
  stWho: Oops. I mixed up who found it and who got it.
  stOut: Oops. That was not in the story.
Tonight's question: Ask {name} to tell you a story about a dog, then ask "where?"
About 3.2 minutes.
```

## 10. Spell Blends (spell2)

```text
Idea: In a blend we hear both letters. Write both of them.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Listen: {word}. Build it with the tiles any way you think.
Name it:
  - Look at {word}.
  - Both letters of {letter} are there.
  - In a blend we hear both letters. Write both.
Together:
  - Listen to {word}. Build it with me.
  - Listen to {word}. Which word is right?
  - Listen to {word}. Say both blend letters as you build.
Check me:
  - My turn. Check me!
  - I wrote {ans}. Am I right?
Show:
  - The sea animals need name tags. Build each word I say!
Reasons the pet gives when it is caught:
  blend: Oops. I left out a letter of the blend.
  mid: Oops. I wrote the middle sound wrong.
Tonight's question: Say "frog" and ask {name} to write it.
About 3.3 minutes.
```

## 11. Opposites (vocab1)

```text
Idea: Opposites are as different as can be: hot and cold.

Remember:
  - Do you remember this word? Tap it.
Explore:
  - Match each word to its opposite.
Name it:
  - {a} and {b} are opposites.
  - They are as different as can be.
Together:
  - Match each word to its opposite.
  - Listen to {word}. What is its opposite?
  - Read the word. Then find its opposite.
Check me:
  - My turn. Check me!
  - I think the opposite of {word} is {ans}.
Show:
  - The reef shop needs labels. Find each opposite!
Reasons the pet gives when it is caught:
  oppSame: Oops. That means about the same, not the opposite.
Tonight's question: Ask {name} for the opposite of "up".
About 3.2 minutes.
```

## 12. Capitals & End Marks (gram1)

```text
Idea: A sentence starts with a capital and ends with a mark.

Remember:
  - Do you remember this word? Tap it.
Explore:
  - Fix it: tap for a capital, then tap an end mark.
Name it:
  - A sentence starts with a capital letter.
  - Telling ends with a period.
  - Asking ends with a question mark.
Together:
  - Fix it with me: a capital, then the end mark.
  - Look at the picture. Which way is written right?
  - Which way is written right? Check the start and the end.
Check me:
  - My turn. Check me!
  - I pick this one: {ans} Am I right?
Show:
  - The reef shop needs signs. Pick the one written right!
Reasons the pet gives when it is caught:
  capOff: Oops. I forgot the capital letter at the start.
  endMk: Oops. I used the wrong end mark.
Tonight's question: Ask {name} to point to the capital and the end mark in a sentence.
About 3.3 minutes.
```

## 13. Sight Words 4 (sight4)

```text
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
  - The space station needs word labels. Tap each word I say!
Reasons the pet gives when it is caught:
  sFirst: Oops. I only looked at the first letter.
Tonight's question: Ask {name} to read the word "because" on a sign or a page.
About 3.3 minutes.
```

## 14. Spell Silent E & Teams (spell3)

```text
Idea: Some sounds need more letters: a quiet e, or a vowel team.

Remember:
  - Do you remember this? Listen for the first sound.
Explore:
  - Listen: {word}. Build it with the tiles any way you think.
Name it:
  - Look at {letter} in {word}.
  - Some letters we do not hear. They still go in.
  - The letters we do not hear go in too.
Together:
  - Listen to {word}. Build it with me.
  - Listen to {word}. Which word is right?
  - Listen to {word}. Do not forget the quiet letters.
Check me:
  - My turn. Check me!
  - I wrote {ans}. Am I right?
Show:
  - The space station needs labels. Build each word I say!
Reasons the pet gives when it is caught:
  silent: Oops. I forgot the quiet e at the end.
  team: Oops. I wrote only one letter of the vowel team.
  mid: Oops. I wrote the wrong vowel.
Tonight's question: Say "kite" and ask {name} to write it.
About 3.3 minutes.
```

## 15. Build Sentences (sent3)

```text
Idea: Words go in an order that makes sense.

Remember:
  - Do you remember this word? Tap it.
Explore:
  - Put the words in order. Then read it to me.
Name it:
  - Read it out loud.
  - The words go in an order that makes sense.
Together:
  - Put the words in order. Start with the capital.
  - Which one makes sense, with the right end mark?
  - Read each one out loud. Which sounds right?
Check me:
  - My turn. Check me!
  - I pick this one: {ans} Am I right?
Show:
  - The space station needs messages. Build each one!
Reasons the pet gives when it is caught:
  wOrder: Oops. I mixed up the order of the words.
  endMk: Oops. I used the wrong end mark.
Tonight's question: Ask {name} to make a sentence with "dog", "the" and "runs".
About 3.3 minutes.
```

## 16. Sight Words 5 (sight5)

```text
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
  - The workshop needs word labels. Tap each word I say!
Reasons the pet gives when it is caught:
  sFirst: Oops. I only looked at the first letter.
Tonight's question: Ask {name} to read the word "together" in a book.
About 3.3 minutes.
```

## 17. Parts of Speech (gram2)

```text
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

## 18. Synonyms (vocab2)

```text
Idea: Some words mean almost the same: big and huge.

Remember:
  - Do you remember this word? Tap it.
Explore:
  - Match each word to one that means the same.
Name it:
  - {a} and {b} mean almost the same.
  - They are synonyms!
  - Some words mean almost the same.
Together:
  - Match each word to one that means the same.
  - Listen to {word}. Which word means the same?
  - Read the word. Which one means the same?
Check me:
  - My turn. Check me!
  - I think {ans} means the same as {word}.
Show:
  - The toy shop needs labels. Find each word that means the same!
Reasons the pet gives when it is caught:
  synOpp: Oops. I picked the opposite, not the same.
Tonight's question: Ask {name} for another word for "happy".
About 3.3 minutes.
```

## 19. Plurals (gram3)

```text
Idea: More than one: add s, or es after x, s, sh, ch.

Remember:
  - Do you remember this word? Tap it.
Explore:
  - Sort the pictures: add s, or add e s?
Name it:
  - More than one {b}: add s.
  - More than one {a}: add e and s.
  - Words that end in x, s, sh or ch add e s.
Together:
  - Build the word for more than one {word}.
  - Say the word for more than one {word}.
  - Read it. Which word means more than one {word}?
Check me:
  - My turn. Check me!
  - For more than one, I pick {ans}. Am I right?
Show:
  - The pet shop counts toys. Pick the word for more than one!
Reasons the pet gives when it is caught:
  plEs: Oops. I only added s. This word needs e s.
  plE: Oops. I added e s. This word just needs s.
  plNo: Oops. I forgot the ending for more than one.
Tonight's question: Ask {name}: "One box, two what? One cat, two what?"
About 3.4 minutes.
```
