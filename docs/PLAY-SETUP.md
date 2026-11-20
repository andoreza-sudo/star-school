# Whistlestop on Google Play: the owner's checklist (PLAY-01, RENAME)

The app side is built (PLAY-01 v180, renamed v191): a free sample, a one-time unlock bought through Google Play billing, Restore
purchase, an acknowledgement endpoint (`api/ack.js`), a privacy policy (`privacy.html`) and a Digital Asset Links template
(`.well-known/assetlinks.json`). The web version stays fully open. The Play app is a Trusted Web Activity (TWA): an Android shell
that shows https://whistlestoplearning.com/ full screen.

Fixed values used below:

| What | Value |
|------|-------|
| Domain | `whistlestoplearning.com` |
| Play title | Whistlestop: Kids Math & Reading |
| TWA start URL | `https://whistlestoplearning.com/?src=play` |
| Package name | `com.whistlestoplearning.app` (**proposed**: confirm it before the first upload; it can never change after that. If you pick another, change `PLAY.PKG` in `src/js/03-play.js` and `package_name` in `.well-known/assetlinks.json`, then rebuild and redeploy) |
| In-app product | `unlock_all`, one-time, 9.99 USD |
| Privacy policy | `https://whistlestoplearning.com/privacy.html` |
| Contact e-mail | `hello@whistlestoplearning.com` |

## The checklist, in order

You own whistlestoplearning.com. Do these in order; each step needs the one before it.

### 1. Vercel: import the repo and add the domain
1. On vercel.com, add a new project and import the GitHub repository. Framework preset: **Other**. No build command, no install
   command; the output is the repository root (the built files are committed).
2. Deploy. Open the `*.vercel.app` address it gives you: the app should start, and `/privacy.html` and
   `/.well-known/assetlinks.json` should open.
3. In the project's settings, find **Domains** and add `whistlestoplearning.com` (and `www.whistlestoplearning.com`, redirecting
   to it). Vercel shows the DNS records to create; add them where you bought the domain. Wait until Vercel shows the domain as valid
   (HTTPS is automatic).
4. Check: https://whistlestoplearning.com/ opens the app and the bottom of Home says "Whistlestop 1.0.0 (build v191)" or later.
   https://whistlestoplearning.com/.well-known/assetlinks.json must open as JSON, with no redirect (`vercel.json` already sends it
   as `application/json`; `.vercelignore` never leaves out `.well-known`, `privacy.html` or `api`).

### 2. E-mail forward
Set up `hello@whistlestoplearning.com` to forward to the inbox you read. Many domain registrars offer free e-mail forwarding;
otherwise use an e-mail forwarding service. Send a test message to it and check it arrives. This address is in the privacy policy
and goes in the Play listing as the contact e-mail.

### 3. Play Console: create the app (Families, ages, content rating)
1. You need a Google Play developer account and, to sell anything, a **payments profile** (in Play Console, find the payments
   profile under Setup).
2. Create the app: name **Whistlestop: Kids Math & Reading**, default language English (United States), **App**, **Free** (the
   unlock is an in-app product), and accept the declarations.
3. In Play Console, find **App content** (under Policy) and fill in each part:
   - **Privacy policy**: `https://whistlestoplearning.com/privacy.html`.
   - **Target audience and content**: ages **5 and under, 6-8, 9-12** (Pre-K to 6th grade). This puts the app in the **Families**
     program: accept the Families policy declaration.
   - **Ads**: No, the app contains no ads.
   - **Content rating**: the IARC questionnaire. Category: Educational. No violence, no user-generated content, no sharing between
     users, no location; it **does** have in-app purchases. Expect "Everyone" / PEGI 3.
   - **Data safety**: declare **Purchase history: collected, not shared, processed ephemerally, required for app functionality**
     (the purchase token goes to `api/ack` to acknowledge the purchase and is not stored). Nothing else is collected: progress,
     recordings and the PIN stay on the tablet. Data encrypted in transit: yes (HTTPS). Deletion: Grown-ups > Start over, or
     uninstall. Read the current form's wording before answering.
   - **App access**: "All or some functionality is restricted", with the reviewer note at the end of this page.
   - **Government apps, financial features, health**: No.

