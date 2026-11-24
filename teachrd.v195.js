/* Whistlestop teachrd v195. BUILT by tools/build.py from 52k-teach4.css, 52q-teach5r.css, 52k-words4.js, 52l-bench4.js, 52m-lessons4.js, 52p-lessons4b.js, 52q-bench5r.js, 52r-lessons5r.js: never edit by hand.
   index.html v195 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v195.js. */
(function(){var s=document.createElement('style');s.id='css-teachrd';s.textContent="/* TEACH-4: the reading and Pre-K lessons (52l-bench4.js, 52m-lessons4.js, part teachrd): the reading map's colours on the lesson screen,\n   the letter big on the card, word boxes with a letter missing, the pet's letters in Check me, pictures with their words. Tokens only. */\n.ls-top.s-read .ls-pip.on{background:var(--read);color:var(--surface)}\n.ls-top.s-read .ls-pip.now{background:var(--read-tint);color:var(--read-shade);box-shadow:inset 0 0 0 3px var(--read)}\n.ls4-pic{display:inline-flex;align-items:center;justify-content:center;line-height:1}\n.ls4-pic .art{display:block}\n.ls4-big{font-size:var(--fs-7);font-weight:700;line-height:1.1;color:var(--ink);background:var(--read-tint);border-radius:var(--r-card);padding:0 var(--s-4);min-width:1.6em;text-align:center}\n.ls4-row{display:flex;gap:var(--s-4);justify-content:center;align-items:flex-end;flex-wrap:wrap;margin-top:var(--s-2)}\n.ls4-m{font-size:clamp(48px,14vmin,88px)}\n.ls4-nw{display:flex;flex-direction:column;align-items:center;gap:var(--s-1)}\n.ls4-wd{font-size:var(--fs-5);font-weight:700;color:var(--ink);letter-spacing:.04em}\n.ls4-wd b{color:var(--read-shade);text-decoration:underline;text-underline-offset:.15em}\n.ls4-gap{align-items:flex-end}\n.ls4-l{font-size:calc(clamp(36px,9vmin,72px)*var(--k));font-weight:700;line-height:1.35;color:var(--ink)}\n.ls.ls4-f{color:var(--ink);font-weight:700}\n.ls-pw.ls4-pw .ls,.ls4-gap .ls.ls4-f{background:var(--star-tint)}\n.ls4-pick{margin-top:var(--s-2);display:flex;flex-wrap:wrap;gap:var(--s-2);justify-content:center}\n.ls4-pk{display:inline-flex;align-items:center;justify-content:center;min-width:64px;min-height:64px;padding:var(--s-1);font-size:clamp(32px,6vh,52px);font-weight:700;color:var(--ink);\n  background:var(--surface-2);border-radius:var(--r-card)}\n.ls4-pk.on{background:var(--star-tint);box-shadow:inset 0 0 0 4px var(--star)}\n.ls4-pk .pks,.ls4-pk .art{width:1em;height:1em}\n.ls4-word{font-size:var(--fs-7);font-weight:700;color:var(--ink);letter-spacing:.06em;line-height:1.2}\n.ls4-sent{font-size:var(--fs-5);font-weight:700;color:var(--ink);line-height:1.35;max-width:22em}\n.choices.ls4-words{grid-template-columns:1fr}\n.choices.ls4-words .ch{font-size:var(--fs-6);font-weight:700;letter-spacing:.06em}\n.ls4-plate{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;align-items:center;max-width:100%;font-size:clamp(24px,6vmin,40px);line-height:1}\n.ls4-plate .pko{display:inline-flex}\n.choices.ls4-plates .ch{font-size:inherit;padding:var(--s-2)}\n.ls4-bl{display:block;font-size:var(--fs-2);font-weight:700;color:var(--ink)}\n.sbl .ls4-pic{font-size:36px}\n.ls4-strip{display:flex;gap:var(--s-1);justify-content:center;font-size:var(--fs-5);font-weight:700;color:var(--ink-2);margin-bottom:var(--s-1)}\n.ls4-strip span{min-width:1.3em;text-align:center;background:var(--surface-2);border-radius:var(--r-chip)}\n.ls4-strip .ls4-q{color:var(--read-shade);background:var(--read-tint)}\n.ls4-claps{font-size:var(--fs-6);display:flex;align-items:center;justify-content:center;gap:var(--s-2)}\n.ls4-claps .ic{width:.8em;height:.8em}\n@media (max-width:420px){.ls4-big{font-size:var(--fs-6)}.ls4-word{font-size:var(--fs-6)}.ls4-sent{font-size:var(--fs-4)}}\n/* READ-SHAPES (v184): the models of the K-2 reading lesson shapes (52q-bench5r.js, part teachrd): word cards, the flash card, claps, the\n   dictation ear, the story card, opposite pairs, the sentence fixer, word tiles. Tokens only; every button 48 px or more. */\n.ls5-cards{display:flex;flex-wrap:wrap;gap:var(--s-2);justify-content:center;max-width:100%}\n.ls5-card{display:inline-flex;align-items:center;justify-content:center;min-width:72px;min-height:72px;padding:var(--s-2) var(--s-3);border:0;border-radius:var(--r-card);\n  background:var(--read);color:var(--surface);font:inherit;font-size:var(--fs-5);font-weight:700;letter-spacing:.04em;box-shadow:var(--shadow)}\nbutton.ls5-card{cursor:pointer}\n.ls5-card.up{background:var(--surface);color:var(--ink);box-shadow:inset 0 0 0 3px var(--read)}\n.ls5-card.ls5-big{font-size:var(--fs-7);min-width:120px;min-height:96px}\n.ls5-card.ls5-no{opacity:.75}\n.ls5-bk .ic{width:30px;height:30px}\n.ls5-pair{display:flex;gap:var(--s-4);justify-content:center;align-items:center;flex-wrap:wrap}\n.ls5-fl{display:flex;gap:var(--s-3);align-items:center;justify-content:center}\n.ls5-flash{display:inline-block;opacity:1}\n.ls5-flash.go{animation:ls5f 2.6s ease-in forwards}\n@keyframes ls5f{0%,70%{opacity:1}100%{opacity:0}}\n@media (prefers-reduced-motion:reduce){.ls5-flash.go{animation:none}}\n.mmb.ls5-again,.mmb.ls5-say{min-width:48px;min-height:48px}\n.mmb.ls5-ear{min-width:64px;min-height:64px;background:var(--read-tint);color:var(--read-shade)}\n.ls5-dict{display:flex;justify-content:center;margin:var(--s-1) 0}\n.ls5-claps{display:flex;flex-wrap:wrap;gap:var(--s-1);justify-content:center;align-items:center;min-height:48px;color:var(--read-shade)}\n.ls5-cl{display:inline-flex}\n.ls5-cl0{display:inline-block;width:48px;height:4px;border-radius:2px;background:var(--line)}\n.ls5-cn{font-size:var(--fs-4);font-weight:700;color:var(--ink);text-align:center}\n.ls5-cbs{display:flex;gap:var(--s-3);justify-content:center}\n.mmb.ls5-clapb{min-width:120px;min-height:64px;gap:var(--s-1);font-size:var(--fs-4);font-weight:700;background:var(--read);color:var(--surface)}\n.ls5-story{display:flex;flex-direction:column;gap:var(--s-1);max-width:30em;margin:0 auto;text-align:left}\n.ls5-sl{display:flex;align-items:center;gap:var(--s-2);background:var(--surface-2);border-radius:var(--r-card);padding:var(--s-1) var(--s-2)}\n.ls5-st{flex:1;font-size:var(--fs-4);font-weight:700;color:var(--ink);line-height:1.3}\n.ls5-sp{display:inline-flex;gap:var(--s-1);font-size:clamp(32px,8vmin,48px)}\n.ls5-pr{display:flex;align-items:center;justify-content:center;gap:var(--s-3);flex-wrap:wrap}\n.ls5-ar{display:inline-flex;align-items:center;font-size:var(--fs-6);font-weight:700;color:var(--read-shade)}\n.ls5-sent{font-size:var(--fs-5);font-weight:700;color:var(--ink);line-height:1.4;text-align:center}\n.ls5-c1{display:inline-block;min-width:.7em;border-radius:var(--r-chip);background:var(--surface-2)}\n.ls5-c1.on{background:var(--star-tint);color:var(--read-shade)}\n.ls5-mk{display:inline-block;min-width:.8em;color:var(--ink-2);text-align:center}\n.ls5-mk.on{color:var(--read-shade);background:var(--star-tint);border-radius:var(--r-chip)}\n.ls5-sents2{display:flex;flex-direction:column;gap:var(--s-2)}\n.ls5-fix{display:flex;gap:var(--s-3);justify-content:center}\n.mmb.ls5-fb{min-width:64px;min-height:56px;font-size:var(--fs-5);font-weight:700}\n.choices.ls5-sents{grid-template-columns:1fr}\n.choices.ls5-sents .ch{font-size:var(--fs-4);font-weight:700;justify-content:flex-start;text-align:left}\n.ls5-tiles{display:flex;flex-wrap:wrap;gap:var(--s-1);justify-content:center;align-items:flex-end;font-size:var(--fs-5);font-weight:700}\n.ls5-tile{background:var(--surface-2);border-radius:var(--r-chip);padding:0 var(--s-2);color:var(--ink)}\n.ls5-tag{font-size:var(--fs-2);font-weight:700;color:var(--read-shade);background:var(--read-tint);border-radius:var(--r-chip);padding:0 var(--s-2)}\n.ls5-two{display:flex;gap:var(--s-2);justify-content:center}\n.lslots.ls5-nb .ls{background:var(--surface-2)}\n@media (max-width:420px){.ls5-card.ls5-big{font-size:var(--fs-6)}.ls5-st{font-size:var(--fs-3)}.ls5-sent{font-size:var(--fs-4)}.ls5-card{min-width:64px;min-height:64px;font-size:var(--fs-4)}}\n";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)
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
  "build6": {"idea":"Both letters of a team go in the word.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Put each one with its letter team."],"name":["{a} and {b} both have {letter}.","Both letters of the team go in.","Both letters of a team go in the word."],"together":["Look at this picture. Build the word with me.","Look at the picture. Which word is it?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["The workshop needs labels. Build each word!"]},"reasons":{"mid":["Oops. I read the team in the middle wrong."],"blend":["Oops. I left out a letter at the start."],"first":["Oops. I read the first sound wrong."],"last":["Oops. I read the last sound wrong."]},"home":"Ask {name} to write \"cloud\" and point to the team."},
  "comp1": {"idea":"A story tells who, what and where. Listen for each one.","beats":{"remember":["Do you remember this word? Tap it."],"explore":["Sort the pictures: who, what or where?"],"name":["The {a} is a who.","The {b} is a what.","A story tells who, what and where."],"together":["Look at the pictures as you listen.","Listen to the story. Then answer.","Listen, then read the words to answer."],"check":["My turn. Check me!","I pick {ans}. Am I right?"],"show":["The candy shop has story time. Answer each question!"]},"reasons":{"stWho":["Oops. I mixed up who did what."],"stOut":["Oops. That was not in the story."]},"home":"Ask {name}: \"Who was in a story you heard today?\""},
  "comp2": {"idea":"Listen to the whole story. Each part tells us something.","beats":{"remember":["Do you remember this word? Tap it."],"explore":["Sort the pictures: who, what or where?"],"name":["The {a} is a who.","The {b} is a what.","Each part of the story tells us something."],"together":["Look at the pictures as you listen.","Listen to every part. Then answer.","Listen, then read the words to answer."],"check":["My turn. Check me!","I pick {ans}. Am I right?"],"show":["The reef has story time. Answer each question!"]},"reasons":{"stWho":["Oops. I mixed up who found it and who got it."],"stOut":["Oops. That was not in the story."]},"home":"Ask {name} to tell you a story about a dog, then ask \"where?\""},
  "gram1": {"idea":"A sentence starts with a capital and ends with a mark.","beats":{"remember":["Do you remember this word? Tap it."],"explore":["Fix it: tap for a capital, then tap an end mark."],"name":["A sentence starts with a capital letter.","Telling ends with a period.","Asking ends with a question mark."],"together":["Fix it with me: a capital, then the end mark.","Look at the picture. Which way is written right?","Which way is written right? Check the start and the end."],"check":["My turn. Check me!","I pick this one: {ans} Am I right?"],"show":["The reef shop needs signs. Pick the one written right!"]},"reasons":{"capOff":["Oops. I forgot the capital letter at the start."],"endMk":["Oops. I used the wrong end mark."]},"home":"Ask {name} to point to the capital and the end mark in a sentence."},
  "gram2": {"idea":"A naming word names a thing. A doing word is an action.","beats":{"remember":["Do you remember this word? Tap it."],"explore":["Sort the words: naming words and doing words."],"name":["{a} is a naming word.","{b} is a doing word.","A doing word is something you can do."],"together":["Sort them with me. Can you do it?","Look at the picture. Then read the sentence.","Read the sentence. Who is it about? What do they do?"],"check":["My turn. Check me!","I tap {ans}. Am I right?"],"show":["The pet shop needs signs. Find each word!"]},"reasons":{"posSwap":["Oops. I mixed up the naming word and the doing word."]},"home":"Ask {name} for doing words you can do at home."},
  "gram3": {"idea":"More than one: add s, or es after x, s, sh, ch.","beats":{"remember":["Do you remember this word? Tap it."],"explore":["Sort the pictures: add s, or add e s?"],"name":["More than one {b}: add s.","More than one {a}: add e and s.","Words that end in x, s, sh or ch add e s."],"together":["Build the word for more than one {word}.","Say the word for more than one {word}.","Read it. Which word means more than one {word}?"],"check":["My turn. Check me!","For more than one, I pick {ans}. Am I right?"],"show":["The pet shop counts toys. Pick the word for more than one!"]},"reasons":{"plEs":["Oops. I only added s. This word needs e s."],"plE":["Oops. I added e s. This word just needs s."],"plNo":["Oops. I forgot the ending for more than one."]},"home":"Ask {name}: \"One box, two what? One cat, two what?\""},
  "pat1": {"idea":"Patterns repeat so we know what comes next.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Put each shape with its group."],"name":["Look at these shapes.","The pattern repeats.","We know what comes next."],"together":["Look at the pattern. Say it with me.","Say the pattern. What comes next?","Say it once more, then keep going."],"check":["My turn. Check me!","Next comes the {ans}!"],"show":["The path in Tiny Town needs a pattern. Which comes next?"]},"reasons":{"rep":["Oops. I said the last one again. What comes next?"]},"home":"Ask {name}: \"What comes next in this pattern: dog cat dog cat?\""},
  "pic1": {"idea":"Say each sound, then blend them into a word.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Listen to the middle sound."],"name":["{a} and {b} have {letter} in the middle.","Say each sound, then blend them."],"together":["Look at this picture. Build the word with me.","Listen to {word}. Which word matches the picture?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["The little farm needs signs. Read each one!"]},"reasons":{"first":["Oops. I read the first sound wrong. Say it slowly."],"last":["Oops. I read the last sound wrong. Say it slowly."],"mid":["Oops. I read the middle sound wrong. Say it slowly."]},"home":"Ask {name}: \"What is the first sound of cat?\""},
  "pic2": {"idea":"In a blend we say both letters, one after the other.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Put each with its blend."],"name":["{a} and {b} both start with {letter}.","We say both sounds in a blend."],"together":["Look at the picture. Build the word with me.","Say the word slowly. Which word is it?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["Candy Canyon needs signs. Read each one!"]},"reasons":{"blend":["Oops. I left out one sound of the blend."],"mid":["Oops. I read the middle sound wrong."]},"home":"Ask {name}: \"Can you find a word with a blend in a book?\""},
  "pic3": {"idea":"A quiet e at the end makes the vowel say its name.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Put each with its letter pattern."],"name":["{a} and {b} both have {letter}.","The e is quiet, but it helps the vowel say its name."],"together":["Look at this picture. Build the word with me.","Say the word slowly. Which word is it?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["The sea needs signs. Read each one!"]},"reasons":{"silent":["Oops. I left off the quiet e at the end."],"mid":["Oops. I read the vowel wrong."]},"home":"Ask {name}: \"Can you find a word with a silent e?\""},
  "pic4": {"idea":"Vowel teams are vowels side by side that make one sound.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Put each one with its vowel team."],"name":["{a} and {b} both have {letter}.","Those vowels work as a team.","Vowels side by side can make one sound."],"together":["Look at this picture. Build the word with me.","Listen to {word}. Which word matches the picture?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["The space station needs signs. Read each one!"]},"reasons":{"team":["Oops. I read only one vowel of the team."],"mid":["Oops. I read the middle vowel wrong."],"last":["Oops. I read the last sound wrong."]},"home":"Ask {name}: \"Can you find a word with a vowel team like boat?\""},
  "pic6": {"idea":"Some letter teams make one new sound: oo, ou, ow.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Put each one with its letter team."],"name":["{a} and {b} both have {letter}.","Both letters make one sound together.","Some letter teams make one new sound."],"together":["Look at this picture. Build the word with me.","Listen to {word}. Which word matches the picture?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["The workshop needs its signs read. Read each one!"]},"reasons":{"mid":["Oops. I read the team in the middle wrong."],"blend":["Oops. I left out a letter at the start."],"first":["Oops. I read the first sound wrong."],"last":["Oops. I read the last sound wrong."]},"home":"Ask {name} for words with \"ou\" in them, like house."},
  "pk_count1": {"idea":"One number for each thing.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Fill the frame any way you like!"],"name":["You put in {n}.","Count each one.","One number for each thing."],"together":["Put in {n} counters with me.","Count each one in the row.","Hear the number. Tap it."],"check":["My turn. Check me!","I count {ans}. Am I right?"],"show":["The path needs {n} rocks. Put them in the frame.","The shop needs {n} apples. Put them in the frame."]},"reasons":{"off1":["Oops. I was one off. Touch each one as you count."]},"home":"Ask {name}: \"Can you show me four fingers?\""},
  "pk_count2": {"idea":"Each thing gets one number.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Fill the frame with counters. Any way you like!"],"name":["You put in {n}.","Each thing gets one number.","The last number tells how many."],"together":["Put in {n} counters with me.","Count each one in the picture.","Listen. Tap the number you hear."],"check":["My turn. Check me!","I count {ans}. Am I right?"],"show":["The shop needs {n} apples. Put them in the frame!","The pond needs {n} fish. Put them in the frame!"]},"reasons":{"off1":["Oops. I was one off. Count again, one by one."]},"home":"Ask {name}: \"Can you count 8 things for me?\""},
  "pk_more1": {"idea":"Match them up. The one with some left over has more.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Fill the frame with blue and orange. Any way you like!"],"name":["You put in {a} blue and {b} orange.","Match them up, one and one.","The one with some left over has more."],"together":["Match each dot. Then put in more.","Look at both plates.","Look at every plate."],"check":["My turn. Check me!","I pick {ans}. It has the most!"],"show":["Help set the tables. Tap the plate with the most."]},"reasons":{"fewer":["Oops. That plate has fewer. Match them up."]},"home":"Ask {name}: \"Who has more grapes, you or me?\""},
  "pk_num1": {"idea":"A number tells how many.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Fill the frame with counters. Any way you like!"],"name":["You put {n} in the frame.","This says {n}.","A number tells how many."],"together":["Make {n} in the frame.","Count the dots. Tap their number.","Listen. Tap the number you hear."],"check":["My turn. Check me!","I think it is {ans}."],"show":["The path needs {n} stones. Put them in the frame."]},"reasons":{"look":["Oops. Those numbers look alike. Look closely."],"off1":["Oops. I was one off. Count again."]},"home":"Ask {name} to show you 3 fingers, then find the number 3."},
  "pk_num2": {"idea":"A number tells how many.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Fill the frame with any counters you like."],"name":["You put {n} in the frame.","This says {n}.","Every number has its own shape."],"together":["Put {n} in the frame for me.","Count the dots. Tap their number.","Listen. Tap the number you hear."],"check":["My turn. Check me!","I think it is {ans}."],"show":["The path needs {n} stones. Put them in the frame.","The shop needs {n} apples. Put them in the frame."]},"reasons":{"look":["Oops. Those numbers look alike. Look closely."],"off1":["Oops. I was one off. Count again."]},"home":"Ask {name} to find a 7 on a clock or a page."},
  "rhyme1": {"idea":"Words that rhyme sound the same at the end.","beats":{"remember":["Do you remember this? Listen for the first sound."],"explore":["Say each picture with {word}. Does it rhyme?"],"name":["{a} and {b} sound the same at the end.","That is a rhyme!","Words that rhyme sound the same at the end."],"together":["Say {word}. Then find the one that rhymes.","Listen to the end of {word}.","Listen to the word. Then find its rhyme."],"check":["My turn. Check me!","I pick {ans}. It rhymes with {word}!"],"show":["The garden needs rhyme labels. Find each rhyme!"]},"reasons":{"rFirst":["Oops. It starts the same, but the end is different."],"rVow":["Oops. Same middle sound, but the end is different."]},"home":"Ask {name}: \"What rhymes with dog?\""},
  "rhyme2": {"idea":"Words that rhyme sound the same at the end.","beats":{"remember":["Do you remember this? Find the first sound."],"explore":["Say each picture with {word}. Rhyme, or no rhyme?"],"name":["{a} and {b} rhyme.","Listen: they sound the same at the end.","Words that rhyme sound the same at the end."],"together":["Say {word}. Which picture rhymes?","Read the words. Which one rhymes with {word}?","Read the first word. Then find its rhyme."],"check":["My turn. Check me!","I pick {ans}. It rhymes with {word}!"],"show":["The candy shop needs rhyme labels. Read and find each rhyme!"]},"reasons":{"rFirst":["Oops. That starts the same. Rhymes end the same."],"rVow":["Oops. Same middle, but the end is different."]},"home":"Ask {name} to read \"dog\" and \"frog\" and say why they rhyme."},
  "sent1": {"idea":"Read one word at a time. The words tell the picture.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Listen to the middle sound."],"name":["{a} and {b} have {letter} in the middle.","Read one word at a time."],"together":["Look at the picture. Build the word with me.","Listen to {word}. Which word matches the picture?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["The animals need help in the meadow. Read each sentence!"]},"reasons":{"first":["Oops. I read the first sound wrong."],"last":["Oops. I read the last sound wrong."],"mid":["Oops. I read the middle sound wrong."]},"home":"Ask {name}: \"Can you read me a sentence from a book?\""},
  "sent2": {"idea":"Read each word then the whole sentence.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Listen to the start."],"name":["{a} and {b} both start with {letter}.","Read each word, then the whole sentence."],"together":["Look at the picture. Build {word} with me.","Listen to {word}. Which word matches the picture?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["The candy shop needs signs. Read each one!"]},"reasons":{"first":["Oops. I read the first sound wrong."],"last":["Oops. I read the last sound wrong."],"mid":["Oops. I read the middle sound wrong."],"blend":["Oops. I left out a letter of the blend."]},"home":"Ask {name}: \"Can you read me a sentence from a book?\""},
  "sent3": {"idea":"Words go in an order that makes sense.","beats":{"remember":["Do you remember this word? Tap it."],"explore":["Put the words in order. Then read it to me."],"name":["Read it out loud.","The words go in an order that makes sense."],"together":["Put the words in order. Start with the capital.","Which one makes sense, with the right end mark?","Read each one out loud. Which sounds right?"],"check":["My turn. Check me!","I pick this one: {ans} Am I right?"],"show":["The space station needs messages. Build each one!"]},"reasons":{"wOrder":["Oops. I mixed up the order of the words."],"endMk":["Oops. I used the wrong end mark."]},"home":"Ask {name} to make a sentence with \"dog\", \"the\" and \"runs\"."},
  "shape1": {"idea":"We can name shapes by how they look.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Put each shape with its group."],"name":["You sorted the {a} and the {b}.","We can name shapes by how they look."],"together":["Sort the shapes with me.","Listen. Then tap the shape I name.","Some shapes look alike. Look closely."],"check":["My turn. Check me!","This is the {ans}!"],"show":["Find the right shape for the door in Tiny Town."]},"reasons":{"look":["Look again. They look alike but they are not the same."]},"home":"Ask {name}: \"Can you find a triangle in our house?\""},
  "sight1": {"idea":"We know sight words by how they look. Look at every letter.","beats":{"remember":["Do you remember this? Find the letter."],"explore":["Turn the cards over, one at a time. Find {word}."],"name":["You found {word}!","{other} starts the same, but it is not {word}.","We know sight words by how they look."],"together":["Find the card that looks just like {word}.","Listen, then look at every letter.","Watch the word flash. Then tap the word you saw."],"check":["My turn. Check me!","I tap {ans}. Am I right?"],"show":["The meadow path needs signs. Find each word I say!"]},"reasons":{"sFirst":["Oops. I only looked at the first letter."]},"home":"Ask {name} to find the word \"the\" in a book."},
  "sight2": {"idea":"We know sight words by how they look. Look at every letter.","beats":{"remember":["Do you remember this word? Tap it."],"explore":["Turn the cards over, one at a time. Find {word}."],"name":["You found {word}!","{other} starts the same, but it is not {word}.","We know sight words by how they look."],"together":["Find the card that looks just like {word}.","Listen, then look at every letter.","Watch the word flash. Then tap the word you saw."],"check":["My turn. Check me!","I tap {ans}. Am I right?"],"show":["The candy shop needs word signs. Tap each word I say!"]},"reasons":{"sFirst":["Oops. I only looked at the first letter."]},"home":"Ask {name} to find the word \"they\" in a book tonight."},
  "sight3": {"idea":"We know sight words by how they look. Look at every letter.","beats":{"remember":["Do you remember this word? Tap it."],"explore":["Turn the cards over, one at a time. Find {word}."],"name":["You found {word}!","{other} starts the same, but it is not {word}.","We know sight words by how they look."],"together":["Find the card that looks just like {word}.","Listen, then look at every letter.","Watch the word flash. Then tap the word you saw."],"check":["My turn. Check me!","I tap {ans}. Am I right?"],"show":["The reef needs word signs. Tap each word I say!"]},"reasons":{"sFirst":["Oops. I only looked at the first letter."]},"home":"Ask {name} to find the word \"could\" in a book tonight."},
  "sight4": {"idea":"We know sight words by how they look. Look at every letter.","beats":{"remember":["Do you remember this word? Tap it."],"explore":["Turn the cards over, one at a time. Find {word}."],"name":["You found {word}!","{other} starts the same, but it is not {word}.","We know sight words by how they look."],"together":["Find the card that looks just like {word}.","Listen, then look at every letter.","Watch the word flash. Then tap the word you saw."],"check":["My turn. Check me!","I tap {ans}. Am I right?"],"show":["The space station needs word labels. Tap each word I say!"]},"reasons":{"sFirst":["Oops. I only looked at the first letter."]},"home":"Ask {name} to read the word \"because\" on a sign or a page."},
  "sight5": {"idea":"We know sight words by how they look. Look at every letter.","beats":{"remember":["Do you remember this word? Tap it."],"explore":["Turn the cards over, one at a time. Find {word}."],"name":["You found {word}!","{other} starts the same, but it is not {word}.","We know sight words by how they look."],"together":["Find the card that looks just like {word}.","Listen, then look at every letter.","Watch the word flash. Then tap the word you saw."],"check":["My turn. Check me!","I tap {ans}. Am I right?"],"show":["The workshop needs word labels. Tap each word I say!"]},"reasons":{"sFirst":["Oops. I only looked at the first letter."]},"home":"Ask {name} to read the word \"together\" in a book."},
  "sort1": {"idea":"Most are the same. One is different.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Put each picture with its group."],"name":["You sorted them well.","Most are the same. One is different."],"together":["Look at these. Tap the one that is different.","Look again. Tap the one that is different.","Look at these shapes. Tap the one that is different."],"check":["My turn. Check me!","I pick {ans}. It is different!"],"show":["Help in the shop. Tap the one that is different."]},"reasons":{"alike":["Oops. That one matches the others. Find the odd one."]},"home":"Ask {name}: \"Which of these is not a fruit?\""},
  "sort2": {"idea":"Some things are bigger. Some things are smaller.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Sort these into big ones and small ones. Any way you like!"],"name":["Look at these.","This one is bigger.","This one is smaller."],"together":["Sort the big ones and the small ones.","Look at both. Which takes more room?","Look at all of them first."],"check":["My turn. Check me!","I pick {ans}!"],"show":["The toy shop needs help. Find the one I ask for."]},"reasons":{"size":["Oops. I picked the wrong one. Look at the sizes."]},"home":"Ask {name} to line up 3 shoes from smallest to biggest."},
  "sound1": {"idea":"Listen to the first sound. It tells the first letter.","beats":{"remember":["Do you remember this? Find the letter {letter}."],"explore":["Let's sort the pictures. Listen to the first sound of each word."],"name":["{a} and {b} both start with {letter}.","Listen to the first sound of each word."],"together":["Listen to {word}. Build its first sound with me.","Say {word} slowly. Which sound is first?","Look at the letter. Find a picture that starts with it."],"check":["My turn. Check me!","{word} starts with {ans}."],"show":["The meadow gate needs signs. Tap the right picture for each letter!"]},"reasons":{"first":["Oops. I missed the first sound. Say it slowly."]},"home":"Ask {name}: \"What is the first sound in dog?\""},
  "sound2": {"idea":"Listen to the last sound.","beats":{"remember":["Do you remember this? Find the letter {letter}."],"explore":["Let's sort the pictures. Listen to the last sound of each word."],"name":["{a} and {b} end with {letter}.","Listen to the last sound."],"together":["Listen to {word}. Build the last sound with me.","Say {word} slowly. Which sound is last?","Look at {letter}. Find a picture that ends with it."],"check":["My turn. Check me!","{word} ends with {ans}."],"show":["The meadow needs signs. Listen for the last sound!"]},"reasons":{"last":["Oops. I missed the last sound. Say it slowly."]},"home":"Ask {name}: \"What is the last sound in dog?\""},
  "sound3": {"idea":"Listen to the middle sound.","beats":{"remember":["Do you remember this? Find the letter {letter}."],"explore":["Let's sort the pictures. Listen for the middle sound."],"name":["{a} and {b} have {letter} in the middle.","Listen to the middle sound."],"together":["Listen to {word}. Build the middle letter with me.","Look at this picture. Find its middle letter.","Look at {letter}. Find a picture with it in the middle."],"check":["My turn. Check me!","The middle letter is {ans}."],"show":["The meadow needs signs. Tap the right picture for each letter!"]},"reasons":{"mid":["Look again. I missed the middle sound. Listen slowly."]},"home":"Ask {name}: \"What is the middle sound in dog?\""},
  "sound4": {"idea":"Some letters work as a team. Together they make one sound.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Put each one with its letter team."],"name":["{a} and {b} both start with {letter}.","Those letters work as a team."],"together":["Look at the picture. Build {word} with me.","Say the word slowly. Which word is it?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["Candy Canyon needs signs. Read each one!"]},"reasons":{"dig":["Oops. I read the team as one letter."],"mid":["Oops. I read the middle vowel wrong."],"last":["Oops. I read the last sound wrong."]},"home":"Ask {name}: \"Can you find a word with the letter team ch?\""},
  "spell1": {"idea":"Listen to each sound. Write a letter for each one.","beats":{"remember":["Do you remember this? Listen for the first sound."],"explore":["Listen: {word}. Build it with the tiles any way you think."],"name":["Look at {word}.","Every sound you hear got its letter.","Listen to each sound. Write a letter for each one."],"together":["Listen to {word}. Build it with me.","Listen to {word}. Which word is right?","Listen to {word}. Say each sound as you build."],"check":["My turn. Check me!","I wrote {ans}. Am I right?"],"show":["The candy shop needs name tags. Build each word I say!"]},"reasons":{"first":["Oops. I wrote the first sound wrong."],"last":["Oops. I wrote the last sound wrong."],"mid":["Oops. I wrote the middle sound wrong."]},"home":"Say \"map\" and ask {name} to write it."},
  "spell2": {"idea":"In a blend we hear both letters. Write both of them.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Listen: {word}. Build it with the tiles any way you think."],"name":["Look at {word}.","Both letters of {letter} are there.","In a blend we hear both letters. Write both."],"together":["Listen to {word}. Build it with me.","Listen to {word}. Which word is right?","Listen to {word}. Say both blend letters as you build."],"check":["My turn. Check me!","I wrote {ans}. Am I right?"],"show":["The sea animals need name tags. Build each word I say!"]},"reasons":{"blend":["Oops. I left out a letter of the blend."],"mid":["Oops. I wrote the middle sound wrong."]},"home":"Say \"frog\" and ask {name} to write it."},
  "spell3": {"idea":"Some sounds need more letters: a quiet e, or a vowel team.","beats":{"remember":["Do you remember this? Listen for the first sound."],"explore":["Listen: {word}. Build it with the tiles any way you think."],"name":["Look at {letter} in {word}.","Some letters we do not hear. They still go in.","The letters we do not hear go in too."],"together":["Listen to {word}. Build it with me.","Listen to {word}. Which word is right?","Listen to {word}. Do not forget the quiet letters."],"check":["My turn. Check me!","I wrote {ans}. Am I right?"],"show":["The space station needs labels. Build each word I say!"]},"reasons":{"silent":["Oops. I forgot the quiet e at the end."],"team":["Oops. I wrote only one letter of the vowel team."],"mid":["Oops. I wrote the wrong vowel."]},"home":"Say \"kite\" and ask {name} to write it."},
  "syl1": {"idea":"Words have parts. Clap once for each part.","beats":{"remember":["Do you remember this? Count with me."],"explore":["Let's sort the pictures. Clap once for each part."],"name":["Listen. Ba, na, na. Clap with me!","Clap once for each part.","Words have parts. Clap once for each part."],"together":["Clap each word. Then put it in its bin.","Say the word and clap with me.","Say it slowly. Clap each part."],"check":["My turn. Check me!","I clap {ans}. Am I right?"],"show":["The beach needs signs. Clap and pick the right one!"]},"reasons":{"clap":["Oops. I clapped wrong. Clap once for each part."]},"home":"Ask {name}: \"Can you clap the parts in banana?\""},
  "syl2": {"idea":"Words have parts. Clap once for each part you say.","beats":{"remember":["Do you remember this? Clap the parts of the word."],"explore":["{word}! Say it slowly and clap each part."],"name":["{word} has {n} parts.","We clapped once for each part.","Words have parts. Clap once for each part."],"together":["Clap {word} with me. Tap Clap for each part.","Say {word} slowly. Count your claps.","Read {word} and say it. Count the claps."],"check":["My turn. Check me!","I clap {ans}. Am I right?"],"show":["The candy shop has a clapping game. Clap each word!"]},"reasons":{"clap":["Oops. I clapped one too many or too few."]},"home":"Ask {name} to clap \"butterfly\". How many claps?"},
  "vocab1": {"idea":"Opposites are as different as can be: hot and cold.","beats":{"remember":["Do you remember this word? Tap it."],"explore":["Match each word to its opposite."],"name":["{a} and {b} are opposites.","They are as different as can be."],"together":["Match each word to its opposite.","Listen to {word}. What is its opposite?","Read the word. Then find its opposite."],"check":["My turn. Check me!","I think the opposite of {word} is {ans}."],"show":["The reef shop needs labels. Find each opposite!"]},"reasons":{"oppSame":["Oops. That means about the same, not the opposite."]},"home":"Ask {name} for the opposite of \"up\"."},
  "vocab2": {"idea":"Some words mean almost the same: big and huge.","beats":{"remember":["Do you remember this word? Tap it."],"explore":["Match each word to one that means the same."],"name":["{a} and {b} mean almost the same.","They are synonyms!","Some words mean almost the same."],"together":["Match each word to one that means the same.","Listen to {word}. Which word means the same?","Read the word. Which one means the same?"],"check":["My turn. Check me!","I think {ans} means the same as {word}."],"show":["The toy shop needs labels. Find each word that means the same!"]},"reasons":{"synOpp":["Oops. I picked the opposite, not the same."]},"home":"Ask {name} for another word for \"happy\"."},
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
// v182 (review): keys of a sort that make the same sound, so a sort of pictures (heard, not read) could not tell them apart: never
// drawn as the two sides of one sort. Per key, so no other lesson's draw changes (ou in house and ow in cow: Vowel Teams 2, 52p).
const LS4_SAME = {team2: [['ou', 'ow']]};
const ls4Same = (key, a, b) => (LS4_SAME[key] || []).some(s => s.includes(a) && s.includes(b));
// two keys of a pool with at least two drawn pictures each, and two pictures of each (a sort of four)
function ls4Pairs(pool, key, r, want) {
  const by = {};
  for (const w of pool) { const k = LS4_KEY[key](w); if (k && ART[w]) (by[k] = by[k] || []).push(w); }
  const ks = Object.keys(by).filter(k => by[k].length >= 2), a = want && ks.includes(want) ? want : ls4Pick(r, ks);
  const b = ls4Pick(r, ks.filter(k => k !== a && !ls4Same(key, a, k)));
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
  const petOk = LS.petRight(st);
  let q, pv = null, code = null;
  for (let n = 0; n < 40 && pv == null; n++) {
    q = L.q(D.petSt | 0, st.r);
    if (petOk) { pv = q.ans; break; }
    for (const c of n < 30 ? codes : L.bugs) {
      const v = (knowPredict(q)[c] || []).find(x => !lsOk(q, String(x)) && lsFits4(q, x));
      if (v != null) { pv = String(v); code = c; break; }
    }
  }
  if (pv == null) pv = q.ans; // never reached with these lessons (tools/test.js "every pet turn" checks every lesson's forced-wrong turn)
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
  D.exp = () => ({q: lsFrame2(D.sk, D.lv, 10, 'both', {html: lsAsk('Put in blue and orange!'), say: 'Put in some blue and some orange. Any way you like!', sl: {}}), nudge: 'Use both colors.',
    react: ([a, b]) => ({ctx: {a, b}, lines: [a > b ? 'Blue has more!' : a < b ? 'Orange has more!' : 'They are the same!']})});
  D.name = c => { const a = c.a != c.b ? c.a : 5, b = c.a != c.b ? c.b : 3; return {html: `<div class="pkq">${VIZ.dots(a, 'row')}</div><div class="pkq">${VIZ.dots(b, 'row', {b})}</div>`, sl: {a, b}}; };
  D.warm = ls4WarmFrame(D, 4);
  return D;
}
// shapes
const LS4_SHP = ['circle', 'square', 'triangle', 'rectangle', 'star', 'diamond'], LS4_SHLOOK = {square: ['rectangle', 'diamond'], rectangle: [], diamond: ['square'], circle: [], triangle: ['diamond'], star: []};
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
    const sh = [ans].concat(lk.slice(0, k == 4 ? 2 : 1), ls4Shuf(r, LS4_SHP.filter(x => x !== ans && !lk.includes(x) && !(ans == 'rectangle' && x == 'square')))).slice(0, k), all = ls4Shuf(r, sh), cs = ls4Shuf(r, PK.cols());
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
        html: lsAsk('Which one is different?'), say: 'Which one is a different color?', hint: {k: 'text', s: 'Look at the colors. Three are the same.'}, label: `${id} colour ${s} ${pr}`}); }
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
  // fix179: the pet's turn is an A B A B A pattern (stage 1), where saying the last shape again (rep) is wrong; in stage 2's A B B A B
  // the last shape IS what comes next, so the pet could never be wrong there
  const D = ls4(id, t, 'math', -1, Object.assign({bugs: ['rep'], petSt: 1, claim: 'Next comes the {ans}!',
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
/* ---------- TEACH-3b: reading lessons batch 4 left out (part teachrd, after 52m-lessons4.js) ----------
   Word Workshop (2nd grade): Vowel Teams 2 and Build Vowel Teams 2, the phonics lesson shape of TEACH-4 (ls4Word: a sound sort with drawn
   pictures, the team shown big, words built from letter tiles, the pet's reading of a word for the child to check and fix, a decodable
   sentence matched to a picture). Their teams are oo, ou and ow, the teams of this stop that have drawn pictures (ART): moon, spoon, book,
   foot; house, mouse, cloud, mouth; cow, owl. The pet's readings are real, kid-safe words of the checked contrast sets (PWC), classed by
   what changed (ls4Code): mouse read as moose (the middle team swapped), cloud as loud (a letter of the blend left out), moon as noon.
   Their words are drafts in batch '3b' (D.b3b; docs/drafts/BATCH3B-READ.md); until the owner approves them they run on fallback words.
   Not built (see PROGRESS TEACH-3B): Bossy R and Build Bossy R, whose drawn r-words (car, star, horse, flower, water, bird, turtle,
   church) have no drawn r-vowel partner words for the pet to misread them as; sight words, rhymes, spelling, stories, grammar and the
   tracing stops, which need other lesson shapes. */
LS4_KEY.team2 = w => (/(oo|ou|ow)/.exec(w) || [])[1] || null;
const LS4B_VT2 = ['moon', 'spoon', 'book', 'foot', 'house', 'mouse', 'cloud', 'mouth', 'cow', 'owl'];
const ls4B = (id, D) => Object.assign(D, {b3b: 1});
lsDraft4('pic6', ls4B('pic6', ls4Word('pic6', 'Vowel Teams 2', 2, LS4B_VT2, 'team2', ['mid', 'blend', 'first', 'last'], 'sent', {what: 'more vowel teams: oo in moon, ou in house, ow in cow; the two letters make one sound together',
  idea: 'Some letter teams make one new sound: oo, ou, ow.', fb: '{a} and {b} both have {letter}.', home: 'Ask {name} for words with "ou" in them, like house.'})));
lsDraft4('build6', ls4B('build6', ls4Word('build6', 'Build Vowel Teams 2', 2, LS4B_VT2, 'team2', ['mid', 'blend', 'first', 'last'], 'build', {what: 'building words with the teams oo, ou and ow: both letters of the team go in',
  idea: 'Both letters of a team go in the word.', fb: '{a} and {b} both have {letter}.', home: 'Ask {name} to write "cloud" and point to the team.'})));
/* ---------- READ-SHAPES (v184): the lesson shapes of the K-2 reading stops TEACH-4 and TEACH-3b left out (part teachrd, after 52p) ----------
   The stops (52r-lessons5r.js): Sight Words 1-5, Rhyme Time, Rhyme & Read, Count the Claps, the three Spell stops, Story Time 1-2, Opposites,
   Synonyms, Capitals & End Marks, Build Sentences, Parts of Speech and Plurals. Each runs in the six-beat engine (52-lesson.js) like the
   phonics lessons (lsDraft4: the test-out at the start, the pet's tone by age, the pet's announced and always-corrected turn, show-me items
   that are never a choice of two, fresh items on resume, a win at the end). What is new is the shape: the questions, the model each one
   works on, its own "not yet" line and its misconception codes. Every model is drawn from tokens (src/css/52q-teach5r.css), every control
   is a 48 px button with a spoken name, every word on a picture is a drawn word (ART).
     sight   word cards: four cards face down, turn one over to read it (K2MM.flash); a word that flashes and hides; hear a word, tap it
     rhyme   a rhyme sorter (rhymes / no rhyme) and rhyming pictures or words; the pet picks a word that starts the same
     claps   clap-to-count (K2MM.clap): a Clap button and the claps drawn, for a word heard with its picture or read
     spell   dictation: the child hears the word and builds it from letter tiles (the picture only while help is on)
     story   a short story with picture panels, told aloud (q.tell), and who / what / where questions answered by picture or word
     pairs   an opposite (or same-meaning) pairs match, and a word with its partner to find
     sfix    the sentence fixer (K2MM.sfix): a capital letter button and the end marks, on a sentence of drawn things
     order   word tiles put in order, the end mark shown
     pos     a naming / doing word sorter, and the doing (or naming) word of a sentence to find
     plural  an add s / add es sorter, and the word for two to build or pick
   Words are drafts in batch '5r' (D.b5r; docs/drafts/BATCH5R-READ.md); until the owner approves them a lesson runs on its fallback words. */

/* ---- the misconception codes of these lessons: what the pet says when it repairs the idea (12 words or fewer), the grown-ups' line ---- */
Object.assign(BUGS, {
  sFirst: {d: 'reads a sight word by its first letter alone (went for want)', say: 'Look at every letter, not just the first one.'},
  rFirst: {d: 'picks a word that starts the same, not one that ends the same (dog and duck)', say: 'Say it slowly. Listen to the very end.'},
  rVow: {d: 'picks a word with the same middle sound but another end (dog and box)', say: 'Say it slowly. Listen to the very end.'},
  stWho: {d: 'mixes up who did what in a story', say: 'Find that part of the story. Listen again.'},
  stOut: {d: 'picks something that is not in the story', say: 'Think back to the story. Was it there?'},
  oppSame: {d: 'picks a word that means about the same, not the opposite (hot and warm)', say: 'An opposite is as different as it can be.'},
  synOpp: {d: 'picks the opposite when the word should mean the same (big and small)', say: 'Same means it says almost the same thing.'},
  capOff: {d: 'forgets the capital letter at the start of a sentence', say: 'A sentence starts with a capital letter.'},
  endMk: {d: 'mixes up the end marks: a period on an asking sentence, or the other way', say: 'Asking ends with a question mark. Telling ends with a period.'},
  wOrder: {d: 'puts the words of a sentence in an order that does not make sense', say: 'Read it out loud. Does it sound right?'},
  posSwap: {d: 'mixes up naming words and doing words', say: 'A doing word is something you can do.'},
  plEs: {d: 'adds only s to a word that needs es (boxs)', say: 'After x, s, sh or ch, we add e and s.'},
  plE: {d: 'adds es to a word that needs only s (cates)', say: 'Most words just add s.'},
  plNo: {d: 'leaves the word as one: two box', say: 'More than one? It needs an ending.'},
});
Object.assign(LSREP.NOTE, {
  sFirst: 'sometimes reads a sight word by its first letter (went for want)',
  rFirst: 'sometimes picks a word that starts the same instead of one that rhymes',
  rVow: 'sometimes picks a word with the same middle sound instead of one that rhymes',
  stWho: 'sometimes mixes up who did what in a short story',
  stOut: 'sometimes picks something that was not in the story',
  oppSame: 'sometimes picks a word that means the same when asked for an opposite',
  synOpp: 'sometimes picks the opposite when asked for a word that means the same',
  capOff: 'sometimes forgets the capital letter at the start of a sentence',
  endMk: 'sometimes mixes up the period and the question mark',
  wOrder: 'sometimes puts the words of a sentence in an order that does not make sense',
  posSwap: 'sometimes mixes up naming words (nouns) and doing words (verbs)',
  plEs: 'sometimes adds only s where es is needed (boxs)',
  plE: 'sometimes adds es where only s is needed (cates)',
  plNo: 'sometimes forgets the ending for more than one (two box)',
});

/* ---- small helpers ---- */
const ls5D = (id, t, g, fam, o) => ls4(id, t, 'read', g, Object.assign({fam, b5r: 1, petSt: 1}, o));
const ls5Cap = s => s.charAt(0).toUpperCase() + s.slice(1);
// a button that says a line (the lesson binds .ls5-say below: the round binds its own data-say buttons, the lesson does not)
const ls5Say = (t, al, big) => `<button class="mmb ls5-say${big ? ' ls5-ear' : ''}" data-say="${esc(t)}" aria-label="${esc(al)}">${ico('speak', big ? 34 : 24)}</button>`;
if (typeof document != 'undefined' && document.addEventListener && !LS.r5) {
  LS.r5 = 1;
  document.addEventListener('click', e => {
    const b = e.target && e.target.closest ? e.target.closest('.ls5-say,.ls5-again') : null;
    if (!b) return;
    if (b.classList.contains('ls5-say')) return say(b.dataset.say, b);
    // the flash card: show the word again for a moment
    const c = b.parentNode && b.parentNode.querySelector('.ls5-flash');
    if (!c) return;
    c.classList.remove('go');
    void c.offsetWidth;
    c.classList.add('go');
  });
}
// a sentence of lower-case words drawn with its capital (cap) and end mark (mk: 0 none, 1 '.', 2 '?')
const LS5_MK = ['', '.', '?'];
const ls5Txt = (w, cap, mk) => (cap ? ls5Cap(w.join(' ')) : w.join(' ')) + LS5_MK[mk];
const ls5SentHtml = (w, cap, mk) => {
  const s = w.join(' '), a = cap ? s.charAt(0).toUpperCase() : s.charAt(0);
  return `<span class="ls5-c1${cap ? ' on' : ''}">${esc(a)}</span>${esc(s.slice(1))}`
    + (mk ? `<span class="ls5-mk on">${LS5_MK[mk]}</span>` : '<span class="ls5-mk" aria-hidden="true">_</span><span class="a11y-h">(no end mark)</span>');
};
const ls5Ch = (r, a) => ls4TxtCh(ls4Shuf(r, a));
// the warm-ups (Remember, when nothing older is due): hear a word of a sight-word list, tap it; a picture's first letter
const ls5WarmSight = (D, lv) => r => {
  const L = DOL[lv - 1].filter(w => /^[a-z]{2,}$/.test(w)), w = ls4Pick(r, L), hw = sameSound(w), ot = ls4Shuf(r, L.filter(x => x !== w && !hw.includes(x))).slice(0, 2);
  return ls4Q(D, 0, {kind: 'choice', cls: 'ls4-words', ans: w, choices: ls5Ch(r, [w].concat(ot)), sl: {}, html: `<div class="pkq">${pkEar()}</div>`,
    say: `Tap the word ${w}.`, hint: {k: 'text', s: `It starts with ${w[0]}.`}, label: `warm ${w}`});
};
const ls5WarmFirst = D => r => {
  const w = ls4Pick(r, LS4W.cvc.filter(x => ART[x])), c = w[0], ot = ls4Shuf(r, [...'bdfhmnprst'].filter(x => x !== c && !(c == 'c' && x == 'k'))).slice(0, 2);
  return ls4Q(D, 0, {kind: 'choice', cls: 'syms', ans: c, choices: ls5Ch(r, [c].concat(ot)), sl: {}, html: `<div class="emo">${ls4Pic(w)}</div>`,
    say: `${w}. What letter does ${w} start with?`, hint: {k: 'text', s: `Say it slowly: ${w}.`}, label: `warm ${w}`});
};

/* ---- the models (keys of K2MM, raw: the lesson submits the state; each has its own first-miss line, K2MM[m].miss) ---- */
// word cards: m {ws: four words, t: the card asked for}; state [the card turned over] (-1: none). Only one card is face up at a time,
// so the child reads each word. A second number in the state (of) draws the cards as a picture only: the pet's work in Check me.
K2MM.flash = {
  raw: true,
  s0: () => [-1],
  val: (q, s) => s[0],
  ans: q => [q.m.t],
  step: (q, s, i, d) => (s[0] === d ? null : [d]),
  draw: (q, s) => `<div class="ls5-cards">${q.m.ws.map((w, k) => {
    const up = s[0] === k, in1 = up ? `<span class="ls5-w">${esc(w)}</span>` : `<span class="ls5-bk" aria-hidden="true">${ico('star', 30)}</span>`;
    return s[1] ? `<span class="ls5-card${up ? ' up' : ''}">${in1}</span>`
      : `<button class="ls5-card${up ? ' up' : ''}" data-i="0" data-d="${k}" aria-label="Card ${k + 1}${up ? ': ' + esc(w) : ''}">${in1}</button>`;
  }).join('')}</div>`,
  ctl: () => '<div class="mmc"></div>',
  of: (q, v) => [+v, 1],
  fits: (q, v) => /^\d$/.test(String(v)) && +v < q.m.ws.length,
  miss: () => 'Not that card. Turn over another one.',
};
// clap-to-count: m {n}; state [claps]
K2MM.clap = {
  raw: true,
  s0: () => [0],
  val: (q, s) => s[0],
  ans: q => [q.m.n],
  step: (q, s, i, d) => (s[0] + d < 0 || s[0] + d > 6 ? null : [s[0] + d]),
  draw: (q, s) => `<div class="ls5-claps" aria-hidden="true">${s[0] ? Array.from({length: s[0]}, () => `<span class="ls5-cl">${ico('clap', 36)}</span>`).join('')
    : '<span class="ls5-cl0"></span>'}</div><div class="ls5-cn">${s[0]} ${s[0] == 1 ? 'clap' : 'claps'}</div>`,
  ctl: () => `<div class="mmc ls5-cbs"><button class="mmb ls5-clapb" data-i="0" data-d="1" aria-label="Clap">${ico('clap', 30)}<span>Clap</span></button>`
    + `<button class="mmb" data-i="0" data-d="-1" aria-label="Take back a clap">${ico('undo', 26)}</button></div>`,
  of: (q, v) => [+v],
  fits: (q, v) => /^\d$/.test(String(v)) && +v >= 1 && +v <= 6,
  miss: (q, s) => (s[0] > q.m.n ? 'Too many claps. Say it slowly again.' : 'Not yet. Say it slowly. Clap each part.'),
};
// the sentence fixer: m {w: the words, lower case; ask: 1 an asking sentence}; state [capital 0 | 1, end mark 0 none | 1 . | 2 ?]; value cap*10+mark
const ls5FixB = (i, d, al, t) => `<button class="mmb ls5-fb" data-i="${i}" data-d="${d}" aria-label="${al}">${t}</button>`;
K2MM.sfix = {
  raw: true,
  s0: () => [0, 0],
  val: (q, s) => s[0] * 10 + s[1],
  ans: q => [1, q.m.ask ? 2 : 1],
  step: (q, s, i, d) => (i == 0 ? [1 - s[0], s[1]] : s[1] === d ? null : [s[0], d]),
  draw: (q, s) => `<div class="ls5-sent">${ls5SentHtml(q.m.w, s[0], s[1])}</div>`,
  ctl: () => `<div class="mmc ls5-fix">${ls5FixB(0, 1, 'Capital letter', 'Aa')}${ls5FixB(1, 1, 'Period', '.')}${ls5FixB(1, 2, 'Question mark', '?')}</div>`,
  of: (q, v) => [Math.floor(+v / 10), +v % 10],
  fits: (q, v) => /^(1?[0-2])$/.test(String(v)),
  miss: (q, s) => (!s[0] ? 'Not yet. Look at the first letter.' : 'Not yet. Is it telling or asking?'),
};
// the fixer's state has two numbers, so its check is a goal (LSGOAL, 52b-know.js): the state, or its value as text, is the target
LSGOAL.sfix = (q, v) => (Array.isArray(v) ? v[0] * 10 + v[1] : /^\d+$/.test(String(v)) ? +v : NaN) === 10 + (q.m.ask ? 2 : 1);
// the make kind's first-miss words for these models (their own "not yet" line); TEACH-3b's models do the same in teach35
if (!KIND.make.r5) {
  const MK = KIND.make, r1 = MK.retry;
  MK.r5 = 1;
  MK.retry = (q, st) => {
    const M = K2MM[q.model];
    if (!M || !M.miss || !['flash', 'clap', 'sfix'].includes(q.model)) return r1(q, st);
    fb(M.miss(q, st.mm), 'again');
    st.mmMoved = false;
    MK.draw(q, st);
    const w = $('.mmw');
    if (!w) return;
    w.classList.add('wrong');
    k2Shake(w);
    setTimeout(() => w.classList.remove('wrong'), 900);
  };
}

/* ---- the slots each beat has (tools/author.js checks every draft against them; the briefs: tools/briefs4.js) ---- */
const LS5_SL = {
  sight: {remember: [], explore: ['word'], name: ['word', 'other'], together: [['word'], ['word'], []], check: ['ans'], show: []},
  rhyme: {remember: [], explore: ['word'], name: ['a', 'b', 'letter'], together: [['word'], ['word'], []], check: ['ans', 'word'], show: []},
  claps: {remember: [], explore: ['word'], name: ['word', 'n'], together: [['word'], ['word'], ['word']], check: ['ans', 'word'], show: ['word']},
  spell: {remember: [], explore: ['word'], name: ['word', 'letter'], together: [['word'], ['word'], ['word']], check: ['ans', 'word'], show: ['word']},
  story: {remember: [], explore: [], name: ['a', 'b'], together: [[], [], []], check: ['ans'], show: []},
  pairs: {remember: [], explore: [], name: ['a', 'b'], together: [[], ['word'], []], check: ['ans', 'word'], show: []},
  sfix: {remember: [], explore: [], name: [], together: [[], [], []], check: ['ans'], show: []},
  order: {remember: [], explore: [], name: [], together: [[], [], []], check: ['ans'], show: []},
  pos: {remember: [], explore: [], name: ['a', 'b'], together: [[], [], []], check: ['ans'], show: []},
  plural: {remember: [], explore: [], name: ['a', 'b'], together: [['word'], ['word'], ['word']], check: ['ans', 'word'], show: ['word']},
};

/* ---- sight words (Sight Words 1-5): no sounding out; the word is known by sight. Stage 0 the word cards with the word shown (find
   its twin), 1 hear a word and tap it, 2 a word that flashes and hides (tap the word you saw), 3 hear a word and tap it among four.
   The wrong words start with the same letter (sFirst), never a word that sounds the same (sameSound). ---- */
function ls5Sight(id, t, g, lv, o) {
  const D = ls5D(id, t, g, 'sight', Object.assign({bugs: ['sFirst'], lv5: lv, slots: LS5_SL.sight, claim: 'I tap {ans}. Am I right?'}, o));
  const pool = DOL[lv - 1].filter(w => /^[a-z]{2,}$/.test(w) && !BAD.test(w) && !ksBad(w, true)), all = [...new Set(DOL.flat())].filter(w => /^[a-z]{2,}$/.test(w));
  // words like w: the same first letter (this list first), and words with another first letter
  const alts = (w, r) => {
    const hw = sameSound(w), ok = x => x !== w && !hw.includes(x) && !ksBad(x, true);
    return {same: ls4Shuf(r, pool.filter(x => ok(x) && x[0] === w[0])).concat(ls4Shuf(r, all.filter(x => ok(x) && x[0] === w[0] && !pool.includes(x)))),
      other: ls4Shuf(r, pool.filter(x => ok(x) && x[0] !== w[0]))};
  };
  const okW = () => pool.filter(w => all.some(x => x !== w && x[0] === w[0] && !sameSound(w).includes(x)));
  const cards = (w, r) => { const A = alts(w, r), ws = ls4Shuf(r, [w, A.same[0], A.other[0], A.other[1]]); return {ws, t: ws.indexOf(w), s: ws.indexOf(A.same[0])}; };
  const flash = w => `<div class="ls5-fl"><span class="ls5-card up ls5-big"><span class="ls5-flash" data-wake="go">${esc(w)}</span></span>`
    + `<button class="mmb ls5-again" aria-label="Show the word again">${ico('replay', 26)}</button></div>`;
  D.q = (st, r) => {
    const w = ls4Pick(r, okW()), A = alts(w, r), sl = {word: w}, hint = {k: 'html', html: `<div class="pkhint">${ls4Big(w)}</div>`, w: `Look at every letter of ${w}.`};
    if (st == 0) {
      const C = cards(w, r);
      return ls4Q(D, 0, {kind: 'make', model: 'flash', m: {ws: C.ws, t: C.t}, eq: 'value', ans: C.t, vsay: v => C.ws[+v] || String(v), sl, hint, bug: {sFirst: [C.s]},
        html: ls4Big(w) + lsAsk('Find this word.'), say: `Find the card that says ${w}.`, label: `${id} cards ${w}`});
    }
    const n = st == 3 ? 4 : 3, wr = [A.same[0]].concat(n == 4 ? [A.same[1] || A.other[1], A.other[0]] : [A.other[0]]).filter(Boolean), ch = ls5Ch(r, [w].concat(wr));
    const bug = {sFirst: wr.filter(x => x[0] === w[0])};
    if (st == 2) return ls4Q(D, 2, {kind: 'choice', cls: 'ls4-words', ans: w, choices: ch, sl: {}, bug, hint, html: flash(w),
      say: 'Look fast! Then tap the word you saw.', label: `${id} flash ${w}`});
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: 'ls4-words', ans: w, choices: ch, sl, bug, hint, auto: 'must',
      html: `<div class="pkq">${pkEar()}</div>`, say: `Tap the word ${w}.`, label: `${id} hear ${w}${st == 3 ? ' 4' : ''}`});
  };
  D.exp = r => {
    const w = ls4Pick(r, okW()), C = cards(w, r);
    return {q: ls4Q(D, 0, {kind: 'make', model: 'flash', m: {ws: C.ws, t: C.t}, eq: 'value', ans: C.t, vsay: v => C.ws[+v] || String(v), sl: {word: w},
      html: `<div class="pkq">${pkEar()}</div>`, say: `Turn the cards over. Find ${w}.`, label: `${id} find ${w}`}),
    nudge: 'Not that card. Turn over another one.',
    react: () => ({ctx: {word: w, other: C.ws[C.s]}, lines: [`You found ${w}!`]})};
  };
  D.name = c => {
    const w = c.word || 'the', x = c.other || 'they';
    return {html: `<div class="ls5-pair"><span class="ls5-card up ls5-big"><span class="ls5-w">${esc(w)}</span></span><span class="ls5-card up ls5-no"><span class="ls5-w">${esc(x)}</span></span></div>`,
      sl: {word: w, other: x}};
  };
  D.fix = q => q;
  D.warm = lv > 1 ? ls5WarmSight(D, lv - 1) : ls4WarmLetter(D);
  return D;
}

/* ---- rhymes (Rhyme Time, Rhyme & Read): drawn rhyming families; the wrong ones start the same (rFirst) or share the middle sound (rVow).
   K hears every picture named; Rhyme & Read (D.read) reads the words from stage 1 on. ---- */
const LS5_RHY = [['cat', 'bat', 'hat'], ['hen', 'pen'], ['duck', 'truck'], ['dog', 'frog'], ['fox', 'box'], ['nose', 'rose'], ['bee', 'tree'], ['boat', 'coat'],
  ['sock', 'clock'], ['bell', 'shell'], ['car', 'star'], ['moon', 'spoon'], ['mouse', 'house'], ['fish', 'dish'], ['map', 'cap'], ['bear', 'chair'], ['plane', 'train']];
// one-beat drawn words to offer beside them
const LS5_ONE = ['cat', 'dog', 'pig', 'sun', 'bus', 'hat', 'bed', 'cup', 'fox', 'bat', 'bug', 'hen', 'box', 'map', 'pen', 'web', 'tub', 'cap', 'frog', 'crab', 'drum',
  'flag', 'star', 'clock', 'truck', 'dress', 'milk', 'tent', 'hand', 'gift', 'ship', 'shell', 'sheep', 'chick', 'chair', 'fish', 'dish', 'duck', 'sock', 'cake', 'kite',
  'bike', 'rose', 'bone', 'nose', 'plane', 'boat', 'coat', 'road', 'soap', 'tree', 'bee', 'leaf', 'train', 'moon', 'spoon', 'book', 'bell', 'car', 'cow', 'owl',
  'mouse', 'house', 'bear', 'bird', 'horse', 'foot', 'lamp', 'tie', 'shirt', 'door', 'dice', 'pants'];
const ls5Rime = w => w.slice(w.search(/[aeiou]/));
const ls5Vow = w => (/[aeiou]+/.exec(w) || [''])[0];
const ls5Fams = () => LS5_RHY.map(f => f.filter(w => ART[w])).filter(f => f.length >= 2);
// a and b rhyme (a drawn family, or the same ending: never offered as a "not a rhyme")
const ls5Rhy = (a, b) => ls5Fams().some(f => f.includes(a) && f.includes(b)) || ls5Rime(a) === ls5Rime(b) || a.slice(-2) === b.slice(-2);
function ls5Rhyme(id, t, g, read, o) {
  const D = ls5D(id, t, g, 'rhyme', Object.assign({bugs: ['rFirst', 'rVow'], read, slots: LS5_SL.rhyme, claim: read ? 'I pick {ans}. It rhymes with {word}!' : 'I pick {ans}. It rhymes with {word}!'}, o));
  const one = () => LS5_ONE.filter(w => ART[w]);
  // a target, a partner, a word that starts the same (rFirst) and one with the same middle sound (rVow), then others: none rhymes
  const set = r => {
    for (;;) {
      const f = ls4Pick(r, ls5Fams()), [w, p] = ls4Shuf(r, f), no = one().filter(x => !ls5Rhy(x, w) && x !== w && !f.includes(x));
      const a = ls4Shuf(r, no.filter(x => x[0] === w[0])), b = ls4Shuf(r, no.filter(x => x[0] !== w[0] && ls5Vow(x) === ls5Vow(w)));
      const c = ls4Shuf(r, no.filter(x => !a.includes(x) && !b.includes(x)));
      if (a.length || b.length) return {w, p, f, a: a[0], b: b[0], c, no};
    }
  };
  const mark = w => { const i = w.search(/[aeiou]/); return esc(w.slice(0, i)) + `<b>${esc(w.slice(i))}</b>`; };
  D.q = (st, r) => {
    const S5 = set(r), w = S5.w, n = st == 3 ? 4 : 3, wr = [S5.a, S5.b].filter(Boolean).concat(S5.c).slice(0, n - 1), all = ls4Shuf(r, [S5.p].concat(wr));
    const bug = {rFirst: wr.filter(x => x[0] === w[0]), rVow: wr.filter(x => x[0] !== w[0] && ls5Vow(x) === ls5Vow(w))}, sl = {word: w};
    const hint = {k: 'text', s: `Say each one after ${w}. Which ends the same?`}, words = read && st >= 1;
    const head = st == 0 ? `<div class="ls4-nw">${ls4Pic(w, 'ls4-m')}<span class="ls4-wd">${mark(w)}</span></div>`
      : st >= 2 ? (read ? `<div class="ls4-word">${esc(w)}</div>` : `<div class="pkq">${pkEar()}</div>`) : `<div class="emo">${ls4Pic(w)}</div>`;
    const say = words ? (st >= 2 ? 'Read them. Which word rhymes?' : `Which word rhymes with ${w}?`) : `Which one rhymes with ${w}? ${ls4Or(all)}?`;
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: words ? 'ls4-words' : `pics pk${n}`, ans: S5.p, choices: words ? ls4TxtCh(all) : ls4PicCh(all), sl: st >= 2 && read ? {} : sl, bug, hint,
      html: head + lsAsk(words ? 'Which word rhymes?' : 'Which one rhymes?'), say, label: `${id} ${w} ${all.join('/')}`});
  };
  D.exp = r => {
    const S5 = set(r), w = S5.w, yes = S5.f.filter(x => x !== w), no = [S5.a, S5.b].filter(Boolean).concat(S5.c).slice(0, 4 - yes.length);
    const items = ls4Shuf(r, yes.map(x => ls4Chip(x, 'y')).concat(no.map(x => ls4Chip(x, 'n'))));
    const bins = [{v: 'y', l: `${ico('check-circle', 24)}<span>Rhymes</span>`, h: true, al: `Rhymes with ${w}`}, {v: 'n', l: `${ico('close', 24)}<span>No rhyme</span>`, h: true, al: 'Does not rhyme'}];
    return {q: ls4Sort(D, 0, bins, items, {sl: {word: w}, say: `Does it rhyme with ${w}? Sort the pictures.`, html: `<div class="emo">${ls4Pic(w)}</div>` + lsAsk('Rhymes, or no rhyme?'),
      label: `${id} sort ${w}`}), names: ls4Names(items), nudge: `Not yet. Say each one with ${w}. Does the end match?`,
    react: () => ({ctx: {a: w, b: yes[0], letter: ls5Rime(w)}, lines: [`${w} and ${yes[0]} rhyme!`]})};
  };
  D.name = c => {
    const a = c.a || 'cat', b = c.b || 'hat';
    return {html: `<div class="ls4-row">${[a, b].map(x => `<span class="ls4-nw">${ls4Pic(x, 'ls4-m')}<span class="ls4-wd">${mark(x)}</span></span>`).join('')}</div>`,
      sl: {a, b, letter: [...ls5Rime(a)].join(', ')}};
  };
  D.fix = q => q;
  D.warm = ls5WarmFirst(D);
  return D;
}

