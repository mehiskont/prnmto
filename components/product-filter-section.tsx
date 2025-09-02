"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  title: string
  handle: string
  description: string
  images: {
    edges: Array<{
      node: {
        url: string
        altText: string
      }
    }>
  }
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

interface Collection {
  id: string
  title: string
  handle: string
  description: string
}

interface ProductFilterSectionProps {
  products: Product[]
  collections: Collection[]
}

export function ProductFilterSection({ products, collections }: ProductFilterSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriceRange, setSelectedPriceRange] = useState("all")
  const [selectedAvailability, setSelectedAvailability] = useState("all")
  const [sortBy, setSortBy] = useState("price-asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)

  // Listen for chatbot filter changes
  useEffect(() => {
    const handleChatbotFilterChange = (event: CustomEvent) => {
      const filters = event.detail
      if (filters.category && filters.category !== "all") setSelectedCategory(filters.category)
      if (filters.priceRange && filters.priceRange !== "all") setSelectedPriceRange(filters.priceRange)
      if (filters.availability && filters.availability !== "all") setSelectedAvailability(filters.availability)
      if (filters.searchTerm) setSearchTerm(filters.searchTerm)
      setCurrentPage(1) // Reset to first page
    }

    window.addEventListener("chatbot-filter-change", handleChatbotFilterChange as EventListener)
    return () => {
      window.removeEventListener("chatbot-filter-change", handleChatbotFilterChange as EventListener)
    }
  }, [])

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat("et-EE", {
      style: "currency",
      currency: currencyCode,
    }).format(Number.parseFloat(amount))
  }

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.vendor.toLowerCase().includes(searchTerm.toLowerCase())

      // Category filter
      const matchesCategory =
        selectedCategory === "all" ||
        product.productType.toLowerCase() === selectedCategory.toLowerCase() ||
        product.tags.some((tag) => tag.toLowerCase().includes(selectedCategory.toLowerCase()))

      // Price range filter
      const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
      let matchesPrice = true
      if (selectedPriceRange === "under-1000") matchesPrice = price < 1000
      else if (selectedPriceRange === "1000-5000") matchesPrice = price >= 1000 && price <= 5000
      else if (selectedPriceRange === "5000-15000") matchesPrice = price >= 5000 && price <= 15000
      else if (selectedPriceRange === "over-15000") matchesPrice = price > 15000

      // Availability filter
      const matchesAvailability =
        selectedAvailability === "all" ||
        (selectedAvailability === "available" && product.availableForSale) ||
        (selectedAvailability === "unavailable" && !product.availableForSale)

      return matchesSearch && matchesCategory && matchesPrice && matchesAvailability
    })

    // Sort products
    filtered.sort((a, b) => {
      const priceA = Number.parseFloat(a.priceRange.minVariantPrice.amount)
      const priceB = Number.parseFloat(b.priceRange.minVariantPrice.amount)

      switch (sortBy) {
        case "price-asc":
          return priceA - priceB
        case "price-desc":
          return priceB - priceA
        case "name-asc":
          return a.title.localeCompare(b.title)
        case "name-desc":
          return b.title.localeCompare(a.title)
        case "newest":
          return b.id.localeCompare(a.id)
        default:
          return 0
      }
    })

    return filtered
  }, [products, searchTerm, selectedCategory, selectedPriceRange, selectedAvailability, sortBy])

  // Pagination calculations
  const totalProducts = filteredAndSortedProducts.length
  const totalPages = Math.ceil(totalProducts / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
    switch (filterType) {
      case "search":
        setSearchTerm(value)
        break
      case "category":
        setSelectedCategory(value)
        break
      case "price":
        setSelectedPriceRange(value)
        break
      case "availability":
        setSelectedAvailability(value)
        break
      case "sort":
        setSortBy(value)
        break
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedPriceRange("all")
    setSelectedAvailability("all")
    setSortBy("price-asc")
    setCurrentPage(1)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (searchTerm) count++
    if (selectedCategory !== "all") count++
    if (selectedPriceRange !== "all") count++
    if (selectedAvailability !== "all") count++
    return count
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="bg-white p-8" data-filter-section>
      {/* Filter Controls */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
            <Input
              placeholder="Otsi tooteid..."
              value={searchTerm}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Kategooria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Kõik kategooriad</SelectItem>
              <SelectItem value="motorcycles">Mootorrattad</SelectItem>
              <SelectItem value="parts">Varuosad</SelectItem>
              <SelectItem value="accessories">Aksessuaarid</SelectItem>
              <SelectItem value="gear">Varustus</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Range Filter */}
          <Select value={selectedPriceRange} onValueChange={(value) => handleFilterChange("price", value)}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Hind" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Kõik hinnad</SelectItem>
              <SelectItem value="under-1000">Alla €1,000</SelectItem>
              <SelectItem value="1000-5000">€1,000 - €5,000</SelectItem>
              <SelectItem value="5000-15000">€5,000 - €15,000</SelectItem>
              <SelectItem value="over-15000">Üle €15,000</SelectItem>
            </SelectContent>
          </Select>

          {/* Availability Filter */}
          <Select value={selectedAvailability} onValueChange={(value) => handleFilterChange("availability", value)}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Saadavus" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Kõik tooted</SelectItem>
              <SelectItem value="available">Saadaval</SelectItem>
              <SelectItem value="unavailable">Pole saadaval</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={(value) => handleFilterChange("sort", value)}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Sorteeri" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Hind: madal → kõrge</SelectItem>
              <SelectItem value="price-desc">Hind: kõrge → madal</SelectItem>
              <SelectItem value="name-asc">Nimi: A → Z</SelectItem>
              <SelectItem value="name-desc">Nimi: Z → A</SelectItem>
              <SelectItem value="newest">Uusimad</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters and Clear */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {getActiveFiltersCount() > 0 && (
            <>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-zinc-500" />
                <span className="text-sm text-zinc-600">Aktiivsed filtrid:</span>
              </div>
              {searchTerm && (
                <Badge variant="secondary" className="gap-1">
                  Otsing: "{searchTerm}"
                  <button onClick={() => handleFilterChange("search", "")} className="ml-1 hover:text-red-600">
                    ×
                  </button>
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Kategooria: {selectedCategory}
                  <button onClick={() => handleFilterChange("category", "all")} className="ml-1 hover:text-red-600">
                    ×
                  </button>
                </Badge>
              )}
              {selectedPriceRange !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Hind: {selectedPriceRange}
                  <button onClick={() => handleFilterChange("price", "all")} className="ml-1 hover:text-red-600">
                    ×
                  </button>
                </Badge>
              )}
              {selectedAvailability !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Saadavus: {selectedAvailability === "available" ? "Saadaval" : "Pole saadaval"}
                  <button onClick={() => handleFilterChange("availability", "all")} className="ml-1 hover:text-red-600">
                    ×
                  </button>
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Tühista filtrid
              </Button>
            </>
          )}
        </div>

        {/* Results Summary and Items Per Page */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-sm text-zinc-600">
            Näitan {startIndex + 1}-{Math.min(endIndex, totalProducts)} / {totalProducts} toodet
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-600">Tooteid lehel:</span>
            <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="24">24</SelectItem>
                <SelectItem value="48">48</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden group">
              <CardContent className="p-0">
                <Link href={`/products/${product.handle}`}>
                  <div className="relative">
                    <Image
                      src={product.images.edges[0]?.node.url || "/placeholder.svg?height=300&width=300&text=No+Image"}
                      alt={product.images.edges[0]?.node.altText || product.title}
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover aspect-square group-hover:opacity-75 transition-opacity"
                    />
                    {!product.availableForSale && (
                      <Badge className="absolute top-2 left-2 bg-red-600">Pole saadaval</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-zinc-800 group-hover:text-red-600 transition-colors mb-1">
                      {product.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-red-600 font-medium">
                        {formatPrice(
                          product.priceRange.minVariantPrice.amount,
                          product.priceRange.minVariantPrice.currencyCode,
                        )}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {product.productType}
                      </Badge>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-zinc-500 text-lg mb-4">Filtritele vastavaid tooteid ei leitud</p>
          <Button onClick={clearFilters} variant="outline">
            Tühista filtrid
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-zinc-600">
            Leht {currentPage} / {totalPages}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Eelmine
            </Button>

            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, index) => (
                <div key={index}>
                  {page === "..." ? (
                    <span className="px-2 py-1 text-zinc-400">...</span>
                  ) : (
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page as number)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Järgmine
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
