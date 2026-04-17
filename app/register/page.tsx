import { Suspense } from "react";
import Link from "next/link";
import AcRegistrationForm from "@/components/AcRegistrationForm";

function RegisterContent({ searchParams }: { searchParams: { plan?: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 py-10 md:py-16 px-5">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <Link href="/" className="text-brand-700 font-bold text-xl block mb-6 md:mb-8">
            FilterDrop
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Register your AC unit</h1>
          <p className="text-gray-500 text-sm">
            We use this info to find the right filter size and delivery schedule for your system.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-1.5 rounded-full bg-brand-500" />
          <div className="flex-1 h-1.5 rounded-full bg-gray-200" />
          <div className="flex-1 h-1.5 rounded-full bg-gray-200" />
        </div>
        <p className="text-xs text-gray-400 text-right mb-7">Step 1 of 3</p>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <AcRegistrationForm plan={searchParams.plan} />
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  return (
    <Suspense>
      <RegisterContent searchParams={searchParams} />
    </Suspense>
  );
}
