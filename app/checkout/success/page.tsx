"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"

export default function CheckoutSuccess() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const { clearCart } = useCart()

  useEffect(() => {
    // Clear cart after successful payment
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md w-full mx-4">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Tellimus edukalt esitatud!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">Täname teid tellimuse eest. Saate peagi kinnituse e-kirja.</p>

          {sessionId && <p className="text-sm text-gray-500">Tellimuse ID: {sessionId.slice(-8)}</p>}

          <div className="space-y-3 pt-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              <span>Kinnituskiri saadetud</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Package className="h-4 w-4" />
              <span>Tellimus töötlemisel</span>
            </div>
          </div>

          <div className="pt-6 space-y-2">
            <Link href="/">
              <Button className="w-full bg-red-600 hover:bg-red-700">Jätka ostlemist</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
