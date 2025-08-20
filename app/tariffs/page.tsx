import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Globe, Search, TrendingUp, AlertCircle, Info, Calculator } from "lucide-react"
import Link from "next/link"

export default async function TariffsPage() {
  const supabase = await createClient()

  // Fetch recent tariff data
  const { data: tariffs } = await supabase
    .from("tariffs")
    .select("*")
    .order("last_updated", { ascending: false })
    .limit(20)

  // Get unique countries for filters
  const { data: countries } = await supabase.from("tariffs").select("origin_country, destination_country")

  const uniqueOriginCountries = [...new Set(countries?.map((c) => c.origin_country) || [])]
  const uniqueDestinationCountries = [...new Set(countries?.map((c) => c.destination_country) || [])]

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
            <Link href="/products" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/tariffs" className="text-primary font-medium">
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
          <h1 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">Global Tariff Information Center</h1>
          <p className="text-xl text-muted-foreground">Access real-time tariff rates and trade regulations worldwide</p>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="font-space-grotesk">Real-Time Rates</CardTitle>
              <CardDescription>Up-to-date tariff information from official sources</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Calculator className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="font-space-grotesk">Duty Calculator</CardTitle>
              <CardDescription>Calculate total import costs including duties and taxes</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <AlertCircle className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="font-space-grotesk">Trade Alerts</CardTitle>
              <CardDescription>Get notified of tariff changes affecting your products</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-space-grotesk">Search Tariff Rates</CardTitle>
            <CardDescription>Find tariff information by HS code, product, or country</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Search by HS code or product description..." className="pl-10" />
                </div>
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Origin Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {uniqueOriginCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Destination Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {uniqueDestinationCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Trade Agreement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agreements</SelectItem>
                    <SelectItem value="MFN">Most Favored Nation</SelectItem>
                    <SelectItem value="USMCA">USMCA</SelectItem>
                    <SelectItem value="GSP">GSP</SelectItem>
                    <SelectItem value="FTA">Free Trade Agreement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tariff Data Table */}
        <Card>
          <CardHeader>
            <CardTitle className="font-space-grotesk">Latest Tariff Information</CardTitle>
            <CardDescription>Recently updated tariff rates and trade information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>HS Code</TableHead>
                    <TableHead>Product Description</TableHead>
                    <TableHead>Origin</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Tariff Rate</TableHead>
                    <TableHead>Additional Duties</TableHead>
                    <TableHead>Trade Agreement</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tariffs?.map((tariff) => (
                    <TableRow key={tariff.id}>
                      <TableCell className="font-mono text-sm">{tariff.hs_code}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="line-clamp-2">{tariff.product_description}</div>
                      </TableCell>
                      <TableCell>{tariff.origin_country}</TableCell>
                      <TableCell>{tariff.destination_country}</TableCell>
                      <TableCell>
                        <Badge variant={tariff.tariff_rate > 0 ? "destructive" : "secondary"}>
                          {tariff.tariff_rate}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {tariff.additional_duties > 0 ? (
                          <Badge variant="destructive">{tariff.additional_duties}%</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{tariff.trade_agreement}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(tariff.last_updated).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <Info className="h-6 w-6 text-primary mb-2" />
              <CardTitle className="font-space-grotesk">Understanding Tariff Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>MFN (Most Favored Nation):</strong> Standard tariff rate applied to WTO members
                </div>
                <div>
                  <strong>FTA (Free Trade Agreement):</strong> Preferential rates under bilateral/multilateral
                  agreements
                </div>
                <div>
                  <strong>GSP (Generalized System of Preferences):</strong> Reduced rates for developing countries
                </div>
                <div>
                  <strong>Section 301/232:</strong> Additional duties imposed for trade protection measures
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Calculator className="h-6 w-6 text-primary mb-2" />
              <CardTitle className="font-space-grotesk">Duty Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Calculate your total import costs including tariffs, duties, and taxes.
                </p>
                <Button className="w-full" asChild>
                  <Link href="/tariffs/calculator">
                    <Calculator className="h-4 w-4 mr-2" />
                    Launch Calculator
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <strong>Disclaimer:</strong> Tariff information is provided for reference purposes only. Rates may change
              without notice. Always verify current rates with official customs authorities before making import/export
              decisions. This information should not be considered as legal or professional advice.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
