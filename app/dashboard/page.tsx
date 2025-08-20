import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, Package, MessageSquare, TrendingUp, Search, Eye, Clock } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    redirect("/auth/login")
  }

  // Redirect based on user type
  if (profile.user_type === "seller") {
    redirect("/dashboard/seller")
  }

  // Fetch buyer-specific data
  const { data: recentInquiries } = await supabase
    .from("inquiries")
    .select(`
      *,
      products (
        title,
        price,
        currency
      ),
      profiles:seller_id (
        company_name,
        full_name
      )
    `)
    .eq("buyer_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  // Fetch recommended products (simplified - could be based on user behavior)
  const { data: recommendedProducts } = await supabase
    .from("products")
    .select(`
      *,
      profiles:seller_id (
        company_name,
        full_name,
        country,
        verified
      ),
      categories (
        name
      )
    `)
    .eq("status", "active")
    .eq("featured", true)
    .limit(6)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-space-grotesk">GlobalTrade Solutions</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/tariffs">Tariffs</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/profile">Profile</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-space-grotesk mb-2">
            Welcome back, {profile.full_name || profile.company_name}
          </h1>
          <p className="text-muted-foreground">Discover new products and manage your import activities</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentInquiries?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Pending responses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">In watchlist</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Market Alerts</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Price changes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Status</CardTitle>
              <Badge variant={profile.verified ? "default" : "secondary"}>
                {profile.verified ? "Verified" : "Pending"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {profile.verified ? "Account verified" : "Complete verification"}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="font-space-grotesk">Quick Actions</CardTitle>
                <CardDescription>Common tasks for buyers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button className="h-auto p-4 justify-start bg-transparent" variant="outline" asChild>
                    <Link href="/products">
                      <Search className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Browse Products</div>
                        <div className="text-xs text-muted-foreground">Find suppliers worldwide</div>
                      </div>
                    </Link>
                  </Button>

                  <Button className="h-auto p-4 justify-start bg-transparent" variant="outline" asChild>
                    <Link href="/tariffs/calculator">
                      <TrendingUp className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Calculate Duties</div>
                        <div className="text-xs text-muted-foreground">Estimate import costs</div>
                      </div>
                    </Link>
                  </Button>

                  <Button className="h-auto p-4 justify-start bg-transparent" variant="outline" asChild>
                    <Link href="/dashboard/inquiries">
                      <MessageSquare className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">My Inquiries</div>
                        <div className="text-xs text-muted-foreground">Track communications</div>
                      </div>
                    </Link>
                  </Button>

                  <Button className="h-auto p-4 justify-start bg-transparent" variant="outline" asChild>
                    <Link href="/dashboard/watchlist">
                      <Package className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Watchlist</div>
                        <div className="text-xs text-muted-foreground">Saved products</div>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Inquiries */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-space-grotesk">Recent Inquiries</CardTitle>
                    <CardDescription>Your latest product inquiries and responses</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/inquiries">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {recentInquiries && recentInquiries.length > 0 ? (
                  <div className="space-y-4">
                    {recentInquiries.map((inquiry) => (
                      <div key={inquiry.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{inquiry.products?.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            To: {inquiry.profiles?.company_name || inquiry.profiles?.full_name}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              variant={
                                inquiry.status === "pending"
                                  ? "secondary"
                                  : inquiry.status === "responded"
                                    ? "default"
                                    : "outline"
                              }
                            >
                              {inquiry.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(inquiry.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No inquiries yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start by browsing products and contacting suppliers
                    </p>
                    <Button asChild>
                      <Link href="/products">Browse Products</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recommended Products */}
            <Card>
              <CardHeader>
                <CardTitle className="font-space-grotesk">Featured Products</CardTitle>
                <CardDescription>Trending products from verified suppliers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedProducts?.slice(0, 3).map((product) => (
                    <div key={product.id} className="border rounded-lg p-3">
                      <h4 className="font-medium text-sm line-clamp-2 mb-2">{product.title}</h4>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>{product.profiles?.company_name}</span>
                        {product.profiles?.verified && <Badge variant="secondary">Verified</Badge>}
                      </div>
                      {product.price && (
                        <div className="text-sm font-medium mb-2">
                          ${product.price} {product.currency}
                        </div>
                      )}
                      <Button size="sm" className="w-full" asChild>
                        <Link href={`/products/${product.id}`}>View Details</Link>
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                  <Link href="/products">View All Products</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Market Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="font-space-grotesk">Market Updates</CardTitle>
                <CardDescription>Latest trade news and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">New tariff rates effective</p>
                      <p className="text-xs text-muted-foreground">Electronics from China - Updated rates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Price alert triggered</p>
                      <p className="text-xs text-muted-foreground">Textile products - 15% price decrease</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">New suppliers available</p>
                      <p className="text-xs text-muted-foreground">Verified suppliers in your categories</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
