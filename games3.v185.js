/* Star School games3 v185. BUILT by tools/build.py from 60-game-blocks.css, 60-blocks.js, 61-bb-gl.js: never edit by hand.
   index.html v185 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v185.js. */
(function(){var s=document.createElement('style');s.id='css-games3';s.textContent="/* Block Builder (G-01; src/js/60-blocks.js). Goes into games3.<VER>.js with the game (G-BB2). Tokens only.\n   Play screen: the scene, then the tool bar and the palette under it (portrait) or beside it (landscape). Every button 48 px and up. */\n.bb-wrap{flex:1;display:flex;flex-direction:column;min-height:0;gap:var(--s-2);padding:0 var(--s-2) var(--s-2)}\n.bb-cv{flex:1;position:relative;min-height:160px;border-radius:var(--r-card);overflow:hidden;background:var(--sc-sky);box-shadow:inset 0 0 0 2px var(--line)}\n.bb-cv canvas{display:block;width:100%;height:100%;touch-action:none;-webkit-user-select:none;user-select:none}\n/* G-BB2: the 3D scene under the 2D canvas (which takes the touches and draws outlines and effects over it) */\n.bb-cv #bbgl{position:absolute;inset:0;pointer-events:none}\n.bb-cv #bbgl[hidden]{display:none}\n.bb-cv [id=\"bbc\"]{position:relative}\n.bb-side{flex:none;display:flex;flex-direction:column;gap:var(--s-2);min-height:0;min-width:0}\n.bb-bar{display:flex;flex-direction:column;gap:var(--s-1)}\n.bb-row{display:flex;gap:var(--s-1);align-items:stretch}\n.bb-tb{flex:1 1 0;min-width:48px;min-height:56px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;\n  padding:4px 2px;border:0;border-radius:var(--r-btn);background:var(--surface);color:var(--ink);box-shadow:0 3px 0 var(--line),inset 0 0 0 2px var(--line);\n  font:inherit;font-family:var(--font-display);font-size:var(--fs-2);font-weight:700;line-height:1.1;cursor:pointer;transition:transform var(--t-fast) var(--ease)}\n.bb-tb span{white-space:nowrap}\n.bb-tb .ic{width:26px;height:26px;flex:none}\n.bb-tb:active{transform:translateY(2px)}\n.bb-tb[aria-pressed=\"true\"]{background:var(--brand-tint);color:var(--brand-shade);box-shadow:inset 0 0 0 3px var(--brand),0 3px 0 var(--brand-shade)}\n.bb-tb[aria-disabled=\"true\"]{color:var(--ink-3)}\n.bb-flip .ic{transform:scaleX(-1)}\n#bbboom[aria-pressed=\"true\"]{background:var(--try-tint);color:var(--try-ink);box-shadow:inset 0 0 0 3px var(--try),0 3px 0 var(--try-ink)}\n.bb-seg{flex:3 1 0;display:flex;gap:2px;padding:3px;border-radius:var(--r-btn);background:var(--surface-2);box-shadow:inset 0 0 0 2px var(--line)}\n.bb-seg .bb-tb{min-height:52px;background:transparent;box-shadow:none}\n.bb-seg .bb-tb[aria-pressed=\"true\"]{background:var(--surface);color:var(--brand-shade);box-shadow:inset 0 0 0 3px var(--brand),0 2px 0 var(--brand-shade)}\n/* the palette: groups with a heading, scrolls; soft fades show there is more on a side */\n.bb-pal{position:relative;flex:none;min-height:0;min-width:0}\n.bb-pal[hidden]{display:none}\n.bb-ps{display:flex;gap:var(--s-3);overflow-x:auto;overflow-y:hidden;padding:6px var(--s-1) 6px;scrollbar-width:none;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}\n.bb-ps::-webkit-scrollbar{display:none}\n.bb-grp{flex:none;display:flex;flex-direction:column;gap:2px}\n.bb-gh{font-family:var(--font-display);font-size:var(--fs-2);font-weight:700;color:var(--ink-2);padding-left:4px;white-space:nowrap}\n.bb-gb{display:flex;gap:var(--s-1)}\n.bb-k{flex:none;position:relative;width:72px;min-height:84px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:0;padding:4px 2px 6px;\n  border:0;border-radius:var(--r-btn);background:var(--surface);color:var(--ink);box-shadow:0 3px 0 var(--line),inset 0 0 0 2px var(--line);\n  font:inherit;font-size:var(--fs-2);font-weight:700;line-height:1.05;cursor:pointer;transition:transform var(--t-fast) var(--ease)}\n.bb-k canvas{width:46px;height:46px;flex:none}\n.bb-kn{display:flex;align-items:center;justify-content:center;gap:2px;text-align:center;min-height:30px}\n.bb-kl{color:var(--ink-2)}\n.bb-kl .ic{width:16px;height:16px;flex:none}\n.bb-k[aria-pressed=\"true\"]{background:var(--brand-tint);color:var(--brand-shade);box-shadow:inset 0 0 0 3px var(--brand),0 3px 0 var(--brand-shade);transform:translateY(-2px)}\n.bb-k.lock canvas{opacity:.35}\n.bb-k.hint{box-shadow:inset 0 0 0 4px var(--try),0 3px 0 var(--try-ink);animation:bb-hint .6s var(--ease) 3}\n@keyframes bb-hint{50%{transform:translateY(-6px) scale(1.06)}}\n.bb-pal::before,.bb-pal::after{content:\"\";position:absolute;z-index:1;pointer-events:none;opacity:0;transition:opacity var(--t)}\n.bb-pal::before{left:0;top:0;bottom:0;width:28px;background:linear-gradient(90deg,var(--paper),transparent)}\n.bb-pal::after{right:0;top:0;bottom:0;width:28px;background:linear-gradient(270deg,var(--paper),transparent)}\n.bb-pal.vert::before{right:0;bottom:auto;width:auto;height:28px;background:linear-gradient(180deg,var(--paper),transparent)}\n.bb-pal.vert::after{left:0;top:auto;width:auto;height:28px;background:linear-gradient(0deg,var(--paper),transparent)}\n.bb-pal.can-a::before,.bb-pal.can-b::after{opacity:1}\n/* messages inside the scene, under the top bar (never over Pause or the progress chip) */\n.bb-msg{position:absolute;left:50%;top:var(--s-2);z-index:2;display:flex;align-items:center;gap:var(--s-2);max-width:calc(100% - 16px);\n  padding:6px 14px 6px 6px;border-radius:var(--r-pill);background:var(--surface);color:var(--ink);box-shadow:var(--shadow),inset 0 0 0 2px var(--line);\n  font-family:var(--font-display);font-size:var(--fs-2);font-weight:700;line-height:1.25;pointer-events:none;opacity:0;transform:translate(-50%,-8px);\n  transition:opacity var(--t) var(--ease),transform var(--t) var(--ease)}\n.bb-msg.on{opacity:1;transform:translate(-50%,0)}\n.bb-mi{flex:none;display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--brand);color:var(--surface)}\n.bb-msg.try{color:var(--try-ink)}.bb-msg.try .bb-mi{background:var(--try);color:var(--try-ink)}\n.bb-msg.good{color:var(--good-ink)}.bb-msg.good .bb-mi{background:var(--good)}\n.bb-tip{position:absolute;left:50%;bottom:var(--s-2);z-index:2;max-width:calc(100% - 16px);padding:6px 14px;border-radius:var(--r-pill);\n  background:var(--ink);color:var(--surface);font-size:var(--fs-2);line-height:1.3;text-align:center;pointer-events:none;opacity:0;\n  transform:translate(-50%,8px);transition:opacity var(--t) var(--ease),transform var(--t) var(--ease)}\n.bb-tip.on{opacity:.92;transform:translate(-50%,0)}\n.gh-top .bb-prog b{white-space:nowrap}\n/* landscape (tablets, phones on their side): the tools and the palette in a column beside the scene */\n@media (min-aspect-ratio:5/4) and (min-width:640px){\n  .bb-wrap{flex-direction:row}\n  .bb-side{width:322px}\n  .bb-pal{flex:1}\n  .bb-ps{flex-direction:column;height:100%;overflow-x:hidden;overflow-y:auto;padding:2px 2px 6px}\n  .bb-gb{flex-wrap:wrap}\n}\n/* sheets: Clear area, More, delete a world, pick a world */\n.bb-sheet h2{margin:var(--s-2) 0;font-size:var(--fs-5)}\n.bb-sheet h3{margin:var(--s-4) 0 var(--s-2);font-size:var(--fs-4)}\n.bb-sheet p{margin:0 0 var(--s-3);color:var(--ink-2)}\n.bb-sheet .acts{display:flex;flex-direction:column;gap:var(--s-2);margin-top:var(--s-4)}\n.bb-mts{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s-2);margin-bottom:var(--s-3)}\n.bb-mt{min-height:72px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;border:0;border-radius:var(--r-btn);\n  background:var(--surface);color:var(--ink);box-shadow:0 3px 0 var(--line),inset 0 0 0 2px var(--line);font:inherit;font-size:var(--fs-2);font-weight:700;cursor:pointer}\n.bb-mt[aria-pressed=\"true\"]{background:var(--brand-tint);color:var(--brand-shade);box-shadow:inset 0 0 0 3px var(--brand),0 3px 0 var(--brand-shade)}\n.bb-goals{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--s-1)}\n.bb-goals li{display:flex;align-items:center;gap:var(--s-2);min-height:40px;font-size:var(--fs-2);color:var(--ink-2);text-align:left}\n.bb-goals li .ic{flex:none;color:var(--ink-3)}\n.bb-goals li.on{color:var(--good-ink)}.bb-goals li.on .ic{color:var(--good)}\n/* the menu */\n.bb-menu{padding-top:var(--s-1)}\n.bb-sec{margin:0 0 var(--s-5)}\n.bb-sec h2{display:flex;align-items:center;gap:var(--s-2);margin:var(--s-2) 0 var(--s-1);font-size:var(--fs-5)}\n.bb-sec h2 .ic{flex:none;color:var(--es)}\n.bb-sc{margin-left:auto;display:inline-flex;align-items:center;gap:4px;font-size:var(--fs-3);color:var(--ink-2)}\n.bb-lead{margin:0 0 var(--s-3);font-size:var(--fs-2);color:var(--ink-2)}\n.bb-bpg{display:flex;gap:var(--s-2);overflow-x:auto;margin:0 -14px;padding:6px 14px 8px;scrollbar-width:thin;-webkit-overflow-scrolling:touch}\n.bb-bpg .bb-bp{flex:none;width:118px}\n.bb-bp{display:flex;flex-direction:column;align-items:center;gap:2px;min-height:148px;padding:var(--s-2) var(--s-1);border:0;border-radius:var(--r-card);\n  background:var(--surface);color:var(--ink);box-shadow:0 4px 0 var(--line),inset 0 0 0 2px var(--line);font:inherit;cursor:pointer;text-align:center}\n.bb-bp.done{background:var(--es-tint)}\n.bb-bp.lock{background:var(--surface-2);color:var(--ink-3)}\n.bb-bpic{position:relative;display:grid;place-items:center;width:100%;height:66px}\n.bb-bp.lock canvas{opacity:.35}\n.bb-lk{position:absolute;inset:0;display:grid;place-items:center;color:var(--ink-2)}\n.bb-bpic canvas{width:88px;height:66px}\n.bb-bpn{font-family:var(--font-display);font-size:var(--fs-2);font-weight:700;line-height:1.2}\n.bb-bps{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:var(--fs-2);color:var(--ink-2)}\n.bb-bpl{font-size:var(--fs-2);line-height:1.2}\n.bb-wl{display:flex;flex-direction:column;gap:var(--s-2)}\n.bb-wrow{display:flex;gap:var(--s-2);align-items:center}\n.bb-w{flex:1;min-width:0;display:flex;align-items:center;gap:var(--s-3);min-height:88px;padding:var(--s-2);border:0;border-radius:var(--r-card);background:var(--surface);\n  color:var(--ink);box-shadow:0 4px 0 var(--line),inset 0 0 0 2px var(--line);font:inherit;text-align:left;cursor:pointer}\n.bb-wpic{flex:none;display:grid;place-items:center;width:110px;height:75px;border-radius:var(--r-btn);background:linear-gradient(var(--sc-sky-1),var(--sc-sky))}\n.bb-wpic canvas{width:110px;height:75px}\n.bb-plus{color:var(--es)}\n.bb-wi{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px;font-size:var(--fs-2);color:var(--ink-2)}\n.bb-wi b{font-family:var(--font-display);font-size:var(--fs-4);color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.bb-wg{display:inline-flex;align-items:center;gap:4px}\n.bb-go{flex:none;display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:var(--es);color:var(--surface)}\n.bb-how ul{list-style:none;margin:0;padding:0;display:grid;gap:var(--s-2)}\n.bb-how li{display:flex;align-items:center;gap:var(--s-3);font-size:var(--fs-2);color:var(--ink-2)}\n.bb-how li .ic{flex:none;color:var(--es)}\n@media (min-width:860px){.bb-how ul{grid-template-columns:1fr 1fr}}\n\n/* P6-01: the palette scrolls and clips, so a block's focus ring sits inside its button */\n.bb-k:focus-visible{outline-offset:-4px}\n\n/* G-01b: the task of a build in the scene (bottom left): its kind, what to do, and for a picture or a fix the picture (tap: bigger) */\n.bb-task{position:absolute;left:var(--s-2);bottom:var(--s-2);z-index:2;display:flex;align-items:flex-end;gap:var(--s-2);max-width:calc(100% - 16px);pointer-events:none}\n.bb-tt{margin:0;display:flex;flex-direction:column;gap:2px;max-width:260px;padding:6px 12px 8px;border-radius:var(--r-card);background:var(--surface);color:var(--ink);\n  box-shadow:var(--shadow),inset 0 0 0 2px var(--line);font-size:var(--fs-2);line-height:1.25}\n.bb-tm{display:inline-flex;align-items:center;gap:4px;font-family:var(--font-display);font-weight:700;color:var(--es-shade)}\n.bb-tm .ic{flex:none;color:var(--es)}\n.bb-tpic{pointer-events:auto;flex:none;display:grid;place-items:center;width:96px;height:76px;padding:2px;border:0;border-radius:var(--r-card);\n  background:var(--surface);box-shadow:var(--shadow),inset 0 0 0 3px var(--es);cursor:pointer;transform-origin:0 100%;transition:transform var(--t) var(--ease)}\n.bb-tpic canvas{width:100%;height:100%}\n.bb-tpic[aria-pressed=\"true\"]{transform:scale(1.9)}\n@media (max-width:420px){.bb-tt{max-width:200px}}\n/* the menu: the next goal line, chapters, the day's build, the gallery */\n.bb-goal{display:flex;align-items:center;gap:var(--s-3);margin:var(--s-2) 0 var(--s-3);padding:var(--s-2) var(--s-3);border-radius:var(--r-card);\n  background:var(--surface);color:var(--ink);font-size:var(--fs-3);line-height:1.3;box-shadow:inset 0 0 0 2px var(--es-tint),0 4px 0 var(--ledge-soft)}\n.bb-gi{flex:none;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--es-tint);color:var(--es-shade)}\n.bb-sep{display:inline-block;width:var(--s-2)}\n.bb-chap{margin:0 0 var(--s-3);padding:var(--s-2) 0 0;border-radius:var(--r-card)}\n.bb-chh{display:flex;align-items:center;gap:var(--s-2);margin:0 0 2px;padding:var(--s-1) var(--s-2);border-radius:var(--r-btn);background:var(--sc-green);color:var(--ink);font-size:var(--fs-3)}\n.s-beach .bb-chh{background:var(--sc-sand)}.s-snow .bb-chh{background:var(--sc-sea)}.s-sky .bb-chh{background:var(--sc-peach)}\n.bb-chap.lock .bb-chh{background:var(--surface-2)}\n.bb-chi{flex:none;display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:var(--surface);color:var(--es-shade)}\n.bb-cht{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.2}\n.bb-cht b{font-family:var(--font-display);font-size:var(--fs-4)}\n.bb-cht span{font-size:var(--fs-2);font-weight:400;color:var(--ink-2)}\n.bb-chn{flex:none;display:inline-flex;align-items:center;gap:4px;font-family:var(--font-display);font-size:var(--fs-3)}\n.bb-bm{display:inline-flex;align-items:center;gap:3px;font-size:var(--fs-2);color:var(--es-shade);font-weight:700}\n.bb-bm .ic{flex:none}\n.bb-bp.lock .bb-bm{color:var(--ink-3)}\n.bb-bpg .bb-bp{min-height:170px}\n.bb-w.lock{background:var(--surface-2);color:var(--ink-3)}\n.bb-w.lock canvas{opacity:.35}\n.bb-wpic{position:relative}\n.bb-gal{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:var(--s-2)}\n.bb-gc{display:flex;flex-direction:column;align-items:center;gap:4px;min-height:120px;padding:var(--s-2);border:0;border-radius:var(--r-card);background:var(--surface);color:var(--ink);\n  box-shadow:0 4px 0 var(--line),inset 0 0 0 2px var(--line);font:inherit;cursor:pointer}\n.bb-gpic{display:grid;place-items:center;width:100%;aspect-ratio:22/15;border-radius:var(--r-btn);background:linear-gradient(var(--sc-sky-1),var(--sc-sky))}\n.bb-gpic canvas{width:100%;height:100%}\n.bb-gcn{font-family:var(--font-display);font-size:var(--fs-2);font-weight:700;line-height:1.2;text-align:center}\n.bb-gbig canvas{display:block;width:100%;max-width:600px;aspect-ratio:3/2;margin:0 auto;border-radius:var(--r-card);background:linear-gradient(var(--sc-sky-1),var(--sc-sky))}\n.bb-gn{font-family:var(--font-body);font-size:var(--fs-2);font-weight:400;color:var(--ink-2);margin-left:var(--s-2)}\n.bb-alldone{display:flex;align-items:center;gap:var(--s-2);color:var(--good-ink)}\n.bb-sheet .btn.wide{margin-top:var(--s-2)}\n/* the end card: the child's build (or the trophy) as its picture */\n.gh-epic>.bb-epic{display:block;width:100%;height:100%;object-fit:contain}\n.gh-epic>.bb-etro{display:block;height:100%;margin:0 auto}\n/* G-BB3: a goal in More reads itself aloud; the big projects with a dot a step; the project in the scene (bottom left, a tap reads it) */\n.bb-gl{flex:1;display:flex;align-items:center;gap:var(--s-2);min-height:48px;padding:4px var(--s-2);border:0;border-radius:var(--r-btn);background:var(--surface-2);\n  color:var(--ink-2);font:inherit;font-size:var(--fs-2);line-height:1.25;text-align:left;cursor:pointer}\n.bb-gl>span{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}\n.bb-gl .ic{flex:none;color:var(--ink-3)}\n.bb-gl.on{color:var(--good-ink)}.bb-gl.on .ic{color:var(--good)}\n.bb-pjr b{font-family:var(--font-display);color:var(--ink)}\n.bb-pjd{display:flex;gap:4px}\n.bb-pjd i{width:12px;height:12px;border-radius:50%;background:var(--line)}\n.bb-pjd i.on{background:var(--good)}\n.bb-pjd i.now{background:var(--surface);box-shadow:inset 0 0 0 3px var(--es)}\n.bb-pj{position:absolute;left:var(--s-2);bottom:var(--s-2);z-index:2;display:flex;flex-direction:column;align-items:flex-start;gap:3px;min-height:48px;max-width:min(300px,calc(100% - 16px));\n  padding:6px 12px 8px;border:0;border-radius:var(--r-card);background:var(--surface);color:var(--ink);box-shadow:var(--shadow),inset 0 0 0 2px var(--es-tint);\n  font:inherit;font-size:var(--fs-2);line-height:1.25;text-align:left;cursor:pointer}\n.bb-pj[hidden]{display:none}\n.bb-pjh{display:flex;align-items:center;gap:4px;font-family:var(--font-display);font-weight:700}\n.bb-pjh .ic{flex:none;color:var(--es)}\n.bb-pjn{margin-left:4px;color:var(--es-shade)}\n.bb-pjt{color:var(--ink-2)}\n@media (max-width:420px){.bb-pj{max-width:210px}.bb-pjh b{font-size:var(--fs-2)}}\n";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)
/* ---------- Block Builder (isometric) ----------
   G-01 (R-02 section 3): rebuilt so a 5-year-old can build by touch and a 10-year-old has depth. The world data, the saved
   worlds and the blocks' ids are unchanged; the play screen, the camera, the tools, the blueprints, the menu and the look are new.

   Touch: a short tap builds (or breaks / stamps / lights, by the tool); one finger dragged moves the view; two fingers pinch to
   zoom; press and hold, then slide: the magnifier bubble and the place-here outline follow the finger, lifting places it (and,
   with Line / Wall / Floor / Clear area, the slide draws the shape). A Build tap on a column puts the block on top of that column
   (the "Build on the sides" switch in More puts it beside the face you touched). A Build tap never lights TNT: lighting is the Boom tool.
   Camera: Closer / Farther keep the middle of the view, Left / Right turn the island a quarter with an animation, every edge can be
   brought to the middle by dragging. It opens close up: a block's top is at least 52 CSS px wide.
   Blueprints: only the next layer is drawn as see-through blocks (the layers above are faint and cannot be tapped); a tap is matched
   to a see-through block of that layer first (under the finger, then the column the finger is on, then the nearest one), so a child
   is never told off for the app's own aim; a wrong block counts one mistake per spot and shows the right block in the palette.
   Undo and Redo restore the blocks, the progress and the mistake count together.

   Save (ROADMAP save-field table): S.bb = {worlds: [{name, d, e?, goals?, n?, kinds?}], cur, ch?, bp?}. New and optional:
   bp {blueprintId: stars} (from the old index array ch on first read, ch kept and still written for the old blueprints),
   and per world goals {goalId: 1}, n (blocks built) and kinds (block ids used) for the free-build goals.
   Colours: every colour on the canvas comes from an --ill-* or --sc-* token (bbCol); nothing here is a raw colour.
   Logic that needs no screen (bbMake: camera, drawing order, hit test, targets, blueprint layers, undo) is tested in Node
   (tools/test.js "block builder G-01"); the play screen around it is blockBuilder().
   G-BB2 (R-03 B1-B3): the play screen draws in 3D with 61-bb-gl.js (bbGL, bbCam3) where WebGL works and S.bb.gl is not 0: the GL
   canvas #bbgl under #bbc, which then only takes the touches and draws the overlay (outlines, effects, the magnifier); one finger
   turns the view. This 2D drawing stays the fallback. Animals are drawn from the object art (bbAnimalImg); music (bbMusic); a change
   is saved after the frame that shows it (bbSaveSoon). Both files (and the CSS) go into games3.<VER>.js. */

const BW = 16, BD = 16, BH = 14;
const bbI = (x, y, z) => (z * BD + y) * BW + x;
// block ids are saved in worlds: never renumber. deco: drawn as a small picture standing on the cell, not a cube.
const BLOCKS = [null,
  { k: 'grass', n: 'Grass' }, { k: 'dirt', n: 'Dirt' }, { k: 'stone', n: 'Stone' }, { k: 'planks', n: 'Planks' }, { k: 'log', n: 'Log' },
  { k: 'leaves', n: 'Leaves', see: 1 }, { k: 'glass', n: 'Glass', see: 1 }, { k: 'brick', n: 'Brick' }, { k: 'sand', n: 'Sand' },
  { k: 'water', n: 'Water', see: 1 }, { k: 'snow', n: 'Snow' }, { k: 'wool', n: 'Pink Wool' }, { k: 'blue', n: 'Blue Wool' },
  { k: 'gold', n: 'Gold', need: 100 }, { k: 'diamond', n: 'Diamond', need: 200 }, { k: 'rainbow', n: 'Rainbow', need: 300 },
  { k: 'flower', n: 'Flower', deco: 1 }, { k: 'mush', n: 'Mushroom', deco: 1 }, { k: 'pet', n: 'My Pet', deco: 1 },
  { k: 'tnt', n: 'TNT' }, { k: 'lava', n: 'Lava', glow: 'orange' }, { k: 'lamp', n: 'Lamp', glow: 'yellow' }, { k: 'pumpkin', n: 'Pumpkin' },
  { k: 'cactus', n: 'Cactus' }, { k: 'obsidian', n: 'Obsidian' }, { k: 'ice', n: 'Ice', see: 1 },
  // G-01b: the journey's block sets (a chapter opens them) and prizes (a chapter's trophy gives them); BB_CHS says which
  { k: 'coral', n: 'Coral' }, { k: 'stripe', n: 'Beach Stripe' }, { k: 'shell', n: 'Shell', deco: 1 }, { k: 'icebrick', n: 'Ice Brick' },
  { k: 'roof', n: 'Roof Tiles' }, { k: 'pine', n: 'Pine Tree', deco: 1 }, { k: 'cloud', n: 'Cloud' }, { k: 'crystal', n: 'Crystal', glow: 'purple' },
  { k: 'starb', n: 'Star Block', glow: 'yellow' }, { k: 'flag', n: 'Flag', deco: 1 }];
const BB_TNT = 20, BB_PET = 19;
// the palette, grouped; TNT is last (R-02 M3)
const BB_GROUPS = [
  ['Nature', [1, 2, 3, 9, 10, 11, 26, 5, 6, 24, 23, 17, 18, 27, 29, 32]],
  ['Building', [4, 8, 7, 12, 13, 22, 25, 14, 15, 16, 28, 30, 31, 33, 34, 35, 36]],
  ['Special', [19, 21, 20]],
];
const BBPAL = BB_GROUPS.flatMap(g => g[1]);
const bbSolid = v => !!v && !BLOCKS[v].deco;
const bbOpaque = v => !!v && !BLOCKS[v].see && !BLOCKS[v].deco;

/* ---- colours: tokens only ---- */
const BBCOL = {};
// t: an --ill-* name ('green', 'green-1', 'ink') or 'sc:<name>' for an --sc-* scene token; '' when there is no page (tests)
function bbCol(t) {
  if (BBCOL[t] != null) return BBCOL[t];
  let v = '';
  try {
    const name = t.slice(0, 3) == 'sc:' ? '--sc-' + t.slice(3) : '--ill-' + t;
    v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  } catch (e) { v = ''; }
  return (BBCOL[t] = v);
}
function bbRgb(t) {
  const h = bbCol(t).replace('#', '');
  return h.length >= 6 ? [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)) : [128, 128, 128];
}
const bbA = (t, a) => 'rgba(' + bbRgb(t).join(',') + ',' + a + ')';

