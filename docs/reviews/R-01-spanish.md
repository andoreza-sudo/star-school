# R-01 Spanish: teaching and engagement review

Review of the whole Spanish section ("Spanish Adventure"), all 8 Spanish worlds (Hola Plaza to Los Cuentos, 61 stops plus 8 bosses),
as of v135 (7dcfebe). Spanish is taught as a second language to English-speaking children from Pre-K to 6th grade.
Written 2026-11-11 by Claude for Andy. No app changes were made.

**Status (R-01s, v138, 2026-11-11):** done: Must 1, 2, 3 and the S-sized Shoulds 8 to 13 (marked "Done in R-01s" below).
Not done yet: Must 4 (days and months listening, M), Must 5 (Pre-K and K reading stops, M), Should 6 (sentences from world 1, L),
7 (speaking, M), 14 (review of later units, near-miss numbers and times, M), 15 (culture, M), 16 (pictures, M), 17 (more dialogues, M),
and the Could items 18 to 21.

---

## Part 1. For parents: the short version

### What works well

- **The Spanish itself is clean.** I read every Spanish word, phrase, sentence and dialogue line in the app (602 strings). Accents, ñ,
  and the opening ¿ and ¡ marks are right everywhere; every noun has the right el or la (55 grammar nouns plus all unit nouns); plurals
  (lápiz to lápices, avión to aviones, pez to peces) and adjective agreement (la casa blanca, las botas negras, Ella está enojada) are correct.
  I found no wrong answer key anywhere.
- **It looks and sounds like a real course.** 21 word units (235 words) with a picture each, then phrases, first grammar (el/la, un/una,
  plurals, ser, estar, tener, me gusta), sentence building and 12 short dialogues. That matches the ACTFL "Novice" range the curriculum
  aims for, and the order (words, then phrases, then sentences, then little conversations) is sensible.
- **Every Spanish word is spoken by a Spanish voice.** I checked every spoken string in play: Spanish goes to a Mexican Spanish voice
  (es-MX), English to an English voice, never mixed. A word is said again after a right answer. Each unit opens with a "Let's learn!"
  screen of picture cards to tap and hear before any question. When a tablet has no Spanish voice, the word is shown big instead and a
  grown-up note explains how to add one.
