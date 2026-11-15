// Recorded voices (ES-AUDIO, EN-PRAISE): the shared recorder. tools/es-audio.js (Spanish) and tools/en-audio.js (English
// encouragement) collect their lines and call record() here, so both follow the same rules:
//   - one file per line and voice, named by the hash of the recipe (FORMAT), the voice and the text: a file never changes, so a
//     tablet's audio cache keeps it across releases, and changing the recipe records everything again
//   - xAI text to speech (WAV 24 kHz) through curl, not fetch: curl follows the session's HTTPS proxy settings (Node's fetch does
//     not). The network proxy adds the real API key: the request carries "Authorization: Bearer proxy-injected" and no key is
//     stored anywhere.
//   - the silence trimmed (30 ms kept before the voice, 120 ms after), then Opus 16 kbps mono in Ogg, no tags
//   - only lines without a file are sent (4 at a time, retry with backoff on 429 / 5xx / network errors); files no line uses are deleted
const fs = require('fs'), path = require('path'), crypto = require('crypto'), os = require('os'), cp = require('child_process');
const ROOT = path.join(__dirname, '..');

// fileOf(format, voice, key): the file name (without the extension). ES-AUDIO's names are this with its own FORMAT.
const fileOf = (format, voice, k) => crypto.createHash('sha1').update(format + '\n' + voice + '\n' + k).digest('hex').slice(0, 12);

const sleep = ms => new Promise(r => setTimeout(r, ms));
// POST json to an xAI endpoint with curl; the body goes in on stdin, the answer comes out on stdout
function curl(url, body) {
  return new Promise(res => {
    const p = cp.spawn('curl', ['-sS', '--max-time', '120', '-w', '\n%{http_code}', '-X', 'POST', url,
      '-H', 'Authorization: Bearer proxy-injected', '-H', 'Content-Type: application/json', '--data-binary', '@-']);
    const out = [], err = [];
    p.stdout.on('data', d => out.push(d)); p.stderr.on('data', d => err.push(d));
    p.on('close', code => {
      const b = Buffer.concat(out), nl = b.lastIndexOf(10);
      res({ code, status: nl >= 0 ? +b.slice(nl + 1).toString() : 0, body: nl >= 0 ? b.slice(0, nl) : b, err: Buffer.concat(err).toString().trim() });
    });
    p.stdin.end(JSON.stringify(body));
  });
}
// tts(text, voice, lang, speed) -> WAV bytes
async function tts(text, voice, lang, speed) {
  for (let a = 0; ; a++) {
    const r = await curl('https://api.x.ai/v1/tts', { text, voice_id: voice, language: lang, speed, output_format: { codec: 'wav', sample_rate: 24000 } });
    if (r.status == 200 && r.body.length > 1000 && r.body.slice(0, 4).toString() == 'RIFF') return r.body;
    const err = r.status ? 'HTTP ' + r.status + ' ' + r.body.slice(0, 120).toString() : 'curl ' + r.code + ' ' + r.err;
    const retry = !r.status || r.status == 200 || r.status == 429 || r.status >= 500;
    if (!retry || a >= 6) throw new Error(err);
    await sleep(Math.min(30000, 1000 * 2 ** a) + Math.random() * 500);
  }
}
// stt(file, lang) -> the text xAI speech to text hears in a recording (EN-PRAISE checks every new file with it)
function stt(file, lang) {
  for (let a = 0; ; a++) {
    const r = cp.spawnSync('curl', ['-sS', '--max-time', '60', '-X', 'POST', 'https://api.x.ai/v1/stt', '-H', 'Authorization: Bearer proxy-injected',
      '-F', 'model=grok-voice-transcribe-2.0', '-F', 'language=' + lang, '-F', 'file=@' + file]);
    try { const j = JSON.parse(r.stdout.toString()); if (typeof j.text == 'string') return j.text; } catch (e) {}
    if (a >= 3) return null;
    cp.spawnSync('sleep', [String(2 + a * 3)]);
  }
}
// trim the silence, then Opus 16 kbps mono in Ogg, no tags
function transcode(wav, out) {
  const tmp = path.join(os.tmpdir(), 'voiceaudio-' + process.pid + '-' + crypto.randomBytes(4).toString('hex') + '.wav');
  fs.writeFileSync(tmp, wav);
  try {
    cp.execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', tmp, '-af',
      'silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.12,areverse',
      '-ac', '1', '-c:a', 'libopus', '-b:a', '16k', '-application', 'voip', '-vbr', 'on', '-map_metadata', '-1', '-fflags', '+bitexact', '-flags:a', '+bitexact', out]);
  } finally { fs.rmSync(tmp, { force: true }); }
}

// record(jobs, {dir, ext, lang, speed, dry, check}): jobs = [{text, send?, voice, file}] (file without the extension; send is
// the text sent to the API when it differs from the line). Records the jobs whose file is missing; with check(job, path) a new
// file that fails the check is deleted and recorded again (up to 3 times). Returns {done, sent, failed}.
async function record(jobs, o) {
  const dir = path.join(ROOT, o.dir);
  fs.mkdirSync(dir, { recursive: true });
  const todo = jobs.filter(j => !fs.existsSync(path.join(dir, j.file + o.ext)));
  const chars = a => a.reduce((s, j) => s + (j.send || j.text).length, 0);
  console.log(`to record: ${todo.length} files, ${chars(todo)} characters (already recorded: ${jobs.length - todo.length})`);
  if (o.dry) return { done: 0, sent: 0, failed: [] };
  let done = 0, sent = 0;
  const failed = [], queue = todo.slice();
  const worker = async () => {
    for (let j; (j = queue.shift());) {
      const out = path.join(dir, j.file + o.ext);
      try {
        for (let a = 0; ; a++) {
          const wav = await tts(j.send || j.text, j.voice, o.lang, o.speed);
          sent += (j.send || j.text).length;
          transcode(wav, out);
          const bad = o.check ? o.check(j, out) : null;
          if (!bad) break;
          fs.rmSync(out, { force: true });
          if (a >= 2) throw new Error(bad);
        }
        if (++done % 25 == 0) console.log(`  ${done}/${todo.length} recorded`);
      } catch (e) { failed.push(j.voice + ' "' + j.text + '": ' + e.message); }
    }
  };
  await Promise.all(Array.from({ length: 4 }, worker));
  console.log(`recorded ${done}, characters sent ${sent}; failed ${failed.length}${failed.length ? ':\n  ' + failed.join('\n  ') : ''}`);
  return { done, sent, failed };
}
// prune(dir, ext, keep): delete the files of dir no line uses any more; returns [removed, bytes kept]
function prune(dir, ext, keep) {
  const d = path.join(ROOT, dir), gone = fs.readdirSync(d).filter(f => f.endsWith(ext) && !keep.has(f));
  gone.forEach(f => fs.rmSync(path.join(d, f)));
  return [gone.length, [...keep].reduce((s, f) => s + (fs.existsSync(path.join(d, f)) ? fs.statSync(path.join(d, f)).size : 0), 0)];
}

module.exports = { fileOf, tts, stt, transcode, record, prune, curl, ROOT };
