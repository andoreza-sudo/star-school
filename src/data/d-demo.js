/* Demo content for the bank format (P1-09). Small on purpose: it proves the format, the validator and the passage panel.
   Real content arrives with the Phase 2 chunks (d-gram.js, d-vocab.js, d-comp.js, ...). There is no demo skill in SK: tests,
   smoke and screenshots register one by hand (see the skill examples in 37-bank.js). */
BANK.demo=[
  {lv:1,q:'One mouse, two ___.',a:'mice',d:['mouses','mices','mouse'],topic:'plurals'},
  {lv:1,q:'The sun is ___ in the sky.',a:'high',d:['hie','hy','hi'],form:'wide',topic:'spelling'},
  {lv:1,q:'Tap the word that tells what the dog does.',sent:'The dog runs fast.',a:'runs',form:'tap',topic:'verbs'},
  {lv:1,q:'Spell the word for a baby cat.',a:'kitten',form:'spell',topic:'spelling'},
  {lv:1,q:'Which one is a color?',a:'green',d:['table','jump','happy'],hint:'A color is what you see when you look at the grass or the sky.',topic:'vocabulary'},
  {lv:1,q:'Which word means the same as big?',a:'large',d:['tiny','slow','soft'],form:'wide',topic:'vocabulary'},
];
PASS.demo=[
  {lv:1,title:'The Red Kite',
    text:'Mia has a red kite. The wind is strong today. She runs to the big hill with her dad. Up goes the kite, high above the trees. '
      +'A little bird flies close to it. Mia laughs and waves. At the end of the day, she winds the string and goes home.',
    qs:[
      {q:'What color is the kite?',a:'red',d:['blue','green','yellow']},
      {q:'Who goes to the hill with Mia?',a:'her dad',d:['her dog','her friend','her teacher'],form:'wide'},
      {q:'Where does the kite fly?',a:'above the trees',d:['under a bridge','in a room','into the water'],form:'wide'},
      {q:'What flies close to the kite?',a:'a little bird',d:['a big plane','a bee','a bat'],form:'wide'},
      {q:'What does Mia do at the end of the day?',a:'goes home',d:['goes to sleep','buys a kite','swims'],form:'wide'},
    ]},
];
