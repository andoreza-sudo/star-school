/* Star School games v153. BUILT by tools/build.py from 48-game-hub.css, 60-game-blocks.css, 59-game-hub.js, 60-blocks.js, 62-hill.js, 64-gtimer.js, 66-colornum.js, 68-lowpoly.js, 70-art.js, 72-shapes.js: never edit by hand.
   index.html v153 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v153.js. */
(function(){var s=document.createElement('style');s.id='css-games';s.textContent="/* Game Room hub and shared game chrome (P4-16; src/js/59-game-hub.js; DESIGN_SYSTEM.md 9 row 8). Ships in games.<VER>.js (A11b),\n   after index.html's own CSS. Tokens only; motion is transform/opacity. The hub: a fair scene with the game-time ticket, a drawn\n   card per registered game, how to earn more. Every game screen: one top bar .gh-top (back or pause, badge and name, tools, chips,\n   the time chip, sound), the pause sheet .gh-sheet and the end card .gh-end. Game canvases are not restyled. */\n\n/* ---- the hub ---- */\n.gh-room{display:flex;flex-direction:column;flex:1;min-height:0}\n.gh-scroll{padding:var(--s-1) var(--s-4) var(--s-7)}\n.gh-hero{position:relative;height:220px;max-width:1040px;margin:0 auto var(--s-5);border-radius:var(--r-hero);overflow:hidden;\n  background:linear-gradient(var(--sc-sky-1),var(--sc-sky) 62%,var(--sc-green) 63%);box-shadow:inset 0 0 0 2px var(--wash),0 5px 0 var(--sc-green-2)}\n.gh-scene{position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none}\n.gh-tk{position:absolute;left:50%;bottom:14px;width:min(300px,82%);aspect-ratio:300/104;transform:translateX(-50%)}\n.gh-tks{position:absolute;inset:0;display:block;width:100%;height:100%}\n.gh-tkt{position:absolute;left:34%;right:5%;top:13%;bottom:18%;display:flex;flex-direction:column;align-items:center;justify-content:center;\n  text-align:center;line-height:1;color:var(--ink)}\n.gh-tkt b{font-family:var(--font-display);font-size:var(--fs-7);font-weight:700;font-variant-numeric:tabular-nums;letter-spacing:.01em}\n.gh-tkt span{margin-top:var(--s-1);font-size:var(--fs-2);font-weight:700;color:var(--ink-2);white-space:nowrap}\n.gh-hero.off .gh-tkt b{color:var(--ink-3)}\n.gh-why{display:flex;flex-direction:column;align-items:center;gap:var(--s-3);margin:0 auto var(--s-6);text-align:center}\n.gh-why .btn.lg{padding-left:var(--s-5);padding-right:var(--s-5)}\n@media (max-width:480px){.gh-why .btn.lg{font-size:var(--fs-4)}}\n.gh-why.on{margin-bottom:var(--s-4)}\n.gh-why p{max-width:34ch;margin:0;font-size:var(--fs-3);font-weight:700;line-height:1.35;color:var(--ink-2)}\n\n/* a card per game: the drawn picture on its backdrop, the name and one line, the play disc */\n.gh-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,272px),1fr));gap:var(--s-5);max-width:1040px;margin:0 auto}\n.gh-card{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:var(--s-3);\n  padding:var(--s-3) var(--s-3) var(--s-4);border:0;border-radius:var(--r-hero);background:var(--surface);color:var(--ink);font:inherit;\n  text-align:left;cursor:pointer;touch-action:manipulation;box-shadow:inset 0 0 0 2px var(--line),0 6px 0 var(--ledge-soft),0 12px 18px var(--drop);\n  transition:transform var(--t-fast) var(--ease)}\n.gh-card:active,.gh-card.is-press{transform:translateY(4px)}\n.gh-card{--c-fill:var(--c);--c-ledge:var(--c-shade)}\n.gh-card.s-play{--c-fill:var(--play-shade);--c-ledge:var(--play-deep)}\n.gh-pic{position:relative;grid-column:1/-1;display:block;height:150px;border-radius:var(--r-card);overflow:hidden;\n  background:linear-gradient(var(--gh-a),var(--gh-b));box-shadow:inset 0 -4px 0 var(--shadow-ink)}\n.gh-art{display:block;width:100%;height:100%}\n.gh-info{min-width:0;padding:0 0 0 var(--s-2)}\n.gh-name{display:block;font-family:var(--font-display);font-size:var(--fs-5);font-weight:700;line-height:1.15;color:var(--ink)}\n.gh-sub{display:flex;flex-wrap:wrap;gap:2px var(--s-3);margin-top:var(--s-1);font-size:var(--fs-2);line-height:1.35;color:var(--ink-2)}\n.gh-sub>span{display:inline-flex;align-items:center;gap:var(--s-1)}\n.gh-sub b{color:var(--ink)}\n.gh-sub .ic{flex:none;color:var(--star-shade)}\n.gh-go{display:grid;place-items:center;width:64px;height:64px;margin-right:var(--s-1);border-radius:50%;color:var(--surface);\n  background:linear-gradient(var(--hi),var(--hi-0) 60%) var(--c-fill,var(--c));box-shadow:inset 0 2px 0 var(--hi),0 5px 0 var(--c-ledge,var(--c-shade))}\n.gh-go .ic{width:30px;height:30px;margin-left:3px}\n.gh-flag{position:absolute;left:var(--s-3);bottom:var(--s-3);display:inline-flex;align-items:center;gap:var(--s-1);padding:var(--s-1) var(--s-3) var(--s-1) var(--s-2);\n  border-radius:var(--r-pill);background:var(--surface);color:var(--ink);font-size:var(--fs-2);font-weight:700;line-height:1.2;\n  box-shadow:0 3px 0 var(--ledge-soft)}\n.gh-flag .ic{flex:none;color:var(--play)}\n.gh-card:is(.need,.lock) .gh-pic::after{content:'';position:absolute;inset:0;background:var(--wash)}\n.gh-card:is(.need,.lock) .gh-flag{z-index:1}\n.gh-card:is(.need,.lock) .gh-go{background:var(--surface-2);color:var(--ink-3);box-shadow:inset 0 0 0 2px var(--line),0 5px 0 var(--ledge-soft)}\n.gh-card.lock{cursor:default}\n.gh-card.lock .gh-go .ic{margin-left:0}\n\n/* how to earn more game time */\n.gh-earn{max-width:1040px;margin:var(--s-7) auto 0;padding:var(--s-5);border-radius:var(--r-card);background:var(--surface);\n  box-shadow:inset 0 0 0 2px var(--line),0 5px 0 var(--ledge-soft)}\n.gh-earn h2{display:flex;align-items:center;gap:var(--s-2);margin:0 0 var(--s-4);font-family:var(--font-display);font-size:var(--fs-4);line-height:1.2;color:var(--ink)}\n.gh-earn h2 .ic{flex:none;color:var(--play);--ic2:var(--surface)}\n.gh-earn ul{display:grid;gap:var(--s-2) var(--s-6);margin:0;padding:0;list-style:none}\n.gh-earn li{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:var(--s-3);font-size:var(--fs-3);line-height:1.3;color:var(--ink)}\n.gh-ei{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--play-tint);color:var(--play-shade);--ic2:var(--play-tint)}\n.gh-earn li b{color:var(--play-shade);text-align:right}\n.gh-earn p{margin:var(--s-4) 0 0;font-size:var(--fs-2);line-height:1.4;color:var(--ink-2)}\n@media (min-width:860px){.gh-earn ul{grid-template-columns:1fr 1fr}}\n\n/* ---- the shared top bar ---- */\n.gh-top .gh-ttl{display:flex;align-items:center;gap:var(--s-2)}\n.gh-tb{flex:none;display:grid;place-items:center;width:44px;height:44px;border-radius:14px;color:var(--surface);\n  background:linear-gradient(var(--hi),var(--hi-0) 60%) var(--c);box-shadow:inset 0 -3px 0 var(--c-shade)}\n.gh-tb .ic{width:26px;height:26px}\n.gh-tt{display:flex;flex-direction:column;min-width:0;line-height:1.15}\n.gh-gn,.gh-gs{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.gh-tt.two .gh-gn{font-size:var(--fs-2);color:var(--c-shade)}\n.gh-tt.two .gh-gs{font-size:var(--fs-4);color:var(--ink)}\n.gh-tools{display:flex;flex:none;gap:var(--s-2)}\n.gh-top .btn.icon.on{background:var(--brand-tint);box-shadow:inset 0 0 0 2px var(--brand),0 4px 0 var(--brand-shade)}\n.gh-top #gpause .ic{color:var(--c-shade)}\n.gh-top .stat.gh-up{background:var(--try-tint);color:var(--try-ink);box-shadow:inset 0 0 0 2px var(--try),0 3px 0 var(--try)}\n.gh-top .stat.gh-up .ic{color:var(--try-ink);--ic2:var(--try-tint)}\n.gh-top .stat.gh-st .ic{color:var(--c-shade)}\n.gh-top .stat.gh-nut .ic{color:var(--star-shade);--ic2:var(--star-tint)}\n@media (max-width:480px){\n  .gh-tb{width:40px;height:40px;border-radius:12px}.gh-tb .ic{width:24px;height:24px}\n  .gh-top.gh-wrap{flex-wrap:wrap}.gh-wrap .gh-tools{order:9;flex-basis:100%;justify-content:flex-end}\n  .gh-top:not(.gh-mtop):not(.gh-hud) .gh-tb{display:none}\n  .gh-tt.two .gh-gs{font-size:var(--fs-3)}\n}\n/* over a full-screen canvas (Hill Climb): no paper behind; the name shows where there is room */\n.gh-top.gh-hud{position:absolute;left:0;right:0;top:0;z-index:2;min-height:0;padding:var(--s-2) var(--s-3);background:none}\n.gh-hud .gh-ttl{flex:0 1 auto;padding:var(--s-1) var(--s-3) var(--s-1) var(--s-1);border-radius:var(--r-pill);background:var(--surface);\n  box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.gh-hud .gh-ttl .gh-gn{font-size:var(--fs-4)}\n.gh-hud .hcfuel{flex:1;min-width:56px;max-width:240px}\n.gh-hud .hcfuel .ic{flex:none;width:26px;height:26px;color:var(--surface)}\n.gh-hud~.hcprog{top:70px}\n.gh-hud .stat{flex:none;min-height:44px;padding:0 var(--s-3) 0 var(--s-1);font-size:var(--fs-3)}\n.gh-hud .stat .ic{width:28px;height:28px}\n.gh-hud .stat.gh-dist{flex:0 1 auto;min-width:0;padding-left:var(--s-3)}\n.gh-hud .gh-dist b{overflow:hidden;text-overflow:ellipsis}\n@media (max-width:719px){.gh-hud .gh-ttl{display:none}}\n@media (max-width:480px){.gh-top.gh-hud{gap:var(--s-1);padding:var(--s-2)}.gh-hud .stat{padding:0 var(--s-2) 0 2px}.gh-hud .stat .ic{width:24px;height:24px}\n  .gh-hud .hcfuel{min-width:40px}}\n\n/* ---- the pause sheet ---- */\n.gh-sheet{text-align:center}\n.gh-spic{position:relative;height:128px;margin:0 0 var(--s-4);border-radius:var(--r-card);overflow:hidden;background:linear-gradient(var(--gh-a),var(--gh-b))}\n.gh-sheet .gh-acts{display:flex;flex-direction:column;gap:var(--s-3)}\n@media (max-height:520px){.gh-spic{height:84px;margin-bottom:var(--s-2)}.sheet .gh-sheet p{margin-bottom:var(--s-3)}}\n\n/* ---- the end card ---- */\n.ovl.gh-ovl{z-index:65}\n.gh-end{max-width:480px;padding:var(--s-5);overflow-y:auto;overscroll-behavior:contain}\n.gh-epic{position:relative;height:clamp(88px,20vh,140px);border-radius:var(--r-card);overflow:hidden;background:linear-gradient(var(--gh-a),var(--gh-b));\n  box-shadow:inset 0 -4px 0 var(--shadow-ink)}\n.gh-epic.made{display:grid;place-items:center;height:clamp(120px,26vh,200px);background:var(--surface-2)}\n.gh-epic.made>*{width:auto;height:88%;max-width:88%;aspect-ratio:1;border-radius:var(--r-btn);background:var(--surface);\n  box-shadow:0 4px 0 var(--ledge-soft)}\n.gh-epic.made img{image-rendering:pixelated}\n.gh-end .rw-rays{top:-40px}\n.rw-card p.gh-ename{position:relative;margin:var(--s-3) 0 0;font-size:var(--fs-2);font-weight:700;color:var(--c-shade)}\n.rw-card.gh-end h1{margin-top:0}\n.gh-estars{position:relative;margin:0 0 var(--s-2)}\n.rw-card p.gh-etag{position:relative;margin:0 0 var(--s-2)}\n.gh-stats{position:relative;display:grid;grid-template-columns:repeat(var(--n,3),minmax(0,1fr));gap:var(--s-2);margin:var(--s-2) 0 var(--s-3)}\n.gh-stat{display:flex;flex-direction:column;align-items:center;gap:2px;padding:var(--s-2) var(--s-1);border-radius:var(--r-btn);background:var(--surface-2)}\n.gh-stat .ic{color:var(--c-shade)}\n.gh-stat .ic.ic-coin{color:var(--star-shade);--ic2:var(--star-tint)}\n.gh-stat b{font-family:var(--font-display);font-size:var(--fs-4);line-height:1.1;color:var(--ink);font-variant-numeric:tabular-nums}\n.gh-stat span{font-size:var(--fs-2);line-height:1.2;color:var(--ink-2)}\n.gh-extra{position:relative;margin:var(--s-2) 0 var(--s-3)}\n.rw-card p.gh-line{position:relative;display:flex;align-items:center;justify-content:center;gap:var(--s-2);margin:var(--s-2) 0 0;\n  font-size:var(--fs-3);font-weight:700;line-height:1.3;color:var(--ink);text-align:left}\n.gh-line .ic{flex:none;color:var(--c-shade)}\n.gh-end .gh-acts{position:relative;display:flex;flex-direction:column;gap:var(--s-3);margin-top:var(--s-4)}\n.gh-acts .btn.lg{padding-left:var(--s-4);padding-right:var(--s-4)}\n@media (max-width:480px){.gh-stats.n4{grid-template-columns:repeat(2,minmax(0,1fr))}.gh-acts .btn.lg{font-size:var(--fs-4)}\n  .rw-card p.gh-line{font-size:var(--fs-2)}}\n@media (max-height:620px) and (orientation:landscape){\n  .gh-end{max-width:780px;display:grid;grid-template-columns:minmax(0,280px) minmax(0,1fr);column-gap:var(--s-5);align-content:start;padding:var(--s-4)}\n  .gh-end>*{grid-column:2}\n  .gh-end>.gh-epic{grid-column:1;grid-row:1/span 12;align-self:center;height:auto;min-height:0;aspect-ratio:240/120}\n  .gh-end>.gh-epic.made{height:auto;aspect-ratio:1}.gh-epic.made>*{height:auto;width:88%}\n  .gh-end .gh-acts{flex-direction:row;flex-wrap:wrap;justify-content:center}\n  .gh-end .gh-acts .btn{flex:1 1 150px;white-space:nowrap}.gh-end .gh-acts .btn.lg{flex-basis:100%;font-size:var(--fs-4)}\n}\n\n/* the hub on phones and in short landscape */\n@media (max-width:480px){\n  .gh-scroll{padding:var(--s-1) var(--s-3) var(--s-7)}\n  .gh-hero{height:196px}\n  .gh-tk{width:min(256px,76%);bottom:10px}\n  .gh-tkt b{font-size:var(--fs-6)}\n  .gh-pic{height:132px}\n  .gh-name{font-size:var(--fs-4)}\n  .gh-go{width:56px;height:56px}.gh-go .ic{width:26px;height:26px}\n  .gh-earn{padding:var(--s-4)}.gh-earn li{font-size:var(--fs-2)}\n}\n@media (max-height:620px) and (orientation:landscape){\n  .gh-hero{height:196px;margin-bottom:var(--s-4)}\n  .gh-tk{width:min(256px,40%);bottom:10px}\n  .gh-tkt b{font-size:var(--fs-6)}\n  .gh-pic{height:118px}\n}\n/* Block Builder (G-01; src/js/60-blocks.js). Goes into games.<VER>.js with the game. Tokens only.\n   Play screen: the scene, then the tool bar and the palette under it (portrait) or beside it (landscape). Every button 48 px and up. */\n.bb-wrap{flex:1;display:flex;flex-direction:column;min-height:0;gap:var(--s-2);padding:0 var(--s-2) var(--s-2)}\n.bb-cv{flex:1;position:relative;min-height:160px;border-radius:var(--r-card);overflow:hidden;background:var(--sc-sky);box-shadow:inset 0 0 0 2px var(--line)}\n.bb-cv canvas{display:block;width:100%;height:100%;touch-action:none;-webkit-user-select:none;user-select:none}\n.bb-side{flex:none;display:flex;flex-direction:column;gap:var(--s-2);min-height:0;min-width:0}\n.bb-bar{display:flex;flex-direction:column;gap:var(--s-1)}\n.bb-row{display:flex;gap:var(--s-1);align-items:stretch}\n.bb-tb{flex:1 1 0;min-width:48px;min-height:56px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;\n  padding:4px 2px;border:0;border-radius:var(--r-btn);background:var(--surface);color:var(--ink);box-shadow:0 3px 0 var(--line),inset 0 0 0 2px var(--line);\n  font:inherit;font-family:var(--font-display);font-size:var(--fs-2);font-weight:700;line-height:1.1;cursor:pointer;transition:transform var(--t-fast) var(--ease)}\n.bb-tb span{white-space:nowrap}\n.bb-tb .ic{width:26px;height:26px;flex:none}\n.bb-tb:active{transform:translateY(2px)}\n.bb-tb[aria-pressed=\"true\"]{background:var(--brand-tint);color:var(--brand-shade);box-shadow:inset 0 0 0 3px var(--brand),0 3px 0 var(--brand-shade)}\n.bb-tb[aria-disabled=\"true\"]{color:var(--ink-3)}\n.bb-flip .ic{transform:scaleX(-1)}\n#bbboom[aria-pressed=\"true\"]{background:var(--try-tint);color:var(--try-ink);box-shadow:inset 0 0 0 3px var(--try),0 3px 0 var(--try-ink)}\n.bb-seg{flex:3 1 0;display:flex;gap:2px;padding:3px;border-radius:var(--r-btn);background:var(--surface-2);box-shadow:inset 0 0 0 2px var(--line)}\n.bb-seg .bb-tb{min-height:52px;background:transparent;box-shadow:none}\n.bb-seg .bb-tb[aria-pressed=\"true\"]{background:var(--surface);color:var(--brand-shade);box-shadow:inset 0 0 0 3px var(--brand),0 2px 0 var(--brand-shade)}\n/* the palette: groups with a heading, scrolls; soft fades show there is more on a side */\n.bb-pal{position:relative;flex:none;min-height:0;min-width:0}\n.bb-pal[hidden]{display:none}\n.bb-ps{display:flex;gap:var(--s-3);overflow-x:auto;overflow-y:hidden;padding:6px var(--s-1) 6px;scrollbar-width:none;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}\n.bb-ps::-webkit-scrollbar{display:none}\n.bb-grp{flex:none;display:flex;flex-direction:column;gap:2px}\n.bb-gh{font-family:var(--font-display);font-size:var(--fs-2);font-weight:700;color:var(--ink-2);padding-left:4px;white-space:nowrap}\n.bb-gb{display:flex;gap:var(--s-1)}\n.bb-k{flex:none;position:relative;width:72px;min-height:84px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:0;padding:4px 2px 6px;\n  border:0;border-radius:var(--r-btn);background:var(--surface);color:var(--ink);box-shadow:0 3px 0 var(--line),inset 0 0 0 2px var(--line);\n  font:inherit;font-size:var(--fs-2);font-weight:700;line-height:1.05;cursor:pointer;transition:transform var(--t-fast) var(--ease)}\n.bb-k canvas{width:46px;height:46px;flex:none}\n.bb-kn{display:flex;align-items:center;justify-content:center;gap:2px;text-align:center;min-height:30px}\n.bb-kl{color:var(--ink-2)}\n.bb-kl .ic{width:16px;height:16px;flex:none}\n.bb-k[aria-pressed=\"true\"]{background:var(--brand-tint);color:var(--brand-shade);box-shadow:inset 0 0 0 3px var(--brand),0 3px 0 var(--brand-shade);transform:translateY(-2px)}\n.bb-k.lock canvas{opacity:.35}\n.bb-k.hint{box-shadow:inset 0 0 0 4px var(--try),0 3px 0 var(--try-ink);animation:bb-hint .6s var(--ease) 3}\n@keyframes bb-hint{50%{transform:translateY(-6px) scale(1.06)}}\n.bb-pal::before,.bb-pal::after{content:\"\";position:absolute;z-index:1;pointer-events:none;opacity:0;transition:opacity var(--t)}\n.bb-pal::before{left:0;top:0;bottom:0;width:28px;background:linear-gradient(90deg,var(--paper),transparent)}\n.bb-pal::after{right:0;top:0;bottom:0;width:28px;background:linear-gradient(270deg,var(--paper),transparent)}\n.bb-pal.vert::before{right:0;bottom:auto;width:auto;height:28px;background:linear-gradient(180deg,var(--paper),transparent)}\n.bb-pal.vert::after{left:0;top:auto;width:auto;height:28px;background:linear-gradient(0deg,var(--paper),transparent)}\n.bb-pal.can-a::before,.bb-pal.can-b::after{opacity:1}\n/* messages inside the scene, under the top bar (never over Pause or the progress chip) */\n.bb-msg{position:absolute;left:50%;top:var(--s-2);z-index:2;display:flex;align-items:center;gap:var(--s-2);max-width:calc(100% - 16px);\n  padding:6px 14px 6px 6px;border-radius:var(--r-pill);background:var(--surface);color:var(--ink);box-shadow:var(--shadow),inset 0 0 0 2px var(--line);\n  font-family:var(--font-display);font-size:var(--fs-2);font-weight:700;line-height:1.25;pointer-events:none;opacity:0;transform:translate(-50%,-8px);\n  transition:opacity var(--t) var(--ease),transform var(--t) var(--ease)}\n.bb-msg.on{opacity:1;transform:translate(-50%,0)}\n.bb-mi{flex:none;display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--brand);color:var(--surface)}\n.bb-msg.try{color:var(--try-ink)}.bb-msg.try .bb-mi{background:var(--try);color:var(--try-ink)}\n.bb-msg.good{color:var(--good-ink)}.bb-msg.good .bb-mi{background:var(--good)}\n.bb-tip{position:absolute;left:50%;bottom:var(--s-2);z-index:2;max-width:calc(100% - 16px);padding:6px 14px;border-radius:var(--r-pill);\n  background:var(--ink);color:var(--surface);font-size:var(--fs-2);line-height:1.3;text-align:center;pointer-events:none;opacity:0;\n  transform:translate(-50%,8px);transition:opacity var(--t) var(--ease),transform var(--t) var(--ease)}\n.bb-tip.on{opacity:.92;transform:translate(-50%,0)}\n.gh-top .bb-prog b{white-space:nowrap}\n/* landscape (tablets, phones on their side): the tools and the palette in a column beside the scene */\n@media (min-aspect-ratio:5/4) and (min-width:640px){\n  .bb-wrap{flex-direction:row}\n  .bb-side{width:322px}\n  .bb-pal{flex:1}\n  .bb-ps{flex-direction:column;height:100%;overflow-x:hidden;overflow-y:auto;padding:2px 2px 6px}\n  .bb-gb{flex-wrap:wrap}\n}\n/* sheets: Clear area, More, delete a world, pick a world */\n.bb-sheet h2{margin:var(--s-2) 0;font-size:var(--fs-5)}\n.bb-sheet h3{margin:var(--s-4) 0 var(--s-2);font-size:var(--fs-4)}\n.bb-sheet p{margin:0 0 var(--s-3);color:var(--ink-2)}\n.bb-sheet .acts{display:flex;flex-direction:column;gap:var(--s-2);margin-top:var(--s-4)}\n.bb-mts{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s-2);margin-bottom:var(--s-3)}\n.bb-mt{min-height:72px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;border:0;border-radius:var(--r-btn);\n  background:var(--surface);color:var(--ink);box-shadow:0 3px 0 var(--line),inset 0 0 0 2px var(--line);font:inherit;font-size:var(--fs-2);font-weight:700;cursor:pointer}\n.bb-mt[aria-pressed=\"true\"]{background:var(--brand-tint);color:var(--brand-shade);box-shadow:inset 0 0 0 3px var(--brand),0 3px 0 var(--brand-shade)}\n.bb-goals{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--s-1)}\n.bb-goals li{display:flex;align-items:center;gap:var(--s-2);min-height:40px;font-size:var(--fs-2);color:var(--ink-2);text-align:left}\n.bb-goals li .ic{flex:none;color:var(--ink-3)}\n.bb-goals li.on{color:var(--good-ink)}.bb-goals li.on .ic{color:var(--good)}\n/* the menu */\n.bb-menu{padding-top:var(--s-1)}\n.bb-sec{margin:0 0 var(--s-5)}\n.bb-sec h2{display:flex;align-items:center;gap:var(--s-2);margin:var(--s-2) 0 var(--s-1);font-size:var(--fs-5)}\n.bb-sec h2 .ic{flex:none;color:var(--es)}\n.bb-sc{margin-left:auto;display:inline-flex;align-items:center;gap:4px;font-size:var(--fs-3);color:var(--ink-2)}\n.bb-lead{margin:0 0 var(--s-3);font-size:var(--fs-2);color:var(--ink-2)}\n.bb-bpg{display:flex;gap:var(--s-2);overflow-x:auto;margin:0 -14px;padding:6px 14px 8px;scrollbar-width:thin;-webkit-overflow-scrolling:touch}\n.bb-bpg .bb-bp{flex:none;width:118px}\n.bb-bp{display:flex;flex-direction:column;align-items:center;gap:2px;min-height:148px;padding:var(--s-2) var(--s-1);border:0;border-radius:var(--r-card);\n  background:var(--surface);color:var(--ink);box-shadow:0 4px 0 var(--line),inset 0 0 0 2px var(--line);font:inherit;cursor:pointer;text-align:center}\n.bb-bp.done{background:var(--es-tint)}\n.bb-bp.lock{background:var(--surface-2);color:var(--ink-3)}\n.bb-bpic{position:relative;display:grid;place-items:center;width:100%;height:66px}\n.bb-bp.lock canvas{opacity:.35}\n.bb-lk{position:absolute;inset:0;display:grid;place-items:center;color:var(--ink-2)}\n.bb-bpic canvas{width:88px;height:66px}\n.bb-bpn{font-family:var(--font-display);font-size:var(--fs-2);font-weight:700;line-height:1.2}\n.bb-bps{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:var(--fs-2);color:var(--ink-2)}\n.bb-bpl{font-size:var(--fs-2);line-height:1.2}\n.bb-wl{display:flex;flex-direction:column;gap:var(--s-2)}\n.bb-wrow{display:flex;gap:var(--s-2);align-items:center}\n.bb-w{flex:1;min-width:0;display:flex;align-items:center;gap:var(--s-3);min-height:88px;padding:var(--s-2);border:0;border-radius:var(--r-card);background:var(--surface);\n  color:var(--ink);box-shadow:0 4px 0 var(--line),inset 0 0 0 2px var(--line);font:inherit;text-align:left;cursor:pointer}\n.bb-wpic{flex:none;display:grid;place-items:center;width:110px;height:75px;border-radius:var(--r-btn);background:linear-gradient(var(--sc-sky-1),var(--sc-sky))}\n.bb-wpic canvas{width:110px;height:75px}\n.bb-plus{color:var(--es)}\n.bb-wi{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px;font-size:var(--fs-2);color:var(--ink-2)}\n.bb-wi b{font-family:var(--font-display);font-size:var(--fs-4);color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.bb-wg{display:inline-flex;align-items:center;gap:4px}\n.bb-go{flex:none;display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:var(--es);color:var(--surface)}\n.bb-how ul{list-style:none;margin:0;padding:0;display:grid;gap:var(--s-2)}\n.bb-how li{display:flex;align-items:center;gap:var(--s-3);font-size:var(--fs-2);color:var(--ink-2)}\n.bb-how li .ic{flex:none;color:var(--es)}\n@media (min-width:860px){.bb-how ul{grid-template-columns:1fr 1fr}}\n\n/* P6-01: the palette scrolls and clips, so a block's focus ring sits inside its button */\n.bb-k:focus-visible{outline-offset:-4px}\n";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)
/* ---------- Game Room hub and shared game chrome (P4-16; DESIGN_SYSTEM.md 9 row 8; CSS src/css/48-game-hub.css) ----------
   Lives in games.<VER>.js (A11b) and loads before the games (60-blocks ... 72-shapes, NN-game-*.js), so a game file may call GH.reg()
   while it loads. gameRoom() (58-playtime.js, index.html) calls GH.hub() inside a tap, never while loading.

   Adding a game (CONTRIBUTING 3.3): one GH.reg({...}) entry, in the game's own src/js/NN-game-<name>.js or below. The hub card, the
   top-bar badge, the pause sheet and the end card all come from that entry:
     id       short id ('hill'); the card has data-g="<id>"
     btn      the card's element id ('g4x4'; kept for old taps and tests)
     name     the game's name on the card, the pause sheet and the end card
     short    optional shorter name for the top bar ('Hill Climb')
     icon     an ico() name for the small badge in the top bar
     p        colour: play | read | es | math | disc | bt (the component classes s-<p>)
     sky      two --sc-* scene tokens for the picture's backdrop, top and bottom ('sky-1', 'sky')
     art      () => the picture: SVG markup on a 240 x 100 grid (object-art roles var(--a-x) only; keep the subject in x 30-210)
     sub      () => one short line under the name (HTML; escape what is not a literal)
     open     () => the game's first screen (its menu)
     lock     optional () => '' or a reason the game cannot be opened yet (shown on the card and said in a toast)
     tapToPlay  the selector of the button on the game's first screen that starts play (smoke taps it: P4-16 block)
     saved    optional line for the time-up card ('Your picture is saved.')
   Each screen of the game draws its top bar with GH.top(id, o) and wires it with GH.wire(o) after view(); play screens get a Pause
   button that opens the shared sheet (GH.pause); game ends use GH.end(id, o); time running out uses timeUpOverlay() (64-gtimer.js).

   Drawings follow the object-art rules of DESIGN_SYSTEM 6.5: light from the top left, shade / base / highlight per area, a soft ink
   contact shadow, roles var(--a-x) only (class "art"), no ids, gradients, filters, <use>, text or raw colours. Decoration is aria-hidden.
   Nothing here changes a game's rules, scores or saved data; pausing holds the game-time clock while the sheet is open. */
const gh1 = v => Math.round(v * 10) / 10;
const ghF = (c, o) => `fill="var(--a-${c})"` + (o != null && o < 1 ? ` opacity="${o}"` : '');
const ghSt = (c, w, o) => `fill="none" stroke="var(--a-${c})" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"` +
  (o != null && o < 1 ? ` opacity="${o}"` : '');
const ghC = (x, y, r, c, o) => `<circle cx="${gh1(x)}" cy="${gh1(y)}" r="${gh1(r)}" ${ghF(c, o)}/>`;
const ghE = (x, y, rx, ry, c, o, a) => `<ellipse cx="${gh1(x)}" cy="${gh1(y)}" rx="${gh1(rx)}" ry="${gh1(ry)}" ${ghF(c, o)}` +
  (a ? ` transform="rotate(${a} ${gh1(x)} ${gh1(y)})"` : '') + '/>';
const ghR = (x, y, w, h, r, c, o) => `<rect x="${gh1(x)}" y="${gh1(y)}" width="${gh1(w)}" height="${gh1(h)}"${r ? ` rx="${r}"` : ''} ${ghF(c, o)}/>`;
const ghP = (d, c, o) => `<path ${ghF(c, o)} d="${d}"/>`;
const ghL = (d, c, w, o) => `<path ${ghSt(c, w, o)} d="${d}"/>`;
const ghPts = pts => 'M' + pts.map(([x, y]) => gh1(x) + ' ' + gh1(y)).join('L') + 'Z';
// a shaded ball: shade, the base nudged toward the light, a soft highlight
const ghBall = (x, y, r, h) => ghC(x, y, r, h + '2') + ghC(x - r * .12, y - r * .12, r * .86, h) + ghE(x - r * .36, y - r * .4, r * .32, r * .2, 'w', .55, -35);
// a puffy cloud: a shade row, then the white puffs nudged up-left
const ghCloud = (x, y, s) => {
  const puffs = [[-14, 2, 8], [-4, -4, 11], [9, -1, 9], [17, 3, 6]];
  const row = (dx, dy, c) => ghP(puffs.map(([px, py, r]) => {
    const cx = x + (px + dx) * s, cy = y + (py + dy) * s, R = r * s;
    return `M${gh1(cx - R)} ${gh1(cy)}a${gh1(R)} ${gh1(R)} 0 1 0 ${gh1(2 * R)} 0a${gh1(R)} ${gh1(R)} 0 1 0 ${gh1(-2 * R)} 0`;
  }).join('') + `M${gh1(x - 19 * s + dx * s)} ${gh1(y + 5 * s + dy * s)}a${gh1(20.5 * s)} ${gh1(5 * s)} 0 1 0 ${gh1(41 * s)} 0` +
    `a${gh1(20.5 * s)} ${gh1(5 * s)} 0 1 0 ${gh1(-41 * s)} 0`, c);
  return row(1.2, 1.8, 'w2') + row(0, 0, 'w') + ghE(x - 6 * s, y - 8 * s, 5 * s, 2.6 * s, 'w', .9, -20);
};
const ghShad = (x, y, rx, ry, o = .13) => ghE(x, y, rx, ry, 'k', o);
// sun with soft rays (top left: where the light comes from)
const ghSun = (x, y, r) => {
  let d = '';
  for (let i = 0; i < 10; i++) {
    const a = i * Math.PI / 5, c = Math.cos(a), s = Math.sin(a);
    d += `M${gh1(x + c * r * 1.35)} ${gh1(y + s * r * 1.35)}L${gh1(x + c * r * 1.75)} ${gh1(y + s * r * 1.75)}`;
  }
  return ghL(d, 'y1', gh1(r * .22), .9) + ghC(x, y, r * 1.18, 'y1', .45) + ghBall(x, y, r, 'y');
};
// a round tree: trunk, shaded crown
const ghTree = (x, y, s) => ghShad(x + 2 * s, y, 9 * s, 2.2 * s) + ghR(x - 1.6 * s, y - 9 * s, 3.2 * s, 9 * s, 1, 'n2') +
  ghC(x + 1.2 * s, y - 15 * s, 8.6 * s, 'g2') + ghC(x - .4 * s, y - 16.6 * s, 7.4 * s, 'g') + ghE(x - 3.4 * s, y - 20 * s, 3 * s, 1.9 * s, 'g1', .8, -30);
// a hexagon nut (the bolts Hill Climb pays in)
const ghNut = (x, y, r) => {
  const hx = (cx, cy, R) => ghPts([0, 1, 2, 3, 4, 5].map(i => [cx + Math.cos(i * Math.PI / 3) * R, cy + Math.sin(i * Math.PI / 3) * R]));
  return ghP(hx(x + r * .12, y + r * .14, r), 'y3') + ghP(hx(x - r * .04, y - r * .04, r * .9), 'y') + ghC(x, y, r * .38, 'y3') +
    ghL(`M${gh1(x - r * .62)} ${gh1(y - r * .5)}L${gh1(x - r * .2)} ${gh1(y - r * .78)}`, 'y1', gh1(r * .26));
};

/* ---- the three games' pictures (240 x 100) ---- */
const GH_ART = {
  // 4x4 Hill Climb: a red jeep climbing a grassy hill to a finish flag, bolts ahead, dust behind
  hill() {
    const S = 'M0 86C60 86 100 80 140 64S206 38 240 36';
    const S9 = 'M0 95C60 95 100 89 140 73S206 47 240 45';
    // the jeep in its own frame: wheels on y 0, x -26 and 26; drawn level, then tilted onto the slope
    const wheel = x => ghC(x + 1, 1, 13, 'k') + ghC(x, 0, 12.4, 'k2') + ghC(x - .6, -.6, 6.6, 'e1') + ghC(x + .6, .6, 5, 'e') +
      ghC(x, 0, 2.4, 'e3') + ghE(x - 5.6, -7, 3.4, 1.8, 'w', .35, -40);
    const jeep = ghShad(2, 13.5, 44, 3.4, .16) +
      ghL('M-58 4l-7 -2M-56 -3l-9 -4', 'w', 3, .8) + ghC(-50, 6, 5.4, 'w', .8) + ghC(-58, 2, 4, 'w', .65) +
      ghP('M-12 -22L-7 -40H17L25 -22Z', 'r2') + ghP('M-11 -23L-6.5 -39H15.5L22.5 -23Z', 'r') +
      ghP('M-6 -24L-2.6 -35.5H13L18.5 -24Z', 'c1') + ghP('M-2.6 -35.5H5L-1 -24H-6Z', 'w', .65) +
      ghR(-42, -24, 86, 22, 7, 'r2') + ghR(-43, -26, 84, 20, 7, 'r') + ghR(-39, -24, 76, 5, 2.5, 'r1', .7) +
      ghR(-40, -12, 80, 4, 2, 'r3', .55) + ghR(38, -21, 8, 9, 3, 'y2') + ghC(41, -18, 3, 'y1') + ghR(-47, -14, 9, 7, 2.5, 'k2') +
      ghR(-44, -9, 88, 6, 3, 'r3') + ghL('M-40 -6a14 14 0 0 1 28 0M12 -6a14 14 0 0 1 28 0', 'k2', 4) + wheel(-26) + wheel(26) + ghL('M-30 -46L-30 -30', 'e3', 1.8) + ghP('M-30 -46L-19 -42L-30 -38Z', 'y');
    let pebbles = '';
    for (const [x, y, r] of [[18, 97, 2.2], [52, 98, 1.6], [86, 96, 2.4], [150, 88, 2], [196, 72, 2.6], [228, 62, 1.8], [118, 94, 1.5]]) {
      pebbles += ghE(x, y, r * 1.4, r, 'n2') + ghE(x - r * .3, y - r * .35, r * .6, r * .35, 'n1', .8);
    }
    return ghSun(30, 22, 11) + ghCloud(86, 20, 1) + ghCloud(196, 15, .78) +
      ghP('M0 66Q30 46 66 58T136 50T206 44T240 50V100H0Z', 'g1') +
      ghTree(168, 50, .7) + ghTree(182, 48, .55) + ghTree(40, 62, .6) +
      ghP(S + 'V100H0Z', 'g') + ghP(S9 + 'V100H0Z', 'n') + ghL(S9, 'g2', 3) + ghL(S, 'g1', 2.2) + pebbles +
      ghL('M223 39V12', 'e3', 2) + ghR(223, 12, 15, 10, 1, 'w') +
      ghP('M223 12h5v5h-5ZM233 12h5v5h-5ZM228 17h5v5h-5Z', 'k2') + ghShad(224, 39, 5, 1.4) +
      ghNut(160, 50, 4.6) + ghNut(176, 43, 4.6) + ghNut(192, 34, 4.6) +
      `<g transform="translate(104 70) rotate(-16)">${jeep}</g>`;
  },
  // Coloring: an easel with a rainbow painting, a wooden palette with paint, a brush and two crayons
  art() {
    const blob = (x, y, c) => ghE(x + .6, y + .8, 6, 4.4, c + '2') + ghE(x - .3, y - .3, 5.2, 3.8, c) + ghE(x - 2, y - 1.6, 1.8, 1, 'w', .7, -20);
    let arcs = '';
    ['r', 'o', 'y', 'g', 'b', 'v'].forEach((c, i) => {
      const R = 30 - i * 4.4;
      arcs += ghL(`M${gh1(120 - R)} 66A${gh1(R)} ${gh1(R)} 0 0 1 ${gh1(120 + R)} 66`, c, 4.6);
    });
    const crayon = (x, y, a, c) => `<g transform="rotate(${a} ${x} ${y})">` + ghShad(x + 1, y + 6, 20, 2.4) +
      ghR(x - 18, y - 4, 32, 8, 2, c + '2') + ghR(x - 18, y - 4.6, 32, 7, 2, c) + ghR(x - 8, y - 4.6, 10, 7, 0, 'w', .85) +
      ghP(`M${x + 14} ${y - 4.6}L${x + 23} ${y - .6}L${x + 14} ${y + 3.6}Z`, c + '2') + ghR(x - 16, y - 3.4, 26, 1.6, .8, c + '1', .8) + '</g>';
    return ghShad(120, 97, 46, 3.6) + ghL('M120 8L95 97M120 8L145 97', 'n2', 4.6) + ghL('M120 40L120 97', 'n3', 4) +
      ghL('M118 8L94.5 96', 'n1', 1.2, .7) +
      ghR(82, 9, 78, 58, 3, 'w3') + ghR(80, 7, 78, 58, 3, 'w') + ghR(84, 11, 70, 50, 2, 'm', .55) +
      ghSun(98, 22, 5.4) + ghCloud(140, 22, .5) + arcs + ghR(78, 64, 84, 6, 2.5, 'n2') + ghR(78, 63, 84, 4.4, 2, 'n') +
      ghShad(64, 96, 38, 3.4) +
      `<path ${ghF('t2')} fill-rule="evenodd" d="M30 80C30 66 48 58 66 60C86 62 100 70 98 82C96 92 84 96 70 94C62 93 62 87 56 87C48 87 44 95 36 92C31 90 30 86 30 80ZM44 76a5 4 0 1 0 10 0a5 4 0 1 0 -10 0Z"/>` +
      `<path ${ghF('t')} fill-rule="evenodd" d="M31 78C31 65 48 58 65 59C84 61 97 68 96 79C95 89 84 93 71 91C63 90 63 84 56 84C48 84 44 92 37 89C32 87 31 83 31 78ZM44 76a5 4 0 1 0 10 0a5 4 0 1 0 -10 0Z"/>` +
      ghL('M38 69C44 63 54 61 62 61', 't1', 2.4, .9) +
      blob(64, 68, 'r') + blob(80, 70, 'y') + blob(88, 81, 'b') + blob(74, 84, 'g') + blob(40, 82, 'v') +
      ghShad(186, 97, 22, 2.6) + ghL('M170 95L198 52', 'n2', 6) + ghL('M169 94L197 51', 'n', 4.6) + ghL('M171 89L192 57', 'n1', 1.4, .8) +
      ghL('M197 51L202.5 43', 'e2', 7) + ghL('M196.5 50.5L201.5 43', 'e1', 4.4) +
      ghP('M200 45C201 40 206 33 212 30C213 36 210 43 205 48Z', 'p2') + ghP('M200 45C201 40 205 34 210 31C210.5 36 208 42 203.5 46.5Z', 'p') +
      ghC(209, 38, 1.4, 'w', .7) +
      crayon(196, 90, -8, 'b') + crayon(150, 93, 6, 'g') +
      ghE(176, 58, 3, 2.2, 'b') + ghE(165, 66, 2, 1.5, 'r') + ghE(30, 52, 2.6, 2, 'y2') + ghE(22, 60, 1.6, 1.2, 'g');
  },
  // Block Builder: a little block island on the sea: grass, a tree, stone, TNT and a block on its way down
  blocks() {
    const a = 12, ox = 118, oy = 54;
    const at = (i, j, k) => [ox + (i - j) * a, oy + (i + j) * a / 2 - k * a];
    const KIND = {
      grass: ['g1', 'n', 'n2', 'g', 'g2'], stone: ['e1', 'e', 'e2'], wood: ['t1', 'n1', 'n'], leaf: ['g1', 'g', 'g2'],
      tnt: ['r1', 'r', 'r2'], sand: ['t1', 't', 't2'],
    };
    const cube = (i, j, k, kind) => {
      const [X, Y] = at(i, j, k), T = KIND[kind];
      const top = ghPts([[X, Y - a / 2], [X + a, Y], [X, Y + a / 2], [X - a, Y]]);
      const left = ghPts([[X - a, Y], [X, Y + a / 2], [X, Y + a * 1.5], [X - a, Y + a]]);
      const right = ghPts([[X, Y + a / 2], [X + a, Y], [X + a, Y + a], [X, Y + a * 1.5]]);
      let h = ghP(top, T[0]) + ghP(left, T[1]) + ghP(right, T[2]);
      if (kind == 'grass') h += ghP(ghPts([[X - a, Y], [X, Y + a / 2], [X, Y + a * .85], [X - a, Y + a * .35]]), T[3]) +
        ghP(ghPts([[X, Y + a / 2], [X + a, Y], [X + a, Y + a * .35], [X, Y + a * .85]]), T[4]);
      if (kind == 'tnt') h += ghP(ghPts([[X - a, Y + a * .32], [X, Y + a * .82], [X, Y + a * 1.12], [X - a, Y + a * .62]]), 'w') +
        ghP(ghPts([[X, Y + a * .82], [X + a, Y + a * .32], [X + a, Y + a * .62], [X, Y + a * 1.12]]), 'w2');
      if (kind == 'stone') h += ghL(`M${gh1(X - a * .7)} ${gh1(Y + a * .5)}l${gh1(a * .3)} ${gh1(a * .3)}l${gh1(a * .15)} ${gh1(-a * .1)}`, 'e2', 1.2) +
        ghL(`M${gh1(X + a * .3)} ${gh1(Y + a * .9)}l${gh1(a * .35)} ${gh1(-a * .3)}`, 'e3', 1.2);
      if (kind == 'wood') h += ghL(`M${gh1(X - a * .5)} ${gh1(Y + a * .3)}v${gh1(a * .9)}`, 'n2', 1.2, .7);
      return h + ghL(`M${gh1(X - a)} ${gh1(Y)}L${gh1(X)} ${gh1(Y - a / 2)}`, 'w', 1.2, .55);
    };
    // the sea: a flat diamond under the island with a deep edge and waves
    const [sx, sy] = at(1, 1, 0);
    const sea = (d, c) => ghP(ghPts([[sx, sy - 52 + d], [sx + 104, sy + d], [sx, sy + 52 + d], [sx - 104, sy + d]]), c);
    let waves = '';
    for (const [x, y] of [[54, 72], [74, 84], [168, 78], [186, 70], [150, 92], [92, 94]]) waves += `M${x} ${y}q4 -3 8 0t8 0`;
    const blocks = [];
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) blocks.push([i, j, 0, i == 2 && j == 2 ? 'sand' : 'grass']);
    blocks.push([2, 0, 1, 'wood'], [2, 0, 2, 'leaf'], [1, 0, 2, 'leaf'], [2, 1, 2, 'leaf'], [2, 0, 3, 'leaf'],
      [0, 0, 1, 'stone'], [0, 1, 1, 'stone'], [0, 0, 2, 'tnt']);
    blocks.sort((p, q) => (p[0] + p[1]) - (q[0] + q[1]) || p[2] - q[2] || p[0] - q[0]);
    const [gx, gy] = at(1, 2, 1);
    return ghSun(30, 22, 11) + ghCloud(196, 16, .8) + ghCloud(62, 34, .55) +
      sea(5, 'b2') + sea(0, 'b') + ghP(ghPts([[sx, sy - 52], [sx + 104, sy], [sx + 70, sy + 2], [sx - 4, sy - 44], [sx - 70, sy - 14], [sx - 104, sy]]), 'b1', .45) +
      ghL(waves, 'w', 1.6, .8) + ghShad(sx + 4, sy + 26, 54, 12, .14) +
      blocks.map(b => cube(...b)).join('') +
      // a ghost outline where the next block will land, and the grass block dropping into it
      ghL(ghPts([[gx, gy - a / 2], [gx + a, gy], [gx, gy + a / 2], [gx - a, gy]]), 'w', 1.6, .9) +
      `<g transform="translate(0 -22)">${cube(1, 2, 1, 'grass')}</g>` +
      ghL(`M${gx - 6} ${gy - 30}v-6M${gx} ${gy - 33}v-7M${gx + 6} ${gy - 30}v-6`, 'w', 1.6, .8);
  },
};

