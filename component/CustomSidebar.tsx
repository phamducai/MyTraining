"use client";
import React, { useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { videoConfig } from '../data/videoConfig';

const CustomSidebar: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="flex h-screen overflow-y-auto sticky top-16">
      <Sidebar aria-label="Sidebar with multi-level dropdown example ">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Collapse  label="Chuong 1" className='font-bold'>
              {videoConfig.map((video, index) => (
                <Sidebar.Item key={index} href="#" onClick={() => setSelectedVideo(video.url)}>
                  {video.title}
                </Sidebar.Item>
              ))}
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Collapse  label="Chuong 1">
              {videoConfig.map((video, index) => (
                <Sidebar.Item key={index} href="#" onClick={() => setSelectedVideo(video.url)}>
                  {video.title}
                </Sidebar.Item>
              ))}
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className="flex-1 p-4 h-full overflow-y-auto">
        {selectedVideo && (
         <div>
           <video key={selectedVideo} controls width="80%" height="auto" controlsList="nodownload">
            <source src={selectedVideo} type="video/mp4" />
          </video>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
         </div>
        )}
      </div>
    </div>
  );
};

export default CustomSidebar;
