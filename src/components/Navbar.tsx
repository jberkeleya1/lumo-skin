// Navbar with A/B tested CTA and persistent mega menu
"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Search, User, UserRound, Sparkles, Menu, X, ChevronDown } from "lucide-react";
import { Dialog } from "@headlessui/react";

const CTA_VARIANTS = [
  "Get My Routine",
  "Get Your Free Routine",
  "Start Routine",
  "Reveal My Products",
];

export default function Navbar() {
  const [user, setUser] = useState<null | { email: string }>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // A/B test variant logic
  const [ctaText] = useState(() => {
    const stored = sessionStorage.getItem("cta_variant");
    if (stored) return stored;
    const variant = CTA_VARIANTS[Math.floor(Math.random() * CTA_VARIANTS.length)];
    sessionStorage.setItem("cta_variant", variant);
    return variant;
  });

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser({ email: data.user.email! });
      }
    };
    getUser();

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(null);
    }, 300);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    location.reload();
  };

  const logCtaClick = async () => {
    await fetch("/api/log-cta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variant: ctaText, timestamp: Date.now(), user: user?.email || null }),
    });
  };

  return (
    <header className={`w-full border-b border-borderColor bg-background sticky top-0 z-50 transition-shadow ${scrolled ? "shadow-md" : ""}`}> 
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-textMain font-sans">
          Lumo
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 text-sm text-textMuted font-medium relative">
          <li
            className="relative"
            onMouseEnter={() => handleMouseEnter("learn")}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1 hover:text-textMain transition">
              Learn <ChevronDown size={14} />
            </button>
            <span className="absolute -top-3 -right-8 whitespace-nowrap text-[10px] bg-primary text-white px-2 py-0.5 rounded-md font-semibold">
              Coming Soon
            </span>
          </li>
          <li
            className="relative"
            onMouseEnter={() => handleMouseEnter("routines")}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1 hover:text-textMain transition">
              Routines <ChevronDown size={14} />
            </button>
            <span className="absolute -top-2 -right-5 text-[10px] bg-primary text-white px-1.5 py-0.5 rounded">NEW</span>
          </li>
        </ul>

        {/* CTA + Icons */}
        <div className="flex items-center gap-4">
          <Link
            href="/get-started"
            onClick={logCtaClick}
            className="btn hidden md:inline-flex items-center gap-3 rounded-lg bg-primary text-white no-underline text-sm px-6 py-2 font-medium hover:opacity-90 transition"
          >
            <div className="relative">
              <UserRound size={18} />
              <Sparkles size={10} className="absolute -top-1.5 -right-1 text-white opacity-90" />
            </div>
            {ctaText}
          </Link>

          <button className="text-textMain hover:opacity-70">
            <Search className="w-5 h-5" />
          </button>

          {user ? (
            <div className="relative group">
              <button className="text-textMain hover:opacity-70">
                <User className="w-5 h-5" />
              </button>
              <div className="absolute right-0 mt-2 hidden group-hover:flex flex-col bg-white border rounded shadow-md w-40 p-2 z-50">
                <Link href="/account" className="px-3 py-1 text-sm hover:bg-gray-100 rounded">My Account</Link>
                <button onClick={handleSignOut} className="px-3 py-1 text-sm text-left hover:bg-gray-100 rounded">Sign Out</button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="text-textMain hover:opacity-70">
              <User className="w-5 h-5" />
            </Link>
          )}

          <button onClick={() => setMobileOpen(true)} className="md:hidden">
            <Menu className="w-6 h-6 text-textMain" />
          </button>
        </div>
      </nav>

      {/* Mega Menu */}
      {dropdownOpen && (
        <div
          onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
          onMouseLeave={handleMouseLeave}
          className="absolute left-0 w-full bg-white border-t border-gray-200 shadow-md z-40"
        >
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap justify-start gap-x-10 gap-y-4">
            {dropdownOpen === "learn" && (
              <>
                <Link href="#ingredients" className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded">
                  <span>🧪</span> <span className="text-sm">Ingredients</span>
                </Link>
                <Link href="#concerns" className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded">
                  <span>⚠️</span> <span className="text-sm">Concerns</span>
                </Link>
                <Link href="#tutorials" className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded">
                  <span>🎓</span> <span className="text-sm">Tutorials</span>
                </Link>
              </>
            )}
            {dropdownOpen === "routines" && (
              <>
                <Link href="#ai-routines" className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded">
                  <span>🤖</span> <span className="text-sm">AI Routines</span>
                </Link>
                <Link href="#popular-routines" className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded">
                  <span>🔥</span> <span className="text-sm">Popular Routines</span>
                </Link>
                {user && (
                  <Link href="/account" className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded">
                    <span>💾</span> <span className="text-sm">Saved Routines</span>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      <Dialog open={mobileOpen} onClose={() => setMobileOpen(false)} className="md:hidden">
        <div className="fixed inset-0 z-50 bg-white p-6">
          <div className="flex justify-between items-center mb-6">
            <Link href="/" className="text-xl font-semibold text-textMain">Lumo</Link>
            <button onClick={() => setMobileOpen(false)}>
              <X className="w-6 h-6 text-textMain" />
            </button>
          </div>
          <ul className="flex flex-col gap-4 text-textMain font-medium">
            <li>
              <span className="block text-sm font-semibold mb-1">Learn</span>
              <ul className="pl-4 text-sm">
                <li><Link href="#ingredients" onClick={() => setMobileOpen(false)}>Ingredients</Link></li>
                <li><Link href="#concerns" onClick={() => setMobileOpen(false)}>Concerns</Link></li>
                <li><Link href="#tutorials" onClick={() => setMobileOpen(false)}>Tutorials</Link></li>
              </ul>
            </li>
            <li>
              <span className="block text-sm font-semibold mb-1">Routines</span>
              <ul className="pl-4 text-sm">
                <li><Link href="#ai-routines" onClick={() => setMobileOpen(false)}>AI Routines</Link></li>
                <li><Link href="#popular-routines" onClick={() => setMobileOpen(false)}>Popular Routines</Link></li>
                {user && <li><Link href="/account" onClick={() => setMobileOpen(false)}>Saved Routines</Link></li>}
              </ul>
            </li>
          </ul>
        </div>
      </Dialog>
    </header>
  );
}
