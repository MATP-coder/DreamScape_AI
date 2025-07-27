import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'

/**
 * Ergebnis‑Seite
 *
 * Diese Seite zeigt das generierte Traumbild und die Interpretation. Je nach
 * gebuchtem Plan (free oder premium) werden unterschiedliche Aktionen
 * angeboten. Free‑Nutzer sehen einen Hinweis, dass Downloads und Poster
 * exklusiv für Premium verfügbar sind, während Premium‑Nutzer direkte
 * Buttons zum Download in hoher Auflösung und zur Poster‑Bestellung sehen.
 */
export default function Result() {
  const router = useRouter()
  // Prüfe, ob Premium gebucht wurde
  const isPremium = router.query.premium === 'true'
  // Zusätzliche Parameter auslesen
  const numScenes = parseInt(router.query.scenes || '1', 10)
  const isComic = router.query.comic === 'true'
  const hasDiary = router.query.diary === 'true'
  const hasCommunity = router.query.community === 'true'

  // Variantenanzahl und Stil/Qualität/Format auslesen
  const variants = parseInt(router.query.variants || '1', 10)
  const style = router.query.style || ''
  const quality = router.query.quality || 'standard'
  const format = router.query.format || 'square'

  // Auslesen der kreativitätsbezogenen Parameter
  const emotions = router.query.emotion ? String(router.query.emotion).split('-') : []
  const palette = router.query.color || ''
  const perspective = router.query.perspective || ''
  const moodValue = parseInt(router.query.mood || '50', 10)

  // Zustände für generierte Bilder
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  // Zustände für tiefere Interpretation und Q&A
  const [deepInterpretation, setDeepInterpretation] = useState('')
  const [qaMessages, setQaMessages] = useState([])
  const [qaInput, setQaInput] = useState('')
  const [loadingQA, setLoadingQA] = useState(false)

  // Hilfsfunktion: Erstelle eine einfache Beschreibung für das Bild
  function buildPrompt() {
    const parts = []
    if (emotions.length) {
      parts.push(`Emotionen: ${emotions.join(', ')}`)
    }
    if (palette) {
      parts.push(`Farbpalette: ${palette}`)
    }
    if (perspective) {
      parts.push(`Perspektive: ${perspective}`)
    }
    const moodDesc = moodValue <= 33 ? 'ruhige Stimmung' : moodValue >= 66 ? 'chaotische Stimmung' : 'ausgewogene Stimmung'
    parts.push(moodDesc)
    return parts.join(', ')
  }

  // Erstelle eine einfache Interpretation basierend auf den Eingaben.
  function buildInterpretation() {
    const parts = []
    if (emotions.length) {
      const emotionMap = {
        Angst: 'Angst oder Unsicherheit',
        Freude: 'Freude und Zufriedenheit',
        Verwirrung: 'Verwirrung oder Ratlosigkeit',
        Neugier: 'Neugier und Entdeckungsfreude',
        Trauer: 'Trauer oder Verlust',
        Wut: 'Wut oder Frustration',
      }
      const mapped = emotions
        .map((e) => emotionMap[e] || e)
        .join(', ')
      parts.push(`Dein Traum spiegelt ${mapped} wider.`)
    }
    const moodDesc = moodValue <= 33 ? 'eine ruhige' : moodValue >= 66 ? 'eine chaotische' : 'eine ausgewogene'
    const paletteMap = {
      düster: 'düstere',
      bunt: 'bunte',
      pastell: 'pastellige',
      kontrastreich: 'kontrastreiche',
    }
    if (paletteMap[palette]) {
      parts.push(`Die ${moodDesc} Stimmung und die ${paletteMap[palette]} Farbgebung deuten auf deine aktuelle Gefühlslage hin.`)
    } else {
      parts.push(`Die ${moodDesc} Stimmung zeigt deine innere Balance.`)
    }
    const perspectiveMap = {
      vogel: 'aus der Vogelperspektive',
      nah: 'als Nahaufnahme',
      first: 'aus der Ich‑Perspektive',
    }
    if (perspectiveMap[perspective]) {
      parts.push(`Die gewählte Perspektive (${perspectiveMap[perspective]}) zeigt, aus welchem Blickwinkel du dein Unterbewusstsein betrachtest.`)
    }
    if (!parts.length) {
      return 'Dein Traum weist auf verborgene Wünsche und Gedanken hin.'
    }
    return parts.join(' ')
  }

  // Bilder abrufen, wenn die Komponente geladen wird
  useEffect(() => {
    async function fetchImages() {
      setLoading(true)
      try {
        const prompt = buildPrompt()
        const res = await fetch(
          `/api/generateImage?prompt=${encodeURIComponent(prompt)}&scenes=${isPremium ? numScenes : 1}&variants=${variants}&style=${encodeURIComponent(style)}&quality=${encodeURIComponent(quality)}&format=${encodeURIComponent(format)}`
        )
        const data = await res.json()
        if (data.images) {
          setImages(data.images)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Hole tiefere Interpretation beim Laden
  useEffect(() => {
    async function fetchInterpretation() {
      try {
        const prompt = buildPrompt()
        const res = await fetch('/api/interpret', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        })
        const data = await res.json()
        if (data.interpretation) setDeepInterpretation(data.interpretation)
      } catch (err) {
        console.error(err)
      }
    }
    fetchInterpretation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const total = Math.max(1, isPremium ? numScenes : 1)

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 space-y-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 text-center">
        Dein Traumbild
      </h2>
      {/* Bildcontainer */}
      <div
        className={
          isComic
            ? 'grid grid-cols-3 gap-4'
            : total > 1
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'
            : ''
        }
      >
        {loading
          ?
            [...Array(total * variants)].map((_, i) => (
              <div
                key={i}
                className={
                  isComic
                    ? 'w-full aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-lg'
                    : 'w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg'
                }
              />
            ))
          : images && images.length > 0
          ? images.map((url, i) => {
              const isBlocked = !isPremium && i >= variants // block extra variants for free
              return (
                <div key={i} className="relative w-full h-0" style={{ paddingBottom: isComic ? '133%' : '100%' }}>
                  {isBlocked ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full bg-gray-300 dark:bg-gray-800 rounded-lg blur-sm"></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-center text-gray-800 dark:text-gray-200 font-medium">Nur Premium</span>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={url}
                      alt={`Traumbild ${i + 1}`}
                      fill
                      className="rounded-lg object-cover"
                    />
                  )}
                </div>
              )
            })
          : null}
      </div>
      {/* Traumdeutung */}
      <div className="text-left text-gray-700 dark:text-gray-300 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Traumdeutung
        </h3>
        <p>{buildInterpretation()}</p>
        {deepInterpretation && (
          <div className="mt-4 space-y-2 text-sm">
            {deepInterpretation.split('\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        )}
      </div>
      {/* Tagebuch und Community */}
      {isPremium && (hasDiary || hasCommunity) && (
        <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
          {hasDiary && (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Dein Traum wurde in deinem persönlichen Tagebuch gespeichert. Du kannst ihn später in deiner Galerie nachlesen.
            </p>
          )}
          {hasCommunity && (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Dein Traum ist jetzt anonym in der Community sichtbar. Lass dich von den Träumen anderer inspirieren und gib Feedback.
            </p>
          )}
        </div>
      )}
      {/* Aktionen abhängig vom Plan */}
      {isPremium ? (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <button className="bg-brand text-white px-6 py-3 rounded-full hover:bg-brand-dark transition-colors">
            High‑Res Download
          </button>
          <button className="bg-brand text-white px-6 py-3 rounded-full hover:bg-brand-dark transition-colors">
            Poster bestellen
          </button>
        </div>
      ) : (
        <div className="space-y-4 text-center">
          {(numScenes > 1 || isComic || hasDiary || hasCommunity) && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Die von dir ausgewählten Optionen (mehrere Szenen, Comic‑Modus, Tagebuch oder Community) sind Teil der Premium‑Version.
            </p>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Um das Bild in voller Auflösung herunterzuladen oder als Poster zu bestellen, benötigst du die Premium‑Version.
          </p>
          <Link
            href="/chat?premium=true"
            className="inline-block bg-brand text-white px-6 py-3 rounded-full hover:bg-brand-dark transition-colors"
          >
            Upgrade auf Premium
          </Link>
        </div>
      )}
      {/* Footer Buttons */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
        <Link
          href="/"
          className="inline-block border border-brand text-brand dark:text-brand-light px-6 py-3 rounded-full hover:bg-brand hover:text-white transition-colors"
        >
          Zurück zur Startseite
        </Link>
        <Link
          href="/galerie"
          className="inline-block border border-brand text-brand dark:text-brand-light px-6 py-3 rounded-full hover:bg-brand hover:text-white transition-colors"
        >
          Galerie ansehen
        </Link>
      </div>
      {/* Interaktiver Modus: Nutzer kann weitere Fragen zur Deutung stellen */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Frag den Traumexperten</h4>
        <div className="flex flex-col gap-2">
          {qaMessages.map((msg, idx) => (
            <div key={idx} className={`text-sm ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span
                className={`inline-block px-3 py-2 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-brand text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                {msg.content}
              </span>
            </div>
          ))}
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (!qaInput.trim() || loadingQA) return
              const newMessages = [...qaMessages, { role: 'user', content: qaInput.trim() }]
              setQaMessages(newMessages)
              setQaInput('')
              setLoadingQA(true)
              try {
                const res = await fetch('/api/interpret', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ prompt: buildPrompt(), question: qaInput.trim() }),
                })
                const data = await res.json()
                const answer = data.interpretation || 'Entschuldigung, darauf habe ich keine Antwort.'
                setQaMessages([...newMessages, { role: 'assistant', content: answer }])
              } catch (err) {
                setQaMessages([...newMessages, { role: 'assistant', content: 'Es ist ein Fehler aufgetreten.' }])
              } finally {
                setLoadingQA(false)
              }
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={qaInput}
              onChange={(e) => setQaInput(e.target.value)}
              placeholder="Frage zur Interpretation stellen…"
              className="flex-1 px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-700"
            />
            <button
              type="submit"
              disabled={!qaInput.trim() || loadingQA}
              className="bg-brand text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Fragen
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}