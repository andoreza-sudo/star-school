/* Star School petage v187. BUILT by tools/build.py from 17b-pet-age.js: never edit by hand.
   index.html v187 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v187.js. */
/* ---------- pet age: the pet grows up with the grade (17-pets-svg.js petAge, petSVG) ----------
   PET_AGED[kind] = [older kid (age 1, grades 3-4), grown-up (age 2, grades 5-6)]: a body plan of its own per age, drawn on the same rig
   (named groups, faces, anchors, --pc-* roles, no filters), in the grown stage's coordinates; the star stage only scales it about the
   ground point (100, 184): PET_AGE_SC. Age 0 (Pre-K to 2nd) is the little one in PET_RIG, unchanged.
   A design: P anchors {head [x, y, s], arm (far, behind the body) and arm2 (near, holds the toy) [x, y, s, flip], wing / wing2 (xl, xr),
   tail, sh (shadow rx), hat and toy [x, y, s, degrees]}; markup xl, xr (front: xr is drawn over the body), tail, arm, arm2, body, belly
   (absolute), head and cheeks (the face frame: eyes at x -16 / 16, y -4, as PET_FACE), mouth (mood -> markup in the face frame).
   A bigger head drawing at a smaller head scale is what makes the eyes smaller as the pet grows up. */
const PET_AGE_SC = { baby: .72, kid: .87, grown: 1 };
// a volume from one shape: the shape in the shade colour, moved down and right, then the shape in the base colour
const paV = (d, c, t = '2 2.5', c2 = c + '2') => `<path d="${d}" transform="translate(${t})" fill="var(--pc-${c2})"/><path d="${d}" fill="var(--pc-${c})"/>`;
const paE = (x, y, rx, ry, c, rot) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ''} fill="var(--pc-${c})"/>`;
const paF = (d, c, w, a) => `<path d="${d}" fill="none" stroke="var(--pc-${c})" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${a ? ` opacity="${a}"` : ''}/>`;
// a face (mood -> [eyes, mouth]) from the shared eyes and this design's mouths
const paFace = mo => Object.fromEntries(PET_MOODS.map(m => [m, [PET_FACE[m][0], mo[m]]]));
// claws or toes: small circles
const paDots = (pts, r, c) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="var(--pc-${c})"/>`).join('');

// a jaw (the T-Rex's and the dragon's mouth): the lip line from c to t through k, a row of friendly teeth on it, open by o
function paJaw(c, k, t, o, n, tw) {
  const r = petR1, q = (u, a, b, z) => (1 - u) * (1 - u) * a + 2 * u * (1 - u) * b + u * u * z, lip = `M${c[0]} ${c[1]}Q${k[0]} ${k[1]} ${t[0]} ${t[1]}`;
  let s = '';
  if (o) s += `<path d="${lip}L${r(t[0] - 6)} ${r(t[1] + o)}Q${k[0]} ${r(k[1] + o * 1.5)} ${c[0]} ${c[1]}Z" fill="var(--pc-e)" stroke="var(--pc-e)" stroke-width="2.4" stroke-linejoin="round"/>` +
    paE(r(k[0] - 4), r((c[1] + t[1]) / 2 + o * .95), r(o * 1.4 + 4), r(o * .32), 't');
  for (let i = 0; i < n; i++) {
    const u = .3 + i * .62 / (n - 1), x = r(q(u, c[0], k[0], t[0])), y = r(q(u, c[1], k[1], t[1]) - .5);
    s += `<path d="M${r(x - tw)} ${y}L${x} ${r(y + tw * 1.7)}L${r(x + tw)} ${y}Z" fill="var(--pc-w)" stroke="var(--pc-w)" stroke-width="1" stroke-linejoin="round"/>`;
  }
  return s + petLn(lip, 3);
}

// the older kid's mouths, on a snout that reaches to the right (dino, dragon)
const paKidMouth = {
  idle: petLn('M-4 18Q20 26 52 16', 3), happy: petMo('M0 15Q24 30 48 14Z') + petTongue(22, 22, 6, 2.6),
  cheer: petMo('M-2 13Q24 36 52 12Z') + petTongue(24, 25, 7.5, 3.4), oops: petLn('M2 21q6-5 12 0t12 0t12 0', 2.8),
  sleepy: '<ellipse cx="20" cy="21" rx="3.4" ry="4" fill="var(--pc-e)"/>',
  hungry: petMo('M2 16Q22 28 42 16Z') + petTongue(24, 25, 4.6, 5.4) + '<path d="M14 23q-2.5 5 0 7q2.5-2 0-7Z" fill="var(--pc-d)"/>',
};

