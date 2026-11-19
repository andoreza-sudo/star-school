/* ---------- TEACH-5S (v187): the Spanish and Discover lessons (part teaches; their shapes: 52s-bench5s.js) ----------
   In map order. Each is a real stop with the stop's own name; the idea, tonight's question and the fallback Name it line are
   hand-written here, the rest of the fallback is the engine's tone lines and each code's repair line (lsFallback4). Their drafted words
   are batch '5s' (D.b5s): docs/drafts/BATCH5S-READ.md, until the owner approves them.
   Spanish: the "Listen" stop of every unit of things (one el or la word each), and El or La?. The Spanish map is the same for every
   grade, so these lessons are for every child (lsBand), in the pet's tone for the child's age; their lines fit all three ages.
   Not built, and why: the units with no "el" or "la" words (greetings, colours, numbers, feelings, days, months, weather, time, action
   words, opposites: no article to fix; the pet's slip there would be a different lesson shape); Places in Town (its pictures do not show
   the word: el parque is a tree, el restaurante a plate, el mercado a carrot, and the unit shows English under every picture); the
   "Read" and "Spell" stops (their own practice of a unit a lesson has taught); Un, Una & Plurals, Ser, Estar, Tener, Me Gusta and the
   sentence and story stops (other shapes). Discover: the three K-2 science stops of Nature Trail. Not built: Maps & Land and Our
   Community (geography and civics: no prediction to test), and the grade 3-6 science stops (their ideas need diagrams the app does not
   draw: food webs, the water cycle, moon phases, circuits). */
// Hola Plaza
lsDraft5('es_animal1', ls6Spanish('es_animal1', 'Animals', ['animal'], {warmU: 'color', idea: 'Every Spanish word comes with el or la. Learn them together.',
  fb: '{a} is an el word. {b} is a la word.', home: 'Ask {name} to say "el perro" and "la vaca" with you.'}));
// Fiesta Island
lsDraft5('es_food1', ls6Spanish('es_food1', 'Food', ['food'], {warmU: 'animal', idea: 'Every Spanish word comes with el or la. Learn them together.',
  fb: '{a} is an el word. {b} is a la word.', home: 'Ask {name}: is it "el pan" or "la pan"?'}));
lsDraft5('es_body1', ls6Spanish('es_body1', 'My Body', ['body'], {warmU: 'food', idea: 'Every Spanish word comes with el or la. Learn them together.',
  fb: '{a} is an el word. {b} is a la word.', home: 'Ask {name} to point and say "la mano" and "el pie".'}));
lsDraft5('es_family1', ls6Spanish('es_family1', 'Family', ['family'], {warmU: 'body', idea: 'Every Spanish word comes with el or la. Learn them together.',
  fb: '{a} is an el word. {b} is a la word.', home: 'Ask {name} who is "la mamá" and who is "el papá".'}));
// La Casa
lsDraft5('es_house1', ls6Spanish('es_house1', 'Casa Dulce Casa', ['house'], {warmU: 'family', idea: 'Every Spanish word comes with el or la. Learn them together.',
  fb: '{a} is an el word. {b} is a la word.', home: 'Ask {name} to show you "la puerta" and "la ventana".'}));
lsDraft5('es_clothes1', ls6Spanish('es_clothes1', '¡A Vestirse!', ['clothes'], {warmU: 'house', idea: 'Every Spanish word comes with el or la. Learn them together.',
  fb: '{a} is an el word. {b} is a la word.', home: 'Ask {name}: is your shirt "el camisa" or "la camisa"?'}));
lsDraft5('es_school1', ls6Spanish('es_school1', 'A la Escuela', ['school'], {warmU: 'clothes', idea: 'Every Spanish word comes with el or la. Learn them together.',
  fb: '{a} is an el word. {b} is a la word.', home: 'Ask {name} to say "el libro" and "la mochila".'}));
// La Ciudad
lsDraft5('es_trans1', ls6Spanish('es_trans1', 'Transport', ['trans'], {warmU: 'school', idea: 'Every Spanish word comes with el or la. Learn them together.',
  fb: '{a} is an el word. {b} is a la word.', home: 'Ask {name}: "la moto" ends in o. Is it el or la?'}));
// Las Frases: every noun the lessons above teach, and the words that break the ending rule (la mano, el papá, la moto)
lsDraft5('es_art1', ls6Spanish('es_art1', 'El or La?', ['animal', 'food', 'body', 'family', 'house', 'clothes', 'school', 'trans'], {warmU: 'trans',
  idea: 'Listen for el or la. The last letter is only a clue.', fb: '{a} is an el word. {b} is a la word.', home: 'Ask {name} for a word that ends in o but takes la.'}));

// Nature Trail (K-2 science): predict, look, explain
lsDraft5('sci_life1', ls6Disc('sci_life1', 'Living Things', LS6_GROW, {first: true, idea: 'Living things grow. Toys and rocks do not grow.',
  fb: 'Look! The {a} grew. The {b} did not.', home: 'Ask {name}: is a tree alive? How do you know?'}));
lsDraft5('sci_earth1', ls6Disc('sci_earth1', 'Sky & Earth', LS6_SUN, {idea: 'Sunlight warms things up. Ice in the sun melts first.',
  fb: 'Look! The {a} melted. The {b} stayed the same.', home: 'Ask {name}: where would ice melt first, in the sun or the shade?'}));
lsDraft5('sci_phys1', ls6Disc('sci_phys1', 'Push, Pull & Stuff', LS6_FLOAT, {idea: 'Size does not decide. Light for its size floats.',
  fb: 'Look! The {a} floats. The {b} sinks.', home: 'Ask {name} to guess what floats in the bath, then try it.'}));