/* ---- block faces, drawn in the app's object-art style: soft volume, light from the top left (R-02 C2) ---- */
const BBT = 32, BBTEX = {};
function bbCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h || w;
  return c;
}
function bbRR(x, X, Y, W, H, r) {
  x.beginPath();
  x.moveTo(X + r, Y);
  x.arcTo(X + W, Y, X + W, Y + H, r);
  x.arcTo(X + W, Y + H, X, Y + H, r);
  x.arcTo(X, Y + H, X, Y, r);
  x.arcTo(X, Y, X + W, Y, r);
  x.closePath();
}
function bbTex(k) {
  if (BBTEX[k]) return BBTEX[k];
  let x, r;
  const mk = f => {
    const c = bbCanvas(BBT);
    x = c.getContext('2d');
    r = rng(k.length * 131 + k.charCodeAt(0) * 7 + 3);
    f();
    x.globalAlpha = 1;
    return c;
  };
  const fill = (t, a = 1) => { x.globalAlpha = a; x.fillStyle = bbCol(t); x.fillRect(0, 0, BBT, BBT); };
  const rect = (t, X, Y, W, H, a = 1) => { x.globalAlpha = a; x.fillStyle = bbCol(t); x.fillRect(X, Y, W, H); };
  const rr = (t, X, Y, W, H, rad, a = 1) => { x.globalAlpha = a; x.fillStyle = bbCol(t); bbRR(x, X, Y, W, H, rad); x.fill(); };
  const dot = (t, X, Y, R, a = 1) => { x.globalAlpha = a; x.fillStyle = bbCol(t); x.beginPath(); x.arc(X, Y, R, 0, 7); x.fill(); };
  const ell = (t, X, Y, rx, ry, a = 1) => { x.globalAlpha = a; x.fillStyle = bbCol(t); x.beginPath(); x.ellipse(X, Y, rx, ry, 0, 0, 7); x.fill(); };
  const line = (t, w, pts, a = 1) => {
    x.globalAlpha = a; x.strokeStyle = bbCol(t); x.lineWidth = w; x.lineCap = x.lineJoin = 'round';
    x.beginPath(); pts.forEach(([X, Y], i) => i ? x.lineTo(X, Y) : x.moveTo(X, Y)); x.stroke();
  };
  const R = (a, b) => a + r() * (b - a);
  // the soft edge every opaque face gets: a light rim top and left, a shade rim bottom and right
  const bevel = (s = 1) => {
    rect('white', 0, 0, BBT, 2.5, .3 * s); rect('white', 0, 0, 2.5, BBT, .2 * s);
    rect('ink', 0, BBT - 2.5, BBT, 2.5, .16 * s); rect('ink', BBT - 2.5, 0, 2.5, BBT, .1 * s);
  };
  const dirt = () => {
    fill('brown');
    for (let i = 0; i < 7; i++) { const X = R(3, 29), Y = R(10, 29), q = R(1.4, 2.6); ell('brown-2', X + .6, Y + .7, q, q * .75, .7); ell('brown-1', X, Y, q, q * .75, .8); }
  };
  // a soft frosting on top of a side face (grass, snow): scallops with a shade under them
  const cap = (t, sh, hi) => {
    const sc = (dy, c, a) => {
      x.globalAlpha = a; x.fillStyle = bbCol(c); x.beginPath(); x.moveTo(0, 0); x.lineTo(32, 0); x.lineTo(32, 7 + dy);
      for (let i = 3; i >= 0; i--) x.arc(4 + i * 8, 7 + dy, 4, 0, Math.PI, false);
      x.closePath(); x.fill();
    };
    sc(1.6, sh, .55); sc(0, t, 1); rect(hi, 0, 0, BBT, 2.4, .8);
  };
  const knit = (b, d, h) => {
    fill(b);
    for (let y = 2; y < 32; y += 6) for (let X = 2; X < 32; X += 6) line(d, 1.4, [[X, y], [X + 3, y + 3.5], [X + 6, y]], .55);
    for (let i = 0; i < 5; i++) dot(h, R(4, 28), R(4, 28), 1.3, .6);
  };
  let top, side;
  switch (k) {
    case 'grass':
      top = mk(() => {
        fill('green');
        for (let i = 0; i < 5; i++) dot('green-1', R(4, 28), R(4, 28), R(3, 5), .38);
        for (let i = 0; i < 7; i++) ell('green-2', R(3, 29), R(3, 29), 1, 2.4, .5);
        bevel();
      });
      side = mk(() => { dirt(); cap('green', 'green-3', 'green-1'); bevel(); });
      break;
    case 'dirt': top = side = mk(() => { dirt(); bevel(); }); break;
    case 'stone':
      top = side = mk(() => {
        fill('grey-2');
        for (const [X, Y, W, H] of [[1, 1, 14, 9], [16, 1, 15, 12], [1, 11, 10, 10], [12, 14, 19, 8], [1, 22, 13, 9], [15, 23, 16, 8]]) {
          rr('grey', X, Y, W - 1, H - 1, 3); rr('grey-1', X + 1.5, Y + 1.2, (W - 1) * .55, 2, 1, .75);
        }
        bevel(.6);
      });
      break;
    case 'planks':
      top = side = mk(() => {
        fill('tan');
        for (const y of [0, 8, 16, 24]) {
          rect('tan-1', 0, y + 1, BBT, 1.2, .7);
          line('tan-2', 1, [[R(2, 8), y + 4], [R(14, 22), y + 4.5]], .55);
          rect('tan-3', 0, y + 7, BBT, 1.4, .75);
          rect('tan-3', [9, 23, 5, 18][y / 8], y, 1.4, 8, .6);
        }
        bevel();
      });
      break;
    case 'log':
      side = mk(() => {
        fill('brown-2');
        for (let i = 0; i < 5; i++) { rr('brown', 2 + i * 6.4, 0, 3.4, BBT, 1.7, .85); rect('brown-1', 2.6 + i * 6.4, 0, 1, BBT, .4); }
        bevel();
      });
      top = mk(() => {
        fill('brown-2'); dot('tan', 16, 16, 13);
        x.globalAlpha = .8; x.strokeStyle = bbCol('tan-2'); x.lineWidth = 1.4;
        for (const q of [4, 8, 11]) { x.beginPath(); x.arc(16, 16, q, 0, 7); x.stroke(); }
        dot('tan-3', 16, 16, 1.6); dot('tan-1', 11, 11, 3, .5);
      });
      break;
    case 'leaves':
      top = side = mk(() => {
        fill('green-2');
        for (let i = 0; i < 14; i++) dot('green', R(2, 30), R(2, 30), R(3.5, 5));
        for (let i = 0; i < 9; i++) dot('green-1', R(3, 29), R(3, 29), R(1.4, 2.4), .8);
        for (let i = 0; i < 5; i++) dot('green-3', R(3, 29), R(3, 29), 1.2, .5);
      });
      break;
    case 'glass':
      top = side = mk(() => {
        fill('aqua-1', .35);
        x.globalAlpha = .95; x.strokeStyle = bbCol('white'); x.lineWidth = 3; x.strokeRect(1.5, 1.5, 29, 29);
        line('white', 2, [[7, 21], [15, 13]], .8); line('white', 2, [[11, 25], [21, 15]], .55);
      });
      break;
    case 'brick':
      top = side = mk(() => {
        fill('cream-2');
        for (let row = 0; row < 4; row++) for (let c = -1; c < 3; c++) {
          const X = c * 16 + (row % 2) * 8 + 1, Y = row * 8 + 1;
          rr('red-2', X, Y, 14.5, 6.6, 2); rr('red', X, Y, 13.6, 5.8, 2); rect('red-1', X + 2, Y + 1, 8, 1.2, .55);
        }
        bevel(.6);
      });
      break;
    case 'sand':
      top = side = mk(() => {
        fill('tan-1');
        for (let i = 0; i < 18; i++) dot('tan', R(2, 30), R(2, 30), R(.8, 1.5), .85);
        line('tan-2', 1.2, [[4, 12], [8, 10], [12, 12], [16, 10]], .4); line('tan-2', 1.2, [[16, 24], [20, 22], [24, 24], [28, 22]], .4);
        bevel(.8);
      });
      break;
    case 'water':
      top = side = mk(() => {
        fill('blue', .72);
        for (const [X, Y] of [[5, 8], [17, 5], [10, 19], [22, 17], [6, 28], [24, 27]]) line('blue-1', 1.6, [[X, Y], [X + 3, Y - 2], [X + 6, Y]], .9);
        dot('white', 9, 7, 1.2, .55); dot('white', 24, 22, 1, .45);
      });
      break;
    case 'snow':
      top = mk(() => { fill('white'); for (let i = 0; i < 6; i++) dot('white-2', R(4, 28), R(4, 28), R(3, 5), .55); bevel(.6); });
      side = mk(() => { dirt(); cap('white', 'white-3', 'white'); bevel(); });
      break;
    case 'wool': top = side = mk(() => { knit('pink', 'pink-2', 'pink-1'); bevel(); }); break;
    case 'blue': top = side = mk(() => { knit('blue', 'blue-2', 'blue-1'); bevel(); }); break;
    case 'gold':
      top = side = mk(() => {
        fill('yellow');
        x.globalAlpha = .7; x.fillStyle = bbCol('yellow-1'); x.beginPath(); x.moveTo(4, 0); x.lineTo(14, 0); x.lineTo(0, 14); x.lineTo(0, 4); x.fill();
        x.beginPath(); x.moveTo(20, 0); x.lineTo(24, 0); x.lineTo(0, 24); x.lineTo(0, 20); x.fill();
        x.globalAlpha = 1; x.strokeStyle = bbCol('yellow-2'); x.lineWidth = 2.5; x.strokeRect(1.25, 1.25, 29.5, 29.5);
        dot('white', 23, 9, 1.6, .9);
      });
      break;
    case 'diamond':
      top = side = mk(() => {
        fill('aqua');
        for (const [a, b, c, t, al] of [[[0, 0], [16, 0], [0, 16], 'aqua-1', .7], [[32, 32], [16, 32], [32, 16], 'aqua-2', .6], [[16, 0], [32, 0], [16, 16], 'aqua-1', .35]]) {
          x.globalAlpha = al; x.fillStyle = bbCol(t); x.beginPath(); x.moveTo(...a); x.lineTo(...b); x.lineTo(...c); x.fill();
        }
        dot('white', 9, 9, 1.8, .9); dot('white', 22, 20, 1.3, .8);
        bevel(.6);
      });
      break;
    case 'rainbow':
      top = side = mk(() => {
        ['red', 'orange', 'yellow', 'green', 'blue', 'purple'].forEach((t, i) => rect(t, 0, i * 32 / 6, BBT, 32 / 6 + .5));
        rect('white', 0, 0, BBT, 12, .18); bevel(.6);
      });
      break;
    case 'tnt': // an original "boom box": a red crate with a lightning mark and a fuse (not the famous striped block)
      side = mk(() => {
        fill('red-2'); rr('red', 3, 3, 26, 26, 5); rr('red-1', 5, 5, 22, 3, 1.5, .5);
        const bolt = [[18, 5], [9, 17], [15, 17], [12, 27], [23, 13], [17, 13], [20, 5]];
        for (const [t, d] of [['yellow-2', 1], ['yellow', 0]]) {
          x.globalAlpha = 1; x.fillStyle = bbCol(t); x.beginPath(); bolt.forEach(([X, Y], i) => i ? x.lineTo(X + d, Y + d) : x.moveTo(X + d, Y + d)); x.fill();
        }
      });
      top = mk(() => {
        fill('red-2'); rr('red', 3, 3, 26, 26, 5); dot('cream', 16, 16, 6.5);
        line('ink-2', 2.6, [[16, 16], [19, 12], [16, 9], [20, 6]]); dot('yellow', 21, 5.5, 2.8); dot('orange', 21, 5.5, 1.3);
      });
      break;
    case 'lava':
      top = side = mk(() => {
        fill('orange-2');
        for (let i = 0; i < 8; i++) dot('orange', R(3, 29), R(3, 29), R(3.5, 6));
        for (let i = 0; i < 7; i++) dot('yellow', R(3, 29), R(3, 29), R(1.4, 2.6), .9);
        for (let i = 0; i < 4; i++) dot('red-2', R(3, 29), R(3, 29), 1.4, .5);
      });
      break;
    case 'lamp':
      top = side = mk(() => {
        fill('yellow-2');
        const g = x.createRadialGradient(16, 16, 2, 16, 16, 15);
        g.addColorStop(0, bbCol('yellow-1')); g.addColorStop(1, bbCol('yellow'));
        x.globalAlpha = 1; x.fillStyle = g; x.fillRect(3, 3, 26, 26);
        x.strokeStyle = bbCol('brown-2'); x.lineWidth = 3; x.strokeRect(1.5, 1.5, 29, 29);
        rect('brown-2', 15, 3, 2, 26, .45); rect('brown-2', 3, 15, 26, 2, .45);
      });
      break;
    case 'pumpkin':
      side = mk(() => {
        fill('orange');
        for (const X of [7, 15, 23]) rr('orange-2', X, 0, 2.6, BBT, 1.3, .7);
        for (const X of [3, 11, 19, 27]) rect('orange-1', X, 2, 1.6, 26, .5);
        bevel();
      });
      top = mk(() => { fill('orange'); dot('orange-2', 16, 16, 9, .35); rr('green-2', 13.5, 11, 5, 9, 2); ell('green', 22, 15, 4.5, 2.6); bevel(); });
      break;
    case 'cactus':
      side = mk(() => {
        fill('green');
        for (const X of [4, 12, 20, 28]) rr('green-2', X - 1.2, 0, 2.4, BBT, 1.2, .8);
        for (const X of [8, 16, 24]) rect('green-1', X - .8, 0, 1.6, BBT, .6);
        for (let i = 0; i < 8; i++) dot('cream-1', R(3, 29), R(3, 29), .9);
      });
      top = mk(() => { fill('green-2'); dot('green', 16, 16, 12); dot('green-1', 14, 14, 5, .8); dot('pink', 16, 16, 2.6); bevel(.6); });
      break;
    case 'obsidian':
      top = side = mk(() => {
        fill('purple-3');
        for (let i = 0; i < 7; i++) dot('ink-2', R(3, 29), R(3, 29), R(2.5, 5), .7);
        for (let i = 0; i < 5; i++) dot('purple-1', R(3, 29), R(3, 29), R(.8, 1.4), .9);
        bevel(.8);
      });
      break;
    case 'ice':
      top = side = mk(() => {
        fill('aqua-1', .8);
        line('white', 1.2, [[4, 6], [10, 12], [9, 18], [15, 24]], .8); line('white', 1.2, [[22, 4], [20, 12], [27, 17]], .7);
        rect('white', 5, 4, 7, 1.6, .6); x.globalAlpha = .9; x.strokeStyle = bbCol('white'); x.lineWidth = 2; x.strokeRect(1, 1, 30, 30);
      });
      break;
    case 'coral':
      top = side = mk(() => {
        fill('pink');
        for (let i = 0; i < 7; i++) dot('orange-1', R(4, 28), R(4, 28), R(2.5, 4.5), .8);
        for (let i = 0; i < 9; i++) dot('pink-2', R(3, 29), R(3, 29), R(.9, 1.6), .7);
        bevel();
      });
      break;
    case 'stripe':
      top = side = mk(() => { for (let i = 0; i < 4; i++) rect(i % 2 ? 'white' : 'blue', i * 8, 0, 8, BBT); rect('blue-2', 0, 0, BBT, 2, .4); bevel(); });
      break;
    case 'icebrick':
      top = side = mk(() => {
        fill('white');
        for (let row = 0; row < 4; row++) for (let c = -1; c < 3; c++) {
          const X = c * 16 + (row % 2) * 8 + 1, Y = row * 8 + 1;
          rr('aqua', X, Y, 14.5, 6.6, 2); rr('aqua-1', X, Y, 13.6, 5.8, 2); rect('white', X + 2, Y + 1, 8, 1.2, .7);
        }
        bevel(.6);
      });
      break;
    case 'roof':
      top = side = mk(() => {
        fill('red-2');
        for (const y of [0, 8, 16, 24]) for (let c = -1; c < 4; c++) { const X = c * 8 + (y % 16 ? 4 : 0); rr('red', X + .5, y, 7, 7.2, 3.4); rect('red-1', X + 2, y + 1, 3, 1.1, .6); }
        bevel();
      });
      break;
    case 'cloud':
      top = side = mk(() => {
        fill('white');
        for (let i = 0; i < 6; i++) dot('white-2', R(4, 28), R(8, 28), R(4, 6), .55);
        for (let i = 0; i < 5; i++) dot('white', R(4, 28), R(4, 24), R(3, 5));
        bevel(.4);
      });
      break;
    case 'crystal':
      top = side = mk(() => {
        fill('purple');
        for (const [a, b, c, t, al] of [[[0, 0], [16, 0], [0, 16], 'purple-1', .8], [[32, 32], [16, 32], [32, 16], 'purple-2', .7], [[16, 32], [0, 32], [0, 16], 'purple-1', .35]]) {
          x.globalAlpha = al; x.fillStyle = bbCol(t); x.beginPath(); x.moveTo(...a); x.lineTo(...b); x.lineTo(...c); x.fill();
        }
        dot('white', 10, 9, 1.8, .9); dot('pink-1', 22, 21, 1.4, .8);
        bevel(.6);
      });
      break;
    case 'starb':
      top = side = mk(() => {
        fill('yellow');
        x.globalAlpha = 1; x.beginPath();
        for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? 5 : 12; x.lineTo(16 + Math.cos(a) * q, 17 + Math.sin(a) * q); }
        x.closePath(); x.fillStyle = bbCol('orange'); x.fill();
        x.save(); x.translate(16, 17); x.scale(.7, .7); x.translate(-16, -17); x.fillStyle = bbCol('yellow-1'); x.fill(); x.restore();
        bevel(.7);
      });
      break;
    default: top = side = mk(() => { fill('grey'); bevel(); });
  }
  return (BBTEX[k] = { top, side });
}
// pre-shaded copies of a block's faces: t top, l left-facing side (light), r right-facing side (shade); n = night
const BBFACE = {};
function bbFaceImgs(v) {
  if (BBFACE[v]) return BBFACE[v];
  const T = bbTex(BLOCKS[v].k), o = {};
  const shade = (src, a, night) => {
    const c = bbCanvas(BBT), x = c.getContext('2d');
    x.drawImage(src, 0, 0);
    x.globalCompositeOperation = 'source-atop';
    if (a) { x.fillStyle = bbA('ink', a); x.fillRect(0, 0, BBT, BBT); }
    if (night) { x.fillStyle = bbA('purple-3', .38); x.fillRect(0, 0, BBT, BBT); }
    return c;
  };
  o.t = shade(T.top, 0); o.l = shade(T.side, .1); o.r = shade(T.side, .26);
  o.tn = shade(T.top, .2, 1); o.ln = shade(T.side, .32, 1); o.rn = shade(T.side, .45, 1);
  return (BBFACE[v] = o);
}
// a block's flat colours (for the quick drawing while the view turns, particles, previews): top, left, right
const BBFLAT = {};
function bbFlat3(v) {
  if (BBFLAT[v]) return BBFLAT[v];
  const avg = img => {
    let c = [128, 128, 128];
    try {
      const d = img.getContext('2d').getImageData(0, 0, BBT, BBT).data, s = [0, 0, 0];
      let n = 0;
      for (let i = 0; i < d.length; i += 4) if (d[i + 3] > 40) { s[0] += d[i]; s[1] += d[i + 1]; s[2] += d[i + 2]; n++; }
      if (n) c = s.map(q => Math.round(q / n));
    } catch (e) {}
    return c;
  };
  let t = [128, 128, 128], sd = t;
  try { const T = bbTex(BLOCKS[v].k); t = avg(T.top); sd = avg(T.side); } catch (e) {}
  const al = ['glass', 'water', 'ice'].includes(BLOCKS[v].k) ? .6 : 1;
  const f = (c, m) => 'rgba(' + c.map(q => Math.round(q * m)).join(',') + ',' + al + ')';
  return (BBFLAT[v] = [f(t, 1), f(sd, .9), f(sd, .74), t]);
}

/* ---- small pictures standing on a cell: flower, mushroom and the child's drawn pet (R-02 #28: not the emoji) ---- */
const BBSPR = {};
let BBPETIMG = null;
function bbPetImg(redraw) {
  if (BBPETIMG && BBPETIMG.st == stage(S.stars) && BBPETIMG.kind == S.pet) {
    if (!BBPETIMG.img && redraw) BBPETIMG.wait.push(redraw); // still loading: draw again when it is ready
    return BBPETIMG.img;
  }
  try {
    // the pet rig colours are CSS roles (var(--pc-*)): resolve them on a hidden copy, then make an image of the result
    const host = document.createElement('div');
    host.style.cssText = 'position:absolute;left:-9999px;top:0;width:200px;height:200px;pointer-events:none';
    host.innerHTML = petSVG(S.pet, stage(S.stars), 'happy');
    document.body.appendChild(host);
    const svg = host.querySelector('svg');
    for (const el of svg.querySelectorAll('*')) {
      const cs = getComputedStyle(el);
      if (el.getAttribute('fill') && el.getAttribute('fill') != 'none') el.setAttribute('fill', cs.fill);
      if (el.getAttribute('stroke') && el.getAttribute('stroke') != 'none') el.setAttribute('stroke', cs.stroke);
    }
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', '200');
    svg.setAttribute('height', '200');
    const src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.outerHTML);
    host.remove();
    const img = new Image();
    const me = BBPETIMG = { img: null, st: stage(S.stars), kind: S.pet, wait: redraw ? [redraw] : [] };
    img.onload = () => { me.img = img; for (const f of me.wait.splice(0)) try { f(); } catch (e) {} };
    img.src = src;
  } catch (e) { BBPETIMG = { img: null, st: stage(S.stars), kind: S.pet, wait: [] }; }
  return null;
}
function bbSprite(k) {
  if (BBSPR[k]) return BBSPR[k];
  const c = bbCanvas(64), x = c.getContext('2d');
  const dot = (t, X, Y, R, a = 1) => { x.globalAlpha = a; x.fillStyle = bbCol(t); x.beginPath(); x.arc(X, Y, R, 0, 7); x.fill(); };
  const ell = (t, X, Y, rx, ry, a = 1, rot = 0) => { x.globalAlpha = a; x.fillStyle = bbCol(t); x.beginPath(); x.ellipse(X, Y, rx, ry, rot, 0, 7); x.fill(); };
  ell('ink', 32, 60, 14, 3.5, .14);
  if (k == 'flower') {
    x.globalAlpha = 1; x.strokeStyle = bbCol('green-2'); x.lineWidth = 4; x.lineCap = 'round';
    x.beginPath(); x.moveTo(32, 60); x.quadraticCurveTo(30, 44, 32, 30); x.stroke();
    ell('green', 24, 48, 7, 3.5, 1, -.5); ell('green', 40, 44, 7, 3.5, 1, .5);
    for (let i = 0; i < 5; i++) { const a = i * Math.PI * 2 / 5 - Math.PI / 2; dot('pink-2', 33 + Math.cos(a) * 9, 23 + Math.sin(a) * 9, 7.5); dot('pink', 32 + Math.cos(a) * 9, 22 + Math.sin(a) * 9, 7); }
    dot('yellow-2', 33, 23, 5.5); dot('yellow', 32, 22, 4.6); dot('white', 30, 20, 1.6, .7);
  } else if (k == 'mush') {
    x.globalAlpha = 1; x.fillStyle = bbCol('cream-2'); bbRR(x, 24, 34, 17, 25, 7); x.fill();
    x.fillStyle = bbCol('cream'); bbRR(x, 23, 34, 14, 24, 6); x.fill();
    for (const [t, d] of [['red-2', 1.5], ['red', 0]]) { x.fillStyle = bbCol(t); x.beginPath(); x.ellipse(32 + d, 34 + d, 24, 20, 0, Math.PI, 0); x.closePath(); x.fill(); }
    dot('white', 22, 26, 4); dot('white', 36, 20, 3.6); dot('white', 45, 29, 3); ell('white', 25, 18, 5, 2.5, .45, -.5);
  } else if (k == 'shell') { // a scallop shell: a fan of ribs
    for (let i = 0; i < 7; i++) { const a = -Math.PI + (i + .5) * Math.PI / 7; ell(i % 2 ? 'pink-1' : 'pink', 32 + Math.cos(a) * 11, 52 + Math.sin(a) * 11, 6, 13, 1, a + Math.PI / 2); }
    ell('pink-2', 32, 54, 7, 4); dot('white', 26, 38, 2.2, .7);
  } else if (k == 'pine') { // a pine tree: a trunk and three tiers
    x.globalAlpha = 1; x.fillStyle = bbCol('brown-2'); x.fillRect(29, 46, 7, 14);
    for (const [y, w, t] of [[48, 22, 'green-2'], [38, 18, 'green-2'], [28, 13, 'green-2'], [46, 19, 'green'], [36, 15, 'green'], [26, 11, 'green']]) {
      x.fillStyle = bbCol(t); x.beginPath(); x.moveTo(32, y - 22); x.lineTo(32 + w, y); x.lineTo(32 - w, y); x.closePath(); x.fill();
    }
    dot('white', 27, 22, 2, .6);
  } else if (k == 'flag') { // a flag on a pole
    x.globalAlpha = 1; x.fillStyle = bbCol('grey-2'); x.fillRect(22, 8, 4, 52); dot('yellow', 24, 8, 4);
    x.fillStyle = bbCol('red-2'); x.beginPath(); x.moveTo(26, 13); x.lineTo(54, 21); x.lineTo(26, 31); x.closePath(); x.fill();
    x.fillStyle = bbCol('red'); x.beginPath(); x.moveTo(26, 12); x.lineTo(52, 19); x.lineTo(26, 28); x.closePath(); x.fill();
    dot('yellow-1', 34, 20, 2.6);
  }
  x.globalAlpha = 1;
  return (BBSPR[k] = c);
}

/* ---- worlds ---- */
// S.bb, with defaults filled in place (the same object every time, so a screen may keep it)
function bbS() {
  if (!S.bb || typeof S.bb != 'object' || Array.isArray(S.bb)) S.bb = { worlds: [], cur: 0 };
  const b = S.bb;
  if (!Array.isArray(b.worlds)) b.worlds = [];
  if (b.worlds.some(w => !w || typeof w.d != 'string')) b.worlds = b.worlds.filter(w => w && typeof w.d == 'string');
  if (!b.worlds.length) b.worlds.push({ name: 'My Island', d: bbEncode(bbGen('island', 7)) });
  if (!(b.cur >= 0 && b.cur < b.worlds.length)) b.cur = 0;
  return b;
}
function bbGen(type, seed) {
  const r = rng(seed * 31 + 5), w = new Uint8Array(BW * BD * BH), p = [r() * 6, r() * 6, r() * 6, r() * 6];
  const set = (x, y, z, v) => { if (x >= 0 && y >= 0 && x < BW && y < BD && z >= 0 && z < BH) w[bbI(x, y, z)] = v; };
  if (type == 'flat') { for (let x = 0; x < BW; x++) for (let y = 0; y < BD; y++) w[bbI(x, y, 0)] = 1; return w; }
  if (type == 'sky') { // G-01b: floating islands over the clouds
    for (const [cx, cy, z0, rr] of [[5, 6, 3, 3.4], [11.5, 10.5, 5, 2.8], [11, 3.5, 1, 2.2], [3.5, 12, 0, 1.8]]) {
      for (let x = 0; x < BW; x++) for (let y = 0; y < BD; y++) {
        const d = Math.hypot(x - cx, y - cy) / rr;
        if (d > 1) continue;
        const deep = Math.round((1 - d) * 2.4);
        for (let z = z0 - deep; z <= z0; z++) set(x, y, z, z == z0 ? 1 : z == z0 - deep && deep > 1 ? 3 : 2);
        if (d < .5 && r() < .12) set(x, y, z0 + 1, r() < .5 ? 17 : 18);
      }
    }
    for (let n = 0; n < 14; n++) { const x = Math.floor(r() * BW), y = Math.floor(r() * BD); if (!w[bbI(x, y, 0)] && !w[bbI(x, y, 1)]) { set(x, y, 0, 33); if (r() < .5) set(x + 1, y, 0, 33); } }
    return w;
  }
  const H = (x, y) => Math.sin(x * .45 + p[0]) * 1.2 + Math.sin(y * .38 + p[1]) * 1.2 + Math.sin((x + y) * .25 + p[2]) * 1.5 + Math.sin((x - y) * .6 + p[3]) * .6;
  for (let x = 0; x < BW; x++) for (let y = 0; y < BD; y++) {
    const dc = Math.hypot(x - 7.5, y - 7.5) / 8;
    let h;
    if (type == 'island') h = Math.round(2.6 + H(x, y) * .8 - dc * dc * 4.2);
    else if (type == 'beach') h = Math.round(1.9 + H(x, y) * .5 - dc * dc * 3.4 + (x - 7.5) * -.12);
    else if (type == 'mountain' || type == 'snow') h = Math.round(3 + H(x, y) * 1.4 + (1 - dc) * 5.5 - (type == 'snow' ? 1 : 0));
    else h = Math.round(1.6 + H(x, y) * .6);
    if ((type == 'island' || type == 'beach') && h < 1) { set(x, y, 0, 10); continue; }
    h = Math.max(1, Math.min(BH - 3, h));
    for (let z = 0; z < h; z++) {
      const top = z == h - 1;
      let v;
      if (type == 'desert' || type == 'beach') v = z < h - 2 ? 3 : 9;
      else if (type == 'snow') v = top ? 11 : z < h - 3 ? 3 : 2;
      else if (type == 'mountain') v = top ? (z >= 7 ? 11 : z >= 5 ? 3 : 1) : (z < h - 3 ? 3 : 2);
      else v = top ? (h <= 2 && dc > .55 ? 9 : 1) : (z < h - 2 ? 3 : 2);
      set(x, y, z, v);
    }
    const T = h;
    if (type == 'island' && w[bbI(x, y, T - 1)] == 1 && r() < .07 && x > 1 && y > 1 && x < BW - 2 && y < BD - 2) {
      for (let z = T; z < T + 3; z++) set(x, y, z, 5);
      for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (let z = T + 2; z < T + 4; z++) {
        if (!(a == 0 && b == 0 && z == T + 2) && !(Math.abs(a) + Math.abs(b) == 2 && z == T + 3)) set(x + a, y + b, z, 6);
      }
    } else if (type == 'island' && w[bbI(x, y, T - 1)] == 1 && r() < .06) set(x, y, T, r() < .6 ? 17 : 18);
    else if (type == 'desert' && r() < .045) { const n = 2 + Math.floor(r() * 2); for (let z = T; z < T + n; z++) set(x, y, z, 24); }
    else if (type == 'mountain' && w[bbI(x, y, T - 1)] == 1 && r() < .08) { set(x, y, T, 5); set(x, y, T + 1, 6); set(x, y, T + 2, 6); }
    else if (type == 'snow' && r() < .07) set(x, y, T, 32);
    else if (type == 'beach' && r() < .035 && x > 1 && y > 1 && x < BW - 2 && y < BD - 2) { // a palm: a trunk and a leafy top
      for (let z = T; z < T + 3; z++) set(x, y, z, 5);
      for (const [a, b] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) set(x + a, y + b, T + 3, 6);
    } else if (type == 'beach' && h <= 2 && r() < .05) set(x, y, T, 29);
  }
  if (type == 'desert') { for (let x = 1; x < 5; x++) for (let y = 10; y < 14; y++) if (Math.max(Math.abs(x - 2.5), Math.abs(y - 11.5)) < 2) set(x, y, 1, 10); }
  return w;
}
// G-01b: the ground of a chapter's blueprints: meadow grass, a beach with the sea in front, snow, or a small sky island
function bbBase(g) {
  const w = new Uint8Array(BW * BD * BH);
  for (let x = 0; x < BW; x++) for (let y = 0; y < BD; y++) {
    const i = bbI(x, y, 0);
    if (g == 'beach') w[i] = x >= 13 || y >= 13 ? 10 : 9;
    else if (g == 'snow') w[i] = 11;
    else if (g == 'sky') { if (Math.hypot(x - 7.5, y - 7.5) < 6.6) w[i] = 1; }
    else w[i] = 1;
  }
  return w;
}
function bbFlat() {
  const w = new Uint8Array(BW * BD * BH);
  for (let x = 0; x < BW; x++) for (let y = 0; y < BD; y++) w[bbI(x, y, 0)] = 1;
  return w;
}
const bbEncode = w => { let s = ''; for (let i = 0; i < w.length; i += 4096) s += String.fromCharCode(...w.subarray(i, i + 4096)); return btoa(s); };
// a saved world: 16 x 16 x 14 bytes, or the oldest 12 x 12 x 10 worlds (put in the middle of a sea)
const bbDecode = s => {
  try {
    const b = atob(s), w = new Uint8Array(BW * BD * BH);
    if (b.length == 1440) {
      for (let x = 0; x < BW; x++) for (let y = 0; y < BD; y++) w[bbI(x, y, 0)] = 10;
      for (let z = 0; z < 10; z++) for (let y = 0; y < 12; y++) for (let x = 0; x < 12; x++) {
        const v = b.charCodeAt((z * 12 + y) * 12 + x);
        if (v || z == 0) w[bbI(x + 2, y + 2, z)] = v;
      }
      return w;
    }
    for (let i = 0; i < Math.min(b.length, w.length); i++) { const v = b.charCodeAt(i); w[i] = v < BLOCKS.length ? v : 0; }
    return w;
  } catch (e) { return bbGen('island', 1); }
};

let BB = null;
// stamps: offsets from the tapped cell (the view's turn is applied so a stamp faces the child)
const BBSTAMPS = (() => {
  const L = [];
  // ch: the journey chapter that opens the stamp (G-01b); none = open from the start
  const add = (n, f, ch) => { const c = []; f((x, y, z, v) => c.push([x, y, z, v])); L.push({ n, c, ch }); };
  add('Tree', p => { for (let z = 0; z < 4; z++) p(0, 0, z, 5); for (let x = -2; x <= 2; x++) for (let y = -2; y <= 2; y++) for (let z = 3; z <= 4; z++) if (!(Math.abs(x) == 2 && Math.abs(y) == 2) && !(x == 0 && y == 0 && z == 3)) p(x, y, z, 6); for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) if (!(x && y)) p(x, y, 5, 6); });
  add('House', p => { for (let x = -2; x <= 2; x++) for (let y = -2; y <= 2; y++) { const edge = Math.abs(x) == 2 || Math.abs(y) == 2; if (edge) for (let z = 0; z < 3; z++) { if (x == 0 && y == 2 && z < 2) continue; p(x, y, z, z == 1 && ((Math.abs(x) == 2 && y == 0) || (x == 0 && y == -2) || (Math.abs(x) == 1 && y == 2)) ? 7 : 4); } p(x, y, 3, 8); } for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) p(x, y, 4, 8); p(0, 0, 5, 8); p(0, 0, 0, 22); });
  add('Tower', p => { for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) { if (!x && !y) continue; for (let z = 0; z < 6; z++) p(x, y, z, z == 3 && (!x || !y) ? 7 : 3); if (x && y) p(x, y, 6, 3); } p(0, 0, 5, 14); });
  add('Pool', p => { for (let x = -2; x <= 2; x++) for (let y = -2; y <= 2; y++) p(x, y, 0, Math.abs(x) == 2 || Math.abs(y) == 2 ? 3 : 10); });
  add('Car', p => { for (let x = -2; x <= 1; x++) for (let y = 0; y <= 1; y++) { p(x, y, 1, 12); if (x == -2 || x == 1) p(x, y, 0, 25); } p(-1, 0, 2, 7); p(0, 0, 2, 7); p(-1, 1, 2, 7); p(0, 1, 2, 7); p(2, 0, 1, 22); p(2, 1, 1, 22); });
  add('Rocket', p => { for (let z = 0; z < 6; z++) p(0, 0, z, z == 4 ? 7 : 11); p(0, 0, 6, 12); p(0, 0, 7, 12); for (const [x, y] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (let z = 0; z < 2; z++) p(x, y, z, 13); });
  add('Snowman', p => { for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) p(x, y, 0, 11); for (const [x, y] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) p(x, y, 1, 11); p(0, 0, 2, 11); p(0, 0, 3, 23); p(0, 0, 4, 13); });
  add('Pyramid', p => { for (let k = 0; k < 3; k++) for (let x = -3 + k; x <= 3 - k; x++) for (let y = -3 + k; y <= 3 - k; y++) p(x, y, k, 9); p(0, 0, 3, 14); });
  add('Lamp Post', p => { for (let z = 0; z < 4; z++) p(0, 0, z, 25); p(0, 0, 4, 22); });
  add('Volcano', p => { for (let k = 0; k < 3; k++) for (let x = -3 + k; x <= 3 - k; x++) for (let y = -3 + k; y <= 3 - k; y++) p(x, y, k, k == 2 && !x && !y ? 21 : k < 1 ? 3 : 25); p(0, 0, 3, 21); });
  add('Bridge', p => { for (let x = -3; x <= 3; x++) { const z = 3 - Math.min(3, Math.abs(x)); p(x, 0, z, 4); p(x, 1, z, 4); p(x, -1, z + 1, 5); p(x, 2, z + 1, 5); } });
  add('Flowers', p => { for (const [x, y] of [[0, 0], [1, 1], [-1, 1], [2, -1], [-2, 0], [1, -2], [-1, -1]]) p(x, y, 0, (x + y) % 2 ? 17 : 18); });
  add('Palm Tree', p => { for (let z = 0; z < 4; z++) p(0, 0, z, 5); for (const [x, y] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [2, 0], [-2, 0], [0, 2], [0, -2]]) p(x, y, 4, 6); p(0, 0, 5, 6); }, 1);
  add('Beach Hut', p => { for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) { if (x || y) for (let z = 0; z < 2; z++) { if (x == 0 && y == 1) continue; p(x, y, z, 28); } p(x, y, 2, 31); } p(0, 0, 3, 31); }, 1);
  add('Igloo', p => { for (let x = -2; x <= 2; x++) for (let y = -2; y <= 2; y++) { const d = Math.max(Math.abs(x), Math.abs(y)); if (d == 2 && Math.abs(x) + Math.abs(y) < 4 && !(x == 0 && y == 2)) { p(x, y, 0, 30); p(x, y, 1, 30); } if (d == 1) p(x, y, 2, 30); } p(0, 0, 3, 30); p(0, 2, 1, 30); }, 2);
  add('Snow Pine', p => { p(0, 0, 0, 11); p(0, 0, 1, 32); p(1, 1, 0, 11); p(1, 1, 1, 32); p(-1, 1, 0, 11); p(-1, 1, 1, 32); }, 2);
  add('Cloud', p => { for (let x = -2; x <= 2; x++) for (let y = -1; y <= 1; y++) if (Math.abs(x) + Math.abs(y) < 3) p(x, y, 0, 33); for (let x = -1; x <= 1; x++) p(x, 0, 1, 33); }, 3);
  add('Crystal Spire', p => { for (let z = 0; z < 5; z++) p(0, 0, z, 34); for (const [x, y] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { p(x, y, 0, 34); p(x, y, 1, 34); } p(0, 0, 5, 35); }, 3);
  return L;
})();

/* ---- blueprints (G-01, G-01b): saved by id (S.bb.bp); old: the index in the oldest list (S.bb.ch) ----
   m, the kind of challenge: copy (the see-through build, one layer at a time; the default), count ("4 wide and 2 tall": nothing
   is shown, any spot, any way round), pat (the next layer is see-through but white: continue the colour pattern; pre = how many
   blocks of it are there already), pic (build it from a picture: no see-through blocks), fix (the build is there with blocks
   missing: find the holes; fx = the missing cells). New builds are short strings (bbStr): layers by |, rows by /, a letter a block. */
