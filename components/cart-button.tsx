"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { CartDrawer } from "@/components/cart-drawer"

export function CartButton() {
  const [isOpen, setIsOpen] = useState(false)
  const { state } = useCart()

  const totalItems = state.items?.reduce((total, item) => total + item.quantity, 0) || 0

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="relative text-white hover:bg-zinc-800 hover:text-white"
      >
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>
      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
