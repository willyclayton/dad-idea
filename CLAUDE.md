# FilterDrop — Claude Instructions

## Project Overview

FilterDrop is a subscription-based AC filter delivery company with a data intelligence layer. Customers register their air conditioning units, receive auto-delivered filters on manufacturer-recommended schedules, and opt into contributing anonymized unit data. That data is licensed to HVAC contractors, manufacturers, and property managers.

**Two revenue loops**:
1. **Subscription loop**: Filter delivery → recurring revenue
2. **Data loop**: Unit registration data → licensed intelligence → funds subscriber acquisition

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth |
| Payments | Stripe Subscriptions |
| Hosting | Vercel |
| Email | Resend (transactional) |

## Conventions

### Code Style
- Use TypeScript everywhere — no `any` types
- App Router conventions: server components by default, `'use client'` only when needed
- Tailwind for all styling — no CSS modules or inline styles
- Keep components small and focused
- Use `lib/` for shared utilities and clients (Supabase, Stripe)
- Use `app/api/` for API routes (route handlers)

### Database
- All Supabase queries go through `lib/supabase.ts`
- Always use Row Level Security (RLS) policies — never bypass them
- Never store PII in plaintext in logs or error messages
- User emails and contact info are sensitive — treat accordingly
- Data sold externally must be anonymized and aggregated (minimum 50 units per data point)

### Environment Variables
- All secrets live in `.env.local` (never committed)
- Document every required env var in `.env.example` with a placeholder value
- Access via `process.env.VARIABLE_NAME` — never hardcode

### Business Logic
- Filter intervals are 30, 60, or 90 days — always respect manufacturer recommendations
- Unit lifespan data comes from manufacturer specs — flag assumptions clearly
- Data opt-in is the default but must be clearly communicated
- Referral flows are always opt-in and transparent to the end user

## Document Tone

When writing business documents (plans, proposals, reports):
- Write for a sophisticated reader — no filler phrases
- Use tables and bullet points over paragraphs where possible
- Be specific with numbers — ranges are fine, vague language is not
- Investor-ready: assume the reader is evaluating whether to write a check

## Key Business Rules

1. **Never sell individual-level data** — all external data is aggregated and anonymized
2. **Minimum aggregation threshold**: no external report contains fewer than 50 units per segment
3. **Opt-out must work** — a subscriber can opt out of data sharing without losing their subscription
4. **Referrals are transparent** — always disclose that FilterDrop earns a commission on referrals
5. **Commercial depreciation reports** use straight-line depreciation and MACRS 5-year property class

## Project Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── register/           # AC unit registration
│   ├── subscribe/          # Subscription plan selection
│   ├── dashboard/          # User dashboard
│   └── api/                # API route handlers
├── components/             # Reusable UI components
├── lib/                    # Shared utilities
│   ├── supabase.ts         # Supabase client
│   └── stripe.ts           # Stripe client
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

## Deployment

- **Production**: Vercel (auto-deploy from `main` branch)
- **Preview**: Vercel preview deployments on every PR
- **Database**: Supabase project (separate dev and prod projects)
- **Secrets**: Managed in Vercel environment variables — never in code
