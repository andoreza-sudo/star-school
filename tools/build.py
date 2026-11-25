import base64, json, os, re, sys
# Build: python3 tools/build.py   (run from anywhere; writes index.html, bt/games/data.<VER>.js, sw.js, manifest.json, icons to the repo root)
# (BRAND, v193: the icons are copied from docs/brand/icons/, drawn by tools/brand-icons.js; the build no longer needs Pillow)
# Bump VER on every release so tablets pick up the update.
VER = 'v197'
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
         ('52k-words4.js', 'LSW4', r"\blsDraft4\('(\w+)'", 'TEACH-4', 'teachrd', '52m-lessons4.js'),  # TEACH-4: the reading and Pre-K lessons
         ('52s-words5.js', 'LSW5', r"\blsDraft5\('(\w+)'", 'TEACH-5S', 'teaches', '52t-lessons5s.js'))  # TEACH-5S: the Spanish and Discover lessons
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
            'const %s = {\n' % (chunk, part, {'LSW': 'lsDraft', 'LSW3': 'lsDraft3', 'LSW5': 'lsDraft5'}.get(const, 'lsDraft4'), src,
                                 '' if const == 'LSW' else ' with its words (it runs on its hand-written fallback words)', const) + body + '};\n')
WORDS_FILE = os.path.join(ROOT, 'src', 'js', '52e-words.js')
# HINT-01: the mistake hints of Practice (src/js/39m-mist.js) take their words from docs/drafts/hints/<code>.md (drafted by
# node tools/author.js --hints-draft). Only a draft whose status line says "reviewed" is copied into src/js/39n-hintw.js (HINTW, part
# hints, v182); a code with no reviewed line shows the round's generic hint. --words-only and --words-check cover this file too.
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
    return ('/* ---------- HINT-01: the mistake hints the owner has reviewed (part hints) ----------\n'
            '   BUILT by tools/build.py from docs/drafts/hints/<code>.md ("status: reviewed ..."): never edit by hand. A hint that is\n'
            '   not reviewed is never here, so its mistake shows the generic hint (hmHint in 39m-mist.js). */\n'
            'const HINTW = {\n' + body + '};\n')
# PERS-01: the interest themes of story problems (src/js/30p-pers.js) take their words from docs/drafts/pers/<id>.md (drafted by
# node tools/author.js --pers-draft, then read and rewritten by hand). Only a draft whose status line says "reviewed" is copied into
# src/js/39q-persw.js (PERSW, part hints); an interest that is not reviewed is never offered and never changes a problem.
# --words-only and --words-check cover this file too.
PERS_FILE = '39q-persw.js'
def pers_js(root):
    dd, out = os.path.join(root, 'docs', 'drafts', 'pers'), {}
    for n in sorted(os.listdir(dd)) if os.path.isdir(dd) else []:
        if not re.fullmatch(r'[a-z]+\.md', n):
            continue
        t = open(os.path.join(dd, n), encoding='utf-8').read()
        st, js = re.search(r'^status:\s*(\w+)', t, re.M), re.search(r'```json\n([\s\S]*?)\n```', t)
        if st and st.group(1).lower() == 'reviewed' and js:
            w = json.loads(js.group(1))
            if w.get('id') == n[:-3] and w.get('name') and isinstance(w.get('things'), list) and w['things']:
                out[n[:-3]] = {'name': w['name'], 'pic': w.get('pic') or [], 'things': w['things'], 'st': w.get('st') or {}}
    body = ''.join('  %s: %s,\n' % (json.dumps(k), json.dumps(out[k], ensure_ascii=False, separators=(',', ':'))) for k in sorted(out))
    return ('/* ---------- PERS-01: the interest themes the owner has reviewed (part hints) ----------\n'
            '   BUILT by tools/build.py from docs/drafts/pers/<id>.md ("status: reviewed ..."): never edit by hand. An interest that\n'
            '   is not reviewed is never here, so it is never offered and its story problems stay the default ones (30p-pers.js). */\n'
            'const PERSW = {\n' + body + '};\n')
