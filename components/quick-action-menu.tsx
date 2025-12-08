"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { FileText, Video, ShoppingBag, MessageSquareText, X } from "lucide-react"

export function QuickActionMenu() {
  const [quickMenuOpen, setQuickMenuOpen] = useState(false)
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const dockRef = useRef<HTMLDivElement | null>(null)
  const [dockBottom, setDockBottom] = useState(16)

  useEffect(() => {
    const updateDock = () => {
      const footer = document.getElementById("site-footer")
      const dockEl = dockRef.current
      if (!footer || !dockEl) return

      const footerRect = footer.getBoundingClientRect()
      const vh = window.innerHeight
      const naturalBottom = 16

      const dockBottomEdge = vh - naturalBottom
      const overlap = Math.max(0, dockBottomEdge - footerRect.top)
      const nextBottom = naturalBottom + (overlap > 0 ? overlap + 8 : 0)
      setDockBottom(nextBottom)
    }

    updateDock()
    window.addEventListener("scroll", updateDock, { passive: true })
    window.addEventListener("resize", updateDock)
    return () => {
      window.removeEventListener("scroll", updateDock)
      window.removeEventListener("resize", updateDock)
    }
  }, [])

  return (
    <>
      {/* Desktop Quick Dock - toujours visible */}
      <nav
        ref={dockRef}
        aria-label="Actions rapides"
        className="fixed right-4 z-50 hidden md:flex"
        style={{ bottom: dockBottom }}
      >
        <div className="relative flex items-end">
          <div className="flex flex-col gap-2">
            <Link
              href="/prescription"
              className="rounded-full border bg-white px-4 py-2 shadow-md transition hover:shadow-lg"
            >
              <span className="inline-flex items-center text-sm font-medium">
                <FileText className="mr-2 h-4 w-4" /> Envoyer ordonnance
              </span>
            </Link>

            <Link
              href="/teleconsult"
              className="rounded-full border bg-white px-4 py-2 shadow-md transition hover:shadow-lg"
            >
              <span className="inline-flex items-center text-sm font-medium">
                <Video className="mr-2 h-4 w-4" /> Téléconsultation
              </span>
            </Link>

            <Link
              href="/catalog"
              className="rounded-full border bg-white px-4 py-2 shadow-md transition hover:shadow-lg"
            >
              <span className="inline-flex items-center text-sm font-medium">
                <ShoppingBag className="mr-2 h-4 w-4" /> Catalogue
              </span>
            </Link>

            <button
              onClick={() => setChatbotOpen(true)}
              aria-label="Ouvrir le chat de conseils"
              className="rounded-full border border-primary bg-primary px-4 py-2 text-white shadow-md transition hover:shadow-lg hover:brightness-95"
            >
              <span className="inline-flex items-center text-sm font-medium">
                <MessageSquareText className="mr-2 h-4 w-4" />
                Besoin d'un conseil ?
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div className="fixed bottom-3 right-3 z-50 md:hidden">
        {quickMenuOpen && (
          <div className="mb-2 flex flex-col gap-1.5 animate-in slide-in-from-bottom-4 fade-in duration-200">
            <Link
              href="/prescription"
              onClick={() => setQuickMenuOpen(false)}
              className="rounded-full border bg-white px-3 py-2 shadow-lg transition hover:shadow-xl"
            >
              <span className="inline-flex items-center text-xs font-medium">
                <FileText className="mr-1.5 h-3.5 w-3.5" /> Ordonnance
              </span>
            </Link>

            <Link
              href="/teleconsult"
              onClick={() => setQuickMenuOpen(false)}
              className="rounded-full border bg-white px-3 py-2 shadow-lg transition hover:shadow-xl"
            >
              <span className="inline-flex items-center text-xs font-medium">
                <Video className="mr-1.5 h-3.5 w-3.5" /> Téléconsult
              </span>
            </Link>

            <Link
              href="/catalog"
              onClick={() => setQuickMenuOpen(false)}
              className="rounded-full border bg-white px-3 py-2 shadow-lg transition hover:shadow-xl"
            >
              <span className="inline-flex items-center text-xs font-medium">
                <ShoppingBag className="mr-1.5 h-3.5 w-3.5" /> Catalogue
              </span>
            </Link>

            <button
              onClick={() => {
                setQuickMenuOpen(false)
                setChatbotOpen(true)
              }}
              className="rounded-full border border-primary bg-primary px-3 py-2 text-white shadow-lg transition hover:brightness-95 active:scale-95"
            >
              <span className="inline-flex items-center text-xs font-medium whitespace-nowrap">
                <MessageSquareText className="mr-1.5 h-3.5 w-3.5" />
                Conseil
              </span>
            </button>
          </div>
        )}

        <button
          onClick={() => setQuickMenuOpen(!quickMenuOpen)}
          className="rounded-full border-2 border-primary bg-primary px-3 py-2.5 text-white shadow-xl transition hover:brightness-95 active:scale-95"
          aria-label={quickMenuOpen ? "Fermer le menu rapide" : "Ouvrir le menu rapide"}
        >
          {quickMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <span className="inline-flex items-center text-xs font-medium whitespace-nowrap">
              <MessageSquareText className="mr-1.5 h-4 w-4" />
              Menu
            </span>
          )}
        </button>
      </div>

      {/* Chatbot Modal */}
      {chatbotOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50" onClick={() => setChatbotOpen(false)}>
          {/* Mobile: Full width bottom sheet */}
          <div
            className="md:hidden absolute bottom-0 left-0 right-0 flex h-[80vh] flex-col rounded-t-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-3 py-3">
              <div className="flex items-center gap-2">
                <MessageSquareText className="h-4 w-4 text-primary" />
                <h2 className="text-base font-semibold">Conseils</h2>
              </div>
              <button
                onClick={() => setChatbotOpen(false)}
                className="rounded-full p-1.5 hover:bg-gray-100 transition"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <MessageSquareText className="h-10 w-10 mb-3 text-primary/20" />
                <p className="text-xs">Le chatbot IA sera intégré ici</p>
              </div>
            </div>

            <div className="border-t p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Posez votre question..."
                  className="flex-1 rounded-full border px-3 py-2 text-sm outline-none"
                  disabled
                />
                <button className="rounded-full bg-primary px-3 py-2 text-white text-sm" disabled>
                  Envoyer
                </button>
              </div>
            </div>
          </div>

          {/* Desktop: Right side panel */}
          <div
            className="hidden md:flex absolute right-0 top-0 bottom-0 w-[400px] flex-col bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div className="flex items-center gap-3">
                <MessageSquareText className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Conseils personnalisés</h2>
              </div>
              <button
                onClick={() => setChatbotOpen(false)}
                className="rounded-full p-2 hover:bg-gray-100 transition"
                aria-label="Fermer le chatbot"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <MessageSquareText className="h-16 w-16 mb-6 text-primary/20" />
                <p className="text-base">Le chatbot IA sera intégré ici</p>
                <p className="text-sm mt-2">Interface prête pour l'intégration</p>
              </div>
            </div>

            <div className="border-t p-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Posez votre question..."
                  className="flex-1 rounded-full border px-4 py-3 text-sm outline-none focus:border-primary"
                  disabled
                />
                <button
                  className="rounded-full bg-primary px-6 py-3 text-white hover:brightness-95 transition"
                  disabled
                >
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
