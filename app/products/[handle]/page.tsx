import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronDown, Home, Mail, Phone, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getProduct, getProducts, getCollections } from "@/lib/shopify"
import { CartButton } from "@/components/cart-button"
import { ProductActions } from "@/components/product-actions"

interface ProductPageProps {
  params: {
    handle: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.handle)

  if (!product) {
    notFound()
  }

  // Get collections for navigation
  const collections = await getCollections(10)
  const navItems = collections.slice(0, 7).map((collection) => ({
    title: collection.title.toUpperCase(),
    handle: collection.handle,
    products: collection.products.edges.map((edge: any) => edge.node),
  }))

  // Get related products (first 4 products from the same collection or random products)
  const relatedProducts = await getProducts(4)

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat("et-EE", {
      style: "currency",
      currency: currencyCode,
    }).format(Number.parseFloat(amount))
  }

  return (
    <div className="bg-[#2d2d2d] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto bg-[#1e1e1e]">
        <header className="text-white">
          {/* Top bar */}
          <div className="bg-[#111] text-xs text-zinc-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Phone size={14} className="text-red-600" />
                  <span>Telefon: +372 56659044</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail size={14} className="text-red-600" />
                  <span>E-post: info@parnumoto.ee</span>
                </div>
              </div>
              <div>
                <span>Tere tulemast, </span>
                <Link href="#" className="text-red-600 hover:underline">
                  Sisene
                </Link>
                <span> või </span>
                <Link href="#" className="text-red-600 hover:underline">
                  Registreeru püsikliendiks
                </Link>
              </div>
            </div>
          </div>

          {/* Main navigation */}
          <nav className="bg-black border-b-2 border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
              <div className="flex items-center">
                <Link href="/" className="p-2 hover:bg-zinc-800 rounded">
                  <Home size={20} />
                </Link>
                <div className="flex items-center space-x-1 ml-4">
                  {navItems.map((item) => (
                    <DropdownMenu key={item.handle}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="text-white hover:bg-zinc-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          {item.title} <ChevronDown size={16} className="ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-black text-white border-zinc-700">
                        <DropdownMenuItem asChild>
                          <Link href={`/collections/${item.handle}`} className="w-full">
                            Vaata kõiki
                          </Link>
                        </DropdownMenuItem>
                        {item.products.slice(0, 5).map((product: any) => (
                          <DropdownMenuItem key={product.id} asChild>
                            <Link href={`/products/${product.handle}`} className="w-full">
                              {product.title}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ))}
                </div>
              </div>

              {/* Cart Button */}
              <CartButton />
            </div>
          </nav>
        </header>

        <main className="bg-white">
          {/* Breadcrumb */}
          <div className="px-4 sm:px-6 lg:px-8 py-4 border-b">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-red-600">
                Avaleht
              </Link>
              <span>/</span>
              <Link href="/collections" className="hover:text-red-600">
                Tooted
              </Link>
              <span>/</span>
              <span className="text-gray-900">{product.title}</span>
            </div>
          </div>

          {/* Back button */}
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/" className="inline-flex items-center text-red-600 hover:text-red-700">
              <ArrowLeft size={16} className="mr-2" />
              Tagasi
            </Link>
          </div>

          {/* Product Details */}
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div>
                {product.images.edges.length > 1 ? (
                  <Carousel className="w-full">
                    <CarouselContent>
                      {product.images.edges.map((imageEdge: any, index: number) => (
                        <CarouselItem key={index}>
                          <div className="aspect-square">
                            <Image
                              src={imageEdge.node.url || "/placeholder.svg"}
                              alt={imageEdge.node.altText || product.title}
                              width={600}
                              height={600}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                ) : (
                  <div className="aspect-square">
                    <Image
                      src={product.images.edges[0]?.node.url || "/placeholder.svg"}
                      alt={product.images.edges[0]?.node.altText || product.title}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                  <p className="text-2xl font-semibold text-red-600 mt-2">
                    {formatPrice(
                      product.priceRange.minVariantPrice.amount,
                      product.priceRange.minVariantPrice.currencyCode,
                    )}
                  </p>
                </div>

                {/* Product Actions */}
                <ProductActions product={product} />

                {/* Product Description */}
                {product.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Kirjeldus</h3>
                    <div
                      className="text-gray-700 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                    />
                  </div>
                )}

                {/* Product Details */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Toote üksikasjad</h3>
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="font-medium text-gray-900">Tootekood</dt>
                      <dd className="text-gray-700">{product.id.split("/").pop()}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">Saadavus</dt>
                      <dd className="text-gray-700">
                        {product.variants.edges[0]?.node.availableForSale ? "Laos" : "Pole saadaval"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="px-4 sm:px-6 lg:px-8 py-12 border-t">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Seotud tooted</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct: any) => (
                <Card key={relatedProduct.id} className="overflow-hidden group">
                  <CardContent className="p-0">
                    <Link href={`/products/${relatedProduct.handle}`}>
                      <div className="aspect-square">
                        <Image
                          src={relatedProduct.images.edges[0]?.node.url || "/placeholder.svg"}
                          alt={relatedProduct.images.edges[0]?.node.altText || relatedProduct.title}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                          {relatedProduct.title}
                        </h3>
                        <p className="text-sm text-red-600 font-medium">
                          {formatPrice(
                            relatedProduct.priceRange.minVariantPrice.amount,
                            relatedProduct.priceRange.minVariantPrice.currencyCode,
                          )}
                        </p>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
