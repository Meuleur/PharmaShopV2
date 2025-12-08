"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Pharmacist = {
  id: string
  name: string
  specialty: string
  availability: string
}

const pharmacists: Pharmacist[] = [
  { id: "anne", name: "Anne Lavigne", specialty: "Nutrition & bien-être", availability: "Créneaux aujourd'hui" },
  { id: "philippe", name: "Philippe Moreau", specialty: "Peau & dermatologie", availability: "Créneaux aujourd'hui" },
  { id: "marie", name: "Marie Claire", specialty: "Allergies & immunité", availability: "Créneaux demain" },
]

const quickDays = ["Aujourd'hui", "Demain", "Dans 2 jours"]
const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]

export default function TeleconsultPage() {
  const [selectedPharmacist, setSelectedPharmacist] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const isReadyToConfirm = selectedPharmacist && selectedDate && selectedTime

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>
            <span className="mx-1.5 sm:mx-2">/</span>
            <span className="text-foreground">Téléconsultation</span>
          </div>
        </div>

        {/* Hero */}
        <section className="border-b bg-gradient-to-br from-primary/5 via-background to-accent/10">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-10 md:py-14 grid gap-6 sm:gap-8 md:grid-cols-2 items-center">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                Téléconsultation pharmaceutique encadrée
              </h1>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                Échangez à distance avec un pharmacien pour vos questions de traitement ou de prévention.
              </p>
              <div className="mt-4 sm:mt-6 grid gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="mt-1 sm:mt-[3px] h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>Consultations de 15 à 30 minutes, sur rendez-vous.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 sm:mt-[3px] h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>Échanges par des pharmaciens diplômés.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 sm:mt-[3px] h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>Respect de la confidentialité.</span>
                </div>
              </div>
            </div>

            <Card className="hidden sm:block rounded-xl sm:rounded-2xl border bg-white/90 backdrop-blur p-4 sm:p-6 shadow-soft">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Déroulé d'une téléconsultation</h2>
              <ol className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">1.</span> Choix du pharmacien.
                </li>
                <li>
                  <span className="font-medium text-foreground">2.</span> Sélection du créneau.
                </li>
                <li>
                  <span className="font-medium text-foreground">3.</span> Lien sécurisé envoyé.
                </li>
                <li>
                  <span className="font-medium text-foreground">4.</span> Compte-rendu disponible.
                </li>
              </ol>
            </Card>
          </div>
        </section>

        {/* Main content */}
        <section className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-10 md:py-14">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
            {/* Booking column */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <Card className="border border-border rounded-xl sm:rounded-2xl shadow-soft p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Prendre rendez-vous</h2>

                {/* Pharmacist selection */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2 sm:mb-3">
                    Choix du pharmacien
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {pharmacists.map((pharm) => (
                      <button
                        key={pharm.id}
                        type="button"
                        onClick={() => setSelectedPharmacist(pharm.id)}
                        className={`w-full text-left p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all duration-150 flex items-start justify-between gap-2 sm:gap-3 ${
                          selectedPharmacist === pharm.id
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary/10 text-[10px] sm:text-xs font-semibold text-primary shrink-0">
                            {pharm.name
                              .split(" ")
                              .slice(0, 2)
                              .map((p) => p[0])
                              .join("")}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-sm sm:text-base truncate">{pharm.name}</div>
                            <div className="text-xs sm:text-sm text-muted-foreground truncate">{pharm.specialty}</div>
                          </div>
                        </div>
                        <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-medium text-accent whitespace-nowrap">
                          {pharm.availability}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date selection */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2 sm:mb-3">
                    Date préférée
                  </h3>
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    {quickDays.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setSelectedDate(day)}
                        className={`p-2 sm:p-3 rounded-lg border text-xs sm:text-sm transition-all ${
                          selectedDate === day
                            ? "border-primary bg-primary/5 text-primary font-semibold"
                            : "border-border hover:bg-muted"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time selection */}
                {selectedDate && (
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2 sm:mb-3">
                      Créneau horaire
                    </h3>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 sm:p-3 rounded-lg border text-xs sm:text-sm font-medium transition-all ${
                            selectedTime === time
                              ? "border-primary bg-primary text-white"
                              : "border-border hover:bg-muted"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Patient info */}
                {selectedTime && (
                  <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-muted rounded-lg sm:rounded-xl space-y-3 sm:space-y-4">
                    <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Informations pratiques
                    </h3>
                    <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-xs sm:text-sm font-medium block mb-1">Nom et prénom</label>
                        <input
                          type="text"
                          placeholder="Jean Dupont"
                          className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-border rounded-lg text-xs sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs sm:text-sm font-medium block mb-1">Adresse e-mail</label>
                        <input
                          type="email"
                          placeholder="jean@example.com"
                          className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-border rounded-lg text-xs sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium block mb-1">Motif</label>
                      <textarea
                        placeholder="Votre motif de consultation..."
                        rows={3}
                        className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-border rounded-lg text-xs sm:text-sm resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="space-y-3 sm:space-y-4">
                  <Button className="w-full text-sm sm:text-base" disabled={!isReadyToConfirm}>
                    Confirmer la demande
                  </Button>
                  <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
                    Vous recevrez un e-mail de confirmation avec le lien sécurisé.
                  </p>
                </div>
              </Card>
            </div>

            {/* Info sidebar */}
            <aside className="space-y-4 sm:space-y-6">
              <Card className="border border-border rounded-xl sm:rounded-2xl shadow-soft p-4 sm:p-6 bg-accent/5">
                <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Tarifs</h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span>Conseil pharmaceutique</span>
                    <span className="font-semibold text-accent">Sans surcoût</span>
                  </div>
                </div>
              </Card>

              <Card className="border border-border rounded-xl sm:rounded-2xl shadow-soft p-4 sm:p-6">
                <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Points clés</h3>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <li>• Accès facilité au pharmacien.</li>
                  <li>• Préparation des consultations.</li>
                  <li>• Suivi renforcé des traitements.</li>
                </ul>
              </Card>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
