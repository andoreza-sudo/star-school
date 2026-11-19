// TEACH-4: the briefs of the batch 4 lessons (what each beat's words are for), kept out of the app: only tools/author.js uses them, to ask
// for a draft (the app ships the slots each beat has, which tools/author.js checks every draft against). brief(D): D is the lesson's code
// (LS_DRAFTED[id] in src/js/52m-lessons4.js): its family (fam) and the fields its brief names (key, show, what, top, up).
'use strict';
const LS4_BRIEF_SOUND = pos => `Explore: a sound sort. Four drawn pictures and two letter bins; the child puts each picture with the letter its word ${pos == 'first' ? 'starts with' : pos == 'last' ? 'ends with' : 'has in the middle'} (slots {letter} {other}: the two letters). Lines: the task, said before they sort (the app names the pictures itself).
Name it: the letter big on the card with the two pictures they sorted under it; lines on it (slots {letter}: the letter, {a} {b}: the two words) and the idea: listen to the ${pos == 'first' ? 'first' : pos == 'last' ? 'last' : 'middle'} sound.
Together: line 1 before a word with a box for its ${pos} letter and three letter tiles (slot {word}: the word, said by the app), line 2 before a picture and three letters to pick from (slot {word}), line 3 before a letter shown big and three pictures to pick from (slot {letter}; never {word}, the answer).
Remember: a warm-up on letters (slot {letter} when it is a letter to find).
Check me: the pet fills the box with a letter (slot {ans}: the pet's letter; {word}: the word); the child checks it.
Show: two letters, each with four pictures; the child taps the picture whose word ${pos == 'first' ? 'starts with' : pos == 'last' ? 'ends with' : 'has in the middle'} that letter, no help, inside a small job in the world (slot {letter}).`;
const LS4_BRIEF_WORD = (what, show) => `What this lesson teaches: ${what}.
Explore: a sort. Four drawn pictures and two bins, each bin a letter pattern (slots {letter} {other}: the two patterns); the child puts each picture with the pattern in its word. Lines: the task, said before they sort (the app names the pictures itself).
Name it: the pattern big on the card with the two pictures they sorted under it and their words written; lines on it (slots {letter}: the pattern, {a} {b}: the two words) and the idea.
Together: line 1 before building a word from letter tiles (the picture is shown and the app says the word; slot {word}), line 2 before a picture and three written words that differ by one sound (slot {word}: the app says it), line 3 before a written word with three pictures, where the child reads the word and taps its picture (no slots: never the word, the answer).
Remember: a warm-up on an earlier sound (no slots).
Check me: the pet builds the word from tiles under the picture (slot {ans}: the word the pet built); the child checks it.
Show: ${show}`;
const LS4_SHOW_SENT = 'two short sentences to read; the child taps the picture that matches, no help, inside a small job in the world (no slots: the app shows the sentence).';
const LS4_SHOW_BUILD = 'two words to build from tiles (the app says each word; slot {word}), no help, inside a small job in the world.';
const LS4_PK_BRIEF = (what, st, sh) => `What this lesson teaches: ${what}. The child is in Pre-K and does not read: every line is heard, so keep lines short and warm.
Explore: ${st[0]}. Lines: the task, said before they start (no slots).
Name it: ${st[1]}; lines on it and the idea (slots: ${st[2]}).
Together: line 1 before ${st[3]}, line 2 before ${st[4]}, line 3 before ${st[5]} (slots: line 1 ${st[6] || 'none'}; lines 2 and 3 none: never the answer).
Remember: a warm-up (no slots).
Check me: the pet answers one of these questions (slot {ans}: the pet's answer as the app says it); the child checks it.
Show: ${sh}, no help, inside a small job in the world (${st[7] || 'no slots'}).`;

