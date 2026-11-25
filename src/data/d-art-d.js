/* ---------- object art: eight reading picture words (DRAW8, the v196 word audit E1; DESIGN_SYSTEM.md section 6.5) ----------
   docs/drafts/AUDIT-WORDS-READ.md row E1: these picture words showed the wrong picture (an emoji fallback): feet one foot, torch a
   flashlight, purse the bag's handbag, dew the drop of water, hawk an eagle, draw a pencil, seed a sprout, mail a mailbox. The owner
   asked for drawings (forest was already swapped to storm). Each one is drawn so it cannot be taken for its neighbour:
   feet a pair of bare feet; torch a wooden stick with a wrapped head and a flame; purse a little clasp purse with two
   knobs and a strap (bag keeps its handbag); dew round drops on blades of grass (water is one big drop, leaf one leaf); hawk perched
   on a branch, brown with a pale streaked chest and a red-brown tail (the eagle has a white head and spread wings); draw a crayon
   drawing a red line on a sheet of paper (pencil is the pencil alone); seed five striped seeds, no sprout; mail an envelope with a
   stamp and a seal (vocabulary's mailbox keeps the mailbox).
   The art name is the word, so picFor(word, emoji) shows the drawing wherever the content asks for it: the picture words (TEAMS,
   RVW, VTW), the logic grids' hobby "draw" and Discover's "feet" (d-disc.js); Spanish has none of these words (el pie stays foot).
   Same rules and limits as sets A to C: 64x64 grid, light from the top left, only var(--a-x) roles from src/css/21-art.css,
   <path>/<circle>/<ellipse> only, up to 2,500 bytes and 40 elements each. Plain data, read only inside functions (A11).
   tools/test.js "object art DRAW8 E1" checks them. Review sheet: docs/drafts/DRAW8.png. */
