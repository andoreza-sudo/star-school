if (dataReady()) {
  loadClips();
  if (PRF.needPick()) PRF.pick(); // P5-10: more than one child: "Who is playing?" first
  else home(true);
} else dataMissing(); // A11, A11b: bt/games/data.<VER>.js missing or from another release (src/js/90-app.js)
