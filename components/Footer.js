"use client";

import Link from 'next/link';

// Footer component
//
// Displays copyright information and links to legal pages.  Colours adapt
// to light and dark themes and subtly incorporate the brand palette on
// hover states.  A border separates the footer from the page content.

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center text-gray-600 dark:text-gray-400 text-sm">
        © {year} DreamScape. Alle Rechte vorbehalten. |
        <Link href="#" className="ml-2 hover:text-brand dark:hover:text-brand-light">
          Impressum
        </Link>{' '}|
        <Link href="#" className="ml-2 hover:text-brand dark:hover:text-brand-light">
          Datenschutz
        </Link>
      </div>
    </footer>
  );
}