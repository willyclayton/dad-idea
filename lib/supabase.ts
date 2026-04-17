import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase client (uses anon key + RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side admin client (uses service role — only import in server components / API routes)
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Database types (expand as schema grows)
export interface AcUnit {
  id: string;
  user_id: string;
  brand: string;
  model_number: string | null;
  install_year: number;
  seer: string | null;
  tonnage: string | null;
  zip_code: string;
  filter_size: string | null;
  created_at: string;
}

export interface Delivery {
  id: string;
  unit_id: string;
  scheduled_date: string;
  shipped_date: string | null;
  filter_sku: string;
  tracking_number: string | null;
  status: "scheduled" | "shipped" | "delivered" | "failed";
}

export interface DataConsent {
  user_id: string;
  opted_in: boolean;
  updated_at: string;
}