/* ---- Count the Claps: clap-to-count. Stage 0 a picture word on the clap model, 1 a picture and how many claps, 2 a written word heard and
   how many claps, 3 a written word clapped on the model. The pet claps one too many or too few (clap). ---- */
function ls5Claps(id, t, g, o) {
  const D = ls5D(id, t, g, 'claps', Object.assign({bugs: ['clap'], petSt: 0, slots: LS5_SL.claps, claim: 'I clap {ans}. Am I right?'}, o));
  const P = () => SYLP.filter(x => ART[x[0]]), Wd = r => { const n = lsRi(r, 1, 4); return [ls4Pick(r, SYLW[n - 1].filter(w => !ksBad(w, true))), n]; };
  const bugOf = n => ({clap: [n - 1, n + 1].filter(v => v >= 1 && v <= 6)});
  const clapQ = (st, w, n, html, say, o2) => ls4Q(D, st, Object.assign({kind: 'make', model: 'clap', m: {n}, eq: 'value', ans: n, vsay: v => `${v} ${+v == 1 ? 'time' : 'times'}`, sl: {word: w}, bug: bugOf(n),
    hint: {k: 'text', s: `Say ${w} slowly. Clap each part.`}, html, say, label: `${id} clap ${w}`}, o2));
  D.q = (st, r) => {
    if (st == 0) { const [w, , n] = ls4Pick(r, P()); return clapQ(0, w, n, `<div class="emo">${ls4Pic(w)}</div>`, `${w}. Clap once for each part.`); }
    if (st == 3) { const [w, n] = Wd(r); return clapQ(2, w, n, `<div class="ls4-word">${esc(w)}</div>`, `${w}. Clap it, then check.`, {label: `${id} clap ${w} show`}); }
    const [w, n] = st == 1 ? (x => [x[0], x[2]])(ls4Pick(r, P())) : Wd(r), k = st == 1 ? 3 : 4;
    return ls4Q(D, st, {kind: 'choice', cls: k == 4 ? 'syms sym4 clps' : 'syms clps', ans: n, choices: sylChoices(k), sl: {word: w}, bug: bugOf(n),
      html: st == 1 ? `<div class="emo">${ls4Pic(w)}</div>` : `<div class="ls4-word">${esc(w)}</div>`, say: `${w}. How many claps?`,
      hint: {k: 'text', s: `Say ${w} slowly. Clap each part.`}, label: `${id} claps ${w}`});
  };
  D.exp = r => {
    const [w, , n] = ls4Pick(r, P().filter(x => x[2] >= 2));
    return {q: clapQ(0, w, n, `<div class="emo">${ls4Pic(w)}</div>`, `${w}! Clap it with me.`, {label: `${id} try ${w}`}), nudge: 'Not yet. Say it slowly. Clap each part.',
      react: () => ({ctx: {word: w, n}, lines: [`${w} has ${n} claps!`]})};
  };
  D.name = c => {
    const w = c.word || 'banana', n = c.n || 3;
    return {html: `<div class="emo">${ls4Pic(w)}</div><div class="ls5-claps">${Array.from({length: n}, () => `<span class="ls5-cl">${ico('clap', 36)}</span>`).join('')}</div>`, sl: {word: w, n}};
  };
  D.fix = q => q;
  D.warm = r => { const [w, , n] = ls4Pick(r, P());
    return ls4Q(D, 0, {kind: 'choice', cls: 'syms clps', ans: n, choices: sylChoices(3), sl: {}, html: `<div class="emo">${ls4Pic(w)}</div>`, say: `${w}. How many claps?`,
      hint: {k: 'text', s: 'Clap each part as you say it.'}, label: `warm claps ${w}`}); };
  return D;
}

