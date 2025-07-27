"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

/**
 * Header‑Komponente
 *
 * Dieses Header‑Element sorgt für eine klare Navigation und enthält ein
 * farblich akzentuiertes Logo, Navigationslinks und einen Dark‑Mode‑Schalter.
 * Der Dark‑Mode wird im `localStorage` persistiert und beim Laden der Seite
 * ausgelesen. Der CTA‑Button „Traumreise starten“ führt direkt zur Chat‑Strecke.
 */
export default function Header() {
  const [theme, setTheme] = useState('light')

  // Beim ersten Rendern Theme aus localStorage oder Systempräferenz ermitteln
  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = stored || (prefersDark ? 'dark' : 'light')
    setTheme(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
  }, [])

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', next)
    }
  }

  return (
    <header className="w-full border-b dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center py-4 gap-4">
        {/* Logo und Markenname */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-brand text-white dark:bg-brand-dark">
            <Image src="/logo.png" alt="DreamScape Logo" width={32} height={32} />
          </span>
          <Link href="/" className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">
            DreamScape
          </Link>
        </div>
        {/* Navigation und Aktionen */}
        <nav className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-sm font-medium">
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light">
            Home
          </Link>
          <Link href="/ablauf" className="text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light">
            Ablauf
          </Link>
          <Link href="/galerie" className="text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light">
            Galerie
          </Link>
          <Link href="/faq" className="text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light">
            FAQ
          </Link>
          {/* Premium‑Link leitet jetzt auf eine eigene Info‑Seite statt direkt zur Chat‑Strecke */}
          <Link href="/premium" className="text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light">
            Premium
          </Link>
          {/* CTA Button */}
          <Link
            href="/chat"
            className="inline-block bg-brand text-white px-4 py-2 rounded-full hover:bg-brand-dark transition-colors"
          >
            Traumreise starten
          </Link>
          {/* Dark‑Mode‑Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  )
}