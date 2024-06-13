"use client";
import React, { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import clsx from 'clsx';
import axios from 'axios';
import { CourseWithVideosDto } from '@/dto/course.dto';

const CustomSidebar: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [course, setCourse] = useState<CourseWithVideosDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  const handleItemClick = (videoUrl: string, index: number) => {
    setSelectedVideo(videoUrl);
    setActiveIndex(index);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true); // Set loading state to true before fetching data
        const res = await axios.get("/api/course"); // Adjust this endpoint as needed
        setCourse(res.data);
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false); // Set loading state to false if there is an error
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (course) {
      console.log("Course state updated:", course);
    }
  }, [course]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }
 console.log(course?.Videos);
  return (
    <div className="flex h-screen overflow-y-auto sticky top-16">
      <div className="flex-1 p-4 h-full overflow-y-auto">
        {selectedVideo && (
          <div>
            <video key={selectedVideo} controls width="80%" height="auto" controlsList="nodownload">
              <source src={selectedVideo} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items>
          {course && (
            <Sidebar.ItemGroup>
              <Sidebar.Collapse label={course.title} className='font-bold'>
                {course.Videos?.map((video, videoIndex) => (
                  <Sidebar.Item
                    key={videoIndex}
                    onClick={() => handleItemClick(video.url, videoIndex)}
                    className={clsx({ 'bg-red-100 font-bold': activeIndex === videoIndex })}
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
