"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { toast } from "sonner"

interface ProductCardProps {
  product?: {
    id: string
    name: string
    brand: string
    price: number
    originalPrice?: number
    image: string
    rating: number
    reviews: number
    stock: number
    tags: string[]
    images?: string[]          // 👈 support des images côté "product"
  }
  id?: string
  name?: string
  slug?: string
  brand?: { name: string; slug: string } | null
  price?: number
  original_price?: number | null
  image_url?: string
  images?: string[]            // 👈 support des images côté props directes (Supabase)
  rating?: number
  review_count?: number
  is_new?: boolean
  stock_quantity?: number
}

export function ProductCard({
  product,
  id: propId,
  name: propName,
  slug: propSlug,
  brand: propBrand,
  price: propPrice,
  original_price,
  image_url,
  images: propImages,          // 👈 on récupère aussi images depuis Supabase
  rating: propRating,
  review_count,
  is_new,
  stock_quantity
}: ProductCardProps) {
  const id = product?.id || propId || ""
  const name = product?.name || propName || ""
  const slug = propSlug || product?.id || ""
  const brand = propBrand || (product?.brand ? { name: product.brand, slug: "" } : null)
  const price = product?.price || propPrice || 0
  const originalPrice = product?.originalPrice || original_price

  // 👇 priorité aux images[] (DB), puis image_url, puis image simple, puis placeholder
  const images = product?.images || propImages
  const imageUrl = images?.[0] || product?.image || image_url || "/placeholder.svg"

  const rating = product?.rating || propRating || 0
  const reviewCount = product?.reviews || review_count || 0
  const isNew = product?.tags?.includes("nouveauté") || is_new
  const stockQuantity = product?.stock || stock_quantity || 0
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addItem } = useCart()

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAddingToCart(true)
    addItem({
      id,
      name,
      brand: brand?.name || "",
      price,
      quantity: 1,
      image: imageUrl
    })

    toast.success("Produit ajouté au panier !", {
      description: `1x ${name}`
    })

    setTimeout(() => setIsAddingToCart(false), 600)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? "Retiré des favoris" : "Ajouté aux favoris")
  }

  return (
    <Link href={`/product/${slug}`} className="group block">
      <div className="bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
        <div className="relative h-48 bg-muted overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
          />

          {discount > 0 && (
            <Badge className="absolute top-3 right-3 bg-destructive text-white shadow-md">
              -{discount}%
            </Badge>
          )}

          {isNew && (
            <Badge className="absolute top-3 left-3 bg-accent text-white shadow-md">
              Nouveau
            </Badge>
          )}

          <button
            onClick={handleToggleFavorite}
            className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-soft hover:shadow-soft-md transition-all hover:scale-110 active:scale-95"
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? "fill-destructive text-destructive" : "text-foreground"
              }`}
            />
          </button>

          {stockQuantity === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-semibold bg-destructive px-4 py-2 rounded-lg">
                Rupture de stock
              </span>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1">
          {/* Contenu variable qui prend l'espace disponible */}
          <div className="flex-1 flex flex-col gap-3">
            {brand && (
              <p className="text-xs text-primary font-medium uppercase">
                {brand.name}
              </p>
            )}

            <h3 className="font-bold text-sm line-clamp-2 text-foreground leading-snug group-hover:text-primary transition-colors">
              {name}
            </h3>

            <div className="flex items-center gap-2 text-xs">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`text-sm ${
                      i < Math.floor(rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted"
                    }`}
                  >
                    ★
                  </Star>
                ))}
              </div>
              <span className="text-muted-foreground">
                ({reviewCount})
              </span>
            </div>
          </div>

          {/* Prix et bouton poussés vers le bas */}
          <div className="flex flex-col gap-3 mt-auto pt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-primary">
                {price.toFixed(2)}€
              </span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {originalPrice.toFixed(2)}€
                </span>
              )}
            </div>

            <Button
              size="sm"
              className="w-full gap-2 relative overflow-hidden"
              onClick={handleAddToCart}
              disabled={stockQuantity === 0 || isAddingToCart}
            >
              {isAddingToCart ? (
                <>
                  <span className="animate-bounce">✓</span>
                  Ajouté !
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Ajouter
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
