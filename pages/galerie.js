"use client";

import Image from 'next/image';

// Galerie page
//
// Displays a simple gallery of placeholder images to showcase the
// artistic potential of DreamScape.  Each item is wrapped in a card
// with a caption.  In a production setting, these would be replaced
// with real user‑generated artworks.

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
      </div>
    </div>
  );
}