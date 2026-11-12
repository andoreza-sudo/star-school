/* ---------- icons (P4-02, P4-03; DESIGN_SYSTEM.md section 5) ----------
   ico(name, size = 24, cls = '') returns an inline <svg class="ic"> that points at the sprite symbol #i-<name>.
   size is a number of px, or any CSS length string such as '1em' (follows the text size).
   Colour comes from currentColor (set `color` on the icon or its parent; .ic-star, .ic-good ... in 20-base.css).
   icoSk(skillId) names the icon of a skill (ICO_SK below; unknown skills fall back to their subject's icon).

   Two tones (P4-03). Every icon is drawn in currentColor; many add a soft second tone for a back plane, a container
   or a lesser part (house walls, a tray, a clock face, the far one of two people). The soft tone is
   fill="var(--ic3,currentColor)" opacity=".4" on the element (a stroked soft part uses stroke="var(--ic3,currentColor)"),
   so it follows the icon colour on any background; set --ic3 to tint it another colour. Rules for the soft tone:
   - The primary (full-colour) shapes alone must still read as the icon. The soft tone only adds depth.
   - Soft shapes are areas at least 4 units across (or strokes 2.6+ wide); never thin lines, never small details.
   - Draw soft shapes first. Soft drawn over a primary shape disappears (same colour); a primary detail on a soft
     area must be bold (a 2.4+ stroke or a 3+ unit shape), because on a coloured fill the soft area is pale.
   A third colour, var(--ic2) (default white), is the old knock-out tone for a few inner details (coin face, flame
   core, trophy star); on a coloured fill set --ic2 to that fill colour (see .ic-coin in 20-base.css).

   Drawing rules (the house style; every later icon follows them):
   - 24x24 grid, artwork inside 2..22, optically centred. Flat front view; no gradients, shadows, filters or text.
   - Solid shapes filled with currentColor. Inner detail is a cut-out (extra subpath + fill-rule="evenodd") where
     possible, so it works on any background; otherwise a shape with fill="var(--ic2,#fff)". Subpaths of one
     evenodd path must not overlap except to cut a hole (an overlap is a hole).
   - Rounded corners: draw the polygon inset by r and add stroke="currentColor" stroke-width="2r" (each symbol has
     round joins and caps), or round each corner with an arc or a Q curve. Big shapes use r 1.5 to 2.8; points and
     stars use r 0.75 (stroke-width 1.5). A cut-out inside a stroked path shrinks by r on every side, so draw it r larger.
   - Line shapes (check, plus, arrows, arcs) are fill="none" stroke="currentColor" with stroke-width 2 to 3.6; arrows
     and chevrons 3 to 3.4. A thick round-capped stroke is also the cheapest pill (fingers, palms).
   - Nothing thinner than 1.75 units; must read at 20 px. Coordinates to one decimal. Under 600 bytes per icon.
   - Only <path>, <circle>, <ellipse>, <rect>. Names are lowercase-hyphenated; skill pictures start with skill-
     unless they are general things (ruler, scale, ear, music).
   To add an icon: add a 'name': '<path .../>' entry below, run `node tools/shots.js icons` and look at
   tools/out/icons-1024x600.png (20, 32 and 64 px, on white, on a colour and on a tint). tools/test.js checks the rules it can. */
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
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M7.2 9h9.6a2 2 0 0 1 2 2v8.6a2 2 0 0 1 -2 2h-9.6a2 2 0 0 1 -2 -2' +
    'v-8.6a2 2 0 0 1 2 -2Z"/><path d="M10.7 3.6Q12 2.4 13.3 3.6L20.7 10.4Q22 11.6 20.2 11.6L3.8 11.6Q2 11.6 3.3 10.4Z"/>' +
    '<path d="M9.6 21.6v-4.8a2.4 2.4 0 0 1 4.8 0v4.8Z"/>',
  'back':
    '<path stroke="currentColor" stroke-width="3" d="M10.5 5L4 12L10.5 19V15H20V9H10.5Z"/>',
  'map':
    '<path stroke="currentColor" stroke-width="1.5" d="M3.3 6.3L6.9 4.3L6.9 17.7L3.3 19.7ZM17.1 6.3L20.7 4.3L20.7 17.7' +
    'L17.1 19.7Z"/>' +
    '<path fill="var(--ic3,currentColor)" stroke="var(--ic3,currentColor)" stroke-width="1.5" opacity=".4" d="M10.2 4.3' +
    'L13.8 6.3L13.8 19.7L10.2 17.7Z"/>',
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
    '<path stroke="currentColor" stroke-width="1.5" d="M12 3.2A6.3 6.3 0 0 0 8.4 14.6V16.6H15.6V14.6A6.3 6.3 0 0 0 12 3.2Z"/>' +
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M10.4 18.3h3.2a1.6 1.6 0 0 1 1.6 1.6v0a1.6 1.6 0 0 1 -1.6 1.6h-3.2' +
    'a1.6 1.6 0 0 1 -1.6 -1.6v0a1.6 1.6 0 0 1 1.6 -1.6Z"/>' +
    '<path fill="none" stroke="var(--ic2,#fff)" stroke-width="1.8" d="M9.2 10A3 3 0 0 1 12 6.8"/>',
  'heart':
    '<path stroke="currentColor" stroke-width="1.5" d="M12 20C8.2 16.8 3.4 13.6 3.4 8.9' +
    'C3.4 6.3 5.3 4.5 7.6 4.5C9.4 4.5 11 5.5 12 7C13 5.5 14.6 4.5 16.4 4.5C18.7 4.5 20.6 6.3 20.6 8.9' +
    'C20.6 13.6 15.8 16.8 12 20Z"/>',
  'gift':
    '<path stroke="currentColor" stroke-width="1.5" d="M12 7.2C10.4 3.4 6.8 2.6 6.8 5C6.8 6.5 8.6 7.2 12 7.2ZM12 7.2' +
    'C13.6 3.4 17.2 2.6 17.2 5C17.2 6.5 15.4 7.2 12 7.2Z"/>' +
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M6 13.3h12a1.5 1.5 0 0 1 1.5 1.5v5.2a1.5 1.5 0 0 1 -1.5 1.5h-12' +
    'a1.5 1.5 0 0 1 -1.5 -1.5v-5.2a1.5 1.5 0 0 1 1.5 -1.5Z"/>' +
    '<path d="M4.5 7.5h15a1.5 1.5 0 0 1 1.5 1.5v1.5a1.5 1.5 0 0 1 -1.5 1.5h-15a1.5 1.5 0 0 1 -1.5 -1.5v-1.5' +
    'a1.5 1.5 0 0 1 1.5 -1.5Z"/><path d="M10.6 13.3h2.8v8.2h-2.8Z"/>',
  'trophy':
    '<path stroke="currentColor" stroke-width="1.5" d="M6.2 3.7H17.8V9A5.8 5.8 0 0 1 6.2 9Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2" d="M6 5.5H4.2V7.4A3.6 3.6 0 0 0 7.4 11' +
    'M18 5.5H19.8V7.4A3.6 3.6 0 0 1 16.6 11"/>' +
    '<rect x="10.6" y="14.5" width="2.8" height="4" rx="0"/>' +
    '<rect x="6.5" y="18" width="11" height="3.5" rx="1.5"/>' +
    '<path fill="var(--ic2,#fff)" d="M12 5.4L12.8 7.3L14.9 7.5L13.3 8.8L13.8 10.8L12 9.8L10.2 10.8' +
    'L10.7 8.8L9.1 7.5L11.2 7.3Z"/>',
  'target':
    '<circle fill="var(--ic3,currentColor)" opacity=".4" cx="12" cy="12" r="6.8"/>' +
    '<path fill-rule="evenodd" d="M2 12a10 10 0 1 0 20 0a10 10 0 1 0 -20 0ZM5.2 12a6.8 6.8 0 1 0 13.6 0' +
    'a6.8 6.8 0 1 0 -13.6 0ZM8.4 12a3.6 3.6 0 1 0 7.2 0a3.6 3.6 0 1 0 -7.2 0Z"/>',
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
  'maze':
    '<rect fill="var(--ic3,currentColor)" opacity=".4" x="3" y="3" width="18" height="18" rx="3"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" ' +
    'd="M8.5 3.2H20.8V15.5M15.5 20.8H3.2V8.5M8.5 8.5V15.5H12M12 8.5H15.5V12"/>' +
    '<circle cx="5.6" cy="5.6" r="2.2"/>',
  'sudoku':
    '<rect fill="var(--ic3,currentColor)" opacity=".4" x="3" y="3" width="18" height="18" rx="3"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 3.5V20.5M15 3.5V20.5M3.5 9H20.5M3.5 15H20.5"/>' +
    '<rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1.5"/>',
  'mdoku':
    '<rect fill="var(--ic3,currentColor)" opacity=".4" x="3" y="3" width="18" height="18" rx="3"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ' +
    'd="M12 3.5V12H20.5M3.5 15H12M5.6 6.6H9.4M7.5 4.7V8.5M15.2 15.7L18.8 19.3M18.8 15.7L15.2 19.3"/>',
  'logic':
    '<rect fill="var(--ic3,currentColor)" opacity=".4" x="3" y="3" width="18" height="18" rx="3"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 3.5V20.5M3.5 9H20.5"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M11.8 15.2L14.3 17.6L18.6 12.6M4.8 12.6L7.2 15M7.2 12.6L4.8 15M12.6 4.8L15 7.2M15 4.8L12.6 7.2"/>',
  'riddle':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M5.5 3H18.5A3 3 0 0 1 21.5 6V14.5A3 3 0 0 1 18.5 17.5H11.5L6.8 21.2' +
    'C6.3 21.6 5.6 21.2 5.6 20.6V17.5H5.5A3 3 0 0 1 2.5 14.5V6A3 3 0 0 1 5.5 3Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" ' +
    'd="M9.3 8A2.8 2.8 0 1 1 13.2 10.6C12.4 11 12 11.5 12 12.4"/><circle cx="12" cy="15.1" r="1.5"/>',
  'memory':
    '<rect fill="var(--ic3,currentColor)" opacity=".4" x="2.5" y="4.5" width="10" height="15" rx="2.2"/>' +
    '<path fill-rule="evenodd" d="M13.6 3.5H19.4A2.1 2.1 0 0 1 21.5 5.6V18.4A2.1 2.1 0 0 1 19.4 20.5H13.6A2.1 2.1 0 0 1 11.5 18.4V5.6' +
    'A2.1 2.1 0 0 1 13.6 3.5ZM16.5 8L17.6 10.4L20 10.7L18.2 12.4L18.7 14.8L16.5 13.6L14.3 14.8L14.8 12.4L13 10.7L15.4 10.4Z"/>',
  'copycat':
    '<rect fill="var(--ic3,currentColor)" opacity=".4" x="13" y="3" width="8" height="8" rx="2"/>' +
    '<path fill="var(--ic3,currentColor)" stroke="var(--ic3,currentColor)" stroke-width="1.5" stroke-linejoin="round" opacity=".4" ' +
    'd="M7 14.2L10.6 20.3H3.4Z"/>' +
    '<path fill="var(--ic3,currentColor)" stroke="var(--ic3,currentColor)" stroke-width="1.5" stroke-linejoin="round" opacity=".4" ' +
    'd="M17 13.2L20.6 17L17 20.8L13.4 17Z"/>' +
    '<circle cx="7" cy="7" r="4.6"/>',
  'tangram':
    '<rect fill="var(--ic3,currentColor)" opacity=".4" x="2.5" y="2.5" width="19" height="19" rx="3"/>' +
    '<path stroke="currentColor" stroke-width="1.2" d="M5 3.6H19L12 10.6ZM3.6 5.5V19.5L10.6 12.5ZM15.5 10.4L18.6 13.5L15.5 16.6L12.4 13.5Z' +
    'M5.6 20.4H13.4L9.5 16.5ZM20.4 15.1V20.4H15.1Z"/>',
  'robot':
    '<rect fill="var(--ic3,currentColor)" opacity=".4" x="5.5" y="15.5" width="13" height="6.5" rx="2.5"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 6.5V4.2"/><circle cx="12" cy="3.4" r="1.9"/>' +
    '<rect x="3.5" y="6.5" width="17" height="10.5" rx="3.5"/>' +
    '<circle fill="var(--ic2,#fff)" cx="9" cy="11.7" r="1.9"/><circle fill="var(--ic2,#fff)" cx="15" cy="11.7" r="1.9"/>',
  'cubes':
    '<path fill="var(--ic3,currentColor)" opacity=".4" stroke="var(--ic3,currentColor)" stroke-width="1.2" stroke-linejoin="round" d="M12 11.8L19.4 7.6L12 3.4L4.6 7.6Z"/>' +
    '<path stroke="currentColor" stroke-width=".6" stroke-linejoin="round" d="M11.4 20.6L8.6 19L8.6 15.8L11.4 17.4ZM11.4 16.1L8.6 14.5L8.6 11.3L11.4 12.9Z' +
    'M7.4 18.3L4.6 16.7L4.6 13.5L7.4 15.1ZM7.4 13.8L4.6 12.2L4.6 9L7.4 10.6ZM12.6 20.6L15.4 19L15.4 15.8L12.6 17.4ZM12.6 16.1L15.4 14.5L15.4 11.3L12.6 12.9Z' +
    'M16.6 18.3L19.4 16.7L19.4 13.5L16.6 15.1ZM16.6 13.8L19.4 12.2L19.4 9L16.6 10.6Z"/>',
  'fit':
    '<rect fill="var(--ic3,currentColor)" opacity=".4" x="2.5" y="2.5" width="19" height="19" rx="3"/>' +
    '<path d="M4.5 4.5H11V13H19.5V19.5H4.5Z"/>' +
    '<rect fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="2.2 1.6" x="13.2" y="4.7" width="6.1" height="6.1" rx="1"/>',
  'wsearch':
    '<rect fill="var(--ic3,currentColor)" opacity=".4" x="2.5" y="2.5" width="19" height="19" rx="3.5"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="5.2" stroke-linecap="round" d="M7.2 7.2L16.8 16.8"/>' +
    '<circle cx="16.8" cy="7.2" r="2"/><circle cx="7.2" cy="16.8" r="2"/>',
  'scramble':
    '<rect fill="var(--ic3,currentColor)" opacity=".4" x="2.5" y="11.5" width="9.5" height="10" rx="2.2"/>' +
    '<rect x="12" y="2.5" width="9.5" height="10" rx="2.2"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ' +
    'd="M4 9C4 6.1 5.8 4.3 8.6 4.3M6.9 2.8L8.6 4.3L6.9 5.9M20 15C20 17.9 18.2 19.7 15.4 19.7M17.1 18.1L15.4 19.7L17.1 21.2"/>',
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
    '<circle fill="var(--ic3,currentColor)" opacity=".4" cx="10" cy="10" r="4.4"/>' +
    '<path fill-rule="evenodd" d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0ZM5.6 10a4.4 4.4 0 1 0 8.8 0a4.4 4.4 0 1 0 -8.8 0Z"/>' +
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
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M6 10h12a1 1 0 0 1 1 1v7.5a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1v-7.5' +
    'a1 1 0 0 1 1 -1Z"/><path fill="none" stroke="currentColor" stroke-width="2.4" d="M8 3.7v2.6M16 3.7v2.6"/>' +
    '<path fill-rule="evenodd" d="M5.5 4.5h13a2.5 2.5 0 0 1 2.5 2.5v12a2.5 2.5 0 0 1 -2.5 2.5h-13a2.5 2.5 0 0 1 -2.5 -2.5' +
    'v-12a2.5 2.5 0 0 1 2.5 -2.5ZM6 10h12a1 1 0 0 1 1 1v7.5a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1v-7.5a1 1 0 0 1 1 -1ZM6.6 11.8' +
    'h2.4v2.4h-2.4ZM6.6 15.4h2.4v2.4h-2.4ZM10.8 11.8h2.4v2.4h-2.4ZM10.8 15.4h2.4v2.4h-2.4ZM15 11.8h2.4v2.4h-2.4ZM15 15.4h2.4' +
    'v2.4h-2.4Z"/>',
  'crown':
    '<path stroke="currentColor" stroke-width="1.5" d="M4 9L8 12.5L12 6.5L16 12.5L20 9L18.6 16.6H5.4Z"/>' +
    '<circle cx="3.8" cy="7.6" r="1.6"/>' +
    '<circle cx="12" cy="4.4" r="1.7"/>' +
    '<circle cx="20.2" cy="7.6" r="1.6"/>' +
    '<rect x="5" y="18.7" width="14" height="2.6" rx="1.3"/>',
  // ---- P4-03: utility, chrome and skill icons ----
  'info':
    '<path fill-rule="evenodd" d="M2 12a10 10 0 1 0 20 0a10 10 0 1 0 -20 0ZM10.4 7.2a1.6 1.6 0 1 0 3.2 0' +
    'a1.6 1.6 0 1 0 -3.2 0ZM12 10.1h0a1.3 1.3 0 0 1 1.3 1.3v5.3a1.3 1.3 0 0 1 -1.3 1.3h0a1.3 1.3 0 0 1 -1.3 -1.3v-5.3' +
    'a1.3 1.3 0 0 1 1.3 -1.3Z"/>',
  'warning':
    '<path fill-rule="evenodd" d="M10.7 4.7Q12 2.4 13.3 4.7L20.7 17.7Q22 20 19.4 20L4.6 20Q2 20 3.3 17.7ZM12 8.3h0' +
    'a1.2 1.2 0 0 1 1.2 1.2v3.9a1.2 1.2 0 0 1 -1.2 1.2h0a1.2 1.2 0 0 1 -1.2 -1.2v-3.9a1.2 1.2 0 0 1 1.2 -1.2ZM10.6 17' +
    'a1.5 1.5 0 1 0 2.9 0a1.5 1.5 0 1 0 -2.9 0Z"/>',
  'question':
    '<circle fill="var(--ic3,currentColor)" opacity=".4" cx="12" cy="12" r="10"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M8.7 9.3a3.3 3.3 0 1 1 4.9 2.9c-.9.5-1.6 1.1-1.6 2.2v.4"/>' +
    '<circle cx="12" cy="17.9" r="1.8"/>',
  'circle':
    '<circle fill="none" stroke="currentColor" stroke-width="2.6" cx="12" cy="12" r="8.6"/>',
  'check-circle':
    '<circle fill="var(--ic3,currentColor)" opacity=".4" cx="12" cy="12" r="10"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M7.2 12.4l3.2 3.2l6.4-7"/>',
  'download':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M5.1 13.5h13.8a2.6 2.6 0 0 1 2.6 2.6v2.8a2.6 2.6 0 0 1 -2.6 2.6' +
    'h-13.8a2.6 2.6 0 0 1 -2.6 -2.6v-2.8a2.6 2.6 0 0 1 2.6 -2.6Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M12 3v11"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M7.4 9.8L12 14.4L16.6 9.8"/>',
  'upload':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M5.1 13.5h13.8a2.6 2.6 0 0 1 2.6 2.6v2.8a2.6 2.6 0 0 1 -2.6 2.6' +
    'h-13.8a2.6 2.6 0 0 1 -2.6 -2.6v-2.8a2.6 2.6 0 0 1 2.6 -2.6Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M12 15V4.5"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M7.4 8.6L12 4L16.6 8.6"/>',
  'trash':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M5.3 10.1Q5.2 8.5 6.8 8.5L17.2 8.5Q18.8 8.5 18.7 10.1L17.7 19.9' +
    'Q17.6 21.5 16 21.5L8 21.5Q6.4 21.5 6.3 19.9Z"/>' +
    '<path d="M4.7 5h14.6a1.5 1.5 0 0 1 1.5 1.5v0a1.5 1.5 0 0 1 -1.5 1.5h-14.6a1.5 1.5 0 0 1 -1.5 -1.5v0' +
    'a1.5 1.5 0 0 1 1.5 -1.5ZM10.2 2.5h3.6a1.2 1.2 0 0 1 1.2 1.2v1a1.2 1.2 0 0 1 -1.2 1.2h-3.6a1.2 1.2 0 0 1 -1.2 -1.2v-1' +
    'a1.2 1.2 0 0 1 1.2 -1.2Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.2" d="M9.8 11.7v6.4M14.2 11.7v6.4"/>',
  'edit':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M13.8 6.1L15.4 4.5Q16.5 3.4 17.6 4.5L19.5 6.4Q20.6 7.5 19.5 8.6' +
    'L17.9 10.2Z"/><path d="M4.7 15.2L12.8 7.1L16.9 11.2L8.8 19.3L4.3 20.4Q3.4 20.6 3.6 19.7Z"/>',
  'mic':
    '<path d="M12 2.4h0a3.6 3.6 0 0 1 3.6 3.6v4.8a3.6 3.6 0 0 1 -3.6 3.6h0a3.6 3.6 0 0 1 -3.6 -3.6v-4.8' +
    'a3.6 3.6 0 0 1 3.6 -3.6Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.4" d="M5.4 11.2a6.6 6.6 0 0 0 13.2 0M12 17.8v3.4M8.6 21.4h6.8"/>',
  'record':
    '<circle fill="var(--ic3,currentColor)" opacity=".4" cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="5.6"/>',
  'stop':
    '<circle fill="var(--ic3,currentColor)" opacity=".4" cx="12" cy="12" r="10"/>' +
    '<path d="M9.6 7.6h4.8a2 2 0 0 1 2 2v4.8a2 2 0 0 1 -2 2h-4.8a2 2 0 0 1 -2 -2v-4.8a2 2 0 0 1 2 -2Z"/>',
  'undo':
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M8.4 9H14.5a5.6 5.6 0 0 1 0 11.2H10"/>' +
    '<path d="M3.6 9.6Q2.8 9 3.6 8.4L8.8 4.5Q9.6 3.9 9.6 4.9L9.6 13.1Q9.6 14.1 8.8 13.5Z"/>',
  'redo':
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M15.6 9H9.5a5.6 5.6 0 0 0 0 11.2H14"/>' +
    '<path d="M20.4 9.6Q21.2 9 20.4 8.4L15.2 4.5Q14.4 3.9 14.4 4.9L14.4 13.1Q14.4 14.1 15.2 13.5Z"/>',
  'rotate':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M4.9 10h6.7a2.4 2.4 0 0 1 2.4 2.4v6.7a2.4 2.4 0 0 1 -2.4 2.4h-6.7' +
    'a2.4 2.4 0 0 1 -2.4 -2.4v-6.7a2.4 2.4 0 0 1 2.4 -2.4Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.8" d="M7.5 6.3h4a6.3 6.3 0 0 1 6.3 6.3v1.6"/>' +
    '<path d="M18.2 18.9Q17.8 19.6 17.4 18.9L14.6 14.9Q14.2 14.2 15 14.2L20.6 14.2Q21.4 14.2 21 14.9Z"/>',
  'flip':
    '<path d="M9.4 5.8Q10 4.5 10 5.9L10 18.6Q10 20 8.6 20L3.9 20Q2.5 20 3.1 18.7Z"/>' +
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M14.6 5.8Q14 4.5 14 5.9L14 18.6Q14 20 15.4 20L20.1 20' +
    'Q21.5 20 20.9 18.7Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="1.8" d="M12 3v2.4M12 8.4v2.4M12 13.8v2.4M12 19.2v1.8"/>',
  'eye':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M1.8 12C4.3 7.3 7.8 4.8 12 4.8s7.7 2.5 10.2 7.2' +
    'c-2.5 4.7-6 7.2-10.2 7.2S4.3 16.7 1.8 12Z"/>' +
    '<path fill-rule="evenodd" d="M7.4 12a4.6 4.6 0 1 0 9.2 0a4.6 4.6 0 1 0 -9.2 0ZM12.3 10.4a1.3 1.3 0 1 0 2.6 0' +
    'a1.3 1.3 0 1 0 -2.6 0Z"/>',
  'timer':
    '<circle fill="var(--ic3,currentColor)" opacity=".4" cx="12" cy="13.5" r="6.4"/>' +
    '<path fill-rule="evenodd" d="M3.5 13.5a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0 -17 0ZM5.6 13.5a6.4 6.4 0 1 0 12.8 0' +
    'a6.4 6.4 0 1 0 -12.8 0Z"/><path fill="none" stroke="currentColor" stroke-width="2.8" d="M10.2 3h3.6M12 3v2.4"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.6" d="M18 7.2l1.6-1.6"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.4" d="M12 13.5V9.5"/><circle cx="12" cy="13.5" r="1.6"/>',
  'clock':
    '<circle fill="var(--ic3,currentColor)" opacity=".4" cx="12" cy="12" r="7.6"/>' +
    '<path fill-rule="evenodd" d="M2 12a10 10 0 1 0 20 0a10 10 0 1 0 -20 0ZM4.4 12a7.6 7.6 0 1 0 15.2 0' +
    'a7.6 7.6 0 1 0 -15.2 0Z"/><path fill="none" stroke="currentColor" stroke-width="2.4" d="M12 7.6V12l3 2.1"/>',
  'chart':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M3.8 19.2h16.4a1.3 1.3 0 0 1 1.3 1.3v0a1.3 1.3 0 0 1 -1.3 1.3' +
    'h-16.4a1.3 1.3 0 0 1 -1.3 -1.3v0a1.3 1.3 0 0 1 1.3 -1.3Z"/>' +
    '<path d="M5.1 11.4h1.4a1.5 1.5 0 0 1 1.5 1.5v3.6a1.5 1.5 0 0 1 -1.5 1.5h-1.4a1.5 1.5 0 0 1 -1.5 -1.5v-3.6' +
    'a1.5 1.5 0 0 1 1.5 -1.5ZM11.3 7.4h1.4a1.5 1.5 0 0 1 1.5 1.5v7.6a1.5 1.5 0 0 1 -1.5 1.5h-1.4a1.5 1.5 0 0 1 -1.5 -1.5' +
    'v-7.6a1.5 1.5 0 0 1 1.5 -1.5ZM17.5 3h1.4a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1 -1.5 1.5h-1.4a1.5 1.5 0 0 1 -1.5 -1.5' +
    'v-12a1.5 1.5 0 0 1 1.5 -1.5Z"/>',
  'user':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M3.5 21.2c0-4.7 3.8-7.6 8.5-7.6s8.5 2.9 8.5 7.6Z"/>' +
    '<circle cx="12" cy="7.6" r="4.6"/>',
  'users':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M12.6 20.6c.2-4.3 2.6-7 5.6-7 2.6 0 4 2.3 4 5.2v1.8Z"/>' +
    '<circle fill="var(--ic3,currentColor)" opacity=".4" cx="17.2" cy="8.2" r="3.6"/>' +
    '<path d="M1.8 20.8c0-4.5 3.2-7.3 7.2-7.3s7.2 2.8 7.2 7.3Z"/><circle cx="9" cy="7.6" r="4.1"/>',
  'arrow-right':
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M4 12h14.5"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M13 5.8L19.2 12L13 18.2"/>',
  'arrow-left':
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M20 12H5.5"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M11 5.8L4.8 12L11 18.2"/>',
  'arrow-up':
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M12 20V5.5"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M5.8 11L12 4.8L18.2 11"/>',
  'arrow-down':
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M12 4v14.5"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M5.8 13L12 19.2L18.2 13"/>',
  'chevron-right':
    '<path fill="none" stroke="currentColor" stroke-width="3.4" d="M9 4.8L16.2 12L9 19.2"/>',
  'chevron-left':
    '<path fill="none" stroke="currentColor" stroke-width="3.4" d="M15 4.8L7.8 12L15 19.2"/>',
  'more':
    '<circle cx="4.8" cy="12" r="2.4"/><circle cx="12" cy="12" r="2.4"/><circle cx="19.2" cy="12" r="2.4"/>',
  'rocket':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M7.6 11.8L4 15.6V20l3.8-2.6ZM16.4 11.8L20 15.6V20l-3.8-2.6Z"/>' +
    '<path fill-rule="evenodd" d="M12 2.2c3.4 2.4 5 6 5 10.1v5.2H7v-5.2c0-4.1 1.6-7.7 5-10.1ZM10 9.6a2 2 0 1 0 4 0' +
    'a2 2 0 1 0 -4 0Z"/><path d="M9.6 19h4.8c0 1.6-1 2.9-2.4 3.4-1.4-.5-2.4-1.8-2.4-3.4Z"/>',
  'balloon':
    '<path fill-rule="evenodd" d="M12 2.2c3.8 0 6.6 2.9 6.6 6.9 0 4.6-3.5 8.3-6.6 8.3S5.4 13.7 5.4 9.1' +
    'C5.4 5.1 8.2 2.2 12 2.2ZM8.4 9.6a3.6 3.6 0 0 1 2.2-4.1l.7 1.6a1.9 1.9 0 0 0-1.2 2.2Z"/>' +
    '<path d="M11.6 17Q12 16.4 12.4 17L13.4 18.4Q13.8 19 13.1 19L10.9 19Q10.2 19 10.6 18.4Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="1.8" d="M12 19.2c-1.6 1.3 1.4 1.6 0 3"/>',
  'party':
    '<path fill="none" stroke="currentColor" stroke-width="2.2" d="M14.2 2.8l1.3 2.6M20.6 8.6l-2.7 1.2M21.2 3.4l-3.2 3.2"/>' +
    '<path fill-rule="evenodd" d="M3.9 20.9Q2.6 21.4 3.1 20.1L7.3 9.5Q8 7.6 9.4 9L15 14.6Q16.4 16 14.5 16.7ZM5.4 14.7' +
    'l3.9 3.9l-1.9.8l-2.8-2.8ZM7.4 10.6l6 6l-1.9.8l-4.9-4.9Z"/><circle cx="17.6" cy="13.4" r="1.5"/>' +
    '<circle cx="10.8" cy="4.2" r="1.5"/>',
  'globe':
    '<circle fill="var(--ic3,currentColor)" opacity=".4" cx="12" cy="12" r="9.2"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.2" d="M12 2.8a9.2 9.2 0 1 0 0 18.4a9.2 9.2 0 1 0 0-18.4ZM12 2.8' +
    'c-2.8 2.6-4 5.6-4 9.2s1.2 6.6 4 9.2M12 2.8c2.8 2.6 4 5.6 4 9.2s-1.2 6.6-4 9.2M3 12h18"/>',
  'moon':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M18.2 2C19 4.8 19 4.8 21.8 5.6C19 6.4 19 6.4 18.2 9.2' +
    'C17.4 6.4 17.4 6.4 14.6 5.6C17.4 4.8 17.4 4.8 18.2 2Z"/>' +
    '<path d="M11.6 2.6A9.4 9.4 0 1 0 20.6 15.2A7.8 7.8 0 0 1 11.6 2.6Z"/>',
  'hat':
    '<path d="M8.4 3h7.2a1.8 1.8 0 0 1 1.8 1.8V11.4H6.6V4.8A1.8 1.8 0 0 1 8.4 3Z"/>' +
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M6.6 12.6h10.8v3.4H6.6Z"/>' +
    '<path d="M4.2 16.8h15.6a1.8 1.8 0 0 1 1.8 1.8v0a1.8 1.8 0 0 1 -1.8 1.8h-15.6a1.8 1.8 0 0 1 -1.8 -1.8v0' +
    'a1.8 1.8 0 0 1 1.8 -1.8Z"/>',
  'teddy':
    '<path d="M3.2 6.8a3.2 3.2 0 1 0 6.4 0a3.2 3.2 0 1 0 -6.4 0ZM14.4 6.8a3.2 3.2 0 1 0 6.4 0a3.2 3.2 0 1 0 -6.4 0Z"/>' +
    '<path fill-rule="evenodd" d="M4 13.2a8 8 0 1 0 16 0a8 8 0 1 0 -16 0ZM8.6 16.5a3.4 2.8 0 1 0 6.8 0a3.4 2.8 0 1 0 -6.8 0Z' +
    'M7.7 11.4a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0 -2.6 0ZM13.7 11.4a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0 -2.6 0Z"/>' +
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M8.6 16.5a3.4 2.8 0 1 0 6.8 0a3.4 2.8 0 1 0 -6.8 0Z"/>' +
    '<path stroke="currentColor" stroke-width="1.6" d="M10.6 15.3h2.8l-1.4 1.6Z"/>',
  'image':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M5.6 6.6h12.8a1 1 0 0 1 1 1v8.8a1 1 0 0 1 -1 1h-12.8' +
    'a1 1 0 0 1 -1 -1v-8.8a1 1 0 0 1 1 -1Z"/>' +
    '<path fill-rule="evenodd" d="M5.2 4.4h13.6a2.8 2.8 0 0 1 2.8 2.8v9.6a2.8 2.8 0 0 1 -2.8 2.8h-13.6' +
    'a2.8 2.8 0 0 1 -2.8 -2.8v-9.6a2.8 2.8 0 0 1 2.8 -2.8ZM5.6 6.6h12.8a1 1 0 0 1 1 1v8.8a1 1 0 0 1 -1 1h-12.8' +
    'a1 1 0 0 1 -1 -1v-8.8a1 1 0 0 1 1 -1Z"/><path d="M4.6 17.4l5-6.2 3.4 4 2.2-2.6 4.2 4.8Z"/>' +
    '<circle cx="15.6" cy="9.9" r="1.7"/>',
  'food':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M10.4 13.6L6.6 17.4"/>' +
    '<path fill="none" stroke="var(--ic3,currentColor)" stroke-width="3.2" opacity=".4" d="M10.6 13.4L7 17"/>' +
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M2.5 16.6a2.1 2.1 0 1 0 4.2 0a2.1 2.1 0 1 0 -4.2 0ZM5.3 19.4' +
    'a2.1 2.1 0 1 0 4.2 0a2.1 2.1 0 1 0 -4.2 0Z"/>' +
    '<path fill-rule="evenodd" d="M15 2.6c3.6 0 6.4 2.8 6.4 6.4 0 4.4-3.8 6.9-7.2 6.9-1.4 0-2.6-.4-3.4-1.2s-1.2-2-1.2-3.4' +
    'C9.6 7.3 11.1 2.6 15 2.6ZM14.2 5.2a3.4 3.4 0 0 1 4.4 1.4l-1.5.8a1.7 1.7 0 0 0-2.2-.7Z"/>',
  'bath':
    '<circle fill="var(--ic3,currentColor)" opacity=".4" cx="8" cy="6.6" r="2.5"/>' +
    '<circle fill="var(--ic3,currentColor)" opacity=".4" cx="13" cy="4.6" r="1.9"/>' +
    '<circle fill="var(--ic3,currentColor)" opacity=".4" cx="16.4" cy="8" r="2"/>' +
    '<path d="M3.4 10.6h17.2a1.4 1.4 0 0 1 1.4 1.4v0a1.4 1.4 0 0 1 -1.4 1.4h-17.2a1.4 1.4 0 0 1 -1.4 -1.4v0' +
    'a1.4 1.4 0 0 1 1.4 -1.4Z"/><path d="M3.6 14.2h16.8c-.3 3.6-3 6.2-6.6 6.2H10.2c-3.6 0-6.3-2.6-6.6-6.2Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2" d="M6.4 19.6l-1 2M17.6 19.6l1 2"/>',
  'ball':
    '<circle fill="var(--ic3,currentColor)" opacity=".4" cx="12" cy="12" r="9.6"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.2" d="M12 2.4a9.6 9.6 0 1 0 0 19.2a9.6 9.6 0 1 0 0-19.2Z' +
    'M5.6 4.9c2.4 2 3.6 4.4 3.6 7.1s-1.2 5.1-3.6 7.1M18.4 4.9c-2.4 2-3.6 4.4-3.6 7.1s1.2 5.1 3.6 7.1"/>',
  'drop':
    '<path fill-rule="evenodd" d="M12 2.6C9.4 6.6 5.6 10.4 5.6 14.8a6.4 6.4 0 0 0 12.8 0C18.4 10.4 14.6 6.6 12 2.6ZM8.4 14.6' +
    'a3.6 3.6 0 0 0 2.6 3.8l-.4 1.6a5.2 5.2 0 0 1-3.8-5.4Z"/>',
  'car':
    '<path fill-rule="evenodd" d="M3.6 15.8a1.2 1.2 0 0 1-1.2-1.2v-2.8c0-.9.7-1.6 1.6-1.6h3L9 6.4a1.6 1.6 0 0 1 1.4-.8h6.4' +
    'c.6 0 1.1.3 1.4.9l2 3.7c1 .1 1.8.9 1.8 1.9v2.5a1.2 1.2 0 0 1-1.2 1.2h-.6a3.6 3.6 0 0 0-7 0H10.4a3.6 3.6 0 0 0-7 0Z' +
    'M10.6 7.6h2.6v2.6H9.2ZM15 7.6h1.6l1.4 2.6h-3Z"/>' +
    '<path fill-rule="evenodd" d="M4.3 17.2a2.6 2.6 0 1 0 5.2 0a2.6 2.6 0 1 0 -5.2 0ZM14.5 17.2a2.6 2.6 0 1 0 5.2 0' +
    'a2.6 2.6 0 1 0 -5.2 0ZM5.9 17.2a1 1 0 1 0 2 0a1 1 0 1 0 -2 0ZM16.1 17.2a1 1 0 1 0 2 0a1 1 0 1 0 -2 0Z"/>',
  'nut':
    '<path fill-rule="evenodd" d="M20.7 15Q20.7 17 18.9 18L13.7 21Q12 22 10.3 21L5.1 18Q3.3 17 3.3 15L3.3 9Q3.3 7 5.1 6' +
    'L10.3 3Q12 2 13.7 3L18.9 6Q20.7 7 20.7 9ZM8.4 12a3.6 3.6 0 1 0 7.2 0a3.6 3.6 0 1 0 -7.2 0Z"/>',
  'palette':
    '<path fill-rule="evenodd" d="M12 2.4C6.7 2.4 2.4 6.5 2.4 11.7' +
    'c0 5.2 4.3 9.7 9.4 9.7 1.6 0 2.4-1 2.4-2.2 0-.6-.3-1.1-.6-1.6-.3-.4-.5-.9-.5-1.5 0-1.1.9-2 2-2h2.4' +
    'c2.7 0 4.9-2.2 4.9-4.9C21.6 5.8 17.3 2.4 12 2.4ZM5.5 11.4a1.7 1.7 0 1 0 3.4 0a1.7 1.7 0 1 0 -3.4 0ZM7.5 7' +
    'a1.7 1.7 0 1 0 3.4 0a1.7 1.7 0 1 0 -3.4 0ZM12.3 6a1.7 1.7 0 1 0 3.4 0a1.7 1.7 0 1 0 -3.4 0ZM16.1 8.8' +
    'a1.7 1.7 0 1 0 3.4 0a1.7 1.7 0 1 0 -3.4 0Z"/>',
  'blocks':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M14.6 12.4h5a2 2 0 0 1 2 2v5a2 2 0 0 1 -2 2h-5a2 2 0 0 1 -2 -2v-5' +
    'a2 2 0 0 1 2 -2Z"/>' +
    '<path d="M4.4 12.4h5a2 2 0 0 1 2 2v5a2 2 0 0 1 -2 2h-5a2 2 0 0 1 -2 -2v-5a2 2 0 0 1 2 -2ZM9.5 2.4h5a2 2 0 0 1 2 2v5' +
    'a2 2 0 0 1 -2 2h-5a2 2 0 0 1 -2 -2v-5a2 2 0 0 1 2 -2Z"/>',
  'medal':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M6.4 2.4h4l2.6 6.2h-4ZM17.6 2.4h-4l-1.1 2.6 2 4.9h.5Z"/>' +
    '<path fill-rule="evenodd" d="M5 15a7 7 0 1 0 14 0a7 7 0 1 0 -14 0ZM12 10.4' +
    'l1.4 2.8 3 .4-2.2 2.1.5 3-2.7-1.4-2.7 1.4.5-3-2.2-2.1 3-.4Z"/>',
  'sparkle':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M18 12.8C19 16.4 19 16.4 22.6 17.4C19 18.4 19 18.4 18 22' +
    'C17 18.4 17 18.4 13.4 17.4C17 16.4 17 16.4 18 12.8Z"/>' +
    '<path stroke="currentColor" stroke-width="1.2" d="M9.6 1.8C11.4 8.2 11.4 8.2 17.8 10C11.4 11.8 11.4 11.8 9.6 18.2' +
    'C7.8 11.8 7.8 11.8 1.4 10C7.8 8.2 7.8 8.2 9.6 1.8Z"/>' +
    '<path stroke="currentColor" stroke-width="1" d="M18.6 2C19.2 4.2 19.2 4.2 21.4 4.8C19.2 5.4 19.2 5.4 18.6 7.6' +
    'C18 5.4 18 5.4 15.8 4.8C18 4.2 18 4.2 18.6 2Z"/>',
  'review':
    '<path fill="none" stroke="currentColor" stroke-width="2.8" d="M4.7 9.9A7.6 7.6 0 0 1 17.5 6.7"/>' +
    '<path d="M19.1 6.8Q19.4 7.6 18.6 7.5L13.7 6.7Q12.9 6.6 13.4 6L16.8 2Q17.3 1.4 17.6 2.2Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.8" d="M19.3 14.1A7.6 7.6 0 0 1 6.5 17.3"/>' +
    '<path d="M4.9 17.2Q4.6 16.4 5.4 16.5L10.3 17.3Q11.1 17.4 10.6 18L7.2 22Q6.7 22.6 6.4 21.8Z"/>',
  'thumbs-up':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M3.8 10.2h1.4a1.6 1.6 0 0 1 1.6 1.6v8a1.6 1.6 0 0 1 -1.6 1.6h-1.4' +
    'a1.6 1.6 0 0 1 -1.6 -1.6v-8a1.6 1.6 0 0 1 1.6 -1.6Z"/>' +
    '<path d="M8.2 10.4l3.4-6.4c.5-.9 1.4-1.4 2.4-1.2 1.4.3 2.1 1.6 1.8 3L15.2 9h4c1.5 0 2.6 1.4 2.2 2.9l-1.7 7.6' +
    'c-.3 1.1-1.2 1.8-2.3 1.8H8.2Z"/>',
  'skill-count':
    '<path fill="none" stroke="currentColor" stroke-width="2.6" d="M5 4.6v14.8M9.4 4.6v14.8M13.8 4.6v14.8M18.2 4.6v14.8"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M2.6 17.2L21.4 6.8"/>',
  'skill-num':
    '<path fill="none" stroke="currentColor" stroke-width="2.4" d="M3.4 7.6l2.6-2V18.6M9.4 8.6a2.8 2.8 0 1 1 5 1.8L9.4 18.6' +
    'h5.4M17 5.6h4.4l-2.6 4.2a3.3 3.3 0 1 1-2.4 6.6"/>',
  'skill-shape':
    '<circle fill="var(--ic3,currentColor)" opacity=".4" cx="16.8" cy="7.4" r="5"/>' +
    '<path d="M6.5 3.8Q7.2 2.6 7.9 3.8L11.9 10.8Q12.6 12 11.2 12L3.2 12Q1.8 12 2.5 10.8Z"/>' +
    '<path d="M9.6 12.8h5a2 2 0 0 1 2 2v4.8a2 2 0 0 1 -2 2h-5a2 2 0 0 1 -2 -2v-4.8a2 2 0 0 1 2 -2Z"/>',
  'skill-frac':
    '<path d="M10.8 4.2V13.2H19.8A9 9 0 1 1 10.8 4.2Z"/>' +
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M13.2 1.8a9 9 0 0 1 9 9h-9Z"/>',
  'scale':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M.8 15.4h7.6a3.8 3.8 0 0 1-7.6 0ZM15.6 11.8h7.6' +
    'a3.8 3.8 0 0 1-7.6 0Z"/><path fill="none" stroke="currentColor" stroke-width="2.4" d="M4.6 8.8L19.4 5.2M12 6.6V20"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="1.8" d="M4.6 8.8l-3 6.6M4.6 8.8l3 6.6M19.4 5.2l-3 6.6M19.4 5.2' +
    'l3 6.6"/><path d="M8.9 19.4h6.2a1.3 1.3 0 0 1 1.3 1.3v0a1.3 1.3 0 0 1 -1.3 1.3h-6.2a1.3 1.3 0 0 1 -1.3 -1.3v0' +
    'a1.3 1.3 0 0 1 1.3 -1.3Z"/><circle cx="12" cy="5.6" r="2"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2" d="M.8 15.4h7.6M15.6 11.8h7.6"/>',
  'ruler':
    '<path fill-rule="evenodd" d="M.9 19.3Q-.4 18 .9 16.7L16.7 .9Q18 -.4 19.3 .9L23.1 4.7Q24.4 6 23.1 7.3L7.3 23.1' +
    'Q6 24.4 4.7 23.1ZM3.6 16.2L4.9 14.9L7.8 17.9L6.6 19.1ZM6.4 13.3L7.7 12.1L9.5 13.9L8.3 15.2ZM9.2 10.5L10.5 9.2L13.5 12.2' +
    'L12.2 13.5ZM12.1 7.7L13.3 6.4L15.2 8.3L13.9 9.5ZM14.9 4.9L16.2 3.6L19.1 6.6L17.9 7.8Z"/>',
  'skill-abc':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M12 2.2h7.2a2.6 2.6 0 0 1 2.6 2.6v7.2a2.6 2.6 0 0 1 -2.6 2.6h-7.2' +
    'a2.6 2.6 0 0 1 -2.6 -2.6v-7.2a2.6 2.6 0 0 1 2.6 -2.6Z"/>' +
    '<path fill-rule="evenodd" d="M5.2 8h8a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-8a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3ZM8.9 10.9' +
    'Q9.2 10.4 9.5 10.9L13.4 19.4Q13.6 19.8 13.2 19.8L11.8 19.8Q11.4 19.8 11.3 19.4L10.7 18L7.7 18L7.1 19.4Q7 19.8 6.6 19.8' +
    'L5.2 19.8Q4.8 19.8 5 19.4ZM9.2 13.2l.9 2.8H8.3Z"/>',
  'ear':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M7.4 9.6a6 6 0 1 1 10.6 3.8c-1.2 1.4-2.4 2.2-2.4 4.2' +
    'a3 3 0 0 1-5.6 1.4Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.8" d="M7.4 9.6a6 6 0 1 1 10.6 3.8c-1.2 1.4-2.4 2.2-2.4 4.2' +
    'a3 3 0 0 1-5.6 1.4"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.4" d="M10.6 9.8a2.2 2.2 0 1 1 3.6 1.7l-1 .9"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2" d="M3 7.4c-.8 2-.8 4.2 0 6.2"/>',
  'skill-story':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M6 15h12.4a2 2 0 0 1 2 2v2.8a2 2 0 0 1 -2 2h-12.4a2 2 0 0 1 -2 -2' +
    'v-2.8a2 2 0 0 1 2 -2Z"/>' +
    '<path fill-rule="evenodd" d="M4 4.4a2 2 0 0 1 2-2h12.4a2 2 0 0 1 2 2v13.4H4ZM13.4 2.4h4v7.4l-2-1.6-2 1.6Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="1.8" d="M7 18.8h10.4"/>',
  'doc':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M14 2.6v3.6a2 2 0 0 0 2 2h3.6Z"/>' +
    '<path fill-rule="evenodd" d="M6.4 2.2h7.6l5.8 5.8v11.8a2 2 0 0 1-2 2H6.4a2 2 0 0 1-2-2V4.2a2 2 0 0 1 2-2ZM14 2.2v4' +
    'a2 2 0 0 0 2 2h3.8ZM8.4 11h7.2a1 1 0 0 1 1 1v0a1 1 0 0 1 -1 1h-7.2a1 1 0 0 1 -1 -1v0a1 1 0 0 1 1 -1ZM8.4 15h4.6' +
    'a1 1 0 0 1 1 1v0a1 1 0 0 1 -1 1h-4.6a1 1 0 0 1 -1 -1v0a1 1 0 0 1 1 -1Z"/>',
  'music':
    '<path d="M3.2 17.8a3.2 3.2 0 1 0 6.4 0a3.2 3.2 0 1 0 -6.4 0ZM14.2 15.4a3.2 3.2 0 1 0 6.4 0a3.2 3.2 0 1 0 -6.4 0Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.4" d="M9 17.8V6.2L20 3.6V15.4"/>' +
    '<path stroke="currentColor" stroke-width="1" d="M9 5.4L20 2.8V7l-11 2.6Z"/>',
  'clap':
    '<path fill="none" stroke="var(--ic3,currentColor)" stroke-width="6.2" opacity=".4" d="M14.4 11.3L16.4 17.1"/>' +
    '<path fill="none" stroke="var(--ic3,currentColor)" stroke-width="2.6" opacity=".4" d="M20.5 15L18.7 17.8"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="6.2" d="M9.6 11.3L7.6 17.1"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.6" d="M3.5 15L5.3 17.8"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2" d="M12 2.2v2.4M7 3.2l1.2 2M17 3.2l-1.2 2"/>',
  'skill-pattern':
    '<circle cx="5" cy="12" r="3.4"/>' +
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M10.2 8.6h3.6a1.6 1.6 0 0 1 1.6 1.6v3.6a1.6 1.6 0 0 1 -1.6 1.6' +
    'h-3.6a1.6 1.6 0 0 1 -1.6 -1.6v-3.6a1.6 1.6 0 0 1 1.6 -1.6Z"/><circle cx="19" cy="12" r="3.4"/>',
  'pin':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M7.4 20.8a4.6 1.6 0 1 0 9.2 0a4.6 1.6 0 1 0 -9.2 0Z"/>' +
    '<path fill-rule="evenodd" d="M12 2.2a7 7 0 0 0-7 7c0 4.6 4.6 9.4 7 11.4 2.4-2 7-6.8 7-11.4a7 7 0 0 0-7-7ZM9.4 9.2' +
    'a2.6 2.6 0 1 0 5.2 0a2.6 2.6 0 1 0 -5.2 0Z"/>',
  'skill-array':
    '<path fill="none" stroke="var(--ic3,currentColor)" stroke-width="5.6" opacity=".4" d="M5 5.2h14M5 12h14M5 18.8h14"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="3.8" stroke-dasharray="0 5.6" d="M6.4 5.2h11.2M6.4 12h11.2' +
    'M6.4 18.8h11.2"/>',
  'wave':
    '<path fill="none" stroke="currentColor" stroke-width="1.8" d="M2.6 6.6a5 5 0 0 1 2.4-3.6M19 20.6a5 5 0 0 0 3.2-2.6"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2.6" d="M9.9 5.3L11.3 11.9M13.3 3.7L13.9 11.1M16.7 5.4L16.1 11.8' +
    'M19.2 9.2L18 13.6M5.3 12.9L9.1 16.3"/><path d="M9 12.4h10.6v3.4c0 3.4-2.6 6-6 6h-.6c-2.4 0-4.4-1.6-5.2-3.8L7 14Z"/>',
  'skill-geo':
    '<path fill="var(--ic3,currentColor)" opacity=".4" d="M4 19.4h11A11 11 0 0 0 10.2 10.3Z"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="3" d="M20.6 19.4H4L13.8 4.8"/>',
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