function brief(D) {
  const top = D.top, size = D.up ? 'big' : 'little';
  switch (D.fam) {
    case 'sound': return LS4_BRIEF_SOUND(D.key);
    case 'word': return LS4_BRIEF_WORD(D.what, D.show == 'build' ? LS4_SHOW_BUILD : LS4_SHOW_SENT);
    case 'count': return LS4_PK_BRIEF(`counting things up to ${top}, one number for each thing`, [`the child fills a frame of ${top} boxes with as many counters as they like`, 'the frame they filled and its number',
      '{n}: how many they put in', 'putting {n} counters in the frame', 'counting a row of things and tapping their number', 'hearing a number and tapping it', '{n}', 'slot {n}: the number to make'],
    'two numbers to make in the frame');
    case 'num': return LS4_PK_BRIEF(`hearing a number and knowing its numeral, up to ${top}`, [`the child fills a frame of ${top} boxes with as many counters as they like`, 'the frame they filled and its numeral',
      '{n}: how many they put in', 'making a number they hear in the frame', 'seeing dots and tapping their numeral', 'hearing a number and tapping its numeral', '{n}', 'slot {n}: the number to make'],
    'two numbers to hear and make in the frame');
    case 'more': return LS4_PK_BRIEF('which group has more: match them up, and the one with some left over has more', ['the child puts blue and orange counters in a frame, any way they like', 'their blue and orange counters matched up',
      '{a}: the blue counters, {b}: the orange', 'making more counters than the dots shown', 'two plates of things, tapping the one with more', 'three plates, tapping the one with the most', ''],
    'two rows of four plates; the child taps the plate with the most');
    case 'shape': return LS4_PK_BRIEF('the names of shapes: circle, square, triangle, rectangle, star, diamond', ['the child sorts four shapes into two groups by their kind', 'the two kinds of shape they sorted',
      '{a} {b}: the two shape names', 'sorting shapes into two groups', 'hearing a shape name and tapping it (three shapes)', 'hearing a shape name and tapping it (four shapes, two look alike)', ''],
    'two shape names to hear; the child taps that shape among four');
    case 'odd': return LS4_PK_BRIEF('finding the one that is different: three are the same, one is not', ['the child sorts four pictures into two groups (animals and food)', 'the two groups they sorted',
      'none', 'tapping the one that is different among three pictures', 'tapping the one that is different among four pictures', 'tapping the shape of a different colour among four', ''],
    'two rows of four; the child taps the one that is different');
    case 'size': return LS4_PK_BRIEF('big and small: bigger, smaller, the biggest and the smallest', ['the child sorts four pictures into big ones and small ones', 'a big and a small picture side by side',
      'none', 'sorting big and small pictures', 'tapping the bigger of two pictures', 'tapping the biggest or the smallest of three', ''],
    'two rows of four; the child taps the biggest or the smallest');
    case 'pat': return LS4_PK_BRIEF('patterns: the same things over and over in the same order, so we know what comes next', ['the child sorts the shapes of a pattern into two groups', 'a pattern of two shapes, said out loud',
      'none', 'a pattern with two choices for what comes next', 'a pattern with three choices', 'a longer pattern with three choices', ''],
    'two patterns; the child taps what comes next among four');
    case 'abc': return LS4_PK_BRIEF(`knowing the ${size} letters by name, and a word that starts with each`, [`the child sorts four pictures into two ${size} letters by the sound each word starts with`, `the ${size} letter big, with two pictures that start with it`,
      '{letter}: the letter, {a} {b}: the two words', `finding a ${size} letter among tiles (a picture and its word are shown; slot {word})`, `a picture, then tapping the ${size} letter its word starts with`, `hearing a letter name and tapping that ${size} letter`, '{word}', `slot {letter}: the letter to find`],
    `two letters to hear; the child taps that ${size} letter among four`);
    case 'match': return LS4_PK_BRIEF('each big letter has a little partner (B and b)', ['the child puts three little letters under their big partners', 'a big letter and its little partner side by side',
      '{letter}: the big letter, {other}: its little partner', 'putting little letters under their big partners', 'a big letter, then tapping its little partner', 'a little letter, then tapping its big partner', ''],
    'two big letters; the child taps each one\'s little partner among four');
    case 'order': return LS4_PK_BRIEF('the order of the ABC: each letter has its place, and we can sing to find what comes next', ['the child puts four letters in ABC order', 'the four letters in order, sung',
      'none', 'a row of four letters with one missing, and letter tiles', 'a letter, the ABC strip shown, and what comes after', 'a letter alone, and what comes after', ''],
    'two letters; the child taps the letter that comes after, among four');
    case 'clap': return LS4_PK_BRIEF('words have parts, and we clap once for each part (ba-na-na has three)', ['the child sorts four pictures into one clap and two claps', 'a word clapped out, part by part',
      'none', 'sorting pictures by their claps', 'a picture, then tapping how many claps its word has', 'another picture and its claps', ''],
    'two numbers of claps; the child taps the picture with that many claps, among four');
    // READ-SHAPES (v184): the K-2 reading lessons in their own shapes (src/js/52q-bench5r.js)
    case 'sight': return `What this lesson teaches: sight words, words we know by how they look, without sounding them out. Words of this stop's list: the app chooses them.
Explore: four word cards lie face down; the child turns them over one at a time to find the word the app says (slot {word}: that word). Lines: the task, said before they start.
Name it: the word they found on a big card, beside a word that starts with the same letter; lines on it (slots {word}: the word, {other}: the look-alike) and the idea: look at every letter.
Together: line 1 before the word cards with the word shown big (find its twin; slot {word}), line 2 before hearing a word and tapping it among three (slot {word}, said by the app), line 3 before a word that flashes and hides, then tapping the word they saw (no slots: never the word, the answer).
Remember: a warm-up on an earlier list (no slots).
Check me: the pet hears a word and taps one (slot {ans}: the word the pet tapped); the child checks it.
Show: two words to hear and tap among four, no help, inside a small job in the world (no slots).`;
    case 'rhyme': return `What this lesson teaches: rhymes, words that sound the same at the end (dog, frog).${D.read ? ' The child reads the words from the second Together item on.' : ' The child hears every picture named.'}
Explore: a rhyme sorter. A picture word (slot {word}) and four pictures; the child puts each picture in "Rhymes" or "No rhyme". Lines: the task, said before they sort (the app names the pictures itself).
Name it: two rhyming pictures with their words, the rhyming part bold; lines on it (slots {a} {b}: the two words, {letter}: the rhyming part, as letters) and the idea.
Together: line 1 before a picture and its word with three pictures to pick the rhyme from (slot {word}: the word to rhyme with), line 2 before ${D.read ? 'a picture and three written words' : 'a picture and three pictures'} (slot {word}), line 3 before ${D.read ? 'a written word to read and three written words (no slots)' : 'a word heard and three pictures (no slots)'}.
Remember: a warm-up on first sounds (no slots).
Check me: the pet picks a rhyme (slot {ans}: the pet's word, {word}: the word to rhyme with); the child checks it.
Show: two words to rhyme with, the child picks the rhyme among four, no help, inside a small job in the world (no slots).`;
    case 'claps': return `What this lesson teaches: counting the parts (syllables) of a word by clapping once for each part.
Explore: clap-to-count: a picture word (slot {word}); the child taps Clap once for each part, then checks. Lines: the task, said before they clap.
Name it: the picture with its claps drawn; lines on it (slots {word}: the word, {n}: how many claps) and the idea.
Together: line 1 before clapping a picture word on the clap model (slot {word}), line 2 before a picture and tapping how many claps (slot {word}), line 3 before a written word, heard, and tapping how many claps (slot {word}).
Remember: a warm-up: a picture, how many claps (no slots).
Check me: the pet claps a word (slot {ans}: the pet's claps, said as "3 times"; {word}: the word); the child checks it.
Show: two written words to clap on the model, no help, inside a small job in the world (slot {word}).`;
    case 'spell': return `What this lesson teaches: ${D.what}. The child hears a word and builds it from letter tiles (spelling from dictation).
Explore: the child hears a word (slot {word}), sees its picture, and builds it from letter tiles any way they think. Lines: the task, said before they build.
Name it: the picture and the word in its boxes, the sound pattern bold; lines on it (slots {word}: the word, {letter}: the pattern, said as letters) and the idea.
Together: line 1 before building a word they hear, with its picture (slot {word}), line 2 before a word they hear and three written words to pick the right one from (slot {word}), line 3 before building a word they only hear, no picture (slot {word}).
Remember: a warm-up on first sounds (no slots).
Check me: the pet writes the word it hears with the tiles (slot {ans}: the word the pet wrote, {word}: the word said); the child checks it.
Show: two words to hear and build from tiles, no help, inside a small job in the world (slot {word}).`;
    case 'story': return `What this lesson teaches: listening to a short story and answering who, what and where.${D.two ? ' The stories have three steps: someone goes somewhere, finds a thing, and gives it to someone.' : ' Two animals go somewhere; each has a thing.'}
Explore: the app tells a short story; the child sorts its pictures into Who, What and Where. Lines: the task, said before they sort (the app tells the story and names the pictures itself).
Name it: the story's who, what and where as pictures; lines on it (slots {a}: the who, {b}: the what) and the idea.
Together: line 1 before a story shown as picture panels with a question, line 2 before a story in words with a question and pictures to pick from, line 3 before a story in words with a question and written words to pick from (no slots: never the answer; the app tells the story and asks the question).
Remember: a warm-up on sight words (no slots).
Check me: the pet answers a question about the story (slot {ans}: the pet's answer); the child checks it.
Show: two stories and questions, four pictures to pick from, no help, inside a small job in the world (no slots).`;
    case 'pairs': return `What this lesson teaches: ${D.syn ? 'synonyms, words that mean almost the same (big and huge)' : 'opposites, words that mean as different as can be (hot and cold)'}.
Explore: a pairs match: three words and their ${D.syn ? 'same-meaning partners' : 'opposites'}, matched any way the child thinks. Lines: the task, said before they match.
Name it: one pair, big; lines on it (slots {a} {b}: the two words) and the idea.
Together: line 1 before a pairs match of three, line 2 before a word heard and shown with three words to pick ${D.syn ? 'the same meaning' : 'its opposite'} from (slot {word}: the word), line 3 before a written word to read and three to pick from (no slots).
Remember: a warm-up on sight words (no slots).
Check me: the pet picks ${D.syn ? 'a word that means the same' : 'an opposite'} (slot {ans}: the pet's word, {word}: the word); the child checks it.
Show: two words, four to pick from, no help, inside a small job in the world (no slots).`;
    case 'sfix': return `What this lesson teaches: a sentence starts with a capital letter; a telling sentence ends with a period, an asking sentence with a question mark.
Explore: the sentence fixer: a telling sentence about a drawn picture, no capital and no end mark; the child taps the capital letter button and an end mark. Lines: the task, said before they fix it.
Name it: a telling and an asking sentence, fixed, the capitals and marks shown; lines on it and the idea (no slots).
Together: line 1 before the sentence fixer (a telling or an asking sentence), line 2 before a picture and three ways to write its sentence, line 3 before three ways to write a sentence, no picture (no slots).
Remember: a warm-up on sight words (no slots).
Check me: the pet picks the way to write a sentence (slot {ans}: the sentence the pet picked); the child checks it.
Show: two sentences, four ways to write each, no help, inside a small job in the world (no slots).`;
    case 'order': return `What this lesson teaches: building a sentence with its words in an order that makes sense (the end mark is given).
Explore: word tiles of a sentence about a drawn picture; the child puts them in order. Lines: the task, said before they build.
Name it: a sentence built from tiles; lines on it and the idea (no slots).
Together: line 1 before word tiles with a picture, line 2 before a picture and three ways to write its sentence (one with two words swapped, one with the wrong end mark), line 3 before the same with no picture (no slots).
Remember: a warm-up on sight words (no slots).
Check me: the pet picks a sentence (slot {ans}: the sentence the pet picked); the child checks it.
Show: two sentences to build from word tiles, no picture, no help, inside a small job in the world (no slots).`;
    case 'pos': return `What this lesson teaches: naming words (nouns: the dog) and doing words (verbs: runs).
Explore: a sorter: four words into Naming and Doing. Lines: the task, said before they sort.
Name it: a naming word with its picture and a doing word; lines on it (slots {a}: the naming word, {b}: the doing word) and the idea.
Together: line 1 before sorting four words, line 2 before a picture and its short sentence (tap the doing word or the naming word), line 3 before a sentence alone (no slots).
Remember: a warm-up on sight words (no slots).
Check me: the pet taps a word of a sentence (slot {ans}: the pet's word); the child checks it.
Show: two sentences, four words to pick from, no help, inside a small job in the world (no slots).`;
    case 'plural': return `What this lesson teaches: plurals: more than one adds s (cats), and words that end in x, s, sh or ch add es (boxes).
Explore: a sorter: four pictures into "+ s" and "+ es". Lines: the task, said before they sort (the app names the pictures itself).
Name it: two words and their plurals; lines on it (slots {a}: a word that adds es, {b}: a word that adds s) and the idea.
Together: line 1 before building the word for two from tiles, with two pictures (slot {word}: the word for one), line 2 before two pictures and three words to pick from (slot {word}), line 3 before the same with no picture (slot {word}).
Remember: a warm-up on sight words (no slots).
Check me: the pet picks the word for two (slot {ans}: the pet's word, {word}: the word for one); the child checks it.
Show: two words for one, four words for two to pick from, no help, inside a small job in the world (slot {word}).`;
    default: return null;
  }
}
module.exports = {brief};