### 4. Package the app (Bubblewrap or PWABuilder)
Use the start URL and package name from the table above. With **Bubblewrap** (needs Node; it offers to install the JDK and Android
SDK it needs):
1. In an empty folder named `twa` (outside the repo, or inside it: `.vercelignore` leaves out `twa`, and `.gitignore` leaves out
   `*.keystore` and `*.jks`), run `npx @bubblewrap/cli init --manifest https://whistlestoplearning.com/manifest.json`.
2. Answer its questions: application ID (package) `com.whistlestoplearning.app`, app name and launcher name Whistlestop. It
   creates a signing key (the **upload key**): keep the keystore file and its passwords safe and private, outside git.
3. **Hand-edit `twa-manifest.json`**: Bubblewrap takes the start URL from the web manifest, which is `./` (so `/`). Change
   `"startUrl"` to `"/?src=play"`. That is how the app knows it is the Play app (it also checks that Google Play billing answers;
   in a normal browser `?src=play` does nothing).
4. Turn on Play Billing in `twa-manifest.json`: `"features": {"playBilling": {"enabled": true}}`. Leave out anything offered for
   ads or analytics (Families).
5. Run `npx @bubblewrap/cli update`, then `npx @bubblewrap/cli build`. Upload the `.aab` it makes in step 5.

With **PWABuilder** instead: package for Android from `https://whistlestoplearning.com`, set the package ID to
`com.whistlestoplearning.app` and the start URL to `/?src=play`, and make sure Play Billing is enabled in the options. Keep the
signing key it gives you.

### 5. App signing fingerprint into assetlinks.json
1. Upload the `.aab` to an **internal testing** release in Play Console (use Play App Signing, the default). Google then signs the
   app with its own **app signing key**.
2. In Play Console, find **App signing** (under Setup / App integrity) and copy the **SHA-256 certificate fingerprint of the app
   signing key** (the form `AB:CD:...`, 32 pairs).
3. In `.well-known/assetlinks.json`, replace `PLACEHOLDER_SHA256_FROM_PLAY_CONSOLE_APP_SIGNING_REPLACE_BEFORE_RELEASE` with it.
   To also test an APK you install yourself (signed with your upload key), add the upload key's SHA-256 as a second entry in the
   same list. `node tools/test.js --only rename` checks the file and notes while the placeholder is still there.
4. Commit and let Vercel redeploy; check https://whistlestoplearning.com/.well-known/assetlinks.json shows the fingerprint. When
   it is right, the installed app opens full screen with no address bar. If you see an address bar, the fingerprint or package
   name does not match.

