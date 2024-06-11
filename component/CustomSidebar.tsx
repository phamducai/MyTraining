"use client";
import React, { useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { videoConfig } from '../data/videoConfig';
import clsx from 'clsx';

const CustomSidebar: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Thêm trạng thái để lưu chỉ mục của mục được chọn

  const handleItemClick = (videoUrl: string, index: number) => {
    setSelectedVideo(videoUrl);
    setActiveIndex(index); // Cập nhật trạng thái chỉ mục được chọn
  };

  return (
    <div className="flex h-screen overflow-y-auto sticky top-16">
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
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Collapse label="Chuong 1" className='font-bold'>
              {videoConfig.map((video, index) => (
                <Sidebar.Item
                  key={index}
                  onClick={() => handleItemClick(video.url, index)}
                  className={clsx({ 'bg-red-100 font-bold': activeIndex === index })} // Sử dụng clsx để thêm lớp CSS khi mục được chọn
                >
                  {video.title}
                </Sidebar.Item>
              ))}
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Collapse label="Chuong 2">
              {videoConfig.map((video, index) => (
                <Sidebar.Item
                  key={index}
                  href="#"
                  onClick={() => handleItemClick(video.url, index)}
                  className={clsx({ 'bg-blue-500 text-white': activeIndex === index })} // Sử dụng clsx để thêm lớp CSS khi mục được chọn
                >
                  {video.title}
                </Sidebar.Item>
              ))}
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    
    </div>
  );
};

export default CustomSidebar;
