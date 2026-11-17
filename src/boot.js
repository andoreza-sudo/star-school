if (dataReady()) {
  loadClips();
  if (PRF.needPick()) PRF.pick(); // P5-10: more than one child: "Who is playing?" first
  else home(true);
} else dataMissing(); // A11, A11b: gen/gen2/data.<VER>.js missing or from another release (src/js/90-app.js; P6-02, P6-03: bt and the games load later)
