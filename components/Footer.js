import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-6 text-center text-gray-600">
        © {new Date().getFullYear()} DreamScape. Alle Rechte vorbehalten. |
        <Link href="#" className="ml-2 hover:underline">Impressum</Link> |
        <Link href="#" className="ml-2 hover:underline">Datenschutz</Link>
      </div>
    </footer>
  )
}