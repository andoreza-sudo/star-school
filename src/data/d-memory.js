/* Memory Match words (P3-14, BRAIN_TEASERS 5.9). Data only; read by src/js/82-bt-memory.js inside functions (A11).
   themes: picture names (emoji fallback in RIDDLES.pics, src/data/d-riddles.js) for band A picture-picture and band B word-picture.
   syn: band C synonym pairs; no word is a synonym of a word in another pair, so every card has exactly one partner.
   roots: band D word roots and their meaning; no two meanings overlap (hear / sound, write / draw were left out for that).
   Band C Spanish-English pairs come from SPN (src/js/34-gen-es.js); fractions, decimals, percents, numbers and dots are made in code. */
var MEMW = {
  themes: {
    animals: ['cat', 'dog', 'pig', 'duck', 'frog', 'fish', 'hen', 'cow', 'owl', 'bee', 'snail', 'turtle', 'mouse', 'elephant',
      'giraffe', 'penguin', 'octopus', 'ant'],
    food: ['apple', 'banana', 'cookie', 'cake', 'milk', 'cheese', 'grapes', 'egg', 'bread', 'pizza', 'watermelon', 'icecream'],
    toys: ['ball', 'drum', 'kite', 'teddy', 'robot', 'gift', 'hat', 'cup', 'bed', 'book', 'bell', 'crown', 'dice'],
    go: ['car', 'bus', 'bike', 'ship', 'rocket', 'plane', 'tractor', 'helicopter', 'fire-engine'],
    sky: ['sun', 'moon', 'star', 'cloud', 'rainbow', 'tree', 'flower', 'snowman', 'web', 'shell'],
  },
  syn: [['big', 'large'], ['small', 'tiny'], ['happy', 'glad'], ['sad', 'unhappy'], ['fast', 'quick'], ['start', 'begin'],
    ['end', 'finish'], ['shut', 'close'], ['smart', 'clever'], ['angry', 'mad'], ['loud', 'noisy'], ['jump', 'leap'],
    ['shout', 'yell'], ['rock', 'stone'], ['gift', 'present'], ['easy', 'simple'], ['sick', 'ill'], ['cold', 'chilly'],
    ['talk', 'speak'], ['wet', 'damp']],
  roots: [['bio', 'life'], ['geo', 'earth'], ['tele', 'far'], ['micro', 'small'], ['phon', 'sound'], ['graph', 'write'],
    ['aqua', 'water'], ['astro', 'star'], ['chron', 'time'], ['port', 'carry'], ['therm', 'heat'], ['photo', 'light'],
    ['auto', 'self'], ['dent', 'tooth'], ['spect', 'look'], ['tri', 'three'], ['cent', 'hundred'], ['multi', 'many'],
    ['mono', 'one'], ['rupt', 'break'], ['struct', 'build'], ['cycl', 'circle'], ['manu', 'hand']],
};
