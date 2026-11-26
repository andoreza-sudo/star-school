/* ---------- object art: the emoji a young child still met most (EMOJI-12, BEST-APP roadmap 12; DESIGN_SYSTEM.md section 6.5) ----------
   docs/drafts/AUDIO12.md part B ranks the emoji still shown where the app otherwise draws. The two most seen: the sticker won at the
   end of every round (and the sticker book), and the Pre-K reading world's syllable pictures (ABC Beach, Clap the Syllables), which
   are nearly the same set. These thirteen are drawn so both show a drawing:
   octopus, penguin, dinosaur, strawberry, castle, volcano, ladybug, pumpkin, doughnut, guitar, trumpet and whale (syllable and
   picture words, Discover's Nature Trail, and 12 of the 48 stickers), and crayon (Kindergarten math's story problems, where every
   question showed the crayon emoji, and the coins stop's toy shop).
   The art name is the word, so picFor(word, emoji) shows the drawing wherever the content asks for it; the stickers find theirs
   through STK_ART (src/js/05-pets.js). Same rules and limits as sets A to D: 64x64 grid, light from the top left, only var(--a-x)
   roles from src/css/21-art.css, <path>/<circle>/<ellipse>/<rect> only, up to 2,500 bytes and 40 elements each. Plain data, read only
   inside functions (A11). tools/test.js "object art EMOJI-12" checks them. Review sheet: docs/drafts/EMOJI12.png. */
