"use client";

import Link from 'next/link';

// Ablauf page
//
// Describes the simple three‑step process behind DreamScape.  Each
// step is presented in a numbered card with a short explanation.  At
// the bottom of the page, a call‑to‑action invites users to start
// their Traumreise.  Colours and typography mirror the rest of the
// site for a cohesive experience.

export default function Ablauf() {
  const steps = [
    {
      title: 'Traum erzählen',
      description: 'Beantworte einige Fragen, um deinen Traum zu beschreiben.',
    },
    {
      title: 'Bild & Deutung erhalten',
      description:
        'Unsere KI erschafft ein einzigartiges Bild und interpretiert die Symbole deines Traums.',
    },
    {
      title: 'Speichern & teilen',
      description:
        'Lade dein Traumbild herunter, bestelle ein Poster oder teile es mit Freunden.',
    },
  ];
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 pt-10 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          So funktioniert&apos;s
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow"
            >
              <div className="mb-4 h-12 w-12 flex items-center justify-center rounded-full bg-brand-light text-brand font-bold">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link href="/chat">
            <button className="px-6 py-3 bg-brand text-white rounded-lg shadow hover:bg-brand-dark transition-colors">
              Jetzt Traumreise starten
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}