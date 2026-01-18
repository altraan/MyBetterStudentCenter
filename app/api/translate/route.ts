import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Cache for translations to avoid repeated API calls
const translationCache: Map<string, Map<string, string>> = new Map();

export async function POST(req: NextRequest) {
    try {
        const { text, targetLanguage, languageName } = await req.json();

        if (!text || !targetLanguage) {
            return NextResponse.json(
                { error: 'Missing text or targetLanguage' },
                { status: 400 }
            );
        }

        // Check cache first
        const cacheKey = `${text}:${targetLanguage}`;
        if (translationCache.has(text) && translationCache.get(text)?.has(targetLanguage)) {
            return NextResponse.json({
                translation: translationCache.get(text)!.get(targetLanguage)
            });
        }

        // Read API key
        let apiKey: string;
        try {
            const apiKeyPath = path.join(process.cwd(), '.gemini_api');
            apiKey = (await fs.readFile(apiKeyPath, 'utf-8')).trim();
        } catch (error) {
            console.error('Failed to read API key:', error);
            return NextResponse.json(
                { error: 'Gemini API key not configured. Please check .gemini_api file.' },
                { status: 500 }
            );
        }

        const prompt = `Translate the following English text to ${languageName || targetLanguage}. 
Only respond with the translation, no explanations or additional text.
Keep it concise and natural.

Text to translate: "${text}"`;

        const payload = {
            contents: [{
                role: "user",
                parts: [{ text: prompt }]
            }]
        };

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API Error Response:', errorText);
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const translation = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || text;

        // Cache the translation
        if (!translationCache.has(text)) {
            translationCache.set(text, new Map());
        }
        translationCache.get(text)!.set(targetLanguage, translation);

        return NextResponse.json({ translation });

    } catch (error) {
        console.error('Translation API Error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to translate' },
            { status: 500 }
        );
    }
}
