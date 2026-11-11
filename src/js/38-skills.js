const SK={
 es_greet:{t:'Hello & Thank You',e:'👋',area:'es',max:2,gen:lv=>genEs('greet',lv)},
 es_color:{t:'Colors',e:'🎨',area:'es',max:2,gen:lv=>genEs('color',lv)},
 es_num:{t:'Numbers 1–10',e:'🔟',area:'es',max:2,gen:lv=>genEs('num',lv)},
 es_teen:{t:'Numbers 11–20',e:'2️⃣',area:'es',max:2,gen:lv=>genEs('teen',lv)},
 es_animal:{t:'Animals',e:'🐶',area:'es',max:2,gen:lv=>genEs('animal',lv)},
 es_food:{t:'Food',e:'🍎',area:'es',max:2,gen:lv=>genEs('food',lv)},
 es_body:{t:'My Body',e:'👃',area:'es',max:2,gen:lv=>genEs('body',lv)},
 es_family:{t:'Family',e:'👪',area:'es',max:2,gen:lv=>genEs('family',lv)},
 es_mix:{t:'Big Review',e:'🏆',area:'es',max:2,gen:lv=>genEs('mix',lv)},
 abc:{t:'ABC Letters',e:'🔤',area:'read',max:4,gen:genAbc},
 syl:{t:'Syllable Claps',e:'🥁',area:'read',max:2,gen:genSyl},
 sound:{t:'Letter Sounds',e:'🔤',area:'read',max:4,gen:lv=>lv>2?genSoundB(lv):genSound(lv)},
 rhyme:{t:'Rhyme Time',e:'🎵',area:'read',max:2,gen:genRhyme},
 cmp:{t:'Compare',e:'🐊',area:'math',max:3,gen:genCmp},
 time:{t:'Clocks',e:'🕒',area:'math',max:6,gen:lv=>lv==4?genBayTime4():lv==5?ffTime5():lv==6?ffTime6():genTime(lv)}, // 4 Treasure Bay, 5-6 Fraction Forest
 coins:{t:'Coins',e:'🪙',area:'math',max:5,gen:lv=>lv==4?genBayCoins4():lv==5?genBayCoins5():genCoins(lv)},
 pk_count:{t:'Count Things',e:'🔢',area:'math',max:3,gen:genPkCountK},
 pk_num:{t:'Hear a Number',e:'🔟',area:'math',max:3,gen:genPkNumK},
 pk_more:{t:'Which Has More',e:'⚖️',area:'math',max:2,gen:genPkMoreK},
 sort:{t:'Sort and Compare',e:'🧩',area:'math',max:3,gen:genSortK},
 shape:{t:'Shapes',e:'🔺',area:'math',max:6,gen:lv=>lv==6?dsShape6():lv==5?ffShape5():lv==4?genShape(lv):genShapeK(lv)}, // levels 1-3 Tiny Town / Shape Garden, 4 Clock Tower, 5 Fraction Forest
 trace:{t:'Tracing',e:'✏️',area:'math',lvArea:{2:'read',3:'read'},max:3,gen:genTrace,round:traceRound,noPlace:true,side:true}, // P2-16 tracing (47-trace.js): 1 digits (Tiny Town); P2-17: 2 A-Z, 3 a-z (ABC Beach, reading colour via lvArea; side: never holds back the next stop, 42-paths.js sideOpen)
 pat:{t:'Patterns',e:'🌈',area:'math',max:5,gen:lv=>lv==5?ccPat5():lv==4?dsPat4():lv==3?genBayPat3():genPatK(lv)}, // 4 Decimal Desert
 tenf:{t:'Ten Frames',e:'🔟',area:'math',max:3,gen:genTenf}, // P2-02 Shape Garden: tenf, pos, meas (and levels added to pk_count, pk_num, pk_more, shape, add, pat, cnt, sort above)
 pos:{t:'Where Is It',e:'📌',area:'math',max:1,gen:genPos},
 meas:{t:'Measuring',e:'📏',area:'math',max:6,gen:lv=>lv==6?ccMeas6():lv==5?dsMeas5():lv==4?ffMeas4():lv==3?genBayMeas3():lv==1?genMeas(lv):genMeas2(lv)}, // 1 Shape Garden, 2 Clock Tower, 3 Treasure Bay, 4 Fraction Forest
 mult:{t:'Equal Groups',e:'✖️',area:'math',max:2,gen:genMult},
 comp:{t:'Story Time',e:'📗',area:'read',max:7,gen:genCompLv,round:compRoundLv}, // levels 1-2 picture stories, 3+ passages (37-comp.js)
 info:{t:'Learn About It',e:'🔍',area:'read',max:5,gen:lv=>genPassage('info',lv),round:lv=>compRound('info',lv)},
 add:{t:'Adding',e:'➕',area:'math',max:6,gen:lv=>lv==5?genAdd5():lv==6?genAdd6():genAddK(lv)},
 miss:{t:'Missing Number',e:'❓',area:'math',max:2,gen:genMiss},
 sub:{t:'Take Away',e:'➖',area:'math',max:8,gen:lv=>lv==5?genBaySub5():lv==6?ffSub6():lv==7?ffSub7():lv==8?fySub8():genSub(lv)}, // 5 Treasure Bay, 6-7 Fraction Forest, 8 Factor Factory
 big:{t:'Big Numbers',e:'💯',area:'math',max:7,gen:lv=>lv==5?genBayBig5():lv==6?fyBig6():lv==7?fyBig7():genBig(lv)}, // 6-7 Factor Factory
 eo:{t:'Even or Odd',e:'⚖️',area:'math',max:2,gen:genEO},
 cnt:{t:'Count By',e:'🔢',area:'math',max:5,gen:lv=>lv==5?genBayCnt5():genCntK(lv)},
 story:{t:'Story Problems',e:'📖',area:'math',max:8,gen:lv=>lv==8?ccStory8():lv==7?dsStory7():lv==4?genBayStory4():lv==6?ffStory6():genStoryAll(lv)}, // 4 Treasure Bay, 6 Fraction Forest
 arr:{t:'Arrays',e:'🧱',area:'math',max:2,gen:lv=>lv==1?genBayArr1():genArr(lv)},
 mfact:{t:'Times Facts',e:'✖️',area:'math',max:5,gen:lv=>lv==5?fyMfact5():genMfact(lv)}, // 5 Factor Factory
 dfact:{t:'Dividing Facts',e:'÷',area:'math',max:4,gen:genDfact},
 mbig:{t:'Times Tens',e:'✖️',area:'math',max:5,gen:lv=>lv==1?genMbig(lv):lv==5?vlMbig5():fyMbig(lv)}, // 2-4 Factor Factory, 5 Volcano Lab
 pv:{t:'Place Value',e:'🔟',area:'math',max:6,gen:lv=>lv==2?genBayPv2():lv==3?genBayPv3():lv==4?fyPv4():lv==5?vlPv5():lv==6?vlPv6():genPv1()}, // P2-03 Clock Tower group (CURRICULUM M-1), 4 Factor Factory, 5-6 Volcano Lab
 data:{t:'Picture Graphs',e:'📈',area:'math',max:4,gen:lv=>lv==4?ccData4():lv==2?genBayData2():lv==3?ffData3():genData1()}, // 2 Treasure Bay, 3 Fraction Forest
 round:{t:'Rounding',e:'🎯',area:'math',max:4,gen:lv=>lv==4?vlRound4():lv==3?fyRound3():ffRound(lv)}, // 1-2 Fraction Forest, 3 Factor Factory, 4 Volcano Lab
 dbig:{t:'Long Division',e:'÷',area:'math',max:4,gen:lv=>lv==4?vlDbig4():fyDbig(lv)}, // 1-3 Factor Factory, 4 Volcano Lab
 // P2-10 Decimal Desert (dec 1-2) and P2-11 Volcano Lab (dec 3-5)
 dec:{t:'Decimals',e:'🔟',area:'math',max:5,gen:lv=>lv==1?dsDec1():lv==2?dsDec2():vlDecLv(lv)}, // 1-2 Decimal Desert, 3-5 Volcano Lab
 ooo:{t:'Order of Operations',e:'🧮',area:'math',max:1,gen:vlOoo},
 fact:{t:'Factors & Primes',e:'🔢',area:'math',max:2,gen:lv=>lv==1?fyFact1():fyFact2()},
 geo:{t:'Perimeter and Area',e:'📐',area:'math',max:4,gen:lv=>lv==4?ccGeo4():lv==3?dsGeo3():lv==1?ffGeo1():ffGeo2()}, // 3 Decimal Desert, 4 Crystal Caves
 frac:{t:'Fractions',e:'🍕',area:'math',max:8,gen:lv=>lv==1?genFrac1(lv):genFracCore(lv)}, // level 1 Clock Tower (P2-03), 2-8 fractions core (P2-06)
 fop:{t:'Fraction Math',e:'🍕',area:'math',max:7,gen:lv=>lv==7?skyFop7():lv==6?ccFop6():lv==5?ccFop5():lv==4?ccFop4():lv==3?ccFop3():lv==1?dsFop1():dsFop2()}, // 1-2 Decimal Desert, 3-6 Crystal Caves, 7 Sky City
 coord:{t:'Coordinates',e:'📌',area:'math',max:1,gen:ccCoord1}, // P2-12 Crystal Caves (level 2: P2-14)
 // P2-13 Sky City
 ratio:{t:'Ratios and Rates',e:'⚖️',area:'math',max:4,gen:lv=>lv==1?skyRatio1():lv==2?skyRatio2():lv==3?skyRatio3():skyRatio4()},
 int:{t:'Integers',e:'🔢',area:'math',max:3,gen:lv=>lv==1?skyInt1():lv==2?skyInt2():skyInt3()},
 ang:{t:'Angles',e:'📐',area:'math',max:2,gen:lv=>lv==1?dsAng1():dsAng2()}, // P2-10
 sight:{t:'Sight Words',e:'👀',area:'read',max:5,gen:genSight},
 pic:{t:'Picture Words',e:'🖼️',area:'read',max:6,gen:lv=>lv>4?genPicP(lv):genPic(lv)},
 build:{t:'Build a Word',e:'🧩',area:'read',max:6,gen:lv=>lv>4?genBuildP(lv):genBuild(lv)},
 sent:{t:'Read & Match',e:'📚',area:'read',max:5,gen:lv=>lv>=3?genSentB(lv):genSent(lv)}, // P2-24: levels 3-5 (genSentB, end of 32-gen-read.js)
 spell:{t:'Spelling',e:'✏️',area:'read',max:7,gen:lv=>genSpell(lv)}, // P2-19: genSpell and its words are in src/data/d-spell.js
 // P2-20 and P2-21: grammar levels 1-9 (bank items in src/data/d-gram.js)
 gram:{t:'Grammar',e:'🔤',area:'read',max:9,bank:'gram',gen:lv=>genBank('gram',lv)},
 // P2-22 Vocabulary A (levels 1-5) and P2-23 Vocabulary B (6-10): items are BANK.vocab in src/data/d-vocab.js
 vocab:{t:'Vocabulary',e:'📚',area:'read',max:10,bank:'vocab',gen:lv=>genBank('vocab',lv)}};
/* P2-17: the subject area of a skill at a level. A skill may set lvArea {level: area} where some levels belong to another
   subject (trace: digits are math, letters are reading); everything that colours or counts by subject reads the area through this. */
const skArea=(sk,lv)=>{const s=SK[sk];return s?(s.lvArea&&s.lvArea[lv])||s.area:undefined};
