# Four Strands — improvement bundle (ready to commit)

Everything is arranged to mirror your repo. The app lives in the
`four-strands/` subfolder that Vercel serves at the domain root, so
every file below goes straight into that folder.

## What's in here

```
four-strands/
├── index.html      EDITED — your file, with SEO + social + footer added
├── sw.js           EDITED — cache bumped to v2, new pages precached
├── faq.html        NEW — FAQ (+ FAQ structured data)
├── privacy.html    NEW — privacy policy
├── thanks.html     NEW — thank-you page with share buttons
├── 404.html        NEW — custom not-found page
├── robots.txt      NEW — allows crawlers, points to the sitemap
├── sitemap.xml     NEW — the four indexable pages
└── backup.js       NEW — export / import of the local record

.github/workflows/
└── deploy.yml      OPTIONAL — GitHub Pages workflow (see note)
```

`index.html` and `sw.js` here are your own files with the changes
already merged in — drop them in over the existing ones. Nothing to
hand-edit.

## What changed in index.html

- Kept your title, description, fonts, colors, dark mode, and all app
  logic untouched.
- Added canonical link + Open Graph and Twitter share cards in the head.
- Added a small footer inside the app shell linking to FAQ, Privacy,
  and Thanks, plus a Share button (native share sheet on phones,
  copy-link fallback).
- Added FAQ + Privacy links to the landing foot so they're reachable
  before entering the app (and crawlable).

## What changed in sw.js

- CACHE bumped v1 -> v2 so returning visitors pick up the changes.
- faq.html, privacy.html, thanks.html, 404.html added to the precache
  list so they work offline too.

## The new pages

They reuse your exact design tokens (--scripture sepia, --iron blue,
--food, --sleep), Bricolage Grotesque / Public Sans / JetBrains Mono,
and they read your saved light/dark preference from localStorage so
they match whichever theme the visitor set in the app.

## Still to do by hand (one small thing)

backup.js is loaded but not wired to a button yet. When you want
export/import live, add <script src="backup.js"></script> and the two
buttons (markup is in the comment at the bottom of backup.js) — the
"Clear all" status row is a natural spot. Left out of index.html so you
can place it where you like.

## Deploy = commit

Your Vercel project redeploys on every push to main. So:

1. Put the four-strands/ files above into the four-strands/ folder of
   the repo (replacing index.html and sw.js).
2. Commit to main.
3. Vercel redeploys in about a minute. New pages appear at /faq.html,
   /privacy.html, /thanks.html; bad URLs now hit your custom 404.html.

## Notes

- URLs: canonical / share / sitemap all use
  https://four-strands-v8-loom.vercel.app/. On a custom domain,
  find-and-replace that host.
- deploy.yml is optional: you deploy via Vercel, not GitHub Pages, so
  it isn't needed unless you also mirror to Pages. Safe to delete.
- Read the privacy policy over and adjust anything that doesn't match
  how you actually run things.
- Map & directions was left out on purpose — an app has no address. If
  there's a real venue behind it, send the address and I'll add a
  proper directions block.
