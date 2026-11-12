/* ---------- screens ---------- */
// P4-17: calm mode (Grown-ups switch, S.calm, read with a default) sets html.calm: no large movement, no confetti, no loops.
// Every screen adds it when S.calm is on; the switch (80-grown.js) turns it off again with calmApply(true).
function calmApply(sync){try{const c=document.documentElement.classList;if(S.calm)c.add('calm');else if(sync)c.remove('calm')}catch(e){}}
const view=h=>{music(false);calmApply();stopBalloons();if(typeof stopRace=='function')stopRace();if(typeof stopFlu=='function')stopFlu();if(typeof stopHC=='function')stopHC();if(typeof rlStop=='function')rlStop();if(typeof snStop=='function')snStop();if(typeof hopStop=='function')hopStop();if(typeof gtStop=='function')gtStop();if(typeof BT!='undefined')BT.stop();if(typeof TR!='undefined')TR.stop();const a=$('#app');a.style.animation='none';void a.offsetWidth;a.style.animation='';a.innerHTML=h};
const PET_YAY=['Yay!','Woo-hoo!','You did it!','So smart!','High five!','Awesome!','Super!'];
const PET_OOPS=['Oops! Try again!','You can do it!','Almost!','Hmm, look again!'];

