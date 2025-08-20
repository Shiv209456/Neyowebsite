import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  if (!query || query.length < 2) {
    return NextResponse.json({ suggestions: [] })
  }

  const supabase = await createClient()

  // Search for products and companies
  const { data: products } = await supabase
    .from("products")
    .select(`
      id,
      title,
      hs_code,
      profiles:seller_id (
        company_name
      )
    `)
    .eq("status", "active")
    .or(`title.ilike.%${query}%,hs_code.ilike.%${query}%,profiles.company_name.ilike.%${query}%`)
    .limit(limit)

  // Create suggestions
  const suggestions = [
    ...new Set([
      ...(products?.map((p) => p.title) || []),
      ...(products?.map((p) => p.hs_code).filter(Boolean) || []),
      ...(products?.map((p) => p.profiles?.company_name).filter(Boolean) || []),
    ]),
  ].slice(0, limit)

  return NextResponse.json({ suggestions })
}
