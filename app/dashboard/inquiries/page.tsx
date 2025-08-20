import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, ArrowLeft, MessageSquare, Clock, DollarSign } from "lucide-react"
import Link from "next/link"

export default async function InquiriesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile to determine if buyer or seller
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    redirect("/auth/login")
  }

  // Fetch inquiries based on user type
  const { data: inquiries } = await supabase
    .from("inquiries")
    .select(`
      *,
      products (
        title,
        price,
        currency
      ),
      profiles:${profile.user_type === "buyer" ? "seller_id" : "buyer_id"} (
        company_name,
        full_name,
        verified
      )
    `)
    .eq(profile.user_type === "buyer" ? "buyer_id" : "seller_id", user.id)
    .order("created_at", { ascending: false })

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
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/profile">Profile</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-space-grotesk mb-2">My Inquiries</h1>
          <p className="text-muted-foreground">
            {profile.user_type === "buyer"
              ? "Track your product inquiries and supplier responses"
              : "Manage buyer inquiries and respond to potential customers"}
          </p>
        </div>

        {/* Inquiries List */}
        {inquiries && inquiries.length > 0 ? (
          <div className="space-y-6">
            {inquiries.map((inquiry) => (
              <Card key={inquiry.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="font-space-grotesk text-lg">{inquiry.products?.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {profile.user_type === "buyer" ? "To: " : "From: "}
                        {inquiry.profiles?.company_name || inquiry.profiles?.full_name}
                        {inquiry.profiles?.verified && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            Verified
                          </Badge>
                        )}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        inquiry.status === "pending"
                          ? "secondary"
                          : inquiry.status === "responded"
                            ? "default"
                            : inquiry.status === "negotiating"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {inquiry.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Message:</h4>
                      <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">{inquiry.message}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      {inquiry.quantity && (
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Quantity</p>
                            <p className="text-muted-foreground">{inquiry.quantity} units</p>
                          </div>
                        </div>
                      )}

                      {inquiry.target_price && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Target Price</p>
                            <p className="text-muted-foreground">
                              ${inquiry.target_price} {inquiry.currency}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Sent</p>
                          <p className="text-muted-foreground">{new Date(inquiry.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button size="sm" asChild>
                        <Link href={`/products/${inquiry.product_id}`}>View Product</Link>
                      </Button>
                      {profile.user_type === "seller" && inquiry.status === "pending" && (
                        <Button size="sm" variant="outline">
                          Respond
                        </Button>
                      )}
                      {inquiry.status === "negotiating" && (
                        <Button size="sm" variant="outline">
                          Continue Chat
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold font-space-grotesk mb-2">No inquiries yet</h3>
            <p className="text-muted-foreground mb-6">
              {profile.user_type === "buyer"
                ? "Start by browsing products and contacting suppliers"
                : "Buyers will contact you about your products"}
            </p>
            {profile.user_type === "buyer" ? (
              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/dashboard/products/new">Add Products</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
