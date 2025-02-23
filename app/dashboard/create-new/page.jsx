"use client"
import React, { useContext, useEffect, useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import CustomeLoading from './_components/CustomeLoading'
import { VideoDataContext } from '@/app/_context/videoDataContext'
import { useUser } from '@clerk/nextjs'
import { VideoData } from '@/configs/schema'
import { db } from '@/configs/db'
import PlayerDialog from '../_components/PlayerDialog'
import { useRouter } from 'next/navigation'

function CreateNew() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [playVideo, setPlayVideo] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const router = useRouter();

    const { videoData, setVideoData } = useContext(VideoDataContext);
    const { user } = useUser();

    const onHandleInputChange = (fieldName, fieldValue) => {
        console.log(`📌 Input Change - ${fieldName}: ${fieldValue}`);
        setFormData(prev => ({ ...prev, [fieldName]: fieldValue }));
    };

    const onCreateClickHandler = async () => {
        setPlayVideo(false);
        await GetVideoScript();
    };

    const GetVideoScript = async () => {
        setLoading(true);
        const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and contextText as field.`;
        
        console.log("🔹 Generating Video Script with Prompt:", prompt);

        try {
            const resp = await axios.post('/api/get-video-script', { prompt });

            if (resp.data.result) {
                setVideoData(prev => ({ ...prev, videoScript: resp.data.result }));
                console.log("✅ Video Script Generated:", resp.data.result.scenes);

                await GenerateAudioFile(resp.data.result.scenes);
            }
        } catch (error) {
            console.error("❌ Error Generating Video Script:", error);
        }

        setLoading(false);
    };

    const GenerateAudioFile = async (videoScriptData = []) => {
        let script = videoScriptData.map(item => item.contextText).join(' ');

        try {
            const resp = await axios.post('/api/generate-audio', { text: script });

            if (resp.data && resp.data.publicUrl) {
                console.log("✅ Audio File URL:", resp.data.publicUrl);
                setVideoData(prev => ({ ...prev, audioFileUrl: resp.data.publicUrl }));

                await GenerateAudioCaption(resp.data.publicUrl, videoScriptData);
            } else {
                console.error("❌ No Audio File URL Received!");
            }
        } catch (error) {
            console.error("❌ Error Generating Audio:", error);
        }
    };

    const GenerateAudioCaption = async (fileUrl, videoScriptData) => {
        if (!fileUrl) {
            console.error("❌ No File URL for Caption Generation!");
            return;
        }

        setLoading(true);

        try {
            const resp = await axios.post('/api/generate-caption', { audioFileUrl: fileUrl });

            if (resp.data && resp.data.result) {
                console.log("✅ Captions Generated:", resp.data.result);
                setVideoData(prev => ({ ...prev, captions: resp.data.result }));

                await GenerateImage(videoScriptData);
            } else {
                console.error("❌ No Captions Received!");
            }
        } catch (error) {
            console.error("❌ Error Generating Captions:", error);
        }

        setLoading(false);
    };

    const GenerateImage = async (videoScriptData) => {
        let images = [];

        for (const element of videoScriptData) {
            try {
                const resp = await axios.post('/api/generate-image', {
                    prompt: element.imagePrompt
                });

                if (resp.data.publicUrl) {
                    console.log("✅ Generated Image URL:", resp.data.publicUrl);
                    images.push(resp.data.publicUrl);
                } else {
                    console.error("❌ Image Generation Failed for:", element.imagePrompt);
                }
            } catch (e) {
                console.error("❌ Error Generating Image:", e);
            }
        }

        console.log("🔹 Final Image List:", images);

        setVideoData(prev => ({ ...prev, imageList: images }));
    };

    useEffect(() => {
        console.log("🚀 Updated Video Data:", videoData);

        if (
            videoData?.videoScript &&
            videoData?.audioFileUrl &&
            videoData?.captions &&
            videoData?.imageList?.length > 0
        ) {
            SaveVideoData(videoData);
        }
    }, [videoData]);

    const SaveVideoData = async (data) => {
        setLoading(true);

        console.log("🚀 Saving to DB:", data);

        if (!data?.audioFileUrl) {
            console.error("❌ Missing Audio File URL! Aborting Save.");
            setLoading(false);
            return;
        }

        try {
            const imageUrls = data.imageList.map(img => img); // Extract URLs if needed

            const result = await db.insert(VideoData).values({
                script: data.videoScript,
                audioFileUrl: data.audioFileUrl,
                captions: data.captions,
                imageList: imageUrls, 
                createdBy: user?.primaryEmailAddress?.emailAddress
            }).returning({ id: VideoData.id });

            setVideoId(result[0].id);
            setPlayVideo(true);
            console.log("✅ Successfully Saved to DB:", result);
        } catch (error) {
            console.error("❌ Database Insert Error:", error);
        }

        setLoading(false);
    };

    return (
        <div className='md:px-20'>
            <h2 className='font-bold text-4xl text-primary text-center'>Create New</h2>
            <div className='mt-10 shadow-md p-10'>
                <SelectTopic onUserSelect={onHandleInputChange} />
                <SelectStyle onUserSelect={onHandleInputChange} />
                <SelectDuration onUserSelect={onHandleInputChange} />

                <Button className="mt-10 w-full" onClick={onCreateClickHandler}>Create Story</Button>
            </div>
            <CustomeLoading loading={loading} />
            {playVideo && (
                <PlayerDialog
                    playVideo={playVideo}
                    videoId={videoId}
                    closeDialog={() => setPlayVideo(false)}
                />
            )}
        </div>
    );
}

export default CreateNew;
