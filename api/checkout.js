const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Server-side source of truth for prices (cents). Never trust client-sent prices.
const CATALOG = {
  'Outrider Tactical Leg Bag': { price: 8900, description: 'Drop-leg carry bag, MOLLE compatible' },
  'Sentinel IWB Holster': { price: 7400, description: 'IWB Kydex holster, adjustable retention' },
  'Ranger Chest Rig': { price: 11900, description: 'Tactical chest rig, 5-mag capacity' },
  'Backwoods MOLLE Holster': { price: 4900, description: 'MOLLE-mounted holster, camo' },
};

const SHIPPING_OPTIONS = [
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: 599, currency: 'usd' },
      display_name: 'Standard',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 3 },
        maximum: { unit: 'business_day', value: 5 },
      },
    },
  },
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: 1299, currency: 'usd' },
      display_name: 'Express',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 1 },
        maximum: { unit: 'business_day', value: 2 },
      },
    },
  },
];

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { cart } = req.body || {};
    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const line_items = [];
    for (const item of cart) {
      const product = CATALOG[item && item.name];
      if (!product) {
        return res.status(400).json({ error: `Unknown product: ${item && item.name}` });
      }
      const qty = Math.max(1, Math.min(99, parseInt(item.qty, 10) || 1));
      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: { name: item.name, description: product.description },
          unit_amount: product.price, // cents, from server CATALOG only
        },
        quantity: qty,
      });
    }

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      shipping_address_collection: { allowed_countries: ['US', 'CA'] },
      shipping_options: SHIPPING_OPTIONS,
      automatic_tax: { enabled: true },
      success_url: `${origin}/?checkout=success`,
      cancel_url: `${origin}/?checkout=cancelled`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Checkout session error:', err);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
};