/* ---- Spell (dictation): the child hears the word and builds it from letter tiles. Stage 0 with its picture, 1 the written word among
   three that differ by the lesson's sound, 2 and 3 heard only (no picture). The pet writes a real word that differs by one of the
   lesson's codes (kite as kit), as the phonics lessons read them (ls4Code). ---- */
// fixRev (v184): real words that sound like a spelling word (beyond sameSound's list, 20-words.js): a heard-only dictation never offers
// the tiles to build one, since the child cannot tell them apart by ear and "rode" for road is not wrong to the ear
const LS5_HOM = {road: ['rode'], rose: ['rows'], plane: ['plain'], sun: ['son'], coat: ['cote'], nose: ['knows'], bee: ['be'], tail: ['tale'], pear: ['pair'],
  hare: ['hair'], sail: ['sale'], meat: ['meet'], night: ['knight'], deer: ['dear'], flower: ['flour'], knot: ['not'], mail: ['male']};
// the letters a homophone of w (of w's length: a build is checked only when every slot is full) needs beyond w's own letters
const ls5HomNeed = w => {
  const need = new Set();
  for (const h of new Set(sameSound(w).concat(LS5_HOM[w] || []))) {
    if (h.length != w.length) continue;
    const t = [...w];
    for (const c of h) { const i = t.indexOf(c); if (i < 0) need.add(c); else t.splice(i, 1); }
  }
  return need;
};
function ls5Spell(id, t, g, pool, key, bugs, o) {
  const D = ls5D(id, t, g, 'spell', Object.assign({bugs, petSt: 2, key, slots: LS5_SL.spell, claim: 'I wrote {ans}. Am I right?'}, o));
  const coded = w => ls4Con(w).filter(x => bugs.includes(ls4Code(w, x)));
  let ok0 = null;
  const good = () => ok0 || (ok0 = pool.filter(w => ART[w] && coded(w).length));
  const keyOf = w => [].concat(key).map(k => (typeof k == 'function' ? k(w) : LS4_KEY[k](w))).find(Boolean) || w[1];
  const bugOf = (w, xs) => { const b = {}; for (const x of xs) { const c = ls4Code(w, x); if (c) (b[c] = b[c] || []).push(x); } return b; };
  const ear = w => ls5Say(w, 'Hear the word again', true);
  const build = (st, w, r, pic, o2) => {
    // fixRev (v184): never the letter a homophone needs (road's "e" from read would let rode be built), with or without the picture
    const no = ls5HomNeed(w), cs = ls4Shuf(r, coded(w)), n = st == 0 ? 1 : 2, extra = [...new Set([...cs.join('')].filter(c => !w.includes(c) && !no.has(c)))].slice(0, 1);
    const more = ls4Shuf(r, [...'bdfgmnprst'].filter(c => !w.includes(c) && !extra.includes(c) && !no.has(c))).slice(0, n + 1 - extra.length);
    return ls4Q(D, Math.min(st, 2), Object.assign({kind: 'build', word: w, tiles: ls4Shuf(r, [...w].concat(extra, more)), ans: w, sl: {word: w}, bug: bugOf(w, cs),
      hint: {k: 'text', s: `Say it slowly: ${w}. One sound at a time.`}, html: (pic ? `<div class="emo">${ls4Pic(w)}</div>` : '') + `<div class="ls5-dict">${ear(w)}</div>` + ls4Slots(w.length),
      say: pic ? `${w}. Build ${w} with the tiles.` : `Listen: ${w}. Build the word.`, label: `${id} build ${w}${pic ? '' : ' heard'}${st == 3 ? ' show' : ''}`}, o2));
  };
  D.q = (st, r) => {
    const w = ls4Pick(r, good());
    if (st == 1) {
      const cs = ls4Shuf(r, coded(w)).slice(0, 2), fill = ls4Shuf(r, ls4Con(w).filter(x => !cs.includes(x))).slice(0, 2 - cs.length), all = ls4Shuf(r, [w].concat(cs, fill));
      return ls4Q(D, 1, {kind: 'choice', cls: 'ls4-words', ans: w, choices: ls4TxtCh(all), sl: {word: w}, bug: bugOf(w, cs.concat(fill)),
        hint: {k: 'text', s: `Say it slowly: ${w}. Check every letter.`}, html: `<div class="emo">${ls4Pic(w)}</div><div class="ls5-dict">${ear(w)}</div>`,
        say: `${w}. Which word says ${w}?`, label: `${id} pick ${w}`});
    }
    return build(st, w, r, st == 0);
  };
  D.exp = r => {
    const w = ls4Pick(r, good());
    return {q: build(0, w, r, true, {label: `${id} try ${w}`, say: `Listen: ${w}. Build ${w} any way you think.`}), nudge: 'Not yet. Say it slowly, one sound at a time.',
      react: () => ({ctx: {word: w, letter: keyOf(w)}, lines: [`${w}! You built every sound.`]})};
  };
  const mark = (w, k) => { const i = w.indexOf(String(k).replace(/_e$/, '')); return i < 0 || /_/.test(k) ? esc(w) : esc(w.slice(0, i)) + `<b>${esc(k)}</b>` + esc(w.slice(i + k.length)); };
  D.name = c => {
    const w = c.word || good()[0], k = c.letter || keyOf(w);
    return {html: `<div class="ls4-nw">${ls4Pic(w, 'ls4-m')}<span class="ls4-wd">${mark(w, k)}</span></div>${ls4Slots(w.length, w, 'ls5-nb')}`, sl: {word: w, letter: ls4Spk(k)}};
  };
  // fixRev (v184): the fix offers the pet's wrong letters, but never one a homophone needs (the pet's "read" for road brings an e: rode)
  D.fix = (q, pv, r) => {
    const f = ls4FixBuild(q, pv, r), no = ls5HomNeed(q.word), n = c => [...q.word].filter(x => x == c).length;
    return no.size ? Object.assign(f, {tiles: f.tiles.filter((c, i) => !no.has(c) || f.tiles.slice(0, i + 1).filter(x => x == c).length <= n(c))}) : f;
  };
  D.warm = ls5WarmFirst(D);
  return D;
}

