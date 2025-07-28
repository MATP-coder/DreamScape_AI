import Link from 'next/link'

/**
 * Startseite für DreamScape
 *
 * Diese Seite nutzt eine erzählerische Struktur, um Besucher auf eine Reise
 * mitzunehmen. Sie gliedert sich in drei Abschnitte: einen einladenden
 * Hero‑Bereich, der die Besucher motiviert, ihren ersten Traum zu erzählen;
 * einen Abschnitt, der die Schritte der sogenannten Heldenreise erklärt;
 * sowie einen Free‑vs‑Premium‑Vergleich, der das Freemium‑Modell
 * transparent darstellt. Durch durchdachte Gestaltung und stimmige Farben
 * entsteht eine harmonische Benutzerführung, die Lust auf mehr macht.
 */
export default function Home() {
  // Definition der Inhalte für die drei Reise‑Etappen. So bleiben Titel und
  // Beschreibung sauber getrennt vom JSX‑Markup und können bei Bedarf
  // leichter erweitert oder internationalisiert werden.
  const steps = [
    {
      title: 'Der Ruf',
      desc: 'Erzähle uns von deinem Traum, egal wie verrückt oder geheimnisvoll er wirkt.',
    },
    {
      title: 'Die Reise',
      desc: 'Unser Chat begleitet dich Schritt für Schritt, um dein Unterbewusstsein zu ergründen und ein Kunstwerk zu erschaffen.',
    },
    {
      title: 'Die Belohnung',
      desc: 'Du erhältst eine persönliche Interpretation und ein Traumkunstwerk, das du teilen oder sammeln kannst.',
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 space-y-20">
      {/* Hero‑Bereich */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100">
          Wähle deine Traumreise
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Jeder Traum ist eine Geschichte – je genauer du sie beschreibst, desto magischer wird
          das Ergebnis. Starte kostenlos mit drei Fragen oder wähle den Premium‑Modus für eine
          grenzenlose Reise und extra Features.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {/* CTA für kostenlose Nutzer – dezente Farbe, um Premium hervorzuheben */}
          <Link
            href="/chat"
            className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-full text-base font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Kostenlos starten
          </Link>
          {/* CTA für Premium – mit Goldton, um Exklusivität zu vermitteln */}
          <Link
            href="/chat?premium=true"
            className="inline-block bg-yellow-500 dark:bg-yellow-600 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-yellow-600 dark:hover:bg-yellow-500 transition-colors"
          >
            Premium starten
          </Link>
        </div>
      </section>

      {/* Reise‑Etappen */}
      <section className="space-y-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center">
          Deine Reise in drei Etappen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow"
            >
              <div className="h-12 w-12 flex items-center justify-center bg-brand text-white rounded-full text-xl font-bold">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Free‑vs‑Premium Abschnitt */}
      <section className="space-y-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center">
          Free vs. Premium
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Wähle die Version, die zu dir passt. Starte kostenlos und entdecke die Möglichkeiten –
          upgrade jederzeit für mehr Tiefe, Qualität und exklusive Features.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Karte */}
          <div className="p-6 border rounded-lg bg-gray-100 dark:bg-gray-800 shadow space-y-4 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Free</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Grundlegende Traumdeutung</li>
              <li>• Kleines Traumkunstwerk mit Wasserzeichen</li>
              <li>• 1 Traum pro Woche</li>
            </ul>
            <Link
              href="/chat"
              className="inline-block mt-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Kostenlos ausprobieren
            </Link>
          </div>
          {/* Premium Karte */}
          <div className="p-6 border rounded-lg bg-yellow-100 dark:bg-yellow-700 shadow space-y-4 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-yellow-700 dark:text-yellow-200">Premium</h3>
            <ul className="space-y-2 text-yellow-800 dark:text-yellow-100">
              <li>• Tiefenanalysen und persönliche Tipps</li>
              <li>• Hochauflösende Kunstwerke ohne Wasserzeichen</li>
              <li>• Mehrere Stile, Qualitätsstufen und Formate</li>
              <li>• Download, Poster &amp; Video‑Sequenzen</li>
            </ul>
            <Link
              href="/chat?premium=true"
              className="inline-block mt-4 bg-yellow-500 dark:bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-600 dark:hover:bg-yellow-500 transition-colors"
            >
              Premium testen
            </Link>
          </div>
        </div>
      </section>

      {/* Traum der Woche */}
      <section className="space-y-10 pt-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center">
          Traum der Woche
        </h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* Traum der Woche – beeindruckendes Referenzbild */}
          <img
            src="/dreamofweek.png"
            alt="Traum der Woche: Fliegender Wal"
            className="w-48 h-48 md:w-60 md:h-60 rounded-lg shadow-lg object-cover"
          />
          <div className="space-y-4 max-w-md text-gray-700 dark:text-gray-300">
            <h3 className="text-2xl font-semibold text-brand dark:text-brand-light">
              Der fliegende Wal
            </h3>
            <p>
              Ein Nutzer träumte von einem gigantischen Wal, der über einer Stadt
              schwebte und das Licht des Mondes reflektierte. Unsere KI schuf daraus ein
              atemberaubendes Bild, das in unserer Community viral ging. Erzähle uns
              deinen Traum – vielleicht bist du der nächste Star!
            </p>
            <a
              href="/galerie"
              className="inline-block bg-brand text-white px-6 py-2 rounded-full hover:bg-brand-dark transition-colors"
            >
              Mehr entdecken
            </a>
          </div>
        </div>
      </section>

      {/* Zahlen & Fakten über Träume */}
      <section className="space-y-10 pt-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center">
          Zahlen &amp; Fakten über Träume
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow space-y-2 text-center">
            <h3 className="text-4xl font-extrabold text-brand dark:text-brand-light">2h</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              So lange träumen wir durchschnittlich pro Nacht.
            </p>
          </div>
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow space-y-2 text-center">
            <h3 className="text-4xl font-extrabold text-brand dark:text-brand-light">95%</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              der Träume sind nach 5 Minuten vergessen.
            </p>
          </div>
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow space-y-2 text-center">
            <h3 className="text-4xl font-extrabold text-brand dark:text-brand-light">12%</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              der Menschen träumen in Schwarz‑Weiß.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}