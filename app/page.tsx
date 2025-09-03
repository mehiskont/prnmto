import Link from "next/link"
import { ChevronDown, Home } from "lucide-react"
import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getProducts, getCollections } from "@/lib/shopify"
import { CartButton } from "@/components/cart-button"
import { ProductInfoSection } from "@/components/product-info-section"
import { ProductFilterSection } from "@/components/product-filter-section"

export const revalidate = 0

export default async function HomePage() {
  // Fetch Shopify data
  const collections = await getCollections(10)
  const allProducts = await getProducts(400) // Get all available products (up to 400)

  const navItems = collections.slice(0, 7).map((collection) => ({
    title: collection.title.toUpperCase(),
    handle: collection.handle,
    products: collection.products.edges.map((edge: any) => edge.node),
  }))

  return (
    <div className="bg-[#2d2d2d] min-h-screen font-sans">
      <div
        className="bg-zinc-800 bg-repeat"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml,%3Csvg width="6" height="6" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%234a4a4a" fillOpacity="0.4" fillRule="evenodd"%3E%3Cpath d="M5 0h1L0 6V5zM6 5v1H5z"/%3E%3C/g%3E%3C/svg%3E\')',
        }}
      >
        <div className="max-w-7xl mx-auto bg-[#1e1e1e]">
          <header className="text-white">
            {/* Top bar */}
            <div className="bg-[#111] text-xs text-zinc-400"></div>

            <nav className="bg-black border-b-2 border-zinc-800">
              
            </nav>
          </header>

          <main>
            {/* Hero Section with AI Chatbot */}
            <Suspense
              fallback={
                <div className="relative h-[80vh] bg-gradient-to-br from-zinc-900 to-black overflow-hidden flex items-center justify-center">
                  <div className="text-white text-xl">Laeb AI konsultanti...</div>
                </div>
              }
            >
              <ProductInfoSection products={allProducts} />
            </Suspense>

            {/* Product Filter Section */}
            <Suspense
              fallback={
                <div className="bg-white p-8">
                  <div className="flex items-center justify-center h-64">
                    <div className="text-zinc-600 text-xl">Laeb tooteid...</div>
                  </div>
                </div>
              }
            >
              <ProductFilterSection products={allProducts} collections={collections} />
            </Suspense>
          </main>
        </div>
      </div>
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-1/2 -right-10 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 -rotate-90 origin-bottom-right rounded-t-md text-sm font-bold tracking-wider"
      >
        Facebook
      </a>
    </div>
  )
}
