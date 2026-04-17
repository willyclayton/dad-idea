import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-white py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-medium px-3 py-1 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 inline-block" />
          Auto-sized to your AC unit
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
          The right AC filter,
          <br />
          <span className="text-brand-600">delivered automatically.</span>
        </h1>

        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Register your air conditioner once. FilterDrop looks up the right filter size and
          sends it on your manufacturer&apos;s recommended schedule — so you never have to
          think about it again.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors"
          >
            Register your AC unit
          </Link>
          <Link
            href="#how-it-works"
            className="border border-gray-200 hover:border-gray-300 text-gray-700 font-medium px-8 py-4 rounded-xl text-base transition-colors"
          >
            How it works
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
          <div>
            <div className="text-2xl font-black text-gray-900">30–90</div>
            <div className="text-xs text-gray-500 mt-1">day schedules</div>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">MERV 8–13</div>
            <div className="text-xs text-gray-500 mt-1">filter options</div>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">Free</div>
            <div className="text-xs text-gray-500 mt-1">shipping always</div>
          </div>
        </div>
      </div>
    </section>
  );
}
