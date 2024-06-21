"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { CourseDto } from "@/dto/course.dto";

import { FooterComponents } from "@/component/Footer";
import VideoWithFullscreenWatermark from "@/component/VideoWithTextLogo";
export default function Home() {
  const [courses, setCourses] = useState<CourseDto[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/courses");
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {/* <Header /> */}
      <VideoWithFullscreenWatermark src="/videos/video2.mp4" logoText="Your Logo Text" />
      <FooterComponents />
    </div>
  );
}