const PET_AGED = {};

// >>> dino: a lanky young theropod, then a full-grown T-Rex (horizontal body, big head and jaw, tiny arms, thick legs, heavy tail)
{
  const plate = (x, y, a, s) => petAt(x, y, a, s, petPlateS);
  const rexFoot = (x, y, w, c) => paE(x, y, w, petR1(w * .38), c) + paDots([[x - w * .62, y + 2], [x, y + 3], [x + w * .62, y + 2]].map(([a, b]) => [petR1(a), petR1(b)]), petR1(w * .16), 'l');
  const rexMouth = {
    idle: paJaw([-20, 16], [40, 26], [94, 10], 0, 6, 3.4),
    happy: paJaw([-20, 16], [40, 26], [94, 10], 8, 6, 3.4),
    cheer: paJaw([-20, 14], [40, 24], [94, 8], 15, 6, 3.4),
    oops: petLn('M-18 20Q-6 14 6 20T30 20T54 18T78 14', 3),
    sleepy: petLn('M-14 18Q40 26 90 12', 3),
    hungry: paJaw([-20, 16], [40, 26], [94, 10], 11, 6, 3.4) + '<path d="M30 40q-3 6 0 9q3-3 0-9Z" fill="var(--pc-d)"/>',
  };
  PET_AGED.dino = [{
    // older kid: a lanky young theropod leaning forward, longer snout and tail, a bigger head than the grown-up, legs that show
    P: { head: [122, 64, .66], arm: [124, 112, .9], arm2: [132, 116, .95], wing: [0, 0, 1], wing2: [0, 0, 1], tail: [70, 122, 1], sh: 56,
      hat: [116, 38, .92, -6], toy: [150, 132, .8, 10] },
    xl: '', xr: '',
    tail: paV('M4-14C-14-14-34-10-52-2C-58 1-60 6-56 8C-38 8-14 10 6 16Z', 'b') + paE(-22, -4, 4, 3, 'b2') + paE(-38, 0, 3, 2.2, 'b2') +
      [[-14, -13, -10, .3], [-30, -9, -16, .26], [-44, -5, -22, .22]].map(a => plate(...a)).join('') + petGl('M-4-10C-18-10-32-7-44-2', 2.4, .3),
    arm: paV('M-2-3C4-6 10-2 12 4C13 8 10 10 8 7C6 4 3 3-1 4Z', 'b', '1 1.5') + paDots([[9.5, 9], [12.5, 7.5]], 1.6, 'l'),
    body: paV('M78 136C70 128 70 114 80 104C90 92 104 88 116 78L136 82C138 96 136 110 128 124C118 140 94 146 78 136Z', 'b', '1.5 2') +
      [[96, 98, 30, .36], [84, 108, 10, .34], [108, 88, 44, .34]].map(a => plate(...a)).join('') +
      // far leg, then near leg (long shins), feet
      paV('M84 132C80 122 92 116 100 124C104 130 102 138 98 142L100 172C100 177 92 177 92 172L88 146C85 142 84 138 84 132Z', 'b2', '1.5 1.5', 'b3') +
      paV('M96 128C92 114 112 110 118 124C121 132 118 140 114 146L116 172C116 178 106 178 106 172L104 148C99 142 96 136 96 128Z', 'b', '1.5 1.5') +
      rexFoot(96, 177, 11, 'b2') + rexFoot(112, 177, 12, 'b2') + paE(88, 112, 5, 3.6, 'b2', -30) + paE(100, 104, 4, 3, 'b2') +
      petHi(92, 106, 6, 12, 40, .22),
    belly: paV('M136 92C136 108 130 122 118 132C108 138 94 140 84 136C100 132 116 124 124 112C130 104 134 98 136 92Z', 'l', '1 1'),
    head: plate(-30, -30, -40, .5) + plate(-14, -38, -12, .56) + plate(4, -38, 14, .5) +
      paV('M-42 2C-44-26-22-40 4-38C24-36 40-28 60-20C76-14 84-6 82 6C80 18 70 24 56 26C40 30 10 34-10 32C-32 30-42 20-42 2Z', 'b') +
      paV('M-30 22C-10 30 30 30 56 24C66 22 74 18 78 12C78 20 70 28 56 32C30 38-6 36-24 30C-28 28-30 26-30 22Z', 'l', '1 1') +
      petHi(-14, -22, 16, 7, -14, .22) + paE(-4, -30, 4, 3, 'b2') + paE(10, -28, 3, 2.2, 'b2') + paE(72, -6, 2.6, 1.8, 'b2', -20),
    cheeks: [-30, 30].map(x => `<ellipse cx="${x}" cy="12" rx="6.5" ry="4" fill="var(--pc-ck)" opacity=".9"/>`).join(''),
    mouth: paKidMouth,
  }, {
    // grown-up: a full-grown T-Rex
    P: { head: [126, 56, .64], arm: [140, 116, 1], arm2: [146, 120, 1], wing: [0, 0, 1], wing2: [0, 0, 1], tail: [62, 112, 1], sh: 74,
      hat: [122, 32, .86, -4], toy: [164, 130, .72, 10] },
    xl: '', xr: '',
    tail: paV('M4-20C-20-18-42-10-59 0C-62 2-62 5-58 6C-40 8-18 14 6 20Z', 'b') +
      [[-14, -17, -12, .34], [-30, -12, -18, .3], [-45, -6, -24, .25]].map(a => plate(...a)).join('') +
      paE(-20, -6, 5, 3.4, 'b2', -10) + paE(-38, -1, 3.6, 2.6, 'b2', -12) + petGl('M-4-14C-20-13-36-8-48-2', 2.6, .3),
    arm: paV('M-2-3C5-5 12-1 14 5C15 9 11 10 9 7C7 4 4 3-1 4Z', 'b', '1 1.5') + paDots([[11.5, 9.5], [14.5, 7.5]], 1.7, 'l'),
    body: paV('M56 128C54 110 84 104 94 120C98 130 94 140 88 146L90 170C90 177 74 177 74 170L72 150C62 145 56 137 56 128Z', 'b2', '1.5 2', 'b3') +
      rexFoot(83, 178, 14, 'b2') +
      paV('M50 112C48 94 70 84 94 84C106 84 112 76 114 66L146 66C150 78 150 96 148 106C150 120 140 134 122 140C102 146 72 144 60 134C53 128 50 120 50 112Z', 'b') +
      [[58, 96, -40, .36], [72, 88, -24, .4], [88, 84, -8, .42], [102, 81, 10, .4]].map(a => plate(...a)).join('') +
      paE(76, 98, 6, 4, 'b2', -10) + paE(92, 94, 4.6, 3.2, 'b2') + paE(64, 110, 4, 3, 'b2') + paE(106, 92, 3.4, 2.4, 'b2') +
      petHi(80, 100, 18, 7, -8, .22) +
      paV('M74 120C70 100 112 92 120 114C124 126 120 138 112 146L112 170C112 177 94 177 94 170L92 150C81 144 75 132 74 120Z', 'b', '2 2') +
      paF('M78 110C86 98 108 96 117 110', 'b2', 3) + petHi(88, 114, 8, 12, 30, .25) + rexFoot(104, 178, 16, 'b2'),
    belly: paV('M148 100C150 118 140 134 120 140C102 145 80 142 66 136C88 136 110 130 126 120C138 112 144 104 148 100Z', 'l', '1 1'),
    head: '<ellipse cx="20" cy="46" rx="44" ry="7" fill="var(--pc-b3)" opacity=".3"/>' +
      [[-40, -18, -60, .5], [-34, -32, -40, .56], [-20, -40, -18, .56]].map(a => plate(...a)).join('') +
      paV('M-42-6C-44-30-24-40 0-38C24-36 50-30 78-20C96-14 104-6 102 6C100 16 92 22 80 24C88 28 90 36 80 40C50 46 0 46-24 40C-40 34-44 18-42-6Z', 'b') +
      paV('M-30 26C0 34 50 34 80 27C86 32 84 38 78 40C50 46 0 46-24 40C-30 36-32 30-30 26Z', 'l', '1 1') +
      petHi(-10, -26, 22, 7, -8, .22) + paE(90, -6, 3.4, 2.2, 'b2', -20) + paE(14, -30, 5, 3.4, 'b2') + paE(32, -26, 4, 2.6, 'b2') + paE(46, -21, 3, 2, 'b2') +
      paF('M-30-17Q-16-24-3-18M5-18Q18-23 30-17', 'b2', 4),
    cheeks: [-31, 27].map(x => `<ellipse cx="${x}" cy="10" rx="6" ry="3.8" fill="var(--pc-ck)" opacity=".9"/>`).join(''),
    mouth: rexMouth,
  }];
}
// <<< dino

