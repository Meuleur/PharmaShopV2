"use client"

export const dynamic = 'force-dynamic'

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { searchProducts, products, categories } from "@/lib/mock-data"
import Link from "next/link"
import { useState, useEffect, useMemo } from "react"
import { Search, X, TrendingUp, Clock, Filter, Grid, List } from "lucide-react"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [recentSearches] = useState([
    "Vitamine C",
    "Crème hydratante",
    "Masque visage",
    "Thermomètre"
  ])
  const [popularSearches] = useState([
    "Vitamine D",
    "Spray nasal",
    "Protection solaire",
    "Magnésium",
    "Probiotiques",
    "Gel hydroalcoolique"
  ])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return []

    let filtered = searchProducts(debouncedQuery)

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category))
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    return filtered
  }, [debouncedQuery, selectedCategories, priceRange])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <>
      <Header />
      <main className="bg-background min-h-screen">
        {/* Search Hero */}
        <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-background border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold">Recherche de produits</h1>
                <p className="text-lg text-muted-foreground">
                  Plus de 1000 références à votre disposition
                </p>
              </div>

              {/* Search Input */}
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher un produit, une marque, une catégorie..."
                    className="w-full h-16 pl-16 pr-16 bg-white border-2 border-border rounded-2xl text-lg focus:outline-none focus:border-primary transition-all shadow-lg"
                    autoFocus
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          {!query.trim() ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Recent Searches */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-xl font-bold">Recherches récentes</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {recentSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => setQuery(search)}
                      className="px-6 py-3 bg-white border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">Recherches populaires</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {popularSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => setQuery(search)}
                      className="px-6 py-4 bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-2xl hover:border-primary hover:shadow-lg transition-all text-left font-medium group"
                    >
                      <div className="flex items-center justify-between">
                        <span>{search}</span>
                        <Search className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories Quick Access */}
              <div>
                <h2 className="text-xl font-bold mb-4">Parcourir par catégorie</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {categories.slice(0, 8).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/catalog?category=${cat.slug}`}
                      className="p-6 bg-white rounded-2xl border border-border hover:border-primary hover:shadow-lg transition-all group"
                    >
                      <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {cat.productCount} produits
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Results Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-border">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">
                    {results.length} résultat{results.length !== 1 ? "s" : ""} pour "{debouncedQuery}"
                  </h2>
                  {selectedCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedCategories.map((catId) => {
                        const cat = categories.find((c) => c.id === catId)
                        return (
                          <Badge
                            key={catId}
                            variant="secondary"
                            className="gap-1 cursor-pointer"
                            onClick={() => toggleCategory(catId)}
                          >
                            {cat?.name}
                            <X className="h-3 w-3" />
                          </Badge>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "bg-white border border-border hover:bg-muted"
                    }`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "bg-white border border-border hover:bg-muted"
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-soft border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Filtres
                      </h3>
                      {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 100) && (
                        <button
                          onClick={() => {
                            setSelectedCategories([])
                            setPriceRange([0, 100])
                          }}
                          className="text-sm text-primary hover:underline"
                        >
                          Réinitialiser
                        </button>
                      )}
                    </div>

                    {/* Categories Filter */}
                    <div className="space-y-3 mb-6">
                      <h4 className="text-sm font-semibold text-muted-foreground">Catégories</h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {categories.map((cat) => (
                          <label
                            key={cat.id}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(cat.id)}
                              onChange={() => toggleCategory(cat.id)}
                              className="w-4 h-4 rounded border-border"
                            />
                            <span className="text-sm group-hover:text-primary transition-colors">
                              {cat.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-muted-foreground">Prix</h4>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-full"
                        />
                        <p className="text-sm font-medium">
                          {priceRange[0]}€ - {priceRange[1]}€
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="flex-1">
                  {results.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                        <Search className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Aucun résultat trouvé</h3>
                      <p className="text-muted-foreground mb-8 max-w-md">
                        Essayez avec des mots-clés différents ou parcourez notre catalogue
                      </p>
                      <Link href="/catalog">
                        <button className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:shadow-lg transition-all">
                          Voir le catalogue
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div
                      className={
                        viewMode === "grid"
                          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                          : "space-y-4"
                      }
                    >
                      {results.map((product, index) => (
                        <div
                          key={product.id}
                          className="animate-in fade-in slide-in-from-bottom-2 duration-500"
                          style={{ animationDelay: `${index * 30}ms` }}
                        >
                          <Link href={`/product/${product.id}`}>
                            <ProductCard {...product} />
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
