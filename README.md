# Stag Head — Website

Static marketing site for Stag Head (craig@staghead.nz). Plain HTML/CSS/JS —
no build step, no backend, no dependencies beyond Google Fonts (loaded via CDN).

## File layout

```
dist/
├── index.html            ← entry point
├── styles/
│   ├── tokens.css        ← colors, type, spacing variables
│   └── variations.css    ← all page styles
├── src/
│   ├── app.js            ← router + theme/accent tweaks
│   └── variations/
│       ├── monolith.js   ← home page (dark editorial layout)
│       └── about.js      ← about page
└── assets/
    ├── logo-full.jpg      ← original logo on black
    ├── logo-mark.png      ← just the stag+hex mark, transparent
    ├── logo-lockup.png    ← mark + "STAGHEAD" wordmark, transparent
    ├── favicon.svg
    ├── apple-touch-icon.png
    └── og-image.png       ← social link preview (1200×630)
```

## Deploy — fastest path (Netlify, ~2 min)

1. Zip the **contents** of this `dist/` folder (not the folder itself).
2. Go to https://app.netlify.com/drop
3. Drag the zip onto the page.
4. Done — you'll get a `random-name.netlify.app` URL immediately.
5. In Site settings → Domain management, add your custom domain (`staghead.nz`)
   and follow the DNS instructions.

## Deploy — Cloudflare Pages (recommended if domain is on Cloudflare)

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Upload assets.
2. Upload the contents of `dist/`.
3. Under Custom domains, add `staghead.nz` — DNS auto-configures if the domain
   is on the same Cloudflare account.

## Deploy — GitHub Pages

1. Create a new repo (e.g. `staghead-site`).
2. Copy the contents of `dist/` into the repo root.
3. Push to `main`.
4. Repo → Settings → Pages → Source: `main` / root.
5. Add custom domain under the same settings page; create a CNAME record at
   your DNS provider pointing `www.staghead.nz` → `<username>.github.io`.

## Domain notes

- Apex (`staghead.nz`) vs www (`www.staghead.nz`): pick one as canonical and
  redirect the other. Netlify/Cloudflare/Vercel all handle this automatically
  once both are added.
- HTTPS: all three hosts above issue a free certificate automatically.

## Editing content later

All copy lives in two files:

- `src/variations/monolith.js` — home page
- `src/variations/about.js` — about page

Both use plain template literals. Search for the text you want to change,
edit, save, refresh. No build step.

Theme tokens (colors, fonts, spacing) are in `styles/tokens.css`.

## What to update before going live

- [ ] LinkedIn URL on the About page (currently `#`)
- [ ] Calendar booking URL on the About page (currently `#`) — Cal.com or
      Calendly both work fine
- [ ] Real OG image if you want something richer than the generated placeholder
      (replace `assets/og-image.png`, keep 1200×630)

## Tweaks panel

The bottom-right "Tweaks" panel (theme + accent hue) is a design aid. Before
going live, you can either:

- Leave it — visitors can personalise.
- Remove it — in `src/app.js`, delete the `renderTweaks()` call and its
  associated block.
