import type React from "react"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { CartProvider } from "@/lib/cart-context"
import { QuickActionMenu } from "@/components/quick-action-menu"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "PharmaPro - Pharmacie en ligne",
  description: "Pharmacie en ligne avec click & collect, ordonnances numériques et téléconsultation",
  generator: "v0.app",
  keywords: "pharmacie, médicaments, click & collect, téléconsultation, ordonnance",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "PharmaPro - Pharmacie en ligne",
    description: "Vos produits de santé en ligne avec retrait en officine",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} font-sans antialiased`}>
        <CartProvider>
          {children}
          <QuickActionMenu />
        </CartProvider>
      </body>
    </html>
  )
}
