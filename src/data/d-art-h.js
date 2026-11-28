/* RELB-MAPS (review fix 8), part teaches (the Discover map loads it). Pictures for Discover questions that ask about a picture:
   a US state map, Earth's layers, a wave, a plant cell and an animal cell. No words in any picture (aria-hidden).
   DPIC(id, item, form) (called by bankBuild, 37-bank.js, for a choice item with no picture of its own) gives the picture or ''.
   Before the part loads DPIC is not defined, so the question shows as before, without the picture. No data row changes.
   A part is highlighted only when the question names it, and never when the answer or a choice names it too (the shaded state is
   the one asked about, never the answer: "Which state shares a border with Ohio?" shades Ohio). With two or more named parts
   nothing is highlighted (shading three layers would leave the fourth as the answer).
   The map paths are made by tools/usmap.py (hand-typed corners, projected and rounded; neighbours checked against DISC_ADJ). */
const USMAP = {AK:'M40 132 47 165 54 168 57 164 71 174 69 178 63 173 56 170 49 166 42 167 37 165 32 169 28 170 29 165 25 171 19 179 12 183 2 186 8 182 16 173 19 172H12L10 167 6 165 5 160 7 156 13 153 14 151 6 150 4 146 9 144 13 143 10 140 8 137 13 134 15 131 21 128 27 130 34 132Z',AL:'M219 95 231 94 234 106 236 117 223 118 224 122H220L219 113Z',AR:'M189 88 209 87 208 90H211L209 96 206 102V108H192V105L190 104V94Z',AZ:'M102 77 124 81 119 113 110 112 93 102 94 101 97 88 101 83Z',CA:'M66 39 83 44 78 60 97 88 94 101 82 100 78 90 69 85 66 72V64L63 51 62 47Z',CO:'M127 58 148 61H157L156 67 155 84H151L124 81Z',CT:'M276 45 283 43 284 47 280 49 277 51V50Z',DE:'M270 60 271 59V61L273 64 275 67H272Z',FL:'M223 118 236 117 237 118 250 117 254 116 256 123 261 130 264 137 265 145 261 147 256 143 251 135 249 126 243 122H240L235 124 229 121 224 122Z',GA:'M231 94 237 93H242L245 96 249 100 254 108V116L250 117 237 118 236 117 234 106Z',HI:'M105 173 112 177 114 179 108 184 104 177ZM99 167 104 168 101 170 99 168ZM94 165H99L96 166ZM86 161 91 164H87ZM74 156H78L77 159 74 158Z',IA:'M181 48 202 47 205 53 207 57 204 60 202 65H184L182 59 181 54Z',ID:'M103 8H107L106 14 110 24 111 30 115 37H122L119 51 107 49 95 47 98 34 100 24V22Z',IL:'M205 53 217 52 218 56 220 70V74L218 79 214 84 212 82 208 74 202 65 204 60 207 57Z',IN:'M218 56H221L230 55 232 70 228 75 223 78 218 79 220 74V70Z',KS:'M156 67 186 68 187 72 189 73V85L155 84Z',KY:'M214 84 212 87H219L238 84 245 77 242 73 237 72 232 70 228 75 223 78 218 79Z',LA:'M192 108H206L204 114V119H213L214 123 217 129 212 130 205 128 193 127 194 120 192 114Z',MA:'M276 41 279 40 286 38V40L288 42 290 41 291 43 289 44 287 46 285 43H283L276 45Z',MD:'M254 63 270 60 272 67H275L274 69 271 70 269 63 268 65 270 70 266 69 265 66 262 64 259 63 255 66Z',ME:'M281 24 284 20 283 16 285 11 289 10 291 11 293 19 298 23 292 27 287 33 286 36 284 33Z',MI:'M221 56 230 55 235 54 236 51 239 49V47L237 42 236 41 232 44 234 40 233 36 227 32V34L222 38V46L223 51ZM205 30 214 24 216 29 226 27 228 28 230 30 227 31H224L218 33 216 37 214 33Z',MN:'M178 16H186L194 19 203 21H207L198 29 197 33 195 36 198 42 202 47 181 48 180 37V34L179 28Z',MO:'M184 65H202L208 74 212 82 214 84 212 87 211 90H208L209 87 189 88V85V73L187 72 186 68Z',MS:'M209 96 219 95V113L220 122 214 123 213 119H204V114L206 108V102Z',MT:'M107 8 152 15 151 32 150 38 122 34V37H115L111 30 110 24 106 14Z',NC:'M273 78 247 83 244 87 238 91 237 93H242L246 91H252L253 92 258 91 264 96 267 95 271 90 273 89 277 85 275 81Z',ND:'M152 15 178 16 179 28 180 34 151 32Z',NE:'M149 49 172 50 181 54 182 59 184 65 186 68 156 67 157 61H148Z',NH:'M280 26 281 24 284 33 286 36V38L279 40V31Z',NJ:'M276 51V53L277 55V58L275 64 271 61V59L273 57 271 53 272 50Z',NM:'M124 81 151 84V87L149 113 132 111V112L124 111 123 114 119 113Z',NV:'M83 44 95 47 107 49 102 77 101 83 97 88 78 60Z',NY:'M250 49 253 45 252 43 263 39V35L268 30 273 28 275 36 276 41V45L277 50V51L284 49 280 52 276 54V53V51L272 50 269 47 251 51Z',OH:'M230 55 235 54 239 56 243 55 247 51 249 59V62L245 68 242 73 237 72 232 70Z',OK:'M151 84H155L189 85V88L190 94V104L183 103 178 104 169 101 164 99V88L151 87Z',OR:'M73 16 77 21 84 22H92L100 24 98 34 95 47 83 44 66 39V34Z',PA:'M247 51 250 49 251 51 269 47 272 50 271 53 273 57 271 59 270 60 254 63 250 64 249 59Z',RI:'M283 43H285L287 46 284 47Z',SC:'M242 93 245 96 249 100 254 108 259 104 262 99 264 96 258 91 253 92 252 91H246Z',SD:'M151 32 180 34V37L181 48V54L172 50 149 49 150 38Z',TN:'M212 87H219L238 84 247 83 244 87 238 91 237 93 231 94 219 95 209 96 211 90Z',TX:'M151 87 164 88V99L169 101 178 104 183 103 190 104 192 105V108V114L194 120 193 127 189 129 180 135 175 140 176 148 167 145 165 139 161 135 156 126 151 125 147 130 140 126 132 112V111L149 113Z',UT:'M107 49 119 51V57L127 58 124 81 102 77Z',VA:'M262 64 265 66 266 69 270 70V74L272 76 273 78 247 83 238 84 245 77 253 76 257 71 259 66ZM274 69 271 70 272 75 273 73Z',VT:'M273 28 280 26 279 31V40L276 41 275 36Z',WA:'M74 3 82 2 103 8 100 22V24L92 22H84L77 21 73 16 74 12Z',WI:'M198 29 202 28 205 30 214 33 216 37 219 36 217 43V52L205 53 202 47 198 42 195 36 197 33Z',WV:'M249 59 250 64 254 63 255 66 259 63 262 64 259 66 257 71 253 76 245 77 242 73 245 68 249 62Z',WY:'M122 34 150 38 149 49 148 61 127 58 119 57V51L122 37Z'};
const USRING = {CT:[280,47],DE:[272,63],RI:[285,45]};
const DPIC = (() => {
  const low = s => String(s).toLowerCase();
  const svg = (vb, body, cls) => `<svg class="art dpic ${cls}" viewBox="${vb}" aria-hidden="true" focusable="false">${body}</svg>`;
  // the names of the parts a question names, longest first; a part also named by the answer or a choice is dropped
  const named = (it, names) => {
    let q = ' ' + low(it.q.replace(/\*/g, '')) + ' ';
    const ch = [it.a, ...(it.d || [])].map(low), out = [];
    for (const n of names) {
      const rx = new RegExp('\\b' + n + 's?\\b');
      if (!rx.test(q)) continue;
      q = q.replace(new RegExp(rx.source, 'g'), ' ');
      if (!ch.some(c => c.includes(n))) out.push(n); else out.push(null);
    }
    return out;
  };
  const one = ns => ns.length == 1 && ns[0] ? ns[0] : null;

  // ---- the US map: states named by the question shaded; a small state also gets a ring ----
  let ST = null;
  const states = () => ST || (ST = DISC_ST.trim().split('\n').map(r => r.split('|')).map(f => [f[0], f[1]]).sort((a, b) => b[1].length - a[1].length));
  // the states a text names, longest name first ("West Virginia" is not also Virginia); a city, river, lake or mountain named
  // after a state is not the state (New York City, Kansas City, the Ohio River, Lake Michigan, the Sierra Nevada, Mount Washington)
  const statesIn = t => {
    t = ' ' + String(t).replace(/Washington, D\.C\./g, ' ').replace(/\b(Lake|Mount|Sierra) [A-Z][a-z]+|\b[A-Z][a-z]+ (City|Falls|River|Mountains?)\b/g, ' ') + ' ';
    const out = [];
    for (const [c, n] of states()) {
      const rx = new RegExp('\\b' + n + '\\b', 'g');
      if (rx.test(t)) { out.push(c); t = t.replace(rx, ' '); }
    }
    return out;
  };
  function map(it) {
    const hit = statesIn(it.q), ch = [it.a, ...(it.d || [])].flatMap(statesIn);
    if (hit.some(c => ch.includes(c))) return ''; // the answer or a choice names an asked state: no map at all
    if (!hit.length) return '';
    const rest = Object.keys(USMAP).filter(c => !hit.includes(c)).map(c => USMAP[c]).join('');
    return svg('0 0 300 190',
      '<rect x="1" y="126" width="72" height="62" rx="4" fill="none" stroke="var(--a-t2)" stroke-width=".8"/>' +
      '<rect x="74" y="152" width="44" height="36" rx="4" fill="none" stroke="var(--a-t2)" stroke-width=".8"/>' +
      `<path fill="var(--a-t1)" stroke="var(--a-t3)" stroke-width=".7" d="${rest}"/>` +
      hit.map(c => `<path fill="var(--a-r2)" stroke="var(--a-r3)" stroke-width=".9" d="${USMAP[c]}"/>` +
        (USRING[c] ? `<circle cx="${USRING[c][0]}" cy="${USRING[c][1]}" r="9" fill="none" stroke="var(--a-r2)" stroke-width="2"/>` : '')).join(''),
      'dmap');
  }

  // ---- Earth's layers: a globe with a quarter cut away (radii to scale but the crust, which is drawn thicker) ----
  const arc = (r0, r1) => { // the cut-away quarter (top right) of a ring from r0 to r1, centre 60 60
    const c = 60;
    return r0 ? `M${c} ${c - r1}A${r1} ${r1} 0 0 1 ${c + r1} ${c}H${c + r0}A${r0} ${r0} 0 0 0 ${c} ${c - r0}Z` : `M${c} ${c}V${c - r1}A${r1} ${r1} 0 0 1 ${c + r1} ${c}Z`;
  };
  const LAY = [['crust', 54, 50, 'n'], ['mantle', 50, 30, 'o'], ['outer core', 30, 11, 'y'], ['inner core', 11, 0, 'y1']];
  function earth(it) {
    const n = one(named(it, ['inner core', 'outer core', 'core', 'mantle', 'crust']));
    const on = l => n && (n == l || n == 'core' && / core/.test(l));
    let b = '<circle cx="60" cy="60" r="54" fill="var(--a-b2)"/><circle cx="58" cy="58" r="51" fill="var(--a-b)"/>' +
      '<path fill="var(--a-g)" d="M14 40Q22 24 38 22Q46 30 40 40Q30 38 28 50Q34 62 26 74Q14 64 14 40ZM34 84Q46 78 56 86Q58 100 48 108Q36 100 34 84Z"/>' +
      '<ellipse cx="24" cy="30" rx="7" ry="4" fill="var(--a-w)" opacity=".35" transform="rotate(-35 24 30)"/>';
    b += `<path fill="var(--a-w)" d="${arc(0, 54)}"/>`;
    for (const [l, r1, r0, h] of LAY) b += `<path fill="var(--a-${h})" d="${arc(r0, r1)}"${n && !on(l) ? ' opacity=".45"' : ''}/>`;
    if (n) { const [, r1, r0] = n == 'core' ? ['', 30, 0] : LAY.find(x => x[0] == n); b += `<path fill="none" stroke="var(--a-k)" stroke-width="2" d="${arc(r0, r1)}"/>`; }
    return svg('0 0 120 120', b, 'dearth');
  }

  // ---- a wave: rest line, crests and troughs (dots), amplitude (up arrow) and wavelength (arrow between two crests) ----
  function wave(it) {
    const n = one(named(it, ['wavelength', 'amplitude', 'crest', 'trough']));
    const c = p => n == p ? 'var(--a-r2)' : 'var(--a-e3)', w = p => n == p ? 2.6 : 1.6;
    const ar = (p, d, h) => `<path fill="none" stroke="${c(p)}" stroke-width="${w(p)}" d="${d}"/><path fill="${c(p)}" d="${h}"/>`;
    const dot = (p, xs, y) => xs.map(x => `<circle cx="${x}" cy="${y}" r="${n == p ? 4.2 : 2.8}" fill="${c(p)}"/>`).join('');
    return svg('0 0 178 84',
      '<path fill="none" stroke="var(--a-e2)" stroke-width="1.2" opacity=".8" d="M6 47H174"/>' +
      '<path fill="none" stroke="var(--a-b2)" stroke-width="5" d="M10 47Q25 7 40 47T70 47T100 47T130 47T160 47"/>' +
      '<path fill="none" stroke="var(--a-b1)" stroke-width="1.6" d="M18 32Q25 25 31 31M78 32Q85 25 91 31M138 32Q145 25 151 31"/>' +
      ar('wavelength', 'M29 12H81M25 6V18M85 6V18', 'M25 12L31 8.5V15.5ZM85 12L79 8.5V15.5Z') +
      ar('amplitude', 'M168 43V31M150 27H172', 'M168 27L164.5 33H171.5ZM168 47L164.5 41H171.5Z') +
      dot('crest', [25, 85, 145], 27) + dot('trough', [55, 115], 67), 'dwave');
  }

  // ---- cells: a plant cell (wall, membrane, big vacuole, chloroplasts, nucleus) and an animal cell ----
  function cell(it) {
    const n = one(named(it, ['cell wall', 'cell membrane', 'membrane', 'wall', 'chloroplast', 'cytoplasm', 'nucleus', 'vacuole']));
    const p = {'cell wall': 'wall', 'cell membrane': 'membrane'}[n] || n, q = low(it.q);
    const plant = /plant/.test(q), animal = /animal/.test(q), both = plant == animal;
    const hl = (k, d) => p == k ? `<path fill="none" stroke="var(--a-k)" stroke-width="2.2" d="${d}"/>` : '';
    const P = (x) => `<rect x="${x + 4}" y="6" width="84" height="72" rx="8" fill="var(--a-g2)"/>` +
      `<rect x="${x + 9}" y="11" width="74" height="62" rx="5" fill="var(--a-g1)"/>` +
      `<rect x="${x + 11}" y="13" width="70" height="58" rx="4" fill="var(--a-m1)"/>` +
      `<rect x="${x + 36}" y="18" width="40" height="40" rx="10" fill="var(--a-c1)"/>` +
      [[18, 22], [20, 58], [44, 64], [70, 64]].map(([cx, cy]) => `<ellipse cx="${x + cx}" cy="${cy}" rx="6" ry="3.4" fill="var(--a-g)"/><path fill="none" stroke="var(--a-g3)" stroke-width="1" d="M${x + cx - 3} ${cy}H${x + cx + 3}"/>`).join('') +
      `<circle cx="${x + 24}" cy="40" r="9" fill="var(--a-v)"/><circle cx="${x + 26}" cy="42" r="3.4" fill="var(--a-v3)"/>` +
      (p == 'wall' ? `<rect x="${x + 4}" y="6" width="84" height="72" rx="8" fill="none" stroke="var(--a-k)" stroke-width="2.2"/>` : '') +
      hl('membrane', `M${x + 14} 11H${x + 78}Q${x + 83} 11 ${x + 83} 16V68Q${x + 83} 73 ${x + 78} 73H${x + 14}Q${x + 9} 73 ${x + 9} 68V16Q${x + 9} 11 ${x + 14} 11Z`) +
      hl('vacuole', `M${x + 46} 18H${x + 66}Q${x + 76} 18 ${x + 76} 28V48Q${x + 76} 58 ${x + 66} 58H${x + 46}Q${x + 36} 58 ${x + 36} 48V28Q${x + 36} 18 ${x + 46} 18Z`) +
      hl('nucleus', `M${x + 15} 40A9 9 0 1 0 ${x + 33} 40A9 9 0 1 0 ${x + 15} 40Z`) +
      (p == 'chloroplast' ? [[18, 22], [20, 58], [44, 64], [70, 64]].map(([cx, cy]) => `<ellipse cx="${x + cx}" cy="${cy}" rx="7" ry="4.4" fill="none" stroke="var(--a-k)" stroke-width="1.8"/>`).join('') : '') +
      (p == 'cytoplasm' ? `<rect x="${x + 11}" y="13" width="70" height="58" rx="4" fill="none" stroke="var(--a-k)" stroke-width="2.2"/>` : '');
    const A = (x) => `<ellipse cx="${x + 46}" cy="43" rx="42" ry="34" fill="var(--a-p2)"/>` +
      `<ellipse cx="${x + 45}" cy="42" rx="39" ry="31" fill="var(--a-p1)"/>` +
      `<ellipse cx="${x + 46}" cy="43" rx="37" ry="29" fill="var(--a-m1)"/>` +
      [[22, 30, 20], [66, 58, -30], [70, 28, 15]].map(([cx, cy, r]) => `<ellipse cx="${x + cx}" cy="${cy}" rx="7" ry="3.6" fill="var(--a-o)" transform="rotate(${r} ${x + cx} ${cy})"/>`).join('') +
      `<circle cx="${x + 30}" cy="58" r="4" fill="var(--a-c1)"/><circle cx="${x + 46}" cy="42" r="11" fill="var(--a-v)"/><circle cx="${x + 48}" cy="44" r="4" fill="var(--a-v3)"/>` +
      hl('membrane', `M${x + 4} 43A42 34 0 1 0 ${x + 88} 43A42 34 0 1 0 ${x + 4} 43Z`) +
      hl('nucleus', `M${x + 35} 42A11 11 0 1 0 ${x + 57} 42A11 11 0 1 0 ${x + 35} 42Z`) +
      hl('vacuole', `M${x + 26} 58A4 4 0 1 0 ${x + 34} 58A4 4 0 1 0 ${x + 26} 58Z`) +
      (p == 'cytoplasm' ? hl('cytoplasm', `M${x + 9} 43A37 29 0 1 0 ${x + 83} 43A37 29 0 1 0 ${x + 9} 43Z`) : '');
    if (both) return svg('0 0 200 84', P(0) + A(106), 'dcell2');
    return svg('0 0 96 84', plant ? P(0) : A(2), 'dcell');
  }

  const SC = {sci_deep: 1};
  return (id, it, form) => {
    if (form != 'choice' && form != 'wide' || it.em || it.pic || it.grid || typeof it.q != 'string') return '';
    try {
      if (/^(geo|civ)_?/.test(id)) return map(it);
      if (SC[id] || id == 'sci_earth' && /\b(crust|mantle|core)\b|Earth's layers|layers? of Earth/i.test(it.q)) return earth(it);
      if ((it.topic == 'wavepat' || it.topic == 'waves') && /\b(waves?|crests?|troughs?|amplitude|wavelength)\b/i.test(it.q)) return wave(it);
      if (id == 'sci_life' && it.topic == 'cells' && /\bcells?\b/i.test(it.q)) return cell(it);
    } catch (e) {}
    return '';
  };
})();
