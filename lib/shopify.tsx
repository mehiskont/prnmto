// Shopify configuration - server-side only
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

// Mock data for demo mode when environment variables are missing
const MOCK_PRODUCTS = [
  {
    id: "mock-1",
    title: "Professional Racing Helmet",
    handle: "professional-racing-helmet",
    description: "High-performance motorcycle helmet with advanced safety features and aerodynamic design.",
    descriptionHtml: "<p>High-performance motorcycle helmet with advanced safety features and aerodynamic design.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/motorcycle-helmet-black.png",
            altText: "Professional Racing Helmet",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "299.99",
        currencyCode: "USD",
      },
    },
    availableForSale: true,
    tags: ["helmet", "safety", "racing"],
    productType: "Helmet",
    vendor: "MotoGear Pro",
    variants: {
      edges: [
        {
          node: {
            id: "variant-1",
            title: "Default Title",
            availableForSale: true,
            price: {
              amount: "299.99",
              currencyCode: "USD",
            },
          },
        },
      ],
    },
  },
  {
    id: "mock-2",
    title: "Racing Leather Gloves",
    handle: "racing-leather-gloves",
    description: "Premium leather motorcycle gloves with reinforced knuckles and palm protection.",
    descriptionHtml: "<p>Premium leather motorcycle gloves with reinforced knuckles and palm protection.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/motorcycle-racing-gloves-leather.png",
            altText: "Racing Leather Gloves",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "89.99",
        currencyCode: "USD",
      },
    },
    availableForSale: true,
    tags: ["gloves", "leather", "protection"],
    productType: "Gloves",
    vendor: "MotoGear Pro",
    variants: {
      edges: [
        {
          node: {
            id: "variant-2",
            title: "Default Title",
            availableForSale: true,
            price: {
              amount: "89.99",
              currencyCode: "USD",
            },
          },
        },
      ],
    },
  },
  {
    id: "mock-3",
    title: "Sport Leather Jacket",
    handle: "sport-leather-jacket",
    description: "Professional motorcycle jacket with CE-approved armor and premium leather construction.",
    descriptionHtml: "<p>Professional motorcycle jacket with CE-approved armor and premium leather construction.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/motorcycle-jacket-sport-black-leather.png",
            altText: "Sport Leather Jacket",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "449.99",
        currencyCode: "USD",
      },
    },
    availableForSale: true,
    tags: ["jacket", "leather", "armor"],
    productType: "Jacket",
    vendor: "MotoGear Pro",
    variants: {
      edges: [
        {
          node: {
            id: "variant-3",
            title: "Default Title",
            availableForSale: true,
            price: {
              amount: "449.99",
              currencyCode: "USD",
            },
          },
        },
      ],
    },
  },
]

const MOCK_COLLECTIONS = [
  {
    id: "mock-collection-1",
    title: "Safety Gear",
    handle: "safety-gear",
    description: "Essential motorcycle safety equipment for every rider.",
    products: {
      edges: MOCK_PRODUCTS.map((product) => ({ node: product })),
    },
  },
]

console.log("[SHOPIFY DEBUG] 🔍 Environment Variables Check:")
console.log("[SHOPIFY DEBUG] SHOPIFY_STORE_DOMAIN:", SHOPIFY_STORE_DOMAIN ? "EXISTS" : "MISSING")
console.log("[SHOPIFY DEBUG] SHOPIFY_STOREFRONT_ACCESS_TOKEN:", SHOPIFY_STOREFRONT_ACCESS_TOKEN ? "EXISTS" : "MISSING")

const isDemoMode = !SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN

if (isDemoMode) {
  console.log("🎭 DEMO MODE: Using mock data - Shopify environment variables not configured")
} else {
  console.log("🛍️ LIVE MODE: Using Shopify API")
}