// >>> dragon: a young dragon (bigger wings and horns, a snout), then a full-grown dragon sitting up tall: long neck, wings spread wide,
// swept-back horns, spines along the back, a long tail curled on the ground
{
  const spine = (x, y, a, s) => petAt(x, y, a, s, '<path d="M-6 1L0-13L6 1Z" fill="var(--pc-l2)"/><path d="M-5 0L-.5-11L3.5 0Z" fill="var(--pc-l)"/>');
  const horn = '<path d="M-26-24C-40-40-54-52-70-58C-62-46-48-30-36-14Z" fill="var(--pc-h)"/><path d="M-70-58C-62-46-48-30-36-14L-31-19C-42-32-54-46-70-58Z" fill="var(--pc-h2)"/>';
  // a wing on the left, joint at (0, 0): arm bone, three fingers, the skin between them
  const wing = s => paV('M2 2C-6-20-14-44-26-60C-44-66-64-66-80-62C-72-54-74-44-86-32C-76-28-74-14-70-2C-56-4-46 0-36 6C-24 2-10 2 2 2Z', s ? 'b2' : 'b', '2 2', s ? 'b3' : 'b2') +
    paF('M-26-60L-78-61M-26-60L-84-32M-26-60L-69-3', 'b2', 2.6) + paF('M0 0C-8-22-16-44-26-60', s ? 'b3' : 'b2', 5) + paE(-26, -60, 4, 4, 'l');
  const arm = paV('M-4-4C4-6 12 2 14 12C15 18 10 20 8 16C6 10 2 6-4 4Z', 'b', '1 1.5') + paDots([[9, 18.5], [13, 17.5], [15.5, 14]], 1.8, 'x');
  const tip = '<path d="M0 0C-4-12 0-24 10-30C12-20 10-8 4 2Z" fill="var(--pc-l)"/><path d="M10-30C12-20 10-8 4 2L1 0C6-10 9-20 10-30Z" fill="var(--pc-l2)"/>';
  const drMouth = {
    idle: paJaw([-6, 16], [36, 24], [80, 12], 0, 3, 2.6),
    happy: paJaw([-6, 16], [36, 24], [80, 12], 7, 3, 2.6),
    cheer: paJaw([-6, 14], [36, 22], [80, 10], 13, 3, 2.6),
    oops: petLn('M-4 20q6-5 12 0t12 0t12 0t12 0', 2.8),
    sleepy: petLn('M-2 18Q36 25 76 14', 3),
    hungry: paJaw([-6, 16], [36, 24], [80, 12], 10, 3, 2.6) + '<path d="M30 38q-3 6 0 9q3-3 0-9Z" fill="var(--pc-d)"/>',
  };
  const head = sn => `<g transform="translate(-6 0) scale(1.2)">${horn}</g><g transform="scale(1.25)">${horn}</g>` +
    paV('M-46-6L-62-14L-56-2L-64 8L-44 8Z', 'b2', '1 1', 'b3') +
    paV(`M-40 0C-42-24-22-36 2-34C22-32 ${petR1(40 * sn)} -24 ${petR1(62 * sn)} -16C${petR1(78 * sn)} -10 ${petR1(86 * sn)} -4 ${petR1(86 * sn)} 6C${petR1(86 * sn)} 16 ${petR1(76 * sn)} 22 ${petR1(62 * sn)} 22C${petR1(40 * sn)} 26 10 30-12 28C-32 26-40 16-40 0Z`, 'b') +
    paV(`M-28 20C0 26 ${petR1(40 * sn)} 24 ${petR1(62 * sn)} 18C${petR1(72 * sn)} 16 ${petR1(80 * sn)} 14 ${petR1(84 * sn)} 10C${petR1(84 * sn)} 18 ${petR1(76 * sn)} 22 ${petR1(62 * sn)} 23C${petR1(40 * sn)} 27 10 31-12 29C-20 28-26 24-28 20Z`, 'l', '1 1') +
    paE(petR1(74 * sn), -4, 3, 2, 'b2', -20) + petHi(-12, -22, 18, 7, -10, .22) + petHi(-22, -24, 5, 3, -30, .5) +
    '<path d="M-14-30L-8-44L-2-33L4-46L10-31Z" fill="var(--pc-l)" stroke="var(--pc-l)" stroke-width="3" stroke-linejoin="round"/>';
  PET_AGED.dragon = [{
    // older kid: standing up, leaning forward, a short snout, bigger horns and wings than the little one
    P: { head: [124, 70, .68], arm: [128, 116, .85], arm2: [134, 120, .9], wing: [112, 96, .6], wing2: [104, 104, .72], tail: [86, 156, 1], sh: 50,
      hat: [121, 49, .88, -4], toy: [150, 138, .78, 10] },
    xl: petAt(0, 0, 28, 1, wing(1)), xr: wing(0),
    tail: paV('M2-10C-16-10-32-6-44 2C-50 6-54 6-58 2L-60 10C-48 18-24 18 4 8Z', 'b') + petAt(-59, 6, -70, .7, tip) +
      [[-14, -9, -80, .5], [-30, -5, -70, .44]].map(a => spine(...a)).join(''),
    arm,
    body: [[84, 132, -90, .7], [88, 116, -70, .8], [98, 104, -55, .8], [108, 94, -45, .7]].map(a => spine(...a)).join('') +
      paV('M110 150C112 140 128 140 130 152L132 172C132 178 120 178 120 172Z', 'b2', '1 1', 'b3') + paE(127, 178, 9, 4, 'b2') +
      paV('M80 150C76 128 86 108 104 100C110 96 114 88 116 80L140 84C138 96 134 106 136 116C140 134 134 154 120 164C106 172 86 166 80 150Z', 'b') +
      petHi(96, 122, 7, 14, 20, .22) +
      paV('M84 152C80 134 104 128 112 144C116 152 112 162 108 166L116 170C122 172 122 180 114 180L96 180C88 180 84 168 84 152Z', 'b', '1.5 2') +
      paF('M86 142C92 134 104 132 110 140', 'b2', 2.6) + paDots([[112, 181], [118, 179]], 1.8, 'x'),
    belly: paV('M138 86C130 100 128 112 130 124C134 142 126 156 112 164C104 166 98 164 96 160C110 154 118 142 118 126C118 110 124 96 138 86Z', 'l', '1 1') +
      paF('M124 104L134 106M120 118L131 119M120 132L131 133M116 146L126 149', 'l2', 2.2),
    head: head(.72),
    cheeks: [-31, 27].map(x => `<ellipse cx="${x}" cy="11" rx="6.5" ry="4" fill="var(--pc-ck)" opacity=".9"/>`).join(''),
    mouth: paKidMouth,
  }, {
    P: { head: [140, 48, .6], arm: [132, 116, 1], arm2: [138, 122, 1], wing: [108, 86, .9], wing2: [94, 96, 1], tail: [68, 162, 1], sh: 66,
      hat: [137, 28, .84, -4], toy: [158, 140, .76, 10] },
    xl: petAt(0, 0, 28, 1, wing(1)), xr: wing(0),
    tail: paV('M4-12C-16-4-34 8-48 8C-58 8-62 0-62-12L-69-11C-71 6-62 18-48 20C-30 22-10 16 6 8Z', 'b') + petAt(-66, -11, -22, .9, tip) +
      [[-12, -5, -60, .7], [-28, 3, -70, .6], [-44, 9, -84, .5]].map(a => spine(...a)).join('') + petGl('M0-8C-14-2-28 6-42 9', 2.4, .3),
    arm,
    body: [[74, 140, -100, .9], [76, 122, -80, 1], [84, 106, -64, 1], [96, 94, -50, 1], [106, 80, -40, .9], [114, 66, -30, .8]].map(a => spine(...a)).join('') +
      paV('M70 160C62 140 70 112 92 98C100 92 106 80 112 64C116 54 126 46 136 46L150 60C142 70 136 82 134 96C140 110 140 132 134 148C128 164 112 172 96 172C84 172 74 168 70 160Z', 'b') +
      petHi(90, 116, 9, 18, 20, .22) +
      paV('M58 154C54 132 80 122 98 132C112 140 112 160 102 170L114 172C121 174 121 182 113 182L84 182C72 182 64 172 58 154Z', 'b', '1.5 2') +
      paF('M62 140C70 128 88 124 100 132', 'b2', 3) + paDots([[110, 183], [116, 182], [120, 178]], 2, 'x') + petHi(74, 142, 6, 10, 30, .25),
    belly: paV('M146 62C140 74 136 86 134 98C140 112 140 132 134 148C128 162 116 170 104 172C114 160 120 146 120 130C120 112 124 96 130 84C134 74 140 66 146 62Z', 'l', '1 1') +
      paF('M126 90L138 94M122 106L139 108M120 122L140 122M120 138L137 140M116 154L130 158M131 76L142 80', 'l2', 2.4),
    head: head(1),
    cheeks: [-31, 27].map(x => `<ellipse cx="${x}" cy="11" rx="6" ry="3.8" fill="var(--pc-ck)" opacity=".9"/>`).join(''),
    mouth: drMouth,
  }];
}
// <<< dragon

