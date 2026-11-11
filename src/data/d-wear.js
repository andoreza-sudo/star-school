/* Wearable drawings (P4-07; DESIGN_SYSTEM.md 6.4). Code and rules: src/js/17-wear.js (helpers wVol, wBall, wLn, wHi, wStar ...; rwStarD / rwSpark from 18-reward-art.js).
   WEAR[id] = markup on the 64 grid, keyed by the item id the save stores (the emoji in 42-paths.js SHOP and BPRIZE).
   Hats: bottom centre (32, 60) sits on the head. Toys: the hand holds (32, 32). WEAR_EMB[id] = a prize emblem on the 64 grid,
   centred on (32, 32), shown on a gold rosette (the boss-prize hats here, and RW.badge on the boss intro).
   This file only builds strings while it loads (the helpers are code, loaded before it). */
// item names, shown and spoken on the shop cards
var WEAR_NAME = {
  '🧢': 'Cap', '🎀': 'Bow', '🎩': 'Top hat', '⛑️': 'Helmet', '🎓': 'Grad cap', '👑': 'Crown',
  '🎈': 'Balloon', '🍭': 'Lollipop', '⚽': 'Ball', '🧸': 'Teddy', '🪁': 'Kite', '🪄': 'Magic wand', '🏆': 'Trophy',
  '🌼': 'Daisy badge', '⭐': 'Star badge', '🎉': 'Party badge', '🪐': 'Planet badge', '🌈': 'Rainbow badge', '🔥': 'Fire badge',
  '💎': 'Gem badge', '🍀': 'Clover badge', '🌙': 'Moon badge', '⚡': 'Lightning badge', '🍩': 'Donut badge', '🎵': 'Music badge',
};
var WEAR = WEAR || {};
var WEAR_EMB = WEAR_EMB || {};

// ---- hats ----
// cap: a blue cap worn a little sideways, the peak to the right, a gold star on the front
WEAR['🧢'] = wContact(21) +
  wVol('M10 58C9 38 19 25 32 25C45 25 55 38 54 58Q32 64 10 58Z', 'b2', 'b') +
  wLn('M32 27.5Q31 42 32 58M21 31Q18.5 44 20 59M43 31Q45.5 44 44 59', 'b2', 1.6, .7) +
  wHi(19.5, 39, 3.4, 8, 18, 'b1', .9) +
  `<path ${wF('b3')} d="M11 54Q32 60 53.5 54L54 58Q32 64 10 58Z" opacity=".55"/>` +
  `<path ${wF('b3')} d="M37 55Q51 51 61.5 55.5Q63.5 60 58.5 62Q46 65 35 62Z"/>` +
  `<path ${wF('b2')} d="M36 54Q50 49.5 60.5 53.5Q62.5 57.5 58 59.5Q46 62 34.5 59.5Z"/>` +
  `<path ${wF('b')} d="M37 53.5Q49 49.5 58.5 52.5Q55 54.5 46 55.5Q40 56.5 36 56Z"/>` +
  wStar(31, 43, 7.2) +
  `<circle cx="32" cy="25.5" r="3.6" ${wF('b2')}/><circle cx="31.3" cy="24.8" r="2.7" ${wF('b')}/>`;

// bow: a big red bow with a knot and two short tails
WEAR['🎀'] = (() => {
  const loop = 'M30 46C22 35 7 30 4.5 39.5C2.5 48 7 58.5 14.5 58C21 57.5 27 53 30 49.5Z';
  const fold = 'M29 47.5C24 42 16 40 14 43.5C17.5 46 23 48.5 29 50Z';
  const tail = 'M29.5 51L19 63.5L24.5 62.5L26.5 67L33 54Z';
  return wVol(tail, 'r3', 'r2', .9) + wVol(wFlip(tail), 'r3', 'r2', .9) +
    wVol(loop, 'r2', 'r') + wVol(wFlip(loop), 'r2', 'r') +
    `<path ${wF('r3')} d="${fold}" opacity=".7"/><path ${wF('r3')} d="${wFlip(fold)}" opacity=".7"/>` +
    wLn('M25 41.5C18 36.5 10.5 34.5 8.5 39', 'r1', 2.4, .9) + wLn('M39 41.5C45 37 52 35.5 55 37.5', 'r1', 2.2, .6) +
    `<ellipse cx="32.4" cy="49.6" rx="6.6" ry="7.6" ${wF('r2')}/><ellipse cx="31.6" cy="48.6" rx="5.6" ry="6.6" ${wF('r')}/>` +
    wHi(29.8, 45.8, 2, 2.8, 20, 'r1', .95);
})();

