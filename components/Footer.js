import Link from 'next/link'

// Responsive footer that stacks items vertically on mobile and horizontally
// on larger screens. It adjusts font size based on screen width and includes
// a separator between links on larger screens.
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 py-8 mt-12 text-sm md:text-base">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 dark:text-gray-400 text-center">
        <p>© {year} DreamScape. Alle Rechte vorbehalten.</p>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <Link href="#" className="hover:underline">Impressum</Link>
          <span className="hidden md:inline">|</span>
          <Link href="#" className="hover:underline">Datenschutz</Link>
        </div>
      </div>
    </footer>
  )
}