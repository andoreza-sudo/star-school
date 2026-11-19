import base64, json, os, re, sys
from PIL import Image, ImageDraw
# Build: python3 tools/build.py   (run from anywhere; writes index.html, bt/games/data.<VER>.js, sw.js, manifest.json, icons to the repo root)
# Bump VER on every release so tablets pick up the update.
VER = 'v182'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = ROOT
F = os.path.join(ROOT, 'tools', 'fonts', 'andika-latin-%s-normal.woff2')
S_DIR = os.path.join(ROOT, 'src')
# TEACH-2: lesson wording may be drafted by tools/author.js (an AI drafts, the owner reads). A script in src/js that names its draft
# (draft: '<path>.md') builds only when that draft's status line says "status: reviewed ..."; the build stops otherwise.
# python3 tools/build.py --drafts-only <root> runs just this gate on another tree (tools/test.js "author" does).
def draft_gate(root):
    bad, d = [], os.path.join(root, 'src', 'js')
    for n in sorted(os.listdir(d)):
        if not n.endswith('.js'):
            continue
        for m in re.finditer(r"\bdraft:\s*'([^']+\.md)'", open(os.path.join(d, n), newline='').read()):
            f = os.path.join(root, m.group(1))
            st = re.search(r'^status:\s*(\w+)', open(f).read(), re.M) if os.path.isfile(f) else None
            if not st or st.group(1).lower() != 'reviewed':
                bad.append('%s names the draft %s, which is %s' % (n, m.group(1), st.group(1).lower() if st else 'missing or has no status line'))
    return bad
# TEACH-2b: a drafted lesson (lsDraft('<stop>', ...) in src/js) takes its words from its draft, docs/drafts/<stop>.md. This writes
# src/js/52e-words.js (LSW) with the words of every draft that a script names AND whose status line says "reviewed"; an unreviewed draft
# is left out, so its lesson is not live (52g-drafted.js) and its words cannot ship. Marking a draft reviewed (by hand, or with
# node tools/author.js --approve) makes its lesson live at the next build. --words-only writes just this file; --words-check exits 1
# when the file on disk is not what the drafts say (tools/test.js).
WORDS_KEYS = ('idea', 'beats', 'reasons', 'home')
# TEACH-3: the grade 3-5 lessons (lsDraft3('<stop>', ...) in src/js, part teach35) take their reviewed words from their own file,
# src/js/52h-words.js (LSW3), so the grade 1-2 part does not carry them. One entry per words file: (file, const, the call that names a draft).
WORDS = (('52e-words.js', 'LSW', r"\blsDraft\('(\w+)'", 'TEACH-2b', 'teach12', '52g-drafted.js'),
         ('52h-words.js', 'LSW3', r"\blsDraft3\('(\w+)'", 'TEACH-3', 'teach35', '52j-lessons35.js'),
         ('52k-words4.js', 'LSW4', r"\blsDraft4\('(\w+)'", 'TEACH-4', 'teachrd', '52m-lessons4.js'))  # TEACH-4: the reading and Pre-K lessons
