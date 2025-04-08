// src/components/RoutineResultCard.tsx
"use client"

export default function RoutineResultCard({
  step,
  explanation,
  product,
  url,
  routineId,
}: {
  step: string
  explanation?: string
  product: string
  url: string
  routineId?: string // optional for share link
}) {
  const shareUrl = routineId
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/routine/${routineId}`
    : null

  const handleCopy = () => {
    if (!shareUrl) return
    navigator.clipboard.writeText(shareUrl)
    alert("Routine link copied to clipboard!")
  }

  return (
    <div className="space-y-2 text-textMain">
      {/* Step name (e.g. Cleanser) */}
      <h4 className="text-base font-display font-medium">{step}</h4>

      {/* Explanation */}
      <p className="text-sm font-sans text-textMuted leading-relaxed">
        {explanation || "No explanation provided."}
      </p>

      {/* Product */}
      {product && url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm font-sans text-primary underline underline-offset-2 hover:opacity-90 transition"
        >
          {product}
        </a>
      )}

      {/* Share Button */}
      {shareUrl && (
        <button
          onClick={handleCopy}
          className="text-xs text-blue-600 underline hover:opacity-80"
        >
          🔗 Share this routine
        </button>
      )}
    </div>
  )
}