# Whistlestop on Google Play: the owner's checklist (PLAY-01, RENAME)

The app side is built (PLAY-01 v180, renamed v191): a free sample, a one-time unlock bought through Google Play billing, Restore
purchase, an acknowledgement endpoint (`api/ack.js`), a privacy policy (`privacy.html`) and a Digital Asset Links template
(`.well-known/assetlinks.json`). The web version stays fully open. The Play app is a Trusted Web Activity (TWA): an Android shell
that shows https://app.whistlestoplearning.com/ full screen.

**Two addresses (owner decision 2026-11-20, "App on a subdomain").** https://whistlestoplearning.com/ (the bare domain, the
"apex") is a small static information page, `site/landing.html`: what Whistlestop is, a Get it on Google Play link, the privacy
policy and the contact e-mail. It has no scripts and no service worker, and it does not offer the web app. The app itself is on
**https://app.whistlestoplearning.com/**, and that is where the Play app starts, where `assetlinks.json` is served and where saves
live (saves are per address, so the app must only ever run there). `/privacy.html` opens on both addresses.

Fixed values used below:

| What | Value |
|------|-------|
| Information page | `https://whistlestoplearning.com/` (`site/landing.html`; `www.` redirects to it) |
| The app | `https://app.whistlestoplearning.com/` |
| Play title | Whistlestop: Kids Math & Reading |
| TWA start URL | `https://app.whistlestoplearning.com/?src=play` |
| Package name | `com.whistlestoplearning.app` (**proposed**: confirm it before the first upload; it can never change after that. If you pick another, change `PLAY.PKG` in `src/js/03-play.js` and `package_name` in `.well-known/assetlinks.json`, then rebuild and redeploy) |
| In-app product | `unlock_all`, one-time, 9.99 USD |
| Privacy policy | `https://whistlestoplearning.com/privacy.html` (the same page is at `https://app.whistlestoplearning.com/privacy.html`) |
| Developer name in the privacy policy | `DEVELOPER_NAME` placeholder in `privacy.html`: replace it with your developer name exactly as Play Console shows it, then run `python3 tools/build.py` (it copies the page to `site/`) |
| Contact e-mail | `hello@whistlestoplearning.com` |

## The checklist, in order

You own whistlestoplearning.com. Do these in order; each step needs the one before it.

### 1. Vercel: two projects from the same repository, one per address
Why two projects: the app's `index.html` sits at the root of the repository, and as far as we know Vercel serves a file that exists
before it applies a `vercel.json` rewrite, so a host-based rewrite of `/` to the information page (`"has": [{"type": "host",
"value": "whistlestoplearning.com"}]`) would not reliably win over the app's `index.html`; a redirect would show `/landing.html` in
the address bar. With two projects the bare domain has no app files at all, so it can never register the app's service worker. If you
prefer one project, test the host rule on a preview deployment first; we have not been able to test Vercel's routing here.

**Project A, the app (`app.whistlestoplearning.com`)**
1. On vercel.com, add a new project and import the GitHub repository. Name it for example `whistlestop-app`. Framework preset:
   **Other**. Root Directory: the repository root (leave it empty). No build command, no install command (the built files are
   committed). Production branch: `main`.
2. Deploy. Open the `*.vercel.app` address it gives you: the app should start, and `/privacy.html` and
   `/.well-known/assetlinks.json` should open.
3. In the project's settings, find **Domains** and add **`app.whistlestoplearning.com`** only. Vercel shows the DNS record to create
   for it (normally a **CNAME** named `app` pointing to the target Vercel shows); add it where you bought the domain. Wait until
   Vercel shows the domain as valid (HTTPS is automatic). Do not add the bare domain or `www` to this project.
4. Check: https://app.whistlestoplearning.com/ opens the app and the bottom of Home says "Whistlestop 1.0.0 (build v191)" or later.
   https://app.whistlestoplearning.com/.well-known/assetlinks.json must answer **200** and open as JSON, **with no redirect**
   (`vercel.json` already sends it as `application/json`; `.vercelignore` never leaves out `.well-known`, `privacy.html` or `api`).
   https://app.whistlestoplearning.com/privacy.html opens the privacy policy.
5. The environment variables of step 7 and the `/api/ack` rate limit go on **this** project.

**Project B, the information page (`whistlestoplearning.com`)**
1. Add a second project from the **same** repository, for example `whistlestop-site`. Framework preset: **Other**. **Root Directory:
   `site`**. No build command, no install command. Production branch: `main`.
2. `site/` holds only `landing.html`, a copy of `privacy.html`, the icon and `site/vercel.json` (which shows `landing.html` at `/`).
   `python3 tools/build.py` refreshes the copies, and test.js checks they match, so edit `privacy.html` at the repository root only.
3. In this project's **Domains**, add **`whistlestoplearning.com`** and **`www.whistlestoplearning.com`**, and set `www` to
   **redirect** to `whistlestoplearning.com` (Vercel offers this when you add `www`). Vercel shows the records for the bare domain
   (normally an **A** record) and for `www` (normally a **CNAME**); add them where you bought the domain.
4. Check: https://whistlestoplearning.com/ shows the information page (no app, no install prompt); https://www.whistlestoplearning.com/
   lands on https://whistlestoplearning.com/; https://whistlestoplearning.com/privacy.html opens the policy.
