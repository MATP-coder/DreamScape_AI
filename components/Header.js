import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full py-6 bg-white dark:bg-gray-900 shadow">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="DreamScape Logo" className="h-8 w-8 md:h-10 md:w-10" />
          <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300">DreamScape</h1>
        </div>
        <nav className="space-x-6">
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">Home</Link>
          <Link href="/chat" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">Traumreise starten</Link>
          <Link href="/#" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">Preise</Link>
          <Link href="/#" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">Kontakt</Link>
        </nav>
      </div>
    </header>
  )
}