const GH = {
  games: [],
  cur: null, // id of the game whose top bar is on screen (end and time-up cards use it)
  held: false, // the pause sheet is open: the game-time clock does not count (64-gtimer.js, Hill Climb's loop)

  // register a game (see the header); a second entry with the same id replaces the first
  reg(g) {
    GH.games = GH.games.filter(x => x.id !== g.id).concat([g]);
    return g;
  },
  get(id) {
    return GH.games.find(g => g.id === id) || null;
  },

  // the game's picture as an SVG; cls adds a class (the well's size comes from CSS)
  pic(id, cls = '') {
    const g = GH.get(id);
    if (!g || !g.art) return '';
    return `<svg class="art gh-art${cls ? ' ' + cls : ''}" viewBox="0 0 240 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${g.art()}</svg>`;
  },
  // the picture's backdrop (two scene tokens), as an inline style
  sky(g) {
    const [a, b] = g.sky || ['sky-1', 'sky'];
    return `--gh-a:var(--sc-${a});--gh-b:var(--sc-${b})`;
  },

  /* ---- the hub: a fairground scene with the game-time ticket, a drawn card per game, how to earn more ---- */
  hub() {
    const left = ptLeft(), on = left > 0;
    GH.cur = null;
    const card = g => {
      const lock = g.lock ? g.lock() : '', need = !lock && !on;
      const state = lock ? ' lock' : need ? ' need' : '';
      const flag = lock ? `<span class="gh-flag">${ico('lock', 20)}<span>${esc(lock)}</span></span>`
        : need ? `<span class="gh-flag">${ico('ticket', 20)}<span>Needs game time</span></span>` : '';
      return `<button class="gh-card s-${g.p}${state}" id="${g.btn}" data-g="${g.id}"${lock ? ' aria-disabled="true"' : ''}>` +
        `<span class="gh-pic" style="${GH.sky(g)}">${GH.pic(g.id)}${flag}</span>` +
        `<span class="gh-info"><span class="gh-name">${UI.t(g.name)}</span><span class="gh-sub">${g.sub ? g.sub() : ''}</span></span>` +
        `<span class="gh-go" aria-hidden="true">${ico(lock ? 'lock' : 'play')}</span></button>`;
    };
    const R_ = n => `<span class="gh-ei">${ico(n, 22)}</span>`;
    const earn = ptEarnList(); // P5-09: the same list as ptRules (58-playtime.js)
    view(`<div class="gh-room"><div class="top tbar gh-top gh-mtop s-play">${UI.ibtn('back', 'Back', { size: 'sm', id: 'back' })}` +
      `<div class="ttl gh-ttl"><span class="gh-tb">${ico('gamepad', 24)}</span><span class="gh-tt"><span class="gh-gn">Game Room</span></span></div>` +
      `${UI.chip('ticket', fmtT(left), { aria: 'Game time', id: 'gtm' })}</div>
  <div class="scroll gh-scroll"><section class="gh-hero${on ? '' : ' off'}">${GH.scene()}
    <div class="gh-tk" role="img" aria-label="${on ? esc(fmtT(left) + ' of game time left') : 'No game time yet'}">${GH.ticket(on)}
      <span class="gh-tkt"><b>${on ? fmtT(left) : '0:00'}</b><span>${on ? 'game time left' : 'No game time yet'}</span></span></div></section>
  <div class="gh-why${on ? ' on' : ''}"><p>${esc(ptWhyNot())}</p>${on ? '' : UI.btn('Go earn game time', { kind: 'primary', size: 'lg', icon: 'path-read', id: 'learn' })}</div>
  <div class="gh-grid">${GH.games.map(card).join('')}</div>
  <section class="gh-earn"><h2>${ico('ticket', 26)}<span>How to earn more game time</span></h2>
   <ul>${earn.map(([i, t, v]) => `<li>${R_(i)}<span>${esc(t)}</span><b>${esc(v)}</b></li>`).join('')}</ul>
   <p>Replaying a stop you already mastered, or the same stop over and over, earns less.</p></section></div></div>`);
    $('#back').onclick = () => home();
    if ($('#learn')) $('#learn').onclick = () => home();
    for (const g of GH.games) {
      const b = $('#' + g.btn);
      if (b) b.onclick = () => {
        const why = g.lock ? g.lock() : '';
        if (why) {
          SFX.wrong();
          fb(why, 'warn long', 2600);
          return;
        }
        SFX.whoosh();
        g.open();
      };
    }
  },

  // the hub's scene: a fair on green hills under bunting (960 x 180, the sky is the CSS gradient behind it). The middle third
  // (Ferris wheel, balloons, big top) is what a phone shows; wider screens also see the stalls, hot-air balloons and trees.
  scene() {
    const hues = ['r', 'y', 'b', 'g', 'p', 'o'];
    // bunting: four sagging strings, flags grouped by colour into one path per tone
    let str = '';
    const fl = {};
    for (let k = 0; k < 4; k++) {
      const x0 = k * 240, x1 = x0 + 240, cx = x0 + 120, y0 = 6, cy = 46;
      str += `M${x0} ${y0}Q${cx} ${cy} ${x1} ${y0}`;
      for (let i = 1; i < 12; i++) {
        const t = i / 12, x = (1 - t) * (1 - t) * x0 + 2 * t * (1 - t) * cx + t * t * x1, y = (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * cy + t * t * y0;
        const h = hues[(i + k * 2) % hues.length];
        fl[h] = fl[h] || ['', ''];
        fl[h][0] += ghPts([[x - 7, y], [x + 7, y], [x, y + 15]]);
        fl[h][1] += ghPts([[x, y], [x + 7, y], [x, y + 15]]);
      }
    }
    let flags = '';
    for (const h of hues) if (fl[h]) flags += ghP(fl[h][0], h) + ghP(fl[h][1], h + '2', .55);
    // Ferris wheel
    const wx = 376, wy = 94, R = 47;
    let spokes = '', cars = '';
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4 + .2, x = wx + Math.cos(a) * R, y = wy + Math.sin(a) * R, h = hues[i % 5];
      spokes += `M${wx} ${wy}L${gh1(x)} ${gh1(y)}`;
      cars += ghL(`M${gh1(x)} ${gh1(y)}v5`, 'e3', 1.4) + ghR(x - 7, y + 4.6, 14, 10, 3.4, h + '2') + ghR(x - 7.6, y + 4, 13, 8.6, 3.2, h) +
        ghR(x - 5, y + 5.4, 8, 2, 1, 'w', .55);
    }
    const wheel = ghShad(wx, 162, 42, 4) + ghL(`M${wx - 34} 162L${wx} ${wy}L${wx + 34} 162`, 'e3', 6) +
      ghL(`M${wx - 33} 161L${wx - 1} ${wy}M${wx + 1} ${wy}L${wx + 33} 161`, 'e1', 2.2, .9) +
      `<circle cx="${wx}" cy="${wy}" r="${R}" ${ghSt('v2', 5)}/>` + `<circle cx="${wx - .8}" cy="${wy - .8}" r="${R}" ${ghSt('v', 3)}/>` +
      `<circle cx="${wx}" cy="${wy}" r="${R - 9}" ${ghSt('v1', 1.6, .9)}/>` + ghL(spokes, 'w2', 1.6) + cars + ghBall(wx, wy, 6.5, 'y');
    // big top tent
    const tx = 596, ty = 104, tw = 58;
    let roof = '', wall = '';
    for (let i = -3; i < 3; i += 2) {
      roof += ghPts([[tx, ty - 58], [tx + i * tw / 3, ty], [tx + (i + 1) * tw / 3, ty]]);
      wall += `M${gh1(tx + i * tw / 3)} ${ty}h${gh1(tw / 3)}v52h${gh1(-tw / 3)}Z`;
    }
    let scal = `M${tx - tw - 2} ${ty}`;
    for (let i = 0; i < 8; i++) scal += `a${gh1((tw + 2) / 8)} 7 0 0 0 ${gh1((tw + 2) / 4)} 0`;
    const tent = ghShad(tx + 6, 157, 70, 5) + ghR(tx - tw + 2, ty, tw * 2 - 4, 52, 0, 'w') + ghP(wall, 'r') +
      ghP(`M${tx} ${ty + 12}C${tx - 14} ${ty + 12} ${tx - 16} ${ty + 30} ${tx - 16} ${ty + 52}H${tx + 16}C${tx + 16} ${ty + 30} ${tx + 14} ${ty + 12} ${tx} ${ty + 12}Z`, 'k2') +
      ghP(`M${tx} ${ty + 12}C${tx - 14} ${ty + 12} ${tx - 16} ${ty + 30} ${tx - 16} ${ty + 52}H${tx - 8}C${tx - 8} ${ty + 34} ${tx - 4} ${ty + 20} ${tx} ${ty + 12}Z`, 'r2') +
      ghP(`M${tx - tw - 4} ${ty}L${tx} ${ty - 58}L${tx + tw + 4} ${ty}Z`, 'w') + ghP(roof, 'r') + ghP(scal + 'Z', 'y') +
      ghP(`M${tx} ${ty - 58}L${tx + tw + 4} ${ty}H${tx}Z`, 'k', .12) + ghR(tx, ty, tw - 2, 52, 0, 'k', .1) +
      ghL(`M${tx} ${ty - 58}V${ty - 76}`, 'e3', 2) + ghP(`M${tx} ${ty - 76}L${tx + 15} ${ty - 71}L${tx} ${ty - 66}Z`, 'y') + ghBall(tx, ty - 58, 3.4, 'y');
    // a bunch of balloons tied to a post
    const bal = (x, y, h) => ghE(x + .8, y + .8, 9, 11, h + '2') + ghE(x - .4, y - .6, 7.8, 9.8, h) + ghE(x - 3.4, y - 4.6, 2.4, 3.6, 'w', .6, 25) +
      ghP(`M${x - 2} ${y + 10}h4l-2 3Z`, h + '2');
    const bx = 484;
    const balloons = ghL(`M${bx} 118C${bx - 2} 110 ${bx - 10} 104 ${bx - 10} 92M${bx} 118C${bx} 106 ${bx + 6} 98 ${bx + 8} 80` +
      `M${bx} 118C${bx + 4} 110 ${bx + 20} 104 ${bx + 24} 96`, 'e3', 1.1, .8) +
      bal(bx - 10, 82, 'p') + bal(bx + 8, 69, 'y') + bal(bx + 25, 86, 'b') + ghR(bx - 2, 116, 4, 44, 2, 'n2') + ghShad(bx, 160, 10, 2);
    // a game stall with a striped awning and prizes on the counter
    const stall = (x, h) => {
      let stripes = '', sc = `M${x - 34} 112`;
      for (let i = 0; i < 4; i++) stripes += ghPts([[x - 26 + i * 13, 98], [x - 19.5 + i * 13, 98], [x - 25.5 + i * 17, 112], [x - 34 + i * 17, 112]]);
      for (let i = 0; i < 4; i++) sc += `a8.5 6 0 0 0 17 0`;
      return ghShad(x + 4, 158, 38, 3.4) + ghL(`M${x - 27} 158V110M${x + 27} 158V110`, 'n2', 3.4) + ghR(x - 26, 110, 52, 24, 0, 'm2') +
        ghBall(x - 13, 127, 5, 'p') + ghBall(x, 125, 6, 'g') + ghBall(x + 13, 127, 5, 'b') +
        ghR(x - 30, 132, 62, 26, 3, 't2') + ghR(x - 31, 131, 60, 24, 3, 't') + ghR(x - 29, 133, 56, 3.6, 1.8, 't1', .8) +
        ghR(x - 18, 139, 36, 12, 3, h) + ghR(x - 16, 140, 20, 3, 1.5, h + '1', .7) +
        ghP(`M${x - 26} 98H${x + 26}L${x + 34} 112H${x - 34}Z`, 'w') + ghP(stripes, h) + ghP(sc + 'Z', h + '2') +
        ghP(`M${x} 98H${x + 26}L${x + 34} 112H${x}Z`, 'k', .1);
    };
    // a hot-air balloon far away
    const hot = (x, y, h) => ghE(x + 1.6, y + 1.6, 21, 25, h + '2') + ghE(x - .8, y - 1, 19, 23.4, h) + ghE(x, y, 7, 24, 'w', .5) +
      ghE(x - 9, y - 10, 4, 7, 'w', .45, 20) + ghL(`M${x - 11} ${y + 19}L${x - 6} ${y + 35}M${x + 11} ${y + 19}L${x + 6} ${y + 35}`, 'e3', 1.2) +
      ghR(x - 7, y + 34, 14, 10, 3, 'n2') + ghR(x - 7.5, y + 33.5, 13, 8.5, 3, 'n') + ghR(x - 6, y + 35, 9, 2, 1, 'n1', .8);
    // hills, bushes and the ground
    let trees = '';
    for (const [x, y, s] of [[34, 138, .9], [92, 134, .7], [150, 138, 1], [300, 134, .8], [452, 140, .6], [672, 136, .9], [700, 140, .6],
      [812, 134, 1], [866, 138, .7], [930, 134, .9]]) trees += ghTree(x, y, s);
    let tufts = '';
    for (let x = 12; x < 960; x += 37) tufts += `M${x} ${166 + (x % 3) * 3}l-2 -6M${x + 3} ${166 + (x % 3) * 3}v-7M${x + 6} ${166 + (x % 3) * 3}l2 -6`;
    return `<svg class="art gh-scene" viewBox="0 0 960 180" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">` +
      ghSun(332, 30, 13) + ghCloud(108, 42, 1) + ghCloud(528, 30, .9) + ghCloud(888, 40, 1.1) + ghCloud(690, 70, .7) +
      hot(212, 62, 'v') + hot(780, 56, 'c') +
      ghP('M0 122Q50 98 110 112T230 104T350 100T470 108T590 102T710 106T830 100T960 108V180H0Z', 'g1') + trees +
      ghP('M0 146Q70 132 150 142T300 138T450 144T600 138T750 144T900 140T960 142V180H0Z', 'g2') +
      ghP('M0 150Q70 136 150 146T300 142T450 148T600 142T750 148T900 144T960 146V180H0Z', 'g') +
      ghL('M0 150Q70 136 150 146T300 142T450 148T600 142T750 148T900 144T960 146', 'g1', 2.4, .9) + ghL(tufts, 'g2', 1.6, .8) +
      stall(248, 'b') + stall(740, 'g') + wheel + tent + balloons + ghL(str, 'e3', 1.4) + flags + '</svg>';
  },

  // the game-time ticket (300 x 104): an orange ticket with a star stub and a cream face for the time (grey when there is none)
  ticket(on) {
    const h = on ? 'o' : 'e', st = on ? 'y' : 'w';
    const body = (dx, dy) => `M${16 + dx} ${4 + dy}H${79 + dx}a9 9 0 0 0 18 0H${284 + dx}a12 12 0 0 1 12 12V${84 + dy}a12 12 0 0 1 -12 12` +
      `H${97 + dx}a9 9 0 0 0 -18 0H${16 + dx}a12 12 0 0 1 -12 -12V${16 + dy}a12 12 0 0 1 12 -12Z`;
    return `<svg class="art gh-tks" viewBox="0 0 300 104" aria-hidden="true" focusable="false">` + ghShad(150, 100, 136, 4) +
      ghP(body(0, 4), h + '3') + ghP(body(0, 0), h + '2') + ghP(body(-1.4, -1.6), h) +
      ghL('M18 9H76M100 9H282', h + '1', 3, .75) + ghL('M88 20V84', 'm', 2.4) +
      `<path ${ghF(st + (on ? '2' : '3'))} d="${rwStarD(45, 52, 25, 12.5)}"/>` + `<path ${ghF(st)} d="${rwStarD(43.6, 50.4, 22, 11)}"/>` +
      ghE(37, 44, 4.6, 2.8, 'w', on ? .7 : .9, -30) +
      ghR(102, 16, 184, 74, 10, 'm2') + ghR(102, 14, 184, 72, 10, 'm1') + '</svg>';
  },

  /* ---- the shared top bar ---- */
  // id: the registered game. o: {play: true for a play screen (Pause instead of Back), sub: text under the name (escaped here),
  //   chips: html before the time chip, tools: html of icon buttons (play screens), sound: html of the sound button, timeId: the time
  //   chip's id (default gtm), hud: true over a full-screen canvas}
  top(id, o = {}) {
    const g = GH.get(id) || { name: id, icon: 'gamepad', p: 'play' };
    GH.cur = g.id || null;
    const lead = o.play ? UI.ibtn('pause', 'Pause', { size: 'sm', id: 'gpause', cls: 'gh-pz' }) : UI.ibtn('back', 'Back', { size: 'sm', id: 'back' });
    const cls = 'top tbar gh-top s-' + g.p + (o.play ? ' gh-play' : '') + (o.hud ? ' gh-hud' : '') + (o.tools ? ' gh-hastools' : '') +
      ((o.tools || '').split('<button').length > 2 ? ' gh-wrap' : '');
    return `<div class="${cls}" data-g="${esc(g.id || id)}">${lead}<div class="ttl gh-ttl"><span class="gh-tb">${ico(g.icon || 'gamepad', 24)}</span>` +
      `<span class="gh-tt${o.sub ? ' two' : ''}"><b class="gh-gn">${UI.t(g.short || g.name)}</b>${o.sub ? `<span class="gh-gs">${esc(o.sub)}</span>` : ''}</span></div>` +
      (o.tools ? `<span class="gh-tools">${o.tools}</span>` : '') + (o.chips || '') +
      UI.chip('ticket', fmtT(ptLeft()), { aria: 'Game time left', id: o.timeId || 'gtm' }) + (o.sound || '') + '</div>';
  },
  // after view(): back runs o.back; Pause opens the sheet, whose Quit runs o.quit
  wire(o = {}) {
    const b = $('#back');
    if (b && o.back) b.onclick = o.back;
    const p = $('#gpause');
    if (p && o.quit) p.onclick = () => GH.pause(o);
  },
  // a small icon button for a play screen's top bar
  tool(icon, aria, id, on) {
    return UI.ibtn(icon, aria, { size: 'sm', id, cls: 'gh-tool' + (on ? ' on' : ''), attrs: on != null ? `aria-pressed="${on ? 'true' : 'false'}"` : '' });
  },
  // set a time chip: seconds left, or the last seconds of grace after time ran out (up)
  setTime(el, up) {
    if (!el) return;
    el.classList.toggle('gh-up', up != null);
    UI.setChip(el, up != null ? Math.max(0, Math.ceil(up)) + 's' : fmtT(ptLeft()));
  },

  /* ---- the pause sheet: Keep playing / Quit. The game-time clock holds while it is open; o.hold(true|false) pauses the game ---- */
  pause(o = {}) {
    if (GH.held) return;
    const g = GH.get(GH.cur) || { name: 'Game', p: 'play' };
    GH.held = true;
    if (o.hold) o.hold(true);
    let quit = false;
    const s = UI.sheet(`<div class="gh-sheet s-${g.p}"><div class="gh-spic" style="${GH.sky(g)}">${GH.pic(g.id)}</div>` +
      `<h2>Paused</h2><p>${UI.t(g.name)} is waiting for you. Your game time stops while you rest.</p>` +
      `<div class="acts gh-acts">${UI.btn('Keep playing', { kind: 'primary', size: 'lg', icon: 'play', id: 'gresume', wide: true })}` +
      `${UI.btn('Quit', { icon: 'close', id: 'gquit', wide: true })}</div></div>`, {
      onClose: () => {
        GH.held = false;
        if (!quit && o.hold) o.hold(false);
      },
    });
    s.el.querySelector('#gresume').onclick = () => {
      SFX.pop(2);
      s.close();
    };
    s.el.querySelector('#gquit').onclick = () => {
      quit = true;
      s.close();
      SFX.whoosh();
      if (o.quit) o.quit();
    };
    return s;
  },

  /* ---- the end-of-game card (over a dim backdrop; append is done here; returns the overlay so callers wire their buttons) ----
     o: {title, win (rays, a glow and drawn confetti), pic (html instead of the game's picture), made (pic is the child's own picture),
         stars (0-3 or null), tag (a "New record!" line), stats: [[value, label, icon]], extra (html, e.g. a gauge), lines: [[icon, html]],
         btns (html: buttons with the caller's ids)} */
  end(id, o = {}) {
    const g = GH.get(id || GH.cur) || { name: 'Game', p: 'play' };
    const el = document.createElement('div');
    el.className = 'ovl rw-ovl gh-ovl';
    const stats = (o.stats || []).filter(Boolean);
    el.innerHTML = `<div class="rw-card gh-end s-${g.p}${o.win ? ' rw-growc' : ''}" role="dialog" aria-modal="true" aria-label="${esc(o.title || g.name)}">` +
      (o.win ? RW.rays() : '') +
      `<div class="gh-epic${o.made ? ' made' : ''}" style="${GH.sky(g)}">${o.pic || GH.pic(g.id)}</div>` +
      `<p class="gh-ename">${UI.t(g.name)}</p><h1>${esc(o.title || '')}</h1>` +
      (o.stars != null ? `<div class="gh-estars">${UI.stars(o.stars, 3, 40, { arc: true })}</div>` : '') +
      (o.tag ? `<p class="gh-etag">${UI.tag(o.tag, 'new', 'sparkle')}</p>` : '') +
      (stats.length ? `<div class="gh-stats n${stats.length}" style="--n:${stats.length}">${stats.map(([v, l, ic]) => `<div class="gh-stat">${ic ? ico(ic, 22, ic == 'coin' ? 'ic-coin' : '') : ''}` +
        `<b>${esc(v)}</b><span>${esc(l)}</span></div>`).join('')}</div>` : '') + (o.extra ? `<div class="gh-extra">${o.extra}</div>` : '') +
      (o.lines || []).map(([ic, h]) => `<p class="gh-line">${ico(ic, 22)}<span>${h}</span></p>`).join('') +
      `<div class="rw-acts gh-acts">${o.btns || ''}</div></div>`;
    document.body.appendChild(el);
    if (o.win) RW.burst(el.firstChild, 28); // drawn confetti (hidden in calm mode)
    return el;
  },
};

// The Game Room's games, in hub order. Each game file keeps its own code; only these entries tell the hub about it.
GH.reg({
  id: 'hill', btn: 'g4x4', name: '4x4 Hill Climb', short: 'Hill Climb', icon: 'car', p: 'play', sky: ['sky-1', 'sky'], art: GH_ART.hill,
  sub: () => {
    const gs = garageS();
    return `<span>Best <b>${Math.max(gs.best.meadow || 0, gs.best.moon || 0)} m</b></span><span>${ico('nut', 18)}<b>${gs.bolts}</b> bolts</span>`;
  },
  open: () => garage(), tapToPlay: '[data-st="meadow"]',
});
GH.reg({
  id: 'art', btn: 'gcbn', name: 'Coloring', icon: 'palette', p: 'read', sky: ['lilac', 'pink'], art: GH_ART.art,
  sub: () => '<span>Mandalas, animals, pixel art and free paint</span>',
  open: () => colorMenu(), tapToPlay: '.sttile[data-k]', saved: 'Your picture is saved.',
});
GH.reg({
  id: 'blocks', btn: 'gbb', name: 'Block Builder', icon: 'blocks', p: 'es', sky: ['sea-1', 'sea'], art: GH_ART.blocks,
  sub: () => bbHubLine(), // G-01: blueprints done (60-blocks.js)
  open: () => bbMenu(), tapToPlay: '[data-w="0"]', saved: 'Your world is saved.',
});
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
   (tools/test.js "block builder G-01"); the play screen around it is blockBuilder(). */

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
  { k: 'cactus', n: 'Cactus' }, { k: 'obsidian', n: 'Obsidian' }, { k: 'ice', n: 'Ice', see: 1 }];
const BB_TNT = 20, BB_PET = 19;
// the palette, grouped; TNT is last (R-02 M3)
const BB_GROUPS = [
  ['Nature', [1, 2, 3, 9, 10, 11, 26, 5, 6, 24, 23, 17, 18]],
  ['Building', [4, 8, 7, 12, 13, 22, 25, 14, 15, 16]],
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
  const H = (x, y) => Math.sin(x * .45 + p[0]) * 1.2 + Math.sin(y * .38 + p[1]) * 1.2 + Math.sin((x + y) * .25 + p[2]) * 1.5 + Math.sin((x - y) * .6 + p[3]) * .6;
  for (let x = 0; x < BW; x++) for (let y = 0; y < BD; y++) {
    const dc = Math.hypot(x - 7.5, y - 7.5) / 8;
    let h;
    if (type == 'island') h = Math.round(2.6 + H(x, y) * .8 - dc * dc * 4.2);
    else if (type == 'mountain') h = Math.round(3 + H(x, y) * 1.4 + (1 - dc) * 5.5);
    else h = Math.round(1.6 + H(x, y) * .6);
    if (type == 'island' && h < 1) { set(x, y, 0, 10); continue; }
    h = Math.max(1, Math.min(BH - 3, h));
    for (let z = 0; z < h; z++) {
      const top = z == h - 1;
      let v;
      if (type == 'desert') v = z < h - 2 ? 3 : 9;
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
  }
  if (type == 'desert') { for (let x = 1; x < 5; x++) for (let y = 10; y < 14; y++) if (Math.max(Math.abs(x - 2.5), Math.abs(y - 11.5)) < 2) set(x, y, 1, 10); }
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
  const add = (n, f) => { const c = []; f((x, y, z, v) => c.push([x, y, z, v])); L.push({ n, c }); };
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
  return L;
})();

/* ---- blueprints: copy the see-through build. Saved by id (S.bb.bp); old: the index in the old list (S.bb.ch) ---- */
const BBP = [
  { id: 'tower', n: 'Stone Tower', old: 0, c: () => [1, 2, 3].map(z => [6, 6, z, 3]) },
  { id: 'stairs', n: 'Stairs', c: () => { const o = []; for (let x = 5; x <= 7; x++) for (let z = 1; z <= 8 - x; z++) o.push([x, 6, z, 4]); return o; } },
  { id: 'wall', n: 'Brick Wall', old: 1, c: () => { const o = []; for (let x = 4; x <= 7; x++) for (let z = 1; z <= 2; z++) o.push([x, 6, z, 8]); return o; } },
  { id: 'gate', n: 'Garden Gate', c: () => { const o = []; for (const x of [5, 8]) for (let z = 1; z <= 3; z++) o.push([x, 6, z, 3]); for (let x = 5; x <= 8; x++) o.push([x, 6, 4, 4]); return o; } },
  { id: 'tree', n: 'Tree', old: 2, c: () => { const o = [[6, 6, 1, 5], [6, 6, 2, 5], [6, 6, 3, 5], [6, 6, 5, 6]]; for (let x = 5; x <= 7; x++) for (let y = 5; y <= 7; y++) o.push([x, y, 4, 6]); return o; } },
  { id: 'bridge', n: 'Rainbow Bridge', old: 5, c: () => [[3, 6, 1, 12], [4, 6, 2, 12], [5, 6, 3, 12], [6, 6, 3, 12], [7, 6, 3, 12], [8, 6, 2, 12], [9, 6, 1, 12], [4, 6, 1, 13], [5, 6, 2, 13], [7, 6, 2, 13], [8, 6, 1, 13], [6, 6, 1, 10], [5, 6, 1, 10], [7, 6, 1, 10]] },
  { id: 'pond', n: 'Pond', old: 3, c: () => { const o = []; for (let x = 4; x <= 7; x++) for (let y = 4; y <= 7; y++) o.push([x, y, 1, x > 4 && x < 7 && y > 4 && y < 7 ? 10 : 9]); return o; } },
  { id: 'snowman', n: 'Snowman', old: 4, c: () => { const o = []; for (let x = 5; x <= 7; x++) for (let y = 5; y <= 7; y++) o.push([x, y, 1, 11]); for (const [x, y] of [[6, 6], [5, 6], [7, 6], [6, 5], [6, 7]]) o.push([x, y, 2, 11]); o.push([6, 6, 3, 11], [6, 6, 4, 13]); return o; } },
  { id: 'boat', n: 'Sail Boat', c: () => { const o = []; for (let x = 4; x <= 8; x++) o.push([x, 6, 1, 4]); for (let x = 5; x <= 7; x++) o.push([x, 5, 1, 4], [x, 7, 1, 4]); o.push([4, 6, 2, 4], [8, 6, 2, 4]); for (let z = 2; z <= 4; z++) o.push([6, 6, z, 5]); o.push([7, 6, 3, 12], [7, 6, 4, 12], [6, 6, 5, 13]); return o; } },
  { id: 'castle', n: 'Castle Tower', old: 7, c: () => { const o = []; for (let x = 5; x <= 7; x++) for (let y = 5; y <= 7; y++) { if (x == 6 && y == 6) continue; for (let z = 1; z <= 3; z++) o.push([x, y, z, 3]); if ((x + y) % 2 == 0) o.push([x, y, 4, 3]); } o.push([6, 6, 1, 14]); return o; } },
  { id: 'house', n: 'Little House', old: 6, c: () => { const o = []; for (let x = 5; x <= 7; x++) for (let y = 5; y <= 7; y++) { if (x == 6 && y == 6) continue; for (let z = 1; z <= 2; z++) { if (x == 6 && y == 7 && z == 1) continue; o.push([x, y, z, x == 5 && y == 6 && z == 2 || x == 7 && y == 6 && z == 2 ? 7 : 4]); } } for (let x = 4; x <= 8; x++) for (let y = 5; y <= 7; y++) o.push([x, y, 3, 8]); return o; } },
  { id: 'pyramid', n: 'Pyramid', old: 8, c: () => { const o = []; for (let x = 4; x <= 8; x++) for (let y = 4; y <= 8; y++) o.push([x, y, 1, 9]); for (let x = 5; x <= 7; x++) for (let y = 5; y <= 7; y++) o.push([x, y, 2, 9]); o.push([6, 6, 3, 14]); return o; } },
  { id: 'palace', n: 'Diamond Palace', old: 9, c: () => { const o = []; for (let x = 3; x <= 8; x++) for (let y = 3; y <= 8; y++) { const edge = x == 3 || x == 8 || y == 3 || y == 8; if (!edge) continue; const corner = (x == 3 || x == 8) && (y == 3 || y == 8); for (let z = 1; z <= (corner ? 4 : 2); z++) o.push([x, y, z, corner ? 3 : (z == 2 && (x == 5 || x == 6 || y == 5 || y == 6) ? 7 : 8)]); } for (let z = 1; z <= 3; z++) o.push([5, 5, z, 15]); o.push([5, 5, 4, 16]); return o; } },
];
const BB_OLD = BBP.filter(b => b.old != null).sort((a, b) => a.old - b.old).map(b => b.id); // the old list's order (S.bb.ch)
const bbGoal = bp => new Map(bp.c().map(([a, b, z, v]) => [bbI(a + 2, b + 2, z), v]));
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
// a blueprint is open when it is the first, or one before it (or itself, or any later one) has stars: nothing done ever locks again
function bbOpen(i) {
  if (i <= 0) return true;
  for (let j = i - 1; j < BBP.length; j++) if (bbStars(j) > 0) return true;
  return false;
}
function bbHubLine() {
  const n = BBP.filter((b, i) => bbStars(i) > 0).length;
  return `<span>Build your own 3D world</span><span>${ico('blocks', 18)}<b>${n} of ${BBP.length}</b> blueprints</span>`;
}