5. Every push to `main` deploys both projects. Project A also publishes the `site/` folder at `app.whistlestoplearning.com/site/`;
   that is harmless (static pages, no scripts), so it is not left out with `.vercelignore` (a `.vercelignore` entry could also hide
   it from Project B).

**Plan terms**: Vercel's Hobby plan is for non-commercial use; a paid Play app likely needs Pro. Check before going live.

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
   - **Privacy policy**: `https://whistlestoplearning.com/privacy.html` (replace `DEVELOPER_NAME` in it first, see the table).
   - **Target audience and content**: ages **5 and under, 6-8, 9-12** (Pre-K to 6th grade). This puts the app in the **Families**
     program: accept the Families policy declaration.
   - **Ads**: No, the app contains no ads.
   - **Content rating**: the IARC questionnaire. Category: Educational. No violence, no user-generated content, no sharing between
     users, no location; it **does** have in-app purchases. Expect "Everyone" / PEGI 3.
   - **Data safety**: declare **Purchase history: collected, not shared, processed ephemerally, required for app functionality**
     (the purchase token goes to `api/ack` to acknowledge the purchase and is not stored). Nothing else is collected: progress,
     recordings and the PIN stay on the tablet. Data encrypted in transit: yes (HTTPS). Deletion: Grown-ups > Start over or
     Delete a child; everything by clearing the site's data (see "Data deletion" in the Reference). Read the current form's wording
     before answering.
   - **App access**: "All or some functionality is restricted", with the reviewer note at the end of this page.
   - **Government apps, financial features, health**: No.

### 4. Package the app (Bubblewrap or PWABuilder)
Use the start URL and package name from the table above. With **Bubblewrap** (needs Node; it offers to install the JDK and Android
SDK it needs):
1. In an empty folder named `twa` (outside the repo, or inside it: `.vercelignore` leaves out `twa`, and `.gitignore` leaves out
   `*.keystore` and `*.jks`), run `npx @bubblewrap/cli init --manifest https://app.whistlestoplearning.com/manifest.json`.
   The host Bubblewrap records must be **`app.whistlestoplearning.com`** (not the bare domain): check `"host"` in `twa-manifest.json`.
2. Answer its questions: application ID (package) `com.whistlestoplearning.app`, app name and launcher name Whistlestop. It
   creates a signing key (the **upload key**): keep the keystore file and its passwords safe and private, outside git.
3. **Hand-edit `twa-manifest.json`**: Bubblewrap takes the start URL from the web manifest, which is `./` (so `/`). Change
   `"startUrl"` to `"/?src=play"`. That is how the app knows it is the Play app (it also checks that Google Play billing answers;
   in a normal browser `?src=play` does nothing).
4. Turn on Play Billing in `twa-manifest.json`: `"features": {"playBilling": {"enabled": true}}`. Leave out anything offered for
   ads or analytics (Families).
5. Run `npx @bubblewrap/cli update`, then `npx @bubblewrap/cli build`. Upload the `.aab` it makes in step 5.

With **PWABuilder** instead: package for Android from `https://app.whistlestoplearning.com`, set the package ID to
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
4. Commit and let Vercel redeploy; check https://app.whistlestoplearning.com/.well-known/assetlinks.json shows the fingerprint (200,
   no redirect; it is only needed on `app.`, the address the Play app opens). When
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
3. In Vercel, the **app** project's settings (Project A), **Environment Variables**:
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
"We moved to app.whistlestoplearning.com ..." with how to carry progress over: Save a backup there; on app.whistlestoplearning.com,
finish setting up first (Load a backup is in Grown-ups, which a fresh install reaches only after setup and a new PIN), then Grown-ups >
Load a backup > Yes, replace; then remove the old home-screen icon. Old backup files (they say "Star School" inside) load in
Whistlestop. The bare domain whistlestoplearning.com never runs the app, so a tablet must use the `app.` address.

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

**Data deletion (privacy policy)**: each child: Grown-ups > Start over, or Delete next to a child. Everything, including the PIN:
clear the site's data (Chrome asks when uninstalling; or Chrome > Settings > Site settings > app.whistlestoplearning.com).

**Reading aloud (privacy policy)**: the app picks a voice installed on the tablet first (`pickVoice`, `src/js/12-speech.js`). If no
voice for the language is installed, Chrome may use an online voice: the words being read (app text) then go to that voice's provider, usually Google.
A child's name never does: with such a voice `ttsSay` speaks "friend" instead of every child's name (`noNames`). The policy says so.

**Play mode**: the app enters Play mode only when opened by the Play app (the start URL's `?src=play`, or the referrer
`android-app://` + `PLAY.PKG`) and Google Play billing answers. Never on github.io. The web version is never locked.

**What the free sample is**: in each subject (Math, Reading, Spanish, Discover), the **first 5 stops** of the world a child of their
current grade starts in, with their lessons; every other stop and world waits for the unlock. Also free: **every Game Room game**
(game time is still earned only by learning), the pet, stickers, missions, streak, report card, Mixed Practice, Fact Race, Fact
Sprint, check-ins, the Puzzle of the Day (other Brain Teasers wait), and one child. `PLAY.FREE_STOPS` in `src/js/03-play.js` is the
number of stops; the rule is `PLAY.freeStop` (with `defStart` in `src/js/42-paths.js`), checked by test.js "play PLAY-01".
