"use client";
import React, { useEffect, useState, useRef } from "react";
import { Sidebar } from "flowbite-react";
import clsx from "clsx";
import axios from "axios";
import { CourseWithVideosDto } from "@/dto/course.dto";
import { useParams } from "next/navigation";
import { Accordion } from "flowbite-react";

const CustomSidebar: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [course, setCourse] = useState<CourseWithVideosDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isTabActive, setIsTabActive] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();

  const handleItemClick = (videoUrl: string | null, index: number | null) => {
    setSelectedVideo(videoUrl);
    setActiveIndex(index);
    setZoomLevel(1); // Reset zoom level when a new video is selected
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let courseId = id;
        setLoading(true);
        const res = await axios.get(`/api/videos?courseId=${courseId}`);
        setCourse(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="flex h-screen overflow-y-auto sticky top-16">
      <div className="flex-1 sm:p-4 h-full overflow-y-auto">
        {selectedVideo && (
          <div className="flex justify-center mt-16">
            <video
              key={selectedVideo}
              ref={videoRef}
              controls
              width={`${80 * zoomLevel}%`}
              height="auto"
              controlsList="nodownload"
              style={{ transform: `scale(${zoomLevel})` }}
              className="no-fullscreen-button"
              disablePictureInPicture
            >
              <source src={selectedVideo} type="video/mp4" />
            </video>
            <div ref={watermarkRef} className="watermark">
              Your Watermark Text Here
            </div>
          </div>
        )}
        {!selectedVideo && (
          <div className="flex justify-center mt-16 ml-6 mr-6">
            {course && (
              <Accordion collapseAll className="w-full">
                {course.Videos?.map((video) => (
                  <Accordion.Panel key={video.title}>
                    <Accordion.Title>   {video.title}</Accordion.Title>
                    <Accordion.Content>
                      {video.description}
                    </Accordion.Content>
                  </Accordion.Panel>
                ))}
              </Accordion>
            )}
          </div>
        )}
      </div>
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        className="w-slide"
      >
        <Sidebar.Items>
          {course && (
            <Sidebar.ItemGroup>
              <Sidebar.Collapse label={course.title} className="font-bold" open >
                <Sidebar.Item
                  onClick={() => handleItemClick(null, null)}
                  className={clsx({
                    "bg-gray-200 font-bold": activeIndex === null,
                  })}
                >
                  Tổng quan
                </Sidebar.Item>
                {course.Videos?.map((video, videoIndex) => (
                  <Sidebar.Item
                    key={videoIndex}
                    onClick={() => handleItemClick(video.url, videoIndex)}
                    className={clsx({
                      "bg-gray-200 font-bold": activeIndex === videoIndex,
                    })}
                  >
                    {video.title}
                  </Sidebar.Item>
                ))}
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>
          )}
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default CustomSidebar;