/* ---- free-build goals (saved per world as goals {id: 1}) ---- */
const BB_GOALS = [
  ['ten', 'Build 10 blocks', 'plus'],
  ['tower', 'Build a tower 6 blocks tall', 'arrow-up'],
  ['kinds', 'Use 5 kinds of blocks', 'palette'],
  ['pethouse', 'Make a house for your pet: a roof over My Pet', 'home'],
  ['night', 'Light a lamp at night', 'moon'],
  ['boom', 'Set off a TNT block with Boom', 'sparkle'],
];
const bbGoalsOf = w => (w && w.goals && typeof w.goals == 'object' ? w.goals : {});
const bbGoalN = w => BB_GOALS.filter(g => bbGoalsOf(w)[g[0]]).length;

/* ---- the builder's logic, with no screen: camera, drawing, hit test, targets, blueprint layers, undo ----
   bbMake(w, goal): w the world (Uint8Array), goal a Map index -> block for a blueprint (or null). The play screen sizes it (size),
   draws it (render) and sends it taps (tap). Coordinates passed in are canvas pixels (CSS px x dpr). */
function bbMake(w, goal) {
  const E = {
    w, goal: goal || null, sel: 4, tool: 'build', side: false, miss: 0, missAt: new Set(), undo: [], redo: [], placed: new Set(),
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
  E.layer = () => {
    if (!E.goal) return null;
    let L = null;
    for (const [i, v] of E.goal) if (E.w[i] != v) { const z = Math.floor(i / (BW * BD)); if (L == null || z < L) L = z; }
    return L;
  };
  E.todo = () => { const L = E.layer(); return L == null ? [] : [...E.goal].filter(([i, v]) => E.w[i] != v && Math.floor(i / (BW * BD)) == L).map(([i]) => i); };
  E.prog = () => (E.goal ? [...E.goal].filter(([i, v]) => E.w[i] == v).length : 0);
  E.done = () => !!E.goal && E.prog() == E.goal.size;

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
    const L = E.layer(), faces = [], items = [];
    const drop = E.drop;
    for (let k = 0; k < BH; k++) for (let j = 0; j < BD; j++) for (let i = 0; i < BW; i++) {
      const idx = bbI(i, j, k), v = E.w[idx];
      let g = 0;
      if (!v) { if (E.goal && E.goal.has(idx)) g = E.goal.get(idx); else continue; }
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
          const fl = bbFlat3(g), im = fast ? null : bbFaceImgs(g);
          cube(it, (f, nx, ny, O, U, V) => { if (im) tf(im[(f == 'top' ? 't' : f) + (E.night ? 'n' : '')], O, U, V, false); else fillPoly(poly4(O, U, V), fl[f == 'top' ? 0 : f == 'l' ? 1 : 2]); });
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
    if (E.goal) return E.bpTap(px, py);
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
    const want = E.goal.get(idx);
    if (E.sel != want) {
      const counted = sure && !E.missAt.has(idx);
      if (counted) { E.miss++; E.missAt.add(idx); }
      return { kind: 'wrong', want, idx, counted };
    }
    E.push();
    E.w[idx] = want;
    return { kind: 'place', cells: [idx], layer: E.layer(), win: E.done() };
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
function blockBuilder(ci) {
  const bs = bbS(), bp = ci == null ? null : BBP[ci], world = bp ? null : bs.worlds[bs.cur];
  const E = BB = bbMake(bp ? bbFlat() : bbDecode(world.d), bp ? bbGoal(bp) : null);
  E.ch = bp ? ci : null;
  E.world = world;
  E.stamp = 0;
  const need = bp ? [...new Set(E.goal.values())] : null;
  if (need) E.sel = need[0];
  const lockLeft = b => (b.need && S.stars < b.need ? b.need - S.stars : 0);
  const blockBtn = i => {
    const b = BLOCKS[i], left = need ? 0 : lockLeft(b);
    return `<button class="bb-k${left ? ' lock' : ''}" data-b="${i}" aria-pressed="false" aria-label="${esc(b.n + (left ? ': ' + left + ' more stars to unlock' : ''))}">` +
      `<canvas width="96" height="96" data-bc="${i}" aria-hidden="true"></canvas>` +
      (left ? `<span class="bb-kn bb-kl">${ico('lock', 16)}${left} more</span>` : `<span class="bb-kn">${esc(b.n)}</span>`) + '</button>';
  };
  const groups = need ? [['Blocks for this build', need]] : BB_GROUPS;
  const pal = groups.map(([g, ids]) => `<div class="bb-grp"><span class="bb-gh">${esc(g)}</span><div class="bb-gb">${ids.map(blockBtn).join('')}</div></div>`).join('');
  const stamps = BBSTAMPS.map((t, i) => `<button class="bb-k bb-sk" data-stamp="${i}" aria-pressed="${i == 0}" aria-label="${esc(t.n)}">` +
    `<canvas width="96" height="96" data-sc="${i}" aria-hidden="true"></canvas><span class="bb-kn">${esc(t.n)}</span></button>`).join('');
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
   <div class="bb-wrap${bp ? ' bb-isbp' : ''}"><div class="bb-cv" id="bbcv"><canvas id="bbc" role="img" aria-label="Your build"></canvas><div class="bb-msg" id="bbmsg" aria-live="polite"></div><div class="bb-tip" id="bbtip"></div></div>
    <div class="bb-side"><div class="bb-bar">${bar}</div>
     <div class="bb-pal" id="bbpal"><div class="bb-ps">${pal}</div></div>${bp ? '' : `<div class="bb-pal" id="bbst" hidden><div class="bb-ps"><div class="bb-grp"><span class="bb-gh">Stamps</span><div class="bb-gb">${stamps}</div></div></div></div>`}</div></div>`);
  const cv = $('#bbc'), x = cv.getContext('2d'), wrap = $('#bbcv');
  const bg = bbCanvas(1), bgx = bg.getContext('2d');
  let dpr = Math.min(2, devicePixelRatio || 1);
  const FX = { parts: [], fuses: [], lit: new Set(), shake: 0, dirty: 1, last: 0, flash: [], anim: null, hold: null };
  E.animals = [];
  const pet = () => bbPetImg(() => { E.dirty = 1; });
  const redraw = () => { E.dirty = 1; };

  // the whole scene into the back buffer (only when something changed); fast = flat colours while the view turns
  function scene(fast) {
    const W = cv.width, H = cv.height, A = E.a();
    const g = bgx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, bbCol(E.night ? 'sc:night' : 'sc:sky'));
    g.addColorStop(1, bbCol(E.night ? 'sc:night-1' : 'sc:sky-1'));
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
    dpr = Math.min(2, devicePixelRatio || 1);
    const W = Math.round(r.width * dpr), H = Math.round(r.height * dpr);
    if (E.sized && W == cv.width && H == cv.height) return;
    cv.width = bg.width = W;
    cv.height = bg.height = H;
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
        const e = pick(['🐷', '🐔', '🐑', '🐄', '🐰', '🐱', '🐶', '🦆']);
        E.animals.push({ e, x: a, y: b, z, fx: a, fy: b, fz: z, tx: a, ty: b, tz: z, hop: 1, t: .5, dir: 1 });
        tone(660, .08, 0, 'sine', .12); tone(990, .08, .08, 'sine', .12);
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
    setTimeout(() => { SFX.magic(); say1('Goal done: ' + G[1] + '!', 'good', 2600); }, 250);
    goalChip();
  }
  function goalChip() { const c = $('#bbgoal'); if (c) c.textContent = bbGoalN(world) + '/' + BB_GOALS.length; }
  function checkGoals(placed) {
    if (!world) return;
    world.n = (world.n | 0) + placed.length;
    const kinds = new Set(Array.isArray(world.kinds) ? world.kinds : []);
    for (const n of placed) kinds.add(E.w[n]);
    world.kinds = [...kinds].filter(v => v > 0 && v < BLOCKS.length);
    if (world.n >= 10) goal('ten');
    if (world.kinds.length >= 5) goal('kinds');
    for (const n of placed) {
      const [i, j, k] = cellXYZ(n);
      // a stack of 6 blocks built here (this visit), ending at or through this cell
      let lo = k, hi = k;
      while (lo > 0 && E.placed.has(bbI(i, j, lo - 1)) && E.w[bbI(i, j, lo - 1)]) lo--;
      while (hi < BH - 1 && E.placed.has(bbI(i, j, hi + 1)) && E.w[bbI(i, j, hi + 1)]) hi++;
      if (hi - lo + 1 >= 6) goal('tower');
      if (E.w[n] == 22 && E.night) goal('night');
    }
    for (let n = 0; n < E.w.length; n++) if (E.w[n] == BB_PET) {
      const [i, j, k] = cellXYZ(n);
      for (let z = k + 1; z <= k + 3; z++) if (bbOpaque(E.get(i, j, z))) { goal('pethouse'); break; }
      break;
    }
  }

  /* ---- after a change: save, progress, buttons ---- */
  function bbProg() {
    const p = $('#bbprog');
    if (p) p.textContent = E.prog() + '/' + E.goal.size + (E.miss ? ' · ' + E.miss + (E.miss == 1 ? ' mistake' : ' mistakes') : '');
  }
  function after() {
    if (bp) bbProg(); else bbSave();
    for (const [id, ok] of [['#bbundo', E.undo.length], ['#bbredo', E.redo.length]]) { const b = $(id); if (b) b.setAttribute('aria-disabled', ok ? 'false' : 'true'); }
    E.dirty = 1;
  }
  let lastLayer = E.layer();
  function layerNote() {
    const L = E.layer();
    if (!bp || L == null || L === lastLayer) { lastLayer = L; return; }
    lastLayer = L;
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
      flash(r.cells);
      after();
      if (bp) { if (r.win) setTimeout(bbWin, 450); else layerNote(); } else checkGoals(r.cells);
    } else if (r.kind == 'break') {
      SFX.hit(); puff(...r.at, r.v); after();
    } else if (r.kind == 'light') {
      light(...r.at, 1.6); say1('Stand back! 3, 2, 1...', 'info', 1500);
    } else if (r.kind == 'notnt') {
      say1('Boom lights TNT. Tap a red TNT block!', 'info');
    } else if (r.kind == 'wrong') {
      SFX.wrong();
      say1('This one needs ' + BLOCKS[r.want].n + '. It is shining below.', 'try', 2400);
      hintBlock(r.want);
      bbProg();
      FX.pulse = { n: r.idx, t: performance.now() };
    } else if (r.kind == 'miss') {
      say1('Tap a see-through block to build it.', 'info');
      FX.pulse = { all: 1, t: performance.now() };
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
        an.x = an.fx + (an.tx - an.fx) * k; an.y = an.fy + (an.ty - an.fy) * k; an.z = an.fz + (an.tz - an.fz) * k + Math.sin(k * Math.PI) * .45;
      } else {
        const cz = E.topZ(Math.round(an.x), Math.round(an.y));
        if (cz > 0 && cz != an.z) an.z = cz;
        an.t -= dt;
        if (an.t <= 0) {
          an.t = .5 + Math.random() * 1.4;
          const [dx, dy] = pick([[1, 0], [-1, 0], [0, 1], [0, -1]]), nx = Math.round(an.x) + dx, ny = Math.round(an.y) + dy, nz = E.topZ(nx, ny);
          if (nx >= 0 && ny >= 0 && nx < BW && ny < BD && nz > 0 && nz < BH && Math.abs(nz - Math.round(an.z)) <= 1 && E.get(nx, ny, nz - 1) != 10) {
            Object.assign(an, { fx: an.x, fy: an.y, fz: Math.round(an.z), tx: nx, ty: ny, tz: nz, hop: 0, dir: dx - dy || an.dir });
          }
        }
      }
    }
    for (const p of FX.parts) { p.l -= dt; if (p.vx !== undefined) { p.x += p.vx * dt * 20; p.y += p.vy * dt * 20; if (!p.smoke) p.vy += E.a() * dt * 1.6; } }
    FX.parts = FX.parts.filter(p => p.l > 0);
    FX.flash = FX.flash.filter(f => now - f.t < 900);
    if (FX.pulse && now - FX.pulse.t > 1200) FX.pulse = null;
    if (E.dirty) { scene(fast); E.dirty = 0; }
    const busy = FX.parts.length || FX.fuses.length || E.animals.length || FX.shake > 0 || FX.flash.length || FX.pulse || G1.aim || G1.hold;
    if (!busy) { if (FX.dirty) { x.setTransform(1, 0, 0, 1, 0, 0); x.drawImage(bg, 0, 0); FX.dirty = 0; } return; }
    FX.dirty = 1;
    const A = E.a();
    let sh = 0;
    if (FX.shake > 0) { FX.shake -= dt; sh = (Math.random() - .5) * A * .6 * FX.shake; }
    x.setTransform(1, 0, 0, 1, 0, 0);
    x.drawImage(bg, sh, sh * .7);
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
    // animals (emoji are content pictures here)
    x.textAlign = 'center'; x.textBaseline = 'bottom'; x.font = `${Math.round(A * 1.3)}px sans-serif`;
    const order = E.animals.map(an => { const c = Math.cos(E.ang), s = Math.sin(E.ang), dx = an.x - E.F[0], dy = an.y - E.F[1]; return [dx * c - dy * s + dx * s + dy * c, an]; }).sort((p, q) => p[0] - q[0]);
    for (const [, an] of order) {
      const p = E.proj(an.x + .5, an.y + .5, an.z), gd = E.proj(an.x + .5, an.y + .5, Math.floor(an.z + .01));
      an.sx = p[0]; an.sy = p[1] - A * .4;
      x.fillStyle = bbA('ink', .18); x.beginPath(); x.ellipse(gd[0], gd[1], A * .35, A * .15, 0, 0, 7); x.fill();
      x.save(); x.translate(p[0], p[1] + A * .1); if (an.dir < 0) x.scale(-1, 1); x.fillStyle = bbCol('ink'); x.fillText(an.e, 0, 0); x.restore();
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
      x.imageSmoothingEnabled = false; x.drawImage(cv, fx - src / 2, fy - src / 2, src, src, lx - Rr, ly - Rr, Rr * 2, Rr * 2); x.restore();
      x.strokeStyle = bbCol('white'); x.lineWidth = 5 * dpr; x.beginPath(); x.arc(lx, ly, Rr, 0, 7); x.stroke();
      x.strokeStyle = bbA('ink', .45); x.lineWidth = 1.5 * dpr; x.beginPath(); x.arc(lx, ly, Rr + 3 * dpr, 0, 7); x.stroke();
      x.strokeStyle = bbCol('ink'); x.lineWidth = 2.5 * dpr; x.beginPath();
      x.moveTo(lx - 10 * dpr, ly); x.lineTo(lx + 10 * dpr, ly); x.moveTo(lx, ly - 10 * dpr); x.lineTo(lx, ly + 10 * dpr); x.stroke();
    }
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
  const G1 = { ptrs: new Map(), g: null, pinch: null, aim: false, prev: null, fp: null, hold: null };
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
    if (g.mode == 'pan') { E.pan(p[0] - g.last[0], p[1] - g.last[1]); g.last = p; E.dirty = 1; }
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
    build: 'Tap to build. Drag to look around.',
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
    const i = +b.dataset.b, B = BLOCKS[i], left = need ? 0 : lockLeft(B);
    if (left) { SFX.wrong(); anim(b, 'sad'); say1(`Earn ${left} more ${left == 1 ? 'star' : 'stars'} in learning to unlock ${B.n}.`, 'info', 2800); return; }
    E.sel = i;
    for (const q of $$('[data-b]')) q.setAttribute('aria-pressed', String(q == b));
    SFX.pop(2);
    // choosing a block never switches the tool without saying so (R-02 #16)
    if (!bp && (E.tool == 'break' || E.tool == 'boom' || E.tool == 'clear')) { setTool('build', true); say1('Build: ' + B.n, 'info', 1400); anim($('#bbm-build'), 'jump'); }
  };
  for (const b of $$('[data-stamp]')) b.onclick = () => {
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
    E.rot = E.rot + d;
    FX.anim = { t0: performance.now(), ms: 360, ang0: E.ang, ang: E.rot * Math.PI / 2 };
    SFX.whoosh();
  };
  $('#bbrl').onclick = () => turn(-1);
  $('#bbrr').onclick = () => turn(1);
  const zoomBy = k => { FX.anim = { t0: performance.now(), ms: 240, zoom0: E.zoom, zoom: Math.max(E.zMin(), Math.min(E.zMax(), E.zoom * k)) }; SFX.pop(1); };
  $('#bbzi').onclick = () => zoomBy(1.4);
  $('#bbzo').onclick = () => zoomBy(1 / 1.4);
  if ($('#bbmore')) $('#bbmore').onclick = () => more();
  // More: the shape tools, Clear area, night, animals, building on the sides, the goals
  function more() {
    const t = (id, icon, label, on) => `<button class="bb-mt" data-mt="${id}" aria-pressed="${on ? 'true' : 'false'}">${bbIco(icon, 28)}<span>${esc(label)}</span></button>`;
    const g = bbGoalsOf(world);
    const s = UI.sheet(`<div class="bb-sheet bb-more"><h2>More tools</h2>
      <div class="bb-mts">${t('line', 'line', 'Line', E.tool == 'line')}${t('wall', 'wall', 'Wall', E.tool == 'wall')}${t('floor', 'floor', 'Floor', E.tool == 'floor')}` +
      `${t('clear', 'trash', 'Clear area', E.tool == 'clear')}${t('night', E.night ? 'sparkle' : 'moon', E.night ? 'Day' : 'Night', false)}${t('pet', 'paw', 'Add animal', false)}</div>
      ${UI.sw('Build on the sides of blocks', E.side, 'bbside')}
      <h3>Goals in this world</h3><ul class="bb-goals">${BB_GOALS.map(([id, txt, ic]) => `<li class="${g[id] ? 'on' : ''}">${ico(g[id] ? 'check-circle' : ic, 24)}<span>${esc(txt)}</span></li>`).join('')}</ul>
      <div class="acts">${UI.btn('Done', { kind: 'primary', size: 'lg', icon: 'check', id: 'bbmdone', wide: true })}</div></div>`);
    s.el.querySelector('#bbmdone').onclick = () => s.close();
    const sw = s.el.querySelector('#bbside');
    if (sw) sw.onchange = () => { E.side = !!sw.checked; say1(E.side ? 'Tap the side of a block to build next to it.' : 'Taps build on top again.', 'info'); };
    for (const b of s.el.querySelectorAll('[data-mt]')) b.onclick = () => {
      const k = b.dataset.mt;
      s.close();
      if (k == 'night') { E.night = !E.night; E.dirty = 1; SFX.whoosh(); if (E.night && E.w.includes(22)) goal('night'); return; }
      if (k == 'pet') { spawn(); return; }
      setTool(E.tool == k ? 'build' : k);
      SFX.pop(1);
    };
  }
  E.setNight = on => { E.night = !!on; E.dirty = 1; };

  GH.wire({quit: () => { bbSave(); gtStop(); bbMenu(); }});
  // the palette pictures, the stamp pictures
  for (const c of $$('[data-bc]')) bbIcon(c.getContext('2d'), +c.dataset.bc, c.width);
  for (const c of $$('[data-sc]')) bbMini(c, BBSTAMPS[+c.dataset.sc].c.map(([a, b, z, v]) => [a + 8, b + 8, z, v]));
  const selBtn = $(`[data-b="${E.sel}"]`);
  if (selBtn) selBtn.setAttribute('aria-pressed', 'true');
  BB.api = { tap: E.tap, hit: E.hit, get faces() { return E.faces; }, proj: E.proj, size, scene: () => scene(false), say: say1 };
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
  if (S.voice) setTimeout(() => say(bp ? `Build the ${bp.n}! Tap the see-through blocks.` : 'Tap to build! Drag to look around.'), 300);
}
const BB_HOLD = 300, BB_SLOP = 10; // ms a finger rests before aiming starts; CSS px a finger moves before it drags the view
// convex hull of points (the outline of a cube on screen)
function bbHull(pts) {
  const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]), cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [], hi = [];
  for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  for (let n = p.length - 1; n >= 0; n--) { const q = p[n]; while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], q) <= 0) hi.pop(); hi.push(q); }
  return lo.slice(0, -1).concat(hi.slice(0, -1));
}
function bbWin() {
  if (!BB || BB.ch == null || !$('#bbc')) return;
  const ci = BB.ch, P0 = BBP[ci], st = BB.miss <= 1 ? 3 : BB.miss <= 4 ? 2 : 1, bp = bbBP(), old = bp[P0.id] || 0;
  bp[P0.id] = Math.max(old, st);
  if (P0.old != null) { const ch = bbS().ch = Array.isArray(bbS().ch) ? bbS().ch : []; ch[P0.old] = Math.max(ch[P0.old] || 0, st); }
  const coins = Math.max(0, st - old) * 3 + 1;
  S.coins += coins;
  save();
  SFX.fanfare();
  if (S.voice) say(st == 3 ? 'Perfect build! Three stars!' : 'You built it!');
  // P4-16: the shared end card
  const o = GH.end('blocks', {
    win: true, title: `${P0.n} built!`, stars: st,
    stats: [[String(BB.miss), BB.miss == 1 ? 'mistake' : 'mistakes', 'blocks'], ['+' + coins, 'coins', 'coin']],
    lines: BB.miss ? [] : [['check-circle', 'No mistakes!']],
    btns: (ci + 1 < BBP.length ? UI.btn('Next build', { kind: 'primary', size: 'lg', icon: 'go', id: 'bbnx', wide: true }) : '') +
      UI.btn('Again', { icon: 'replay', id: 'bbre', wide: true }) + UI.btn('All builds', { icon: 'blocks', id: 'bbls', wide: true }),
  });
  const go = f => { o.remove(); f(); };
  if (o.querySelector('#bbnx')) o.querySelector('#bbnx').onclick = () => go(() => blockBuilder(ci + 1));
  o.querySelector('#bbre').onclick = () => go(() => blockBuilder(ci));
  o.querySelector('#bbls').onclick = () => go(() => { gtStop(); bbMenu(); });
}
function bbSave() {
  if (!BB || BB.ch != null || !BB.world) return;
  BB.world.d = bbEncode(BB.w);
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

/* ---- the menu: blueprints first (visible without scrolling), then the worlds with their goals, then how to play ---- */
const BBWT = [['island', 'Island', 'Hills, beach, trees and sea'], ['mountain', 'Mountains', 'Tall peaks with snow on top'], ['desert', 'Desert', 'Sand, cactus and an oasis'], ['flat', 'Flat', 'Empty grass for big builds']];
const bbCells = w => { const o = []; for (let n = 0; n < w.length; n++) if (w[n]) o.push([n % BW, Math.floor(n / BW) % BD, Math.floor(n / (BW * BD)), w[n]]); return o; };
function bbMenu() {
  const bs = bbS(), stars = BBP.reduce((s, b, i) => s + bbStars(i), 0);
  const bpCard = (b, i) => {
    const ok = bbOpen(i), sv = bbStars(i), n = b.c().length;
    return `<button class="bb-bp${ok ? '' : ' lock'}${sv ? ' done' : ''}" data-ch="${i}" aria-label="${esc((i + 1) + '. ' + b.n + (ok ? '' : ', locked'))}">` +
      `<span class="bb-bpic"><canvas width="200" height="150" data-bpc="${i}" aria-hidden="true"></canvas>${ok ? '' : `<span class="bb-lk">${ico('lock', 26)}</span>`}</span>` +
      `<span class="bb-bpn">${i + 1}. ${esc(b.n)}</span>` +
      (ok ? `<span class="bb-bps">${UI.stars(sv, 3, 20)}<span>${n} blocks</span></span>` : `<span class="bb-bpl">Finish ${esc(BBP[i - 1].n)} first</span>`) + '</button>';
  };
  const wCard = (w, i) => {
    const d = bbDecode(w.d), n = d.filter(v => v).length, gn = bbGoalN(w);
    return `<div class="bb-wrow"><button class="bb-w" data-w="${i}" aria-label="${esc('Play ' + w.name)}"><span class="bb-wpic"><canvas width="220" height="150" data-wc="${i}" aria-hidden="true"></canvas></span>` +
      `<span class="bb-wi"><b>${esc(w.name)}</b><span>${n} blocks</span><span class="bb-wg">${ico('target', 18)}${gn} of ${BB_GOALS.length} goals</span></span>` +
      `<span class="bb-go" aria-hidden="true">${ico('play')}</span></button>` +
      (bs.worlds.length > 1 ? UI.ibtn('trash', 'Delete ' + w.name, { size: 'sm', cls: 'bb-del', attrs: `data-del="${i}"` }) : '') + '</div>';
  };
  const how = [['build', 'Tap a spot to build on top of it.'], ['arrow-right', 'Drag one finger to look around. Pinch with two to zoom.'],
    ['closer', 'Closer and Farther zoom. Left and Right turn the island.'], ['stamp', 'Build, Break and Stamp are at the bottom.'],
    ['undo', 'Undo takes a step back. Redo puts it back.'], ['boom', 'Boom lights a TNT block. Building on TNT is safe.'],
    ['hint', 'Hold your finger still, then slide: the bubble shows where it goes.']];
  view(`${GH.top('blocks')}
  <div class="scroll bb-menu"><section class="bb-sec"><h2>${ico('blocks', 28)}<span>Blueprints</span><span class="bb-sc">${ico('star', 20, 'ic-star')}${stars} of ${BBP.length * 3}</span></h2>
   <p class="bb-lead">Copy the see-through build, one layer at a time.</p><div class="bb-bpg">${BBP.map(bpCard).join('')}</div></section>
  <section class="bb-sec"><h2>${ico('home', 28)}<span>My worlds</span></h2><div class="bb-wl">${bs.worlds.map(wCard).join('')}
   ${bs.worlds.length < 4 ? `<button class="bb-w bb-new" id="bbnew"><span class="bb-wpic bb-plus">${ico('plus', 40)}</span><span class="bb-wi"><b>New world</b><span>Island, mountains, desert or flat</span></span></button>` : ''}</div></section>
  <section class="bb-sec bb-how"><h2>${ico('info', 28)}<span>How to build</span></h2><ul>${how.map(([i, t]) => `<li>${bbIco(i, 26)}<span>${esc(t)}</span></li>`).join('')}</ul></section></div>`);
  GH.wire({ back: gameRoom });
  for (const b of $$('[data-ch]')) b.onclick = () => {
    const i = +b.dataset.ch;
    if (!bbOpen(i)) { SFX.wrong(); anim(b, 'sad'); fb('Finish ' + BBP[i - 1].n + ' first!', 'warn'); return; }
    if (ptLeft() <= 0) { SFX.wrong(); fb(ptWhyNot(), 'warn long', 3000); return; }
    SFX.whoosh();
    blockBuilder(i);
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
  if ($('#bbnew')) $('#bbnew').onclick = () => {
    const s = UI.sheet(`<div class="bb-sheet"><h2>Pick a world</h2><div class="bb-wl">${BBWT.map(([k, n, d]) => `<button class="bb-w" data-t="${k}"><span class="bb-wpic"><canvas width="220" height="150" data-tc="${k}" aria-hidden="true"></canvas></span>` +
      `<span class="bb-wi"><b>${esc(n)}</b><span>${esc(d)}</span></span></button>`).join('')}</div><div class="acts">${UI.btn('Cancel', { icon: 'close', id: 'bbwx', wide: true })}</div></div>`);
    s.el.querySelector('#bbwx').onclick = () => s.close();
    for (const c of s.el.querySelectorAll('[data-tc]')) bbMini(c, bbCells(bbGen(c.dataset.tc, 7)));
    for (const b of s.el.querySelectorAll('[data-t]')) b.onclick = () => {
      const t = BBWT.find(q => q[0] == b.dataset.t);
      bs.worlds.push({ name: `${t[1]} ${bs.worlds.length + 1}`, d: bbEncode(bbGen(t[0], R(1, 9999))) });
      bs.cur = bs.worlds.length - 1;
      save();
      s.close();
      SFX.magic();
      if (ptLeft() > 0) blockBuilder(); else bbMenu();
    };
  };
  // the pictures: each blueprint as it will look, each world as it is now
  const petImg = bbPetImg(() => { for (const c of $$('[data-wc]')) bbMini(c, bbCells(bbDecode(bs.worlds[+c.dataset.wc].d)), { pet: BBPETIMG && BBPETIMG.img }); });
  for (const c of $$('[data-bpc]')) bbMini(c, BBP[+c.dataset.bpc].c().map(([a, b, z, v]) => [a + 2, b + 2, z, v]));
  // the row of blueprints starts at the next one to build
  const nx = BBP.findIndex((b, i) => bbOpen(i) && !bbStars(i)), card = nx > 0 && $(`[data-ch="${nx}"]`);
  if (card && card.parentNode) card.parentNode.scrollLeft = Math.max(0, card.offsetLeft - card.parentNode.offsetLeft - 24);
  for (const c of $$('[data-wc]')) bbMini(c, bbCells(bbDecode(bs.worlds[+c.dataset.wc].d)), { pet: petImg });
}
/* ---------- 4x4 hill climb ---------- */
/* truck sound pack */
const ENG={jeep:[46,'sawtooth',0],buggy:[64,'sawtooth',0],monster:[33,'sawtooth',5],bike:[82,'square',0],tractor:[28,'square',9],bus:[37,'sawtooth',3]};
const hs=()=>S.sound&&(S.hcSnd||0)<2;
const HSND={
  scale:[72,74,76,79,81,84,86,88,91,93],
  coin(H){if(!hs())return;const now=H.t;H.cs=(now-(H.csT||-9)<1.2)?(H.cs||0)+1:0;H.csT=now;const m=this.scale[Math.min(H.cs,9)],w=['triangle','sine','square'][(H.cs/4|0)%3];tone(NOTE(m),.07,0,w,.06);tone(NOTE(m+12),.1,.05,'sine',.04)},
  cp(){if(!hs())return;const J=[[[72,0],[76,.1],[79,.2],[84,.3]],[[67,0],[72,.12],[79,.24],[76,.36],[84,.48]],[[84,0],[79,.08],[84,.16],[88,.3]],[[60,0],[64,.1],[67,.2],[72,.3],[76,.4],[79,.5]],[[76,0],[74,.1],[76,.2],[81,.32]]];
    let k;do{k=Math.floor(Math.random()*J.length)}while(k==this.lastJ&&J.length>1);this.lastJ=k;const wv=pick(['square','triangle']);J[k].forEach(([m,t])=>tone(NOTE(m),.18,t,wv,.06));noise(.3,.3,.03,3000,8000)},
  fuel(){if(!hs())return;for(let i=0;i<5;i++)tone(300+i*90+Math.random()*60,.07,i*.07,'sine',.08,200);tone(900,.15,.38,'triangle',.06)},
  crash(water){if(!hs())return;if(water)return;const k=Math.floor(Math.random()*4);
    if(k==0){noise(.35,0,.3,400,1500);tone(160,.25,0,'square',.1,60)}
    else if(k==1){tone(900,.6,0,'sine',.12,150)}
    else if(k==2){noise(.25,0,.25,2000,600);tone(520,.08,.05,'square',.08);tone(390,.08,.15,'square',.08);tone(260,.2,.25,'square',.08)}
    else{tone(140,.12,0,'triangle',.2,60);tone(300,.3,.12,'sine',.12,600);tone(600,.25,.35,'sine',.1,300)}
    if(Math.random()<.35)setTimeout(()=>SFX.giggle(),400)},
  land(v){if(!hs())return;tone(70+Math.random()*30,.18,0,'sine',Math.min(.25,v/2500),35);noise(.12,0,Math.min(.15,v/4000),300,120)},
  trick(mult){if(!hs())return;const b=[72,76,79,84][Math.min(3,mult-1)];[0,4,7,12].forEach((d,i)=>tone(NOTE(b+d),.1,i*.06,'square',.05))},
  shift(){if(!hs())return;tone(220,.05,0,'square',.025,140)},
  amb(st){if(!hs()||Math.random()<.25)return;
    if(st=='meadow'){const n=2+Math.floor(Math.random()*3),f=2200+Math.random()*1200;for(let i=0;i<n;i++)tone(f,.07,i*.11,'sine',.035,f*1.5)}
    else if(st=='jungle'){const f=900+Math.random()*500;tone(f,.12,0,'triangle',.04,f*1.8);tone(f*1.6,.12,.14,'triangle',.04,f*.9);if(Math.random()<.5)tone(500,.2,.35,'sawtooth',.02,700)}
    else if(st=='desert'){tone(2400,.5,0,'sine',.03,1600);noise(1.2,0,.025,300,900)}
    else if(st=='snow'){noise(1.6,0,.035,500,1500)}
    else if(st=='volcano'){noise(1.4,0,.06,60,180);tone(45,1.2,0,'sine',.08,30)}
    else if(st=='city'){const f=pick([330,392,440]);tone(f,.12,0,'square',.03);tone(f*1.26,.18,.15,'square',.03)}
    else if(st=='moon'){[0,1,2].forEach(i=>tone(1200+i*300,.06,i*.1,'sine',.03))}}};
let HC=null;
const PAINTS=[['#ef4444','Red',0],['#3b82f6','Blue',20],['#22c55e','Green',20],['#f59e0b','Orange',20],['#ec4899','Pink',30],['#a855f7','Purple',30],['#111827','Black',40],['#facc15','Gold',60]];
const UPG=[['engine','🔧 Engine','More speed and power'],['tires','🛞 Tires','Grip on hills, mud, sand and ice'],['tank','⛽ Fuel Tank','Drive farther on one tank']];
const UPCOST=[30,60,110,180,280];
const VEH={jeep:{n:'Trail Truck',e:'🛻',cost:0,R:20,L:74,acc:1,maxV:1,grip:1,lift:1,d:'All-around starter'},
  buggy:{n:'Dune Buggy',e:'🏎️',cost:250,R:17,L:70,acc:1.18,maxV:1.22,grip:.92,lift:1.2,d:'Super fast, but flips easily'},
  monster:{n:'Monster Truck',e:'🚙',cost:500,R:27,L:84,acc:.96,maxV:.95,grip:1.3,lift:.82,d:'Huge tires that climb anything'},
  bike:{n:'Dirt Bike',e:'🏍️',cost:350,R:18,L:58,acc:1.3,maxV:1.18,grip:.95,lift:1.55,d:'Wheelie machine! Flips easy'},
  tractor:{n:'Tractor',e:'🚜',cost:300,R:25,L:72,acc:.9,maxV:.78,grip:1.65,lift:.7,d:'Slow, but climbs walls'},
  bus:{n:'School Bus',e:'🚌',cost:450,R:21,L:112,acc:.86,maxV:.92,grip:1.1,lift:.5,d:'Long and steady, hard to flip'}};
const STAGES={
  meadow:{n:'Green Hills',e:'🌄',g:620,need:0,soft:'mud',sky:['#38bdf8','#dbeafe'],dirt:['#b45309','#78350f'],top:['#22c55e','#15803d'],far:'#94a3b8',far2:'#64748b',mid:'#4ade80',water:'#0284c7',prop:'tree',amp:130},
  desert:{n:'Desert Canyon',e:'🏜️',g:620,need:300,soft:'sand',sky:['#fb923c','#fef3c7'],dirt:['#d97706','#9a3412'],top:['#fcd34d','#f59e0b'],far:'#c2410c',far2:'#9a3412',mid:'#fdba74',water:'#0ea5e9',prop:'cactus',amp:120},
  snow:{n:'Snowy Peaks',e:'🏔️',g:620,need:600,soft:'ice',sky:['#7dd3fc','#f1f5f9'],dirt:['#94a3b8','#475569'],top:['#ffffff','#cbd5e1'],far:'#64748b',far2:'#475569',mid:'#e2e8f0',water:'#38bdf8',prop:'pine',amp:140},
  jungle:{n:'Jungle River',e:'🌴',g:620,need:450,soft:'mud',sky:['#22d3ee','#ecfccb'],dirt:['#92400e','#451a03'],top:['#65a30d','#3f6212'],far:'#15803d',far2:'#166534',mid:'#4d7c0f',water:'#0d9488',prop:'palm',amp:150},
  volcano:{n:'Volcano',e:'🌋',g:620,need:750,soft:'ash',lava:1,sky:['#450a0a','#f97316'],dirt:['#44403c','#1c1917'],top:['#57534e','#292524'],far:'#7f1d1d',far2:'#450a0a',mid:'#292524',water:'#f97316',prop:'deadtree',amp:150},
  city:{n:'Junk City',e:'🏙️',g:620,need:1050,soft:'oil',sky:['#6366f1','#fbcfe8'],dirt:['#525252','#262626'],top:['#a3a3a3','#525252'],far:'#4338ca',far2:'#312e81',mid:'#3730a3',water:null,prop:'lamp',amp:125},
  moon:{n:'The Moon',e:'🌙',g:250,tg:430,need:900,soft:null,sky:['#020617','#1e1b4b'],dirt:['#71717a','#3f3f46'],top:['#e4e4e7','#a1a1aa'],far:'#1e293b',far2:'#0f172a',mid:'#334155',water:null,prop:'antenna',amp:120}};
const SOFT={mud:{grip:.38,drag:.996,c:'#422006',c2:'#57341a',label:'MUD'},sand:{grip:.5,drag:.997,c:'#fbbf24',c2:'#f59e0b',label:'SAND'},ice:{grip:.22,drag:1,c:'#bae6fd',c2:'#e0f2fe',label:'ICE'},ash:{grip:.45,drag:.996,c:'#57534e',c2:'#a8a29e',label:'ASH'},oil:{grip:.24,drag:1,c:'#111827',c2:'#4c1d95',label:'OIL'}};
const HCMODES=[['free','🏁','Free Drive','Go as far as you can'],['cargo','📦','Delivery','Carry 3 crates. Land soft or they fall off!'],['coins','🪙','Coin Rush','60 seconds, free gas, grab every bolt'],['night','🌙','Night Drive','Headlights only. Double bolts!']];
const MISSIONS=[['dist',300,'Drive 300 m in one run',40],['dist',600,'Drive 600 m in one run',70],['dist',1000,'Drive 1,000 m in one run',120],['flips',1,'Do a flip',40],['flips',3,'Do 3 flips',90],
  ['bolts',40,'Collect 40 bolts in one run',40],['bolts',90,'Collect 90 bolts in one run',80],['perfect',3,'Land 3 perfect landings',60],['wheelie',1,'Do a 2-second wheelie',50],['air',2,'Get BIG AIR 2 times',50],['stage',1,'Drive 200 m in a new place',60]];
function garageS(){const g=S.garage||(S.garage={});Object.assign(g,Object.assign({bolts:0,up:{engine:0,tires:0,tank:0},paint:'#ef4444',paints:{'#ef4444':1},best:{},veh:'jeep',vehs:{jeep:1},missions:null,mode:'free',rush:{}},g));
  for(const k in STAGES)g.best[k]=g.best[k]||0;
  if(!g.missions||g.missions.length<3){g.missions=g.missions||[];while(g.missions.length<3){const m=pick(MISSIONS.filter(m=>!g.missions.some(x=>x.t==m[2])));g.missions.push({k:m[0],goal:m[1],t:m[2],r:m[3],p:0,done:false})}}return g}
const bestAll=()=>Math.max(...Object.values(garageS().best));
function rng(seed){return()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646}}
let HCLV=null;
const LVN=8,STKEYS=['meadow','desert','snow','jungle','volcano','city','moon'];
function lvDef(st,i){const si=STKEYS.indexOf(st),dist=240+i*105+si*70;return{id:st+i,st,i,si,dist,fx:100+dist*20,amp:Math.min(1.3,.5+i*.1+si*.06),haz:Math.min(.95,.3+i*.09+si*.04),pits:i>=2||si>0,lvf:Math.min(1,(i+si*2)/9),par:Math.round(dist/13)+8}}
function lvS(st){const g=garageS();g.lv=g.lv||{};return g.lv[st]=g.lv[st]||[]}
function lvOpen(st,i){if(i>0)return(lvS(st)[i-1]||0)>0;const si=STKEYS.indexOf(st);return bestAll()>=STAGES[st].need||si==0||(lvS(STKEYS[si-1])[LVN-1]||0)>0}
const FEAT={};
function feats(st){const key=st+(HCLV?'|'+HCLV.id:'');if(FEAT[key])return FEAT[key];const r=rng({meadow:4242,desert:991,snow:3131,moon:777,jungle:5151,volcano:6262,city:7373}[st]+(HCLV?HCLV.i*977+13:0)),out=[],S0=STAGES[st];let x=HCLV?1250:2600;
  while(x<(HCLV?HCLV.fx+3000:400000)){const lv=HCLV?HCLV.lvf:Math.min(1,x/50000),t=r(),cp=(x-100)%2000;
    if(HCLV&&(r()>HCLV.haz||Math.abs(x-HCLV.fx)<500)){x+=480;continue}
    if(cp>1500||cp<300){x+=420;continue}
    if(t<.34){const n=r()<.3+lv*.3?2:1;for(let i=0;i<n;i++)out.push({t:'rock',x:x+i*90,w:46+r()*34,h:18+r()*20*(.6+lv)});x+=520+r()*620}
    else if(t<.58&&S0.soft){const w=340+r()*360;out.push({t:'soft',x,w});x+=w+520+r()*500}
    else if(t<.86){if(HCLV&&!HCLV.pits){x+=300;continue}const w=HCLV?55+r()*25+lv*50:x<16000?55+r()*25:75+r()*40+lv*40;if(cp<900||cp+w>1700||Math.abs(baseH(x,st)-baseH(x-500,st))>55){x+=300;continue}out.push({t:'pit',x,w,d:st=='moon'?150:175});x+=w+900+r()*800}
    else x+=520}
  return FEAT[key]=out}
function featAt(x,st){const F=feats(st);let lo=0,hi=F.length-1;while(lo<hi){const m=(lo+hi+1)>>1;if(F[m].x<=x+200)lo=m;else hi=m-1}return[F[lo-1],F[lo],F[lo+1]].filter(Boolean)}
function baseH(x,st){if(x<350)return 0;const d=x-350,r=Math.min(1,d/500),S0=STAGES[st],A=Math.min(22+d*.0042*(HCLV?2.6:1),S0.amp)*r*(HCLV?HCLV.amp:1);
  if(st=='desert')return A*(Math.sin(d*.0032)*1+Math.sin(d*.0081+1.1)*.35+Math.sin(d*.019+2)*.1*Math.min(1,d/4000));
  if(st=='snow')return A*(Math.sin(d*.0046)*.85+Math.abs(Math.sin(d*.0068+.5))*.5-.25+Math.sin(d*.022+2.1)*.12*Math.min(1,d/4000));
  if(st=='jungle')return A*(Math.sin(d*.0038)*.8+Math.sin(d*.0091+.7)*.5+Math.sin(d*.027+2)*.14*Math.min(1,d/3000));
  if(st=='volcano')return A*(Math.sin(d*.003)*.7+Math.max(0,Math.sin(d*.0016+1))*.7+Math.sin(d*.013+.4)*.3+Math.sin(d*.031)*.1*Math.min(1,d/3000));
  if(st=='city'){const st2=Math.floor(d/260),sm=Math.min(1,(d%260)/60),hh=i=>Math.sin(i*1.7)*.6+Math.sin(i*.37)*.9;return A*(hh(st2-1)+(hh(st2)-hh(st2-1))*(sm*sm*(3-2*sm)))*.75}
  const k=st=='moon'?1.2:1;return A*(Math.sin(d*.0042*k)*.9+Math.sin(d*.0105*k+1.3)*.42+Math.sin(d*.021+2.1)*.12*Math.min(1,d/4000))+(st=='moon'?Math.max(0,Math.sin(d*.0021))*40*r:0)}
function terrH(x,st){let h=baseH(x,st);for(const f of featAt(x,st)){
    if(f.t=='rock'){const u=(x-f.x)/(f.w/2);if(u>-1&&u<1){const c=Math.cos(u*Math.PI/2);h+=f.h*c*Math.sqrt(c)}}
    else if(f.t=='pit'){const b=baseH(f.x,st);if(x>=f.x-170&&x<f.x)h=Math.max(h,b+70*Math.pow((x-f.x+170)/170,2));
      else if(x>=f.x&&x<=f.x+f.w){const e=Math.min(1,(x-f.x)/16,(f.x+f.w-x)/16);h=b-f.d*e}
      else if(x>f.x+f.w&&x<f.x+f.w+90)h=Math.min(h,b+(h-b)*((x-f.x-f.w)/90))}}
  return h}
const softAt=(x,st)=>STAGES[st].soft&&featAt(x,st).some(f=>f.t=='soft'&&x>=f.x&&x<=f.x+f.w)?SOFT[STAGES[st].soft]:null;
const pitAt=(x,st)=>featAt(x,st).find(f=>f.t=='pit'&&x>=f.x&&x<=f.x+f.w);
function fuelX(k,st='meadow'){let x=1500+k*2200+k*k*420;const p=featAt(x,st).find(f=>f.t=='pit'&&x>f.x-200&&x<f.x+f.w+100);return p?p.x+p.w+160:x}

/* textures */
const TEX={};
function texFor(st){if(TEX[st])return TEX[st];const S0=STAGES[st],c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),r=rng(st.length*99);
  x.fillStyle=S0.dirt[0];x.fillRect(0,0,128,128);
  for(let i=0;i<90;i++){x.fillStyle=`rgba(0,0,0,${.05+r()*.12})`;x.beginPath();x.ellipse(r()*128,r()*128,2+r()*6,1.5+r()*4,r()*3,0,7);x.fill()}
  for(let i=0;i<40;i++){x.fillStyle=`rgba(255,255,255,${.05+r()*.1})`;x.beginPath();x.arc(r()*128,r()*128,1+r()*2.5,0,7);x.fill()}
  return TEX[st]=c}

/* garage */
function garage(){const gs=garageS(),left=ptLeft(),v=VEH[gs.veh];
  view(`${GH.top('hill',{chips:`<span class="stat gh-nut" aria-label="Bolts">${ico('nut',32)}<b>${gs.bolts}</b></span>`})}
  <div class="scroll"><div class="stage" style="background:linear-gradient(180deg,#7dd3fc,#fef3c7)"><canvas id="gcv" role="img" aria-label="Your vehicle" width="420" height="230" style="width:min(420px,92vw);height:auto"></canvas><div class="hname">${v.e} ${v.n}</div></div>
  <div class="tipcard"><b>How to drive:</b> ▶ GAS goes, ◀ BRAKE slows and backs up. In the air, GAS tips you back and BRAKE tips you forward. Ease off GAS on steep hills or you'll flip! Flips, wheelies and perfect landings earn bonus bolts.</div>
  <h2>🎯 Missions</h2><div class="games">${gs.missions.map((m,i)=>`<div class="btn game upg mis" style="background:${m.done?'#dcfce7':'#fff'}"><span class="gi"><span class="gt" style="font-size:18px">${m.done?'✅':'🎯'} ${m.t}</span>
    <span class="meter" style="display:block;margin:4px 0;background:#f5f5f4"><span style="display:block;height:100%;width:${Math.min(100,m.p/m.goal*100)}%;background:linear-gradient(90deg,#22c55e,#14b8a6);border-radius:9px"></span></span></span>
    ${m.done?`<button class="btn sm" data-claim="${i}" style="background:#22c55e;color:#fff">Get 🔩${m.r}</button>`:`<b class="small">🔩 ${m.r}</b>`}</div>`).join('')}</div>
  <button class="btn game" id="hclv" style="background:linear-gradient(135deg,#fde68a,#f59e0b)"><span class="ge">🏆</span><span class="gi"><span class="gt">Levels</span><span class="small">${STKEYS.reduce((a,k)=>a+lvS(k).reduce((p,q)=>p+(q||0),0),0)} / ${STKEYS.length*LVN*3} ⭐ · ${STKEYS.length*LVN} tracks with a finish line</span></span><span class="go">▶</span></button>
  <h2>Drive</h2><div class="hcmodes">${HCMODES.map(([k,e,n,d])=>`<button class="btn hcmode ${gs.mode==k?'on':''}" data-mode="${k}"><span>${e}</span><b>${n}</b><small>${d}</small></button>`).join('')}</div><div class="games">${Object.entries(STAGES).map(([k,s])=>{const ok=bestAll()>=s.need;return`<button class="btn game ${ok?'':'soon'}" data-st="${k}" style="background:linear-gradient(135deg,${s.sky[1]},${s.top[0]})">
    <span class="ge">${s.e}</span><span class="gi"><span class="gt">${s.n}</span><span class="small">${ok?(gs.mode=='coins'?`Best rush: 🔩 ${gs.rush[k]||0}`:`Best: ${gs.best[k]} m`):`Drive ${s.need} m anywhere to unlock`}</span></span><span class="go">${ok?(left>0?'▶':'🎟️'):'🔒'}</span></button>`}).join('')}</div>
  <h2>Vehicles</h2><div class="vehs">${Object.entries(VEH).map(([k,V])=>`<button class="btn veh ${gs.veh==k?'on':''}" data-v="${k}"><canvas width="160" height="96" data-vc="${k}" aria-hidden="true"></canvas><b>${V.n}</b><span class="small">${V.d}</span><div>${gs.vehs[k]?(gs.veh==k?'✅ Driving':'Tap to drive'):'🔩 '+V.cost}</div></button>`).join('')}</div>
  <h2>Upgrades</h2><div class="games">${UPG.map(([k,t,d])=>{const lv=gs.up[k],cost=UPCOST[lv];return`<div class="btn game upg" style="background:#fff"><span class="gi"><span class="gt" style="font-size:20px">${t} <span class="lv">${'★'.repeat(lv)}${'☆'.repeat(5-lv)}</span></span><span class="small">${d}</span></span>
    ${lv<5?`<button class="btn sm" data-up="${k}" style="background:${gs.bolts>=cost?'#22c55e':'#e7e5e4'};color:${gs.bolts>=cost?'#fff':'#78716c'}">🔩 ${cost}</button>`:'<b>MAX</b>'}</div>`}).join('')}</div>
  <h2>Paint</h2><div class="paints">${PAINTS.map(([c,n,cost])=>`<button class="btn paint ${gs.paint==c?'on':''}" data-pc="${c}" aria-label="${esc(n+(gs.paint==c?', on':gs.paints[c]?'':', '+cost+' bolts'))}"><span style="background:${c}"></span>${gs.paints[c]?(gs.paint==c?'✅':n):'🔩 '+cost}</button>`).join('')}</div>
  <p class="small" style="text-align:center">Collect 🔩 bolts while you drive. Spend them here.</p></div>`);
  $('#back').onclick=gameRoom;drawTruckPreview();$$('[data-mode]').forEach(b=>b.onclick=()=>{gs.mode=b.dataset.mode;save();SFX.pop(2);const y=$('.scroll').scrollTop;garage();$('.scroll').scrollTop=y});$('#hclv').onclick=()=>{SFX.whoosh();hcLevels(STKEYS.filter(k=>lvOpen(k,0)).pop()||'meadow')};
  $$('[data-vc]').forEach(c=>{const x=c.getContext('2d');x.fillStyle='#16a34a';x.fillRect(0,84,160,12);const V=VEH[c.dataset.vc];drawVehicle(x,c.dataset.vc,80,84-V.R*.62-(V.R+6)*.62,0,.62,gs.paint,0,0,0)});
  $$('[data-st]').forEach(b=>b.onclick=()=>{const s=STAGES[b.dataset.st];if(bestAll()<s.need){SFX.wrong();anim(b,'sad');fb(`Drive ${s.need} m first!`,'warn');return}
    if(ptLeft()<=0){SFX.wrong();fb(ptWhyNot(),'warn long',3000);return}SFX.whoosh();hcStart(b.dataset.st)});
  $$('[data-v]').forEach(b=>b.onclick=()=>{const k=b.dataset.v,V=VEH[k];if(!gs.vehs[k]){if(gs.bolts<V.cost){SFX.wrong();anim(b,'sad');fb(`Need ${V.cost-gs.bolts} more bolts!`,'warn');return}gs.bolts-=V.cost;gs.vehs[k]=1;SFX.fanfare();confetti(30)}else SFX.pop(2);gs.veh=k;save();garage()});
  $$('[data-claim]').forEach(b=>b.onclick=()=>{const i=+b.dataset.claim,m=gs.missions[i];gs.bolts+=m.r;gs.missions.splice(i,1);garageS();save();SFX.fanfare();confetti(24);fb(`+${m.r} 🔩!`);garage()});
  $$('[data-up]').forEach(b=>b.onclick=()=>{const k=b.dataset.up,cost=UPCOST[gs.up[k]];if(gs.bolts<cost){SFX.wrong();anim(b,'sad');fb(`Need ${cost-gs.bolts} more bolts!`,'warn');return}
    gs.bolts-=cost;gs.up[k]++;save();SFX.fanfare();confetti(16);garage()});
  $$('[data-pc]').forEach(b=>b.onclick=()=>{const c=b.dataset.pc,cost=PAINTS.find(x=>x[0]==c)[2];if(!gs.paints[c]){if(gs.bolts<cost){SFX.wrong();anim(b,'sad');fb(`Need ${cost-gs.bolts} more bolts!`,'warn');return}gs.bolts-=cost;gs.paints[c]=1;SFX.magic()}
    else SFX.pop(2);gs.paint=c;save();garage()})}
function drawTruckPreview(){const cv=$('#gcv');if(!cv)return;const x=cv.getContext('2d'),gs=garageS(),V=VEH[gs.veh];x.clearRect(0,0,420,230);
  const g=x.createLinearGradient(0,196,0,230);g.addColorStop(0,'#22c55e');g.addColorStop(.25,'#a16207');g.addColorStop(1,'#78350f');x.fillStyle=g;x.fillRect(0,196,420,34);
  const sc=1.45;drawVehicle(x,gs.veh,210,196-V.R*sc-(V.R+6)*sc,0,sc,gs.paint,0,0,0)}
function shade(c,p){const n=parseInt(c.slice(1),16),f=v=>Math.max(0,Math.min(255,Math.round(v+(p<0?v*p:(255-v)*p))));return'#'+[n>>16,(n>>8)&255,n&255].map(f).map(v=>v.toString(16).padStart(2,'0')).join('')}
function rr(x,a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
function drawTruck(x,sx,sy,ang,sc,paint,r1,r2){drawVehicle(x,'jeep',sx,sy,ang,sc,paint,r1,r2,0)}
/* vehicle art: origin = body center, wheels at (±L/2, R+6) below */
function drawVehicle(x,type,sx,sy,ang,sc,paint,rot1,rot2,bob){const V=VEH[type],hw=V.L/2,wy=V.R+6;
  x.save();x.translate(sx,sy);x.rotate(-ang);x.scale(sc,sc);x.translate(0,bob||0);
  const gb=x.createLinearGradient(0,-50,0,14);gb.addColorStop(0,shade(paint,.4));gb.addColorStop(.5,paint);gb.addColorStop(1,shade(paint,-.4));const edge=shade(paint,-.55);
  // springs + axle arms
  x.strokeStyle='#52525b';x.lineWidth=3;for(const wx of[-hw,hw]){x.beginPath();x.moveTo(wx*.9,2);for(let i=1;i<=6;i++)x.lineTo(wx*.9+(i%2?4:-4)+(wx-wx*.9)*i/6,2+(wy-2)*i/6);x.stroke()}
  x.strokeStyle='#27272a';x.lineWidth=5;x.beginPath();x.moveTo(-hw,wy-4);x.lineTo(-hw*.4,6);x.lineTo(hw*.4,6);x.lineTo(hw,wy-4);x.stroke();
  if(type=='buggy'){
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2;x.beginPath();x.moveTo(-50,4);x.lineTo(-44,-10);x.lineTo(30,-12);x.lineTo(54,-2);x.lineTo(50,6);x.closePath();x.fill();x.stroke();
    x.strokeStyle='#3f3f46';x.lineWidth=3.5;x.beginPath();x.moveTo(-36,-10);x.lineTo(-24,-40);x.lineTo(8,-40);x.lineTo(24,-12);x.moveTo(-24,-40);x.lineTo(-6,-12);x.stroke();
    x.fillStyle='#fbbf24';x.beginPath();x.arc(-8,-26,9,Math.PI,0);x.fill();x.font='16px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(petE(),-8,-23);
    x.fillStyle='#fff';x.font='bold 11px sans-serif';x.fillText('7',22,-3);x.fillStyle='#fef08a';rr(x,48,-4,6,5,2);x.fill();
    x.fillStyle='#52525b';x.fillRect(-58,-14,10,4);x.fillRect(-54,-14,3,12)}
  else if(type=='monster'){
    x.fillStyle='#3f3f46';rr(x,-48,-4,96,10,3);x.fill();
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2.2;x.beginPath();x.moveTo(-62,-6);x.lineTo(-62,-24);x.quadraticCurveTo(-62,-30,-54,-30);x.lineTo(-26,-30);x.lineTo(-16,-56);x.lineTo(18,-56);x.lineTo(32,-30);x.lineTo(56,-28);x.quadraticCurveTo(64,-26,64,-18);x.lineTo(64,-6);x.closePath();x.fill();x.stroke();
    x.fillStyle='#bae6fd';x.beginPath();x.moveTo(-12,-32);x.lineTo(-6,-51);x.lineTo(14,-51);x.lineTo(25,-32);x.closePath();x.fill();x.fillStyle='#fff7';x.beginPath();x.moveTo(-6,-51);x.lineTo(0,-51);x.lineTo(-7,-33);x.lineTo(-10,-33);x.closePath();x.fill();
    x.fillStyle='#fbbf24';x.beginPath();x.arc(5,-42,9,Math.PI,0);x.fill();x.font='16px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(petE(),5,-39);
    x.fillStyle='#fde047';x.beginPath();x.moveTo(-50,-20);x.lineTo(-36,-26);x.lineTo(-40,-18);x.lineTo(-28,-22);x.lineTo(-44,-12);x.lineTo(-40,-19);x.closePath();x.fill();
    x.fillStyle='#fef08a';rr(x,59,-24,6,7,2);x.fill();x.fillStyle='#e4e4e7';for(let i=0;i<4;i++){x.beginPath();x.arc(-14+i*9,-60,2.4,0,7);x.fill()}}
  else if(type=='bike'){
    x.strokeStyle='#3f3f46';x.lineWidth=4;x.lineCap='round';x.beginPath();x.moveTo(-hw,wy);x.lineTo(-10,-6);x.lineTo(14,-8);x.lineTo(hw,wy);x.moveTo(14,-8);x.lineTo(22,-26);x.lineTo(14,-30);x.stroke();x.lineCap='butt';
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2;x.beginPath();x.moveTo(-22,-6);x.lineTo(-6,-16);x.lineTo(16,-18);x.lineTo(22,-8);x.lineTo(8,0);x.lineTo(-16,2);x.closePath();x.fill();x.stroke();
    x.fillStyle=gb;x.beginPath();x.moveTo(-hw-6,6);x.quadraticCurveTo(-hw,-6,-hw+14,-4);x.lineTo(-hw+8,6);x.closePath();x.fill();x.beginPath();x.moveTo(hw-12,-2);x.quadraticCurveTo(hw,-6,hw+4,6);x.lineTo(hw-6,4);x.closePath();x.fill();
    x.fillStyle='#18181b';rr(x,-24,-20,20,6,3);x.fill();
    x.strokeStyle='#1e3a8a';x.lineWidth=6;x.lineCap='round';x.beginPath();x.moveTo(-12,-20);x.lineTo(-4,-36);x.lineTo(12,-28);x.moveTo(-12,-20);x.lineTo(2,-8);x.stroke();x.lineCap='butt';
    x.fillStyle=paint;x.beginPath();x.arc(-4,-46,11,Math.PI*.9,Math.PI*2.1);x.fill();x.font='15px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(petE(),-3,-43);x.fillStyle='#0f172a';rr(x,0,-52,10,5,2);x.fill();
    x.fillStyle='#fff';rr(x,-18,-14,14,10,2);x.fill();x.fillStyle='#111';x.font='bold 9px sans-serif';x.fillText('1',-11,-9);x.fillStyle='#fef08a';rr(x,22,-28,5,6,2);x.fill()}
  else if(type=='tractor'){
    x.fillStyle='#3f3f46';rr(x,-40,-6,84,8,3);x.fill();
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2;x.beginPath();x.moveTo(-12,-2);x.lineTo(-12,-28);x.lineTo(38,-26);x.quadraticCurveTo(48,-24,48,-14);x.lineTo(48,-2);x.closePath();x.fill();x.stroke();
    x.fillStyle=shade(paint,-.35);for(let i=0;i<4;i++)x.fillRect(16+i*7,-22,3,14);
    x.strokeStyle='#27272a';x.lineWidth=3.5;x.beginPath();x.moveTo(-42,-4);x.lineTo(-42,-64);x.lineTo(-8,-64);x.lineTo(-8,-4);x.stroke();x.fillStyle=shade(paint,-.2);rr(x,-46,-68,42,6,3);x.fill();
    x.fillStyle='#bae6fd99';x.fillRect(-40,-60,30,30);x.fillStyle='#fbbf24';x.beginPath();x.arc(-25,-40,10,Math.PI,0);x.fill();x.font='17px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(petE(),-25,-37);
    x.fillStyle='#52525b';x.fillRect(28,-46,5,20);x.fillStyle='#27272a';x.fillRect(27,-48,7,4);x.fillStyle='#fef08a';rr(x,44,-20,6,7,2);x.fill()}
  else if(type=='bus'){
    const yb=x.createLinearGradient(0,-50,0,8);yb.addColorStop(0,'#fde68a');yb.addColorStop(.5,'#facc15');yb.addColorStop(1,'#ca8a04');x.fillStyle=yb;x.strokeStyle='#713f12';x.lineWidth=2;
    x.beginPath();x.moveTo(-68,6);x.lineTo(-68,-42);x.quadraticCurveTo(-68,-50,-60,-50);x.lineTo(56,-50);x.quadraticCurveTo(64,-50,66,-42);x.lineTo(70,-20);x.lineTo(70,6);x.closePath();x.fill();x.stroke();
    x.fillStyle=paint;x.fillRect(-68,-14,138,5);x.fillStyle='#111';x.fillRect(-68,-4,138,3);
    for(let i=0;i<6;i++){x.fillStyle='#bae6fd';rr(x,-62+i*19,-44,15,16,3);x.fill();x.font='11px sans-serif';x.textAlign='center';x.textBaseline='middle';if(i%2==0)x.fillText(['🙂','😄','😎'][i/2],-54.5+i*19,-34)}
    x.fillStyle='#bae6fd';x.beginPath();x.moveTo(52,-44);x.lineTo(62,-44);x.lineTo(66,-24);x.lineTo(52,-24);x.closePath();x.fill();x.font='15px sans-serif';x.fillText(petE(),58,-32);
    x.fillStyle='#111';x.font='bold 7px sans-serif';x.fillText('SCHOOL BUS',0,-20);x.fillStyle='#fef08a';rr(x,66,-14,5,7,2);x.fill();x.fillStyle='#ef4444';rr(x,-70,-40,4,8,2);x.fill();x.fillStyle='#dc2626';x.fillRect(-72,-30,4,10)}
  else{
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2;
    x.beginPath();x.moveTo(-58,4);x.lineTo(-58,-12);x.quadraticCurveTo(-58,-18,-50,-18);x.lineTo(-24,-18);x.lineTo(-16,-42);x.lineTo(16,-42);x.lineTo(28,-18);x.lineTo(52,-16);x.quadraticCurveTo(60,-14,60,-6);x.lineTo(60,4);x.closePath();x.fill();x.stroke();
    x.fillStyle=shade(paint,-.45);rr(x,-56,-2,114,8,3);x.fill();x.fillStyle='#fff8';rr(x,-48,-15,22,3,1.5);x.fill();rr(x,32,-13,16,3,1.5);x.fill();
    x.fillStyle='#bae6fd';x.beginPath();x.moveTo(-12,-20);x.lineTo(-7,-37);x.lineTo(12,-37);x.lineTo(22,-20);x.closePath();x.fill();x.fillStyle='#fff6';x.beginPath();x.moveTo(-7,-37);x.lineTo(-1,-37);x.lineTo(-8,-21);x.lineTo(-11,-21);x.closePath();x.fill();
    x.fillStyle='#fbbf24';x.beginPath();x.arc(4,-30,9.5,Math.PI,0);x.fill();x.font='17px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(petE(),4,-27);
    x.strokeStyle='#3f3f46';x.lineWidth=3;x.beginPath();x.moveTo(-24,-18);x.lineTo(-16,-46);x.lineTo(16,-46);x.lineTo(28,-18);x.stroke();
    x.fillStyle='#fef08a';rr(x,55,-12,6,7,2);x.fill();x.fillStyle='#ef4444';rr(x,-60,-12,4,7,2);x.fill();x.fillStyle='#71717a';rr(x,-64,-4,10,4,2);x.fill()}
  x.restore();
  wheel(x,sx,sy,ang,sc,-hw,wy,rot1,paint,V.R);wheel(x,sx,sy,ang,sc,hw,wy,rot2,paint,V.R)}
function wheel(x,sx,sy,ang,sc,ox,oy,rot,paint,R=21){const c=Math.cos(-ang),s=Math.sin(-ang),px=sx+(ox*c-oy*s)*sc,py=sy+(ox*s+oy*c)*sc,r=R*sc;
  x.save();x.translate(px,py);x.rotate(rot);
  const tg=x.createRadialGradient(0,0,r*.5,0,0,r);tg.addColorStop(0,'#3f3f46');tg.addColorStop(1,'#18181b');x.fillStyle=tg;x.beginPath();x.arc(0,0,r,0,7);x.fill();
  x.fillStyle='#27272a';const nb=Math.round(R*.7);for(let i=0;i<nb;i++){x.save();x.rotate(i*2*Math.PI/nb);rr(x,-2.8*sc,-r-1.6*sc,5.6*sc,4.6*sc,1.4*sc);x.fill();x.restore()}
  x.fillStyle=paint||'#a8a29e';x.beginPath();x.arc(0,0,r*.5,0,7);x.fill();const hg=x.createRadialGradient(-r*.12,-r*.12,1,0,0,r*.4);hg.addColorStop(0,'#fafafa');hg.addColorStop(1,'#a1a1aa');x.fillStyle=hg;x.beginPath();x.arc(0,0,r*.38,0,7);x.fill();
  x.fillStyle='#52525b';for(let i=0;i<5;i++){x.beginPath();x.arc(Math.cos(i*1.256)*r*.23,Math.sin(i*1.256)*r*.23,1.5*sc,0,7);x.fill()}x.restore()}

function stopHC(){if(!HC)return;cancelAnimationFrame(HC.raf);if(HC.eng){try{HC.eng.lfo&&HC.eng.lfo.stop();HC.eng.o.stop();HC.eng.o2.stop()}catch(e){}}removeEventListener('keydown',HC.kd);removeEventListener('keyup',HC.ku);HC=null}
const HC_SNDI=['sound-on','music','sound-off']; // P4-16: the sound button's icon for S.hcSnd (all, no engine, off)
function hcStart(stage,lvi){HCLV=lvi==null?null:lvDef(stage,lvi);const gs=garageS(),up=gs.up,V=VEH[gs.veh],R=V.R,L=V.L,y0=terrH(100,stage)+R+2;
  view(`<div class="hc" id="hc"><canvas id="hcv"></canvas>
   ${GH.top('hill',{play:true,hud:true,sub:HCLV?`${STAGES[stage].n}, level ${HCLV.i+1}`:STAGES[stage].n,timeId:'hct',
    chips:`<div class="hcfuel" role="img" aria-label="Fuel">${ico('drop',26)}<div><div id="hcf"></div></div></div><span class="stat gh-st gh-dist"><b id="hcd">0 m</b></span>`+
     `<span class="stat gh-nut" aria-label="Bolts">${ico('nut',32)}<b id="hcb">0</b></span>`,sound:GH.tool(HC_SNDI[S.hcSnd||0],'Sound','hcsnd')})}
   <div class="hcprog"><div id="hcpb"></div><span id="hcbest"></span></div>
   <div class="pedal brake" id="pb">◀<small>BRAKE</small></div><div class="pedal gas" id="pg">▶<small>GAS</small></div><div class="hcmsg" id="hcm"></div><div class="hcpop" id="hcp"></div><div class="hccombo" id="hcc"></div></div>`);
  HC={veh:gs.veh,prevBest:bestAll(),best:gs.best[stage],stage,R,L,acc:(820+up.engine*150)*V.acc,maxV:(420+up.engine*75)*V.maxV,grip:(.9+up.tires*.12)*V.grip,tireUp:up.tires,lift:(5+up.engine*.12)*V.lift*(stage=='moon'?.6:1),tankSec:17+up.tank*9,fuel:100,
    w1:{x:100,y:y0,px:100,py:y0,rot:0,g:true},w2:{x:100+L,y:y0,px:100+L,py:y0,rot:0,g:true},gas:false,brake:false,bolts:0,maxX:100,cp:100,crashT:0,safeT:0,stuckT:0,over:false,
    took:new Set(),camX:140,camY:y0,zoom:1,shake:0,t:0,saveT:0,timeUp:false,graceT:0,parts:[],lastCp:0,raf:0,ptIn:{},air:0,airRot:0,lastAng:0,flips:0,perfect:0,airs:0,wheelieT:0,wheelies:0,crashes:0,wasAir:false,acu:0,slip:0,
    bob:0,bobV:0,combo:0,comboT:0,pops:[],g1t:-1,g2t:-1,fuelK:0,lv:HCLV,lockT:HCLV?2.6:0,mode:HCLV?'free':gs.mode,rushT:60,crates:0};if(HC.mode=='cargo')HC.crates=3;if(HCLV)HC.best=0;
  const cv=$('#hcv'),ctx=cv.getContext('2d'),dpr=Math.min(1.5,devicePixelRatio||1);
  cv.setAttribute('role','img');cv.setAttribute('aria-label','The hill and your vehicle'); // P6-01
  const size=()=>{cv.width=cv.clientWidth*dpr;cv.height=cv.clientHeight*dpr};size();HC.size=size;
  const hc=$('#hc');
  const setP=()=>{const ids=Object.values(HC.ptIn);HC.gas=ids.includes('g');HC.brake=ids.includes('b');$('#pg').classList.toggle('on',HC.gas);$('#pb').classList.toggle('on',HC.brake)};
  hc.addEventListener('pointerdown',e=>{if(!HC||e.target.closest('.gh-top'))return;e.preventDefault();HC.ptIn[e.pointerId]=e.clientX>innerWidth/2?'g':'b';setP()});
  const rel=e=>{if(!HC)return;delete HC.ptIn[e.pointerId];setP()};hc.addEventListener('pointerup',rel);hc.addEventListener('pointercancel',rel);hc.addEventListener('pointerleave',rel);
  HC.kd=e=>{if(e.key=='ArrowRight'||e.key=='ArrowUp')HC.gas=true;if(e.key=='ArrowLeft'||e.key=='ArrowDown')HC.brake=true};HC.ku=e=>{if(e.key=='ArrowRight'||e.key=='ArrowUp')HC.gas=false;if(e.key=='ArrowLeft'||e.key=='ArrowDown')HC.brake=false};
  addEventListener('keydown',HC.kd);addEventListener('keyup',HC.ku);
  // P4-16: Pause opens the shared sheet; it holds the drive (and the game-time clock) and its Quit ends the drive as the old close button did
  GH.wire({quit:()=>hcEnd('quit'),hold:on=>{if(!HC)return;HC.paused=on;HC.ptIn={};setP();if(on&&HC.eng){try{HC.eng.g.gain.setTargetAtTime(0,ac().currentTime,.05)}catch(e){}}}});
  $('#hcsnd').onclick=e=>{S.hcSnd=((S.hcSnd||0)+1)%3;save();e.currentTarget.innerHTML=ico(HC_SNDI[S.hcSnd]);hcMsg(['All sounds on','Engine off, other sounds on','Truck sounds off'][S.hcSnd],1400);if(S.hcSnd&&HC.eng){try{HC.eng.g.gain.setTargetAtTime(0,ac().currentTime,.05);HC.eng.lfo.stop();HC.eng.o.stop();HC.eng.o2.stop()}catch(x){}HC.eng=null}};
  if(S.sound&&(S.hcSnd||0)==0){try{const E=ENG[gs.veh]||ENG.jeep,a=ac(),o=a.createOscillator(),o2=a.createOscillator(),f=a.createBiquadFilter(),g=a.createGain(),am=a.createGain(),lfo=a.createOscillator(),lg=a.createGain();o.type=E[1];o2.type='square';f.type='lowpass';f.frequency.value=420;g.gain.value=.02;
    o.connect(f);o2.connect(f);f.connect(am).connect(g).connect(MG);am.gain.value=1;lfo.frequency.value=E[2]||7;lg.gain.value=E[2]?.45:.08;lfo.connect(lg).connect(am.gain);lfo.start();o.frequency.value=E[0];o2.frequency.value=E[0]/2;o.start();o2.start();HC.eng={o,o2,g,f,lfo,base:E[0]}}catch(e){}}
  if(HCLV){const L=HCLV;hcMsg(`${STAGES[stage].e} Level ${L.i+1} · Reach ${L.dist} m`,900);[['3',900],['2',1500],['1',2100],['GO!',2600]].forEach(([t,ms])=>setTimeout(()=>{if(HC&&HC.lv===L){hcMsg(t,t=='GO!'?700:500);t=='GO!'?SFX.fanfare():tone(520,.12,0,'square',.12)}},ms))}else hcMsg(HC.mode=='cargo'?'📦 Deliver the crates! Land softly!':HC.mode=='coins'?'🪙 COIN RUSH! 60 seconds, go go go!':HC.mode=='night'?'🌙 Night drive! Double bolts!':`${STAGES[stage].e} ${STAGES[stage].n} · ${HC.best?'Beat '+HC.best+' m!':'Go go go!'}`,2400);if(S.voice)say(`Let's climb, ${S.name}!`);
  let last=0;const loop=ts=>{if(!HC)return;const dt=last?Math.min(.05,(ts-last)/1000):0;last=ts;
    if(!document.hidden&&!HC.over&&!HC.paused){HC.acu+=dt;let n=0;while(HC&&!HC.over&&HC.acu>=1/120&&n<8){hcStep(1/120);HC.acu-=1/120;n++}if(HC){HC.acu=Math.min(HC.acu,1/120);if(!HC.over)hcTime(dt)}}
    if(HC){hcDraw(ctx,cv.width,cv.height,dpr);HC.raf=requestAnimationFrame(loop)}};HC.raf=requestAnimationFrame(loop)}
function hcMsg(t,ms=1500){const m=$('#hcm');if(!m)return;m.textContent=t;m.classList.add('on');clearTimeout(m._t);m._t=setTimeout(()=>m.classList.remove('on'),ms)}
function hcPop(t){const m=$('#hcp');if(!m)return;m.textContent=t;m.classList.remove('on');void m.offsetWidth;m.classList.add('on')}
function hcTrick(name,b){const H=HC;H.combo=H.comboT>0?H.combo+1:1;H.comboT=4;const mult=Math.min(4,H.combo),got=b*mult;H.bolts+=got;hcPop(`${name}! +${got} 🔩`);
  const c=$('#hcc');if(c){c.textContent=mult>1?`COMBO x${mult}`:'';c.classList.toggle('on',mult>1)}HSND.trick(mult)}
function hcTime(dt){const H=HC,p=pt();H.t+=dt;H.ambT=(H.ambT??4)-dt;if(H.ambT<=0){H.ambT=5+Math.random()*8;HSND.amb(H.stage)}if(H.mode=='coins'&&!H.over){H.rushT-=dt;if(H.rushT<=0)return hcEnd('rush');if(H.rushT<10&&Math.floor(H.rushT)!=Math.floor(H.rushT+dt))tone(880,.08,0,'square',.1)}
  if(!H.timeUp){p.bank=Math.max(0,p.bank-dt);p.used+=dt;if(ptLeft()<=0){H.timeUp=true;H.graceT=25;hcMsg('Last run! Game time is up soon.',3000);SFX.rattle()}}
  else{H.graceT-=dt;if(H.graceT<=0)return hcEnd('time')}
  H.saveT+=dt;if(H.saveT>5){H.saveT=0;save()}
  if(H.comboT>0){H.comboT-=dt;if(H.comboT<=0){H.combo=0;const c=$('#hcc');if(c)c.classList.remove('on')}}
  GH.setTime($('#hct'),H.timeUp?H.graceT:null)}
function rotPts(H,a){const w=[H.w1,H.w2],c=Math.cos(a),s=Math.sin(a),cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2;for(const p of w){const dx=p.x-cx,dy=p.y-cy;p.x=cx+dx*c-dy*s;p.y=cy+dx*s+dy*c}}
function hcStep(dt){const H=HC,st=STAGES[H.stage],R=H.R,L=H.L,w=[H.w1,H.w2];
  H.bobV+=(-H.bob*260-H.bobV*14)*dt;H.bob+=H.bobV*dt;
  if(H.crashT>0){H.crashT-=dt;hcParts(dt);if(H.crashT<=0)hcRespawn();return}
  if(H.lockT>0)H.lockT-=dt;const gas=H.gas&&H.fuel>0&&H.lockT<=0,brk=H.brake||H.lockT>0;
  for(const p of w){const vx=(p.x-p.px)*.9994,vy=(p.y-p.py)*.9994;p.px=p.x;p.py=p.y;p.x+=vx;p.y+=vy-st.g*dt*dt}
  for(let i=0;i<4;i++){const dx=H.w2.x-H.w1.x,dy=H.w2.y-H.w1.y,d=Math.hypot(dx,dy)||1,f=(d-L)/d*.5;H.w1.x+=dx*f;H.w1.y+=dy*f;H.w2.x-=dx*f;H.w2.y-=dy*f}
  let ground=0,landV=0;H.slip=0;
  for(const p of w){let gy=terrH(p.x,H.stage);const was=p.g;p.g=false;
    if(gy+R-p.y>30){const dx=p.x-p.px;p.x=p.px-dx*.3;gy=terrH(p.x,H.stage)}
    if(p.y<gy+R&&gy+R-p.y<=30){const vyIn=(p.y-p.py)/dt;p.y=gy+R;p.g=true;ground++;if(!was){landV=Math.max(landV,-vyIn);if(p===H.w1)H.g1t=H.t;else H.g2t=H.t}
      const s=(terrH(p.x+1,H.stage)-terrH(p.x-1,H.stage))/2,l=Math.hypot(1,s),tx=1/l,ty=s/l,soft=softAt(p.x,H.stage);
      let vt=(p.x-p.px)*tx+(p.y-p.py)*ty;const grip=soft?H.grip*soft.grip/.9+H.tireUp*.03:H.grip,tg=st.tg||st.g,trac=grip*tg*1.5*tx+st.g*Math.max(0,-ty)*1.1,a=Math.min(H.acc,trac)*dt*dt;
      if(gas){vt=Math.min(vt+a,H.maxV*dt*(soft&&soft.drag<1?.6:1));if(H.acc>trac)H.slip+=.5}
      else if(brk)vt=vt>0?Math.max(0,vt-Math.min(H.acc*1.4,trac*1.2)*dt*dt):Math.max(vt-a*.55,-H.maxV*dt*.4);
      else vt*=soft?soft.drag*.999:.997;
      if(soft&&soft.drag<1)vt*=soft.drag;
      p.px=p.x-tx*vt;p.py=p.y-ty*vt;p.rot+=vt/R*(gas&&H.acc>trac?1.6:1)}
    else p.rot+=(p.x-p.px)/R*.99}
  if(landV>200){H.bobV+=Math.min(landV,900)*.06;if(landV>380)HSND.land(landV)}
  if(H.crates&&landV>640&&H.safeT<=0)hcCrate();
  let tq=0;
  if(ground==0){tq=(gas?4.6:0)-(brk?4.6:0);H.air+=dt}
  else{if(gas&&H.w1.g)tq+=H.lift*(H.w2.g?1:.8);if(brk&&H.w2.g)tq-=3.2}
  if(tq)rotPts(H,tq*dt*dt);
  if(ground==0&&!gas&&!brk){const av=Math.atan2(H.w2.y-H.w1.y,H.w2.x-H.w1.x)-Math.atan2(H.w2.py-H.w1.py,H.w2.px-H.w1.px);rotPts(H,-av*.012)}
  const cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2,ang=Math.atan2(H.w2.y-H.w1.y,H.w2.x-H.w1.x);
  let da=ang-H.lastAng;if(da>Math.PI)da-=2*Math.PI;if(da<-Math.PI)da+=2*Math.PI;H.lastAng=ang;
  if(ground==0)H.airRot+=da;
  if(ground==0&&!H.wasAir){const av=ang-Math.atan2(H.w2.py-H.w1.py,H.w2.px-H.w1.px);rotPts(H,-av*.75)}
  const slopeB=Math.atan((baseH(cx+20,H.stage)-baseH(cx-20,H.stage))/40);
  if(ground==2&&H.wasAir){const fl=Math.round(Math.abs(H.airRot)/(2*Math.PI)-.15),airT=H.air;
    if(fl>=1){H.flips+=fl;hcTrick(`${H.airRot>0?'BACKFLIP':'FRONTFLIP'}${fl>1?' x'+fl:''}`,10*fl);if(S.voice)say(H.airRot>0?'Backflip!':'Front flip!')}
    else if(airT>1.1){H.airs++;hcTrick('BIG AIR',Math.min(8,Math.round(airT*2)))}
    if(airT>.6&&Math.abs(H.g1t-H.g2t)<.14&&Math.abs(ang-slopeB)<.2){H.perfect++;setTimeout(()=>{if(HC)hcTrick('PERFECT LANDING',3)},350)}
    if(landV>520)H.shake=.25;H.air=0;H.airRot=0}
  if(ground>0&&!H.wasAir)H.airRot=0;H.wasAir=ground==0;if(ground==2)H.air=0;
  if(H.w1.g&&!H.w2.g&&ang-slopeB>.25){H.wheelieT+=dt;if(H.wheelieT>=2&&H.wheelieT-dt<2){H.wheelies++;hcTrick('WHEELIE',4)}}else H.wheelieT=0;
  const hr=48*(H.R/21)+(H.veh=='monster'?10:0),hx=cx-Math.sin(ang)*hr,hy=cy+Math.cos(ang)*hr,pit=pitAt(cx,H.stage);
  if(H.safeT>0)H.safeT-=dt;
  else if(pit&&cy<baseH(pit.x,H.stage)-pit.d*.5)return hcCrash('pit');
  else if(hy<terrH(hx,H.stage)+5||(Math.abs(ang-slopeB)>2.4&&ground))return hcCrash(pit||pitAt(hx,H.stage)||pitAt(cx+50,H.stage)?'pit':'flip');
  H.fuel=H.mode=='coins'?100:Math.max(0,H.fuel-dt*100/H.tankSec*(gas?1:.25));
  if(cx>H.maxX)H.maxX=cx;
  if(H.lv&&cx>=H.lv.fx)return hcWin();
  if(H.best>20&&!H.passedBest&&(cx-100)/20>H.best){H.passedBest=true;hcPop('🏆 NEW RECORD!');SFX.fanfare();confetti(20)}
  const cpi=Math.floor((cx-100)/2000);if(cpi>H.lastCp){H.lastCp=cpi;H.cp=100+cpi*2000;const cb=5+H.crates*4;H.bolts+=cb;HSND.cp();hcMsg(H.crates?`📦 Delivered ${H.crates} crate${H.crates>1?'s':''}! +${cb} 🔩`:`🚩 ${cpi*100} m! +5 🔩`);if(S.voice&&cpi%2==0)say(`${cpi*100} meters!`)}
  for(let k=H.fuelK;k<H.fuelK+3;k++){const fx=fuelX(k,H.stage);if(fx<cx-60){if(k==H.fuelK)H.fuelK++;continue}if(fx>cx+60)break;if(H.took.has('f'+k))continue;H.took.add('f'+k);H.fuel=100;HSND.fuel();hcPop('⛽ FULL TANK!')}
  const BS=H.mode=='coins'?190:420,BN=H.mode=='coins'?4:3,ci=Math.floor((cx-420)/BS);for(const i of [ci,ci+1]){if(i<0)continue;const bx=420+i*BS;for(let j=0;j<BN;j++){const x=bx+j*26,key=`c${i}_${j}`;if(H.took.has(key))continue;
    const y=terrH(x,H.stage)+R+38+(H.mode=='coins'&&i%4==2?70:0);if(Math.abs(x-cx)<42&&Math.abs(y-cy)<58){H.took.add(key);H.bolts+=(1+Math.floor(i/60))*(H.mode=='night'?2:1);HSND.coin(H);H.pops.push({x,y,l:.7})}}}
  const sp=Math.hypot(H.w1.x-H.w1.px,H.w1.y-H.w1.py)/dt;H.speed=sp;
  if(H.fuel<=0){if(sp<25&&ground)H.stuckT+=dt;else H.stuckT=0;if(H.stuckT>1.4)return hcEnd('fuel')}
  if(H.eng){const t=ac().currentTime,band=H.maxV/4,gear=Math.min(3,Math.floor(sp/band)),inG=Math.min(1,(sp-gear*band)/band);if(gear!=H.gear){if(gear>(H.gear||0))HSND.shift();H.gear=gear}const f=H.eng.base*(1+inG*.9+gear*.12)+(gas?H.eng.base*.25:0)+H.slip*30;H.eng.o.frequency.setTargetAtTime(f,t,.05);H.eng.o2.frequency.setTargetAtTime(f/2,t,.05);H.eng.g.gain.setTargetAtTime(gas?.032:.014,t,.12);H.eng.f.frequency.setTargetAtTime(gas?650+inG*300:340,t,.1)}
  const soft=softAt(H.w1.x,H.stage);
  if(gas&&H.w1.g&&Math.random()<(.25+H.slip*.6)){H.parts.push({x:H.w1.x-14,y:terrH(H.w1.x,H.stage)+6,vx:-60-Math.random()*120,vy:60+Math.random()*120,l:.7,c:soft?soft.c2:st.dirt[0],s:4+Math.random()*4,g:1})}
  if(gas&&Math.random()<.35){H.parts.push({x:cx-Math.cos(ang)*64,y:cy-Math.sin(ang)*64+30,vx:-20,vy:20,l:.8,c:'#78716c',s:6,g:-.2,smoke:1})}
  if(st.soft=='ice'&&H.w1.g&&soft&&Math.random()<.3)H.parts.push({x:H.w1.x,y:terrH(H.w1.x,H.stage)+4,vx:-80*Math.random(),vy:40,l:.5,c:'#fff',s:3,g:.5});
  if(sp>520&&Math.random()<.3)H.parts.push({x:cx+80+Math.random()*200,y:cy+Math.random()*120-30,vx:-sp*.4,vy:0,l:.35,c:'#ffffffaa',s:0,line:1,g:0});
  hcParts(dt)}
function hcParts(dt){const H=HC,g=STAGES[H.stage].g;for(const d of H.parts){d.x+=d.vx*dt;d.y+=d.vy*dt;d.vy-=g*dt*d.g;d.l-=dt}H.parts=H.parts.filter(d=>d.l>0);if(H.parts.length>180)H.parts.splice(0,H.parts.length-180);
  for(const p of H.pops){p.l-=dt;p.y+=60*dt}H.pops=H.pops.filter(p=>p.l>0)}
function hcCrate(){const H=HC;if(!H.crates)return;H.crates--;const cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2;for(let i=0;i<10;i++)H.parts.push({x:cx-20,y:cy+40,vx:(Math.random()-.5)*300,vy:150+Math.random()*250,l:1,c:['#b45309','#92400e','#fbbf24'][i%3],s:4+Math.random()*4,g:1});SFX.hit();
  hcPop(H.crates?`📦 Crate fell off! ${H.crates} left`:'📦 All crates gone!');if(!H.crates)setTimeout(()=>{if(HC===H&&!H.over)hcEnd('cargo')},1300)}
function hcCrash(why){const H=HC;if(H.crates)hcCrate();H.crashT=1.7;H.crashes++;H.shake=.4;H.fuel=Math.max(0,H.fuel-5);H.combo=0;
  const cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2;
  if(why=='pit'&&STAGES[H.stage].water){const lv=STAGES[H.stage].lava;lv?(hs()&&(noise(.5,0,.3,400,100),tone(90,.4,0,'sawtooth',.1,40))):hs()&&SFX.splash();for(let i=0;i<30;i++)H.parts.push({x:cx,y:cy,vx:(Math.random()-.5)*320,vy:150+Math.random()*260,l:1,c:lv?['#f97316','#fde047','#dc2626'][i%3]:'#7dd3fc',s:5+Math.random()*4,g:1})}
  else{HSND.crash();for(let i=0;i<14;i++)H.parts.push({x:cx,y:cy+20,vx:(Math.random()-.5)*260,vy:120+Math.random()*200,l:1,c:'#facc15',s:5,g:.6,star:1})}
  hcMsg(why=='pit'?(STAGES[H.stage].lava?'🔥 HOT HOT HOT! Hit the ramp fast to jump the lava!':STAGES[H.stage].water?'💦 SPLASH! Go fast and use the ramp to jump!':'💫 Into the crater! Go faster to jump!'):`💫 Flipped! Ease off GAS on steep hills.`,1900);
  if(S.voice)say(why=='pit'?'Splash! Go faster to jump!':'Oops! Ease off the gas!')}
function hcRespawn(){const H=HC,R=H.R,x=H.cp,y=terrH(x,H.stage)+R+4,y2=terrH(x+H.L,H.stage)+R+4;Object.assign(H.w1,{x,y,px:x,py:y,g:true});Object.assign(H.w2,{x:x+H.L,y:y2,px:x+H.L,py:y2,g:true});H.stuckT=0;H.safeT=1.2;H.air=0;H.airRot=0;H.wasAir=false;H.lastAng=Math.atan2(y2-y,H.L)}
function hcMissions(H,m){const gs=garageS(),done=[];for(const ms of gs.missions){if(ms.done)continue;
  const run={dist:m,bolts:H.bolts}[ms.k];
  if(run!==undefined)ms.p=Math.max(ms.p,run);else if(ms.k=='stage'){if(H.stage!='meadow'&&m>=200)ms.p=1}else ms.p+=({flips:H.flips,perfect:H.perfect,wheelie:H.wheelies,air:H.airs}[ms.k]||0);
  if(ms.p>=ms.goal){ms.p=ms.goal;ms.done=true;done.push(ms)}}return done}
function hcEnd(why){const H=HC;if(!H||H.over)return;H.over=true;const gs=garageS(),m=Math.floor((H.maxX-100)/20),rec=!H.lv&&(H.mode=='free'||H.mode=='night')&&m>gs.best[H.stage],rrec=H.mode=='coins'&&H.bolts>(gs.rush[H.stage]||0);if(rrec)gs.rush[H.stage]=H.bolts;
  if(rec)gs.best[H.stage]=m;gs.bolts+=H.bolts;const mdone=hcMissions(H,m);save();if(H.eng){try{H.eng.g.gain.setTargetAtTime(0,ac().currentTime,.1)}catch(e){}}
  if(why=='quit'){stopHC();return H.lv?hcLevels(H.stage):garage()}
  if(H.lv)return hcLvFail(H,why,m,mdone);
  const win=(rec&&m>20)||rrec;win?SFX.fanfare():SFX.magic();
  const unl=Object.entries(STAGES).filter(([k,s])=>H.prevBest<s.need&&bestAll()>=s.need).map(([k,s])=>s.n);
  // P4-16: the shared end card (the same numbers, messages and buttons as before)
  const o=GH.end('hill',{win,title:why=='time'?"Game time's up!":why=='fuel'?'Out of gas!':why=='cargo'?'Crates fell off!':why=='rush'?'Time!':'Nice drive!',
   tag:(H.mode=='coins'?rrec:rec&&m>0)?'New record!':'',
   stats:[H.mode=='coins'?[String(H.bolts),rrec?'new record':'best '+(gs.rush[H.stage]||0),'nut']:[m+' m',H.mode=='cargo'?'delivery distance':rec&&m>0?'new record':'best '+gs.best[H.stage]+' m','ruler'],
    ['+'+H.bolts,'bolts','nut'],[String(H.flips),'flips','rotate'],[String(H.perfect),'perfect landings','check-circle']],
   lines:[...mdone.map(x=>['target',`Mission done: ${esc(x.t)}! Claim it in the garage.`]),...unl.map(u=>['sparkle',`New place unlocked: ${esc(u)}!`])],
   btns:(why=='time'||ptLeft()<=0?UI.btn('Earn more game time',{kind:'primary',size:'lg',icon:'path-read',id:'hlearn',wide:true}):UI.btn('Drive again',{kind:'primary',size:'lg',icon:'replay',id:'hagain',wide:true}))+
    UI.btn('Garage',{icon:'car',id:'hgar',wide:true})});
  if(S.voice)say(why=='time'?`Game time is up! Let's learn and earn more!`:rec&&m>0?`New record! ${m} meters!`:`You drove ${m} meters!`);
  const go=f=>{o.remove();stopHC();f()};
  if(o.querySelector('#hagain'))o.querySelector('#hagain').onclick=()=>go(()=>hcStart(H.stage));
  if(o.querySelector('#hlearn'))o.querySelector('#hlearn').onclick=()=>go(()=>home());
  o.querySelector('#hgar').onclick=()=>go(garage)}

function hcLvCard(H,c){const o=GH.end('hill',c); // P4-16: the shared end card; buttons carry data-go as before
  const go=f=>{o.remove();stopHC();f()};o.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{const a=b.dataset.go;if(a=='retry')go(()=>hcStart(H.stage,H.lv.i));else if(a=='next')go(()=>H.lv.i+1<LVN?hcStart(H.stage,H.lv.i+1):hcLevels(STKEYS[STKEYS.indexOf(H.stage)+1]||H.stage));else if(a=='learn')go(home);else go(()=>hcLevels(H.stage))})}
function hcWin(){const H=HC;if(H.over)return;H.over=true;const L=H.lv,gs=garageS(),arr=lvS(H.stage),stars=1+(H.crashes<=1?1:0)+(H.crashes==0&&H.t<=L.par?1:0),old=arr[L.i]||0,gain=Math.max(0,stars-old)*15*(L.si+1);
  arr[L.i]=Math.max(old,stars);gs.bolts+=H.bolts+gain;const mdone=hcMissions(H,L.dist);save();if(H.eng){try{H.eng.g.gain.setTargetAtTime(0,ac().currentTime,.1)}catch(e){}}
  SFX.fanfare();if(S.voice)say(stars==3?'Three stars! Amazing!':'You made it!');const tm=Math.round(H.t);
  setTimeout(()=>{for(let k=1;k<=stars;k++)setTimeout(()=>SFX.coin(k+2),k*250)},100);
  const last=L.i+1>=LVN,nextSt=STKEYS[STKEYS.indexOf(H.stage)+1];
  hcLvCard(H,{win:true,title:`Level ${L.i+1} done!`,stars,
   stats:[[tm+'s','time','timer'],['+'+(H.bolts+gain),'bolts','nut'],[String(H.crashes),'crashes','warning'],[String(H.flips),'flips','rotate']],
   lines:[[H.crashes==0&&tm<=L.par?'bolt':'star',H.crashes==0&&tm<=L.par?`Under ${L.par}s!`:`3 stars: no crashes, under ${L.par}s`],
    ...mdone.map(x=>['target',`Mission done: ${esc(x.t)}!`]),...(last&&nextSt?[['sparkle',`${esc(STAGES[nextSt].n)} levels unlocked!`]]:[])],
   btns:(ptLeft()>0?UI.btn(last?'Next world':'Next level',{kind:'primary',size:'lg',icon:'go',attrs:'data-go="next"',wide:true})
    :UI.btn('Earn more game time',{kind:'primary',size:'lg',icon:'path-read',attrs:'data-go="learn"',wide:true}))+
    UI.btn('Retry',{icon:'replay',attrs:'data-go="retry"',wide:true})+UI.btn('All levels',{icon:'trophy',attrs:'data-go="list"',wide:true})})}
function hcLvFail(H,why,m,mdone){SFX.magic();const L=H.lv,togo=Math.max(0,L.dist-m);if(S.voice)say(why=='time'?`Game time is up!`:`So close! Try again!`);
  hcLvCard(H,{title:why=='time'?"Game time's up!":'Out of gas!',extra:UI.meter(m/L.dist,{lg:true,kind:'good',label:`${m} of ${L.dist} m`}),
   lines:[['go',`Only <b>${togo} m</b> to the finish!`],['drop','Tip: grab the fuel cans and don\'t waste gas in the air.'],...mdone.map(x=>['target',`Mission done: ${esc(x.t)}!`])],
   btns:(why=='time'||ptLeft()<=0?UI.btn('Earn more game time',{kind:'primary',size:'lg',icon:'path-read',attrs:'data-go="learn"',wide:true})
    :UI.btn('Try again',{kind:'primary',size:'lg',icon:'replay',attrs:'data-go="retry"',wide:true}))+UI.btn('All levels',{icon:'trophy',attrs:'data-go="list"',wide:true})})}
function hcLevels(st='meadow'){const gs=garageS(),left=ptLeft();const tot=STKEYS.reduce((a,k)=>a+lvS(k).reduce((p,q)=>p+(q||0),0),0);
  view(`${GH.top('hill',{sub:'Levels',chips:UI.chip('star',`${tot}/${STKEYS.length*LVN*3}`,{aria:'Level stars'})})}
  <div class="tabs">${STKEYS.map(k=>`<button class="btn sm tab ${k==st?'on':''}" data-t="${k}">${STAGES[k].e}</button>`).join('')}</div>
  <div class="scroll"><div class="lvhead" style="background:linear-gradient(135deg,${STAGES[st].sky[0]},${STAGES[st].top[0]})"><b>${STAGES[st].n}</b><span>${lvS(st).reduce((p,q)=>p+(q||0),0)} / ${LVN*3} ⭐</span></div>
  <div class="lvgrid">${[...Array(LVN)].map((_,i)=>{const L=lvDef(st,i),ok=lvOpen(st,i),sv=lvS(st)[i]||0;return`<button class="btn lvb ${ok?'':'lock'} ${sv?'done':''}" data-l="${i}"><b>${ok?i+1:'🔒'}</b><span class="lvs">${[1,2,3].map(k=>k<=sv?'⭐':'☆').join('')}</span><small>${L.dist} m${L.pits?' · 🕳️':''}</small></button>`}).join('')}</div>
  <p class="small" style="text-align:center">⭐ Finish · ⭐⭐ 1 crash or less · ⭐⭐⭐ No crashes and beat the time</p></div>`);
  $('#back').onclick=garage;$$('[data-t]').forEach(b=>b.onclick=()=>{SFX.pop(1);hcLevels(b.dataset.t)});
  $$('[data-l]').forEach(b=>b.onclick=()=>{const i=+b.dataset.l;if(!lvOpen(st,i)){SFX.wrong();anim(b,'sad');fb(i?'Finish the level before it first!':'Finish the last world, or drive '+STAGES[st].need+' m in Free Drive!','warn long',2600);return}
    if(ptLeft()<=0){SFX.wrong();fb(ptWhyNot(),'warn long',3000);return}SFX.whoosh();hcStart(st,i)})}
/* drawing */
function hcProp(x,type,px,py,s,i){
  if(type=='tree'){const h=(46+(i*37)%26)*s;x.fillStyle='#78350f';x.fillRect(px-3*s,py-h*.38,6*s,h*.4);x.fillStyle=i%2?'#15803d':'#166534';x.beginPath();x.arc(px,py-h*.62,h*.3,0,7);x.arc(px-h*.18,py-h*.5,h*.22,0,7);x.arc(px+h*.18,py-h*.5,h*.22,0,7);x.fill();x.fillStyle='#22c55e66';x.beginPath();x.arc(px-h*.08,py-h*.7,h*.14,0,7);x.fill()}
  else if(type=='cactus'){const h=(40+(i*29)%24)*s;x.fillStyle='#15803d';rr(x,px-5*s,py-h,10*s,h,5*s);x.fill();rr(x,px-16*s,py-h*.7,8*s,h*.32,4*s);x.fill();rr(x,px-16*s,py-h*.46,14*s,7*s,3.5*s);x.fill();rr(x,px+8*s,py-h*.82,8*s,h*.36,4*s);x.fill();rr(x,px+2*s,py-h*.52,14*s,7*s,3.5*s);x.fill()}
  else if(type=='pine'){const h=(52+(i*31)%26)*s;x.fillStyle='#78350f';x.fillRect(px-3*s,py-h*.2,6*s,h*.22);for(let k=0;k<3;k++){const yy=py-h*(.2+k*.25),ww=h*(.32-k*.07);x.fillStyle='#166534';x.beginPath();x.moveTo(px-ww,yy);x.lineTo(px,yy-h*.36);x.lineTo(px+ww,yy);x.fill();x.fillStyle='#fff';x.beginPath();x.moveTo(px-ww*.4,yy-h*.22);x.lineTo(px,yy-h*.36);x.lineTo(px+ww*.4,yy-h*.22);x.fill()}}
  else if(type=='palm'){const h=(70+(i*31)%30)*s,b=(i%2?1:-1)*12*s;x.strokeStyle='#92400e';x.lineWidth=6*s;x.lineCap='round';x.beginPath();x.moveTo(px,py);x.quadraticCurveTo(px+b,py-h*.6,px+b*.6,py-h);x.stroke();x.lineCap='butt';
    x.fillStyle=i%2?'#15803d':'#16a34a';for(let k=0;k<6;k++){const a=k*1.05+.3;x.beginPath();x.moveTo(px+b*.6,py-h);x.quadraticCurveTo(px+b*.6+Math.cos(a)*h*.35,py-h-Math.sin(a)*h*.25-8*s,px+b*.6+Math.cos(a)*h*.5,py-h+h*.12);x.quadraticCurveTo(px+b*.6+Math.cos(a)*h*.25,py-h-4*s,px+b*.6,py-h);x.fill()}
    x.fillStyle='#78350f';x.beginPath();x.arc(px+b*.6-3*s,py-h+5*s,4*s,0,7);x.arc(px+b*.6+4*s,py-h+6*s,4*s,0,7);x.fill()}
  else if(type=='deadtree'){const h=(44+(i*23)%20)*s;x.strokeStyle='#1c1917';x.lineWidth=4*s;x.beginPath();x.moveTo(px,py);x.lineTo(px,py-h);x.moveTo(px,py-h*.6);x.lineTo(px-h*.3,py-h*.9);x.moveTo(px,py-h*.45);x.lineTo(px+h*.28,py-h*.75);x.stroke();if(i%3==0){x.fillStyle='#f9731655';x.beginPath();x.arc(px,py-4*s,10*s,0,7);x.fill()}}
  else if(type=='lamp'){x.strokeStyle='#27272a';x.lineWidth=3*s;x.beginPath();x.moveTo(px,py);x.lineTo(px,py-60*s);x.lineTo(px+12*s,py-60*s);x.stroke();x.fillStyle='#fde047';x.beginPath();x.arc(px+12*s,py-57*s,4*s,0,7);x.fill();x.fillStyle='#fde04733';x.beginPath();x.moveTo(px+8*s,py-56*s);x.lineTo(px-6*s,py);x.lineTo(px+30*s,py);x.lineTo(px+16*s,py-56*s);x.fill();
    if(i%4==1){x.fillStyle=['#ef4444','#3b82f6','#22c55e'][i%3];rr(x,px+18*s,py-14*s,30*s,13*s,4*s);x.fill();x.fillStyle='#111';x.beginPath();x.arc(px+24*s,py-1*s,4*s,0,7);x.arc(px+42*s,py-1*s,4*s,0,7);x.fill();x.fillStyle='#bae6fd';x.fillRect(px+26*s,py-12*s,10*s,5*s)}}
  else if(type=='antenna'){x.strokeStyle='#cbd5e1';x.lineWidth=3*s;x.beginPath();x.moveTo(px,py);x.lineTo(px,py-50*s);x.stroke();x.fillStyle='#ef4444';x.beginPath();x.arc(px,py-52*s,4*s,0,7);x.fill()}}
function hcDraw(x,W,Hh,dpr){const H=HC,st=STAGES[H.stage],moon=H.stage=='moon',cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2,ang=Math.atan2(H.w2.y-H.w1.y,H.w2.x-H.w1.x);
  if(Math.abs(x.canvas.width-x.canvas.clientWidth*dpr)>2)H.size();
  const sp=H.speed||0,portrait=Hh>W;
  H.zoom+=((1-Math.min(.22,sp/2600))-H.zoom)*.03;const sc=Math.min(Hh/470,W/(portrait?460:620))*H.zoom*1.05;
  H.camX+=(cx+W*.1/sc-H.camX)*.09;H.camY+=(cy+30-H.camY)*.07;if(H.shake>0)H.shake-=1/60;
  const sh=H.shake>0?(Math.random()-.5)*14*H.shake*dpr:0,base=portrait?.66:.62;
  const SX=wx=>(wx-H.camX)*sc+W*.38+sh,SY=wy=>Hh*base-(wy-H.camY)*sc+sh,WX=sx=>(sx-W*.38)/sc+H.camX;
  const g=x.createLinearGradient(0,0,0,Hh);g.addColorStop(0,st.sky[0]);g.addColorStop(1,st.sky[1]);x.fillStyle=g;x.fillRect(0,0,W,Hh);
  if(moon){x.fillStyle='#fff';for(let i=0;i<90;i++){const sx=((i*137.5-H.camX*.03*sc)%W+W)%W,sy=(i*71.3)%(Hh*.7),tw=(Math.sin(H.t*3+i)+1)*.6+.6;x.globalAlpha=.5+tw*.3;x.fillRect(sx,sy,1.6*dpr*tw,1.6*dpr*tw)}x.globalAlpha=1;
    x.font=`${70*sc}px sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText('🌍',W*.8,Hh*.17)}
  else{const sx0=W*.84,sy0=Hh*.14,sg=x.createRadialGradient(sx0,sy0,4,sx0,sy0,90*sc);sg.addColorStop(0,'#fffbeb');sg.addColorStop(.35,H.stage=='desert'?'#fdba74':'#fde047');sg.addColorStop(1,'#fde04700');x.fillStyle=sg;x.beginPath();x.arc(sx0,sy0,90*sc,0,7);x.fill();
    x.save();x.globalAlpha=.08;x.fillStyle='#fff';for(let i=0;i<6;i++){const a=H.t*.05+i*1.05;x.beginPath();x.moveTo(sx0,sy0);x.lineTo(sx0+Math.cos(a)*W,sy0+Math.sin(a)*W);x.lineTo(sx0+Math.cos(a+.12)*W,sy0+Math.sin(a+.12)*W);x.fill()}x.restore();
    x.fillStyle=st.lava?'#292524cc':'#ffffffd8';for(let i=0;i<6;i++){const px=((i*420-H.camX*.08*sc-H.t*12*dpr)%(W+300)+W+300)%(W+300)-150,py=Hh*(.08+(i%3)*.08);
      for(const[ox,oy,r]of[[0,0,26],[24,-10,22],[46,0,24],[22,8,22]]){x.beginPath();x.arc(px+ox*sc*1.2,py+oy*sc*1.2,r*sc*1.2,0,7);x.fill()}}}
  const layer=(par,col,yb,amp,f1,f2,cap)=>{x.fillStyle=col;x.beginPath();x.moveTo(0,Hh);const pts=[];for(let sx=0;sx<=W+10;sx+=10*dpr){const t=sx/sc+H.camX*par;const y=Hh*yb-((H.stage=='desert'?Math.min(1,Math.abs(Math.sin(t*f1))*1.6):Math.abs(Math.sin(t*f1)))*amp+Math.sin(t*f2)*amp*.25)*sc;pts.push([sx,y]);x.lineTo(sx,y)}x.lineTo(W,Hh);x.fill();
    if(cap){x.fillStyle=cap;for(let i=1;i<pts.length-1;i++){const[px,py]=pts[i];if(py<pts[i-1][1]&&py<=pts[i+1][1]&&py<Hh*yb-amp*.75*sc){x.beginPath();x.moveTo(px-20*sc,py+18*sc);x.lineTo(px,py);x.lineTo(px+20*sc,py+18*sc);x.fill()}}}};
  layer(.08,st.far2,.5,130,.0028,.009,H.stage=='meadow'||H.stage=='snow'?'#f8fafc':null);layer(.18,st.far,.56,90,.0039,.012,H.stage=='snow'?'#fff':null);
  const fog=x.createLinearGradient(0,Hh*.35,0,Hh*.65);fog.addColorStop(0,'#ffffff00');fog.addColorStop(1,moon?'#00000000':'#ffffff40');x.fillStyle=fog;x.fillRect(0,Hh*.35,W,Hh*.3);
  x.fillStyle=st.mid;x.beginPath();x.moveTo(0,Hh);for(let sx=0;sx<=W+8;sx+=8*dpr){const t=(sx/sc+H.camX*.35);x.lineTo(sx,Hh*.6-(Math.sin(t*.005)*55+Math.sin(t*.013+1)*25)*sc)}x.lineTo(W,Hh);x.fill();
  for(let i=Math.floor((H.camX*.35-W/sc)/150);i<(H.camX*.35+W/sc*1.2)/150;i++){const t=i*150+((i*73)%60),sx=(t-H.camX*.35)*sc,y=Hh*.6-(Math.sin(t*.005)*55+Math.sin(t*.013+1)*25)*sc;if(sx<-60||sx>W+60||(i*7)%3==0)continue;hcProp(x,st.prop,sx,y,sc*.8,i)}
  const step=5*dpr,pts=[],DY=34*sc,hd=DY/2;for(let sx=-step;sx<=W+step;sx+=step){const wx=WX(sx);pts.push([sx,SY(terrH(wx,H.stage)),wx])}
  x.beginPath();x.moveTo(-step,Hh);for(const[sx,y]of pts)x.lineTo(sx,y+hd);x.lineTo(W+step,Hh);x.closePath();
  const pat=x.createPattern(texFor(H.stage),'repeat');try{pat.setTransform(new DOMMatrix().translateSelf(SX(0)%(128*sc),SY(0)%(128*sc)).scaleSelf(sc*1.2,sc*1.2))}catch(e){}
  x.fillStyle=pat;x.fill();const dg=x.createLinearGradient(0,Hh*.4,0,Hh);dg.addColorStop(0,'#00000000');dg.addColorStop(1,'#00000055');x.fillStyle=dg;x.fill();
  x.save();x.clip();x.strokeStyle='#0000001a';x.lineWidth=6*sc;for(const off of[46,110]){x.beginPath();pts.forEach(([sx,y],i)=>i?x.lineTo(sx,y+hd+off*sc):x.moveTo(sx,y+hd+off*sc));x.stroke()}x.restore();
  // props standing on the far edge of the road (3D depth)
  if(st.prop){for(let i=Math.floor((WX(0)-100)/230);i<(WX(W)+100)/230;i++){if((i*13)%5<2)continue;const wx=i*230+((i*57)%90);if(pitAt(wx,H.stage)||pitAt(wx+60,H.stage)||pitAt(wx-60,H.stage)||wx<250)continue;const y=SY(terrH(wx,H.stage))-hd;hcProp(x,st.prop,SX(wx),y+2*sc,sc*1.15,i+3)}}
  // road top surface with slope lighting
  const tc0=st.top[0],tc1=st.top[1];for(let i=1;i<pts.length;i++){const[a,ya]=pts[i-1],[b,yb]=pts[i],sl=(yb-ya)/(b-a);x.fillStyle=shade(tc0,sl>0?-Math.min(.35,sl*.5):Math.min(.25,-sl*.35));x.beginPath();x.moveTo(a,ya+hd);x.lineTo(b+.5,yb+hd);x.lineTo(b+.5,yb-hd);x.lineTo(a,ya-hd);x.fill()}
  x.lineJoin='round';x.beginPath();pts.forEach(([sx,y],i)=>i?x.lineTo(sx,y-hd):x.moveTo(sx,y-hd));x.strokeStyle=shade(tc1,-.1);x.lineWidth=3*sc;x.stroke();
  x.beginPath();pts.forEach(([sx,y],i)=>i?x.lineTo(sx,y+hd):x.moveTo(sx,y+hd));x.strokeStyle=shade(tc0,.35);x.lineWidth=3*sc;x.stroke();
  x.beginPath();pts.forEach(([sx,y],i)=>i?x.lineTo(sx,y+hd+4*sc):x.moveTo(sx,y+hd+4*sc));x.strokeStyle='#0000002a';x.lineWidth=5*sc;x.stroke();
  for(const f of feats(H.stage)){if(f.t!='pit'||f.x+f.w<WX(0)-50||f.x>WX(W)+50)continue;const b=baseH(f.x,H.stage),wl=b-f.d*.5;
    if(st.water){const wg=x.createLinearGradient(0,SY(wl),0,SY(b-f.d));wg.addColorStop(0,st.water);wg.addColorStop(1,st.lava?'#7f1d1d':'#0c4a6e');x.fillStyle=wg;x.beginPath();x.moveTo(SX(f.x+6),SY(b-f.d));for(let wx=f.x+6;wx<=f.x+f.w-6;wx+=6)x.lineTo(SX(wx),SY(wl+Math.sin(wx*.08+H.t*3)*3));x.lineTo(SX(f.x+f.w-6),SY(b-f.d));x.fill();
      x.strokeStyle=st.lava?'#fde047':'#e0f2fe';x.lineWidth=3*sc;x.beginPath();for(let wx=f.x+6;wx<=f.x+f.w-6;wx+=6){const y=SY(wl+Math.sin(wx*.08+H.t*3)*3);wx==f.x+6?x.moveTo(SX(wx),y):x.lineTo(SX(wx),y)}x.stroke()}
    const px=SX(f.x-200),py=SY(terrH(f.x-200,H.stage));x.fillStyle='#78350f';x.fillRect(px-2*sc,py-46*sc,4*sc,46*sc);x.fillStyle='#facc15';x.strokeStyle='#111';x.lineWidth=2*sc;x.beginPath();x.moveTo(px,py-70*sc);x.lineTo(px+16*sc,py-46*sc);x.lineTo(px-16*sc,py-46*sc);x.closePath();x.fill();x.stroke();
    x.fillStyle='#111';x.font=`bold ${14*sc}px sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText('!',px,py-53*sc)}
  
  if(H.stage=='meadow'){for(let i=Math.floor(WX(0)/22);i<WX(W)/22;i++){const wx=i*22;if(softAt(wx,H.stage)||pitAt(wx,H.stage))continue;const y=SY(terrH(wx,H.stage))-hd+2*sc;x.fillStyle=st.top[1];x.beginPath();x.moveTo(SX(wx)-3*sc,y-2*sc);x.lineTo(SX(wx)+(i%2?2:-2)*sc,y-11*sc);x.lineTo(SX(wx)+3*sc,y-2*sc);x.fill();
    if(i%9==0){x.fillStyle=['#f472b6','#facc15','#fff'][i%3];x.beginPath();x.arc(SX(wx)+4*sc,y-12*sc,3*sc,0,7);x.fill()}}}
  if(st.soft){const so=SOFT[st.soft];for(const f of feats(H.stage)){if(f.t!='soft'||f.x+f.w<WX(0)||f.x>WX(W))continue;x.strokeStyle=so.c;x.lineWidth=DY*.9;x.beginPath();for(let wx=f.x;wx<=f.x+f.w;wx+=6){const y=SY(terrH(wx,H.stage));wx==f.x?x.moveTo(SX(wx),y):x.lineTo(SX(wx),y)}x.stroke();
      if(st.soft=='ice'){x.strokeStyle='#fff';x.lineWidth=2*sc;for(let wx=f.x+15;wx<f.x+f.w;wx+=50){const y=SY(terrH(wx,H.stage));x.beginPath();x.moveTo(SX(wx),y-3*sc);x.lineTo(SX(wx+14),y-3*sc);x.stroke()}}
      else{x.fillStyle=so.c2;for(let wx=f.x+20;wx<f.x+f.w;wx+=45){const y=SY(terrH(wx,H.stage));x.beginPath();x.arc(SX(wx),y-4*sc,(3+Math.sin(H.t*2+wx)*1.5)*sc,0,7);x.fill()}}
      x.fillStyle=st.soft=='ice'?'#0369a1':'#fff';x.font=`bold ${13*sc}px sans-serif`;x.textAlign='center';x.fillText(so.label,SX(f.x+f.w/2),SY(terrH(f.x+f.w/2,H.stage)+46))}}
  for(const f of feats(H.stage)){if(f.t!='rock'||f.x+f.w<WX(0)||f.x-f.w>WX(W))continue;const bx=SX(f.x),by=SY(baseH(f.x,H.stage)),rw=f.w/2*sc,rh=f.h*sc;
    const rg=x.createRadialGradient(bx-rw*.3,by-rh*.7,2,bx,by-rh*.4,rw*1.2);rg.addColorStop(0,moon?'#e4e4e7':H.stage=='desert'?'#fdba74':'#d6d3d1');rg.addColorStop(1,moon?'#52525b':H.stage=='desert'?'#9a3412':'#57534e');x.fillStyle=rg;
    x.beginPath();x.ellipse(bx,by,rw*1.02,rh+2*sc,0,Math.PI,0);x.lineTo(bx+rw,by+6*sc);x.lineTo(bx-rw,by+6*sc);x.fill();x.strokeStyle='#0003';x.lineWidth=2*sc;x.beginPath();x.moveTo(bx-rw*.2,by-rh*.8);x.lineTo(bx+rw*.1,by-rh*.4);x.lineTo(bx-rw*.05,by-rh*.1);x.stroke();
    if(H.stage=='snow'){x.fillStyle='#fff';x.beginPath();x.ellipse(bx,by-rh*.85,rw*.6,rh*.25,0,Math.PI,0);x.fill()}}
  const left=WX(0)-80,right=WX(W)+80;x.textAlign='center';x.textBaseline='middle';
  if(H.best>5){const bx=100+H.best*20;if(bx>left&&bx<right){const py=SY(terrH(bx,H.stage)),px=SX(bx);x.strokeStyle='#a16207';x.lineWidth=4*sc;x.beginPath();x.moveTo(px,py);x.lineTo(px,py-120*sc);x.stroke();
    x.fillStyle='#facc15';x.beginPath();x.moveTo(px,py-120*sc);x.lineTo(px+50*sc,py-106*sc);x.lineTo(px,py-92*sc);x.fill();x.fillStyle='#713f12';x.font=`bold ${12*sc}px sans-serif`;x.fillText('BEST',px+20*sc,py-106*sc)}}
  for(let k=Math.max(1,Math.floor((left-100)/2000));k<=Math.floor((right-100)/2000);k++){const fx=100+k*2000,fy=SY(terrH(fx,H.stage)),px=SX(fx);
    x.strokeStyle='#e7e5e4';x.lineWidth=4*sc;x.beginPath();x.moveTo(px,fy);x.lineTo(px,fy-100*sc);x.stroke();
    for(let r=0;r<3;r++)for(let c=0;c<4;c++){x.fillStyle=(r+c)%2?(k<=H.lastCp?'#22c55e':'#111'):'#fff';x.fillRect(px+c*11*sc,fy-100*sc+r*10*sc,11*sc,10*sc)}
    x.fillStyle='#fff';x.strokeStyle='#0008';x.lineWidth=3*sc;x.font=`bold ${16*sc}px sans-serif`;x.strokeText(k*100+'m',px+22*sc,fy-112*sc);x.fillText(k*100+'m',px+22*sc,fy-112*sc)}
  if(H.lv&&H.lv.fx>left&&H.lv.fx<right+200){const fx=H.lv.fx,px=SX(fx),py=SY(terrH(fx,H.stage)),ht=150*sc,wd=DY*1.6;
    for(const[ox,oy]of[[-wd*.3,-hd],[wd*.3,hd]]){x.fillStyle='#e5e7eb';x.fillRect(px+ox-4*sc,py+oy-ht,8*sc,ht);x.fillStyle='#9ca3af';x.fillRect(px+ox+1*sc,py+oy-ht,3*sc,ht)}
    const by=py-ht-hd;for(let r=0;r<2;r++)for(let c=0;c<10;c++){x.fillStyle=(r+c)%2?'#111':'#fff';x.fillRect(px-50*sc+c*10*sc,by-6*sc+r*10*sc,10*sc,10*sc)}
    x.fillStyle='#ef4444';rr(x,px-46*sc,by-34*sc,92*sc,26*sc,6*sc);x.fill();x.fillStyle='#fff';x.font=`bold ${17*sc}px sans-serif`;x.fillText('FINISH',px,by-20*sc);
    for(let i=0;i<6;i++){const a=H.t*2+i;x.fillStyle=['#facc15','#22c55e','#3b82f6','#ec4899'][i%4];x.fillRect(px-60*sc+i*24*sc,by-44*sc+Math.sin(a)*4*sc,6*sc,9*sc)}}
  for(let k=H.fuelK;k<H.fuelK+4;k++){const fx=fuelX(k,H.stage);if(fx>right)break;if(fx<left||H.took.has('f'+k))continue;const px=SX(fx),py=SY(terrH(fx,H.stage)+H.R+22+Math.sin(H.t*3)*4);
    x.fillStyle='#fde04755';x.beginPath();x.arc(px,py,26*sc,0,7);x.fill();x.fillStyle='#dc2626';rr(x,px-12*sc,py-16*sc,24*sc,30*sc,4*sc);x.fill();x.strokeStyle='#7f1d1d';x.lineWidth=2*sc;x.stroke();x.fillStyle='#fde047';x.font=`bold ${14*sc}px sans-serif`;x.fillText('F',px,py);
    x.strokeStyle='#7f1d1d';x.lineWidth=3*sc;x.beginPath();x.moveTo(px-6*sc,py-16*sc);x.lineTo(px-6*sc,py-22*sc);x.lineTo(px+6*sc,py-22*sc);x.stroke()}
  const BS=H.mode=='coins'?190:420,BN=H.mode=='coins'?4:3;for(let i=Math.max(0,Math.floor((left-420)/BS));i<=Math.floor((right-420)/BS);i++){const bx=420+i*BS;for(let j=0;j<BN;j++){const wx=bx+j*26;if(H.took.has(`c${i}_${j}`))continue;
    const px=SX(wx),py=SY(terrH(wx,H.stage)+H.R+38+(H.mode=='coins'&&i%4==2?70:0))+Math.sin(H.t*4+j)*3*sc;x.fillStyle='#facc15';x.strokeStyle='#a16207';x.lineWidth=2.5*sc;x.beginPath();for(let q=0;q<6;q++){const a=q*1.047+H.t;x[q?'lineTo':'moveTo'](px+Math.cos(a)*11*sc,py+Math.sin(a)*11*sc)}x.closePath();x.fill();x.stroke();
    x.fillStyle='#a16207';x.beginPath();x.arc(px,py,4*sc,0,7);x.fill();x.fillStyle='#fff9';x.beginPath();x.arc(px-4*sc,py-4*sc,2*sc,0,7);x.fill()}}
  for(const p of H.pops){x.globalAlpha=Math.min(1,p.l*2);x.fillStyle='#fde047';x.strokeStyle='#713f12';x.lineWidth=3*sc;x.font=`bold ${16*sc}px sans-serif`;x.strokeText('+1',SX(p.x),SY(p.y));x.fillText('+1',SX(p.x),SY(p.y))}x.globalAlpha=1;
  for(const d of H.parts){x.globalAlpha=Math.max(0,Math.min(1,d.l*1.4))*(d.smoke?.5:1);
    if(d.line){x.strokeStyle=d.c;x.lineWidth=2*dpr;x.beginPath();x.moveTo(SX(d.x),SY(d.y));x.lineTo(SX(d.x)+40*sc,SY(d.y));x.stroke()}
    else if(d.star){x.font=`${16*sc}px sans-serif`;x.fillText('⭐',SX(d.x),SY(d.y))}else{x.fillStyle=d.c;x.beginPath();x.arc(SX(d.x),SY(d.y),(d.smoke?d.s+(.8-d.l)*18:d.s)*sc,0,7);x.fill()}}x.globalAlpha=1;
  if(H.crashT<=0||Math.floor(H.crashT*8)%2){const gsy=SY(terrH(cx,H.stage)),dist=Math.max(0,(cy-terrH(cx,H.stage))*sc);x.fillStyle=`rgba(0,0,0,${Math.max(.05,.25-dist/600)})`;x.beginPath();x.ellipse(SX(cx),gsy+2*sc,64*sc,7*sc,0,0,7);x.fill();
    const lift=H.R+6,bx=SX(cx)-Math.sin(ang)*lift*sc,by=SY(cy)-Math.cos(ang)*lift*sc;drawVehicle(x,H.veh,bx,by,ang,sc,garageS().paint,H.w1.rot,H.w2.rot,-H.bob);
    if(H.crates){const cp={jeep:[-44,-18],buggy:[-30,-12],monster:[-50,-30],bike:[-26,-20],tractor:[14,-26],bus:[-30,-50]}[H.veh]||[-40,-18];x.save();x.translate(bx,by);x.rotate(-ang);x.scale(sc,sc);x.translate(0,-H.bob);
      for(let i=0;i<H.crates;i++){const ox=cp[0]+(i==2?9:i*18),oy=cp[1]-(i==2?17:0)-17+Math.sin(H.t*9+i)*Math.min(2,Math.abs(H.bobV)*.01);x.fillStyle='#b45309';x.strokeStyle='#78350f';x.lineWidth=2;x.fillRect(ox,oy,17,17);x.strokeRect(ox,oy,17,17);x.beginPath();x.moveTo(ox,oy);x.lineTo(ox+17,oy+17);x.moveTo(ox+17,oy);x.lineTo(ox,oy+17);x.stroke()}x.restore()}}
  if(H.mode=='night'){const nc=H.nightC||(H.nightC=document.createElement('canvas'));if(nc.width!=W||nc.height!=Hh){nc.width=W;nc.height=Hh}const n=nc.getContext('2d'),vx=SX(cx),vy=SY(cy)-20*sc,dx=Math.cos(ang),dy=-Math.sin(ang);
    n.globalCompositeOperation='source-over';n.clearRect(0,0,W,Hh);n.fillStyle='rgba(3,7,30,.86)';n.fillRect(0,0,W,Hh);n.globalCompositeOperation='destination-out';
    const L1=520*sc,sp2=.42,g1=n.createRadialGradient(vx,vy,10*sc,vx,vy,L1);g1.addColorStop(0,'#000');g1.addColorStop(.7,'#000c');g1.addColorStop(1,'#0000');n.fillStyle=g1;n.beginPath();n.moveTo(vx+dx*30*sc,vy+dy*30*sc);
    n.lineTo(vx+(dx*Math.cos(sp2)-dy*Math.sin(sp2))*L1,vy+(dy*Math.cos(sp2)+dx*Math.sin(sp2))*L1);n.lineTo(vx+(dx*Math.cos(-sp2)-dy*Math.sin(-sp2))*L1,vy+(dy*Math.cos(-sp2)+dx*Math.sin(-sp2))*L1);n.closePath();n.fill();
    const g2=n.createRadialGradient(vx,vy,0,vx,vy,150*sc);g2.addColorStop(0,'#000');g2.addColorStop(1,'#0000');n.fillStyle=g2;n.beginPath();n.arc(vx,vy,150*sc,0,7);n.fill();x.drawImage(nc,0,0);
    x.fillStyle='#fff';for(let i=0;i<40;i++){const px=((i*137-H.camX*.02*sc)%W+W)%W,py=(i*71)%(Hh*.45);x.globalAlpha=.4+.4*Math.sin(H.t*2+i);x.fillRect(px,py,2*dpr,2*dpr)}x.globalAlpha=1}
  // speedometer
  const gr=Math.min(W,Hh)*.085,gx=W/2,gy=Hh-gr*.55-10*dpr,spd=Math.round(sp/20*3.6);
  x.fillStyle='#000a';x.beginPath();x.arc(gx,gy,gr,Math.PI,0);x.fill();x.strokeStyle='#fff3';x.lineWidth=gr*.12;x.beginPath();x.arc(gx,gy,gr*.82,Math.PI,0);x.stroke();
  x.strokeStyle=sp/H.maxV>.85?'#ef4444':'#22c55e';x.beginPath();x.arc(gx,gy,gr*.82,Math.PI,Math.PI+Math.PI*Math.min(1,sp/(H.maxV*1.15)));x.stroke();
  const na=Math.PI+Math.PI*Math.min(1,sp/(H.maxV*1.15));x.strokeStyle='#fde047';x.lineWidth=gr*.06;x.beginPath();x.moveTo(gx,gy);x.lineTo(gx+Math.cos(na)*gr*.7,gy+Math.sin(na)*gr*.7);x.stroke();
  x.fillStyle='#fff';x.font=`bold ${gr*.38}px sans-serif`;x.fillText(spd,gx,gy-gr*.28);x.font=`${gr*.18}px sans-serif`;x.fillText('km/h',gx,gy-gr*.02);
  const f=$('#hcf');if(f){f.style.width=H.fuel+'%';f.style.background=H.fuel<25?'#ef4444':'linear-gradient(90deg,#f59e0b,#22c55e)';f.parentNode.classList.toggle('low',H.fuel<25)}
  const m=Math.floor((H.maxX-100)/20),d=$('#hcd');if(d)d.textContent=H.lv?`${Math.min(m,H.lv.dist)} / ${H.lv.dist} m · ${Math.floor(H.t)}s`:H.mode=='coins'?`${Math.max(0,Math.ceil(H.rushT))}s left`:H.mode=='cargo'?`${H.crates} crates · ${m} m`:m+' m';const b=$('#hcb');if(b)b.textContent=H.bolts;
  const pb=$('#hcpb'),goal=H.lv?H.lv.dist:Math.max(H.best,100)*1.05;if(pb){pb.style.width=Math.min(100,m/goal*100)+'%';const bs=$('#hcbest');if(bs){bs.style.left=Math.min(100,H.best/goal*100)+'%';bs.style.display=H.best>5?'block':'none'}}}

/* ---------- game timer shared by pure games ---------- */
// P4-16: the time chip is the shared top bar's (GH.top, 59-game-hub.js); the clock holds while the pause sheet is open (GH.held).
let GT=null;
function gtStop(){if(GT){clearInterval(GT.iv);GT=null}}
function gtStart(el,onEnd){gtStop();GT={up:false,grace:0,iv:setInterval(()=>{if(!GT||document.hidden||GH.held)return;const p=pt();
  if(!GT.up){p.bank=Math.max(0,p.bank-1);p.used+=1;if(ptLeft()<=0){GT.up=true;GT.grace=20;fb('Game time is almost up!','warn long',2500);SFX.rattle()}}
  else if(--GT.grace<=0){gtStop();save();return onEnd()}
  if(p.used%5==0)save();GH.setTime($(el),GT.up?GT.grace:null)},1000)}}
// P4-16: the shared end card (GH.end) for the game on screen; "Earn more time" (#tl) goes home as before
function timeUpOverlay(){const g=GH.get(GH.cur)||{},said=g.saved||'Your game is saved.';
  const o=GH.end(g.id,{title:"Game time's up!",lines:[['check-circle',esc(said)],['path-read','Learn a little to earn more time!']],
    btns:UI.btn('Earn more time',{kind:'primary',size:'lg',icon:'path-read',id:'tl',wide:true})});
  SFX.magic();if(S.voice)say('Game time is up! '+said);o.querySelector('#tl').onclick=()=>{o.remove();home()}}
/* ---------- color by number ---------- */
const CB_COL={rojo:['#ef4444','red'],azul:['#3b82f6','blue'],celeste:['#7dd3fc','light blue'],verde:['#22c55e','green'],'verde oscuro':['#15803d','dark green'],amarillo:['#facc15','yellow'],
  naranja:['#f97316','orange'],morado:['#a855f7','purple'],rosa:['#f9a8d4','pink'],negro:['#27272a','black'],blanco:['#ffffff','white'],'café':['#92400e','brown'],gris:['#a8a29e','gray']};
const CBN=16;
function cbGrid(bg){return Array.from({length:CBN*CBN},()=>bg)}
function cbShape(g,col,test){for(let y=0;y<CBN;y++)for(let x=0;x<CBN;x++)if(test(x+.5,y+.5))g[y*CBN+x]=col}
const inPoly=(px,py,P)=>{let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const[xi,yi]=P[i],[xj,yj]=P[j];if((yi>py)!=(yj>py)&&px<(xj-xi)*(py-yi)/(yj-yi)+xi)c=!c}return c};
const circ=(cx,cy,r)=>(x,y)=>(x-cx)**2+(y-cy)**2<=r*r,ell=(cx,cy,rx,ry)=>(x,y)=>((x-cx)/rx)**2+((y-cy)/ry)**2<=1,box=(a,b,c,d)=>(x,y)=>x>=a&&x<=c&&y>=b&&y<=d,poly=P=>(x,y)=>inPoly(x,y,P);
const CB_PICS=[
 ['heart','Heart',g=>{const G=cbGrid('rosa');cbShape(G,'rojo',(x,y)=>{const X=(x-8)/6.2,Y=-(y-8.6)/6.2;return(X*X+Y*Y-1)**3-X*X*Y*Y*Y<0});cbShape(G,'blanco',circ(5.2,5.8,1.1));return G}],
 ['sun','Sunny Day',g=>{const G=cbGrid('celeste');for(let a=0;a<8;a++){const c=Math.cos(a*Math.PI/4),s=Math.sin(a*Math.PI/4);cbShape(G,'naranja',(x,y)=>{const dx=x-8,dy=y-8,t=dx*c+dy*s,n=Math.abs(-dx*s+dy*c);return t>4.5&&t<7.6&&n<.9})}
   cbShape(G,'amarillo',circ(8,8,4.6));cbShape(G,'negro',circ(6.3,7,.75));cbShape(G,'negro',circ(9.7,7,.75));cbShape(G,'rojo',(x,y)=>(x-8)**2+(y-8.4)**2<6.5&&(x-8)**2+(y-8.4)**2>3&&y>8.9);return G}],
 ['fish','Fishy',g=>{const G=cbGrid('celeste');cbShape(G,'naranja',poly([[11,8],[15.5,4],[15.5,12]]));cbShape(G,'naranja',ell(7,8,5.4,3.8));cbShape(G,'amarillo',(x,y)=>ell(7,8,5.4,3.8)(x,y)&&(Math.abs(x-6)<.9||Math.abs(x-9)<.9));
   cbShape(G,'blanco',circ(3.5,7,1.3));G[6*CBN+3]='negro';cbShape(G,'blanco',circ(12,2.5,.8));cbShape(G,'blanco',circ(13.6,1.2,.6));cbShape(G,'verde',box(0,14,16,16));cbShape(G,'verde',poly([[2,14],[3,10],[4,14]]));return G}],
 ['rocket','Rocket',g=>{const G=cbGrid('azul');[[2,2],[13,3],[3,12],[12,13],[1,7]].forEach(([a,b])=>cbShape(G,'amarillo',box(a,b,a+.9,b+.9)));
   cbShape(G,'rojo',poly([[3,14],[5.6,8.5],[5.6,14]]));cbShape(G,'rojo',poly([[13,14],[10.4,8.5],[10.4,14]]));cbShape(G,'blanco',box(5.5,5,10.5,13.5));cbShape(G,'rojo',poly([[5.5,5],[8,1],[10.5,5]]));
   cbShape(G,'celeste',circ(8,7.6,1.5));cbShape(G,'naranja',poly([[6.5,13.5],[8,16],[9.5,13.5]]));cbShape(G,'amarillo',poly([[7.3,13.5],[8,15],[8.7,13.5]]));return G}],
 ['house','Home',g=>{const G=cbGrid('celeste');cbShape(G,'verde',box(0,13,16,16));cbShape(G,'amarillo',circ(13.5,2.5,1.8));cbShape(G,'café',box(3,7,13,13));cbShape(G,'rojo',poly([[1.5,7.5],[8,2],[14.5,7.5]]));
   cbShape(G,'amarillo',box(9.5,8.5,11.5,10.5));cbShape(G,'blanco',box(7,9,9,13));cbShape(G,'amarillo',box(4.5,8.5,6.5,10.5));return G}],
 ['rainbow','Rainbow',g=>{const G=cbGrid('celeste');[['rojo',7.5],['naranja',6.5],['amarillo',5.5],['verde',4.5],['azul',3.5],['morado',2.5]].forEach(([c,r])=>cbShape(G,c,(x,y)=>y<=12&&(x-8)**2+(y-12)**2<=r*r));
   cbShape(G,'celeste',(x,y)=>y<=12&&(x-8)**2+(y-12)**2<=1.6*1.6);cbShape(G,'blanco',(x,y)=>circ(2.5,12,1.8)(x,y)||circ(4.3,12.4,1.6)(x,y)||circ(13.5,12,1.8)(x,y)||circ(11.7,12.4,1.6)(x,y));cbShape(G,'verde',box(0,14,16,16));return G}],
 ['flower','Flower',g=>{const G=cbGrid('celeste');cbShape(G,'verde',box(0,14,16,16));cbShape(G,'verde oscuro',box(7.5,8,8.5,15));cbShape(G,'verde oscuro',ell(5.5,11.5,2,1));cbShape(G,'verde oscuro',ell(10.5,12,2,1));
   for(let a=0;a<6;a++)cbShape(G,'rosa',circ(8+Math.cos(a*1.047)*2.8,5.5+Math.sin(a*1.047)*2.8,1.9));cbShape(G,'amarillo',circ(8,5.5,1.9));return G}],
 ['ladybug','Ladybug',g=>{const G=cbGrid('verde');cbShape(G,'verde oscuro',(x,y)=>Math.abs(((x*1.7+y)%5)-2.5)<.5&&y>12);cbShape(G,'negro',circ(8,4,2.6));cbShape(G,'rojo',circ(8,9.5,5.2));cbShape(G,'negro',box(7.6,4.5,8.4,14.7));
   [[5.5,8],[10.5,8],[5.6,11.5],[10.4,11.5]].forEach(([a,b])=>cbShape(G,'negro',circ(a,b,1.1)));cbShape(G,'blanco',circ(6.9,3.4,.55));cbShape(G,'blanco',circ(9.1,3.4,.55));return G}],
 ['icecream','Ice Cream',g=>{const G=cbGrid('rosa');cbShape(G,'café',poly([[4.5,8.5],[11.5,8.5],[8,15.5]]));cbShape(G,'amarillo',(x,y)=>poly([[4.5,8.5],[11.5,8.5],[8,15.5]])(x,y)&&Math.abs(((x+y)%2.4)-1.2)<.3);
   cbShape(G,'blanco',circ(6,7.5,2.4));cbShape(G,'morado',circ(10,7.5,2.4));cbShape(G,'blanco',circ(8,5,2.6));cbShape(G,'rojo',circ(8,1.8,1.1));return G}],
 ['tree','Apple Tree',g=>{const G=cbGrid('celeste');cbShape(G,'verde',box(0,13.5,16,16));cbShape(G,'café',box(6.8,9,9.2,14));cbShape(G,'verde oscuro',(x,y)=>circ(8,6,4.6)(x,y)||circ(4.8,8,2.6)(x,y)||circ(11.2,8,2.6)(x,y));
   [[6,5],[9.5,4],[10.5,8],[5,8.5],[8,8]].forEach(([a,b])=>cbShape(G,'rojo',circ(a,b,.75)));return G}],
 ['truck','Monster Truck',g=>{const G=cbGrid('celeste');cbShape(G,'café',box(0,13.5,16,16));cbShape(G,'rojo',box(1.5,7,14.5,11));cbShape(G,'rojo',poly([[5,7],[6.5,3.5],[11,3.5],[12,7]]));
   cbShape(G,'celeste',poly([[6.5,6.8],[7.5,4.3],[10.3,4.3],[11,6.8]]));cbShape(G,'negro',circ(4.5,12,2.5));cbShape(G,'negro',circ(11.5,12,2.5));cbShape(G,'gris',circ(4.5,12,1));cbShape(G,'gris',circ(11.5,12,1));cbShape(G,'amarillo',box(13.5,8,14.5,9));return G}],
 ['star','Happy Star',g=>{const G=cbGrid('azul');const P=[];for(let i=0;i<10;i++){const r=i%2?3.2:7.4,a=-Math.PI/2+i*Math.PI/5;P.push([8+Math.cos(a)*r,8.6+Math.sin(a)*r])}cbShape(G,'amarillo',poly(P));
   cbShape(G,'negro',circ(6.5,8,.7));cbShape(G,'negro',circ(9.5,8,.7));cbShape(G,'rojo',(x,y)=>(x-8)**2+(y-9.4)**2<3.2&&y>9.6);cbShape(G,'rosa',circ(5.3,9.6,.7));cbShape(G,'rosa',circ(10.7,9.6,.7));
   [[2,2],[14,3],[1.5,14],[14.5,14]].forEach(([a,b])=>cbShape(G,'blanco',box(a,b,a+.9,b+.9)));return G}]];
function cbData(id){const p=CB_PICS.find(x=>x[0]==id),G=p[2]();const keys=[];G.forEach(k=>{if(!keys.includes(k))keys.push(k)});return{id,name:p[1],G,keys,num:G.map(k=>keys.indexOf(k)+1)}}
function cbS(){return S.cbn=Object.assign({done:{},prog:{},art:[]},S.cbn||{})}
function cbThumb(G,fill,size=96){const c=document.createElement('canvas');c.setAttribute('aria-hidden','true');c.width=c.height=size;const x=c.getContext('2d'),s=size/CBN;
  G.forEach((k,i)=>{x.fillStyle=fill&&fill[i]=='1'||fill===true?CB_COL[k][0]:shade(CB_COL[k][0],.72);x.fillRect((i%CBN)*s,Math.floor(i/CBN)*s,s+.5,s+.5)});return c.toDataURL()}

let CBTAB='shape';
function cbFact(n,lv){const r=Math.random();
  if(lv==1){if(r<.35){const big=n+R(1,5);return`${big} − ${big-n}`}const a=R(0,n);return`${a} + ${n-a}`}
  if(lv==2){if(r<.4){const big=n+R(6,12);return`${big} − ${big-n}`}if(r<.7){const a=R(0,n),b=R(1,5);return`${a+b} + ${n-a} − ${b}`}if(n>1){const c=R(1,Math.min(5,n-1)),a=R(2,6);return`${n-c+a} − ${a} + ${c}`}const a=R(0,n);return`${a} + ${n-a}`}
  const fs=[];for(let a=2;a<=n;a++)if(n%a==0&&n/a>1)fs.push(a);if(fs.length&&r<.4){const a=pick(fs);return`${a} × ${n/a}`}
  if(r<.7){const k=R(2,5);return`${n*k} ÷ ${k}`}const a=R(2,4),b=R(2,4);return a*b==n?`${a} × ${b}`:a*b>n?`${a} × ${b} − ${a*b-n}`:`${a} × ${b} + ${n-a*b}`}
function modeChooser(onPick,withFree){const o=document.createElement('div');o.className='ovl';
  o.innerHTML=`<div style="background:#fff;color:var(--ink);border-radius:24px;padding:20px;max-width:520px;width:92vw;text-align:center"><h2 style="margin:0 0 10px">How do you want to color?</h2>
   <div class="games">${withFree?'<button class="btn game" data-m="free" style="background:#fce7f3"><span class="ge">🖌️</span><span class="gi"><span class="gt">Color It My Way</span><span class="small">Pick any colors you like</span></span></button>':''}
   <button class="btn game" data-m="num" style="background:#dbeafe"><span class="ge">🔢</span><span class="gi"><span class="gt">Color by Number</span><span class="small">Match the number to the color</span></span></button>
   <div class="mrow" style="background:#fef3c7"><span class="ge">➕</span><span class="gt">Math Colors</span><div><button class="btn sm" data-m="math">⭐ Easy</button><button class="btn sm" data-m="math2">⭐⭐ Medium</button><button class="btn sm" data-m="math3">⭐⭐⭐ Hard</button></div></div>
   <div class="mrow" style="background:#dcfce7"><span class="ge">🌮</span><span class="gt">Spanish Colors</span><div><button class="btn sm" data-m="es">🔊 With colors</button><button class="btn sm" data-m="es2">📖 Words only</button></div></div></div><button class="btn" id="mx" style="margin-top:10px">Cancel</button></div>`;
  document.body.appendChild(o);o.querySelector('#mx').onclick=()=>o.remove();o.querySelectorAll('[data-m]').forEach(m=>m.onclick=()=>{o.remove();SFX.whoosh();onPick(m.dataset.m)})}
/* ---------- low-poly animal art ---------- */
const MIRP=h=>{const r=h.slice(),l=h.slice(1,-1).reverse().map(([x,y])=>[300-x,y]);return r.concat(l)};
const PTH=p=>'M'+p.map(([x,y])=>x.toFixed(1)+','+y.toFixed(1)).join('L')+'Z';
const ELL=(cx,cy,rx,ry,n=18)=>Array.from({length:n},(_,i)=>{const a=i/n*Math.PI*2;return[cx+Math.cos(a)*rx,cy+Math.sin(a)*ry]});
const MIRX=p=>p.map(([x,y])=>[300-x,y]).reverse();
const POLYART={
 lion:{n:'Lion',bg:34,parts:[
   {p:Array.from({length:44},(_,i)=>{const a=i/44*Math.PI*2,r=(i%2?112:140)+(i%4==0?6:0);return[150+Math.sin(a)*r*.95,150-Math.cos(a)*r]}),s:20},
   {p:ELL(204,96,18,18,12),s:12},{p:ELL(96,96,18,18,12),s:12},
   {p:MIRP([[150,78],[180,82],[202,100],[212,130],[208,162],[198,192],[180,214],[162,226],[150,228]]),s:15},
   {p:MIRP([[150,166],[170,168],[186,184],[182,204],[164,214],[150,216]]),s:11}],
  fix:[[PTH([[136,166],[164,166],[150,184]]),'#3f2a1d'],[PTH(ELL(126,138,13,7)),'#fff'],[PTH(ELL(174,138,13,7)),'#fff'],[PTH(ELL(127,138,5,6)),'#1c1917'],[PTH(ELL(173,138,5,6)),'#1c1917']]},
 wolf:{n:'Howling Wolf',bg:34,parts:[
   {p:ELL(96,98,68,68,30),s:14},
   {p:[[48,48],[80,70],[96,74],[104,62],[114,38],[124,70],[134,84],[146,100],[170,130],[196,152],[222,172],[238,196],[246,214],[272,226],[290,250],[286,266],[260,262],[240,248],[242,268],[240,284],[208,286],[208,276],[218,270],[206,258],[188,250],[166,248],[164,282],[154,288],[130,288],[136,278],[140,246],[134,206],[128,186],[120,166],[110,134],[96,112],[78,98],[44,74],[62,66]],s:13}],
  fix:[[PTH(ELL(100,82,5,3)),'#1c1917'],[PTH(ELL(52,54,5,4)),'#1c1917']]},
 eagle:{n:'Eagle',bg:36,parts:[
   {p:MIRP([[150,50],[164,56],[168,76],[178,96],[212,86],[242,64],[268,40],[290,28],[284,50],[292,60],[276,70],[288,82],[270,90],[280,104],[258,108],[266,122],[242,124],[248,138],[222,138],[218,150],[196,146],[182,162],[178,196],[170,216],[180,238],[172,262],[160,272],[150,278]]),s:14},
   {p:MIRP([[150,44],[166,50],[172,70],[164,86],[150,92]]),s:9}],
  fix:[[PTH([[143,72],[157,72],[154,84],[150,90],[146,84]]),'#f59e0b'],[PTH(ELL(139,62,4,3)),'#1c1917'],[PTH(ELL(161,62,4,3)),'#1c1917'],[PTH([[140,214],[150,226],[160,214],[156,232],[144,232]]),'#f59e0b']]},
 stag:{n:'Stag',bg:34,parts:[
   {p:[[166,122],[172,96],[186,74],[196,40],[204,42],[196,72],[214,56],[222,28],[230,32],[224,62],[242,50],[258,24],[266,28],[250,62],[228,82],[208,98],[196,112],[182,126]],s:10},
   {p:MIRX([[166,122],[172,96],[186,74],[196,40],[204,42],[196,72],[214,56],[222,28],[230,32],[224,62],[242,50],[258,24],[266,28],[250,62],[228,82],[208,98],[196,112],[182,126]]),s:10},
   {p:[[180,138],[224,118],[240,124],[218,148],[188,158]],s:10},{p:MIRX([[180,138],[224,118],[240,124],[218,148],[188,158]]),s:10},
   {p:MIRP([[150,118],[172,124],[186,150],[182,190],[170,232],[162,262],[150,270]]),s:13}],
  fix:[[PTH(ELL(150,258,13,9)),'#1c1917'],[PTH(ELL(132,170,6,8)),'#1c1917'],[PTH(ELL(168,170,6,8)),'#1c1917']]},
 tiger:{n:'Tiger',bg:32,parts:[
   {p:ELL(208,88,22,22,14),s:12},{p:ELL(92,88,22,22,14),s:12},
   {p:MIRP([[150,72],[186,76],[216,96],[234,128],[238,160],[254,182],[234,194],[222,206],[198,226],[172,240],[150,244]]),s:15},
   {p:MIRP([[150,168],[174,170],[192,190],[182,214],[150,222]]),s:11}],
  fix:[[PTH([[150,82],[160,98],[150,118],[140,98]]),'#1c1917'],[PTH([[234,136],[204,144],[232,150]]),'#1c1917'],[PTH([[66,136],[96,144],[68,150]]),'#1c1917'],[PTH([[236,170],[206,174],[230,184]]),'#1c1917'],[PTH([[64,170],[94,174],[70,184]]),'#1c1917'],
   [PTH([[184,90],[178,108],[192,96]]),'#1c1917'],[PTH([[116,90],[122,108],[108,96]]),'#1c1917'],[PTH([[138,164],[162,164],[150,178]]),'#be185d'],[PTH(ELL(124,138,12,7)),'#fde047'],[PTH(ELL(176,138,12,7)),'#fde047'],[PTH(ELL(124,138,3,6)),'#1c1917'],[PTH(ELL(176,138,3,6)),'#1c1917']]},
 owl:{n:'Great Owl',bg:34,parts:[
   {p:MIRP([[150,46],[172,46],[190,26],[194,56],[210,80],[218,120],[216,170],[204,214],[184,246],[162,262],[150,264]]),s:15},
   {p:[[206,104],[230,130],[236,178],[222,224],[196,252],[188,196],[200,150]],s:12},{p:MIRX([[206,104],[230,130],[236,178],[222,224],[196,252],[188,196],[200,150]]),s:12},
   {p:ELL(150,200,46,56,20),s:12},{p:ELL(178,110,36,34,18),s:11},{p:ELL(122,110,36,34,18),s:11}],
  fix:[[PTH(ELL(122,110,16,16)),'#f59e0b'],[PTH(ELL(178,110,16,16)),'#f59e0b'],[PTH(ELL(122,110,8,8)),'#1c1917'],[PTH(ELL(178,110,8,8)),'#1c1917'],[PTH([[144,124],[156,124],[150,142]]),'#78350f'],[PTH([[136,262],[146,262],[142,272]]),'#f59e0b'],[PTH([[154,262],[164,262],[158,272]]),'#f59e0b']]},
 horse:{n:'Wild Horse',bg:34,parts:[
   {p:[[268,98],[272,114],[256,120],[238,114],[226,104],[216,124],[214,150],[220,172],[214,188],[216,232],[222,272],[230,286],[206,286],[204,274],[200,234],[196,200],[188,200],[190,236],[188,274],[194,286],[170,286],[172,272],[174,234],[170,196],[150,198],[118,198],[112,206],[118,236],[108,272],[114,286],[90,286],[92,272],[98,240],[92,218],[86,222],[84,250],[78,274],[84,286],[60,286],[62,272],[68,242],[66,206],[64,176],[60,150],[44,176],[34,214],[28,236],[20,230],[24,196],[34,160],[52,132],[70,124],[110,128],[150,130],[180,118],[196,94],[214,72],[232,58],[236,36],[246,56],[254,62],[262,74]],s:13},
   {p:[[176,122],[190,92],[210,66],[232,54],[228,74],[214,96],[202,118],[190,134]],s:9}],
  fix:[[PTH(ELL(244,78,4,3)),'#1c1917'],[PTH(ELL(264,104,3,2)),'#1c1917']]},
 fox:{n:'Fox',bg:32,parts:[
   {p:[[214,252],[256,236],[284,200],[290,160],[276,180],[256,200],[228,214],[206,222]],s:13},
   {p:[[150,132],[176,140],[196,170],[206,212],[204,250],[214,270],[184,276],[150,278],[116,276],[86,270],[96,250],[94,212],[104,170],[124,140]],s:15},
   {p:[[194,62],[214,22],[222,72]],s:9},{p:MIRX([[194,62],[214,22],[222,72]]),s:9},
   {p:MIRP([[150,58],[184,62],[214,82],[232,112],[244,124],[222,138],[196,156],[166,174],[150,178]]),s:13},
   {p:MIRP([[150,118],[164,124],[176,146],[162,166],[150,172]]),s:9}],
  fix:[[PTH(ELL(150,168,8,6)),'#1c1917'],[PTH(ELL(124,112,6,8)),'#1c1917'],[PTH(ELL(176,112,6,8)),'#1c1917']]}};
const POLYC={};
function delaunay(P){const n=P.length;let mx=-1e9,my=-1e9,nx=1e9,ny=1e9;for(const[x,y]of P){mx=Math.max(mx,x);my=Math.max(my,y);nx=Math.min(nx,x);ny=Math.min(ny,y)}
  const d=Math.max(mx-nx,my-ny)*20,cx=(mx+nx)/2,cy=(my+ny)/2,pts=P.concat([[cx-d,cy-d],[cx+d,cy-d],[cx,cy+d]]);let T=[[n,n+1,n+2]];
  const cc=t=>{const[a,b,c]=t.map(i=>pts[i]),D=2*(a[0]*(b[1]-c[1])+b[0]*(c[1]-a[1])+c[0]*(a[1]-b[1]));if(Math.abs(D)<1e-9)return[0,0,1e18];const a2=a[0]*a[0]+a[1]*a[1],b2=b[0]*b[0]+b[1]*b[1],c2=c[0]*c[0]+c[1]*c[1];
    const ux=(a2*(b[1]-c[1])+b2*(c[1]-a[1])+c2*(a[1]-b[1]))/D,uy=(a2*(c[0]-b[0])+b2*(a[0]-c[0])+c2*(b[0]-a[0]))/D;return[ux,uy,(a[0]-ux)**2+(a[1]-uy)**2]};
  let C=T.map(cc);
  for(let i=0;i<n;i++){const[x,y]=pts[i],bad=[],keepT=[],keepC=[];T.forEach((t,k)=>{const c=C[k];((x-c[0])**2+(y-c[1])**2<c[2])?bad.push(t):(keepT.push(t),keepC.push(c))});
    const E=new Map();for(const t of bad)for(const[a,b]of[[t[0],t[1]],[t[1],t[2]],[t[2],t[0]]]){const k=a<b?a+'_'+b:b+'_'+a;E.set(k,E.has(k)?null:[a,b])}
    T=keepT;C=keepC;for(const e of E.values())if(e){const t=[e[0],e[1],i];T.push(t);C.push(cc(t))}}
  return T.filter(t=>t.every(i=>i<n)).map(t=>t.map(i=>P[i]))}
function polyArt(id){if(POLYC[id])return POLYC[id];const A=POLYART[id],r=rng(id.length*7919+id.charCodeAt(0)),NS='http://www.w3.org/2000/svg',svg=document.createElementNS(NS,'svg');svg.setAttribute('viewBox','0 0 300 300');svg.style.cssText='position:absolute;width:300px;height:300px;left:-9999px;top:0';document.body.appendChild(svg);
  const regs=[];let g=0;
  const tri=(outline,s,cut)=>{const el=document.createElementNS(NS,'path');el.setAttribute('d',outline);svg.appendChild(el);const pts=[],L=el.getTotalLength();
    for(let l=0;l<L;l+=s*.55){const p=el.getPointAtLength(l);pts.push([p.x,p.y])}
    const inside=(x,y)=>{const q=svg.createSVGPoint();q.x=x;q.y=y;return el.isPointInFill(q)};
    for(let y=s*.5;y<300;y+=s*.86)for(let x=(Math.round(y/s)%2?s*.5:0);x<300;x+=s){const px=x+(r()-.5)*s*.7,py=y+(r()-.5)*s*.7;if(inside(px,py)){let ok=true;for(const q of pts)if((q[0]-px)**2+(q[1]-py)**2<(s*.42)**2){ok=false;break}if(ok)pts.push([px,py])}}
    for(const t of delaunay(pts)){const c=[(t[0][0]+t[1][0]+t[2][0])/3,(t[0][1]+t[1][1]+t[2][1])/3];if(!inside(...c))continue;
      if(!t.every(p=>inside(p[0]+(c[0]-p[0])*.18,p[1]+(c[1]-p[1])*.18)))continue;if(cut&&cut(c))continue;regs.push({d:PTH(t),t:'',g:++g})}
    el.remove()};
  // background: big low-poly facets
  tri('M-2,-2H302V302H-2Z',A.bg||34);
  for(const P of A.parts){const d=PTH(P.p);if(P.fill===0)continue;tri(d,P.s||14)}
  for(const P of A.parts){if(P.fill===0)continue;regs.push({d:PTH(P.p),t:'',g:++g,ov:1})}
  for(const[d,c]of A.fix||[])regs.push({d,t:'',g:++g,fix:c});
  svg.remove();return POLYC[id]=regs}

/* ---------- art studio: mandalas, stained glass, animals, neon draw ---------- */
const PALS={'🌅 Sunset':['#7f1d1d','#dc2626','#f97316','#fb923c','#fbbf24','#fde68a','#be185d','#f472b6','#4c1d95','#fff7ed'],
 '🌊 Ocean':['#082f49','#0c4a6e','#0369a1','#0ea5e9','#7dd3fc','#e0f2fe','#134e4a','#14b8a6','#5eead4','#f0fdfa'],
 '🍬 Candy':['#db2777','#f472b6','#fbcfe8','#a855f7','#d8b4fe','#60a5fa','#bfdbfe','#34d399','#fde047','#ffffff'],
 '🌲 Forest':['#14532d','#166534','#22c55e','#86efac','#365314','#a3e635','#78350f','#b45309','#d6d3d1','#fef3c7'],
 '⚡ Neon':['#000000','#ff00aa','#ff2d55','#ff9500','#ffee00','#39ff14','#00ffd5','#00b3ff','#7a5cff','#ffffff'],
 '🪨 Earth':['#1c1917','#44403c','#78716c','#a8a29e','#e7e5e4','#7c2d12','#c2410c','#ca8a04','#3f6212','#fafaf9']};
function P2(a,r){return[(150+Math.sin(a)*r).toFixed(1),(150-Math.cos(a)*r).toFixed(1)].join(',')}
function mandala(seed){const r=rng(seed*7919+11),N=[8,10,12,12,14,16][Math.floor(r()*6)],regs=[],s=Math.PI/N;let g=0;
  const add=(d,off=0)=>{g++;for(let k=0;k<N;k++)regs.push({d,t:`rotate(${(k*360/N+off).toFixed(2)} 150 150)`,g})};
  const one=d=>regs.push({d,t:'',g:++g});
  one('M0,0H300V300H0Z');
  for(const[cx,cy]of[[0,0],[300,0],[300,300],[0,300]]){const q=g+1;[44,30,16].forEach(rr=>regs.push({d:SC(cx,cy,rr),t:'',g:q+[44,30,16].indexOf(rr)}));}g+=3;
  let R0=146;const styles=['petal','arch','diamond','dots','petal2','spike','leaf'];
  while(R0>26){const th=14+r()*(R0>90?26:16),R1=Math.max(16,R0-th),mid=(R0+R1)/2,st=styles[Math.floor(r()*styles.length)],w=s*(.55+r()*.4);
    one(SC(150,150,R0));
    if(st=='petal'||st=='petal2'){const p=`M${P2(0,R1)}C${P2(-w,R1+(R0-R1)*.35)} ${P2(-w*.9,R0-(R0-R1)*.05)} ${P2(0,R0)}C${P2(w*.9,R0-(R0-R1)*.05)} ${P2(w,R1+(R0-R1)*.35)} ${P2(0,R1)}Z`;add(p);
      if(st=='petal2'){const a=R1+(R0-R1)*.22,b=R0-(R0-R1)*.2,w2=w*.5;add(`M${P2(0,a)}C${P2(-w2,a+(b-a)*.35)} ${P2(-w2,b)} ${P2(0,b)}C${P2(w2,b)} ${P2(w2,a+(b-a)*.35)} ${P2(0,a)}Z`)}
      if(r()<.6)add(p,180/N)}
    else if(st=='arch'){const h=(R0-R1)*.45;add(`M${P2(-s,R1)}L${P2(-s,R1+h)}Q${P2(-s*.5,R0*1.02)} ${P2(0,R0)}Q${P2(s*.5,R0*1.02)} ${P2(s,R1+h)}L${P2(s,R1)}Z`);add(SC(...P2(0,R1+(R0-R1)*.42).split(',').map(Number),(R0-R1)*.18))}
    else if(st=='diamond'){add(`M${P2(0,R0)}L${P2(-w,mid)}L${P2(0,R1)}L${P2(w,mid)}Z`);add(`M${P2(0,R0-(R0-R1)*.25)}L${P2(-w*.45,mid)}L${P2(0,R1+(R0-R1)*.25)}L${P2(w*.45,mid)}Z`);add(SC(...P2(s,mid).split(',').map(Number),Math.min((R0-R1)*.2,mid*s*.35)))}
    else if(st=='dots'){const rr=Math.min((R0-R1)*.42,mid*Math.sin(s)*.85);add(SC(...P2(0,mid).split(',').map(Number),rr));add(SC(...P2(0,mid).split(',').map(Number),rr*.5));if(rr>5)add(SC(...P2(s,mid).split(',').map(Number),rr*.4))}
    else if(st=='spike'){add(`M${P2(-s,R1)}L${P2(0,R0)}L${P2(s,R1)}Z`);add(`M${P2(-s*.5,R1)}L${P2(0,R1+(R0-R1)*.6)}L${P2(s*.5,R1)}Z`)}
    else{add(`M${P2(0,R1)}Q${P2(-w*1.2,mid)} ${P2(0,R0)}Q${P2(w*.2,mid)} ${P2(0,R1)}Z`);add(`M${P2(0,R1)}Q${P2(w*1.2,mid)} ${P2(0,R0)}Q${P2(-w*.2,mid)} ${P2(0,R1)}Z`)}
    R0=R1}
  one(SC(150,150,R0));add(`M150,150C${P2(-s*1.2,R0*.6)} ${P2(-s*.6,R0)} ${P2(0,R0*.98)}C${P2(s*.6,R0)} ${P2(s*1.2,R0*.6)} 150,150Z`);one(SC(150,150,R0*.32));
  return regs}
function glassArt(seed){const r=rng(seed*104729+7),pts=[],N=[6,8,10,12][Math.floor(r()*4)];
  const grp=[0];pts.push([150,150]);const rings=[16,33,52,73,96,120,146,174,205];rings.forEach((rad,ri)=>{const m=[1,1,2,2,3,3,4,4,5][ri],n=N*m,off=ri%2?Math.PI/n:0,tw=(r()-.5)*.25/m;for(let k=0;k<n;k++){const a=off+k*2*Math.PI/n+(k%m?tw:0);pts.push([150+Math.cos(a)*rad,150+Math.sin(a)*rad]);grp.push(ri*100+1+(k%m))}});
  const clip=(poly,px,py,nx,ny)=>{const out=[],inS=p=>(p[0]-px)*nx+(p[1]-py)*ny<=0;for(let i=0;i<poly.length;i++){const A=poly[i],B=poly[(i+1)%poly.length],ia=inS(A),ib=inS(B);if(ia)out.push(A);if(ia!=ib){const da=(A[0]-px)*nx+(A[1]-py)*ny,db=(B[0]-px)*nx+(B[1]-py)*ny,t=da/(da-db);out.push([A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t])}}return out};
  const regs=[];pts.forEach((p,i)=>{let poly=[[0,0],[300,0],[300,300],[0,300]];for(let j=0;j<pts.length&&poly.length;j++){if(j==i)continue;const q=pts[j];poly=clip(poly,(p[0]+q[0])/2,(p[1]+q[1])/2,q[0]-p[0],q[1]-p[1])}
    if(poly.length>2)regs.push({d:'M'+poly.map(v=>v[0].toFixed(1)+','+v[1].toFixed(1)).join('L')+'Z',t:'',g:grp[i]+1})});
  return regs}
function animalArt(id){const d=shData(id);return d.R.map(r=>({d:r.d,t:'',g:r.i+1,fix:r.o.fix?CB_COL[r.c][0]:null}))}
function artRegs(key){const[k,v]=key.split(':');return k=='m'?mandala(+v):k=='g'?glassArt(+v):k=='p'?polyArt(v):animalArt(v)}
function stS(){return S.studio=Object.assign({items:{},order:[]},S.studio||{})}
function fillVal(v,defs){if(!v)return'#fff';const t=v[0],c=v.slice(2);if(t=='c')return c;const id=(t=='g'?'gr':'gl')+c.slice(1);
  if(!defs.has(id)){defs.add(id);defs.out.push(t=='g'?`<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${shade(c,.5)}"/><stop offset=".55" stop-color="${c}"/><stop offset="1" stop-color="${shade(c,-.35)}"/></linearGradient>`
    :`<pattern id="${id}" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="${c}"/><circle cx="3" cy="4" r="1.3" fill="#fff" opacity=".9"/><circle cx="10" cy="9" r=".9" fill="#fff" opacity=".7"/><circle cx="6" cy="12" r=".7" fill="${shade(c,.6)}"/><circle cx="12" cy="2" r=".8" fill="${shade(c,.6)}"/></pattern>`)}return`url(#${id})`}
function artSVG(regs,fills,o={}){const defs=new Set();defs.out=[];const body=regs.map((r,i)=>r.ov?`<path d="${r.d}" fill="none" stroke="#1c1917" stroke-width="2.2" stroke-linejoin="round" pointer-events="none"/>`:`<path d="${r.d}" ${r.t?`transform="${r.t}"`:''} data-i="${i}" ${r.fix?'pointer-events="none"':''} fill="${r.fix&&!fills[i]?r.fix:fillVal(fills[i],defs)}" stroke="${o.glass?'#1c1917':'#27272a'}" stroke-width="${o.sw||(o.glass?2.6:1.1)}" stroke-linejoin="round"/>`).join('');
  return`<svg viewBox="${o.vb||'0 0 300 300'}" ${o.id?`id="${o.id}"`:''} class="${o.cls||''}"><defs>${defs.out.join('')}${o.glass?'<radialGradient id="glow" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>':''}</defs>${body}${o.glass?'<rect width="300" height="300" fill="url(#glow)" pointer-events="none"/>':''}</svg>`}
const artName=k=>{const[t,v]=k.split(':');return t=='m'?'Mandala':t=='g'?'Rose Window':t=='p'?POLYART[v].n:(SHAPES.find(x=>x[0]==v)||[0,'Picture'])[1]};
function artPage(key){const regs=artRegs(key),st=stS(),it=st.items[key]||{f:{}},fills=Object.assign({},it.f),glass=key[0]=='g';
  let col=PALS['🌅 Sunset'][2],pal=st.pal||'🌅 Sunset',mode='c',mirror=key[0]=='m'||key[0]=='g',undo=[],vb=[0,0,300,300];
  view(`${GH.top('art',{play:true,sub:artName(key),tools:GH.tool('undo','Undo','aundo')+(key[0]=='m'||key[0]=='g'?GH.tool('flip','Mirror fill','amir',true):'')+GH.tool('eye','Zoom','azr')})}
   <div class="stwrap"><div class="stcv" id="stw"></div><div class="stbar">
    <div class="stmodes"><button class="btn sm on" data-md="c">🎨 Paint</button><button class="btn sm" data-md="g">🌅 Shiny</button><button class="btn sm" data-md="s">✨ Glitter</button><button class="btn sm" data-md="e">🧽 Erase</button></div>
    <div class="stpals">${Object.keys(PALS).map(p=>`<button class="btn sm stp ${p==pal?'on':''}" data-p="${p}" aria-label="${esc(p.split(' ').slice(1).join(' '))} colours">${p.split(' ')[0]}</button>`).join('')}</div>
    <div class="stcols" id="stcols"></div></div></div>`);
  const w=$('#stw');w.innerHTML=artSVG(regs,fills,{id:'stsvg',glass,sw:key[0]=='p'?.7:undefined});const svg=$('#stsvg');svg.setAttribute('role','img');svg.setAttribute('aria-label','Your picture: tap a shape to colour it');
  const setVB=()=>svg.setAttribute('viewBox',vb.map(v=>v.toFixed(1)).join(' '));
  const cols=()=>{$('#stcols').innerHTML=PALS[pal].map((c,i)=>`<button class="btn stc ${c==col?'on':''}" data-c="${c}" style="--cc:${c}" aria-label="Colour ${i+1}"></button>`).join('');$$('.stc').forEach(b=>b.onclick=()=>{col=b.dataset.c;if(mode=='e')setMode('c');$$('.stc').forEach(q=>q.classList.toggle('on',q==b));SFX.pop(1)})};cols();
  const setMode=m=>{mode=m;$$('[data-md]').forEach(b=>b.classList.toggle('on',b.dataset.md==m))};
  $$('[data-md]').forEach(b=>b.onclick=()=>{setMode(b.dataset.md);SFX.pop(2)});
  $$('[data-p]').forEach(b=>b.onclick=()=>{pal=b.dataset.p;st.pal=pal;col=PALS[pal][2];$$('[data-p]').forEach(q=>q.classList.toggle('on',q==b));cols();SFX.pop(3)});
  const persist=()=>{st.items[key]={f:fills,t:Date.now()};st.order=[key,...st.order.filter(k=>k!=key)].slice(0,24);for(const k in st.items)if(!st.order.includes(k))delete st.items[k];save()};
  const paintOne=(i,v)=>{const p=svg.querySelector(`path[data-i="${i}"]`);if(!p)return;if(v)fills[i]=v;else delete fills[i];
    const defs=new Set([...svg.querySelectorAll('defs > *')].map(e=>e.id));defs.out=[];p.setAttribute('fill',regs[i].fix&&!v?regs[i].fix:fillVal(v,defs));if(defs.out.length)svg.querySelector('defs').insertAdjacentHTML('beforeend',defs.out.join(''));
    p.classList.remove('popfill');void p.getBBox();p.classList.add('popfill')};
  const tap=(t,sw)=>{const i=+t.dataset.i,v=mode=='e'?null:mode+':'+col,grp=mirror?regs.map((r,j)=>r.g==regs[i].g?j:-1).filter(j=>j>=0):[i];
    undo.push(grp.map(j=>[j,fills[j]||null]));if(undo.length>60)undo.shift();grp.forEach(j=>paintOne(j,v));
    if(sw){if(!tap.lt||performance.now()-tap.lt>60){tap.lt=performance.now();tone(500+((i*37)%9)*60,.05,0,'sine',.07)}}else if(mode=='s'){SFX.magic()}else tone(380+((i*37)%9)*70,.09,0,'sine',.12);clearTimeout(tap.pt);tap.pt=setTimeout(persist,250)};
  // pointer: tap = fill, drag = pan (when zoomed), pinch = zoom
  const ptrs=new Map();let start=null,pinch=null;
  const toSvg=(cx,cy)=>{const b=svg.getBoundingClientRect();return[vb[0]+(cx-b.left)/b.width*vb[2],vb[1]+(cy-b.top)/b.height*vb[3]]};
  w.addEventListener('pointerdown',e=>{e.preventDefault();w.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,[e.clientX,e.clientY]);
    if(ptrs.size==1)start={x:e.clientX,y:e.clientY,vb:vb.slice(),mv:0,t:e.target};else if(ptrs.size==2){const[a,b]=[...ptrs.values()];pinch={d:Math.hypot(a[0]-b[0],a[1]-b[1]),vb:vb.slice(),c:toSvg((a[0]+b[0])/2,(a[1]+b[1])/2)};start=null}});
  w.addEventListener('pointermove',e=>{if(!ptrs.has(e.pointerId))return;ptrs.set(e.pointerId,[e.clientX,e.clientY]);
    if(pinch&&ptrs.size==2){const[a,b]=[...ptrs.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]),k=Math.max(.12,Math.min(1,pinch.vb[2]*pinch.d/d/300)),sz=300*k,bb=svg.getBoundingClientRect(),mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;vb=[pinch.c[0]-(mx-bb.left)/bb.width*sz,pinch.c[1]-(my-bb.top)/bb.height*sz,sz,sz];clampVB();setVB();return}
    if(start&&ptrs.size==1){const dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.hypot(dx,dy)>8&&!start.mv){start.mv=1;start.done=new Set();const t0=start.t.closest&&start.t.closest('path[data-i]');if(t0){start.done.add(t0.dataset.i);tap(t0,1)}}
      if(start.mv){const el=document.elementFromPoint(e.clientX,e.clientY),t=el&&el.closest&&el.closest('#stsvg path[data-i]');if(t&&!start.done.has(t.dataset.i)){start.done.add(t.dataset.i);tap(t,1)}}}});
  const up=e=>{ptrs.delete(e.pointerId);if(ptrs.size<2)pinch=null;if(start&&!start.mv&&ptrs.size==0){const t=start.t.closest&&start.t.closest('path');if(t)tap(t)}if(ptrs.size==0)start=null};
  w.addEventListener('pointerup',up);w.addEventListener('pointercancel',e=>{ptrs.delete(e.pointerId);start=null;pinch=null});
  w.addEventListener('wheel',e=>{e.preventDefault();const c=toSvg(e.clientX,e.clientY),k=Math.max(.12,Math.min(1,vb[2]*(e.deltaY>0?1.15:.87)/300)),sz=300*k;vb=[c[0]-(c[0]-vb[0])*sz/vb[2],c[1]-(c[1]-vb[1])*sz/vb[3],sz,sz];clampVB();setVB()},{passive:false});
  function clampVB(){vb[0]=Math.max(0,Math.min(300-vb[2],vb[0]));vb[1]=Math.max(0,Math.min(300-vb[3],vb[1]))}
  $('#azr').onclick=()=>{if(vb[2]<299)vb=[0,0,300,300];else vb=[75,75,150,150];setVB();SFX.whoosh()};
  $('#aundo').onclick=()=>{const u=undo.pop();if(!u)return;u.forEach(([j,v])=>paintOne(j,v));persist();SFX.del()};
  if($('#amir'))$('#amir').onclick=e=>{mirror=!mirror;e.currentTarget.classList.toggle('on',mirror);e.currentTarget.setAttribute('aria-pressed',String(mirror));fb(mirror?'Mirror ON: one tap colors every matching piece':'Mirror OFF: color one piece at a time','ok',1800)};
  const size=()=>{const r=w.parentNode.getBoundingClientRect(),land=innerWidth>innerHeight,s=Math.min(land?r.width-250:r.width-12,r.height-(land?12:150));w.style.width=w.style.height=Math.max(200,s)+'px'};size();
  let rs;addEventListener('resize',()=>{clearTimeout(rs);rs=setTimeout(()=>{if($('#stw'))size()},120)});
  GH.wire({quit:()=>{gtStop();colorMenu(key[0]=='m'?'mandala':key[0]=='g'?'glass':'animal')}});
  gtStart('#gtm',()=>timeUpOverlay());if(S.voice&&!it.t)setTimeout(()=>say(key[0]=='m'?'Pick colors and make it beautiful!':'Tap to color!'),300)}

