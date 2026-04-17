import Link from "next/link";

interface Plan {
  name: string;
  interval: string;
  price: number;
  merv: string;
  description: string;
  features: string[];
  highlight: boolean;
  ctaLabel: string;
}

export default function PricingCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative rounded-2xl border p-8 flex flex-col ${
        plan.highlight
          ? "border-brand-500 shadow-lg shadow-brand-100 bg-white"
          : "border-gray-200 bg-white"
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Most popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
          <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
            {plan.merv}
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-4">{plan.interval}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-gray-900">${plan.price}</span>
          <span className="text-gray-400 text-sm">/mo</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
            <svg
              className="w-4 h-4 text-brand-500 mt-0.5 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <Link
        href={`/register?plan=${plan.name.toLowerCase()}`}
        className={`block text-center font-semibold py-3 rounded-xl text-sm transition-colors ${
          plan.highlight
            ? "bg-brand-600 hover:bg-brand-700 text-white"
            : "border border-gray-200 hover:border-brand-400 hover:text-brand-700 text-gray-700"
        }`}
      >
        {plan.ctaLabel}
      </Link>
    </div>
  );
}
