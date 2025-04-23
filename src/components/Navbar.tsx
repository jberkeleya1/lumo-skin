"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Search, User, ShoppingBag } from "lucide-react";
import { UserRound, Sparkles } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<null | { email: string }>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser({ email: data.user.email! });
      }
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    location.reload();
  };

  return (
    <header className="w-full border-b border-borderColor bg-background sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-textMain font-sans"
        >
          Lumo
        </Link>

        {/* Main nav */}
        <ul className="hidden md:flex gap-8 text-sm text-textMuted font-medium">
          <li>
            <a href="#skincare" className="hover:text-textMain transition">
              Skincare
            </a>
          </li>
          <li>
            <a href="#haircare" className="hover:text-textMain transition">
              Haircare
            </a>
          </li>
          <li className="relative">
            <a href="#routines" className="hover:text-textMain transition">
              Routines
            </a>
            <span className="absolute -top-2 -right-5 text-[10px] bg-primary text-white px-1.5 py-0.5 rounded">
              NEW
            </span>
          </li>
          <li>
            <a href="#sale" className="hover:text-textMain transition">
              Sale
            </a>
          </li>
        </ul>

        {/* CTA + Icons */}
        <div className="flex items-center gap-4">
        <Link
          href="/get-started"
          className="btn hidden md:inline-flex items-center gap-3 rounded-lg bg-primary text-white no-underline text-sm px-6 py-2 font-medium hover:opacity-90 transition"
        >
          <div className="relative">
            <UserRound size={18} />
            <Sparkles
              size={10}
              className="absolute -top-1.5 -right-1 text-white opacity-90"
            />
          </div>
          Get My Routine
        </Link>


          <button className="text-textMain hover:opacity-70">
            <Search className="w-5 h-5" />
          </button>

          {user ? (
            <>
              <Link
                href="/account"
                className="text-textMain hover:opacity-70"
              >
                <User className="w-5 h-5" />
              </Link>
              <button
                onClick={handleSignOut}
                className="text-textMain hover:opacity-70"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link href="/login" className="text-textMain hover:opacity-70">
              <User className="w-5 h-5" />
            </Link>
          )}

          <button className="text-textMain hover:opacity-70">
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </header>
  );
}
