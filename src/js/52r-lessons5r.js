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
