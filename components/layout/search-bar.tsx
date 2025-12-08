"use client"

import { Input } from "@/components/ui/input"

interface SearchBarProps {
  onSearchClick: () => void
}

export function SearchBar({ onSearchClick }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none">🔍</span>
      <Input
        placeholder="Rechercher produits, marques..."
        className="pl-10 w-full rounded-lg border-input bg-input placeholder:text-muted-foreground cursor-pointer"
        readOnly
        onClick={onSearchClick}
        value=""
      />
    </div>
  )
}
