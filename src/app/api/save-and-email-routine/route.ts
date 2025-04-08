// /app/api/save-and-email-routine/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const body = await req.json()
  const { email, routine } = body

  if (!email || !routine) {
    return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 })
  }

  try {
    // Insert guest routine
    const { data: insertedRoutine, error: insertError } = await supabase.from("guest_routines").insert({
      email,
      skin_type: routine.skin_type,
      concerns: routine.concerns,
      result_json: routine.result_json,
      notes: routine.notes || null,
    }).select().single()

    if (insertError || !insertedRoutine) {
      console.error("❌ Error inserting routine:", insertError)
      return NextResponse.json({ success: false, message: "Failed to save routine" }, { status: 500 })
    }

    // Upsert to mailing list
    await supabase.from("mailing_list").upsert({
      email,
      via: "guest_save_routine",
      routine_id: insertedRoutine.id,
    }, { onConflict: "email" })

    // TODO: Send routine to user via email (hook to Resend or SMTP)
    console.log(`📧 Routine saved and linked to ${email}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("❌ Error handling request:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