/* ---- Story Time: a short story of drawn animals, things and places, told aloud and shown as picture panels (stage 0) or as words; the
   questions ask who, what and where, answered by picture (stages 0, 1, 3) or by written word (stage 2). The wrong answers are the other
   one in the story (stWho) or something not in it (stOut). ---- */
const LS5_WHO = ['cat', 'dog', 'pig', 'hen', 'duck', 'bear', 'frog', 'rabbit', 'mouse', 'owl', 'cow', 'fox', 'lion', 'sheep', 'turtle', 'horse', 'chick'];
const LS5_WHAT = ['ball', 'kite', 'cake', 'hat', 'apple', 'book', 'gift', 'drum', 'cookie', 'balloon', 'umbrella', 'pizza', 'cup', 'bell', 'flag', 'map'];
const LS5_WHERE = {house: 'to the house', school: 'to school', beach: 'to the beach', tent: 'into the tent', tree: 'up the tree', road: 'down the road'};
function ls5Story(id, t, g, two, o) {
  const D = ls5D(id, t, g, 'story', Object.assign({bugs: ['stWho', 'stOut'], two, slots: LS5_SL.story, claim: 'I pick {ans}. Am I right?'}, o));
  const A = () => LS5_WHO.filter(w => ART[w]), T = () => LS5_WHAT.filter(w => ART[w]), Pl = () => Object.keys(LS5_WHERE).filter(w => ART[w]);
  // a story: [sentence, its pictures] and its questions {q, ans, kind (who|what|where), alt (in the story, wrong)}
  const story = r => {
    const [a, b] = ls4Shuf(r, A()), [t1, t2] = ls4Shuf(r, T()), p = ls4Pick(r, Pl()), go = LS5_WHERE[p];
    if (!two) return {a, b, t1, t2, p, s: [[`The ${a} and the ${b} go ${go}.`, [a, b, p]], [`The ${a} has ${art(t1)} ${t1}.`, [a, t1]], [`The ${b} has ${art(t2)} ${t2}.`, [b, t2]]],
      qs: [{q: `Who has the ${t1}?`, ans: a, k: 'who', alt: b}, {q: `Who has the ${t2}?`, ans: b, k: 'who', alt: a}, {q: `What does the ${b} have?`, ans: t2, k: 'what', alt: t1},
        {q: `What does the ${a} have?`, ans: t1, k: 'what', alt: t2}, {q: 'Where do they go?', ans: p, k: 'where', alt: null}]};
    return {a, b, t1, t2: null, p, s: [[`The ${a} goes ${go}.`, [a, p]], [`The ${a} finds ${art(t1)} ${t1}.`, [a, t1]], [`Then the ${a} gives it to the ${b}.`, [a, b]]],
      qs: [{q: `Who finds the ${t1}?`, ans: a, k: 'who', alt: b}, {q: `Who gets the ${t1}?`, ans: b, k: 'who', alt: a}, {q: `What does the ${a} find?`, ans: t1, k: 'what', alt: null},
        {q: `Where does the ${a} go?`, ans: p, k: 'where', alt: null}]};
  };
  const card = (S5, pics) => `<div class="ls5-story">${S5.s.map(([x, ps]) => `<div class="ls5-sl">${ls5Say(x, 'Hear: ' + x)}<span class="ls5-st">${esc(x)}</span>`
    + (pics ? `<span class="ls5-sp">${ps.map(w => ls4Pic(w)).join('')}</span>` : '') + '</div>').join('')}</div>`;
  D.q = (st, r) => {
    const S5 = story(r), Q = ls4Pick(r, S5.qs), n = st == 3 ? 4 : 3, inS = [S5.a, S5.b, S5.t1, S5.t2, S5.p].filter(Boolean);
    const from = Q.k == 'who' ? A() : Q.k == 'what' ? T() : Pl(), out = ls4Shuf(r, from.filter(x => !inS.includes(x))), wr = (Q.alt ? [Q.alt] : []).concat(out).slice(0, n - 1);
    const all = ls4Shuf(r, [Q.ans].concat(wr)), words = st == 2;
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: words ? 'ls4-words' : `pics pk${n}`, ans: Q.ans, choices: words ? ls4TxtCh(all) : ls4PicCh(all), sl: {},
      bug: {stWho: Q.alt ? [Q.alt] : [], stOut: wr.filter(x => x !== Q.alt)}, tell: S5.s.map(x => x[0]), hint: {k: 'text', s: 'Listen to the story again. Find that part.'},
      html: card(S5, st == 0) + lsAsk(esc(Q.q)), say: words ? `${Q.q} Read the words.` : `${Q.q} ${ls4Or(all)}?`, label: `${id} ${S5.a} ${S5.b} ${S5.t1} ${Q.k}`});
  };
  D.exp = r => {
    const S5 = story(r), who = [S5.a, S5.b], what = [S5.t1, S5.t2].filter(Boolean), items = ls4Shuf(r, who.map(x => ls4Chip(x, 'who')).concat(what.map(x => ls4Chip(x, 'what')), [ls4Chip(S5.p, 'where')]));
    const bins = [['who', 'Who'], ['what', 'What'], ['where', 'Where']].map(([v, l]) => ({v, l, al: l}));
    return {q: ls4Sort(D, 0, bins, items, {sl: {}, tell: S5.s.map(x => x[0]), say: 'Sort the pictures: who, what or where?', html: card(S5, false) + lsAsk('Who? What? Where?'),
      label: `${id} sort ${S5.a}`}), names: ls4Names(items), nudge: 'Not yet. Is it someone, a thing, or a place?',
    react: () => ({ctx: {a: S5.a, b: S5.t1, p: S5.p, c: S5.b}, lines: [`The ${S5.a} is a who. The ${S5.t1} is a what.`]})};
  };
  D.name = c => {
    const a = c.a || 'dog', b = c.b || 'ball', p = c.p || 'beach';
    return {html: `<div class="ls4-row">${[a, b, p].map((x, i) => `<span class="ls4-nw">${ls4Pic(x, 'ls4-m')}<span class="ls4-wd">${['Who', 'What', 'Where'][i]}</span></span>`).join('')}</div>`, sl: {a, b}};
  };
  D.fix = q => q;
  D.warm = ls5WarmSight(D, 1);
  return D;
}

