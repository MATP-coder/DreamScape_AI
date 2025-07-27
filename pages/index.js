
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex flex-col items-center justify-center flex-1 text-center bg-gradient-to-b from-blue-50 to-white px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">Verwandle deine Träume in Kunst</h2>
        <p className="mb-6 text-base md:text-lg text-gray-600 max-w-2xl">
          Beschreibe deinen Traum und erhalte ein einzigartiges, KI-generiertes Bild und eine faszinierende Traumdeutung.
        </p>
        <Link href="/chat" className="px-6 py-3 md:px-8 md:py-4 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition">
          Jetzt Traumreise starten
        </Link>
      </section>

      <section className="bg-white py-8 md:py-12 shadow-inner">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-6 text-center">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Sicher & anonym</h3>
            <p className="text-gray-600 text-sm md:text-base">Deine Träume bleiben privat – wir speichern keine persönlichen Daten.</p>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">KI-basierte Analyse</h3>
            <p className="text-gray-600 text-sm md:text-base">Moderne GPT-4 & DALL·E KI-Technologien für kreative Traumdarstellungen.</p>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Echte Kunstwerke</h3>
            <p className="text-gray-600 text-sm md:text-base">Erhalte dein Traumbild als hochauflösenden Download oder als Poster.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
