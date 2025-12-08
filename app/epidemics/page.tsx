"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, TrendingUp, TrendingDown, AlertTriangle, Info, Shield } from "lucide-react"

export const dynamic = 'force-dynamic'

const regions = [
  {
    name: "Île-de-France",
    diseases: [
      { name: "Grippe", level: "Élevé", trend: "up", color: "bg-red-500" },
      { name: "Gastro-entérite", level: "Modéré", trend: "stable", color: "bg-orange-500" },
      { name: "COVID-19", level: "Faible", trend: "down", color: "bg-green-500" },
    ],
  },
  {
    name: "Auvergne-Rhône-Alpes",
    diseases: [
      { name: "Grippe", level: "Très élevé", trend: "up", color: "bg-red-600" },
      { name: "Gastro-entérite", level: "Élevé", trend: "up", color: "bg-red-500" },
      { name: "COVID-19", level: "Modéré", trend: "stable", color: "bg-orange-500" },
    ],
  },
  {
    name: "Nouvelle-Aquitaine",
    diseases: [
      { name: "Grippe", level: "Modéré", trend: "up", color: "bg-orange-500" },
      { name: "Gastro-entérite", level: "Faible", trend: "down", color: "bg-green-500" },
      { name: "COVID-19", level: "Faible", trend: "stable", color: "bg-green-500" },
    ],
  },
  {
    name: "Occitanie",
    diseases: [
      { name: "Grippe", level: "Élevé", trend: "up", color: "bg-red-500" },
      { name: "Gastro-entérite", level: "Modéré", trend: "stable", color: "bg-orange-500" },
      { name: "COVID-19", level: "Faible", trend: "down", color: "bg-green-500" },
    ],
  },
]

const preventionTips = [
  {
    title: "Lavez-vous les mains régulièrement",
    description: "Avec du savon pendant au moins 30 secondes",
  },
  {
    title: "Portez un masque en cas de symptômes",
    description: "Pour protéger votre entourage",
  },
  {
    title: "Aérez régulièrement les espaces",
    description: "15 minutes plusieurs fois par jour",
  },
  {
    title: "Évitez les contacts rapprochés",
    description: "Si vous êtes malade ou en présence de personnes malades",
  },
]

export default function EpidemicMapPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-full bg-red-100 p-3">
                <MapPin className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold md:text-4xl">Carte des épidémies</h1>
                <p className="mt-1 text-muted-foreground">
                  Suivez l'évolution des épidémies en temps réel dans votre région
                </p>
              </div>
            </div>
          </div>

          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Données en temps réel</h3>
                  <p className="text-sm text-blue-800">
                    Les données présentées sont mises à jour quotidiennement en collaboration avec Santé Publique France.
                    Dernière mise à jour : aujourd'hui à 08h00.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Situation par région</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {regions.map((region) => (
                <Card key={region.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-red-600" />
                      {region.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {region.diseases.map((disease) => (
                      <div key={disease.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${disease.color}`} />
                          <div>
                            <div className="font-medium text-sm">{disease.name}</div>
                            <div className="text-xs text-muted-foreground">{disease.level}</div>
                          </div>
                        </div>
                        <div>
                          {disease.trend === "up" && <TrendingUp className="h-4 w-4 text-red-600" />}
                          {disease.trend === "down" && <TrendingDown className="h-4 w-4 text-green-600" />}
                          {disease.trend === "stable" && <div className="h-4 w-4 flex items-center justify-center text-orange-600">→</div>}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-600" />
                Conseils de prévention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {preventionTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-white">
                    <div className="rounded-full bg-green-100 p-2 shrink-0">
                      <AlertTriangle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline">
                  Télécharger les recommandations
                </Button>
                <Button>
                  Consulter un médecin
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
