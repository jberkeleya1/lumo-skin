import IconChecklist from "@/components/design/IconChecklist";
import IconShoppingBag from "@/components/design/IconShoppingBag";
import IconUserPlus from '@/components/design/IconUserPlus';
import IconFlask from '@/components/design//IconFlask';
import IconHeart from '@/components/design//IconHeart';
import IconBarChart from '@/components/design//IconBarChart';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fef9f1] text-[#1e1e1e] font-sans">
      {/* Hero Section */}
      <section className="bg-[#f7ebda] max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 items-center gap-12">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight text-[#1e1e1e]">
            Skincare, Simplified by AI
          </h1>
          <p className="text-[#5f5f5f] text-lg">
            Lumo analyzes your skin type, concerns, and goals to deliver a routine that actually works.
          </p>
          <a
            href="#start"
            className="inline-block bg-[#e7cba6] text-black px-8 py-4 rounded-full font-medium text-base hover:opacity-90 transition"
          >
            Get My Routine
          </a>
        </div>
        <div className="bg-[#fef9f1] w-full h-72 rounded-xl shadow-inner flex items-center justify-center">
          <span className="text-[#d1bfa3] font-medium">[Placeholder Image]</span>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#fef9f1] border-t border-borderColor py-20">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <h2 className="text-3xl font-display font-semibold text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="space-y-4">
              <div className="flex justify-center">
                <IconUserPlus size={80} color="#e7cba6" />
              </div>
              <h3 className="font-semibold text-lg">Upload selfie or take a short quiz</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center">
                <IconChecklist size={80} color="#e7cba6" />
              </div>
              <h3 className="font-semibold text-lg">Receive your skincare routine</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center">
                <IconShoppingBag size={80} color="#e7cba6" />
              </div>
              <h3 className="font-semibold text-lg">Explore by curated products</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Lumo */}
      <section className="bg-[#f7ebda] py-24 text-center">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <h2 className="text-3xl font-display font-semibold">Why Trust Lumo?</h2>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            <div className="space-y-4">
              <div className="flex justify-center">
                <IconFlask size={80} color="#e7cba6" />
              </div>
              <h3 className="text-lg font-semibold">Ingredient-focused</h3>
              <p className="text-[#5f5f5f] text-sm">
                Our products are chosen based on rigorous scientific research.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center">
                <IconHeart size={80} color="#C68B48" />
              </div>
              <h3 className="text-lg font-semibold">Unbiased</h3>
              <p className="text-[#5f5f5f] text-sm">
                Discover products from various brands with no sponsorship bias.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center">
                <IconBarChart size={64} color="#C68B48" />
              </div>
              <h3 className="text-lg font-semibold">Powered by AI</h3>
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
          <h2 className="text-3xl font-display font-semibold">A Routine Like This Could Be Yours</h2>
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
          <h2 className="text-3xl font-display font-semibold">
            Ready for your own routine?
          </h2>
          <a
            href="/"
            className="inline-block bg-[#e7cba6] text-black px-8 py-4 rounded-full font-medium text-base hover:opacity-90 transition"
          >
            Start Now
          </a>
        </div>
      </section>
    </main>
  );
}