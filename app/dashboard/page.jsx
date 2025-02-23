'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { VideoData } from '@/configs/schema';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import VideoList from './_components/VideoList';

/**
 * Extracts the first image URL from the stored imageList.
 */
const extractFirstImageUrl = (imageList) => {
  try {
    if (!imageList || imageList.length === 0) return "";

    let images = typeof imageList === "string" ? JSON.parse(imageList) : imageList;

    if (!Array.isArray(images) || images.length === 0) {
      console.error("imageList is empty or not an array:", images);
      return "";
    }

    return images[0]; // ✅ Always take the first image
  } catch (error) {
    console.error("Error parsing imageList:", error);
    return "";
  }
};
function Dashboard() {
  const [videoList, setVideoList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) GetVideoList();
  }, [user]);

  /**
   * Fetch user's video list from the database.
   */
  const GetVideoList = async () => {
    try {
      const result = await db
        .select()
        .from(VideoData)
        .where(eq(VideoData.createdBy, user?.primaryEmailAddress?.emailAddress));

      console.log("Fetched Videos:", result);

      // Ensure image URLs are correctly extracted
      const validVideos = result.map((video) => ({
        ...video,
        audioFileUrl: video.audioFileUrl || "", // Handle undefined
        imageUrl: extractFirstImageUrl(video.imageList),
      }));

      setVideoList(validVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-2xl text-primary'>Dashboard</h2>
        <Link href={'/dashboard/create-new'}>
          <Button>+ Create New</Button>
        </Link>
      </div>

      {/* Pass videoList to VideoList Component */}
      <VideoList videoList={videoList} />
    </div>
  );
}

export default Dashboard;