Object.assign(ART, {
  feet:
    '<ellipse cx="32" cy="60.6" rx="26" ry="2.2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-s2)" d="M28 30Q20 22 9 27Q5.5 37 9.5 48Q11 59 18 59.5Q25.5 59.5 24.5 51Q23.5 45 27.5 40Q30.5 35 28 30Z"/>' +
    '<path fill="var(--a-s)" d="M26.2 30Q19 22.8 9.1 27.3Q6 36.3 9.5 46.2Q10.9 56.1 17.2 56.6Q24 56.6 23.1 48.9Q22.2 43.5 25.8 39Q28.5 34.5 26.2 30Z"/>' +
    '<path fill="var(--a-s1)" opacity="0.9" d="M26 32Q20 27 13 29Q18 31 21 37Q24 36 26 32Z"/>' +
    '<path fill="var(--a-s2)" opacity="0.6" d="M20.5 50Q16 48 12.5 51Q14 56 18 56.5Q21.5 56 20.5 50Z"/>' +
    '<circle cx="25" cy="21.2" r="5.2" fill="var(--a-s2)"/><circle cx="24" cy="20.2" r="4.5" fill="var(--a-s)"/>' +
    '<circle cx="17.2" cy="17.8" r="3.7" fill="var(--a-s2)"/><circle cx="16.5" cy="17.1" r="3.2" fill="var(--a-s)"/>' +
    '<circle cx="11.8" cy="19.2" r="3.2" fill="var(--a-s2)"/><circle cx="11.1" cy="18.5" r="2.8" fill="var(--a-s)"/>' +
    '<circle cx="7.7" cy="22.9" r="2.7" fill="var(--a-s2)"/><circle cx="7.2" cy="22.4" r="2.3" fill="var(--a-s)"/>' +
    '<circle cx="5.3" cy="27.7" r="2.3" fill="var(--a-s2)"/><circle cx="4.8" cy="27.2" r="2" fill="var(--a-s)"/>' +
    '<ellipse cx="23" cy="19" rx="2.2" ry="1.4" fill="var(--a-s1)" opacity="0.9"/>' +
    '<path fill="var(--a-s2)" d="M36 30Q44 22 55 27Q58.5 37 54.5 48Q53 59 46 59.5Q38.5 59.5 39.5 51Q40.5 45 36.5 40Q33.5 35 36 30Z"/>' +
    '<path fill="var(--a-s)" d="M36.2 30Q43.4 22.8 53.3 27.3Q56.5 36.3 52.9 46.2Q51.5 56.1 45.2 56.6Q38.5 56.6 39.4 48.9Q40.3 43.5 36.7 39Q34 34.5 36.2 30Z"/>' +
    '<path fill="var(--a-s1)" opacity="0.9" d="M38 32Q44 27 51 29Q46 31 43 37Q40 36 38 32Z"/>' +
    '<path fill="var(--a-s2)" opacity="0.6" d="M43.5 50Q48 48 51.5 51Q50 56 46 56.5Q42.5 56 43.5 50Z"/>' +
    '<circle cx="40.2" cy="21.2" r="5.2" fill="var(--a-s2)"/><circle cx="39.2" cy="20.2" r="4.5" fill="var(--a-s)"/>' +
    '<circle cx="47.6" cy="17.8" r="3.7" fill="var(--a-s2)"/><circle cx="46.9" cy="17.1" r="3.2" fill="var(--a-s)"/>' +
    '<circle cx="53" cy="19.2" r="3.2" fill="var(--a-s2)"/><circle cx="52.3" cy="18.5" r="2.8" fill="var(--a-s)"/>' +
    '<circle cx="56.9" cy="22.9" r="2.7" fill="var(--a-s2)"/><circle cx="56.4" cy="22.4" r="2.3" fill="var(--a-s)"/>' +
    '<circle cx="59.3" cy="27.7" r="2.3" fill="var(--a-s2)"/><circle cx="58.8" cy="27.2" r="2" fill="var(--a-s)"/>' +
    '<ellipse cx="38.2" cy="19" rx="2.2" ry="1.4" fill="var(--a-s1)" opacity="0.9"/>',
  torch:
    '<ellipse cx="28" cy="61" rx="14" ry="1.8" fill="var(--a-k)" opacity="0.1"/><path fill="var(--a-n2)" d="M31.4 35.3L38.1 37.7L28.3 61.8L23.4 60Z"/>' +
    '<path fill="var(--a-n)" d="M31.4 35.3L35.9 36.9L26.2 61.1L23.4 60Z"/>' +
    '<path fill="var(--a-n1)" opacity="0.8" d="M31.6 37.5L32.9 38L25.6 57.6L25.2 57.5Z"/>' +
    '<path fill="var(--a-t2)" d="M29.7 22.9Q39.5 23.3 47.3 29.4L41.1 40.5Q33.3 40.4 27.2 35.5Z"/>' +
    '<path fill="var(--a-t)" d="M29.7 22.9Q39.5 23.3 47.3 29.4L40.3 38.7Q33.5 38.8 28.1 34.3Z"/>' +
    '<path fill="var(--a-t1)" opacity="0.8" d="M30.6 25Q34.3 24.8 37 25.6L32.5 36.1Q30.2 35.5 29 34Z"/>' +
    '<path fill="none" stroke="var(--a-n3)" stroke-width="2.2" d="M28.8 27.5Q35.9 33.3 45 33.4M28.1 31.9Q34.4 37.4 42.7 37.3"/>' +
    '<ellipse cx="38.6" cy="25.8" rx="9.4" ry="2.6" fill="var(--a-n3)" transform="rotate(20 38.6 25.8)"/>' +
    '<path fill="var(--a-o2)" d="M26.9 25.6Q23.9 15.5 35.3 9.9Q32.9 6.6 39.9 3.2Q42.5 9.5 47.3 8.6Q53.9 16.7 50.9 25.6Q38.9 29 26.9 25.6Z"/>' +
    '<path fill="var(--a-o)" d="M28.1 24.6Q25.1 15.2 35.7 9.9Q33.5 6.8 39.9 3.6Q42.1 9.5 46.5 8.7Q52.7 16.2 49.7 24.6Q38.9 28 28.1 24.6Z"/>' +
    '<path fill="var(--a-y)" d="M31.7 24.2Q28.7 17.6 36.7 14Q35.3 11.8 39.9 9.6Q41.1 13.7 43.9 13.1Q49.1 18.4 46.1 24.2Q38.9 27.6 31.7 24.2Z"/>' +
    '<path fill="var(--a-y1)" d="M35.3 23.4Q32.3 19.8 37.8 17.8Q37.1 16.6 39.9 15.4Q40 17.7 41.4 17.3Q45.5 20.2 42.5 23.4Q38.9 26.8 35.3 23.4Z"/>' +
    '<circle cx="49.9" cy="4" r="1.8" fill="var(--a-o)"/><circle cx="28.9" cy="9" r="1.5" fill="var(--a-y)"/>',
  purse:
    '<ellipse cx="32" cy="60.6" rx="22" ry="2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="none" stroke="var(--a-v3)" stroke-width="3" d="M17.6 27Q16 8 32 7Q48 8 46.4 27"/>' +
    '<path fill="none" stroke="var(--a-v1)" stroke-width="1.4" opacity="0.6" d="M19 24Q18.4 10.4 30 9.4"/>' +
    '<path fill="var(--a-v2)" d="M14 31Q8 46 13 54Q17 59.6 32 59.6Q47 59.6 51 54Q56 46 50 31Z"/>' +
    '<path fill="var(--a-v)" d="M14.8 31.8Q9.4 45.3 13.9 52.5Q17.5 57.5 31 57.5Q44.5 57.5 48.1 52.5Q52.6 45.3 47.2 31.8Z"/>' +
    '<path fill="var(--a-v1)" opacity="0.9" d="M17 34Q13 44 16.6 51Q15 44 20.6 35Z"/>' +
    '<path fill="none" stroke="var(--a-v2)" stroke-width="1.6" opacity="0.6" d="M21 40Q32 44 43 40M19.6 47Q32 51.6 44.6 47"/>' +
    '<path fill="var(--a-y2)" d="M12 32Q12 24.6 21 24.6L43 24.6Q52 24.6 52 32Q52 34.6 49.4 34.6L14.6 34.6Q12 34.6 12 32Z"/>' +
    '<path fill="var(--a-y)" d="M12.8 31.4Q12.8 25.6 21 25.6L43 25.6Q50.6 25.6 50.6 31Q50.6 32.8 48.6 32.8L15 32.8Q12.8 32.8 12.8 31.4Z"/>' +
    '<path fill="var(--a-y1)" opacity="0.9" d="M15 29Q16.6 26.6 21 26.6L30 26.6L29.4 28.4L20 28.4Q17 28.6 15 29Z"/>' +
    '<circle cx="29" cy="21.8" r="4" fill="var(--a-y2)"/><circle cx="28.4" cy="21.2" r="3.5" fill="var(--a-y)"/>' +
    '<ellipse cx="27.6" cy="20.2" rx="1.7" ry="1.1" fill="var(--a-w)"/><circle cx="35.8" cy="21.8" r="4" fill="var(--a-y2)"/>' +
    '<circle cx="35.2" cy="21.2" r="3.5" fill="var(--a-y)"/><ellipse cx="34.4" cy="20.2" rx="1.7" ry="1.1" fill="var(--a-w)"/>',
  dew:
    '<ellipse cx="32" cy="61" rx="22" ry="1.8" fill="var(--a-k)" opacity="0.1"/><path fill="var(--a-g2)" d="M6 61Q7 38 1.6 15Q17 32 19 61Z"/>' +
    '<path fill="var(--a-g)" d="M5.9 58.9Q6.8 38.2 1.9 17.5Q15.8 32.8 17.6 58.9Z"/><path fill="var(--a-g2)" d="M37 61Q42 36 62.4 19Q54 40 52 61Z"/>' +
    '<path fill="var(--a-g)" d="M37.5 58.9Q42 36.4 60.4 21.1Q52.8 40 51 58.9Z"/><path fill="var(--a-g2)" d="M20 61Q16 30 30 2.6Q35.4 34 36 61Z"/>' +
    '<path fill="var(--a-g)" d="M20.2 58.1Q16.6 30.2 29.2 5.5Q34.1 33.8 34.6 58.1Z"/>' +
    '<path fill="var(--a-g1)" opacity="0.6" d="M22.6 54Q20.6 32 28.4 10Q25.6 32 26.4 54Z"/><circle cx="30.2" cy="17.3" r="6.4" fill="var(--a-c3)"/>' +
    '<circle cx="29" cy="16" r="5.5" fill="var(--a-c)"/><ellipse cx="30.7" cy="18.7" rx="2.7" ry="1.4" fill="var(--a-c1)" opacity="0.9"/>' +
    '<circle cx="27.2" cy="14.1" r="1.7" fill="var(--a-w)" opacity="0.95"/><circle cx="12.1" cy="37.4" r="5.6" fill="var(--a-c3)"/>' +
    '<circle cx="11.1" cy="36.3" r="4.8" fill="var(--a-c)"/><ellipse cx="12.5" cy="38.6" rx="2.4" ry="1.2" fill="var(--a-c1)" opacity="0.9"/>' +
    '<circle cx="9.5" cy="34.6" r="1.5" fill="var(--a-w)" opacity="0.95"/><circle cx="48.2" cy="38.6" r="7" fill="var(--a-c3)"/>' +
    '<circle cx="47" cy="37.2" r="6" fill="var(--a-c)"/><ellipse cx="48.8" cy="40.1" rx="2.9" ry="1.5" fill="var(--a-c1)" opacity="0.9"/>' +
    '<circle cx="45" cy="35.1" r="1.8" fill="var(--a-w)" opacity="0.95"/><circle cx="29.2" cy="46.2" r="4.6" fill="var(--a-c3)"/>' +
    '<circle cx="28.3" cy="45.3" r="4" fill="var(--a-c)"/><ellipse cx="29.5" cy="47.3" rx="1.9" ry="1" fill="var(--a-c1)" opacity="0.9"/>' +
    '<circle cx="27" cy="43.9" r="1.2" fill="var(--a-w)" opacity="0.95"/>',
  hawk:
    '<ellipse cx="34" cy="61" rx="24" ry="1.8" fill="var(--a-k)" opacity="0.1"/><path fill="var(--a-o3)" d="M38 40L54 54Q57 57 54.4 59L50 60L34 47Z"/>' +
    '<path fill="var(--a-o2)" d="M38 40L52.6 53.4Q55 56 53 57.6L49.6 58.4L35 46Z"/>' +
    '<path fill="none" stroke="var(--a-o3)" stroke-width="1.4" opacity="0.7" d="M41 47L50 56M44 45L52.6 53"/>' +
    '<path fill="var(--a-n2)" d="M14 22Q12 10 23 7Q32 5.6 36 13Q46 22 45 36Q44 48 34 50Q24 51 20 42Q16 34 14 22Z"/>' +
    '<path fill="var(--a-n)" d="M14.5 21.7Q12.6 10.6 22.8 7.9Q31 6.6 34.7 13.4Q43.9 21.7 43 34.6Q42.1 45.6 32.9 47.4Q23.7 48.4 20 40.1Q16.3 32.7 14.5 21.7Z"/>' +
    '<path fill="var(--a-m)" d="M17.6 26Q20 38 25.6 45Q31 49 34 44Q30 36 28 26Q24 22 17.6 26Z"/>' +
    '<path fill="none" stroke="var(--a-n2)" stroke-width="1.6" opacity="0.9" d="M21.6 31.2L24.4 31.6M23.6 37L26.8 37.6M28 41.2L31 41.6M26.6 32.6L29.4 33"/>' +
    '<path fill="var(--a-n3)" d="M30 18Q42 17 47 30Q50 42 44 50L41 47L39 51L36 46Q32 36 30 18Z"/>' +
    '<path fill="var(--a-n2)" d="M29.9 18.2Q40.7 17.3 45.2 29Q47.9 39.8 42.5 47L39.8 44.3L38 47.9L35.3 43.4Q31.7 34.4 29.9 18.2Z"/>' +
    '<path fill="none" stroke="var(--a-n3)" stroke-width="1.4" opacity="0.7" d="M35 26Q41 30 42 40M33 30Q37 36 38 44"/>' +
    '<path fill="var(--a-n1)" opacity="0.8" d="M16 16Q18 9 25 8.4Q20 11 18.6 16Z"/>' +
    '<path fill="var(--a-m)" d="M13.6 20Q16 25.4 22 26Q26 25 26 22Q20 22.6 16.6 17Z"/>' +
    '<path fill="var(--a-k2)" d="M15 14.6Q9 13.4 6.4 18.4Q5.6 21.6 7.6 23.6Q8 20.6 10.6 20L15.6 21Z"/>' +
    '<path fill="var(--a-e2)" d="M15 15.2Q9.6 14.4 7.2 18.4Q6.8 20.2 7.4 21Q8.6 19 11.2 18.8L15.4 19.6Z"/>' +
    '<path fill="var(--a-y2)" d="M13.6 14.4Q15.8 13.6 17 15.4L16.4 20.4Q14.6 20 13.4 18Z"/><circle cx="21" cy="15" r="2.6" fill="var(--a-k)"/>' +
    '<circle cx="20.2" cy="14.1" r="0.9" fill="var(--a-w)"/><path fill="none" stroke="var(--a-n3)" stroke-width="2" d="M17 11.6Q21 10 25.4 12.4"/>' +
    '<path fill="var(--a-n2)" d="M6 51Q30 48 60 52L60 56Q30 52.6 6 56Z"/><path fill="var(--a-n)" d="M6 51Q30 48 60 52L60 54Q30 50.6 6 54Z"/>' +
    '<path fill="none" stroke="var(--a-n3)" stroke-width="1.4" opacity="0.7" d="M14 53.4L18 52.8M44 52.2L50 52.6"/>' +
    '<path fill="var(--a-y2)" d="M24.6 45L28.4 45L28.6 50.6L24.2 50.6Z"/><path fill="var(--a-y)" d="M24.6 45L27.2 45L27.4 49.6L24.2 49.6Z"/>' +
    '<path fill="none" stroke="var(--a-y3)" stroke-width="1.8" d="M23 51.6Q22 49.6 23.6 49.4M26.4 51.8Q26 49.6 27.4 49.6M29.8 51.6Q30 49.8 28.4 49.4"/>',
  draw:
    '<ellipse cx="32" cy="61" rx="26" ry="1.8" fill="var(--a-k)" opacity="0.1"/><path fill="var(--a-w3)" d="M5 14L50 8L58 54L12 60Z"/>' +
    '<path fill="var(--a-w)" d="M5.8 14.4L48.1 8.8L55.6 52L12.4 57.6Z"/><path fill="var(--a-w2)" opacity="0.7" d="M51.4 13L56.6 52L50.8 52.8Z"/>' +
    '<path fill="none" stroke="var(--a-r)" stroke-width="3.4" d="M11 46Q14 30 21 36Q27 42 25 50Q24 56 30 52Q36 46 33 40Q31 35 37 35"/>' +
    '<path fill="var(--a-r2)" d="M37 35L38.7 26.8L51.7 15.8L58.7 24.1L45.7 35Z"/>' +
    '<path fill="var(--a-r)" d="M37 35L38.7 26.8L51.3 16.2L56.9 23L44.4 33.5Z"/>' +
    '<path fill="var(--a-r1)" opacity="0.8" d="M38.1 30.1L39.2 27.4L51.8 16.8L53.2 18.5L40.6 29.1Z"/>' +
    '<path fill="var(--a-r3)" d="M37.9 27.4L39.5 26.1L46.4 34.4L44.9 35.7Z"/><path fill="var(--a-w2)" d="M41.8 24.2L49 18.2L55.9 26.4L48.7 32.5Z"/>' +
    '<path fill="var(--a-w)" d="M41.8 24.2L49 18.2L54.5 24.7L47.3 30.8Z"/>' +
    '<path fill="none" stroke="var(--a-r2)" stroke-width="1.6" d="M45.2 24.2L49 28.8M48.4 21.5L52.3 26.1"/>',
  seed:
    '<ellipse cx="32" cy="58.6" rx="24" ry="2.2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-k)" d="M10.5 10.5Q19.1 12.5 22.9 19.2Q25.9 27 21.5 29.5Q17.1 32.1 11.8 25.6Q8 18.9 10.5 10.5Z"/>' +
    '<path fill="var(--a-k2)" d="M10.4 10.8Q17.9 12.6 21.3 18.5Q23.9 25.4 20 27.6Q16.2 29.8 11.5 24.1Q8.2 18.2 10.4 10.8Z"/>' +
    '<path fill="none" stroke="var(--a-e1)" stroke-width="1.6" opacity="0.85" d="M10.9 17.6Q12.9 24.3 17.9 29.1M11.3 11.8L21 28.6M16.5 14.4Q21 19.7 22.7 26.3"/>' +
    '<path fill="var(--a-e)" opacity="0.8" d="M11 15.9Q10.4 12.8 11.6 12.4L12.7 21.9Z"/>' +
    '<path fill="var(--a-k)" d="M51.1 8.6Q52.1 17.3 47.1 23.2Q40.9 28.7 36.9 25.4Q33 22.1 37.3 15Q42.3 9.1 51.1 8.6Z"/>' +
    '<path fill="var(--a-k2)" d="M49.4 8.8Q50.3 16.5 45.9 21.7Q40.5 26.5 37 23.6Q33.5 20.7 37.3 14.4Q41.7 9.2 49.4 8.8Z"/>' +
    '<path fill="none" stroke="var(--a-e1)" stroke-width="1.6" opacity="0.85" d="M44.5 11.4Q38.9 15.6 36.1 21.9M50.1 9.8L37.6 24.6M49.4 15.5Q46 21.6 40.4 25.5"/>' +
    '<path fill="var(--a-e)" opacity="0.8" d="M46.2 10.9Q48.8 9.3 49.7 10.3L41.1 14.5Z"/>' +
    '<path fill="var(--a-k)" d="M60.8 45.9Q53.8 51.2 46.2 49.8Q38.3 47.1 39.2 42.1Q40.1 37 48.4 37.2Q56 38.6 60.8 45.9Z"/>' +
    '<path fill="var(--a-k2)" d="M58.7 44.9Q52.5 49.5 45.9 48.3Q38.9 45.9 39.7 41.5Q40.5 37 47.8 37.2Q54.5 38.4 58.7 44.9Z"/>' +
    '<path fill="none" stroke="var(--a-e1)" stroke-width="1.6" opacity="0.85" d="M55.1 41.7Q48.7 38.9 41.8 39.6M59.3 45.6L40.3 42.3M54 48Q47.1 48 40.9 45.1"/>' +
    '<path fill="var(--a-e)" opacity="0.8" d="M56.3 42.8Q59.1 44.3 58.7 45.5L50.7 40.2Z"/>' +
    '<path fill="var(--a-k)" d="M3 47Q8.5 40.1 16.2 39.4Q24.5 39.9 25 45Q25.4 50.1 17.3 52.1Q9.6 52.8 3 47Z"/>' +
    '<path fill="var(--a-k2)" d="M3.5 46.1Q8.4 40 15.1 39.4Q22.4 39.8 22.9 44.3Q23.2 48.8 16.1 50.6Q9.3 51.2 3.5 46.1Z"/>' +
    '<path fill="none" stroke="var(--a-e1)" stroke-width="1.6" opacity="0.85" d="M9.7 49.6Q16.6 50.6 23 48.1M4.6 46.8L23.9 45.1M9.1 43.2Q15.8 41.3 22.5 42.6"/>' +
    '<path fill="var(--a-e)" opacity="0.8" d="M8.2 48.8Q5.1 48.1 5.2 46.8L14.3 49.8Z"/>' +
    '<path fill="var(--a-k)" d="M33.3 20.2Q39.5 28.6 37.9 37.5Q34.7 46.9 28.7 45.8Q22.8 44.7 23 34.9Q24.5 25.9 33.3 20.2Z"/>' +
    '<path fill="var(--a-k2)" d="M32.2 20.9Q37.7 28.3 36.3 36.2Q33.5 44.4 28.2 43.5Q23 42.5 23.2 33.9Q24.5 26 32.2 20.9Z"/>' +
    '<path fill="none" stroke="var(--a-e1)" stroke-width="1.6" opacity="0.85" d="M28.2 27Q24.9 34.6 25.8 42.6M32.9 22L29 44.5M35.7 28.3Q35.8 36.5 32.3 43.8"/>' +
    '<path fill="var(--a-e)" opacity="0.8" d="M29.6 25.5Q31.4 22.2 32.8 22.8L26.5 32.2Z"/>',
  mail:
    '<ellipse cx="32" cy="55.4" rx="27" ry="2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-w3)" d="M4 17Q4 12 9 12L55 12Q60 12 60 17L60 48Q60 53 55 53L9 53Q4 53 4 48Z"/>' +
    '<path fill="var(--a-w)" d="M4.8 16.6Q4.8 13 8.6 13L54.6 13Q58.4 13 58.4 16.6L58.4 47.4Q58.4 51 54.6 51L8.6 51Q4.8 51 4.8 47.4Z"/>' +
    '<path fill="var(--a-w2)" opacity="0.9" d="M5 50L26 33L32 37L38 33L59 50Z"/>' +
    '<path fill="var(--a-w3)" opacity="0.8" d="M5 15L32 37.4L59 15L59 17L32 39.6L5 17Z"/>' +
    '<path fill="var(--a-w2)" opacity="0.6" d="M5.6 15.6L32 36.4L58.4 15.6L58 14.4Q57 13 54.6 13L8.6 13Q6.4 13 5.6 15.6Z"/>' +
    '<path fill="var(--a-b2)" d="M44 17L54 17L54 28L44 28Z"/><path fill="var(--a-b)" d="M44 17L53 17L53 27L44 27Z"/>' +
    '<path fill="var(--a-b1)" opacity="0.8" d="M46 19L51 19L51 25L46 25Z"/><circle cx="32.4" cy="37.4" r="5" fill="var(--a-r2)"/>' +
    '<circle cx="32" cy="37" r="4.2" fill="var(--a-r)"/><path fill="var(--a-r1)" opacity="0.9" d="M29.4 35Q31 33.4 33 33.6Q30.6 34.6 30 36.6Z"/>',
});
