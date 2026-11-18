# Star School on Google Play: what to set up (PLAY-01)

The app side is built (v180): a free sample, a one-time unlock bought through Google Play billing, Restore purchase, and the
web version on github.io staying fully open. This page lists what only the owner can do, in order.

## 1. What is still needed from you

- **A domain** you control (for example `starschool.app`). The Play app is a Trusted Web Activity (TWA): it shows the site from
  that domain, which must serve the same files as the repo root and a `/.well-known/assetlinks.json` file (Digital Asset Links)
  that names the app's package and signing key. github.io cannot be used for the Play app (the app never enters Play mode there,
  on purpose, so the web version is never locked).
- **The package name** (for example `app.starschool.twa`; it can never change after the first upload). Put it in
  `src/js/03-play.js` as `PLAY.PKG`, rebuild, and publish. Until then the app enters Play mode only from the start URL's
  `?src=play`.
- **A Google Play developer account** and a **payments profile** (Play Console > Setup > Payments profile), needed to sell anything.

## 2. Packaging (later, with the domain)

- Build the TWA with Bubblewrap (`npx @bubblewrap/cli init --manifest https://<domain>/manifest.json`).
- Set the **start URL to `/?src=play`** (twa-manifest.json `startUrl`). That is how the app knows it is the Play app.
- Turn on **Play Billing** in the TWA (Bubblewrap: `"features": {"playBilling": {"enabled": true}}`, then `bubblewrap update`).
  This adds the Digital Goods API and the Play payment method the app uses.
- Add the assetlinks.json Bubblewrap prints (with the Play App Signing key's SHA-256 from Play Console > Setup > App signing).
- Target audience includes children, so leave out anything Bubblewrap offers for ads or analytics.

## 3. Play Console

**In-app product** (Monetize > Products > In-app products > Create product):
- Product ID: **`unlock_all`** (exactly this; it is `PLAY.SKU` in `src/js/03-play.js`).
- Name: Unlock Star School. Description: Every world, game and puzzle, for every child on the tablet.
- Price: **9.99 USD** (Play converts it for other countries; the app shows Play's price, never a number of its own).
- It is a one-time, non-consumable product: the app never consumes it. Activate it.
- The "Launch price until January 31, 2027." line under the price is `PLAY.LAUNCH` in `src/js/03-play.js`; it hides itself
  from February 1, 2027 (`PLAY.LAUNCH_END`). Change the Play price on that date if the launch price ends.

**Testing before release**: Setup > License testing: add your Google account; then an internal test track. Buy, cancel, use a
"slow test card" (pending), and Restore purchase after reinstalling. Check in Order management that the test order is
**acknowledged** (Play refunds a purchase that is not acknowledged within 3 days; the app acknowledges it through the Digital
Goods API v1 `acknowledge()`, and with v2 the Play Billing in the TWA does it by itself; confirm with the first test order).

**App content** (Policy > App content):
- **Target audience and content**: ages 5 and under, 6-8, 9-12 (Pre-K to 6th grade). This puts the app in the **Families**
  program: accept the **Families policy** declaration.
- **Ads**: No, the app contains no ads.
- **Content rating**: fill in the IARC questionnaire (category: Reference, News, or Educational; no violence, no user content,
  no sharing, no location, no purchases of random items; it **does** have in-app purchases). Expect "Everyone" / PEGI 3.
- **Data safety**: no data collected, no data shared. Everything (progress, recordings) stays on the tablet; nothing is sent.
  Purchases are processed by Google Play (Google's own data handling, not declared by the app). Encryption in transit: not
  applicable (no data sent). Deletion: the family deletes everything with Grown-ups > Start over or by uninstalling.
- **Privacy policy**: required for Families apps; a short page on your domain saying the above (no data collected; recordings
  and progress stay on the device; purchases through Google Play).
- **Government apps / financial features / health**: No.

**Families policy points the app already meets**: no ads, no analytics, no accounts; children never see a price or a purchase
prompt (locked content shows "This world opens when a grown-up unlocks Star School." and OK); the price and the Unlock button
are only behind the grown-up question (a times-table question) or inside Grown-ups; no timers, no repeated prompts, no
"ask your parent" screens.

**Store listing**: say "Free to try, one-time unlock". Screenshots from `node tools/shots.js` (and `tools/out/play/` from the
smoke step PLAY-01 for the unlock screens).

## 4. What the free sample is

In each subject, the world a child of each grade starts in (Pre-K to 6th), with its lessons and practice stops; the pet,
stickers, missions, streak and report card; Mixed Practice, Fact Race, Fact Sprint and check-ins; the Puzzle of the Day; game
time earned and spent as usual on Coloring and Snack Stand; one child. With today's maps that is Math 8 of 16 worlds, Reading
8 of 10, Spanish 1 of 8 (Hola Plaza), Discover 3 of 3. The rule is one function (`PLAY.freeIds`, using `defStart` in
`src/js/42-paths.js`); changing it is a one-line change plus its test (test.js "play PLAY-01").