### 6. The `unlock_all` product
In Play Console, find **In-app products** (under Monetize) and create one:
- Product ID: **`unlock_all`** (exactly; it is `PLAY.SKU` in `src/js/03-play.js`, and `api/ack.js` accepts only it).
- Name: Unlock Whistlestop. Description: Every world, stop and puzzle, for every child on the tablet.
- Price: **9.99 USD** (Play converts it for other countries; the app shows Play's price, never a number of its own).
- One-time, non-consumable: the app never consumes it. Activate it.
- The "Launch price until January 31, 2027." line under the price is `PLAY.LAUNCH` in `src/js/03-play.js`; it hides itself from
  February 1, 2027 (`PLAY.LAUNCH_END`). Change the Play price on that date if the launch price ends.

### 7. Service account and Vercel environment variables
Google Play refunds a one-time purchase that is not **acknowledged** within 3 days, and the TWA does not do it by itself (the
Digital Goods API v2 has no `acknowledge()`). So the app sends each purchase token to `api/ack` after a purchase, and again at every
restore and start until it is confirmed; `api/ack.js` reads the purchase from the Google Play Developer API and acknowledges it. It
stores nothing.
1. In the Google Cloud console: create (or pick) a project, enable the **Google Play Android Developer API**, create a **service
   account**, and create a **JSON key** for it. Keep the file private; never put it in the repo.
2. In Play Console, find **Users and permissions** and invite the service account's e-mail, with the app permissions **View
   financial data, orders, and cancellation survey responses** and **Manage orders and subscriptions**.
3. In Vercel, the project's settings, **Environment Variables**:
   - `PLAY_SERVICE_ACCOUNT`: the whole contents of the JSON key file, as one value.
   - `PLAY_PACKAGE`: `com.whistlestoplearning.app` (the package name).
   Redeploy. Never add `api` to `.vercelignore` (test.js checks this).
4. Recommended: in Vercel's firewall settings, add a rate limit for the path `/api/ack` (for example 30 requests a minute per IP).
   Each request costs one Play Developer API call.

### 8. Licence-tester purchase and the acknowledgement check
1. In Play Console, find **License testing** and add your Google account (and any testers) as licence testers.
2. Install the app from the internal testing track with a licence tester account. On Home, tap Grown-ups, set a PIN, and buy the
   unlock from the Unlock Whistlestop card.
3. Wait **5 minutes**: test purchases that are not acknowledged are refunded after about 3 minutes. In Play Console's order
   management, the order must still be there, not refunded, and the Vercel function log for `/api/ack` shows `200`.
4. If it was refunded: check the two variables and the service account's permissions. A wrong package name shows as `502 get 404`
   in the log: the app keeps the unlock and asks again at every start, so fix the variable within 3 days.
5. Also try: cancel a purchase, the "slow test card" (pending: the app waits and opens by itself once paid), and Restore purchase
   after reinstalling.

### 9. Closed or internal testing
Keep the internal track for yourself; then a **closed testing** track with a few families on real cheap tablets. Check: the app
opens full screen, works offline after the first open, the free sample (first 5 stops of the child's start world in each subject)
is open and the rest says "This world opens when a grown-up unlocks Whistlestop.", and the unlock opens everything for every child.
New personal developer accounts may have to run a closed test with a minimum number of testers for a set time before production;
Play Console says so on its dashboard if it applies.

### 10. Store listing
In Play Console, find the **main store listing**:
- App name: Whistlestop: Kids Math & Reading. Short and full description: say "Free to try, one-time unlock"; no ads, no accounts,
  works offline.
- Icon 512 x 512 (`icon-512.png`), a feature graphic (1024 x 500), phone and tablet screenshots from `node tools/shots.js` (and
  `tools/out/play/` from the smoke step PLAY-01 for the unlock screens).
- Category: Education. Contact e-mail: `hello@whistlestoplearning.com`. Privacy policy: `https://whistlestoplearning.com/privacy.html`.

Then send the release for review.

## The old address
The web version used to be at andoreza-sudo.github.io/star-school/. Saves live per web address, so on that address Grown-ups shows
"We moved to whistlestoplearning.com ..." with how to carry progress over: Save a backup there, then Load a backup on the new
address. Old backup files (they say "Star School" inside) load in Whistlestop.

## Reference

**Families policy points the app already meets**: no ads, no analytics, no accounts; children never see a price or a purchase
prompt (locked content shows "This world opens when a grown-up unlocks Whistlestop." and OK); the price and the Unlock button are
only behind the Grown-ups PIN (v188, owner decision 2026-11-19: 4 digits the parent chooses the first time Grown-ups opens, which is
guarded by a times-table question until a PIN exists; 5 wrong PINs wait 1, 5, 15, 30, then 60 minutes; Forgot PIN? asks three 2-digit
x 2-digit multiplications and then lets the parent choose a new PIN); Google Play's own purchase check still protects the payment
itself; no timers, no repeated prompts, no "ask your parent" screens. Children with a picture password (optional, set by the parent)
open only their own progress.

**Reviewer note (App content > App access, "All or some functionality is restricted")**: "Settings and the one-time unlock are
behind a parent PIN. On a fresh install: tap Grown-ups at the top of the home screen, answer the multiplication question, then choose
any 4-digit PIN (for example 2580) and type it again. Use that PIN afterwards. No account or login is needed."

**Play mode**: the app enters Play mode only when opened by the Play app (the start URL's `?src=play`, or the referrer
`android-app://` + `PLAY.PKG`) and Google Play billing answers. Never on github.io. The web version is never locked.

**What the free sample is**: in each subject (Math, Reading, Spanish, Discover), the **first 5 stops** of the world a child of their
current grade starts in, with their lessons; every other stop and world waits for the unlock. Also free: **every Game Room game**
(game time is still earned only by learning), the pet, stickers, missions, streak, report card, Mixed Practice, Fact Race, Fact
Sprint, check-ins, the Puzzle of the Day (other Brain Teasers wait), and one child. `PLAY.FREE_STOPS` in `src/js/03-play.js` is the
number of stops; the rule is `PLAY.freeStop` (with `defStart` in `src/js/42-paths.js`), checked by test.js "play PLAY-01".
