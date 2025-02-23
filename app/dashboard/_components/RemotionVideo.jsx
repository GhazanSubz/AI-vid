import React, { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Img, Sequence, useCurrentFrame, useVideoConfig } from "remotion";

function RemotionVideo({ script, imageList = [], audioFileUrl, captions = [], setDurationInFrame }) {
  const { fps } = useVideoConfig();
  const [totalDurationFrames, setTotalDurationFrames] = useState(1);
  const frame=useCurrentFrame();

  useEffect(() => {
    if (captions.length > 0) {
      const lastCaptionEnd = captions[captions.length - 1]?.end || 0;
      const duration = Math.max(1, Math.round((lastCaptionEnd / 1000) * fps));
      setTotalDurationFrames(duration);
      if (setDurationInFrame) {
        setDurationInFrame(duration);
      }
    }
  }, [captions, fps, setDurationInFrame]);

    const getCurrentCaptions=()=>{
        const currentTime=frame/30*1000
        const currentCaption=captions.find((word)=>currentTime>=word.start && currentTime<=word.end)
        return currentCaption?currentCaption?.text:'';
    }

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* Render Images */}
      {imageList.length > 0 &&
        imageList.map((item, index) => {
          const fromFrame = Math.round((index * totalDurationFrames) / imageList.length);
          const durationFrames = Math.max(1, Math.round(totalDurationFrames / imageList.length));

          return (
            <Sequence key={index} from={fromFrame} durationInFrames={durationFrames}>
              <Img
                src={item}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <AbsoluteFill className="text-white items-center bottom-0 justify-center">
    
                     <h2 className='text-2xl'>{getCurrentCaptions()}</h2>
              </AbsoluteFill>
            </Sequence>
          );
       })}

      {/* Render Audio only if valid */}
      {audioFileUrl && typeof audioFileUrl === "string" && audioFileUrl.trim() !== "" ? (
        <Audio src={audioFileUrl} />
      ) : (
        console.warn("Warning: Invalid audioFileUrl:", audioFileUrl)
      )}
    </AbsoluteFill>
  );
}

export default RemotionVideo;