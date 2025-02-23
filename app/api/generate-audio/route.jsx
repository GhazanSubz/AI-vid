import { NextResponse } from 'next/server';
import { supabase } from '@/configs/SupaBaseConfig';

export async function POST(request) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required.' },
        { status: 400 }
      );
    }

    const API_KEY = process.env.ELEVENS_API_KEY;
    const ELEVENLABS_URL = `https://api.elevenlabs.io/v1/text-to-speech/9BWtsMINqrJLrRacOk9x`;

    const response = await fetch(ELEVENLABS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': API_KEY,
      },
      body: JSON.stringify({
        text,
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ ElevenLabs API Error:", errorData);
      return NextResponse.json(
        { error: errorData.message || 'Failed to generate audio.' },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();
    console.log(`✅ Received audio buffer of size: ${audioBuffer.byteLength}`);

    const filePath = `Ai-audio/generated-audio-${Date.now()}.mp3`; 

    // ✅ Upload audio file to Supabase
    const { data, error } = await supabase.storage
      .from('Ai-Content') // Use only the bucket name
      .upload(filePath, audioBuffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'audio/mpeg',
      });

    if (error) {
      console.error('❌ Supabase Upload Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("✅ Uploaded file to Supabase:", data);

    // ✅ Get the public URL from Supabase
    const publicUrl = supabase.storage
      .from('Ai-Content')
      .getPublicUrl(filePath).data.publicUrl;

    if (!publicUrl) {
      console.error("❌ Failed to retrieve the public URL");
      return NextResponse.json(
        { error: "Could not generate audio file URL" },
        { status: 500 }
      );
    }

    console.log('✅ Generated Audio File URL:', publicUrl);
    return NextResponse.json({ publicUrl });

  } catch (error) {
    console.error('❌ Internal Server Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}