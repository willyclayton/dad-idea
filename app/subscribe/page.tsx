import { Suspense } from "react";
import Link from "next/link";

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    interval: "Every 90 days",
    price: 15,
    merv: "MERV 8",
    priceEnvKey: "STRIPE_PRICE_BASIC",
  },
  {
    id: "standard",
    name: "Standard",
    interval: "Every 60 days",
    price: 22,
    merv: "MERV 11",
    priceEnvKey: "STRIPE_PRICE_STANDARD",
    recommended: true,
  },
  {
    id: "premium",
    name: "Premium",
    interval: "Every 30 days",
    price: 38,
    merv: "MERV 13",
    priceEnvKey: "STRIPE_PRICE_PREMIUM",
  },
];

function SubscribeContent({ searchParams }: { searchParams: { plan?: string } }) {
  const selectedPlan = PLANS.find((p) => p.id === searchParams.plan) ?? PLANS[1];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="text-brand-700 font-bold text-xl block mb-8">
            FilterDrop
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Choose your plan</h1>
          <p className="text-gray-500 text-sm">
            Switch or cancel any time. Filters ship automatically on your chosen schedule.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          <div className="flex-1 h-1.5 rounded-full bg-brand-500" />
          <div className="flex-1 h-1.5 rounded-full bg-brand-500" />
          <div className="flex-1 h-1.5 rounded-full bg-gray-200" />
        </div>
        <p className="text-xs text-gray-400 text-right mb-8">Step 2 of 3</p>

        {/* Plan cards */}
        <div className="space-y-3 mb-8">
          {PLANS.map((plan) => {
            const isSelected = plan.id === selectedPlan.id;
            return (
              <Link
                key={plan.id}
                href={`/subscribe?plan=${plan.id}`}
                className={`block rounded-xl border p-5 transition-all ${
                  isSelected
                    ? "border-brand-500 bg-brand-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? "border-brand-500" : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-brand-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-900">{plan.name}</span>
                        {plan.recommended && (
                          <span className="text-xs bg-brand-600 text-white px-2 py-0.5 rounded-full">
                            Recommended
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {plan.interval} · {plan.merv}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">${plan.price}</span>
                    <span className="text-xs text-gray-400">/mo</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Selected plan summary */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Order summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">
                {selectedPlan.name} plan ({selectedPlan.merv})
              </span>
              <span className="font-medium">${selectedPlan.price}/mo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-brand-600">Free</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>${selectedPlan.price}/mo</span>
            </div>
          </div>
        </div>

        {/* Checkout button — in production, POST to /api/checkout to create Stripe session */}
        <form action="/api/checkout" method="POST">
          <input type="hidden" name="plan" value={selectedPlan.id} />
          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
          >
            Continue to payment
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          Powered by Stripe. Cancel any time from your dashboard.
        </p>
      </div>
    </div>
  );
}

export default function SubscribePage({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  return (
    <Suspense>
      <SubscribeContent searchParams={searchParams} />
    </Suspense>
  );
}