const BB_LM = { s: 3, p: 4, l: 5, v: 6, g: 7, b: 8, a: 9, w: 10, n: 11, k: 12, u: 13, o: 14, d: 15, r: 16, m: 22, c: 27, t: 28, i: 30, f: 31, q: 33, x: 34, y: 35, z: 2 };
const bbStr = (s, ox = 0, oy = 0) => {
  const o = [];
  s.split('|').forEach((L, z) => L.split('/').forEach((row, y) => [...row].forEach((ch, x) => { if (BB_LM[ch]) o.push([ox + x, oy + y, z + 1, BB_LM[ch]]); })));
  return o;
};
const bbS2 = (s, ox, oy) => () => bbStr(s, ox, oy);
const BBP = [
  // chapter 1, Meadow Village
  { id: 'tower', n: 'Stone Tower', old: 0, c: () => [1, 2, 3].map(z => [6, 6, z, 3]) },
  { id: 'stairs', n: 'Stairs', c: () => { const o = []; for (let x = 5; x <= 7; x++) for (let z = 1; z <= 8 - x; z++) o.push([x, 6, z, 4]); return o; } },
  { id: 'wall', n: 'Brick Wall', old: 1, m: 'count', c: () => { const o = []; for (let x = 4; x <= 7; x++) for (let z = 1; z <= 2; z++) o.push([x, 6, z, 8]); return o; } },
  { id: 'gate', n: 'Garden Gate', c: () => { const o = []; for (const x of [5, 8]) for (let z = 1; z <= 3; z++) o.push([x, 6, z, 3]); for (let x = 5; x <= 8; x++) o.push([x, 6, 4, 4]); return o; } },
  { id: 'tree', n: 'Tree', old: 2, c: () => { const o = [[6, 6, 1, 5], [6, 6, 2, 5], [6, 6, 3, 5], [6, 6, 5, 6]]; for (let x = 5; x <= 7; x++) for (let y = 5; y <= 7; y++) o.push([x, y, 4, 6]); return o; } },
  { id: 'bridge', n: 'Rainbow Bridge', old: 5, c: () => [[3, 6, 1, 12], [4, 6, 2, 12], [5, 6, 3, 12], [6, 6, 3, 12], [7, 6, 3, 12], [8, 6, 2, 12], [9, 6, 1, 12], [4, 6, 1, 13], [5, 6, 2, 13], [7, 6, 2, 13], [8, 6, 1, 13], [6, 6, 1, 10], [5, 6, 1, 10], [7, 6, 1, 10]] },
  // chapter 2, Sunny Beach
  { id: 'pond', n: 'Pond', old: 3, c: () => { const o = []; for (let x = 4; x <= 7; x++) for (let y = 4; y <= 7; y++) o.push([x, y, 1, x > 4 && x < 7 && y > 4 && y < 7 ? 10 : 9]); return o; } },
  { id: 'snowman', n: 'Sand Snowman', old: 4, c: () => { const o = []; for (let x = 5; x <= 7; x++) for (let y = 5; y <= 7; y++) o.push([x, y, 1, 9]); for (const [x, y] of [[6, 6], [5, 6], [7, 6], [6, 5], [6, 7]]) o.push([x, y, 2, 9]); o.push([6, 6, 3, 9], [6, 6, 4, 13]); return o; } },
  { id: 'boat', n: 'Sail Boat', c: () => { const o = []; for (let x = 4; x <= 8; x++) o.push([x, 6, 1, 4]); for (let x = 5; x <= 7; x++) o.push([x, 5, 1, 4], [x, 7, 1, 4]); o.push([4, 6, 2, 4], [8, 6, 2, 4]); for (let z = 2; z <= 4; z++) o.push([6, 6, z, 5]); o.push([7, 6, 3, 12], [7, 6, 4, 12], [6, 6, 5, 13]); return o; } },
  { id: 'stripes', n: 'Stripy Beach Wall', m: 'pat', pre: 3, c: bbS2('ctctctc|ctctctc|ctctctc', 3, 6) },
  { id: 'castle', n: 'Castle Tower', old: 7, m: 'fix', fx: '7,6,1;6,7,2;7,7,3;5,7,2;7,5,4', c: () => { const o = []; for (let x = 5; x <= 7; x++) for (let y = 5; y <= 7; y++) { if (x == 6 && y == 6) continue; for (let z = 1; z <= 3; z++) o.push([x, y, z, 3]); if ((x + y) % 2 == 0) o.push([x, y, 4, 3]); } o.push([6, 6, 1, 14]); return o; } },
  { id: 'house', n: 'Little House', old: 6, c: () => { const o = []; for (let x = 5; x <= 7; x++) for (let y = 5; y <= 7; y++) { if (x == 6 && y == 6) continue; for (let z = 1; z <= 2; z++) { if (x == 6 && y == 7 && z == 1) continue; o.push([x, y, z, x == 5 && y == 6 && z == 2 || x == 7 && y == 6 && z == 2 ? 7 : 4]); } } for (let x = 4; x <= 8; x++) for (let y = 5; y <= 7; y++) o.push([x, y, 3, 8]); return o; } },
  // chapter 3, Snowy Peaks
  { id: 'snowwall', n: 'Ice Wall', m: 'count', c: bbS2('iiiii|iiiii|iiiii|iiiii', 4, 6) },
  { id: 'lodge', n: 'Log Cabin Layers', m: 'pat', pre: 16, c: bbS2('lll/l.l/lll|ppp/p.p/ppp|lll/l.l/lll|ppp/p.p/ppp', 5, 5) },
  { id: 'igloo', n: 'Igloo', c: bbS2('.iii./i...i/i...i/i...i/.i.i.|.iii./i...i/i...i/i...i/.iii.|...../.iii./.i.i./.iii./.....|...../...../..i../...../.....', 4, 4) },
  { id: 'cabin', n: 'Snowy Cabin', m: 'fix', fx: '7,6,1;5,7,2;7,5,2;6,6,3;4,6,4', c: bbS2('pppp/p..p/pp.p|pppp/p..g/pg.p|ffff/ffff/ffff|..../ffff/....', 4, 5) },
  { id: 'pyramid', n: 'Ice Pyramid', old: 8, m: 'pic', c: () => { const o = []; for (let x = 4; x <= 8; x++) for (let y = 4; y <= 8; y++) o.push([x, y, 1, 30]); for (let x = 5; x <= 7; x++) for (let y = 5; y <= 7; y++) o.push([x, y, 2, 30]); o.push([6, 6, 3, 14]); return o; } },
  { id: 'palace', n: 'Diamond Palace', old: 9, c: () => { const o = []; for (let x = 3; x <= 8; x++) for (let y = 3; y <= 8; y++) { const edge = x == 3 || x == 8 || y == 3 || y == 8; if (!edge) continue; const corner = (x == 3 || x == 8) && (y == 3 || y == 8); for (let z = 1; z <= (corner ? 4 : 2); z++) o.push([x, y, z, corner ? 3 : (z == 2 && (x == 5 || x == 6 || y == 5 || y == 6) ? 7 : 8)]); } for (let z = 1; z <= 3; z++) o.push([5, 5, z, 15]); o.push([5, 5, 4, 16]); return o; } },
  // chapter 4, Sky Islands
  { id: 'cloudfloor', n: 'Cloud Floor', m: 'count', c: bbS2('qqqq/qqqq/qqqq', 4, 5) },
  { id: 'starstairs', n: 'Star Stairs', m: 'pic', c: () => { const o = []; for (let k = 0; k < 8; k++) { const [x, y] = [[1, 0], [2, 1], [1, 2], [0, 1]][k % 4]; o.push([5 + x, 5 + y, k + 1, 4], [6, 6, k + 1, 34]); } o.push([6, 6, 9, 35]); return o; } },
  { id: 'arch', n: 'Cloud Arch', c: bbS2('q...q/q...q|q...q/q...q|qq.qq/qq.qq|xxxxx/xxxxx', 4, 6) },
  { id: 'rtower', n: 'Rainbow Tower', m: 'pat', pre: 12, c: bbS2('kk/kk|uu/uu|cc/cc|kk/kk|uu/uu|cc/cc|kk/kk', 5, 5) },
  { id: 'skyship', n: 'Sky Ship', m: 'fix', fx: '3,5,2;9,6,2;6,6,3;4,6,4;6,7,1', c: bbS2('.ppppp./ppppppp/.ppppp.|ppppppp/p..l..p/ppppppp|......./...l.../.......|......./.qqlqq./.......|......./..qlq../.......|......./...x.../.......', 3, 5) },
  { id: 'skycastle', n: 'Sky Castle', c: bbS2('sssss/s...s/s...s/s...s/ss.ss|sgsgs/s...s/g...g/s...s/sg.gs|sssss/s...s/s...s/s...s/sssss|x.x.x/...../x...x/...../x.x.x|y...y/...../...../...../y...y', 4, 4) },
];
const BB_OLD = BBP.filter(b => b.old != null).sort((a, b) => a.old - b.old).map(b => b.id); // the old list's order (S.bb.ch)
const bbGoal = bp => new Map(bp.c().map(([a, b, z, v]) => [bbI(a + 2, b + 2, z), v]));
// the chapters of the journey (6 builds each, in BBP order): ground, sky, the block set a chapter opens, the prize its trophy gives,
// the free-build world it opens. A chapter opens with 4 builds done in the one before (or any build of its own done: old saves).
const BB_CHS = [
  { id: 'meadow', n: 'Meadow Village', g: 'grass', sky: ['sky', 'sky-1'], set: [], prize: 36, world: 'island', ico: 'home' },
  { id: 'beach', n: 'Sunny Beach', g: 'beach', sky: ['sun', 'sky-1'], set: [27, 28], prize: 29, world: 'beach', ico: 'wave' },
  { id: 'snow', n: 'Snowy Peaks', g: 'snow', sky: ['lilac', 'sky-1'], set: [30, 31], prize: 32, world: 'snow', ico: 'sparkle' },
  { id: 'sky', n: 'Sky Islands', g: 'sky', sky: ['peach', 'candy'], set: [33, 34], prize: 35, world: 'sky', ico: 'rocket' },
];
const BB_PER = 6, BB_OPEN_AT = 4;
BB_CHS.forEach((c, k) => { c.bps = BBP.slice(k * BB_PER, k * BB_PER + BB_PER).map(b => b.id); });
const bbChOf = i => Math.floor(i / BB_PER);
const BB_MODES = { copy: ['Copy', 'blocks'], count: ['Count', 'skill-count'], pat: ['Pattern', 'skill-pattern'], pic: ['Picture', 'image'], fix: ['Fix it', 'hint'] };
const bbMode = bp => bp.m || 'copy';
// the cells of a fix build that are missing at the start (as goal indices)
const bbFixMiss = bp => new Set((bp.fx || '').split(';').filter(Boolean).map(t => { const [a, b, z] = t.split(',').map(Number); return bbI(a + 2, b + 2, z); }));
// a count build: its size, any way round (w along x, d along y, h up), and how to say it
function bbDims(goal) {
  let b = null;
  for (const i of goal.keys()) {
    const x = i % BW, y = Math.floor(i / BW) % BD, z = Math.floor(i / (BW * BD));
    b = b ? [Math.min(b[0], x), Math.min(b[1], y), Math.min(b[2], z), Math.max(b[3], x), Math.max(b[4], y), Math.max(b[5], z)] : [x, y, z, x, y, z];
  }
  return { w: b[3] - b[0] + 1, d: b[4] - b[1] + 1, h: b[5] - b[2] + 1 };
}
// the size of what the child built so far (x, y, z), said the same way as the size asked
const bbBoxSay = (a, b, c, D) => D.h == 1 ? `${Math.max(a, b)} wide and ${Math.min(a, b)} deep` : D.d == 1 && Math.min(a, b) == 1 ? `${Math.max(a, b)} wide and ${c} tall` : `${a} wide, ${b} deep and ${c} tall`;
const bbDimsSay = ({ w, d, h }) => h == 1 ? `${w} wide and ${d} deep` : d == 1 ? `${w} wide and ${h} tall` : `${w} wide, ${d} deep and ${h} tall`;
// what the child is asked to do in a build
function bbTask(bp) {
  const m = bbMode(bp), g = bbGoal(bp), kinds = [...new Set(g.values())].map(v => BLOCKS[v].n);
  if (m == 'count') return `Build it ${bbDimsSay(bbDims(g))}. Count as you go!`;
  if (m == 'pat') return 'Look at the colours. Which block comes next?';
  if (m == 'pic') return 'Build what the picture shows. There are no see-through blocks!';
  if (m == 'fix') return `${bbFixMiss(bp).size} blocks are missing. Find the holes and fix it.`;
  return kinds.length == 1 ? `Copy the see-through blocks with ${kinds[0]}.` : 'Copy the see-through blocks, one layer at a time.';
}
// a blueprint's chapter (the build of the day: the chapter of its ground), and the world it starts from: the chapter's ground, with
// the first blocks of a pattern, or the whole build but its holes for a fix
const bbChapOf = bp => bp.id == 'day' ? BB_CHS.find(c => c.g == bp.g) : BB_CHS[bbChOf(BBP.indexOf(bp))];
function bbStart(bp) {
  const w = bbBase(bbChapOf(bp).g), m = bbMode(bp);
  if (m == 'pat') for (const [a, b, z, v] of bp.c().slice(0, bp.pre)) w[bbI(a + 2, b + 2, z)] = v;
  if (m == 'fix') { const miss = bbFixMiss(bp); for (const [i, v] of bbGoal(bp)) if (!miss.has(i)) w[i] = v; }
  return w;
}
// blueprint stars by id; made once from the old index array (S.bb.ch), which is kept
function bbBP() {
  const b = bbS();
  if (!b.bp || typeof b.bp != 'object' || Array.isArray(b.bp)) {
    b.bp = {};
    (Array.isArray(b.ch) ? b.ch : []).forEach((s, i) => { const id = BB_OLD[i]; if (id && s > 0) b.bp[id] = Math.min(3, Math.max(b.bp[id] || 0, s | 0)); });
  }
  return b.bp;
}
const bbStars = i => { const s = bbBP()[BBP[i].id]; return s > 0 ? Math.min(3, s | 0) : 0; };
const bbChDone = k => BB_CHS[k].bps.filter(id => bbBP()[id] > 0).length;
// a chapter is open when it is the first, when 4 builds of the one before are done, or when one of its own builds is done (old saves)
const bbChOpen = k => k <= 0 || bbChDone(k - 1) >= BB_OPEN_AT || bbChDone(k) > 0;
const bbTrophy = k => bbChDone(k) >= BB_PER; // every build of the chapter done: its trophy and its prize
// a blueprint is open when its chapter is open and it is the chapter's first, or one before it (or itself, or a later one in the
// chapter) has stars: nothing done ever locks again
function bbOpen(i) {
  const k = bbChOf(i), f = k * BB_PER;
  if (!bbChOpen(k)) return false;
  if (i <= f) return true;
  for (let j = i - 1; j < f + BB_PER; j++) if (bbStars(j) > 0) return true;
  return false;
}
// a block of a chapter's set or a prize that is not open yet: {k, why, short}; null = open (or locked by learning stars only)
function bbBlockLock(v) {
  for (let k = 0; k < BB_CHS.length; k++) {
    const c = BB_CHS[k];
    if (c.set.includes(v) && !bbChOpen(k)) return { k, why: `Open ${c.n} in the blueprints to unlock it.`, short: c.n.split(' ').pop() };
    if (c.prize == v && !bbTrophy(k)) return { k, why: `Build all of ${c.n} to win it.`, short: 'Prize' };
  }
  return null;
}
const bbStampOk = st => st.ch == null || bbChOpen(st.ch);
function bbHubLine() {
  const n = BBP.filter((b, i) => bbStars(i) > 0).length;
  return `<span>Build your own 3D world</span><span>${ico('blocks', 18)}<b>${n} of ${BBP.length}</b> blueprints</span>`;
}

/* ---- the build of the day (G-01b): made from the date, the same all day, another one tomorrow ---- */
function bbHash(s) { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0) % 2147483646 + 1; }
function bbDaily(key) {
  const r = rng(bbHash('bb' + key)), ri = (a, b) => a + Math.floor(r() * (b - a + 1)), pk = a => a[Math.floor(r() * a.length)];
  const mats = [[3, 'Stone'], [8, 'Brick'], [4, 'Wood'], [12, 'Pink'], [13, 'Blue'], [30, 'Ice'], [33, 'Cloud'], [9, 'Sand']];
  const kind = ri(0, 5), [v, vn] = pk(mats), g = pk(['grass', 'beach', 'snow', 'sky']);
  const o = [];
  let bp;
  if (kind == 0) { // a tower to copy, with a lamp on top
    const h = ri(3, 5);
    for (let z = 1; z <= h; z++) for (let x = 5; x <= 6; x++) for (let y = 5; y <= 6; y++) o.push([x, y, z, z == h && x == 5 && y == 5 ? 22 : v]);
    bp = { n: vn + ' Tower', m: 'copy' };
  } else if (kind == 1 || kind == 2) { // count: a wall or a floor
    const w = ri(3, 6), d = kind == 2 ? ri(2, 4) : 1, h = kind == 1 ? ri(2, 3) : 1;
    for (let x = 0; x < w; x++) for (let y = 0; y < d; y++) for (let z = 1; z <= h; z++) o.push([4 + x, 5 + y, z, v]);
    bp = { n: vn + (kind == 1 ? ' Wall' : ' Floor'), m: 'count' };
  } else if (kind == 3) { // a pattern: stripes along a wall, or layers
    const cols = [[12, 13], [27, 28], [4, 5], [8, 30], [33, 34], [9, 3]][ri(0, 5)], byRow = r() < .5, w = ri(4, 6), h = byRow ? ri(3, 4) : ri(2, 3);
    for (let z = 1; z <= h; z++) for (let x = 0; x < w; x++) o.push([4 + x, 6, z, cols[(byRow ? z - 1 : x) % 2]]);
    bp = { n: byRow ? 'Layer Pattern' : 'Stripe Pattern', m: 'pat', pre: byRow ? 2 * w : 3 };
  } else if (kind == 4) { // a pyramid from a picture
    const b = r() < .5 ? 1 : 2;
    for (let k = 0; k <= b; k++) for (let x = 6 - b + k; x <= 6 + b - k; x++) for (let y = 6 - b + k; y <= 6 + b - k; y++) o.push([x, y, k + 1, k == b ? 14 : v]);
    bp = { n: vn + ' Pyramid', m: 'pic' };
  } else { // fix a little house
    for (let x = 5; x <= 7; x++) for (let y = 5; y <= 7; y++) {
      if (x != 6 || y != 6) for (let z = 1; z <= 2; z++) if (!(x == 6 && y == 7)) o.push([x, y, z, z == 2 && (x == 7 || y == 7) && (x + y) % 2 ? 7 : v]);
      o.push([x, y, 3, 31]);
    }
    const holes = [[7, 6, 1], [5, 7, 2], [7, 5, 2], [7, 7, 1], [5, 7, 1], [7, 6, 3], [6, 5, 3]], fx = [];
    while (fx.length < 3) { const h = holes[ri(0, holes.length - 1)].join(); if (!fx.includes(h)) fx.push(h); }
    bp = { n: 'Fix the House', m: 'fix', fx: fx.join(';') };
  }
  return Object.assign(bp, { id: 'day', day: key, g, c: () => o.map(q => q.slice()) });
}

/* ---- free-build goals (saved per world as goals {id: 1}). G-01b: each kind of world has its own list; three are shown at a time and
   the next one comes when one is done, so the goals change as the child builds. bk {block: n} counts blocks built (themed goals).
   G-BB3 (R-03 B4): four themed goals and two big projects per kind of world (42 new goals, 60 in all, 18-19 in a world). A themed
   goal is [id, text, icon, check]; a big project is [id, text, icon, null, steps [[text, check]...], name] whose steps are done in
   order and stay done (saved per world as pj {id: steps done}; the last step marks the goal done in goals, like any goal). A check
   gets bbGC(...) and returns the cells it found (they sparkle) or null. It looks only at blocks the child built (the mask mk, a bit
   a cell, saved per world; set by Build, Line, Wall and Floor in free build, not by stamps), so a world as it was made never counts;
   what is around them (the sea under a bridge, lava near a hut) may be anything. The three goals shown turn with the date
   (bbGoalNext): a child sees other goals on another day; a project started comes first. Goals give no stars, as before. ---- */
const bbXYZ = n => [n % BW, Math.floor(n / BW) % BD, Math.floor(n / (BW * BD))];
const bbV = (...ids) => v => ids.includes(v);
const bbB = f => (C, i, j, k) => f(C.b(i, j, k)); // a block the child built
const bbE = f => (C, i, j, k) => f(C.get(i, j, k)); // anything there: the ground, the sea
const BB_WOOL = bbV(12, 13);
// what a check reads: w the world, mk the built mask (1 a cell), an animals now, night
function bbGC(w, mk, o = {}) {
  const inb = (i, j, k) => i >= 0 && j >= 0 && k >= 0 && i < BW && j < BD && k < BH;
  const C = { w, mk, an: o.an | 0, night: !!o.night, cells: [], top: 0 };
  C.get = (i, j, k) => (inb(i, j, k) ? w[bbI(i, j, k)] : 0);
  C.b = (i, j, k) => (inb(i, j, k) && mk[bbI(i, j, k)] ? w[bbI(i, j, k)] : 0);
  for (let n = 0; n < w.length; n++) if (w[n]) { if (mk[n]) C.cells.push(n); C.top = Math.floor(n / (BW * BD)); }
  return C;
}
const BB_AX = [[1, 0], [0, 1]], BB_D4 = [[1, 0], [-1, 0], [0, 1], [0, -1]];
// a straight row of n or more built blocks that pass f, at one height (ok: a test of the whole row)
function bbRow(C, f, n, ok) {
  for (const c of C.cells) {
    const [i, j, k] = bbXYZ(c);
    if (!f(C.b(i, j, k))) continue;
    for (const [dx, dy] of BB_AX) {
      if (f(C.b(i - dx, j - dy, k))) continue;
      const o = [];
      for (let s = 0; f(C.b(i + s * dx, j + s * dy, k)); s++) o.push(bbI(i + s * dx, j + s * dy, k));
      if (o.length >= n && (!ok || ok(o))) return o;
    }
  }
  return null;
}
// a wall: n or more columns in a row, each h built blocks that pass f
function bbWall(C, f, n, h) {
  const col = (i, j, k) => { for (let z = k; z < k + h; z++) if (!f(C.b(i, j, z))) return false; return true; };
  for (const c of C.cells) {
    const [i, j, k] = bbXYZ(c);
    if (!col(i, j, k)) continue;
    for (const [dx, dy] of BB_AX) {
      if (col(i - dx, j - dy, k)) continue;
      let s = 0;
      while (col(i + s * dx, j + s * dy, k)) s++;
      if (s >= n) { const o = []; for (let q = 0; q < s; q++) for (let z = k; z < k + h; z++) o.push(bbI(i + q * dx, j + q * dy, z)); return o; }
    }
  }
  return null;
}
// every place a stack stands (seq bottom up, bbB / bbE tests; at least one built); one a column (two towers = two columns)
function bbSeqs(C, seq) {
  const out = new Map();
  for (const c of C.cells) {
    const [i, j, k] = bbXYZ(c);
    if (out.has(i + ',' + j)) continue;
    for (let o = 0; o < seq.length; o++) {
      const z0 = k - o;
      let ok = z0 >= 0;
      for (let q = 0; q < seq.length && ok; q++) ok = seq[q](C, i, j, z0 + q);
      if (ok) { out.set(i + ',' + j, seq.map((s, q) => bbI(i, j, z0 + q))); break; }
    }
  }
  return [...out.values()];
}
const bbSeq = (C, seq) => bbSeqs(C, seq)[0] || null;
const bbSeqN = (C, seq, n) => { const s = bbSeqs(C, seq); return s.length >= n ? s.flat() : null; };
const bbTall = (f, n) => Array(n).fill(bbB(f));
// a floor a x b (either way round) of built blocks that pass f at one height (ok(cells, i, j, k): a test of the whole floor)
function bbFloor(C, f, a, b, ok) {
  for (const c of C.cells) {
    const [i, j, k] = bbXYZ(c);
    for (const [W, D] of a == b ? [[a, b]] : [[a, b], [b, a]]) {
      const o = [];
      for (let x = 0; x < W && o.length == x * D; x++) for (let y = 0; y < D; y++) { if (!f(C.b(i + x, j + y, k))) break; o.push(bbI(i + x, j + y, k)); }
      if (o.length == W * D && (!ok || ok(o, i, j, k))) return o;
    }
  }
  return null;
}
// a ring of 8 built blocks around one spot that is open (a pen, an igloo)
function bbRing(C, f) {
  for (const c of C.cells) {
    const [i, j, k] = bbXYZ(c), o = [];
    for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) if ((x != 1 || y != 1) && f(C.b(i + x, j + y, k))) o.push(bbI(i + x, j + y, k));
    if (o.length == 8 && !bbOpaque(C.get(i + 1, j + 1, k))) return o;
  }
  return null;
}
// a built block that passes cf with built blocks that pass sf on all 4 sides (a well, a pool, a hut)
function bbPlus(C, cf, sf) {
  for (const c of C.cells) {
    const [i, j, k] = bbXYZ(c);
    if (cf(C.b(i, j, k)) && BB_D4.every(([dx, dy]) => sf(C.b(i + dx, j + dy, k)))) return [c].concat(BB_D4.map(([dx, dy]) => bbI(i + dx, j + dy, k)));
  }
  return null;
}
// n steps going up one way: each built block one over and one up from the last
function bbStairs(C, f, n) {
  for (const c of C.cells) {
    const [i, j, k] = bbXYZ(c);
    for (const [dx, dy] of BB_D4) {
      const o = [];
      for (let s = 0; s < n && f(C.b(i + s * dx, j + s * dy, k + s)); s++) o.push(bbI(i + s * dx, j + s * dy, k + s));
      if (o.length == n) return o;
    }
  }
  return null;
}
// a built block that passes f with a built block that passes g beside it (both: on both sides, in a line)
function bbNext(C, f, g, both) {
  for (const c of C.cells) {
    const [i, j, k] = bbXYZ(c);
    if (!f(C.b(i, j, k))) continue;
    if (both) { for (const [dx, dy] of BB_AX) if (g(C.b(i + dx, j + dy, k)) && g(C.b(i - dx, j - dy, k))) return [c, bbI(i + dx, j + dy, k), bbI(i - dx, j - dy, k)]; }
    else for (const [dx, dy] of BB_D4) if (g(C.b(i + dx, j + dy, k))) return [c, bbI(i + dx, j + dy, k)];
  }
  return null;
}
const bbWet = (C, all) => o => o[all ? 'every' : 'some'](n => { const [i, j, k] = bbXYZ(n); return C.get(i, j, k - 1) == 10; });
const BB_LOG = bbB(bbV(5)), BB_LAMP = bbB(bbV(22)), BB_PLK = bbB(bbV(4));
const BB_PALM = [BB_LOG, BB_LOG, BB_LOG, bbB(bbV(6))], BB_POST = [BB_LOG, BB_LOG, BB_LAMP], BB_SNOWMAN = [bbB(bbV(11)), bbB(bbV(11)), bbB(bbV(23))];
const BB_GOALS = [
  ['ten', 'Build 10 blocks', 'plus'],
  ['tower', 'Build a tower 6 blocks tall', 'arrow-up'],
  ['kinds', 'Use 5 kinds of blocks', 'palette'],
  ['pethouse', 'Make a house for your pet: a roof over My Pet', 'home'],
  ['night', 'Light a lamp at night', 'moon'],
  ['boom', 'Set off a TNT block with Boom', 'sparkle'],
  ['fifty', 'Build 50 blocks', 'plus'],
  ['stamp3', 'Use 3 different stamps', 'stamp'],
  ['zoo', 'Have 5 animals at once', 'paw'],
  ['tall10', 'Build a tower 10 blocks tall', 'arrow-up'],
  ['kinds10', 'Use 10 kinds of blocks', 'palette'],
  ['gal', 'Save a picture of this world to your gallery', 'image'],
  ['flowers', 'Plant 5 flowers', 'heart'],
  ['snow5', 'Build 5 Snow blocks', 'sparkle'],
  ['cactus', 'Grow 3 Cactus blocks', 'sparkle'],
  ['coral', 'Build 5 Coral blocks', 'wave'],
  ['ice', 'Build 6 Ice Brick blocks', 'sparkle'],
  ['cloud', 'Build 8 Cloud blocks', 'sparkle'],
  // G-BB3: island
  ['bridge', 'Build a bridge: 3 blocks in a row over the water', 'drop', C => bbRow(C, bbOpaque, 3, bbWet(C))],
  ['raft', 'Float a raft: put Planks on the water', 'drop', C => bbSeq(C, [bbE(bbV(10)), BB_PLK])],
  ['garden', 'Plant a garden: 4 Flowers in a row', 'heart', C => bbRow(C, bbV(17), 4)],
  ['pen', 'Make an animal pen: a ring of 8 blocks', 'paw', C => bbRing(C, bbOpaque)],
  ['farm', 'Big project: a farm', 'home', null, [
    ['A fence: 5 Planks in a row', C => bbRow(C, bbV(4), 5)],
    ['A pumpkin patch: 3 Pumpkins in a row', C => bbRow(C, bbV(23), 3)],
    ['A barn: 4 Brick in a row, 2 high', C => bbWall(C, bbV(8), 4, 2)],
    ['Your pet on the farm: My Pet next to a Pumpkin', C => bbNext(C, bbV(19), bbV(23))]], 'farm'],
  ['harbour', 'Big project: a harbour', 'drop', null, [
    ['A dock: 4 Planks in a row over the water', C => bbRow(C, bbV(4), 4, bbWet(C))],
    ['A lamp post: a Lamp on top of 2 Logs', C => bbSeq(C, BB_POST)],
    ['A boat: Planks on the water with a Wool sail on top', C => bbSeq(C, [bbE(bbV(10)), BB_PLK, bbB(BB_WOOL)])]], 'harbour'],
  // mountain
  ['stairs', 'Build stairs: 4 Planks steps going up', 'arrow-up', C => bbStairs(C, bbV(4), 4)],
  ['peak', 'Light the top: a Lamp as high as the highest block', 'sparkle', C => { const n = C.cells.find(q => C.w[q] == 22 && bbXYZ(q)[2] >= C.top); return n == null ? null : [n]; }],
  ['cabin', 'Build a log cabin: 4 Logs in a row, 2 high', 'home', C => bbWall(C, bbV(5), 4, 2)],
  ['lavahut', 'Build a lava-safe hut: Obsidian on all 4 sides of My Pet, near Lava', 'flame', C => {
    const p = bbPlus(C, bbV(19), bbV(25));
    if (!p) return null;
    const [i, j, k] = bbXYZ(p[0]);
    for (let z = k - 3; z <= k + 3; z++) for (let x = i - 4; x <= i + 4; x++) for (let y = j - 4; y <= j + 4; y++) if (C.get(x, y, z) == 21) return p;
    return null;
  }],
  ['mine', 'Big project: a mine', 'blocks', null, [
    ['A track: 6 Planks in a row', C => bbRow(C, bbV(4), 6)],
    ['A cart on the track: a Brick on top of the Planks', C => bbSeq(C, [BB_PLK, bbB(bbV(8))])],
    ['A mine light: a Lamp on top of 2 Stone', C => bbSeq(C, [bbB(bbV(3)), bbB(bbV(3)), BB_LAMP])]], 'mine'],
  ['castle', 'Big project: a mountain castle', 'crown', null, [
    ['A castle wall: 5 Brick in a row, 2 high', C => bbWall(C, bbV(8), 5, 2)],
    ['A tower: 5 Brick tall', C => bbSeq(C, bbTall(bbV(8), 5))],
    ['A window: Glass between 2 Brick', C => bbNext(C, bbV(7), bbV(8), 1)],
    ['A light on top: a Lamp on a Brick', C => bbSeq(C, [bbB(bbV(8)), BB_LAMP])]], 'castle'],
  // desert
  ['pyramid', 'Build a pyramid: a 3 by 3 square with 1 block on top', 'arrow-up', C => bbFloor(C, bbOpaque, 3, 3, (o, i, j, k) => bbOpaque(C.b(i + 1, j + 1, k + 1)))],
  ['well', 'Build a well: Stone on all 4 sides of Water', 'drop', C => bbPlus(C, bbV(10), bbV(3))],
  ['palm', 'Plant a palm tree: 3 Logs with Leaves on top', 'sparkle', C => bbSeq(C, BB_PALM)],
  ['cactusrow', 'Grow a cactus fence: 4 Cactus in a row', 'sparkle', C => bbRow(C, bbV(24), 4)],
  ['oasis', 'Big project: an oasis', 'drop', null, [
    ['A pond: 4 Water in a row', C => bbRow(C, bbV(10), 4)],
    ['Two palm trees: 3 Logs with Leaves on top, twice', C => bbSeqN(C, BB_PALM, 2)],
    ['A tent: 3 Wool in a row, 2 high', C => bbWall(C, BB_WOOL, 3, 2)],
    ['A campfire: a Lamp next to the tent', C => bbNext(C, bbV(22), BB_WOOL)]], 'oasis'],
  ['town', 'Big project: a desert town', 'home', null, [
    ['A road: 6 Stone in a row', C => bbRow(C, bbV(3), 6)],
    ['A house: 4 Brick in a row, 2 high', C => bbWall(C, bbV(8), 4, 2)],
    ['A street lamp: a Lamp on top of 2 Logs', C => bbSeq(C, BB_POST)]], 'town'],
  // flat
  ['pool', 'Build a pool: Water with blocks on all 4 sides', 'drop', C => bbPlus(C, bbV(10), bbOpaque)],
  ['longwall', 'Build a long wall: 8 blocks in a row, 2 high', 'blocks', C => bbWall(C, bbOpaque, 8, 2)],
  ['rainbow', 'Make a rainbow path: 6 different blocks in a row', 'palette', C => bbRow(C, bbOpaque, 6, o => {
    for (let s = 0; s + 6 <= o.length; s++) if (new Set(o.slice(s, s + 6).map(n => C.w[n])).size == 6) return true;
    return false;
  })],
  ['checker', 'Make a checkerboard: 3 by 3, two colours taking turns', 'skill-pattern', C => bbFloor(C, bbOpaque, 3, 3, (o, i, j, k) => {
    const a = C.b(i, j, k), b = C.b(i + 1, j, k);
    if (a == b) return false;
    for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) if (C.b(i + x, j + y, k) != ((x + y) % 2 ? b : a)) return false;
    return true;
  })],
  ['playground', 'Big project: a playground', 'ball', null, [
    ['A slide: 3 Blue Wool steps going up', C => bbStairs(C, bbV(13), 3)],
    ['A sandbox: Sand 2 by 2', C => bbFloor(C, bbV(9), 2, 2)],
    ['A swing: 2 Log posts 3 tall, with a gap between', C => {
      const s = bbSeqs(C, bbTall(bbV(5), 3));
      for (const a of s) for (const b of s) {
        const [i, j, k] = bbXYZ(a[0]), [x, y, z] = bbXYZ(b[0]), d = Math.abs(i - x) + Math.abs(j - y);
        if (k == z && (i == x || j == y) && d >= 2 && d <= 3) return a.concat(b);
      }
      return null;
    }],
    ['Friends to play with: 3 animals (More, Add animal)', C => (C.an >= 3 ? [] : null)]], 'playground'],
  ['bigcastle', 'Big project: a big castle', 'crown', null, [
    ['A wall: 6 Stone in a row, 2 high', C => bbWall(C, bbV(3), 6, 2)],
    ['A tower: 5 Stone tall', C => bbSeq(C, bbTall(bbV(3), 5))],
    ['A moat: 4 Water in a row', C => bbRow(C, bbV(10), 4)],
    ['A light: a Lamp on top of the Stone', C => bbSeq(C, [bbB(bbV(3)), BB_LAMP])]], 'castle'],
  // beach
  ['lighthouse', 'Build a lighthouse: 3 Beach Stripe with a Lamp on top', 'sparkle', C => bbSeq(C, bbTall(bbV(28), 3).concat([BB_LAMP]))],
  ['sandcastle', 'Build a sandcastle: Sand 2 by 2, 2 high', 'crown', C => bbFloor(C, bbV(9), 2, 2, (o, i, j, k) => [0, 1].every(x => [0, 1].every(y => C.b(i + x, j + y, k + 1) == 9)))],
  ['umbrella', 'Put up a beach umbrella: 2 Logs with Beach Stripe on top', 'sparkle', C => bbSeq(C, [BB_LOG, BB_LOG, bbB(bbV(28))])],
  ['pier', 'Build a pier: 5 Planks in a row over the sea', 'drop', C => bbRow(C, bbV(4), 5, bbWet(C))],
  ['beachhouse', 'Big project: a beach house', 'home', null, [
    ['A deck: Planks 3 by 3', C => bbFloor(C, bbV(4), 3, 3)],
    ['Walls: 3 Wool in a row, 2 high', C => bbWall(C, BB_WOOL, 3, 2)],
    ['A window: Glass between 2 Wool', C => bbNext(C, bbV(7), BB_WOOL, 1)],
    ['A porch light: a Lamp next to the Wool', C => bbNext(C, bbV(22), BB_WOOL)]], 'beach house'],
  ['ship', 'Big project: a pirate ship', 'drop', null, [
    ['The ship: 5 Planks in a row, all on the sea', C => bbRow(C, bbV(4), 5, bbWet(C, 1))],
    ['The mast: 3 Logs on top of the Planks', C => bbSeq(C, [BB_PLK, BB_LOG, BB_LOG, BB_LOG])],
    ['The sail: Wool next to the mast', C => bbNext(C, BB_WOOL, bbV(5))],
    ['A lookout light: a Lamp on top of the mast', C => bbSeq(C, [BB_LOG, BB_LAMP])]], 'pirate ship'],
  // snow
  ['snowman', 'Build a snowman: 2 Snow blocks with a Pumpkin head', 'sparkle', C => bbSeq(C, BB_SNOWMAN)],
  ['snowfamily', 'Build a snowman family: 3 snowmen', 'users', C => bbSeqN(C, BB_SNOWMAN, 3)],
  ['igloo', 'Build an igloo: a ring of 8 Ice Brick', 'home', C => bbRing(C, bbV(30))],
  ['skijump', 'Build a ski jump: 4 Snow steps going up', 'arrow-up', C => bbStairs(C, bbV(11), 4)],
  ['village', 'Big project: a snowy village', 'home', null, [
    ['A cabin: 4 Logs in a row, 2 high', C => bbWall(C, bbV(5), 4, 2)],
    ['A roof: 4 Roof Tiles in a row on top of the Logs', C => bbRow(C, bbV(31), 4, o => o.every(n => { const [i, j, k] = bbXYZ(n); return C.b(i, j, k - 1) == 5; }))],
    ['A warm light: a Lamp next to a Log', C => bbNext(C, bbV(22), bbV(5))]], 'village'],
  ['palace', 'Big project: an ice palace', 'crown', null, [
    ['Walls: 5 Ice Brick in a row, 2 high', C => bbWall(C, bbV(30), 5, 2)],
    ['A tower: 5 Ice Brick tall', C => bbSeq(C, bbTall(bbV(30), 5))],
    ['A window: Glass between 2 Ice Brick', C => bbNext(C, bbV(7), bbV(30), 1)],
    ['Ice lights: a Lamp on top of an Ice Brick', C => bbSeq(C, [bbB(bbV(30)), BB_LAMP])]], 'ice palace'],
  // sky
  ['cloudbridge', 'Build a cloud bridge: 5 Cloud in a row', 'balloon', C => bbRow(C, bbV(33), 5)],
  ['crystal', 'Build a crystal tower: 5 Crystal tall', 'sparkle', C => bbSeq(C, bbTall(bbV(34), 5))],
  ['balloon', 'Make a hot air balloon: 2 Wool on top of Planks', 'balloon', C => bbSeq(C, [BB_PLK, bbB(BB_WOOL), bbB(BB_WOOL)])],
  ['stars', 'Light up the night: 3 Lamps at night (More, Night)', 'moon', C => { const o = C.cells.filter(n => C.w[n] == 22); return C.night && o.length >= 3 ? o : null; }],
  ['skycastle', 'Big project: a castle in the clouds', 'crown', null, [
    ['Cloud walls: 5 Cloud in a row, 2 high', C => bbWall(C, bbV(33), 5, 2)],
    ['Crystal towers: 2 Crystal towers, 3 tall', C => bbSeqN(C, bbTall(bbV(34), 3), 2)],
    ['A gate: Glass between 2 Cloud', C => bbNext(C, bbV(7), bbV(33), 1)],
    ['Lights: a Lamp on top of a Crystal tower', C => bbSeq(C, [bbB(bbV(34)), BB_LAMP])]], 'cloud castle'],
  ['rocket', 'Big project: a rocket', 'rocket', null, [
    ['A launch pad: Stone 3 by 3', C => bbFloor(C, bbV(3), 3, 3)],
    ['The rocket: 4 Blue Wool tall on the Stone', C => bbSeq(C, [bbB(bbV(3))].concat(bbTall(bbV(13), 4)))],
    ['A nose: Pink Wool on top of the Blue Wool', C => bbSeq(C, [bbB(bbV(13)), bbB(bbV(12))])],
    ['A window: Glass between 2 Blue Wool, one on top of the other', C => bbSeq(C, [bbB(bbV(13)), bbB(bbV(7)), bbB(bbV(13))])]], 'rocket'],
];
const BB_GBLK = { flowers: [17, 5], snow5: [11, 5], cactus: [24, 3], coral: [27, 5], ice: [30, 6], cloud: [33, 8] }; // themed: block, how many
const BB_GREST = 'stamp3 pethouse night boom fifty zoo tall10 kinds10 gal';
const BB_WG = { island: 'ten flowers kinds tower', mountain: 'ten snow5 tower kinds', desert: 'ten cactus kinds tower', flat: 'ten kinds tower',
  beach: 'ten coral kinds tower', snow: 'ten ice tower kinds', sky: 'ten cloud tower kinds' };
