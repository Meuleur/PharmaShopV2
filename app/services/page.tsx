"use client"

export const dynamic = "force-dynamic"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  MapPin,
  Video,
  ArrowRight,
  Calendar,
  FileText,
  Activity,
  Stethoscope,
} from "lucide-react"

const services = [
  {
    icon: FileText,
    title: "Bilans & formulaires de prévention",
    description:
      "Nous utilisons des questionnaires structurés pour faire le point sur votre santé et repérer précocement certains risques.",
    features: [
      "Formulaires simples à remplir depuis votre smartphone ou en officine",
      "Bilans personnalisés remis et expliqués par l'équipe",
      "Orientation vers le médecin si nécessaire",
      "Suivi possible dans le temps pour voir l’évolution",
    ],
    action: "Remplir un formulaire",
    // TODO: adapte vers ta vraie route Appharma
    href: "/prevention",
    color: "bg-emerald-50/70 hover:bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: Video,
    title: "Téléconsultation Medadom",
    description:
      "Quand votre médecin n’est pas disponible rapidement ou que vous avez du mal à vous déplacer, nous vous accompagnons pour une téléconsultation.",
    features: [
      "Téléconsultation avec un médecin via borne ou tablette à l’officine",
      "Aide de l'équipe pour installer et lancer la consultation",
      "Ordonnance électronique directement utilisable à la pharmacie",
      "Horaires élargis par rapport aux consultations classiques",
    ],
    action: "Accéder à la téléconsultation",
    href: "/teleconsult",
    color: "bg-purple-50/70 hover:bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Calendar,
    title: "Suivi vaccinal & rappels",
    description:
      "Nous vous aidons à y voir clair dans vos vaccins et à ne pas rater les rappels importants au fil des années.",
    features: [
      "Point sur votre statut vaccinal (grippe, COVID, rappel DTP, etc.)",
      "Planification des rendez-vous de vaccination à l’officine",
      "Rappels possibles à l’approche d’un vaccin à refaire",
      "Coordination avec votre médecin traitant si besoin",
    ],
    action: "Faire le point sur mes vaccins",
    href: "/vaccination",
    color: "bg-sky-50/70 hover:bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    icon: Activity,
    title: "Suivi des traitements & maladies chroniques",
    description:
      "Pour les traitements au long cours (hypertension, diabète, asthme, etc.), nous vous accompagnons dans la durée.",
    features: [
      "Entretiens pharmaceutiques sur rendez-vous",
      "Vérification de l’observance et des éventuels effets indésirables",
      "Conseils concrets pour adapter le traitement à votre quotidien",
      "Échanges possibles avec votre médecin si nécessaire",
    ],
    action: "Prendre un rendez-vous",
    href: "/suivi-chronique",
    color: "bg-amber-50/70 hover:bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: MapPin,
    title: "Alertes santé & épidémies",
    description:
      "Nous suivons ce qui circule sur le territoire pour adapter nos conseils et vous informer au bon moment.",
    features: [
      "Carte des épidémies dans votre région",
      "Mises au point sur les symptômes à surveiller",
      "Conseils concrets : quand consulter, quand surveiller",
      "Lien direct avec nos stocks de produits adaptés",
    ],
    action: "Voir les alertes en cours",
    href: "/epidemics",
    color: "bg-red-50/70 hover:bg-red-100",
    iconColor: "text-red-600",
  },
]

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          {/* HERO centré sur les nouvelles missions */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-full bg-emerald-100 p-3">
                <Stethoscope className="h-8 w-8 text-emerald-700" />
              </div>
              <div>
                <h1 className="text-3xl font-bold md:text-4xl">
                  Nos services et nouvelles missions
                </h1>
                <p className="mt-1 text-muted-foreground text-sm md:text-base max-w-2xl">
                  Prévention, téléconsultation, suivi vaccinal et accompagnement des
                  maladies chroniques : votre pharmacie ne se limite plus à la délivrance
                  de médicaments, elle devient un vrai point d&apos;appui dans votre
                  parcours de soins.
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground max-w-3xl">
              Chaque service ci-dessous correspond à une situation concrète : besoin
              d&apos;un bilan, d’un médecin rapidement, de faire le point sur vos vaccins
              ou sur un traitement au long cours. L’objectif est simple :{" "}
              <span className="font-semibold text-emerald-700">
                vous faire gagner en sécurité, en clarté et en temps
              </span>.
            </p>
          </div>

          {/* Cartes services */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <Card
                  key={service.title}
                  className={`
          flex flex-col h-full
          overflow-hidden transition-all duration-300 hover:shadow-lg
          ${service.color}
        `}
                >
                  <CardHeader className="pb-3">
                    {/* Icône simple sans ovale chelou */}
                    <IconComponent className={`mb-3 h-8 w-8 ${service.iconColor}`} />
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-col flex-1 justify-between space-y-4 pt-0">
                    {/* Contenu texte */}
                    <div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-emerald-600" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bouton collé en bas de la carte */}
                    <div className="pt-3">
                      <Link href={service.href} className="block">
                        <Button className="w-full gap-2">
                          {service.action}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>


          {/* Bloc de clôture : choix du bon service */}
          <Card className="mt-10 border-2 bg-gradient-to-br from-emerald-50 to-teal-50">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="max-w-xl">
                  <h2 className="text-2xl font-bold mb-2">Vous ne savez pas par où commencer ?</h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Formulaire de prévention, téléconsultation, rendez-vous vaccinal...
                    selon votre situation, tous les services ne sont pas forcément
                    adaptés. Nous pouvons voir cela avec vous et vous orienter vers la
                    solution la plus pertinente.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/contact">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Poser une question
                    </Button>
                  </Link>
                  <Link href="/pharmacy-info">
                    <Button className="w-full sm:w-auto gap-2">
                      Venir nous voir
                      <MapPin className="h-4 w-4" />
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
