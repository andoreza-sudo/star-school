if (dataReady()) {
  loadClips();
  home(true);
} else dataMissing(); // A11, A11b: bt/games/data.<VER>.js missing or from another release (src/js/90-app.js)
