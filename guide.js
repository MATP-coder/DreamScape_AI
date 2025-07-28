// API route to generate the next question in the dream journey using OpenAI

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { messages } = req.body;
    const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'OpenAI API key not configured.' });
    }
    // Build chat request
    const chatBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Du bist ein einfühlsamer, aber zielgerichteter Traumreiseführer. Dein Ziel ist es, möglichst detaillierte Informationen aus dem Traum herauszukitzeln, damit das daraus entstehende Bild beeindruckend und viralen Charakter hat. Stelle eine Frage nach der anderen über Figuren, Orte, Gefühle, besondere Symbole, Farben und verrückte Wendungen. Die Fragen sollen kurz, präzise und inspirierend sein. Verzichte auf Erklärungen und stelle nur die nächste Frage. Wenn der Nutzer genug Informationen geliefert hat, leite ihn freundlich zum Ergebnis weiter.',
        },
        ...messages,
      ],
      max_tokens: 60,
      temperature: 0.8,
    };
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(chatBody),
    });
    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: `OpenAI error: ${text}` });
    }
    const data = await response.json();
    const nextQuestion = data.choices?.[0]?.message?.content?.trim();
    return res.status(200).json({ question: nextQuestion });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
}