- **The grammar hints teach a rule** ("Spanish says 'I have hunger' where English says 'I am hungry'"; "Is it one thing or more than one?
  The verb has to match"), and the dialogue hints point at the line to re-read ("Read the fourth line again. Which word tells how
  someone is?") without giving the answer.
- **Los Cuentos is the best part.** Short dialogues built only from words the child already knows (this is "comprehensible input", the
  core of modern language teaching), with every line tappable to hear, and the same dialogue asked first in English, then in Spanish with
  picture answers, then all in Spanish. That is a well-built ladder.
- **Missed words come back.** The app's spaced review (a missed question returns after 0, 1, 3, 7 and 21 days) works for Spanish, rounds
  mix in questions from older stops, and every world ends with a boss round. A child who already knows Spanish can "Test out!" of a world.

### What to improve, in priority order

Sizes: **S** = an hour or two, **M** = about a day, **L** = several days.

**Must fix**
1. **Weather and Feelings have questions with two right answers (S).** Weather pictures carry no English label, so a sun picture with
   "hace sol" (sunny) and "hace calor" (hot) both offered has two right answers, a snowflake with "nieva" (it snows) and "hace frío"
   (cold) too, and a plain green leaf for "hace fresco" (it is cool) next to "hace viento" (windy) cannot be told apart at all. In Feelings
   the "calm" face and the "happy" face are almost the same smile. About 2 to 3 in 100 questions of each skill. Weather (`es_weather` 1-2)
   and Feelings (`es_feel` 1-2) in El Tiempo and La Casa; `src/data/d-es.js`. Seeds in Part 2.
   **Done in R-01s (v138):** never offered together: hace sol / hace calor, nieva / hace frío, hace fresco / hace viento, feliz / tranquilo, feliz / emocionado (a `confuse` list per unit), and el camión / el autobús; "hace calor", "hace frío" and "hace fresco" carry their English under the picture; two dialogue answer lists lost "tranquila" next to "feliz" and "Hace frío" next to "Nieva". tools/test.js scans 2,000 seeds of every Spanish skill and level.
2. **An English spelling mistake and a grammar slip on screen and in the voice (S).** "Un, Una & Plurals" asks "How do you say
   'the beachs'?" and the voice says "More than one dogs!", "More than one beachs!" for every plural question. `es_art` 2 in Las Frases,
   `genEsArt` in `src/js/34-gen-es.js`.
   **Done in R-01s (v138):** "the beaches" on screen, and the voice says "More than one beach! How do you say the beaches?" (one helper, `enPlural`, for both); tools/test.js scans every English text of the Spanish section for wrong plurals.
3. **One dialogue line is not correct Spanish (S).** Grandma says "Aquí está agua." Spanish needs "Aquí tienes agua." (or "Aquí está el
   agua."). The dialogue is meant to be the model a child copies. "At grandma's house", Los Cuentos, `src/data/d-es-story.js`.
   **Done in R-01s (v138):** "Aquí tienes agua."
4. **Days and Months "listening" cannot be done by listening (M).** All seven days show the same calendar picture (which says "July 17"),
   and all twelve months show the same calendar, so in 82% of "Days: Listen" and 87% of "Months: Listen" questions the only difference
   between the pictures is an English word printed under them. A child who cannot read English yet cannot do it, and an older child is
   matching Spanish to English, not to meaning. Also "mañana" (tomorrow) is shown as a sunrise, the same picture as "buenos días", which
   teaches the other meaning of "mañana" (morning). `es_days` 1, `es_months` 1, El Tiempo; `src/data/d-es.js`.
5. **Pre-K and Kindergarten children hit silent reading stops in the first world (M).** The Spanish path is the same for every grade.
   Stop 5 of Hola Plaza ("¡Hola! Read") already asks the child to read Spanish words; the "Read" stops say nothing aloud, and their help
   ("It starts with 'B'") is written only. Young children should learn a new language by ear first; the curriculum itself says Pre-K
   Spanish is "listening only". `es_*` level 2 stops in every world; `genEs` in `34-gen-es.js`, path order in `42-paths.js`.

**Should fix**
6. **Lots of words, little language, for a long time (L).** The first six worlds teach 235 single words (and "por favor", "hace sol")
   before the child hears a single sentence about them. The verbs and patterns children need most ("es", "está", "tiene", "hay",
   "quiere", "me gusta") only arrive in world 7. Language sticks when words come in meaningful sentences and stories from the start. Add a
   short listen-and-point sentence question to every unit ("El perro es grande." with three pictures; "¿Dónde está el gato?") and move a
   few phrases into Hola Plaza.
7. **No speaking practice at all (M).** The child never says anything in Spanish: no "say it after me", no record-and-listen, no prompt
   to answer out loud. Speaking does not need speech recognition: a "Say it! Then tap to check" step on the learn screen, or recording the
   child's voice on the tablet and playing it next to the model, would work offline.
8. **The first 85 nouns have no "el" or "la" (S to M).** Hola Plaza and Fiesta Island teach "perro", "manzana", "leche" bare, while later
   worlds teach "la casa", "el libro". Children should learn every noun with its article from the first day; gender is much harder to add
   later. `src/data/d-es.js` (the first 8 units).
   **Done in R-01s (v138):** the 37 nouns of Animals, Food, My Body and Family show and say el / la / los / las (el agua, la mano, los ojos, las uvas). Greetings, colours and numbers are not nouns and stay as they are.
9. **Hints that give the answer away (S).** In every "Read" stop the help says "It starts with 'C'", which picks out the answer in 80% of
   questions, and refers to the word after "la", not to the first letter the child sees ("la cocina"). In "Listen" stops the help says
   "'buenas noches' means 'Good night'", and since greetings, places, verbs and opposites show the English under each picture, that is the
   answer. Better: replay the word slowly, then take one wrong picture away.
   **Done in R-01s (v138):** listening stops replay the word slowly (0.75 of the speed) with no English meaning; reading stops read the three choices aloud ("Say each word out loud. Which word names the picture?"), with no first letter.
10. **Words that mean something else in Mexico, with no note (S).** The app uses a Mexican voice and Mexican words, but teaches "la
    chaqueta" for jacket: in Mexico that word is also vulgar slang that children giggle at, and the everyday word is "la chamarra". "El
    camión" (truck) is the everyday word for "bus" in Mexico, "el borrador" (eraser) is usually "la goma", and "Me gusta el cerdo" reads
    as "I like pork". Pick the Mexican word or show both, with a small note.
   **Done in R-01s (v138):** la chamarra (not la chaqueta), la goma (not el borrador), "el camión" glossed "truck (in Mexico, also a bus)" and never offered with el autobús, and animals are liked in the plural only ("Me gustan los cerdos"; level 1 of Me Gusta asks food).
11. **Small Spanish and logic slips in the dialogues (S).** "¿Tienes un animal?" (say "¿Tienes una mascota?"); Grandpa says "I am very
    old!" and Sofía answers "No, Grandpa. You are very kind." (does not follow); "¿Qué animal hay en el libro?" answered with two
    animals; "Estás en la biblioteca." (tells Carlos where he is). The English question "What does Mateo have?" with the answer "He is
    thirsty." reads oddly.
   **Done in R-01s (v138):** "¿Tienes una mascota, Pablo?", "No, abuelo. ¡Eres muy rápido!", "¿Qué animales hay en el libro?", "¡Hola, Carlos! ¿Estás en la biblioteca?", "How does Mateo feel?", and the park dialogue is titled "A phone call from the park".
12. **Mixed messages on ser and estar, and only boy forms of feelings (S).** "Estar: How & Where" teaches "Yo estoy feliz" (feelings use
    estar), then "Build a Sentence" builds "Yo soy feliz." and "Ella es feliz." Both are correct Spanish, but the child is not told why.
    The Feelings unit teaches only "cansado", "enojado", "asustado"; a girl says "cansada", which the app first shows in a dialogue.
   **Done in R-01s (v138):** Feelings show and say both forms ("cansado / cansada"); Build a Sentence uses ser with traits only ("Ella es alta.", "Yo soy inteligente."), so feelings are always estar.
13. **Sentence building does not test the rule it teaches (S).** The first tile always has the capital letter and the last always has the
    full stop, so in "El gato es negro." the adjective is pinned at the end by the dot; the child only has to order the two middle tiles.
    The help says "a describing word comes after the thing it describes", which the tiles never test.
   **Done in R-01s (v138):** the tiles are lower case (a name keeps its capital) and the dot sits after the last slot, so no tile is pinned; tools/test.js still finds one valid order for every sentence (articles must agree with their noun).
14. **Too little review of later units, and easy wrong choices (M).** The "Big Review" world covers only the first 8 units; the 13 later
    units (house to opposites) have no mixed review. In "Read Big Numbers" and "Read the Time" the answer is the only choice with "y"
    in 40% of questions, so the child can pick it by length. Compound numbers and half and quarter past are only ever read, never heard.
15. **No culture (M).** Apart from Spanish names and "Yo soy de México / Colombia / Perú / Chile / Texas", there is nothing about the 20
    Spanish-speaking countries, their food, festivals, songs or games. A short "Did you know?" card per world and a map would add the
    "Cultures" goal of US language standards, and help avoid a tacos-and-piñatas picture (the path's emoji is a taco).
16. **Pictures (M).** Several pictures do not show the word: "bajo" (short) is a down arrow, "la clase" a bell, "el borrador" a sponge,
    "el mercado" a carrot, "sucio" (dirty) a trash can, "pequeño" in a dialogue an ant. In greetings the English label overlaps the
    picture. The listening card is a large empty white box with an emoji speaker.
17. **Twelve dialogues for three stops (M).** Los Cuentos reuses the same 12 dialogues at all three levels, so by level 3 a child may
    remember the answers. There is no button to hear the whole dialogue in one go.

**Could do**
18. On the learn screen, say Spanish first and again after the English ("perro... dog... perro"); add a slower "turtle" replay; act out
    the verbs (jump, run, sleep) on screen (S to M).
19. Call el and la words "el words" and "la words" rather than "boy words" and "girl words" (a table is not a boy); finish the plural
    hint (z changes to c: lápiz, lápices; the accent goes: avión, aviones) (S).
20. Record a real Spanish speaker for the 235 unit words and the 52 dialogue lines; text-to-speech quality varies a lot between tablets
    (M to L).
21. Generate any number 21 to 99 (the curriculum asks for it; today there are 10 fixed ones) and add "menos cuarto" (S).

---

## Part 2. Detailed findings

### 2.1 How the review was done

- **Read**: ROADMAP R-01, CURRICULUM sections 2.3, 5 and 7 (Spanish), the PROGRESS entries for P2-30 to P2-35, R-01 Math and R-01 Reading
  (for format), and the code: `src/js/34-gen-es.js`, `12-speech.js` (`esVoiceMode`, `esQFix`, `say`), `37-bank.js` (`bankCtx`, the
  dialogue panel), `42-paths.js` (the 8 Spanish worlds), `46-home.js` (`open`, `learn`), `59-review.js` (spaced review), `52-balloons.js`,
  `54-race.js`, `66-colornum.js` (Spanish colours), `82-bt-memory.js` (Spanish pairs), and the data `src/data/d-es.js`, `d-es-gram.js`,
  `d-es-story.js`.
- **Read every Spanish item** (602 strings, all NFC): 235 unit words in 21 units with their glosses, pictures and articles; 13 phrases;
  9 question-and-reply sets; 55 grammar nouns with plurals; 49 ser/estar/tener sentences; 21 "me gusta" nouns; 38 build-a-sentence
  sentences; 12 dialogues (52 lines) and their 36 questions with every right and wrong answer. A script also scanned for missing accents
  (está, qué, cómo, dónde, aquí, también, tú/tu, él/el), unpaired ¿ ¡ and spacing: none found.
- **Generated**: 3,000 to 6,000 seeded questions per Spanish skill and level (28 skills, 61 levels; `genQ(sk, lv, seed)` with the code
  loaded as tools/test.js does). Checks: one right answer; confusable pairs among the choices (sun/hot, snow/cold, leaf/wind, happy/calm,
  maestra/maestro, mañana/hoy ...); identical pictures among the choices; whether the level 2 hint letter identifies the answer; whether the
  answer is the only "y" phrase; every wrong reply in `es_phrase` 2 (none fits the question); every wrong plural form in `es_art` 2; the
  spoken strings of `es_art` 2; duplicate pictures among dialogue answers.
- **Played** in the built app (index.html, v135) with Playwright and Chromium at 380x780 and 1024x600, deviceScaleFactor 2, using the round
  engine with a seeded question per stop (`G = newG({sk, lv, n: 1, pool: [genQ(sk, lv, seed)]}); next()`), the world maps and the learn
  screen, wrong answers to open the hints, and one no-Spanish-voice run. 62 screenshots, all looked at, in the session scratchpad
  `r01-es/` folder (for example `15-tiempo-days1-calendars-380x780.png`, `27-frases-art2-beachs-380x780.png`,
  `42-tiempo-weather2-fresco-viento-380x780.png`, `44-tiempo-weather2-sol-calor-380x780.png`, `45-casa-feel1-tranquilo-feliz-380x780.png`,
  `35-cuentos-abuela-l1-380x780.png`). No console errors; no sideways scroll at either size.
- **Speech**: the headless browser has no voice, so speech was captured by replacing `speechSynthesis.speak` with a recorder and
  `SpeechSynthesisUtterance` with a plain object (the real one rejects a fake voice). Every captured utterance and its `lang` was checked:
  Spanish text always went out as `es-MX` and English as `en-US` (for example `es-MX: ¿Quién dice "Eres muy amable"?`,
  `en-US: I am happy.`, `en-US: More than one beachs!`). Level 2 ("Read") questions say nothing.

**Wrong answers found**: none. No answer key in the Spanish section is wrong. The items that must be fixed are two-right-answer or
unanswerable questions and incorrect model language:

| Skill, level | Seed | Item | Problem |
|---|---|---|---|
| es_weather 2 | 19 | sun picture: hace calor / **hace sol** / hay tormenta | "hace calor" (it is hot) also fits a sun (2.2% of items) |
| es_weather 2 | 38 | plain leaf: hace viento / hace frío / **hace fresco** | A leaf shows neither "cool" nor rules out "windy" (2.3%) |
| es_weather 1 | 38 | hear "hace fresco": leaf / wind / ... | Same pair by ear: the leaf and the wind gust both look windy |
| es_weather 1-2 | 13 | snowflake for **nieva** with "hace frío" offered | Snow also means cold (2.3%) |
| es_feel 1-2 | 41 | hear "tranquilo": 😊 / 🤒 / 😌 | Calm and happy faces nearly identical (2.8%); also seed 2, "emocionado" with "feliz" (2.6%) |
| es_art 2 | 112 | "How do you say 'the beachs'?" | English misspelling on screen and spoken; every plural item is spoken as "More than one dogs!" |
| es_story 1-3 | 14 (L1), 77 (L3) | line "Aquí está agua." | Not correct Spanish ("Aquí tienes agua." / "Aquí está el agua.") |
| es_days 1, es_months 1 | 4 (days), 1 (months) | ◀ yesterday / 📅 Thursday / 📅 Saturday | Two identical pictures, only the English caption differs (82% days, 87% months) |

### 2.2 Evidence base used

| Practice | Source | What it asks of an app |
|---|---|---|
| Comprehensible input | Krashen 1982, *Principles and Practice in Second Language Acquisition*; Lightbown & Spada 2013, *How Languages Are Learned* (4th ed.) | Lots of understandable listening and reading, meaning first |
| The four strands | Nation 2007, "The four strands" (*Innovation in Language Learning and Teaching* 1:1); Nation 2013, *Learning Vocabulary in Another Language* (2nd ed.) | About equal time on meaning-focused input, meaning-focused output, language-focused study and fluency |
| High-frequency words and chunks first | Nation 2013; Davies & Davies 2018, *A Frequency Dictionary of Spanish* (2nd ed.); Wray 2002, *Formulaic Language and the Lexicon* | Teach the most frequent verbs and set phrases early, in chunks ("me gusta", "hay", "quiero") |
| Young learners: oral first, literacy after | Cameron 2001, *Teaching Languages to Young Learners*; Pinter 2017, *Teaching Young Language Learners* (2nd ed.); Muñoz 2006, *Age and the Rate of Foreign Language Learning* | Pre-K to 1st: listening, songs, actions; L2 print after L1 reading has started |
| Total Physical Response | Asher 1969 (*Modern Language Journal* 53) | Listen and act or point before speaking |
| Grammar through input | VanPatten 2004, *Processing Instruction*; Ellis 2005, "Principles of instructed language learning" (*System* 33) | Structured input where the form carries the meaning; focus on form inside meaningful tasks |
| Output | Swain 1985 (in Gass & Madden, *Input in SLA*); Swain 2005 | Learners must also produce language, even short phrases |
| Corrective feedback | Lyster & Ranta 1997 (*SSLA* 19); Lyster & Saito 2010 (*SSLA* 32) | Prompts that make the learner retry beat giving the answer |
| Retrieval and spacing | Karpicke & Roediger 2008 (*Science* 319); Cepeda et al. 2006 (*Psychological Bulletin* 132); Kang 2016 (*Policy Insights from the BBS* 3) | Recall over recognition; spaced, mixed review of all units |
| Dual coding, pictures | Paivio 1986, *Mental Representations*; Mayer 2009, *Multimedia Learning* | A picture must show the meaning, not a loose association |
| Pronunciation models | Saito & Plonsky 2019 (*Language Learning* 69); Thomson 2018 (high-variability phonetic training, *JSLP* 4) | Clear models, several voices, chances to imitate and compare |
| L1 support | Butzkamm & Caldwell 2009, *The Bilingual Reform* | "Sandwich": L2, L1, L2 |
| Standards | ACTFL Proficiency Guidelines 2012; NCSSFL-ACTFL Can-Do Statements 2017; *World-Readiness Standards for Learning Languages* (2015) | Novice Low to Novice High can-dos; the 5 Cs (Communication, Cultures, Connections, Comparisons, Communities) |
| Heritage and regional variety | Montrul 2016, *The Acquisition of Heritage Languages*; RAE/ASALE 2010 *Ortografía* | Respect regional words, label them; many US classmates speak Spanish at home |

### 2.3 Coverage against the standards (ACTFL Novice, World-Readiness 5 Cs)

Present and good: Novice Low/Mid vocabulary (greetings, colours, numbers to 100, animals, food, body, family, house, clothes, school,
feelings, days, months, seasons, weather, time, places, transport, verbs, adjectives); recognising memorised phrases and answering simple
questions (`es_phrase`, `es_story` reply questions); interpretive reading of short dialogues (`es_story`); first grammar in context.

| Can-do / standard | Status | Suggested home |
|---|---|---|
| Interpersonal: "I can greet and leave people", "answer simple questions about myself" (spoken) | Recognition only; the child never says anything | Should 7 (say-it step, record and compare) |
| Presentational speaking ("I can say my name, age, likes") | Missing | A "Tell about you" stop in Las Frases, recorded |
| Presentational writing ("I can write lists, labels, simple sentences") | Spell level 3 for 30 words; tiles for 38 sentences | Spell stops for more units; type a whole short sentence |
| Interpretive listening of connected speech | Single words; dialogue lines one at a time | Should 6 (sentences in every unit), "Hear the whole story" |
| Cultures, Comparisons (World-Readiness) | Missing (names and countries only) | Should 15 |
| Connections, Communities | Missing | A few cross-subject items (numbers in math, animals in science); songs |
| Numbers 21-99 "any number" (CURRICULUM S-units) | 10 fixed numbers | Could 21 |

### 2.4 Findings by world

Each finding names the skill and level, the file, and a sample (seed, as `genQ(sk, lv, seed)`).

#### Hola Plaza: es_greet 1, es_color 1, es_num 1, es_animal 1, es_greet 2, es_color 2, es_num 2, es_animal 2

- **Strong**: the learn screen (screenshot `02-plaza-learn-animal`) shows each picture with the Spanish in big blue and the English
  small, taps say English then Spanish; colours are swatches, numbers numerals, animals drawn. Level 1 says the word in Spanish
  (`es-MX: pato`), auto-plays it, and after a right answer says it again. Good first contact (Asher 1969; Cameron 2001).
- **Level 1 is not pure listening.** The prompt prints the word ("Tap the picture for 'pato'", screenshot `03-plaza-animal1`), so a
  reading child can match spelling to picture without listening. Should: show the word only after the answer or on Help; offer the
  printed word as a scaffold the second time.
- **Reading in the first world (Must 5).** Stops 5-8 are "Read" stops (`genEs` level 2): a picture, three Spanish words, no sound, a
  text hint. For a 4-6 year old this is a wall. Spanish spelling also clashes with early English phonics (Spanish "e" is /e/, "i" is /i/,
  "j" is /h/), which is one reason young-learner guides put L2 print after L1 reading has begun (Cameron 2001, ch. 6). Fix: for grade
  PK-K let the path skip or postpone level 2 stops (or read the three choices aloud on tap), and keep reading for 2nd grade up.
- **Hints (Should 9).** `es_greet` 1 seed 1: wrong tap on "Thank you" gives "'buenas noches' means 'Good night'", while the right card
  is captioned "Good night" (screenshot `04-plaza-greet1-hint`). The hint is the answer. `es_greet` 2 seed 6: "It starts with 'B'"
  with buenos días / buenas noches / sí (screenshot `05-plaza-greet2-buenosdias-hint`): here it narrows to two, but across all
  units the first letter alone identifies the answer in 80% of level 2 items (greet 92%, food 92%, adj 95%, months 93%). Text only, not
  spoken.
- **No articles (Should 8).** "perro", "gato", "manzana" are taught bare in the first 8 units (85 words); from La Casa on, nouns show
  "la casa". When adding them, note "el agua" (feminine noun with el) and "el/la bebé". Adding articles changes these units' questions;
  the P2-30 old-stops hash in test.js would need a recorded update.
- **Pictures**: "adiós" is a walking person, "por favor" a pleading face; acceptable with the caption. In greetings the caption overlaps
  the picture at 380 px ("Thank you" over the hands, "Goodbye" over the walker, screenshot `04-plaza-greet1-hint`).
- **Vocabulary**: good high-frequency start. Missing "buenas tardes" (needed to greet after noon) and "¿Qué tal?". "café" for brown is
  right for Mexico (also "marrón" elsewhere); "rosa" (also "rosado") fine.
- **Look**: the listening card is a tall empty white box with an emoji speaker (🔊) plus a second "Hear it" button
  (screenshot `03-plaza-animal1`), flat next to the drawn art elsewhere. One drawn speaker, and a scene or the learn-card picture strip
  in the empty space, would help.

#### Fiesta Island: es_food 1, es_body 1, es_family 1, es_teen 1, then level 2 of each

- Correct items; family uses emoji faces (mamá 👩, abuela 👵) that tell apart well; body is drawn.
- "pie" (foot) is also an English word; the voice says it in Spanish, fine.
- "uvas" and "ojos" are plurals in a list of singulars with no article; with articles ("las uvas", "los ojos") this becomes visible.
- `es_teen` 2: the first letter gives no help (all start with "d" from 16 to 19): the hint "It starts with 'D'" is useless there (63% unique
  overall).

#### Gran Repaso: es_mix 1-2

- Draws one of the first 8 units at random and then a question from that unit, so the three choices always come from one unit (no
  interleaving across topics inside a question, which is fine), but **only the first 8 units are ever reviewed here** (`mix:1`). The 13
  later units have no Big Review (Should 14). A second review world after La Ciudad, or `mix:1` on the later units with a new skill so
  old seeds do not move, would fix it.

#### La Casa: es_house 1-2, es_clothes 1-2, es_school 1-2, es_feel 1-2, es_house 3, es_clothes 3, es_school 3

- **Strong**: nouns with articles; the spell level with the accent row (ñ á é í ó ú ü ¿ ¡) and the article plus English as the clue
  ("Spell it in Spanish: el ... bathroom", screenshot `13-casa-house3-spell-bano`). The bathtub picture for "el baño" is a good choice.
- **Feelings two-right (Must 1).** `es_feel` 1 seed 41: hear "tranquilo", choices 😊 feliz, 🤒 enfermo, 😌 tranquilo (screenshot
  `45-casa-feel1-tranquilo-feliz`): two closed-eye smiles. Seed 2: "emocionado" (🥳) with "feliz" (😊). Fix: never offer feliz with
  tranquilo or emocionado (a small `confuse` list per unit checked by test.js), or use drawn faces with clearer differences.
- **Feelings only masculine (Should 12).** enojado, cansado, asustado, emocionado, tranquilo, sorprendido. Show both ("cansado /
  cansada") on the learn screen and in the answer; the dialogues later use "cansada", "enojada", "asustada", "tranquila".
- **Regional (Should 10).** `es_clothes` 1 seed 6 "la chaqueta" (screenshot `10-casa-clothes1-chaqueta`): in Mexico the everyday word for a
  jacket is "la chamarra", and "chaqueta" is common vulgar slang; with an es-MX voice and a Mexican-Spanish rule (CURRICULUM S-gram) it
  should be "la chamarra", or both with a note. `es_school` 1 seed 4 "el borrador": Mexico mostly says "la goma" (de borrar). "los
  zapatos" shows a sneaker (Mexico: "los tenis"); fine as "shoes".
- **Pictures**: "la clase" is a bell, "el borrador" a sponge, "la mesa" a plate with cutlery (a drawing of a table is used where ART has
  one; "mesa" uses art `table`). "la maestra"/"el maestro" are the woman/man emoji also used for mamá/papá.
- Spell stops: good. The hint ("It has 6 letters and starts with 'c'") repeats what the slots show; could say the word slowly by
  syllables instead ("co-ci-na").

#### El Tiempo: es_days 1-2, es_months 1-2, es_weather 1-2, es_big 1-2, es_time 1-2

- **Days and months (Must 4).** `es_days` 1 seed 4: hear "ayer", choices ◀ yesterday / 📅 Thursday / 📅 Saturday (screenshot
  `15-tiempo-days1-calendars`): the two calendar pictures are identical and print "July 17". 82% of `es_days` 1 and 87% of `es_months` 1
  questions have two identical pictures. Fix: a week strip with the day's position lit (Monday first, as in Spanish calendars) and a
  12-month strip with the month lit and its season colour; or, better, teach days and months through sentences ("Hoy es lunes",
  "Mi cumpleaños es en mayo") with a calendar to tap.
- **"mañana" as a sunrise** (`es_days` 1 seed 30, screenshot `16-tiempo-days1-manana`): the sunrise is also "buenos días" in Hola Plaza
  and suggests "la mañana" (the morning). Use an arrow forward from a "today" pin, or a calendar with tomorrow lit. `es_days` 1 seed 44
  offers "mañana" and "hoy" together; fine once the pictures differ.
- **Weather two-right (Must 1).** The unit has no `cap`, so pictures stand alone. `es_weather` 2 seed 19: sun → hace calor / hace sol /
  hay tormenta (screenshot `44-tiempo-weather2-sol-calor`). Seed 38: a plain leaf → hace viento / hace frío / hace fresco (screenshot
  `42-tiempo-weather2-fresco-viento`). Seed 13: snowflake for "nieva" with "hace frío". Fix: `cap:1` on the unit, a clear picture per
  phrase (a child in a jacket for "hace fresco", a thermometer for "hace calor"), and a no-pair list (sol/calor, nieva/frío,
  fresco/viento).
- Good: "hace sol", "hace calor", "hace frío" as fixed chunks (Wray 2002). "llueve" and "nieva" are correct; "está lloviendo" is what a
  child hears most in Mexico, and could be added. "el arco iris" is fine (RAE 2010 prefers "arcoíris"; both are accepted).
- **Big numbers**: `es_big` 1 is only the tens (l1:8) by ear; the compound numbers (treinta y cinco) appear only in level 2, as reading.
  Level 2 seed 1: 35 → cuarenta / veintitrés / **treinta y cinco** (screenshot `18-tiempo-big2`): the answer is the only "y" phrase in 39%
  of items. Use near distractors (treinta y cinco / cincuenta y tres / treinta y seis) and add listening for compounds.
- **Time**: clocks are drawn well, the hour hand halfway at 1:30 (screenshot `17-tiempo-time2-ymedia`). Level 1 is on the hour only;
  half and quarter past are only read (level 2), and in 40% of their items the answer is the only "y" phrase (seed 1: son las cuatro /
  **es la una y media** / son las siete). Offer "son las dos y media" next to "son las dos" and "son las dos y cuarto".
- "es la una" vs "son las dos" (singular vs plural) is never explained; one hint line would help.

#### La Ciudad: es_place 1-2, es_trans 1-2, es_verb 1-2, es_adj 1-2

- `cap:1` for places, verbs and adjectives (English under each picture) avoids two-right items, but makes level 1 a Spanish-to-English
  matching task and the level 1 hint a giveaway (Should 9).
- **Verbs as infinitives only** ("correr: to run"). Children use verbs in sentences ("corre", "corro", "¿quieres jugar?"); infinitives
  alone are the least useful form for a Novice. TPR fits perfectly here: an animated child who runs, jumps, sleeps (Asher 1969).
- **Regional (Should 10).** `es_trans` 1 seed 1 "el camión" = truck (screenshot `22-ciudad-trans1-camion`); in Mexico "el camión" is
  also the everyday word for a city bus, and seed 40 offers "el camión" with "el autobús". Add a note ("In Mexico, camión can also mean
  bus."). "beber" (Mexico usually "tomar") is fine for a learner.
- **Pictures (Should 16)**: "bajo" is a down arrow (screenshot `21-ciudad-adj1-bajo`), "sucio" a trash can, "el mercado" a carrot,
  "nuevo" the 🆕 emoji (which prints the English "NEW"), "viejo" an old man (calling a person "viejo" is not polite in Spanish; "old"
  things are a better picture). "la iglesia" is the only religious building; consider neutral places.

#### Las Frases: es_phrase 1-2, es_art 1-2, es_ser 1-3, es_gusta 1-2, es_sent 1-2

- **Strong**: every phrase and reply is natural; `es_phrase` 2 wrong replies never fit (checked every pair: "¿Cómo te llamas?" never
  offers "Mucho gusto" or "Igualmente"). Subject-fixed ser/estar/tener items have one answer, with the English line under the
  sentence and "Hear it" reading the English (`en-US: I am happy.`, screenshot `29-frases-ser2-feliz`). `es_gusta` 1 (screenshot
  `31-frases-gusta1-neg`) is a good structured-input task: the meaning ("no") is carried by the form (VanPatten 2004).
- **English slip (Must 2).** `es_art` 2 seed 112: "More than one! How do you say 'the beachs'?" and the voice says "More than one
  beachs!" (screenshot `27-frases-art2-beachs`). `gEnPl` has no rule for -ch; and `say` is "More than one ${plural}!" so every plural
  item is spoken ungrammatically ("More than one dogs!", seed 1). Fix: say "Lots of dogs!" or "More than one dog!", and add -ch/-sh/-x to
  `gEnPl`.
- **Made-up wrong forms**: plural choices include non-words ("los perroes", "las playaes", "los lápizs", "los avións"). They test the
  rule, but showing many misspelled forms is a known risk for spelling; prefer a real contrast (los perros / las perras is not possible
  for every noun, so "el perro / los perros / las perros" is enough).
- **Plural hint incomplete (Could 19).** "A consonant takes -es" leads to "lápizes" and "aviónes"; add z → c and the accent rule
  (`es_art` 2 seeds 5 and 25).
- **"Boy words / girl words"** in the `es_art` hints (Could 19): grammatical gender is not sex; "el words / la words" or "masculine /
  feminine" avoids teaching that a table is a girl.
- **ser vs estar (Should 12).** `es_ser` 2 seed 7 teaches "Yo estoy feliz" (estar for feelings); `es_sent` 1 seed 6 builds "Ella es
  feliz." (screenshot `33-frases-sent1-feliz`) and another item "Yo soy feliz." Use "Ella está feliz." in es_sent, or a describing
  word that takes ser ("Ella es alta.").
- **Sentence tiles (Should 13).** The capital and the dot pin the first and last tile (`es_sent` 1 seed 7: El / gato / es / negro.), so
  the adjective position, which the hint teaches, is never tested; at level 1 only 2 orders are left. Put the dot outside the tiles
  (shown after the last slot) and lower-case the first word, and keep the one-valid-order check in test.js.
- **me gusta (Should 10, Could)**: level 1 uses singular countable animals ("Me gusta la vaca.", "Me gusta el cerdo." seed 2): natural
  Spanish for liking animals in general is "Me gustan las vacas"; "Me gusta el cerdo" means "I like pork". Use food and mass nouns at
  level 1 (el helado, la leche, el queso) and animals in the plural at level 2. Level 2 has only two choices (gusta / gustan): a 50%
  guess.
- `es_phrase` 1 hints are good descriptions of use ("You say this when you bump into someone"); they are text only.

#### Los Cuentos: es_story 1-3

- **Strong**: dialogues of 4-5 lines from known words, named speakers, each line with a 48 px speak button (es-MX), the panel kept above
  every question, a clear level ladder (English questions, Spanish questions with pictures, all Spanish). Hints point to the line. Good
  comprehensible input (Krashen 1982; Nation 2007 strand 1). Screenshots `35-cuentos-abuela-l1`, `36-cuentos-abuela-l3`,
  `37-cuentos-anos-l2-who`, `39-cuentos-biblio-l3`.
- **Language slips (Must 3, Should 11)**, all in `src/data/d-es-story.js`:
  - "abuela", line 3: "Aquí está agua." → "Aquí tienes agua." (seeds `es_story` 1 14, 3 77). Must.
  - "mascotas", line 1: "¿Tienes un animal, Pablo?" → "¿Tienes una mascota, Pablo?" (question 1 can stay "¿Qué animal tiene Pablo?").
    Seed `es_story` 1 6.
  - "anos", lines 3-4: "¡Soy muy viejo!" / "No, abuelo. Eres muy amable." does not follow; e.g. "¡Soy muy viejo!" / "No, abuelo. ¡Eres
    muy divertido!" ("divertido" is new; or "¡Eres muy fuerte!"). Seed `es_story` 2 80.
  - "biblioteca", line 3: "¿Qué animal hay en el libro?" → "¿Qué animales hay en el libro?" (the answer is two animals); line 1 "¡Hola,
    Carlos! Estás en la biblioteca." → "¡Hola, Carlos! ¿Estás en la biblioteca?" Seed `es_story` 3 67.
  - "noche", question 1 (level 1): "What does Mateo have?" → "How does Mateo feel?" (answer "He is thirsty."). Seed `es_story` 1 44.
  - "parque", line 1: "¡Hola, Pablo! ¿Dónde estás?" then "¿Es grande tu perro?" reads as a phone call; fine if the title says so.
- **Pictures at level 2**: "pequeño" is an ant, "sucio" a trash can, "lento" a turtle for "What is Pablo's dog like?" (`es_story` 2
  seed 18, screenshot `38-cuentos-park-l2-how-hint`); who-answers repeat the same face for different children in 15% of items (seed 7:
  Sofía / Ana / Luis), so the child reads the names. With a hint open at 380 px the Spanish question shrinks to about 11 px and the hint
  covers the top of the answers (same screenshot).
- **Pool (Should 17).** 12 dialogues, 36 questions, used by all three stops: two dialogues a round, so a child sees all 12 in 6 rounds
  and the same ones again at levels 2 and 3. Add 12-24 dialogues (school lunch, birthday, shopping with numbers, weather and clothes,
  a lost dog, a phone call) and a "Hear the whole story" button that plays every line in order with the speaker highlighted.
- At level 1 the who-question reads in English "Who says the line in the question? Find it in the story." without quoting the Spanish
  (the Spanish quote is not sent to the English voice): correct choice.

### 2.5 Across the section

- **Balance of the four strands (Nation 2007).** Meaning-focused input: good in Los Cuentos, thin before it (single words). Language-focused
  study: most of the section. Meaning-focused output: none (no speaking, almost no writing of meaning). Fluency: none (no timed
  listening or reading of known material; Speed Race asks level 1 words only). Should 6, 7.
- **Order of difficulty.** The path is one line for all grades (`byLevel`): a Pre-K child and a 6th grader both start with colours,
  and reach sentences after about 50 stops. Test-out per world helps older children and heritage speakers. For young children, the
  silent reading stops (Must 5) and the English captions (days, months, places, verbs, adjectives) require reading English.
- **Hints.** Level 1: translation (gives the answer when captions are shown). Level 2: first letter (gives the answer 80% of the time,
  ignores the article) and not spoken. Spell: letter count. Grammar and story hints: good. Suggested ladder (Lyster & Saito 2010):
  first replay slowly and ask again, then remove one wrong choice, then show the meaning.
- **Voice.** One TTS voice at rate 0.8, es-MX preferred, any Spanish voice as fallback. Spoken strings and lang tags are all right.
  Quality and accent depend on the tablet; a short recorded set (Could 20) and a slow replay would give a steadier pronunciation model.
- **Spaced retrieval.** Leitner review of missed items, review questions from older stops in rounds, world bosses: good. Gaps: no mixed
  review after Gran Repaso; words from units are recycled in Las Frases and Los Cuentos (good), but not in La Casa to La Ciudad.
- **Culture and respect.** Names are Latin American and varied, origins include Mexico, Colombia, Peru, Chile and Texas, families include
  grandparents: good. No cultural content otherwise; the path's emoji is a taco and the second world is "Fiesta Island" with a piñata;
  pairing these with real cultural facts (Should 15) avoids reducing Spanish-speaking cultures to party food.
- **Layout.** No sideways scroll and no console errors at 380x780 or 1024x600. At 1024x600 the picture answers are small with the
  names overlapping the faces (screenshot `37-cuentos-anos-l2-who-1024x600`). Listening cards are mostly empty space.

### 2.6 Variety statistics (selected; 3,000-6,000 seeded questions per level)

| Measure | Value |
|---|---|
| Level 2 "It starts with X" hint identifies the answer | greet 92%, color 87%, num 87%, teen 63%, animal 75%, food 92%, body 86%, family 82%, house 86%, clothes 76%, school 82%, feel 79%, days 88%, months 93%, weather 49%, big 73%, time 10%, place 90%, trans 78%, verb 80%, adj 95%, mix 84% |
| Level 1 with two identical pictures | days 82.2%, months 86.8%, all other units 0% |
| Answer is the only "y" phrase (level 2, answers with "y") | time 40%, big 39% |
| Two-right pairs offered together | weather sol/calor 2.2%, fresco/viento 2.3%, nieva/frío 2.3%; feel tranquilo/feliz 2.8%, emocionado/feliz 2.6% |
| Dialogue level 2 with a repeated face among answers | 15% (all who-questions; names shown) |
| `es_art` 2 plural items | 50% of the level; all spoken as "More than one Xs!" |
| Content counts | 21 units / 235 words; 13 phrases; 9 Q&A; 55 nouns; 49 ser/estar/tener; 21 likes; 38 sentences; 12 dialogues, 52 lines, 36 questions |

### 2.7 Top 10 (for Andy)

1. **(Done in R-01s.)** Remove the two-right-answer pairs in Weather and Feelings (caption the weather pictures, never offer sol/calor, nieva/frío,
   fresco/viento, feliz/tranquilo, feliz/emocionado together; `es_weather` 2 seeds 19, 38, 13; `es_feel` 1 seed 41) (S).
2. **(Done in R-01s.)** Fix the English in `es_art` 2: "the beachs" (seed 112) and the spoken "More than one dogs!" on every plural item (S).
3. **(Done in R-01s.)** Correct "Aquí está agua." to "Aquí tienes agua." and the other dialogue slips (mascota, "¿Qué animales...?", the grandpa reply,
   "¿Estás en la biblioteca?") (S).
4. Make Days and Months listenable without reading English (week and month strips, a non-sunrise "mañana"), or teach them in sentences (M).
5. Keep Pre-K and K on listening: postpone or voice the "Read" stops for young children, speak the hints (M).
6. Put sentences in every unit from world 1 (listen-and-point "El perro es grande", "¿Dónde está el gato?") and bring the
   high-frequency verbs and phrases earlier (L).
7. Add speaking: a "Say it, then check" step and offline record-and-compare on the learn screen and in Las Frases (M).
8. **(Done in R-01s.)** Teach every noun with el/la from Hola Plaza on; show both forms of feelings; align ser/estar in Build a Sentence (S to M).
9. **(Done in R-01s.)** Replace answer-giving hints with replay-slowly, then remove-one, then meaning; label or replace Mexican-sensitive words
   (chaqueta to chamarra, camión, borrador, "me gusta el cerdo") (S).
10. Add review and depth: a mixed review after La Ciudad, near-miss number and time choices, more dialogues with a "Hear the whole story"
    button, and a small culture strand per world (M).
