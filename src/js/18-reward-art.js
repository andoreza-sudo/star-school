/* ---------- reward art and reward screens (P4-11; DESIGN_SYSTEM.md 6.3, 9 row 5) ----------
   Drawings for the round-complete moment, in the illustration style of DESIGN_SYSTEM 6.5 (shaded, light from the top left,
   up to four tones per colour area, no outlines, no gradients, filters, ids or text): the treasure chest (closed and open),
   reward stars, the four bosses (Gloop, Robo-Bonk, Captain Inky, Zorp; an idle pose and a dizzy "hit" pose in one drawing,
   swapped by CSS), the prize rosette and light rays. Colours are the object-art roles var(--a-x) of src/css/21-art.css
   (every drawing carries the class "art"). Layout and motion are in src/css/42-rewards.css (tokens only, transform/opacity).
   RW.* also returns the markup of the reward screens; finish(), bossIntro(), testOut() and growShow() in 50-round.js call it.
   Nothing here reads or writes saved data. */
const rw1 = v => Math.round(v * 10) / 10;
const rwF = c => `fill="var(--a-${c})"`;
const rwS = (c, w) => `fill="none" stroke="var(--a-${c})" stroke-width="${w}"`;

// a star polygon path (points p, outer radius R, inner r), first point straight up
function rwStarD(cx, cy, R, r, p = 5) {
  let d = '';
  for (let i = 0; i < p * 2; i++) {
    const a = (-90 + i * 180 / p) * Math.PI / 180, q = i % 2 ? r : R;
    d += (i ? 'L' : 'M') + rw1(cx + Math.cos(a) * q) + ' ' + rw1(cy + Math.sin(a) * q);
  }
  return d + 'Z';
}
// a four-point sparkle centred on x, y with half-size s
const rwSpark = (x, y, s, c = 'w', o = 1) => {
  const k = s * .22;
  return `<path ${rwF(c)}${o < 1 ? ` opacity="${o}"` : ''} d="M${rw1(x)} ${rw1(y - s)}Q${rw1(x + k)} ${rw1(y - k)} ${rw1(x + s)} ${rw1(y)}` +
    `Q${rw1(x + k)} ${rw1(y + k)} ${rw1(x)} ${rw1(y + s)}Q${rw1(x - k)} ${rw1(y + k)} ${rw1(x - s)} ${rw1(y)}Q${rw1(x - k)} ${rw1(y - k)} ${rw1(x)} ${rw1(y - s)}Z"/>`;
};
// a shaded little star: shade shape, base shape nudged toward the light, a highlight
const rwStud = (x, y, R) => `<path ${rwF('y2')} stroke="var(--a-y2)" stroke-width="${rw1(R * .3)}" stroke-linejoin="round" d="${rwStarD(x, y, R, R * .5)}"/>` +
  `<path ${rwF('y')} stroke="var(--a-y)" stroke-width="${rw1(R * .22)}" stroke-linejoin="round" d="${rwStarD(x - R * .08, y - R * .1, R * .9, R * .45)}"/>` +
  `<circle cx="${rw1(x - R * .2)}" cy="${rw1(y - R * .35)}" r="${rw1(R * .16)}" ${rwF('y1')}/>`;

// ---- faces (bosses): big ink eyes with a white glint, cheeks, grin; squint and "oh" for the hit pose ----
const rwEye = (x, y, rx, ry, c = 'k') => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" ${rwF(c)}/>` +
  `<circle cx="${rw1(x - rx * .3)}" cy="${rw1(y - ry * .36)}" r="${rw1(rx * .36)}" ${rwF('w')}/>` +
  `<circle cx="${rw1(x + rx * .32)}" cy="${rw1(y + ry * .32)}" r="${rw1(rx * .15)}" ${rwF('w')} opacity=".8"/>`;
const rwSquint = (x, y, s, dir, c = 'k') => `<path ${rwS(c, rw1(s * .55))} stroke-linecap="round" stroke-linejoin="round" ` +
  `d="M${rw1(x - s * dir)} ${rw1(y - s * .8)}L${rw1(x + s * dir)} ${y}L${rw1(x - s * dir)} ${rw1(y + s * .8)}"/>`;
const rwCheek = (x, y, rx = 8, ry = 5) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" ${rwF('p2')} opacity=".55"/>`;
const rwGrin = (x, y, w, h) => `<path ${rwF('k')} d="M${x - w} ${y}Q${x} ${rw1(y + h * 2.1)} ${x + w} ${y}Q${x} ${rw1(y + h * .45)} ${x - w} ${y}Z"/>` +
  `<path ${rwF('r')} d="M${rw1(x - w * .5)} ${rw1(y + h * .82)}Q${x} ${rw1(y + h * .5)} ${rw1(x + w * .5)} ${rw1(y + h * .82)}` +
  `Q${x} ${rw1(y + h * 1.18)} ${rw1(x - w * .5)} ${rw1(y + h * .82)}Z"/>`;
