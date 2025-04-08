"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Navbar() {
  const [user, setUser] = useState<null | { email: string }>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        setUser({ email: data.user.email! })
      }
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    location.reload()
  }

  return (
    <header className="w-full border-b border-borderColor bg-background">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-display font-semibold text-textMain hover:opacity-90 transition"
        >
          Lumo Skin
        </Link>


        {/* Navigation */}
        <div className="flex gap-6 items-center text-sm text-textMuted">
          <div className="hidden md:flex gap-6">
            <a href="#blog" className="hover:text-textMain transition">Blog</a>
            <a href="#community" className="hover:text-textMain transition">Community</a>
          </div>

          {/* Auth Links */}
          {user ? (
            <>
              <Link
                href="/account"
                className="text-sm text-primary font-medium hover:underline"
              >
                Account
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm text-textMuted hover:text-textMain transition"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

