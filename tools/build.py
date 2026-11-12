import base64, json, os, re
from PIL import Image, ImageDraw
# Build: python3 tools/build.py   (run from anywhere; writes index.html, bt/games/data.<VER>.js, sw.js, manifest.json, icons to the repo root)
# Bump VER on every release so tablets pick up the update.
VER = 'v141'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = ROOT
F = os.path.join(ROOT, 'tools', 'fonts', 'andika-latin-%s-normal.woff2')
S_DIR = os.path.join(ROOT, 'src')
# A11b: code that is only needed once a child opens it lives in more precached files, one per entry of PARTS: the file stem, then a
# regular expression for the file names (whole name) in src/js and src/css that go there instead of into index.html. Each part file
# is <stem>.<VER>.js: a <style> it adds to <head> (its src/css files, if any), its src/js files (sorted), and a last line
# `var <STEM>_VER='<VER>'`. Keep one entry per line: tools/test.js reads this list. See CONTRIBUTING 3.3.
PARTS = [
    ('gen', r'(23-viz|30-gen-math|31-gen-math-early|32-gen-read|33-gen-math-mid|34-gen-es)\.js'),  # A11c: math visuals and the question generators, part 1
    ('gen2', r'(35-gen-math-upper|36-gen-phonics|37-bank|37-comp|39b-steps)\.js'),  # A11c: question generators, part 2 (35 is the big one)
    ('bt', r'\d+-bt-[\w-]+\.(js|css)'),  # Brain Teaser puzzle types NN-bt-*.js and NN-bt-*.css (74-teasers.js, the framework, stays)
    ('games', r'(60-blocks|62-hill|64-gtimer|66-colornum|68-lowpoly|70-art|72-shapes|59-game-hub|63-game-race)\.js|(48-game-hub|49-game-race|60-game-blocks)\.css'),  # the Game Room: hub (P4-16) and the first five games
    ('games2', r'\d+-game-[\w-]+\.(js|css)'),  # G-04a: every newer Game Room game NN-game-*.js / .css (Snack Stand, then Sky Hop, Fishing Day ...)
]
def part_of(name):
    return next((stem for stem, rx in PARTS if re.fullmatch(rx, name)), None)
def cat(sub, ext, part=None):
    d = os.path.join(S_DIR, sub)
    return ''.join(open(os.path.join(d, n), newline='').read() for n in sorted(os.listdir(d)) if n.endswith(ext) and part_of(n) == part)
# A11: data banks in a second file. index.html = shell + css (sorted, minus parts) + one <script> with src/js (sorted, minus parts),
# then one <script src="<stem>.<VER>.js"> per part (PARTS order), then <script src="data.<VER>.js">, then a <script> with boot.js.
# data.<VER>.js = src/data (sorted) + a last line `var DATA_VER='<VER>'`. Classic scripts run in order and share one global scope,
# so all code has run before the data, as in the old single script (code, data, boot). boot.js starts the app only if every
# file's stamp matches the VER compiled into index.html (dataReady() in src/js/90-app.js).
DATA = 'data.%s.js' % VER
FILES = ['%s.%s.js' % (stem, VER) for stem, _ in PARTS] + [DATA]
src = open(os.path.join(S_DIR, 'shell.html'), newline='').read()
src = src.replace('/*@@CSS@@*/\n', cat('css', '.css')).replace('/*@@JS@@*/\n', cat('js', '.js'))
src = src.replace('<!--@@PARTS@@-->\n', ''.join('<script src="%s"></script>\n' % f for f in FILES[:-1]))
src = src.replace('/*@@BOOT@@*/\n', open(os.path.join(S_DIR, 'boot.js'), newline='').read())
src = src.replace('__VER__', VER)
for w in ('400', '700'):
    src = src.replace('__F%s__' % w, base64.b64encode(open(F % w, 'rb').read()).decode())
