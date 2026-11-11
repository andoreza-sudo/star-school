if (dataReady()) {
  loadClips();
  home(true);
} else dataMissing(); // A11: data.<VER>.js missing or from another release (src/js/90-app.js)
