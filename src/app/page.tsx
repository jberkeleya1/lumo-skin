"use client";


import { useEffect, useState } from "react";
import IconChecklist from "@/components/design/IconChecklist";
import IconShoppingBag from "@/components/design/IconShoppingBag";
import IconUserPlus from "@/components/design/IconUserPlus";
import IconFlask from "@/components/design/IconFlask";
import IconHeart from "@/components/design/IconHeart";
import IconBarChart from "@/components/design/IconBarChart";
import { UserRound, Sparkles } from "lucide-react";
import { useCTA } from "@/hooks/useCTA";
import { supabase } from "@/lib/supabaseClient";

export default function HomePage() {
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser({ email: data.user.email! });
      }
    };
    fetchUser();
  }, []);

  const { ctaText, logClick } = useCTA(user?.email ?? null);

  return (
    <main className="min-h-screen bg-[#fef9f1] text-[#1e1e1e] font-sans">
      {/* Hero Section */}
      <section className="relative bg-[#f7ebda] max-w-7xl mx-auto px-6 pt-6 pb-0 grid md:grid-cols-2 items-end gap-4 min-h-[500px] md:min-h-[550px]">
        <div className="space-y-6 pt-2 pb-6">
          <h1 className="font-accent text-5xl md:text-6xl font-bold leading-tight">
            Your personalised <br /> skincare routine
          </h1>
          <p className="text-[#5f5f5f] text-lg">
            Lumo analyzes your skin type, concerns, and goals <br />to deliver a routine that actually works.
          </p>
          <a
            href="#start"
            onClick={logClick}
            className="btn inline-flex items-center gap-3 bg-primary text-white hover:text-white px-8 py-4 rounded-lg font-medium text-base hover:opacity-90 transition"
          >
            <div className="relative">
              <UserRound size={22} />
              <Sparkles
                size={12}
                className="absolute -top-2 -right-2 text-white opacity-90"
              />
            </div>
            {ctaText}
          </a>
        </div>

        <div className="relative flex justify-end items-end">
          <img
            src="/images/hero-model.png"
            alt="Skincare model"
            className="object-contain h-[520px] w-auto"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#fef9f1] border-t border-borderColor py-20">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <h2 className="text-3xl font-accent font-semibold text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            {[
              { icon: <IconUserPlus size={80} color="#e7cba6" />, text: "Upload selfie or take a short quiz" },
              { icon: <IconChecklist size={80} color="#e7cba6" />, text: "Receive your skincare routine" },
              { icon: <IconShoppingBag size={80} color="#e7cba6" />, text: "Explore by curated products" }
            ].map(({ icon, text }, i) => (
              <div className="space-y-4" key={i}>
                <div className="flex justify-center">{icon}</div>
                <h3 className="text-lg font-accent font-medium text-center">{text}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Lumo */}
      <section className="bg-[#f7ebda] py-24 text-center">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <h2 className="text-3xl font-accent font-semibold text-center">Why Trust Lumo?</h2>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <IconFlask size={80} color="#e7cba6" />
              </div>
              <h3 className="text-lg font-accent font-medium">Ingredient-focused</h3>
              <p className="text-[#5f5f5f] text-sm">
                Our products are chosen based on rigorous scientific research.
              </p>
            </div>
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <IconHeart size={80} color="#e7cba6" />
              </div>
              <h3 className="text-lg font-accent font-medium">Unbiased</h3>
              <p className="text-[#5f5f5f] text-sm">
                Discover products from various brands with no sponsorship bias.
              </p>
            </div>
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <IconBarChart size={80} color="#e7cba6" />
              </div>
              <h3 className="text-lg font-accent font-medium">Powered by AI</h3>
              <p className="text-[#5f5f5f] text-sm">
                Advanced algorithms analyze your data for optimal recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Routine Preview */}
      <section className="bg-[#fef9f1] py-20 border-t border-borderColor">
        <div className="max-w-4xl mx-auto px-6 space-y-8 text-center">
          <h2 className="text-3xl font-accent font-semibold text-center">A Routine Like This Could Be Yours</h2>
          <div className="border border-gray-200 bg-[#f7ebda] rounded-xl p-6 shadow text-left space-y-2">
            <p className="text-sm text-[#5f5f5f] mb-2">🌞 Day Routine Example</p>
            <ul className="space-y-2 text-base">
              <li><strong>Cleanser:</strong> CeraVe Foaming Cleanser</li>
              <li><strong>Treatment:</strong> The Ordinary Niacinamide 10%</li>
              <li><strong>Moisturiser:</strong> La Roche-Posay Toleriane</li>
              <li><strong>Sunscreen:</strong> Beauty of Joseon SPF 50+</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="start" className="bg-[#f7ebda] py-24 text-center">
        <div className="max-w-xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl font-accent font-semibold text-center">
            Ready for your own routine?
          </h2>
          <a
            href="/"
            onClick={logClick}
            className="btn inline-flex items-center gap-3 bg-primary text-white px-6 py-3 rounded-lg font-medium text-base hover:opacity-90 transition"
          >
            <div className="relative">
              <UserRound size={20} />
              <Sparkles
                size={10}
                className="absolute -top-1.5 -right-1 text-white opacity-90"
              />
            </div>
            {ctaText}
          </a>
        </div>
      </section>
    </main>
  );
}