open(OUT + '/index.html', 'w').write(src)
for stem, _ in PARTS:
    names = [n for sub in ('css', 'js') for n in sorted(os.listdir(os.path.join(S_DIR, sub))) if part_of(n) == stem]
    css = cat('css', '.css', stem)
    part = ('/* Star School ' + stem + ' ' + VER + '. BUILT by tools/build.py from ' + ', '.join(names) + ': never edit by hand.\n'
            '   index.html ' + VER + ' loads this file with <script src="' + stem + '.' + VER + '.js"> after its own code, before ' + DATA + '. */\n'
            + ("(function(){var s=document.createElement('style');s.id='css-" + stem + "';s.textContent=" + json.dumps(css, ensure_ascii=False)
               + ";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)\n" if css else '')
            + cat('js', '.js', stem) + "\nvar " + stem.upper() + "_VER='" + VER + "'; // last line: the whole file ran (checked by dataReady() before the app starts)\n")
    open(OUT + '/%s.%s.js' % (stem, VER), 'w', encoding='utf-8', newline='').write(part)
data = ('/* Star School data banks ' + VER + '. BUILT by tools/build.py from src/data/*.js (sorted): never edit by hand.\n'
        '   index.html ' + VER + ' loads this file with <script src="' + DATA + '"> between the code and the start-up script. */\n'
        + cat('data', '.js') + "\nvar DATA_VER='" + VER + "'; // last line: the whole file ran (checked by dataReady() before the app starts)\n")
open(OUT + '/' + DATA, 'w', encoding='utf-8', newline='').write(data)
# only the current release's files stay at the repo root (GitHub Pages serves them; older ones would pile up)
for n in os.listdir(OUT):
    if re.fullmatch(r'[a-z0-9]+\.v\d+\.js', n) and n not in FILES:
        os.remove(os.path.join(OUT, n))

