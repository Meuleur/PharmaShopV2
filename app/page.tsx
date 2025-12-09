"use client"

export const dynamic = "force-dynamic"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { OfficineMap } from "@/components/OfficineMap";
import MarqueeCategories, { type MarqueeItem } from "@/components/MarqueeCategories"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Video,
  FileText,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Users,
  ChevronRight,
  MapPin,
  MessageSquareText,
  X,
  Smartphone,
  Newspaper,
  HeartPulse,
  Map,
  Percent,
} from "lucide-react"
import Image from "next/image"
import { getPromotionProducts } from "@/lib/mock-data"
import { ProductCard } from "@/components/product-card"

const cats: MarqueeItem[] = [
  {
    label: "Bien-être",
    href: "/catalog?category=bien-etre",
    image: "/wellness-spa-relaxation-aromatherapy-essential-oil.jpg",
  },
  {
    label: "Beauté & Hygiène",
    href: "/catalog?category=beaute-hygiene",
    image: "/beauty-skincare-cosmetics-hygiene-products.jpg",
  },
  {
    label: "Prévention",
    href: "/catalog?category=prevention",
    image: "/medical-prevention-vitamins-supplements-healthcare.jpg",
  },
  {
    label: "Nutrition",
    href: "/catalog?category=nutrition",
    image: "/healthy-nutrition-food-supplements-protein.jpg",
  },
  {
    label: "Sport",
    href: "/catalog?category=sport",
    image: "/sports-nutrition-fitness-supplements-energy.jpg",
  },
  {
    label: "Bébé & Maman",
    href: "/catalog?category=bebe-maman",
    image: "/baby-care-mother-infant-products-nursery.jpg",
  },
  {
    label: "Solaire",
    href: "/catalog?category=solaire",
    image: "/sunscreen-suncare-beach-summer-protection.jpg",
  },
  {
    label: "Bio",
    href: "/catalog?tag=bio",
    image: "/organic-natural-bio-eco-friendly-products.jpg",
  },
]

const services = [
  {
    icon: Smartphone,
    title: "Application mobile",
    description:
      "Téléchargez notre application pour commander, suivre vos livraisons et accéder à tous nos services en mobilité.",
    features: [
      "Commande rapide et intuitive",
      "Suivi en temps réel de vos livraisons",
      "Historique de vos achats",
      "Notifications personnalisées",
    ],
    cta: "Télécharger l'app",
    href: "/app",
    gradient: "from-blue-500/10 to-cyan-500/10",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200/50",
  },
  {
    icon: Newspaper,
    title: "Nos actualités",
    description:
      "Restez informés des dernières nouvelles en santé, innovations pharmaceutiques et actualités de votre pharmacie.",
    features: [
      "Articles santé et bien-être",
      "Actualités médicales",
      "Nouveaux produits",
      "Événements de la pharmacie",
    ],
    cta: "Lire le blog",
    href: "/blog",
    gradient: "from-purple-500/10 to-pink-500/10",
    iconColor: "text-purple-600",
    borderColor: "border-purple-200/50",
  },
  {
    icon: HeartPulse,
    title: "Conseils santé",
    description: "Découvrez nos conseils pratiques et guides pour prendre soin de votre santé au quotidien.",
    features: ["Guides pratiques", "Conseils de pharmaciens", "Prévention et hygiène", "Astuces bien-être"],
    cta: "Voir les conseils",
    href: "/conseils",
    gradient: "from-green-500/10 to-emerald-500/10",
    iconColor: "text-green-600",
    borderColor: "border-green-200/50",
  },
  {
    icon: Map,
    title: "Carte des épidémies",
    description: "Suivez l'évolution des épidémies en temps réel dans votre région pour mieux vous protéger.",
    features: ["Données en temps réel", "Alertes par région", "Conseils de prévention", "Statistiques détaillées"],
    cta: "Voir la carte",
    href: "/epidemies",
    gradient: "from-orange-500/10 to-red-500/10",
    iconColor: "text-orange-600",
    borderColor: "border-orange-200/50",
  },
]

