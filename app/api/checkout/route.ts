import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, isPlanId } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const plan = formData.get("plan")?.toString() ?? "";

  if (!isPlanId(plan)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await createCheckoutSession({
    planId: plan,
    successUrl: `${appUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${appUrl}/subscribe?plan=${plan}`,
  });

  if (!session.url) {
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }

  return NextResponse.redirect(session.url, 303);
}
