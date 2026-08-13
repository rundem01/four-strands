# Four Strands

Scripture · Dumbbells · Food · Sleep. One tap per strand, per day.
A private, offline-capable web app. No account, no server — everything
stays in your phone's storage.

## What's in this folder

- index.html — the whole app (landing page, tracker, guides, daily KJV verse)
- manifest.json — makes it installable to a home screen
- sw.js — service worker; caches the app so it opens offline
- icon-512.png / icon-192.png / apple-touch-icon.png — app icons

## Put it online (free, ~5 minutes)

Option A — Netlify (easiest):
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page
3. It gives you a URL like https://something.netlify.app

Option B — GitHub Pages:
1. Create a repo, upload these files
2. Settings -> Pages -> deploy from main branch
3. Your URL is https://yourname.github.io/reponame

(Any static host works. The only requirement is HTTPS, which both provide,
because service workers need it.)

## Install it on your phone

Android (Chrome):
1. Open your URL
2. Menu (three dots) -> "Add to Home screen" / "Install app"

iPhone (Safari):
1. Open your URL in Safari
2. Share button -> "Add to Home Screen"

It now opens full-screen with its own icon, and works with no signal.

## Notes

- Data lives in this device's browser storage (localStorage). Clearing
  the browser's site data will clear your record; the in-app "Clear all"
  does the same deliberately.
- Verses are King James Version (1611), which is public domain.
- To update the app later: replace the files on your host and bump the
  CACHE name in sw.js (v1 -> v2) so phones pick up the new version.
