"use client";

import Link from 'next/link'

// FAQ page
//
// Provides answers to common questions about DreamScape.  Each
// question is highlighted and followed by a succinct answer.  The
// layout respects the existing design language with responsive
// typography and subtle colour contrasts.  Am Ende wird ein klarer
// Aufruf zum Start der Traumreise platziert, damit Besucher direkt
// loslegen können – entweder kostenlos oder im Premium‑Modus.

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
        {/* Aufruf zum Start der Traumreise */}
        <div className="mt-12 text-center flex flex-col md:flex-row justify-center gap-4">
          <Link
            href="/chat"
            className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Kostenlos starten
          </Link>
          <Link
            href="/chat?premium=true"
            className="inline-block bg-yellow-500 dark:bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 dark:hover:bg-yellow-500 transition-colors"
          >
            Premium starten
          </Link>
        </div>
      </div>
    </div>
  );
}