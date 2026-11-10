/* ---------- screens ---------- */
const view=h=>{music(false);stopBalloons();if(typeof stopRace=='function')stopRace();if(typeof stopHC=='function')stopHC();if(typeof gtStop=='function')gtStop();const a=$('#app');a.style.animation='none';void a.offsetWidth;a.style.animation='';a.innerHTML=h};
const PET_YAY=['Yay!','Woo-hoo!','You did it!','So smart!','High five!','Awesome!','Super!'];
const PET_OOPS=['Oops! Try again!','You can do it!','Almost!','Hmm, look again!'];

