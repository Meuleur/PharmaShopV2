"use client"

import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Smartphone,
  Newspaper,
  HeartPulse,
  Map,
  Video,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

// 🔴 IMPORTANT : supprime cette ligne, elle ne doit pas être là
// import App from "next/app"

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
    description:
      "Découvrez nos conseils pratiques et guides pour prendre soin de votre santé au quotidien.",
    features: [
      "Guides pratiques",
      "Conseils de pharmaciens",
      "Prévention et hygiène",
      "Astuces bien-être",
    ],
    cta: "Voir les conseils",
    href: "/conseils",
    gradient: "from-green-500/10 to-emerald-500/10",
    iconColor: "text-green-600",
    borderColor: "border-green-200/50",
  },
  {
    icon: Map,
    title: "Carte des épidémies",
    description:
      "Suivez l'évolution des épidémies en temps réel dans votre région pour mieux vous protéger.",
    features: [
      "Données en temps réel",
      "Alertes par région",
      "Conseils de prévention",
      "Statistiques détaillées",
    ],
    cta: "Voir la carte",
    href: "/epidemies",
    gradient: "from-orange-500/10 to-red-500/10",
    iconColor: "text-orange-600",
    borderColor: "border-orange-200/50",
  },
  {
    icon: Video,
    title: "Téléconsultation Medadom",
    description:
      "Consultez un médecin rapidement en ligne via notre partenaire Medadom, 7j/7 de 6h à minuit.",
    features: [
      "Médecins disponibles 7j/7",
      "Consultation vidéo sécurisée",
      "Ordonnance électronique",
      "Prise en charge possible",
    ],
    cta: "Consulter maintenant",
    href: "/teleconsult",
    gradient: "from-teal-500/10 to-cyan-500/10",
    iconColor: "text-teal-600",
    borderColor: "border-teal-200/50",
  },
  {
    icon: Smartphone,
    title: "Application mobile – carnet santé & rappels",
    description:
      "Centralisez vos traitements, vaccins et rappels directement dans votre application mobile.",
    features: [
      "Carnet de traitement toujours à jour",
      "Rappels de prise et de renouvellement",
      "Suivi des vaccins pour toute la famille",
      "Accès rapide à vos informations en pharmacie",
    ],
    cta: "Découvrir dans l'app",
    href: "/app#carnet-sante",
    gradient: "from-indigo-500/10 to-sky-500/10",
    iconColor: "text-indigo-600",
    borderColor: "border-indigo-200/50",
  },
]

export function ServicesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative">
      {/* Navigation arrows - desktop only */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border hover:bg-muted transition-colors"
        aria-label="Précédent"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border hover:bg-muted transition-colors"
        aria-label="Suivant"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 px-1 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {services.map((service) => {
          const Icon = service.icon
          return (
            <Card
              key={service.title}
              className={`flex-none w-[280px] sm:w-[300px] snap-start bg-gradient-to-br ${service.gradient} ${service.borderColor} hover:shadow-lg transition-shadow`}
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
                    <li
                      key={idx}
                      className="text-xs text-muted-foreground flex items-start gap-1.5"
                    >
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
    </div>
  )
}

export default ServicesCarousel