# ASK-01: "Ask the pet" (src/js/39r-ask.js, part hints) takes its questions and answers from docs/drafts/ask/<id>.md (drafted by
# node tools/author.js --ask-draft, then read and rewritten by hand). Only a draft whose status line says "reviewed" is copied into
# src/js/39s-askw.js (ASKW, part hints), and src/js/39t-askon.js (ASK_ON, in index.html) counts them: with none reviewed, Home and the
# map draw no Ask button at all. --words-only and --words-check cover both files too.
ASK_FILE, ASKON_FILE = '39s-askw.js', '39t-askon.js'
def ask_words(root):
    dd, out = os.path.join(root, 'docs', 'drafts', 'ask'), {}
    for n in sorted(os.listdir(dd)) if os.path.isdir(dd) else []:
        if not re.fullmatch(r'[a-z]+\.md', n):
            continue
        t = open(os.path.join(dd, n), encoding='utf-8').read()
        st, js = re.search(r'^status:\s*(\w+)', t, re.M), re.search(r'```json\n([\s\S]*?)\n```', t)
        if st and st.group(1).lower() == 'reviewed' and js:
            w = json.loads(js.group(1))
            if w.get('id') == n[:-3] and isinstance(w.get('q'), str) and isinstance(w.get('a'), dict):
                out[n[:-3]] = {'q': w['q'], 'a': w['a']}
    return out
def ask_js(root):
    out = ask_words(root)
    body = ''.join('  %s: %s,\n' % (json.dumps(k), json.dumps(out[k], ensure_ascii=False, separators=(',', ':'))) for k in sorted(out))
    return ('/* ---------- ASK-01: the "Ask the pet" questions and answers the owner has reviewed (part hints) ----------\n'
            '   BUILT by tools/build.py from docs/drafts/ask/<id>.md ("status: reviewed ..."): never edit by hand. A question that is\n'
            '   not reviewed is never here, so it is never on the menu (39r-ask.js). */\n'
            'const ASKW = {\n' + body + '};\n')
def askon_js(root):
    return ('/* ASK-01: BUILT by tools/build.py (never edit): how many "Ask the pet" questions are reviewed (ASKW, 39s-askw.js, part hints).\n'
            '   0: Home and the map draw no Ask button (a let: tools/smoke.js sets it to try the menu). */\n'
            'let ASK_ON = %d;\n' % len(ask_words(root)))
def write_words(root):
    for w in WORDS:
        open(os.path.join(root, 'src', 'js', w[0]), 'w', encoding='utf-8', newline='').write(words_js(root, w))
    open(os.path.join(root, 'src', 'js', HINTS_FILE), 'w', encoding='utf-8', newline='').write(hints_js(root))
    open(os.path.join(root, 'src', 'js', PERS_FILE), 'w', encoding='utf-8', newline='').write(pers_js(root))
    open(os.path.join(root, 'src', 'js', ASK_FILE), 'w', encoding='utf-8', newline='').write(ask_js(root))
    open(os.path.join(root, 'src', 'js', ASKON_FILE), 'w', encoding='utf-8', newline='').write(askon_js(root))
if '--words-check' in sys.argv:
    _w = sys.argv[sys.argv.index('--words-check') + 1] if len(sys.argv) > sys.argv.index('--words-check') + 1 else ROOT
    _bad = [w[0] for w in WORDS if (os.path.isfile(os.path.join(_w, 'src', 'js', w[0])) or w[0] == '52e-words.js')
            and not (os.path.isfile(os.path.join(_w, 'src', 'js', w[0])) and open(os.path.join(_w, 'src', 'js', w[0]), encoding='utf-8', newline='').read() == words_js(_w, w))]
    _hf = os.path.join(_w, 'src', 'js', HINTS_FILE)
    if os.path.isfile(_hf) and open(_hf, encoding='utf-8', newline='').read() != hints_js(_w):
        _bad.append(HINTS_FILE)
    _pf = os.path.join(_w, 'src', 'js', PERS_FILE)
    if os.path.isfile(_pf) and open(_pf, encoding='utf-8', newline='').read() != pers_js(_w):
        _bad.append(PERS_FILE)
    for _f, _fn in ((ASK_FILE, ask_js), (ASKON_FILE, askon_js)):
        _af = os.path.join(_w, 'src', 'js', _f)
        if os.path.isfile(_af) and open(_af, encoding='utf-8', newline='').read() != _fn(_w):
            _bad.append(_f)
    print('words: the words files match the reviewed drafts' if not _bad else 'words: %s is not what the reviewed drafts say (run python3 tools/build.py)' % ', '.join(_bad))
    sys.exit(0 if not _bad else 1)
