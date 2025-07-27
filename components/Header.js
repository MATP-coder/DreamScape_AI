"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Header component
//
// This component renders a responsive navigation bar with the DreamScape logo,
// primary navigation links and a dark‑mode toggle.  It leverages the custom
// brand colours defined in `tailwind.config.js` to ensure consistency across
// the site.  The dark‑mode toggle persists the user’s preference in
// `localStorage` and applies the appropriate theme classes to the root
// document element.

export default function Header() {
  // Track dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Initialise theme on mount based on persisted preference
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
          <h1 className="text-2xl font-bold text-brand dark:text-brand-light">DreamScape</h1>
        </div>

        {/* Navigation links */}
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light transition-colors">
            Home
          </Link>
          <Link href="/chat" className="text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light transition-colors">
            Chat
          </Link>
          <Link href="/result" className="text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light transition-colors">
            Ergebnisse
          </Link>
          {/* Dark mode toggle button */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
}