/* neon kaleidoscope */
function neonDraw(){let sym=8,brush='neon',hue=Math.random()*360,size=6,mirror=true,strokes=0;
  view(`${GH.top('art',{play:true,sub:'Neon Draw',tools:GH.tool('trash','Clear','nclr')+GH.tool('download','Save to my gallery','nsave')})}
   <div class="stwrap"><div class="stcv neon" id="nw"><canvas id="ncv" role="img" aria-label="Your drawing"></canvas></div><div class="stbar">
    <div class="stmodes">${[[1,'✏️ Off'],[4,'✳️ 4'],[6,'❄️ 6'],[8,'✴️ 8'],[12,'🌸 12']].map(([n,l])=>`<button class="btn sm ${n==sym?'on':''}" data-sy="${n}">${l}</button>`).join('')}<button class="btn sm on" id="nmir">🪞</button></div>
    <div class="stmodes">${[['neon','💡 Neon'],['rainbow','🌈 Rainbow'],['spark','✨ Sparkle'],['ribbon','🎀 Ribbon']].map(([k,l])=>`<button class="btn sm ${k==brush?'on':''}" data-br="${k}">${l}</button>`).join('')}</div>
    <div class="stmodes">${[3,6,11,18].map(z=>`<button class="btn sm ${z==size?'on':''}" data-sz="${z}" aria-label="Brush size ${[3,6,11,18].indexOf(z)+1}"><span class="dot" style="width:${z+4}px;height:${z+4}px"></span></button>`).join('')}${[0,50,120,190,280,320].map((h,i)=>`<button class="btn stc" data-h="${h}" style="--cc:hsl(${h},100%,55%)" aria-label="Colour ${i+1}"></button>`).join('')}</div></div></div>`);
  const w=$('#nw'),cv=$('#ncv'),x=cv.getContext('2d'),dpr=Math.min(2,devicePixelRatio||1);let S0=0;
  const size_=()=>{const r=w.parentNode.getBoundingClientRect(),land=innerWidth>innerHeight,s=Math.max(200,Math.min(land?r.width-250:r.width-12,r.height-(land?12:170)));const old=S0?cv.toDataURL():null;w.style.width=w.style.height=s+'px';cv.width=cv.height=s*dpr;S0=s*dpr;x.fillStyle='#05010f';x.fillRect(0,0,S0,S0);if(old){const im=new Image();im.onload=()=>x.drawImage(im,0,0,S0,S0);im.src=old}};size_();
  const seg=(a,b,hh)=>{const c=S0/2;x.lineCap='round';x.lineJoin='round';
    for(let k=0;k<sym;k++){for(const m of(mirror&&sym>1?[1,-1]:[1])){x.save();x.translate(c,c);x.rotate(k*2*Math.PI/sym);x.scale(m,1);
      const col=`hsl(${hh},100%,60%)`;
      if(brush=='spark'){x.fillStyle=`hsl(${hh},100%,${70+Math.random()*25}%)`;x.shadowColor=col;x.shadowBlur=12*dpr;for(let i=0;i<3;i++){const rr=Math.random()*size*dpr*1.4;x.beginPath();x.arc(b[0]-c+(Math.random()-.5)*size*3*dpr,b[1]-c+(Math.random()-.5)*size*3*dpr,rr*.4+1,0,7);x.fill()}}
      else{x.strokeStyle=col;x.shadowColor=col;x.shadowBlur=(brush=='ribbon'?4:16)*dpr;x.lineWidth=size*dpr*(brush=='ribbon'?1.8:1);x.beginPath();x.moveTo(a[0]-c,a[1]-c);x.lineTo(b[0]-c,b[1]-c);x.stroke();
        x.shadowBlur=0;x.strokeStyle='#ffffffcc';x.lineWidth=Math.max(1,size*dpr*.3);x.stroke()}
      x.restore()}}};
  let last=null;const pos=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*dpr,(e.clientY-r.top)*dpr]};
  cv.addEventListener('pointerdown',e=>{e.preventDefault();cv.setPointerCapture(e.pointerId);last=pos(e);seg(last,[last[0]+.1,last[1]],hue);strokes++});
  cv.addEventListener('pointermove',e=>{if(!last)return;const p=pos(e);if(brush=='rainbow')hue=(hue+3)%360;else if(brush=='ribbon')hue=(hue+1)%360;seg(last,p,hue);last=p});
  const end=()=>{last=null};cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);
  $$('[data-sy]').forEach(b=>b.onclick=()=>{sym=+b.dataset.sy;$$('[data-sy]').forEach(q=>q.classList.toggle('on',q==b));SFX.pop(2)});
  $('#nmir').onclick=e=>{mirror=!mirror;e.currentTarget.classList.toggle('on',mirror);SFX.pop(1)};
  $$('[data-br]').forEach(b=>b.onclick=()=>{brush=b.dataset.br;$$('[data-br]').forEach(q=>q.classList.toggle('on',q==b));SFX.pop(3)});
  $$('[data-sz]').forEach(b=>b.onclick=()=>{size=+b.dataset.sz;$$('[data-sz]').forEach(q=>q.classList.toggle('on',q==b));SFX.pop(1)});
  $$('[data-h]').forEach(b=>b.onclick=()=>{hue=+b.dataset.h;if(brush=='rainbow')brush='neon',$$('[data-br]').forEach(q=>q.classList.toggle('on',q.dataset.br=='neon'));SFX.pop(2)});
  $('#nclr').onclick=()=>{x.fillStyle='#05010f';x.fillRect(0,0,S0,S0);SFX.whoosh();strokes=0};
  const doSave=()=>{try{const c2=document.createElement('canvas');c2.width=c2.height=360;c2.getContext('2d').drawImage(cv,0,0,360,360);const g=JSON.parse(localStorage.getItem(PRF.k('starschool-neon'))||'[]');g.unshift(c2.toDataURL('image/jpeg',.8));localStorage.setItem(PRF.k('starschool-neon'),JSON.stringify(g.slice(0,8)));return true}catch(e){return false}};
  $('#nsave').onclick=()=>{if(doSave()){SFX.fanfare();confetti(20);fb('Saved to your gallery!')}else fb('Gallery is full','warn')};
  let rs;addEventListener('resize',()=>{clearTimeout(rs);rs=setTimeout(()=>{if($('#ncv'))size_()},150)});
  GH.wire({quit:()=>{if(strokes>2)doSave();gtStop();colorMenu('neon')}});
  gtStart('#gtm',()=>{if(strokes>2)doSave();timeUpOverlay()})}

