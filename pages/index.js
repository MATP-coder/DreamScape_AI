"use client";

import Link from 'next/link';

// Home page for DreamScape
//
// This page introduces visitors to the core value proposition.  A soft
// gradient rooted in the brand palette leads the eye downward, while
// concise copy explains the service.  A prominent call‑to‑action invites
// users to begin their "Traumreise".  Below, three key benefits are
// presented in a responsive grid.  Colours and typography are tuned for
// readability in light and dark themes.

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center bg-gradient-to-b from-brand-light via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Verwandle deine Träume in Kunst
        </h2>
        <p className="mb-6 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Beschreibe deinen Traum und erhalte ein einzigartiges, KI‑generiertes Bild und eine faszinierende Traumdeutung.
        </p>
        <Link href="/chat">
          <button className="px-6 py-3 md:px-8 md:py-4 bg-brand text-white text-lg rounded-lg shadow-md hover:bg-brand-dark transition-colors duration-300">
            Jetzt Traumreise starten
          </button>
        </Link>
      </section>

      {/* Feature highlights */}
      <section className="bg-white dark:bg-gray-900 py-8 md:py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 px-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Sicher &amp; anonym</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              Deine Träume bleiben privat – wir speichern keine persönlichen Daten.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">KI‑basierte Analyse</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              Moderne GPT‑4 &amp; DALL·E KI‑Technologien für kreative Traumbilder und Interpretationen.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Echte Kunstwerke</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              Erhalte dein Traumbild als hochauflösenden Download oder als Poster.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}