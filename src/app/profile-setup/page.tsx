"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function ProfileSetup() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const stepLabels = ["About You", "Skin Basics"]
  const progressPercent = (step / stepLabels.length) * 100

  const [form, setForm] = useState({
    age_range: "",
    gender: "",
    country: "",
    city: "",
    skin_type: "",
    skin_concerns: [] as string[],
    avoid_ingredients: "",
    spf_use: "",
    routine_status: "",
    shop_frequency: "",
    shop_places: [] as string[],
    product_preferences: [] as string[],
    skincare_goals: [] as string[],
    monthly_budget: "",
    price_pref: "",
    brand_openness: "",
  })

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()
      if (data) setForm((prev) => ({ ...prev, ...data }))
    }
    loadProfile()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const toggleMultiSelect = (field: keyof typeof form, value: string) => {
    const current = form[field]
  
    if (Array.isArray(current)) {
      if (current.includes(value)) {
        setForm((prev) => ({
          ...prev,
          [field]: current.filter((v) => v !== value),
        }))
      } else {
        if (field === "skin_concerns" && current.length >= 3) return
        setForm((prev) => ({
          ...prev,
          [field]: [...current, value],
        }))
      }
    } else {
      console.warn(`Tried to toggle field '${field}' but it’s not an array.`)
    }
  }
  

  const saveStep1 = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return alert("Not logged in")

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      age_range: form.age_range,
      gender: form.gender,
      country: form.country,
      city: form.city,
      onboarding_complete: true,
    })

    if (error) return alert("Error saving Step 1")
    setStep(2)
  }

  const saveStep2 = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return alert("Not logged in")
  
    const { error } = await supabase.from("profiles").update({
      skin_type: form.skin_type,
      skin_concerns: form.skin_concerns,
      avoid_ingredients: form.avoid_ingredients,
      spf_use: form.spf_use,
    }).eq("id", user.id)
  
    if (error) return alert("Error saving Step 2")
    router.push("/account")
  }

   
  {/*if (error) return alert("Error saving Step 2")
    setStep(3)
  }

  {/* const saveStep3 = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return alert("Not logged in")

    const { error } = await supabase.from("profiles").update({
      routine_status: form.routine_status,
      shop_frequency: form.shop_frequency,
      shop_places: form.shop_places,
      product_preferences: form.product_preferences,
    }).eq("id", user.id)

    if (error) return alert("Error saving Step 3")
    setStep(4)
  }

  const saveStep4 = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return alert("Not logged in")

    const { error } = await supabase.from("profiles").update({
      skincare_goals: form.skincare_goals,
      monthly_budget: form.monthly_budget,
      price_pref: form.price_pref,
      brand_openness: form.brand_openness,
    }).eq("id", user.id)

    if (error) return alert("Error saving Step 4")
    router.push("/account")
  } */}

  return (
    <div className="max-w-xl mx-auto px-6 py-12 space-y-6">
      {/* Step Header + Progress Bar */}
      <div className="text-sm font-medium text-textMuted">
        <div className="flex items-center gap-2 mb-2">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <span className={step === i + 1 ? "text-primary font-semibold" : ""}>Step {i + 1}</span>
              {i < stepLabels.length - 1 && <span className="text-borderColor">→</span>}
            </div>
          ))}
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>
        
      {/* Step 1: About You */}
      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); saveStep1() }} className="space-y-6 bg-card border border-borderColor p-6 rounded-xl">
          <h2 className="text-xl font-display font-medium text-textMain">About You</h2>

          <fieldset>
            <legend className="text-sm font-medium text-textMuted mb-2">Age Range</legend>
            <div className="grid grid-cols-2 gap-2">
              {["Under 18", "18–24", "25–34", "35–44", "45+"].map((age) => (
                <label key={age} className="flex items-center gap-2 text-sm">
                  <input type="radio" name="age_range" value={age} checked={form.age_range === age} onChange={handleChange} />
                  {age}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-medium text-textMuted mb-2">Gender</legend>
            <div className="grid grid-cols-2 gap-2">
              {["Woman", "Man", "Non-binary", "Prefer not to say"].map((g) => (
                <label key={g} className="flex items-center gap-2 text-sm">
                  <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange} />
                  {g}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block text-sm font-medium text-textMuted">
            Country
            <select name="country" value={form.country} onChange={handleChange} className="mt-1 block w-full border p-2 rounded">
              <option value="">Select your country</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="Nigeria">Nigeria</option>
              <option value="India">India</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label className="block text-sm font-medium text-textMuted">
            City <span className="text-xs">(optional)</span>
            <input name="city" value={form.city} onChange={handleChange} className="mt-1 block w-full border p-2 rounded" />
          </label>

          <button type="submit" className="mt-4 bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition">
            Save & Continue
          </button>
        </form>
      )}

      {/* Step 2: Skin Basics */}
      {step === 2 && (
        <form onSubmit={(e) => { e.preventDefault(); saveStep2() }} className="space-y-6 bg-card border border-borderColor p-6 rounded-xl">
          <h2 className="text-xl font-display font-medium text-textMain">Skin Basics</h2>

          <fieldset>
            <legend className="text-sm font-medium text-textMuted mb-2">Skin Type</legend>
            <div className="grid grid-cols-2 gap-2">
              {["Oily", "Dry", "Combination", "Sensitive", "Normal", "Not sure"].map((type) => (
                <label key={type} className="flex items-center gap-2 text-sm">
                  <input type="radio" name="skin_type" value={type} checked={form.skin_type === type} onChange={handleChange} />
                  {type}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-medium text-textMuted mb-2">Skin Concerns (up to 3)</legend>
            <div className="grid grid-cols-2 gap-2">
              {["Acne", "Hyperpigmentation", "Dryness", "Redness", "Wrinkles", "Dark spots", "Uneven tone", "Other"].map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.skin_concerns.includes(c)} onChange={() => toggleMultiSelect("skin_concerns", c)} />
                  {c}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block text-sm font-medium text-textMuted">
            Ingredients to Avoid <span className="text-xs text-textMuted">(optional)</span>
            <textarea
              name="avoid_ingredients"
              value={form.avoid_ingredients}
              onChange={handleChange}
              placeholder="e.g. fragrance, alcohol"
              className="mt-1 block w-full border p-2 rounded"
            />
          </label>

          <fieldset>
            <legend className="text-sm font-medium text-textMuted mb-2">Do you wear SPF daily?</legend>
            <div className="flex gap-4">
              {["Yes", "Sometimes", "No"].map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm">
                  <input type="radio" name="spf_use" value={s} checked={form.spf_use === s} onChange={handleChange} />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition"
            >
              Save & Continue
            </button>
            <button
              type="button"
              onClick={() => router.push("/account")}
              className="text-sm text-textMuted hover:underline"
            >
              Skip and finish later
            </button>
          </div>
        </form>
      )}
      
  {/*
      {step === 3 && (
        <form
            onSubmit={(e) => {
            e.preventDefault()
            saveStep3()
            }}
            className="space-y-6 bg-card border border-borderColor p-6 rounded-xl"
        >
            <h2 className="text-xl font-display font-medium text-textMain">Routine & Preferences</h2>

            {/* Do you currently have a skincare routine?
            <fieldset>
            <legend className="text-sm font-medium text-textMuted mb-2">Do you currently have a skincare routine?</legend>
            <div className="flex gap-4">
                {["Yes", "No", "Kind of"].map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm">
                    <input
                    type="radio"
                    name="routine_status"
                    value={option}
                    checked={form.routine_status === option}
                    onChange={handleChange}
                    />
                    {option}
                </label>
                ))}
            </div>
            </fieldset>

            {/* How often do you shop for skincare? 
            <fieldset>
            <legend className="text-sm font-medium text-textMuted mb-2">How often do you shop for skincare?</legend>
            <div className="flex gap-4">
                {["Monthly", "Every few months", "Rarely"].map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm">
                    <input
                    type="radio"
                    name="shop_frequency"
                    value={option}
                    checked={form.shop_frequency === option}
                    onChange={handleChange}
                    />
                    {option}
                </label>
                ))}
            </div>
            </fieldset>

            {/* Where do you usually buy from? ✅ 
            <fieldset>
            <legend className="text-sm font-medium text-textMuted mb-2">Where do you usually buy from?</legend>
            <div className="grid grid-cols-2 gap-2">
                {["Sephora", "Amazon", "Boots/Superdrug", "LookFantastic", "Local stores", "Other"].map((place) => (
                <label key={place} className="flex items-center gap-2 text-sm">
                    <input
                    type="checkbox"
                    checked={Array.isArray(form.shop_places) && form.shop_places.includes(place)}
                    onChange={() => toggleMultiSelect("shop_places", place)}
                    />
                    {place}
                </label>
                ))}
            </div>
            </fieldset>

            {/* Product Preferences ✅ 
            <fieldset>
            <legend className="text-sm font-medium text-textMuted mb-2">Product Preferences</legend>
            <div className="grid grid-cols-2 gap-2">
                {["Vegan", "Fragrance-free", "Korean skincare", "Medical-grade", "Natural/organic", "No preference"].map((pref) => (
                <label key={pref} className="flex items-center gap-2 text-sm">
                    <input
                    type="checkbox"
                    checked={Array.isArray(form.product_preferences) && form.product_preferences.includes(pref)}
                    onChange={() => toggleMultiSelect("product_preferences", pref)}
                    />
                    {pref}
                </label>
                ))}
            </div>
            </fieldset>

            <div className="flex gap-4 pt-4">
            <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition"
            >
                Save & Continue
            </button>
            <button
                type="button"
                onClick={() => router.push("/account")}
                className="text-sm text-textMuted hover:underline"
            >
                Skip and finish later
            </button>
            </div>
        </form>
        )}


        {step === 4 && (
        <form onSubmit={(e) => { e.preventDefault(); saveStep4() }} className="space-y-6 bg-card border border-borderColor p-6 rounded-xl">
            <h2 className="text-xl font-display font-medium text-textMain">Goals & Budget</h2>

            {/* Goals 
            <fieldset>
            <legend className="text-sm font-medium text-textMuted mb-2">What are your skincare goals?</legend>
            <div className="grid grid-cols-2 gap-2">
                {[
                "Clear skin",
                "Anti-aging",
                "Hydration",
                "Glow",
                "Even skin tone",
                "Treat a specific concern",
                ].map((goal) => (
                <label key={goal} className="flex items-center gap-2 text-sm">
                    <input
                    type="checkbox"
                    checked={Array.isArray(form.skincare_goals) && form.skincare_goals.includes(goal)}
                    onChange={() => toggleMultiSelect("skincare_goals", goal)}
                    />
                    {goal}
                </label>
                ))}
            </div>
            </fieldset>

            {/* Monthly budget 
            <fieldset>
            <legend className="text-sm font-medium text-textMuted mb-2">Monthly skincare spend</legend>
            <div className="grid grid-cols-2 gap-2">
                {["<£30", "£30–£60", "£60–£100", "£100+"].map((b) => (
                <label key={b} className="flex items-center gap-2 text-sm">
                    <input type="radio" name="monthly_budget" value={b} checked={form.monthly_budget === b} onChange={handleChange} />
                    {b}
                </label>
                ))}
            </div>
            </fieldset>

            {/* Pricing preference 
            <fieldset>
            <legend className="text-sm font-medium text-textMuted mb-2">Product pricing preference</legend>
            <div className="flex gap-4">
                {["Affordable", "Premium", "Both"].map((p) => (
                <label key={p} className="flex items-center gap-2 text-sm">
                    <input type="radio" name="price_pref" value={p} checked={form.price_pref === p} onChange={handleChange} />
                    {p}
                </label>
                ))}
            </div>
            </fieldset>

            {/* Open to new brands 
            <fieldset>
            <legend className="text-sm font-medium text-textMuted mb-2">Open to trying new brands?</legend>
            <div className="flex gap-4">
                {["Yes", "Maybe", "No"].map((choice) => (
                <label key={choice} className="flex items-center gap-2 text-sm">
                    <input type="radio" name="brand_openness" value={choice} checked={form.brand_openness === choice} onChange={handleChange} />
                    {choice}
                </label>
                ))}
            </div>
            </fieldset>

            <div className="flex gap-4 pt-4">
            <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition"
            >
                Save & Finish
            </button>
            <button
                type="button"
                onClick={() => router.push("/account")}
                className="text-sm text-textMuted hover:underline"
            >
                Skip and finish later
            </button>
            </div>
        </form>
        )} */}
    </div>
  )
}
