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
            'Du bist ein einfühlsamer Traumreiseführer. Stelle dem Nutzer eine Frage nach der anderen, um alle relevanten Details seines Traums zu erfahren. Bleib freundlich und kreativ. Verzichte auf lange Erklärungen; stelle nur die nächste Frage. Wenn bereits genug Fragen gestellt wurden, bitte den Nutzer, zum Ergebnis fortzufahren.',
        },
        ...messages,
      ],
      max_tokens: 60,
      temperature: 0.7,
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