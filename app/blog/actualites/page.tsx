"use client"

export const dynamic = 'force-dynamic'

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight, Newspaper } from "lucide-react"

const articles = [
  {
    id: 1,
    title: "Les nouvelles recommandations pour la vaccination 2025",
    excerpt: "Découvrez les dernières recommandations du ministère de la Santé concernant les vaccins pour l'année 2025.",
    category: "Prévention",
    date: "15 janvier 2025",
    readTime: "5 min",
    image: "/placeholder.svg",
    featured: true,
  },
  {
    id: 2,
    title: "Nouveaux produits bio disponibles en pharmacie",
    excerpt: "Nous avons enrichi notre gamme de produits biologiques et naturels pour répondre à vos besoins.",
    category: "Produits",
    date: "12 janvier 2025",
    readTime: "3 min",
    image: "/placeholder.svg",
    featured: false,
  },
  {
    id: 3,
    title: "Grippe saisonnière : comment se protéger efficacement",
    excerpt: "Avec le pic de grippe saisonnière, nos pharmaciens vous donnent leurs meilleurs conseils de prévention.",
    category: "Santé",
    date: "8 janvier 2025",
    readTime: "4 min",
    image: "/placeholder.svg",
    featured: false,
  },
  {
    id: 4,
    title: "Horaires spéciaux pendant les vacances scolaires",
    excerpt: "Retrouvez nos horaires d'ouverture modifiés pour mieux vous servir pendant les vacances.",
    category: "Pharmacie",
    date: "5 janvier 2025",
    readTime: "2 min",
    image: "/placeholder.svg",
    featured: false,
  },
  {
    id: 5,
    title: "Innovation : nouveaux tests de dépistage rapides",
    excerpt: "Nous proposons désormais des tests de dépistage rapides pour diverses pathologies, sans rendez-vous.",
    category: "Services",
    date: "2 janvier 2025",
    readTime: "4 min",
    image: "/placeholder.svg",
    featured: false,
  },
  {
    id: 6,
    title: "Conseils nutrition pour bien démarrer l'année",
    excerpt: "Nos pharmaciens nutritionnistes partagent leurs recommandations pour une alimentation équilibrée.",
    category: "Bien-être",
    date: "28 décembre 2024",
    readTime: "6 min",
    image: "/placeholder.svg",
    featured: false,
  },
]

export default function ActualitesPage() {
  const featuredArticle = articles.find(a => a.featured)
  const otherArticles = articles.filter(a => !a.featured)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-full bg-green-100 p-3">
                <Newspaper className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold md:text-4xl">Nos actualités</h1>
                <p className="mt-1 text-muted-foreground">
                  Restez informés des dernières nouvelles de votre pharmacie et de l'actualité santé
                </p>
              </div>
            </div>
          </div>

          {featuredArticle && (
            <Card className="mb-10 overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-green-600">
                    À la une
                  </Badge>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <Badge className="w-fit mb-3" variant="outline">
                    {featuredArticle.category}
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {featuredArticle.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredArticle.readTime}
                    </div>
                  </div>
                  <Link href={`/blog/actualites/${featuredArticle.id}`} className="inline-flex items-center gap-2 text-green-600 font-medium hover:text-green-700">
                    Lire l'article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>
          )}

          <div className="mb-6">
            <h2 className="text-2xl font-bold">Tous les articles</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <Badge className="w-fit mb-2" variant="outline">
                    {article.category}
                  </Badge>
                  <CardTitle className="text-lg line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </div>
                  </div>
                  <Link href={`/blog/actualites/${article.id}`} className="inline-flex items-center gap-2 text-sm text-green-600 font-medium hover:text-green-700">
                    Lire la suite
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