/* ---- Opposites and Synonyms: pairs. Stage 0 a pairs match (three pairs), 1 a word heard and shown with three to pick from, 2 a word to read,
   3 a word to read and four to pick from. The wrong one means the same (oppSame), or the opposite for Synonyms (synOpp). ---- */
const LS5_OPP = [['big', 'small', 'huge'], ['small', 'big', 'tiny'], ['hot', 'cold', 'warm'], ['cold', 'hot', 'icy'], ['happy', 'sad', 'glad'], ['sad', 'happy', 'upset'],
  ['fast', 'slow', 'quick'], ['wet', 'dry', 'damp'], ['soft', 'hard', 'fluffy'], ['loud', 'quiet', 'noisy'], ['stop', 'go', 'halt'], ['push', 'pull', 'shove'],
  ['pull', 'push', 'tug'], ['full', 'empty', 'packed'], ['shut', 'open', 'closed']];
const LS5_SYN = [['big', 'huge', 'small'], ['small', 'tiny', 'big'], ['happy', 'glad', 'sad'], ['sad', 'upset', 'happy'], ['fast', 'quick', 'slow'], ['hot', 'warm', 'cold'],
  ['cold', 'icy', 'hot'], ['wet', 'damp', 'dry'], ['loud', 'noisy', 'quiet'], ['stop', 'halt', 'go'], ['shut', 'closed', 'open'], ['start', 'begin', 'end'],
  ['yell', 'shout', 'whisper'], ['jump', 'hop', 'sit'], ['smile', 'grin', 'frown']];
