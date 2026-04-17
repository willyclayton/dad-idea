# FilterDrop

**AC filter subscription + HVAC data intelligence platform.**

Customers register their air conditioning units, receive correctly-sized filters automatically on manufacturer-recommended schedules, and opt into contributing anonymized unit data that is licensed to HVAC contractors and manufacturers.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env vars and fill in your keys
cp .env.example .env.local

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/willyclayton/dad-idea&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY,NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET,STRIPE_PRICE_BASIC,STRIPE_PRICE_STANDARD,STRIPE_PRICE_PREMIUM,NEXT_PUBLIC_APP_URL)

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth |
| Payments | Stripe Subscriptions |
| Hosting | Vercel |

---

## Project Structure

```
app/
  page.tsx              # Landing page
  register/page.tsx     # AC unit registration
  subscribe/page.tsx    # Plan selection + Stripe checkout
  dashboard/page.tsx    # User dashboard
  api/checkout/route.ts # Stripe checkout session handler
components/
  HeroSection.tsx
  PricingCard.tsx
  AcRegistrationForm.tsx
lib/
  supabase.ts           # Supabase client + types
  stripe.ts             # Stripe client + checkout helper
```

---

## Required Environment Variables

See `.env.example` for the full list. Key variables:

- `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
- `STRIPE_SECRET_KEY` — Stripe secret key
- `STRIPE_PRICE_BASIC/STANDARD/PREMIUM` — Stripe Price IDs for each plan tier

---

## Supabase Schema (run in SQL editor)

```sql
create table ac_units (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  brand text not null,
  model_number text,
  install_year int not null,
  seer text,
  tonnage text,
  zip_code text not null,
  filter_size text,
  created_at timestamptz default now()
);

alter table ac_units enable row level security;
create policy "Users can manage own units"
  on ac_units for all using (auth.uid() = user_id);

create table data_consent (
  user_id uuid primary key references auth.users,
  opted_in boolean not null default true,
  updated_at timestamptz default now()
);

alter table data_consent enable row level security;
create policy "Users can manage own consent"
  on data_consent for all using (auth.uid() = user_id);
```

---

## Business Plan

See [BUSINESS_PLAN.md](./BUSINESS_PLAN.md) for the full business plan including revenue model, go-to-market strategy, financial projections, and data strategy.
