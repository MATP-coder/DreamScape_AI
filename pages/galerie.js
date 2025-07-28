"use client";

import Image from 'next/image';
import Link from 'next/link';

// Galerie page
//
// Displays a simple gallery of placeholder images to showcase the
// artistic potential of DreamScape.  Each item is wrapped in a card
// with a caption.  In einer späteren Version können echte
// Nutzerbilder geladen werden.  Am Ende wird ein Aufruf zur Traumreise
// eingefügt, damit Besucher direkt starten können – kostenlos oder im
// Premium‑Modus.

export default function Galerie() {
  // Generate six placeholder entries
  const items = Array.from({ length: 6 });
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Galerie</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {items.map((_, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow flex flex-col items-center">
              <Image
                src="/logo.png"
                alt={`Beispiel ${index + 1}`}
                width={400}
                height={250}
                className="rounded"
              />
              <p className="mt-3 font-medium">Beispiel&nbsp;{index + 1}</p>
            </div>
          ))}
        </div>
        {/* Aufruf zum Start der Traumreise am Ende der Galerie */}
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