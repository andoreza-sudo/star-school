/* ---------- Game juice kit (GFX-1): the effects every Game Room game shares ----------
   Lives in games.<VER>.js (the lazy Game Room part, tools/build.py PARTS), after 59-game-hub.js; nothing here runs at start-up.
   Rules for cheap tablets (Fable's review, section 4): every picture is made once into a canvas and stamped each frame; no blur,
   shadow blur, filters or blend modes in a game loop; at most 30 bits alive, reused from a pool, fewer when frames are slow; shake
   and flying stars are off with calm mode or prefers-reduced-motion. Colours are read from the tokens (no raw colours here).

     JFX.calm()                  true in calm mode or with reduced motion
     JFX.css(name)               a token's colour ('--ill-ink')
     JFX.ink(canvas, px, o)      a copy of a sprite with a thin outline in a dark shade of its own colours (made once, stamped after)
     JFX.tint(canvas, name)      the sprite's shape in one token colour (a hit flash, drawn over it see-through)
     JFX.pool(max)               a particle pool: emit(o), step(dt), each(fn), frame(dt) (halves the cap while frames take > 20 ms)
     JFX.shaker()                a gentle screen shake: kick(amp, s), at(dt) -> [dx, dy] (zero in calm mode)
     JFX.fly(x, y, to, kind)     a star or coin that flies from a screen point to a counter chip, which bumps (DOM, transform only)
*/
const JFX = (() => {
  const calm = () => !!(typeof S != 'undefined' && S && S.calm) ||
    (typeof matchMedia == 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const COL = {};
  const css = name => {
    if (COL[name]) return COL[name];
    let v = '';
    try { v = getComputedStyle(document.documentElement).getPropertyValue(name).trim(); } catch (e) {}
    return (COL[name] = v || 'black');
  };
  const can = (w, h) => {
    const c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(w));
    c.height = Math.max(1, Math.round(h));
    return c;
  };
  // the outline: the sprite stamped at 12 offsets round a circle of px, its colours pulled most of the way toward ink (so a green
  // pet gets a deep green-ink edge, not black), then the sprite itself on top. Same size as the sprite, so callers draw it as before.
  const INK = new WeakMap();
  function ink(src, px = 2, o = {}) {
    if (!src || !src.width) return src;
    const key = px + '|' + (o.tone || '') + '|' + (o.mix || '');
    let m = INK.get(src);
    if (m && m[key]) return m[key];
    const c = can(src.width, src.height), x = c.getContext('2d');
    for (let i = 0; i < 12; i++) {
      const a = i / 12 * Math.PI * 2;
      x.drawImage(src, Math.cos(a) * px, Math.sin(a) * px);
    }
    x.globalCompositeOperation = 'source-atop';
    x.globalAlpha = o.mix || .7;
    x.fillStyle = css(o.tone || '--ill-ink');
    x.fillRect(0, 0, c.width, c.height);
    x.globalAlpha = 1;
    x.globalCompositeOperation = 'source-over';
    x.drawImage(src, 0, 0);
    for (const k of ['ox', 'oy']) if (src[k] != null) c[k] = src[k];
    if (!m) INK.set(src, (m = {}));
    return (m[key] = c);
  }
  const TINT = new WeakMap();
  function tint(src, name = '--ill-white') {
    if (!src || !src.width) return src;
    let m = TINT.get(src);
    if (m && m[name]) return m[name];
    const c = can(src.width, src.height), x = c.getContext('2d');
    x.drawImage(src, 0, 0);
    x.globalCompositeOperation = 'source-in';
    x.fillStyle = css(name);
    x.fillRect(0, 0, c.width, c.height);
    if (!m) TINT.set(src, (m = {}));
    return (m[name] = c);
  }
  // bits: {x, y, vx, vy, g (gravity), life, r, c (colour role), k (kind), grow, drag}; dead ones go back to the free list
  function pool(max = 30) {
    const P = { max, cap: max, list: [], free: [], ema: 1 / 60 };
    P.emit = o => {
      if (P.list.length >= P.cap) return null;
      const q = P.free.pop() || {};
      q.x = o.x; q.y = o.y; q.vx = o.vx || 0; q.vy = o.vy || 0; q.g = o.g || 0; q.drag = o.drag || 0;
      q.life = q.max = o.life || .5; q.r = o.r || .1; q.c = o.c || 'w'; q.k = o.k || 'dot'; q.grow = !!o.grow; q.rot = o.rot || 0;
      P.list.push(q);
      return q;
    };
    // n bits in a ring from x, y (a burst); up: extra upward speed; the angle starts somewhere new each time
    P.burst = (x, y, n, c, sp, o = {}) => {
      if (calm()) n = Math.min(n, 3);
      const a0 = (P.list.length * 1.7) % 6.28;
      for (let i = 0; i < n; i++) {
        const a = a0 + i / n * 6.28;
        P.emit({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * .7 + (o.up || 0), c: Array.isArray(c) ? c[i % c.length] : c,
          life: (o.life || .5) + (i % 3) * .1, r: o.r, g: o.g, drag: o.drag, k: o.k, grow: o.grow, rot: o.rot });
      }
    };
    P.step = dt => {
      for (let i = P.list.length - 1; i >= 0; i--) {
        const q = P.list[i];
        q.life -= dt;
        if (q.life <= 0) {
          P.free.push(q);
          P.list[i] = P.list[P.list.length - 1];
          P.list.pop();
          continue;
        }
        if (q.drag) { q.vx *= 1 - q.drag * dt; q.vy *= 1 - q.drag * dt; }
        q.vy += q.g * dt;
        q.x += q.vx * dt;
        q.y += q.vy * dt;
      }
    };
    P.each = fn => { for (const q of P.list) fn(q, q.life / q.max); };
    // slow frames (a moving average over 20 ms): half as many bits until it is quick again
    P.frame = dt => {
      if (!(dt > 0)) return;
      P.ema += (Math.min(.1, dt) - P.ema) * .05;
      P.cap = P.ema > .02 ? Math.max(8, Math.round(P.max / 2)) : P.ema < .0175 ? P.max : P.cap;
    };
    P.clear = () => { while (P.list.length) P.free.push(P.list.pop()); };
    return P;
  }
  // a short shake that fades out; amp in the caller's own units
  function shaker() {
    const K = { a: 0, t: 0, d: .15 };
    K.kick = (amp, s = .15) => { if (!calm() && amp >= K.a * (K.t / K.d || 0)) { K.a = amp; K.t = K.d = s; } };
    K.at = dt => {
      if (K.t <= 0 || calm()) { K.t = 0; return [0, 0]; }
      K.t = Math.max(0, K.t - dt);
      const f = K.a * K.t / K.d, w = K.t * 90;
      return [Math.sin(w) * f, Math.cos(w * 1.3) * f * .7];
    };
    return K;
  }
  // a star or coin flying to its counter (a chip in the top bar); the chip bumps when it lands. Calm: only the bump
  let flying = 0;
  function fly(x, y, to, kind = 'star') {
    const t = typeof to == 'string' ? document.querySelector(to) : to;
    if (!t || !t.getBoundingClientRect) return;
    const bump = () => {
      t.classList.remove('jfx-bump');
      void t.offsetWidth;
      t.classList.add('jfx-bump');
      clearTimeout(t._jb);
      t._jb = setTimeout(() => t.classList.remove('jfx-bump'), 400);
    };
    if (calm() || flying >= 6 || typeof ico != 'function') return bump();
    const b = t.getBoundingClientRect(), e = document.createElement('span');
    e.className = 'jfx-fly jfx-' + kind;
    e.setAttribute('aria-hidden', 'true');
    e.innerHTML = ico(kind == 'coin' ? 'coin' : kind == 'nut' ? 'nut' : 'star', 28);
    e.style.transform = `translate(${Math.round(x - 14)}px,${Math.round(y - 14)}px) scale(1.25)`;
    document.body.appendChild(e);
    flying++;
    const done = () => {
      if (!e.parentNode) return;
      e.remove();
      flying--;
      bump();
    };
    requestAnimationFrame(() => requestAnimationFrame(() => {
      e.style.transform = `translate(${Math.round(b.left + 6)}px,${Math.round(b.top + b.height / 2 - 14)}px) scale(.7)`;
      e.style.opacity = '.6';
    }));
    e.addEventListener('transitionend', done);
    setTimeout(done, 900);
  }
  return { calm, css, can, ink, tint, pool, shaker, fly };
})();
