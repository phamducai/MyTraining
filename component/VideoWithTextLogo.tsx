"use client";

import React, { useRef, useEffect } from 'react';
import screenfull from 'screenfull';
import ReactPlayer from 'react-player'


interface VideoWithFullscreenWatermarkProps {
  src: string;
  logoText: string;
}


const VideoWithFullscreenWatermark: React.FC<VideoWithFullscreenWatermarkProps> = ({ src, logoText }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (watermarkRef.current) {
        const isFullscreen = screenfull.isFullscreen;
        watermarkRef.current.classList.toggle('fullscreen-watermark', isFullscreen);
      }
    };

    const videoElement = videoRef.current;

    if (videoElement) {
      console.log('videoElement', videoElement);
      videoElement.addEventListener('fullscreenchange', handleFullscreenChange);
      videoElement.addEventListener('webkitfullscreenchange', handleFullscreenChange); // For Safari
      videoElement.addEventListener('mozfullscreenchange', handleFullscreenChange); // For Firefox
      videoElement.addEventListener('MSFullscreenChange', handleFullscreenChange); // For IE/Edge

      // Cleanup
      return () => {
        videoElement.removeEventListener('fullscreenchange', handleFullscreenChange);
        videoElement.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        videoElement.removeEventListener('mozfullscreenchange', handleFullscreenChange);
        videoElement.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      };
    }
  }, []);

  const handleFullscreen = () => {
    console.log(screenfull.isEnabled);
    if (videoRef.current && screenfull.isEnabled) {
      screenfull.toggle(videoRef.current);
    }
  };

  return (
   <div>
     <div className="video-container">
      <video
        ref={videoRef}
        className="video-js"
        controls
        preload="auto"
        width="100%"
        height="auto"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div ref={watermarkRef} className="videoTextLogo">{logoText}</div>
      <button onClick={handleFullscreen} className="fullscreen-button">Toggle Fullscreen1234</button>
    </div>
    {/* <div className='player-wrapper'>
          <ReactPlayer
            className='react-player fixed-bottom'
            url= {src}
            width='50%'
            height='100%'
            controls = {true}
          />
        </div> */}
   </div>
  );
};

export default VideoWithFullscreenWatermark;
