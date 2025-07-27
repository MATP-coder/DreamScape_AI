import Link from 'next/link'

/**
 * Premium‑Seite
 *
 * Diese Seite erklärt den Mehrwert der Premium‑Version und lädt die
 * Besucher ein, ein Upgrade vorzunehmen. Sie listet die exklusiven
 * Funktionen auf und bietet einen klaren Call‑to‑Action zum Start der
 * Traumreise im Premium‑Modus.
 */
export default function PremiumPage() {
  const features = [
    {
      title: 'Tiefenanalysen & persönliche Tipps',
      desc: 'Erhalte detaillierte Interpretationen deiner Träume und persönliche Empfehlungen für deine innere Reise.',
    },
    {
      title: 'Hochauflösende Kunstwerke',
      desc: 'Lass aus deinen Träumen atemberaubende Bilder in voller Auflösung ohne Wasserzeichen erschaffen.',
    },
    {
      title: 'Vielfältige Stile & Paletten',
      desc: 'Wähle aus verschiedenen Stilen, Farbpaletten und Perspektiven für noch individuellere Traumbilder.',
    },
    {
      title: 'Mehrere Szenen & Comic‑Modus',
      desc: 'Erstelle ganze Bildreihen oder Comics aus mehreren Traumsequenzen.',
    },
    {
      title: 'Traum‑Tagebuch & Community',
      desc: 'Speichere deine Träume in deinem privaten Tagebuch und teile sie anonym in der Community.',
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 space-y-12">
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100">
          Premium
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Hol dir das Maximum aus deinen Träumen! Mit der Premium‑Version erhältst du
          Zugang zu exklusiven Funktionen und noch tiefere Einblicke in dein
          Unterbewusstsein.
        </p>
      </section>
      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow space-y-3"
          >
            <h3 className="text-xl font-semibold text-brand dark:text-brand-light">
              {item.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{item.desc}</p>
          </div>
        ))}
      </section>
      <div className="text-center">
        <Link
          href="/chat?premium=true"
          className="inline-block bg-brand text-white px-8 py-3 rounded-full text-base font-semibold hover:bg-brand-dark transition-colors"
        >
          Jetzt Traumreise im Premium‑Modus starten
        </Link>
      </div>
    </div>
  )
}