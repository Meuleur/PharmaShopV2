"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { SearchBar } from "./search-bar"
import { SearchModal } from "@/components/search/search-modal"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { useCart } from "@/lib/cart-context"
import { Search, Heart, ShoppingCart, Menu, X, Video, Percent, Stethoscope } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { items } = useCart()
  const cartCount = items?.length ?? 0

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Overlay pour menu mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 border-b border-emerald-400/20 text-emerald-50 transition-all duration-300 ${
          scrolled
            ? "bg-emerald-900/95 shadow-lg backdrop-blur-md"
            : "bg-gradient-to-b from-emerald-900/90 to-emerald-800/80 backdrop-blur supports-[backdrop-filter]:bg-emerald-900/70"
        }`}
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-4 py-2 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <Link
              href="/"
              className="group flex items-center gap-2 sm:gap-3 shrink-0"
              aria-label="Aller à l'accueil Elsie Santé"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-white/95 px-2 py-1 sm:px-3 sm:py-1.5 shadow-sm ring-1 ring-emerald-200/50">
                <Image
                  src="/logo-elsie.svg"
                  alt="Elsie Santé"
                  width={132}
                  height={28}
                  priority
                  className="h-5 sm:h-7 w-auto"
                />
              </div>
              {/* Badge nom officine - masqué sur mobile */}
              <span className="hidden lg:inline rounded-full bg-emerald-700/40 px-2.5 py-1 text-[11px] font-medium text-emerald-50 ring-1 ring-emerald-400/30">
                Pharmacie Croix d'Or
              </span>
            </Link>

            {/* Search (desktop) */}
            <div className="hidden md:flex flex-1 max-w-md">
              <SearchBar onSearchClick={() => setSearchOpen(true)} />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
              {/* Mobile search */}
              <Link
                href="/search"
                className="inline-flex items-center justify-center rounded-lg p-1.5 sm:p-2 hover:bg-emerald-700/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 md:hidden"
                aria-label="Rechercher"
              >
                <Search className="h-5 w-5" />
              </Link>

              {/* Favorites - masqué sur très petit écran */}
              <Link
                href="/favorites"
                className="hidden xs:inline-flex sm:inline-flex items-center justify-center rounded-lg p-1.5 sm:p-2 hover:bg-emerald-700/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                aria-label="Mes favoris"
              >
                <Heart className="h-5 w-5" />
              </Link>

              {/* Téléconsultation */}
              <Link
                href="/teleconsult"
                className="hidden lg:inline-flex items-center gap-2 rounded-lg border border-emerald-300/40 bg-white/10 px-3 py-2 text-sm font-medium text-emerald-50 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                aria-label="Téléconsultation"
              >
                <Video className="h-4 w-4 text-emerald-200" />
                <span>Téléconsultation</span>
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative inline-flex items-center justify-center rounded-lg p-1.5 sm:p-2 hover:bg-emerald-700/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                aria-label="Ouvrir le panier"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span
                    className="absolute -right-0.5 sm:-right-1 -top-0.5 sm:-top-1 inline-flex h-4 sm:h-5 min-w-[16px] sm:min-w-[20px] items-center justify-center rounded-full bg-emerald-500 px-1 sm:px-1.5 text-[9px] sm:text-[10px] font-bold text-white"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="inline-flex items-center justify-center rounded-lg p-1.5 sm:p-2 hover:bg-emerald-700/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 md:hidden"
                aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile search (full width) */}
          <div className="md:hidden mt-2 sm:mt-3">
            <SearchBar onSearchClick={() => setSearchOpen(true)} />
          </div>
        </div>

        {/* Mobile navigation */}
        <nav
          id="mobile-nav"
          className={`absolute left-0 right-0 top-full md:hidden bg-emerald-900/95 backdrop-blur-md border-b border-emerald-400/20 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden z-50 ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-0.5 p-2 sm:p-3 text-sm">
            <Link
              href="/catalog"
              className="rounded-lg px-3 py-2 hover:bg-emerald-800/60 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tous les produits
            </Link>
            <Link
              href="/promotions"
              className="rounded-lg px-3 py-2 hover:bg-emerald-800/60 transition-colors flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Percent className="h-4 w-4" />
              Promotions
            </Link>
            <Link
              href="/services"
              className="rounded-lg px-3 py-2 hover:bg-emerald-800/60 transition-colors flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Stethoscope className="h-4 w-4" />
              Nos services
            </Link>
            <Link
              href="/brands"
              className="rounded-lg px-3 py-2 hover:bg-emerald-800/60 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Marques
            </Link>
            <Link
              href="/prescription"
              className="rounded-lg px-3 py-2 hover:bg-emerald-800/60 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Mon ordonnance
            </Link>
            <Link
              href="/teleconsult"
              className="rounded-lg px-3 py-2 hover:bg-emerald-800/60 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Téléconsultation
            </Link>
            <Link
              href="/pharmacy-info"
              className="rounded-lg px-3 py-2 hover:bg-emerald-800/60 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Notre officine
            </Link>
          </div>
        </nav>
      </header>

      {/* Secondary nav (desktop) */}
      <nav className="hidden md:block border-b border-emerald-400/15 bg-emerald-950/60 text-emerald-100 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-8 py-3 text-sm">
            <Link href="/catalog" className="font-medium hover:text-white transition-colors">
              Tous les produits
            </Link>
            <Link
              href="/promotions"
              className="font-medium hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Percent className="h-4 w-4" />
              Promotions
            </Link>
            <Link href="/services" className="font-medium hover:text-white transition-colors flex items-center gap-1.5">
              <Stethoscope className="h-4 w-4" />
              Nos services
            </Link>
            <Link href="/brands" className="font-medium hover:text-white transition-colors">
              Marques
            </Link>
            <Link href="/prescription" className="font-medium hover:text-white transition-colors">
              Mon ordonnance
            </Link>
            <Link href="/teleconsult" className="font-medium hover:text-white transition-colors">
              Téléconsultation
            </Link>
            <Link href="/pharmacy-info" className="ml-auto font-medium hover:text-white transition-colors">
              Notre officine
            </Link>
          </div>
        </div>
      </nav>

      {/* Cart drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
