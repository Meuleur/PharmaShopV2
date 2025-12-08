import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité RGPD</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Responsable du traitement</h2>
              <p>
                PharmaPro, situé au 123 Rue du Cours, 75000 Paris, est responsable du traitement de vos données
                personnelles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">2. Données collectées</h2>
              <p>Nous collectons les données suivantes :</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Données de contact (nom, email, téléphone)</li>
                <li>Données de santé (ordonnances, historique d'achats)</li>
                <li>Données de géolocalisation (pour la livraison)</li>
                <li>Données de paiement (cryptées et sécurisées)</li>
                <li>Données de navigation (cookies, logs)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">3. Base légale du traitement</h2>
              <p>Nous traitons vos données en vertu de :</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Consentement explicite pour les newsletters</li>
                <li>Exécution du contrat pour les commandes</li>
                <li>Obligation légale en tant que pharmacie</li>
                <li>Intérêt légitime pour l'amélioration des services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">4. Durée de conservation</h2>
              <p>Les données personnelles sont conservées selon les délais légaux en vigueur :</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Données de compte : pendant toute la durée de la relation</li>
                <li>Données de santé : 10 ans selon les normes pharmaceutiques</li>
                <li>Données de paiement : 3 ans pour la comptabilité</li>
                <li>Données de navigation : 13 mois maximum</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">5. Vos droits</h2>
              <p>Vous bénéficiez des droits suivants :</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Droit d'accès : obtenir vos données</li>
                <li>Droit de rectification : corriger les erreurs</li>
                <li>Droit de suppression : droit à l'oubli</li>
                <li>Droit à la portabilité : recevoir vos données</li>
                <li>Droit d'opposition : refuser certains traitements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">6. Sécurité des données</h2>
              <p>Nous mettons en place des mesures de sécurité renforcées :</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Chiffrement SSL/TLS pour les transmissions</li>
                <li>Certification HDS pour les données de santé</li>
                <li>Contrôle d'accès aux données</li>
                <li>Sauvegardes régulières et sécurisées</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">7. Cookies</h2>
              <p>
                Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez les refuser via les paramètres
                de votre navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">8. Contact CNIL</h2>
              <p>
                Pour exercer vos droits ou signaler un problème, contactez-nous ou déposez plainte auprès de la CNIL.
              </p>
            </section>

            <section>
              <p className="text-muted-foreground mt-8">Dernière mise à jour : novembre 2025</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