// G-BB3: the themed goals and the two big projects of each kind of world
const BB_TH = { island: 'bridge raft garden pen', mountain: 'stairs peak cabin lavahut', desert: 'pyramid well palm cactusrow', flat: 'pool longwall rainbow checker',
  beach: 'lighthouse sandcastle umbrella pier', snow: 'snowman snowfamily igloo skijump', sky: 'cloudbridge crystal balloon stars' };
const BB_PJ = { island: 'farm harbour', mountain: 'mine castle', desert: 'oasis town', flat: 'playground bigcastle', beach: 'beachhouse ship', snow: 'village palace', sky: 'skycastle rocket' };
// a world's kind: saved as t (G-01b); an older world's from its name ("Mountains 2"), else an island
const bbWType = w => (w && BB_WG[w.t] ? w.t : ((BBWT.find(q => w && typeof w.name == 'string' && w.name.startsWith(q[1])) || ['island'])[0]));
const bbGoalId = id => BB_GOALS.find(g => g[0] == id);
const bbWGoals = w => { const t = bbWType(w); return (BB_WG[t] + ' ' + BB_TH[t] + ' ' + BB_PJ[t] + ' ' + BB_GREST).split(' ').map(bbGoalId); };
const bbGoalsOf = w => (w && w.goals && typeof w.goals == 'object' ? w.goals : {});
const bbGoalN = w => bbWGoals(w).filter(g => bbGoalsOf(w)[g[0]]).length;
// G-BB3: a big project's steps done (saved per world as pj {id: n}; a done goal is all its steps)
const bbPjOf = w => (w && w.pj && typeof w.pj == 'object' && !Array.isArray(w.pj) ? w.pj : {});
const bbPjN = (w, G) => (bbGoalsOf(w)[G[0]] ? G[4].length : Math.max(0, Math.min(G[4].length - 1, bbPjOf(w)[G[0]] | 0)));
// the line a goal shows and says: a big project names its next step
const bbGoalLine = (w, G) => { if (!G[4]) return G[1]; const s = bbPjN(w, G); return s >= G[4].length ? G[1] : `${G[1]}, step ${s + 1} of ${G[4].length}: ${G[4][s][0]}`; };
/* the goals still to do, in the order they are shown: Build 10 blocks first; then a big project already started; then the world's
   own goals and the others taking turns, each list turned two places a day by the date (the same all day; in a few days every goal
   has been first) */
function bbGoalNext(w, n = 3, key = today()) {
  const t = bbWType(w), g = bbGoalsOf(w), all = bbWGoals(w), [y, m, d] = String(key).split('-').map(Number);
  const h = (Math.round((Date.UTC(y || 2026, (m || 1) - 1, d || 1) / 864e5)) * 2 + bbHash('goals' + t)) >>> 0;
  const own = new Set((BB_WG[t] + ' ' + BB_TH[t] + ' ' + BB_PJ[t]).split(' ').filter(id => !['ten', 'kinds', 'tower'].includes(id)));
  const turn = a => (a.length ? a.slice(h % a.length).concat(a.slice(0, h % a.length)) : a).filter(G => !g[G[0]]);
  const A = turn(all.filter(G => own.has(G[0]))), B = turn(all.filter(G => !own.has(G[0]) && G[0] != 'ten'));
  const o = all.filter(G => G[0] == 'ten' && !g.ten).concat(A.filter(G => G[4] && bbPjN(w, G) > 0));
  for (const G of o) if (A.includes(G)) A.splice(A.indexOf(G), 1);
  while (A.length || B.length) { if (A.length) o.push(A.shift()); if (B.length) o.push(B.shift()); }
  return o.slice(0, n);
}
// the big project shown in the scene: the one started furthest, else one of the goals shown now
function bbPjCur(w, key = today()) {
  let best = null;
  for (const G of bbWGoals(w)) if (G[4] && !bbGoalsOf(w)[G[0]] && bbPjN(w, G) > 0 && (!best || bbPjN(w, G) > bbPjN(w, best))) best = G;
  return best || bbGoalNext(w, 3, key).find(G => G[4]) || null;
}
// the built mask (G-BB3): a bit a cell, saved as base64 (448 bytes); '' when nothing is marked; anything damaged reads as nothing
const bbMaskEnc = m => {
  const b = new Uint8Array(m.length >> 3);
  let any = 0;
  for (let n = 0; n < m.length; n++) if (m[n]) { b[n >> 3] |= 1 << (n & 7); any = 1; }
  return any ? btoa(String.fromCharCode(...b)) : '';
};
const bbMaskDec = s => {
  const m = new Uint8Array(BW * BD * BH);
  try {
    if (typeof s == 'string' && s) { const b = atob(s); if (b.length * 8 >= m.length) for (let n = 0; n < m.length; n++) m[n] = (b.charCodeAt(n >> 3) >> (n & 7)) & 1; }
  } catch (e) {}
  return m;
};
// the goals a world's blocks meet now: [[G, cells, steps]]; themed goals, and for a big project how many steps in a row from its next one
function bbGoalsMet(world, w, mk, o) {
  const C = bbGC(w, mk, o), done = bbGoalsOf(world), out = [];
  for (const G of bbWGoals(world)) {
    if (done[G[0]] || !(G[3] || G[4])) continue;
    if (G[3]) { const r = G[3](C); if (r) out.push([G, r, 0]); continue; }
    const s0 = bbPjN(world, G), cells = [];
    let s = s0;
    while (s < G[4].length) { const r = G[4][s][1](C); if (!r) break; cells.push(...r); s++; }
    if (s > s0) out.push([G, cells, s]);
  }
  return out;
}

/* ---- the builder's logic, with no screen: camera, drawing, hit test, targets, blueprint layers, undo ----
   bbMake(w, goal, mode): w the world (Uint8Array), goal a Map index -> block for a blueprint (or null), mode the blueprint's kind
   (copy, count, pat, pic, fix; G-01b: only copy and pat show see-through blocks). The play screen sizes it (size),
   draws it (render) and sends it taps (tap). Coordinates passed in are canvas pixels (CSS px x dpr). */
function bbMake(w, goal, mode) {
  const E = {
    w, goal: goal || null, mode: goal ? mode || 'copy' : null, base: w.slice(), tries: new Map(), sel: 4, tool: 'build', side: false, miss: 0, missAt: new Set(), undo: [], redo: [], placed: new Set(),
    zoom: 1, F: [8, 8, 2], ang: 0, rot: 0, night: false, faces: [], W: 320, H: 320, dpr: 1, a0: 10, drop: null,
  };
  const get = E.get = (i, j, k) => (i < 0 || j < 0 || k < 0 || i >= BW || j >= BD || k >= BH ? 0 : E.w[bbI(i, j, k)]);
  E.a = () => E.a0 * E.zoom;
  E.size = (W, H, dpr) => {
    E.W = W; E.H = H; E.dpr = dpr || 1;
    E.a0 = Math.min(W / (BW + BD + 2), H / ((BW + BD) / 2 + 7));
  };
  E.zMin = () => .9;
  E.zMax = () => Math.max(3.6, 64 * E.dpr / E.a0);
  // world (x, y, z) -> canvas point; the focus F sits in the middle of the canvas
  E.proj = (X, Y, Z) => {
    const c = Math.cos(E.ang), s = Math.sin(E.ang), A = E.a(), dx = X - E.F[0], dy = Y - E.F[1];
    const rx = dx * c - dy * s, ry = dx * s + dy * c;
    return [E.W / 2 + (rx - ry) * A, E.H / 2 + (rx + ry) * A / 2 - (Z - E.F[2]) * A];
  };
  // canvas point -> world (x, y) on the flat plane at height z
  E.unproj = (px, py, z) => {
    const c = Math.cos(E.ang), s = Math.sin(E.ang), A = E.a();
    const u = (px - E.W / 2) / A, v = 2 * (py - E.H / 2 + (z - E.F[2]) * A) / A, rx = (u + v) / 2, ry = (v - u) / 2;
    return [rx * c + ry * s + E.F[0], -rx * s + ry * c + E.F[1]];
  };
  E.clamp = () => {
    E.zoom = Math.max(E.zMin(), Math.min(E.zMax(), E.zoom));
    E.F[0] = Math.max(0, Math.min(BW, E.F[0]));
    E.F[1] = Math.max(0, Math.min(BD, E.F[1]));
  };
  // move the view so the world follows the finger (dx, dy canvas px)
  E.pan = (dx, dy) => {
    const A = E.a(), c = Math.cos(E.ang), s = Math.sin(E.ang);
    const drx = (-dx / A - 2 * dy / A) / 2, dry = (-2 * dy / A + dx / A) / 2;
    E.F[0] += drx * c + dry * s;
    E.F[1] += -drx * s + dry * c;
    E.clamp();
  };
  // zoom by factor k around canvas point (px, py) (the middle by default: Closer / Farther keep the centre)
  E.zoomAt = (k, px = E.W / 2, py = E.H / 2) => {
    const before = E.unproj(px, py, E.F[2]);
    E.zoom *= k;
    E.clamp();
    const after = E.unproj(px, py, E.F[2]);
    E.F[0] += before[0] - after[0];
    E.F[1] += before[1] - after[1];
    E.clamp();
  };
  // where the view opens: close up (block tops >= 52 CSS px), centred on the island or on the blueprint
  E.home = () => {
    const tops = [];
    let box = null;
    if (E.goal) {
      for (const i of E.goal.keys()) {
        const x = i % BW, y = Math.floor(i / BW) % BD, z = Math.floor(i / (BW * BD));
        box = box ? [Math.min(box[0], x), Math.min(box[1], y), Math.min(box[2], z), Math.max(box[3], x), Math.max(box[4], y), Math.max(box[5], z)] : [x, y, z, x, y, z];
      }
      const wx = box[3] - box[0] + 1, wy = box[4] - box[1] + 1, hz = box[5] + 1;
      const fit = Math.min(.82 * E.W / (wx + wy), .72 * E.H / ((wx + wy) / 2 + hz));
      E.F = [(box[0] + box[3] + 1) / 2, (box[1] + box[4] + 1) / 2, (box[5] + 1) / 2 + .5];
      E.zoom = Math.max(26 * E.dpr, Math.min(fit, 46 * E.dpr)) / E.a0;
    } else {
      for (let i = 0; i < BW; i++) for (let j = 0; j < BD; j++) { const t = E.topZ(i, j); if (t > 0) tops.push(t); }
      const mean = tops.length ? tops.reduce((a, b) => a + b, 0) / tops.length : 1;
      E.F = [BW / 2, BD / 2, Math.max(1, mean)];
      E.zoom = Math.max(1, Math.min(3.4, 26 * E.dpr / E.a0));
    }
    E.clamp();
  };
  // the first cell above the solid blocks of a column (deco counts as empty), from height k
  E.topZ = (i, j, k = 0) => {
    let z = BH - 1;
    while (z >= k && !bbSolid(get(i, j, z))) z--;
    return z + 1;
  };
  E.above = (i, j, k) => { while (k < BH && bbSolid(get(i, j, k))) k++; return k; };

  /* blueprint layers: the lowest height with a see-through block still to build. Only that layer can be built (and tapped). */
  E.ghosts = () => E.mode == 'copy' || E.mode == 'pat';
  E.layer = () => {
    if (!E.goal) return null;
    let L = null;
    for (const [i, v] of E.goal) if (E.w[i] != v) { const z = Math.floor(i / (BW * BD)); if (L == null || z < L) L = z; }
    return L;
  };
  E.todo = () => {
    if (E.goal && !E.ghosts()) return E.mode == 'count' ? [] : [...E.goal].filter(([i, v]) => E.w[i] != v && E.ready(i)).map(([i]) => i);
    const L = E.layer();
    return L == null ? [] : [...E.goal].filter(([i, v]) => E.w[i] != v && Math.floor(i / (BW * BD)) == L).map(([i]) => i);
  };
  E.prog = () => (!E.goal ? 0 : E.mode == 'count' ? E.mine().length : [...E.goal].filter(([i, v]) => E.w[i] == v).length);
  E.done = () => !!E.goal && (E.mode == 'count' ? E.fits(E.mine()) == 'done' : E.prog() == E.goal.size);
  /* G-01b, the builds with no see-through blocks (pic, fix): a cell can be built when something holds it (a block under it or beside it) */
  E.ready = i => {
    const a = i % BW, b = Math.floor(i / BW) % BD, z = Math.floor(i / (BW * BD));
    return z == 0 || bbSolid(get(a, b, z - 1)) || [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => bbSolid(get(a + dx, b + dy, z)));
  };
  /* count builds: the blocks the child built (not the ground), and whether they fit the size asked, any way round:
     'done' (exactly that block), 'ok' (it can still become it), or what is too big: 'w', 'h' */
  E.dims = E.goal && E.mode == 'count' ? bbDims(E.goal) : null;
  E.mine = () => { const o = []; for (let n = 0; n < E.w.length; n++) if (E.w[n] && E.w[n] != E.base[n]) o.push(n); return o; };
  E.box = cells => {
    if (!cells.length) return [0, 0, 0];
    let b = null;
    for (const n of cells) { const x = n % BW, y = Math.floor(n / BW) % BD, z = Math.floor(n / (BW * BD)); b = b ? [Math.min(b[0], x), Math.min(b[1], y), Math.min(b[2], z), Math.max(b[3], x), Math.max(b[4], y), Math.max(b[5], z)] : [x, y, z, x, y, z]; }
    return [b[3] - b[0] + 1, b[4] - b[1] + 1, b[5] - b[2] + 1];
  };
  E.fits = cells => {
    const D = E.dims, [x, y, z] = E.box(cells);
    if (z > D.h) return 'h';
    if (!(x <= D.w && y <= D.d) && !(x <= D.d && y <= D.w)) return 'w';
    return cells.length == D.w * D.d * D.h ? 'done' : 'ok';
  };

  /* history: whole states (blocks + mistakes), so Undo / Redo bring back the progress and the mistake count with the blocks */
  const state = () => ({ w: E.w.slice(), miss: E.miss, at: [...E.missAt] });
  const restore = s => { E.w.set(s.w); E.miss = s.miss; E.missAt = new Set(s.at); };
  E.push = () => { E.undo.push(state()); if (E.undo.length > 40) E.undo.shift(); E.redo.length = 0; };
  E.doUndo = () => { if (!E.undo.length) return false; E.redo.push(state()); restore(E.undo.pop()); return true; };
  E.doRedo = () => { if (!E.redo.length) return false; E.undo.push(state()); restore(E.redo.pop()); return true; };

  /* drawing: painter's order (far to near, low to high) at any turn angle; o.fast = flat colours (while the view turns);
     o.x = the 2D context (null: only the faces for hit testing). Records E.faces: {i, j, k, f, nx, ny, poly, ghost, deco}. */
  E.render = (o = {}) => {
    const x = o.x, fast = !!o.fast || !x, A = E.a(), c = Math.cos(E.ang), s = Math.sin(E.ang), F = E.F, cx = E.W / 2, cy = E.H / 2;
    const P = (X, Y, Z) => { const dx = X - F[0], dy = Y - F[1], rx = dx * c - dy * s, ry = dx * s + dy * c; return [cx + (rx - ry) * A, cy + (rx + ry) * A / 2 - (Z - F[2]) * A]; };
    const sides = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([nx, ny]) => {
      const rx = nx * c - ny * s, ry = nx * s + ny * c;
      return { nx, ny, vis: rx + ry > 1e-6, left: rx - ry < 0 };
    }).filter(q => q.vis);
    const showG = !!E.goal && E.ghosts(), L = showG ? E.layer() : null, faces = [], items = [], pat = E.mode == 'pat';
    const drop = E.drop;
    for (let k = 0; k < BH; k++) for (let j = 0; j < BD; j++) for (let i = 0; i < BW; i++) {
      const idx = bbI(i, j, k), v = E.w[idx];
      let g = 0;
      if (!v) { if (showG && E.goal.has(idx)) g = E.goal.get(idx); else continue; }
      else if (!BLOCKS[v]) continue;
      if (v) {
        // skip blocks with no face open to the view
        const B = BLOCKS[v], open = (dv) => !bbOpaque(dv) && !(B.see && dv == v);
        if (!B.deco && !open(get(i, j, k + 1)) && !sides.some(q => open(get(i + q.nx, j + q.ny, k)))) continue;
      }
      const dx = i + .5 - F[0], dy = j + .5 - F[1];
      items.push({ i, j, k, v, g, key: (dx * c - dy * s + dx * s + dy * c) * 64 + k });
    }
    items.sort((p, q) => p.key - q.key);
    const tf = (img, O, U, V, grow) => {
      let o0 = O[0], o1 = O[1], u0 = U[0], u1 = U[1], v0 = V[0], v1 = V[1];
      if (grow) { // overlap neighbours by about half a pixel, so no hairline seams show
        const eu = .7 / (Math.hypot(u0, u1) || 1), ev = .7 / (Math.hypot(v0, v1) || 1);
        o0 -= (u0 * eu + v0 * ev) / 2; o1 -= (u1 * eu + v1 * ev) / 2; u0 *= 1 + eu; u1 *= 1 + eu; v0 *= 1 + ev; v1 *= 1 + ev;
      }
      x.setTransform(u0 / BBT, u1 / BBT, v0 / BBT, v1 / BBT, o0, o1);
      x.drawImage(img, 0, 0);
    };
    const poly4 = (O, U, V) => [O, [O[0] + U[0], O[1] + U[1]], [O[0] + U[0] + V[0], O[1] + U[1] + V[1]], [O[0] + V[0], O[1] + V[1]]];
    const fillPoly = (pts, style) => {
      x.fillStyle = style; x.beginPath(); x.moveTo(...pts[0]); for (let n = 1; n < pts.length; n++) x.lineTo(...pts[n]); x.closePath(); x.fill();
    };
    // the faces of one cube at (i, j, k + dz): top and the visible sides that are open
    const cube = (it, cb) => {
      const { i, j, k } = it, dz = it.dz || 0, z1 = k + 1 + dz, z0 = k + dz;
      const O = P(i, j, z1), Ux = P(i + 1, j, z1), Vy = P(i, j + 1, z1);
      cb('top', 0, 0, O, [Ux[0] - O[0], Ux[1] - O[1]], [Vy[0] - O[0], Vy[1] - O[1]]);
      for (const q of sides) {
        let e0, e1;
        if (q.nx == 1) { e0 = [i + 1, j]; e1 = [i + 1, j + 1]; } else if (q.nx == -1) { e0 = [i, j + 1]; e1 = [i, j]; }
        else if (q.ny == 1) { e0 = [i + 1, j + 1]; e1 = [i, j + 1]; } else { e0 = [i, j]; e1 = [i + 1, j]; }
        const So = P(e0[0], e0[1], z1), S1 = P(e1[0], e1[1], z1), Sb = P(e0[0], e0[1], z0);
        cb(q.left ? 'l' : 'r', q.nx, q.ny, So, [S1[0] - So[0], S1[1] - So[1]], [Sb[0] - So[0], Sb[1] - So[1]]);
      }
    };
    for (const it of items) {
      const { i, j, k, v, g } = it;
      if (g) { // a see-through blueprint block
        const cur = k === L, al = cur ? .62 : .1;
        if (x) {
          x.globalAlpha = al;
          const fl = bbFlat3(g), im = fast || pat ? null : bbFaceImgs(g);
          // a pattern build's next blocks are white: the colour is the question
          if (pat) x.globalAlpha = cur ? .5 : .12;
          cube(it, (f, nx, ny, O, U, V) => { if (im) tf(im[(f == 'top' ? 't' : f) + (E.night ? 'n' : '')], O, U, V, false); else fillPoly(poly4(O, U, V), pat ? bbCol(f == 'top' ? 'white' : f == 'l' ? 'white-2' : 'white-3') : fl[f == 'top' ? 0 : f == 'l' ? 1 : 2]); });
          x.setTransform(1, 0, 0, 1, 0, 0);
          x.globalAlpha = 1;
          if (cur) { // a high-contrast outline: dark under a white dashed line
            const outline = () => { x.beginPath(); cube(it, (f, nx, ny, O, U, V) => { const p = poly4(O, U, V); x.moveTo(...p[0]); for (let n = 1; n < 4; n++) x.lineTo(...p[n]); x.closePath(); }); };
            x.lineJoin = 'round'; x.strokeStyle = bbA('ink', .78); x.lineWidth = Math.max(2, A * .09); x.setLineDash([]); outline(); x.stroke();
            x.strokeStyle = bbCol('white'); x.lineWidth = Math.max(1.2, A * .045); x.setLineDash([A * .18, A * .1]); outline(); x.stroke(); x.setLineDash([]);
          }
        }
        if (cur) cube(it, (f, nx, ny, O, U, V) => faces.push({ i, j, k, f: f == 'top' ? 'top' : 'side', nx, ny, poly: poly4(O, U, V), ghost: 1 }));
        continue;
      }
      const B = BLOCKS[v];
      if (drop && drop.i == bbI(i, j, k)) it.dz = drop.dz || 0;
      if (B.deco) {
        const p = P(i + .5, j + .5, k + (it.dz || 0)), sz = A * (B.k == 'pet' ? 2.4 : 1.5); // the pet drawing has room around it
        if (x) {
          x.setTransform(1, 0, 0, 1, 0, 0);
          const img = B.k == 'pet' ? (o.pet || null) : (fast ? null : bbSprite(B.k));
          if (img) x.drawImage(img, p[0] - sz / 2, p[1] - sz * .94, sz, sz);
          else { x.fillStyle = bbCol(B.k == 'pet' ? 'green' : B.k == 'mush' ? 'red' : 'pink'); x.beginPath(); x.arc(p[0], p[1] - A * .5, A * .35, 0, 7); x.fill(); }
        }
        faces.push({ i, j, k, f: 'top', deco: 1, poly: [[p[0] - A * .55, p[1] - A * 1.3], [p[0] + A * .55, p[1] - A * 1.3], [p[0] + A * .55, p[1] + A * .2], [p[0] - A * .55, p[1] + A * .2]] });
        continue;
      }
      const im = fast ? null : bbFaceImgs(v), fl = x ? bbFlat3(v) : null;
      const open = dv => !bbOpaque(dv) && !(B.see && dv == v);
      cube(it, (f, nx, ny, O, U, V) => {
        if (f == 'top' ? !open(get(i, j, k + 1)) : !open(get(i + nx, j + ny, k))) return;
        if (x) {
          if (im) tf(im[(f == 'top' ? 't' : f) + (E.night ? 'n' : '')], O, U, V, !B.see);
          else fillPoly(poly4(O, U, V), fl[f == 'top' ? 0 : f == 'l' ? 1 : 2]);
          if (im && f == 'top') { // soft shade where taller blocks stand next to this top
            let n = 0;
            for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (bbOpaque(get(i + a, j + b, k + 1))) n++;
            if (n) { x.setTransform(1, 0, 0, 1, 0, 0); fillPoly(poly4(O, U, V), bbA('ink', Math.min(.24, n * .07))); }
          }
        }
        faces.push({ i, j, k, f: f == 'top' ? 'top' : 'side', nx, ny, poly: poly4(O, U, V) });
      });
    }
    if (x) x.setTransform(1, 0, 0, 1, 0, 0);
    E.faces = faces;
    return faces;
  };
  const inPoly = (px, py, P) => {
    let r = false;
    for (let a = 0, b = P.length - 1; a < P.length; b = a++) {
      const [xa, ya] = P[a], [xb, yb] = P[b];
      if ((ya > py) != (yb > py) && px < (xb - xa) * (py - ya) / (yb - ya) + xa) r = !r;
    }
    return r;
  };
  // the front-most face under a canvas point (f: optional filter); null = none
  E.hit = (px, py, f) => {
    for (let n = E.faces.length - 1; n >= 0; n--) { const q = E.faces[n]; if ((!f || f(q)) && inPoly(px, py, q.poly)) return q; }
    return null;
  };
  // the ground cell under a canvas point (the plane z = 0), or null outside the island
  E.ground = (px, py) => {
    const [gx, gy] = E.unproj(px, py, 0), i = Math.floor(gx), j = Math.floor(gy);
    return i >= 0 && j >= 0 && i < BW && j < BD ? { i, j, k: -1, f: 'top', ground: 1 } : null;
  };
  // the cell a Build tap fills: on top of the tapped column (or beside the face with E.side); {high} when the column is full
  E.target = (px, py) => {
    const h = E.hit(px, py, q => !q.ghost) || E.ground(px, py);
    if (!h) return null;
    if (h.deco) return { i: h.i, j: h.j, k: h.k };
    let { i, j } = h, k;
    if (E.side && h.f == 'side') {
      i += h.nx; j += h.ny; k = h.k;
      if (i < 0 || j < 0 || i >= BW || j >= BD || bbSolid(get(i, j, k))) return null;
    } else k = E.above(i, j, h.ground ? 0 : h.k + 1);
    return k >= BH ? { high: 1 } : { i, j, k };
  };
  // the cells a tool fills from t0 to t1 (a drag); one cell for a tap
  E.cells = (t0, t1, tool = E.tool) => {
    t1 = t1 || t0;
    const o = [];
    const line = (a0, b0, a1, b1) => {
      const r = [], dx = Math.abs(a1 - a0), dy = Math.abs(b1 - b0), sx = a0 < a1 ? 1 : -1, sy = b0 < b1 ? 1 : -1;
      let e = dx - dy;
      for (let n = 0; n < 64; n++) { r.push([a0, b0]); if (a0 == a1 && b0 == b1) break; const e2 = 2 * e; if (e2 > -dy) { e -= dy; a0 += sx; } if (e2 < dx) { e += dx; b0 += sy; } }
      return r;
    };
    if (tool == 'build') o.push([t0.i, t0.j, t0.k, E.sel]);
    else if (tool == 'line' || tool == 'wall') for (const [a, b] of line(t0.i, t0.j, t1.i, t1.j)) for (let n = 0; n < (tool == 'wall' ? 3 : 1); n++) o.push([a, b, t0.k + n, E.sel]);
    else if (tool == 'floor' || tool == 'clear') {
      for (let a = Math.min(t0.i, t1.i); a <= Math.max(t0.i, t1.i); a++) for (let b = Math.min(t0.j, t1.j); b <= Math.max(t0.j, t1.j); b++) o.push([a, b, t0.k, tool == 'clear' ? 0 : E.sel]);
    } else if (tool == 'stamp') {
      const st = BBSTAMPS[E.stamp || 0], q = ((E.rot % 4) + 4) % 4;
      for (const [dx, dy, dz, v] of st.c) {
        const [rx, ry] = q == 0 ? [dx, dy] : q == 1 ? [dy, -dx] : q == 2 ? [-dx, -dy] : [-dy, dx];
        o.push([t0.i + rx, t0.j + ry, t0.k + dz, v]);
      }
    }
    const inB = c => c[0] >= 0 && c[1] >= 0 && c[2] >= 0 && c[0] < BW && c[1] < BD && c[2] < BH;
    return o.filter(c => inB(c) && (tool == 'clear' ? !!get(c[0], c[1], c[2]) : !bbSolid(get(c[0], c[1], c[2]))));
  };
  // put cells in (one history step); returns the indices placed
  E.put = cells => {
    if (!cells.length) return [];
    E.push();
    const out = [];
    if (cells.some(q => q[3] == BB_PET)) for (let n = 0; n < E.w.length; n++) if (E.w[n] == BB_PET) E.w[n] = 0;
    for (const [a, b, z, v] of cells) { const n = bbI(a, b, z); E.w[n] = v; if (v) { out.push(n); E.placed.add(n); } }
    return out;
  };
  // a deco block (flower, mushroom, pet) needs a block or water under it
  E.decoOk = (i, j, k, v) => !BLOCKS[v].deco || k == 0 || bbOpaque(get(i, j, k - 1)) || get(i, j, k - 1) == 10;

  /* a short tap at a canvas point. Returns what happened: {kind: 'place'|'break'|'light'|'wrong'|'miss'|'none'|'high'|'deco'|'notnt', ...};
     the screen adds sound, messages, effects and saving. A Build tap on TNT builds on top of it: lighting is only the Boom tool. */
  E.tap = (px, py) => {
    if (E.goal) return E.mode == 'count' ? E.cntTap(px, py) : E.ghosts() ? E.bpTap(px, py) : E.aimTap(px, py);
    const T = E.tool;
    if (T == 'break') {
      const h = E.hit(px, py, q => !q.ghost);
      if (!h) return { kind: 'none' };
      const n = bbI(h.i, h.j, h.k), v = E.w[n];
      if (!v) return { kind: 'none' };
      E.push(); E.w[n] = 0;
      return { kind: 'break', cells: [n], v, at: [h.i, h.j, h.k] };
    }
    if (T == 'boom') {
      const h = E.hit(px, py, q => !q.ghost);
      if (h && get(h.i, h.j, h.k) == BB_TNT) return { kind: 'light', at: [h.i, h.j, h.k] };
      return { kind: 'notnt' };
    }
    if (T == 'clear') return { kind: 'none', clear: 1 };
    const t = E.target(px, py);
    if (!t) return { kind: 'none', why: 'sky' };
    if (t.high) return { kind: 'high' };
    const cells = E.cells(t, t, T);
    if (!cells.length) return { kind: 'none', why: 'full' };
    if (T != 'stamp' && cells.some(([a, b, z, v]) => !E.decoOk(a, b, z, v))) return { kind: 'deco' };
    return { kind: 'place', cells: E.put(cells), tool: T };
  };
  // a blueprint tap: match it to a see-through block of the current layer, kindly
  E.bpTap = (px, py) => {
    const L = E.layer();
    if (L == null) return { kind: 'none' };
    let idx = null, sure = true;
    const g = E.hit(px, py, q => q.ghost); // 1. a see-through block under the finger
    if (g) idx = bbI(g.i, g.j, g.k);
    if (idx == null) { // 2. the column under the finger: the cell on top of it
      const h = E.hit(px, py, q => !q.ghost) || E.ground(px, py);
      if (h) { const k = E.above(h.i, h.j, h.ground ? 0 : h.k + 1), n = bbI(h.i, h.j, Math.min(k, BH - 1)); if (k == L && E.goal.get(n) && E.w[n] != E.goal.get(n)) idx = n; }
    }
    if (idx == null) { // 3. the nearest see-through block of this layer, within about a block
      let best = null, bd = E.a() * 1.15;
      for (const n of E.todo()) {
        const i = n % BW, j = Math.floor(n / BW) % BD, p = E.proj(i + .5, j + .5, L + .5), d = Math.hypot(p[0] - px, p[1] - py);
        if (d < bd) { bd = d; best = n; }
      }
      idx = best; sure = false;
    }
    if (idx == null) return { kind: 'miss' }; // nowhere near: a tip, never a mistake
    return E.place(idx, sure);
  };
  // build the goal block at idx if the chosen block is right; a wrong block counts one mistake per spot (only when sure);
  // tries: how many wrong blocks this spot had (a pattern build shows the right block from the second)
  E.place = (idx, sure) => {
    const want = E.goal.get(idx);
    if (E.sel != want) {
      const counted = sure && !E.missAt.has(idx);
      if (counted) { E.miss++; E.missAt.add(idx); }
      E.tries.set(idx, (E.tries.get(idx) || 0) + 1);
      return { kind: 'wrong', want, idx, counted, tries: E.tries.get(idx) };
    }
    E.push();
    E.w[idx] = want;
    return { kind: 'place', cells: [idx], layer: E.layer(), win: E.done() };
  };
  /* G-01b: a tap in a build with no see-through blocks (pic, fix): the column under the finger, its lowest block still to build
     (a hole under a roof too); if nothing in that column is wanted, the nearest buildable spot within about a block (a guess, never
     a mistake); a spot that nothing holds yet: wait. */
  E.aimTap = (px, py) => {
    let idx = null, sure = true, wait = false;
    const h = E.hit(px, py, q => !q.ghost) || E.ground(px, py);
    if (h) {
      let { i, j } = h;
      if (E.side && h.f == 'side' && !h.deco) { i += h.nx; j += h.ny; }
      const col = [];
      for (let z = 0; z < BH; z++) { const n = bbI(i, j, z); if (E.goal.has(n) && E.w[n] != E.goal.get(n)) col.push(n); }
      if (col.length) { if (E.ready(col[0])) idx = col[0]; else wait = true; }
    }
    if (idx == null && !wait) {
      let bd = E.a() * 1.15;
      for (const n of E.todo()) {
        const p = E.proj(n % BW + .5, Math.floor(n / BW) % BD + .5, Math.floor(n / (BW * BD)) + 1), d = Math.hypot(p[0] - px, p[1] - py);
        if (d < bd) { bd = d; idx = n; sure = false; }
      }
    }
    if (idx == null) return { kind: wait ? 'wait' : 'miss' };
    return E.place(idx, sure);
  };
  /* G-01b: a tap in a count build: the block goes on top of the column under the finger, anywhere on the ground; a block that would
     make it too wide or too tall is not built and counts one mistake per spot (the message says what the size should be) */
  E.cntTap = (px, py) => {
    const t = E.target(px, py);
    if (!t) return { kind: 'miss' };
    if (t.high) return { kind: 'high' };
    if (t.k < 1) return { kind: 'miss' };
    const n = bbI(t.i, t.j, t.k), mine = E.mine(), f = E.fits(mine.concat(n));
    if (f == 'w' || f == 'h') {
      const counted = !E.missAt.has(n);
      if (counted) { E.miss++; E.missAt.add(n); }
      return { kind: 'big', why: f, idx: n, counted, box: E.box(mine.concat(n)) };
    }
    E.push();
    E.w[n] = E.sel;
    return { kind: 'place', cells: [n], win: E.done(), box: E.box(mine.concat(n)) };
  };
  return E;
}

