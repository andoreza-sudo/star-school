// Sample questions for the P1-04 kinds (match, tap, spell). Plain JSON-able objects: used by test.js (validate/render),
// shots.js (rendered through the real round engine) and smoke.js (a bot plays them). No curriculum content here.
const cap = t => `<div class="tpz">${t}</div>`;
const SAMPLES = {
  match: {
    kind: 'match', sk: 'zz', lv: 1, seed: 1, label: 'zz match animals',
    html: '<div class="tpz">Match each animal to its baby</div>',
    items: [{ v: 'cat', l: 'cat' }, { v: 'dog', l: 'dog' }, { v: 'cow', l: 'cow' }, { v: 'duck', l: 'duck' }],
    opts: [{ v: 'dog', l: 'puppy' }, { v: 'duck', l: 'duckling' }, { v: 'cat', l: 'kitten' }, { v: 'cow', l: 'calf' }],
    ans: 'cat|cow|dog|duck', say: 'Match each animal to its baby',
  },
  tapWord: {
    kind: 'tap', sk: 'zz', lv: 1, seed: 1, label: 'zz tap word',
    html: cap('Tap the animal<br>The <span class="tp" data-v="mat">mat</span> and the <span class="tp" data-v="cat">cat</span> sat'),
    ans: 'cat', say: 'Tap the animal in the sentence', ansSay: 'cat',
  },
  tapLine: {
    kind: 'tap', sk: 'zz', lv: 1, seed: 1, label: 'zz tap line',
    html: cap('Tap 4<div class="tpl">' + [0, 1, 2, 3, 4, 5, 6].map(n => `<span class="tp" data-v="${n}">${n}</span>`).join('') + '</div>'),
    ans: '4', say: 'Tap the number four',
  },
  spell: {
    kind: 'spell', sk: 'zz', lv: 1, seed: 1, label: 'zz spell cat', word: 'cat', ans: 'cat', say: 'cat',
    html: '<div class="tpz">Spell the word you hear</div><div class="lslots"><span class="ls" id="ls0"></span><span class="ls" id="ls1"></span><span class="ls" id="ls2"></span></div>',
    hint: { k: 'say', w: 'cat', s: 'Listen again: cat' },
  },
  spellEs: {
    kind: 'spell', sk: 'zz', lv: 1, seed: 1, label: 'zz spell nino', word: 'niño', lang: 'es', ans: 'niño', say: 'niño', auto: true,
    html: '<div class="tpz">Escribe: boy</div><div class="lslots"><span class="ls" id="ls0"></span><span class="ls" id="ls1"></span><span class="ls" id="ls2"></span><span class="ls" id="ls3"></span></div>',
    hint: { k: 'say', w: 'niño', lang: 'es', s: 'Listen again' },
  },
};
module.exports = SAMPLES;
