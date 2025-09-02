import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { CartDrawer } from "@/components/cart-drawer"

export const metadata: Metadata = {
  title: "Pärnu Motopood",
  description: "Mootorratta varuosad ja aksessuaarid",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="et">
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