async function shopifyFetch(query: string, variables = {}) {
  if (isDemoMode) {
    console.log("[SHOPIFY DEBUG] 🎭 Demo mode - skipping API call")
    throw new Error("Demo mode active - using mock data")
  }

  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`
  console.log("[SHOPIFY DEBUG] 🌐 Making request to:", endpoint)

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    })

    console.log("[SHOPIFY DEBUG] 📡 Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[SHOPIFY DEBUG] ❌ HTTP error:", response.status, errorText)
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    console.log("[SHOPIFY DEBUG] ✅ API response received")

    if (result.errors) {
      console.error("[SHOPIFY DEBUG] ❌ GraphQL errors:", result.errors)
      throw new Error(`GraphQL errors: ${result.errors.map((e: any) => e.message).join(", ")}`)
    }

    return result
  } catch (error) {
    console.error("[SHOPIFY DEBUG] ❌ Shopify fetch error:", error)
    throw error
  }
}

// Named export: getProducts
export async function getProducts(limit = 50) {
  console.log("[SHOPIFY DEBUG] 🛍️ getProducts called with limit:", limit)

  if (isDemoMode) {
    console.log("[SHOPIFY DEBUG] 🎭 Returning mock products")
    return MOCK_PRODUCTS.slice(0, limit)
  }

  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            availableForSale
            tags
            productType
            vendor
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await shopifyFetch(query, { first: limit })
    const products = response.data.products.edges.map((edge: any) => edge.node)
    console.log("[SHOPIFY DEBUG] ✅ Products fetched:", products.length)
    return products
  } catch (error) {
    console.error("[SHOPIFY DEBUG] ❌ Failed to fetch products:", error)
    throw error
  }
}

// Named export: getCollections
export async function getCollections(limit = 10) {
  console.log("[SHOPIFY DEBUG] 📂 getCollections called with limit:", limit)

  if (isDemoMode) {
    console.log("[SHOPIFY DEBUG] 🎭 Returning mock collections")
    return MOCK_COLLECTIONS.slice(0, limit)
  }

  const query = `
    query getCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            products(first: 20) {
              edges {
                node {
                  id
                  title
                  handle
                  description
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  availableForSale
                  tags
                  productType
                  vendor
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await shopifyFetch(query, { first: limit })
    const collections = response.data.collections.edges.map((edge: any) => edge.node)
    console.log("[SHOPIFY DEBUG] ✅ Collections fetched:", collections.length)
    return collections
  } catch (error) {
    console.error("[SHOPIFY DEBUG] ❌ Failed to fetch collections:", error)
    throw error
  }
}

// Named export: getProduct
export async function getProduct(handle: string) {
  console.log("[SHOPIFY DEBUG] 🔍 getProduct called with handle:", handle)

  if (isDemoMode) {
    console.log("[SHOPIFY DEBUG] 🎭 Returning mock product")
    const product = MOCK_PRODUCTS.find((p) => p.handle === handle)
    return product || null
  }

  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        availableForSale
        tags
        productType
        vendor
        variants(first: 20) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await shopifyFetch(query, { handle })
    const product = response.data.product
    console.log("[SHOPIFY DEBUG] ✅ Product fetched:", product?.title || "Not found")
    return product
  } catch (error) {
    console.error("[SHOPIFY DEBUG] ❌ Failed to fetch product:", error)
    throw error
  }
}

// Named export: getCollection
export async function getCollection(handle: string) {
  console.log("[SHOPIFY DEBUG] 📁 getCollection called with handle:", handle)

  if (isDemoMode) {
    console.log("[SHOPIFY DEBUG] 🎭 Returning mock collection")
    const collection = MOCK_COLLECTIONS.find((c) => c.handle === handle)
    return collection || null
  }

  const query = `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        id
        title
        handle
        description
        products(first: 100) {
          edges {
            node {
              id
              title
              handle
              description
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              availableForSale
              tags
              productType
              vendor
            }
          }
        }
      }
    }
  `

  try {
    const response = await shopifyFetch(query, { handle })
    const collection = response.data.collection
    console.log("[SHOPIFY DEBUG] ✅ Collection fetched:", collection?.title || "Not found")
    return collection
  } catch (error) {
    console.error("[SHOPIFY DEBUG] ❌ Failed to fetch collection:", error)
    throw error
  }
}

// Named export: getProductsByCollection
export async function getProductsByCollection(handle: string, limit = 50) {
  console.log("[SHOPIFY DEBUG] 🛒 getProductsByCollection called with handle:", handle, "limit:", limit)

  try {
    const collection = await getCollection(handle)
    if (!collection) {
      return { collection: null, products: [] }
    }

    const products = collection.products.edges.map((edge: any) => edge.node).slice(0, limit)
    console.log("[SHOPIFY DEBUG] ✅ Products by collection fetched:", products.length)
    return { collection, products }
  } catch (error) {
    console.error("[SHOPIFY DEBUG] ❌ Failed to fetch products by collection:", error)
    throw error
  }
}