let STTAB='mandala';
function colorMenu(tab){if(tab&&['shape','pixel','paint'].includes(tab))return classicColor(tab);if(tab)STTAB=tab;const st=stS();
  const tabs=[['mandala','✨ Mandalas'],['glass','💎 Glass'],['animal','🦁 Animals'],['neon','🌈 Neon'],['classic','🔢 Classic']];
  const thumb=k=>{const it=st.items[k];return`<button class="btn sttile" data-k="${k}" aria-label="${esc(artName(k))}">${artSVG(artRegs(k),it?it.f:{},{glass:k[0]=='g',sw:k[0]=='g'?2:k[0]=='p'?.5:.8}).replace('<svg','<svg aria-hidden="true"')}</button>`}; // P6-01: named, the drawing hidden
  let body='';const mine=t=>st.order.filter(k=>k[0]==t);
  if(STTAB=='mandala'){const seeds=[3,17,42,77,123,256,512,999];body=`<button class="btn game" id="newm" style="background:linear-gradient(135deg,#f0abfc,#93c5fd)"><span class="ge">🎲</span><span class="gi"><span class="gt">New Mandala</span><span class="small">A brand-new design every time</span></span><span class="go">▶</span></button>
    ${mine('m').length?`<h2 class="cbdh">My Art</h2><div class="stgrid">${mine('m').map(thumb).join('')}</div>`:''}<h2 class="cbdh">Designs</h2><div class="stgrid">${seeds.filter(s=>!st.items['m:'+s]).map(s=>thumb('m:'+s)).join('')}</div>`}
  else if(STTAB=='glass'){const seeds=[5,21,64,88,130,301];body=`<button class="btn game" id="newg" style="background:linear-gradient(135deg,#fde68a,#a5f3fc)"><span class="ge">🎲</span><span class="gi"><span class="gt">New Rose Window</span><span class="small">Stained glass with hundreds of pieces</span></span><span class="go">▶</span></button>
    ${mine('g').length?`<h2 class="cbdh">My Art</h2><div class="stgrid">${mine('g').map(thumb).join('')}</div>`:''}<h2 class="cbdh">Windows</h2><div class="stgrid">${seeds.filter(s=>!st.items['g:'+s]).map(s=>thumb('g:'+s)).join('')}</div>`}
  else if(STTAB=='animal')body=`<div class="tipcard">Geometric animals made of hundreds of facets. <b>Swipe</b> to paint lots of pieces at once. Use light and dark shades for a 3D look. Pinch with two fingers to zoom.</div><div class="stgrid">${Object.keys(POLYART).map(id=>thumb('p:'+id)).join('')}</div>`;
  else if(STTAB=='neon'){let g=[];try{g=JSON.parse(localStorage.getItem(PRF.k('starschool-neon'))||'[]')}catch(e){}
    body=`<button class="btn game" id="newn" style="background:linear-gradient(135deg,#312e81,#be185d);color:#fff"><span class="ge">🌈</span><span class="gi"><span class="gt">Neon Kaleidoscope</span><span class="small" style="color:#fbcfe8">Glowing mirror drawing</span></span><span class="go">▶</span></button>${g.length?`<h2 class="cbdh">My Neon Art</h2><div class="stgrid">${g.map(s=>`<div class="sttile"><img src="${s}" alt="Your neon drawing"></div>`).join('')}</div>`:''}`}
  else body=`<div class="tipcard">The original pictures, pixel art and color-by-number.</div><div class="games"><button class="btn game" data-c="shape" style="background:#fce7f3"><span class="ge">🦁</span><span class="gi"><span class="gt">Number Pictures</span></span></button><button class="btn game" data-c="pixel" style="background:#dbeafe"><span class="ge">🟦</span><span class="gi"><span class="gt">Pixel Art</span></span></button><button class="btn game" data-c="paint" style="background:#dcfce7"><span class="ge">🖌️</span><span class="gi"><span class="gt">Block Paint</span></span></button></div>`;
  view(`${GH.top('art')}
   <div class="tabs sttabs">${tabs.map(([k,l])=>`<button class="btn sm tab ${k==STTAB?'on':''}" data-t="${k}">${l}</button>`).join('')}</div><div class="scroll">${body}</div>`);
  $('#back').onclick=gameRoom;$$('.tab').forEach(b=>b.onclick=()=>{SFX.pop(2);colorMenu(b.dataset.t)});
  const chk=()=>{if(ptLeft()<=0){SFX.wrong();fb(ptWhyNot(),'warn long',3000);return false}return true};
  $$('[data-k]').forEach(b=>b.onclick=()=>{if(chk()){SFX.whoosh();artPage(b.dataset.k)}});
  $$('[data-c]').forEach(b=>b.onclick=()=>classicColor(b.dataset.c));
  if($('#newm'))$('#newm').onclick=()=>{if(chk()){SFX.magic();artPage('m:'+R(1000,99999))}};
  if($('#newg'))$('#newg').onclick=()=>{if(chk()){SFX.magic();artPage('g:'+R(1000,99999))}};
  if($('#newn'))$('#newn').onclick=()=>{if(chk()){SFX.whoosh();neonDraw()}}}

