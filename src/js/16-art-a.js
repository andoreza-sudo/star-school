/* ---------- object art set A: 40 pictures (P4-13, redrawn in P4-13b; DESIGN_SYSTEM.md section 6.5) ----------
   Each entry is the inner markup of a 64x64 drawing; picArt()/picFor() in 15-pics.js wrap it in the <svg>.
   Style: soft rounded shapes with volume. Each colour area has up to four tones from one hue: base, shade (lower right),
   highlight (upper left) and a deep accent for creases, holes and contact. Light always comes from the top left.
   Chunky proportions, no black outlines (white or cream objects get an edge in their own deep tone), faces only on
   animals, the sun and the star.
   Colour: every fill/stroke is var(--a-x), a palette role on .art in src/css/21-art.css that maps to an --ill-* token
   (r red, o orange, y yellow, g green, c aqua, b blue, v purple, p pink, n brown, t tan, s skin, m cream, e grey, w white,
   k ink; x1 highlight, x base, x2 shade, x3 deep). An element with no fill is ink (.art sets fill to --a-k).
   Only <path>, <circle>, <ellipse>, <rect>, self-closing; attributes fill, stroke, stroke-width, opacity, transform (rotate)
   and geometry. No ids, defs, gradients, masks, filters, text, style attributes or raw hex. Up to 2.5 KB each.
   To add a picture: add an entry, run `node tools/shots.js art` and look at tools/out/art-*.png; tools/test.js checks the rules. */
