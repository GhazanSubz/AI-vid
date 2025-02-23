import React, { useState } from 'react';
import { Thumbnail } from '@remotion/player';
import RemotionVideo from './RemotionVideo';
import PlayerDialog from './PlayerDialog';

function VideoList({ videoList }) {
  
  const[openPlayDialog,setOpenPlayerDialog] = useState(false);
  const[videoId,setVideoId]=useState();

  console.log("Rendering VideoList with:", videoList);

  return (
    <div className='mt-10 grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-7' >
      {videoList?.map((video, index) => (
        <div key={index} className='cursor-pointer hover:scale-105 transition-all' onClick={()=>{setOpenPlayerDialog(Date.now());setVideoId(video.id)}}>
          
          {/* 🎵 Audio Player */}
          {video.audioFileUrl ? (
            <audio controls className="w-full mb-3">
              <source src={video.audioFileUrl} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <p className="text-red-400">No Audio Available</p>
          )}

          

          {/* 🎥 Video Thumbnail */}
          <Thumbnail
            acknowledgeRemotionLicense
            component={RemotionVideo}
            compositionWidth={300}
            compositionHeight={450}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            inputProps={{
              ...video,
              setDurationInFrame: (v) => console.log("Duration:", v),
            }}
          />
        </div>
      ))}
      <PlayerDialog playVideo={openPlayDialog} videoId={videoId}/>
    </div>
  );
}

export default VideoList;
