import base64, json, os, re
from PIL import Image, ImageDraw
# Build: python3 tools/build.py   (run from anywhere; writes index.html, data.<VER>.js, sw.js, manifest.json, icons to the repo root)
# Bump VER on every release so tablets pick up the update.
VER = 'v100'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = ROOT
F = os.path.join(ROOT, 'tools', 'fonts', 'andika-latin-%s-normal.woff2')
S_DIR = os.path.join(ROOT, 'src')
def cat(sub, ext):
    d = os.path.join(S_DIR, sub)
    return ''.join(open(os.path.join(d, n), newline='').read() for n in sorted(os.listdir(d)) if n.endswith(ext))
# A11: two files. index.html = shell + css (sorted) + one <script> with src/js (sorted), then <script src="data.<VER>.js">, then a
# <script> with boot.js. data.<VER>.js = src/data (sorted) + a last line `var DATA_VER='<VER>'`. Classic scripts run in order and
# share one global scope, so this is the same order as the old single script (code, data, boot). boot.js starts the app only
# if DATA_VER matches the VER compiled into index.html (dataReady() in src/js/90-app.js).
DATA = 'data.%s.js' % VER
src = open(os.path.join(S_DIR, 'shell.html'), newline='').read()
src = src.replace('/*@@CSS@@*/\n', cat('css', '.css')).replace('/*@@JS@@*/\n', cat('js', '.js'))
src = src.replace('/*@@BOOT@@*/\n', open(os.path.join(S_DIR, 'boot.js'), newline='').read())
src = src.replace('__VER__', VER)
for w in ('400', '700'):
    src = src.replace('__F%s__' % w, base64.b64encode(open(F % w, 'rb').read()).decode())
open(OUT + '/index.html', 'w').write(src)
data = ('/* Star School data banks ' + VER + '. BUILT by tools/build.py from src/data/*.js (sorted): never edit by hand.\n'
        '   index.html ' + VER + ' loads this file with <script src="' + DATA + '"> between the code and the start-up script. */\n'
        + cat('data', '.js') + "\nvar DATA_VER='" + VER + "'; // last line: the whole file ran (checked by dataReady() before the app starts)\n")
open(OUT + '/' + DATA, 'w', encoding='utf-8', newline='').write(data)
# only the current data file stays at the repo root (GitHub Pages serves it; older ones would pile up)
for n in os.listdir(OUT):
    if re.fullmatch(r'data\.v\d+\.js', n) and n != DATA:
        os.remove(os.path.join(OUT, n))

json.dump({"name": "Star School", "short_name": "Star School", "start_url": "./", "scope": "./",
           "display": "fullscreen", "display_override": ["fullscreen", "standalone"], "id": "./", "orientation": "any", "background_color": "#fff8ec", "theme_color": "#fff8ec",
           "icons": [{"src": "icon-192.png", "sizes": "192x192", "type": "image/png"},
                     {"src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable"}]},
          open(OUT + '/manifest.json', 'w'), indent=1)

# Service worker. Cache name and precache list carry VER, so one release's index.html and data file are cached and replaced together.
# Only good (2xx) responses are cached; a script that cannot be fetched offline fails as a script (never gets index.html as its body).
open(OUT + '/sw.js', 'w').write("""const C='starschool-"""+VER+"""';
const F=['./','./index.html','./"""+DATA+"""','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request,{cache:'no-store'}).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put('./index.html',cp))}return res}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res}).catch(()=>e.request.destination==='script'?Response.error():caches.match('./index.html'))))});
""")

import math
for s in (192, 512):
    im = Image.new('RGB', (s, s), '#3b82f6')
    d = ImageDraw.Draw(im)
    cx, cy, R, r = s/2, s/2, s*0.36, s*0.15
    pts = [(cx + (R if i % 2 == 0 else r) * math.sin(i*math.pi/5), cy - (R if i % 2 == 0 else r) * math.cos(i*math.pi/5)) for i in range(10)]
    d.polygon(pts, fill='#facc15')
    im.save(OUT + '/icon-%d.png' % s)
print(os.listdir(OUT), os.path.getsize(OUT + '/index.html'), os.path.getsize(OUT + '/' + DATA))
