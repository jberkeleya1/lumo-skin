// src/components/CollapsibleRoutineCard.tsx
"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

export default function CollapsibleRoutineCard({ routine }: { routine: any }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const dateStr = new Date(routine.created_at).toLocaleDateString()
  const { skin_type, concerns, result_json } = routine

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this routine?")
    if (!confirmed) return

    setLoading(true)
    const { error } = await supabase.from("routines").delete().eq("id", routine.id)
    if (!error) {
      location.reload()
    } else {
      alert("Failed to delete routine.")
      setLoading(false)
    }
  }

  const handleRegenerate = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append("skinType", skin_type)
    formData.append("concerns", concerns)

    const res = await fetch("/api/generate", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    if (data.success) {
      location.reload()
    } else {
      alert("Failed to regenerate routine.")
      setLoading(false)
    }
  }

  return (
    <div className="bg-card border border-borderColor rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-muted transition"
      >
        <div>
          <p className="font-medium text-textMain">Skin Type: {skin_type}</p>
          <p className="text-sm text-textMuted">Concerns: {concerns}</p>
          <p className="text-xs text-textMuted">Saved on {dateStr}</p>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-textMuted" /> : <ChevronDown className="h-4 w-4 text-textMuted" />}
      </button>

      {open && (
        <div className="px-6 pb-6 pt-2 space-y-4 text-sm text-textMain bg-background">
          <div className="flex gap-6 text-sm text-textMuted">
            <button
              onClick={handleRegenerate}
              className="hover:underline text-primary"
              disabled={loading}
            >
              🔁 Regenerate routine
            </button>
            <button
              onClick={handleDelete}
              className="hover:underline text-red-600"
              disabled={loading}
            >
              🗑️ Delete this routine
            </button>
          </div>

          {result_json.day && result_json.day.length > 0 && (
            <div>
              <p className="font-semibold text-textMuted mt-4 mb-1">🌞 Day Routine</p>
              <div className="space-y-2">
                {result_json.day.map((step: any, i: number) => (
                  <RoutineStep key={`day-${i}`} step={step} />
                ))}
              </div>
            </div>
          )}

          {result_json.night && result_json.night.length > 0 && (
            <div>
              <p className="font-semibold text-textMuted mt-4 mb-1">🌙 Night Routine</p>
              <div className="space-y-2">
                {result_json.night.map((step: any, i: number) => (
                  <RoutineStep key={`night-${i}`} step={step} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function RoutineStep({ step }: { step: any }) {
  return (
    <div className="p-3 border border-borderColor rounded-lg bg-white">
      <p className="font-medium text-textMain">{step.step}</p>
      <p className="text-sm text-textMuted">{step.explanation}</p>
      <p className="text-sm mt-1">
        <span className="font-semibold">{step.recommendedProduct}</span> –{" "}
        <a
          href={step.affiliateUrl}
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy now
        </a>
      </p>
    </div>
  )
}
