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
  // Extract query parameters for prompt and number of scenes.
  const {
    prompt = '',
    scenes = '1',
    variants = '1',
    style = '',
    quality = 'standard',
    format = 'square',
  } = req.query

  const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY ist nicht gesetzt' })
  }

  const numScenes = Math.min(parseInt(scenes, 10) || 1, 5)
  const numVariants = Math.min(parseInt(variants, 10) || 1, 5)

  // Determine image size based on orientation and quality
  let size
  const q = quality.toLowerCase()
  const f = format.toLowerCase()
  if (f === 'landscape') {
    size = q === 'standard' ? '1024x768' : q === 'hd' ? '1792x1024' : '1792x1024'
  } else if (f === 'portrait') {
    size = q === 'standard' ? '768x1024' : q === 'hd' ? '1024x1792' : '1024x1792'
  } else {
    // square orientation
    size = q === 'standard' ? '1024x1024' : q === 'hd' ? '1792x1792' : '1792x1792'
  }

  // Compose style into the prompt if provided
  const stylePrompt = style ? ` im Stil von ${style}` : ''
  const basePrompt = String(prompt).slice(0, 900)

  try {
    const images = []
    for (let sceneIndex = 0; sceneIndex < numScenes; sceneIndex++) {
      const resp = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: `${basePrompt}${stylePrompt}`,
          n: numVariants,
          size: size,
        }),
      })
      if (!resp.ok) {
        const errorText = await resp.text()
        return res.status(resp.status).json({ error: errorText })
      }
      const data = await resp.json()
      data.data.forEach((item) => images.push(item.url))
    }
    return res.status(200).json({ images })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Fehler bei der Bildgenerierung' })
  }
}