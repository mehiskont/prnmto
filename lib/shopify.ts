type ShopifyFetchParams = {
  query: string
  variables?: Record<string, unknown>
}

type ShopifyFetchResult<T> = {
  status: number
  body: T
  error?: string
}

export async function shopifyFetch<T>({ query, variables }: ShopifyFetchParams): Promise<ShopifyFetchResult<T>> {
  const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

  if (!endpoint || !key) {
    return {
      status: 500,
      body: null as T,
      error: "Missing Shopify environment variables.",
    }
  }

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store", // Use 'force-cache' for production, 'no-store' for development
    })

    const body = await result.json()

    if (body.errors) {
      throw body.errors[0]
    }

    return {
      status: result.status,
      body: body.data,
    }
  } catch (error) {
    console.error("Error:", error)
    return {
      status: 500,
      body: null as T,
      error: "Error receiving data from Shopify",
    }
  }
}

const gql = String.raw

const getProductsQuery = gql`
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`

export async function getProducts(count: number) {
  const res = await shopifyFetch<{ products: any }>({
    query: getProductsQuery,
    variables: { first: count },
  })

  return res.body?.products?.edges.map((edge: any) => edge.node) || []
}
