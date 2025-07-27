"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Header component
//
// This component renders a responsive navigation bar with the DreamScape
// logo, primary navigation links and a dark‑mode toggle.  It leverages
// the custom brand colours defined in `tailwind.config.js` to ensure
// consistency across the site.  The dark‑mode toggle persists the
// user’s preference in localStorage and applies the appropriate
// theme classes to the root document element.

export default function Header() {
  // Track whether dark mode is active
  const [darkMode, setDarkMode] = useState(false);

  // On mount, read the saved theme preference and apply it
  useEffect(() => {
    const savedTheme = typeof window !== 'undefined' && localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  // Toggle dark mode and persist the choice
  const toggleDarkMode = () => {
    const htmlEl = document.documentElement;
    if (darkMode) {
      htmlEl.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      htmlEl.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <header className="w-full bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-4">
        {/* Logo and site title */}
        <div className="flex items-center gap-3">
          {/* Circular logo background to tie into the brand palette */}
          <span className="p-2 bg-brand-light rounded-full">
            <Image
              src="/logo.png"
              alt="DreamScape Logo"
              width={40}
              height={40}
              className="h-8 w-8 md:h-10 md:w-10"
            />
          </span>
          <Link href="/">
            <h1 className="text-2xl font-bold text-brand dark:text-brand-light">DreamScape</h1>
          </Link>
        </div>

        {/* Navigation links for medium and larger screens */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light transition-colors">Home</Link>
          <Link href="/chat" className="text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light transition-colors">Chat</Link>
          <Link href="/result" className="text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light transition-colors">Ergebnisse</Link>
          <Link href="/ablauf" className="text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light transition-colors">Ablauf</Link>
          <Link href="/galerie" className="text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light transition-colors">Galerie</Link>
          <Link href="/faq" className="text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light transition-colors">FAQ</Link>
          {/* Dark mode toggle button */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                <path d="M10 15a5 5 0 100-10 5 5 0 000 10z" />
                <path fillRule="evenodd" d="M10 2a.75.75 0 01.75-.75h.5a.75.75 0 110 1.5h-.5A.75.75 0 0110 2zM10 16a.75.75 0 01.75.75h.5a.75.75 0 110 1.5h-.5a.75.75 0 01-.75-.75zM16 10a.75.75 0 01.75.75v.5a.75.75 0 11-1.5 0v-.5A.75.75 0 0116 10zM2 10a.75.75 0 01.75-.75h.5a.75.75 0 110 1.5h-.5A.75.75 0 012 10zM15.364 4.636a.75.75 0 10-1.06-1.06l-.354.353a.75.75 0 101.06 1.06l.354-.354zM5.05 14.95a.75.75 0 10-1.06-1.06l-.353.354a.75.75 0 101.06 1.06l.353-.354zM15.364 15.364a.75.75 0 101.06 1.06l.354-.354a.75.75 0 10-1.06-1.06l-.354.354zM5.05 5.05a.75.75 0 101.06-1.06l-.354-.353a.75.75 0 10-1.06 1.06l.354.353z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                <path d="M17.293 13.293a8 8 0 11-10.586-10.586 8 8 0 0010.586 10.586z" />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}