// >>> bird: a fledgling (taller, longer wing and tail feathers, legs that show), then a grown bird of prey: sleek, wings spread wide,
// the head turned to show a hooked beak, a proud brow, talons
{
  // the hooked beak in profile is the grown-up's mouth: upper part over the lower part, open by o
  const beak = o => {
    const r = petR1;
    return (o ? paE(36, r(8 + o * .5), 12, r(o * .5 + 2), 'e') + paE(34, r(9 + o * .7), 6, r(Math.min(o * .3 + 1, 3)), 't') : '') +
      paV(`M20 7L46 6C44 ${r(12 + o)} 34 ${r(15 + o)} 22 ${r(14 + o * .7)}Z`, 'x2', '.5 .5', 'x2') +
      paV('M16-12C34-16 54-12 62-2C66 6 64 14 58 19C56 11 50 7 42 7L18 9Z', 'x', '1 1') + petHi(30, -8, 9, 2.4, -6, .6);
  };
  const feather = (x, y, a, s) => petAt(x, y, a, s, birdFeather);
  // a long flight feather from (0, 0), pointing down before the turn a
  const quill = (x, y, a, l, c) => petAt(x, y, a, 1, `<path d="M-6 0C-7 ${petR1(l * .5)}-4 ${petR1(l * .9)} 0 ${l}C4 ${petR1(l * .9)} 7 ${petR1(l * .5)} 6 0Z" fill="var(--pc-${c})"/>`);
  const talons = (x, y, l) => paF(`M${x} ${y - l}L${x} ${y - 2}`, 'x2', 5) + paDots([[x - 6, y], [x, y + 1], [x + 6, y]], 3, 'x') +
    paF(`M${x - 9} ${y + 1}l-1.5 2.5M${x} ${y + 3}v3M${x + 9} ${y + 1}l1.5 2.5`, 'e', 2);
  const chev = pts => pts.map(([x, y]) => paF(`M${x - 4} ${y}q4 4 8 0`, 'l2', 2)).join('');
  const B = PET_RIG.bird;
  PET_AGED.bird = [{
    // older kid: a fledgling
    P: { head: [100, 80, .94], arm: [74, 124, .95], arm2: [126, 124, .95, -1], wing: [0, 0, 1], wing2: [0, 0, 1], tail: [118, 166, 1], sh: 42,
      hat: [100, 54, .94, -6], toy: [144, 150, .8, 10] },
    xl: '', xr: '',
    tail: [[-118, 40, 'b2'], [-102, 44, 'b'], [-86, 40, 'b2'], [-70, 34, 'b']].map(([a, l, c]) => quill(0, 0, a, l, c)).join(''),
    arm: [[0, 40, 'b2'], [12, 36, 'b'], [24, 30, 'b2']].map(([a, l, c]) => quill(-8 + a * .2, 14, a, l, c)).join('') + B.arm,
    body: paV('M100 100C118 100 128 120 128 142C128 164 116 174 100 174C84 174 72 164 72 142C72 120 82 100 100 100Z', 'b') +
      petHi(84, 124, 6, 13, 20, .25) + talons(90, 180, 10) + talons(110, 180, 10),
    belly: paV('M100 112C112 112 118 128 118 144C118 160 110 168 100 168C90 168 82 160 82 144C82 128 88 112 100 112Z', 'l', '1 1') +
      chev([[92, 130], [108, 130], [100, 142], [92, 154], [108, 154]]),
    head: B.head({ crest: 1.05 }),
    cheeks: B.cheeks, face: B.face,
  }, {
    // grown-up: a bird of prey
    P: { head: [102, 52, .66], arm: [74, 100, 1], arm2: [126, 100, 1, -1], wing: [0, 0, 1], wing2: [0, 0, 1], tail: [100, 150, 1], sh: 50,
      hat: [99, 30, .84, -6], toy: [162, 122, .74, 10] },
    xl: '', xr: '',
    tail: [[-36, 'b2'], [-18, 'b'], [0, 'b2'], [18, 'b'], [36, 'b2']].map(([a, c]) => quill(0, 0, a, 34, c)).join(''),
    // a broad wing spread out and up: long dark flight feathers like fingers, then the covert feathers
    arm: [[-40, -10, 66, 30], [-30, -2, 52, 28], [-20, 4, 38, 26], [-10, 8, 26, 22]].map(([x, y, a, l]) => quill(x, y, a, l, 'b2')).join('') +
      [[-54, -38, 164, 46], [-52, -32, 148, 50], [-50, -26, 132, 48], [-48, -18, 116, 44], [-46, -12, 100, 38]].map(([x, y, a, l]) => quill(x, y, a, l, 'b3')).join('') +
      paV('M8 8C-8-14-28-38-52-48C-62-30-58-8-46 6C-32 16-10 18 8 8Z', 'b', '1.5 2') +
      chev([[-32, -22], [-22, -8], [-40, -4], [-10, 4]]).replace(/l2/g, 'b2'),
    body: paV('M100 68C122 68 134 92 134 118C134 144 120 162 100 162C80 162 66 144 66 118C66 92 78 68 100 68Z', 'b') +
      paV('M78 146C76 160 84 168 94 166C96 158 94 150 88 144Z', 'b2', '1 1', 'b3') + paV('M122 146C124 160 116 168 106 166C104 158 106 150 112 144Z', 'b2', '1 1', 'b3') +
      talons(90, 180, 14) + talons(110, 180, 14),
    belly: paV('M100 80C114 80 122 98 122 120C122 142 112 154 100 154C88 154 78 142 78 120C78 98 86 80 100 80Z', 'l', '1 1') +
      chev([[92, 100], [108, 100], [100, 112], [88, 124], [104, 124], [116, 124], [94, 136], [110, 136], [100, 146]]),
    head: [[-44, -2, -86, .9], [-42, -14, -72, 1], [-36, -26, -58, .9]].map(a => feather(...a)).join('') +
      paV('M-40 6C-42-20-24-36 0-36C22-36 36-26 40-8C42 6 34 20 18 28C0 36-26 34-36 22C-39 18-40 12-40 6Z', 'b') +
      paV('M-10 24C4 26 18 24 30 16C30 26 18 34 4 35C-6 35-14 30-10 24Z', 'l', '1 1') +
      petHi(-12, -24, 18, 6, -10, .3) + paF('M-30-15Q-16-23-3-17M4-17Q18-23 32-15', 'b3', 4.5),
    cheeks: [-30, 22].map(x => `<ellipse cx="${x}" cy="12" rx="5.5" ry="3.4" fill="var(--pc-ck)" opacity=".8"/>`).join(''),
    mouth: { idle: beak(0), happy: beak(6), cheer: beak(10), oops: beak(0) + petLn('M30 24q4-3 8 0t8 0', 2.4),
      sleepy: beak(0), hungry: beak(8) + '<path d="M36 30q-3 6 0 9q3-3 0-9Z" fill="var(--pc-d)"/>' },
  }];
}
// <<< bird

