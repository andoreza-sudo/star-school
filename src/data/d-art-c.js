/* ---------- object art set C: 40 pictures (P4-15; DESIGN_SYSTEM.md section 6.5) ----------
   The next 40 picture words that still showed as emoji after sets A (src/js/16-art-a.js) and B (src/data/d-art-b.js), chosen the
   same way as set B (PROGRESS P4-15): Spanish units (places, house, school, clothes, weather, transport, adjectives, verbs), reading
   words (digraphs, vowel teams, syllables), riddles, Memory Match, logic grids and vocabulary pictures. Same style, rules and limits
   as sets A and B: 64x64 grid, light from the top left, up to four tones per colour area (base, shade x2 lower right, highlight x1,
   deep accent x3), white and cream objects edged in their own deep tone, faces only on animals (the snowman keeps his coal eyes and
   carrot nose: they are what makes him a snowman); only var(--a-x) roles from src/css/21-art.css; <path>/<circle>/<ellipse>, no
   ids, defs, gradients, filters, text or raw hex; up to 2.5 KB each.
   This file is data (A11): it loads after all code, and ART is read only inside functions (picFor/picArt at render time), so a
   drawing here shows wherever a question asks picFor for its word. tools/test.js "object art set C P4-15" checks the rules.
   Review: node tools/shots.js art-c (this set) and art (sets A, B and C together). */
