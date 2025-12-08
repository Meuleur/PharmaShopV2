"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/mock-data"
import Link from "next/link"
import { useState } from "react"
import { Heart, Trash2, ShoppingBag, Filter, ArrowUpDown } from "lucide-react"

export const dynamic = 'force-dynamic'

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([
    "prod-1",
    "prod-2",
    "prod-7",
    "prod-12",
    "prod-16",
    "prod-24"
  ])
  const [sortBy, setSortBy] = useState("recent")

  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id))

  const sortedProducts = [...favoriteProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const removeFavorite = (id: string) => {
    setFavoriteIds((prev) => prev.filter((fid) => fid !== id))
  }

  const clearAll = () => {
    setFavoriteIds([])
  }

  const totalValue = favoriteProducts.reduce((sum, p) => sum + p.price, 0)

  return (
    <>
      <Header />
      <main className="bg-background min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-background border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                    <Heart className="h-6 w-6 text-white fill-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold">Mes Favoris</h1>
                </div>
                <p className="text-lg text-muted-foreground">
                  {favoriteProducts.length} produit{favoriteProducts.length !== 1 ? "s" : ""} · Valeur totale{" "}
                  <span className="font-bold text-primary">{totalValue.toFixed(2)}€</span>
                </p>
              </div>

              {favoriteProducts.length > 0 && (
                <Button
                  variant="ghost"
                  onClick={clearAll}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Tout effacer
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          {favoriteProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-6">
                <Heart className="h-16 w-16 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Aucun favori pour le moment</h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                Explorez notre catalogue et ajoutez vos produits préférés à vos favoris pour les retrouver facilement.
              </p>
              <Link href="/catalog">
                <Button size="lg" className="shadow-lg">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Découvrir le catalogue
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{favoriteProducts.length} produits</span>
                </div>

                <div className="flex items-center gap-3">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-white border border-border rounded-xl text-sm font-medium cursor-pointer transition-all hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="recent">Plus récents</option>
                    <option value="name">Nom A-Z</option>
                    <option value="price-low">Prix croissant</option>
                    <option value="price-high">Prix décroissant</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Link href={`/product/${product.id}`}>
                      <ProductCard {...product} />
                    </Link>
                    <button
                      onClick={() => removeFavorite(product.id)}
                      className="absolute top-4 right-4 z-10 p-2.5 bg-white/95 backdrop-blur rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive hover:text-white hover:scale-110"
                      aria-label="Retirer des favoris"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border border-border">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-xl font-bold">Prêt à commander ?</h3>
                    <p className="text-muted-foreground">
                      Ajoutez tous vos favoris au panier en un clic et profitez de la livraison gratuite dès 50€
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Link href="/catalog">
                      <Button variant="outline" size="lg">
                        Continuer mes achats
                      </Button>
                    </Link>
                    <Button size="lg" className="shadow-lg">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Tout ajouter au panier
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="mt-8 grid md:grid-cols-3 gap-4">
                <div className="p-6 bg-white rounded-2xl border border-border space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-bold">Suivez vos favoris</h4>
                  <p className="text-sm text-muted-foreground">
                    Recevez des alertes lorsque le prix baisse ou qu'une promo est disponible
                  </p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-border space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-2">
                    <ShoppingBag className="h-5 w-5 text-accent" />
                  </div>
                  <h4 className="font-bold">Commande rapide</h4>
                  <p className="text-sm text-muted-foreground">
                    Retrouvez vos produits préférés en un clic pour commander plus vite
                  </p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-border space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-2">
                    <Filter className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <h4 className="font-bold">Organisez votre liste</h4>
                  <p className="text-sm text-muted-foreground">
                    Créez des listes thématiques pour mieux organiser vos favoris
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
