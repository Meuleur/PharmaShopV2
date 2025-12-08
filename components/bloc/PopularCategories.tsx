// en haut du fichier
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type Cat = {
  label: string
  slug: string
  image?: string
  tag?: "Top ventes" | "Nouveautés" | "-15% cette semaine"
  count?: number // si tu as la donnée
}

const categories: Cat[] = [
  { label: "Bien-être", slug: "bien-etre", image: "/cats/bien-etre.jpg", tag: "Top ventes", count: 1240 },
  { label: "Beauté & Hygiène", slug: "beaute-hygiene", image: "/cats/beaute.jpg", tag: "-15% cette semaine", count: 980 },
  { label: "Prévention", slug: "prevention", image: "/cats/prevention.jpg", tag: "Nouveautés", count: 360 },
  { label: "Nutrition", slug: "nutrition", image: "/cats/nutrition.jpg", count: 720 },
]

export function PopularCategories() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold md:text-3xl">Catégories populaires</h2>
          <Link
            href="/catalog"
            className="group inline-flex items-center text-sm font-medium text-primary"
          >
            Tout le catalogue
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/catalog?category=${encodeURIComponent(c.slug)}`}
              aria-label={`Voir ${c.label}`}
              className="group"
            >
              <Card className="h-48 overflow-hidden rounded-2xl transition hover:shadow-md">
                <div className="relative h-full w-full">
                  {/* image / fond */}
                  {c.image ? (
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 25vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      priority={false}
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-tr from-primary/10 via-accent/10 to-muted" />
                  )}

                  {/* voiles & glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                       style={{ background: "radial-gradient(60% 50% at 50% 90%, rgba(59,130,246,0.22), transparent 60%)" }} />

                  {/* contenu */}
                  <CardContent className="absolute inset-0 flex flex-col justify-end p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-primary/20 to-accent/30 ring-1 ring-white/20" />
                      {c.tag && (
                        <span className="rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-medium text-gray-900 backdrop-blur-sm">
                          {c.tag}
                        </span>
                      )}
                    </div>

                    <div className="mt-2">
                      <div className="font-medium text-white drop-shadow-sm">{c.label}</div>
                      <div className="text-xs text-white/80">
                        {typeof c.count === "number" ? `${c.count.toLocaleString("fr-FR")} produits` : "Découvrir"}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* raccourcis filtres (facultatif) */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { label: "Bio", q: "tag=bio" },
            { label: "Sans ordonnance", q: "tag=sans-ordonnance" },
            { label: "Bébé & Maman", q: "tag=bebe" },
            { label: "Sport", q: "tag=sport" },
          ].map((f) => (
            <Link
              key={f.q}
              href={`/catalog?${f.q}`}
              className="rounded-full border px-3 py-1 text-xs text-muted-foreground transition hover:border-primary hover:text-primary"
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
