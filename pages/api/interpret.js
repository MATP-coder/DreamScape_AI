// API route for deep dream interpretation or answering follow-up questions using OpenAI

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured.' });
  }
  const { prompt, question } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }
  try {
    const messages = [];
    messages.push({
      role: 'system',
      content:
        'Du bist ein erfahrener Traumdeuter, der psychologische, symbolische und kreative Interpretationen miteinander verbindet. Beantworte die Fragen des Nutzers ausführlich auf Deutsch und verwende eine bildreiche Sprache. Wenn keine Frage gestellt wird, gib eine mehrschichtige Interpretation des Traums in 2–4 Absätzen ab.',
    });
    messages.push({ role: 'user', content: `Traumbeschreibung: ${prompt}` });
    if (question) {
      messages.push({ role: 'user', content: `Frage: ${question}` });
    }
    const body = {
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 500,
      temperature: 0.7,
    };
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: `OpenAI error: ${text}` });
    }
    const data = await response.json();
    const result = data.choices?.[0]?.message?.content?.trim();
    return res.status(200).json({ interpretation: result });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
}