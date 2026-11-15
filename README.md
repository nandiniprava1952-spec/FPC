# MCH Facility Preparedness Checklist (FPC)

Installable web app (PWA). Host the files in this folder over HTTPS (e.g. GitHub Pages). Cloud sync via Google Apps Script.

## Cover / login page
- Top-right **Online** (green dot) / **Offline** (yellow dot) pill; it switches the moment the browser reports the connection dropped or came back.
- **Install app** button under the login form (hidden once the app is installed). Chrome/Edge/Android open the native install prompt; iPhone/Safari shows "Tap Share, then Add to Home Screen".

## In-app update flow
1. **Update found** – the app checks when it opens, when you return to it, when the phone comes back online, and every 30 minutes. A card appears at the top with a progress ring and percentage: *Downloading update…*.
2. **Update ready** – at 100% it becomes *Update available* with **Update** and **Later**. Later hides the card until the next check (the downloaded copy is kept).
3. **Installing** – **Update** shows a spinning ring, *Installing update…*, then the app restarts on its own.
4. **After the restart** – *✔ Updated to the latest version* appears briefly.

`sw.js` is now cache-first (cache `fppc-v6`): a new `index.html` is no longer picked up silently. The page compares the `ETag` of `index.html` on the host with its cached copy, downloads the new file into a staging cache, and swaps it in only when **Update** is tapped. Saved records and the login session live in the browser's own storage and are not touched. To release: replace `index.html` and commit as before.
