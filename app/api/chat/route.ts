import { type NextRequest, NextResponse } from "next/server"
import { xai } from "@ai-sdk/xai"
import { generateObject } from "ai"
import { z } from "zod"

const ChatResponseSchema = z.object({
  message: z.string().describe("Enthusiastic response in Estonian"),
  recommendedProducts: z.array(z.string()).describe("Array of product IDs to recommend"),
  filters: z
    .object({
      category: z.string().optional().describe("Product category: motorcycles, parts, accessories, gear"),
      priceRange: z.string().optional().describe("Price range: under-1000, 1000-5000, 5000-15000, over-15000"),
      availability: z.string().optional().describe("Availability: available, unavailable"),
      searchTerm: z.string().optional().describe("Search term to apply"),
    })
    .optional()
    .describe("Filters to apply to product catalog"),
})

export async function POST(request: NextRequest) {
  try {
    const { message, products } = await request.json()

    if (!process.env.XAI_API_KEY) {
      console.warn("XAI_API_KEY not found, using fallback response")
      return NextResponse.json({
        message: "Vabandust, AI teenus pole hetkel saadaval! Proovige palun hiljem uuesti.",
        recommendedProducts: [],
        filters: null,
      })
    }

    const productContext = products.map((p: any) => ({
      id: p.id,
      title: p.title,
      description: p.description.substring(0, 100),
      price: p.priceRange.minVariantPrice.amount,
      available: p.availableForSale,
      category: p.productType,
      tags: p.tags.join(", "),
    }))

    const result = await generateObject({
      model: xai("grok-beta"),
      prompt: `
        Sa oled entusiastlik ja sõbralik mootorratta müüja Pärnu Motopoes. Vasta ALATI eesti keeles!
        
        Kasutaja küsimus: "${message}"
        
        Saadaolevad tooted:
        ${JSON.stringify(productContext, null, 2)}
        
        Ülesanded:
        1. Vasta entusiastlikult eesti keeles, aga ÄRA kasuta emotikone
        2. Soovita kuni 2 kõige sobivamad toodet
        3. Määra õiged filtrid:
           - category: "motorcycles" (mootorrattad), "parts" (varuosad), "accessories" (aksessuaarid), "gear" (varustus)
           - priceRange: "under-1000", "1000-5000", "5000-15000", "over-15000"
           - availability: "available" või "unavailable"
           - searchTerm: märksõna otsinguks
        
        Näited:
        - "otsin kiivrit" → category: "gear", searchTerm: "kiiver"
        - "vajan mootorratast" → category: "motorcycles"
        - "odav varuosa" → category: "parts", priceRange: "under-1000"
        
        Ole entusiastlik, aga ära kasuta emotikone!
      `,
      schema: ChatResponseSchema,
    })

    // Find recommended products
    const recommendedProducts = result.object.recommendedProducts
      .map((id) => products.find((p: any) => p.id === id))
      .filter(Boolean)
      .slice(0, 2)

    return NextResponse.json({
      message: result.object.message,
      recommendedProducts,
      filters: result.object.filters,
    })
  } catch (error) {
    console.error("Chat API error:", error)

    return NextResponse.json({
      message:
        "Vabandust, mul on hetkel tehnilisi probleeme! Proovige palun hiljem uuesti või vaadake meie tooteid allpool olevast kataloogist!",
      recommendedProducts: [],
      filters: null,
    })
  }
}
