"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default function CheckoutPage() {
  const { items, total } = useCart()
  const [step, setStep] = useState<"delivery" | "payment" | "confirmation">("delivery")
  const [selectedOption, setSelectedOption] = useState<"pickup" | "delivery">("pickup")
  const [orderPlaced, setOrderPlaced] = useState(false)

  const shippingCost = total > 50 ? 0 : 4.99

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-background flex items-center justify-center py-20">
          <div className="text-center max-w-md">
            <div className="text-6xl mx-auto mb-4 opacity-50">📦</div>
            <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
            <p className="text-muted-foreground mb-6">Ajoutez des produits à votre panier pour continuer</p>
            <Link href="/catalog">
              <Button>Continuer vos achats</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (orderPlaced) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-background py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-soft-lg p-12 text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                  ✓
                </div>
                <h1 className="text-3xl font-bold mb-2">Commande confirmée !</h1>
                <p className="text-muted-foreground mb-8">
                  Numéro de commande: <span className="font-bold text-foreground">#CMD-2025-11-001</span>
                </p>

                <div className="bg-accent/5 rounded-xl p-6 mb-8 border border-accent/20">
                  <h3 className="font-bold mb-4">Retrait en officine</h3>
                  <p className="text-sm text-muted-foreground mb-3">Votre commande sera prête pour retrait</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Retrait:</span>
                      <span className="font-bold">Demain entre 10h-19h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Lieu:</span>
                      <span className="font-bold">PharmaPro - 123 Rue du Cours</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm mb-8">
                  <p className="text-muted-foreground">Vous recevrez un email de confirmation avec tous les détails</p>
                  <p className="text-muted-foreground">
                    Questions ?{" "}
                    <Link href="/contact" className="text-primary hover:underline">
                      Contactez-nous
                    </Link>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/catalog" className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      Continuer les achats
                    </Button>
                  </Link>
                  <Link href="/pharmacy-info" className="flex-1">
                    <Button className="w-full">Voir nos horaires</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="text-3xl font-bold mb-2">Panier</h1>

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Steps indicator */}
              <div className="flex gap-4 mb-8">
                {[
                  { id: "delivery", label: "Livraison" },
                  { id: "payment", label: "Paiement" },
                  { id: "confirmation", label: "Confirmation" },
                ].map((s, i) => (
                  <div key={s.id} className="flex items-center gap-2 flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        step === s.id
                          ? "bg-primary text-white"
                          : step > s.id
                            ? "bg-accent text-white"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
                    {i < 2 && <div className="h-0.5 bg-border flex-1 hidden md:block" />}
                  </div>
                ))}
              </div>

              {/* Delivery options */}
              {step === "delivery" && (
                <Card className="border border-border rounded-2xl shadow-soft p-8">
                  <h2 className="text-2xl font-bold mb-6">Mode de livraison</h2>

                  <div className="space-y-4 mb-8">
                    {/* Click & Collect */}
                    <div
                      onClick={() => setSelectedOption("pickup")}
                      className={`p-6 border-2 rounded-lg cursor-pointer transition ${
                        selectedOption === "pickup"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 flex items-center justify-center ${
                            selectedOption === "pickup" ? "border-primary bg-primary" : "border-border"
                          }`}
                        >
                          {selectedOption === "pickup" && <span className="text-white text-xs">✓</span>}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">📦</span>
                            <h3 className="font-bold">Click & Collect</h3>
                            <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded ml-auto">
                              Recommandé
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Retirez votre commande directement en officine
                          </p>
                          <p className="text-sm font-medium text-primary">Gratuit • Retrait demain</p>
                        </div>
                      </div>
                    </div>

                    {/* Home delivery */}
                    <div
                      onClick={() => setSelectedOption("delivery")}
                      className={`p-6 border-2 rounded-lg cursor-pointer transition ${
                        selectedOption === "delivery"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 flex items-center justify-center ${
                            selectedOption === "delivery" ? "border-primary bg-primary" : "border-border"
                          }`}
                        >
                          {selectedOption === "delivery" && <span className="text-white text-xs">✓</span>}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">📍</span>
                            <h3 className="font-bold">Livraison à domicile</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">Recevez votre commande sous 48h</p>
                          <p className="text-sm font-medium">{total > 50 ? "Gratuit" : "4.99€"} • 48h</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedOption === "pickup" && (
                    <div className="bg-accent/5 rounded-lg p-4 border border-accent/20 mb-8">
                      <p className="text-sm text-accent">
                        <strong>PharmaPro</strong> • 123 Rue du Cours, 75000 Paris
                        <br />
                        Horaires: Lun-Ven 09h-19h, Sam 09h-13h
                      </p>
                    </div>
                  )}

                  <Button className="w-full mb-4" onClick={() => setStep("payment")}>
                    Continuer vers le paiement
                  </Button>
                </Card>
              )}

              {/* Payment section */}
              {step === "payment" && (
                <Card className="border border-border rounded-2xl shadow-soft p-8">
                  <h2 className="text-2xl font-bold mb-6">Paiement</h2>

                  <div className="space-y-4 mb-8">
                    <div className="p-4 border-2 border-primary bg-primary/5 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xl">💳</span>
                        <h3 className="font-bold">Carte bancaire</h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium block mb-1">Nom du titulaire</label>
                          <input
                            type="text"
                            placeholder="Jean Dupont"
                            className="w-full px-3 py-2 border border-border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">Numéro de carte</label>
                          <input
                            type="text"
                            placeholder="•••• •••• •••• 1234"
                            className="w-full px-3 py-2 border border-border rounded-lg"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium block mb-1">Expiration</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full px-3 py-2 border border-border rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium block mb-1">CVV</label>
                            <input
                              type="text"
                              placeholder="•••"
                              className="w-full px-3 py-2 border border-border rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-8">
                    <div className="flex gap-3">
                      <span className="text-xl flex-shrink-0">ⓘ</span>
                      <p className="text-sm text-blue-900">
                        <strong>Paiement simulé:</strong> Ceci est une démonstration. Aucun paiement réel n'est
                        effectué.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep("delivery")}>
                      Retour
                    </Button>
                    <Button className="flex-1" onClick={() => setStep("confirmation")}>
                      Confirmer le paiement
                    </Button>
                  </div>
                </Card>
              )}

              {/* Confirmation section */}
              {step === "confirmation" && (
                <Card className="border border-border rounded-2xl shadow-soft p-8">
                  <h2 className="text-2xl font-bold mb-6">Confirmation</h2>

                  <div className="space-y-6 mb-8">
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-bold mb-3">Mode de livraison</h3>
                      <p className="text-sm">
                        {selectedOption === "pickup"
                          ? "Click & Collect - Retrait demain"
                          : "Livraison à domicile - 48h"}
                      </p>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-bold mb-3">Montant total</h3>
                      <p className="text-sm">
                        {total.toFixed(2)}€ + {shippingCost.toFixed(2)}€ livraison ={" "}
                        <span className="font-bold">{(total + shippingCost).toFixed(2)}€</span>
                      </p>
                    </div>
                  </div>

                  <Button className="w-full mb-4" onClick={() => setOrderPlaced(true)}>
                    Placer la commande
                  </Button>
                </Card>
              )}
            </div>

            {/* Order summary sidebar */}
            <div>
              <Card className="border border-border rounded-2xl shadow-soft p-6 sticky top-20">
                <h3 className="font-bold text-lg mb-4">Résumé de commande</h3>

                {/* Items */}
                <div className="space-y-3 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-medium">{(item.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{total.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className={shippingCost === 0 ? "text-accent font-medium" : ""}>
                      {shippingCost === 0 ? "Gratuit" : shippingCost.toFixed(2) + "€"}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">{(total + shippingCost).toFixed(2)}€</span>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>✓ Paiement sécurisé</p>
                  <p>✓ Conforme RGPD</p>
                  <p>✓ Données HDS chiffrées</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