// top hat: ink, a red band, the top face catching the light
WEAR['🎩'] = wContact(23) +
  wVol('M5 56.5Q5 50 32 50Q59 50 59 56.5Q59 62.5 32 62.5Q5 62.5 5 56.5Z', 'k', 'k2', .95) +
  `<path ${wF('k')} d="M14.5 53L16.5 24Q32 19.5 47.5 24L49.5 53Q32 58.5 14.5 53Z"/>` +
  `<path ${wF('k2')} d="M14.5 52L16.5 24Q31 20 44.5 23L46 53.5Q30 56.5 14.5 52Z"/>` +
  `<ellipse cx="32" cy="24" rx="15.5" ry="4" ${wF('e3')}/><ellipse cx="31" cy="23.7" rx="12" ry="2.6" ${wF('e2')} opacity=".5"/>` +
  `<path ${wF('r2')} d="M15.2 42.5Q32 47.5 48.8 42.5L49.5 53Q32 58.5 14.5 53Z"/>` +
  `<path ${wF('r')} d="M15.2 42.5Q31 46.8 45.5 43.3L46 51.5Q30 55.5 14.6 51.3Z"/>` +
  wLn('M17.5 45.2Q24 47.2 31 47.4', 'r1', 1.8, .9) +
  wLn('M21 28.5L20 40', 'e2', 3, .45) + wLn('M7 57Q8 53 18 52', 'e2', 2.2, .5);

// helmet: a red rescue helmet with a white cross
WEAR['⛑️'] = wContact(23) +
  wVol('M9 57C9 35 19 22 32 22C45 22 55 35 55 57Q32 61 9 57Z', 'r2', 'r') +
  `<path ${wF('r3')} d="M4.5 56.5Q32 50.5 59.5 56.5Q61.5 61.5 57 62.8Q32 58 7 62.8Q2.5 61.5 4.5 56.5Z"/>` +
  `<path ${wF('r2')} d="M5 55.8Q32 50 59 55.8Q59.5 58.5 56.5 59.6Q32 55 7.5 59.6Q4.5 58.5 5 55.8Z"/>` +
  `<rect x="28.4" y="29.4" width="8.4" height="21" rx="1.6" ${wF('w3')}/><rect x="22.4" y="35.6" width="20.4" height="8.4" rx="1.6" ${wF('w3')}/>` +
  `<rect x="27.6" y="28.6" width="8.2" height="20.6" rx="1.6" ${wF('w')}/><rect x="21.6" y="34.8" width="20.2" height="8.2" rx="1.6" ${wF('w')}/>` +
  wHi(18.5, 35, 3.6, 8.5, 28, 'r1', .9) + wHi(23, 27.5, 1.8, 2.6, 40, 'w', .7);

// graduation cap: an ink board and cap, a gold button and tassel
WEAR['🎓'] = wContact(17) +
  wVol('M15.5 38L15.5 54Q32 62.5 48.5 54L48.5 38Z', 'k', 'k2', .94) +
  `<path ${wF('k')} d="M1.5 33L32 21L62.5 33L62.5 36.5L32 48.5L1.5 36.5Z"/>` +
  `<path ${wF('k2')} d="M1.5 33L32 21L62.5 33L32 45Z"/>` +
  `<path ${wF('e3')} d="M5.5 32.6L32 22.4L32 32.8Z" opacity=".6"/>` +
  wLn('M32 33Q45 34.5 53 37.5L53 47', 'y2', 2.4) +
  `<path ${wF('y2')} d="M50 46.5Q53 44.5 56 46.5L57.5 58Q53 60.5 48.5 58Z"/><path ${wF('y')} d="M50.4 46.4Q52.6 45.2 54.8 46.4L55.6 56.6Q52.4 58.4 49.6 56.6Z"/>` +
  wLn('M51.6 48.5L51.2 55.5', 'y1', 1.6, .9) + wLn('M6.5 33.2L30 24.4', 'e3', 2, .7) +
  `<circle cx="32" cy="33" r="3" ${wF('y2')}/><circle cx="31.4" cy="32.4" r="2.2" ${wF('y')}/><circle cx="30.8" cy="31.8" r=".8" ${wF('y1')}/>`;

