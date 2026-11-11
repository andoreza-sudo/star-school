/* ---------- content pictures: object art with emoji fallback (DESIGN_SYSTEM 6.5) ---------- */
/* Every content picture (counting objects, picture words, vocabulary) goes through picFor(word, emoji).
   P4-13 to P4-15 add drawings to ART with Object.assign(ART, {apple: '<path .../>', ...}): set A in src/js/16-art-a.js, set B in
   src/data/d-art-b.js (the data file, so ART is complete only at render time: read it inside functions, never while loading)
   (64x64 grid, style and limits in DESIGN_SYSTEM 6.5); words with a drawing show it, the rest keep the emoji,
   with no change to any generator.
   Rules for content code:
   - Never put a picture emoji straight into q.html; call picFor(word, emoji).
   - The word is the art name (lowercase, a-z and hyphens). The emoji is the fallback and must be in tools/emoji-allow.txt.
   - Use the result where the emoji used to go (inside .emo or inline text): drawings size to 1em, like an emoji. */
const ART = {};

// One drawing as an inline SVG, sized like text by default.
function picArt(name, size = '1em', cls = '') {
  const s = typeof size == 'number' ? size + 'px' : size;
  return `<svg class="art${cls ? ' ' + cls : ''}" viewBox="0 0 64 64" width="${s}" height="${s}" aria-hidden="true" focusable="false">`
    + ART[name] + '</svg>';
}

// The picture for a word: the drawing when ART has one, else the emoji fallback.
function picFor(word, emoji = '') {
  return ART[word] ? picArt(word) : emoji;
}
