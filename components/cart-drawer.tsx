"use client"

import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"

interface CartDrawerProps {
  isOpen?: boolean
  onClose?: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { state, removeItem, updateQuantity, toggleCart } = useCart()

  // Use props if provided, otherwise use context state
  const drawerOpen = isOpen !== undefined ? isOpen : state.isOpen
  const handleClose = onClose || toggleCart

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("et-EE", {
      style: "currency",
      currency: "EUR",
    }).format(price)
  }

  return (
    <Sheet open={drawerOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Ostukorv ({state.totalItems})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {state.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Teie ostukorv on tühi</p>
                <Button onClick={handleClose} className="mt-4 bg-red-600 hover:bg-red-700">
                  Jätka ostlemist
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        {item.image && (
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.title}</h3>
                        <p className="text-red-600 font-medium text-sm">{formatPrice(item.price)}</p>

                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeItem(item.variantId)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Kokku:</span>
                  <span>{formatPrice(state.totalPrice)}</span>
                </div>

                <div className="space-y-2">
                  <Link href="/checkout" onClick={handleClose}>
                    <Button className="w-full bg-red-600 hover:bg-red-700">Checkout</Button>
                  </Link>
                  <Button variant="outline" className="w-full bg-transparent" onClick={handleClose}>
                    Jätka ostlemist
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