// crown: gold, five points with balls, red and blue gems
WEAR['👑'] = wContact(22) +
  wVol('M10 58L7.5 28L20.5 39L32 23L43.5 39L56.5 28L54 58Q32 62.5 10 58Z', 'y2', 'y') +
  `<path ${wF('y3')} d="M10.5 50Q32 54.5 53.5 50L54 58Q32 62.5 10 58Z"/>` +
  `<path ${wF('y2')} d="M10.4 49Q32 53.2 53.6 49L53.8 54.6Q32 58.8 10.3 54.6Z"/>` +
  wBall(7.5, 26.5, 3.8, 'y', 0) + wBall(32, 20.5, 4.2, 'y', 0) + wBall(56.5, 26.5, 3.8, 'y', 0) +
  wLn('M11.5 33L12.8 47', 'y1', 2.4, .9) + wLn('M27 32.5L30.5 27.5', 'y1', 2, .8) +
  `<ellipse cx="32.4" cy="52.4" rx="4.6" ry="3.6" ${wF('r3')}/><ellipse cx="31.8" cy="51.8" rx="3.8" ry="2.9" ${wF('r')}/>` +
  `<circle cx="30.6" cy="50.9" r="1.2" ${wF('w')} opacity=".8"/>` +
  `<circle cx="19.4" cy="51.5" r="2.8" ${wF('b2')}/><circle cx="18.9" cy="51" r="2.1" ${wF('b')}/>` +
  `<circle cx="44.6" cy="51.5" r="2.8" ${wF('b2')}/><circle cx="44.1" cy="51" r="2.1" ${wF('b')}/>`;

// ---- toys (the hand holds 32, 32) ----
// balloon: red, floating up and to the right on a string
WEAR['🎈'] = wLn('M38.5 25C34 28 37 31 33 34C29.5 37 33.5 40 31 44', 'e3', 1.6) +
  wVol('M38.5 -16C48.5 -16 55.5 -7.5 55.5 2.5C55.5 13 47 21.5 38.5 22.5C30 21.5 21.5 13 21.5 2.5C21.5 -7.5 28.5 -16 38.5 -16Z', 'r2', 'r', .93) +
  `<path ${wF('r2')} d="M35.5 25.5L38.5 21.5L41.5 25.5Z"/>` +
  wHi(29.5, -2.5, 4, 8, 22, 'r1', .95) + wHi(30.5, -9.5, 2, 2.6, 30, 'w', .85);

// lollipop: a pink and white swirl on a white stick
WEAR['🍭'] = (() => {
  let sp = '';
  for (let i = 0, n = 36; i <= n; i++) {
    const t = i / n * 4.6 * Math.PI, r = 1.2 + t * .92;
    sp += (i ? 'L' : 'M') + wr1(32 + Math.cos(t) * r) + ' ' + wr1(2 + Math.sin(t) * r);
  }
  return `<path ${wF('w3')} d="M30.2 12L34.2 12L34.2 47Q32.2 49.5 30.2 47Z"/><path ${wF('w')} d="M30.2 12L32.8 12L32.8 47Q31.5 48.4 30.2 47Z"/>` +
    `<circle cx="32.6" cy="2.6" r="17" ${wF('p3')}/><circle cx="31.8" cy="1.8" r="15.9" ${wF('p')}/>` +
    wLn(sp, 'w', 3.2) + wLn('M19.5 11.5Q25 17.5 33.5 17.5Q43 17 47.5 8', 'p2', 3, .55) +
    wHi(23.5, -6, 2.6, 4.6, 40, 'w', .8);
})();

