/* Star School teachrd v179. BUILT by tools/build.py from 52k-teach4.css, 52k-words4.js, 52l-bench4.js, 52m-lessons4.js: never edit by hand.
   index.html v179 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v179.js. */
(function(){var s=document.createElement('style');s.id='css-teachrd';s.textContent="/* TEACH-4: the reading and Pre-K lessons (52l-bench4.js, 52m-lessons4.js, part teachrd): the reading map's colours on the lesson screen,\n   the letter big on the card, word boxes with a letter missing, the pet's letters in Check me, pictures with their words. Tokens only. */\n.ls-top.s-read .ls-pip.on{background:var(--read);color:var(--surface)}\n.ls-top.s-read .ls-pip.now{background:var(--read-tint);color:var(--read-shade);box-shadow:inset 0 0 0 3px var(--read)}\n.ls4-pic{display:inline-flex;align-items:center;justify-content:center;line-height:1}\n.ls4-pic .art{display:block}\n.ls4-big{font-size:var(--fs-7);font-weight:700;line-height:1.1;color:var(--ink);background:var(--read-tint);border-radius:var(--r-card);padding:0 var(--s-4);min-width:1.6em;text-align:center}\n.ls4-row{display:flex;gap:var(--s-4);justify-content:center;align-items:flex-end;flex-wrap:wrap;margin-top:var(--s-2)}\n.ls4-m{font-size:clamp(48px,14vmin,88px)}\n.ls4-nw{display:flex;flex-direction:column;align-items:center;gap:var(--s-1)}\n.ls4-wd{font-size:var(--fs-5);font-weight:700;color:var(--ink);letter-spacing:.04em}\n.ls4-wd b{color:var(--read-shade);text-decoration:underline;text-underline-offset:.15em}\n.ls4-gap{align-items:flex-end}\n.ls4-l{font-size:calc(clamp(36px,9vmin,72px)*var(--k));font-weight:700;line-height:1.35;color:var(--ink)}\n.ls.ls4-f{color:var(--ink);font-weight:700}\n.ls-pw.ls4-pw .ls,.ls4-gap .ls.ls4-f{background:var(--star-tint)}\n.ls4-pick{margin-top:var(--s-2);display:flex;flex-wrap:wrap;gap:var(--s-2);justify-content:center}\n.ls4-pk{display:inline-flex;align-items:center;justify-content:center;min-width:64px;min-height:64px;padding:var(--s-1);font-size:clamp(32px,6vh,52px);font-weight:700;color:var(--ink);\n  background:var(--surface-2);border-radius:var(--r-card)}\n.ls4-pk.on{background:var(--star-tint);box-shadow:inset 0 0 0 4px var(--star)}\n.ls4-pk .pks,.ls4-pk .art{width:1em;height:1em}\n.ls4-word{font-size:var(--fs-7);font-weight:700;color:var(--ink);letter-spacing:.06em;line-height:1.2}\n.ls4-sent{font-size:var(--fs-5);font-weight:700;color:var(--ink);line-height:1.35;max-width:22em}\n.choices.ls4-words{grid-template-columns:1fr}\n.choices.ls4-words .ch{font-size:var(--fs-6);font-weight:700;letter-spacing:.06em}\n.ls4-plate{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;align-items:center;max-width:100%;font-size:clamp(24px,6vmin,40px);line-height:1}\n.ls4-plate .pko{display:inline-flex}\n.choices.ls4-plates .ch{font-size:inherit;padding:var(--s-2)}\n.ls4-bl{display:block;font-size:var(--fs-2);font-weight:700;color:var(--ink)}\n.sbl .ls4-pic{font-size:36px}\n.ls4-strip{display:flex;gap:var(--s-1);justify-content:center;font-size:var(--fs-5);font-weight:700;color:var(--ink-2);margin-bottom:var(--s-1)}\n.ls4-strip span{min-width:1.3em;text-align:center;background:var(--surface-2);border-radius:var(--r-chip)}\n.ls4-strip .ls4-q{color:var(--read-shade);background:var(--read-tint)}\n.ls4-claps{font-size:var(--fs-6);display:flex;align-items:center;justify-content:center;gap:var(--s-2)}\n.ls4-claps .ic{width:.8em;height:.8em}\n@media (max-width:420px){.ls4-big{font-size:var(--fs-6)}.ls4-word{font-size:var(--fs-6)}.ls4-sent{font-size:var(--fs-4)}}\n";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)
/* ---------- TEACH-4: the words of the drafted lessons the owner has reviewed (part teachrd) ----------
   BUILT by tools/build.py from docs/drafts/<stop>.md ("status: reviewed ...") for the scripts that name them (lsDraft4, 52m-lessons4.js):
   never edit by hand. A draft that is not reviewed is never here, so its lesson is not live with its words (it runs on its hand-written fallback words). */
const LSW4 = {
  "abc1": {"idea":"Big letters have names. Words start with a sound.","beats":{"remember":["Do you remember this? Find the letter {letter}."],"explore":["Let's sort the pictures. Listen to the first sound of each."],"name":["{a} and {b} start with {letter}.","You know its name!","Big letters have names. Words start with a sound."],"together":["Listen to {word}. Tap its big letter with me.","Look at this picture. Tap its big letter.","Listen. Tap the big letter you hear."],"check":["My turn. Check me!","That is {ans}!"],"show":["The beach needs signs. Find each big letter!"]},"reasons":{"look":["Oops. Those letters look alike. Look closely."]},"home":"Ask {name}: \"What big letter starts your name?\""},
  "abc2": {"idea":"Little letters have the same names. Some face a different way.","beats":{"remember":["Do you remember this? Find the letter {letter}."],"explore":["Let's sort the pictures by the first sound of each word."],"name":["This is the letter {letter}.","{a} and {b} both start with {letter}.","Little letters have the same names as big ones."],"together":["Listen to the first sound of {word}.","Look at the picture. Tap the letter it starts with.","Hear the letter name. Tap that little letter."],"check":["My turn. Check me!","That is {ans}!"],"show":["The beach needs signs. Find each little letter!"]},"reasons":{"look":["Oops. Those letters look alike. Which way does it face?"]},"home":"Ask {name}: \"Can you find the letter a in a book?\""},
  "abc3": {"idea":"Each big letter has a little partner.","beats":{"remember":["Do you remember this? Find the letter {letter}."],"explore":["Let's put little letters under their big partners."],"name":["Look at {letter} and {other}.","They are partners!"],"together":["Put each little letter with its big partner.","Find its little partner.","Find its big partner."],"check":["My turn. Check me!","Its little partner is {ans}!"],"show":["The beach needs signs. Find each little partner!"]},"reasons":{"look":["Look again. They look alike but they are not partners."]},"home":"Ask {name}: \"Can you find a big B and little b at home?\""},
  "abc4": {"idea":"Each letter has its place in the song.","beats":{"remember":["Do you remember this? Find the letter {letter}."],"explore":["Put these letters in ABC order on the sand."],"name":["A, B, C, D. Sing them in order with me.","Every letter has its own place in the ABC."],"together":["Let's fill the missing spot in this row.","Look at the ABC strip. What comes after this?","Here is a letter. What comes after it?"],"check":["My turn. Check me!","After that comes {ans}!"],"show":["The beach needs signs. Tap what comes after each."]},"reasons":{"abc":["Oops. I picked the letter before. We want the one after."]},"home":"Ask {name}: \"What letter comes after C?\""},
  "build1": {"idea":"Build a word one sound at a time: first, middle, last.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Listen to the middle sound."],"name":["{a} and {b} have {letter} in the middle.","Build a word one sound at a time."],"together":["Look at this picture. Build {word} with me.","Listen to {word}. Which word matches it?","Read the word. Then tap its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["The path needs signs. Build each word for me!"]},"reasons":{"first":["Oops. I built the first sound wrong."],"last":["Oops. I built the last sound wrong."],"mid":["Oops. I built the middle sound wrong."]},"home":"Ask {name}: \"What is the last sound in dog?\""},
  "build2": {"idea":"Both letters of the blend go in the word.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Put each one with its blend pattern."],"name":["{a} and {b} both start with {letter}.","Both letters of the blend go in the word."],"together":["Look at the picture. Build {word} with me.","Say {word} slowly. Which word is it?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["The candy shop needs signs. Build each word!"]},"reasons":{"blend":["Oops. I left out one letter of the blend."],"mid":["Oops. I built the middle sound wrong."]},"home":"Ask {name} to say the letters in \"flag\", in order."},
  "build3": {"idea":"Do not forget the quiet e at the end.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Listen to the vowel."],"name":["{a} and {b} both have {letter}.","The quiet e goes in, though we do not hear it."],"together":["Look at this picture. Build the word with me.","Listen to {word}. Which word matches?","Read the word. Then tap its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["The ocean reef needs signs. Build each word!"]},"reasons":{"silent":["Oops. I left off the quiet e at the end."],"mid":["Oops. I built the vowel wrong."]},"home":"Ask {name}: \"Can you find a word with silent e?\""},
  "build4": {"idea":"Both vowels go in a vowel team.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Put each with its pattern."],"name":["{a} and {b} both have {letter}.","Both vowels of a team go in the word."],"together":["Look at the picture. Build {word} with me.","Listen to {word}. Which word is it?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["The space lab needs signs. Build each one!"]},"reasons":{"team":["Oops. I left out a vowel of the team."],"mid":["Oops. I built the middle vowel wrong."],"last":["Oops. I built the last sound wrong."]},"home":"Ask {name}: \"What word has the team in boat?\""},
  "pat1": {"idea":"Patterns repeat so we know what comes next.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Put each shape with its group."],"name":["Look at these shapes.","The pattern repeats.","We know what comes next."],"together":["Look at the pattern. Say it with me.","Say the pattern. What comes next?","Say it once more, then keep going."],"check":["My turn. Check me!","Next comes the {ans}!"],"show":["The path in Tiny Town needs a pattern. Which comes next?"]},"reasons":{"rep":["Oops. I said the last one again. What comes next?"]},"home":"Ask {name}: \"What comes next in this pattern: dog cat dog cat?\""},
  "pic1": {"idea":"Say each sound, then blend them into a word.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Listen to the middle sound."],"name":["{a} and {b} have {letter} in the middle.","Say each sound, then blend them."],"together":["Look at this picture. Build the word with me.","Listen to {word}. Which word matches the picture?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["The little farm needs signs. Read each one!"]},"reasons":{"first":["Oops. I read the first sound wrong. Say it slowly."],"last":["Oops. I read the last sound wrong. Say it slowly."],"mid":["Oops. I read the middle sound wrong. Say it slowly."]},"home":"Ask {name}: \"What is the first sound of cat?\""},
  "pic2": {"idea":"In a blend we say both letters, one after the other.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Put each with its blend."],"name":["{a} and {b} both start with {letter}.","We say both sounds in a blend."],"together":["Look at the picture. Build the word with me.","Say the word slowly. Which word is it?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["Candy Canyon needs signs. Read each one!"]},"reasons":{"blend":["Oops. I left out one sound of the blend."],"mid":["Oops. I read the middle sound wrong."]},"home":"Ask {name}: \"Can you find a word with a blend in a book?\""},
  "pic3": {"idea":"A quiet e at the end makes the vowel say its name.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Put each with its letter pattern."],"name":["{a} and {b} both have {letter}.","The e is quiet, but it helps the vowel say its name."],"together":["Look at this picture. Build the word with me.","Say the word slowly. Which word is it?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["The sea needs signs. Read each one!"]},"reasons":{"silent":["Oops. I left off the quiet e at the end."],"mid":["Oops. I read the vowel wrong."]},"home":"Ask {name}: \"Can you find a word with a silent e?\""},
  "pic4": {"idea":"Vowel teams are vowels side by side that make one sound.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Put each one with its vowel team."],"name":["{a} and {b} both have {letter}.","Those vowels work as a team.","Vowels side by side can make one sound."],"together":["Look at this picture. Build the word with me.","Listen to {word}. Which word matches the picture?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["The space station needs signs. Read each one!"]},"reasons":{"team":["Oops. I read only one vowel of the team."],"mid":["Oops. I read the middle vowel wrong."],"last":["Oops. I read the last sound wrong."]},"home":"Ask {name}: \"Can you find a word with a vowel team like boat?\""},
  "pk_count1": {"idea":"One number for each thing.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Fill the frame any way you like!"],"name":["You put in {n}.","Count each one.","One number for each thing."],"together":["Put in {n} counters with me.","Count each one in the row.","Hear the number. Tap it."],"check":["My turn. Check me!","I count {ans}. Am I right?"],"show":["The path needs {n} rocks. Put them in the frame.","The shop needs {n} apples. Put them in the frame."]},"reasons":{"off1":["Oops. I was one off. Touch each one as you count."]},"home":"Ask {name}: \"Can you show me four fingers?\""},
  "pk_count2": {"idea":"Each thing gets one number.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Fill the frame with counters. Any way you like!"],"name":["You put in {n}.","Each thing gets one number.","The last number tells how many."],"together":["Put in {n} counters with me.","Count each one in the picture.","Listen. Tap the number you hear."],"check":["My turn. Check me!","I count {ans}. Am I right?"],"show":["The shop needs {n} apples. Put them in the frame!","The pond needs {n} fish. Put them in the frame!"]},"reasons":{"off1":["Oops. I was one off. Count again, one by one."]},"home":"Ask {name}: \"Can you count 8 things for me?\""},
  "pk_more1": {"idea":"Match them up. The one with some left over has more.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Fill the frame with blue and orange. Any way you like!"],"name":["You put in {a} blue and {b} orange.","Match them up, one and one.","The one with some left over has more."],"together":["Match each dot. Then put in more.","Look at both plates.","Look at every plate."],"check":["My turn. Check me!","I pick {ans}. It has the most!"],"show":["Help set the tables. Tap the plate with the most."]},"reasons":{"fewer":["Oops. That plate has fewer. Match them up."]},"home":"Ask {name}: \"Who has more grapes, you or me?\""},
  "pk_num1": {"idea":"A number tells how many.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Fill the frame with counters. Any way you like!"],"name":["You put {n} in the frame.","This says {n}.","A number tells how many."],"together":["Make {n} in the frame.","Count the dots. Tap their number.","Listen. Tap the number you hear."],"check":["My turn. Check me!","I think it is {ans}."],"show":["The path needs {n} stones. Put them in the frame."]},"reasons":{"look":["Oops. Those numbers look alike. Look closely."],"off1":["Oops. I was one off. Count again."]},"home":"Ask {name} to show you 3 fingers, then find the number 3."},
  "pk_num2": {"idea":"A number tells how many.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Fill the frame with any counters you like."],"name":["You put {n} in the frame.","This says {n}.","Every number has its own shape."],"together":["Put {n} in the frame for me.","Count the dots. Tap their number.","Listen. Tap the number you hear."],"check":["My turn. Check me!","I think it is {ans}."],"show":["The path needs {n} stones. Put them in the frame.","The shop needs {n} apples. Put them in the frame."]},"reasons":{"look":["Oops. Those numbers look alike. Look closely."],"off1":["Oops. I was one off. Count again."]},"home":"Ask {name} to find a 7 on a clock or a page."},
  "sent1": {"idea":"Read one word at a time. The words tell the picture.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Listen to the middle sound."],"name":["{a} and {b} have {letter} in the middle.","Read one word at a time."],"together":["Look at the picture. Build the word with me.","Listen to {word}. Which word matches the picture?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["The animals need help in the meadow. Read each sentence!"]},"reasons":{"first":["Oops. I read the first sound wrong."],"last":["Oops. I read the last sound wrong."],"mid":["Oops. I read the middle sound wrong."]},"home":"Ask {name}: \"Can you read me a sentence from a book?\""},
  "sent2": {"idea":"Read each word then the whole sentence.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Listen to the start."],"name":["{a} and {b} both start with {letter}.","Read each word, then the whole sentence."],"together":["Look at the picture. Build {word} with me.","Listen to {word}. Which word matches the picture?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["The candy shop needs signs. Read each one!"]},"reasons":{"first":["Oops. I read the first sound wrong."],"last":["Oops. I read the last sound wrong."],"mid":["Oops. I read the middle sound wrong."],"blend":["Oops. I left out a letter of the blend."]},"home":"Ask {name}: \"Can you read me a sentence from a book?\""},
  "shape1": {"idea":"We can name shapes by how they look.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Put each shape with its group."],"name":["You sorted the {a} and the {b}.","We can name shapes by how they look."],"together":["Sort the shapes with me.","Listen. Then tap the shape I name.","Some shapes look alike. Look closely."],"check":["My turn. Check me!","This is the {ans}!"],"show":["Find the right shape for the door in Tiny Town."]},"reasons":{"look":["Look again. They look alike but they are not the same."]},"home":"Ask {name}: \"Can you find a triangle in our house?\""},
  "sort1": {"idea":"Most are the same. One is different.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Put each picture with its group."],"name":["You sorted them well.","Most are the same. One is different."],"together":["Look at these. Tap the one that is different.","Look again. Tap the one that is different.","Look at these shapes. Tap the one that is different."],"check":["My turn. Check me!","I pick {ans}. It is different!"],"show":["Help in the shop. Tap the one that is different."]},"reasons":{"alike":["Oops. That one matches the others. Find the odd one."]},"home":"Ask {name}: \"Which of these is not a fruit?\""},
  "sort2": {"idea":"Some things are bigger. Some things are smaller.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Sort these into big ones and small ones. Any way you like!"],"name":["Look at these.","This one is bigger.","This one is smaller."],"together":["Sort the big ones and the small ones.","Look at both. Which takes more room?","Look at all of them first."],"check":["My turn. Check me!","I pick {ans}!"],"show":["The toy shop needs help. Find the one I ask for."]},"reasons":{"size":["Oops. I picked the wrong one. Look at the sizes."]},"home":"Ask {name} to line up 3 shoes from smallest to biggest."},
  "sound1": {"idea":"Listen to the first sound. It tells the first letter.","beats":{"remember":["Do you remember this? Find the letter {letter}."],"explore":["Let's sort the pictures. Listen to the first sound of each word."],"name":["{a} and {b} both start with {letter}.","Listen to the first sound of each word."],"together":["Listen to {word}. Build its first sound with me.","Say {word} slowly. Which sound is first?","Look at the letter. Find a picture that starts with it."],"check":["My turn. Check me!","{word} starts with {ans}."],"show":["The meadow gate needs signs. Tap the right picture for each letter!"]},"reasons":{"first":["Oops. I missed the first sound. Say it slowly."]},"home":"Ask {name}: \"What is the first sound in dog?\""},
  "sound2": {"idea":"Listen to the last sound.","beats":{"remember":["Do you remember this? Find the letter {letter}."],"explore":["Let's sort the pictures. Listen to the last sound of each word."],"name":["{a} and {b} end with {letter}.","Listen to the last sound."],"together":["Listen to {word}. Build the last sound with me.","Say {word} slowly. Which sound is last?","Look at {letter}. Find a picture that ends with it."],"check":["My turn. Check me!","{word} ends with {ans}."],"show":["The meadow needs signs. Listen for the last sound!"]},"reasons":{"last":["Oops. I missed the last sound. Say it slowly."]},"home":"Ask {name}: \"What is the last sound in dog?\""},
  "sound3": {"idea":"Listen to the middle sound.","beats":{"remember":["Do you remember this? Find the letter {letter}."],"explore":["Let's sort the pictures. Listen for the middle sound."],"name":["{a} and {b} have {letter} in the middle.","Listen to the middle sound."],"together":["Listen to {word}. Build the middle letter with me.","Look at this picture. Find its middle letter.","Look at {letter}. Find a picture with it in the middle."],"check":["My turn. Check me!","The middle letter is {ans}."],"show":["The meadow needs signs. Tap the right picture for each letter!"]},"reasons":{"mid":["Look again. I missed the middle sound. Listen slowly."]},"home":"Ask {name}: \"What is the middle sound in dog?\""},
  "sound4": {"idea":"Some letters work as a team. Together they make one sound.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Put each one with its letter team."],"name":["{a} and {b} both start with {letter}.","Those letters work as a team."],"together":["Look at the picture. Build {word} with me.","Say the word slowly. Which word is it?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["Candy Canyon needs signs. Read each one!"]},"reasons":{"dig":["Oops. I read the team as one letter."],"mid":["Oops. I read the middle vowel wrong."],"last":["Oops. I read the last sound wrong."]},"home":"Ask {name}: \"Can you find a word with the letter team ch?\""},
  "syl1": {"idea":"Words have parts. Clap once for each part.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Let's sort the pictures. Clap once for each part."],"name":["Listen. Ba, na, na. Clap with me!","Clap once for each part.","Words have parts. Clap once for each part."],"together":["Clap each word. Then put it in its bin.","Say the word and clap with me.","Say it slowly. Clap each part."],"check":["My turn. Check me!","I clap {ans}. Am I right?"],"show":["The beach needs signs. Clap and pick the right one!"]},"reasons":{"clap":["Oops. I clapped wrong. Clap once for each part."]},"home":"Ask {name}: \"Can you clap the parts in banana?\""},
};
/* ---------- TEACH-4: reading for K to 2, and the Pre-K lessons of Tiny Town and ABC Beach (part teachrd; TEACH-PLAN-2 batch 4) ----------
   The workbench pieces, codes and Check me of these lessons (the lessons: 52m-lessons4.js; reviewed words: 52k-words4.js). Every line is
   said, captions are short, pictures are the app's drawings (ART), named aloud. The phonics lesson shape (K to 2nd grade):
     Explore   a sound sort: four drawn pictures, two bins (two letters or letter patterns)
     Name it   the letter big on the card, with the pictures sorted under it
     Together  build the word from letter tiles, then a picture to its written word (three real words differing by the lesson's
               sound), then a written word to its picture (read, nothing said)
     Check me  the pet reads "cat" as "cap" (its letters in the word's boxes); the child marks it, then builds it right
     Show      a decodable sentence matched to one of four pictures (Build lessons: build the word, two extra tiles)
   The pet's readings are real words of the checked contrast sets (PWC), named by what changed: the misconception codes.
   Until the owner approves a draft, a lesson speaks its hand-written fallback, as TEACH-3 does. */

