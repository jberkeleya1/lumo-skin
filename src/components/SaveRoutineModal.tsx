// components/SaveRoutineModal.tsx
"use client"

import { useState } from "react"

export default function SaveRoutineModal({
  isOpen,
  onClose,
  routine,
}: {
  isOpen: boolean
  onClose: () => void
  routine: any
}) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)

    const res = await fetch("/api/save-and-email-routine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, routine }),
    })

    const result = await res.json()
    setLoading(false)

    if (result.success) {
      setSubmitted(true)
    } else {
      alert("Something went wrong. Please try again.")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4 relative">
        <h2 className="text-xl font-semibold text-textMain">Save Your Routine</h2>

        {!submitted ? (
          <>
            <p className="text-sm text-textMuted">
              We’ll send your routine and occasional skincare updates. You can unsubscribe anytime.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
            <div className="flex gap-4">
              <button
                onClick={() => {
                  onClose()
                  location.href = "/login#auth-sign-up"
                }}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 text-sm"
              >
                Create Account
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !email}
                className="text-sm text-blue-600 hover:underline"
              >
                Continue as Guest
              </button>
            </div>
          </>
        ) : (
          <p className="text-sm text-green-700">
            ✅ Routine saved and sent to {email}!
          </p>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-textMuted hover:text-black text-sm"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