function classicColor(tab){if(tab)CBTAB=tab;const cs=cbS(),ss=shS();
  const tabs=`<div class="tabs">${[['shape','🦁 Pictures'],['pixel','🟦 Pixel Art'],['paint','🖌️ Free Paint']].map(([k,l])=>`<button class="btn sm tab ${k==CBTAB?'on':''}" data-t="${k}">${l}</button>`).join('')}</div>`;
  let body='';
  if(CBTAB=='shape')body=`<div class="tipcard">Tap a picture. Color it <b>your way</b>, or <b>by number</b>, with <b>math facts</b>, or with <b>Spanish</b> colors!</div><h2>Pictures (${Object.keys(ss.done).length}/${SHAPES.length} done)</h2>${[[1,'⭐ Easy','Big shapes'],[2,'⭐⭐ Medium','More parts'],[3,'⭐⭐⭐ Hard','Lots of tiny details']].map(([lv,t,s])=>`<h3 class="cbdh">${t} <span class="small">${s}</span></h3><div class="cbgrid">${shMenuItems(lv)}</div>`).join('')}`;
  else if(CBTAB=='pixel')body=`<div class="tipcard">Block pictures: match the numbers to the colors. Drag your finger to color fast!</div><h2>Pixel Art (${Object.keys(cs.done).length}/${CB_PICS.length} done)</h2><div class="cbgrid">${CB_PICS.map(([id,n])=>{const d=cbData(id),done=cs.done[id],pr=cs.prog[id],pc=pr?Math.round(pr.split('').filter(c=>c=='1').length/pr.length*100):0;
    return`<button class="btn cbitem" data-id="${id}"><img src="${cbThumb(d.G,done?true:pr)}"><b>${n}</b><span class="small">${done?'✅ Done':pc?pc+'%':'New'}</span></button>`}).join('')}</div>`;
  else body=`<button class="btn game" id="free" style="background:linear-gradient(135deg,#fbcfe8,#c7d2fe);width:100%"><span class="ge">🖌️</span><span class="gi"><span class="gt">New Drawing</span><span class="small">Paint anything you want, block by block</span></span><span class="go">▶</span></button>
    ${cs.art.length?`<h2>My Drawings</h2><div class="cbgrid">${cs.art.map((a,i)=>`<button class="btn cbitem" data-art="${i}"><img src="${cbThumb(a.split(',').map(k=>k||'blanco'),true)}"><b>Drawing ${i+1}</b></button>`).join('')}</div>`:'<p class="small" style="text-align:center">Your saved drawings show up here.</p>'}`;
  view(`${GH.top('art',{sub:'Classic'})}<div class="scroll">${tabs}${body}</div>`);
  $('#back').onclick=()=>colorMenu('classic');$$('.tab').forEach(b=>b.onclick=()=>{SFX.pop(2);classicColor(b.dataset.t)});
  const chk=()=>{if(ptLeft()<=0){SFX.wrong();fb(ptWhyNot(),'warn long',3000);return false}return true};
  if($('#free'))$('#free').onclick=()=>{if(chk())freePaint(-1)};
  $$('[data-art]').forEach(b=>b.onclick=()=>{if(chk())freePaint(+b.dataset.art)});
  $$('[data-id]').forEach(b=>b.onclick=()=>{if(chk())modeChooser(m=>colorPic(b.dataset.id,m),false)});
  $$('[data-sh]').forEach(b=>b.onclick=()=>{if(chk())modeChooser(m=>shapePage(b.dataset.sh,m),true)})}