// the subjects with lessons: reading joins math (owner decision 1: the child picks the subject, the planner plans inside it)
if (!LS_SUBJ.includes('read')) LS_SUBJ.push('read');

/* ---- the misconception codes of reading and Pre-K (52b-know.js: d what the idea is, say the pet's repair line, 12 words or fewer) ---- */
Object.assign(BUGS, {
  first: {d: 'hears or reads the first sound wrong (sun as bun)', say: 'Listen to the very first sound.'},
  last: {d: 'hears or reads the last sound wrong (cat as cap)', say: 'Say it slowly. Listen to the very end.'},
  mid: {d: 'reads the middle vowel wrong (cat as cut)', say: 'Look at the letter in the middle.'},
  blend: {d: 'leaves out one letter of a blend (frog as fog)', say: 'Say every letter at the start. Both of them.'},
  dig: {d: 'reads two letters that make one sound as one letter (ship as sip)', say: 'These two letters make one sound together.'},
  silent: {d: 'leaves off the silent e at the end (kite as kit)', say: 'The e at the end changes the vowel sound.'},
  team: {d: 'reads a vowel team as one short vowel (boat as bat)', say: 'Two vowels side by side make one sound.'},
  look: {d: 'picks a letter, number or shape that looks alike (b for d, 6 for 9)', say: 'Look closely. Which way does it face?'},
  fewer: {d: 'picks the group with fewer as the one with more', say: 'Match them up. More has some left over.'},
  alike: {d: 'picks one that is the same as the others', say: 'Find the one that does not match the rest.'},
  rep: {d: 'says the last thing again instead of what comes next', say: 'Say the pattern out loud. What comes next?'},
  clap: {d: 'claps one beat too many or too few', say: 'Clap once for each part you say.'},
  abc: {d: 'picks the letter before instead of the letter after', say: 'Sing the ABC song. Which letter comes after?'},
  size: {d: 'picks the small one when asked for the big one (or the other way)', say: 'Look how tall each one is.'},
});
Object.assign(LSREP.NOTE, {
  first: 'sometimes hears the first sound of a word wrong',
  last: 'sometimes misses the last sound of a word (cat read as cap)',
  mid: 'sometimes reads the middle vowel wrong (cat read as cut)',
  blend: 'sometimes leaves out one letter of a blend (frog read as fog)',
  dig: 'sometimes reads two letters that go together, like sh, as one letter',
  silent: 'sometimes leaves off the silent e (kite read as kit)',
  team: 'sometimes reads two vowels side by side as one short vowel (boat read as bat)',
  look: 'sometimes picks a letter or number that looks alike (b for d, 6 for 9)',
  fewer: 'sometimes picks the group with fewer as the one with more',
  alike: 'sometimes picks one that matches the others when looking for the odd one out',
  rep: 'sometimes repeats the last item of a pattern instead of what comes next',
  clap: 'sometimes claps one beat too many or too few in a word',
  abc: 'sometimes picks the letter before when asked for the letter after',
  size: 'sometimes mixes up the bigger and the smaller one',
});

