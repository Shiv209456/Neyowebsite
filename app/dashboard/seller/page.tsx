import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, Package, MessageSquare, TrendingUp, Plus, Eye, Edit } from "lucide-react"
import Link from "next/link"

export default async function SellerDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile || profile.user_type !== "seller") {
    redirect("/dashboard")
  }

  // Fetch seller-specific data
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("seller_id", user.id)
    .order("created_at", { ascending: false })

  const { data: inquiries } = await supabase
    .from("inquiries")
    .select(`
      *,
      products (
        title
      ),
      profiles:buyer_id (
        company_name,
        full_name
      )
    `)
    .eq("seller_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  const activeProducts = products?.filter((p) => p.status === "active").length || 0
  const draftProducts = products?.filter((p) => p.status === "draft").length || 0
  const pendingInquiries = inquiries?.filter((i) => i.status === "pending").length || 0

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
            Seller Dashboard - {profile.company_name || profile.full_name}
          </h1>
          <p className="text-muted-foreground">Manage your products and connect with global buyers</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProducts}</div>
              <p className="text-xs text-muted-foreground">Live listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft Products</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{draftProducts}</div>
              <p className="text-xs text-muted-foreground">Pending publication</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingInquiries}</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
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
                {profile.verified ? "Verified supplier" : "Complete verification"}
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
                <CardDescription>Common tasks for sellers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button className="h-auto p-4 justify-start" asChild>
                    <Link href="/dashboard/products/new">
                      <Plus className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Add New Product</div>
                        <div className="text-xs text-muted-foreground">List your products</div>
                      </div>
                    </Link>
                  </Button>

                  <Button className="h-auto p-4 justify-start bg-transparent" variant="outline" asChild>
                    <Link href="/dashboard/products">
                      <Package className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Manage Products</div>
                        <div className="text-xs text-muted-foreground">Edit existing listings</div>
                      </div>
                    </Link>
                  </Button>

                  <Button className="h-auto p-4 justify-start bg-transparent" variant="outline" asChild>
                    <Link href="/dashboard/inquiries">
                      <MessageSquare className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">View Inquiries</div>
                        <div className="text-xs text-muted-foreground">Respond to buyers</div>
                      </div>
                    </Link>
                  </Button>

                  <Button className="h-auto p-4 justify-start bg-transparent" variant="outline" asChild>
                    <Link href="/dashboard/analytics">
                      <TrendingUp className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Analytics</div>
                        <div className="text-xs text-muted-foreground">View performance</div>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Products */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-space-grotesk">Recent Products</CardTitle>
                    <CardDescription>Your latest product listings</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/products">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {products && products.length > 0 ? (
                  <div className="space-y-4">
                    {products.slice(0, 3).map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{product.title}</h4>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              variant={
                                product.status === "active"
                                  ? "default"
                                  : product.status === "draft"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {product.status}
                            </Badge>
                            {product.featured && <Badge variant="default">Featured</Badge>}
                            <span className="text-xs text-muted-foreground">
                              {new Date(product.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/products/${product.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No products yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start by adding your first product to the marketplace
                    </p>
                    <Button asChild>
                      <Link href="/dashboard/products/new">Add Product</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Inquiries */}
            <Card>
              <CardHeader>
                <CardTitle className="font-space-grotesk">Recent Inquiries</CardTitle>
                <CardDescription>Latest buyer inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                {inquiries && inquiries.length > 0 ? (
                  <div className="space-y-3">
                    {inquiries.slice(0, 3).map((inquiry) => (
                      <div key={inquiry.id} className="border rounded-lg p-3">
                        <h4 className="font-medium text-sm line-clamp-1 mb-1">{inquiry.products?.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          From: {inquiry.profiles?.company_name || inquiry.profiles?.full_name}
                        </p>
                        <div className="flex items-center justify-between">
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
                          <Button size="sm" variant="outline">
                            Reply
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No inquiries yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Performance Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="font-space-grotesk">Performance Tips</CardTitle>
                <CardDescription>Improve your listing visibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Complete your profile</p>
                      <p className="text-xs text-muted-foreground">Add company details and verification</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Add product images</p>
                      <p className="text-xs text-muted-foreground">High-quality photos increase inquiries</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Respond quickly</p>
                      <p className="text-xs text-muted-foreground">Fast responses improve your rating</p>
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
