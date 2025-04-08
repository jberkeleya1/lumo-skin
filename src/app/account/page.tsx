import { createServerSupabaseClient } from "@/lib/supabaseServer"
import { redirect } from "next/navigation"
import RoutineFilter from "@/components/RoutineFilter"
import AddRoutineForm from "@/components/AddRoutineForm"
import UserRoutineCard from "@/components/UserRoutineCard"


export default async function AccountPage() {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login") // 🔒 Protect route
  }

  // 🔍 Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (!profile) {
    redirect("/profile-setup")
  }

  if (!profile.onboarding_complete) {
    redirect("/profile-setup")
  }

  // 🧠 Calculate profile completion %
  const filledFields = Object.entries(profile).filter(
    ([key, val]) =>
      key !== "id" &&
      key !== "created_at" &&
      key !== "onboarding_complete" &&
      val !== null &&
      val !== "" &&
      !(Array.isArray(val) && val.length === 0)
  ).length

  const totalFields = 17 // Adjust if your profile schema changes
  const percentage = Math.round((filledFields / totalFields) * 100)

  // 🧾 Fetch user routines
  const { data: routines } = await supabase
    .from("routines")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // 📋 Fetch current user routine (manual)
  const {
    data: userRoutineRaw,
    error: userRoutineError,
  } = await supabase
    .from("user_routines")
    .select("*")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle()
  
  console.log("🔍 user.id", user.id)
  console.log("📦 userRoutineRaw", userRoutineRaw)
  console.log("⚠️ userRoutineError", userRoutineError)
  
  const userRoutine = userRoutineRaw && userRoutineRaw.steps
    ? { ...userRoutineRaw, steps: userRoutineRaw.steps ?? [] }
    : null

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <h2 className="text-xl text-textMain font-medium">
        Welcome back, {profile.full_name || "friend"} 👋
      </h2>
      <p className="text-textMuted">Here's a snapshot of your skincare journey so far.</p>

      {/* Profile Completion Progress */}
      {percentage < 100 && (
        <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-lg text-yellow-900 text-sm space-y-2">
          <div className="w-full bg-yellow-200 rounded-full h-2.5">
            <div
              className="bg-yellow-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p>
            Your profile is {percentage}% complete.{" "}
            <a href="/profile-setup" className="underline text-yellow-800">
              Complete it now
            </a>{" "}
            for more accurate routines.
          </p>
        </div>
      )}

      {/* Profile Summary */}
      <div className="border rounded-lg p-4 space-y-1 text-sm text-textMuted bg-white/60 backdrop-blur shadow-sm">
        <p><strong>Skin Type:</strong> {profile.skin_type || "Not set"}</p>
        <p><strong>Concerns:</strong> {profile.concerns?.join(", ") || "Not set"}</p>
        <p><strong>SPF Usage:</strong> {profile.spf_use || "Not set"}</p>
        {/* Add more fields here if desired */}
      </div>

      {/* Routine Insights */}
      <div className="bg-backgroundSecondary p-4 rounded-lg shadow-sm text-sm text-textMuted">
        <p>You've saved <strong>{routines?.length || 0}</strong> routines.</p>
        {routines && routines.length > 0 && (
          <p>
            Last routine added on{" "}
            <strong>{new Date(routines[0].created_at).toLocaleDateString()}</strong>.
          </p>
        )}
      </div>

      {/* Current Routine Section */}
        {userRoutine ? (
        <>
            <h2 className="text-xl font-semibold text-textMain">Your Current Routine</h2>
            <UserRoutineCard routine={userRoutine} />
        </>
        ) : (
        <>
            <h2 className="text-xl font-semibold text-textMain">Add Your Current Routine</h2>
            <AddRoutineForm />
        </>
        )}



      {/* Routine Section */}
      <h1 className="text-2xl font-display font-semibold text-textMain">My Saved Routines</h1>

      {(!routines || routines.length === 0) ? (
        <div className="space-y-2">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-blue-900 text-sm">
            💡 <strong>Tip:</strong> Upload a photo and complete your profile to get the most accurate skincare routine!
          </div>
          <p className="text-textMuted">
            You haven't saved any routines yet.{" "}
            <a href="/" className="text-primary underline">
              Generate one now
            </a>
            !
          </p>
        </div>
      ) : (
        <RoutineFilter routines={routines} />
      )}

      {/* Sticky CTA Button */}
      <a
        href="/"
        className="fixed bottom-6 right-6 bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-primary/80"
      >
        + New Routine
      </a>
    </div>
  )
}

