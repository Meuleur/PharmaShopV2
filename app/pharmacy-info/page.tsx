"use client"

export const dynamic = "force-dynamic"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PharmacyInfoPage() {
  const schedule = [
    { day: "Lundi", hours: "09:00 - 19:30" },
    { day: "Mardi", hours: "09:00 - 19:30" },
    { day: "Mercredi", hours: "09:00 - 19:30" },
    { day: "Jeudi", hours: "09:00 - 19:30" },
    { day: "Vendredi", hours: "09:00 - 19:30" },
    { day: "Samedi", hours: "09:00 - 13:00" },
    { day: "Dimanche", hours: "Fermé" },
    { day: "Jours fériés", hours: "Selon service de garde" },
  ]

  const team = [
    { role: "Directrice", name: "Marie Leclerc", specialty: "Nutrition & Conseil" },
    { role: "Pharmacien", name: "Philippe Moreau", specialty: "Dermatologie" },
    { role: "Pharmacien", name: "Jean-Paul Dupont", specialty: "Prévention" },
  ]

  const services = [
    { title: "Application mobile", desc: "Commandez et suivez vos livraisons." },
    { title: "Nos actualités", desc: "Infos santé et nouveautés." },
    { title: "Conseils santé", desc: "Guides pratiques quotidiens." },
    { title: "Carte des épidémies", desc: "Suivi en temps réel." },
    { title: "Téléconsultation", desc: "7j/7 de 6h à minuit." },
    { title: "Vaccinations", desc: "Sur rendez-vous." },
  ]

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-muted-foreground">
            <span className="hover:text-primary cursor-pointer transition-colors">Accueil</span>
            <span className="mx-2">/</span>
            <span className="text-foreground">Notre officine</span>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-12">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-4xl font-bold mb-2">
              <span className="inline-block translate-y-0 opacity-100 transition-all">
                PharmaPro – Votre pharmacie de proximité
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Une équipe disponible, des services digitaux modernes et des formulaires Appharma pour préparer vos
              visites en toute sérénité.
            </p>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="mx-auto max-w-7xl px-4 py-12 space-y-12">
          {/* Contact info grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border border-border rounded-2xl shadow-soft p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase mb-1">
                Adresse de l&apos;officine
              </p>
              <h3 className="font-bold mb-3 text-lg">Localisation</h3>
              <p className="text-sm text-muted-foreground">
                123 Rue du Cours
                <br />
                75000 Paris, France
              </p>
              <Button
                size="sm"
                className="mt-6 w-full bg-transparent transition-transform duration-150 hover:scale-[1.02]"
                variant="outline"
              >
                Voir sur la carte
              </Button>
            </Card>

            <Card className="border border-border rounded-2xl shadow-soft p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase mb-1">
                Contact téléphonique
              </p>
              <h3 className="font-bold mb-3 text-lg">Téléphone</h3>
              <p className="text-sm text-muted-foreground">+33 1 23 45 67 89</p>
              <p className="text-xs text-muted-foreground mt-2">
                Nous répondons pendant les horaires d&apos;ouverture de la pharmacie.
              </p>
              <Button size="sm" className="mt-6 w-full transition-transform duration-150 hover:scale-[1.02]">
                Appeler la pharmacie
              </Button>
            </Card>

            <Card className="border border-border rounded-2xl shadow-soft p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase mb-1">
                Contact par email
              </p>
              <h3 className="font-bold mb-3 text-lg">Email</h3>
              <p className="text-sm text-muted-foreground">contact@pharmapro.fr</p>
              <p className="text-xs text-muted-foreground mt-2">
                Réponse sous 4h ouvrées, hors dimanches et jours fériés.
              </p>
              <Link href="/contact" className="block mt-6">
                <Button
                  size="sm"
                  className="w-full bg-transparent transition-transform duration-150 hover:scale-[1.02]"
                  variant="outline"
                >
                  Nous écrire en ligne
                </Button>
              </Link>
            </Card>
          </div>

          {/* Horaires */}
          <Card className="border border-border rounded-2xl shadow-soft p-8 transition-all duration-200 ease-out hover:shadow-md">
            <h2 className="text-2xl font-bold mb-6">Horaires d&apos;ouverture</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {schedule.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between p-3 rounded-lg transition-colors duration-150 hover:bg-muted"
                >
                  <span className="font-medium">{item.day}</span>
                  <span className="text-muted-foreground">{item.hours}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              Consultations sans rendez-vous selon l&apos;affluence • Vaccinations et formulaires Appharma sur
              rendez-vous.
            </p>
          </Card>

          {/* Services */}
          <section>
            <h2 className="text-2xl font-bold mb-3">Nos services</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Nous combinons l&apos;expertise officinale classique avec des services digitaux pour simplifier votre
              parcours de soins : formulaires Appharma, dépôt d&apos;ordonnance en ligne et accompagnement personnalisé.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <Card
                  key={i}
                  className="border border-border rounded-2xl shadow-soft p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="font-semibold mb-2 text-base">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Équipe */}
          <Card className="border border-border rounded-2xl shadow-soft p-8 transition-all duration-200 ease-out hover:shadow-md">
            <h2 className="text-2xl font-bold mb-6">Notre équipe</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Une équipe pluridisciplinaire à votre écoute pour le conseil, la prévention et le suivi de vos
              traitements.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="p-6 bg-muted rounded-xl transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-muted/80"
                >
                  <div className="w-12 h-12 bg-primary/15 rounded-full mb-4" />
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-sm font-medium text-primary mb-1">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.specialty}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/20 text-center transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-2xl font-bold mb-4">Préparez votre visite</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Remplissez un formulaire Appharma, déposez votre ordonnance en ligne ou venez directement en officine :
              nous adaptons nos services à votre organisation et à vos besoins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalog">
                <Button className="transition-transform duration-150 hover:scale-[1.02]">Commander en ligne</Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="transition-transform duration-150 hover:scale-[1.02] bg-transparent"
                >
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
