"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Loader2, CreditCard, Truck, Shield, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCart } from "@/contexts/cart-context"

export default function CheckoutPage() {
  const { state } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("et-EE", {
      style: "currency",
      currency: "EUR",
    }).format(price)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckout = async () => {
    if (!customerInfo.email || !customerInfo.firstName || !customerInfo.lastName) {
      alert("Palun täitke kõik kohustuslikud väljad")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: state.items,
          customerInfo,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // In demo mode, redirect directly to success page
        router.push(`/checkout/success?session_id=${result.sessionId}`)
      } else {
        throw new Error(result.error || "Checkout failed")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Viga checkout protsessis. Palun proovige uuesti.")
    } finally {
      setLoading(false)
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Teie ostukorv on tühi</h1>
          <Button onClick={() => router.push("/")} className="bg-red-600 hover:bg-red-700">
            Jätka ostlemist
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Lõpetage oma tellimus</p>
        </div>

        {/* Demo Mode Alert */}
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Demo režiim: Tegelikku makset ei toimu. See on ainult näidis checkout protsessist.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kontaktandmed</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Eesnimi *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={customerInfo.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Perekonnanimi *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={customerInfo.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">E-post *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" name="phone" type="tel" value={customerInfo.phone} onChange={handleInputChange} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Tasuta transport üle 100€</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Turvaline maksmine</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Demo režiim</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Tellimuse kokkuvõte</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.variantId} className="flex gap-4">
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
                        <p className="text-gray-500 text-sm">Kogus: {item.quantity}</p>
                        <p className="text-red-600 font-medium text-sm">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Vahesumma:</span>
                    <span>{formatPrice(state.totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transport:</span>
                    <span>{state.totalPrice >= 100 ? "Tasuta" : formatPrice(5.99)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Kokku:</span>
                    <span>{formatPrice(state.totalPrice + (state.totalPrice >= 100 ? 0 : 5.99))}</span>
                  </div>
                </div>

                <Button onClick={handleCheckout} disabled={loading} className="w-full mt-6 bg-red-600 hover:bg-red-700">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Töötleb...
                    </>
                  ) : (
                    "Lõpeta tellimus (Demo)"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
