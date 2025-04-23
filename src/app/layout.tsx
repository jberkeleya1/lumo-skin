import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { Space_Grotesk } from "next/font/google"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans", // ✅ for body text
})

export const metadata: Metadata = {
  title: "Lumo Skin",
  description: "AI-powered personalized skincare routines",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-sans bg-background text-textMain`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