// ball: a white football with ink patches (the ones at the edge are cut by the ball's outline)
WEAR['⚽'] = (() => {
  const X = 31, Y = 29, RB = 13;
  const pent = (x, y, r, a) => {
    let d = '';
    for (let i = 0; i < 5; i++) {
      const q = (a + i * 72) * Math.PI / 180;
      let px = x + Math.cos(q) * r, py = y + Math.sin(q) * r;
      const dx = px - X, dy = py - Y, l = Math.hypot(dx, dy);
      if (l > RB) { px = X + dx / l * RB; py = Y + dy / l * RB; } // keep the patch inside the ball
      d += (i ? 'L' : 'M') + wr1(px) + ' ' + wr1(py);
    }
    return d + 'Z';
  };
  let rim = '', lines = '';
  for (let i = 0; i < 5; i++) {
    const v = (-90 + i * 72) * Math.PI / 180, q = (-54 + i * 72) * Math.PI / 180;
    lines += `M${wr1(X + Math.cos(v) * 4.4)} ${wr1(Y + Math.sin(v) * 4.4)}L${wr1(X + Math.cos(v) * 13)} ${wr1(Y + Math.sin(v) * 13)}`;
    rim += `<path ${wF('k2')} stroke="var(--a-k2)" stroke-width="1.2" stroke-linejoin="round" d="${pent(X + Math.cos(q) * 13.6, Y + Math.sin(q) * 13.6, 4.6, -54 + i * 72 + 180)}"/>`;
  }
  return `<circle cx="32" cy="30" r="16" ${wF('w3')}/><circle cx="32" cy="30.2" r="14.9" ${wF('w2')}/>` +
    `<circle cx="${X}" cy="${Y}" r="13.6" ${wF('w')}/>` + wLn(lines, 'w3', 1.3) + rim +
    `<path ${wF('k2')} stroke="var(--a-k2)" stroke-width="1.4" stroke-linejoin="round" d="${pent(X, Y, 4.8, -90)}"/>` +
    wHi(24.6, 21.6, 2.2, 3.4, 40, 'w', 1);
})();

// teddy: a brown bear with a red bow tie
WEAR['🧸'] = wBall(22.5, 7.5, 5, 'n', 0) + wBall(41.5, 7.5, 5, 'n', 0) +
  `<circle cx="22.4" cy="7.6" r="2.4" ${wF('t')}/><circle cx="41.4" cy="7.6" r="2.4" ${wF('t')}/>` +
  wVol('M32 25C42 25 45 32 45 39C45 47 39 51 32 51C25 51 19 47 19 39C19 32 22 25 32 25Z', 'n2', 'n') +
  `<ellipse cx="31.4" cy="40" rx="6.4" ry="7" ${wF('t')}/>` +
  wVol('M16 30C12.5 31 11.5 37 14 40C16 42.5 19.5 40.5 20.5 37Z', 'n2', 'n', .9) +
  wVol(wFlip('M16 30C12.5 31 11.5 37 14 40C16 42.5 19.5 40.5 20.5 37Z'), 'n2', 'n', .9) +
  `<ellipse cx="24.8" cy="50" rx="6" ry="4.6" ${wF('n2')}/><ellipse cx="24.2" cy="49.4" rx="5.2" ry="3.9" ${wF('n')}/><ellipse cx="24.4" cy="50.3" rx="2.8" ry="2.2" ${wF('t')}/>` +
  `<ellipse cx="39.6" cy="50" rx="6" ry="4.6" ${wF('n2')}/><ellipse cx="39" cy="49.4" rx="5.2" ry="3.9" ${wF('n')}/><ellipse cx="39.2" cy="50.3" rx="2.8" ry="2.2" ${wF('t')}/>` +
  wBall(32, 16.5, 11.6, 'n', 0) +
  `<ellipse cx="32" cy="21" rx="5.6" ry="4.2" ${wF('t1')}/><ellipse cx="32" cy="18.8" rx="2.3" ry="1.7" ${wF('k')}/>` +
  wLn('M30 23.4Q32 24.8 34 23.4', 'k', 1.4) +
  `<circle cx="27.2" cy="14.4" r="1.8" ${wF('k')}/><circle cx="36.8" cy="14.4" r="1.8" ${wF('k')}/>` +
  `<circle cx="26.7" cy="13.8" r=".7" ${wF('w')}/><circle cx="36.3" cy="13.8" r=".7" ${wF('w')}/>` +
  `<path ${wF('r2')} d="M32 28.5L25.5 25L25.5 32ZM32 28.5L38.5 25L38.5 32Z"/><path ${wF('r')} d="M31.5 28.2L26.2 25.5L26.2 30.6ZM32.5 28.2L37.6 25.5L37.6 30.6Z"/>` +
  `<circle cx="32" cy="28.5" r="2.2" ${wF('r2')}/>`;