if '--words-only' in sys.argv:
    write_words(ROOT)
    print('wrote src/js/52e-words.js, src/js/52h-words.js, src/js/52k-words4.js, src/js/52s-words5.js, src/js/39n-hintw.js, src/js/39q-persw.js, src/js/39s-askw.js and src/js/39t-askon.js')
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
    ('gen', r'(23-viz|30-gen-math|30p-pers|31-gen-math-early|32-gen-read|33-gen-math-mid|34-gen-es|45-placement|50-say|50-say-cmp|50-say-corner|57-fluency|80-grown|81-backup|82-report|88-online|89-play)\.js'),  # A11c: math visuals and the question generators, part 1; ROOM: the Grown-ups screens (settings, backup, report, online note); PLAY-01: the Play app's unlock screens and purchase; MERGE-186 (ROOM 2): placement (Find my level), Say it! with its sound check and listening corner, and Fact Sprint, called only from screens after start-up (their CSS stays in index.html)
    ('gen2', r'(35-gen-math-upper|36-gen-phonics|37-bank|37-comp|39b-steps|49b-kinds2|51b-checkin)\.js|(37b-kinds-c|51b-checkin)\.css'),  # A11c: question generators, part 2 (35 is the big one); KINDS2: the sort and mark kinds; CHECK-IN: check-ins and stop badges
    ('bt', r'\d+-bt-[\w-]+\.(js|css)|d-(puz-[a-z]+|riddles|memory|words-bt)\.js'),  # Brain Teaser puzzle types NN-bt-*.js and NN-bt-*.css (74-teasers.js, the framework, stays); TRIM-START (v196): and the src/data files only those types read (PUZ, RIDDLES, MEMW, BTW, 130 KB, read only inside functions), off the start-up path
    ('games', r'(60-gl|62-hill|62b-hill-gl|64-gtimer|66-colornum|68-lowpoly|70-art|72-shapes|59-game-hub|59b-fx)\.js|(48-game-hub|61-hill)\.css'),  # the Game Room: hub (P4-16) and the first games (G-02b moved Star Rally to games2, G-RALLY2 to rally, G-BB2 Block Builder to games3); GL-01: the shared WebGL layer and Hill Climb's 3D look
    ('rally', r'(63-game-race|63b-rally-gl)\.js|49-game-race\.css'),  # G-RALLY2: Star Rally on its own (games2 had passed its 400 KB warning); loads after games, before games2; GL-02: its 3D look (on games' GLX)
    ('games2', r'(?!60-game-blocks)\d+-game-[\w-]+\.(js|css)'),  # G-04a: every newer Game Room game NN-game-*.js / .css (Snack Stand, Sky Hop ...)
    ('games3', r'(60-blocks|61-bb-gl)\.js|60-game-blocks\.css'),  # G-BB2: Block Builder and its WebGL renderer (games was over its 400 KB warning)
    ('teach', r'52-lesson\.css|(52-lesson|52b-know|52c-scripts|52d-notebook)\.js'),  # TEACH-1: Sparky teaches (the lesson engine, the learner record and plan, the lesson scripts); TEACH-2: the notebook and the report's lessons card
    ('teach12', r'(52e-words|52f-bench|52g-drafted|d-teach-audio)\.js'),  # TEACH-2b: the grade 1-2 lessons (drafted words, their workbench pieces, their scripts): after teach, so the teach part stays under 150 KB
    ('teach35', r'(52h-words|52i-bench35|52j-lessons35|52n-bench3b|52o-lessons3b)\.js|(52h-teach35|52n-teach3b)\.css'),  # TEACH-3: the grade 3-5 lessons (their reviewed words, workbench, Check me, scripts): after teach12, which they build on; TEACH-3b: the grade 3-5 lessons TEACH-3 left out, and their models
    ('teachrd', r'(52k-words4|52l-bench4|52m-lessons4|52p-lessons4b|52q-bench5r|52r-lessons5r)\.js|(52k-teach4|52q-teach5r)\.css'),  # READ-SHAPES (v184): the reading lesson shapes 52q/52r; TEACH-4: the reading lessons (K to 2) and the Pre-K lessons of Tiny Town and ABC Beach (their reviewed words, workbench, Check me, scripts): after teach35; the reading map loads it with teach and teach12, the math map too for a Pre-K child
    ('teaches', r'(52s-bench5s|52s-words5|52t-lessons5s)\.js|52s-teach5s\.css'),  # TEACH-5S (v187): the Spanish and Discover lessons (their shapes, reviewed words and scripts): after teachrd, whose shapes they build on; the Spanish and Discover maps load it with teach, teach12 and teachrd
    ('teach6', r'(52u-bench6|52v-lessons6)\.js|52u-teach6\.css'),  # TEACH-6M (v188): the grade 6 math lessons (their models and scripts; their reviewed words are in teach35's 52h-words.js, as they are lsDraft3 lessons): after teach35, whose helpers they use; the math map loads it with teach, teach12 and teach35 for a 5th grader up
    ('petage', r'17b-pet-age\.js'),  # PET-AGE2: the older kid and grown-up pet drawings (grades 3-6); petAgeWarm loads it, the little one is drawn until then
    ('hints', r'(39m-mist|39n-hintw|39p-pers|39q-persw|39r-ask|39s-askw|39u-stage)\.js|(39p-pers|39r-ask|39u-stage)\.css'),  # v182: the Practice mistake hints (HINT-01: the engine and its reviewed words), off the start-up path; a Practice round loads it (hintsWarm in 50-round.js), the generic hint shows until then. PERS-01 (v185): the interest themes' reviewed words (39q-persw.js) and their picker (39p-pers.js, .css) ride along: until the part is in, story problems are the default ones. ASK-01 (v186): the Ask the pet menu (39r-ask.js, .css) and its reviewed words (39s-askw.js); Home and the map load the part when the Ask button is tapped
    ('gate', r'(41b-pin|41c-kidpw)\.js|(41b-pin|41c-kidpw)\.css'),  # RC-1 (v188): the Grown-ups PIN pad and the children's picture passwords, loaded when asked for (NAV.quiz, the picker)
]
# P6-02: parts that index.html does NOT load at start (no <script> tag): partsThen() in src/js/90-app.js (LAZY_PARTS, the same list,
# checked by tools/test.js) loads them the first time they are needed (the Game Room). sw.js still precaches every part, so they work offline.
# P6-03: bt too (580 KB of puzzle code): BT.start() loads it the first time a puzzle opens; Home and the hub use BT.CAT (74-teasers.js).
# TEACH-1: and the lessons, teach: the math map loads them (teachWarm in 46-home.js); not a Game Room part (GAME_PARTS in 90-app.js).
# TEACH-2b: teach12 too (the grade 1-2 lessons), loaded with teach by the math map. PET-AGE2: petage (Home's: petAgeWarm, 17-pets-svg.js).
# TEACH-3: teach35 (the grade 3-5 lessons), loaded with teach and teach12 by the math map for a child in 3rd grade or up.
# TEACH-4: teachrd (the reading lessons and the Pre-K lessons), loaded with teach and teach12 by the reading map (Pre-K to 2nd), and by the math map for a Pre-K child.
# TEACH-5S: teaches (the Spanish and Discover lessons), loaded with teach, teach12 and teachrd by the Spanish and Discover maps.
# v182: hints (the Practice mistake hints, HINT-01), loaded when a Practice round starts (hintsWarm, 50-round.js); start-up was over P6-03's 2.5 MB.
# TEACH-6M: teach6 (the grade 6 math lessons), loaded after teach35 by the math map for a 5th grader up and by a grade 6 lesson stop (lsParts).
# RC-1: gate (the Grown-ups PIN pad, the picture passwords), loaded by NAV.quiz, Grown-ups and the "Who is playing?" picker when asked for.
LAZY = ('bt', 'games', 'rally', 'games2', 'games3', 'teach', 'teach12', 'teach35', 'teachrd', 'teaches', 'teach6', 'petage', 'hints', 'gate')
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
    # REC-ALL: a part may also take a src/data file (d-teach-audio.js, the teacher manifest: 1289 lines are 62 KB, needed only in a lesson,
    # so it loads with teach12, which every lesson loads after teach, not at start; teach stays under 150 KB); it goes after the part's code
    names = [n for sub in ('css', 'js', 'data') for n in sorted(os.listdir(os.path.join(S_DIR, sub))) if part_of(n) == stem]
    css = cat('css', '.css', stem)
    part = ('/* Whistlestop ' + stem + ' ' + VER + '. BUILT by tools/build.py from ' + ', '.join(names) + ': never edit by hand.\n'
            + ('   index.html ' + VER + ' loads this file on demand (partsThen in src/js/90-app.js, P6-02), after ' + DATA + '. */\n' if stem in LAZY else
               '   index.html ' + VER + ' loads this file with <script src="' + stem + '.' + VER + '.js"> after its own code, before ' + DATA + '. */\n')
            + ("(function(){var s=document.createElement('style');s.id='css-" + stem + "';s.textContent=" + json.dumps(css, ensure_ascii=False)
               + ";document.head.appendChild(s)})(); // its src/css, after index.html's own CSS (the cascade order of a build without parts)\n" if css else '')
            + cat('js', '.js', stem) + cat('data', '.js', stem) + "\nvar " + stem.upper() + "_VER='" + VER + "'; // last line: the whole file ran (checked by dataReady() before the app starts)\n")
    open(OUT + '/%s.%s.js' % (stem, VER), 'w', encoding='utf-8', newline='').write(part)