def words_js(root, w=WORDS[0]):
    fn, const, rx, chunk, part, src = w
    d, out = os.path.join(root, 'src', 'js'), {}
    named = set()
    for n in sorted(os.listdir(d)):
        if n.endswith('.js') and n not in [x[0] for x in WORDS]:
            named.update(re.findall(rx, open(os.path.join(d, n), newline='').read()))
    dd = os.path.join(root, 'docs', 'drafts')
    for n in sorted(os.listdir(dd)) if os.path.isdir(dd) else []:
        if not n.endswith('.md') or n[:-3] not in named:
            continue
        t = open(os.path.join(dd, n), encoding='utf-8').read()
        st, js = re.search(r'^status:\s*(\w+)', t, re.M), re.search(r'```json\n([\s\S]*?)\n```', t)
        if st and st.group(1).lower() == 'reviewed' and js:
            w = json.loads(js.group(1))
            out[n[:-3]] = {k: w[k] for k in WORDS_KEYS if k in w}
    body = ''.join('  %s: %s,\n' % (json.dumps(k), json.dumps(out[k], ensure_ascii=False, separators=(',', ':'))) for k in sorted(out))
    return ('/* ---------- %s: the words of the drafted lessons the owner has reviewed (part %s) ----------\n'
            '   BUILT by tools/build.py from docs/drafts/<stop>.md ("status: reviewed ...") for the scripts that name them (%s, %s):\n'
            '   never edit by hand. A draft that is not reviewed is never here, so its lesson is not live%s. */\n'
            'const %s = {\n' % (chunk, part, {'LSW': 'lsDraft', 'LSW3': 'lsDraft3'}.get(const, 'lsDraft4'), src,
                                 '' if const == 'LSW' else ' with its words (it runs on its hand-written fallback words)', const) + body + '};\n')
WORDS_FILE = os.path.join(ROOT, 'src', 'js', '52e-words.js')
# HINT-01: the mistake hints of Practice (src/js/39m-mist.js) take their words from docs/drafts/hints/<code>.md (drafted by
# node tools/author.js --hints-draft). Only a draft whose status line says "reviewed" is copied into src/js/39n-hintw.js (HINTW, part
# gen); a code with no reviewed line shows the round's generic hint. --words-only and --words-check cover this file too.
HINTS_FILE = '39n-hintw.js'
def hints_js(root):
    dd, out = os.path.join(root, 'docs', 'drafts', 'hints'), {}
    for n in sorted(os.listdir(dd)) if os.path.isdir(dd) else []:
        if not re.fullmatch(r'[A-Za-z0-9]+\.md', n):
            continue
        t = open(os.path.join(dd, n), encoding='utf-8').read()
        st, js = re.search(r'^status:\s*(\w+)', t, re.M), re.search(r'```json\n([\s\S]*?)\n```', t)
        if st and st.group(1).lower() == 'reviewed' and js:
            w = json.loads(js.group(1))
            if w.get('code') == n[:-3] and isinstance(w.get('line'), str) and w['line'].strip():
                out[n[:-3]] = w['line'].strip()
    body = ''.join('  %s: %s,\n' % (json.dumps(k), json.dumps(out[k], ensure_ascii=False)) for k in sorted(out))
    return ('/* ---------- HINT-01: the mistake hints the owner has reviewed (part gen) ----------\n'
            '   BUILT by tools/build.py from docs/drafts/hints/<code>.md ("status: reviewed ..."): never edit by hand. A hint that is\n'
            '   not reviewed is never here, so its mistake shows the generic hint (hmHint in 39m-mist.js). */\n'
            'const HINTW = {\n' + body + '};\n')
def write_words(root):
    for w in WORDS:
        open(os.path.join(root, 'src', 'js', w[0]), 'w', encoding='utf-8', newline='').write(words_js(root, w))
    open(os.path.join(root, 'src', 'js', HINTS_FILE), 'w', encoding='utf-8', newline='').write(hints_js(root))
if '--words-check' in sys.argv:
    _w = sys.argv[sys.argv.index('--words-check') + 1] if len(sys.argv) > sys.argv.index('--words-check') + 1 else ROOT
    _bad = [w[0] for w in WORDS if (os.path.isfile(os.path.join(_w, 'src', 'js', w[0])) or w[0] == '52e-words.js')
            and not (os.path.isfile(os.path.join(_w, 'src', 'js', w[0])) and open(os.path.join(_w, 'src', 'js', w[0]), encoding='utf-8', newline='').read() == words_js(_w, w))]
    _hf = os.path.join(_w, 'src', 'js', HINTS_FILE)
    if os.path.isfile(_hf) and open(_hf, encoding='utf-8', newline='').read() != hints_js(_w):
        _bad.append(HINTS_FILE)
    print('words: the words files match the reviewed drafts' if not _bad else 'words: %s is not what the reviewed drafts say (run python3 tools/build.py)' % ', '.join(_bad))
    sys.exit(0 if not _bad else 1)
