"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"
import Image from "next/image"

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, total } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-md bg-white shadow-soft-lg flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Mon panier</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Votre panier est vide</p>
                <Link href="/catalog">
                  <Button variant="outline" onClick={onClose}>
                    Continuer vos achats
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 bg-muted rounded-lg p-3">
                {/* Image */}
                <div className="w-16 h-16 bg-background rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground font-medium">{item.brand}</p>
                  <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                  <p className="font-bold text-primary mt-1">{item.price.toFixed(2)}€</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 ml-2">
                  {/* Quantity controls */}
                  <div className="flex items-center gap-1 bg-white border border-border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-muted transition"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-muted transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 hover:bg-destructive/10 text-destructive rounded transition text-sm"
                  >
                    Suppr.
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-3">
            {/* Totals */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{total.toFixed(2)}€</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Livraison</span>
                <span>{total > 50 ? "Gratuite" : "4.99€"}</span>
              </div>
              <div className="border-t border-border pt-1 mt-1 flex items-center justify-between font-bold">
                <span>Total</span>
                <span>{(total > 50 ? total : total + 4.99).toFixed(2)}€</span>
              </div>
            </div>

            {/* CTA */}
            <Link href="/checkout" onClick={onClose} className="block">
              <Button className="w-full">Procéder au paiement</Button>
            </Link>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition"
            >
              Continuer vos achats
            </button>
          </div>
        )}
      </div>
    </>
  )
}
