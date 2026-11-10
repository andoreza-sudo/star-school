/* ---------- icons (P4-02; DESIGN_SYSTEM.md section 5) ----------
   ico(name, size = 24, cls = '') returns an inline <svg class="ic"> that points at the sprite symbol #i-<name>.
   size is a number of px, or any CSS length string such as '1em' (follows the text size).
   Colour comes from currentColor (set `color` on the icon or its parent). A second tone, used for a few inner details,
   comes from var(--ic2) and defaults to white; on a coloured fill set --ic2 to that fill colour (see .ic-coin in 20-base.css).

   Drawing rules (the house style; P4-03 and later icons follow them):
   - 24x24 grid, artwork inside 2..22, optically centred. Flat front view; no gradients, shadows, filters or text.
   - Solid shapes filled with currentColor. Inner detail is a cut-out (extra subpath + fill-rule="evenodd") where
     possible, so it works on any background; otherwise a shape with fill="var(--ic2,#fff)".
   - Rounded corners: draw the polygon inset by r and add stroke="currentColor" stroke-width="2r" (each symbol has
     round joins and caps). Big shapes use r 1.5 (stroke-width 3); points and stars use r 0.75 (stroke-width 1.5).
     A cut-out inside a stroked path shrinks by r on every side, so draw it r larger.
   - Line shapes (check, plus, arcs) are fill="none" stroke="currentColor" with stroke-width 2 to 3.6.
   - Nothing thinner than 1.75 units; must read at 20 px. Coordinates to one decimal. Under 600 bytes per icon.
   - Only <path>, <circle>, <ellipse>, <rect>. Names are lowercase-hyphenated.
   To add an icon: add a 'name': '<path .../>' entry below, run `node tools/shots.js icons` and look at
   tools/out/icons-600x960.png (20, 32 and 64 px, on white and on a colour). tools/test.js checks the rules it can. */