if '--words-only' in sys.argv:
    write_words(ROOT)
    print('wrote src/js/52e-words.js, src/js/52h-words.js, src/js/52k-words4.js and src/js/39n-hintw.js')
    sys.exit(0)
if '--drafts-only' in sys.argv:
    _bad = draft_gate(sys.argv[sys.argv.index('--drafts-only') + 1])
    print('\n'.join(_bad) or 'drafts: every named draft is reviewed')
    sys.exit(1 if _bad else 0)
_bad = draft_gate(ROOT)
if _bad:
    sys.exit('build refused: a lesson script uses words nobody has reviewed yet (tools/author.js):\n  ' + '\n  '.join(_bad))
write_words(ROOT)  # TEACH-2b: the reviewed words, before the parts are read (TEACH-3: and the grade 3-5 ones)
# A11b: code that is only needed once a child opens it lives in more precached files, one per entry of PARTS: the file stem, then a
# regular expression for the file names (whole name) in src/js and src/css that go there instead of into index.html. Each part file
# is <stem>.<VER>.js: a <style> it adds to <head> (its src/css files, if any), its src/js files (sorted), and a last line
# `var <STEM>_VER='<VER>'`. Keep one entry per line: tools/test.js reads this list. See CONTRIBUTING 3.3.
PARTS = [
    ('gen', r'(23-viz|30-gen-math|31-gen-math-early|32-gen-read|33-gen-math-mid|34-gen-es|39m-mist|39n-hintw|80-grown|81-backup|82-report|88-online|89-play)\.js'),  # A11c: math visuals and the question generators, part 1; ROOM: the Grown-ups screens (settings, backup, report, online note); PLAY-01: the Play app's unlock screens and purchase
    ('gen2', r'(35-gen-math-upper|36-gen-phonics|37-bank|37-comp|39b-steps|49b-kinds2|51b-checkin)\.js|(37b-kinds-c|51b-checkin)\.css'),  # A11c: question generators, part 2 (35 is the big one); KINDS2: the sort and mark kinds; CHECK-IN: check-ins and stop badges
    ('bt', r'\d+-bt-[\w-]+\.(js|css)'),  # Brain Teaser puzzle types NN-bt-*.js and NN-bt-*.css (74-teasers.js, the framework, stays)
    ('games', r'(60-gl|62-hill|62b-hill-gl|64-gtimer|66-colornum|68-lowpoly|70-art|72-shapes|59-game-hub)\.js|(48-game-hub|61-hill)\.css'),  # the Game Room: hub (P4-16) and the first games (G-02b moved Star Rally to games2, G-RALLY2 to rally, G-BB2 Block Builder to games3); GL-01: the shared WebGL layer and Hill Climb's 3D look
    ('rally', r'(63-game-race|63b-rally-gl)\.js|49-game-race\.css'),  # G-RALLY2: Star Rally on its own (games2 had passed its 400 KB warning); loads after games, before games2; GL-02: its 3D look (on games' GLX)
    ('games2', r'(?!60-game-blocks)\d+-game-[\w-]+\.(js|css)'),  # G-04a: every newer Game Room game NN-game-*.js / .css (Snack Stand, Sky Hop ...)
    ('games3', r'(60-blocks|61-bb-gl)\.js|60-game-blocks\.css'),  # G-BB2: Block Builder and its WebGL renderer (games was over its 400 KB warning)
    ('teach', r'52-lesson\.css|(52-lesson|52b-know|52c-scripts|52d-notebook)\.js'),  # TEACH-1: Sparky teaches (the lesson engine, the learner record and plan, the lesson scripts); TEACH-2: the notebook and the report's lessons card
    ('teach12', r'(52e-words|52f-bench|52g-drafted)\.js'),  # TEACH-2b: the grade 1-2 lessons (drafted words, their workbench pieces, their scripts): after teach, so the teach part stays under 150 KB
    ('teach35', r'(52h-words|52i-bench35|52j-lessons35|52n-bench3b|52o-lessons3b)\.js|(52h-teach35|52n-teach3b)\.css'),  # TEACH-3: the grade 3-5 lessons (their reviewed words, workbench, Check me, scripts): after teach12, which they build on; TEACH-3b: the grade 3-5 lessons TEACH-3 left out, and their models
    ('teachrd', r'(52k-words4|52l-bench4|52m-lessons4|52p-lessons4b)\.js|52k-teach4\.css'),  # TEACH-4: the reading lessons (K to 2) and the Pre-K lessons of Tiny Town and ABC Beach (their reviewed words, workbench, Check me, scripts): after teach35; the reading map loads it with teach and teach12, the math map too for a Pre-K child
    ('petage', r'17b-pet-age\.js'),  # PET-AGE2: the older kid and grown-up pet drawings (grades 3-6); petAgeWarm loads it, the little one is drawn until then
]
# P6-02: parts that index.html does NOT load at start (no <script> tag): partsThen() in src/js/90-app.js (LAZY_PARTS, the same list,
# checked by tools/test.js) loads them the first time they are needed (the Game Room). sw.js still precaches every part, so they work offline.
# P6-03: bt too (580 KB of puzzle code): BT.start() loads it the first time a puzzle opens; Home and the hub use BT.CAT (74-teasers.js).
# TEACH-1: and the lessons, teach: the math map loads them (teachWarm in 46-home.js); not a Game Room part (GAME_PARTS in 90-app.js).
# TEACH-2b: teach12 too (the grade 1-2 lessons), loaded with teach by the math map. PET-AGE2: petage (Home's: petAgeWarm, 17-pets-svg.js).
# TEACH-3: teach35 (the grade 3-5 lessons), loaded with teach and teach12 by the math map for a child in 3rd grade or up.
# TEACH-4: teachrd (the reading lessons and the Pre-K lessons), loaded with teach and teach12 by the reading map (Pre-K to 2nd), and by the math map for a Pre-K child.
LAZY = ('bt', 'games', 'rally', 'games2', 'games3', 'teach', 'teach12', 'teach35', 'teachrd', 'petage')
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
START = ['%s.%s.js' % (stem, VER) for stem, _ in PARTS if stem not in LAZY] + [DATA]  # P6-02: the files index.html loads at start
src = open(os.path.join(S_DIR, 'shell.html'), newline='').read()
src = src.replace('/*@@CSS@@*/\n', cat('css', '.css')).replace('/*@@JS@@*/\n', cat('js', '.js'))
src = src.replace('<!--@@PARTS@@-->\n', ''.join('<script src="%s"></script>\n' % f for f in START[:-1]))
src = src.replace('/*@@BOOT@@*/\n', open(os.path.join(S_DIR, 'boot.js'), newline='').read())
src = src.replace('__VER__', VER)
for w in ('400', '700'):
    src = src.replace('__F%s__' % w, base64.b64encode(open(F % w, 'rb').read()).decode())
