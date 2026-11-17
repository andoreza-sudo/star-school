/* ---------- the speed box (GL-01): frames per second on the tablet itself ----------
   A grown-up turns it on in Grown-ups (Tablet speed: S.fps, off by default; a default in migrate). A small box in the bottom left
   corner shows the frames drawn in the last second and the longest frame of the last 5 seconds, so the numbers can be read on a
   real tablet while a game runs; a game may add what it draws with (FPS.tag: Hill Climb says 3D or 2D). It measures with
   requestAnimationFrame only: nothing is drawn by it except its text, twice a second, and nothing is kept. */
const FPS = { on: false, raf: 0, el: null, t: new Float64Array(600), d: new Float32Array(600), i: 0, n: 0, last: 0, shown: 0, tag: '' };
function fpsSet(on) {
  FPS.on = !!on;
  if (!FPS.on) {
    if (FPS.raf) cancelAnimationFrame(FPS.raf);
    FPS.raf = 0; FPS.last = 0; FPS.n = 0;
    if (FPS.el) { FPS.el.remove(); FPS.el = null; }
    return;
  }
  if (!FPS.el) { const e = document.createElement('div'); e.className = 'fpsbox'; e.id = 'fpsbox'; e.setAttribute('aria-hidden', 'true'); e.textContent = '-- fps'; document.body.appendChild(e); FPS.el = e; }
  if (!FPS.raf) FPS.raf = requestAnimationFrame(fpsTick);
}
function fpsTick(ts) {
  FPS.raf = 0;
  if (!FPS.on) return;
  const dt = FPS.last ? ts - FPS.last : 0;
  if (dt > 0 && dt < 1000) { const k = FPS.i; FPS.t[k] = ts; FPS.d[k] = dt; FPS.i = (k + 1) % FPS.t.length; FPS.n = Math.min(FPS.t.length, FPS.n + 1); } // a hidden tab's gap is not a frame
  FPS.last = ts;
  if (ts - FPS.shown >= 500 && FPS.el) {
    FPS.shown = ts;
    let f = 0, w = 0;
    for (let j = 0; j < FPS.n; j++) { const a = ts - FPS.t[j]; if (a <= 1000) f++; if (a <= 5000 && FPS.d[j] > w) w = FPS.d[j]; }
    FPS.el.textContent = f + ' fps, worst ' + Math.round(w) + ' ms' + (FPS.tag ? ' ' + FPS.tag : '');
  }
  FPS.raf = requestAnimationFrame(fpsTick);
}
addEventListener('load', () => { try { if (S.fps) fpsSet(true); } catch (e) {} }); // after the start-up script has read the save
