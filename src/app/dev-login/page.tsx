"use client"

import { supabase } from "@/lib/supabaseClient"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function DevLoginPage() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      redirect("/") // 🔒 protect route in production
      return
    }

    const handleLogin = async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email: "your-email@example.com",  // replace with your dev email
        password: "your-dev-password",    // replace with your dev password
      })

      if (error) {
        alert("Login failed: " + error.message)
      } else {
        window.location.href = "/" // or dashboard
      }
    }

    handleLogin()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-textMain">
      <p className="text-base">Signing in as dev...</p>
    </div>
  )
}
