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
    default: return null;
  }
}
module.exports = {brief};