json.dump({"name": "Star School", "short_name": "Star School", "start_url": "./", "scope": "./",
           "display": "fullscreen", "display_override": ["fullscreen", "standalone"], "id": "./", "orientation": "any", "background_color": "#fff9ef", "theme_color": "#fff9ef",
           "icons": [{"src": "icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any"},
                     {"src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any"},
                     {"src": "icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable"},
                     {"src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]},
          open(OUT + '/manifest.json', 'w'), indent=1)

# Service worker. Cache name and precache list carry VER, so one release's index.html, part files and data file are cached and replaced together.
# Only good (2xx) responses are cached; a script that cannot be fetched offline fails as a script (never gets index.html as its body).
open(OUT + '/sw.js', 'w').write("""const C='starschool-"""+VER+"""';
const F=['./','./index.html',"""+''.join("'./%s'," % f for f in FILES)+"""'./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request,{cache:'no-store'}).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put('./index.html',cp))}return res}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res}).catch(()=>e.request.destination==='script'?Response.error():caches.match('./index.html'))))});
""")

# App icons (P4-12, DESIGN_SYSTEM 9 row 10): the app's logo mark, a star with a face on --brand, in the illustration style (light
# from the top left: a light rim on the upper-left edges, a shade rim on the lower-right ones, a ledge under it). Drawn 4x and scaled
# down, so the edges are smooth. Full bleed and opaque, so one file works as "any" and as "maskable": everything drawn sits inside
# the safe circle (radius 40% of the side, centred); outside it there is only the blue and its gloss (test.js checks this).
# Colours are the tokens' hex values (src/css/00-tokens.css).
import math
from PIL import ImageChops
def star_mask(S, cx, cy, R, r, w):
    m = Image.new('L', (S, S), 0)
    d = ImageDraw.Draw(m)
    pts = [(cx + (R if i % 2 == 0 else r) * math.sin(i * math.pi / 5), cy - (R if i % 2 == 0 else r) * math.cos(i * math.pi / 5)) for i in range(10)]
    d.polygon(pts, fill=255)
    d.line(pts + pts[:2], fill=255, width=int(w), joint='curve')  # a thick outline with round joins rounds the points
    return m
def app_icon(size):
    S = size * 4
    u = S / 100.0
    im = Image.new('RGB', (S, S), '#3B5BDB')  # --brand
    d = ImageDraw.Draw(im)
    base = (0x3B, 0x5B, 0xDB)
    for y in range(int(S * 0.62)):  # gloss: white fading out over the top 62% (like the in-app mark)
        a = 0.2 * (1 - y / (S * 0.62))
        d.line([(0, y), (S, y)], fill=tuple(int(v + (255 - v) * a) for v in base))
    for y in range(int(S * 0.84), S):  # a deeper band at the bottom, toward --brand-shade
        a = 0.75 * (y - S * 0.84) / (S * 0.16)
        d.line([(0, y), (S, y)], fill=tuple(int(v + (w - v) * a) for v, w in zip(base, (0x2F, 0x49, 0xB8))))
    def sparkle(x, y, r, col):  # four-point sparkle
        k = .26
        d.polygon([(x, y - r), (x + r * k, y - r * k), (x + r, y), (x + r * k, y + r * k), (x, y + r), (x - r * k, y + r * k),
                   (x - r, y), (x - r * k, y - r * k)], fill=col)
    sparkle(71 * u, 30 * u, 6.5 * u, '#FFF1C7')
    sparkle(22 * u, 69 * u, 4.6 * u, '#FFFFFF')
    d.ellipse([78.2 * u, 63.2 * u, 81.8 * u, 66.8 * u], fill='#FFF1C7')
    d.ellipse([23 * u, 31 * u, 26 * u, 34 * u], fill='#FFFFFF')
    cx, cy, R, r, W = 50 * u, 53 * u, 27.5 * u, 14.8 * u, 7.5 * u
    star = star_mask(S, cx, cy, R, r, W)
    im.paste('#2F49B8', (0, int(4.2 * u)), star)                     # ledge on the background (--brand-shade)
    im.paste('#FFC93C', (0, 0), star)                                 # --star
    t = int(2.6 * u)
    im.paste('#F5A800', (0, 0), ImageChops.subtract(star, ImageChops.offset(star, -t, -t)))   # shade rim, lower right (--star-shade)
    im.paste('#FFF3A3', (0, 0), ImageChops.subtract(star, ImageChops.offset(star, t, t)))     # light rim, upper left (--ill-yellow-1)
    d = ImageDraw.Draw(im)
    d.ellipse([cx - 4.6 * u, cy - 21 * u, cx - 1.6 * u, cy - 16.4 * u], fill='#FFFFFF')         # glint on the top point
    d.ellipse([cx - 19.5 * u, cy - 9.6 * u, cx - 15.5 * u, cy - 6.8 * u], fill='#FFFFFF')        # and on the left arm
    for ex in (-6.8, 6.8):  # big eyes with two glints (--ill-ink)
        x, y = cx + ex * u, cy + 1.2 * u
        d.ellipse([x - 3.4 * u, y - 4.6 * u, x + 3.4 * u, y + 4.6 * u], fill='#1F2440')
        d.ellipse([x - 2.3 * u, y - 3.5 * u, x + 0.5 * u, y - 0.7 * u], fill='#FFFFFF')
        d.ellipse([x + 0.8 * u, y + 1.2 * u, x + 2.0 * u, y + 2.4 * u], fill='#FFFFFF')
    for ex in (-12.6, 12.6):  # round cheeks (--ill-pink)
        x, y = cx + ex * u, cy + 7 * u
        d.ellipse([x - 3.3 * u, y - 2.1 * u, x + 3.3 * u, y + 2.1 * u], fill='#FF97B8')
    d.arc([cx - 4.2 * u, cy + 3.4 * u, cx + 4.2 * u, cy + 10.4 * u], 22, 158, fill='#1F2440', width=int(1.8 * u))  # small smile
    return im.resize((size, size), Image.LANCZOS)
for s in (192, 512):
    app_icon(s).save(OUT + '/icon-%d.png' % s, optimize=True)
print(os.listdir(OUT), os.path.getsize(OUT + '/index.html'), [os.path.getsize(OUT + '/' + f) for f in FILES])