/* ---- small helpers: the lesson's own random numbers (r), drawn pictures with their names ---- */
const ls4Pick = (r, a) => a[Math.floor(r() * a.length)];
function ls4Shuf(r, a) {
  const o = a.slice();
  for (let i = o.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; }
  return o;
}
// a question of a batch 4 lesson: spoken and big for Pre-K to 1st (pk), its slots (sl) for the words
const ls4Q = (D, st, o) => lsQ(D.sk, D.lv, st, Object.assign({pk: true, sl: {}}, o));
// a drawn picture with its name for screen readers (the drawing itself is aria-hidden)
const ls4Pic = (w, cls) => `<span class="ls4-pic${cls ? ' ' + cls : ''}">${picFor(w)}<span class="a11y-h">${esc(w)}</span></span>`;
const ls4Big = t => `<div class="ls4-big" aria-hidden="true">${esc(t)}</div>`;
// the words a picture choice names aloud: "sun, cup or hat"
const ls4Or = ws => (ws.length > 1 ? ws.slice(0, -1).join(', ') + ' or ' + ws[ws.length - 1] : ws.join(''));
// the pictures of a sort, named before its task ("Sun, sock, moon and map."): a line of its own, so the task stays short
const ls4Names = its => { const ws = its.map(x => x.say || x.v); return k2Cap(ws.slice(0, -1).join(', ') + ' and ' + ws[ws.length - 1]) + '.'; };
// a choice of pictures (v: the word), in the order given
const ls4PicCh = ws => ws.map(w => ({v: w, l: ls4Pic(w), h: true}));
const ls4TxtCh = ws => ws.map(w => ({v: String(w), l: String(w)}));
// a sort: bins [{v, l, h, al}], items [{v, l, h, b, say, al}] in the order shown
function ls4Sort(D, st, bins, items, o) {
  return ls4Q(D, st, Object.assign({kind: 'sort', bins, items, ans: items.map(c => String(c.b)).join('|'), auto: true}, o));
}
const ls4Chip = (w, b) => ({v: w, l: picFor(w), h: true, b, say: w, al: w});
// a word's letters as the boxes of a build (ids ls0.. for the child; none for the pet's work, so ids never repeat)
const ls4Slots = (n, fill, cls) => `<div class="lslots${cls ? ' ' + cls : ''}">${Array.from({length: n}, (_, i) => (fill
  ? `<span class="ls ls4-f">${esc(fill[i] || '')}</span>` : `<span class="ls" id="ls${i}"></span>`)).join('')}</div>`;
// a letter box inside a word: "_un" with box 0 for the first sound, "su_" for the last, "c_t" for the middle (pos: the letters' place)
const ls4Gap = (w, at, len, fill) => `<div class="lslots ls4-gap">${[...w].map((c, i) => (i < at || i >= at + len ? `<span class="ls4-l">${esc(c)}</span>`
  : fill != null ? `<span class="ls ls4-f">${esc(fill[i - at] || '')}</span>` : `<span class="ls" id="ls${i - at}"></span>`)).join('')}</div>`;

/* ---- the words of the phonics lessons: drawn pictures only (ART), each a word a child would say for its picture ---- */
const LS4W = {
  cvc: ['cat', 'dog', 'pig', 'sun', 'bus', 'hat', 'bed', 'cup', 'fox', 'bat', 'bug', 'hen', 'box', 'map', 'pen', 'web', 'tub', 'cap'],
  blend: ['frog', 'crab', 'drum', 'flag', 'star', 'clock', 'truck', 'dress', 'milk', 'tent', 'hand', 'gift'],
  dig: ['ship', 'shell', 'sheep', 'chick', 'cheese', 'chair', 'fish', 'dish', 'duck', 'sock', 'tooth', 'mouth'],
  silent: ['cake', 'kite', 'bike', 'rose', 'bone', 'nose', 'plane', 'dice'],
  team: ['boat', 'coat', 'road', 'soap', 'tree', 'bee', 'sheep', 'cheese', 'leaf', 'beach', 'train', 'moon', 'spoon', 'book'],
};
// the pet's wrong readings: the checked contrast set of a word (PWC), plus a few more for the drawn words it lacks
const LS4_CON = {cap: ['cat', 'cup', 'map', 'tap'], chair: ['hair', 'chain'], dish: ['fish', 'wish', 'dash']};
// never a word of a theme the parent ruled out (CONTENT-01): "spell" is in the contrast set of shell
const LS4_NOT = /^spells?$/;
const ls4Con = w => ((typeof PWC != 'undefined' && PWC[w]) || LS4_CON[w] || []).filter(x => x !== w && !BAD.test(x) && !ksBad(x, true) && !LS4_NOT.test(x));
const LS4_V = 'aeiou';
/* what changed from word w to the pet's reading x: a misconception code, or null. first, last and mid: one letter swapped at the start, the
   end or a middle vowel; blend: one letter of a start or end blend left out; dig: sh, ch, th or ck read as one of its letters; silent: the
   final e left off; team: a vowel team read as one of its vowels */
function ls4Code(w, x) {
  if (!w || !x || w === x) return null;
  if (/^(sh|ch|th)/.test(w) && x === w[0] + w.slice(2)) return 'dig';
  if (/^(sh|ch|th)/.test(w) && x.length == w.length - 1 && x.slice(1) === w.slice(2)) return 'dig';
  if (/e$/.test(w) && x === w.slice(0, -1)) return 'silent';
  const tm = /[aeiou]{2}/.exec(w);
  if (tm && (x === w.slice(0, tm.index) + w[tm.index] + w.slice(tm.index + 2) || x === w.slice(0, tm.index) + w[tm.index + 1] + w.slice(tm.index + 2))) return 'team';
  if (x.length == w.length - 1) {
    for (let i = 0; i < w.length; i++) if (w.slice(0, i) + w.slice(i + 1) === x) {
      const c = w[i], pre = w[i - 1], nx = w[i + 1];
      if (!LS4_V.includes(c) && (i < 2 && !LS4_V.includes(i ? pre : nx) || i >= w.length - 2 && !LS4_V.includes(i == w.length - 1 ? pre : nx))) return 'blend';
    }
    return null;
  }
  if (x.length != w.length) return null;
  const d = [...w].map((c, i) => (c !== x[i] ? i : -1)).filter(i => i >= 0);
  if (d.length != 1) return null;
  const i = d[0];
  if (i == 0) return 'first';
  if (i == w.length - 1) return 'last';
  return LS4_V.includes(w[i]) && LS4_V.includes(x[i]) ? 'mid' : null;
}
// the pet's readings of w with code c (real, kid-safe words)
const ls4Wrong = (w, c) => ls4Con(w).filter(x => ls4Code(w, x) === c);
// a word's key for a sort or a sound question: its first letter, last letter, middle vowel, or its pattern (blend, team, silent e)
const LS4_KEY = {
  first: w => w[0],
  last: w => w[w.length - 1],
  mid: w => (w.length == 3 ? w[1] : null),
  blend: w => (/^(fr|cr|dr|fl|st|cl|tr|pl)/.exec(w) || [])[0] || null,
  dig: w => (/^(sh|ch|th)/.exec(w) || [])[0] || null,
  silent: w => (/^[^aeiou]+([aeiou])[^aeiou]e$/.exec(w) || [])[1] ? (/^[^aeiou]+([aeiou])[^aeiou]e$/.exec(w)[1] + '_e') : null,
  team: w => (/(oa|ee|ea|ai|oo)/.exec(w) || [])[1] || null,
};
// two keys of a pool with at least two drawn pictures each, and two pictures of each (a sort of four)
function ls4Pairs(pool, key, r, want) {
  const by = {};
  for (const w of pool) { const k = LS4_KEY[key](w); if (k && ART[w]) (by[k] = by[k] || []).push(w); }
  const ks = Object.keys(by).filter(k => by[k].length >= 2), a = want && ks.includes(want) ? want : ls4Pick(r, ks), b = ls4Pick(r, ks.filter(k => k !== a));
  return {a, b, wa: ls4Shuf(r, by[a]).slice(0, 2), wb: ls4Shuf(r, by[b]).slice(0, 2)};
}

/* ---- the drafted lessons of batch 4: code here and in 52m, words in docs/drafts (LSW4 once reviewed), else the fallback ---- */
const LS_B4 = [];
function lsDraft4(id, D) {
  D.id = id;
  if (D.first) D.warm = null; // the first stop of a world: nothing to remember yet (no Remember beat until a lesson is due)
  D.band = '4';
  LS_DRAFTED[id] = D;
  if (!LS_B4.includes(id)) LS_B4.push(id);
  return lsEnable4(id, typeof LSW4 != 'undefined' && LSW4[id] ? LSW4[id] : null);
}
// the hand-written fallback words: the idea and tonight's question (in 52m), a Name it line on what the child made (D.fb), the pet's claim
// (D.claim), each code's own reason; the engine's tone lines do the rest
function lsFallback4(D) {
  return {idea: D.idea, home: D.home, beats: {remember: [], explore: [], name: [].concat(D.fb || [], D.idea), together: [], check: ['My turn. Check me!', D.claim || 'I think it is {ans}.'], show: []},
    reasons: Object.fromEntries(D.bugs.map(c => [c, [BUGS[c].say]]))};
}
function lsEnable4(id, W) {
  const D = LS_DRAFTED[id], L = D && lsEnable(id, W || lsFallback4(D));
  if (!L) return null;
  // a sort names its pictures before its task (a line of its own, kept when a draft's lines replace the task)
  const ex = L.exp;
  L.exp = r => { const e = ex(r); if (e.names) e.lines = [e.names].concat(e.lines || []); return e; };
  return Object.assign(L, {band: '4', p: D.p, g: D.g, fb: !W, chk: st => lsChk4(st)});
}

/* ---- Check me: the pet's own announced turn. It answers one of the lesson's questions (its build, or its pick); right about a quarter
   of the time, else wrong by the child's own held idea when it is one of the lesson's, else by the lesson's first the question allows.
   The pet's work is on the card (its letters in the word's boxes, or its pick under the question). Caught: its reason, then the child
   puts it right (the same task, the pet's letter among the tiles). ---- */
function lsFits4(q, v) {
  if (q.kind == 'choice') return q.choices.some(c => c.v === String(v));
  if (q.kind == 'build') return /^[a-z]+$/i.test(String(v)) && String(v).length <= 8;
  if (q.kind == 'make') return LS.fits(q, v);
  return false;
}
// the pet's work on the card
function lsPw4(q, v) {
  v = String(v);
  if (q.kind == 'build') return q.pwHtml ? q.pwHtml(v) : q.html.replace(/<div class="lslots[^"]*">[\s\S]*<\/div>/, ls4Slots(v.length, v, 'ls-pw ls4-pw'));
  if (q.kind == 'choice') {
    // every choice, the pet's pick marked (so the child can see whether it is right)
    return q.html.replace(SLOT, '') + `<div class="ls-pw ls4-pick">${q.choices.map(c => `<span class="ls4-pk${c.v === v ? ' on' : ''}">${c.h ? c.l : esc(c.l)}${c.v === v
      ? '<span class="a11y-h">(the pet\'s pick)</span>' : ''}</span>`).join('')}</div>`;
  }
  return LS.petWork(q, v);
}
function lsChk4(st) {
  const L = st.L, D = LS_DRAFTED[st.id], T = lsTone(), held = st.repair || knowHeld(st.id, st.S, st.day), codes = held && L.bugs.includes(held) ? [held] : L.bugs;
  const petOk = st.r() < LS.PET_OK;
  let q, pv = null, code = null;
  for (let n = 0; n < 40 && pv == null; n++) {
    q = L.q(D.petSt | 0, st.r);
    if (petOk) { pv = q.ans; break; }
    for (const c of n < 30 ? codes : L.bugs) {
      const v = (knowPredict(q)[c] || []).find(x => !lsOk(q, String(x)) && lsFits4(q, x));
      if (v != null) { pv = String(v); code = c; break; }
    }
  }
  if (pv == null) pv = q.ans; // never reached with these lessons (tools/test.js checks every pet turn)
  const ok = lsOk(q, pv), sl = Object.assign({}, q.sl, {ans: lsSayV(q, pv)});
  const claim = lsW(L.w.beats.check.filter(t => /\{ans\}/.test(t)), 0, sl)[0] || `I think it is ${lsSayV(q, pv)}.`;
  return [{m: 'judge', q, pv, petOk: ok, code, pw: lsPw4(q, pv), lines: [T.myTurn, claim],
    after: () => [{m: 'ask', help: 1, fix: 1, q: D.fix ? D.fix(q, pv, st.r) : Object.assign({}, q), lines: [T.fixIt]}]}];
}
// the fix of a build: the same word, the pet's wrong letters among the tiles
function ls4FixBuild(q, pv, r) {
  const extra = [...new Set([...String(pv)].filter(c => !q.word.includes(c)))].slice(0, 2);
  const base = [...q.word], more = q.tiles.filter(t => !base.includes(t) && !extra.includes(t)).slice(0, Math.max(0, 2 - extra.length));
  return Object.assign({}, q, {tiles: ls4Shuf(r, base.concat(extra, more))});
}
/* ---------- TEACH-4: the lessons of batch 4 (part teachrd; the shape and the pieces: 52l-bench4.js) ----------
   Code here (every word, letter and number, the questions by stage: 0 a build or sort with help, 1 a picture, 2 symbols, 3 Show and the
   test-out); words in docs/drafts (until reviewed: the fallback here, the idea, tonight's question, a Name it line, the pet's claim). */