Object.assign(ART, {
  pizza:
    '<path fill="var(--a-y2)" d="M7 15Q32 9 57 15L35 59Q32 63 29 59Z"/>' +
    '<path fill="var(--a-y)" d="M7.9 14.9Q31.2 9.4 54.4 14.9L34 55.9Q31.2 59.6 28.4 55.9Z"/>' +
    '<path fill="var(--a-y1)" opacity="0.8" d="M11 18Q13 18 15 19L30 52Q29 54 28 52Z"/><circle cx="22" cy="25" r="5" fill="var(--a-r2)"/>' +
    '<circle cx="21.6" cy="24.6" r="4.4" fill="var(--a-r)"/>' +
    '<ellipse cx="19.9" cy="22.8" rx="1.6" ry="0.9" fill="var(--a-r1)" transform="rotate(-40 19.9 22.8)"/>' +
    '<circle cx="41" cy="24" r="5" fill="var(--a-r2)"/><circle cx="40.6" cy="23.6" r="4.4" fill="var(--a-r)"/>' +
    '<ellipse cx="38.9" cy="21.8" rx="1.6" ry="0.9" fill="var(--a-r1)" transform="rotate(-40 38.9 21.8)"/>' +
    '<circle cx="31" cy="38" r="4.6" fill="var(--a-r2)"/><circle cx="30.7" cy="37.7" r="4" fill="var(--a-r)"/>' +
    '<ellipse cx="29.1" cy="35.9" rx="1.5" ry="0.8" fill="var(--a-r1)" transform="rotate(-40 29.1 35.9)"/>' +
    '<circle cx="32" cy="51" r="3" fill="var(--a-r2)"/><circle cx="31.7" cy="50.7" r="2.6" fill="var(--a-r)"/>' +
    '<path fill="none" stroke="var(--a-r3)" stroke-width="1.8" opacity="0.6" d="M19.6 27.4h0.1M43.4 26.4h0.1M33 40h0.1"/>' +
    '<ellipse cx="37" cy="31" rx="2.6" ry="1.3" fill="var(--a-g)" transform="rotate(-30 37 31)"/>' +
    '<ellipse cx="26" cy="44" rx="2.4" ry="1.2" fill="var(--a-g2)" transform="rotate(40 26 44)"/>' +
    '<path fill="var(--a-t2)" d="M4 15Q4 8.6 11 7.6Q32 3 53 7.6Q60 8.6 60 15Q60 19.4 56 19.6Q32 13 8 19.6Q4 19.4 4 15Z"/>' +
    '<path fill="var(--a-t)" d="M4 14Q4 8.4 10.6 7.4Q32 3 53 7.4Q58.6 8.4 58.6 13.4Q58.4 17 55 17.2Q32 11 8.4 17.4Q4 17 4 14Z"/>' +
    '<path fill="none" stroke="var(--a-t1)" stroke-width="1.8" d="M8.6 11Q30 5.8 51 9.6"/>' +
    '<path fill="none" stroke="var(--a-t2)" stroke-width="1.8" d="M16 12.4h0.1M28 9.6h0.1M41 10.2h0.1M52 12.2h0.1"/>',
  snowflake:
    '<path fill="none" stroke="var(--a-c2)" stroke-width="6" d="M32.9 32.9L32.9 4.9M32.9 18.9L26.9 12.9M32.9 18.9L38.9 12.9M32.9 11.9L28.7 7.7M32.9 11.9L37.1 7.7M32.9 32.9L57.1 18.9M45 25.9L47.2 17.7M45 25.9L53.2 28.1M51.1 22.4L52.6 16.6M51.1 22.4L56.9 24M32.9 32.9L57.1 46.9M45 39.9L53.2 37.7M45 39.9L47.2 48.1M51.1 43.4L56.9 41.8M51.1 43.4L52.6 49.2M32.9 32.9L32.9 60.9M32.9 46.9L38.9 52.9M32.9 46.9L26.9 52.9M32.9 53.9L37.1 58.1M32.9 53.9L28.7 58.1M32.9 32.9L8.7 46.9M20.8 39.9L18.6 48.1M20.8 39.9L12.6 37.7M14.7 43.4L13.2 49.2M14.7 43.4L8.9 41.8M32.9 32.9L8.7 18.9M20.8 25.9L12.6 28.1M20.8 25.9L18.6 17.7M14.7 22.4L8.9 24M14.7 22.4L13.2 16.6"/>' +
    '<path fill="none" stroke="var(--a-c)" stroke-width="4.4" d="M32 32L32 4M32 18L26 12M32 18L38 12M32 11L27.8 6.8M32 11L36.2 6.8M32 32L56.2 18M44.1 25L46.3 16.8M44.1 25L52.3 27.2M50.2 21.5L51.7 15.7M50.2 21.5L56 23.1M32 32L56.2 46M44.1 39L52.3 36.8M44.1 39L46.3 47.2M50.2 42.5L56 40.9M50.2 42.5L51.7 48.3M32 32L32 60M32 46L38 52M32 46L26 52M32 53L36.2 57.2M32 53L27.8 57.2M32 32L7.8 46M19.9 39L17.7 47.2M19.9 39L11.7 36.8M13.8 42.5L12.3 48.3M13.8 42.5L8 40.9M32 32L7.8 18M19.9 25L11.7 27.2M19.9 25L17.7 16.8M13.8 21.5L8 23.1M13.8 21.5L12.3 15.7"/>' +
    '<path fill="var(--a-c2)" d="M32.6 25L39.2 28.8L39.2 36.4L32.6 40.2L26 36.4L26 28.8Z"/>' +
    '<path fill="var(--a-c)" d="M32 25.2L37.9 28.6L37.9 35.4L32 38.8L26.1 35.4L26.1 28.6Z"/>' +
    '<path fill="var(--a-c1)" d="M32 28.4L35.1 30.2L35.1 33.8L32 35.6L28.9 33.8L28.9 30.2Z"/>' +
    '<path fill="none" stroke="var(--a-c1)" stroke-width="1.6" opacity="0.9" d="M24.2 36.5L10.3 44.5M24.2 27.5L10.3 19.5M32 23L32 7"/>' +
    '<circle cx="32" cy="4.4" r="1.6" fill="var(--a-w)" opacity="0.9"/><circle cx="9.6" cy="18.6" r="1.4" fill="var(--a-w)" opacity="0.9"/>' +
    '<circle cx="28.6" cy="28.6" r="1.2" fill="var(--a-w)"/>',
  elephant:
    '<ellipse cx="36" cy="59.6" rx="24" ry="2.6" fill="var(--a-k)" opacity="0.1"/><path fill="var(--a-e3)" d="M35 46H41V57Q41 59 39 59H37Q35 59 35 57Z"/>' +
    '<path fill="var(--a-e3)" d="M50.6 46H56V56.6Q56 58.6 54 58.6H52.6Q50.6 58.6 50.6 56.6Z"/>' +
    '<path fill="none" stroke="var(--a-e2)" stroke-width="2" d="M58.6 30Q62 34 61.4 39"/><ellipse cx="61.4" cy="40" rx="1.6" ry="2.4" fill="var(--a-k2)"/>' +
    '<path fill="var(--a-e2)" d="M22 30Q26 15 42 14Q58 14 60 30Q61 42 55 46V56Q55 59 52 59H48.6Q46 59 46 56V49Q38 51 32 49V56Q32 59 29 59H25.6Q23 59 23 56V44Q20 38 22 30Z"/>' +
    '<path fill="var(--a-e)" d="M22.3 29Q26 15.1 40.9 14.1Q55.8 14.1 57.6 29Q58.6 40.2 53 43.9V53.2Q53 56 50.2 56H47Q44.6 56 44.6 53.2V46.7Q37.2 48.6 31.6 46.7V53.2Q31.6 56 28.8 56H25.6Q23.2 56 23.2 53.2V42Q20.4 36.5 22.3 29Z"/>' +
    '<ellipse cx="38" cy="21" rx="9" ry="3.2" fill="var(--a-e1)" opacity="0.9" transform="rotate(-12 38 21)"/>' +
    '<ellipse cx="25.6" cy="57" rx="1.6" ry="1.3" fill="var(--a-w2)"/><ellipse cx="29.6" cy="57" rx="1.6" ry="1.3" fill="var(--a-w2)"/>' +
    '<ellipse cx="48.6" cy="57" rx="1.6" ry="1.3" fill="var(--a-w2)"/><ellipse cx="52.6" cy="57" rx="1.6" ry="1.3" fill="var(--a-w2)"/>' +
    '<path fill="var(--a-e2)" d="M8 22Q8 10 20 9Q32 9 33 22Q33 31 26 35Q22 37 20 42Q18.6 48 19.4 52Q20 55.6 17 56Q13.4 56.4 12.4 52.4Q10.6 46 12.4 38Q8 32 8 22Z"/>' +
    '<path fill="var(--a-e)" d="M8.3 21.2Q8.3 10.1 19.4 9.1Q30.6 9.1 31.5 21.2Q31.5 29.6 25 33.3Q21.3 35.2 19.4 39.8Q18.1 45.4 18.9 49.1Q19.4 52.5 16.7 52.9Q13.3 53.2 12.4 49.5Q10.7 43.6 12.4 36.1Q8.3 30.5 8.3 21.2Z"/>' +
    '<path fill="none" stroke="var(--a-e2)" stroke-width="1.6" d="M14 44Q16.4 45 18.6 44.2"/>' +
    '<ellipse cx="15" cy="15" rx="5" ry="2.6" fill="var(--a-e1)" opacity="0.9" transform="rotate(-30 15 15)"/>' +
    '<path fill="var(--a-w3)" d="M21.4 36Q22.4 42 28 43.6Q30 43.6 29.6 42Q25.4 40 25.6 35.4Z"/>' +
    '<path fill="var(--a-w)" d="M21.6 36.4Q22.6 41.4 27.4 42.8Q28.6 42.6 28.4 41.8Q24.8 39.6 25 35.8Z"/>' +
    '<path fill="var(--a-e2)" d="M27 13Q40 10 43 22Q44.6 33 36 37Q29 39 27 33Q25.6 24 27 13Z"/>' +
    '<path fill="var(--a-e)" d="M27.4 13.6Q38.6 11 41.4 21.6Q42.6 31 35 35Q29.6 36.6 28.2 32Q26.6 24 27.4 13.6Z"/>' +
    '<path fill="var(--a-p)" opacity="0.85" d="M30 17Q37.4 16 38.6 23Q39.4 29.6 34 32Q31 33 30.4 30Q29.4 24 30 17Z"/>' +
    '<ellipse cx="17.4" cy="20.6" rx="2.2" ry="2.8" fill="var(--a-k)"/><circle cx="16.6" cy="19.5" r="0.9" fill="var(--a-w)"/>' +
    '<ellipse cx="13.6" cy="27.6" rx="2.8" ry="1.8" fill="var(--a-p)" opacity="0.55"/>',
  icecream:
    '<path fill="var(--a-t3)" d="M17 30L32 62L47 30Z"/><path fill="var(--a-t)" d="M18.6 30.6L32 59.6L44.6 30.6Z"/>' +
    '<path fill="none" stroke="var(--a-t2)" stroke-width="1.6" d="M22 33L38.6 49.6M30 33L41.4 44.4M21.6 40L35 53.4M42 33L26.6 48.4M34 33L23 44M43.6 39L31 51.6"/>' +
    '<path fill="var(--a-t1)" opacity="0.9" d="M19.6 31L24.6 41.6L22.6 31Z"/>' +
    '<path fill="var(--a-g1)" d="M12 30Q10 22 18 19Q24 16 32 18Q42 15.6 48 20Q55 24 52 31Q50 34 46 32Q43 35 38 33Q34 36 30 33Q25 35.6 22 33Q16 35 12 30Z"/>' +
    '<path fill="var(--a-g1)" d="M12.2 29.3Q10.4 21.8 17.9 18.9Q23.5 16.1 31 18Q40.4 15.7 46.1 19.9Q52.7 23.6 49.8 30.2Q48 33 44.2 31.2Q41.4 34 36.7 32.1Q32.9 34.9 29.2 32.1Q24.5 34.5 21.6 32.1Q16 34 12.2 29.3Z"/>' +
    '<path fill="var(--a-g)" d="M13 30Q15 33 19 32.4Q21 34.6 24.6 33.4Q27 35.6 30 33.6Q33 35.8 36.6 33.6Q40 35.6 43 32.6Q47 34.4 50 31.6Q48.6 33.8 46 33.4Q43 36 38 34.4Q34 37 30 34.4Q25 37 21.6 34.4Q16 36 13 30Z"/>' +
    '<path fill="var(--a-p2)" d="M16 23Q14 9 30 6Q44 4 48 15Q50 22 46 25Q42 28 38 26Q34 29 30 26.6Q25 29 22 26Q18 28 16 23Z"/>' +
    '<path fill="var(--a-p)" d="M16.3 22Q14.4 8.9 29.3 6.1Q42.3 4.3 46 14.5Q47.9 21 44.2 23.8Q40.5 26.6 36.7 24.7Q33 27.5 29.3 25.3Q24.7 27.5 21.9 24.7Q18.1 26.6 16.3 22Z"/>' +
    '<ellipse cx="23" cy="12" rx="4.6" ry="2.4" fill="var(--a-p1)" transform="rotate(-30 23 12)"/>' +
    '<circle cx="19.6" cy="18" r="1.1" fill="var(--a-w)" opacity="0.8"/><path fill="none" stroke="var(--a-r3)" stroke-width="1.6" d="M34 6Q36 2 40 1.6"/>' +
    '<circle cx="33.4" cy="6.6" r="4" fill="var(--a-r2)"/><circle cx="33.1" cy="6.3" r="3.4" fill="var(--a-r)"/>' +
    '<ellipse cx="31.7" cy="4.8" rx="1.3" ry="0.7" fill="var(--a-r1)" transform="rotate(-40 31.7 4.8)"/>' +
    '<path fill="none" stroke="var(--a-y2)" stroke-width="1.6" d="M37 13L39 12M28 16L29.6 17.4M40.6 19L42.4 20M24 21L25.6 20"/>' +
    '<path fill="none" stroke="var(--a-b)" stroke-width="1.6" d="M33 20L35 20.6M42 12.6L43.6 14M20 15.6L21.4 14.4"/>',
  beach:
    '<path fill="var(--a-b2)" d="M2 44Q2 38 9 38Q16 36 24 38Q32 36 40 38Q48 36 55 38Q62 38 62 44Q62 58 48 60H16Q2 58 2 44Z"/>' +
    '<path fill="var(--a-b)" d="M2 43Q2 38.4 8.6 38.4Q16 36.6 24 38.4Q32 36.6 40 38.4Q48 36.6 55 38.4Q60.6 38.6 60.6 43Q60.4 55 47 57H16Q2.4 55 2 43Z"/>' +
    '<path fill="none" stroke="var(--a-b1)" stroke-width="1.8" opacity="0.9" d="M7 42.6Q11 40.6 15 42.6M44 41.6Q48 39.6 52 41.6"/>' +
    '<path fill="var(--a-t2)" d="M8 53Q10 44 26 43Q44 42 54 48Q60 52 56 57Q50 61 32 61Q14 61 10 58Q7 56 8 53Z"/>' +
    '<path fill="var(--a-t)" d="M8.4 52Q10.4 44 26 43Q43 42.4 52.6 47.6Q57.6 51 54.4 55Q49 58.6 32 58.6Q15 58.6 11 56.4Q8 55 8.4 52Z"/>' +
    '<path fill="var(--a-t1)" opacity="0.9" d="M14 50Q18 46.6 28 46Q22 48 16 51.6Z"/>' +
    '<path fill="none" stroke="var(--a-t2)" stroke-width="1.8" d="M40 54h0.1M22 54.6h0.1M28 51h0.1"/>' +
    '<path fill="var(--a-e3)" d="M30.6 18H33.2L34.4 50H31.6Z"/><path fill="var(--a-e1)" d="M30.6 18H31.8L32.8 50H31.6Z"/>' +
    '<path fill="var(--a-r2)" d="M6 21Q8 4 32 3Q56 4 58 21Q54 18 50 20.6Q46 17.6 41 20Q36.6 17 32 19.6Q27.4 17 23 20Q18 17.6 14 20.6Q10 18 6 21Z"/>' +
    '<path fill="var(--a-r)" d="M6.6 20Q8.4 4.6 31 3.6Q53.6 4.4 56 18.4Q52.6 16.6 49.6 18.6Q45.6 16.2 41 18.4Q36.6 15.6 32 18Q27.4 15.6 23 18.4Q18.4 16.2 14.4 18.8Q10.4 16.6 6.6 20Z"/>' +
    '<path fill="var(--a-w3)" d="M17 6.6Q20.6 5 23.6 4.6Q22 11 23 20Q18.6 17.2 14 20.6Q14 12 17 6.6Z"/>' +
    '<path fill="var(--a-w)" d="M17.6 7Q20.4 5.6 23 5.2Q21.6 11 22.6 18.2Q18.6 16.4 14.6 18.6Q14.8 12 17.6 7Z"/>' +
    '<path fill="var(--a-w3)" d="M40.4 4.6Q43.4 5 47 6.6Q50 12 50 20.6Q45.4 17.2 41 20Q42 11 40.4 4.6Z"/>' +
    '<path fill="var(--a-w)" d="M41 5.2Q43.6 5.6 46.4 7Q49 12 49.4 18.6Q45.4 16.4 41.4 18.2Q42.4 11 41 5.2Z"/>' +
    '<ellipse cx="12.6" cy="13" rx="2" ry="4" fill="var(--a-r1)" opacity="0.9" transform="rotate(30 12.6 13)"/>' +
    '<circle cx="32" cy="3" r="1.8" fill="var(--a-y2)"/><circle cx="46" cy="50" r="4.4" fill="var(--a-y2)"/>' +
    '<circle cx="45.7" cy="49.7" r="3.9" fill="var(--a-y)"/>' +
    '<ellipse cx="44.2" cy="48" rx="1.4" ry="0.7" fill="var(--a-y1)" transform="rotate(-40 44.2 48)"/>' +
    '<path fill="var(--a-r)" d="M42.6 47.4Q46 48 46.4 54.4Q44 54 42.4 51.6Q41.6 49.4 42.6 47.4Z"/>',
  rabbit:
    '<ellipse cx="22.6" cy="17" rx="7.2" ry="15.6" fill="var(--a-w3)" transform="rotate(-12 22.6 17)"/>' +
    '<ellipse cx="22" cy="16.2" rx="5.6" ry="14" fill="var(--a-w)" transform="rotate(-12 22 16.2)"/>' +
    '<ellipse cx="23" cy="18" rx="3" ry="10.4" fill="var(--a-p)" transform="rotate(-12 23 18)"/>' +
    '<ellipse cx="41.4" cy="17" rx="7.2" ry="15.6" fill="var(--a-w3)" transform="rotate(12 41.4 17)"/>' +
    '<ellipse cx="40.8" cy="16.2" rx="5.6" ry="14" fill="var(--a-w)" transform="rotate(12 40.8 16.2)"/>' +
    '<ellipse cx="41.8" cy="18" rx="3" ry="10.4" fill="var(--a-p)" transform="rotate(12 41.8 18)"/>' +
    '<ellipse cx="42.6" cy="19" rx="1.6" ry="6" fill="var(--a-p2)" opacity="0.6" transform="rotate(12 42.6 19)"/>' +
    '<ellipse cx="32" cy="42" rx="21.6" ry="19.2" fill="var(--a-w3)"/><ellipse cx="32.2" cy="42.2" rx="20" ry="17.6" fill="var(--a-w2)"/>' +
    '<ellipse cx="31" cy="41" rx="18.6" ry="16.2" fill="var(--a-w)"/><ellipse cx="26.4" cy="48.4" rx="6" ry="4.6" fill="var(--a-w2)" opacity="0.7"/>' +
    '<ellipse cx="37.6" cy="48.4" rx="6" ry="4.6" fill="var(--a-w2)" opacity="0.7"/><ellipse cx="25.8" cy="47.6" rx="5.4" ry="4" fill="var(--a-w)"/>' +
    '<ellipse cx="38.2" cy="47.6" rx="5.4" ry="4" fill="var(--a-w)"/><ellipse cx="23.4" cy="38.4" rx="2.6" ry="3.2" fill="var(--a-k)"/>' +
    '<circle cx="22.5" cy="37.1" r="1" fill="var(--a-w)"/><ellipse cx="40.6" cy="38.4" rx="2.6" ry="3.2" fill="var(--a-k)"/>' +
    '<circle cx="39.7" cy="37.1" r="1" fill="var(--a-w)"/><path fill="var(--a-p2)" d="M28.6 43.4Q32 42 35.4 43.4Q35 46.4 32 47.6Q29 46.4 28.6 43.4Z"/>' +
    '<ellipse cx="31" cy="43.8" rx="1.4" ry="0.7" fill="var(--a-w)" opacity="0.8"/>' +
    '<path fill="none" stroke="var(--a-k2)" stroke-width="1.6" d="M32 47.6V49.4M32 49.4Q29.6 52 27.4 50M32 49.4Q34.4 52 36.6 50"/>' +
    '<path fill="var(--a-w3)" d="M29.4 50.6H34.6V55Q34.6 56.4 33.2 56.4H30.8Q29.4 56.4 29.4 55Z"/>' +
    '<path fill="var(--a-w)" d="M30 51H34V54.6Q34 55.6 33 55.6H31Q30 55.6 30 54.6Z"/>' +
    '<path fill="none" stroke="var(--a-w3)" stroke-width="1" d="M32 51V55.4"/>' +
    '<ellipse cx="17" cy="45.6" rx="3.4" ry="2.2" fill="var(--a-p)" opacity="0.6"/>' +
    '<ellipse cx="47" cy="45.6" rx="3.4" ry="2.2" fill="var(--a-p)" opacity="0.6"/>',
  sunflower:
    '<path fill="none" stroke="var(--a-g2)" stroke-width="5" d="M32 40Q33.6 50 32 62.4"/>' +
    '<path fill="none" stroke="var(--a-g)" stroke-width="2.8" d="M31.2 40Q32.6 50 31.2 61.6"/>' +
    '<path fill="var(--a-g2)" d="M32 52Q24 45 13 47Q17 58 32 55Z"/><path fill="var(--a-g)" d="M31.6 51.6Q24 46 14.4 47.6Q18.6 55.4 31.6 54Z"/>' +
    '<path fill="none" stroke="var(--a-g2)" stroke-width="1.4" d="M30 52.6Q23 50 17.6 49.6"/><path fill="var(--a-g2)" d="M33 48Q40 40 52 41Q48 52 33 51Z"/>' +
    '<path fill="var(--a-g)" d="M33.4 47.6Q40.6 41 50.6 41.6Q47 49.8 33.4 50Z"/>' +
    '<path fill="none" stroke="var(--a-g2)" stroke-width="1.4" d="M35 48.6Q42 45 47.6 44"/>' +
    '<path fill="var(--a-y2)" d="M29.9 16.1Q28.2 8.3 31.8 2.4Q35.4 8.3 33.7 16.1ZM34 16.2Q36.5 8.6 42.6 5.3Q42.7 12.2 37.4 18.1ZM37.6 18.3Q43.5 13 50.4 13.2Q47.1 19.2 39.5 21.7ZM39.6 22Q47.4 20.3 53.3 23.9Q47.4 27.5 39.6 25.8ZM39.5 26.1Q47.1 28.6 50.4 34.7Q43.5 34.8 37.6 29.5ZM37.4 29.7Q42.7 35.6 42.6 42.5Q36.5 39.2 34 31.6ZM33.7 31.7Q35.4 39.5 31.8 45.4Q28.2 39.5 29.9 31.7ZM29.6 31.6Q27.1 39.2 21.1 42.5Q20.9 35.6 26.2 29.7ZM26 29.5Q20.1 34.8 13.2 34.7Q16.5 28.6 24.1 26.1ZM24 25.8Q16.2 27.5 10.3 23.9Q16.2 20.3 24 22ZM24.1 21.7Q16.5 19.2 13.2 13.1Q20.1 13 26 18.3ZM26.2 18.1Q20.9 12.2 21 5.3Q27.1 8.6 29.6 16.2Z"/>' +
    '<path fill="var(--a-y)" d="M29.1 15.2Q27.4 7.4 31 1.5Q34.6 7.4 32.9 15.2ZM33.2 15.3Q35.7 7.7 41.8 4.4Q41.9 11.3 36.6 17.2ZM36.8 17.4Q42.7 12.1 49.6 12.3Q46.3 18.3 38.7 20.8ZM38.8 21.1Q46.6 19.4 52.5 23Q46.6 26.6 38.8 24.9ZM38.7 25.2Q46.3 27.7 49.6 33.8Q42.7 33.9 36.8 28.6ZM36.6 28.8Q41.9 34.7 41.8 41.6Q35.7 38.3 33.2 30.7ZM32.9 30.8Q34.6 38.6 31 44.5Q27.4 38.6 29.1 30.8ZM28.8 30.7Q26.3 38.3 20.3 41.6Q20.1 34.7 25.4 28.8ZM25.2 28.6Q19.3 33.9 12.4 33.8Q15.7 27.7 23.3 25.2ZM23.2 24.9Q15.4 26.6 9.5 23Q15.4 19.4 23.2 21.1ZM23.3 20.8Q15.7 18.3 12.4 12.2Q19.3 12.1 25.2 17.4ZM25.4 17.2Q20.1 11.3 20.2 4.4Q26.3 7.7 28.8 15.3Z"/>' +
    '<path fill="var(--a-y1)" opacity="0.9" d="M22.3 28Q19.9 30.8 16.3 31.5Q18.7 28.7 22.3 28ZM21 23Q17.5 24.2 14 23Q17.5 21.8 21 23ZM22.3 18Q18.7 17.3 16.3 14.5Q19.9 15.2 22.3 18Z"/>' +
    '<circle cx="31.6" cy="23.6" r="9.8" fill="var(--a-n3)"/><circle cx="31" cy="23" r="9" fill="var(--a-n2)"/>' +
    '<circle cx="30.2" cy="22.2" r="7.6" fill="var(--a-n)"/>' +
    '<path fill="none" stroke="var(--a-n3)" stroke-width="1.8" d="M28 20h0.1M32 19h0.1M35.6 21h0.1M27 24.4h0.1M31 23.6h0.1M35 25.4h0.1M29.6 28h0.1M33.4 29h0.1"/>' +
    '<ellipse cx="27.4" cy="19" rx="3" ry="1.6" fill="var(--a-n1)" transform="rotate(-40 27.4 19)"/>',
  giraffe:
    '<path fill="var(--a-t2)" d="M22 62Q25 44 25 26L39 22Q40 44 46 62Z"/><path fill="var(--a-t)" d="M22.6 62Q25.4 44 25.4 26.4L37.6 23Q38.6 44 44 62Z"/>' +
    '<path fill="var(--a-n2)" d="M37.6 19Q40.4 18.4 41.2 21Q41.6 42 47.6 60Q46.6 62 45 61Q39.6 44 38.6 24Z"/>' +
    '<path fill="var(--a-n)" d="M38 19.4Q40 19.2 40.4 21.4Q40.8 42 46.4 59.6L45 60Q39.4 44 38.4 24Z"/>' +
    '<path fill="var(--a-n)" d="M27 30Q30 28 33 30Q34 34 30.6 35.6Q27 35 27 30ZM30 39Q34 37.6 36 40Q36.6 44.6 32.6 45.4Q29 44.6 30 39ZM25.6 42Q27.4 41.4 28 44Q27.8 48 25 48.6Q24.4 45 25.6 42ZM28.6 51Q32.4 49.6 35 52Q35.6 56.6 31.6 57.4Q27.6 56 28.6 51ZM36 47.6Q38.6 47.6 39.6 51Q39 53.6 37.4 53Q35.6 51 36 47.6ZM34.4 24.6Q36.4 25 36.6 27.6Q35.6 29 34 28Q33 26 34.4 24.6Z"/>' +
    '<path fill="var(--a-t2)" d="M22.6 9.6L23.6 3.6H26L26.4 9Z"/><path fill="var(--a-t2)" d="M30 9L31.6 3.4H34L33.6 9.6Z"/>' +
    '<circle cx="24.8" cy="3.6" r="2.6" fill="var(--a-n2)"/><circle cx="24.6" cy="3.4" r="2.2" fill="var(--a-n)"/>' +
    '<circle cx="32.8" cy="3.4" r="2.6" fill="var(--a-n2)"/><circle cx="32.6" cy="3.2" r="2.2" fill="var(--a-n)"/>' +
    '<path fill="var(--a-t2)" d="M36.6 12Q44 8 48 10.4Q45 16.4 37.6 16.6Z"/><path fill="var(--a-t)" d="M36.6 12Q43 8.8 46.6 10.6Q44 15 37.6 15.6Z"/>' +
    '<path fill="var(--a-p)" opacity="0.8" d="M38.6 13Q43 11 45 11.4Q43 14 39 14.6Z"/>' +
    '<path fill="var(--a-t2)" d="M8 21Q7 14 14 11Q22 8 32 9Q39 10.4 39 17Q39 24 31 26Q22 28.6 14 28Q8 27 8 21Z"/>' +
    '<path fill="var(--a-t)" d="M8.3 20.3Q7.4 13.8 13.9 11Q21.3 8.2 30.6 9.1Q37.1 10.4 37.1 16.6Q37.1 23.1 29.7 25Q21.3 27.4 13.9 26.8Q8.3 25.9 8.3 20.3Z"/>' +
    '<path fill="var(--a-t1)" d="M7.6 21Q7.4 15.4 12.6 13.4Q16 14 16.6 19Q17 25.4 12 27.2Q7.6 26 7.6 21Z"/>' +
    '<ellipse cx="20" cy="13.4" rx="4.6" ry="1.8" fill="var(--a-t1)" opacity="0.9" transform="rotate(-10 20 13.4)"/>' +
    '<circle cx="28.6" cy="13" r="1.6" fill="var(--a-n)" opacity="0.8"/><circle cx="33.6" cy="17" r="1.4" fill="var(--a-n)" opacity="0.8"/>' +
    '<ellipse cx="10.6" cy="19" rx="1.1" ry="1.6" fill="var(--a-n3)" transform="rotate(-20 10.6 19)"/>' +
    '<path fill="none" stroke="var(--a-n3)" stroke-width="1.4" d="M10 24.4Q13 26 16 24.6"/>' +
    '<ellipse cx="24.4" cy="16.4" rx="2.2" ry="2.6" fill="var(--a-k)"/><circle cx="23.6" cy="15.4" r="0.9" fill="var(--a-w)"/>' +
    '<ellipse cx="21" cy="22" rx="2.6" ry="1.6" fill="var(--a-p)" opacity="0.55"/>',
  road:
    '<path fill="var(--a-g2)" d="M2 38Q2 20 32 18Q62 20 62 38V52Q62 60 54 60H10Q2 60 2 52Z"/>' +
    '<path fill="var(--a-g)" d="M2 37Q2.6 20.6 31 18.6Q60 20.6 60 36.6V50Q60 57.4 52.6 57.4H10Q2 57.4 2 50Z"/>' +
    '<path fill="var(--a-g1)" opacity="0.9" d="M5 32Q8 23 24 21Q12 25 8 33Z"/>' +
    '<path fill="var(--a-e3)" d="M10 60Q16 50 30 44Q42 39 36 31Q32 26 30 19H34Q37 25 43 30Q50 38 38 47Q30 53 31 60Z"/>' +
    '<path fill="var(--a-e2)" opacity="0.9" d="M10 60Q16 50 30 44Q42 39 36 31Q32 26 30 19H31.6Q34.6 26 40.4 31Q46.6 38.6 35.6 45.6Q24.6 52.6 20.6 60Z"/>' +
    '<path fill="none" stroke="var(--a-w)" stroke-width="1.6" d="M10.6 59.6Q16.4 50.2 30 44.2Q41.6 39 35.8 31.2Q32 26 30 19.2M31 59.6Q30 53 38 47Q50 38 43 30Q37 25 34 19.2"/>' +
    '<path fill="none" stroke="var(--a-y)" stroke-width="2.2" d="M22 59L24.6 55.6M29.6 50.6L33 48.2M38.6 43.6L40.4 40.6M40 34.4L38.6 31.6M35.6 27.6L34.4 25.4M32.6 22.4L32.2 21"/>' +
    '<path fill="var(--a-n2)" d="M49 38H51.6V46H49Z"/><circle cx="50.4" cy="32" r="7" fill="var(--a-g3)"/>' +
    '<circle cx="49.9" cy="31.5" r="6.2" fill="var(--a-g2)"/>' +
    '<ellipse cx="47.5" cy="28.9" rx="2.2" ry="1.2" fill="var(--a-g)" transform="rotate(-40 47.5 28.9)"/>' +
    '<circle cx="12" cy="39" r="4.6" fill="var(--a-g3)"/><circle cx="11.7" cy="38.7" r="4" fill="var(--a-g2)"/>' +
    '<ellipse cx="10.1" cy="36.9" rx="1.5" ry="0.8" fill="var(--a-g)" transform="rotate(-40 10.1 36.9)"/>' +
    '<circle cx="17" cy="40" r="3.6" fill="var(--a-g3)"/><circle cx="16.7" cy="39.7" r="3.2" fill="var(--a-g2)"/>',
  tub:
    '<ellipse cx="32" cy="59.4" rx="26" ry="2.4" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-y3)" d="M13 48L11 56Q11 58 13 58H16Q17.6 58 17 56L17 48ZM47 48V56Q46.6 58 48 58H51Q53 58 53 56L51 48Z"/>' +
    '<path fill="var(--a-y2)" d="M13 48L11.4 55.6Q11.4 57 13 57H15Q16 57 15.8 55.6L16 48ZM47.4 48V55.6Q47.2 57 48.6 57H50.6Q51.8 57 51.6 55.6L50 48Z"/>' +
    '<path fill="var(--a-e3)" d="M8 26V13Q8 9 12 9H17Q19 9 19 11V14H16.6V12Q16.6 11.4 16 11.4H12.4Q10.6 11.4 10.6 13V26Z"/>' +
    '<path fill="var(--a-e1)" d="M8 26V13Q8 9.6 11.6 9.6H12.6Q9.6 10 9.6 13V26Z"/><circle cx="16" cy="24" r="5" fill="var(--a-w3)"/>' +
    '<circle cx="15.6" cy="23.6" r="4.3" fill="var(--a-w)"/>' +
    '<ellipse cx="13.9" cy="21.8" rx="1.6" ry="0.9" fill="var(--a-c1)" transform="rotate(-40 13.9 21.8)"/>' +
    '<circle cx="25" cy="21" r="6.4" fill="var(--a-w3)"/><circle cx="24.5" cy="20.5" r="5.5" fill="var(--a-w)"/>' +
    '<ellipse cx="22.3" cy="18.1" rx="2" ry="1.1" fill="var(--a-c1)" transform="rotate(-40 22.3 18.1)"/>' +
    '<circle cx="36" cy="22.4" r="5.6" fill="var(--a-w3)"/><circle cx="35.5" cy="21.9" r="4.8" fill="var(--a-w)"/>' +
    '<ellipse cx="33.6" cy="19.9" rx="1.8" ry="1" fill="var(--a-c1)" transform="rotate(-40 33.6 19.9)"/>' +
    '<circle cx="45.6" cy="24.4" r="4.6" fill="var(--a-w3)"/><circle cx="45.2" cy="24" r="4" fill="var(--a-w)"/>' +
    '<ellipse cx="43.7" cy="22.3" rx="1.5" ry="0.8" fill="var(--a-c1)" transform="rotate(-40 43.7 22.3)"/>' +
    '<circle cx="52.4" cy="15" r="2.6" fill="var(--a-w3)"/><circle cx="52.1" cy="14.7" r="2.1" fill="var(--a-w)"/>' +
    '<path fill="var(--a-w3)" d="M3.4 27H60.6Q61.6 47 47.4 52H16.6Q2.4 47 3.4 27Z"/>' +
    '<path fill="var(--a-w2)" d="M5.4 28H58.6Q59.4 45 46.6 49.6H17.4Q4.6 45 5.4 28Z"/>' +
    '<path fill="var(--a-w)" d="M5.4 28H55Q55.6 43 44.4 47.4H17.4Q5 43.4 5.4 28Z"/><path fill="var(--a-c)" d="M5.4 28H58.6V32.6Q32 34.6 5.6 32.6Z"/>' +
    '<path fill="var(--a-w3)" d="M2 25.6Q2 23.4 4.2 23.4H59.8Q62 23.4 62 25.6V27.6Q62 29.6 59.8 29.6H4.2Q2 29.6 2 27.6Z"/>' +
    '<path fill="var(--a-w)" d="M2.6 25.6Q2.6 24 4.2 24H58.6Q60 24 60 25.4V26.4Q60 27.6 58.6 27.6H4.2Q2.6 27.6 2.6 26.4Z"/>' +
    '<ellipse cx="14" cy="37" rx="3.4" ry="1.4" fill="var(--a-w2)" opacity="0.5" transform="rotate(30 14 37)"/>',
  lion:
    '<path fill="var(--a-o2)" d="M32 6Q39 0.3 42.8 8.5Q51.6 6.4 51.5 15.4Q60.4 17.3 56.4 25.4Q63.5 31 56.4 36.6Q60.4 44.7 51.5 46.6Q51.6 55.6 42.8 53.5Q39 61.7 32 56Q25 61.7 21.2 53.5Q12.4 55.6 12.5 46.6Q3.6 44.7 7.6 36.6Q0.5 31 7.6 25.4Q3.6 17.3 12.5 15.4Q12.4 6.4 21.2 8.5Q25 0.3 32 6Z"/>' +
    '<path fill="var(--a-o)" d="M31.7 9.1Q37.7 4.2 41 11.2Q48.6 9.4 48.5 17.2Q56.1 18.8 52.7 25.8Q58.8 30.6 52.7 35.4Q56.1 42.4 48.5 44Q48.6 51.7 41 49.9Q37.7 57 31.7 52.1Q25.7 57 22.4 49.9Q14.9 51.7 15 44Q7.3 42.4 10.7 35.4Q4.6 30.6 10.7 25.8Q7.3 18.8 15 17.2Q14.9 9.4 22.4 11.2Q25.7 4.2 31.7 9.1Z"/>' +
    '<ellipse cx="18" cy="15" rx="6" ry="3" fill="var(--a-o1)" opacity="0.9" transform="rotate(-40 18 15)"/>' +
    '<circle cx="17.4" cy="15.4" r="5.4" fill="var(--a-y2)"/><circle cx="16.9" cy="14.9" r="4.6" fill="var(--a-y)"/>' +
    '<circle cx="17.4" cy="15.6" r="2.6" fill="var(--a-y3)" opacity="0.7"/><circle cx="46.6" cy="15.4" r="5.4" fill="var(--a-y2)"/>' +
    '<circle cx="46.1" cy="14.9" r="4.6" fill="var(--a-y)"/><circle cx="46.6" cy="15.6" r="2.6" fill="var(--a-y3)" opacity="0.7"/>' +
    '<ellipse cx="32.4" cy="33.6" rx="17.4" ry="16.4" fill="var(--a-y2)"/><ellipse cx="31.4" cy="32.6" rx="16" ry="15" fill="var(--a-y)"/>' +
    '<ellipse cx="25" cy="23.6" rx="4.6" ry="2.2" fill="var(--a-y1)" transform="rotate(-30 25 23.6)"/>' +
    '<ellipse cx="27.4" cy="41" rx="6" ry="4.8" fill="var(--a-y1)"/><ellipse cx="36.6" cy="41" rx="6" ry="4.8" fill="var(--a-y1)"/>' +
    '<ellipse cx="24.6" cy="31" rx="2.4" ry="3" fill="var(--a-k)"/><circle cx="23.8" cy="29.8" r="1" fill="var(--a-w)"/>' +
    '<ellipse cx="39.4" cy="31" rx="2.4" ry="3" fill="var(--a-k)"/><circle cx="38.6" cy="29.8" r="1" fill="var(--a-w)"/>' +
    '<path fill="var(--a-n3)" d="M27.6 35.6Q32 33.6 36.4 35.6Q36 39 32 40.4Q28 39 27.6 35.6Z"/>' +
    '<ellipse cx="30.4" cy="35.8" rx="1.6" ry="0.8" fill="var(--a-w)" opacity="0.7" transform="rotate(-10 30.4 35.8)"/>' +
    '<path fill="none" stroke="var(--a-n3)" stroke-width="1.8" d="M32 40.4V42.4M32 42.4Q29.4 45.6 26.6 43.4M32 42.4Q34.6 45.6 37.4 43.4"/>' +
    '<path fill="none" stroke="var(--a-y3)" stroke-width="1.7" d="M24.4 41h0.1M22.6 43.4h0.1M39.6 41h0.1M41.4 43.4h0.1"/>' +
    '<ellipse cx="19" cy="38" rx="3" ry="2" fill="var(--a-p)" opacity="0.55"/><ellipse cx="45" cy="38" rx="3" ry="2" fill="var(--a-p)" opacity="0.55"/>',
  backpack:
    '<path fill="none" stroke="var(--a-r3)" stroke-width="3.4" d="M24.6 10Q24.6 3 32 3Q39.4 3 39.4 10"/>' +
    '<path fill="var(--a-r3)" d="M7 34Q7 30 11 30H15V56H11Q7 56 7 52Z"/>' +
    '<path fill="var(--a-r2)" d="M7.1 33.9Q7.1 30.3 10.7 30.3H14.3V53.7H10.7Q7.1 53.7 7.1 50.1Z"/>' +
    '<path fill="var(--a-r3)" d="M49 30H53Q57 30 57 34V52Q57 56 53 56H49Z"/>' +
    '<path fill="var(--a-r2)" d="M49.1 30.3H52.7Q56.3 30.3 56.3 33.9V50.1Q56.3 53.7 52.7 53.7H49.1Z"/>' +
    '<path fill="var(--a-r2)" d="M12 20Q12 8 24 8H40Q52 8 52 20V54Q52 60 46 60H18Q12 60 12 54Z"/>' +
    '<path fill="var(--a-r)" d="M12.2 19.4Q12.2 8.1 23.5 8.1H38.6Q49.8 8.1 49.8 19.4V51.4Q49.8 57 44.2 57H17.9Q12.2 57 12.2 51.4Z"/>' +
    '<path fill="var(--a-r2)" d="M12.4 20Q12.4 8.4 24 8.4H40Q51.6 8.4 51.6 20V24Q32 31 12.4 24Z"/>' +
    '<path fill="var(--a-r)" d="M12.4 19.4Q12.4 8.4 24 8.4H39Q49.6 8.6 50 19.4V22Q32 28.6 12.4 22.4Z"/>' +
    '<ellipse cx="20" cy="13.4" rx="4" ry="2" fill="var(--a-r1)" transform="rotate(-25 20 13.4)"/><path fill="var(--a-r3)" d="M20.6 25.6H25V36H20.6Z"/>' +
    '<path fill="var(--a-r3)" d="M39 25.6H43.4V36H39Z"/><path fill="var(--a-r3)" d="M17 36Q17 33 20 33H44Q47 33 47 36V52Q47 55 44 55H20Q17 55 17 52Z"/>' +
    '<path fill="var(--a-r2)" d="M17.2 36Q17.2 33.2 20 33.2H42.6Q45.4 33.2 45.4 36V51Q45.4 53.8 42.6 53.8H20Q17.2 53.8 17.2 51Z"/>' +
    '<path fill="none" stroke="var(--a-y2)" stroke-width="1.8" d="M20 38.4H44"/><circle cx="40" cy="41.6" r="1.8" fill="var(--a-y2)"/>' +
    '<circle cx="39.8" cy="41.4" r="1.4" fill="var(--a-y)"/><path fill="var(--a-y2)" d="M19.6 35.6H25.4V39H19.6Z"/>' +
    '<path fill="var(--a-y)" d="M19.6 35.6H24.4V38H19.6Z"/><path fill="var(--a-y2)" d="M38.6 35.6H44.4V39H38.6Z"/>' +
    '<path fill="var(--a-y)" d="M38.6 35.6H43.4V38H38.6Z"/><path fill="none" stroke="var(--a-r1)" stroke-width="1.6" opacity="0.6" d="M15.4 26V50"/>',
  dish:
    '<circle cx="33" cy="33" r="23.6" fill="var(--a-b2)"/><circle cx="32.6" cy="32.6" r="22.6" fill="var(--a-b)"/>' +
    '<circle cx="32" cy="32" r="21.6" fill="var(--a-b1)"/><circle cx="32.8" cy="32.8" r="16.4" fill="var(--a-w3)"/>' +
    '<circle cx="32.4" cy="32.4" r="15.6" fill="var(--a-w2)"/><circle cx="31.6" cy="31.6" r="14.8" fill="var(--a-w)"/>' +
    '<path fill="none" stroke="var(--a-w)" stroke-width="1.6" opacity="0.9" d="M14.6 24Q19 15 28 12"/>' +
    '<ellipse cx="24.6" cy="23" rx="6" ry="2.4" fill="var(--a-w2)" opacity="0.7" transform="rotate(-40 24.6 23)"/>' +
    '<path fill="var(--a-e3)" d="M3.6 6V18Q3.6 23 6 24.6L5.4 57Q5.4 59.6 7.2 59.6Q9 59.6 9 57L8.4 24.6Q10.8 23 10.8 18V6H9.6V17H8V6H6.6V17H5V6Z"/>' +
    '<path fill="var(--a-e1)" d="M3.6 6V18Q3.6 22 5.4 24H6.6L6 57Q6 58.6 7 59Q5.4 58.6 5.4 57L6 24.6Q3.6 23 3.6 18Z"/>' +
    '<path fill="var(--a-e3)" d="M57 5Q62 10 61.4 28Q61.2 31 59 31L58.8 57Q58.8 59.6 57 59.6Q55.2 59.6 55.2 57V8Q55.2 4.4 57 5Z"/>' +
    '<path fill="var(--a-e1)" d="M56.6 6Q58.4 10 58.4 28V57Q58.4 59 57 59.4Q56 58.8 56 57V8Q56 6 56.6 6Z"/>',
  school:
    '<ellipse cx="32" cy="60" rx="29" ry="2.4" fill="var(--a-k)" opacity="0.1"/><path fill="var(--a-r2)" d="M5 30H59V59H5Z"/>' +
    '<path fill="var(--a-r)" d="M5 30H56.9V57.8H5Z"/><path fill="var(--a-e3)" d="M3 27.4H61V31.6H3Z"/><path fill="var(--a-e2)" d="M3 27.4H61V29.4H3Z"/>' +
    '<path fill="var(--a-r2)" d="M21 22H43V59H21Z"/><path fill="var(--a-r)" d="M21 22H42.2V57.5H21Z"/>' +
    '<path fill="var(--a-e3)" d="M17.6 24.4L32 9L46.4 24.4Z"/><path fill="var(--a-w)" d="M22 22.6L32 12L42 22.6Z"/>' +
    '<path fill="var(--a-w2)" d="M32 12L42 22.6H36Z"/>' +
    '<path fill="var(--a-w3)" d="M8.6 35H15V42H8.6ZM15.4 35H21.8V42H15.4ZM42.6 35H49V42H42.6ZM49.4 35H55.8V42H49.4ZM8.6 46H15V53H8.6ZM49.4 46H55.8V53H49.4ZM23.6 26H28.6V33H23.6ZM35.4 26H40.4V33H35.4Z"/>' +
    '<path fill="var(--a-c1)" d="M9.6 36H14V41H9.6ZM16.4 36H20.8V41H16.4ZM43.6 36H48V41H43.6ZM50.4 36H54.8V41H50.4ZM9.6 47H14V52H9.6ZM50.4 47H54.8V52H50.4ZM24.4 26.8H27.8V32.2H24.4ZM36.2 26.8H39.6V32.2H36.2Z"/>' +
    '<circle cx="32.3" cy="18.4" r="4.2" fill="var(--a-w3)"/><circle cx="32" cy="18.1" r="3.6" fill="var(--a-w)"/>' +
    '<path fill="none" stroke="var(--a-k)" stroke-width="1.2" d="M32 15.8V18.2L33.8 19.2"/>' +
    '<path fill="none" stroke="var(--a-e3)" stroke-width="1.4" d="M32 9.4V1.4"/><path fill="var(--a-y2)" d="M32.4 1.4H40L38 4.2L40 7H32.4Z"/>' +
    '<path fill="var(--a-y)" d="M32.4 1.4H39L37.4 4H32.4Z"/><path fill="var(--a-n2)" d="M26 59V44Q26 39 32 39Q38 39 38 44V59Z"/>' +
    '<path fill="var(--a-n)" d="M26 59V44Q26 39.6 31 39.4Q36 39.6 36 44V59Z"/><path fill="none" stroke="var(--a-n3)" stroke-width="1.2" d="M32 40V59"/>' +
    '<circle cx="30.6" cy="51" r="0.9" fill="var(--a-y)"/><circle cx="33.4" cy="51" r="0.9" fill="var(--a-y)"/>' +
    '<path fill="var(--a-e1)" d="M23 58H41V61H23Z"/><path fill="var(--a-e)" d="M23 60H41V61.6H23Z"/>' +
    '<path fill="var(--a-r1)" opacity="0.6" d="M5.4 30.6H7.4V58.4H5.4Z"/>',
  snowman:
    '<ellipse cx="32" cy="61" rx="18" ry="2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="none" stroke="var(--a-n2)" stroke-width="2" d="M18 40L6 32M9.6 34.4L8 30M46 40L58 31M54.6 33.4L56.6 29"/>' +
    '<circle cx="32" cy="45" r="16" fill="var(--a-w3)"/><circle cx="32.6" cy="45.6" r="14.8" fill="var(--a-w2)"/>' +
    '<circle cx="31" cy="44" r="14" fill="var(--a-w)"/><circle cx="32" cy="22.4" r="11.4" fill="var(--a-w3)"/>' +
    '<circle cx="32.4" cy="22.8" r="10.4" fill="var(--a-w2)"/><circle cx="31.4" cy="21.8" r="9.8" fill="var(--a-w)"/>' +
    '<path fill="var(--a-r2)" d="M20.4 30Q32 36.6 43.6 30L44 34.6Q32 41 20 34.6Z"/>' +
    '<path fill="var(--a-r)" d="M20.4 30Q32 36 43.4 30L43.4 33Q32 38.6 20.6 33Z"/><path fill="var(--a-r2)" d="M36 35L41.6 34.4L44 47Q41 48.4 38.6 47Z"/>' +
    '<path fill="var(--a-r)" d="M36.4 35L40.6 34.6L42.6 46.4Q40.6 47.2 38.8 46.4Z"/>' +
    '<path fill="none" stroke="var(--a-r1)" stroke-width="1.4" opacity="0.8" d="M23 32.4Q32 36.4 41 32.4"/>' +
    '<path fill="var(--a-k)" d="M19.4 14.4Q32 10.6 44.6 14.4V16.6Q32 13 19.4 16.6Z"/>' +
    '<path fill="var(--a-k)" d="M23.6 13V3.4Q32 1.6 40.4 3.4V13Q32 11.4 23.6 13Z"/>' +
    '<path fill="var(--a-k2)" d="M23.6 3.4Q32 1.6 40.4 3.4V5.6Q32 4 23.6 5.6Z"/><path fill="var(--a-r)" d="M23.6 10Q32 8.4 40.4 10V12.6Q32 11 23.6 12.6Z"/>' +
    '<path fill="var(--a-k2)" opacity="0.8" d="M25.6 5.4H28V11.4H25.6Z"/><circle cx="27.6" cy="20" r="1.7" fill="var(--a-k)"/>' +
    '<circle cx="36.4" cy="20" r="1.7" fill="var(--a-k)"/><circle cx="27" cy="19.4" r="0.6" fill="var(--a-w)"/>' +
    '<circle cx="35.8" cy="19.4" r="0.6" fill="var(--a-w)"/><path fill="var(--a-o2)" d="M31.4 22.6L41.4 25.6L31.6 26.4Z"/>' +
    '<path fill="var(--a-o)" d="M31.4 22.6L40.6 25.4L31.6 25.2Z"/>' +
    '<path fill="none" stroke="var(--a-k)" stroke-width="1.9" d="M26.6 27h0.1M29.4 28.4h0.1M32.4 28.8h0.1M35.4 28.2h0.1"/>' +
    '<circle cx="32" cy="41.4" r="1.8" fill="var(--a-k)"/><circle cx="32" cy="48" r="1.8" fill="var(--a-k)"/>' +
    '<circle cx="32" cy="54.6" r="1.8" fill="var(--a-k)"/>' +
    '<ellipse cx="23.4" cy="38.6" rx="3" ry="1.6" fill="var(--a-c1)" opacity="0.8" transform="rotate(-40 23.4 38.6)"/>',
  window:
    '<path fill="var(--a-w3)" d="M8 4H56V52H8Z"/><path fill="var(--a-w)" d="M8 4H54.6V50.6H8Z"/>' +
    '<path fill="var(--a-c)" d="M12 8H30V26H12ZM34 8H52V26H34ZM12 30H30V48H12ZM34 30H52V48H34Z"/>' +
    '<path fill="var(--a-c1)" d="M12 8H30V22Q20 20 12 26ZM34 8H52V15Q42 20 34 18ZM12 30H30V33Q22 38 12 36ZM34 30H52V40Q44 36 34 42Z"/>' +
    '<path fill="var(--a-w)" opacity="0.6" d="M15 23L27 11H30L15 26ZM37 23L49 11H52L37 26Z"/>' +
    '<path fill="var(--a-w)" opacity="0.5" d="M15 45L27 33H30L15 48Z"/>' +
    '<path fill="var(--a-c2)" opacity="0.6" d="M12 8H30V9.6H13.6V26H12ZM34 8H52V9.6H35.6V26H34ZM12 30H30V31.6H13.6V48H12ZM34 30H52V31.6H35.6V48H34Z"/>' +
    '<path fill="var(--a-p2)" d="M6 2Q14 2 18 6Q15 22 17 30Q12 34 6 32Z"/><path fill="var(--a-p)" d="M6 2Q13 2 16.6 6Q14 22 15.6 29.6Q11 32 6 30.6Z"/>' +
    '<path fill="none" stroke="var(--a-p2)" stroke-width="1.4" d="M9.6 6Q10 18 9.6 29M13 6Q12 18 13 29.4"/>' +
    '<path fill="var(--a-p2)" d="M58 2Q50 2 46 6Q49 22 47 30Q52 34 58 32Z"/>' +
    '<path fill="var(--a-p)" d="M58 2Q51.6 2 48 6Q50.4 20 48.6 28.4Q52.6 31 57 30Z"/>' +
    '<path fill="none" stroke="var(--a-p2)" stroke-width="1.4" d="M54.4 6Q54 18 54.4 29M51 6Q52 18 51 29.4"/><path fill="var(--a-y2)" d="M5 27H18V30H5Z"/>' +
    '<path fill="var(--a-y2)" d="M46 27H59V30H46Z"/><path fill="var(--a-n3)" d="M3 1H61V4H3Z"/>' +
    '<path fill="var(--a-n2)" d="M4 52H60V58Q60 60 58 60H6Q4 60 4 58Z"/><path fill="var(--a-n)" d="M4 52H60V55.4H4Z"/>' +
    '<path fill="var(--a-n1)" d="M4 52H60V53.2H4Z"/>',
  shell:
    '<ellipse cx="32" cy="59.4" rx="20" ry="2.2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-o2)" d="M6.6 38.6Q3.5 31.8 10.5 29.4Q10.2 21.9 17.7 22.3Q20.2 15.3 27 18.5Q32 13 37 18.5Q43.8 15.3 46.3 22.3Q53.8 21.9 53.5 29.4Q60.5 31.8 57.4 38.6L37 56H27Z"/>' +
    '<path fill="var(--a-o1)" d="M7.5 37.5Q4.6 31.1 11.2 28.8Q10.9 21.8 18 22.2Q20.3 15.6 26.7 18.6Q31.4 13.4 36.1 18.6Q42.5 15.6 44.8 22.2Q51.9 21.8 51.6 28.8Q58.2 31.1 55.3 37.5L36.1 53.8H26.7Z"/>' +
    '<path fill="none" stroke="var(--a-o2)" stroke-width="1.8" opacity="0.8" d="M27 40.6L11.3 29.9M28.7 39L18.2 23.1M30.8 38.1L27.2 19.5M33.2 38.1L36.8 19.5M35.3 39L45.8 23.1M37 40.6L52.7 29.9"/>' +
    '<path fill="var(--a-o)" d="M20 54L13 51Q13 47 17 47L27 50Z"/><path fill="var(--a-o)" d="M44 54L51 51Q51 47 47 47L37 50Z"/>' +
    '<path fill="var(--a-o2)" d="M25 49H39L37 57H27Z"/><path fill="var(--a-o)" d="M25.6 49H37.6L36 55.6H27.4Z"/>' +
    '<ellipse cx="21" cy="22" rx="4.6" ry="2.2" fill="var(--a-w)" opacity="0.8" transform="rotate(-50 21 22)"/>' +
    '<circle cx="15.4" cy="32" r="1.2" fill="var(--a-w)" opacity="0.8"/>',
  cap:
    '<ellipse cx="33" cy="58" rx="26" ry="2.4" fill="var(--a-k)" opacity="0.1"/><path fill="var(--a-b3)" d="M14 40Q5 42 2 49Q3 53 10 52Q22 50 36 45Z"/>' +
    '<path fill="var(--a-b2)" d="M14 40Q6 41.6 3 47.6Q4 50.6 10 50Q22 48.4 35 44Z"/>' +
    '<path fill="var(--a-b2)" d="M12 44Q10 26 20 17Q30 9 42 12Q56 16 58 32Q60 44 56 48Q36 52 12 44Z"/>' +
    '<path fill="var(--a-b)" d="M12.2 42.1Q10.4 25.2 19.8 16.7Q29.2 9.2 40.4 12Q53.6 15.8 55.5 30.8Q57.4 42.1 53.6 45.8Q34.8 49.6 12.2 42.1Z"/>' +
    '<path fill="none" stroke="var(--a-b2)" stroke-width="1.6" d="M35 11.6Q30 30 32.4 50M35 11.6Q46 26 49 49"/>' +
    '<path fill="var(--a-b1)" opacity="0.6" d="M15 40Q14 26 22 19Q28 14.6 33 14Q27 24 27.6 44Q20 43 15 40Z"/>' +
    '<path fill="var(--a-b3)" d="M12 44Q36 52 56 48L57 51Q36 55 12 47Z"/><ellipse cx="35" cy="11.4" rx="3.6" ry="2" fill="var(--a-b3)"/>' +
    '<ellipse cx="34.4" cy="10.8" rx="2.6" ry="1.3" fill="var(--a-b)"/>' +
    '<ellipse cx="46" cy="20" rx="4" ry="2" fill="var(--a-b1)" opacity="0.9" transform="rotate(30 46 20)"/>' +
    '<circle cx="51" cy="40" r="1.4" fill="var(--a-b3)"/><circle cx="41" cy="40" r="1.4" fill="var(--a-b3)"/>',
  shoes:
    '<ellipse cx="33" cy="57.6" rx="29" ry="2.4" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-v2)" d="M5 46V30Q5 23 12 22.4L22 21.6Q26.4 21.6 28.4 25.6L31.6 29.6Q40 31.6 48 33.6Q60.6 37 60.6 46Z"/>' +
    '<path fill="var(--a-v)" d="M5.2 44.8V29.6Q5.2 23 11.8 22.4L21.3 21.6Q25.5 21.6 27.4 25.4L30.4 29.2Q38.4 31.1 46 33Q58 36.3 58 44.8Z"/>' +
    '<path fill="var(--a-v3)" d="M7.6 24.6Q14 21.4 22.6 22.2Q24.6 25.4 20.6 27Q13.6 28.4 7.6 26.6Z"/>' +
    '<path fill="var(--a-w3)" d="M47.6 33.4Q60.6 37 60.6 46H45.4Q43.6 40 47.6 33.4Z"/>' +
    '<path fill="var(--a-w)" d="M48 34.4Q58.6 37.6 59.4 44.6H46.6Q45 39.6 48 34.4Z"/><path fill="var(--a-v3)" d="M4 26Q4 22 7 21.4H9.6V31H4Z"/>' +
    '<path fill="var(--a-v2)" d="M4.6 26Q4.6 22.6 7.2 22.2H9V30.4H4.6Z"/>' +
    '<path fill="none" stroke="var(--a-w)" stroke-width="2.8" d="M11 40.6Q24 43 38 36.4"/>' +
    '<path fill="none" stroke="var(--a-w3)" stroke-width="2.6" d="M27.6 27.4L33 24.4M31 30.6L36.6 27.6M35.4 32.4L40.4 29.6"/>' +
    '<path fill="none" stroke="var(--a-w)" stroke-width="1.8" d="M27.6 27L32.6 24.2M31 30.2L36 27.4M35.4 32L40 29.4"/>' +
    '<path fill="var(--a-w3)" d="M3 45H59Q62.6 45 62 49.4Q61.4 54 56 54H8Q3 54 3 50Z"/>' +
    '<path fill="var(--a-w)" d="M3 45H58.6Q61.4 45 61 48.6Q60.4 51.6 56 51.6H7.6Q3 51.6 3 48.6Z"/>' +
    '<path fill="none" stroke="var(--a-e1)" stroke-width="1.4" d="M6 51.6H58"/>' +
    '<ellipse cx="14" cy="28.6" rx="4" ry="1.6" fill="var(--a-v1)" opacity="0.9" transform="rotate(-10 14 28.6)"/>',
  eraser:
    '<ellipse cx="33" cy="54" rx="26" ry="3" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-p1)" d="M9.4 38.7Q9 32.4 14.5 30.1L51.6 15.1L48.3 22.9Z"/>' +
    '<path fill="var(--a-p)" d="M9.4 38.7L48.3 22.9L53.5 35.9L16.5 50.9Q12.7 52.4 11.2 48.7L9 43.1Q7.5 39.4 9.4 38.7Z"/>' +
    '<path fill="var(--a-p2)" d="M48.3 22.9L51.6 15.1L56.9 28.1L53.5 35.9Z"/>' +
    '<path fill="var(--a-p3)" opacity="0.5" d="M11.2 48.7Q12.7 52.4 16.5 50.9L27.6 46.4L27 44.9L15.9 49.4Q13.6 50.3 12.4 48.2Z"/>' +
    '<path fill="var(--a-b1)" d="M24.2 32.7L27.5 24.9L51.6 15.1L48.3 22.9Z"/><path fill="var(--a-b)" d="M24.2 32.7L48.3 22.9L53.5 35.9L29.4 45.7Z"/>' +
    '<path fill="var(--a-b2)" d="M48.3 22.9L51.6 15.1L56.9 28.1L53.5 35.9Z"/><path fill="var(--a-w)" d="M26.1 37.3L50.2 27.6L51.7 31.3L27.6 41Z"/>' +
    '<path fill="var(--a-w2)" d="M50.2 27.6L53.5 19.8L55 23.5L51.7 31.3Z"/>' +
    '<path fill="var(--a-b3)" opacity="0.6" d="M24.2 32.7L25.5 32.2L30.7 45.1L29.4 45.7Z"/>' +
    '<path fill="var(--a-p1)" opacity="0.9" d="M12 39.8L21.2 36L21.8 37.5L12.6 41.3Z"/>' +
    '<ellipse cx="10" cy="52" rx="2" ry="1.2" fill="var(--a-p2)" transform="rotate(-20 10 52)"/>' +
    '<ellipse cx="16.6" cy="55.4" rx="1.4" ry="1" fill="var(--a-p2)"/><ellipse cx="5.6" cy="49" rx="1.2" ry="0.9" fill="var(--a-p)"/>',
  scissors:
    '<path fill="var(--a-r2)" d="M3.7 37.2Q6.2 43.3 13.6 40.3Q21 37.3 18.6 31.2Q16.1 25.1 8.7 28.1Q1.3 31.1 3.7 37.2ZM7.2 35.7Q6 32.6 9.9 31Q13.8 29.5 15 32.6Q16.3 35.8 12.4 37.3Q8.5 38.9 7.2 35.7Z"/>' +
    '<path fill="var(--a-r)" d="M4 37.6Q6.3 43.3 13.1 40.5Q20.1 37.7 17.8 32Q15.5 26.3 8.5 29.1Q1.7 31.9 4 37.6ZM7.2 36.3Q6 33.3 9.7 31.9Q13.3 30.4 14.5 33.4Q15.6 36.2 12 37.7Q8.4 39.2 7.2 36.3Z"/>' +
    '<path fill="var(--a-r2)" d="M28 36L17.6 36.9L16.8 32.1L26.9 30.6Z"/><path fill="var(--a-e3)" d="M28.3 37.8L57.6 22.3Q58.9 20.3 56.5 19.7L24.4 28.2Z"/>' +
    '<path fill="var(--a-e)" d="M28 38.6L57.3 23.1Q58.7 21 56.3 20.5L24.1 28.9Z"/>' +
    '<path fill="var(--a-e1)" opacity="0.9" d="M29 35.8L55.2 23.1L55 22.5L28.2 33.7Z"/>' +
    '<path fill="var(--a-r2)" d="M20.5 57.2Q14.9 53.7 19.1 46.9Q23.4 40.1 29 43.6Q34.6 47.1 30.3 53.9Q26.1 60.7 20.5 57.2ZM22.5 53.9Q25.4 55.7 27.6 52.2Q29.8 48.6 27 46.8Q24.1 45 21.9 48.6Q19.6 52.1 22.5 53.9Z"/>' +
    '<path fill="var(--a-r)" d="M20.1 56.8Q15 53.6 18.9 47.3Q22.9 41 28 44.2Q33.3 47.5 29.3 53.8Q25.4 60.1 20.1 56.8ZM22 53.9Q24.7 55.5 26.8 52.2Q28.8 48.9 26.1 47.2Q23.5 45.6 21.4 48.9Q19.4 52.2 22 53.9Z"/>' +
    '<path fill="var(--a-r2)" d="M25.9 33.4L23.1 43.5L27.8 45.2L31 35.4Z"/><path fill="var(--a-e3)" d="M24.1 32.9L44.5 6.7Q46.7 5.8 46.9 8.2L32.9 38.4Z"/>' +
    '<path fill="var(--a-e)" d="M23.3 33L43.7 6.8Q46 5.9 46.1 8.3L32.2 38.5Z"/>' +
    '<path fill="var(--a-e1)" opacity="0.9" d="M26.3 32.5L43.3 8.9L43.8 9.3L28.1 33.6Z"/><circle cx="29.4" cy="33.4" r="3.4" fill="var(--a-e3)"/>' +
    '<circle cx="29" cy="33" r="2.8" fill="var(--a-e1)"/><circle cx="28.4" cy="32.4" r="1" fill="var(--a-w)"/>',
  soap:
    '<ellipse cx="32" cy="54" rx="27" ry="2.6" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-c2)" d="M6 34Q6 28 13 28H51Q58 28 58 34V44Q58 51 51 51H13Q6 51 6 44Z"/>' +
    '<path fill="var(--a-c)" d="M6 33.4Q6 28 12.6 28H50Q56.4 28 56.4 33.4V42.4Q56.4 48.4 50.4 48.4H12.6Q6 48.4 6 42.4Z"/>' +
    '<path fill="var(--a-c1)" d="M8 32.4Q8 25.6 15 25.6H49Q56 25.6 56 32.4Q56 37 50 37H14Q8 37 8 32.4Z"/>' +
    '<path fill="var(--a-c)" opacity="0.5" d="M14 29.6Q14 28 16 28H46Q50 28 50 31.6Q50 33.6 47 33.6H17Q14 33.6 14 31.6Z"/>' +
    '<ellipse cx="13" cy="41" rx="2.4" ry="4" fill="var(--a-c1)" opacity="0.6"/><circle cx="20" cy="18" r="7" fill="var(--a-w3)"/>' +
    '<circle cx="19.5" cy="17.5" r="6.2" fill="var(--a-w)"/>' +
    '<ellipse cx="17.1" cy="14.9" rx="2.2" ry="1.2" fill="var(--a-c1)" transform="rotate(-40 17.1 14.9)"/>' +
    '<circle cx="33.6" cy="14.6" r="8.6" fill="var(--a-w3)"/><circle cx="33" cy="14" r="7.6" fill="var(--a-w)"/>' +
    '<ellipse cx="30" cy="10.7" rx="2.8" ry="1.5" fill="var(--a-c1)" transform="rotate(-40 30 10.7)"/>' +
    '<circle cx="46" cy="19.4" r="5.6" fill="var(--a-w3)"/><circle cx="45.6" cy="19" r="4.9" fill="var(--a-w)"/>' +
    '<ellipse cx="43.6" cy="16.9" rx="1.8" ry="1" fill="var(--a-c1)" transform="rotate(-40 43.6 16.9)"/><circle cx="50" cy="8" r="3.4" fill="var(--a-w3)"/>' +
    '<circle cx="49.7" cy="7.7" r="2.9" fill="var(--a-w)"/><circle cx="13" cy="6.6" r="2.6" fill="var(--a-w3)"/>' +
    '<circle cx="12.8" cy="6.4" r="2.2" fill="var(--a-w)"/><circle cx="54.6" cy="26.4" r="2.2" fill="var(--a-w3)"/>' +
    '<circle cx="54.3" cy="26.1" r="1.8" fill="var(--a-w)"/>',
  sofa:
    '<ellipse cx="32" cy="57.4" rx="29" ry="2.4" fill="var(--a-k)" opacity="0.1"/><path fill="var(--a-n3)" d="M9 50H13.4L12.6 56.6H9.6Z"/>' +
    '<path fill="var(--a-n3)" d="M50.6 50H55L54.4 56.6H51.4Z"/><path fill="var(--a-o2)" d="M9 34V20Q9 13 16 13H48Q55 13 55 20V34Z"/>' +
    '<path fill="var(--a-o)" d="M9.2 33V19.7Q9.2 13.1 15.8 13.1H46.2Q52.9 13.1 52.9 19.7V33Z"/>' +
    '<path fill="none" stroke="var(--a-o2)" stroke-width="1.6" d="M32 15V33"/><ellipse cx="18" cy="17.4" rx="5" ry="1.8" fill="var(--a-o1)" opacity="0.9"/>' +
    '<path fill="var(--a-o2)" d="M11 32Q11 29 14 29H50Q53 29 53 32V41H11Z"/>' +
    '<path fill="var(--a-o1)" d="M12 31.6Q12 29.4 14.4 29.4H31V36H12ZM33 29.4H49.6Q52 29.4 52 31.6V36H33Z"/>' +
    '<path fill="var(--a-o3)" d="M8 40H56V50Q56 52 54 52H10Q8 52 8 50Z"/><path fill="var(--a-o2)" d="M8 40H56V47H8Z"/>' +
    '<path fill="var(--a-o2)" d="M2 32Q2 26 7.6 26Q13.4 26 13.4 32V50Q13.4 52 11.4 52H4Q2 52 2 50Z"/>' +
    '<path fill="var(--a-o)" d="M2.1 31.8Q2.1 26.2 7.3 26.2Q12.6 26.2 12.6 31.8V48.3Q12.6 50.2 10.8 50.2H3.9Q2.1 50.2 2.1 48.3Z"/>' +
    '<path fill="var(--a-o2)" d="M50.6 32Q50.6 26 56.4 26Q62 26 62 32V50Q62 52 60 52H52.6Q50.6 52 50.6 50Z"/>' +
    '<path fill="var(--a-o)" d="M50.7 31.8Q50.7 26.2 56 26.2Q61.2 26.2 61.2 31.8V48.3Q61.2 50.2 59.4 50.2H52.5Q50.7 50.2 50.7 48.3Z"/>' +
    '<ellipse cx="6" cy="29.4" rx="2.4" ry="1.4" fill="var(--a-o1)" transform="rotate(-20 6 29.4)"/>' +
    '<ellipse cx="54.6" cy="29.4" rx="2.4" ry="1.4" fill="var(--a-o1)" transform="rotate(-20 54.6 29.4)"/>' +
    '<path fill="var(--a-y2)" d="M38 22Q38 18 42 18.6L49 19.6Q52 20 51 24L50 29.6Q49.4 32 46.6 31.4L40 30Q37.4 29.4 37.6 26.6Z"/>' +
    '<path fill="var(--a-y)" d="M38.1 21.8Q38.1 18.1 41.8 18.7L48.2 19.6Q51 20 50.1 23.7L49.1 28.8Q48.6 31 46 30.5L39.9 29.2Q37.5 28.6 37.7 26Z"/>',
  paper:
    '<ellipse cx="33" cy="60" rx="22" ry="2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-w3)" d="M9.4 6.4L44.2 3.4L54.6 12.8L57.6 56.6L13.6 59.6Z"/>' +
    '<path fill="var(--a-w)" d="M11.4 8.4L43.4 5.6L52.2 13.6L55.4 54.6L15.2 57.4Z"/>' +
    '<path fill="var(--a-w2)" opacity="0.7" d="M52.2 13.6L55.4 54.6L48 55.2Z"/><path fill="var(--a-w3)" d="M44 4L45 14.4L54 13Z"/>' +
    '<path fill="var(--a-w2)" d="M44.4 6L45.4 13.4L52 12.6Z"/>' +
    '<path fill="none" stroke="var(--a-b)" stroke-width="1.4" d="M14.2 18.6L46.2 16.4M15 26L51 23.4M15.6 33.4L51.6 30.8M16.2 40.8L52.2 38.2M16.8 48.2L52.8 45.6"/>' +
    '<path fill="none" stroke="var(--a-r)" stroke-width="1.4" d="M20.6 8L24.4 56.6"/>' +
    '<path fill="none" stroke="var(--a-e3)" stroke-width="1.6" opacity="0.9" d="M26 15.4Q29 13 31 15.4Q33 17.4 35 15M26.6 22.6Q30 20.6 33 22.6Q36 24.4 40 22M27.2 30Q30 28 32 30Q34 31.6 37 29.4"/>',
  chick:
    '<ellipse cx="32" cy="60.6" rx="20" ry="2.2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="none" stroke="var(--a-y2)" stroke-width="2.4" d="M30 13Q28 7 31 4M33 13Q34.6 8 38 6.6"/>' +
    '<circle cx="32" cy="30" r="18" fill="var(--a-y2)"/><circle cx="31.1" cy="29.1" r="16.6" fill="var(--a-y)"/>' +
    '<ellipse cx="24.4" cy="21.9" rx="5.8" ry="3.1" fill="var(--a-y1)" opacity="0.9" transform="rotate(-40 24.4 21.9)"/>' +
    '<path fill="var(--a-y2)" d="M13.6 34Q9 31 8 36Q9 41 15 41Z"/><path fill="var(--a-y2)" d="M50.4 34Q55 31 56 36Q55 41 49 41Z"/>' +
    '<ellipse cx="25.6" cy="26" rx="2.4" ry="3" fill="var(--a-k)"/><circle cx="24.8" cy="24.8" r="1" fill="var(--a-w)"/>' +
    '<ellipse cx="38.4" cy="26" rx="2.4" ry="3" fill="var(--a-k)"/><circle cx="37.6" cy="24.8" r="1" fill="var(--a-w)"/>' +
    '<path fill="var(--a-o2)" d="M28.4 31Q32 29.4 35.6 31L32 36Z"/><path fill="var(--a-o)" d="M28.4 31Q32 29.4 35.6 31L32 33Z"/>' +
    '<ellipse cx="20.6" cy="32.4" rx="3" ry="1.9" fill="var(--a-p)" opacity="0.6"/>' +
    '<ellipse cx="43.4" cy="32.4" rx="3" ry="1.9" fill="var(--a-p)" opacity="0.6"/>' +
    '<path fill="var(--a-w3)" d="M8 37L14 33L19 39L25 33L31 39L37 33L43 39L49 33L56 37Q58 61 32 61Q6 61 8 37Z"/>' +
    '<path fill="var(--a-w2)" d="M9.2 38.2L14 35L19 41L25 35L31 41L37 35L43 41L49 35L54.8 38.2Q56.6 59.4 32 59.6Q7.4 59.4 9.2 38.2Z"/>' +
    '<path fill="var(--a-w)" d="M9.2 38.2L14 35L19 41L25 35L31 41L37 35L43 41L49 35L52.6 37.2Q53 54 30.6 56.4Q9.6 56 9.2 38.2Z"/>' +
    '<ellipse cx="15" cy="46" rx="2" ry="4" fill="var(--a-w2)" opacity="0.6" transform="rotate(-20 15 46)"/>',
  spoon:
    '<ellipse cx="34" cy="59" rx="20" ry="2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-e3)" d="M38.6 29.6L18 48Q14 52 13 56Q11.6 60.4 7 59.6Q3 58.6 4.6 54Q6.4 49.6 11.4 46.6L33.4 24.4Z"/>' +
    '<path fill="var(--a-e)" d="M36.4 28L16.6 46.6Q12.6 50.4 11.6 54.6Q10.6 57.6 7.6 57.2Q5.4 56.6 6.4 53.8Q8 50 12.4 47.2L33 25.6Z"/>' +
    '<path fill="none" stroke="var(--a-e1)" stroke-width="1.4" opacity="0.9" d="M31.6 27L12.4 45.6Q9.6 47.6 8 51"/>' +
    '<ellipse cx="45.6" cy="18.4" rx="10.6" ry="16.6" fill="var(--a-e3)" transform="rotate(45 45.6 18.4)"/>' +
    '<ellipse cx="44.8" cy="17.6" rx="9.6" ry="15.4" fill="var(--a-e1)" transform="rotate(45 44.8 17.6)"/>' +
    '<ellipse cx="43.6" cy="16.4" rx="7" ry="11.6" fill="var(--a-e)" transform="rotate(45 43.6 16.4)"/>' +
    '<ellipse cx="45.2" cy="18" rx="5.6" ry="9.6" fill="var(--a-e1)" transform="rotate(45 45.2 18)"/>' +
    '<ellipse cx="47.6" cy="20.4" rx="2" ry="4.6" fill="var(--a-w)" opacity="0.9" transform="rotate(45 47.6 20.4)"/>',
  pants:
    '<path fill="var(--a-b2)" d="M14 6H50L55 57Q55 60 52 60H39Q36.6 60 36.4 57.6L33 24Q32 22 31 24L27.6 57.6Q27.4 60 25 60H12Q9 60 9 57Z"/>' +
    '<path fill="var(--a-b)" d="M14.1 6H48.6L53.4 55Q53.4 57.8 50.6 57.8H38.1Q35.8 57.8 35.6 55.5L32.3 23.3Q31.4 21.4 30.4 23.3L27.1 55.5Q26.9 57.8 24.6 57.8H12.2Q9.3 57.8 9.3 55Z"/>' +
    '<path fill="var(--a-b2)" d="M14 6H50L50.6 13H13.4Z"/><path fill="var(--a-b)" d="M14 6H50L50.2 10.6H13.8Z"/>' +
    '<path fill="var(--a-b3)" d="M19 5H21.4V14H19ZM42.6 5H45V14H42.6Z"/><circle cx="32" cy="9" r="1.8" fill="var(--a-y2)"/>' +
    '<circle cx="31.8" cy="8.8" r="1.4" fill="var(--a-y)"/><path fill="none" stroke="var(--a-b3)" stroke-width="1.4" d="M32 13V22.4Q32 24 34.4 23"/>' +
    '<path fill="none" stroke="var(--a-b2)" stroke-width="1.6" d="M14 15Q20 20 24 13.6M50 15Q44 20 40 13.6"/>' +
    '<path fill="none" stroke="var(--a-o1)" stroke-width="1" opacity="0.9" d="M13.6 17Q20 22.6 25.4 13.6M50.4 17Q44 22.6 38.6 13.6M11.4 54H26.4M37.6 54H53.4"/>' +
    '<path fill="var(--a-b2)" d="M9.4 55H27.8L27.6 57.6Q27.4 60 25 60H12Q9 60 9 57Z"/>' +
    '<path fill="var(--a-b2)" d="M36.4 55H54.6L55 57Q55 60 52 60H39Q36.6 60 36.4 57.6Z"/>' +
    '<ellipse cx="17" cy="32" rx="1.8" ry="11" fill="var(--a-b1)" opacity="0.8" transform="rotate(3 17 32)"/>' +
    '<path fill="none" stroke="var(--a-b2)" stroke-width="1.4" opacity="0.8" d="M43.4 32L46 52"/>',
  butterfly:
    '<path fill="var(--a-o3)" d="M30 26Q22 6 9 6Q2 6 3 15Q4 26 15 31Q22 33 30 30Z"/>' +
    '<path fill="var(--a-o)" d="M29.3 25.5Q22.2 7.9 10.8 7.9Q4.6 7.9 5.5 15.8Q6.4 25.5 16.1 29.9Q22.2 31.7 29.3 29Z"/>' +
    '<path fill="var(--a-o3)" d="M34 26Q42 6 55 6Q62 6 61 15Q60 26 49 31Q42 33 34 30Z"/>' +
    '<path fill="var(--a-o)" d="M34.7 25.5Q41.8 7.9 53.2 7.9Q59.4 7.9 58.5 15.8Q57.6 25.5 47.9 29.9Q41.8 31.7 34.7 29Z"/>' +
    '<path fill="var(--a-o3)" d="M30 32Q22 31 15 36Q8 42 11 50Q15 57 23 51Q29 45 30 36Z"/>' +
    '<path fill="var(--a-o2)" d="M29.4 32.8Q22.6 32 16.5 36.3Q10.5 41.4 13.1 48.3Q16.5 54.3 23.4 49.2Q28.6 44 29.4 36.3Z"/>' +
    '<path fill="var(--a-o3)" d="M34 32Q42 31 49 36Q56 42 53 50Q49 57 41 51Q35 45 34 36Z"/>' +
    '<path fill="var(--a-o2)" d="M34.6 32.8Q41.4 32 47.5 36.3Q53.5 41.4 50.9 48.3Q47.5 54.3 40.6 49.2Q35.4 44 34.6 36.3Z"/>' +
    '<ellipse cx="13" cy="13" rx="4.6" ry="2.6" fill="var(--a-y)" transform="rotate(25 13 13)"/>' +
    '<ellipse cx="51" cy="13" rx="4.6" ry="2.6" fill="var(--a-y)" transform="rotate(-25 51 13)"/><circle cx="20.4" cy="22" r="2.2" fill="var(--a-y)"/>' +
    '<circle cx="43.6" cy="22" r="2.2" fill="var(--a-y)"/><circle cx="19.6" cy="42.6" r="2.4" fill="var(--a-y)"/>' +
    '<circle cx="44.4" cy="42.6" r="2.4" fill="var(--a-y)"/><circle cx="6.6" cy="12" r="1.1" fill="var(--a-w)"/>' +
    '<circle cx="8.4" cy="20" r="1.1" fill="var(--a-w)"/><circle cx="57.4" cy="12" r="1.1" fill="var(--a-w)"/>' +
    '<circle cx="55.6" cy="20" r="1.1" fill="var(--a-w)"/>' +
    '<ellipse cx="10.6" cy="10.4" rx="2" ry="1" fill="var(--a-o1)" opacity="0.9" transform="rotate(-20 10.6 10.4)"/>' +
    '<path fill="none" stroke="var(--a-k2)" stroke-width="1.6" d="M31 16Q28 8 23 5M33 16Q36 8 41 5"/><circle cx="23" cy="5" r="1.6" fill="var(--a-k2)"/>' +
    '<circle cx="41" cy="5" r="1.6" fill="var(--a-k2)"/><ellipse cx="32" cy="34" rx="3.2" ry="16" fill="var(--a-k2)"/>' +
    '<circle cx="32" cy="17.6" r="4" fill="var(--a-k2)"/><ellipse cx="31" cy="28" rx="1" ry="6" fill="var(--a-e3)" opacity="0.9"/>',
  church:
    '<ellipse cx="32" cy="60.4" rx="29" ry="2.2" fill="var(--a-k)" opacity="0.1"/><path fill="var(--a-m3)" d="M5 34L18 24H46L59 34V60H5Z"/>' +
    '<path fill="var(--a-m)" d="M6.4 34.6L18.6 25.4H45.4L57.6 34.6V58.6H6.4Z"/>' +
    '<path fill="var(--a-r2)" d="M3 35L18 22.6H46L61 35L58.6 37L45.6 26.4H18.4L5.4 37Z"/>' +
    '<path fill="var(--a-b2)" d="M10 46Q10 42 12.6 42Q15.2 42 15.2 46V53H10Z"/>' +
    '<path fill="var(--a-b1)" d="M10.8 46Q10.8 42.8 12.6 42.8Q14.4 42.8 14.4 46V48H10.8Z"/>' +
    '<path fill="var(--a-b2)" d="M48.8 46Q48.8 42 51.4 42Q54 42 54 46V53H48.8Z"/>' +
    '<path fill="var(--a-b1)" d="M49.6 46Q49.6 42.8 51.4 42.8Q53.2 42.8 53.2 46V48H49.6Z"/><path fill="var(--a-m3)" d="M22 22H42V60H22Z"/>' +
    '<path fill="var(--a-m)" d="M22 22H41.2V58.5H22Z"/><path fill="var(--a-m2)" d="M38.4 23H41.6V59H38.4Z"/>' +
    '<path fill="var(--a-r2)" d="M19.6 23.4L32 6L44.4 23.4Z"/><path fill="var(--a-r)" d="M20.6 22.6L32 6.6L38 22.6Z"/>' +
    '<path fill="var(--a-r1)" opacity="0.6" d="M22.6 21L31 9L26 21Z"/><path fill="var(--a-y2)" d="M31 0.4H33.6V7H31ZM28.4 2.4H36.2V4.6H28.4Z"/>' +
    '<path fill="var(--a-y)" d="M31 0.4H32.6V6.4H31ZM28.4 2.4H35.2V3.8H28.4Z"/><circle cx="32.4" cy="31.4" r="4.4" fill="var(--a-m3)"/>' +
    '<circle cx="32" cy="31" r="3.6" fill="var(--a-b)"/><circle cx="31.2" cy="30.2" r="1.4" fill="var(--a-b1)"/>' +
    '<path fill="var(--a-n2)" d="M26 60V47Q26 41 32 41Q38 41 38 47V60Z"/><path fill="var(--a-n)" d="M26 60V47Q26 41.6 31.4 41.6Q36.4 41.8 36.4 47V60Z"/>' +
    '<path fill="none" stroke="var(--a-n3)" stroke-width="1.2" d="M32 42V60"/><circle cx="30.6" cy="52" r="0.8" fill="var(--a-y)"/>' +
    '<circle cx="33.4" cy="52" r="0.8" fill="var(--a-y)"/><path fill="var(--a-e1)" d="M24 59H40V61.6H24Z"/>',
  motorcycle:
    '<ellipse cx="32" cy="59.6" rx="28" ry="2" fill="var(--a-k)" opacity="0.1"/><circle cx="14" cy="46" r="11.6" fill="var(--a-k2)"/>' +
    '<circle cx="14" cy="46" r="8.6" fill="var(--a-k)"/><circle cx="14" cy="46" r="4.6" fill="var(--a-e2)"/>' +
    '<circle cx="13.4" cy="45.4" r="3.6" fill="var(--a-e1)"/><circle cx="14" cy="46" r="1.4" fill="var(--a-e3)"/>' +
    '<circle cx="50" cy="46" r="11.6" fill="var(--a-k2)"/><circle cx="50" cy="46" r="8.6" fill="var(--a-k)"/>' +
    '<circle cx="50" cy="46" r="4.6" fill="var(--a-e2)"/><circle cx="49.4" cy="45.4" r="3.6" fill="var(--a-e1)"/>' +
    '<circle cx="50" cy="46" r="1.4" fill="var(--a-e3)"/><path fill="none" stroke="var(--a-e2)" stroke-width="3" d="M50 46L44 22"/>' +
    '<path fill="none" stroke="var(--a-e3)" stroke-width="3" d="M14 46L28 42"/><path fill="var(--a-e3)" d="M24 36H38L36 47H26Z"/>' +
    '<path fill="var(--a-e2)" d="M25 36H37L35.6 44H26Z"/><path fill="none" stroke="var(--a-e3)" stroke-width="1.2" d="M26 39H36M26 42H35.4"/>' +
    '<path fill="var(--a-e1)" d="M8 51Q8 49 10 49H30Q32 49 32 51V52Q32 54 30 54H10Q8 54 8 52Z"/>' +
    '<path fill="var(--a-e)" d="M8 52H32V53Q32 54 30 54H10Q8 54 8 53Z"/><path fill="var(--a-r2)" d="M20 34Q22 26 30 25H44Q48 25 49 28L50 33Q42 38 36 37Z"/>' +
    '<path fill="var(--a-r)" d="M20.2 33.5Q22.1 25.9 29.6 25H42.8Q46.6 25 47.5 27.8L48.4 32.5Q40.9 37.2 35.3 36.3Z"/>' +
    '<path fill="var(--a-k2)" d="M6 30Q8 26.6 16 27L24 28Q24 33 22 34Q14 35 7 34Q5 33 6 30Z"/>' +
    '<ellipse cx="12" cy="29" rx="4" ry="1" fill="var(--a-e3)" opacity="0.8"/>' +
    '<path fill="var(--a-r2)" d="M2 33Q4 31 10 33L24 34L22 38Q12 39 4 37Q1.6 36 2 33Z"/>' +
    '<path fill="var(--a-r)" d="M2.4 33Q4.6 31.4 10 32.8L23 33.6L22 36Q12 37 4.6 35.6Q2 35 2.4 33Z"/>' +
    '<ellipse cx="33" cy="28.2" rx="5" ry="1.6" fill="var(--a-r1)" transform="rotate(-6 33 28.2)"/>' +
    '<path fill="none" stroke="var(--a-k2)" stroke-width="2.4" d="M43 22L40 15H35"/>' +
    '<path fill="none" stroke="var(--a-e3)" stroke-width="1.6" d="M41 17L38 9.6"/><ellipse cx="37.6" cy="9" rx="2.4" ry="1.6" fill="var(--a-e2)"/>' +
    '<circle cx="50" cy="25.4" r="4.6" fill="var(--a-y2)"/><circle cx="49.6" cy="25" r="3.9" fill="var(--a-y)"/>' +
    '<ellipse cx="48.1" cy="23.3" rx="1.5" ry="0.8" fill="var(--a-w)" transform="rotate(-40 48.1 23.3)"/>',
  leaf:
    '<path fill="none" stroke="var(--a-g3)" stroke-width="3" d="M17 49Q11 55 6 60"/>' +
    '<path fill="var(--a-g2)" d="M15 50Q6 30 18 16Q30 4 58 5Q60 32 46 44Q32 56 15 50Z"/>' +
    '<path fill="var(--a-g)" d="M15.6 48.4Q8 30 19 17.6Q30 6.6 55.6 7.2Q56.6 31 44.6 42Q32 52.6 15.6 48.4Z"/>' +
    '<path fill="none" stroke="var(--a-g3)" stroke-width="2.2" opacity="0.9" d="M15 50Q30 30 54 8"/>' +
    '<path fill="none" stroke="var(--a-g2)" stroke-width="1.6" d="M22 41Q20 33 21 25M28 34Q27 25 30 17M35 27Q35 19 39 12M24 40Q32 41 40 37M31 32Q39 33 47 28M38 24Q45 24 51 18"/>' +
    '<path fill="var(--a-g1)" opacity="0.9" d="M18 34Q16 24 23 18Q30 12 40 10Q28 16 23 23Q19 28 18 34Z"/>',
  door:
    '<ellipse cx="32" cy="61" rx="24" ry="1.8" fill="var(--a-k)" opacity="0.1"/><path fill="var(--a-w3)" d="M10 60V6Q10 3 13 3H51Q54 3 54 6V60Z"/>' +
    '<path fill="var(--a-w)" d="M10 60V6Q10 3.6 12.6 3.6H51Q52.8 3.6 52.8 6V60Z"/><path fill="var(--a-n2)" d="M15 60V9H49V60Z"/>' +
    '<path fill="var(--a-n)" d="M15 58.5V9H48V58.5Z"/>' +
    '<path fill="var(--a-n2)" d="M19.6 13.4H30.4V30H19.6ZM33.6 13.4H44.4V30H33.6ZM19.6 35H30.4V55H19.6ZM33.6 35H44.4V55H33.6Z"/>' +
    '<path fill="var(--a-n1)" opacity="0.9" d="M19.6 13.4H30.4V15H21.2V30H19.6ZM33.6 13.4H44.4V15H35.2V30H33.6ZM19.6 35H30.4V36.6H21.2V55H19.6ZM33.6 35H44.4V36.6H35.2V55H33.6Z"/>' +
    '<circle cx="44.6" cy="33" r="2.8" fill="var(--a-y2)"/><circle cx="44.3" cy="32.7" r="2.3" fill="var(--a-y)"/>' +
    '<ellipse cx="43.4" cy="31.7" rx="0.9" ry="0.5" fill="var(--a-w)" opacity="0.8" transform="rotate(-40 43.4 31.7)"/>' +
    '<path fill="none" stroke="var(--a-n1)" stroke-width="1.4" opacity="0.6" d="M17 11V58"/><path fill="var(--a-e2)" d="M7 58H57V62H7Z"/>' +
    '<path fill="var(--a-e1)" d="M7 58H57V59.6H7Z"/>',
  sheep:
    '<ellipse cx="34" cy="59.6" rx="22" ry="2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-k2)" d="M22 44H26.4V57Q26.4 59 24.2 59Q22 59 22 57ZM42 44H46.4V57Q46.4 59 44.2 59Q42 59 42 57Z"/>' +
    '<path fill="var(--a-k)" d="M28 44H31.6V55.6Q31.6 57.4 29.8 57.4Q28 57.4 28 55.6ZM48 44H51.6V55.6Q51.6 57.4 49.8 57.4Q48 57.4 48 55.6Z"/>' +
    '<path fill="var(--a-w3)" d="M36 15.6Q43.7 11.5 47.4 18.2Q56.7 18 55.1 25.2Q63.1 29 56.8 34.3Q60.9 40.9 51.9 42.7Q50.8 50 41.9 47.7Q36 53.4 30.1 47.7Q21.2 50 20.1 42.7Q11.1 40.9 15.2 34.3Q8.9 29 16.9 25.2Q15.3 18 24.6 18.2Q28.3 11.5 36 15.6Z"/>' +
    '<path fill="var(--a-w2)" d="M35.4 15.7Q42.8 11.8 46.4 18.2Q55.3 18 53.8 24.9Q61.5 28.6 55.4 33.6Q59.3 40 50.7 41.7Q49.6 48.7 41.1 46.5Q35.4 52 29.8 46.5Q21.2 48.7 20.2 41.7Q11.5 40 15.5 33.6Q9.4 28.6 17.1 24.9Q15.6 18 24.5 18.2Q28 11.8 35.4 15.7Z"/>' +
    '<path fill="var(--a-w)" d="M34.6 15.6Q41.5 12 44.9 18Q53.2 17.8 51.8 24.3Q59 27.7 53.3 32.5Q57 38.4 48.9 40Q47.9 46.6 39.9 44.5Q34.6 49.7 29.3 44.5Q21.3 46.6 20.3 40Q12.2 38.4 15.9 32.5Q10.2 27.7 17.4 24.3Q16 17.8 24.3 18Q27.7 12 34.6 15.6Z"/>' +
    '<circle cx="28" cy="22" r="3.4" fill="var(--a-w2)" opacity="0.7"/><circle cx="41" cy="21" r="3.6" fill="var(--a-w2)" opacity="0.7"/>' +
    '<circle cx="33" cy="34" r="3.4" fill="var(--a-w2)" opacity="0.6"/><circle cx="47" cy="33" r="3" fill="var(--a-w2)" opacity="0.6"/>' +
    '<path fill="var(--a-k2)" d="M4 22Q4 13 12 12Q20 12 20.6 21Q21 30 14 33Q9 35 6 31Q4 28 4 22Z"/>' +
    '<path fill="var(--a-e3)" opacity="0.6" d="M4.6 22Q4.6 14 11.6 13Q18 13.4 18.6 20Q19 26 14 28Q8 30 6 27.6Q4.6 26 4.6 22Z"/>' +
    '<ellipse cx="19.4" cy="17" rx="5" ry="2.4" fill="var(--a-k2)" transform="rotate(25 19.4 17)"/>' +
    '<ellipse cx="19.4" cy="17.2" rx="3" ry="1.2" fill="var(--a-p2)" opacity="0.8" transform="rotate(25 19.4 17.2)"/>' +
    '<circle cx="11" cy="10.6" r="3.6" fill="var(--a-w3)"/><circle cx="14.6" cy="10.4" r="3.4" fill="var(--a-w3)"/>' +
    '<circle cx="10.6" cy="10" r="3" fill="var(--a-w)"/><circle cx="14.2" cy="9.8" r="2.8" fill="var(--a-w)"/>' +
    '<circle cx="10.4" cy="19.4" r="2" fill="var(--a-w)"/><circle cx="10.4" cy="19.6" r="1.3" fill="var(--a-k)"/>' +
    '<circle cx="9.9" cy="19" r="0.5" fill="var(--a-w)"/><ellipse cx="6.6" cy="27.6" rx="1.2" ry="0.8" fill="var(--a-k)" opacity="0.8"/>',
  umbrella:
    '<path fill="var(--a-b1)" d="M8 40Q10 44 10 46Q10 48 8 48Q6 48 6 46Q6 44 8 40ZM56 38Q58 42 58 44Q58 46 56 46Q54 46 54 44Q54 42 56 38ZM48 50Q50 54 50 56Q50 58 48 58Q46 58 46 56Q46 54 48 50ZM14 52Q16 56 16 58Q16 60 14 60Q12 60 12 58Q12 56 14 52Z"/>' +
    '<path fill="none" stroke="var(--a-n3)" stroke-width="3.6" d="M32 26V52Q32 58 26.6 58Q22 58 22 53.6"/>' +
    '<path fill="none" stroke="var(--a-n1)" stroke-width="1.2" opacity="0.8" d="M31.4 30V51"/>' +
    '<path fill="var(--a-b2)" d="M4 30Q4 6 32 5Q60 6 60 30Q53 25 46 30Q39 25 32 30Q25 25 18 30Q11 25 4 30Z"/>' +
    '<path fill="var(--a-b)" d="M4.5 28.6Q4.5 6 30.8 5.1Q57.1 6 57.1 28.6Q50.5 23.9 44 28.6Q37.4 23.9 30.8 28.6Q24.2 23.9 17.6 28.6Q11.1 23.9 4.5 28.6Z"/>' +
    '<path fill="var(--a-b2)" opacity="0.9" d="M19 26.6Q20 12 32 5.6Q24 14 25.4 27.4Z"/>' +
    '<path fill="var(--a-b2)" opacity="0.9" d="M45 26.6Q44 12 32 5.6Q40 14 38.6 27.4Z"/>' +
    '<ellipse cx="16" cy="15" rx="6" ry="2.6" fill="var(--a-b1)" transform="rotate(-35 16 15)"/><circle cx="32" cy="4.6" r="2" fill="var(--a-n3)"/>',
  storm:
    '<path fill="none" stroke="var(--a-b)" stroke-width="2.4" d="M14 44L11 51M24 46L21 53M46 44L43 51M52 48L49 55"/>' +
    '<path fill="var(--a-y2)" d="M30 30H42L36 41H44L26 62L31 46H23Z"/><path fill="var(--a-y)" d="M30.4 30H40.6L35 41.4H42.4L27.6 59L31.4 45H24Z"/>' +
    '<path fill="var(--a-y1)" opacity="0.9" d="M30.4 30H35L29 41.6H25.4Z"/>' +
    '<path fill="var(--a-e3)" d="M10 41Q2 41 2 33Q2 25 10 24Q11 14 21 13Q27 5 37 8Q45 5 50 13Q61 14 62 25Q63 37 54 41Z"/>' +
    '<path fill="var(--a-e2)" d="M10 38.6Q3.4 38.4 3.4 32.4Q3.6 25.4 10.6 24.6Q11.6 15.4 21 14.4Q27 7 36.4 9.6Q44 7 48.6 14.4Q58.6 15.6 59.4 25Q60 35 52 38.6Z"/>' +
    '<path fill="var(--a-e1)" opacity="0.6" d="M11 26Q12 17 21 16Q26 10 33 10.6Q26 14 23 19Q15 19 14 27Z"/>',
  boat:
    '<path fill="var(--a-b2)" d="M2 52Q8 48 14 52Q20 56 26 52Q32 48 38 52Q44 56 50 52Q56 48 62 52V58Q62 61 59 61H5Q2 61 2 58Z"/>' +
    '<path fill="var(--a-b)" d="M2 53.6Q8 49.6 14 53.6Q20 57.6 26 53.6Q32 49.6 38 53.6Q44 57.6 50 53.6Q56 49.6 62 53.6V57Q62 58.6 60 58.6H4Q2 58.6 2 57Z"/>' +
    '<path fill="var(--a-r2)" d="M4 40H60L52 53Q51 55 48 55H15Q12 55 11 53Z"/>' +
    '<path fill="var(--a-r)" d="M4.1 40H57.3L49.7 52.4Q48.8 54.3 45.9 54.3H14.6Q11.7 54.3 10.8 52.4Z"/>' +
    '<path fill="var(--a-w)" d="M5.6 42.6H58.6L57.4 45H7.4Z"/><path fill="var(--a-n2)" d="M31 4H34V41H31Z"/><path fill="var(--a-w3)" d="M30 7L30 37H8Z"/>' +
    '<path fill="var(--a-w)" d="M28.6 10.6V35.6H10.6Z"/><path fill="var(--a-w3)" d="M35 9Q50 16 56 37H35Z"/>' +
    '<path fill="var(--a-w)" d="M36.4 12Q48.6 18.6 53.6 35.6H36.4Z"/>' +
    '<path fill="none" stroke="var(--a-w2)" stroke-width="1.4" opacity="0.9" d="M36.4 23Q44 24 51 29M28.6 24Q20 25 18 26"/>' +
    '<path fill="var(--a-y2)" d="M34 4H42L39.6 7L42 10H34Z"/><path fill="var(--a-y)" d="M34 4H41L39 6.6H34Z"/>',
  clock:
    '<ellipse cx="32" cy="61" rx="20" ry="2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="none" stroke="var(--a-r3)" stroke-width="3.4" d="M18 50L13 58M46 50L51 58"/><path fill="var(--a-r3)" d="M30 7H34V12H30Z"/>' +
    '<path fill="none" stroke="var(--a-e3)" stroke-width="2" d="M32 6V3"/><path fill="var(--a-e3)" d="M6 17Q4 8 13 5Q20 3 22 10Z"/>' +
    '<path fill="var(--a-e1)" d="M7 15.6Q6 9 13 6.6Q18.6 5 20 10Z"/><path fill="var(--a-e3)" d="M58 17Q60 8 51 5Q44 3 42 10Z"/>' +
    '<path fill="var(--a-e1)" d="M57 15.6Q58 9 51 6.6Q45.4 5 44 10Z"/><circle cx="32.6" cy="34.6" r="22.4" fill="var(--a-r2)"/>' +
    '<circle cx="31.6" cy="33.6" r="21.4" fill="var(--a-r)"/><ellipse cx="19" cy="21" rx="6" ry="3" fill="var(--a-r1)" transform="rotate(-40 19 21)"/>' +
    '<circle cx="32.6" cy="34.6" r="16.6" fill="var(--a-w3)"/><circle cx="32" cy="34" r="16" fill="var(--a-w)"/>' +
    '<path fill="none" stroke="var(--a-k2)" stroke-width="2" d="M32 20.6V23M32 45V47.4M45.4 34H43M21 34H18.6"/>' +
    '<path fill="none" stroke="var(--a-k2)" stroke-width="2" d="M39 22.6h0.1M43.6 27h0.1M43.6 41h0.1M39 45.4h0.1M25 45.4h0.1M20.4 41h0.1M20.4 27h0.1M25 22.6h0.1"/>' +
    '<path fill="none" stroke="var(--a-k)" stroke-width="2.6" d="M32 34V24.6M32 34L39 38"/><circle cx="32" cy="34" r="2" fill="var(--a-r)"/>',
  books:
    '<ellipse cx="32" cy="60" rx="28" ry="2" fill="var(--a-k)" opacity="0.1"/><path fill="var(--a-g2)" d="M4 46H60V56Q60 58 58 58H6Q4 58 4 56Z"/>' +
    '<path fill="var(--a-g)" d="M4 46H56V55.4Q56 56.4 55 56.4H5Q4 56.4 4 55.4Z"/><path fill="var(--a-w3)" d="M56 47.4H60V56.6H56Z"/>' +
    '<path fill="none" stroke="var(--a-w2)" stroke-width="1" d="M56.6 50H59.4M56.6 53H59.4"/><path fill="var(--a-y)" d="M10 46H13V58H10Z"/>' +
    '<path fill="var(--a-g1)" opacity="0.8" d="M4 46H60V47.6H4Z"/><path fill="var(--a-b2)" d="M7 34H57V46H7Z"/>' +
    '<path fill="var(--a-b)" d="M7 34H53V44.6H7Z"/><path fill="var(--a-w3)" d="M53 35.4H57V44.6H53Z"/>' +
    '<path fill="none" stroke="var(--a-w2)" stroke-width="1" d="M53.6 38H56.4M53.6 41H56.4"/><path fill="var(--a-y)" d="M14 34H17V46H14Z"/>' +
    '<path fill="var(--a-b1)" opacity="0.8" d="M7 34H57V35.6H7Z"/><path fill="var(--a-r2)" d="M10 20H54V34H10Z"/>' +
    '<path fill="var(--a-r)" d="M10 20H50V32.4H10Z"/><path fill="var(--a-w3)" d="M50 21.6H54V32.6H50Z"/>' +
    '<path fill="none" stroke="var(--a-w2)" stroke-width="1" d="M50.6 24.6H53.4M50.6 27.6H53.4M50.6 30.6H53.4"/>' +
    '<path fill="var(--a-y)" d="M17 20H20V34H17Z"/><path fill="var(--a-r1)" opacity="0.8" d="M10 20H54V21.6H10Z"/>' +
    '<path fill="var(--a-v)" d="M38 30H42V39L40 37L38 39Z"/><circle cx="30" cy="12.6" r="7" fill="var(--a-r2)"/>' +
    '<circle cx="29.5" cy="12.1" r="6.2" fill="var(--a-r)"/>' +
    '<ellipse cx="27.1" cy="9.5" rx="2.2" ry="1.2" fill="var(--a-r1)" transform="rotate(-40 27.1 9.5)"/>' +
    '<path fill="none" stroke="var(--a-n2)" stroke-width="1.8" d="M30 6V2.4"/><path fill="var(--a-g)" d="M31 4Q35 0.6 39 3Q35 6.4 31 4Z"/>',
  lamp:
    '<ellipse cx="32" cy="61" rx="16" ry="1.8" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-e3)" d="M18 58Q18 53 24 52H40Q46 53 46 58V59Q46 60 45 60H19Q18 60 18 59Z"/>' +
    '<path fill="var(--a-e1)" d="M19 57.4Q19 53.6 24 53H39Q44 53.6 44.4 57.4Z"/><path fill="var(--a-e3)" d="M29.6 34H34.6V53H29.6Z"/>' +
    '<path fill="var(--a-e1)" d="M29.6 34H31.4V53H29.6Z"/><path fill="var(--a-y1)" opacity="0.6" d="M14 34H50L44 44Q32 46 20 44Z"/>' +
    '<path fill="var(--a-y2)" d="M20 4H44L54 34H10Z"/><path fill="var(--a-y)" d="M20.6 4.6H42.4L51.4 32.6H11.4Z"/>' +
    '<path fill="var(--a-y1)" opacity="0.9" d="M20.6 4.6H27L19 32.6H11.4Z"/><path fill="var(--a-y3)" d="M10 32H54V35.6H10Z"/>' +
    '<path fill="none" stroke="var(--a-y2)" stroke-width="1.4" opacity="0.8" d="M23.6 9.6H40.6"/>' +
    '<path fill="var(--a-y1)" opacity="0.9" d="M21 6H24.6V7.6H21Z"/>',
  gamepad:
    '<ellipse cx="32" cy="56" rx="26" ry="2.4" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-v2)" d="M14 18H50Q60 18 62 32Q64 46 58 50Q52 54 46 46L42 40H22L18 46Q12 54 6 50Q0 46 2 32Q4 18 14 18Z"/>' +
    '<path fill="var(--a-v)" d="M13.8 18H48Q57.5 18 59.4 31.3Q61.3 44.6 55.6 48.4Q49.9 52.2 44.2 44.6L40.4 38.9H21.4L17.6 44.6Q11.9 52.2 6.2 48.4Q0.5 44.6 2.4 31.3Q4.3 18 13.8 18Z"/>' +
    '<ellipse cx="13" cy="24" rx="6" ry="2.4" fill="var(--a-v1)" transform="rotate(-15 13 24)"/>' +
    '<path fill="var(--a-v3)" d="M14 26H18V30H22V34H18V38H14V34H10V30H14Z"/>' +
    '<path fill="var(--a-k2)" d="M14.6 26.6H17.4V30.6H21.4V33.4H17.4V37.4H14.6V33.4H10.6V30.6H14.6Z"/>' +
    '<circle cx="48" cy="26.6" r="2.8" fill="var(--a-y2)"/><circle cx="47.7" cy="26.3" r="2.4" fill="var(--a-y)"/>' +
    '<circle cx="53.6" cy="32" r="2.8" fill="var(--a-r2)"/><circle cx="53.3" cy="31.7" r="2.4" fill="var(--a-r)"/>' +
    '<circle cx="48" cy="37.4" r="2.8" fill="var(--a-g2)"/><circle cx="47.7" cy="37.1" r="2.4" fill="var(--a-g)"/>' +
    '<circle cx="42.4" cy="32" r="2.8" fill="var(--a-b2)"/><circle cx="42.1" cy="31.7" r="2.4" fill="var(--a-b)"/>' +
    '<path fill="var(--a-v3)" d="M26 27H30V29H26ZM34 27H38V29H34Z"/><circle cx="25.4" cy="38.6" r="4.2" fill="var(--a-v3)"/>' +
    '<circle cx="25" cy="38.2" r="3" fill="var(--a-k2)"/><circle cx="38.6" cy="38.6" r="4.2" fill="var(--a-v3)"/>' +
    '<circle cx="38.2" cy="38.2" r="3" fill="var(--a-k2)"/>',
});
