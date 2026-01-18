import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

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

        // Create ElevenLabs client
        const elevenlabs = new ElevenLabsClient({
            apiKey: apiKey,
        });

        // Convert text to speech using ElevenLabs SDK
        const audio = await elevenlabs.textToSpeech.convert(
            'JBFqnCBsd6RMkjVDRZzb', // George voice - clear and professional
            {
                text: text,
                modelId: 'eleven_multilingual_v2',
                outputFormat: 'mp3_44100_128',
            }
        );

        // Convert the readable stream to a buffer
        const chunks: Uint8Array[] = [];
        for await (const chunk of audio) {
            chunks.push(chunk);
        }
        const audioBuffer = Buffer.concat(chunks);

        // Return audio as response
        return new NextResponse(audioBuffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Length': String(audioBuffer.length),
            },
        });
    } catch (error) {
        console.error('TTS error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