const ls4 = (id, t, p, g, o) => lsSk(id, Object.assign({t, p, g, test: 3, petSt: 0}, o));
// generators of the app run on the lesson's random numbers (so a lesson is the same for its seed)
function ls4Gen(r, fn) {
  const p = RNG;
  RNG = r;
  try { return fn(); } finally { RNG = p; }
}
// an existing question made a lesson question: its stage, the lesson's stop, its codes (no automatic off by one unless asked)
const ls4From = (D, st, q, o) => ls4Q(D, st, Object.assign({}, q, {bug: {off1: []}}, o));

/* ---- the slots each beat has (tools/author.js checks every draft against them; what each beat's words are for, the brief, is in tools/briefs4.js) ---- */
const LS4_SL_SOUND = {remember: ['letter'], explore: ['letter', 'other'], name: ['letter', 'a', 'b'], together: [['word'], ['word'], ['letter']], check: ['ans', 'word'], show: ['letter']};
const LS4_SL_WORD = sh => ({remember: [], explore: ['letter', 'other'], name: ['letter', 'a', 'b'], together: [['word'], ['word'], []], check: ['ans'], show: sh ? ['word'] : []});

/* ---- the sound lessons: First Sounds, Last Sounds, Middle Sounds (K) ----
   key: first, last or mid (LS4_KEY); the wrong letters of the pet and of the tiles come from real contrast words (sun: bun, run, fun). */
const LS4_FIRST = LS4W.cvc.concat(['duck', 'sock', 'fish', 'milk', 'tent', 'hand', 'gift', 'bell', 'book', 'moon', 'leaf', 'car', 'bee', 'cow', 'lion', 'rose', 'nose', 'boat']);
function ls4Sound(id, t, key, pool, o) {
  const pos = key == 'mid' ? 1 : key == 'first' ? 0 : -1, at = w => (pos < 0 ? w.length - 1 : pos), word = key == 'first' ? 'starts with' : key == 'last' ? 'ends with' : 'has in the middle';
  const D = ls4(id, t, 'read', 0, Object.assign({bugs: [key], fam: 'sound', key, slots: LS4_SL_SOUND, claim: key == 'mid' ? 'The middle letter is {ans}.' : `{word} ${word} {ans}.`}, o));
  let ok0 = null; // the drawn words (ART is complete only once the data file has run: read on first use)
  const okL = () => ok0 || (ok0 = pool.filter(w => ART[w] && LS4_KEY[key](w) && !(key == 'first' && /^(sh|ch|th|wh|kn)/.test(w))));
  // letters to offer beside the right one: the contrast words' first, then others (never c with k, never the same letter twice)
  const others = (w, n, r) => {
    const c = LS4_KEY[key](w), from = ls4Wrong(w, key).map(x => x[at(w)]), pool2 = key == 'mid' ? [...LS4_V] : [...'bdfghlmnprstw'];
    const o2 = [...new Set(from.concat(ls4Shuf(r, pool2)))].filter(x => x !== c && !(c == 'c' && x == 'k') && !(c == 'k' && x == 'c'));
    return o2.slice(0, n);
  };
  const pics = (w, n, r) => {
    const c = LS4_KEY[key](w), alt = ls4Shuf(r, okL().filter(x => LS4_KEY[key](x) !== c && !(c == 'c' && LS4_KEY[key](x) == 'k')));
    const out = [];
    for (const x of alt) if (out.length < n - 1 && !out.some(y => LS4_KEY[key](y) == LS4_KEY[key](x))) out.push(x);
    return out;
  };
  D.q = (st, r) => {
    const w = ls4Pick(r, okL()), c = LS4_KEY[key](w), sl = {word: w, letter: c}, hint = {k: 'text', s: `Say it slowly: ${w}. Listen to the ${key == 'mid' ? 'middle' : key == 'first' ? 'start' : 'end'}.`};
    if (st == 0) {
      const ot = others(w, 2, r), tiles = ls4Shuf(r, [c].concat(ot));
      return ls4Q(D, 0, {kind: 'build', word: c, tiles, ans: c, sl: {word: w}, hint, bug: {[key]: ot},
        html: `<div class="emo">${ls4Pic(w)}</div>` + ls4Gap(w, at(w), 1), say: `${w}. Which letter goes in the box?`, label: `${id} ${w}`,
        pwHtml: v => `<div class="emo">${ls4Pic(w)}</div>` + ls4Gap(w, at(w), 1, v)});
    }
    if (st == 1) {
      const ot = others(w, 2, r);
      return ls4Q(D, 1, {kind: 'choice', cls: 'syms', ans: c, choices: ls4TxtCh(ls4Shuf(r, [c].concat(ot))), sl: {word: w}, hint, bug: {[key]: ot},
        html: `<div class="emo">${ls4Pic(w)}</div>`, say: `${w}. What letter does ${w} ${key == 'first' ? 'start with' : key == 'last' ? 'end with' : 'have in the middle'}?`, label: `${id} ${w} pick`});
    }
    const n = st == 3 ? 4 : 3, wr = pics(w, n, r), all = ls4Shuf(r, [w].concat(wr));
    return ls4Q(D, 2, {kind: 'choice', cls: `pics pk${n}`, ans: w, choices: ls4PicCh(all), sl: {letter: c}, bug: {[key]: wr},
      hint: {k: 'text', s: `Say each one slowly. Which one ${word} ${c}?`}, html: ls4Big(c) + `<div class="sub pktxt">${key == 'mid' ? `Which has ${esc(c)} in the middle?` : `Which ${key == 'first' ? 'starts' : 'ends'} with ${esc(c)}?`}</div>`,
      say: `${key == 'mid' ? `Which one has ${c} in the middle?` : `Which one ${word} ${c}?`} ${ls4Or(all)}?`, label: `${id} ${c} ${all.join('/')}`});
  };
  D.exp = r => {
    const P = ls4Pairs(okL(), key, r), items = ls4Shuf(r, P.wa.map(w => ls4Chip(w, P.a)).concat(P.wb.map(w => ls4Chip(w, P.b))));
    const bins = [P.a, P.b].map(x => ({v: x, l: x, al: 'letter ' + x}));
    return {q: ls4Sort(D, 0, bins, items, {sl: {letter: P.a, other: P.b}, say: `Put each picture with its letter: ${P.a} or ${P.b}.`,
      html: `<div class="sub pktxt">${esc(P.a)} or ${esc(P.b)}?</div>`, label: `${id} sort ${P.a}/${P.b}`}), names: ls4Names(items),
    nudge: 'Tap a picture to hear it. Then tap its letter.',
    react: () => ({ctx: {letter: P.a, a: P.wa[0], b: P.wa[1]}, lines: [`${P.wa[0]} and ${P.wa[1]} ${word.replace('has', 'have').replace('starts', 'start').replace('ends', 'end')} ${P.a}.`]})};
  };
  D.name = c => ({html: ls4Big(c.letter) + `<div class="ls4-row">${ls4Pic(c.a, 'ls4-m')}${ls4Pic(c.b, 'ls4-m')}</div>`, sl: c});
  D.fix = (q, pv, r) => q; // the same box and tiles (the pet's letter is one of them)
  D.warm = r => ls4WarmLetter(D)(r);
  return D;
}
// the warm-up of the sound lessons: hear a letter, tap it (three letters)
const ls4WarmLetter = D => r => { const c = ls4Pick(r, [...'smatpnbdfg']), ot = ls4Shuf(r, [...'smatpnbdfgcrhl'].filter(x => x !== c)).slice(0, 2);
  return ls4Q(D, 0, {kind: 'choice', cls: 'syms', ans: c, choices: ls4TxtCh(ls4Shuf(r, [c].concat(ot))), sl: {letter: c}, html: `<div class="pkq">${pkEar()}</div>`,
    say: `Tap the letter ${c}.`, hint: {k: 'text', s: `Look for ${c}.`}, label: `find ${c}`}); };

/* ---- the word lessons: Build a Word, Picture Words, Read & Match (K); Blends, Build Blends, Letter Teams, Silent E, Build Silent E,
   Read Sentences (1st); Vowel Teams, Build Vowel Teams (2nd). key: the sort of Explore; show: 'sent' or 'build' ---- */
