// Shopify configuration
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

console.log("[SHOPIFY DEBUG] 🔍 Environment Variables Check:")
console.log("[SHOPIFY DEBUG] SHOPIFY_STORE_DOMAIN:", SHOPIFY_STORE_DOMAIN ? "EXISTS" : "MISSING")
console.log("[SHOPIFY DEBUG] SHOPIFY_STOREFRONT_ACCESS_TOKEN:", SHOPIFY_STOREFRONT_ACCESS_TOKEN ? "EXISTS" : "MISSING")

if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  console.error("❌ SHOPIFY CONFIGURATION ERROR:")
  console.error("Missing required environment variables:")
  console.error("- SHOPIFY_STORE_DOMAIN:", SHOPIFY_STORE_DOMAIN ? "✅ Set" : "❌ Missing")
  console.error("- SHOPIFY_STOREFRONT_ACCESS_TOKEN:", SHOPIFY_STOREFRONT_ACCESS_TOKEN ? "✅ Set" : "❌ Missing")
  console.error("Please configure these in your v0 project settings.")
}

async function shopifyFetch(query: string, variables = {}) {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    console.log("[SHOPIFY DEBUG] ❌ Missing environment variables - cannot make API call")
    throw new Error(
      "Shopify configuration missing. Please set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variables.",
    )
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
    const products = collection.products.edges.map((edge: any) => edge.node).slice(0, limit)
    console.log("[SHOPIFY DEBUG] ✅ Products by collection fetched:", products.length)
    return { collection, products }
  } catch (error) {
    console.error("[SHOPIFY DEBUG] ❌ Failed to fetch products by collection:", error)
    throw error
  }
}
