"use client"

import type React from "react"

export const dynamic = "force-dynamic"

import { useRef, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type RxFile = {
  name: string
  size: number
  type: string
  url?: string // pour l’aperçu des images
}

const MAX_MB = 10
const ACCEPTED = ["application/pdf", "image/jpeg", "image/png"]

export default function PrescriptionPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<RxFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [pickupMode, setPickupMode] = useState<"retrait" | "livraison">("retrait")
  const [consent, setConsent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addFiles = (list: FileList | null) => {
    if (!list || !list.length) return
    setError(null)

    const incoming: RxFile[] = Array.from(list).map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type,
      url: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
    }))

    // filtre formats
    const invalid = incoming.filter((f) => !ACCEPTED.includes(f.type))
    if (invalid.length) {
      setError("Formats acceptés : PDF, JPG, PNG.")
      return
    }

    // filtre taille cumulée
    const currentTotal = files.reduce((a, b) => a + b.size, 0)
    const incomingTotal = incoming.reduce((a, b) => a + b.size, 0)
    if ((currentTotal + incomingTotal) / (1024 * 1024) > MAX_MB) {
      setError(`Poids total maximum ${MAX_MB} Mo.`)
      return
    }

    setFiles((prev) => [...prev, ...incoming])
  }

  const onClickSelect = () => inputRef.current?.click()

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => addFiles(e.target.files)

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
    if (e.type === "dragleave") setDragActive(false)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    addFiles(e.dataTransfer.files)
  }

  const removeAt = (i: number) => {
    const f = files[i]
    if (f?.url) URL.revokeObjectURL(f.url)
    setFiles((prev) => prev.filter((_, idx) => idx !== i))
  }

  const canSend = files.length > 0 && consent && !sending

  const onSubmit = async () => {
    if (!canSend) return
    setSending(true)
    setError(null)
    try {
      // TODO: branche ton endpoint ici
      // const form = new FormData()
      // files.forEach((f, i) => form.append("files", fileBlobIci, f.name))
      // form.append("mode", pickupMode)
      // await fetch("/api/prescriptions/upload", { method: "POST", body: form })
      await new Promise((r) => setTimeout(r, 900)) // mock
      setFiles([])
      setConsent(false)
      alert("Ordonnance envoyée. Vous recevrez une confirmation sous 2–4h.")
    } catch (e) {
      setError("Échec de l’envoi. Réessayez dans un instant.")
    } finally {
      setSending(false)
    }
  }

  const mockPrescriptions = [
    { id: 1, date: "15 novembre 2025", doctor: "Dr. Martin", status: "Délivré", items: 3 },
    { id: 2, date: "08 novembre 2025", doctor: "Dr. Bernard", status: "En attente", items: 2 },
  ]

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        {/* Fil d'ariane */}
        <div className="border-b bg-white">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>
            <span className="mx-1.5 sm:mx-2">/</span>
            <span className="text-foreground">Envoyer une ordonnance</span>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="inline-block translate-y-0 opacity-100">Envoyer mon ordonnance</span>
          </h1>
          <p className="mt-2 text-muted-foreground max-w-3xl">
            Un parcours simple : déposez vos fichiers, choisissez “Retrait” ou “Livraison”, validez. Un pharmacien
            vérifie et vous confirme la préparation.
          </p>

          {/* Bandeau d’explication rapide */}
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              { n: 1, t: "Déposez l’ordonnance", d: "PDF ou photo nette, recto/verso si nécessaire." },
              { n: 2, t: "Vérification (2–4h)", d: "Un pharmacien valide la conformité et prépare." },
              { n: 3, t: "Retrait", d: "En officine munis de votre ordonnance." },
            ].map((s) => (
              <Card
                key={s.n}
                className="rounded-2xl border bg-white p-5 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-semibold shadow-sm">
                    {s.n}
                  </div>
                  <div>
                    <div className="font-semibold">{s.t}</div>
                    <div className="text-sm text-muted-foreground">{s.d}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-8">
              {/* Zone d’upload */}
              <Card
                className={`rounded-2xl border-2 border-dashed bg-white transition-all duration-200 ease-out hover:shadow-md ${
                  dragActive ? "border-primary bg-primary/5 shadow-md scale-[1.01]" : "border-border"
                }`}
              >
                <div
                  className="p-10 text-center cursor-pointer"
                  onDragEnter={onDrag}
                  onDragOver={onDrag}
                  onDragLeave={onDrag}
                  onDrop={onDrop}
                  role="button"
                  aria-label="Déposer votre ordonnance ici"
                  onClick={onClickSelect}
                >
                  <div className="text-5xl mb-3 transition-transform duration-150 group-hover:-translate-y-1">📤</div>
                  <div className="text-xl font-semibold">Glissez-déposez votre ordonnance</div>
                  <div className="mt-1 text-sm text-muted-foreground">ou</div>
                  <div className="mt-4">
                    <Button className="transition-transform duration-150 hover:scale-[1.02]">
                      Sélectionner des fichiers
                    </Button>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Formats acceptés : PDF, JPG, PNG • Taille totale ≤ {MAX_MB} Mo
                  </div>
                  <input
                    ref={inputRef}
                    type="file"
                    accept={ACCEPTED.join(",")}
                    multiple
                    className="hidden"
                    onChange={onChangeInput}
                  />
                </div>
              </Card>

              {/* Liste / aperçus */}
              {files.length > 0 && (
                <Card className="rounded-2xl border bg-white p-5 transition-all duration-200 ease-out hover:shadow-md">
                  <div className="mb-3 font-semibold">Fichiers sélectionnés ({files.length})</div>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {files.map((f, i) => (
                      <li
                        key={f.name + i}
                        className="rounded-lg border p-3 transition-all duration-150 hover:-translate-y-1 hover:border-primary/60 hover:shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          {f.url ? (
                            <img
                              src={f.url || "/placeholder.svg"}
                              alt={f.name}
                              className="h-12 w-12 rounded object-cover border"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded border bg-muted/40">
                              📄
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium">{f.name}</div>
                            <div className="text-xs text-muted-foreground">{(f.size / 1024 / 1024).toFixed(2)} Mo</div>
                          </div>
                          <button
                            className="ml-auto text-xs font-medium text-red-600 hover:text-red-700 hover:underline transition-colors"
                            onClick={() => removeAt(i)}
                            aria-label={`Retirer ${f.name}`}
                          >
                            Retirer
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Options + consentement */}
              <Card className="rounded-2xl border bg-white p-5 transition-all duration-200 ease-out hover:shadow-md">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="font-semibold mb-2">Mode de réception</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPickupMode("retrait")}
                        className={`rounded-full border px-3 py-1 text-sm transition-all duration-150 ${
                          pickupMode === "retrait"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border text-muted-foreground hover:text-foreground hover:bg-muted/60"
                        }`}
                        aria-pressed={pickupMode === "retrait"}
                      >
                        Retrait en officine
                      </button>
                      <button
                        onClick={() => setPickupMode("livraison")}
                        className={`rounded-full border px-3 py-1 text-sm transition-all duration-150 ${
                          pickupMode === "livraison"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border text-muted-foreground hover:text-foreground hover:bg-muted/60"
                        }`}
                        aria-pressed={pickupMode === "livraison"}
                      >
                        Livraison
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {pickupMode === "retrait"
                        ? "Vous recevrez une confirmation quand la commande est prête."
                        : "La livraison est disponible selon votre adresse."}
                    </p>
                  </div>

                  <div className="md:justify-self-end">
                    <label className="inline-flex cursor-pointer items-start gap-2">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1"
                      />
                      <span className="text-sm">
                        J’accepte que mes documents soient traités pour la préparation de mon ordonnance.{" "}
                        <Link href="/conformite" className="text-primary underline hover:text-primary/80">
                          En savoir plus
                        </Link>
                        .
                      </span>
                    </label>
                  </div>
                </div>

                {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

                <div className="mt-5">
                  <Button
                    className="w-full transition-transform duration-150 hover:scale-[1.01] disabled:hover:scale-100"
                    onClick={onSubmit}
                    disabled={!canSend}
                  >
                    {sending ? "Envoi en cours…" : "Envoyer mon ordonnance"}
                  </Button>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Délai moyen de vérification : 2–4 h (hors horaires fermés).
                  </p>
                </div>
              </Card>

              {/* Conseils qualité */}
              <Card className="rounded-2xl border bg-blue-50 p-5 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md">
                <div className="flex gap-3">
                  <div className="text-xl">ⓘ</div>
                  <div>
                    <div className="font-semibold text-blue-900">Pour une lecture optimale</div>
                    <ul className="mt-1 list-disc pl-5 text-sm text-blue-900/90">
                      <li>Photo nette, sans reflet, texte lisible.</li>
                      <li>Recto/verso si des informations figurent au dos.</li>
                      <li>Inclure la carte Vitale / mutuelle si demandée.</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="rounded-2xl border bg-white p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md">
                <div className="font-semibold mb-2">Questions fréquentes</div>
                <details className="mb-2 group">
                  <summary className="cursor-pointer text-sm font-medium group-open:text-primary transition-colors">
                    Puis-je envoyer plusieurs fichiers ?
                  </summary>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Oui, ajoutez autant d’images (recto/verso) qu’il faut, jusqu’à {MAX_MB} Mo au total.
                  </p>
                </details>
                <details className="mb-2 group">
                  <summary className="cursor-pointer text-sm font-medium group-open:text-primary transition-colors">
                    Quels formats ?
                  </summary>
                  <p className="mt-1 text-sm text-muted-foreground">PDF, JPG, PNG.</p>
                </details>
                <details className="group">
                  <summary className="cursor-pointer text-sm font-medium group-open:text-primary transition-colors">
                    Combien de temps pour la validation ?
                  </summary>
                  <p className="mt-1 text-sm text-muted-foreground">Généralement 2–4 h en horaires d’ouverture.</p>
                </details>
              </Card>

              <Card className="rounded-2xl border bg-white p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md">
                <div className="font-semibold mb-4">Historique</div>
                <div className="space-y-3">
                  {mockPrescriptions.map((rx) => (
                    <div
                      key={rx.id}
                      className="rounded-lg p-3 transition-all duration-150 hover:-translate-y-1 hover:bg-muted"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{rx.date}</div>
                        <div className="text-lg" aria-label={rx.status}>
                          {rx.status === "Délivré" ? "✓" : "⏳"}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {rx.doctor} • {rx.items} article{rx.items > 1 ? "s" : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