/* ---- drawn tool icons (24 grid, currentColor; the soft tone at opacity .4, DESIGN_SYSTEM 5.2a); the rest are ICONS ---- */
const BBI = {
  build: '<path opacity=".4" d="M12 2.6l8.6 4.7L12 12 3.4 7.3z"/><path d="M3.4 9.2L11 13.4v8.3l-7.6-4.2zM13 13.4l7.6-4.2v8.3L13 21.7z"/>',
  break: '<path d="M3.4 8.2L10.6 4.6l1.4 3.6-2 3 1.6 3.5-1.4 6-6.8-3.7z"/><path opacity=".4" d="M13.6 4.6l7 3.6v9L13.4 21l1-5.6-1.6-3.6 2-3z"/>',
  stamp: '<circle cx="12" cy="5.2" r="3"/><path d="M10.4 7.6h3.2v4.4h-3.2z"/><rect x="4.6" y="11.6" width="14.8" height="5.4" rx="1.6"/><rect opacity=".4" x="3.4" y="18.6" width="17.2" height="2.6" rx="1.3"/>',
  boom: '<path d="M12 1.8l2.2 5.6 5.6-2.4-2.4 5.6 5.4 2.2-5.4 2.2 2.4 5.6-5.6-2.4L12 23.8l-2.2-5.6-5.6 2.4 2.4-5.6L1.2 12.8l5.4-2.2-2.4-5.6 5.6 2.4z"/><circle opacity=".4" cx="12" cy="12.8" r="4"/>',
  closer: '<circle opacity=".4" cx="10.4" cy="10.4" r="7.4"/><path fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" d="M15.6 15.6l5.4 5.4M7 10.4h6.8M10.4 7v6.8"/>',
  farther: '<circle opacity=".4" cx="10.4" cy="10.4" r="7.4"/><path fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" d="M15.6 15.6l5.4 5.4M7 10.4h6.8"/>',
  line: '<rect x="1.8" y="9" width="6" height="6" rx="1.6"/><rect x="9" y="9" width="6" height="6" rx="1.6"/><rect opacity=".4" x="16.2" y="9" width="6" height="6" rx="1.6"/>',
  wall: '<rect x="2" y="3" width="9" height="5.4" rx="1.4"/><rect x="13" y="3" width="9" height="5.4" rx="1.4"/><rect opacity=".4" x="2" y="9.4" width="4" height="5.4" rx="1.4"/><rect x="7.6" y="9.4" width="9" height="5.4" rx="1.4"/><rect opacity=".4" x="18" y="9.4" width="4" height="5.4" rx="1.4"/><rect x="2" y="15.8" width="9" height="5.4" rx="1.4"/><rect x="13" y="15.8" width="9" height="5.4" rx="1.4"/>',
  floor: '<path opacity=".4" d="M12 4l10 5.4L12 14.8 2 9.4z"/><path d="M2 12.2l10 5.4 10-5.4v2.6l-10 5.4-10-5.4z"/>',
};
const bbIco = (n, sz = 24, cls = '') => BBI[n]
  ? `<svg class="ic${cls ? ' ' + cls : ''}" width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${BBI[n]}</svg>`
  : ico(n, sz, cls);
// a labelled tool button (48 px and up): icon over a short label
const bbTB = (id, icon, label, o = {}) => `<button class="bb-tb${o.cls ? ' ' + o.cls : ''}" id="${id}"${o.v ? ` data-tool="${o.v}"` : ''}` +
  ` aria-label="${esc(o.aria || label)}"${o.on != null ? ` aria-pressed="${o.on ? 'true' : 'false'}"` : ''}>${bbIco(icon)}<span>${esc(label)}</span></button>`;

/* ---- a small picture of blocks (blueprint cards, stamps, worlds, palette): the same drawing at a fixed view ---- */
function bbMini(cv, cells, o = {}) {
  const w = new Uint8Array(BW * BD * BH);
  let box = [99, 99, 99, -1, -1, -1];
  for (const [a, b, z, v] of cells) {
    if (a < 0 || b < 0 || z < 0 || a >= BW || b >= BD || z >= BH) continue;
    w[bbI(a, b, z)] = v;
    box = [Math.min(box[0], a), Math.min(box[1], b), Math.min(box[2], z), Math.max(box[3], a), Math.max(box[4], b), Math.max(box[5], z)];
  }
  if (box[3] < 0) return;
  const E = bbMake(w, null), W = cv.width, H = cv.height, wx = box[3] - box[0] + 1, wy = box[4] - box[1] + 1, hz = box[5] - box[2] + 1;
  E.size(W, H, 1);
  const A = Math.min(.92 * W / (wx + wy), .9 * H / ((wx + wy) / 2 + hz));
  E.zoom = A / E.a0;
  E.F = [(box[0] + box[3] + 1) / 2, (box[1] + box[4] + 1) / 2, box[2] + hz / 2];
  const x = cv.getContext('2d');
  x.clearRect(0, 0, W, H);
  E.render({ x, pet: o.pet });
}

