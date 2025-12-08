import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Conditions Générales d'Utilisation</h1>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Objet</h2>
              <p className="text-muted-foreground">
                PharmaPro propose un service de vente en ligne de produits pharmaceutiques et de bien-être avec option
                Click & Collect. Ces conditions régissent l'utilisation du site et les transactions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Conditions d'accès</h2>
              <p className="text-muted-foreground">
                L'accès au site est réservé aux personnes majeures. Vous garantissez l'exactitude des informations
                fournies lors de l'inscription.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Produits</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>• Nous proposons uniquement des produits conformes à la réglementation française</p>
                <p>• Les produits soumis à ordonnance nécessitent un document valide</p>
                <p>• Les prix sont indiqués TTC et sujets à modification</p>
                <p>• Disponibilité sous réserve de stocks</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Commandes</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>• Une commande constitue une offre d'achat</p>
                <p>• Nous nous réservons le droit de refuser une commande</p>
                <p>• Click & Collect : retrait sous 24h ouvrables</p>
                <p>• Livraison à domicile : 48h maximum</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Paiement</h2>
              <p className="text-muted-foreground">
                Le paiement est sécurisé par SSL. Les données bancaires ne sont jamais stockées sur nos serveurs. Nous
                acceptons les cartes bancaires, PayPal et virements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Droit de rétractation</h2>
              <p className="text-muted-foreground">
                Conformément à la loi, vous disposez d'un délai de 14 jours pour vous rétracter. Les produits doivent
                être non ouverts et dans leur emballage d'origine. Exception : médicaments et produits de santé non
                rétractables.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Responsabilité</h2>
              <p className="text-muted-foreground">
                PharmaPro ne peut être tenue responsable des dommages indirects. Notre responsabilité est limitée au
                montant de la commande. Les conseils fournis sont à titre informatif.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Propriété intellectuelle</h2>
              <p className="text-muted-foreground">
                Tout contenu du site (texte, images, logos) est protégé. Reproduction interdite sans autorisation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Limitation de responsabilité</h2>
              <p className="text-muted-foreground">
                PharmaPro décline toute responsabilité en cas d'erreur dans les descriptions ou les prix, de rupture de
                stock ou de problèmes de livraison dus à des tiers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Modifications</h2>
              <p className="text-muted-foreground">
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications s'appliqueront
                aux commandes ultérieures.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Loi applicable</h2>
              <p className="text-muted-foreground">
                Ces conditions sont régies par la loi française. Tout litige sera soumis aux tribunaux compétents.
              </p>
            </section>

            <p className="text-muted-foreground mt-12">Dernière mise à jour : novembre 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
