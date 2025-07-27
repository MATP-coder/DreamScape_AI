"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Header() {
  // Manage dark mode via localStorage and root class
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // On mount, read saved theme and apply
    const saved = typeof window !== 'undefined' && localStorage.getItem('theme');
    const prefersDark = saved === 'dark';
    if (prefersDark) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

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
    <header className="w-full py-6 bg-white dark:bg-gray-900 shadow">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Use next/image for optimized logo */}
          <Image src="/logo.png" alt="DreamScape Logo" width={40} height={40} className="h-8 w-8 md:h-10 md:w-10" priority />
          <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300">DreamScape</h1>
        </div>
        <nav className="space-x-4 md:space-x-6 flex items-center">
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">Home</Link>
          <Link href="/chat" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">Traumreise starten</Link>
          <Link href="/#" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">Preise</Link>
          <Link href="/#" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">Kontakt</Link>
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
