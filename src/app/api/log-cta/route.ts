// app/api/log-cta/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { variant, user, timestamp } = await req.json();

  if (!variant || !timestamp) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await supabase.from("cta_logs").insert({
    variant,
    user_email: user ?? null,
    timestamp,
  });

  if (error) {
    console.error("Error logging CTA:", error.message);
    return NextResponse.json({ error: "Supabase insert failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
