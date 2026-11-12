/* ---------- Brain Teasers word puzzles (P3-15; BRAIN_TEASERS.md 5.10) ----------
   The words themselves come from the lists the app already has: Word Search from the spelling lists (SPELL_WORDS, d-spell.js),
   Unscramble from the picture words in 20-words.js (band B, only words with a drawing) and the spelling lists with their sentences
   (bands C and D). This file only holds what those lists do not:
   - rude: letter runs a word search grid must never spell, in any direction (the BAD filter's words and a few more). A grid word
     that holds one of them, forwards or backwards (grass, shell, button ...), is not used in a word search.
   - more: real words that are not in the app's lists but are anagrams of words they hold (dog / god, star / rats, section /
     notices ...). Unscramble never uses a word whose letters spell another real word, so a scramble has exactly one answer;
     tools/test.js checks every word it can use against every word in the app's lists and these. Read only inside functions (A11). */
var BTW = {
  rude: 'fuck fuk shit dick cock suck tit tits fag cum sex ass piss crap damn hell hoe slut cunt twat nig fap wank porn poop poo butt pee fart ' +
    'turd boob kill gun',
  more: 'act god tab sub arc hips rats arts tsar sore ores eros roes ebon ones eons carb murd nett rifts ports strop prost writs ' +
    'notices auctioned reflow fowler cleats fluor pam deb nus gorf shore could cloud finder player grown silent enlist tinsel ' +
    'three ether there pots tops opts post spot stop evil vile veil live lemon melon thing night elbow below bowel north thorn ' +
    'inch chin cheap peach study dusty canoe ocean charm march cried cider taste state words sword petal plate pleat leapt ' +
    'steal least slate tales stale cheat teach diary dairy fired fried earth heart hater stone notes tones onset angle angel ' +
    'glean parts strap traps tea eat ate nip pin top pot opt tar art rat now own won tub but bus iced mono low flea',
};
