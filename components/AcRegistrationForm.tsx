"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AC_BRANDS = [
  "Carrier",
  "Trane",
  "Lennox",
  "Rheem",
  "York",
  "Goodman",
  "American Standard",
  "Bryant",
  "Heil",
  "Ruud",
  "Amana",
  "Daikin",
  "Other",
];

const SEER_OPTIONS = [
  { label: "13 SEER (standard)", value: "13" },
  { label: "14 SEER", value: "14" },
  { label: "15 SEER", value: "15" },
  { label: "16 SEER", value: "16" },
  { label: "18 SEER (high efficiency)", value: "18" },
  { label: "20+ SEER (premium)", value: "20" },
  { label: "Not sure", value: "unknown" },
];

const TONNAGE_OPTIONS = [
  { label: "1.5 ton", value: "1.5" },
  { label: "2 ton", value: "2" },
  { label: "2.5 ton", value: "2.5" },
  { label: "3 ton", value: "3" },
  { label: "3.5 ton", value: "3.5" },
  { label: "4 ton", value: "4" },
  { label: "5 ton", value: "5" },
  { label: "Not sure", value: "unknown" },
];

interface FormData {
  brand: string;
  modelNumber: string;
  installYear: string;
  seer: string;
  tonnage: string;
  zipCode: string;
  dataConsent: boolean;
}

const CURRENT_YEAR = new Date().getFullYear();

export default function AcRegistrationForm({ plan }: { plan?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    brand: "",
    modelNumber: "",
    installYear: "",
    seer: "",
    tonnage: "",
    zipCode: "",
    dataConsent: true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  function validate(): boolean {
    const next: Partial<Record<keyof FormData, string>> = {};
    if (!form.brand) next.brand = "Brand is required";
    if (!form.installYear) {
      next.installYear = "Install year is required";
    } else {
      const yr = parseInt(form.installYear, 10);
      if (isNaN(yr) || yr < 1970 || yr > CURRENT_YEAR) {
        next.installYear = `Enter a year between 1970 and ${CURRENT_YEAR}`;
      }
    }
    if (!form.zipCode || !/^\d{5}$/.test(form.zipCode)) {
      next.zipCode = "Enter a valid 5-digit zip code";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    // Store unit data in sessionStorage for the subscribe step
    sessionStorage.setItem("filterdrop_unit", JSON.stringify({ ...form, plan }));

    // In production: POST to /api/units to persist in Supabase before redirecting
    router.push(`/subscribe?plan=${plan ?? "standard"}`);
  }

  function set(field: keyof FormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Brand */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          AC Brand <span className="text-red-500">*</span>
        </label>
        <select
          value={form.brand}
          onChange={(e) => set("brand", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">Select brand…</option>
          {AC_BRANDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
      </div>

      {/* Model Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Model Number{" "}
          <span className="text-gray-400 font-normal text-xs">(optional — helps us find exact filter size)</span>
        </label>
        <input
          type="text"
          value={form.modelNumber}
          onChange={(e) => set("modelNumber", e.target.value)}
          placeholder="e.g. 24ACC636A003"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <p className="text-xs text-gray-400 mt-1">
          Usually on a sticker on the outside of your unit.
        </p>
      </div>

      {/* Install Year */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Year Installed <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={form.installYear}
          onChange={(e) => set("installYear", e.target.value)}
          placeholder={`e.g. ${CURRENT_YEAR - 5}`}
          min={1970}
          max={CURRENT_YEAR}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        {errors.installYear && (
          <p className="text-red-500 text-xs mt-1">{errors.installYear}</p>
        )}
      </div>

      {/* SEER & Tonnage row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SEER Rating</label>
          <select
            value={form.seer}
            onChange={(e) => set("seer", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">Select…</option>
            {SEER_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tonnage</label>
          <select
            value={form.tonnage}
            onChange={(e) => set("tonnage", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">Select…</option>
            {TONNAGE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Zip Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ZIP Code <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.zipCode}
          onChange={(e) => set("zipCode", e.target.value)}
          placeholder="e.g. 77001"
          maxLength={5}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
      </div>

      {/* Data consent */}
      <div className="bg-gray-50 rounded-xl p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.dataConsent}
            onChange={(e) => set("dataConsent", e.target.checked)}
            className="mt-0.5 accent-brand-600"
          />
          <div>
            <p className="text-sm font-medium text-gray-800">
              Contribute anonymized unit data{" "}
              <span className="text-brand-600 font-normal text-xs">(optional)</span>
            </p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Help HVAC contractors and manufacturers improve their products by sharing anonymized
              data about your unit type and age. No personal information is ever shared. You can
              change this in your dashboard at any time.
            </p>
          </div>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
      >
        {loading ? "Saving…" : "Continue to subscription"}
      </button>
    </form>
  );
}
