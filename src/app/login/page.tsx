"use client"

import { supabase } from "@/lib/supabaseClient"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 rounded-xl bg-white border border-gray-200 shadow">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="light"
        providers={[]}
      />
    </div>
  )
}
