# Four Strands — improvement bundle

Everything here is arranged to mirror your repo. The app lives in the
`four-strands/` subfolder (Vercel serves that folder at the domain root),
so the new pages go alongside your existing `index.html` and `sw.js`.

## Drop-in map

```
four-strands/
├── faq.html            NEW — FAQ page (+ FAQ structured data for search)
├── privacy.html        NEW — privacy policy
├── thanks.html         NEW — thank-you page with working share buttons
├── 404.html            NEW — custom not-found page
├── robots.txt          NEW — allows crawlers, points to the sitemap
├── sitemap.xml         NEW — lists the four indexable pages
├── backup.js           NEW — export / import of the local record
├── index-upgrades.html PASTE-IN snippets for your existing index.html
│                        (title, meta description, OG/Twitter cards,
│                         share bar, internal-link footer, alt-text)
├── index.html          YOURS — apply the snippets above
└── sw.js               YOURS — add the 4 new pages to the precache list

.github/workflows/
└── deploy.yml          OPTIONAL — see the Vercel note below
```

## Do this after copying in

1. In `index.html`, paste the blocks from `index-upgrades.html`.
2. In `sw.js`, add `faq.html`, `privacy.html`, `thanks.html`, `404.html`
   to the precached file list, then bump the cache version.
3. Add the export / import buttons (markup is in the comment at the
   bottom of `backup.js`) somewhere sensible — the "All time" area works.
4. Commit and push. Vercel redeploys on push.

## Notes

- **URLs**: every canonical / share / sitemap URL uses
  `https://four-strands-v8-loom.vercel.app/`. If you add a custom
  domain, find-and-replace that host everywhere.
- **Vercel vs. GitHub Pages**: you're deploying via Vercel, which
  redeploys automatically on push — so the GitHub Pages workflow in
  `.github/workflows/deploy.yml` is *optional*. Keep it only if you
  also mirror the site to GitHub Pages; otherwise you can delete it.
  The cache-busting idea it contained (stamping a build id into
  `sw.js`) is still worth doing — Vercel exposes the commit SHA as the
  `VERCEL_GIT_COMMIT_SHA` environment variable at build time.
- **Custom 404 on Vercel**: for a static site, Vercel serves
  `404.html` from the served folder automatically. No config needed.
- **Design**: these pages use a light palette pulled from your live
  `theme-color` (#E8E9E4) and the four strand colors, to sit beside
  the v8 look rather than fight it. I matched the fonts with a
  system serif; if your app loads a specific display face, set it in
  the `--serif` variable at the top of each file so they line up
  exactly.
- **Privacy policy**: it's a solid, accurate template for a no-backend
  app — but read it over and adjust anything that doesn't match how
  you actually run things before you rely on it.

## Not included: map & directions

Four Strands is an app, not a place, so there's no address to map.
If there's a real venue behind it (a church, a gym, a group that
meets somewhere), send the address and I'll add a proper
map-and-directions block.