function ls5Pairs(id, t, g, syn, o) {
  const code = syn ? 'synOpp' : 'oppSame', rel = syn ? 'means the same as' : 'is the opposite of', ROWS = syn ? LS5_SYN : LS5_OPP;
  const D = ls5D(id, t, g, 'pairs', Object.assign({bugs: [code], syn, slots: LS5_SL.pairs, claim: syn ? 'I think {ans} means the same as {word}.' : 'I think the opposite of {word} is {ans}.'}, o));
  const rows = r => { const o2 = [], seen = new Set(); for (const x of ls4Shuf(r, ROWS)) if (!seen.has(x[0]) && !seen.has(x[1])) { o2.push(x); seen.add(x[0]); seen.add(x[1]); } return o2; };
  const match = (st, r, o2) => {
    const R3 = rows(r).slice(0, 3);
    return {q: ls4Q(D, st, Object.assign({kind: 'match', items: R3.map((x, k) => ({v: 'p' + k, l: x[0]})), opts: ls4Shuf(r, R3.map((x, k) => ({v: 'p' + k, l: x[1]}))), ans: 'p0|p1|p2',
      sl: {}, say: syn ? 'Match each word to one that means the same.' : 'Match each word to its opposite.', html: lsAsk(syn ? 'Same meaning' : 'Opposites'),
      hint: {k: 'text', s: syn ? 'Try each word in its place. Does it say the same?' : 'Say them as a pair, like hot and cold.'}, label: `${id} match ${R3.map(x => x[0]).join('/')}`}, o2)), R3};
  };
  D.q = (st, r) => {
    if (st == 0) return match(0, r).q;
    const [x] = rows(r), n = st == 3 ? 4 : 3, others = ROWS.filter(y => ![x[0], x[1], x[2]].includes(y[0]) && ![x[0], x[1], x[2]].includes(y[1]) && y[0] !== x[0]).map(y => y[1]);
    const wr = [x[2]].concat(ls4Shuf(r, [...new Set(others)].filter(y => ![x[0], x[1], x[2]].includes(y))).slice(0, n - 2)), all = ls4Shuf(r, [x[1]].concat(wr));
    return ls4Q(D, st == 3 ? 2 : st, {kind: 'choice', cls: 'ls4-words', ans: x[1], choices: ls4TxtCh(all), sl: st == 1 ? {word: x[0]} : {word: x[0]}, bug: {[code]: [x[2]]},
      html: `<div class="ls4-word">${esc(x[0])}</div>` + lsAsk(syn ? 'Which means the same?' : 'Which is the opposite?'),
      say: st == 1 ? `${x[0]}. Which word ${syn ? 'means the same' : 'is the opposite'}?` : `Read the word. Tap ${syn ? 'the one that means the same' : 'its opposite'}.`,
      hint: {k: 'text', s: syn ? `Put each word in place of ${x[0]}. Which says the same?` : `Say ${x[0]} and each word as a pair.`}, label: `${id} ${x[0]}${st == 3 ? ' 4' : ''}`});
  };
  D.exp = r => {
    const M = match(0, r, {label: `${id} try`});
    return {q: M.q, nudge: 'Not a pair yet. Say the two words together.',
      react: () => ({ctx: {a: M.R3[0][0], b: M.R3[0][1]}, lines: [`${M.R3[0][0]} and ${M.R3[0][1]}: you matched them!`]})};
  };
  D.name = c => {
    const a = c.a || (syn ? 'big' : 'hot'), b = c.b || (syn ? 'huge' : 'cold');
    return {html: `<div class="ls5-pr"><span class="ls4-word">${esc(a)}</span><span class="ls5-ar" aria-hidden="true">${syn ? '=' : ico('arrow-left', 22) + ico('arrow-right', 22)}</span><span class="ls4-word">${esc(b)}</span></div>`
      + `<span class="a11y-h">${esc(a)} ${rel} ${esc(b)}</span>`, sl: {a, b}};
  };
  D.fix = q => q;
  D.warm = ls5WarmSight(D, 2);
  return D;
}

