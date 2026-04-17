import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import PricingCard from "@/components/PricingCard";

const PLANS = [
  {
    name: "Basic",
    interval: "Every 90 days",
    price: 15,
    merv: "MERV 8",
    description: "Standard filtration. Catches dust, pollen, and larger particles.",
    features: [
      "Right-sized filter for your unit",
      "Free shipping",
      "Email reminder before each delivery",
      "Unit profile dashboard",
    ],
    highlight: false,
    ctaLabel: "Start Basic",
  },
  {
    name: "Standard",
    interval: "Every 60 days",
    price: 22,
    merv: "MERV 11",
    description: "Better allergen capture. Recommended for households with pets.",
    features: [
      "Everything in Basic",
      "MERV 11 allergen filtration",
      "Pet dander and mold spore capture",
      "Filter change history tracking",
    ],
    highlight: true,
    ctaLabel: "Start Standard",
  },
  {
    name: "Premium",
    interval: "Every 30 days",
    price: 38,
    merv: "MERV 13",
    description: "Hospital-grade filtration. Best for allergy and asthma households.",
    features: [
      "Everything in Standard",
      "MERV 13 — captures virus carriers",
      "Monthly fresh filter guarantee",
      "Priority support",
    ],
    highlight: false,
    ctaLabel: "Start Premium",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Register your unit",
    body: "Tell us your AC brand, model, and install year. We look up the right filter size and replacement schedule automatically.",
  },
  {
    number: "02",
    title: "Pick your plan",
    body: "Choose 30, 60, or 90-day delivery based on your household's needs. Cancel or pause any time.",
  },
  {
    number: "03",
    title: "Filters arrive automatically",
    body: "The right filter ships to your door on schedule. No reminders, no guessing — just cleaner air.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-brand-700">FilterDrop</span>
          <div className="flex items-center gap-3 md:gap-6">
            <Link href="#how-it-works" className="hidden md:block text-sm text-gray-600 hover:text-gray-900">
              How it works
            </Link>
            <Link href="#pricing" className="hidden md:block text-sm text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link
              href="/register"
              className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <HeroSection />

      {/* How it works */}
      <section id="how-it-works" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">
            How FilterDrop works
          </h2>
          <p className="text-center text-gray-500 text-sm md:text-base mb-12 md:mb-16 max-w-xl mx-auto">
            Three steps to never thinking about your AC filter again.
          </p>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {STEPS.map((step) => (
              <div key={step.number} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-brand-200 mb-3">{step.number}</div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">
            Simple, flat pricing
          </h2>
          <p className="text-center text-gray-500 text-sm md:text-base mb-12 md:mb-16 max-w-xl mx-auto">
            All plans include the right-sized filter for your unit, free shipping, and a unit profile dashboard.
          </p>
          <div className="grid md:grid-cols-3 gap-5 md:gap-8">
            {PLANS.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            Cancel or pause any time. No contracts.
          </p>
        </div>
      </section>

      {/* Data trust callout */}
      <section className="py-12 md:py-16 bg-brand-50 border-y border-brand-100">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
            Your data, your choice
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">
            When you register your AC unit, you can optionally contribute anonymized data to help HVAC
            contractors and manufacturers improve their products and services. Always opt-in,
            always anonymized, and you can opt out any time from your dashboard.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto px-5 flex flex-col items-center gap-5 md:flex-row md:justify-between">
          <span className="text-white font-bold text-lg">FilterDrop</span>
          <p className="text-xs text-center">© {new Date().getFullYear()} FilterDrop. All rights reserved.</p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="mailto:hello@filterdrop.com" className="hover:text-white">Contact</a>
            <Link href="/business-plan" className="hover:text-white">Business Plan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
