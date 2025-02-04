import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple, responsive Todo app with dark mode",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="https://unpkg.com/typewriter-effect@latest/dist/core.js" />
        <Script src="https://unpkg.com/framer-motion@latest/dist/framer-motion.js" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}