/* ---- sentences of drawn animals and things (lower case: the fixer and the order shape write the capital and the mark) ---- */
const LS5_AN = ['dog', 'cat', 'pig', 'duck', 'hen', 'frog', 'rabbit', 'mouse', 'horse', 'cow', 'bear', 'lion', 'fox'];
const LS5_TH = ['kite', 'ball', 'hat', 'cake', 'book', 'drum', 'bike', 'cup', 'gift', 'flag'];
const LS5_TELL = [a => `the ${a} is on the bed`, a => `the ${a} can run`, a => `my ${a} is little`, a => `the ${a} is big`, (a, t) => `i see ${art(t)} ${t}`,
  (a, t) => `we have ${art(t)} ${t}`, (a, t) => `the ${a} has ${art(t)} ${t}`];
const LS5_ASK = [a => `is the ${a} on the bed`, a => `can the ${a} run`, a => `where is the ${a}`, (a, t) => `do you see the ${t}`, (a, t) => `who has the ${t}`,
  a => `can you see the ${a}`, (a, t) => `is the ${t} big`];
// a sentence: its words, asking or not, and the drawn thing it is about
function ls5Sentence(r, ask) {
  const a = ls4Pick(r, LS5_AN.filter(w => ART[w])), t = ls4Pick(r, LS5_TH.filter(w => ART[w])), L = ask ? LS5_ASK : LS5_TELL, f = ls4Pick(r, L);
  const s = f(a, t);
  return {w: s.split(' '), ask: ask ? 1 : 0, pic: s.includes(' ' + t) ? t : a};
}

/* ---- Capitals & End Marks: the sentence fixer. Stage 0 the fixer (a capital, the end mark), 1 a picture and three ways to write its
   sentence, 2 the same with no picture, 3 four ways. Wrong: no capital (capOff), the other end mark (endMk). ---- */
function ls5Fix(id, t, g, o) {
  const D = ls5D(id, t, g, 'sfix', Object.assign({bugs: ['capOff', 'endMk'], slots: LS5_SL.sfix, claim: 'I pick this one: {ans} Am I right?', petSt: 1}, o));
  const fixQ = (st, r, ask, o2) => {
    const S5 = ls5Sentence(r, ask), mk = S5.ask ? 2 : 1, ot = 3 - mk;
    return ls4Q(D, st, Object.assign({kind: 'make', model: 'sfix', m: {w: S5.w, ask: S5.ask}, goal: 'sfix', eq: 'value', ans: 10 + mk, vsay: v => ls5Txt(S5.w, +v >= 10, +v % 10), sl: {},
      bug: {capOff: [mk], endMk: [10 + ot]}, html: `<div class="emo">${ls4Pic(S5.pic)}</div>` + lsAsk(S5.ask ? 'An asking sentence.' : 'A telling sentence.'),
      say: `Fix this ${S5.ask ? 'asking' : 'telling'} sentence: a capital, then the end mark.`, hint: {k: 'text', s: 'A capital letter first. Telling: a period. Asking: a question mark.'},
      label: `${id} fix ${S5.w.join(' ')}`}, o2));
  };
  D.q = (st, r) => {
    if (st == 0) return fixQ(0, r, r() < .5);
    const S5 = ls5Sentence(r, r() < .5), mk = S5.ask ? 2 : 1, ot = 3 - mk, right = ls5Txt(S5.w, 1, mk), noCap = ls5Txt(S5.w, 0, mk), wrongMk = ls5Txt(S5.w, 1, ot);
    const all = [right, noCap, wrongMk].concat(st == 3 ? [ls5Txt(S5.w, 0, ot)] : []);
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: 'ls5-sents', ans: right, choices: ls5Ch(r, all), sl: {}, bug: {capOff: [noCap], endMk: [wrongMk]},
      html: (st == 1 ? `<div class="emo">${ls4Pic(S5.pic)}</div>` : '') + lsAsk('Which one is written right?'), say: 'Which sentence is written right? Check the start and end.',
      hint: {k: 'text', s: 'A capital letter first. Telling: a period. Asking: a question mark.'}, label: `${id} pick ${S5.w.join(' ')}${st == 3 ? ' 4' : ''}`});
  };
  D.exp = r => {
    const q = fixQ(0, r, false, {label: `${id} try`});
    return {q, nudge: 'Not yet. Check the first letter and the end mark.', react: () => ({ctx: {}, lines: ['A capital first, and a mark at the end!']})};
  };
  D.name = () => ({html: `<div class="ls5-sents2"><div class="ls5-sent">${ls5SentHtml(['the', 'dog', 'can', 'run'], 1, 1)}</div>`
    + `<div class="ls5-sent">${ls5SentHtml(['can', 'the', 'dog', 'run'], 1, 2)}</div></div>`, sl: {}});
  D.fix = q => q;
  D.warm = ls5WarmSight(D, 2);
  return D;
}

/* ---- Build Sentences: word tiles in order (the end mark shown). Stage 0 the tiles with a picture, 1 a picture and three ways to write it,
   2 the same with no picture, 3 the tiles with no picture. Wrong: two words swapped (wOrder), the other end mark (endMk). ---- */
function ls5Order(id, t, g, o) {
  const D = ls5D(id, t, g, 'order', Object.assign({bugs: ['wOrder', 'endMk'], slots: LS5_SL.order, claim: 'I pick this one: {ans} Am I right?', petSt: 1}, o));
  const words = S5 => S5.w.map((x, i) => (i ? x : ls5Cap(x)));
  // two words next to each other swapped (never the first), so the sentence no longer makes sense
  const swap = (ws, r) => { const i = lsRi(r, 1, ws.length - 2), o2 = ws.slice(); [o2[i], o2[i + 1]] = [o2[i + 1], o2[i]]; return o2; };
  const ordQ = (st, r, pic, o2) => {
    const S5 = ls5Sentence(r, r() < .3), ws = words(S5), mk = LS5_MK[S5.ask ? 2 : 1];
    let items;
    do items = ls4Shuf(r, ws); while (items.join(' ') === ws.join(' '));
    const q = ls4Q(D, st, Object.assign({kind: 'order', items: items.map(x => ({v: x, l: x})), ans: ws, end: mk, sl: {}, bug: {wOrder: [swap(ws, r).join(',')]},
      html: (pic ? `<div class="emo">${ls4Pic(S5.pic)}</div>` : '') + lsAsk('Put the words in order.'), say: 'Put the words in order. Then read it.',
      hint: {k: 'text', s: `It starts with ${ws[0]}. Read it out loud as you go.`}, label: `${id} order ${S5.w.join(' ')}${pic ? '' : ' show'}`}, o2));
    q.ans = ws; // an order's answer is the list (lsQ makes answers text)
    return {q, S5, s: ws.join(' ') + mk};
  };
  D.q = (st, r) => {
    if (st == 0 || st == 3) return ordQ(st == 3 ? 2 : 0, r, st == 0).q;
    const S5 = ls5Sentence(r, r() < .3), ws = words(S5), mk = S5.ask ? 2 : 1, right = ws.join(' ') + LS5_MK[mk], sw = swap(ws, r).join(' ') + LS5_MK[mk], wm = ws.join(' ') + LS5_MK[3 - mk];
    return ls4Q(D, st, {kind: 'choice', cls: 'ls5-sents', ans: right, choices: ls5Ch(r, [right, sw, wm]), sl: {}, bug: {wOrder: [sw], endMk: [wm]},
      html: (st == 1 ? `<div class="emo">${ls4Pic(S5.pic)}</div>` : '') + lsAsk('Which one is a good sentence?'), say: 'Which one makes sense, with the right end mark?',
      hint: {k: 'text', s: 'Read each one out loud. Telling: a period. Asking: a question mark.'}, label: `${id} pick ${S5.w.join(' ')}`});
  };
  D.exp = r => {
    const O = ordQ(0, r, true, {label: `${id} try`});
    return {q: O.q, nudge: 'Not yet. Read it out loud. Does it sound right?', react: () => ({ctx: {}, lines: [`${O.s} You built it!`]})};
  };
  D.name = () => ({html: `<div class="ls5-tiles">${['The', 'dog', 'can', 'run'].map(x => `<span class="ls5-tile">${x}</span>`).join('')}<span class="ls5-mk on">.</span></div>`, sl: {}});
  D.fix = q => q;
  D.warm = ls5WarmSight(D, 3);
  return D;
}

/* ---- Parts of Speech: naming words and doing words. Stage 0 a sorter of four words, 1 a picture and its sentence (tap the doing or the
   naming word), 2 the sentence alone, 3 a longer sentence with four words to pick from. Wrong: the other kind of word (posSwap). ---- */
// fixRev (v184): no word that is both a naming and a doing word to a child (a duck, to duck; a fish, to fish; flies, the insects)
const LS5_VERB = {dog: ['runs', 'digs', 'jumps', 'barks'], cat: ['naps', 'jumps', 'runs'], bird: ['sings', 'chirps'], frog: ['hops', 'jumps', 'swims'],
  bee: ['buzzes'], horse: ['runs', 'trots'], pig: ['eats', 'digs'], hen: ['pecks', 'eats'], owl: ['hoots'], rabbit: ['hops', 'eats'],
  turtle: ['swims', 'crawls'], lion: ['roars', 'runs'], cow: ['eats', 'moos'], bear: ['sleeps', 'eats'], mouse: ['runs', 'hides']};
