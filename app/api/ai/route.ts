import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { type, language, data } = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API Key missing' }, { status: 500 });
    }

    let systemPrompt = "You are a professional mystical palm reader and tarot expert. You must ALWAYS respond in the user's selected language.";
    let userContent: any[] = [];

    if (type === 'palm') {
      systemPrompt += ` Analyze the palm image provided. Provide a detailed 500+ word reading covering: Personality, Love Life, Career, Future Predictions, and Spiritual Advice. Use mystical, empathetic, and engaging language. The output language must be ${language}. Format the response in Markdown with bold headers.`;
      
      userContent = [
        { type: "text", text: `Analyze this palm reading in ${language}.` },
        {
          type: "image_url",
          image_url: {
            url: data.image, // Base64 string
          },
        },
      ];
    } else if (type === 'tarot') {
      const cards = data.cards.join(', ');
      systemPrompt += ` The user has drawn three tarot cards representing Past, Present, and Future. The cards are: ${cards}. Provide a detailed 400+ word interpretation of this spread in ${language}. Explain the symbolism of each card and how they connect to tell a story about the user's life. Be mystical and wise.`;
      
      userContent = [
        { type: "text", text: `Interpret these tarot cards: ${cards} in ${language}.` }
      ];
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent }
        ],
        temperature: 0.7,
      })
    });

    const result = await response.json();
    
    if (result.error) {
       console.error("OpenRouter Error:", result.error);
       throw new Error(result.error.message);
    }

    return NextResponse.json({ text: result.choices[0].message.content });

  } catch (error) {
    console.error('AI Error:', error);
    return NextResponse.json({ error: 'Failed to generate reading' }, { status: 500 });
  }
}
