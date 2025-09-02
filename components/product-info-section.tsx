"use client"
import { AISalesmanChatbot } from "./ai-salesman-chatbot"
import Image from "next/image"

interface Product {
  id: string
  title: string
  handle: string
  description: string
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  availableForSale: boolean
  tags: string[]
  productType: string
  vendor: string
}

interface ProductInfoSectionProps {
  products: Product[]
  onFilterChange: (filters: {
    category?: string
    priceRange?: string
    availability?: string
    searchTerm?: string
  }) => void
}

export function ProductInfoSection({ products, onFilterChange }: ProductInfoSectionProps) {
  const handleFilterChange = (filters: {
    category?: string
    priceRange?: string
    availability?: string
    searchTerm?: string
  }) => {
    // Scroll to the filter section
    const filterSection = document.querySelector("[data-filter-section]")
    if (filterSection) {
      filterSection.scrollIntoView({ behavior: "smooth" })
    }

    // Apply filters
    onFilterChange(filters)

    // Trigger a custom event that the filter component can listen to
    window.dispatchEvent(new CustomEvent("chatbot-filter-change", { detail: filters }))
  }

  return (
    <div className="relative h-[80vh] bg-gradient-to-br from-zinc-900 to-black overflow-hidden">
      {/* Logo on the right side */}
      <div className="absolute top-8 right-8 z-30 my-16 mx-9">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pa%CC%88rnu%20Motopod%20Racing%20Logo-LSQysZTheZ80sIS2M9LJ3gsh0zrsts.png"
          alt="Pärnu Motopood Racing Logo"
          width={400}
          height={180}
          className="object-contain"
        />
      </div>

      {/* Small AI Chatbot on the left side */}
      <div className="absolute top-8 left-8 z-20 my-9">
        <div className="w-80 h-96 bg-zinc-900/95 backdrop-blur-sm rounded-lg border border-zinc-700 shadow-2xl flex-col items-start my-10">
          <AISalesmanChatbot products={products} onFilterChange={handleFilterChange} />
        </div>
      </div>
    </div>
  )
}