// kite: a red and yellow diamond kite with a tail of blue bows; the string runs down to the hand
WEAR['🪁'] = (() => {
  const T = [46, -22], R = [62, -5], B = [46, 16], L = [30, -5], C = [46, -5];
  const tri = (a, b, c, f) => `<path ${wF(f)} d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}L${c[0]} ${c[1]}Z"/>`;
  const bow = (x, y) => `<path ${wF('b2')} d="M${x} ${y}L${x - 4} ${y - 3}L${x - 4} ${y + 3}ZM${x} ${y}L${x + 4} ${y - 3}L${x + 4} ${y + 3}Z"/>` +
    `<path ${wF('b')} d="M${x} ${y}L${x - 3.4} ${y - 2.4}L${x - 3.4} ${y + 1.6}ZM${x} ${y}L${x + 3.4} ${y - 2.4}L${x + 3.4} ${y + 1.6}Z"/>`;
  return wLn('M44.5 -2Q35 14 33 33', 'e3', 1.5) + wLn('M46 16Q53 22 48.5 28.5Q44 35 50 41', 'e3', 1.5) +
    bow(49.5, 25) + bow(47, 36) +
    `<path ${wF('k')} d="M46 -23.5L63.6 -5L46 17.6L28.4 -5Z" opacity=".15"/>` +
    tri(T, C, L, 'y') + tri(T, R, C, 'r') + tri(L, C, B, 'r2') + tri(C, R, B, 'y2') +
    wLn('M46 -21L46 15M31.5 -5L60.5 -5', 'n2', 1.6) + wLn('M38 -11.5L43.5 -17.5', 'y1', 2.2, .9);
})();

// magic wand: a purple wand with a gold star and sparkles
WEAR['🪄'] = `<path ${wF('v3')} d="M23.6 46.4L36.6 9.6L40.4 11L27.4 47.8Q25 49.4 23.6 46.4Z"/>` +
  `<path ${wF('v')} d="M23.6 45.6L36.6 9.6L38.8 10.4L26 46.6Q24.6 47.6 23.6 45.6Z"/>` +
  wLn('M30.5 27L34.4 28.4M27.8 34.6L31.7 36', 'w', 2, .75) +
  wStar(40, 2, 13.5) + rwSpark(55, 13, 4.4, 'y1') + rwSpark(23, -8, 3.6, 'y1') + rwSpark(53.5, -11, 3, 'y');

// trophy: a gold cup with handles on a brown base
WEAR['🏆'] = wLn('M17.5 12Q6.5 11.5 8.5 20Q10.5 27 20 26.5M46.5 12Q57.5 11.5 55.5 20Q53.5 27 44 26.5', 'y2', 3.6) +
  wLn('M17 13.6Q9.2 13.4 10.4 19.4', 'y', 1.8, .9) +
  wVol('M15.5 7L48.5 7Q49 30.5 32 34.5Q15 30.5 15.5 7Z', 'y2', 'y', .93) +
  `<ellipse cx="32" cy="7.5" rx="16.2" ry="3.6" ${wF('y3')}/><ellipse cx="32" cy="8.6" rx="13.4" ry="2.2" ${wF('y2')}/>` +
  wStar(31.6, 19.4, 6.6, 'y') + wLn('M20 12Q20 24 25 29', 'w', 2.2, .6) +
  wVol('M28.5 33L35.5 33L36.5 42L27.5 42Z', 'y2', 'y', .9) +
  wVol('M19.5 42L44.5 42L46.5 51.5L17.5 51.5Z', 'n2', 'n', .95) +
  `<rect x="27" y="44.6" width="10" height="3.8" rx="1.2" ${wF('y1')}/>`;