const rwOh = (x, y, rx, ry) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" ${rwF('k')}/>` +
  `<ellipse cx="${x}" cy="${rw1(y + ry * .45)}" rx="${rw1(rx * .6)}" ry="${rw1(ry * .38)}" ${rwF('r')}/>`;
// dizzy ring of stars over the head (hit pose)
const rwDizzy = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${rw1(rx * .26)}" ${rwS('y1', 2.4)} opacity=".9"/>` +
  rwStud(cx - rx * .82, cy + rx * .12, 7.5) + rwStud(cx + rx * .28, cy - rx * .22, 6.5) + rwStud(cx + rx * .9, cy + rx * .06, 5.5);

// ---- the bosses: viewBox 0 0 200 200, ground at y 184. body = drawn under both faces; idle / hit = the face groups ----
const RW_BOSSES = {
  // Gloop: a wobbly purple jelly with a curl on top, one tooth and a waving arm
  gloop: {
    name: 'Gloop',
    body:
      `<ellipse cx="34" cy="104" rx="11" ry="19" transform="rotate(-32 34 104)" ${rwF('v2')}/>` +
      `<ellipse cx="33" cy="102" rx="8.5" ry="16" transform="rotate(-32 33 102)" ${rwF('v')}/>` +
      `<ellipse cx="166" cy="134" rx="10" ry="17" transform="rotate(28 166 134)" ${rwF('v2')}/>` +
      `<path ${rwF('v2')} d="M100 46C128 46 146 74 154 104C160 126 166 146 166 160Q166 174 154 176Q148 186 136 178Q126 188 114 179` +
      `Q104 188 92 179Q80 188 70 178Q58 186 50 176Q34 174 34 160C34 146 40 126 46 104C54 74 72 46 100 46Z"/>` +
      `<path ${rwF('v')} d="M98 48C124 48 141 74 148 102C153 122 158 142 158 156Q158 168 148 170Q140 178 130 171Q120 179 110 172` +
      `Q100 179 90 172Q80 178 70 171Q60 176 52 169Q38 166 38 154C38 140 44 122 50 102C57 74 74 48 98 48Z"/>` +
      `<path ${rwF('v2')} d="M98 50Q90 34 102 27Q116 28 110 41Q106 33 101 37Q99 43 106 49Z"/>` +
      `<path ${rwF('v')} d="M97 49Q90 35 101 29Q113 30 108 39Q104 33 100 36Q98 42 104 48Z"/>` +
      `<ellipse cx="67" cy="86" rx="8" ry="19" transform="rotate(28 67 86)" ${rwF('v1')} opacity=".85"/>` +
      `<circle cx="80" cy="64" r="4.5" ${rwF('w')} opacity=".85"/>` +
      `<circle cx="132" cy="146" r="6" ${rwF('v1')} opacity=".45"/><circle cx="58" cy="146" r="4" ${rwF('v1')} opacity=".45"/>` +
      `<circle cx="142" cy="120" r="3.5" ${rwF('v1')} opacity=".45"/>` +
      `<path ${rwF('v3')} opacity=".35" d="M52 169Q60 176 70 171Q80 178 90 172Q100 179 110 172Q120 179 130 171Q140 178 148 170Q150 176 138 180` +
      `Q126 186 114 180Q104 186 92 180Q80 186 70 180Q58 184 52 169Z"/>`,
    idle:
      `<path ${rwS('k', 4)} stroke-linecap="round" d="M70 84Q80 78 92 84M110 80Q122 73 134 79"/>` +
      rwEye(82, 104, 12, 15) + rwEye(121, 102, 14, 17) + rwCheek(64, 126) + rwCheek(140, 124) +
      rwGrin(101, 128, 19, 11) + `<rect x="104" y="128.5" width="7" height="6.5" rx="1.6" ${rwF('w')}/>`,
    hit: rwSquint(82, 104, 9, 1) + rwSquint(121, 102, 10, -1) + rwCheek(64, 126) + rwCheek(140, 124) + rwOh(101, 136, 8, 10) +
      rwDizzy(100, 34, 34),
  },
  // Robo-Bonk: a friendly robot with a screen face, a red antenna ball and springy arms
  robo: {
    name: 'Robo-Bonk',
    body:
      `<path ${rwS('e3', 5)} stroke-linecap="round" stroke-linejoin="round" d="M66 132L58 124L54 134L46 122L42 132L36 120"/>` +
      `<circle cx="32" cy="112" r="10" ${rwF('e2')}/><circle cx="30.5" cy="110.5" r="8" ${rwF('e')}/><circle cx="28" cy="108" r="2.4" ${rwF('w')} opacity=".8"/>` +
      `<path ${rwS('e3', 5)} stroke-linecap="round" stroke-linejoin="round" d="M134 134L142 142L146 132L154 144L158 134L164 146"/>` +
      `<circle cx="168" cy="150" r="10" ${rwF('e3')}/><circle cx="166.5" cy="148.5" r="8" ${rwF('e2')}/>` +
      `<rect x="64" y="164" width="30" height="20" rx="8" ${rwF('e3')}/><rect x="64" y="164" width="27" height="15" rx="7" ${rwF('e2')}/>` +
      `<rect x="106" y="164" width="30" height="20" rx="8" ${rwF('e3')}/><rect x="106" y="164" width="27" height="15" rx="7" ${rwF('e2')}/>` +
      `<rect x="62" y="116" width="76" height="54" rx="15" ${rwF('e2')}/><rect x="62" y="116" width="71" height="50" rx="14" ${rwF('e')}/>` +
      `<rect x="68" y="120" width="40" height="5" rx="2.5" ${rwF('e1')}/>` +
      `<rect x="76" y="130" width="42" height="26" rx="8" ${rwF('c3')}/><rect x="77" y="131" width="39" height="23" rx="7" ${rwF('c2')}/>` +
      `<circle cx="87" cy="142.5" r="5" ${rwF('r')}/><circle cx="97" cy="142.5" r="5" ${rwF('y')}/><circle cx="107" cy="142.5" r="5" ${rwF('g')}/>` +
      `<circle cx="85.5" cy="141" r="1.6" ${rwF('w')}/><circle cx="95.5" cy="141" r="1.6" ${rwF('w')}/><circle cx="105.5" cy="141" r="1.6" ${rwF('w')}/>` +
      `<rect x="89" y="108" width="22" height="12" rx="3" ${rwF('e3')}/>` +
      `<rect x="30" y="62" width="16" height="34" rx="6" ${rwF('e2')}/><rect x="30" y="62" width="12" height="32" rx="5" ${rwF('e')}/>` +
      `<rect x="154" y="62" width="16" height="34" rx="6" ${rwF('e3')}/><rect x="156" y="62" width="12" height="32" rx="5" ${rwF('e2')}/>` +
      `<path ${rwS('e3', 4.5)} stroke-linecap="round" d="M100 42V22"/>` +
      `<circle cx="100" cy="17" r="9" ${rwF('r2')}/><circle cx="98.5" cy="15.5" r="7.5" ${rwF('r')}/><circle cx="96" cy="13" r="2.4" ${rwF('w')}/>` +
      `<rect x="40" y="38" width="120" height="80" rx="24" ${rwF('c2')}/><rect x="40" y="38" width="115" height="75" rx="23" ${rwF('c')}/>` +
      `<rect x="54" y="43" width="64" height="6" rx="3" ${rwF('c1')} opacity=".9"/><circle cx="48" cy="52" r="3" ${rwF('w')} opacity=".8"/>` +
      `<rect x="53" y="54" width="92" height="52" rx="15" ${rwF('c3')}/><rect x="54" y="55" width="89" height="49" rx="14" ${rwF('k2')}/>` +
      `<path ${rwF('w')} opacity=".1" d="M60 100L96 56H112L76 104H66Q60 104 60 100Z"/>`,
    idle: rwEye(81, 75, 9, 11, 'c1') + rwEye(118, 75, 9, 11, 'c1') +
      `<path ${rwS('c1', 4.5)} stroke-linecap="round" d="M85 90Q100 101 115 90"/>` + rwCheek(67, 90, 6, 3.5) + rwCheek(132, 90, 6, 3.5),
    hit: rwSquint(81, 76, 8, 1, 'c1') + rwSquint(118, 76, 8, -1, 'c1') +
      `<path ${rwS('c1', 4)} stroke-linecap="round" stroke-linejoin="round" d="M83 94Q88 88 93 94Q99 100 104 94Q110 88 116 94"/>` +
      rwDizzy(100, 12, 32),
  },
  // Captain Inky: a pink octopus in a pirate hat with a curly moustache
  inky: {
    name: 'Captain Inky',
    body:
      ['M68 126Q46 150 30 150Q17 148 22 137', 'M80 138Q68 166 54 173Q42 177 44 166', 'M95 144Q92 170 84 181',
        'M108 144Q112 170 120 181', 'M122 138Q134 166 148 173Q160 177 158 166', 'M134 126Q156 150 172 150Q185 148 180 137']
        .map(d => `<path ${rwS('p2', 19)} stroke-linecap="round" d="${d}"/>`).join('') +
      ['M67 125Q45 148 30 148Q19 146 22 138', 'M79 137Q67 164 54 171Q44 174 45 166', 'M94 143Q91 168 83 179',
        'M107 143Q111 168 118 179', 'M121 137Q133 164 146 171Q156 174 156 166', 'M133 125Q155 148 170 148Q181 146 178 138']
        .map(d => `<path ${rwS('p', 13)} stroke-linecap="round" d="${d}"/>`).join('') +
      [[40, 152], [56, 172], [86, 176], [116, 176], [146, 172], [162, 152]]
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" ${rwF('p1')}/>`).join('') +
      `<ellipse cx="100" cy="100" rx="58" ry="52" ${rwF('p2')}/><ellipse cx="97" cy="97" rx="54" ry="48" ${rwF('p')}/>` +
      `<ellipse cx="72" cy="78" rx="10" ry="18" transform="rotate(38 72 78)" ${rwF('p1')} opacity=".9"/>` +
      `<circle cx="134" cy="118" r="5" ${rwF('p2')} opacity=".5"/><circle cx="144" cy="104" r="3.4" ${rwF('p2')} opacity=".5"/>` +
      `<g transform="rotate(-7 100 56)"><path ${rwF('k')} d="M36 68Q56 32 100 30Q144 32 164 68Q150 74 100 72Q50 74 36 68Z"/>` +
      `<path ${rwF('k2')} d="M40 65Q58 35 99 33Q138 35 157 64Q142 69 99 67Q54 69 40 65Z"/>` +
      `<path ${rwS('y2', 5)} stroke-linecap="round" d="M44 66Q100 78 156 66"/>` + rwStud(100, 50, 10) +
      `<path ${rwS('e', 2.5)} stroke-linecap="round" opacity=".5" d="M56 52Q74 38 96 37"/></g>`,
    idle: rwEye(80, 100, 12, 14) + rwEye(118, 100, 12, 14) + rwCheek(62, 116) + rwCheek(136, 116) +
      rwGrin(99, 128, 10, 7) +
      `<path ${rwF('k2')} d="M99 120Q90 113 80 119Q72 125 64 116Q67 128 80 128Q92 128 99 122Q106 128 118 128Q131 128 134 116Q126 125 118 119Q108 113 99 120Z"/>`,
    hit: rwSquint(80, 100, 9, 1) + rwSquint(118, 100, 9, -1) + rwCheek(62, 116) + rwCheek(136, 116) + rwOh(99, 134, 6, 8) +
      `<path ${rwF('k2')} d="M99 122Q90 117 81 124Q73 131 66 124Q69 134 81 133Q92 132 99 125Q106 132 117 133Q129 134 132 124Q125 131 117 124Q108 117 99 122Z"/>` +
      rwDizzy(100, 24, 36),
  },
  // Zorp: a green alien with three eyes and wobbly antennae
  zorp: {
    name: 'Zorp',
    body:
      `<path ${rwS('g2', 5)} stroke-linecap="round" d="M80 50Q72 30 60 22M120 50Q128 30 140 22"/>` +
      `<circle cx="58" cy="20" r="10" ${rwF('y2')}/><circle cx="56.5" cy="18.5" r="8.5" ${rwF('y')}/><circle cx="54" cy="16" r="2.6" ${rwF('w')}/>` +
      `<circle cx="142" cy="20" r="10" ${rwF('y2')}/><circle cx="140.5" cy="18.5" r="8.5" ${rwF('y')}/><circle cx="138" cy="16" r="2.6" ${rwF('w')}/>` +
      `<ellipse cx="82" cy="180" rx="15" ry="6.5" ${rwF('g3')}/><ellipse cx="118" cy="180" rx="15" ry="6.5" ${rwF('g3')}/>` +
      `<ellipse cx="62" cy="150" rx="7.5" ry="15" transform="rotate(42 62 150)" ${rwF('g2')}/>` +
      `<ellipse cx="140" cy="138" rx="7.5" ry="15" transform="rotate(-38 140 138)" ${rwF('g2')}/>` +
      `<ellipse cx="139" cy="137" rx="5.5" ry="12.5" transform="rotate(-38 139 137)" ${rwF('g')}/>` +
      `<path ${rwF('g2')} d="M68 178Q64 134 100 130Q136 134 132 178Z"/><path ${rwF('g')} d="M70 176Q67 136 99 133Q129 136 127 176Z"/>` +
      `<ellipse cx="99" cy="160" rx="16" ry="12" ${rwF('g1')} opacity=".6"/>` +
      `<ellipse cx="100" cy="88" rx="62" ry="50" ${rwF('g2')}/><ellipse cx="97" cy="85" rx="58" ry="46" ${rwF('g')}/>` +
      `<ellipse cx="68" cy="60" rx="15" ry="8" transform="rotate(-28 68 60)" ${rwF('g1')} opacity=".9"/>` +
      `<circle cx="52" cy="74" r="3.2" ${rwF('w')} opacity=".8"/>` +
      `<circle cx="140" cy="66" r="6" ${rwF('g2')} opacity=".55"/><circle cx="150" cy="88" r="4" ${rwF('g2')} opacity=".55"/>` +
      `<circle cx="54" cy="102" r="4" ${rwF('g2')} opacity=".55"/>`,
    idle: rwEye(73, 90, 10, 12) + rwEye(100, 78, 13, 15) + rwEye(127, 90, 10, 12) + rwCheek(60, 108, 7, 4.5) + rwCheek(140, 108, 7, 4.5) +
      rwGrin(100, 107, 13, 8),
    hit: rwSquint(73, 90, 7.5, 1) + rwSquint(127, 90, 7.5, -1) +
      `<circle cx="100" cy="80" r="10" ${rwS('k', 3.6)}/><circle cx="100" cy="80" r="3" ${rwF('k')}/>` +
      rwCheek(60, 108, 7, 4.5) + rwCheek(140, 108, 7, 4.5) + rwOh(100, 114, 6, 7.5) + rwDizzy(100, 30, 34),
  },
};

