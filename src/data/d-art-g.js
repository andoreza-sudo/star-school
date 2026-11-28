/* RELA-PICS (review fix 4), part teaches (the Spanish and Discover maps load it; until then the old emoji shows). DESIGN_SYSTEM 6.5.
   Discover: a US flag (13 stripes, 7 red, 6 white) for "The flag of the United States has ___ stripes" and a compass rose with no
   letters (north red) for "On a compass, the letter N stands for ___".
   Spanish: la clase a chalkboard (was a bell), nuevo a new shoe (the NEW sign), viejo a worn shoe (an old man: rude in Mexico), bajo
   a short person beside a tall one (an arrow), por favor open hands (a face read as sad); set as the items' art names here.
   Icons of the lazy worlds: seedling (Seeds & Plants), cloud (Weather Watch), volcano (Volcano Ridge), added to the sprite. */
Object.assign(ART, {
  'us-flag':
    '<rect x="8" y="5" width="4" height="56" rx="2" fill="var(--a-n2)"/><rect x="8" y="5" width="2.6" height="56" rx="1.3" fill="var(--a-n)"/>' +
    '<circle cx="10" cy="5" r="3" fill="var(--a-y)"/><rect x="14" y="8" width="46" height="32.5" fill="var(--a-w3)"/>' +
    '<rect x="14" y="8" width="45" height="31.5" fill="var(--a-w)"/>' +
    '<path fill="var(--a-r)" d="M14 8H60V10.5H14ZM14 13H60V15.5H14ZM14 18H60V20.5H14ZM14 23H60V25.5H14ZM14 28H60V30.5H14ZM14 33H60V35.5H14ZM14 38H60V40.5H14Z"/>' +
    '<rect x="14" y="8" width="22" height="17.5" fill="var(--a-b2)"/>' +
    '<circle cx="17.5" cy="11" r="1.1" fill="var(--a-w)"/><circle cx="22.5" cy="11" r="1.1" fill="var(--a-w)"/><circle cx="27.5" cy="11" r="1.1" fill="var(--a-w)"/>' +
    '<circle cx="32.5" cy="11" r="1.1" fill="var(--a-w)"/><circle cx="20" cy="15" r="1.1" fill="var(--a-w)"/><circle cx="25" cy="15" r="1.1" fill="var(--a-w)"/>' +
    '<circle cx="30" cy="15" r="1.1" fill="var(--a-w)"/><circle cx="17.5" cy="19" r="1.1" fill="var(--a-w)"/><circle cx="22.5" cy="19" r="1.1" fill="var(--a-w)"/>' +
    '<circle cx="27.5" cy="19" r="1.1" fill="var(--a-w)"/><circle cx="32.5" cy="19" r="1.1" fill="var(--a-w)"/><circle cx="20" cy="23" r="1.1" fill="var(--a-w)"/>' +
    '<circle cx="25" cy="23" r="1.1" fill="var(--a-w)"/><circle cx="30" cy="23" r="1.1" fill="var(--a-w)"/>' +
    '<rect x="14" y="38" width="46" height="2.5" fill="var(--a-r2)"/><rect x="4" y="58" width="12" height="4" rx="2" fill="var(--a-e)"/>',
  'compass-rose':
    '<circle cx="33" cy="33" r="28" fill="var(--a-n2)"/><circle cx="31.6" cy="31.6" r="26.6" fill="var(--a-n)"/>' +
    '<circle cx="32" cy="32" r="22" fill="var(--a-m3)"/><circle cx="31.4" cy="31.4" r="21" fill="var(--a-m1)"/>' +
    '<path fill="var(--a-e1)" d="M32 32L45 19L38 34ZM32 32L19 45L26 30ZM32 32L45 45L30 38ZM32 32L19 19L34 26Z"/>' +
    '<path fill="var(--a-e2)" d="M32 32L52 32L36 36.5ZM32 32L12 32L28 27.5ZM32 32L32 52L27.5 36Z"/>' +
    '<path fill="var(--a-e)" d="M32 32L52 32L36 27.5ZM32 32L12 32L28 36.5ZM32 32L32 52L36.5 36Z"/>' +
    '<path fill="var(--a-r)" d="M32 9L36.5 28L32 32Z"/><path fill="var(--a-r2)" d="M32 9L27.5 28L32 32Z"/>' +
    '<circle cx="32" cy="32" r="3" fill="var(--a-k2)"/><circle cx="31.2" cy="31.2" r="1" fill="var(--a-w)"/>' +
    '<rect x="30.6" y="3" width="2.8" height="4" rx="1.4" fill="var(--a-y)"/>',
});

