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
