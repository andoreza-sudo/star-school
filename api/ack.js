// PLAY-01: the acknowledgement endpoint of the Star School Play app (a Vercel serverless function on the Play app's own site).
// Google Play refunds a purchase that nobody acknowledges within 3 days, and the Trusted Web Activity's billing does not acknowledge by
// itself (Digital Goods API v2 has no acknowledge()). The app (src/js/89-play.js PLAY.ack) posts {token, sku} here after a purchase,
// and again at every restore and start until it is confirmed. This reads the purchase from the Google Play Developer API
// (purchases.products.get) and, when it is paid and not acknowledged yet, acknowledges it (purchases.products.acknowledge).
// Answer: {state: 'purchased' | 'pending' | 'cancelled', acknowledged: true | false}; 400 for a bad request, 502 when Google cannot be asked or answers anything unexpected.
// Nothing is stored. Setup (docs/PLAY-SETUP.md): Vercel environment variables PLAY_SERVICE_ACCOUNT (the service account's JSON key,
// the whole file as one value) and PLAY_PACKAGE (the app's package name). No key is ever written in this file. No dependencies.
const crypto = require('crypto');

const SKU = 'unlock_all';
const API = 'https://androidpublisher.googleapis.com/androidpublisher/v3/applications/';
const b64u = b => Buffer.from(b).toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');

// an OAuth access token for the service account (JWT bearer grant, scope androidpublisher)
// The access token is cached for the life of the function instance (until 5 minutes before it expires), so a flood of requests
// does not cost one OAuth exchange each. Every call to Google has an 8-second timeout, so a slow answer becomes a 502 the app retries.
const T = 8000;
let cached = null;
async function accessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  if (cached && cached.email === sa.client_email && cached.exp > now + 300) return cached.tok;
  const head = b64u(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64u(JSON.stringify({ iss: sa.client_email, scope: 'https://www.googleapis.com/auth/androidpublisher',
    aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }));
  const sig = b64u(crypto.createSign('RSA-SHA256').update(head + '.' + claim).sign(sa.private_key));
  const r = await fetch('https://oauth2.googleapis.com/token', { signal: AbortSignal.timeout(T), method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=' + encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer') + '&assertion=' + head + '.' + claim + '.' + sig });
  if (!r.ok) throw new Error('token ' + r.status);
  const j = await r.json();
  cached = { email: sa.client_email, tok: j.access_token, exp: now + (j.expires_in || 3600) };
  return j.access_token;
}

async function readBody(req) {
  if (req.body && typeof req.body == 'object') return req.body;
  if (typeof req.body == 'string') return JSON.parse(req.body);
  let s = '';
  for await (const c of req) s += c;
  return JSON.parse(s || '{}');
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  let body;
  try { body = await readBody(req); } catch (e) { return res.status(400).json({ error: 'bad JSON' }); }
  const token = body && body.token, sku = body && body.sku;
  if (sku !== 'unlock_all') return res.status(400).json({ error: 'unknown product' });
  if (typeof token != 'string' || !/^[\w.\-]{10,2000}$/.test(token)) return res.status(400).json({ error: 'bad token' });
  let sa;
  try { sa = JSON.parse(process.env.PLAY_SERVICE_ACCOUNT || ''); } catch (e) { sa = null; }
  const pkg = process.env.PLAY_PACKAGE;
  if (!sa || !sa.client_email || !sa.private_key || !pkg) return res.status(500).json({ error: 'not set up' });
  try {
    const auth = { Authorization: 'Bearer ' + await accessToken(sa) };
    const url = API + encodeURIComponent(pkg) + '/purchases/products/' + SKU + '/tokens/' + encodeURIComponent(token);
    const g = await fetch(url, { headers: auth, signal: AbortSignal.timeout(T) });
    // A 400/404 can also mean a wrong PLAY_PACKAGE or product id, so it is never read as "cancelled": the app would then lock a parent
    // who paid. It is a 502, which the app treats as "Play lists it, so it is owned; ask again later".
    if (!g.ok) return res.status(502).json({ error: 'get ' + g.status });
    const p = await g.json(); // purchaseState: 0 purchased, 1 cancelled, 2 pending; acknowledgementState: 0 not yet, 1 acknowledged
    const state = { 0: 'purchased', 1: 'cancelled', 2: 'pending' }[p.purchaseState];
    if (!state) return res.status(502).json({ error: 'unexpected purchaseState' }); // never fail toward locking a payer
    if (state !== 'purchased') return res.status(200).json({ state, acknowledged: false });
    if (p.acknowledgementState === 1) return res.status(200).json({ state, acknowledged: true });
    const a = await fetch(url + ':acknowledge', { signal: AbortSignal.timeout(T), method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json' }, auth), body: '{}' });
    if (!a.ok) return res.status(502).json({ error: 'acknowledge ' + a.status });
    return res.status(200).json({ state, acknowledged: true });
  } catch (e) {
    return res.status(502).json({ error: 'google' });
  }
};
