import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (!stripeClient) {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    stripeClient = new Stripe(apiKey, {
      apiVersion: '2025-10-29.clover',
      typescript: true,
    });
  }
  return stripeClient;
}

export default getStripeClient;
