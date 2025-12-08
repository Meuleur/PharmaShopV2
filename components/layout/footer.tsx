import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative mt-0 -mt-px bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-emerald-50"
    >
      {/* subtle top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-emerald-400/40" />

      <div className="relative mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/logo-elsie.svg"
                alt="Elsie Santé"
                width={150}
                height={50}
                priority
                className="h-7 w-auto"
              />
              <span className="sr-only">Elsie Santé</span>
              
            </div>
            <p className="text-sm text-emerald-100/80">
              Votre pharmacie en ligne de confiance, conseils de pharmaciens et
              traçabilité HDS.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-200">
              Produits
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalog" className="text-emerald-100/90 hover:text-white transition-colors">
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-emerald-100/90 hover:text-white transition-colors">
                  Marques
                </Link>
              </li>
              <li>
                <Link href="/prescription" className="text-emerald-100/90 hover:text-white transition-colors">
                  Ordonnances
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-200">
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/teleconsult" className="text-emerald-100/90 hover:text-white transition-colors">
                  Téléconsultation
                </Link>
              </li>
              <li>
                <Link href="/pharmacy-info" className="text-emerald-100/90 hover:text-white transition-colors">
                  Notre officine
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-emerald-100/90 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-200">
              Légal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/privacy" className="text-emerald-100/90 hover:text-white transition-colors">
                  Politique RGPD
                </Link>
              </li>
              <li>
                <Link href="/legal/hds" className="text-emerald-100/90 hover:text-white transition-colors">
                  Certif. HDS
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-emerald-100/90 hover:text-white transition-colors">
                  Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact info */}
        <div className="border-t border-emerald-400/30 pt-8 mb-8">
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700/40 ring-1 ring-emerald-400/30">📞</span>
              <span className="text-emerald-100/90">+33 1 23 45 67 89</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700/40 ring-1 ring-emerald-400/30">📧</span>
              <span className="text-emerald-100/90">contact@pharmapro.fr</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700/40 ring-1 ring-emerald-400/30">📍</span>
              <span className="text-emerald-100/90">123 Rue du Cours, 75000 Paris</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-emerald-400/30 pt-8 text-xs text-emerald-200 md:flex-row">
          <p>&copy; 2025 PharmaPro. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-700/40 px-2.5 py-1 ring-1 ring-emerald-400/30">✅ Certifié HDS</span>
            <span className="rounded-full bg-emerald-700/40 px-2.5 py-1 ring-1 ring-emerald-400/30">🔐 RGPD Conforme</span>
            <span className="rounded-full bg-emerald-700/40 px-2.5 py-1 ring-1 ring-emerald-400/30">🏥 Pharmacie Agréée</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