/* ---- the play screen ---- */
// ci: a blueprint's index in BBP, 'day' (the build of the day, G-01b) or nothing (free build in the current world)
function blockBuilder(ci) {
  const bs = bbS(), bp = ci == null ? null : ci == 'day' ? bbDaily(today()) : BBP[ci], world = bp ? null : bs.worlds[bs.cur];
  const mode = bp ? bbMode(bp) : null, goalMap = bp ? bbGoal(bp) : null;
  const chap = bp ? bbChapOf(bp) : null;
  const E = BB = bbMake(bp ? bbStart(bp) : bbDecode(world.d), goalMap, mode);
  E.ch = bp ? ci : null;
  E.bp = bp;
  E.world = world;
  E.mk = world ? bbMaskDec(world.mk) : null; // G-BB3: the blocks the child built (themed goals)
  E.stamp = 0;
  // the sky: the chapter's, or the world's kind's (G-01b)
  const wt = world ? bbWType(world) : null;
  E.sky = chap ? chap.sky : (BB_CHS.find(c => c.world == wt) || BB_CHS[0]).sky;
  const need = bp ? [...new Set(E.goal.values())] : null;
  if (need) E.sel = need[0];
  const lockLeft = b => (b.need && S.stars < b.need ? b.need - S.stars : 0);
  const blockBtn = i => {
    const b = BLOCKS[i], left = need ? 0 : lockLeft(b), jl = need ? null : bbBlockLock(i);
    const lab = left ? ': ' + left + ' more stars to unlock' : jl ? ': ' + jl.why : '';
    return `<button class="bb-k${left || jl ? ' lock' : ''}" data-b="${i}" aria-pressed="false" aria-label="${esc(b.n + lab)}">` +
      `<canvas width="96" height="96" data-bc="${i}" aria-hidden="true"></canvas>` +
      (left ? `<span class="bb-kn bb-kl">${ico('lock', 16)}${left} more</span>` : jl ? `<span class="bb-kn bb-kl">${ico('lock', 16)}${esc(jl.short)}</span>` : `<span class="bb-kn">${esc(b.n)}</span>`) + '</button>';
  };
  const groups = need ? [['Blocks for this build', need]] : BB_GROUPS;
  const pal = groups.map(([g, ids]) => `<div class="bb-grp"><span class="bb-gh">${esc(g)}</span><div class="bb-gb">${ids.map(blockBtn).join('')}</div></div>`).join('');
  const stamps = BBSTAMPS.map((t, i) => { const ok = bbStampOk(t); return `<button class="bb-k bb-sk${ok ? '' : ' lock'}" data-stamp="${i}" aria-pressed="${i == 0}" aria-label="${esc(t.n + (ok ? '' : ': open ' + BB_CHS[t.ch].n + ' to unlock'))}">` +
    `<canvas width="96" height="96" data-sc="${i}" aria-hidden="true"></canvas>` + (ok ? `<span class="bb-kn">${esc(t.n)}</span>` : `<span class="bb-kn bb-kl">${ico('lock', 16)}${esc(BB_CHS[t.ch].n.split(' ').pop())}</span>`) + '</button>'; }).join('');
  // G-01b: the task of a build, in the scene: what to do, and for a picture or a fix the picture of the finished build (tap: bigger)
  const task = bp ? `<div class="bb-task" id="bbtask">${mode == 'pic' || mode == 'fix' ? `<button class="bb-tpic" id="bbtpic" aria-label="The picture of the build. Tap to make it bigger" aria-pressed="false"><canvas width="240" height="180" id="bbtpc" aria-hidden="true"></canvas></button>` : ''}` +
    `<p class="bb-tt"><span class="bb-tm">${ico(BB_MODES[mode][1], 22)}${esc(BB_MODES[mode][0])}</span><span id="bbtaskt">${esc(bbTask(bp))}</span></p></div>` : '';
  const seg = `<div class="bb-seg" role="group" aria-label="Tool">${bbTB('bbm-build', 'build', 'Build', { v: 'build', on: true })}` +
    `${bbTB('bbm-break', 'break', 'Break', { v: 'break', on: false })}${bbTB('bbm-stamp', 'stamp', 'Stamp', { v: 'stamp', on: false })}</div>`;
  const hist = bbTB('bbundo', 'undo', 'Undo') + bbTB('bbredo', 'redo', 'Redo');
  const cam = bbTB('bbrl', 'rotate', 'Left', { aria: 'Turn left', cls: 'bb-flip' }) + bbTB('bbrr', 'rotate', 'Right', { aria: 'Turn right' }) +
    bbTB('bbzo', 'farther', 'Farther', { aria: 'Zoom out' }) + bbTB('bbzi', 'closer', 'Closer', { aria: 'Zoom in' });
  const bar = bp ? `<div class="bb-row">${hist}${cam}</div>`
    : `<div class="bb-row">${seg}${hist}</div><div class="bb-row">${cam}${bbTB('bbboom', 'boom', 'Boom', { v: 'boom', on: false, aria: 'Boom: light a TNT block' })}` +
      `${bbTB('bbmore', 'more', 'More', { aria: 'More tools' })}</div>`;
  const chips = bp ? `<span class="stat gh-st bb-prog" aria-label="Blocks built">${ico('blocks', 28)}<b id="bbprog"></b></span>`
    : `<span class="stat gh-st bb-prog" aria-label="Goals done">${ico('target', 28)}<b id="bbgoal"></b></span>`;
  view(`${GH.top('blocks', { play: true, sub: bp ? bp.n : world.name, chips })}
   <div class="bb-wrap${bp ? ' bb-isbp' : ''}"><div class="bb-cv" id="bbcv"><canvas id="bbgl" aria-hidden="true" hidden></canvas><canvas id="bbc" role="img" aria-label="Your build"></canvas><div class="bb-msg" id="bbmsg" aria-live="polite"></div><div class="bb-tip" id="bbtip"></div>${task}${bp ? '' : '<button class="bb-pj" id="bbpj" hidden></button>'}</div>
    <div class="bb-side"><div class="bb-bar">${bar}</div>
     <div class="bb-pal" id="bbpal"><div class="bb-ps">${pal}</div></div>${bp ? '' : `<div class="bb-pal" id="bbst" hidden><div class="bb-ps"><div class="bb-grp"><span class="bb-gh">Stamps</span><div class="bb-gb">${stamps}</div></div></div></div>`}</div></div>`);
  const cv = $('#bbc'), x = cv.getContext('2d'), wrap = $('#bbcv'), glcv = $('#bbgl');
  const bg = bbCanvas(1), bgx = bg.getContext('2d');
  let dpr = Math.min(2, devicePixelRatio || 1);
  const FX = { parts: [], fuses: [], lit: new Set(), shake: 0, dirty: 1, last: 0, flash: [], anim: null, hold: null, t0: performance.now(), key: '', ft: [], scale: 1 };
  E.animals = [];
  const pet = () => bbPetImg(() => { E.dirty = 1; });
  const redraw = () => { E.dirty = 1; };
  /* G-BB2: the 3D look (61-bb-gl.js) when WebGL works and it is not turned off (S.bb.gl = 0); else the 2D drawing as before */
  let G3 = null;
  if (bbS().gl !== 0 && !BB_NOGL) {
    try { G3 = bbGL(glcv); } catch (e) { G3 = null; try { logErr('Block Builder 3D: ' + e.message); } catch (er) {} }
    if (G3) { glcv.hidden = false; bbCam3(E); E.gl = G3; } else BB_NOGL = 1;
  }
  E.look = G3 ? '3d' : '2d';
  // the sky behind the 3D canvas: the scene tokens as a CSS gradient (drawn by the browser, not every frame), the sun or the moon
  function sky3() {
    const [a, b] = E.night ? ['night', 'night-1'] : E.sky;
    const sun = E.night ? 'radial-gradient(circle at 86% 12%, var(--ill-yellow-1) 0 3.2%, transparent 3.5%)'
      : 'radial-gradient(circle at 86% 12%, var(--ill-yellow) 0 4%, var(--ill-yellow-1) 4.3% 5.4%, transparent 5.8%)';
    wrap.style.background = sun + ', linear-gradient(var(--sc-' + a + '), var(--sc-' + b + '))';
  }
  if (G3) sky3();

  // the whole scene into the back buffer (only when something changed); fast = flat colours while the view turns
  function scene(fast) {
    if (G3) { FX.dirty = 1; return; }
    const W = cv.width, H = cv.height, A = E.a();
    const g = bgx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, bbCol(E.night ? 'sc:night' : 'sc:' + E.sky[0]));
    g.addColorStop(1, bbCol(E.night ? 'sc:night-1' : 'sc:' + E.sky[1]));
    bgx.setTransform(1, 0, 0, 1, 0, 0);
    bgx.fillStyle = g; bgx.fillRect(0, 0, W, H);
    if (E.night) {
      bgx.fillStyle = bbCol('white');
      for (let n = 0; n < 50; n++) { bgx.globalAlpha = .4 + (n % 3) * .2; bgx.fillRect((n * 97) % W, (n * 53) % (H * .5), 2 * dpr, 2 * dpr); }
      bgx.globalAlpha = 1;
      const mx = W * .86, my = H * .12, mr = Math.min(W, H) * .05;
      bgx.fillStyle = bbCol('yellow-1'); bgx.beginPath(); bgx.arc(mx, my, mr, 0, 7); bgx.fill();
      bgx.fillStyle = bbCol('sc:night'); bgx.beginPath(); bgx.arc(mx + mr * .45, my - mr * .25, mr * .85, 0, 7); bgx.fill();
    } else {
      const sx = W * .86, sy = H * .12, sr = Math.min(W, H) * .05;
      bgx.fillStyle = bbA('yellow-1', .5); bgx.beginPath(); bgx.arc(sx, sy, sr * 1.25, 0, 7); bgx.fill();
      bgx.fillStyle = bbCol('yellow'); bgx.beginPath(); bgx.arc(sx, sy, sr, 0, 7); bgx.fill();
      bgx.fillStyle = bbA('white', .55); bgx.beginPath(); bgx.ellipse(sx - sr * .35, sy - sr * .38, sr * .32, sr * .2, -.6, 0, 7); bgx.fill();
    }
    // a soft shadow under the island
    const c = [E.proj(0, 0, 0), E.proj(BW, 0, 0), E.proj(BW, BD, 0), E.proj(0, BD, 0)];
    bgx.fillStyle = bbA('ink', .1); bgx.beginPath();
    c.forEach(([X, Y], n) => n ? bgx.lineTo(X, Y + A * .6) : bgx.moveTo(X, Y + A * .6)); bgx.closePath(); bgx.fill();
    E.render({ x: bgx, fast, pet: pet() });
    // glow of lava and lamps
    const glows = [];
    for (let n = 0; n < E.w.length; n++) { const v = E.w[n]; if (v && BLOCKS[v].glow) glows.push([n, BLOCKS[v].glow]); }
    if (glows.length && !fast) {
      bgx.globalCompositeOperation = 'lighter';
      for (const [n, t] of glows.slice(0, 60)) {
        const i = n % BW, j = Math.floor(n / BW) % BD, k = Math.floor(n / (BW * BD)), p = E.proj(i + .5, j + .5, k + .5), rr = A * (E.night ? 3.2 : 1.3);
        const g2 = bgx.createRadialGradient(p[0], p[1], 0, p[0], p[1], rr);
        g2.addColorStop(0, bbA(t, E.night ? .65 : .25)); g2.addColorStop(1, bbA(t, 0));
        bgx.fillStyle = g2; bgx.fillRect(p[0] - rr, p[1] - rr, rr * 2, rr * 2);
      }
      bgx.globalCompositeOperation = 'source-over';
    }
    FX.dirty = 1;
  }
  function size() {
    const r = wrap.getBoundingClientRect();
    if (!r.width || !r.height) return;
    dpr = G3 ? Math.min(1, devicePixelRatio || 1) * FX.scale : Math.min(BB_DPR2, devicePixelRatio || 1);
    const W = Math.round(r.width * dpr), H = Math.round(r.height * dpr);
    if (E.sized && W == cv.width && H == cv.height) return;
    cv.width = W;
    cv.height = H;
    if (G3) G3.resize(W, H); else { bg.width = W; bg.height = H; }
    const first = !E.sized;
    E.size(cv.width, cv.height, dpr);
    if (first) { E.home(); E.sized = 1; } else E.clamp();
    E.dirty = 1;
  }

  /* ---- messages: inside the scene, under the top bar, so they never cover Pause or the progress chip (R-02 #11, C7) ---- */
  const say1 = (t, kind = 'info', ms = 1900) => {
    const m = $('#bbmsg');
    if (!m) return;
    m.className = 'bb-msg on ' + kind;
    m.innerHTML = `<span class="bb-mi">${ico(kind == 'good' ? 'check' : kind == 'try' ? 'hint' : 'info', 22)}</span><span>${esc(t)}</span>`;
    clearTimeout(m._t);
    m._t = setTimeout(() => m.classList.remove('on'), ms);
  };
  const tip = t => {
    const el = $('#bbtip');
    if (!el) return;
    el.textContent = t;
    el.classList.add('on');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('on'), 2600);
  };

  /* ---- effects ---- */
  const cellXYZ = n => [n % BW, Math.floor(n / BW) % BD, Math.floor(n / (BW * BD))];
  function puff(i, j, k, v) {
    const B = BLOCKS[v];
    if (!B) return;
    const p = E.proj(i + .5, j + .5, k + .5), A = E.a(), col = B.deco ? bbCol('green') : bbFlat3(v)[0];
    for (let n = 0; n < 8; n++) FX.parts.push({ x: p[0], y: p[1], vx: (Math.random() - .5) * A * .25, vy: -Math.random() * A * .3, l: .6 + Math.random() * .3, c: col, s: A * (.14 + Math.random() * .12) });
  }
  function flash(cells) { FX.flash = cells.slice(0, 200).map(n => ({ n, t: performance.now() })); }
  function light(i, j, k, t) {
    const n = bbI(i, j, k);
    if (FX.lit.has(n)) return;
    FX.lit.add(n);
    FX.fuses.push({ i, j, k, n, t });
    tone(880, .05, 0, 'square', .08);
  }
  function boom(f) {
    FX.lit.delete(f.n);
    if (E.w[f.n] != BB_TNT) return;
    if (!FX.snap) { E.push(); FX.snap = 1; setTimeout(() => { FX.snap = 0; }, 600); }
    const R0 = 2.6, A = E.a(), c = E.proj(f.i + .5, f.j + .5, f.k + .5);
    E.w[f.n] = 0;
    for (let dz = -3; dz <= 3; dz++) for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
      const d = Math.hypot(dx, dy, dz * 1.2);
      if (d > R0) continue;
      const a = f.i + dx, b = f.j + dy, z = f.k + dz;
      if (a < 0 || b < 0 || z < 0 || a >= BW || b >= BD || z >= BH) continue;
      const n = bbI(a, b, z), v = E.w[n];
      if (!v) continue;
      if (v == BB_TNT) { light(a, b, z, .15 + d * .06); continue; }
      const p = E.proj(a + .5, b + .5, z + .5);
      if (FX.parts.length < 220) FX.parts.push({ x: p[0], y: p[1], vx: (p[0] - c[0]) * .08 + (Math.random() - .5) * A * .3, vy: -A * (.2 + Math.random() * .35) + (p[1] - c[1]) * .05, l: 1 + Math.random() * .6, c: BLOCKS[v].deco ? bbCol('green') : bbFlat3(v)[0], s: A * (.18 + Math.random() * .22) });
      E.w[n] = 0;
    }
    E.animals = E.animals.filter(an => Math.hypot(an.x - f.i, an.y - f.j, (an.z - f.k) * 1.2) > R0 + .6);
    FX.parts.push({ x: c[0], y: c[1], l: .25, flash: 1, s: A * 4 });
    for (let n = 0; n < 10; n++) FX.parts.push({ x: c[0] + (Math.random() - .5) * A * 2, y: c[1] + (Math.random() - .5) * A, vx: (Math.random() - .5) * A * .1, vy: -A * .05, l: 1.2 + Math.random(), smoke: 1, s: A * (.5 + Math.random() * .6) });
    FX.shake = .5;
    noise(.8, 0, .5, 900, 80); tone(70, .6, 0, 'sawtooth', .28, 28); tone(46, .8, .05, 'sine', .3, 20);
    goal('boom');
    E.dirty = 1; after();
  }
  function spawn() {
    if (E.animals.length >= 10) { say1('That is a lot of animals!', 'info'); return; }
    for (let n = 0; n < 60; n++) {
      const a = Math.floor(Math.random() * BW), b = Math.floor(Math.random() * BD), z = E.topZ(a, b);
      const under = z > 0 ? E.get(a, b, z - 1) : 0;
      if (z > 0 && z < BH && under != 10 && under != 21) {
        const k = pick(BB_AN);
        bbAnimalImg(k, () => { FX.dirty = 1; });
        E.animals.push({ k, x: a, y: b, z, fx: a, fy: b, fz: z, tx: a, ty: b, tz: z, hop: 1, t: .5, dir: 1, ph: Math.random() * 6 });
        tone(660, .08, 0, 'sine', .12); tone(990, .08, .08, 'sine', .12);
        if (E.animals.length >= 5) goal('zoo');
        themed();
        return;
      }
    }
  }

  /* ---- the free-build goals ---- */
  function goal(id) {
    if (!world) return;
    const g = world.goals = bbGoalsOf(world);
    if (g[id]) return;
    g[id] = 1;
    save();
    const G = BB_GOALS.find(q => q[0] == id);
    // a goal of this world's list: say it (G-BB3: read aloud too), and the next one that comes in its place
    if (bbWGoals(world).includes(G)) setTimeout(() => {
      SFX.chime();
      const nx = bbGoalNext(world, 3)[2], line = (G[4] ? `You finished the ${G[5]}!` : 'Goal done: ' + G[1] + '!') + (nx ? ' New goal: ' + bbGoalLine(world, nx) + '.' : '');
      say1(line, 'good', 3600);
      if (S.voice) say(line);
    }, 250);
    goalChip();
  }
  function goalChip() { const c = $('#bbgoal'); if (c) c.textContent = bbGoalN(world) + '/' + bbWGoals(world).length; pjChip(); }
  /* G-BB3: the themed goals and the big projects' steps the world meets now (after a block is built, an animal comes, night falls) */
  function themed() {
    if (!world || !E.mk) return;
    for (const [G, cells, s] of bbGoalsMet(world, E.w, E.mk, { an: E.animals.length, night: E.night })) {
      if (cells.length) flash(cells);
      if (!G[4]) { goal(G[0]); continue; }
      const pj = world.pj = bbPjOf(world);
      pj[G[0]] = s;
      if (s >= G[4].length) { goal(G[0]); continue; }
      save();
      const line = `${G[5][0].toUpperCase() + G[5].slice(1)}: step ${s} of ${G[4].length} done! Next: ${G[4][s][0]}.`;
      setTimeout(() => { SFX.chime(); say1(line, 'good', 3600); if (S.voice) say(line); }, 250);
      pjChip();
    }
  }
  // the big project in the scene (bottom left): its name, a dot a step, the next step; a tap reads the step aloud
  function pjChip() {
    const b = $('#bbpj');
    if (!b) return;
    const G = world && bbPjCur(world);
    b.hidden = !G;
    if (!G) return;
    const s = bbPjN(world, G), n = G[4].length;
    b.dataset.pj = G[0];
    b.setAttribute('aria-label', bbGoalLine(world, G) + '. Tap to hear it.');
    b.innerHTML = `<span class="bb-pjh">${bbIco(G[2], 22)}<b>${esc(G[1])}</b><span class="bb-pjn">${s}/${n}</span></span>` +
      `<span class="bb-pjd" aria-hidden="true">${G[4].map((q, k) => `<i class="${k < s ? 'on' : k == s ? 'now' : ''}"></i>`).join('')}</span>` +
      `<span class="bb-pjt">${esc(G[4][Math.min(s, n - 1)][0])}</span>`;
  }
  function checkGoals(placed, tool) {
    if (!world) return;
    // G-BB3: the child's own blocks (not a stamp's) count for the themed goals
    if (E.mk) for (const n of placed) E.mk[n] = tool == 'stamp' ? 0 : 1;
    world.n = (world.n | 0) + placed.length;
    const kinds = new Set(Array.isArray(world.kinds) ? world.kinds : []);
    const bk = world.bk = world.bk && typeof world.bk == 'object' && !Array.isArray(world.bk) ? world.bk : {};
    for (const n of placed) { const v = E.w[n]; kinds.add(v); if (v > 0 && v < BLOCKS.length) bk[v] = (bk[v] | 0) + 1; }
    world.kinds = [...kinds].filter(v => v > 0 && v < BLOCKS.length);
    if (tool == 'stamp') {
      const st = new Set(Array.isArray(world.st) ? world.st : []);
      st.add(E.stamp | 0);
      world.st = [...st].filter(q => q >= 0 && q < BBSTAMPS.length);
      if (world.st.length >= 3) goal('stamp3');
    }
    if (world.n >= 10) goal('ten');
    if (world.n >= 50) goal('fifty');
    if (world.kinds.length >= 5) goal('kinds');
    if (world.kinds.length >= 10) goal('kinds10');
    for (const id in BB_GBLK) if ((bk[BB_GBLK[id][0]] | 0) >= BB_GBLK[id][1]) goal(id);
    for (const n of placed) {
      const [i, j, k] = cellXYZ(n);
      // a stack of 6 blocks built here (this visit), ending at or through this cell
      let lo = k, hi = k;
      while (lo > 0 && E.placed.has(bbI(i, j, lo - 1)) && E.w[bbI(i, j, lo - 1)]) lo--;
      while (hi < BH - 1 && E.placed.has(bbI(i, j, hi + 1)) && E.w[bbI(i, j, hi + 1)]) hi++;
      if (hi - lo + 1 >= 6) goal('tower');
      if (hi - lo + 1 >= 10) goal('tall10');
      if (E.w[n] == 22 && E.night) goal('night');
    }
    for (let n = 0; n < E.w.length; n++) if (E.w[n] == BB_PET) {
      const [i, j, k] = cellXYZ(n);
      for (let z = k + 1; z <= k + 3; z++) if (bbOpaque(E.get(i, j, z))) { goal('pethouse'); break; }
      break;
    }
    // the themed goals after the frame that shows the block is painted (a tap shows at once, R-03 B1)
    if (!FX.th) { FX.th = 1; requestAnimationFrame(() => setTimeout(() => { FX.th = 0; if (BB === E) themed(); }, 0)); }
  }

  /* ---- after a change: save, progress, buttons ---- */
  function bbProg() {
    const p = $('#bbprog');
    if (p) p.textContent = E.prog() + '/' + E.goal.size + (E.miss ? ' · ' + E.miss + (E.miss == 1 ? ' mistake' : ' mistakes') : '');
    if (mode == 'count') { const [a, b, c] = E.box(E.mine()), t = $('#bbtaskt'); if (t) t.textContent = `Build it ${bbDimsSay(E.dims)}.` + (E.prog() ? ` Now: ${bbBoxSay(a, b, c, E.dims)}.` : ' Count as you go!'); }
  }
  function after() {
    if (bp) bbProg(); else bbSaveSoon();
    for (const [id, ok] of [['#bbundo', E.undo.length], ['#bbredo', E.redo.length]]) { const b = $(id); if (b) b.setAttribute('aria-disabled', ok ? 'false' : 'true'); }
    E.dirty = 1;
  }
  let lastLayer = E.layer();
  function layerNote() {
    const L = E.layer();
    if (!bp || !E.ghosts() || L == null || L === lastLayer) { lastLayer = L; return; }
    lastLayer = L;
    if (mode == 'pat') { say1('Next layer! Keep the pattern going.', 'info', 2200); return; }
    const want = [...new Set(E.todo().map(n => E.goal.get(n)))];
    say1('Next layer! ' + (want.length == 1 ? 'It needs ' + BLOCKS[want[0]].n + '.' : 'Copy the see-through blocks.'), 'info', 2200);
    if (!want.includes(E.sel)) hintBlock(want[0], false);
  }
  function hintBlock(v, scroll = true) {
    const q = $(`[data-b="${v}"]`);
    if (!q) return;
    q.classList.remove('hint');
    void q.offsetWidth;
    q.classList.add('hint');
    setTimeout(() => q.classList.remove('hint'), 2400);
    if (scroll && q.scrollIntoView) try { q.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' }); } catch (e) {}
  }
  // what a tap (or a lifted aim) did: sound, effects, messages
  function result(r) {
    if (r.kind == 'place') {
      const top = Math.max(...r.cells.map(n => cellXYZ(n)[2]));
      if (r.cells.length == 1) E.drop = { i: r.cells[0], t: performance.now(), dz: 1.2 };
      tone(300 + top * 50, .08, 0, 'square', .08); tone(600 + top * 50, .06, .04, 'sine', .1);
      if (r.cells.length > 3) { tone(800, .08, .08, 'sine', .1); tone(1000, .1, .14, 'sine', .1); }
      if (typeof buzz == 'function') buzz(15); // R-03 A4: a short buzz on a block placed (Grown-ups "Buzz", never in Calm mode)
      flash(r.cells);
      after();
      if (bp) { if (r.win) setTimeout(bbWin, 450); else layerNote(); } else checkGoals(r.cells, r.tool);
    } else if (r.kind == 'break') {
      if (E.mk) for (const n of r.cells) E.mk[n] = 0;
      SFX.hit(); puff(...r.at, r.v); after();
    } else if (r.kind == 'light') {
      light(...r.at, 1.6); say1('Stand back! 3, 2, 1...', 'info', 1500);
    } else if (r.kind == 'notnt') {
      say1('Boom lights TNT. Tap a red TNT block!', 'info');
    } else if (r.kind == 'wrong') {
      SFX.wrong();
      // a pattern build: the first wrong colour at a spot asks the child to look again; the second shows the right block
      if (mode == 'pat' && r.tries < 2) say1('Look at the pattern again. Which colour comes next?', 'try', 2600);
      else { say1('This one needs ' + BLOCKS[r.want].n + '. It is shining below.', 'try', 2400); hintBlock(r.want); }
      bbProg();
      FX.pulse = { n: r.idx, t: performance.now() };
    } else if (r.kind == 'big') { // G-01b count: that block would make it too wide or too tall; it is not built
      SFX.wrong();
      const D = E.dims;
      say1(r.why == 'h' ? `That makes it ${r.box[2]} tall. It should be ${D.h} tall.` : `That makes it too big. It should be ${bbDimsSay(D)}.`, 'try', 2800);
      bbProg();
      FX.pulse = { n: r.idx, t: performance.now() };
    } else if (r.kind == 'wait') {
      say1('Build the blocks that hold it up first.', 'info', 2200);
      FX.pulse = { all: 1, t: performance.now() };
    } else if (r.kind == 'miss') {
      say1(!bp || E.ghosts() ? 'Tap a see-through block to build it.' : mode == 'count' ? 'Tap on the ground to build.' : mode == 'fix' ? 'Tap where a block is missing.' : 'Build it on the ground, like the picture.', 'info');
      FX.pulse = E.ghosts() || mode == 'fix' ? { all: 1, t: performance.now() } : null;
    } else if (r.kind == 'high') say1('That is as high as it goes!', 'info');
    else if (r.kind == 'deco') { SFX.wrong(); say1('Put it on top of a block.', 'try'); }
    else if (r.clear) tip('Clear area: hold, then slide over the blocks to clear.');
    else if (r.why == 'sky') say1('Tap on the island to build.', 'info', 1500);
    else if (r.why == 'full') say1('No room there. Try another spot.', 'info', 1500);
  }

  /* ---- the frame loop: camera moves, the turn, TNT, particles, animals, the preview and the magnifier ---- */
  function frame() {
    if (!document.body.contains(cv)) return;
    requestAnimationFrame(frame);
    const now = performance.now(), dt = Math.min(.05, FX.last ? (now - FX.last) / 1000 : 0);
    FX.last = now;
    let fast = false;
    if (FX.anim) { // a smooth turn or zoom
      const a = FX.anim, p = Math.min(1, (now - a.t0) / a.ms), e = 1 - Math.pow(1 - p, 3);
      if (a.ang != null) { E.ang = a.ang0 + (a.ang - a.ang0) * e; fast = p < 1; }
      if (a.zoom != null) { E.zoom = a.zoom0 * Math.pow(a.zoom / a.zoom0, e); E.clamp(); }
      if (p >= 1) { if (a.ang != null) E.ang = a.ang; FX.anim = null; }
      E.dirty = 1;
    }
    if (E.drop) { const p = (now - E.drop.t) / 170; E.drop.dz = p >= 1 ? 0 : (1 - p) * (1 - p) * 1.2; if (p >= 1) E.drop = null; E.dirty = 1; }
    for (const f of FX.fuses) { f.t -= dt; if (f.t <= 0) { f.done = 1; boom(f); } }
    FX.fuses = FX.fuses.filter(f => !f.done);
    for (const an of E.animals) {
      if (an.hop < 1) {
        an.hop = Math.min(1, an.hop + dt / .32);
        const k = an.hop;
        an.x = an.fx + (an.tx - an.fx) * k; an.y = an.fy + (an.ty - an.fy) * k; an.z = an.fz + (an.tz - an.fz) * k; // the hop's height: bbHopShape
        an.gz = Math.max(an.fz, an.tz);
      } else {
        const cz = E.topZ(Math.round(an.x), Math.round(an.y));
        if (cz > 0 && cz != an.z) an.z = cz;
        an.gz = an.z;
        an.t -= dt;
        if (an.t <= 0) {
          an.t = .5 + Math.random() * 1.4;
          const [dx, dy] = pick([[1, 0], [-1, 0], [0, 1], [0, -1]]), nx = Math.round(an.x) + dx, ny = Math.round(an.y) + dy, nz = E.topZ(nx, ny);
          if (nx >= 0 && ny >= 0 && nx < BW && ny < BD && nz > 0 && nz < BH && Math.abs(nz - Math.round(an.z)) <= 1 && E.get(nx, ny, nz - 1) != 10) {
            const p0 = E.proj(an.x + .5, an.y + .5, an.z), p1 = E.proj(nx + .5, ny + .5, nz); // face the way it hops on the screen
            Object.assign(an, { fx: an.x, fy: an.y, fz: Math.round(an.z), tx: nx, ty: ny, tz: nz, hop: 0, dir: Math.abs(p1[0] - p0[0]) > 1 ? Math.sign(p1[0] - p0[0]) : an.dir });
          }
        }
      }
    }
    for (const p of FX.parts) { p.l -= dt; if (p.vx !== undefined) { p.x += p.vx * dt * 20; p.y += p.vy * dt * 20; if (!p.smoke) p.vy += E.a() * dt * 1.6; } }
    FX.parts = FX.parts.filter(p => p.l > 0);
    FX.flash = FX.flash.filter(f => now - f.t < 900);
    if (FX.pulse && now - FX.pulse.t > 1200) FX.pulse = null;
    if (G1.spin) { // G-BB2: a flicked turn slows down by itself
      E.orbit(G1.spin * dt * 60, 0);
      G1.spin *= Math.pow(.04, dt);
      if (Math.abs(G1.spin) < .3) { G1.spin = 0; E.rot = Math.round(E.ang / (Math.PI / 2)); }
      E.dirty = 1;
    }
    bbMusic(FX, world ? bbWType(world) : chap ? chap.world : 'island');
    if (E.dirty) { scene(fast); E.dirty = 0; }
    const A = E.a();
    if (G3) { // G-BB2: the 3D frame (every frame: water moves, animals hop), then the overlay only when something on it changed
      let sh = [0, 0];
      if (FX.shake > 0) { FX.shake -= dt; if (!bbCalm()) sh = [(Math.random() - .5) * .5 * FX.shake, (Math.random() - .5) * .5 * FX.shake]; }
      E.F[0] += sh[0]; E.F[1] += sh[1];
      const fog = bbRgb(E.night ? 'sc:night-1' : 'sc:' + E.sky[1]).map(v => v / 255);
      const ok = G3.draw(E, { t: (now - FX.t0) / 1000, night: E.night, fog, animals: E.animals, pet: pet() });
      for (const an of E.animals) { const p = E.proj(an.x + .5, an.y + .5, an.z + .45); an.sx = p[0]; an.sy = p[1]; }
      E.F[0] -= sh[0]; E.F[1] -= sh[1];
      if (!ok) { bbLost(); return; }
      bbAdapt(now);
      const busy3 = FX.parts.length || FX.fuses.length || FX.flash.length || FX.pulse || G1.aim || G1.hold;
      const gl = bp && E.ghosts() && E.layer() != null, key = gl ? [E.ang, E.tilt, E.zoom, E.F.join(), cv.width, cv.height, E.prog()].join() : '';
      if (!busy3 && !FX.dirty && key === FX.key) return;
      FX.key = key;
      x.setTransform(1, 0, 0, 1, 0, 0);
      x.clearRect(0, 0, cv.width, cv.height);
      if (gl) ghostLines();
      if (!busy3) { FX.dirty = 0; return; }
      FX.dirty = 1;
    } else {
      const busy = FX.parts.length || FX.fuses.length || E.animals.length || FX.shake > 0 || FX.flash.length || FX.pulse || G1.aim || G1.hold;
      if (!busy) { if (FX.dirty) { x.setTransform(1, 0, 0, 1, 0, 0); x.drawImage(bg, 0, 0); FX.dirty = 0; } return; }
      FX.dirty = 1;
      let sh = 0;
      if (FX.shake > 0) { FX.shake -= dt; sh = (Math.random() - .5) * A * .6 * FX.shake; }
      x.setTransform(1, 0, 0, 1, 0, 0);
      x.drawImage(bg, sh, sh * .7);
    }
    // a lit fuse blinks
    for (const f of FX.fuses) { x.globalAlpha = Math.sin(now / (f.t < .6 ? 40 : 90)) * .35 + .4; outline(f.i, f.j, f.k, bbCol('white'), null, true); x.globalAlpha = 1; }
    // just built: a bright outline that fades (stamps no longer vanish into the scene)
    for (const f of FX.flash) { const [i, j, k] = cellXYZ(f.n); x.globalAlpha = 1 - (now - f.t) / 900; outline(i, j, k, null, bbCol('yellow-1')); }
    x.globalAlpha = 1;
    if (FX.pulse) { // a wrong tap or a tap away: the see-through blocks of this layer bounce a little
      const p = (now - FX.pulse.t) / 1200, al = Math.sin(p * Math.PI * 4) * .5 + .5;
      x.globalAlpha = al * (1 - p);
      for (const n of FX.pulse.all ? E.todo() : [FX.pulse.n]) { const [i, j, k] = cellXYZ(n); outline(i, j, k, null, bbCol('yellow-2')); }
      x.globalAlpha = 1;
    }
    // the place-here preview while aiming: block colour, a thick dark edge and a white inner edge
    if (G1.aim && G1.prev && G1.prev.length) {
      const del = E.tool == 'break' || E.tool == 'clear', pul = Math.sin(now / 160) * .12 + .62;
      for (const [i, j, k, v] of G1.prev.slice(0, 300)) {
        x.globalAlpha = pul;
        outline(i, j, k, del ? bbA('orange', .55) : v && BLOCKS[v] && !BLOCKS[v].deco ? bbFlat3(v)[0] : bbA('white', .6), null, true);
        x.globalAlpha = 1;
        outline(i, j, k, null, bbCol('ink'), false, Math.max(2.5, A * .1));
        outline(i, j, k, null, bbCol(del ? 'yellow' : 'white'), false, Math.max(1.2, A * .045));
      }
      if (G1.prev.length > 1) {
        const l = G1.prev[G1.prev.length - 1], p = E.proj(l[0] + .5, l[1] + .5, l[2] + 1.6);
        x.font = `bold ${Math.round(A * .8)}px sans-serif`; x.textAlign = 'center'; x.lineWidth = A * .15;
        x.strokeStyle = bbA('ink', .6); x.fillStyle = bbCol('white');
        x.strokeText('x' + G1.prev.length, p[0], p[1]); x.fillText('x' + G1.prev.length, p[0], p[1]);
      }
    }
    // the hold ring: a circle that closes while the finger rests (then aiming starts)
    if (G1.hold) {
      const p = Math.min(1, (now - G1.hold.t) / BB_HOLD), r = 26 * dpr;
      x.lineWidth = 5 * dpr; x.strokeStyle = bbA('white', .9);
      x.beginPath(); x.arc(G1.hold.x, G1.hold.y, r, -Math.PI / 2, -Math.PI / 2 + p * Math.PI * 2); x.stroke();
    }
    // animals (2D look; the 3D look draws them in the scene): drawn pictures with a hop (B2), a soft shadow under each
    if (!G3) {
      const order = E.animals.map(an => { const c = Math.cos(E.ang), s = Math.sin(E.ang), dx = an.x - E.F[0], dy = an.y - E.F[1]; return [dx * c - dy * s + dx * s + dy * c, an]; }).sort((p, q) => p[0] - q[0]);
      for (const [, an] of order) {
        const [up, sw, shh] = bbHopShape(an.hop, (now - FX.t0) / 1000 + (an.ph || 0));
        const p = E.proj(an.x + .5, an.y + .5, an.z + up), gd = E.proj(an.x + .5, an.y + .5, an.gz != null ? an.gz : Math.floor(an.z + .01));
        an.sx = p[0]; an.sy = p[1] - A * .4;
        x.fillStyle = bbA('ink', .18 * (1 - up)); x.beginPath(); x.ellipse(gd[0], gd[1], A * .4 * (1 - up * .5), A * .17 * (1 - up * .5), 0, 0, 7); x.fill();
        const img = bbAnimalImg(an.k), sz = A * 1.25;
        x.save(); x.translate(p[0], p[1] + A * .12); if (an.dir < 0) x.scale(-1, 1);
        if (img) x.drawImage(img, -sz * sw / 2, -sz * shh, sz * sw, sz * shh);
        else { x.fillStyle = bbCol('pink'); x.beginPath(); x.arc(0, -A * .45, A * .38, 0, 7); x.fill(); }
        x.restore();
      }
    }
    for (const p of FX.parts) {
      x.globalAlpha = Math.min(1, p.l * 1.5);
      if (p.flash) {
        const g2 = x.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.s);
        g2.addColorStop(0, bbCol('white')); g2.addColorStop(.4, bbA('yellow', .8)); g2.addColorStop(1, bbA('orange', 0));
        x.fillStyle = g2; x.globalAlpha = Math.min(1, p.l * 4); x.beginPath(); x.arc(p.x, p.y, p.s, 0, 7); x.fill();
      } else if (p.smoke) { x.fillStyle = bbCol('grey-3'); x.globalAlpha = Math.min(.5, p.l * .4); x.beginPath(); x.arc(p.x, p.y, p.s * (2 - p.l * .5), 0, 7); x.fill(); }
      else if (p.heart) { x.fillStyle = bbCol('pink-2'); heart(p.x, p.y, p.s); }
      else { x.fillStyle = p.c; x.fillRect(p.x - p.s / 2, p.y - p.s / 2, p.s, p.s); x.fillStyle = bbA('ink', .2); x.fillRect(p.x - p.s / 2, p.y, p.s, p.s / 2); }
    }
    x.globalAlpha = 1;
    // the magnifier bubble while aiming (R-02 #6: kept), with a cross over the target
    if (G1.aim && G1.fp) {
      const [fx, fy] = G1.fp, Rr = Math.min(cv.width, cv.height) * .16, src = Rr * .9;
      const ly = fy - Rr * 1.9 < Rr + 4 ? fy + Rr * 1.9 : fy - Rr * 1.9, lx = Math.max(Rr + 4, Math.min(cv.width - Rr - 4, fx));
      x.save(); x.beginPath(); x.arc(lx, ly, Rr, 0, 7); x.closePath(); x.fillStyle = bbCol('sc:sky'); x.fill(); x.clip();
      x.imageSmoothingEnabled = false;
      if (G3) x.drawImage(glcv, fx - src / 2, fy - src / 2, src, src, lx - Rr, ly - Rr, Rr * 2, Rr * 2); // the 3D scene, then what is drawn over it
      x.drawImage(cv, fx - src / 2, fy - src / 2, src, src, lx - Rr, ly - Rr, Rr * 2, Rr * 2); x.restore();
      x.strokeStyle = bbCol('white'); x.lineWidth = 5 * dpr; x.beginPath(); x.arc(lx, ly, Rr, 0, 7); x.stroke();
      x.strokeStyle = bbA('ink', .45); x.lineWidth = 1.5 * dpr; x.beginPath(); x.arc(lx, ly, Rr + 3 * dpr, 0, 7); x.stroke();
      x.strokeStyle = bbCol('ink'); x.lineWidth = 2.5 * dpr; x.beginPath();
      x.moveTo(lx - 10 * dpr, ly); x.lineTo(lx + 10 * dpr, ly); x.moveTo(lx, ly - 10 * dpr); x.lineTo(lx, ly + 10 * dpr); x.stroke();
    }
  }
  // G-BB2: the outline of each see-through block of the layer to build (the 3D look draws them over the scene)
  function ghostLines() {
    const A = E.a();
    for (const n of E.todo()) {
      const [i, j, k] = cellXYZ(n);
      outline(i, j, k, null, bbA('ink', .78), false, Math.max(2, A * .08));
      x.setLineDash([A * .18, A * .1]);
      outline(i, j, k, null, bbCol('white'), false, Math.max(1.2, A * .04));
      x.setLineDash([]);
    }
  }
  // the 3D canvas stopped (its context was lost): keep the world and open it again in the 2D look for this visit
  function bbLost() {
    BB_NOGL = 1;
    try { logErr('Block Builder 3D: the WebGL context was lost; the 2D look is used'); } catch (e) {}
    if (!bp) bbSave();
    setTimeout(() => { if ($('#bbc') === cv) blockBuilder(ci); }, 0);
  }
  /* adaptive size (like Star Rally): when frames keep coming slowly, draw fewer pixels (85, 70, 60 %); back up when there is room */
  function bbAdapt(now) {
    const ft = FX.ft;
    ft.push(now);
    if (ft.length < 40) return;
    const per = (ft[ft.length - 1] - ft[0]) / (ft.length - 1);
    ft.length = 0;
    const steps = [1, .85, .7, .6], i = steps.indexOf(FX.scale);
    let n = i;
    if (per > 45 && i < steps.length - 1) n = i + 1;
    else if (per < 22 && i > 0) n = i - 1;
    if (n != i) { FX.scale = steps[n]; E.scale = FX.scale; size(); }
  }
  function heart(px, py, s) {
    x.beginPath(); x.moveTo(px, py + s * .3);
    x.bezierCurveTo(px - s * .6, py - s * .1, px - s * .3, py - s * .6, px, py - s * .25);
    x.bezierCurveTo(px + s * .3, py - s * .6, px + s * .6, py - s * .1, px, py + s * .3); x.fill();
  }
  // a cube's outline (stroke) or fill at the current view
  function outline(i, j, k, fill, stroke, solid, lw) {
    const P = E.proj, z1 = k + 1;
    const T = [P(i, j, z1), P(i + 1, j, z1), P(i + 1, j + 1, z1), P(i, j + 1, z1)], Bt = [P(i, j, k), P(i + 1, j, k), P(i + 1, j + 1, k), P(i, j + 1, k)];
    // the silhouette: the top's corners and the bottom corners that show (the lowest three on screen)
    const all = T.concat(Bt), cx = all.reduce((s, p) => s + p[0], 0) / 8, cy = all.reduce((s, p) => s + p[1], 0) / 8;
    const hull = bbHull(all);
    x.beginPath(); hull.forEach((p, n) => n ? x.lineTo(...p) : x.moveTo(...p)); x.closePath();
    if (fill) { x.fillStyle = fill; x.fill(); }
    if (stroke) {
      x.strokeStyle = stroke; x.lineWidth = lw || Math.max(2, E.a() * .08); x.lineJoin = 'round'; x.stroke();
      if (!solid) { // the top edges too, so it reads as a cube
        x.beginPath(); T.forEach((p, n) => n ? x.lineTo(...p) : x.moveTo(...p)); x.closePath(); x.stroke();
      }
    }
    return [cx, cy];
  }

  /* ---- touch: tap builds, one finger moves the view, hold then slide aims (or draws a shape), two fingers pinch ---- */
  const G1 = { ptrs: new Map(), g: null, pinch: null, aim: false, prev: null, fp: null, hold: null, spin: 0 };
  BB.gest = G1;
  const cpos = (cx, cy) => { const r = cv.getBoundingClientRect(); return [(cx - r.left) * dpr, (cy - r.top) * dpr]; };
  // the cells the aim shows: from where the hold started (t0) to under the finger now
  function aimAt(p) {
    G1.fp = p;
    const T = E.tool;
    if (bp) {
      G1.prev = null;
      const r = E.hit(p[0], p[1], q => q.ghost);
      if (r) G1.prev = [[r.i, r.j, r.k, E.goal.get(bbI(r.i, r.j, r.k))]];
      return;
    }
    if (T == 'break' || T == 'boom' || T == 'clear') {
      const h = E.hit(p[0], p[1], q => !q.ghost);
      if (T == 'clear' && G1.t0) {
        const [gx, gy] = E.unproj(p[0], p[1], G1.t0.k + 1), t1 = { i: Math.max(0, Math.min(BW - 1, Math.floor(gx))), j: Math.max(0, Math.min(BD - 1, Math.floor(gy))), k: G1.t0.k };
        G1.prev = E.cells(G1.t0, t1, 'clear');
        return;
      }
      G1.prev = h ? [[h.i, h.j, h.k, 0]] : null;
      if (T == 'clear' && h) G1.t0 = { i: h.i, j: h.j, k: h.k };
      return;
    }
    if ((T == 'line' || T == 'wall' || T == 'floor') && G1.t0) {
      const [gx, gy] = E.unproj(p[0], p[1], G1.t0.k), t1 = { i: Math.max(0, Math.min(BW - 1, Math.floor(gx))), j: Math.max(0, Math.min(BD - 1, Math.floor(gy))), k: G1.t0.k };
      G1.prev = E.cells(G1.t0, t1);
      return;
    }
    const t = E.target(p[0], p[1]);
    if (T == 'build' || T == 'stamp' || !G1.t0) G1.t0 = t && !t.high ? t : null;
    G1.prev = G1.t0 ? E.cells(G1.t0, G1.t0) : null;
  }
  function startAim() {
    const g = G1.g;
    if (!g || g.mode != 'wait') return;
    g.mode = 'aim';
    G1.hold = null;
    G1.aim = true;
    G1.t0 = null;
    aimAt(g.p);
    tone(520, .04, 0, 'sine', .06);
  }
  function endAim(commit) {
    const T = E.tool, prev = G1.prev;
    G1.aim = false; G1.prev = null; G1.fp = null;
    if (!commit || !prev || !prev.length) { FX.dirty = 1; return; }
    if (bp) { const [i, j, k] = prev[0], p = E.proj(i + .5, j + .5, k + .5); result(E.bpTap(...hitPoint(i, j, k, p))); return; }
    if (T == 'break') { const [i, j, k] = prev[0], v = E.get(i, j, k); if (v) { E.push(); E.w[bbI(i, j, k)] = 0; result({ kind: 'break', at: [i, j, k], v }); } return; }
    if (T == 'boom') { const [i, j, k] = prev[0]; result(E.get(i, j, k) == BB_TNT ? { kind: 'light', at: [i, j, k] } : { kind: 'notnt' }); return; }
    if (T == 'clear') { askClear(prev); return; }
    if (prev.some(([a, b, z, v]) => T != 'stamp' && !E.decoOk(a, b, z, v))) { result({ kind: 'deco' }); return; }
    result({ kind: 'place', cells: E.put(prev), tool: T });
  }
  // the canvas point of a see-through block's middle (so a lifted aim is the same as a tap on it)
  const hitPoint = (i, j, k) => { const f = E.faces.find(q => q.ghost && q.i == i && q.j == j && q.k == k && q.f == 'top'); if (!f) return E.proj(i + .5, j + .5, k + 1); const p = f.poly; return [(p[0][0] + p[2][0]) / 2, (p[0][1] + p[2][1]) / 2]; };
  function askClear(cells) {
    const n = cells.length;
    const s = UI.sheet(`<div class="bb-sheet"><h2>Clear ${n} ${n == 1 ? 'block' : 'blocks'}?</h2><p>Undo can bring them back.</p>` +
      `<div class="acts">${UI.btn('Clear them', { kind: 'primary', size: 'lg', icon: 'trash', id: 'bbclr', wide: true })}${UI.btn('Keep them', { icon: 'close', id: 'bbkeep', wide: true })}</div></div>`);
    s.el.querySelector('#bbclr').onclick = () => {
      s.close();
      E.push();
      let shown = 0;
      for (const [a, b, z] of cells) { const v = E.get(a, b, z); if (!v) continue; E.w[bbI(a, b, z)] = 0; if (shown++ < 14) puff(a, b, z, v); }
      SFX.hit(); after();
    };
    s.el.querySelector('#bbkeep').onclick = () => s.close();
  }
  cv.addEventListener('pointerdown', e => {
    e.preventDefault();
    try { cv.setPointerCapture(e.pointerId); } catch (er) {}
    G1.ptrs.set(e.pointerId, [e.clientX, e.clientY]);
    if (G1.ptrs.size == 2) { // two fingers: pinch (whatever the first finger was doing stops)
      if (G1.g && G1.g.timer) clearTimeout(G1.g.timer);
      G1.g = null; G1.aim = false; G1.prev = null; G1.hold = null; G1.fp = null;
      const [p1, p2] = [...G1.ptrs.values()];
      G1.pinch = { d: Math.hypot(p1[0] - p2[0], p1[1] - p2[1]), mx: (p1[0] + p2[0]) / 2, my: (p1[1] + p2[1]) / 2 };
      return;
    }
    if (G1.ptrs.size > 2 || G1.pinch) return;
    G1.spin = 0; // a finger stops a flicked turn
    const p = cpos(e.clientX, e.clientY);
    // an animal under the finger turns round with a heart; the tap still builds (R-02 #4: animals never get in the way)
    const an = E.animals.find(a => a.sx && Math.hypot(a.sx - p[0], a.sy - p[1]) < E.a() * .6);
    if (an) {
      an.dir *= -1;
      FX.parts.push({ x: an.sx, y: an.sy - E.a() * .4, vx: 0, vy: -E.a() * .05, l: 1, heart: 1, smoke: 1, s: E.a() * .8 });
    }
    G1.g = { id: e.pointerId, p0: p, p, last: p, t0: performance.now(), mode: 'wait' };
    G1.hold = { x: p[0], y: p[1], t: performance.now() };
    G1.g.timer = setTimeout(startAim, BB_HOLD);
  });
  cv.addEventListener('pointermove', e => {
    if (!G1.ptrs.has(e.pointerId)) return;
    G1.ptrs.set(e.pointerId, [e.clientX, e.clientY]);
    if (G1.pinch && G1.ptrs.size >= 2) {
      const [p1, p2] = [...G1.ptrs.values()], d = Math.hypot(p1[0] - p2[0], p1[1] - p2[1]), mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2;
      const m = cpos(mx, my);
      if (G1.pinch.d > 0) E.zoomAt(d / G1.pinch.d, m[0], m[1]);
      E.pan((mx - G1.pinch.mx) * dpr, (my - G1.pinch.my) * dpr);
      Object.assign(G1.pinch, { d, mx, my });
      E.dirty = 1;
      return;
    }
    const g = G1.g;
    if (!g || g.id != e.pointerId) return;
    const p = cpos(e.clientX, e.clientY);
    g.p = p;
    if (g.mode == 'wait' && Math.hypot(p[0] - g.p0[0], p[1] - g.p0[1]) > BB_SLOP * dpr) { // a drag: move the view
      clearTimeout(g.timer);
      g.mode = 'pan';
      G1.hold = null;
    }
    if (g.mode == 'pan') { // 2D: the world follows the finger; 3D (G-BB2): one finger turns and tilts the view
      const dx = p[0] - g.last[0], dy = p[1] - g.last[1];
      if (G3) { E.orbit(dx, dy); g.vx = dx * .6 + (g.vx || 0) * .4; } else E.pan(dx, dy);
      g.last = p; g.tm = performance.now(); E.dirty = 1;
    }
    else if (g.mode == 'aim') aimAt(p);
  });
  const up = e => {
    G1.ptrs.delete(e.pointerId);
    if (G1.pinch) { if (G1.ptrs.size < 2) { G1.pinch = null; G1.g = null; } return; }
    const g = G1.g;
    if (!g || g.id != e.pointerId) return;
    clearTimeout(g.timer);
    G1.g = null; G1.hold = null;
    if (g.mode == 'wait') result(E.tap(...g.p0));
    else if (g.mode == 'aim') endAim(true);
    else if (g.mode == 'pan' && G3) { // a flick keeps turning a little (not in calm mode); the stamp's turn follows the view
      if (!bbCalm() && performance.now() - (g.tm || 0) < 90 && Math.abs(g.vx || 0) > 2) G1.spin = Math.max(-40, Math.min(40, g.vx));
      else E.rot = Math.round(E.ang / (Math.PI / 2));
    }
    FX.dirty = 1;
  };
  cv.addEventListener('pointerup', up);
  cv.addEventListener('pointercancel', e => {
    G1.ptrs.delete(e.pointerId);
    if (G1.g) clearTimeout(G1.g.timer);
    G1.g = null; G1.pinch = null; G1.hold = null;
    endAim(false);
  });
  cv.addEventListener('wheel', e => { e.preventDefault(); const p = cpos(e.clientX, e.clientY); E.zoomAt(e.deltaY < 0 ? 1.12 : 1 / 1.12, p[0], p[1]); E.dirty = 1; }, { passive: false });

  /* ---- the tool bar and the palette ---- */
  const TIPS = {
    build: G3 ? 'Tap to build. Drag to turn. Two fingers move and zoom.' : 'Tap to build. Drag to look around.',
    break: 'Tap a block to break it, one at a time.',
    stamp: 'Pick a stamp below, then tap where it goes.',
    boom: 'Tap a TNT block to light it. Undo puts everything back.',
    line: 'Line: hold, then slide to draw a line of blocks.',
    wall: 'Wall: hold, then slide to build a wall 3 blocks tall.',
    floor: 'Floor: hold, then slide to fill a floor.',
    clear: 'Clear area: hold, then slide over the blocks to clear.',
  };
  const EXTRA = { line: ['line', 'Line'], wall: ['wall', 'Wall'], floor: ['floor', 'Floor'], clear: ['trash', 'Clear'] };
  function setTool(t, quiet) {
    E.tool = t;
    for (const q of $$('[data-tool]')) q.setAttribute('aria-pressed', String(q.dataset.tool == t));
    const more = $('#bbmore');
    if (more) { // More shows the extra tool that is on (Line, Wall, Floor, Clear), pressed
      const ex = EXTRA[t] || ['more', 'More'];
      more.innerHTML = bbIco(ex[0]) + `<span>${ex[1]}</span>`;
      more.setAttribute('aria-pressed', String(!!EXTRA[t]));
    }
    const st = $('#bbst');
    if (st) { st.hidden = t != 'stamp'; $('#bbpal').hidden = t == 'stamp'; edges(); }
    if (!quiet && !bp) tip(TIPS[t] || '');
  }
  for (const b of $$('.bb-seg [data-tool], #bbboom')) b.onclick = () => { const t = b.dataset.tool; setTool(E.tool == t && t == 'boom' ? 'build' : t); SFX.pop(1); };
  for (const b of $$('[data-b]')) b.onclick = () => {
    const i = +b.dataset.b, B = BLOCKS[i], left = need ? 0 : lockLeft(B), jl = need ? null : bbBlockLock(i);
    if (left) { SFX.wrong(); anim(b, 'sad'); say1(`Earn ${left} more ${left == 1 ? 'star' : 'stars'} in learning to unlock ${B.n}.`, 'info', 2800); return; }
    if (jl) { SFX.wrong(); anim(b, 'sad'); say1(B.n + ': ' + jl.why, 'info', 2800); return; }
    E.sel = i;
    for (const q of $$('[data-b]')) q.setAttribute('aria-pressed', String(q == b));
    SFX.pop(2);
    // choosing a block never switches the tool without saying so (R-02 #16)
    if (!bp && (E.tool == 'break' || E.tool == 'boom' || E.tool == 'clear')) { setTool('build', true); say1('Build: ' + B.n, 'info', 1400); anim($('#bbm-build'), 'jump'); }
  };
  for (const b of $$('[data-stamp]')) b.onclick = () => {
    const st = BBSTAMPS[+b.dataset.stamp];
    if (!bbStampOk(st)) { SFX.wrong(); anim(b, 'sad'); say1(`${st.n}: open ${BB_CHS[st.ch].n} in the blueprints to unlock it.`, 'info', 2800); return; }
    E.stamp = +b.dataset.stamp;
    for (const q of $$('[data-stamp]')) q.setAttribute('aria-pressed', String(q == b));
    SFX.pop(2);
  };
  // the palette's scroll edges: a soft fade shows there is more on that side
  function edges() {
    for (const p of $$('.bb-pal')) {
      const s = p.firstElementChild;
      if (!s) continue;
      const v = getComputedStyle(s).flexDirection == 'column';
      const a = v ? s.scrollTop : s.scrollLeft, m = v ? s.scrollHeight - s.clientHeight : s.scrollWidth - s.clientWidth;
      p.classList.toggle('can-a', a > 2);
      p.classList.toggle('can-b', a < m - 2);
      p.classList.toggle('vert', v);
    }
  }
  for (const s of $$('.bb-ps')) s.addEventListener('scroll', edges, { passive: true });
  $('#bbundo').onclick = () => { if (E.doUndo()) { SFX.del(); after(); if (bp) lastLayer = E.layer(); } else say1('Nothing to undo yet.', 'info', 1200); };
  $('#bbredo').onclick = () => { if (E.doRedo()) { SFX.pop(2); after(); if (bp) lastLayer = E.layer(); } else say1('Nothing to redo.', 'info', 1200); };
  const turn = d => {
    G1.spin = 0;
    E.rot = Math.round(E.ang / (Math.PI / 2)) + d; // from where the view is now (3D: it may have been turned by a finger)
    FX.anim = { t0: performance.now(), ms: 360, ang0: E.ang, ang: E.rot * Math.PI / 2 };
    SFX.whoosh();
  };
  $('#bbrl').onclick = () => turn(-1);
  $('#bbrr').onclick = () => turn(1);
  const zoomBy = k => { FX.anim = { t0: performance.now(), ms: 240, zoom0: E.zoom, zoom: Math.max(E.zMin(), Math.min(E.zMax(), E.zoom * k)) }; SFX.pop(1); };
  $('#bbzi').onclick = () => zoomBy(1.4);
  $('#bbzo').onclick = () => zoomBy(1 / 1.4);
  if ($('#bbmore')) $('#bbmore').onclick = () => more();
  if ($('#bbpj')) $('#bbpj').onclick = () => { const G = bbGoalId($('#bbpj').dataset.pj); if (G) { SFX.pop(1); say1(bbGoalLine(world, G), 'info', 3200); say(bbGoalLine(world, G)); } };
  // More: the shape tools, Clear area, night, animals, building on the sides, save to the gallery, this world's next goals
  function more() {
    const t = (id, icon, label, on) => `<button class="bb-mt" data-mt="${id}" aria-pressed="${on ? 'true' : 'false'}">${bbIco(icon, 28)}<span>${esc(label)}</span></button>`;
    const nx = bbGoalNext(world, 3), gn = bbGoalN(world), gt = bbWGoals(world).length, pjs = bbWGoals(world).filter(G => G[4]);
    // G-BB3: each goal reads itself aloud when tapped; the two big projects with a dot a step
    const gl = G => `<li><button class="bb-gl" data-gsay="${esc(G[0])}">${bbIco(G[2], 24)}<span>${esc(bbGoalLine(world, G))}</span>${ico('speak', 20)}</button></li>`;
    const pjRow = G => {
      const s0 = bbPjN(world, G), n = G[4].length, dn = s0 >= n;
      return `<li><button class="bb-gl bb-pjr${dn ? ' on' : ''}" data-gsay="${esc(G[0])}">${bbIco(dn ? 'check-circle' : G[2], 24)}<span><b>${esc(G[1])}</b>` +
        `<span class="bb-pjd" aria-hidden="true">${G[4].map((q, k) => `<i class="${k < s0 ? 'on' : k == s0 ? 'now' : ''}"></i>`).join('')}</span>` +
        `<span class="bb-pjs">${dn ? 'Done!' : esc(`Step ${s0 + 1} of ${n}: ${G[4][s0][0]}`)}</span></span>${ico('speak', 20)}</button></li>`;
    };
    const s = UI.sheet(`<div class="bb-sheet bb-more"><h2>More tools</h2>
      <div class="bb-mts">${t('line', 'line', 'Line', E.tool == 'line')}${t('wall', 'wall', 'Wall', E.tool == 'wall')}${t('floor', 'floor', 'Floor', E.tool == 'floor')}` +
      `${t('clear', 'trash', 'Clear area', E.tool == 'clear')}${t('night', E.night ? 'sparkle' : 'moon', E.night ? 'Day' : 'Night', false)}${t('pet', 'paw', 'Add animal', false)}</div>
      ${UI.sw('Build on the sides of blocks', E.side, 'bbside')}${bbGlOk() ? UI.sw('3D look', !!G3, 'bb3d') : ''}
      ${UI.btn('Save a picture to my gallery', { size: 'lg', icon: 'image', id: 'bbgal', wide: true })}
      <h3>Goals in this world <span class="bb-gn">${gn} of ${gt} done</span></h3>` +
      (nx.length ? `<ul class="bb-goals">${nx.map(gl).join('')}</ul>` : `<p class="bb-alldone">${ico('check-circle', 24)}<span>Every goal in this world is done!</span></p>`) +
      `<h3>Big projects</h3><ul class="bb-goals">${pjs.map(pjRow).join('')}</ul>` + `
      <div class="acts">${UI.btn('Done', { kind: 'primary', size: 'lg', icon: 'check', id: 'bbmdone', wide: true })}</div></div>`);
    s.el.querySelector('#bbmdone').onclick = () => s.close();
    for (const b of s.el.querySelectorAll('[data-gsay]')) b.onclick = () => { const G = bbGoalId(b.dataset.gsay); SFX.pop(1); say(bbGoalLine(world, G)); };
    s.el.querySelector('#bbgal').onclick = () => { s.close(); galSave(); };
    const s3 = s.el.querySelector('#bb3d');
    if (s3) s3.onchange = () => { // G-BB2: the 3D look or the 2D drawing (saved: S.bb.gl = 0 is the 2D look); the world opens again
      s.close();
      const b = bbS();
      if (s3.checked) delete b.gl; else b.gl = 0;
      bbSave(); save();
      blockBuilder(ci);
      if (BB) BB.api.say(s3.checked ? '3D look: drag to turn the island.' : '2D look: drag to move the island.', 'info', 2200);
    };
    const sw = s.el.querySelector('#bbside');
    if (sw) sw.onchange = () => { E.side = !!sw.checked; say1(E.side ? 'Tap the side of a block to build next to it.' : 'Taps build on top again.', 'info'); };
    for (const b of s.el.querySelectorAll('[data-mt]')) b.onclick = () => {
      const k = b.dataset.mt;
      s.close();
      if (k == 'night') { E.night = !E.night; E.dirty = 1; if (G3) sky3(); SFX.whoosh(); if (E.night && E.w.includes(22)) goal('night'); themed(); return; }
      if (k == 'pet') { spawn(); return; }
      setTool(E.tool == k ? 'build' : k);
      SFX.pop(1);
    };
  }
  E.setNight = on => { E.night = !!on; E.dirty = 1; if (G3) sky3(); };
  // G-01b: a picture of this world into the gallery (12 at most: a full gallery asks to delete one on the menu first)
  function galSave() {
    const gal = bbGal();
    if (gal.length >= BB_GAL_MAX) { SFX.wrong(); say1(`Your gallery is full (${BB_GAL_MAX}). Delete one on the Block Builder menu first.`, 'info', 3200); return; }
    bbSave();
    gal.push({ n: world.name, d: bbPack(E.w), t: today() });
    save();
    SFX.chime();
    say1('Saved to your gallery! It is on the Block Builder menu.', 'good', 2800);
    goal('gal');
  }
  E.galSave = galSave;

  GH.wire({quit: () => { bbSave(); gtStop(); bbMenu(); }});
  bbSaveHook();
  // the palette pictures, the stamp pictures
  for (const c of $$('[data-bc]')) bbIcon(c.getContext('2d'), +c.dataset.bc, c.width);
  for (const c of $$('[data-sc]')) bbMini(c, BBSTAMPS[+c.dataset.sc].c.map(([a, b, z, v]) => [a + 8, b + 8, z, v]));
  // the task's picture (a picture or a fix build): the finished build; a tap makes it bigger or smaller
  if ($('#bbtpc')) {
    bbMini($('#bbtpc'), bp.c().map(([a, b, z, v]) => [a + 2, b + 2, z, v]));
    $('#bbtpic').onclick = () => { const t = $('#bbtpic'), on = t.getAttribute('aria-pressed') != 'true'; t.setAttribute('aria-pressed', String(on)); SFX.pop(1); };
  }
  const selBtn = $(`[data-b="${E.sel}"]`);
  if (selBtn) selBtn.setAttribute('aria-pressed', 'true');
  BB.api = { tap: E.tap, hit: E.hit, get faces() { return E.faces; }, proj: E.proj, size, scene: () => scene(false), say: say1, frame: () => G3 && G3.frames, gl: G3 };
  BB.resize = size;
  size();
  // the scene follows its box (the palette, the fonts and turning the tablet change it)
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => { if (!document.body.contains(cv)) { ro.disconnect(); return; } size(); });
    ro.observe(wrap);
  }
  scene(false);
  E.dirty = 0;
  if (bp) bbProg(); else goalChip();
  after();
  edges();
  requestAnimationFrame(frame);
  if (!bp) { spawn(); spawn(); }
  if (!window._bbrs) {
    window._bbrs = 1;
    let rs;
    addEventListener('resize', () => { clearTimeout(rs); rs = setTimeout(() => { if ($('#bbc') && BB && BB.resize) BB.resize(); }, 120); });
  }
  gtStart('#gtm', () => { bbSave(); timeUpOverlay(); });
  if (!bp && !bbS().seen) { bbS().seen = 1; save(); setTimeout(() => tip(TIPS.build), 500); }
  if (S.voice) setTimeout(() => say(bp ? `${bp.n}! ${bbTask(bp)}` : G3 ? 'Tap to build! Drag to turn around.' : 'Tap to build! Drag to look around.'), 300);
}
const BB_HOLD = 300, BB_SLOP = 10; // ms a finger rests before aiming starts; CSS px a finger moves before it drags the view
/* G-BB2 (R-03 B1): the world is saved once the frame that shows the tap is painted, not before it (a save writes the whole S);
   a hidden page or Quit saves at once */
