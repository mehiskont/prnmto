const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

async function shopifyFetch(query: string, variables = {}) {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    console.warn("Shopify environment variables not found, using fallback data")
    return null
  }

  try {
    const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Shopify API error:", error)
    return null
  }
}

// Comprehensive fallback data with 50+ products
const fallbackProducts = [
  // Motorcycles (15 products)
  {
    id: "gid://shopify/Product/1",
    title: "Apollo Premium Thunder 140cc Elektristarter",
    handle: "apollo-premium-thunder-140cc-elektristarter",
    description:
      "Võimas ja usaldusväärne Apollo Thunder 140cc mootorratas elektristarter süsteemiga. Ideaalne nii algajatele kui ka kogenud sõitjatele.",
    descriptionHtml:
      "<p>Võimas ja usaldusväärne Apollo Thunder 140cc mootorratas elektristarter süsteemiga. Ideaalne nii algajatele kui ka kogenud sõitjatele.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Apollo+Thunder+140cc",
            altText: "Apollo Premium Thunder 140cc Elektristarter",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "2490.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["motorcycles", "apollo", "beginner", "electric-start"],
    productType: "Motorcycles",
    vendor: "Apollo",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/1",
            availableForSale: true,
            priceV2: { amount: "2490.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/2",
    title: "Sport Motorcycle 250cc",
    handle: "sport-motorcycle-250cc",
    description: "Kiire ja sportlik 250cc mootorratas. Suurepärane valik sportliku sõidu jaoks.",
    descriptionHtml: "<p>Kiire ja sportlik 250cc mootorratas. Suurepärane valik sportliku sõidu jaoks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Sport+250cc",
            altText: "Sport Motorcycle 250cc",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "3500.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["motorcycles", "sport", "performance"],
    productType: "Motorcycles",
    vendor: "Yamaha",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/2",
            availableForSale: true,
            priceV2: { amount: "3500.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/3",
    title: "Cruiser Motorcycle 500cc",
    handle: "cruiser-motorcycle-500cc",
    description: "Mugav cruiser mootorratas pikemateks sõitudeks. 500cc mootor pakub piisavalt jõudu.",
    descriptionHtml: "<p>Mugav cruiser mootorratas pikemateks sõitudeks. 500cc mootor pakub piisavalt jõudu.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Cruiser+500cc",
            altText: "Cruiser Motorcycle 500cc",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "4200.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: false,
    tags: ["motorcycles", "cruiser", "comfort"],
    productType: "Motorcycles",
    vendor: "Honda",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/3",
            availableForSale: false,
            priceV2: { amount: "4200.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/4",
    title: "Adventure Motorcycle 750cc",
    handle: "adventure-motorcycle-750cc",
    description: "Seikluste mootorratas maastiku ja tee jaoks. 750cc mootor ja tugev konstruktsioon.",
    descriptionHtml: "<p>Seikluste mootorratas maastiku ja tee jaoks. 750cc mootor ja tugev konstruktsioon.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Adventure+750cc",
            altText: "Adventure Motorcycle 750cc",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "6800.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["motorcycles", "adventure", "offroad"],
    productType: "Motorcycles",
    vendor: "KTM",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/4",
            availableForSale: true,
            priceV2: { amount: "6800.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/5",
    title: "Supermoto 450cc",
    handle: "supermoto-450cc",
    description: "Supermoto stiilis mootorratas linna ja raja jaoks. 450cc võimas mootor.",
    descriptionHtml: "<p>Supermoto stiilis mootorratas linna ja raja jaoks. 450cc võimas mootor.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Supermoto+450cc",
            altText: "Supermoto 450cc",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "5200.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["motorcycles", "supermoto", "street"],
    productType: "Motorcycles",
    vendor: "Husqvarna",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/5",
            availableForSale: true,
            priceV2: { amount: "5200.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/6",
    title: "Enduro 300cc",
    handle: "enduro-300cc",
    description: "Enduro mootorratas maastiku vallutamiseks. Kerge ja vastupidav.",
    descriptionHtml: "<p>Enduro mootorratas maastiku vallutamiseks. Kerge ja vastupidav.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Enduro+300cc",
            altText: "Enduro 300cc",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "4800.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: false,
    tags: ["motorcycles", "enduro", "offroad"],
    productType: "Motorcycles",
    vendor: "Beta",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/6",
            availableForSale: false,
            priceV2: { amount: "4800.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/7",
    title: "Racing Motorcycle 1000cc",
    handle: "racing-motorcycle-1000cc",
    description: "Võidusõidu mootorratas professionaalidele. 1000cc võimas mootor.",
    descriptionHtml: "<p>Võidusõidu mootorratas professionaalidele. 1000cc võimas mootor.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Racing+1000cc",
            altText: "Racing Motorcycle 1000cc",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "12500.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["motorcycles", "racing", "professional"],
    productType: "Motorcycles",
    vendor: "Ducati",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/7",
            availableForSale: true,
            priceV2: { amount: "12500.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/8",
    title: "Scooter 125cc",
    handle: "scooter-125cc",
    description: "Linnaroller mugavaks liikumiseks. Ökonoomne ja praktiline.",
    descriptionHtml: "<p>Linnaroller mugavaks liikumiseks. Ökonoomne ja praktiline.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Scooter+125cc",
            altText: "Scooter 125cc",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "1800.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["motorcycles", "scooter", "city"],
    productType: "Motorcycles",
    vendor: "Piaggio",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/8",
            availableForSale: true,
            priceV2: { amount: "1800.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/9",
    title: "Electric Motorcycle",
    handle: "electric-motorcycle",
    description: "Elektriline mootorratas keskkonnasõbralik sõit. Vaikne ja ökonoomne.",
    descriptionHtml: "<p>Elektriline mootorratas keskkonnasõbralik sõit. Vaikne ja ökonoomne.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Electric+Bike",
            altText: "Electric Motorcycle",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "8500.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["motorcycles", "electric", "eco"],
    productType: "Motorcycles",
    vendor: "Zero",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/9",
            availableForSale: true,
            priceV2: { amount: "8500.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/10",
    title: "Vintage Motorcycle 350cc",
    handle: "vintage-motorcycle-350cc",
    description: "Klassikaline vintage mootorratas kollektsionääridele. Restaureeritud seisukord.",
    descriptionHtml: "<p>Klassikaline vintage mootorratas kollektsionääridele. Restaureeritud seisukord.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Vintage+350cc",
            altText: "Vintage Motorcycle 350cc",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "7200.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: false,
    tags: ["motorcycles", "vintage", "classic"],
    productType: "Motorcycles",
    vendor: "Triumph",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/10",
            availableForSale: false,
            priceV2: { amount: "7200.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/11",
    title: "Dirt Bike 250cc",
    handle: "dirt-bike-250cc",
    description: "Motokrossi jalgratas maastiku sõiduks. Tugev ja kerge konstruktsioon.",
    descriptionHtml: "<p>Motokrossi jalgratas maastiku sõiduks. Tugev ja kerge konstruktsioon.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Dirt+Bike+250cc",
            altText: "Dirt Bike 250cc",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "3800.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["motorcycles", "dirt", "motocross"],
    productType: "Motorcycles",
    vendor: "Kawasaki",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/11",
            availableForSale: true,
            priceV2: { amount: "3800.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/12",
    title: "Touring Motorcycle 800cc",
    handle: "touring-motorcycle-800cc",
    description: "Turismimootorratas pikemateks reisideks. Mugav ja varustatud.",
    descriptionHtml: "<p>Turismimootorratas pikemateks reisideks. Mugav ja varustatud.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Touring+800cc",
            altText: "Touring Motorcycle 800cc",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "9200.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["motorcycles", "touring", "comfort"],
    productType: "Motorcycles",
    vendor: "BMW",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/12",
            availableForSale: true,
            priceV2: { amount: "9200.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/13",
    title: "Naked Bike 600cc",
    handle: "naked-bike-600cc",
    description: "Naked bike stiilis mootorratas linna ja maantee jaoks.",
    descriptionHtml: "<p>Naked bike stiilis mootorratas linna ja maantee jaoks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Naked+600cc",
            altText: "Naked Bike 600cc",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "5800.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["motorcycles", "naked", "street"],
    productType: "Motorcycles",
    vendor: "Suzuki",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/13",
            availableForSale: true,
            priceV2: { amount: "5800.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/14",
    title: "Cafe Racer 400cc",
    handle: "cafe-racer-400cc",
    description: "Retro stiilis cafe racer mootorratas. Stiilne ja kiire.",
    descriptionHtml: "<p>Retro stiilis cafe racer mootorratas. Stiilne ja kiire.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Cafe+Racer+400cc",
            altText: "Cafe Racer 400cc",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "4500.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: false,
    tags: ["motorcycles", "cafe-racer", "retro"],
    productType: "Motorcycles",
    vendor: "Royal Enfield",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/14",
            availableForSale: false,
            priceV2: { amount: "4500.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/15",
    title: "Mini Bike 110cc",
    handle: "mini-bike-110cc",
    description: "Väike mootorratas lastele ja algajatele. Turvaline ja lihtne kasutada.",
    descriptionHtml: "<p>Väike mootorratas lastele ja algajatele. Turvaline ja lihtne kasutada.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Mini+Bike+110cc",
            altText: "Mini Bike 110cc",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "1200.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["motorcycles", "mini", "beginner"],
    productType: "Motorcycles",
    vendor: "Apollo",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/15",
            availableForSale: true,
            priceV2: { amount: "1200.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },

  // Parts (15 products)
  {
    id: "gid://shopify/Product/16",
    title: "Mootori Remondi Komplekt",
    handle: "mootori-remondi-komplekt",
    description: "Täielik mootori remondi komplekt kõigi vajalike osadega.",
    descriptionHtml: "<p>Täielik mootori remondi komplekt kõigi vajalike osadega.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Engine+Repair+Kit",
            altText: "Mootori Remondi Komplekt",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "450.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["parts", "engine", "repair"],
    productType: "Parts",
    vendor: "OEM",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/16",
            availableForSale: true,
            priceV2: { amount: "450.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/17",
    title: "Piduriklotside Komplekt",
    handle: "piduriklotside-komplekt",
    description: "Kvaliteetsed piduriklotsid ees- ja tagumistele piduritele.",
    descriptionHtml: "<p>Kvaliteetsed piduriklotsid ees- ja tagumistele piduritele.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Brake+Pads",
            altText: "Piduriklotside Komplekt",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "85.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["parts", "brakes", "safety"],
    productType: "Parts",
    vendor: "Brembo",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/17",
            availableForSale: true,
            priceV2: { amount: "85.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/18",
    title: "Õlifilter",
    handle: "olifilter",
    description: "Kvaliteetne õlifilter mootori kaitseks. Sobib enamikele mudelitele.",
    descriptionHtml: "<p>Kvaliteetne õlifilter mootori kaitseks. Sobib enamikele mudelitele.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Oil+Filter",
            altText: "Õlifilter",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "35.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["parts", "filter", "maintenance"],
    productType: "Parts",
    vendor: "Mann",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/18",
            availableForSale: true,
            priceV2: { amount: "35.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/19",
    title: "Süüteküünalde Komplekt",
    handle: "suutekuunalde-komplekt",
    description: "Kvaliteetsed süüteküünlad parema mootori töö jaoks.",
    descriptionHtml: "<p>Kvaliteetsed süüteküünlad parema mootori töö jaoks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Spark+Plugs",
            altText: "Süüteküünalde Komplekt",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "65.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: false,
    tags: ["parts", "ignition", "engine"],
    productType: "Parts",
    vendor: "NGK",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/19",
            availableForSale: false,
            priceV2: { amount: "65.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/20",
    title: "Keti ja Hammasrattaste Komplekt",
    handle: "keti-ja-hammasrattaste-komplekt",
    description: "Täielik keti ja hammasrattaste komplekt jõuülekandeks.",
    descriptionHtml: "<p>Täielik keti ja hammasrattaste komplekt jõuülekandeks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Chain+Sprocket+Kit",
            altText: "Keti ja Hammasrattaste Komplekt",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "180.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["parts", "chain", "drivetrain"],
    productType: "Parts",
    vendor: "DID",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/20",
            availableForSale: true,
            priceV2: { amount: "180.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/21",
    title: "Õhufiltri Element",
    handle: "ohufiltri-element",
    description: "Õhufiltri element puhta õhu tagamiseks mootorile.",
    descriptionHtml: "<p>Õhufiltri element puhta õhu tagamiseks mootorile.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Air+Filter",
            altText: "Õhufiltri Element",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "45.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["parts", "filter", "air"],
    productType: "Parts",
    vendor: "K&N",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/21",
            availableForSale: true,
            priceV2: { amount: "45.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/22",
    title: "Kütusepump",
    handle: "kutusepump",
    description: "Elektriline kütusepump kütuse tarnimiseks mootorile.",
    descriptionHtml: "<p>Elektriline kütusepump kütuse tarnimiseks mootorile.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Fuel+Pump",
            altText: "Kütusepump",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "220.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["parts", "fuel", "pump"],
    productType: "Parts",
    vendor: "Bosch",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/22",
            availableForSale: true,
            priceV2: { amount: "220.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/23",
    title: "Starteri Mootor",
    handle: "starteri-mootor",
    description: "Elektriline starteri mootor mootori käivitamiseks.",
    descriptionHtml: "<p>Elektriline starteri mootor mootori käivitamiseks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Starter+Motor",
            altText: "Starteri Mootor",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "320.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: false,
    tags: ["parts", "starter", "electrical"],
    productType: "Parts",
    vendor: "Denso",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/23",
            availableForSale: false,
            priceV2: { amount: "320.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/24",
    title: "Generaator",
    handle: "generaator",
    description: "Generaator elektri tootmiseks mootorratta töö ajal.",
    descriptionHtml: "<p>Generaator elektri tootmiseks mootorratta töö ajal.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Generator",
            altText: "Generaator",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "280.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["parts", "generator", "electrical"],
    productType: "Parts",
    vendor: "Valeo",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/24",
            availableForSale: true,
            priceV2: { amount: "280.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/25",
    title: "Karburaatori Komplekt",
    handle: "karburaatori-komplekt",
    description: "Täielik karburaatori remondi komplekt.",
    descriptionHtml: "<p>Täielik karburaatori remondi komplekt.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Carburetor+Kit",
            altText: "Karburaatori Komplekt",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "95.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["parts", "carburetor", "fuel"],
    productType: "Parts",
    vendor: "Mikuni",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/25",
            availableForSale: true,
            priceV2: { amount: "95.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/26",
    title: "Kütusevoolik",
    handle: "kutusevoolik",
    description: "Kvaliteetne kütusevoolik kütuse transportimiseks.",
    descriptionHtml: "<p>Kvaliteetne kütusevoolik kütuse transportimiseks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Fuel+Hose",
            altText: "Kütusevoolik",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "25.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["parts", "fuel", "hose"],
    productType: "Parts",
    vendor: "Gates",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/26",
            availableForSale: true,
            priceV2: { amount: "25.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/27",
    title: "Piduri Kettad",
    handle: "piduri-kettad",
    description: "Kvaliteetsed piduri kettad parema pidurduse jaoks.",
    descriptionHtml: "<p>Kvaliteetsed piduri kettad parema pidurduse jaoks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Brake+Discs",
            altText: "Piduri Kettad",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "150.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["parts", "brakes", "discs"],
    productType: "Parts",
    vendor: "EBC",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/27",
            availableForSale: true,
            priceV2: { amount: "150.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/28",
    title: "Amortisaatori Vedrud",
    handle: "amortisaatori-vedrud",
    description: "Amortisaatori vedrud parema sõidukomfordi jaoks.",
    descriptionHtml: "<p>Amortisaatori vedrud parema sõidukomfordi jaoks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Shock+Springs",
            altText: "Amortisaatori Vedrud",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "120.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: false,
    tags: ["parts", "suspension", "springs"],
    productType: "Parts",
    vendor: "Ohlins",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/28",
            availableForSale: false,
            priceV2: { amount: "120.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/29",
    title: "Roolipea Laagrid",
    handle: "roolipea-laagrid",
    description: "Roolipea laagrid sujuva juhtimise jaoks.",
    descriptionHtml: "<p>Roolipea laagrid sujuva juhtimise jaoks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Steering+Bearings",
            altText: "Roolipea Laagrid",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "75.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["parts", "steering", "bearings"],
    productType: "Parts",
    vendor: "SKF",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/29",
            availableForSale: true,
            priceV2: { amount: "75.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/30",
    title: "Kütusekraan",
    handle: "kutusekraan",
    description: "Kütusekraan kütuse voo kontrollimiseks.",
    descriptionHtml: "<p>Kütusekraan kütuse voo kontrollimiseks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Fuel+Tap",
            altText: "Kütusekraan",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "55.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["parts", "fuel", "tap"],
    productType: "Parts",
    vendor: "Petcock",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/30",
            availableForSale: true,
            priceV2: { amount: "55.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },

  // Accessories (10 products)
  {
    id: "gid://shopify/Product/31",
    title: "LED Esituli",
    handle: "led-esituli",
    description: "Võimas LED esituli parema nähtavuse jaoks.",
    descriptionHtml: "<p>Võimas LED esituli parema nähtavuse jaoks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=LED+Headlight",
            altText: "LED Esituli",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "120.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["accessories", "lighting", "led"],
    productType: "Accessories",
    vendor: "Philips",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/31",
            availableForSale: true,
            priceV2: { amount: "120.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/32",
    title: "Peeglite Komplekt",
    handle: "peeglite-komplekt",
    description: "Kvaliteetsed peeglid parema tagantvaate jaoks.",
    descriptionHtml: "<p>Kvaliteetsed peeglid parema tagantvaate jaoks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Mirror+Set",
            altText: "Peeglite Komplekt",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "45.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["accessories", "mirrors", "safety"],
    productType: "Accessories",
    vendor: "Rizoma",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/32",
            availableForSale: true,
            priceV2: { amount: "45.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/33",
    title: "Bluetooth Kõlarid",
    handle: "bluetooth-kolarid",
    description: "Veekindlad Bluetooth kõlarid muusika kuulamiseks sõidu ajal.",
    descriptionHtml: "<p>Veekindlad Bluetooth kõlarid muusika kuulamiseks sõidu ajal.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Bluetooth+Speakers",
            altText: "Bluetooth Kõlarid",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "95.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: false,
    tags: ["accessories", "audio", "bluetooth"],
    productType: "Accessories",
    vendor: "JBL",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/33",
            availableForSale: false,
            priceV2: { amount: "95.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/34",
    title: "USB Laadija",
    handle: "usb-laadija",
    description: "Veekindel USB laadija telefoni ja seadmete laadimiseks.",
    descriptionHtml: "<p>Veekindel USB laadija telefoni ja seadmete laadimiseks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=USB+Charger",
            altText: "USB Laadija",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "55.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["accessories", "charger", "usb"],
    productType: "Accessories",
    vendor: "RAM Mounts",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/34",
            availableForSale: true,
            priceV2: { amount: "55.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/35",
    title: "Telefoni Hoidik",
    handle: "telefoni-hoidik",
    description: "Tugev telefoni hoidik navigatsiooni jaoks.",
    descriptionHtml: "<p>Tugev telefoni hoidik navigatsiooni jaoks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Phone+Mount",
            altText: "Telefoni Hoidik",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "35.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["accessories", "phone", "mount"],
    productType: "Accessories",
    vendor: "Quad Lock",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/35",
            availableForSale: true,
            priceV2: { amount: "35.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/36",
    title: "Pagasikonteiner",
    handle: "pagasikonteiner",
    description: "Veekindel pagasikonteiner asjade transportimiseks.",
    descriptionHtml: "<p>Veekindel pagasikonteiner asjade transportimiseks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Cargo+Box",
            altText: "Pagasikonteiner",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "180.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["accessories", "cargo", "storage"],
    productType: "Accessories",
    vendor: "Givi",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/36",
            availableForSale: true,
            priceV2: { amount: "180.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/37",
    title: "Tuuletõke",
    handle: "tuuletoke",
    description: "Läbipaistev tuuletõke tuule eest kaitsmiseks.",
    descriptionHtml: "<p>Läbipaistev tuuletõke tuule eest kaitsmiseks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Windscreen",
            altText: "Tuuletõke",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "85.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: false,
    tags: ["accessories", "windscreen", "protection"],
    productType: "Accessories",
    vendor: "Puig",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/37",
            availableForSale: false,
            priceV2: { amount: "85.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/38",
    title: "Käepidemete Katteid",
    handle: "kaepidemete-katteid",
    description: "Mugavad käepidemete katted parema haarde jaoks.",
    descriptionHtml: "<p>Mugavad käepidemete katted parema haarde jaoks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Grip+Covers",
            altText: "Käepidemete Katteid",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "25.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["accessories", "grips", "comfort"],
    productType: "Accessories",
    vendor: "ODI",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/38",
            availableForSable: true,
            priceV2: { amount: "25.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/39",
    title: "Tagumised Vilkurid",
    handle: "tagumised-vilkurid",
    description: "LED tagumised vilkurid parema nähtavuse jaoks.",
    descriptionHtml: "<p>LED tagumised vilkurid parema nähtavuse jaoks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Rear+Indicators",
            altText: "Tagumised Vilkurid",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "65.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["accessories", "indicators", "lighting"],
    productType: "Accessories",
    vendor: "Kellermann",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/39",
            availableForSale: true,
            priceV2: { amount: "65.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/40",
    title: "Mootorratta Kate",
    handle: "mootorratta-kate",
    description: "Veekindel kate mootorratta kaitsmiseks ilmastiku eest.",
    descriptionHtml: "<p>Veekindel kate mootorratta kaitsmiseks ilmastiku eest.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Motorcycle+Cover",
            altText: "Mootorratta Kate",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "75.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["accessories", "cover", "protection"],
    productType: "Accessories",
    vendor: "Oxford",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/40",
            availableForSale: true,
            priceV2: { amount: "75.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },

  // Gear (10 products)
  {
    id: "gid://shopify/Product/41",
    title: "Premium Kiiver",
    handle: "premium-kiiver",
    description: "Kvaliteetne kiiver maksimaalse kaitse jaoks. DOT ja ECE sertifikaadiga.",
    descriptionHtml: "<p>Kvaliteetne kiiver maksimaalse kaitse jaoks. DOT ja ECE sertifikaadiga.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Premium+Helmet",
            altText: "Premium Kiiver",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "280.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["gear", "helmet", "safety"],
    productType: "Gear",
    vendor: "Shoei",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/41",
            availableForSale: true,
            priceV2: { amount: "280.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/42",
    title: "Nahast Jakk",
    handle: "nahast-jakk",
    description: "Kvaliteetne nahast mootorratturi jakk kaitse ja stiili jaoks.",
    descriptionHtml: "<p>Kvaliteetne nahast mootorratturi jakk kaitse ja stiili jaoks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Leather+Jacket",
            altText: "Nahast Jakk",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "350.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["gear", "jacket", "leather"],
    productType: "Gear",
    vendor: "Dainese",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/42",
            availableForSale: true,
            priceV2: { amount: "350.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/43",
    title: "Sõrmkindad",
    handle: "sormkindad",
    description: "Kaitsevad sõrmkindad mugava ja turvalise sõidu jaoks.",
    descriptionHtml: "<p>Kaitsevad sõrmkindad mugava ja turvalise sõidu jaoks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Gloves",
            altText: "Sõrmkindad",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "75.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: false,
    tags: ["gear", "gloves", "protection"],
    productType: "Gear",
    vendor: "Alpinestars",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/43",
            availableForSale: false,
            priceV2: { amount: "75.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/44",
    title: "Mootorratta Saapad",
    handle: "mootorratta-saapad",
    description: "Tugevad ja mugavad mootorratta saapad jalakaitsmeks.",
    descriptionHtml: "<p>Tugevad ja mugavad mootorratta saapad jalakaitsmeks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Motorcycle+Boots",
            altText: "Mootorratta Saapad",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "180.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["gear", "boots", "protection"],
    productType: "Gear",
    vendor: "TCX",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/44",
            availableForSale: true,
            priceV2: { amount: "180.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/45",
    title: "Võidusõidu Vest",
    handle: "voidusoiduest",
    description: "Professionaalne võidusõidu vest maksimaalse kaitse jaoks.",
    descriptionHtml: "<p>Professionaalne võidusõidu vest maksimaalse kaitse jaoks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Racing+Vest",
            altText: "Võidusõidu Vest",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "420.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["gear", "vest", "racing"],
    productType: "Gear",
    vendor: "Fox Racing",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/45",
            availableForSale: true,
            priceV2: { amount: "420.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/46",
    title: "Kaitsepüksid",
    handle: "kaitsepuksid",
    description: "Kaitsepüksid põlvede ja puusade kaitsmiseks.",
    descriptionHtml: "<p>Kaitsepüksid põlvede ja puusade kaitsmiseks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Protective+Pants",
            altText: "Kaitsepüksid",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "220.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["gear", "pants", "protection"],
    productType: "Gear",
    vendor: "Rev'it",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/46",
            availableForSale: true,
            priceV2: { amount: "220.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/47",
    title: "Seljakaitse",
    handle: "seljakaitse",
    description: "Ergonoomilne seljakaitse selgroo kaitsmiseks.",
    descriptionHtml: "<p>Ergonoomilne seljakaitse selgroo kaitsmiseks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Back+Protector",
            altText: "Seljakaitse",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "150.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: false,
    tags: ["gear", "back", "protection"],
    productType: "Gear",
    vendor: "Forcefield",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/47",
            availableForSale: false,
            priceV2: { amount: "150.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/48",
    title: "Põlvekaitsmed",
    handle: "polvekaitsmed",
    description: "Kerged ja tugevad põlvekaitsmed.",
    descriptionHtml: "<p>Kerged ja tugevad põlvekaitsmed.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Knee+Guards",
            altText: "Põlvekaitsmed",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "85.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["gear", "knee", "protection"],
    productType: "Gear",
    vendor: "POC",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/48",
            availableForSale: true,
            priceV2: { amount: "85.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/49",
    title: "Vihmariided",
    handle: "vihmariided",
    description: "Veekindlad vihmariided märja ilma jaoks.",
    descriptionHtml: "<p>Veekindlad vihmariided märja ilma jaoks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Rain+Gear",
            altText: "Vihmariided",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "120.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["gear", "rain", "waterproof"],
    productType: "Gear",
    vendor: "Held",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/49",
            availableForSale: true,
            priceV2: { amount: "120.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/50",
    title: "Termoriided",
    handle: "termoriided",
    description: "Soojad termoriided külma ilma jaoks.",
    descriptionHtml: "<p>Soojad termoriided külma ilma jaoks.</p>",
    images: {
      edges: [
        {
          node: {
            url: "/placeholder.svg?height=400&width=400&text=Thermal+Wear",
            altText: "Termoriided",
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: "95.00",
        currencyCode: "EUR",
      },
    },
    availableForSale: true,
    tags: ["gear", "thermal", "warm"],
    productType: "Gear",
    vendor: "Merino",
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/50",
            availableForSale: true,
            priceV2: { amount: "95.00", currencyCode: "EUR" },
          },
        },
      ],
    },
  },
]

const fallbackCollections = [
  {
    id: "gid://shopify/Collection/1",
    title: "Mootorrattad",
    handle: "mootorrattad",
    description: "Kõik meie mootorrattad alates algajate mudelitest kuni professionaalsete võidusõidu masinateni.",
    products: {
      edges: fallbackProducts.filter((p) => p.productType === "Motorcycles").map((product) => ({ node: product })),
    },
  },
  {
    id: "gid://shopify/Collection/2",
    title: "Varuosad",
    handle: "varuosad",
    description: "Kvaliteetsed varuosad ja komponendid mootorratta hoolduseks ja remondiks.",
    products: {
      edges: fallbackProducts.filter((p) => p.productType === "Parts").map((product) => ({ node: product })),
    },
  },
  {
    id: "gid://shopify/Collection/3",
    title: "Aksessuaarid",
    handle: "aksessuaarid",
    description: "Kasulikud aksessuaarid mootorratta täiustamiseks ja mugavuse suurendamiseks.",
    products: {
      edges: fallbackProducts.filter((p) => p.productType === "Accessories").map((product) => ({ node: product })),
    },
  },
  {
    id: "gid://shopify/Collection/4",
    title: "Varustus",
    handle: "varustus",
    description: "Turvavarustus ja rõivad ohutuks ja mugavaks sõiduks.",
    products: {
      edges: fallbackProducts.filter((p) => p.productType === "Gear").map((product) => ({ node: product })),
    },
  },
]

export async function getProducts(limit = 10) {
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
            variants(first: 1) {
              edges {
                node {
                  id
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

  const response = await shopifyFetch(query, { first: limit })

  if (!response?.data?.products) {
    console.warn("Using fallback product data")
    return fallbackProducts.slice(0, limit)
  }

  return response.data.products.edges.map((edge: any) => edge.node)
}

export async function getCollections(limit = 10) {
  const query = `
    query getCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            products(first: 10) {
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

  const response = await shopifyFetch(query, { first: limit })

  if (!response?.data?.collections) {
    console.warn("Using fallback collection data")
    return fallbackCollections.slice(0, limit)
  }

  return response.data.collections.edges.map((edge: any) => edge.node)
}

export async function getProduct(handle: string) {
  return getProductByHandle(handle)
}

export async function getProductByHandle(handle: string) {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
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
  `

  const response = await shopifyFetch(query, { handle })

  if (!response?.data?.product) {
    console.warn(`Using fallback data for product: ${handle}`)
    return fallbackProducts.find((p) => p.handle === handle) || fallbackProducts[0]
  }

  return response.data.product
}

export async function getCollection(handle: string) {
  const query = `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        id
        title
        handle
        description
        products(first: 50) {
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

  const response = await shopifyFetch(query, { handle })

  if (!response?.data?.collection) {
    console.warn(`Using fallback data for collection: ${handle}`)
    return fallbackCollections.find((c) => c.handle === handle) || fallbackCollections[0]
  }

  return response.data.collection
}