// a pattern as said: "a and quiet e" (a_e), "o, a" (oa)
const ls4Spk = k => (/_e$/.test(k) ? `${k[0]} and quiet e` : k.length > 1 ? [...k].join(', ') : k);
const LS4_T = {0: typeof T1 != 'undefined' ? T1 : [], 1: typeof T2 != 'undefined' ? T2 : []};
function ls4Word(id, t, g, pool, key, bugs, show, o) {
  const D = ls4(id, t, 'read', g, Object.assign({bugs, fam: 'word', show, slots: LS4_SL_WORD(show == 'build'),
    claim: 'I built {ans}. Am I right?'}, o));
  const coded = w => ls4Con(w).filter(x => bugs.includes(ls4Code(w, x)));
  let ok0 = null, good0 = null; // the drawn words (ART is complete only once the data file has run: read on first use)
  const okL = () => ok0 || (ok0 = pool.filter(w => ART[w])), good = () => good0 || (good0 = okL().filter(w => coded(w).length));
  // the pictures to offer beside w: drawn words that differ from it by one of the lesson's codes first, then other drawn words of the lesson
  const picsFor = (w, n, r) => {
    const near = ls4Shuf(r, Object.keys(ART).filter(x => x !== w && bugs.includes(ls4Code(w, x)))), rest = ls4Shuf(r, okL().filter(x => x !== w && !near.includes(x)));
    return near.concat(rest).slice(0, n - 1);
  };
  const bugOf = (w, xs) => { const b = {}; for (const x of xs) { const c = ls4Code(w, x); if (c) (b[c] = b[c] || []).push(x); } return b; };
  const sentence = (w, r) => ls4Pick(r, LS4_T[g >= 1 ? 1 : 0]).replace('{a}', (typeof SENT_ART != 'undefined' && SENT_ART[w]) || art(w)).replace('{w}', w);
  D.q = (st, r) => {
    const w = ls4Pick(r, good()), cs = ls4Shuf(r, coded(w)), sl = {word: w}, hint = {k: 'text', s: `Say it slowly: ${w}. One sound at a time.`};
    if (st == 0 || st == 3 && show == 'build') {
      const extra = [...new Set([...cs.join('')].filter(c => !w.includes(c)))].slice(0, 1), more = ls4Shuf(r, [...'bdfgmnprst'].filter(c => !w.includes(c) && !extra.includes(c))).slice(0, 2 - extra.length);
      return ls4Q(D, st == 3 ? 2 : 0, {kind: 'build', word: w, tiles: ls4Shuf(r, [...w].concat(extra, more)), ans: w, sl, hint, bug: bugOf(w, cs),
        html: `<div class="emo">${ls4Pic(w)}</div>` + ls4Slots(w.length), say: `${w}. Build ${w}.`, label: `${id} build ${w}`});
    }
    if (st == 1) {
      const ch = cs.slice(0, 2), fill = ls4Shuf(r, ls4Con(w).filter(x => !ch.includes(x))).slice(0, 2 - ch.length), all = ls4Shuf(r, [w].concat(ch, fill));
      return ls4Q(D, 1, {kind: 'choice', cls: 'ls4-words', ans: w, choices: ls4TxtCh(all), sl, hint, bug: bugOf(w, ch.concat(fill)),
        html: `<div class="emo">${ls4Pic(w)}</div>`, say: `${w}. Which word says ${w}?`, label: `${id} read ${w}`});
    }
    if (st == 2) {
      const ps = picsFor(w, 3, r), all = ls4Shuf(r, [w].concat(ps));
      return ls4Q(D, 2, {kind: 'choice', cls: 'pics pk3', ans: w, choices: ls4PicCh(all), sl: {}, bug: bugOf(w, ps),
        hint: {k: 'text', s: 'Say each sound, then blend them.'}, html: `<div class="ls4-word">${esc(w)}</div>`, say: 'Read the word. Then tap its picture.', label: `${id} pic ${w}`});
    }
    const ps = picsFor(w, 4, r), all = ls4Shuf(r, [w].concat(ps)), s = sentence(w, r);
    return ls4Q(D, 2, {kind: 'choice', cls: 'pics pk4', ans: w, choices: ls4PicCh(all), sl: {}, bug: bugOf(w, ps),
      hint: {k: 'text', s: 'Read it slowly, one word at a time.'}, html: `<div class="sent ls4-sent">${esc(s)}</div>`, say: 'Read it. Then tap the picture that matches.', label: `${id} sent ${w}`});
  };
  D.exp = r => {
    const P = ls4Pairs(o.sortPool || okL(), key, r, o.want), items = ls4Shuf(r, P.wa.map(w => ls4Chip(w, P.a)).concat(P.wb.map(w => ls4Chip(w, P.b))));
    const bins = [P.a, P.b].map(x => ({v: x, l: x, al: x.split('').join(' ').replace('_', 'blank')}));
    return {q: ls4Sort(D, 0, bins, items, {sl: {letter: ls4Spk(P.a), other: ls4Spk(P.b)}, say: `Sort the pictures: ${ls4Spk(P.a)} or ${ls4Spk(P.b)}?`,
      html: `<div class="sub pktxt">${esc(P.a)} or ${esc(P.b)}?</div>`, label: `${id} sort ${P.a}/${P.b}`}), names: ls4Names(items),
    nudge: 'Tap a picture to hear it. Then tap where it goes.',
    react: () => ({ctx: {letter: P.a, a: P.wa[0], b: P.wa[1]}, lines: [`${P.wa[0]} and ${P.wa[1]} both have ${ls4Spk(P.a)}.`]})};
  };
  const mark = (w, k) => { const i = w.indexOf(k.replace(/_e$/, '')); return i < 0 || k.includes('_') ? esc(w) : esc(w.slice(0, i)) + `<b>${esc(k)}</b>` + esc(w.slice(i + k.length)); };
  D.name = c => ({html: ls4Big(c.letter.replace('_', '…')) + `<div class="ls4-row">${[c.a, c.b].map(w => `<span class="ls4-nw">${ls4Pic(w, 'ls4-m')}<span class="ls4-wd">${mark(w, c.letter)}</span></span>`).join('')}</div>`,
    sl: Object.assign({}, c, {letter: ls4Spk(c.letter)})});
  D.fix = (q, pv, r) => ls4FixBuild(q, pv, r);
  D.warm = o.warm || (r => { const w = ls4Pick(r, LS4W.cvc.filter(x => ART[x])), c = w[0], ot = ls4Shuf(r, [...'bdfhmnprst'].filter(x => x !== c && !(c == 'c' && x == 'k'))).slice(0, 2);
    return ls4Q(D, 0, {kind: 'choice', cls: 'syms', ans: c, choices: ls4TxtCh(ls4Shuf(r, [c].concat(ot))), sl: {}, html: `<div class="emo">${ls4Pic(w)}</div>`,
      say: `${w}. What letter does ${w} start with?`, hint: {k: 'text', s: `Say it slowly: ${w}.`}, label: `warm ${w}`}); });
  return D;
}

/* ---- Pre-K, Tiny Town: counting and numbers on the five and ten frame; more; shapes; the odd one out; big and small; patterns ---- */
// the warm-up of the Pre-K lessons (Remember, when nothing older is due): make a small number on the five frame
// the slots of a Pre-K lesson's beats (Together: the build's line only; check: the pet's answer)
const ls4Sl = (remember, explore, name, t1, show) => ({remember, explore, name, together: [t1, [], []], check: ['ans'], show});
const ls4WarmFrame = (D, top) => r => { const n = lsRi(r, 1, top); return lsFrame(D.sk, D.lv, 0, n, 5, {html: lsEq(n) + lsAsk(`Make ${n}.`), say: `Make ${n}.`, sl: {},
  hint: lsFrameHint(n, 5, {}, 'Count as you tap.'), label: `warm ${n}`}); };
