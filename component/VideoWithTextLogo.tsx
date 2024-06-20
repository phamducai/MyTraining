"use client";
import { useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoWithTextLogoProps {
  src: string;
  logoText: string;
}

const VideoWithTextLogo: React.FC<VideoWithTextLogoProps> = ({ src, logoText }) => {
  useEffect(() => {
    const player = videojs('my_video');

    const textLogo = document.createElement('div');
    textLogo.textContent = logoText;
    textLogo.className = 'videoTextLogo';

    const videoContainer = document.querySelector('.video-js');
    videoContainer?.appendChild(textLogo);

    return () => {
      player.dispose();
    };
  }, [logoText]);

  return (
    <video
      id="my_video"
      className="video-js"
      controls
      preload="auto"
      width="640"
      height="264"
      data-setup="{}"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoWithTextLogo;