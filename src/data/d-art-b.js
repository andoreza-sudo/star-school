/* ---------- object art set B: 40 pictures (P4-14; DESIGN_SYSTEM.md section 6.5) ----------
   The words children see most that set A (src/js/16-art-a.js) did not draw: picture words, Spanish units (animals, food, body,
   house, clothes, school, transport), riddles, Memory Match, Discover, vocabulary and counting. Same style, rules and limits
   as set A: 64x64 grid, light from the top left, up to four tones per colour area (base, shade x2 lower right, highlight x1,
   deep accent x3), white and cream objects edged in their own deep tone, faces only on animals; only var(--a-x) roles from
   src/css/21-art.css; <path>/<circle>/<ellipse>/<rect>, no ids, defs, gradients, filters, text or raw hex; up to 2.5 KB each.
   This file is data (A11): it loads after all code, and ART is read only inside functions (picFor/picArt at render time), so a
   drawing here shows wherever a question asks picFor for its word. tools/test.js "object art set B P4-14" checks the rules.
   Review: node tools/shots.js art-b (this set) and art (sets A and B together). */
Object.assign(ART, {
  balloon:
    '<path fill="none" stroke="var(--a-e2)" stroke-width="1.6" d="M32 50Q27.5 54 31.5 57.2Q35 60.4 30.5 62.4"/>' +
    '<path fill="var(--a-r2)" d="M28.4 51Q32 48.8 35.6 51L33.6 46H30.4Z"/>' +
    '<path fill="var(--a-r2)" d="M32 3C44.5 3 52 12.5 52 24C52 36.5 42 46 32 47.5C22 46 12 36.5 12 24C12 12.5 19.5 3 32 3Z"/>' +
    '<path fill="var(--a-r)" d="M30.3 3.2C41.6 3.2 48.3 11.8 48.3 22.1C48.3 33.4 39.3 41.9 30.3 43.3C21.3 41.9 12.3 33.4 12.3 22.1C12.3 11.8 19.1 3.2 30.3 3.2Z"/>' +
    '<ellipse cx="22.4" cy="16.6" rx="3.4" ry="7.6" fill="var(--a-r1)" transform="rotate(30 22.4 16.6)"/>' +
    '<circle cx="19.4" cy="27" r="1.8" fill="var(--a-w)" opacity="0.75"/>' +
    '<path fill="var(--a-r3)" opacity="0.35" d="M45.6 30Q44 39 34.6 44.4Q43.4 43.6 48 34.6Z"/>',
  book:
    '<path fill="var(--a-b2)" d="M2 21Q17 15.5 32 21.5Q47 15.5 62 21V54Q47 49 32 55.5Q17 49 2 54Z"/>' +
    '<path fill="var(--a-b)" d="M2 21Q17 15.5 32 21.5V55.5Q17 49 2 54Z"/>' +
    '<path fill="var(--a-w3)" d="M5 17.6Q18.5 12.6 31 19V52Q18.5 46 5 51Z"/>' +
    '<path fill="var(--a-w3)" d="M33 19Q45.5 12.6 59 17.6V51Q45.5 46 33 52Z"/>' +
    '<path fill="var(--a-w)" d="M5 15Q18.5 10 31 16.5V49Q18.5 43 5 48Z"/>' +
    '<path fill="var(--a-w)" d="M33 16.5Q45.5 10 59 15V48Q45.5 43 33 49Z"/>' +
    '<path fill="var(--a-w2)" d="M33 16.5Q36.6 14.6 40 13.4V45Q36.6 46.6 33 49Z"/>' +
    '<path fill="var(--a-w2)" opacity="0.7" d="M31 16.5Q28.6 15 26 14V45.6Q28.6 47 31 49Z"/>' +
    '<path fill="none" stroke="var(--a-e)" stroke-width="1.8" d="M10 21.6Q16.5 19.2 23 21.4M10 27.6Q16.5 25.2 23 27.4M10 33.6Q16.5 31.2 23 33.4M10 39.6Q14 38 17.6 39"/>' +
    '<path fill="none" stroke="var(--a-e)" stroke-width="1.8" d="M42.6 20.8Q48.5 18.6 54.4 20.2M42.6 26.8Q48.5 24.6 54.4 26.2M42.6 32.8Q48.5 30.6 54.4 32.2M42.6 38.8Q46.4 37.4 50 38"/>' +
    '<path fill="var(--a-r2)" d="M44 46V59L46.8 56.4L49.6 59V44.6Z"/><path fill="var(--a-r)" d="M44 46V59L46.8 56.4V45.3Z"/>',
  moon:
    '<path fill="var(--a-y2)" d="M30.4 6A27 27 0 1 0 56.3 39A21 21 0 0 1 30.4 6Z"/>' +
    '<path fill="var(--a-y)" d="M29.5 6.8A24.8 24.8 0 1 0 51.2 41.7A21 21 0 0 1 29.5 6.8Z"/>' +
    '<path fill="none" stroke="var(--a-y1)" stroke-width="3" d="M9.2 38.6A20.6 20.6 0 0 1 9.9 22.9"/>' +
    '<circle cx="14.4" cy="23.6" r="1.6" fill="var(--a-w)" opacity="0.8"/>' +
    '<ellipse cx="16.6" cy="41.6" rx="3.8" ry="3.2" fill="var(--a-y2)"/>' +
    '<ellipse cx="16" cy="41" rx="2.8" ry="2.2" fill="var(--a-y3)" opacity="0.5"/>' +
    '<ellipse cx="28.6" cy="50.4" rx="2.8" ry="2.3" fill="var(--a-y2)"/>' +
    '<ellipse cx="10.6" cy="32" rx="1.9" ry="1.7" fill="var(--a-y2)"/>',
  sock:
    '<path fill="var(--a-b2)" d="M26 4H46Q48 4 48 6V38Q48 44 44 49L37 56.5Q32 61 24 61H13Q4 61 4 53Q4 45.5 12 44.5L24 42Q26 41.6 26 39Z"/>' +
    '<path fill="var(--a-b)" d="M25.3 4.3H44.1Q46 4.3 46 6.2V36.3Q46 41.9 42.2 46.6L35.6 53.6Q30.9 57.9 23.4 57.9H13.1Q4.6 57.9 4.6 50.4Q4.6 43.3 12.1 42.4L23.4 40Q25.3 39.6 25.3 37.2Z"/>' +
    '<path fill="var(--a-w2)" d="M26 18H48V23.6H26Z"/><path fill="var(--a-w)" d="M26 18H46.4V23.6H26Z"/>' +
    '<path fill="var(--a-w2)" d="M26 28H48V33.6H26Z"/><path fill="var(--a-w)" d="M26 28H46.4V33.6H26Z"/>' +
    '<path fill="var(--a-w2)" d="M37.6 45.6Q44.4 43.6 47.8 37.6Q48.4 44.6 44 49L37 56.5Q35 52 37.6 45.6Z"/>' +
    '<path fill="var(--a-w)" d="M37.6 45.6Q43.4 43.8 46.6 39Q46 44.8 42.6 48.4L37.2 54Q35.4 50.4 37.6 45.6Z"/>' +
    '<path fill="var(--a-w2)" d="M12 44.5Q4 45.5 4 53Q4 61 13 61H15.6Q11 53 12 44.5Z"/>' +
    '<path fill="var(--a-w)" d="M12 44.6Q4.6 45.8 4.6 52.6Q4.8 58.6 12 59.2H14.6Q10.6 52 12 44.6Z"/>' +
    '<path fill="var(--a-w3)" d="M24 2.6H46.6Q49 2.6 49 5V13.6H23.6V5Q23.6 2.6 26 2.6Z"/>' +
    '<path fill="var(--a-w)" d="M24 2.6H45.6Q47.6 2.6 47.6 4.6V12.4H23.6V4.6Q23.6 2.6 25.6 2.6Z"/>' +
    '<path fill="none" stroke="var(--a-w3)" stroke-width="1.4" d="M28.6 5V11M33.6 5V11M38.6 5V11M43.6 5V11"/>' +
    '<ellipse cx="30" cy="40" rx="1.6" ry="4.6" fill="var(--a-b1)" opacity="0.8" transform="rotate(10 30 40)"/>',
  cow:
    '<ellipse cx="9.6" cy="25" rx="8.6" ry="4.6" fill="var(--a-w3)" transform="rotate(-22 9.6 25)"/>' +
    '<ellipse cx="9.2" cy="24.5" rx="7.6" ry="3.7" fill="var(--a-w)" transform="rotate(-22 9.2 24.5)"/>' +
    '<ellipse cx="10" cy="25.1" rx="4.6" ry="2" fill="var(--a-p)" transform="rotate(-22 10 25.1)"/>' +
    '<ellipse cx="54.4" cy="25" rx="8.6" ry="4.6" fill="var(--a-w3)" transform="rotate(22 54.4 25)"/>' +
    '<ellipse cx="54" cy="24.5" rx="7.6" ry="3.7" fill="var(--a-w)" transform="rotate(22 54 24.5)"/>' +
    '<ellipse cx="54.8" cy="25.1" rx="4.6" ry="2" fill="var(--a-p)" transform="rotate(22 54.8 25.1)"/>' +
    '<path fill="var(--a-m3)" d="M21 15Q15.6 13 14.6 5.6Q19.8 6 24 11Z"/>' +
    '<path fill="var(--a-m)" d="M20.6 14.2Q16.4 12.6 15.6 6.8Q19.4 7.6 22.8 11.4Z"/>' +
    '<path fill="var(--a-m3)" d="M43 15Q48.4 13 49.4 5.6Q44.2 6 40 11Z"/>' +
    '<path fill="var(--a-m)" d="M43.4 14.2Q47.6 12.6 48.4 6.8Q44.6 7.6 41.2 11.4Z"/>' +
    '<path fill="var(--a-w3)" d="M32 9C44 9 50 16 50 27C50 34 47.4 38 46 42H18C16.6 38 14 34 14 27C14 16 20 9 32 9Z"/>' +
    '<path fill="var(--a-w2)" d="M31.8 9.2C43.4 9.2 49.2 16 49.2 26.7C49.2 33.5 46.7 37.3 45.3 41.2H18.2C16.8 37.3 14.3 33.5 14.3 26.7C14.3 16 20.1 9.2 31.8 9.2Z"/>' +
    '<path fill="var(--a-w)" d="M30.5 9.3C41.3 9.3 46.7 15.6 46.7 25.5C46.7 31.8 44.4 35.4 43.1 39H17.9C16.6 35.4 14.3 31.8 14.3 25.5C14.3 15.6 19.7 9.3 30.5 9.3Z"/>' +
    '<path fill="var(--a-k2)" d="M20 12Q26 9.2 31 10Q30.4 16 25.4 19Q19.6 21 15.6 19.4Q16.4 14 20 12Z"/>' +
    '<path fill="var(--a-k2)" d="M44.6 23Q49 24 49.4 29.6Q48.4 35 45.6 36.4Q41.6 30.6 44.6 23Z"/>' +
    '<ellipse cx="24" cy="29.6" rx="2.8" ry="3.3" fill="var(--a-k)"/><circle cx="23.1" cy="28.3" r="1.1" fill="var(--a-w)"/>' +
    '<ellipse cx="40" cy="29.6" rx="2.8" ry="3.3" fill="var(--a-k)"/><circle cx="39.1" cy="28.3" r="1.1" fill="var(--a-w)"/>' +
    '<ellipse cx="32" cy="46" rx="17.4" ry="11.4" fill="var(--a-p2)"/><ellipse cx="31.2" cy="45" rx="16" ry="10.2" fill="var(--a-p)"/>' +
    '<ellipse cx="24.4" cy="40.6" rx="5" ry="1.8" fill="var(--a-p1)" transform="rotate(-12 24.4 40.6)"/>' +
    '<ellipse cx="26" cy="46.4" rx="2.4" ry="3.2" fill="var(--a-p3)"/><ellipse cx="38" cy="46.4" rx="2.4" ry="3.2" fill="var(--a-p3)"/>' +
    '<path fill="none" stroke="var(--a-p3)" stroke-width="1.8" d="M27.6 52.4Q32 55 36.4 52.4"/>',
  cheese:
    '<path fill="var(--a-y1)" stroke="var(--a-y1)" stroke-width="2.4" d="M4 31L42 13L60 25Z"/>' +
    '<path fill="var(--a-y)" stroke="var(--a-y)" stroke-width="2.4" d="M4 31L60 25V48L4 53Z"/>' +
    '<path fill="var(--a-y2)" opacity="0.55" d="M44.6 26.6L61.2 24.8V48L44.6 49.5Z"/>' +
    '<path fill="var(--a-y2)" stroke="var(--a-y2)" stroke-width="2.4" d="M4 49.4L60 44.4V48L4 53Z"/>' +
    '<ellipse cx="16" cy="40.6" rx="4.4" ry="3.8" fill="var(--a-y2)"/><ellipse cx="15.4" cy="40" rx="3.4" ry="2.8" fill="var(--a-y3)"/>' +
    '<ellipse cx="33.4" cy="35.6" rx="3" ry="2.6" fill="var(--a-y2)"/><ellipse cx="33" cy="35.2" rx="2.2" ry="1.8" fill="var(--a-y3)"/>' +
    '<ellipse cx="47.4" cy="39.6" rx="4.8" ry="4.2" fill="var(--a-y3)"/>' +
    '<ellipse cx="48" cy="40.2" rx="3.8" ry="3.2" fill="var(--a-y2)"/><ellipse cx="26" cy="46.6" rx="2.4" ry="2" fill="var(--a-y2)"/>' +
    '<ellipse cx="30" cy="22.4" rx="3.2" ry="1.4" fill="var(--a-y2)"/><ellipse cx="46" cy="21.4" rx="2.2" ry="1" fill="var(--a-y2)"/>' +
    '<ellipse cx="17.6" cy="27.6" rx="1.8" ry="0.9" fill="var(--a-y2)"/>' +
    '<path fill="none" stroke="var(--a-y1)" stroke-width="1.6" opacity="0.9" d="M7 33.4L56 28"/>',
  bell:
    '<path fill="none" stroke="var(--a-y3)" stroke-width="3.2" d="M28.4 10Q28.4 3.6 32 3.6Q35.6 3.6 35.6 10"/>' +
    '<circle cx="32" cy="55.6" r="5" fill="var(--a-y3)"/><circle cx="31" cy="54.6" r="3.4" fill="var(--a-y2)"/>' +
    '<path fill="var(--a-y2)" d="M32 8C42 8 46 16 46.5 26C47 36 50 42 55 46.5Q57 49 54 50H10Q7 49 9 46.5C14 42 17 36 17.5 26C18 16 22 8 32 8Z"/>' +
    '<path fill="var(--a-y)" d="M30.9 8.2C40.2 8.2 43.9 15.6 44.3 24.9C44.8 34.2 47.6 39.8 52.2 44Q54.1 46.3 51.3 47.3H10.4Q7.6 46.3 9.5 44C14.1 39.8 16.9 34.2 17.4 24.9C17.8 15.6 21.6 8.2 30.9 8.2Z"/>' +
    '<ellipse cx="32" cy="49.6" rx="23.6" ry="5" fill="var(--a-y2)"/><ellipse cx="31.4" cy="48.8" rx="22.6" ry="4" fill="var(--a-y)"/>' +
    '<ellipse cx="32" cy="50.6" rx="19.4" ry="3" fill="var(--a-y3)"/>' +
    '<path fill="var(--a-y1)" d="M23 16Q25.4 12.4 28.2 12.4Q24.4 20 24 32Q23.6 39 20.4 43.4Q21.4 34 21.4 27Q21.4 20 23 16Z"/>' +
    '<ellipse cx="27" cy="15" rx="1.6" ry="2.6" fill="var(--a-w)" opacity="0.8" transform="rotate(30 27 15)"/>' +
    '<path fill="none" stroke="var(--a-y2)" stroke-width="1.6" d="M18 38Q32 41.4 46.8 38"/>',
  bird:
    '<path fill="none" stroke="var(--a-o2)" stroke-width="2.2" d="M26.6 50V56.4M35.4 50V56.4"/>' +
    '<path fill="none" stroke="var(--a-o2)" stroke-width="2" d="M23 57.2H29.6M31.8 57.2H38.4"/>' +
    '<path fill="var(--a-b2)" d="M44 36Q52 27 59.6 24.4Q62.6 24.4 61.6 27.6Q58 35.6 50 43Z"/>' +
    '<path fill="var(--a-b)" d="M44.6 35.2Q52 27.6 58.4 25.6Q60.4 25.8 59.8 27.8Q56.6 34.4 49.6 41.4Z"/>' +
    '<ellipse cx="32" cy="37" rx="21" ry="17" fill="var(--a-b2)"/><circle cx="22" cy="22" r="13" fill="var(--a-b2)"/>' +
    '<ellipse cx="30.8" cy="35.8" rx="19" ry="15.4" fill="var(--a-b)"/><circle cx="21" cy="21" r="11.6" fill="var(--a-b)"/>' +
    '<path fill="var(--a-m2)" d="M13 40Q16 33 25 34Q33 36 34 44Q34 51.6 25 52Q16 51 13 40Z"/>' +
    '<path fill="var(--a-m)" d="M13.6 39.4Q16.6 33.4 24.4 34.2Q31.6 36 32.4 43Q32.4 49.6 24.6 50.2Q16.6 49.4 13.6 39.4Z"/>' +
    '<path fill="var(--a-b2)" d="M30 33Q40 27 49.6 32Q50.6 41.6 41 46Q32.6 46 30 33Z"/>' +
    '<path fill="none" stroke="var(--a-b1)" stroke-width="1.6" opacity="0.9" d="M33 33Q40 29 47 31.6"/>' +
    '<ellipse cx="17.6" cy="13.4" rx="4.2" ry="2.2" fill="var(--a-b1)" transform="rotate(-28 17.6 13.4)"/>' +
    '<path fill="var(--a-o)" d="M10.4 19.6L2.4 23.6L10.4 26.4Z"/><path fill="var(--a-o2)" d="M10.4 23.8L3 23.6L10.4 26.6Z"/>' +
    '<ellipse cx="17" cy="20" rx="2.5" ry="3" fill="var(--a-k)"/><circle cx="16.2" cy="18.9" r="1" fill="var(--a-w)"/>' +
    '<ellipse cx="19.6" cy="26.6" rx="2.6" ry="1.7" fill="var(--a-p)" opacity="0.6"/>',
  egg:
    '<ellipse cx="33" cy="58.6" rx="17" ry="3" fill="var(--a-k)" opacity="0.12"/>' +
    '<path fill="var(--a-m3)" d="M32 5C44 5 52 23 52 36.5C52 50 43 58 32 58C21 58 12 50 12 36.5C12 23 20 5 32 5Z"/>' +
    '<path fill="var(--a-m2)" d="M31.7 5.2C43.3 5.2 51.1 22.7 51.1 35.8C51.1 48.9 42.4 56.6 31.7 56.6C21 56.6 12.3 48.9 12.3 35.8C12.3 22.7 20.1 5.2 31.7 5.2Z"/>' +
    '<path fill="var(--a-m)" d="M30.2 5.6C40.8 5.6 47.8 21.4 47.8 33.3C47.8 45.2 39.9 52.2 30.2 52.2C20.5 52.2 12.6 45.2 12.6 33.3C12.6 21.4 19.6 5.6 30.2 5.6Z"/>' +
    '<ellipse cx="23.6" cy="22" rx="4.4" ry="8.8" fill="var(--a-m1)" transform="rotate(22 23.6 22)"/>' +
    '<circle cx="22.4" cy="15.8" r="1.8" fill="var(--a-w)" opacity="0.9"/>',
  pencil:
    '<path fill="var(--a-p2)" d="M40.5 13.6L45.4 8.7Q47.8 6.3 50.2 8.7L55.3 13.8Q57.7 16.2 55.3 18.6L50.4 23.5Z"/>' +
    '<path fill="var(--a-p)" d="M40.5 13.6L45.4 8.7Q47.8 6.3 50.2 8.7L53.8 12.2Q55.3 13.8 53.6 15.5L48 21.1Z"/>' +
    '<path fill="var(--a-e2)" d="M40.8 12.5L51.5 23.2L45.9 28.9L35.1 18.1Z"/>' +
    '<path fill="var(--a-e)" d="M40.8 12.5L47.6 19.3L41.9 24.9L35.1 18.1Z"/>' +
    '<path fill="var(--a-e1)" d="M40.8 12.5L43 14.7L37.4 20.4L35.1 18.1Z"/>' +
    '<path fill="none" stroke="var(--a-e3)" stroke-width="1.4" d="M39.1 14.5L49.5 24.9M37.1 16.4L47.6 26.9"/>' +
    '<path fill="var(--a-y2)" d="M35.5 18.6L45.4 28.5L25.6 48.3L15.7 38.4Z"/>' +
    '<path fill="var(--a-y)" d="M35.5 18.6L42.2 25.2L22.4 45L15.7 38.4Z"/>' +
    '<path fill="var(--a-y1)" d="M35.5 18.6L38.8 21.8L19 41.6L15.7 38.4Z"/>' +
    '<path fill="var(--a-t)" d="M15.7 38.4L10.8 53.2L25.6 48.3L22.5 48L22.4 45L19.3 44.7L19 41.6L16 41.5Z"/>' +
    '<path fill="var(--a-t2)" d="M10.8 53.2L25.6 48.3L22.5 48L22.4 45L19.3 44.7Z"/>' +
    '<path fill="var(--a-k2)" d="M12.8 47.3L16.7 51.2L10.8 53.2Z"/>',
  plane:
    '<path fill="var(--a-b3)" d="M27 28.4L22 19.4Q21.6 18.4 22.8 18.4H26.6L37.4 28.4Z"/>' +
    '<path fill="var(--a-b2)" d="M7.6 31L3.6 11.6Q3.4 9 6 9H10Q12 9 13.4 10.8L25.4 28Z"/>' +
    '<path fill="var(--a-b)" d="M8.4 30.4L4.8 12.4Q4.8 10.4 6.8 10.4H9.6Q11 10.4 12.2 12L23.4 28Z"/>' +
    '<path fill="var(--a-w3)" d="M7 31Q7 27 11 27H45Q55 27 59.4 33.6Q61 36.4 58.6 38.6Q54.6 43 45 43H14Q8.6 43 7.4 38.6Z"/>' +
    '<path fill="var(--a-w2)" d="M7.3 31Q7.3 27.1 11.2 27.1H44.5Q54.3 27.1 58.7 33.6Q60.2 36.3 57.9 38.5Q53.9 42.8 44.5 42.8H14.2Q8.9 42.8 7.7 38.5Z"/>' +
    '<path fill="var(--a-w)" d="M7.4 30.9Q7.4 27.2 11.1 27.2H42.7Q52 27.2 56.1 33.3Q57.6 35.9 55.4 38Q51.7 42.1 42.7 42.1H13.9Q8.9 42.1 7.8 38Z"/>' +
    '<path fill="var(--a-b)" d="M7.4 38.6Q8.6 43 14 43H45Q54.6 43 58.6 38.6L58 38.4Q54 40.6 45 40.6H14Q9.4 40.6 7.4 38.6Z"/>' +
    '<path fill="var(--a-b1)" d="M46.4 29.4H50Q54.4 30.4 56.4 33.4Q56.6 34.6 55.4 34.6H46.4Q45.4 34.6 45.4 33.4V30.4Q45.4 29.4 46.4 29.4Z"/>' +
    '<circle cx="16" cy="33.6" r="1.8" fill="var(--a-b1)"/><circle cx="22" cy="33.6" r="1.8" fill="var(--a-b1)"/>' +
    '<circle cx="28" cy="33.6" r="1.8" fill="var(--a-b1)"/><circle cx="34" cy="33.6" r="1.8" fill="var(--a-b1)"/>' +
    '<circle cx="40" cy="33.6" r="1.8" fill="var(--a-b1)"/>' +
    '<path fill="var(--a-b2)" d="M27.6 37L19.4 53.4Q18.6 55.4 21 55.4H26.4Q28.6 55.4 30 53.4L41.6 37Z"/>' +
    '<path fill="var(--a-b)" d="M27.6 37L19.6 52.6Q19.2 54 20.8 54H25.6Q27.4 54 28.4 52.4L38.6 37Z"/>' +
    '<rect x="7" y="34" width="9" height="3.6" rx="1.8" fill="var(--a-b2)"/>' +
    '<path fill="none" stroke="var(--a-w)" stroke-width="1.4" opacity="0.9" d="M14 30H44"/>',
  bread:
    '<path fill="var(--a-n)" d="M17.6 27.4Q9.6 25.4 9.6 18Q10.6 8.4 21.6 8.4H47.6Q59.2 8.4 60.2 18Q60.2 25.4 53.2 27.4V57Q53.2 61.4 49.2 61.4H21.6Q17.6 61.4 17.6 57Z"/>' +
    '<path fill="var(--a-t2)" d="M14 25Q6 23 6 15.6Q7 6 18 6H44Q55.6 6 56.6 15.6Q56.6 23 49.6 25V54.6Q49.6 59 45.6 59H18Q14 59 14 54.6Z"/>' +
    '<path fill="var(--a-m)" d="M16.8 26.1Q10 24.4 10 18.2Q10.9 10.1 20.1 10.1H42Q51.7 10.1 52.5 18.2Q52.5 24.4 46.7 26.1V50.9Q46.7 54.6 43.3 54.6H20.1Q16.8 54.6 16.8 50.9Z"/>' +
    '<ellipse cx="22.6" cy="17.4" rx="6" ry="2.4" fill="var(--a-m1)" transform="rotate(-10 22.6 17.4)"/>' +
    '<path fill="var(--a-t1)" opacity="0.9" d="M9.6 13.4Q11 8.6 18 8.4H40Q32 9.4 20 10Q12.6 10.6 9.6 13.4Z"/>' +
    '<ellipse cx="26" cy="30" rx="1.4" ry="1" fill="var(--a-m2)"/><ellipse cx="37" cy="25" rx="1.6" ry="1.1" fill="var(--a-m2)"/>' +
    '<ellipse cx="31" cy="41" rx="1.4" ry="1" fill="var(--a-m2)"/><ellipse cx="40" cy="47" rx="1.6" ry="1.1" fill="var(--a-m2)"/>' +
    '<ellipse cx="22" cy="49" rx="1.2" ry="0.9" fill="var(--a-m2)"/><ellipse cx="42" cy="36" rx="1.2" ry="0.9" fill="var(--a-m2)"/>',
  tree:
    '<ellipse cx="32" cy="60" rx="20" ry="2.8" fill="var(--a-g1)"/>' +
    '<path fill="var(--a-n2)" d="M27 38Q28.6 50 26 60.6H38.4Q35.6 50 37.2 38Z"/>' +
    '<path fill="var(--a-n)" d="M27 38Q28.6 50 26 60.6H32.4Q31.4 50 32.4 38Z"/>' +
    '<path fill="none" stroke="var(--a-n3)" stroke-width="1.6" opacity="0.5" d="M34 46Q36 50 39.6 51"/>' +
    '<circle cx="19.6" cy="33" r="12.6" fill="var(--a-g2)"/><circle cx="44.4" cy="33" r="12.6" fill="var(--a-g2)"/>' +
    '<circle cx="32" cy="18.6" r="15.6" fill="var(--a-g2)"/><circle cx="32" cy="37.4" r="12.6" fill="var(--a-g2)"/>' +
    '<circle cx="18.8" cy="32" r="11.4" fill="var(--a-g)"/><circle cx="43.2" cy="32" r="11.4" fill="var(--a-g)"/>' +
    '<circle cx="31" cy="17.6" r="14.2" fill="var(--a-g)"/><circle cx="31" cy="36" r="11.2" fill="var(--a-g)"/>' +
    '<ellipse cx="25" cy="10.6" rx="5.6" ry="2.8" fill="var(--a-g1)" transform="rotate(-30 25 10.6)"/>' +
    '<ellipse cx="13.6" cy="27" rx="3.6" ry="2" fill="var(--a-g1)" transform="rotate(-40 13.6 27)"/>' +
    '<ellipse cx="38.6" cy="26.4" rx="3.6" ry="2" fill="var(--a-g1)" transform="rotate(-30 38.6 26.4)"/>' +
    '<path fill="none" stroke="var(--a-g2)" stroke-width="1.8" opacity="0.9" d="M21 39Q25.4 41 28 38.4M37 41Q41.6 42 44 39"/>' +
    '<circle cx="22" cy="24" r="2.4" fill="var(--a-r)"/><circle cx="41" cy="18" r="2.4" fill="var(--a-r)"/>' +
    '<circle cx="47" cy="37" r="2.4" fill="var(--a-r)"/><circle cx="26.6" cy="41.6" r="2.4" fill="var(--a-r)"/>',
  coat:
    '<path fill="var(--a-r3)" d="M22 9.4Q24 3 32 3Q40 3 42 9.4Q32 16 22 9.4Z"/>' +
    '<path fill="var(--a-r2)" d="M24 8L18 9Q12 10 9.6 16L4 46Q3.6 49 6.6 49.6L12 50.6Q14.6 51 15 48.4L16 41V58Q16 61 19 61H45Q48 61 48 58V41L49 48.4Q49.4 51 52 50.6L57.4 49.6Q60.4 49 60 46L54.4 16Q52 10 46 9L40 8Z"/>' +
    '<path fill="var(--a-r)" d="M23.2 8.3L17.5 9.2Q11.9 10.2 9.6 15.8L4.4 44Q4 46.8 6.8 47.4L11.9 48.3Q14.3 48.7 14.7 46.3L15.7 39.3V55.3Q15.7 58.1 18.5 58.1H42.9Q45.7 58.1 45.7 55.3V39.3L46.7 46.3Q47.1 48.7 49.5 48.3L54.6 47.4Q57.4 46.8 57 44L51.8 15.8Q49.5 10.2 43.9 9.2L38.2 8.3Z"/>' +
    '<path fill="var(--a-m)" d="M24 8Q28 13.4 32 15.4Q36 13.4 40 8Q36 10.4 32 10.4Q28 10.4 24 8Z"/>' +
    '<path fill="var(--a-r2)" d="M24 8L32 15.4L28 21L21.4 10.4Z"/><path fill="var(--a-r2)" d="M40 8L32 15.4L36 21L42.6 10.4Z"/>' +
    '<path fill="none" stroke="var(--a-r2)" stroke-width="1.6" d="M32 16V60.4M16 41L17.4 19M48 41L46.6 19"/>' +
    '<path fill="var(--a-r2)" d="M4.4 44.4L15.4 46.4L15 48.4Q14.6 51 12 50.6L6.6 49.6Q3.6 49 4 46Z"/>' +
    '<path fill="var(--a-r2)" d="M59.6 44.4L48.6 46.4L49 48.4Q49.4 51 52 50.6L57.4 49.6Q60.4 49 60 46Z"/>' +
    '<rect x="19.6" y="42" width="8" height="2.6" rx="1.3" fill="var(--a-r2)"/>' +
    '<rect x="36.4" y="42" width="8" height="2.6" rx="1.3" fill="var(--a-r2)"/><circle cx="35.6" cy="24" r="2.2" fill="var(--a-y2)"/>' +
    '<circle cx="35.2" cy="23.6" r="1.6" fill="var(--a-y)"/><circle cx="35.6" cy="32.6" r="2.2" fill="var(--a-y2)"/>' +
    '<circle cx="35.2" cy="32.2" r="1.6" fill="var(--a-y)"/><circle cx="35.6" cy="41.2" r="2.2" fill="var(--a-y2)"/>' +
    '<circle cx="35.2" cy="40.8" r="1.6" fill="var(--a-y)"/>' +
    '<ellipse cx="22" cy="22" rx="2.4" ry="7" fill="var(--a-r1)" opacity="0.8" transform="rotate(12 22 22)"/>' +
    '<ellipse cx="11.6" cy="22" rx="1.6" ry="6" fill="var(--a-r1)" opacity="0.8" transform="rotate(14 11.6 22)"/>',
  foot:
    '<circle cx="23.4" cy="14.6" r="6.6" fill="var(--a-s2)"/><circle cx="22.6" cy="13.7" r="5.7" fill="var(--a-s)"/>' +
    '<ellipse cx="22.7" cy="12.5" rx="3.2" ry="2.2" fill="var(--a-s1)"/><circle cx="33.4" cy="11.4" r="4.6" fill="var(--a-s2)"/>' +
    '<circle cx="32.8" cy="10.8" r="4" fill="var(--a-s)"/><ellipse cx="32.9" cy="9.9" rx="2.2" ry="1.6" fill="var(--a-s1)"/>' +
    '<circle cx="41" cy="13.4" r="4" fill="var(--a-s2)"/><circle cx="40.5" cy="12.8" r="3.4" fill="var(--a-s)"/>' +
    '<ellipse cx="40.6" cy="12.1" rx="1.9" ry="1.4" fill="var(--a-s1)"/><circle cx="47" cy="17.6" r="3.5" fill="var(--a-s2)"/>' +
    '<circle cx="46.6" cy="17.1" r="3" fill="var(--a-s)"/><ellipse cx="46.7" cy="16.5" rx="1.7" ry="1.2" fill="var(--a-s1)"/>' +
    '<circle cx="51" cy="23.6" r="3" fill="var(--a-s2)"/><circle cx="50.6" cy="23.2" r="2.6" fill="var(--a-s)"/>' +
    '<ellipse cx="50.7" cy="22.6" rx="1.4" ry="1" fill="var(--a-s1)"/>' +
    '<path fill="var(--a-s2)" d="M21.4 22Q15 26 15 35Q15 46 18.4 53Q21.6 60 29.4 60Q37 60 38.6 52.4Q40 45.6 43.4 39Q47.4 31.6 46.4 25Q44.6 19.6 37 19.6Q28 19.6 21.4 22Z"/>' +
    '<path fill="var(--a-s)" d="M21.4 22Q15.5 25.7 15.5 34Q15.5 44.1 18.6 50.5Q21.6 57 28.7 57Q35.7 57 37.2 50Q38.5 43.7 41.6 37.6Q45.3 30.8 44.4 24.8Q42.7 19.8 35.7 19.8Q27.5 19.8 21.4 22Z"/>' +
    '<ellipse cx="23" cy="37" rx="2.6" ry="8" fill="var(--a-s1)" transform="rotate(8 23 37)"/>' +
    '<circle cx="22" cy="28.4" r="1.4" fill="var(--a-w)" opacity="0.6"/>' +
    '<path fill="none" stroke="var(--a-s2)" stroke-width="1.8" opacity="0.7" d="M18.6 47Q20 44 21 38"/>',
  cloud:
    '<path fill="var(--a-w3)" stroke="var(--a-w3)" stroke-width="1.6" d="M14 47.6Q4.6 47.6 4.6 39.6Q4.6 31 13.6 30.6Q15 21.6 23.4 20Q27.6 11 37.4 12Q47.4 13 49 22.4Q58.4 23.6 59.4 33.6Q60 47.6 49 47.6Z"/>' +
    '<path fill="var(--a-w2)" d="M13.9 46.6Q4.8 46.6 4.8 38.8Q4.8 30.5 13.5 30.1Q14.9 21.4 23 19.8Q27.1 11.1 36.6 12.1Q46.3 13 47.9 22.2Q57 23.3 58 33Q58.5 46.6 47.9 46.6Z"/>' +
    '<path fill="var(--a-w)" d="M13.5 43.4Q5.2 43.4 5.2 36.4Q5.2 28.8 13.1 28.4Q14.4 20.5 21.7 19.1Q25.4 11.2 34.1 12.1Q42.9 13 44.3 21.2Q52.5 22.3 53.4 31.1Q54 43.4 44.3 43.4Z"/>' +
    '<path fill="var(--a-w2)" opacity="0.9" d="M9.4 43.6Q20 40.4 30 43Q42 39.6 55.6 42.4Q54.6 46.4 49 46.6H14Q10.4 46.4 9.4 43.6Z"/>' +
    '<path fill="none" stroke="var(--a-w2)" stroke-width="2" opacity="0.9" d="M19.4 37.6Q24 34.4 28.6 36.6M36 32.4Q40 29 45 30.6"/>',
  rainbow:
    '<path fill="none" stroke="var(--a-r)" stroke-width="4.4" d="M5.6 50A26.4 26.4 0 0 1 58.4 50"/>' +
    '<path fill="none" stroke="var(--a-o)" stroke-width="4.4" d="M9.8 50A22.2 22.2 0 0 1 54.2 50"/>' +
    '<path fill="none" stroke="var(--a-y)" stroke-width="4.4" d="M14 50A18 18 0 0 1 50 50"/>' +
    '<path fill="none" stroke="var(--a-g)" stroke-width="4.4" d="M18.2 50A13.8 13.8 0 0 1 45.8 50"/>' +
    '<path fill="none" stroke="var(--a-b)" stroke-width="4.4" d="M22.4 50A9.6 9.6 0 0 1 41.6 50"/>' +
    '<path fill="none" stroke="var(--a-v)" stroke-width="4.4" d="M26.6 50A5.4 5.4 0 0 1 37.4 50"/>' +
    '<path fill="none" stroke="var(--a-w)" stroke-width="1.4" opacity="0.6" d="M6.4 40.7A27.2 27.2 0 0 1 20.5 25.3"/>' +
    '<path fill="var(--a-w3)" d="M4.6 56Q2.2 56 2.2 53.2Q2.2 50.3 4.9 49.9Q5.8 46.2 9.5 46.2Q12.8 44.2 15.8 47Q20.2 47 20.7 51.1Q21.8 51.6 21.8 53.5Q21.8 56 19.4 56Z"/>' +
    '<path fill="var(--a-w)" d="M4.9 55.1Q2.7 55.1 2.7 52.6Q2.7 50 5.1 49.6Q5.9 46.3 9.3 46.3Q12.2 44.5 14.9 47Q18.9 47 19.4 50.7Q20.3 51.2 20.3 52.9Q20.3 55.1 18.2 55.1Z"/>' +
    '<path fill="var(--a-w3)" d="M44.6 56Q42.2 56 42.2 53.2Q42.2 50.3 44.9 49.9Q45.8 46.2 49.5 46.2Q52.8 44.2 55.8 47Q60.2 47 60.7 51.1Q61.8 51.6 61.8 53.5Q61.8 56 59.4 56Z"/>' +
    '<path fill="var(--a-w)" d="M44.9 55.1Q42.7 55.1 42.7 52.6Q42.7 50 45.1 49.6Q45.9 46.3 49.3 46.3Q52.2 44.5 54.9 47Q58.9 47 59.4 50.7Q60.3 51.2 60.3 52.9Q60.3 55.1 58.2 55.1Z"/>',
  house:
    '<ellipse cx="33" cy="59.6" rx="29" ry="2.6" fill="var(--a-g1)"/><path fill="var(--a-t)" d="M31 33.4L57.6 29.4V55.4L31 59Z"/>' +
    '<path fill="var(--a-t1)" d="M6 34L18.4 17L31 34.4V59H6Z"/>' +
    '<path fill="var(--a-n2)" d="M42.4 18.4V8.6Q42.4 7.6 43.4 7.6H48.6Q49.6 7.6 49.6 8.6V15.4Z"/>' +
    '<path fill="var(--a-r)" stroke="var(--a-r)" stroke-width="2" d="M18.4 13L47 9L61 30L31.6 34.4Z"/>' +
    '<path fill="var(--a-r2)" d="M31.6 34.4L61 30L62 31.6L32 36.4Z"/>' +
    '<path fill="var(--a-r1)" opacity="0.8" d="M18.4 13L47 9L48.4 11.4L20.4 15.2Z"/>' +
    '<path fill="none" stroke="var(--a-r2)" stroke-width="3.6" d="M3 36L18.4 13L33 35.6"/>' +
    '<path fill="none" stroke="var(--a-r1)" stroke-width="1.4" opacity="0.9" d="M5.2 33.6L17.4 15.4"/>' +
    '<path fill="var(--a-n2)" d="M12.6 59V48.6Q12.6 44 17.6 44Q22.4 44 22.4 48.6V59Z"/>' +
    '<path fill="var(--a-n)" d="M12.6 59V48.6Q12.6 44 17 44Q20.6 44 20.6 48.6V59Z"/>' +
    '<circle cx="18.6" cy="52.4" r="1" fill="var(--a-y)"/><circle cx="18.4" cy="27.4" r="3.6" fill="var(--a-w3)"/>' +
    '<circle cx="18.4" cy="27.4" r="2.6" fill="var(--a-c1)"/><path fill="var(--a-w3)" d="M35.4 38.6L44.6 37.4V47L35.4 48.2Z"/>' +
    '<path fill="var(--a-c1)" d="M36.6 39.6L43.4 38.7V46L36.6 46.9Z"/><path fill="var(--a-w3)" d="M48 36.6L54.6 35.7V45.2L48 46.1Z"/>' +
    '<path fill="var(--a-c1)" d="M49.2 37.6L53.4 37V44.2L49.2 44.8Z"/>' +
    '<path fill="var(--a-w)" opacity="0.7" d="M37.4 44.6L41.6 40H43L38.4 45Z"/>',
  grapes:
    '<path fill="none" stroke="var(--a-n2)" stroke-width="3" d="M32 15Q32.6 8.6 37.6 4"/>' +
    '<path fill="var(--a-g)" d="M33.6 11.6Q40 3.4 50.6 5.6Q47.6 14.4 36 14Z"/>' +
    '<path fill="var(--a-g2)" d="M33.6 11.6Q42 9.6 50.6 5.6Q47.6 14.4 36 14Z"/><circle cx="14" cy="21" r="6.8" fill="var(--a-v2)"/>' +
    '<circle cx="13.3" cy="20.3" r="5.8" fill="var(--a-v)"/>' +
    '<ellipse cx="11.6" cy="18.4" rx="1.6" ry="1.1" fill="var(--a-v1)" transform="rotate(-35 11.6 18.4)"/>' +
    '<circle cx="26" cy="20" r="6.8" fill="var(--a-v2)"/><circle cx="25.3" cy="19.3" r="5.8" fill="var(--a-v)"/>' +
    '<ellipse cx="23.6" cy="17.4" rx="1.6" ry="1.1" fill="var(--a-v1)" transform="rotate(-35 23.6 17.4)"/>' +
    '<circle cx="38" cy="20" r="6.8" fill="var(--a-v2)"/><circle cx="37.3" cy="19.3" r="5.8" fill="var(--a-v)"/>' +
    '<ellipse cx="35.6" cy="17.4" rx="1.6" ry="1.1" fill="var(--a-v1)" transform="rotate(-35 35.6 17.4)"/>' +
    '<circle cx="50" cy="21" r="6.8" fill="var(--a-v2)"/><circle cx="49.3" cy="20.3" r="5.8" fill="var(--a-v)"/>' +
    '<ellipse cx="47.6" cy="18.4" rx="1.6" ry="1.1" fill="var(--a-v1)" transform="rotate(-35 47.6 18.4)"/>' +
    '<circle cx="20" cy="31.4" r="6.8" fill="var(--a-v2)"/><circle cx="19.3" cy="30.7" r="5.8" fill="var(--a-v)"/>' +
    '<ellipse cx="17.6" cy="28.8" rx="1.6" ry="1.1" fill="var(--a-v1)" transform="rotate(-35 17.6 28.8)"/>' +
    '<circle cx="32" cy="31" r="6.8" fill="var(--a-v2)"/><circle cx="31.3" cy="30.3" r="5.8" fill="var(--a-v)"/>' +
    '<ellipse cx="29.6" cy="28.4" rx="1.6" ry="1.1" fill="var(--a-v1)" transform="rotate(-35 29.6 28.4)"/>' +
    '<circle cx="44" cy="31.4" r="6.8" fill="var(--a-v2)"/><circle cx="43.3" cy="30.7" r="5.8" fill="var(--a-v)"/>' +
    '<ellipse cx="41.6" cy="28.8" rx="1.6" ry="1.1" fill="var(--a-v1)" transform="rotate(-35 41.6 28.8)"/>' +
    '<circle cx="26" cy="41.6" r="6.8" fill="var(--a-v2)"/><circle cx="25.3" cy="40.9" r="5.8" fill="var(--a-v)"/>' +
    '<ellipse cx="23.6" cy="39" rx="1.6" ry="1.1" fill="var(--a-v1)" transform="rotate(-35 23.6 39)"/>' +
    '<circle cx="38" cy="41.6" r="6.8" fill="var(--a-v2)"/><circle cx="37.3" cy="40.9" r="5.8" fill="var(--a-v)"/>' +
    '<ellipse cx="35.6" cy="39" rx="1.6" ry="1.1" fill="var(--a-v1)" transform="rotate(-35 35.6 39)"/>' +
    '<circle cx="32" cy="51.6" r="6.8" fill="var(--a-v2)"/><circle cx="31.3" cy="50.9" r="5.8" fill="var(--a-v)"/>' +
    '<ellipse cx="29.6" cy="49" rx="1.6" ry="1.1" fill="var(--a-v1)" transform="rotate(-35 29.6 49)"/>',
  truck:
    '<rect x="3.6" y="42.6" width="56" height="5.4" rx="1.6" fill="var(--a-k2)"/>' +
    '<path fill="var(--a-b2)" d="M6 12H36Q38.4 12 38.4 14.4V44H3.6V14.4Q3.6 12 6 12Z"/>' +
    '<path fill="var(--a-b)" d="M6.3 12.2H34.8Q37.1 12.2 37.1 14.5V42.6H4V14.5Q4 12.2 6.3 12.2Z"/>' +
    '<rect x="6" y="14.2" width="29" height="2.2" rx="1.1" fill="var(--a-b1)"/>' +
    '<path fill="none" stroke="var(--a-b2)" stroke-width="1.4" opacity="0.8" d="M15.6 18V40M26.4 18V40"/>' +
    '<path fill="var(--a-o2)" d="M38 22H50Q53 22 55 25L59.4 32.6Q61 35.4 61 38V44.4Q61 47 58.4 47H38Z"/>' +
    '<path fill="var(--a-o)" d="M38.4 22.2H49.8Q52.7 22.2 54.6 25.1L58.7 32.3Q60.2 34.9 60.2 37.4V43.5Q60.2 46 57.8 46H38.4Z"/>' +
    '<path fill="var(--a-c1)" d="M41.6 25H49.4Q51 25 52 26.6L55.6 33H41.6Z"/>' +
    '<path fill="var(--a-w)" opacity="0.7" d="M44 31.4L48.6 25.6H50.4L45.8 31.4Z"/>' +
    '<ellipse cx="59.6" cy="39.6" rx="1.5" ry="2.4" fill="var(--a-y)"/>' +
    '<rect x="55" y="44" width="7" height="3" rx="1.5" fill="var(--a-e)"/><circle cx="15" cy="49" r="9.2" fill="var(--a-b3)"/>' +
    '<circle cx="15" cy="49" r="7.4" fill="var(--a-k2)"/><circle cx="15" cy="49" r="3.4" fill="var(--a-e)"/>' +
    '<circle cx="13.9" cy="47.9" r="1.2" fill="var(--a-w)"/><circle cx="48.4" cy="49" r="9.2" fill="var(--a-o3)"/>' +
    '<circle cx="48.4" cy="49" r="7.4" fill="var(--a-k2)"/><circle cx="48.4" cy="49" r="3.4" fill="var(--a-e)"/>' +
    '<circle cx="47.3" cy="47.9" r="1.2" fill="var(--a-w)"/>',
  train:
    '<circle cx="48" cy="8" r="4" fill="var(--a-w3)"/><circle cx="47.4" cy="7.4" r="3.2" fill="var(--a-w)"/>' +
    '<circle cx="55" cy="4.6" r="3" fill="var(--a-w3)"/><circle cx="54.6" cy="4.2" r="2.3" fill="var(--a-w)"/>' +
    '<path fill="var(--a-k2)" d="M41.6 25L40.4 13.6H49.6L48.4 25Z"/>' +
    '<rect x="39.4" y="11.4" width="11.2" height="3.6" rx="1.6" fill="var(--a-k)"/>' +
    '<path fill="var(--a-g2)" d="M22 24H52Q57 24 57 34Q57 44 52 44H22Z"/>' +
    '<path fill="var(--a-g)" d="M22.4 24.2H50.6Q55.3 24.2 55.3 33.6Q55.3 43 50.6 43H22.4Z"/>' +
    '<ellipse cx="53.6" cy="34" rx="3.4" ry="9.4" fill="var(--a-g2)"/><circle cx="56" cy="34" r="2.4" fill="var(--a-y)"/>' +
    '<rect x="22" y="27.6" width="31" height="2" rx="1" fill="var(--a-g1)"/>' +
    '<path fill="var(--a-y2)" d="M28 24Q28 18.6 32.6 18.6Q37 18.6 37 24Z"/>' +
    '<path fill="var(--a-y)" d="M28 24Q28 19.6 32 19.6Q35.4 19.6 35.4 24Z"/><path fill="var(--a-r2)" d="M5 16H25V46H5Z"/>' +
    '<path fill="var(--a-r)" d="M5.3 16.2H24.3V44.7H5.3Z"/><rect x="2.6" y="11" width="25" height="5.6" rx="2.4" fill="var(--a-k2)"/>' +
    '<rect x="2.6" y="11" width="23" height="2.4" rx="1.2" fill="var(--a-e3)"/>' +
    '<rect x="9" y="20" width="12" height="10" rx="2" fill="var(--a-c1)"/>' +
    '<path fill="var(--a-w)" opacity="0.7" d="M11 27.6L15.4 21.4H17.6L13 27.6Z"/>' +
    '<rect x="3" y="43" width="54" height="5" rx="1.6" fill="var(--a-k2)"/>' +
    '<path fill="var(--a-e2)" d="M53 43L62 51.6Q62.4 53 61 53H52Z"/><circle cx="13.6" cy="51" r="8" fill="var(--a-k2)"/>' +
    '<circle cx="13.6" cy="51" r="6.2" fill="var(--a-r)"/><circle cx="11.2" cy="48.6" r="2.4" fill="var(--a-r1)"/>' +
    '<circle cx="13.6" cy="51" r="1.4" fill="var(--a-k2)"/><circle cx="32" cy="51" r="6.4" fill="var(--a-k2)"/>' +
    '<circle cx="32" cy="51" r="4.6" fill="var(--a-r)"/><circle cx="30.1" cy="49.1" r="1.9" fill="var(--a-r1)"/>' +
    '<circle cx="32" cy="51" r="1.4" fill="var(--a-k2)"/><circle cx="45.6" cy="51" r="6.4" fill="var(--a-k2)"/>' +
    '<circle cx="45.6" cy="51" r="4.6" fill="var(--a-r)"/><circle cx="43.7" cy="49.1" r="1.9" fill="var(--a-r1)"/>' +
    '<circle cx="45.6" cy="51" r="1.4" fill="var(--a-k2)"/><path fill="none" stroke="var(--a-e)" stroke-width="2.2" d="M32 51H45.6"/>',
  tooth:
    '<path fill="var(--a-w3)" stroke="var(--a-w3)" stroke-width="1.8" d="M14 16Q14 6 24 7Q28 7.5 32 10Q36 7.5 40 7Q50 6 50 16Q50 25 46 31Q44 36 43.5 45Q43 57 38.5 58Q35 58.5 34.5 52L33.5 44Q32 41.5 30.5 44L29.5 52Q29 58.5 25.5 58Q21 57 20.5 45Q20 36 18 31Q14 25 14 16Z"/>' +
    '<path fill="var(--a-w2)" d="M14.3 15.9Q14.3 6.2 24 7.2Q27.9 7.7 31.8 10.1Q35.6 7.7 39.5 7.2Q49.2 6.2 49.2 15.9Q49.2 24.6 45.3 30.5Q43.4 35.3 42.9 44Q42.4 55.7 38.1 56.6Q34.7 57.1 34.2 50.8L33.2 43.1Q31.8 40.6 30.3 43.1L29.3 50.8Q28.9 57.1 25.5 56.6Q21.1 55.7 20.6 44Q20.1 35.3 18.2 30.5Q14.3 24.6 14.3 15.9Z"/>' +
    '<path fill="var(--a-w)" d="M14.6 15.2Q14.6 6.6 23.2 7.5Q26.6 7.9 30.1 10Q33.5 7.9 37 7.5Q45.6 6.6 45.6 15.2Q45.6 22.9 42.1 28.1Q40.4 32.4 40 40.1Q39.5 50.5 35.7 51.3Q32.7 51.8 32.2 46.2L31.4 39.3Q30.1 37.1 28.8 39.3L27.9 46.2Q27.5 51.8 24.5 51.3Q20.6 50.5 20.2 40.1Q19.8 32.4 18 28.1Q14.6 22.9 14.6 15.2Z"/>' +
    '<ellipse cx="21" cy="18" rx="2.2" ry="5.6" fill="var(--a-w2)" opacity="0.9" transform="rotate(20 21 18)"/>' +
    '<path fill="none" stroke="var(--a-w2)" stroke-width="1.8" opacity="0.9" d="M27 11Q32 15 37 11"/>' +
    '<path fill="var(--a-y)" d="M51 2.6L52.4 7.6L57.4 9L52.4 10.4L51 15.4L49.6 10.4L44.6 9L49.6 7.6Z"/>' +
    '<path fill="var(--a-y)" d="M57 15L57.8 17.6L60.4 18.4L57.8 19.2L57 21.8L56.2 19.2L53.6 18.4L56.2 17.6Z"/>',
  shirt:
    '<path fill="var(--a-g3)" d="M23.4 7.6Q27.6 4.6 32 4.6Q36.4 4.6 40.6 7.6Q36.4 11 32 11Q27.6 11 23.4 7.6Z"/>' +
    '<path fill="var(--a-g2)" d="M23 7Q27 11 32 11Q37 11 41 7L52 11Q56 12.6 58 17L61 26Q62 29 59 30L51 32V57Q51 60 48 60H16Q13 60 13 57V32L5 30Q2 29 3 26L6 17Q8 12.6 12 11Z"/>' +
    '<path fill="var(--a-g)" d="M22.2 7.3Q26 11.1 30.7 11.1Q35.4 11.1 39.2 7.3L49.5 11.1Q53.3 12.6 55.1 16.7L58 25.2Q58.9 28 56.1 28.9L48.6 30.8V54.3Q48.6 57.1 45.7 57.1H15.7Q12.8 57.1 12.8 54.3V30.8L5.3 28.9Q2.5 28 3.4 25.2L6.3 16.7Q8.1 12.6 11.9 11.1Z"/>' +
    '<path fill="none" stroke="var(--a-g2)" stroke-width="2.4" d="M23 7Q27 12.6 32 12.6Q37 12.6 41 7"/>' +
    '<path fill="none" stroke="var(--a-g2)" stroke-width="1.6" d="M13 32L12 14M51 32L52 14M14 56H50"/>' +
    '<path fill="none" stroke="var(--a-g2)" stroke-width="1.6" d="M37 21H45V27.4Q45 29 43.4 29H38.6Q37 29 37 27.4Z"/>' +
    '<ellipse cx="19.6" cy="22" rx="2.6" ry="7.4" fill="var(--a-g1)" opacity="0.9" transform="rotate(16 19.6 22)"/>' +
    '<ellipse cx="8.6" cy="20" rx="1.4" ry="4" fill="var(--a-g1)" opacity="0.9" transform="rotate(22 8.6 20)"/>',
  mouth:
    '<path fill="var(--a-p2)" d="M5 30Q12 20 22 20Q27 20 32 23Q37 20 42 20Q52 20 59 30Q52 47 32 47Q12 47 5 30Z"/>' +
    '<path fill="var(--a-p)" d="M5.6 29.8Q12.2 20.3 21.8 20.3Q26.5 20.3 31.3 23.2Q36 20.3 40.8 20.3Q50.3 20.3 56.9 29.8Q50.3 45.9 31.3 45.9Q12.2 45.9 5.6 29.8Z"/>' +
    '<path fill="var(--a-r3)" d="M11 30.4Q32 26 53 30.4Q46 41.4 32 41.4Q18 41.4 11 30.4Z"/>' +
    '<path fill="var(--a-p)" d="M21 39.6Q25.6 35 32 35.4Q38.4 35 43 39.6Q37.6 41.4 32 41.4Q26.4 41.4 21 39.6Z"/>' +
    '<path fill="var(--a-w2)" d="M13.4 30.6Q32 27 50.6 30.6Q49 34.6 46 35H18Q15 34.6 13.4 30.6Z"/>' +
    '<path fill="var(--a-w)" d="M13.4 30.6Q32 27 50.6 30.6Q49.6 33 47 33.4H17Q14.6 33 13.4 30.6Z"/>' +
    '<path fill="none" stroke="var(--a-w3)" stroke-width="1.2" d="M24 28.8V34.6M32 28.2V34.8M40 28.8V34.6"/>' +
    '<ellipse cx="21" cy="23.8" rx="6" ry="1.7" fill="var(--a-p1)" transform="rotate(-12 21 23.8)"/>' +
    '<ellipse cx="30" cy="43.4" rx="8" ry="1.8" fill="var(--a-p1)"/>',
  mouse:
    '<path fill="none" stroke="var(--a-p2)" stroke-width="2.2" d="M50 52Q61 55 60 45Q59 37.6 53 39.6"/>' +
    '<circle cx="36" cy="18.6" r="7.6" fill="var(--a-e2)"/><ellipse cx="36.2" cy="19" rx="4.2" ry="5" fill="var(--a-p2)"/>' +
    '<path fill="var(--a-e2)" d="M4 41Q8 34 16 30Q24 22 36 22Q53 23 54 44Q54 56 42 56H22Q12 56 9 47Q5 45.6 4 41Z"/>' +
    '<path fill="var(--a-e)" d="M4.4 40Q8.1 33.5 15.6 29.7Q23 22.3 34.2 22.3Q50 23.2 50.9 42.8Q50.9 53.9 39.7 53.9H21.1Q11.8 53.9 9.1 45.6Q5.3 44.2 4.4 40Z"/>' +
    '<path fill="var(--a-e1)" d="M12.4 48Q20 44.4 28 47.6Q32 51 31 56H22Q14.6 55 12.4 48Z"/>' +
    '<ellipse cx="33" cy="27.6" rx="6.6" ry="2.4" fill="var(--a-e1)" transform="rotate(-14 33 27.6)"/>' +
    '<circle cx="22.6" cy="21.6" r="9.2" fill="var(--a-e2)"/><circle cx="21.8" cy="20.8" r="8.2" fill="var(--a-e)"/>' +
    '<ellipse cx="22" cy="21.4" rx="5" ry="5.8" fill="var(--a-p)"/>' +
    '<ellipse cx="20.6" cy="19" rx="2" ry="1.4" fill="var(--a-p1)" transform="rotate(-30 20.6 19)"/>' +
    '<ellipse cx="14.6" cy="35.6" rx="2.3" ry="2.7" fill="var(--a-k)"/><circle cx="13.9" cy="34.6" r="1" fill="var(--a-w)"/>' +
    '<circle cx="4.8" cy="40.6" r="2.3" fill="var(--a-p2)"/><circle cx="4.2" cy="40" r="0.9" fill="var(--a-w)" opacity="0.7"/>' +
    '<path fill="none" stroke="var(--a-e3)" stroke-width="1.4" d="M9 43L2.4 46M9 41L2.4 38.6"/>' +
    '<ellipse cx="13.4" cy="43.4" rx="2.2" ry="1.4" fill="var(--a-p)" opacity="0.6"/>' +
    '<ellipse cx="20" cy="56.4" rx="4.4" ry="2.2" fill="var(--a-p)"/><ellipse cx="38" cy="56.4" rx="4.4" ry="2.2" fill="var(--a-p)"/>',
  table:
    '<rect x="35.6" y="24" width="3.6" height="24" rx="1.4" fill="var(--a-n3)"/>' +
    '<rect x="5.6" y="30" width="4.4" height="25" rx="1.4" fill="var(--a-n2)"/>' +
    '<rect x="5.6" y="30" width="2" height="25" rx="1" fill="var(--a-n)"/>' +
    '<rect x="53.6" y="31" width="4.4" height="23.6" rx="1.4" fill="var(--a-n2)"/>' +
    '<rect x="53.6" y="31" width="2" height="23.6" rx="1" fill="var(--a-n)"/>' +
    '<rect x="23.6" y="37" width="4.4" height="24.4" rx="1.4" fill="var(--a-n2)"/>' +
    '<rect x="23.6" y="37" width="2" height="24.4" rx="1" fill="var(--a-n)"/>' +
    '<path fill="var(--a-n2)" stroke="var(--a-n2)" stroke-width="2" d="M26 34L60 28V33L26 39Z"/>' +
    '<path fill="var(--a-n)" stroke="var(--a-n)" stroke-width="2" d="M4 27L26 34V39L4 32Z"/>' +
    '<path fill="var(--a-n1)" stroke="var(--a-n1)" stroke-width="2" d="M4 27L38 21L60 28L26 34Z"/>' +
    '<path fill="none" stroke="var(--a-n)" stroke-width="1.4" opacity="0.6" d="M14 27.4Q24 25 34 26.6M24 30.6Q36 28.6 48 30"/>' +
    '<path fill="none" stroke="var(--a-t1)" stroke-width="1.4" opacity="0.8" d="M7 27.4L37.6 22.2"/>',
  horse:
    '<path fill="var(--a-n2)" d="M37.4 11.4L40 1.6Q40.8 0.4 42 1.6L45.6 10.6Z"/><path fill="var(--a-n3)" d="M39.4 9L40.8 3.6L43 9.4Z"/>' +
    '<path fill="var(--a-n2)" d="M38 9Q31 11 27 17L11 37Q5 44 7 50Q9 56 16 56Q21 56 24 52Q28 46 35 45Q40 45 42 49L44 61H60Q61 40 55 24Q51 12 38 9Z"/>' +
    '<path fill="var(--a-n)" d="M36.6 9.3Q30 11.2 26.3 16.8L11.2 35.6Q5.6 42.2 7.5 47.8Q9.4 53.5 15.9 53.5Q20.6 53.5 23.5 49.7Q27.2 44.1 33.8 43.1Q38.5 43.1 40.4 46.9L42.3 58.2H57.3Q58.2 38.4 52.6 23.4Q48.8 12.1 36.6 9.3Z"/>' +
    '<path fill="var(--a-n1)" d="M11 37Q5 44 7 50Q9 56 16 56Q21 56 24 52Q24.4 44 18.6 40Q14.6 37 11 37Z"/>' +
    '<ellipse cx="10.6" cy="45.8" rx="1.8" ry="2.8" fill="var(--a-n3)" transform="rotate(-30 10.6 45.8)"/>' +
    '<path fill="none" stroke="var(--a-n3)" stroke-width="1.6" d="M15.6 51.4Q19.4 52.4 22 50"/>' +
    '<path fill="var(--a-n3)" d="M38 9Q48 7.6 54.4 14Q60.4 22 61.4 34Q62.4 48 61 61H56.4Q57 46 54 34Q50.4 22 42 14Z"/>' +
    '<path fill="var(--a-n3)" d="M35.6 10.4Q30 11 28.4 17Q32.4 14 37.6 14.4Z"/>' +
    '<ellipse cx="24.6" cy="21.4" rx="2" ry="6.6" fill="var(--a-n1)" opacity="0.9" transform="rotate(40 24.6 21.4)"/>' +
    '<path fill="none" stroke="var(--a-n2)" stroke-width="1.8" opacity="0.9" d="M24 40Q30 33 38 36"/>' +
    '<ellipse cx="29.6" cy="22.6" rx="2.5" ry="3" fill="var(--a-k)"/><circle cx="28.8" cy="21.5" r="1" fill="var(--a-w)"/>' +
    '<ellipse cx="28.6" cy="32" rx="3" ry="1.9" fill="var(--a-p)" opacity="0.5"/>',
  bee:
    '<path fill="var(--a-k2)" d="M52.6 36.6L60 39.4L52.6 42.4Z"/><ellipse cx="36" cy="38" rx="18" ry="15" fill="var(--a-y2)"/>' +
    '<ellipse cx="34.6" cy="36.6" rx="16.6" ry="13.4" fill="var(--a-y)"/>' +
    '<path fill="var(--a-k2)" d="M30 23.7L32.7 23.3L35.4 23.2L35.4 50L32.7 49.9L30 49.5Z"/>' +
    '<path fill="var(--a-k2)" d="M41.4 24.4L43.9 25.5L46.4 27.2L46.4 46L43.9 47.7L41.4 48.8Z"/>' +
    '<path fill="var(--a-k2)" d="M52 32Q53.6 35 53.6 38.6Q53.6 44 50.6 46.6Q51.6 41 50.6 33.6Z"/>' +
    '<ellipse cx="28" cy="27" rx="4.4" ry="1.8" fill="var(--a-y1)" transform="rotate(-20 28 27)"/>' +
    '<ellipse cx="28" cy="17" rx="6.4" ry="10" fill="var(--a-c1)" opacity="0.75" transform="rotate(-30 28 17)"/>' +
    '<ellipse cx="41" cy="16" rx="6" ry="9.4" fill="var(--a-c1)" opacity="0.75" transform="rotate(24 41 16)"/>' +
    '<ellipse cx="26.6" cy="15" rx="2" ry="5" fill="var(--a-w)" opacity="0.8" transform="rotate(-30 26.6 15)"/>' +
    '<ellipse cx="39.8" cy="13.4" rx="1.8" ry="4.6" fill="var(--a-w)" opacity="0.8" transform="rotate(24 39.8 13.4)"/>' +
    '<path fill="none" stroke="var(--a-k2)" stroke-width="1.8" d="M13 26Q10 19.6 6.6 18.4M20.4 25Q22.4 18.6 26 17.4"/>' +
    '<circle cx="6.4" cy="18.2" r="2.2" fill="var(--a-k2)"/><circle cx="26.4" cy="17.2" r="2.2" fill="var(--a-k2)"/>' +
    '<circle cx="17" cy="36" r="11.4" fill="var(--a-y2)"/><circle cx="16" cy="35" r="10.2" fill="var(--a-y)"/>' +
    '<ellipse cx="12.4" cy="29.6" rx="3" ry="1.6" fill="var(--a-y1)" transform="rotate(-35 12.4 29.6)"/>' +
    '<ellipse cx="12.6" cy="34.4" rx="2.2" ry="2.7" fill="var(--a-k)"/><circle cx="11.9" cy="33.4" r="1" fill="var(--a-w)"/>' +
    '<ellipse cx="21.2" cy="34.4" rx="2.2" ry="2.7" fill="var(--a-k)"/><circle cx="20.5" cy="33.4" r="1" fill="var(--a-w)"/>' +
    '<path fill="none" stroke="var(--a-k)" stroke-width="1.8" d="M14 40.6Q16.8 43 19.6 40.6"/>' +
    '<ellipse cx="9" cy="40" rx="2.2" ry="1.5" fill="var(--a-p)" opacity="0.7"/>' +
    '<ellipse cx="24.6" cy="40" rx="2.2" ry="1.5" fill="var(--a-p)" opacity="0.7"/>',
  turtle:
    '<ellipse cx="20" cy="51" rx="4.6" ry="5.8" fill="var(--a-g)"/><ellipse cx="19.4" cy="50.4" rx="3.6" ry="4.8" fill="var(--a-g1)"/>' +
    '<ellipse cx="47" cy="51" rx="4.6" ry="5.8" fill="var(--a-g)"/><ellipse cx="46.4" cy="50.4" rx="3.6" ry="4.8" fill="var(--a-g1)"/>' +
    '<path fill="var(--a-g)" d="M56 41Q61.6 42 62 46Q58 47 55 45Z"/>' +
    '<path fill="var(--a-g)" d="M7.6 38.6Q12 47.6 22.6 46.6L23.6 38Q17 38.6 14 33Z"/>' +
    '<path fill="var(--a-g1)" d="M8.6 38Q12.6 45.6 22.2 45L22.8 39Q16.6 38.6 13.6 34.6Z"/>' +
    '<circle cx="11.4" cy="34.4" r="8.4" fill="var(--a-g)"/><circle cx="10.6" cy="33.6" r="7.4" fill="var(--a-g1)"/>' +
    '<ellipse cx="8.6" cy="29.4" rx="2.6" ry="1.4" fill="var(--a-w)" opacity="0.5" transform="rotate(-30 8.6 29.4)"/>' +
    '<ellipse cx="9.6" cy="32.6" rx="2.2" ry="2.7" fill="var(--a-k)"/><circle cx="8.9" cy="31.6" r="1" fill="var(--a-w)"/>' +
    '<path fill="none" stroke="var(--a-g3)" stroke-width="1.6" d="M4.2 37.4Q6.6 39.6 9.6 38.4"/>' +
    '<ellipse cx="14" cy="37.4" rx="2" ry="1.3" fill="var(--a-p)" opacity="0.6"/>' +
    '<path fill="var(--a-g2)" d="M13 45Q13 20 35 19Q57 20 58 45Z"/>' +
    '<path fill="var(--a-g)" d="M13.4 43.5Q13.4 20.2 33.9 19.3Q54.3 20.2 55.3 43.5Z"/>' +
    '<path fill="none" stroke="var(--a-g2)" stroke-width="2" d="M28.6 24.6H41.4L46 32.6L41.4 40.6H28.6L24 32.6ZM28.6 24.6L25 20.8M41.4 24.6L45.4 21M46 32.6L56.4 34.6M41.4 40.6L43.6 45M28.6 40.6L26.6 45M24 32.6L13.6 34.6"/>' +
    '<ellipse cx="31.6" cy="28.4" rx="4" ry="1.8" fill="var(--a-g1)" opacity="0.8" transform="rotate(-10 31.6 28.4)"/>' +
    '<ellipse cx="21" cy="26.4" rx="3.6" ry="1.6" fill="var(--a-g1)" opacity="0.8" transform="rotate(-35 21 26.4)"/>' +
    '<path fill="var(--a-y2)" stroke="var(--a-y2)" stroke-width="1.4" d="M10 44H59Q59.6 47.6 56 47.6H13Q9.4 47.6 10 44Z"/>' +
    '<rect x="11" y="44" width="47" height="1.4" rx="0.7" fill="var(--a-y1)"/>',
  water:
    '<path fill="var(--a-c2)" d="M32 3Q38 13 46 23.6Q53.4 33 53.4 40.6Q53.4 52.6 42.6 58Q37.6 60.4 32 60.4Q21.4 60.4 15.4 52.6Q10.6 47 10.6 40.6Q10.6 33 18 23.6Q26 13 32 3Z"/>' +
    '<path fill="var(--a-c)" d="M30.3 3.3Q35.7 12.3 42.9 21.8Q49.5 30.3 49.5 37.1Q49.5 47.9 39.8 52.8Q35.3 55 30.3 55Q20.7 55 15.3 47.9Q11 42.9 11 37.1Q11 30.3 17.7 21.8Q24.9 12.3 30.3 3.3Z"/>' +
    '<ellipse cx="20.6" cy="40" rx="3" ry="8.6" fill="var(--a-c1)" transform="rotate(18 20.6 40)"/>' +
    '<circle cx="23.6" cy="27.6" r="2.2" fill="var(--a-w)" opacity="0.85"/>' +
    '<path fill="none" stroke="var(--a-c1)" stroke-width="2.2" opacity="0.8" d="M37.6 53.6Q44.6 50.6 46.4 43"/>',
  ear:
    '<path fill="var(--a-s2)" d="M29 5Q47 4 50.6 21Q52.4 31 46 39.6Q41.4 45 40.6 51Q39 60 30 60Q21.6 60 20.6 52Q20 46.4 23.4 43Q17.6 38.6 17.4 30Q17 19 21 12Q24 6 29 5Z"/>' +
    '<path fill="var(--a-s)" d="M28.5 5.2Q45.2 4.3 48.5 20.1Q50.2 29.4 44.3 37.4Q40 42.4 39.2 48Q37.8 56.4 29.4 56.4Q21.6 56.4 20.6 48.9Q20.1 43.7 23.3 40.6Q17.9 36.5 17.7 28.5Q17.3 18.3 21 11.7Q23.8 6.2 28.5 5.2Z"/>' +
    '<path fill="none" stroke="var(--a-s2)" stroke-width="3" d="M24.4 17.6Q29.6 10.6 37.6 12.2Q45.6 14.4 45.6 23.6Q45.6 31.4 40.4 37"/>' +
    '<path fill="var(--a-s3)" d="M27.6 30.6Q28.4 23.6 34.6 23.4Q39.6 24 38.6 31Q37.4 38 31.4 39.4Q27 39.6 27.6 30.6Z"/>' +
    '<path fill="var(--a-s2)" d="M24.4 33Q27.4 30 29.4 33.4Q29 37.6 25.6 37.4Z"/>' +
    '<ellipse cx="28.6" cy="52" rx="4.4" ry="4.6" fill="var(--a-s1)"/>' +
    '<ellipse cx="24.4" cy="13.2" rx="2.4" ry="4.6" fill="var(--a-s1)" opacity="0.9" transform="rotate(40 24.4 13.2)"/>',
  owl:
    '<path fill="var(--a-n2)" d="M13.6 13L19.4 20.6Q24.4 17 32 17Q39.6 17 44.6 20.6L50.4 13Q54.4 22 53.4 34Q53.4 52 42 58Q37 61 32 61Q27 61 22 58Q10.6 52 10.6 34Q9.6 22 13.6 13Z"/>' +
    '<path fill="var(--a-n)" d="M13.9 13.2L19.3 20.3Q24 17 31.2 17Q38.3 17 43 20.3L48.5 13.2Q52.2 21.7 51.3 32.9Q51.3 49.9 40.6 55.5Q35.9 58.3 31.2 58.3Q26.5 58.3 21.8 55.5Q11 49.9 11 32.9Q10.1 21.7 13.9 13.2Z"/>' +
    '<path fill="var(--a-t)" d="M21 41Q22 31 32 31Q42 31 43 41Q44 52 32 57Q20 52 21 41Z"/>' +
    '<path fill="none" stroke="var(--a-t2)" stroke-width="1.6" d="M26 42Q28 44.4 30 42M34 42Q36 44.4 38 42M30 48.6Q32 51 34 48.6"/>' +
    '<path fill="var(--a-n2)" d="M11.6 33Q7.6 46 18 54.6Q20 44 15.6 33Z"/>' +
    '<path fill="var(--a-n2)" d="M52.4 33Q56.4 46 46 54.6Q44 44 48.4 33Z"/><circle cx="23.4" cy="28.6" r="8.4" fill="var(--a-m2)"/>' +
    '<circle cx="40.6" cy="28.6" r="8.4" fill="var(--a-m2)"/><circle cx="22.8" cy="28" r="7.6" fill="var(--a-m)"/>' +
    '<circle cx="40" cy="28" r="7.6" fill="var(--a-m)"/><circle cx="24" cy="29" r="5" fill="var(--a-y)"/>' +
    '<circle cx="40" cy="29" r="5" fill="var(--a-y)"/><ellipse cx="24" cy="29.2" rx="3.2" ry="3.6" fill="var(--a-k)"/>' +
    '<circle cx="23" cy="27.8" r="1.3" fill="var(--a-w)"/><ellipse cx="40" cy="29.2" rx="3.2" ry="3.6" fill="var(--a-k)"/>' +
    '<circle cx="39" cy="27.8" r="1.3" fill="var(--a-w)"/><path fill="var(--a-o)" d="M29 34.6H35L32 40.6Z"/>' +
    '<path fill="var(--a-o2)" d="M32 34.6H35L32 40.6Z"/>' +
    '<ellipse cx="18.6" cy="18.6" rx="3.4" ry="1.6" fill="var(--a-n1)" transform="rotate(40 18.6 18.6)"/>' +
    '<path fill="none" stroke="var(--a-o)" stroke-width="2.2" d="M27 59.4V61.6M30 59.6V61.8M34 59.6V61.8M37 59.4V61.6"/>',
  helicopter:
    '<path fill="none" stroke="var(--a-k2)" stroke-width="2.8" d="M6 8.6H58"/>' +
    '<rect x="29.6" y="8" width="4.8" height="8.4" rx="1.4" fill="var(--a-e3)"/>' +
    '<rect x="27" y="6.6" width="10" height="3.6" rx="1.8" fill="var(--a-k2)"/>' +
    '<path fill="var(--a-r2)" d="M19 25L5 21.4Q2.6 21 2.6 23.6V26.6Q2.6 29 5 29L19 33Z"/>' +
    '<path fill="var(--a-r)" d="M19 25L5 21.4Q3.4 21.2 3.4 23V25.4L19 28Z"/>' +
    '<path fill="var(--a-r2)" d="M3 24L2 14.6Q2 12.6 4 12.6H6.4L9.4 23.4Z"/>' +
    '<path fill="none" stroke="var(--a-k2)" stroke-width="1.8" d="M5.6 14.6V25.4"/>' +
    '<circle cx="5.6" cy="20" r="1.8" fill="var(--a-e3)"/>' +
    '<path fill="none" stroke="var(--a-e2)" stroke-width="2.4" d="M22.6 43L20.6 51M44.6 43L46.6 51"/>' +
    '<path fill="none" stroke="var(--a-k2)" stroke-width="2.8" d="M12.6 51.6H53.6Q57 51.6 58.4 48.4"/>' +
    '<path fill="var(--a-r2)" d="M15 31Q15 16 30 15.4H40Q51.6 15.4 56 27.6Q58 34 56 38Q53 43.6 44 43.6H25Q15 43.6 15 31Z"/>' +
    '<path fill="var(--a-r)" d="M15.4 30.4Q15.4 16.3 29.5 15.7H38.9Q49.8 15.7 53.9 27.2Q55.8 33.2 53.9 36.9Q51.1 42.2 42.7 42.2H24.8Q15.4 42.2 15.4 30.4Z"/>' +
    '<path fill="var(--a-c1)" d="M39.6 18.4H42.4Q50.6 18.6 53.6 28Q54.4 31 51.6 31H39.6Q38.4 31 38.4 29.6V19.6Q38.4 18.4 39.6 18.4Z"/>' +
    '<path fill="var(--a-w)" opacity="0.7" d="M42 28L46.4 20.4H48.4L44 28Z"/>' +
    '<path fill="none" stroke="var(--a-r2)" stroke-width="1.4" d="M34.6 19V40"/>' +
    '<ellipse cx="23" cy="22.6" rx="4.4" ry="2" fill="var(--a-r1)" opacity="0.9" transform="rotate(-24 23 22.6)"/>' +
    '<rect x="26" y="26.6" width="6" height="3" rx="1.5" fill="var(--a-r2)"/>',
  rocket:
    '<path fill="var(--a-o)" d="M16.5 41.5L26.6 49.3Q22.1 55.4 13.2 56.1Q11.7 47.3 16.5 41.5Z"/>' +
    '<path fill="var(--a-y)" d="M18.7 43.2L24.4 47.6Q20.9 52 15.6 53Q15.2 47.6 18.7 43.2Z"/>' +
    '<path fill="var(--a-e2)" d="M17.8 36.2L31.4 46.8L26.1 50.2L15.7 42.1Z"/>' +
    '<path fill="var(--a-r2)" d="M41.9 39.8L42.4 55.4Q42.2 59 38.5 59.4L32.1 52.4Z"/>' +
    '<path fill="var(--a-w3)" d="M49.9 9.1Q54.2 24 42.5 39L33.9 50L14.1 34.5L22.7 23.5Q34.4 8.5 49.9 9.1Z"/>' +
    '<path fill="var(--a-w2)" d="M49.5 9.3Q53.8 23.6 42.4 38.2L34.1 48.8L14.8 33.8L23.2 23.2Q34.5 8.6 49.5 9.3Z"/>' +
    '<path fill="var(--a-w)" d="M48.3 9.7Q52.2 22.8 41.9 35.9L34.3 45.7L16.8 32L24.4 22.2Q34.7 9.1 48.3 9.7Z"/>' +
    '<path fill="var(--a-r2)" d="M49.9 9.1Q52.8 19 49.7 27.5L32 13.8Q39.5 8.7 49.9 9.1Z"/>' +
    '<path fill="var(--a-r)" d="M49.9 9.1Q51.5 16.8 48.7 24.2L33.3 12.2Q39.5 8.7 49.9 9.1Z"/>' +
    '<path fill="var(--a-r)" d="M22.1 24.2L6.8 27.5Q3.4 28.7 3.8 32.3L12.2 36.9Z"/>' +
    '<path fill="var(--a-r2)" d="M26.9 33.1L32.2 37.2L20.9 51.7L15.5 47.6Z"/><circle cx="34.5" cy="28.8" r="6.6" fill="var(--a-e2)"/>' +
    '<circle cx="34.5" cy="28.8" r="4.8" fill="var(--a-b)"/><circle cx="32.9" cy="27.2" r="1.6" fill="var(--a-w)" opacity="0.85"/>' +
    '<path fill="var(--a-w)" opacity="0.9" d="M25.1 27.9Q31.5 18.9 40.2 14.3L41.8 15.6Q33.7 20.7 27.1 29.5Z"/>',
  tie:
    '<path fill="var(--a-w3)" d="M18.6 3.6L31.4 10.6L25.4 19.6Q20.6 16.4 18.6 3.6Z"/>' +
    '<path fill="var(--a-w)" d="M19.4 5L30.4 11L25.4 18Q21.4 15 19.4 5Z"/>' +
    '<path fill="var(--a-w3)" d="M45.4 3.6L32.6 10.6L38.6 19.6Q43.4 16.4 45.4 3.6Z"/>' +
    '<path fill="var(--a-w2)" d="M44.6 5L33.6 11L38.6 18Q42.6 15 44.6 5Z"/>' +
    '<path fill="var(--a-b2)" d="M27.6 20H36.4L44.8 50Q45.2 53 42.6 55.6L34 61.6Q32 63 30 61.6L21.4 55.6Q18.8 53 19.2 50Z"/>' +
    '<path fill="var(--a-b)" d="M27.6 20.2H35.8L43.7 48.4Q44.1 51.2 41.7 53.7L33.6 59.3Q31.7 60.6 29.8 59.3L21.7 53.7Q19.3 51.2 19.7 48.4Z"/>' +
    '<path fill="var(--a-y)" d="M24.4 31.6L38 25.6L39 29.2L23.3 35.2Z"/>' +
    '<path fill="var(--a-y)" d="M21.3 42.6L41 36.6L42.1 40.2L20.3 46.2Z"/>' +
    '<path fill="var(--a-y)" d="M18.2 53.4L44.1 47.4L45.1 51L17.2 57Z"/><path fill="var(--a-b2)" d="M25.4 10.4H38.6L36.4 21.4H27.6Z"/>' +
    '<path fill="var(--a-b)" d="M25.4 10.4H37.4L35.4 20.4H27.6Z"/>' +
    '<path fill="var(--a-b1)" opacity="0.9" d="M26.4 11.6H32L31 13.6H26.8Z"/>' +
    '<path fill="none" stroke="var(--a-b1)" stroke-width="1.6" opacity="0.8" d="M26.6 24L23 47"/>',
  boots:
    '<path fill="var(--a-y3)" d="M39 6Q39 3 42 3H55Q58 3 58 6V41Q58 44 60 46.6L61 52.6Q61 57 57 57H25Q20 57 20 52Q20 45 27 43.6L37 42Q39 41.6 39 39Z"/>' +
    '<path fill="var(--a-y2)" d="M38.3 6Q38.3 3.2 41.1 3.2H53.3Q56.1 3.2 56.1 6V38.9Q56.1 41.7 58 44.2L58.9 49.8Q58.9 54 55.2 54H25.1Q20.4 54 20.4 49.3Q20.4 42.7 27 41.4L36.4 39.9Q38.3 39.5 38.3 37Z"/>' +
    '<path fill="var(--a-n3)" stroke="var(--a-n3)" stroke-width="1.4" d="M20.4 53H61V54Q61 57 57 57H25Q20.4 57 20.4 54Z"/>' +
    '<ellipse cx="48.6" cy="4.4" rx="8.6" ry="2" fill="var(--a-y3)"/>' +
    '<path fill="var(--a-y2)" d="M24 8Q24 5 27 5H40Q43 5 43 8V43Q43 46 45 48.6L46 54.6Q46 59 42 59H10Q5 59 5 54Q5 47 12 45.6L22 44Q24 43.6 24 41Z"/>' +
    '<path fill="var(--a-y)" d="M23.3 8Q23.3 5.2 26.1 5.2H38.3Q41.1 5.2 41.1 8V40.9Q41.1 43.7 43 46.2L43.9 51.8Q43.9 56 40.2 56H10.1Q5.4 56 5.4 51.3Q5.4 44.7 12 43.4L21.4 41.9Q23.3 41.5 23.3 39Z"/>' +
    '<path fill="var(--a-n3)" stroke="var(--a-n3)" stroke-width="1.4" d="M5.4 55H46V56Q46 59 42 59H10Q5.4 59 5.4 56Z"/>' +
    '<ellipse cx="33.6" cy="6.4" rx="8.6" ry="2" fill="var(--a-y3)"/>' +
    '<path fill="var(--a-y1)" opacity="0.9" d="M27 10H30V40Q30 42 28.6 43L27 44Z"/>' +
    '<ellipse cx="10.4" cy="49.6" rx="3" ry="1.4" fill="var(--a-y1)" opacity="0.9" transform="rotate(-14 10.4 49.6)"/>' +
    '<path fill="none" stroke="var(--a-y2)" stroke-width="1.6" d="M24.4 14H42.4"/>',
  dice:
    '<path fill="var(--a-r1)" stroke="var(--a-r1)" stroke-width="3" d="M32 6L56 16L32 26L8 16Z"/>' +
    '<path fill="var(--a-r)" stroke="var(--a-r)" stroke-width="3" d="M8 16L32 26V58L8 46Z"/>' +
    '<path fill="var(--a-r2)" stroke="var(--a-r2)" stroke-width="3" d="M32 26L56 16V46L32 58Z"/>' +
    '<ellipse cx="32" cy="16" rx="3.8" ry="2.2" fill="var(--a-w)"/>' +
    '<ellipse cx="14.6" cy="27.2" rx="2.6" ry="3.4" fill="var(--a-w)" transform="rotate(-22 14.6 27.2)"/>' +
    '<ellipse cx="25.4" cy="44.8" rx="2.6" ry="3.4" fill="var(--a-w)" transform="rotate(-22 25.4 44.8)"/>' +
    '<ellipse cx="38" cy="31" rx="2.6" ry="3.4" fill="var(--a-w2)" transform="rotate(22 38 31)"/>' +
    '<ellipse cx="44" cy="37" rx="2.6" ry="3.4" fill="var(--a-w2)" transform="rotate(22 44 37)"/>' +
    '<ellipse cx="50" cy="43" rx="2.6" ry="3.4" fill="var(--a-w2)" transform="rotate(22 50 43)"/>' +
    '<path fill="none" stroke="var(--a-w)" stroke-width="1.4" opacity="0.6" d="M11.6 16.2L30.6 8.4"/>' +
    '<path fill="none" stroke="var(--a-r1)" stroke-width="1.4" opacity="0.7" d="M9.6 20.4V42.6"/>',
  chair:
    '<rect x="33.6" y="30" width="3.6" height="22" rx="1.4" fill="var(--a-n3)"/>' +
    '<rect x="8.6" y="9" width="4.4" height="47" rx="1.6" fill="var(--a-n2)"/>' +
    '<rect x="8.6" y="9" width="2" height="47" rx="1" fill="var(--a-n)"/>' +
    '<rect x="33" y="5" width="4.4" height="27" rx="1.6" fill="var(--a-n2)"/>' +
    '<rect x="33" y="5" width="2" height="27" rx="1" fill="var(--a-n)"/>' +
    '<path fill="var(--a-n2)" stroke="var(--a-n2)" stroke-width="1.6" d="M10 9L35 5V10L10 14Z"/>' +
    '<path fill="var(--a-n)" stroke="var(--a-n)" stroke-width="1.6" d="M10 9L35 5V7.4L10 11.4Z"/>' +
    '<path fill="var(--a-n2)" stroke="var(--a-n2)" stroke-width="1.4" d="M10 20L35 16V19L10 23Z"/>' +
    '<rect x="23.6" y="41" width="4.4" height="20.6" rx="1.6" fill="var(--a-n2)"/>' +
    '<rect x="23.6" y="41" width="2" height="20.6" rx="1" fill="var(--a-n)"/>' +
    '<rect x="50" y="37" width="4.4" height="20" rx="1.6" fill="var(--a-n2)"/>' +
    '<rect x="50" y="37" width="2" height="20" rx="1" fill="var(--a-n)"/>' +
    '<path fill="var(--a-n2)" stroke="var(--a-n2)" stroke-width="1.6" d="M26 40L52 35V39.4L26 44.4Z"/>' +
    '<path fill="var(--a-n)" stroke="var(--a-n)" stroke-width="1.6" d="M9 34L26 40V44.4L9 38.4Z"/>' +
    '<path fill="var(--a-r2)" stroke="var(--a-r2)" stroke-width="2.4" d="M10 32.6L35 28.6L51 34.4L26 39Z"/>' +
    '<path fill="var(--a-r)" stroke="var(--a-r)" stroke-width="2" d="M10.6 31.6L34.6 27.8L49.4 33.2L25.6 37.4Z"/>' +
    '<path fill="none" stroke="var(--a-r1)" stroke-width="1.4" opacity="0.9" d="M13.6 31.6L33.6 28.6"/>',
  bear:
    '<circle cx="14" cy="16" r="8.4" fill="var(--a-n2)"/><circle cx="13.2" cy="15.2" r="7.4" fill="var(--a-n)"/>' +
    '<circle cx="14" cy="16" r="4" fill="var(--a-t)"/><circle cx="50" cy="16" r="8.4" fill="var(--a-n2)"/>' +
    '<circle cx="49.2" cy="15.2" r="7.4" fill="var(--a-n)"/><circle cx="50" cy="16" r="4" fill="var(--a-t)"/>' +
    '<ellipse cx="32" cy="35" rx="23" ry="21" fill="var(--a-n2)"/><ellipse cx="30.6" cy="33.6" rx="20.8" ry="19" fill="var(--a-n)"/>' +
    '<ellipse cx="21.4" cy="21.6" rx="5.6" ry="2.6" fill="var(--a-n1)" transform="rotate(-30 21.4 21.6)"/>' +
    '<ellipse cx="32" cy="43.4" rx="11.6" ry="8.8" fill="var(--a-t2)"/>' +
    '<ellipse cx="31.4" cy="42.8" rx="10.6" ry="7.8" fill="var(--a-t)"/>' +
    '<ellipse cx="27.6" cy="39.6" rx="3.6" ry="1.6" fill="var(--a-t1)" transform="rotate(-15 27.6 39.6)"/>' +
    '<ellipse cx="23.4" cy="30.4" rx="2.8" ry="3.3" fill="var(--a-k)"/><circle cx="22.5" cy="29.1" r="1.1" fill="var(--a-w)"/>' +
    '<ellipse cx="40.6" cy="30.4" rx="2.8" ry="3.3" fill="var(--a-k)"/><circle cx="39.7" cy="29.1" r="1.1" fill="var(--a-w)"/>' +
    '<path fill="var(--a-k)" d="M27.4 37.6Q32 35 36.6 37.6Q36.2 41.6 32 43Q27.8 41.6 27.4 37.6Z"/>' +
    '<ellipse cx="30.4" cy="37.6" rx="1.6" ry="0.9" fill="var(--a-w)" opacity="0.8" transform="rotate(-10 30.4 37.6)"/>' +
    '<path fill="none" stroke="var(--a-k)" stroke-width="2.2" d="M32 43V45.4M32 45.4Q29 48.6 26.4 46.4M32 45.4Q35 48.6 37.6 46.4"/>' +
    '<ellipse cx="16.6" cy="40.6" rx="3.2" ry="2" fill="var(--a-p)" opacity="0.55"/>' +
    '<ellipse cx="47.4" cy="40.6" rx="3.2" ry="2" fill="var(--a-p)" opacity="0.55"/>',
  dress:
    '<path fill="var(--a-p2)" d="M20.6 8.4Q13 9 11 14Q10 19.4 15.6 20.6L19.6 18.4Z"/>' +
    '<path fill="var(--a-p)" d="M20 9.4Q14 10 12.4 14Q11.6 18 15.6 19L19.4 17.4Z"/>' +
    '<path fill="var(--a-p2)" d="M43.4 8.4Q51 9 53 14Q54 19.4 48.4 20.6L44.4 18.4Z"/>' +
    '<path fill="var(--a-p2)" d="M24 6Q28 9 32 9Q36 9 40 6L44 8Q46 9 45.6 12L43 26Q42.6 29 44 31L55 52Q57 57 52 58.6Q42 61 32 61Q22 61 12 58.6Q7 57 9 52L20 31Q21.4 29 21 26L18.4 12Q18 9 20 8Z"/>' +
    '<path fill="var(--a-p)" d="M23.4 6.2Q27.1 9 30.9 9Q34.7 9 38.4 6.2L42.2 8.1Q44.1 9 43.7 11.8L41.2 25Q40.9 27.8 42.2 29.7L52.5 49.4Q54.4 54.1 49.7 55.6Q40.3 57.9 30.9 57.9Q21.5 57.9 12.1 55.6Q7.4 54.1 9.3 49.4L19.6 29.7Q20.9 27.8 20.6 25L18.1 11.8Q17.7 9 19.6 8.1Z"/>' +
    '<path fill="var(--a-p3)" d="M24 6Q28 11.6 32 11.6Q36 11.6 40 6Q36 8.4 32 8.4Q28 8.4 24 6Z"/>' +
    '<path fill="none" stroke="var(--a-p2)" stroke-width="1.6" d="M27 34L23 58.6M32 34V60.4M37 34L41 58.6"/>' +
    '<path fill="var(--a-w2)" d="M20.6 26.4Q32 29 43.4 26.4L43.6 31.6Q32 34.2 20.4 31.6Z"/>' +
    '<path fill="var(--a-w)" d="M20.6 26.4Q32 29 43.4 26.4V29.4Q32 32 20.6 29.4Z"/>' +
    '<path fill="var(--a-w2)" d="M32 30Q25 24 23.4 28Q22.4 33 32 31.4Q41.6 33 40.6 28Q39 24 32 30Z"/>' +
    '<circle cx="32" cy="30.4" r="2.2" fill="var(--a-w)"/><circle cx="18" cy="48" r="1.6" fill="var(--a-w)" opacity="0.8"/>' +
    '<circle cx="27.6" cy="44" r="1.6" fill="var(--a-w)" opacity="0.8"/>' +
    '<circle cx="37" cy="50" r="1.6" fill="var(--a-w)" opacity="0.8"/>' +
    '<circle cx="45.6" cy="46" r="1.6" fill="var(--a-w)" opacity="0.8"/>' +
    '<circle cx="24" cy="54.6" r="1.6" fill="var(--a-w)" opacity="0.8"/>' +
    '<circle cx="40.6" cy="40" r="1.6" fill="var(--a-w)" opacity="0.8"/>' +
    '<ellipse cx="25.4" cy="17" rx="2" ry="5.4" fill="var(--a-p1)" opacity="0.9" transform="rotate(12 25.4 17)"/>',
});
