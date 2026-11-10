/* ---------- content pictures: object art with emoji fallback (DESIGN_SYSTEM 6.5) ---------- */
/* Every content picture (counting objects, picture words, vocabulary) goes through picFor(word, emoji).
   Today ART is empty, so picFor returns the emoji. P4-13 to P4-15 add drawings to ART in src/js/16-art-*.js with
   Object.assign(ART, {apple: '<path .../>', ...}) (64x64 grid, flat two-tone, tokens/currentColor, under 900 bytes);
   from then on the same questions show the drawing, with no change to any generator.
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