// counting to 5 or 10
function ls4Count(id, t, top, o) {
  const D = ls4(id, t, 'math', -1, Object.assign({bugs: ['off1'], petSt: 1, claim: 'I count {ans}. Am I right?',
    fam: 'count', top, slots: ls4Sl([], [], ['n'], ['n'], ['n'])}, o));
  D.q = (st, r) => {
    const n = lsRi(r, 1, top);
    if (st == 0 || st == 3) return lsFrame(D.sk, D.lv, st == 3 ? 2 : 0, n, top, {html: lsEq(n) + lsAsk(`Make ${n}.`), say: `Make ${n}. Put in ${n} counter${n == 1 ? '' : 's'}.`, sl: {n},
      hint: lsFrameHint(n, top, {}, 'Touch each one as you count.'), label: `${id} make ${n}`});
    if (st == 1) return ls4From(D, 1, ls4Gen(r, () => genPkCount(top > 5 ? 2 : 1)), {sl: {}, bug: {}});
    return ls4From(D, 2, ls4Gen(r, () => genPkNum(top > 5 ? 2 : 1)), {sl: {}, bug: {}});
  };
  D.exp = () => ({q: lsFrame(D.sk, D.lv, 0, top, top, {html: lsAsk('Put in as many as you like!'), say: 'Put in as many counters as you like!', goal: 'any', sl: {}}),
    react: v => ({ctx: {n: +v}, lines: [`You put in ${v}!`]})});
  D.name = c => { const n = c.n > 0 ? c.n : Math.min(3, top); return {html: `<div class="pkq">${VIZ.tenFrame(n, top)}</div>` + lsEq(n), sl: {n}}; };
  D.warm = ls4WarmFrame(D, 3);
  return D;
}
// hearing a number
const LS4_LOOKN = {6: 9, 9: 6, 2: 5, 5: 2, 1: 7, 7: 1, 3: 8, 8: 3};
function ls4Num(id, t, top, o) {
  const D = ls4(id, t, 'math', -1, Object.assign({bugs: ['look', 'off1'], petSt: 2, claim: 'I think it is {ans}.',
    fam: 'num', top, slots: ls4Sl([], [], ['n'], ['n'], ['n'])}, o));
  D.q = (st, r) => {
    const n = lsRi(r, 1, top);
    if (st == 0 || st == 3) return lsFrame(D.sk, D.lv, st == 3 ? 2 : 0, n, top, {html: lsAsk('Listen!'), say: `Make ${n}. Put in ${n} counter${n == 1 ? '' : 's'}.`, sl: {n},
      hint: lsFrameHint(n, top, {}, `Count to ${n} as you tap.`), label: `${id} hear ${n}`});
    const lk = LS4_LOOKN[n] != null && LS4_LOOKN[n] <= top ? LS4_LOOKN[n] : null, near = [n - 1, n + 1].filter(x => x >= 0 && x <= top && x !== lk);
    const ds = (lk != null ? [lk] : []).concat(ls4Shuf(r, near)).slice(0, 2), ch = ls4TxtCh(ls4Shuf(r, [n].concat(ds)));
    const bug = {look: lk != null ? [lk] : [], off1: [n - 1, n + 1].filter(x => ds.includes(x))};
    if (st == 1) return ls4Q(D, 1, {kind: 'choice', cls: 'syms', ans: n, choices: ch, sl: {}, bug, html: `<div class="pkq">${VIZ.dots(n, 'row')}</div>` + lsAsk('How many dots?'),
      say: 'How many dots? Tap the number.', hint: {k: 'text', s: 'Touch each dot as you count.'}, label: `${id} dots ${n}`});
    return ls4Q(D, 2, {kind: 'choice', cls: 'syms', ans: n, choices: ch, sl: {}, bug, auto: 'must', html: `<div class="pkq">${pkEar()}</div>` + lsAsk('Which number?'),
      say: `Tap the number ${PK.num(n)}.`, hint: {k: 'html', html: `<div class="pkhint">${VIZ.dots(n, 'row')}</div>`, w: `${PK.num(n)} looks like this.`}, label: `${id} tap ${n}`});
  };
  D.exp = () => ({q: lsFrame(D.sk, D.lv, 0, top, top, {html: lsAsk('Put in as many as you like!'), say: 'Put in as many counters as you like!', goal: 'any', sl: {}}),
    react: v => ({ctx: {n: +v}, lines: [`That is ${v}!`]})});
  D.name = c => { const n = c.n > 0 ? c.n : 3; return {html: `<div class="pkq">${VIZ.tenFrame(n, top)}</div>` + lsEq(n), sl: {n}}; };
  D.warm = ls4WarmFrame(D, 3);
  return D;
}
// groups of things on plates: which has more (two plates, then three, then four)
function ls4Plates(r, k, ob) {
  let ns;
  do { ns = Array.from({length: k}, () => lsRi(r, 1, 5)); } while (new Set(ns).size < k || Math.max(...ns) - [...ns].sort((a, b) => b - a)[1] < 2);
  return ns;
}
const LS4_OBJ = [['duck', 'ducks'], ['apple', 'apples'], ['star', 'stars'], ['cookie', 'cookies'], ['ball', 'balls'], ['car', 'cars'], ['flower', 'flowers'], ['frog', 'frogs']];
function ls4More(id, t, o) {
  const D = ls4(id, t, 'math', -1, Object.assign({bugs: ['fewer'], petSt: 2, claim: 'I pick {ans}. It has the most!',
    fam: 'more', slots: ls4Sl([], [], ['a', 'b'], [], [])}, o));
  const plate = (n, ob) => `<span class="ls4-plate">${PK.row(n, [ob[0], ob[1], ''])}<span class="a11y-h">${n} ${n == 1 ? ob[0] : ob[1]}</span></span>`;
  D.q = (st, r) => {
    if (st == 0) { const n = lsRi(r, 2, 6); return lsFrame(D.sk, D.lv, 0, n + 1, 10, {goal: 'gt', target: n, html: `<div class="pkq">${VIZ.dots(n, 'row')}</div>` + lsAsk('Make more!'),
      say: 'Put in more counters than the dots.', sl: {}, bug: {fewer: [n - 1].filter(x => x >= 0)}, hint: lsFrameHint(n, 10, {}, 'Match each dot. Then put in more.'), label: `${id} more than ${n}`}); }
    const k = st == 1 ? 2 : st == 2 ? 3 : 4, ob = ls4Pick(r, LS4_OBJ), ns = ls4Plates(r, k), top = Math.max(...ns), ch = ns.map((n, i) => ({v: String(i), l: plate(n, ob), h: true}));
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: `pics pk${k} ls4-plates`, ans: String(ns.indexOf(top)), choices: ch, sl: {}, bug: {fewer: ns.map((n, i) => (n < top ? String(i) : null)).filter(x => x != null)},
      html: lsAsk(k == 2 ? 'Which has more?' : 'Which has the most?'), say: `Which plate has ${k == 2 ? 'more' : 'the most'} ${ob[1]}?`, vsay: () => 'this plate',
      hint: {k: 'text', s: 'Match them up. Which one has some left over?'}, label: `${id} more ${ns.join('/')} ${ob[1]}`});
  };
  D.exp = () => ({q: lsFrame2(D.sk, D.lv, 10, 'both', {html: lsAsk('Put in blue and orange!'), say: 'Put in some blue and some orange. Any way you like!', sl: {}}), nudge: 'Use both colours.',
    react: ([a, b]) => ({ctx: {a, b}, lines: [a > b ? 'Blue has more!' : a < b ? 'Orange has more!' : 'They are the same!']})});
  D.name = c => { const a = c.a != c.b ? c.a : 5, b = c.a != c.b ? c.b : 3; return {html: `<div class="pkq">${VIZ.dots(a, 'row')}</div><div class="pkq">${VIZ.dots(b, 'row', {b})}</div>`, sl: {a, b}}; };
  D.warm = ls4WarmFrame(D, 4);
  return D;
}
// shapes
const LS4_SHP = ['circle', 'square', 'triangle', 'rectangle', 'star', 'diamond'], LS4_SHLOOK = {square: ['rectangle', 'diamond'], rectangle: ['square'], diamond: ['square'], circle: [], triangle: ['diamond'], star: []};
function ls4Shape(id, t, o) {
  const D = ls4(id, t, 'math', -1, Object.assign({bugs: ['look'], petSt: 2, claim: 'This is the {ans}!',
    fam: 'shape', slots: ls4Sl([], [], ['a', 'b'], [], [])}, o));
  const sortQ = (r, st) => { const [a, b] = ls4Shuf(r, ['circle', 'square', 'triangle', 'star']).slice(0, 2), cs = ls4Shuf(r, PK.cols());
    const items = ls4Shuf(r, [[a, cs[0]], [a, cs[1]], [b, cs[2]], [b, cs[3]]].map(([s, c]) => ({v: s + c, l: PK.shp(s, c), h: true, b: s, say: s, al: PK.COL[c][0] + ' ' + s})));
    return ls4Sort(D, st, [a, b].map(s => ({v: s, l: PK.shp(s, 1) + `<span class="a11y-h">${s}</span>`, h: true, al: s})), items, {sl: {a, b}, say: `Put the ${a}s together and the ${b}s together.`,
      html: lsAsk('Sort the shapes!'), label: `${id} sort ${a}/${b}`, hint: {k: 'text', s: 'Look at the sides and the corners.'}}); };
  D.q = (st, r) => {
    if (st == 0) return sortQ(r, 0);
    const k = st == 1 ? 3 : 4, ans = ls4Pick(r, st == 1 ? LS4_SHP : ['square', 'rectangle', 'diamond', 'triangle']), lk = LS4_SHLOOK[ans].filter(x => x !== ans);
    const sh = [ans].concat(lk.slice(0, k == 4 ? 2 : 1), ls4Shuf(r, LS4_SHP.filter(x => x !== ans && !lk.includes(x)))).slice(0, k), all = ls4Shuf(r, sh), cs = ls4Shuf(r, PK.cols());
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: `pics pk${k}`, ans, auto: 'must', choices: all.map((s, i) => ({v: s, l: PK.shp(s, cs[i % cs.length]) + `<span class="a11y-h">${s}</span>`, h: true})), sl: {},
      bug: {look: lk.filter(x => sh.includes(x))}, html: `<div class="pkq">${pkEar()}</div>` + lsAsk(`Tap the ${ans}.`), say: `Tap the ${ans}.`,
      hint: {k: 'html', html: `<div class="pkhint">${ans == 'circle' || ans == 'star' ? PK.shp(ans, 1) : PK.sides(ans)}</div>`, w: {circle: 'A circle is round.', square: 'A square has four sides, all the same.',
        triangle: 'A triangle has three sides.', rectangle: 'A rectangle has two long sides and two short sides.', star: 'A star has five points.', diamond: 'A diamond stands on a corner.'}[ans]},
      label: `${id} tap ${ans} ${all.join('/')}`});
  };
  D.exp = r => { const q = sortQ(r, 0), [a, b] = q.bins.map(x => x.v); return {q, nudge: 'Tap a shape, then tap its group.', react: () => ({ctx: {a, b}, lines: [`${a}s here, ${b}s there!`]})}; };
  D.name = c => { const a = c.a || 'circle', b = c.b || 'triangle'; return {html: `<div class="ls4-row">${PK.shp(a, 1)}${PK.shp(a, 4)}</div><div class="ls4-row">${PK.shp(b, 3)}${PK.shp(b, 5)}</div>`, sl: {a, b}}; };
  D.warm = ls4WarmFrame(D, 4);
  return D;
}
// the odd one out
function ls4Odd(id, t, o) {
  const D = ls4(id, t, 'math', -1, Object.assign({bugs: ['alike'], petSt: 2, claim: 'I pick {ans}. It is different!',
    fam: 'odd', slots: ls4Sl([], [], [], [], [])}, o));
  const ANI = ['duck', 'fish', 'frog', 'cat', 'dog', 'pig', 'bird', 'cow', 'owl', 'bee'], FOOD = ['apple', 'banana', 'cookie', 'cake', 'pizza', 'cheese', 'bread', 'milk'];
  D.q = (st, r) => {
    const k = st == 0 ? 3 : 4;
    if (st == 2) { const pr = ls4Pick(r, PK.SAFE), s = ls4Pick(r, ['circle', 'square', 'triangle', 'star']), odd = Math.floor(r() * 4);
      const ch = Array.from({length: 4}, (_, i) => ({v: String(i), l: PK.shp(s, i == odd ? pr[1] : pr[0]) + `<span class="a11y-h">${PK.COL[i == odd ? pr[1] : pr[0]][0]} ${s}</span>`, h: true}));
      return ls4Q(D, 2, {kind: 'choice', cls: 'pics pk4', ans: String(odd), choices: ch, sl: {}, bug: {alike: ch.map(c => c.v).filter(v => v !== String(odd))}, vsay: () => 'this one',
        html: lsAsk('Which one is different?'), say: 'Which one is a different colour?', hint: {k: 'text', s: 'Look at the colours. Three are the same.'}, label: `${id} colour ${s} ${pr}`}); }
    const [A, B] = r() < .5 ? [ANI, FOOD] : [FOOD, ANI], same = ls4Pick(r, A.filter(x => ART[x])), diff = ls4Pick(r, B.filter(x => ART[x])), odd = Math.floor(r() * k);
    const ch = Array.from({length: k}, (_, i) => ({v: String(i), l: ls4Pic(i == odd ? diff : same), h: true}));
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: `pics pk${k}`, ans: String(odd), choices: ch, sl: {}, bug: {alike: ch.map(c => c.v).filter(v => v !== String(odd))}, vsay: () => 'this one',
      html: lsAsk('Which one is different?'), say: 'Which one is different?', hint: {k: 'text', s: 'Three are the same. Find the one that is not.'}, label: `${id} odd ${diff} in ${same}`});
  };
  D.exp = r => { const a = ls4Shuf(r, ANI.filter(x => ART[x])).slice(0, 2), f = ls4Shuf(r, FOOD.filter(x => ART[x])).slice(0, 2), items = ls4Shuf(r, a.map(w => ls4Chip(w, 'ani')).concat(f.map(w => ls4Chip(w, 'food'))));
    return {q: ls4Sort(D, 0, [{v: 'ani', l: ls4Pic('cat') + '<span class="ls4-bl">Animals</span>', h: true, al: 'Animals'}, {v: 'food', l: ls4Pic('apple') + '<span class="ls4-bl">Food</span>', h: true, al: 'Food'}], items,
      {sl: {}, say: 'Put the animals together and the food together.', html: lsAsk('Animals or food?'), label: `${id} sort`}), names: ls4Names(items),
    nudge: 'Tap a picture, then tap its group.', react: () => ({ctx: {}, lines: ['Animals here, food there!']})}; };
  D.name = () => ({html: `<div class="ls4-row">${['duck', 'duck', 'duck', 'apple'].map(w => ls4Pic(w, 'ls4-m')).join('')}</div>`, sl: {}});
  D.warm = ls4WarmFrame(D, 4);
  return D;
}
// big and small
function ls4Size(id, t, o) {
  const D = ls4(id, t, 'math', -1, Object.assign({bugs: ['size'], petSt: 2, claim: 'I pick {ans}!',
    fam: 'size', slots: ls4Sl([], [], [], [], [])}, o));
  const OBJ = ['ball', 'apple', 'duck', 'star', 'cookie', 'car', 'flower', 'frog']; // all drawn (ART)
  const sized = (w, s) => `<span class="pkcell"><span class="pkscale" style="font-size:${s}em">${picFor(w)}</span></span>`;
  const sortQ = (r, st) => { const ws = ls4Shuf(r, OBJ).slice(0, 4), items = ls4Shuf(r, ws.map((w, i) => ({v: w, l: sized(w, i < 2 ? 1.35 : .6), h: true, b: i < 2 ? 'big' : 'small', say: (i < 2 ? 'big ' : 'small ') + w, al: (i < 2 ? 'big ' : 'small ') + w})));
    return ls4Sort(D, st, [{v: 'big', l: 'Big'}, {v: 'small', l: 'Small'}], items, {sl: {}, say: 'Put the big ones together and the small ones together.', html: lsAsk('Big or small?'), label: `${id} sort ${ws.join('/')}`,
      hint: {k: 'text', s: 'Which ones take up lots of room?'}}); };
  D.q = (st, r) => {
    if (st == 0) return sortQ(r, 0);
    const k = st == 1 ? 2 : st == 2 ? 3 : 4, top = k == 2 || r() < .5, w = ls4Pick(r, OBJ), vals = ls4Shuf(r, [.5, .75, 1, 1.35]).slice(0, k), want = top ? Math.max(...vals) : Math.min(...vals), far = top ? Math.min(...vals) : Math.max(...vals);
    const adj = k == 2 ? (top ? 'bigger' : 'smaller') : top ? 'biggest' : 'smallest';
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: `pics pk${k}`, ans: String(vals.indexOf(want)), choices: vals.map((v, i) => ({v: String(i), l: sized(w, v) + `<span class="a11y-h">${v == want ? adj : 'not ' + adj} ${w}</span>`, h: true})), sl: {},
      bug: {size: [String(vals.indexOf(far))]}, vsay: () => 'this one', html: lsAsk(`Tap the ${adj}.`), say: `Tap the ${adj} ${w}.`, hint: {k: 'text', s: 'Look at all of them. Which takes up the most room?'}, label: `${id} ${adj} ${vals.join('/')}`});
  };
  D.exp = r => { const q = sortQ(r, 0); return {q, names: ls4Names(q.items), nudge: 'Tap a picture, then tap Big or Small.', react: () => ({ctx: {}, lines: ['Big ones here, small ones there!']})}; };
  D.name = () => ({html: `<div class="ls4-row">${sized('ball', 1.35)}${sized('ball', .6)}</div>`, sl: {}});
  D.warm = ls4WarmFrame(D, 4);
  return D;
}
// patterns
function ls4Pat(id, t, o) {
  const D = ls4(id, t, 'math', -1, Object.assign({bugs: ['rep'], petSt: 2, claim: 'Next comes the {ans}!',
    fam: 'pat', slots: ls4Sl([], [], [], [], [])}, o));
  const mk = (r, k, abb) => {
    const sh = ls4Shuf(r, ['circle', 'square', 'triangle', 'star', 'diamond']), cs = PK.cols(), A = {s: sh[0], c: cs[0]}, B = {s: sh[1], c: cs[1]}, C = {s: sh[2], c: cs[2]}, E = {s: sh[3], c: cs[3]};
    const seq = abb ? [A, B, B, A, B] : [A, B, A, B, A], next = abb ? B : B, last = seq[seq.length - 1], opts = ls4Shuf(r, [next, abb ? A : A, C, E].slice(0, k));
    const nm = x => `${PK.COL[x.c][0]} ${x.s}`, draw = x => PK.shp(x.s, x.c);
    return {seq, opts, ans: String(opts.indexOf(next)), rep: opts.indexOf(last) >= 0 && last !== next ? [String(opts.indexOf(last))] : [], nm, draw};
  };
  D.q = (st, r) => {
    const k = st == 0 ? 2 : st == 3 ? 4 : 3, P = mk(r, k, st == 2 || st == 3 && r() < .5);
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: `pics pk${k}`, ans: P.ans, choices: P.opts.map((x, i) => ({v: String(i), l: P.draw(x) + `<span class="a11y-h">${P.nm(x)}</span>`, h: true})), sl: {},
      bug: {rep: P.rep}, vsay: v => (P.opts[+v] ? P.opts[+v].s : 'this one'), html: `<div class="pkq pkpat">${P.seq.map(P.draw).join('')}<span class="pkunk">?</span></div>` + lsAsk('What comes next?'),
      say: `${P.seq.map(x => x.s).join(', ')}. What comes next?`, hint: {k: 'text', s: 'Say it with me, then keep going.'}, label: `${id} pattern ${P.seq.map(x => x.s[0]).join('')}`});
  };
  D.exp = r => { const [a, b] = ls4Shuf(r, ['circle', 'square', 'triangle', 'star']).slice(0, 2), cs = ls4Shuf(r, PK.cols());
    const items = ls4Shuf(r, [[a, cs[0]], [a, cs[1]], [b, cs[2]], [b, cs[3]]].map(([s, c]) => ({v: s + c, l: PK.shp(s, c), h: true, b: s, say: s, al: PK.COL[c][0] + ' ' + s})));
    return {q: ls4Sort(D, 0, [a, b].map(s => ({v: s, l: PK.shp(s, 1) + `<span class="a11y-h">${s}</span>`, h: true, al: s})), items, {sl: {}, say: `Put the ${a}s together and the ${b}s together.`, html: lsAsk('Sort the shapes!'), label: `${id} sort`}),
      nudge: 'Tap a shape, then tap its group.', react: () => ({ctx: {}, lines: ['You sorted them!']})}; };
  D.name = (c, r) => { const P = mk(r || mulberry32(5), 2, false); return {html: `<div class="pkq pkpat">${P.seq.concat([P.seq[1]]).map(P.draw).join('')}</div>`, sl: {}}; };
  D.warm = ls4WarmFrame(D, 4);
  return D;
}

