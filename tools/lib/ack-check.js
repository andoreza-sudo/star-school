// PLAY-01c: runs api/ack.js against a mocked Google (a throwaway key made here, never a real one) and prints one JSON line.
// tools/test.js "play PLAY-01c" checks the answers: a 400/404 or an unknown purchaseState is a 502 (never "cancelled", which
// would lock a parent who paid), 0/1/2 map to purchased/cancelled/pending, only a paid one is acknowledged, the OAuth token is cached.
const crypto = require('crypto'), path = require('path');
const { privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048, privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  publicKeyEncoding: { type: 'spki', format: 'pem' } });
process.env.PLAY_SERVICE_ACCOUNT = JSON.stringify({ client_email: 'test@example.invalid', private_key: privateKey });
process.env.PLAY_PACKAGE = 'test.package';
const h = require(path.join(__dirname, '..', '..', 'api', 'ack.js'));
let oauth = 0, acks = 0;
async function run(st, body, req) {
  global.fetch = async (u) => {
    if (u.includes('oauth2')) { oauth++; return { ok: true, json: async () => ({ access_token: 't', expires_in: 3600 }) }; }
    if (u.endsWith(':acknowledge')) { acks++; return { ok: true }; }
    return { ok: st === 200, status: st, json: async () => body };
  };
  let out = {};
  const res = { setHeader() {}, status(c) { out.c = c; return this; }, json(j) { out.j = j; } };
  await h(req || { method: 'POST', body: { token: 'abcdefghijkl', sku: 'unlock_all' } }, res);
  return out.c + ' ' + (out.j.state || out.j.error);
}
(async () => {
  const r = {};
  r.nf = await run(404); r.br = await run(400);
  r.p0 = await run(200, { purchaseState: 0, acknowledgementState: 0 }); r.acks0 = acks;
  r.p0a = await run(200, { purchaseState: 0, acknowledgementState: 1 }); r.acks1 = acks;
  r.p1 = await run(200, { purchaseState: 1 }); r.p2 = await run(200, { purchaseState: 2 }); r.none = await run(200, {});
  r.sku = await run(200, {}, { method: 'POST', body: { token: 'abcdefghijkl', sku: 'other' } });
  r.get = await run(200, {}, { method: 'GET' });
  r.long = await run(200, { purchaseState: 0, acknowledgementState: 1 }, { method: 'POST', body: { token: 'a'.repeat(1500), sku: 'unlock_all' } });
  r.oauth = oauth; r.acks = acks;
  console.log(JSON.stringify(r));
})();
