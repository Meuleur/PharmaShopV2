"use client"

export const dynamic = 'force-dynamic'

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { supabase, type Brand } from "@/lib/supabase"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Search, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchBrands() {
      try {
        const { data, error } = await supabase
          .from('brands')
          .select('*')
          .order('name')

        if (error) throw error
        setBrands(data || [])
      } catch (error) {
        console.error('Error fetching brands:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBrands()
  }, [])

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const featuredBrands = [
    { name: "Arkopharma", color: "from-emerald-500 to-teal-500" },
    { name: "Avène", color: "from-blue-500 to-cyan-500" },
    { name: "Bioderma", color: "from-pink-500 to-rose-500" },
    { name: "La Roche-Posay", color: "from-indigo-500 to-purple-500" },
  ]

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 border-b">
          <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-primary mb-6 shadow-soft">
                <Sparkles className="h-4 w-4" />
                Les meilleures marques
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">
                Découvrez nos marques partenaires
              </h1>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 md:p-8 shadow-soft animate-pulse">
                  <div className="h-16 bg-muted rounded mb-3" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  Marques vedettes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {featuredBrands.map((featured) => {
                    const brand = brands.find(b => b.name === featured.name)
                    if (!brand) return null

                    return (
                      <Link
                        key={brand.id}
                        href={`/catalog?brand=${brand.slug}`}
                        className="group"
                      >
                        <div className="relative overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-soft-lg transition-all duration-300 p-6 md:p-8 h-full">
                          <div className={`absolute inset-0 bg-gradient-to-br ${featured.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                          <div className="relative">
                            <div className="flex items-center justify-center h-16 mb-4">
                              <div className={`text-3xl font-bold bg-gradient-to-r ${featured.color} bg-clip-text text-transparent`}>
                                {brand.name.charAt(0)}
                              </div>
                            </div>

                            <h3 className="text-lg font-bold text-center mb-2 group-hover:text-primary transition-colors">
                              {brand.name}
                            </h3>

                            {brand.description && (
                              <p className="text-xs text-center text-muted-foreground line-clamp-2 mb-4">
                                {brand.description}
                              </p>
                            )}

                            <div className="flex items-center justify-center gap-2 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                              Voir les produits
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">
                    {searchQuery ? `Résultats (${filteredBrands.length})` : 'Toutes les marques'}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {filteredBrands.length} marque{filteredBrands.length > 1 ? 's' : ''}
                  </span>
                </div>

                {filteredBrands.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl">
                    <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Aucune marque trouvée</h3>
                    <p className="text-muted-foreground">
                      Essayez une autre recherche
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                    {filteredBrands.map((brand) => (
                      <Link
                        key={brand.id}
                        href={`/catalog?brand=${brand.slug}`}
                        className="group"
                      >
                        <div className="bg-white rounded-xl p-4 md:p-6 shadow-soft hover:shadow-soft-md transition-all duration-300 hover:scale-105 h-full flex flex-col items-center justify-center text-center">
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <span className="text-xl md:text-2xl font-bold text-primary">
                              {brand.name.charAt(0)}
                            </span>
                          </div>

                          <h3 className="font-bold text-sm md:text-base mb-1 group-hover:text-primary transition-colors line-clamp-2">
                            {brand.name}
                          </h3>

                          {brand.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {brand.description}
                            </p>
                          )}

                          <div className="mt-auto pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-12 bg-gradient-to-br from-primary/5 via-white to-accent/5 rounded-2xl p-6 md:p-8 text-center border">
                <h2 className="text-xl md:text-2xl font-bold mb-3">Vous ne trouvez pas votre marque ?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-sm md:text-base">
                  Explorez notre catalogue complet avec plus de 1000 produits de toutes les meilleures marques pharmaceutiques et cosmétiques
                </p>
                <Link href="/catalog">
                  <Button size="lg" className="gap-2 shadow-lg">
                    Voir tous les produits
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
