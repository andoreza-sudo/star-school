/* ---------- object art: the Spanish days and months (D3, the v196 word audit; DESIGN_SYSTEM.md section 6.5) ----------
   docs/drafts/AUDIT-WORDS-READ.md row D3 (owner: option 1): from grade 1 every day showed one calendar emoji and every month
   another, so a reader told them apart only by the English caption (Pre-K and K were fixed by never offering two of them in one
   listening question, esWrong in 34-gen-es.js). Each word now has its own picture, read by position, not by letters:
   week-mon .. week-sun  a calendar page with a strip of 7 boxes, Monday first (lunes, as Spanish calendars start the week), the
                         day's box lit orange and taller than the rest; Saturday and Sunday are blue, the weekdays grey (a second cue to the position)
   month-jan .. month-dec  12 dots in a ring around a small calendar page, January at one o'clock and December at the top (the
                         month's number on a clock face), the month's dot lit orange and bigger. No season cue: the unit also asks
                         invierno, primavera, verano and otoño, and the seasons differ between the two halves of the world
   day-today, day-tomorrow, day-yesterday  three big boxes, the middle one today with a star; hoy lights today, mañana lights
                         the next box with an arrow from the star, ayer the box before
   The 22 drawings differ only by which cell is lit, so one helper makes them when this file loads (ART is defined in
   15-pics.js, which has run; nothing here is read while loading). Same rules as sets A to C: 64x64 grid, light from the top
   left, only var(--a-x) roles from src/css/21-art.css, numbers to one decimal, under 2,500 bytes and 40 elements each.
   d-es.js names them in the art field; tools/test.js "DAYS-D3" checks them. Review sheet: docs/drafts/DAYS-MONTHS.png. */
(() => {
  const n = v => Math.round(v * 10) / 10;
  const rect = (x, y, w, h, r, f, o) => `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${n(r)}" fill="var(--a-${f})"${o ? ` opacity="${o}"` : ''}/>`;
  const dot = (x, y, r, f, o) => `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="var(--a-${f})"${o ? ` opacity="${o}"` : ''}/>`;
  // a box with volume: shade, the base a little smaller toward the light, a highlight along its top left
  const box = (x, y, w, h, r, c, lit) => rect(x, y, w, h, r, c + (lit ? '2' : '')) + rect(x, y, w - .9, h - 1.2, r, lit ? c : c + '1')
    + (lit ? rect(x + 1.2, y + 1.2, Math.min(2.2, w / 4), h - 4.4, 1, c + '1', .9) : '');
  // the calendar page: ground shadow, white sheet with its edge, red top band, two binder rings
  const page = (x, y, w, h, band, ring) => rect(x, y, w, h, 3, 'w3') + rect(x, y, w - .8, h - 1.4, 3, 'w')
    + rect(x, y, w, band, 3, 'r2') + rect(x, y, w - .8, band - 1.4, 3, 'r') + rect(x + 2.4, y + 1.4, w * .5, 1.6, .8, 'r1', .8)
    + ring.map(rx => rect(rx, y - 4.4, 3.4, 9, 1.7, 'k2') + rect(rx + .6, y - 3.8, 1.2, 4, .6, 'e', .8)).join('');
  const shadow = (rx, cy) => `<ellipse cx="32" cy="${cy}" rx="${rx}" ry="2" fill="var(--a-k)" opacity="0.1"/>`;
  const art = {};
  // days: 7 boxes of 6.6 with gaps of 1.6 across the page; the lit one is wider and taller so it reads at chip size
  ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].forEach((d, i) => {
    let s = shadow(29, 61.4) + page(2, 7, 60, 53, 10, [15, 45.6]);
    for (let j = 0; j < 7; j++) if (j !== i) s += box(4.1 + j * 8.2, 21, 6.6, 34, 1.6, j > 4 ? 'b' : 'e');
    s += box(4.1 + i * 8.2 - 1.4, 17.6, 9.4, 41.2, 2.2, 'o', 1);
    art['week-' + d] = s;
  });
  // months: 12 dots on a ring of radius 24, month m at m o'clock; a small calendar page in the middle
  'jan feb mar apr may jun jul aug sep oct nov dec'.split(' ').forEach((m, i) => {
    let s = shadow(22, 61) + page(22, 24, 20, 18, 6, [26.4, 34.2]);
    const at = k => { const a = (k + 1) * Math.PI / 6; return [32 + 24.6 * Math.sin(a), 33 - 24.6 * Math.cos(a)]; };
    for (let k = 0; k < 12; k++) if (k !== i) { const [x, y] = at(k); s += dot(x + .5, y + .5, 4.6, 'e2') + dot(x, y, 4, 'e'); }
    const [x, y] = at(i);
    s += dot(x + .6, y + .6, 7.6, 'o2') + dot(x, y, 6.9, 'o') + dot(x - 2.2, y - 2.2, 2, 'o1', .9);
    art['month-' + m] = s;
  });
  // today, tomorrow, yesterday: three big boxes, today in the middle with a star; the arrow goes from today to the lit box
  const star = (cx, cy, r) => {
    const d = o => { let p = ''; for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5, q = k % 2 ? r * .45 : r; p += (k ? 'L' : 'M') + n(cx + o + q * Math.sin(a)) + ' ' + n(cy + o - q * Math.cos(a)); } return p + 'Z'; };
    return `<path fill="var(--a-y3)" d="${d(.8)}"/><path fill="var(--a-y)" d="${d(0)}"/>`;
  };
  const arrow = dir => { // a thick ink arrow across the middle of the boxes, right (1) or left (-1) from today's star
    const X = v => n(32 + dir * v);
    return `<path fill="var(--a-k2)" d="M${X(3)} 42.4L${X(15)} 42.4L${X(15)} 37.6L${X(25)} 45L${X(15)} 52.4L${X(15)} 47.6L${X(3)} 47.6Z"/>`;
  };
  [['today', 0], ['tomorrow', 1], ['yesterday', -1]].forEach(([w, d]) => {
    let s = shadow(29, 61.4) + page(2, 7, 60, 53, 10, [15, 45.6]);
    for (let j = -1; j <= 1; j++) {
      const x = 23.6 + j * 19.6;
      s += j === d ? box(x - 1, 18.6, 18.8, 39.6, 2.6, 'o', 1) : box(x, 20.6, 16.8, 34.6, 2.4, j ? 'e' : 'y');
    }
    s += star(32, d ? 28.6 : 37.8, d ? 5.6 : 7.6) + (d ? arrow(d) : '');
    art['day-' + w] = s;
  });
  Object.assign(ART, art);
})();