// Skill id -> icon name (DESIGN_SYSTEM 5.4). A skill missing here (new content) gets its subject's icon.
const ICO_SK={
  add:'plus',sub:'minus',miss:'question',big:'skill-num',eo:'blocks',cnt:'skill-count',story:'skill-story',cmp:'scale',
  time:'clock',coins:'coin',pk_count:'skill-count',pk_num:'skill-num',pk_more:'scale',sort:'puzzle',shape:'skill-shape',
  pat:'skill-pattern',tenf:'skill-array',pos:'pin',meas:'ruler',mult:'times',arr:'skill-array',mfact:'times',dfact:'divide',
  mbig:'times',pv:'blocks',data:'chart',frac:'skill-frac',fop:'skill-frac',dec:'skill-num',ang:'skill-shape',
  abc:'skill-abc',syl:'clap',sound:'ear',rhyme:'music',comp:'skill-story',info:'doc',sight:'eye',pic:'image',build:'puzzle',sent:'doc',
  spell:'edit',trace:'edit',
  es_greet:'wave',es_color:'palette',es_num:'skill-num',es_teen:'skill-num',es_animal:'paw',es_food:'food',es_body:'user',
  es_family:'users',es_mix:'trophy',
  sci_life:'paw',sci_earth:'globe',sci_phys:'bolt',geo_world:'map',geo_us:'pin',civ:'users',
};
const ICO_AREA={math:'path-math',read:'path-read',es:'path-es',disc:'path-disc',bt:'puzzle'};
function icoSk(id){
  const s=typeof SK!='undefined'&&SK[id];
  return ICO_SK[id]||(s&&ICO_AREA[s.area])||'star';
}

if(document.body&&!document.getElementById('ico-sprite'))document.body.insertAdjacentHTML('afterbegin',icoSprite());
