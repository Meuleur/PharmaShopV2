"use client"

import * as React from "react"
import {
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandSeparator,
  Command,
} from "@/components/ui/command"
import { X } from "lucide-react"

type SearchResult = {
  id: string
  name: string
  category: string
  brand: string
}

function useDebounced<T>(value: T, delay = 150) {
  const [v, setV] = React.useState(value)
  React.useEffect(() => {
    const t = setTimeout(() => setV(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return v
}

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = React.useState("")
  const debounced = useDebounced(query, 120)

  const allProducts: SearchResult[] = [
    { id: "1", name: "Vitamine C 1000mg", category: "Nutrition", brand: "Arkopharma" },
    { id: "2", name: "Crème hydratante", category: "Beauté", brand: "Avène" },
    { id: "3", name: "Spray nasal", category: "Prévention", brand: "Otrivin" },
    { id: "4", name: "Pansements stériles", category: "Fournitures", brand: "Steroplast" },
    { id: "5", name: "Gel douche doux", category: "Hygiène", brand: "Cetaphil" },
    { id: "6", name: "Masque facial anti-âge", category: "Beauté", brand: "Filorga" },
  ]

  const trending = ["Vitamines", "Masques", "Crèmes", "Suppléments"]
  const [recents, setRecents] = React.useState<string[]>([
    "Paracétamol",
    "Antibactérien",
    "Savon mains",
  ])

  const filtered = React.useMemo(() => {
    const q = debounced.trim().toLowerCase()
    if (!q) return []
    return allProducts.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
  }, [debounced])

  function selectTerm(term: string) {
    setQuery(term)
  }

  function selectResult(r: SearchResult) {
    // TODO: router vers la page produit
    // router.push(`/produits/${r.id}`)
    // Sauvegarde "recent"
    setRecents((prev) => {
      const next = [r.name, ...prev.filter(x => x !== r.name)].slice(0, 5)
      return next
    })
    onClose()
  }

  function highlight(label: string, q: string) {
    if (!q) return label
    const i = label.toLowerCase().indexOf(q.toLowerCase())
    if (i === -1) return label
    return (
      <>
        {label.slice(0, i)}
        <mark className="rounded px-0.5 bg-accent/20 text-foreground">{label.slice(i, i + q.length)}</mark>
        {label.slice(i + q.length)}
      </>
    )
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm animate-in fade-in-0"
        onClick={onClose}
      />
      <div className="fixed top-[64px] md:top-4 left-1/2 -translate-x-1/2 z-[101] w-[calc(100%-2rem)] max-w-2xl">
        <Command className="bg-background rounded-lg border shadow-lg [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5 animate-in zoom-in-95 slide-in-from-top-2">
          <div className="px-1 pt-1 relative">
            <CommandInput
              autoFocus
              value={query}
              onValueChange={setQuery}
              placeholder="Rechercher produits, marques, catégories…"
              className="placeholder:text-muted-foreground"
            />
            <button
              onClick={onClose}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fermer</span>
            </button>
          </div>

          <CommandList className="bg-card text-card-foreground max-h-[400px]">
        {/* Quand il y a une requête */}
        {debounced ? (
          <>
            <CommandEmpty>Aucun résultat pour « {debounced} »</CommandEmpty>
            <CommandGroup heading="Résultats">
              {filtered.map((r) => (
                <CommandItem
                  key={r.id}
                  value={`${r.name} ${r.brand} ${r.category}`}
                  onSelect={() => selectResult(r)}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{highlight(r.name, debounced)}</span>
                    <span className="text-xs text-muted-foreground">
                      {highlight(r.brand, debounced)} • {highlight(r.category, debounced)}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        ) : (
          // Pas de requête → Tendances + Récents
          <>
            <CommandGroup heading="Tendances">
              <div className="px-2 pb-2 flex flex-wrap gap-2">
                {trending.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => selectTerm(t)}
                    className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 ring-1 ring-border transition"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Récents">
              {recents.map((r) => (
                <CommandItem
                  key={r}
                  value={r}
                  onSelect={() => selectTerm(r)}
                  className="cursor-pointer"
                >
                  {r}
                </CommandItem>
              ))}
              {recents.length > 0 && (
                <div className="px-2 pb-2">
                  <button
                    type="button"
                    onClick={() => setRecents([])}
                    className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
                  >
                    Effacer l’historique
                  </button>
                </div>
              )}
            </CommandGroup>
          </>
        )}
          </CommandList>
        </Command>
      </div>
    </>
  )
}
