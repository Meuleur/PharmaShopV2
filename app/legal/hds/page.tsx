import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function HDSPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Certification HDS (Hébergement de Données de Santé)</h1>

          <div className="space-y-8">
            {/* Certificate info */}
            <div className="bg-accent/10 border border-accent/20 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">✓</span>
                <div>
                  <h2 className="text-2xl font-bold mb-2">PharmaPro est certifié HDS</h2>
                  <p className="text-muted-foreground">Numéro de certification : HDS-2024-PHARMAPRO-001</p>
                  <p className="text-sm text-muted-foreground mt-2">Validité : 2024-2027</p>
                </div>
              </div>
            </div>

            {/* What is HDS */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Qu'est-ce que la certification HDS ?</h2>
              <p className="text-muted-foreground mb-4">
                La Certification HDS (Hébergement de Données de Santé) est un label français délivré par la HAS (Haute
                Autorité de Santé) qui certifie la conformité des prestataires d'hébergement de données de santé avec
                les normes de sécurité et de confidentialité les plus strictes.
              </p>
            </section>

            {/* Commitments */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Nos engagements HDS</h2>
              <div className="grid md:grid-cols-2 gap-4 space-y-4">
                {[
                  { title: "Sécurité des données", desc: "Chiffrement et sécurisation des données de santé" },
                  { title: "Disponibilité", desc: "Garantie de 99.9% de disponibilité des services" },
                  { title: "Confidentialité", desc: "Respect du secret médical et du RGPD" },
                  { title: "Traçabilité", desc: "Logs de tous les accès aux données" },
                  { title: "Conformité", desc: "Audits réguliers et mise à jour des normes" },
                  { title: "Support", desc: "Assistance dédiée 24/7 en cas d'incident" },
                ].map((item, i) => (
                  <div key={i} className="bg-muted rounded-lg p-4">
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical measures */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Mesures techniques de sécurité</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Chiffrement des données en transit (TLS 1.3)</li>
                <li>• Chiffrement des données au repos (AES-256)</li>
                <li>• Authentification multi-facteurs</li>
                <li>• Contrôle d'accès basé sur les rôles (RBAC)</li>
                <li>• Réplication des données en plusieurs régions</li>
                <li>• Surveillance 24/7 des accès</li>
              </ul>
            </section>

            {/* Compliance */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Conformité réglementaire</h2>
              <div className="space-y-3">
                {[
                  { standard: "RGPD", desc: "Règlement Général sur la Protection des Données" },
                  { standard: "HDS", desc: "Certification Hébergement de Données de Santé" },
                  { standard: "ISO 27001", desc: "Gestion de la sécurité de l'information" },
                  { standard: "Loi Informatique et Libertés", desc: "Loi française de protection des données" },
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-muted rounded-lg">
                    <p className="font-bold text-sm">{item.standard}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Audit */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Contrôles et audits</h2>
              <p className="text-muted-foreground">PharmaPro subit des audits réguliers :</p>
              <ul className="space-y-2 text-muted-foreground mt-4">
                <li>• Audits externes annuels par un tiers indépendant</li>
                <li>• Audits internes trimestriels</li>
                <li>• Tests de pénétration réguliers</li>
                <li>• Exercices de continuité de service</li>
              </ul>
            </section>

            {/* Contact */}
            <section className="bg-muted rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Questions sur la sécurité des données ?</h2>
              <p className="text-muted-foreground mb-4">
                Pour toute question concernant la sécurité ou la conformité de nos services, veuillez nous contacter :
              </p>
              <p className="font-medium">dpo@pharmapro.fr</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