// >>> ocean: a sea pal with a longer, sleeker body and longer fins, then a full-grown sea pal: a dolphin-like body standing tall on its
// tail flukes, a dorsal fin, long flippers, a long smiling snout
{
  const O = PET_RIG.ocean, flip = (x, y, a, s) => petAt(x, y, a, s, O.arm);
  const spots = pts => pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="var(--pc-b1)"/>`).join('');
  const fluke = paV('M0-2C-10 2-24 2-38-2C-32 8-20 14-4 12Z', 'p', '1 1.5') + paV('M0-2C10 2 24 2 38-2C32 8 20 14 4 12Z', 'p', '1 1.5');
  PET_AGED.ocean = [{
    // older kid: taller and sleeker, longer flippers and tail, a small back fin
    P: { head: [100, 70, .92], arm: [77, 122, 1.15], arm2: [123, 122, 1.15, -1], wing: [74, 128, .9], wing2: [0, 0, 1], tail: [114, 168, 1.35], sh: 44,
      hat: [100, 43, .92, -6], toy: [146, 148, .82, 10] },
    xl: petAt(0, 0, -60, 1, seaFin), xr: '',
    tail: O.tail, arm: O.arm,
    body: paV('M100 94C118 94 126 118 126 144C126 166 116 176 100 176C84 176 74 166 74 144C74 118 82 94 100 94Z', 'b') +
      petHi(84, 124, 6, 13, 20, .25) + spots([[76, 132, 2.6], [80, 120, 2], [124, 128, 2.4]]) +
      [-1, 1].map(s => paE(100 + s * 15, 178, 14, 6.5, 'p', s * 10)).join(''),
    belly: paV('M100 108C110 108 117 124 117 144C117 160 110 170 100 170C90 170 83 160 83 144C83 124 90 108 100 108Z', 'l', '1 1') +
      paF('M93 120Q91 142 93 162M100 118V164M107 120Q109 142 107 162', 'l2', 2.2),
    head: O.head({ fin: 1.1 }),
    cheeks: O.cheeks, face: PET_FACE,
  }, {
    // grown-up
    P: { head: [108, 56, .62], arm: [82, 116, 1.4], arm2: [128, 112, 1.4, -1], wing: [78, 104, 1], wing2: [0, 0, 1], tail: [100, 174, 1], sh: 48,
      hat: [106, 34, .84, -6], toy: [158, 146, .76, 10] },
    xl: petAt(0, 0, -62, 1.7, seaFin), xr: '',
    tail: fluke,
    arm: O.arm,
    body: paV('M104 62C126 62 140 80 140 104C140 132 128 154 110 168L106 178L94 178L92 168C78 150 70 132 70 108C70 80 84 62 104 62Z', 'b') +
      petHi(84, 100, 7, 18, 15, .25) + spots([[80, 96, 3], [76, 112, 2.4], [82, 128, 2.6], [78, 144, 2], [90, 84, 2]]),
    belly: paV('M134 82C142 102 140 130 126 152C118 162 110 170 104 174C110 154 116 134 116 112C116 98 122 88 134 82Z', 'l', '1 1') +
      paF('M126 100Q128 120 120 144M132 104Q134 124 126 146', 'l2', 2),
    head: paV('M-42 8C-44-20-24-38 2-38C26-38 42-26 46-10C60-8 76-4 82 4C84 12 76 18 62 20C44 28 16 34-8 32C-30 30-42 22-42 8Z', 'b') +
      paV('M-20 26C10 28 40 24 62 20C76 18 84 12 83 6C86 18 76 28 60 30C40 36 10 38-10 34C-16 32-20 30-20 26Z', 'l', '1 1') +
      petHi(-12, -24, 20, 7, -10, .25) + petHi(-24, -26, 5, 3, -30, .5) + paE(-4, -35, 4, 1.8, 'b2') +
      spots([[18, -28, 3], [28, -20, 2.4], [8, -32, 2]]),
    cheeks: [-31, 26].map(x => `<ellipse cx="${x}" cy="12" rx="6" ry="3.8" fill="var(--pc-ck)" opacity=".9"/>`).join(''),
    mouth: {
      idle: petLn('M24 14Q54 24 82 8', 3), happy: petMo('M26 13Q52 32 80 9Z') + petTongue(50, 20, 7, 2.6),
      cheer: petMo('M24 11Q52 40 82 6Z') + petTongue(52, 24, 9, 3.6), oops: petLn('M28 18q6-5 12 0t12 0t12 0t12 0', 2.8),
      sleepy: petLn('M30 16Q54 22 76 12', 3),
      hungry: petMo('M28 14Q50 30 74 12Z') + petTongue(52, 22, 5, 5.4) + '<path d="M40 22q-2.5 5 0 7q2.5-2 0-7Z" fill="var(--pc-d)"/>',
    },
  }];
}
// <<< ocean

for (const k in PET_AGED) for (const D of PET_AGED[k]) if (D) D.face = D.face || paFace(D.mouth);

var PETAGE_VER='v187'; // last line: the whole file ran (checked by dataReady() before the app starts)
