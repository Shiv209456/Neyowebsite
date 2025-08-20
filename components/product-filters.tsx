"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X, SlidersHorizontal } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface ProductFiltersProps {
  categories: Array<{ id: string; name: string }>
  countries: string[]
  currentParams: {
    search?: string
    category?: string
    country?: string
    minPrice?: string
    maxPrice?: string
    verified?: string
    featured?: string
  }
}

export function ProductFilters({ categories, countries, currentParams }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const [filters, setFilters] = useState({
    search: currentParams.search || "",
    category: currentParams.category || "all",
    country: currentParams.country || "all",
    minPrice: currentParams.minPrice || "",
    maxPrice: currentParams.maxPrice || "",
    verified: currentParams.verified === "true",
    featured: currentParams.featured === "true",
  })

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (filters.search) params.set("search", filters.search)
    if (filters.category !== "all") params.set("category", filters.category)
    if (filters.country !== "all") params.set("country", filters.country)
    if (filters.minPrice) params.set("minPrice", filters.minPrice)
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice)
    if (filters.verified) params.set("verified", "true")
    if (filters.featured) params.set("featured", "true")

    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "all",
      country: "all",
      minPrice: "",
      maxPrice: "",
      verified: false,
      featured: false,
    })
    router.push("/products")
  }

  const activeFiltersCount = Object.entries(currentParams).filter(
    ([key, value]) => value && value !== "all" && value !== "",
  ).length

  return (
    <div className="mb-8 space-y-4">
      {/* Quick Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products, companies, or HS codes..."
            className="pl-10"
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          />
        </div>
        <Button onClick={applyFilters}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {currentParams.search && (
            <Badge variant="secondary" className="gap-1">
              Search: {currentParams.search}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setFilters((prev) => ({ ...prev, search: "" }))
                  const params = new URLSearchParams(searchParams)
                  params.delete("search")
                  router.push(`/products?${params.toString()}`)
                }}
              />
            </Badge>
          )}
          {currentParams.category && currentParams.category !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Category: {categories.find((c) => c.id === currentParams.category)?.name}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setFilters((prev) => ({ ...prev, category: "all" }))
                  const params = new URLSearchParams(searchParams)
                  params.delete("category")
                  router.push(`/products?${params.toString()}`)
                }}
              />
            </Badge>
          )}
          {currentParams.verified === "true" && (
            <Badge variant="secondary" className="gap-1">
              Verified Only
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setFilters((prev) => ({ ...prev, verified: false }))
                  const params = new URLSearchParams(searchParams)
                  params.delete("verified")
                  router.push(`/products?${params.toString()}`)
                }}
              />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Advanced Filters */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent>
          <Card>
            <CardHeader>
              <CardTitle className="font-space-grotesk">Advanced Filters</CardTitle>
              <CardDescription>Refine your search with detailed criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={filters.category}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select
                    value={filters.country}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, country: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Countries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Price Range (USD)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Options</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verified"
                        checked={filters.verified}
                        onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, verified: checked as boolean }))}
                      />
                      <Label htmlFor="verified" className="text-sm">
                        Verified suppliers only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={filters.featured}
                        onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, featured: checked as boolean }))}
                      />
                      <Label htmlFor="featured" className="text-sm">
                        Featured products only
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={applyFilters} className="flex-1">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
                <Button variant="outline" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
