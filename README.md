# Invictus Force

Single-page landing site for **Invictus Force** — tactical gear built for shooters, hunters, and outdoorsmen.

## Stack

Pure static site. No build step, no dependencies.

- `index.html` — the entire site (HTML, CSS, and JS inline)
- `product-*.png` — product photography
- `invictus-force-logo.jpg` — brand logo reference (not used inline; SVG version is embedded in `index.html`)

## Run Locally

Open `index.html` in any modern browser. That's it.

For a local server (recommended so all assets resolve cleanly):

```bash
# Python 3
python3 -m http.server 8000

# Or Node
npx serve .
```

Then visit `http://localhost:8000`.

## Features

- Filterable product catalog (All / Carry / Holsters / Bestsellers)
- Interactive product anatomy explorer with synced hotspots and feature tabs
- Add-to-cart with live counter and toast notifications
- Wishlist toggling per product
- Newsletter signup with confirmation state
- Scroll-reveal animations
- Fully responsive (desktop, tablet, mobile)

## Deploy

This is a static site — deploy it anywhere:

- **GitHub Pages**: enable Pages on the repo's main branch
- **Netlify / Vercel**: connect the repo, no build command needed
- **Cloudflare Pages**: same — point at the root, no build

## Brand

Designed in Tacoma, WA. Built for the men who use their gear hard.