const ARTSHOE=(s,u)=>'<path fill="var(--a-'+s+')" d="M5 48H58Q60 48 60 52.5V55.5Q60 60 57 60H8Q5 60 5 55.5Z"/><path fill="var(--a-'+u+'2)" d="M8 48V30Q8 24 12 24H22L28 33L42 36Q56 39 58 48Z"/><path fill="var(--a-'+u+')" d="M9.4 45V30.6Q9.4 26.4 12.4 26.4H21.4L27.2 34.8L41.6 38.1Q52 40.5 55 45Z"/>';
Object.assign(ART, {
  chalkboard: '<rect x="6" y="8" width="52" height="38" rx="3" fill="var(--a-n2)"/><rect x="6" y="7" width="50" height="36" rx="3" fill="var(--a-n)"/><rect x="10" y="11" width="42" height="28" rx="1.5" fill="var(--a-g3)"/><path fill="none" stroke="var(--a-w)" stroke-width="2" d="M14 31L19 18L24 31M16 26H22M29 18V31H33.5Q38 31 38 28T33.5 25H29M29 18H33Q37 18 37 21.5T33 25M46 20Q41 17 41 24.5T46 30"/><rect x="8" y="42" width="48" height="4" rx="2" fill="var(--a-n3)"/><rect x="42" y="40" width="7" height="2.6" rx="1" fill="var(--a-w)"/><rect x="8" y="50" width="20" height="4" rx="1.5" fill="var(--a-o)"/><rect x="36" y="50" width="20" height="4" rx="1.5" fill="var(--a-o)"/><path fill="none" stroke="var(--a-o3)" stroke-width="2.4" d="M11 54V61M25 54V61M39 54V61M53 54V61"/>',
  short: '<rect x="3" y="58" width="58" height="3.4" rx="1.7" fill="var(--a-e2)"/><circle cx="17" cy="9" r="6.5" fill="var(--a-e1)"/><rect x="9" y="17" width="16" height="41" rx="8" fill="var(--a-e1)"/><circle cx="44" cy="28" r="8.4" fill="var(--a-s2)"/><circle cx="43.2" cy="27.2" r="7.6" fill="var(--a-s)"/><rect x="33" y="38" width="22" height="20" rx="10" fill="var(--a-o2)"/><rect x="33" y="38" width="20" height="18.4" rx="9" fill="var(--a-o)"/><ellipse cx="39.6" cy="25" rx="2" ry="3" fill="var(--a-s1)"/><ellipse cx="38" cy="44" rx="2" ry="4" fill="var(--a-o1)"/>',
  please: '<path fill="var(--a-b2)" d="M10 50H26V60H10ZM38 50H54V60H38Z"/><path fill="var(--a-s2)" d="M4 26Q2 52 31 52H33Q62 52 60 26Q48 34 32 34T4 26Z"/><path fill="var(--a-s)" d="M6 27Q5 48 31 49V35Q16 35 6 27ZM58 27Q59 48 33 49V35Q48 35 58 27Z"/><path fill="var(--a-s)" d="M4 26Q2 16 7 15Q11 16 11 29ZM60 26Q62 16 57 15Q53 16 53 29Z"/><path fill="none" stroke="var(--a-s3)" stroke-width="1.6" d="M32 36V50M14 40Q20 44 26 44M50 40Q44 44 38 44M4.6 20H9M4.4 24H9.6M59.4 20H55M59.6 24H54.4"/><ellipse cx="14" cy="34" rx="3" ry="1.8" fill="var(--a-s1)" opacity="0.7"/>',
  'shoe-new': ARTSHOE('w3', 'b') + '<path fill="none" stroke="var(--a-w)" stroke-width="2" d="M24 30L27 34.5M28 27L31 31.5M32 30L35 34.5"/><rect x="12" y="30" width="6" height="3" rx="1" fill="var(--a-b1)"/><path fill="var(--a-y)" d="M50 6L52 13L59 15L52 17L50 24L48 17L41 15L48 13Z"/><path fill="var(--a-y)" d="M34 10L35 14L39 15L35 16L34 20L33 16L29 15L33 14Z"/>',
  'shoe-old': ARTSHOE('e2', 'n') + '<path fill="none" stroke="var(--a-e3)" stroke-width="1.6" d="M24 49.5L26 58.5M44 49.5L42 58.5"/><rect x="33" y="37.5" width="8" height="9" rx="1" fill="var(--a-t1)" transform="rotate(-8 37 42)"/><ellipse cx="50" cy="43.5" rx="3" ry="2.7" fill="var(--a-n3)"/><path fill="none" stroke="var(--a-n3)" stroke-width="1.6" d="M13 34.5L17 37.5M15 40.5L18 42M24 30L27 34.5Q30 45 26 54"/>',
});
try { // ES_UNITS is in the data file, loaded first (a test harness that reads every file at once may not have it yet)
  for (const u of ES_UNITS) for (const it of u.items) {
    const a = {clase: 'chalkboard', nuevo: 'shoe-new', viejo: 'shoe-old', bajo: 'short', 'por favor': 'please'}[it[0]];
    if (a) it[4] = a;
  }
} catch (e) {}
Object.assign(ICONS, {
  seedling: '<path fill="var(--ic3,currentColor)" opacity=".4" d="M3 21.5q9-6 18 0Z"/><path d="M11 19V12h2v7ZM12 12.4C12 7 8.5 4.6 2.6 4.8C2.6 10 6.6 13 12 12.4ZM12 11C12 6.6 15 3.6 21.4 3.8C21.4 9.2 17.4 11.6 12 11Z"/>',
  cloud: '<circle fill="var(--ic3,currentColor)" opacity=".4" cx="16.5" cy="7" r="5"/><path d="M7 19.5a5 5 0 0 1-.6-10A6.2 6.2 0 0 1 18 9a5.2 5.2 0 0 1-.6 10.5Z"/>',
  volcano: '<path fill="var(--ic3,currentColor)" opacity=".4" d="M8.6 8.4C6.6 4.6 10.4 2.4 12.2 4.6C13.6 1.6 19 3 17 6.6C15.6 8.4 10.6 9.4 8.6 8.4Z"/>' +
    '<path d="M1.6 21.6L8 10H10.6L12 12.4L13.4 10H16L22.4 21.6Z"/>',
});
try {
  const sp = document.getElementById('ico-sprite');
  for (const n of ['seedling', 'cloud', 'volcano']) if (sp && !document.getElementById('i-' + n)) sp.insertAdjacentHTML('beforeend', `<symbol id="i-${n}" viewBox="0 0 24 24" fill="currentColor" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]}</symbol>`);
} catch (e) {}
