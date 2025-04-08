"use client"

import { useEffect, useRef, useState } from "react"
import Navbar from "@/components/Navbar"
import RoutineForm from "@/components/RoutineForm"
import RoutineResultCard from "@/components/RoutineResultCard"
import SaveRoutineModal from "@/components/SaveRoutineModal"


type RoutineStep = {
  step: string
  explanation: string
  recommendedProduct: string
  price?: string
  affiliateUrl: string
}

export default function Home() {
  const [routine, setRoutine] = useState<{ day?: RoutineStep[]; night?: RoutineStep[] }>({})
  const resultsRef = useRef<HTMLDivElement | null>(null)
  const [showModal, setShowModal] = useState(false)


  useEffect(() => {
    if ((routine.day || routine.night) && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [routine])

  return (
    <main className="min-h-screen bg-[#f5efe6] text-textMain font-sans">
      

      <div className="max-w-xl mx-auto px-6 py-12 space-y-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-medium text-textMain text-center leading-snug">
            Get a personalised<br />skincare routine
          </h1>
          <p className="text-base text-textMuted">
            Enter your information below to receive a tailored skincare routine.
          </p>
        </div>

        {/* Form */}
        <div className="bg-[#f8f4ec] border border-borderColor rounded-xl p-6 shadow-sm">
          <RoutineForm onResult={setRoutine} />
        </div>

        {/* Results */}
        {(routine.day?.length ?? 0) > 0 || (routine.night?.length ?? 0) > 0 ? (
          <div ref={resultsRef} className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-textMain">Routine Result</h2>
            <button
              onClick={() => setShowModal(true)}
              className="text-sm text-primary underline hover:opacity-80"
            >
              💾 Save Routine
            </button>
          </div>
          <SaveRoutineModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            routine={{
              skin_type: "", // you can pass this from profile if available
              concerns: "",  // or extract from the form input
              result_json: routine
            }}
          />

            <div className="rounded-xl border border-borderColor bg-[#f8f4ec] shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-borderColor">
                {/* Day Routine */}
                {(routine.day?.length ?? 0) > 0 && (
                  <div className="p-4 space-y-3">
                    <h3 className="text-sm font-semibold text-textMuted mb-2">🌞 Day Routine</h3>
                    {routine.day!.map((step, i) => (
                      <RoutineResultCard
                        key={`day-${i}`}
                        step={step.step}
                        explanation={step.explanation}
                        product={step.recommendedProduct}
                        url={step.affiliateUrl}
                      />
                    ))}
                  </div>
                )}

                {/* Night Routine */}
                {(routine.night?.length ?? 0) > 0 && (
                  <div className="p-4 space-y-3">
                    <h3 className="text-sm font-semibold text-textMuted mb-2">🌙 Night Routine</h3>
                    {routine.night!.map((step, i) => (
                      <RoutineResultCard
                        key={`night-${i}`}
                        step={step.step}
                        explanation={step.explanation}
                        product={step.recommendedProduct}
                        url={step.affiliateUrl}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  )
}

