"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { CourseDto } from "@/dto/course.dto";

import { CarouselComponent } from "@/component/CarouselComponent";
import { Header } from "@/component/Header";
import { CardComponent } from "@/component/CardComponent";
import { FooterComponents } from "@/component/Footer";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VideoWithTextLogo from "@/component/VideoWithTextLogo";
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
    <div className="">
    <Header />
    <VideoWithTextLogo src="/videos/video2.mp4" logoText="Your Logo Text" />

    <FooterComponents />
  </div>
  );
}
