import { createServerSupabaseClient } from "@/lib/supabaseServer"
import RoutineDisplayCard from "@/components/RoutineDisplayCard"
import { notFound } from "next/navigation"

export default async function PublicRoutinePage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient()

  const { data: routine } = await supabase
    .from("routines") // or "user_routines" if you're sharing manual ones
    .select("*")
    .eq("id", params.id)
    .maybeSingle()

  if (!routine) return notFound()

  return (
    <div className="min-h-screen bg-background px-6 py-10 flex flex-col items-center justify-center text-center">
      <div className="max-w-xl w-full space-y-6">
        <h1 className="text-2xl font-display font-semibold text-textMain">
          Skincare Routine by Lumo
        </h1>
        <p className="text-sm text-textMuted">
          Skin Type: {routine.skin_type} • Concerns: {routine.concerns}
        </p>
        <RoutineDisplayCard routine={routine} />
        <a
          href="/"
          className="mt-4 inline-block bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary/80"
        >
          Generate Your Own
        </a>
      </div>
    </div>
  )
}