/* ---------- shape coloring pages (vector) ---------- */
Object.assign(CB_COL,{'gris oscuro':['#71717a','dark gray'],'café oscuro':['#5b3416','dark brown'],'azul oscuro':['#1e3a8a','dark blue'],beige:['#fde9c4','tan'],turquesa:['#14b8a6','teal']});
const SE=(cx,cy,rx,ry)=>`M${cx-rx},${cy}a${rx},${ry} 0 1,0 ${rx*2},0a${rx},${ry} 0 1,0 ${-rx*2},0Z`,SC=(cx,cy,r)=>SE(cx,cy,r,r),SR=(x,y,w,h,r=0)=>r?`M${x+r},${y}h${w-2*r}a${r},${r} 0 0 1 ${r},${r}v${h-2*r}a${r},${r} 0 0 1 ${-r},${r}h${-(w-2*r)}a${r},${r} 0 0 1 ${-r},${-r}v${-(h-2*r)}a${r},${r} 0 0 1 ${r},${-r}Z`:`M${x},${y}h${w}v${h}h${-w}Z`,
  SP=pts=>'M'+pts.map(p=>p.join(',')).join('L')+'Z',
  MIR=d=>d.replace(/([MLCQ])([^MLCQZ]*)/g,(m,c,a)=>c+a.trim().split(/[\s,]+/).map((v,i)=>i%2?v:(300-+v).toFixed(1)).join(',')),
  WAVY=(cx,cy,r,amp,n,pts=96)=>SP(Array.from({length:pts},(_,i)=>{const a=i/pts*Math.PI*2,rr=r+amp*Math.sin(a*n);return[(cx+Math.cos(a)*rr).toFixed(1),(cy+Math.sin(a)*rr).toFixed(1)]}));
