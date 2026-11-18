# Star School on Google Play: what to set up (PLAY-01)

The app side is built (v180): a free sample, a one-time unlock bought through Google Play billing, Restore purchase, an
acknowledgement endpoint (`api/ack.js`), and the web version on github.io staying fully open. This page lists what only the
owner can do, in order.

## 1. What is still needed from you

- **A domain** you control (for example `starschool.app`), hosted on **Vercel** (it serves the repo root as the site and
  `api/ack.js` as a serverless function on the same domain; the app posts to `api/ack`). The Play app is a Trusted Web
  Activity (TWA): it shows the site from that domain, which must also serve `/.well-known/assetlinks.json` (Digital Asset Links)
  naming the app's package and signing key. github.io cannot be used for the Play app (the app never enters Play mode there, on
  purpose, so the web version is never locked).
- **The package name** (for example `app.starschool.twa`; it can never change after the first upload). Put it in
  `src/js/03-play.js` as `PLAY.PKG`, rebuild, and publish. Until then the app enters Play mode only from the start URL's
  `?src=play`.
- **A Google Play developer account** and a **payments profile** (Play Console > Setup > Payments profile), needed to sell anything.
- **A service account** for acknowledging purchases (section 3).

## 2. Packaging (later, with the domain)

- Build the TWA with Bubblewrap (`npx @bubblewrap/cli init --manifest https://<domain>/manifest.json`).
- Set the **start URL to `/?src=play`** (twa-manifest.json `startUrl`). That is how the app knows it is the Play app (it also
  checks that Google Play billing answers; in a normal browser `?src=play` does nothing).
- Turn on **Play Billing** in the TWA (Bubblewrap: `"features": {"playBilling": {"enabled": true}}`, then `bubblewrap update`).
  This adds the Digital Goods API and the Play payment method the app uses.
- Add the assetlinks.json Bubblewrap prints (with the Play App Signing key's SHA-256 from Play Console > Setup > App signing).
- Target audience includes children, so leave out anything Bubblewrap offers for ads or analytics.

## 3. Acknowledging purchases (required, or Google refunds every sale)

Google Play refunds a one-time purchase that is not **acknowledged** within 3 days. Nothing in the TWA does it by itself:
android-browser-helper (the TWA's Play Billing, checked in its source) acknowledges only when the page asks, and the Digital
Goods API v2 that Chrome now gives the page has no `acknowledge()`. So the app sends each purchase token to `api/ack` on your own
site after a purchase, and again at every restore and every start until it is confirmed. `api/ack.js` reads the purchase from
the Google Play Developer API (paid, pending, or cancelled) and acknowledges it there. It stores nothing.

Set it up once:
1. Google Cloud console: create (or pick) a project, enable the **Google Play Android Developer API**, create a **service
   account**, and create a **JSON key** for it (download the file; keep it private, never put it in the repo).
2. Play Console > Users and permissions > Invite new users: add the service account's e-mail, with the app's permissions
   **View financial data, orders, and cancellation survey responses** and **Manage orders and subscriptions**.
3. Vercel > the project > Settings > Environment Variables:
   - `PLAY_SERVICE_ACCOUNT`: the whole contents of the JSON key file, as one value.
   - `PLAY_PACKAGE`: the package name.
   Redeploy. Never add `api` to `.vercelignore` (it leaves out only src, tools, docs, README.md and .claude; test.js checks this).
4. Test it: install from an internal test track with a **licence tester** account (Setup > License testing), buy the unlock,
   then wait **5 minutes**: test purchases that are not acknowledged are refunded after about 3 minutes. In Order management
   the order must still be there, not refunded, and the Vercel function log shows `200`. If it was refunded, check the two
   variables and the service account's permissions. A wrong package name shows as `502 get 404` in the log: the app then keeps the
   unlock and asks again at every start, so fix the variable within 3 days.
5. Recommended: Vercel > the project > Firewall > add a rate-limit rule for the path `/api/ack` (for example 30 requests a minute
   per IP). Each request costs one Play Developer API call, and a flood could use up the API quota. The function already
   reuses its Google sign-in for an hour and gives up on Google after 8 seconds.

## 4. Play Console

**In-app product** (Monetize > Products > In-app products > Create product):
- Product ID: **`unlock_all`** (exactly this; it is `PLAY.SKU` in `src/js/03-play.js`, and `api/ack.js` accepts only it).
- Name: Unlock Star School. Description: Every world, stop and puzzle, for every child on the tablet.
- Price: **9.99 USD** (Play converts it for other countries; the app shows Play's price, never a number of its own).
- It is a one-time, non-consumable product: the app never consumes it. Activate it.
- The "Launch price until January 31, 2027." line under the price is `PLAY.LAUNCH` in `src/js/03-play.js`; it hides itself
  from February 1, 2027 (`PLAY.LAUNCH_END`). Change the Play price on that date if the launch price ends.

**Testing before release**: a licence tester on an internal track. Buy, cancel, use the "slow test card" (pending: the app
waits and opens by itself once paid), and Restore purchase after reinstalling (the sheet finds the purchase as it opens).

**App content** (Policy > App content):
- **Target audience and content**: ages 5 and under, 6-8, 9-12 (Pre-K to 6th grade). This puts the app in the **Families**
  program: accept the **Families policy** declaration.
- **Ads**: No, the app contains no ads.
- **Content rating**: fill in the IARC questionnaire (Educational; no violence, no user content, no sharing, no location; it
  **does** have in-app purchases). Expect "Everyone" / PEGI 3.
- **Data safety**: no data collected, no data shared. Progress and recordings stay on the tablet. Purchases are processed by
  Google Play; the purchase token is sent to your own `api/ack` only to acknowledge the purchase and is not stored or linked to a
  person (processed ephemerally). Encryption in transit: yes (HTTPS). Deletion: Grown-ups > Start over, or uninstall. Read the
  current form's wording before answering; if in doubt, declare "Purchase history: collected, not shared, processed
  ephemerally, required for app functionality".
- **Privacy policy**: required for Families apps; a short page on your domain saying the above.
- **Government apps / financial features / health**: No.

**Families policy points the app already meets**: no ads, no analytics, no accounts; children never see a price or a purchase
prompt (locked content shows "This world opens when a grown-up unlocks Star School." and OK); the price and the Unlock button are
only behind the grown-up question (a times-table question), including in Grown-ups; no timers, no repeated prompts, no "ask your
parent" screens.

**Store listing**: say "Free to try, one-time unlock". Screenshots from `node tools/shots.js` (and `tools/out/play/` from the
smoke step PLAY-01 for the unlock screens).

## 5. What the free sample is

In each subject (Math, Reading, Spanish, Discover), the **first 5 stops** of the world a child of their current grade starts in,
with their lessons; every other stop and world waits for the unlock. Also free: **every Game Room game** (game time is still
earned only by learning), the pet, stickers, missions, streak, report card, Mixed Practice, Fact Race, Fact Sprint, check-ins,
the Puzzle of the Day (other Brain Teasers wait), and one child. `PLAY.FREE_STOPS` in `src/js/03-play.js` is the number of stops;
the rule is `PLAY.freeStop` (with `defStart` in `src/js/42-paths.js`), checked by test.js "play PLAY-01".