open(OUT + '/index.html', 'w').write(src)
for stem, _ in PARTS:
    names = [n for sub in ('css', 'js') for n in sorted(os.listdir(os.path.join(S_DIR, sub))) if part_of(n) == stem]
    css = cat('css', '.css', stem)
    part = ('/* Star School ' + stem + ' ' + VER + '. BUILT by tools/build.py from ' + ', '.join(names) + ': never edit by hand.\n'
            + ('   index.html ' + VER + ' loads this file on demand (partsThen in src/js/90-app.js, P6-02), after ' + DATA + '. */\n' if stem in LAZY else
               '   index.html ' + VER + ' loads this file with <script src="' + stem + '.' + VER + '.js"> after its own code, before ' + DATA + '. */\n')
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

# ES-AUDIO: the recorded Spanish, audio/es/*.ogg (tools/es-audio.js; src/data/d-es-audio.js names them). Not loaded at start: say()
# fetches a file the first time its line is said. sw.js caches every one at install in a second cache, AUDIO_CACHE, which keeps its
# name across releases: a file's name is the hash of its text, voice and recipe, so a file never changes, and an update fetches only
# the new ones (activate drops the ones no release lists any more). Budget: tools/test.js AUDIO_FAIL (CONTRIBUTING 3.3).
# EN-PRAISE: the recorded English encouragement, audio/en/*.ogg (tools/en-audio.js; src/data/d-en-audio.js), the same way and cache.
# AUDIO lists 'es/<file>' then 'en/<file>' (file names are hashes that differ between the two: each recipe is part of its hash).
# TEACH-4: and the pet's recorded teacher lines, audio/teach/*.ogg (tools/en-audio.js; src/data/d-teach-audio.js), the same way and cache.
AUDIO = [d + '/' + n for d in ('es', 'en', 'teach') if os.path.isdir(os.path.join(ROOT, 'audio', d))
         for n in sorted(os.listdir(os.path.join(ROOT, 'audio', d))) if n.endswith('.ogg')]
AUDIO_BYTES = sum(os.path.getsize(os.path.join(ROOT, 'audio', n)) for n in AUDIO)
# Service worker. Cache name and precache list carry VER, so one release's index.html, part files and data file are cached and replaced together.
# Only good (2xx) responses are cached; a script that cannot be fetched offline fails as a script (never gets index.html as its body).
open(OUT + '/sw.js', 'w').write("""const C='starschool-"""+VER+"""';
const F=['./','./index.html',"""+''.join("'./%s'," % f for f in FILES)+"""'./manifest.json','./icon-192.png','./icon-512.png'];
const A='starschool-audio';
const AF=["""+','.join("'./audio/%s'" % n for n in AUDIO)+"""];
const aName=u=>new URL(u,self.location).pathname.split('/').pop();
self.addEventListener('install',e=>{e.waitUntil(Promise.all([caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))),
 caches.open(A).then(c=>c.keys().then(ks=>{const have=new Set(ks.map(r=>aName(r.url)));return c.addAll(AF.filter(u=>!have.has(aName(u))))}))]));self.skipWaiting()});
self.addEventListener('activate',e=>{const keep=new Set(AF.map(aName));e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!==A).map(k=>caches.delete(k))))
 .then(()=>caches.open(A)).then(c=>c.keys().then(ks=>Promise.all(ks.filter(r=>!keep.has(aName(r.url))).map(r=>c.delete(r))))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 const rg=e.request.headers.get('range');
 if(rg&&/\\/audio\\/e[ns]\\/|\\/audio\\/teach\\//.test(e.request.url)){e.respondWith(caches.match(e.request.url,{ignoreSearch:true}).then(r=>r?r.arrayBuffer().then(b=>{const m=/bytes=(\\d*)-(\\d*)/.exec(rg)||[],n=b.byteLength,s=m[1]?+m[1]:0,t=m[2]?Math.min(+m[2],n-1):n-1;
  return new Response(b.slice(s,t+1),{status:206,headers:{'Content-Type':r.headers.get('Content-Type')||'audio/ogg','Content-Range':'bytes '+s+'-'+t+'/'+n,'Content-Length':String(t-s+1)}})}):fetch(e.request)));return}
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
print('audio (ES-AUDIO, EN-PRAISE and TEACH-4, not loaded at start, precached by sw.js): %d files, %d bytes (budget: tools/test.js AUDIO_FAIL)' % (len(AUDIO), AUDIO_BYTES))