Object.assign(ART, {
  apple:
    '<path fill="var(--a-n2)" d="M30.5 21Q30 13 33.5 7.5L37 9Q33.5 14 34 21Z"/>' +
    '<path fill="var(--a-r2)" d="M32 21C25 15 11 18 11 35C11 47 20 57 27 57C30 57 31 56 32 56C33 56 34 57 37 57C44 57 53 47 53 35C53 18 39 15 32 21Z"/>' +
    '<path fill="var(--a-r)" d="M30.2 21.2C24 15.9 11.7 18.6 11.7 33.5C11.7 44.1 19.6 52.9 25.8 52.9C28.4 52.9 29.3 52 30.2 52C31.1 52 32 52.9 34.6 52.9C40.8 52.9 48.7 44.1 48.7 33.5C48.7 18.6 36.4 15.9 30.2 21.2Z"/>' +
    '<ellipse cx="20" cy="31" rx="3.6" ry="7.5" fill="var(--a-r1)" transform="rotate(22 20 31)"/>' +
    '<circle cx="21.8" cy="23.6" r="2.2" fill="var(--a-w)"/>' +
    '<path fill="var(--a-g)" d="M36 15C37.5 8 44.5 5 52 7C50.5 14.5 43 18 36 15Z"/>' +
    '<path fill="var(--a-g2)" d="M36 15C42 13.5 47 10.5 52 7C50.5 14.5 43 18 36 15Z"/>',
  banana:
    '<path fill="var(--a-y)" d="M12 12C8 36 22 56 48 51Q55 49.6 58.6 44Q57.6 39.4 52 40C36 42 25 33 22.6 13Z"/>' +
    '<path fill="var(--a-y2)" d="M12 12C8 36 22 56 48 51Q55 49.6 58.6 44Q52 47 46 47C26 47 15 33 15 12Z"/>' +
    '<path fill="var(--a-y1)" d="M21 16C22.4 29 31 37.6 46 41.4C32 42 23 34 21 16Z"/>' +
    '<path fill="var(--a-n)" d="M12.6 13L22 13.5L20.4 6.5Q17 5 13.8 6.4Z"/>' +
    '<path fill="var(--a-n3)" d="M13.8 6.4Q17 4.4 20.4 6.5L20.2 8Q17 7 13.9 8Z"/>' +
    '<ellipse cx="57" cy="43.5" rx="2.6" ry="2" fill="var(--a-n3)" transform="rotate(-30 57 43.5)"/>',
  cookie:
    '<path fill="var(--a-t2)" d="M56.4 24.1A26 26 0 1 1 40.9 8.6A5 5 0 0 0 45.5 15.5A5 5 0 0 0 51 20A5.5 5.5 0 0 0 56.4 24.1Z"/>' +
    '<path fill="var(--a-t)" d="M54.2 21.9A23.4 23.4 0 1 1 40.3 8A4.5 4.5 0 0 0 44.4 14.2A4.5 4.5 0 0 0 49.4 18.2A5 5 0 0 0 54.2 21.9Z"/>' +
    '<ellipse cx="18" cy="24" rx="5" ry="2.6" fill="var(--a-t1)" transform="rotate(-40 18 24)"/>' +
    '<circle cx="26" cy="18" r="1" fill="var(--a-t2)"/><circle cx="41" cy="28" r="1" fill="var(--a-t2)"/>' +
    '<circle cx="25" cy="45" r="1" fill="var(--a-t2)"/><circle cx="48" cy="44" r="1" fill="var(--a-t2)"/>' +
    '<circle cx="14" cy="35" r="1" fill="var(--a-t2)"/>' +
    '<path fill="var(--a-n3)" d="M17 28Q17 24.5 20 24.5Q23.5 25 23 28.5Q22.5 31.2 19.5 31Q17 31 17 28Z"/>' +
    '<circle cx="19" cy="26.6" r="1.1" fill="var(--a-n)"/>' +
    '<path fill="var(--a-n3)" d="M30 20Q30 16.5 33 16.5Q36.5 17 36 20.5Q35.5 23.2 32.5 23Q30 23 30 20Z"/>' +
    '<circle cx="32" cy="18.6" r="1.1" fill="var(--a-n)"/>' +
    '<path fill="var(--a-n3)" d="M28 36Q28 32.5 31 32.5Q34.5 33 34 36.5Q33.5 39.2 30.5 39Q28 39 28 36Z"/>' +
    '<circle cx="30" cy="34.6" r="1.1" fill="var(--a-n)"/>' +
    '<path fill="var(--a-n3)" d="M42 35Q42 31.5 45 31.5Q48.5 32 48 35.5Q47.5 38.2 44.5 38Q42 38 42 35Z"/>' +
    '<circle cx="44" cy="33.6" r="1.1" fill="var(--a-n)"/>' +
    '<path fill="var(--a-n3)" d="M18 45Q18 41.5 21 41.5Q24.5 42 24 45.5Q23.5 48.2 20.5 48Q18 48 18 45Z"/>' +
    '<circle cx="20" cy="43.6" r="1.1" fill="var(--a-n)"/>' +
    '<path fill="var(--a-n3)" d="M34 49Q34 45.5 37 45.5Q40.5 46 40 49.5Q39.5 52.2 36.5 52Q34 52 34 49Z"/>' +
    '<circle cx="36" cy="47.6" r="1.1" fill="var(--a-n)"/>',
  ball:
    '<circle cx="32" cy="33" r="26" fill="var(--a-y)"/><path fill="var(--a-r)" d="M32 7A26 26 0 0 0 32 59C18 46 18 20 32 7Z"/>' +
    '<path fill="var(--a-b)" d="M32 7A26 26 0 0 1 32 59C46 46 46 20 32 7Z"/>' +
    '<path fill="var(--a-k)" opacity="0.16" d="M47.1 11.9A26 26 0 1 1 10.9 48.1A26 26 0 0 0 47.1 11.9Z"/>' +
    '<ellipse cx="21" cy="20" rx="6" ry="3.4" fill="var(--a-w)" opacity="0.6" transform="rotate(-40 21 20)"/>' +
    '<circle cx="16.5" cy="26" r="1.8" fill="var(--a-w)" opacity="0.8"/>',
  star:
    '<path fill="var(--a-y2)" stroke="var(--a-y2)" stroke-width="6" d="M32 9L39.6 24.5L56.7 27L44.4 39L47.3 56L32 48L16.7 56L19.6 39L7.3 27L24.4 24.5Z"/>' +
    '<path fill="var(--a-y)" stroke="var(--a-y)" stroke-width="5" d="M30.9 9.8L37.7 23.8L53.1 26.1L42.1 36.9L44.7 52.2L30.9 45L17.1 52.2L19.7 36.9L8.7 26.1L24.1 23.8Z"/>' +
    '<ellipse cx="29.4" cy="19" rx="1.8" ry="5.5" fill="var(--a-y1)" transform="rotate(18 29.4 19)"/>' +
    '<ellipse cx="16" cy="28" rx="4" ry="1.6" fill="var(--a-y1)" transform="rotate(8 16 28)"/>' +
    '<ellipse cx="26.5" cy="35" rx="2.5" ry="3" fill="var(--a-k)"/><circle cx="25.8" cy="33.9" r="1" fill="var(--a-w)"/>' +
    '<ellipse cx="37.5" cy="35" rx="2.5" ry="3" fill="var(--a-k)"/><circle cx="36.8" cy="33.9" r="1" fill="var(--a-w)"/>' +
    '<path fill="none" stroke="var(--a-k)" stroke-width="2.4" d="M28.5 41Q32 44.5 35.5 41"/>' +
    '<ellipse cx="21.5" cy="40.5" rx="3" ry="2" fill="var(--a-p)" opacity="0.7"/>' +
    '<ellipse cx="42.5" cy="40.5" rx="3" ry="2" fill="var(--a-p)" opacity="0.7"/>',
  fish:
    '<path fill="var(--a-o)" d="M44 33Q52 22 58 19Q62 18 61 23Q59 28 59 33Q59 38 61 43Q62 48 58 47Q52 44 44 33Z"/>' +
    '<path fill="var(--a-o2)" d="M44 33H59Q59 38 61 43Q62 48 58 47Q52 44 44 33Z"/>' +
    '<path fill="var(--a-o2)" d="M18 22Q27 9 40 16Q42 20 38 23Z"/><ellipse cx="29" cy="34" rx="22" ry="16" fill="var(--a-o2)"/>' +
    '<ellipse cx="27" cy="32.6" rx="19.4" ry="14.1" fill="var(--a-o)"/>' +
    '<path fill="var(--a-y1)" d="M9 37Q26 50 47 39Q43 48 30 50Q15 50 9 37Z"/>' +
    '<ellipse cx="25" cy="23.5" rx="7" ry="2.6" fill="var(--a-o1)" transform="rotate(-12 25 23.5)"/>' +
    '<path fill="none" stroke="var(--a-o2)" stroke-width="2.6" d="M22 24Q27 34 22 44"/>' +
    '<path fill="var(--a-o2)" d="M29 37Q37 34 40 40Q36 46 30 45Q26 41 29 37Z"/><circle cx="15.5" cy="30" r="5.5" fill="var(--a-w)"/>' +
    '<ellipse cx="14.6" cy="30.6" rx="3" ry="3.6" fill="var(--a-k)"/><circle cx="13.7" cy="29.2" r="1.2" fill="var(--a-w)"/>' +
    '<path fill="none" stroke="var(--a-k)" stroke-width="1.8" d="M8.6 37.8Q10 38.8 11.4 38.3"/>',
  duck:
    '<path fill="var(--a-y2)" d="M14 40Q14 30 26 31L38 31Q46 31 50 25Q54 21 57 25Q60 33 57 42Q52 54 34 54Q14 54 14 40Z"/>' +
    '<path fill="var(--a-y)" d="M14.6 38.3Q14.6 29.1 25.7 30L36.7 30Q44.1 30 47.8 24.5Q51.4 20.8 54.2 24.5Q57 31.9 54.2 40.1Q49.6 51.2 33 51.2Q14.6 51.2 14.6 38.3Z"/>' +
    '<path fill="var(--a-y2)" d="M27 38Q36 33 46 37Q50 42 44 47Q36 50 30 45Q25 41 27 38Z"/>' +
    '<path fill="var(--a-y1)" d="M29 38.5Q36 35 44 37.5Q36 37 29 38.5Z"/><circle cx="24" cy="20" r="12" fill="var(--a-y2)"/>' +
    '<circle cx="22.9" cy="18.9" r="10.6" fill="var(--a-y)"/>' +
    '<ellipse cx="19" cy="13.5" rx="4" ry="2.4" fill="var(--a-y1)" transform="rotate(-30 19 13.5)"/>' +
    '<path fill="var(--a-o)" d="M13 17.5Q4 16.5 2.5 21Q4 25.5 13 24.5Z"/>' +
    '<path fill="var(--a-o2)" d="M13 22Q7 22.5 3 22.5Q5 25.5 13 25Z"/><ellipse cx="22" cy="17" rx="2.4" ry="2.9" fill="var(--a-k)"/>' +
    '<circle cx="21.3" cy="15.9" r="1" fill="var(--a-w)"/><ellipse cx="27" cy="23" rx="3" ry="2" fill="var(--a-p)" opacity="0.55"/>' +
    '<path fill="var(--a-c)" d="M2 53Q8 49 14 53T26 53T38 53T50 53T62 53V60Q62 62 60 62H4Q2 62 2 60Z"/>' +
    '<path fill="none" stroke="var(--a-c1)" stroke-width="2.2" d="M8 57.5H16M30 57.5H44"/>',
  car:
    '<path fill="var(--a-r2)" d="M4 42V36Q4 31 9 30L16 29L23 18Q25 15.5 29 15.5H41Q45 15.5 47 18L53 29L56 29.5Q61 31 61 36V42Q61 47 56 47H9Q4 47 4 42Z"/>' +
    '<path fill="var(--a-r)" d="M4.5 40.4V34.6Q4.5 29.8 9.3 28.9L16.1 27.9L22.8 17.3Q24.7 14.9 28.5 14.9H40.1Q43.9 14.9 45.8 17.3L51.6 27.9L54.5 28.4Q59.3 29.8 59.3 34.6V40.4Q59.3 45.2 54.5 45.2H9.3Q4.5 45.2 4.5 40.4Z"/>' +
    '<path fill="var(--a-r2)" d="M4 40H61V42Q61 47 56 47H9Q4 47 4 42Z"/>' +
    '<path fill="var(--a-r1)" d="M25.5 18.3Q27 17.2 29 17.2H41Q43 17.2 44.5 18.3Z"/>' +
    '<rect x="8" y="31.3" width="44" height="2.4" rx="1.2" fill="var(--a-r1)"/>' +
    '<path fill="var(--a-c1)" d="M19.5 29L25.5 19.5Q26.5 18.5 28 18.5H31.5V29Z"/>' +
    '<path fill="var(--a-c1)" d="M35 18.5H40.5Q42.5 18.5 43.5 20L49.5 29H35Z"/>' +
    '<path fill="var(--a-w)" opacity="0.85" d="M24 23.5L27.4 19.2H30L25.4 26Z"/>' +
    '<path fill="var(--a-w)" opacity="0.6" d="M38 19.2H40.6L37 25H34.4Z"/>' +
    '<path fill="none" stroke="var(--a-r2)" stroke-width="1.6" d="M33.2 30.5V40"/>' +
    '<rect x="36" y="33" width="4" height="1.8" rx="0.9" fill="var(--a-r3)"/><circle cx="17" cy="47" r="10.5" fill="var(--a-r3)"/>' +
    '<circle cx="48" cy="47" r="10.5" fill="var(--a-r3)"/><circle cx="17" cy="47" r="8.5" fill="var(--a-k2)"/>' +
    '<circle cx="17" cy="47" r="4" fill="var(--a-e)"/><circle cx="15.7" cy="45.7" r="1.4" fill="var(--a-w)"/>' +
    '<circle cx="48" cy="47" r="8.5" fill="var(--a-k2)"/><circle cx="48" cy="47" r="4" fill="var(--a-e)"/>' +
    '<circle cx="46.7" cy="45.7" r="1.4" fill="var(--a-w)"/><ellipse cx="58.6" cy="35" rx="2" ry="2.8" fill="var(--a-y)"/>' +
    '<rect x="55" y="41" width="7" height="3" rx="1.5" fill="var(--a-e)"/>',
  flower:
    '<path fill="none" stroke="var(--a-g2)" stroke-width="4.4" d="M32 38Q30.5 50 32 61"/>' +
    '<path fill="none" stroke="var(--a-g)" stroke-width="2.4" d="M31.3 40Q30 50 31.3 60"/>' +
    '<path fill="var(--a-g)" d="M31 53Q21 55 14 46Q24 41 31 50Z"/><path fill="var(--a-g2)" d="M31 53Q21 55 14 46Q24 49 31 50Z"/>' +
    '<path fill="var(--a-g)" d="M33 47Q43 47 49 38Q38 35 33 44Z"/><path fill="var(--a-g2)" d="M33 47Q43 47 49 38Q41 43 33 44Z"/>' +
    '<circle cx="39.1" cy="34.9" r="9.4" fill="var(--a-p3)"/><circle cx="38.7" cy="34.5" r="8.8" fill="var(--a-p2)"/>' +
    '<circle cx="37.8" cy="33.6" r="7.6" fill="var(--a-p)"/><circle cx="24.9" cy="34.9" r="9.4" fill="var(--a-p3)"/>' +
    '<circle cx="24.5" cy="34.5" r="8.8" fill="var(--a-p2)"/><circle cx="23.6" cy="33.6" r="7.6" fill="var(--a-p)"/>' +
    '<circle cx="20.5" cy="21.3" r="9.4" fill="var(--a-p3)"/><circle cx="20.1" cy="20.9" r="8.8" fill="var(--a-p2)"/>' +
    '<circle cx="19.2" cy="20" r="7.6" fill="var(--a-p)"/><circle cx="43.5" cy="21.3" r="9.4" fill="var(--a-p3)"/>' +
    '<circle cx="43.1" cy="20.9" r="8.8" fill="var(--a-p2)"/><circle cx="42.2" cy="20" r="7.6" fill="var(--a-p)"/>' +
    '<circle cx="32" cy="13" r="9.4" fill="var(--a-p3)"/><circle cx="31.6" cy="12.6" r="8.8" fill="var(--a-p2)"/>' +
    '<circle cx="30.7" cy="11.7" r="7.6" fill="var(--a-p)"/>' +
    '<ellipse cx="29.5" cy="9.4" rx="3.4" ry="1.8" fill="var(--a-p1)" transform="rotate(-20 29.5 9.4)"/>' +
    '<ellipse cx="16.7" cy="18.5" rx="1.8" ry="3.2" fill="var(--a-p1)" transform="rotate(20 16.7 18.5)"/>' +
    '<circle cx="32" cy="25" r="7.6" fill="var(--a-y2)"/><circle cx="31.2" cy="24.2" r="6.5" fill="var(--a-y)"/>' +
    '<circle cx="30" cy="27" r="1" fill="var(--a-y3)" opacity="0.6"/><circle cx="34" cy="26" r="1" fill="var(--a-y3)" opacity="0.6"/>' +
    '<circle cx="32" cy="29.5" r="1" fill="var(--a-y3)" opacity="0.6"/>' +
    '<ellipse cx="29.3" cy="21.8" rx="2.6" ry="1.5" fill="var(--a-y1)" transform="rotate(-30 29.3 21.8)"/>',
  cat:
    '<path fill="var(--a-e2)" d="M10 31Q7 14 11 8Q13 6 16 8L29 18Z"/>' +
    '<path fill="var(--a-e2)" d="M54 31Q57 14 53 8Q51 6 48 8L35 18Z"/>' +
    '<path fill="var(--a-e)" d="M11.5 29Q9.5 15 12.2 9.6Q13.6 8.4 15.4 9.6L27 18Z"/>' +
    '<path fill="var(--a-e)" d="M52.5 29Q54.5 15 51.8 9.6Q50.4 8.4 48.6 9.6L37 18Z"/>' +
    '<path fill="var(--a-p)" d="M14 24.5Q13.2 16 14.4 12.8L22.5 19Z"/>' +
    '<path fill="var(--a-p)" d="M50 24.5Q50.8 16 49.6 12.8L41.5 19Z"/><ellipse cx="32" cy="37" rx="24" ry="20" fill="var(--a-e2)"/>' +
    '<ellipse cx="30.2" cy="35.5" rx="21.6" ry="18" fill="var(--a-e)"/>' +
    '<ellipse cx="19.5" cy="26.5" rx="6" ry="3" fill="var(--a-e1)" transform="rotate(-28 19.5 26.5)"/>' +
    '<path fill="none" stroke="var(--a-e2)" stroke-width="2.6" d="M32 17.6V23.5M26 18.6L27.4 23M38 18.6L36.6 23"/>' +
    '<ellipse cx="32" cy="46" rx="11.5" ry="7.5" fill="var(--a-w)"/><ellipse cx="23.5" cy="35" rx="3.3" ry="4.2" fill="var(--a-k)"/>' +
    '<circle cx="22.5" cy="33.4" r="1.3" fill="var(--a-w)"/><ellipse cx="40.5" cy="35" rx="3.3" ry="4.2" fill="var(--a-k)"/>' +
    '<circle cx="39.5" cy="33.4" r="1.3" fill="var(--a-w)"/>' +
    '<ellipse cx="16.5" cy="42.5" rx="3.4" ry="2.2" fill="var(--a-p)" opacity="0.6"/>' +
    '<ellipse cx="47.5" cy="42.5" rx="3.4" ry="2.2" fill="var(--a-p)" opacity="0.6"/>' +
    '<path fill="var(--a-p2)" d="M28.6 40.4H35.4Q35.4 43.2 32 44.6Q28.6 43.2 28.6 40.4Z"/>' +
    '<path fill="none" stroke="var(--a-k)" stroke-width="2" d="M32 44.6V46.4M32 46.4Q29.4 49.6 26.8 47.4M32 46.4Q34.6 49.6 37.2 47.4"/>' +
    '<path fill="none" stroke="var(--a-e3)" stroke-width="1.6" d="M18 44L4 42M18 48L5 51.5M46 44L60 42M46 48L59 51.5"/>',
  dog:
    '<path fill="var(--a-t2)" d="M32 13C44 13 51 22 51 33C51 46 43 55 32 55C21 55 13 46 13 33C13 22 20 13 32 13Z"/>' +
    '<path fill="var(--a-t)" d="M31 13.3C42.2 13.3 48.7 21.6 48.7 31.9C48.7 44 41.2 52.3 31 52.3C20.8 52.3 13.3 44 13.3 31.9C13.3 21.6 19.8 13.3 31 13.3Z"/>' +
    '<ellipse cx="23.5" cy="19.5" rx="6" ry="2.6" fill="var(--a-t1)" transform="rotate(-22 23.5 19.5)"/>' +
    '<ellipse cx="41.5" cy="28.5" rx="6.5" ry="7.5" fill="var(--a-n1)" transform="rotate(15 41.5 28.5)"/>' +
    '<path fill="var(--a-n2)" d="M19 16Q8 13 4.5 24Q2.5 36 8.5 43.5Q14 46 16.5 38Q18.5 30 23 19Z"/>' +
    '<path fill="var(--a-n)" d="M17.6 16.6Q7.7 13.9 4.5 23.8Q2.7 34.6 8.1 41.3Q13.1 43.6 15.3 36.4Q17.1 29.2 21.2 19.2Z"/>' +
    '<path fill="var(--a-n2)" d="M45 16Q56 13 59.5 24Q61.5 36 55.5 43.5Q50 46 47.5 38Q45.5 30 41 19Z"/>' +
    '<path fill="var(--a-n)" d="M44.8 16.6Q54.7 13.9 57.9 23.8Q59.7 34.6 54.3 41.3Q49.3 43.6 47.1 36.4Q45.3 29.2 41.2 19.2Z"/>' +
    '<ellipse cx="32" cy="43.5" rx="11.5" ry="8.5" fill="var(--a-m2)"/>' +
    '<ellipse cx="31.3" cy="43" rx="10.6" ry="7.8" fill="var(--a-m)"/><ellipse cx="24" cy="29.5" rx="3" ry="3.6" fill="var(--a-k)"/>' +
    '<circle cx="23.1" cy="28.1" r="1.2" fill="var(--a-w)"/><ellipse cx="40" cy="29.5" rx="3" ry="3.6" fill="var(--a-k)"/>' +
    '<circle cx="39.1" cy="28.1" r="1.2" fill="var(--a-w)"/>' +
    '<ellipse cx="18.5" cy="39" rx="3.2" ry="2" fill="var(--a-p)" opacity="0.55"/>' +
    '<ellipse cx="45.5" cy="39" rx="3.2" ry="2" fill="var(--a-p)" opacity="0.55"/>' +
    '<path fill="var(--a-p2)" d="M29.4 46.5H34.6V50Q34.6 53.6 32 53.6Q29.4 53.6 29.4 50Z"/>' +
    '<path fill="none" stroke="var(--a-p3)" stroke-width="1.2" d="M32 47.5V51"/>' +
    '<path fill="none" stroke="var(--a-k)" stroke-width="2.2" d="M32 41.6V44.4M32 44.4Q29 48 26 45.5M32 44.4Q35 48 38 45.5"/>' +
    '<path fill="var(--a-k)" d="M27.4 37Q32 34.4 36.6 37Q36.6 40.6 32 42Q27.4 40.6 27.4 37Z"/>' +
    '<ellipse cx="30.4" cy="37.2" rx="1.7" ry="0.9" fill="var(--a-w)" opacity="0.8" transform="rotate(-10 30.4 37.2)"/>',
  pig:
    '<path fill="var(--a-p2)" d="M11 22Q8 10 10.5 7Q20 8 27 16Z"/><path fill="var(--a-p2)" d="M53 22Q56 10 53.5 7Q44 8 37 16Z"/>' +
    '<ellipse cx="32" cy="36" rx="24" ry="21" fill="var(--a-p2)"/>' +
    '<ellipse cx="30.2" cy="34.4" rx="21.6" ry="18.9" fill="var(--a-p)"/>' +
    '<ellipse cx="20" cy="22.5" rx="6.5" ry="3" fill="var(--a-p1)" transform="rotate(-28 20 22.5)"/>' +
    '<path fill="var(--a-p2)" d="M12.5 17Q12 10.5 14 9.5Q20 12 24.5 19Q19 25 12.5 17Z"/>' +
    '<path fill="var(--a-p2)" d="M51.5 17Q52 10.5 50 9.5Q44 12 39.5 19Q45 25 51.5 17Z"/>' +
    '<path fill="var(--a-p3)" d="M14.5 16.5Q14.5 13 15.6 12.2Q19 14 21.5 18.5Q18 21 14.5 16.5Z"/>' +
    '<path fill="var(--a-p3)" d="M49.5 16.5Q49.5 13 48.4 12.2Q45 14 42.5 18.5Q46 21 49.5 16.5Z"/>' +
    '<ellipse cx="32.6" cy="42.6" rx="11" ry="8" fill="var(--a-p2)"/>' +
    '<ellipse cx="31.8" cy="41.8" rx="10.2" ry="7.2" fill="var(--a-p1)"/>' +
    '<ellipse cx="28.2" cy="42.2" rx="2.1" ry="3.1" fill="var(--a-p3)"/>' +
    '<ellipse cx="35.8" cy="42.2" rx="2.1" ry="3.1" fill="var(--a-p3)"/>' +
    '<ellipse cx="22.5" cy="31" rx="2.8" ry="3.4" fill="var(--a-k)"/><circle cx="21.7" cy="29.7" r="1.1" fill="var(--a-w)"/>' +
    '<ellipse cx="41.5" cy="31" rx="2.8" ry="3.4" fill="var(--a-k)"/><circle cx="40.7" cy="29.7" r="1.1" fill="var(--a-w)"/>' +
    '<ellipse cx="14.5" cy="41" rx="3.4" ry="2.2" fill="var(--a-p2)"/>' +
    '<ellipse cx="49.5" cy="41" rx="3.4" ry="2.2" fill="var(--a-p2)"/>' +
    '<path fill="none" stroke="var(--a-p3)" stroke-width="2" d="M27.5 51.6Q32 54 36.5 51.6"/>',
  sun:
    '<path fill="var(--a-y2)" stroke="var(--a-y2)" stroke-width="3.4" d="M28.4 16.4L32 2L35.6 16.4ZM40.5 18.4L50.7 13.3L45.6 23.5ZM47.6 28.4L62 32L47.6 35.6ZM45.6 40.5L50.7 50.7L40.5 45.6ZM35.6 47.6L32 62L28.4 47.6ZM23.5 45.6L13.3 50.7L18.4 40.5ZM16.4 35.6L2 32L16.4 28.4ZM18.4 23.5L13.3 13.3L23.5 18.4Z"/>' +
    '<circle cx="32" cy="32" r="18.5" fill="var(--a-y2)"/><circle cx="30.3" cy="30.3" r="16.3" fill="var(--a-y)"/>' +
    '<ellipse cx="24.5" cy="22.5" rx="5" ry="2.4" fill="var(--a-y1)" transform="rotate(-35 24.5 22.5)"/>' +
    '<ellipse cx="26.5" cy="31" rx="2.5" ry="3" fill="var(--a-k)"/><circle cx="25.8" cy="29.9" r="1" fill="var(--a-w)"/>' +
    '<ellipse cx="37.5" cy="31" rx="2.5" ry="3" fill="var(--a-k)"/><circle cx="36.8" cy="29.9" r="1" fill="var(--a-w)"/>' +
    '<path fill="none" stroke="var(--a-k)" stroke-width="2.4" d="M27 37.5Q32 42 37 37.5"/>' +
    '<ellipse cx="21.5" cy="36.5" rx="3" ry="2" fill="var(--a-o1)" opacity="0.8"/>' +
    '<ellipse cx="42.5" cy="36.5" rx="3" ry="2" fill="var(--a-o1)" opacity="0.8"/>',
  bus:
    '<path fill="var(--a-y2)" d="M12 10H55Q61 10 61 16V44Q61 49 56 49H8Q3 49 3 44V33Q3 29 6.5 28L8 27.5V14Q8 10 12 10Z"/>' +
    '<path fill="var(--a-y)" d="M12.1 9.6H53.8Q59.6 9.6 59.6 15.4V42.6Q59.6 47.4 54.8 47.4H8.2Q3.4 47.4 3.4 42.6V31.9Q3.4 28 6.8 27L8.2 26.6V13.5Q8.2 9.6 12.1 9.6Z"/>' +
    '<path fill="var(--a-y2)" d="M3 41H61V44Q61 49 56 49H8Q3 49 3 44Z"/>' +
    '<rect x="12" y="12" width="43" height="2.2" rx="1.1" fill="var(--a-y1)"/>' +
    '<rect x="3" y="37.4" width="58" height="2.6" fill="var(--a-k2)"/>' +
    '<path fill="var(--a-c1)" d="M8.4 16Q8.4 14.5 10 14.5H15.2V26.5H8.4Z"/>' +
    '<rect x="19" y="14.5" width="8.4" height="11" rx="2" fill="var(--a-c1)"/>' +
    '<path fill="var(--a-w)" opacity="0.7" d="M20.6 22L24.2 15.6H26.4L21.6 23.6Z"/>' +
    '<rect x="30" y="14.5" width="8.4" height="11" rx="2" fill="var(--a-c1)"/>' +
    '<path fill="var(--a-w)" opacity="0.7" d="M31.6 22L35.2 15.6H37.4L32.6 23.6Z"/>' +
    '<rect x="41" y="14.5" width="8.4" height="11" rx="2" fill="var(--a-c1)"/>' +
    '<path fill="var(--a-w)" opacity="0.7" d="M42.6 22L46.2 15.6H48.4L43.6 23.6Z"/>' +
    '<rect x="52" y="14.5" width="6" height="11" rx="2" fill="var(--a-c1)"/>' +
    '<rect x="17.6" y="29" width="1.8" height="7" rx="0.9" fill="var(--a-y2)"/><circle cx="17" cy="49" r="9" fill="var(--a-y3)"/>' +
    '<circle cx="17" cy="49" r="7.4" fill="var(--a-k2)"/><circle cx="17" cy="49" r="3.4" fill="var(--a-e)"/>' +
    '<circle cx="15.9" cy="47.9" r="1.2" fill="var(--a-w)"/><circle cx="48" cy="49" r="9" fill="var(--a-y3)"/>' +
    '<circle cx="48" cy="49" r="7.4" fill="var(--a-k2)"/><circle cx="48" cy="49" r="3.4" fill="var(--a-e)"/>' +
    '<circle cx="46.9" cy="47.9" r="1.2" fill="var(--a-w)"/><circle cx="5.3" cy="33" r="2.2" fill="var(--a-w)"/>' +
    '<rect x="58.4" y="29" width="2.6" height="6" rx="1.3" fill="var(--a-r)"/>' +
    '<rect x="1.6" y="42" width="6" height="3" rx="1.5" fill="var(--a-e)"/>',
  hat:
    '<ellipse cx="32" cy="46" rx="28.5" ry="10" fill="var(--a-t2)"/>' +
    '<ellipse cx="30.5" cy="45.5" rx="26.5" ry="9.3" fill="var(--a-t)"/>' +
    '<ellipse cx="14.5" cy="45" rx="7" ry="2.6" fill="var(--a-t1)" transform="rotate(-8 14.5 45)"/>' +
    '<path fill="var(--a-t2)" d="M15.6 46C14 30 18 15.6 32 15.6C46 15.6 50 30 48.4 46Q32 51 15.6 46Z"/>' +
    '<path fill="var(--a-t)" d="M15.8 44.2C14.3 29.2 18 15.7 31.2 15.7C44.4 15.7 48.1 29.2 46.6 44.2Q31.2 48.9 15.8 44.2Z"/>' +
    '<ellipse cx="22" cy="25" rx="3" ry="6" fill="var(--a-t1)" transform="rotate(25 22 25)"/>' +
    '<path fill="var(--a-r)" d="M14.8 37Q32 42.4 49.2 37L49 44.5Q32 50 15 44.5Z"/>' +
    '<path fill="var(--a-r2)" d="M15 42Q32 47.6 49 42L49 44.5Q32 50 15 44.5Z"/>' +
    '<path fill="var(--a-r1)" opacity="0.8" d="M16 38.3Q32 43.4 48 38.3V39.6Q32 44.8 16 39.6Z"/>' +
    '<path fill="var(--a-r)" d="M19 40Q12 34 10 40Q11 46 19 43Z"/><path fill="var(--a-r2)" d="M19 41Q13 47 13 51Q18 50 20 43Z"/>' +
    '<circle cx="19.6" cy="41.6" r="2.8" fill="var(--a-r2)"/>',
  bed:
    '<rect x="7" y="52" width="4.5" height="7" rx="1.5" fill="var(--a-n3)"/>' +
    '<rect x="52.5" y="52" width="4.5" height="7" rx="1.5" fill="var(--a-n3)"/>' +
    '<path fill="var(--a-n2)" d="M4 54V18Q4 11 9.5 11Q15 11 15 18V54Z"/>' +
    '<path fill="var(--a-n)" d="M4.2 50.4V19.4Q4.2 13.4 8.9 13.4Q13.6 13.4 13.6 19.4V50.4Z"/>' +
    '<rect x="12" y="42" width="42" height="9" fill="var(--a-n2)"/><rect x="12" y="42" width="42" height="2.4" fill="var(--a-n1)"/>' +
    '<rect x="12" y="30" width="41" height="12" rx="3" fill="var(--a-w2)"/>' +
    '<rect x="12" y="29" width="40" height="11.5" rx="3" fill="var(--a-w)"/>' +
    '<ellipse cx="22" cy="27.5" rx="8.6" ry="5.4" fill="var(--a-w2)"/>' +
    '<ellipse cx="21.4" cy="27.1" rx="7.7" ry="4.9" fill="var(--a-w)"/>' +
    '<path fill="none" stroke="var(--a-w3)" stroke-width="1.4" d="M15 25.5Q22 22.5 29 25.5"/>' +
    '<path fill="var(--a-b2)" d="M28 32Q28 27.5 32 27.5H53Q57 27.5 57 31.5V44Q57 47 54 47H31Q28 47 28 44Z"/>' +
    '<path fill="var(--a-b)" d="M28 31.5Q28 27.5 32 27.5H52.5Q56 27.5 56 31V42.5Q56 45 53 45H31Q28 45 28 42Z"/>' +
    '<rect x="28" y="27.5" width="5.5" height="17.5" rx="2" fill="var(--a-w)"/>' +
    '<rect x="36" y="30" width="17" height="2.2" rx="1.1" fill="var(--a-b1)"/>' +
    '<path fill="none" stroke="var(--a-b2)" stroke-width="1.6" d="M40 36Q44 38 48 36"/>' +
    '<path fill="var(--a-n2)" d="M50 54V28Q50 23 55 23Q60 23 60 28V54Z"/>' +
    '<path fill="var(--a-n)" d="M50.2 50.9V29.1Q50.2 24.9 54.4 24.9Q58.6 24.9 58.6 29.1V50.9Z"/>' +
    '<ellipse cx="7.5" cy="18" rx="1.4" ry="4" fill="var(--a-n1)"/><ellipse cx="53.4" cy="29" rx="1.3" ry="3.2" fill="var(--a-n1)"/>',
  cup:
    '<ellipse cx="32" cy="52.6" rx="27" ry="7.4" fill="var(--a-w3)"/><ellipse cx="32" cy="52" rx="26" ry="6.6" fill="var(--a-w2)"/>' +
    '<ellipse cx="31.4" cy="51.2" rx="24.6" ry="5.6" fill="var(--a-w)"/>' +
    '<ellipse cx="32" cy="51.4" rx="13" ry="2.6" fill="var(--a-w2)"/>' +
    '<path fill="none" stroke="var(--a-b2)" stroke-width="4.6" d="M47.5 27.5Q59.5 25.5 57.5 35Q55.5 42.5 46 42"/>' +
    '<path fill="var(--a-b2)" d="M12.5 22H51.5L48.5 43Q46.5 52 38 52H26Q17.5 52 15.5 43Z"/>' +
    '<path fill="var(--a-b)" d="M12.8 22.4H49L46.2 42Q44.4 50.4 36.5 50.4H25.3Q17.4 50.4 15.5 42Z"/>' +
    '<ellipse cx="32" cy="22" rx="19.5" ry="4.8" fill="var(--a-b1)"/><ellipse cx="32" cy="22.6" rx="17" ry="3.6" fill="var(--a-n2)"/>' +
    '<ellipse cx="31" cy="22.2" rx="13" ry="2.4" fill="var(--a-n)"/>' +
    '<path fill="var(--a-w)" d="M32 43Q24 37.5 25 33.5Q26.5 30 30 31.5Q31.4 32.2 32 33.6Q32.6 32.2 34 31.5Q37.5 30 39 33.5Q40 37.5 32 43Z"/>' +
    '<ellipse cx="18.5" cy="31" rx="1.8" ry="6" fill="var(--a-b1)" transform="rotate(-10 18.5 31)"/>',
  fox:
    '<path fill="var(--a-o2)" d="M9 31L9.6 7Q10.5 3.4 14 5L29 17Z"/><path fill="var(--a-o2)" d="M55 31L54.4 7Q53.5 3.4 50 5L35 17Z"/>' +
    '<path fill="var(--a-n3)" d="M9.6 7Q10.5 3.4 14 5L19 8.6L9.5 15Z"/>' +
    '<path fill="var(--a-n3)" d="M54.4 7Q53.5 3.4 50 5L45 8.6L54.5 15Z"/><path fill="var(--a-m)" d="M12 25L12.6 15L22 18Z"/>' +
    '<path fill="var(--a-m)" d="M52 25L51.4 15L42 18Z"/>' +
    '<path fill="var(--a-o2)" d="M32 56Q26 56 20 49L9 34Q5 27 10 22Q20 14 32 14Q44 14 54 22Q59 27 55 34L44 49Q38 56 32 56Z"/>' +
    '<path fill="var(--a-o)" d="M31 53.3Q25.4 53.3 19.8 46.8L9.6 32.9Q5.9 26.4 10.5 21.7Q19.8 14.3 31 14.3Q42.2 14.3 51.5 21.7Q56.1 26.4 52.4 32.9L42.2 46.8Q36.6 53.3 31 53.3Z"/>' +
    '<ellipse cx="22" cy="21.5" rx="6" ry="2.6" fill="var(--a-o1)" transform="rotate(-20 22 21.5)"/>' +
    '<path fill="var(--a-w2)" d="M8.6 30Q14 37 22 36.5Q29 37 32 43Q35 37 42 36.5Q50 37 55.4 30Q56 32 54 35L44 49Q38 56 32 56Q26 56 20 49L10 35Q8 32 8.6 30Z"/>' +
    '<path fill="var(--a-w)" d="M9.2 29.7Q14.3 36.3 21.9 35.8Q28.6 36.3 31.4 42Q34.3 36.3 40.9 35.8Q48.5 36.3 53.6 29.7Q54.2 31.6 52.3 34.4L42.8 47.7Q37.1 54.4 31.4 54.4Q25.7 54.4 20 47.7L10.5 34.4Q8.6 31.6 9.2 29.7Z"/>' +
    '<ellipse cx="23" cy="31" rx="2.8" ry="3.4" fill="var(--a-k)"/><circle cx="22.2" cy="29.7" r="1.1" fill="var(--a-w)"/>' +
    '<ellipse cx="41" cy="31" rx="2.8" ry="3.4" fill="var(--a-k)"/><circle cx="40.2" cy="29.7" r="1.1" fill="var(--a-w)"/>' +
    '<ellipse cx="32" cy="50.6" rx="3.6" ry="2.7" fill="var(--a-k)"/>' +
    '<ellipse cx="30.8" cy="49.7" rx="1.3" ry="0.7" fill="var(--a-w)" opacity="0.8"/>' +
    '<path fill="none" stroke="var(--a-k)" stroke-width="1.8" d="M32 53.2V54.8"/>',
  bat:
    '<path fill="var(--a-v2)" d="M25 30Q15 17 2 21Q6 27.5 5 34Q10 32 13 37Q17 34 21 40Q23 36 27 38Z"/>' +
    '<path fill="var(--a-v)" d="M23.6 28.7Q14.4 16.7 2.4 20.4Q6.1 26.4 5.2 32.4Q9.8 30.5 12.5 35.1Q16.2 32.4 19.9 37.9Q21.7 34.2 25.4 36Z"/>' +
    '<path fill="var(--a-v2)" d="M39 30Q49 17 62 21Q58 27.5 59 34Q54 32 51 37Q47 34 43 40Q41 36 37 38Z"/>' +
    '<path fill="var(--a-v)" d="M39.2 28.7Q48.4 16.7 60.4 20.4Q56.7 26.4 57.6 32.4Q53 30.5 50.3 35.1Q46.6 32.4 42.9 37.9Q41.1 34.2 37.4 36Z"/>' +
    '<path fill="none" stroke="var(--a-v3)" stroke-width="1.6" d="M24 30L9 26M23 31L15 33M23.6 32.6L20 37M40 30L55 26M41 31L49 33M40.4 32.6L44 37"/>' +
    '<path fill="var(--a-v2)" d="M22.5 26L23.5 12.5L30 21Z"/><path fill="var(--a-v2)" d="M41.5 26L40.5 12.5L34 21Z"/>' +
    '<path fill="var(--a-v1)" d="M24 22L24.6 16.5L27.4 20.4Z"/><path fill="var(--a-v1)" d="M40 22L39.4 16.5L36.6 20.4Z"/>' +
    '<ellipse cx="32" cy="34" rx="12" ry="15" fill="var(--a-v2)"/>' +
    '<ellipse cx="31.1" cy="32.9" rx="10.8" ry="13.5" fill="var(--a-v)"/>' +
    '<ellipse cx="32" cy="41.5" rx="6.6" ry="7" fill="var(--a-v1)"/>' +
    '<ellipse cx="26.5" cy="24" rx="3.6" ry="1.8" fill="var(--a-v1)" transform="rotate(-30 26.5 24)"/>' +
    '<ellipse cx="27.4" cy="30" rx="2.5" ry="3" fill="var(--a-k)"/><circle cx="26.7" cy="28.9" r="1" fill="var(--a-w)"/>' +
    '<ellipse cx="36.6" cy="30" rx="2.5" ry="3" fill="var(--a-k)"/><circle cx="35.9" cy="28.9" r="1" fill="var(--a-w)"/>' +
    '<ellipse cx="24.4" cy="35" rx="2.4" ry="1.5" fill="var(--a-p)" opacity="0.7"/>' +
    '<ellipse cx="39.6" cy="35" rx="2.4" ry="1.5" fill="var(--a-p)" opacity="0.7"/>' +
    '<path fill="none" stroke="var(--a-k)" stroke-width="1.8" d="M29.5 35.2Q32 37.2 34.5 35.2"/>' +
    '<path fill="var(--a-w)" d="M29.9 35.8L30.7 38.2L31.5 36.4Z"/><path fill="var(--a-w)" d="M34.1 35.8L33.3 38.2L32.5 36.4Z"/>' +
    '<path fill="none" stroke="var(--a-v3)" stroke-width="2.4" d="M29 48.6V51M35 48.6V51"/>',
  bug:
    '<path fill="none" stroke="var(--a-k2)" stroke-width="2.6" d="M19 31L9 27M17.6 40H7M20 48.5L11 55M45 31L55 27M46.4 40H57M44 48.5L53 55"/>' +
    '<path fill="none" stroke="var(--a-k2)" stroke-width="2.2" d="M28 13Q25 5.5 18.5 5M36 13Q39 5.5 45.5 5"/>' +
    '<circle cx="18.5" cy="5" r="2.4" fill="var(--a-k2)"/><circle cx="45.5" cy="5" r="2.4" fill="var(--a-k2)"/>' +
    '<circle cx="32" cy="17" r="9.4" fill="var(--a-k2)"/><circle cx="28" cy="15.6" r="3.2" fill="var(--a-w)"/>' +
    '<circle cx="36" cy="15.6" r="3.2" fill="var(--a-w)"/><circle cx="28.6" cy="16.4" r="1.7" fill="var(--a-k)"/>' +
    '<circle cx="36.6" cy="16.4" r="1.7" fill="var(--a-k)"/><ellipse cx="32" cy="40" rx="19" ry="19.5" fill="var(--a-g2)"/>' +
    '<ellipse cx="30.6" cy="38.5" rx="17.1" ry="17.6" fill="var(--a-g)"/>' +
    '<path fill="none" stroke="var(--a-g3)" stroke-width="2.2" d="M32 22.5V58.5"/>' +
    '<ellipse cx="32" cy="23.6" rx="11" ry="3.2" fill="var(--a-g2)"/>' +
    '<ellipse cx="23.5" cy="32" rx="3.4" ry="6.5" fill="var(--a-g1)" transform="rotate(22 23.5 32)"/>' +
    '<circle cx="22.6" cy="28.6" r="1.4" fill="var(--a-w)" opacity="0.8"/>' +
    '<ellipse cx="39" cy="30.5" rx="2.4" ry="4.6" fill="var(--a-g1)" opacity="0.6" transform="rotate(22 39 30.5)"/>' +
    '<ellipse cx="41" cy="52" rx="2.4" ry="1.4" fill="var(--a-g1)" opacity="0.5" transform="rotate(-40 41 52)"/>',
  hen:
    '<path fill="none" stroke="var(--a-o)" stroke-width="2.6" d="M29 52V60M38 52V60"/>' +
    '<path fill="none" stroke="var(--a-o)" stroke-width="2.2" d="M25.5 60.6H32M34.5 60.6H41"/>' +
    '<path fill="var(--a-n2)" d="M47 37Q47 21 56 15Q62 22 60 34Q58 42 50 44Z"/>' +
    '<path fill="var(--a-n)" d="M47.2 35.7Q47.2 21.3 55.3 15.9Q60.7 22.2 58.9 32.9Q57.1 40.2 49.9 41.9Z"/>' +
    '<path fill="var(--a-r)" d="M13 15Q12.5 8.5 17 9Q18 4.6 22.5 6.4Q26.4 5 27 10Q28.6 14 25 16H15Z"/>' +
    '<ellipse cx="18" cy="9.6" rx="1.6" ry="1" fill="var(--a-r1)" transform="rotate(-20 18 9.6)"/>' +
    '<path fill="var(--a-n)" d="M10 28Q10 14 21 14Q31 14 31 26Q31 30 34 30H44Q55 30 55 41Q55 55 36 55Q24 55 17 48Q10 41 10 28Z"/>' +
    '<path fill="var(--a-n1)" d="M10.6 27.2Q10.6 14 20.9 14Q30.3 14 30.3 25.3Q30.3 29.1 33.1 29.1H42.5Q52.9 29.1 52.9 39.4Q52.9 52.6 35 52.6Q23.7 52.6 17.1 46Q10.6 39.4 10.6 27.2Z"/>' +
    '<ellipse cx="17" cy="18.5" rx="4" ry="2.2" fill="var(--a-t1)" transform="rotate(-30 17 18.5)"/>' +
    '<path fill="var(--a-n)" d="M28 39Q37 32 48 37Q50 47 40 49.5Q30 49 28 39Z"/>' +
    '<path fill="none" stroke="var(--a-n2)" stroke-width="1.6" d="M33 42Q38 45 44 42"/>' +
    '<path fill="var(--a-t)" opacity="0.8" d="M30 38.6Q38 34 46.5 37Q38 36.4 30 38.6Z"/>' +
    '<path fill="var(--a-y2)" d="M11 21L2.5 24.5L11 28Z"/><path fill="var(--a-y3)" d="M11 25L3.6 24.8L11 28Z"/>' +
    '<ellipse cx="11.8" cy="31" rx="2.4" ry="3.6" fill="var(--a-r)"/><ellipse cx="18.5" cy="21" rx="2.3" ry="2.8" fill="var(--a-k)"/>' +
    '<circle cx="17.8" cy="20" r="1" fill="var(--a-w)"/>' +
    '<ellipse cx="22.5" cy="27.5" rx="2.6" ry="1.7" fill="var(--a-p)" opacity="0.6"/>',
  box:
    '<path fill="var(--a-t2)" d="M40 27L57 20V47L40 56Z"/><path fill="var(--a-t3)" opacity="0.5" d="M40 27L57 20V22.4L40 29.6Z"/>' +
    '<path fill="var(--a-t1)" d="M24 20.6L55 20.6L50.5 9.5L28.5 9.5Z"/>' +
    '<path fill="var(--a-t2)" opacity="0.6" d="M24 20.6L55 20.6L54 18L25 18Z"/>' +
    '<path fill="var(--a-n2)" d="M8 27L40 27L57 20.6L25 20.6Z"/><path fill="var(--a-n3)" d="M8 27L25 20.6L57 20.6L50 23.2L19 23.2Z"/>' +
    '<path fill="var(--a-t)" d="M8 27L25 20.6L17.6 10.6L1 17Z"/><path fill="var(--a-t1)" d="M40 27L57 20.6L63 28.6L46.4 35.4Z"/>' +
    '<path fill="var(--a-t)" d="M8 27H40V56H8Z"/><path fill="var(--a-t2)" d="M8 27H40L37.4 34.6H5.4Z"/>' +
    '<path fill="var(--a-t1)" d="M8 27H40L39.4 28.6H7.6Z"/><rect x="20.5" y="34.6" width="7" height="21.4" fill="var(--a-m)"/>' +
    '<rect x="25.4" y="34.6" width="2.1" height="21.4" fill="var(--a-m2)"/>' +
    '<path fill="var(--a-t2)" opacity="0.5" d="M8 52H40V56H8Z"/>',
  map:
    '<path fill="var(--a-m3)" stroke="var(--a-m3)" stroke-width="3" d="M5 13L23 17L41 13L59 17V57L41 53L23 57L5 53Z"/>' +
    '<path fill="var(--a-m)" d="M5 13L23 17V57L5 53Z"/><path fill="var(--a-m)" d="M23 17L41 13V53L23 57Z"/>' +
    '<path fill="var(--a-m)" d="M41 13L59 17V57L41 53Z"/><path fill="var(--a-g1)" d="M5 36Q14 32 20 38Q26 44 23 57L5 53Z"/>' +
    '<path fill="var(--a-g1)" d="M41 13L59 17V30Q50 32 45 26Q40 20 41 13Z"/>' +
    '<path fill="var(--a-c)" d="M5 25Q14 21 22 28Q30 35 40 31Q50 27 59 36V42Q50 34 41 37Q30 41 22 34Q14 27 5 31Z"/>' +
    '<circle cx="12" cy="44" r="3.4" fill="var(--a-g)"/><circle cx="16.6" cy="47.5" r="2.6" fill="var(--a-g2)"/>' +
    '<circle cx="51" cy="21" r="3" fill="var(--a-g)"/><circle cx="13" cy="18.5" r="1.6" fill="var(--a-r)"/>' +
    '<circle cx="18" cy="21" r="1.6" fill="var(--a-r)"/><circle cx="22" cy="25" r="1.6" fill="var(--a-r)"/>' +
    '<path fill="var(--a-r)" d="M45 49Q38.6 41.4 38.6 37.6A6.4 6.4 0 0 1 51.4 37.6Q51.4 41.4 45 49Z"/>' +
    '<circle cx="46.4" cy="39" r="4.2" fill="var(--a-r2)" opacity="0.5"/><circle cx="45" cy="37.6" r="2.4" fill="var(--a-w)"/>' +
    '<path fill="var(--a-k)" opacity="0.12" d="M23 17L41 13V53L23 57Z"/>' +
    '<path fill="var(--a-m3)" opacity="0.4" d="M41 13V53L42.4 53.3V13.3Z"/>',
  pen:
    '<path fill="var(--a-e2)" d="M12.2 51.8L14.7 43.7L20.3 49.3Z"/><path fill="var(--a-k)" d="M11.2 52.8L12.3 49.7L14.3 51.7Z"/>' +
    '<path fill="var(--a-b3)" d="M14 43.7L23.9 33.8L30.2 40.1L20.3 50Z"/>' +
    '<path fill="none" stroke="var(--a-b2)" stroke-width="1.4" d="M17.2 41.2L22.8 46.8M20 38.4L25.6 44"/>' +
    '<path fill="var(--a-b2)" d="M22.1 33.4L43.3 12.2Q45.9 9.7 50.1 13.9Q54.3 18.1 51.8 20.7L30.6 41.9Z"/>' +
    '<path fill="var(--a-b)" d="M22.1 33.4L42.9 12.6Q45 10.5 48.5 14Q51.7 17.2 49.5 19.3L28.7 40.1Z"/>' +
    '<path fill="var(--a-b1)" d="M24.8 33.3L43.2 14.9Q44.6 13.5 45.9 14.7L26.1 34.5Z"/>' +
    '<path fill="var(--a-e2)" d="M47.6 12.2L50.1 9.7Q51.4 8.4 53.5 10.5Q55.6 12.6 54.3 13.9L51.8 16.4Z"/>' +
    '<path fill="var(--a-e)" d="M33 20.3Q31.2 18.4 33 16.6L40.6 8.9Q42.5 7.1 44.3 8.9L45.7 10.4L34.4 21.7Z"/>' +
    '<path fill="var(--a-e1)" d="M33.8 17.7L41.6 9.9L42.5 10.8L34.7 18.6Z"/>',
  web:
    '<path fill="none" stroke="var(--a-e2)" stroke-width="2.2" d="M30 28L40.7 2.1M30 28L55.9 17.3M30 28L55.9 38.7M30 28L40.7 53.9M30 28L19.3 53.9M30 28L4.1 38.7M30 28L4.1 17.3M30 28L19.3 2.1"/>' +
    '<path fill="none" stroke="var(--a-e2)" stroke-width="1.8" d="M32.7 21.5Q33.9 24.1 36.5 25.3Q35.5 28 36.5 30.7Q33.9 31.9 32.7 34.5Q30 33.5 27.3 34.5Q26.1 31.9 23.5 30.7Q24.5 28 23.5 25.3Q26.1 24.1 27.3 21.5Q30 22.5 32.7 21.5M35.2 15.5Q37.4 20.6 42.5 22.8Q40.5 28 42.5 33.2Q37.4 35.4 35.2 40.5Q30 38.5 24.8 40.5Q22.6 35.4 17.5 33.2Q19.5 28 17.5 22.8Q22.6 20.6 24.8 15.5Q30 17.5 35.2 15.5M37.7 9.5Q41 17 48.5 20.3Q45.6 28 48.5 35.7Q41 39 37.7 46.5Q30 43.6 22.3 46.5Q19 39 11.5 35.7Q14.4 28 11.5 20.3Q19 17 22.3 9.5Q30 12.4 37.7 9.5M40.1 3.6Q44.6 13.4 54.4 17.9Q50.6 28 54.4 38.1Q44.6 42.6 40.1 52.4Q30 48.6 19.9 52.4Q15.4 42.6 5.6 38.1Q9.4 28 5.6 17.9Q15.4 13.4 19.9 3.6Q30 7.4 40.1 3.6"/>' +
    '<path fill="none" stroke="var(--a-k2)" stroke-width="1.6" d="M46.4 44.4V55"/>' +
    '<path fill="none" stroke="var(--a-k2)" stroke-width="2" d="M45 52L39 48L37 51M45 55L38.6 55.6L37.4 59M51 52L57 48L59 51M51 55L57.4 55.6L58.6 59"/>' +
    '<circle cx="48" cy="56.4" r="5.6" fill="var(--a-k2)"/><circle cx="49.6" cy="58" r="3.6" fill="var(--a-k)" opacity="0.25"/>' +
    '<circle cx="46" cy="55.4" r="2" fill="var(--a-w)"/><circle cx="50.4" cy="55.4" r="2" fill="var(--a-w)"/>' +
    '<circle cx="46.4" cy="55.9" r="1" fill="var(--a-k)"/><circle cx="50.8" cy="55.9" r="1" fill="var(--a-k)"/>' +
    '<ellipse cx="44.2" cy="59" rx="1.4" ry="0.9" fill="var(--a-p)" opacity="0.8"/>' +
    '<ellipse cx="52" cy="59" rx="1.4" ry="0.9" fill="var(--a-p)" opacity="0.8"/>',
  frog:
    '<ellipse cx="16" cy="55" rx="8" ry="4" fill="var(--a-g2)"/><ellipse cx="48" cy="55" rx="8" ry="4" fill="var(--a-g2)"/>' +
    '<ellipse cx="15.4" cy="54.2" rx="7" ry="3.2" fill="var(--a-g)"/><ellipse cx="47.4" cy="54.2" rx="7" ry="3.2" fill="var(--a-g)"/>' +
    '<circle cx="19" cy="18" r="10" fill="var(--a-g2)"/><circle cx="18.3" cy="17.3" r="9" fill="var(--a-g)"/>' +
    '<circle cx="45" cy="18" r="10" fill="var(--a-g2)"/><circle cx="44.3" cy="17.3" r="9" fill="var(--a-g)"/>' +
    '<path fill="var(--a-g2)" d="M5 37Q5 21 20 21H44Q59 21 59 37Q59 55 32 55Q5 55 5 37Z"/>' +
    '<path fill="var(--a-g)" d="M5.8 36.1Q5.8 21 19.9 21H42.5Q56.6 21 56.6 36.1Q56.6 53 31.2 53Q5.8 53 5.8 36.1Z"/>' +
    '<ellipse cx="32" cy="47" rx="15" ry="6.4" fill="var(--a-g1)"/>' +
    '<ellipse cx="14" cy="27" rx="5" ry="2.4" fill="var(--a-g1)" transform="rotate(-25 14 27)"/>' +
    '<circle cx="19" cy="17" r="6.6" fill="var(--a-w)"/><circle cx="45" cy="17" r="6.6" fill="var(--a-w)"/>' +
    '<ellipse cx="20" cy="18" rx="3.2" ry="3.6" fill="var(--a-k)"/><circle cx="19" cy="16.6" r="1.3" fill="var(--a-w)"/>' +
    '<ellipse cx="46" cy="18" rx="3.2" ry="3.6" fill="var(--a-k)"/><circle cx="45" cy="16.6" r="1.3" fill="var(--a-w)"/>' +
    '<path fill="none" stroke="var(--a-g3)" stroke-width="2.6" d="M17 36Q32 46 47 36"/>' +
    '<circle cx="29.4" cy="30" r="1" fill="var(--a-g3)"/><circle cx="34.6" cy="30" r="1" fill="var(--a-g3)"/>' +
    '<ellipse cx="12.6" cy="37" rx="3.6" ry="2.2" fill="var(--a-p)" opacity="0.7"/>' +
    '<ellipse cx="51.4" cy="37" rx="3.6" ry="2.2" fill="var(--a-p)" opacity="0.7"/>',
  crab:
    '<path fill="none" stroke="var(--a-r2)" stroke-width="3.4" d="M14.6 42L5 46.4M15.6 47.6L7.6 54.4M49.4 42L59 46.4M48.4 47.6L56.4 54.4"/>' +
    '<path fill="none" stroke="var(--a-r2)" stroke-width="4.6" d="M17 37Q9 33 10.4 24.6M47 37Q55 33 53.6 24.6"/>' +
    '<path fill="var(--a-r2)" d="M10 26Q2 23 3 14Q5 7.5 11.5 8.5L9.6 15.6L16 14.6Q17.6 21 10 26Z"/>' +
    '<path fill="var(--a-r)" d="M9.4 24.3Q2.2 21.6 3.1 13.5Q4.9 7.6 10.7 8.5L9 14.9L14.8 14Q16.2 19.8 9.4 24.3Z"/>' +
    '<path fill="var(--a-r2)" d="M54 26Q62 23 61 14Q59 7.5 52.5 8.5L54.4 15.6L48 14.6Q46.4 21 54 26Z"/>' +
    '<path fill="var(--a-r)" d="M53.4 24.3Q60.6 21.6 59.7 13.5Q57.9 7.6 52.1 8.5L53.8 14.9L48 14Q46.6 19.8 53.4 24.3Z"/>' +
    '<path fill="none" stroke="var(--a-r2)" stroke-width="3" d="M26 30V19M38 30V19"/>' +
    '<ellipse cx="32" cy="41" rx="20.5" ry="13.5" fill="var(--a-r2)"/>' +
    '<ellipse cx="30.5" cy="40" rx="18.5" ry="12.2" fill="var(--a-r)"/>' +
    '<ellipse cx="23.5" cy="34" rx="6" ry="2.4" fill="var(--a-r1)" transform="rotate(-15 23.5 34)"/>' +
    '<circle cx="26" cy="16.4" r="4.6" fill="var(--a-w)"/><circle cx="38" cy="16.4" r="4.6" fill="var(--a-w)"/>' +
    '<ellipse cx="26.6" cy="17" rx="2.4" ry="2.8" fill="var(--a-k)"/><circle cx="25.9" cy="15.9" r="1" fill="var(--a-w)"/>' +
    '<ellipse cx="38.6" cy="17" rx="2.4" ry="2.8" fill="var(--a-k)"/><circle cx="37.9" cy="15.9" r="1" fill="var(--a-w)"/>' +
    '<path fill="none" stroke="var(--a-k)" stroke-width="2.2" d="M27.6 44Q32 48 36.4 44"/>' +
    '<ellipse cx="21" cy="42.6" rx="2.8" ry="1.8" fill="var(--a-r1)" opacity="0.9"/>' +
    '<ellipse cx="43" cy="42.6" rx="2.8" ry="1.8" fill="var(--a-r1)" opacity="0.9"/>',
  drum:
    '<path fill="var(--a-r2)" d="M9.5 30V50Q9.5 58 32 58Q54.5 58 54.5 50V30Z"/>' +
    '<path fill="var(--a-r)" d="M10 30.3V49.3Q10 56.9 31.4 56.9Q52.8 56.9 52.8 49.3V30.3Z"/>' +
    '<path fill="none" stroke="var(--a-w)" stroke-width="2.2" d="M12.5 35L19.5 51L26 35.6L32.6 52L39 35.6L45.6 51L51.6 35"/>' +
    '<circle cx="19.5" cy="51.4" r="1.8" fill="var(--a-y)"/><circle cx="32.6" cy="52.4" r="1.8" fill="var(--a-y)"/>' +
    '<circle cx="45.6" cy="51.4" r="1.8" fill="var(--a-y)"/><circle cx="26" cy="35.4" r="1.8" fill="var(--a-y)"/>' +
    '<circle cx="39" cy="35.4" r="1.8" fill="var(--a-y)"/>' +
    '<path fill="none" stroke="var(--a-y2)" stroke-width="3.6" d="M9.5 50Q9.5 58 32 58Q54.5 58 54.5 50"/>' +
    '<ellipse cx="32" cy="30.6" rx="23" ry="8" fill="var(--a-y2)"/><ellipse cx="32" cy="29.6" rx="22.6" ry="7.4" fill="var(--a-y)"/>' +
    '<ellipse cx="32" cy="29" rx="20" ry="5.8" fill="var(--a-w2)"/><ellipse cx="31" cy="28.4" rx="18.6" ry="5" fill="var(--a-w)"/>' +
    '<path fill="none" stroke="var(--a-n2)" stroke-width="3.6" d="M13.5 9L35 24.6M50.5 9L29 24.6"/>' +
    '<path fill="none" stroke="var(--a-t)" stroke-width="2.2" opacity="0.7" d="M13.2 8.4L34 23.4M50.8 8.4L30 23.4"/>' +
    '<circle cx="13" cy="8.6" r="3" fill="var(--a-n1)"/><circle cx="51" cy="8.6" r="3" fill="var(--a-n1)"/>',
  ship:
    '<rect x="23" y="7" width="8" height="16" rx="1.5" fill="var(--a-r2)"/>' +
    '<rect x="22.4" y="7" width="6.6" height="16" rx="1.5" fill="var(--a-r)"/>' +
    '<rect x="22.4" y="7" width="8.6" height="3.4" rx="1.5" fill="var(--a-k2)"/>' +
    '<rect x="35" y="7" width="8" height="16" rx="1.5" fill="var(--a-r2)"/>' +
    '<rect x="34.4" y="7" width="6.6" height="16" rx="1.5" fill="var(--a-r)"/>' +
    '<rect x="34.4" y="7" width="8.6" height="3.4" rx="1.5" fill="var(--a-k2)"/>' +
    '<rect x="16" y="19" width="33" height="11" rx="2.6" fill="var(--a-w3)"/>' +
    '<rect x="17" y="20" width="31" height="9" rx="2" fill="var(--a-w2)"/>' +
    '<rect x="17" y="20" width="30" height="7.6" rx="2" fill="var(--a-w)"/>' +
    '<rect x="21" y="22.6" width="4" height="3" rx="1" fill="var(--a-b1)"/>' +
    '<rect x="28" y="22.6" width="4" height="3" rx="1" fill="var(--a-b1)"/>' +
    '<rect x="35" y="22.6" width="4" height="3" rx="1" fill="var(--a-b1)"/>' +
    '<rect x="42" y="22.6" width="3" height="3" rx="1" fill="var(--a-b1)"/>' +
    '<rect x="10" y="27" width="45" height="11" rx="2.6" fill="var(--a-w3)"/>' +
    '<rect x="11" y="28" width="43" height="10" rx="2" fill="var(--a-w2)"/>' +
    '<rect x="11" y="28" width="42" height="8.4" rx="2" fill="var(--a-w)"/>' +
    '<path fill="var(--a-b2)" d="M3 36H61L56 51Q55 53 52 53H12Q9 53 8 51Z"/>' +
    '<path fill="var(--a-b)" d="M3.7 35.5H59.3L54.5 49.9Q53.6 51.9 50.7 51.9H12.3Q9.4 51.9 8.5 49.9Z"/>' +
    '<path fill="var(--a-r)" d="M6.6 47.4H57.4L56 51Q55 53 52 53H12Q9 53 8 51Z"/>' +
    '<rect x="6" y="37.4" width="50" height="1.8" rx="0.9" fill="var(--a-b1)"/><circle cx="16" cy="42" r="2.6" fill="var(--a-w)"/>' +
    '<circle cx="26" cy="42" r="2.6" fill="var(--a-w)"/><circle cx="36" cy="42" r="2.6" fill="var(--a-w)"/>' +
    '<circle cx="46" cy="42" r="2.6" fill="var(--a-w)"/><circle cx="16.4" cy="42.4" r="1.6" fill="var(--a-c1)"/>' +
    '<circle cx="26.4" cy="42.4" r="1.6" fill="var(--a-c1)"/><circle cx="36.4" cy="42.4" r="1.6" fill="var(--a-c1)"/>' +
    '<circle cx="46.4" cy="42.4" r="1.6" fill="var(--a-c1)"/>' +
    '<path fill="var(--a-c)" d="M1 54Q7 50 13 54T25 54T37 54T49 54T61 54Q63 55 63 57V61Q63 62 61 62H3Q1 62 1 60Z"/>' +
    '<path fill="none" stroke="var(--a-c1)" stroke-width="2" d="M7 58H15M27 58.4H39M50 58H56"/>',
  milk:
    '<path fill="var(--a-c1)" stroke="var(--a-c2)" stroke-width="2.6" d="M11.5 8H52.5L48.4 55Q48 59.6 43.4 59.6H20.6Q16 59.6 15.6 55Z"/>' +
    '<path fill="var(--a-w3)" d="M13.6 17H50.4L46.6 54.6Q46.2 57.8 43 57.8H21Q17.8 57.8 17.4 54.6Z"/>' +
    '<path fill="var(--a-w2)" d="M13.6 17H50.4L46.8 52Q46.4 56.4 42.4 56.4H21Q17.8 56.4 17.4 54.6Z"/>' +
    '<path fill="var(--a-w)" d="M13.6 17H44L40.6 52Q40.2 56.4 36.6 56.4H21Q17.8 56.4 17.4 54.6Z"/>' +
    '<ellipse cx="32" cy="17" rx="18.4" ry="4.2" fill="var(--a-w3)"/>' +
    '<ellipse cx="31.6" cy="16.4" rx="17.8" ry="3.6" fill="var(--a-w)"/>' +
    '<ellipse cx="37" cy="17.4" rx="9" ry="1.7" fill="var(--a-w2)" opacity="0.7"/>' +
    '<path fill="var(--a-w)" opacity="0.85" d="M22 10.6L25.6 10.6L24 15H20.6Z"/>' +
    '<path fill="none" stroke="var(--a-w2)" stroke-width="1.6" d="M21.4 31L20.4 50"/>',
  tent:
    '<ellipse cx="33" cy="55" rx="30" ry="5" fill="var(--a-g1)"/>' +
    '<path fill="var(--a-o2)" stroke="var(--a-o2)" stroke-width="2" d="M24 10L48 7L61 48L44 54Z"/>' +
    '<path fill="var(--a-o3)" opacity="0.35" d="M24 10L48 7L49 11L26 14Z"/>' +
    '<path fill="var(--a-o)" stroke="var(--a-o)" stroke-width="2.4" d="M24 10L44 54H4Z"/>' +
    '<path fill="var(--a-o1)" opacity="0.9" d="M24 10L7 51.6L10 51.6L24.6 15Z"/><path fill="var(--a-o3)" d="M24 24L34 54H14Z"/>' +
    '<path fill="var(--a-o1)" d="M24 24L14 54H8.4Z"/><path fill="var(--a-o1)" d="M24 24L34 54H39Z"/>' +
    '<path fill="var(--a-o2)" opacity="0.8" d="M24 24L36.4 54H39Z"/>' +
    '<path fill="none" stroke="var(--a-n2)" stroke-width="2.4" d="M24 10L22.6 4M48 7L49.4 2"/>' +
    '<circle cx="22.4" cy="3.6" r="1.8" fill="var(--a-y)"/>' +
    '<path fill="none" stroke="var(--a-e2)" stroke-width="1.4" d="M8 51L2 55M42 53.4L47 57.6M61 48L63 53"/>' +
    '<circle cx="2" cy="55" r="1.2" fill="var(--a-e3)"/><circle cx="47" cy="57.6" r="1.2" fill="var(--a-e3)"/>',
  hand:
    '<path fill="var(--a-s2)" d="M14 16.1Q13.4 11.9 17.7 11.3Q21.9 10.7 22.5 14.9L26 39.4L17.4 40.6Z"/>' +
    '<path fill="var(--a-s)" d="M13.6 16.8Q13 12.9 16.9 12.4Q20.8 11.9 21.3 15.7L24.4 37.8L16.7 38.9Z"/>' +
    '<path fill="var(--a-s1)" d="M15.5 15.2Q15.2 13.2 17.5 12.9Q19.6 12.6 19.8 14.6L20.2 17L15.8 17.6Z"/>' +
    '<path fill="none" stroke="var(--a-s2)" stroke-width="1.4" opacity="0.8" d="M17.2 24.5L21.4 23.9"/>' +
    '<path fill="var(--a-s2)" d="M25.6 10.6Q25.4 6.2 29.8 6Q34.2 5.9 34.4 10.3L35.4 39.8L26.6 40.2Z"/>' +
    '<path fill="var(--a-s)" d="M25.1 11.5Q25 7.5 29 7.4Q33 7.2 33.1 11.2L34 37.8L26 38.1Z"/>' +
    '<path fill="var(--a-s1)" d="M27.1 9.7Q27.1 7.7 29.5 7.6Q31.7 7.6 31.7 9.6L31.8 12L27.2 12.1Z"/>' +
    '<path fill="none" stroke="var(--a-s2)" stroke-width="1.4" opacity="0.8" d="M27.9 19.1L32.3 18.9"/>' +
    '<path fill="var(--a-s2)" d="M37.5 12.1Q37.8 7.8 42.1 8.1Q46.4 8.4 46.1 12.7L44.2 40.3L35.6 39.7Z"/>' +
    '<path fill="var(--a-s)" d="M37 12.8Q37.3 8.9 41.2 9.2Q45 9.5 44.8 13.4L43 38.2L35.3 37.7Z"/>' +
    '<path fill="var(--a-s1)" d="M39.2 11.5Q39.3 9.5 41.6 9.6Q43.7 9.8 43.6 11.8L43.4 14.2L39 13.9Z"/>' +
    '<path fill="none" stroke="var(--a-s2)" stroke-width="1.4" opacity="0.8" d="M38.9 20.9L43.1 21.2"/>' +
    '<path fill="var(--a-s2)" d="M48.1 18.5Q48.8 14.7 52.6 15.5Q56.3 16.2 55.6 19.9L51.5 40.7L44.1 39.3Z"/>' +
    '<path fill="var(--a-s)" d="M47.5 18.9Q48.2 15.5 51.5 16.2Q54.9 16.8 54.2 20.2L50.6 38.9L43.9 37.6Z"/>' +
    '<path fill="var(--a-s1)" d="M49.7 18.6Q50.1 16.6 51.9 17Q53.4 17.3 53.1 19.2L52.6 21.6L49.3 20.9Z"/>' +
    '<path fill="none" stroke="var(--a-s2)" stroke-width="1.4" opacity="0.8" d="M48.3 27.9L51.5 28.5"/>' +
    '<path fill="var(--a-s2)" d="M8.4 30.6Q11 27.4 14.6 30.6L20.6 37.6L20.6 46L13.4 41Q8 36 8.4 30.6Z"/>' +
    '<path fill="var(--a-s)" d="M8.4 30.6Q10.7 27.7 14 30.6L19.4 36.9L19.4 44.5L12.9 40Q8 35.5 8.4 30.6Z"/>' +
    '<path fill="var(--a-s2)" d="M17 33Q17 28 22 28H44Q49.6 28 49.6 33V42Q49.6 49.6 43 54L41 57H25L23 54Q17 49.6 17 42Z"/>' +
    '<path fill="var(--a-s)" d="M17.3 33.1Q17.3 28.4 22 28.4H42.5Q47.7 28.4 47.7 33.1V41.4Q47.7 48.5 41.5 52.6L39.7 55.4H24.8L22.9 52.6Q17.3 48.5 17.3 41.4Z"/>' +
    '<path fill="none" stroke="var(--a-s2)" stroke-width="1.8" d="M22.6 40Q28 44 30 49.6M33 35.6Q38 37 43.6 35"/>' +
    '<path fill="none" stroke="var(--a-s2)" stroke-width="1.6" d="M17 30.4Q19 33 21.6 35"/>' +
    '<rect x="21" y="52" width="24" height="11" rx="3" fill="var(--a-b2)"/>' +
    '<rect x="21" y="52" width="22.6" height="9.8" rx="3" fill="var(--a-b)"/>' +
    '<rect x="22.6" y="53.4" width="18.6" height="2" rx="1" fill="var(--a-b1)"/>',
  gift:
    '<path fill="var(--a-r2)" d="M10 30H54V55Q54 58 51 58H13Q10 58 10 55Z"/>' +
    '<path fill="var(--a-r)" d="M10.5 30.4H52.3V54.2Q52.3 57 49.4 57H13.4Q10.5 57 10.5 54.2Z"/>' +
    '<rect x="10" y="30" width="44" height="3" fill="var(--a-r3)" opacity="0.35"/>' +
    '<rect x="27.6" y="30" width="9" height="28" fill="var(--a-y2)"/>' +
    '<rect x="27.6" y="30" width="7.4" height="28" fill="var(--a-y)"/>' +
    '<path fill="var(--a-r2)" d="M7 24Q7 21 10 21H54Q57 21 57 24V30Q57 32 55 32H9Q7 32 7 30Z"/>' +
    '<path fill="var(--a-r)" d="M7.4 23.7Q7.4 20.8 10.3 20.8H52.9Q55.9 20.8 55.9 23.7V29.5Q55.9 31.4 53.9 31.4H9.3Q7.4 31.4 7.4 29.5Z"/>' +
    '<rect x="9.6" y="22.6" width="44" height="2" rx="1" fill="var(--a-r1)"/>' +
    '<rect x="27" y="21" width="10" height="11" fill="var(--a-y2)"/><rect x="27" y="21" width="8.2" height="11" fill="var(--a-y)"/>' +
    '<rect x="28.4" y="22.4" width="2" height="8.4" rx="1" fill="var(--a-y1)"/>' +
    '<path fill="var(--a-y2)" d="M31 21Q22 6.6 14.4 10.4Q10.6 15 17.4 19.6Q23 22 31 21Z"/>' +
    '<path fill="var(--a-y)" d="M29.6 19.7Q21.5 6.8 14.6 10.2Q11.2 14.3 17.3 18.5Q22.4 20.6 29.6 19.7Z"/>' +
    '<path fill="var(--a-y2)" d="M33 21Q42 6.6 49.6 10.4Q53.4 15 46.6 19.6Q41 22 33 21Z"/>' +
    '<path fill="var(--a-y)" d="M33.6 19.7Q41.7 6.8 48.6 10.2Q52 14.3 45.9 18.5Q40.8 20.6 33.6 19.7Z"/>' +
    '<path fill="var(--a-y3)" opacity="0.5" d="M30 20Q23 12.4 18.4 13.6Q22 17 30 20Z"/>' +
    '<path fill="var(--a-y3)" opacity="0.5" d="M34 20Q41 12.4 45.6 13.6Q42 17 34 20Z"/>' +
    '<circle cx="32" cy="20" r="4.4" fill="var(--a-y2)"/><circle cx="31.5" cy="19.5" r="3.7" fill="var(--a-y)"/>' +
    '<rect x="13" y="35" width="2.4" height="18" rx="1.2" fill="var(--a-r1)" opacity="0.6"/>',
  flag:
    '<path fill="none" stroke="var(--a-e2)" stroke-width="3.6" d="M12.4 9V61"/>' +
    '<path fill="none" stroke="var(--a-e1)" stroke-width="1.2" d="M11.6 10V60"/>' +
    '<path fill="var(--a-r)" d="M14 11Q22 6.6 32 10.4Q42 14.2 56 9.6V35.6Q42 40.2 32 36.4Q22 32.6 14 37Z"/>' +
    '<path fill="var(--a-r2)" d="M30 9.8Q36 12.6 42 13.2V39.2Q36 38.6 30 35.8Z"/>' +
    '<path fill="var(--a-r2)" opacity="0.6" d="M50 11.4Q53 10.8 56 9.6V35.6Q53 36.8 50 37.4Z"/>' +
    '<path fill="var(--a-r1)" opacity="0.8" d="M17 11Q21 9.2 24 8.8V34.8Q21 35.2 17 37Z"/>' +
    '<circle cx="12.4" cy="7" r="3.6" fill="var(--a-y2)"/><circle cx="11.9" cy="6.5" r="3" fill="var(--a-y)"/>',
  cake:
    '<ellipse cx="32" cy="56.6" rx="29" ry="5.6" fill="var(--a-w3)"/>' +
    '<ellipse cx="31.6" cy="55.6" rx="28" ry="4.8" fill="var(--a-w)"/>' +
    '<path fill="var(--a-t2)" d="M8 34V50Q8 56.4 32 56.4Q56 56.4 56 50V34Z"/>' +
    '<path fill="var(--a-t)" d="M8.4 34.2V49.6Q8.4 55.8 31.4 55.8Q54.4 55.8 54.4 49.6V34.2Z"/>' +
    '<path fill="var(--a-m)" d="M8 43Q8 47 32 47Q56 47 56 43V46.4Q56 50.4 32 50.4Q8 50.4 8 46.4Z"/>' +
    '<path fill="var(--a-p)" d="M8 34V38.6Q8 41 10.4 41Q12.4 41 12.6 38.6Q14.4 38.2 16.4 42.4Q19.4 44.6 20.8 42Q22 39.6 24 39.8Q27 40.4 30 40.6Q32.6 40.6 33.6 43Q35.4 45.4 37 43Q38 40.2 40.4 39.8Q44 39.2 46 38.6Q48 38.4 48.6 41Q50 43.4 51.6 41.4Q52.6 38.8 54 37.8Q56 36.6 56 34Z"/>' +
    '<ellipse cx="32" cy="33.6" rx="24" ry="7.2" fill="var(--a-p1)"/>' +
    '<ellipse cx="32.6" cy="34.2" rx="22.6" ry="6" fill="var(--a-p)"/>' +
    '<ellipse cx="31.4" cy="33.2" rx="21.6" ry="5.2" fill="var(--a-p1)"/><circle cx="15" cy="34" r="1.2" fill="var(--a-b)"/>' +
    '<circle cx="25" cy="36.6" r="1.2" fill="var(--a-y2)"/><circle cx="46" cy="35" r="1.2" fill="var(--a-g)"/>' +
    '<circle cx="36" cy="37" r="1.2" fill="var(--a-r)"/><rect x="19.4" y="20.6" width="4.4" height="13" rx="1.6" fill="var(--a-b2)"/>' +
    '<rect x="19.4" y="20.6" width="3.2" height="13" rx="1.6" fill="var(--a-b)"/>' +
    '<path fill="none" stroke="var(--a-w)" stroke-width="1.4" opacity="0.9" d="M20 24.6L23 23M20 29.6L23 28"/>' +
    '<path fill="var(--a-y)" d="M21.6 19.2Q18 16 21.6 10.6Q25.2 16 21.6 19.2Z"/>' +
    '<ellipse cx="21.6" cy="16.8" rx="1.2" ry="2" fill="var(--a-o)"/>' +
    '<rect x="29.8" y="17" width="4.4" height="13" rx="1.6" fill="var(--a-r2)"/>' +
    '<rect x="29.8" y="17" width="3.2" height="13" rx="1.6" fill="var(--a-r)"/>' +
    '<path fill="none" stroke="var(--a-w)" stroke-width="1.4" opacity="0.9" d="M30.4 21L33.4 19.4M30.4 26L33.4 24.4"/>' +
    '<path fill="var(--a-y)" d="M32 15.6Q28.4 12.4 32 7Q35.6 12.4 32 15.6Z"/>' +
    '<ellipse cx="32" cy="13.2" rx="1.2" ry="2" fill="var(--a-o)"/>' +
    '<rect x="40.2" y="20.6" width="4.4" height="13" rx="1.6" fill="var(--a-g2)"/>' +
    '<rect x="40.2" y="20.6" width="3.2" height="13" rx="1.6" fill="var(--a-g)"/>' +
    '<path fill="none" stroke="var(--a-w)" stroke-width="1.4" opacity="0.9" d="M40.8 24.6L43.8 23M40.8 29.6L43.8 28"/>' +
    '<path fill="var(--a-y)" d="M42.4 19.2Q38.8 16 42.4 10.6Q46 16 42.4 19.2Z"/>' +
    '<ellipse cx="42.4" cy="16.8" rx="1.2" ry="2" fill="var(--a-o)"/>',
  kite:
    '<path fill="none" stroke="var(--a-e2)" stroke-width="1.4" d="M33 47Q25 54 26 62"/>' +
    '<path fill="none" stroke="var(--a-k2)" stroke-width="1.6" d="M33 47Q40 50 42 55Q44 60 52 60"/>' +
    '<path fill="var(--a-b)" d="M37 50.4L41.4 47.6L41 53Z"/><path fill="var(--a-b2)" d="M37 50.4L41 53L36 54Z"/>' +
    '<path fill="var(--a-g)" d="M44.6 57.4L49 54.4L49.4 59.6Z"/><path fill="var(--a-g2)" d="M44.6 57.4L49.4 59.6L44.4 61Z"/>' +
    '<path fill="var(--a-r)" stroke="var(--a-r)" stroke-width="2.4" d="M31 4L31.6 24.6L8 25Z"/>' +
    '<path fill="var(--a-y)" stroke="var(--a-y)" stroke-width="2.4" d="M31 4L54 22L31.6 24.6Z"/>' +
    '<path fill="var(--a-y2)" stroke="var(--a-y2)" stroke-width="2.4" d="M31.6 24.6L54 22L33 47Z"/>' +
    '<path fill="var(--a-r2)" stroke="var(--a-r2)" stroke-width="2.4" d="M8 25L31.6 24.6L33 47Z"/>' +
    '<path fill="var(--a-r1)" opacity="0.8" d="M30.4 7.6L14 24.4L18.6 24.2Z"/>' +
    '<path fill="none" stroke="var(--a-n2)" stroke-width="1.8" d="M31 4L33 47M8 25L54 22"/>',
  bike:
    '<circle cx="14" cy="44" r="11.4" fill="none" stroke="var(--a-k2)" stroke-width="4.4"/>' +
    '<circle cx="14" cy="44" r="8.4" fill="none" stroke="var(--a-e)" stroke-width="1.4"/>' +
    '<path fill="none" stroke="var(--a-e1)" stroke-width="1.2" d="M6 44H22M14 36V52"/>' +
    '<circle cx="14" cy="44" r="2.4" fill="var(--a-e2)"/>' +
    '<circle cx="50" cy="44" r="11.4" fill="none" stroke="var(--a-k2)" stroke-width="4.4"/>' +
    '<circle cx="50" cy="44" r="8.4" fill="none" stroke="var(--a-e)" stroke-width="1.4"/>' +
    '<path fill="none" stroke="var(--a-e1)" stroke-width="1.2" d="M42 44H58M50 36V52"/>' +
    '<circle cx="50" cy="44" r="2.4" fill="var(--a-e2)"/>' +
    '<path fill="none" stroke="var(--a-r2)" stroke-width="4.6" d="M14 44L30 44L24.6 24.6L14 44M24.6 24.6L44.4 24.6L30 44M44.4 24.6L50 44"/>' +
    '<path fill="none" stroke="var(--a-r)" stroke-width="3.2" d="M14 44L30 44L24.6 24.6L14 44M24.6 24.6L44.4 24.6L30 44M44.4 24.6L50 44"/>' +
    '<path fill="none" stroke="var(--a-r1)" stroke-width="1.2" opacity="0.9" d="M26.6 23.4H43"/>' +
    '<path fill="none" stroke="var(--a-k2)" stroke-width="2.4" d="M24.6 24.6L23.6 20M44.4 24.6L46 16.4L52.4 15.6"/>' +
    '<path fill="none" stroke="var(--a-k2)" stroke-width="3.6" d="M51 15.8L54 15.4"/>' +
    '<path fill="var(--a-k2)" d="M17.6 19.6Q17.6 16.8 21 16.8H28.6Q31 16.8 30.4 19.4Q29.4 21.4 24 21.4Q18.6 21.4 17.6 19.6Z"/>' +
    '<rect x="20" y="17.4" width="6" height="1.4" rx="0.7" fill="var(--a-e)" opacity="0.5"/>' +
    '<circle cx="30" cy="44" r="4" fill="var(--a-e2)"/><circle cx="29.4" cy="43.4" r="2.6" fill="var(--a-e)"/>' +
    '<path fill="none" stroke="var(--a-k2)" stroke-width="2.4" d="M30 44L33.6 50.4"/>' +
    '<rect x="31.4" y="49.6" width="6" height="2.6" rx="1.2" fill="var(--a-k2)"/>',
  rose:
    '<path fill="none" stroke="var(--a-g2)" stroke-width="3.8" d="M32 36Q30.6 48 32.6 61"/>' +
    '<path fill="var(--a-g2)" d="M31.4 45L27.6 43.6L31.2 41.6Z"/><path fill="var(--a-g2)" d="M32.6 53L36.4 51.4L32.8 49.4Z"/>' +
    '<path fill="var(--a-g)" d="M31.4 50Q22 53 15.4 46Q24 40.4 31.4 47.4Z"/>' +
    '<path fill="var(--a-g2)" d="M31.4 50Q22 53 15.4 46Q24 47.6 31.4 47.4Z"/>' +
    '<path fill="var(--a-g)" d="M32.6 44Q42 44.6 48.4 36.6Q38 33.4 32.6 41Z"/>' +
    '<path fill="var(--a-g2)" d="M32.6 44Q42 44.6 48.4 36.6Q40 40.4 32.6 41Z"/>' +
    '<path fill="var(--a-g)" d="M23 33.4L32 40.6L41 33.4Q37 39 32 38.4Q27 39 23 33.4Z"/>' +
    '<path fill="var(--a-r2)" d="M13 17Q12 7 22 7.6Q27 3 32.4 6.4Q39 3 43.4 7.6Q52.6 7 51 18Q50 30 42 35.4Q37 38.6 32 38.6Q26 38.6 21 35Q13 29 13 17Z"/>' +
    '<path fill="var(--a-r3)" d="M22 13Q32 6.6 42.4 13Q38 17 32 16.6Q26 17 22 13Z"/>' +
    '<path fill="var(--a-r)" d="M24.6 14.4Q30 9.6 36.6 12.4Q34 14.6 32 14Q28 13.8 26.6 16.6Q25 16.4 24.6 14.4Z"/>' +
    '<path fill="var(--a-r2)" d="M27 17Q32 12.6 38.6 16Q40 21 35 23Q29 24.4 27 17Z"/>' +
    '<path fill="var(--a-r)" d="M13.4 16.6Q17 27 28.6 29.6Q30 36.6 24.6 37Q15.6 33 13.4 16.6Z"/>' +
    '<path fill="var(--a-r)" d="M50.6 17.4Q47.6 28.6 35.6 30Q34.6 37 40.6 36Q49.6 31.6 50.6 17.4Z"/>' +
    '<path fill="var(--a-r)" d="M20 21.6Q32 30 44.6 21.6Q45.4 34.4 32 38.6Q19 34.4 20 21.6Z"/>' +
    '<path fill="var(--a-r1)" d="M21.6 23.6Q32 30.6 43 23.6Q38 29.4 32 29.6Q26 29.4 21.6 23.6Z"/>' +
    '<ellipse cx="16.6" cy="20" rx="1.4" ry="4" fill="var(--a-r1)" opacity="0.8" transform="rotate(-20 16.6 20)"/>',
  bone:
    '<path fill="var(--a-m3)" stroke="var(--a-m3)" stroke-width="3.4" d="M11.9 39.9L46.3 15.9L52.1 24.1L17.7 48.1Z"/>' +
    '<circle cx="11.4" cy="39.1" r="9.3" fill="var(--a-m3)"/><circle cx="18.2" cy="49" r="9.3" fill="var(--a-m3)"/>' +
    '<circle cx="45.8" cy="15" r="9.3" fill="var(--a-m3)"/><circle cx="52.6" cy="24.9" r="9.3" fill="var(--a-m3)"/>' +
    '<circle cx="11.4" cy="39.1" r="7.6" fill="var(--a-m2)"/><circle cx="18.2" cy="49" r="7.6" fill="var(--a-m2)"/>' +
    '<circle cx="45.8" cy="15" r="7.6" fill="var(--a-m2)"/><circle cx="52.6" cy="24.9" r="7.6" fill="var(--a-m2)"/>' +
    '<path fill="var(--a-m2)" d="M11.9 39.9L46.3 15.9L52.1 24.1L17.7 48.1Z"/><circle cx="10.6" cy="38.2" r="6.5" fill="var(--a-m)"/>' +
    '<circle cx="17.4" cy="48.1" r="6.5" fill="var(--a-m)"/><circle cx="45" cy="14.1" r="6.5" fill="var(--a-m)"/>' +
    '<circle cx="51.8" cy="24" r="6.5" fill="var(--a-m)"/><path fill="var(--a-m)" d="M11.1 39L45.5 15L51.3 23.2L16.9 47.2Z"/>' +
    '<path fill="var(--a-m1)" opacity="0.9" d="M15.9 40.4L45.4 19.7L46.4 21.2L16.9 41.8Z"/>' +
    '<circle cx="9" cy="36.7" r="2" fill="var(--a-m1)"/><circle cx="43.4" cy="12.6" r="2" fill="var(--a-m1)"/>',
  nose:
    '<path fill="var(--a-s2)" d="M24.4 9Q32 4.4 39.6 9Q40.6 21 46 30.6Q55 35.6 54 45.4Q53 54.6 43.6 54Q38.8 58.4 32 58.4Q25.2 58.4 20.4 54Q11 54.6 10 45.4Q9 35.6 18 30.6Q23.4 21 24.4 9Z"/>' +
    '<path fill="var(--a-s)" d="M23.7 9.8Q30.8 5.5 37.9 9.8Q38.8 20.9 43.8 29.9Q52.2 34.5 51.3 43.6Q50.3 52.2 41.6 51.6Q37.1 55.7 30.8 55.7Q24.5 55.7 20 51.6Q11.3 52.2 10.3 43.6Q9.4 34.5 17.8 29.9Q22.8 20.9 23.7 9.8Z"/>' +
    '<path fill="var(--a-s2)" opacity="0.8" d="M37.4 10Q39 23 44 32.6Q37.6 30 35.6 21Q34.6 14 37.4 10Z"/>' +
    '<ellipse cx="28.4" cy="21" rx="2" ry="7.6" fill="var(--a-s1)" transform="rotate(8 28.4 21)"/>' +
    '<ellipse cx="29.6" cy="41.4" rx="6.4" ry="5" fill="var(--a-s1)" transform="rotate(-10 29.6 41.4)"/>' +
    '<circle cx="27.6" cy="39.6" r="1.8" fill="var(--a-w)" opacity="0.75"/>' +
    '<path fill="none" stroke="var(--a-s2)" stroke-width="2.2" d="M18.4 35.6Q13.6 43.4 18.6 50.6M45.6 35.6Q50.4 43.4 45.4 50.6"/>' +
    '<ellipse cx="25" cy="51.4" rx="4.6" ry="2.8" fill="var(--a-s3)" transform="rotate(20 25 51.4)"/>' +
    '<ellipse cx="39" cy="51.4" rx="4.6" ry="2.8" fill="var(--a-s3)" transform="rotate(-20 39 51.4)"/>' +
    '<ellipse cx="25.6" cy="52" rx="3" ry="1.7" fill="var(--a-n3)" opacity="0.6" transform="rotate(20 25.6 52)"/>' +
    '<ellipse cx="38.4" cy="52" rx="3" ry="1.7" fill="var(--a-n3)" opacity="0.6" transform="rotate(-20 38.4 52)"/>',
});
