import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Home, Mail, Phone, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { getProducts } from "@/lib/shopify"

export default async function HomePage() {
  const navItems = ["SÕIDUKID", "LISAVARUSTUS", "SÕIDUVARUSTUS", "REHVID", "MARINE", "VARUOSAD", "GRILLID"]

  const recommendedCategories = [
    { name: "ATV" },
    { name: "LISAVARUSTUS" },
    { name: "SÕIDUVARUSTUS" },
    { name: "LASTE SÕIDUKID" },
  ]

  const popularProducts = await getProducts(4)

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
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-14">
                <Link href="#" className="p-2 hover:bg-zinc-800 rounded">
                  <Home size={20} />
                </Link>
                <div className="flex items-center space-x-1 ml-4">
                  {navItems.map((item) => (
                    <DropdownMenu key={item}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="text-white hover:bg-zinc-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          {item} <ChevronDown size={16} className="ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-black text-white border-zinc-700">
                        <DropdownMenuItem>Sub-item 1</DropdownMenuItem>
                        <DropdownMenuItem>Sub-item 2</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ))}
                </div>
              </div>
            </nav>
          </header>

          <main>
            {/* Hero Section */}
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=1200"
                alt="Pärnu Motopood storefront"
                width={1200}
                height={500}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-8">
                <div className="text-white text-3xl font-bold tracking-wider">
                  LIIVA 2 | PÄRNU | TEL 5665 9044 | INFO@PARNUMOTO.EE
                </div>
                <div className="self-end">
                  <Image
                    src="/logo.png"
                    alt="Pärnu Motopood Logo"
                    width={200}
                    height={100}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8">
              {/* Recommended Categories */}
              <section className="mb-12">
                <h2 className="text-lg font-semibold uppercase text-zinc-700 border-b-2 border-red-600 pb-2 mb-6">
                  Soovitatavad Kategooriad
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recommendedCategories.map((cat) => (
                    <div
                      key={cat.name}
                      className="bg-zinc-900 text-white p-6 flex flex-col items-center justify-center text-center rounded"
                    >
                      <h3 className="text-xl font-bold mb-4">{cat.name}</h3>
                      <Button className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-4 rounded">
                        Näe rohkem
                      </Button>
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <aside className="lg:col-span-1">
                  <h2 className="text-lg font-semibold uppercase text-zinc-700 border-b-2 border-red-600 pb-2 mb-6">
                    Kategooriad
                  </h2>
                  <Accordion type="single" collapsible className="w-full bg-zinc-100">
                    {navItems.map((item) => (
                      <AccordionItem value={item} key={item} className="border-zinc-200">
                        <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline hover:bg-zinc-200">
                          {item}
                        </AccordionTrigger>
                        <AccordionContent className="bg-white p-2">
                          <ul className="space-y-1 pl-4">
                            <li>
                              <Link href="#" className="text-sm text-zinc-600 hover:text-red-600">
                                Sub-category 1
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="text-sm text-zinc-600 hover:text-red-600">
                                Sub-category 2
                              </Link>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </aside>

                {/* Popular Products */}
                <section className="lg:col-span-3">
                  <div className="flex items-center border-b-2 border-red-600 pb-2 mb-6">
                    <h2 className="text-lg font-semibold uppercase text-zinc-700 mr-6">Populaarsed Tooted</h2>
                    <Link href="#" className="text-lg font-semibold uppercase text-zinc-500">
                      Soodus
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {popularProducts.map((product: any) => (
                      <Card key={product.id} className="overflow-hidden group">
                        <CardContent className="p-0">
                          <div className="relative">
                            <Image
                              src={product.images.edges[0]?.node.url || "/placeholder.svg"}
                              alt={product.images.edges[0]?.node.altText || product.title}
                              width={300}
                              height={300}
                              className="w-full h-auto object-cover aspect-square"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                            >
                              <Heart className="h-5 w-5 text-zinc-600" />
                            </Button>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-zinc-800">{product.title}</h3>
                            <p className="text-sm text-zinc-600">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: product.priceRange.minVariantPrice.currencyCode,
                              }).format(product.priceRange.minVariantPrice.amount)}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              </div>
            </div>
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