// ---- the treasure chest: 3/4 view, front and right side, barrel lid; open = lid back, gold and gems inside ----
const RW_CHEST = {
  shadow: `<ellipse cx="104" cy="177" rx="80" ry="10" ${rwF('k')} opacity=".14"/>`,
  body:
    `<path ${rwF('n2')} d="M146 102L176 88V152Q176 157 172 159L146 172Z"/>` +
    `<path ${rwF('n3')} opacity=".55" d="M146 162L176 148V152Q176 157 172 159L146 172Z"/>` +
    `<path ${rwS('n3', 3)} d="M146 126L176 112M146 149L176 135"/>` +
    `<path ${rwF('y3')} d="M165 93.1L176 88V152Q176 156 173 158L165 161.7Z"/>` +
    `<path ${rwF('n')} d="M26 102H146V166Q146 172 140 172H32Q26 172 26 166Z"/>` +
    `<path ${rwF('n2')} d="M26 161H146V166Q146 172 140 172H32Q26 172 26 166Z"/>` +
    `<path ${rwS('n2', 3)} d="M26 126H146M26 149H146"/>` +
    `<path ${rwS('n1', 2)} stroke-linecap="round" opacity=".55" d="M44 107H128M44 130.5H128M44 153.5H128"/>` +
    `<path ${rwS('n2', 1.6)} stroke-linecap="round" opacity=".7" d="M56 116Q64 113 72 116M100 141Q110 138 118 141M60 163Q66 161 72 163"/>` +
    `<rect x="26" y="102" width="14" height="70" rx="3" ${rwF('y2')}/><rect x="26" y="102" width="10" height="67" rx="3" ${rwF('y')}/>` +
    `<rect x="28" y="106" width="2.6" height="56" rx="1.3" ${rwF('y1')}/>` +
    `<rect x="132" y="102" width="14" height="70" rx="3" ${rwF('y3')}/><rect x="132" y="102" width="11" height="67" rx="3" ${rwF('y2')}/>` +
    [[33, 116], [33, 140], [33, 162], [137.5, 116], [137.5, 140], [137.5, 162]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.3" ${rwF('y3')}/>`).join(''),
  lid:
    `<path ${rwF('n2')} d="M146 103L176 89V70Q176 50 160 46Q146 46 146 62Z"/>` +
    `<path ${rwF('n1')} opacity=".35" d="M150 64Q151 52 160 51Q166 52 168 58Q158 56 154 66Z"/>` +
    `<path ${rwS('y3', 5)} stroke-linejoin="round" d="M146 62Q146 46 160 46Q176 50 176 70V88"/>` +
    `<path ${rwF('n')} d="M26 102V68Q26 49 46 48H132Q146 48 146 62V102Z"/>` +
    `<path ${rwF('n1')} opacity=".8" d="M31 72Q31 54 47 53H131Q141 53 142 60Q122 58 48 60Q36 61 35 76Z"/>` +
    `<path ${rwF('n2')} opacity=".55" d="M26 86H146V97H26Z"/>` +
    `<path ${rwS('n2', 3)} d="M26 76H146"/>` +
    `<path ${rwF('y')} d="M26 98V68Q26 50 40 48.4V98Z"/><rect x="28" y="60" width="2.6" height="30" rx="1.3" ${rwF('y1')}/>` +
    `<path ${rwF('y2')} d="M132 48H133Q146 48 146 62V98H132Z"/>` +
    `<rect x="23" y="96" width="126" height="9" rx="4.5" ${rwF('n3')}/><rect x="26" y="96.6" width="116" height="2.4" rx="1.2" ${rwF('n1')} opacity=".6"/>` +
    `<path ${rwF('n3')} d="M146 96L177 82V90L146 105Z"/>` +
    rwStud(86, 69, 10) +
    `<rect x="79" y="88" width="15" height="13" rx="3" ${rwF('y3')}/>`,
  lock:
    `<rect x="72" y="94" width="29" height="31" rx="7" ${rwF('y3')}/><rect x="72" y="94" width="26" height="28" rx="6.5" ${rwF('y')}/>` +
    `<rect x="75" y="97" width="4" height="15" rx="2" ${rwF('y1')}/>` +
    `<circle cx="86" cy="106" r="4.4" ${rwF('n3')}/><path ${rwF('n3')} d="M84 107H88L89.4 115H82.6Z"/>`,
  lidOpen:
    `<path ${rwF('n2')} d="M56 89H176L182 36Q182 29 175 29H67Q60 29 60 36Z"/>` +
    `<path ${rwF('n')} d="M74 82H164L168 40H76Z"/><path ${rwF('n1')} opacity=".5" d="M76 44H167L166.6 48H75.7Z"/>` +
    `<path ${rwS('n2', 2.6)} d="M75 61H166"/>` +
    `<path ${rwF('n3')} opacity=".5" d="M57 74H178L176 89H56Z"/>` +
    `<path ${rwF('y2')} d="M56 89L60 36Q60 29 67 29H71L68 89Z"/>` +
    `<path ${rwF('y3')} d="M165 89L170 29H175Q182 29 182 36L176 89Z"/>` +
    `<path ${rwS('n', 5)} stroke-linecap="round" d="M64 29H172"/>`,
  inside:
    `<ellipse cx="102" cy="90" rx="70" ry="24" ${rwF('y1')} opacity=".6"/>` +
    `<path ${rwF('n3')} d="M26 102H146L176 88H56Z"/>` +
    `<path ${rwF('y2')} d="M30 102Q36 84 56 82Q66 70 84 74Q98 62 114 70Q132 64 144 78Q166 80 172 92L146 102Z"/>` +
    `<path ${rwF('y')} d="M34 100Q40 86 57 85Q67 74 84 77Q98 66 113 73Q130 68 141 80Q158 82 165 91L146 99Z"/>` +
    [[56, 88], [79, 79], [126, 76], [149, 86], [68, 97], [116, 93], [100, 88], [134, 95]]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y + 1.8}" rx="8.5" ry="3.8" ${rwF('y3')}/>` +
        `<ellipse cx="${x}" cy="${y}" rx="8.5" ry="3.8" ${rwF('y1')}/><ellipse cx="${x + .6}" cy="${y + .4}" rx="5" ry="2" ${rwF('y')}/>`).join('') +
    `<path ${rwF('r2')} d="M98 58L110 70L98 86L86 70Z"/><path ${rwF('r')} d="M98 58L104 70L98 86L86 70Z"/>` +
    `<path ${rwF('r1')} d="M98 58L92 70H86Z"/><path ${rwF('r3')} opacity=".5" d="M98 86L110 70H104Z"/>` +
    `<path ${rwF('c2')} d="M140 70L150 79L140 92L130 79Z"/><path ${rwF('c')} d="M140 70L145 79L140 92L130 79Z"/><path ${rwF('c1')} d="M140 70L135 79H130Z"/>` +
    `<circle cx="66" cy="78" r="5.5" ${rwF('w3')}/><circle cx="65" cy="77" r="4.6" ${rwF('w')}/>`,
  sparks: rwSpark(48, 62, 7) + rwSpark(160, 54, 9) + rwSpark(118, 44, 6, 'y1') + rwSpark(80, 50, 5, 'w', .9),
};

