// Dashboard — in production, fetch real user data from Supabase via server component
// This is a UI scaffold showing the full structure

export default function DashboardPage() {
  // Placeholder data — replace with Supabase queries once auth is wired up
  const unit = {
    brand: "Carrier",
    modelNumber: "24ACC636A003",
    installYear: 2014,
    seer: "16",
    tonnage: "3",
    zipCode: "77001",
    filterSize: "16x25x1",
  };

  const subscription = {
    plan: "Standard",
    merv: "MERV 11",
    interval: "Every 60 days",
    price: 22,
    nextDelivery: "May 18, 2025",
    status: "active",
  };

  const deliveries = [
    { date: "Mar 19, 2025", status: "Delivered", tracking: "1Z999AA10123456784" },
    { date: "Jan 18, 2025", status: "Delivered", tracking: "1Z999AA10123456783" },
    { date: "Nov 19, 2024", status: "Delivered", tracking: "1Z999AA10123456782" },
  ];

  const unitAge = new Date().getFullYear() - unit.installYear;
  const isAgingUnit = unitAge >= 10;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-brand-700 font-bold text-xl">FilterDrop</span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">willyclayton04@gmail.com</span>
            <button className="text-sm text-gray-500 hover:text-gray-700">Sign out</button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Your dashboard</h1>

        {/* Aging unit alert */}
        {isAgingUnit && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <div className="text-amber-500 text-xl mt-0.5">⚠️</div>
              <div>
                <p className="font-semibold text-amber-800 text-sm">
                  Your unit is {unitAge} years old
                </p>
                <p className="text-amber-700 text-xs mt-1 leading-relaxed">
                  The average lifespan for a {unit.brand} unit is 12–15 years. Yours is approaching
                  that range. Would you like a free quote from a local HVAC contractor?
                </p>
                <button className="mt-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium px-4 py-1.5 rounded-lg transition-colors">
                  Get a free quote
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Unit profile */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-gray-900">Your AC unit</h2>
              <button className="text-xs text-brand-600 hover:text-brand-700">Edit</button>
            </div>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Brand</dt>
                <dd className="font-medium text-gray-900">{unit.brand}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Model</dt>
                <dd className="font-medium text-gray-900 font-mono text-xs">{unit.modelNumber}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Year installed</dt>
                <dd className="font-medium text-gray-900">{unit.installYear}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">SEER rating</dt>
                <dd className="font-medium text-gray-900">{unit.seer} SEER</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Tonnage</dt>
                <dd className="font-medium text-gray-900">{unit.tonnage} ton</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Filter size</dt>
                <dd className="font-medium text-gray-900 bg-brand-50 text-brand-700 px-2 py-0.5 rounded text-xs">
                  {unit.filterSize}
                </dd>
              </div>
            </dl>
          </div>

          {/* Subscription */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-gray-900">Subscription</h2>
              <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <dl className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <dt className="text-gray-500">Plan</dt>
                <dd className="font-medium text-gray-900">{subscription.plan}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Filter type</dt>
                <dd className="font-medium text-gray-900">{subscription.merv}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Delivery schedule</dt>
                <dd className="font-medium text-gray-900">{subscription.interval}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Monthly cost</dt>
                <dd className="font-medium text-gray-900">${subscription.price}/mo</dd>
              </div>
            </dl>
            <div className="bg-brand-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Next delivery</p>
              <p className="font-bold text-brand-700">{subscription.nextDelivery}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 text-xs border border-gray-200 hover:border-gray-300 py-2 rounded-lg text-gray-600">
                Pause
              </button>
              <button className="flex-1 text-xs border border-gray-200 hover:border-gray-300 py-2 rounded-lg text-gray-600">
                Change plan
              </button>
            </div>
          </div>
        </div>

        {/* Data opt-in */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">Data sharing</h2>
              <p className="text-sm text-gray-500 max-w-lg leading-relaxed">
                You are currently contributing anonymized unit data. This helps HVAC contractors
                and manufacturers improve services in your area. No personal information is shared.
              </p>
            </div>
            <label className="flex items-center cursor-pointer ml-6">
              <div className="relative">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-checked:bg-brand-500 rounded-full transition-colors" />
                <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow transition-all peer-checked:translate-x-5" />
              </div>
            </label>
          </div>
        </div>

        {/* Delivery history */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Delivery history</h2>
          <div className="space-y-3">
            {deliveries.map((d) => (
              <div key={d.tracking} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{d.date}</p>
                  <p className="text-xs text-gray-400 font-mono">{d.tracking}</p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded-full">
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
