"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Globe, Calculator, ArrowLeft, Info } from "lucide-react"
import Link from "next/link"

export default function TariffCalculatorPage() {
  const [productValue, setProductValue] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [hsCode, setHsCode] = useState("")
  const [originCountry, setOriginCountry] = useState("")
  const [destinationCountry, setDestinationCountry] = useState("")
  const [tariffRate, setTariffRate] = useState("")
  const [additionalDuties, setAdditionalDuties] = useState("")
  const [results, setResults] = useState<any>(null)

  const calculateDuties = () => {
    const value = Number.parseFloat(productValue) || 0
    const tariff = Number.parseFloat(tariffRate) || 0
    const additional = Number.parseFloat(additionalDuties) || 0

    const tariffAmount = (value * tariff) / 100
    const additionalAmount = (value * additional) / 100
    const totalDuties = tariffAmount + additionalAmount
    const totalCost = value + totalDuties

    setResults({
      productValue: value,
      tariffAmount,
      additionalAmount,
      totalDuties,
      totalCost,
      effectiveRate: ((totalDuties / value) * 100).toFixed(2),
    })
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
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/tariffs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tariffs
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">Import Duty Calculator</h1>
            <p className="text-xl text-muted-foreground">Calculate total import costs including tariffs and duties</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-space-grotesk">Product Information</CardTitle>
                <CardDescription>Enter your product details to calculate import duties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="productValue">Product Value *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="productValue"
                        type="number"
                        step="0.01"
                        placeholder="10000.00"
                        value={productValue}
                        onChange={(e) => setProductValue(e.target.value)}
                        className="flex-1"
                      />
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="CNY">CNY</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="hsCode">HS Code</Label>
                    <Input
                      id="hsCode"
                      placeholder="e.g., 8471.30.01"
                      value={hsCode}
                      onChange={(e) => setHsCode(e.target.value)}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="originCountry">Origin Country *</Label>
                      <Select value={originCountry} onValueChange={setOriginCountry}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="china">China</SelectItem>
                          <SelectItem value="germany">Germany</SelectItem>
                          <SelectItem value="japan">Japan</SelectItem>
                          <SelectItem value="india">India</SelectItem>
                          <SelectItem value="mexico">Mexico</SelectItem>
                          <SelectItem value="vietnam">Vietnam</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="destinationCountry">Destination Country *</Label>
                      <Select value={destinationCountry} onValueChange={setDestinationCountry}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usa">United States</SelectItem>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="eu">European Union</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tariffRate">Tariff Rate (%)</Label>
                      <Input
                        id="tariffRate"
                        type="number"
                        step="0.01"
                        placeholder="7.50"
                        value={tariffRate}
                        onChange={(e) => setTariffRate(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="additionalDuties">Additional Duties (%)</Label>
                      <Input
                        id="additionalDuties"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={additionalDuties}
                        onChange={(e) => setAdditionalDuties(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={calculateDuties} className="w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Import Costs
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle className="font-space-grotesk">Calculation Results</CardTitle>
                <CardDescription>Breakdown of your total import costs</CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Product Value:</span>
                        <span className="font-medium">
                          ${results.productValue.toFixed(2)} {currency}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span>Tariff Amount:</span>
                        <span className="font-medium">
                          ${results.tariffAmount.toFixed(2)} {currency}
                        </span>
                      </div>

                      {results.additionalAmount > 0 && (
                        <div className="flex justify-between">
                          <span>Additional Duties:</span>
                          <span className="font-medium">
                            ${results.additionalAmount.toFixed(2)} {currency}
                          </span>
                        </div>
                      )}

                      <Separator />

                      <div className="flex justify-between">
                        <span>Total Duties:</span>
                        <span className="font-medium text-primary">
                          ${results.totalDuties.toFixed(2)} {currency}
                        </span>
                      </div>

                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Total Import Cost:</span>
                        <span className="font-bold text-primary">
                          ${results.totalCost.toFixed(2)} {currency}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Effective Duty Rate:</span>
                        <span>{results.effectiveRate}%</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-muted-foreground">
                          This calculation is for estimation purposes only. Actual duties may vary based on
                          classification, valuation, and other factors. Consult with customs authorities for official
                          rates.
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Enter product details above to calculate import costs</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="font-space-grotesk">Additional Considerations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Other Potential Costs:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Customs brokerage fees</li>
                    <li>• Port handling charges</li>
                    <li>• Inspection fees</li>
                    <li>• Storage and demurrage</li>
                    <li>• Insurance costs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Factors Affecting Duties:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Product classification (HS code)</li>
                    <li>• Country of origin</li>
                    <li>• Trade agreements</li>
                    <li>• Valuation method</li>
                    <li>• Special programs (GSP, etc.)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
