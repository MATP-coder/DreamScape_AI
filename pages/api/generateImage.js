/**
 * API‑Route zur Bildgenerierung
 *
 * Diese Route nutzt den OpenAI‑Image‑Endpoint, um ein oder mehrere
 * Bilder aus einer vom Nutzer generierten Beschreibung zu erzeugen.
 * Die API‑Keys werden aus der Umgebung gelesen (z. B. Vercel Env var
 * OPENAI_API_KEY). Über die Query‑Parameter lassen sich Anzahl der
 * Bilder (scenes) und die Beschreibung (prompt) steuern. Bei einem
 * Fehler wird eine aussagekräftige Meldung zurückgegeben.
 */
export default async function handler(req, res) {
  // Destructure query parameters. `prompt` enthält die Bildbeschreibung,
  // `scenes` die gewünschte Anzahl an Bildern (max. 5).
  const { prompt = '', scenes = '1' } = req.query

  // Versuche den API‑Key aus verschiedenen Quellen zu lesen. Manche Deployment‑Umgebungen
  // setzen Umgebungsvariablen mit dem Prefix `NEXT_PUBLIC_`, daher prüfen wir beides.
  const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY ist nicht gesetzt' })
  }

  const numImages = Math.min(parseInt(scenes, 10) || 1, 5) // Begrenze auf max. 5 Bilder

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: String(prompt).slice(0, 1000),
        n: numImages,
        size: '1024x1024',
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return res.status(response.status).json({ error: errorText })
    }
    const data = await response.json()
    const images = (data?.data || []).map((item) => item.url)
    return res.status(200).json({ images })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Fehler bei der Bildgenerierung' })
  }
}