/* ---- Pre-K, ABC Beach: big letters, little letters, big and little partners, ABC order, syllable claps ---- */
// a letter and a drawn word that starts with it (single first sound, no blend)
const LS4_LETW = {s: ['sun', 'sock', 'soap'], m: ['moon', 'map', 'milk', 'mouse'], b: ['bus', 'bed', 'ball', 'bee'], c: ['cat', 'cup', 'car', 'cake'], d: ['dog', 'duck', 'dice'],
  f: ['fish', 'fox'], h: ['hat', 'hen', 'hand', 'horse'], p: ['pig', 'pen', 'pizza'], t: ['tub', 'tent', 'tie'], w: ['web', 'water', 'window'], n: ['nose'], e: ['egg', 'elephant'],
  a: ['apple'], l: ['lion', 'leaf', 'lamp'], r: ['rabbit', 'rose', 'road'], g: ['gift']};
const ls4LetWord = (r, c) => ls4Pick(r, (LS4_LETW[c] || []).filter(w => ART[w]));
const LS4_LETS = () => Object.keys(LS4_LETW).filter(c => LS4_LETW[c].some(w => ART[w]));
// look-alike letters first (LOOKU, LOOKL in 20-words.js), then others
const ls4LookOf = (L, up) => [...new Set((up ? LOOKU : LOOKL).filter(g => g.includes(L)).join('').split(''))].filter(x => x !== L);
function ls4Abc(id, t, up, o) {
  const cs = s => (up ? s.toUpperCase() : s), size = up ? 'big' : 'little';
  const D = ls4(id, t, 'read', -1, Object.assign({bugs: ['look'], petSt: 2, claim: 'That is {ans}!',
    fam: 'abc', up, slots: {remember: ['letter'], explore: ['letter', 'other'], name: ['letter', 'a', 'b'], together: [['word'], ['word'], ['letter']], check: ['ans'], show: ['letter']}}, o));
  D.q = (st, r) => {
    const c = ls4Pick(r, LS4_LETS()), L = cs(c), w = ls4LetWord(r, c), lk = ls4LookOf(L, up), k = st == 3 ? 4 : 3;
    const ds = lk.slice(0, st == 0 ? 1 : 2).concat(ls4Shuf(r, [...(up ? ABC_UP : ABC_LOW)].filter(x => x !== L && !lk.includes(x)))).slice(0, k - 1), all = ls4Shuf(r, [L].concat(ds));
    const bug = {look: ds.filter(x => lk.includes(x))};
    if (st == 0) return ls4Q(D, 0, {kind: 'build', word: L, tiles: all, ans: L, sl: {word: w}, bug, html: `<div class="emo">${ls4Pic(w)}</div>` + ls4Gap(cs(w), 0, 1),
      say: `${w}. ${w} starts with ${c}. Find the ${size} ${c}.`, hint: {k: 'html', html: `<div class="pkhint">${ls4Big(L)}</div>`, w: `${c} looks like this.`}, label: `${id} build ${L}`,
      pwHtml: v => `<div class="emo">${ls4Pic(w)}</div>` + ls4Gap(cs(w), 0, 1, v)});
    if (st == 1) return ls4Q(D, 1, {kind: 'choice', cls: 'syms', ans: L, choices: ls4TxtCh(all), sl: {word: w}, bug, html: `<div class="emo">${ls4Pic(w)}</div>`,
      say: `${w}. Tap the ${size} letter ${w} starts with.`, hint: {k: 'text', s: `${w} starts with ${c}.`}, label: `${id} pic ${L}`});
    return ls4Q(D, 2, {kind: 'choice', cls: k == 4 ? 'syms sym4' : 'syms', ans: L, choices: ls4TxtCh(all), sl: {letter: c}, bug, auto: 'must', html: `<div class="pkq">${pkEar()}</div>`,
      say: `Tap the ${size} letter ${c}.`, hint: {k: 'html', html: `<div class="pkhint">${ls4Big(L)}</div>`, w: `${c} is for ${w}.`}, label: `${id} hear ${L}`});
  };
  D.exp = r => {
    const [a, b] = ls4Shuf(r, LS4_LETS().filter(c => (LS4_LETW[c] || []).filter(w => ART[w]).length >= 2)).slice(0, 2), wa = ls4Shuf(r, LS4_LETW[a].filter(w => ART[w])).slice(0, 2), wb = ls4Shuf(r, LS4_LETW[b].filter(w => ART[w])).slice(0, 2);
    const items = ls4Shuf(r, wa.map(w => ls4Chip(w, a)).concat(wb.map(w => ls4Chip(w, b))));
    return {q: ls4Sort(D, 0, [a, b].map(x => ({v: x, l: cs(x), al: 'letter ' + x})), items, {sl: {letter: a, other: b}, say: `Put each picture with its letter: ${a} or ${b}.`,
      html: lsAsk(`${cs(a)} or ${cs(b)}?`), label: `${id} sort ${a}/${b}`}), names: ls4Names(items), nudge: 'Tap a picture to hear it. Then tap its letter.',
    react: () => ({ctx: {letter: a, a: wa[0], b: wa[1]}, lines: [`${wa[0]} and ${wa[1]} start with ${a}.`]})};
  };
  D.name = c => ({html: ls4Big(cs(c.letter)) + `<div class="ls4-row">${ls4Pic(c.a, 'ls4-m')}${ls4Pic(c.b, 'ls4-m')}</div>`, sl: c});
  D.fix = (q, pv, r) => q;
  D.warm = r => ls4WarmLetter(D)(r);
  return D;
}
// big and little partners
function ls4Match(id, t, o) {
  const D = ls4(id, t, 'read', -1, Object.assign({bugs: ['look'], petSt: 1, claim: 'Its little partner is {ans}!',
    fam: 'match', slots: ls4Sl(['letter'], [], ['letter', 'other'], [], [])}, o));
  const LS = 'abdefghmnpqrt';
  const sortQ = (r, st) => { const ls = ls4Shuf(r, [...LS]).slice(0, 3), items = ls4Shuf(r, ls.map(x => ({v: x, l: x, b: x.toUpperCase(), say: x, al: 'little ' + x})));
    return ls4Sort(D, st, ls.map(x => ({v: x.toUpperCase(), l: x.toUpperCase(), al: 'big ' + x})), items, {sl: {}, say: 'Put each little letter with its big partner.', html: lsAsk('Find the partners!'),
      label: `${id} sort ${ls.join('')}`, hint: {k: 'text', s: 'Many partners look alike, just smaller.'}}); };
  D.q = (st, r) => {
    if (st == 0) return sortQ(r, 0);
    const c = ls4Pick(r, [...LS]), down = st != 2, ans = down ? c : c.toUpperCase(), lk = ls4LookOf(ans, !down), k = st == 3 ? 4 : 3;
    const ds = lk.slice(0, 2).concat(ls4Shuf(r, [...(down ? ABC_LOW : ABC_UP)].filter(x => x !== ans && !lk.includes(x)))).slice(0, k - 1), all = ls4Shuf(r, [ans].concat(ds));
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: k == 4 ? 'syms sym4' : 'syms', ans, choices: ls4TxtCh(all), sl: {}, bug: {look: ds.filter(x => lk.includes(x))},
      html: ls4Big(down ? c.toUpperCase() : c), say: down ? `Big ${c}. Tap its little partner.` : `Little ${c}. Tap its big partner.`,
      hint: {k: 'html', html: `<div class="pkhint">${ls4Big(c.toUpperCase() + ' ' + c)}</div>`, w: `Big ${c} and little ${c} are partners.`}, label: `${id} ${down ? 'down' : 'up'} ${c}`});
  };
  D.exp = r => ({q: sortQ(r, 0), nudge: 'Tap a little letter, then its big partner.', react: v => ({ctx: {letter: 'B', other: 'b'}, lines: ['Every letter found its partner!']})});
  D.name = c => ({html: ls4Big((c.letter || 'B') + ' ' + (c.other || 'b')), sl: {letter: c.letter || 'B', other: c.other || 'b'}});
  D.warm = r => ls4WarmLetter(D)(r);
  return D;
}
// ABC order
function ls4Order(id, t, o) {
  const D = ls4(id, t, 'read', -1, Object.assign({bugs: ['abc'], petSt: 2, claim: 'After that comes {ans}!',
    fam: 'order', slots: ls4Sl(['letter'], [], [], [], [])}, o));
  const AL = ABC_LOW, strip = (i) => `<div class="ls4-strip" aria-hidden="true">${[...AL.slice(Math.max(0, i - 3), i + 1)].map(c => `<span>${c}</span>`).join('')}<span class="ls4-q">?</span></div>`;
  D.q = (st, r) => {
    if (st == 0) { const s = lsRi(r, 0, 21), g = lsRi(r, 1, 2), miss = AL[s + g], wrong = [AL[s + g - 1] === miss ? null : AL[s - 1], AL[s + 4], AL[s + 5]].filter(x => x && x !== miss);
      const tiles = ls4Shuf(r, [miss].concat(wrong.slice(0, 2))), run = [0, 1, 2, 3].map(k => (k == g ? '<span class="ls" id="ls0"></span>' : `<span class="ab-l">${AL[s + k]}</span>`)).join('');
      return ls4Q(D, 0, {kind: 'build', word: miss, tiles, ans: miss, sl: {}, bug: {abc: [AL[s + g - 2]].filter(x => x && tiles.includes(x))}, html: `<div class="lslots">${run}</div>`,
        say: `Which letter is missing? ${[0, 1, 2, 3].map(k => (k == g ? 'blank' : AL[s + k])).join(', ')}.`, hint: {k: 'text', s: 'Sing the ABC song up to the blank.'}, label: `${id} gap ${AL[s]}${g}`,
        pwHtml: v => `<div class="lslots">${[0, 1, 2, 3].map(k => (k == g ? `<span class="ls ls4-f">${esc(v)}</span>` : `<span class="ab-l">${AL[s + k]}</span>`)).join('')}</div>`}); }
    const i = lsRi(r, 1, 24), L = AL[i], ans = AL[i + 1], k = st == 3 ? 4 : 3, prev = AL[i - 1], ds = [prev].concat(ls4Shuf(r, [AL[i + 2], AL[i + 3], AL[i - 2]].filter(Boolean))).filter(x => x !== ans && x !== L).slice(0, k - 1);
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: k == 4 ? 'syms sym4' : 'syms', ans, choices: ls4TxtCh(ls4Shuf(r, [ans].concat(ds))), sl: {}, bug: {abc: [prev]},
      html: (st == 1 ? strip(i) : '') + ls4Big(L), say: `What letter comes after ${L}?`, hint: {k: 'text', s: `Sing the ABC song up to ${L}. What comes next?`}, label: `${id} after ${L}`});
  };
  D.exp = r => { const s = lsRi(r, 0, 22), run = [...AL.slice(s, s + 4)], items = ls4Shuf(r, run).map(c => ({v: c, l: c}));
    const q = ls4Q(D, 0, {kind: 'order', items, ans: run, sl: {}, html: lsAsk('ABC order!'), say: 'Put the letters in ABC order. Sing it with me!', label: `${id} order ${run.join('')}`});
    q.ans = run; // an order's answer is the list (lsQ makes answers text)
    return {q, nudge: 'Sing the ABC song. Which letter comes first?',
    react: () => ({ctx: {}, lines: [`${run.join(', ')}. You put them in order!`]})}; };
  D.name = () => ({html: `<div class="ls4-strip" aria-hidden="true">${[...'abcd'].map(c => `<span>${c}</span>`).join('')}</div>`, sl: {}});
  D.warm = r => ls4WarmLetter(D)(r);
  return D;
}
// syllable claps
function ls4Clap(id, t, o) {
  const D = ls4(id, t, 'read', -1, Object.assign({bugs: ['clap'], petSt: 1, claim: 'I clap {ans}. Am I right?',
    fam: 'clap', slots: ls4Sl([], [], [], [], [])}, o));
  const W = () => SYLP.filter(x => ART[x[0]]), clp = n => sylChoices(3).find(c => c.v === String(n));
  D.q = (st, r) => {
    if (st == 0) { const one = ls4Shuf(r, W().filter(x => x[2] == 1)).slice(0, 2), two = ls4Shuf(r, W().filter(x => x[2] == 2)).slice(0, 2), items = ls4Shuf(r, one.map(x => ls4Chip(x[0], '1')).concat(two.map(x => ls4Chip(x[0], '2'))));
      return ls4Sort(D, 0, [{v: '1', l: clp(1).l, h: true, al: 'one clap'}, {v: '2', l: clp(2).l, h: true, al: 'two claps'}], items, {sl: {}, names: ls4Names(items), say: 'Clap each word. One clap or two?',
        html: lsAsk('One clap or two?'), hint: {k: 'text', s: 'Say it and clap each part.'}, label: `${id} sort`}); }
    if (st == 3) { const n = lsRi(r, 1, 3), w = ls4Pick(r, W().filter(x => x[2] == n)), ot = [1, 2, 3].filter(x => x !== n).map(m => ls4Pick(r, W().filter(x => x[2] == m)));
      const extra = ls4Pick(r, W().filter(x => x[2] !== n && !ot.includes(x))), all = ls4Shuf(r, [w].concat(ot, [extra]));
      return ls4Q(D, 2, {kind: 'choice', cls: 'pics pk4', ans: w[0], choices: ls4PicCh(all.map(x => x[0])), sl: {}, bug: {clap: all.filter(x => Math.abs(x[2] - n) == 1).map(x => x[0])},
        html: `<div class="clp ls4-claps">${clp(n).l}</div>` + lsAsk(`Which has ${n} ${n == 1 ? 'clap' : 'claps'}?`), say: `Which one has ${PK.num(n)} ${n == 1 ? 'clap' : 'claps'}? ${ls4Or(all.map(x => x[0]))}?`,
        hint: {k: 'text', s: 'Clap each one as you say it.'}, label: `${id} which ${n}`}); }
    const x = ls4Pick(r, W()), n = x[2];
    return ls4Q(D, st, {kind: 'choice', cls: 'syms clps', ans: n, choices: sylChoices(3), sl: {}, bug: {clap: [n - 1, n + 1].filter(v => v >= 1 && v <= 3)}, html: `<div class="emo">${ls4Pic(x[0])}</div>`,
      say: `${x[0]}. How many claps in ${x[0]}?`, hint: {k: 'text', s: `Say ${x[0]} slowly and clap each part.`}, label: `${id} claps ${x[0]}`});
  };
  D.exp = r => { const q = D.q(0, r); return {q, names: q.names, nudge: 'Tap a picture to hear it. Clap it. Then tap its bin.', react: () => ({ctx: {}, lines: ['You clapped them all!']})}; };
  D.name = () => ({html: `<div class="emo">${ls4Pic('banana')}</div><div class="ls4-claps clp">${clp(3).l}</div>`, sl: {}});
  D.warm = ls4WarmFrame(D, 4);
  return D;
}