// ---- boss prizes: emblems (64 grid, centre 32, 32), worn as a gold rosette badge on a headband ----
WEAR_EMB['🌼'] = (() => {
  const petal = 'M32 31C27 26 26 14 32 7C38 14 37 26 32 31Z';
  let sh = '', b = '';
  for (let i = 0; i < 8; i++) {
    sh += `<path ${wF('y2')} d="${wRot(petal, i * 45 + 2, 32.8, 32.8)}"/>`;
    b += `<path ${wF('y')} d="${wRot(wMap(petal, ([x, y]) => [x - .6, y + 1.6]), i * 45, 31.6, 31.6)}"/>`;
  }
  return sh + b + wBall(32, 32, 8.4, 'o', .7);
})();
WEAR_EMB['⭐'] = wStar(32, 33.5, 25);
WEAR_EMB['🎉'] = wVol('M6 58L19.5 25L39 44.5Z', 'y2', 'y', .9) +
  wLn('M11.5 45L21.5 52M15 36.5L29.5 47', 'r', 3.6) +
  `<ellipse cx="29.5" cy="34.5" rx="13" ry="4.4" transform="rotate(45 29.5 34.5)" ${wF('y3')}/>` +
  wLn('M33 28Q36 18 44 17Q52 16 51 8', 'p', 3) + wLn('M38 33Q46 31 50 36Q54 41 60 38', 'b', 3) +
  `<rect x="40" y="22" width="5" height="5" rx="1" transform="rotate(20 42.5 24.5)" ${wF('g')}/>` +
  `<rect x="27" y="10" width="5" height="5" rx="1" transform="rotate(-25 29.5 12.5)" ${wF('v')}/>` +
  `<circle cx="55" cy="22" r="2.8" ${wF('r')}/><circle cx="36" cy="7" r="2.4" ${wF('o')}/><circle cx="48" cy="46" r="2.4" ${wF('v')}/>`;
WEAR_EMB['🪐'] = `<ellipse cx="32" cy="33" rx="28" ry="8" transform="rotate(-18 32 33)" fill="none" stroke="var(--a-o2)" stroke-width="4.4"/>` +
  wBall(32, 32, 17, 'v', .8) + wLn('M18 30Q26 26 40 21', 'v1', 3, .5) +
  `<path fill="none" stroke="var(--a-o)" stroke-width="4.4" stroke-linecap="round" d="M5.2 41.7Q12 47 32 41.5Q52 35.5 58.8 24.3"/>`;
WEAR_EMB['🌈'] = wLn('M8 46C8 32 19 22 32 22C45 22 56 32 56 46', 'r', 4.6) +
  wLn('M12.5 46C12.5 35 21 26.5 32 26.5C43 26.5 51.5 35 51.5 46', 'o', 4.6) +
  wLn('M17 46C17 37.5 23.5 31 32 31C40.5 31 47 37.5 47 46', 'y', 4.6) +
  wLn('M21.5 46C21.5 40 26 35.5 32 35.5C38 35.5 42.5 40 42.5 46', 'g', 4.6) +
  wLn('M26 46C26 42.5 28.5 40 32 40C35.5 40 38 42.5 38 46', 'b', 4.6) +
  [[10, 47], [54, 47]].map(([x, y]) => {
    const cloud = `M${x - 10} ${y + 5}C${x - 11} ${y - 1} ${x - 6} ${y - 4} ${x - 2} ${y - 2}C${x} ${y - 7} ${x + 8} ${y - 6} ${x + 8} ${y - 1}` +
      `C${x + 12} ${y - 1} ${x + 12} ${y + 5} ${x + 8} ${y + 5}Z`;
    return `<path ${wF('w3')} d="${cloud}"/><path ${wF('w')} d="${wMap(cloud, ([u, v]) => [x + 1 + (u - x - 1) * .92 - .6, y + (v - y) * .9 - 1.2])}"/>`;
  }).join('');
