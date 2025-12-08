"use client"

export const dynamic = 'force-dynamic'

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  Smartphone,
  Newspaper,
  Lightbulb,
  MapPin,
  Video,
  ArrowRight,
  Download,
  Calendar,
  FileText,
  Activity,
  Stethoscope,
} from "lucide-react"

const services = [
  {
    icon: Smartphone,
    title: "Application mobile",
    description: "Téléchargez notre application pour commander, suivre vos livraisons et accéder à tous nos services en mobilité.",
    features: [
      "Commande rapide et intuitive",
      "Suivi en temps réel de vos livraisons",
      "Historique de vos achats",
      "Notifications personnalisées"
    ],
    action: "Télécharger l'app",
    href: "#",
    color: "bg-blue-50 hover:bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Newspaper,
    title: "Nos actualités",
    description: "Restez informés des dernières nouvelles en santé, innovations pharmaceutiques et actualités de votre pharmacie.",
    features: [
      "Articles santé et bien-être",
      "Actualités médicales",
      "Nouveaux produits",
      "Événements de la pharmacie"
    ],
    action: "Lire le blog",
    href: "/blog/actualites",
    color: "bg-green-50 hover:bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Lightbulb,
    title: "Conseils santé",
    description: "Découvrez nos conseils pratiques et guides pour prendre soin de votre santé au quotidien.",
    features: [
      "Guides pratiques",
      "Conseils de pharmaciens",
      "Prévention et hygiène",
      "Astuces bien-être"
    ],
    action: "Voir les conseils",
    href: "/blog/conseils",
    color: "bg-amber-50 hover:bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: MapPin,
    title: "Carte des épidémies",
    description: "Suivez l'évolution des épidémies en temps réel dans votre région pour mieux vous protéger.",
    features: [
      "Données en temps réel",
      "Alertes par région",
      "Conseils de prévention",
      "Statistiques détaillées"
    ],
    action: "Voir la carte",
    href: "/epidemics",
    color: "bg-red-50 hover:bg-red-100",
    iconColor: "text-red-600",
  },
  {
    icon: Video,
    title: "Téléconsultation Medadom",
    description: "Consultez un médecin rapidement en ligne via notre partenaire Medadom, 7j/7 de 6h à minuit.",
    features: [
      "Médecins disponibles 7j/7",
      "Consultation vidéo sécurisée",
      "Ordonnance électronique",
      "Prise en charge possible"
    ],
    action: "Consulter maintenant",
    href: "/teleconsult",
    color: "bg-purple-50 hover:bg-purple-100",
    iconColor: "text-purple-600",
  },
]

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-full bg-emerald-100 p-3">
                <Stethoscope className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold md:text-4xl">Nos services</h1>
                <p className="mt-1 text-muted-foreground">
                  Découvrez tous les services à votre disposition pour faciliter votre parcours santé
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <Card key={service.title} className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${service.color}`}>
                  <CardHeader>
                    <div className={`mb-4 inline-flex rounded-full p-3 ${service.iconColor}`} style={{ backgroundColor: 'currentColor', opacity: 0.1 }}>
                      <IconComponent className={`h-8 w-8 ${service.iconColor}`} />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-emerald-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={service.href} className="block pt-2">
                      <Button className="w-full gap-2">
                        {service.action}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card className="mt-10 border-2 bg-gradient-to-br from-emerald-50 to-teal-50">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Besoin d'aide ?</h2>
                  <p className="text-muted-foreground">
                    Notre équipe est là pour vous accompagner. Contactez-nous pour toute question sur nos services.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/contact">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Nous contacter
                    </Button>
                  </Link>
                  <Link href="/pharmacy-info">
                    <Button className="w-full sm:w-auto">
                      Notre officine
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