// region: [path, colorKey, opts]  opts: {fix:true} = pre-colored decoration, {l:[x,y]} label spot
const SHAPES=[
 ['elephant','Elephant',()=>[[SR(0,0,300,300),'celeste'],[SC(250,52,26),'amarillo'],[SR(0,228,300,72),'verde'],
   [SR(140,185,28,58,10),'gris oscuro'],[SR(222,182,28,60,10),'gris oscuro'],[SE(175,158,85,58),'gris'],[SR(108,188,30,62,11),'gris'],[SR(192,192,30,58,11),'gris'],
   ['M258,150 C275,160 280,175 272,190 C268,196 262,192 265,186 C270,175 266,165 252,158 Z','gris oscuro',{l:[268,178]}],
   [SE(130,118,36,46),'gris oscuro'],[SE(132,120,24,32),'rosa'],[SC(92,122,44),'gris'],
   ['M60,128 C34,166 32,206 52,224 C62,232 80,226 74,213 C60,198 68,178 98,156 Z','gris',{l:[52,196]}],
   ['M84,150 C80,172 70,180 60,178 C72,170 76,160 76,146 Z','blanco',{l:[72,168]}],[SC(84,110,5.5),'negro',{fix:1}],[SC(85.5,108.5,1.8),'blanco',{fix:1}]]],
 ['eagle','Eagle',()=>{const wing='M150,150 C115,108 62,96 14,112 C38,122 30,132 52,138 C32,148 44,156 68,156 C52,168 70,172 94,168 C108,172 128,168 150,172 Z',tip='M14,112 C38,122 30,132 52,138 C32,148 44,156 68,156 C52,168 70,172 94,168 C80,160 60,150 46,128 C36,120 24,114 14,112 Z';
   return[[SR(0,0,300,300),'celeste'],[SE(60,50,34,14),'blanco'],[SE(245,70,30,12),'blanco'],[SP([[0,300],[0,250],[70,190],[140,260],[210,180],[300,250],[300,300]]),'gris'],
   [SP([[70,190],[52,206],[62,203],[70,212],[80,204],[88,206]]),'blanco'],[SP([[210,180],[190,198],[202,196],[212,206],[222,197],[232,200]]),'blanco'],
   [wing,'café oscuro',{l:[110,140]}],[MIR(wing),'café oscuro',{l:[190,140]}],[tip,'café',{l:[56,144]}],[MIR(tip),'café',{l:[244,144]}],
   ['M135,205 L165,205 L174,238 L150,230 L126,238 Z','blanco',{l:[150,220]}],[SE(150,168,24,42),'café'],[SC(150,118,21),'blanco'],
   ['M139,121 L161,121 C160,132 156,140 150,144 C152,136 146,130 139,128 Z','amarillo',{l:[151,129]}],
   ['M138,206 l-4,14 l6,-4 l2,6 l3,-8 Z','amarillo',{l:[138,212]}],['M162,206 l4,14 l-6,-4 l-2,6 l-3,-8 Z','amarillo',{l:[162,212]}],
   [SC(143,113,3.2),'negro',{fix:1}],[SC(157,113,3.2),'negro',{fix:1}]]}],
 ['butterfly','Butterfly',()=>{const up='M150,138 C120,62 44,46 40,100 C38,140 100,152 150,150 Z',lo='M150,152 C112,156 68,174 82,212 C96,238 140,206 150,166 Z';
   return[[SR(0,0,300,300),'celeste'],[SR(0,250,300,50),'verde'],[SC(50,240,12),'rosa'],[SC(50,240,5),'amarillo'],[SC(255,236,12),'rojo'],[SC(255,236,5),'amarillo'],
   [up,'naranja',{l:[70,92]}],[MIR(up),'naranja',{l:[230,92]}],[lo,'morado',{l:[118,170]}],[MIR(lo),'morado',{l:[182,170]}],
   [SC(88,104,15),'amarillo'],[SC(212,104,15),'amarillo'],[SC(110,190,10),'rosa'],[SC(190,190,10),'rosa'],[SC(62,82,8),'blanco'],[SC(238,82,8),'blanco'],
   [SE(150,160,8,46),'negro',{fix:1}],[SC(150,110,10),'negro',{fix:1}]]}],
 ['turtle','Sea Turtle',()=>{const hexes=[[150,150],[118,165],[182,165],[150,182],[124,138],[176,138]];return[[SR(0,0,300,160),'celeste'],[SR(0,140,300,90),'azul'],[SR(0,222,300,78),'amarillo'],[SC(250,45,24),'amarillo'],
   [SE(74,214,24,14),'verde'],[SE(226,214,24,14),'verde'],[SE(258,190,26,18),'verde'],[SE(278,180,10,8),'verde'],
   ['M60,200 C60,120 240,120 240,200 Z','verde oscuro',{l:[150,128]}],
   ...hexes.map(([x,y])=>[SP(Array.from({length:6},(_,i)=>[(x+16*Math.cos(i*Math.PI/3)).toFixed(1),(y+14*Math.sin(i*Math.PI/3)).toFixed(1)])),'verde']),
   [SR(52,196,196,14,7),'café'],[SC(266,184,3.5),'negro',{fix:1}],[SE(60,206,6,4),'verde']]}],
 ['owl','Night Owl',()=>[[SR(0,0,300,300),'azul oscuro'],[SC(240,60,26),'amarillo'],[SC(40,40,3),'blanco',{fix:1}],[SC(90,80,2.5),'blanco',{fix:1}],[SC(200,30,2.5),'blanco',{fix:1}],[SC(270,140,3),'blanco',{fix:1}],
   [SR(20,232,260,18,9),'café oscuro'],[SE(60,224,22,10),'verde'],[SE(240,226,22,10),'verde'],
   [SP([[100,70],[118,108],[90,100]]),'café'],[SP([[200,70],[182,108],[210,100]]),'café'],[SE(150,160,62,78),'café'],[SE(150,180,38,46),'beige'],
   [SE(100,170,18,44),'café oscuro'],[SE(200,170,18,44),'café oscuro'],[SC(124,128,24),'blanco'],[SC(176,128,24),'blanco'],[SC(124,128,13),'naranja'],[SC(176,128,13),'naranja'],
   [SC(124,128,6),'negro',{fix:1}],[SC(176,128,6),'negro',{fix:1}],[SP([[140,150],[160,150],[150,168]]),'amarillo',{l:[150,156]}],
   [SP([[128,234],[134,246],[140,234]]),'amarillo',{l:[134,238]}],[SP([[160,234],[166,246],[172,234]]),'amarillo',{l:[166,238]}]]],
 ['lion','Lion',()=>[[SR(0,0,300,300),'amarillo'],[SR(0,220,300,80),'verde'],[SC(240,48,22),'naranja'],
   [WAVY(150,135,92,10,12),'naranja',{l:[150,52]}],[SC(150,140,64),'beige'],[SC(105,90,16),'beige'],[SC(195,90,16),'beige'],[SC(105,90,8),'rosa'],[SC(195,90,8),'rosa'],
   [SE(150,170,30,22),'blanco'],['M136,150 L164,150 L150,166 Z','café',{l:[150,155]}],[SC(126,128,7),'negro',{fix:1}],[SC(174,128,7),'negro',{fix:1}],
   [SR(118,230,22,40,9),'beige'],[SR(160,230,22,40,9),'beige']]],
 ['whale','Whale',()=>[[SR(0,0,300,300),'celeste'],[SC(52,50,24),'amarillo'],[SR(0,160,300,140),'azul'],
   ['M0,170 Q25,155 50,170 T100,170 T150,170 T200,170 T250,170 T300,170 L300,185 L0,185 Z','turquesa',{l:[150,176]}],
   ['M40,190 C40,120 200,100 240,150 C255,140 270,118 290,120 C278,140 275,160 268,175 C278,185 288,205 284,220 C266,206 250,200 238,196 C210,240 70,250 40,190 Z','azul oscuro',{l:[130,160]}],
   ['M52,200 C80,236 180,236 228,200 C190,214 100,218 52,200 Z','blanco',{l:[140,214]}],
   ['M120,112 C110,80 96,70 86,72 C96,82 104,96 108,112 Z','celeste',{l:[100,90]}],['M132,110 C140,76 156,68 168,70 C156,80 148,94 144,112 Z','celeste',{l:[152,88]}],
   [SC(78,176,6),'blanco',{fix:1}],[SC(79,177,3),'negro',{fix:1}]]],
 ['dino','Dinosaur',()=>[[SR(0,0,300,300),'celeste'],[SP([[180,230],[230,120],[250,120],[300,230]]),'café'],[SP([[230,120],[250,120],[244,104],[236,104]]),'rojo'],[SE(246,86,16,12),'gris'],
   [SR(0,226,300,74),'verde'],
   ['M108,170 C80,170 60,184 20,200 C60,206 90,204 118,196 Z','verde oscuro',{l:[70,192]}],
   ['M150,140 C170,120 182,80 190,48 C196,30 222,30 226,46 C230,58 214,62 204,60 C200,90 196,130 190,170 Z','verde oscuro',{l:[194,110]}],
   [SE(150,175,62,40),'verde oscuro'],[SR(104,190,24,46,10),'verde oscuro'],[SR(168,192,24,44,10),'verde oscuro'],
   [SC(140,160,9),'amarillo'],[SC(165,178,7),'amarillo'],[SC(122,182,6),'amarillo'],[SC(186,160,6),'amarillo'],
   [SC(214,44,3),'negro',{fix:1}],[SE(60,240,18,7),'verde'],[SE(250,246,22,7),'verde']]]];
SHAPES.push(
 ['parrot','Parrot',()=>[[SR(0,0,300,300),'celeste'],[SE(60,50,30,12),'blanco'],[SE(240,40,26,10),'blanco'],
   ['M0,200 C30,180 70,190 80,210 C50,215 20,210 0,200Z','verde'],['M0,300 C20,240 60,220 90,230 C70,250 40,270 0,300Z','verde oscuro',{l:[40,262]}],['M300,300 C280,240 240,225 210,232 C232,252 262,272 300,300Z','verde oscuro',{l:[262,262]}],
   ['M138,210 L118,292 L134,294 L150,214Z','azul',{l:[132,266]}],['M150,214 L146,298 L162,298 L160,214Z','rojo',{l:[154,270]}],['M160,212 L178,292 L192,288 L170,208Z','amarillo',{l:[178,266]}],
   [SR(20,214,260,16,8),'café'],[SE(244,222,8,5),'café oscuro'],
   [SE(150,152,42,62),'rojo'],['M176,124 C212,140 216,190 198,224 C182,208 172,172 172,130Z','verde',{l:[190,160]}],
   ['M190,176 C204,190 206,208 198,224 C188,212 184,198 184,178Z','azul',{l:[194,200]}],['M176,124 C196,134 204,150 202,164 C192,156 182,148 174,140Z','amarillo',{l:[190,145]}],
   [SC(146,92,32),'rojo'],[SE(162,92,13,17),'blanco'],[SC(162,88,6),'amarillo'],[SC(162,88,3),'negro',{fix:1}],
   ['M170,94 C192,94 198,116 188,130 C186,116 178,110 168,108Z','gris',{l:[184,108]}],['M168,108 C178,110 184,118 184,128 C174,126 168,120 166,112Z','gris oscuro',{l:[175,118]}],
   [SE(136,216,9,5),'gris oscuro'],[SE(162,216,9,5),'gris oscuro']]],
 ['fox','Fox',()=>[[SR(0,0,300,300),'celeste'],[SC(250,50,22),'amarillo'],[SR(0,236,300,64),'verde'],
   [SR(30,120,16,120),'café oscuro'],[SC(38,108,34),'naranja'],[SR(262,140,14,100),'café oscuro'],[SC(268,126,28),'rojo'],
   ['M190,204 C240,204 270,162 262,120 C250,150 222,172 186,178Z','naranja',{l:[232,178]}],['M262,120 C272,138 268,156 256,170 C246,160 252,138 262,120Z','blanco',{l:[259,148]}],
   [SE(160,192,50,36),'naranja'],[SR(126,212,16,36,7),'café oscuro'],[SR(178,212,16,36,7),'café oscuro'],[SE(132,194,18,28),'blanco'],
   [SP([[96,124],[100,74],[126,104]]),'naranja',{l:[104,100]}],[SP([[164,124],[160,74],[134,104]]),'naranja',{l:[156,100]}],
   [SP([[102,114],[104,88],[118,104]]),'café oscuro',{fix:1}],[SP([[158,114],[156,88],[142,104]]),'café oscuro',{fix:1}],
   ['M90,130 L130,98 L170,130 C166,160 144,172 130,172 C116,172 94,160 90,130Z','naranja',{l:[130,112]}],
   ['M90,130 C100,150 118,166 130,172 C126,156 120,146 104,140Z','blanco',{l:[106,148]}],['M170,130 C160,150 142,166 130,172 C134,156 140,146 156,140Z','blanco',{l:[154,148]}],
   [SC(130,168,5),'negro',{fix:1}],[SE(114,128,4,6),'negro',{fix:1}],[SE(146,128,4,6),'negro',{fix:1}],
   [SR(60,238,6,12),'blanco'],[SE(63,236,13,7),'rojo'],[SE(222,250,18,6),'verde oscuro'],[SE(90,262,16,5),'verde oscuro']]],
 ['rocket','Rocket',()=>[[SR(0,0,300,300),'azul oscuro'],...[[30,30],[120,20],[280,110],[200,150],[20,150],[100,200],[270,20]].map(([x,y])=>[SC(x,y,2.5),'blanco',{fix:1}]),
   [SC(60,70,30),'morado'],[SE(60,70,30,8),'rosa'],[SC(250,250,52),'gris'],[SC(230,226,9),'gris oscuro'],[SC(266,256,11),'gris oscuro'],[SC(236,274,6),'gris oscuro'],
   [SC(56,236,16),'verde'],[SC(236,64,8),'amarillo'],[SP([[230,58],[184,32],[230,70]]),'celeste',{l:[214,56]}],
   ['M132,200 C130,232 150,264 150,264 C150,264 170,232 168,200Z','naranja',{l:[150,244]}],['M140,200 C140,222 150,244 150,244 C150,244 160,222 160,200Z','amarillo',{l:[150,224]}],['M146,200 C146,210 150,220 150,220 C150,220 154,210 154,200Z','blanco',{fix:1}],
   ['M122,150 L94,198 L124,190Z','rojo',{l:[112,180]}],['M178,150 L206,198 L176,190Z','rojo',{l:[188,180]}],
   ['M150,40 C176,70 182,120 178,190 L122,190 C118,120 124,70 150,40Z','blanco',{l:[150,150]}],['M150,40 C164,56 172,72 175,86 L125,86 C128,72 136,56 150,40Z','rojo',{l:[150,70]}],
   [SR(121,162,58,12),'azul'],[SC(150,120,18),'gris'],[SC(150,120,12),'celeste'],[SR(130,190,40,10),'gris oscuro'],[SR(145,176,10,30),'rojo']]],
 ['clownfish','Coral Reef',()=>[[SR(0,0,300,300),'azul'],[SP([[40,0],[70,0],[110,210],[90,210]]),'celeste'],[SP([[160,0],[185,0],[204,190],[188,190]]),'celeste'],
   ['M0,250 C60,236 120,244 180,240 C230,236 270,244 300,240 L300,300 L0,300Z','beige',{l:[150,276]}],[SE(254,250,44,28),'gris'],[SE(40,258,40,22),'gris oscuro'],
   ['M30,252 L34,200 L22,180 L30,178 L38,196 L44,170 L52,172 L46,204 L58,190 L64,194 L50,222 L48,252Z','rosa',{l:[40,226]}],
   ['M250,226 L246,180 L232,166 L240,160 L252,174 L258,150 L266,152 L262,182 L276,170 L282,176 L266,196 L264,226Z','rojo',{l:[256,200]}],
   ['M100,250 C90,220 112,200 100,170 C96,160 104,150 110,160 C120,190 100,210 112,250Z','verde',{l:[104,224]}],['M200,244 C210,214 188,196 200,166 C204,156 212,160 208,172 C200,198 220,214 212,244Z','verde oscuro',{l:[204,216]}],
   [WAVY(150,262,22,6,9),'morado'],[SP(Array.from({length:10},(_,i)=>{const a=i*Math.PI/5-Math.PI/2,r=i%2?6:15;return[(84+Math.cos(a)*r).toFixed(1),(276+Math.sin(a)*r).toFixed(1)]})),'naranja'],
   ['M206,128 L248,96 C254,116 254,140 248,160Z','naranja',{l:[236,128]}],['M120,98 C134,70 170,68 184,100 C160,94 140,94 120,98Z','amarillo',{l:[152,84]}],['M136,160 C140,182 162,184 170,162Z','amarillo',{l:[154,170]}],
   [SE(150,128,62,36),'naranja'],
   ['M112,100 C118,96 126,95 132,97 C128,120 128,140 132,159 C126,161 118,160 112,156 C116,138 116,118 112,100Z','blanco',{l:[122,128]}],
   ['M152,92 C158,92 166,93 172,95 C168,115 168,145 172,162 C166,164 158,164 152,164 C156,142 156,114 152,92Z','blanco',{l:[162,140]}],
   ['M190,104 C196,106 202,110 206,114 C204,124 204,134 206,142 C202,146 196,150 190,152 C192,138 192,118 190,104Z','blanco',{l:[198,128]}],
   ['M140,132 C150,122 164,126 160,142 C152,144 146,140 140,132Z','amarillo',{l:[151,135]}],[SC(102,120,8),'blanco'],[SC(102,120,4),'negro',{fix:1}],
   [SC(70,92,7),'celeste'],[SC(62,66,5),'celeste'],[SC(78,42,8),'celeste'],[SE(250,60,16,8),'amarillo'],[SP([[264,60],[278,50],[278,70]]),'amarillo',{l:[272,60]}],[SC(244,58,2),'negro',{fix:1}]]],
 ['castle','Castle',()=>[[SR(0,0,300,300),'celeste'],[SC(40,40,20),'amarillo'],[SE(222,40,30,12),'blanco'],[SE(120,56,22,9),'blanco'],
   ['M0,230 C60,200 120,210 150,220 C200,200 250,200 300,220 L300,300 L0,300Z','verde',{l:[40,240]}],[SR(0,264,300,36),'azul'],
   [SR(80,140,140,112),'gris'],...[0,1,2,3,4].map(i=>[SR(84+i*28,126,16,15),'gris']),
   [SR(56,110,40,142),'gris oscuro'],[SR(204,110,40,142),'gris oscuro'],[SR(130,80,40,70),'gris oscuro'],
   [SP([[52,112],[76,58],[100,112]]),'rojo',{l:[76,96]}],[SP([[200,112],[224,58],[248,112]]),'rojo',{l:[224,96]}],[SP([[126,82],[150,28],[174,82]]),'azul oscuro',{l:[150,66]}],
   [SP([[76,58],[76,40],[94,48]]),'amarillo',{l:[81,48]}],[SP([[224,58],[224,40],[242,48]]),'amarillo',{l:[229,48]}],[SP([[150,28],[150,10],[168,18]]),'rosa',{l:[155,18]}],
   [SR(69,140,14,22,7),'amarillo'],[SR(217,140,14,22,7),'amarillo'],[SR(143,100,14,22,7),'amarillo'],[SR(98,166,16,24,8),'amarillo'],[SR(186,166,16,24,8),'amarillo'],
   ['M140,150 L160,150 L160,182 L150,174 L140,182Z','morado',{l:[150,162]}],
   ['M134,252 L134,214 C134,198 166,198 166,214 L166,252Z','café',{l:[150,230]}],[SP([[134,252],[166,252],[178,270],[122,270]]),'café oscuro',{l:[150,261]}],
   [SE(30,242,24,14),'verde oscuro'],[SE(270,244,24,14),'verde oscuro']]],
 ['peacock','Peacock',()=>{const eyes=[200,222,245,270,295,318,340].map(a=>{const r=a*Math.PI/180;return[150+Math.cos(r)*98,232+Math.sin(r)*96]});
   return[[SR(0,0,300,300),'beige'],[SR(0,250,300,50),'verde'],['M18,240 A132,128 0 0 1 282,240 Z','verde oscuro',{l:[150,200]}],
   ...eyes.flatMap(([x,y])=>[[SE(x,y,17,21),'turquesa'],[SE(x,y,10,13),'azul'],[SE(x,y,4.5,6),'azul oscuro']]),
   ['M138,252 C120,222 128,172 146,152 C150,132 146,114 150,102 C160,96 168,104 162,118 C158,142 178,192 166,252Z','azul',{l:[150,200]}],
   [SE(160,204,12,30),'café'],[SC(157,100,12),'azul'],[SP([[167,97],[182,101],[167,106]]),'amarillo',{l:[171,101]}],[SC(159,97,4),'blanco'],[SC(160,97,2),'negro',{fix:1}],
   [SC(148,78,4),'turquesa'],[SC(156,75,4),'turquesa'],[SC(164,78,4),'turquesa'],[SR(141,250,6,18),'gris'],[SR(156,250,6,18),'gris'],[SE(60,276,20,7),'verde oscuro'],[SE(240,278,20,7),'verde oscuro']]}]);

const shDiff=id=>{const n=shData(id).R.filter(r=>!r.o.fix).length;return n<=19?1:n<=24?2:3};
function shData(id){const s=SHAPES.find(x=>x[0]==id),R=s[2]().map(([d,c,o],i)=>({d,c,o:o||{},i}));const keys=[];R.forEach(r=>{if(!r.o.fix&&!keys.includes(r.c))keys.push(r.c)});R.forEach(r=>r.n=r.o.fix?0:keys.indexOf(r.c)+1);return{id,name:s[1],R,keys}}
function shS(){return S.cbs=Object.assign({done:{},prog:{},free:{}},S.cbs||{})}
const SHN='<defs><radialGradient id="shn" cx=".34" cy=".28" r=".85"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset=".38" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".32"/></radialGradient></defs>';
function shSVG(d,fills,opts={}){const lit=r=>{const f=fills[r.i];return r.o.fix||(f&&f!='#fef9c3'&&f!='#fecaca')};
  return`<svg viewBox="0 0 300 300" class="${opts.cls||''}" ${opts.id?`id="${opts.id}"`:''}>${SHN}${d.R.map(r=>`<path d="${r.d}" data-i="${r.i}" fill="${r.o.fix?CB_COL[r.c][0]:fills[r.i]||(opts.faded?shade(CB_COL[r.c][0],.72):'#fff')}" stroke="#27272a" stroke-width="${opts.thin?1.6:2.4}" stroke-linejoin="round"/>${lit(r)&&r.i>0?`<path d="${r.d}" fill="url(#shn)" pointer-events="none"/>`:''}`).join('')}${opts.labels||''}</svg>`}
function shMenuItems(lv){const cs=shS();return SHAPES.filter(([id])=>!lv||shDiff(id)==lv).map(([id,n])=>{const d=shData(id),done=cs.done[id],pr=cs.prog[id]||[],fl={};
  if(done)d.R.forEach(r=>fl[r.i]=CB_COL[r.c][0]);else pr.forEach(i=>fl[i]=CB_COL[d.R[i].c][0]);const free=cs.free[id];
  const tot=d.R.filter(r=>!r.o.fix).length;return`<button class="btn cbitem" data-sh="${id}">${shSVG(d,free&&!done&&!pr.length?free:fl,{thin:1,faded:!done&&!pr.length&&!free,cls:'shthumb'})}<b>${n}</b><span class="small">${done?'✅ Done':pr.length?Math.round(pr.length/tot*100)+'%':free?'🖌️ Colored':'New'}</span></button>`}).join('')}

function shapePage(id,mode){const d=shData(id),cs=shS(),free=mode=='free',fills={};let sel=free?'rojo':1;
  const filled=new Set(free?[]:(cs.prog[id]||[]));if(free){Object.assign(fills,cs.free[id]||{})}else filled.forEach(i=>fills[i]=CB_COL[d.R[i].c][0]);
  const regs=d.R.filter(r=>!r.o.fix);
  const ml=mode=='math3'?3:mode=='math2'?2:1,esHard=mode=='es2';if(mode.startsWith('math'))mode='math';if(esHard)mode='es';const facts=d.keys.map((k,i)=>mode=='math'?cbFact(i+1,ml):null);
  const pal=free?FP_COLS.concat(['gris oscuro','café oscuro','azul oscuro','beige','turquesa']).map(k=>`<button class="btn chip" data-k="${k}" style="--cc:${CB_COL[k][0]}"><span class="sw"></span></button>`).join('')
    :d.keys.map((k,i)=>`<button class="btn chip ${esHard?'eshard':''} ${mode=='math'&&ml>1?'wide':''}" data-n="${i+1}" style="--cc:${CB_COL[k][0]}"><span class="sw"></span><b>${mode=='math'?facts[i]:esHard?'':i+1}</b>${mode=='es'?`<small>${k}</small>`:''}</button>`).join('');
  view(`${GH.top('art',{play:true,sub:d.name,tools:free?GH.tool('trash','Clear','shclr'):'',chips:free?'':'<span class="stat gh-st" aria-label="Colored"><b id="cbp">0%</b></span>'})}
   <div class="cbwrap"><div class="cbcv shwrap" id="shw"></div><div class="cbpal ${free?'fp':''}">${pal}</div></div>`);
  const w=$('#shw');
  function render(){const sz=cbLayout(free?18:d.keys.length)*CBN;w.style.width=w.style.height=sz+'px';
    const labels=free?'':regs.filter(r=>!filled.has(r.i)).map(r=>`<text data-l="${r.i}" class="shl ${r.n==sel?'on':''}" text-anchor="middle" dominant-baseline="central">${r.n}</text>`).join('');
    w.innerHTML=shSVG(d,Object.assign({},fills,free?{}:Object.fromEntries(regs.filter(r=>!filled.has(r.i)&&r.n==sel).map(r=>[r.i,'#fef9c3']))),{id:'shsvg',labels});
    if(!free){const svg=$('#shsvg'),sr=svg.getBoundingClientRect(),k=sr.width/300;$$('#shsvg text').forEach(t=>{const r=d.R[+t.dataset.l],p=w.querySelector(`path[data-i="${r.i}"]`),b=p.getBBox(),cx=b.x+b.width/2,cy=b.y+b.height/2;let pt=r.o.l;
      if(!pt){let bd=1e9;for(let i=1;i<10;i++)for(let j=1;j<10;j++){const x=b.x+b.width*i/10,y=b.y+b.height*j/10;if(document.elementFromPoint(sr.left+x*k,sr.top+y*k)===p){const dd=(x-cx)**2+(y-cy)**2;if(dd<bd){bd=dd;pt=[x,y]}}}pt=pt||[cx,cy]}
      t.setAttribute('x',pt[0]);t.setAttribute('y',pt[1]);t.setAttribute('font-size',Math.max(7,Math.min(16,Math.min(b.width,b.height)*.55)))})}
    const p=$('#cbp');if(p)p.textContent=Math.round(filled.size/regs.length*100)+'%'}
  const pick=v=>{sel=v;$$('.chip').forEach(c=>c.classList.toggle('on',(c.dataset.n?+c.dataset.n:c.dataset.k)==v));if(mode=='es')say(d.keys[v-1],null,'es');else if(free)say(v,null,'es');else SFX.pop(v);render()};
  $$('.chip').forEach(c=>c.onclick=()=>pick(c.dataset.n?+c.dataset.n:c.dataset.k));
  w.addEventListener('pointerdown',e=>{const t=e.target.closest('path');if(!t)return;const r=d.R[+t.dataset.i];if(r.o.fix)return;e.preventDefault();
    if(free){fills[r.i]=CB_COL[sel][0];SFX.pop(R(0,5));cs.free[id]=fills;save();t.setAttribute('fill',fills[r.i]);t.classList.remove('popfill');void t.getBBox();t.classList.add('popfill');return}
    if(filled.has(r.i))return;
    if(r.n!=sel){SFX.wrong();t.setAttribute('fill','#fecaca');setTimeout(()=>render(),350);if(mode=='es')say(d.keys[r.n-1],null,'es');return}
    filled.add(r.i);fills[r.i]=CB_COL[r.c][0];SFX.pop(filled.size%6);cs.prog[id]=[...filled];save();render();if(esHard){const c=$(`.chip[data-n="${r.n}"]`);if(c)c.classList.add('found')}
    if(regs.every(x=>filled.has(x.i)))finish()});
  if(free)$('#shclr').onclick=()=>{for(const k in fills)delete fills[k];cs.free[id]={};save();SFX.whoosh();render()};
  GH.wire({quit:()=>{gtStop();classicColor('shape')}});
  function finish(){cs.done[id]=1;delete cs.prog[id];S.coins+=5;save();gtStop();SFX.fanfare();
    setTimeout(()=>{const all={};d.R.forEach(r=>all[r.i]=CB_COL[r.c][0]);
      // P4-16: the shared end card with the finished picture
      const o=GH.end('art',{win:true,made:true,pic:shSVG(d,all),title:`You colored the ${d.name}!`,stats:[['+5','coins','coin']],
        btns:UI.btn('More pictures',{kind:'primary',size:'lg',icon:'palette',id:'cbm',wide:true})});if(S.voice)say(`Beautiful! You colored the ${d.name}!`);o.querySelector('#cbm').onclick=()=>{o.remove();classicColor('shape')}},600)}
  pick(sel);let rs;addEventListener('resize',()=>{clearTimeout(rs);rs=setTimeout(()=>{if($('#shw'))render()},120)});
  gtStart('#gtm',()=>timeUpOverlay());
  if(S.voice)setTimeout(()=>say(free?'Pick a color and tap to paint!':mode=='math'?'Solve the fact to find each color!':mode=='es'?'Tap a color to hear it in Spanish!':'Match the numbers to the colors!'),300)}

function cbLayout(n){const land=innerWidth>innerHeight,avW=land?innerWidth-260:innerWidth-24,avH=land?innerHeight-80:innerHeight-80-(n>6?190:120);return Math.max(14,Math.floor(Math.min(avW,avH)/CBN))}
function colorPic(id,mode){const d=cbData(id),cs=cbS(),fill=(cs.prog[id]||'0'.repeat(CBN*CBN)).split('');let sel=1,count=fill.filter(c=>c=='1').length;
  const ml=mode=='math3'?3:mode=='math2'?2:1,esHard=mode=='es2';if(mode.startsWith('math'))mode='math';if(esHard)mode='es';const facts=d.keys.map((k,i)=>mode=='math'?cbFact(i+1,ml):null);
  view(`${GH.top('art',{play:true,sub:d.name,chips:'<span class="stat gh-st" aria-label="Colored"><b id="cbp">0%</b></span>'})}
   <div class="cbwrap"><div class="cbcv"><canvas id="cbc" role="img" aria-label="Your picture"></canvas></div><div class="cbpal">${d.keys.map((k,i)=>`<button class="btn chip" data-n="${i+1}" style="--cc:${CB_COL[k][0]}"><span class="sw"></span><b>${mode=='math'?facts[i]:i+1}</b>${mode=='es'?`<small>${k}</small>`:''}</button>`).join('')}</div></div>`);
  const cv=$('#cbc'),x=cv.getContext('2d');let cs2=cbLayout(d.keys.length),dpr=Math.min(2,devicePixelRatio||1),flash=-1,flashT=0;
  const size=()=>{cs2=cbLayout(d.keys.length);cv.width=cv.height=cs2*CBN*dpr;cv.style.width=cv.style.height=cs2*CBN+'px';draw()};
  function draw(){const s=cs2*dpr;x.clearRect(0,0,cv.width,cv.height);x.textAlign='center';x.textBaseline='middle';x.font=`bold ${Math.floor(s*.5)}px Andika, sans-serif`;
    d.num.forEach((n,i)=>{const cx=(i%CBN)*s,cy=Math.floor(i/CBN)*s;if(fill[i]=='1'){x.fillStyle=CB_COL[d.G[i]][0];x.fillRect(cx,cy,s+.5,s+.5)}
      else{x.fillStyle=n==sel?'#fef9c3':'#fff';x.fillRect(cx,cy,s,s);x.strokeStyle='#e7e5e4';x.lineWidth=1;x.strokeRect(cx+.5,cy+.5,s-1,s-1);x.fillStyle=n==sel?'#1d4ed8':'#a8a29e';x.fillText(n,cx+s/2,cy+s/2+1)}
      if(i==flash){x.strokeStyle='#ef4444';x.lineWidth=3*dpr;x.strokeRect(cx+2,cy+2,s-4,s-4)}});
    const pc=Math.round(count/fill.length*100),p=$('#cbp');if(p)p.textContent=pc+'%'}
  const pick=n=>{sel=n;$$('.chip').forEach(c=>c.classList.toggle('on',+c.dataset.n==n));const k=d.keys[n-1];if(mode=='es')say(k,null,'es');else SFX.pop(n);draw()};
  $$('.chip').forEach(c=>c.onclick=()=>pick(+c.dataset.n));
  let down=false,dragged=false,last=-1;
  const cellAt=e=>{const r=cv.getBoundingClientRect(),cx=Math.floor((e.clientX-r.left)/cs2),cy=Math.floor((e.clientY-r.top)/cs2);return cx>=0&&cy>=0&&cx<CBN&&cy<CBN?cy*CBN+cx:-1};
  const paint=(i,tap)=>{if(i<0||fill[i]=='1')return;if(d.num[i]!=sel){if(tap){SFX.wrong();flash=i;clearTimeout(flashT);flashT=setTimeout(()=>{flash=-1;draw()},500);draw();
      if(mode=='es')say(d.keys[d.num[i]-1],null,'es')}return}
    fill[i]='1';count++;SFX.pop(count%6);draw();
    if(count%16==0){cs.prog[id]=fill.join('');save()}
    if(fill.every(c=>c=='1'))finishPic()};
  cv.addEventListener('pointerdown',e=>{e.preventDefault();down=true;dragged=false;last=cellAt(e);try{cv.setPointerCapture(e.pointerId)}catch(_){}});
  cv.addEventListener('pointermove',e=>{if(!down)return;const i=cellAt(e);if(i!=last){if(!dragged)paint(last,false);dragged=true;last=i;paint(i,false)}});
  cv.addEventListener('pointerup',e=>{if(down&&!dragged)paint(cellAt(e),true);down=false});
  const leave=()=>{cs.prog[id]=fill.join('');save()};
  GH.wire({quit:()=>{leave();gtStop();classicColor('pixel')}});
  function finishPic(){leave();cs.done[id]=1;delete cs.prog[id];S.coins+=5;save();gtStop();draw();SFX.fanfare();
    setTimeout(()=>{ // P4-16: the shared end card with the finished picture
      const o=GH.end('art',{win:true,made:true,pic:`<img src="${cbThumb(d.G,true,200)}" alt="">`,title:`You finished ${d.name}!`,stats:[['+5','coins','coin']],
        btns:UI.btn('More pictures',{kind:'primary',size:'lg',icon:'palette',id:'cbm',wide:true})});if(S.voice)say(`Beautiful! You finished ${d.name}!`);o.querySelector('#cbm').onclick=()=>{o.remove();classicColor('pixel')}},700)}
  pick(1);size();let rs;const onR=()=>{clearTimeout(rs);rs=setTimeout(()=>{if($('#cbc'))size()},120)};addEventListener('resize',onR);
  gtStart('#gtm',()=>{leave();timeUpOverlay()});
  if(S.voice)setTimeout(()=>say(mode=='math'?'Solve the fact to find each color!':mode=='es'?'Tap a color to hear it in Spanish!':'Match the numbers to the colors!'),300)}

const FP_COLS=['rojo','naranja','amarillo','verde','verde oscuro','celeste','azul','morado','rosa','café','gris','negro','blanco'];
function freePaint(ai){const cs=cbS();const G=ai>=0?cs.art[ai].split(',').map(k=>k||'blanco'):cbGrid('blanco');let sel='rojo',saved=ai>=0,idx=ai;
  view(`${GH.top('art',{play:true,sub:'Free Paint',tools:GH.tool('download','Save to My Drawings','fsave')})}
   <div class="cbwrap"><div class="cbcv"><canvas id="cbc" role="img" aria-label="Your picture"></canvas></div><div class="cbpal fp">${FP_COLS.map(k=>`<button class="btn chip" data-k="${k}" style="--cc:${CB_COL[k][0]}"><span class="sw"></span></button>`).join('')}
    <button class="btn chip" data-k="fill" title="Fill">🪣</button><button class="btn chip" id="fclear">🗑️</button></div></div>`);
  const cv=$('#cbc'),x=cv.getContext('2d');let cs2=cbLayout(14),dpr=Math.min(2,devicePixelRatio||1),bucket=false;
  const size=()=>{cs2=cbLayout(14);cv.width=cv.height=cs2*CBN*dpr;cv.style.width=cv.style.height=cs2*CBN+'px';draw()};
  function draw(){const s=cs2*dpr;G.forEach((k,i)=>{x.fillStyle=CB_COL[k][0];x.fillRect((i%CBN)*s,Math.floor(i/CBN)*s,s+.5,s+.5)});x.strokeStyle='#0000000f';x.lineWidth=1;for(let i=1;i<CBN;i++){x.beginPath();x.moveTo(i*s,0);x.lineTo(i*s,CBN*s);x.moveTo(0,i*s);x.lineTo(CBN*s,i*s);x.stroke()}}
  const pick=k=>{if(k=='fill'){bucket=!bucket;$('[data-k="fill"]').classList.toggle('on',bucket);SFX.pop(2);return}sel=k;$$('.chip[data-k]').forEach(c=>c.classList.toggle('on',c.dataset.k==k||(c.dataset.k=='fill'&&bucket)));say(k,null,'es')};
  $$('.chip[data-k]').forEach(c=>c.onclick=()=>pick(c.dataset.k));
  const flood=(i,from)=>{if(from==sel)return;const st=[i];while(st.length){const j=st.pop();if(j<0||j>=G.length||G[j]!=from)continue;G[j]=sel;const cx=j%CBN;if(cx>0)st.push(j-1);if(cx<CBN-1)st.push(j+1);st.push(j-CBN,j+CBN)}};
  let down=false,last=-1;const cellAt=e=>{const r=cv.getBoundingClientRect(),cx=Math.floor((e.clientX-r.left)/cs2),cy=Math.floor((e.clientY-r.top)/cs2);return cx>=0&&cy>=0&&cx<CBN&&cy<CBN?cy*CBN+cx:-1};
  const paint=i=>{if(i<0)return;if(bucket){flood(i,G[i]);SFX.magic()}else{if(G[i]==sel)return;G[i]=sel;SFX.pop(R(0,5))}saved=false;draw()};
  cv.addEventListener('pointerdown',e=>{e.preventDefault();down=true;last=cellAt(e);paint(last);try{cv.setPointerCapture(e.pointerId)}catch(_){}});
  cv.addEventListener('pointermove',e=>{if(!down||bucket)return;const i=cellAt(e);if(i!=last){last=i;paint(i)}});
  cv.addEventListener('pointerup',()=>{down=false});
  const doSave=()=>{const str=G.join(',');if(idx>=0)cs.art[idx]=str;else{cs.art.unshift(str);cs.art=cs.art.slice(0,12);idx=0}saved=true;save()};
  $('#fsave').onclick=()=>{doSave();SFX.fanfare();confetti(20);fb('Saved to My Drawings!')};
  $('#fclear').onclick=()=>{G.fill('blanco');SFX.whoosh();saved=false;draw()};
  GH.wire({quit:()=>{if(!saved&&G.some(k=>k!='blanco'))doSave();gtStop();classicColor('paint')}});
  pick('rojo');size();addEventListener('resize',()=>{if($('#cbc')&&$('.fp'))size()});
  gtStart('#gtm',()=>{if(G.some(k=>k!='blanco'))doSave();timeUpOverlay()})}


var GAMES_VER='v153'; // last line: the whole file ran (checked by dataReady() before the app starts)
