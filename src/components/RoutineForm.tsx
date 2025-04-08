// src/components/RoutineForm.tsx
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import DragDropUpload from "@/components/DragDropUpload"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

type RoutineStep = {
  step: string
  explanation: string
  recommendedProduct: string
  price?: string
  affiliateUrl: string
}

export default function RoutineForm({
  onResult,
}: {
  onResult: (routine: { day?: RoutineStep[]; night?: RoutineStep[] }) => void
}) {
  const [skinType, setSkinType] = useState("")
  const [concerns, setConcerns] = useState("")
  const [photo, setPhoto] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!skinType) return
    setLoading(true)

    const form = new FormData()
    form.append("skinType", skinType)
    form.append("concerns", concerns)
    if (photo) form.append("photo", photo)

    try {
      const res = await fetch("/api/generate", { method: "POST", body: form })
      const text = await res.text()
      const data = JSON.parse(text)
      if (data.success && data.routine) onResult(data.routine)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5 font-sans text-textMain">
      {/* Skin Type */}
      <Select onValueChange={setSkinType}>
      <SelectTrigger
        aria-label="Skin Type"
        className="h-11 text-base rounded-md border border-borderColor bg-white w-full"
      >
        <SelectValue placeholder="Skin Type" />
      </SelectTrigger>
        <SelectContent>
          <SelectItem value="dry">Dry</SelectItem>
          <SelectItem value="oily">Oily</SelectItem>
          <SelectItem value="combo">Combination</SelectItem>
          <SelectItem value="sensitive">Sensitive</SelectItem>
        </SelectContent>
      </Select>

      {/* Concerns */}
      <Textarea
        value={concerns}
        onChange={(e) => setConcerns(e.target.value)}
        placeholder="Concerns"
        className="h-28 text-base rounded-md border border-borderColor bg-white w-full"
        aria-label="Skin Concerns"
      />

      {/* Upload Photo */}
      <DragDropUpload onFileSelect={(file) => setPhoto(file)} />


      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={loading || !skinType}
        className="w-full h-11 text-base font-medium text-textMain bg-[#ddd4c0] hover:bg-[#d0c8b5] rounded-md transition"
      >
        {loading ? "Generating..." : "Generate My Routine"}
      </Button>
    </div>
  )
}