const ICONS={
  'star':
    '<path stroke="currentColor" stroke-width="1.5" d="M12 3.7L14.7 9.2L20.7 10.1L16.4 14.3L17.4 20.3' +
    'L12 17.5L6.6 20.3L7.6 14.3L3.3 10.1L9.3 9.2Z"/>',
  'coin':
    '<circle cx="12" cy="12" r="10"/>' +
    '<circle fill="var(--ic2,#fff)" cx="12" cy="12" r="7.2"/>' +
    '<path stroke="currentColor" stroke-width="1" d="M12 7.9L13.3 10.7L16.4 11.1L14.1 13.2L14.7 16.2' +
    'L12 14.7L9.3 16.2L9.9 13.2L7.6 11.1L10.7 10.7Z"/>',
  'ticket':
    '<path fill-rule="evenodd" d="M4 5H20a2 2 0 0 1 2 2V9.8a2.2 2.2 0 0 0 0 4.4V17a2 2 0 0 1-2 2' +
    'H4a2 2 0 0 1-2-2V14.2a2.2 2.2 0 0 0 0-4.4V7a2 2 0 0 1 2-2ZM14.6 7.4h1.8v2.3h-1.8Z' +
    'M14.6 10.9h1.8v2.2h-1.8ZM14.6 14.3h1.8v2.3h-1.8ZM8.6 8.8L9.5 11.1L12 11.3L10.1 12.9L10.7 15.3L8.6 14' +
    'L6.5 15.3L7.1 12.9L5.2 11.3L7.7 11.1Z"/>',
  'flame':
    '<path stroke="currentColor" stroke-width="1.5" d="M12 3C13 6.5 18 8.8 18 14.5A6 6 0 0 1 6 14.5' +
    'C6 11.5 7.6 9.5 9 8C9.2 10 10 11 11 11.5C10.9 8.5 11 5.5 12 3Z"/>' +
    '<path fill="var(--ic2,#fff)" d="M12 20.5A3.3 3.3 0 0 1 8.7 17.2C8.7 15 10.6 13.8 12 11.8' +
    'C13.4 13.8 15.3 15 15.3 17.2A3.3 3.3 0 0 1 12 20.5Z"/>',
  'home':
    '<path stroke="currentColor" stroke-width="3" d="M12 4L20.5 11.5H18.5V20.5H14V15.5H10V20.5H5.5V11.5H3.5Z"/>',
  'back':
    '<path stroke="currentColor" stroke-width="3" d="M10.5 5L4 12L10.5 19V15H20V9H10.5Z"/>',
  'map':
    '<path stroke="currentColor" stroke-width="1.5" d="M3.3 6.3L6.9 4.3L6.9 17.7L3.3 19.7ZM10.2 4.3' +
    'L13.8 6.3L13.8 19.7L10.2 17.7ZM17.1 6.3L20.7 4.3L20.7 17.7L17.1 19.7Z"/>',
  'play':
    '<path stroke="currentColor" stroke-width="3" d="M7.5 4.5L19.5 12L7.5 19.5Z"/>',
  'pause':
    '<rect x="5.5" y="4" width="5" height="16" rx="1.5"/>' +
    '<rect x="13.5" y="4" width="5" height="16" rx="1.5"/>',
  'replay':
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M5.2 13.3A6.8 6.8 0 1 0 12 6.5"/>' +
    '<path stroke="currentColor" stroke-width="1.5" d="M13 3L7.5 6.5L13 10Z"/>',
  'sound-on':
    '<path stroke="currentColor" stroke-width="2" d="M4 9H7.5L12 5V19L7.5 15H4Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.2" d="M15.5 9.2A3.6 3.6 0 0 1 15.5 14.8' +
    'M18 6.3A8 8 0 0 1 18 17.7"/>',
  'sound-off':
    '<path stroke="currentColor" stroke-width="2" d="M4 9H7.5L12 5V19L7.5 15H4Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.4" d="M15.5 9.5L20.5 14.5M20.5 9.5L15.5 14.5"/>',
  'speak':
    '<circle cx="8.8" cy="8.2" r="4.4"/>' +
    '<path stroke="currentColor" stroke-width="1.5" d="M3 20.7C3 17.3 5.6 15.4 8.8 15.4' +
    'C12 15.4 14.6 17.3 14.6 20.7Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2" d="M16.6 6A4 4 0 0 1 16.6 11.6M18.9 3.6' +
    'A7.4 7.4 0 0 1 18.9 14"/>',
  'gear':
    '<path stroke="currentColor" stroke-width="1.5" fill-rule="evenodd" d="M10 5.4L10.2 3.1L13.8 3.1' +
    'L14 5.4L15.2 5.9L17 4.4L19.6 7L18.1 8.8L18.6 10L20.9 10.2L20.9 13.8L18.6 14L18.1 15.2L19.6 17' +
    'L17 19.6L15.2 18.1L14 18.6L13.8 20.9L10.2 20.9L10 18.6L8.8 18.1L7 19.6L4.4 17L5.9 15.2L5.4 14' +
    'L3.1 13.8L3.1 10.2L5.4 10L5.9 8.8L4.4 7L7 4.4L8.8 5.9Z' +
    'M8.3 12a3.7 3.7 0 1 0 7.4 0a3.7 3.7 0 1 0 -7.4 0Z"/>',
  'lock':
    '<path fill="none" stroke="currentColor" stroke-width="2.6" d="M8 11V8a4 4 0 0 1 8 0v3"/>' +
    '<path fill-rule="evenodd" d="' +
    'M7 10h10a2.5 2.5 0 0 1 2.5 2.5v6.5a2.5 2.5 0 0 1 -2.5 2.5h-10a2.5 2.5 0 0 1 -2.5 -2.5v-6.5a2.5 2.5 0 0 1 2.5 -2.5Z' +
    'M12 13.2a1.8 1.8 0 0 0-1 3.3V18.6h2V16.5a1.8 1.8 0 0 0-1-3.3Z"/>',
  'check':
    '<path fill="none" stroke="currentColor" stroke-width="3.5" d="M4.5 12.5L9.5 17.5L19.5 6.5"/>',
  'close':
    '<path fill="none" stroke="currentColor" stroke-width="3.5" d="M6 6L18 18M18 6L6 18"/>',
  'hint':
    '<path stroke="currentColor" stroke-width="1.5" d="M12 3.2A6.3 6.3 0 0 0 8.4 14.6V16.6H15.6V14.6' +
    'A6.3 6.3 0 0 0 12 3.2Z"/>' +
    '<rect x="8.8" y="18.3" width="6.4" height="3.2" rx="1.6"/>' +
    '<path fill="none" stroke="var(--ic2,#fff)" stroke-width="1.8" d="M9.2 10A3 3 0 0 1 12 6.8"/>',
  'heart':
    '<path stroke="currentColor" stroke-width="1.5" d="M12 20C8.2 16.8 3.4 13.6 3.4 8.9' +
    'C3.4 6.3 5.3 4.5 7.6 4.5C9.4 4.5 11 5.5 12 7C13 5.5 14.6 4.5 16.4 4.5C18.7 4.5 20.6 6.3 20.6 8.9' +
    'C20.6 13.6 15.8 16.8 12 20Z"/>',
  'gift':
    '<path stroke="currentColor" stroke-width="1.5" d="M12 7.2C10.4 3.4 6.8 2.6 6.8 5' +
    'C6.8 6.5 8.6 7.2 12 7.2ZM12 7.2C13.6 3.4 17.2 2.6 17.2 5C17.2 6.5 15.4 7.2 12 7.2Z"/>' +
    '<rect x="3" y="7.5" width="18" height="4.5" rx="1.5"/>' +
    '<rect x="4.5" y="13.3" width="15" height="8.2" rx="1.5"/>' +
    '<rect fill="var(--ic2,#fff)" x="10.8" y="7.5" width="2.4" height="14" rx="0"/>',
  'trophy':
    '<path stroke="currentColor" stroke-width="1.5" d="M6.2 3.7H17.8V9A5.8 5.8 0 0 1 6.2 9Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2" d="M6 5.5H4.2V7.4A3.6 3.6 0 0 0 7.4 11' +
    'M18 5.5H19.8V7.4A3.6 3.6 0 0 1 16.6 11"/>' +
    '<rect x="10.6" y="14.5" width="2.8" height="4" rx="0"/>' +
    '<rect x="6.5" y="18" width="11" height="3.5" rx="1.5"/>' +
    '<path fill="var(--ic2,#fff)" d="M12 5.4L12.8 7.3L14.9 7.5L13.3 8.8L13.8 10.8L12 9.8L10.2 10.8' +
    'L10.7 8.8L9.1 7.5L11.2 7.3Z"/>',
  'target':
    '<path fill-rule="evenodd" d="M2 12a10 10 0 1 0 20 0a10 10 0 1 0 -20 0Z' +
    'M5.2 12a6.8 6.8 0 1 0 13.6 0a6.8 6.8 0 1 0 -13.6 0Z' +
    'M8.4 12a3.6 3.6 0 1 0 7.2 0a3.6 3.6 0 1 0 -7.2 0Z"/>',
  'bolt':
    '<path stroke="currentColor" stroke-width="1.5" d="M13.5 3L5.5 13.5H11L9.8 21L18.5 9.8H13Z"/>',
  'paw':
    '<ellipse cx="4.7" cy="11" rx="2.2" ry="2.6"/>' +
    '<ellipse cx="9.2" cy="5.8" rx="2.3" ry="2.8"/>' +
    '<ellipse cx="14.8" cy="5.8" rx="2.3" ry="2.8"/>' +
    '<ellipse cx="19.3" cy="11" rx="2.2" ry="2.6"/>' +
    '<path d="M12 12C15 12 18 15.5 18 18C18 20.2 16 21 14.5 20.5C13.5 20.2 12.8 19.8 12 19.8' +
    'C11.2 19.8 10.5 20.2 9.5 20.5C8 21 6 20.2 6 18C6 15.5 9 12 12 12Z"/>',
  'bag':
    '<path fill="none" stroke="currentColor" stroke-width="2.2" d="M8.5 8.5V7a3.5 3.5 0 0 1 7 0V8.5"/>' +
    '<path stroke="currentColor" stroke-width="1.5" d="M5.2 8.2H18.8L19.6 19.9a1.4 1.4 0 0 1-1.4 1.5' +
    'H5.8a1.4 1.4 0 0 1-1.4-1.5Z"/>' +
    '<circle fill="var(--ic2,#fff)" cx="8.5" cy="11.6" r="1.1"/>' +
    '<circle fill="var(--ic2,#fff)" cx="15.5" cy="11.6" r="1.1"/>',
  'sticker-book':
    '<path stroke="currentColor" stroke-width="1.5" fill-rule="evenodd" d="' +
    'M6.8 3.2h10.9a1.6 1.6 0 0 1 1.6 1.6v14.4a1.6 1.6 0 0 1 -1.6 1.6h-10.9a1.6 1.6 0 0 1 -1.6 -1.6v-14.4a1.6 1.6 0 0 1 1.6 -1.6Z' +
    'M7.6 4.8h1.2a1 1 0 0 1 1 1v12.4a1 1 0 0 1 -1 1h-1.2a1 1 0 0 1 -1 -1v-12.4a1 1 0 0 1 1 -1ZM14.3 7.1' +
    'L15.9 10.3L19.4 10.8L16.9 13.3L17.5 16.9L14.3 15.2L11.1 16.9L11.7 13.3L9.2 10.8L12.7 10.3Z"/>',
  'gamepad':
    '<path fill-rule="evenodd" d="M7.5 6H16.5C19.5 6 20.8 8.4 21.3 12L21.7 15.6C21.9 18 19.6 19.2 18 17.6' +
    'L15.8 15.3H8.2L6 17.6C4.4 19.2 2.1 18 2.3 15.6L2.7 12C3.2 8.4 4.5 6 7.5 6ZM8.6 8.5L8.6 10.4' +
    'L10.5 10.4L10.5 12.2L8.6 12.2L8.6 14.1L6.8 14.1L6.8 12.2L4.9 12.2L4.9 10.4L6.8 10.4L6.8 8.5Z' +
    'M14.8 12.4a1.3 1.3 0 1 0 2.5 0a1.3 1.3 0 1 0 -2.5 0Z' +
    'M17.2 10a1.3 1.3 0 1 0 2.5 0a1.3 1.3 0 1 0 -2.5 0Z"/>',
  'puzzle':
    '<path stroke="currentColor" stroke-width="1.5" d="M3.3 7.5H8.5A2.5 2.5 0 1 1 11.9 7.5H16.8V12.3' +
    'A2.5 2.5 0 1 1 16.8 15.7V20.5H3.3Z"/>',
  'path-math':
    '<path fill="none" stroke="currentColor" stroke-width="2.4" d="M7 3.5V10.5M3.5 7H10.5M13.5 7H20.5' +
    'M4.5 14.5L9.5 19.5M9.5 14.5L4.5 19.5M13.5 15H20.5M13.5 19H20.5"/>',
  'path-read':
    '<path stroke="currentColor" stroke-width="1.5" d="M10.4 6.3C8.4 5 6 4.5 3.3 4.7V18.4' +
    'C6 18.2 8.4 18.7 10.4 20ZM13.6 6.3C15.6 5 18 4.5 20.7 4.7V18.4C18 18.2 15.6 18.7 13.6 20Z"/>',
  'path-es':
    '<path fill-rule="evenodd" d="M6 3.5H18A3.5 3.5 0 0 1 21.5 7V13.5A3.5 3.5 0 0 1 18 17H12L7.6 20.7' +
    'C7.1 21.1 6.5 20.8 6.5 20.2V17H6A3.5 3.5 0 0 1 2.5 13.5V7A3.5 3.5 0 0 1 6 3.5Z' +
    'M8.3 6.6a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0 -2.4 0Z' +
    'M9.5 8.7h0a.9 .9 0 0 1 .9 .9v3.8a.9 .9 0 0 1 -.9 .9h0a.9 .9 0 0 1 -.9 -.9v-3.8a.9 .9 0 0 1 .9 -.9Z' +
    'M14.5 5.4h0a.9 .9 0 0 1 .9 .9v3.8a.9 .9 0 0 1 -.9 .9h0a.9 .9 0 0 1 -.9 -.9v-3.8a.9 .9 0 0 1 .9 -.9Z' +
    'M13.3 13.1a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0 -2.4 0Z"/>',
  'path-disc':
    '<path fill-rule="evenodd" d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0Z' +
    'M5.6 10a4.4 4.4 0 1 0 8.8 0a4.4 4.4 0 1 0 -8.8 0Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="3.6" d="M15.3 15.3L20 20"/>',
  'plus':
    '<path fill="none" stroke="currentColor" stroke-width="3.5" d="M12 4.5V19.5M4.5 12H19.5"/>',
  'minus':
    '<path fill="none" stroke="currentColor" stroke-width="3.5" d="M4.5 12H19.5"/>',
  'times':
    '<path fill="none" stroke="currentColor" stroke-width="3.5" d="M6.7 6.7L17.3 17.3M17.3 6.7L6.7 17.3"/>',
  'divide':
    '<path fill="none" stroke="currentColor" stroke-width="3.5" d="M4.5 12H19.5"/>' +
    '<circle cx="12" cy="5.8" r="2"/>' +
    '<circle cx="12" cy="18.2" r="2"/>',
  'backspace':
    '<path stroke="currentColor" stroke-width="1.5" fill-rule="evenodd" d="M8.6 5.6H19.4' +
    'A1.5 1.5 0 0 1 20.9 7.1V16.9A1.5 1.5 0 0 1 19.4 18.4H8.6L3.4 12ZM18.5 10.5L17 12L18.5 13.5L15.9 16.1' +
    'L14.4 14.6L12.9 16.1L10.3 13.5L11.8 12L10.3 10.5L12.9 7.9L14.4 9.4L15.9 7.9Z"/>',
  'go':
    '<path stroke="currentColor" stroke-width="1.5" fill-rule="evenodd" d="' +
    'M2.8 12a9.3 9.3 0 1 0 18.5 0a9.3 9.3 0 1 0 -18.5 0ZM6 9.8H11.2V6.4L17.8 12L11.2 17.6V14.2H6Z"/>',
  'calendar':
    '<rect x="6.8" y="2.5" width="2.4" height="5" rx="1.2"/>' +
    '<rect x="14.8" y="2.5" width="2.4" height="5" rx="1.2"/>' +
    '<path fill-rule="evenodd" d="' +
    'M5.5 4.5h13a2.5 2.5 0 0 1 2.5 2.5v12a2.5 2.5 0 0 1 -2.5 2.5h-13a2.5 2.5 0 0 1 -2.5 -2.5v-12a2.5 2.5 0 0 1 2.5 -2.5Z' +
    'M6 10h12a1 1 0 0 1 1 1v7.5a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1v-7.5a1 1 0 0 1 1 -1Z' +
    'M6.6 11.8h2.4v2.4h-2.4ZM6.6 15.4h2.4v2.4h-2.4ZM10.8 11.8h2.4v2.4h-2.4ZM10.8 15.4h2.4v2.4h-2.4Z' +
    'M15 11.8h2.4v2.4h-2.4ZM15 15.4h2.4v2.4h-2.4Z"/>',
  'crown':
    '<path stroke="currentColor" stroke-width="1.5" d="M4 9L8 12.5L12 6.5L16 12.5L20 9L18.6 16.6H5.4Z"/>' +
    '<circle cx="3.8" cy="7.6" r="1.6"/>' +
    '<circle cx="12" cy="4.4" r="1.7"/>' +
    '<circle cx="20.2" cy="7.6" r="1.6"/>' +
    '<rect x="5" y="18.7" width="14" height="2.6" rx="1.3"/>',
};

// The sprite: one hidden <svg> with a <symbol id="i-name"> per icon. Added once, at load, before #app.
function icoSprite(){
  const syms=Object.keys(ICONS).map(n=>
    `<symbol id="i-${n}" viewBox="0 0 24 24" fill="currentColor" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]}</symbol>`);
  return `<svg id="ico-sprite" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">${syms.join('')}</svg>`;
}

function ico(name,size=24,cls=''){
  return `<svg class="ic${cls?' '+cls:''}" width="${size}" height="${size}" aria-hidden="true" focusable="false">`+
    `<use href="#i-${name}"/></svg>`;
}

if(document.body&&!document.getElementById('ico-sprite'))document.body.insertAdjacentHTML('afterbegin',icoSprite());
