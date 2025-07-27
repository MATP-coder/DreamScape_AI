import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full py-6 bg-white shadow">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">DreamScape</h1>
        <nav className="space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-700">Home</Link>
          <Link href="/chat" className="text-gray-700 hover:text-blue-700">Traumreise starten</Link>
          <Link href="#" className="text-gray-700 hover:text-blue-700">Preise</Link>
          <Link href="#" className="text-gray-700 hover:text-blue-700">Kontakt</Link>
        </nav>
      </div>
    </header>
  )
}