let BB_SAVE_T = 0, BB_NOGL = 0;
// the 2D look draws at most 1.25 canvas pixels a CSS pixel (it was 2): a software canvas paints every pixel of the scene again after a tap
const BB_DPR2 = 1.25;
function bbSaveSoon() {
  if (BB_SAVE_T) return;
  BB_SAVE_T = 1;
  requestAnimationFrame(() => setTimeout(() => { BB_SAVE_T = 0; bbSave(); }, 0));
}
function bbSaveHook() {
  if (window._bbsh) return;
  window._bbsh = 1;
  const now = () => { if (BB && $('#bbc')) bbSave(); };
  document.addEventListener('visibilitychange', () => { if (document.hidden) now(); });
  addEventListener('pagehide', now);
}
// WebGL can be made here (checked once; a tablet whose graphics chip Chrome blocks has none, R-03 4.2)
let BB_GLOK = null;
function bbGlOk() {
  if (BB_GLOK == null) { try { const c = bbCanvas(2); BB_GLOK = !!(c.getContext('webgl')); } catch (e) { BB_GLOK = false; } }
  return BB_GLOK && !BB_NOGL;
}
const bbCalm = () => !!S.calm || (typeof matchMedia == 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches);
/* music (R-03 A1): a calm loop per kind of world, soft notes made with tone(); only with Sound effects and Music on, never in calm
   mode; it waits while a sheet (Pause, More) is open or the page is hidden, and goes quiet under the voice (the shared duck) */
const BB_TUNE = { island: [67, 0, 0, .3], mountain: [65, 1, 0, .32], desert: [64, 2, 1, .3], flat: [67, 1, 0, .3], snow: [69, 3, 0, .34], beach: [65, 0, 0, .3],
  sky: [72, 3, 0, .32], meadow: [67, 0, 0, .3] };
const BB_MEL = [[0, 2, 4, -1, 4, 2, 5, -1, 4, 2, 0, -1, 1, 2, 0, -1], [4, -1, 2, 0, 2, -1, 4, 5, 4, -1, 2, -1, 0, 2, 1, -1],
  [0, 1, 2, -1, 4, 2, 1, -1, 2, 4, 5, 4, 2, -1, 0, -1], [5, 4, 2, -1, 4, 2, 0, -1, 2, 4, 5, 7, 5, -1, 4, -1]];
const BB_SC = [[0, 2, 4, 7, 9, 12, 14, 16], [0, 3, 5, 7, 10, 12, 15, 17]];
function bbMusic(M, kind) {
  const a = typeof AC != 'undefined' && AC;
  if (!S.sound || !S.music || bbCalm() || !a || a.state != 'running' || (typeof document != 'undefined' && (document.hidden || document.querySelector('.sheet-bg.on')))) { M.mb = 0; return; }
  const [root, mi, minor, step] = BB_TUNE[kind] || BB_TUNE.island, sc = BB_SC[minor], mel = BB_MEL[mi];
  if (!M.mb || M.mb < a.currentTime) M.mb = a.currentTime + .05;
  while (M.mb < a.currentTime + .15) {
    const i = M.mi = ((M.mi || 0) + 1) % 64, n = mel[i % 16], t = M.mb - a.currentTime;
    if (n >= 0) tone(NOTE(root + sc[n]), step * 2, t, 'sine', .022);
    if (i % 8 == 0) tone(NOTE(root - 24 + [0, 5, 3, 4][(i >> 3) % 4]), step * 7, t, 'sine', .03);
    M.mb += step;
  }
}
// convex hull of points (the outline of a cube on screen)
function bbHull(pts) {
  const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]), cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [], hi = [];
  for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  for (let n = p.length - 1; n >= 0; n--) { const q = p[n]; while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], q) <= 0) hi.pop(); hi.push(q); }
  return lo.slice(0, -1).concat(hi.slice(0, -1));
}
// a blueprint (or the build of the day) is built: stars by id, coins, and what it opened (the next build, a new chapter with its
// blocks and world, a chapter's trophy and prize); the end card shows the child's build
function bbWin() {
  if (!BB || BB.ch == null || !$('#bbc')) return;
  const ci = BB.ch, day = ci == 'day', P0 = BB.bp, st = BB.miss <= 1 ? 3 : BB.miss <= 4 ? 2 : 1, bs = bbS();
  const before = BB_CHS.map((c, k) => [bbChOpen(k), bbTrophy(k)]);
  let old;
  if (day) {
    const d = bs.day && typeof bs.day == 'object' && bs.day.k == P0.day ? bs.day : { k: P0.day, s: 0 };
    old = d.s | 0;
    if (!old) bs.days = (bs.days | 0) + 1;
    d.s = Math.max(old, st);
    bs.day = d;
  } else {
    const bp = bbBP();
    old = bp[P0.id] || 0;
    bp[P0.id] = Math.max(old, st);
    if (P0.old != null) { const ch = bs.ch = Array.isArray(bs.ch) ? bs.ch : []; ch[P0.old] = Math.max(ch[P0.old] || 0, st); }
  }
  const coins = Math.max(0, st - old) * 3 + 1 + (day && !old ? 4 : 0);
  S.coins += coins;
  save();
  SFX.fanfare();
  // what opened
  const lines = BB.miss ? [] : [['check-circle', 'No mistakes!']];
  let won = null;
  BB_CHS.forEach((c, k) => {
    if (!before[k][1] && bbTrophy(k)) { won = k; lines.push(['trophy', `The ${esc(c.n)} trophy! Prize: ${esc(BLOCKS[c.prize].n)}.`]); }
    if (!before[k][0] && bbChOpen(k)) lines.push(['map', `${esc(c.n)} is open: ${c.set.map(v => esc(BLOCKS[v].n)).join(' and ')} blocks and a new world.`]);
  });
  const nx = day ? -1 : BBP.findIndex((b, i) => i > ci && bbOpen(i) && !bbStars(i));
  if (nx > 0 && !lines.some(l => l[0] == 'map')) lines.push(['go', `Next: ${esc(BBP[nx].n)}` + (bbChOf(nx) == bbChOf(ci) ? ` (${bbChDone(bbChOf(ci))} of ${BB_PER} in ${esc(BB_CHS[bbChOf(ci)].n)})` : '')]);
  if (S.voice) say(won != null ? `You won the ${BB_CHS[won].n} trophy!` : st == 3 ? 'Perfect build! Three stars!' : 'You built it!');
  // the child's build as the picture (or the trophy)
  let pic = '';
  try {
    const c = bbCanvas(360, 240);
    bbMini(c, P0.c().map(([a, b, z, v]) => [a + 2, b + 2, z, v]));
    pic = `<img class="bb-epic" src="${c.toDataURL()}" alt="Your ${esc(P0.n)}">`;
  } catch (e) { pic = ''; }
  if (won != null && typeof rlCupArt == 'function') pic = `<svg viewBox="0 0 100 100" class="art bb-etro" role="img" aria-label="Trophy">${rlCupArt('y')}</svg>`;
  // P4-16: the shared end card
  const o = GH.end('blocks', {
    win: true, title: `${P0.n} built!`, stars: st, pic: pic || undefined,
    stats: [[String(BB.miss), BB.miss == 1 ? 'mistake' : 'mistakes', 'blocks'], ['+' + coins, 'coins', 'coin']],
    lines,
    btns: NAV.end3({ again: 'bbre', next: nx > 0 ? 'bbnx' : '', home: 'bbls' }), // NAV-01
  });
  const go = f => { o.remove(); f(); };
  if (o.querySelector('#bbnx')) o.querySelector('#bbnx').onclick = () => go(() => blockBuilder(nx));
  o.querySelector('#bbre').onclick = () => go(() => blockBuilder(ci));
  o.querySelector('#bbls').onclick = () => go(() => { gtStop(); home(); });
}
/* ---- the gallery (G-01b): S.bb.gal [{n, d, t}], a picture of a world saved by the child (d: the world packed in runs, bbPack) ---- */
const BB_GAL_MAX = 12, BB_PK = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function bbGal() {
  const b = bbS();
  if (!Array.isArray(b.gal)) b.gal = [];
  if (b.gal.some(g => !g || typeof g.d != 'string')) b.gal = b.gal.filter(g => g && typeof g.d == 'string');
  return b.gal;
}
// a world as runs: a letter for the block, then how many of it (when more than one)
function bbPack(w) {
  let s = '';
  for (let n = 0; n < w.length;) {
    let k = 1;
    while (n + k < w.length && w[n + k] == w[n]) k++;
    s += BB_PK[w[n]] + (k > 1 ? k : '');
    n += k;
  }
  return s;
}
function bbUnpack(s) {
  const w = new Uint8Array(BW * BD * BH);
  let n = 0;
  for (const m of String(s).matchAll(/([a-zA-Z])(\d*)/g)) {
    const v = BB_PK.indexOf(m[1]), k = m[2] ? +m[2] : 1;
    for (let q = 0; q < k && n < w.length; q++) w[n++] = v < BLOCKS.length ? v : 0;
  }
  return w;
}
function bbSave() {
  if (!BB || BB.ch != null || !BB.world) return;
  BB.world.d = bbEncode(BB.w);
  if (BB.mk) { const m = bbMaskEnc(BB.mk); if (m) BB.world.mk = m; else delete BB.world.mk; } // G-BB3
  save();
}
// a block's picture in the palette: the cube (or the picture) on a canvas of sz x sz
function bbIcon(x, i, sz) {
  const B = BLOCKS[i];
  x.clearRect(0, 0, sz, sz);
  if (B.deco) {
    const img = B.k == 'pet' ? bbPetImg(() => { const c = document.querySelector(`[data-bc="${i}"]`); if (c) bbIcon(c.getContext('2d'), i, c.width); }) : bbSprite(B.k);
    if (img) { if (B.k == 'pet') x.drawImage(img, -sz * .2, -sz * .32, sz * 1.4, sz * 1.4); else x.drawImage(img, sz * .06, sz * .02, sz * .88, sz * .88); }
    return;
  }
  const im = bbFaceImgs(i), a = sz * .42, cx = sz / 2, top = sz * .08;
  const f = (img, O, U, V) => { x.setTransform(U[0] / BBT, U[1] / BBT, V[0] / BBT, V[1] / BBT, O[0], O[1]); x.drawImage(img, 0, 0); };
  f(im.t, [cx, top], [a, a / 2], [-a, a / 2]);
  f(im.l, [cx - a, top + a / 2], [a, a / 2], [0, a]);
  f(im.r, [cx, top + a], [a, -a / 2], [0, a]);
  x.setTransform(1, 0, 0, 1, 0, 0);
}

/* ---- the menu (G-01b): the next goal, the build of the day, the journey (four chapters of six builds), my worlds, my gallery,
   how to build. The first chapter's first builds are visible without scrolling. ---- */
// world kinds: id, name, line, the chapter that opens it (none: open from the start)
const BBWT = [['island', 'Island', 'Hills, beach, trees and sea'], ['mountain', 'Mountains', 'Tall peaks with snow on top'], ['desert', 'Desert', 'Sand, cactus and an oasis'],
  ['flat', 'Flat', 'Empty grass for big builds'], ['beach', 'Beach', 'Sand, sea, palms and shells', 1], ['snow', 'Snowy', 'Snow, ice and pine trees', 2],
  ['sky', 'Sky', 'Islands floating over the clouds', 3]];
const BB_WMAX = 8;
const bbCells = w => { const o = []; for (let n = 0; n < w.length; n++) if (w[n]) o.push([n % BW, Math.floor(n / BW) % BD, Math.floor(n / (BW * BD)), w[n]]); return o; };
const bbDayStars = () => { const d = bbS().day; return d && typeof d == 'object' && d.k == today() ? Math.min(3, d.s | 0) : 0; };
// the one line that says what to do next (like Star Rally's): the journey first, then today's build, more stars, a world's goal
function bbNextGoal() {
  for (let k = 0; k < BB_CHS.length; k++) {
    const c = BB_CHS[k], done = bbChDone(k);
    if (done >= BB_PER) continue;
    const i = BBP.findIndex((b, j) => bbChOf(j) == k && bbOpen(j) && !bbStars(j));
    if (i < 0) break;
    const then = k + 1 < BB_CHS.length && !bbChOpen(k + 1) ? ` ${BB_OPEN_AT - done} more ${BB_OPEN_AT - done == 1 ? 'opens' : 'open'} ${BB_CHS[k + 1].n}.` : ` Build all ${BB_PER} for the ${c.n} trophy.`;
    return `Build the ${BBP[i].n} in ${c.n}.` + then;
  }
  if (!bbDayStars()) return `Try today's build of the day: ${bbDaily(today()).n}.`;
  const lo = BBP.findIndex((b, i) => bbStars(i) && bbStars(i) < 3);
  if (lo >= 0) return `Get 3 stars on the ${BBP[lo].n}.`;
  for (const w of bbS().worlds) { const g = bbGoalNext(w, 1)[0]; if (g) return `In ${w.name}: ${bbGoalLine(w, g)}.`; }
  return 'Build something new and save it to your gallery.';
}
function bbMenu() {
  const bs = bbS(), stars = BBP.reduce((s, b, i) => s + bbStars(i), 0), tro = BB_CHS.filter((c, k) => bbTrophy(k)).length;
  const day = bbDaily(today()), dst = bbDayStars(), gal = bbGal();
  const bpCard = (b, i) => {
    const ok = bbOpen(i), sv = bbStars(i), n = b.c().length, m = BB_MODES[bbMode(b)], k = bbChOf(i);
    const lockWhy = ok ? '' : !bbChOpen(k) ? `Opens with ${BB_CHS[k].n}` : `Finish ${BBP[i - 1].n} first`;
    return `<button class="bb-bp${ok ? '' : ' lock'}${sv ? ' done' : ''}" data-ch="${i}" aria-label="${esc((i % BB_PER + 1) + '. ' + b.n + ', ' + m[0] + (ok ? '' : ', locked'))}">` +
      `<span class="bb-bpic"><canvas width="200" height="150" data-bpc="${i}" aria-hidden="true"></canvas>${ok ? '' : `<span class="bb-lk">${ico('lock', 26)}</span>`}</span>` +
      `<span class="bb-bpn">${i % BB_PER + 1}. ${esc(b.n)}</span><span class="bb-bm">${ico(m[1], 18)}${esc(m[0])}</span>` +
      (ok ? `<span class="bb-bps">${UI.stars(sv, 3, 20)}<span>${n} blocks</span></span>` : `<span class="bb-bpl">${esc(lockWhy)}</span>`) + '</button>';
  };
  const chap = (c, k) => {
    const open = bbChOpen(k), n = bbChDone(k), tr = bbTrophy(k);
    const sub = !open ? `Build ${BB_OPEN_AT} in ${BB_CHS[k - 1].n} to open it.` : tr ? `Trophy won! Prize: ${BLOCKS[c.prize].n}.` : `Build all ${BB_PER} for the trophy and the ${BLOCKS[c.prize].n}.`;
    return `<div class="bb-chap s-${c.id}${open ? '' : ' lock'}" data-chap="${k}"><h3 class="bb-chh"><span class="bb-chi">${ico(open ? c.ico : 'lock', 24)}</span>` +
      `<span class="bb-cht"><b>${esc(c.n)}</b><span>${esc(sub)}</span></span><span class="bb-chn">${tr ? ico('trophy', 22, 'ic-star') : ''}${n}/${BB_PER}</span></h3>` +
      `<div class="bb-bpg">${BBP.slice(k * BB_PER, k * BB_PER + BB_PER).map((b, j) => bpCard(b, k * BB_PER + j)).join('')}</div></div>`;
  };
  const wCard = (w, i) => {
    const d = bbDecode(w.d), n = d.filter(v => v).length, gn = bbGoalN(w);
    return `<div class="bb-wrow"><button class="bb-w" data-w="${i}" aria-label="${esc('Play ' + w.name)}"><span class="bb-wpic"><canvas width="220" height="150" data-wc="${i}" aria-hidden="true"></canvas></span>` +
      `<span class="bb-wi"><b>${esc(w.name)}</b><span>${n} blocks</span><span class="bb-wg">${ico('target', 18)}${gn} of ${bbWGoals(w).length} goals</span></span>` +
      `<span class="bb-go" aria-hidden="true">${ico('play')}</span></button>` +
      (bs.worlds.length > 1 ? UI.ibtn('trash', 'Delete ' + w.name, { size: 'sm', cls: 'bb-del', attrs: `data-del="${i}"` }) : '') + '</div>';
  };
  const gCard = (g, i) => `<button class="bb-gc" data-gal="${i}" aria-label="${esc('Picture ' + (i + 1) + ': ' + (g.n || 'My build'))}"><span class="bb-gpic"><canvas width="220" height="150" data-gc="${i}" aria-hidden="true"></canvas></span>` +
    `<span class="bb-gcn">${esc(g.n || 'My build')}</span></button>`;
  const how = [['build', 'Tap a spot to build on top of it.'], ['arrow-right', 'Drag one finger to look around. Pinch with two to zoom.'],
    ['closer', 'Closer and Farther zoom. Left and Right turn the island.'], ['stamp', 'Build, Break and Stamp are at the bottom.'],
    ['undo', 'Undo takes a step back. Redo puts it back.'], ['boom', 'Boom lights a TNT block. Building on TNT is safe.'],
    ['hint', 'Hold your finger still, then slide: the bubble shows where it goes.'],
    ['skill-count', 'Count builds: build it the size asked, any way round.'], ['image', 'Picture builds: no see-through blocks. Look at the picture.'],
    ['skill-pattern', 'Pattern builds: the new blocks are white. Which colour comes next?']];
  view(`${GH.top('blocks')}
  <div class="scroll bb-menu"><p class="bb-goal" id="bbnext"><span class="bb-gi">${ico('target', 24)}</span><span><b>Next goal:</b> ${esc(bbNextGoal())}</span></p>
   <section class="bb-sec"><h2>${ico('map', 28)}<span>Blueprints</span><span class="bb-sc" aria-label="${tro} trophies, ${stars} of ${BBP.length * 3} stars">${ico('trophy', 20, 'ic-star')}${tro}<span class="bb-sep"></span>${ico('star', 20, 'ic-star')}${stars}/${BBP.length * 3}</span></h2>
    ${BB_CHS.map(chap).join('')}</section>
   <section class="bb-sec"><h2>${ico('calendar', 28)}<span>Build of the day</span></h2>
    <button class="bb-w bb-day" id="bbday" aria-label="${esc('Build of the day: ' + day.n + ', ' + BB_MODES[bbMode(day)][0])}"><span class="bb-wpic"><canvas width="220" height="150" id="bbdc" aria-hidden="true"></canvas></span>` +
    `<span class="bb-wi"><b>${esc(day.n)}</b><span class="bb-wg">${ico(BB_MODES[bbMode(day)][1], 18)}${esc(BB_MODES[bbMode(day)][0])}</span>` +
    `<span>${dst ? UI.stars(dst, 3, 18) : 'A new build every day'}</span></span><span class="bb-go" aria-hidden="true">${ico('play')}</span></button></section>
  <section class="bb-sec"><h2>${ico('home', 28)}<span>My worlds</span></h2><div class="bb-wl">${bs.worlds.map(wCard).join('')}
   ${bs.worlds.length < BB_WMAX ? `<button class="bb-w bb-new" id="bbnew"><span class="bb-wpic bb-plus">${ico('plus', 40)}</span><span class="bb-wi"><b>New world</b><span>${BBWT.filter(t => t[3] == null || bbChOpen(t[3])).length} kinds to choose from</span></span></button>` : ''}</div></section>
  <section class="bb-sec"><h2>${ico('image', 28)}<span>My gallery</span><span class="bb-sc">${gal.length} of ${BB_GAL_MAX}</span></h2>` +
    (gal.length ? `<div class="bb-gal">${gal.map(gCard).join('')}</div>` : `<p class="bb-lead">Save a picture of a world: in a world, tap More, then Save a picture to my gallery.</p>`) + `</section>
  <section class="bb-sec bb-how"><h2>${ico('info', 28)}<span>How to build</span></h2><ul>${how.map(([i, t]) => `<li>${bbIco(i, 26)}<span>${esc(t)}</span></li>`).join('')}</ul></section></div>`);
  GH.wire({ back: gameRoom });
  for (const b of $$('[data-ch]')) b.onclick = () => {
    const i = +b.dataset.ch, k = bbChOf(i);
    if (!bbOpen(i)) { SFX.wrong(); anim(b, 'sad'); fb(!bbChOpen(k) ? `Build ${BB_OPEN_AT} in ${BB_CHS[k - 1].n} to open ${BB_CHS[k].n}!` : 'Finish ' + BBP[i - 1].n + ' first!', 'warn'); return; }
    if (ptLeft() <= 0) { SFX.wrong(); fb(ptWhyNot(), 'warn long', 3000); return; }
    SFX.whoosh();
    blockBuilder(i);
  };
  $('#bbday').onclick = () => {
    if (ptLeft() <= 0) { SFX.wrong(); fb(ptWhyNot(), 'warn long', 3000); return; }
    SFX.whoosh();
    blockBuilder('day');
  };
  for (const b of $$('[data-w]')) b.onclick = () => {
    if (ptLeft() <= 0) { SFX.wrong(); fb(ptWhyNot(), 'warn long', 3000); return; }
    bs.cur = +b.dataset.w;
    save();
    SFX.whoosh();
    blockBuilder();
  };
  for (const b of $$('[data-del]')) b.onclick = () => {
    const i = +b.dataset.del;
    const s = UI.sheet(`<div class="bb-sheet"><h2>Delete ${esc(bs.worlds[i].name)}?</h2><p>This world and everything built in it will be gone.</p>` +
      `<div class="acts">${UI.btn('Keep it', { kind: 'primary', size: 'lg', icon: 'check', id: 'bbkeepw', wide: true })}${UI.btn('Delete', { icon: 'trash', id: 'bbdelw', wide: true })}</div></div>`);
    s.el.querySelector('#bbkeepw').onclick = () => s.close();
    s.el.querySelector('#bbdelw').onclick = () => { s.close(); bs.worlds.splice(i, 1); bs.cur = 0; save(); SFX.del(); bbMenu(); };
  };
  // a gallery picture: big, with Close and Delete (Delete asks first)
  for (const b of $$('[data-gal]')) b.onclick = () => {
    const i = +b.dataset.gal, g = gal[i];
    SFX.pop(2);
    const s = UI.sheet(`<div class="bb-sheet bb-gbig"><h2>${esc(g.n || 'My build')}</h2><canvas width="600" height="400" id="bbgbc" role="img" aria-label="${esc('Your build: ' + (g.n || 'My build'))}"></canvas>` +
      `<div class="acts">${UI.btn('Close', { kind: 'primary', size: 'lg', icon: 'check', id: 'bbgx', wide: true })}${UI.btn('Delete this picture', { icon: 'trash', id: 'bbgdel', wide: true })}</div></div>`);
    bbMini(s.el.querySelector('#bbgbc'), bbCells(bbUnpack(g.d)), { pet: BBPETIMG && BBPETIMG.img });
    s.el.querySelector('#bbgx').onclick = () => s.close();
    const del = s.el.querySelector('#bbgdel');
    del.onclick = () => {
      if (!del.dataset.sure) { del.dataset.sure = '1'; del.querySelector('span:last-child').textContent = 'Tap again to delete it'; SFX.pop(1); return; }
      s.close(); gal.splice(i, 1); save(); SFX.del(); bbMenu();
    };
  };
  if ($('#bbnew')) $('#bbnew').onclick = () => {
    const s = UI.sheet(`<div class="bb-sheet"><h2>Pick a world</h2><div class="bb-wl">${BBWT.map(([k, n, d, ch]) => {
      const ok = ch == null || bbChOpen(ch);
      return `<button class="bb-w${ok ? '' : ' lock'}" data-t="${k}"${ok ? '' : ' aria-disabled="true"'}><span class="bb-wpic"><canvas width="220" height="150" data-tc="${k}" aria-hidden="true"></canvas>${ok ? '' : `<span class="bb-lk">${ico('lock', 26)}</span>`}</span>` +
        `<span class="bb-wi"><b>${esc(n)}</b><span>${esc(ok ? d : `Open ${BB_CHS[ch].n} in the blueprints`)}</span></span></button>`;
    }).join('')}</div><div class="acts">${UI.btn('Cancel', { icon: 'close', id: 'bbwx', wide: true })}</div></div>`);
    s.el.querySelector('#bbwx').onclick = () => s.close();
    for (const c of s.el.querySelectorAll('[data-tc]')) bbMini(c, bbCells(bbGen(c.dataset.tc, 7)));
    for (const b of s.el.querySelectorAll('[data-t]')) b.onclick = () => {
      const t = BBWT.find(q => q[0] == b.dataset.t);
      if (t[3] != null && !bbChOpen(t[3])) { SFX.wrong(); anim(b, 'sad'); fb(`Open ${BB_CHS[t[3]].n} in the blueprints first!`, 'warn'); return; }
      bs.worlds.push({ name: `${t[1]} ${bs.worlds.length + 1}`, d: bbEncode(bbGen(t[0], R(1, 9999))), t: t[0] });
      bs.cur = bs.worlds.length - 1;
      save();
      s.close();
      SFX.chime();
      if (ptLeft() > 0) blockBuilder(); else bbMenu();
    };
  };
  // the pictures: each blueprint as it will look, today's build, each world as it is now, the gallery (one a frame, so the menu opens at once)
  const jobs = [];
  for (const c of $$('[data-bpc]')) jobs.push(() => bbMini(c, BBP[+c.dataset.bpc].c().map(([a, b, z, v]) => [a + 2, b + 2, z, v])));
  jobs.push(() => bbMini($('#bbdc'), day.c().map(([a, b, z, v]) => [a + 2, b + 2, z, v])));
  const petImg = bbPetImg(() => { for (const c of $$('[data-wc]')) bbMini(c, bbCells(bbDecode(bs.worlds[+c.dataset.wc].d)), { pet: BBPETIMG && BBPETIMG.img }); });
  for (const c of $$('[data-wc]')) jobs.push(() => bbMini(c, bbCells(bbDecode(bs.worlds[+c.dataset.wc].d)), { pet: petImg }));
  for (const c of $$('[data-gc]')) jobs.push(() => bbMini(c, bbCells(bbUnpack(gal[+c.dataset.gc].d)), { pet: BBPETIMG && BBPETIMG.img }));
  const view0 = $('.bb-menu');
  for (let n = 0; n < 8 && jobs.length; n++) jobs.shift()(); // the first chapter at once
  const step = () => { if (!view0 || !document.body.contains(view0) || !jobs.length) return; jobs.shift()(); requestAnimationFrame(step); };
  requestAnimationFrame(step);
  // each chapter's row starts at its next build to make
  for (let k = 0; k < BB_CHS.length; k++) {
    const nx = BBP.findIndex((b, i) => bbChOf(i) == k && bbOpen(i) && !bbStars(i)), card = nx > k * BB_PER && $(`[data-ch="${nx}"]`);
    if (card && card.parentNode) card.parentNode.scrollLeft = Math.max(0, card.offsetLeft - card.parentNode.offsetLeft - 24);
  }
}
/* ---------- Block Builder in 3D (G-BB2: R-03 B1, B2, B3 and section 4) ----------
   A small hand-written WebGL 1 renderer for the 16 x 16 x 14 block world (no library: three.js alone is ~690 KB). It goes into
   games3.<VER>.js with 60-blocks.js (tools/build.py PARTS).
   - Meshes: the world is cut into 16 chunks of 4 x 4 columns. Each chunk is one buffer of the faces that can be seen (a face
     between two solid blocks is left out), with an opaque part and a see-through part (water, glass, ice). When blocks change,
     only the chunks those cells reach are built again (the cell itself, its neighbours for the corner shade, and the cells its
     shadow falls on): bbGlDirty() says which.
   - Light, baked into the vertices: one sun (from the top left, as the object art draws it), a sky light, ambient occlusion
     (inside corners are darker) and a soft sun shadow (each vertex looks towards the sun through the blocks). Lava, lamps, crystal
     and stars glow. Water moves in the shader. Far away fades into the sky colour (fog).
   - Pictures standing on cells (flowers, mushrooms, shells, pine trees, flags, the child's pet) and the animals are camera-facing
     sprites with a soft round shadow under them; the animals hop with a little squash (B2: drawn, not emoji).
   - The camera (bbCam3) circles the focus: one finger turns it (left and right) and tilts it (up and down), two fingers move and
     pinch. Its projection is the one the shader uses, so E.proj places the 2D overlay (outlines, effects, the magnifier) exactly.
   - Picking is exact: E.hit walks the tapped pixel's ray through the cells (a 3D DDA) and returns the first block face it enters,
     in the same shape the 2D renderer's hit test returns, so every tap rule in bbMake (build on top, blueprints, aims) is unchanged.
   - The 2D renderer in 60-blocks.js stays: it is used when WebGL is missing, when the context is lost or a shader fails, and when
     a grown-up turns the 3D look off (More: "3D look", saved as S.bb.gl = 0).
   Colours come from the --ill-* and --sc-* tokens (bbCol / bbRgb); nothing here is a raw colour. */

const BB3 = { fov: .62, tilt: .62, tMin: .3, tMax: 1.2, near: .2, CH: 4, dMin: 3.2 };
BB3.sun = (() => { const v = [-.36, .58, .73], l = Math.hypot(...v); return v.map(q => q / l); })();
const BB3_N = [[0, 0, 1], [0, 0, -1], [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0]];
// the four corners of each face (unit cube), counter-clockwise seen from outside, and each corner's texture u, v
const BB3_Q = [
  [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]], [[0, 1, 0], [1, 1, 0], [1, 0, 0], [0, 0, 0]],
  [[1, 0, 1], [1, 0, 0], [1, 1, 0], [1, 1, 1]], [[0, 1, 1], [0, 1, 0], [0, 0, 0], [0, 0, 1]],
  [[1, 1, 1], [1, 1, 0], [0, 1, 0], [0, 1, 1]], [[0, 0, 1], [0, 0, 0], [1, 0, 0], [1, 0, 1]],
];
const BB3_UV = [[[0, 0], [1, 0], [1, 1], [0, 1]], [[0, 0], [1, 0], [1, 1], [0, 1]]].concat(Array(4).fill([[0, 0], [0, 1], [1, 1], [1, 0]]));

