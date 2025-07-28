import { useState } from 'react'
import { useRouter } from 'next/router'
import Stepper from '../components/Stepper'
import LoadingScreen from '../components/LoadingScreen'

/**
 * Chat‑Seite
 *
 * Diese Komponente führt den Benutzer als „Reiseführer“ durch eine kurze
 * Traumreise. Abhängig vom Tarif (free oder premium) stellt der Chat
 * maximal drei Fragen oder unbegrenzt viele. Zusätzlich können Nutzer
 * Emotionen, Farben, Perspektive und Stimmung auswählen. Premium‑Nutzer
 * erhalten weitere Optionen wie mehrere Szenen, Comic‑Panel‑Modus,
 * Traumtagebuch, Community und Video‑Export (coming soon). Am Ende
 * navigiert der Chat zur Ergebnis‑Seite und übergibt den Tarif als
 * Query‑Parameter.
 */
export default function Chat() {
  const router = useRouter()
  const isPremium = router.query.premium === 'true'

  // Schrittdefinitionen: 0 = Emotionen, 1 = Einstellungen, 2 = Chat
  const stepLabels = ['Emotionen', 'Einstellungen', 'Traum erzählen']

  // Vordefinierte Initialfragen für die Traumreise. Diese dienen als
  // Fallback, falls der Reiseführer keine Antwort liefert. Jede Frage
  // regt den Nutzer an, tiefere Details preiszugeben.
  const questions = [
    'Erzähle uns von deinem Traum. Was hast du erlebt?',
    'Gab es Personen oder Symbole, die dir besonders auffielen?',
    'Welche weiteren Details fallen dir noch ein?',
  ]

  const [step, setStep] = useState(0)
  // Einleitungsnachricht des Reiseführers. Diese informiert den Nutzer
  // über den Ablauf und motiviert zu detaillierten Antworten.
  const introMessage =
    'Willkommen, Reisender! Ich bin dein Traumführer. Je mehr Details du teilst, desto magischer wird das Ergebnis. Lass uns beginnen!'

  const [messages, setMessages] = useState([
    { role: 'assistant', content: introMessage },
    { role: 'assistant', content: questions[0] },
  ])
  const [input, setInput] = useState('')
  // Loading state holds an object with show and onComplete; initialise hidden
  const [loading, setLoading] = useState({ show: false, onComplete: () => {} })

  // Auswahloptionen
  const [style, setStyle] = useState('Surrealismus')
  const [quality, setQuality] = useState('Standard')
  const [format, setFormat] = useState('Quadratisch')
  const [emotions, setEmotions] = useState([])
  const [color, setColor] = useState('bunt')
  const [perspective, setPerspective] = useState('first')
  const [mood, setMood] = useState(50)
  const [scenes, setScenes] = useState(1)
  const [comic, setComic] = useState(false)
  const [diary, setDiary] = useState(false)
  const [community, setCommunity] = useState(false)
  // Videosequenz (Premium‑only)
  const [video, setVideo] = useState(false)
  // Individuelle Emotionseingabe
  const [customEmotion, setCustomEmotion] = useState('')

  // Emotionen als Auswahl
  const emotionOptions = ['Angst', 'Freude', 'Verwirrung', 'Neugier', 'Trauer', 'Wut']

  function toggleEmotion(emotion) {
    setEmotions((prev) =>
      prev.includes(emotion) ? prev.filter((e) => e !== emotion) : [...prev, emotion]
    )
  }

  /**
   * Fügt eine benutzerdefinierte Emotion zur Liste hinzu und leert das Eingabefeld.
   */
  function addCustomEmotion() {
    const trimmed = customEmotion.trim()
    if (trimmed) {
      toggleEmotion(trimmed)
      setCustomEmotion('')
    }
  }

  /**
   * Sendet eine Nachricht im Chat (nur Schritt 2) und ruft bei Bedarf die nächste Frage ab
   */
  async function handleSend(e) {
    e.preventDefault()
    if (!input.trim() || loading.show || step !== 2) return
    const newMessages = [...messages, { role: 'user', content: input.trim() }]
    setMessages(newMessages)
    setInput('')

    // Ermittel, wie viele User‑Nachrichten es bereits gibt
    const userCount = newMessages.filter((m) => m.role === 'user').length
    const maxQuestions = isPremium ? Infinity : 3
    // Wenn die Maximalzahl erreicht ist, Reise beenden
    if (userCount >= maxQuestions) {
      endJourney(newMessages)
      return
    }
    // Frag den Reiseführer nach der nächsten Frage – sowohl bei Free
    // als auch bei Premium. Fällt der API‑Call aus, wird eine Fallback‑Frage benutzt.
    try {
      const resApi = await fetch('/api/guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await resApi.json()
      const aiQuestion = data.question || questions[userCount % questions.length]
      setMessages([...newMessages, { role: 'assistant', content: aiQuestion }])
    } catch (err) {
      const fallbackQ = questions[userCount % questions.length]
      setMessages([...newMessages, { role: 'assistant', content: fallbackQ }])
    }
  }

  /**
   * Beendet die Traumreise, zeigt den Ladescreen und navigiert nach Abschluss.
   */
  function endJourney(msgs) {
    // Füge Abschlussnachricht hinzu
    const finalMessages = [
      ...msgs,
      {
        role: 'assistant',
        content: 'Danke für deine Antworten! Wir entschlüsseln jetzt deine Traumwelt …',
      },
    ]
    setMessages(finalMessages)
    const queryObj = {
      premium: isPremium ? 'true' : undefined,
      scenes: isPremium ? String(scenes) : undefined,
      comic: isPremium && comic ? 'true' : undefined,
      diary: isPremium && diary ? 'true' : undefined,
      community: isPremium && community ? 'true' : undefined,
      video: isPremium && video ? 'true' : undefined,
      emotion: emotions.length > 0 ? emotions.join('-') : undefined,
      color,
      perspective,
      mood: String(mood),
      style: style,
      quality: quality.toLowerCase(),
      format: format.toLowerCase(),
      variants: isPremium ? '2' : '1',
    }
    const params = new URLSearchParams(
      Object.fromEntries(Object.entries(queryObj).filter(([, v]) => v !== undefined))
    ).toString()
    // onComplete navigiert nach Ablauf des Ladescreens
    const handleComplete = () => {
      const target = '/result' + (params ? `?${params}` : '')
      router.push(target)
    }
    // Wir lassen LoadingScreen via Zustand erscheinen, handleComplete wird dort übergeben
    setLoading({ show: true, onComplete: handleComplete })
  }

  // JSX: Stepper und formularbasierter Flow
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 space-y-6 relative">
      {/* Ganzseitiger Ladescreen */}
      <LoadingScreen
        show={loading.show}
        onComplete={loading.onComplete}
        duration={2000}
      />
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 text-center">
        Traumreise
      </h2>
      {/* Stepper */}
      <Stepper currentStep={step} steps={stepLabels} />
      {/* Schritt 0: Emotionen */}
      {step === 0 && (
        <div className="space-y-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Emotionen</h3>
            <div className="flex flex-wrap gap-2">
              {emotionOptions.map((emo) => (
                <button
                  key={emo}
                  type="button"
                  onClick={() => toggleEmotion(emo)}
                  className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                    emotions.includes(emo)
                      ? 'bg-brand text-white border-brand'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300'
                  }`}
                >
                  {emo}
                </button>
              ))}
            </div>
      {/* Individuelle Emotion hinzufügen */}
      <div className="flex gap-2 items-center mt-3">
        <input
          type="text"
          value={customEmotion}
          onChange={(e) => setCustomEmotion(e.target.value)}
          placeholder="Andere Emotion …"
          className="flex-1 border rounded-full px-3 py-1 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
        <button
          type="button"
          onClick={addCustomEmotion}
          className="bg-brand text-white px-4 py-1 rounded-full text-sm hover:bg-brand-dark transition-colors"
        >
          Hinzufügen
        </button>
      </div>
          </div>
          <div className="text-right">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="bg-brand text-white px-6 py-2 rounded-full hover:bg-brand-dark transition-colors"
            >
              Weiter
            </button>
          </div>
        </div>
      )}
      {/* Schritt 1: Einstellungen */}
      {step === 1 && (
        <div className="space-y-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Kunststil</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Surrealismus', 'Ölmalerei', 'Comic', 'Fantasy', 'Cyberpunk', 'Aquarell'].map((s) => {
                const disabled = !isPremium && !['Surrealismus', 'Ölmalerei'].includes(s)
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={disabled}
                    onClick={() => setStyle(s)}
                    className={`px-3 py-1 rounded border text-sm transition-colors ${
                      style === s ? 'bg-brand text-white border-brand' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {s}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Qualität</h3>
            <div className="flex gap-2 flex-wrap">
              {['Standard', 'HD', 'Ultra-HD'].map((q) => {
                const disabled = !isPremium && q !== 'Standard'
                return (
                  <button
                    key={q}
                    type="button"
                    disabled={disabled}
                    onClick={() => setQuality(q)}
                    className={`px-3 py-1 rounded border text-sm transition-colors ${
                      quality === q ? 'bg-brand text-white border-brand' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {q}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Format</h3>
            <div className="flex gap-2 flex-wrap">
              {['Quadratisch', 'Querformat', 'Hochformat'].map((f) => {
                const disabled = !isPremium && f !== 'Quadratisch'
                return (
                  <button
                    key={f}
                    type="button"
                    disabled={disabled}
                    onClick={() => setFormat(f)}
                    className={`px-3 py-1 rounded border text-sm transition-colors ${
                      format === f ? 'bg-brand text-white border-brand' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {f}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Farbpalette</h3>
            <div className="flex flex-wrap gap-4">
              {['düster', 'bunt', 'pastell', 'kontrastreich'].map((c) => (
                <label key={c} className="flex items-center gap-1 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="color"
                    value={c}
                    checked={color === c}
                    onChange={() => setColor(c)}
                  />
                  <span className="capitalize">{c}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Perspektive</h3>
            <div className="flex flex-wrap gap-4">
              {[
                { value: 'vogel', label: 'Vogelperspektive' },
                { value: 'nah', label: 'Nahaufnahme' },
                { value: 'first', label: 'First‑Person' },
              ].map((p) => (
                <label key={p.value} className="flex items-center gap-1 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="perspective"
                    value={p.value}
                    checked={perspective === p.value}
                    onChange={() => setPerspective(p.value)}
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Stimmung</h3>
            <input
              type="range"
              min="0"
              max="100"
              value={mood}
              onChange={(e) => setMood(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {mood <= 33 ? 'ruhig' : mood >= 66 ? 'chaotisch' : 'ausgewogen'}
            </div>
          </div>
          {isPremium && (
            <div className="space-y-4 pt-4 border-t dark:border-gray-700">
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">Mehrere Szenen</h3>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={scenes}
                  onChange={(e) => setScenes(parseInt(e.target.value))}
                  className="w-20 px-2 py-1 border rounded"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="comic"
                  checked={comic}
                  onChange={(e) => setComic(e.target.checked)}
                />
                <label htmlFor="comic" className="text-sm text-gray-700 dark:text-gray-300">
                  Comic‑Panel‑Modus
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="diary"
                  checked={diary}
                  onChange={(e) => setDiary(e.target.checked)}
                />
                <label htmlFor="diary" className="text-sm text-gray-700 dark:text-gray-300">
                  Traum‑Tagebuch anlegen
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="community"
                  checked={community}
                  onChange={(e) => setCommunity(e.target.checked)}
                />
                <label htmlFor="community" className="text-sm text-gray-700 dark:text-gray-300">
                  Anonyme Traum‑Community beitreten
                </label>
              </div>
              {/* Videosequenz */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="video"
                  checked={video}
                  onChange={(e) => setVideo(e.target.checked)}
                />
                <label htmlFor="video" className="text-sm text-gray-700 dark:text-gray-300">
                  Videosequenz generieren
                </label>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 italic">
                Deine Traumreise als Video!{' '}
                <span className="font-medium text-brand">Coming soon</span>
              </div>
            </div>
          )}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="text-sm text-gray-600 dark:text-gray-400 underline"
            >
              Zurück
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="bg-brand text-white px-6 py-2 rounded-full hover:bg-brand-dark transition-colors"
            >
              Start Traumreise
            </button>
          </div>
        </div>
      )}
      {/* Schritt 2: Chat */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-gray-50 dark:bg-gray-800 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-brand text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            {/* Wenn Ladebalken aktiv ist, Info anzeigen */}
            {loading.show && (
              <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                Bild wird generiert …
              </div>
            )}
          </div>
          {/* Eingabefeld & Premium Hinweis */}
          {!loading.show ? (
            <>
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  placeholder="Schreibe hier deine Antwort …"
                />
                <button
                  type="submit"
                  className="bg-brand text-white px-6 py-2 rounded-full hover:bg-brand-dark transition-colors"
                >
                  Senden
                </button>
              </form>
              {!isPremium && (
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 pt-2">
                  Für tiefere Analyse & mehrere Szenen{' '}
                  <a href="/premium" className="text-brand underline">Premium freischalten</a>.
                </p>
              )}
            </>
          ) : null}
        </div>
      )}
    </div>
  )
}