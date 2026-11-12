// P2-30: a fake Spanish unit with level 3 (the real units with level 3 arrive with La Casa, P2-31) and a controllable voice list.
// Used by smoke.js and shots.js: await page.evaluate(`(${ES_FX.install})(${JSON.stringify(voices)})`) with voices = ['es-MX'] or ['en-US'] ...
// install() adds unit es_tst, makes speechSynthesis.getVoices return those languages, and returns a seed whose level 3 word is 'niño'.
function install(langs) {
  const U = { id: 'tst', t: 'Test words', e: '🏠', theme: 'Test', spell: 1, items: [['niño', 'boy', '👦', 'el'], ['bebé', 'baby', '👶', 'el'], ['canción', 'song', '🎵', 'la'], ['pingüino', 'penguin', '🐧', 'el']] };
  if (!SK.es_tst) { ES_UNITS.push(U); SPN.tst = U.items; esReg(U); }
  try { speechSynthesis.getVoices = () => langs.map(l => ({ lang: l, name: l })); } catch (e) {}
  ESNOTE = 0;
  for (let s = 1; s < 200; s++) if (genQ('es_tst', 3, s).word === 'niño') return s;
  return 1;
}
module.exports = { install };
