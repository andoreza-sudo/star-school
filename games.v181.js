/* Star School games v181. BUILT by tools/build.py from 48-game-hub.css, 61-hill.css, 59-game-hub.js, 60-gl.js, 62-hill.js, 62b-hill-gl.js, 64-gtimer.js, 66-colornum.js, 68-lowpoly.js, 70-art.js, 72-shapes.js: never edit by hand.
   index.html v181 loads this file on demand (partsThen in src/js/90-app.js, P6-02), after data.v181.js. */
(function(){var s=document.createElement('style');s.id='css-games';s.textContent="/* Game Room hub and shared game chrome (P4-16; src/js/59-game-hub.js; DESIGN_SYSTEM.md 9 row 8). Ships in games.<VER>.js (A11b),\n   after index.html's own CSS. Tokens only; motion is transform/opacity. The hub: a fair scene with the game-time ticket, a drawn\n   card per registered game, how to earn more. Every game screen: one top bar .gh-top (back or pause, badge and name, tools, chips,\n   the time chip, sound), the pause sheet .gh-sheet and the end card .gh-end. Game canvases are not restyled. */\n\n/* ---- the hub ---- */\n.gh-room{display:flex;flex-direction:column;flex:1;min-height:0}\n.gh-scroll{padding:var(--s-1) var(--s-4) var(--s-7)}\n.gh-hero{position:relative;height:220px;max-width:1040px;margin:0 auto var(--s-5);border-radius:var(--r-hero);overflow:hidden;\n  background:linear-gradient(var(--sc-sky-1),var(--sc-sky) 62%,var(--sc-green) 63%);box-shadow:inset 0 0 0 2px var(--wash),0 5px 0 var(--sc-green-2)}\n.gh-scene{position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none}\n.gh-tk{position:absolute;left:50%;bottom:14px;width:min(300px,82%);aspect-ratio:300/104;transform:translateX(-50%)}\n.gh-tks{position:absolute;inset:0;display:block;width:100%;height:100%}\n.gh-tkt{position:absolute;left:34%;right:5%;top:13%;bottom:18%;display:flex;flex-direction:column;align-items:center;justify-content:center;\n  text-align:center;line-height:1;color:var(--ink)}\n.gh-tkt b{font-family:var(--font-display);font-size:var(--fs-7);font-weight:700;font-variant-numeric:tabular-nums;letter-spacing:.01em}\n.gh-tkt span{margin-top:var(--s-1);font-size:var(--fs-2);font-weight:700;color:var(--ink-2);white-space:nowrap}\n.gh-hero.off .gh-tkt b{color:var(--ink-3)}\n.gh-why{display:flex;flex-direction:column;align-items:center;gap:var(--s-3);margin:0 auto var(--s-6);text-align:center}\n.gh-why .btn.lg{padding-left:var(--s-5);padding-right:var(--s-5)}\n@media (max-width:480px){.gh-why .btn.lg{font-size:var(--fs-4)}}\n.gh-why.on{margin-bottom:var(--s-4)}\n.gh-why p{max-width:34ch;margin:0;font-size:var(--fs-3);font-weight:700;line-height:1.35;color:var(--ink-2)}\n\n/* a card per game: the drawn picture on its backdrop, the name and one line, the play disc */\n.gh-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,272px),1fr));gap:var(--s-5);max-width:1040px;margin:0 auto}\n.gh-card{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:var(--s-3);\n  padding:var(--s-3) var(--s-3) var(--s-4);border:0;border-radius:var(--r-hero);background:var(--surface);color:var(--ink);font:inherit;\n  text-align:left;cursor:pointer;touch-action:manipulation;box-shadow:inset 0 0 0 2px var(--line),0 6px 0 var(--ledge-soft),0 12px 18px var(--drop);\n  transition:transform var(--t-fast) var(--ease)}\n.gh-card:active,.gh-card.is-press{transform:translateY(4px)}\n.gh-card{--c-fill:var(--c);--c-ledge:var(--c-shade)}\n.gh-card.s-play{--c-fill:var(--play-shade);--c-ledge:var(--play-deep)}\n.gh-pic{position:relative;grid-column:1/-1;display:block;height:150px;border-radius:var(--r-card);overflow:hidden;\n  background:linear-gradient(var(--gh-a),var(--gh-b));box-shadow:inset 0 -4px 0 var(--shadow-ink)}\n.gh-art{display:block;width:100%;height:100%}\n.gh-info{min-width:0;padding:0 0 0 var(--s-2)}\n.gh-name{display:block;font-family:var(--font-display);font-size:var(--fs-5);font-weight:700;line-height:1.15;color:var(--ink)}\n.gh-sub{display:flex;flex-wrap:wrap;gap:2px var(--s-3);margin-top:var(--s-1);font-size:var(--fs-2);line-height:1.35;color:var(--ink-2)}\n.gh-sub>span{display:inline-flex;align-items:center;gap:var(--s-1)}\n.gh-sub b{color:var(--ink)}\n.gh-sub .ic{flex:none;color:var(--star-shade)}\n.gh-go{display:grid;place-items:center;width:64px;height:64px;margin-right:var(--s-1);border-radius:50%;color:var(--surface);\n  background:linear-gradient(var(--hi),var(--hi-0) 60%) var(--c-fill,var(--c));box-shadow:inset 0 2px 0 var(--hi),0 5px 0 var(--c-ledge,var(--c-shade))}\n.gh-go .ic{width:30px;height:30px;margin-left:3px}\n.gh-flag{position:absolute;left:var(--s-3);bottom:var(--s-3);display:inline-flex;align-items:center;gap:var(--s-1);padding:var(--s-1) var(--s-3) var(--s-1) var(--s-2);\n  border-radius:var(--r-pill);background:var(--surface);color:var(--ink);font-size:var(--fs-2);font-weight:700;line-height:1.2;\n  box-shadow:0 3px 0 var(--ledge-soft)}\n.gh-flag .ic{flex:none;color:var(--play)}\n.gh-card:is(.need,.lock) .gh-pic::after{content:'';position:absolute;inset:0;background:var(--wash)}\n.gh-card:is(.need,.lock) .gh-flag{z-index:1}\n.gh-card:is(.need,.lock) .gh-go{background:var(--surface-2);color:var(--ink-3);box-shadow:inset 0 0 0 2px var(--line),0 5px 0 var(--ledge-soft)}\n.gh-card.lock{cursor:default}\n.gh-card.lock .gh-go .ic{margin-left:0}\n\n/* how to earn more game time */\n.gh-earn{max-width:1040px;margin:var(--s-7) auto 0;padding:var(--s-5);border-radius:var(--r-card);background:var(--surface);\n  box-shadow:inset 0 0 0 2px var(--line),0 5px 0 var(--ledge-soft)}\n.gh-earn h2{display:flex;align-items:center;gap:var(--s-2);margin:0 0 var(--s-4);font-family:var(--font-display);font-size:var(--fs-4);line-height:1.2;color:var(--ink)}\n.gh-earn h2 .ic{flex:none;color:var(--play);--ic2:var(--surface)}\n.gh-earn ul{display:grid;gap:var(--s-2) var(--s-6);margin:0;padding:0;list-style:none}\n.gh-earn li{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:var(--s-3);font-size:var(--fs-3);line-height:1.3;color:var(--ink)}\n.gh-ei{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--play-tint);color:var(--play-shade);--ic2:var(--play-tint)}\n.gh-earn li b{color:var(--play-shade);text-align:right}\n.gh-earn p{margin:var(--s-4) 0 0;font-size:var(--fs-2);line-height:1.4;color:var(--ink-2)}\n@media (min-width:860px){.gh-earn ul{grid-template-columns:1fr 1fr}}\n\n/* ---- the shared top bar ---- */\n.gh-top .gh-ttl{display:flex;align-items:center;gap:var(--s-2)}\n.gh-tb{flex:none;display:grid;place-items:center;width:44px;height:44px;border-radius:14px;color:var(--surface);\n  background:linear-gradient(var(--hi),var(--hi-0) 60%) var(--c);box-shadow:inset 0 -3px 0 var(--c-shade)}\n.gh-tb .ic{width:26px;height:26px}\n.gh-tt{display:flex;flex-direction:column;min-width:0;line-height:1.15}\n.gh-gn,.gh-gs{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.gh-tt.two .gh-gn{font-size:var(--fs-2);color:var(--c-shade)}\n.gh-tt.two .gh-gs{font-size:var(--fs-4);color:var(--ink)}\n.gh-tools{display:flex;flex:none;gap:var(--s-2)}\n.gh-top .btn.icon.on{background:var(--brand-tint);box-shadow:inset 0 0 0 2px var(--brand),0 4px 0 var(--brand-shade)}\n.gh-top #gpause .ic{color:var(--c-shade)}\n.gh-top .stat.gh-up{background:var(--try-tint);color:var(--try-ink);box-shadow:inset 0 0 0 2px var(--try),0 3px 0 var(--try)}\n.gh-top .stat.gh-up .ic{color:var(--try-ink);--ic2:var(--try-tint)}\n.gh-top .stat.gh-st .ic{color:var(--c-shade)}\n.gh-top .stat.gh-nut .ic{color:var(--star-shade);--ic2:var(--star-tint)}\n@media (max-width:480px){\n  .gh-tb{width:40px;height:40px;border-radius:12px}.gh-tb .ic{width:24px;height:24px}\n  .gh-top.gh-wrap{flex-wrap:wrap}.gh-wrap .gh-tools{order:9;flex-basis:100%;justify-content:flex-end}\n  .gh-top:not(.gh-mtop):not(.gh-hud) .gh-tb{display:none}\n  .gh-tt.two .gh-gs{font-size:var(--fs-3)}\n}\n/* over a full-screen canvas (Hill Climb): no paper behind; the name shows where there is room */\n.gh-top.gh-hud{position:absolute;left:0;right:0;top:0;z-index:2;min-height:0;padding:var(--s-2) var(--s-3);background:none}\n.gh-hud .gh-ttl{flex:0 1 auto;padding:var(--s-1) var(--s-3) var(--s-1) var(--s-1);border-radius:var(--r-pill);background:var(--surface);\n  box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.gh-hud .gh-ttl .gh-gn{font-size:var(--fs-4)}\n.gh-hud .stat{flex:none;min-height:44px;padding:0 var(--s-3) 0 var(--s-1);font-size:var(--fs-3)}\n.gh-hud .stat .ic{width:28px;height:28px}\n.gh-hud .stat.gh-dist{flex:0 1 auto;min-width:0;padding-left:var(--s-3)}\n.gh-hud .gh-dist b{overflow:hidden;text-overflow:ellipsis}\n@media (max-width:719px){.gh-hud .gh-ttl{display:none}}\n@media (max-width:480px){.gh-top.gh-hud{gap:var(--s-1);padding:var(--s-2)}.gh-hud .stat{padding:0 var(--s-2) 0 2px}.gh-hud .stat .ic{width:24px;height:24px}\n}\n\n/* ---- the pause sheet ---- */\n.gh-sheet{text-align:center}\n.gh-scpic{position:relative;height:128px;margin:0 0 var(--s-4);border-radius:var(--r-card);overflow:hidden;background:linear-gradient(var(--gh-a),var(--gh-b))}\n.gh-sheet .gh-acts{display:flex;flex-direction:column;gap:var(--s-3)}\n@media (max-height:520px){.gh-scpic{height:84px;margin-bottom:var(--s-2)}.sheet .gh-sheet p{margin-bottom:var(--s-3)}}\n\n/* ---- the end card ---- */\n.ovl.gh-ovl{z-index:65}\n.gh-end{max-width:480px;padding:var(--s-5);overflow-y:auto;overscroll-behavior:contain}\n.gh-epic{position:relative;height:clamp(88px,20vh,140px);border-radius:var(--r-card);overflow:hidden;background:linear-gradient(var(--gh-a),var(--gh-b));\n  box-shadow:inset 0 -4px 0 var(--shadow-ink)}\n.gh-epic.made{display:grid;place-items:center;height:clamp(120px,26vh,200px);background:var(--surface-2)}\n.gh-epic.made>*{width:auto;height:88%;max-width:88%;aspect-ratio:1;border-radius:var(--r-btn);background:var(--surface);\n  box-shadow:0 4px 0 var(--ledge-soft)}\n.gh-epic.made img{image-rendering:pixelated}\n.gh-end .rw-rays{top:-40px}\n.rw-card p.gh-ename{position:relative;margin:var(--s-3) 0 0;font-size:var(--fs-2);font-weight:700;color:var(--c-shade)}\n.rw-card.gh-end h1{margin-top:0}\n.gh-estars{position:relative;margin:0 0 var(--s-2)}\n.rw-card p.gh-etag{position:relative;margin:0 0 var(--s-2)}\n.gh-stats{position:relative;display:grid;grid-template-columns:repeat(var(--n,3),minmax(0,1fr));gap:var(--s-2);margin:var(--s-2) 0 var(--s-3)}\n.gh-stat{display:flex;flex-direction:column;align-items:center;gap:2px;padding:var(--s-2) var(--s-1);border-radius:var(--r-btn);background:var(--surface-2)}\n.gh-stat .ic{color:var(--c-shade)}\n.gh-stat .ic.ic-coin{color:var(--star-shade);--ic2:var(--star-tint)}\n.gh-stat b{font-family:var(--font-display);font-size:var(--fs-4);line-height:1.1;color:var(--ink);font-variant-numeric:tabular-nums}\n.gh-stat span{font-size:var(--fs-2);line-height:1.2;color:var(--ink-2)}\n.gh-extra{position:relative;margin:var(--s-2) 0 var(--s-3)}\n.rw-card p.gh-line{position:relative;display:flex;align-items:center;justify-content:center;gap:var(--s-2);margin:var(--s-2) 0 0;\n  font-size:var(--fs-3);font-weight:700;line-height:1.3;color:var(--ink);text-align:left}\n.gh-line .ic{flex:none;color:var(--c-shade)}\n.gh-end .gh-acts{position:relative;display:flex;flex-direction:column;gap:var(--s-3);margin-top:var(--s-4)}\n.gh-acts .btn.lg{padding-left:var(--s-4);padding-right:var(--s-4)}\n@media (max-width:480px){.gh-stats.n4{grid-template-columns:repeat(2,minmax(0,1fr))}.gh-acts .btn.lg{font-size:var(--fs-4)}\n  .rw-card p.gh-line{font-size:var(--fs-2)}}\n@media (max-height:620px) and (orientation:landscape){\n  .gh-end{max-width:780px;display:grid;grid-template-columns:minmax(0,280px) minmax(0,1fr);column-gap:var(--s-5);align-content:start;padding:var(--s-4)}\n  .gh-end>*{grid-column:2}\n  .gh-end>.gh-epic{grid-column:1;grid-row:1/span 12;align-self:center;height:auto;min-height:0;aspect-ratio:240/120}\n  .gh-end>.gh-epic.made{height:auto;aspect-ratio:1}.gh-epic.made>*{height:auto;width:88%}\n  .gh-end .gh-acts{flex-direction:row;flex-wrap:wrap;justify-content:center}\n  .gh-end .gh-acts .btn{flex:1 1 150px;white-space:nowrap}.gh-end .gh-acts .btn.lg{flex-basis:100%;font-size:var(--fs-4)}\n}\n\n/* the hub on phones and in short landscape */\n@media (max-width:480px){\n  .gh-scroll{padding:var(--s-1) var(--s-3) var(--s-7)}\n  .gh-hero{height:196px}\n  .gh-tk{width:min(256px,76%);bottom:10px}\n  .gh-tkt b{font-size:var(--fs-6)}\n  .gh-pic{height:132px}\n  .gh-name{font-size:var(--fs-4)}\n  .gh-go{width:56px;height:56px}.gh-go .ic{width:26px;height:26px}\n  .gh-earn{padding:var(--s-4)}.gh-earn li{font-size:var(--fs-2)}\n}\n@media (max-height:620px) and (orientation:landscape){\n  .gh-hero{height:196px;margin-bottom:var(--s-4)}\n  .gh-tk{width:min(256px,40%);bottom:10px}\n  .gh-tkt b{font-size:var(--fs-6)}\n  .gh-pic{height:118px}\n}\n/* ---------- 4x4 Hill Climb (G-HC2): the drive's HUD and pedals, the menu (worlds, stages, distance drive), the garage. Tokens only. ---------- */\n.hc{position:fixed;inset:0;touch-action:none;background:var(--ill-ink)}.hc canvas{position:absolute;inset:0;width:100%;height:100%}\n/* second HUD row under the top bar: a thick fuel gauge and the distance (never cut) with a track to the flag */\n.hc-hud2{position:absolute;left:0;right:0;top:64px;z-index:2;display:flex;gap:var(--s-2);padding:0 var(--s-3);pointer-events:none;align-items:center}\n.hc-fuel{display:flex;align-items:center;gap:var(--s-1);flex:0 1 220px;min-width:132px;padding:var(--s-1) var(--s-3) var(--s-1) var(--s-1);border-radius:var(--r-pill);\n  background:var(--surface);box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.hc-fuel .ic{flex:none;color:var(--ill-red-2)}\n.hc-gauge{flex:1;height:20px;border-radius:var(--r-pill);background:var(--surface-2);box-shadow:inset 0 0 0 2px var(--line);overflow:hidden}\n.hc-gauge i{display:block;height:100%;transform-origin:left;background:linear-gradient(90deg,var(--ill-orange),var(--ill-green));transition:transform var(--t-fast) linear}\n.hc-fuel.low .hc-gauge i{background:var(--ill-red)}.hc-fuel.low{animation:hc-low 1s infinite}\n@keyframes hc-low{50%{opacity:.55}}\n.hc-prog{flex:1 1 auto;min-width:0;max-width:420px;display:flex;align-items:center;gap:var(--s-2);padding:var(--s-1) var(--s-3);border-radius:var(--r-pill);\n  background:var(--surface);color:var(--ink);box-shadow:inset 0 0 0 2px var(--line),0 3px 0 var(--ledge-soft)}\n.hc-prog b{flex:none;font-size:var(--fs-3);white-space:nowrap;font-variant-numeric:tabular-nums}\n.hc-track{position:relative;flex:1;min-width:24px;height:12px;border-radius:var(--r-pill);background:var(--surface-2);box-shadow:inset 0 0 0 2px var(--line)}\n.hc-track #hcpb{position:absolute;inset:0;border-radius:var(--r-pill);transform-origin:left;transform:scaleX(0);background:linear-gradient(90deg,var(--ill-green),var(--ill-yellow))}\n.hc-tick{position:absolute;top:-4px;width:4px;height:20px;margin-left:-2px;border-radius:2px;background:var(--ill-orange-2)}\n.hc-bestm{position:absolute;top:-5px;width:6px;height:22px;margin-left:-3px;border-radius:3px;background:var(--ill-yellow);box-shadow:0 0 0 2px var(--ill-brown-3);display:none}\n@media (max-width:480px){.hc-hud2{top:60px;padding:0 var(--s-2);gap:var(--s-1)}.hc-fuel{min-width:116px}.hc-prog{padding:var(--s-1) var(--s-2)}}\n.pedal{position:absolute;bottom:14px;width:clamp(96px,16vw,140px);height:clamp(96px,16vw,140px);border-radius:28px;display:flex;flex-direction:column;align-items:center;justify-content:center;\n  color:var(--surface);font-weight:700;box-shadow:0 6px 0 var(--shadow-ink);pointer-events:none;opacity:.92;transition:transform var(--t-fast) var(--ease)}\n.pedal .ic{width:52px;height:52px}.pedal small{font-size:var(--fs-3)}\n.pedal.brake{left:14px;background:var(--danger-shade)}.pedal.gas{right:14px;background:var(--good-ink)}.pedal.on{transform:translateY(4px) scale(.96);opacity:1}\n.hcmsg{position:absolute;left:50%;top:118px;transform:translateX(-50%);z-index:3;background:var(--surface);color:var(--ink);border-radius:var(--r-card);padding:var(--s-2) var(--s-4);\n  font-size:var(--fs-4);font-weight:700;text-align:center;width:max-content;max-width:min(92vw,560px);opacity:0;transition:opacity var(--t) linear;pointer-events:none;box-shadow:0 4px 0 var(--ledge-soft)}\n.hcmsg.on{opacity:1}\n.hcpop{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%) scale(.4);font-size:clamp(26px,6vw,44px);font-weight:700;color:var(--ill-yellow);\n  text-shadow:0 3px 0 var(--ill-brown-3),0 0 10px var(--shadow-ink);opacity:0;pointer-events:none;white-space:nowrap}\n.hcpop.on{animation:hcpop 1.4s ease-in-out}@keyframes hcpop{15%{opacity:1;transform:translate(-50%,-50%) scale(1.12)}70%{opacity:1;transform:translate(-50%,-60%) scale(1)}100%{opacity:0;transform:translate(-50%,-80%) scale(.9)}}\n.hccombo{position:absolute;right:14px;top:120px;font-size:var(--fs-4);font-weight:700;color:var(--surface);background:var(--danger-shade);padding:var(--s-1) var(--s-3);border-radius:var(--r-chip);opacity:0;transition:opacity var(--t-fast) linear}\n.hccombo.on{opacity:1}\n/* ---- the menu ---- */\n.hc-menu h2{margin:var(--s-5) 0 var(--s-2)}\n.hc-goal{display:flex;gap:var(--s-3);align-items:center;padding:var(--s-3) var(--s-4);border-radius:var(--r-card);background:var(--star-tint);color:var(--ink);box-shadow:inset 0 0 0 2px var(--star)}\n.hc-goal .ic{flex:none;color:var(--star-ink)}.hc-goal p{margin:0;font-size:var(--fs-3)}.hc-goal b{display:block;font-size:var(--fs-2);color:var(--star-ink)}\n.hc-wtabs{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s-2);margin:var(--s-3) 0}\n@media (min-width:760px){.hc-wtabs{grid-template-columns:repeat(6,1fr)}}\n.hc-wt{display:flex;flex-direction:column;align-items:flex-start;gap:2px;min-height:64px;padding:var(--s-2) var(--s-3);text-align:left;background:linear-gradient(160deg,var(--hc-a),var(--hc-b));color:var(--ink)}\n.hc-wt b{font-size:var(--fs-2);line-height:1.15}.hc-wt span{display:flex;align-items:center;gap:2px;font-size:var(--fs-2)}\n.hc-wt.on{box-shadow:inset 0 0 0 3px var(--brand),0 3px 0 var(--ledge-soft)}.hc-wt.lock{opacity:.7}.hc-wt .ic{color:var(--star-ink)}\n.hc-world{padding:var(--s-3);border-radius:var(--r-hero);background:linear-gradient(180deg,var(--hc-a),var(--hc-b))}\n.hc-wh{display:flex;align-items:center;justify-content:space-between;gap:var(--s-2);margin-bottom:var(--s-2)}.hc-wh h2{margin:0}\n.hc-stages{display:grid;grid-template-columns:1fr;gap:var(--s-2)}\n@media (min-width:700px){.hc-stages{grid-template-columns:1fr 1fr}}\n.hc-stg{display:grid;grid-template-columns:44px 1fr auto;gap:var(--s-2);align-items:center;padding:var(--s-2) var(--s-3);text-align:left;background:var(--surface);color:var(--ink)}\n.hc-stg.cur{box-shadow:inset 0 0 0 3px var(--play),0 3px 0 var(--ledge-soft)}.hc-stg.lock{opacity:.6}\n.hc-sn{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;background:var(--play-shade);color:var(--surface);font-size:var(--fs-4);font-weight:700}\n.hc-stg.lock .hc-sn{background:var(--surface-2);color:var(--ink-3)}\n.hc-sb{display:flex;flex-direction:column;gap:2px;min-width:0}.hc-sb>b{font-size:var(--fs-3)}\n.hc-prof{display:block;width:100%;max-width:220px;height:30px}\n.hc-gl,.hc-ms span{display:flex;align-items:center;gap:var(--s-1);font-size:var(--fs-2);color:var(--ink-2)}\n.hc-ms{display:flex;flex-direction:column;gap:0}.hc-ms .ok{color:var(--good-ink)}.hc-gl .ic,.hc-ms .ic{flex:none}\n.hc-menu #hcgo{margin:var(--s-4) 0 var(--s-3)}\n.hc-note{margin:0 0 var(--s-2);font-size:var(--fs-2);color:var(--ink-2)}\n.hc-dist{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:var(--s-2)}\n.hc-dw{display:flex;align-items:center;gap:var(--s-2);min-height:56px;padding:var(--s-2) var(--s-3);text-align:left;background:linear-gradient(160deg,var(--hc-a),var(--hc-b));color:var(--ink)}\n.hc-dw span{display:flex;flex-direction:column}.hc-dw small,.hc-gar small,.hc-veh small,.hc-up small{font-size:var(--fs-2);color:var(--ink-2)}\n.hc-gar{display:flex;align-items:center;gap:var(--s-3);width:100%;padding:var(--s-2) var(--s-3);text-align:left;background:var(--surface);color:var(--ink)}\n.hc-gar canvas{width:120px;height:72px;flex:none}.hc-gar>span{flex:1;display:flex;flex-direction:column}\n.hc-tips{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--s-2)}\n.hc-tips li{display:flex;gap:var(--s-2);align-items:flex-start;font-size:var(--fs-2)}.hc-tips .ic{flex:none;color:var(--play-shade)}\n/* ---- the garage ---- */\n.hc-show{display:flex;flex-direction:column;align-items:center;padding:var(--s-3);border-radius:var(--r-hero);background:linear-gradient(180deg,var(--sc-sky),var(--sc-sun))}\n.hc-show canvas{width:min(420px,88vw);height:auto}.hc-show b{font-size:var(--fs-5)}\n.hc-ups{display:flex;flex-direction:column;gap:var(--s-2)}\n.hc-up{display:grid;grid-template-columns:40px 1fr auto;gap:var(--s-3);align-items:center;padding:var(--s-3);border-radius:var(--r-card);background:var(--surface);box-shadow:inset 0 0 0 2px var(--line)}\n.hc-up>.ic{color:var(--play-shade)}.hc-up>span{display:flex;flex-direction:column;gap:2px;min-width:0}\n.hc-up .hc-num{display:flex;align-items:center;flex-wrap:wrap;gap:2px;color:var(--ink)}\n.hc-pips{display:flex;gap:4px;margin-top:2px}.hc-pips i{width:22px;height:8px;border-radius:4px;background:var(--surface-2);box-shadow:inset 0 0 0 1px var(--line)}.hc-pips i.on{background:var(--play)}\n.hc-max{font-size:var(--fs-2);color:var(--good-ink)}\n.hc-vehs{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:var(--s-2)}\n.hc-veh{display:flex;flex-direction:column;align-items:center;gap:2px;padding:var(--s-2);background:var(--surface);color:var(--ink);text-align:center}\n.hc-veh canvas{width:150px;height:90px}.hc-veh.on{box-shadow:inset 0 0 0 3px var(--good),0 3px 0 var(--ledge-soft)}\n.hc-vc{display:flex;align-items:center;gap:2px;font-size:var(--fs-2);font-weight:700}\n.hc-paints{display:grid;grid-template-columns:repeat(auto-fill,minmax(84px,1fr));gap:var(--s-2)}\n.hc-paint{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:var(--fs-2);padding:var(--s-2) 4px;background:var(--surface);color:var(--ink)}\n.hc-paint>span{width:36px;height:36px;border-radius:50%;box-shadow:inset 0 0 0 3px var(--shadow-ink)}.hc-paint.on{box-shadow:inset 0 0 0 3px var(--good),0 3px 0 var(--ledge-soft)}\n/* ---- G-HC3: the save-for line, today's drive, garage level 2 ---- */\n.hc-save{display:flex;gap:var(--s-2);align-items:center;margin:var(--s-2) 0 0;padding:var(--s-2) var(--s-4);border-radius:var(--r-card);background:var(--surface);color:var(--ink);\n  font-size:var(--fs-2);box-shadow:inset 0 0 0 2px var(--star-tint),0 3px 0 var(--ledge-soft)}\n.hc-save .ic{flex:none;color:var(--star-ink)}\n.hc-day{display:grid;grid-template-columns:48px minmax(0,1fr) auto;gap:var(--s-3);align-items:center;width:100%;min-height:88px;margin-top:var(--s-3);padding:var(--s-3);\n  text-align:left;background:var(--star-tint);color:var(--ink);box-shadow:inset 0 0 0 3px var(--star),0 4px 0 var(--ledge-soft)}\n.hc-day:active{transform:translateY(4px)}\n.hc-daydisc{display:flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:50%;background:var(--star-tint);color:var(--star-ink);--ic2:var(--star-tint)}\n.hc-day.done .hc-daydisc{color:var(--good-ink)}.hc-day.done{box-shadow:inset 0 0 0 3px var(--good),0 4px 0 var(--ledge-soft)}\n.hc-dayt{display:flex;flex-direction:column;gap:2px;min-width:0}.hc-dayt b{font-size:var(--fs-3)}.hc-dayt span{font-size:var(--fs-2)}\n.hc-dayt small{font-size:var(--fs-2);color:var(--ink-2)}\n.hc-t2h{margin:var(--s-3) 0 var(--s-2);font-size:var(--fs-3)}\n.hc-t2s{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:var(--s-2)}\n.hc-t2{display:flex;flex-direction:column;align-items:center;gap:2px;padding:var(--s-2);background:var(--surface);color:var(--ink);text-align:center}\n.hc-t2 canvas{width:120px;height:72px}.hc-t2 b{font-size:var(--fs-2)}\n.hc-t2.on{box-shadow:inset 0 0 0 3px var(--good),0 3px 0 var(--ledge-soft)}.hc-t2.lock{opacity:.75}\n.hc-dayt span,.hc-dayt small{font-weight:400}.hc-menu .hc-day{margin:var(--s-3) 0 0}\n";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)
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
   Each screen of the game draws its top bar with GH.top(id, o) and wires it with GH.wire(o) after view(); play screens get the
   corner house (NAV-01, #gpause) that pauses and asks "Go Home?" (GH.pause, NAV.ask); the game's menus get the picture bar (view());
   game ends use GH.end(id, o) with NAV.end3() choices; time running out uses timeUpOverlay() (64-gtimer.js).

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
    NAV.bar('games');
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
  // id: the registered game. o: {play: true for a play screen (the corner house instead of Back, NAV-01), sub: text under the name (escaped here),
  //   chips: html before the time chip, tools: html of icon buttons (play screens), sound: html of the sound button, timeId: the time
  //   chip's id (default gtm), hud: true over a full-screen canvas}
  top(id, o = {}) {
    const g = GH.get(id) || { name: id, icon: 'gamepad', p: 'play' };
    GH.cur = g.id || null;
    const lead = o.play ? NAV.house('gpause') : UI.ibtn('back', 'Back', { size: 'sm', id: 'back' });
    const cls = 'top tbar gh-top s-' + g.p + (o.play ? ' gh-play' : '') + (o.hud ? ' gh-hud' : '') + (o.tools ? ' gh-hastools' : '') +
      ((o.tools || '').split('<button').length > 2 ? ' gh-wrap' : '');
    return `<div class="${cls}" data-g="${esc(g.id || id)}">${lead}<div class="ttl gh-ttl"><span class="gh-tb">${ico(g.icon || 'gamepad', 24)}</span>` +
      `<span class="gh-tt${o.sub ? ' two' : ''}"><b class="gh-gn">${UI.t(g.short || g.name)}</b>${o.sub ? `<span class="gh-gs">${esc(o.sub)}</span>` : ''}</span></div>` +
      (o.tools ? `<span class="gh-tools">${o.tools}</span>` : '') + (o.chips || '') +
      UI.chip('ticket', fmtT(ptLeft()), { aria: 'Game time left', id: o.timeId || 'gtm' }) + (o.sound || '') + '</div>';
  },
  // after view(): back runs o.back; the corner house opens Go Home?, whose tick runs o.quit (it saves) and then goes Home
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

  /* ---- the corner house's sheet (NAV-01): Go Home? with the tick (o.quit, then Home) and Keep playing. The game-time clock holds
     while it is open (GH.held, set by NAV.ask); o.hold(true|false) pauses the game ---- */
  pause(o = {}) {
    if (GH.held) return;
    return NAV.ask({ hold: o.hold, leave: o.quit });
  },

  /* ---- the end-of-game card (over a dim backdrop; append is done here; returns the overlay so callers wire their buttons) ----
     o: {title, win (rays, a glow and drawn confetti), pic (html instead of the game's picture), made (pic is the child's own picture),
         stars (0-3 or null), tag (a "New record!" line), stats: [[value, label, icon]], extra (html, e.g. a gauge), lines: [[icon, html]],
         btns (html: buttons with the caller's ids)} */
  end(id, o = {}) {
    // NAV-01: {light: true, title, again, next, home} (functions) gives the light end instead: a banner with the same three choices
    // that goes on to Next by itself after 2 s unless touched (NAV.light), for chaining short stages
    if (o.light) return NAV.light(o);
    const g =GH.get(id || GH.cur) || { name: 'Game', p: 'play' };
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
  sub: () => hcHubLine(), // G-HC2: stars won and bolts (62-hill.js)
  open: () => garage(), tapToPlay: '#hcgo',
});
GH.reg({
  id: 'art', btn: 'gcbn', name: 'Coloring', icon: 'palette', p: 'read', sky: ['lilac', 'pink'], art: GH_ART.art,
  sub: () => (typeof artHubLine == 'function' ? artHubLine() : '<span>Mandalas, animals, pixel art and free paint</span>'), // G-ART2: stars and gallery (70-art.js)
  open: () => colorMenu(), tapToPlay: '.sttile[data-k]', saved: 'Your picture is saved.',
});
GH.reg({
  id: 'blocks', btn: 'gbb', name: 'Block Builder', icon: 'blocks', p: 'es', sky: ['sea-1', 'sea'], art: GH_ART.blocks,
  sub: () => bbHubLine(), // G-01: blueprints done (60-blocks.js)
  open: () => bbMenu(), tapToPlay: '[data-w="0"]', saved: 'Your world is saved.',
});
/* ---------- GLX: a small shared WebGL 1 layer for the Game Room (GL-01) ----------
   Plain WebGL 1, no library, works offline. It goes into games.<VER>.js (tools/build.py PARTS) before 62-hill.js, which uses it
   for the 2.5D look of 4x4 Hill Climb (62b-hill-gl.js). Block Builder (61-bb-gl.js) keeps its own renderer for now.
   - GLX.init(canvas) makes a context and three shader programs; it returns null when WebGL is missing, the context cannot be made
     or a shader does not compile (the fallback signal: the game then draws with canvas 2D, exactly as before). GLX.probe() asks
     once per page whether WebGL works at all. A lost context sets R.lost; the game drops to 2D for the rest of the drive. R.soft
     says the WebGL is drawn by the CPU (SwiftShader, llvmpipe): a game should prefer its 2D drawing there.
   - Shaders (all mediump-safe in the fragment stage, lighting per vertex so a cheap Mali GPU does almost nothing per pixel):
       lit  position, normal, colour; one sun and an ambient term (uL, uA), the model matrix turns the normals (uM)
       grad position, colour with alpha (gradients, baked shading, see-through parts); colours are blended premultiplied
       spr  position, texture uv, a tint per vertex (sprites, textured faces); texels under uCut alpha are discarded
   - Meshes: GLX.mesh(R, kind, data, n) puts a Float32Array of interleaved vertices in a buffer (kind: 'lit' 9 floats a vertex,
     'grad' 7, 'spr' 9); GLX.box, GLX.extrude (a convex 2D profile made into a slab), GLX.quad push vertices onto a plain array
     while a mesh is built (never per frame). GLX.batch is a fixed buffer of sprite quads refilled each frame without allocating.
   - Camera: GLX.side() is the side-view perspective the 2.5D games use: the plane z = 0 maps to the screen exactly as the game's
     2D drawing does (sc pixels a world unit around a vanishing point), so a 2D layer drawn on top lines up; nearer things
     (z > 0) grow, farther ones shrink and slide toward the vanishing point (parallax for free).
   - GLX.fit sizes the canvas: device pixels capped at dpr (1.5 by default: cheap tablets) and at px pixels in all, times q.
   Matrices are column-major Float32Arrays; products are made in doubles first (world x reaches 60 000), so nothing jitters. */
const GLX = {
  ok: null,
  probe() {
    if (GLX.ok != null) return GLX.ok;
    try { const c = document.createElement('canvas'), g = c.getContext && (c.getContext('webgl') || c.getContext('experimental-webgl')); GLX.ok = !!g; if (g) { const e = g.getExtension('WEBGL_lose_context'); if (e) e.loseContext(); } } catch (e) { GLX.ok = false; }
    return GLX.ok;
  },
  VS: {
    lit: 'attribute vec3 aP;attribute vec3 aN;attribute vec3 aC;uniform mat4 uMVP;uniform mat4 uM;uniform vec3 uL;uniform float uA;uniform vec3 uT;varying vec3 vC;' +
      'void main(){vec3 n=normalize((uM*vec4(aN,0.)).xyz);float d=max(dot(n,uL),0.);vC=aC*uT*(uA+(1.-uA)*d+.12*max(n.y,0.));gl_Position=uMVP*vec4(aP,1.);}',
    grad: 'attribute vec3 aP;attribute vec4 aC;uniform mat4 uMVP;uniform vec4 uT;varying vec4 vC;void main(){vC=aC*uT;gl_Position=uMVP*vec4(aP,1.);}',
    spr: 'attribute vec3 aP;attribute vec2 aU;attribute vec4 aC;uniform mat4 uMVP;uniform vec4 uT;varying vec2 vU;varying vec4 vC;void main(){vU=aU;vC=aC*uT;gl_Position=uMVP*vec4(aP,1.);}',
  },
  FS: {
    lit: 'precision mediump float;varying vec3 vC;void main(){gl_FragColor=vec4(vC,1.);}',
    grad: 'precision mediump float;varying vec4 vC;void main(){gl_FragColor=vec4(vC.rgb*vC.a,vC.a);}',
    spr: 'precision mediump float;uniform sampler2D uS;uniform float uCut;varying vec2 vU;varying vec4 vC;void main(){vec4 t=texture2D(uS,vU);float a=t.a*vC.a;if(a<uCut)discard;gl_FragColor=vec4(t.rgb*vC.rgb*vC.a,a);}',
  },
  LAY: { lit: [['aP', 3], ['aN', 3], ['aC', 3]], grad: [['aP', 3], ['aC', 4]], spr: [['aP', 3], ['aU', 2], ['aC', 4]] },
  init(cv, o = {}) {
    let gl = null;
    try { gl = cv.getContext('webgl', { alpha: false, antialias: !!o.aa, depth: true, premultipliedAlpha: true, powerPreference: 'low-power' }); } catch (e) { gl = null; }
    if (!gl) return null;
    const R = { gl, cv, lost: false, P: {}, cur: null, tex: new Map(), m: new Float32Array(16), id: new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]), draws: 0 };
    try {
      const sh = (t, s) => { const x = gl.createShader(t); gl.shaderSource(x, s); gl.compileShader(x); if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) throw new Error('shader: ' + gl.getShaderInfoLog(x)); return x; };
      for (const k in GLX.VS) {
        const p = gl.createProgram(), lay = GLX.LAY[k];
        gl.attachShader(p, sh(gl.VERTEX_SHADER, GLX.VS[k])); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, GLX.FS[k]));
        lay.forEach(([a], n) => gl.bindAttribLocation(p, n, a));
        gl.linkProgram(p);
        if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error('link: ' + gl.getProgramInfoLog(p));
        const u = {}, nu = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
        for (let n = 0; n < nu; n++) { const a = gl.getActiveUniform(p, n); u[a.name] = gl.getUniformLocation(p, a.name); }
        R.P[k] = { p, u, lay, st: lay.reduce((s, [, n]) => s + n, 0) * 4 };
      }
    } catch (e) { try { const x = gl.getExtension('WEBGL_lose_context'); if (x) x.loseContext(); } catch (_) {} return null; }
    // a WebGL drawn by the CPU (SwiftShader, llvmpipe: no GPU, or one the browser does not trust) is slower than canvas 2D
    try { const x = gl.getExtension('WEBGL_debug_renderer_info'); R.name = String(gl.getParameter(x ? x.UNMASKED_RENDERER_WEBGL : gl.RENDERER) || ''); } catch (e) { R.name = ''; }
    R.soft = /swiftshader|llvmpipe|softpipe|software/i.test(R.name);
    cv.addEventListener('webglcontextlost', e => { e.preventDefault(); R.lost = true; });
    gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    return R;
  },
  // the context is given back at once (a browser keeps only a few alive; a new one is made for each drive)
  end(R) { if (!R || R.ended) return; R.ended = true; try { const x = R.gl.getExtension('WEBGL_lose_context'); if (x) x.loseContext(); } catch (e) {} },
  // size the canvas to its box: at most dpr device pixels a css pixel and px pixels in all, times q (a slow tablet lowers q)
  fit(cv, o = {}) {
    const cw = Math.max(1, cv.clientWidth), ch = Math.max(1, cv.clientHeight), d = typeof devicePixelRatio == 'number' ? devicePixelRatio : 1;
    const k = Math.min(d, o.dpr || 1.5, Math.sqrt((o.px || 1e6) / (cw * ch))) * (o.q || 1), w = Math.max(1, Math.round(cw * k)), h = Math.max(1, Math.round(ch * k));
    if (cv.width !== w) cv.width = w;
    if (cv.height !== h) cv.height = h;
    return k;
  },
  // ---- meshes ----
  mesh(R, kind, data, n, dyn) {
    const gl = R.gl, b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, data, dyn ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW);
    return { b, kind, n: n == null ? data.length / (R.P[kind].st / 4) : n };
  },
  free(R, m) { if (m && m.b) { R.gl.deleteBuffer(m.b); m.b = null; } },
  // a mesh from a plain array of numbers (null when it is empty)
  arr(R, kind, a) { return a.length ? GLX.mesh(R, kind, new Float32Array(a)) : null; },
  // lit vertices: p position, n normal, c [r, g, b]
  v9(o, x, y, z, nx, ny, nz, c) { o.push(x, y, z, nx, ny, nz, c[0], c[1], c[2]); },
  // a lit box from (x0, y0, z0) to (x1, y1, z1): 12 triangles; c the colour, cs the sides (default c)
  box(o, x0, y0, z0, x1, y1, z1, c, cs) {
    cs = cs || c;
    const F = (a, b, d, e, n, col) => { for (const p of [a, b, d, a, d, e]) GLX.v9(o, p[0], p[1], p[2], n[0], n[1], n[2], col); };
    F([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], [0, 0, 1], c);
    F([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], [0, 0, -1], cs);
    F([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], [0, 1, 0], c);
    F([x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [0, -1, 0], cs);
    F([x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [1, 0, 0], cs);
    F([x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], [-1, 0, 0], cs);
  },
  // a convex 2D profile pts [[x, y], ...] (counter-clockwise) made into a slab from z0 to z1: the caps (front c, back cb) and the
  // sides (cs) with their own normals, so it is lit like a solid
  extrude(o, pts, z0, z1, c, cs, cb) {
    cs = cs || c; cb = cb || c;
    const n = pts.length;
    for (let i = 1; i < n - 1; i++) {
      for (const p of [pts[0], pts[i], pts[i + 1]]) GLX.v9(o, p[0], p[1], z1, 0, 0, 1, c);
      for (const p of [pts[0], pts[i + 1], pts[i]]) GLX.v9(o, p[0], p[1], z0, 0, 0, -1, cb);
    }
    for (let i = 0; i < n; i++) {
      const a = pts[i], b = pts[(i + 1) % n], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, nx = dy / l, ny = -dx / l;
      for (const [p, z] of [[a, z1], [a, z0], [b, z0], [a, z1], [b, z0], [b, z1]]) GLX.v9(o, p[0], p[1], z, nx, ny, 0, cs);
    }
  },
  // a flat quad for the grad or spr programs: corners a, b, c, d (each [x, y, z]), colours ca..cd ([r, g, b, a]), uvs (spr only)
  quad(o, kind, a, b, c, d, ca, cb, cc, cd, uv) {
    const P = [a, b, c, a, c, d], C = [ca, cb || ca, cc || ca, ca, cc || ca, cd || ca], U = uv ? [uv[0], uv[1], uv[2], uv[0], uv[2], uv[3]] : null;
    for (let i = 0; i < 6; i++) { const p = P[i], q = C[i]; o.push(p[0], p[1], p[2]); if (kind == 'spr') o.push(U[i][0], U[i][1]); o.push(q[0], q[1], q[2], q[3]); }
  },
  // ---- a reusable buffer of sprite quads, refilled each frame (no allocation) ----
  batch(R, max) { const f = new Float32Array(max * 54); return { f, n: 0, max, m: GLX.mesh(R, 'spr', f, 0, true) }; },
  // a quad of w x h centred on (x, y) at depth z, turned by a (radians), texture rectangle u0, v0, u1, v1, tint t [r, g, b, a]
  bq(B, x, y, z, w, h, a, u0, v0, u1, v1, t) {
    if (B.n >= B.max) return;
    const c = Math.cos(a), s = Math.sin(a), hw = w / 2, hh = h / 2, f = B.f;
    let i = B.n * 54;
    const P = [[-hw, -hh, u0, v1], [hw, -hh, u1, v1], [hw, hh, u1, v0], [-hw, -hh, u0, v1], [hw, hh, u1, v0], [-hw, hh, u0, v0]];
    for (const [px, py, u, v] of P) { f[i++] = x + px * c - py * s; f[i++] = y + px * s + py * c; f[i++] = z; f[i++] = u; f[i++] = v; f[i++] = t[0]; f[i++] = t[1]; f[i++] = t[2]; f[i++] = t[3]; }
    B.n++;
  },
  // draw the quads in the batch with texture tex (o: the draw options, such as cut; reused, not copied)
  bflush(R, B, mvp, tex, o) {
    if (!B.n) return;
    const gl = R.gl, q = o || B.o || (B.o = {});
    gl.bindBuffer(gl.ARRAY_BUFFER, B.m.b); gl.bufferSubData(gl.ARRAY_BUFFER, 0, B.f.subarray(0, B.n * 54));
    B.m.n = B.n * 6;
    q.tex = tex;
    GLX.draw(R, B.m, mvp, q);
    B.n = 0;
  },
  // ---- textures: one per canvas (made again when the canvas object changes) ----
  tex(R, key, cv, rep) {
    const gl = R.gl, old = R.tex.get(key);
    if (old && old.cv === cv && !cv._dirty) return old.t;
    const t = old ? old.t : gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cv); } catch (e) {}
    const w = rep ? gl.REPEAT : gl.CLAMP_TO_EDGE;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, w); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, w);
    cv._dirty = false;
    R.tex.set(key, { t, cv });
    return t;
  },
  // ---- drawing: one mesh with one program; o: {M model matrix (lit), L sun, A ambient, T tint, tex, cut, n vertex count, first} ----
  draw(R, m, mvp, o) {
    if (!m || !m.b) return;
    o = o || GLX.NONE;
    const gl = R.gl, P = R.P[m.kind], u = P.u;
    if (R.cur !== P) { gl.useProgram(P.p); R.cur = P; }
    gl.bindBuffer(gl.ARRAY_BUFFER, m.b);
    let off = 0;
    P.lay.forEach(([, n], i) => { gl.enableVertexAttribArray(i); gl.vertexAttribPointer(i, n, gl.FLOAT, false, P.st, off); off += n * 4; });
    for (let i = P.lay.length; i < 3; i++) gl.disableVertexAttribArray(i);
    gl.uniformMatrix4fv(u.uMVP, false, mvp);
    if (m.kind == 'lit') {
      gl.uniformMatrix4fv(u.uM, false, o.M || R.id);
      const L = o.L || GLX.SUN; gl.uniform3f(u.uL, L[0], L[1], L[2]); gl.uniform1f(u.uA, o.A == null ? .55 : o.A);
      const T = o.T || GLX.ONE; gl.uniform3f(u.uT, T[0], T[1], T[2]);
    } else {
      const T = o.T || GLX.ONE; gl.uniform4f(u.uT, T[0], T[1], T[2], T[3] == null ? 1 : T[3]);
      if (m.kind == 'spr') { gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, o.tex); gl.uniform1i(u.uS, 0); gl.uniform1f(u.uCut, o.cut == null ? .004 : o.cut); }
    }
    gl.drawArrays(gl.TRIANGLES, o.first || 0, o.n == null ? m.n : o.n);
    R.draws++;
  },
  SUN: (() => { const v = [-.42, .74, .52], l = Math.hypot(...v); return v.map(q => q / l); })(),
  ONE: [1, 1, 1, 1],
  NONE: {},
  // ---- matrices ----
  // the side view: eye at (ex, ey, D) looking down -z; the plane z = 0 is drawn at f / D (= sc) pixels a unit with the eye's point at
  // pixel (cx, cy) on a W x H screen of the game's own pixels. Returns a plain array (doubles) to multiply with a model matrix.
  side(W, H, sc, D, ex, ey, cx, cy, near, far, out) {
    const f = sc * D, a = 2 * cx / W - 1, b = 1 - 2 * cy / H, c = -(far + near) / (far - near), d = -2 * far * near / (far - near);
    // rows: [2f/W, 0, -a, -2f/W ex + a D], [0, 2f/H, -b, -2f/H ey + b D], [0, 0, c, -c D + d], [0, 0, -1, D]
    const o = out || new Array(16);
    o[0] = 2 * f / W; o[1] = o[2] = o[3] = o[4] = 0; o[5] = 2 * f / H; o[6] = o[7] = 0; o[8] = -a; o[9] = -b; o[10] = c; o[11] = -1;
    o[12] = -2 * f / W * ex + a * D; o[13] = -2 * f / H * ey + b * D; o[14] = -c * D + d; o[15] = D;
    return o;
  },
  // screen pixels (W x H, y down) at a depth: a flat 2D layer under or over the 3D (sky, clouds)
  screen(W, H, z) { return [2 / W, 0, 0, 0, 0, -2 / H, 0, 0, 0, 0, 0, 0, -1, 1, z == null ? .9999 : z, 1]; },
  // out = a x b (column-major), written into the Float32Array out
  mul(out, a, b) {
    for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) out[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
    return out;
  },
  // a model matrix: translate (x, y, z), turn by a about z, scale s (plain array)
  model(o, x, y, z, a = 0, s = 1) { const c = Math.cos(a) * s, n = Math.sin(a) * s; o[0] = c; o[1] = n; o[2] = 0; o[3] = 0; o[4] = -n; o[5] = c; o[6] = 0; o[7] = 0; o[8] = 0; o[9] = 0; o[10] = s; o[11] = 0; o[12] = x; o[13] = y; o[14] = z; o[15] = 1; return o; },
  // a token colour '#rrggbb' as [r, g, b] in 0..1 (anything else: grey)
  rgb(hex) { if (!/^#[0-9a-f]{6}$/i.test(hex || '')) return [.6, .6, .6]; const n = parseInt(hex.slice(1), 16); return [(n >> 16) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; },
  mix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; },
  mulc(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; },
};
/* ---------- 4x4 Hill Climb (G-HC2: worlds of hand-shaped stages, missions, a garage that matters) ----------
   A side-view drive: two wheels on a stiff bar (Verlet), gas and brake pedals, the car tips in the air.
   Journey: 6 worlds (HCW) of 5 hand-shaped stages each (HC_ST). A stage is a line of pieces (hcParse / hcCourse): flat, slopes,
   hills, rollers, kicker jumps, gaps over water / lava / craters, bridges, fords, rocks, mud / sand / ash / ice, checkpoints,
   bolts, fuel cans, balloons, a hidden star and boost pads; it ends at a finish flag. Each stage has a goal (reach the flag,
   collect N bolts, or deliver crates) and two missions (bolts, time, flips, big air, no restarts, all crates, the hidden star,
   a stop at the lookout):
   1 star for the goal, 1 for each mission, kept for good (S.garage.st {stageId: bits}). A stage opens when the one before is
   finished; a world opens with stars (HC_NEED). The menu's "Next goal" line says what to do next.
   Distance drive (endless, for older children): a long seeded course per world that gets harder, fuel cans further apart,
   the personal best as a flag on the road (S.garage.best).
   Garage: vehicles (VEH) and four upgrades (engine, tyres, suspension, fuel tank; 5 levels) bought with bolts earned by playing.
   Driving help (G-FEEL1, a dial of 4 levels in place of the old Easy driving switch; HC_AS, Grown-ups picks Auto or a level, the
   menu switch turns it on (Auto) or off): levels the car in the air, eases the gas when the nose lifts, softer landings, balloons
   that float the car over gaps, a car tipping over set back on its wheels. A flip or an empty tank restarts at the last checkpoint:
   no lives, nothing lost. G-FEEL1 missions need a decision, never just the gas: the hidden star sits low under a jump (ease off
   before it), the lookout sign wants a stop (brake and wait); time targets come from a careful bot's drive. Colours are tokens
   (hcC: --ill-* roles, --sc-* skies); no shake in calm mode or with reduced motion.
   The simulation (hcNew / hcStep) runs without the page, so tools/test.js drives every stage with bots.
   G-HC3 (R-03 H1-H4, A1-A5): fixed steps that catch up after a slow frame (hcAdvance: no slow motion on a slow tablet); 4 ranges
   behind the road that fade into the sky and a foreground strip; a new distance road every day (hcSeed) and today's drive
   (hcDay: one open world, a twist, a gold flag at 250 m, +30 bolts the first time a day, no streak); a calm music loop per world
   (hcMusic); a buzz on a crash or a flip (hcBuzz); garage level 2 (HC_T2: rims, trails, toppers, open from 30 stars) and a
   "save for" line on the menu (hcSaveLine). */
/* truck sound pack */
const ENG={jeep:[46,'sawtooth',0],buggy:[64,'sawtooth',0],monster:[33,'sawtooth',5],bike:[82,'square',0],tractor:[28,'square',9],bus:[37,'sawtooth',3]};
const hs=()=>S.sound&&(S.hcSnd||0)<2;
const HSND={
  scale:[72,74,76,79,81,84,86,88,91,93],
  coin(H){if(!hs())return;const now=H.t;H.cs=(now-(H.csT||-9)<1.2)?(H.cs||0)+1:0;H.csT=now;const m=this.scale[Math.min(H.cs,9)],w=['triangle','sine','square'][(H.cs/4|0)%3];tone(NOTE(m),.07,0,w,.06);tone(NOTE(m+12),.1,.05,'sine',.04)},
  cp(k){if(!hs())return;const J=[[[72,0],[76,.1],[79,.2],[84,.3]],[[67,0],[72,.12],[79,.24],[76,.36],[84,.48]],[[84,0],[79,.08],[84,.16],[88,.3]],[[60,0],[64,.1],[67,.2],[72,.3],[76,.4],[79,.5]],[[76,0],[74,.1],[76,.2],[81,.32]]];
    J[(k||0)%J.length].forEach(([m,t])=>tone(NOTE(m),.18,t,'triangle',.06));noise(.3,.3,.03,3000,8000)},
  fuel(){if(!hs())return;for(let i=0;i<5;i++)tone(300+i*90,.07,i*.07,'sine',.08,200);tone(900,.15,.38,'triangle',.06)},
  crash(water){if(!hs())return;if(water){SFX.splash&&SFX.splash();return}noise(.35,0,.3,400,1500);tone(160,.25,0,'square',.1,60)},
  land(v){if(!hs())return;tone(80,.18,0,'sine',Math.min(.25,v/2500),35);noise(.12,0,Math.min(.15,v/4000),300,120)},
  trick(mult){if(!hs())return;const b=[72,76,79,84][Math.min(3,mult-1)];[0,4,7,12].forEach((d,i)=>tone(NOTE(b+d),.1,i*.06,'square',.05))},
  shift(){if(!hs())return;tone(220,.05,0,'square',.025,140)},
  balloon(){if(!hs())return;[67,71,74,79].forEach((m,i)=>tone(NOTE(m),.12,i*.07,'sine',.06))},
  star(){if(!hs())return;[79,83,86,91].forEach((m,i)=>tone(NOTE(m),.14,i*.08,'triangle',.07))}};
let HC=null;

/* ---- colours: tokens only. A role ('g', 'g2', 'k', 'w1') is --ill-<hue>[-n]; 'sc-sky' is --sc-sky ---- */
const HC_HUE={r:'red',o:'orange',y:'yellow',g:'green',c:'aqua',b:'blue',v:'purple',p:'pink',n:'brown',t:'tan',s:'skin',m:'cream',e:'grey',w:'white',k:'ink'};
const hcTok=role=>role.startsWith('sc-')?'--'+role:'--ill-'+HC_HUE[role[0]]+(role[1]?'-'+role[1]:'');
let HC_COL={};
function hcC(role){if(HC_COL[role])return HC_COL[role];let v='';try{const cs=getComputedStyle(document.documentElement);v=cs.getPropertyValue?cs.getPropertyValue(hcTok(role)).trim():''}catch(e){}return v?(HC_COL[role]=v):''}
// a token with alpha (canvas): '#RRGGBB' -> 'rgba(r,g,b,a)'
function hcA(role,a){const c=hcC(role);if(!/^#[0-9a-f]{6}$/i.test(c))return c;const n=parseInt(c.slice(1),16);return`rgba(${n>>16},${(n>>8)&255},${n&255},${a})`}

/* ---- worlds and stages ----
   per world: g gravity (px/s^2), soft (the world's soft ground), pit (what a gap holds), sky (two --sc-* tokens), top/top2 (road),
   dirt/dirt2, far/far2/mid (background layers), prop (roadside things), water (the fill of gaps, fords, under bridges) */
const HCW=[
  {id:'meadow',n:'Green Meadow',g:620,soft:'mud',pit:'water',sky:['sc-sky','sc-sky-1'],top:'g',top2:'g2',dirt:'n',dirt2:'n2',far:'e2',far2:'e3',mid:'g1',water:'c',prop:'tree',snowcap:1},
  {id:'desert',n:'Sunny Desert',g:620,soft:'sand',pit:'water',sky:['sc-dusk','sc-sun'],top:'y',top2:'y2',dirt:'o2',dirt2:'o3',far:'o2',far2:'o3',mid:'t',water:'c',prop:'cactus'},
  {id:'jungle',n:'Jungle River',g:620,soft:'mud',pit:'water',sky:['sc-mint','sc-green'],top:'g2',top2:'g3',dirt:'n2',dirt2:'n3',far:'g3',far2:'g2',mid:'g2',water:'c2',prop:'palm'},
  {id:'snow',n:'Snowy Peaks',g:620,soft:'ice',pit:'water',sky:['sc-blue','sc-sky-1'],top:'w',top2:'w2',dirt:'e2',dirt2:'e3',far:'e2',far2:'e3',mid:'w2',water:'b1',prop:'pine',snowcap:1},
  {id:'volcano',n:'Volcano Island',g:620,soft:'ash',pit:'lava',sky:['sc-rose','sc-peach'],top:'e3',top2:'k2',dirt:'k2',dirt2:'k',far:'r3',far2:'k2',mid:'n3',water:'o',prop:'deadtree'},
  {id:'moon',n:'The Moon',g:250,soft:null,pit:'crater',sky:['sc-night','sc-night-1'],top:'e1',top2:'e',dirt:'e2',dirt2:'e3',far:'b3',far2:'k2',mid:'e3',water:'k2',prop:'antenna',space:1},
  {id:'city',n:'Junk City',g:620,soft:'oil',pit:'water',sky:['sc-lilac','sc-candy'],top:'e',top2:'e2',dirt:'e3',dirt2:'k2',far:'v2',far2:'v3',mid:'v3',water:'c',prop:'lamp',dist:1}];
const HC_NEED=[0,4,9,15,22,30]; // stars to open each stage world (the Moon: 30 of 75 before it)
const SOFT={mud:{grip:.38,drag:.996,c:'n3',c2:'n2',label:'MUD'},sand:{grip:.5,drag:.997,c:'y2',c2:'y3',label:'SAND'},ice:{grip:.22,drag:1,c:'c1',c2:'w',label:'ICE'},
  ash:{grip:.45,drag:.996,c:'e3',c2:'e',label:'ASH'},oil:{grip:.24,drag:1,c:'k',c2:'v3',label:'OIL'}};
// a stage: [id, name, goal, missions, weather, pieces]. goal: ['flag'] | ['coins', n] | ['cargo', crates]. missions: [kind, n]:
// bolts n (in one run), time s (reach the flag in s), flips n, air n (big airs), nocrash (no restarts), crates (all crates), star (the hidden star),
// stop (G-FEEL1: stop at the lookout, piece L). A hidden star for the star mission sits low in a dip just past a jump (ease off to drop onto it).
// weather: day | dusk | night | rain | snow | ash | dust. Pieces (metres; 1 m = 20 px), see hcCourse.
const HC_ST=[
  [['m1','First Hills',['flag'],[['bolts',20],['stop']],'day','f12 $5 h30,2.5 f6 $6 h36,3.5 L6 f8 c w48,1,4 $8 f6 F h44,4.5 $5 f8 h30,2 $4 f12'],
   ['m2','Muddy Puddles',['flag'],[['time',19],['stop']],'day','f12 m18 $5 f22 h40,4 c f6 m26 v34,2 $6 f10 u22,4 $5 L5 f12 d26,4 m18 $5 f20 F w42,1.2,3 $6 f12'],
   ['m3','Over the Pond',['flag'],[['star'],['nocrash']],'day','f12 $5 h30,3 f8 b26 $8 f10 c o16 $4 f12 A f2 p4 $4 f10 h40,5 $6 f6 k2.5 d3,1.5 S0.5 d2,1 f1 u5,2.5 f9 $5 f12'],
   ['m4','Farm Delivery',['cargo',3],[['crates'],['stop']],'dusk','f14 $5 h40,3 f10 c w44,1,3 $6 f10 b22 $5 f8 h44,4 c F L6 f12 v36,2.5 $6 f12 u22,3 $5 f16'],
   ['m5','Rolling Rollers',['coins',30],[['air',1],['star']],'day','f12 $8 w60,1.6,4 $8 c f8 k2.5 d3,1.5 S0.5 d2,1 f1 u5,2.5 $5 f5 w60,2,4 $8 F f8 c h50,5 $6 f6 A f2 p5 $5 f12 w50,1.4,4 $8 f12']],
  [['d1','Dune Sea',['flag'],[['bolts',25],['stop']],'day','f12 m30 $5 h50,5 $6 f8 h60,6 c m22 $6 f8 w60,2,3 F $6 h50,5 $5 L5 f8 m20 h40,4 $5 f14'],
   ['d2','Cactus Canyon',['flag'],[['time',18],['star']],'day','f12 r3 f10 $5 u26,5 f10 r2 $4 d26,5 c $6 f8 k3 d3,1.5 S0.5 d2,1 f1 u5,2.5 f5 r4 F $6 h44,4 f10 r2 $5 f14'],
   ['d3','Oasis Jumps',['flag'],[['stop'],['air',1]],'dust','f6 L5 f6 $5 h32,3 f8 A f2 p5 $4 f12 c o18 $5 f12 k4.5 $5 f18 A f2 p6 $4 f12 c F $6 h50,5 f8 A f2 p4 $4 f14'],
   ['d4','Camel Post',['cargo',2],[['crates'],['stop']],'dusk','f14 m16 $5 h44,4 f10 c w50,1.4,3 $6 f8 r2 f10 b24 $5 c F h56,5 $6 L6 f10 m20 v40,3 $5 f16'],
   ['d5','Starry Dunes',['coins',30],[['perfect',1],['star']],'night','f12 $6 h46,4 $6 f8 w56,1.8,3 $8 c k3 d3,1.5 S0.5 d2,1 f1 u5,2.5 $5 f7 h60,6 $6 F f10 c w60,2,4 $8 f8 A f2 p5 $5 f10 h40,4 $6 f14']],
  [['j1','River Fords',['flag'],[['stop'],['time',18]],'day','f12 $5 o14 f10 h40,4 $6 c o20 $5 f10 m20 h36,3.5 $5 f8 F o16 $5 L5 f10 w44,1.4,3 $6 f14'],
   ['j2','Log Bridges',['flag'],[['star'],['nocrash']],'rain','f12 $5 b20 f10 h40,4 c $6 b30 $6 f10 A f2 p5 $4 f40 k3.5 d3,1.5 S0.5 d2,1 f1 u5,2.5 f7 c F b24 $6 f10 h44,4.5 $5 f14'],
   ['j3','Monkey Hills',['coins',30],[['air',1],['star']],'day','f12 $8 w70,2.4,4 $8 f8 c h60,7 $6 f8 F w70,2.6,4 $8 c k3.5 d3,1.5 S0.5 d2,1 f1 u5,2.5 $5 f7 w60,2,4 $8 f14'],
   ['j4','Banana Run',['cargo',3],[['crates'],['stop']],'dusk','f14 $5 m16 h40,3.5 f10 c o16 $5 f10 w50,1.2,4 $6 c F b26 $5 f10 u24,4 m14 $5 L5 f10 d24,4 f16'],
   ['j5','Waterfall Climb',['flag'],[['stop'],['star']],'rain','f12 $5 u30,6 f8 $5 u30,6 f6 c F $6 h40,4 f8 A f2 p6 $4 f12 c u34,7 $5 f10 k3 S5 f20 d40,8 $6 L5 f8 o16 $5 f14']],
  [['s1','Icy Slopes',['flag'],[['bolts',22],['stop']],'snow','f12 i14 $5 h40,4 f10 i20 $6 f10 c w50,1.2,3 $6 i16 f10 F h44,4.5 $5 L5 f8 i22 $5 f14'],
   ['s2','Frozen Lake',['flag'],[['time',17],['star']],'day','f12 $5 i40 f40 c $6 h40,4 f8 A f2 p5 $4 f10 i30 F f30 $6 c k3 d3,1.5 S0.5 d2,1 f1 u5,2.5 f7 i20 h36,3 $5 f14'],
   ['s3','Snowball Jumps',['coins',30],[['star'],['air',2]],'day','f12 $5 k3.5 $5 f18 k4 $5 f20 c h44,4 F $6 k4.5 d3,1.5 S0.5 d2,1 f1 u5,2.5 $6 f13 c w50,1.6,3 $8 k4 $5 f18 h40,4 $6 f14'],
   ['s4','Mountain Post',['cargo',3],[['crates'],['stop']],'snow','f14 $5 u30,5 f10 i14 $5 c h40,4 f10 F w44,1.2,3 $6 c b24 $5 u30,5 L5 f10 i16 d30,5 $6 f16'],
   ['s5','Northern Lights',['flag'],[['nocrash'],['star']],'night','f12 $5 h44,4 i16 f10 c $6 o14 f10 A f2 p5 $4 f12 F w50,1.6,3 $6 c k3 d3,1.5 S0.5 d2,1 f1 u5,2.5 f7 i20 h50,5 $6 f14']],
  [['v1','Ash Road',['flag'],[['stop'],['time',17]],'ash','f12 m20 $5 h44,4.5 f8 r3 $5 c m24 $6 w50,1.6,3 F f8 h50,5 $5 r2 f10 m20 $5 L5 f14'],
   ['v2','Lava Leaps',['flag'],[['nocrash'],['star']],'day','f12 $5 h30,3 f8 A f2 p5 $4 f12 c $5 h40,4 A f2 p6 $4 f40 F c k3 d3,1.5 S0.5 d2,1 f1 u5,2.5 f7 A f2 p5 $4 f10 h40,4 $5 f14'],
   ['v3','Rumble Rocks',['coins',28],[['air',1],['stop']],'day','f12 r4 $5 f8 h40,4 $6 c r3 f10 k3 $5 f16 F r4 $6 c w60,2,4 $8 L5 f8 r3 $5 f14'],
   ['v4','Hot Delivery',['cargo',2],[['crates'],['stop']],'dusk','f14 $5 m16 h44,4 f10 c b26 $5 f8 r2 F f10 u30,5 $5 c d30,5 m18 L5 f10 b20 $5 f16'],
   ['v5','Crater Rim',['flag'],[['star'],['nocrash']],'ash','f12 $5 u36,7 f8 $5 h40,4 c F A f2 p6 $4 f12 u40,8 $6 f8 k3.5 d3,1.5 S0.5 d2,1 f1 u5,2.5 f9 c d40,8 r3 $5 F w50,1.8,3 $6 f14']],
  [['o1','Moon Walk',['flag'],[['bolts',18],['stop']],'day','f12 $5 h50,4 $5 f10 w60,2,3 $6 c F h60,6 $6 L5 f10 r3 $5 f14'],
   ['o2','Crater Hops',['flag'],[['time',19],['star']],'day','f12 $5 f6 p6 $4 f14 c h50,5 $5 p7 $4 f30 F c k3 f1 d3,1.5 S0.5 d2,1 f1 u5,2.5 f12 p6 $4 f14'],
   ['o3','Space Rocks',['coins',25],[['air',2],['stop']],'day','f6 L5 f6 r3 $5 f10 k3 $6 f24 c w70,2.4,3 $8 F r4 $5 c k4 $6 f26 h60,6 $6 f14'],
   ['o4','Moon Base Post',['cargo',3],[['crates'],['stop']],'day','f14 $5 h50,4 L5 f10 c p6 $4 f14 r3 F $5 c w60,2,3 $6 f10 p5 $4 f16'],
   ['o5','Earthrise',['flag'],[['star'],['time',27]],'day','f12 $5 k3 $5 f22 c h60,7 $6 p7 $4 f14 F c u40,7 $5 k4 f1 d3,1.5 S0.5 d2,1 f1 u5,2.5 f14 c d40,7 p6 $4 f10 w50,2,3 $6 f14']]];
const HC_SPW=5; // stages per world
const hcStage=id=>{for(let w=0;w<HC_ST.length;w++){const i=HC_ST[w].findIndex(s=>s[0]==id);if(i>=0)return{w,i,s:HC_ST[w][i]}}return null};

/* ---- vehicles, upgrades, paint ---- */
const VEH={jeep:{n:'Trail Truck',cost:0,R:20,L:74,acc:1,maxV:1,grip:1,lift:1,d:'All-around starter'},
  buggy:{n:'Dune Buggy',cost:250,R:17,L:70,acc:1.18,maxV:1.22,grip:.92,lift:1.2,d:'Super fast, tips up easily'},
  monster:{n:'Monster Truck',cost:500,R:27,L:84,acc:.96,maxV:.95,grip:1.3,lift:.82,d:'Huge tyres that climb anything'},
  bike:{n:'Dirt Bike',cost:350,R:18,L:58,acc:1.3,maxV:1.18,grip:.95,lift:1.55,d:'Wheelie machine, flips easily'},
  tractor:{n:'Tractor',cost:300,R:25,L:72,acc:.9,maxV:.78,grip:1.65,lift:.7,d:'Slow, but climbs walls'},
  bus:{n:'School Bus',cost:450,R:21,L:112,acc:.86,maxV:.92,grip:1.1,lift:.5,d:'Long and steady, hard to flip'}};
// [id, name, icon, what it does]
const UPG=[['engine','Engine','bolt','More speed and power'],['tires','Tyres','circle','Grip on hills, mud, sand and ice'],['susp','Suspension','wave','Softer landings: crates stay on, fewer bounces'],['tank','Fuel tank','drop','Drive farther on one tank']];
const UPCOST=[30,60,110,180,280];
// paint: [role, name, bolts]; old saves keep their colour (HC_OLDPAINT maps the old raw colours to roles)
const PAINTS=[['r','Red',0],['b','Blue',20],['g','Green',20],['o','Orange',20],['p','Pink',30],['v','Purple',30],['k2','Black',40],['y','Gold',60]];
// G-HC3 (R-03 A2): garage level 2, shown with its prices from the start and open from HC_T2_NEED stars: rims, trails behind the
// car and toppers on a pole. Fixed prices, nothing random, nothing that drives better (looks only). [id, kind, name, bolts]
const HC_T2=[['gold','rim','Gold rims',250],['spoke','rim','Spoke rims',400],['starrim','rim','Star rims',550],['rainbow','rim','Rainbow rims',700],
  ['sparkle','trail','Sparkle trail',350],['bubble','trail','Bubble trail',500],['confetti','trail','Confetti trail',700],['rainbowt','trail','Rainbow trail',900],
  ['pennant','top','Pennant',300],['checker','top','Checkered flag',450],['goldstar','top','Gold star',600],['sock','top','Wind sock',800]];
const HC_T2K=['rim','trail','top'],HC_T2N={rim:'Rims',trail:'Trails',top:'Toppers'},HC_T2_NEED=30;
const HC_OLDPAINT={ef4444:'r','3b82f6':'b','22c55e':'g',f59e0b:'o',ec4899:'p',a855f7:'v','111827':'k2',facc15:'y'};
// the numbers an upgrade sets (also used by the garage lines and tools/test.js)
function hcSpec(vk,up){const V=VEH[vk]||VEH.jeep,u=Object.assign({engine:0,tires:0,susp:0,tank:0},up);
  return{R:V.R,L:V.L,acc:(820+u.engine*150)*V.acc,maxV:(420+u.engine*75)*V.maxV,grip:(.9+u.tires*.12)*V.grip,tireUp:u.tires,lift:(5+u.engine*.12)*V.lift,
    susp:u.susp,drop:640+u.susp*110,tankSec:17+u.tank*9}}

/* ---- the save: S.garage (by id with defaults; old saves keep bolts, bests, vehicles, upgrades, paint) ---- */
const HC_OLDNEED={desert:300,snow:600,jungle:450,volcano:750,city:1050,moon:900}; // the old free-drive unlocks (kept: nothing that was open closes)
function garageS(){const g=S.garage||(S.garage={});
  if(!(g.bolts>=0))g.bolts=Math.max(0,Math.floor(+g.bolts||0));
  if(!g.up||typeof g.up!='object')g.up={};for(const [k] of UPG)g.up[k]=Math.max(0,Math.min(5,Math.floor(+g.up[k]||0)));
  if(!g.best||typeof g.best!='object')g.best={};for(const W of HCW)g.best[W.id]=Math.max(0,Math.floor(+g.best[W.id]||0));
  if(!g.vehs||typeof g.vehs!='object')g.vehs={};g.vehs.jeep=1;if(!VEH[g.veh]||!g.vehs[g.veh])g.veh='jeep';
  if(typeof g.paint=='string'&&g.paint[0]=='#')g.paint=HC_OLDPAINT[g.paint.slice(1).toLowerCase()]||'r';
  if(!g.paints||typeof g.paints!='object')g.paints={};
  for(const k of Object.keys(g.paints))if(k[0]=='#'){const r=HC_OLDPAINT[k.slice(1).toLowerCase()];if(r)g.paints[r]=1;delete g.paints[k]}
  g.paints.r=1;if(!PAINTS.some(p=>p[0]==g.paint)||!g.paints[g.paint])g.paint='r';
  if(!g.st||typeof g.st!='object')g.st={};for(const k of Object.keys(g.st)){const v=Math.floor(+g.st[k]||0)&7;if(!hcStage(k)||!v)delete g.st[k];else g.st[k]=v}
  // old missions (v155 and before): a mission done but not claimed pays its bolts once; missions are per stage now
  if(Array.isArray(g.missions)){for(const m of g.missions)if(m&&m.done&&m.r>0)g.bolts+=Math.floor(m.r);g.missions=[]}
  if(g.easy!==true&&g.easy!==false)delete g.easy;
  // G-FEEL1: driving help ('auto' or 0-3), Auto's step up (0-3) and the struggle count on one stage
  if(g.as!=='auto'&&!(g.as===0||g.as===1||g.as===2||g.as===3))delete g.as;
  if(g.asu!=null&&!(g.asu===1||g.asu===2||g.asu===3))delete g.asu;
  if(g.asf!=null&&!(g.asf&&typeof g.asf=='object'&&hcStage(g.asf.s)&&g.asf.n>=1&&g.asf.n<HC_AS_RS&&Number.isInteger(g.asf.n)))delete g.asf;
  // G-HC3: garage level 2 (own2 {itemId: 1}; rim, trail, top: the item in use or '') and day (the date today's drive paid its bonus)
  if(!g.own2||typeof g.own2!='object'||Array.isArray(g.own2))g.own2={};
  for(const k of Object.keys(g.own2))if(!HC_T2.some(t=>t[0]==k))delete g.own2[k];
  for(const kind of HC_T2K){const v=g[kind];if(typeof v!='string'||(v&&!(g.own2[v]&&HC_T2.some(t=>t[0]==v&&t[1]==kind))))g[kind]=''}
  if(typeof g.day!='string')delete g.day;
  return g}
const hcBits=n=>(n&1)+(n>>1&1)+(n>>2&1);
const hcStars=id=>hcBits((garageS().st[id])||0);
const hcWStars=w=>HC_ST[w].reduce((a,s)=>a+hcStars(s[0]),0);
const hcTot=()=>HC_ST.reduce((a,_,w)=>a+hcWStars(w),0);
const hcMax=()=>HC_ST.length*HC_SPW*3;
// a world was open in an old save: old level stars there, or its old free-drive distance reached
function hcOldOpen(id){const g=garageS(),lv=g.lv&&g.lv[id];if(Array.isArray(lv)&&lv.some(v=>v>0))return true;const n=HC_OLDNEED[id];return n?Math.max(0,...HCW.map(W=>g.best[W.id]||0))>=n:false}
function hcWOpen(w){if(w==0)return true;const W=HCW[w];if(!W)return false;if(W.dist)return hcWOpen(4);return hcTot()>=HC_NEED[w]||hcOldOpen(W.id)||HC_ST[w].some(s=>hcStars(s[0])>0)}
function hcSOpen(w,i){return hcWOpen(w)&&(i==0||hcStars(HC_ST[w][i-1][0])>0||hcStars(HC_ST[w][i][0])>0)}
/* ---- G-FEEL1: driving help, a dial of 4 levels (HC_AS) in place of the old Easy driving switch. 3 is the old Easy driving, 0 the
   old Easy off. Per level: air (how hard the pedals spin the car in the air), lift (how hard the gas lifts the nose), lvl (the
   car turns itself level in the air; free: more of that while no pedal is held, so Little help rewards letting go in the air),
   wh (a wheelie is eased down), tc (traction control: the gas eases when the nose lifts), soft (crates stay on after a harder
   landing, px/s), ball (balloons float the car over gaps), save (a car tipping onto its back or side, not its roof, is set back
   on its wheels, this many times between checkpoints; not a restart).
   The grown-ups choice (S.garage.as): 'auto' (the default) or a fixed level. Old saves: Easy driving on is Most help (3), off is No
   help (0), never set is Auto (hcAsPick; the old easy field is kept as it was). Auto starts from the grade (hcAsBase), steps down by
   one for each world with HC_AS_DOWN stars or more, and steps up by one (S.garage.asu, at most 3) after HC_AS_CR crashes between two
   checkpoints in a drive or after HC_AS_RS struggling drives in a row on a stage (quit without the flag, or 3 crashes or more,
   S.garage.asf {s: stage id, n}); a clean win (at most one restart) steps it back down by one. ---- */
const HC_AS=[{air:1,lift:1,lvl:0,free:0,wh:0,tc:0,soft:0,ball:0,save:0},
  {air:1,lift:1,lvl:0,free:.07,wh:0,tc:0,soft:60,ball:0,save:1},
  {air:.7,lift:.85,lvl:.02,free:.05,wh:.01,tc:.5,soft:130,ball:1,save:1},
  {air:.35,lift:.6,lvl:.07,free:0,wh:.02,tc:1,soft:200,ball:1,save:1}];
const HC_AS_DOWN=9,HC_AS_CR=3,HC_AS_RS=2;
const hcAsN=v=>Math.max(0,Math.min(3,Math.round(+v||0)));
// the grown-ups choice: 'auto' or 0-3
const hcAsPick=()=>{const g=garageS();return g.as!=null?g.as:g.easy===true?3:g.easy===false?0:'auto'};
// Auto's start: Most help for Pre-K to 2nd grade, Little help for 3rd, none from 4th
const hcAsBase=()=>{const gr=S.grade==null?0:+S.grade;return gr<=2?3:gr==3?1:0};
const hcAsAuto=()=>hcAsN(hcAsBase()-HC_ST.reduce((a,_,w)=>a+(hcWStars(w)>=HC_AS_DOWN),0)+(garageS().asu||0));
const hcAsLevel=()=>{const p=hcAsPick();return p=='auto'?hcAsAuto():p};
// any help on (the menu's switch; the old name kept)
const hcEasy=()=>hcAsLevel()>0;
// after a stage drive (won or quit): Auto's step up after struggling drives in a row on one stage, or down after a clean win; the
// help a drive took on by itself (H.asUp) is kept too. Returns the new step (S.garage.asu).
function hcAsNote(H){const g=garageS();if(!H.st)return g.asu||0;const id=H.st[0],win=H.result=='win';
  let u=(g.asu||0)+(H.asUp||0);
  if(!win||H.crashes>=3){const n=g.asf&&g.asf.s==id?g.asf.n+1:1;if(n>=HC_AS_RS){u++;delete g.asf}else g.asf={s:id,n}}
  else{delete g.asf;if(H.crashes<=1&&!H.asUp)u--}
  if(H.auto){u=Math.max(0,Math.min(3,u));if(u)g.asu=u;else delete g.asu}else delete g.asf;
  return g.asu||0}
// the next thing to do: {w, i (stage or null), t (the line)}
function hcNextGoal(){
  for(let w=0;w<HC_ST.length;w++){if(!hcWOpen(w))continue;for(let i=0;i<HC_SPW;i++){const s=HC_ST[w][i];if(!hcStars(s[0]))return{w,i,t:`Finish ${s[1]} (${HCW[w].n}, stage ${i+1}): ${hcGoalText(s)}.`}}}
  const nw=HCW.findIndex((W,w)=>w<HC_ST.length&&!hcWOpen(w));
  const miss=()=>{for(let w=0;w<HC_ST.length;w++)if(hcWOpen(w))for(let i=0;i<HC_SPW;i++){const s=HC_ST[w][i],b=garageS().st[s[0]]||0;for(let k=0;k<2;k++)if(!(b>>(k+1)&1))return{w,i,s,k}}return null};
  const m=miss();
  if(nw>0){const need=HC_NEED[nw]-hcTot();return{w:m?m.w:0,i:m?m.i:null,t:`Win ${need} more star${need==1?'':'s'} to open ${HCW[nw].n}.`+(m?` Try this one: ${hcMisText(m.s[3][m.k])} on ${m.s[1]}.`:'')}}
  if(m)return{w:m.w,i:m.i,t:`Win every star: ${hcMisText(m.s[3][m.k])} on ${m.s[1]}.`};
  return{w:0,i:null,t:`Every star won! Try a distance drive and beat your best.`}}
const hcGoalText=s=>s[2][0]=='coins'?`collect ${s[2][1]} bolts and reach the flag`:s[2][0]=='cargo'?`carry ${s[2][1]} crates to the flag`:'reach the flag';
const hcMisText=m=>({bolts:`collect ${m[1]} bolts`,time:`reach the flag in ${m[1]} seconds`,flips:m[1]>1?`do ${m[1]} flips`:'do a flip',air:m[1]>1?`get big air ${m[1]} times`:'get big air',perfect:m[1]>1?`land ${m[1]} jumps on both wheels`:'land a jump on both wheels',
  nocrash:'finish with no restarts',crates:'keep every crate on',star:'find the hidden star',stop:'stop at the lookout sign'})[m[0]]||'';
const HC_MIC={bolts:'nut',time:'timer',flips:'rotate',air:'arrow-up',perfect:'check-circle',nocrash:'heart',crates:'gift',star:'star',stop:'eye'};
const HC_GIC={flag:'go',coins:'nut',cargo:'gift'};
// G-HC3 (R-03 A2): garage level 2 opens with stars; the next thing to save for (the cheapest thing not bought yet: a vehicle, an
// upgrade level, paint, then level 2), {name, cost} or {lock: true} when only the closed level 2 is left, or null when all is bought
const hcT2Open=()=>hcTot()>=HC_T2_NEED;
function hcSaveFor(){const g=garageS(),all=[];
  for(const [k,V] of Object.entries(VEH))if(!g.vehs[k])all.push({name:'the '+V.n,cost:V.cost});
  for(const [k,n] of UPG)if(g.up[k]<5)all.push({name:`${n} level ${g.up[k]+1}`,cost:UPCOST[g.up[k]]});
  for(const [c,n,cost] of PAINTS)if(!g.paints[c])all.push({name:n+' paint',cost});
  const t2=hcT2Open();if(t2)for(const [id,,n,cost] of HC_T2)if(!g.own2[id])all.push({name:n,cost});
  if(!all.length)return t2?null:{lock:true};
  return all.sort((a,b)=>a.cost-b.cost)[0]}
function hcSaveLine(){const s=hcSaveFor(),b=garageS().bolts;
  if(!s)return'Everything in the garage is yours!';
  if(s.lock)return`Garage level 2 opens at ${HC_T2_NEED} stars: rims, trails and toppers (you have ${hcTot()}).`;
  return b>=s.cost?`You can buy ${s.name} in the garage now (${s.cost} bolts)!`:`Save for ${s.name}: ${s.cost} bolts, ${s.cost-b} more to go.`}

/* ---- G-HC3 (R-03 H4, A5): today's drive and the daily road. From the date (the same all day, another tomorrow): the distance
   drives get a new road each day (a seed from the date), and today's drive is one open world with a twist and a gold flag to
   reach; the first time it is reached each day it pays HC_DAY_BONUS bolts. A missed day loses nothing; there is no streak.
   The stages stay exactly as they are. */
const HC_DAY_BONUS=30,HC_DAY_M=250;
// twists: [id, label, weather or null]; float = low gravity, jumps = more ramps and gaps, bolts = twice the bolts, fuel = more cans
const HC_TW=[['jumps','Jump day: more ramps and gaps',null],['bolts','Bolt rain: twice the bolts on the road',null],['float','Floaty day: the car is light as a feather',null],
  ['fuel','Fuel party: lots of fuel cans',null],['night','A night drive with headlights','night'],['rain','A drive in the rain','rain'],['dusk','A sunset drive','dusk']];
const hcHash=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619)>>>0;return h};
// the daily road's seed for a world (1 .. 999983)
const hcSeed=(wi,key=today())=>hcHash('hillroad'+key+'/'+wi)%999983+1;
// today's drive: {key, wi, tw (twist id), label, wx, seed, goal (metres), done (bonus paid today)}
function hcDay(key=today()){const h=hcHash('hillday'+key),open=HCW.map((_,w)=>w).filter(w=>hcWOpen(w)),wi=open[h%open.length],W=HCW[wi];
  let t=HC_TW[(h>>>8)%HC_TW.length];
  // weathers that fit the world: no night or rain on the Moon (it is always night there), dust in the desert, ash on the volcano
  if(W.space&&t[2])t=HC_TW[0];
  let wx=t[2],label=t[1];
  if(wx=='rain'&&W.id=='desert'){wx='dust';label='A drive in a dust storm'}else if(wx=='rain'&&W.id=='volcano'){wx='ash';label='A drive in falling ash'}else if(wx=='rain'&&W.id=='snow'){wx='snow';label='A drive in the snow'}
  return{key,wi,tw:t[0],label,wx,seed:hcSeed(wi,key),goal:HC_DAY_M,done:garageS().day===key}}
// pays the bonus once a day when the run reached the gold flag; returns the bolts paid (0 or HC_DAY_BONUS)
function hcDayPay(H){const g=garageS();if(!H.day||!H.dayHit||g.day===H.day.key)return 0;g.day=H.day.key;g.bolts+=HC_DAY_BONUS;return HC_DAY_BONUS}

/* ---- G-HC3 (R-03 A1): music while driving, a calm loop per world made with tone() (the Sky Hop and Star Rally way): only with
   Sound effects and Music on and the truck sounds not off, never in Calm mode; it waits while the drive waits (paused, the
   Pause sheet, hidden, over) and goes quiet under the voice (the shared duck). [melody (MIDI, 0 a rest), bass, step in s] */
const HC_TUNE={
  meadow:[[67,71,74,71,72,0,71,0,69,71,72,74,71,0,67,0],[43,48,50,48],.28],
  desert:[[69,0,72,74,76,74,72,0,69,72,74,0,72,69,67,0],[45,50,52,50],.3],
  jungle:[[64,67,69,0,71,69,67,64,0,67,69,71,72,0,71,0],[40,45,47,45],.26],
  snow:[[76,79,81,0,79,76,74,0,72,74,76,0,74,72,71,0],[48,43,45,43],.32],
  volcano:[[62,65,67,0,69,67,65,62,0,60,62,65,67,0,65,0],[38,41,43,41],.3],
  moon:[[72,0,79,0,76,0,74,72,0,67,0,72,74,0,76,0],[48,43,41,43],.36],
  city:[[69,72,0,74,76,0,74,72,69,0,67,69,72,0,74,0],[45,41,43,45],.25]};
const hcMusicOn=H=>!!(H&&S.sound&&S.music&&!S.calm&&(S.hcSnd||0)<2&&!H.paused&&!H.over&&!(typeof GH!='undefined'&&GH.held)&&!(typeof document!='undefined'&&document.hidden));
function hcMusic(H){const a=typeof AC!='undefined'&&AC;
  if(!hcMusicOn(H)||!a||a.state!='running'){H.mb=0;return}
  const [mel,bass,step]=HC_TUNE[H.w]||HC_TUNE.meadow;
  if(!H.mb||H.mb<a.currentTime)H.mb=a.currentTime+.05;
  while(H.mb<a.currentTime+.15){const i=H.mi=((H.mi||0)+1)%64,n=mel[i%16],t=H.mb-a.currentTime;
    if(n)tone(NOTE(n+(i>=32&&i%4==2?12:0)),step*1.5,t,'triangle',.022);
    if(i%4==0)tone(NOTE(bass[(i>>2)%4]),step*3.6,t,'sine',.032);
    H.mb+=step}}

/* ---- courses: a stage's pieces (or a seeded endless line of them) as heights every 10 px and lists of things ----
   f L flat | u L,H up (eased) | d L,H down | h L,H hill | v L,H dip | w L,H,N rollers | k H kicker jump | p W gap (with its lip)
   b W bridge | o W ford (shallow water) | r N rocks | m L soft ground (the world's mud, sand, ash) | i L ice (m and i do not move on)
   c checkpoint | $N bolts | F fuel can | A balloon (driving help) | S H the hidden star H m up | > boost pad | L W the lookout, a stop
   zone W m long on the road ahead (G-FEEL1: the stop mission). The finish follows the last piece. */
const HC_PX=20,HC_CC={};
function rng(seed){return()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646}}
const hcParse=s=>s.trim().split(/\s+/).map(t=>{const m=t.match(/^([a-zA-Z$>])([\d.,]*)$/);return m?[m[1],...(m[2]?m[2].split(',').map(Number):[])]:null}).filter(Boolean);
function hcCourse(st,wi,endless,ekey){const key=endless?ekey||'E'+wi:st[0];if(HC_CC[key])return HC_CC[key];
  const W=HCW[wi],h=[0],C={key,w:wi,pits:[],fords:[],bridges:[],soft:[],rocks:[],kicks:[],cps:[60],coins:[],fuel:[],balloons:[],stars:[],pads:[],looks:[],fin:null};let y=0;
  const X=()=>(h.length-1)*10,add=(n,f)=>{const y0=y;for(let i=1;i<=n;i++){y=f(i/n,y0);h.push(y)}y=h[h.length-1]};
  const cosE=t=>(1-Math.cos(Math.PI*t))/2;
  for(const [k,a=0,b=0,c=1] of hcParse(endless||st[5])){const n=Math.max(1,Math.round(a*2)),H=b*HC_PX;
    if(k=='f')add(n,(t,y0)=>y0);
    else if(k=='u')add(n,(t,y0)=>y0+H*cosE(t));
    else if(k=='d')add(n,(t,y0)=>y0-H*cosE(t));
    else if(k=='h')add(n,(t,y0)=>y0+H*(1-Math.cos(2*Math.PI*t))/2);
    else if(k=='v')add(n,(t,y0)=>y0-H*(1-Math.cos(2*Math.PI*t))/2);
    else if(k=='w')add(n,(t,y0)=>y0+H*(1-Math.cos(2*Math.PI*c*t))/2);
    else if(k=='k'){const y0=y,Hk=a*HC_PX;add(Math.round((a*2.4+2)*2),t=>y0+Hk*t*t);const x0=X();add(3,t=>y0+Hk*(1-t));C.kicks.push({x0,x1:X()});y=y0;h[h.length-1]=y0}
    else if(k=='p'){const y0=y,D=W.pit=='crater'?190:150;add(16,t=>y0+64*(t*t+t)/2);const x0=X();add(Math.max(2,Math.round(a*2)),()=>y0-D);
      C.pits.push({x0,x1:X(),y:y0,d:D});h[h.length-1]=y0-D;y=y0;add(1,()=>y0);add(6,()=>y0)}
    else if(k=='b'){const x0=X();add(n,(t,y0)=>y0);C.bridges.push({x0,x1:X(),y})}
    else if(k=='o'){const x0=X(),L=a;add(n,(t,y0)=>y0-24*Math.min(1,cosE(Math.min(1,t*L/2.5)),cosE(Math.min(1,(1-t)*L/2.5))));C.fords.push({x0,x1:X(),y:y-7})}
    else if(k=='r'){for(let i=0;i<a;i++){const x0=X(),Hr=(.75+.3*((i*7+h.length)%3))*HC_PX;add(5,(t,y0)=>y0+Hr*Math.sin(Math.PI*t));C.rocks.push({x0,x1:X(),h:Hr,y});add(4,(t,y0)=>y0)}}
    else if(k=='m'||k=='i')C.soft.push({x0:X(),x1:X()+a*HC_PX,k:k=='i'?'ice':W.soft||'mud'});
    else if(k=='c')C.cps.push(X());
    else if(k=='$')for(let j=0;j<a;j++)C.coins.push({x:X()+j*32});
    else if(k=='F')C.fuel.push(X());
    else if(k=='A')C.balloons.push(X());
    else if(k=='S')C.stars.push({x:X(),hm:a});
    else if(k=='>')C.pads.push(X())
    else if(k=='L')C.looks.push({x0:X(),x1:X()+(a||5)*HC_PX})}
  if(!endless){C.fin=X();add(80,(t,y0)=>y0)}
  C.n=h.length;C.h=Float32Array.from(h);
  // per sample: 1 gap, 2 ford, 4 bridge; soft kind index into HC_SK (0 none)
  C.fl=new Uint8Array(C.n);C.sk=new Uint8Array(C.n);
  const mark=(list,bit)=>{for(const f of list)for(let i=Math.max(0,Math.floor(f.x0/10));i<=Math.min(C.n-1,Math.ceil(f.x1/10));i++)C.fl[i]|=bit};
  mark(C.pits,1);mark(C.fords,2);mark(C.bridges,4);
  for(const s of C.soft)for(let i=Math.max(0,Math.floor(s.x0/10));i<=Math.min(C.n-1,Math.ceil(s.x1/10));i++)if(!(C.fl[i]&1))C.sk[i]=HC_SK.indexOf(s.k);
  for(const o of C.coins){const p=C.pits.find(q=>o.x>=q.x0-40&&o.x<=q.x1+40);o.y=p?p.y+70+50*Math.sin(Math.PI*Math.max(0,Math.min(1,(o.x-p.x0+40)/(p.x1-p.x0+80)))):hcH(C,o.x)+44}
  for(const s of C.stars)s.y=hcH(C,s.x)+s.hm*HC_PX;
  C.coins.sort((a,b)=>a.x-b.x);
  return HC_CC[key]=C}
const HC_SK=['','mud','sand','ice','ash','oil'];
function hcH(C,x){const i=x/10;if(i<=0)return C.h[0];if(i>=C.n-1)return C.h[C.n-1];const i0=Math.floor(i),f=i-i0;return C.h[i0]+(C.h[i0+1]-C.h[i0])*f}
const hcIx=(C,x)=>Math.max(0,Math.min(C.n-1,Math.round(x/10)));
const hcSlope=(C,x)=>Math.atan((hcH(C,x+20)-hcH(C,x-20))/40);
// the ground to land on (a gap counts as its banks): the car in the air turns to match this
const hcHL=(C,x)=>{const p=C.fl[hcIx(C,x)]&1?C.pits.find(q=>x>=q.x0-10&&x<=q.x1+10):null;if(!p)return hcH(C,x);const a=hcH(C,p.x0-10),u=Math.max(0,Math.min(1,(x-p.x0+10)/(p.x1-p.x0+20)));return a+(p.y-a)*u};
const hcSlopeL=(C,x,d=40)=>Math.atan((hcHL(C,x+d)-hcHL(C,x-d))/(2*d));
const hcPitAt=(C,x)=>C.fl[hcIx(C,x)]&1?C.pits.find(p=>x>=p.x0-10&&x<=p.x1+10):null;
const hcFordAt=(C,x)=>C.fl[hcIx(C,x)]&2?C.fords.find(p=>x>=p.x0&&x<=p.x1):null;
const hcSoftAt=(C,x)=>{const k=C.sk[hcIx(C,x)];return k?SOFT[HC_SK[k]]:null};
// the distance drive: 4 km of seeded pieces per world, harder as it goes, fuel cans further apart, a checkpoint every 100 m
// seed: 0 the old fixed road, else the day's road (hcSeed); tw: today's twist (jumps: more ramps and gaps, bolts: twice the bolts,
// fuel: cans closer together); the same seed and twist always build the same road
function hcEndless(wi,seed=0,tw=''){const key='E'+wi+(seed||tw?'/'+seed+'/'+tw:'');if(HC_CC[key])return HC_CC[key];const W=HCW[wi],r=rng(seed?seed:4242+wi*977),p=['f16 $5'];let d=16,nf=110,nc=100;
  const R=(a,b)=>a+r()*(b-a),jumps=tw=='jumps',fuel=tw=='fuel',nb=tw=='bolts'?2:1;
  while(d<4000){const lv=Math.min(1,d/2500);let t=r(),s,L;
    if(jumps&&t>=.68&&r()<.5)t=.52+r()*.16;
    if(d>=nc){p.push('c');nc+=100}
    if(d>=nf){p.push('F');nf+=fuel?60+d*.03:120+d*.07}
    if(t<.28){L=Math.round(R(30,60));s=`h${L},${R(2,3.5+lv*3).toFixed(1)}`}
    else if(t<.42){L=Math.round(R(40,70));s=`w${L},${R(1,1.6+lv).toFixed(1)},${Math.round(R(2,4))}`}
    else if(t<.52){L=Math.round(R(26,40));s=`${r()<.5?'u':'d'}${L},${R(2,3+lv*3).toFixed(1)}`}
    else if(t<.6){s=`k${R(2.5,3+lv).toFixed(1)}`;L=12}
    else if(t<.68&&d>150){s=`p${Math.round(R(4,5+lv*2))}`;L=16}
    else if(t<.74){s=`r${Math.round(R(2,4))}`;L=24}
    else if(t<.84&&W.soft){L=Math.round(R(16,30));s=`m${L} f${L}`}
    else if(t<.9&&W.pit=='water'){L=Math.round(R(14,24));s=r()<.5?`b${L}`:`o${L}`}
    else{L=Math.round(R(8,18));s='f'+L}
    p.push(s,'$'+Math.round(R(3,6))*nb,'f'+Math.round(R(6,12)));d+=L+9}
  const C=hcCourse(null,wi,p.join(' '),key);C.endless=1;return C}

/* ---- the simulation (no page needed): hcNew makes a run, hcStep moves it 1/120 s ---- */
// o: veh, up (upgrades), as (driving help 0-3; G-FEEL1) or easy (true: as 3, the old switch), auto (Auto may turn the help up during the drive), ui (true: messages, sounds and the end card), paint; G-HC3: seed (the day's road of a distance
// drive), day (today's drive, hcDay: its road, twist and gold flag)
function hcNew(wi,si,o={}){const st=si==null?null:HC_ST[wi][si],day=st?null:o.day||null,C=st?hcCourse(st,wi):day?hcEndless(wi,day.seed,day.tw):hcEndless(wi,o.seed||0),sp=hcSpec(o.veh||'jeep',o.up),x0=60,
  y1=hcH(C,x0)+sp.R+2,y2=hcH(C,x0+sp.L)+sp.R+2,crates=st&&st[2][0]=='cargo'?st[2][1]:0,as=hcAsN(o.as!=null?o.as:o.easy?3:0);
  return Object.assign(sp,{wi,w:HCW[wi].id,st,si,C,veh:o.veh||'jeep',as,A:HC_AS[as],auto:!!o.auto,asUp:0,cpCr:0,saves:HC_AS[as].save,saved:0,stopT:0,stopped:false,easy:as>=2,ui:!!o.ui,tankSec:sp.tankSec*(st?1.5:1),fuel:100,
    w1:{x:x0,y:y1,px:x0,py:y1,rot:0,g:true},w2:{x:x0+sp.L,y:y2,px:x0+sp.L,py:y2,rot:0,g:true},gas:false,brake:false,
    bolts:0,maxX:x0,cp:x0,cpi:0,cpCrates:crates,crates,crates0:crates,crashT:0,safeT:0,stuckT:0,lockT:o.ui?1:0,over:false,result:null,
    took:new Set(),ci:0,t:0,air:0,airRot:0,lastAng:Math.atan2(y2-y1,sp.L),flips:0,perfect:0,airs:0,wheelieT:0,wheelies:0,crashes:0,
    wasAir:false,slip:0,bob:0,bobV:0,combo:0,comboT:0,parts:[],pops:[],g1t:-1,g2t:-1,ballT:0,boostT:0,gotStar:false,speed:0,best:0,why:'',
    day,dayX:day?60+day.goal*HC_PX:null,dayHit:false,gm:day&&day.tw=='float'?.62:1})}
function rotPts(H,a){const c=Math.cos(a),s=Math.sin(a),cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2;for(const p of[H.w1,H.w2]){const dx=p.x-cx,dy=p.y-cy;p.x=cx+dx*c-dy*s;p.y=cy+dx*s+dy*c}}
const hcAng=H=>Math.atan2(H.w2.y-H.w1.y,H.w2.x-H.w1.x);
const hcAV=H=>{let d=hcAng(H)-Math.atan2(H.w2.py-H.w1.py,H.w2.px-H.w1.px);if(d>Math.PI)d-=2*Math.PI;if(d<-Math.PI)d+=2*Math.PI;return d};
const hcWrap=a=>{while(a>Math.PI)a-=2*Math.PI;while(a<-Math.PI)a+=2*Math.PI;return a};
function hcStep(H,dt){const C=H.C,Wd=HCW[H.wi],R=H.R,L=H.L,w=[H.w1,H.w2],A=H.A,ui=H.ui;
  H.t+=dt;H.bobV+=(-H.bob*260-H.bobV*(14+H.susp*4))*dt;H.bob+=H.bobV*dt;
  if(H.crashT>0){H.crashT-=dt;hcParts(H,dt);if(H.crashT<=0)hcRespawn(H);return}
  if(H.lockT>0)H.lockT-=dt;if(H.boostT>0)H.boostT-=dt;if(H.comboT>0){H.comboT-=dt;if(H.comboT<=0)H.combo=0}
  if(H.ballT>0){H.ballT-=dt;if(H.ballT<=0&&ui)hcPop('Pop!')}
  const ang0=hcAng(H),cx0=(H.w1.x+H.w2.x)/2,err0=hcWrap(ang0-hcSlopeL(C,cx0,20));
  let gas=H.gas&&H.fuel>0&&H.lockT<=0;const brk=H.brake||H.lockT>0;
  // driving help (A, HC_AS), traction control: the nose lifting off the ground eases the gas
  let tc=1;if(A.tc&&gas&&H.w1.g&&err0>.2)tc=1-(1-Math.max(.15,1-(err0-.2)*3.5))*A.tc;
  const g=Wd.g*(H.ballT>0?.3:1)*(H.gm||1),boost=H.boostT>0;
  if(H.ballT>0&&H.ballT<2&&H.w1.g&&H.w2.g&&!hcPitAt(C,cx0+H.L))H.ballT=.01; // the balloons pop once the car is down past the gap
  for(const p of w){const vx=(p.x-p.px)*.9994,vy=(p.y-p.py)*.9994;p.px=p.x;p.py=p.y;p.x+=vx+(H.ballT>0&&H.gas?60*dt*dt:0);p.y+=vy-g*dt*dt}
  for(let i=0;i<4;i++){const dx=H.w2.x-H.w1.x,dy=H.w2.y-H.w1.y,d=Math.hypot(dx,dy)||1,f=(d-L)/d*.5;H.w1.x+=dx*f;H.w1.y+=dy*f;H.w2.x-=dx*f;H.w2.y-=dy*f}
  let ground=0,landV=0;H.slip=0;let wet=false;
  for(const p of w){let gy=hcH(C,p.x);const was=p.g;p.g=false;
    if(gy+R-p.y>30){const dx=p.x-p.px;p.x=p.px-dx*.3;gy=hcH(C,p.x)}
    if(p.y<gy+R&&gy+R-p.y<=30){const vyIn=(p.y-p.py)/dt;p.y=gy+R;p.g=true;ground++;if(!was){landV=Math.max(landV,-vyIn);if(p===H.w1)H.g1t=H.t;else H.g2t=H.t}
      const s=(hcH(C,p.x+1)-hcH(C,p.x-1))/2,l=Math.hypot(1,s),tx=1/l,ty=s/l,soft=hcSoftAt(C,p.x),ford=hcFordAt(C,p.x);
      let vt=(p.x-p.px)*tx+(p.y-p.py)*ty;
      const grip=soft?H.grip*soft.grip/.9+H.tireUp*.03:H.grip,tg=Wd.g==250?430:Wd.g,trac=grip*tg*1.5*tx+Wd.g*Math.max(0,-ty)*1.1,acc=H.acc*tc*(boost?1.4:1),a=Math.min(acc,trac)*dt*dt;
      const top=H.maxV*(boost?1.35:1)*(soft&&soft.drag<1?.6:1)*(ford?.55:1);
      if(gas){vt=Math.min(vt+a,Math.max(vt,top*dt));if(acc>trac)H.slip+=.5}
      else if(brk)vt=vt>0?Math.max(0,vt-Math.min(H.acc*1.4,trac*1.2)*dt*dt):Math.max(vt-a*.55,-H.maxV*dt*.4);
      else vt*=soft?soft.drag*.999:.997;
      if(soft&&soft.drag<1)vt*=soft.drag;
      if(ford){vt*=.995;wet=true}
      for(const px of C.pads)if(p.x>=px&&p.x<=px+60&&H.boostT<=0){H.boostT=.9;if(ui){hcPop('Zoom!');HSND.trick(1)}}
      p.px=p.x-tx*vt;p.py=p.y-ty*vt;p.rot+=vt/R*(gas&&H.acc>trac?1.6:1)}
    else p.rot+=(p.x-p.px)/R*.99}
  if(landV>200){H.bobV+=Math.min(landV,900)*.06/(1+H.susp*.15);if(landV>380&&ui)HSND.land(landV)}
  if(H.crates&&landV>H.drop+A.soft&&H.safeT<=0)hcCrate(H);
  let tq=0;const ang=hcAng(H),cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2,slopeB=hcSlopeL(C,cx,20);
  if(ground==0){tq=((gas?4.6:0)-(brk?4.6:0))*A.air;H.air+=dt}
  else{if(gas&&H.w1.g)tq+=H.lift*(H.w2.g?1:.8)*tc*A.lift;if(brk&&H.w2.g)tq-=3.2}
  if(tq)rotPts(H,tq*dt*dt);
  const av=hcAV(H),err=hcWrap(ang-(ground?slopeB:hcSlopeL(C,cx)));
  // in the air with no pedal the spin slows; driving help turns the car to match the ground below (and eases a wheelie down)
  if(ground==0&&!gas&&!brk)rotPts(H,-av*.012);
  const lv=A.lvl+(gas||brk?0:A.free);if(ground==0&&lv)rotPts(H,(-err*2.6*dt-av)*lv);
  if(ground&&A.wh&&H.w1.g&&!H.w2.g&&err>.3)rotPts(H,-(err-.3)*A.wh);
  // suspension: a landing's bounce is soaked up (better suspension, less spin left after touching down)
  if(ground&&H.wasAir)rotPts(H,-av*(.25+H.susp*.1));
  let da=ang-H.lastAng;if(da>Math.PI)da-=2*Math.PI;if(da<-Math.PI)da+=2*Math.PI;H.lastAng=ang;
  if(ground==0)H.airRot+=da;
  if(ground==0&&!H.wasAir)rotPts(H,-av*.75);
  if(ground==2&&H.air>0){const fl=Math.round(Math.abs(H.airRot)/(2*Math.PI)-.15),airT=H.air;
    if(fl>=1){H.flips+=fl;hcTrick(H,`${H.airRot>0?'Backflip':'Front flip'}${fl>1?' x'+fl:''}`,10*fl);if(ui){hcBuzz(15);if(S.voice)say(H.airRot>0?'Backflip!':'Front flip!')}}
    else if(airT>.8){H.airs++;hcTrick(H,'Big air',Math.min(8,Math.round(airT*2)))}
    if(airT>.6&&Math.abs(H.g1t-H.g2t)<.14&&Math.abs(err)<.2){H.perfect++;hcTrick(H,'Perfect landing',3)}
    if(landV>520&&!H.calm)H.shake=.25;H.air=0;H.airRot=0}
  H.wasAir=ground==0;
  if(H.w1.g&&!H.w2.g&&err>.25){H.wheelieT+=dt;if(H.wheelieT>=2&&H.wheelieT-dt<2){H.wheelies++;hcTrick(H,'Wheelie',4)}}else H.wheelieT=0;
  const hr=48*(H.R/21)+(H.veh=='monster'?10:0),hx=cx-Math.sin(ang)*hr,hy=cy+Math.cos(ang)*hr,pit=hcPitAt(C,cx);
  if(H.safeT>0)H.safeT-=dt;
  else if(pit&&cy<pit.y-pit.d*.45)return hcCrash(H,'pit');
  else if(hy<hcH(C,hx)+5||(Math.abs(err)>2.4&&ground)){const why=hcPitAt(C,hx)||hcPitAt(C,cx+50)?'pit':'flip';
    // driving help: a car tipping onto its back or side (not on its roof) is set back on its wheels, once between checkpoints
    if(why=='flip'&&H.saves>0&&Math.abs(err)<2.95)return hcSave(H,cx);
    return hcCrash(H,why)}
  // stuck on its end (leaning on a wall, nose up or down): after 1.5 s it counts as a flip
  H.tiltT=ground<2&&Math.abs(err)>1.1&&H.speed<60?(H.tiltT||0)+dt:0;if(H.tiltT>1.5){H.tiltT=0;return hcCrash(H,'flip')}
  H.fuel=Math.max(0,H.fuel-dt*100/H.tankSec*(gas?1:.25));
  if(cx>H.maxX)H.maxX=cx;
  if(H.dayX&&!H.dayHit&&cx>=H.dayX){H.dayHit=true;if(ui){HSND.star();hcPop(H.day.done?"Today's flag!":`Today's flag! Plus ${HC_DAY_BONUS} bolts`)}}
  if(C.fin!=null&&cx>=C.fin){H.over=true;H.result='win';return}
  if(ui&&H.best>20&&!H.passedBest&&(cx-60)/20>H.best){H.passedBest=true;hcPop('New record!');SFX.fanfare()}
  // checkpoints: a flip or an empty tank starts again here (crates as they were)
  while(H.cpi+1<C.cps.length&&cx>=C.cps[H.cpi+1]){H.cpi++;H.cp=C.cps[H.cpi];H.cpCrates=Math.max(1,H.crates);H.saves=A.save;H.cpCr=0;
    if(C.endless)H.bolts+=5;if(ui){HSND.cp(H.cpi);hcMsg(C.endless?`${Math.round((H.cp-60)/20)} m! Plus 5 bolts`:'Checkpoint! A flip starts again here.',1600)}}
  for(let k=0;k<C.fuel.length;k++){const fx=C.fuel[k];if(Math.abs(fx-cx)<60&&!H.took.has('f'+k)){H.took.add('f'+k);H.fuel=100;if(ui){HSND.fuel();hcPop('Full tank!')}}}
  if(A.ball)for(let k=0;k<C.balloons.length;k++){const bx=C.balloons[k];if(Math.abs(bx-cx)<70&&!H.took.has('a'+k)&&H.crashT<=0){H.took.add('a'+k);H.ballT=2.6;if(ui){HSND.balloon();hcPop('Balloons! Float over!')}}}
  for(let k=0;k<C.stars.length;k++){const s=C.stars[k];if(!H.took.has('s'+k)&&Math.abs(s.x-cx)<50&&Math.abs(s.y-cy)<45){H.took.add('s'+k);H.gotStar=true;H.bolts+=10;if(ui){HSND.star();hcPop('You found the star!')}}}
  // the lookout: stopped on it (both wheels down, hardly moving) for 0.4 s
  if(!H.stopped&&C.looks.length){const z=C.looks.find(q=>cx>=q.x0&&cx<=q.x1);if(z&&ground==2&&Math.hypot(H.w1.x-H.w1.px,H.w1.y-H.w1.py)/dt<15){H.stopT+=dt;if(H.stopT>=.4){H.stopped=true;H.bolts+=5;if(ui){HSND.star();hcPop('What a view! Plus 5')}}}else H.stopT=0}
  while(H.ci<C.coins.length&&C.coins[H.ci].x<cx-90)H.ci++;
  for(let j=H.ci;j<C.coins.length&&C.coins[j].x<cx+90;j++){const o=C.coins[j];if(H.took.has(j))continue;if(Math.abs(o.x-cx)<46&&Math.abs(o.y-cy)<62){H.took.add(j);H.bolts+=C.endless?1+Math.floor(o.x/10000):1;if(ui){HSND.coin(H);H.pops.push({x:o.x,y:o.y,l:.7})}}}
  const sp=Math.hypot(H.w1.x-H.w1.px,H.w1.y-H.w1.py)/dt;H.speed=sp;
  if(H.fuel<=0){if(sp<25&&ground)H.stuckT+=dt;else H.stuckT=0;if(H.stuckT>1.4){if(C.endless){H.over=true;H.result='fuel';return}H.why='fuel';H.crashes++;H.crashT=.9;if(ui){hcMsg('Out of gas! Back to the checkpoint with a full tank.',2200);if(S.voice)say('Out of gas! Here is a full tank.')}return}}
  if(ui)hcFx(H,gas,ang,cx,cy,sp,wet);
  hcParts(H,dt)}
function hcParts(H,dt){const g=HCW[H.wi].g;for(const d of H.parts){d.x+=d.vx*dt;d.y+=d.vy*dt;d.vy-=g*dt*d.g;d.l-=dt}H.parts=H.parts.filter(d=>d.l>0);if(H.parts.length>160)H.parts.splice(0,H.parts.length-160);
  for(const p of H.pops){p.l-=dt;p.y+=60*dt}H.pops=H.pops.filter(p=>p.l>0)}
// dust, smoke, splashes and the engine note (only on screen)
function hcFx(H,gas,ang,cx,cy,sp,wet){const C=H.C,Wd=HCW[H.wi],soft=hcSoftAt(C,H.w1.x);
  if(H.eng){const t=ac().currentTime,band=H.maxV/4,gear=Math.min(3,Math.floor(sp/band)),inG=Math.min(1,(sp-gear*band)/band);if(gear!=H.gear){if(gear>(H.gear||0))HSND.shift();H.gear=gear}const f=H.eng.base*(1+inG*.9+gear*.12)+(gas?H.eng.base*.25:0)+H.slip*30;H.eng.o.frequency.setTargetAtTime(f,t,.05);H.eng.o2.frequency.setTargetAtTime(f/2,t,.05);H.eng.g.gain.setTargetAtTime(gas?.032:.014,t,.12);H.eng.f.frequency.setTargetAtTime(gas?650+inG*300:340,t,.1)}
  if(H.parts.length>120)return;
  if(gas&&H.w1.g&&Math.random()<(.22+H.slip*.5))H.parts.push({x:H.w1.x-14,y:hcH(C,H.w1.x)+6,vx:-60-Math.random()*120,vy:60+Math.random()*120,l:.7,c:soft?soft.c2:Wd.dirt,s:4+Math.random()*4,g:1});
  if(gas&&Math.random()<.3)H.parts.push({x:cx-Math.cos(ang)*64,y:cy-Math.sin(ang)*64+30,vx:-20,vy:20,l:.8,c:'e',s:6,g:-.2,smoke:1});
  if(H.trail&&sp>40&&Math.random()<.08){const d=hcTrailBit(H.trail,H.tri=(H.tri||0)+1);H.parts.push({x:cx-Math.cos(ang)*58+Math.sin(ang)*20,y:cy-Math.sin(ang)*58+20,vx:-30-Math.random()*40,vy:30+Math.random()*50,l:.9,c:d.c,s:d.s,g:d.g,star:d.star})}
  if(wet&&sp>60&&Math.random()<.5)H.parts.push({x:H.w2.x+10,y:cy-10,vx:-40+Math.random()*120,vy:120+Math.random()*120,l:.6,c:'c1',s:4,g:1})}
function hcTrick(H,name,b){H.combo=H.comboT>0?H.combo+1:1;H.comboT=4;const mult=Math.min(4,H.combo),got=b*mult;H.bolts+=got;if(!H.ui)return;hcPop(`${name}! Plus ${got}`);
  const c=$('#hcc');if(c){c.textContent=mult>1?`Combo x${mult}`:'';c.classList.toggle('on',mult>1)}HSND.trick(mult)}
function hcCrate(H){if(!H.crates)return;H.crates--;if(H.ui){const cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2;for(let i=0;i<10;i++)H.parts.push({x:cx-20,y:cy+40,vx:(Math.random()-.5)*300,vy:150+Math.random()*250,l:1,c:['n','n2','y'][i%3],s:4+Math.random()*4,g:1});SFX.hit();
  hcPop(H.crates?`A crate fell off! ${H.crates} left`:'All the crates fell off!')}
  if(!H.crates&&H.crashT<=0){H.crashT=1.2;H.crashes++;H.why='cargo';if(H.ui)hcMsg('Back to the checkpoint to load up again. Land softly!',2400)}}
// R-03 A4: a short buzz on a crash and on landing a flip (buzz() in 10-sfx.js: the Grown-ups Buzz switch, never in Calm mode)
const hcBuzz=ms=>{try{if(typeof buzz=='function')buzz(ms)}catch(e){}};
// driving help: set back on the wheels where the car is, slowly (not a restart: no crash counted)
function hcSave(H,cx){const C=H.C,x=Math.max(H.cp,cx-H.L/2),y=hcH(C,x)+H.R+2,y2=hcH(C,x+H.L)+H.R+2;H.saves--;H.saved++;
  Object.assign(H.w1,{x,y,px:x,py:y,g:true});Object.assign(H.w2,{x:x+H.L,y:y2,px:x+H.L,py:y2,g:true});
  H.safeT=.6;H.air=0;H.airRot=0;H.wasAir=false;H.lastAng=Math.atan2(y2-y,H.L);H.tiltT=0;H.combo=0;
  if(H.ui){hcBuzz(15);hcMsg('Whoops! Back on the wheels. Ease off the gas on steep hills.',2000)}}
function hcCrash(H,why){if(H.crates)hcCrate(H);H.crashT=1.5;H.crashes++;
  // Auto driving help: several crashes between two checkpoints turn the help up by one for the rest of the drive
  if(H.auto&&H.as<3&&++H.cpCr>=HC_AS_CR){H.as++;H.A=HC_AS[H.as];H.asUp++;H.cpCr=0;H.saves=Math.max(H.saves,H.A.save);if(H.ui)hcPop('More driving help on!')}H.why=why;H.combo=0;if(!H.calm)H.shake=.4;if(!H.ui)return;hcBuzz(25);
  const cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2,pk=HCW[H.wi].pit;
  if(why=='pit'&&pk!='crater'){pk=='lava'?(hs()&&(noise(.5,0,.3,400,100),tone(90,.4,0,'sawtooth',.1,40))):HSND.crash(1);for(let i=0;i<26;i++)H.parts.push({x:cx,y:cy,vx:(Math.random()-.5)*320,vy:150+Math.random()*260,l:1,c:pk=='lava'?['o','y','r'][i%3]:'c1',s:5+Math.random()*4,g:1})}
  else{HSND.crash();for(let i=0;i<12;i++)H.parts.push({x:cx,y:cy+20,vx:(Math.random()-.5)*260,vy:120+Math.random()*200,l:1,c:'y',s:5,g:.6,star:1})}
  hcMsg(why=='pit'?(pk=='lava'?'Too hot! Go fast up the ramp to jump the lava.':pk=='crater'?'Into the crater! Go faster up the ramp.':'Splash! Go fast up the ramp to jump the water.')+' Back to the checkpoint.':'Flipped! Ease off the gas on steep hills. Back to the checkpoint.',2200);
  if(S.voice)say(why=='pit'?'Splash! Go faster to jump!':'Oops! Ease off the gas!')}
function hcRespawn(H){const R=H.R,x=H.cp,C=H.C,y=hcH(C,x)+R+4,y2=hcH(C,x+H.L)+R+4;Object.assign(H.w1,{x,y,px:x,py:y,g:true});Object.assign(H.w2,{x:x+H.L,y:y2,px:x+H.L,py:y2,g:true});
  H.stuckT=0;H.safeT=1.2;H.air=0;H.airRot=0;H.wasAir=false;H.lastAng=Math.atan2(y2-y,H.L);H.ballT=0;H.boostT=0;H.bob=0;H.bobV=0;
  if(H.why=='fuel'||H.fuel<30)H.fuel=H.why=='fuel'?100:30;if(H.crates0)H.crates=Math.max(H.crates,H.cpCrates);H.why='';
  // a balloon used before this checkpoint can be taken again
  for(let k=0;k<C.balloons.length;k++)if(C.balloons[k]>x)H.took.delete('a'+k)}
// the result of a finished stage: bits (1 goal, 2 mission 1, 4 mission 2)
function hcBitsOf(H){const s=H.st;if(!s||H.result!='win')return 0;const g=s[2];let b=0;
  if(g[0]=='flag'||(g[0]=='coins'&&H.bolts>=g[1])||(g[0]=='cargo'&&H.crates>=1))b|=1;
  s[3].forEach((m,k)=>{const ok={bolts:H.bolts>=m[1],time:H.t<=m[1],flips:H.flips>=m[1],air:H.airs>=m[1],perfect:H.perfect>=m[1],nocrash:H.crashes==0,crates:H.crates0>0&&H.crates==H.crates0,star:H.gotStar,stop:H.stopped}[m[0]];if(ok)b|=2<<k});
  return b}
// save a finished stage: new stars pay bolts (more in later worlds); returns {bits, old, gain, opened: [lines]}
function hcBank(H){const gs=garageS(),id=H.st?H.st[0]:null,bits=hcBitsOf(H),old=id?gs.st[id]||0:0,wasW=HCW.map((_,w)=>hcWOpen(w)),nxt=H.st&&H.si+1<HC_SPW?hcSOpen(H.wi,H.si+1):true;
  const fresh=bits&~old,gain=hcBits(fresh)*(8+4*H.wi);if(id&&bits)gs.st[id]=old|bits;gs.bolts+=H.bolts+gain;if(id){H.noted=1;hcAsNote(H)}
  const opened=[];HCW.forEach((W,w)=>{if(!wasW[w]&&hcWOpen(w))opened.push(W.n)});
  const nextOpen=H.st&&H.si+1<HC_SPW&&!nxt&&hcSOpen(H.wi,H.si+1)?HC_ST[H.wi][H.si+1][1]:null;
  return{bits,old,gain,opened,nextOpen}}

/* ---- playing: the screen, pedals, the loop, game time ---- */
function stopHC(){for(const e of document.querySelectorAll('.nv-light'))if(e.stop)e.stop(); // G-FEEL2: a light end banner left open
  if(!HC)return;
  // G-FEEL1: a stage drive left without the flag after a while counts for Auto driving help (hcAsNote)
  if(HC.st&&HC.result!='win'&&!HC.noted&&HC.t>=8){HC.noted=1;hcAsNote(HC);save()}cancelAnimationFrame(HC.raf);if(HC.eng){try{HC.eng.lfo&&HC.eng.lfo.stop();HC.eng.o.stop();HC.eng.o2.stop()}catch(e){}}removeEventListener('keydown',HC.kd);removeEventListener('keyup',HC.ku);if(HC.gl){GLX.end(HC.gl.R);HC.gl.off=true}if(typeof FPS!='undefined')FPS.tag=''; // GL-01: its WebGL context goes at once (a tablet keeps only a few)
  HC=null}
const HC_SNDI=['sound-on','music','sound-off']; // P4-16: the sound button's icon for S.hcSnd (all, no engine, off)
const hcCalm=()=>{try{return document.documentElement.classList.contains('calm')||matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}};
// fixed steps of 1/120 s (G-HC3, R-03 H1): a slow frame (up to 0.1 s) runs more steps, so a slow tablet never plays in slow motion;
// returns the steps run
function hcAdvance(H,dt){H.acu=(H.acu||0)+Math.min(.1,Math.max(0,dt));let n=0;
  while(!H.over&&H.acu>=1/120-1e-9&&n<12){hcStep(H,1/120);H.acu-=1/120;n++}
  H.acu=Math.min(H.acu,1/120);return n}
// world index (a number or an old place name like 'meadow'); si: a stage of that world, or none for the distance drive (today's
// road); day: today's drive (hcDay) instead of the distance drive
function hcStart(world,si,day){const wi=typeof world=='number'?world:Math.max(0,HCW.findIndex(W=>W.id==world)),gs=garageS();
  if(si!=null&&!HC_ST[wi])si=null;if(si!=null)day=null;
  const H=hcNew(wi,si,{veh:gs.veh,up:gs.up,as:hcAsLevel(),auto:hcAsPick()=='auto',ui:true,seed:hcSeed(wi),day}),st=H.st,C=H.C;H.calm=hcCalm();H.paint=hcC(gs.paint)||hcC('r');H.best=st||day?0:gs.best[H.w];
  H.wx=st?st[4]:day&&day.wx||'day';H.rim=gs.rim;H.top=gs.top;H.trail=gs.trail;
  const ticks=st?C.cps.slice(1).map(x=>`<i class="hc-tick" style="left:${(x/C.fin*100).toFixed(1)}%"></i>`).join(''):'';
  view(`<div class="hc" id="hc"><canvas id="hcv"></canvas>
   ${GH.top('hill',{play:true,hud:true,sub:st?`${HCW[wi].n}, stage ${si+1}: ${st[1]}`:day?`Today's drive: ${HCW[wi].n}`:`${HCW[wi].n}, distance drive`,timeId:'hct',
    chips:`<span class="stat gh-nut" aria-label="Bolts">${ico('nut',32)}<b id="hcb">0</b></span>`,sound:GH.tool(HC_SNDI[S.hcSnd||0],'Sound','hcsnd')})}
   <div class="hc-hud2"><div class="hc-fuel" id="hcfuel" role="img" aria-label="Fuel">${ico('drop',28)}<span class="hc-gauge"><i id="hcf"></i></span></div>
   <div class="hc-prog"><b id="hcd">0 m</b><span class="hc-track"><i id="hcpb"></i>${ticks}<i class="hc-bestm" id="hcbest"></i></span></div></div>
   <div class="pedal brake" id="pb">${ico('chevron-left',48)}<small>Brake</small></div><div class="pedal gas" id="pg">${ico('chevron-right',48)}<small>Gas</small></div>
   <div class="hcmsg" id="hcm" role="status"></div><div class="hcpop" id="hcp" aria-hidden="true"></div><div class="hccombo" id="hcc" aria-hidden="true"></div></div>`);
  HC=H; // after view(): view() stops the drive before it
  const cv=$('#hcv'),dpr=Math.min(2,devicePixelRatio||1);
  // GL-01: the 3D look (62b-hill-gl.js) draws the world on a WebGL canvas under #hcv, which then only carries the small things on
  // top (so it keeps its alpha); without WebGL, or with the 3D look off, #hcv draws everything as before
  let glc=null;if(typeof hcGlWant=='function'&&hcGlWant()){glc=document.createElement('canvas');glc.id='hcgl';glc.setAttribute('aria-hidden','true');cv.parentNode.insertBefore(glc,cv);H.gl=hcGlStart(H,glc);if(!H.gl){glc.remove();glc=null}}
  const ctx=cv.getContext('2d',{alpha:!!H.gl});
  cv.setAttribute('role','img');cv.setAttribute('aria-label','The hill and your vehicle'); // P6-01
  // at most 1 million pixels; a slow tablet draws fewer (the canvas is stretched to the screen): 1, 0.85, 0.7 of them
  H.q=1;let slow=0,fast=0,k=dpr;const size=()=>{const cw=Math.max(1,cv.clientWidth),ch=Math.max(1,cv.clientHeight);k=Math.min(dpr,Math.sqrt(1e6/(cw*ch)))*H.q;cv.width=Math.round(cw*k);cv.height=Math.round(ch*k)};size();H.size=size;
  const hc=$('#hc');
  const setP=()=>{const ids=Object.values(H.ptIn);H.gas=ids.includes('g');H.brake=ids.includes('b');$('#pg').classList.toggle('on',H.gas);$('#pb').classList.toggle('on',H.brake)};H.ptIn={};
  hc.addEventListener('pointerdown',e=>{if(HC!==H||e.target.closest('.gh-top'))return;e.preventDefault();H.ptIn[e.pointerId]=e.clientX>innerWidth/2?'g':'b';setP()});
  const rel=e=>{if(HC!==H)return;delete H.ptIn[e.pointerId];setP()};hc.addEventListener('pointerup',rel);hc.addEventListener('pointercancel',rel);hc.addEventListener('pointerleave',rel);
  H.kd=e=>{if(e.key=='ArrowRight'||e.key=='ArrowUp')H.gas=true;if(e.key=='ArrowLeft'||e.key=='ArrowDown')H.brake=true};H.ku=e=>{if(e.key=='ArrowRight'||e.key=='ArrowUp')H.gas=false;if(e.key=='ArrowLeft'||e.key=='ArrowDown')H.brake=false};
  addEventListener('keydown',H.kd);addEventListener('keyup',H.ku);
  // P4-16: Pause opens the shared sheet; it holds the drive (and the game-time clock) and its Quit ends the drive
  GH.wire({quit:()=>hcEnd('quit'),hold:on=>{if(HC!==H)return;H.paused=on;H.ptIn={};setP();if(on&&H.eng){try{H.eng.g.gain.setTargetAtTime(0,ac().currentTime,.05)}catch(e){}}}});
  $('#hcsnd').onclick=e=>{S.hcSnd=((S.hcSnd||0)+1)%3;save();e.currentTarget.innerHTML=ico(HC_SNDI[S.hcSnd]);hcMsg(['All sounds on','Engine off, other sounds on','Truck sounds off'][S.hcSnd],1400);if(S.hcSnd&&H.eng){try{H.eng.g.gain.setTargetAtTime(0,ac().currentTime,.05);H.eng.lfo.stop();H.eng.o.stop();H.eng.o2.stop()}catch(x){}H.eng=null}};
  if(S.sound&&(S.hcSnd||0)==0){try{const E=ENG[gs.veh]||ENG.jeep,a=ac(),o=a.createOscillator(),o2=a.createOscillator(),f=a.createBiquadFilter(),g=a.createGain(),am=a.createGain(),lfo=a.createOscillator(),lg=a.createGain();o.type=E[1];o2.type='square';f.type='lowpass';f.frequency.value=420;g.gain.value=.02;
    o.connect(f);o2.connect(f);f.connect(am).connect(g).connect(MG);am.gain.value=1;lfo.frequency.value=E[2]||7;lg.gain.value=E[2]?.45:.08;lfo.connect(lg).connect(am.gain);lfo.start();o.frequency.value=E[0];o2.frequency.value=E[0]/2;o.start();o2.start();H.eng={o,o2,g,f,lfo,base:E[0]}}catch(e){}}
  hcMsg(st?`${st[1]}: ${hcGoalText(st)[0].toUpperCase()+hcGoalText(st).slice(1)}!`:day?`${day.label}. Reach the gold flag at ${day.goal} m!`:`Distance drive: ${H.best?'beat '+H.best+' m!':'go as far as you can!'}`,2600);
  if(S.voice)say(st?`${st[1]}. ${hcGoalText(st)}!`:`Let's climb, ${S.name}!`);
  let last=0;const loop=ts=>{if(HC!==H)return;const dt=last?Math.min(.1,(ts-last)/1000):0;last=ts;
    if(!document.hidden&&!H.over&&!H.paused){hcAdvance(H,dt);if(!H.over)hcTime(H,dt)}
    hcMusic(H);
    if(H.gl&&hcGlPace(H,dt))slow=fast=0;else if(dt>.026)slow++;else if(dt>0)fast++;if(slow+fast>=45){if(slow>30&&H.q>.71){H.q=H.q>.9?.85:.7;size()}else if(H.gl&&!H.gl.off&&slow>36){if(++H.gl.slow>=3)hcGlDrop(H,'slow')}else if(H.gl)H.gl.slow=0;slow=fast=0} // GL-01: still slow at the lowest scale: the 2D look
    if(H.result&&!H.shown){H.result=='win'?hcWin():hcEnd(H.result)}
    if(HC===H){hcDraw(ctx,cv.width,cv.height,k);H.raf=requestAnimationFrame(loop)}};H.raf=requestAnimationFrame(loop)}
function hcMsg(t,ms=1500){const m=$('#hcm');if(!m)return;m.textContent=t;m.classList.add('on');clearTimeout(m._t);m._t=setTimeout(()=>m.classList.remove('on'),ms)}
function hcPop(t){const m=$('#hcp');if(!m)return;m.textContent=t;m.classList.remove('on');void m.offsetWidth;m.classList.add('on')}
function hcTime(H,dt){const p=pt();H.ambT=(H.ambT??4)-dt;if(H.ambT<=0){H.ambT=5+Math.random()*8;hcAmb(H.w)}
  if(!H.timeUp){p.bank=Math.max(0,p.bank-dt);p.used+=dt;if(ptLeft()<=0){H.timeUp=true;H.graceT=25;hcMsg('Last run! Game time is up soon.',3000);SFX.rattle()}}
  else{H.graceT-=dt;if(H.graceT<=0){H.result='time';return}}
  H.saveT=(H.saveT||0)+dt;if(H.saveT>5){H.saveT=0;save()}
  if(H.comboT<=0){const c=$('#hcc');if(c&&c.classList.contains('on'))c.classList.remove('on')}
  GH.setTime($('#hct'),H.timeUp?H.graceT:null)}
function hcAmb(st){if(!hs()||Math.random()<.25)return;
  if(st=='meadow'){const n=2+Math.floor(Math.random()*3),f=2200+Math.random()*1200;for(let i=0;i<n;i++)tone(f,.07,i*.11,'sine',.035,f*1.5)}
  else if(st=='jungle'){const f=900+Math.random()*500;tone(f,.12,0,'triangle',.04,f*1.8);tone(f*1.6,.12,.14,'triangle',.04,f*.9)}
  else if(st=='desert'){tone(2400,.5,0,'sine',.03,1600);noise(1.2,0,.025,300,900)}
  else if(st=='snow'){noise(1.6,0,.035,500,1500)}
  else if(st=='volcano'){noise(1.4,0,.06,60,180);tone(45,1.2,0,'sine',.08,30)}
  else if(st=='city'){const f=pick([330,392,440]);tone(f,.12,0,'square',.03);tone(f*1.26,.18,.15,'square',.03)}
  else if(st=='moon'){[0,1,2].forEach(i=>tone(1200+i*300,.06,i*.1,'sine',.03))}}

/* ---- the end of a run: the shared end card (P4-16) ---- */
const hcEngOff=H=>{if(H.eng){try{H.eng.g.gain.setTargetAtTime(0,ac().currentTime,.1)}catch(e){}}};
function hcEnd(why){const H=HC;if(!H||H.shown)return;H.shown=true;H.over=true;const gs=garageS();hcEngOff(H);
  if(H.st){gs.bolts+=H.bolts;save();if(why=='quit'){stopHC();return hcLevels(H.wi)}return hcStageCard(H,why)}
  const m=Math.floor((H.maxX-60)/20),D=H.day,rec=!D&&m>gs.best[H.w];if(rec)gs.best[H.w]=m;const pay=hcDayPay(H);gs.bolts+=H.bolts;save();
  if(why=='quit'){stopHC();return garage()}
  const win=(rec&&m>20)||(D&&H.dayHit);win?SFX.fanfare():SFX.chime();
  const dayLine=!D?[]:H.dayHit?[['sparkle',pay?`Today's drive done: plus ${pay} bolts! A new drive comes tomorrow.`:`Today's drive done again! A new drive comes tomorrow.`]]:
    [['target',`Today's gold flag is at ${D.goal} m. Try again: nothing is lost.`]];
  const o=hcGuard(GH.end('hill',{win,title:why=='time'?"Game time's up!":D&&H.dayHit?"Today's drive done!":'Out of gas!',tag:rec&&m>0?'New record!':'',
   stats:[[m+' m',D?(H.dayHit?'gold flag reached':'gold flag at '+D.goal+' m'):rec&&m>0?'new record':'best '+gs.best[H.w]+' m','ruler'],['+'+(H.bolts+pay),'bolts','nut'],[String(H.flips),'flips','rotate'],[String(H.perfect),'perfect landings','check-circle']],
   lines:[...dayLine,['drop','Fuel cans are further apart the farther you go. Ease off the gas in the air to save fuel.'],['target',esc(hcNextGoal().t)]],
   btns:why=='time'||ptLeft()<=0?NAV.end3({next:'hlearn',home:'hgar'}):NAV.end3({again:'hagain',home:'hgar'})})); // NAV-01: with no game time left, Next goes to Learn
  if(S.voice)say(why=='time'?`Game time is up! Let's learn and earn more!`:rec&&m>0?`New record! ${m} meters!`:`You drove ${m} meters!`);
  const go=f=>{o.remove();stopHC();f()};
  if(o.querySelector('#hagain'))o.querySelector('#hagain').onclick=()=>go(()=>D?hcStart(H.wi,null,hcDay()):hcStart(H.wi));
  if(o.querySelector('#hlearn'))o.querySelector('#hlearn').onclick=()=>go(()=>learnHub());
  o.querySelector('#hgar').onclick=()=>go(home)}
// game time ran out in a stage: bolts kept, no stars lost
function hcStageCard(H,why){SFX.chime();const C=H.C,m=Math.min(Math.floor((H.maxX-60)/20),Math.floor((C.fin-60)/20)),L=Math.floor((C.fin-60)/20);
  if(S.voice)say(`Game time is up! Let's learn and earn more!`);
  hcCard(H,{title:"Game time's up!",extra:UI.meter(m/L,{lg:true,kind:'good',label:`${m} of ${L} m`}),lines:[['nut',`Your ${H.bolts} bolts are saved.`],['go',`Only <b>${Math.max(0,L-m)} m</b> to the flag next time!`]],
   btns:NAV.end3({next:'hcnext',home:'hchome'})})} // NAV-01: no game time left: Next goes to Learn
// the finger still on the gas when the card opens must not press its buttons when it lifts: a button works after a new press
// on the card (a key press always works)
const hcGuard=o=>{o.addEventListener('pointerdown',()=>{o._armed=1},true);o.addEventListener('click',e=>{if(e.detail&&!o._armed){e.stopPropagation();e.preventDefault()}},true);return o};
// NAV-01: the end choices (NAV.end3, data-go again | next | home); Next with no game time left goes to Learn to earn more
function hcCard(H,c){const o=hcGuard(GH.end('hill',c));const go=f=>{o.remove();stopHC();f()};
  o.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{const a=b.dataset.go;
    if(a=='again')go(()=>hcStart(H.wi,H.si));
    else if(a=='next'){if(ptLeft()<=0)return go(learnHub);const n=hcAfter(H.wi,H.si);go(()=>n?hcStart(n[0],n[1]):hcLevels(H.wi))}
    else go(home)});return o}
// G-FEEL2: the light end of a won stage (GH.end {light: true}, NAV.light); Next with no game time left goes to Learn, as on the card
function hcLight(H,stars,nx){const go=f=>()=>{stopHC();f()};
  return hcGuard(GH.end('hill',{light:true,title:`${H.st[1]} done!`,stars,again:go(()=>hcStart(H.wi,H.si)),
    next:go(()=>ptLeft()<=0?learnHub():hcStart(nx[0],nx[1])),home:go(home)}))}
// the stage after (w, i) if it is open: [w, i] or null
function hcAfter(w,i){if(i+1<HC_SPW)return hcSOpen(w,i+1)?[w,i+1]:null;return w+1<HC_ST.length&&hcWOpen(w+1)?[w+1,0]:null}
function hcWin(){const H=HC;if(!H||H.shown)return;H.shown=true;H.over=true;H.result='win';hcEngOff(H);
  const s=H.st,r=hcBank(H);save();const all=garageS().st[s[0]]||0,stars=hcBits(all),ok=r.bits&1,tm=Math.round(H.t),nx=hcAfter(H.wi,H.si);
  ok?SFX.fanfare():SFX.chime();if(S.voice)say(!ok?'So close! Try again!':stars==3?'Three stars! Amazing!':'You made it!');
  const g=s[2],goal=g[0]=='coins'?`Collect ${g[1]} bolts (you got ${H.bolts})`:g[0]=='cargo'?`Carry the crates to the flag (${H.crates} of ${H.crates0})`:'Reach the flag';
  const lines=[[ok?'check-circle':'target',esc(goal)+(r.bits&1&&!(r.old&1)?' <b>New star!</b>':'')],
    ...s[3].map((m,k)=>{const now=r.bits>>(k+1)&1,was=r.old>>(k+1)&1;return[now||was?'check-circle':HC_MIC[m[0]],esc(hcMisText(m)[0].toUpperCase()+hcMisText(m).slice(1))+(now&&!was?' <b>New star!</b>':was?' (done before)':'')]}),
    ...(r.gain?[['nut',`Plus ${r.gain} bolts for new stars`]]:[]),...r.opened.map(n=>['sparkle',`${esc(n)} is open!`]),...(r.nextOpen?[['go',`Next: ${esc(r.nextOpen)} is open`]]:[]),
    ...(!r.opened.length&&!r.nextOpen?[['target',esc(hcNextGoal().t)]]:[])];
  // G-FEEL2: a won stage with the next stage of the same world open chains on: the light banner (Play again / Next / Home, the
  // stars in its title) goes to Next by itself after 2 s. The last stage of a world, a stage not won and no game time left keep the
  // full card. hcBank above has saved the stars and paid the bolts either way.
  if(ok&&nx&&nx[0]==H.wi&&ptLeft()>0&&!H.timeUp)return hcLight(H,stars,nx);
  hcCard(H,{win:!!ok,title:ok?`${s[1]} done!`:`So close! ${H.bolts} of ${g[1]} bolts`,stars,
   stats:[[tm+' s','time','timer'],['+'+(H.bolts+r.gain),'bolts','nut'],[String(H.crashes),'restarts','replay'],H.crates0?[`${H.crates}/${H.crates0}`,'crates','gift']:[String(H.flips),'flips','rotate']],
   lines,
   btns:ptLeft()<=0?NAV.end3({next:'hcnext',home:'hchome'}):NAV.end3({again:'hcagain',next:ok&&nx?'hcnext':'',home:'hchome'})})} // NAV-01

/* ---- the menu: next goal, worlds and their stages, the distance drive, the garage, driving help (on: Auto, off: none) ---- */
let hcMW=null; // the world shown on the menu
function hcProfile(s,w){const C=hcCourse(s,w),W=HCW[w],N=60,ys=[];for(let i=0;i<=N;i++)ys.push(hcH(C,C.fin*i/N));const lo=Math.min(...ys),hi=Math.max(...ys,lo+60),
  Y=v=>(34-(v-lo)/(hi-lo)*26).toFixed(1),d='M0 40L'+ys.map((v,i)=>(i*120/N).toFixed(1)+' '+Y(v)).join('L')+'L120 40Z';
  const pits=C.pits.map(p=>`<rect x="${(p.x0/C.fin*120).toFixed(1)}" y="${Y(p.y)}" width="${Math.max(1.5,(p.x1-p.x0)/C.fin*120).toFixed(1)}" height="6" fill="var(${hcTok(W.water)})"/>`).join('');
  return`<svg class="hc-prof" viewBox="0 0 120 40" aria-hidden="true"><path d="${d}" fill="var(${hcTok(W.top)})"/>${pits}<path d="M116 ${Y(ys[N])}V${(+Y(ys[N])-12).toFixed(1)}l-7 3l7 3" fill="var(--ill-red)" stroke="var(--ill-ink)" stroke-width="1"/></svg>`}
function hcHubLine(){const gs=garageS();return`<span>${ico('star',18)}<b>${hcTot()}</b> of ${hcMax()} stars</span><span>${ico('nut',18)}<b>${gs.bolts}</b> bolts</span>`}
function garage(){const gs=garageS(),ng=hcNextGoal(),day=hcDay(),DW=HCW[day.wi];if(hcMW==null||!hcWOpen(hcMW)||hcMW>=HC_ST.length)hcMW=ng.w;const w=hcMW,W=HCW[w],left=ptLeft();
  const nextI=ng.w==w&&ng.i!=null?ng.i:HC_ST[w].findIndex((s,i)=>hcSOpen(w,i)&&hcStars(s[0])<3);const pi=nextI<0?0:nextI,ps=HC_ST[w][pi];
  view(`${GH.top('hill',{chips:`<span class="stat gh-nut" aria-label="Bolts">${ico('nut',32)}<b>${gs.bolts}</b></span>`})}
  <div class="scroll hc-menu">
  <div class="hc-goal" id="hcnext">${ico('target',32)}<p><b>Next goal</b> ${esc(ng.t)}</p></div>
  <p class="hc-save" id="hcsave">${ico('nut',24)}<span>${esc(hcSaveLine())}</span></p>
  <div class="hc-wtabs" role="group" aria-label="Worlds">${HC_ST.map((_,k)=>{const ok=hcWOpen(k);return`<button class="btn hc-wt${k==w?' on':''}${ok?'':' lock'}" data-w="${k}" aria-pressed="${k==w}" style="--hc-a:var(--${HCW[k].sky[0]});--hc-b:var(--${HCW[k].sky[1]})">
    <b>${esc(HCW[k].n)}</b><span>${ok?ico('star',18)+hcWStars(k)+'/15':ico('lock',18)+HC_NEED[k]+' stars'}</span></button>`}).join('')}</div>
  <section class="hc-world" style="--hc-a:var(--${W.sky[0]});--hc-b:var(--${W.sky[1]})"><div class="hc-wh"><h2>${esc(W.n)}</h2>${UI.chip('star',`${hcWStars(w)}/15`,{aria:'Stars in this world'})}</div>
  <div class="hc-stages">${HC_ST[w].map((s,i)=>{const ok=hcSOpen(w,i),n=hcStars(s[0]),b=gs.st[s[0]]||0;return`<button class="btn hc-stg${ok?'':' lock'}${i==pi?' cur':''}" data-stg="${i}" aria-label="${esc(`Stage ${i+1}, ${s[1]}: ${ok?n+' of 3 stars':'locked'}`)}">
    <span class="hc-sn">${ok?i+1:ico('lock',24)}</span><span class="hc-sb"><b>${esc(s[1])}</b>${hcProfile(s,w)}
    <span class="hc-gl">${ico(HC_GIC[s[2][0]],20)}${esc(hcGoalText(s))}</span>
    <span class="hc-ms">${s[3].map((m,k)=>`<span class="${b>>(k+1)&1?'ok':''}">${ico(b>>(k+1)&1?'check':HC_MIC[m[0]],18)}${esc(hcMisText(m))}</span>`).join('')}</span></span>
    ${UI.stars(n,3,22)}</button>`}).join('')}</div></section>
  ${UI.btn(`Play stage ${pi+1}: ${ps[1]}`,{kind:'primary',size:'lg',icon:'play',id:'hcgo',wide:true})}
  ${UI.sw('Driving help: keeps the car level and brings balloons (how much: Grown-ups)',hcEasy(),'hceasy')}
  <button class="btn hc-day${day.done?' done':''}" id="hcday">
    <span class="hc-daydisc">${ico(day.done?'check-circle':'sparkle',32)}</span><span class="hc-dayt"><b>Today's drive: ${esc(DW.n)}</b><span>${esc(day.label)}</span>
    <small>${day.done?'Done today! A new drive comes tomorrow.':`Gold flag at ${day.goal} m: plus ${HC_DAY_BONUS} bolts the first time today.`}</small></span>${ico('play',32)}</button>
  <h2>Distance drive</h2><p class="hc-note">Go as far as you can. A new road every day. Fuel cans get further apart. Your best is a flag on the road.</p>
  <div class="hc-dist">${HCW.map((D,k)=>hcWOpen(k)?`<button class="btn hc-dw" data-st="${D.id}" style="--hc-a:var(--${D.sky[0]});--hc-b:var(--${D.sky[1]})">${ico('ruler',24)}<span><b>${esc(D.n)}</b><small>${gs.best[D.id]?'Best '+gs.best[D.id]+' m':'No best yet'}</small></span></button>`:'').join('')}</div>
  <h2>Garage</h2><button class="btn hc-gar" id="hcgar"><canvas width="160" height="96" data-vc="${gs.veh}" aria-hidden="true"></canvas><span><b>${esc(VEH[gs.veh].n)}</b><small>Vehicles, upgrades and paint</small></span>${ico('chevron-right',28)}</button>
  <h2>How to drive</h2><ul class="hc-tips">
   <li>${ico('chevron-right',24)}<span>Hold <b>Gas</b> (right side) to go. Hold <b>Brake</b> (left side) to slow down and back up.</span></li>
   <li>${ico('rotate',24)}<span>In the air, Gas tips you back and Brake tips you forward. Land on both wheels.</span></li>
   <li>${ico('pin',24)}<span>A flip or an empty tank starts again at the last checkpoint. Nothing is lost.</span></li>
   <li>${ico('nut',24)}<span>Bolts buy vehicles and upgrades in the garage. Stars open new stages and worlds.</span></li></ul></div>`);
  GH.wire({back:gameRoom});
  $$('[data-vc]').forEach(hcVehPic);
  $$('[data-w]').forEach(b=>b.onclick=()=>{const k=+b.dataset.w;if(!hcWOpen(k)){SFX.wrong();fb(`Win ${HC_NEED[k]-hcTot()} more stars to open ${HCW[k].n}.`,'warn long',2600);return}SFX.pop(1);hcMW=k;garage()});
  const play=(k,i)=>{if(ptLeft()<=0){SFX.wrong();fb(ptWhyNot(),'warn long',3000);return}SFX.whoosh();hcStart(k,i)};
  $$('[data-stg]').forEach(b=>b.onclick=()=>{const i=+b.dataset.stg;if(!hcSOpen(w,i)){SFX.wrong();fb(`Finish ${HC_ST[w][i-1][1]} first!`,'warn long',2400);return}play(w,i)});
  $('#hcgo').onclick=()=>play(w,pi);
  $$('[data-st]').forEach(b=>b.onclick=()=>play(HCW.findIndex(D=>D.id==b.dataset.st),null));
  $('#hcday').onclick=()=>{if(ptLeft()<=0){SFX.wrong();fb(ptWhyNot(),'warn long',3000);return}SFX.whoosh();hcStart(day.wi,null,day)};
  $('#hcgar').onclick=()=>{SFX.pop(2);hcGarage()};
  $('#hceasy').onchange=e=>{gs.as=e.target.checked?'auto':0;save();SFX.pop(2);fb(e.target.checked?'Driving help is on.':'Driving help is off.','',1400)}}
// the old levels screen: now the menu with a world picked
function hcLevels(w=0){hcMW=typeof w=='number'?w:Math.max(0,HCW.findIndex(W=>W.id==w));if(hcMW>=HC_ST.length)hcMW=0;garage()}
function hcVehPic(c){const x=c.getContext&&c.getContext('2d');if(!x)return;const P=hcPetSpr();if(P&&!P.c&&P.p&&!c._wait){c._wait=1;P.p.then(()=>{if(c.isConnected)hcVehPic(c)})}const V=VEH[c.dataset.vc],gs=garageS(),w=c.width,h=c.height,s=Math.min(.62*w/160,.62*h/96);x.clearRect(0,0,w,h);
  x.fillStyle=hcC('g2');x.fillRect(0,h-12*h/96,w,12*h/96);drawVehicle(x,c.dataset.vc,w/2,h-12*h/96-V.R*s-(V.R+6)*s,0,s,hcC(gs.paint)||hcC('r'),0,0,0,{rim:gs.rim,top:gs.top})}
// what an upgrade does, in numbers a child can compare
function hcUpLine(k,lv){const a=hcSpec(garageS().veh,{[k]:lv});return k=='engine'?`Top speed ${Math.round(a.maxV/20*3.6)} km/h`:k=='tires'?`Grip ${Math.round(a.grip*100)}`:k=='susp'?`Crates stay on up to ${Math.round(a.drop/10)} bumps`:`One tank: ${Math.round(a.tankSec)} s of gas`}
function hcGarage(){const gs=garageS();
  view(`${GH.top('hill',{sub:'Garage',chips:`<span class="stat gh-nut" aria-label="Bolts">${ico('nut',32)}<b>${gs.bolts}</b></span>`})}
  <div class="scroll hc-menu"><div class="hc-show"><canvas width="420" height="230" data-vc="${gs.veh}" role="img" aria-label="${esc(VEH[gs.veh].n)}"></canvas><b>${esc(VEH[gs.veh].n)}</b></div>
  <h2>Upgrades</h2><div class="hc-ups">${UPG.map(([k,n,ic,d])=>{const lv=gs.up[k],cost=UPCOST[lv];return`<div class="hc-up">${ico(ic,32)}<span><b>${n}</b><small>${d}</small>
    <small class="hc-num">${esc(hcUpLine(k,lv))}${lv<5?' '+ico('arrow-right',16)+' '+esc(hcUpLine(k,lv+1).replace(/^[A-Za-z ]+?(\d)/,'$1')):''}</small>
    <span class="hc-pips" role="img" aria-label="Level ${lv} of 5">${[0,1,2,3,4].map(i=>`<i class="${i<lv?'on':''}"></i>`).join('')}</span></span>
    ${lv<5?UI.btn(String(cost),{icon:'nut',kind:gs.bolts>=cost?'primary':'soft',attrs:`data-up="${k}" aria-label="${esc(`Buy ${n} level ${lv+1} for ${cost} bolts`)}"`}):`<b class="hc-max">Top level</b>`}</div>`}).join('')}</div>
  <h2>Vehicles</h2><div class="hc-vehs">${Object.entries(VEH).map(([k,V])=>`<button class="btn hc-veh${gs.veh==k?' on':''}" data-v="${k}" aria-pressed="${gs.veh==k}"><canvas width="160" height="96" data-vc="${k}" aria-hidden="true"></canvas><b>${esc(V.n)}</b><small>${esc(V.d)}</small>
    <span class="hc-vc">${gs.vehs[k]?(gs.veh==k?ico('check',18)+'Driving':'Tap to drive'):ico('nut',18)+V.cost}</span></button>`).join('')}</div>
  <h2>Paint</h2><div class="hc-paints">${PAINTS.map(([c,n,cost])=>`<button class="btn hc-paint${gs.paint==c?' on':''}" data-pc="${c}" aria-pressed="${gs.paint==c}" aria-label="${esc(n+(gs.paint==c?', on':gs.paints[c]?'':', '+cost+' bolts'))}"><span style="background:var(${hcTok(c)})"></span>${gs.paints[c]?(gs.paint==c?ico('check',18):esc(n)):ico('nut',18)+cost}</button>`).join('')}</div>
  <h2>Garage level 2</h2><p class="hc-note" id="hct2n">${hcT2Open()?'Rims, trails and toppers to make your car your own. Tap one you own to use it, tap again to take it off.':
    `Opens at ${HC_T2_NEED} stars (you have ${hcTot()}). Every price is here already: start saving!`}</p>
  ${HC_T2K.map(kind=>`<h3 class="hc-t2h">${HC_T2N[kind]}</h3><div class="hc-t2s">${HC_T2.filter(t=>t[1]==kind).map(([id,,n,cost])=>{const own=gs.own2[id],on=gs[kind]==id,open=hcT2Open();
    return`<button class="btn hc-t2${on?' on':''}${open?'':' lock'}" data-t2="${id}" aria-pressed="${on}" aria-label="${esc(n+(on?', in use':own?', yours':open?', '+cost+' bolts':', opens at '+HC_T2_NEED+' stars'))}">
    <canvas width="240" height="144" data-t2c="${id}" aria-hidden="true"></canvas><b>${esc(n)}</b><span class="hc-vc">${on?ico('check',18)+'In use':own?'Tap to use':(open?'':ico('lock',18))+ico('nut',18)+cost}</span></button>`}).join('')}</div>`).join('')}
  <p class="hc-note">Bolts come from driving: pick them up, do tricks, and win stars.</p></div>`);
  GH.wire({back:garage});$$('[data-vc]').forEach(hcVehPic);$$('[data-t2c]').forEach(hcT2Pic);
  $$('[data-t2]').forEach(b=>b.onclick=()=>{const id=b.dataset.t2,r=hcBuy2(id),it=HC_T2.find(t=>t[0]==id);
    if(r=='locked'){SFX.wrong();fb(`Garage level 2 opens at ${HC_T2_NEED} stars. You have ${hcTot()}.`,'warn long',2600);return}
    if(r=='short')return short(b,it[3]);
    if(r=='bought'){SFX.fanfare();confetti(20)}else SFX.pop(2);again()});
  const short=(b,cost)=>{SFX.wrong();anim(b,'sad');fb(`Need ${cost-gs.bolts} more bolts!`,'warn')};
  const again=()=>{const y=$('.scroll').scrollTop;hcGarage();$('.scroll').scrollTop=y};
  $$('[data-v]').forEach(b=>b.onclick=()=>{const k=b.dataset.v,V=VEH[k];if(!gs.vehs[k]){if(gs.bolts<V.cost)return short(b,V.cost);gs.bolts-=V.cost;gs.vehs[k]=1;SFX.fanfare();confetti(30)}else SFX.pop(2);gs.veh=k;save();again()});
  $$('[data-up]').forEach(b=>b.onclick=()=>{const k=b.dataset.up;hcBuyUp(k)?(SFX.fanfare(),confetti(16),again()):short(b,UPCOST[gs.up[k]])});
  $$('[data-pc]').forEach(b=>b.onclick=()=>{const c=b.dataset.pc,cost=PAINTS.find(x=>x[0]==c)[2];if(!gs.paints[c]){if(gs.bolts<cost)return short(b,cost);gs.bolts-=cost;gs.paints[c]=1;SFX.chime()}else SFX.pop(2);gs.paint=c;save();again()})}
// buy the next level of an upgrade with bolts: true when bought (never below 0 bolts, never above level 5)
function hcBuyUp(k){const gs=garageS(),lv=gs.up[k];if(!(lv<5)||gs.bolts<UPCOST[lv])return false;gs.bolts-=UPCOST[lv];gs.up[k]=lv+1;save();return true}
// G-HC3: a level 2 item: buy it (and use it), use it, or take it off. 'locked' | 'short' | 'bought' | 'on' | 'off'
function hcBuy2(id){const gs=garageS(),it=HC_T2.find(t=>t[0]==id);if(!it)return'locked';const kind=it[1];
  if(!gs.own2[id]){if(!hcT2Open())return'locked';if(gs.bolts<it[3])return'short';gs.bolts-=it[3];gs.own2[id]=1;gs[kind]=id;save();return'bought'}
  if(gs[kind]==id){gs[kind]='';save();return'off'}
  gs[kind]=id;save();return'on'}
// a level 2 item's picture: a rim on a wheel, a topper on its pole, a trail as a row of its bits
function hcT2Pic(c){const x=c.getContext&&c.getContext('2d');if(!x)return;const id=c.dataset.t2c,it=HC_T2.find(t=>t[0]==id),w=120,h=72,gs=garageS(),paint=hcC(gs.paint)||hcC('r');
  x.setTransform(c.width/w,0,0,c.width/w,0,0);x.clearRect(0,0,w,h);if(!it)return;
  if(it[1]=='rim'){wheel(x,w/2,h/2,0,1.45,0,0,.3,paint,21,id);return}
  if(it[1]=='top'){x.fillStyle=hcC('g2');x.fillRect(0,h-8,w,8);hcTopper(x,w/2-10,h-8,1.15,id,0);return}
  for(let i=0;i<7;i++){const d=hcTrailBit(id,i),px=w-14-i*15,py=h/2+Math.sin(i*1.3)*8,r=(d.s||5)*(1.15-i*.08);x.globalAlpha=1-i*.1;
    if(d.star)hcStarD(x,px,py,r*1.4);else{x.fillStyle=hcC(d.c);x.beginPath();x.arc(px,py,r,0,7);x.fill();if(d.ring){x.fillStyle=hcA('w',.6);x.beginPath();x.arc(px-r*.35,py-r*.35,r*.3,0,7);x.fill()}}}x.globalAlpha=1}

/* ---- drawing: vehicles (origin = body centre, wheels at (+-L/2, R+6) below), the world, the HUD ---- */
function shade(c,p){const n=parseInt(c.slice(1),16),f=v=>Math.max(0,Math.min(255,Math.round(v+(p<0?v*p:(255-v)*p))));return'#'+[n>>16,(n>>8)&255,n&255].map(f).map(v=>v.toString(16).padStart(2,'0')).join('')}
function rr(x,a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
const hcSh=(c,p)=>/^#[0-9a-f]{6}$/i.test(c)?shade(c,p):c;
// the driver: the child's own pet (Sky Hop's drawn pet sprite, games2) peeking out of the window; until it is drawn, a helmet and a smiling face
function hcPetSpr(){try{return typeof hopPetSprite=='function'&&typeof S!='undefined'&&S.pet?hopPetSprite('happy',96):null}catch(e){return null}}
function hcHead(x,cx,cy,r,paint){const P=hcPetSpr();if(P&&P.c){x.save();x.beginPath();x.rect(cx-r*1.7,cy-r*1.9,r*3.4,r*2.6);x.clip();x.drawImage(P.c,cx-r*1.55,cy-r*1.45,r*3.1,r*3.1);x.restore();return}
  hcHelmet(x,cx,cy,r,paint)}
function hcHelmet(x,cx,cy,r,paint){x.fillStyle=hcC('s');x.beginPath();x.arc(cx,cy+r*.2,r*.7,0,7);x.fill();x.fillStyle=hcSh(paint,-.15);x.beginPath();x.arc(cx,cy,r,Math.PI*1.05,Math.PI*1.95);x.lineTo(cx+r*.95,cy-r*.05);x.lineTo(cx-r*.95,cy-r*.05);x.fill();
  x.fillStyle=hcC('w');x.beginPath();x.ellipse(cx-r*.35,cy-r*.55,r*.22,r*.12,-.5,0,7);x.fill();x.fillStyle=hcC('k');x.beginPath();x.arc(cx+r*.12,cy+r*.15,r*.1,0,7);x.arc(cx+r*.42,cy+r*.15,r*.1,0,7);x.fill();
  x.strokeStyle=hcC('k');x.lineWidth=r*.1;x.beginPath();x.arc(cx+r*.27,cy+r*.35,r*.2,.3,2.6);x.stroke()}
// G-HC3: where a topper's pole stands on each vehicle (body units)
const HC_TOPA={jeep:[-50,-18],buggy:[-44,-10],monster:[-54,-30],bike:[-30,-2],tractor:[-40,-66],bus:[-60,-50]};
// dec: the garage level 2 look {rim, top} (optional)
function drawVehicle(x,type,sx,sy,ang,sc,paint,rot1,rot2,bob,dec){const V=VEH[type]||VEH.jeep,hw=V.L/2,wy=V.R+6;
  x.save();x.translate(sx,sy);x.rotate(-ang);x.scale(sc,sc);x.translate(0,bob||0);x.textAlign='center';x.textBaseline='middle';
  const gb=x.createLinearGradient(0,-50,0,14);gb.addColorStop(0,hcSh(paint,.4));gb.addColorStop(.5,paint);gb.addColorStop(1,hcSh(paint,-.4));const edge=hcSh(paint,-.55);
  x.strokeStyle=hcC('e3');x.lineWidth=3;for(const wx of[-hw,hw]){x.beginPath();x.moveTo(wx*.9,2);for(let i=1;i<=6;i++)x.lineTo(wx*.9+(i%2?4:-4)+(wx-wx*.9)*i/6,2+(wy-2)*i/6);x.stroke()}
  x.strokeStyle=hcC('k2');x.lineWidth=5;x.beginPath();x.moveTo(-hw,wy-4);x.lineTo(-hw*.4,6);x.lineTo(hw*.4,6);x.lineTo(hw,wy-4);x.stroke();
  if(type=='buggy'){
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2;x.beginPath();x.moveTo(-50,4);x.lineTo(-44,-10);x.lineTo(30,-12);x.lineTo(54,-2);x.lineTo(50,6);x.closePath();x.fill();x.stroke();
    x.strokeStyle=hcC('k2');x.lineWidth=3.5;x.beginPath();x.moveTo(-36,-10);x.lineTo(-24,-40);x.lineTo(8,-40);x.lineTo(24,-12);x.moveTo(-24,-40);x.lineTo(-6,-12);x.stroke();
    hcHead(x,-8,-24,9,paint);x.fillStyle=hcC('w');x.font='bold 11px sans-serif';x.fillText('7',22,-3);x.fillStyle=hcC('y1');rr(x,48,-4,6,5,2);x.fill();
    x.fillStyle=hcC('e3');x.fillRect(-58,-14,10,4);x.fillRect(-54,-14,3,12)}
  else if(type=='monster'){
    x.fillStyle=hcC('k2');rr(x,-48,-4,96,10,3);x.fill();
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2.2;x.beginPath();x.moveTo(-62,-6);x.lineTo(-62,-24);x.quadraticCurveTo(-62,-30,-54,-30);x.lineTo(-26,-30);x.lineTo(-16,-56);x.lineTo(18,-56);x.lineTo(32,-30);x.lineTo(56,-28);x.quadraticCurveTo(64,-26,64,-18);x.lineTo(64,-6);x.closePath();x.fill();x.stroke();
    x.fillStyle=hcC('c1');x.beginPath();x.moveTo(-12,-32);x.lineTo(-6,-51);x.lineTo(14,-51);x.lineTo(25,-32);x.closePath();x.fill();
    hcHead(x,6,-40,9,paint);
    x.fillStyle=hcC('y');x.beginPath();x.moveTo(-50,-20);x.lineTo(-36,-26);x.lineTo(-40,-18);x.lineTo(-28,-22);x.lineTo(-44,-12);x.lineTo(-40,-19);x.closePath();x.fill();
    x.fillStyle=hcC('y1');rr(x,59,-24,6,7,2);x.fill();x.fillStyle=hcC('e1');for(let i=0;i<4;i++){x.beginPath();x.arc(-14+i*9,-60,2.4,0,7);x.fill()}}
  else if(type=='bike'){
    x.strokeStyle=hcC('k2');x.lineWidth=4;x.lineCap='round';x.beginPath();x.moveTo(-hw,wy);x.lineTo(-10,-6);x.lineTo(14,-8);x.lineTo(hw,wy);x.moveTo(14,-8);x.lineTo(22,-26);x.lineTo(14,-30);x.stroke();x.lineCap='butt';
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2;x.beginPath();x.moveTo(-22,-6);x.lineTo(-6,-16);x.lineTo(16,-18);x.lineTo(22,-8);x.lineTo(8,0);x.lineTo(-16,2);x.closePath();x.fill();x.stroke();
    x.beginPath();x.moveTo(-hw-6,6);x.quadraticCurveTo(-hw,-6,-hw+14,-4);x.lineTo(-hw+8,6);x.closePath();x.fill();x.beginPath();x.moveTo(hw-12,-2);x.quadraticCurveTo(hw,-6,hw+4,6);x.lineTo(hw-6,4);x.closePath();x.fill();
    x.fillStyle=hcC('k');rr(x,-24,-20,20,6,3);x.fill();
    x.strokeStyle=hcC('b3');x.lineWidth=6;x.lineCap='round';x.beginPath();x.moveTo(-12,-20);x.lineTo(-4,-36);x.lineTo(12,-28);x.moveTo(-12,-20);x.lineTo(2,-8);x.stroke();x.lineCap='butt';
    hcHead(x,-3,-45,11,paint);x.fillStyle=hcC('w');rr(x,-18,-14,14,10,2);x.fill();x.fillStyle=hcC('k');x.font='bold 9px sans-serif';x.fillText('1',-11,-9);x.fillStyle=hcC('y1');rr(x,22,-28,5,6,2);x.fill()}
  else if(type=='tractor'){
    x.fillStyle=hcC('k2');rr(x,-40,-6,84,8,3);x.fill();
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2;x.beginPath();x.moveTo(-12,-2);x.lineTo(-12,-28);x.lineTo(38,-26);x.quadraticCurveTo(48,-24,48,-14);x.lineTo(48,-2);x.closePath();x.fill();x.stroke();
    x.fillStyle=hcSh(paint,-.35);for(let i=0;i<4;i++)x.fillRect(16+i*7,-22,3,14);
    x.strokeStyle=hcC('k2');x.lineWidth=3.5;x.beginPath();x.moveTo(-42,-4);x.lineTo(-42,-64);x.lineTo(-8,-64);x.lineTo(-8,-4);x.stroke();x.fillStyle=hcSh(paint,-.2);rr(x,-46,-68,42,6,3);x.fill();
    x.fillStyle=hcA('c1',.6);x.fillRect(-40,-60,30,30);hcHead(x,-25,-40,10,paint);
    x.fillStyle=hcC('e3');x.fillRect(28,-46,5,20);x.fillStyle=hcC('k2');x.fillRect(27,-48,7,4);x.fillStyle=hcC('y1');rr(x,44,-20,6,7,2);x.fill()}
  else if(type=='bus'){
    const yb=x.createLinearGradient(0,-50,0,8);yb.addColorStop(0,hcC('y1'));yb.addColorStop(.5,hcC('y'));yb.addColorStop(1,hcC('y2'));x.fillStyle=yb;x.strokeStyle=hcC('n3');x.lineWidth=2;
    x.beginPath();x.moveTo(-68,6);x.lineTo(-68,-42);x.quadraticCurveTo(-68,-50,-60,-50);x.lineTo(56,-50);x.quadraticCurveTo(64,-50,66,-42);x.lineTo(70,-20);x.lineTo(70,6);x.closePath();x.fill();x.stroke();
    x.fillStyle=paint;x.fillRect(-68,-14,138,5);x.fillStyle=hcC('k');x.fillRect(-68,-4,138,3);
    for(let i=0;i<6;i++){x.fillStyle=hcC('c1');rr(x,-62+i*19,-44,15,16,3);x.fill();if(i%2==0){x.fillStyle=hcC(['s','s2','s3'][i/2]);x.beginPath();x.arc(-54.5+i*19,-33,4.5,0,7);x.fill()}}
    x.fillStyle=hcC('c1');x.beginPath();x.moveTo(52,-44);x.lineTo(62,-44);x.lineTo(66,-24);x.lineTo(52,-24);x.closePath();x.fill();hcHead(x,58,-32,6,paint);
    x.fillStyle=hcC('k');x.font='bold 7px sans-serif';x.fillText('SCHOOL BUS',0,-20);x.fillStyle=hcC('y1');rr(x,66,-14,5,7,2);x.fill();x.fillStyle=hcC('r');rr(x,-70,-40,4,8,2);x.fill();x.fillStyle=hcC('r2');x.fillRect(-72,-30,4,10)}
  else{
    x.fillStyle=gb;x.strokeStyle=edge;x.lineWidth=2;
    x.beginPath();x.moveTo(-58,4);x.lineTo(-58,-12);x.quadraticCurveTo(-58,-18,-50,-18);x.lineTo(-24,-18);x.lineTo(-16,-42);x.lineTo(16,-42);x.lineTo(28,-18);x.lineTo(52,-16);x.quadraticCurveTo(60,-14,60,-6);x.lineTo(60,4);x.closePath();x.fill();x.stroke();
    x.fillStyle=hcSh(paint,-.45);rr(x,-56,-2,114,8,3);x.fill();x.fillStyle=hcA('w',.5);rr(x,-48,-15,22,3,1.5);x.fill();rr(x,32,-13,16,3,1.5);x.fill();
    x.fillStyle=hcC('c1');x.beginPath();x.moveTo(-12,-20);x.lineTo(-7,-37);x.lineTo(12,-37);x.lineTo(22,-20);x.closePath();x.fill();
    hcHead(x,5,-28,9.5,paint);
    x.strokeStyle=hcC('k2');x.lineWidth=3;x.beginPath();x.moveTo(-24,-18);x.lineTo(-16,-46);x.lineTo(16,-46);x.lineTo(28,-18);x.stroke();
    x.fillStyle=hcC('y1');rr(x,55,-12,6,7,2);x.fill();x.fillStyle=hcC('r');rr(x,-60,-12,4,7,2);x.fill();x.fillStyle=hcC('e2');rr(x,-64,-4,10,4,2);x.fill()}
  if(dec&&dec.top){const a=HC_TOPA[type]||HC_TOPA.jeep;hcTopper(x,a[0],a[1],1,dec.top)}
  x.restore();
  if(rot1==null)return; // the body only (the drive's cached sprite)
  const rim=dec&&dec.rim;wheel(x,sx,sy,ang,sc,-hw,wy,rot1,paint,V.R,rim);wheel(x,sx,sy,ang,sc,hw,wy,rot2,paint,V.R,rim)}
// a topper on its pole, the pole's foot at (px, py); the flags trail backwards (to the left)
function hcTopper(x,px,py,s,id){const t=py-36*s;x.strokeStyle=hcC('e1');x.lineWidth=2.5*s;x.lineCap='round';x.beginPath();x.moveTo(px,py);x.lineTo(px,t);x.stroke();x.lineCap='butt';
  if(id=='pennant'){x.fillStyle=hcC('y');x.strokeStyle=hcC('y3');x.lineWidth=1.2*s;x.beginPath();x.moveTo(px,t);x.lineTo(px-24*s,t+6*s);x.lineTo(px,t+12*s);x.closePath();x.fill();x.stroke()}
  else if(id=='checker'){for(let r=0;r<2;r++)for(let k=0;k<3;k++){x.fillStyle=hcC((r+k)%2?'k':'w');x.fillRect(px-(k+1)*7*s,t+r*6*s,7*s,6*s)}x.strokeStyle=hcC('k');x.lineWidth=1*s;x.strokeRect(px-21*s,t,21*s,12*s)}
  else if(id=='goldstar')hcStarD(x,px,t-5*s,10*s);
  else if(id=='sock'){for(let k=0;k<3;k++){const a=k*8*s,b=a+8*s,ha=6-k*1.3,hb=6-(k+1)*1.3;x.fillStyle=hcC(k%2?'w':'r');x.strokeStyle=hcC('r3');x.lineWidth=1*s;x.beginPath();x.moveTo(px-a,t+6*s-ha*s);x.lineTo(px-b,t+6*s-hb*s);x.lineTo(px-b,t+6*s+hb*s);x.lineTo(px-a,t+6*s+ha*s);x.closePath();x.fill();x.stroke()}}}
// a trail's bit number i: {c colour role, s size, star, ring, g (gravity: below 0 floats up)}
function hcTrailBit(id,i){
  if(id=='sparkle')return{c:'y',s:4,star:1,g:.2};
  if(id=='bubble')return{c:'c1',s:5,ring:1,g:-.35};
  if(id=='confetti')return{c:['p','y','b','g','o'][i%5],s:3.2,g:.8};
  return{c:['r','o','y','g','b','v'][i%6],s:5,g:-.05}}
function wheel(x,sx,sy,ang,sc,ox,oy,rot,paint,R=21,rim){const c=Math.cos(-ang),s=Math.sin(-ang),px=sx+(ox*c-oy*s)*sc,py=sy+(ox*s+oy*c)*sc,r=R*sc;
  x.save();x.translate(px,py);x.rotate(rot);
  x.fillStyle=hcC('k');x.beginPath();x.arc(0,0,r,0,7);x.fill();x.fillStyle=hcC('k2');x.beginPath();x.arc(0,0,r*.82,0,7);x.fill();
  x.fillStyle=hcC('k');const nb=Math.round(R*.7);for(let i=0;i<nb;i++){x.save();x.rotate(i*2*Math.PI/nb);rr(x,-2.8*sc,-r-1.6*sc,5.6*sc,4.6*sc,1.4*sc);x.fill();x.restore()}
  if(rim=='spoke'){x.strokeStyle=hcC('e1');x.lineWidth=2*sc;x.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4;x.moveTo(Math.cos(a)*r*.2,Math.sin(a)*r*.2);x.lineTo(Math.cos(a)*r*.78,Math.sin(a)*r*.78)}x.stroke()}
  if(rim=='rainbow'){const cs=['r','o','y','g','b','v'];for(let i=0;i<6;i++){x.fillStyle=hcC(cs[i]);x.beginPath();x.moveTo(0,0);x.arc(0,0,r*.6,i*Math.PI/3,(i+1)*Math.PI/3);x.closePath();x.fill()}}
  else{x.fillStyle=rim=='gold'||rim=='starrim'?hcC('y2'):paint||hcC('e');x.beginPath();x.arc(0,0,r*.5,0,7);x.fill()}
  x.fillStyle=hcC(rim=='gold'?'y':rim=='rainbow'?'w':'e1');x.beginPath();x.arc(0,0,r*(rim=='rainbow'?.22:.38),0,7);x.fill();
  if(rim=='starrim')hcStarD(x,0,0,r*.36);
  else{x.fillStyle=hcC(rim=='gold'?'y3':'e3');for(let i=0;i<5;i++){x.beginPath();x.arc(Math.cos(i*1.256)*r*.23,Math.sin(i*1.256)*r*.23,1.5*sc,0,7);x.fill()}}x.restore()}
/* ground texture per world (drawn once) */
const TEX={};
function texFor(wi){if(TEX[wi])return TEX[wi];const W=HCW[wi],c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),r=rng(wi*99+7);
  x.fillStyle=hcC(W.dirt);x.fillRect(0,0,128,128);x.fillStyle=hcC('k');
  for(let i=0;i<90;i++){x.globalAlpha=.05+r()*.12;x.beginPath();x.ellipse(r()*128,r()*128,2+r()*6,1.5+r()*4,r()*3,0,7);x.fill()}
  x.fillStyle=hcC('w');for(let i=0;i<40;i++){x.globalAlpha=.05+r()*.1;x.beginPath();x.arc(r()*128,r()*128,1+r()*2.5,0,7);x.fill()}
  x.globalAlpha=1;return TEX[wi]=c}
function hcProp(x,type,px,py,s,i){
  if(type=='tree'){const h=(46+(i*37)%26)*s;x.fillStyle=hcC('n2');x.fillRect(px-3*s,py-h*.38,6*s,h*.4);x.fillStyle=hcC(i%2?'g2':'g3');x.beginPath();x.arc(px,py-h*.62,h*.3,0,7);x.arc(px-h*.18,py-h*.5,h*.22,0,7);x.arc(px+h*.18,py-h*.5,h*.22,0,7);x.fill();x.fillStyle=hcC('g');x.beginPath();x.arc(px-h*.08,py-h*.7,h*.14,0,7);x.fill()}
  else if(type=='cactus'){const h=(40+(i*29)%24)*s;x.fillStyle=hcC('g3');rr(x,px-5*s,py-h,10*s,h,5*s);x.fill();rr(x,px-16*s,py-h*.7,8*s,h*.32,4*s);x.fill();rr(x,px-16*s,py-h*.46,14*s,7*s,3.5*s);x.fill();rr(x,px+8*s,py-h*.82,8*s,h*.36,4*s);x.fill();rr(x,px+2*s,py-h*.52,14*s,7*s,3.5*s);x.fill()}
  else if(type=='pine'){const h=(52+(i*31)%26)*s;x.fillStyle=hcC('n2');x.fillRect(px-3*s,py-h*.2,6*s,h*.22);for(let k=0;k<3;k++){const yy=py-h*(.2+k*.25),ww=h*(.32-k*.07);x.fillStyle=hcC('g3');x.beginPath();x.moveTo(px-ww,yy);x.lineTo(px,yy-h*.36);x.lineTo(px+ww,yy);x.fill();x.fillStyle=hcC('w');x.beginPath();x.moveTo(px-ww*.4,yy-h*.22);x.lineTo(px,yy-h*.36);x.lineTo(px+ww*.4,yy-h*.22);x.fill()}}
  else if(type=='palm'){const h=(70+(i*31)%30)*s,b=(i%2?1:-1)*12*s;x.strokeStyle=hcC('n2');x.lineWidth=6*s;x.lineCap='round';x.beginPath();x.moveTo(px,py);x.quadraticCurveTo(px+b,py-h*.6,px+b*.6,py-h);x.stroke();x.lineCap='butt';
    x.fillStyle=hcC(i%2?'g3':'g2');for(let k=0;k<6;k++){const a=k*1.05+.3;x.beginPath();x.moveTo(px+b*.6,py-h);x.quadraticCurveTo(px+b*.6+Math.cos(a)*h*.35,py-h-Math.sin(a)*h*.25-8*s,px+b*.6+Math.cos(a)*h*.5,py-h+h*.12);x.quadraticCurveTo(px+b*.6+Math.cos(a)*h*.25,py-h-4*s,px+b*.6,py-h);x.fill()}}
  else if(type=='deadtree'){const h=(44+(i*23)%20)*s;x.strokeStyle=hcC('k');x.lineWidth=4*s;x.beginPath();x.moveTo(px,py);x.lineTo(px,py-h);x.moveTo(px,py-h*.6);x.lineTo(px-h*.3,py-h*.9);x.moveTo(px,py-h*.45);x.lineTo(px+h*.28,py-h*.75);x.stroke()}
  else if(type=='lamp'){x.strokeStyle=hcC('k2');x.lineWidth=3*s;x.beginPath();x.moveTo(px,py);x.lineTo(px,py-60*s);x.lineTo(px+12*s,py-60*s);x.stroke();x.fillStyle=hcC('y');x.beginPath();x.arc(px+12*s,py-57*s,4*s,0,7);x.fill()}
  else if(type=='antenna'){x.strokeStyle=hcC('e1');x.lineWidth=3*s;x.beginPath();x.moveTo(px,py);x.lineTo(px,py-50*s);x.stroke();x.fillStyle=hcC('r');x.beginPath();x.arc(px,py-52*s,4*s,0,7);x.fill()}}
// a little flag on a pole (checkpoints: done = green)
function hcFlag(x,px,py,sc,col,lab){x.strokeStyle=hcC('e1');x.lineWidth=4*sc;x.beginPath();x.moveTo(px,py);x.lineTo(px,py-90*sc);x.stroke();x.fillStyle=hcC(col);x.beginPath();x.moveTo(px,py-90*sc);x.lineTo(px+40*sc,py-78*sc);x.lineTo(px,py-66*sc);x.fill();
  if(lab){x.fillStyle=hcC('w');x.strokeStyle=hcC('k');x.lineWidth=3*sc;x.font=`bold ${14*sc}px sans-serif`;x.strokeText(lab,px+20*sc,py-102*sc);x.fillText(lab,px+20*sc,py-102*sc)}}
const HC_WX={day:null,dusk:['sc-dusk','sc-peach'],night:['sc-night','sc-night-1'],rain:['sc-stone','sc-blue'],snow:['sc-stone-2','sc-sky-1'],ash:['sc-rose-2','sc-stone'],dust:['sc-sand-2','sc-sun']};
/* ---- the renderer (G-HC2, R-03 H1): on a software canvas the cost is the pixels touched each frame, so almost nothing is drawn
   as shapes per frame. Cached per drive and screen size (H.rc): the sky with its sun, moon or Earth and stars (copied only down to
   where the hills start); 3-4 parallax layers, each a strip cropped to its own band and twice the screen wide, drawn again only
   when the camera has moved past it; the ground in chunks of 320 world px (texture, water, road, mud and ice, rocks, bridges,
   roadside props) made once each; sprites for the car body, its wheels, bolts, fuel cans and particles. Per frame: image copies,
   a few small shapes (flags, balloons, rain) and the HUD numbers. The canvas holds at most 1 million pixels and drops to 0.85
   and 0.7 of them when frames run long (hcStart): on a software canvas each frame is also copied whole, so pixels cost twice. */
const HC_CW=320; // world px per ground chunk
const hcCan=(w,h)=>{const c=document.createElement('canvas');c.width=Math.max(1,Math.ceil(w));c.height=Math.max(1,Math.ceil(h));return c};
// the parallax layers: [parallax, colour role, base height (share of the screen), amplitude, f1, f2, snow caps, alpha, props]
// G-HC3 (R-03 H2): 4 ranges behind the road on every screen (a pale hazy range and the far range painted into the sky's strip,
// then two nearer strips: hills, and the near hills with trees), each fading toward the sky colour near its foot with a light rim
// on its ridge, and a foreground strip of tufts and stones in front of the earth at the bottom (parallax over 1). Each strip is
// cached and cropped to its band, so the frame copies as many pixels as before plus the low foreground band.
// pre (the sky strip only): the hazy range behind the far one [base height, amplitude, f1, f2, alpha]
function hcLayers(Wd,portrait){const a=portrait?1.45:1;
  return[[.07,Wd.far2,.5,130*a,.0028,.009,Wd.snowcap,1,0,[portrait?.4:.44,portrait?150:110,.0021,.007,.45]],
    [.18,Wd.far,.56,90*a,.0039,.012,Wd.id=='snow',1,0],[.35,Wd.mid,.6,64,.005,.013,0,1,1]]}
function hcRC(H,W,Hh,dpr){let R=H.rc;if(R&&R.W===W&&R.Hh===Hh)return R;
  const Wd=HCW[H.wi],portrait=Hh>W,sc=Math.min(Hh/470,W/(portrait?400:620))*1.05,wx=H.wx||'day',dark=wx=='night'||!!Wd.space;
  R=H.rc={W,Hh,dpr,sc,portrait,base:portrait?.66:.62,dark,lay:hcLayers(Wd,portrait).map(l=>({l,c:null,t0:0})),chunks:new Map(),spr:{}};
  // the sky is painted into the farthest layer's strip (it starts at the top of the screen); the sun, moon or Earth are drawn each frame
  const cols=HC_WX[wx]||Wd.sky;R.lay[0].sky=cols;R.skyCols=cols;
  // a cloud sprite
  R.fore={c:null,t0:0};
  const cl=hcCan(140*sc,60*sc),y=cl.getContext('2d');y.fillStyle=hcC(wx=='rain'||wx=='ash'?'e1':'w');y.beginPath();for(const[ox,oy,r]of[[30,34,22],[58,24,26],[86,30,24],[110,36,18],[64,40,22]]){y.moveTo((ox+r)*sc,oy*sc);y.arc(ox*sc,oy*sc,r*sc,0,7)}y.fill();R.cloud=cl;
  return R}
// a layer strip: twice the screen wide, cropped to the layer's band; t0 is the layer position at its left edge
function hcStrip(R,H,q,camX){const [par,col,yb,amp,f1,f2,cap,alpha,props,pre]=q.l,sc=R.sc,W=R.W,Hh=R.Hh;
  const left=(q.t0-camX*par)*sc;if(q.c&&left<=0&&left+q.c.width>=W)return left;
  q.t0=camX*par-(W*.5)/sc;const top=q.sky?0:Math.max(0,Math.floor(Hh*yb-amp*1.3*sc-(props?90*sc:0))),bot=q.bot=props?Hh:Math.min(Hh,Math.ceil(Hh*yb+amp*.25*sc+60*sc));q.top=top;
  const c=q.c&&q.c.width===Math.ceil(W*2)&&q.c.height===Math.max(1,bot-top)?q.c:hcCan(W*2,bot-top),x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);
  if(q.sky){const g=x.createLinearGradient(0,0,0,Hh);g.addColorStop(0,hcC(q.sky[0]));g.addColorStop(1,hcC(q.sky[1]));x.fillStyle=g;x.fillRect(0,0,c.width,c.height);
    if(R.dark){x.fillStyle=hcC('w');for(let t=Math.ceil(q.t0/23)*23;t<q.t0+c.width/sc;t+=23){const hsh=Math.abs(Math.sin(t*12.9898)*43758.5453)%1;if(hsh>.5)continue;x.globalAlpha=.4+hsh;const z=(1+(hsh*6|0)%3*.5)*R.dpr;x.fillRect((t-q.t0)*sc,hsh*2*Hh*.55,z,z)}x.globalAlpha=1}}
  if(pre){const [yb2,amp2,g1,g2,al2]=pre,ph=new Path2D();ph.moveTo(0,c.height);for(let sx=0;sx<=c.width+12;sx+=8){const t=q.t0*.6+sx/sc;ph.lineTo(sx,Hh*yb2-(Math.abs(Math.sin(t*g1))*amp2+Math.sin(t*g2)*amp2*.25)*sc)}
    ph.lineTo(c.width,c.height);ph.closePath();x.globalAlpha=al2;x.fillStyle=hcC(col);x.fill(ph);x.globalAlpha=1;
    const hz2=x.createLinearGradient(0,Hh*yb2-amp2*sc,0,c.height);hz2.addColorStop(0,hcA(R.skyCols[1],.15));hz2.addColorStop(1,hcA(R.skyCols[1],.55));x.fillStyle=hz2;x.fill(ph)}
  const yf=props?(t=>Hh*yb-(Math.sin(t*f1)*55+Math.sin(t*f2+1)*25)*sc):(t=>Hh*yb-(Math.abs(Math.sin(t*f1))*amp+Math.sin(t*f2)*amp*.25)*sc);
  const pts=[],path=new Path2D();path.moveTo(0,c.height);
  for(let sx=0;sx<=c.width+12;sx+=8){const y=yf(q.t0+sx/sc)-top;pts.push([sx,y]);path.lineTo(sx,y)}path.lineTo(c.width,c.height);path.closePath();
  x.globalAlpha=alpha;x.fillStyle=hcC(col);x.fill(path);x.globalAlpha=1;
  // depth: the farther the layer, the more it fades toward the sky near its foot; a light rim along the ridge
  const sk=R.skyCols[1],y0=Math.max(0,Math.min(c.height-1,Hh*yb-amp*sc-top)),hz=x.createLinearGradient(0,y0,0,c.height);
  hz.addColorStop(0,hcA(sk,par<.1?.12:0));hz.addColorStop(1,hcA(sk,par<.1?.5:par<.3?.35:.12));x.fillStyle=hz;x.fill(path);
  x.strokeStyle=hcA('w',R.dark?.12:.3);x.lineWidth=2.5*sc;x.beginPath();pts.forEach(([px,py],i)=>i?x.lineTo(px,py+1.2*sc):x.moveTo(px,py+1.2*sc));x.stroke();
  if(cap){x.fillStyle=hcC('w');for(let i=1;i<pts.length-1;i++){const[px,py]=pts[i];if(py<pts[i-1][1]&&py<=pts[i+1][1]&&py+top<Hh*yb-amp*.75*sc){x.beginPath();x.moveTo(px-20*sc,py+18*sc);x.lineTo(px,py);x.lineTo(px+20*sc,py+18*sc);x.fill()}}}
  if(props){const Wd=HCW[H.wi];for(let i=Math.floor(q.t0/150)-1;i<(q.t0+c.width/sc)/150+1;i++){const t=i*150+((i*73)%60);if((i*7)%3==0)continue;hcProp(x,Wd.prop,(t-q.t0)*sc,yf(t)-top,sc*.8,i)}
    x.fillStyle=hcC('k');x.globalAlpha=.08;x.fillRect(0,c.height*.55,c.width,c.height*.45);x.globalAlpha=1}
  q.c=c;return(q.t0-camX*par)*sc}
// G-HC3: the foreground strip: tufts, stones and mounds at the bottom edge, passing faster than the road (twice the screen wide,
// drawn again only when the camera has moved past it)
function hcFore(R,H,camX){const q=R.fore,sc=R.sc,W=R.W,Hh=R.Hh,par=1.25,Wd=HCW[H.wi];
  const left=(q.t0-camX*par)*sc;if(q.c&&left<=0&&left+q.c.width>=W)return left;
  q.t0=camX*par-(W*.5)/sc;const bh=Math.ceil(Math.min(Hh*.12,64*sc)),c=q.c&&q.c.width===Math.ceil(W*2)&&q.c.height===bh?q.c:hcCan(W*2,bh),x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);
  const grass=Wd.id=='meadow'||Wd.id=='jungle',dark=hcA('k',R.dark?.35:.2),tuft=hcC(Wd.top2);
  for(let i=Math.floor(q.t0/90)-1;i<(q.t0+c.width/sc)/90+1;i++){const hsh=Math.abs(Math.sin(i*12.9898)*43758.5453)%1;if(hsh<.3)continue;const px=(i*90+hsh*50-q.t0)*sc,r=(14+hsh*20)*sc;
    x.fillStyle=dark;x.beginPath();x.ellipse(px,c.height+r*.2,r*1.4,r,0,Math.PI,0);x.fill();
    if(grass||Wd.id=='snow'){x.fillStyle=Wd.id=='snow'?hcC('w2'):tuft;for(let k=-2;k<=2;k++){const bx=px+k*r*.45,ty=c.height-r*(.7-Math.abs(k)*.14);x.beginPath();x.moveTo(bx-3*sc,c.height-r*.25);x.lineTo(bx+k*2*sc,ty);x.lineTo(bx+3*sc,c.height-r*.25);x.fill()}}
    else{x.fillStyle=hcA('w',.18);x.beginPath();x.ellipse(px-r*.4,c.height-r*.55,r*.35,r*.18,-.3,0,7);x.fill()}}
  q.c=c;return(q.t0-camX*par)*sc}
// a ground chunk: everything on the road that never moves, drawn once
function hcChunk(R,H,k){let ch=R.chunks.get(k);if(ch)return ch;const C=H.C,Wd=HCW[H.wi],sc=R.sc,x0=k*HC_CW,x1=x0+HC_CW;
  const gH=w0=>{const i=hcIx(C,w0);if(C.fl[i]&4){const b=C.bridges.find(q=>w0>=q.x0&&w0<=q.x1);if(b){const u=Math.min(1,(w0-b.x0)/40,(b.x1-w0)/40);return b.y-90*Math.max(0,u)}}return hcH(C,w0)};
  let lo=1e9,hi=-1e9;for(let w0=x0-40;w0<=x1+40;w0+=10){const v=hcH(C,w0);lo=Math.min(lo,gH(w0),v);hi=Math.max(hi,v)}
  const top=hi+180,bot=lo-240,c=hcCan(HC_CW*sc+2,(top-bot)*sc),x=c.getContext('2d'),X=w0=>(w0-x0)*sc,Y=y=>(top-y)*sc,DY=34*sc,hd=DY/2;
  const pts=[];for(let w0=x0-30;w0<=x1+30;w0+=5)pts.push([X(w0),Y(gH(w0)),w0]);
  x.beginPath();x.moveTo(pts[0][0],c.height+2);for(const[px,py]of pts)x.lineTo(px,py+hd);x.lineTo(pts[pts.length-1][0],c.height+2);x.closePath();
  const pat=x.createPattern(texFor(H.wi),'repeat');try{pat.setTransform(new DOMMatrix().translateSelf(-x0*sc,top*sc).scaleSelf(sc*1.2,sc*1.2))}catch(e){}x.fillStyle=pat;x.fill();
  x.fillStyle=hcC('k');x.globalAlpha=.12;x.fillRect(0,Y(lo)-20*sc,c.width,c.height);x.globalAlpha=1;
  const wcol=hcC(Wd.water),wtop=hcC(Wd.pit=='lava'?'y':Wd.pit=='crater'?'e3':'c1');
  const pool=(a,b,t,u)=>{if(b<x0-40||a>x1+40)return;x.fillStyle=wcol;x.fillRect(X(a),Y(t),(b-a)*sc,(t-u)*sc);x.strokeStyle=wtop;x.lineWidth=3*sc;x.beginPath();x.moveTo(X(a),Y(t));x.lineTo(X(b),Y(t));x.stroke();
    x.fillStyle=hcA('w',.35);for(let w0=a+14;w0<b-10;w0+=46)x.fillRect(X(w0),Y(t)+5*sc,18*sc,2*sc)};
  for(const p of C.pits)if(Wd.pit!='crater')pool(p.x0+4,p.x1-4,p.y-p.d*.5,p.y-p.d);
  for(const b of C.bridges)pool(b.x0+20,b.x1-20,b.y-60,b.y-95);
  x.lineJoin='round';const road=(w,col,dy)=>{x.lineWidth=w;x.strokeStyle=col;x.beginPath();let pen=false;for(const[px,py,w0]of pts){if(C.fl[hcIx(C,w0)]&5){pen=false;continue}pen?x.lineTo(px,py+dy):x.moveTo(px,py+dy);pen=true}x.stroke()};
  road(DY,hcC(Wd.top),0);road(5*sc,hcA('w',.45),-hd+2*sc);road(3*sc,hcC(Wd.top2),hd);
  for(const s of C.soft){if(s.x1<x0-30||s.x0>x1+30)continue;const so=SOFT[s.k];x.strokeStyle=hcC(so.c);x.lineWidth=DY*.9;x.beginPath();let pen=false;for(let w0=Math.max(s.x0,x0-30);w0<=Math.min(s.x1,x1+30);w0+=6){if(C.fl[hcIx(C,w0)]&1){pen=false;continue}const py=Y(hcH(C,w0));pen?x.lineTo(X(w0),py):x.moveTo(X(w0),py);pen=true}x.stroke();
    x.fillStyle=hcC(so.c2);for(let w0=s.x0+20;w0<s.x1;w0+=45)if(w0>x0-20&&w0<x1+20){x.beginPath();x.arc(X(w0),Y(hcH(C,w0))-4*sc,3.4*sc,0,7);x.fill()}
    const mx=(s.x0+s.x1)/2;if(mx>=x0&&mx<x1){x.fillStyle=hcC(s.k=='ice'?'b3':'w');x.font=`bold ${13*sc}px sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText(so.label,X(mx),Y(hcH(C,mx)+46))}}
  for(const f of C.fords)pool(f.x0,f.x1,f.y,f.y-30);
  for(const b of C.bridges){if(b.x1<x0-30||b.x0>x1+30)continue;x.fillStyle=hcC('n2');x.fillRect(X(b.x0),Y(b.y)-hd*.4,(b.x1-b.x0)*sc,hd*.9);x.fillStyle=hcC('n');for(let w0=b.x0;w0<b.x1;w0+=24)x.fillRect(X(w0)+1,Y(b.y)-hd*.4,22*sc-2,hd*.5);
    x.strokeStyle=hcC('n3');x.lineWidth=4*sc;const n=Math.max(1,Math.round((b.x1-b.x0)/120));for(let j=0;j<=n;j++){const w0=b.x0+(b.x1-b.x0)*j/n;x.beginPath();x.moveTo(X(w0),Y(b.y)+hd*.5);x.lineTo(X(w0),Y(b.y)-46*sc);x.stroke()}
    x.lineWidth=2*sc;x.beginPath();x.moveTo(X(b.x0),Y(b.y)-42*sc);x.quadraticCurveTo(X((b.x0+b.x1)/2),Y(b.y)-30*sc,X(b.x1),Y(b.y)-42*sc);x.stroke()}
  for(const r of C.rocks){if(r.x1<x0-40||r.x0>x1+40)continue;const bx=X((r.x0+r.x1)/2),by=Y(r.y),rw=(r.x1-r.x0)/2*sc,rh=r.h*sc;x.fillStyle=hcC(Wd.space?'e':'e2');x.beginPath();x.ellipse(bx,by,rw*1.05,rh+3*sc,0,Math.PI,0);x.fill();
    x.fillStyle=hcC(Wd.space?'e1':'e');x.beginPath();x.ellipse(bx-rw*.25,by-rh*.45,rw*.45,rh*.4,0,0,7);x.fill();if(Wd.id=='snow'){x.fillStyle=hcC('w');x.beginPath();x.ellipse(bx,by-rh*.85,rw*.6,rh*.25,0,Math.PI,0);x.fill()}}
  if(Wd.id=='meadow'||Wd.id=='jungle'){x.fillStyle=hcC(Wd.top2);for(let w0=Math.ceil((x0-10)/22)*22;w0<x1+10;w0+=22){if(C.fl[hcIx(C,w0)]||C.sk[hcIx(C,w0)])continue;const px=X(w0),py=Y(hcH(C,w0))-hd+2*sc;x.beginPath();x.moveTo(px-3*sc,py);x.lineTo(px+((w0/22)%2?2:-2)*sc,py-9*sc);x.lineTo(px+3*sc,py);x.fill()}}
  if(Wd.prop)for(let i=Math.floor((x0-120)/230);i<(x1+120)/230;i++){if((i*13)%5<2)continue;const w0=i*230+((i*57)%90);if(w0<200||C.fl[hcIx(C,w0)]||C.fl[hcIx(C,w0+60)]||C.fl[hcIx(C,w0-60)])continue;hcProp(x,Wd.prop,X(w0),Y(hcH(C,w0))-hd+2*sc,sc*1.15,i+3)}
  ch={c,top,bot};R.chunks.set(k,ch);
  for(const kk of R.chunks.keys())if(kk<k-6||kk>k+6)R.chunks.delete(kk);
  return ch}
// small sprites (drawn once per screen size): a soft dot per colour, a bolt, a fuel can, the car body and its wheel
function hcDot(R,col){const k='d'+col;if(R.spr[k])return R.spr[k];const c=hcCan(32,32),x=c.getContext('2d');x.fillStyle=hcC(col);x.beginPath();x.arc(16,16,15,0,7);x.fill();return R.spr[k]=c}
function hcSpr(R,k,w,h,draw){if(R.spr[k])return R.spr[k];const c=hcCan(w,h);draw(c.getContext('2d'),c.width,c.height);return R.spr[k]=c}
function hcBody(R,H){const P=hcPetSpr(),k='body'+H.veh+H.paint+(H.top||'')+(P&&P.c?1:0);if(R.spr[k])return R.spr[k];const V=VEH[H.veh]||VEH.jeep,sc=R.sc,w=(V.L+160)*sc,h=170*sc;
  const c=hcCan(w,h);drawVehicle(c.getContext('2d'),H.veh,c.width/2,h*.6,0,sc,H.paint,null,null,0,{top:H.top});c.ox=c.width/2;c.oy=h*.6;return R.spr[k]=c}
// the sun (or the moon, or the Earth seen from the Moon) and the clouds, just after the sky
function hcSun(x,R,wx,Wd){const H=HC,W=R.W,Hh=R.Hh,sc=R.sc,T=H.calm?0:H.t;
  if(Wd.space){const ex=W*.8,ey=Hh*.17,er=34*sc;x.fillStyle=hcC('b');x.beginPath();x.arc(ex,ey,er,0,7);x.fill();x.fillStyle=hcC('g');x.beginPath();x.ellipse(ex-er*.3,ey-er*.2,er*.35,er*.5,.4,0,7);x.ellipse(ex+er*.4,ey+er*.3,er*.3,er*.25,0,0,7);x.fill();return}
  if(R.dark){x.fillStyle=hcC('m');x.beginPath();x.arc(W*.82,Hh*.15,26*sc,0,7);x.fill();x.fillStyle=hcC(R.skyCols[0]);x.beginPath();x.arc(W*.82+10*sc,Hh*.15-6*sc,24*sc,0,7);x.fill()}
  else if(wx!='rain'&&wx!='ash'){const sx0=W*.84,sy0=Hh*.14,r0=40*sc;x.fillStyle=hcA(wx=='dusk'?'o1':'y1',.5);x.beginPath();x.arc(sx0,sy0,r0*1.6,0,7);x.fill();x.fillStyle=hcC(wx=='dusk'?'o':'y');x.beginPath();x.arc(sx0,sy0,r0,0,7);x.fill()}
  x.globalAlpha=wx=='night'?.25:.9;for(let i=0;i<5;i++){const px=((i*420-H.camX*.08*sc-T*12*R.dpr)%(W+300)+W+300)%(W+300)-150;x.drawImage(R.cloud,Math.round(px),Math.round(Hh*(.06+(i%3)*.08)))}x.globalAlpha=1}
function hcDraw(x,W,Hh,dpr){const H=HC,C=H.C,Wd=HCW[H.wi],wx=H.wx||'day',cx=(H.w1.x+H.w2.x)/2,cy=(H.w1.y+H.w2.y)/2,ang=hcAng(H);
  if(Math.abs(x.canvas.width-x.canvas.clientWidth*dpr)>2)H.size();
  const R=hcRC(H,W,Hh,dpr),sc=R.sc,sp=H.speed||0,T=H.calm?0:H.t;
  if(H.camX==null){H.camX=cx;H.camY=cy}
  H.camX+=(cx+W*.1/sc-H.camX)*.09;H.camY+=(cy+30-H.camY)*.07;if(H.shake>0)H.shake-=1/60;
  const sh=H.shake>0&&!H.calm?Math.round((Math.random()-.5)*14*H.shake*dpr):0;
  const SX=wxp=>(wxp-H.camX)*sc+W*.38+sh,SY=wy=>Hh*R.base-(wy-H.camY)*sc+sh,WX=sx=>(sx-W*.38)/sc+H.camX;
  // GL-01: the 3D look draws the sky, ranges, ground and car on its own canvas; this one is cleared and carries the rest
  const gl=!!(H.gl&&!H.gl.off&&hcGlFrame(H,W,Hh,dpr,sh)),left=WX(0)-80,right=WX(W)+80;
  if(typeof FPS!='undefined')FPS.tag=gl?'3D':'2D'; // GL-01: the speed box says which look is drawing
  if(gl)x.clearRect(0,0,W,Hh);
  else{
  // sky, clouds, parallax strips
  for(const q of R.lay){const l=hcStrip(R,H,q,H.camX);x.drawImage(q.c,Math.round(l),q.top);if(q.sky)hcSun(x,R,wx,Wd)}
  // the ground: cached chunks, and plain earth under them
  const dirt=hcC(Wd.dirt2);
  for(let k=Math.floor(WX(0)/HC_CW);k<=Math.floor(WX(W)/HC_CW);k++){const ch=hcChunk(R,H,k),px=Math.round(SX(k*HC_CW)),py=Math.round(SY(ch.top));x.drawImage(ch.c,px,py);
    const yb=py+ch.c.height;if(yb<Hh){x.fillStyle=dirt;x.fillRect(px,yb-1,ch.c.width,Hh-yb+1)}}}
  x.textAlign='center';x.textBaseline='middle';
  if(gl)hcGlLabels(x,H,SX,SY,left,right,sc);
  // checkpoints, the finish, the best
  C.cps.forEach((cpx,k)=>{if(!k||cpx<left||cpx>right)return;hcFlag(x,SX(cpx),SY(hcH(C,cpx)),sc,k<=H.cpi?'g':'o',C.endless?Math.round((cpx-60)/20)+' m':'')});
  if(H.best>5){const bx=60+H.best*20;if(bx>left&&bx<right)hcFlag(x,SX(bx),SY(hcH(C,bx)),sc*1.2,'y','Best')}
  if(H.dayX&&H.dayX>left&&H.dayX<right)hcFlag(x,SX(H.dayX),SY(hcH(C,H.dayX)),sc*1.3,H.dayHit?'g':'y','Today');
  if(C.fin!=null&&C.fin>left&&C.fin<right+200){const fin=hcSpr(R,'fin',120*sc,200*sc,(y,w,h)=>{const s=sc,px=w/2,ht=150*s;y.fillStyle=hcC('e1');y.fillRect(px-50*s,h-ht,8*s,ht);y.fillRect(px+42*s,h-ht,8*s,ht);
      for(let r=0;r<2;r++)for(let c=0;c<10;c++){y.fillStyle=hcC((r+c)%2?'k':'w');y.fillRect(px-50*s+c*10*s,h-ht-20*s+r*10*s,10*s,10*s)}
      y.fillStyle=hcC('r');rr(y,px-46*s,h-ht-48*s,92*s,26*s,6*s);y.fill();y.fillStyle=hcC('w');y.font=`bold ${17*s}px sans-serif`;y.textAlign='center';y.textBaseline='middle';y.fillText('FINISH',px,h-ht-35*s)});
    x.drawImage(fin,Math.round(SX(C.fin)-fin.width/2),Math.round(SY(hcH(C,C.fin))-fin.height))}
  // pick-ups
  const can=hcSpr(R,'fuel',56*sc,56*sc,(y,w,h)=>{const px=w/2,py=h/2,s=sc;y.fillStyle=hcA('y',.35);y.beginPath();y.arc(px,py,26*s,0,7);y.fill();y.fillStyle=hcC('r2');rr(y,px-12*s,py-14*s,24*s,30*s,4*s);y.fill();
    y.fillStyle=hcC('y');y.font=`bold ${14*s}px sans-serif`;y.textAlign='center';y.textBaseline='middle';y.fillText('F',px,py+2*s);y.strokeStyle=hcC('r3');y.lineWidth=3*s;y.beginPath();y.moveTo(px-6*s,py-14*s);y.lineTo(px-6*s,py-20*s);y.lineTo(px+6*s,py-20*s);y.stroke()});
  for(let k=0;k<C.fuel.length;k++){const fx=C.fuel[k];if(fx<left||fx>right||H.took.has('f'+k))continue;x.drawImage(can,Math.round(SX(fx)-can.width/2),Math.round(SY(hcH(C,fx)+H.R+22+Math.sin(T*3)*4)-can.height/2))}
  if(H.A.ball)for(let k=0;k<C.balloons.length;k++){const bx=C.balloons[k];if(bx<left||bx>right||H.took.has('a'+k))continue;hcBalloons(x,SX(bx),SY(hcH(C,bx)+60+Math.sin(T*2)*6),sc)}
  for(const z of C.looks){if(z.x1<left||z.x0>right)continue;const on=H.stopped,lk=hcSpr(R,'look'+(on?1:0),120*sc,120*sc,(y,w,h)=>{const s=sc,px=w/2;y.fillStyle=hcC('n2');y.fillRect(px-4*s,h-70*s,8*s,70*s);
      y.fillStyle=hcC(on?'g3':'b2');rr(y,px-52*s,h-112*s,104*s,44*s,8*s);y.fill();y.fillStyle=hcC('w');y.font=`bold ${16*s}px sans-serif`;y.textAlign='center';y.textBaseline='middle';y.fillText('LOOKOUT',px,h-90*s)});
    x.fillStyle=hcA(on?'g':'b',.35);for(let q=z.x0;q<z.x1;q+=20){const a=SX(q),b=SY(hcH(C,q)),c=SX(q+12),d=SY(hcH(C,q+12));x.beginPath();x.moveTo(a,b);x.lineTo(c,d);x.lineTo(c,d+6*sc);x.lineTo(a,b+6*sc);x.fill()}
    const mx=(z.x0+z.x1)/2;x.drawImage(lk,Math.round(SX(mx)-lk.width/2),Math.round(SY(hcH(C,mx))-lk.height))}
  for(let k=0;k<C.stars.length;k++){const s=C.stars[k];if(s.x<left||s.x>right||H.took.has('s'+k))continue;hcStarD(x,SX(s.x),SY(s.y),18*sc*(1+Math.sin(T*4)*.08))}
  for(const px of C.pads){if(px<left||px>right)continue;x.fillStyle=hcC('o');for(let j=0;j<3;j++){const ax=SX(px+j*20),ay=SY(hcH(C,px+j*20));x.beginPath();x.moveTo(ax,ay-14*sc);x.lineTo(ax+12*sc,ay-8*sc);x.lineTo(ax,ay-2*sc);x.fill()}}
  const nut=hcSpr(R,'nut',28*sc,28*sc,(y,w,h)=>{const px=w/2,py=h/2,s=sc;y.fillStyle=hcC('y');y.strokeStyle=hcC('y3');y.lineWidth=2.5*s;y.beginPath();for(let q=0;q<6;q++){const a=q*1.047+.5;y[q?'lineTo':'moveTo'](px+Math.cos(a)*11*s,py+Math.sin(a)*11*s)}y.closePath();y.fill();y.stroke();
    y.fillStyle=hcC('y3');y.beginPath();y.arc(px,py,4*s,0,7);y.fill();y.fillStyle=hcA('w',.7);y.beginPath();y.arc(px-4*s,py-4*s,2*s,0,7);y.fill()});
  for(let j=Math.max(0,H.ci-3);j<C.coins.length;j++){const o=C.coins[j];if(o.x>right)break;if(o.x<left||H.took.has(j))continue;x.drawImage(nut,Math.round(SX(o.x)-nut.width/2),Math.round(SY(o.y)+Math.sin(T*4+j)*3*sc-nut.height/2))}
  if(H.pops.length){x.fillStyle=hcC('y');x.strokeStyle=hcC('n3');x.lineWidth=3*sc;x.font=`bold ${16*sc}px sans-serif`;for(const p of H.pops){x.globalAlpha=Math.min(1,p.l*2);x.strokeText('+1',SX(p.x),SY(p.y));x.fillText('+1',SX(p.x),SY(p.y))}x.globalAlpha=1}
  for(const d of H.parts){x.globalAlpha=Math.max(0,Math.min(1,d.l*1.4))*(d.smoke?.5:1);if(d.star)hcStarD(x,SX(d.x),SY(d.y),7*sc);else{const r=(d.smoke?d.s+(.8-d.l)*18:d.s)*sc;x.drawImage(hcDot(R,d.c),SX(d.x)-r,SY(d.y)-r,r*2,r*2)}}x.globalAlpha=1;
  // the car from its sprites (it blinks while it starts again); in the 3D look only its balloons are drawn here
  if(gl){if(H.ballT>0&&(H.crashT<=0||Math.floor(H.crashT*8)%2)){const lift=H.R+6,bx=SX(cx)-Math.sin(ang)*lift*sc,by=SY(cy)-Math.cos(ang)*lift*sc;hcBalloons(x,bx,by-90*sc,sc,bx,by-40*sc)}}
  else if(H.crashT<=0||Math.floor(H.crashT*8)%2){const dist=Math.max(0,(cy-hcH(C,cx))*sc);x.globalAlpha=Math.max(.05,.25-dist/600);x.drawImage(hcDot(R,'k'),SX(cx)-64*sc,SY(hcH(C,cx))-5*sc,128*sc,14*sc);x.globalAlpha=1;
    const lift=H.R+6,bx=SX(cx)-Math.sin(ang)*lift*sc,by=SY(cy)-Math.cos(ang)*lift*sc;
    if(H.ballT>0)hcBalloons(x,bx,by-90*sc,sc,bx,by-40*sc);
    const body=hcBody(R,H);x.save();x.translate(bx,by);x.rotate(-ang);x.translate(0,-H.bob*sc);x.drawImage(body,-body.ox,-body.oy);
    if(H.crates){x.scale(sc,sc);const cp={jeep:[-44,-18],buggy:[-30,-12],monster:[-50,-30],bike:[-26,-20],tractor:[14,-26],bus:[-30,-50]}[H.veh]||[-40,-18];
      for(let i=0;i<H.crates;i++){const ox=cp[0]+(i==2?9:i*18),oy=cp[1]-(i==2?17:0)-17;x.fillStyle=hcC('n');x.strokeStyle=hcC('n3');x.lineWidth=2;x.fillRect(ox,oy,17,17);x.strokeRect(ox,oy,17,17);x.beginPath();x.moveTo(ox,oy);x.lineTo(ox+17,oy+17);x.moveTo(ox+17,oy);x.lineTo(ox,oy+17);x.stroke()}}
    x.restore();
    const V=VEH[H.veh]||VEH.jeep,wr=V.R*sc,wh=hcSpr(R,'wh'+H.veh+H.paint+(H.rim||''),wr*2+8*sc,wr*2+8*sc,(y,w,h)=>wheel(y,w/2,h/2,0,sc,0,0,0,H.paint,V.R,H.rim)),c0=Math.cos(-ang),s0=Math.sin(-ang),wy=V.R+6;
    [[-V.L/2,H.w1.rot],[V.L/2,H.w2.rot]].forEach(([ox,rot])=>{const px=bx+(ox*c0-wy*s0)*sc,py=by+(ox*s0+wy*c0)*sc;x.save();x.translate(px,py);x.rotate(rot);x.drawImage(wh,-wh.width/2,-wh.height/2);x.restore()})}
  // the foreground strip (in front of the earth at the bottom)
  if(!gl){const l=hcFore(R,H,H.camX);x.drawImage(R.fore.c,Math.round(l),Hh-R.fore.c.height)}
  // weather: one path a frame
  if(wx=='rain'||wx=='snow'||wx=='ash'||wx=='dust'){const n=wx=='rain'?70:50,fall=wx=='rain'?520:wx=='dust'?30:90,drift=wx=='dust'?-260:-40;x.fillStyle=x.strokeStyle=hcC(wx=='ash'?'e3':wx=='dust'?'t':'w');x.globalAlpha=wx=='rain'?.55:.8;x.lineWidth=1.5*dpr;x.beginPath();
    for(let i=0;i<n;i++){const px=(((i*97.3+T*drift*dpr-H.camX*sc*.6)%W)+W)%W,py=(((i*61.7+T*fall*dpr)%Hh)+Hh)%Hh;if(wx=='rain'){x.moveTo(px,py);x.lineTo(px-3*dpr,py+12*dpr)}else x.rect(px,py,3*dpr,3*dpr)}
    wx=='rain'?x.stroke():x.fill();x.globalAlpha=1}
  // night: the dark is one shape with holes for the headlights and the glow round the car
  if(wx=='night'){const vx=SX(cx),vy=SY(cy)-20*sc,dx=Math.cos(ang),dy=-Math.sin(ang),L1=520*sc,s2=.42;x.fillStyle=hcA('sc-night',.72);x.beginPath();x.rect(0,0,W,Hh);
    x.moveTo(vx+dx*30*sc,vy+dy*30*sc);x.lineTo(vx+(dx*Math.cos(s2)-dy*Math.sin(s2))*L1,vy+(dy*Math.cos(s2)+dx*Math.sin(s2))*L1);x.lineTo(vx+(dx*Math.cos(-s2)-dy*Math.sin(-s2))*L1,vy+(dy*Math.cos(-s2)+dx*Math.sin(-s2))*L1);x.closePath();
    x.moveTo(vx+110*sc,vy);x.arc(vx,vy,110*sc,0,7);x.fill('evenodd');x.fillStyle=hcA('sc-night',.3);x.beginPath();x.moveTo(vx+110*sc,vy);x.arc(vx,vy,110*sc,0,7);x.fill()}
  // speedometer
  const gr=Math.min(W,Hh)*.085,gx=W/2,gy=Hh-gr*.55-10*dpr,spd=Math.round(sp/20*3.6),fr=Math.min(1,sp/(H.maxV*1.15));
  x.fillStyle=hcA('k',.65);x.beginPath();x.arc(gx,gy,gr,Math.PI,0);x.fill();x.lineWidth=gr*.12;x.strokeStyle=hcC(sp/H.maxV>.85?'r':'g');x.beginPath();x.arc(gx,gy,gr*.82,Math.PI,Math.PI+Math.PI*fr);x.stroke();
  x.fillStyle=hcC('w');x.font=`bold ${gr*.38}px sans-serif`;x.fillText(spd,gx,gy-gr*.28);x.font=`${gr*.18}px sans-serif`;x.fillText('km/h',gx,gy-gr*.02);
  hcHud(H)}
function hcBalloons(x,px,py,sc,tx,ty){const cols=['r','y','b'];x.strokeStyle=hcC('e2');x.lineWidth=1.5*sc;for(let i=0;i<3;i++){const bx=px+(i-1)*16*sc,by=py-(i==1?10:0)*sc;x.beginPath();x.moveTo(bx,by+16*sc);x.lineTo(tx??px,ty??py+50*sc);x.stroke()}
  for(let i=0;i<3;i++){const bx=px+(i-1)*16*sc,by=py-(i==1?10:0)*sc;x.fillStyle=hcC(cols[i]);x.beginPath();x.ellipse(bx,by,12*sc,15*sc,0,0,7);x.fill();x.fillStyle=hcA('w',.6);x.beginPath();x.ellipse(bx-4*sc,by-5*sc,3*sc,5*sc,-.4,0,7);x.fill()}}
function hcStarD(x,px,py,r){x.fillStyle=hcC('y');x.strokeStyle=hcC('y3');x.lineWidth=Math.max(1,r*.12);x.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?r*.45:r;x.lineTo(px+Math.cos(a)*q,py+Math.sin(a)*q)}x.closePath();x.fill();x.stroke()}
// the HUD numbers (DOM): fuel gauge, distance or distance to the flag, bolts
function hcHud(H){const f=$('#hcf');if(f){const v=Math.round(H.fuel);if(v!==H._fv){H._fv=v;f.style.transform=`scaleX(${(v/100).toFixed(2)})`;f.parentNode.parentNode.classList.toggle('low',v<25)}}
  const C=H.C,m=Math.floor((H.maxX-60)/20),d=$('#hcd');
  if(d){const L=C.fin!=null?Math.floor((C.fin-60)/20):0,txt=C.fin!=null?`${Math.min(m,L)} / ${L} m`:`${m} m`;if(txt!==H._dt){H._dt=txt;d.textContent=txt;const pb=$('#hcpb'),goal=C.fin!=null?L:Math.max(H.best,100)*1.05;if(pb)pb.style.transform=`scaleX(${Math.min(1,m/goal).toFixed(3)})`;
    const bs=$('#hcbest');if(bs){bs.style.left=Math.min(100,H.best/goal*100)+'%';bs.style.display=C.fin==null&&H.best>5?'block':'none'}}}
  const b=$('#hcb');if(b&&b.textContent!=String(H.bolts))b.textContent=H.bolts}
/* ---------- 4x4 Hill Climb in 2.5D (GL-01): the WebGL look, on the GLX layer (60-gl.js) ----------
   Only the drawing changes: hcNew / hcStep, the controls, stages, stars and saves are the same code as the 2D look. hcStart puts a
   WebGL canvas (#hcgl) under the 2D canvas (#hcv); each frame hcDraw moves the camera as before, then hcGlFrame draws the world
   in 3D and the 2D canvas, cleared, carries only the small things on top (flags, bolts, fuel, stars, dust, rain, the night, the
   speedometer, the patch names). The 2D look (62-hill.js) stays and is used when WebGL is missing or fails or is drawn by the CPU
   (no GPU: HGL.soft), when the context is lost, when a grown-up turns the 3D look off (Grown-ups, Tablet speed: S.hcGl = false), and for the rest of the visit when the
   frame rate stays low even at the lowest pixel scale (hcGlDrop).
   The scene (world units = the simulation's pixels; x along the road, y up, z toward the viewer):
   - The camera (GLX.side) sits HGL.E above and HGL.EX ahead of the 2D camera, HGL.D back. The plane z = 0, where the car and every
     pick-up live, lands on the screen exactly where the 2D look draws it, so the 2D layer on top lines up.
   - The ground in chunks of HGL.CW: the road's top from z = ZF (front) to -ZB (back), lit by its slope; a grass edge and the earth
     on the front face (z = ZF, the world's dirt texture, darker further down); a verge behind the road to -ZV with the world's
     roadside things (trees, cacti, pines ...) standing on it in two rows; water or lava in gaps, fords and under bridges; bridges
     as plank boxes on posts; rocks as lit slabs. One mesh per chunk and kind, made once.
   - Behind: the sky (a screen gradient, stars at night), the sun, moon or Earth and the clouds, then the ranges of the 2D look as
     meshes far back in z (real parallax), shaded by their slopes with a light rim and haze toward the sky at their feet; snow on
     the peaks; trees on the near hills. In front: the foreground tufts and stones (z > ZF).
   - The car: its 2D body art (the paint, toppers and the child's pet) as a stack of slices through the body's depth, darker
     inside, so it has sides; four wheels as lit cylinders with the rim art on their caps; crates as lit boxes; a soft shadow.
   Draw calls stay low (about 25), nothing is allocated per frame (one sprite batch refilled; matrices reused). Colours are the
   --ill-* and --sc-* tokens (hcC). */
// soft: also draw in 3D when WebGL is drawn by the CPU (GLX R.soft: no GPU). Off: there the 2D look is faster. tools/smoke.js and
// the screenshots turn it on, because headless Chrome draws WebGL with SwiftShader.
const HGL = { D: 700, E: 250, EX: 80, ZF: 60, ZB: 60, ZV: 360, CW: 640, near: 40, far: 40000, LAY: 60, soft: false };
let HC_GLOFF = false; // set for the rest of the visit when the 3D look was too slow (hcGlDrop)
// the 3D look is wanted: not turned off by a grown-up, not dropped for speed this visit
const hcGlWant = () => S.hcGl !== false && !HC_GLOFF;
// make the renderer on canvas cv for drive H; null when WebGL is missing or fails (the drive then draws in 2D)
function hcGlStart(H, cv) {
  if (!hcGlWant()) return null;
  const R = GLX.init(cv);
  if (!R) return null;
  if (R.soft && !HGL.soft) { GLX.end(R); H.glWhy = 'software'; return null; }
  const G = { R, cv, ch: new Map(), lays: null, W: 0, Hh: 0, col: {}, B: GLX.batch(R, 64), VP: null, mvp: new Float32Array(16), M: new Float32Array(16), mm: new Array(16).fill(0),
    tmp: new Array(16).fill(0), y0: null, slow: 0, off: false, frames: 0, q: 1, fq: 0, ps: 0, pf: 0,
    VP: new Array(16).fill(0), VP32: new Float32Array(16), SCR: new Float32Array(16), SCR2: new Float32Array(16) };
  // the draw options, made once and reused every frame (M is the model matrix hgMVP keeps)
  G.O = { dirt: { tex: null }, lit: { M: G.M }, cut: { tex: null, cut: .5 }, sil: { tex: null, cut: .5 }, tyre: { M: G.M, A: .5 }, crates: { M: G.M, n: 0 }, sh: { tex: null, T: [1, 1, 1, 1] },
    far: [.62, .62, .62, 1], tn: [1, 1, 1, 1], cloud: [1, 1, 1, .9] };
  return G;
}
// the 3D look stops for this drive (and for the rest of the visit when it was too slow); the 2D look takes over at once
function hcGlDrop(H, why) {
  const G = H.gl;
  if (!G) return;
  G.off = true;
  if (why == 'slow') HC_GLOFF = true;
  try { G.cv.style.display = 'none'; } catch (e) {}
  H.glWhy = why;
}
// frames running long: the 3D canvas first draws fewer pixels (.8, .64, then .5 of them a side, stretched to the screen), before
// the drive's own pixel steps (hcStart) and, last, the 2D look (hcGlDrop). True when it stepped (the drive's counters start again).
function hcGlPace(H, dt) {
  const G = H.gl;
  if (!G || G.off) return false;
  if (dt > .026) G.ps++; else if (dt > 0) G.pf++;
  if (G.ps + G.pf < 20) return false;
  const slow = G.ps > 10;
  G.ps = G.pf = 0;
  if (slow && G.q > .51) { G.q = G.q > .9 ? .8 : G.q > .7 ? .64 : .5; return true; }
  return false;
}
const hgC = (G, role) => G.col[role] || (G.col[role] = GLX.rgb(hcC(role)));
// mvp = VP x (translate (x, y, z), turn a about z); M keeps the model matrix (for the lit program's normals)
function hgMVP(G, x, y, z, a) { GLX.model(G.mm, x, y, z, a || 0); for (let i = 0; i < 16; i++) G.M[i] = G.mm[i]; GLX.mul(G.tmp, G.VP, G.mm); G.mvp.set(G.tmp); return G.mvp; }
// the screen height of the 2D look's range at layer position t (hcStrip's ridge)
const hgRidge = (L, t, Hh, sc) => L.props ? Hh * L.yb - (Math.sin(t * L.f1) * 55 + Math.sin(t * L.f2 + 1) * 25) * sc : Hh * L.yb - (Math.abs(Math.sin(t * L.f1)) * L.amp + Math.sin(t * L.f2) * L.amp * .25) * sc;
// the layers of the 2D look (hcLayers) and the hazy range behind them, far to near
function hgLayers(Wd, portrait) {
  const ls = hcLayers(Wd, portrait), out = [], pre = ls[0][9];
  if (pre) out.push({ par: .042, col: ls[0][1], yb: pre[0], amp: pre[1], f1: pre[2], f2: pre[3], alpha: pre[4], haze: [.15, .55] });
  for (const [par, col, yb, amp, f1, f2, cap, alpha, props] of ls) out.push({ par, col, yb, amp, f1, f2, cap, alpha, props, haze: par < .1 ? [.12, .5] : par < .3 ? [0, .35] : [0, .12] });
  return out;
}
// the roadside things of a world as a texture: four variants side by side (cells of 140 x 170 units at 1.6 pixels a unit)
function hgPropTex(G, Wd) {
  if (G.props !== undefined) return G.props;
  if (!Wd.prop) return G.props = null;
  const A = 1.6, cw = 140, chh = 170, c = hcCan(cw * A * 4, chh * A), x = c.getContext('2d');
  for (let v = 0; v < 4; v++) hcProp(x, Wd.prop, (v + .5) * cw * A, chh * A - 3, 1.15 * A, v);
  return G.props = { c, cw, chh };
}
// a range as a mesh: rows from the ridge (light rim) down past the screen's foot, haze toward the sky colour at the foot
function hgLayerMesh(G, H, L, t0, t1) {
  const R = G.R, sc = G.sc, Hh = G.Hh, cy0 = Hh * G.base - HGL.E * sc + HGL.LAY * sc, par = L.par, Z = HGL.D - HGL.D / par, X0 = t0 / par, o = [], sp = [];
  const col = hgC(G, L.col), sky = hgC(G, G.skyCols[1]), wh = hgC(G, 'w'), rim = G.dark ? .1 : .3, a = L.alpha;
  // the foot: as low as the 2D look's strip (the nearest range reaches the bottom of the screen)
  const P = (t, sy, z = 0) => [t / par - X0, (cy0 - sy) / (sc * par), Z + z], foot = L.props ? Hh * 1.25 : Math.min(Hh * 1.25, Hh * L.yb + L.amp * .25 * sc + 60 * sc + HGL.LAY * sc), dt = 8 / sc;
  const C4 = (c, al) => [c[0], c[1], c[2], al];
  let prev = null;
  for (let t = t0; t <= t1 + dt; t += dt) {
    const sy = hgRidge(L, t, Hh, sc), sl = (hgRidge(L, t + dt, Hh, sc) - hgRidge(L, t - dt, Hh, sc)) / 16, lit = 1 + Math.max(-1, Math.min(1, -sl)) * .2;
    const base = GLX.mulc(col, lit), top0 = Hh * L.yb - L.amp * sc, hz = y => L.haze[0] + (L.haze[1] - L.haze[0]) * Math.max(0, Math.min(1, (y - top0) / Math.max(1, foot - top0)));
    const rows = [[sy, C4(GLX.mix(base, wh, rim), a)], [sy + 3 * sc, C4(base, a)], [sy + (foot - sy) * .4, C4(GLX.mix(col, sky, hz(sy + (foot - sy) * .4)), a)], [foot, C4(GLX.mix(col, sky, L.haze[1]), a)]].map(([y, c]) => [P(t, y), c]);
    if (prev) for (let r = 0; r < 3; r++) GLX.quad(o, 'grad', prev[r + 1][0], rows[r + 1][0], rows[r][0], prev[r][0], prev[r + 1][1], rows[r + 1][1], rows[r][1], prev[r][1]);
    prev = rows;
  }
  // snow on the peaks (the 2D look's caps)
  if (L.cap) for (let t = t0 + dt; t < t1; t += dt) {
    const y = hgRidge(L, t, Hh, sc);
    if (y < hgRidge(L, t - dt, Hh, sc) && y <= hgRidge(L, t + dt, Hh, sc) && y < Hh * L.yb - L.amp * .75 * sc) {
      const w = [wh[0], wh[1], wh[2], 1];
      o.push(...P(t - 20, y + 18 * sc, .5), ...w, ...P(t + 20, y + 18 * sc, .5), ...w, ...P(t, y, .5), ...w);
    }
  }
  // trees on the near hills
  const PT = L.props && hgPropTex(G, HCW[H.wi]);
  if (PT) for (let i = Math.floor(t0 / 150) - 1; i < t1 / 150 + 1; i++) {
    const t = i * 150 + ((i * 73) % 60);
    if ((i * 7) % 3 == 0) continue;
    const sy = hgRidge(L, t, Hh, sc), v = ((i % 4) + 4) % 4, s = .8 / par, w = PT.cw * s, h = PT.chh * s, b = P(t, sy, 1), x = b[0], y = b[1] - 4 * s;
    GLX.quad(sp, 'spr', [x - w / 2, y, b[2]], [x + w / 2, y, b[2]], [x + w / 2, y + h, b[2]], [x - w / 2, y + h, b[2]], [.85, .85, .9, 1], 0, 0, 0, [[v / 4, 1], [(v + 1) / 4, 1], [(v + 1) / 4, 0], [v / 4, 0]]);
  }
  if (L.m) GLX.free(R, L.m);
  if (L.sp) GLX.free(R, L.sp);
  L.m = GLX.arr(R, 'grad', o); L.sp = GLX.arr(R, 'spr', sp); L.t0 = t0; L.t1 = t1; L.X0 = X0; L.Z = Z;
}
// the foreground strip (hcFore): stones and tufts at the foot of the screen, nearer than the road (z > ZF)
function hgForeMesh(G, H, L, t0, t1) {
  const R = G.R, sc = G.sc, Hh = G.Hh, cy0 = Hh * G.base - HGL.E * sc - 0, par = 1.25, Z = HGL.D - HGL.D / par, X0 = t0 / par, o = [], Wd = HCW[H.wi];
  const P = (t, sy) => [t / par - X0, (cy0 - sy) / (sc * par), Z], k = hgC(G, 'k'), dk = [k[0], k[1], k[2], G.dark ? .35 : .2], tuft = hgC(G, Wd.id == 'snow' ? 'w2' : Wd.top2), wh = hgC(G, 'w');
  const grass = Wd.id == 'meadow' || Wd.id == 'jungle' || Wd.id == 'snow', bot = Hh + 2;
  for (let i = Math.floor(t0 / 90) - 1; i < t1 / 90 + 1; i++) {
    const hsh = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
    if (hsh < .3) continue;
    const t = i * 90 + hsh * 50, r = (14 + hsh * 20) * sc, c = P(t, bot + r * .2);
    for (let s = 0; s < 8; s++) {
      const a0 = Math.PI * s / 8, a1 = Math.PI * (s + 1) / 8, p0 = P(t + Math.cos(a0) * r * 1.4 / sc, bot + r * .2 - Math.sin(a0) * r), p1 = P(t + Math.cos(a1) * r * 1.4 / sc, bot + r * .2 - Math.sin(a1) * r);
      o.push(...c, ...dk, ...p0, ...dk, ...p1, ...dk);
    }
    if (grass) for (let q = -2; q <= 2; q++) {
      const bx = t + q * r * .45 / sc, ty = bot - r * (.7 - Math.abs(q) * .14) - 0, w = [tuft[0], tuft[1], tuft[2], 1];
      o.push(...P(bx - 3, bot - r * .25), ...w, ...P(bx + 3, bot - r * .25), ...w, ...P(bx + q * 2, ty), ...w);
    } else { const w = [wh[0], wh[1], wh[2], .18], cx = t - r * .4 / sc, cyy = bot - r * .55; for (let s = 0; s < 6; s++) { const a0 = s / 6 * 6.283, a1 = (s + 1) / 6 * 6.283; o.push(...P(cx, cyy), ...w, ...P(cx + Math.cos(a0) * r * .35 / sc, cyy + Math.sin(a0) * r * .18), ...w, ...P(cx + Math.cos(a1) * r * .35 / sc, cyy + Math.sin(a1) * r * .18), ...w); } }
  }
  if (L.m) GLX.free(R, L.m);
  L.m = GLX.arr(R, 'grad', o); L.t0 = t0; L.t1 = t1; L.X0 = X0; L.Z = Z; L.par = par;
}
// a ground chunk (HGL.CW units from x0 = k CW): road, front face, verge, water, bridges, rocks, roadside things
function hgChunk(G, H, k) {
  let ch = G.ch.get(k);
  if (ch) return ch;
  const R = G.R, C = H.C, Wd = HCW[H.wi], x0 = k * HGL.CW, x1 = x0 + HGL.CW, ZF = HGL.ZF, ZB = HGL.ZB, ZV = HGL.ZV, L = GLX.SUN;
  const gH = w0 => { const i = hcIx(C, w0); if (C.fl[i] & 4) { const b = C.bridges.find(q => w0 >= q.x0 && w0 <= q.x1); if (b) { const u = Math.min(1, (w0 - b.x0) / 40, (b.x1 - w0) / 40); return b.y - 90 * Math.max(0, u); } } return hcH(C, w0); };
  const top = hgC(G, Wd.top), top2 = hgC(G, Wd.top2), dirt = hgC(G, Wd.dirt), sky = hgC(G, G.skyCols[1]), wh = hgC(G, 'w');
  const g = [], f = [], l = [], nr = [], sp = [], xs = [], ys = [], cs = [], lit = [];
  let lo = 1e9;
  for (let w0 = x0 - 10; w0 <= x1 + 10; w0 += 10) {
    const y = gH(w0), i = hcIx(C, w0), sl = (gH(w0 + 10) - gH(w0 - 10)) / 20, nl = Math.hypot(sl, 1), d = Math.max(0, (-sl * L[0] + L[1]) / nl);
    const so = C.sk[i] && !(C.fl[i] & 1) ? SOFT[HC_SK[C.sk[i]]] : null;
    xs.push(w0 - x0); ys.push(y); lit.push((.7 + .3 * d) / .92);
    cs.push(C.fl[i] & 5 ? GLX.mulc(dirt, 1.05) : so ? hgC(G, so.c) : top);
    lo = Math.min(lo, y);
  }
  const n = xs.length, A1 = c => [c[0], c[1], c[2], 1];
  const bot = lo - 1500;
  for (let i = 0; i < n - 1; i++) {
    const xa = xs[i], xb = xs[i + 1], ya = ys[i], yb = ys[i + 1], ca = GLX.mulc(cs[i], lit[i]), cb = GLX.mulc(cs[i + 1], lit[i + 1]);
    // the road's top, front to back: a light lip, the road, a darker back edge
    const rows = [[ZF, .28, 1], [ZF - 5, 0, 1], [-ZB + 8, 0, .94], [-ZB, 0, .86]];
    for (let r = 0; r < 3; r++) {
      const [z0, w0, k0] = rows[r], [z1, w1, k1] = rows[r + 1];
      GLX.quad(g, 'grad', [xa, ya, z0], [xb, yb, z0], [xb, yb, z1], [xa, ya, z1], A1(GLX.mulc(GLX.mix(ca, wh, w0), k0)), A1(GLX.mulc(GLX.mix(cb, wh, w0), k0)), A1(GLX.mulc(GLX.mix(cb, wh, w1), k1)), A1(GLX.mulc(GLX.mix(ca, wh, w1), k1)));
    }
    // the verge behind the road, fading toward the sky colour at the back
    const va = GLX.mulc(top2, lit[i] * .92), vb = GLX.mulc(top2, lit[i + 1] * .92), vr = [[-ZB, 0], [-ZB - 60, .08], [-ZV, .32]];
    for (let r = 0; r < 2; r++) {
      const [z0, h0] = vr[r], [z1, h1] = vr[r + 1];
      GLX.quad(g, 'grad', [xa, ya, z0], [xb, yb, z0], [xb, yb, z1], [xa, ya, z1], A1(GLX.mix(va, sky, h0)), A1(GLX.mix(vb, sky, h0)), A1(GLX.mix(vb, sky, h1)), A1(GLX.mix(va, sky, h1)));
    }
    // the front face: the grass edge, a dark line, then the earth (textured), darker further down
    const ea = GLX.mulc(cs[i], .8), eb = GLX.mulc(cs[i + 1], .8), ln = GLX.mulc(top2, .8);
    GLX.quad(g, 'grad', [xa, ya - 14, ZF], [xb, yb - 14, ZF], [xb, yb, ZF], [xa, ya, ZF], A1(ea), A1(eb), A1(eb), A1(ea));
    GLX.quad(g, 'grad', [xa, ya - 18, ZF], [xb, yb - 18, ZF], [xb, yb - 14, ZF], [xa, ya - 14, ZF], A1(ln));
    const U = x => (x + x0) / 154, V = y => -y / 154, fr = [[0, 18, .98], [1, 120, .8], [2, 700, .55]];
    for (let r = 0; r < 3; r++) {
      const ta = ya - fr[r][1], tb = yb - fr[r][1], ba = r < 2 ? ya - fr[r + 1][1] : bot, bb = r < 2 ? yb - fr[r + 1][1] : bot, k0 = fr[r][2], k1 = r < 2 ? fr[r + 1][2] : .45;
      GLX.quad(f, 'spr', [xa, ba, ZF], [xb, bb, ZF], [xb, tb, ZF], [xa, ta, ZF], [k1, k1, k1, 1], [k1, k1, k1, 1], [k0, k0, k0, 1], [k0, k0, k0, 1], [[U(xa), V(ba)], [U(xb), V(bb)], [U(xb), V(tb)], [U(xa), V(ta)]]);
    }
    // grass blades along the front edge
    if ((Wd.id == 'meadow' || Wd.id == 'jungle') && !(C.fl[hcIx(C, xa + x0)]) && !C.sk[hcIx(C, xa + x0)] && i % 2 == 0) {
      const t2 = A1(top2), bx = xa + 5, by = ya + (yb - ya) * .5;
      g.push(bx - 3, by - 2, ZF + .6, ...t2, bx + 3, by - 2, ZF + .6, ...t2, bx + ((i / 2) % 2 ? 2 : -2), by + 9, ZF + .6, ...t2);
    }
  }
  // water (or lava) in the gaps, fords and under bridges: a top face and a front face down to the ground
  const wcol = hgC(G, Wd.water), wtop = hgC(G, Wd.pit == 'lava' ? 'y' : Wd.pit == 'crater' ? 'e3' : 'c1'), wt = GLX.mix(wcol, wtop, .3);
  const pool = (a, b, lvl) => {
    if (b < x0 - 20 || a > x1 + 20) return;
    const xa = Math.max(a, x0 - 10) - x0, xb = Math.min(b, x1 + 10) - x0;
    if (xb <= xa) return;
    GLX.quad(g, 'grad', [xa, lvl, ZF + .4], [xb, lvl, ZF + .4], [xb, lvl, -ZV], [xa, lvl, -ZV], A1(wt), A1(wt), A1(GLX.mix(wt, sky, .3)), A1(GLX.mix(wt, sky, .3)));
    for (let w0 = Math.ceil((xa + x0) / 10) * 10 - x0 - 10; w0 < xb; w0 += 10) {
      const p = Math.max(xa, w0), q = Math.min(xb, w0 + 10);
      if (q <= p) continue;
      const yp = Math.min(lvl, gH(p + x0)), yq = Math.min(lvl, gH(q + x0));
      if (yp >= lvl && yq >= lvl) continue;
      GLX.quad(g, 'grad', [p, yp, ZF + .5], [q, yq, ZF + .5], [q, lvl, ZF + .5], [p, lvl, ZF + .5], A1(GLX.mulc(wcol, .82)), A1(GLX.mulc(wcol, .82)), A1(wcol), A1(wcol));
      GLX.quad(g, 'grad', [p, lvl - 3, ZF + .6], [q, lvl - 3, ZF + .6], [q, lvl, ZF + .6], [p, lvl, ZF + .6], A1(wtop));
    }
  };
  if (Wd.pit != 'crater') for (const p of C.pits) pool(p.x0 + 4, p.x1 - 4, p.y - p.d * .5);
  for (const b of C.bridges) pool(b.x0 + 20, b.x1 - 20, b.y - 60);
  for (const fd of C.fords) pool(fd.x0, fd.x1, fd.y);
  // bridges: planks on a deck, posts and rails on both sides. The near side's posts and rail go in their own mesh (nr), drawn after
  // the car so the car stays in front of them (FIX3: the near rail at z = ZF - 10 is nearer than the car and drew over its lower body)
  const n2 = hgC(G, 'n2'), nn = hgC(G, 'n'), n3 = hgC(G, 'n3');
  for (const b of C.bridges) {
    if (b.x1 < x0 - 30 || b.x0 > x1 + 30) continue;
    const a = b.x0 - x0, e = b.x1 - x0;
    GLX.box(l, a, b.y - 10, -ZB + 6, e, b.y - 4, ZF - 6, n2);
    for (let w0 = a; w0 < e; w0 += 24) GLX.box(l, w0 + 1, b.y - 4, -ZB + 8, Math.min(e, w0 + 23), b.y, ZF - 8, nn, n2);
    const m = Math.max(1, Math.round((b.x1 - b.x0) / 120));
    for (const z of [ZF - 10, -ZB + 10]) {
      const o = z > 0 ? nr : l;
      for (let j = 0; j <= m; j++) { const w0 = a + (e - a) * j / m; GLX.box(o, w0 - 3, b.y - 40, z - 3, w0 + 3, b.y + 46, z + 3, n3); }
      GLX.box(o, a, b.y + 38, z - 1.5, e, b.y + 42, z + 1.5, n3);
    }
  }
  // rocks: the 2D look's half ellipse as a lit slab
  const rk = hgC(G, Wd.space ? 'e' : 'e2'), rk2 = hgC(G, Wd.space ? 'e1' : 'e');
  for (const r of C.rocks) {
    if (r.x1 < x0 - 40 || r.x0 > x1 + 40) continue;
    const bx = (r.x0 + r.x1) / 2 - x0, rw = (r.x1 - r.x0) / 2 * 1.05, rh = r.h + 3, pts = [];
    for (let s = 0; s <= 10; s++) { const a = Math.PI * s / 10; pts.push([bx + Math.cos(a) * rw, r.y - 12 + Math.sin(a) * (rh + 12)]); }
    GLX.extrude(l, pts, -ZB + 14, ZF - 14, rk, rk2, rk);
  }
  // roadside things on the verge, in two rows
  const PT = hgPropTex(G, Wd);
  if (PT) {
    const put = (w0, z, v, s) => {
      const y = gH(w0) - 3, w = PT.cw * s, h = PT.chh * s, x = w0 - x0, tint = GLX.mix([1, 1, 1], sky, Math.min(.4, -z / ZV * .25));
      GLX.quad(sp, 'spr', [x - w / 2, y, z], [x + w / 2, y, z], [x + w / 2, y + h, z], [x - w / 2, y + h, z], [tint[0], tint[1], tint[2], 1], 0, 0, 0, [[v / 4, 1], [(v + 1) / 4, 1], [(v + 1) / 4, 0], [v / 4, 0]]);
    };
    for (let i = Math.floor((x0 - 120) / 230); i < (x1 + 120) / 230; i++) {
      if ((i * 13) % 5 < 2) continue;
      const w0 = i * 230 + ((i * 57) % 90);
      if (w0 < x0 || w0 >= x1 || w0 < 200 || C.fl[hcIx(C, w0)] || C.fl[hcIx(C, w0 + 60)] || C.fl[hcIx(C, w0 - 60)]) continue;
      put(w0, -ZB - 45, (((i + 3) % 4) + 4) % 4, 1);
    }
    for (let i = Math.floor(x0 / 170); i < x1 / 170; i++) {
      if ((i * 7) % 3 == 0) continue;
      const w0 = i * 170 + ((i * 41) % 70);
      if (w0 < x0 || w0 >= x1 || C.fl[hcIx(C, w0)] & 1) continue;
      put(w0, -ZV + 70 + ((i * 29) % 90), ((i % 4) + 4) % 4, 1.1);
    }
  }
  ch = { k, x0, g: GLX.arr(R, 'grad', g), f: GLX.arr(R, 'spr', f), l: GLX.arr(R, 'lit', l), nr: GLX.arr(R, 'lit', nr), sp: GLX.arr(R, 'spr', sp) };
  G.ch.set(k, ch);
  for (const [kk, c] of G.ch) if (kk < k - 4 || kk > k + 4) { for (const m of [c.g, c.f, c.l, c.nr, c.sp]) GLX.free(R, m); G.ch.delete(kk); }
  return ch;
}
// the car's parts that do not change during a drive: a wheel (a lit cylinder), the crate boxes, the shadow
function hgCar(G, H) {
  if (G.car && G.car.veh === H.veh) return G.car;
  const R = G.R, V = VEH[H.veh] || VEH.jeep, bike = H.veh == 'bike', w = [], c = [], s = [], tyre = hgC(G, 'k2'), tread = GLX.mulc(hgC(G, 'k2'), .8), half = bike ? 4 : 7;
  const pts = []; for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2; pts.push([Math.cos(a) * V.R, Math.sin(a) * V.R]); }
  GLX.extrude(w, pts, -half, half, tyre, tread, tyre);
  const cn = hgC(G, 'n'), cn3 = hgC(G, 'n3'), cp = { jeep: [-44, -18], buggy: [-30, -12], monster: [-50, -30], bike: [-26, -20], tractor: [14, -26], bus: [-30, -50] }[H.veh] || [-40, -18];
  for (let i = 0; i < 3; i++) { const ox = cp[0] + (i == 2 ? 9 : i * 18), oy = cp[1] - (i == 2 ? 17 : 0) - 17; GLX.box(c, ox, -(oy + 17), -9, ox + 17, -oy, 9, cn, GLX.mix(cn, cn3, .5)); }
  GLX.quad(s, 'spr', [-58, 0, -36], [58, 0, -36], [58, 0, 36], [-58, 0, 36], [1, 1, 1, 1], 0, 0, 0, [[0, 0], [1, 0], [1, 1], [0, 1]]);
  if (G.car) for (const m of [G.car.w, G.car.c, G.car.s]) GLX.free(R, m);
  return G.car = { veh: H.veh, w: GLX.arr(R, 'lit', w), c: GLX.arr(R, 'lit', c), s: GLX.arr(R, 'spr', s), half, body: bike ? 5 : 15, wz: bike ? 0 : 26 };
}
// the box round the drawn pixels of a sprite canvas [x0, y0, x1, y1] (the slices of the car cover only its art: a cheap GPU
// pays for every pixel a quad touches, drawn or not)
function hgCrop(c) {
  if (c._crop) return c._crop;
  let b = [0, 0, c.width, c.height];
  try {
    const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data, w = c.width, h = c.height;
    let x0 = w, y0 = h, x1 = 0, y1 = 0;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (d[(y * w + x) * 4 + 3] > 8) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    if (x1 >= x0 && y1 >= y0) b = [Math.max(0, x0 - 1), Math.max(0, y0 - 1), Math.min(w, x1 + 2), Math.min(h, y1 + 2)];
  } catch (e) {}
  return c._crop = b;
}
// the sun (or the moon, or the Earth) as a small texture: the 2D look's shapes (hcSun) round the middle of the canvas
function hgSunTex(G, R2, wx, Wd) {
  if (G.sun !== undefined) return G.sun;
  const sc = R2.sc, r = 40 * sc * 1.6, c = hcCan(r * 2 + 4, r * 2 + 4), x = c.getContext('2d'), m = c.width / 2;
  if (Wd.space) { const er = 34 * sc; x.fillStyle = hcC('b'); x.beginPath(); x.arc(m, m, er, 0, 7); x.fill(); x.fillStyle = hcC('g'); x.beginPath(); x.ellipse(m - er * .3, m - er * .2, er * .35, er * .5, .4, 0, 7); x.ellipse(m + er * .4, m + er * .3, er * .3, er * .25, 0, 0, 7); x.fill(); return G.sun = { c, x: .8, y: .17 }; }
  if (R2.dark) { x.fillStyle = hcC('m'); x.beginPath(); x.arc(m, m, 26 * sc, 0, 7); x.fill(); x.fillStyle = hcC(R2.skyCols[0]); x.beginPath(); x.arc(m + 10 * sc, m - 6 * sc, 24 * sc, 0, 7); x.fill(); return G.sun = { c, x: .82, y: .15 }; }
  if (wx == 'rain' || wx == 'ash') return G.sun = null;
  const r0 = 40 * sc; x.fillStyle = hcA(wx == 'dusk' ? 'o1' : 'y1', .5); x.beginPath(); x.arc(m, m, r0 * 1.6, 0, 7); x.fill(); x.fillStyle = hcC(wx == 'dusk' ? 'o' : 'y'); x.beginPath(); x.arc(m, m, r0, 0, 7); x.fill();
  return G.sun = { c, x: .84, y: .14 };
}
// a soft round shadow (darkest in the middle)
function hgShadow(G) {
  if (G.shc) return G.shc;
  const c = hcCan(64, 64), x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 2, 32, 32, 31);
  g.addColorStop(0, hcA('k', .9)); g.addColorStop(.6, hcA('k', .5)); g.addColorStop(1, hcA('k', 0));
  x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  return G.shc = c;
}
// the sky as a screen mesh: the gradient and, at night or in space, the stars
function hgSky(G) {
  const R = G.R, W = G.W, Hh = G.Hh, o = [], a = hgC(G, G.skyCols[0]), b = hgC(G, G.skyCols[1]), A = c => [c[0], c[1], c[2], 1];
  GLX.quad(o, 'grad', [0, 0, 0], [W, 0, 0], [W, Hh, 0], [0, Hh, 0], A(a), A(a), A(b), A(b));
  if (G.dark) { const w = hgC(G, 'w'); for (let t = 0; t < W * 2; t += 23) { const h = Math.abs(Math.sin(t * 12.9898) * 43758.5453) % 1; if (h > .5) continue; const x = t / 2, y = h * 2 * Hh * .55, z = (1 + (h * 6 | 0) % 3 * .5) * G.dpr, c = [w[0], w[1], w[2], Math.min(1, .4 + h)]; GLX.quad(o, 'grad', [x, y, 0], [x + z, y, 0], [x + z, y + z, 0], [x, y + z, 0], c); } }
  if (G.sky) GLX.free(R, G.sky);
  G.sky = GLX.arr(R, 'grad', o);
}
// one frame of the 3D look; false when it cannot draw (the 2D look draws this frame instead). A failure drops to the 2D look for
// the drive and is kept in the app log (Grown-ups), never shown to the child.
function hcGlFrame(H, W, Hh, dpr, sh) {
  try { return hgFrame(H, W, Hh, dpr, sh); } catch (e) { hcGlDrop(H, 'error'); logErr('Hill Climb 3D look: ' + (e && e.message)); return false; }
}
function hgFrame(H, W, Hh, dpr, sh) {
  const G = H.gl;
  if (!G || G.off) return false;
  const R = G.R, gl = R.gl;
  if (R.lost || gl.isContextLost()) { hcGlDrop(H, 'lost'); return false; }
  const Wd = HCW[H.wi], wx = H.wx || 'day', R2 = hcRC(H, W, Hh, dpr), sc = R2.sc, D = HGL.D, T = H.calm ? 0 : H.t;
  if (G.W !== W || G.Hh !== Hh || !G.lays) {
    // a new screen size: new layers, sky and textures (the chunks are in world units and stay)
    G.W = W; G.Hh = Hh; G.sc = sc; G.base = R2.base; G.dark = R2.dark; G.skyCols = R2.skyCols; G.dpr = dpr;
    if (G.lays) for (const L of G.lays.concat(G.fore || [])) { GLX.free(R, L.m); GLX.free(R, L.sp); }
    G.lays = hgLayers(Wd, R2.portrait); G.fore = [{}]; G.sun = undefined;
    hgSky(G);
    G.fq = 0;
    G.SCR.set(GLX.screen(W, Hh, .99995)); G.SCR2.set(GLX.screen(W, Hh, .9999));
  }
  if (G.fq !== G.q) { GLX.fit(G.cv, { dpr: 1.5, px: 1e6, q: G.q }); G.fq = G.q; }
  const cv = G.cv;
  gl.viewport(0, 0, cv.width, cv.height);
  const cx = (H.w1.x + H.w2.x) / 2, cy = (H.w1.y + H.w2.y) / 2, ang = hcAng(H), ex = H.camX + HGL.EX, ey = H.camY + HGL.E;
  const px = W * .38 + HGL.EX * sc + sh, py = Hh * R2.base - HGL.E * sc + sh;
  GLX.side(W, Hh, sc, D, 0, 0, px, py, HGL.near, HGL.far, G.VP); G.VP32.set(G.VP);
  const B = G.B, O = G.O;
  if (G.y0 == null) G.y0 = H.camY;
  R.draws = 0;
  const sk = hgC(G, G.skyCols[1]);
  gl.clearColor(sk[0], sk[1], sk[2], 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  // ---- the ground (depth on) ----
  gl.enable(gl.DEPTH_TEST); gl.depthMask(true); gl.disable(gl.BLEND);
  const s0 = D / (D + HGL.ZV), xa = ex - px / (sc * s0) - 20, xb = ex + (W - px) / (sc * s0) + 20, dirt = GLX.tex(R, 'dirt' + H.wi, texFor(H.wi), true);
  const PT = hgPropTex(G, Wd), ptex = PT && GLX.tex(R, 'props', PT.c), ka = Math.floor(xa / HGL.CW), kb = Math.floor(xb / HGL.CW);
  let near = false; // a bridge's near rail in view (drawn after the car)
  for (let k = ka; k <= kb; k++) {
    const ch = hgChunk(G, H, k), mvp = hgMVP(G, ch.x0 - ex, -ey, 0);
    if (ch.nr) near = true;
    GLX.draw(R, ch.g, mvp);
    O.dirt.tex = dirt; GLX.draw(R, ch.f, mvp, O.dirt);
    if (ch.l) GLX.draw(R, ch.l, mvp, O.lit);
    if (ch.sp) { gl.enable(gl.BLEND); O.cut.tex = ptex; GLX.draw(R, ch.sp, mvp, O.cut); gl.disable(gl.BLEND); }
  }
  // ---- the car (it blinks while it starts again) ----
  if (H.crashT <= 0 || Math.floor(H.crashT * 8) % 2) {
    const K = hgCar(G, H), V = VEH[H.veh] || VEH.jeep, lift = H.R + 6, bx = cx - Math.sin(ang) * lift, by = cy + Math.cos(ang) * lift, gy = hcH(H.C, cx);
    // the shadow on the road
    gl.enable(gl.BLEND); gl.depthMask(false);
    const dist = Math.max(0, (cy - gy) * sc), al = Math.max(.08, .5 - dist / 400);
    O.sh.tex = GLX.tex(R, 'shadow', hgShadow(G)); O.sh.T[3] = al;
    GLX.draw(R, K.s, hgMVP(G, cx - ex, gy + 2 - ey, 0, hcSlope(H.C, cx)), O.sh);
    gl.depthMask(true); gl.disable(gl.BLEND);
    const wh = hcSpr(R2, 'wh' + H.veh + H.paint + (H.rim || ''), V.R * sc * 2 + 8 * sc, V.R * sc * 2 + 8 * sc, (y, w, h) => wheel(y, w / 2, h / 2, 0, sc, 0, 0, 0, H.paint, V.R, H.rim)), wtex = GLX.tex(R, 'wheel', wh), ws = wh.width / sc;
    const c0 = Math.cos(ang), s0b = Math.sin(ang), wyo = V.R + 6;
    // the wheels on one side (z): lit cylinders, then the rim art on their caps (darker on the far side)
    const wheelsAt = z => {
      gl.disable(gl.BLEND);
      for (let j = 0; j < 2; j++) { const ox = j ? V.L / 2 : -V.L / 2, rot = j ? H.w2.rot : H.w1.rot; GLX.draw(R, K.w, hgMVP(G, bx + ox * c0 + wyo * s0b - ex, by + ox * s0b - wyo * c0 - ey, z, -rot), O.tyre); }
      gl.enable(gl.BLEND);
      const t = z < 0 ? O.far : GLX.ONE;
      for (let j = 0; j < 2; j++) { const ox = j ? V.L / 2 : -V.L / 2, rot = j ? H.w2.rot : H.w1.rot; GLX.bq(B, bx + ox * c0 + wyo * s0b - ex, by + ox * s0b - wyo * c0 - ey, z + K.half + .3, ws, ws, -rot, 0, 0, 1, 1, t); }
      GLX.bflush(R, B, G.VP32, wtex, O.cut);
    };
    if (K.wz) wheelsAt(-K.wz);
    // the body: slices of its art through its depth, back (darker) to front, in the car's frame
    const body = hcBody(R2, H), cr = hgCrop(body), btex = GLX.tex(R, 'body', body), W0 = body.width, H0 = body.height;
    const bw = (cr[2] - cr[0]) / sc, bh = (cr[3] - cr[1]) / sc, bxc = ((cr[0] + cr[2]) / 2 - body.ox) / sc, byc = (body.oy - (cr[1] + cr[3]) / 2) / sc + H.bob;
    gl.enable(gl.BLEND); gl.depthMask(false);
    const NS = H.veh == 'bike' ? 3 : 7, tn = O.tn;
    for (let i = 0; i < NS; i++) { const u = i / (NS - 1), z = -K.body + 2 * K.body * u; tn[0] = tn[1] = tn[2] = i == NS - 1 ? 1 : .5 + .25 * u; GLX.bq(B, bxc, byc, z, bw, bh, 0, cr[0] / W0, cr[1] / H0, cr[2] / W0, cr[3] / H0, tn); }
    GLX.bflush(R, B, hgMVP(G, bx - ex, by - ey, 0, ang), btex);
    gl.depthMask(true); gl.disable(gl.BLEND);
    if (H.crates) { O.crates.n = H.crates * 36; GLX.draw(R, K.c, hgMVP(G, bx - ex, by - ey, 0, ang), O.crates); }
    wheelsAt(K.wz);
    if (near) {
      // FIX3: the car's outline (body slices, wheels, crates) into the depth buffer at the nearest depth, no colour, so the near rail
      // drawn next stays behind the car whatever its z (the body slices are see-through and write no depth when they are drawn)
      gl.colorMask(false, false, false, false); gl.depthRange(0, 0);
      for (let i = 0; i < NS; i++) { const u = i / (NS - 1), z = -K.body + 2 * K.body * u; GLX.bq(B, bxc, byc, z, bw, bh, 0, cr[0] / W0, cr[1] / H0, cr[2] / W0, cr[3] / H0, GLX.ONE); }
      O.sil.tex = btex; GLX.bflush(R, B, hgMVP(G, bx - ex, by - ey, 0, ang), btex, O.sil);
      if (H.crates) GLX.draw(R, K.c, hgMVP(G, bx - ex, by - ey, 0, ang), O.crates);
      for (const z of K.wz ? [-K.wz, K.wz] : [0]) for (let j = 0; j < 2; j++) { const ox = j ? V.L / 2 : -V.L / 2, rot = j ? H.w2.rot : H.w1.rot; GLX.draw(R, K.w, hgMVP(G, bx + ox * c0 + wyo * s0b - ex, by + ox * s0b - wyo * c0 - ey, z, -rot), O.tyre); }
      gl.depthRange(0, 1); gl.colorMask(true, true, true, true);
    }
  }
  // the bridges' near posts and rails: in front of the deck and the water, behind the car
  if (near) for (let k = ka; k <= kb; k++) { const ch = hgChunk(G, H, k); if (ch.nr) GLX.draw(R, ch.nr, hgMVP(G, ch.x0 - ex, -ey, 0), O.lit); }
  // ---- behind, drawn after the ground and the car so the depth test skips what they hide (a cheap GPU pays per pixel):
  //      the ranges near to far, the sky (at the far end of the depth range), then the sun and the clouds just in front of it ----
  gl.enable(gl.DEPTH_TEST); gl.depthMask(true); gl.disable(gl.BLEND);
  const vs = Math.max(-Hh * .08, Math.min(Hh * .08, (H.camY - G.y0) * sc * .12));
  for (let i = G.lays.length - 1; i >= 0; i--) if (G.lays[i].alpha >= 1) hgRange(G, H, G.lays[i], ex, px, vs);
  const SCR = G.SCR, SCR2 = G.SCR2;
  GLX.draw(R, G.sky, SCR);
  // the see-through hazy range over the sky, then the sun and clouds over both
  gl.enable(gl.BLEND); gl.depthMask(false);
  for (const L of G.lays) if (L.alpha < 1) hgRange(G, H, L, ex, px, vs);
  gl.enable(gl.BLEND);
  const sun = hgSunTex(G, R2, wx, Wd);
  if (sun) { const s = sun.c.width; GLX.bq(B, W * sun.x, Hh * sun.y, 0, s, s, 0, 0, 1, 1, 0, GLX.ONE); GLX.bflush(R, B, SCR2, GLX.tex(R, 'sun', sun.c)); }
  const ct = O.cloud, cl = R2.cloud;
  ct[3] = wx == 'night' ? .25 : .9;
  if (!Wd.space) for (let i = 0; i < 5; i++) { const x = ((i * 420 - H.camX * .08 * sc - T * 12 * dpr) % (W + 300) + W + 300) % (W + 300) - 150, y = Hh * (.06 + (i % 3) * .08); GLX.bq(B, x + cl.width / 2, y + cl.height / 2, 0, cl.width, cl.height, 0, 0, 1, 1, 0, ct); }
  GLX.bflush(R, B, SCR2, GLX.tex(R, 'cloud', cl));
  gl.depthMask(true);
  // ---- in front: the foreground tufts and stones ----
  gl.disable(gl.DEPTH_TEST); gl.enable(gl.BLEND);
  const F = G.fore[0], ftl = ex * 1.25 - px / sc, ftr = ex * 1.25 + (W - px) / sc;
  if (!F.m || ftl < F.t0 || ftr > F.t1) hgForeMesh(G, H, F, ftl - W * .6 / sc, ftr + W * .6 / sc);
  GLX.draw(R, F.m, hgMVP(G, F.X0 - ex, 0, 0));
  gl.disable(gl.BLEND);
  G.frames++;
  return true;
}
// a range: its mesh (made again when the view has moved past it) and the trees on it
function hgRange(G, H, L, ex, px, vs) {
  const R = G.R, gl = R.gl, sc = G.sc, W = G.W, tl = ex * L.par - px / sc, tr = ex * L.par + (W - px) / sc;
  if (!L.m && !L.sp || tl < L.t0 || tr > L.t1) hgLayerMesh(G, H, L, tl - W * .6 / sc, tr + W * .6 / sc);
  GLX.draw(R, L.m, hgMVP(G, L.X0 - ex, -vs * (L.par / .35) / (sc * L.par), 0));
  if (L.sp) { const was = gl.isEnabled(gl.BLEND); gl.enable(gl.BLEND); G.O.cut.tex = GLX.tex(R, 'props', G.props.c); GLX.draw(R, L.sp, G.mvp, G.O.cut); if (!was) gl.disable(gl.BLEND); }
}
// in the 3D look the 2D layer names the soft patches (the 2D look paints the names into its ground chunks)
function hcGlLabels(x, H, SX, SY, left, right, sc) {
  const C = H.C;
  for (const s of C.soft) {
    const mx = (s.x0 + s.x1) / 2;
    if (mx < left || mx > right) continue;
    x.fillStyle = hcC(s.k == 'ice' ? 'b3' : 'w'); x.font = `bold ${13 * sc}px sans-serif`; x.fillText(SOFT[s.k].label, SX(mx), SY(hcH(C, mx) + 46));
  }
}
/* ---------- game timer shared by pure games ---------- */
// P4-16: the time chip is the shared top bar's (GH.top, 59-game-hub.js); the clock holds while the pause sheet is open (GH.held).
let GT=null;
function gtStop(){if(GT){clearInterval(GT.iv);GT=null}}
function gtStart(el,onEnd){gtStop();GT={up:false,grace:0,iv:setInterval(()=>{if(!GT||document.hidden||GH.held)return;const p=pt();
  if(!GT.up){p.bank=Math.max(0,p.bank-1);p.used+=1;if(ptLeft()<=0){GT.up=true;GT.grace=20;fb('Game time is almost up!','warn long',2500);SFX.rattle()}}
  else if(--GT.grace<=0){gtStop();save();return onEnd()}
  if(p.used%5==0)save();GH.setTime($(el),GT.up?GT.grace:null)},1000)}}
// P4-16: the shared end card (GH.end) for the game on screen; NAV-01: no Play again (no time), Next (#tl) goes to Learn, Home
function timeUpOverlay(){const g=GH.get(GH.cur)||{},said=g.saved||'Your game is saved.';
  const o=GH.end(g.id,{title:"Game time's up!",lines:[['check-circle',esc(said)],['path-read','Learn a little to earn more time!']],
    btns:NAV.end3({next:'tl',home:'tlhome'})});
  SFX.chime();if(S.voice)say('Game time is up! '+said);o.querySelector('#tl').onclick=()=>{o.remove();learnHub()};o.querySelector('#tlhome').onclick=()=>{o.remove();home()}}
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
// G-ART2: pixel pictures drawn square by square: 16 rows of 16 letters (CBL names each letter's colour; '.' is the background bg)
const CBL={k:'negro',w:'blanco',r:'rojo',o:'naranja',y:'amarillo',g:'verde',G:'verde oscuro',b:'azul',B:'azul oscuro',c:'celeste',p:'rosa',v:'morado',n:'café',N:'café oscuro',e:'gris',E:'gris oscuro',t:'beige',q:'turquesa'};
function cbMap(bg,rows){return rows.split('/').join('').split('').map(c=>CBL[c=='.'?bg:c])}
CB_PICS.push( // G-ART2: opened by the picture packs (70-art.js ART_PACKS)
 ['cat','Kitty',()=>cbMap('c','................/..k..........k../..kk........kk../..kpk......kpk../..kppkkkkkkppk../..kooooooooook../.kooooyooyooook./.kooooyooyooook./.kowkooooookwok./.kokkooooookkok./.kooooooooooook./kkoooooppoooookk/.koooowkkwooook./..kkwwwwwwwwkk../....kkkkkkkk..../................')],
 ['penguin','Penguin',()=>cbMap('c','................/.....kkkkkk...../....kkkkkkkk..../...kkkwwwwkkk.../...kkwkwwkwkk.../...kkwwwwwwkk.../...kkwwyywwkk.../..kkkwyyyywkkk../.kkkkwwwwwwkkkk./.kkkwwwwwwwwkkk./.kkkwwwwwwwwkkk./..kkwwwwwwwwkk../..kkwwwwwwwwkk../...kkwwwwwwkk.../...yyy....yyy.../gggggggggggggggg')],
 ['octopus','Octopus',()=>cbMap('b','................/.....vvvvvv...../....vvvvvvvv..../...vvvvvvvvvv.../...vvpvvvvpvv.../...vwkvvvvkwv.../...vwkvvvvkwv.../...vvvvvvvvvv.../..vvvvvppvvvvv../.vvv.vvvvvv.vvv./vv.vv.vvvv.vv.vv/v..v..v..v..v..v/v.vv.vv..vv.vv.v/vv...v....v...vv/.....vv..vv...../cccccccccccccccc')],
 ['crab','Crab',()=>cbMap('t','................/.r.r........r.r./.rrr........rrr./..r..........r../..r...k..k...r../..r...k..k...r../...rrrrrrrrrr.../..rrrrrrrrrrrr../.rrrrrrrrrrrrrr./.rrrrrrrrrrrrrr./..rrrrrrrrrrrr../.r.r.r....r.r.r./r.r.r......r.r.r/................/cccccccccccccccc/bbbbbbbbbbbbbbbb')],
 ['jelly','Jellyfish',()=>cbMap('B','................/......pppp....../....pppppppp..../...pppppppppp.../..pppwppppwppp../..ppwppppppwpp../..pppppppppppp../..vvvvvvvvvvvv../...v.v.vv.v.v.../...v.v.vv.v.v.../..v..v.vv.v..v../..v.v..vv..v.v../...v.v.vv.v.v.../...v..v..v..v.../..v...v..v...v../................')],
 ['car','Little Car',()=>cbMap('c','................/................/................/................/....rrrrrr....../...rcccrcccr..../..rrcccrccccr.../.rrrrrrrrrrrrrr./yrrrrrrrrrrrrrry/rrrrrrrrrrrrrrrr/rrrkkkrrrrkkkrrr/..kkekk..kkekk../...kkk....kkk.../eeeeeeeeeeeeeeee/EEEEEEEEEEEEEEEE/eeeeeeeeeeeeeeee')],
 ['train','Train',()=>cbMap('c','................/..ww............/.wwww.........../..ee............/..ee....bbbbbbb./.rrrr...bcccccb./.rrrr...bcccccb./rrrrrrrrbbbbbbb./rrrrrrrrbbbbbbb./rrrrrrrrbbbbbbb./yrrrrrrrbbbbbbby/.kkk.kkk..kkk.../kkekkkekkkkekk../.kkk.kkk..kkk.../nnnnnnnnnnnnnnnn/eeeeeeeeeeeeeeee')],
 ['boat','Sail Boat',()=>cbMap('c','................/........r......./........rr....../.......wrrr...../......wwrrrr..../.....wwwrrrrr.../....wwwwrrrrrr../...wwwwwrrrrrrr./..wwwwwwr......./........n......./.nnnnnnnnnnnnnn./..nnyynnnnyynn../...nnnnnnnnnn.../bbbbbbbbbbbbbbbb/bwbbbbbwbbbbbbwb/BBBBBBBBBBBBBBBB')],
 ['plane','Airplane',()=>cbMap('c','................/...ww.........../..wwww.......ww./........r..wwww./........rr....../r.......rrr...../rr......rrr...../rrrwwwwwwwwwwww./rrrwbwbwbwbwwwwb/rrrwwwwwwwwwwww./rr......rrr...../r.......rrr...../........rr....../........r......./....ww......ww../...wwww....wwww.')],
 ['planet','Ringed Planet',()=>cbMap('B','w..............y/......vvvv....../....vvvvvvvv..../...vvpvvvvvvv.../..vvppvvvvvvvv../yyyyyvvvvvvvvvvv/..yyyyyyvvvvvvv./.vvvvvyyyyyyvvv./.vvvvvvvvyyyyyyy/..vvvvvvvvvyyyy./..vvvvvvvvvvvvyy/...vvvvvvvvvvvy./....vvvvvvvv..../......vvvv.....w/.w............../..........w.....')],
 ['ufo','Flying Saucer',()=>cbMap('B','w..............w/................/......cccc....../.....cccccc...../....cwccccwc..../....cccccccc..../..eeeeeeeeeeee../.eeeeeeeeeeeeee./eeyeeyeeeeyeeyee/.EEEEEEEEEEEEEE./..EEEEEEEEEEEE../....yyyyyyyy..../...yyyyyyyyyy.../..yyyyyyyyyyyy../ggggyyyyyyyygggg/gggggggggggggggg')],
 ['moon','Moon and Stars',()=>cbMap('B','................/.....yyy.....w../...yyyy........./..yyyy.......w../.yyyy.........../.yyy.......y..../yyyy......yyy.../yyyy.......y..../yyyy............/yyyyy..........w/.yyyyy........../.yyyyyy....yy.../..yyyyyyyyyy..../...yyyyyyyy...../.....yyyy......./..w.........w...')],
 ['tulip','Tulip',()=>cbMap('c','................/....r..rr..r..../....rr.rr.rr..../....rrrrrrrr..../....rrrrrrrr..../....rrrrrrrr..../.....rrrrrr...../......rrrr....../.......gg......./..gg...gg...gg../...gg..gg..gg.../....gggggggg..../.......gg......./.......gg......./gggggggggggggggg/GGGGGGGGGGGGGGGG')],
 ['leaf','Autumn Leaf',()=>cbMap('t','................/..........ooooo./........oooooooo/......ooooooyooo/.....oooooyooooo/....ooooyooooo../...oooyoooooooo./..ooyooooooooo../..oyooooooooo.../.oyoooooooo...../.yoooooooo....../yoooooo........./n.............../n.............../................/................')],
 ['snowman','Snowman',()=>cbMap('c','.......kk......./......kkkk....../......kkkk....../.....kkkkkk...../......wwww....../.....wkwwkw...../.....wwwwww...../......woow....../.....rrrrrr...../....wwwwwwww..../...wwwkwwkwww.../...wwwwwwwwww.../...wwwkwwkwww.../....wwwwwwww..../wwwwwwwwwwwwwwww/wwwwwwwwwwwwwwww')],
 ['pumpkin','Pumpkin',()=>cbMap('v','................/.......GG......./......gGGg....../......gnng....../...oooooooooo.../..oooooyyooooo../.oooooooooooooo./.ookkooooookkoo./.oookooooookooo./.oooooooooooooo./.oookooooookooo./.ooookkkkkkoooo./..oooooooooooo../...oooooooooo.../nnnnnnnnnnnnnnnn/nnnnnnnnnnnnnnnn')],
 ['umbrella','Rainy Day',()=>cbMap('e','................/.b.....r.....b../.......r......../....rrrrrrr...../..rryrryrryrr.../.rrryrryrryrrr../rrrryrryrryrrrr./rryyrryyrryyrrr./.......n......../..b....n.....b../.......n......../.......n......../.......n.n...b../..b.....n......./................/bbbbbbbbbbbbbbbb')]);
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
// how to colour a picture (G-ART2: drawn icons, no emoji)
function modeChooser(onPick,withFree){const o=document.createElement('div');o.className='ovl';
  const big=(m,ic,t,sub,cls)=>`<button class="btn game art-mode ${cls}" data-m="${m}">${ic}<span class="gi"><span class="gt">${t}</span><span class="small">${sub}</span></span></button>`,st=n=>`<span class="art-lv">${ico('star',18).repeat(n)}</span>`;
  o.innerHTML=`<div class="art-chooser"><h2>How do you want to color?</h2>
   <div class="games">${withFree?big('free',ico('palette',36),'Color It My Way','Pick any colors you like','s-read'):''}${big('num',artIco('grid',40),'Color by Number','Match the number to the color','s-es')}
   <div class="mrow art-mrow s-math">${ico('plus',32)}<span class="gt">Math Colors</span><div><button class="btn sm" data-m="math" aria-label="Math colors, easy">${st(1)}<span>Easy</span></button><button class="btn sm" data-m="math2" aria-label="Math colors, medium">${st(2)}<span>Medium</span></button><button class="btn sm" data-m="math3" aria-label="Math colors, hard">${st(3)}<span>Hard</span></button></div></div>
   <div class="mrow art-mrow s-es">${ico('speak',32)}<span class="gt">Spanish Colors</span><div><button class="btn sm" data-m="es">${ico('sound-on',22)}<span>With colors</span></button><button class="btn sm" data-m="es2">${ico('doc',22)}<span>Words only</span></button></div></div></div>${UI.btn('Cancel',{id:'mx',cls:'art-cx'})}</div>`;
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

/* ---------- art studio: mandalas, stained glass, animals, neon draw; G-ART2: Done, one gallery, picture packs ----------
   G-ART2 (R-03 T1-T5): every activity has a Done button that finishes the picture with drawn sparkles (none in calm mode or
   with reduced motion) and keeps it in ONE gallery in the main save, per child: S.studio.gal (newest first, at most GAL_MAX;
   when full the oldest picture without a heart makes room; at most GAL_HEARTS hearts). Entries are small: {i id, k kind, v the
   picture's key, n name, t time, h heart, d data}. Kinds: v (a vector page: m/g/p key + its fills packed by artPack), sh (a number
   picture: fills packed), px (pixel art: the coloured squares as hex bits, or 'all'), fp (Block Paint: one letter a square),
   n (a Neon drawing as strokes: replayable), ni (a Neon picture as an image: the drawings of the old separate store, moved in
   once by artNeonMigrate and kept with a heart, so none is ever trimmed; the old store is left as it was).
   Picture packs (ART_PACKS, a fixed visible list) open with stars: a star is a pack picture finished with Done (a number picture
   or pixel art with every square, a free page a third coloured). S.studio.done {key: 1}; pictures finished before G-ART2 (S.cbn.done,
   S.cbs.done) count. Today's picture comes from the date (artDaily): a small coin bonus the first time a day, nothing lost on a
   missed day, no streak. New fields are read with defaults, nothing is migrated except the Neon store. */
const PALS={Sunset:['#7f1d1d','#dc2626','#f97316','#fb923c','#fbbf24','#fde68a','#be185d','#f472b6','#4c1d95','#fff7ed'],
 Ocean:['#082f49','#0c4a6e','#0369a1','#0ea5e9','#7dd3fc','#e0f2fe','#134e4a','#14b8a6','#5eead4','#f0fdfa'],
 Candy:['#db2777','#f472b6','#fbcfe8','#a855f7','#d8b4fe','#60a5fa','#bfdbfe','#34d399','#fde047','#ffffff'],
 Forest:['#14532d','#166534','#22c55e','#86efac','#365314','#a3e635','#78350f','#b45309','#d6d3d1','#fef3c7'],
 Neon:['#000000','#ff00aa','#ff2d55','#ff9500','#ffee00','#39ff14','#00ffd5','#00b3ff','#7a5cff','#ffffff'],
 Earth:['#1c1917','#44403c','#78716c','#a8a29e','#e7e5e4','#7c2d12','#c2410c','#ca8a04','#3f6212','#fafaf9']};
// an old save kept the palette's name with a picture in front of it ("<picture> Ocean"): the word at the end names it
const palKey=p=>{const m=String(p||'').match(/[A-Za-z]+$/);return m&&PALS[m[0]]?m[0]:'Sunset'};
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
// the same object every time (pages keep it while the gallery adds to it), defaults filled in place
function stS(){const s=S.studio&&typeof S.studio=='object'&&!Array.isArray(S.studio)?S.studio:(S.studio={});
  if(!s.items||typeof s.items!='object')s.items={};if(!Array.isArray(s.order))s.order=[];
  if(!Array.isArray(s.gal))s.gal=[];s.gal=s.gal.filter(e=>e&&typeof e=='object'&&typeof e.k=='string');
  if(!s.done||typeof s.done!='object'||Array.isArray(s.done))s.done={};return s}

/* ---- drawn icons (no emoji): art roles var(--a-x) on a 32 grid; decoration only (the button carries the name) ---- */
const aSp=(x,y,r,c)=>`<path d="M${x} ${y-r}Q${x+r*.18} ${y-r*.18} ${x+r} ${y}Q${x+r*.18} ${y+r*.18} ${x} ${y+r}Q${x-r*.18} ${y+r*.18} ${x-r} ${y}Q${x-r*.18} ${y-r*.18} ${x} ${y-r}Z" fill="var(--a-${c})"/>`;
const AIC={
  paint:'<path d="M23 3l6 6-11 11-6-6z" fill="var(--a-n)"/><path d="M23 3l6 6-2.5 2.5-6-6z" fill="var(--a-e1)"/><path d="M11 15l6 6c-1 5-5 8-10 8-2 0-3-.5-4-1 2-2 2-4 3-7 1-4 3-6 5-6z" fill="var(--a-r)"/><path d="M8 21c-1 2-1 4-2 5" stroke="var(--a-r1)" stroke-width="2" fill="none"/>',
  crayon:'<path d="M5 27l3-8 15-15 5 5-15 15z" fill="var(--a-b)"/><path d="M5 27l3-8 5 5z" fill="var(--a-t)"/><path d="M5 27l1.3-3.7 2.4 2.4z" fill="var(--a-b2)"/><path d="M11.5 15.5l5 5M16.5 10.5l5 5" stroke="var(--a-b1)" stroke-width="2" fill="none"/>',
  marker:'<path d="M7 26l2-6 12-12 4 4-12 12z" fill="var(--a-g)"/><path d="M18 11l4 4 5-5-4-4z" fill="var(--a-e2)"/><path d="M7 26l2-6 4 4z" fill="var(--a-g2)"/><path d="M10 19l3 3" stroke="var(--a-g1)" stroke-width="2" fill="none"/>',
  glitter:aSp(12,13,9,'y')+aSp(24,8,5,'p')+aSp(23,23,6,'c')+aSp(8,26,3,'y1'),
  rainbow:'<path d="M4 25a12 12 0 0 1 24 0" stroke="var(--a-r)" stroke-width="3.4" fill="none"/><path d="M7.4 25a8.6 8.6 0 0 1 17.2 0" stroke="var(--a-y)" stroke-width="3.4" fill="none"/><path d="M10.8 25a5.2 5.2 0 0 1 10.4 0" stroke="var(--a-g)" stroke-width="3.4" fill="none"/><path d="M14.2 25a1.8 1.8 0 0 1 3.6 0" stroke="var(--a-b)" stroke-width="3" fill="none"/>',
  shiny:'<circle cx="16" cy="16" r="12" fill="var(--a-v)"/><path d="M16 28a12 12 0 0 0 12-12c0 6-6 10-12 10s-11-3-12-8a12 12 0 0 0 12 10z" fill="var(--a-v2)"/><ellipse cx="11.5" cy="10.5" rx="5" ry="3.4" fill="var(--a-v1)"/><circle cx="10" cy="10" r="1.8" fill="var(--a-w)"/>',
  erase:'<path d="M4 20l11-11 13 13-6 6h-9z" fill="var(--a-p)"/><path d="M4 20l7-7 9 9-6 6h-1z" fill="var(--a-b1)"/><path d="M4 20l7-7 2 2-7 7z" fill="var(--a-b)"/><path d="M13 28h15" stroke="var(--a-e2)" stroke-width="2" fill="none"/>',
  grid:'<rect x="4" y="4" width="11" height="11" rx="3" fill="var(--a-b)"/><rect x="17" y="4" width="11" height="11" rx="3" fill="var(--a-r)"/><rect x="4" y="17" width="11" height="11" rx="3" fill="var(--a-y)"/><rect x="17" y="17" width="11" height="11" rx="3" fill="var(--a-g)"/><path d="M6.5 8a2.5 2.5 0 0 1 2.5-2M19.5 8a2.5 2.5 0 0 1 2.5-2M6.5 21a2.5 2.5 0 0 1 2.5-2M19.5 21a2.5 2.5 0 0 1 2.5-2" stroke="var(--a-w)" stroke-width="1.6" fill="none" opacity=".8"/>',
  flower:'<circle cx="16" cy="7.5" r="5.5" fill="var(--a-p)"/><circle cx="24.5" cy="16" r="5.5" fill="var(--a-v1)"/><circle cx="16" cy="24.5" r="5.5" fill="var(--a-p)"/><circle cx="7.5" cy="16" r="5.5" fill="var(--a-v1)"/><circle cx="16" cy="16" r="5" fill="var(--a-y)"/><circle cx="14.5" cy="14.5" r="1.6" fill="var(--a-y1)"/>',
  window:'<path d="M5 29V14a11 11 0 0 1 22 0v15z" fill="var(--a-n)"/><path d="M8 27V14a8 8 0 0 1 16 0v13z" fill="var(--a-c)"/><path d="M16 6v21M8 16h16" stroke="var(--a-n)" stroke-width="2" fill="none"/><path d="M8 16V14a8 8 0 0 1 8-8v10z" fill="var(--a-r1)"/><path d="M16 16h8v11h-8z" fill="var(--a-y1)"/>',
  leaf:'<path d="M5 27C5 13 13 5 28 4c0 15-8 23-23 23z" fill="var(--a-o)"/><path d="M5 27C9 18 15 12 24 8" stroke="var(--a-o3)" stroke-width="2" fill="none"/><path d="M10 15c2 1 3 3 3 5M16 10c2 1 3 3 3 5" stroke="var(--a-o1)" stroke-width="1.8" fill="none"/>',
  fish:'<path d="M3 16c4-7 13-9 19-4l7-5v18l-7-5c-6 5-15 3-19-4z" fill="var(--a-o)"/><path d="M3 16c4 7 13 9 19 4" fill="var(--a-o2)"/><circle cx="9.5" cy="14" r="2" fill="var(--a-k)"/><path d="M14 11c1.5 3 1.5 7 0 10" stroke="var(--a-o1)" stroke-width="2" fill="none"/>',
  bfly:'<path d="M16 15C11 4 3 4 3 10s6 7 13 5z" fill="var(--a-v)"/><path d="M16 15c5-11 13-11 13-5s-6 7-13 5z" fill="var(--a-v)"/><path d="M16 17c-6-1-11 1-10 6s7 4 10-6zM16 17c6-1 11 1 10 6s-7 4-10-6z" fill="var(--a-p)"/><rect x="14.6" y="9" width="2.8" height="16" rx="1.4" fill="var(--a-k)"/>',
  bucket:'<path d="M6 11h20l-2.5 16h-15z" fill="var(--a-b)"/><path d="M6 11h20l-.6 4H6.6z" fill="var(--a-b2)"/><path d="M9 11a7 7 0 0 1 14 0" stroke="var(--a-e2)" stroke-width="2.2" fill="none"/><path d="M26 11c2 3 3 6 1 9" stroke="var(--a-r)" stroke-width="3" fill="none"/>',
  neon:'<rect x="2" y="2" width="28" height="28" rx="7" fill="var(--a-k)"/><path d="M7 22c4-12 9 2 18-12" stroke="var(--a-p)" stroke-width="5" fill="none" opacity=".45"/><path d="M7 22c4-12 9 2 18-12" stroke="var(--a-p1)" stroke-width="2.4" fill="none"/>',
  ribbon:'<rect x="2" y="2" width="28" height="28" rx="7" fill="var(--a-k)"/><path d="M5 20c4-8 7 6 11-2s7 6 11-2" stroke="var(--a-c1)" stroke-width="4" fill="none"/>',
  dots:'<rect x="2" y="2" width="28" height="28" rx="7" fill="var(--a-k)"/><circle cx="8" cy="22" r="2.6" fill="var(--a-y1)"/><circle cx="13" cy="15" r="2.6" fill="var(--a-g1)"/><circle cx="19" cy="17" r="2.6" fill="var(--a-c1)"/><circle cx="24" cy="10" r="2.6" fill="var(--a-p1)"/>',
  spark:'<rect x="2" y="2" width="28" height="28" rx="7" fill="var(--a-k)"/>'+aSp(13,14,7,'y1')+aSp(22,21,4,'p1')+aSp(22,9,2.6,'c1'),
  stars:'<rect x="2" y="2" width="28" height="28" rx="7" fill="var(--a-k)"/><path d="M11 6l1.8 3.8 4.2.5-3 2.9.8 4.1-3.8-2-3.8 2 .8-4.1-3-2.9 4.2-.5z" fill="var(--a-y1)"/><path d="M21 15l1.5 3 3.3.4-2.4 2.3.6 3.3-3-1.6-3 1.6.6-3.3-2.4-2.3 3.3-.4z" fill="var(--a-p1)"/>',
  move:'<path d="M16 3l5 5h-3.2v6.2H24V11l5 5-5 5v-3.2h-6.2V24H21l-5 5-5-5h3.2v-6.2H8V21l-5-5 5-5v3.2h6.2V8H11z" fill="var(--a-b)"/><circle cx="16" cy="16" r="2.6" fill="var(--a-b1)"/>',
  frame:'<rect x="3" y="4" width="26" height="24" rx="3" fill="var(--a-n)"/><rect x="7" y="8" width="18" height="16" fill="var(--a-c1)"/><path d="M7 24l6-8 4 5 3-3 5 6z" fill="var(--a-g)"/><circle cx="20" cy="12.5" r="2.4" fill="var(--a-y)"/>',
};
// symmetry: n spokes (1 = one line, no mirror copies)
const aSym=n=>`<circle cx="16" cy="16" r="13" fill="var(--a-v3)"/>`+(n==1?'<path d="M9 23L23 9" stroke="var(--a-v1)" stroke-width="3" fill="none"/>':
  Array.from({length:n},(_,i)=>{const a=i*2*Math.PI/n;return`<path d="M16 16L${(16+Math.sin(a)*10).toFixed(1)} ${(16-Math.cos(a)*10).toFixed(1)}" stroke="var(--a-v1)" stroke-width="${n>8?1.8:2.6}" fill="none"/>`}).join('')+'<circle cx="16" cy="16" r="2.6" fill="var(--a-y1)"/>');
function artIco(n,sz=30){const b=typeof n=='number'?aSym(n):AIC[n]||'';return`<svg class="art art-ic" viewBox="0 0 32 32" width="${sz}" height="${sz}" aria-hidden="true" focusable="false">${b}</svg>`}
// a palette button's picture: four of its own colours (artwork colours)
const palIco=p=>`<svg class="art-ic" viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false">${[[11,11],[21,11],[11,21],[21,21]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="7" fill="${PALS[p][[1,4,7,3][i]]}"/>`).join('')}</svg>`;

/* ---- fills: paint, shiny, glitter (as before) and G-ART2 crayon, marker, rainbow. A fill value is "<tool>:#rrggbb" ---- */
const ART_TOOLS=[['c','paint','Paint'],['k','crayon','Crayon'],['m','marker','Marker'],['s','glitter','Glitter'],['r','rainbow','Rainbow'],['g','shiny','Shiny'],['e','erase','Erase']];
function hueRot(c,d){let r=parseInt(c.slice(1,3),16)/255,g=parseInt(c.slice(3,5),16)/255,b=parseInt(c.slice(5,7),16)/255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;
  if(mx!=mn){const dd=mx-mn;s=l>.5?dd/(2-mx-mn):dd/(mx+mn);h=mx==r?(g-b)/dd+(g<b?6:0):mx==g?(b-r)/dd+2:(r-g)/dd+4;h*=60}
  s=Math.max(s,.55);const L=Math.min(.68,Math.max(.42,l));return`hsl(${Math.round((h+d)%360)},${Math.round(s*100)}%,${Math.round(L*100)}%)`}
function fillVal(v,defs){if(!v)return'#fff';const t=v[0],c=v.slice(2);if(t=='c'||!/^#[0-9a-f]{6}$/i.test(c))return/^#[0-9a-f]{6}$/i.test(c)?c:'#fff';
  const id={g:'gr',s:'gl',k:'cr',m:'mk',r:'rb'}[t]+c.slice(1);if(id.length<3)return c;
  if(!defs.has(id)){defs.add(id);defs.out.push(t=='g'?`<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${shade(c,.5)}"/><stop offset=".55" stop-color="${c}"/><stop offset="1" stop-color="${shade(c,-.35)}"/></linearGradient>`
    :t=='s'?`<pattern id="${id}" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="${c}"/><circle class="tw" cx="3" cy="4" r="1.3" fill="#fff" opacity=".9"/><circle cx="10" cy="9" r=".9" fill="#fff" opacity=".7"/><circle cx="6" cy="12" r=".7" fill="${shade(c,.6)}"/><circle class="tw tw2" cx="12" cy="2" r=".8" fill="${shade(c,.6)}"/></pattern>`
    :t=='k'?`<pattern id="${id}" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(28)"><rect width="7" height="7" fill="${c}"/><rect width="7" height="1.7" fill="${shade(c,.42)}" opacity=".75"/><rect y="3.9" width="7" height=".8" fill="${shade(c,-.3)}" opacity=".45"/><circle cx="2" cy="5.8" r=".55" fill="#fff" opacity=".85"/><circle cx="5.6" cy="2.6" r=".4" fill="#fff" opacity=".6"/></pattern>`
    :t=='m'?`<pattern id="${id}" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><rect width="9" height="9" fill="${c}"/><rect x="6.6" width="2.4" height="9" fill="${shade(c,-.2)}" opacity=".55"/><rect x="2.2" width="1" height="9" fill="${shade(c,.25)}" opacity=".6"/></pattern>`
    :`<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">${[0,60,120,180,240,300].map((d,i)=>`<stop offset="${(i/5).toFixed(2)}" stop-color="${hueRot(c,d)}"/>`).join('')}</linearGradient>`)}return`url(#${id})`}
function artSVG(regs,fills,o={}){const defs=new Set();defs.out=[];const body=regs.map((r,i)=>r.ov?`<path d="${r.d}" fill="none" stroke="#1c1917" stroke-width="2.2" stroke-linejoin="round" pointer-events="none"/>`:`<path d="${r.d}" ${r.t?`transform="${r.t}"`:''} data-i="${i}" ${r.fix?'pointer-events="none"':''} fill="${r.fix&&!fills[i]?r.fix:fillVal(fills[i],defs)}" stroke="${o.glass?'#1c1917':'#27272a'}" stroke-width="${o.sw||(o.glass?2.6:1.1)}" stroke-linejoin="round"/>`).join('');
  return`<svg viewBox="${o.vb||'0 0 300 300'}" ${o.id?`id="${o.id}"`:''} class="${o.cls||''}"${o.hide?' aria-hidden="true" focusable="false"':''}><defs>${defs.out.join('')}${o.glass?'<radialGradient id="glow" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>':''}</defs>${body}${o.glass?'<rect width="300" height="300" fill="url(#glow)" pointer-events="none"/>':''}</svg>`}
const artName=k=>{const[t,v]=String(k).split(':');if(t=='px'){const p=CB_PICS.find(x=>x[0]==v);return p?p[1]:'Pixel picture'}
  return t=='m'?'Mandala':t=='g'?'Rose Window':t=='p'?(POLYART[v]||{n:'Animal'}).n:(SHAPES.find(x=>x[0]==v)||[0,'Picture'])[1]};

/* ---- compact data: fills as a palette + one letter a piece; Neon points as two letters a number ---- */
const AB=(()=>{let s='';for(let c=35;c<127;c++)if(c!=92&&c!=46)s+=String.fromCharCode(c);return s})(); // 90 letters, no \ or .
function artPack(f,n){const p=[],ix={},out=[];for(let i=0;i<n;i++){const v=f[i];if(!v){out.push(-1);continue}if(!(v in ix)){ix[v]=p.length;p.push(v)}out.push(ix[v])}
  const w=p.length>AB.length?2:1,enc=k=>k<0?'.'.repeat(w):w==1?AB[k]:AB[k/AB.length|0]+AB[k%AB.length];return{p,w,s:out.map(enc).join('').replace(/\.+$/,'')}}
function artUnpack(d){const f={};if(!d||typeof d.s!='string'||!Array.isArray(d.p))return f;const w=d.w==2?2:1;
  for(let i=0;i*w<d.s.length;i++){const q=d.s.substr(i*w,w);if(q[0]=='.')continue;const k=w==1?AB.indexOf(q):AB.indexOf(q[0])*AB.length+AB.indexOf(q[1]);if(k>=0&&d.p[k]!=null)f[i]=d.p[k]}return f}
const nEnc=v=>{const q=Math.max(0,Math.min(8099,Math.round(v*8099)));return AB[q/90|0]+AB[q%90]};
const nDec=(s,i)=>(AB.indexOf(s[i])*90+AB.indexOf(s[i+1]))/8099;
const pxBits=f=>f.every(c=>c=='1')?'all':Array.from({length:Math.ceil(f.length/4)},(_,i)=>parseInt(f.slice(i*4,i*4+4).map(c=>c=='1'?1:0).join('').padEnd(4,'0'),2).toString(16)).join('');
const pxUnbits=(d,n=CBN*CBN)=>d==='all'?Array(n).fill('1'):Array.from({length:n},(_,i)=>(parseInt((d||'')[i>>2]||'0',16)>>(3-(i&3)))&1?'1':'0');

/* ---- the gallery ---- */
const GAL_MAX=30,GAL_HEARTS=24,ART_PTS=3000;
function galTrim(s){while(s.gal.length>GAL_MAX){let j=-1;for(let q=s.gal.length-1;q>=0;q--)if(!s.gal[q].h){j=q;break}if(j<0)break;s.gal.splice(j,1)}}
// add (newest first); the same picture again (a page, a number picture, pixel art) replaces its older copy and keeps its heart
function galAdd(e){const s=stS();e.i=s.gi=(+s.gi||0)+1;e.t=Date.now();e.h=0;
  if(e.v&&e.k!='n'&&e.k!='ni'&&e.k!='fp'){const j=s.gal.findIndex(x=>x.v==e.v&&x.k==e.k);if(j>=0){e.h=s.gal[j].h||0;s.gal.splice(j,1)}}
  s.gal.unshift(e);galTrim(s);return e}
const galGet=i=>stS().gal.find(e=>e.i==i);
// a heart keeps a picture when the gallery is full; false when GAL_HEARTS pictures already have one
function galHeart(i){const s=stS(),e=galGet(i);if(!e)return false;if(!e.h&&s.gal.filter(x=>x.h).length>=GAL_HEARTS)return false;e.h=e.h?0:1;save();return true}
function galDel(i){const s=stS(),n=s.gal.length;s.gal=s.gal.filter(e=>e.i!=i);save();return s.gal.length<n}
// the Neon pictures of the old separate store (P5-10: per child) move into the gallery once, each kept with a heart; the old
// store is not changed (an older cached app still finds them). Returns how many moved.
function artNeonMigrate(){const s=stS();if(s.nm)return 0;let g=[];try{g=JSON.parse(localStorage.getItem(PRF.k('starschool-neon'))||'[]')}catch(e){g=[]}
  if(!Array.isArray(g))g=[];const add=g.filter(x=>typeof x=='string'&&/^data:image\//.test(x)),t0=Date.now()-add.length*1000;
  add.slice().reverse().forEach((d,j)=>{s.gal.unshift({i:s.gi=(+s.gi||0)+1,k:'ni',v:'',n:'Neon drawing',t:t0+j*1000,h:1,d})});
  s.nm=1;save();return add.length}
// moved pictures were 360 px JPEGs (tens of KB each): make big ones smaller (288 px WebP, or JPEG where WebP cannot be made)
function artNeonShrink(){const s=stS(),big=s.gal.filter(e=>e.k=='ni'&&typeof e.d=='string'&&e.d.length>24000&&!e.sm);
  big.forEach(e=>{const im=new Image();im.onload=()=>{try{const c=document.createElement('canvas');c.width=c.height=288;c.getContext('2d').drawImage(im,0,0,288,288);
    let u=c.toDataURL('image/webp',.82);if(!/^data:image\/webp/.test(u))u=c.toDataURL('image/jpeg',.8);e.sm=1;if(u.length<e.d.length)e.d=u;save()}catch(_){}};im.src=e.d})}

/* ---- picture packs, stars, today's picture, next goal ---- */
const ART_PACKS=[
  {id:'animals',n:'Animal Friends',ic:'paw',need:0,pics:['px:cat','sh:elephant','px:penguin','p:fox','sh:lion','px:fish']},
  {id:'ocean',n:'Under the Sea',ic:'fish',need:4,pics:['px:octopus','sh:whale','px:crab','sh:turtle','px:jelly','sh:clownfish']},
  {id:'go',n:'Things That Go',ic:'car',need:8,pics:['px:car','px:train','px:boat','px:plane','px:truck','px:rocket']},
  {id:'space',n:'Into Space',ic:'rocket',need:13,pics:['px:planet','sh:rocket','px:ufo','px:moon','px:star','m:512']},
  {id:'seasons',n:'Four Seasons',ic:'leaf',need:18,pics:['px:tulip','px:sun','px:umbrella','px:leaf','px:pumpkin','px:snowman']},
  {id:'wild',n:'Wild Animals',ic:'paw',need:24,pics:['p:lion','p:tiger','p:wolf','sh:dino','p:eagle','sh:owl']},
  {id:'wings',n:'Wings and Bugs',ic:'bfly',need:30,pics:['sh:butterfly','px:ladybug','sh:parrot','p:owl','sh:peacock','sh:eagle']},
  {id:'glass',n:'Patterns and Windows',ic:'window',need:36,pics:['m:3','g:5','m:42','g:64','m:256','g:130']}];
const ART_ALL=ART_PACKS.flatMap(p=>p.pics);
// a picture is done: finished with Done (G-ART2), or a number or pixel picture finished before
function artIsDone(k){const s=stS();if(s.done[k])return true;const[t,v]=k.split(':');return t=='px'?!!cbS().done[v]:t=='sh'?!!shS().done[v]:false}
const artStars=()=>ART_ALL.filter(artIsDone).length;
const artPackOpen=(p,st=artStars())=>st>=p.need;
const artPackOf=k=>ART_PACKS.find(p=>p.pics.includes(k));
// new pixel pictures are seen once their pack is open (the twelve first ones are always open)
const cbOpen=id=>CB_PICS.findIndex(x=>x[0]==id)<12||ART_PACKS.some(p=>p.pics.includes('px:'+id)&&artPackOpen(p));
function artHash(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)>>>0}return h}
// today's picture: from the date only (the same all day on every tablet); a mandala, a rose window or a pack picture
function artDaily(d){const h=artHash('art'+d),kd=h%3,seed=1000+(h>>>4)%90000,key=kd==0?'m:'+seed:kd==1?'g:'+seed:ART_ALL[(h>>>3)%ART_ALL.length];return{key,n:artName(key)}}
function artNextGoal(){const st=artStars(),s=stS();
  for(const p of ART_PACKS){if(!artPackOpen(p,st))return`${p.need-st} more star${p.need-st==1?'':'s'} open the ${p.n} pack.`;const k=p.pics.find(q=>!artIsDone(q));
    if(k)return`Finish the ${artName(k)} in ${p.n} (${p.pics.filter(artIsDone).length} of ${p.pics.length}).`}
  return s.day!=today()?`Every pack is full! Try today's picture: ${artDaily(today()).n}.`:'Every pack is full! Make anything you like.'}
const artHubLine=()=>`<span>${ico('star',18)}<b>${artStars()}</b> of ${ART_ALL.length} stars</span><span>${stS().gal.length} in the gallery</span>`;
// Done: keep the picture, give its star, the day's bonus. o: {k kind, key, n name, d data, star, coins}. Returns what happened.
function artDone(o){const s=stS(),st0=artStars(),first=!!(o.star&&o.key&&ART_ALL.includes(o.key)&&!artIsDone(o.key));let daily=false;
  if(o.star&&o.key)s.done[o.key]=1;const e=galAdd({k:o.k,v:o.key||'',n:o.n||'My picture',d:o.d});
  let coins=o.coins||0;const day=today();if(o.star&&o.key&&o.key==artDaily(day).key&&s.day!=day){s.day=day;coins+=3;daily=true}
  if(first&&!o.coins)coins+=2;S.coins+=coins;const stk=first?award():null; // STK-2 (R-03 T4): each picture finished for the first time gives one sticker
  const st=artStars(),opened=ART_PACKS.find(p=>p.need>st0&&p.need<=st)||null;save();
  return{e,first,daily,coins,stars:st,opened,stk}}

/* ---- celebration: drawn sparkles over the picture (none in calm mode or with reduced motion), then the shared end card ---- */
const artCalm=()=>S.calm||(typeof matchMedia=='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches);
function artSparkle(el,then){if(artCalm()||!el){then();return}const r=el.getBoundingClientRect(),o=document.createElement('div');o.className='art-spk';o.setAttribute('aria-hidden','true');
  o.style.cssText=`left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px`;const C=['y','y1','p1','c1','w'];
  o.innerHTML=Array.from({length:14},(_,i)=>{const x=8+((i*37)%84),y=6+((i*53)%86),z=10+(i%4)*7;return`<svg class="art" viewBox="-10 -10 20 20" style="left:${x}%;top:${y}%;width:${z}px;height:${z}px;animation-delay:${(i%7)*60}ms">${aSp(0,0,9,C[i%5])}</svg>`}).join('');
  document.body.appendChild(o);SFX.chime();setTimeout(()=>{o.remove();then()},900)}
// the finished picture in a frame with a shine
const artFrame=h=>`<div class="art-frame">${h}<span class="art-shine" aria-hidden="true"></span></div>`;
function artEnd(res,o){const lines=[];if(res.opened)lines.push(['gift',`The <b>${esc(res.opened.n)}</b> pack is open!`]);
  if(!res.first&&o.star===false&&o.why)lines.push(['hint',esc(o.why)]);if(res.stk)lines.push(['sticker-book',`A sticker for your picture! ${RW.sticker(res.stk.s,res.stk.isNew,1)}`]);lines.push(['target',esc(artNextGoal())]);
  const c=GH.end('art',{win:true,made:true,pic:artFrame(o.pic),title:res.first?`You finished the ${o.n}!`:res.daily?`You made today's picture!`:'Into your gallery!',tag:res.first?'New star!':res.daily?"Today's picture":'',
    stats:[res.coins?['+'+res.coins,'coins','coin']:null,[res.stars+' / '+ART_ALL.length,'stars','star']],lines,
    btns:NAV.end3({again:'amore',home:'ahome',extra:`<span class="art-ex">${o.keep?UI.btn('Keep coloring',{icon:'palette',id:'akeep'}):''}${UI.btn('My gallery',{icon:'image',id:'agal'})}</span>`})}); // NAV-01: Play again = color another picture
  if(S.voice)say(res.first?`Beautiful! You finished the ${o.n}!`:'Beautiful! It is in your gallery.');
  c.querySelector('#amore').onclick=()=>{c.remove();gtStop();artMusic(false);artBack()};c.querySelector('#agal').onclick=()=>{c.remove();gtStop();artMusic(false);colorMenu('gallery')};c.querySelector('#ahome').onclick=()=>{c.remove();gtStop();artMusic(false);home()};
  const k=c.querySelector('#akeep');if(k)k.onclick=()=>{c.remove();SFX.pop(2)};return c}
// where Quit and More pictures go: the menu the picture was opened from
let ART_BACK=null;const artBack=()=>{const b=ART_BACK;if(b)b();else colorMenu()};

/* ---- gentle music while drawing: off unless the child turns it on; never with Sound effects or Music off, or in calm mode ---- */
let ART_MT=null;
function artMusicOk(){return S.sound&&S.music!==false&&!S.calm}
function artMusic(on){clearInterval(ART_MT);ART_MT=null;if(!on||!artMusicOk())return;let i=0;const sc=[67,69,72,74,76,79,81],bs=[48,45,41,43];
  ART_MT=setInterval(()=>{if(!document.querySelector('.gh-top[data-g="art"]')||!artMusicOk()){artMusic(false);return}if(GH.held||document.hidden)return;
    if(i%8==0)tone(NOTE(bs[(i/8|0)%4]),1.6,0,'sine',.035);if(i%2==0&&(i*7)%5!=3)tone(NOTE(sc[(i*5+(i>>3))%sc.length]),.5,0,'sine',.025);i++},330)}
function artMusicTool(){return GH.tool('music','Music','amus',!!(stS().mu&&artMusicOk()))}
function artMusicWire(){const b=$('#amus');if(!b)return;if(stS().mu)artMusic(true);
  b.onclick=()=>{if(!artMusicOk()){fb(S.calm?'Calm mode is on, so there is no music.':'Sound or music is off in Grown-ups.','warn',2200);return}
    const s=stS();s.mu=s.mu?0:1;save();b.classList.toggle('on',!!s.mu);b.setAttribute('aria-pressed',String(!!s.mu));artMusic(!!s.mu);fb(s.mu?'Music on':'Music off','ok',1000)}}

/* ---- a colouring page (mandala, rose window, animal) ---- */
const artBarHTML=(pal,mode,done=true)=>`<div class="stmodes art-tools" role="group" aria-label="Paint tools">${ART_TOOLS.map(([m,ic,l])=>`<button class="btn sm art-tool ${m==mode?'on':''}" data-md="${m}" aria-label="${l}" aria-pressed="${m==mode}" title="${l}">${artIco(ic)}</button>`).join('')}</div>
    <div class="stpals" role="group" aria-label="Colour sets">${Object.keys(PALS).map(p=>`<button class="btn sm stp ${p==pal?'on':''}" data-p="${p}" aria-label="${p} colours" aria-pressed="${p==pal}">${palIco(p)}</button>`).join('')}</div>
    <div class="stcols" id="stcols"></div>${done?UI.btn('Done',{kind:'primary',size:'lg',icon:'check',id:'adone',cls:'art-done'}):''}`;
function artPage(key){const regs=artRegs(key),st=stS(),it=st.items[key]||{f:{}},fills=Object.assign({},it.f),glass=key[0]=='g';
  let pal=palKey(st.pal),col=PALS[pal][2],mode='c',mirror=key[0]=='m'||key[0]=='g',undo=[],vb=[0,0,300,300];
  view(`${GH.top('art',{play:true,sub:artName(key),tools:GH.tool('undo','Undo','aundo')+(key[0]=='m'||key[0]=='g'?GH.tool('flip','Mirror fill','amir',true):'')+GH.tool('eye','Zoom','azr')+artMusicTool()})}
   <div class="stwrap"><div class="stcv" id="stw"></div><div class="stbar">${artBarHTML(pal,mode)}</div></div>`);
  const w=$('#stw');w.innerHTML=artSVG(regs,fills,{id:'stsvg',glass,sw:key[0]=='p'?.7:undefined});const svg=$('#stsvg');svg.setAttribute('role','img');svg.setAttribute('aria-label','Your picture: tap a shape to color it');
  const setVB=()=>svg.setAttribute('viewBox',vb.map(v=>v.toFixed(1)).join(' '));
  const cols=()=>{$('#stcols').innerHTML=PALS[pal].map((c,i)=>`<button class="btn stc ${c==col?'on':''}" data-c="${c}" style="--cc:${c}" aria-label="Colour ${i+1}"></button>`).join('');$$('.stc').forEach(b=>b.onclick=()=>{col=b.dataset.c;if(mode=='e')setMode('c');$$('.stc').forEach(q=>q.classList.toggle('on',q==b));SFX.pop(1)})};cols();
  const setMode=m=>{mode=m;$$('[data-md]').forEach(b=>{b.classList.toggle('on',b.dataset.md==m);b.setAttribute('aria-pressed',String(b.dataset.md==m))})};
  $$('[data-md]').forEach(b=>b.onclick=()=>{setMode(b.dataset.md);SFX.pop(2)});
  $$('[data-p]').forEach(b=>b.onclick=()=>{pal=b.dataset.p;st.pal=pal;col=PALS[pal][2];$$('[data-p]').forEach(q=>{q.classList.toggle('on',q==b);q.setAttribute('aria-pressed',String(q==b))});cols();SFX.pop(3)});
  const persist=()=>{st.items[key]={f:fills,t:Date.now()};st.order=[key,...st.order.filter(k=>k!=key)].slice(0,24);for(const k in st.items)if(!st.order.includes(k))delete st.items[k];save()};
  const paintOne=(i,v)=>{const p=svg.querySelector(`path[data-i="${i}"]`);if(!p)return;if(v)fills[i]=v;else delete fills[i];
    const defs=new Set([...svg.querySelectorAll('defs > *')].map(e=>e.id));defs.out=[];p.setAttribute('fill',regs[i].fix&&!v?regs[i].fix:fillVal(v,defs));if(defs.out.length)svg.querySelector('defs').insertAdjacentHTML('beforeend',defs.out.join(''));
    p.classList.remove('popfill');void p.getBBox();p.classList.add('popfill')};
  const tap=(t,sw)=>{const i=+t.dataset.i,v=mode=='e'?null:mode+':'+col,grp=mirror?regs.map((r,j)=>r.g==regs[i].g?j:-1).filter(j=>j>=0):[i];
    undo.push(grp.map(j=>[j,fills[j]||null]));if(undo.length>60)undo.shift();grp.forEach(j=>paintOne(j,v));
    if(sw){if(!tap.lt||performance.now()-tap.lt>60){tap.lt=performance.now();tone(500+((i*37)%9)*60,.05,0,'sine',.07)}}else if(mode=='s'||mode=='r'){SFX.chime()}else tone(380+((i*37)%9)*70,.09,0,'sine',.12);clearTimeout(tap.pt);tap.pt=setTimeout(persist,250)};
  // pointer: tap = fill, drag = paint many, pinch = zoom
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
  // Done: a third of the pieces colored wins the picture's star (a pack picture or today's); always kept in the gallery
  $('#adone').onclick=()=>{const n=regs.filter(r=>!r.fix&&!r.ov).length,f=regs.filter((r,i)=>!r.fix&&!r.ov&&fills[i]).length;
    if(!f){fb('Color a piece first, then tap Done.','warn',2000);return}persist();const star=f*3>=n;
    artSparkle(w,()=>{const res=artDone({k:'v',key,n:artName(key),d:artPack(fills,regs.length),star});
      artEnd(res,{n:artName(key),star,keep:true,why:`Color ${Math.ceil(n/3)-f} more pieces to win its star.`,pic:artSVG(regs,fills,{glass,hide:true,sw:key[0]=='p'?.7:undefined})})})};
  const size=()=>{const r=w.parentNode.getBoundingClientRect(),land=innerWidth>innerHeight,bh=land?12:($('.stbar')||{offsetHeight:150}).offsetHeight+16,s=Math.min(land?r.width-250:r.width-12,r.height-bh);w.style.width=w.style.height=Math.max(200,s)+'px'};size();
  let rs;addEventListener('resize',()=>{clearTimeout(rs);rs=setTimeout(()=>{if($('#stw'))size()},120)});
  GH.wire({quit:()=>{gtStop();artMusic(false);artBack()}});artMusicWire();
  gtStart('#gtm',()=>timeUpOverlay());if(S.voice&&!it.t)setTimeout(()=>say(key[0]=='m'?'Pick colors and make it beautiful!':'Tap to color!'),300)}

/* ---- Neon Kaleidoscope: strokes are kept (points 0..1), so the drawing can be undone, saved small and played back glowing ---- */
const NEON_BR=[['neon','neon','Neon'],['rainbow','rainbow','Rainbow'],['spark','spark','Sparkle'],['ribbon','ribbon','Ribbon'],['stars','stars','Stars'],['dots','dots','Dots']];
const NEON_SY=[1,2,4,6,8,12,16];
// draw segment k of stroke st on x (a square canvas of S pixels); live: the real glow (shadowBlur), else a cheaper drawn glow
function neonSeg(x,S,st,k,live){const P=st.P;if(!P.length)return;const a=P[Math.max(0,k-1)],b=k?P[k]:[P[0][0]+.0004,P[0][1]];
  const hh=(st.h+(st.b=='rainbow'?3*k:st.b=='ribbon'?k:0))%360,col=`hsl(${hh},100%,60%)`,c=S/2,lw=Math.max(1,st.z*S),R=rng(st.r*4099+k*31+7),bl=S*.04;
  x.lineCap='round';x.lineJoin='round';
  for(let q=0;q<st.y;q++)for(const m of(st.m&&st.y>1?[1,-1]:[1])){x.save();x.translate(c,c);x.rotate(q*2*Math.PI/st.y);x.scale(m,1);
    const ax=a[0]*S-c,ay=a[1]*S-c,bx=b[0]*S-c,by=b[1]*S-c;
    if(st.b=='spark'){for(let i=0;i<3;i++){const rr=R()*lw*1.4,px=bx+(R()-.5)*lw*3,py=by+(R()-.5)*lw*3;x.fillStyle=`hsl(${hh},100%,${70+R()*25}%)`;
        if(live){x.shadowColor=col;x.shadowBlur=bl*.75}else{x.globalAlpha=.3;x.beginPath();x.arc(px,py,rr*.9+2,0,7);x.fill();x.globalAlpha=1}x.beginPath();x.arc(px,py,rr*.4+1,0,7);x.fill()}}
    else if(st.b=='stars'||st.b=='dots'){if(k%(st.b=='stars'?3:2)==0){const r=st.b=='stars'?lw*1.3+2:lw*.6+1;x.fillStyle=col;x.beginPath();
        if(st.b=='stars')for(let i=0;i<10;i++){const rr=i%2?r*.45:r,an=-Math.PI/2+i*Math.PI/5;x.lineTo(bx+Math.cos(an)*rr,by+Math.sin(an)*rr)}else x.arc(bx,by,r,0,7);x.closePath();
        if(live){x.shadowColor=col;x.shadowBlur=bl;x.fill()}else{x.globalAlpha=.3;x.lineWidth=r;x.strokeStyle=col;x.stroke();x.globalAlpha=1;x.fill()}x.shadowBlur=0;x.fillStyle='#ffffffcc';x.beginPath();x.arc(bx,by,r*.3,0,7);x.fill()}}
    else{const w2=lw*(st.b=='ribbon'?1.8:1);x.beginPath();x.moveTo(ax,ay);x.lineTo(bx,by);x.strokeStyle=col;
      if(live){x.shadowColor=col;x.shadowBlur=st.b=='ribbon'?bl*.25:bl;x.lineWidth=w2;x.stroke()}else{x.globalAlpha=.22;x.lineWidth=w2*2.6;x.stroke();x.globalAlpha=1;x.lineWidth=w2;x.stroke()}
      x.shadowBlur=0;x.strokeStyle='#ffffffcc';x.lineWidth=Math.max(1,w2*.3);x.stroke()}
    x.restore()}}
function neonBg(x,S){x.fillStyle='#05010f';x.fillRect(0,0,S,S)}
function neonAll(x,S,strokes){neonBg(x,S);for(const st of strokes)for(let k=0;k<st.P.length;k++)neonSeg(x,S,st,k,false)}
const neonEnc=strokes=>strokes.map(st=>({b:st.b,h:Math.round(st.h),z:+st.z.toFixed(4),y:st.y,m:st.m?1:0,r:st.r,p:st.P.map(([a,b])=>nEnc(a)+nEnc(b)).join('')}));
const neonDec=d=>((d&&d.s)||[]).filter(s=>s&&typeof s.p=='string').map(s=>({b:s.b||'neon',h:+s.h||0,z:+s.z||.015,y:+s.y||1,m:s.m?1:0,r:+s.r||1,P:Array.from({length:s.p.length>>2},(_,i)=>[nDec(s.p,i*4),nDec(s.p,i*4+2)])}));
// play strokes back slowly on canvas cv (calm mode and reduced motion: all at once); returns a stop function
function neonReplay(cv,strokes,done){const x=cv.getContext('2d'),S0=cv.width;neonBg(x,S0);const segs=[];strokes.forEach(st=>st.P.forEach((_,k)=>segs.push([st,k])));
  if(artCalm()){neonAll(x,S0,strokes);if(done)done();return()=>{}}
  let i=0,on=true;const per=Math.max(1,Math.ceil(segs.length/420));
  const f=()=>{if(!on||!cv.isConnected)return;for(let j=0;j<per&&i<segs.length;j++,i++)neonSeg(x,S0,segs[i][0],segs[i][1],true);if(i<segs.length)requestAnimationFrame(f);else if(done)done()};requestAnimationFrame(f);return()=>{on=false}}
const neonBarHTML=(sym,mir,brush,size)=>`<div class="stmodes art-tools" role="group" aria-label="Mirror copies">${NEON_SY.map(n=>`<button class="btn sm art-tool ${n==sym?'on':''}" data-sy="${n}" aria-label="${n==1?'No copies':n+' copies'}" aria-pressed="${n==sym}">${artIco(n)}</button>`).join('')}</div>
    <div class="stmodes art-tools" role="group" aria-label="Brushes">${NEON_BR.map(([k,ic,l])=>`<button class="btn sm art-tool ${k==brush?'on':''}" data-br="${k}" aria-label="${l} brush" aria-pressed="${k==brush}">${artIco(ic)}</button>`).join('')}</div>
    <div class="stmodes">${[3,6,11,18].map((z,i)=>`<button class="btn sm ${z==size?'on':''}" data-sz="${z}" aria-label="Brush size ${i+1}" aria-pressed="${z==size}"><span class="art-dot" style="width:${z+4}px;height:${z+4}px"></span></button>`).join('')}${[0,50,120,190,280,320].map((h,i)=>`<button class="btn stc" data-h="${h}" style="--cc:hsl(${h},100%,55%)" aria-label="Colour ${i+1}"></button>`).join('')}</div>
    ${UI.btn('Done',{kind:'primary',size:'lg',icon:'check',id:'adone',cls:'art-done'})}`;
function neonDraw(){let sym=8,brush='neon',hue=Math.random()*360,size=6,mirror=true,saved=true;const strokes=[],snaps=[];
  view(`${GH.top('art',{play:true,sub:'Neon Draw',tools:GH.tool('undo','Undo','nundo')+GH.tool('flip','Mirror','nmir',true)+GH.tool('trash','Clear','nclr')+GH.tool('replay','Glow replay','nrep')+artMusicTool()})}
   <div class="stwrap"><div class="stcv neon" id="nw"><canvas id="ncv" role="img" aria-label="Your drawing"></canvas></div><div class="stbar">${neonBarHTML(sym,mirror,brush,size)}</div></div>`);
  const w=$('#nw'),cv=$('#ncv'),x=cv.getContext('2d'),dpr=Math.min(2,devicePixelRatio||1);let S0=0,cur=null,stopR=null;
  const size_=()=>{const r=w.parentNode.getBoundingClientRect(),land=innerWidth>innerHeight,bh=land?12:($('.stbar')||{offsetHeight:170}).offsetHeight+16,s=Math.max(200,Math.min(land?r.width-250:r.width-12,r.height-bh));
    w.style.width=w.style.height=s+'px';cv.width=cv.height=Math.round(s*dpr);S0=cv.width;snaps.length=0;neonAll(x,S0,strokes)};size_();
  const pos=e=>{const r=cv.getBoundingClientRect();return[Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)),Math.max(0,Math.min(1,(e.clientY-r.top)/r.height))]};
  cv.addEventListener('pointerdown',e=>{e.preventDefault();if(stopR){stopR();stopR=null;neonAll(x,S0,strokes)}cv.setPointerCapture(e.pointerId);
    try{const c=document.createElement('canvas');c.width=c.height=S0;c.getContext('2d').drawImage(cv,0,0);snaps.push(c);if(snaps.length>3)snaps.shift()}catch(_){}
    cur={b:brush,h:hue,z:size/(cv.getBoundingClientRect().width||300),y:sym,m:mirror?1:0,r:R(1,99999),P:[pos(e)]};strokes.push(cur);neonSeg(x,S0,cur,0,true);saved=false});
  cv.addEventListener('pointermove',e=>{if(!cur)return;const p=pos(e),l=cur.P[cur.P.length-1];if(Math.hypot(p[0]-l[0],p[1]-l[1])<.004)return;cur.P.push(p);neonSeg(x,S0,cur,cur.P.length-1,true);
    if(brush=='rainbow')hue=(hue+3)%360;else if(brush=='ribbon')hue=(hue+1)%360});
  const end=()=>{if(cur&&cur.b=='rainbow'||cur&&cur.b=='ribbon')hue=(cur.h+(cur.b=='rainbow'?3:1)*cur.P.length)%360;cur=null};cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);
  const pk=(sel,f)=>$$(sel).forEach(b=>b.onclick=()=>{f(b);$$(sel).forEach(q=>{q.classList.toggle('on',q==b);q.setAttribute('aria-pressed',String(q==b))})});
  pk('[data-sy]',b=>{sym=+b.dataset.sy;SFX.pop(2)});
  $('#nmir').onclick=e=>{mirror=!mirror;e.currentTarget.classList.toggle('on',mirror);e.currentTarget.setAttribute('aria-pressed',String(mirror));SFX.pop(1)};
  pk('[data-br]',b=>{brush=b.dataset.br;SFX.pop(3)});pk('[data-sz]',b=>{size=+b.dataset.sz;SFX.pop(1)});
  $$('[data-h]').forEach(b=>b.onclick=()=>{hue=+b.dataset.h;if(brush=='rainbow'){brush='neon';$$('[data-br]').forEach(q=>{q.classList.toggle('on',q.dataset.br=='neon');q.setAttribute('aria-pressed',String(q.dataset.br=='neon'))})}SFX.pop(2)});
  $('#nclr').onclick=()=>{if(!strokes.length)return;strokes.length=0;snaps.length=0;neonBg(x,S0);SFX.whoosh();saved=true};
  $('#nundo').onclick=()=>{if(!strokes.length)return;strokes.pop();const s=snaps.pop();if(s){neonBg(x,S0);x.drawImage(s,0,0)}else neonAll(x,S0,strokes);SFX.del();saved=!strokes.length};
  $('#nrep').onclick=()=>{if(!strokes.length){fb('Draw something first!','warn',1500);return}if(stopR)stopR();SFX.whoosh();stopR=neonReplay(cv,strokes,()=>{stopR=null})};
  // keep: strokes when small enough (they can be played back), else a 288 px picture
  const keep=()=>{const pts=strokes.reduce((a,s)=>a+s.P.length,0);let d,k='n';
    if(pts<=ART_PTS)d={v:1,s:neonEnc(strokes)};else{const c=document.createElement('canvas');c.width=c.height=288;c.getContext('2d').drawImage(cv,0,0,288,288);d=c.toDataURL('image/webp',.8);if(!/^data:image\/webp/.test(d))d=c.toDataURL('image/jpeg',.8);k='ni'}
    saved=true;return{k,d}};
  const autoKeep=()=>{if(!saved&&strokes.length>2){const q=keep();galAdd({k:q.k,v:'',n:'Neon drawing',d:q.d});save()}};
  $('#adone').onclick=()=>{if(!strokes.length){fb('Draw something first, then tap Done.','warn',2000);return}const q=keep();
    artSparkle(w,()=>{const res=artDone({k:q.k,n:'Neon drawing',d:q.d,star:false});const im=cv.toDataURL('image/png');artEnd(res,{n:'Neon drawing',keep:true,pic:`<img src="${im}" alt="">`})})};
  let rs;addEventListener('resize',()=>{clearTimeout(rs);rs=setTimeout(()=>{if($('#ncv'))size_()},150)});
  GH.wire({quit:()=>{autoKeep();gtStop();artMusic(false);colorMenu('neon')}});artMusicWire();
  gtStart('#gtm',()=>{autoKeep();timeUpOverlay()})}

/* ---- pictures of gallery entries (thumbnails and the big view) ---- */
const NEON_TH=new Map();
function galPic(e,big){try{
  if(e.k=='v'){const regs=artRegs(e.v);return artSVG(regs,artUnpack(e.d),{glass:e.v[0]=='g',hide:true,sw:e.v[0]=='p'?(big?.7:.5):e.v[0]=='g'?(big?2.6:2):big?1.1:.8})}
  if(e.k=='sh'){const d=shData(e.v.slice(3)),f=artUnpack(e.d),h={};for(const i in f)h[i]=f[i].slice(2);return shSVG(d,h,{thin:!big}).replace('<svg','<svg aria-hidden="true" focusable="false"')}
  if(e.k=='px'){const d=cbData(e.v.slice(3));return`<img src="${pxImg(d.G,pxUnbits(e.d),big?320:160)}" alt="">`}
  if(e.k=='fp'){const G=String(e.d||'').split('').map(c=>FP_COLS[AB.indexOf(c)]||'blanco');return`<img class="px" src="${cbThumb(G,true,big?320:160)}" alt="">`}
  if(e.k=='ni')return`<img src="${typeof e.d=='string'&&/^data:image\//.test(e.d)?e.d:''}" alt="">`;
  if(e.k=='n'){const key=e.i+(big?'b':'');if(!NEON_TH.has(key)){const c=document.createElement('canvas');c.width=c.height=big?360:180;neonAll(c.getContext('2d'),c.width,neonDec(e.d));NEON_TH.set(key,c.toDataURL('image/png'))}return`<img src="${NEON_TH.get(key)}" alt="">`}
}catch(_){}return''}
// pixel art as beads (finished squares) on a light board
function pxImg(G,fill,size=160,tint){const c=document.createElement('canvas');c.width=c.height=size;const x=c.getContext('2d'),s=size/CBN;x.fillStyle='#f5f5f4';x.fillRect(0,0,size,size);
  G.forEach((k,i)=>{const cx=(i%CBN)*s,cy=Math.floor(i/CBN)*s;if(fill[i]=='1')pxBead(x,cx,cy,s,CB_COL[k][0]);else{x.fillStyle=tint?shade(CB_COL[k][0],.72):'#fff';x.fillRect(cx+.5,cy+.5,s-1,s-1)}});return c.toDataURL()}
function pxBead(x,cx,cy,s,c){const r=s*.2,g=Math.max(.6,s*.04);x.fillStyle=c;x.beginPath();if(x.roundRect)x.roundRect(cx+g,cy+g,s-2*g,s-2*g,r);else x.rect(cx+g,cy+g,s-2*g,s-2*g);x.fill();
  x.fillStyle=shade(c,-.18);x.fillRect(cx+g+r*.6,cy+s-g-s*.12,s-2*g-r*1.2,s*.1);x.fillStyle=shade(c,.45);x.globalAlpha=.75;x.beginPath();x.ellipse(cx+s*.36,cy+s*.32,s*.17,s*.1,-.6,0,7);x.fill();x.globalAlpha=1}

/* ---- the menu: picture packs, my gallery, mandalas, windows, animals, Neon, more ---- */
let STTAB='packs';
const ART_TABS=[['packs','star','Packs',1],['gallery','frame','My gallery'],['mandala','flower','Mandalas'],['glass','window','Windows'],['animal','paw','Animals',1],['neon','neon','Neon'],['classic','grid','More']];
const artTile=(k,o={})=>`<button class="btn sttile${o.lock?' lock':''}${o.done?' done':''}" ${o.lock?'data-lock="'+esc(o.lock)+'"':'data-k="'+esc(k)+'"'} aria-label="${esc(artName(k))}${o.done?', finished':''}${o.lock?', locked':''}"><span class="art-th" data-th="${esc(k)}"></span>${o.done?`<span class="art-badge">${ico('star',22)}</span>`:''}${o.lock?`<span class="art-badge lk">${ico('lock',22)}</span>`:''}</button>`;
function artMenuHTML(tab){const st=stS(),stars=artStars();let body='';const mine=t=>st.order.filter(k=>k[0]==t);
  const head=(ic,t,s,c)=>`<button class="btn game art-new" id="${c}">${artIco(ic,44)}<span class="gi"><span class="gt">${t}</span><span class="small">${s}</span></span>${ico('play',28)}</button>`;
  if(tab=='packs'){const day=artDaily(today()),dd=st.day==today();
    body=`<div class="art-goal">${ico('target',26)}<p><b>Next goal</b><span id="artgoal">${esc(artNextGoal())}</span></p><span class="art-stars" aria-label="${stars} of ${ART_ALL.length} stars">${ico('star',24)}<b>${stars}</b>/${ART_ALL.length}</span></div>
     <button class="btn art-day" data-day="${esc(day.key)}" aria-label="Today's picture: ${esc(day.n)}${dd?', done today':''}"><span class="art-th" data-th="${esc(day.key)}"></span><span class="gi"><span class="gt">Today's picture</span><span class="small">${esc(day.n)}${dd?' - done today!':' - a new one every day'}</span></span>${ico(dd?'check':'play',28)}</button>`+
     ART_PACKS.map(p=>{const open=artPackOpen(p,stars),n=p.pics.filter(artIsDone).length;
      return`<section class="art-pack${open?'':' shut'}"><h2 class="cbdh">${AIC[p.ic]?artIco(p.ic,32):ico(p.ic,28)}<span>${esc(p.n)}</span><small>${open?`${n} of ${p.pics.length}`:`${ico('lock',18)} ${p.need-stars} more star${p.need-stars==1?'':'s'}`}</small></h2>
        <div class="stgrid art-pk">${p.pics.map(k=>artTile(k,{done:artIsDone(k),lock:open?'':`${p.need-stars} more star${p.need-stars==1?'':'s'} open the ${p.n} pack.`})).join('')}</div></section>`}).join('')}
  else if(tab=='gallery'){const g=st.gal,h=g.filter(e=>e.h).length;
    body=`<div class="tipcard">Tap <b>Done</b> on any picture to keep it here. ${g.length} of ${GAL_MAX} pictures. When it is full, the oldest picture without a heart makes room; a heart keeps a picture (${h} of ${GAL_HEARTS}).</div>`+
     (g.length?`<div class="stgrid art-gal">${g.map(e=>`<button class="btn sttile art-gt" data-gi="${e.i}" aria-label="${esc(e.n||'My picture')}${e.h?', kept with a heart':''}"><span class="art-th" data-gth="${e.i}"></span>${e.h?`<span class="art-badge hrt">${ico('heart',22)}</span>`:''}</button>`).join('')}</div>`
      :`<p class="art-empty">${artIco('frame',64)}<span>Your finished pictures will live here.</span></p>`)+`<p class="art-more">${UI.btn('Color a picture',{kind:'primary',icon:'palette',id:'agnew'})}</p>`}
  else if(tab=='mandala'){const seeds=[3,17,42,77,123,256,512,999];body=head('flower','New Mandala','A brand-new design every time','newm')+
    (mine('m').length?`<h2 class="cbdh">My Art</h2><div class="stgrid">${mine('m').map(k=>artTile(k)).join('')}</div>`:'')+`<h2 class="cbdh">Designs</h2><div class="stgrid">${seeds.filter(s=>!st.items['m:'+s]).map(s=>artTile('m:'+s)).join('')}</div>`}
  else if(tab=='glass'){const seeds=[5,21,64,88,130,301];body=head('window','New Rose Window','Stained glass with hundreds of pieces','newg')+
    (mine('g').length?`<h2 class="cbdh">My Art</h2><div class="stgrid">${mine('g').map(k=>artTile(k)).join('')}</div>`:'')+`<h2 class="cbdh">Windows</h2><div class="stgrid">${seeds.filter(s=>!st.items['g:'+s]).map(s=>artTile('g:'+s)).join('')}</div>`}
  else if(tab=='animal')body=`<div class="tipcard">Geometric animals made of hundreds of facets. <b>Swipe</b> to paint lots of pieces at once. Use light and dark shades for a 3D look. Pinch with two fingers to zoom.</div><div class="stgrid">${Object.keys(POLYART).map(id=>artTile('p:'+id)).join('')}</div>`;
  else if(tab=='neon'){const n=st.gal.filter(e=>e.k=='n'||e.k=='ni');body=`<button class="btn game art-new neon" id="newn">${artIco('neon',44)}<span class="gi"><span class="gt">Neon Kaleidoscope</span><span class="small">Glowing mirror drawing</span></span>${ico('play',28)}</button>`+
    (n.length?`<h2 class="cbdh">My Neon Art</h2><div class="stgrid art-gal">${n.map(e=>`<button class="btn sttile art-gt" data-gi="${e.i}" aria-label="${esc(e.n||'Neon drawing')}"><span class="art-th" data-gth="${e.i}"></span></button>`).join('')}</div>`:'')}
  else body=`<div class="tipcard">Number pictures, pixel art and block paint.</div><div class="games"><button class="btn game art-new" data-c="shape">${ico('paw',40)}<span class="gi"><span class="gt">Number Pictures</span></span></button><button class="btn game art-new" data-c="pixel">${artIco('grid',44)}<span class="gi"><span class="gt">Pixel Art</span></span></button><button class="btn game art-new" data-c="paint">${artIco('paint',44)}<span class="gi"><span class="gt">Block Paint</span></span></button></div>`;
  return`<div class="tabs sttabs" role="tablist">${ART_TABS.map(([k,ic,l,isIco])=>`<button class="btn sm tab ${k==tab?'on':''}" data-t="${k}" role="tab" aria-selected="${k==tab}">${isIco?ico(ic,22):artIco(ic,24)}<span>${l}</span></button>`).join('')}</div><div class="scroll art-menu">${body}</div>`}
// thumbnails are drawn after the menu shows (a tap answers at once): from the next frame on, as many as fit in 8 ms a frame
function artThumb(k){const st=stS(),[t,v]=k.split(':');try{
  if(t=='px'){const d=cbData(v),cs=cbS();return`<img src="${pxImg(d.G,cs.done[v]?Array(256).fill('1'):(cs.prog[v]||'').split(''),120,1)}" alt="">`}
  if(t=='sh'){const d=shData(v),cs=shS(),fl={};if(cs.done[v])d.R.forEach(r=>fl[r.i]=CB_COL[r.c][0]);else(cs.prog[v]||[]).forEach(i=>fl[i]=CB_COL[d.R[i].c][0]);
    return shSVG(d,fl,{thin:1,faded:!cs.done[v]&&!(cs.prog[v]||[]).length}).replace('<svg','<svg aria-hidden="true" focusable="false"')}
  const it=st.items[k];return artSVG(artRegs(k),it?it.f:{},{glass:t=='g',hide:true,sw:t=='g'?2:t=='p'?.5:.8})}catch(_){return''}}
function artThumbs(){const q=[...$$('[data-th]'),...$$('[data-gth]')];let i=0;const one=()=>{const e=q[i++];if(!e||!e.isConnected)return;
    if(e.dataset.th)e.innerHTML=artThumb(e.dataset.th);else{const g=galGet(+e.dataset.gth);if(g)e.innerHTML=galPic(g,false)}};
  const f=()=>{const t0=performance.now();do one();while(i<q.length&&performance.now()-t0<8);if(i<q.length)requestAnimationFrame(f)};if(q.length)requestAnimationFrame(f)}
function artOpen(k,back){if(ptLeft()<=0){SFX.wrong();fb(ptWhyNot(),'warn long',3000);return}ART_BACK=back||(()=>colorMenu(STTAB));const[t,v]=k.split(':');SFX.whoosh();
  if(t=='px')colorPic(v,'num');else if(t=='sh')shapePage(v,'num');else artPage(k)}
function colorMenu(tab){if(tab&&['shape','pixel','paint'].includes(tab))return classicColor(tab);if(tab)STTAB=tab;if(!ART_TABS.some(t=>t[0]==STTAB))STTAB='packs';
  artNeonMigrate();artNeonShrink();artMusic(false);
  view(`${GH.top('art')}${artMenuHTML(STTAB)}`);
  $('#back').onclick=gameRoom;$$('.tab').forEach(b=>b.onclick=()=>{SFX.pop(2);colorMenu(b.dataset.t)});
  const chk=()=>{if(ptLeft()<=0){SFX.wrong();fb(ptWhyNot(),'warn long',3000);return false}return true};
  $$('[data-k]').forEach(b=>b.onclick=()=>artOpen(b.dataset.k));
  $$('[data-day]').forEach(b=>b.onclick=()=>artOpen(b.dataset.day));
  $$('[data-lock]').forEach(b=>b.onclick=()=>{SFX.wrong();fb(b.dataset.lock,'warn',2400)});
  $$('[data-gi]').forEach(b=>b.onclick=()=>galView(+b.dataset.gi));
  if($('#agnew'))$('#agnew').onclick=()=>{SFX.pop(2);colorMenu('packs')};
  $$('[data-c]').forEach(b=>b.onclick=()=>classicColor(b.dataset.c));
  if($('#newm'))$('#newm').onclick=()=>{if(chk()){SFX.chime();ART_BACK=()=>colorMenu('mandala');artPage('m:'+R(1000,99999))}};
  if($('#newg'))$('#newg').onclick=()=>{if(chk()){SFX.chime();ART_BACK=()=>colorMenu('glass');artPage('g:'+R(1000,99999))}};
  if($('#newn'))$('#newn').onclick=()=>{if(chk()){SFX.whoosh();neonDraw()}};
  artThumbs()}
// the big view of a gallery picture: a heart to keep it, Delete (tap twice), and the glow replay for Neon drawings
function galView(i){const e=galGet(i);if(!e)return;let del=false,stop=null;
  const s=UI.sheet(`<div class="art-big">${e.k=='n'?'<canvas id="gbcv" width="360" height="360" role="img" aria-label="Your neon drawing"></canvas>':`<div class="art-bp" role="img" aria-label="${esc(e.n||'My picture')}">${galPic(e,true)}</div>`}
    <h2>${esc(e.n||'My picture')}</h2><p class="small">${esc(new Date(e.t||Date.now()).toLocaleDateString())}</p>
    <div class="acts art-acts">${UI.btn(e.h?'Kept':'Keep it',{icon:'heart',id:'ghrt',cls:e.h?'on':'',attrs:`aria-pressed="${!!e.h}"`})}${e.k=='n'?UI.btn('Glow replay',{icon:'replay',id:'grep'}):''}${UI.btn('Delete',{icon:'trash',id:'gdel'})}${UI.btn('Close',{kind:'primary',icon:'close',id:'gcls'})}</div></div>`,{onClose:()=>{if(stop)stop()}});
  const cv=s.el.querySelector('#gbcv');if(cv){neonAll(cv.getContext('2d'),360,neonDec(e.d))}
  const rep=s.el.querySelector('#grep');if(rep)rep.onclick=()=>{if(stop)stop();SFX.whoosh();stop=neonReplay(cv,neonDec(e.d))};
  s.el.querySelector('#ghrt').onclick=ev=>{if(!galHeart(i)){fb(`You can keep ${GAL_HEARTS} pictures with a heart. Take a heart off another one first.`,'warn long',3000);return}
    const b=ev.currentTarget,on=!!galGet(i).h;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on));b.querySelector('span').textContent=on?'Kept':'Keep it';SFX.pop(on?4:1)};
  s.el.querySelector('#gdel').onclick=ev=>{if(!del){del=true;ev.currentTarget.querySelector('span').textContent='Tap again to delete';SFX.pop(1);return}galDel(i);SFX.del();s.close();setTimeout(()=>colorMenu(STTAB),360)};
  s.el.querySelector('#gcls').onclick=()=>{s.close();if(STTAB=='gallery'||STTAB=='neon')setTimeout(()=>colorMenu(STTAB),360)}}

/* ---- More: number pictures, pixel art, block paint ---- */
function classicHTML(tab){const cs=cbS(),ss=shS();
  const tabs=`<div class="tabs" role="tablist">${[['shape','paw','Pictures',1],['pixel','grid','Pixel Art'],['paint','paint','Block Paint']].map(([k,ic,l,isIco])=>`<button class="btn sm tab ${k==tab?'on':''}" data-t="${k}" role="tab" aria-selected="${k==tab}">${isIco?ico(ic,22):artIco(ic,24)}<span>${l}</span></button>`).join('')}</div>`;
  let body='';const lv=n=>`<span class="art-lv" aria-label="${['','Easy','Medium','Hard'][n]}">${ico('star',18).repeat(n)}</span>`;
  if(tab=='shape')body=`<div class="tipcard">Tap a picture. Color it <b>your way</b>, or <b>by number</b>, with <b>math facts</b>, or with <b>Spanish</b> colors!</div><h2>Pictures (${Object.keys(ss.done).length}/${SHAPES.length} done)</h2>${[[1,'Easy','Big shapes'],[2,'Medium','More parts'],[3,'Hard','Lots of tiny details']].map(([l,t,s])=>`<h3 class="cbdh">${lv(l)} ${t} <span class="small">${s}</span></h3><div class="cbgrid">${shMenuItems(l)}</div>`).join('')}`;
  else if(tab=='pixel'){const open=CB_PICS.filter(([id])=>cbOpen(id)),shut=CB_PICS.length-open.length;
    body=`<div class="tipcard">Pixel pictures: match the numbers to the colors. Drag your finger to color fast! Two fingers move and zoom.</div><h2>Pixel Art (${Object.keys(cs.done).length}/${CB_PICS.length} done)</h2><div class="cbgrid">${open.map(([id,n])=>{const done=cs.done[id],pr=cs.prog[id],pc=pr?Math.round(pr.split('').filter(c=>c=='1').length/pr.length*100):0;
    return`<button class="btn cbitem" data-id="${id}"><span class="art-th px" data-th="px:${id}"></span><b>${n}</b><span class="small">${done?ico('check',18)+' Done':pc?pc+'%':'New'}</span></button>`}).join('')}</div>${shut?`<p class="small art-more">${ico('lock',18)} ${shut} more pixel pictures open with the picture packs.</p>`:''}`}
  else body=`<button class="btn game art-new" id="free">${artIco('paint',44)}<span class="gi"><span class="gt">New Drawing</span><span class="small">Paint anything you want, block by block</span></span>${ico('play',28)}</button>
    ${cs.art.length?`<h2>My Drawings</h2><div class="cbgrid">${cs.art.map((a,i)=>`<button class="btn cbitem" data-art="${i}"><img src="${cbThumb(a.split(',').map(k=>k||'blanco'),true)}" alt=""><b>Drawing ${i+1}</b></button>`).join('')}</div>`:'<p class="small" style="text-align:center">Your saved drawings show up here.</p>'}`;
  return tabs+body}
function classicColor(tab){if(tab)CBTAB=tab;artMusic(false);
  view(`${GH.top('art',{sub:'More'})}<div class="scroll">${classicHTML(CBTAB)}</div>`);
  $('#back').onclick=()=>colorMenu('classic');$$('.tab').forEach(b=>b.onclick=()=>{SFX.pop(2);classicColor(b.dataset.t)});
  const chk=()=>{if(ptLeft()<=0){SFX.wrong();fb(ptWhyNot(),'warn long',3000);return false}return true},bk=()=>{ART_BACK=()=>classicColor(CBTAB)};
  if($('#free'))$('#free').onclick=()=>{if(chk()){bk();freePaint(-1)}};
  $$('[data-art]').forEach(b=>b.onclick=()=>{if(chk()){bk();freePaint(+b.dataset.art)}});
  $$('[data-id]').forEach(b=>b.onclick=()=>{if(chk())modeChooser(m=>{bk();colorPic(b.dataset.id,m)},false)});
  $$('[data-sh]').forEach(b=>b.onclick=()=>{if(chk())modeChooser(m=>{bk();shapePage(b.dataset.sh,m)},true)});
  artThumbs()}
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
  const tot=d.R.filter(r=>!r.o.fix).length;return`<button class="btn cbitem" data-sh="${id}">${shSVG(d,free&&!done&&!pr.length?free:fl,{thin:1,faded:!done&&!pr.length&&!free,cls:'shthumb'})}<b>${n}</b><span class="small">${done?ico('check',18)+' Done':pr.length?Math.round(pr.length/tot*100)+'%':free?'Colored':'New'}</span></button>`}).join('')}

function shapePage(id,mode){const d=shData(id),cs=shS(),free=mode=='free',fills={};let sel=free?'rojo':1;
  const filled=new Set(free?[]:(cs.prog[id]||[]));if(free){Object.assign(fills,cs.free[id]||{})}else filled.forEach(i=>fills[i]=CB_COL[d.R[i].c][0]);
  const regs=d.R.filter(r=>!r.o.fix);
  const ml=mode=='math3'?3:mode=='math2'?2:1,esHard=mode=='es2';if(mode.startsWith('math'))mode='math';if(esHard)mode='es';const facts=d.keys.map((k,i)=>mode=='math'?cbFact(i+1,ml):null);
  const pal=free?FP_COLS.concat(['gris oscuro','café oscuro','azul oscuro','beige','turquesa']).map(k=>`<button class="btn chip" data-k="${k}" style="--cc:${CB_COL[k][0]}"><span class="sw"></span></button>`).join('')
    :d.keys.map((k,i)=>`<button class="btn chip ${esHard?'eshard':''} ${mode=='math'&&ml>1?'wide':''}" data-n="${i+1}" style="--cc:${CB_COL[k][0]}"><span class="sw"></span><b>${mode=='math'?facts[i]:esHard?'':i+1}</b>${mode=='es'?`<small>${k}</small>`:''}</button>`).join('');
  view(`${GH.top('art',{play:true,sub:d.name,tools:(free?GH.tool('trash','Clear','shclr'):'')+artMusicTool(),chips:free?'':'<span class="stat gh-st" aria-label="Colored"><b id="cbp">0%</b></span>'})}
   <div class="cbwrap"><div class="cbcv shwrap" id="shw"></div><div class="cbpal ${free?'fp':''}">${pal}${UI.btn('Done',{kind:'primary',icon:'check',id:'adone',cls:'art-done'})}</div></div>`);
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
  GH.wire({quit:()=>{gtStop();artMusic(false);artBack()}});artMusicWire();
  // G-ART2: Done keeps the picture in the gallery (a free picture a third colored wins its star); the last number finishes it
  const shPack=fl=>{const o={};for(const k in fl)o[k]='c:'+fl[k];return artPack(o,d.R.length)};
  $('#adone').onclick=()=>{const cnt=free?Object.keys(fills).length:filled.size;if(!cnt){fb('Color a piece first, then tap Done.','warn',2000);return}
    if(!free&&regs.every(x=>filled.has(x.i)))return;const star=free&&cnt*3>=regs.length,cur=Object.assign({},fills);
    artSparkle(w,()=>{const res=artDone({k:'sh',key:'sh:'+id,n:d.name,d:shPack(cur),star});
      artEnd(res,{n:d.name,star,keep:true,why:free?`Color ${Math.ceil(regs.length/3)-cnt} more pieces to win its star.`:'Color every piece by number to win its star.',pic:shSVG(d,cur)})})};
  function finish(){delete cs.prog[id];save();gtStop();const all={};d.R.forEach(r=>all[r.i]=CB_COL[r.c][0]);
    setTimeout(()=>artSparkle(w,()=>{const res=artDone({k:'sh',key:'sh:'+id,n:d.name,d:shPack(all),star:true,coins:5});cs.done[id]=1;save();
      artEnd(res,{n:d.name,pic:shSVG(d,all)})}),400)}
  pick(sel);let rs;addEventListener('resize',()=>{clearTimeout(rs);rs=setTimeout(()=>{if($('#shw'))render()},120)});
  gtStart('#gtm',()=>timeUpOverlay());
  if(S.voice)setTimeout(()=>say(free?'Pick a color and tap to paint!':mode=='math'?'Solve the fact to find each color!':mode=='es'?'Tap a color to hear it in Spanish!':'Match the numbers to the colors!'),300)}

function cbLayout(n){const land=innerWidth>innerHeight,avW=land?innerWidth-260:innerWidth-24,avH=land?innerHeight-80:innerHeight-80-(n>6?190:120);return Math.max(14,Math.floor(Math.min(avW,avH)/CBN))}
// G-ART2 (R-03 T2): pixel art that looks like art. Squares are at least 32 px (pxCell); on a phone the picture is bigger than the
// screen: two fingers (or the Move tool) move it, pinch or the zoom tool shows it whole. A coloured square is a bead with a light
// edge and its number fades away; unfinished squares show a faint tint of their colour. Done keeps it in the gallery; the last
// square shows the finished picture in a frame.
function pxCell(W,H,n){const land=W>H,avW=land?W-260:W-24,avH=land?H-80:H-80-(n>6?200:130);return Math.max(32,Math.floor(Math.min(avW,avH)/CBN))}
// the room the picture has on screen: below the top bar, beside (landscape) or above (portrait) the palette as it is laid out
function pxArea(n){const land=innerWidth>innerHeight,t=$('.gh-top'),pal=$('.cbpal'),top=t?t.getBoundingClientRect().bottom+8:84;
  if(land)return[innerWidth-(pal?pal.getBoundingClientRect().width+44:260),innerHeight-top-12];return[innerWidth-24,innerHeight-top-(pal?pal.getBoundingClientRect().height+28:(n>6?200:130))]}
function colorPic(id,mode){const d=cbData(id),cs=cbS(),fill=(cs.prog[id]||'0'.repeat(CBN*CBN)).split('');let sel=1,count=fill.filter(c=>c=='1').length;
  const ml=mode=='math3'?3:mode=='math2'?2:1,esHard=mode=='es2';if(mode.startsWith('math'))mode='math';if(esHard)mode='es';const facts=d.keys.map((k,i)=>mode=='math'?cbFact(i+1,ml):null);
  view(`${GH.top('art',{play:true,sub:d.name,tools:`<button class="btn icon sm gh-tool" id="pmove" aria-label="Move the picture" aria-pressed="false">${artIco('move',26)}</button>`+GH.tool('eye','Zoom','pzm')+artMusicTool(),chips:'<span class="stat gh-st" aria-label="Colored"><b id="cbp">0%</b></span>'})}
   <div class="cbwrap"><div class="cbcv pxv" id="pxv"><canvas id="cbc" role="img" aria-label="Your picture: tap a square with the chosen number"></canvas></div><div class="cbpal">${d.keys.map((k,i)=>`<button class="btn chip" data-n="${i+1}" style="--cc:${CB_COL[k][0]}"><span class="sw"></span><b>${mode=='math'?facts[i]:i+1}</b>${mode=='es'?`<small>${k}</small>`:''}</button>`).join('')}${UI.btn('Done',{kind:'primary',icon:'check',id:'adone',cls:'art-done'})}</div></div>`);
  const vw$=$('#pxv'),cv=$('#cbc'),x=cv.getContext('2d'),dpr=Math.min(2,devicePixelRatio||1),fade=new Map();
  let cell=pxCell(innerWidth,innerHeight,d.keys.length),fit=cell,ox=0,oy=0,VW=0,VH=0,flash=-1,flashT=0,moving=false,anim=0;
  const place=()=>{const W=CBN*cell;ox=W<=VW?(VW-W)/2:Math.min(0,Math.max(VW-W,ox));oy=W<=VH?(VH-W)/2:Math.min(0,Math.max(VH-W,oy));cv.style.transform=`translate(${ox}px,${oy}px)`};
  const layout=(keep)=>{const[aw,ah]=pxArea(d.keys.length);fit=Math.max(12,Math.floor(Math.min(aw,ah)/CBN));if(!keep)cell=pxCell(innerWidth,innerHeight,d.keys.length);
    VW=Math.min(aw,CBN*Math.max(cell,fit));VH=Math.min(ah,CBN*Math.max(cell,fit));vw$.style.width=VW+'px';vw$.style.height=VH+'px';
    cv.width=cv.height=Math.round(CBN*cell*dpr);cv.style.width=cv.style.height=CBN*cell+'px';place();draw()};
  function draw(){const s=cell*dpr,now=performance.now();x.clearRect(0,0,cv.width,cv.height);x.fillStyle='#f5f5f4';x.fillRect(0,0,cv.width,cv.height);
    x.textAlign='center';x.textBaseline='middle';x.font=`bold ${Math.floor(s*.46)}px Andika, sans-serif`;let live=false;
    d.num.forEach((n,i)=>{const cx=(i%CBN)*s,cy=Math.floor(i/CBN)*s,c=CB_COL[d.G[i]][0];
      if(fill[i]=='1'){pxBead(x,cx,cy,s,c);const f=fade.get(i);if(f!=null){const a=1-(now-f)/320;if(a>0){live=true;x.globalAlpha=a;x.fillStyle='#fff';x.fillText(n,cx+s/2,cy+s/2+1);x.globalAlpha=1}else fade.delete(i)}}
      else{x.fillStyle=n==sel?'#fef08a':shade(c,.86);x.fillRect(cx+1,cy+1,s-2,s-2);x.fillStyle=n==sel?'#1e3a8a':'#78716c';x.fillText(n,cx+s/2,cy+s/2+1)}
      if(i==flash){x.strokeStyle='#ef4444';x.lineWidth=3*dpr;x.strokeRect(cx+2,cy+2,s-4,s-4)}});
    const p=$('#cbp');if(p)p.textContent=Math.round(count/fill.length*100)+'%';cv.dataset.n=count;
    cancelAnimationFrame(anim);if(live)anim=requestAnimationFrame(draw)}
  const pick=n=>{sel=n;$$('.chip').forEach(c=>c.classList.toggle('on',+c.dataset.n==n));const k=d.keys[n-1];if(mode=='es')say(k,null,'es');else SFX.pop(n);draw()};
  $$('.chip').forEach(c=>c.onclick=()=>pick(+c.dataset.n));
  const cellAt=(px,py)=>{const r=cv.getBoundingClientRect(),cx=Math.floor((px-r.left)/cell),cy=Math.floor((py-r.top)/cell);return cx>=0&&cy>=0&&cx<CBN&&cy<CBN?cy*CBN+cx:-1};
  const paint=(i,tap)=>{if(i<0||fill[i]=='1')return;if(d.num[i]!=sel){if(tap){SFX.wrong();flash=i;clearTimeout(flashT);flashT=setTimeout(()=>{flash=-1;draw()},500);draw();
      if(mode=='es')say(d.keys[d.num[i]-1],null,'es')}return}
    fill[i]='1';count++;if(!artCalm())fade.set(i,performance.now());SFX.pop(count%6);draw();
    if(count%16==0){cs.prog[id]=fill.join('');save()}
    if(fill.every(c=>c=='1'))finishPic()};
  // one finger colours (tap or drag); two fingers, or one with Move on, move the picture; pinch zooms
  const ptrs=new Map();let one=null,pin=null;
  vw$.addEventListener('pointerdown',e=>{e.preventDefault();try{vw$.setPointerCapture(e.pointerId)}catch(_){}ptrs.set(e.pointerId,[e.clientX,e.clientY]);
    if(ptrs.size==1)one={x:e.clientX,y:e.clientY,ox,oy,i:cellAt(e.clientX,e.clientY),drag:false,pan:moving};
    else if(ptrs.size==2){one=null;const[a,b]=[...ptrs.values()];pin={d:Math.hypot(a[0]-b[0],a[1]-b[1]),c:cell,mx:(a[0]+b[0])/2,my:(a[1]+b[1])/2,ox,oy}}});
  vw$.addEventListener('pointermove',e=>{if(!ptrs.has(e.pointerId))return;ptrs.set(e.pointerId,[e.clientX,e.clientY]);
    if(pin&&ptrs.size==2){const[a,b]=[...ptrs.values()],dd=Math.hypot(a[0]-b[0],a[1]-b[1]),mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,nc=Math.max(fit,Math.min(64,pin.c*dd/Math.max(1,pin.d)));
      const r=vw$.getBoundingClientRect(),k=nc/pin.c,px=pin.mx-r.left,py=pin.my-r.top;ox=px-(px-pin.ox)*k+(mx-pin.mx);oy=py-(py-pin.oy)*k+(my-pin.my);
      if(Math.abs(nc-cell)>.5){cell=nc;cv.style.width=cv.style.height=CBN*cell+'px'}place();return}
    if(!one)return;if(one.pan){ox=one.ox+e.clientX-one.x;oy=one.oy+e.clientY-one.y;place();return}
    const i=cellAt(e.clientX,e.clientY);if(i!=one.i){if(!one.drag)paint(one.i,false);one.drag=true;one.i=i;paint(i,false)}});
  const up=e=>{ptrs.delete(e.pointerId);if(pin&&ptrs.size<2){pin=null;cell=Math.round(cell);layout(true)}
    if(one&&ptrs.size==0){if(!one.drag&&!one.pan)paint(cellAt(e.clientX,e.clientY),true);one=null}};
  vw$.addEventListener('pointerup',up);vw$.addEventListener('pointercancel',e=>{ptrs.delete(e.pointerId);one=null;if(ptrs.size<2&&pin){pin=null;layout(true)}});
  vw$.addEventListener('wheel',e=>{e.preventDefault();cell=Math.max(fit,Math.min(64,Math.round(cell*(e.deltaY>0?.88:1.14))));layout(true)},{passive:false});
  $('#pmove').onclick=e=>{moving=!moving;e.currentTarget.classList.toggle('on',moving);e.currentTarget.setAttribute('aria-pressed',String(moving));fb(moving?'Move: drag to look around':'Color: tap and drag to color','ok',1400)};
  $('#pzm').onclick=()=>{const big=pxCell(innerWidth,innerHeight,d.keys.length);cell=cell>fit?fit:big;layout(true);SFX.whoosh()};
  const leave=()=>{cs.prog[id]=fill.join('');save()};
  $('#adone').onclick=()=>{if(!count){fb('Color a square first, then tap Done.','warn',2000);return}if(fill.every(c=>c=='1'))return;leave();
    artSparkle(vw$,()=>{const res=artDone({k:'px',key:'px:'+id,n:d.name,d:pxBits(fill),star:false});
      artEnd(res,{n:d.name,star:false,keep:true,why:`Color every square to win its star (${fill.length-count} to go).`,pic:`<img class="px" src="${pxImg(d.G,fill,320)}" alt="">`})})};
  GH.wire({quit:()=>{leave();gtStop();artMusic(false);artBack()}});artMusicWire();
  function finishPic(){leave();gtStop();cell=fit;layout(true);
    setTimeout(()=>artSparkle(vw$,()=>{const res=artDone({k:'px',key:'px:'+id,n:d.name,d:'all',star:true,coins:5});cs.done[id]=1;delete cs.prog[id];save();
      artEnd(res,{n:d.name,pic:`<img class="px" src="${pxImg(d.G,fill,320)}" alt="">`})}),350)}
  pick(1);layout();let rs;const onR=()=>{clearTimeout(rs);rs=setTimeout(()=>{if($('#cbc')&&$('#pxv'))layout()},120)};addEventListener('resize',onR);
  gtStart('#gtm',()=>{leave();timeUpOverlay()});
  if(S.voice)setTimeout(()=>say(mode=='math'?'Solve the fact to find each color!':mode=='es'?'Tap a color to hear it in Spanish!':'Match the numbers to the colors!'),300)}

const FP_COLS=['rojo','naranja','amarillo','verde','verde oscuro','celeste','azul','morado','rosa','café','gris','negro','blanco'];
function freePaint(ai){const cs=cbS();const G=ai>=0?cs.art[ai].split(',').map(k=>k||'blanco'):cbGrid('blanco');let sel='rojo',saved=ai>=0,idx=ai;
  view(`${GH.top('art',{play:true,sub:'Free Paint',tools:GH.tool('download','Save to My Drawings','fsave')+artMusicTool()})}
   <div class="cbwrap"><div class="cbcv"><canvas id="cbc" role="img" aria-label="Your picture"></canvas></div><div class="cbpal fp">${FP_COLS.map(k=>`<button class="btn chip" data-k="${k}" style="--cc:${CB_COL[k][0]}"><span class="sw"></span></button>`).join('')}
    <button class="btn chip" data-k="fill" aria-label="Fill" title="Fill">${artIco('bucket',34)}</button><button class="btn chip" id="fclear" aria-label="Clear">${ico('trash',30)}</button>${UI.btn('Done',{kind:'primary',icon:'check',id:'adone',cls:'art-done'})}</div></div>`);
  const cv=$('#cbc'),x=cv.getContext('2d');let cs2=cbLayout(14),dpr=Math.min(2,devicePixelRatio||1),bucket=false;
  const size=()=>{cs2=cbLayout(14);cv.width=cv.height=cs2*CBN*dpr;cv.style.width=cv.style.height=cs2*CBN+'px';draw()};
  function draw(){const s=cs2*dpr;G.forEach((k,i)=>{x.fillStyle=CB_COL[k][0];x.fillRect((i%CBN)*s,Math.floor(i/CBN)*s,s+.5,s+.5)});x.strokeStyle='#0000000f';x.lineWidth=1;for(let i=1;i<CBN;i++){x.beginPath();x.moveTo(i*s,0);x.lineTo(i*s,CBN*s);x.moveTo(0,i*s);x.lineTo(CBN*s,i*s);x.stroke()}}
  const pick=k=>{if(k=='fill'){bucket=!bucket;$('[data-k="fill"]').classList.toggle('on',bucket);SFX.pop(2);return}sel=k;$$('.chip[data-k]').forEach(c=>c.classList.toggle('on',c.dataset.k==k||(c.dataset.k=='fill'&&bucket)));say(k,null,'es')};
  $$('.chip[data-k]').forEach(c=>c.onclick=()=>pick(c.dataset.k));
  const flood=(i,from)=>{if(from==sel)return;const st=[i];while(st.length){const j=st.pop();if(j<0||j>=G.length||G[j]!=from)continue;G[j]=sel;const cx=j%CBN;if(cx>0)st.push(j-1);if(cx<CBN-1)st.push(j+1);st.push(j-CBN,j+CBN)}};
  let down=false,last=-1;const cellAt=e=>{const r=cv.getBoundingClientRect(),cx=Math.floor((e.clientX-r.left)/cs2),cy=Math.floor((e.clientY-r.top)/cs2);return cx>=0&&cy>=0&&cx<CBN&&cy<CBN?cy*CBN+cx:-1};
  const paint=i=>{if(i<0)return;if(bucket){flood(i,G[i]);SFX.chime()}else{if(G[i]==sel)return;G[i]=sel;SFX.pop(R(0,5))}saved=false;draw()};
  cv.addEventListener('pointerdown',e=>{e.preventDefault();down=true;last=cellAt(e);paint(last);try{cv.setPointerCapture(e.pointerId)}catch(_){}});
  cv.addEventListener('pointermove',e=>{if(!down||bucket)return;const i=cellAt(e);if(i!=last){last=i;paint(i)}});
  cv.addEventListener('pointerup',()=>{down=false});
  const doSave=()=>{const str=G.join(',');if(idx>=0)cs.art[idx]=str;else{cs.art.unshift(str);cs.art=cs.art.slice(0,12);idx=0}saved=true;save()};
  $('#fsave').onclick=()=>{doSave();SFX.fanfare();confetti(20);fb('Saved to My Drawings!')};
  $('#fclear').onclick=()=>{G.fill('blanco');SFX.whoosh();saved=false;draw()};
  $('#adone').onclick=()=>{if(!G.some(k=>k!='blanco')){fb('Paint a square first, then tap Done.','warn',2000);return}doSave();
    artSparkle(cv,()=>{const res=artDone({k:'fp',n:'Block painting',d:G.map(k=>AB[Math.max(0,FP_COLS.indexOf(k))]).join(''),star:false});artEnd(res,{n:'Block painting',keep:true,pic:`<img class="px" src="${cbThumb(G,true,320)}" alt="">`})})};
  GH.wire({quit:()=>{if(!saved&&G.some(k=>k!='blanco'))doSave();gtStop();artMusic(false);classicColor('paint')}});artMusicWire();
  pick('rojo');size();addEventListener('resize',()=>{if($('#cbc')&&$('.fp'))size()});
  gtStart('#gtm',()=>{if(G.some(k=>k!='blanco'))doSave();timeUpOverlay()})}


var GAMES_VER='v181'; // last line: the whole file ran (checked by dataReady() before the app starts)