WEAR_EMB['🔥'] = wVol('M32 4C39 16 52 23 50 40C49 52 41 59 32 59C23 59 14 52 14 41C14 31 21 27 23 18C28 24 28 30 30 32C29 21 28 13 32 4Z', 'r2', 'r', .93) +
  `<path ${wF('o')} d="M31.5 22C36 30 44 34 43 44C42 51 37 55 31.5 55C25.5 55 20.5 50.5 20.5 44C20.5 37 26 34 27 28C29.5 31 30 34 31 36C31 31 30 27 31.5 22Z"/>` +
  `<path ${wF('y')} d="M31.5 36C34 41 37.5 43 37 48C36.6 52 34.2 54 31.5 54C28.6 54 26 52 26 48.5C26 45 28.6 43.4 29.6 40.4C30.6 42 31 43 31.4 44C31.6 41 31 39 31.5 36Z"/>` +
  wHi(22, 38, 2.4, 5, 20, 'o1', .8);
WEAR_EMB['💎'] = `<path ${wF('c2')} d="M6 25L17 11L47 11L58 25L32 57Z"/>` +
  `<path ${wF('c1')} d="M17 11L25 25L32 11Z"/><path ${wF('c')} d="M32 11L39 25L47 11Z"/>` +
  `<path ${wF('c')} d="M6 25L17 11L25 25Z"/><path ${wF('c2')} d="M47 11L58 25L39 25Z"/>` +
  `<path ${wF('w')} d="M25 25L32 11L39 25Z" opacity=".75"/>` +
  `<path ${wF('c')} d="M6 25L25 25L32 57Z"/><path ${wF('c1')} d="M25 25L39 25L32 57Z"/><path ${wF('c3')} d="M39 25L58 25L32 57Z" opacity=".75"/>` +
  rwSpark(16.5, 18.5, 3.6, 'w');
WEAR_EMB['🍀'] = (() => {
  const leaf = 'M32 31C26 26 18.5 24 18.5 16.5C18.5 10 26.5 8 32 14C37.5 8 45.5 10 45.5 16.5C45.5 24 38 26 32 31Z';
  let h = wLn('M33 33Q37 46 44 56', 'g3', 4);
  for (const a of [0, 90, 180, 270]) h += wVol(wRot(leaf, a), 'g2', 'g', .9);
  return h + wLn('M24 13.5Q22 16 23.5 19.5', 'g1', 2.4, .9) + `<circle cx="32" cy="32" r="3.2" ${wF('g2')}/>`;
})();
WEAR_EMB['🌙'] = wVol('M41 6C25 8 13 20 13 35C13 49 25 59 39 59C47 59 53 55 56 50C47 52 37 49 32 41C25 30 29 14 41 6Z', 'y2', 'y', .93) +
  wLn('M23 20Q18 28 18.5 37', 'y1', 3, .9) + rwSpark(48, 18, 5, 'y1') + rwSpark(53, 34, 3, 'y1');
