"use client"

import Link from "next/link"
import { XCircle, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md w-full mx-4">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <XCircle className="h-16 w-16 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-600">Tellimus katkestatud</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">Teie tellimus katkestati. Teie ostukorv on endiselt salvestatud.</p>

          <div className="pt-6 space-y-2">
            <Link href="/checkout">
              <Button className="w-full bg-red-600 hover:bg-red-700">Tagasi checkout'i</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Jätka ostlemist
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
