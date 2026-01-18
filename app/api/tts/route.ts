import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const { text } = await request.json();

        if (!text || typeof text !== 'string') {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        // Read API key from .api file
        let apiKey: string;
        try {
            const apiKeyPath = path.join(process.cwd(), '.api');
            apiKey = (await fs.readFile(apiKeyPath, 'utf-8')).trim();
        } catch (error) {
            console.error('Failed to read API key:', error);
            return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
        }

        // Call ElevenLabs API
        const voiceId = 'EXAVITQu4vr4xnSDxMaL'; // Sarah - friendly voice
        const response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': apiKey,
                },
                body: JSON.stringify({
                    text: text,
                    model_id: 'eleven_monolingual_v1',
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.5,
                    },
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('ElevenLabs API error:', errorText);
            return NextResponse.json({ error: 'TTS API error' }, { status: response.status });
        }

        // Return audio as a stream
        const audioBuffer = await response.arrayBuffer();

        return new NextResponse(audioBuffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Length': String(audioBuffer.byteLength),
            },
        });
    } catch (error) {
        console.error('TTS error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
