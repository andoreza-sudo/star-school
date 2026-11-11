/* Star School bt v111. BUILT by tools/build.py from 49-bt-logic.css, 49-bt-maze.css, 49-bt-mdoku.css, 49-bt-number.css, 49-bt-pattern.css, 49-bt-sudoku.css, 75-bt-maze.js, 76-bt-pattern.js, 77-bt-number.js, 78-bt-sudoku.js, 79-bt-mdoku.js, 80-bt-logic.js: never edit by hand.
   index.html v111 loads this file with <script src="bt.v111.js"> after its own code, before data.v111.js. */
(function(){var s=document.createElement('style');s.id='css-bt';s.textContent="/* Brain Teasers logic grids (P3-07, src/js/80-bt-logic.js). Tokens only; motion is transform and opacity. --cs, --rh, --hh, --n\n   come from the JS layout; block padding 3, square gap 2 and block gap 6 must match it. .land: clues left, grid right. */\n.lg{--bw:calc(var(--n) * var(--cs) + (var(--n) - 1) * 2px + 6px);display:flex;flex-direction:column;gap:var(--s-3);width:100%;max-width:1040px;margin:0 auto}\n.lg-say{flex:none;display:flex;align-items:center;gap:var(--s-2);min-height:var(--tap);padding:var(--s-1) var(--s-1) var(--s-1) var(--s-3);border-radius:var(--r-card);\n  background:var(--surface);box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.lg-msg{flex:1;min-width:0;margin:0;font-size:var(--fs-2);font-weight:700;line-height:1.3;color:var(--ink-2)}\n.lg-msg.good{color:var(--good-ink)}\n.lg-msg.try{color:var(--try-ink)}\n.lg-msg.hint{color:var(--bt-shade)}\n.lg-spk{flex:none;order:2}\n.lg-board{flex:none;display:flex;flex-direction:column;align-items:center;gap:var(--s-3)}\n.lg-tabs[hidden]{display:none}\n.lg-tabs .seg>button{padding:0 var(--s-3);font-size:var(--fs-2)}\n.lg-tabs .seg>button.lg-tcf{position:relative}\n.lg-tabs .seg>button.lg-tcf::after{content:\"\";position:absolute;top:6px;right:8px;width:10px;height:10px;border-radius:50%;background:var(--try);box-shadow:0 0 0 2px var(--surface)}\n.lg-tools{flex:none;display:flex;justify-content:center;gap:var(--s-2)}\n.lg-tools .btn{flex:0 1 auto;min-width:0}\n.lg-ac.on{background:var(--bt-tint);color:var(--bt-shade);box-shadow:inset 0 0 0 2px var(--bt),0 3px 0 var(--bt-shade)}\n\n/* ---------- the grid ---------- */\n.lg-grid{display:grid;grid-template-columns:var(--rh) var(--bw);grid-template-rows:var(--hh) var(--bw);gap:6px}\n.lg-grid.lg-g2{grid-template-columns:var(--rh) var(--bw) var(--bw);grid-template-rows:var(--hh) var(--bw) var(--bw)}\n.lg-grid.lg-gp{grid-template-columns:var(--rh) var(--bw) var(--bw)}\n.lg-hd{display:flex;flex-direction:column;justify-content:flex-end;min-width:0}\n.lg-cat{display:block;margin-bottom:2px;font-size:var(--fs-1);font-weight:700;line-height:1.2;color:var(--bt-shade);text-align:center;white-space:nowrap}\n.lg-hs{display:grid;grid-template-columns:repeat(var(--n),var(--cs));gap:2px;padding:0 3px}\n.lg-rhs{display:grid;grid-auto-rows:var(--cs);gap:2px;padding:3px 0}\n.lg-h{display:flex;align-items:center;justify-content:center;min-width:0;height:calc(var(--hh) - 18px);border-radius:10px;color:var(--ink);line-height:1}\n.lg-r{height:auto;justify-content:flex-end;padding-right:var(--s-2)}\n.lg-h.on{background:var(--bt-tint);color:var(--bt-shade)}\n.lg-nm{font-size:var(--fs-3);font-weight:700;line-height:1.1;overflow-wrap:anywhere}\n.lg-pic{display:grid;place-items:center;font-size:min(34px,calc(var(--cs) * .62));line-height:1}\n.lg-pic .art{width:1em;height:1em}\n.lg-col{display:flex;flex-direction:column;align-items:center;gap:2px}\n.lg-r .lg-col{flex-direction:row;gap:var(--s-1)}\n.lg-col i{width:22px;height:22px;border-radius:50%;box-shadow:inset 0 0 0 2px var(--shadow-ink-2)}\n.lg-col small,.lg-num small{font-size:12px;font-weight:700;line-height:1;color:var(--ink-2)}\n.lg-num{display:flex;align-items:center;gap:3px;font-family:var(--font-display);font-size:min(var(--fs-4),calc(var(--cs) * .44));font-weight:700;line-height:1}\n.lg-num .ic{color:var(--ink-3)}\n.lg-corner{display:block}\n.lg-blk{display:grid;grid-template-columns:repeat(var(--n),var(--cs));grid-auto-rows:var(--cs);gap:2px;padding:3px;border-radius:12px;\n  background:linear-gradient(var(--hi),var(--hi-0) 40px) var(--bt);box-shadow:inset 0 2px 0 var(--hi),0 4px 0 var(--bt-shade)}\n.lg-c{position:relative;display:grid;place-items:center;width:var(--cs);height:var(--cs);min-width:0;padding:0;border:0;border-radius:7px;\n  background:var(--surface);color:var(--ink-3);cursor:pointer;touch-action:manipulation;box-shadow:inset 0 -3px 0 var(--surface-2);-webkit-tap-highlight-color:transparent}\n.lg-c>*{pointer-events:none}\n.lg-c .ic{width:calc(var(--cs) * .56);height:calc(var(--cs) * .56)}\n.lg-c.cr .ic{width:calc(var(--cs) * .4);height:calc(var(--cs) * .4)}\n.lg-c.tk{background:var(--good-tint);color:var(--good-ink);box-shadow:inset 0 -3px 0 var(--good)}\n.lg-c.sel{box-shadow:inset 0 0 0 3px var(--bt-tint),inset 0 -3px 0 var(--surface-2)}\n.lg-c.tk.sel{box-shadow:inset 0 0 0 3px var(--bt-tint),inset 0 -3px 0 var(--good)}\n/* a hint's mark: star-yellow; hint highlights: the line soft yellow, the square a star ring */\n.lg-c.hn{background:var(--star-tint);box-shadow:inset 0 -3px 0 var(--star)}\n.lg-c.hh{background:var(--star-tint)}\n.lg-c.hl{background:var(--star-tint);box-shadow:inset 0 0 0 4px var(--star)}\n/* a mark that breaks a rule the child can see, or one Check found after a hint: amber, a dashed ring, a warning mark; never red */\n.lg-c.cf{background:var(--try-tint);color:var(--try-ink);outline:2px dashed var(--try-ink);outline-offset:-5px}\n.lg-c.wr{box-shadow:inset 0 0 0 4px var(--try)}\n.lg-wn{position:absolute;top:2px;right:2px;display:grid;line-height:0;color:var(--try-ink)}\n.lg-c .lg-wn .ic{width:14px;height:14px}\n.lg-c.tk>.ic,.lg-c.cr>.ic{animation:k-pop var(--t-slow) var(--spring)}\n.lg.win .lg-c.tk>.ic{animation:k-pop 520ms var(--ease) both}\n/* the empty corner of a two-category grid: how a tap goes (cross, then tick) */\n.lg-key{display:flex;align-items:center;justify-content:center;gap:var(--s-2);border-radius:12px;background:var(--surface-2);color:var(--ink-3)}\n.lg-key span{display:grid;place-items:center;width:34px;height:34px;border-radius:8px;background:var(--surface)}\n.lg-key span+.ic+span{background:var(--good-tint);color:var(--good-ink)}\n\n/* ---------- the clues ---------- */\n.lg-clues{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:var(--s-2);margin:0;padding:2px 2px 6px;list-style:none;overflow-y:auto;-webkit-overflow-scrolling:touch}\n.lg-q{flex:none;display:flex;align-items:center;gap:var(--s-1);padding:var(--s-1);border-radius:var(--r-card);background:var(--surface);\n  box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.lg-qb{flex:1;min-width:0;display:flex;align-items:center;gap:var(--s-3);min-height:var(--tap);padding:var(--s-1) var(--s-2);border:0;border-radius:12px;\n  background:transparent;color:var(--ink);font:inherit;text-align:left;cursor:pointer;touch-action:manipulation}\n.lg-qb>*{pointer-events:none}\n.lg-qn{flex:none;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--bt-tint);color:var(--bt-shade);font-family:var(--font-display);font-size:var(--fs-2)}\n.lg-qt{flex:1;min-width:0;display:flex;flex-direction:column;gap:var(--s-1)}\n.lg-qs{font-size:var(--fs-2);font-weight:700;line-height:1.3}\n.lg-qsp{flex:none}\n.lg-qp{display:flex;align-items:center;gap:var(--s-2)}\n.lg-qp .lg-nm{font-size:var(--fs-4)}\n.lg-qp .lg-pic{font-size:36px}\n.lg-qm{display:grid;place-items:center;width:34px;height:34px;border-radius:50%}\n.lg-qm.yes{background:var(--good-tint);color:var(--good-ink)}\n.lg-qm.no{background:var(--surface-2);color:var(--ink-2);box-shadow:inset 0 0 0 2px var(--line)}\n.lg-q.used{background:var(--surface-2);box-shadow:inset 0 0 0 2px var(--line)}\n.lg-q.used .lg-qs{color:var(--ink-3);text-decoration:line-through;text-decoration-thickness:2px}\n.lg-q.used .lg-qn{background:var(--surface);color:var(--ink-3)}\n.lg-q.used .lg-qp{opacity:.55}\n.lg-q.hl{background:var(--star-tint);box-shadow:inset 0 0 0 3px var(--star),0 3px 0 var(--star-shade)}\n.lg-q.cf{background:var(--try-tint);outline:2px dashed var(--try-ink);outline-offset:-5px}\n.lg-B .lg-nm{font-size:var(--fs-4)}\n\n/* ---------- landscape: talk line, tools and clues left; the grid right ---------- */\n.lg.land{display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:auto auto minmax(0,1fr);grid-template-areas:\"say board\" \"tools board\" \"clues board\";\n  column-gap:var(--s-5);row-gap:var(--s-3)}\n.lg.land .lg-say{grid-area:say}\n.lg.land .lg-tools{grid-area:tools;justify-content:flex-start}\n.lg.land .lg-clues{grid-area:clues}\n.lg.land .lg-board{grid-area:board;align-self:center}\n/* Brain Teasers: Mazes (P3-08). The board is one canvas (75-bt-maze.js); this lays it out. Tokens only; motion is transform and opacity. */\n.mz{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--s-3);min-height:100%}\n.mz.land{flex-direction:row;justify-content:center;align-items:center;gap:var(--s-5)}\n.mz-board{position:relative;flex:none;border-radius:var(--r-card);box-shadow:0 0 0 3px var(--bt-tint),0 6px 0 3px var(--ledge-soft)}\n.mz-cv{display:block;border-radius:var(--r-card);touch-action:none;cursor:pointer;-webkit-user-select:none;user-select:none}\n.mz-side{flex:none;display:flex;flex-direction:column;align-items:center;gap:var(--s-2);width:100%;max-width:420px}\n.mz.land .mz-side{width:236px}\n.mz-stat{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:var(--s-2) var(--s-3);min-height:var(--tap);padding:var(--s-1) var(--s-4);\n  border-radius:var(--r-pill);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line);font-family:var(--font-display);font-size:var(--fs-3);color:var(--ink)}\n.mz-stat b{font-weight:700}\n.mz-sts,.mz-keys{display:flex;gap:var(--s-1)}\n.mz-st{color:var(--line)}\n.mz-st.on{color:var(--star);--ic2:var(--star-shade)}\n.mz-key{opacity:.25;transition:opacity var(--t) var(--ease),transform var(--t) var(--spring)}\n.mz-key.on{opacity:1;transform:scale(1.1)}\n.mz-steps{font-variant-numeric:tabular-nums;color:var(--ink-2)}\n.mz-steps i{font-style:normal;margin-left:var(--s-1);padding:2px var(--s-2);border-radius:var(--r-chip);background:var(--bt-tint);color:var(--bt-shade);font-weight:700}\n.mz-msg{margin:0;min-height:1.45em;text-align:center;font-size:var(--fs-3);font-weight:700;color:var(--ink-2)}\n.mz-ctl{display:flex;align-items:center;justify-content:center;gap:var(--s-4)}\n.mz.land .mz-ctl{flex-direction:column;gap:var(--s-3)}\n.mz-tog[aria-pressed=\"true\"]{background:var(--bt-tint);color:var(--bt-shade)}\n.mz-pad{display:grid;grid-template-columns:repeat(3,var(--tap-primary));grid-template-rows:repeat(2,var(--tap-primary));gap:var(--s-1)} /* keyboard arrows: up over left, down, right */\n.mz-pad[hidden]{display:none}\n.mz-pad [data-d=\"0\"]{grid-area:1/2}.mz-pad [data-d=\"3\"]{grid-area:2/1}.mz-pad [data-d=\"2\"]{grid-area:2/2}.mz-pad [data-d=\"1\"]{grid-area:2/3}\n.mz-arrow{position:absolute;display:flex;align-items:center;justify-content:center;width:52px;height:52px;margin:-26px 0 0 -26px;border-radius:50%;\n  background:var(--bt);color:var(--surface);box-shadow:0 4px 0 var(--bt-shade);pointer-events:none;opacity:0}\n.mz-arrow[hidden]{display:none}\n.mz-arrow.on{animation:mz-flash .5s var(--ease) 0s 6 alternate both}\n@keyframes mz-flash{from{opacity:.15;transform:scale(.8)}to{opacity:1;transform:scale(1.08)}}\n@media (max-height:520px){.mz.land .mz-side{gap:var(--s-1)}.mz-pad{grid-template-columns:repeat(3,var(--tap));grid-template-rows:repeat(2,var(--tap))}}\n/* Brain Teasers MathDoku (P3-05, src/js/79-bt-mdoku.js). Tokens only; light from the top left (a white gloss on top, the shade tone\n   as a ledge below); motion is transform and opacity (calm mode and reduced motion stop it in 20-base.css).\n   The board is a purple tray (--bt, ledge --bt-shade) holding one white grid; an svg on top draws the cage lines: thin --line\n   between squares of one cage, thick --bt-shade between cages, and the grid's edge. --cs (the square's side) is set by the layout\n   in the JS; the tray padding (6 px) must match FP there. The cage label (target and sign) sits in the cage's top-left square.\n   Portrait: talk line, board, pad. Landscape (.land): board left, talk line and pad right (.md-side).\n   The pad is a grid of 60 narrow columns: the JS sets --ds (columns per digit key) and --ts (per tool key). */\n.md{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--s-3);width:100%;max-width:1000px;min-height:100%;margin:0 auto}\n.md-say{display:flex;align-items:center;gap:var(--s-2);width:100%;max-width:640px;min-height:var(--tap);padding:var(--s-1) var(--s-1) var(--s-1) var(--s-3);\n  border-radius:var(--r-card);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.md-msg{flex:1;min-width:0;margin:0;font-size:var(--fs-2);font-weight:700;line-height:1.3;color:var(--ink-2)}\n.md-msg.good{color:var(--good-ink)}\n.md-msg.try{color:var(--try-ink)}\n.md-msg.hint{color:var(--bt-shade)}\n.md-spk{flex:none;order:2}\n.md-main{display:flex;justify-content:center;flex:none}\n.md-ctl{display:flex;flex-direction:column;align-items:center;gap:var(--s-3);width:100%;max-width:640px}\n.md-side{display:none}\n\n/* ---------- the board ---------- */\n.md-board{position:relative;padding:6px;border-radius:16px;\n  background:linear-gradient(var(--hi),var(--hi-0) 40px) var(--bt);box-shadow:inset 0 2px 0 var(--hi),0 6px 0 var(--bt-shade)}\n.md-grid{display:grid;grid-template-columns:repeat(var(--n),var(--cs));grid-auto-rows:var(--cs);border-radius:8px;overflow:hidden;\n  background:var(--surface);box-shadow:0 0 0 2px var(--bt-shade)}\n.md-lines{position:absolute;left:6px;top:6px;width:calc(var(--n) * var(--cs));height:calc(var(--n) * var(--cs));overflow:visible;pointer-events:none}\n.md-lines path{fill:none;vector-effect:non-scaling-stroke}\n.md-thin{stroke:var(--line);stroke-width:2px}\n.md-thick{stroke:var(--bt-shade);stroke-width:4px;stroke-linecap:square}\n.md-c{position:relative;display:grid;place-items:center;width:var(--cs);height:var(--cs);min-width:0;padding:calc(var(--cs) * .14) 0 0;border:0;border-radius:0;\n  background:var(--surface);color:var(--bt);font-family:var(--font-display);font-size:calc(var(--cs) * .5);font-weight:700;line-height:1;\n  cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent}\n.md-c>*{pointer-events:none}\n.md-v{font-weight:700}\n/* the cage label: target and sign, top left, in ink so it reads apart from the purple entries */\n.md-lab{position:absolute;left:4px;top:4px;z-index:1;display:flex;align-items:center;gap:2px;padding:0 2px;border-radius:6px;\n  font-family:var(--font-body);font-size:clamp(14px,calc(var(--cs) * .27),22px);font-weight:700;line-height:1.15;color:var(--ink);white-space:nowrap}\n.md-lab .ic{width:.9em;height:.9em;flex:none}\n/* a full cage that does not make its number: the label turns amber, with a dashed ring and a warning mark (never red) */\n.md-lab.miss{padding:0 4px 0 2px;background:var(--try-tint);color:var(--try-ink);outline:2px dashed var(--try-ink);outline-offset:0}\n/* a given number (a single-square cage) is printed in ink; the child's are purple; a hint's is ink on star-yellow */\n.md-c.giv{color:var(--ink);padding-top:0}\n.md-c.ent{color:var(--bt)}\n.md-c.hn{color:var(--ink);background:var(--star-tint)}\n/* the selected square, its row and column, and the same number elsewhere */\n.md-c.rc{background:var(--surface-2)}\n.md-c.same{background:var(--bt-tint);color:var(--bt-shade)}\n.md-c.same.giv{color:var(--ink)}\n.md-c.sel{background:var(--bt-tint);box-shadow:inset 0 0 0 4px var(--bt)}\n/* hints: the cage or line glows soft yellow, the square gets a star ring */\n.md-c.hh{background:var(--star-tint)}\n.md-c.hl{background:var(--star-tint);box-shadow:inset 0 0 0 5px var(--star)}\n.md-c.sel.hl{box-shadow:inset 0 0 0 5px var(--star),inset 0 0 0 8px var(--bt)}\n/* a clash: amber with a dashed ring and a warning mark, never red */\n.md-c.cf{background:var(--try-tint);color:var(--try-ink);outline:2px dashed var(--try-ink);outline-offset:-7px}\n.md-c.cf.sel{box-shadow:inset 0 0 0 4px var(--try)}\n.md-wn{position:absolute;top:4px;right:4px;display:grid;line-height:0;color:var(--try-ink)}\n.md-wn .ic{width:max(14px,calc(var(--cs) * .26));height:max(14px,calc(var(--cs) * .26))}\n.md-c.pop .md-v{animation:k-pop 420ms var(--ease)}\n/* pencil marks: a small grid of 3 across, under the label */\n.md-nts{position:absolute;left:3px;right:3px;top:calc(var(--cs) * .36);bottom:3px;display:grid;grid-template-columns:repeat(3,1fr);place-items:center;\n  font-family:var(--font-body);font-style:normal;font-size:max(11px,calc(var(--cs) * .22));font-weight:700;line-height:1;color:var(--ink-3)}\n.md-c.sel .md-nts{color:var(--bt-shade)}\n.md.win .md-v{animation:k-pop 520ms var(--ease) both}\n\n/* ---------- the pad: the question screen's keys (padHTML), 1..n with how many are left, then Erase, Notes, Undo ---------- */\n.md .md-pad{grid-template-columns:repeat(60,minmax(0,1fr));column-gap:0;row-gap:var(--s-2);width:100%;max-width:none;margin:0}\n.md .md-pad .key{position:relative;grid-column:span var(--ds,12);min-width:0;min-height:56px;margin:0 4px;font-size:var(--fs-5)}\n.md .md-pad .key.t{grid-column:span var(--ts,20);gap:var(--s-1);font-size:var(--fs-3);font-weight:700}\n.md .md-pad .key .ic{width:28px;height:28px}\n.md .md-pad .key.t span{pointer-events:none}\n.md .md-pad.tight .key.t span{display:none}\n.md-kf{display:grid;place-items:center;margin-bottom:8px;font-family:var(--font-display);line-height:1;pointer-events:none}\n/* how many are left: a row of dots along the bottom of the key (a tick in a green disc when none are left) */\n.md-left{position:absolute;left:0;right:0;bottom:5px;display:flex;justify-content:center;gap:2px;height:14px;align-items:center;pointer-events:none}\n.md-left i{width:5px;height:5px;border-radius:50%;background:var(--bt)}\n.md .md-pad .md-left .ic{width:14px;height:14px;padding:2px;box-sizing:content-box;border-radius:50%;background:var(--good-tint);color:var(--good-ink)}\n.md .md-pad .key.zero{background:var(--surface-2);color:var(--ink-3);box-shadow:inset 0 0 0 2px var(--line),var(--ledge) var(--line)}\n.md .md-pad .key.on{background:var(--bt-tint);color:var(--bt-shade);box-shadow:inset 0 0 0 3px var(--bt),var(--ledge) var(--bt-shade)}\n/* with Notes on, the digits on the keys turn small and purple, so it is clear they will go in small */\n.md.nt .md-sym .md-kf{font-size:var(--fs-3);color:var(--bt)}\n.md-B .md-pad .key{min-height:var(--tap-pk)}\n.md-B .md-pad .key.md-sym{font-size:var(--fs-6)}\n\n/* ---------- landscape ---------- */\n.md.land{flex-direction:row;align-items:center;justify-content:center;gap:var(--s-6)}\n.md.land .md-side{display:flex;flex-direction:column;gap:var(--s-3);flex:none;width:min(380px,42%)}\n.md.land .md-say{align-self:stretch}\n.md.land .md-ctl{max-width:none}\n/* Brain Teasers number puzzles (P3-10, src/js/77-bt-number.js): Number Pyramid, Balance, Make the Number.\n   Tokens only; light from the top left (a white gloss upper left, the shade tone as a ledge lower right); motion is transform and\n   opacity (calm mode and reduced motion stop it in 20-base.css). Portrait: talk line, board, controls. Landscape: board left. */\n.bn{display:flex;flex-direction:column;gap:var(--s-3);width:100%;max-width:640px;min-height:100%;margin:0 auto}\n.bn-say{display:flex;align-items:center;gap:var(--s-2);min-height:var(--tap);padding:var(--s-1) var(--s-1) var(--s-1) var(--s-3);border-radius:var(--r-card);\n  background:var(--surface);box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.bn-msg{flex:1;min-width:0;margin:0;font-size:var(--fs-2);font-weight:700;line-height:1.3;color:var(--ink-2)}\n.bn-msg.good{color:var(--good-ink)}\n.bn-msg.try{color:var(--try-ink)}\n.bn-msg.hint{color:var(--bt-shade)}\n.bn-spk{flex:none}\n.bn-board{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--s-3);min-height:0}\n.bn-ctl{display:flex;flex-direction:column;align-items:center;gap:var(--s-3)}\n.bn-tag{margin:0}\n/* the question screen's pad in two rows of six (1-6, then 7 8 9 delete 0 check) */\n.bn .bn-pad{grid-template-columns:repeat(6,minmax(0,1fr));gap:var(--s-2);max-width:460px}\n.bn .bn-pad .key{min-height:52px;font-size:var(--fs-5)}\n.bn .bn-pad .key .ic{width:30px;height:30px}\n.bn-shake{animation:k-shake 240ms linear}\n/* a hint points at something: a star ring that pulses */\n.bn .hl{outline:4px solid var(--star);outline-offset:3px}\n\n/* ---------- Number Pyramid ---------- */\n.bn-pyrw{display:grid;grid-template-columns:repeat(calc(var(--n) * 2),minmax(0,1fr));gap:var(--s-2) 6px;width:100%;max-width:calc(var(--n) * 96px)}\n.bn-br{display:flex;align-items:center;justify-content:center;min-width:0;min-height:52px;padding:0;border:0;border-radius:var(--r-chip);\n  font-family:var(--font-display);font-size:var(--fs-4);font-weight:700;line-height:1;color:var(--ink);touch-action:manipulation;\n  transition:transform var(--t-fast) var(--ease)}\n.bn-br span{pointer-events:none}\n/* a given brick: sandstone with a gloss band and a ledge */\n.bn-br.giv{background:linear-gradient(var(--hi),var(--hi-0) 55%) var(--ill-tan);box-shadow:inset 3px 3px 0 var(--ill-tan-1),inset -2px -3px 0 var(--ill-tan-2),0 4px 0 var(--ill-tan-3)}\n.bn-br.hid{background:var(--surface);color:var(--bt);border:3px dashed var(--bt);cursor:pointer;box-shadow:0 4px 0 var(--ledge-soft)}\n.bn-br.hid:active{transform:translateY(3px)}\n.bn-br.sel{border-style:solid;background:var(--bt-tint);color:var(--bt-shade);transform:translateY(-2px);box-shadow:0 5px 0 var(--bt-shade)}\n.bn-br.ok{background:linear-gradient(var(--hi),var(--hi-0) 55%) var(--good-tint);color:var(--good-ink);box-shadow:inset 0 0 0 3px var(--good),0 4px 0 var(--good-ink)}\n.bn-br.ok.hn{background:linear-gradient(var(--hi),var(--hi-0) 55%) var(--star-tint);color:var(--ink);box-shadow:inset 0 0 0 3px var(--star),0 4px 0 var(--star-shade)}\n.bn-pyrw.win .bn-br{animation:k-pop 420ms var(--ease)}\n\n/* ---------- Balance ---------- */\n.bn-scs{display:grid;justify-items:center;gap:var(--s-2);width:100%}\n.bn-sc{width:100%;max-width:340px;padding:var(--s-1) var(--s-2) 0;border-radius:var(--r-card);background:var(--surface);\n  box-shadow:inset 0 0 0 2px var(--line),0 4px 0 var(--ledge-soft)}\n.bn-scs.n3 .bn-sc{max-width:300px}\n.bn-sc.hl{outline-offset:-3px}\n.bn-bal{gap:var(--s-2)}\n.bn-bal .bn-board{gap:var(--s-2)}\n.bn-bal .bn-pad .key{min-height:var(--tap)}\n.bn-bal .bn-slot{height:var(--tap)}\n.bn-sv{display:block;width:100%;height:auto;overflow:visible;font-family:var(--font-display);font-weight:700;text-anchor:middle;stroke-linecap:round}\n/* the stand and base (grey, its right side in shade), the wooden arm (gloss on top, shade below), the brass-grey pin */\n.bn-stand{fill:var(--ill-grey-2)}\n.bn-sts{fill:var(--ill-grey-3)}\n.bn-base{fill:var(--ill-grey-3)}\n.bn-beam{fill:var(--ill-brown)}\n.bn-bsh{fill:none;stroke:var(--ill-brown-2);stroke-width:3}\n.bn-bgl{fill:none;stroke:var(--ill-brown-1);stroke-width:3}\n.bn-nd{fill:none;stroke:var(--ill-brown-3);stroke-width:4}\n.bn-pin{fill:var(--ill-grey-1);stroke:var(--ill-grey-3);stroke-width:3}\n.bn-pgl2{fill:var(--ill-white)}\n.bn-post{fill:var(--ill-grey-2)}\n.bn-dish{fill:var(--ill-grey-1);stroke:var(--ill-grey-2);stroke-width:2;stroke-linejoin:round}\n.bn-dsh{fill:none;stroke:var(--ill-grey);stroke-width:3}\n.bn-pgl{fill:none;stroke:var(--ill-white);stroke-width:2.5}\n.bn-wb{fill:var(--ill-grey-3)}\n.bn-wh{fill:none;stroke:var(--ill-grey-3);stroke-width:4}\n.bn-ws{fill:none;stroke:var(--ill-ink-2);stroke-width:3}\n.bn-wg{fill:none;stroke:var(--ill-grey-2);stroke-width:3}\n.bn-w text{fill:var(--surface);font-size:18px}\n.bn-vt circle{fill:var(--bt);stroke:var(--surface);stroke-width:2}\n.bn-vt text{fill:var(--surface);font-size:13px}\n.bn-vt.bad circle{fill:var(--try)}\n.bn-vt.bad text{fill:var(--ink)}\n/* tipping: the arm turns about the pin and the trays move with its ends (100 units out: sin 6 degrees x 100 = 10.45) */\n.bn-arm,.bn-tray{transition:transform var(--t-xl) var(--spring)}\n.bn-sc.tl .bn-arm{transform:rotate(-6deg)}\n.bn-sc.tl .bn-tray.l,.bn-sc.tr .bn-tray.r{transform:translateY(10.45px)}\n.bn-sc.tl .bn-tray.r,.bn-sc.tr .bn-tray.l{transform:translateY(-10.45px)}\n.bn-sc.tr .bn-arm{transform:rotate(6deg)}\n.bn-slots{display:flex;flex-wrap:wrap;justify-content:center;gap:var(--s-2) var(--s-4)}\n.bn-sg{display:inline-flex;align-items:center;gap:var(--s-1);font-size:var(--fs-4);font-weight:700;color:var(--ink-2)}\n.bn-sg>b{padding:0 2px}\n.bn-sg .bn-x{font-size:var(--fs-3);white-space:nowrap}\n.bn-slot{min-width:60px;height:52px;padding:0 var(--s-2);border:3px dashed var(--bt);border-radius:var(--r-chip);background:var(--surface);\n  font-family:var(--font-display);font-size:var(--fs-4);font-weight:700;color:var(--bt);cursor:pointer;touch-action:manipulation;box-shadow:0 4px 0 var(--ledge-soft)}\n.bn-slot.sel{border-style:solid;background:var(--bt-tint);color:var(--bt-shade);box-shadow:0 5px 0 var(--bt-shade)}\n.bn-slot.ok{border:0;background:linear-gradient(var(--hi),var(--hi-0) 55%) var(--good-tint);color:var(--good-ink);cursor:default;box-shadow:inset 0 0 0 3px var(--good),0 4px 0 var(--good-ink)}\n.bn-slot.ok.hn{background:linear-gradient(var(--hi),var(--hi-0) 55%) var(--star-tint);color:var(--ink);box-shadow:inset 0 0 0 3px var(--star),0 4px 0 var(--star-shade)}\n.bn-scs.win .bn-sc{animation:k-pop 420ms var(--ease)}\n\n/* ---------- Make the Number ---------- */\n.bn-goal{display:flex;justify-content:center}\n.bn-ring{display:grid;place-items:center;width:108px;height:108px;border-radius:50%;\n  background:radial-gradient(circle,var(--surface) 0 47%,var(--bt) 47% 61%,var(--bt-tint) 61% 75%,var(--bt) 75%);box-shadow:0 5px 0 var(--bt-shade)}\n.bn-ring b{font-family:var(--font-display);font-size:var(--fs-5);line-height:1;color:var(--bt-shade)}\n.bn-tiles{display:flex;flex-wrap:wrap;justify-content:center;gap:var(--s-3);min-height:76px}\n.bn-tile{display:grid;place-items:center;width:72px;height:72px;padding:0;border:0;border-radius:var(--r-btn);\n  background:linear-gradient(var(--hi),var(--hi-0) 55%) var(--ill-cream);color:var(--ink);font-family:var(--font-display);font-size:var(--fs-6);line-height:1;\n  cursor:pointer;touch-action:manipulation;box-shadow:inset 3px 3px 0 var(--ill-cream-1),inset 0 0 0 2px var(--ill-cream-2),0 5px 0 var(--ill-cream-3);\n  transition:transform var(--t-fast) var(--ease)}\n.bn-tile b{pointer-events:none}\n.bn-tile:active{transform:translateY(3px)}\n.bn-tile.made{background:linear-gradient(var(--hi),var(--hi-0) 55%) var(--star-tint);box-shadow:inset 3px 3px 0 var(--hi),inset 0 0 0 2px var(--star),0 5px 0 var(--star-shade)}\n.bn-tile.sel{background:var(--bt-tint);color:var(--bt-shade);transform:translateY(-4px);box-shadow:inset 0 0 0 3px var(--bt),0 7px 0 var(--bt-shade)}\n.bn-tiles.win .bn-tile{animation:k-pop 420ms var(--ease)}\n.bn-ops{display:flex;justify-content:center;gap:var(--s-3)}\n.bn-op{display:grid;place-items:center;width:60px;height:60px;padding:0;border:0;border-radius:50%;background:linear-gradient(var(--hi),var(--hi-0) 60%) var(--bt);\n  color:var(--surface);cursor:pointer;touch-action:manipulation;box-shadow:inset 0 3px 0 var(--hi),0 5px 0 var(--bt-shade);transition:transform var(--t-fast) var(--ease)}\n.bn-op:active{transform:translateY(3px)}\n.bn-op.sel{background:var(--star);color:var(--ink);transform:translateY(-3px);box-shadow:inset 0 3px 0 var(--hi),0 6px 0 var(--star-shade)}\n.bn-op .ic{pointer-events:none}\n.bn-trail{display:flex;flex-direction:column;align-items:center;gap:2px;margin:0;padding:0;list-style:none;font-size:var(--fs-3);font-weight:700;color:var(--ink-2)}\n.bn-trail:empty{display:none}\n.bn-trail b{color:var(--bt-shade)}\n.bn-acts{display:flex;justify-content:center}\n\n@media (max-width:480px){\n  .bn-tiles.n5{gap:var(--s-2)}\n  .bn-tiles.n5 .bn-tile{width:60px;height:64px;font-size:var(--fs-5)}\n}\n/* tablets: bigger tiles, target and signs */\n@media (min-width:560px) and (min-height:560px){\n  .bn-tile{width:84px;height:84px}\n  .bn-ring{width:124px;height:124px}\n  .bn-ring b{font-size:var(--fs-6)}\n  .bn-op{width:64px;height:64px}\n}\n/* a tall tablet in portrait: bigger scales */\n@media (min-width:560px) and (min-height:860px){\n  .bn-scs.n3 .bn-sc{max-width:400px}\n  .bn-scs .bn-sc{max-width:460px}\n}\n/* landscape: the board on the left; the talk line, the boxes, the pad and the steps on the right */\n@media (min-aspect-ratio:5/4) and (min-width:700px){\n  .bn{display:grid;grid-template-columns:minmax(0,1fr) minmax(344px,380px);grid-template-rows:auto auto;align-content:center;\n    grid-template-areas:\"board say\" \"board ctl\";gap:var(--s-3) var(--s-6);max-width:1000px}\n  .bn-board{grid-area:board}\n  .bn-say{grid-area:say;align-self:end}\n  .bn-ctl{grid-area:ctl;align-self:start}\n  .bn .bn-pad{max-width:none}\n  .bn-scs.n3 .bn-sc{max-width:340px}\n  .bn-scs .bn-sc{max-width:400px}\n  .bn-scs.n1 .bn-sc{max-width:480px}\n}\n/* Brain Teasers: Patterns, matrices, odd one out (P3-09; 76-bt-pattern.js). Tokens only; motion is transform and opacity. */\n.pt{display:flex;flex-direction:column;gap:var(--s-3);max-width:980px;min-height:100%;margin:0 auto}\n.pt-head{display:flex;align-items:center;justify-content:center;gap:var(--s-3);min-height:var(--tap)}\n.pt-dots{display:flex;gap:6px;flex:none}\n.pt-dots i{width:12px;height:12px;border-radius:50%;background:var(--surface);box-shadow:inset 0 0 0 3px var(--bt-tint)}\n.pt-dots i.now{box-shadow:inset 0 0 0 3px var(--bt)}\n.pt-dots i.on{background:var(--bt);box-shadow:none}\n.pt-ask{margin:0;min-width:0;font-family:var(--font-display);font-size:var(--fs-4);font-weight:700;line-height:1.2;color:var(--ink);text-align:center}\n.pt-say{flex:none}\n.pt-main{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--s-4);padding-bottom:var(--s-3)}\n.pt-side{display:flex;flex-direction:column;align-items:center;gap:var(--s-3);width:100%}\n/* the board: a soft purple tray with white cells on a ledge */\n.pt-board{padding:var(--s-3);border-radius:var(--r-card);background:var(--bt-tint);box-shadow:0 4px 0 var(--ledge-soft)}\n.pt-cell{display:flex;align-items:center;justify-content:center;min-width:0;aspect-ratio:1;border-radius:var(--r-btn);background:var(--surface);\n  box-shadow:0 3px 0 var(--ledge-soft)}\n.pt-cell .pt-t{width:90%;height:90%}\n.pt-q{background:var(--surface-2);box-shadow:inset 0 0 0 3px var(--bt);outline:3px dashed var(--surface);outline-offset:-3px}\n.pt-q b{font-family:var(--font-display);font-size:clamp(28px,6vw,40px);line-height:1;color:var(--bt)}\n.pt-got{box-shadow:inset 0 0 0 3px var(--good),0 3px 0 var(--good-ink);animation:k-pop var(--t-slow) var(--spring)}\n.pt-row{display:grid;grid-template-columns:repeat(var(--n),minmax(0,76px));gap:var(--s-2);justify-content:center;width:100%;max-width:max-content}\n.pt-nrow .pt-cell{aspect-ratio:auto;min-height:64px;padding:0 2px}\n.pt-nm{font-family:var(--font-display);font-size:clamp(20px,4.6vw,30px);font-weight:700;line-height:1;color:var(--ink);font-variant-numeric:tabular-nums}\n.pt-grid{display:grid;gap:var(--s-2)}\n.pt-grid.g3{grid-template-columns:repeat(3,1fr);width:min(100%,312px)}\n.pt-grid.g2{grid-template-columns:repeat(2,1fr);width:min(100%,232px)}\n/* hint words */\n.pt-tip{display:flex;align-items:center;gap:var(--s-2);max-width:560px;margin:0;padding:var(--s-2) var(--s-4);border-radius:var(--r-btn);background:var(--star-tint);\n  color:var(--ink);font-size:var(--fs-3);font-weight:700;line-height:1.35;box-shadow:0 3px 0 var(--star)}\n.pt-tip[hidden]{display:none}\n.pt-tip .ic{flex:none;color:var(--star-shade)}\n/* choices (the .choice component: .wrong and .right carry a corner badge, .off is a choice a hint took away) */\n.pt-chs{display:grid;gap:var(--s-3);width:100%;max-width:520px}\n.pt-chs.n4{grid-template-columns:repeat(4,minmax(0,1fr))}\n.pt-chs.n6{grid-template-columns:repeat(3,minmax(0,1fr));max-width:420px}\n.pt-ch.choice{aspect-ratio:1;min-height:var(--tap-pk);padding:var(--s-1)}\n.pt-ch .pt-t{width:100%;height:100%;max-width:132px;max-height:132px}\n.pt-ch:is(.right,.wrong)::before,.pt-ch.wrong::after{transform:scale(.8);transform-origin:top right}\n.pt-ch.right::after{transform:rotate(45deg) scale(.8)}\n.pt-num .pt-ch.choice{aspect-ratio:auto;min-height:72px}\n.pt-num .pt-nm{font-size:clamp(24px,6vw,36px)}\n.pt-odd .pt-chs.n4{grid-template-columns:repeat(2,minmax(0,1fr));max-width:400px}\n.pt-odd .pt-ch .pt-t{max-width:170px;max-height:170px}\n/* colours: base and shade tones of one hue (DESIGN_SYSTEM 6.5); the light comes from the top left */\n.pt-c0{--p:var(--ill-red);--p2:var(--ill-red-2)}\n.pt-c1{--p:var(--ill-blue);--p2:var(--ill-blue-2)}\n.pt-c2{--p:var(--ill-yellow);--p2:var(--ill-yellow-2)}\n.pt-c3{--p:var(--ill-green);--p2:var(--ill-green-2)}\n.pt-c4{--p:var(--ill-purple);--p2:var(--ill-purple-2)}\n.pt-c5{--p:var(--ill-orange);--p2:var(--ill-orange-2)}\n.pt-t path{stroke-linejoin:round;stroke-linecap:round}\n.pt-sw{fill:var(--ledge-soft);stroke:var(--ledge-soft);stroke-width:8}\n.pt-sd{fill:var(--p2);stroke:var(--p2);stroke-width:8}\n.pt-sb{fill:var(--p);stroke:var(--p);stroke-width:7}\n.pt-sg{fill:none;stroke:var(--ill-white);stroke-width:6;opacity:.75}\n/* phones: a long row wraps into two rows */\n@media (max-width:560px){\n  .pt-row.pt-wrap{grid-template-columns:repeat(var(--n2),minmax(0,76px))}\n  .pt-ask{font-size:var(--fs-3)}\n}\n@media (max-width:560px) and (max-height:820px){\n  .pt-main{gap:var(--s-3)}\n  .pt-grid.g3{width:min(100%,264px)}\n  .pt-chs.n6{max-width:300px;gap:var(--s-2) var(--s-3)}\n}\n/* landscape tablets: the board on the left, the choices on the right (grids and the odd one out) */\n@media (orientation:landscape) and (min-width:700px){\n  .pt-mat .pt-main,.pt-ana .pt-main{flex-direction:row;justify-content:center;align-items:center;gap:var(--s-7)}\n  .pt-mat .pt-side,.pt-ana .pt-side{width:auto;flex:0 1 440px}\n  .pt-grid.g3{width:min(360px,58vh)}\n  .pt-grid.g2{width:min(300px,52vh)}\n  .pt-ana .pt-chs.n4{grid-template-columns:repeat(2,minmax(0,1fr));max-width:min(300px,46vh)}\n  .pt-mat .pt-chs.n6{max-width:440px}\n  .pt-odd .pt-chs.n4{grid-template-columns:repeat(4,minmax(0,1fr));max-width:760px}\n  .pt-row{grid-template-columns:repeat(var(--n),minmax(0,100px))}\n  .pt-seq .pt-chs.n4,.pt-num .pt-chs.n4{max-width:600px}\n}\n/* Brain Teasers sudoku (P3-03, src/js/78-bt-sudoku.js). Tokens only; light from the top left (a white gloss on top, the shade tone\n   as a ledge below); motion is transform and opacity (calm mode and reduced motion stop it in 20-base.css).\n   The board is a purple tray (--bt, ledge --bt-shade) holding one white card per box; squares are tiles with a soft lower edge.\n   --cs (the square's side) is set by the layout in the JS; the padding and gaps here (6, 5, 2 px) must match FR there.\n   Portrait: talk line, board, controls. Landscape (.land): board left, talk line and controls right (.sd-side).\n   .zm (9x9 cells under 46 px, a phone): the zoom box (the selected box at 52 px squares) sits left of a 3-across pad. */\n.sd{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--s-3);width:100%;max-width:1000px;min-height:100%;margin:0 auto}\n.sd-say{display:flex;align-items:center;gap:var(--s-2);width:100%;max-width:640px;min-height:var(--tap);padding:var(--s-1) var(--s-1) var(--s-1) var(--s-3);\n  border-radius:var(--r-card);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.sd-msg{flex:1;min-width:0;margin:0;font-size:var(--fs-2);font-weight:700;line-height:1.3;color:var(--ink-2)}\n.sd-msg.good{color:var(--good-ink)}\n.sd-msg.try{color:var(--try-ink)}\n.sd-msg.hint{color:var(--bt-shade)}\n.sd-spk{flex:none;order:2}\n.sd-main{display:flex;justify-content:center;flex:none}\n.sd-ctl{display:flex;flex-direction:column;align-items:center;gap:var(--s-3);width:100%;max-width:640px}\n.sd-side{display:none}\n\n/* ---------- the board ---------- */\n.sd-board{display:grid;grid-template-columns:repeat(var(--bx),auto);gap:var(--fb);padding:var(--fp);border-radius:16px;\n  background:linear-gradient(var(--hi),var(--hi-0) 40px) var(--bt);box-shadow:inset 0 2px 0 var(--hi),0 6px 0 var(--bt-shade)}\n.sd-box{display:grid;grid-template-columns:repeat(var(--bw),var(--cs));grid-auto-rows:var(--cs);gap:var(--fc);border-radius:10px;background:var(--line);overflow:hidden}\n.sd-n9 .sd-box{border-radius:7px}\n.sd-c{position:relative;display:grid;place-items:center;width:var(--cs);height:var(--cs);min-width:0;padding:0;border:0;border-radius:0;\n  background:var(--surface);color:var(--bt);font-family:var(--font-display);font-size:calc(var(--cs) * .56);font-weight:700;line-height:1;\n  cursor:pointer;touch-action:manipulation;box-shadow:inset 0 -3px 0 var(--surface-2);-webkit-tap-highlight-color:transparent}\n.sd-c>*{pointer-events:none}\n.sd-c b{font-weight:700}\n.sd-c .sd-pic{width:74%;height:74%}\n/* a given number is printed in ink; the child's are purple; a hint's is ink on star-yellow */\n.sd-c.giv{color:var(--ink);background:var(--surface);box-shadow:inset 0 -3px 0 var(--line)}\n.sd-c.ent{color:var(--bt)}\n.sd-c.hn{color:var(--ink);background:var(--star-tint);box-shadow:inset 0 -3px 0 var(--star)}\n/* the selected square, its row, column and box, and the same number elsewhere */\n.sd-c.rc{background:var(--surface-2)}\n.sd-c.same{background:var(--bt-tint);color:var(--bt-shade)}\n.sd-c.same.giv{color:var(--ink)}\n.sd-c.sel{background:var(--bt-tint);box-shadow:inset 0 0 0 3px var(--bt),inset 0 -6px 0 var(--bt)}\n/* hints: the house glows soft yellow, the square gets a star ring */\n.sd-c.hh{background:var(--star-tint)}\n.sd-c.hl{background:var(--star-tint);box-shadow:inset 0 0 0 4px var(--star)}\n.sd-c.sel.hl{box-shadow:inset 0 0 0 4px var(--star),inset 0 0 0 7px var(--bt)}\n/* a clash (C, D) and the number a wrong one ran into (A, B): amber with a dashed ring and a warning mark, never red */\n.sd-c.cf,.sd-c.cl{background:var(--try-tint);color:var(--try-ink);outline:2px dashed var(--try-ink);outline-offset:-5px}\n.sd-c.cf.sel{box-shadow:inset 0 0 0 3px var(--try),inset 0 -6px 0 var(--try)}\n.sd-wn{position:absolute;top:1px;right:1px;display:grid;line-height:0;color:var(--try-ink)}\n.sd-wn .ic{width:max(12px,calc(var(--cs) * .3));height:max(12px,calc(var(--cs) * .3))}\n/* a wrong symbol (A, B) wiggles, then hops out */\n.sd-c.bad{background:var(--try-tint);color:var(--try-ink)}\n.sd-c.bad>*{animation:sd-out 650ms var(--ease) forwards}\n@keyframes sd-out{15%{transform:translateX(-12%)}30%{transform:translateX(12%)}45%{transform:translateX(-6%);opacity:1}100%{transform:translateY(-55%) scale(.5);opacity:0}}\n.sd-c.pop>*{animation:k-pop 420ms var(--ease)}\n/* pencil marks: a small grid of 3 across */\n.sd-nts{position:absolute;inset:3px;display:grid;grid-template-columns:repeat(3,1fr);place-items:center;font-style:normal;\n  font-size:max(9px,calc(var(--cs) * .27));font-weight:700;line-height:1;color:var(--ink-3)}\n.sd-c.sel .sd-nts{color:var(--bt-shade)}\n.sd.win .sd-c>*{animation:k-pop 520ms var(--ease) both}\n.sd.win .sd-box:nth-child(2n) .sd-c>*{animation-delay:90ms}\n.sd.win .sd-box:nth-child(3n) .sd-c>*{animation-delay:180ms}\n\n/* ---------- zoom box (9x9 on a phone): the selected box at full size ---------- */\n.sd-zoom{--cs:48px;display:grid;flex:none;grid-template-columns:repeat(3,var(--cs));grid-auto-rows:var(--cs);gap:2px;padding:2px;border-radius:12px;\n  background:var(--bt);box-shadow:inset 0 2px 0 var(--hi),0 5px 0 var(--bt-shade)}\n.sd-zoom[hidden]{display:none}\n.sd-zoom .sd-c:first-child{border-radius:10px 0 0 0}\n.sd-zoom .sd-c:nth-child(3){border-radius:0 10px 0 0}\n.sd-zoom .sd-c:nth-child(7){border-radius:0 0 0 10px}\n.sd-zoom .sd-c:last-child{border-radius:0 0 10px 0}\n\n/* ---------- the pad: the question screen's keys (padHTML), symbols 1..n with how many are left ---------- */\n.sd .sd-pad{gap:var(--s-2);width:100%;max-width:none;margin:0}\n.sd .sd-pad.row{grid-template-columns:repeat(var(--n),minmax(0,1fr))}\n.sd .sd-pad.g3{grid-template-columns:repeat(3,minmax(0,1fr))}\n.sd .sd-pad .key{position:relative;min-width:0;min-height:52px;font-size:var(--fs-5)}\n.sd .sd-pad .key .ic{width:28px;height:28px}\n.sd-n9 .sd-pad.row .key.t{grid-column:span 3}\n.sd-n6 .sd-pad.row .key.t,.sd-n6 .sd-pad.g3 .key.t{grid-column:span 1}\n.sd-n6 .sd-pad.row .key.t{grid-column:span 2}\n.sd-kf{display:grid;place-items:center;font-family:var(--font-display);line-height:1;pointer-events:none}\n/* how many are left: a row of dots along the bottom of the key (a tick in a green disc when none are left) */\n.sd-left{position:absolute;left:0;right:0;bottom:5px;display:flex;justify-content:center;gap:2px;height:14px;align-items:center;pointer-events:none}\n.sd-left i{width:5px;height:5px;border-radius:50%;background:var(--bt)}\n.sd-n9 .sd-left{gap:1px}\n.sd-n9 .sd-left i{width:4px;height:4px}\n.sd .sd-pad .sd-left .ic{width:14px;height:14px;padding:2px;box-sizing:content-box;border-radius:50%;background:var(--good-tint);color:var(--good-ink)}\n.sd .sd-pad .sd-sym .sd-kf{margin-bottom:8px}\n.sd .sd-pad .key.zero{background:var(--surface-2);color:var(--ink-3);box-shadow:inset 0 0 0 2px var(--line),var(--ledge) var(--line)}\n.sd .sd-pad .key.t{gap:var(--s-1);font-size:var(--fs-3);font-weight:700}\n.sd .sd-pad .key.t span{pointer-events:none}\n.sd .sd-pad.g3 .key.t span{display:none}\n.sd .sd-pad .key.on{background:var(--bt-tint);color:var(--bt-shade);box-shadow:inset 0 0 0 3px var(--bt),var(--ledge) var(--bt-shade)}\n/* with Notes on, the digits on the keys turn small and purple, so it is clear they will go in small */\n.sd.nt .sd-sym .sd-kf{font-size:var(--fs-3);color:var(--bt)}\n/* 4x4: four big keys; band A keys carry the animals */\n.sd-n4 .sd-pad .key{min-height:var(--tap-pk);font-size:var(--fs-6)}\n.sd-A .sd-pad .sd-kf{font-size:48px}\n\n/* two rows of six (9x9 on a phone): 1-5 and Erase, then 6-9, Notes and Undo */\n.sd .sd-pad.r6{grid-template-columns:repeat(6,minmax(0,1fr));gap:var(--s-1) 6px}\n.sd .sd-pad.r6 .k[data-k=\"del\"]{grid-column:6;grid-row:1}\n.sd .sd-pad.r6 .key{min-height:var(--tap)}\n.sd .sd-pad.r6 .key.t span{display:none}\n\n/* ---------- 9x9 on a phone (.zm, portrait): the zoom box and the talk line share a row under the board ---------- */\n.sd-zrow{display:none}\n.sd.zm:not(.land){gap:var(--s-2)}\n.sd.zm:not(.land) .sd-zrow{display:flex;align-items:stretch;gap:var(--s-2);width:100%}\n.sd.zm:not(.land) .sd-say{display:block;flex:1;min-width:0;height:auto;max-height:152px;overflow:auto;padding:var(--s-1) var(--s-1) var(--s-1) var(--s-3)}\n.sd.zm:not(.land) .sd-spk{float:right;margin:0 0 var(--s-1) var(--s-1)}\n.sd.zm:not(.land) .sd-msg{padding-top:var(--s-1)}\n/* landscape with the zoom box: zoom box left, pad right in the side column */\n.sd.land.zm .sd-ctl{flex-direction:row;align-items:flex-start;justify-content:center;gap:var(--s-3)}\n.sd.land.zm .sd-pad{flex:1}\n.sd.land.zm .sd-pad .key{min-height:var(--tap)}\n\n/* ---------- landscape ---------- */\n.sd.land{flex-direction:row;align-items:center;justify-content:center;gap:var(--s-6)}\n.sd.land .sd-side{display:flex;flex-direction:column;gap:var(--s-3);flex:none;width:min(380px,42%)}\n.sd.land .sd-say{align-self:stretch}\n.sd.land .sd-ctl{max-width:none}\n";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)
/* ---------- Brain Teasers: Mazes (P3-08; BRAIN_TEASERS.md 5.4, 7, 8) ----------
   A perfect maze (one path between any two cells) from a recursive backtracker; start and goal are the two cells farthest apart
   (two BFS passes), so the way is always long for the size. Built at runtime from the seeded rnd, solvable by construction and
   checked again by a state BFS (the par).

   Bands and levels (MZ.size; four levels per size step):
     A  5x5 (levels 1-6), then 6x6; strong bias toward long straight corridors; wide paths.
     B  8x8, 9x9, 10x10.
     C  12x12, 13x13, 14x14 + 3 stars in dead ends off the way; the flag's gate opens when all 3 are picked up.
     D  16x16, 17x17, 18x18 + keys and doors (1 key on levels 1-6, 2 keys on 7-12). A door sits on the way; its key is at the end
        of a side branch that leaves the way before that door (key 2's branch after door 1). Steps counter with a par.
   The par is the shortest walk that wins: a BFS over (cell, items held), so it includes trips into the star and key branches.

   Puzzle (JSON): {b band, w, h, o: one hex digit per cell, the open sides (1 up, 2 right, 4 down, 8 left), s start, g goal,
     stars: [cells] (C), keys: [cells] and doors: [cells] (D, key i opens door i), par}.
   State (api.saveState): {t: the trail from s (cells), m: items held (bit i = star or key i), dead: dead ends found, steps, mis}.

   Input (one canvas, touch-action none): drag from the bear; the trail follows cell to cell toward the finger and never crosses a
   wall; dragging back over the trail erases it; lifting the finger keeps the place. A tap on a cell in a straight open line from
   the bear walks there, a tap on the trail goes back to that spot. The Arrows button shows a 4-arrow pad (remembered in
   S.bt.maze.pad); the keyboard arrows work too. Items picked up stay picked up when the trail is erased.
   Mistakes: each dead end reached that holds nothing (start, flag, stars and keys are not mistakes). The type allows 2.
   Hints: 1) an arrow flashes toward the next thing to reach (the flag, or the next star or key). 2) dots on the next 5 cells of the
   route. 3) dots on the route through the next junction and one cell past it (at least as many as tier 2). Hints never show the
   cell the route ends on, so a hint never draws the whole way.
   Drawing: a static layer (floor and walls, merged into long strokes, three passes: shade, base, highlight; light from the top
   left) is drawn once per size; each move redraws only the dynamic layer over it. Colours are read from the tokens. */
const MZ = {
  DX: [0, 1, 0, -1], DY: [-1, 0, 1, 0], BIT: [1, 2, 4, 8], DIR: ['up', 'right', 'down', 'left'],
  HEX: '0123456789abcdef',
  BIAS: { A: 0.7, B: 0.35, C: 0.2, D: 0.12 }, // chance to keep going straight while carving
  HUE: { A: 'green', B: 'green', C: 'blue', D: 'purple' }, // wall colour by band
  KEY_HUE: ['yellow', 'aqua'],
  cur: null, // the maze on screen (for the smoke bot): {p, st, at(cell), draw()}

  size(band, level) {
    const l = Math.max(1, Math.min(12, +level || 1));
    if (band == 'A') return l <= 6 ? 5 : 6;
    const base = { B: 8, C: 12, D: 16 }[band] || 8;
    return base + Math.floor((l - 1) / 4);
  },
  pop: m => (m & 1) + (m >> 1 & 1) + (m >> 2 & 1) + (m >> 3 & 1),
  decode: s => Array.from(s, c => parseInt(c, 16)),

  // Recursive backtracker (iterative). Returns the open-sides bitmask of every cell.
  carve(w, h, rnd, bias) {
    const N = w * h, o = new Array(N).fill(0), seen = new Uint8Array(N);
    const first = Math.floor(rnd() * N), stack = [first], last = [-1];
    seen[first] = 1;
    while (stack.length) {
      const c = stack[stack.length - 1], x = c % w, y = (c - x) / w, opts = [];
      for (let d = 0; d < 4; d++) {
        const nx = x + MZ.DX[d], ny = y + MZ.DY[d];
        if (nx >= 0 && ny >= 0 && nx < w && ny < h && !seen[ny * w + nx]) opts.push(d);
      }
      if (!opts.length) { stack.pop(); last.pop(); continue; }
      const ld = last[last.length - 1];
      const d = ld >= 0 && opts.includes(ld) && rnd() < bias ? ld : opts[Math.floor(rnd() * opts.length)];
      const n = c + MZ.DX[d] + MZ.DY[d] * w;
      o[c] |= MZ.BIT[d];
      o[n] |= MZ.BIT[(d + 2) % 4];
      seen[n] = 1;
      stack.push(n);
      last.push(d);
    }
    return o;
  },
  // neighbours through open sides
  nbrs(o, w, c) {
    const out = [];
    for (let d = 0; d < 4; d++) if (o[c] & MZ.BIT[d]) out.push(c + MZ.DX[d] + MZ.DY[d] * w);
    return out;
  },
  // plain BFS: {dist, prev}
  bfs(o, w, from) {
    const N = o.length, dist = new Array(N).fill(-1), prev = new Array(N).fill(-1), q = [from];
    dist[from] = 0;
    for (let i = 0; i < q.length; i++) {
      const c = q[i];
      for (const n of MZ.nbrs(o, w, c)) if (dist[n] < 0) { dist[n] = dist[c] + 1; prev[n] = c; q.push(n); }
    }
    return { dist, prev };
  },
  far(dist) { let b = 0; for (let i = 1; i < dist.length; i++) if (dist[i] > dist[b]) b = i; return b; },

  items: p => p.stars || p.keys || [],

  // Shortest winning walk from `from` holding items `mask`: a BFS over (cell, items held). Returns the cells (from first) or null.
  // Rules: door i needs key i; in band C the flag's cell opens when every star is held; stepping on an item picks it up.
  route(p, o, from = p.s, mask = 0) {
    const w = p.w, N = w * p.h, items = MZ.items(p), M = 1 << items.length, full = M - 1;
    const itemAt = new Array(N).fill(-1), doorAt = new Array(N).fill(-1);
    items.forEach((c, i) => { itemAt[c] = i; });
    (p.doors || []).forEach((c, i) => { doorAt[c] = i; });
    const m0 = mask | (itemAt[from] >= 0 ? 1 << itemAt[from] : 0), prev = new Int32Array(N * M).fill(-2), q = [from * M + m0];
    prev[q[0]] = -1;
    for (let i = 0; i < q.length; i++) {
      const s = q[i], c = Math.floor(s / M), m = s % M;
      if (c == p.g && (!p.stars || m == full)) {
        const out = [];
        for (let t = s; t >= 0; t = prev[t]) out.push(Math.floor(t / M));
        return out.reverse();
      }
      for (const n of MZ.nbrs(o, w, c)) {
        if (doorAt[n] >= 0 && !(m >> doorAt[n] & 1)) continue;
        if (p.stars && n == p.g && m != full) continue;
        const nm = m | (itemAt[n] >= 0 ? 1 << itemAt[n] : 0), ns = n * M + nm;
        if (prev[ns] != -2) continue;
        prev[ns] = s;
        q.push(ns);
      }
    }
    return null;
  },

  // Build a level. Returns the puzzle or null (the caller carves again with the next numbers from rnd).
  build(band, level, rnd) {
    const n = MZ.size(band, level), w = n, h = n, N = w * h;
    const o = MZ.carve(w, h, rnd, Math.max(0.05, MZ.BIAS[band] - (level - 1) * 0.01));
    let s = MZ.far(MZ.bfs(o, w, 0).dist);
    const b1 = MZ.bfs(o, w, s);
    let g = MZ.far(b1.dist);
    const xy = c => c % w + Math.floor(c / w);
    if (xy(g) < xy(s)) [s, g] = [g, s]; // the start is the end nearer the top left
    const way = [];
    for (let c = MZ.bfs(o, w, s).prev, t = g; t >= 0; t = c[t]) way.push(t);
    way.reverse();
    // every cell off the way: where its branch leaves the way (index on the way) and how deep it lies
    const at = new Array(N).fill(-1), dep = new Array(N).fill(0), q = way.slice();
    way.forEach((c, i) => { at[c] = i; });
    for (let i = 0; i < q.length; i++) for (const nb of MZ.nbrs(o, w, q[i])) if (at[nb] < 0) { at[nb] = at[q[i]]; dep[nb] = dep[q[i]] + 1; q.push(nb); }
    const leaves = [];
    for (let c = 0; c < N; c++) if (MZ.pop(o[c]) == 1 && c != s && c != g) leaves.push(c);
    const p = { b: band, w, h, o: o.map(m => MZ.HEX[m]).join(''), s, g };
    // closest to a wanted depth, with a little seeded jitter
    const byDepth = (cs, want) => cs.map(c => [Math.abs(dep[c] - want) + rnd() * 1.5, c]).sort((a, b) => a[0] - b[0]).map(e => e[1]);
    if (band == 'C') {
      const cand = byDepth(leaves, 1.5 + level * 0.55), md = (a, b) => Math.abs(a % w - b % w) + Math.abs(Math.floor(a / w) - Math.floor(b / w));
      let stars = null;
      for (const [minDep, gap, ownBranch] of [[2, 3, true], [2, 2, false], [1, 1, false]]) {
        const got = [];
        for (const c of cand) {
          if (dep[c] < minDep || got.some(x => md(x, c) < gap || (ownBranch && at[x] == at[c]))) continue;
          got.push(c);
          if (got.length == 3) break;
        }
        if (got.length == 3) { stars = got; break; }
      }
      if (!stars) return null;
      p.stars = stars.sort((a, b) => a - b);
    }
    if (band == 'D') {
      const L = way.length, nk = level <= 6 ? 1 : 2, spans = nk == 1 ? [[0.45, 0.7]] : [[0.3, 0.45], [0.65, 0.82]];
      const keys = [], doors = [];
      let lo = 0;
      for (const [a, b] of spans) {
        const idx = [];
        for (let i = Math.max(2, Math.ceil(L * a)); i <= Math.min(L - 3, Math.floor(L * b)); i++) if (MZ.pop(o[way[i]]) == 2) idx.push(i);
        let ok = false;
        for (const i of idx.map(i => [rnd(), i]).sort((x, y) => x[0] - y[0]).map(e => e[1])) {
          const cand = byDepth(leaves.filter(c => at[c] >= lo && at[c] < i && dep[c] >= 2), 2 + level * 0.5);
          if (!cand.length) continue;
          keys.push(cand[0]);
          doors.push(way[i]);
          lo = i + 1;
          ok = true;
          break;
        }
        if (!ok) return null;
      }
      p.keys = keys;
      p.doors = doors;
    }
    const r = MZ.route(p, o);
    if (!r) return null;
    p.par = r.length - 1;
    return p;
  },

  // the cells a hint draws for tier 2 or 3, from a route (head first); never the route's last cell
  hintCells(o, route, tier) {
    const end = route.length - 1;
    if (end < 2) return [];
    let n = 6;
    if (tier >= 3) {
      let j = 1;
      while (j < end && MZ.pop(o[route[j]]) < 3) j++;
      n = Math.max(6, j + 2);
    }
    return route.slice(1, Math.min(n, end));
  },
  // what tier 1 points at: the first star or key still to pick up on the route, else the flag
  target(p, route, mask) {
    const items = MZ.items(p);
    for (let i = 1; i < route.length; i++) {
      const k = items.indexOf(route[i]);
      if (k >= 0 && !(mask >> k & 1)) return { c: route[i], kind: p.stars ? 'star' : 'key', k };
    }
    return { c: p.g, kind: 'flag', k: -1 };
  },
  // a saved state that fits this puzzle, or null
  fit(sv, p, o) {
    if (!sv || !Array.isArray(sv.t) || !sv.t.length || sv.t[0] !== p.s) return null;
    for (let i = 1; i < sv.t.length; i++) if (!MZ.nbrs(o, p.w, sv.t[i - 1]).includes(sv.t[i])) return null;
    return { t: sv.t.slice(), m: +sv.m | 0, dead: Array.isArray(sv.dead) ? sv.dead.filter(c => c >= 0 && c < o.length) : [], steps: +sv.steps | 0, mis: +sv.mis | 0 };
  },

  // small inline pictures for the side panel (tokens only)
  keySvg(k, on) {
    const hu = MZ.KEY_HUE[k] || 'yellow', bow = k ? '<rect x="4" y="9" width="12" height="12" rx="3" fill="none" stroke-width="5"/>'
      : '<circle cx="10" cy="15" r="6" fill="none" stroke-width="5"/>';
    return `<svg class="mz-key${on ? ' on' : ''}" viewBox="0 0 40 30" width="40" height="30" aria-hidden="true"><g stroke="var(--ill-${hu}-3)" ` +
      `transform="translate(1 1.5)">${bow}<path d="M16 15H36M30 15V22M35 15V20" fill="none" stroke-width="5" stroke-linecap="round"/></g>` +
      `<g stroke="var(--ill-${hu})">${bow}<path d="M16 15H36M30 15V22M35 15V20" fill="none" stroke-width="5" stroke-linecap="round"/></g></svg>`;
  },
  flagSvg() {
    return '<svg class="mz-fl" viewBox="0 0 30 30" width="30" height="30" aria-hidden="true"><ellipse cx="11" cy="26" rx="8" ry="3" fill="var(--ill-green-2)"/>' +
      '<path d="M9 26V4" stroke="var(--ill-grey-3)" stroke-width="3" stroke-linecap="round"/><path d="M10 4H25L21 9.5L25 15H10Z" fill="var(--ill-red-2)"/>' +
      '<path d="M10 4H24L20.5 9H10Z" fill="var(--ill-red)"/></svg>';
  },
};

BT.reg({
  id: 'maze', name: 'Mazes', icon: 'maze', bands: 'ABCD', allow: 2,
  rules: 'Drag the bear along the paths to the flag. Walls block the way.',
  make(band, level, rnd) {
    for (let t = 0; t < 40; t++) {
      const p = MZ.build(band, level, rnd);
      if (p) return p;
    }
    throw new Error('maze: no layout for ' + band + level);
  },
  solve(p) { return MZ.route(p, MZ.decode(p.o)); },

  mount(el, p, api) {
    const band = p.b || api.band, w = p.w, h = p.h, o = MZ.decode(p.o), items = MZ.items(p), full = (1 << items.length) - 1;
    const doorAt = c => (p.doors || []).indexOf(c), itemAt = c => items.indexOf(c);
    const st = MZ.fit(api.loadState(), p, o) || { t: [p.s], m: 0, dead: [], steps: 0, mis: 0 };
    const padOn = !!(BT.st().maze && BT.st().maze.pad);
    let won = false, dirty = false, raf = 0, hintT = 0, arrowT = 0, hint = [], drag = null, flash = -1;
    const timers = new Set(), later = (f, ms) => { const t = setTimeout(() => { timers.delete(t); f(); }, ms); timers.add(t); return t; };

    // ---- markup ----
    const goalLine = p.stars ? `<span class="mz-sts">${p.stars.map((c, i) => ico('star', 30, 'mz-st' + (st.m >> i & 1 ? ' on' : ''))).join('')}</span><b class="mz-n"></b>`
      : p.keys ? `<span class="mz-keys">${p.keys.map((c, i) => MZ.keySvg(i, st.m >> i & 1)).join('')}</span><span class="mz-steps">Steps <b class="mz-sn">0</b> <i>Par ${p.par}</i></span>`
      : `${MZ.flagSvg()}<b class="mz-n">Get to the flag</b>`;
    const ab = (d, ic) => UI.ibtn(ic, 'Go ' + MZ.DIR[d], { cls: 'mz-ab', attrs: `data-d="${d}"` });
    el.innerHTML = `<div class="mz mz-${band}"><div class="mz-board"><canvas class="mz-cv" role="img" aria-label="Maze"></canvas>` +
      `<span class="mz-arrow" hidden></span></div><div class="mz-side"><div class="mz-stat">${goalLine}</div>` +
      `<p class="mz-msg" role="status" aria-live="polite"></p><div class="mz-ctl">` +
      `${UI.btn('Arrows', { icon: 'gamepad', cls: 'mz-tog', attrs: `aria-pressed="${padOn}"` })}` +
      `<div class="mz-pad"${padOn ? '' : ' hidden'}>${ab(0, 'arrow-up')}${ab(3, 'arrow-left')}${ab(2, 'arrow-down')}${ab(1, 'arrow-right')}</div></div></div></div>`;
    const root = el.querySelector('.mz'), cv = root.querySelector('.mz-cv'), ctx = cv.getContext('2d'), msgEl = root.querySelector('.mz-msg');
    const arrow = root.querySelector('.mz-arrow'), side = root.querySelector('.mz-side'), pad = root.querySelector('.mz-pad');
    const css = getComputedStyle(document.documentElement), tok = n => css.getPropertyValue('--' + n).trim() || 'gray';
    const hue = MZ.HUE[band] || 'green';
    const C = {
      floor: tok('ill-cream-1'), floor2: tok('ill-cream'), w1: tok(`ill-${hue}-1`), w: tok(`ill-${hue}`), w2: tok(`ill-${hue}-2`), w3: tok(`ill-${hue}-3`),
      trail: tok('ill-orange'), trail1: tok('ill-orange-1'), trail2: tok('ill-orange-2'), drop: tok('drop'), ink: tok('ill-ink'), white: tok('ill-white'),
      b: tok('ill-brown'), b1: tok('ill-brown-1'), b2: tok('ill-brown-2'), b3: tok('ill-brown-3'), tan: tok('ill-tan-1'), pink: tok('ill-pink'),
      y: tok('ill-yellow'), y1: tok('ill-yellow-1'), y3: tok('ill-yellow-3'), red: tok('ill-red'), red2: tok('ill-red-2'), red1: tok('ill-red-1'),
      g1: tok('ill-green-1'), g: tok('ill-green'), g2: tok('ill-green-2'), grey: tok('ill-grey-1'), grey2: tok('ill-grey-2'), grey3: tok('ill-grey-3'),
      try: tok('try'), tryt: tok('try-tint'), star: tok('star'), starS: tok('star-shade'),
    };
    const KC = MZ.KEY_HUE.map(k => ({ c1: tok(`ill-${k}-1`), c: tok(`ill-${k}`), c2: tok(`ill-${k}-2`), c3: tok(`ill-${k}-3`) }));

    // ---- geometry ----
    let cs = 40, M0 = 10, size = 0, dpr = 1, bg = null;
    const head = () => st.t[st.t.length - 1];
    const cx = c => M0 + (c % w + 0.5) * cs, cy = c => M0 + (Math.floor(c / w) + 0.5) * cs;
    function layout() {
      const ps = getComputedStyle(el), aw = el.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
      const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
      const land = aw > ah * 1.25;
      root.classList.toggle('land', land);
      let bs = land ? Math.min(ah, aw - side.offsetWidth - 16) : Math.min(aw, ah - side.offsetHeight - 12); // the board's side
      bs = Math.max(150, Math.min(bs, 760));
      M0 = bs < 400 ? 8 : 12;
      cs = Math.min(96, Math.floor((bs - 2 * M0) / Math.max(w, h)));
      size = cs * Math.max(w, h) + 2 * M0;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.style.width = cv.style.height = size + 'px';
      cv.width = cv.height = Math.round(size * dpr);
      bg = null;
      draw();
    }
    // the static layer: floor and walls
    function paintBg() {
      bg = document.createElement('canvas');
      bg.width = bg.height = cv.width;
      const g = bg.getContext('2d');
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.fillStyle = C.floor;
      g.fillRect(0, 0, size, size);
      // a soft warm band along the lower right inside edge, so the floor sits below the outer wall
      g.fillStyle = C.floor2;
      g.fillRect(M0, size - M0 - cs * 0.18, size - 2 * M0, cs * 0.18);
      g.fillRect(size - M0 - cs * 0.18, M0, cs * 0.18, size - 2 * M0);
      // walls merged into long runs
      const segs = [], X = i => M0 + i * cs;
      for (let y = 0; y <= h; y++) {
        let s0 = -1;
        for (let x = 0; x <= w; x++) {
          const on = x < w && (y == 0 || y == h || !(o[(y - 1) * w + x] & 4));
          if (on && s0 < 0) s0 = x;
          if (!on && s0 >= 0) { segs.push([X(s0), X(y), X(x), X(y)]); s0 = -1; }
        }
      }
      for (let x = 0; x <= w; x++) {
        let s0 = -1;
        for (let y = 0; y <= h; y++) {
          const on = y < h && (x == 0 || x == w || !(o[y * w + x - 1] & 2));
          if (on && s0 < 0) s0 = y;
          if (!on && s0 >= 0) { segs.push([X(x), X(s0), X(x), X(y)]); s0 = -1; }
        }
      }
      const t = Math.max(4, Math.min(12, cs * 0.22));
      const stroke = (dx, dy, lw, col) => {
        g.beginPath();
        for (const s of segs) { g.moveTo(s[0] + dx, s[1] + dy); g.lineTo(s[2] + dx, s[3] + dy); }
        g.lineWidth = lw;
        g.strokeStyle = col;
        g.stroke();
      };
      g.lineCap = g.lineJoin = 'round';
      stroke(t * 0.3, t * 0.45, t * 1.15, C.drop); // contact shadow on the floor
      stroke(t * 0.16, t * 0.24, t, C.w3); // shade side (lower right)
      stroke(0, 0, t, C.w); // base
      stroke(-t * 0.16, -t * 0.18, t * 0.38, C.w1); // highlight (upper left)
    }

    // ---- drawing helpers (dynamic layer) ----
    const circ = (x, y, r, col) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill(); };
    const ell = (x, y, rx, ry, col) => { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill(); };
    const rrect = (x, y, ww, hh, r, col) => {
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, ww, hh, r); else ctx.rect(x, y, ww, hh);
      ctx.fillStyle = col;
      ctx.fill();
    };
    function starPath(x, y, r) {
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.48 : r;
        ctx[i ? 'lineTo' : 'moveTo'](x + Math.cos(a) * rr, y + Math.sin(a) * rr);
      }
      ctx.closePath();
    }
    function star(x, y, r) {
      ctx.lineJoin = 'round';
      ctx.lineWidth = r * 0.22;
      starPath(x + r * 0.1, y + r * 0.14, r);
      ctx.fillStyle = ctx.strokeStyle = C.y3;
      ctx.fill(); ctx.stroke();
      starPath(x, y, r);
      ctx.fillStyle = ctx.strokeStyle = C.y;
      ctx.fill(); ctx.stroke();
      ell(x - r * 0.22, y - r * 0.2, r * 0.2, r * 0.13, C.y1);
    }
    function key(x, y, r, k) {
      const K = KC[k] || KC[0], lw = Math.max(2.5, r * 0.36);
      const one = (dx, dy, col) => {
        ctx.save();
        ctx.translate(x + dx, y + dy);
        ctx.rotate(-Math.PI / 4);
        ctx.strokeStyle = col;
        ctx.lineWidth = lw;
        ctx.lineCap = ctx.lineJoin = 'round';
        ctx.beginPath();
        if (k) ctx.rect(-r * 0.95, -r * 0.38, r * 0.76, r * 0.76); else ctx.arc(-r * 0.58, 0, r * 0.38, 0, Math.PI * 2);
        ctx.moveTo(-r * 0.2, 0); ctx.lineTo(r * 0.95, 0);
        ctx.moveTo(r * 0.55, 0); ctx.lineTo(r * 0.55, r * 0.4);
        ctx.moveTo(r * 0.9, 0); ctx.lineTo(r * 0.9, r * 0.3);
        ctx.stroke();
        ctx.restore();
      };
      one(r * 0.1, r * 0.14, K.c3);
      one(0, 0, K.c);
    }
    function door(c, k, open) {
      const K = KC[k] || KC[0], x = M0 + (c % w) * cs, y = M0 + Math.floor(c / w) * cs, i = cs * 0.1, s = cs - 2 * i;
      if (open) {
        ctx.globalAlpha = 0.35;
        rrect(x + i, y + i, s, s, cs * 0.14, K.c1);
        ctx.globalAlpha = 1;
        return;
      }
      rrect(x + i + cs * 0.04, y + i + cs * 0.06, s, s, cs * 0.14, K.c3);
      rrect(x + i, y + i, s, s, cs * 0.14, K.c2);
      rrect(x + i + s * 0.1, y + i + s * 0.08, s * 0.8, s * 0.8, cs * 0.1, K.c);
      ctx.fillStyle = K.c3;
      for (const f of [0.36, 0.64]) ctx.fillRect(x + i + s * f - cs * 0.02, y + i + s * 0.12, cs * 0.04, s * 0.72);
      // the keyhole has the shape of its key's bow (round or square), so colour is not the only cue
      const kx = x + cs / 2, ky = y + cs / 2 - cs * 0.04;
      ctx.fillStyle = C.ink;
      if (k) rrect(kx - cs * 0.13, ky - cs * 0.15, cs * 0.26, cs * 0.26, cs * 0.04, C.ink); else circ(kx, ky - cs * 0.02, cs * 0.14, C.ink);
      ctx.fillStyle = C.ink;
      ctx.fillRect(kx - cs * 0.04, ky + cs * 0.04, cs * 0.08, cs * 0.18);
    }
    function flag(c, locked) {
      const x = cx(c), y = cy(c), r = cs * 0.5;
      circ(x, y, cs * 0.4, C.g1);
      ell(x, y + r * 0.62, r * 0.85, r * 0.32, C.g2);
      ell(x - r * 0.06, y + r * 0.56, r * 0.72, r * 0.24, C.g);
      ctx.strokeStyle = C.grey3;
      ctx.lineCap = 'round';
      ctx.lineWidth = Math.max(2, r * 0.16);
      ctx.beginPath(); ctx.moveTo(x - r * 0.35, y + r * 0.6); ctx.lineTo(x - r * 0.35, y - r * 0.85); ctx.stroke();
      const fl = (dx, dy, col) => {
        ctx.beginPath();
        ctx.moveTo(x - r * 0.3 + dx, y - r * 0.85 + dy); ctx.lineTo(x + r * 0.75 + dx, y - r * 0.85 + dy);
        ctx.lineTo(x + r * 0.45 + dx, y - r * 0.5 + dy); ctx.lineTo(x + r * 0.75 + dx, y - r * 0.12 + dy); ctx.lineTo(x - r * 0.3 + dx, y - r * 0.12 + dy);
        ctx.closePath(); ctx.fillStyle = col; ctx.fill();
      };
      fl(r * 0.06, r * 0.08, C.red2);
      fl(0, 0, C.red);
      ell(x, y - r * 0.68, r * 0.22, r * 0.08, C.red1);
      if (locked) { // the gate: bars across the cell until every star is picked up
        ctx.strokeStyle = C.grey3;
        ctx.lineWidth = Math.max(2, cs * 0.08);
        ctx.beginPath();
        for (const f of [-0.3, 0, 0.3]) { ctx.moveTo(x + f * cs, y - cs * 0.4); ctx.lineTo(x + f * cs, y + cs * 0.4); }
        ctx.moveTo(x - cs * 0.4, y - cs * 0.12); ctx.lineTo(x + cs * 0.4, y - cs * 0.12);
        ctx.stroke();
        ctx.strokeStyle = C.grey;
        ctx.lineWidth = Math.max(1, cs * 0.03);
        ctx.beginPath();
        for (const f of [-0.3, 0, 0.3]) { ctx.moveTo(x + f * cs - cs * 0.02, y - cs * 0.38); ctx.lineTo(x + f * cs - cs * 0.02, y + cs * 0.38); }
        ctx.stroke();
      }
    }
    // the bear cub (light from the top left: shade crescent lower right, highlight upper left)
    function cub(x, y, r) {
      ell(x + r * 0.1, y + r * 0.95, r * 0.8, r * 0.22, C.drop);
      for (const s of [-1, 1]) { circ(x + s * r * 0.66 + r * 0.05, y - r * 0.62 + r * 0.06, r * 0.36, C.b3); circ(x + s * r * 0.66, y - r * 0.62, r * 0.33, C.b2); circ(x + s * r * 0.66, y - r * 0.62, r * 0.16, C.tan); }
      circ(x + r * 0.06, y + r * 0.08, r, C.b2);
      circ(x - r * 0.04, y - r * 0.02, r * 0.9, C.b);
      ell(x - r * 0.38, y - r * 0.5, r * 0.26, r * 0.14, C.b1);
      ell(x, y + r * 0.34, r * 0.44, r * 0.32, C.tan);
      ell(x, y + r * 0.2, r * 0.15, r * 0.11, C.ink);
      for (const s of [-1, 1]) {
        circ(x + s * r * 0.34, y - r * 0.1, r * 0.13, C.ink);
        circ(x + s * r * 0.34 - r * 0.04, y - r * 0.15, r * 0.05, C.white);
        ctx.globalAlpha = 0.55;
        circ(x + s * r * 0.62, y + r * 0.22, r * 0.12, C.pink);
        ctx.globalAlpha = 1;
      }
    }

    function draw() {
      if (!size) return 0;
      const t0 = performance.now();
      if (!bg) paintBg();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(bg, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // start pad
      circ(cx(p.s) + cs * 0.03, cy(p.s) + cs * 0.05, cs * 0.4, C.grey2);
      circ(cx(p.s), cy(p.s), cs * 0.38, C.grey);
      circ(cx(p.s), cy(p.s), cs * 0.25, C.g1);
      // dead ends found (amber, kind)
      for (const c of st.dead) {
        const x = M0 + (c % w) * cs, y = M0 + Math.floor(c / w) * cs;
        rrect(x + cs * 0.14, y + cs * 0.14, cs * 0.72, cs * 0.72, cs * 0.16, c == flash ? C.try : C.tryt);
      }
      (p.doors || []).forEach((c, k) => door(c, k, st.m >> k & 1));
      items.forEach((c, k) => {
        if (st.m >> k & 1) return;
        if (p.stars) star(cx(c), cy(c), cs * 0.44); else key(cx(c), cy(c), cs * 0.5, k);
      });
      flag(p.g, p.stars && st.m != full);
      // the trail: a round tube with a highlight toward the light
      if (st.t.length > 1) {
        ctx.lineCap = ctx.lineJoin = 'round';
        const line = (dx, dy, lw, col) => {
          ctx.beginPath();
          st.t.forEach((c, i) => ctx[i ? 'lineTo' : 'moveTo'](cx(c) + dx, cy(c) + dy));
          ctx.lineWidth = lw;
          ctx.strokeStyle = col;
          ctx.stroke();
        };
        line(cs * 0.04, cs * 0.06, cs * 0.34, C.trail2);
        line(0, 0, cs * 0.3, C.trail);
        line(-cs * 0.05, -cs * 0.05, cs * 0.09, C.trail1);
      }
      // hint dots
      hint.forEach((c, i) => {
        circ(cx(c) + cs * 0.03, cy(c) + cs * 0.04, cs * 0.17, C.starS);
        circ(cx(c), cy(c), cs * (i == hint.length - 1 ? 0.17 : 0.14), C.star);
      });
      cub(cx(head()), cy(head()), cs * 0.5);
      return performance.now() - t0;
    }
    const redraw = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; draw(); }); };

    // ---- status line ----
    const msg = t => { msgEl.textContent = t; };
    function status() {
      if (p.stars) {
        const n = items.filter((c, k) => st.m >> k & 1).length;
        root.querySelectorAll('.mz-st').forEach((e, k) => e.classList.toggle('on', !!(st.m >> k & 1)));
        root.querySelector('.mz-n').textContent = `${n} of ${items.length}`;
      }
      if (p.keys) {
        root.querySelectorAll('.mz-key').forEach((e, k) => e.classList.toggle('on', !!(st.m >> k & 1)));
        root.querySelector('.mz-sn').textContent = st.steps;
      }
    }
    const intro = { A: 'Drag the bear to the flag.', B: 'Drag the bear to the flag.', C: 'Pick up the 3 stars. Then the gate opens.',
      D: items.length > 1 ? 'Find the keys. Each one opens its own door.' : 'Find the key to open the door.' }[band];

    // ---- moving ----
    const save = () => { if (!won) { dirty = false; api.saveState(st); } };
    const nbIn = (c, d) => (o[c] & MZ.BIT[d]) ? c + MZ.DX[d] + MZ.DY[d] * w : -1;
    let told = '';
    function tell(t, speak) { if (told == t) return; told = t; msg(t); if (speak) api.say(t); }
    // one step in direction d: 'ok', 'wall', 'shut' (a door or the gate) or 'won'
    function move(d) {
      if (won) return 'won';
      const c = head(), n = nbIn(c, d);
      if (n < 0) return 'wall';
      arrow.hidden = true; // the hint arrow points from where the bear was
      if (st.t.length > 1 && st.t[st.t.length - 2] == n) { // back over the trail: erase
        st.t.pop();
        dirty = true;
        redraw();
        return 'ok';
      }
      const dk = doorAt(n);
      if (dk >= 0 && !(st.m >> dk & 1)) {
        api.sfx.rattle();
        tell(items.length > 1 ? `This door needs key ${dk + 1}.` : 'This door needs the key.', true);
        return 'shut';
      }
      if (p.stars && n == p.g && st.m != full) {
        api.sfx.rattle();
        tell('Pick up all 3 stars to open the gate.', true);
        return 'shut';
      }
      st.t.push(n);
      st.steps++;
      dirty = true;
      const ik = itemAt(n);
      if (ik >= 0 && !(st.m >> ik & 1)) {
        st.m |= 1 << ik;
        if (p.stars) { api.sfx.coin(); tell(st.m == full ? 'All the stars! The gate is open.' : 'You found a star!'); }
        else { api.sfx.magic(); tell(items.length > 1 ? `You found key ${ik + 1}!` : 'You found the key!'); }
      } else if (dk >= 0) { api.sfx.open(); tell('The door opens!'); }
      else if (MZ.pop(o[n]) == 1 && n != p.g && ik < 0 && !st.dead.includes(n)) {
        st.dead.push(n);
        st.mis++;
        flash = n;
        later(() => { flash = -1; redraw(); }, 700);
        api.sfx.wrong();
        tell('Dead end. Go back!');
      }
      status();
      redraw();
      if (n == p.g) {
        won = true;
        hint = [];
        api.saveState(st);
        msg('You made it!');
        api.win({ mistakes: st.mis });
        return 'won';
      }
      return 'ok';
    }
    // walk toward cell T along open sides, one cell at a time, never away from it (the finger leads the bear)
    function toward(T) {
      for (let k = 0; k < 64 && !won; k++) {
        const c = head();
        if (c == T) return;
        const dx = T % w - c % w, dy = Math.floor(T / w) - Math.floor(c / w);
        const hx = dx ? (dx > 0 ? 1 : 3) : -1, vy = dy ? (dy > 0 ? 2 : 0) : -1;
        let moved = false;
        for (const d of Math.abs(dx) >= Math.abs(dy) ? [hx, vy] : [vy, hx]) {
          if (d < 0) continue;
          const r = move(d);
          if (r == 'ok' || r == 'won') { moved = true; break; }
        }
        if (!moved) return;
      }
    }
    const cellAt = e => {
      const r = cv.getBoundingClientRect(), x = Math.floor((e.clientX - r.left - M0) / cs), y = Math.floor((e.clientY - r.top - M0) / cs);
      return x < 0 || y < 0 || x >= w || y >= h ? -1 : y * w + x;
    };
    const nearHead = e => {
      const r = cv.getBoundingClientRect(), x = e.clientX - r.left - cx(head()), y = e.clientY - r.top - cy(head());
      return Math.hypot(x, y) <= Math.max(cs * 1.25, 34);
    };
    // a tap: back to a spot on the trail, or along a straight open corridor
    function tap(T) {
      if (T < 0 || T == head()) return;
      const i = st.t.indexOf(T);
      if (i >= 0) { while (head() != T) move(dirTo(head(), st.t[st.t.length - 2])); return; }
      const c = head(), dx = T % w - c % w, dy = Math.floor(T / w) - Math.floor(c / w);
      if (dx && dy) return tell('Drag the bear, or tap a spot in a straight line.');
      const d = dx > 0 ? 1 : dx < 0 ? 3 : dy > 0 ? 2 : 0;
      for (let k = c; k != T; k = nbIn(k, d)) if (nbIn(k, d) < 0) return tell('A wall is in the way.');
      while (head() != T && !won) if (move(d) != 'ok' && !won) break;
    }
    const dirTo = (a, b) => b - a == 1 ? 1 : b - a == -1 ? 3 : b > a ? 2 : 0;

    cv.addEventListener('pointerdown', e => {
      if (won || drag) return;
      e.preventDefault();
      try { cv.setPointerCapture(e.pointerId); } catch (er) {}
      told = '';
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, on: nearHead(e), moved: false };
      if (drag.on) { const T = cellAt(e); if (T >= 0) toward(T); }
    });
    cv.addEventListener('pointermove', e => {
      if (!drag || e.pointerId != drag.id) return;
      if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 8) drag.moved = true;
      if (drag.on) { const T = cellAt(e); if (T >= 0) toward(T); }
    });
    const up = e => {
      if (!drag || e.pointerId != drag.id) return;
      const d = drag;
      drag = null;
      if (!d.on && !d.moved && e.type == 'pointerup') tap(cellAt(e));
      else if (!d.on && d.moved) tell('Start the drag on the bear.');
      if (dirty) save();
    };
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', up);
    root.querySelectorAll('.mz-ab').forEach(b => b.onclick = () => { told = ''; move(+b.dataset.d); if (dirty) save(); });
    const keyd = e => {
      const d = { ArrowUp: 0, ArrowRight: 1, ArrowDown: 2, ArrowLeft: 3 }[e.key];
      if (d == null || !cv.isConnected || $('.ovl')) return;
      e.preventDefault();
      told = '';
      move(d);
      if (dirty) save();
    };
    document.addEventListener('keydown', keyd);
    root.querySelector('.mz-tog').onclick = () => {
      const on = pad.hidden;
      pad.hidden = !on;
      root.querySelector('.mz-tog').setAttribute('aria-pressed', on);
      const t = BT.st();
      BT.rec('maze', band, true);
      t.maze.pad = on ? 1 : 0;
      api.sfx.click();
      layout();
      save();
    };
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(layout, 120); };
    window.addEventListener('resize', onResize);

    // ---- hints ----
    function hintNow(tier) {
      if (won) return false;
      const r = MZ.route(p, o, head(), st.m);
      if (!r || r.length < 2) return false;
      clearTimeout(hintT);
      clearTimeout(arrowT);
      const cells = tier >= 2 ? MZ.hintCells(o, r, tier) : [];
      if (tier == 1 || !cells.length) {
        const tg = MZ.target(p, r, st.m), c = head(), dx = tg.c % w - c % w, dy = Math.floor(tg.c / w) - Math.floor(c / w);
        const d = Math.abs(dx) >= Math.abs(dy) ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0);
        const what = tg.kind == 'flag' ? 'The flag' : tg.kind == 'star' ? 'The next star' : items.length > 1 ? `Key ${tg.k + 1}` : 'The key';
        const where = ['up', 'to the right', 'down', 'to the left'][d];
        const off = cs * 0.5 + 30, lim = v => Math.max(28, Math.min(size - 28, v)); // beside the bear, inside the board
        const ax = lim(cx(c) + MZ.DX[d] * off), ay = lim(cy(c) + MZ.DY[d] * off);
        arrow.innerHTML = ico(['arrow-up', 'arrow-right', 'arrow-down', 'arrow-left'][d], 40);
        arrow.style.left = ax + 'px';
        arrow.style.top = ay + 'px';
        arrow.dataset.d = MZ.DIR[d];
        arrow.hidden = false;
        arrow.classList.remove('on');
        void arrow.offsetWidth;
        arrow.classList.add('on');
        arrowT = later(() => { arrow.hidden = true; }, 4500);
        tell(`${what} is ${where}.`, true);
        return true;
      }
      arrow.hidden = true;
      hint = cells;
      redraw();
      hintT = later(() => { hint = []; redraw(); }, 9000);
      tell(tier == 2 ? 'Follow the dots.' : 'Follow the dots past the next turn.', true);
      return true;
    }

    // ---- start ----
    msg(intro);
    status();
    layout();
    if (st.t.length == 1 && band == 'A') api.say(intro);
    const inst = {
      hint: hintNow,
      destroy() {
        timers.forEach(clearTimeout);
        timers.clear();
        clearTimeout(rz);
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        window.removeEventListener('resize', onResize);
        document.removeEventListener('keydown', keyd);
        if (dirty) save();
        if (MZ.cur && MZ.cur.inst === inst) MZ.cur = null;
      },
    };
    MZ.cur = {
      inst, p, st, o,
      at: c => { const r = cv.getBoundingClientRect(); return { x: r.left + cx(c), y: r.top + cy(c) }; },
      draw: () => { bg = null; return draw(); },
      cell: () => cs, hint: () => hint.slice(), head,
    };
    return inst;
  },
});
/* ---------- Brain Teasers: Patterns, matrices, odd one out (P3-09; BRAIN_TEASERS.md 5.5, 7) ----------
   One registered type, `pattern`. A puzzle is a short set of items (band A 3, bands B-D 4); each item is one question with choices:
     seq  "What comes next?"  a row of pictures and a "?" box; 4 choices
     num  "What comes next?"  a row of numbers; 4 choices
     odd  "Which one does not belong?"  4 pictures, one attribute splits them 3-1; the pictures are the choices
     ana  2x2 "A is to B as C is to ?"; 4 choices (band B)
     mat  3x3 matrix, the bottom-right cell missing; 6 choices: 4 differ from the answer in one attribute, 1 in two (bands C, D)
   Bands (levels 1-4 / 5-8 / 9-12 are tiers 0 / 1 / 2; the rule count grows 1 -> 2 -> 3 over the tiers, section 7):
     A  seq (AB, ABC, AAB, ABB, AABB cycles), odd (shape, then size or count, then with a distracting 2-2 split), seq
     B  num (+n, -n), seq (cycles, +1 count, turns of 45 or 90 degrees, up to 3 attributes), ana (1 then 2 changes), odd
     C  mat (1-2 changing attributes), num (x2, x3, +a/+b alternating, squares, big +n), seq, mat
     D  mat (2-3 changing attributes), num (xa+b, Fibonacci-style, triangular, two interleaved), seq (two or three attributes
        with different cycle lengths), mat
   A picture tile is {s shape 0-6 (6 = arrow), c colour 0-5, z size 0-2, n count 1-5, r turn 0-7 in 45 degree steps, arrows only}.
   Colour is never an attribute of its own: within an item it follows one other attribute (shape, size or count) or stays the
   same, so two tiles of different colours always differ in something a colour-blind child can see too.
   Uniqueness (by construction, then checked): every attribute of the shown part must allow exactly one next value under the rule
   library (a cycle of 1-4 seen at least once, steady growth; numbers: + - x, xa+b, second differences, Fibonacci, alternating,
   interleaved, growing differences), and every distractor must fail it; matrices are read by rows or by columns, attribute by
   attribute. tools/test.js re-checks every item with its own independent checker.
   Hints (per item; the frame counts them): 1 names the attribute to watch, 2 states the rule for one row, 3 removes two wrong
   choices. A wrong tap counts a mistake, the choice turns amber and stays out; the child always finishes.
   State (api.saveState): {i item, miss, h hint tier of this item, x wrong taps, g choices removed by hint 3}.
   Drawing: tiles are inline SVG, light from the top left (shadow, shade, base moved toward the light, white gloss), colours
   from the --ill-* tokens through classes in src/css/49-bt-pattern.css; no ids, filters or gradients. */
const PAT = (() => {
  const SHAPES = ['circle', 'square', 'triangle', 'diamond', 'star', 'heart', 'arrow'];
  const ARROW = 6;
  const COLS = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];
  const SIZES = ['small', 'medium', 'big'];
  const DIRS = ['right', 'down and right', 'down', 'down and left', 'left', 'up and left', 'up', 'up and right'];
  const KEYS = ['s', 'z', 'n', 'r']; // what a colour-blind child sees
  const KIND = { s: 'nom', c: 'nom', z: 'lin', n: 'lin', r: 'rot' };
  const DOM = { s: [0, 1, 2, 3, 4, 5], z: [0, 1, 2], n: [1, 2, 3, 4, 5], r: [0, 1, 2, 3, 4, 5, 6, 7] };
  const range = n => Array.from({ length: n }, (_, i) => i);
  const same = (a, b) => KEYS.every(k => a[k] === b[k]);
  // a tile can be drawn readably: four or five copies only at the big size
  const okTile = t => t.n <= 3 || t.z == 2;

  /* ---------- the rule library ---------- */
  const stepOf = (a, b, kind) => kind == 'rot' ? (a - b + 8) & 7 : a - b;
  // values a rule allows after the list v: a cycle of length p (1-4) seen at least once (v longer than p), or steady growth
  function seqNext(v, kind) {
    const L = v.length, out = new Set();
    for (let p = 1; p <= 4 && p < L; p++) if (v.every((x, i) => i < p || x === v[i - p])) out.add(v[L - p]);
    if (kind != 'nom' && L >= 3) {
      const d = stepOf(v[1], v[0], kind);
      if (d && v.every((x, i) => i == 0 || stepOf(x, v[i - 1], kind) === d)) out.add(kind == 'rot' ? (v[L - 1] + d) & 7 : v[L - 1] + d);
    }
    return out;
  }
  // numbers: every rule that explains the shown list (with at least one term more than it needs) and the next value it gives
  function numNext(v) {
    const L = v.length, out = new Set(), d = v.slice(1).map((x, i) => x - v[i]);
    const put = x => { if (Number.isInteger(x)) out.add(x); };
    for (let p = 1; p <= 4 && p < L; p++) if (v.every((x, i) => i < p || x === v[i - p])) put(v[L - p]);
    if (L >= 3 && d[0] && d.every(x => x === d[0])) put(v[L - 1] + d[0]);
    if (L >= 3 && v[0] && v[1] !== v[0]) {
      const q = v[1] / v[0];
      if (v.every((x, i) => i == 0 || x === v[i - 1] * q)) put(v[L - 1] * q);
    }
    if (L >= 4 && v[1] !== v[0]) { // x a + b
      const a = (v[2] - v[1]) / (v[1] - v[0]), b = v[1] - a * v[0];
      if (Number.isInteger(a) && Number.isInteger(b) && v.every((x, i) => i == 0 || x === a * v[i - 1] + b)) put(a * v[L - 1] + b);
    }
    if (L >= 4) { // the differences grow steadily (squares, triangular numbers)
      const dd = d.slice(1).map((x, i) => x - d[i]);
      if (dd[0] && dd.every(x => x === dd[0])) put(v[L - 1] + d[L - 2] + dd[0]);
    }
    if (L >= 4 && d[0] && d.slice(1).every((x, i) => x === d[i] * (d[1] / d[0]))) put(v[L - 1] + d[L - 2] * d[1] / d[0]); // x r differences
    if (L >= 3 && v.every((x, i) => i < 2 || x === v[i - 1] + v[i - 2])) put(v[L - 1] + v[L - 2]); // Fibonacci-style
    if (L >= 4 && d[0] !== d[1] && d.every((x, i) => i < 2 || x === d[i - 2])) put(v[L - 1] + d[L - 3]); // +a, +b, +a, ...
    if (L >= 6) { // two sequences take turns, each growing steadily
      const e = [v[2] - v[0], v[3] - v[1]];
      if (v.every((x, i) => i < 2 || x - v[i - 2] === e[i % 2])) put(v[L - 2] + e[L % 2]);
    }
    return out;
  }
  // matrices: an attribute fits when every row (or every column) is constant, or holds the same three different values,
  // or grows by the same step
  function linesOk(lines, kind) {
    if (lines.every(l => l[0] === l[1] && l[1] === l[2])) return true;
    const key = l => l.slice().sort((a, b) => a - b).join();
    if (lines.every(l => new Set(l).size == 3 && key(l) == key(lines[0]))) return true;
    if (kind != 'nom') {
      const d = stepOf(lines[0][1], lines[0][0], kind);
      if (d && lines.every(l => stepOf(l[1], l[0], kind) === d && stepOf(l[2], l[1], kind) === d)) return true;
    }
    return false;
  }
  function gridOk(v, kind) {
    const rows = [0, 1, 2].map(i => v.slice(i * 3, i * 3 + 3)), cols = [0, 1, 2].map(j => [v[j], v[j + 3], v[j + 6]]);
    return linesOk(rows, kind) || linesOk(cols, kind);
  }
  const matFits = (cells, t, keys) => keys.every(k => gridOk(cells.concat([t]).map(x => x[k]), KIND[k]));
  // 2x2: each attribute keeps A->B in C->D, or A->C in B->D, or (numbers, turns) changes by the same step
  function anaOk(A, B, C, D, k) {
    if (A[k] === B[k] && C[k] === D[k]) return true;
    if (A[k] === C[k] && B[k] === D[k]) return true;
    return KIND[k] != 'nom' && stepOf(D[k], C[k], KIND[k]) === stepOf(B[k], A[k], KIND[k]);
  }
  const anaFits = (sh, t, keys) => keys.every(k => anaOk(sh[0], sh[1], sh[2], t, k));
  const seqFits = (sh, t, keys) => keys.every(k => seqNext(sh.map(x => x[k]), KIND[k]).has(t[k]));
  // odd one out: the tiles that are alone against three by some attribute
  function oddSet(ts, keys) {
    const out = new Set();
    for (const k of keys) {
      const m = {};
      ts.forEach(t => { m[t[k]] = (m[t[k]] || 0) + 1; });
      const vs = Object.values(m);
      if (vs.length == 2 && vs.includes(1) && vs.includes(3)) out.add(ts.findIndex(t => m[t[k]] == 1));
    }
    return out;
  }
  // does the item have exactly one choice that fits (with and without colour)? Used by make() before an item is kept.
  function unique(it) {
    for (const keys of [KEYS.concat('c'), KEYS]) {
      let fit;
      if (it.k == 'num') { const nx = numNext(it.show); fit = it.ch.map(x => nx.has(x)); }
      else if (it.k == 'odd') { const o = oddSet(it.ch, keys); fit = it.ch.map((_, i) => o.has(i)); }
      else if (it.k == 'seq') fit = it.ch.map(t => seqFits(it.show, t, keys));
      else if (it.k == 'ana') fit = it.ch.map(t => anaFits(it.show, t, keys));
      else fit = it.ch.map(t => matFits(it.show, t, keys));
      if (fit.filter(Boolean).length != 1 || !fit[it.a]) return false;
    }
    return true;
  }

  /* ---------- making items ---------- */
  // tier 0 / 1 / 2 = levels 1-4 / 5-8 / 9-12
  const tierOf = level => level <= 4 ? 0 : level <= 8 ? 1 : 2;
  // sequences: per attribute a cycle unit ('AB', 'AAB' ...) or growth ('+1', '-2'); one option is picked per item
  const SEQ = {
    A1: [[{ s: 'AB' }], [{ s: 'ABC' }], [{ s: 'AAB' }, { s: 'ABB' }, { s: 'AABB' }]],
    A2: [[{ z: 'AB' }, { n: 'AB' }], [{ s: 'AAB' }, { s: 'ABB' }, { z: 'ABC' }], [{ n: '+1' }, { s: 'AB', z: 'AB' }, { s: 'AB', n: 'AB' }]],
    B: [[{ s: 'ABC' }, { n: '+1' }, { n: '-1' }, { r: '+2' }], [{ s: 'AB', n: '+1' }, { r: '+2', z: 'AB' }, { s: 'ABC', z: 'ABC' }],
      [{ r: '+1', z: 'AB' }, { r: '-2', z: 'AB', n: 'AB' }, { s: 'AB', z: 'ABC', n: 'AB' }]],
    C: [[{ r: '+1' }, { r: '-1' }, { s: 'AB', n: '+1' }], [{ r: '+2', z: 'ABC' }, { s: 'ABC', n: 'AB' }, { r: '-1', n: 'AB' }],
      [{ r: '+1', z: 'AB', n: 'ABC' }, { s: 'AB', z: 'ABC', n: 'AB' }, { s: 'ABB', z: 'AB', n: 'ABC' }]],
    D: [[{ s: 'AB', z: 'ABC' }, { s: 'ABC', n: 'AB' }, { r: '+1', z: 'ABC' }], [{ s: 'AAB', z: 'AB', n: 'ABC' }, { r: '-1', z: 'AB', n: 'ABC' }],
      [{ s: 'ABB', z: 'AB', n: 'AABC' }, { r: '+2', z: 'ABC', n: 'AAB' }, { s: 'AABC', z: 'AB', n: 'ABC' }]],
  };
  // number rules per band and tier
  const NUM = {
    B: [['add1'], ['add', 'sub1'], ['sub', 'addbig']],
    C: [['addbig', 'mul2'], ['mul', 'alt'], ['sq', 'alt', 'mul']],
    D: [['affine', 'tri'], ['fib', 'inter', 'sqoff'], ['affine', 'fib', 'inter', 'tri']],
  };

  function maker(rnd) {
    const R = (a, b) => a + Math.floor(rnd() * (b - a + 1));
    const pick = a => a[Math.floor(rnd() * a.length)];
    const shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

    // colour follows attribute ck (or stays c0); returns a painter for tiles
    const painter = (ck, cmap, c0) => t => Object.assign(t, { c: ck ? cmap[t[ck] % 6] : c0 });
    // pick the colour link: the first attribute (in random order) whose colours still fit the item's own rule, else one colour
    function paintItem(it, cands, fits) {
      const cmap = shuf(range(6)), c0 = pick(range(6)), all = () => it.show.concat(it.ch || [], it.ans ? [it.ans] : []);
      for (const ck of shuf(cands).concat([null])) {
        const p = painter(ck, cmap, c0);
        all().forEach(p);
        if (!ck || fits()) return p;
      }
    }
    // tiles that differ from t in exactly the attributes `ks`, drawable; s and r only change where they make sense
    function variants(t, ks) {
      let out = [Object.assign({}, t)];
      for (const k of ks) {
        if (k == 'r' && t.s != ARROW) return [];
        if (k == 's' && t.s == ARROW) return [];
        out = out.flatMap(x => DOM[k].filter(v => v !== t[k]).map(v => Object.assign({}, x, { [k]: v })));
      }
      return out.filter(okTile);
    }
    const pairs = ks => ks.flatMap((a, i) => ks.slice(i + 1).map(b => [a, b]));
    // distractor pool: one-off and two-off variants not fitting the rule, scored by plausibility
    function pool(ans, ch, seen, fits, n1, n2) {
      const score = (x, ks) => ks.reduce((a, k) => a + (ch.includes(k) ? 3 : 0) + (seen(k).includes(x[k]) ? 2 : 0), 0) + rnd();
      const one = KEYS.flatMap(k => variants(ans, [k]).map(x => ({ x, ks: [k], sc: score(x, [k]) })));
      const two = pairs(KEYS).flatMap(ks => variants(ans, ks).map(x => ({ x, ks, sc: score(x, ks) })));
      const ok = o => !fits(o.x);
      const by = a => a.filter(ok).sort((p, q) => q.sc - p.sc);
      const take = (a, n, out) => {
        const per = {};
        for (const o of a) {
          if (out.length >= n) break;
          const kk = o.ks.join();
          if ((per[kk] || 0) >= 2 || out.some(p => same(p.x, o.x))) continue;
          per[kk] = (per[kk] || 0) + 1;
          out.push(o);
        }
        return out;
      };
      const got = take(by(one), n1, []);
      if (got.length < n1) return null;
      const all = take(by(two), n1 + n2, got.slice());
      return all.length < n1 + n2 ? null : all.map(o => o.x);
    }

    // ---- what comes next (pictures) ----
    function seq(opts) {
      const spec = pick(opts), ch = Object.keys(spec);
      const zch = 'z' in spec, nGrow = /^[+-]/.test(spec.n || '');
      const base = {
        s: 'r' in spec ? ARROW : R(0, 5), z: nGrow ? 2 : pick([1, 2]),
        n: zch ? 1 : pick([1, 1, 2]), r: 0,
      };
      if (zch && !('n' in spec)) base.n = pick([1, 2]);
      const vals = {}; // attribute -> function(i)
      for (const k of ch) {
        const u = spec[k];
        if (/^[+-]/.test(u)) {
          const d = +u;
          if (k == 'n') { const s0 = d > 0 ? 1 : 5; vals.n = i => s0 + i * d; }
          else { const s0 = R(0, 7); vals.r = i => (s0 + i * (d + 8)) & 7; }
        } else {
          const letters = [...new Set(u)], dom = k == 'n' ? (zch ? [1, 2, 3] : [1, 2, 3, 4, 5]) : k == 'r' ? [0, 2, 4, 6] : DOM[k];
          const m = {}, pl = shuf(dom);
          letters.forEach((l, i) => { m[l] = pl[i]; });
          vals[k] = i => m[u[i % u.length]];
        }
      }
      // the shortest row (4 to 7 shown) in which every changing attribute allows exactly one next value
      const okAt = L => ch.every(k => {
        const v = range(L + 1).map(vals[k]);
        if (v.some(x => !DOM[k].includes(x))) return false;
        const nx = seqNext(v.slice(0, L), KIND[k]);
        return nx.size == 1 && nx.has(v[L]);
      });
      // a cycle is shown once whole and two more (AB AB, ABC AB, AAB AAB); growth from 4 pictures
      const L0 = Math.max(4, ...ch.map(k => /^[+-]/.test(spec[k]) ? 4 : spec[k].length + 2));
      let L = 0;
      for (let l = L0; l <= 7 && !L; l++) if (okAt(l)) L = l;
      if (!L) return null;
      if (L < 6 && okAt(L + 1) && rnd() < 0.5) L++;
      const tiles = range(L + 1).map(i => { const t = Object.assign({}, base); for (const k of ch) t[k] = vals[k](i); return t; });
      if (!tiles.every(okTile)) return null;
      const it = { k: 'seq', show: tiles.slice(0, L), ans: tiles[L], at: ch, spec };
      const seen = k => it.show.map(t => t[k]);
      const ds = pool(it.ans, ch, seen, t => seqFits(it.show, t, KEYS), 2, 1);
      if (!ds) return null;
      it.ch = ds;
      const p = paintItem(it, ch.filter(k => k != 'r' && !/^[+-]/.test(spec[k])), () => seqFits(it.show, it.ans, ['c']));
      return finish(it, p);
    }
    // put the answer among the distractors at a random place
    function finish(it, p) {
      const ch = shuf(it.ch.concat([it.ans]));
      if (p) ch.forEach(p);
      it.a = ch.findIndex(t => t === it.ans);
      it.ch = ch;
      delete it.ans;
      return unique(it) ? it : null;
    }

    // ---- odd one out ----
    function odd(X, noise) {
      const ys = shuf(['s', 'z', 'n'].filter(k => k != X)).slice(0, noise);
      const t0 = { s: R(0, 5), z: 2, n: 1, r: 0 };
      if (X == 'z' || ys.includes('z')) { t0.z = R(0, 2); t0.n = pick([1, 2]); }
      if (X == 'n' || ys.includes('n')) t0.n = R(1, 3);
      const ts = range(4).map(() => Object.assign({}, t0)), o = R(0, 3);
      ts[o][X] = pick(DOM[X].filter(v => v !== t0[X] && (X != 'n' || v <= 4)));
      for (const y of ys) {
        const v2 = pick(DOM[y].filter(v => v !== t0[y] && (y != 'n' || v <= 3))), two = shuf(range(4)).slice(0, 2);
        two.forEach(i => { ts[i][y] = v2; });
      }
      if (!ts.every(okTile)) return null;
      const it = { k: 'odd', show: [], ch: ts, a: o, at: [X], noise: ys };
      const p = paintItem(it, [X].concat(ys), () => { const s = oddSet(ts, ['c']); return !s.size || (s.size == 1 && s.has(o)); });
      ts.forEach(p);
      return unique(it) ? it : null;
    }

    // ---- 2x2: A is to B as C is to ? ----
    function ana(kx, close) {
      const ks = shuf(['s', 'z', 'n']), X = ks.slice(0, kx), Y = ks.slice(kx, kx + 1);
      const A = { s: R(0, 5), z: R(0, 2), n: R(1, 2), r: 0 };
      if (!X.includes('z') && !Y.includes('z')) A.z = 2;
      const chg = (t, k) => {
        // sizes jump between small and big where they can, so the change is easy to see next to a count
        const dom = k == 'n' ? [1, 2, 3].filter(v => v != t.n) : k == 'z' ? (t.z == 1 ? [0, 2] : [2 - t.z]) : DOM[k].filter(v => v !== t[k]);
        return Object.assign({}, t, { [k]: pick(dom) });
      };
      let B = A;
      for (const k of X) B = chg(B, k);
      let C = A;
      for (const k of Y) C = chg(C, k);
      const D = Object.assign({}, B);
      for (const k of Y) D[k] = C[k];
      if (![A, B, C, D].every(okTile)) return null;
      const it = { k: 'ana', show: [A, B, C], ans: D, at: X.concat(Y), x: X, y: Y };
      const fits = t => anaFits(it.show, t, KEYS);
      const seen = k => it.show.map(t => t[k]);
      let ds = pool(D, X.concat(Y), seen, fits, 3, 0);
      if (!ds) return null;
      // the copy mistakes (the picture above or beside the box) are the most tempting ones on easy levels
      if (!close) for (const t of [B, C]) if (!fits(t) && !ds.some(x => same(x, t)) && KEYS.filter(k => t[k] !== D[k]).length <= 2) ds[ds.length - 1] = Object.assign({}, t);
      ds = ds.filter((x, i) => ds.findIndex(y => same(x, y)) == i);
      if (ds.length < 3) return null;
      it.ch = ds;
      const p = paintItem(it, X.concat(Y), () => anaFits(it.show, it.ans, ['c']));
      return finish(it, p);
    }

    // ---- 3x3 matrix ----
    function mat(nch, rules) {
      const useR = nch < 3 ? rnd() < 0.3 : rnd() < 0.25, ch = shuf(useR ? ['r', 'z', 'n'] : ['s', 'z', 'n']).slice(0, nch);
      const zch = ch.includes('z');
      const cst = { s: useR ? ARROW : R(0, 5), z: 2, n: pick([1, 2]), r: 0 };
      if (!zch && !ch.includes('n')) cst.z = pick([1, 2]);
      const g = range(9).map(() => Object.assign({}, cst)), rl = {};
      for (const k of ch) {
        const opts = rules.filter(x => !(x == 'prog' && k == 's'));
        const rule = rl[k] = pick(opts);
        let put;
        if (rule == 'prog') {
          if (k == 'z') { const v = pick([[0, 1, 2], [2, 1, 0]]); put = (i, j) => v[j]; }
          else if (k == 'n') {
            const d = pick([1, -1]), st = !zch && rnd() < 0.5 ? (d > 0 ? [1, 2, 3] : [5, 4, 3]) : (d > 0 ? [1, 1, 1] : [3, 3, 3]);
            put = (i, j) => st[i] + j * d;
          } else { const d = pick([1, 2, 6, 7]), st = range(3).map(() => R(0, 7)); put = (i, j) => (st[i] + j * d) & 7; }
        } else {
          const dom = k == 'n' ? (zch ? [1, 2, 3] : [1, 2, 3, 4]) : k == 'r' ? [0, 2, 4, 6] : DOM[k];
          const v = shuf(dom).slice(0, 3), sh = pick([1, 2]);
          put = rule == 'rowc' ? (i => v[i]) : ((i, j) => v[(j + i * sh) % 3]);
        }
        range(9).forEach(c => { g[c][k] = put(Math.floor(c / 3), c % 3); });
      }
      if (!g.every(okTile)) return null;
      const it = { k: 'mat', show: g.slice(0, 8), ans: g[8], at: ch, rules: rl };
      const seen = k => it.show.map(t => t[k]);
      const ds = pool(it.ans, ch, seen, t => matFits(it.show, t, KEYS), 4, 1);
      if (!ds) return null;
      it.ch = ds;
      const p = paintItem(it, ch.filter(k => k != 'r'), () => matFits(it.show, it.ans, ['c']));
      return finish(it, p);
    }

    // ---- numbers ----
    function num(rules, max) {
      const rule = pick(rules);
      let v, n = 5;
      const ar = (s, d, m) => range(m).map(i => s + i * d);
      switch (rule) {
        case 'add1': v = ar(R(0, 10), R(1, 3), n); break;
        case 'add': v = ar(R(1, 20), pick([2, 3, 4, 5, 10]), n); break;
        case 'sub1': { const d = R(1, 3); v = ar(R(4 * d + 1, 20), -d, n); break; }
        case 'sub': { const d = pick([2, 3, 4, 5, 10]); v = ar(R(5 * d + 1, Math.min(100, 5 * d + 40)), -d, n); break; }
        case 'addbig': v = ar(R(10, 40), R(6, 12), n); break;
        case 'mul2': { const s = R(1, 5); v = range(n).map(i => s * 2 ** i); break; }
        case 'mul': { const q = pick([2, 3]), s = q == 2 ? R(1, 6) : R(1, 3); v = range(n).map(i => s * q ** i); break; }
        case 'alt': { const a = R(1, 5), b = pick([2, 3, 4, 5, 6, 8, 10].filter(x => x != a)); let x = R(1, 15); v = [x]; for (let i = 1; i < n; i++) v.push(x += i % 2 ? a : b); break; }
        case 'sq': { const s = R(1, 4); v = range(n).map(i => (s + i) ** 2); break; }
        case 'sqoff': { const s = R(1, 4), o = pick([-1, 1, 2, 3]); v = range(n).map(i => (s + i) ** 2 + o); break; }
        case 'tri': { const s = R(1, 4); v = range(n).map(i => (s + i) * (s + i + 1) / 2); break; }
        case 'affine': { const a = pick([2, 2, 3]), b = pick(a == 2 ? [-1, 1, 2, 3] : [-1, 1]); let x = R(a == 2 ? 2 : 1, a == 2 ? 6 : 3); v = [x]; for (let i = 1; i < n; i++) v.push(x = a * x + b); break; }
        case 'fib': { let a = R(1, 4), b = R(a, a + 4); v = [a, b]; while (v.length < n) v.push(v[v.length - 1] + v[v.length - 2]); break; }
        case 'inter': {
          n = 6;
          const s0 = R(1, 10), e0 = pick([1, 2, 3, 5]), s1 = R(20, 40), e1 = -pick([1, 2, 3, 4]);
          v = range(n + 1).map(i => i % 2 ? s1 + ((i - 1) / 2) * e1 : s0 + (i / 2) * e0);
          break;
        }
      }
      if (rule != 'inter') {
        // the next term of the same rule
        const nx = numNext(v);
        if (nx.size != 1) return null;
        v.push([...nx][0]);
      }
      const ans = v[n], show = v.slice(0, n);
      if (v.some(x => x < 0 || x > 999) || ans > max) return null;
      const nx = numNext(show);
      if (nx.size != 1 || !nx.has(ans)) return null;
      const last = show[n - 1], dl = last - show[n - 2], d0 = show[1] - show[0];
      const cands = [last + dl, ans + 1, ans - 1, ans + 2, ans - 2, last + d0, ans + dl, ans - dl, ans + 10, ans - 10, last * 2, last + dl + 1]
        .filter((x, i, a) => x > 0 && x !== ans && a.indexOf(x) == i && !nx.has(x) && Math.abs(x - ans) <= Math.max(12, ans * 0.6) && x <= max);
      if (cands.length < 3) return null;
      // the copy mistake (the same step again) first, then the near misses in random order
      const ds = [cands[0]].concat(shuf(cands.slice(1)).slice(0, 2));
      const ch = shuf(ds.concat([ans]));
      const it = { k: 'num', show, ch, a: ch.indexOf(ans), rule, at: ['v'] };
      return unique(it) ? it : null;
    }

    return { seq, odd, ana, mat, num, pick, R, shuf };
  }

  // the items of a puzzle: band and tier choose the kinds and how many attributes change
  function make(band, level, rnd) {
    const m = maker(rnd), t = tierOf(level);
    const plan = {
      A: [() => m.seq(SEQ.A1[t]), () => m.odd(t == 0 ? 's' : m.pick(t == 1 ? ['z', 'n'] : ['s', 'z', 'n']), t == 2 ? 1 : 0), () => m.seq(SEQ.A2[t])],
      B: [() => m.num(NUM.B[t], 100), () => m.seq(SEQ.B[t]), () => m.ana(t == 2 ? 2 : 1, t > 0), () => m.odd(m.pick(['s', 'z', 'n']), t == 2 ? 2 : 1)],
      C: [() => m.mat(t == 0 ? 1 : 2, ['latin', 'prog', 'rowc']), () => m.num(NUM.C[t], 999), () => m.seq(SEQ.C[t]), () => m.mat(t == 0 ? 1 : 2, ['latin', 'prog', 'rowc'])],
      D: [() => m.mat(t == 0 ? 2 : 3, ['latin', 'prog', 'rowc']), () => m.num(NUM.D[t], 999), () => m.seq(SEQ.D[t]), () => m.mat(t == 0 ? 2 : 3, t == 2 ? ['latin', 'prog'] : ['latin', 'prog', 'rowc'])],
    }[band];
    // band B mixes the order of its four kinds by level
    const order = band == 'B' ? range(4).map(i => (i + level) % 4) : range(plan.length);
    const items = order.map(i => {
      for (let tries = 0; tries < 400; tries++) { const it = plan[i](); if (it) return it; }
      throw new Error('pattern: no item for ' + band + level);
    });
    return { v: 1, band, level, items };
  }
  const solve = p => p.items.map(it => it.a);

  /* ---------- words: prompts and hints ---------- */
  const ASK = { seq: 'What comes next?', num: 'What number comes next?', odd: 'Which one does not belong?', ana: 'Which one goes in the box?', mat: 'Which one goes in the box?' };
  const WATCH = { s: 'the shapes', z: 'the sizes', n: 'how many there are', r: 'where the arrow points' };
  const and = a => a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
  const val = (k, v) => k == 's' ? SHAPES[v] : k == 'z' ? SIZES[v] : k == 'n' ? String(v) : DIRS[v];
  const turnWords = d => {
    const dd = d > 4 ? d - 8 : d, a = Math.abs(dd);
    return `turns ${a == 2 ? 'a quarter turn' : a == 1 ? 'an eighth of a turn' : a + ' eighths of a turn'} ${dd > 0 ? 'the way clock hands go' : 'the other way'}`;
  };
  // the words of a tile, for aria labels: "2 small red circles"
  function say(t) {
    const nm = SHAPES[t.s] + (t.n > 1 ? 's' : ''), dir = t.s == ARROW ? ` pointing ${DIRS[t.r]}` : '';
    return `${t.n > 1 ? t.n + ' ' : ''}${SIZES[t.z]} ${COLS[t.c]} ${nm}${dir}`;
  }
  const NUMRULE = {
    add1: v => `Each number is ${v[1] - v[0]} more than the one before.`,
    add: v => `Each number is ${v[1] - v[0]} more than the one before.`,
    addbig: v => `Each number is ${v[1] - v[0]} more than the one before.`,
    sub1: v => `Each number is ${v[0] - v[1]} less than the one before.`,
    sub: v => `Each number is ${v[0] - v[1]} less than the one before.`,
    mul2: () => 'Each number is double the one before.',
    mul: v => v[1] / v[0] == 2 ? 'Each number is double the one before.' : 'Each number is 3 times the one before.',
    alt: v => `It goes up ${v[1] - v[0]}, then ${v[2] - v[1]}, then ${v[1] - v[0]}, then ${v[2] - v[1]}.`,
    sq: v => `They are square numbers: ${Math.sqrt(v[0])} x ${Math.sqrt(v[0])}, ${Math.sqrt(v[1])} x ${Math.sqrt(v[1])}, and so on.`,
    sqoff: v => `It goes up ${v[1] - v[0]}, ${v[2] - v[1]}, ${v[3] - v[2]}: each jump is 2 more than the last.`,
    tri: v => `It goes up ${v[1] - v[0]}, ${v[2] - v[1]}, ${v[3] - v[2]}: each jump is 1 more than the last.`,
    affine: v => { const a = (v[2] - v[1]) / (v[1] - v[0]), b = v[1] - a * v[0]; return `Times ${a}, then ${b < 0 ? 'take away ' + -b : 'add ' + b}.`; },
    fib: () => 'Each number is the two numbers before it added together.',
    inter: v => `Two patterns take turns: ${v[0]}, ${v[2]}, ${v[4]} and ${v[1]}, ${v[3]}, ${v[5]}.`,
  };
  const NUMWATCH = { fib: 'Look at the two numbers before each one.', inter: 'Look at every other number.' };
  // the rule of one attribute of a sequence, in words
  function seqRule(it, k) {
    const u = it.spec[k];
    if (/^[+-]/.test(u)) return k == 'n' ? (+u > 0 ? 'There is one more each time.' : 'There is one less each time.') : `The arrow ${turnWords(+u)} each time.`;
    const v = it.show.slice(0, u.length).map(t => val(k, t[k]));
    const nm = { s: 'The shapes go', z: 'The sizes go', n: 'The numbers of shapes go', r: 'The arrow points' }[k];
    return `${nm} ${v.join(', ')}, then again.`;
  }
  function matRule(it, k) {
    const r = it.rules[k], row = it.show.slice(0, 3).map(t => t[k]);
    if (r == 'rowc') return { s: 'In each row, the shapes are the same.', z: 'In each row, the sizes are the same.', n: 'In each row, every picture has the same number of shapes.', r: 'In each row, the arrows point the same way.' }[k];
    const srt = row.slice().sort((a, b) => a - b);
    if (r == 'latin') return {
      s: `In each row there is one ${and(row.map(v => SHAPES[v]))}.`.replace(/, /g, ', one ').replace(' and ', ' and one '),
      z: 'In each row there is one small, one medium and one big picture.',
      n: `In each row there are pictures with ${and(srt.map(String))} shapes.`,
      r: `In each row the arrows point ${and(row.map(v => DIRS[v]))}, in some order.`,
    }[k];
    if (k == 'z') return row[0] < row[1] ? 'In each row, the shapes get bigger.' : 'In each row, the shapes get smaller.';
    if (k == 'n') return row[0] < row[1] ? 'In each row, there is one more shape each time.' : 'In each row, there is one less shape each time.';
    return `In each row, the arrow ${turnWords((row[1] - row[0] + 8) & 7)} each time.`;
  }
  function anaRule(it) {
    const [A, B] = it.show;
    return 'From the first picture to the second, ' + and(it.x.map(k => k == 's' ? `the ${SHAPES[A.s]} turns into a ${SHAPES[B.s]}`
      : k == 'z' ? `it gets ${B.z > A.z ? 'bigger' : 'smaller'}` : `${A.n} ${A.n > 1 ? 'shapes become' : 'shape becomes'} ${B.n}`)) + '.';
  }
  // the hint words of tier 1 and 2
  function hintText(it, tier) {
    if (it.k == 'num') return tier == 1 ? (NUMWATCH[it.rule] || 'Look at how each number changes from the one before.') : NUMRULE[it.rule](it.show);
    if (tier == 1) return 'Look at ' + and(it.at.map(k => WATCH[k])) + '.';
    const k = it.at[0];
    if (it.k == 'seq') return it.at.map(a => seqRule(it, a)).join(' ');
    if (it.k == 'mat') return it.at.map(a => matRule(it, a)).join(' ');
    if (it.k == 'ana') return anaRule(it);
    const t = it.ch[(it.a + 1) % 4];
    return { s: `Three of them are ${SHAPES[t.s]}s.`, z: `Three of them are ${SIZES[t.z]}.`, n: `Three of them have ${t.n} ${t.n > 1 ? 'shapes' : 'shape'}.` }[k];
  }

  /* ---------- drawing ---------- */
  const f1 = x => Math.round(x * 10) / 10;
  const STAR = (() => {
    let d = '';
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 16 : 37;
      d += (i ? 'L' : 'M') + f1(r * Math.cos(a)) + ' ' + f1(r * Math.sin(a) + 3);
    }
    return d + 'Z';
  })();
  // shapes in a box of about -38..38 around 0,0 (the arrow points right); g: a gloss stroke on the side toward the light
  const SP = [
    { d: 'M-35 0A35 35 0 1 1 35 0A35 35 0 1 1 -35 0Z', g: 'M-22 -14A25 25 0 0 1 -8 -25' },
    { d: 'M-29 -29H29V29H-29Z', g: 'M-20 -20H-6' },
    { d: 'M0 -33L35 29H-35Z', g: 'M-8 -12L-16 3' },
    { d: 'M0 -38L35 0L0 38L-35 0Z', g: 'M-20 -8L-9 -20' },
    { d: STAR, g: 'M-9 -9L-4 -21' },
    { d: 'M0 33C-44 6 -38 -31 -17 -31C-7 -31 -1 -24 0 -17C1 -24 7 -31 17 -31C38 -31 44 6 0 33Z', g: 'M-26 -9C-27 -18 -22 -23 -15 -24' },
    { d: 'M-34 -12H2V-30L36 0L2 30V12H-34Z', g: 'M-27 -5H-5', turn: true },
  ];
  // copies of a shape: where they sit (in a 100 x 100 tile) and how big, by count
  const SPOT = {
    1: [[50, 50]], 2: [[28, 50], [72, 50]], 3: [[50, 28], [28, 71], [72, 71]], 4: [[29, 29], [71, 29], [29, 71], [71, 71]],
    5: [[26, 26], [74, 26], [50, 50], [26, 74], [74, 74]],
  };
  const SCALE = { 1: 1.08, 2: 0.54, 3: 0.52, 4: 0.48, 5: 0.4 }, ZF = [0.54, 0.77, 1];
  function copy(t, x, y, k) {
    const s = SP[t.s], rot = s.turn ? ` rotate(${t.r * 45})` : '';
    return `<g transform="translate(${x} ${y}) scale(${f1(k * 100) / 100})">` +
      `<path class="pt-sw" transform="translate(4 5)${rot}" d="${s.d}"/>` +
      `<path class="pt-sd"${rot ? ` transform="${rot.trim()}"` : ''} d="${s.d}"/>` +
      `<path class="pt-sb" transform="translate(-3 -3)${rot} scale(.86)" d="${s.d}"/>` +
      `<path class="pt-sg" transform="translate(-3 -3)${rot} scale(.86)" d="${s.g}"/></g>`;
  }
  function tile(t) {
    const k = SCALE[t.n] * ZF[t.z];
    return `<svg class="pt-t" viewBox="0 0 100 100" aria-hidden="true"><g class="pt-c${t.c}">` +
      SPOT[t.n].map(([x, y]) => copy(t, x, y, k)).join('') + '</g></svg>';
  }

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    let st = api.loadState() || { i: 0, miss: 0, h: 0, x: [], g: [] }, busy = 0, alive = true;
    const N = p.items.length;
    const face = (it, c) => it.k == 'num' ? `<b class="pt-nm">${c}</b>` : tile(c);
    const cell = (inner, cls) => `<span class="pt-cell${cls ? ' ' + cls : ''}">${inner}</span>`;
    const qbox = '<span class="pt-cell pt-q" aria-label="The missing one"><b>?</b></span>';
    function board(it) {
      if (it.k == 'odd') return '';
      if (it.k == 'num') return `<div class="pt-board pt-row pt-nrow" style="--n:${it.show.length + 1}">${it.show.map(v => cell(`<b class="pt-nm">${v}</b>`)).join('')}${qbox}</div>`;
      if (it.k == 'seq') {
        const n = it.show.length + 1;
        return `<div class="pt-board pt-row${n > 6 ? ' pt-wrap' : ''}" style="--n:${n};--n2:${Math.ceil(n / 2)}" role="img" aria-label="A row of pictures">` +
          it.show.map(t => cell(tile(t))).join('') + qbox + '</div>';
      }
      const w = it.k == 'mat' ? 3 : 2;
      return `<div class="pt-board pt-grid g${w}" role="img" aria-label="${w} by ${w} pictures">${it.show.map(t => cell(tile(t))).join('')}${qbox}</div>`;
    }
    function draw() {
      const it = p.items[st.i];
      const dots = range(N).map(i => `<i class="${i < st.i ? 'on' : i == st.i ? 'now' : ''}"></i>`).join('');
      const chs = it.ch.map((c, i) => {
        const x = st.x.includes(i), g = st.g.includes(i);
        const lab = it.k == 'num' ? String(c) : say(c);
        return `<button class="choice pt-ch${x ? ' wrong' : ''}${g ? ' off' : ''}" data-c="${i}" aria-label="${esc(lab)}"${x || g ? ' disabled' : ''}>${face(it, c)}</button>`;
      }).join('');
      el.innerHTML = `<div class="pt pt-${it.k}"><div class="pt-head"><span class="pt-dots" role="img" aria-label="Question ${st.i + 1} of ${N}">${dots}</span>` +
        `<p class="pt-ask">${esc(ASK[it.k])}</p>${UI.ibtn('speak', 'Hear the question', { size: 'sm', cls: 'pt-say' })}</div>` +
        `<div class="pt-main">${board(it)}<div class="pt-side"><p class="pt-tip" role="status"${st.h && st.h < 3 ? '' : ' hidden'}>${ico('hint', 24)}<span>${st.h && st.h < 3 ? esc(hintText(it, st.h)) : ''}</span></p>` +
        `<div class="pt-chs n${it.ch.length}">${chs}</div></div></div></div>`;
      el.querySelector('.pt-say').onclick = () => api.say(ASK[it.k]);
      el.querySelectorAll('.pt-ch').forEach(b => b.onclick = () => tap(+b.dataset.c, b));
    }
    function tap(i, b) {
      const it = p.items[st.i];
      if (busy || !alive || st.x.includes(i) || st.g.includes(i)) return;
      if (i !== it.a) {
        st.miss++;
        st.x.push(i);
        api.saveState(st);
        b.classList.add('wrong');
        b.disabled = true;
        api.sfx.wrong();
        return;
      }
      b.classList.add('right');
      el.querySelectorAll('.pt-ch').forEach(x => { x.disabled = true; });
      const q = el.querySelector('.pt-q');
      if (q) { q.classList.remove('pt-q'); q.classList.add('pt-got'); q.innerHTML = face(it, it.ch[it.a]); q.removeAttribute('aria-label'); }
      api.sfx.right(st.i + 3);
      const last = st.i == N - 1;
      st = { i: st.i + 1, miss: st.miss, h: 0, x: [], g: [] };
      if (last) { api.win({ mistakes: st.miss }); return; }
      api.saveState(st);
      busy = setTimeout(() => { busy = 0; if (alive) { draw(); if (api.band == 'A') api.say(ASK[p.items[st.i].k]); } }, 1100);
    }
    draw();
    if (api.band == 'A') api.say(ASK[p.items[st.i].k]);
    return {
      hint() {
        if (busy || st.i >= N) return false;
        const it = p.items[st.i];
        if (st.h >= 3) return false; // this item's hints are used up
        if (st.h < 2) {
          st.h++;
          api.saveState(st);
          const tip = el.querySelector('.pt-tip'), w = hintText(it, st.h);
          tip.querySelector('span').textContent = w;
          tip.hidden = false;
          api.say(w);
          return true;
        }
        // tier 3: two wrong choices go away (fewer when fewer are left)
        const left = it.ch.map((_, i) => i).filter(i => i !== it.a && !st.x.includes(i) && !st.g.includes(i));
        if (!left.length) return false;
        st.h = 3;
        const go = left.slice(0, 2);
        st.g.push(...go);
        api.saveState(st);
        go.forEach(i => { const b = el.querySelector(`.pt-ch[data-c="${i}"]`); b.classList.add('off'); b.disabled = true; });
        el.querySelector('.pt-tip').hidden = true;
        return true;
      },
      destroy() { alive = false; clearTimeout(busy); },
    };
  }

  return { make, solve, mount, hintText, tile, say, seqNext, numNext, unique, SHAPES, COLS };
})();

BT.reg({
  id: 'pattern', name: 'Patterns', icon: 'skill-pattern', bands: 'ABCD', allow: 1,
  rules: 'Find the picture or number that fits the pattern.',
  make: PAT.make, mount: PAT.mount, solve: PAT.solve,
});
/* ---------- Brain Teasers: number puzzles (P3-10; BRAIN_TEASERS.md 5.6, 7) ----------
   Three types, registered separately as the catalog lists them (section 4):
     pyramid  Number Pyramid, bands B C D: each brick is the sum of the two under it. 3 / 4 / 5 rows, bottom numbers 1-9 / 1-12 / 1-20.
              As many givens as the bottom row has bricks (plus 2, 1, 0 extra over levels 1-3, 4-7, 8-12). Accepted only when the
              givens fix every brick (full rank, small Gaussian elimination) and, in bands B and C, when "two of a triple known gives
              the third" fills the pyramid. Band D levels 10-12 look for puzzles that need more than that and mark them tricky.
     balance  Balance, bands A B C D: pictures stand for hidden whole numbers on level scales. A one unknown (1-5); B two, triangular
              (each scale adds one new picture, 1-10); C three, triangular, repeated pictures, and a last question that is an
              expression (apple + banana x 2 = ?, 1-12); D not triangular: two scales in two unknowns (sum and difference,
              2a + b and a + b, a + 2b and 2a + b), from level 9 three in three (pair sums, a sum and two differences), 1-20.
              Built from the answer, so there is exactly one (the determinant is checked).
     target   Make the Number, bands B C D: B two of five tiles with + or - (target 5-20); C all of three tiles with + - x (target
              up to 50); D all of four tiles 1-13 with + - x / (target 24 on levels 1-6, 10-100 after). Built from a random
              expression; an exhaustive search (whole, non-negative steps) counts the different solutions, and a level picks among
              six candidates by that count: level 1 the most solutions, level 12 the fewest. Any correct way wins.
   Entry uses the question screen's number pad (padHTML from 49-kinds.js) laid out in two rows; a wrong number counts a mistake,
   shakes, and on a balance tips the scale to the heavier side. The pure rules (make, check, hint, solve) live in BTN so tools/test.js
   can run them without a page. Hints: tier 1 points (marks), tier 2 says how (never the number), tier 3 fills one answer or does
   one step; pressing again fills the next one, so a child can always finish.
   Drawing: tokens only (classes in src/css/49-bt-number.css), light from the top left (gloss upper left, shade and ledge lower
   right). The balance is inline SVG whose arm turns and whose trays move with CSS transforms. */
const BTN = (() => {
  const ri = (rnd, a, b) => a + Math.floor(rnd() * (b - a + 1));
  const pickR = (rnd, a) => a[Math.floor(rnd() * a.length)];
  const shuf = (rnd, a) => {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  };
  const ramp = level => (Math.min(12, Math.max(1, level)) - 1) / 11; // 0 at level 1, 1 at level 12

  /* ================= Number Pyramid ================= */
  // Bricks are numbered row by row from the bottom: row r (0 = bottom) has n - r bricks; brick (r, i) sits on (r-1, i) and (r-1, i+1).
  const PYR = {
    ROWS: { B: 3, C: 4, D: 5 },
    MAX: { B: 9, C: 12, D: 20 }, // bottom numbers 1..MAX
    id(n, r, i) {
      let k = 0;
      for (let q = 0; q < r; q++) k += n - q;
      return k + i;
    },
    // [[r, i], ...] for every brick index
    cells(n) {
      const out = [];
      for (let r = 0; r < n; r++) for (let i = 0; i < n - r; i++) out.push([r, i]);
      return out;
    },
    // every triple: [top, left, right] brick indices
    triples(n) {
      const out = [];
      for (let r = 1; r < n; r++) for (let i = 0; i < n - r; i++) out.push([PYR.id(n, r, i), PYR.id(n, r - 1, i), PYR.id(n, r - 1, i + 1)]);
      return out;
    },
    values(bottom) {
      const n = bottom.length, v = bottom.slice();
      for (let r = 1; r < n; r++) for (let i = 0; i < n - r; i++) v.push(v[PYR.id(n, r - 1, i)] + v[PYR.id(n, r - 1, i + 1)]);
      return v;
    },
    // the coefficients of brick (r, i) on the bottom row: binomials C(r, k) at i..i+r
    coef(n, r, i) {
      const c = new Array(n).fill(0);
      let b = 1;
      for (let k = 0; k <= r; k++) {
        c[i + k] = b;
        b = b * (r - k) / (k + 1);
      }
      return c;
    },
    // rank of the givens' rows (Gaussian elimination with partial pivoting; numbers are small)
    rank(n, given) {
      const cells = PYR.cells(n), m = given.map(g => PYR.coef(n, cells[g][0], cells[g][1]));
      let rank = 0;
      for (let col = 0; col < n && rank < m.length; col++) {
        let piv = rank;
        for (let r = rank + 1; r < m.length; r++) if (Math.abs(m[r][col]) > Math.abs(m[piv][col])) piv = r;
        if (Math.abs(m[piv][col]) < 1e-9) continue;
        [m[rank], m[piv]] = [m[piv], m[rank]];
        for (let r = 0; r < m.length; r++) {
          if (r == rank) continue;
          const f = m[r][col] / m[rank][col];
          if (f) for (let c = col; c < n; c++) m[r][c] -= f * m[rank][c];
        }
        rank++;
      }
      return rank;
    },
    // "two of a triple known gives the third", repeated. known: array of booleans (changed in place). Returns the number filled.
    spread(n, v, known) {
      const T = PYR.triples(n);
      let added = 0, more = true;
      while (more) {
        more = false;
        for (const [t, a, b] of T) {
          const k = known[t] + known[a] + known[b];
          if (k != 2) continue;
          if (!known[t]) known[t] = true; else if (!known[a]) known[a] = true; else known[b] = true;
          added++;
          more = true;
        }
      }
      return added;
    },
    // the first brick that can be worked out now from the known ones, as {at, from: [x, y], how: 'add' | 'sub'} or null
    nextStep(p, known) {
      for (const [t, a, b] of PYR.triples(p.n)) {
        if (!known[t] && known[a] && known[b]) return { at: t, from: [a, b], how: 'add' };
        if (known[t] && !known[a] && known[b]) return { at: a, from: [t, b], how: 'sub' };
        if (known[t] && known[a] && !known[b]) return { at: b, from: [t, a], how: 'sub' };
      }
      return null;
    },
    make(band, level, rnd) {
      const n = PYR.ROWS[band], hi = Math.max(4, Math.round(PYR.MAX[band] * (0.5 + 0.5 * ramp(level))));
      const extra = level <= 3 ? 2 : level <= 7 ? 1 : 0, need = n + extra, all = n * (n + 1) / 2;
      const wantTricky = band == 'D' && level >= 10;
      let best = null;
      for (let at = 0; at < 400; at++) {
        const bottom = [];
        for (let i = 0; i < n; i++) bottom.push(ri(rnd, 1, hi));
        const v = PYR.values(bottom);
        let given;
        if (level <= 3) { // the whole bottom row and a few more: only adding
          given = [...Array(n).keys()].concat(shuf(rnd, [...Array(all - n).keys()].map(k => k + n)).slice(0, extra));
        } else given = shuf(rnd, [...Array(all).keys()]).slice(0, need);
        if (PYR.rank(n, given) < n) continue;
        const known = new Array(all).fill(false);
        given.forEach(g => known[g] = true);
        PYR.spread(n, v, known);
        const easy = known.every(Boolean);
        if (!easy && band != 'D') continue;
        const p = { n, v, g: v.map((x, k) => given.includes(k) ? 1 : 0), tricky: !easy };
        if (wantTricky ? !easy : easy) return p;
        if (easy && !best) best = p; // a tricky one was wanted but not found yet: keep a fair one in reserve
      }
      if (best) return best;
      const bottom = [];
      for (let i = 0; i < n; i++) bottom.push(ri(rnd, 1, hi));
      const v = PYR.values(bottom);
      return { n, v, g: v.map((x, k) => k < n ? 1 : 0), tricky: false };
    },
    hidden: p => p.v.map((x, k) => k).filter(k => !p.g[k]),
    known(p, st) {
      return p.v.map((x, k) => !!p.g[k] || st.done.includes(k));
    },
    // Hint for the current state (st.done = bricks filled). Returns {say, mark: [bricks], fill: brick | null} or null when finished.
    hint(p, st, tier) {
      const known = PYR.known(p, st);
      if (known.every(Boolean)) return null;
      const s = PYR.nextStep(p, known);
      if (s) {
        const [x, y] = s.from;
        if (tier == 1) return { say: s.how == 'add' ? 'You can find the glowing brick now: it sits on two bricks you know.'
          : 'You can find the glowing brick now: look at the brick above it and the brick next to it.', mark: [s.at], fill: null };
        if (tier == 2) return { say: s.how == 'add' ? `Add the two bricks under it: ${p.v[x]} + ${p.v[y]}.`
          : `The brick above is ${p.v[x]}. Take away the brick next to it, ${p.v[y]}.`, mark: [s.at, x, y], fill: null };
        const say = `${p.v[x]} ${s.how == 'add' ? '+' : '−'} ${p.v[y]} = ${p.v[s.at]}`;
        return { say, mark: [s.at, x, y], fill: s.at };
      }
      // tricky: no brick follows from two others. The brick to try is the one that lets the most bricks follow.
      let at = -1, most = -1;
      for (const k of PYR.hidden(p)) {
        if (known[k]) continue;
        const kn = known.slice();
        kn[k] = true;
        const got = PYR.spread(p.n, p.v, kn);
        if (got > most) { most = got; at = k; }
      }
      if (tier == 1) {
        return { say: 'A tricky one! No brick follows from two others yet. Start with the glowing brick.', mark: [at], fill: null };
      }
      if (tier == 2) return { say: 'Guess a number for the glowing brick and work up the pyramid. If the bricks above come out too big, '
        + 'guess smaller.', mark: [at], fill: null };
      return { say: `This brick is ${p.v[at]}.`, mark: [at], fill: at };
    },
    // the bricks to fill, in an order a child could find them (used by tests and the smoke bot): [[brick, value], ...]
    solve(p) {
      const st = { done: [] }, out = [];
      for (let guard = 0; guard < 40; guard++) {
        const h = PYR.hint(p, st, 3);
        if (!h) break;
        st.done.push(h.fill);
        out.push([h.fill, p.v[h.fill]]);
      }
      return out;
    },
  };

  /* ================= Balance ================= */
  // A puzzle: {f: [art names], v: [values], eqs: [{l: [count per picture], lc, r: [...], rc}], q: {c: [counts], v} | null, form}
  // Slots the child fills: 0..m-1 (the pictures) and 'q' (band C's last question).
  const BAL = {
    PICS: ['apple', 'banana', 'cookie', 'cake', 'ball', 'gift'],
    NAME: { apple: ['apple', 'apples'], banana: ['banana', 'bananas'], cookie: ['cookie', 'cookies'], cake: ['cake', 'cakes'],
      ball: ['ball', 'balls'], gift: ['present', 'presents'] },
    VMAX: { A: [3, 5], B: [5, 10], C: [6, 12], D: [8, 20] }, // value range 1..max, the max grows from the first to the second number
    eq(m, l, lc, r, rc) {
      const z = () => new Array(m).fill(0), L = z(), R = z();
      l.forEach(k => L[k]++);
      r.forEach(k => R[k]++);
      return { l: L, lc: lc || 0, r: R, rc: rc || 0 };
    },
    side: (cs, k, v) => cs.reduce((a, c, i) => a + c * v[i], k),
    net: (e, i) => e.l[i] - e.r[i],
    det(M) {
      if (M.length == 1) return M[0][0];
      if (M.length == 2) return M[0][0] * M[1][1] - M[0][1] * M[1][0];
      return M[0].reduce((s, a, j) => s + (j % 2 ? -1 : 1) * a * BAL.det(M.slice(1).map(row => row.filter((x, k) => k != j))), 0);
    },
    make(band, level, rnd) {
      const [m0, m1] = BAL.VMAX[band], vmax = Math.round(m0 + (m1 - m0) * ramp(level));
      const val = (lo, hi) => ri(rnd, lo, Math.max(lo, hi));
      const distinct = (k, lo, hi) => { // k different values in lo..hi
        const pool = shuf(rnd, [...Array(hi - lo + 1).keys()].map(x => x + lo));
        return pool.slice(0, k);
      };
      const m = { A: 1, B: 2, C: 3, D: level <= 8 ? 2 : 3 }[band];
      const f = shuf(rnd, BAL.PICS).slice(0, m);
      const E = (l, lc, r, rc) => BAL.eq(m, l, lc, r, rc);
      let v, eqs, q = null, form;
      if (band == 'A') {
        // apple + k = W, then apple + apple = W, then three apples or two apples and a weight; totals stay at 10 or less
        if (level <= 3) {
          v = [val(1, vmax)];
          const k = val(1, Math.min(3, 10 - v[0]));
          eqs = [E([0], k, [], v[0] + k)];
          form = 'a+k';
        } else if (level <= 8 || rnd() < 0.5) {
          v = [val(1, vmax)];
          eqs = [E([0, 0], 0, [], 2 * v[0])];
          form = 'aa';
        } else if (rnd() < 0.5) {
          v = [val(1, 3)];
          eqs = [E([0, 0, 0], 0, [], 3 * v[0])];
          form = 'aaa';
        } else {
          v = [val(1, 4)];
          const k = val(1, 10 - 2 * v[0]);
          eqs = [E([0, 0], k, [], 2 * v[0] + k)];
          form = 'aa+k';
        }
        if (level >= 6 && rnd() < 0.5) eqs = eqs.map(e => ({ l: e.r, lc: e.rc, r: e.l, rc: e.lc })); // the picture on the right
      } else if (band == 'B') {
        v = distinct(2, 1, vmax);
        const [x, y] = v;
        const e1 = level <= 4 ? 'xx' : level <= 8 ? pickR(rnd, ['xx', 'x+k']) : pickR(rnd, x <= 6 ? ['xxx', 'xx+k'] : ['xx+k']);
        const k = val(1, 5);
        eqs = [{ xx: () => E([0, 0], 0, [], 2 * x), 'x+k': () => E([0], k, [], x + k), xxx: () => E([0, 0, 0], 0, [], 3 * x),
          'xx+k': () => E([0, 0], k, [], 2 * x + k) }[e1]()];
        const e2s = level <= 4 ? ['x+y'] : level <= 8 ? ['x+y', 'x+yy'] : (y > x ? ['x+yy', 'y=x+k', 'yy+x'] : ['x+yy', 'yy+x']);
        const e2 = pickR(rnd, e2s);
        eqs.push({
          'x+y': () => E([0, 1], 0, [], x + y),
          'x+yy': () => E([0, 1, 1], 0, [], x + 2 * y),
          'yy+x': () => E([1, 1, 0], 0, [], x + 2 * y),
          'y=x+k': () => E([1], 0, [0], y - x),
        }[e2]());
        form = e1 + ',' + e2;
        if (level >= 9 && rnd() < 0.6) eqs.reverse();
      } else if (band == 'C') {
        v = distinct(3, 1, vmax);
        const [x, y, z] = v, k = val(1, 6);
        const e1 = pickR(rnd, x <= 8 ? ['xx', 'xxx', 'xx+k'] : ['xx', 'xx+k']);
        eqs = [{
          xx: () => E([0, 0], 0, [], 2 * x),
          xxx: () => E([0, 0, 0], 0, [], 3 * x),
          'xx+k': () => E([0, 0], k, [], 2 * x + k),
        }[e1]()];
        const [a2, b2] = pickR(rnd, [[1, 1], [1, 2], [2, 1]]);
        eqs.push(E([...Array(a2).fill(0), ...Array(b2).fill(1)], 0, [], a2 * x + b2 * y));
        const p3 = rnd() < 0.5 ? 0 : 1, [a3, b3] = pickR(rnd, [[1, 1], [1, 2], [2, 1]]);
        eqs.push(E([...Array(a3).fill(p3), ...Array(b3).fill(2)], 0, [], a3 * v[p3] + b3 * z));
        const qc = pickR(rnd, [[1, 2, 0], [2, 1, 0], [0, 1, 2], [0, 2, 1], [1, 0, 2], [2, 0, 1], [2, 1, 1], [1, 2, 1], [1, 1, 2]]);
        q = { c: qc, v: BAL.side(qc, 0, v) };
        form = e1 + ',' + a2 + b2 + ',' + a3 + b3;
        if (level >= 7) eqs = shuf(rnd, eqs);
      } else {
        if (m == 2) {
          form = level <= 4 ? 'sd' : pickR(rnd, ['pq', 'xy']);
          if (form == 'sd') { // x + y = s, x = y + d
            const y = val(1, vmax - 1), x = val(y + 1, vmax);
            v = [x, y];
            eqs = [E([0, 1], 0, [], x + y), E([0], 0, [1], x - y)];
          } else if (form == 'pq') { // 2x + y = p, x + y = q
            v = distinct(2, 1, vmax);
            eqs = [E([0, 0, 1], 0, [], 2 * v[0] + v[1]), E([0, 1], 0, [], v[0] + v[1])];
          } else { // x + 2y = p, 2x + y = q
            v = distinct(2, 1, vmax);
            eqs = [E([0, 1, 1], 0, [], v[0] + 2 * v[1]), E([0, 0, 1], 0, [], 2 * v[0] + v[1])];
          }
        } else {
          form = pickR(rnd, ['pair', 'chain']);
          if (form == 'pair') { // x + y, y + z, x + z
            v = distinct(3, 1, vmax);
            eqs = [E([0, 1], 0, [], v[0] + v[1]), E([1, 2], 0, [], v[1] + v[2]), E([0, 2], 0, [], v[0] + v[2])];
          } else { // x + y + z = s, x = y + d, z = y + e
            const y = val(1, vmax - 2), [d, e] = distinct(2, 1, Math.max(2, Math.min(9, vmax - y)));
            v = [y + d, y, y + e];
            eqs = [E([0, 1, 2], 0, [], 3 * y + d + e), E([0], 0, [1], d), E([2], 0, [1], e)];
          }
        }
        if (level >= 5 && rnd() < 0.5) eqs = shuf(rnd, eqs);
      }
      if (BAL.det(eqs.slice(0, m).map(e => e.l.map((c, i) => c - e.r[i]))) == 0) throw new Error('balance: singular');
      return { f, v, eqs, q, form };
    },
    slots: p => [...p.v.keys()].concat(p.q ? ['q'] : []),
    answer: (p, s) => s === 'q' ? p.q.v : p.v[s],
    // an equation where picture i is the only one not solved yet (and does not cancel out), or -1
    lone(p, solved, i) {
      return p.eqs.findIndex(e => BAL.net(e, i) != 0 && e.l.every((c, j) => j == i || solved.includes(j) || (!c && !e.r[j])));
    },
    // the scale a wrong number for picture i is tried on: a scale where it is the only unknown left, else any with it
    tryOn(p, solved, i) {
      const k = BAL.lone(p, solved, i);
      return k >= 0 ? k : p.eqs.findIndex(e => BAL.net(e, i) != 0);
    },
    // which way scale k tips when picture i weighs w (the others their real weight): -1 left down, 1 right down, 0 level
    tip(p, k, i, w) {
      const v = p.v.slice();
      v[i] = w;
      const e = p.eqs[k];
      return Math.sign(BAL.side(e.r, e.rc, v) - BAL.side(e.l, e.lc, v));
    },
    nm: (p, i, c) => BAL.NAME[p.f[i]][c == 1 ? 0 : 1],
    // Hint for the current state (st.done = slots solved). {say, mark: {eqs: [k], slot}, fill: slot | null} or null when finished.
    hint(p, st, tier) {
      const solved = st.done.filter(s => s !== 'q');
      const open = p.v.map((x, i) => i).filter(i => !solved.includes(i));
      if (!open.length) {
        if (!p.q || st.done.includes('q')) return null;
        const terms = [];
        p.q.c.forEach((c, i) => { for (let j = 0; j < c; j++) terms.push(p.v[i]); });
        const mark = { eqs: [], slot: 'q' };
        if (tier == 1) return { say: 'Now put the weight of each picture into the last question.', mark, fill: null };
        if (tier == 2) return { say: `Add them up: ${terms.join(' + ')}.`, mark, fill: null };
        return { say: `${terms.join(' + ')} = ${p.q.v}`, mark, fill: 'q' };
      }
      // a scale with one unknown picture left
      for (const i of open) {
        const k = BAL.lone(p, solved, i);
        if (k < 0) continue;
        const e = p.eqs[k], left = BAL.net(e, i) > 0, c = Math.abs(BAL.net(e, i));
        const mine = left ? [e.l, e.lc] : [e.r, e.rc], other = left ? [e.r, e.rc] : [e.l, e.lc];
        const w1 = BAL.side(mine[0].map((x, j) => j == i ? 0 : x), mine[1], p.v), w2 = BAL.side(other[0], other[1], p.v);
        const one = BAL.nm(p, i, 1), many = BAL.nm(p, i, 2);
        const mark = { eqs: [k], slot: i };
        if (tier == 1) return { say: `Start with the glowing scale. Only the ${one} is still a mystery there.`, mark, fill: null };
        if (tier == 2) {
          let say;
          if (w1 && c > 1) say = `Take ${w1} away from both sides. Then share what is left between the ${c} ${many}.`;
          else if (w1) say = `Take ${w1} away from both sides. What is left weighs the same as one ${one}.`;
          else if (c > 1) say = `${c} ${many} weigh ${w2}. Share ${w2} into ${c} equal parts.`;
          else say = `One ${one} weighs the same as everything on the other side. Add up that side.`;
          return { say, mark, fill: null };
        }
        return { say: `One ${one} weighs ${p.v[i]}.`, mark, fill: i };
      }
      // no scale has a single unknown (band D): compare the scales. Tier 3 gives the picture the form's trick finds first.
      const nm = i => BAL.nm(p, i, 1), eqk = p.eqs.map((e, k) => k), pref = { sd: 1, chain: 1 }[p.form] || 0;
      const at = open.includes(pref) ? pref : open[0];
      const mark = { eqs: eqk, slot: at };
      if (tier == 1) return { say: 'Compare the scales. What is the same on both, and what is different?', mark, fill: null };
      if (tier == 2) {
        const sum = p.eqs.reduce((a, e) => a + e.lc + e.rc, 0), diff = p.eqs.find(e => e.r.some(Boolean));
        const say = {
          sd: () => `The ${nm(0)} weighs ${diff.rc} more than the ${nm(1)}. Take ${diff.rc} away from the two together, `
            + 'then share the rest equally.',
          pq: () => `One scale has one more ${nm(0)} than the other. That extra ${nm(0)} makes the difference in weight.`,
          xy: () => `Put both scales together: 3 of each picture weigh ${sum}. So one ${nm(0)} and one ${nm(1)} weigh a third of that.`,
          pair: () => `Put all three scales together: every picture is there twice. Half of ${sum} is one of each picture.`,
          chain: () => `Take the extra weights off the ${nm(0)} and the ${nm(2)}: then all three weigh the same as the ${nm(1)}.`,
        }[p.form];
        return { say: say ? say() : 'Compare the scales.', mark, fill: null };
      }
      return { say: `One ${nm(at)} weighs ${p.v[at]}.`, mark, fill: at };
    },
    solve(p) {
      const st = { done: [] }, out = [];
      for (let guard = 0; guard < 10; guard++) {
        const h = BAL.hint(p, st, 3);
        if (!h) break;
        st.done.push(h.fill);
        out.push([h.fill, BAL.answer(p, h.fill)]);
      }
      return out;
    },
  };

  /* ================= Make the Number ================= */
  // A puzzle: {nums, target, ops ('+-', '+-x', '+-x/'), use: 2 (two tiles) | 0 (all tiles), sols (different solutions)}.
  // Tiles have ids: the numbers are 0..k-1 and every join makes the next id. A step is [leftId, op, rightId].
  const TGT = {
    OPS: { B: '+-', C: '+-x', D: '+-x/' },
    SIGN: { '+': '+', '-': '−', x: '×', '/': '÷' },
    ICON: { '+': 'plus', '-': 'minus', x: 'times', '/': 'divide' },
    NAME: { '+': 'Add', '-': 'Take away', x: 'Times', '/': 'Share' },
    // a op b with whole, non-negative results only; null otherwise
    calc(a, op, b) {
      if (op == '+') return a + b;
      if (op == '-') return a >= b ? a - b : null;
      if (op == 'x') return a * b;
      if (op == '/') return b > 0 && a % b == 0 ? a / b : null;
      return null;
    },
    // canonical text of a join, so a + b and b + a (and the order of a chain of + or x) count once
    canon(a, op, b) {
      if (op == '+' || op == 'x') {
        const part = t => t.op == op ? t.parts : [t.s];
        const parts = part(a).concat(part(b)).sort();
        return { s: '(' + parts.join(op) + ')', op, parts };
      }
      return { s: '(' + a.s + op + b.s + ')', op, parts: null };
    },
    // Exhaustive search. vals: numbers; use: 2 = any two of them, 0 = all of them. Returns {n: different solutions, first: steps as
    // [i, op, j] positions in the list at that moment (the result replaces j, i is removed)}.
    search(vals, target, ops, use) {
      const seen = new Set();
      let first = null;
      const go = (list, steps) => {
        if (use == 0 ? list.length == 1 : steps.length == 1) {
          const hit = use == 0 ? (list[0].v == target ? list[0] : null) : list.find(t => t.made && t.v == target);
          if (hit) {
            seen.add(hit.s);
            if (!first) first = steps.slice();
          }
          return;
        }
        for (let i = 0; i < list.length; i++) for (let j = 0; j < list.length; j++) {
          if (i == j) continue;
          for (const op of ops) {
            if ((op == '+' || op == 'x') && i > j) continue; // the same join the other way round
            const r = TGT.calc(list[i].v, op, list[j].v);
            if (r == null) continue;
            const c = TGT.canon(list[i], op, list[j]);
            const next = list.map((t, k) => k == j ? { v: r, s: c.s, op: c.op, parts: c.parts, made: true } : t).filter((t, k) => k != i);
            steps.push([i, op, j]);
            go(next, steps);
            steps.pop();
          }
        }
      };
      go(vals.map(v => ({ v, s: String(v), op: null, parts: null, made: false })), []);
      return { n: seen.size, first };
    },
    // a random expression of every number (C, D): its value, or null when a step is not whole and non-negative
    randExpr(rnd, vals, ops) {
      let list = vals.slice();
      while (list.length > 1) {
        const i = Math.floor(rnd() * list.length);
        let j = Math.floor(rnd() * (list.length - 1));
        if (j >= i) j++;
        const r = TGT.calc(list[i], pickR(rnd, ops.split('')), list[j]);
        if (r == null) return null;
        list = list.map((x, k) => k == j ? r : x).filter((x, k) => k != i);
      }
      return list[0];
    },
    make(band, level, rnd) {
      const ops = TGT.OPS[band], cands = [];
      for (let at = 0; at < 400 && cands.length < 6; at++) {
        let nums, target, use;
        if (band == 'B') {
          use = 2;
          const hi = level <= 6 ? 10 : 15;
          nums = shuf(rnd, [...Array(hi).keys()].map(x => x + 1)).slice(0, 5);
          const a = nums[0], b = nums[1], op = level <= 4 ? '+' : pickR(rnd, ['+', '-']);
          target = op == '+' ? a + b : Math.abs(a - b);
        } else if (band == 'C') {
          use = 0;
          nums = [ri(rnd, 1, 10), ri(rnd, 1, 10), ri(rnd, 1, 10)];
          target = TGT.randExpr(rnd, nums, level <= 3 ? '+-' : ops);
          if (target == null || target < 5 || target > 50) continue;
        } else {
          use = 0;
          nums = [ri(rnd, 1, 13), ri(rnd, 1, 13), ri(rnd, 1, 13), ri(rnd, 1, 13)];
          target = level <= 6 ? 24 : TGT.randExpr(rnd, nums, ops);
          if (target == null || target < 10 || target > 100) continue;
        }
        if (band == 'B' && (target < 5 || target > 20)) continue;
        if (band == 'C' && level >= 4 && !nums.some(x => x > 1)) continue;
        const s = TGT.search(nums, target, ops, use);
        if (!s.n) continue;
        if (cands.some(c => c.nums.join() == nums.join())) continue;
        cands.push({ nums, target, ops, use, sols: s.n });
      }
      if (!cands.length) { // never seen; a fixed fair puzzle so make() always returns one
        const nums = { B: [2, 3, 5, 7, 9], C: [2, 3, 4], D: [1, 2, 3, 4] }[band];
        const target = { B: 12, C: 10, D: 24 }[band], use = band == 'B' ? 2 : 0;
        return { nums, target, ops, use, sols: TGT.search(nums, target, ops, use).n };
      }
      cands.sort((a, b) => b.sols - a.sols);
      return cands[Math.min(cands.length - 1, Math.floor((Math.min(12, level) - 1) * cands.length / 12))];
    },
    // the tiles at the start: [{id, v}]
    start: p => p.nums.map((v, id) => ({ id, v })),
    // Join two tiles in a state {tiles, next, hist}. Returns {err: 'neg' | 'frac'} or {v} (and changes st).
    join(st, aId, op, bId) {
      const i = st.tiles.findIndex(t => t.id == aId), j = st.tiles.findIndex(t => t.id == bId);
      if (i < 0 || j < 0 || i == j) return { err: 'tile' };
      const a = st.tiles[i].v, b = st.tiles[j].v, r = TGT.calc(a, op, b);
      if (r == null) return { err: op == '-' ? 'neg' : 'frac' };
      const t = { id: st.next++, v: r };
      st.hist.push({ a: st.tiles[i], ai: i, b: st.tiles[j], bi: j, op, r: t.id });
      st.tiles[j] = t;
      st.tiles.splice(i, 1);
      return { v: r, id: t.id };
    },
    undo(st) {
      const h = st.hist.pop();
      if (!h) return false;
      const k = st.tiles.findIndex(t => t.id == h.r);
      st.tiles.splice(k, 1, h.b);
      st.tiles.splice(h.ai, 0, h.a);
      return true;
    },
    fresh: p => ({ tiles: TGT.start(p), next: p.nums.length, hist: [], miss: 0 }),
    won(p, st) {
      return p.use == 2 ? st.hist.length == 1 && st.tiles.some(t => t.id == st.hist[0].r && t.v == p.target)
        : st.tiles.length == 1 && st.tiles[0].v == p.target;
    },
    // the next step from this state as [leftId, op, rightId], or null when these tiles cannot make the target
    next(p, st) {
      if (p.use == 2 && st.hist.length) return null;
      const s = TGT.search(st.tiles.map(t => t.v), p.target, p.ops, p.use);
      if (!s.first) return null;
      const [i, op, j] = s.first[0];
      return [st.tiles[i].id, op, st.tiles[j].id];
    },
    // Hint: {say, mark: [tile ids], step: [l, op, r] | null, reset: bool} or null when won
    hint(p, st, tier) {
      if (TGT.won(p, st)) return null;
      let s = TGT.next(p, st), reset = false;
      if (!s) {
        if (tier < 3) {
          const say = `These numbers cannot make ${p.target} any more. Tap Undo to go back.`;
          return { say, mark: [], step: null, reset: false, undo: true };
        }
        reset = true;
        s = TGT.next(p, TGT.fresh(p));
      }
      const val = id => (reset ? TGT.start(p) : st.tiles).find(t => t.id == id).v;
      const last = p.use == 2 || st.tiles.length == 2;
      if (tier == 1) return { say: `Start with ${val(s[0])}.`, mark: [s[0]], step: null, reset: false };
      if (tier == 2) return { say: last ? `Use ${val(s[0])} and ${val(s[2])}. Which sign makes ${p.target}?`
        : `Try ${val(s[0])} ${TGT.SIGN[s[1]]} ${val(s[2])} first.`, mark: [s[0], s[2]], step: null, reset: false };
      const say = `${val(s[0])} ${TGT.SIGN[s[1]]} ${val(s[2])} = ${TGT.calc(val(s[0]), s[1], val(s[2]))}`;
      return { say, mark: [s[0], s[2]], step: s, reset };
    },
    solve(p) {
      const st = TGT.fresh(p), out = [];
      for (let guard = 0; guard < 6 && !TGT.won(p, st); guard++) {
        const s = TGT.next(p, st);
        if (!s) break;
        TGT.join(st, ...s);
        out.push(s);
      }
      return out;
    },
  };

  /* ================= screens ================= */
  const pad = () => padHTML('', false).replace('class="keys qpad pad"', 'class="keys qpad pad bn-pad"');
  // the frame of every number puzzle: a talk line (message + speak), the board, the controls
  const frame = (kind, board, ctl) => `<div class="bn bn-${kind}"><div class="bn-say"><p class="bn-msg" aria-live="polite"></p>` +
    `${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'bn-spk' })}</div>` +
    `<div class="bn-board">${board}</div><div class="bn-ctl">${ctl}</div></div>`;

  // shared wiring: message line, speak button, number pad (with the hardware keys), timers that destroy() clears
  function kit(el, api) {
    const timers = [];
    let msg = '', onKey = null;
    const k = {
      later(fn, ms) { timers.push(setTimeout(fn, ms)); },
      say(text, kind, speak) {
        msg = text;
        const m = el.querySelector('.bn-msg');
        if (m) {
          m.textContent = text;
          m.className = 'bn-msg' + (kind ? ' ' + kind : '');
        }
        if (speak) api.say(text);
      },
      keys(fn) { onKey = fn; },
      shake(node) {
        if (!node) return;
        node.classList.remove('bn-shake');
        void node.offsetWidth;
        node.classList.add('bn-shake');
      },
      bind() {
        const sp = el.querySelector('.bn-spk');
        if (sp) sp.onclick = () => { try { say(msg); } catch (e) {} };
        el.querySelectorAll('.bn-pad .k[data-k]').forEach(b => b.onclick = () => onKey && onKey(b.dataset.k));
      },
      destroy() {
        timers.forEach(clearTimeout);
        document.removeEventListener('keydown', hw);
      },
    };
    const hw = e => {
      if (!onKey || !el.isConnected || document.querySelector('.bt-win,.sheet')) return;
      const key = /^\d$/.test(e.key) ? e.key : e.key == 'Backspace' ? 'del' : e.key == 'Enter' ? 'go' : null;
      if (key) { e.preventDefault(); onKey(key); }
    };
    document.addEventListener('keydown', hw);
    return k;
  }

  // typing into a selected box: returns the new text, or null for 'go'
  const typeKey = (typed, key, max) => {
    if (key == 'del') { SFX.del(); return typed.slice(0, -1); }
    if (key == 'go') return null;
    if (typed.length >= max || (typed == '0')) return typed;
    SFX.key(+key);
    return typed + key;
  };

  /* ---------- pyramid screen ---------- */
  function mountPyr(el, p, api) {
    const st = api.loadState() || { done: [], hinted: [], sel: -1, miss: 0 };
    const k = kit(el, api), n = p.n, cells = PYR.cells(n), maxLen = 3;
    let typed = '', marks = [];
    const open = () => PYR.hidden(p).filter(b => !st.done.includes(b));
    if (st.sel < 0 || !open().includes(st.sel)) st.sel = open()[0] != null ? open()[0] : -1;
    const brick = b => {
      const [r, i] = cells[b], given = !!p.g[b], done = st.done.includes(b), sel = b == st.sel;
      const look = given ? ' giv' : done ? (st.hinted.includes(b) ? ' ok hn' : ' ok') : ' hid';
      const cls = 'bn-br' + look + (sel ? ' sel' : '') + (marks.includes(b) ? ' hl' : '');
      const face = given || done ? p.v[b] : sel && typed ? typed : '?';
      const lab = given || done ? `Brick ${p.v[b]}` : 'Missing brick';
      // rows are drawn top first; the brick spans two of the 2n grid columns, shifted half a brick per row
      const tag = given || done ? 'div' : 'button';
      return `<${tag} class="${cls}" data-b="${b}" style="grid-row:${n - r};grid-column:${r + 2 * i + 1}/span 2" aria-label="${lab}"` +
        `${tag == 'div' ? ' role="img"' : ''}><span>${face}</span></${tag}>`;
    };
    const draw = () => {
      el.querySelector('.bn-pyrw').innerHTML = cells.map((c, b) => brick(b)).join('');
      el.querySelectorAll('.bn-br.hid').forEach(b => b.onclick = () => {
        SFX.click();
        st.sel = +b.dataset.b;
        typed = '';
        api.saveState(st);
        draw();
      });
    };
    el.innerHTML = frame('pyr', `<div class="bn-pyrw" style="--n:${n}" role="group" aria-label="Number pyramid"></div>` +
      (p.tricky ? `<p class="bn-tag">${UI.tag('Tricky', 'new', 'sparkle')}</p>` : ''), pad());
    k.bind();
    const intro = 'Each brick is the two bricks under it added together. Tap a missing brick and type its number.';
    k.say(st.done.length ? 'Keep going! Tap a missing brick.' : intro, '', api.band == 'A');
    draw();
    const fill = b => {
      st.done.push(b);
      typed = '';
      st.sel = open()[0] != null ? open()[0] : -1;
      api.saveState(st);
      draw();
      if (!open().length) {
        k.say('The pyramid is complete!', 'good');
        el.querySelector('.bn-pyrw').classList.add('win');
        api.win({ mistakes: st.miss });
      }
    };
    k.keys(key => {
      if (st.sel < 0 || !open().length) return;
      const t = typeKey(typed, key, maxLen);
      if (t != null) { typed = t; return draw(); }
      if (!typed) return k.say('Type a number first, then tap the tick.', 'try');
      marks = [];
      if (+typed == p.v[st.sel]) {
        SFX.right();
        k.say(pickR(Math.random, ['Yes!', 'That fits!', 'Right!']), 'good');
        fill(st.sel);
      } else {
        SFX.wrong();
        st.miss++;
        api.saveState(st);
        k.say(`Not ${typed}. Check the bricks next to it and try again.`, 'try');
        typed = '';
        draw();
        k.shake(el.querySelector('.bn-br.sel'));
      }
    });
    return {
      hint(tier) {
        const h = PYR.hint(p, st, tier);
        if (!h) return false;
        marks = h.mark;
        if (h.fill != null) {
          st.hinted.push(h.fill);
          k.say(h.say, 'hint', true);
          fill(h.fill);
        } else {
          if (!st.done.includes(h.mark[0]) && !p.g[h.mark[0]]) { st.sel = h.mark[0]; typed = ''; }
          draw();
          k.say(h.say, 'hint', true);
        }
        return true;
      },
      destroy: k.destroy,
    };
  }

  /* ---------- balance screen ---------- */
  // Geometry in viewBox units: the pin at (cx, py); the trays' posts stand on the arm `half` out from the pin, so a tilt of `tilt`
  // degrees moves them half x sin(tilt) up and down (the CSS in 49-bt-number.css uses the same 10.45).
  const W = { box: 340, h: 110, cx: 170, py: 82, half: 100, tilt: 6, pic: 36 };
  const pic = (name, x, y, s) =>
    `<svg class="art" x="${x}" y="${y}" width="${s}" height="${s}" viewBox="0 0 64 64">${ART[name] || ''}</svg>`;
  const wWidth = n => Math.max(32, 16 + 11 * String(n).length);
  // a weight block with a handle and its number
  function weightSVG(x, base, n) {
    const t = String(n), w = wWidth(n), h = 30, y = base - h;
    return `<g class="bn-w"><path class="bn-wh" d="M${x - 8} ${y + 1}a8 8 0 0 1 16 0"/>` +
      `<rect class="bn-wb" x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="8"/>` +
      `<path class="bn-ws" d="M${x + w / 2 - 4} ${y + 8}v${h - 13}"/>` +
      `<path class="bn-wg" d="M${x - w / 2 + 6} ${y + 6}h${Math.max(4, w / 2 - 10)}"/>` +
      `<text x="${x}" y="${y + 21.5}">${t}</text></g>`;
  }
  // the things on one tray, centred on cx and standing on base: pictures first, then the weight; a solved picture wears its weight
  function trayItems(p, cs, k, cx, base, known, bad) {
    const items = [];
    cs.forEach((c, i) => { for (let j = 0; j < c; j++) items.push({ i }); });
    if (k) items.push({ k });
    const S = W.pic, wid = it => it.k != null ? wWidth(it.k) + 4 : S + 2;
    let x = cx - items.reduce((a, it) => a + wid(it), 0) / 2, out = '';
    for (const it of items) {
      const w = wid(it), mid = x + w / 2;
      if (it.k != null) out += weightSVG(mid, base, it.k);
      else {
        out += `<g class="bn-pic" data-f="${it.i}">${pic(p.f[it.i], mid - S / 2, base - S - 1, S)}`;
        if (known[it.i] != null) {
          out += `<g class="bn-vt${it.i === bad ? ' bad' : ''}"><circle cx="${mid + 13}" cy="${base - S + 1}" r="10"/>` +
            `<text x="${mid + 13}" y="${base - S + 5.5}">${known[it.i]}</text></g>`;
        }
        out += '</g>';
      }
      x += w;
    }
    return out;
  }
  // known: the weight shown on each picture (null: none); bad: the picture that wears the child's wrong guess
  function scaleSVG(p, e, k, known, bad) {
    const { cx, py, half, h } = W, ty = py - 16;
    // a tray: a post down to the arm, a shallow dish (gloss on its upper left, shade underneath), the things on it
    const tray = (cls, x, cs, kk) => `<g class="bn-tray ${cls}">` +
      `<rect class="bn-post" x="${x - 3}" y="${ty}" width="6" height="${py - ty}"/>` +
      `<path class="bn-dish" d="M${x - 66} ${ty - 6}h132a66 10 0 0 1-132 0z"/>` +
      `<path class="bn-dsh" d="M${x - 50} ${ty + 1.5}a66 10 0 0 0 100 0"/>` +
      `<path class="bn-pgl" d="M${x - 58} ${ty - 3}h36"/>${trayItems(p, cs, kk, x, ty - 6, known, bad)}</g>`;
    return `<svg class="bn-sv" viewBox="0 0 ${W.box} ${h}" role="img" aria-label="Scale ${k + 1}">` +
      `<path class="bn-stand" d="M${cx - 5} ${py}h10l18 ${h - py - 8}h-46z"/>` +
      `<path class="bn-sts" d="M${cx + 2} ${py}h3l18 ${h - py - 8}h-11z"/>` +
      `<rect class="bn-base" x="${cx - 48}" y="${h - 10}" width="96" height="9" rx="4.5"/>` +
      `<g transform="translate(${cx} ${py})"><g class="bn-arm">` +
      `<rect class="bn-beam" x="${-half - 12}" y="-5.5" width="${2 * half + 24}" height="11" rx="5.5"/>` +
      `<path class="bn-bsh" d="M${-half - 4} 3h${2 * half + 8}"/><path class="bn-bgl" d="M${-half - 4} -2.5h${half - 24}"/>` +
      `<path class="bn-nd" d="M0 -6V-26"/></g>` +
      `<circle class="bn-pin" r="7"/><circle class="bn-pgl2" cx="-2" cy="-2" r="2"/></g>` +
      tray('l', cx - half, e.l, e.lc) + tray('r', cx + half, e.r, e.rc) + '</svg>';
  }
  function mountBal(el, p, api) {
    const st = api.loadState() || { done: [], hinted: [], sel: 0, miss: 0 };
    const k = kit(el, api), slots = BAL.slots(p);
    let typed = '', marks = { eqs: [], slot: null }, guess = null; // guess: {e, i, w, dir} a wrong number tried on scale e
    const open = () => slots.filter(s => !st.done.includes(s));
    if (!open().some(s => String(s) == String(st.sel))) st.sel = open()[0];
    const known = () => p.v.map((x, i) => st.done.includes(i) ? x : null);
    const maxLen = 3;
    const nm = i => BAL.nm(p, i, 1);
    const slotBtn = s => {
      const done = st.done.includes(s), sel = String(s) == String(st.sel);
      const face = done ? BAL.answer(p, s) : sel && typed ? typed : '?';
      const cls = 'bn-slot' + (done ? (st.hinted.includes(s) ? ' ok hn' : ' ok') : '') + (sel && !done ? ' sel' : '') +
        (String(marks.slot) == String(s) ? ' hl' : '');
      const aria = s === 'q' ? 'Answer' : 'Weight of the ' + nm(s);
      return `<button class="${cls}" data-s="${s}" aria-label="${aria}"${done ? ' aria-disabled="true"' : ''}>${face}</button>`;
    };
    const drawSlots = () => {
      let h = p.v.map((x, i) => `<span class="bn-sg">${picArt(p.f[i], 34)}<b aria-hidden="true">=</b>${slotBtn(i)}</span>`).join('');
      if (p.q) {
        const terms = p.q.c.map((c, i) => c ? picArt(p.f[i], 30) + (c > 1 ? `<b class="bn-x">× ${c}</b>` : '') : '').filter(Boolean);
        h += `<span class="bn-sg bn-qq">${terms.join('<b>+</b>')}<b aria-hidden="true">=</b>${slotBtn('q')}</span>`;
      }
      el.querySelector('.bn-slots').innerHTML = h;
      el.querySelectorAll('.bn-slot:not(.ok)').forEach(b => b.onclick = () => {
        SFX.click();
        unTip();
        st.sel = b.dataset.s == 'q' ? 'q' : +b.dataset.s;
        typed = '';
        api.saveState(st);
        drawSlots();
      });
    };
    const drawScales = () => {
      const kn = known();
      el.querySelector('.bn-scs').innerHTML = p.eqs.map((e, i) => {
        const g = guess && guess.e == i, kk = g ? kn.map((x, j) => j == guess.i ? guess.w : x) : kn;
        return `<div class="bn-sc${marks.eqs.includes(i) ? ' hl' : ''}" data-e="${i}">${scaleSVG(p, e, i, kk, g ? guess.i : -1)}</div>`;
      }).join('');
      const sc = guess && el.querySelector(`.bn-sc[data-e="${guess.e}"]`);
      if (sc && guess.dir) {
        void sc.getBoundingClientRect(); // so the arm turns from level
        sc.classList.add(guess.dir < 0 ? 'tl' : 'tr');
      }
    };
    // the next tap after a wrong guess sets the scale level again, then takes the guess off it
    const unTip = () => {
      if (!guess) return;
      const sc = el.querySelector(`.bn-sc[data-e="${guess.e}"]`);
      guess = null;
      if (sc) sc.classList.remove('tl', 'tr');
      k.later(() => { if (!guess) drawScales(); }, 650);
    };
    const ask = {
      A: `How much does one ${nm(0)} weigh?`,
      C: 'How much does each picture weigh? Then answer the last question.',
      D: 'The scales are level. How much does each picture weigh?',
    }[api.band] || 'How much does each picture weigh?';
    el.innerHTML = frame('bal', `<div class="bn-scs n${p.eqs.length}"></div>`, `<div class="bn-slots"></div>${pad()}`);
    k.bind();
    k.say(st.done.length ? 'Keep going!' : ask, '', api.band == 'A');
    drawScales();
    drawSlots();
    const fill = s => {
      st.done.push(s);
      typed = '';
      st.sel = open()[0];
      api.saveState(st);
      drawScales();
      drawSlots();
      if (!open().length) {
        k.say('Every scale balances. You solved it!', 'good');
        el.querySelector('.bn-scs').classList.add('win');
        api.win({ mistakes: st.miss });
      }
    };
    k.keys(key => {
      if (st.sel == null || !open().length) return;
      unTip();
      const t = typeKey(typed, key, maxLen);
      if (t != null) { typed = t; return drawSlots(); }
      if (!typed) return k.say('Type a number first, then tap the tick.', 'try');
      marks = { eqs: [], slot: null };
      const want = BAL.answer(p, st.sel), got = +typed;
      if (got == want) {
        SFX.right();
        k.say(st.sel === 'q' ? 'Yes!' : `Yes! One ${nm(st.sel)} weighs ${want}.`, 'good');
        return fill(st.sel);
      }
      SFX.wrong();
      st.miss++;
      api.saveState(st);
      typed = '';
      if (st.sel === 'q') k.say(`Not ${got}. Put each weight in and add again.`, 'try');
      else {
        const e = BAL.tryOn(p, st.done.filter(s => s !== 'q'), st.sel), dir = BAL.tip(p, e, st.sel, got);
        const heavy = dir == 0 ? '' : (BAL.net(p.eqs[e], st.sel) > 0) == (dir < 0) ? 'too heavy' : 'too light';
        k.say(`With ${got} the scale tips: that is ${heavy}. Try again.`, 'try');
        guess = { e, i: st.sel, w: got, dir };
        drawScales();
      }
      drawSlots();
      k.shake(el.querySelector(`.bn-slot[data-s="${st.sel}"]`));
    });
    return {
      hint(tier) {
        const h = BAL.hint(p, st, tier);
        if (!h) return false;
        guess = null;
        marks = h.mark;
        if (h.fill != null) {
          st.hinted.push(h.fill);
          k.say(h.say, 'hint', true);
          fill(h.fill);
        } else {
          if (h.mark.slot != null && !st.done.includes(h.mark.slot)) { st.sel = h.mark.slot; typed = ''; }
          drawScales();
          drawSlots();
          k.say(h.say, 'hint', true);
        }
        return true;
      },
      destroy: k.destroy,
    };
  }

  /* ---------- make the number screen ---------- */
  function mountTgt(el, p, api) {
    const st = api.loadState() || TGT.fresh(p);
    const k = kit(el, api);
    let pick = null, op = null, marks = [], busy = false;
    const goal = `<div class="bn-goal" role="img" aria-label="Make ${p.target}"><span class="bn-ring"><b>${p.target}</b></span></div>`;
    const opsH = p.ops.split('').map(o =>
      `<button class="bn-op" data-op="${o}" aria-label="${TGT.NAME[o]}">${ico(TGT.ICON[o], 30)}</button>`);
    el.innerHTML = frame('tgt', `${goal}<div class="bn-tiles n${p.nums.length}" role="group" aria-label="Number tiles"></div>` +
      `<div class="bn-ops">${opsH.join('')}</div>`,
      `<ol class="bn-trail" aria-label="Your steps"></ol><div class="bn-acts">${UI.btn('Undo', { icon: 'undo', cls: 'bn-undo' })}</div>`);
    k.bind();
    const intro = p.use == 2 ? `Pick two numbers and + or − to make ${p.target}.`
      : `Use every number once to make ${p.target}. Tap a number, a sign, then another number.`;
    k.say(st.hist.length ? 'Keep going!' : intro, '', api.band == 'A');
    const draw = () => {
      el.querySelector('.bn-undo').classList.remove('hl');
      el.querySelector('.bn-tiles').innerHTML = st.tiles.map(t => `<button class="bn-tile${t.id == pick ? ' sel' : ''}` +
        `${t.id >= p.nums.length ? ' made' : ''}` +
        `${marks.includes(t.id) ? ' hl' : ''}" data-t="${t.id}" aria-label="${t.v}"><b>${t.v}</b></button>`).join('');
      el.querySelectorAll('.bn-op').forEach(b => b.classList.toggle('sel', b.dataset.op == op));
      el.querySelector('.bn-trail').innerHTML = st.hist.map(h => {
        const r = st.tiles.find(t => t.id == h.r) || { v: TGT.calc(h.a.v, h.op, h.b.v) };
        return `<li>${h.a.v} ${TGT.SIGN[h.op]} ${h.b.v} = <b>${r.v}</b></li>`;
      }).join('');
      el.querySelector('.bn-undo').disabled = !st.hist.length || busy;
      el.querySelectorAll('.bn-tile').forEach(b => b.onclick = () => tapTile(+b.dataset.t));
    };
    const save = () => api.saveState(st);
    const afterJoin = r => {
      if (TGT.won(p, st)) {
        SFX.right();
        k.say(`You made ${p.target}!`, 'good');
        busy = true;
        draw();
        el.querySelector('.bn-tiles').classList.add('win');
        return api.win({ mistakes: st.miss });
      }
      if (p.use == 2 || st.tiles.length == 1) { // used up, and not the target: a mistake; the tiles come back
        SFX.wrong();
        st.miss++;
        save();
        busy = true;
        k.say(`That makes ${r.v}, not ${p.target}. Try again!`, 'try');
        k.shake(el.querySelector(`.bn-tile[data-t="${r.id}"]`));
        return k.later(() => {
          busy = false;
          while (st.hist.length) TGT.undo(st);
          save();
          draw();
        }, 1300);
      }
      SFX.pop();
      if (st.tiles.some(t => t.v == p.target)) k.say(`That is ${p.target}, but use every number!`, '');
      else k.say(`${r.v}! ${st.tiles.length} numbers left.`, '');
    };
    function tapTile(id) {
      if (busy) return;
      if (pick == null || op == null) {
        SFX.click();
        pick = pick == id ? null : id;
        return draw();
      }
      if (pick == id) { pick = null; op = null; return draw(); }
      const r = TGT.join(st, pick, op, id);
      if (r.err) {
        SFX.wrong();
        k.say(r.err == 'neg' ? 'That would go below zero. Try the bigger number first.'
          : 'That does not share out evenly. Try other numbers.', 'try');
        k.shake(el.querySelector(`.bn-tile[data-t="${id}"]`));
        pick = null;
        op = null;
        return draw();
      }
      pick = null;
      op = null;
      marks = [];
      save();
      draw();
      afterJoin(r);
    }
    el.querySelectorAll('.bn-op').forEach(b => b.onclick = () => {
      if (busy) return;
      if (pick == null) return k.say('Tap a number first.', 'try');
      SFX.click();
      op = op == b.dataset.op ? null : b.dataset.op;
      draw();
    });
    el.querySelector('.bn-undo').onclick = () => {
      if (busy || !TGT.undo(st)) return;
      SFX.del();
      pick = null;
      op = null;
      save();
      draw();
      k.say('One step back.', '');
    };
    draw();
    return {
      hint(tier) {
        if (busy) return false;
        const h = TGT.hint(p, st, tier);
        if (!h) return false;
        marks = h.mark;
        pick = null;
        op = null;
        if (h.step) {
          if (h.reset) while (st.hist.length) TGT.undo(st);
          const r = TGT.join(st, ...h.step);
          marks = [r.id];
          save();
          draw();
          k.say(h.say, 'hint', true);
          if (TGT.won(p, st)) afterJoin(r);
          return true;
        }
        draw();
        if (h.undo) el.querySelector('.bn-undo').classList.add('hl');
        k.say(h.say, 'hint', true);
        return true;
      },
      destroy: k.destroy,
    };
  }

  return { PYR, BAL, TGT, ri, shuf, mountPyr, mountBal, mountTgt, scaleSVG };
})();

BT.reg({
  id: 'pyramid', name: 'Pyramids', icon: 'blocks', bands: 'BCD',
  rules: 'Each brick is the two bricks under it added together. Find the missing bricks.',
  make: (band, level, rnd) => BTN.PYR.make(band, level, rnd),
  mount: (el, p, api) => BTN.mountPyr(el, p, api),
  solve: p => BTN.PYR.solve(p),
});
BT.reg({
  id: 'balance', name: 'Balance', icon: 'scale', bands: 'ABCD',
  rules: 'The scales are level, so both sides weigh the same. Find what each picture weighs.',
  make: (band, level, rnd) => BTN.BAL.make(band, level, rnd),
  mount: (el, p, api) => BTN.mountBal(el, p, api),
  solve: p => BTN.BAL.solve(p),
});
BT.reg({
  id: 'target', name: 'Target', icon: 'target', bands: 'BCD',
  rules: 'Join the numbers with the signs to make the number in the circle.',
  make: (band, level, rnd) => BTN.TGT.make(band, level, rnd),
  mount: (el, p, api) => BTN.mountTgt(el, p, api),
  solve: p => BTN.TGT.solve(p),
});
/* ---------- Brain Teasers: Sudoku (P3-03; BRAIN_TEASERS.md 5.1, 7, 8) ----------
   One type, `sudoku`, bands A-D, 12 levels a band (then the framework's Endless). The puzzles come from the pre-verified bank
   PUZ.sudoku (src/data/d-puz-sudoku.js, P3-02; read only inside functions, A11): PUZ.sudoku[band] = {n, bw, bh, easy, medium, hard},
   each puzzle 'givens|solution|grade'.
     Band  Grid  Boxes        Symbols            Givens e / m / h   What is checked
     A     4x4   2x2          4 animals (drawn)  10 / 9 / 8         a wrong animal wiggles and bounces out (a mistake)
     B     4x4   2x2          1-4                8 / 6 / 5          a wrong number wiggles and bounces out (a mistake)
     C     6x6   3 cols x 2   1-6                22 / 18 / 14       clashes are tinted amber with a warning mark; Notes; Undo
     D     9x9   3x3          1-9                42 / 36 / 31       as C; hard levels need locked candidates or a naked pair
   Levels (section 7, givens from most to fewest): 1-4 easy, 5-8 medium, 9-12 hard. Each level owns a quarter of its tier's list
   (5 of 20), so the 12 levels of a day are 12 different bank puzzles; the seeded rnd (type|band|level|day) picks one of the five
   and a transform, so the same level tomorrow is a different puzzle or the same one in another form.
   Runtime variety (5.1, all keep the one solution and the grade): symbols relabelled, rows swapped inside a band of boxes, bands
   swapped, the same for columns and stacks, and a transpose when the boxes are square (4x4, 9x9). The puzzle stores the result
   (g givens, s solution, '.' empty) and the transform x, so a saved puzzle never needs the bank again.
   Mistakes: A and B check every entry against the solution (5.1); C and D never say right or wrong, but an entry that clashes
   with a number already in its row, column or box is tinted amber (never red, never colour alone: a dashed ring and a warning mark
   too) and counts one mistake. A full board with no clash is the solution (the puzzle has exactly one).
   Hints (5.1; the frame passes 1, 2, 3 and repeats 3): 1 points at a row, column or box (a house with one gap, or "look at this
   box"), 2 points at the square and says why ("Only 3 fits here: 1, 2 and 4 are already in its row, column or box."), 3 fills that
   square. A number that is not right is found first (C and D). Tiers 1 and 2 never change the board; 3 fills exactly one square.
   Phone and 9x9: the board is a square sized to the space left (section 8). When a 9x9 cell would be under 46 px (a phone in
   portrait, about 37 px at 380 px wide; section 8 allows 36 px there), a zoom box beside the pad shows the selected square's 3x3
   box at 48 px squares: a tap on the board picks a square and brings its box into the zoom box, where a near miss is put right with
   one big tap (every square has a 48 px target there), and the notes are easy to read.
   State (api.saveState after every move): {v: entries as a digit string ('0' empty, givens '0'), m: notes bit masks per cell
   ([] when none), sel, miss, hn: squares filled by hints (locked), h: undo steps [[cell, old value, old notes], ...], nt: notes on}.
   The pure rules (make, enter, erase, note, undo, hint, solve) live in SD so tools/test.js runs them without a page. */
const SD = (() => {
  const PICS = ['duck', 'frog', 'pig', 'fish']; // band A: symbol v is ART[PICS[v - 1]]; the four differ in shape as well as colour
  const TIERS = ['easy', 'medium', 'hard'];
  const MAXCELL = { 4: 96, 6: 80, 9: 64 };
  const tierOf = level => TIERS[Math.floor((Math.max(1, Math.min(12, +level || 1)) - 1) / 4)];
  const range = k => Array.from({ length: k }, (_, i) => i);
  const shuf = (rnd, a) => {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  };
  const nums = s => Array.from(s, ch => (ch == '.' ? 0 : +ch));
  const bit = v => 1 << (v - 1);
  const list = a => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]);

  /* ---------- geometry: houses (rows, columns, boxes), peers, box-line overlaps ---------- */
  const GEO = {};
  function geo(n, bw, bh) {
    const key = n + ':' + bw + ':' + bh;
    if (GEO[key]) return GEO[key];
    const bx = n / bw, rows = [], cols = [], boxes = [], at = [];
    for (let i = 0; i < n; i++) { rows.push([]); cols.push([]); boxes.push([]); }
    for (let c = 0; c < n * n; c++) {
      const r = Math.floor(c / n), k = c % n, b = Math.floor(r / bh) * bx + Math.floor(k / bw);
      rows[r].push(c);
      cols[k].push(c);
      boxes[b].push(c);
      at.push({ r, c: k, b });
    }
    const houses = rows.map((cells, i) => ({ k: 'row', i, cells }))
      .concat(cols.map((cells, i) => ({ k: 'column', i, cells })), boxes.map((cells, i) => ({ k: 'box', i, cells })));
    const peers = at.map((a, c) => {
      const s = new Set(rows[a.r].concat(cols[a.c], boxes[a.b]));
      s.delete(c);
      return [...s];
    });
    // a box and a line that share 2 or more squares: [house A, house B, the shared squares]
    const over = [];
    for (const A of houses) for (const B of houses) {
      if (A === B || (A.k != 'box') == (B.k != 'box')) continue;
      const inter = A.cells.filter(c => B.cells.includes(c));
      if (inter.length >= 2) over.push([A, B, inter]);
    }
    return GEO[key] = { n, bw, bh, bx, rows, cols, boxes, houses, at, peers, over };
  }
  const gp = p => geo(p.n, p.bw, p.bh);

  /* ---------- make: a bank puzzle by level, in a seeded form ---------- */
  // all lines in blocks of `per`: the blocks in a random order, the lines inside each block too
  const lineOrder = (rnd, n, per) => [].concat(...shuf(rnd, range(n / per)).map(b => shuf(rnd, range(per)).map(i => b * per + i)));
  function transform(rnd, n, bw, bh) {
    return { r: lineOrder(rnd, n, bh), c: lineOrder(rnd, n, bw), t: bw == bh && rnd() < 0.5 ? 1 : 0, s: shuf(rnd, range(n)).map(i => i + 1) };
  }
  // out(r, c) = in(x.r[r], x.c[c]), read across when transposed; symbol v becomes x.s[v - 1]
  function applyX(str, x, n) {
    let out = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      const rr = x.t ? c : r, cc = x.t ? r : c, ch = str[x.r[rr] * n + x.c[cc]];
      out += ch == '.' ? '.' : x.s[+ch - 1];
    }
    return out;
  }
  // the bank entry a level uses: its tier, and a quarter of that tier's list per level (k is picked by rnd inside it)
  function slot(band, level) {
    const list = PUZ.sudoku[band][tierOf(level)], per = Math.max(1, Math.floor(list.length / 4));
    const q = (Math.max(1, Math.min(12, +level || 1)) - 1) % 4;
    return { tier: tierOf(level), list, lo: Math.min(list.length - 1, q * per), per };
  }
  function make(band, level, rnd) {
    const sp = PUZ.sudoku[band], o = slot(band, level), k = Math.min(o.list.length - 1, o.lo + Math.floor(rnd() * o.per));
    const [g, s, gr] = o.list[k].split('|');
    const x = transform(rnd, sp.n, sp.bw, sp.bh);
    return { b: band, n: sp.n, bw: sp.bw, bh: sp.bh, tier: o.tier, k, gr: +gr, x, g: applyX(g, x, sp.n), s: applyX(s, x, sp.n) };
  }

  /* ---------- state and moves (pure: they change st and return what happened) ---------- */
  const checked = p => p.b == 'A' || p.b == 'B'; // 5.1: bands A and B bounce a wrong symbol out
  function fresh(p) {
    const sel = nums(p.g).indexOf(0);
    return { v: '0'.repeat(p.n * p.n), m: [], sel: Math.max(0, sel), miss: 0, hn: [], h: [], nt: 0 };
  }
  // does a saved state belong to this puzzle?
  function fit(p, st) {
    const N = p.n * p.n, g = nums(p.g), int = (x, lo, hi) => Number.isInteger(x) && x >= lo && x <= hi;
    if (!st || typeof st != 'object' || typeof st.v != 'string' || st.v.length != N) return false;
    if (!new RegExp('^[0-' + p.n + ']*$').test(st.v) || g.some((x, i) => x && st.v[i] != '0')) return false;
    if (!Array.isArray(st.m) || (st.m.length && st.m.length != N) || !st.m.every(x => int(x, 0, (1 << p.n) - 1))) return false;
    if (!int(st.sel, 0, N - 1) || !int(st.miss, 0, 1e6) || !Array.isArray(st.hn) || !st.hn.every(c => int(c, 0, N - 1) && !g[c])) return false;
    return Array.isArray(st.h) && st.h.every(s => Array.isArray(s) && s.every(e => Array.isArray(e) && e.length == 3 && int(e[0], 0, N - 1)));
  }
  const vals = (p, st) => { const e = nums(st.v); return nums(p.g).map((x, i) => x || e[i]); };
  const setV = (st, c, v) => { st.v = st.v.slice(0, c) + v + st.v.slice(c + 1); };
  const noteOf = (st, c) => st.m[c] | 0;
  function setNote(p, st, c, m) {
    if (!st.m.length) { if (!m) return; st.m = new Array(p.n * p.n).fill(0); }
    st.m[c] = m;
    if (st.m.every(x => !x)) st.m = [];
  }
  const won = (p, st) => { const b = vals(p, st), s = nums(p.s); return b.every((x, i) => x == s[i]); };
  const locked = (p, st, c) => !!nums(p.g)[c] || st.hn.includes(c);
  // every square whose number is also somewhere else in one of its houses
  function conflicts(p, b) {
    const out = new Set();
    for (const h of gp(p).houses) {
      const seen = {};
      for (const c of h.cells) if (b[c]) (seen[b[c]] = seen[b[c]] || []).push(c);
      for (const v in seen) if (seen[v].length > 1) seen[v].forEach(c => out.add(c));
    }
    return out;
  }
  // the first house of c that already has v somewhere else: {k, cell}
  function clash(p, b, c, v) {
    const G = gp(p), a = G.at[c];
    for (const [k, cells] of [['row', G.rows[a.r]], ['column', G.cols[a.c]], ['box', G.boxes[a.b]]]) {
      const q = cells.find(x => x != c && b[x] == v);
      if (q != null) return { k, cell: q };
    }
    return null;
  }
  // a value goes in: the square's notes go, and so does that number from the notes of its row, column and box
  function place(p, st, c, v, step) {
    if (step) step.push([c, +st.v[c], noteOf(st, c)]);
    setV(st, c, v);
    setNote(p, st, c, 0);
    if (!v) return;
    for (const q of gp(p).peers[c]) if (noteOf(st, q) & bit(v)) {
      if (step) step.push([q, +st.v[q], noteOf(st, q)]);
      setNote(p, st, q, noteOf(st, q) & ~bit(v));
    }
  }
  const pushStep = (st, step) => { st.h.push(step); if (st.h.length > 60) st.h.shift(); };
  // a symbol tapped for square c: {ign}, {bounce, why} (A, B), or {ok, conf: [squares it clashes with], won}
  function enter(p, st, c, v) {
    if (locked(p, st, c)) return { ign: 'locked' };
    const cur = +st.v[c];
    if (checked(p)) {
      if (cur) return { ign: 'done' };
      if (v != nums(p.s)[c]) { st.miss++; return { bounce: true, why: clash(p, vals(p, st), c, v) }; }
      place(p, st, c, v);
      return { ok: true, conf: [], won: won(p, st) };
    }
    if (cur == v) return { ign: 'same' };
    const step = [];
    place(p, st, c, v, step);
    pushStep(st, step);
    const b = vals(p, st), conf = gp(p).peers[c].filter(q => b[q] == v);
    if (conf.length) st.miss++;
    return { ok: true, conf, won: !conf.length && won(p, st) };
  }
  // Erase (C, D): the number, or else the notes, of square c
  function erase(p, st, c) {
    if (checked(p) || locked(p, st, c) || (!+st.v[c] && !noteOf(st, c))) return { ign: true };
    const step = [[c, +st.v[c], noteOf(st, c)]];
    if (+st.v[c]) setV(st, c, 0); else setNote(p, st, c, 0);
    pushStep(st, step);
    return { ok: true };
  }
  // a pencil mark on or off (C, D; only on an empty square)
  function note(p, st, c, v) {
    if (checked(p) || locked(p, st, c) || +st.v[c]) return { ign: true };
    pushStep(st, [[c, 0, noteOf(st, c)]]);
    setNote(p, st, c, noteOf(st, c) ^ bit(v));
    return { ok: true, on: !!(noteOf(st, c) & bit(v)) };
  }
  function undo(p, st) {
    const step = st.h.pop();
    if (!step) return null;
    for (let i = step.length - 1; i >= 0; i--) {
      const [c, v, m] = step[i];
      if (locked(p, st, c)) continue;
      setV(st, c, v);
      setNote(p, st, c, m);
    }
    return step[0][0];
  }
  // a hint fills square c with its number; the square locks (drawn star-yellow) and no undo step can touch it again
  function fill(p, st, c) {
    const v = nums(p.s)[c];
    place(p, st, c, v);
    if (!st.hn.includes(c)) st.hn.push(c);
    st.h = st.h.filter(s => !s.some(e => e[0] == c));
    return v;
  }

  /* ---------- hints: the next square a child can fill, and why ---------- */
  const name = (p, v) => (p.b == 'A' ? 'the ' + PICS[v - 1] : String(v));
  const Name = (p, v) => (p.b == 'A' ? 'The ' + PICS[v - 1] : String(v));
  const aName = (p, v) => (p.b == 'A' ? 'a ' + PICS[v - 1] : (v == 8 ? 'an ' : 'a ') + v);
  const plural = (p, v) => (p.b == 'A' ? PICS[v - 1] + (PICS[v - 1] == 'fish' ? '' : 's') : v + 's');
  // candidates of every empty square (bit masks) from what is on the board
  function cands(p, b) {
    const G = gp(p), full = (1 << p.n) - 1;
    return b.map((v, c) => {
      if (v) return 0;
      let m = full;
      for (const q of G.peers[c]) if (b[q]) m &= ~bit(b[q]);
      return m;
    });
  }
  const one = m => m && !(m & (m - 1));
  const valOf = m => 32 - Math.clz32(m);
  function lastGap(p, b) {
    for (const h of gp(p).houses) {
      const gaps = h.cells.filter(c => !b[c]);
      if (gaps.length == 1) {
        const have = new Set(h.cells.map(c => b[c]));
        const v = range(p.n).map(i => i + 1).find(x => !have.has(x));
        return { kind: 'last', cell: gaps[0], v, h };
      }
    }
    return null;
  }
  const nakedSingle = (p, cand) => { const c = cand.findIndex(one); return c < 0 ? null : { kind: 'naked', cell: c, v: valOf(cand[c]) }; };
  function hiddenSingle(p, cand, b) {
    const H = gp(p).houses, byBox = H.filter(h => h.k == 'box').concat(H.filter(h => h.k != 'box')); // boxes first: easiest to see
    for (const h of byBox) for (let v = 1; v <= p.n; v++) {
      if (h.cells.some(c => b[c] == v)) continue;
      const where = h.cells.filter(c => cand[c] & bit(v));
      if (where.length == 1) return { kind: 'hidden', cell: where[0], v, h };
    }
    return null;
  }
  // locked candidates: in house A the value's squares all lie in house B, so it leaves the rest of B
  function lockedCands(p, cand, b) {
    for (const [A, B, inter] of gp(p).over) for (let v = 1; v <= p.n; v++) {
      if (A.cells.some(c => b[c] == v)) continue;
      const where = A.cells.filter(c => cand[c] & bit(v));
      if (where.length < 2 || where.some(c => !inter.includes(c))) continue;
      const elim = B.cells.filter(c => !inter.includes(c) && cand[c] & bit(v)).map(c => [c, v]);
      if (elim.length) return { kind: 'locked', A, B, v, at: where, elim };
    }
    return null;
  }
  // naked pair: two squares of a house with the same two candidates; those two leave the rest of the house
  function nakedPair(p, cand) {
    for (const h of gp(p).houses) {
      const two = h.cells.filter(c => popc(cand[c]) == 2);
      for (let i = 0; i < two.length; i++) for (let j = i + 1; j < two.length; j++) {
        const m = cand[two[i]];
        if (cand[two[j]] != m) continue;
        const elim = [];
        for (const c of h.cells) if (c != two[i] && c != two[j] && cand[c] & m) for (let v = 1; v <= p.n; v++) if (cand[c] & m & bit(v)) elim.push([c, v]);
        if (elim.length) return { kind: 'pair', A: h, at: [two[i], two[j]], vs: [valOf(m & -m), valOf(m)], elim };
      }
    }
    return null;
  }
  function popc(m) { let k = 0; while (m) { m &= m - 1; k++; } return k; }

  // The next step: {kind, cell, v, house (squares hint 1 points at), also (squares hint 2 marks besides the cell), say1, say2, say3}
  function nextStep(p, st) {
    const G = gp(p), b = vals(p, st), sol = nums(p.s), e = nums(st.v);
    if (b.every((x, i) => x == sol[i])) return null;
    const boxOf = c => G.boxes[G.at[c].b];
    const say3 = (c, v) => `${Name(p, v)} goes here.`;
    // 1. a number that is not right (only C and D can have one): one that clashes first
    const wrong = e.map((x, c) => (x && x != sol[c] ? c : -1)).filter(c => c >= 0);
    if (wrong.length) {
      const cf = conflicts(p, b), c = wrong.find(x => cf.has(x)) != null ? wrong.find(x => cf.has(x)) : wrong[0];
      return { kind: 'wrong', cell: c, v: sol[c], house: boxOf(c), also: [],
        say1: 'One number in this box is not right yet.', say2: `This ${e[c]} does not belong here. Another number goes in this square.`, say3: say3(c, sol[c]) };
    }
    // 2. a house with one gap
    const lg = lastGap(p, b);
    if (lg) return { kind: 'last', cell: lg.cell, v: lg.v, house: lg.h.cells, also: [],
      say1: `This ${lg.h.k} has just one empty square.`, say2: `Only ${name(p, lg.v)} is missing from this ${lg.h.k}.`, say3: say3(lg.cell, lg.v) };
    // 3. singles from what is on the board
    let cand = cands(p, b);
    const single = () => {
      const ns = nakedSingle(p, cand);
      if (ns) return ns;
      return hiddenSingle(p, cand, b);
    };
    const why = (s, pre) => {
      if (s.kind == 'naked') {
        const seen = [...new Set(G.peers[s.cell].map(q => b[q]).filter(Boolean))].sort((x, y) => x - y);
        return `${pre || ''}Only ${name(p, s.v)} fits here: ${list(seen.map(v => name(p, v)))} ${seen.length > 1 ? 'are' : 'is'} already in its row, column or box.`;
      }
      const hk = s.h.k;
      const other = { row: 'column or box', column: 'row or box', box: 'row or column' }[hk];
      return `${pre || ''}${Name(p, s.v)} can only go here: the other empty squares of this ${hk} already have ${aName(p, s.v)} in their ${other}.`;
    };
    let s = single();
    if (s) return { kind: s.kind, cell: s.cell, v: s.v, house: s.kind == 'hidden' ? s.h.cells : boxOf(s.cell), also: [],
      say1: s.kind == 'hidden' ? `Look at this ${s.h.k}. Where can ${name(p, s.v)} go?` : 'Look at this box. One square can be filled now.',
      say2: why(s), say3: say3(s.cell, s.v) };
    // 4. band D hard: take candidates away (locked candidates, naked pairs) until a single shows
    let first = null;
    for (let it = 0; it < 60; it++) {
      const x = lockedCands(p, cand, b) || nakedPair(p, cand);
      if (!x) break;
      for (const [c, v] of x.elim) cand[c] &= ~bit(v);
      if (!first) first = x;
      s = single();
      if (s) {
        const pre = first.kind == 'locked'
          ? `In this ${first.A.k}, ${aName(p, first.v)} can only go in the marked squares, so no other square of that ${first.B.k} can be ${aName(p, first.v)}. Now `
          : `The marked squares can only be ${first.vs[0]} and ${first.vs[1]}, so no other square of this ${first.A.k} can be. Now `;
        const tail = s.kind == 'naked' ? `only ${name(p, s.v)} fits here.` : `${name(p, s.v)} can only go here in its ${s.h.k}.`;
        return { kind: first.kind, cell: s.cell, v: s.v, house: first.A.cells, also: first.at,
          say1: `Look at this ${first.A.k}. Where can ${first.kind == 'locked' ? name(p, first.v) : 'each number'} go?`, say2: pre + tail, say3: say3(s.cell, s.v) };
      }
    }
    // 5. never stuck: the empty square with the fewest choices
    cand = cands(p, b);
    let c = -1;
    for (let i = 0; i < b.length; i++) if (!b[i] && (c < 0 || popc(cand[i]) < popc(cand[c]))) c = i;
    return { kind: 'guess', cell: c, v: sol[c], house: [c], also: [],
      say1: 'Try this square.', say2: 'Look at its row, its column and its box.', say3: say3(c, sol[c]) };
  }
  // hint(p, st, tier): {tier, kind, cell, v, house, mark, say, fill ([cell, value] on tier 3 only)}; null when solved. Pure.
  function hint(p, st, tier) {
    const s = nextStep(p, st);
    if (!s) return null;
    const t = Math.max(1, Math.min(3, tier | 0));
    return { tier: t, kind: s.kind, cell: s.cell, v: s.v, house: t == 3 ? [] : s.house, mark: t == 1 ? [] : [s.cell].concat(t == 2 ? s.also : []),
      say: t == 1 ? s.say1 : t == 2 ? s.say2 : s.say3, fill: t == 3 ? [s.cell, s.v] : null };
  }
  // the moves that win, in the order the hints would give them: [[cell, value], ...]
  function solve(p) {
    const st = fresh(p), out = [];
    for (let i = 0; i < p.n * p.n; i++) {
      const s = nextStep(p, st);
      if (!s) break;
      place(p, st, s.cell, s.v);
      out.push([s.cell, s.v]);
    }
    return out;
  }

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    const G = gp(p), n = p.n, N = n * n, giv = nums(p.g), A = p.b == 'A', chk = checked(p);
    let st = api.loadState();
    if (!fit(p, st)) st = fresh(p);
    const timers = [];
    const later = (f, ms) => timers.push(setTimeout(f, ms));
    let marks = { house: [], cell: [] }, bounce = null, glow = -1, msg = '', done = false, zoomOn = false;
    const face = (v, size) => (A ? picArt(PICS[v - 1], size || '74%', 'sd-pic') : `<b>${v}</b>`);
    const spoken = v => (A ? PICS[v - 1] : String(v));
    const intro = A ? 'Each row, each column and each box needs every animal once. Tap a square, then tap an animal.'
      : `Each row, column and box needs ${list(range(n).map(i => i + 1))} once. Tap a square, then tap a number.`;

    // board: boxes in reading order, squares inside each box in reading order
    const boxes = G.boxes.map(cells => `<div class="sd-box">${cells.map(c => `<button class="sd-c" data-c="${c}"></button>`).join('')}</div>`).join('');
    const pad = padHTML('', false).replace('class="keys qpad pad"', 'class="keys qpad pad sd-pad"');
    el.innerHTML = `<div class="sd sd-n${n} sd-${p.b}" style="--n:${n};--bw:${p.bw};--bx:${n / p.bw}">` +
      `<div class="sd-say">${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'sd-spk' })}<p class="sd-msg" aria-live="polite"></p></div>` +
      `<div class="sd-main"><div class="sd-board" role="group" aria-label="Sudoku, ${n} by ${n}">${boxes}</div></div>` +
      `<div class="sd-ctl"><div class="sd-zoom" role="group" aria-label="The selected box, big" hidden>` +
      `${range(9).map(i => `<button class="sd-c sd-zc" data-z="${i}"></button>`).join('')}</div>${pad}</div></div>`;
    const root = el.querySelector('.sd'), board = root.querySelector('.sd-board'), zoom = root.querySelector('.sd-zoom');
    const padEl = root.querySelector('.sd-pad'), say_ = root.querySelector('.sd-say'), ctl = root.querySelector('.sd-ctl');
    const cellEl = range(N).map(c => board.querySelector(`[data-c="${c}"]`));
    // the pad: symbols 1..n with a count of how many are left; Erase, Notes and Undo in bands C and D
    padEl.querySelectorAll('.k').forEach(k => {
      const d = k.dataset.k;
      if (d == '0' || d == 'go' || +d > n || (d == 'del' && chk)) k.remove();
    });
    for (let v = 1; v <= n; v++) {
      const k = padEl.querySelector(`.k[data-k="${v}"]`);
      k.innerHTML = `<span class="sd-kf">${A ? picArt(PICS[v - 1], '1em', 'sd-pic') : v}</span><small class="sd-left"></small>`;
      k.classList.add('sd-sym');
    }
    if (!chk) {
      const del = padEl.querySelector('.k[data-k="del"]');
      del.setAttribute('aria-label', 'Erase');
      del.classList.add('t');
      padEl.insertAdjacentHTML('beforeend', `<button class="key k t sd-ntk" data-k="notes" aria-label="Notes" aria-pressed="false">${ico('edit')}<span>Notes</span></button>` +
        `<button class="key k t" data-k="undo" aria-label="Undo">${ico('undo')}<span>Undo</span></button>`);
    }
    padEl.classList.add(chk ? 'sd-p' + n : 'sd-pt');

    function tell(text, kind, speak) {
      msg = text;
      const m = root.querySelector('.sd-msg');
      m.textContent = text;
      m.className = 'sd-msg' + (kind ? ' ' + kind : '');
      if (speak) api.say(text);
    }
    root.querySelector('.sd-spk').onclick = () => { try { say(msg); } catch (e) {} };

    /* ---------- drawing ---------- */
    function cellParts(c, b, cf) {
      const v = b[c], given = !!giv[c], hn = st.hn.includes(c), m = noteOf(st, c), a = G.at[c], s = G.at[st.sel];
      const selV = b[st.sel];
      let cls = given ? ' giv' : v ? (hn ? ' ent hn' : ' ent') : '';
      if (c == st.sel) cls += ' sel';
      else if (a.r == s.r || a.c == s.c || a.b == s.b) cls += ' rc';
      if (selV && v == selV && c != st.sel) cls += ' same';
      if (cf.has(c)) cls += ' cf';
      if (c == glow) cls += ' cl';
      if (marks.cell.includes(c)) cls += ' hl';
      else if (marks.house.includes(c)) cls += ' hh';
      let html = '', lab = v ? spoken(v) : 'empty';
      if (bounce && bounce.c == c) { cls += ' bad'; html = face(bounce.v); lab = spoken(bounce.v) + ', does not fit'; }
      else if (v) html = face(v) + (cf.has(c) && !given ? `<span class="sd-wn">${ico('warning', 16)}</span>` : '');
      else if (m) {
        html = `<i class="sd-nts">${range(n).map(i => `<span>${m & bit(i + 1) ? i + 1 : ''}</span>`).join('')}</i>`;
        lab = 'notes ' + range(n).filter(i => m & bit(i + 1)).map(i => i + 1).join(' ');
      }
      if (given) lab += ', given';
      if (cf.has(c)) lab += ', clashes';
      return { cls, html, lab: `Row ${a.r + 1}, column ${a.c + 1}: ${lab}` };
    }
    function draw() {
      const b = vals(p, st), cf = chk ? new Set() : conflicts(p, b);
      for (let c = 0; c < N; c++) {
        const q = cellParts(c, b, cf), e = cellEl[c], cls = 'sd-c' + q.cls;
        if (e.className != cls) e.className = cls;
        if (e._h !== q.html) { e.innerHTML = q.html; e._h = q.html; }
        e.setAttribute('aria-label', q.lab);
      }
      if (zoomOn) {
        const cells = G.boxes[G.at[st.sel].b];
        zoom.querySelectorAll('.sd-zc').forEach((z, i) => {
          const c = cells[i], q = cellParts(c, b, cf);
          z.className = 'sd-c sd-zc' + q.cls;
          z.dataset.c = c;
          if (z._h !== q.html) { z.innerHTML = q.html; z._h = q.html; }
          z.setAttribute('aria-label', q.lab);
        });
      }
      // how many of each symbol are left to place
      for (let v = 1; v <= n; v++) {
        const k = padEl.querySelector(`.k[data-k="${v}"]`), left = n - b.filter(x => x == v).length;
        // one dot for each one left (a count that cannot be read as a power), a tick when none are left
        const lf = k.querySelector('.sd-left'), t = left > 0 ? '<i></i>'.repeat(Math.min(n, left)) : ico('check', 14);
        if (lf._h !== t) { lf.innerHTML = t; lf._h = t; }
        k.classList.toggle('zero', left <= 0);
        if (chk) k.disabled = left <= 0 || done;
        k.setAttribute('aria-label', `${spoken(v)}, ${Math.max(0, left)} left`);
      }
      const nk = padEl.querySelector('[data-k="notes"]'), uk = padEl.querySelector('[data-k="undo"]');
      if (nk) { nk.classList.toggle('on', !!st.nt); nk.setAttribute('aria-pressed', st.nt ? 'true' : 'false'); }
      if (uk) uk.disabled = !st.h.length || done;
      root.classList.toggle('nt', !!st.nt);
    }

    /* ---------- layout: the board is a square sized to the space that is left (section 8) ----------
       portrait: talk line, board, controls; landscape: board, then a side column with the talk line and the controls.
       9x9 under 46 px a square: the zoom box comes on. On a phone (portrait) it shares a row with the talk line between the board
       and the pad, and the pad goes to two rows of six (1-5 Erase, 6-9 Notes Undo), so the board keeps 36 px squares at 380x780. */
    const FR = n == 9 ? { pad: 4, box: 4, cell: 1 } : { pad: 6, box: 5, cell: 2 }; // must match --fp, --fb, --fc in the CSS
    root.style.cssText += `;--fp:${FR.pad}px;--fb:${FR.box}px;--fc:${FR.cell}px`;
    const frame = Math.max(2 * FR.pad + (n / p.bw - 1) * FR.box + (n - n / p.bw) * FR.cell, 2 * FR.pad + (n / p.bh - 1) * FR.box + (n - n / p.bh) * FR.cell);
    const main = root.querySelector('.sd-main'), zrow = document.createElement('div'), side = document.createElement('div');
    zrow.className = 'sd-zrow';
    side.className = 'sd-side';
    root.append(zrow, side);
    let lastW = 0, lastH = 0;
    function arrange(mode, padMode) {
      if (mode == 'land') { root.append(main, side); side.append(say_, ctl); ctl.prepend(zoom); }
      else if (mode == 'zm') { root.append(main, zrow, ctl); zrow.append(zoom, say_); }
      else { root.append(say_, main, ctl); ctl.prepend(zoom); }
      root.classList.toggle('land', mode == 'land');
      zoomOn = mode == 'zm' || (mode == 'land' && padMode == 'zoom');
      root.classList.toggle('zm', zoomOn);
      zoom.hidden = !zoomOn;
    }
    function setPad(m) { for (const k of ['row', 'g3', 'r6']) padEl.classList.toggle(k, k == m); }
    function layout() {
      if (!el.isConnected) return;
      const ps = getComputedStyle(el);
      const aw = el.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
      const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
      lastW = aw; lastH = ah;
      const land = aw > ah * 1.15 && aw >= 640, gap = 12;
      // the pad in one row when every key can be 50 px wide, else three across (two rows of six for 9x9 on a phone)
      const oneRow = w => (w - (n - 1) * 8) / n >= 50;
      const cellFor = bs => Math.min(MAXCELL[n] || 64, Math.floor((Math.max(120, bs) - frame) / n));
      let cs;
      if (land) {
        arrange('land');
        setPad(oneRow(side.offsetWidth) ? 'row' : 'g3');
        const bs = () => Math.min(ah, aw - side.offsetWidth - 2 * gap);
        cs = cellFor(bs());
        if (n == 9 && cs < 46) { arrange('land', 'zoom'); cs = cellFor(bs()); }
      } else {
        arrange('port');
        setPad(oneRow(aw) ? 'row' : n == 9 ? 'r6' : 'g3');
        cs = cellFor(Math.min(aw, ah - say_.offsetHeight - ctl.offsetHeight - 2 * gap));
        if (n == 9 && cs < 46) {
          arrange('zm');
          setPad('r6');
          cs = cellFor(Math.min(aw, ah - zrow.offsetHeight - ctl.offsetHeight - 2 * 8));
        }
      }
      root.style.setProperty('--cs', Math.max(28, cs) + 'px');
      draw();
    }
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { if (el.clientWidth != lastW || el.clientHeight != lastH) layout(); }, 120); };
    window.addEventListener('resize', onResize);

    /* ---------- moves ---------- */
    const store = () => api.saveState(st);
    function finish() {
      done = true;
      marks = { house: [], cell: [] };
      draw();
      root.classList.add('win');
      tell(A ? 'You did it! Every row, column and box has every animal.' : 'Solved! Every row, column and box is complete.', 'good', A);
      api.win({ mistakes: st.miss });
    }
    function pick(c) {
      if (done || c == null || c < 0 || c >= N) return;
      st.sel = c;
      SFX.click();
      store();
      draw();
    }
    function sym(v) {
      if (done) return;
      const c = st.sel;
      if (st.nt && !chk) {
        const r = note(p, st, c, v);
        if (r.ign) return tell(+st.v[c] || locked(p, st, c) ? 'Notes go in empty squares.' : 'Tap an empty square first.', 'try');
        SFX.key(v);
        store();
        return draw();
      }
      const r = enter(p, st, c, v);
      if (r.ign) {
        if (r.ign == 'same') return;
        tell(giv[c] ? 'That one was there from the start. Tap an empty square.' : 'That square is done. Tap an empty one.', 'try', A);
        return;
      }
      marks = { house: [], cell: [] };
      if (r.bounce) {
        SFX.wrong();
        bounce = { c, v };
        glow = r.why ? r.why.cell : -1;
        store();
        draw();
        const t = r.why ? `There is already ${aName(p, v)} in this ${r.why.k}. Try another one.` : `${Name(p, v)} goes somewhere else. Try another one.`;
        tell(t, 'try', A);
        later(() => { bounce = null; draw(); }, 650);
        later(() => { glow = -1; draw(); }, 1600);
        return;
      }
      store();
      draw();
      if (r.conf.length) {
        SFX.rattle();
        const k = clash(p, vals(p, st), c, v);
        tell(`Two ${plural(p, v)} in this ${k ? k.k : 'row'}. Change one of them.`, 'try');
        return;
      }
      if (chk) { SFX.right(); popCell(c); } else SFX.pop(1);
      if (r.won) return finish();
      tell(chk ? (A ? pickR(['Yes!', 'Good one!', 'That fits!']) : pickR(['Yes!', 'That fits!', 'Right!'])) : msgAfter(), chk ? 'good' : '', false);
    }
    const pickR = a => a[Math.floor(Math.random() * a.length)];
    const msgAfter = () => (conflicts(p, vals(p, st)).size ? 'Some numbers still clash. The amber squares show where.' : 'Keep going!');
    function popCell(c) {
      const e = cellEl[c];
      e.classList.remove('pop');
      void e.offsetWidth;
      e.classList.add('pop');
    }
    function act(k) {
      if (done) return;
      if (k == 'del') {
        const r = erase(p, st, st.sel);
        if (r.ign) return tell(locked(p, st, st.sel) ? 'That one stays. Pick a square you filled.' : 'That square is already empty.', 'try');
        SFX.del();
      } else if (k == 'notes') {
        st.nt = st.nt ? 0 : 1;
        SFX.click();
        tell(st.nt ? 'Notes are on: tap numbers to jot them small. Tap Notes again to write big.' : 'Notes are off: numbers go in big.', '');
      } else if (k == 'undo') {
        const c = undo(p, st);
        if (c == null) return;
        st.sel = c;
        SFX.whoosh();
      } else return sym(+k);
      store();
      draw();
    }
    board.onclick = e => { const b = e.target.closest('.sd-c'); if (b) pick(+b.dataset.c); };
    zoom.onclick = e => { const b = e.target.closest('.sd-c'); if (b) pick(+b.dataset.c); };
    padEl.querySelectorAll('.k[data-k]').forEach(b => b.onclick = () => act(b.dataset.k));
    // hardware keys: digits, Backspace or Delete, arrows to move, N for notes
    const keyd = e => {
      if (!el.isConnected || done || document.querySelector('.bt-win,.sheet')) return;
      const a = G.at[st.sel], mv = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[e.key];
      if (/^[1-9]$/.test(e.key) && +e.key <= n) { e.preventDefault(); act(e.key); }
      else if ((e.key == 'Backspace' || e.key == 'Delete') && !chk) { e.preventDefault(); act('del'); }
      else if ((e.key == 'n' || e.key == 'N') && !chk) act('notes');
      else if (mv) { e.preventDefault(); pick(((a.r + mv[0] + n) % n) * n + ((a.c + mv[1] + n) % n)); }
    };
    document.addEventListener('keydown', keyd);

    /* ---------- start ---------- */
    const fresh_ = !st.v.replace(/0/g, '') && !st.m.length;
    tell(fresh_ ? intro : A ? 'Keep going! Tap an empty square.' : 'Keep going! Tap an empty square.', '', fresh_ && A);
    layout();
    // the stage can still be settling (fonts, the frame's top bar): look again once
    later(layout, 60);
    return {
      hint(tier) {
        if (done) return false;
        const h = hint(p, st, tier);
        if (!h) return false;
        marks = { house: h.house, cell: h.mark };
        if (h.fill) {
          fill(p, st, h.fill[0]);
          st.sel = h.fill[0];
          store();
          draw();
          popCell(h.fill[0]);
          tell(h.say, 'hint', true);
          if (won(p, st)) finish();
          return true;
        }
        if (h.tier == 2) st.sel = h.cell;
        store();
        draw();
        tell(h.say, 'hint', true);
        return true;
      },
      destroy() {
        timers.forEach(clearTimeout);
        clearTimeout(rz);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('keydown', keyd);
      },
    };
  }

  return { PICS, TIERS, tierOf, geo, slot, make, transform, applyX, fresh, fit, vals, conflicts, enter, erase, note, undo, fill, won,
    nextStep, hint, solve, mount, checked, nums };
})();

BT.reg({
  id: 'sudoku', name: 'Sudoku', icon: 'sudoku', bands: 'ABCD',
  rules: 'Fill the grid so every row, every column and every box has each number (or animal) just once.',
  make: (band, level, rnd) => SD.make(band, level, rnd),
  mount: (el, p, api) => SD.mount(el, p, api),
  solve: p => SD.solve(p),
});
/* ---------- Brain Teasers: MathDoku (P3-05; BRAIN_TEASERS.md 5.2, 7, 8) ----------
   One type, `mdoku` ("MathDoku"), bands B-D, 12 levels a band (then the framework's Endless). The puzzles come from the
   pre-verified bank PUZ.mathdoku (src/data/d-puz-mathdoku.js, P3-04; read only inside functions, A11):
   PUZ.mathdoku[band] = [36 strings 'N|cages|solution|grade|score'], sorted by difficulty, level L = entries 3(L-1)..3L-1.
     Band  Grid               Operations     What the child does
     B     3x3                +              tap a square, tap 1-3; Erase, Undo (no notes: three numbers need none)
     C     4x4                + − ×          as B with 1-4, plus Notes
     D     5x5 (levels 1-6),  + − × ÷        as C with 1-5 or 1-6
           6x6 (levels 7-12)
   A cage is cells (one base-36 character each, ascending, so the first is the top-left cell where the label goes) + op + target.
   Single-cell cages ('=') are givens: their number is printed in the square from the start.
   Variety (5.2): the seeded rnd (type|band|level|day) picks one of the level's three bank puzzles and one of the 8 rotations and
   mirrors of the grid. Numbers are never relabelled (the arithmetic would break); a turned or mirrored cage keeps its target, and
   − and ÷ do not care about order. The 12 levels of a day use 12 different bank puzzles, so a grid never repeats across levels.
   The puzzle stores the result (cg cages [{c: cells, o: op, t: target}], s solution), the bank index k and the transform x.
   Mistakes: never judged right or wrong while playing. A number that is already in its row or column is a clash: both squares
   amber with a dashed ring and a warning mark (never red, never colour alone). A full cage that does not make its target turns its
   label amber with a warning mark, and the line says why in words ("2 + 3 = 5, but this cage needs 6."). Each counts one mistake.
   Hints (5.2; the frame passes 1, 2, 3 and repeats 3): 1 points at a cage (or a row or column) that can be finished, 2 names the
   square and says why, listing the number sets that make the cage ("6× in two squares: 1 and 6, or 2 and 3. ..."), 3 fills that
   one square. A number that is not right is found first. Tiers 1 and 2 never change the board; 3 fills exactly one square.
   The hint steps follow the bank grader (tools/puzzles/mathdoku.js): last square of a cage or a line, cage single, hidden single,
   cage in a line, naked pair; the grader proved every bank puzzle finishes with these, so no hint has to guess.
   State (api.saveState after every move): {v: entries as a digit string ('0' empty or given), m: notes bit masks per cell ([] when
   none), sel, miss, hn: squares filled by hints (locked), h: undo steps [[cell, old value, old notes], ...], nt: notes on}.
   The pure rules (make, enter, erase, note, undo, hint, solve) live in MD so tools/test.js runs them without a page. */
const MD = (() => {
  const SIGN = { '+': '+', '*': '×', '-': '−', '/': '÷' };
  const MAXCELL = { 3: 96, 4: 88, 5: 76, 6: 68 };
  const FP = 6; // the tray's padding around the grid (px); must match .md-board in the CSS
  // the 8 rotations and mirrors as cell maps: (r, c) of the bank grid goes to the returned [r, c] (as tools/puzzles/mathdoku.js SYMS)
  const SYMS = [
    (r, c, N) => [r, c],
    (r, c, N) => [c, N - 1 - r],
    (r, c, N) => [N - 1 - r, N - 1 - c],
    (r, c, N) => [N - 1 - c, r],
    (r, c, N) => [r, N - 1 - c],
    (r, c, N) => [N - 1 - r, c],
    (r, c, N) => [c, r],
    (r, c, N) => [N - 1 - c, N - 1 - r],
  ];
  const range = k => Array.from({ length: k }, (_, i) => i);
  const nums = s => Array.from(s, ch => +ch);
  const bit = v => 1 << (v - 1);
  const one = m => m && !(m & (m - 1));
  const valOf = m => 32 - Math.clz32(m);
  const popc = m => { let k = 0; while (m) { m &= m - 1; k++; } return k; };
  const bits = m => range(7).map(i => i + 1).filter(v => m & bit(v));
  const list = (a, w) => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' ' + (w || 'and') + ' ' + a[a.length - 1]);
  const WORD = ['no', 'one', 'two', 'three', 'four', 'five', 'six'];
  const aN = v => (v == 8 || v == 11 || v == 18 ? 'an ' : 'a ') + v;

  // a cage's value for these numbers (− and ÷ take the bigger first; NaN when ÷ does not come out even)
  function calc(op, vals) {
    if (op == '=') return vals[0];
    if (op == '+') return vals.reduce((a, v) => a + v, 0);
    if (op == '*') return vals.reduce((a, v) => a * v, 1);
    const hi = Math.max(vals[0], vals[1]), lo = Math.min(vals[0], vals[1]);
    if (op == '-') return hi - lo;
    return hi % lo ? NaN : hi / lo;
  }
  const label = cg => cg.t + SIGN[cg.o];
  // the cage's numbers as a sum written out: "2 + 3 = 5"; ÷ that does not come out even says so
  function sumText(cg, vals) {
    if (cg.o == '+' || cg.o == '*') return vals.join(cg.o == '+' ? ' + ' : ' × ') + ' = ' + calc(cg.o, vals);
    const hi = Math.max(...vals), lo = Math.min(...vals), r = calc(cg.o, vals);
    return `${hi} ${SIGN[cg.o]} ${lo}` + (r === r ? ` = ${r}` : ' does not come out even');
  }

  /* ---------- geometry: rows, columns, peers ---------- */
  const GEO = {};
  function geo(n) {
    if (GEO[n]) return GEO[n];
    const rows = range(n).map(r => range(n).map(c => r * n + c)), cols = range(n).map(c => range(n).map(r => r * n + c));
    const at = range(n * n).map(c => ({ r: Math.floor(c / n), c: c % n }));
    const lines = rows.map((cells, i) => ({ k: 'row', i, cells })).concat(cols.map((cells, i) => ({ k: 'column', i, cells })));
    const lineIds = at.map(a => [a.r, n + a.c]);
    const peers = at.map((a, c) => rows[a.r].concat(cols[a.c]).filter(q => q != c));
    return GEO[n] = { n, rows, cols, at, lines, lineIds, peers };
  }
  const sameLine = (n, a, b) => Math.floor(a / n) == Math.floor(b / n) || a % n == b % n;
  // per puzzle: which cage each square is in, the givens
  function info(p) {
    if (p._i && p._i.cg === p.cg) return p._i;
    const N = p.n * p.n, cageAt = new Array(N).fill(-1), giv = new Array(N).fill(0);
    p.cg.forEach((cg, i) => { cg.c.forEach(c => (cageAt[c] = i)); if (cg.o == '=') giv[cg.c[0]] = cg.t; });
    const out = { cg: p.cg, cageAt, giv };
    Object.defineProperty(p, '_i', { value: out, enumerable: false, configurable: true, writable: true });
    return out;
  }

  /* ---------- make: a bank puzzle by level, turned or mirrored ---------- */
  function decode(str) {
    const [n, cs, sol, gr] = str.split('|');
    const cg = cs.split(',').map(s => {
      const m = s.match(/^([0-9a-z]+)([-+*/=])(\d+)$/);
      return { c: Array.from(m[1], ch => parseInt(ch, 36)), o: m[2], t: +m[3] };
    });
    return { n: +n, cg, s: sol, gr: +gr };
  }
  // the bank puzzle under symmetry x: every cell moves, cages keep their op and target, the label goes to the new top-left cell
  function transform(n, cg, sol, x) {
    const f = SYMS[x], map = c => { const [r, k] = f(Math.floor(c / n), c % n, n); return r * n + k; };
    const out = cg.map(g => ({ c: g.c.map(map).sort((a, b) => a - b), o: g.o, t: g.t })).sort((a, b) => a.c[0] - b.c[0]);
    const s = new Array(n * n);
    for (let c = 0; c < n * n; c++) s[map(c)] = sol[c];
    return { cg: out, s: s.join('') };
  }
  // the bank entries of a level: 3(L-1) .. 3L-1 (band D: levels 1-6 are 5x5, 7-12 are 6x6, as the bank is sorted)
  function slot(band, level) {
    const L = Math.max(1, Math.min(12, +level || 1)), list = PUZ.mathdoku[band];
    return { list, lo: Math.min(list.length - 1, 3 * (L - 1)), per: 3 };
  }
  function make(band, level, rnd) {
    const o = slot(band, level), k = Math.min(o.list.length - 1, o.lo + Math.floor(rnd() * o.per)), x = Math.floor(rnd() * 8);
    const d = decode(o.list[k]), t = transform(d.n, d.cg, d.s, x);
    return { b: band, n: d.n, k, x, gr: d.gr, cg: t.cg, s: t.s };
  }

  /* ---------- state and moves (pure: they change st and return what happened) ---------- */
  const notesOn = p => p.b != 'B'; // three numbers need no pencil marks
  function fresh(p) {
    const g = info(p).giv;
    return { v: '0'.repeat(p.n * p.n), m: [], sel: Math.max(0, g.indexOf(0)), miss: 0, hn: [], h: [], nt: 0 };
  }
  // does a saved state belong to this puzzle?
  function fit(p, st) {
    const N = p.n * p.n, g = info(p).giv, int = (x, lo, hi) => Number.isInteger(x) && x >= lo && x <= hi;
    if (!st || typeof st != 'object' || typeof st.v != 'string' || st.v.length != N) return false;
    if (!new RegExp('^[0-' + p.n + ']*$').test(st.v) || g.some((x, i) => x && st.v[i] != '0')) return false;
    if (!Array.isArray(st.m) || (st.m.length && st.m.length != N) || !st.m.every(x => int(x, 0, (1 << p.n) - 1))) return false;
    if (!int(st.sel, 0, N - 1) || !int(st.miss, 0, 1e6) || !Array.isArray(st.hn) || !st.hn.every(c => int(c, 0, N - 1) && !g[c])) return false;
    if (st.nt != null && st.nt !== 0 && st.nt !== 1) return false;
    return Array.isArray(st.h) && st.h.every(s => Array.isArray(s) && s.length && s.every(e => Array.isArray(e) && e.length == 3 && int(e[0], 0, N - 1)
      && int(e[1], 0, p.n) && int(e[2], 0, (1 << p.n) - 1)));
  }
  const vals = (p, st) => { const e = nums(st.v); return info(p).giv.map((x, i) => x || e[i]); };
  const setV = (st, c, v) => { st.v = st.v.slice(0, c) + v + st.v.slice(c + 1); };
  const noteOf = (st, c) => st.m[c] | 0;
  function setNote(p, st, c, m) {
    if (!st.m.length) { if (!m) return; st.m = new Array(p.n * p.n).fill(0); }
    st.m[c] = m;
    if (st.m.every(x => !x)) st.m = [];
  }
  const won = (p, st) => vals(p, st).join('') == p.s;
  const locked = (p, st, c) => !!info(p).giv[c] || st.hn.includes(c);
  // every square whose number is also somewhere else in its row or column
  function conflicts(p, b) {
    const out = new Set();
    for (const L of geo(p.n).lines) {
      const seen = {};
      for (const c of L.cells) if (b[c]) (seen[b[c]] = seen[b[c]] || []).push(c);
      for (const v in seen) if (seen[v].length > 1) seen[v].forEach(c => out.add(c));
    }
    return out;
  }
  // the cages that are full and do not make their target (indexes)
  function misses(p, b) {
    return p.cg.map((cg, i) => (cg.o != '=' && cg.c.every(c => b[c]) && calc(cg.o, cg.c.map(c => b[c])) !== cg.t ? i : -1)).filter(i => i >= 0);
  }
  // the first line of c that already has v somewhere else: {k, cell}
  function clash(p, b, c, v) {
    const G = geo(p.n), a = G.at[c];
    for (const [k, cells] of [['row', G.rows[a.r]], ['column', G.cols[a.c]]]) {
      const q = cells.find(x => x != c && b[x] == v);
      if (q != null) return { k, cell: q };
    }
    return null;
  }
  // a value goes in: the square's notes go, and so does that number from the notes of its row and column
  function place(p, st, c, v, step) {
    if (step) step.push([c, +st.v[c], noteOf(st, c)]);
    setV(st, c, v);
    setNote(p, st, c, 0);
    if (!v) return;
    for (const q of geo(p.n).peers[c]) if (noteOf(st, q) & bit(v)) {
      if (step) step.push([q, +st.v[q], noteOf(st, q)]);
      setNote(p, st, q, noteOf(st, q) & ~bit(v));
    }
  }
  const pushStep = (st, step) => { st.h.push(step); if (st.h.length > 60) st.h.shift(); };
  // a number tapped for square c: {ign} or {ok, conf: [squares it clashes with], cage: index of the cage it filled
  // (made: true when the cage makes its target), miss: one mistake counted, won}
  function enter(p, st, c, v) {
    if (locked(p, st, c)) return { ign: 'locked' };
    if (+st.v[c] == v) return { ign: 'same' };
    const step = [];
    place(p, st, c, v, step);
    pushStep(st, step);
    const b = vals(p, st), conf = geo(p.n).peers[c].filter(q => b[q] == v), ci = info(p).cageAt[c], cg = p.cg[ci];
    const full = cg.c.every(q => b[q]), made = full && calc(cg.o, cg.c.map(q => b[q])) === cg.t;
    const miss = conf.length > 0 || (full && !made);
    if (miss) st.miss++;
    return { ok: true, conf, cage: full ? ci : -1, made, miss, won: !miss && won(p, st) };
  }
  // Erase: the number, or else the notes, of square c
  function erase(p, st, c) {
    if (locked(p, st, c) || (!+st.v[c] && !noteOf(st, c))) return { ign: true };
    const step = [[c, +st.v[c], noteOf(st, c)]];
    if (+st.v[c]) setV(st, c, 0); else setNote(p, st, c, 0);
    pushStep(st, step);
    return { ok: true };
  }
  // a pencil mark on or off (C, D; only on an empty square)
  function note(p, st, c, v) {
    if (!notesOn(p) || locked(p, st, c) || +st.v[c] || v < 1 || v > p.n) return { ign: true };
    pushStep(st, [[c, 0, noteOf(st, c)]]);
    setNote(p, st, c, noteOf(st, c) ^ bit(v));
    return { ok: true, on: !!(noteOf(st, c) & bit(v)) };
  }
  function undo(p, st) {
    const step = st.h.pop();
    if (!step) return null;
    for (let i = step.length - 1; i >= 0; i--) {
      const [c, v, m] = step[i];
      if (locked(p, st, c)) continue;
      setV(st, c, v);
      setNote(p, st, c, m);
    }
    return step[0][0];
  }
  // a hint fills square c with its number; the square locks (drawn star-yellow) and no undo step can touch it again
  function fill(p, st, c) {
    const v = +p.s[c];
    place(p, st, c, v);
    if (!st.hn.includes(c)) st.hn.push(c);
    st.h = st.h.filter(s => !s.some(e => e[0] == c));
    return v;
  }

  /* ---------- hints: the next square a child can fill, and why ---------- */
  // Candidates as the grader has them: not in the row or column (and not taken away by an elimination), and kept only when some
  // way of filling the cage (its target, the other squares' candidates, no number twice in a line) uses them.
  // -> {cand, fills: [ways per cage], must: [[cage, line id, values every way puts in the cage's squares of that line]]}
  function analyse(p, b, elim) {
    const n = p.n, G = geo(n), full = (1 << n) - 1, I = info(p);
    const base = b.map((v, c) => {
      if (v) return 0;
      let m = full & ~(elim ? elim[c] : 0);
      for (const q of G.peers[c]) if (b[q]) m &= ~bit(b[q]);
      return m;
    });
    const cand = new Array(n * n).fill(0), fills = [], must = [];
    I.cg.forEach((cg, ci) => {
      fills[ci] = 0;
      const empty = cg.c.filter(c => !b[c]);
      if (!empty.length) return;
      const v = cg.c.map(c => b[c]), at = empty.map(c => cg.c.indexOf(c)), sup = empty.map(() => 0);
      const lids = [...new Set([].concat(...empty.map(c => G.lineIds[c])))], inter = lids.map(() => full);
      const rec = i => {
        if (i == empty.length) {
          if (calc(cg.o, v) !== cg.t) return;
          fills[ci]++;
          empty.forEach((c, j) => (sup[j] |= bit(v[at[j]])));
          lids.forEach((li, k) => {
            let m = 0;
            empty.forEach((c, j) => { if (G.lineIds[c].includes(li)) m |= bit(v[at[j]]); });
            inter[k] &= m;
          });
          return;
        }
        for (let x = 1; x <= n; x++) {
          if (!(base[empty[i]] & bit(x))) continue;
          let bad = false;
          for (let j = 0; j < i; j++) if (v[at[j]] == x && sameLine(n, empty[j], empty[i])) bad = true;
          if (bad) continue;
          v[at[i]] = x;
          rec(i + 1);
        }
        v[at[i]] = 0;
      };
      rec(0);
      empty.forEach((c, j) => (cand[c] = sup[j]));
      lids.forEach((li, k) => { if (fills[ci] && inter[k]) must.push([ci, li, inter[k]]); });
    });
    return { cand, fills, must };
  }
  // what the cage alone allows in square c (its arithmetic and the numbers already in the cage; rows and columns not looked at)
  // -> {opts: mask for c, sets: the number sets that make the cage as sorted lists (only when the cage is still empty)}
  function cageOpts(p, b, ci, c) {
    const n = p.n, cg = p.cg[ci], v = cg.c.map(q => b[q]), at = cg.c.indexOf(c), sets = new Set();
    const empty = cg.c.map((q, i) => (b[q] ? -1 : i)).filter(i => i >= 0);
    let opts = 0;
    const rec = j => {
      if (j == empty.length) {
        if (calc(cg.o, v) !== cg.t) return;
        opts |= bit(v[at]);
        sets.add(v.slice().sort((x, y) => x - y).join(','));
        return;
      }
      const i = empty[j];
      for (let x = 1; x <= n; x++) {
        let bad = false;
        for (let k = 0; k < cg.c.length; k++) if (k != i && v[k] == x && sameLine(n, cg.c[k], cg.c[i])) bad = true;
        if (bad) continue;
        v[i] = x;
        rec(j + 1);
      }
      v[i] = 0;
    };
    rec(0);
    return { opts, sets: empty.length == cg.c.length ? [...sets].map(s => s.split(',').map(Number)) : null };
  }
  // why square c of cage ci holds v: the number sets of the cage, then what its row and column take away
  function cageWhy(p, b, ci, c, v) {
    const cg = p.cg[ci], o = cageOpts(p, b, ci, c), lab = label(cg), size = WORD[cg.c.length] + ' squares';
    const have = cg.c.map(q => b[q]).filter(Boolean);
    let head;
    if (o.sets && o.sets.length <= 4) {
      const ss = o.sets.map(s => list(s));
      head = o.sets.length == 1 ? `Only ${ss[0]} make ${lab} in ${size}.` : `${lab} in ${size} can be ${ss.join(', or ')}.`;
    } else if (have.length) head = `${lab} with ${list(have)} in: this square can be ${list(bits(o.opts), 'or')}.`;
    else head = `For ${lab} this square can be ${list(bits(o.opts), 'or')}.`;
    const G = geo(p.n), inLine = new Set(G.peers[c].map(q => b[q]).filter(Boolean));
    const gone = bits(o.opts).filter(x => inLine.has(x)), left = bits(o.opts).filter(x => !inLine.has(x));
    if (gone.length && left.length == 1 && left[0] == v)
      return `${head} ${list(gone)} ${gone.length > 1 ? 'are' : 'is'} already in this square's row or column, so it is ${v}.`;
    if (bits(o.opts).length == 1) return `${head} So this square is ${v}.`;
    return `${head} Try each one: only ${v} fits here with its row, its column and the rest of the cage.`;
  }

  // The next step: {kind, cell, v, house (squares hint 1 points at), also (squares hint 2 marks besides the cell), say1, say2, say3}
  function nextStep(p, st) {
    const n = p.n, G = geo(n), I = info(p), b = vals(p, st), sol = nums(p.s), e = nums(st.v);
    if (b.join('') == p.s) return null;
    const cageOf = c => p.cg[I.cageAt[c]];
    const say3 = v => `${v} goes here.`;
    // 1. a number that is not right: one that clashes first, then one in a cage that misses, then any
    const wrong = e.map((x, c) => (x && x != sol[c] ? c : -1)).filter(c => c >= 0);
    if (wrong.length) {
      const cf = conflicts(p, b), ms = new Set([].concat(...misses(p, b).map(i => p.cg[i].c)));
      const c = wrong.find(x => cf.has(x)) ?? wrong.find(x => ms.has(x)) ?? wrong[0];
      return { kind: 'wrong', cell: c, v: sol[c], house: cageOf(c).c, also: [],
        say1: 'One number in this cage is not right yet.', say2: `This ${e[c]} does not belong here. Another number goes in this square.`, say3: say3(sol[c]) };
    }
    // 2. a cage with one empty square that its arithmetic fixes
    for (const cg of p.cg) {
      const empty = cg.c.filter(c => !b[c]);
      if (empty.length != 1 || cg.o == '=') continue;
      const fits = range(n).map(i => i + 1).filter(x => calc(cg.o, cg.c.map(c => b[c] || x)) === cg.t);
      if (fits.length != 1) continue;
      const c = empty[0], v = fits[0], have = cg.c.filter(q => q != c).map(q => b[q]), all = cg.c.map(q => b[q] || v);
      const how = { '+': `The numbers in this cage add up to ${cg.t}`, '*': `The numbers in this cage multiply to ${cg.t}`,
        '-': `In this cage the two numbers are ${cg.t} apart`, '/': `In this cage one number is ${cg.t} times the other` }[cg.o];
      return { kind: 'cagelast', cell: c, v, house: cg.c, also: [],
        say1: `This ${label(cg)} cage needs just one more number.`,
        say2: `${how}. It has ${list(have)}, so the last number is ${v}: ${sumText(cg, all)}.`, say3: say3(v) };
    }
    // 3. a row or column with one gap
    for (const L of G.lines) {
      const gaps = L.cells.filter(c => !b[c]);
      if (gaps.length != 1) continue;
      const have = new Set(L.cells.map(c => b[c])), v = range(n).map(i => i + 1).find(x => !have.has(x));
      return { kind: 'last', cell: gaps[0], v, house: L.cells, also: [],
        say1: `This ${L.k} has just one empty square.`, say2: `Only ${v} is missing from this ${L.k}.`, say3: say3(v) };
    }
    // 4. a cage single: a square with one candidate left; the cage with the fewest ways to make it first
    const a = analyse(p, b);
    const single = an => {
      let best = -1;
      for (let c = 0; c < n * n; c++) if (!b[c] && one(an.cand[c]) && (best < 0 || an.fills[I.cageAt[c]] < an.fills[I.cageAt[best]])) best = c;
      if (best >= 0) return { kind: 'cage', cell: best, v: valOf(an.cand[best]) };
      for (const L of G.lines) for (let v = 1; v <= n; v++) {
        if (L.cells.some(c => b[c] == v)) continue;
        const where = L.cells.filter(c => !b[c] && an.cand[c] & bit(v));
        if (where.length == 1) return { kind: 'hidden', cell: where[0], v, L };
      }
      return null;
    };
    const hiddenWhy = s => `${s.v} can only go here: no other empty square of this ${s.L.k} can be ${s.v}, because of its ${s.L.k == 'row' ? 'column' : 'row'} or its cage.`;
    let s = single(a);
    if (s && s.kind == 'cage') {
      const cg = cageOf(s.cell);
      return { kind: 'cage', cell: s.cell, v: s.v, house: cg.c, also: [],
        say1: `Look at the ${label(cg)} cage. Which numbers can make it?`, say2: cageWhy(p, b, I.cageAt[s.cell], s.cell, s.v), say3: say3(s.v) };
    }
    if (s) return { kind: 'hidden', cell: s.cell, v: s.v, house: s.L.cells, also: [],
      say1: `Look at this ${s.L.k}. Where can ${s.v} go?`, say2: hiddenWhy(s), say3: say3(s.v) };
    // 5. take candidates away (a cage in a line, a naked pair) until a single shows
    const elim = new Array(n * n).fill(0);
    let first = null, an = a;
    for (let it = 0; it < 60; it++) {
      let x = null;
      for (const [ci, li, m] of an.must) {
        const L = G.lines[li], out = [];
        for (const c of L.cells) if (!b[c] && I.cageAt[c] != ci) for (const v of bits(m & an.cand[c])) out.push([c, v]);
        if (out.length) { x = { kind: 'inline', ci, L, v: out[0][1], at: p.cg[ci].c.filter(c => !b[c] && G.lineIds[c].includes(li)), out }; break; }
      }
      if (!x) for (const L of G.lines) {
        for (let i = 0; i < n && !x; i++) {
          const c1 = L.cells[i];
          if (b[c1] || popc(an.cand[c1]) != 2) continue;
          for (let j = i + 1; j < n && !x; j++) {
            const c2 = L.cells[j];
            if (b[c2] || an.cand[c2] != an.cand[c1]) continue;
            const out = [];
            for (const c of L.cells) if (c != c1 && c != c2 && !b[c]) for (const v of bits(an.cand[c] & an.cand[c1])) out.push([c, v]);
            if (out.length) x = { kind: 'pair', L, vs: bits(an.cand[c1]), at: [c1, c2], out };
          }
        }
        if (x) break;
      }
      if (!x) break;
      for (const [c, v] of x.out) elim[c] |= bit(v);
      if (!first) first = x;
      an = analyse(p, b, elim);
      s = single(an);
      if (s) {
        const k = first.L.k;
        const pre = first.kind == 'inline'
          ? `Every way to make ${label(p.cg[first.ci])} puts ${aN(first.v)} in the marked squares of this ${k}, so no other square of the ${k} can be ${first.v}. Now `
          : `The marked squares can only be ${first.vs[0]} and ${first.vs[1]}, so no other square of this ${k} can be. Now `;
        const tail = s.kind == 'cage' ? `only ${s.v} fits here.` : `${s.v} can only go here in its ${s.L.k}.`;
        return { kind: first.kind, cell: s.cell, v: s.v, house: first.L.cells, also: first.at,
          say1: first.kind == 'inline' ? `Look at the ${label(p.cg[first.ci])} cage and this ${k}.` : `Look at this ${k}. Which numbers can each square be?`,
          say2: pre + tail, say3: say3(s.v) };
      }
    }
    // 6. never stuck: the empty square with the fewest choices
    let c = -1;
    for (let i = 0; i < b.length; i++) if (!b[i] && (c < 0 || popc(a.cand[i]) < popc(a.cand[c]))) c = i;
    return { kind: 'guess', cell: c, v: sol[c], house: cageOf(c).c, also: [],
      say1: 'Try this square.', say2: 'Look at its row, its column and its cage.', say3: say3(sol[c]) };
  }
  // hint(p, st, tier): {tier, kind, cell, v, house, mark, say, fill ([cell, value] on tier 3 only)}; null when solved. Pure.
  function hint(p, st, tier) {
    const s = nextStep(p, st);
    if (!s) return null;
    const t = Math.max(1, Math.min(3, tier | 0));
    return { tier: t, kind: s.kind, cell: s.cell, v: s.v, house: t == 3 ? [] : s.house, mark: t == 1 ? [] : [s.cell].concat(t == 2 ? s.also : []),
      say: t == 1 ? s.say1 : t == 2 ? s.say2 : s.say3, fill: t == 3 ? [s.cell, s.v] : null };
  }
  // the moves that win, in the order the hints would give them: [[cell, value], ...]
  function solve(p) {
    const st = fresh(p), out = [];
    for (let i = 0; i < p.n * p.n; i++) {
      const s = nextStep(p, st);
      if (!s) break;
      place(p, st, s.cell, s.v);
      out.push([s.cell, s.v]);
    }
    return out;
  }
  // words for the voice: "12×" -> "12 times", "2 + 3 = 5" -> "2 plus 3 equals 5"
  const spoken = t => String(t).replace(/ \+ /g, ' plus ').replace(/ × /g, ' times ').replace(/ − /g, ' minus ').replace(/ ÷ /g, ' divided by ')
    .replace(/ = /g, ' equals ').replace(/(\d)\+/g, '$1 plus').replace(/(\d)×/g, '$1 times').replace(/(\d)−/g, '$1 minus').replace(/(\d)÷/g, '$1 divide');

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    const G = geo(p.n), I = info(p), n = p.n, N = n * n, giv = I.giv, nt = notesOn(p);
    let st = api.loadState();
    if (!fit(p, st)) st = fresh(p);
    const timers = [];
    const later = (f, ms) => timers.push(setTimeout(f, ms));
    let marks = { house: [], cell: [] }, msg = '', done = false;
    const ops = [...new Set(p.cg.map(g => g.o).filter(o => o != '='))].sort((x, y) => '+-*/'.indexOf(x) - '+-*/'.indexOf(y));
    const intro = p.b == 'B'
      ? `Each row and column needs 1, 2 and 3 once. The numbers in a cage add up to its number. Tap a square, then a number.`
      : `Each row and column needs 1 to ${n} once. The numbers in a cage make its number with its sign (${ops.map(o => SIGN[o]).join(' ')}). Tap a square, then a number.`;
    const labAt = new Array(N).fill(-1);
    p.cg.forEach((g, i) => { if (g.o != '=') labAt[g.c[0]] = i; });

    // the cage lines: thin between squares of one cage, thick between cages (viewBox units = squares; the grid's edge is its CSS ring)
    let thin = '', thick = '';
    for (let c = 0; c < N; c++) {
      const r = Math.floor(c / n), k = c % n;
      if (k < n - 1) { const d = `M${k + 1} ${r}V${r + 1}`; if (I.cageAt[c] == I.cageAt[c + 1]) thin += d; else thick += d; }
      if (r < n - 1) { const d = `M${k} ${r + 1}H${k + 1}`; if (I.cageAt[c] == I.cageAt[c + n]) thin += d; else thick += d; }
    }
    const lines = `<svg class="md-lines" viewBox="0 0 ${n} ${n}" preserveAspectRatio="none" aria-hidden="true">` +
      (thin ? `<path class="md-thin" d="${thin}"/>` : '') + (thick ? `<path class="md-thick" d="${thick}"/>` : '') + '</svg>';
    const cells = range(N).map(c => `<button class="md-c" data-c="${c}"></button>`).join('');
    const pad = padHTML('', false).replace('class="keys qpad pad"', 'class="keys qpad pad md-pad"');
    el.innerHTML = `<div class="md md-n${n} md-${p.b}" style="--n:${n}">` +
      `<div class="md-say">${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'md-spk' })}<p class="md-msg" aria-live="polite"></p></div>` +
      `<div class="md-main"><div class="md-board" role="group" aria-label="MathDoku, ${n} by ${n}"><div class="md-grid">${cells}</div>${lines}</div></div>` +
      `<div class="md-ctl">${pad}</div></div>`;
    const root = el.querySelector('.md'), board = root.querySelector('.md-board'), padEl = root.querySelector('.md-pad');
    const say_ = root.querySelector('.md-say'), ctl = root.querySelector('.md-ctl'), main = root.querySelector('.md-main');
    const cellEl = range(N).map(c => board.querySelector(`[data-c="${c}"]`));
    // the pad: 1..n with dots for how many are left; Erase and Undo, and Notes in bands C and D
    padEl.querySelectorAll('.k').forEach(k => { const d = k.dataset.k; if (d == '0' || d == 'go' || +d > n) k.remove(); });
    for (let v = 1; v <= n; v++) {
      const k = padEl.querySelector(`.k[data-k="${v}"]`);
      k.innerHTML = `<span class="md-kf">${v}</span><small class="md-left"></small>`;
      k.classList.add('md-sym');
    }
    const del = padEl.querySelector('.k[data-k="del"]');
    del.setAttribute('aria-label', 'Erase');
    del.classList.add('t');
    del.insertAdjacentHTML('beforeend', '<span>Erase</span>');
    padEl.append(del);
    padEl.insertAdjacentHTML('beforeend', (nt ? `<button class="key k t md-ntk" data-k="notes" aria-label="Notes" aria-pressed="false">${ico('edit')}<span>Notes</span></button>` : '') +
      `<button class="key k t" data-k="undo" aria-label="Undo">${ico('undo')}<span>Undo</span></button>`);
    const tools = padEl.querySelectorAll('.key.t').length;

    function tell(text, kind, speak) {
      msg = text;
      const m = root.querySelector('.md-msg');
      m.textContent = text;
      m.className = 'md-msg' + (kind ? ' ' + kind : '');
      if (speak) api.say(spoken(text));
    }
    root.querySelector('.md-spk').onclick = () => { try { say(spoken(msg)); } catch (e) {} };

    /* ---------- drawing ---------- */
    function draw() {
      const b = vals(p, st), cf = conflicts(p, b), ms = new Set(misses(p, b)), s = G.at[st.sel], selV = b[st.sel];
      for (let c = 0; c < N; c++) {
        const v = b[c], given = !!giv[c], hn = st.hn.includes(c), m = noteOf(st, c), a = G.at[c], li = labAt[c];
        let cls = 'md-c' + (given ? ' giv' : v ? (hn ? ' ent hn' : ' ent') : '');
        if (c == st.sel) cls += ' sel';
        else if (a.r == s.r || a.c == s.c) cls += ' rc';
        if (selV && v == selV && c != st.sel) cls += ' same';
        if (cf.has(c)) cls += ' cf';
        if (marks.cell.includes(c)) cls += ' hl';
        else if (marks.house.includes(c)) cls += ' hh';
        if (li >= 0) cls += ' lab';
        let html = '', lab = v ? String(v) : 'empty';
        if (li >= 0) {
          const miss = ms.has(li);
          html += `<span class="md-lab${miss ? ' miss' : ''}">${miss ? ico('warning', 14) : ''}${label(p.cg[li])}</span>`;
        }
        if (v) html += `<b class="md-v">${v}</b>` + (cf.has(c) && !given ? `<span class="md-wn">${ico('warning', 16)}</span>` : '');
        else if (m) {
          html += `<i class="md-nts">${range(n).map(i => `<span>${m & bit(i + 1) ? i + 1 : ''}</span>`).join('')}</i>`;
          lab = 'notes ' + range(n).filter(i => m & bit(i + 1)).map(i => i + 1).join(' ');
        }
        if (given) lab += ', given';
        if (cf.has(c)) lab += ', clashes';
        const cg = p.cg[I.cageAt[c]];
        const cage = cg.o == '=' ? '' : `, cage ${spoken(label(cg))}${ms.has(I.cageAt[c]) ? ' does not make its number' : ''}`;
        if (cellEl[c].className != cls) cellEl[c].className = cls;
        if (cellEl[c]._h !== html) { cellEl[c].innerHTML = html; cellEl[c]._h = html; }
        cellEl[c].setAttribute('aria-label', `Row ${a.r + 1}, column ${a.c + 1}: ${lab}${cage}`);
      }
      for (let v = 1; v <= n; v++) {
        const k = padEl.querySelector(`.k[data-k="${v}"]`), left = n - b.filter(x => x == v).length;
        // one dot for each one left (a count that cannot be read as a power), a tick when none are left
        const lf = k.querySelector('.md-left'), t = left > 0 ? '<i></i>'.repeat(Math.min(n, left)) : ico('check', 14);
        if (lf._h !== t) { lf.innerHTML = t; lf._h = t; }
        k.classList.toggle('zero', left <= 0);
        k.setAttribute('aria-label', `${v}, ${Math.max(0, left)} left`);
      }
      const nk = padEl.querySelector('[data-k="notes"]'), uk = padEl.querySelector('[data-k="undo"]');
      if (nk) { nk.classList.toggle('on', !!st.nt); nk.setAttribute('aria-pressed', st.nt ? 'true' : 'false'); }
      uk.disabled = !st.h.length || done;
      root.classList.toggle('nt', !!st.nt);
    }

    /* ---------- layout: the board is a square sized to the space that is left (section 8) ----------
       portrait: talk line, board, pad; landscape: board, then a side column with the talk line and the pad.
       The pad is a grid of 60 narrow columns, so the digits and the tools can each share a row evenly (60 = 3 x 4 x 5). */
    const side = document.createElement('div');
    side.className = 'md-side';
    root.append(side);
    let lastW = 0, lastH = 0;
    function arrange(land) {
      if (land) { root.append(main, side); side.append(say_, ctl); }
      else root.append(say_, main, ctl);
      root.classList.toggle('land', land);
    }
    // the digits in one row when each key can be 48 px wide, else two rows; the tools (with their words) in the row below
    function setPad(w) {
      const ds = 60 / ((w - n * 8) / n >= 48 ? n : Math.ceil(n / 2)), ts = 60 / tools;
      padEl.style.setProperty('--ds', Math.floor(ds));
      padEl.style.setProperty('--ts', Math.floor(ts));
      // a tool key too narrow for its word shows the icon only (its aria-label still says it)
      padEl.classList.toggle('tight', (w * ts) / 60 - 8 < 104);
    }
    function layout() {
      if (!el.isConnected) return;
      const ps = getComputedStyle(el);
      const aw = el.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
      const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
      lastW = aw; lastH = ah;
      const land = aw > ah * 1.15 && aw >= 640, gap = 12;
      let bs;
      arrange(land);
      if (land) {
        setPad(side.offsetWidth);
        bs = Math.min(ah, aw - side.offsetWidth - 2 * gap);
      } else {
        setPad(aw);
        bs = Math.min(aw, ah - say_.offsetHeight - ctl.offsetHeight - 2 * gap);
      }
      const cs = Math.min(MAXCELL[n] || 64, Math.floor((Math.max(120, bs) - 2 * FP) / n));
      root.style.setProperty('--cs', Math.max(28, cs) + 'px');
      draw();
    }
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { if (el.clientWidth != lastW || el.clientHeight != lastH) layout(); }, 120); };
    window.addEventListener('resize', onResize);

    /* ---------- moves ---------- */
    const store = () => api.saveState(st);
    const speakB = p.b == 'B';
    function finish() {
      done = true;
      marks = { house: [], cell: [] };
      draw();
      root.classList.add('win');
      tell('Solved! Every row and column has each number once, and every cage makes its number.', 'good', speakB);
      api.win({ mistakes: st.miss });
    }
    function pick(c) {
      if (done || c == null || c < 0 || c >= N) return;
      st.sel = c;
      SFX.click();
      store();
      draw();
    }
    const msgAfter = () => {
      const b = vals(p, st);
      if (conflicts(p, b).size) return 'Some numbers still clash. The amber squares show where.';
      if (misses(p, b).length) return 'A cage with an amber number does not make it yet.';
      return 'Keep going!';
    };
    function pop(cs) {
      for (const c of cs) {
        const e = cellEl[c];
        e.classList.remove('pop');
        void e.offsetWidth;
        e.classList.add('pop');
      }
    }
    function sym(v) {
      if (done) return;
      const c = st.sel;
      if (st.nt && nt) {
        const r = note(p, st, c, v);
        if (r.ign) return tell(+st.v[c] || locked(p, st, c) ? 'Notes go in empty squares.' : 'Tap an empty square first.', 'try');
        SFX.key(v);
        store();
        return draw();
      }
      const r = enter(p, st, c, v);
      if (r.ign) {
        if (r.ign == 'same') return;
        return tell(giv[c] ? 'That one was there from the start. Tap an empty square.' : 'A hint filled that one. Tap another square.', 'try', speakB);
      }
      marks = { house: [], cell: [] };
      store();
      draw();
      if (r.conf.length) {
        SFX.rattle();
        const k = clash(p, vals(p, st), c, v);
        return tell(`Two ${v}s in this ${k ? k.k : 'row'}. Change one of them.`, 'try', speakB);
      }
      const cg = p.cg[r.cage];
      if (cg && !r.made) {
        SFX.rattle();
        const b = vals(p, st);
        return tell(`${sumText(cg, cg.c.map(q => b[q]))}, but this cage needs ${cg.t}. Change a number.`, 'try', speakB);
      }
      SFX.pop(1);
      if (r.won) return finish();
      if (cg && r.made) { pop(cg.c); return tell(`${sumText(cg, cg.c.map(q => vals(p, st)[q]))}. That cage works!`, 'good'); }
      tell(msgAfter(), '');
    }
    function act(k) {
      if (done) return;
      if (k == 'del') {
        const r = erase(p, st, st.sel);
        if (r.ign) return tell(locked(p, st, st.sel) ? 'That one stays. Pick a square you filled.' : 'That square is already empty.', 'try');
        SFX.del();
        tell(msgAfter(), '');
      } else if (k == 'notes') {
        st.nt = st.nt ? 0 : 1;
        SFX.click();
        tell(st.nt ? 'Notes are on: tap numbers to jot them small. Tap Notes again to write big.' : 'Notes are off: numbers go in big.', '');
      } else if (k == 'undo') {
        const c = undo(p, st);
        if (c == null) return;
        st.sel = c;
        SFX.whoosh();
        marks = { house: [], cell: [] };
        tell(msgAfter(), '');
      } else return sym(+k);
      store();
      draw();
    }
    board.onclick = e => { const b = e.target.closest('.md-c'); if (b) pick(+b.dataset.c); };
    padEl.querySelectorAll('.k[data-k]').forEach(b => b.onclick = () => act(b.dataset.k));
    // hardware keys: digits, Backspace or Delete, arrows to move, N for notes
    const keyd = e => {
      if (!el.isConnected || done || document.querySelector('.bt-win,.sheet')) return;
      const a = G.at[st.sel], mv = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[e.key];
      if (/^[1-9]$/.test(e.key) && +e.key <= n) { e.preventDefault(); act(e.key); }
      else if (e.key == 'Backspace' || e.key == 'Delete') { e.preventDefault(); act('del'); }
      else if ((e.key == 'n' || e.key == 'N') && nt) act('notes');
      else if (mv) { e.preventDefault(); pick(((a.r + mv[0] + n) % n) * n + ((a.c + mv[1] + n) % n)); }
    };
    document.addEventListener('keydown', keyd);

    /* ---------- start ---------- */
    const fresh_ = !st.v.replace(/0/g, '') && !st.m.length;
    tell(fresh_ ? intro : 'Keep going! Tap an empty square.', '', fresh_ && speakB);
    layout();
    // the stage can still be settling (fonts, the frame's top bar): look again once
    later(layout, 60);
    return {
      hint(tier) {
        if (done) return false;
        const h = hint(p, st, tier);
        if (!h) return false;
        marks = { house: h.house, cell: h.mark };
        if (h.fill) {
          fill(p, st, h.fill[0]);
          st.sel = h.fill[0];
          store();
          draw();
          pop([h.fill[0]]);
          tell(h.say, 'hint', true);
          if (won(p, st)) finish();
          return true;
        }
        if (h.tier == 2) st.sel = h.cell;
        store();
        draw();
        tell(h.say, 'hint', true);
        return true;
      },
      destroy() {
        timers.forEach(clearTimeout);
        clearTimeout(rz);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('keydown', keyd);
      },
    };
  }

  return { SIGN, SYMS, calc, label, decode, transform, slot, make, geo, info, fresh, fit, vals, conflicts, misses, enter, erase, note, undo,
    fill, won, notesOn, analyse, nextStep, hint, solve, spoken, mount, nums };
})();

BT.reg({
  id: 'mdoku', name: 'MathDoku', icon: 'mdoku', bands: 'BCD',
  rules: 'Every row and every column has each number once. The numbers in each cage make the cage\'s number with its sign.',
  make: (band, level, rnd) => MD.make(band, level, rnd),
  mount: (el, p, api) => MD.mount(el, p, api),
  solve: p => MD.solve(p),
});
/* ---------- Brain Teasers: Logic grids (P3-07; BRAIN_TEASERS.md 5.3, 7, 8; details in PROGRESS.md) ----------
   Type `logic`, bands B (3 children x 1 picture category), C (3 x 2) and D (4 x 2, the second ordered). Level L uses bank entries
   3(L-1)..3L-1 of PUZ.logic[band] (P3-06; read only inside functions, A11); the seeded rnd picks one and swaps the children's names
   (a name appears in a sentence only as itself, so every clue stays true). A tap cycles blank -> cross -> tick -> blank; a tick
   crosses the open squares of its row and column in its block (auto-cross, D can turn it off). A mark that breaks a rule the child
   can see is shown in amber at once and not counted; Check counts wrong marks (each once). Hints follow the grader's techniques
   (tools/puzzles/logic.js): a wrong mark, a tick's lines, clue mark, only place left, link, two-way clue, chain; tier 1 points,
   tier 2 explains, tier 3 places that one mark. State: {v: '0' blank '1' tick '2' cross per square of blocks (0,1), (0,2), (1,2)
   (row = item of the first category), a: auto-crosses, h: undo steps, miss, u: struck clues, hn: hint marks, seen, ac, hu, tab}. */
const LG = (() => {
  // the generator's names (tools/puzzles/logic.js NAMES), for the runtime swap
  const NAMES = ['Mia', 'Leo', 'Sam', 'Ava', 'Ben', 'Zoe', 'Max', 'Tom', 'Kim', 'Eli', 'Nia', 'Raj', 'Ana', 'Omar', 'Finn', 'Ella', 'Noah',
    'Maya', 'Owen', 'Kai', 'Ada', 'Luca', 'Nora', 'Hugo', 'Lena', 'Ravi', 'Yuki', 'Amir', 'Tara', 'Theo', 'Dev', 'Zara', 'Ivan', 'Jun'];
  // words for hints and the summary (the generator's CATS; test.js checks they rebuild every is / is-not sentence of the bank)
  const VB = { pet: 'has|does not have', snack: 'eats|does not eat', sport: 'plays|does not play', music: 'plays|does not play',
    ride: 'rides|does not ride', colour: 'likes|does not like', age: 'is|is not', house: 'lives at|does not live at', race: 'came|did not come' };
  const OWN = { swim: 'swims|does not swim|', skate: 'skates|does not skate|', paint: 'paints|does not paint|', read: 'reads|does not read|',
    draw: 'draws|does not draw|', puzzle: 'does|does not do|puzzles' };
  const NOUN = { pet: 'pet', snack: 'snack', sport: 'sport', hobby: 'hobby', music: 'instrument', ride: 'ride', colour: 'colour', age: 'age',
    house: 'house', race: 'place' };
  const BASE = { age: 'be', house: 'live at', race: 'come' };
  const EXT = { age: ['the youngest', 'the oldest'], house: ['at the smallest number', 'at the biggest number'], race: ['first', 'last'] };
  const ORD = ['1st', '2nd', '3rd', '4th'];
  const CHAIN = 2; // as the grader: a what-if must break within 2 steps
  const range = k => Array.from({ length: k }, (_, i) => i);
  const cap = s => s[0].toUpperCase() + s.slice(1);
  const lcf = s => (s.startsWith('The ') ? 't' + s.slice(1) : s);
  const list = a => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + (a.length > 2 ? ',' : '') + ' or ' + a[a.length - 1]);

  /* ---------- words ---------- */
  const catOf = (p, c) => p.cats[c - 1];
  const wordOf = (p, c, i) => (c ? p.items[c - 1][i] : p.names[i]);
  function verb(cat, w) { // [verb, negative verb, object]
    if ((cat == 'sport' || cat == 'hobby') && OWN[w]) return OWN[w].split('|');
    const [v, nv] = VB[cat].split('|');
    return [v, nv, cat == 'sport' || cat == 'colour' || cat == 'age' || cat == 'race' ? w : cat == 'house' ? 'number ' + w : 'the ' + w];
  }
  function who(cat, w) { // an item as a sentence subject
    if (cat == 'pet') return `the ${w}'s owner`;
    if (cat == 'age') return `the ${w}-year-old`;
    if (cat == 'house') return 'the child at number ' + w;
    const [v, , o] = verb(cat, w);
    return ('the child who ' + v + ' ' + o).trim();
  }
  const ref = (p, e) => (e[0] ? who(catOf(p, e[0]), wordOf(p, ...e)) : p.names[e[1]]);
  function vp(p, e, neg) {
    if (!e[0]) return (neg ? 'is not ' : 'is ') + p.names[e[1]];
    const [v, nv, o] = verb(catOf(p, e[0]), wordOf(p, ...e));
    return ((neg ? nv : v) + ' ' + o).trim();
  }
  // "Ben paints", "The child who paints is 7", "The cat's owner is not Mia": the lower category is the subject
  const sent = (p, e1, e2, neg) => cap(ref(p, e1) + ' ' + vp(p, e2, neg));
  const fact = (p, e1, e2, neg) => (e1[0] > e2[0] ? sent(p, e2, e1, neg) : sent(p, e1, e2, neg));
  // short names for "the square for Ben and paint"
  function lab(p, c, i) {
    if (!c) return p.names[i];
    const cat = catOf(p, c), w = wordOf(p, c, i);
    if (cat == 'age') return 'age ' + w;
    if (cat == 'house') return 'number ' + w;
    if (cat == 'race' || cat == 'sport' || cat == 'hobby' || cat == 'colour') return w == 'puzzle' ? 'puzzles' : w;
    return 'the ' + w;
  }
  const noun = (p, c) => (c ? NOUN[catOf(p, c)] : 'child');

  /* ---------- make: a bank puzzle by level, with the names swapped ---------- */
  function decode(entry) {
    const [names, cats, sol, gr, sc] = entry[0].split('|');
    const cs = cats.split(';').map(s => s.split('='));
    return { names: names.split(','), cats: cs.map(x => x[0]), items: cs.map(x => x[1].split(',')),
      sol: sol.split(';').map(s => Array.from(s, Number)), gr: +gr, sc: +sc, cl: entry.slice(1) };
  }
  function pickNames(rnd, n, maxLen) {
    const pool = NAMES.filter(x => x.length <= maxLen), out = [];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    for (const x of pool) if (out.length < n && !out.some(y => y[0] == x[0])) out.push(x);
    return out;
  }
  // bank puzzle k of a band with these names (every name of the puzzle replaced at once, as whole words)
  function build(band, k, names) {
    const d = decode(PUZ.logic[band][k]), old = d.names, n = old.length;
    const nm = names || old, re = new RegExp('\\b(' + old.join('|') + ')\\b', 'g');
    const cl = d.cl.map(q => q.slice(0, -1).concat(q[q.length - 1].replace(re, m => nm[old.indexOf(m)])));
    const O = d.cats.findIndex(c => PUZ.logic.cats[c] && PUZ.logic.cats[c].ordered) + 1;
    return { b: band, k, n, K: d.cats.length, O, names: nm.slice(0, n), cats: d.cats, items: d.items, sol: d.sol, gr: d.gr, sc: d.sc, cl };
  }
  function make(band, level, rnd) {
    const L = Math.max(1, Math.min(12, +level || 1)), list = PUZ.logic[band];
    const k = Math.min(list.length - 1, 3 * (L - 1) + Math.floor(rnd() * 3));
    const n = decode(list[k]).names.length;
    return build(band, k, pickNames(rnd, n, band == 'B' ? 4 : 9));
  }

  /* ---------- geometry: blocks (0,1), (0,2), (1,2); square = block * n*n + row * n + column ---------- */
  const CX = new WeakMap();
  function ctx(p) {
    if (CX.has(p)) return CX.get(p);
    const n = p.n, nn = n * n, B = p.K == 1 ? [[0, 1]] : [[0, 1], [0, 2], [1, 2]];
    // ch[c][i]: the child of entity (c, i)
    const ch = [range(n)].concat(p.sol.map(s => { const r = []; s.forEach((it, kid) => { r[it] = kid; }); return r; }));
    const cl = p.cl.map((q, qi) => (q[0] == 'or' ? { k: 'or', qi, a: [q[1], q[2]], d: q[3], j: [q[4], q[5]], t: q[6] }
      : { k: q[0], qi, a: [q[1], q[2]], b: [q[3], q[4]], t: q[5] }));
    const lines = [];
    B.forEach((bl, k) => {
      for (let x = 0; x < n; x++) for (const row of [1, 0]) lines.push({ k, x, row, cells: range(n).map(y => k * nn + (row ? x * n + y : y * n + x)) });
    });
    const x = { p, n, nn, B, K: p.K, O: p.O, ch, cl, N: B.length * nn, lines };
    CX.set(p, x);
    return x;
  }
  const bix = (a, b) => (a == 0 ? b - 1 : 2);
  const at = (x, a, i, b, j) => (a < b ? bix(a, b) * x.nn + i * x.n + j : bix(b, a) * x.nn + j * x.n + i);
  const pos = (x, c) => { const k = Math.floor(c / x.nn), r = c % x.nn; return [x.B[k][0], Math.floor(r / x.n), x.B[k][1], r % x.n]; };
  const solv = (x, c) => { const [a, i, b, j] = pos(x, c); return x.ch[a][i] == x.ch[b][j] ? 1 : -1; };
  const lineOf = (x, c, row) => x.lines.find(L => L.row == row && L.cells.includes(c));
  const lineEnt = (x, L) => (L.row ? [x.B[L.k][0], L.x] : [x.B[L.k][1], L.x]); // whose line it is
  const lineCross = (x, L) => (L.row ? x.B[L.k][1] : x.B[L.k][0]); // the category along it
  // block (1,2) is drawn turned (rows = the second category), so its engine rows are columns on screen
  const rowcol = (x, L) => ((x.B[L.k][0] == 1) == !!L.row ? 'column' : 'row');

  /* ---------- the grader's marks (tools/puzzles/logic.js), on an Int8Array: 0 open, 1 tick, -1 cross ---------- */
  const gnew = (x, m) => ({ x, m: m || new Int8Array(x.N), bad: false });
  const gcopy = g => ({ x: g.x, m: g.m.slice(), bad: g.bad });
  const get = (g, a, i, b, j) => g.m[at(g.x, a, i, b, j)];
  // a tick crosses the rest of its row and column; a mark over the opposite one is a clash (g.bad)
  function mark(g, a, i, b, j, v) {
    const c = at(g.x, a, i, b, j), cur = g.m[c];
    if (cur == v) return false;
    if (cur) { g.bad = true; return true; }
    g.m[c] = v;
    if (v == 1) for (let k = 0; k < g.x.n; k++) {
      if (k != j) mark(g, a, i, b, k, -1);
      if (k != i) mark(g, a, k, b, j, -1);
    }
    return true;
  }
  function broken(g) {
    if (g.bad) return { why: 'bad' };
    for (const L of g.x.lines) {
      let cr = 0, tk = 0;
      for (const c of L.cells) { if (g.m[c] < 0) cr++; else if (g.m[c] > 0) tk++; }
      if (cr == g.x.n || tk > 1) return { why: tk > 1 ? 'two' : 'empty', L };
    }
    return null;
  }
  const cand = (g, e, d) => range(g.x.n).filter(k => get(g, e[0], e[1], d, k) != -1);
  const REL = { gt: (v, w) => v > w, lt: (v, w) => v < w, nx: (v, w) => Math.abs(v - w) == 1 };
  // every application of technique t, in the grader's order: {t, marks: [[a, i, b, j, v, why]], ...}
  function* apps(g, t, used) {
    const x = g.x, n = x.n;
    if (t == 1) {
      for (const q of x.cl) {
        if (q.k != 'is' && q.k != 'not') continue;
        if (used) { if (used.has(q.qi)) continue; used.add(q.qi); }
        yield { t, q, marks: [[...q.a, ...q.b, q.k == 'is' ? 1 : -1]] };
      }
    } else if (t == 2) {
      for (const L of x.lines) {
        let open = -1, cnt = 0, tick = false;
        for (const c of L.cells) { if (g.m[c] > 0) tick = true; if (!g.m[c]) { open = c; cnt++; } }
        if (!tick && cnt == 1) yield { t, L, marks: [[...pos(x, open), 1]] };
      }
    } else if (t == 3) {
      for (let c = 0; c < x.N; c++) {
        if (g.m[c] != 1) continue;
        const [a, i, b, j] = pos(x, c);
        for (let d = 0; d <= x.K; d++) {
          if (d == a || d == b) continue;
          const marks = [];
          for (let k = 0; k < n; k++) {
            const u = get(g, a, i, d, k), w = get(g, b, j, d, k);
            if (u && !w) marks.push([b, j, d, k, u, [a, i, d, k, u]]);
            else if (w && !u) marks.push([a, i, d, k, w, [b, j, d, k, w]]);
          }
          yield { t, tick: [a, i, b, j], marks };
        }
      }
    } else if (t == 4) {
      for (const q of x.cl) {
        if (q.k == 'is' || q.k == 'not') continue;
        const marks = [];
        if (q.k == 'or') {
          for (let k = 0; k < n; k++) if (!q.j.includes(k)) marks.push([...q.a, q.d, k, -1, 'or']);
        } else {
          const rel = REL[q.k], c1 = cand(g, q.a, x.O), c2 = cand(g, q.b, x.O);
          for (const v of c1) if (!c2.some(w => rel(v, w))) marks.push([...q.a, x.O, v, -1, ['a', c2]]);
          for (const w of c2) if (!c1.some(v => rel(v, w))) marks.push([...q.b, x.O, w, -1, ['b', c1]]);
          if (q.a[0] != q.b[0]) marks.push([...q.a, ...q.b, -1, 'diff']);
        }
        yield { t, q, marks };
      }
    } else if (t == 5) {
      const used2 = new Set(x.cl.filter(q => q.k == 'is' || q.k == 'not').map(q => q.qi));
      for (let c = 0; c < x.N; c++) {
        if (g.m[c]) continue;
        const tr = gcopy(g), tu = new Set(used2), steps = [];
        mark(tr, ...pos(x, c), 1);
        let br = broken(tr);
        for (let s = 0; s < CHAIN && !br; s++) {
          let moved = null;
          for (let tt = 1; tt <= 4 && !moved; tt++) moved = step(tr, tt, tu);
          if (!moved) break;
          steps.push(moved);
          br = broken(tr);
        }
        if (br) yield { t, marks: [[...pos(x, c), -1]], steps, br };
      }
    }
  }
  // the grader's step: the first application that changes something, applied whole; returns it with its first new mark (m)
  function step(g, t, used) {
    for (const ap of apps(g, t, used)) {
      let first = null;
      for (const m of ap.marks) if (get(g, ...m.slice(0, 4)) != m[4] && !first) first = m;
      let ch = false;
      for (const m of ap.marks) ch = mark(g, ...m.slice(0, 5)) || ch;
      if (ch) return Object.assign(ap, { m: first || ap.marks[0] });
    }
    return null;
  }
  // the first new mark technique t can make (nothing is changed)
  function find(g, t) {
    for (const ap of apps(g, t, null)) for (const m of ap.marks) if (get(g, ...m.slice(0, 4)) != m[4]) return Object.assign(ap, { m });
    return null;
  }

  /* ---------- the child's state ---------- */
  const val = (st, c) => (st.v[c] == '1' ? 1 : st.v[c] == '2' ? -1 : 0);
  function fresh(p) {
    const N = ctx(p).N;
    return { v: '0'.repeat(N), a: '0'.repeat(N), h: [], miss: 0, u: [], hn: [], seen: [], ac: 1, hu: 0, tab: 0 };
  }
  function fit(p, st) {
    const x = ctx(p), N = x.N, int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi, sq = a => Array.isArray(a) && a.every(c => int(c, 0, N - 1));
    if (!st || typeof st != 'object' || typeof st.v != 'string' || typeof st.a != 'string' || st.v.length != N || st.a.length != N) return false;
    if (!/^[012]*$/.test(st.v) || !/^[01]*$/.test(st.a) || !int(st.miss, 0, 1e6) || !sq(st.hn) || !sq(st.seen)) return false;
    if (!Array.isArray(st.u) || !st.u.every(q => int(q, 0, p.cl.length - 1)) || !int(st.ac, 0, 1) || !int(st.hu, 0, 1) || !int(st.tab, 0, x.B.length - 1)) return false;
    return Array.isArray(st.h) && st.h.every(s => Array.isArray(s) && s.length && s.every(e => Array.isArray(e) && e.length == 3 && int(e[0], 0, N - 1) &&
      /^[012]$/.test(e[1]) && /^[01]$/.test(e[2])));
  }
  function setC(st, c, v, a, step) {
    if (step) step.push([c, st.v[c], st.a[c]]);
    st.v = st.v.slice(0, c) + v + st.v.slice(c + 1);
    st.a = st.a.slice(0, c) + a + st.a.slice(c + 1);
  }
  const lines2 = (x, c) => [lineOf(x, c, 1), lineOf(x, c, 0)];
  // a tick in: auto-cross the open squares of its row and column
  function tickIn(p, st, c, step) {
    const x = ctx(p);
    setC(st, c, '1', '0', step);
    if (st.ac) for (const L of lines2(x, c)) for (const q of L.cells) if (q != c && st.v[q] == '0') setC(st, q, '2', '1', step);
  }
  // a tick out: the crosses it put in go too, unless another tick in their line still needs them
  function tickOut(p, st, c, step) {
    const x = ctx(p);
    setC(st, c, '0', '0', step);
    for (const L of lines2(x, c)) for (const q of L.cells) {
      if (st.a[q] != '1' || st.hn.includes(q)) continue;
      if (lines2(x, q).some(M => M.cells.some(r => st.v[r] == '1'))) continue;
      setC(st, q, '0', '0', step);
    }
  }
  const pushStep = (st, s) => { if (s.length) { st.h.push(s); if (st.h.length > 60) st.h.shift(); } };
  const won = (p, st) => { const x = ctx(p); return range(x.N).every(c => (val(st, c) == 1) == (solv(x, c) == 1)); };
  // a tap on square c: blank -> cross -> tick -> blank. {ign} or {ok, now, won}
  function tap(p, st, c) {
    if (st.hn.includes(c)) return { ign: 'hint' };
    const s = [], cur = st.v[c];
    if (cur == '0') setC(st, c, '2', '0', s);
    else if (cur == '2') tickIn(p, st, c, s);
    else tickOut(p, st, c, s);
    pushStep(st, s);
    return { ok: true, now: st.v[c], won: won(p, st) };
  }
  function undo(p, st) {
    const s = st.h.pop();
    if (!s) return null;
    for (let i = s.length - 1; i >= 0; i--) if (!st.hn.includes(s[i][0])) setC(st, s[i][0], s[i][1], s[i][2]);
    return s[0][0];
  }
  // Check: the marks that are not right; the new ones count as mistakes
  function check(p, st) {
    const x = ctx(p), bad = range(x.N).filter(c => val(st, c) && val(st, c) != solv(x, c)), add = bad.filter(c => !st.seen.includes(c));
    st.miss += add.length;
    st.seen = st.seen.concat(add);
    return { bad, add: add.length };
  }
  // a hint's mark goes in and locks (no tap or undo takes it)
  function place(p, st, c, v) {
    const s = [];
    if (st.v[c] == '1' && v < 0) tickOut(p, st, c, s);
    if (v > 0) tickIn(p, st, c, s); else setC(st, c, '2', '0', s);
    if (!st.hn.includes(c)) st.hn.push(c);
    st.h = st.h.filter(e => !e.some(q => q[0] == c));
  }

  /* ---------- what the child can see is wrong: Map square -> why ---------- */
  function conflicts(p, st) {
    const x = ctx(p), out = new Map(), add = (c, w) => { if (!out.has(c)) out.set(c, w); }, V = c => val(st, c);
    for (const L of x.lines) {
      const t = L.cells.filter(c => V(c) > 0);
      if (t.length > 1) t.forEach(c => add(c, { k: 'two', L }));
      if (L.cells.every(c => V(c) < 0)) L.cells.forEach(c => add(c, { k: 'empty', L }));
    }
    const ordOf = e => range(x.n).find(k => V(at(x, ...e, x.O, k)) > 0);
    for (const q of x.cl) {
      if (q.k == 'is' || q.k == 'not') {
        const c = at(x, ...q.a, ...q.b);
        if (V(c) == (q.k == 'is' ? -1 : 1)) add(c, { k: 'clue', q });
      } else if (q.k == 'or') {
        for (let k = 0; k < x.n; k++) if (!q.j.includes(k) && V(at(x, ...q.a, q.d, k)) > 0) add(at(x, ...q.a, q.d, k), { k: 'clue', q });
        const cs = q.j.map(k => at(x, ...q.a, q.d, k));
        if (cs.every(c => V(c) < 0)) cs.forEach(c => add(c, { k: 'clue', q }));
      } else {
        if (q.a[0] != q.b[0] && V(at(x, ...q.a, ...q.b)) > 0) add(at(x, ...q.a, ...q.b), { k: 'clue', q });
        const u = ordOf(q.a), w = ordOf(q.b);
        if (u != null && w != null && !REL[q.k](u, w)) [at(x, ...q.a, x.O, u), at(x, ...q.b, x.O, w)].forEach(c => add(c, { k: 'clue', q }));
      }
    }
    for (let c = 0; c < x.N; c++) {
      if (V(c) != 1) continue;
      const [a, i, b, j] = pos(x, c);
      for (let d = 0; d <= x.K; d++) {
        if (d == a || d == b) continue;
        for (let k = 0; k < x.n; k++) {
          const c1 = at(x, a, i, d, k), c2 = at(x, b, j, d, k);
          if (V(c1) && V(c2) && V(c1) != V(c2)) { add(c1, { k: 'link', tick: c }); add(c2, { k: 'link', tick: c }); }
        }
      }
    }
    return out;
  }
  const pair = (p, c) => { const [a, i, b, j] = pos(ctx(p), c); return lab(p, a, i) + ' and ' + lab(p, b, j); };
  const mfact = (p, m, v) => fact(p, [m[0], m[1]], [m[2], m[3]], (v == null ? m[4] : v) < 0); // a mark as a sentence
  const cfact = (p, c, v) => mfact(p, pos(ctx(p), c), v);
  function why(p, w) { // a conflict in words
    const x = ctx(p);
    if (w.k == 'clue') return `That does not fit clue ${w.q.qi + 1}: ${w.q.t}`;
    if (w.k == 'link') return `That does not fit your tick for ${pair(p, w.tick)}: ${cfact(p, w.tick, 1)}.`;
    const e = lineEnt(x, w.L), d = lineCross(x, w.L), where = `the ${rowcol(x, w.L)} for ${lab(p, ...e)}`;
    if (w.k == 'empty') return `Every square in ${where} is crossed. One of them needs a tick.`;
    return `Two ticks in ${where}. ` + (d ? `${cap(ref(p, e))} has just one ${noun(p, d)}.` : `Only one child ${vp(p, e)}.`);
  }

  /* ---------- hints: the next mark a child can make, and why ---------- */
  const mk = v => (v > 0 ? 'a tick' : 'a cross');
  const say3 = (p, c, v) => `${cap(mk(v))} for ${pair(p, c)}.`;
  // {kind, cell, v, q (clue index or -1), line (squares tier 1 shades), also (squares tier 2 rings besides the cell), say1, say2, say3}
  function nextStep(p, st) {
    const x = ctx(p);
    if (won(p, st)) return null;
    const base = (kind, cell, v, o) => Object.assign({ kind, cell, v, q: -1, line: [], also: [], say3: say3(p, cell, v) }, o);
    // 1. a mark that is not right (one the child can see clashing first)
    const wrong = range(x.N).filter(c => val(st, c) && val(st, c) != solv(x, c));
    if (wrong.length) {
      const cf = conflicts(p, st), c = wrong.find(q => cf.has(q)) ?? wrong[0];
      return base('wrong', c, solv(x, c), { line: lineOf(x, c, 1).cells,
        say1: 'One mark in the yellow line is not right yet.', say2: `This ${val(st, c) > 0 ? 'tick' : 'cross'} is not right: ${cfact(p, c, solv(x, c))}.` });
    }
    const g = gnew(x, Int8Array.from(range(x.N), c => val(st, c)));
    // 2. auto-cross off: the rest of a tick's lines
    for (let c = 0; c < x.N; c++) {
      if (g.m[c] != 1) continue;
      const q = lines2(x, c).flatMap(L => L.cells).find(r => !g.m[r]);
      if (q != null) return base('line', q, -1, { line: [c], also: [c], say1: `Look at your tick for ${pair(p, c)}.`,
        say2: `${cfact(p, c, 1)}, so ${lcf(cfact(p, q, -1))}.` });
    }
    // 3. the grader's techniques, easiest first
    for (let t = 1; t <= 5; t++) {
      const r = find(g, t);
      if (!r) continue;
      const m = r.m, cell = at(x, ...m.slice(0, 4)), v = m[4];
      if (t == 1) {
        return base('clue', cell, v, { q: r.q.qi, say1: `Look at clue ${r.q.qi + 1}: ${r.q.t}`,
          say2: `Clue ${r.q.qi + 1} says: ${r.q.t} So put ${mk(v)} for ${pair(p, cell)}.` });
      }
      if (t == 2) {
        const e = lineEnt(x, r.L);
        return base('only', cell, v, { line: r.L.cells, say1: `Look at the ${rowcol(x, r.L)} for ${lab(p, ...e)}.`,
          say2: `Every other ${noun(p, lineCross(x, r.L))} is crossed out for ${ref(p, e)}, so ${lcf(mfact(p, m))}.` });
      }
      if (t == 3) {
        const tick = at(x, ...r.tick), src = m[5];
        return base('link', cell, v, { line: [tick], also: [tick, at(x, ...src.slice(0, 4))], say1: `Look at the tick for ${pair(p, tick)}.`,
          say2: `${cfact(p, tick, 1)}. ${mfact(p, src)}, so ${lcf(mfact(p, m))}${v > 0 ? ' too' : ' either'}.` });
      }
      if (t == 4) {
        const q = r.q, w = m[5], pre = `Clue ${q.qi + 1} says: ${q.t} `;
        let s2;
        if (w == 'or') s2 = `${pre}So ${lcf(mfact(p, m))}.`;
        else if (w == 'diff') s2 = `Clue ${q.qi + 1} is about two different children, so ${lcf(mfact(p, m))}.`;
        else {
          const other = w[0] == 'a' ? q.b : q.a, cat = catOf(p, x.O), objs = w[1].map(k => verb(cat, wordOf(p, x.O, k))[2]);
          s2 = w[1].length == x.n ? `${pre}So ${ref(p, [m[0], m[1]])} cannot be ${EXT[cat][m[3] ? 1 : 0]}: ${lcf(mfact(p, m))}.`
            : `${pre}${cap(ref(p, other))} can only ${BASE[cat]} ${list(objs)}, so ${lcf(mfact(p, m))}.`;
        }
        return base('two-way', cell, v, { q: q.qi, say1: `Look at clue ${q.qi + 1} again: ${q.t}`, say2: s2 });
      }
      // 5. a what-if that breaks
      const then = r.steps.map(s => lcf(mfact(p, s.m)) + (s.q ? ` (clue ${s.q.qi + 1})` : '')), br = r.br;
      let end = 'that breaks a rule';
      if (br.L) {
        const e = lineEnt(x, br.L), d = lineCross(x, br.L);
        end = br.why == 'two' ? `two ticks would be in the ${rowcol(x, br.L)} for ${lab(p, ...e)}`
          : d ? `${ref(p, e)} would have no ${noun(p, d)} left` : `nobody would be left for ${lab(p, ...e)}`;
      }
      return base('chain', cell, v, { line: [cell], say1: `Look at the square for ${pair(p, cell)}. What if it had a tick?`,
        say2: `What if ${lcf(cfact(p, cell, 1))}? Then ${then.concat(end).join(', and ')}. That cannot be, so ${lcf(cfact(p, cell, -1))}.` });
    }
    // 4. never stuck (never needed by the bank: tools/test.js)
    const c = range(x.N).find(q => !g.m[q]);
    return base('guess', c, solv(x, c), { line: [c], say1: 'Try this square.', say2: 'Read the clues about this square again.' });
  }
  // hint(p, st, tier): {tier, kind, cell, v, q, line, mark, say, put ([cell, v] on tier 3)}; null when solved. Pure.
  function hint(p, st, tier) {
    const s = nextStep(p, st);
    if (!s) return null;
    const t = Math.max(1, Math.min(3, tier | 0));
    return { tier: t, kind: s.kind, cell: s.cell, v: s.v, q: t < 3 ? s.q : -1, line: t == 1 ? s.line : [], mark: t == 2 ? [s.cell].concat(s.also) : [],
      say: t == 1 ? s.say1 : t == 2 ? s.say2 : s.say3, put: t == 3 ? [s.cell, s.v] : null };
  }
  // the moves that win: the squares to tick, in the order the hints find them
  function solve(p) {
    const st = fresh(p), out = [];
    for (let i = 0; i < 400 && !won(p, st); i++) {
      const s = nextStep(p, st);
      place(p, st, s.cell, s.v);
      if (s.v > 0) out.push(s.cell);
    }
    return out;
  }
  // the answer in words: "Raj eats the cupcake and is 7."
  const summary = p => range(p.n).map(kid => p.names[kid] + ' ' + p.sol.map((s, c) => vp(p, [c + 1, s[kid]])).join(' and ') + '.');

  /* ---------- the screen ---------- */
  function mount(el, p, api) {
    const x = ctx(p), n = p.n, K = p.K, N = x.N, B = p.b == 'B', cats = PUZ.logic.cats;
    let st = api.loadState();
    if (!fit(p, st)) st = fresh(p);
    const timers = [];
    let marks = { line: [], cell: [], q: -1 }, msg = '', done = false, view = '', flash = [], sel = -1, pend = -1, pt = 0;
    // views of a two-category grid: all three blocks; the children's two blocks + the third (tabs); one block a tab
    const GROUPS = { full: [[0, 1, 2]], pair: [[0, 1], [2]], one: [[0], [1], [2]] };
    const group = () => (K == 1 ? [0] : GROUPS[view].find(g => g.includes(st.tab)));
    // a picture, a colour swatch, or the number for an item; c = 0 is a child's name
    function face(c, i, row) {
      if (!c) return `<b class="lg-nm">${esc(p.names[i])}</b>`;
      const cat = catOf(p, c), w = wordOf(p, c, i), pics = (cats[cat] || {}).pics;
      if (pics && pics[w]) return `<span class="lg-pic">${picFor(w, pics[w])}</span>`;
      if (cat == 'colour') return `<span class="lg-col"><i style="background:var(--ill-${esc(w)})"></i><small>${esc(w)}</small></span>`;
      if (cat == 'house') return `<span class="lg-num">${ico('home', 16)}${esc(w)}</span>`;
      if (cat == 'race') return `<span class="lg-num">${ORD[i]}</span>`;
      return `<span class="lg-num">${row ? '<small>Age</small>' : ''}${esc(w)}</span>`;
    }
    const aria = (c, i) => (c ? wordOf(p, c, i) : p.names[i]);
    const cats2 = K == 1 ? `${noun(p, 1)}` : `${noun(p, 1)} and ${noun(p, 2)}`;
    const intro = `Find each child's ${cats2}. Tap a square once for a cross (no), twice for a tick (yes).`;

    // clue cards: band B draws child + picture + tick or cross, every band has the sentence and a speak button
    const clueHTML = p.cl.map((q, qi) => {
      let pic = '';
      if (B) {
        const kid = q[1] ? q[4] : q[2], it = q[1] ? q[2] : q[4];
        pic = `<span class="lg-qp"><b class="lg-nm">${esc(p.names[kid])}</b>${face(1, it)}<i class="lg-qm ${q[0] == 'is' ? 'yes' : 'no'}">` +
          `${ico(q[0] == 'is' ? 'check' : 'close', 22)}</i></span>`;
      }
      return `<li class="lg-q" data-q="${qi}"><button class="lg-qb" data-q="${qi}" aria-pressed="false"><b class="lg-qn">${qi + 1}</b>` +
        `<span class="lg-qt">${pic}<span class="lg-qs">${esc(q[q.length - 1])}</span></span></button>` +
        `${UI.ibtn('speak', 'Read clue ' + (qi + 1), { size: 'sm', cls: 'lg-qsp', attrs: `data-s="${qi}"` })}</li>`;
    }).join('');
    const tools = UI.btn('Undo', { icon: 'undo', id: 'lgundo', size: 'sm' }) + UI.btn('Check', { icon: 'check-circle', id: 'lgcheck', size: 'sm' }) +
      (p.b == 'D' ? `<button class="btn soft sm lg-tb lg-ac" id="lgac" aria-label="Auto-cross" aria-pressed="true">${ico('close')}<span>Auto</span></button>` : '');
    const cl_ = c => cats[catOf(p, c)].label; // the grid's own category names ("Music", "Race")
    const tabName = g => (g.length == 2 ? 'Children' : g[0] < 2 ? cl_(x.B[g[0]][1]) : cl_(1) + ' + ' + cl_(2).toLowerCase());
    el.innerHTML = `<div class="lg lg-${p.b}" style="--n:${n}">` +
      `<div class="lg-say">${UI.ibtn('speak', 'Read it to me', { size: 'sm', cls: 'lg-spk' })}<p class="lg-msg" aria-live="polite"></p></div>` +
      `<div class="lg-board"><div class="lg-tabs" hidden></div><div class="lg-grid" role="group" aria-label="Logic grid"></div></div>` +
      `<div class="lg-tools">${tools}</div><ol class="lg-clues" aria-label="Clues">${clueHTML}</ol></div>`;
    const root = el.querySelector('.lg'), grid = root.querySelector('.lg-grid'), clues = root.querySelector('.lg-clues');
    const say_ = root.querySelector('.lg-say'), tabsEl = root.querySelector('.lg-tabs'), toolsEl = root.querySelector('.lg-tools');
    let cellEl = [];

    // the grid: column heads over each block, row heads left of each block row; block (1,2) is drawn turned (rows = 2nd category)
    function gridHTML() {
      const show = group();
      const blk = k => {
        const [a, b] = x.B[k];
        let h = '';
        for (let r = 0; r < n; r++) for (let q = 0; q < n; q++) {
          const c = a == 1 ? k * x.nn + q * n + r : k * x.nn + r * n + q;
          h += `<button class="lg-c" data-c="${c}"></button>`;
        }
        return `<div class="lg-blk" data-k="${k}">${h}</div>`;
      };
      const colsOf = k => x.B[k][a1(k)], rowsOf = k => x.B[k][1 - a1(k)];
      function a1(k) { return x.B[k][0] == 1 ? 0 : 1; } // which end of block k runs along the columns
      const hd = c => `<div class="lg-hd"><span class="lg-cat">${esc(cats[catOf(p, c)].label)}</span><span class="lg-hs">` +
        range(n).map(i => `<span class="lg-h" data-h="${c}-${i}" aria-label="${esc(aria(c, i))}">${face(c, i)}</span>`).join('') + '</span></div>';
      const rh = c => `<div class="lg-rhs">${range(n).map(i => `<span class="lg-h lg-r" data-h="${c}-${i}" aria-label="${esc(aria(c, i))}">${face(c, i, 1)}</span>`).join('')}</div>`;
      let h = '<i class="lg-corner"></i>';
      if (show.length == 1) return h + hd(colsOf(show[0])) + rh(rowsOf(show[0])) + blk(show[0]);
      if (show.length == 2) return h + hd(1) + hd(2) + rh(0) + blk(0) + blk(1);
      h += hd(1) + (K == 2 ? hd(2) : '') + rh(0) + blk(0) + (K == 2 ? blk(1) + rh(2) + blk(2) +
        `<div class="lg-key" aria-hidden="true"><span>${ico('close', 20)}</span>${ico('arrow-right', 16)}<span>${ico('check', 20)}</span></div>` : '');
      return h;
    }
    function buildGrid() {
      grid.innerHTML = gridHTML();
      const g = group();
      grid.className = 'lg-grid' + (g.length == 3 ? ' lg-g2' : g.length == 2 ? ' lg-gp' : '');
      tabsEl.hidden = K == 1 || view == 'full';
      if (!tabsEl.hidden) {
        tabsEl.innerHTML = UI.seg(GROUPS[view].map(gr => [gr[0], tabName(gr)]), g[0], { id: 'lgtabs', label: 'Part of the grid' });
        UI.segOn(tabsEl.firstChild, v => { st.tab = +v; SFX.click(); buildGrid(); store(); draw(); });
      }
      cellEl = [];
      grid.querySelectorAll('.lg-c').forEach(e => { cellEl[+e.dataset.c] = e; });
    }
    function tell(text, kind, speak) {
      msg = text;
      const m = root.querySelector('.lg-msg');
      m.textContent = text;
      m.className = 'lg-msg' + (kind ? ' ' + kind : '');
      if (speak) api.say(text);
    }
    root.querySelector('.lg-spk').onclick = () => { try { say(msg); } catch (e) {} };

    /* ---------- drawing ---------- */
    function draw() {
      const cf = conflicts(p, st), hs = new Set(), on = sel >= 0 ? pos(x, sel) : null;
      if (pend >= 0) cf.delete(pend);
      for (let c = 0; c < N; c++) {
        const e = cellEl[c];
        if (!e) continue;
        const v = st.v[c], [a, i, b, j] = pos(x, c);
        let cls = 'lg-c' + (v == '1' ? ' tk' : v == '2' ? ' cr' : '');
        if (st.hn.includes(c)) cls += ' hn';
        if (cf.has(c)) cls += ' cf';
        if (flash.includes(c)) cls += ' wr';
        if (marks.cell.includes(c)) cls += ' hl';
        else if (marks.line.includes(c)) cls += ' hh';
        if (c == sel) cls += ' sel';
        if (e.className != cls) e.className = cls;
        const html = (v == '1' ? ico('check') : v == '2' ? ico('close') : '') + (cf.has(c) ? `<span class="lg-wn">${ico('warning', 14)}</span>` : '');
        if (e._h !== html) { e.innerHTML = html; e._h = html; }
        e.setAttribute('aria-label', `${lab(p, a, i)} and ${lab(p, b, j)}: ${v == '1' ? 'tick' : v == '2' ? 'cross' : 'empty'}${cf.has(c) ? ', does not fit' : ''}`);
        if (on && c == sel) { hs.add(a + '-' + i); hs.add(b + '-' + j); }
      }
      grid.querySelectorAll('.lg-h').forEach(h => h.classList.toggle('on', hs.has(h.dataset.h)));
      clues.querySelectorAll('.lg-q').forEach(li => {
        const qi = +li.dataset.q, used = st.u.includes(qi), bad = [...cf.values()].some(w => w.q && w.q.qi == qi);
        li.className = 'lg-q' + (used ? ' used' : '') + (marks.q == qi ? ' hl' : '') + (bad ? ' cf' : '');
        li.querySelector('.lg-qb').setAttribute('aria-pressed', used ? 'true' : 'false');
      });
      const u = root.querySelector('#lgundo'), ac = root.querySelector('#lgac');
      u.disabled = !st.h.length || done;
      root.querySelector('#lgcheck').disabled = done;
      if (ac) { ac.setAttribute('aria-pressed', st.ac ? 'true' : 'false'); ac.classList.toggle('on', !!st.ac); }
      if (!tabsEl.hidden) tabsEl.querySelectorAll('button').forEach(b => {
        const gr = GROUPS[view].find(g => g[0] == +b.dataset.v);
        b.classList.toggle('lg-tcf', [...cf.keys()].some(c => gr.includes(Math.floor(c / x.nn))));
      });
    }

    /* ---------- layout: the grid is sized to the space left (section 8) ----------
       FR: the pieces the CSS adds around the squares (block padding 3 and square gap 2, head row height, gaps 6); must match the CSS. */
    const RH = B ? 76 : 52, MAX = B ? 92 : n == 3 ? 60 : 56, GAP = 6, MIN = 44;
    let lastW = 0, lastH = 0;
    const headH = cs => Math.max(44, Math.min(60, Math.round(cs * 0.75) + 16));
    // width and height of the grid at square size cs: across and down = blocks side by side and stacked; tabs adds the tab row
    function dims(cs, across, down, tabs) {
      const bw = n * cs + (n - 1) * 2 + 6;
      return { w: RH + across * (bw + GAP), h: headH(cs) + down * (bw + GAP) + (tabs ? 60 : 0) };
    }
    const fitCs = (w, h, a, d, t) => { let cs = MAX; while (cs > 30 && (dims(cs, a, d, t).w > w || dims(cs, a, d, t).h > h)) cs--; return cs; };
    function layout() {
      if (!el.isConnected) return;
      const ps = getComputedStyle(el);
      const aw = el.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
      const ah = el.clientHeight - parseFloat(ps.paddingTop) - parseFloat(ps.paddingBottom);
      lastW = aw; lastH = ah;
      const land = aw > ah * 1.15 && aw >= 640;
      root.classList.toggle('land', land);
      root.style.height = Math.max(320, ah) + 'px';
      // the talk line keeps two lines and the clue list at least about two clues (it scrolls; a long talk line takes from it)
      const w = land ? aw - 340 : aw, h = land ? ah : ah - 64 - toolsEl.offsetHeight - (B ? 3 * 60 : 140) - 3 * 12;
      let cs = fitCs(w, h, K, K, false), v = 'full';
      if (K == 2 && cs < MIN) { v = 'pair'; cs = fitCs(w, h, 2, 1, true); }
      if (K == 2 && cs < MIN) { v = 'one'; cs = fitCs(w, h, 1, 1, true); }
      if (v != view || !cellEl.length) { view = v; buildGrid(); }
      root.style.setProperty('--cs', cs + 'px');
      root.style.setProperty('--rh', RH + 'px');
      root.style.setProperty('--hh', headH(cs) + 'px');
      draw();
    }
    let rz = 0;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { if (el.clientWidth != lastW || el.clientHeight != lastH) layout(); }, 120); };
    window.addEventListener('resize', onResize);
    function showTab(c) {
      const k = Math.floor(c / x.nn);
      if (K == 1 || group().includes(k)) return;
      st.tab = k;
      buildGrid();
    }

    /* ---------- moves ---------- */
    const store = () => api.saveState(st);
    function finish() {
      done = true;
      marks = { line: [], cell: [], q: -1 };
      for (let c = 0; c < N; c++) if (st.v[c] == '0') setC(st, c, '2', '1');
      draw();
      root.classList.add('win');
      const sum = summary(p);
      tell('Solved! ' + sum.join(' '), 'good', B);
      api.win({ mistakes: st.miss, note: sum });
    }
    // what a mark breaks, in words (after the pause)
    function judge(c, quiet) {
      if (done) return;
      draw();
      const cf = conflicts(p, st);
      if (cf.has(c)) { if (!quiet) SFX.rattle(); tell(why(p, cf.get(c)), 'try'); }
    }
    function tapNow(c, before) {
      const r = tap(p, st, c);
      sel = c;
      if (r.ign) { draw(); return tell('A hint put that mark there. It stays.', 'try'); }
      marks = { line: [], cell: [], q: -1 };
      flash = [];
      store();
      draw();
      if (r.won) return finish();
      const cf = conflicts(p, st);
      if (pend == c) cf.delete(c);
      if (cf.has(c) || cf.size > before) {
        SFX.rattle();
        return tell(why(p, cf.get(c) || [...cf.values()][0]), 'try');
      }
      r.now == '1' ? SFX.pop(1) : SFX.click();
      const ticks = (st.v.match(/1/g) || []).length;
      if (ticks >= x.B.length * n) return tell('Every line has a tick, but something is not right yet. Tap Check, or ask for a hint.', 'try');
      if (msg && /does not fit|Two ticks|Every square/.test(msg) && !cf.size) tell('That fits again. Keep going!', '');
    }
    // a cross on its way to a tick (blank -> cross -> tick) is judged only when the child stops on it
    function tapCell(c) {
      if (done || c == null || !(c >= 0 && c < N)) return;
      clearTimeout(pt);
      const was = pend;
      pend = -1;
      if (was >= 0 && was != c) judge(was, true);
      const before = conflicts(p, st).size;
      if (st.v[c] == '0' && !st.hn.includes(c)) {
        pend = c;
        pt = setTimeout(() => { pend = -1; judge(c, false); }, 900);
      }
      tapNow(c, before);
    }
    grid.onclick = e => { const b = e.target.closest('.lg-c'); if (b) tapCell(+b.dataset.c); };
    clues.onclick = e => {
      const s = e.target.closest('[data-s]');
      if (s) { try { say(p.cl[+s.dataset.s].slice(-1)[0]); } catch (er) {} return; }
      const b = e.target.closest('.lg-qb');
      if (!b || done) return;
      const qi = +b.dataset.q;
      st.u = st.u.includes(qi) ? st.u.filter(q => q != qi) : st.u.concat(qi);
      SFX.click();
      store();
      draw();
    };
    root.querySelector('#lgundo').onclick = () => {
      if (done) return;
      const c = undo(p, st);
      if (c == null) return;
      SFX.whoosh();
      sel = c;
      flash = [];
      showTab(c);
      store();
      draw();
      tell(conflicts(p, st).size ? 'Undone. Some marks still do not fit: the amber squares.' : 'Undone.', '');
    };
    root.querySelector('#lgcheck').onclick = () => {
      if (done) return;
      const r = check(p, st);
      store();
      if (!r.bad.length) {
        SFX.right();
        flash = [];
        draw();
        return tell(/[12]/.test(st.v) ? 'Every mark so far is right. Keep going!' : 'Put some marks in first, then check.', 'good');
      }
      SFX.wrong();
      // the wrong marks are shown only after a hint (5.3)
      flash = st.hu ? r.bad : [];
      if (st.hu) showTab(r.bad[0]);
      draw();
      const many = r.bad.length == 1 ? 'One mark is' : r.bad.length + ' marks are';
      tell(`${many} not right yet.` + (st.hu ? ' They have an amber ring.' : ' Look again, or ask for a hint.'), 'try');
    };
    const acB = root.querySelector('#lgac');
    if (acB) acB.onclick = () => {
      if (done) return;
      st.ac = st.ac ? 0 : 1;
      SFX.click();
      store();
      draw();
      tell(st.ac ? 'Auto-cross is on: a tick crosses the rest of its row and column.' : 'Auto-cross is off: put every cross in yourself.', '');
    };

    /* ---------- start ---------- */
    const isNew = !/[12]/.test(st.v);
    tell(isNew ? intro : 'Keep going! Tap a square: once for a cross, twice for a tick.', '', isNew && B);
    layout();
    timers.push(setTimeout(layout, 60)); // the stage can still be settling (fonts, the frame's top bar)
    return {
      hint(tier) {
        if (done) return false;
        const h = hint(p, st, tier);
        if (!h) return false;
        st.hu = 1;
        flash = [];
        marks = { line: h.line, cell: h.mark, q: h.q };
        if (h.line.length || h.mark.length || h.put) showTab(h.put ? h.put[0] : (h.mark[0] ?? h.line[0]));
        if (h.put) {
          place(p, st, h.put[0], h.put[1]);
          sel = h.put[0];
          marks = { line: [], cell: [h.put[0]], q: -1 };
        }
        store();
        draw();
        const li = h.q >= 0 && clues.querySelector(`.lg-q[data-q="${h.q}"]`);
        if (li && li.scrollIntoView) li.scrollIntoView({ block: 'nearest' });
        tell(h.say, 'hint', true);
        if (h.put && won(p, st)) finish();
        return true;
      },
      destroy() {
        timers.forEach(clearTimeout);
        clearTimeout(rz);
        clearTimeout(pt);
        window.removeEventListener('resize', onResize);
      },
    };
  }

  return { NAMES, decode, build, make, pickNames, ctx, at, pos, solv, fresh, fit, tap, undo, check, place, won, conflicts, why, nextStep, hint,
    solve, summary, fact, sent, mount };
})();

BT.reg({
  id: 'logic', name: 'Logic', icon: 'logic', bands: 'BCD',
  rules: 'Read the clues. Tick who has what, and cross what cannot be.',
  make: (band, level, rnd) => LG.make(band, level, rnd),
  mount: (el, p, api) => LG.mount(el, p, api),
  solve: p => LG.solve(p),
});

var BT_VER='v111'; // last line: the whole file ran (checked by dataReady() before the app starts)
