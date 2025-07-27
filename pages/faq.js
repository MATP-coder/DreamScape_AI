"use client";

// FAQ page
//
// Provides answers to common questions about DreamScape.  Each
// question is highlighted and followed by a succinct answer.  The
// layout respects the existing design language with responsive
// typography and subtle colour contrasts.

export default function FAQ() {
  const faqs = [
    {
      q: 'Ist meine Privatsphäre geschützt?',
      a: 'Ja, deine Träume bleiben privat. Wir speichern keine persönlichen Daten oder Inhalte.',
    },
    {
      q: 'Wie lange dauert die Erstellung des Traumbilds?',
      a: 'In der Regel dauert es nur wenige Sekunden, bis dein individuelles Bild und die Interpretation bereitstehen.',
    },
    {
      q: 'Kann ich das Bild herunterladen oder als Poster bestellen?',
      a: 'Ja, nach der Generierung kannst du dein Traumbild herunterladen. Eine Poster‑Bestelloption ist in Vorbereitung.',
    },
    {
      q: 'Welche Sprachen werden unterstützt?',
      a: 'Derzeit unterstützen wir Deutsch und Englisch. Weitere Sprachen sind geplant.',
    },
  ];
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Häufige Fragen</h2>
        <div className="space-y-8">
          {faqs.map((item, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2 text-brand dark:text-brand-light">
                {item.q}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}