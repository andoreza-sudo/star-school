/* Whistlestop teachrd v198. BUILT by tools/build.py from 52k-teach4.css, 52q-teach5r.css, 52x-story7.css, 52k-words4.js, 52l-bench4.js, 52m-lessons4.js, 52p-lessons4b.js, 52q-bench5r.js, 52r-lessons5r.js, 52w-story7d.js, 52x-story7.js, d-story-audio.js: never edit by hand.
   index.html v198 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v198.js. */
(function(){var s=document.createElement('style');s.id='css-teachrd';s.textContent="/* TEACH-4: the reading and Pre-K lessons (52l-bench4.js, 52m-lessons4.js, part teachrd): the reading map's colours on the lesson screen,\n   the letter big on the card, word boxes with a letter missing, the pet's letters in Check me, pictures with their words. Tokens only. */\n.ls-top.s-read .ls-pip.on{background:var(--read);color:var(--surface)}\n.ls-top.s-read .ls-pip.now{background:var(--read-tint);color:var(--read-shade);box-shadow:inset 0 0 0 3px var(--read)}\n.ls4-pic{display:inline-flex;align-items:center;justify-content:center;line-height:1}\n.ls4-pic .art{display:block}\n.ls4-big{font-size:var(--fs-7);font-weight:700;line-height:1.1;color:var(--ink);background:var(--read-tint);border-radius:var(--r-card);padding:0 var(--s-4);min-width:1.6em;text-align:center}\n.ls4-row{display:flex;gap:var(--s-4);justify-content:center;align-items:flex-end;flex-wrap:wrap;margin-top:var(--s-2)}\n.ls4-m{font-size:clamp(48px,14vmin,88px)}\n.ls4-nw{display:flex;flex-direction:column;align-items:center;gap:var(--s-1)}\n.ls4-wd{font-size:var(--fs-5);font-weight:700;color:var(--ink);letter-spacing:.04em}\n.ls4-wd b{color:var(--read-shade);text-decoration:underline;text-underline-offset:.15em}\n.ls4-gap{align-items:flex-end}\n.ls4-l{font-size:calc(clamp(36px,9vmin,72px)*var(--k));font-weight:700;line-height:1.35;color:var(--ink)}\n.ls.ls4-f{color:var(--ink);font-weight:700}\n.ls-pw.ls4-pw .ls,.ls4-gap .ls.ls4-f{background:var(--star-tint)}\n.ls4-pick{margin-top:var(--s-2);display:flex;flex-wrap:wrap;gap:var(--s-2);justify-content:center}\n.ls4-pk{display:inline-flex;align-items:center;justify-content:center;min-width:64px;min-height:64px;padding:var(--s-1);font-size:clamp(32px,6vh,52px);font-weight:700;color:var(--ink);\n  background:var(--surface-2);border-radius:var(--r-card)}\n.ls4-pk.on{background:var(--star-tint);box-shadow:inset 0 0 0 4px var(--star)}\n.ls4-pk .pks,.ls4-pk .art{width:1em;height:1em}\n.ls4-word{font-size:var(--fs-7);font-weight:700;color:var(--ink);letter-spacing:.06em;line-height:1.2}\n.ls4-sent{font-size:var(--fs-5);font-weight:700;color:var(--ink);line-height:1.35;max-width:22em}\n.choices.ls4-words{grid-template-columns:1fr}\n.choices.ls4-words .ch{font-size:var(--fs-6);font-weight:700;letter-spacing:.06em}\n.ls4-plate{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;align-items:center;max-width:100%;font-size:clamp(24px,6vmin,40px);line-height:1}\n.ls4-plate .pko{display:inline-flex}\n.choices.ls4-plates .ch{font-size:inherit;padding:var(--s-2)}\n.ls4-bl{display:block;font-size:var(--fs-2);font-weight:700;color:var(--ink)}\n.sbl .ls4-pic{font-size:36px}\n.ls4-strip{display:flex;gap:var(--s-1);justify-content:center;font-size:var(--fs-5);font-weight:700;color:var(--ink-2);margin-bottom:var(--s-1)}\n.ls4-strip span{min-width:1.3em;text-align:center;background:var(--surface-2);border-radius:var(--r-chip)}\n.ls4-strip .ls4-q{color:var(--read-shade);background:var(--read-tint)}\n.ls4-claps{font-size:var(--fs-6);display:flex;align-items:center;justify-content:center;gap:var(--s-2)}\n.ls4-claps .ic{width:.8em;height:.8em}\n@media (max-width:420px){.ls4-big{font-size:var(--fs-6)}.ls4-word{font-size:var(--fs-6)}.ls4-sent{font-size:var(--fs-4)}}\n/* READ-SHAPES (v184): the models of the K-2 reading lesson shapes (52q-bench5r.js, part teachrd): word cards, the flash card, claps, the\n   dictation ear, the story card, opposite pairs, the sentence fixer, word tiles. Tokens only; every button 48 px or more. */\n.ls5-cards{display:flex;flex-wrap:wrap;gap:var(--s-2);justify-content:center;max-width:100%}\n.ls5-card{display:inline-flex;align-items:center;justify-content:center;min-width:72px;min-height:72px;padding:var(--s-2) var(--s-3);border:0;border-radius:var(--r-card);\n  background:var(--read);color:var(--surface);font:inherit;font-size:var(--fs-5);font-weight:700;letter-spacing:.04em;box-shadow:var(--shadow)}\nbutton.ls5-card{cursor:pointer}\n.ls5-card.up{background:var(--surface);color:var(--ink);box-shadow:inset 0 0 0 3px var(--read)}\n.ls5-card.ls5-big{font-size:var(--fs-7);min-width:120px;min-height:96px}\n.ls5-card.ls5-no{opacity:.75}\n.ls5-bk .ic{width:30px;height:30px}\n.ls5-pair{display:flex;gap:var(--s-4);justify-content:center;align-items:center;flex-wrap:wrap}\n.ls5-fl{display:flex;gap:var(--s-3);align-items:center;justify-content:center}\n.ls5-flash{display:inline-block;opacity:1}\n.ls5-flash.go{animation:ls5f 2.6s ease-in forwards}\n@keyframes ls5f{0%,70%{opacity:1}100%{opacity:0}}\n@media (prefers-reduced-motion:reduce){.ls5-flash.go{animation:none}}\n.mmb.ls5-again,.mmb.ls5-say{min-width:48px;min-height:48px}\n.mmb.ls5-ear{min-width:64px;min-height:64px;background:var(--read-tint);color:var(--read-shade)}\n.ls5-dict{display:flex;justify-content:center;margin:var(--s-1) 0}\n.ls5-claps{display:flex;flex-wrap:wrap;gap:var(--s-1);justify-content:center;align-items:center;min-height:48px;color:var(--read-shade)}\n.ls5-cl{display:inline-flex}\n.ls5-cl0{display:inline-block;width:48px;height:4px;border-radius:2px;background:var(--line)}\n.ls5-cn{font-size:var(--fs-4);font-weight:700;color:var(--ink);text-align:center}\n.ls5-cbs{display:flex;gap:var(--s-3);justify-content:center}\n.mmb.ls5-clapb{min-width:120px;min-height:64px;gap:var(--s-1);font-size:var(--fs-4);font-weight:700;background:var(--read);color:var(--surface)}\n.ls5-story{display:flex;flex-direction:column;gap:var(--s-1);max-width:30em;margin:0 auto;text-align:left}\n.ls5-sl{display:flex;align-items:center;gap:var(--s-2);background:var(--surface-2);border-radius:var(--r-card);padding:var(--s-1) var(--s-2)}\n.ls5-st{flex:1;font-size:var(--fs-4);font-weight:700;color:var(--ink);line-height:1.3}\n.ls5-sp{display:inline-flex;gap:var(--s-1);font-size:clamp(32px,8vmin,48px)}\n.ls5-pr{display:flex;align-items:center;justify-content:center;gap:var(--s-3);flex-wrap:wrap}\n.ls5-ar{display:inline-flex;align-items:center;font-size:var(--fs-6);font-weight:700;color:var(--read-shade)}\n.ls5-sent{font-size:var(--fs-5);font-weight:700;color:var(--ink);line-height:1.4;text-align:center}\n.ls5-c1{display:inline-block;min-width:.7em;border-radius:var(--r-chip);background:var(--surface-2)}\n.ls5-c1.on{background:var(--star-tint);color:var(--read-shade)}\n.ls5-mk{display:inline-block;min-width:.8em;color:var(--ink-2);text-align:center}\n.ls5-mk.on{color:var(--read-shade);background:var(--star-tint);border-radius:var(--r-chip)}\n.ls5-sents2{display:flex;flex-direction:column;gap:var(--s-2)}\n.ls5-fix{display:flex;gap:var(--s-3);justify-content:center}\n.mmb.ls5-fb{min-width:64px;min-height:56px;font-size:var(--fs-5);font-weight:700}\n.choices.ls5-sents{grid-template-columns:1fr}\n.choices.ls5-sents .ch{font-size:var(--fs-4);font-weight:700;justify-content:flex-start;text-align:left}\n.ls5-tiles{display:flex;flex-wrap:wrap;gap:var(--s-1);justify-content:center;align-items:flex-end;font-size:var(--fs-5);font-weight:700}\n.ls5-tile{background:var(--surface-2);border-radius:var(--r-chip);padding:0 var(--s-2);color:var(--ink)}\n.ls5-tag{font-size:var(--fs-2);font-weight:700;color:var(--read-shade);background:var(--read-tint);border-radius:var(--r-chip);padding:0 var(--s-2)}\n.ls5-two{display:flex;gap:var(--s-2);justify-content:center}\n.lslots.ls5-nb .ls{background:var(--surface-2)}\n@media (max-width:420px){.ls5-card.ls5-big{font-size:var(--fs-6)}.ls5-st{font-size:var(--fs-3)}.ls5-sent{font-size:var(--fs-4)}.ls5-card{min-width:64px;min-height:64px;font-size:var(--fs-4)}}\n/* STORIES-7: the story reader (52x-story7.js, part teachrd). Tokens only. Every word is a 48 px button (a tap says it); the word\n   being read is lit (.st7-on: a thick ring and a tint, no movement, so reduced motion and Calm mode need nothing more). Phone: the\n   picture over the words; wide and low (1024x600): the picture beside them. */\n.st7-shelf,.st7-story,.st7-quiz,.st7-end{padding:var(--s-3) var(--s-4) var(--s-6)}\n.st7-tip{margin:var(--s-2) auto var(--s-3);max-width:44em;text-align:center;font-size:var(--fs-3);line-height:var(--lh-3);color:var(--ink-2)}\n.st7-sg{margin:0 auto var(--s-4);max-width:60em}\n.st7-sh{display:flex;align-items:center;gap:var(--s-2);margin:0 0 var(--s-2);font-size:var(--fs-4);line-height:var(--lh-4);color:var(--read-shade)}\n.st7-sh .ic{flex:none;color:var(--read)}\n.st7-sg.lock .st7-sh{color:var(--ink-2)}\n.st7-sg.lock .st7-sh .ic{color:var(--ink-3)}\n.st7-lk{margin:0;font-size:var(--fs-3);line-height:var(--lh-3);color:var(--ink-2)}\n.st7-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:var(--s-2)}\n.btn.st7-card{flex-direction:column;justify-content:center;gap:var(--s-1);min-height:120px;padding:var(--s-2);text-align:center;font-size:var(--fs-3);line-height:var(--lh-3)}\n.st7-cp{display:block;width:64px;height:64px}\n.st7-page{display:flex;flex-direction:column;align-items:center;gap:var(--s-3);margin:0 auto;max-width:60em}\n.st7-pic{width:112px;height:112px;flex:none}\n.st7-pic .art{display:block;width:100%;height:100%}\n.st7-body{width:100%}\n.st7-t,.st7-txt{display:flex;flex-wrap:wrap;align-items:center;gap:0 var(--s-1);margin:0}\n.st7-t{justify-content:center;margin-bottom:var(--s-2)}\n.st7-w{display:inline-flex;align-items:center;justify-content:center;min-width:48px;min-height:48px;padding:0 var(--s-1);border:0;border-radius:var(--r-chip);\n  background:transparent;color:var(--ink);font:inherit;font-family:var(--font-body);font-size:var(--fs-5);line-height:var(--lh-5);cursor:pointer}\n.st7-t .st7-w{font-family:var(--font-display);color:var(--read-shade);font-weight:700}\n.st7-w:focus-visible{outline:3px solid var(--brand);outline-offset:2px}\n.st7-w.st7-on{background:var(--star-tint);color:var(--ink);box-shadow:inset 0 0 0 3px var(--star-shade)}\n.st7-w.st7-past{color:var(--ink)}\n.st7-youmode .st7-w{box-shadow:inset 0 -3px 0 var(--read-tint)}\n.st7-youmode .st7-w.st7-heard{background:var(--read-tint);color:var(--ink)}\n.st7-act{display:flex;flex-wrap:wrap;justify-content:center;gap:var(--s-2);margin:0 auto}\n.st7-act .btn{min-height:var(--tap)}\n.st7-hide{display:none!important}\n.st7-qn{margin:0 0 var(--s-2);text-align:center;font-size:var(--fs-3);line-height:var(--lh-3);color:var(--ink-2)}\n.st7-qp{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:var(--s-2);margin:0 auto var(--s-4);max-width:40em}\n.st7-qt{margin:0;font-size:var(--fs-5);line-height:var(--lh-5);text-align:center;color:var(--ink)}\n.st7-quiz .inp{max-width:40em;margin:0 auto}\n.choices.st7-ch .ch{min-height:96px}\n.st7-end{display:flex;flex-direction:column;align-items:center;gap:var(--s-3);text-align:center}\n.st7-big{margin:0;font-family:var(--font-display);font-size:var(--fs-5);line-height:var(--lh-5);color:var(--read-shade)}\n@media (min-width:700px) and (max-height:700px){\n  .st7-page{flex-direction:row;align-items:flex-start}\n  .st7-pic{width:150px;height:150px}\n  .st7-t{justify-content:flex-start}\n  .st7-story{padding-top:var(--s-2)}\n  .st7-tip{margin:var(--s-2) auto}\n}\n";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)
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
  "sent2": {"idea":"Read each word, then the whole sentence.","beats":{"remember":["Do you remember this? Listen to the first sound."],"explore":["Let's sort the pictures. Listen to the start."],"name":["{a} and {b} both start with {letter}.","Read each word, then the whole sentence."],"together":["Look at the picture. Build {word} with me.","Listen to {word}. Which word matches the picture?","Read the word. Then find its picture."],"check":["My turn. Check me!","I built {ans}. Am I right?"],"show":["The candy shop needs signs. Read each one!"]},"reasons":{"first":["Oops. I read the first sound wrong."],"last":["Oops. I read the last sound wrong."],"mid":["Oops. I read the middle sound wrong."],"blend":["Oops. I left out a letter of the blend."]},"home":"Ask {name}: \"Can you read me a sentence from a book?\""},
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
// AUDIT-READ: ee and ea (tree, leaf) sound the same too, and so does the end of bus and fox (x is /ks/)
const LS4_SAME = {team2: [['ou', 'ow']], team: [['ee', 'ea']], last: [['s', 'x']]};
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
    const o2 = [...new Set(from.concat(ls4Shuf(r, pool2)))].filter(x => x !== c && !(c == 'c' && x == 'k') && !(c == 'k' && x == 'c')
      && !(key == 'last' && ls4Same('last', c, x))); // AUDIT-READ: never s beside x (fox ends in the sound of s too)
    return o2.slice(0, n);
  };
  const pics = (w, n, r) => {
    const c = LS4_KEY[key](w), alt = ls4Shuf(r, okL().filter(x => LS4_KEY[key](x) !== c && !(c == 'c' && LS4_KEY[key](x) == 'k')));
    const out = [];
    // AUDIT-READ: skipped after the shuffle (every other draw keeps its seed): a word that ends in the same sound (bus beside fox)
    for (const x of alt) if (out.length < n - 1 && !out.some(y => LS4_KEY[key](y) == LS4_KEY[key](x)) && !(key == 'last' && ls4Same('last', c, LS4_KEY[key](x)))) out.push(x);
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
    return near.concat(rest).filter(x => !picSame(w, x)).slice(0, n - 1); // AUDIT-READ: never a look-alike picture (cap and hat, box and gift)
  };
  const bugOf = (w, xs) => { const b = {}; for (const x of xs) { const c = ls4Code(w, x); if (c) (b[c] = b[c] || []).push(x); } return b; };
  // WORDS-READ (E3): the road sentence only for animals and road vehicles, and never "hand" as the word of a sentence (genSent's rules)
  const sentence = (w, r) => ((T, t) => (typeof sentTpl == 'function' ? sentTpl(T, t, w) : t))(LS4_T[g >= 1 ? 1 : 0], ls4Pick(r, LS4_T[g >= 1 ? 1 : 0])).replace('{a}', (typeof SENT_ART != 'undefined' && SENT_ART[w]) || art(w)).replace('{w}', w);
  D.q = (st, r) => {
    const w = ls4Pick(r, st == 3 && show != 'build' ? good().filter(x => x != 'hand') : good()), cs = ls4Shuf(r, coded(w)), sl = {word: w}, hint = {k: 'text', s: `Say it slowly: ${w}. One sound at a time.`};
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
/* ---------- STORIES-7 (BEST-APP roadmap 7): the decodable mini-stories (part teachrd) ----------
   DRAFTED, pending owner approval: docs/drafts/STORIES7-READ.md has every story, its words and its questions, and the status line
   that turns the stories on (STORY7_ON, 42c-story7on.js, built by tools/build.py). Until then no child sees any of this.
   ST7.stages  the phonics stages in reading-map order: id (tools/decode.js STAGES) and the stop the stage follows (its Stories stop
               on the map stands right after it)
   ST7.list    the stories: id, st (stage), t (title), pic (a drawing of ART: 16-art-a.js, src/data/d-art-*.js), s (3 to 6 short
               sentences), q (1 or 2 picture questions: [question, the right picture, [two other pictures]])
   Every word of every title and sentence uses only the letter-sound patterns taught up to its stage, or a sight word of a Sight Words
   stop before it on the map: tools/decode.js checks this, and tools/test.js STORIES-7 runs it on every story.
   None of the themes the parent ruled out (CONTENT-01), no brands, no real characters. The answer of a question is a word of its story; the other two
   pictures are not in the story, so exactly one choice is right. */
const ST7 = {
  stages: [
    {id: 'cvc', stop: 'pic1'},
    {id: 'blend', stop: 'pic2'},
    {id: 'digraph', stop: 'sound4'},
    {id: 'silente', stop: 'pic3'},
    {id: 'team', stop: 'pic4'},
    {id: 'rvowel', stop: 'pic5'},
    {id: 'team2', stop: 'pic6'},
  ],
  list: [
    // Letter Meadow (K), after Picture Words: short vowels, one consonant each side
    {id: 'cvc-1', st: 'cvc', t: 'Pig in the Mud', pic: 'pig', s: ['Pig is in the mud.', 'Pig can sit in the mud.', 'Pig can dig in the mud.', 'A cat ran up.', '“Not me!” said the cat.'],
      q: [['Who is in the mud?', 'pig', ['dog', 'hen']], ['Who ran up?', 'cat', ['duck', 'cow']]]},
    {id: 'cvc-2', st: 'cvc', t: 'The Big Red Bus', pic: 'bus', s: ['Gus has a big red bus.', 'A cat gets on.', 'A dog gets on.', 'A big pig gets on.', 'The bus can not go!'],
      q: [['What does Gus have?', 'bus', ['car', 'truck']], ['Who gets on last?', 'pig', ['cow', 'duck']]]},
    {id: 'cvc-3', st: 'cvc', t: 'Hen and the Egg', pic: 'hen', s: ['Hen has an egg.', 'Hen sits and sits.', 'Tap, tap, tap!', 'Up pops a little hen.', 'Hen hugs the little hen.'],
      q: [['What does Hen sit on?', 'egg', ['ball', 'hat']]]},
    {id: 'cvc-4', st: 'cvc', t: 'Max the Fox', pic: 'fox', s: ['Max is a fox.', 'Max has a big red hat.', 'Max sets the hat on a cat.', 'Max sets the hat on a pig.', 'It is a hat for a fox!'],
      q: [['Who is Max?', 'fox', ['dog', 'cow']], ['What does Max have?', 'hat', ['cup', 'sock']]]},
    {id: 'cvc-5', st: 'cvc', t: 'The Bug and the Rug', pic: 'bug', s: ['A red bug sat on a rug.', 'A big dog sat on the rug.', 'Run, bug, run!', 'The bug hid in a cup.', 'The dog can not see it.'],
      q: [['Where did the bug hide?', 'cup', ['box', 'hat']], ['Who sat on the rug too?', 'dog', ['cat', 'pig']]]},
    {id: 'cvc-6', st: 'cvc', t: 'Fun in the Sun', pic: 'sun', s: ['The sun is up.', 'Kim and Dad sit in the sun.', 'Dad has a hat on.', 'Kim has a hat on.', 'The dog has a hat on!', 'Kim, Dad and the dog nap.'],
      q: [['What is up in the sky?', 'sun', ['moon', 'star']], ['Who has a hat on too?', 'dog', ['cat', 'hen']]]},
    // Candy Canyon (1st), after Blends: fr, st, nd, mp ..., ng and nk
    {id: 'blend-1', st: 'blend', t: 'Frog on a Log', pic: 'frog', s: ['A frog sits on a log.', 'A crab swims past.', '“Can you jump?” the frog asks.', '“Not me!” the crab yells.', 'The frog jumps into the pond.', 'Plop!'],
      q: [['Who sits on the log?', 'frog', ['fish', 'bird']], ['Who swims past?', 'crab', ['duck', 'turtle']]]},
    {id: 'blend-2', st: 'blend', t: 'The Crab Band', pic: 'crab', s: ['Brad the crab has a red drum.', 'Bam! Bam! Bam!', 'A frog hops up.', 'A bug hops up.', 'They all clap and stomp.', 'It is a crab band!'],
      q: [['What does Brad have?', 'drum', ['bell', 'guitar']], ['Who is Brad?', 'crab', ['fish', 'turtle']]]},
    {id: 'blend-3', st: 'blend', t: 'A Gift for Gran', pic: 'gift', s: ['Fran has a gift for Gran.', 'The gift is in a big box.', 'Is it a mug?', 'Gran lifts the lid.', 'It is a drum!', 'Bam, bam, bam!'],
      q: [['What is in the box?', 'drum', ['bell', 'ball']]]},
    {id: 'blend-4', st: 'blend', t: 'The Wet Tent', pic: 'tent', s: ['Brent and Dad set up a tent.', 'They get in the tent.', 'Drip, drop, drip!', 'The tent gets wet.', 'Brent and Dad still grin.', 'It is fun to camp!'],
      q: [['Where do Brent and Dad sit?', 'tent', ['house', 'car']]]},
    {id: 'blend-5', st: 'blend', t: 'Glen Can Do It', pic: 'hand', s: ['Glen can do a handstand.', 'His legs go up.', 'His hands go flat.', 'Glen spins.', 'Flop!', 'Glen lands on the grass and grins.'],
      q: [['What goes flat on the grass?', 'hand', ['foot', 'ear']]]},
    {id: 'blend-6', st: 'blend', t: 'Spill!', pic: 'milk', s: ['Stef has milk in a cup.', 'The cat jumps up on the desk.', 'Spill!', 'The milk drips on the rug.', 'The cat drinks it up fast.', 'Stef grins at the cat.'],
      q: [['What does Stef have in the cup?', 'milk', ['water', 'apple']], ['Who drinks it up?', 'cat', ['dog', 'fish']]]},
    // Candy Canyon (1st), after Letter Teams: sh ch th wh ck
    {id: 'digraph-1', st: 'digraph', t: 'The Fish Wish', pic: 'fish', s: ['Seth has a fish.', 'The fish is in a dish.', 'The fish looks at the big pond.', '“I wish I had a pond,” said the fish.', 'Seth and Mom let it swim in the pond.', 'Splash!'],
      q: [['What does Seth have?', 'fish', ['bird', 'cat']], ['What is the fish in at the start?', 'dish', ['cup', 'box']]]},
    {id: 'digraph-2', st: 'digraph', t: 'Chip the Chick', pic: 'chick', s: ['Chip is a little chick.', 'Chip pecks at a bug.', 'Chip pecks at a nut.', 'Chip pecks at Dad’s sock!', '“Stop that, Chip!” said Dad.'],
      q: [['Who is Chip?', 'chick', ['duck', 'owl']], ['What does Chip peck on Dad?', 'sock', ['shoes', 'hat']]]},
    {id: 'digraph-3', st: 'digraph', t: 'Josh and the Ship', pic: 'ship', s: ['Josh has a red ship.', 'The ship is in the tub.', 'Josh adds a shell.', 'The shell sits on the ship.', 'Then the ship tips!', 'Splash!'],
      q: [['What sits on the ship?', 'shell', ['fish', 'ball']], ['Where is the ship?', 'tub', ['bed', 'box']]]},
    {id: 'digraph-4', st: 'digraph', t: 'Thump in the Shed', pic: 'duck', s: ['Thump! Thud!', 'What is in the shed?', 'Beth and Chad check.', 'It is not a moth.', 'It is a duck with a drum!'],
      q: [['What is in the shed?', 'duck', ['cat', 'horse']], ['What does the duck have?', 'drum', ['bell', 'ball']]]},
    {id: 'digraph-5', st: 'digraph', t: 'No Bun for Whit', pic: 'dog', s: ['Whit packs a bun for lunch.', 'He sits on a bench.', 'His dog sniffs the bun.', 'Munch, munch!', 'No bun for Whit!'],
      q: [['Who gets the bun?', 'dog', ['cat', 'bird']]]},
    {id: 'digraph-6', st: 'digraph', t: 'The Thin Moth', pic: 'lamp', s: ['A thin moth sits on a lamp.', 'Click!', 'The lamp is on.', 'The moth spins and spins.', 'Click!', 'The lamp is off, and the moth can rest.'],
      q: [['What does the moth sit on?', 'lamp', ['chair', 'door']]]},
    // Ocean Reef (1st), after Silent E
    {id: 'silente-1', st: 'silente', t: 'Kate and the Kite', pic: 'kite', s: ['Kate has a red kite.', 'Kate and Mike run up a hill.', 'The kite rises up, up, up!', 'Then it dives.', 'It lands on Mike’s nose!', 'Mike smiles.'],
      q: [['What does Kate have?', 'kite', ['balloon', 'ball']], ['Where does the kite land?', 'nose', ['hand', 'foot']]]},
    {id: 'silente-2', st: 'silente', t: 'A Cake for Mom', pic: 'cake', s: ['Jake bakes a cake for Mom.', 'He puts grapes on top.', 'The dog wakes up.', 'It sniffs the cake.', 'Then it takes a bite!', 'Jake has to bake a new cake.'],
      q: [['What does Jake put on top?', 'grapes', ['banana', 'strawberry']], ['Who takes a bite?', 'dog', ['cat', 'mouse']]]},
    {id: 'silente-3', st: 'silente', t: 'Pete Rides His Bike', pic: 'bike', s: ['Pete rides his bike to the lake.', 'He rides past a cat on a gate.', 'The cat smiles at Pete.', 'Pete smiles at the cat.', 'Then Pete rides home fast!'],
      q: [['What does Pete ride?', 'bike', ['car', 'bus']], ['Who smiles at Pete?', 'cat', ['dog', 'horse']]]},
    {id: 'silente-4', st: 'silente', t: 'Duke and the Bone', pic: 'bone', s: ['Rose has a dog.', 'His name is Duke.', 'Duke hides his bone in a hole.', 'Then he can not find it!', 'Rose and Duke dig and dig.', 'At last, there it is!'],
      q: [['What does Duke hide?', 'bone', ['ball', 'sock']]]},
    {id: 'silente-5', st: 'silente', t: 'Dave and the Plane', pic: 'plane', s: ['Dave has a white plane.', 'Zip!', 'It glides up and up.', 'Then it glides down.', 'It lands on a cake at the picnic!', 'Mom and Dave smile at the plane.'],
      q: [['What does Dave have?', 'plane', ['car', 'rocket']], ['Where does the plane land?', 'cake', ['hat', 'box']]]},
    {id: 'silente-6', st: 'silente', t: 'The Dice Game', pic: 'dice', s: ['Lin and Gabe play a game with dice.', 'Lin tosses five and five.', 'Gabe tosses six and six!', '“I win!” yells Gabe.', 'Lin smiles.', '“Let us play again!”'],
      q: [['What do Lin and Gabe play with?', 'dice', ['ball', 'crayon']]]},
    // Space Station (2nd), after Vowel Teams: ai ay ee ea oa
    {id: 'team-1', st: 'team', t: 'The Sheep in the Boat', pic: 'boat', s: ['A sheep gets in a boat.', 'The boat floats on the sea.', 'A big wave rocks the boat.', 'The sheep keeps eating oats.', 'What a brave sheep!'],
      q: [['Who is in the boat?', 'sheep', ['cow', 'horse']], ['What is the sheep in?', 'boat', ['car', 'train']]]},
    {id: 'team-2', st: 'team', t: 'A Wet Day', pic: 'coat', s: ['It rains and rains.', 'Gail has a red coat.', 'Dean has a green coat.', 'They jump and splash in the rain.', 'Then the sun peeks out.', 'What a fun day!'],
      q: [['What does Gail have on?', 'coat', ['shirt', 'dress']], ['What peeks out?', 'sun', ['moon', 'cloud']]]},
    {id: 'team-3', st: 'team', t: 'Bea the Bee', pic: 'bee', s: ['Bea the bee sleeps on a leaf.', 'The leaf is in a tree.', 'Then the leaf drops.', 'Bea wakes up on a sheep!', 'The sheep eats the leaf.', 'Bea zips away.'],
      q: [['What does Bea sleep on?', 'leaf', ['flower', 'apple']], ['Where does Bea wake up?', 'sheep', ['cow', 'horse']]]},
    {id: 'team-4', st: 'team', t: 'Jay and the Train', pic: 'train', s: ['Jay and Dad wait for the train.', 'Here it is!', 'They get on and sit in a seat.', 'The train speeds past green trees.', 'Jay waves at a sheep.', 'The sheep just eats.'],
      q: [['What do Jay and Dad ride?', 'train', ['bus', 'plane']], ['Who does Jay wave at?', 'sheep', ['cow', 'horse']]]},
    {id: 'team-5', st: 'team', t: 'Ray and the Soap', pic: 'soap', s: ['Ray has mud on his feet.', 'Mom hands him the soap.', 'Scrub, scrub, scrub!', 'The soap slips and sails into the pail.', 'Splash!', 'Now Ray has clean feet.'],
      q: [['What slips?', 'soap', ['shoes', 'cup']], ['What has mud on it?', 'feet', ['nose', 'ear']]]},
    {id: 'team-6', st: 'team', t: 'A Goat on the Road', pic: 'road', s: ['Neal and Gran go on a road trip.', 'They eat peanuts and sing.', 'Then a goat sits on the road!', 'Beep, beep!', 'The goat just sits.', 'So Neal and Gran eat peanuts and wait.'],
      q: [['Where does the goat sit?', 'road', ['beach', 'school']]]},
    // Space Station (2nd), after Bossy R: ar or er ir ur
    {id: 'rvowel-1', st: 'rvowel', t: 'A Star for Bart', pic: 'star', s: ['Bart sits in the yard after dark.', 'He looks up and sees the first star.', 'Bart makes a wish for a pet shark.', 'The next day, Mom gets him a fish.', 'It is a start!'],
      q: [['What does Bart see?', 'star', ['moon', 'sun']], ['What does Mom get Bart?', 'fish', ['dog', 'turtle']]]},
    {id: 'rvowel-2', st: 'rvowel', t: 'Fern the Bird', pic: 'bird', s: ['Fern is a bird.', 'She has a nest in a birch tree.', 'Fern chirps to her three chicks.', 'The chicks chirp back.', 'Chirp, chirp, chirp!', 'It is a bird song.'],
      q: [['Who is Fern?', 'bird', ['butterfly', 'bee']], ['Where is the nest?', 'tree', ['house', 'car']]]},
    {id: 'rvowel-3', st: 'rvowel', t: 'Corn on the Farm', pic: 'storm', s: ['Norm has a farm with lots of corn.', 'Then a storm starts.', 'Norm runs to the barn.', 'Thunder!', 'The corn gets lots of rain.', 'Now the corn is up to Norm’s chin!'],
      q: [['What comes to the farm?', 'storm', ['snowman', 'rainbow']]]},
    {id: 'rvowel-4', st: 'rvowel', t: 'The Jam Star', pic: 'shirt', s: ['Kirk has a shirt with a star on it.', 'At lunch, he drips jam on the shirt.', 'Kirk and Mom scrub and scrub.', 'The jam spot is still there.', 'So Mom turns it into a jam star.', 'Now Kirk has two stars!'],
      q: [['What does Kirk drip jam on?', 'shirt', ['pants', 'hat']], ['What is on the shirt?', 'star', ['moon', 'sun']]]},
    {id: 'rvowel-5', st: 'rvowel', t: 'The Car Race', pic: 'car', s: ['Mark and Herb have a car race.', 'Herb’s car is fast.', 'Mark’s car is faster.', 'Then Mark’s car tips over!', 'Herb stops his car to help him.', 'They cross the line side by side.'],
      q: [['What do Mark and Herb race?', 'car', ['bike', 'train']]]},
    {id: 'rvowel-6', st: 'rvowel', t: 'The Fort', pic: 'torch', s: ['Barb and Kurt make a fort.', 'They hang a sheet on top.', 'They tell jokes by a torch.', 'Then the dog barks and jumps in!', 'The fort tips over.', 'Barb, Kurt and the dog are in a heap.'],
      q: [['What is in the fort?', 'torch', ['lamp', 'crayon']], ['Who jumps in?', 'dog', ['cat', 'rabbit']]]},
    // Word Workshop (2nd), after Vowel Teams 2: oo ou ow oi oy aw ew
    {id: 'team2-1', st: 'team2', t: 'Brook and the Moon', pic: 'moon', s: ['Brook looks out at the moon.', 'It is big and round.', 'She holds up her spoon.', '“I will scoop up the moon!”', 'Brook and Mom laugh and laugh.'],
      q: [['What does Brook hold up?', 'spoon', ['cup', 'pencil']], ['What does Brook look at?', 'moon', ['sun', 'star']]]},
    {id: 'team2-2', st: 'team2', t: 'A Mouse in the House', pic: 'mouse', s: ['A brown mouse lives in our house.', 'One day it sneaks out of its hole.', 'It finds a crust of toast on the couch.', '“Wow!” it shouts.', '“A feast!”', 'Then it sees the cat and zooms home!'],
      q: [['Who lives in the house?', 'mouse', ['rabbit', 'bird']], ['Who does the mouse see?', 'cat', ['dog', 'owl']]]},
    {id: 'team2-3', st: 'team2', t: 'The Cow and the Owl', pic: 'owl', s: ['A cow and an owl live on a farm.', 'The cow eats grass all day.', 'The owl sleeps all day.', 'When the moon comes up, the owl hoots and hoots.', 'The cow can not sleep!', 'So now the cow naps in the day, too.'],
      q: [['Who hoots?', 'owl', ['duck', 'frog']], ['Who naps in the day now?', 'cow', ['horse', 'sheep']]]},
    {id: 'team2-4', st: 'team2', t: 'The Toy Boat', pic: 'boat', s: ['Roy has a toy boat.', 'He sails it on the pool.', 'Oops, the boat floats away!', 'Then his dog jumps in with a splash.', 'The dog swims and brings the boat back to Roy.', 'What a good dog!'],
      q: [['What does Roy have?', 'boat', ['car', 'kite']], ['Who brings the boat back?', 'dog', ['cat', 'duck']]]},
    {id: 'team2-5', st: 'team2', t: 'Drew Draws', pic: 'crayon', s: ['Drew likes to draw.', 'He draws a crown.', 'He draws a clown with a red nose.', 'Then he draws a cow that jumps over the moon!', 'Gran tapes them up in her room.'],
      q: [['What does Drew like to do?', 'draw', ['guitar', 'ball']], ['What jumps over the moon?', 'cow', ['sheep', 'horse']]]},
    {id: 'team2-6', st: 'team2', t: 'Scout and the Hawk', pic: 'dog', s: ['Scout is a brown hound.', 'He digs a bone out of the ground.', 'Then a hawk swoops down and grabs it!', 'Scout howls and howls.', 'The hawk drops the bone.', 'Scout has his bone back.'],
      q: [['Who grabs the bone?', 'hawk', ['cat', 'frog']], ['What does Scout dig up?', 'bone', ['ball', 'shoes']]]},
  ],
};
/* ---------- STORIES-7 (BEST-APP roadmap 7): the story reader (part teachrd) ----------
   Gated: STORY7_ON (42c-story7on.js, BUILT from docs/drafts/STORIES7-READ.md) is 0 until the owner approves the stories, their words
   and these screens; with 0 the reading map draws no Stories stop (st7At, 42c-story7.js) and nothing here is ever opened.
   Where a child meets it: a Stories stop on the reading map right after each phonics stop (Picture Words, Blends, Letter Teams,
   Silent E, Vowel Teams, Bossy R, Vowel Teams 2; ST7.stages). It opens with that stop's practice (st7OpenAt) and leads to the shelf
   (ST7.shelf), which lists every stage's stories, the open ones to tap.
   One story (ST7.open):
     Read to me      every word of the title and the story lights up while it is spoken (st7Play). The clock is a timing array,
                     one [start, end] in ms per word (st7Plan): from the story's recording when it has one (ST7A[id].t, with the file
                     ST7A[id].f in audio/story/; REC-198: every story is recorded, src/data/d-story-audio.js), and then the words light
                     on the recording's clock (st7Tick); without a recording (or with recordings off: Tablet voice, no Opus) the
                     clock is estimated from the words and each word is said in turn (its recording, else the tablet's voice; a word
                     waits for the voice to finish, never longer than three times its time).
     Now you read it the words stay still; a tap on a word says it (any time, in any mode); "I read it!" when done.
     Questions       1 or 2 picture questions (KIND.choice, the round's choice buttons, 49-kinds.js): a wrong picture is marked and
                     greyed, the child tries again; then the end card (Read it again, More stories).
   Nothing is saved: no stars, no game time, no change to the map. ST7R.rate speeds the read-along clock (tools/smoke.js).
   REC-198 (owner decision 2026-11-27): the questions, the sentences these screens say aloud and every word (a tap) are recorded too, in the
   pet's teacher voice (ST7S, src/data/d-story-audio.js): st7Say plays them, else say() as before. */
const ST7W = { // every sentence these screens show or say: proposed wording in docs/drafts/STORIES7-READ.md (tools/test.js STORIES-7)
  shelf: 'Stories',
  shelfTip: 'Pick a story. I read it to you, then you read it!',
  locked: 'Opens with {stop}',
  read: 'Read to me',
  stop: 'Stop',
  you: 'Now you read it',
  done: 'I read it!',
  tipStart: 'Tap Read to me. Each word lights up as I say it.',
  tipRead: 'Look at each word as I say it.',
  tipAfter: 'Now you read it!',
  tipYou: 'Read the story. Tap a word if you need help.',
  qn: 'Question {n} of {all}',
  hear: 'Hear it',
  right: 'Yes! That is right.',
  wrong: 'Not that one. Look at the story again.',
  end: 'You read {title}!',
  again: 'Read it again',
  more: 'More stories',
};
const ST7R = {rate: 1, gen: 0, mode: '', st: null, ws: null, plan: null, qi: 0};
const st7F = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in o ? o[k] : m));
const st7Idx = stop => NODES.read.findIndex(n => nid(n) == stop);
const st7Name = stop => { const i = st7Idx(stop); return i >= 0 ? NODES.read[i].t : stop; };
const st7Ok = stop => { const i = st7Idx(stop); return i >= 0 && st7OpenAt(i); };
const st7Get = id => ST7.list.find(s => s.id == id);
// the words of a story, title first: {w: as shown, k: as said, s: -1 for the title or the sentence's index, end: last of its line}
function st7Words(st) {
  const out = [];
  [st.t].concat(st.s).forEach((line, li) => {
    const ts = line.split(/\s+/).filter(Boolean);
    ts.forEach((w, j) => out.push({w, k: w.replace(/[^A-Za-z'’]/g, '').replace(/’/g, "'"), s: li - 1, end: j == ts.length - 1}));
  });
  return out;
}
// the read-along clock: [start, end] in ms for each word. A recording's own times when they fit its words, else an estimate:
// 320 ms and 60 ms a letter per word, 140 ms between words, 500 ms after a sentence, 700 ms after the title
function st7Plan(st) {
  const ws = st7Words(st), rec = typeof ST7A != 'undefined' && ST7A[st.id];
  if (rec && Array.isArray(rec.t) && rec.t.length == ws.length) return rec.t.map(x => [+x[0], +x[1]]);
  let t = 0;
  return ws.map(w => { const d = 320 + 60 * w.k.length, a = [t, t + d]; t += d + (w.end ? (w.s < 0 ? 700 : 500) : 140); return a; });
}
// the word lit at ms (for a recording's clock: its currentTime); -1 between words
const st7Lit = (plan, ms) => plan.findIndex(x => ms >= x[0] && ms < x[1]);
// the picture choices of question k of a story: always the same order for the same story (no random draw)
function st7Q(st, k) {
  const q = st.q[k], all = [q[1]].concat(q[2]), r = [...(st.id + k)].reduce((a, c) => a + c.charCodeAt(0), 0) % all.length;
  const ch = all.slice(r).concat(all.slice(0, r));
  return {kind: 'choice', cls: 'pics st7-ch', ans: q[1], say: q[0], choices: ch.map(w => ({l: picFor(w), v: w, h: true, w}))};
}
const st7Btns = ws => ws.map((w, i) => `<button class="st7-w" data-i="${i}">${esc(w.w)}</button>`);
// REC-198: the recordings play where say() would play a recording (not with ENA.off, the Tablet voice choice, or where Opus cannot play)
const st7RecOk = () => !ENA.off && !ESA.off && cheerMode() != 'tts' && esaOk();
// say a line (or, with word, a word of the stories) from its recording in ST7S when there is one, else with say(); q: after what is playing
function st7Say(t, btn, word, q) {
  const M = typeof ST7S != 'undefined' ? ST7S : null, f = M && st7RecOk() && (word ? M.w[String(t).toLowerCase()] : M.lines[esKey(t)]);
  if (!f || ESA.bad[f]) return say(t, btn, null, q);
  const it = {a: [[f, 0]], i: 0, t: String(t), ts: [String(t)], btn, tch: 1, m: M};
  if (cheerBusy()) { ESA.q = [it]; return; } // a cheer is not cut off (as say)
  if (q && speakBusy()) { ESA.q.push(it); return; }
  if (!q) hush();
  esaPlay(it);
}
// a line for a child who cannot read yet (as nrSay, 12-speech.js), from its recording
const st7Nr = (t, sel) => { if (t && nrOn()) setTimeout(() => { if (nrOn() && (!sel || $(sel))) st7Say(t, null, 0, 1); }, 500); };

ST7.shelf = function (stop) {
  st7Halt();
  const card = st => `<button class="btn st7-card" data-st="${esc(st.id)}"><span class="st7-cp" aria-hidden="true">${picArt(st.pic, 64)}</span><span>${esc(st.t)}</span></button>`;
  const secs = ST7.stages.map(sg => {
    const ok = st7Ok(sg.stop), list = ST7.list.filter(s => s.st == sg.id), nm = st7Name(sg.stop);
    return `<section class="st7-sg${ok ? '' : ' lock'}" data-stop="${esc(sg.stop)}"><h2 class="st7-sh">${ico(ok ? 'skill-story' : 'lock', 28)}<span>${esc(nm)}</span></h2>`
      + (ok ? `<div class="st7-grid">${list.map(card).join('')}</div>` : `<p class="st7-lk">${esc(st7F(ST7W.locked, {stop: nm}))}</p>`) + '</section>';
  }).join('');
  view(`<div class="top tbar s-read">${UI.ibtn('back', 'Back', {size: 'sm', id: 'back'})}<div class="ttl">${ico('skill-story', 30)}<span>${esc(ST7W.shelf)}</span></div></div>`
    + `<div class="scroll st7-shelf" id="st7s"><p class="sub st7-tip">${esc(ST7W.shelfTip)}</p>${secs}</div>`);
  $('#back').onclick = () => { SFX.click(); pathMap('read'); };
  $$('.st7-card').forEach(b => b.onclick = () => { SFX.whoosh(); ST7.open(b.dataset.st); });
  const sec = stop && $(`.st7-sg[data-stop="${stop}"]`);
  if (sec && sec.scrollIntoView) sec.scrollIntoView({block: 'start'});
  st7Nr(ST7W.shelfTip, '#st7s');
};

ST7.open = function (id) {
  const st = st7Get(id);
  if (!st) return ST7.shelf();
  st7Halt();
  const ws = st7Words(st), b = st7Btns(ws), nt = st.t.split(/\s+/).filter(Boolean).length, sg = ST7.stages.find(x => x.id == st.st);
  Object.assign(ST7R, {st, ws, plan: st7Plan(st), mode: ''});
  view(`<div class="top tbar s-read">${UI.ibtn('back', 'Back', {size: 'sm', id: 'back'})}<div class="ttl">${ico('skill-story', 30)}<span>${esc(sg ? st7Name(sg.stop) : ST7W.shelf)}</span></div></div>`
    + `<div class="scroll st7-story" id="st7"><div class="st7-page"><div class="st7-pic" aria-hidden="true">${picArt(st.pic, '100%')}</div>`
    + `<div class="st7-body"><h2 class="st7-t">${b.slice(0, nt).join(' ')}</h2><p class="st7-txt">${b.slice(nt).join(' ')}</p></div></div>`
    + `<p class="st7-tip" id="st7tip">${esc(ST7W.tipStart)}</p>`
    + `<div class="st7-act">${UI.btn(ST7W.read, {kind: 'primary', size: 'lg', icon: 'speak', id: 'st7read'})}${UI.btn(ST7W.you, {size: 'lg', icon: 'eye', id: 'st7you'})}`
    + `${UI.btn(ST7W.done, {kind: 'primary', size: 'lg', icon: 'check', id: 'st7done', cls: 'st7-hide'})}</div></div>`);
  $('#back').onclick = () => { SFX.click(); ST7.shelf(sg && sg.stop); };
  $('#st7read').onclick = () => st7Play();
  $('#st7you').onclick = () => st7You();
  $('#st7done').onclick = () => { st7Halt(); SFX.whoosh(); st7Quiz(0); };
  $$('.st7-w').forEach(w => w.onclick = () => st7Tap(+w.dataset.i));
  st7Nr(ST7W.tipStart, '#st7');
};
function st7Tip(t, sayIt) { const e = $('#st7tip'); if (e) e.textContent = t; if (sayIt) st7Say(t); }
function st7Light(i) {
  for (const e of $$('.st7-w.st7-on')) e.classList.remove('st7-on');
  const e = $(`.st7-w[data-i="${i}"]`);
  if (!e) return;
  e.classList.add('st7-on');
  for (const x of $$('.st7-w')) x.classList.toggle('st7-past', +x.dataset.i < i);
  if (e.scrollIntoView) e.scrollIntoView({block: 'nearest'});
}
function st7Label(t) { const b = $('#st7read span'); if (b) b.textContent = t; }
// stop the read-along (a new screen, Stop, Now you read it, a word tapped)
function st7Halt(quiet) {
  const was = ST7R.mode == 'play';
  ST7R.gen++;
  if (ST7R.au) { ST7R.au = null; try { hush(); } catch (e) {} } // a story recording plays through the speech module (storyPlay)
  if (was) { try { hush(); } catch (e) {} }
  if (ST7R.mode == 'play') ST7R.mode = '';
  for (const e of $$('.st7-w.st7-on')) e.classList.remove('st7-on');
  for (const e of $$('.st7-w.st7-past')) e.classList.remove('st7-past');
  st7Label(ST7W.read);
  if (was && quiet === true) st7Tip(ST7W.tipStart);
}
// Read to me: one word at a time on the clock of st7Plan, the tablet's voice saying each word (a recording, when there is one)
function st7Play() {
  if (ST7R.mode == 'play') return st7Halt(true);
  st7Halt();
  const g = ST7R.gen, ws = ST7R.ws, plan = ST7R.plan, st = ST7R.st, rec = typeof ST7A != 'undefined' && ST7A[st.id];
  ST7R.mode = 'play';
  $('#st7').classList.remove('st7-youmode');
  $('#st7done').classList.add('st7-hide');
  st7Label(ST7W.stop);
  st7Tip(ST7W.tipRead);
  SFX.pop(1);
  if (rec && rec.f && rec.t && rec.t.length == ws.length && st7RecOk() && !ESA.bad[rec.f]) {
    // a recording (REC-198: audio/story/<file>), played by the speech module (storyPlay, 12-speech.js: ducks the music, stops on hush, waits
    // while the app is hidden): the words follow its clock, every word once and in order (st7Tick). A file that does not play: the
    // word-by-word reading on the estimated clock
    const it = storyPlay('audio/story/', rec.f, st.t, ST7R.rate || 1, () => {
      if (g !== ST7R.gen) return;
      ST7R.au = null; ST7R.plan = st7Plan({id: '', t: st.t, s: st.s}); st7Words1(g, 0);
    });
    if (it) { if (!it.failed) { ST7R.au = it; ST7R.lit = -1; st7Tick(g, it); } return; } // failed at once: fail() reads on
  }
  const t0 = plan[0] ? plan[0][0] / (ST7R.rate || 1) : 0; // the first word on its time (a recording's clock starts after its lead-in)
  if (t0 > 0) setTimeout(() => st7Words1(g, 0), t0); else st7Words1(g, 0);
}
// the read-along on a recording's clock: each tick lights the next word once its start time is reached (one word a tick, so none is
// skipped); after the recording ends, the words left light in turn, then the end. Stopped from outside (hush): the reading stops
function st7Tick(g, it) {
  if (g !== ST7R.gen || ST7R.au !== it) return;
  if (storyGone(it)) return st7Halt(true);
  const plan = ST7R.plan, ms = it.done ? Infinity : storyMs(it);
  if (ST7R.lit + 1 < plan.length && plan[ST7R.lit + 1][0] <= ms) st7Light(++ST7R.lit);
  else if (it.done && ST7R.lit + 1 >= plan.length) { ST7R.au = null; return st7End(); }
  setTimeout(() => st7Tick(g, it), 25);
}
function st7Words1(g, i) {
  const ws = ST7R.ws, plan = ST7R.plan, r = ST7R.rate || 1;
  if (g !== ST7R.gen) return;
  if (i >= ws.length) return st7End();
  st7Light(i);
  try { st7Say(ws[i].k, null, 1); } catch (e) {}
  const d = (plan[i][1] - plan[i][0]) / r, gap = ((plan[i + 1] ? plan[i + 1][0] : plan[i][1]) - plan[i][1]) / r, tick = Math.max(10, Math.min(60, d / 4));
  let el = 0;
  const wait = () => {
    if (g !== ST7R.gen) return;
    el += tick;
    let busy = false;
    try { busy = speakBusy(); } catch (e) {}
    if (el >= d && (!busy || el >= 3 * d)) setTimeout(() => st7Words1(g, i + 1), gap);
    else setTimeout(wait, tick);
  };
  setTimeout(wait, tick);
}
function st7End() {
  ST7R.gen++;
  ST7R.mode = '';
  st7Label(ST7W.read);
  for (const e of $$('.st7-w.st7-on')) e.classList.remove('st7-on');
  for (const e of $$('.st7-w')) e.classList.add('st7-past');
  st7Tip(ST7W.tipAfter, true);
  bump('#st7you');
}
// Now you read it: the child reads; a tap on a word says it; I read it! at the end
function st7You() {
  st7Halt();
  ST7R.mode = 'you';
  for (const e of $$('.st7-w')) e.classList.remove('st7-past', 'st7-heard');
  $('#st7').classList.add('st7-youmode');
  const d = $('#st7done');
  d.classList.remove('st7-hide');
  SFX.pop(2);
  st7Tip(ST7W.tipYou, true);
  bump('#st7done');
}
function st7Tap(i) {
  if (ST7R.mode == 'play') st7Halt(true);
  const w = ST7R.ws && ST7R.ws[i], e = $(`.st7-w[data-i="${i}"]`);
  if (!w || !e) return;
  st7Say(w.k, null, 1);
  e.classList.add('st7-heard');
}
// the picture questions, one at a time
function st7Quiz(k) {
  const st = ST7R.st;
  if (!st) return ST7.shelf();
  if (k >= st.q.length) return st7Fin();
  ST7R.qi = k;
  const q = st7Q(st, k);
  view(`<div class="top tbar s-read">${UI.ibtn('back', 'Back', {size: 'sm', id: 'back'})}<div class="ttl">${ico('skill-story', 30)}<span>${esc(st.t)}</span></div></div>`
    + `<div class="scroll st7-quiz" id="st7q"><p class="st7-qn">${esc(st7F(ST7W.qn, {n: k + 1, all: st.q.length}))}</p>`
    + `<div class="st7-qp"><p class="st7-qt">${esc(q.say)}</p>${UI.btn(ST7W.hear, {size: 'sm', icon: 'speak', id: 'st7hear'})}</div>`
    + `<div class="inp">${KIND.choice.render(q)}</div></div>`);
  $$('#st7q .ch').forEach(b => b.setAttribute('aria-label', q.choices[+b.dataset.i].w));
  $('#back').onclick = () => { SFX.click(); ST7.open(st.id); };
  $('#st7hear').onclick = e => st7Say(q.say, e.currentTarget);
  let done = false;
  KIND.choice.bind(q, {}, (v, el) => {
    if (done || !el || el.disabled) return;
    if (String(v) === String(q.ans)) {
      done = true;
      el.classList.add('right');
      SFX.right(k);
      fb(ST7W.right, 'good');
      st7Say(ST7W.right);
      setTimeout(() => { if ($('#st7q')) st7Quiz(k + 1); }, 1300);
    } else {
      el.classList.add('wrong');
      el.disabled = true;
      SFX.wrong();
      fb(ST7W.wrong, 'warn');
      st7Say(ST7W.wrong);
    }
  });
  st7Say(q.say);
}
function st7Fin() {
  const st = ST7R.st, sg = ST7.stages.find(x => x.id == st.st), line = st7F(ST7W.end, {title: st.t});
  view(`<div class="top tbar s-read">${UI.ibtn('back', 'Back', {size: 'sm', id: 'back'})}<div class="ttl">${ico('skill-story', 30)}<span>${esc(ST7W.shelf)}</span></div></div>`
    + `<div class="scroll st7-end" id="st7e"><div class="st7-pic" aria-hidden="true">${picArt(st.pic, '100%')}</div><p class="st7-big">${esc(line)}</p>`
    + `<div class="st7-act">${UI.btn(ST7W.again, {size: 'lg', icon: 'replay', id: 'st7again'})}${UI.btn(ST7W.more, {kind: 'primary', size: 'lg', icon: 'skill-story', id: 'st7more'})}</div></div>`);
  $('#back').onclick = () => { SFX.click(); ST7.shelf(sg && sg.stop); };
  $('#st7again').onclick = () => { SFX.whoosh(); ST7.open(st.id); };
  $('#st7more').onclick = () => { SFX.whoosh(); ST7.shelf(sg && sg.stop); };
  SFX.star();
  say(line);
}
/* ---------- REC-198: the recorded stories of STORIES-7 (BUILT by tools/en-audio.js: never edit by hand; run node tools/en-audio.js --story) ----------
   audio/story/<file> (xAI text to speech, English, the voice luna, speed 0.95, Opus 16 kbps mono), in the part teachrd.
   ST7A[story id] = {f: file, t: [[start, end] in ms, one per word of st7Words], e: 1 when the times are estimated}: 42 stories; word times from speech to text
   timestamps for 42, estimated from the length for 0. ST7S.lines: the questions and the reader's spoken sentences (79);
   ST7S.w: the words, lower case, for a tap on a word (397, none means the tablet's voice). Keys of lines are esKey(text). */
const ST7A={
"cvc-1":{f:"268aed15c33d.ogg",t:[[20,240],[300,360],[381,461],[521,821],[1242,1522],[1662,1742],[1802,1883],[1903,1983],[2023,2323],[2824,3104],[3164,3325],[3445,3605],[3645,3685],[3705,3765],[3805,4106],[4526,4786],[4847,5007],[5107,5287],[5327,5387],[5407,5487],[5527,5808],[6248,6288],[6349,6649],[6729,6929],[6989,7150],[7550,7791],[7871,7971],[8251,8411],[8431,8512],[8552,8872]]},
"cvc-2":{f:"5a76929d5b19.ogg",t:[[60,140],[200,360],[440,620],[701,1001],[1501,1701],[1741,1881],[1921,1961],[2021,2202],[2262,2422],[2502,2802],[3222,3262],[3302,3543],[3603,3823],[3903,4103],[4443,4483],[4543,4784],[4844,5064],[5144,5304],[5584,5624],[5664,5844],[5944,6165],[6245,6465],[6545,6745],[7185,7265],[7305,7486],[7546,7706],[7706,7866],[7946,8046]]},
"cvc-3":{f:"f51970462364.ogg",t:[[60,300],[460,560],[560,660],[800,1041],[1461,1701],[1841,2021],[2081,2161],[2301,2542],[2882,3102],[3302,3602],[3722,3842],[3942,4283],[4723,5003],[5163,5423],[5563,5884],[6284,6404],[6504,6824],[6884,6924],[6964,7184],[7224,7485],[7965,8165],[8325,8605],[8645,8725],[8785,8985],[9045,9286]]},
"cvc-4":{f:"1737517c7e78.ogg",t:[[80,361],[501,561],[661,1042],[1483,1763],[1903,1983],[2023,2063],[2164,2504],[3005,3266],[3406,3526],[3586,3626],[3746,3907],[4007,4187],[4267,4528],[4988,5269],[5429,5670],[5710,5790],[5850,6090],[6190,6271],[6291,6331],[6411,6731],[7192,7473],[7613,7833],[7873,7953],[8014,8254],[8334,8414],[8454,8494],[8555,8895],[9296,9376],[9416,9496],[9536,9576],[9656,9897],[9977,10117],[10137,10177],[10277,10658]]},
"cvc-5":{f:"f8d7e3c17568.ogg",t:[[60,140],[241,521],[681,802],[822,882],[962,1263],[1724,1764],[1844,2044],[2145,2405],[2525,2706],[2766,2846],[2886,2926],[2986,3267],[3608,3648],[3728,3908],[4009,4269],[4369,4550],[4590,4670],[4690,4770],[4810,5091],[5532,5752],[5893,6153],[6273,6554],[6915,6995],[7075,7296],[7376,7536],[7576,7636],[7676,7716],[7777,8017],[8318,8398],[8458,8739],[8819,9000],[9000,9180],[9300,9460],[9500,9580]]},
"cvc-6":{f:"f3e1b4039a59.ogg",t:[[60,260],[320,400],[420,500],[581,861],[1381,1461],[1562,1742],[1782,1882],[1962,2122],[2663,2843],[2883,2983],[3003,3263],[3383,3524],[3564,3624],[3644,3724],[3784,4064],[4545,4805],[4845,4965],[5005,5045],[5105,5325],[5385,5546],[5926,6126],[6206,6346],[6386,6426],[6446,6647],[6707,6867],[7227,7307],[7367,7648],[7708,7828],[7868,7908],[7948,8148],[8208,8388],[8849,9089],[9269,9610],[9770,9870],[9890,9970],[10010,10310],[10390,10631]]},
"blend-1":{f:"d5c62ccf24b7.ogg",t:[[40,380],[441,541],[561,601],[661,1021],[1482,1522],[1602,1922],[2022,2203],[2263,2343],[2363,2403],[2463,2803],[3144,3184],[3244,3604],[3664,3965],[4045,4505],[5126,5266],[5306,5406],[5486,5787],[5927,6007],[6047,6327],[6427,6808],[7448,7629],[7689,7789],[8009,8089],[8129,8410],[8490,8870],[9271,9351],[9411,9711],[9811,10091],[10172,10312],[10352,10432],[10492,10912],[11233,11513]]},
"blend-2":{f:"dabca00a078f.ogg",t:[[80,160],[220,601],[701,1162],[1783,2124],[2184,2264],[2304,2745],[2825,2965],[3005,3045],[3145,3346],[3426,3786],[4127,4467],[4688,5048],[5209,5589],[5930,5970],[6050,6391],[6471,6771],[6851,6992],[7312,7352],[7432,7673],[7753,8033],[8114,8254],[8735,8855],[8915,9035],[9135,9476],[9516,9616],[9696,10057],[10558,10638],[10678,10758],[10798,10838],[10898,11259],[11359,11760]]},
"blend-3":{f:"bc58af85ee83.ogg",t:[[60,100],[180,461],[541,641],[701,1082],[1443,1783],[1883,2044],[2084,2124],[2204,2444],[2505,2605],[2665,3066],[3386,3466],[3526,3807],[3847,3927],[3967,4047],[4067,4107],[4188,4368],[4468,4809],[5229,5310],[5350,5410],[5450,5490],[5530,5831],[6151,6432],[6532,6752],[6792,6892],[6953,7213],[7494,7574],[7594,7674],[7734,7774],[7834,8235],[8576,8876],[8976,9277],[9377,9758]]},
"blend-4":{f:"4c3a60f280bb.ogg",t:[[60,140],[200,380],[500,801],[1561,1821],[1902,2022],[2082,2422],[2522,2662],[2682,2762],[2802,2842],[2922,3263],[3783,3883],[3923,4063],[4103,4183],[4223,4303],[4504,4844],[5184,5384],[5545,5805],[5945,6185],[6605,6685],[6745,6966],[7026,7226],[7326,7546],[8067,8327],[8387,8467],[8507,8787],[8907,9127],[9187,9488],[9988,10048],[10088,10168],[10288,10469],[10529,10589],[10649,10969]]},
"blend-5":{f:"99a555da5a91.ogg",t:[[80,401],[501,761],[901,1001],[1142,1282],[1863,2163],[2283,2443],[2503,2564],[2664,2704],[2784,3525],[3885,4026],[4126,4466],[4546,4626],[4787,4947],[5287,5407],[5488,5828],[5888,5948],[6088,6469],[6910,7210],[7330,7891],[8191,8552],[8972,9253],[9353,9653],[9693,9774],[9794,9874],[9914,10294],[10374,10474],[10535,11055]]},
"blend-6":{f:"10bd7e757769.ogg",t:[[120,501],[501,1402],[1402,1582],[1702,1942],[2002,2062],[2102,2142],[2202,2483],[2863,2943],[3003,3244],[3324,3604],[3644,3764],[3824,3884],[3924,4004],[4044,4445],[4925,5286],[5826,5907],[5947,6167],[6267,6547],[6607,6687],[6707,6788],[6848,7168],[7608,7688],[7729,7969],[8029,8309],[8329,8409],[8429,8509],[8610,9110],[9110,9951],[9951,10311],[10351,10412],[10432,10512],[10552,10872]]},
"digraph-1":{f:"0062e64e39e0.ogg",t:[[60,140],[220,461],[561,861],[1222,1462],[1543,1703],[1743,1783],[1843,2184],[2464,2544],[2644,2905],[3025,3105],[3145,3225],[3266,3306],[3366,3686],[4067,4147],[4227,4468],[4568,4768],[4808,4868],[4908,4968],[5029,5209],[5289,5750],[6291,6331],[6351,6531],[6631,6671],[6671,6792],[6812,6852],[6892,7352],[7453,7613],[7633,7713],[7753,8074],[8635,8875],[8935,9015],[9055,9316],[9376,9496],[9516,9596],[9696,10017],[10117,10177],[10197,10297],[10338,10798],[11279,11860]]},
"digraph-2":{f:"43f9cfa10040.ogg",t:[[40,240],[380,460],[561,841],[1381,1621],[1862,1942],[2002,2042],[2082,2302],[2382,2642],[3143,3323],[3483,3783],[3824,3904],[3944,3984],[4044,4344],[4844,5025],[5165,5465],[5505,5585],[5605,5645],[5725,5965],[6466,6666],[6786,7087],[7127,7207],[7287,7587],[7647,7987],[8468,8708],[8788,8948],[9028,9248],[9589,9749],[9809,10109]]},
"digraph-3":{f:"770b37acd5a6.ogg",t:[[80,440],[521,601],[621,701],[761,1001],[1441,1802],[1862,2002],[2062,2102],[2202,2402],[2542,2763],[3123,3203],[3263,3463],[3563,3644],[3684,3744],[3764,3844],[3904,4204],[4645,4945],[5065,5265],[5285,5325],[5405,5686],[6086,6166],[6226,6446],[6586,6767],[6807,6887],[6907,6987],[7047,7287],[7668,7848],[7908,7988],[8048,8228],[8368,8729],[9069,9609]]},
"digraph-4":{f:"f8cfc14d048e.ogg",t:[[60,321],[401,481],[501,581],[681,1022],[1503,1803],[2164,2504],[3145,3285],[3326,3426],[3526,3606],[3626,3706],[3806,4127],[4628,4848],[4888,4988],[5048,5389],[5509,5830],[6511,6591],[6611,6691],[6791,6972],[7012,7052],[7092,7493],[7973,8033],[8073,8154],[8194,8234],[8374,8634],[8695,8815],[8855,8895],[8955,9316]]},
"digraph-5":{f:"9c2517c8f567.ogg",t:[[120,200],[441,661],[781,922],[1022,1282],[1903,2064],[2164,2484],[2545,2585],[2645,2845],[2945,3045],[3126,3466],[3867,3927],[4067,4288],[4348,4428],[4448,4488],[4548,4909],[5290,5430],[5490,5790],[5911,6251],[6291,6391],[6432,6692],[7193,7534],[7634,7994],[8415,8495],[8696,8916],[9016,9156],[9237,9477]]},
"digraph-6":{f:"0d6b6c74bbdf.ogg",t:[[60,140],[300,521],[621,1001],[1462,1502],[1602,1802],[1902,2203],[2363,2583],[2643,2723],[2763,2803],[2864,3184],[3524,3845],[4445,4526],[4606,4846],[4906,4986],[5066,5286],[5727,5807],[5867,6168],[6288,6808],[6848,6949],[7009,7529],[7810,8150],[8611,8691],[8751,8971],[9031,9111],[9211,9412],[9652,9752],[9772,9832],[9892,10172],[10233,10373],[10453,10833]]},
"silente-1":{f:"c8235514cbed.ogg",t:[[40,421],[541,641],[661,721],[821,1222],[1743,2123],[2184,2324],[2384,2424],[2524,2704],[2825,3225],[3666,4007],[4087,4187],[4267,4567],[4648,4828],[4988,5108],[5189,5229],[5309,5549],[6110,6190],[6250,6571],[6631,7032],[7192,7332],[7633,7773],[8053,8234],[8774,8895],[8935,9015],[9115,9676],[9956,10036],[10117,10437],[10497,10577],[10637,10958],[11038,11499],[11940,12240],[12320,12921]]},
"silente-2":{f:"12eeb3b734b3.ogg",t:[[80,120],[180,461],[481,601],[661,1022],[1583,1843],[1883,2144],[2204,2244],[2264,2545],[2565,2665],[2725,3025],[3426,3486],[3566,3787],[3847,4188],[4268,4348],[4428,4729],[5129,5209],[5270,5570],[5630,5891],[5971,6111],[6552,6612],[6692,7013],[7053,7133],[7193,7554],[7914,8055],[8095,8155],[8215,8435],[8475,8515],[8596,8916],[9357,9597],[9617,9778],[9818,9878],[9938,10138],[10158,10198],[10259,10379],[10459,10840]]},
"silente-3":{f:"8896f6284bdb.ogg",t:[[20,280],[340,661],[681,821],[901,1262],[1522,1782],[1823,2103],[2123,2243],[2303,2544],[2584,2644],[2684,2764],[2844,3164],[3405,3465],[3565,3845],[3905,4206],[4246,4286],[4326,4626],[4687,4767],[4807,4847],[4907,5247],[5568,5648],[5708,5948],[6048,6469],[6509,6569],[6649,6970],[7330,7571],[7611,7991],[8031,8091],[8131,8191],[8251,8592],[9073,9253],[9333,9593],[9633,9914],[9974,10174],[10274,10755]]},
"silente-4":{f:"e1aefb9ecc77.ogg",t:[[80,381],[461,581],[581,681],[741,1162],[1602,1983],[2003,2143],[2183,2223],[2283,2704],[3104,3245],[3305,3505],[3545,3625],[3745,4106],[4607,4867],[4967,5288],[5328,5448],[5548,5868],[5888,5948],[5989,6029],[6109,6469],[6910,7090],[7170,7230],[7290,7451],[7451,7611],[7691,8011],[8051,8152],[8612,8933],[8953,9073],[9113,9393],[9514,9794],[9894,10014],[10054,10355],[10795,10895],[10996,11416],[11616,11817],[11857,11937],[11997,12217]]},
"silente-5":{f:"988e44b77b0f.ogg",t:[[40,381],[401,481],[501,581],[641,1102],[1783,2084],[2164,2304],[2364,2404],[2505,2785],[2825,3246],[3727,3947],[4488,4568],[4629,5069],[5109,5210],[5250,5350],[5390,5530],[6131,6272],[6312,6372],[6412,6772],[6833,7213],[7875,7955],[8015,8315],[8355,8416],[8456,8496],[8556,8876],[8896,8957],[8977,9057],[9117,9558],[10199,10459],[10519,10620],[10660,10940],[11040,11421],[11461,11521],[11561,11641],[11682,12082]]},
"silente-6":{f:"d350f0e1014b.ogg",t:[[60,140],[180,481],[541,841],[841,1622],[1622,1723],[1803,2163],[2203,2404],[2444,2484],[2544,2804],[2824,2965],[3025,3445],[3445,4226],[4226,4647],[4747,5068],[5088,5188],[5248,5709],[6129,6410],[6470,6891],[6991,7171],[7291,7391],[7491,7732],[8573,8613],[8673,8934],[9234,9455],[9535,9875],[9875,10596],[10596,11137],[11618,11738],[11778,11878],[11958,12179],[12219,12599]]},
"team-1":{f:"f124dc08df1d.ogg",t:[[20,100],[200,441],[501,561],[601,661],[721,1021],[1382,1422],[1542,1742],[1842,2043],[2103,2163],[2203,2243],[2283,2543],[2824,2904],[2964,3184],[3244,3585],[3645,3725],[3745,3825],[3905,4126],[4586,4626],[4686,4887],[4967,5287],[5347,5668],[5708,5788],[5808,6088],[6429,6509],[6609,6809],[6909,7150],[7250,7470],[7570,7871],[8231,8351],[8371,8411],[8491,8872],[8932,9192]]},
"team-2":{f:"49b883db9da3.ogg",t:[[60,100],[180,380],[520,800],[1281,1361],[1481,1921],[2001,2101],[2141,2582],[2902,3162],[3222,3362],[3402,3442],[3502,3682],[3762,4062],[4423,4683],[4743,4863],[4903,4943],[5003,5283],[5363,5663],[6064,6164],[6284,6544],[6664,6764],[6844,7264],[7304,7364],[7384,7464],[7504,7825],[8265,8445],[8485,8565],[8665,8845],[8945,9225],[9325,9526],[9806,9926],[9966,10006],[10086,10286],[10366,10626]]},
"team-3":{f:"dd4e8898323e.ogg",t:[[120,301],[421,501],[561,741],[1543,1703],[1763,1844],[1904,2044],[2184,2465],[2525,2605],[2645,2685],[2725,2986],[3467,3547],[3627,3848],[3928,4028],[4068,4128],[4168,4208],[4268,4569],[5170,5310],[5350,5431],[5491,5671],[5771,6212],[6693,6894],[6974,7214],[7254,7354],[7415,7495],[7515,7555],[7655,7916],[8497,8577],[8677,8917],[9038,9218],[9278,9358],[9418,9639],[10220,10440],[10581,10801],[10861,11142]]},
"team-4":{f:"acfcebce1456.ogg",t:[[60,321],[461,561],[581,641],[721,1142],[1603,1843],[1983,2103],[2164,2504],[2604,2805],[2865,2985],[3005,3085],[3145,3526],[3926,4067],[4107,4167],[4227,4427],[4868,4968],[5028,5189],[5269,5429],[5489,5609],[5709,5850],[5890,5950],[5990,6030],[6130,6391],[6831,6911],[6972,7292],[7392,7753],[7833,8214],[8274,8554],[8614,9075],[9576,9776],[9896,10217],[10237,10317],[10337,10377],[10477,10738],[11198,11279],[11359,11559],[11659,11860],[12000,12280]]},
"team-5":{f:"74904ccc3a40.ogg",t:[[80,260],[260,440],[440,520],[620,900],[1581,1801],[1921,2081],[2181,2341],[2401,2481],[2521,2641],[2721,3001],[3502,3762],[3842,4142],[4182,4262],[4302,4402],[4462,4742],[5182,5543],[5623,5943],[6023,6423],[6823,6903],[7003,7223],[7343,7703],[7744,7864],[7964,8304],[8364,8524],[8564,8644],[8704,9024],[9324,9925],[10365,10565],[10665,10865],[10945,11105],[11205,11545],[11665,11945]]},
"team-6":{f:"312290e71db9.ogg",t:[[60,100],[180,440],[560,640],[680,740],[800,1161],[1761,2021],[2061,2161],[2201,2481],[2582,2642],[2762,2842],[2862,2902],[2942,3162],[3222,3502],[3922,4062],[4182,4343],[4443,4943],[5003,5103],[5203,5503],[6144,6404],[6584,6624],[6724,6984],[7124,7324],[7384,7464],[7484,7564],[7625,7925],[8185,8365],[8445,8685],[9185,9265],[9305,9526],[9606,9806],[9886,10206],[10646,10726],[10866,11087],[11127,11227],[11267,11547],[11727,11847],[11927,12387],[12427,12527],[12567,12808]]},
"rvowel-1":{f:"789735f19940.ogg",t:[[60,100],[180,461],[541,661],[741,1082],[1463,1723],[1863,2064],[2124,2184],[2204,2284],[2344,2625],[2685,2925],[3005,3326],[3847,3907],[3987,4227],[4308,4468],[4708,4809],[4889,5089],[5149,5229],[5289,5550],[5590,5930],[6592,6832],[6872,7093],[7133,7173],[7233,7473],[7533,7654],[7674,7714],[7794,8054],[8215,8575],[9136,9216],[9256,9557],[9597,9817],[10038,10278],[10358,10559],[10579,10679],[10719,10759],[10839,11180],[11580,11641],[11661,11741],[11781,11821],[11921,12302]]},
"rvowel-2":{f:"e93f06a392a9.ogg",t:[[40,361],[501,581],[641,1042],[1483,1784],[1884,1964],[2024,2064],[2124,2465],[2886,2966],[3046,3186],[3246,3286],[3367,3687],[3768,3848],[3868,3908],[3988,4309],[4409,4689],[5170,5451],[5551,5912],[5952,6032],[6072,6192],[6273,6513],[6593,6994],[7415,7495],[7575,7856],[7916,8136],[8236,8577],[8978,9198],[9319,9539],[9639,9900],[10361,10441],[10461,10541],[10581,10621],[10701,10962],[11062,11403]]},
"rvowel-3":{f:"6da5e1928256.ogg",t:[[20,340],[421,501],[521,601],[661,1081],[1582,1883],[1943,2103],[2143,2183],[2243,2564],[2624,2744],[2824,3084],[3124,3184],[3265,3645],[4106,4246],[4286,4326],[4406,4767],[4867,5327],[5808,6108],[6189,6469],[6529,6589],[6629,6709],[6749,7110],[7550,7971],[8452,8532],[8592,8912],[8992,9173],[9273,9533],[9593,9653],[9733,10054],[10555,10755],[10795,10875],[10935,11216],[11256,11336],[11376,11456],[11516,11596],[11676,12037],[12137,12437]]},
"rvowel-4":{f:"b1484d50b505.ogg",t:[[60,140],[200,501],[621,961],[1502,1782],[1822,1963],[2003,2043],[2143,2403],[2463,2583],[2603,2643],[2704,3004],[3084,3204],[3264,3364],[3785,3865],[3945,4226],[4286,4346],[4446,4726],[4806,5107],[5167,5247],[5287,5347],[5427,5708],[6188,6429],[6489,6589],[6629,6869],[6969,7370],[7450,7550],[7630,8051],[8471,8551],[8611,8892],[8992,9292],[9352,9433],[9473,9693],[9733,10033],[10514,10594],[10694,10934],[11015,11335],[11355,11435],[11495,11675],[11736,11776],[11856,12136],[12236,12577],[13057,13238],[13318,13578],[13618,13778],[13878,14059],[14139,14619]]},
"rvowel-5":{f:"d9cf9bb54a95.ogg",t:[[80,160],[220,501],[581,941],[1422,1683],[1783,1883],[1923,2203],[2263,2384],[2404,2444],[2484,2764],[2824,3185],[3525,3846],[3886,4166],[4286,4387],[4507,4987],[5428,5749],[5809,6089],[6189,6289],[6390,6890],[7471,7651],[7752,8052],[8112,8312],[8413,8673],[8753,9033],[9534,9775],[9855,10175],[10215,10315],[10375,10576],[10616,10676],[10736,10936],[11016,11157],[11577,11677],[11737,12078],[12138,12218],[12278,12579],[12679,12939],[12979,13100],[13200,13600]]},
"rvowel-6":{f:"c6f8dd346d09.ogg",t:[[60,140],[240,601],[1362,1662],[1702,1822],[1863,2163],[2263,2463],[2483,2523],[2604,2924],[3485,3605],[3645,3845],[3885,3925],[4005,4226],[4266,4366],[4446,4766],[5227,5327],[5387,5588],[5668,6008],[6068,6208],[6248,6288],[6369,6809],[7270,7430],[7470,7550],[7590,7851],[7951,8351],[8391,8511],[8552,8872],[8972,9132],[9593,9673],[9733,9973],[10054,10314],[10394,10654],[11155,11516],[11656,11956],[12056,12156],[12156,12236],[12277,12597],[12657,12757],[12777,12837],[12877,12917],[12977,13198]]},
"team2-1":{f:"9cc9b6fb5615.ogg",t:[[80,401],[541,641],[661,741],[801,1122],[1522,1823],[1883,2103],[2183,2323],[2343,2424],[2444,2524],[2564,2844],[3185,3245],[3285,3385],[3525,3826],[4006,4126],[4206,4627],[4967,5047],[5148,5408],[5448,5528],[5588,5688],[5768,6189],[6690,6730],[6730,6870],[6970,7271],[7331,7431],[7511,7591],[7651,7952],[8432,8673],[8713,8813],[8853,9113],[9234,9554],[9614,9714],[9774,10075]]},
"team2-2":{f:"743d64f301c7.ogg",t:[[60,100],[160,500],[540,601],[621,701],[781,1201],[1721,1761],[1822,2142],[2202,2522],[2602,2802],[2842,2902],[2943,3063],[3103,3503],[3963,4124],[4144,4324],[4384,4464],[4544,4864],[4924,5024],[5044,5104],[5144,5244],[5305,5605],[6085,6165],[6225,6526],[6546,6586],[6626,6946],[6986,7046],[7126,7446],[7506,7586],[7606,7667],[7707,8147],[8607,8988],[9068,9148],[9228,9668],[9808,9848],[9948,10409],[10909,11029],[11069,11149],[11210,11410],[11450,11530],[11590,11890],[11970,12090],[12190,12551],[12631,12951]]},
"team2-3":{f:"fb60ea4055b4.ogg",t:[[60,140],[200,560],[720,820],[840,920],[1041,1261],[1741,1781],[1861,2201],[2301,2401],[2401,2501],[2601,2821],[3022,3242],[3282,3362],[3382,3422],[3502,3862],[4382,4462],[4522,4822],[4962,5143],[5203,5523],[5643,5763],[5803,6023],[6483,6543],[6663,6863],[7024,7364],[7424,7524],[7584,7804],[8404,8524],[8544,8624],[8684,8884],[8985,9245],[9325,9465],[9605,9685],[9785,9985],[10085,10445],[10545,10665],[10705,11066],[11566,11646],[11686,11946],[12026,12226],[12226,12426],[12566,12866],[13387,13447],[13547,13727],[13787,13867],[13907,14167],[14247,14587],[14687,14747],[14767,14847],[14887,15088],[15228,15488]]},
"team2-4":{f:"81782b731269.ogg",t:[[60,140],[240,500],[581,881],[1481,1722],[1822,1962],[2002,2042],[2122,2362],[2442,2723],[3163,3223],[3363,3683],[3723,3784],[3824,3904],[3924,4004],[4064,4364],[4925,5185],[5485,5565],[5605,5805],[5865,6186],[6226,6546],[7167,7347],[7407,7547],[7647,7927],[8007,8308],[8368,8448],[8488,8608],[8628,8668],[8728,9309],[9809,9889],[9949,10230],[10330,10770],[10850,10950],[10990,11291],[11331,11411],[11451,11651],[11751,11971],[12051,12131],[12231,12492],[12972,13092],[13132,13172],[13252,13413],[13493,13933]]},
"team2-5":{f:"2c79f93b280c.ogg",t:[[60,320],[440,961],[1341,1561],[1661,1901],[1941,2001],[2081,2381],[2802,2862],[2942,3202],[3242,3282],[3342,3822],[4143,4203],[4263,4583],[4763,4803],[4883,5363],[5423,5543],[5563,5603],[5663,5844],[5924,6384],[6764,6904],[6944,6984],[7064,7324],[7364,7404],[7465,7865],[7945,8065],[8165,8465],[8525,8685],[8725,8805],[8845,9166],[9866,10126],[10226,10546],[10566,10687],[10747,10847],[10907,10967],[11007,11127],[11187,11487]]},
"team2-6":{f:"bd1fab1adbe2.ogg",t:[[120,461],[581,701],[701,781],[841,1162],[1582,1923],[1983,2063],[2103,2143],[2203,2523],[2603,3004],[3204,3264],[3364,3625],[3665,3705],[3765,4085],[4185,4306],[4326,4386],[4406,4486],[4526,4967],[5267,5407],[5447,5487],[5587,5848],[5948,6288],[6348,6609],[6649,6749],[6789,7169],[7249,7350],[7810,8151],[8251,8691],[8731,8832],[8892,9352],[9653,9733],[9813,10033],[10113,10474],[10514,10594],[10634,10994],[11355,11695],[11775,11936],[11976,12076],[12156,12416],[12476,12797]]}};
const ST7S={dir:"audio/story/",ext:".ogg",voice:"luna",lines:{
"Not that one. Look at the story again.":"663b510a6f44",
"Now you read it!":"6cd14312ea3c",
"Pick a story. I read it to you, then you read it!":"4c604ee4cdac",
"Read the story. Tap a word if you need help.":"a645001ab0b4",
"Tap Read to me. Each word lights up as I say it.":"a61b04aa7016",
"What comes to the farm?":"b5802a7631e1",
"What do Jay and Dad ride?":"6c870cf6ad05",
"What do Lin and Gabe play with?":"08a5427f4798",
"What do Mark and Herb race?":"c32dfc282b52",
"What does Bart see?":"d22760622afe",
"What does Bea sleep on?":"c4dc5a400155",
"What does Brad have?":"2103e6f21300",
"What does Brook hold up?":"54e0476fe16c",
"What does Brook look at?":"eba5d25c1462",
"What does Chip peck on Dad?":"c2da770f2ea8",
"What does Dave have?":"4a0055751f13",
"What does Drew like to do?":"ff0682b9f424",
"What does Duke hide?":"2b49dd66774d",
"What does Gail have on?":"e71a8f8a9bbd",
"What does Gus have?":"7ac8c9818dd9",
"What does Hen sit on?":"e516a4b419fa",
"What does Jake put on top?":"34ee6d5f7d04",
"What does Kate have?":"933730f2c3d7",
"What does Kirk drip jam on?":"40a1e7fe4b2d",
"What does Max have?":"f27dce187f41",
"What does Mom get Bart?":"acbcc1f78bca",
"What does Pete ride?":"a39e81a12c17",
"What does Roy have?":"cc73bc0bf296",
"What does Scout dig up?":"d4dc04c80a1c",
"What does Seth have?":"9129f5bcd6b7",
"What does Stef have in the cup?":"0f7f75807f77",
"What does the duck have?":"35a447c34f2d",
"What does the moth sit on?":"c132f823c925",
"What goes flat on the grass?":"4499708b9564",
"What has mud on it?":"8315e9a5b229",
"What is in the box?":"655aedd857dc",
"What is in the fort?":"3cf436878f5b",
"What is in the shed?":"df4373fea893",
"What is on the shirt?":"38ac06b083d7",
"What is the fish in at the start?":"e72b81277b11",
"What is the sheep in?":"aa8c39240d3d",
"What is up in the sky?":"6c2428b66a47",
"What jumps over the moon?":"900a81bd24a4",
"What peeks out?":"9eb139d5d161",
"What sits on the ship?":"1808de955a54",
"What slips?":"4dcdfaa46c6c",
"Where did the bug hide?":"39d4120c9338",
"Where do Brent and Dad sit?":"15b8c70c5e44",
"Where does Bea wake up?":"3a386a4c0cdd",
"Where does the goat sit?":"355da79d6628",
"Where does the kite land?":"4a9fe89975b4",
"Where does the plane land?":"ec67c3942fa8",
"Where is the nest?":"6281f0a3a81a",
"Where is the ship?":"1bf8bd566bc8",
"Who brings the boat back?":"9c5a8673d60a",
"Who does Jay wave at?":"201f59532ab0",
"Who does the mouse see?":"a201a391b90f",
"Who drinks it up?":"1466e7ee0986",
"Who gets on last?":"9fa8de2d11fb",
"Who gets the bun?":"a5efcef0c9ac",
"Who grabs the bone?":"2e6eed280e36",
"Who has a hat on too?":"692b8fca7e95",
"Who hoots?":"efd6f09c9f59",
"Who is Brad?":"4a5872c2591c",
"Who is Chip?":"e938851627ea",
"Who is Fern?":"247efa6b7cbe",
"Who is Max?":"f7eea2a7d360",
"Who is in the boat?":"8f7cdf9c14dd",
"Who is in the mud?":"7285bb446833",
"Who jumps in?":"2e42c24ac058",
"Who lives in the house?":"1eded4c820ea",
"Who naps in the day now?":"ca3d31d46325",
"Who ran up?":"788cd9e21c7f",
"Who sat on the rug too?":"849a9b4cd0f3",
"Who sits on the log?":"9ded6998d6d4",
"Who smiles at Pete?":"6f41f81d24cc",
"Who swims past?":"235e7d253359",
"Who takes a bite?":"32d6673e6586",
"Yes! That is right.":"78437267c24b"},
w:{"a":"718603531832","adds":"c0f06e58e499","after":"393747859232","again":"08cd1ea7cff5","all":"bb9eb65908f2","an":"a8f283c70d36","and":"2d5376aa2769","are":"03be4948f63b","asks":"9dcbfa5e0ebd","at":"12dc48dd97c6","away":"b41c75818f8c","back":"f762f579a7e5","bake":"d6fd15759b7c","bakes":"a7ea29b1e668","bam":"5a7470a92017","band":"a4b3e3e4dfe8","barb":"b6a872d30645","barks":"efd5e0837468","barn":"91967ffc7f4a","bart":"31a181d25efc","bea":"2d5cdad2dea9","bee":"1721fbf2d64d","beep":"d34edaa06fef","bench":"d35b4655f538","beth":"ce57a0960ecb","big":"e08c9790fbab","bike":"22ecd86d882b","birch":"d96e23550a9f","bird":"0cafcee0ecee","bite":"a8019c491392","boat":"23fdd9e06723","bone":"fac8f4294417","box":"2eecce4a5429","brad":"4e66458161ed","brave":"15fc4c7b0efb","brent":"bca0b91e2d7e","brings":"f4fecd3b19a9","brook":"7f8370a24981","brown":"2e04f08a0b16","bug":"74b0ba4d4771","bun":"38904177ffe0","bus":"06d1f695d66c","by":"8432176b836e","cake":"89c5d2f5e301","camp":"3ad020c7c505","can":"406bf335ab11","car":"79a5245f8239","cat":"e8020ec4aee3","chad":"22c23421b1a2","check":"8334da7604c1","chick":"b47bec769495","chicks":"e73148e56ff3","chin":"cff7346bce3a","chip":"cfcec9d53807","chirp":"4a8e3ac04e46","chirps":"7a46d620bfc9","clap":"17b5ddc0e44d","clean":"eb0c304b0018","click":"2f6ed5619b40","clown":"0ddc2d60e90e","coat":"6e195628fd5e","comes":"4d631e78e176","corn":"2d7c340cfc1c","couch":"1a354cc609c8","cow":"a6486fcee4b8","crab":"a5f9e915ef0d","cross":"e0b8d437f622","crown":"334145014510","crust":"9aa530f2c923","cup":"808584c74a95","dad":"bc5c73ba4c5c","dad's":"e3757e71a6cf","dark":"fac3bcd4b6eb","dave":"7dec0c62a8fd","day":"2b2507623dc8","dean":"3ac67376795a","desk":"b4ff74121c5d","dice":"ae07b1695c2d","dig":"8d9d773e3087","digs":"46fae8419c72","dish":"c26df08df56f","dives":"ff3203ca1d2e","do":"f34a253eab8b","dog":"a2b836c080d1","down":"1bd15654d681","draw":"a459639e73cb","draws":"b42f6c211e4c","drew":"6f246d9cd6bf","drinks":"85b5f85e4932","drip":"bf74b04ed268","drips":"197e265238e3","drop":"0987b656c6d3","drops":"25d9a75fd300","drum":"dbdbd9976c84","duck":"45ba305fcc9a","duke":"97bcb9e30060","eat":"487f8a52c5b8","eating":"5ea873faff61","eats":"6288aaff2b06","egg":"4763f7371a2c","farm":"bf4740c225d0","fast":"5b7dcf2ff4d6","faster":"2452c4be2a36","feast":"b3507c87bdd0","feet":"7291edf9f36e","fern":"22f4f35ea225","find":"5ebe364f5a77","finds":"88170a4b8232","first":"7972ccbf04de","fish":"8a2e9aed333d","five":"2a495179d0e1","flat":"770f327fffda","floats":"64707db1bf5c","flop":"9731a502647c","for":"7287a89f786c","fort":"b6e7318a68c0","fox":"9948bb5dd1a6","fran":"54013c0590e0","frog":"f56f716599ae","fun":"e4d43b7ef788","gabe":"fa4b54e860b9","gail":"b500528540e3","game":"c398a35f9754","gate":"a6586455792e","get":"1eb788b37abc","gets":"7add488b67e9","gift":"2b53a69175e1","glen":"2bedc0823292","glides":"770e88494a25","go":"ccb7cdb90c56","goat":"99c65c068653","good":"4505d6b0afd1","grabs":"960a0351e280","gran":"d54cdd4c1c43","grapes":"83e249865eb1","grass":"b0bcf8d88a67","green":"086afdd0f9dd","grin":"641f5034da77","grins":"402e5c78f834","ground":"e9c54bca15fb","gus":"5a15d0dec204","had":"5a4f49655243","hands":"0cbb0d3ca0b7","handstand":"1fd274bc019d","hang":"058ddb4f29f7","has":"cc0061645f81","hat":"6aff308202c7","have":"fe3a49939257","hawk":"0202654f8a47","he":"31effe3f475c","heap":"46f531240a04","help":"372b66a54ffa","hen":"5888ec95d3bd","her":"e9416155df90","herb":"d203d54f2d99","herb's":"3683144e2831","here":"7c6c123e124d","hid":"19a8e4c1f021","hides":"215aa83ea372","hill":"10eba7d366bb","him":"db34c29a0c07","his":"41a080e90f51","holds":"7939796592bc","hole":"1a47d9c4079b","home":"23113c8b7ae4","hoots":"a631e9be8302","hops":"b1112b2f228a","hound":"bfeecf22280d","house":"8b2b874f68b2","howls":"faacb42a7908","hugs":"e047fd5b77a8","i":"f1b552a99c33","in":"e0fb9cd96c89","into":"96fba130fadd","is":"ccece9bef783","it":"9dd835f9c271","its":"7fab336467b5","jake":"2e7d65cccaa4","jam":"fbcadf2dbac8","jay":"8c7f85716591","jokes":"52a291e9fb5a","josh":"d0f659a4f27a","jump":"97f1ff4f4cab","jumps":"d2ee6d4e7c0b","just":"a6142a61eb10","kate":"8b5c7fc6fb4f","keeps":"337e91328907","kim":"b3e91597bce2","kirk":"770c8f71b53b","kite":"fe1f37dd0624","kurt":"1be4c0406e6f","lake":"4b2e0bee84cb","lamp":"cbdf06c7297d","lands":"fa513efd0bdd","last":"8e04f97b4232","laugh":"066376a5d08f","leaf":"f5ba563cc249","legs":"bdee41ae6d96","let":"5ca8c2f0bd5a","lid":"e3427d1a18df","lifts":"e5a354cc69fa","likes":"7a04d5e2346a","lin":"6d9aafb44a8d","line":"215a0b06409f","little":"e28ed9c625a2","live":"2fbd3083d2ad","lives":"8e51d6a4e526","log":"f271c65a078d","looks":"0c2ae6479546","lots":"3965ea353f0d","lunch":"77c1d7b4587e","make":"909747cf8fec","makes":"9c718b314960","mark":"ff814bac4b26","mark's":"7ad4137a9ca8","max":"e4c547130617","me":"7d5a8c3a1cb3","mike":"0757afbabd38","mike's":"f4e83134025f","milk":"0035d6c6e869","mom":"76fe4d540c70","moon":"46ea9f060287","moth":"08ebf811636c","mouse":"d107fbf58d91","mud":"79e348edabd4","mug":"6227fbe6d487","munch":"e62fb48af3d3","name":"eedfac798879","nap":"cf186144fabf","naps":"fabc88ea3de8","neal":"dc7e4f1718c5","nest":"2fefcd9272c1","new":"78d7ee959b1f","next":"5e4b34ad6bfa","no":"6fd826663c6e","norm":"a0e1e377c498","norm's":"f7e3ca2d7cb3","nose":"3705018e7cf2","not":"875ad37f9b13","now":"e7898c2555ff","nut":"f718b8b2b832","oats":"9dc981d613fb","of":"2b751b0f7d7a","off":"98bbe116a505","on":"bfaf0cba8635","one":"ab08ca73c611","oops":"ff1794704a33","our":"d07fc3714739","out":"21c5973cd848","over":"0192dce56085","owl":"c64f72fee5bc","packs":"7741b376f143","pail":"05a71c4f7a7f","past":"988d8fbe7c37","peanuts":"fab8090eb94c","pecks":"a3624b4de97a","peeks":"8c7800f07f3d","pet":"a2c5eddf8795","pete":"a3301ec1c814","picnic":"941d29d86dac","pig":"90ec03b909b9","plane":"7e9e60588cfc","play":"fe806203ec40","plop":"956fb6d0bfad","pond":"91d311915e08","pool":"849ff589d5a2","pops":"d91e63a8bc8f","puts":"7212664a1e39","race":"1885ec7ba497","rain":"49a1ed72992d","rains":"f1cb22cc9d11","ran":"04de2d9a885c","ray":"9032fe2c09e5","red":"8a8d48097817","rest":"c376cec0c561","rides":"6f1eb62d6368","rises":"86940878e07f","road":"383b30029c3e","rocks":"4ebfebe21cca","room":"2040fedafcd9","rose":"11cfcf5a7dcc","round":"d3dab121518f","roy":"ab57e577ab82","rug":"1bbd642ab8f9","run":"ec0068ffa0cd","runs":"2713ca06cf05","said":"26e8935937fb","sails":"4bd09825b6fa","sat":"03ec18434ff2","scoop":"122ce32165fd","scout":"c6285a19128b","scrub":"67b129c5515d","sea":"e980e159cbb1","seat":"d48f5e5f9243","see":"519fcf07cadb","sees":"76a037c49198","set":"b16651e804c5","seth":"e5e310b2e6d5","sets":"1b5b9c6968e2","shark":"a8244c484aac","she":"4706a64e226e","shed":"91adaa6dd308","sheep":"8b4367bf5059","sheet":"e2d5e0f9b551","shell":"c0f21ec0905a","ship":"fcb5dee42295","shirt":"e7cd499dc408","shouts":"1343dd2d430e","side":"001af7c431da","sing":"91ba264ea584","sit":"f241d52fc98b","sits":"98ceb79417c7","six":"c9550792c3b5","sleep":"3b3debb26ea2","sleeps":"56b2d00baad0","slips":"7da92e528819","smile":"544ac4c64bc7","smiles":"710c741b2324","sneaks":"271fb07ce118","sniffs":"b36b46813142","so":"78b0d56369d1","soap":"e61692179a94","sock":"41ffd39da5f5","song":"63712f6493aa","speeds":"18c469640dba","spill":"f2aa278fa3f0","spins":"e96039d2a72d","splash":"912c09887053","spoon":"3407c75e22a9","spot":"d5a19972afb8","star":"a1dc714737a2","stars":"3a6682a4ee0e","start":"721faa81ab7a","starts":"2ea327eaf422","stef":"c28c4933dd1b","still":"80bfaf5fc5ec","stomp":"a0a609a2f63c","stop":"dd178bb9f77a","stops":"3b90315acf12","storm":"5ca0424157e7","sun":"41a8477dd1de","swim":"e64f3f9cbbdd","swims":"4270c453220f","swoops":"86722a30232c","takes":"f4cc3853895b","tap":"4cbea58bc9be","tapes":"bf43feb40f1d","tell":"a08933b16383","tent":"8ecdb8757229","that":"8e6a1a19c0b7","the":"45fcf906a9af","them":"296ce245c957","then":"6512d83a832d","there":"7b4c435d4865","they":"707056415001","thin":"1224aeaf4fe8","three":"aed902dbfa2c","thud":"1a6f5abf1c8f","thump":"051c996cb1db","thunder":"b0fd54f44804","tips":"f32a6692e195","to":"24ea7fa2d40e","toast":"8988e555257b","too":"fdb698bc60e2","top":"89f0d0b321c5","torch":"46dc561ea4d1","tosses":"ec304f1787b2","toy":"18ff73ecd16b","train":"9ba397f2e825","tree":"5f11a7397016","trees":"715f587dad72","trip":"b439ce087e8a","tub":"ed05501dbc7d","turns":"49c1628273e2","two":"1ac5f85cdbb0","up":"4223fd99a1eb","us":"7ace7fcbb480","wait":"ee8d0c7c4ff5","wakes":"faf0dcc82ad6","wave":"edfaa6e493ff","waves":"ed40dec70671","wet":"76a1c544bab0","what":"83f6a33efc3f","when":"0dbe586d2c43","whit":"7afac5cfb210","white":"c45011560c75","will":"fd829527853f","win":"f4ff8891cc55","wish":"1125e6e492bd","with":"6ed308e5d9d3","wow":"bc89df0a0701","yard":"aea261f9778b","yells":"86858df504bf","you":"f8404f3f4151","zip":"0e1d8e74aced","zips":"39a7015c3361","zooms":"afd731c94cf9"}};

var TEACHRD_VER='v198'; // last line: the whole file ran (checked by dataReady() before the app starts)
