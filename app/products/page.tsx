import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import Link from "next/link"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"

interface SearchParams {
  search?: string
  category?: string
  country?: string
  minPrice?: string
  maxPrice?: string
  verified?: string
  featured?: string
}

interface ProductsPageProps {
  searchParams: Promise<SearchParams>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const supabase = await createClient()

  // Build query based on search parameters
  let query = supabase
    .from("products")
    .select(`
      *,
      profiles:seller_id (
        full_name,
        company_name,
        country,
        verified
      ),
      categories (
        name
      )
    `)
    .eq("status", "active")

  // Apply search filter
  if (params.search) {
    query = query.or(
      `title.ilike.%${params.search}%,description.ilike.%${params.search}%,hs_code.ilike.%${params.search}%`,
    )
  }

  // Apply category filter
  if (params.category && params.category !== "all") {
    query = query.eq("category_id", params.category)
  }

  // Apply country filter
  if (params.country && params.country !== "all") {
    query = query.or(`origin_country.ilike.%${params.country}%,profiles.country.ilike.%${params.country}%`)
  }

  // Apply price filters
  if (params.minPrice) {
    query = query.gte("price", Number.parseFloat(params.minPrice))
  }
  if (params.maxPrice) {
    query = query.lte("price", Number.parseFloat(params.maxPrice))
  }

  // Apply verified filter
  if (params.verified === "true") {
    query = query.eq("profiles.verified", true)
  }

  // Apply featured filter
  if (params.featured === "true") {
    query = query.eq("featured", true)
  }

  // Execute query with ordering
  const { data: products } = await query.order("created_at", { ascending: false })

  // Fetch categories for filter
  const { data: categories } = await supabase.from("categories").select("*").order("name")

  // Get unique countries for filter
  const { data: countryData } = await supabase
    .from("products")
    .select("origin_country, profiles!seller_id(country)")
    .eq("status", "active")

  const uniqueCountries = [
    ...new Set([
      ...(countryData?.map((p) => p.origin_country).filter(Boolean) || []),
      ...(countryData?.map((p) => p.profiles?.country).filter(Boolean) || []),
    ]),
  ].sort()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-space-grotesk">GlobalTrade Solutions</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-primary font-medium">
              Products
            </Link>
            <Link href="/tariffs" className="text-foreground hover:text-primary transition-colors">
              Tariffs
            </Link>
            <Button variant="outline" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Join Marketplace</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">Global Product Marketplace</h1>
          <p className="text-xl text-muted-foreground">
            Discover products from verified suppliers worldwide
            {products && ` • ${products.length} products found`}
          </p>
        </div>

        <ProductFilters categories={categories || []} countries={uniqueCountries} currentParams={params} />

        <ProductGrid products={products || []} />
      </div>
    </div>
  )
}