WEAR_EMB['⚡'] = wVol('M39 3L14 35L30 35L23 61L51 25L35 25L44 3Z', 'y2', 'y', .93) + wLn('M36.5 9L22.5 28.5', 'y1', 2.6, .9);
WEAR_EMB['🍩'] = `<circle cx="32.6" cy="33.6" r="24" ${wF('t2')}/><circle cx="31.6" cy="32.6" r="22.6" ${wF('t')}/>` +
  `<path ${wF('p2')} d="M12 30C12 18 21 11 32 11C44 11 52.5 19 52.5 30C52.5 37 49 38 47 41C45 44 43 46 40 46C37 46 36 48 33 49C29 50 26 46 23 46C19 46 18 42 16 40C13.5 38 12 36 12 30Z"/>` +
  `<path ${wF('p')} d="M12 29C12 17.5 21 10.5 31.5 10.5C43 10.5 51 18 51 28.5C51 35 48 36.5 46 39.5C44 42.5 42 44 39 44C36 44 35 46 32.5 47C29 48 26 44.5 23 44.5C19.5 44.5 18.5 40.5 16.5 38.5C14 36.5 12 34.5 12 29Z"/>` +
  `<circle cx="32" cy="32" r="7.2" ${wF('t3')}/><circle cx="32.6" cy="32.6" r="6" ${wF('w')}/>` +
  [[20, 22, 30, 'y'], [27, 16, -40, 'b'], [41, 17, 20, 'w'], [45, 27, -60, 'y'], [22, 33, 70, 'w'], [38, 41, 10, 'b'], [26, 41, -30, 'y'], [44, 35, 45, 'g']]
    .map(([x, y, a, c]) => `<rect x="${x - 2.6}" y="${y - 1}" width="5.2" height="2" rx="1" transform="rotate(${a} ${x} ${y})" ${wF(c)}/>`).join('') +
  wHi(19, 17, 2.4, 4.4, 45, 'w', .6);
WEAR_EMB['🎵'] = `<path ${wF('v2')} d="M21 15L49 7L49 15L21 23Z"/>` +
  `<rect x="20" y="16" width="4" height="34" rx="1.6" ${wF('v2')}/><rect x="45.4" y="8.6" width="4" height="34" rx="1.6" ${wF('v2')}/>` +
  `<ellipse cx="17.6" cy="50" rx="8" ry="6" transform="rotate(-20 17.6 50)" ${wF('v2')}/><ellipse cx="16.8" cy="49.2" rx="6.8" ry="4.8" transform="rotate(-20 16.8 49.2)" ${wF('v')}/>` +
  `<ellipse cx="43" cy="43" rx="8" ry="6" transform="rotate(-20 43 43)" ${wF('v2')}/><ellipse cx="42.2" cy="42.2" rx="6.8" ry="4.8" transform="rotate(-20 42.2 42.2)" ${wF('v')}/>` +
  `<path ${wF('v')} d="M21 14.2L48.2 6.6L48.2 11.4L21 19Z"/>` + wHi(14.6, 47.6, 2, 1.2, -20, 'v1', .9) + wHi(40, 40.6, 2, 1.2, -20, 'v1', .9);

// the prize hat: a headband in the prize's colour with a gold rosette, the emblem on its white face
(() => {
  const BAND = { '🌼': 'g', '⭐': 'b', '🎉': 'v', '🪐': 'v', '🌈': 'b', '🔥': 'r', '💎': 'c', '🍀': 'g', '🌙': 'b', '⚡': 'v', '🍩': 'p', '🎵': 'r' };
  for (const [id, h] of Object.entries(BAND)) {
    WEAR[id] = wContact(21, 62) +
      wVol('M5 64.5Q5 52 32 52Q59 52 59 64.5L52.5 64.5Q52.5 59 32 59Q11.5 59 11.5 64.5Z', h + '2', h, .96) +
      wLn('M9.5 59Q15 54.6 25 53.8', h + '1', 2, .8) +
      `<path ${wF('y2')} stroke="var(--a-y2)" stroke-width="3" stroke-linejoin="round" d="${rwStarD(32.7, 38.7, 20, 17.2, 14)}"/>` +
      `<path ${wF('y')} stroke="var(--a-y)" stroke-width="2" stroke-linejoin="round" d="${rwStarD(31.7, 37.7, 18.8, 16.2, 14)}"/>` +
      `<circle cx="32" cy="38" r="14" ${wF('y3')}/><circle cx="31.5" cy="37.5" r="13.2" ${wF('w')}/>` +
      `<g transform="translate(31.5 37.5) scale(.46) translate(-32 -32)">${WEAR_EMB[id]}</g>` +
      wLn('M16.5 31Q19 22 27.5 19.2', 'y1', 2.2, .9);
  }
})();
