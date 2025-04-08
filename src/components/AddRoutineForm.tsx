"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function AddRoutineForm() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const [name, setName] = useState("")
  const [steps, setSteps] = useState([{ step: "", product: "" }])
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)

  const handleStepChange = (index: number, key: "step" | "product", value: string) => {
    const updated = [...steps]
    updated[index][key] = value
    setSteps(updated)
  }

  const addStep = () => setSteps([...steps, { step: "", product: "" }])

  const submitRoutine = async () => {
    setLoading(true)
    const user = (await supabase.auth.getUser()).data.user

    const { error } = await supabase.from("user_routines").insert({
      user_id: user?.id,
      name,
      steps,
      notes,
    })

    setLoading(false)
    if (!error) {
      router.refresh()
      setName("")
      setSteps([{ step: "", product: "" }])
      setNotes("")
    } else {
      alert("Error saving routine")
    }
  }

  return (
    <div className="border rounded-lg p-6 bg-white space-y-4">
      <h2 className="text-lg font-semibold">Add Your Routine</h2>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Routine name (e.g. Morning Routine)"
        className="w-full border p-2 rounded"
      />
      {steps.map((s, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={s.step}
            onChange={e => handleStepChange(i, "step", e.target.value)}
            placeholder="Step (e.g. Cleanser)"
            className="w-1/2 border p-2 rounded"
          />
          <input
            value={s.product}
            onChange={e => handleStepChange(i, "product", e.target.value)}
            placeholder="Product Name"
            className="w-1/2 border p-2 rounded"
          />
        </div>
      ))}
      <button type="button" onClick={addStep} className="text-sm text-blue-600 underline">
        + Add another step
      </button>
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Optional notes..."
        className="w-full border p-2 rounded"
      />
      <button
        onClick={submitRoutine}
        disabled={loading}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
      >
        {loading ? "Saving..." : "Save Routine"}
      </button>
    </div>
  )
}
