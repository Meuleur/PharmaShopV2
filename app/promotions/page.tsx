"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/product-card"
import { Percent, Sparkles } from "lucide-react"
import { supabase, type Product } from "@/lib/supabase"

export default function PromotionsPage() {
  const [promotionProducts, setPromotionProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPromotions() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select(
            `
            *,
            brand:brands(*),
            category:categories(*)
          `
          )
          .not("original_price", "is", null)      // original_price non null
          .eq("is_active", true)                  // optionnel si tu utilises ce flag
          .gt("stock_quantity", 0)                // optionnel : uniquement en stock

        if (error) throw error

        // Filtre côté client: vraie promo (price < original_price)
        const promos = (data || []).filter(
          (p) => p.original_price && p.original_price > p.price
        )

        setPromotionProducts(promos)
      } catch (err) {
        console.error("Error fetching promotion products:", err)
        setPromotionProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPromotions()
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-full bg-red-100 p-3">
                <Percent className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold md:text-4xl">Nos promotions</h1>
                <p className="mt-1 text-muted-foreground">
                  Profitez de nos meilleures offres sur une sélection de produits
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
              <Sparkles className="h-5 w-5 text-orange-600" />
              {loading ? (
                <p className="text-sm font-medium text-orange-900">
                  Chargement des promotions...
                </p>
              ) : (
                <p className="text-sm font-medium text-orange-900">
                  <span className="font-bold">{promotionProducts.length} produits</span> en promotion actuellement
                </p>
              )}
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-white rounded-2xl shadow-soft animate-pulse"
                />
              ))}
            </div>
          ) : promotionProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {promotionProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-white py-16 text-center">
              <Percent className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">Aucune promotion disponible</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Revenez bientôt pour découvrir nos nouvelles offres
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
