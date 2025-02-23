import Replicate from "replicate";
import { writeFile } from "node:fs/promises";
import { NextResponse } from 'next/server';
import axios from "axios";
import { supabase } from '@/configs/SupaBaseConfig';

export async function POST(req) {
    try {
        const { prompt } = await req.json();
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN
        });

        const input = {
            prompt: prompt,
            height: 1280,
            width: 1024,
            num_outputs: 1
        };

        const output = await replicate.run("bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637", { input });

        console.log("Replicate Output:", output); // ✅ Log Replicate output
        if (!output || output.length === 0) {
            return new Response(JSON.stringify({ error: "Failed to generate image from Replicate" }), { status: 500 });
        }

        const base64Image = await ConvertImage(output[0]);
        if (!base64Image) {
            return new Response(JSON.stringify({ error: "Failed to convert image to Base64" }), { status: 500 });
        }

        const buffer = Buffer.from(base64Image, "base64");
        const fileName = `Ai-audio/${Date.now()}.png`;

        const { data, error } = await supabase.storage
            .from('Ai-Content') // Use only the bucket name
            .upload(fileName, buffer, {
                cacheControl: '3600',
                upsert: false,
                contentType: 'image/png',
            });

        console.log("Supabase Upload Response:", data);
        console.log("Supabase Upload Error:", error);

        if (error) {
            console.error('Error uploading to Supabase:', error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        const  publicUrl  = supabase.storage.from('Ai-Content').getPublicUrl(fileName).data.publicUrl;
        console.log("Generated Public URL:", publicUrl); // ✅ Check if public URL is generated

        return NextResponse.json({ publicUrl }); // ✅ Ensure correct response key
    } catch (e) {
        console.error("Error in API:", e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

const ConvertImage = async (imageUrl) => {
    try {
        console.log("Fetching image from URL:", imageUrl); // ✅ Log image URL
        const resp = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        const base64Image = Buffer.from(resp.data).toString('base64');
        return base64Image;
    } catch (e) {
        console.error('Error in ConvertImage:', e);
        return null;
    }
};