/* ---- the camera: installs the 3D projection, unprojection, hit test and moves on a bbMake world (E) ---- */
function bbCam3(E) {
  E.three = true;
  if (!(E.tilt > 0)) E.tilt = BB3.tilt;
  const C = { k: [] };
  const fpx = () => E.H / 2 / Math.tan(BB3.fov / 2);
  // the camera for the view now (cached until the angle, tilt, zoom, focus or size change)
  const cam = E.cam3 = () => {
    const k = [E.ang, E.tilt, E.zoom, E.F[0], E.F[1], E.F[2], E.W, E.H];
    if (k.every((v, n) => v === C.k[n])) return C;
    C.k = k;
    const c = Math.cos(E.ang), s = Math.sin(E.ang), ct = Math.cos(E.tilt), st = Math.sin(E.tilt);
    const hx = (c + s) / Math.SQRT2, hy = (c - s) / Math.SQRT2;
    C.fpx = fpx();
    C.dist = Math.max(BB3.dMin * .9, C.fpx / (E.a() * Math.SQRT2));
    C.eye = [E.F[0] + hx * ct * C.dist, E.F[1] + hy * ct * C.dist, E.F[2] + st * C.dist];
    C.f = [-hx * ct, -hy * ct, -st];
    // right = up x forward (the 2D view's handedness, so a world looks the same in both), up = forward x right
    const rl = Math.hypot(C.f[0], C.f[1]) || 1;
    C.r = [-C.f[1] / rl, C.f[0] / rl, 0];
    C.u = [C.f[1] * C.r[2] - C.f[2] * C.r[1], C.f[2] * C.r[0] - C.f[0] * C.r[2], C.f[0] * C.r[1] - C.f[1] * C.r[0]];
    C.far = C.dist + 40;
    return C;
  };
  E.dist3 = () => cam().dist;
  E.zMax = () => Math.max(1.2, fpx() / (BB3.dMin * Math.SQRT2 * E.a0));
  E.zMin = () => .7;
  // world (x, y, z) -> canvas point [x, y, depth]; behind the camera: far off the canvas
  E.proj = (X, Y, Z) => {
    const q = cam(), dx = X - q.eye[0], dy = Y - q.eye[1], dz = Z - q.eye[2];
    const z = dx * q.f[0] + dy * q.f[1] + dz * q.f[2];
    if (z < BB3.near) return [-1e5, -1e5, z];
    return [E.W / 2 + (dx * q.r[0] + dy * q.r[1] + dz * q.r[2]) * q.fpx / z, E.H / 2 - (dx * q.u[0] + dy * q.u[1] + dz * q.u[2]) * q.fpx / z, z];
  };
  // the ray under a canvas point
  E.ray = (px, py) => {
    const q = cam(), a = (px - E.W / 2) / q.fpx, b = -(py - E.H / 2) / q.fpx;
    const d = [0, 1, 2].map(n => q.f[n] + q.r[n] * a + q.u[n] * b), l = Math.hypot(...d);
    return [q.eye.slice(), d.map(v => v / l)];
  };
  // canvas point -> world (x, y) on the flat plane at height z (towards the horizon: a point far along the ray)
  E.unproj = (px, py, z) => {
    const [o, d] = E.ray(px, py);
    let t = d[2] < -1e-4 ? (z - o[2]) / d[2] : -1;
    if (!(t > 0)) t = 60;
    t = Math.min(t, 200);
    return [o[0] + d[0] * t, o[1] + d[1] * t];
  };
  // one finger: turn (dx) and tilt (dy), canvas px
  E.orbit = (dx, dy) => {
    E.ang -= dx * Math.PI / Math.max(320, E.W) * 1.1;
    E.tilt = Math.max(BB3.tMin, Math.min(BB3.tMax, E.tilt + dy * 1.6 / Math.max(320, E.H)));
  };
  // two fingers: the world follows the fingers on the plane through the focus
  E.pan = (dx, dy) => {
    const a = E.unproj(E.W / 2, E.H / 2, E.F[2]), b = E.unproj(E.W / 2 - dx, E.H / 2 - dy, E.F[2]);
    let mx = b[0] - a[0], my = b[1] - a[1];
    const m = Math.hypot(mx, my);
    if (m > 3) { mx *= 3 / m; my *= 3 / m; }
    E.F[0] += mx; E.F[1] += my;
    E.clamp();
  };
  const clamp0 = E.clamp;
  E.clamp = () => { clamp0(); E.tilt = Math.max(BB3.tMin, Math.min(BB3.tMax, E.tilt)); };
  E.render = () => (E.faces = []);
  // the corners of a cell's face on the canvas (the shape the 2D hit test returns)
  E.facePoly = (i, j, k, f, nx, ny) => {
    const n = f == 'top' ? 0 : f == 'bot' ? 1 : nx == 1 ? 2 : nx == -1 ? 3 : ny == 1 ? 4 : 5;
    return BB3_Q[n].map(([a, b, c]) => E.proj(i + a, j + b, k + c).slice(0, 2));
  };
  /* exact picking: walk the ray through the cells (Amanatides and Woo); the first cell holding a block (or, for blueprints, a
     see-through block of the layer being built) whose face passes the filter f. Faces: 'top', 'bot' or 'side' with nx, ny. */
  E.hit = (px, py, flt) => {
    const [o, d] = E.ray(px, py), hi = [BW, BD, BH];
    let t0 = 0, t1 = 1e9, ax = -1;
    for (let a = 0; a < 3; a++) {
      if (Math.abs(d[a]) < 1e-9) { if (o[a] < 0 || o[a] > hi[a]) return null; continue; }
      let ta = -o[a] / d[a], tb = (hi[a] - o[a]) / d[a];
      if (ta > tb) [ta, tb] = [tb, ta];
      if (ta > t0) { t0 = ta; ax = a; }
      t1 = Math.min(t1, tb);
    }
    if (t0 > t1) return null;
    const c = [0, 1, 2].map(a => Math.max(0, Math.min(hi[a] - 1, Math.floor(o[a] + d[a] * (t0 + 1e-7))))),
      st = d.map(v => (v > 0 ? 1 : -1)), tM = [0, 1, 2].map(a => (Math.abs(d[a]) < 1e-9 ? 1e9 : (c[a] + (st[a] > 0 ? 1 : 0) - o[a]) / d[a])),
      tD = d.map(v => (Math.abs(v) < 1e-9 ? 1e9 : Math.abs(1 / v)));
    const showG = !!E.goal && E.ghosts(), L = showG ? E.layer() : null;
    for (let n = 0; n < 64; n++) {
      const [i, j, k] = c, idx = bbI(i, j, k), v = E.w[idx];
      let q = null;
      const face = () => (ax == 2 ? (st[2] < 0 ? { f: 'top', nx: 0, ny: 0 } : { f: 'bot', nx: 0, ny: 0 }) : ax == 0 ? { f: 'side', nx: -st[0], ny: 0 } : ax == 1 ? { f: 'side', nx: 0, ny: -st[1] } : { f: 'top', nx: 0, ny: 0 });
      if (v && BLOCKS[v]) q = Object.assign({ i, j, k }, face(), BLOCKS[v].deco ? { deco: 1 } : {});
      else if (showG && !v && k === L && E.goal.has(idx)) q = Object.assign({ i, j, k, ghost: 1 }, face());
      if (q && (!flt || flt(q))) { q.poly = E.facePoly(i, j, k, q.f, q.nx, q.ny); return q; }
      ax = tM[0] < tM[1] ? (tM[0] < tM[2] ? 0 : 2) : (tM[1] < tM[2] ? 1 : 2);
      c[ax] += st[ax];
      if (c[ax] < 0 || c[ax] >= hi[ax] || tM[ax] > t1 + 1e-6) return null;
      tM[ax] += tD[ax];
    }
    return null;
  };
  E.clamp();
  return E;
}
// which cells' faces a change at cell (i, j, k) can alter: the cell and its neighbours (faces, corner shade), and the cells whose
// sun shadow passes through it (down and away from the sun, up to BB3_SH cells along the light)
const BB3_SH = 4;
function bbGlReach(i, j, k) {
  const s = BB3.sun, t = BB3_SH + 1, ex = -s[0] * t, ey = -s[1] * t;
  return [Math.floor(Math.min(i - 1, i - 1 + ex)), Math.floor(Math.min(j - 1, j - 1 + ey)), Math.ceil(Math.max(i + 1, i + 1 + ex)), Math.ceil(Math.max(j + 1, j + 1 + ey))];
}
// the chunks (index cy * 4 + cx) to build again after the cells in `cells` (indices) changed
function bbGlDirty(cells) {
  const out = new Set(), N = BW / BB3.CH;
  for (const n of cells) {
    const i = n % BW, j = Math.floor(n / BW) % BD, k = Math.floor(n / (BW * BD)), [a0, b0, a1, b1] = bbGlReach(i, j, k);
    for (let cx = Math.max(0, Math.floor(a0 / BB3.CH)); cx <= Math.min(N - 1, Math.floor(a1 / BB3.CH)); cx++)
      for (let cy = Math.max(0, Math.floor(b0 / BB3.CH)); cy <= Math.min(N - 1, Math.floor(b1 / BB3.CH)); cy++) out.add(cy * N + cx);
  }
  return out;
}

/* ---- meshing (no GL: tested in Node) ----
   bbGlMesh(w, cx, cy, skip): the visible faces of chunk (cx, cy) as {o: opaque, t: see-through}, each {v: [x, y, z, u, v, light,
   alpha, kind, ...], i: [indices]}. skip: a cell index meshed as empty (the block dropping in). kind: 0 block, 1 water top edge
   (moves), 2 glow. Light = sun and sky x corner shade x shadow, in 0.35 .. 1.05. */
const BB3_AO = [.5, .68, .84, 1];
function bbGlMesh(w, cx, cy, skip = -1) {
  const CH = BB3.CH, s = BB3.sun, o = { v: [], i: [] }, t = { v: [], i: [] };
  const at = (i, j, k) => (i < 0 || j < 0 || k < 0 || i >= BW || j >= BD || k >= BH ? 0 : w[bbI(i, j, k)]);
  const get = (i, j, k) => { const n = bbI(i, j, k); return n == skip && i >= 0 && j >= 0 && k >= 0 && i < BW && j < BD && k < BH ? 0 : at(i, j, k); };
  const opq = (i, j, k) => bbOpaque(get(i, j, k));
  // a soft sun shadow at a point: anything opaque on the way to the sun (a few cells)
  const shadow = (x, y, z) => {
    for (let n = 1; n <= BB3_SH; n++) {
      const X = Math.floor(x + s[0] * n * .9), Y = Math.floor(y + s[1] * n * .9), Z = Math.floor(z + s[2] * n * .9);
      if (Z >= BH) return 1;
      if (opq(X, Y, Z)) return .72;
    }
    return 1;
  };
  for (let j = cy * CH; j < cy * CH + CH; j++) for (let i = cx * CH; i < cx * CH + CH; i++) for (let k = 0; k < BH; k++) {
    const v = get(i, j, k), B = v && BLOCKS[v];
    if (!B || B.deco) continue;
    const see = !!B.see, open = dv => !bbOpaque(dv) && !(see && dv == v);
    const water = B.k == 'water', glow = !!B.glow, tr = water || B.k == 'glass' || B.k == 'ice', out = tr ? t : o;
    const al = water ? .8 : B.k == 'glass' ? .62 : B.k == 'ice' ? .84 : 1;
    for (let f = 0; f < 6; f++) {
      const [nx, ny, nz] = BB3_N[f];
      if (f == 1 && k == 0) continue; // the island's underside is never seen
      if (!open(get(i + nx, j + ny, k + nz))) continue;
      const base = out.v.length / 8, ao = [], tile = 2 * v + (f < 2 ? 0 : 1);
      const lit = .58 + .5 * Math.max(0, nx * s[0] + ny * s[1] + nz * s[2]) + (nz > 0 ? .02 : 0);
      BB3_Q[f].forEach(([a, b, c], q) => {
        // the corner's shade: the two cells beside it and the one across, in the layer the face looks into
        const X = i + a, Y = j + b, Z = k + c;
        const t1 = nx ? [0, b ? 1 : -1, 0] : [a ? 1 : -1, 0, 0], t2 = nz ? [0, b ? 1 : -1, 0] : [0, 0, c ? 1 : -1];
        const L = [i + nx, j + ny, k + nz];
        const s1 = opq(L[0] + t1[0], L[1] + t1[1], L[2] + t1[2]) ? 1 : 0, s2 = opq(L[0] + t2[0], L[1] + t2[1], L[2] + t2[2]) ? 1 : 0;
        const cr = opq(L[0] + t1[0] + t2[0], L[1] + t1[1] + t2[1], L[2] + t1[2] + t2[2]) ? 1 : 0;
        const a3 = s1 && s2 ? 0 : 3 - s1 - s2 - cr;
        ao.push(a3);
        const sh = lit > .7 ? shadow(X + nx * .05 + (a ? -.02 : .02), Y + ny * .05 + (b ? -.02 : .02), Z + nz * .05 + (c ? -.02 : .02)) : 1;
        const [u0, v0] = BB3_UV[f][q], tu = (tile % 16) * 32, tv = Math.floor(tile / 16) * 32;
        const kind = glow ? 2 : water && c == 1 && get(i, j, k + 1) != v ? 1 : 0;
        out.v.push(X, Y, Z, (tu + .5 + u0 * 31) / 512, (tv + .5 + v0 * 31) / 256, glow ? 1 : lit * BB3_AO[a3] * sh, al, kind);
      });
      // split the quad along the brighter diagonal, so the shade does not show a crease
      if (ao[0] + ao[2] > ao[1] + ao[3]) out.i.push(base, base + 1, base + 2, base, base + 2, base + 3);
      else out.i.push(base + 1, base + 2, base + 3, base + 1, base + 3, base);
    }
  }
  return { o, t };
}
// the blueprint's see-through blocks: the layer being built strong, the ones above faint; a pattern build's are white
function bbGlGhost(E) {
  const m = { v: [], i: [] };
  if (!E.goal || !E.ghosts()) return m;
  const L = E.layer(), pat = E.mode == 'pat';
  for (const [n, g] of E.goal) {
    if (E.w[n] == g) continue;
    const i = n % BW, j = Math.floor(n / BW) % BD, k = Math.floor(n / (BW * BD)), cur = k === L;
    const al = pat ? (cur ? .5 : .12) : cur ? .62 : .1;
    for (let f = 0; f < 6; f++) {
      if (f == 1 && k == 0) continue;
      const base = m.v.length / 8, tile = pat ? 0 : 2 * g + (f < 2 ? 0 : 1), tu = (tile % 16) * 32, tv = Math.floor(tile / 16) * 32;
      const [nx, ny, nz] = BB3_N[f], lit = .62 + .45 * Math.max(0, nx * BB3.sun[0] + ny * BB3.sun[1] + nz * BB3.sun[2]);
      BB3_Q[f].forEach(([a, b, c], q) => { const [u0, v0] = BB3_UV[f][q]; m.v.push(i + a, j + b, k + c, (tu + .5 + u0 * 31) / 512, (tv + .5 + v0 * 31) / 256, lit, al, 3); });
      m.i.push(base, base + 1, base + 2, base, base + 2, base + 3);
    }
  }
  return m;
}

/* ---- the animals (B2): drawings from the object art (ART, the hub's style) made into small pictures once ---- */
const BB_AN = ['pig', 'hen', 'sheep', 'cow', 'rabbit', 'cat', 'dog', 'chick', 'mouse', 'turtle'];
const BBANIMG = {};
// a picture made from an SVG drawing whose colours are CSS roles: resolved on a hidden copy, then drawn into a canvas (cb when ready)
function bbSvgCanvas(markup, vb, size, cb) {
  try {
    const host = document.createElement('div');
    host.style.cssText = 'position:absolute;left:-9999px;top:0;width:' + size + 'px;height:' + size + 'px;pointer-events:none';
    host.innerHTML = `<svg class="art" xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${size}" height="${size}">${markup}</svg>`;
    document.body.appendChild(host);
    const svg = host.querySelector('svg');
    for (const el of svg.querySelectorAll('*')) {
      const cs = getComputedStyle(el);
      if (el.getAttribute('fill') && el.getAttribute('fill') != 'none') el.setAttribute('fill', cs.fill);
      if (el.getAttribute('stroke') && el.getAttribute('stroke') != 'none') el.setAttribute('stroke', cs.stroke);
    }
    const src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.outerHTML);
    host.remove();
    const img = new Image();
    img.onload = () => { const c = bbCanvas(size); c.getContext('2d').drawImage(img, 0, 0, size, size); cb(c); };
    img.onerror = () => cb(null);
    img.src = src;
  } catch (e) { cb(null); }
}
// an animal's picture (128 px), or null while it is being made (redraw is called when it is ready)
function bbAnimalImg(k, redraw) {
  const o = BBANIMG[k];
  if (o) { if (!o.c && redraw) o.wait.push(redraw); return o.c; }
  const me = BBANIMG[k] = { c: null, wait: redraw ? [redraw] : [] };
  if (typeof ART == 'undefined' || !ART[k]) return null;
  bbSvgCanvas(ART[k], '0 0 64 64', 128, c => { me.c = c; for (const f of me.wait.splice(0)) try { f(k); } catch (e) {} });
  return null;
}
// an animal's hop: height above its cell and the squash (width, height) at hop progress h (0..1; 1 = standing)
function bbHopShape(h, t) {
  if (h >= 1) { const b = Math.sin(t * 3.1) * .025; return [0, 1 - b, 1 + b]; } // standing: a slow breath
  const up = Math.sin(h * Math.PI) * .45, sq = h < .15 ? (.15 - h) / .15 : h > .85 ? (h - .85) / .15 : 0;
  return [up, 1 + sq * .16 - (sq ? 0 : .06), 1 - sq * .18 + (sq ? 0 : .1)];
}

/* ---- the renderer ---- */
const BB3_VS = 'attribute vec3 p;attribute vec2 t;attribute vec3 l;uniform mat4 M;uniform vec3 O,Y;uniform float T;' +
  'varying vec2 vt;varying vec3 vl;varying float vd;varying vec3 vp;' +
  'void main(){vec3 q=p+O;if(l.z>.5&&l.z<1.5)q.z+=sin(T*1.7+q.x*1.3+q.y*.9)*.05-.12;vt=t;vl=l;vp=q;vd=distance(q,Y);gl_Position=M*vec4(q,1.);}';
const BB3_FS = 'precision mediump float;uniform sampler2D S;uniform float W,N,C,A;uniform vec3 F;uniform vec2 R;' +
  'varying vec2 vt;varying vec3 vl;varying float vd;varying vec3 vp;' +
  'void main(){vec4 c=texture2D(S,vt);float a=c.a*vl.y*A;if(a<C)discard;vec3 k=c.rgb*vl.x;' +
  'if(vl.z>.5&&vl.z<1.5)k+=.06*sin(W*2.3+(vp.x-vp.y)*2.6)+.05*sin(W*1.3+vp.y*3.1)+.03;' +
  'if(vl.z>1.5&&vl.z<2.5)k=c.rgb*(1.02+.08*sin(W*3.+vp.x+vp.y));else k=mix(k,k*vec3(.46,.44,.72),N);' +
  'k=mix(k,F,clamp((vd-R.x)/(R.y-R.x),0.,1.)*.55);gl_FragColor=vec4(k*a,a);}';
// sprites: b the foot (world), o the corner offset (x along the camera's right, y up; or on the ground when m = 1)
const BB3_SVS = 'attribute vec3 b;attribute vec2 o;attribute vec2 t;attribute vec2 m;uniform mat4 M;uniform vec3 R,U;' +
  'varying vec2 vt;varying float va;void main(){vec3 q=m.x>.5?b+vec3(o,.03):b+R*o.x+U*o.y;vt=t;va=m.y;gl_Position=M*vec4(q,1.);}';
const BB3_SFS = 'precision mediump float;uniform sampler2D S;uniform float N;uniform float C;varying vec2 vt;varying float va;' +
  'void main(){vec4 c=texture2D(S,vt);float a=c.a*va;if(a<C)discard;vec3 k=mix(c.rgb,c.rgb*vec3(.5,.48,.75),N);gl_FragColor=vec4(k*a,a);}';
// the sprite sheet (1024 x 512): row 0 cells of 64 px: flower, mush, shell, pine, flag, a soft round shadow; animals in 128 px
// cells from y 128 (8 a row); the child's pet at x 0, y 384 (128 px)
const BB3_SPK = ['flower', 'mush', 'shell', 'pine', 'flag'];
function bbGL(cv) {
  let gl = null;
  try { gl = cv.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true, depth: true, powerPreference: 'low-power' }); } catch (e) { gl = null; }
  if (!gl) return null;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error('shader: ' + gl.getShaderInfoLog(s)); return s; };
  const prog = (vs, fs, at) => {
    const p = gl.createProgram();
    gl.attachShader(p, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs));
    at.forEach((a, n) => gl.bindAttribLocation(p, n, a));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error('link: ' + gl.getProgramInfoLog(p));
    const u = {}, nu = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (let n = 0; n < nu; n++) { const a = gl.getActiveUniform(p, n); u[a.name] = gl.getUniformLocation(p, a.name); }
    return { p, u };
  };
  const R = { gl, ch: [], N: BW / BB3.CH, prev: null, drop: -1, ghost: null, gkey: '', deco: [], frames: 0, built: 0, lost: false };
  try {
    R.P = prog(BB3_VS, BB3_FS, ['p', 't', 'l']);
    R.Q = prog(BB3_SVS, BB3_SFS, ['b', 'o', 't', 'm']);
  } catch (e) { try { logErr('Block Builder 3D: ' + e.message); } catch (er) {} return null; }
  // the block faces atlas (512 x 256): tile 2v the top of block v, 2v + 1 its side; tile 0 plain white (a pattern build's blocks)
  const atlas = bbCanvas(512, 256), ax = atlas.getContext('2d');
  ax.fillStyle = bbCol('white'); ax.fillRect(0, 0, 32, 32);
  for (let v = 1; v < BLOCKS.length; v++) {
    if (BLOCKS[v].deco) continue;
    try {
      const T = bbTex(BLOCKS[v].k);
      for (const [n, img] of [[2 * v, T.top], [2 * v + 1, T.side]]) ax.drawImage(img, (n % 16) * 32, Math.floor(n / 16) * 32);
    } catch (e) {}
  }
  const tex = (src, smooth) => {
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, smooth ? gl.LINEAR : gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, smooth ? gl.LINEAR : gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return t;
  };
  R.tA = tex(atlas, true);
  // the sprite sheet: drawn now, animals and the pet added when their pictures are ready
  const sp = R.sheet = bbCanvas(1024, 512), sx = sp.getContext('2d');
  BB3_SPK.forEach((k, n) => { try { sx.drawImage(bbSprite(k), n * 64, 0); } catch (e) {} });
  const g = sx.createRadialGradient(5 * 64 + 32, 32, 0, 5 * 64 + 32, 32, 31);
  g.addColorStop(0, bbA('ink', .5)); g.addColorStop(.55, bbA('ink', .3)); g.addColorStop(1, bbA('ink', 0));
  sx.fillStyle = g; sx.fillRect(5 * 64, 0, 64, 64);
  R.tS = tex(sp, true);
  R.sheetDirty = false;
  R.anOk = {};
  R.addAnimal = k => {
    const c = bbAnimalImg(k, () => R.addAnimal(k));
    if (!c || R.anOk[k]) return;
    const n = BB_AN.indexOf(k);
    sx.clearRect((n % 8) * 128, 128 + Math.floor(n / 8) * 128, 128, 128);
    sx.drawImage(c, (n % 8) * 128, 128 + Math.floor(n / 8) * 128);
    R.anOk[k] = 1; R.sheetDirty = true;
  };
  R.petOk = null;
  R.setPet = img => {
    if (!img || R.petOk === img) return;
    sx.clearRect(0, 384, 128, 128);
    try { sx.drawImage(img, 0, 384, 128, 128); } catch (e) { return; }
    R.petOk = img; R.sheetDirty = true;
  };
  const buf = () => ({ vb: gl.createBuffer(), ib: gl.createBuffer(), no: 0, nt: 0 });
  for (let n = 0; n < R.N * R.N; n++) R.ch.push(buf());
  R.gb = buf(); R.db = buf(); R.sb = gl.createBuffer();
  const upload = (b, m) => {
    const v = new Float32Array(m.o.v.concat(m.t.v)), off = m.o.v.length / 8, idx = new Uint16Array(m.o.i.concat(m.t.i.map(q => q + off)));
    gl.bindBuffer(gl.ARRAY_BUFFER, b.vb); gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    b.no = m.o.i.length; b.nt = m.t.i.length;
  };
  R.build = (w, n, skip) => { const m = bbGlMesh(w, n % R.N, Math.floor(n / R.N), skip); upload(R.ch[n], m); R.built++; };
  // what changed since the last frame: rebuild only the chunks those cells reach (and the one the dropping block is in)
  R.sync = E => {
    const w = E.w, d = E.drop ? E.drop.i : -1, changed = [];
    let first = false;
    if (!R.prev) { R.prev = new Uint8Array(w.length); first = true; }
    for (let n = 0; n < w.length; n++) if (w[n] != R.prev[n]) changed.push(n);
    if (d != R.drop) { if (d >= 0) changed.push(d); if (R.drop >= 0) changed.push(R.drop); }
    if (!changed.length && !first) return 0;
    R.prev.set(w);
    const dirty = first ? new Set(R.ch.map((_, n) => n)) : bbGlDirty(changed);
    for (const n of dirty) R.build(w, n, d);
    if (d != R.drop) {
      R.drop = d;
      if (d >= 0) { const v = w[d], one = new Uint8Array(w.length); one[d] = v; const m = bbGlMesh(one, Math.floor(d % BW / BB3.CH), Math.floor(Math.floor(d / BW) % BD / BB3.CH)); upload(R.db, m); }
    }
    R.deco = [];
    for (let n = 0; n < w.length; n++) if (w[n] && BLOCKS[w[n]] && BLOCKS[w[n]].deco) R.deco.push(n);
    R.lastDirty = dirty.size;
    return dirty.size;
  };
  // the see-through blueprint blocks, built again when the world or the layer changes
  R.syncGhost = E => {
    const key = E.goal ? E.layer() + ':' + E.prog() + ':' + E.mode : '';
    if (key === R.gkey) return;
    R.gkey = key;
    upload(R.gb, { o: bbGlGhost(E), t: { v: [], i: [] } });
  };
  R.resize = (W, H) => { cv.width = W; cv.height = H; };
  cv.addEventListener('webglcontextlost', e => { e.preventDefault(); R.lost = true; });
  const mat = (E, q) => { // projection x view, column-major
    const f = 1 / Math.tan(BB3.fov / 2), asp = E.W / E.H, n = BB3.near, fa = q.far, a = (fa + n) / (n - fa), b = 2 * fa * n / (n - fa);
    const r = q.r, u = q.u, F = q.f, e = q.eye;
    const V = [r[0], u[0], -F[0], 0, r[1], u[1], -F[1], 0, r[2], u[2], -F[2], 0,
      -(r[0] * e[0] + r[1] * e[1] + r[2] * e[2]), -(u[0] * e[0] + u[1] * e[1] + u[2] * e[2]), F[0] * e[0] + F[1] * e[1] + F[2] * e[2], 1];
    const P = [f / asp, 0, 0, 0, 0, f, 0, 0, 0, 0, a, -1, 0, 0, b, 0], M = new Float32Array(16);
    for (let c = 0; c < 4; c++) for (let rr = 0; rr < 4; rr++) { let s = 0; for (let k = 0; k < 4; k++) s += P[k * 4 + rr] * V[c * 4 + k]; M[c * 4 + rr] = s; }
    return M;
  };
  const attribs = (list, stride) => { list.forEach(([n, size, off]) => { gl.enableVertexAttribArray(n); gl.vertexAttribPointer(n, size, gl.FLOAT, false, stride, off); }); };
  /* one frame: o = {t: seconds, night, fog: [r, g, b] 0..1, animals: [{k, x, y, z, hop, dir, t}], pet: image or null} */
  R.draw = (E, o) => {
    if (R.lost || gl.isContextLost()) { R.lost = true; return false; }
    R.sync(E); R.syncGhost(E);
    if (o.pet) R.setPet(o.pet);
    if (R.sheetDirty) { gl.bindTexture(gl.TEXTURE_2D, R.tS); try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sp); } catch (e) {} R.sheetDirty = false; }
    const q = E.cam3(), M = mat(E, q);
    gl.viewport(0, 0, cv.width, cv.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL);
    gl.disable(gl.CULL_FACE);
    // the blocks
    const P = R.P;
    gl.useProgram(P.p);
    gl.uniformMatrix4fv(P.u.M, false, M);
    gl.uniform3fv(P.u.Y, q.eye); gl.uniform1f(P.u.T, o.t); gl.uniform1f(P.u.W, o.t % 1000); gl.uniform1f(P.u.N, o.night ? 1 : 0);
    gl.uniform3fv(P.u.F, o.fog); gl.uniform2f(P.u.R, q.dist + 4, q.dist + 26);
    gl.uniform1i(P.u.S, 0); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, R.tA);
    gl.disableVertexAttribArray(3);
    const drawBuf = (b, from, count, off) => {
      if (!count) return;
      gl.uniform3fv(P.u.O, off || [0, 0, 0]);
      gl.bindBuffer(gl.ARRAY_BUFFER, b.vb); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.ib);
      attribs([[0, 3, 0], [1, 2, 12], [2, 3, 20]], 32);
      gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, from * 2);
    };
    gl.disable(gl.BLEND); gl.depthMask(true);
    gl.uniform1f(P.u.C, .5); gl.uniform1f(P.u.A, 1);
    for (const b of R.ch) drawBuf(b, 0, b.no);
    if (R.drop >= 0 && E.drop) drawBuf(R.db, 0, R.db.no, [0, 0, E.drop.dz || 0]);
    // sprites and the soft round shadows under them
    const sv = [], put = (bx, by, bz, w, h, u, v, us, vs, flat, a, flip) => {
      const c = [[-w / 2, 0, 0, 1], [w / 2, 0, 1, 1], [w / 2, h, 1, 0], [-w / 2, h, 0, 0]];
      for (const [ox, oy, tu, tv] of [c[0], c[1], c[2], c[0], c[2], c[3]]) {
        const uu = flip ? 1 - tu : tu;
        sv.push(bx, by, bz, flat ? ox : ox, flat ? oy - h / 2 : oy, (u + uu * us) / 1024, (v + tv * vs) / 512, flat ? 1 : 0, a);
      }
    };
    const shadows = [];
    for (const n of R.deco) {
      const v = E.w[n], k = BLOCKS[v].k, i = n % BW, j = Math.floor(n / BW) % BD, z = Math.floor(n / (BW * BD));
      const dz = E.drop && E.drop.i == n ? E.drop.dz || 0 : 0;
      if (k == 'pet') { if (R.petOk) { put(i + .5, j + .5, z + dz - .08, 1.55, 1.55, 0, 384, 128, 128, 0, 1); shadows.push([i + .5, j + .5, z, .5]); } continue; }
      const c = BB3_SPK.indexOf(k);
      if (c < 0) continue;
      put(i + .5, j + .5, z + dz - .04, 1.02, 1.02, c * 64, 0, 64, 64, 0, 1);
      shadows.push([i + .5, j + .5, z, .34]);
    }
    for (const an of o.animals || []) {
      const n = BB_AN.indexOf(an.k);
      if (n < 0 || !R.anOk[an.k]) { if (n >= 0) R.addAnimal(an.k); continue; }
      const [up, sw, shh] = bbHopShape(an.hop, o.t + (an.ph || 0)), s = .92;
      put(an.x + .5, an.y + .5, an.z + up - .03, s * sw, s * shh, (n % 8) * 128, 128 + Math.floor(n / 8) * 128, 128, 128, 0, 1, an.dir < 0);
      shadows.push([an.x + .5, an.y + .5, an.gz != null ? an.gz : Math.floor(an.z + .01), .36 * (1 - up * .6)]);
    }
    const nSpr = sv.length / 9;
    for (const [x, y, z, r] of shadows) put(x, y, z, r * 2, r * 2, 5 * 64, 0, 64, 64, 1, .9);
    if (sv.length) {
      const Q = R.Q;
      gl.useProgram(Q.p);
      gl.uniformMatrix4fv(Q.u.M, false, M);
      const hl = Math.hypot(q.r[0], q.r[1]) || 1;
      gl.uniform3f(Q.u.R, q.r[0] / hl, q.r[1] / hl, 0); gl.uniform3fv(Q.u.U, q.u);
      gl.uniform1f(Q.u.N, o.night ? 1 : 0);
      gl.uniform1i(Q.u.S, 0); gl.bindTexture(gl.TEXTURE_2D, R.tS);
      gl.bindBuffer(gl.ARRAY_BUFFER, R.sb); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sv), gl.DYNAMIC_DRAW);
      attribs([[0, 3, 0], [1, 2, 12], [2, 2, 20], [3, 2, 28]], 36);
      gl.uniform1f(Q.u.C, .5);
      gl.drawArrays(gl.TRIANGLES, 0, nSpr);
      gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.depthMask(false);
      gl.uniform1f(Q.u.C, .01);
      gl.drawArrays(gl.TRIANGLES, nSpr, sv.length / 9 - nSpr);
      gl.disableVertexAttribArray(3);
      gl.useProgram(P.p);
      gl.bindTexture(gl.TEXTURE_2D, R.tA);
    }
    // the see-through blocks (far chunks first), then the blueprint's
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.depthMask(false);
    gl.uniform1f(P.u.C, .01);
    const far = R.ch.map((b, n) => { const cx = (n % R.N + .5) * BB3.CH, cy = (Math.floor(n / R.N) + .5) * BB3.CH; return [Math.hypot(cx - q.eye[0], cy - q.eye[1]), b]; }).sort((a, b) => b[0] - a[0]);
    for (const [, b] of far) drawBuf(b, b.no, b.nt);
    if (R.drop >= 0 && E.drop) drawBuf(R.db, R.db.no, R.db.nt, [0, 0, E.drop.dz || 0]);
    if (R.gb.no) drawBuf(R.gb, 0, R.gb.no);
    gl.depthMask(true); gl.disable(gl.BLEND);
    R.frames++;
    return true;
  };
  return R;
}

var GAMES3_VER='v185'; // last line: the whole file ran (checked by dataReady() before the app starts)
