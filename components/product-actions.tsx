"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface ProductVariant {
  id: string
  title: string
  price: {
    amount: string
    currencyCode: string
  }
  availableForSale: boolean
}

interface ProductActionsProps {
  product: {
    id: string
    title: string
    handle: string
    images: {
      edges: Array<{
        node: {
          url: string
          altText?: string
        }
      }>
    }
    variants: {
      edges: Array<{
        node: ProductVariant
      }>
    }
  }
}

export function ProductActions({ product }: ProductActionsProps) {
  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState(product.variants.edges[0]?.node)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async () => {
    if (!selectedVariant) return

    setIsAddingToCart(true)
    try {
      addItem({
        id: product.id,
        variantId: selectedVariant.id,
        title: product.title,
        price: Number.parseFloat(selectedVariant.price.amount),
        quantity: 1,
        image: product.images.edges[0]?.node.url,
        handle: product.handle,
      })

      // Show success feedback
      setTimeout(() => {
        setIsAddingToCart(false)
      }, 1000)
    } catch (error) {
      console.error("Error adding to cart:", error)
      setIsAddingToCart(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Variant Selection */}
      {product.variants.edges.length > 1 && (
        <div>
          <label className="block text-sm font-medium mb-2">Variant</label>
          <select
            value={selectedVariant?.id || ""}
            onChange={(e) => {
              const variant = product.variants.edges.find((edge) => edge.node.id === e.target.value)?.node
              setSelectedVariant(variant)
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {product.variants.edges.map(({ node: variant }) => (
              <option key={variant.id} value={variant.id}>
                {variant.title} -{" "}
                {new Intl.NumberFormat("et-EE", {
                  style: "currency",
                  currency: variant.price.currencyCode,
                }).format(Number.parseFloat(variant.price.amount))}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          onClick={handleAddToCart}
          disabled={!selectedVariant?.availableForSale || isAddingToCart}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isAddingToCart ? "Lisab..." : "Lisa ostukorvi"}
        </Button>
      </div>
    </div>
  )
}