const LS5_ADV = ['fast', 'now', 'today', 'here'];
function ls5Pos(id, t, g, o) {
  const D = ls5D(id, t, g, 'pos', Object.assign({bugs: ['posSwap'], slots: LS5_SL.pos, claim: 'I tap {ans}. Am I right?'}, o));
  const AN = () => Object.keys(LS5_VERB).filter(w => ART[w]);
  const sortQ = (st, r, o2) => {
    const [a, b] = ls4Shuf(r, AN()), vs = ls4Shuf(r, [...new Set(LS5_VERB[a].concat(LS5_VERB[b]))]).slice(0, 2);
    const items = ls4Shuf(r, [a, b].map(x => ({v: x, l: x, b: 'n', say: x})).concat(vs.map(x => ({v: x, l: x, b: 'd', say: x}))));
    const q = ls4Sort(D, st, [{v: 'n', l: 'Naming', al: 'Naming words'}, {v: 'd', l: 'Doing', al: 'Doing words'}], items, Object.assign({sl: {}, say: 'Sort them: naming words and doing words.',
      html: lsAsk('Naming word or doing word?'), hint: {k: 'text', s: 'Can you do it? Then it is a doing word.'}, label: `${id} sort ${a}/${vs.join('/')}`}, o2));
    return {q, a, v: vs[0]};
  };
  D.q = (st, r) => {
    if (st == 0) return sortQ(0, r).q;
    const a = ls4Pick(r, AN()), v = ls4Pick(r, LS5_VERB[a]), ad = st == 3 ? ls4Pick(r, LS5_ADV) : null, doing = r() < .6, ans = doing ? v : a, swp = doing ? a : v;
    const ws = ['The', a, v].concat(ad ? [ad] : []), s = ws.join(' ') + '.', all = ls4Shuf(r, [ans, swp, 'The'].concat(ad ? [ad] : []));
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: 'ls4-words', ans, choices: ls4TxtCh(all), sl: {}, bug: {posSwap: [swp]},
      html: (st == 1 ? `<div class="emo">${ls4Pic(a)}</div>` : '') + `<div class="ls4-sent">${esc(s)}</div>` + lsAsk(doing ? 'Tap the doing word.' : 'Tap the naming word.'),
      say: `${s} Which is the ${doing ? 'doing' : 'naming'} word?`, hint: {k: 'text', s: doing ? 'What does it do? That is the doing word.' : 'Who or what is it about? That is the naming word.'},
      label: `${id} ${doing ? 'do' : 'name'} ${a} ${v}${ad ? ' ' + ad : ''}`});
  };
  D.exp = r => {
    const S5 = sortQ(0, r, {label: `${id} try`});
    return {q: S5.q, nudge: 'Not yet. Can you do it? Then it is a doing word.', react: () => ({ctx: {a: S5.a, b: S5.v}, lines: [`${S5.a} is a naming word. ${S5.v} is a doing word.`]})};
  };
  D.name = c => {
    const a = c.a || 'dog', b = c.b || 'runs';
    return {html: `<div class="ls4-row"><span class="ls4-nw">${ls4Pic(a, 'ls4-m')}<span class="ls4-wd">${esc(a)}</span><span class="ls5-tag">Naming</span></span>`
      + `<span class="ls4-nw"><span class="ls4-word">${esc(b)}</span><span class="ls5-tag">Doing</span></span></div>`, sl: {a, b}};
  };
  D.fix = q => q;
  D.warm = ls5WarmSight(D, 4);
  return D;
}

/* ---- Plurals: add s, or es after x, s, sh, ch. Stage 0 the word for two built from tiles (its picture), 1 a picture and three to pick from,
   2 the same with no picture, 3 four to pick from. Wrong: s for es (plEs), es for s (plE), no ending (plNo). ---- */
const LS5_PLS = ['cat', 'dog', 'pig', 'hat', 'bed', 'cup', 'duck', 'frog', 'kite', 'book', 'star', 'tree', 'ball', 'sock', 'hen', 'bike', 'boat', 'cake', 'drum', 'flag', 'bell'];
const LS5_PLES = ['box', 'fox', 'dish', 'dress', 'beach', 'church'];
const ls5Es = w => /(x|s|sh|ch)$/.test(w);
const ls5Pl = w => w + (ls5Es(w) ? 'es' : 's');
// fixRev (v184): the wrong ending (es for s, s for es) must make a plausible non-word: never a real word (star + es is "stares"), never
// three letters in a row (dress + s), never e + es (kite + es); a word whose wrong ending fails is not asked (it still sorts in Explore)
const LS5_PLREAL = ['stares', 'hates', 'belles', 'doges', 'capes', 'tubes', 'cubes', 'cares', 'pines', 'bites', 'mates', 'notes', 'hopes', 'canes', 'cones',
  'robes', 'tapes', 'dates', 'gates', 'rates', 'fates', 'pales', 'tales', 'bares'];
const ls5PlWrong = w => (ls5Es(w) ? w + 's' : w + 'es');
const ls5PlOk = w => { const x = ls5PlWrong(w); return !LS5_PLREAL.includes(x) && !/(.)\1\1/.test(x) && !/ees$/.test(x); };
function ls5Plural(id, t, g, o) {
  const D = ls5D(id, t, g, 'plural', Object.assign({bugs: ['plEs', 'plE', 'plNo'], slots: LS5_SL.plural, claim: 'Two of them: {ans}. Am I right?'}, o));
  const S = () => LS5_PLS.filter(w => ART[w]), E = () => LS5_PLES.filter(w => ART[w]);
  const word = r => ls4Pick(r, (r() < .5 ? E() : S()).filter(ls5PlOk));
  const bugOf = w => (ls5Es(w) ? {plEs: [ls5PlWrong(w)], plNo: [w]} : {plE: [ls5PlWrong(w)], plNo: [w]});
  const two = w => `<div class="emo ls5-two">${ls4Pic(w)}${ls4Pic(w)}</div>`;
  D.q = (st, r) => {
    const w = word(r), p = ls5Pl(w), sl = {word: w};
    if (st == 0) {
      const tiles = ls4Shuf(r, [...p].concat(ls5Es(w) ? ['t'] : ['e']));
      return ls4Q(D, 0, {kind: 'build', word: p, tiles, ans: p, sl, bug: bugOf(w), hint: {k: 'text', s: ls5Es(w) ? `${w} ends with ${w.slice(-2) == 'sh' || w.slice(-2) == 'ch' ? w.slice(-2) : w.slice(-1)}: add e and s.` : 'Just add s.'},
        html: two(w) + lsAsk(`One ${esc(w)}, two …`) + ls4Slots(p.length), say: `One ${w}, two ${p}. Build ${p}.`, label: `${id} build ${p}`});
    }
    const wr = [ls5PlWrong(w), w], oth = ls5Pl(ls4Pick(r, (ls5Es(w) ? E() : S()).filter(x => x !== w))), all = ls5Ch(r, [p].concat(wr, st == 3 ? [oth] : []));
    return ls4Q(D, Math.min(st, 2), {kind: 'choice', cls: 'ls4-words', ans: p, choices: all, sl, bug: bugOf(w),
      hint: {k: 'text', s: 'Say the word for two. Do you hear an extra part at the end?'}, html: (st == 1 ? two(w) : '') + `<div class="ls4-sent">One ${esc(w)}, two ___.</div>`,
      say: `One ${w}, two what?`, label: `${id} pick ${w}${st == 3 ? ' 4' : ''}`});
  };
  D.exp = r => {
    const es = ls4Shuf(r, E()).slice(0, 2), s = ls4Shuf(r, S()).slice(0, 2), items = ls4Shuf(r, es.map(x => ls4Chip(x, 'es')).concat(s.map(x => ls4Chip(x, 's'))));
    return {q: ls4Sort(D, 0, [{v: 's', l: '+ s', al: 'add s'}, {v: 'es', l: '+ es', al: 'add e s'}], items, {sl: {}, say: 'More than one: add s, or add e s?',
      html: lsAsk('+ s or + es?'), label: `${id} sort ${es.join('/')}`}), names: ls4Names(items), nudge: 'Not yet. Say the word for two. Hear an extra part?',
    react: () => ({ctx: {a: es[0], b: s[0]}, lines: [`Two ${ls5Pl(es[0])}. Two ${ls5Pl(s[0])}.`]})};
  };
  D.name = c => {
    const a = c.a || 'box', b = c.b || 'cat';
    return {html: `<div class="ls4-row">${[a, b].map(x => `<span class="ls4-nw">${ls4Pic(x, 'ls4-m')}<span class="ls4-wd">${esc(x)}${ico('arrow-right', 20)}${esc(x)}<b>${ls5Es(x) ? 'es' : 's'}</b></span></span>`).join('')}</div>`,
      sl: {a, b}};
  };
  D.fix = q => q;
  D.warm = ls5WarmSight(D, 4);
  return D;
}
/* ---------- READ-SHAPES (v184): the lessons of the K-2 reading stops that had none (part teachrd; their shapes: 52q-bench5r.js) ----------
   In map order. Each is a real stop of the reading map with the stop's own name; the idea, tonight's question and the fallback Name it line
   are hand-written here, the rest of the fallback is the engine's tone lines and each code's repair line (lsFallback4). Their drafted
   words are batch '5r' (D.b5r): docs/drafts/BATCH5R-READ.md, until the owner approves them.
   Not built: Bossy R and Build Bossy R (pic5, build5): their r-vowel partner words (far / fur, barn / born / burn, shirt / short, card /
   cord) have no drawn pictures, and most of them (far, born, burn, short) are not things a picture can show a child without words, so
   the pet could not misread a drawn word as its partner (PROGRESS READ-SHAPES); the tracing stops (side stops with their own screen);
   and the Word Workshop stops Fill the Gap, Compound Words, Sentence Stories, Read a Story and Learn About It (passages and word
   building, left for later). */
// Letter Meadow (K)
lsDraft4('sight1', ls5Sight('sight1', 'Sight Words', 0, 1, {idea: 'Some words we know by sight. We do not sound them out.', fb: '{word} and {other} start the same. Look at every letter.',
  home: 'Ask {name} to find the word "the" in a book.'}));
lsDraft4('rhyme1', ls5Rhyme('rhyme1', 'Rhyme Time', 0, false, {idea: 'Words that rhyme sound the same at the end.', fb: '{a} and {b} rhyme. They sound the same at the end.',
  home: 'Ask {name} for a word that rhymes with cat.'}));
// Candy Canyon (1st)
lsDraft4('sight2', ls5Sight('sight2', 'More Sight Words', 1, 2, {idea: 'Some words we know by sight. We do not sound them out.', fb: '{word} and {other} start the same. Look at every letter.',
  home: 'Ask {name} to read the word "they" on a page.'}));
lsDraft4('rhyme2', ls5Rhyme('rhyme2', 'Rhyme & Read', 1, true, {idea: 'Words that rhyme sound the same at the end.', fb: '{a} and {b} rhyme. They sound the same at the end.',
  home: 'Ask {name} to read "dog" and "frog" and say why they rhyme.'}));
lsDraft4('comp1', ls5Story('comp1', 'Story Time', 1, false, {idea: 'A story tells who, what and where. Listen for each one.', fb: 'The {a} is who. The {b} is what.',
  home: 'Ask {name}: "Who was in a story you heard today?"'}));
lsDraft4('syl2', ls5Claps('syl2', 'Count the Claps', 1, {idea: 'Words have parts. Clap once for each part you say.', fb: '{word} has {n} parts. One clap for each part.',
  home: 'Ask {name} to clap "butterfly". How many claps?'}));
lsDraft4('spell1', ls5Spell('spell1', 'Spell Short Words', 1, LS4W.cvc, 'mid', ['mid', 'last', 'first'], {what: 'writing short words of three sounds (c-a-t), one letter for each sound', idea: 'Listen to each sound. Write a letter for each one.',
  fb: 'Every sound in {word} gets its letter.', home: 'Say "map" and ask {name} to write it.'}));
// Ocean Reef (1st)
lsDraft4('sight3', ls5Sight('sight3', 'Sight Words 3', 1, 3, {idea: 'Some words we know by sight. We do not sound them out.', fb: '{word} and {other} start the same. Look at every letter.',
  home: 'Ask {name} to read the word "could" in a book.'}));
lsDraft4('comp2', ls5Story('comp2', 'Story Time 2', 1, true, {idea: 'Listen to the whole story. Each part tells us something.', fb: 'The {a} is who. The {b} is what.',
  home: 'Ask {name} to tell you a story about a dog, then ask "where?"'}));
// a blend at the start or at the end (milk, hand), so Name it can show the blend of every word
const LS5_BLEND = w => (/^(fr|cr|dr|fl|st|cl|tr|pl|gr|br|sl|sn)/.exec(w) || /(lk|nt|nd|ft|st|mp)$/.exec(w) || [])[0] || null;
lsDraft4('spell2', ls5Spell('spell2', 'Spell Blends', 1, LS4W.blend, LS5_BLEND, ['blend', 'mid'], {what: 'writing words that start or end with a blend (fr in frog, nd in hand): both letters go in', idea: 'In a blend we hear both letters. Write both of them.',
  fb: 'Every sound in {word} gets its letter. Both letters of {letter}.', home: 'Say "frog" and ask {name} to write it.'}));
lsDraft4('vocab1', ls5Pairs('vocab1', 'Opposites', 1, false, {idea: 'Opposites are as different as can be: hot and cold.', fb: '{a} and {b} are opposites.',
  home: 'Ask {name} for the opposite of "up".'}));
lsDraft4('gram1', ls5Fix('gram1', 'Capitals & End Marks', 1, {idea: 'A sentence starts with a capital and ends with a mark.', fb: 'Telling ends with a period. Asking ends with a question mark.',
  home: 'Ask {name} to point to the capital and the end mark in a sentence.'}));
// Space Station (2nd)
lsDraft4('sight4', ls5Sight('sight4', 'Sight Words 4', 2, 4, {idea: 'Some words we know by sight. We do not sound them out.', fb: '{word} and {other} start the same. Look at every letter.',
  home: 'Ask {name} to read the word "because" on a sign or a page.'}));
lsDraft4('spell3', ls5Spell('spell3', 'Spell Silent E & Teams', 2, LS4W.silent.concat(LS4W.team), ['silent', 'team'], ['silent', 'team', 'mid'],
  {what: 'writing words with a quiet e at the end (kite) or a vowel team (boat): the letters we do not hear go in too',
  idea: 'Some sounds need more letters: a quiet e, or a vowel team.', fb: 'Every sound in {word} gets its letters, {letter} too.', home: 'Say "kite" and ask {name} to write it.'}));
lsDraft4('sent3', ls5Order('sent3', 'Build Sentences', 2, {idea: 'Words go in an order that makes sense.', fb: 'Read it out loud. It should make sense.',
  home: 'Ask {name} to make a sentence with "dog", "the" and "runs".'}));
// Word Workshop (2nd)
lsDraft4('sight5', ls5Sight('sight5', 'Sight Words 5', 2, 5, {idea: 'Some words we know by sight. We do not sound them out.', fb: '{word} and {other} start the same. Look at every letter.',
  home: 'Ask {name} to read the word "together" in a book.'}));
lsDraft4('gram2', ls5Pos('gram2', 'Parts of Speech', 2, {idea: 'A naming word names a thing. A doing word is an action.', fb: '{a} is a naming word. {b} is a doing word.',
  home: 'Ask {name} for three doing words you can do at home.'}));
lsDraft4('vocab2', ls5Pairs('vocab2', 'Synonyms', 2, true, {idea: 'Some words mean almost the same: big and huge.', fb: '{a} and {b} mean almost the same.',
  home: 'Ask {name} for another word for "happy".'}));
lsDraft4('gram3', ls5Plural('gram3', 'Plurals', 2, {idea: 'More than one: add s, or es after x, s, sh, ch.', fb: 'Most words add s. Words like {a} add e and s.',
  home: 'Ask {name}: "One box, two what? One cat, two what?"'}));

var TEACHRD_VER='v195'; // last line: the whole file ran (checked by dataReady() before the app starts)
