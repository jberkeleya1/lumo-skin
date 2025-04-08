// src/components/RoutineDisplayCard.tsx
"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function RoutineDisplayCard({ routine }: { routine: any }) {
  const [open, setOpen] = useState(true)
  const { result_json } = routine || {}

  return (
    <div className="bg-card border border-borderColor rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-muted transition"
      >
        <div>
          <p className="font-medium text-textMain">View Routine Steps</p>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-textMuted" /> : <ChevronDown className="h-4 w-4 text-textMuted" />}
      </button>

      {open && (
        <div className="px-6 pb-6 pt-2 space-y-4 text-sm text-textMain bg-background">
          {result_json?.day?.length > 0 && (
            <div>
              <p className="font-semibold text-textMuted mt-4 mb-1">🌞 Day Routine</p>
              <div className="space-y-2">
                {result_json.day.map((step: any, i: number) => (
                  <RoutineStep key={`day-${i}`} step={step} />
                ))}
              </div>
            </div>
          )}

          {result_json?.night?.length > 0 && (
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
      {step.recommendedProduct && step.affiliateUrl && (
        <p className="text-sm mt-1">
          <span className="font-semibold">{step.recommendedProduct}</span> – {" "}
          <a
            href={step.affiliateUrl}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy now
          </a>
        </p>
      )}
    </div>
  )
}