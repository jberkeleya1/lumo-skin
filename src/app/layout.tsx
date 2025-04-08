import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar" // ✅ ensure this import path is correct

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-background text-textMain min-h-screen`}>
        <Navbar /> {/* ✅ This appears globally on all routes */}
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