Object.assign(ART, {
  octopus:
    '<ellipse cx="32" cy="60.4" rx="24" ry="2.2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-v2)" d="M18 34Q9 40 6 48Q4 55 10 55Q8 50 13 46Q18 42 22 39Z"/>' +
    '<path fill="var(--a-v2)" d="M46 34Q55 40 58 48Q60 55 54 55Q56 50 51 46Q46 42 42 39Z"/>' +
    '<path fill="var(--a-v2)" d="M23 38Q19 46 18 52Q17.5 59 23 58Q20.5 54 23.5 49Q26 44 28.5 40Z"/>' +
    '<path fill="var(--a-v2)" d="M41 38Q45 46 46 52Q46.5 59 41 58Q43.5 54 40.5 49Q38 44 35.5 40Z"/>' +
    '<path fill="var(--a-v)" d="M28.5 39Q27 48 29.5 55Q31 60 34.5 59Q31.5 55 33 48Q34 43 35 39Z"/>' +
    '<path fill="var(--a-v)" d="M17.5 34.6Q10 40.4 7.6 47.6Q6.6 52.6 9.6 53.2Q9 49 13.4 45Q17.6 41.4 21.6 39Z"/>' +
    '<path fill="var(--a-v)" d="M23.4 38.4Q20.2 46 19.6 51.6Q19.4 56.6 22.4 56.6Q20.6 52.6 23.4 48.4Q25.6 44 27.8 40.2Z"/>' +
    '<path fill="var(--a-v)" d="M40.6 38.4Q43.8 46 44.4 51.6Q44.6 56.6 41.6 56.6Q43.4 52.6 40.6 48.4Q38.4 44 36.2 40.2Z"/>' +
    '<path fill="var(--a-v)" d="M46.5 34.6Q54 40.4 56.4 47.6Q57.4 52.6 54.4 53.2Q55 49 50.6 45Q46.4 41.4 42.4 39Z"/>' +
    '<ellipse cx="32" cy="24.6" rx="18" ry="17" fill="var(--a-v2)"/>' +
    '<path fill="var(--a-v)" d="M14.6 25Q14.6 8.4 31.4 8.4Q48 8.4 48.6 24.4Q48.6 38 32 39.6Q14.6 38.6 14.6 25Z"/>' +
    '<ellipse cx="23.6" cy="15.4" rx="5" ry="2.6" fill="var(--a-v1)" transform="rotate(-30 23.6 15.4)"/>' +
    '<ellipse cx="20.6" cy="14.6" rx="1.8" ry="1" fill="var(--a-w)" opacity="0.7" transform="rotate(-30 20.6 14.6)"/>' +
    '<ellipse cx="25.4" cy="26" rx="4" ry="4.6" fill="var(--a-w)"/><ellipse cx="38.6" cy="26" rx="4" ry="4.6" fill="var(--a-w)"/>' +
    '<circle cx="26.2" cy="27" r="2.4" fill="var(--a-k)"/><circle cx="39.4" cy="27" r="2.4" fill="var(--a-k)"/>' +
    '<circle cx="25.4" cy="26" r="0.9" fill="var(--a-w)"/><circle cx="38.6" cy="26" r="0.9" fill="var(--a-w)"/>' +
    '<path fill="none" stroke="var(--a-v3)" stroke-width="1.6" d="M28.6 33.4Q32 36 35.4 33.4"/>' +
    '<ellipse cx="20.6" cy="32" rx="2.4" ry="1.4" fill="var(--a-p)" opacity="0.6"/><ellipse cx="43.4" cy="32" rx="2.4" ry="1.4" fill="var(--a-p)" opacity="0.6"/>' +
    '<circle cx="11.4" cy="47.4" r="1.2" fill="var(--a-v1)"/><circle cx="21.6" cy="50" r="1.2" fill="var(--a-v1)"/>' +
    '<circle cx="31.4" cy="50.6" r="1.2" fill="var(--a-v1)"/><circle cx="42.4" cy="50" r="1.2" fill="var(--a-v1)"/><circle cx="52.6" cy="47.4" r="1.2" fill="var(--a-v1)"/>',
  penguin:
    '<ellipse cx="32" cy="60.6" rx="18" ry="2.2" fill="var(--a-k)" opacity="0.1"/>' +
    '<ellipse cx="25" cy="58.6" rx="6" ry="2.6" fill="var(--a-o2)"/><ellipse cx="39" cy="58.6" rx="6" ry="2.6" fill="var(--a-o2)"/>' +
    '<ellipse cx="24.6" cy="58" rx="5" ry="2" fill="var(--a-o)"/><ellipse cx="38.6" cy="58" rx="5" ry="2" fill="var(--a-o)"/>' +
    '<path fill="var(--a-k)" d="M32 4Q15 4 13.6 24Q12 40 15 50Q19 58.6 32 58.6Q45 58.6 49 50Q52 40 50.4 24Q49 4 32 4Z"/>' +
    '<path fill="var(--a-k2)" d="M31 5Q17 5.6 15.4 23Q15.6 12 31 6.6Z"/>' +
    '<path fill="var(--a-k)" d="M14.6 30Q6 38 5.6 47Q10 46 16.4 40Z"/><path fill="var(--a-k)" d="M49.4 30Q58 38 58.4 47Q54 46 47.6 40Z"/>' +
    '<path fill="var(--a-w2)" d="M32 20Q20.6 20 20 36Q19.6 50 23.6 54Q27 57 32 57Q37 57 40.4 54Q44.4 50 44 36Q43.4 20 32 20Z"/>' +
    '<path fill="var(--a-w)" d="M31 20.4Q21.6 21 21 36Q20.8 48 24 52.6Q27 55.4 31 55.6Z"/>' +
    '<ellipse cx="25" cy="17.6" rx="5.2" ry="5.6" fill="var(--a-w)"/><ellipse cx="39" cy="17.6" rx="5.2" ry="5.6" fill="var(--a-w)"/>' +
    '<circle cx="26" cy="18" r="2.6" fill="var(--a-k)"/><circle cx="38" cy="18" r="2.6" fill="var(--a-k)"/>' +
    '<circle cx="25.2" cy="17" r="1" fill="var(--a-w)"/><circle cx="37.2" cy="17" r="1" fill="var(--a-w)"/>' +
    '<path fill="var(--a-o2)" d="M27 24Q32 22.4 37 24L32 30Z"/><path fill="var(--a-o)" d="M27 24Q32 22.4 37 24Q32 25.6 27 24Z"/>' +
    '<ellipse cx="21.4" cy="26.4" rx="2.4" ry="1.4" fill="var(--a-p)" opacity="0.6"/><ellipse cx="42.6" cy="26.4" rx="2.4" ry="1.4" fill="var(--a-p)" opacity="0.6"/>',
  dinosaur:
    '<ellipse cx="33" cy="60.6" rx="25" ry="2.2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-g2)" d="M27 44Q20 50 12 52Q4 53.6 3 50Q10 50 15 44Q20 38 24 36Z"/>' +
    '<rect x="23" y="46" width="7" height="13" rx="3" fill="var(--a-g2)"/><rect x="36" y="46" width="7" height="13" rx="3" fill="var(--a-g2)"/>' +
    '<path fill="var(--a-g)" d="M26.4 44Q20 49 12.6 50.8Q6 51.8 4.6 50Q11 49 15.4 43.4Q19.6 38 23.4 36.4Z"/>' +
    '<path fill="var(--a-g)" d="M22 36Q22 26 31 24Q38 22.6 40 18L50 26Q49 32 46 36Q47 50 36 52Q22 52 22 36Z"/>' +
    '<rect x="25" y="47" width="6" height="12" rx="2.6" fill="var(--a-g)"/><rect x="38" y="47" width="6" height="12" rx="2.6" fill="var(--a-g)"/>' +
    '<path fill="var(--a-y1)" d="M38 34Q44 36 42 44Q39 50 33 50Q36 44 34 38Z"/>' +
    '<path fill="var(--a-g2)" d="M37 6Q46 3 56 7Q61 9.6 60.6 15Q60 21 54 22Q48 23.4 42 23Q37 22 35.4 16Q34.6 9 37 6Z"/>' +
    '<path fill="var(--a-g)" d="M37.4 6.6Q46 3.6 55.4 7.4Q59.6 9.8 59.2 14.6Q58.6 19.6 53.4 20.6Q47.8 21.8 42.2 21.4Q38 20.6 36.6 15.4Q35.8 9.4 37.4 6.6Z"/>' +
    '<path fill="none" stroke="var(--a-g3)" stroke-width="1.4" d="M47 17.6Q53 19 58.6 16"/>' +
    '<path fill="var(--a-w)" d="M50 18.4L51.4 20.8L52.8 18.6ZM54.4 18.2L55.6 20.2L56.8 17.8Z"/>' +
    '<ellipse cx="43.4" cy="11" rx="2.8" ry="3.2" fill="var(--a-w)"/><circle cx="44" cy="11.4" r="1.8" fill="var(--a-k)"/><circle cx="43.4" cy="10.6" r="0.7" fill="var(--a-w)"/>' +
    '<circle cx="56.4" cy="10.4" r="0.9" fill="var(--a-g3)"/>' +
    '<path fill="var(--a-g2)" d="M41 28Q46 30 48 34L45 34.6Q43 31.6 40 31Z"/>' +
    '<path fill="var(--a-o)" d="M30 24.6L33 19L35.4 23.6ZM22.6 30L24 24L27.6 27.4ZM17.6 39.4L17 33.6L21.4 35.4Z"/>' +
    '<ellipse cx="29" cy="31" rx="4.4" ry="2.2" fill="var(--a-g1)" opacity="0.8" transform="rotate(-30 29 31)"/>' +
    '<ellipse cx="40.4" cy="8.6" rx="2.2" ry="1.2" fill="var(--a-w)" opacity="0.5" transform="rotate(-20 40.4 8.6)"/>',
  strawberry:
    '<ellipse cx="32" cy="60.4" rx="16" ry="2.2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-r2)" d="M32 58Q21 56 15 44Q10 32 15 24Q21 17 32 19Q43 17 49 24Q54 32 49 44Q43 56 32 58Z"/>' +
    '<path fill="var(--a-r)" d="M31 56Q21 54 16 43.4Q11.6 32.4 16 25Q21.4 18.6 31.6 20.4Q41.6 18.6 47 24.4Q51.4 31 47.4 42Q42 53.6 31 56Z"/>' +
    '<ellipse cx="22" cy="30" rx="4.6" ry="2.4" fill="var(--a-r1)" opacity="0.8" transform="rotate(-50 22 30)"/>' +
    '<ellipse cx="20.6" cy="28" rx="1.6" ry="0.9" fill="var(--a-w)" opacity="0.7" transform="rotate(-50 20.6 28)"/>' +
    '<path fill="var(--a-y)" d="M24 36L25 38.6L23.2 39ZM32 30L33 32.6L31.2 33ZM40 36L41 38.6L39.2 39ZM28 45L29 47.6L27.2 48ZM36 45L37 47.6L35.2 48ZM32 52L33 54.4L31.2 54.6ZM40.4 27L41.4 29.6L39.6 30ZM44 44L44.6 46.6L42.8 46.4ZM20 44L21.4 46.4L19.6 46.8Z"/>' +
    '<path fill="var(--a-g2)" d="M32 23Q24 26 17 22Q22 19 27 19Q22 15 24 12Q29 15 32 18Q35 15 40 12Q42 15 37 19Q42 19 47 22Q40 26 32 23Z"/>' +
    '<path fill="var(--a-g)" d="M32 21.6Q25 24.4 19 21.6Q23 19.6 28 18.6Q24 15.4 25.2 13.2Q29.4 15.6 32 17.6Q34.6 15.6 38.8 13.2Q40 15.4 36 18.6Q41 19.6 45 21.6Q39 24.4 32 21.6Z"/>' +
    '<path fill="var(--a-g2)" d="M31 18L30.4 6Q32.4 5.2 33.6 6L33 18Z"/><path fill="var(--a-g1)" d="M31 18L30.6 6.4Q31.6 6 32 6.2L32.2 18Z"/>',
  castle:
    '<ellipse cx="32" cy="60.6" rx="28" ry="2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-r2)" d="M22 14L28 4L34 14Z"/><path fill="var(--a-r)" d="M22 14L28 4L28 14Z"/>' +
    '<rect x="27.4" y="0.6" width="1.2" height="4" fill="var(--a-k2)"/><path fill="var(--a-r)" d="M28.6 0.8L33.6 2.4L28.6 4Z"/>' +
    '<rect x="22" y="14" width="12" height="20" fill="var(--a-e2)"/><rect x="22" y="14" width="7" height="20" fill="var(--a-e1)"/>' +
    '<path fill="var(--a-b2)" d="M4 26L10 15L16 26Z"/><path fill="var(--a-b)" d="M4 26L10 15L10 26Z"/>' +
    '<path fill="var(--a-b2)" d="M48 26L54 15L60 26Z"/><path fill="var(--a-b)" d="M48 26L54 15L54 26Z"/>' +
    '<rect x="5" y="26" width="10" height="33" fill="var(--a-e2)"/><rect x="5" y="26" width="6" height="33" fill="var(--a-e1)"/>' +
    '<rect x="49" y="26" width="10" height="33" fill="var(--a-e2)"/><rect x="49" y="26" width="6" height="33" fill="var(--a-e1)"/>' +
    '<path fill="var(--a-e2)" d="M15 30H18V27H22V30H26V27H30V30H34V27H38V30H42V27H46V30H49V59H15Z"/>' +
    '<path fill="var(--a-e1)" d="M15 30H18V27H22V30H26V27H30V30H32V59H15Z"/>' +
    '<path fill="var(--a-n2)" d="M25 59V48Q25 41 32 41Q39 41 39 48V59Z"/><path fill="var(--a-n)" d="M27 59V48.4Q27 43.6 32 43.4Q37 43.6 37 48.4V59Z"/>' +
    '<path fill="none" stroke="var(--a-n2)" stroke-width="1.2" d="M32 43.6V59"/>' +
    '<path fill="var(--a-b3)" d="M8 38Q8 34.6 10 34.6Q12 34.6 12 38V42H8ZM52 38Q52 34.6 54 34.6Q56 34.6 56 38V42H52ZM26 22Q26 19 28 19Q30 19 30 22V26H26ZM19 36Q19 33 21 33Q23 33 23 36V39H19ZM41 36Q41 33 43 33Q45 33 45 36V39H41Z"/>' +
    '<path fill="none" stroke="var(--a-e3)" stroke-width="1" opacity="0.6" d="M15 47H24M40 47H49M5 48H15M49 50H59M15 54H25"/>' +
    '<rect x="6" y="27" width="2" height="31" fill="var(--a-w)" opacity="0.5"/>',
  volcano:
    '<ellipse cx="32" cy="60.6" rx="29" ry="2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-n2)" d="M2 59L22 22Q32 18 42 22L62 59Z"/>' +
    '<path fill="var(--a-n)" d="M2 59L22 22Q27 20.4 31 20.6L24 59Z"/>' +
    '<path fill="var(--a-n1)" d="M21.6 23.6L12 41.6Q15 40 18.6 36Z" opacity="0.7"/>' +
    '<path fill="var(--a-r)" d="M22 22Q32 18 42 22Q40 25 38 24Q37 30 34 34Q33 28 31 26Q29 30 27.6 30Q27 25 25 24.6Q23.6 25 22 22Z"/>' +
    '<path fill="var(--a-o)" d="M24 22.6Q32 19.6 40 22.6Q38 23.6 36.4 23Q35.6 27 34 29Q33 25 31 24Q29.6 26 28.4 26Q28 23.6 26 23.4Z"/>' +
    '<path fill="var(--a-r)" d="M38 24Q41 34 44 40Q45 44 42 44Q40 38 37 30Z"/>' +
    '<path fill="var(--a-o)" d="M38.4 26Q40.4 33 42.6 38.4Q43 41 41.6 41Q39.8 36 38 30Z"/>' +
    '<circle cx="24" cy="12" r="6" fill="var(--a-e)"/><circle cx="33" cy="9" r="7" fill="var(--a-e)"/><circle cx="42" cy="12.6" r="5.4" fill="var(--a-e)"/>' +
    '<circle cx="31" cy="15.4" r="5" fill="var(--a-e)"/>' +
    '<circle cx="23" cy="11" r="4.6" fill="var(--a-e1)"/><circle cx="31.6" cy="7.6" r="5.4" fill="var(--a-e1)"/>' +
    '<circle cx="30.4" cy="5.6" r="1.8" fill="var(--a-w)" opacity="0.7"/>' +
    '<path fill="var(--a-y)" d="M29 20.4L31 16L33 20Z"/>' +
    '<path fill="var(--a-g2)" d="M2 59Q8 53 14 55Q20 52 26 56Q32 53 38 56Q46 52 52 55Q58 53 62 59Z"/>' +
    '<path fill="var(--a-g)" d="M2 59Q8 54.6 14 56.6Q20 54 26 57.4Q32 55 38 57.4Q46 54 52 56.6Q58 55 62 59Z"/>',
  ladybug:
    '<ellipse cx="32" cy="60.4" rx="22" ry="2.2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="none" stroke="var(--a-k)" stroke-width="2.2" d="M14 34L6 30M13 44L5 46M16 52L10 58M50 34L58 30M51 44L59 46M48 52L54 58"/>' +
    '<path fill="none" stroke="var(--a-k)" stroke-width="1.8" d="M26 12Q22 5 17 5M38 12Q42 5 47 5"/>' +
    '<circle cx="17" cy="5" r="2.2" fill="var(--a-k)"/><circle cx="47" cy="5" r="2.2" fill="var(--a-k)"/>' +
    '<ellipse cx="32" cy="18" rx="12" ry="9" fill="var(--a-k)"/>' +
    '<ellipse cx="27" cy="16.6" rx="2.6" ry="3" fill="var(--a-w)"/><ellipse cx="37" cy="16.6" rx="2.6" ry="3" fill="var(--a-w)"/>' +
    '<circle cx="27.6" cy="17.2" r="1.5" fill="var(--a-k)"/><circle cx="37.6" cy="17.2" r="1.5" fill="var(--a-k)"/>' +
    '<path fill="none" stroke="var(--a-w)" stroke-width="1.2" d="M29.6 21.6Q32 23.4 34.4 21.6"/>' +
    '<ellipse cx="32" cy="39" rx="21" ry="20" fill="var(--a-r2)"/>' +
    '<path fill="var(--a-r)" d="M31 21Q13 21 12 38Q12.4 54 31 58Z"/><path fill="var(--a-r)" d="M33 21Q51 21 51.6 37Q51 54 33 58Z"/>' +
    '<path fill="none" stroke="var(--a-k)" stroke-width="2" d="M32 20V59"/>' +
    '<circle cx="21" cy="32" r="4" fill="var(--a-k)"/><circle cx="43" cy="32" r="4" fill="var(--a-k)"/>' +
    '<circle cx="20" cy="46" r="3.6" fill="var(--a-k)"/><circle cx="44" cy="46" r="3.6" fill="var(--a-k)"/>' +
    '<circle cx="28" cy="52" r="2.6" fill="var(--a-k)"/><circle cx="36" cy="52" r="2.6" fill="var(--a-k)"/>' +
    '<ellipse cx="19" cy="25.6" rx="4.4" ry="2" fill="var(--a-w)" opacity="0.55" transform="rotate(-35 19 25.6)"/>',
  pumpkin:
    '<ellipse cx="32" cy="60.4" rx="26" ry="2.2" fill="var(--a-k)" opacity="0.1"/>' +
    '<ellipse cx="18" cy="39" rx="13" ry="18" fill="var(--a-o2)"/><ellipse cx="46" cy="39" rx="13" ry="18" fill="var(--a-o2)"/>' +
    '<ellipse cx="17.4" cy="38.4" rx="11.6" ry="16.8" fill="var(--a-o)"/><ellipse cx="45.4" cy="38.4" rx="11.6" ry="16.8" fill="var(--a-o)"/>' +
    '<ellipse cx="32" cy="39" rx="12" ry="19" fill="var(--a-o2)"/><ellipse cx="31.2" cy="38.4" rx="10.4" ry="17.8" fill="var(--a-o)"/>' +
    '<ellipse cx="27" cy="30" rx="2.6" ry="7" fill="var(--a-o1)" opacity="0.8"/>' +
    '<ellipse cx="12" cy="32" rx="2.2" ry="6" fill="var(--a-o1)" opacity="0.8" transform="rotate(12 12 32)"/>' +
    '<ellipse cx="11" cy="28.6" rx="1" ry="2.4" fill="var(--a-w)" opacity="0.6" transform="rotate(12 11 28.6)"/>' +
    '<path fill="var(--a-n2)" d="M29 22Q28.6 14 31 8Q34 6.6 36 8.6Q33.4 14 34.6 22Z"/>' +
    '<path fill="var(--a-n1)" d="M29.6 21Q29.4 14 31.4 9Q33 8.4 33.8 9Q31.6 14 32 21Z"/>' +
    '<path fill="var(--a-g)" d="M35 13Q42 8 49 11Q46 17 38 16Z"/><path fill="none" stroke="var(--a-g2)" stroke-width="1.2" d="M37 14.6Q43 12.4 47 11.6"/>' +
    '<path fill="none" stroke="var(--a-g2)" stroke-width="1.4" d="M28 16Q22 14 22 9Q22 6 25 6.6"/>',
  doughnut:
    '<ellipse cx="32" cy="58" rx="26" ry="3" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-t2)" d="M4 36Q4 20 32 20Q60 20 60 36Q60 54 32 54Q4 54 4 36ZM24 36Q24 40 32 40Q40 40 40 36Q40 32 32 32Q24 32 24 36Z"/>' +
    '<path fill="var(--a-t)" d="M5 34Q5 19 32 19Q59 19 59 34Q59 50 32 50Q5 50 5 34ZM24 34.4Q24 38.4 32 38.4Q40 38.4 40 34.4Q40 30.4 32 30.4Q24 30.4 24 34.4Z"/>' +
    '<path fill="var(--a-p2)" d="M8 32Q7 20 32 20Q57 20 56 32Q56.6 36 53 37Q50 40 46 37.6Q43 41 39 38Q40 36 40 34.4Q40 30.4 32 30.4Q24 30.4 24 34.4Q24 36 25 38Q21 41 18 37.6Q14 40 11 37Q7.4 36 8 32Z"/>' +
    '<path fill="var(--a-p)" d="M9 31Q8.6 21.4 32 21.4Q55.4 21.4 55 31Q55 34.4 52 35.4Q49.4 37.6 46 35.6Q43 38.6 39.4 36.4Q40 35.4 40 34.4Q40 29.6 32 29.4Q24 29.6 24 34.4Q24 35.4 24.6 36.4Q21 38.6 18 35.6Q14.6 37.6 12 35.4Q9 34.4 9 31Z"/>' +
    '<path fill="var(--a-t3)" d="M25 34.6Q25 32 32 31.6Q39 32 39 34.6Q36 33 32 33Q28 33 25 34.6Z"/>' +
    '<ellipse cx="17" cy="25" rx="5" ry="1.8" fill="var(--a-w)" opacity="0.55" transform="rotate(-12 17 25)"/>' +
    '<path fill="var(--a-y)" d="M14 28.4H18V30H14Z" transform="rotate(-30 16 29.2)"/><path fill="var(--a-b)" d="M22 24H26V25.6H22Z" transform="rotate(20 24 24.8)"/>' +
    '<path fill="var(--a-g)" d="M37 24H41V25.6H37Z" transform="rotate(-20 39 24.8)"/><path fill="var(--a-w)" d="M46 27H50V28.6H46Z" transform="rotate(40 48 27.8)"/>' +
    '<path fill="var(--a-y)" d="M44 32.6H48V34.2H44Z" transform="rotate(10 46 33.4)"/><path fill="var(--a-b)" d="M30 25.4H34V27H30Z" transform="rotate(-50 32 26.2)"/>' +
    '<path fill="var(--a-v)" d="M16 33H20V34.6H16Z" transform="rotate(25 18 33.8)"/><path fill="var(--a-g)" d="M50 31H54V32.6H50Z" transform="rotate(-35 52 31.8)"/>',
  guitar:
    '<ellipse cx="26" cy="61" rx="18" ry="2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-n3)" d="M47.6 4.6L56.6 3L60.4 7L58.6 16L52.6 13Z"/>' +
    '<path fill="var(--a-n2)" d="M48.6 5.4L56 4.2L59 7.4L57.6 14.4L52.8 12Z"/>' +
    '<circle cx="51" cy="6" r="1.4" fill="var(--a-e1)"/><circle cx="58.4" cy="10.6" r="1.4" fill="var(--a-e1)"/><circle cx="55" cy="4" r="1.2" fill="var(--a-e1)"/>' +
    '<path fill="var(--a-n3)" d="M49.6 11.6L52.4 14.4L33.4 33.4L30.6 30.6Z"/><path fill="var(--a-n2)" d="M49.6 11.6L51 13L32 32L30.6 30.6Z"/>' +
    '<path fill="var(--a-o2)" d="M36.4 30Q40 36 36 41Q33 43.6 33 48Q32 58 22 59Q11 60 7 54Q2 46 8 40Q12 36 16 36Q20 35.6 22.6 31Q28 25.6 36.4 30Z"/>' +
    '<path fill="var(--a-o)" d="M35.2 30.8Q38.2 36 34.6 40.6Q32 43.2 31.8 47.6Q31 56.4 22 57.4Q12.4 58.2 8.6 53.2Q4.2 46 9 41Q12.6 37.6 16.4 37.6Q20.6 37 23.4 32.4Q28.4 27.4 35.2 30.8Z"/>' +
    '<ellipse cx="14" cy="45" rx="4" ry="2" fill="var(--a-o1)" opacity="0.8" transform="rotate(-40 14 45)"/>' +
    '<circle cx="24.6" cy="40.6" r="4.6" fill="var(--a-n3)"/><circle cx="24.6" cy="40.6" r="3.4" fill="var(--a-k)"/>' +
    '<path fill="var(--a-n3)" d="M14.6 49.6L18.4 53.4L21.6 50.2L17.8 46.4Z"/>' +
    '<path fill="none" stroke="var(--a-w3)" stroke-width="0.6" d="M17 49.4L51 15.4M18.4 50.8L52.4 16.8"/>' +
    '<path fill="none" stroke="var(--a-y2)" stroke-width="0.8" d="M45.6 15.6L48.4 18.4M42.6 18.6L45.4 21.4M39.6 21.6L42.4 24.4"/>',
  trumpet:
    '<ellipse cx="32" cy="58" rx="27" ry="2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-y2)" d="M4 34H40L58 20V54L40 40H4Z"/>' +
    '<path fill="var(--a-y)" d="M4 34H40L57 21.4V36L40 37H4Z"/>' +
    '<ellipse cx="58" cy="37" rx="3.6" ry="17" fill="var(--a-y2)"/><ellipse cx="57.6" cy="37" rx="2.6" ry="15.6" fill="var(--a-y3)"/>' +
    '<ellipse cx="58.4" cy="37" rx="1.4" ry="12" fill="var(--a-o2)" opacity="0.6"/>' +
    '<rect x="2" y="33" width="5" height="8" rx="1.6" fill="var(--a-y2)"/><rect x="2" y="33" width="5" height="4" rx="1.6" fill="var(--a-y1)"/>' +
    '<path fill="none" stroke="var(--a-y2)" stroke-width="3" d="M14 40Q14 50 24 50Q34 50 34 40"/>' +
    '<path fill="none" stroke="var(--a-y)" stroke-width="1.6" d="M14.6 40.6Q14.6 48.6 24 48.6Q33.4 48.6 33.4 40.6"/>' +
    '<rect x="17" y="23" width="3.4" height="11" fill="var(--a-y2)"/><rect x="22.4" y="23" width="3.4" height="11" fill="var(--a-y2)"/><rect x="27.8" y="23" width="3.4" height="11" fill="var(--a-y2)"/>' +
    '<rect x="17" y="23" width="1.6" height="11" fill="var(--a-y1)"/><rect x="22.4" y="23" width="1.6" height="11" fill="var(--a-y1)"/><rect x="27.8" y="23" width="1.6" height="11" fill="var(--a-y1)"/>' +
    '<ellipse cx="18.7" cy="22" rx="3" ry="1.6" fill="var(--a-e1)"/><ellipse cx="24.1" cy="22" rx="3" ry="1.6" fill="var(--a-e1)"/><ellipse cx="29.5" cy="22" rx="3" ry="1.6" fill="var(--a-e1)"/>' +
    '<rect x="9" y="34.6" width="28" height="1.4" rx="0.7" fill="var(--a-w)" opacity="0.6"/>',
  whale:
    '<ellipse cx="32" cy="60.4" rx="26" ry="2" fill="var(--a-k)" opacity="0.1"/>' +
    '<path fill="var(--a-b2)" d="M48 38Q55 30 58 22Q62 24 61 30Q63 32 62 36Q58 36 54 38Q54 44 50 48Z"/>' +
    '<path fill="var(--a-b2)" d="M4 40Q3 22 24 21Q42 20 50 36Q54 46 46 52Q36 58 22 57Q5 55 4 40Z"/>' +
    '<path fill="var(--a-b)" d="M5 39Q4.6 23 24 22.4Q40.6 21.6 48.4 36Q52 44.4 45 49.6Q36 55 22 55Q6.4 53.4 5 39Z"/>' +
    '<path fill="var(--a-b)" d="M49 37Q55.4 30 58 23.6Q60.6 25.4 59.8 30Q61.6 32 61 35Q57.6 35 53 37.4Z"/>' +
    '<path fill="var(--a-w2)" d="M6 44Q16 47 30 46Q42 45 49.6 40Q50 47 44 51Q35 55.6 22 55Q9 54 6 44Z"/>' +
    '<path fill="none" stroke="var(--a-b3)" stroke-width="1" opacity="0.5" d="M14 48.4H42M18 51.6H38"/>' +
    '<path fill="var(--a-b2)" d="M26 46Q30 52 25 56Q21 52 23 46Z"/>' +
    '<ellipse cx="14" cy="36" rx="2.6" ry="3" fill="var(--a-k)"/><circle cx="13.2" cy="35" r="1" fill="var(--a-w)"/>' +
    '<path fill="none" stroke="var(--a-b3)" stroke-width="1.4" d="M5.4 41.6Q10 44 15 42"/>' +
    '<ellipse cx="18.4" cy="41" rx="2.4" ry="1.4" fill="var(--a-p)" opacity="0.6"/>' +
    '<ellipse cx="16" cy="27" rx="6" ry="2.4" fill="var(--a-b1)" opacity="0.8" transform="rotate(-15 16 27)"/>' +
    '<path fill="none" stroke="var(--a-c)" stroke-width="2" d="M24 20Q24 14 21 9M24 20Q24 13 27 9M24 20V10"/>' +
    '<circle cx="20.6" cy="8.4" r="2" fill="var(--a-c1)"/><circle cx="27.4" cy="8.4" r="2" fill="var(--a-c1)"/><circle cx="24" cy="8" r="2.2" fill="var(--a-c1)"/>',
  crayon:
    '<ellipse cx="30" cy="58" rx="20" ry="2.2" fill="var(--a-k)" opacity="0.1"/>' +
    '<rect x="13" y="24" width="43" height="16" rx="2.4" fill="var(--a-r2)" transform="rotate(-45 32 32)"/>' +
    '<rect x="13" y="24" width="43" height="10" rx="2.4" fill="var(--a-r)" transform="rotate(-45 32 32)"/>' +
    '<path fill="var(--a-r3)" d="M14 26L2 32L14 38Z" transform="rotate(-45 32 32)"/><path fill="var(--a-r2)" d="M14 26L2 32H14Z" transform="rotate(-45 32 32)"/>' +
    '<path fill="var(--a-r3)" d="M5.4 30.4L2 32L5.4 33.6Z" transform="rotate(-45 32 32)"/>' +
    '<rect x="21" y="24" width="27" height="16" fill="var(--a-r1)" transform="rotate(-45 32 32)"/>' +
    '<rect x="21" y="24" width="27" height="6" fill="var(--a-w)" opacity="0.35" transform="rotate(-45 32 32)"/>' +
    '<rect x="23" y="24" width="2.4" height="16" fill="var(--a-r3)" transform="rotate(-45 32 32)"/><rect x="43.6" y="24" width="2.4" height="16" fill="var(--a-r3)" transform="rotate(-45 32 32)"/>' +
    '<rect x="49" y="26" width="5" height="2.4" rx="1.2" fill="var(--a-w)" opacity="0.5" transform="rotate(-45 32 32)"/>' +
    '<rect x="15" y="26" width="5" height="2" rx="1" fill="var(--a-w)" opacity="0.5" transform="rotate(-45 32 32)"/>'
});
