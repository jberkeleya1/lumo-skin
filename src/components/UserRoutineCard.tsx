"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

type Step = {
  step: string
  product: string
}

type UserRoutine = {
  id: string
  user_id: string
  name: string
  steps: Step[]
  notes?: string
  created_at?: string
}

export default function UserRoutineCard({ routine }: { routine: UserRoutine }) {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(routine.name)
  const [steps, setSteps] = useState<Step[]>(routine.steps || [])
  const [notes, setNotes] = useState(routine.notes || "")
  const [loading, setLoading] = useState(false)

  const supabase = createClientComponentClient()
  const router = useRouter()

  const dateStr = new Date(routine.created_at || "").toLocaleDateString()

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete your current routine?")
    if (!confirmed) return

    setLoading(true)
    const { error } = await supabase.from("user_routines").delete().eq("id", routine.id)
    if (!error) {
      router.refresh()
    } else {
      alert("Failed to delete routine.")
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    setLoading(true)
    const { error } = await supabase
      .from("user_routines")
      .update({ name, steps, notes })
      .eq("id", routine.id)

    if (!error) {
      setEditing(false)
      router.refresh()
    } else {
      alert("Failed to update routine.")
    }
    setLoading(false)
  }

  return (
    <div className="bg-card border border-borderColor rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-muted transition"
      >
        <div>
          <p className="font-medium text-textMain">{name}</p>
          <p className="text-sm text-textMuted">{steps.length} steps</p>
          <p className="text-xs text-textMuted">Last updated on {dateStr}</p>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-textMuted" /> : <ChevronDown className="h-4 w-4 text-textMuted" />}
      </button>

      {open && (
        <div className="px-6 pb-6 pt-2 space-y-4 text-sm text-textMain bg-background">
          <div className="flex gap-6 text-sm text-textMuted">
            <button
              onClick={() => setEditing((prev) => !prev)}
              className="hover:underline text-blue-600"
            >
              ✏️ {editing ? "Cancel" : "Edit Routine"}
            </button>
            <button
              onClick={handleDelete}
              className="hover:underline text-red-600"
              disabled={loading}
            >
              🗑️ Delete this routine
            </button>
          </div>

          {editing ? (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Routine name"
                className="w-full border p-2 rounded"
              />

              {steps.map((step, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={step.step}
                    onChange={(e) => {
                      const newSteps = [...steps]
                      newSteps[i].step = e.target.value
                      setSteps(newSteps)
                    }}
                    placeholder="Step"
                    className="w-1/2 border p-2 rounded"
                  />
                  <input
                    value={step.product}
                    onChange={(e) => {
                      const newSteps = [...steps]
                      newSteps[i].product = e.target.value
                      setSteps(newSteps)
                    }}
                    placeholder="Product"
                    className="w-1/2 border p-2 rounded"
                  />
                </div>
              ))}
              <button
                onClick={() => setSteps([...steps, { step: "", product: "" }])}
                className="text-sm text-blue-600 underline"
              >
                + Add step
              </button>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes"
                className="w-full border p-2 rounded"
              />

              <button
                onClick={handleUpdate}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Routine"}
              </button>
            </>
          ) : (
            <>
              <p className="font-semibold text-textMuted mt-4 mb-1">📋 Your Routine</p>
              <div className="space-y-2">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="p-3 border border-borderColor rounded-lg bg-white"
                  >
                    <p className="font-medium text-textMain">{step.step}</p>
                    <p className="text-sm text-textMuted">{step.product}</p>
                  </div>
                ))}
              </div>
              {notes && (
                <div className="text-sm text-textMuted pt-2">
                  <p><strong>Notes:</strong> {notes}</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
