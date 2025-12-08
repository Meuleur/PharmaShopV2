"use client"

export const dynamic = 'force-dynamic'

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Clock, ArrowRight, Lightbulb, Heart, Sun, Baby, Pill, Activity } from "lucide-react"

const conseils = [
  {
    id: 1,
    title: "10 gestes pour renforcer son système immunitaire",
    excerpt: "Des conseils simples et efficaces pour renforcer vos défenses naturelles au quotidien.",
    category: "Prévention",
    icon: Activity,
    readTime: "7 min",
    image: "/placeholder.svg",
    tags: ["Immunité", "Prévention", "Bien-être"],
  },
  {
    id: 2,
    title: "Comment bien choisir sa crème solaire",
    excerpt: "Tous nos conseils pour protéger efficacement votre peau des rayons UV et choisir le bon indice.",
    category: "Protection",
    icon: Sun,
    readTime: "5 min",
    image: "/placeholder.svg",
    tags: ["Solaire", "Peau", "Été"],
  },
  {
    id: 3,
    title: "Bien dormir : les règles d'hygiène du sommeil",
    excerpt: "Découvrez les bonnes pratiques pour améliorer la qualité de votre sommeil naturellement.",
    category: "Bien-être",
    icon: Heart,
    readTime: "6 min",
    image: "/placeholder.svg",
    tags: ["Sommeil", "Bien-être", "Relaxation"],
  },
  {
    id: 4,
    title: "Médicaments : comment bien les conserver",
    excerpt: "Les règles essentielles pour stocker vos médicaments dans des conditions optimales.",
    category: "Pratique",
    icon: Pill,
    readTime: "4 min",
    image: "/placeholder.svg",
    tags: ["Médicaments", "Conservation", "Sécurité"],
  },
  {
    id: 5,
    title: "Soins de bébé : les essentiels à avoir",
    excerpt: "La liste complète des produits indispensables pour prendre soin de votre nouveau-né.",
    category: "Bébé",
    icon: Baby,
    readTime: "8 min",
    image: "/placeholder.svg",
    tags: ["Bébé", "Soins", "Parents"],
  },
  {
    id: 6,
    title: "Allergies saisonnières : comment les soulager",
    excerpt: "Nos recommandations pour prévenir et traiter les allergies au pollen efficacement.",
    category: "Allergies",
    icon: Activity,
    readTime: "5 min",
    image: "/placeholder.svg",
    tags: ["Allergies", "Printemps", "Traitement"],
  },
  {
    id: 7,
    title: "Hydratation : pourquoi et comment bien s'hydrater",
    excerpt: "L'importance de l'hydratation et les bonnes pratiques pour boire suffisamment d'eau.",
    category: "Nutrition",
    icon: Heart,
    readTime: "4 min",
    image: "/placeholder.svg",
    tags: ["Hydratation", "Santé", "Nutrition"],
  },
  {
    id: 8,
    title: "Automédication : les règles à respecter",
    excerpt: "Les précautions essentielles avant de prendre un médicament sans ordonnance.",
    category: "Sécurité",
    icon: Pill,
    readTime: "6 min",
    image: "/placeholder.svg",
    tags: ["Automédication", "Sécurité", "Conseils"],
  },
  {
    id: 9,
    title: "Sport et compléments alimentaires : ce qu'il faut savoir",
    excerpt: "Guide complet sur les compléments alimentaires adaptés à votre pratique sportive.",
    category: "Sport",
    icon: Activity,
    readTime: "7 min",
    image: "/placeholder.svg",
    tags: ["Sport", "Nutrition", "Compléments"],
  },
]

const categories = [
  "Tous",
  "Prévention",
  "Protection",
  "Bien-être",
  "Pratique",
  "Bébé",
  "Allergies",
  "Nutrition",
  "Sécurité",
  "Sport",
]

export default function ConseilsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-full bg-amber-100 p-3">
                <Lightbulb className="h-8 w-8 text-amber-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold md:text-4xl">Conseils santé</h1>
                <p className="mt-1 text-muted-foreground">
                  Des guides pratiques et conseils d'experts pour prendre soin de votre santé
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={cat === "Tous" ? "default" : "outline"}
                className="cursor-pointer hover:bg-amber-100 transition-colors"
              >
                {cat}
              </Badge>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {conseils.map((conseil) => {
              const IconComponent = conseil.icon
              return (
                <Card key={conseil.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="relative h-48 bg-gradient-to-br from-amber-100 to-orange-100">
                    <Image
                      src={conseil.image}
                      alt={conseil.title}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-white/90 p-4 group-hover:scale-110 transition-transform">
                        <IconComponent className="h-8 w-8 text-amber-600" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-amber-100 text-amber-800" variant="outline">
                      {conseil.category}
                    </Badge>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {conseil.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {conseil.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {conseil.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {conseil.readTime}
                      </div>
                      <Link href={`/blog/conseils/${conseil.id}`} className="inline-flex items-center gap-2 text-sm text-amber-600 font-medium hover:text-amber-700">
                        Lire
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card className="mt-10 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <Lightbulb className="h-12 w-12 text-amber-600 shrink-0" />
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">Besoin d'un conseil personnalisé ?</h2>
                  <p className="text-muted-foreground">
                    Nos pharmaciens sont à votre écoute pour répondre à toutes vos questions de santé.
                  </p>
                </div>
                <Link href="/contact" className="shrink-0">
                  <Badge className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 text-sm cursor-pointer">
                    Nous contacter
                  </Badge>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
