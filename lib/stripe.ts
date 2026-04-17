import Stripe from "stripe";

// Server-only Stripe client — never import this in client components
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export const PLAN_PRICE_IDS = {
  basic: process.env.STRIPE_PRICE_BASIC!,
  standard: process.env.STRIPE_PRICE_STANDARD!,
  premium: process.env.STRIPE_PRICE_PREMIUM!,
} as const;

export type PlanId = keyof typeof PLAN_PRICE_IDS;

export function isPlanId(value: string): value is PlanId {
  return value in PLAN_PRICE_IDS;
}

// Create a Stripe Checkout session for a new subscription
export async function createCheckoutSession({
  planId,
  customerEmail,
  successUrl,
  cancelUrl,
}: {
  planId: PlanId;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<Stripe.Checkout.Session> {
  return stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: customerEmail,
    line_items: [
      {
        price: PLAN_PRICE_IDS[planId],
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
  });
}
