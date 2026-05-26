# Stripe Setup

The checkout function (`api/checkout.js`) needs a Stripe secret key supplied as an environment variable.

## Environment variable

| Name | Description |
|------|-------------|
| `STRIPE_SECRET_KEY` | Your Stripe secret key. Use a **test** key (`sk_test_...`) until you're ready to go live, then swap in the live key (`sk_live_...`). |

**Never commit this key.** It is read from the environment only.

### Local development

Create a `.env.local` file in the project root (already git-ignored):

```
STRIPE_SECRET_KEY=sk_test_your_key_here
```

Then run with the Vercel CLI:

```
vercel dev
```

### Production (Vercel)

Add `STRIPE_SECRET_KEY` under **Project → Settings → Environment Variables** in the Vercel dashboard. Redeploy after adding it.

## Testing checkout

While in test mode, use Stripe's test card on the hosted Checkout page:

- **Card number:** `4242 4242 4242 4242`
- **Expiry:** any future date (e.g. `12/34`)
- **CVC:** any 3 digits
- **ZIP:** any value

A successful test payment redirects back to `/?checkout=success`; cancelling returns to `/?checkout=cancelled`.

## Going live

1. Remove the `(test)` suffix from the Checkout button label in `index.html`.
2. Replace the test secret key with your live key (`sk_live_...`) in the Vercel environment variables.
3. Confirm tax and shipping settings in your Stripe dashboard.
