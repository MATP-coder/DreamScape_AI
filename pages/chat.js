
import { useState } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState([{role: 'assistant', content: 'Erzähle mir von deinem Traum. Was ist passiert?'}])
  const [input, setInput] = useState('')
  const [style, setStyle] = useState('Fotorealistisch')
  const [fast, setFast] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(1)
  const totalSteps = 5

  const sendMessage = async (quickReply) => {
    const message = quickReply || input
    if (!message) return
    const newMessages = [...messages, { role: 'user', content: message }]
    setMessages(newMessages)
    setInput('')
    setStep(Math.min(step + 1, totalSteps))
    setLoading(true)
    const res = await fetch('/api/processDream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    })
    const data = await res.json()
    setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    setLoading(false)
  }

  const startDream = async () => {
    setLoading(true)
    setProgress(10)
    const res = await fetch('/api/job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, style, fast })
    })
    const { jobId } = await res.json()
    pollJob(jobId)
  }

  const pollJob = async (jobId) => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/job?jobId=${jobId}`)
      const data = await res.json()
      if (data.status === 'done') {
        clearInterval(interval)
        setProgress(100)
        setLoading(false)
        window.location.href = `/result?jobId=${jobId}`
      } else if (data.status === 'error') {
        clearInterval(interval)
        alert('Fehler: ' + data.error)
        setLoading(false)
      } else {
        setProgress(p => Math.min(p + 10, 90))
      }
    }, 2000)
  }

  const quickReplies = ["Es war nachts", "Ich war draußen", "Es waren fremde Wesen", "Ich fühlte Angst"]

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-gray-100">
      <div className="flex flex-1 flex-col md:flex-row">
        <div className="w-full md:w-2/3 p-4">
          <div className="border rounded p-4 h-[60vh] md:h-[70vh] overflow-y-auto bg-white dark:bg-gray-800 shadow space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={`inline-block px-4 py-2 rounded-lg ${m.role === 'user' ? 'bg-brand text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  <p>{m.content}</p>
                </div>
              </div>
            ))}
            {loading && <p className="italic">Verarbeite...</p>}
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Frage {step} von {totalSteps}
          </div>
          <div className="flex flex-col sm:flex-row mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
            <input className="flex-1 border rounded p-2 dark:bg-gray-700 dark:text-white" value={input} onChange={e => setInput(e.target.value)} placeholder="Beschreibe deinen Traum..." />
            <button onClick={() => sendMessage()} className="px-4 py-2 bg-brand text-white rounded">Senden</button>
          </div>
          <div className="mt-3 flex space-x-2 flex-wrap">
            {quickReplies.map((q,i)=>(
              <button key={i} onClick={()=>sendMessage(q)} className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-sm">{q}</button>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/3 p-4 border-t md:border-t-0 md:border-l bg-gray-50 dark:bg-gray-800">
          <h2 className="text-lg md:text-xl font-bold mb-2">Bildstil</h2>
          {['Fotorealistisch','Mystisch','Surreal','Fantasy','Künstlerisch','Cartoon'].map((opt) => (
            <div key={opt} className="mb-1">
              <input type="radio" name="style" value={opt} checked={style===opt} onChange={e=>setStyle(e.target.value)} /> {opt}
            </div>
          ))}
          <div className="mt-4">
            <label className="text-sm md:text-base">
              <input type="checkbox" checked={fast} onChange={e=>setFast(e.target.checked)} /> Schnellere Generierung (DALL·E 2)
            </label>
          </div>
          <button onClick={startDream} className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded">Ergebnis erstellen</button>
          {loading && (
            <div className="mt-4 text-center">
              <p className="animate-pulse">Deine Traumreise wird erstellt...</p>
              <div className="w-full bg-gray-200 rounded h-4 mt-2 dark:bg-gray-700">
                <div className="bg-brand h-4 rounded transition-all" style={{width: progress + '%'}}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
