# ES-MORE read-through: more Spanish weather and feelings words

status: draft

**What this is.** 22 new Spanish words for young beginners: 11 in the unit Weather (`es_weather`, La Ciudad) and 11 in the unit
Feelings (`es_feel`), with their English meanings, pictures, the pairs never offered together, and every line a child sees or hears with
them. None of it reaches a child yet: the words live in `src/data/d-es-more.js` (part teaches, loaded on demand, not at start-up) and are
added by `esMoreApply` in `src/js/52z-esmore.js` only when `ESMORE_ON` is 1.

**How to approve.** Read the tables. Change anything you like in `src/data/d-es-more.js` (or ask Claude to). When you are happy, record the
words (see Recordings) and change the status line above to `status: reviewed <your name> <YYYY-MM-DD>`, then run `python3 tools/build.py`.
That writes `ESMORE_ON = 1` into `src/js/42f-esmoreon.js`, and the words appear at the end of the two units. With the line as it is
(`status: draft`), Spanish is exactly as before.

**Rules every word follows.** The format of every unit (`src/data/d-es.js`): the article, the word, the English, the picture. Mexican
Spanish, like the rest of the app. A feeling with two forms shows both and says both ("contento / contenta", said "contento, contenta"), as
the feelings already there do; a feeling with one form (valiente) or a phrase (tengo hambre) shows one. No word is already in a Spanish
unit, and every word keeps to the content rules (CONTENT-01). No two words of a unit share a picture, and words that could both be right by picture,
meaning or sound are never offered in one question (the confuse pairs below, as R-01s does for hace sol / hace calor). Weather pictures are
new drawings in the app's own object-art style (DESIGN_SYSTEM.md 6.5; faces only on animals, the sun and the star) or the app's snowman;
feelings keep emoji faces, as the nine feelings already there do. The weather and feelings units have no spelling level and are not in the
Big Review, so neither changes.

**New words on screen (outside the word cards and questions).** None: no new stop, unit, world or map label.

| Where | Words |
|---|---|
| Spanish map | no change (the stops Weather and Feelings keep their names) |
| Learn screen (tap ¡Vamos! after the cards) | no change to its lines |

