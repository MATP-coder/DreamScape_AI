import { useRouter } from 'next/router'
import Link from 'next/link'

/**
 * Ergebnis‑Seite
 *
 * Diese Seite zeigt das generierte Traumbild und die Interpretation. Je nach
 * gebuchtem Plan (free oder premium) werden unterschiedliche Aktionen
 * angeboten. Free‑Nutzer sehen einen Hinweis, dass Downloads und Poster
 * exklusiv für Premium verfügbar sind, während Premium‑Nutzer direkte
 * Buttons zum Download in hoher Auflösung und zur Poster‑Bestellung sehen.
 */
export default function Result() {
  const router = useRouter()
  // Prüfe, ob Query‑Parameter ?premium=true gesetzt ist, um die
  // Premium‑Ansicht zu aktivieren. Dieser Ansatz dient als einfache
  // Demonstration eines Freemium‑Modells.
  const isPremium = router.query.premium === 'true'

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 space-y-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
        Dein Traumbild
      </h2>
      {/* Bildcontainer – in einer echten Anwendung wird hier das generierte Bild eingefügt */}
      <div className="mx-auto w-full max-w-md aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden" />
      <div className="text-left text-gray-700 dark:text-gray-300 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Traumdeutung
        </h3>
        <p>
          Hier erscheint die Interpretation deines Traums basierend auf den gesammelten Details.
          Diese Funktion ist in dieser Demo noch nicht voll implementiert.
        </p>
      </div>
      {/* Aktionen abhängig vom Plan */}
      {isPremium ? (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <button className="bg-brand text-white px-6 py-3 rounded-full hover:bg-brand-dark transition-colors">
            High‑Res Download
          </button>
          <button className="bg-brand text-white px-6 py-3 rounded-full hover:bg-brand-dark transition-colors">
            Poster bestellen
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Um das Bild in voller Auflösung herunterzuladen oder als Poster zu bestellen,
            benötigst du die Premium‑Version.
          </p>
          <Link
            href="/chat?premium=true"
            className="inline-block bg-brand text-white px-6 py-3 rounded-full hover:bg-brand-dark transition-colors"
          >
            Upgrade auf Premium
          </Link>
        </div>
      )}
      {/* Teilen‑Button – unabhängig vom Plan */}
      <Link
        href="/"
        className="inline-block border border-brand text-brand dark:text-brand-light px-6 py-3 rounded-full hover:bg-brand hover:text-white transition-colors mt-4"
      >
        Zurück zur Startseite
      </Link>
    </div>
  )
}