/* ---- the lessons, in map order (each a real stop; the idea, tonight's question and the fallback Name it line are hand-written) ---- */
// Tiny Town (Pre-K math)
lsDraft4('pk_count1', ls4Count('pk_count1', 'Count to 5', 5, {first: 1, idea: 'Count each one once. The last number is how many.', fb: 'You put in {n}.', home: 'Ask {name} to count 4 spoons, touching each one.'}));
lsDraft4('shape1', ls4Shape('shape1', 'Find the Shape', {idea: 'Shapes have names. Look at the sides and corners.', fb: 'These are {a}s and {b}s.', home: 'Ask {name} to find something round in your home.'}));
lsDraft4('pk_num1', ls4Num('pk_num1', 'Hear a Number', 5, {idea: 'Every number has its own shape to write.', fb: 'You made {n}.', home: 'Ask {name} to show you 3 fingers, then find the number 3.'}));
lsDraft4('sort1', ls4Odd('sort1', 'Which One Is Different', {idea: 'Most are the same. One is different.', fb: null, home: 'Ask {name}: "Which of these is not a fruit?"'}));
lsDraft4('pk_more1', ls4More('pk_more1', 'Which Has More', {idea: 'Match them up. The one with some left over has more.', fb: null, home: 'Ask {name}: "Who has more grapes, you or me?"'}));
lsDraft4('pk_count2', ls4Count('pk_count2', 'Count to 10', 10, {idea: 'Count each one once. The last number is how many.', fb: 'You put in {n}.', home: 'Ask {name} to count 8 steps out loud.'}));
lsDraft4('pat1', ls4Pat('pat1', 'What Comes Next', {idea: 'A pattern repeats. Say it to know what comes next.', fb: null, home: 'Ask {name} to clap, stomp, clap, stomp, and say what comes next.'}));
lsDraft4('pk_num2', ls4Num('pk_num2', 'Numbers to 10', 10, {idea: 'Every number has its own shape to write.', fb: 'You made {n}.', home: 'Ask {name} to find a 7 on a clock or a page.'}));
lsDraft4('sort2', ls4Size('sort2', 'Big and Small', {idea: 'Look at how much room it takes. That tells big or small.', fb: null, home: 'Ask {name} to line up 3 shoes from smallest to biggest.'}));
// ABC Beach (Pre-K reading)
lsDraft4('abc1', ls4Abc('abc1', 'Big Letters', true, {first: 1, idea: 'Every letter has a name and a sound.', fb: '{a} and {b} start with {letter}.', home: 'Ask {name} to find a big letter M on a sign or a box.'}));
lsDraft4('abc2', ls4Abc('abc2', 'Little Letters', false, {idea: 'Little letters have the same names. Some face a different way.', fb: '{a} and {b} start with {letter}.', home: 'Ask {name} to find a little b and a little d. Which way do they face?'}));
lsDraft4('abc3', ls4Match('abc3', 'Match Big & Little', {idea: 'Every big letter has a little partner.', fb: null, home: 'Ask {name} to find a big letter and its little partner in a book.'}));
lsDraft4('syl1', ls4Clap('syl1', 'Clap the Syllables', {idea: 'Words have parts. Clap once for each part.', fb: null, home: 'Ask {name} to clap their own name, one clap for each part.'}));
lsDraft4('abc4', ls4Order('abc4', 'ABC Order', {idea: 'Every letter has its own place in the ABC.', fb: null, home: 'Ask {name} to sing the ABC and stop at the letter after D.'}));
// Letter Meadow (K)
lsDraft4('sound1', ls4Sound('sound1', 'First Sounds', 'first', LS4_FIRST, {idea: 'Listen to the first sound. It tells the first letter.', fb: '{a} and {b} start with {letter}.', home: 'Ask {name}: "What sound does your name start with?"',
}));
lsDraft4('sound3', ls4Sound('sound3', 'Middle Sounds', 'mid', LS4W.cvc, {idea: 'The middle letter is a vowel. Listen in the middle.', fb: '{a} and {b} have {letter} in the middle.', home: 'Ask {name}: "What sound is in the middle of cat? Of dog?"'}));
lsDraft4('sound2', ls4Sound('sound2', 'Last Sounds', 'last', LS4W.cvc, {idea: 'Say the word slowly. Listen to the very end.', fb: '{a} and {b} end with {letter}.', home: 'Ask {name}: "What sound does bus end with?"'}));
lsDraft4('pic1', ls4Word('pic1', 'Picture Words', 0, LS4W.cvc, 'mid', ['last', 'mid', 'first'], 'sent', {what: 'reading short words with three sounds (c-a-t) by saying each sound and blending them',
  idea: 'Say each sound, then blend them into a word.', fb: '{a} and {b} have {letter} in the middle.', home: 'Ask {name} to sound out "mop": m, o, p.'}));
lsDraft4('build1', ls4Word('build1', 'Build a Word', 0, LS4W.cvc, 'mid', ['last', 'mid', 'first'], 'build', {what: 'building short words one sound at a time: first, middle, last',
  idea: 'Build a word one sound at a time: first, middle, last.', fb: '{a} and {b} have {letter} in the middle.', home: 'Ask {name} to say the sounds in "hat", one at a time.'}));
lsDraft4('sent1', ls4Word('sent1', 'Read & Match', 0, LS4W.cvc, 'mid', ['last', 'mid', 'first'], 'sent', {what: 'reading a short sentence one word at a time and matching it to a picture',
  idea: 'Read one word at a time. The words tell the picture.', fb: '{a} and {b} have {letter} in the middle.', home: 'Ask {name} to read "I see a cat" with you.'}));
// Candy Canyon and Ocean Reef (1st)
lsDraft4('pic2', ls4Word('pic2', 'Blends', 1, LS4W.blend, 'blend', ['blend', 'mid'], 'sent', {what: 'blends: two consonants side by side, and we say both (fr in frog, st in star)',
  sortPool: ['truck', 'tree', 'train', 'drum', 'dress', 'clock', 'cloud', 'flag', 'flower', 'frog', 'crab', 'star', 'plane'],
  idea: 'In a blend we say both letters, one after the other.', fb: '{a} and {b} both start with {letter}.', home: 'Ask {name} to say "frog" without the r. What changes?'}));
lsDraft4('build2', ls4Word('build2', 'Build Blends', 1, LS4W.blend, 'blend', ['blend', 'mid'], 'build', {what: 'building words with blends: both letters of the blend go in',
  sortPool: ['truck', 'tree', 'train', 'drum', 'dress', 'clock', 'cloud', 'flag', 'flower', 'frog', 'crab', 'star', 'plane'],
  idea: 'Build every sound of a blend. Both letters go in.', fb: '{a} and {b} both start with {letter}.', home: 'Ask {name} to say the letters in "flag", in order.'}));
lsDraft4('sound4', ls4Word('sound4', 'Letter Teams', 1, LS4W.dig, 'dig', ['dig', 'mid', 'last'], 'sent', {what: 'letter teams: two letters that make one sound together (sh in ship, ch in chick)',
  idea: 'Some letters work as a team. Together they make one sound.', fb: '{a} and {b} both start with {letter}.', home: 'Ask {name} for a word that starts with "sh".'}));
lsDraft4('pic3', ls4Word('pic3', 'Silent E', 1, LS4W.silent, 'silent', ['silent', 'mid'], 'sent', {what: 'the silent e at the end: we do not hear it, and it makes the vowel say its name (kit, kite)',
  sortPool: LS4W.silent, idea: 'A quiet e at the end makes the vowel say its name.', fb: '{a} and {b} both have {letter}.', home: 'Ask {name}: "What word do you get when you add e to kit?"'}));
lsDraft4('build3', ls4Word('build3', 'Build Silent E', 1, LS4W.silent, 'silent', ['silent', 'mid'], 'build', {what: 'building words with a silent e at the end (the e goes in, though we do not hear it)',
  sortPool: LS4W.silent, idea: 'Do not forget the quiet e at the end.', fb: '{a} and {b} both have {letter}.', home: 'Ask {name} to say the letters in "bike". Which one is quiet?'}));
lsDraft4('sent2', ls4Word('sent2', 'Read Sentences', 1, LS4W.cvc.concat(LS4W.blend), 'blend', ['last', 'mid', 'first', 'blend'], 'sent', {what: 'reading sentences of a few words, one word at a time, and matching them to a picture',
  sortPool: ['truck', 'tree', 'train', 'drum', 'dress', 'clock', 'cloud', 'flag', 'flower', 'frog', 'crab', 'star', 'plane'],
  idea: 'Read every word. The last word often tells the most.', fb: '{a} and {b} both start with {letter}.', home: 'Ask {name} to read a sign or a label to you today.'}));
// Space Station (2nd)
lsDraft4('pic4', ls4Word('pic4', 'Vowel Teams', 2, LS4W.team, 'team', ['team', 'mid', 'last'], 'sent', {what: 'vowel teams: two vowels side by side make one sound (oa in boat, ee in tree)', want: 'oa',
  idea: 'Vowels side by side can make one sound together.', fb: '{a} and {b} both have {letter}.', home: 'Ask {name} for words with "ee" in them, like tree.'}));
lsDraft4('build4', ls4Word('build4', 'Build Vowel Teams', 2, LS4W.team, 'team', ['team', 'mid', 'last'], 'build', {what: 'building words with vowel teams: both vowels go in',
  idea: 'Both vowels of a team go in the word.', fb: '{a} and {b} both have {letter}.', home: 'Ask {name} to write "boat" and point to the vowel team.'}));

var TEACHRD_VER='v179'; // last line: the whole file ran (checked by dataReady() before the app starts)
