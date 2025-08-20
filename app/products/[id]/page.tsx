import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Globe, MapPin, Package, DollarSign, Truck, Shield, Mail, Building, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch product with seller information
  const { data: product } = await supabase
    .from("products")
    .select(`
      *,
      profiles:seller_id (
        id,
        full_name,
        company_name,
        country,
        city,
        phone,
        website,
        description,
        verified
      ),
      categories (
        name
      )
    `)
    .eq("id", id)
    .eq("status", "active")
    .single()

  if (!product) {
    notFound()
  }

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
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-space-grotesk mb-2">{product.title}</CardTitle>
                    <CardDescription className="text-base">
                      {product.categories?.name && (
                        <Badge variant="outline" className="mr-2">
                          {product.categories.name}
                        </Badge>
                      )}
                      {product.hs_code && <Badge variant="secondary">HS Code: {product.hs_code}</Badge>}
                    </CardDescription>
                  </div>
                  {product.featured && <Badge variant="default">Featured</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-4">
                    {product.price && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Price</p>
                          <p className="text-sm text-muted-foreground">
                            ${product.price} {product.currency}
                          </p>
                        </div>
                      </div>
                    )}

                    {product.minimum_order_quantity && (
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Minimum Order</p>
                          <p className="text-sm text-muted-foreground">
                            {product.minimum_order_quantity} {product.unit}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Origin</p>
                        <p className="text-sm text-muted-foreground">
                          {product.origin_country || product.profiles?.country}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Shipping</p>
                        <p className="text-sm text-muted-foreground">Worldwide</p>
                      </div>
                    </div>
                  </div>

                  {product.specifications && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold font-space-grotesk mb-3">Specifications</h3>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <pre className="text-sm whitespace-pre-wrap">
                            {JSON.stringify(product.specifications, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Seller Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-space-grotesk">Supplier Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{product.profiles?.company_name || product.profiles?.full_name}</p>
                      {product.profiles?.verified && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          Verified Supplier
                        </Badge>
                      )}
                    </div>
                  </div>

                  {product.profiles?.country && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {product.profiles.city && `${product.profiles.city}, `}
                          {product.profiles.country}
                        </p>
                      </div>
                    </div>
                  )}

                  {product.profiles?.description && (
                    <div>
                      <p className="text-sm text-muted-foreground">{product.profiles.description}</p>
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-3">
                    <Button className="w-full" asChild>
                      <Link href="/auth/login">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Supplier
                      </Link>
                    </Button>

                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/auth/login">Request Quote</Link>
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Trade Assurance Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Products */}
            <Card>
              <CardHeader>
                <CardTitle className="font-space-grotesk">Related Products</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">More products from this supplier coming soon...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
