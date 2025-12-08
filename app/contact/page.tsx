"use client"

import type React from "react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

export const dynamic = 'force-dynamic'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", phone: "", subject: "general", message: "" })
    }, 3000)
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-muted-foreground">
            <span className="hover:text-primary cursor-pointer">Accueil</span>
            <span className="mx-2">/</span>
            <span className="text-foreground">Contact</span>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Nous contacter</h1>
          <p className="text-muted-foreground mb-12">Une question ? Nous sommes là pour vous aider</p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="space-y-6">
              <Card className="border border-border rounded-2xl shadow-soft p-6">
                <span className="text-3xl mb-3 block">📞</span>
                <h3 className="font-bold mb-2">Téléphone</h3>
                <p className="text-sm text-muted-foreground mb-2">+33 1 23 45 67 89</p>
                <p className="text-xs text-muted-foreground">
                  Lun-Ven: 09h-19h
                  <br />
                  Sam: 09h-13h
                </p>
              </Card>

              <Card className="border border-border rounded-2xl shadow-soft p-6">
                <span className="text-3xl mb-3 block">📧</span>
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">contact@pharmapro.fr</p>
                <p className="text-xs text-muted-foreground mt-2">Réponse sous 24h</p>
              </Card>

              <Card className="border border-border rounded-2xl shadow-soft p-6">
                <span className="text-3xl mb-3 block">📍</span>
                <h3 className="font-bold mb-2">Visite</h3>
                <p className="text-sm text-muted-foreground">
                  123 Rue du Cours
                  <br />
                  75000 Paris
                </p>
              </Card>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <Card className="border border-border rounded-2xl shadow-soft p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="text-4xl text-accent mx-auto mb-4">✓</div>
                    <h3 className="text-xl font-bold mb-2">Message envoyé !</h3>
                    <p className="text-muted-foreground">
                      Merci de nous avoir contactés. Nous répondrons à votre message rapidement.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium block mb-2">Nom</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Jean Dupont"
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-2">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jean@example.com"
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-2">Téléphone (optionnel)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+33 1 23 45 67 89"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-2">Sujet</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      >
                        <option value="general">Question générale</option>
                        <option value="order">Aide sur une commande</option>
                        <option value="prescription">Ordonnance</option>
                        <option value="product">Question produit</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-2">Message</label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Votre message..."
                        rows={6}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background resize-none"
                      />
                    </div>

                    <Button className="w-full gap-2">Envoyer le message</Button>
                  </form>
                )}
              </Card>
            </div>
          </div>

          {/* FAQ section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Questions fréquemment posées</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "Quel est le délai de retrait Click & Collect ?",
                  a: "En général 2-4 heures après confirmation de la commande.",
                },
                { q: "Proposez-vous la livraison à domicile ?", a: "Oui, livraison en 48h pour toute commande." },
                { q: "Puis-je annuler ma commande ?", a: "Oui, avant la préparation. Contactez-nous rapidement." },
                { q: "Acceptez-vous les ordonnances numériques ?", a: "Oui, vous pouvez les uploader sur notre site." },
              ].map((item, i) => (
                <Card key={i} className="border border-border rounded-xl shadow-soft p-4">
                  <h4 className="font-bold mb-2 text-sm">{item.q}</h4>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
