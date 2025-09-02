import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getProductsByCollection } from "@/lib/shopify"

interface CollectionPageProps {
  params: Promise<{ handle: string }>
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params
  const { collection, products } = await getProductsByCollection(handle, 20)

  if (!collection) {
    notFound()
  }

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat("et-EE", {
      style: "currency",
      currency: currencyCode,
    }).format(Number.parseFloat(amount))
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-sm hover:text-red-600">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Tagasi pealehele
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Collection Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{collection.title}</h1>
          {collection.description && <p className="mt-4 text-gray-600 max-w-3xl">{collection.description}</p>}
          <p className="mt-2 text-sm text-gray-500">
            {products.length} {products.length === 1 ? "toode" : "toodet"}
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <Card key={product.id} className="overflow-hidden group">
                <CardContent className="p-0">
                  <Link href={`/products/${product.handle}`}>
                    <div className="relative">
                      <Image
                        src={product.images.edges[0]?.node.url || "/placeholder.svg"}
                        alt={product.images.edges[0]?.node.altText || product.title}
                        width={300}
                        height={300}
                        className="w-full h-auto object-cover aspect-square group-hover:opacity-75 transition-opacity"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-red-600 font-medium">
                        {formatPrice(
                          product.priceRange.minVariantPrice.amount,
                          product.priceRange.minVariantPrice.currencyCode,
                        )}
                      </p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Selles kategoorias pole hetkel tooteid.</p>
            <Link href="/">
              <Button className="mt-4 bg-red-600 hover:bg-red-700">Tagasi pealehele</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