const RW = {
  BOSS: { 'Gloop': 'gloop', 'Robo-Bonk': 'robo', 'Captain Inky': 'inky', 'Zorp': 'zorp' },

  // an inline SVG drawing (class "art" for the --a-* roles). label: spoken name, else decorative
  art(body, cls, vb = '0 0 200 200', label = '') {
    const a = label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true" focusable="false"';
    return `<svg class="art ${cls}" viewBox="${vb}" ${a}>${body}</svg>`;
  },

  chest(open) {
    const C = RW_CHEST;
    const body = open ? C.shadow + C.lidOpen + C.inside + C.body + C.lock + C.sparks : C.shadow + C.body + C.lid + C.lock;
    return RW.art(body, 'rw-chest-art' + (open ? ' rw-open' : ''));
  },

  // soft light rays behind the chest (12 wedges and a glow)
  rays() {
    let d = '';
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6, b = a + Math.PI / 14;
      d += `M100 100L${rw1(100 + Math.cos(a) * 100)} ${rw1(100 + Math.sin(a) * 100)}L${rw1(100 + Math.cos(b) * 100)} ${rw1(100 + Math.sin(b) * 100)}Z`;
    }
    return RW.art(`<circle cx="100" cy="100" r="64" ${rwF('y1')} opacity=".55"/><path ${rwF('y1')} opacity=".7" d="${d}"/>`, 'rw-rays');
  },

  // one reward star (64 grid): a smiling gold star (the object-art star) or an empty slot
  star(on) {
    const D = 'M32 9L39.6 24.5L56.7 27L44.4 39L47.3 56L32 48L16.7 56L19.6 39L7.3 27L24.4 24.5Z';
    const body = on && typeof ART != 'undefined' && ART.star ? ART.star
      : `<path ${rwF('e1')} stroke="var(--a-e1)" stroke-width="6" stroke-linejoin="round" d="${D}"/>` +
      `<path ${rwF('w2')} stroke="var(--a-w2)" stroke-width="3" stroke-linejoin="round" transform="translate(32 33) scale(.84) translate(-32 -32)" d="${D}"/>`;
    return RW.art(body, 'rw-star', '0 0 64 64');
  },

  // the round's rating: n of `of` stars, the middle one bigger and lifted; earned stars pop in one by one (CSS, --i)
  rate(n, of = 3) {
    let h = '';
    for (let i = 0; i < of; i++) h += `<span class="rw-st${i < n ? ' on' : ''}" style="--i:${i}">${RW.star(i < n)}</span>`;
    return `<div class="rw-rate" role="img" aria-label="${n} of ${of} stars">${h}</div>`;
  },

  // boss key for a boss name ('' when it has no drawing)
  bossOf(name) {
    return RW.BOSS[name] || '';
  },

  // a boss drawing. pose 'idle' or 'hit' (both faces are in the markup; CSS shows one, and .bossE.hit shows the hit face).
  // Returns '' for a name without a drawing, so the caller can keep its emoji.
  boss(name, pose = 'idle', cls = '') {
    const k = RW.bossOf(name), B = RW_BOSSES[k];
    if (!B) return '';
    const body = `<ellipse cx="100" cy="185" rx="60" ry="8" ${rwF('k')} opacity=".14"/><g class="rb-fig">${B.body}` +
      `<g class="rb-idle">${B.idle}</g><g class="rb-hit">${B.hit}</g></g>`;
    return RW.art(body, `rw-boss rw-b-${k} rw-p-${pose == 'hit' ? 'hit' : 'idle'}${cls ? ' ' + cls : ''}`, '0 0 200 200', B.name);
  },

  // a prize rosette with the prize in the middle: its drawn emblem (P4-07), else the emoji
  badge(prize) {
    const ribbon = `<path ${rwF('r2')} d="M22 34L13 60L22 55.5L26.5 62L33 39Z"/><path ${rwF('r')} d="M42 34L51 60L42 55.5L37.5 62L31 39Z"/>`;
    const rose = `<path ${rwF('y2')} stroke="var(--a-y2)" stroke-width="3" stroke-linejoin="round" d="${rwStarD(32, 28, 25, 21, 14)}"/>` +
      `<path ${rwF('y')} stroke="var(--a-y)" stroke-width="2" stroke-linejoin="round" d="${rwStarD(31, 27, 23.5, 19.8, 14)}"/>` +
      `<circle cx="32" cy="28" r="16.5" ${rwF('y3')}/><circle cx="31.4" cy="27.4" r="15.6" ${rwF('w')}/>` +
      `<path ${rwS('y1', 2.2)} stroke-linecap="round" d="M15 21Q19 11 29 9"/>`;
    // P4-07: a prize with a drawn emblem shows it on the rosette's face (the same badge the pet then wears); others keep the emoji
    const emb = typeof wearEmb == 'function' ? wearEmb(prize) : '';
    if (emb) return `<span class="rw-badge">${RW.art(ribbon + rose + `<g transform="translate(31.4 27.4) scale(.4) translate(-32 -32)">${emb}</g>`,
      'rw-rose', '0 0 64 64', wearName(prize))}</span>`;
    return `<span class="rw-badge">${RW.art(ribbon + rose, 'rw-rose', '0 0 64 64')}<span class="rw-be">${esc(prize)}</span></span>`;
  },

  // a sticker prize: die-cut white border, a slight turn, "New" tag the first time
  sticker(s, isNew, i = 0) {
    const turn = [-7, 5, -3, 7][i % 4];
    return `<span class="rw-stk" style="--r:${turn}deg"><span class="rw-se">${esc(s)}</span>${isNew ? UI.tag('New', 'new') : ''}</span>`;
  },

  // icon for a line of the game-time list (ptCalc labels in 58-playtime.js)
  ptIcon(label) {
    const L = [[/^Round done/, 'check'], [/^Keep trying|^Good try/, 'heart'], [/^New stop/, 'map'], [/^Beat your old/, 'trophy'],
      [/^Harder world/, 'bolt'], [/^Perfect/, 'star'], [/^Beat the boss/, 'crown'], [/^Fixed/, 'replay'], [/^Already mastered/, 'crown'],
      [/^Tested out/, 'bolt'], [/^Practice round/, 'target'], [/^Played/, 'replay'], [/^Daily review/, 'review'],
      [/^Daily mission/, 'calendar'], [/^Puzzle/, 'puzzle']];
    for (const [re, ic] of L) if (re.test(label)) return ic;
    return 'plus';
  },

  // a reward line without picture characters at the start, and with the coin emoji said in words (the icon carries the picture)
  clean(m) {
    return String(m).replace(/^\s*(\p{Extended_Pictographic}️?\s*)+/u, '').replace(/\s*\u{1FA99}️?/gu, ' coins');
  },

  // a list row: icon disc + text (html). kind sets the disc colour (star | coin | ticket | ...)
  row(kind, icon, html, id = '') {
    return `<div class="rw-er ${kind}"${id ? ` id="${id}"` : ''}><span class="rw-ed">${ico(icon, 28, icon == 'coin' ? 'ic-coin' : '')}</span>` +
      `<div class="rw-et">${html}</div></div>`;
  },

  // a message card: art = an icon name or drawn markup (starts with <), html = the text, kind: win | tip | '' (plain)
  msg(art, html, kind = '') {
    const a = art[0] == '<' ? art : ico(art, 30);
    return `<div class="rw-msg${kind ? ' ' + kind : ''}"><span class="rw-md">${a}</span><div class="rw-mt">${html}</div></div>`;
  },

  // the child's pet cheering (round with no stars, mix, test out): the drawn pet (every pet is on the rig since P4-06)
  pet() {
    const w = S.wear || {};
    return `<div class="rw-pet">${petSVG(S.pet, stage(), 'cheer', { hat: wearOf(w.hat), toy: wearOf(w.toy) })}</div>`;
  },

  // ---- screens ----
  // before the tap: the closed chest, rattling (#chest is the button)
  pre() {
    return `<div class="center rw-fin" id="fin"><div class="rw-pre"><h1 class="rw-h">Round complete!</h1>` +
      `<button class="rw-chest" id="chest" aria-label="Open the treasure chest"><span class="rw-glow">${RW.rays()}</span>${RW.chest(0)}</button>` +
      `<p class="rw-sub rw-tap">${ico('gift', 26)}<span>Tap the treasure chest!</span></p></div></div>`;
  },

  // after the tap. o: {sc, n, rate (stars or -1 for none), line, tip (the next step after a low score, or ''), again (label),
  // next (true: Next stop), menu ('Map' | 'Home')}
  done(o) {
    const art = o.rate >= 0 ? RW.rate(o.rate) : RW.pet();
    const main = o.next ? UI.btn('Next stop', { kind: 'primary', size: 'lg', wide: true, icon: 'play', id: 'nxt' })
      : UI.btn(o.again, { kind: 'primary', size: 'lg', wide: true, icon: 'replay', id: 'again' });
    const btns = main + `<div class="rw-two">${UI.btn('Bonus game', { kind: 'subject', p: 'play', icon: 'gamepad', id: 'bonus' })}` +
      `${UI.btn(o.menu, { icon: o.menu == 'Home' ? 'home' : 'map', id: 'menu' })}</div>`;
    const stars = o.sc ? RW.row('star', 'star', `<b class="rw-num">+0</b> stars`, 'rwst') : '';
    return `<div class="rw-res"><section class="rw-a"><div class="rw-hero">${art}` +
      `<h1 class="rw-score" id="sc"><b>${o.sc}</b> out of ${o.n}</h1><p class="rw-line">${esc(o.line)}</p>` +
      `${o.tip ? `<p class="rw-tip">${ico('target', 24)}<span>${esc(o.tip)}</span></p>` : ''}</div>` +
      `<div class="rw-tre"><div class="rw-chest-o">${RW.rays()}${RW.chest(1)}</div><div class="rw-prz" id="prz"></div></div></section>` +
      `<section class="rw-b"><div class="rw-feed"><div class="rw-msgs" id="msgs"></div><div class="rw-earn" id="earn">${stars}</div></div>` +
      `<div class="rw-dock" id="btns" style="visibility:hidden">${btns}</div></section></div>`;
  },

  // count the stars row up to v
  count(v) {
    const r = document.getElementById('rwst');
    if (!r) return;
    r.querySelector('.rw-num').textContent = '+' + v;
    r.classList.remove('bump');
    void r.offsetWidth;
    r.classList.add('bump');
  },

  // the boss intro screen (#fight, #nope)
  bossIn(p, name, e, prize) {
    const art = RW.boss(name, 'idle', 'rw-big') || `<span class="bossbig">${e}</span>`;
    let zaps = '';
    for (let i = 0; i < 7; i++) zaps += ico('bolt', 22);
    return `<div class="center rw-bin s-${p}"><div class="rw-bstage">${art}</div>` +
      `<h1 class="rw-h">${esc(name)} appears!</h1><p class="rw-sub">Every right answer zaps ${esc(name)}. Zap 7 times to win a prize:</p>` +
      `<div class="rw-zaps" aria-hidden="true">${zaps}</div>${RW.badge(prize)}` +
      `<div class="rw-acts">${UI.btn("Let's go!", { kind: 'subject', p, size: 'lg', icon: 'bolt', id: 'fight' })}` +
      `${UI.btn('Map', { icon: 'map', id: 'nope' })}</div></div>`;
  },

  // drawn confetti: n pieces (at most 40) fly out of the middle of host and fade (about 1.2 s). Hidden in calm mode and with reduced
  // motion. On the body (P4-17: confetti() in 12-speech.js) it is fixed to the middle of the screen, above overlays.
  burst(host, n = 24) {
    if (!host || !host.isConnected) return;
    n = Math.min(40, n);
    const b = document.createElement('div');
    b.className = host == document.body ? 'rw-burst rw-fs' : 'rw-burst';
    b.setAttribute('aria-hidden', 'true');
    let h = '';
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + Math.random() * .4, d = 70 + Math.random() * 90;
      h += `<i class="c${i % 6}${i % 3 ? '' : ' r'}" style="--x:${Math.round(Math.cos(a) * d)}px;--y:${Math.round(Math.sin(a) * d * .8 - 30)}px;` +
        `--t:${Math.round(Math.random() * 360 - 180)}deg"></i>`;
    }
    b.innerHTML = h;
    host.appendChild(b);
    setTimeout(() => b.remove(), 1400);
  },
};
