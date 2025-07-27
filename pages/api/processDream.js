import OpenAI from 'openai'
export default async function handler(req, res) {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const { messages } = req.body
  const chatPrompt = "Du bist ein Assistent, der Träume in Kunst umwandeln soll. Stelle dem Nutzer maximal 5 gezielte Fragen zu seinem Traum (z.B. Stimmung, Farben, Umgebung, besondere Figuren), um ein gutes Bild zu erzeugen. Fasse nichts zusammen, interpretiere nicht und zeige keine Prompts. Stelle immer nur eine Frage pro Antwort."

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: chatPrompt },
      ...messages
    ],
    max_tokens: 150
  })
  res.status(200).json({ reply: completion.choices[0].message.content })
}