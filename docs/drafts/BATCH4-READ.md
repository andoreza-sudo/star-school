# Batch 4 read-through: reading for K to 2nd grade, and Pre-K

28 lessons, in map order: Tiny Town (Pre-K math), ABC Beach (Pre-K reading),
then the reading worlds of Kindergarten, 1st and 2nd grade.
Each is what the child hears: the six beats, the pet's reasons when it is caught,
and tonight's question for you. All of them hear the little one pet.

The app fills in each {slot} from the question on screen: {word} is the picture's word,
{letter} the letter or letter team being learned, {other} the second one of a sort,
{n} a number, {ans} the pet's answer. So words, letters and numbers are always right.
The app also says each question itself, after the Together and Show lines.

Until you approve a lesson, it runs on short hand-written lines
(its idea, a Name it line, the pet's reasons), so it works now.

The reading lessons: Explore sorts pictures by a sound, Name it shows the letter,
Together builds words from letter tiles, Check me has the pet read "cat" as "cap"
for the child to fix, and Show is a short sentence to read and match to a picture.

To change a word: edit the JSON in that lesson's file in docs/drafts/.
When you are happy, say so, or run:

`node tools/author.js --approve <stop ...> --by <your name>`

(or all, which also approves any lesson of batches 2 and 3 still waiting).
Approved lessons use their words at the next build.

## 1. Count to 5 (pk_count1)

```text
Idea: One number for each thing.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Fill the frame any way you like!
Name it:
  - You put in {n}.
  - Count each one.
  - One number for each thing.
Together:
  - Put in {n} counters with me.
  - Count each one in the row.
  - Hear the number. Tap it.
Check me:
  - My turn. Check me!
  - I count {ans}. Am I right?
Show:
  - The path needs {n} rocks. Put them in the frame.
  - The shop needs {n} apples. Put them in the frame.
Reasons the pet gives when it is caught:
  off1: Oops. I was one off. Touch each one as you count.
Tonight's question: Ask {name}: "Can you show me four fingers?"
About 3.2 minutes.
```

## 2. Find the Shape (shape1)

```text
Idea: We can name shapes by how they look.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Put each shape with its group.
Name it:
  - You sorted the {a} and the {b}.
  - We can name shapes by how they look.
Together:
  - Sort the shapes with me.
  - Listen. Then tap the shape I name.
  - Some shapes look alike. Look closely.
Check me:
  - My turn. Check me!
  - This is the {ans}!
Show:
  - Find the right shape for the door in Tiny Town.
Reasons the pet gives when it is caught:
  look: Look again. They look alike but they are not the same.
Tonight's question: Ask {name}: "Can you find a triangle in our house?"
About 3.2 minutes.
```

## 3. Hear a Number (pk_num1)

```text
Idea: A number tells how many.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Fill the frame with counters. Any way you like!
Name it:
  - You put {n} in the frame.
  - This says {n}.
  - A number tells how many.
Together:
  - Make {n} in the frame.
  - Count the dots. Tap their number.
  - Listen. Tap the number you hear.
Check me:
  - My turn. Check me!
  - I think it is {ans}.
Show:
  - The path needs {n} stones. Put them in the frame.
Reasons the pet gives when it is caught:
  look: Oops. Those numbers look alike. Look closely.
  off1: Oops. I was one off. Count again.
Tonight's question: Ask {name} to show you 3 fingers, then find the number 3.
About 3.2 minutes.
```

## 4. Which One Is Different (sort1)

```text
Idea: Most are the same. One is different.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Put each picture with its group.
Name it:
  - You sorted them well.
  - Most are the same. One is different.
Together:
  - Look at these. Tap the one that is different.
  - Look again. Tap the one that is different.
  - Look at these shapes. Tap the one that is different.
Check me:
  - My turn. Check me!
  - I pick {ans}. It is different!
Show:
  - Help in the shop. Tap the one that is different.
Reasons the pet gives when it is caught:
  alike: Oops. That one matches the others. Find the odd one.
Tonight's question: Ask {name}: "Which of these is not a fruit?"
About 3.2 minutes.
```

## 5. Which Has More (pk_more1)

```text
Idea: Match them up. The one with some left over has more.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Fill the frame with blue and orange. Any way you like!
Name it:
  - You put in {a} blue and {b} orange.
  - Match them up, one and one.
  - The one with some left over has more.
Together:
  - Match each dot. Then put in more.
  - Look at both plates.
  - Look at every plate.
Check me:
  - My turn. Check me!
  - I pick {ans}. It has the most!
Show:
  - Help set the tables. Tap the plate with the most.
Reasons the pet gives when it is caught:
  fewer: Oops. That plate has fewer. Match them up.
Tonight's question: Ask {name}: "Who has more grapes, you or me?"
About 3.3 minutes.
```

## 6. Count to 10 (pk_count2)

```text
Idea: Each thing gets one number.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Fill the frame with counters. Any way you like!
Name it:
  - You put in {n}.
  - Each thing gets one number.
  - The last number tells how many.
Together:
  - Put in {n} counters with me.
  - Count each one in the picture.
  - Listen. Tap the number you hear.
Check me:
  - My turn. Check me!
  - I count {ans}. Am I right?
Show:
  - The shop needs {n} apples. Put them in the frame!
  - The pond needs {n} fish. Put them in the frame!
Reasons the pet gives when it is caught:
  off1: Oops. I was one off. Count again, one by one.
Tonight's question: Ask {name}: "Can you count 8 things for me?"
About 3.3 minutes.
```

## 7. What Comes Next (pat1)

```text
Idea: Patterns repeat so we know what comes next.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Put each shape with its group.
Name it:
  - Look at these shapes.
  - The pattern repeats.
  - We know what comes next.
Together:
  - Look at the pattern. Say it with me.
  - Say the pattern. What comes next?
  - Say it once more, then keep going.
Check me:
  - My turn. Check me!
  - Next comes the {ans}!
Show:
  - The path in Tiny Town needs a pattern. Which comes next?
Reasons the pet gives when it is caught:
  rep: Oops. I said the last one again. What comes next?
Tonight's question: Ask {name}: "What comes next in this pattern: dog cat dog cat?"
About 3.2 minutes.
```

## 8. Numbers to 10 (pk_num2)

```text
Idea: A number tells how many.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Fill the frame with any counters you like.
Name it:
  - You put {n} in the frame.
  - This says {n}.
  - Every number has its own shape.
Together:
  - Put {n} in the frame for me.
  - Count the dots. Tap their number.
  - Listen. Tap the number you hear.
Check me:
  - My turn. Check me!
  - I think it is {ans}.
Show:
  - The path needs {n} stones. Put them in the frame.
  - The shop needs {n} apples. Put them in the frame.
Reasons the pet gives when it is caught:
  look: Oops. Those numbers look alike. Look closely.
  off1: Oops. I was one off. Count again.
Tonight's question: Ask {name} to find a 7 on a clock or a page.
About 3.3 minutes.
```

## 9. Big and Small (sort2)

```text
Idea: Some things are bigger. Some things are smaller.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Sort these into big ones and small ones. Any way you like!
Name it:
  - Look at these.
  - This one is bigger.
  - This one is smaller.
Together:
  - Sort the big ones and the small ones.
  - Look at both. Which takes more room?
  - Look at all of them first.
Check me:
  - My turn. Check me!
  - I pick {ans}!
Show:
  - The toy shop needs help. Find the one I ask for.
Reasons the pet gives when it is caught:
  size: Oops. I picked the wrong one. Look at the sizes.
Tonight's question: Ask {name} to line up 3 shoes from smallest to biggest.
About 3.2 minutes.
```

## 10. Big Letters (abc1)

```text
Idea: Big letters have names. Words start with a sound.

Remember:
  - Do you remember this? Find the letter {letter}.
Explore:
  - Let's sort the pictures. Listen to the first sound of each.
Name it:
  - {a} and {b} start with {letter}.
  - You know its name!
  - Big letters have names. Words start with a sound.
Together:
  - Listen to {word}. Tap its big letter with me.
  - Look at this picture. Tap its big letter.
  - Listen. Tap the big letter you hear.
Check me:
  - My turn. Check me!
  - That is {ans}!
Show:
  - The beach needs signs. Find each big letter!
Reasons the pet gives when it is caught:
  look: Oops. Those letters look alike. Look closely.
Tonight's question: Ask {name}: "What big letter starts your name?"
About 3.3 minutes.
```

## 11. Little Letters (abc2)

```text
Idea: Little letters have the same names. Some face a different way.

Remember:
  - Do you remember this? Find the letter {letter}.
Explore:
  - Let's sort the pictures by the first sound of each word.
Name it:
  - This is the letter {letter}.
  - {a} and {b} both start with {letter}.
  - Little letters have the same names as big ones.
Together:
  - Listen to the first sound of {word}.
  - Look at the picture. Tap the letter it starts with.
  - Hear the letter name. Tap that little letter.
Check me:
  - My turn. Check me!
  - That is {ans}!
Show:
  - The beach needs signs. Find each little letter!
Reasons the pet gives when it is caught:
  look: Oops. Those letters look alike. Which way does it face?
Tonight's question: Ask {name}: "Can you find the letter a in a book?"
About 3.3 minutes.
```

## 12. Match Big & Little (abc3)

```text
Idea: Each big letter has a little partner.

Remember:
  - Do you remember this? Find the letter {letter}.
Explore:
  - Let's put little letters under their big partners.
Name it:
  - Look at {letter} and {other}.
  - They are partners!
Together:
  - Put each little letter with its big partner.
  - Find its little partner.
  - Find its big partner.
Check me:
  - My turn. Check me!
  - Its little partner is {ans}!
Show:
  - The beach needs signs. Find each little partner!
Reasons the pet gives when it is caught:
  look: Look again. They look alike but they are not partners.
Tonight's question: Ask {name}: "Can you find a big B and little b at home?"
About 3.1 minutes.
```

## 13. Clap the Syllables (syl1)

```text
Idea: Words have parts. Clap once for each part.

Remember:
  - Do you remember this? Count with me.
Explore:
  - Let's sort the pictures. Clap once for each part.
Name it:
  - Listen. Ba, na, na. Clap with me!
  - Clap once for each part.
  - Words have parts. Clap once for each part.
Together:
  - Clap each word. Then put it in its bin.
  - Say the word and clap with me.
  - Say it slowly. Clap each part.
Check me:
  - My turn. Check me!
  - I clap {ans}. Am I right?
Show:
  - The beach needs signs. Clap and pick the right one!
Reasons the pet gives when it is caught:
  clap: Oops. I clapped wrong. Clap once for each part.
Tonight's question: Ask {name}: "Can you clap the parts in banana?"
About 3.3 minutes.
```

## 14. ABC Order (abc4)

```text
Idea: Each letter has its place in the song.

Remember:
  - Do you remember this? Find the letter {letter}.
Explore:
  - Put these letters in ABC order on the sand.
Name it:
  - A, B, C, D. Sing them in order with me.
  - Every letter has its own place in the ABC.
Together:
  - Let's fill the missing spot in this row.
  - Look at the ABC strip. What comes after this?
  - Here is a letter. What comes after it?
Check me:
  - My turn. Check me!
  - After that comes {ans}!
Show:
  - The beach needs signs. Tap what comes after each.
Reasons the pet gives when it is caught:
  abc: Oops. I picked the letter before. We want the one after.
Tonight's question: Ask {name}: "What letter comes after C?"
About 3.3 minutes.
```

## 15. First Sounds (sound1)

```text
Idea: Listen to the first sound. It tells the first letter.

Remember:
  - Do you remember this? Find the letter {letter}.
Explore:
  - Let's sort the pictures. Listen to the first sound of each word.
Name it:
  - {a} and {b} both start with {letter}.
  - Listen to the first sound of each word.
Together:
  - Listen to {word}. Build its first sound with me.
  - Say {word} slowly. Which sound is first?
  - Look at the letter. Find a picture that starts with it.
Check me:
  - My turn. Check me!
  - {word} starts with {ans}.
Show:
  - The meadow gate needs signs. Tap the right picture for each letter!
Reasons the pet gives when it is caught:
  first: Oops. I missed the first sound. Say it slowly.
Tonight's question: Ask {name}: "What is the first sound in dog?"
About 3.3 minutes.
```

## 16. Middle Sounds (sound3)

```text
Idea: Listen to the middle sound.

Remember:
  - Do you remember this? Find the letter {letter}.
Explore:
  - Let's sort the pictures. Listen for the middle sound.
Name it:
  - {a} and {b} have {letter} in the middle.
  - Listen to the middle sound.
Together:
  - Listen to {word}. Build the middle letter with me.
  - Look at this picture. Find its middle letter.
  - Look at {letter}. Find a picture with it in the middle.
Check me:
  - My turn. Check me!
  - The middle letter is {ans}.
Show:
  - The meadow needs signs. Tap the right picture for each letter!
Reasons the pet gives when it is caught:
  mid: Look again. I missed the middle sound. Listen slowly.
Tonight's question: Ask {name}: "What is the middle sound in dog?"
About 3.3 minutes.
```

## 17. Picture Words (pic1)

```text
Idea: Say each sound, then blend them into a word.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Listen to the middle sound.
Name it:
  - {a} and {b} have {letter} in the middle.
  - Say each sound, then blend them.
Together:
  - Look at this picture. Build the word with me.
  - Listen to {word}. Which word matches the picture?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The little farm needs signs. Read each one!
Reasons the pet gives when it is caught:
  first: Oops. I read the first sound wrong. Say it slowly.
  last: Oops. I read the last sound wrong. Say it slowly.
  mid: Oops. I read the middle sound wrong. Say it slowly.
Tonight's question: Ask {name}: "What is the first sound of cat?"
About 3.3 minutes.
```

## 18. Last Sounds (sound2)

```text
Idea: Listen to the last sound.

Remember:
  - Do you remember this? Find the letter {letter}.
Explore:
  - Let's sort the pictures. Listen to the last sound of each word.
Name it:
  - {a} and {b} end with {letter}.
  - Listen to the last sound.
Together:
  - Listen to {word}. Build the last sound with me.
  - Say {word} slowly. Which sound is last?
  - Look at {letter}. Find a picture that ends with it.
Check me:
  - My turn. Check me!
  - {word} ends with {ans}.
Show:
  - The meadow needs signs. Listen for the last sound!
Reasons the pet gives when it is caught:
  last: Oops. I missed the last sound. Say it slowly.
Tonight's question: Ask {name}: "What is the last sound in dog?"
About 3.3 minutes.
```

## 19. Build a Word (build1)

```text
Idea: Build a word one sound at a time: first, middle, last.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Listen to the middle sound.
Name it:
  - {a} and {b} have {letter} in the middle.
  - Build a word one sound at a time.
Together:
  - Look at this picture. Build {word} with me.
  - Listen to {word}. Which word matches it?
  - Read the word. Then tap its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The path needs signs. Build each word for me!
Reasons the pet gives when it is caught:
  first: Oops. I built the first sound wrong.
  last: Oops. I built the last sound wrong.
  mid: Oops. I built the middle sound wrong.
Tonight's question: Ask {name}: "What is the last sound in dog?"
About 3.3 minutes.
```

## 20. Read & Match (sent1)

```text
Idea: Read one word at a time. The words tell the picture.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Listen to the middle sound.
Name it:
  - {a} and {b} have {letter} in the middle.
  - Read one word at a time.
Together:
  - Look at the picture. Build the word with me.
  - Listen to {word}. Which word matches the picture?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The animals need help in the meadow. Read each sentence!
Reasons the pet gives when it is caught:
  first: Oops. I read the first sound wrong.
  last: Oops. I read the last sound wrong.
  mid: Oops. I read the middle sound wrong.
Tonight's question: Ask {name}: "Can you read me a sentence from a book?"
About 3.3 minutes.
```

## 21. Blends (pic2)

```text
Idea: In a blend we say both letters, one after the other.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Put each with its blend.
Name it:
  - {a} and {b} both start with {letter}.
  - We say both sounds in a blend.
Together:
  - Look at the picture. Build the word with me.
  - Say the word slowly. Which word is it?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - Candy Canyon needs signs. Read each one!
Reasons the pet gives when it is caught:
  blend: Oops. I left out one sound of the blend.
  mid: Oops. I read the middle sound wrong.
Tonight's question: Ask {name}: "Can you find a word with a blend in a book?"
About 3.2 minutes.
```

## 22. Build Blends (build2)

```text
Idea: Both letters of the blend go in the word.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Put each one with its blend pattern.
Name it:
  - {a} and {b} both start with {letter}.
  - Both letters of the blend go in the word.
Together:
  - Look at the picture. Build {word} with me.
  - Say {word} slowly. Which word is it?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The candy shop needs signs. Build each word!
Reasons the pet gives when it is caught:
  blend: Oops. I left out one letter of the blend.
  mid: Oops. I built the middle sound wrong.
Tonight's question: Ask {name} to say the letters in "flag", in order.
About 3.3 minutes.
```

## 23. Read Sentences (sent2)

```text
Idea: Read each word then the whole sentence.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Listen to the start.
Name it:
  - {a} and {b} both start with {letter}.
  - Read each word, then the whole sentence.
Together:
  - Look at the picture. Build {word} with me.
  - Listen to {word}. Which word matches the picture?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The candy shop needs signs. Read each one!
Reasons the pet gives when it is caught:
  first: Oops. I read the first sound wrong.
  last: Oops. I read the last sound wrong.
  mid: Oops. I read the middle sound wrong.
  blend: Oops. I left out a letter of the blend.
Tonight's question: Ask {name}: "Can you read me a sentence from a book?"
About 3.2 minutes.
```

## 24. Letter Teams (sound4)

```text
Idea: Some letters work as a team. Together they make one sound.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Put each one with its letter team.
Name it:
  - {a} and {b} both start with {letter}.
  - Those letters work as a team.
Together:
  - Look at the picture. Build {word} with me.
  - Say the word slowly. Which word is it?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - Candy Canyon needs signs. Read each one!
Reasons the pet gives when it is caught:
  dig: Oops. I read the team as one letter.
  mid: Oops. I read the middle vowel wrong.
  last: Oops. I read the last sound wrong.
Tonight's question: Ask {name}: "Can you find a word with the letter team ch?"
About 3.2 minutes.
```

## 25. Silent E (pic3)

```text
Idea: A quiet e at the end makes the vowel say its name.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Put each with its letter pattern.
Name it:
  - {a} and {b} both have {letter}.
  - The e is quiet, but it helps the vowel say its name.
Together:
  - Look at this picture. Build the word with me.
  - Say the word slowly. Which word is it?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The sea needs signs. Read each one!
Reasons the pet gives when it is caught:
  silent: Oops. I left off the quiet e at the end.
  mid: Oops. I read the vowel wrong.
Tonight's question: Ask {name}: "Can you find a word with a silent e?"
About 3.3 minutes.
```

## 26. Build Silent E (build3)

```text
Idea: Do not forget the quiet e at the end.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Listen to the vowel.
Name it:
  - {a} and {b} both have {letter}.
  - The quiet e goes in, though we do not hear it.
Together:
  - Look at this picture. Build the word with me.
  - Listen to {word}. Which word matches?
  - Read the word. Then tap its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The ocean reef needs signs. Build each word!
Reasons the pet gives when it is caught:
  silent: Oops. I left off the quiet e at the end.
  mid: Oops. I built the vowel wrong.
Tonight's question: Ask {name}: "Can you find a word with silent e?"
About 3.3 minutes.
```

## 27. Vowel Teams (pic4)

```text
Idea: Vowel teams are vowels side by side that make one sound.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Put each one with its vowel team.
Name it:
  - {a} and {b} both have {letter}.
  - Those vowels work as a team.
  - Vowels side by side can make one sound.
Together:
  - Look at this picture. Build the word with me.
  - Listen to {word}. Which word matches the picture?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The space station needs signs. Read each one!
Reasons the pet gives when it is caught:
  team: Oops. I read only one vowel of the team.
  mid: Oops. I read the middle vowel wrong.
  last: Oops. I read the last sound wrong.
Tonight's question: Ask {name}: "Can you find a word with a vowel team like boat?"
About 3.3 minutes.
```

## 28. Build Vowel Teams (build4)

```text
Idea: Both vowels go in a vowel team.

Remember:
  - Do you remember this? Listen to the first sound.
Explore:
  - Let's sort the pictures. Put each with its pattern.
Name it:
  - {a} and {b} both have {letter}.
  - Both vowels of a team go in the word.
Together:
  - Look at the picture. Build {word} with me.
  - Listen to {word}. Which word is it?
  - Read the word. Then find its picture.
Check me:
  - My turn. Check me!
  - I built {ans}. Am I right?
Show:
  - The space lab needs signs. Build each one!
Reasons the pet gives when it is caught:
  team: Oops. I left out a vowel of the team.
  mid: Oops. I built the middle vowel wrong.
  last: Oops. I built the last sound wrong.
Tonight's question: Ask {name}: "What word has the team in boat?"
About 3.2 minutes.
```
