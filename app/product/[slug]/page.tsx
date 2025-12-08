"use client"

export const dynamic = 'force-dynamic'

import { use, useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase, type Product } from "@/lib/supabase"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RefreshCw,
  ChevronRight,
  Check,
  AlertCircle,
  Minus,
  Plus,
  Share2,
  Package
} from "lucide-react"
import { toast } from "sonner"

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCart()

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            brand:brands(*),
            category:categories(*)
          `)
          .eq('slug', slug)
          .maybeSingle()

        if (error) throw error
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

  const handleAddToCart = () => {
    if (!product) return

    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand?.name || '',
      price: product.price,
      quantity,
      image: product.image_url
    })

    toast.success('Produit ajouté au panier !', {
      description: `${quantity}x ${product.name}`
    })
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? 'Retiré des favoris' : 'Ajouté aux favoris')
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-background">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 w-64 bg-muted rounded mb-8" />
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="aspect-square bg-muted rounded-2xl" />
                <div className="space-y-4">
                  <div className="h-10 bg-muted rounded w-3/4" />
                  <div className="h-6 bg-muted rounded w-1/2" />
                  <div className="h-32 bg-muted rounded" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-background">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center">
            <AlertCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Produit introuvable</h1>
            <p className="text-muted-foreground mb-6">Ce produit n'existe pas ou a été retiré.</p>
            <Link href="/catalog">
              <Button>Retour au catalogue</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  const images = [product.image_url, ...(product.images || [])]

  return (
    <>
      <Header />
      <main className="flex-1 bg-background pb-16">
        <div className="bg-white border-b">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/catalog" className="hover:text-primary transition-colors">Catalogue</Link>
              <ChevronRight className="h-4 w-4" />
              {product.category && (
                <>
                  <Link href={`/catalog?category=${product.category.slug}`} className="hover:text-primary transition-colors">
                    {product.category.name}
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
              <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 md:py-12">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 mb-12">
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-2xl border overflow-hidden group">
                <Image
                  src={images[selectedImage] || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  className="object-contain p-4 md:p-8 group-hover:scale-110 transition-transform duration-500"
                  priority
                />
                {discount > 0 && (
                  <Badge className="absolute top-3 md:top-4 right-3 md:right-4 bg-destructive text-white shadow-md text-xs md:text-sm">
                    -{discount}%
                  </Badge>
                )}
                {product.is_new && (
                  <Badge className="absolute top-3 md:top-4 left-3 md:left-4 bg-accent text-white shadow-md text-xs md:text-sm">
                    Nouveau
                  </Badge>
                )}
                <button
                  onClick={handleToggleFavorite}
                  className="absolute bottom-3 md:bottom-4 right-3 md:right-4 p-2 md:p-3 bg-white rounded-full shadow-soft hover:shadow-soft-md transition-all hover:scale-110 active:scale-95"
                  aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  <Heart
                    className={`h-4 w-4 md:h-5 md:w-5 transition-colors ${
                      isFavorite ? "fill-destructive text-destructive" : "text-foreground"
                    }`}
                  />
                </button>
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 overflow-hidden transition-all ${
                        selectedImage === idx ? 'border-primary shadow-md scale-105' : 'border-transparent hover:border-muted'
                      }`}
                    >
                      <Image
                        src={img || '/placeholder.svg'}
                        alt={`${product.name} - Image ${idx + 1}`}
                        fill
                        className="object-contain p-1 md:p-2"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4 md:space-y-6">
              {product.brand && (
                <Link href={`/brands/${product.brand.slug}`} className="text-sm font-medium text-primary hover:underline inline-block">
                  {product.brand.name}
                </Link>
              )}

              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight">{product.name}</h1>
                {product.short_description && (
                  <p className="text-base md:text-lg text-muted-foreground">{product.short_description}</p>
                )}
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 md:h-5 md:w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.review_count} avis)
                </span>
              </div>

              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="capitalize text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="border-y py-4 md:py-6 space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl md:text-4xl font-bold text-primary">{product.price.toFixed(2)}€</span>
                  {product.original_price && (
                    <span className="text-lg md:text-xl text-muted-foreground line-through">
                      {product.original_price.toFixed(2)}€
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  {product.stock_quantity > 0 ? (
                    <>
                      <Check className="h-4 w-4 text-accent" />
                      <span className="text-accent font-medium">
                        En stock ({product.stock_quantity} disponibles)
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      <span className="text-destructive font-medium">Rupture de stock</span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="font-medium text-sm md:text-base">Quantité :</label>
                  <div className="flex items-center gap-2 border rounded-lg bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 md:p-3 hover:bg-muted transition-colors disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 md:w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                      className="p-2 md:p-3 hover:bg-muted transition-colors disabled:opacity-50"
                      disabled={quantity >= product.stock_quantity}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="flex-1 gap-2 h-12 md:h-14 text-base md:text-lg shadow-lg hover:shadow-xl transition-all"
                    onClick={handleAddToCart}
                    disabled={product.stock_quantity === 0}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Ajouter au panier
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="sm:w-auto h-12 md:h-14"
                    onClick={handleToggleFavorite}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-destructive text-destructive' : ''}`} />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="sm:w-auto h-12 md:h-14"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4 pt-4 md:pt-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="p-2 md:p-3 bg-muted rounded-full">
                    <Truck className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium">Livraison</div>
                    <div className="text-muted-foreground">24-48h</div>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="p-2 md:p-3 bg-muted rounded-full">
                    <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium">Paiement</div>
                    <div className="text-muted-foreground">Sécurisé</div>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="p-2 md:p-3 bg-muted rounded-full">
                    <RefreshCw className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium">Retours</div>
                    <div className="text-muted-foreground">14 jours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="bg-white rounded-2xl border p-4 md:p-6 lg:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                Description
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {product.is_prescription_required && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 md:p-6">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 md:h-6 md:w-6 text-yellow-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-1 text-sm md:text-base">
                      Médicament soumis à prescription
                    </h3>
                    <p className="text-xs md:text-sm text-yellow-800">
                      Ce produit nécessite une ordonnance valide. Vous pourrez l'envoyer lors de votre commande.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
