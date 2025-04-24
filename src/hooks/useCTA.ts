import { useEffect, useState } from "react";

const CTA_VARIANTS = [
  "Get My Routine",
  "Get Your Free Routine",
  "Start Routine",
  "Reveal My Products",
];

export function useCTA(userEmail: string | null) {
  const [ctaText, setCtaText] = useState("Get My Routine");

  useEffect(() => {
    const stored = sessionStorage.getItem("cta_variant");
    if (stored) {
      setCtaText(stored);
    } else {
      const variant = CTA_VARIANTS[Math.floor(Math.random() * CTA_VARIANTS.length)];
      sessionStorage.setItem("cta_variant", variant);
      setCtaText(variant);
    }
  }, []);

  const logClick = async () => {
    await fetch("/api/log-cta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        variant: ctaText,
        user: userEmail,
        timestamp: Date.now(),
      }),
    });
  };

  return { ctaText, logClick };
}
