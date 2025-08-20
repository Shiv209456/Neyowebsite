import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Package, DollarSign } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  title: string
  description: string
  price?: number
  currency?: string
  minimum_order_quantity?: number
  unit?: string
  origin_country?: string
  featured?: boolean
  profiles?: {
    full_name?: string
    company_name?: string
    country?: string
    verified?: boolean
  }
  categories?: {
    name: string
  }
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold font-space-grotesk mb-2">No products found</h3>
        <p className="text-muted-foreground mb-6">Try adjusting your search criteria or browse all categories</p>
        <Button asChild>
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="hover:shadow-lg transition-shadow group">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="font-space-grotesk text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {product.title}
                </CardTitle>
                <CardDescription className="mt-2">
                  by {product.profiles?.company_name || product.profiles?.full_name}
                  {product.profiles?.verified && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Verified
                    </Badge>
                  )}
                </CardDescription>
              </div>
              {product.featured && (
                <Badge variant="default" className="ml-2">
                  Featured
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>

              <div className="flex items-center gap-4 text-sm">
                {product.price && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      ${product.price} {product.currency}
                    </span>
                  </div>
                )}
                {product.minimum_order_quantity && (
                  <div className="flex items-center gap-1">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span>
                      MOQ: {product.minimum_order_quantity} {product.unit}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{product.origin_country || product.profiles?.country}</span>
                </div>
                {product.categories && (
                  <Badge variant="outline" className="text-xs">
                    {product.categories.name}
                  </Badge>
                )}
              </div>

              <div className="pt-2">
                <Button className="w-full group-hover:bg-primary/90 transition-colors" asChild>
                  <Link href={`/products/${product.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