**Recordings.** Not recorded (that needs the owner's approval). Until a word is recorded the tablet's own Spanish voice says it, and a learn
screen with any card not recorded uses one language per tap ("Tap a card to hear it in Spanish. Tap it again for English!") instead of
English then Spanish: so with the gate on and no recordings, the Weather and Feelings learn screens change to that mode for all their cards.
Recording them first keeps both screens as they are. The English meanings are said by the tablet's voice, as for every Spanish word.

| Lines | Count | Characters | Bytes each (existing audio/es: 2,310,255 bytes in 932 files) | Estimate |
|---|---|---|---|---|
| Spanish words, the "Recording" column below (one voice each, as the unit's other words) | 22 | 314 | about 2,479 | about 55 KB (0.05 MB), within the 12 MB audio budget (about 0.42 MB left) |

**Changes a flip makes beyond the words.** None on the maps. When the words are recorded, the speaking check's calibration (S-SPK2,
tools/spk-calib.js) draws from every recorded line, so its sample and pinned counts would change: a re-pin would be needed then (not now:
nothing is recorded, so nothing changes).

## Spanish: new words in the unit Weather (`es_weather`)

Added at the end of the unit, after el arco iris. "English under picture" means the English shows under its picture in "Tap the picture"
questions (the unit already does this for hace calor, hace frío and hace fresco).

| # | Unit | Spanish | English | Picture | English under picture | Recording | Why |
|---|---|---|---|---|---|---|---|
| E1 | weather | la lluvia | rain | 🌧 (drawing: wx-rain, new) | no | needs one: "la lluvia" | The noun beside llueve (it is raining): the word on rain boots and in picture books. Never offered with llueve, hay tormenta, está nublado or el charco (the pictures share rain or clouds). |
| E2 | weather | el relámpago | lightning | ⚡ (drawing: wx-lightning, new) | no | needs one: "el relámpago" | Lightning on its own (hay tormenta is the whole storm, and its drawing has a bolt too), so the two are never offered together. |
| E3 | weather | la niebla | fog | 🌫 (drawing: wx-fog, new) | no | needs one: "la niebla" | Fog, which a child sees on a morning walk; Weather Watch (Discover) teaches the English word. Never offered with está nublado. |
| E4 | weather | el tornado | tornado | 🌪 (drawing: wx-tornado, new) | no | needs one: "el tornado" | The same word as in English, so an easy win; Weather Watch teaches that a tornado means go inside. Never offered with hace viento or hay tormenta. |
| E5 | weather | el hielo | ice | 🧊 (drawing: wx-ice, new) | no | needs one: "el hielo" | Ice on a cold day (the drawing is an ice cube). Never offered with nieva or hace frío. |
| E6 | weather | el termómetro | thermometer | 🌡 (drawing: wx-thermometer, new) | no | needs one: "el termómetro" | The weather tool Weather Watch teaches. Never offered with hace calor, hace frío or hace fresco (a thermometer tells all three). |
| E7 | weather | el impermeable | raincoat | 🧥 (drawing: wx-raincoat, new) | no | needs one: "el impermeable" | What you wear when it rains (Mexico and most of Latin America). The drawing is a yellow coat with a hood and drops beside it. Never offered with llueve. |
| E8 | weather | el charco | puddle | 💧 (drawing: wx-puddle, new) | no | needs one: "el charco" | A puddle to jump in. Never offered with llueve or la lluvia (drops in all three pictures). |
| E9 | weather | el muñeco de nieve | snowman | ⛄ (drawing: snowman, the app's own) | no | needs one: "el muñeco de nieve" | Snowman, with the snowman drawing the app already has. Never offered with nieva or hace frío. |
| E10 | weather | los lentes de sol | sunglasses | 😎 (drawing: wx-sunglasses, new) | no | needs one: "los lentes de sol" | Mexican Spanish, like la chamarra and el papalote in the app (Spain says las gafas de sol). Never offered with hace sol, hace calor or hace buen tiempo. |
| E11 | weather | hace buen tiempo | the weather is nice | 🌤 (drawing: wx-fair, new) | yes | needs one: "hace buen tiempo" | The everyday phrase for nice weather, said like the other hace phrases. A sun with a cloud could be read as other weather, so the English shows under its picture (as for hace calor). Never offered with hace sol, hace calor, hace fresco, está nublado or los lentes de sol. |

## Spanish: new words in the unit Feelings (`es_feel`)

Added at the end of the unit, after sorprendido / sorprendida. The unit gets English under the picture for the four words whose picture
alone is not enough (it had none before).

| # | Unit | Spanish | English | Picture | English under picture | Recording | Why |
|---|---|---|---|---|---|---|---|
| E12 | feel | contento / contenta | glad | 😄 | no | needs one: "contento, contenta" | Glad: close to feliz, so never offered with feliz, emocionado, tranquilo, cariñoso, orgulloso or tengo hambre. |
| E13 | feel | nervioso / nerviosa | nervous | 😬 | no | needs one: "nervioso, nerviosa" | Nervous, as on a first day of school. Never offered with asustado, preocupado or tímido. |
| E14 | feel | preocupado / preocupada | worried | 😟 | no | needs one: "preocupado, preocupada" | Worried. Never offered with asustado, triste, nervioso or confundido. |
| E15 | feel | aburrido / aburrida | bored | 😒 | no | needs one: "aburrido, aburrida" | Bored. Never offered with enojado or cansado (the faces are close). |
| E16 | feel | tímido / tímida | shy | 😳 | no | needs one: "tímido, tímida" | Shy (the blushing face). Never offered with sorprendido, asustado or nervioso. |
| E17 | feel | confundido / confundida | confused | 😕 | no | needs one: "confundido, confundida" | Confused, a word children need when they do not understand. Never offered with triste or preocupado. |
| E18 | feel | cariñoso / cariñosa | loving | 🥰 | no | needs one: "cariñoso, cariñosa" | Loving, kind and cuddly (the face with hearts). Never offered with feliz or contento. |
| E19 | feel | orgulloso / orgullosa | proud | 🏆 | yes | needs one: "orgulloso, orgullosa" | Proud of something you did. No face shows pride clearly, so the picture is a trophy with the English under it. Never offered with feliz, contento, emocionado or valiente. |
| E20 | feel | valiente | brave | 🦸 | yes | needs one: "valiente" | Brave. One form for a boy or a girl, like feliz and triste. The picture is a superhero with the English under it. Never offered with orgulloso. |
| E21 | feel | tengo hambre | I am hungry | 😋 | yes | needs one: "tengo hambre" | I am hungry: a phrase children use every day; the Spanish stories already say "Yo tengo hambre." The English shows under the picture (the face could read as yummy). Never offered with feliz or contento (smiling faces). |
| E22 | feel | tengo sed | I am thirsty | 🥤 | yes | needs one: "tengo sed" | I am thirsty: also in the Spanish stories. The picture is a drink with the English under it. |

## Pairs never offered together (confuse)

Added to each unit's own list (the weather unit already has five pairs, the feelings unit two). A question never shows both words of a pair
as choices, so it always has one right answer.

| # | Unit | Word | Never with |
|---|---|---|---|
| C1 | weather | llueve | lluvia |
| C2 | weather | hay tormenta | lluvia |
| C3 | weather | está nublado | lluvia |
| C4 | weather | lluvia | charco |
| C5 | weather | llueve | charco |
| C6 | weather | llueve | impermeable |
| C7 | weather | hay tormenta | relámpago |
| C8 | weather | está nublado | niebla |
| C9 | weather | hace viento | tornado |
| C10 | weather | hay tormenta | tornado |
| C11 | weather | nieva | muñeco de nieve |
| C12 | weather | hace frío | muñeco de nieve |
| C13 | weather | nieva | hielo |
| C14 | weather | hace frío | hielo |
| C15 | weather | hace calor | termómetro |
| C16 | weather | hace frío | termómetro |
| C17 | weather | hace fresco | termómetro |
| C18 | weather | hace sol | hace buen tiempo |
| C19 | weather | hace calor | hace buen tiempo |
| C20 | weather | hace fresco | hace buen tiempo |
| C21 | weather | está nublado | hace buen tiempo |
| C22 | weather | hace sol | lentes de sol |
| C23 | weather | hace calor | lentes de sol |
| C24 | weather | hace buen tiempo | lentes de sol |
| C25 | feel | feliz | contento / contenta |
| C26 | feel | emocionado / emocionada | contento / contenta |
| C27 | feel | tranquilo / tranquila | contento / contenta |
| C28 | feel | feliz | cariñoso / cariñosa |
| C29 | feel | contento / contenta | cariñoso / cariñosa |
| C30 | feel | asustado / asustada | nervioso / nerviosa |
| C31 | feel | preocupado / preocupada | nervioso / nerviosa |
| C32 | feel | asustado / asustada | preocupado / preocupada |
| C33 | feel | triste | preocupado / preocupada |
| C34 | feel | enojado / enojada | aburrido / aburrida |
| C35 | feel | cansado / cansada | aburrido / aburrida |
| C36 | feel | sorprendido / sorprendida | tímido / tímida |
| C37 | feel | asustado / asustada | tímido / tímida |
| C38 | feel | nervioso / nerviosa | tímido / tímida |
| C39 | feel | triste | confundido / confundida |
| C40 | feel | preocupado / preocupada | confundido / confundida |
| C41 | feel | feliz | orgulloso / orgullosa |
| C42 | feel | contento / contenta | orgulloso / orgullosa |
| C43 | feel | emocionado / emocionada | orgulloso / orgullosa |
| C44 | feel | valiente | orgulloso / orgullosa |
| C45 | feel | feliz | tengo hambre |
| C46 | feel | contento / contenta | tengo hambre |

## Every line a child sees or hears with each word

The lines come from the unit's question types, which are not new (R-01s); only the word in them is. Level 1 ("Tap the picture", listen) says
the Spanish and shows three pictures; its hint replays the Spanish slowly. Level 2 ("Read", the picture and three written words) has the same
lines for every word, below. The learn screen shows each card with the Spanish and the English, and says both.

### Level 1 (listen) and the learn card, per word

| # | Unit | Spanish (shown) | Shown on screen | Said in Spanish | Hint (shown and said, the Spanish said slowly) | Learn card (both said: the Spanish, and the English) |
|---|---|---|---|---|---|---|
| L1 | weather | la lluvia | Tap the picture for “la lluvia” | la lluvia | Listen again, slowly: “la lluvia”. Which picture is it? | la lluvia (English: rain) |
| L2 | weather | el relámpago | Tap the picture for “el relámpago” | el relámpago | Listen again, slowly: “el relámpago”. Which picture is it? | el relámpago (English: lightning) |
| L3 | weather | la niebla | Tap the picture for “la niebla” | la niebla | Listen again, slowly: “la niebla”. Which picture is it? | la niebla (English: fog) |
| L4 | weather | el tornado | Tap the picture for “el tornado” | el tornado | Listen again, slowly: “el tornado”. Which picture is it? | el tornado (English: tornado) |
| L5 | weather | el hielo | Tap the picture for “el hielo” | el hielo | Listen again, slowly: “el hielo”. Which picture is it? | el hielo (English: ice) |
| L6 | weather | el termómetro | Tap the picture for “el termómetro” | el termómetro | Listen again, slowly: “el termómetro”. Which picture is it? | el termómetro (English: thermometer) |
| L7 | weather | el impermeable | Tap the picture for “el impermeable” | el impermeable | Listen again, slowly: “el impermeable”. Which picture is it? | el impermeable (English: raincoat) |
| L8 | weather | el charco | Tap the picture for “el charco” | el charco | Listen again, slowly: “el charco”. Which picture is it? | el charco (English: puddle) |
| L9 | weather | el muñeco de nieve | Tap the picture for “el muñeco de nieve” | el muñeco de nieve | Listen again, slowly: “el muñeco de nieve”. Which picture is it? | el muñeco de nieve (English: snowman) |
| L10 | weather | los lentes de sol | Tap the picture for “los lentes de sol” | los lentes de sol | Listen again, slowly: “los lentes de sol”. Which picture is it? | los lentes de sol (English: sunglasses) |
| L11 | weather | hace buen tiempo | Tap the picture for “hace buen tiempo” | hace buen tiempo | Listen again, slowly: “hace buen tiempo”. Which picture is it? | hace buen tiempo (English: the weather is nice) |
| L12 | feel | contento / contenta | Tap the picture for “contento / contenta” | contento, contenta | Listen again, slowly: “contento / contenta”. Which picture is it? | contento / contenta (English: glad) |
| L13 | feel | nervioso / nerviosa | Tap the picture for “nervioso / nerviosa” | nervioso, nerviosa | Listen again, slowly: “nervioso / nerviosa”. Which picture is it? | nervioso / nerviosa (English: nervous) |
| L14 | feel | preocupado / preocupada | Tap the picture for “preocupado / preocupada” | preocupado, preocupada | Listen again, slowly: “preocupado / preocupada”. Which picture is it? | preocupado / preocupada (English: worried) |
| L15 | feel | aburrido / aburrida | Tap the picture for “aburrido / aburrida” | aburrido, aburrida | Listen again, slowly: “aburrido / aburrida”. Which picture is it? | aburrido / aburrida (English: bored) |
| L16 | feel | tímido / tímida | Tap the picture for “tímido / tímida” | tímido, tímida | Listen again, slowly: “tímido / tímida”. Which picture is it? | tímido / tímida (English: shy) |
| L17 | feel | confundido / confundida | Tap the picture for “confundido / confundida” | confundido, confundida | Listen again, slowly: “confundido / confundida”. Which picture is it? | confundido / confundida (English: confused) |
| L18 | feel | cariñoso / cariñosa | Tap the picture for “cariñoso / cariñosa” | cariñoso, cariñosa | Listen again, slowly: “cariñoso / cariñosa”. Which picture is it? | cariñoso / cariñosa (English: loving) |
| L19 | feel | orgulloso / orgullosa | Tap the picture for “orgulloso / orgullosa” | orgulloso, orgullosa | Listen again, slowly: “orgulloso / orgullosa”. Which picture is it? | orgulloso / orgullosa (English: proud) |
| L20 | feel | valiente | Tap the picture for “valiente” | valiente | Listen again, slowly: “valiente”. Which picture is it? | valiente (English: brave) |
| L21 | feel | tengo hambre | Tap the picture for “tengo hambre” | tengo hambre | Listen again, slowly: “tengo hambre”. Which picture is it? | tengo hambre (English: I am hungry) |
| L22 | feel | tengo sed | Tap the picture for “tengo sed” | tengo sed | Listen again, slowly: “tengo sed”. Which picture is it? | tengo sed (English: I am thirsty) |

### Level 2 (read) and the screens around, the same for every word

| # | Where | Line |
|---|---|---|
| G1 | Level 2 question | How do you say it in Spanish? |
| G2 | Level 2 hint (shown; the three Spanish choices are said) | Say each word out loud. Which word names the picture? |
| G3 | Learn screen, all cards recorded (said) | Tap each card to hear it in English and Spanish! |
| G4 | Learn screen, a card not recorded (said) | Tap a card to hear it in Spanish. Tap it again for English! |
| G5 | Learn screen, every card heard | ¡Muy bien! Tap ¡Vamos! |
| G6 | After an answer (said in Spanish) | the word as shown in the Spanish column |

## New drawings

Object art in the app's style (DESIGN_SYSTEM.md 6.5: 64 grid, light from the top left, shade, base and highlight of one hue, `var(--a-x)`
roles only, no outlines, faces or text). They are named `wx-*` so no other picture in the app changes (Discover's rain cloud and ice keep
their emoji); a later change could share them. Review sheet: `docs/drafts/ES-MORE-ART.png` (each at 24, 48 and 96 px, on white and on a tint, beside the app's storm, snowman and umbrella).

| # | Drawing | For | What it shows |
|---|---|---|---|
| A1 | wx-rain | la lluvia | a grey cloud with five blue drops |
| A2 | wx-lightning | el relámpago | one big yellow lightning bolt |
| A3 | wx-fog | la niebla | a pale cloud behind four grey bands of fog |
| A4 | wx-tornado | el tornado | a grey funnel of bands with dust at the bottom |
| A5 | wx-ice | el hielo | a blue ice cube with glints and a little melt water |
| A6 | wx-thermometer | el termómetro | a white tube with a red bulb and ticks |
| A7 | wx-raincoat | el impermeable | a yellow coat with a hood, blue toggles and rain drops beside it |
| A8 | wx-puddle | el charco | a blue puddle on the grass with rings and drops falling in |
| A9 | wx-sunglasses | los lentes de sol | red sunglasses with dark lenses |
| A10 | wx-fair | hace buen tiempo | a sun with a small white cloud |

## Owner decisions

| # | Question | Draft choice |
|---|---|---|
| Q1 | Record the 22 words before turning them on (about 55 KB of the audio budget)? | Yes: without recordings the Weather and Feelings learn screens switch to one language per tap. |
| Q2 | Re-pin the speaking check (S-SPK2) once they are recorded? | Needed then: its calibration sample is every recorded line. |
| Q3 | Feelings pictures are emoji faces (the object-art rules allow faces only on animals, the sun and the star). New emoji on the allow list: 😬 😟 😒 😳 😕 🥰 🦸 (none newer than Unicode 11). | Emoji, as the nine feelings already there. |
| Q4 | Proud, brave, hungry and thirsty show their English under the picture (trophy, superhero, yummy face, drink). | Yes, as hace calor does. |
| Q5 | los lentes de sol (Mexico) or las gafas de sol (Spain)? | los lentes de sol, like la chamarra and el papalote. |
| Q6 | tengo hambre and tengo sed are phrases in a unit of adjectives (the app's stories already use them). | Keep: children say them every day. |
