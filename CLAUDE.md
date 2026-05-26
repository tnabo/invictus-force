# Invictus Force — Project Rules

Static tactical-gear landing page with a single Stripe Checkout serverless function. Hosted on Vercel.

## Architecture

- The site is a single `index.html` file (HTML + inline CSS + inline JS). This is intentional.
- One serverless function lives at `api/checkout.js` and creates Stripe Checkout sessions.
- The cart is client-side JS persisted to `localStorage` under the key `invictus_cart`.
- Stripe-hosted Checkout handles payment, shipping address collection, and tax.

## Rules

- **Never commit `STRIPE_SECRET_KEY`.** It is supplied via environment variables only (Vercel project settings / local `.env`). See `STRIPE_SETUP.md`.
- **The `CATALOG` object in `api/checkout.js` is the source of truth for prices.** The server ignores any prices sent by the browser — prices are looked up by product name. This is security-critical.
- **Adding or editing a product means updating BOTH places:** the product markup in `index.html` (the `data-name` / `data-price` attributes on the `.product` card) AND the `CATALOG` in `api/checkout.js`. The product `name` must match exactly between the two.
- **Do not refactor to a framework.** The single-HTML-file architecture is a deliberate choice — no React/Vue/build step.
- **Do not migrate to Stripe's Products catalog.** We build line items with `price_data` on the fly, deliberately. Do not switch to pre-created Stripe Product/Price IDs.
