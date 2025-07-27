import OpenAI from 'openai'
export default async function handler(req, res) {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const { messages, style } = req.body
  const dreamText = messages.map(m=>m.content).join(' ')

  const interpretationPrompt = `Analysiere und interpretiere diesen Traum in einfacher, verständlicher Sprache: ${dreamText}`
  const imagePrompt = `Ein ${style} Kunstwerk basierend auf diesem Traum: ${dreamText}. Kurz und prägnant beschreiben.`

  const [interpretationResp, image] = await Promise.all([
    client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: "Du bist ein kreativer Traumdeuter." }, { role: "user", content: interpretationPrompt }],
      max_tokens: 300
    }),
    client.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      size: "1024x1024"
    })
  ])

  res.status(200).json({ url: image.data[0].url, interpretation: interpretationResp.choices[0].message.content })
}