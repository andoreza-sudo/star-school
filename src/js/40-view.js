/* ---------- screens ---------- */
// P4-17: calm mode (Grown-ups switch, S.calm, read with a default) sets html.calm: no large movement, no confetti, no loops.
// Every screen adds it when S.calm is on; the switch (80-grown.js) turns it off again with calmApply(true).
function calmApply(sync){try{const c=document.documentElement.classList;if(S.calm)c.add('calm');else if(sync)c.remove('calm')}catch(e){}}
const view=h=>{music(false);calmApply();if(typeof NAV!='undefined'){if(NAV.gwK)NAV.gwK=0;else NAV.gwT=0} // RC-2: a child screen ends the grown-up session
  if(typeof NAV!='undefined'&&NAV.held){NAV.held=false;if(typeof GH!='undefined')GH.held=false} // NAV-01: a Go Home? sheet the new screen removed
  stopBalloons();if(typeof stopRace=='function')stopRace();if(typeof stopFlu=='function')stopFlu();if(typeof stopHC=='function')stopHC();if(typeof rlStop=='function')rlStop();if(typeof snStop=='function')snStop();if(typeof hopStop=='function')hopStop();if(typeof gtStop=='function')gtStop();if(typeof BT!='undefined')BT.stop();if(typeof TR!='undefined')TR.stop();if(typeof JFX!='undefined')JFX.stop();const a=$('#app');a.style.animation='none';void getComputedStyle(a).animationName;a.style.animation='';if(a.removeAttribute)a.removeAttribute('aria-hidden');a.innerHTML=h;UI.modal.init();UI.heading(a);if(typeof SWU!='undefined'&&SWU.due===1)setTimeout(SWU.try,0);if(typeof NAV!='undefined'&&a.querySelector&&a.querySelector('.gh-top:not(.gh-play)'))NAV.bar('games')}; // NAV-01: a game's menus (its top bar without .gh-play) get the picture bar with Games lit; P6-02: a style read restarts the screen-in (offsetWidth laid out the old screen first); P6-01: dialogs, keyboard, the screen's h1 (14-ui.js)
const PET_YAY=['Yay!','Woo-hoo!','You did it!','So smart!','High five!','Awesome!','Super!'];
const PET_OOPS=['Oops! Try again!','You can do it!','Almost!','Hmm, look again!'];

