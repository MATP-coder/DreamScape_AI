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
  // Prüfe, ob Premium gebucht wurde
  const isPremium = router.query.premium === 'true'
  // Zusätzliche Parameter auslesen
  const numScenes = parseInt(router.query.scenes || '1', 10)
  const isComic = router.query.comic === 'true'
  const hasDiary = router.query.diary === 'true'
  const hasCommunity = router.query.community === 'true'

  // Hilfsfunktion zum Rendern von Bildplatzhaltern. In einer echten
  // Anwendung würden hier die generierten Bilder angezeigt. Bei Comic‑Modus
  // zeigen wir bis zu 5 Panels in einer Reihe, ansonsten ein Grid.
  const placeholders = []
  const total = Math.max(1, isPremium ? numScenes : 1)
  for (let i = 0; i < total; i++) {
    placeholders.push(
      <div
        key={i}
        className={
          isComic
            ? 'w-full aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-lg'
            : 'w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg'
        }
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 space-y-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 text-center">
        Dein Traumbild
      </h2>
      {/* Bildcontainer */}
      <div
        className={
          isComic
            ? 'grid grid-cols-3 gap-4'
            : total > 1
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'
            : ''
        }
      >
        {placeholders}
      </div>
      {/* Traumdeutung */}
      <div className="text-left text-gray-700 dark:text-gray-300 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Traumdeutung
        </h3>
        <p>
          Hier erscheint die Interpretation deines Traums basierend auf den gesammelten Details.
          Diese Funktion ist in dieser Demo noch nicht voll implementiert.
        </p>
      </div>
      {/* Tagebuch und Community */}
      {isPremium && (hasDiary || hasCommunity) && (
        <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
          {hasDiary && (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Dein Traum wurde in deinem persönlichen Tagebuch gespeichert. Du kannst ihn später in
              deiner Galerie nachlesen.
            </p>
          )}
          {hasCommunity && (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Dein Traum ist jetzt anonym in der Community sichtbar. Lass dich von den Träumen
              anderer inspirieren und gib Feedback.
            </p>
          )}
        </div>
      )}
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
        <div className="space-y-4 text-center">
          {(numScenes > 1 || isComic || hasDiary || hasCommunity) && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Die von dir ausgewählten Optionen (mehrere Szenen, Comic‑Modus, Tagebuch oder Community) sind Teil der Premium‑Version.
            </p>
          )}
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
      {/* Footer Buttons */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
        <Link
          href="/"
          className="inline-block border border-brand text-brand dark:text-brand-light px-6 py-3 rounded-full hover:bg-brand hover:text-white transition-colors"
        >
          Zurück zur Startseite
        </Link>
        <Link
          href="/galerie"
          className="inline-block border border-brand text-brand dark:text-brand-light px-6 py-3 rounded-full hover:bg-brand hover:text-white transition-colors"
        >
          Galerie ansehen
        </Link>
      </div>
    </div>
  )
}