let jobs = {}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { messages, style, fast } = req.body
    const jobId = Math.random().toString(36).substring(2)
    jobs[jobId] = { status: 'processing', image: null, interpretation: null }
    generateDream(jobId, messages, style, fast)
    return res.status(200).json({ jobId })
  } else if (req.method === 'GET') {
    const { jobId } = req.query
    if (!jobs[jobId]) return res.status(404).json({ error: 'Job not found' })
    return res.status(200).json(jobs[jobId])
  }
}

import OpenAI from 'openai'
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function generateDream(jobId, messages, style, fast) {
  try {
    const dreamText = messages.map(m=>m.content).join(' ')
    
    // 1. Traum in sichere, kurze Bildbeschreibung umschreiben
    const compressionPrompt = `Fasse diesen Traum in maximal 800 Zeichen zusammen. 
    Formuliere eine neutrale, sichere, bildhafte Beschreibung für eine ${style} Darstellung, 
    ohne Gewalt, Erotik oder beleidigende Sprache: ${dreamText}`

    const compressed = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Du bist ein Assistent, der bildhafte, sichere Kurzbeschreibungen erstellt." },
        { role: "user", content: compressionPrompt }
      ],
      max_tokens: 300
    })

    let safePrompt = compressed.choices[0].message.content.slice(0, 1000)

    const interpretationPrompt = `Analysiere und interpretiere diesen Traum in einfacher, verständlicher Sprache: ${dreamText}`

    // 2. Parallel Interpretation + Bild generieren (mit Fallback)
    const [interpretationResp, image] = await Promise.all([
      client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: "Du bist ein kreativer Traumdeuter." }, { role: "user", content: interpretationPrompt }],
        max_tokens: 300
      }),
      generateImageWithFallback(safePrompt, style, fast)
    ])

    jobs[jobId] = { status: 'done', image: image, interpretation: interpretationResp.choices[0].message.content }
  } catch (e) {
    jobs[jobId] = { status: 'error', error: e.message }
  }
}

async function generateImageWithFallback(prompt, style, fast) {
  try {
    const resp = await client.images.generate({
      model: fast ? "dall-e-2" : "dall-e-3",
      prompt,
      size: "1024x1024"
    })
    return resp.data[0].url
  } catch (e) {
    // Fallback zu DALL-E-2 wenn DALL-E-3 blockt oder fehlschlägt
    const fallback = await client.images.generate({
      model: "dall-e-2",
      prompt,
      size: "1024x1024"
    })
    return fallback.data[0].url
  }
}