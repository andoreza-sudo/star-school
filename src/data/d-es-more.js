/* ---------- ES-MORE: more Spanish weather and feelings words, DRAFTED for the owner (part teaches) ----------
   Every word, meaning, picture and line a child sees or hears is listed in docs/drafts/ES-MORE-READ.md. The words reach a child only once
   that file's status line says "status: reviewed <name> <YYYY-MM-DD>" (ESMORE_ON, 42f-esmoreon.js); esMoreApply (52z-esmore.js) then adds
   them at the END of the units weather and feel. Format of d-es.js: [spanish, english, picture, article, art, say]; a feeling shows both
   forms ('contento / contenta', said 'contento, contenta'), as the feelings already there do (R-01s).
   confuse: pairs never offered together in one question (two right answers by picture, meaning or ear), added to the unit's own list.
   cap: the words whose picture alone is not enough, which show their English under the picture (as hace calor does).
   art: the new drawings, object-art style and rules of DESIGN_SYSTEM.md 6.5 (64 grid, var(--a-x) roles, light from the top left, no faces
   on objects); named wx-* so no other picture in the app changes. Feelings keep emoji faces, like the feelings already there.
   Not recorded yet (audio/es): until the owner records them the tablet's voice says them. Nothing here draws at random. */
const ESM = {
  es: {
    weather: [
      ['lluvia', 'rain', '🌧', 'la', 'wx-rain'],
      ['relámpago', 'lightning', '⚡', 'el', 'wx-lightning'],
      ['niebla', 'fog', '🌫', 'la', 'wx-fog'],
      ['tornado', 'tornado', '🌪', 'el', 'wx-tornado'],
      ['hielo', 'ice', '🧊', 'el', 'wx-ice'],
      ['termómetro', 'thermometer', '🌡', 'el', 'wx-thermometer'],
      ['impermeable', 'raincoat', '🧥', 'el', 'wx-raincoat'],
      ['charco', 'puddle', '💧', 'el', 'wx-puddle'],
      ['muñeco de nieve', 'snowman', '⛄', 'el', 'snowman'],
      ['lentes de sol', 'sunglasses', '😎', 'los', 'wx-sunglasses'],
      ['hace buen tiempo', 'the weather is nice', '🌤', '', 'wx-fair']],
    feel: [
      ['contento / contenta', 'glad', '😄', '', '', 'contento, contenta'],
      ['nervioso / nerviosa', 'nervous', '😬', '', '', 'nervioso, nerviosa'],
      ['preocupado / preocupada', 'worried', '😟', '', '', 'preocupado, preocupada'],
      ['aburrido / aburrida', 'bored', '😒', '', '', 'aburrido, aburrida'],
      ['tímido / tímida', 'shy', '😳', '', '', 'tímido, tímida'],
      ['confundido / confundida', 'confused', '😕', '', '', 'confundido, confundida'],
      ['cariñoso / cariñosa', 'loving', '🥰', '', '', 'cariñoso, cariñosa'],
      ['orgulloso / orgullosa', 'proud', '🏆', '', '', 'orgulloso, orgullosa'],
      ['valiente', 'brave', '🦸', ''],
      ['tengo hambre', 'I am hungry', '😋', ''],
      ['tengo sed', 'I am thirsty', '🥤', '']]},
  confuse: {
    weather: [['llueve', 'lluvia'], ['hay tormenta', 'lluvia'], ['está nublado', 'lluvia'], ['lluvia', 'charco'], ['llueve', 'charco'], ['llueve', 'impermeable'], ['hay tormenta', 'relámpago'], ['está nublado', 'niebla'], ['hace viento', 'tornado'], ['hay tormenta', 'tornado'], ['nieva', 'muñeco de nieve'], ['hace frío', 'muñeco de nieve'], ['nieva', 'hielo'], ['hace frío', 'hielo'], ['hace calor', 'termómetro'], ['hace frío', 'termómetro'], ['hace fresco', 'termómetro'], ['hace sol', 'hace buen tiempo'], ['hace calor', 'hace buen tiempo'], ['hace fresco', 'hace buen tiempo'], ['está nublado', 'hace buen tiempo'], ['hace sol', 'lentes de sol'], ['hace calor', 'lentes de sol'], ['hace buen tiempo', 'lentes de sol']],
    feel: [['feliz', 'contento / contenta'], ['emocionado / emocionada', 'contento / contenta'], ['tranquilo / tranquila', 'contento / contenta'], ['feliz', 'cariñoso / cariñosa'], ['contento / contenta', 'cariñoso / cariñosa'], ['asustado / asustada', 'nervioso / nerviosa'], ['preocupado / preocupada', 'nervioso / nerviosa'], ['asustado / asustada', 'preocupado / preocupada'], ['triste', 'preocupado / preocupada'], ['enojado / enojada', 'aburrido / aburrida'], ['cansado / cansada', 'aburrido / aburrida'], ['sorprendido / sorprendida', 'tímido / tímida'], ['asustado / asustada', 'tímido / tímida'], ['nervioso / nerviosa', 'tímido / tímida'], ['triste', 'confundido / confundida'], ['preocupado / preocupada', 'confundido / confundida'], ['feliz', 'orgulloso / orgullosa'], ['contento / contenta', 'orgulloso / orgullosa'], ['emocionado / emocionada', 'orgulloso / orgullosa'], ['valiente', 'orgulloso / orgullosa'], ['feliz', 'tengo hambre'], ['contento / contenta', 'tengo hambre']]},
  cap: {weather: ['hace buen tiempo'], feel: ['orgulloso / orgullosa', 'valiente', 'tengo hambre', 'tengo sed']},
  art: {
    'wx-rain':
      '<path fill="var(--a-e)" d="M11 35Q3 35 3 27.5Q3 20 10.5 19Q12 10 21 9Q27 2 37 4.5Q45 2 50 10Q60 11 61 21Q62 33 53 35Z"/>' +
      '<path fill="var(--a-e1)" d="M11.7 32.9Q4.1 32.9 4.1 25.9Q4.1 18.8 11.2 17.9Q12.6 9.4 21.1 8.5Q26.7 1.9 36.1 4.2Q43.6 1.9 48.3 9.4Q57.7 10.3 58.7 19.7Q59.6 31 51.1 32.9Z"/>' +
      '<path fill="var(--a-w)" opacity="0.7" d="M12.4 21.4Q13.4 13.6 21.4 12.6Q26.4 7.4 33.4 7.6Q26.6 11 23.4 15.8Q16 16 15 22.4Z"/>' +
      '<path fill="var(--a-b2)" d="M14.6 39.6Q19 46 19 48.2Q19 52.4 14.6 52.4Q10.2 52.4 10.2 48.2Q10.2 46 14.6 39.6ZM31.6 37.6Q36 44 36 46.2Q36 50.4 31.6 50.4Q27.2 50.4 27.2 46.2Q27.2 44 31.6 37.6ZM48.6 39.6Q53 46 53 48.2Q53 52.4 48.6 52.4Q44.2 52.4 44.2 48.2Q44.2 46 48.6 39.6ZM22.6 50.6Q27 57 27 59.2Q27 63.4 22.6 63.4Q18.2 63.4 18.2 59.2Q18.2 57 22.6 50.6ZM40.6 50.6Q45 57 45 59.2Q45 63.4 40.6 63.4Q36.2 63.4 36.2 59.2Q36.2 57 40.6 50.6Z"/>' +
      '<path fill="var(--a-b)" d="M14 39.6Q18 45.4 18 47.3Q18 51.1 14 51.1Q10 51.1 10 47.3Q10 45.4 14 39.6ZM31 37.6Q35 43.4 35 45.3Q35 49.1 31 49.1Q27 49.1 27 45.3Q27 43.4 31 37.6ZM48 39.6Q52 45.4 52 47.3Q52 51.1 48 51.1Q44 51.1 44 47.3Q44 45.4 48 39.6ZM22 50.6Q26 56.4 26 58.3Q26 62.1 22 62.1Q18 62.1 18 58.3Q18 56.4 22 50.6ZM40 50.6Q44 56.4 44 58.3Q44 62.1 40 62.1Q36 62.1 36 58.3Q36 56.4 40 50.6Z"/>' +
      '<ellipse cx="12.6" cy="46.6" rx="1" ry="1.8" fill="var(--a-b1)" opacity="0.9"/>' +
      '<ellipse cx="29.6" cy="44.6" rx="1" ry="1.8" fill="var(--a-b1)" opacity="0.9"/>' +
      '<ellipse cx="46.6" cy="46.6" rx="1" ry="1.8" fill="var(--a-b1)" opacity="0.9"/>' +
      '<ellipse cx="20.6" cy="57.6" rx="1" ry="1.8" fill="var(--a-b1)" opacity="0.9"/>' +
      '<ellipse cx="38.6" cy="57.6" rx="1" ry="1.8" fill="var(--a-b1)" opacity="0.9"/>',
    'wx-lightning':
      '<path fill="var(--a-y2)" d="M27 2L47 2L38 23L51 23L19 62L28 33L14 33Z"/>' +
      '<path fill="var(--a-y)" d="M26.2 3.4L44.6 3.4L36.3 22.7L48.3 22.7L18.8 58.6L27.1 31.9L14.2 31.9Z"/>' +
      '<path fill="var(--a-y1)" opacity="0.9" d="M26.6 3.6L32.6 3.6L24.6 30.6L18.4 30.6Z"/>' +
      '<circle cx="47" cy="8" r="1.8" fill="var(--a-w)" opacity="0.9"/><circle cx="12" cy="46" r="1.4" fill="var(--a-w)" opacity="0.8"/>' +
      '<circle cx="54" cy="32" r="1.2" fill="var(--a-w)" opacity="0.8"/>',
    'wx-fog':
      '<path fill="var(--a-w3)" d="M14 30Q6 30 6 23Q6 16 13 15.4Q14.4 7.6 22.4 7Q27.6 1.6 36 3.6Q43.4 1.6 47.6 8.4Q56 9.4 57 17.6Q58 28 50 30Z"/>' +
      '<path fill="var(--a-w)" d="M14.5 28.2Q7 28.2 7 21.6Q7 15 13.5 14.4Q14.9 7.1 22.4 6.5Q27.3 1.5 35.2 3.3Q42.1 1.5 46.1 7.9Q54 8.8 54.9 16.5Q55.8 26.3 48.3 28.2Z"/>' +
      '<rect x="7.8" y="29.8" width="44" height="6" rx="3" fill="var(--a-e2)"/>' +
      '<rect x="7" y="29" width="43.4" height="5.4" rx="2.7" fill="var(--a-e)"/>' +
      '<rect x="10" y="30.2" width="19.8" height="1.6" rx="0.8" fill="var(--a-e1)" opacity="0.8"/>' +
      '<rect x="15.8" y="38.8" width="43" height="6" rx="3" fill="var(--a-e2)"/>' +
      '<rect x="15" y="38" width="42.4" height="5.4" rx="2.7" fill="var(--a-e)"/>' +
      '<rect x="18" y="39.2" width="19.4" height="1.6" rx="0.8" fill="var(--a-e1)" opacity="0.8"/>' +
      '<rect x="5.8" y="47.8" width="40" height="6" rx="3" fill="var(--a-e2)"/>' +
      '<rect x="5" y="47" width="39.4" height="5.4" rx="2.7" fill="var(--a-e)"/>' +
      '<rect x="8" y="48.2" width="18" height="1.6" rx="0.8" fill="var(--a-e1)" opacity="0.8"/>' +
      '<rect x="18.8" y="56.8" width="40" height="6" rx="3" fill="var(--a-e2)"/>' +
      '<rect x="18" y="56" width="39.4" height="5.4" rx="2.7" fill="var(--a-e)"/>' +
      '<rect x="21" y="57.2" width="18" height="1.6" rx="0.8" fill="var(--a-e1)" opacity="0.8"/>',
    'wx-tornado':
      '<ellipse cx="30" cy="60" rx="14" ry="2.6" fill="var(--a-n1)" opacity="0.6"/><circle cx="16" cy="57" r="1.4" fill="var(--a-n)"/>' +
      '<circle cx="44" cy="58" r="1.2" fill="var(--a-n)"/><circle cx="40" cy="55" r="1" fill="var(--a-n2)"/>' +
      '<circle cx="19" cy="53" r="1" fill="var(--a-n)"/><ellipse cx="29.6" cy="55.6" rx="4.4" ry="3" fill="var(--a-e2)"/>' +
      '<ellipse cx="28.6" cy="54.6" rx="4.1" ry="2.6" fill="var(--a-e)"/><ellipse cx="28.6" cy="49.6" rx="6.6" ry="3.6" fill="var(--a-e2)"/>' +
      '<ellipse cx="27.6" cy="48.6" rx="6.2" ry="3.1" fill="var(--a-e)"/><ellipse cx="30.6" cy="42.6" rx="9.4" ry="4" fill="var(--a-e2)"/>' +
      '<ellipse cx="29.6" cy="41.6" rx="8.8" ry="3.4" fill="var(--a-e)"/><ellipse cx="33.6" cy="35.6" rx="13" ry="4.6" fill="var(--a-e2)"/>' +
      '<ellipse cx="32.6" cy="34.6" rx="12.2" ry="4" fill="var(--a-e)"/><ellipse cx="35.6" cy="27.6" rx="17.4" ry="5" fill="var(--a-e2)"/>' +
      '<ellipse cx="34.6" cy="26.6" rx="16.4" ry="4.3" fill="var(--a-e)"/><ellipse cx="34.6" cy="18.6" rx="22.4" ry="5.6" fill="var(--a-e2)"/>' +
      '<ellipse cx="33.6" cy="17.6" rx="21.1" ry="4.8" fill="var(--a-e)"/><ellipse cx="32.6" cy="9.6" rx="27" ry="6.4" fill="var(--a-e2)"/>' +
      '<ellipse cx="31.6" cy="8.6" rx="25.4" ry="5.5" fill="var(--a-e)"/>' +
      '<ellipse cx="32" cy="8.4" rx="20" ry="3.4" fill="var(--a-e3)" opacity="0.7"/>' +
      '<path fill="none" stroke="var(--a-e1)" stroke-width="1.6" opacity="0.9" d="M13.4 17.6Q20 14.4 28 14.4M18.6 26.6Q22.6 24 28.6 23.8M22.4 34.4Q25 32.6 29 32.4"/>',
    'wx-thermometer':
      '<rect x="24" y="3" width="16" height="47" rx="8" fill="var(--a-w3)"/>' +
      '<rect x="25.4" y="4.4" width="13.2" height="44" rx="6.6" fill="var(--a-w)"/>' +
      '<rect x="27" y="6" width="3" height="30" rx="1.5" fill="var(--a-e1)" opacity="0.8"/><circle cx="32.6" cy="50.6" r="11" fill="var(--a-r2)"/>' +
      '<circle cx="31.8" cy="49.8" r="9.8" fill="var(--a-r)"/><rect x="29.4" y="18" width="6.6" height="30" rx="3.3" fill="var(--a-r2)"/>' +
      '<rect x="29" y="17.6" width="5.8" height="30" rx="2.9" fill="var(--a-r)"/>' +
      '<ellipse cx="28" cy="46" rx="2.6" ry="3.4" fill="var(--a-r1)" opacity="0.9"/>' +
      '<rect x="29.8" y="19.6" width="1.6" height="24" rx="0.8" fill="var(--a-r1)" opacity="0.8"/>' +
      '<path fill="none" stroke="var(--a-e3)" stroke-width="2" d="M41.6 10L47 10M41.6 17L45.4 17M41.6 24L47 24M41.6 31L45.4 31M41.6 38L47 38"/>',
    'wx-raincoat':
      '<path fill="var(--a-y2)" d="M21 16Q15 17 12.6 23L7 49Q6.6 52 9.6 52.6L14 53.4Q16.6 53.8 17 51.2L18 45L18 58Q18 61 21 61L43 61Q46 61 46 58L46 45L47 51.2Q47.4 53.8 50 53.4L54.4 52.6Q57.4 52 57 49L51.4 23Q49 17 43 16Z"/>' +
      '<path fill="var(--a-y)" d="M20.8 16.2Q15.1 17.2 12.8 22.8L7.5 47.6Q7.1 50.4 9.9 51L14.1 51.7Q16.6 52.1 17 49.6L17.9 43.8L17.9 56.1Q17.9 59 20.8 59L41.7 59Q44.5 59 44.5 56.1L44.5 43.8L45.5 49.6Q45.8 52.1 48.3 51.7L52.5 51Q55.3 50.4 55 47.6L49.6 22.8Q47.4 17.2 41.7 16.2Z"/>' +
      '<path fill="var(--a-y2)" d="M19.4 21Q17 5 32 4Q47 5 44.6 21Q40 14.6 32 14.6Q24 14.6 19.4 21Z"/>' +
      '<path fill="var(--a-y)" d="M19.6 19.9Q17.3 4.8 31.4 3.9Q45.5 4.8 43.2 19.9Q38.9 13.8 31.4 13.8Q23.9 13.8 19.6 19.9Z"/>' +
      '<path fill="var(--a-y3)" d="M23.6 18.4Q23.4 10.4 32 9.8Q40.6 10.4 40.4 18.4Q37 15.6 32 15.6Q27 15.6 23.6 18.4Z"/>' +
      '<path fill="none" stroke="var(--a-y2)" stroke-width="1.6" d="M32 17L32 60.4M18 45L19.2 24M46 45L44.8 24"/>' +
      '<path fill="var(--a-y1)" opacity="0.8" d="M14 26Q15.6 20.6 20.4 19.6L16.4 40Z"/>' +
      '<rect x="34" y="25" width="6" height="2.6" rx="1.3" fill="var(--a-b2)"/>' +
      '<rect x="34" y="34" width="6" height="2.6" rx="1.3" fill="var(--a-b2)"/>' +
      '<rect x="34" y="43" width="6" height="2.6" rx="1.3" fill="var(--a-b2)"/>' +
      '<rect x="20" y="47" width="8" height="2.4" rx="1.2" fill="var(--a-y2)"/>' +
      '<rect x="36.6" y="47" width="8" height="2.4" rx="1.2" fill="var(--a-y2)"/>' +
      '<path fill="var(--a-b2)" d="M7.6 6.1Q10.9 10.9 10.9 12.6Q10.9 15.7 7.6 15.7Q4.3 15.7 4.3 12.6Q4.3 10.9 7.6 6.1ZM57.6 8.1Q60.9 12.9 60.9 14.6Q60.9 17.7 57.6 17.7Q54.3 17.7 54.3 14.6Q54.3 12.9 57.6 8.1ZM58.6 28.1Q61.9 32.9 61.9 34.6Q61.9 37.7 58.6 37.7Q55.3 37.7 55.3 34.6Q55.3 32.9 58.6 28.1Z"/>' +
      '<path fill="var(--a-b)" d="M7 5.9Q10 10.3 10 11.8Q10 14.6 7 14.6Q4 14.6 4 11.8Q4 10.3 7 5.9ZM57 8Q60 12.3 60 13.8Q60 16.6 57 16.6Q54 16.6 54 13.8Q54 12.3 57 8ZM58 28Q61 32.3 61 33.8Q61 36.6 58 36.6Q55 36.6 55 33.8Q55 32.3 58 28Z"/>' +
      '<ellipse cx="6" cy="11.2" rx="0.8" ry="1.4" fill="var(--a-b1)" opacity="0.9"/>' +
      '<ellipse cx="56" cy="13.2" rx="0.8" ry="1.4" fill="var(--a-b1)" opacity="0.9"/>' +
      '<ellipse cx="57" cy="33.2" rx="0.8" ry="1.4" fill="var(--a-b1)" opacity="0.9"/>',
    'wx-puddle':
      '<path fill="var(--a-g2)" d="M2 52Q4 44 7 50Q8 43 11 50L11 54L2 54ZM53 52Q55 44 58 50Q59 43 62 50L62 54L53 54Z"/>' +
      '<ellipse cx="32.8" cy="48.8" rx="28.6" ry="11.6" fill="var(--a-b2)"/><ellipse cx="31.8" cy="47.8" rx="27.2" ry="10.4" fill="var(--a-b)"/>' +
      '<ellipse cx="22" cy="44.4" rx="10" ry="2.8" fill="var(--a-b1)" opacity="0.8"/>' +
      '<ellipse cx="38" cy="49" rx="7" ry="2.6" fill="none" stroke="var(--a-b1)" stroke-width="1.6"/>' +
      '<ellipse cx="38" cy="49" rx="13" ry="5" fill="none" stroke="var(--a-b1)" stroke-width="1.4" opacity="0.7"/>' +
      '<path fill="var(--a-b2)" d="M38.6 25.5Q42.3 30.9 42.3 32.8Q42.3 36.4 38.6 36.4Q34.9 36.4 34.9 32.8Q34.9 30.9 38.6 25.5ZM18.6 11.5Q22.3 16.9 22.3 18.8Q22.3 22.4 18.6 22.4Q14.9 22.4 14.9 18.8Q14.9 16.9 18.6 11.5ZM50.6 7.5Q54.3 12.9 54.3 14.8Q54.3 18.4 50.6 18.4Q46.9 18.4 46.9 14.8Q46.9 12.9 50.6 7.5Z"/>' +
      '<path fill="var(--a-b)" d="M38 25.4Q41.4 30.3 41.4 32Q41.4 35.2 38 35.2Q34.6 35.2 34.6 32Q34.6 30.3 38 25.4ZM18 11.4Q21.4 16.3 21.4 18Q21.4 21.2 18 21.2Q14.6 21.2 14.6 18Q14.6 16.3 18 11.4ZM50 7.4Q53.4 12.3 53.4 14Q53.4 17.2 50 17.2Q46.6 17.2 46.6 14Q46.6 12.3 50 7.4Z"/>' +
      '<ellipse cx="36.8" cy="31.4" rx="0.9" ry="1.5" fill="var(--a-b1)" opacity="0.9"/>' +
      '<ellipse cx="16.8" cy="17.4" rx="0.9" ry="1.5" fill="var(--a-b1)" opacity="0.9"/>' +
      '<ellipse cx="48.8" cy="13.4" rx="0.9" ry="1.5" fill="var(--a-b1)" opacity="0.9"/><circle cx="33" cy="41.6" r="1.2" fill="var(--a-b1)"/>' +
      '<circle cx="43" cy="41.2" r="1.2" fill="var(--a-b1)"/>',
    'wx-fair':
      '<path fill="var(--a-y2)" stroke="var(--a-y2)" stroke-width="3" d="M37.9 21L43.3 14.6L34.9 13.9ZM34.9 32.1L43.3 31.4L37.9 25ZM25 37.9L31.4 43.3L32.1 34.9ZM13.9 34.9L14.6 43.3L21 37.9ZM8.1 25L2.7 31.4L11.1 32.1ZM11.1 13.9L2.7 14.6L8.1 21ZM21 8.1L14.6 2.7L13.9 11.1ZM32.1 11.1L31.4 2.7L25 8.1Z"/>' +
      '<circle cx="23" cy="23" r="13.6" fill="var(--a-y2)"/><circle cx="21.8" cy="21.8" r="12" fill="var(--a-y)"/>' +
      '<ellipse cx="17.6" cy="16.4" rx="4.4" ry="2.2" fill="var(--a-y1)" transform="rotate(-35 17.6 16.4)"/>' +
      '<path fill="var(--a-w3)" stroke="var(--a-w3)" stroke-width="1.6" d="M32.7 56.5Q26.9 56.5 26.9 51.6Q26.9 46.2 32.4 46Q33.3 40.4 38.5 39.4Q41.1 33.8 47.2 34.4Q53.4 35.1 54.4 40.9Q60.2 41.6 60.8 47.8Q61.2 56.5 54.4 56.5Z"/>' +
      '<path fill="var(--a-w)" d="M32.7 55Q27.2 55 27.2 50.3Q27.2 45.3 32.5 45.1Q33.3 39.8 38.2 38.9Q40.7 33.6 46.4 34.3Q52.2 34.8 53.1 40.3Q58.6 41 59.2 46.8Q59.5 55 53.1 55Z"/>' +
      '<path fill="none" stroke="var(--a-w3)" stroke-width="1.6" opacity="0.9" d="M36 50.3Q38.9 48.3 41.7 49.7M46.3 47.1Q48.8 45 51.9 46"/>',
    'wx-sunglasses':
      '<path fill="none" stroke="var(--a-r2)" stroke-width="3" d="M5 27L2.6 21.4M59 27L61.4 21.4"/>' +
      '<ellipse cx="17.6" cy="33.6" rx="13.4" ry="11.4" fill="var(--a-r2)"/><ellipse cx="17" cy="33" rx="12.8" ry="10.8" fill="var(--a-r)"/>' +
      '<ellipse cx="17.3" cy="33.4" rx="10.4" ry="8.6" fill="var(--a-k)"/>' +
      '<ellipse cx="13" cy="29.6" rx="3.6" ry="1.6" fill="var(--a-w)" opacity="0.5" transform="rotate(-25 13 29.6)"/>' +
      '<circle cx="22" cy="37.6" r="1" fill="var(--a-w)" opacity="0.5"/><ellipse cx="47.6" cy="33.6" rx="13.4" ry="11.4" fill="var(--a-r2)"/>' +
      '<ellipse cx="47" cy="33" rx="12.8" ry="10.8" fill="var(--a-r)"/><ellipse cx="47.3" cy="33.4" rx="10.4" ry="8.6" fill="var(--a-k)"/>' +
      '<ellipse cx="43" cy="29.6" rx="3.6" ry="1.6" fill="var(--a-w)" opacity="0.5" transform="rotate(-25 43 29.6)"/>' +
      '<circle cx="52" cy="37.6" r="1" fill="var(--a-w)" opacity="0.5"/>' +
      '<path fill="none" stroke="var(--a-r)" stroke-width="3.2" d="M28.6 28.6Q32 25.4 35.4 28.6"/>' +
      '<rect x="9" y="23.6" width="8" height="1.8" rx="0.9" fill="var(--a-r1)" opacity="0.8"/>' +
      '<rect x="39" y="23.6" width="8" height="1.8" rx="0.9" fill="var(--a-r1)" opacity="0.8"/>',
    'wx-ice':
      '<ellipse cx="32" cy="57" rx="26" ry="4" fill="var(--a-c1)" opacity="0.6"/><path fill="var(--a-c)" d="M8 24L40 24L40 56L8 56Z"/>' +
      '<path fill="var(--a-c1)" d="M8 24L22 12L54 12L40 24Z"/><path fill="var(--a-c2)" d="M40 24L54 12L54 44L40 56Z"/>' +
      '<path fill="none" stroke="var(--a-c3)" stroke-width="1.4" opacity="0.6" d="M8 24L40 24L54 12M40 24L40 56"/>' +
      '<path fill="var(--a-w)" opacity="0.7" d="M12 50L12 34L16 30L16 46Z"/><path fill="var(--a-w)" opacity="0.6" d="M20 52L20 47L23 44L23 49Z"/>' +
      '<circle cx="30" cy="18" r="1.6" fill="var(--a-w)" opacity="0.9"/><path fill="var(--a-w)" opacity="0.5" d="M45 20L49 16.6L49 22L45 25.4Z"/>' +
      '<path fill="var(--a-c)" d="M46 56Q48 52 50 56Q50 58 48 58Q46 58 46 56Z"/>'}
};
esMoreApply(); // the app loads this part after the data file; the gate decides (52z-esmore.js). In tools/test.js, which reads the parts
// before the data, the units are not there yet and this does nothing
