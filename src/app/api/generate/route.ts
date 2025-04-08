import { OpenAI } from "openai"
import { NextResponse } from "next/server"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  const formData = await request.formData()
  const skinType = formData.get("skinType") as string
  const concerns = formData.get("concerns") as string
  const file = formData.get("photo") as File | null

  // Photo upload is optional — we'll log it for now
  if (file) {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const base64Image = Buffer.from(arrayBuffer).toString("base64").slice(0, 300) // trim to prevent overload
      console.log("🖼️ Image uploaded (base64 preview):", base64Image.slice(0, 100))
    } catch (err) {
      console.warn("⚠️ Failed to process uploaded photo:", err)
    }
  } else {
    console.log("📎 No photo uploaded.")
  }

  const prompt = `
  You are a dermatologist AI trained to create safe, effective, and personalized skincare routines.

👤 User profile:
- Skin type: ${skinType}
- Skin concerns: ${concerns}

🎯 Your goal:
Design a realistic, expert-level skincare routine. “Include every step that would make a meaningful difference for this user — don’t hold back if multiple concerns justify more steps.”

💡 Guidelines:
- Suggest a complete, effective routine tailored to the user's needs — typically 4–6 steps for daytime and 3–5 for nighttime.
- Adjust based on how detailed their concerns are. If they mention multiple concerns, consider including multiple treatment steps.
- Recommend only widely available, highly-rated products (Amazon or Sephora preferred)
- Steps can be repeated across day/night if appropriate
- Explain *why* each step matters to the user
- Include pricing and real affiliate links

🧴 Format your response as strict JSON with no extra explanation or text:

{
  "day": [
    {
      "step": "Cleanser",
      "explanation": "Gently removes excess oil and pollution without stripping sensitive skin.",
      "recommendedProduct": "CeraVe Hydrating Facial Cleanser",
      "price": "$13",
      "affiliateUrl": "https://amzn.to/example1"
    }
  ],
  "night": [
    {
      "step": "Moisturizer",
      "explanation": "Hydrates and restores the skin barrier overnight.",
      "recommendedProduct": "Neutrogena Hydro Boost Gel Cream",
      "price": "$18",
      "affiliateUrl": "https://amzn.to/example2"
    }
  ]
}

Only return the valid JSON. No markdown, notes, or introduction.
`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    })

    const content = completion.choices[0].message.content?.trim() || ""

    let parsed
    try {
      parsed = JSON.parse(content)
      const supabase = createServerComponentClient({ cookies })
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        await supabase.from("routines").insert({
          user_id: user.id,
          skin_type: skinType,
          concerns,
          result_json: parsed,
        })
      }
    } catch (err) {
      console.error("❌ JSON parse error from GPT response:", content)
      return NextResponse.json({ success: false, error: "Failed to parse AI response" }, { status: 500 })
    }

    return NextResponse.json({ success: true, routine: parsed })
  } catch (err) {
    console.error("❌ OpenAI error:", err)
    return NextResponse.json({ success: false, error: "AI error" }, { status: 500 })
  }
}