data = ('/* Whistlestop data banks ' + VER + '. BUILT by tools/build.py from src/data/*.js (sorted): never edit by hand.\n'
        '   index.html ' + VER + ' loads this file with <script src="' + DATA + '"> between the code and the start-up script. */\n'
        + cat('data', '.js') + "\nvar DATA_VER='" + VER + "'; // last line: the whole file ran (checked by dataReady() before the app starts)\n")
open(OUT + '/' + DATA, 'w', encoding='utf-8', newline='').write(data)
# only the current release's files stay at the repo root (GitHub Pages serves them; older ones would pile up)
for n in os.listdir(OUT):
    if re.fullmatch(r'[a-z0-9]+\.v\d+\.js', n) and n not in FILES:
        os.remove(os.path.join(OUT, n))

# App icons (BRAND, v193; owner approved the D2 logo 2026-11-22; DESIGN_SYSTEM.md "Logo"). The PNGs are drawn from the logo SVGs
# (docs/brand/whistlestop-icon.svg, docs/brand/icon-small.svg) by `node tools/brand-icons.js` with Chrome, once, and committed in
# docs/brand/icons/: this build has no SVG renderer, and Chrome's pixels can change between versions, so the build only copies them (the same
# bytes on every machine). Re-run tools/brand-icons.js only when a logo SVG changes. "any": icon-192/512 (the rounded tile);
# "maskable": icon-maskable-192/512 (full bleed, the engine inside the safe circle); favicon-32.png (the small version).
import shutil
ICONS = ['icon-192.png', 'icon-512.png', 'icon-maskable-192.png', 'icon-maskable-512.png', 'favicon-32.png']
for f in ICONS:
    shutil.copyfile(os.path.join(ROOT, 'docs', 'brand', 'icons', f), os.path.join(OUT, f))