export default function HomePage() {
  const [chatbotOpen, setChatbotOpen] = useState(false)

  // On calcule une seule fois la liste des produits en promo par render,
  // puis on la réutilise pour desktop + mobile
  const promotionProducts = getPromotionProducts().slice(0, 4)

  return (
    <>
      <Header />
      <main className="text-gray-900 overflow-x-hidden">
        {/* Hero */}
        <section className="relative overflow-hidden h-screen min-h-[600px]">
          <Image
            src="/ComptoirCroixDor.jpeg"
            alt="Intérieur de pharmacie moderne"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-center"
          />

          {/* Overlays de contraste */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

          {/* Conteneur centré verticalement */}
          <div className="relative mx-auto flex h-full max-w-7xl items-center px-3 sm:px-4 py-8 sm:py-10">
            <div className="grid w-full items-center gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              {/* Bloc texte dans une carte sombre pour la lisibilité */}
              <div className="max-w-xl rounded-2xl bg-black/60 backdrop-blur-sm px-4 sm:px-6 py-5 sm:py-7 shadow-2xl text-white">
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs sm:text-sm md:text-base font-semibold tracking-wide">
                  <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                  Pharmacie Croix d'Or
                </span>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                  L&apos;expérience pharmacie pensée pour la simplicité
                </h1>

                <p className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-white/90">
                  Commandez, consultez, suivez. Un parcours clair et rapide, conforme aux exigences{" "}
                  <span className="font-semibold">HDS &amp; RGPD</span>, avec l&apos;appui de nos pharmaciens.
                </p>

                {/* CTA principaux */}
                <div className="mt-6 flex flex-col gap-2 sm:gap-3 sm:flex-row">
                  <Link href="/catalog" aria-label="Accéder au catalogue">
                    <Button size="default" className="w-full sm:w-auto shadow-lg text-sm sm:text-base">
                      <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Parcourir le catalogue
                    </Button>
                  </Link>
                  <Link
                    href="/pharmacy-info"
                    className="w-full rounded-md border border-white/40 bg-white/10 backdrop-blur px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white hover:bg-white/20 sm:w-auto text-center transition shadow-lg"
                  >
                    <MapPin className="mr-1.5 sm:mr-2 inline h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Votre pharmacie
                  </Link>
                </div>

                {/* Badges rassurants */}
                <div className="mt-5 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-white/80">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    HDS / RGPD
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Click &amp; Collect
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Conseil en ligne
                  </span>
                </div>

                {/* Parcours + chiffres compactés pour gagner en hauteur */}
                <div className="mt-5 border-t border-white/15 pt-4">
                  <h3 className="text-sm sm:text-base font-semibold mb-3">
                    Votre parcours en 3 étapes
                  </h3>
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px] sm:text-xs">
                    <div className="flex flex-col items-center">
                      <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                        1
                      </div>
                      <span className="font-medium">Sélection</span>
                      <span className="text-[10px] text-white/70">Produits ou ordonnance</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                        2
                      </div>
                      <span className="font-medium">Validation</span>
                      <span className="text-[10px] text-white/70">Par un pharmacien</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                        3
                      </div>
                      <span className="font-medium">Retrait / Livraison</span>
                      <span className="text-[10px] text-white/70">Suivi en temps réel</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] sm:text-xs">
                    <div className="rounded-lg bg-white/10 px-2 py-2">
                      <div className="text-lg sm:text-xl font-bold">48h</div>
                      <div className="text-[10px] text-white/70">délai moyen</div>
                    </div>
                    <div className="rounded-lg bg-white/10 px-2 py-2">
                      <div className="text-lg sm:text-xl font-bold">+1k</div>
                      <div className="text-[10px] text-white/70">références</div>
                    </div>
                    <div className="rounded-lg bg-white/10 px-2 py-2">
                      <div className="text-lg sm:text-xl font-bold">4.9/5</div>
                      <div className="text-[10px] text-white/70">satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonne droite : services rapides (inchangé, mais le layout reste dans le même écran) */}
              <div className="hidden lg:block">
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Vos services rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link
                      href="/prescription"
                      className="flex items-center gap-3 rounded-lg bg-white/10 p-3 transition hover:bg-white/20"
                    >
                      <FileText className="h-5 w-5" />
                      <div>
                        <div className="font-medium">Envoyer ordonnance</div>
                        <div className="text-xs text-white/70">Préparation sous 2-4h</div>
                      </div>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Link>
                    <Link
                      href="/teleconsult"
                      className="flex items-center gap-3 rounded-lg bg-white/10 p-3 transition hover:bg-white/20"
                    >
                      <Video className="h-5 w-5" />
                      <div>
                        <div className="font-medium">Téléconsultation</div>
                        <div className="text-xs text-white/70">7j/7 de 6h à minuit</div>
                      </div>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        {/* CATÉGORIES POPULAIRES */}

        <section className="bg-gradient-to-b from-slate-50 to-white py-10 sm:py-16 overflow-hidden">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 px-4 text-center">Catégories populaires</h2>
          <MarqueeCategories items={cats} />
        </section>

        {/* NOS SERVICES */}
        <section className="bg-white py-10 sm:py-16 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <h2 className="text-3xl font-bold">Nos services</h2>
                </div>
                <p className="mt-2 text-muted-foreground">
                  Découvrez tous nos services pour votre santé et votre quotidien.
                </p>
              </div>
              <Link href="/services">
                <Button variant="outline" className="hidden sm:inline-flex bg-transparent">
                  Voir tous les services <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Desktop / tablette : grille */}
            <div className="hidden sm:grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <Card
                    key={service.title}
                    className={`bg-gradient-to-br ${service.gradient} ${service.borderColor} hover:shadow-lg transition-shadow`}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-white shadow-sm">
                          <Icon className={`h-5 w-5 ${service.iconColor}`} />
                        </div>
                        <span className="leading-tight">{service.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                        {service.description}
                      </p>
                      <ul className="space-y-1">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <ChevronRight className="h-3 w-3 mt-0.5 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href={service.href}>
                        <Button size="sm" className="w-full mt-2 text-xs sm:text-sm">
                          {service.cta}
                          <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Mobile : carrousel horizontal */}
            <div className="sm:hidden">
              <div className="overflow-x-auto -mx-4 px-4">
                <div className="flex gap-4 pb-4">
                  {services.map((service) => {
                    const Icon = service.icon
                    return (
                      <div key={service.title} className="flex-none w-[280px]">
                        <Card
                          className={`bg-gradient-to-br ${service.gradient} ${service.borderColor} hover:shadow-lg transition-shadow`}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                              <div className="p-2 rounded-lg bg-white shadow-sm">
                                <Icon className={`h-5 w-5 ${service.iconColor}`} />
                              </div>
                              <span className="leading-tight">{service.title}</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {service.description}
                            </p>
                            <ul className="space-y-1">
                              {service.features.slice(0, 3).map((feature, idx) => (
                                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                  <ChevronRight className="h-3 w-3 mt-0.5 text-primary flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <Link href={service.href}>
                              <Button size="sm" className="w-full mt-2 text-xs">
                                {service.cta}
                                <ChevronRight className="ml-1 h-3 w-3" />
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Bouton mobile "voir tout" */}
            <div className="mt-6 text-center sm:hidden">
              <Link href="/services">
                <Button variant="outline" className="w-full bg-transparent">
                  Voir tous les services <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* NOS PROMOTIONS */}
        <section className="bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Percent className="h-6 w-6 text-red-600" />
                  <h2 className="text-3xl font-bold">Nos promotions</h2>
                </div>
                <p className="mt-2 text-muted-foreground">Profitez de nos meilleures offres du moment</p>
              </div>
              <Link href="/promotions">
                <Button variant="outline" className="hidden sm:inline-flex bg-transparent">
                  Voir toutes les promos <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Desktop Grid */}
            <div className="hidden sm:grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {promotionProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Mobile : carrousel horizontal */}
            <div className="sm:hidden">
              <div className="overflow-x-auto -mx-4 px-4">
                <div className="flex gap-4 pb-4">
                  {promotionProducts.map((product) => (
                    <div key={product.id} className="flex-none w-[280px]">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bouton mobile "voir tout" */}
            <div className="mt-6 text-center sm:hidden">
              <Link href="/promotions">
                <Button variant="outline" className="w-full bg-transparent">
                  Voir toutes les promos <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Officines + Contact */}
        {/* Officines + Contact */}
        <section className="border-y bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <MapPin className="h-6 w-6 text-primary" /> Trouver une officine
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Localisez l'officine la plus proche pour un retrait immédiat.
                  </p>

                  {/* 👉 Remplacement du placeholder par la vraie carte */}
                  <OfficineMap />

                  <Link href="/officines">
                    <Button className="mt-6 w-full" variant="secondary">
                      Voir les officines
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* ta carte Contact rapide reste identique */}
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <MessageSquareText className="h-6 w-6 text-primary" /> Contact rapide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Une question sur un produit ou un traitement ? Nos pharmaciens répondent.
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <Link href="/teleconsult">
                      <Button className="w-full">
                        <Video className="mr-2 h-4 w-4" /> Téléconsultation
                      </Button>
                    </Link>
                    <Link href="/prescription">
                      <Button className="w-full bg-transparent" variant="outline">
                        <FileText className="mr-2 h-4 w-4" /> Envoyer une ordonnance
                      </Button>
                    </Link>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Disponibilité élargie, du lundi au samedi, 9h–19h.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        {/* Bloc conformité */}
        <section className="bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
            <div className="items-center justify-between gap-6 rounded-2xl border bg-muted/30 p-6 md:flex md:p-8">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-primary">Transparence & conformité</p>
                <h3 className="mt-1 text-xl font-semibold">
                  Protection des données de santé et traçabilité
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Exigences HDS & RGPD appliquées : chiffrement, contrôle des accès, audit, hébergement certifié.
                </p>
              </div>
              <div className="mt-4 shrink-0 md:mt-0">
                <Link href="/legal/hds" className="inline-flex items-center text-sm font-medium text-primary">
                  En savoir plus <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Chatbot modal */}
        {chatbotOpen && (
          <div className="fixed inset-0 z-[60] bg-black/50" onClick={() => setChatbotOpen(false)}>
            {/* Mobile */}
            <div
              className="md:hidden absolute bottom-0 left-0 right-0 flex h-[80vh] flex-col rounded-t-3xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b px-4 py-4">
                <div className="flex items-center gap-2">
                  <MessageSquareText className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Conseils personnalisés</h2>
                </div>
                <button
                  onClick={() => setChatbotOpen(false)}
                  className="rounded-full p-2 hover:bg-gray-100 transition ml-auto"
                  aria-label="Fermer le chatbot"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                  <MessageSquareText className="h-12 w-12 mb-4 text-primary/20" />
                  <p className="text-sm">Le chatbot IA sera intégré ici</p>
                  <p className="text-xs mt-2">Interface prête pour l'intégration</p>
                </div>
              </div>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Posez votre question..."
                    className="flex-1 rounded-full border px-4 py-2 text-sm outline-none focus:border-primary"
                    disabled
                  />
                  <button
                    className="rounded-full bg-primary px-4 py-2 text-white hover:brightness-95 transition"
                    disabled
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop */}
            <div
              className="hidden md:flex absolute right-0 top-0 bottom-0 w-[400px] flex-col bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b px-6 py-4">
                <div className="flex items-center gap-3">
                  <MessageSquareText className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-semibold">Conseils personnalisés</h2>
                </div>
                <button
                  onClick={() => setChatbotOpen(false)}
                  className="rounded-full p-2 hover:bg-gray-100 transition"
                  aria-label="Fermer le chatbot"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                  <MessageSquareText className="h-16 w-16 mb-6 text-primary/20" />
                  <p className="text-base">Le chatbot IA sera intégré ici</p>
                  <p className="text-sm mt-2">Interface prête pour l'intégration</p>
                </div>
              </div>

              <div className="border-t p-6">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Posez votre question..."
                    className="flex-1 rounded-full border px-4 py-3 text-sm outline-none focus:border-primary"
                    disabled
                  />
                  <button
                    className="rounded-full bg-primary px-6 py-3 text-white hover:brightness-95 transition"
                    disabled
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