json.dump({"name": "Whistlestop", "short_name": "Whistlestop", "start_url": "./", "scope": "./",
           "description": "Offline math, reading, Spanish and discovery practice for Pre-K to 6th grade, with game time earned by learning.",
           # BRAND (v193): the splash screen is background_color with the icon on it, so both are the logo's dusk navy (--ink, the top of
           # its sky); theme_color (the status bar, or Chrome's bar in a tab) matches, as does the theme-color meta in src/shell.html
           "display": "fullscreen", "display_override": ["fullscreen", "standalone"], "id": "./", "orientation": "any", "background_color": "#1F2440", "theme_color": "#1F2440",
           "icons": [{"src": "icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any"},
                     {"src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any"},
                     {"src": "icon-maskable-192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable"},
                     {"src": "icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]},
          open(OUT + '/manifest.json', 'w'), indent=1)

# ES-AUDIO: the recorded Spanish, audio/es/*.ogg (tools/es-audio.js; src/data/d-es-audio.js names them). Not loaded at start: say()
# fetches a file the first time its line is said. sw.js caches every one in a second cache, A ('starschool-audio'), which keeps its
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
# A page that is not the app (privacy.html, assetlinks.json) is network first with the same NAV_MS race as the app page (Fable rename
# review): after 3 s its own cached copy if there is one (else it keeps waiting for the network); it is never stored as ./index.html.
open(OUT + '/sw.js', 'w').write("""const C='starschool-"""+VER+"""';
const F=['./','./index.html',"""+''.join("'./%s'," % f for f in FILES)+"""'./manifest.json',"""+''.join("'./%s'," % f for f in ICONS)+"""'./privacy.html'];
const A='starschool-audio';
const AF=["""+','.join("'./audio/%s'" % n for n in AUDIO)+"""];
const aName=u=>new URL(u,self.location).pathname.split('/').pop();
const NAV_MS=3000; // RC-1: a page open waits this long for the network, then the cached page (RC-2: once the cached page is served, a late
// network page is NOT cached: it would pair a new index.html with the old cache's parts, "needs to finish updating" offline)
// v194 fix2 (Fable): install waits for the code (F) only. The recordings (AF, about 2,400 files) are NOT part of it: one file that fails
// (a 503) would fail the whole install, so no service worker, and every open would start again from zero. They are cached after
// activation instead, when the page asks (a message 'audio', sent once the app is up and idle, and on every later open): fillAudio
// fetches the files not in A yet, AB at a time, each fetch and put on its own, a failure skipped (the next open tries it again).
// Until a file is cached, say() fetches it from the network, or uses the tablet's voice (12-speech.js esaFail).
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))));self.skipWaiting()});
// activate: the old release's caches go, but a recording one of them holds (fetched on demand) moves to A first if a release still lists it
// (names are content hashes); A keeps every file still listed and drops the others
self.addEventListener('activate',e=>{const keep=new Set(AF.map(aName)),isA=r=>/\\/audio\\//.test(r.url)&&keep.has(aName(r.url));
 e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!==A).map(k=>caches.open(k).then(o=>o.keys().then(rs=>Promise.all(rs.filter(isA).map(r=>o.match(r).then(x=>x&&caches.open(A).then(a=>a.put(r,x)))))))
  .catch(()=>{}).then(()=>caches.delete(k)))))
 .then(()=>caches.open(A)).then(c=>c.keys().then(ks=>Promise.all(ks.filter(r=>!keep.has(aName(r.url))).map(r=>c.delete(r))))).then(()=>self.clients.claim()))});
// sample fix (Fable's cheap-tablet rehearsal): on a slow connection 40 at a time kept the line a child needs now waiting behind the
// fill. Now AB at a time (10), and a batch starts only when no recording asked for by the page is on its way (dem: on-demand fetches)
// and the page is not speaking (a message 'hush' holds the fill for HUSH_MS; the page sends it as each recorded line starts, 90-app.js)
const AB=10,HUSH_MS=8000;let filling=null,dem=0,hushT=0;
const quiet=async()=>{while(dem>0||Date.now()<hushT)await new Promise(r=>setTimeout(r,250))};
const onDemand=r=>{dem++;const f=fetch(r),d=()=>{dem--};f.then(d,d);return f};
const fillAudio=()=>filling||(filling=caches.open(A).then(async c=>{const have=new Set((await c.keys()).map(r=>aName(r.url))),todo=AF.filter(u=>!have.has(aName(u)));let got=0;
 for(let i=0;i<todo.length;i+=AB){await quiet();await Promise.all(todo.slice(i,i+AB).map(u=>fetch(u).then(r=>r.ok?c.put(u,r).then(()=>{got++}):0).catch(()=>0)))}
 return{todo:todo.length,got}}).finally(()=>{filling=null}));
self.addEventListener('message',e=>{if(e.data==='audio')e.waitUntil(fillAudio());if(e.data==='hush')hushT=Date.now()+HUSH_MS});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 const rg=e.request.headers.get('range');
 if(rg&&/\\/audio\\/e[ns]\\/|\\/audio\\/teach\\//.test(e.request.url)){e.respondWith(caches.match(e.request.url,{ignoreSearch:true}).then(r=>r?r.arrayBuffer().then(b=>{const m=/bytes=(\\d*)-(\\d*)/.exec(rg)||[],n=b.byteLength,s=m[1]?+m[1]:0,t=m[2]?Math.min(+m[2],n-1):n-1;
  return new Response(b.slice(s,t+1),{status:206,headers:{'Content-Type':r.headers.get('Content-Type')||'audio/ogg','Content-Range':'bytes '+s+'-'+t+'/'+n,'Content-Length':String(t-s+1)}})}):onDemand(e.request)));return}
 if(e.request.mode==='navigate'&&!/\\/(index\\.html)?$/.test(new URL(e.request.url).pathname)){const net=fetch(e.request),own=()=>caches.match(e.request,{ignoreSearch:true});e.waitUntil(net.catch(()=>{}));
  e.respondWith(new Promise(ok=>{let done=0;const fin=r=>{if(!done&&r){done=1;ok(r)}},t=setTimeout(()=>own().then(fin),NAV_MS);
   net.then(r=>{clearTimeout(t);fin(r)},()=>{clearTimeout(t);own().then(r=>fin(r||Response.error()))})}));return}
 if(e.request.mode==='navigate'){let late=0;const net=fetch(e.request,{cache:'no-store'}).then(res=>{if(res.ok&&!late){const cp=res.clone();e.waitUntil(caches.open(C).then(c=>c.put('./index.html',cp)))}return res});
  e.waitUntil(net.catch(()=>{}));
  e.respondWith(new Promise(ok=>{let done=0;const fin=r=>{if(!done&&r){done=1;ok(r)}},old=()=>caches.match('./index.html');
   const t=setTimeout(()=>old().then(r=>{if(r)late=1;fin(r)}),NAV_MS);
   net.then(r=>{clearTimeout(t);fin(r)},()=>{clearTimeout(t);old().then(r=>fin(r||Response.error()))})}));return}
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||(/\\/audio\\//.test(e.request.url)?onDemand:fetch)(e.request).then(res=>{if(res.ok){const cp=res.clone();caches.open(/\\/audio\\//.test(e.request.url)?A:C).then(c=>c.put(e.request,cp))}return res}).catch(()=>e.request.destination==='script'?Response.error():caches.match('./index.html'))))});
""")

# The information page's project (owner decision 2026-11-20: whistlestoplearning.com is a static info page, site/landing.html; the app is on
# app.whistlestoplearning.com). Its Vercel project publishes only site/ (Root Directory), so the privacy policy and the icon are copied
# there from the repo root: one source, the same page on both hosts (test.js "rename" checks they match). docs/PLAY-SETUP.md step 1.
for f in ('privacy.html', 'icon-192.png'):
    shutil.copyfile(os.path.join(ROOT, f), os.path.join(ROOT, 'site', f))
print(os.listdir(OUT), os.path.getsize(OUT + '/index.html'), [os.path.getsize(OUT + '/' + f) for f in FILES])
print('audio (ES-AUDIO, EN-PRAISE and TEACH-4, not loaded at start, precached by sw.js): %d files, %d bytes (budget: tools/test.js AUDIO_FAIL)' % (len(AUDIO), AUDIO_BYTES))
