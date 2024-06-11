// src/dto/course.dto.ts

export interface CreateCourseDto {
    title: string;
    description: string;
    imgSrc?: string;
    createdBy?: number;
    totalVideos?: number;
  }
  
  export interface UpdateCourseDto {
    title?: string;
    description?: string;
    imgSrc?: string;
    createdBy?: number;
    totalVideos?: number;
  }
  export interface CourseDto {
    id: number;
    title: string;
    description: string | null;
    imgSrc: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    total_videos: number | null;
    display_order: number | null;
  }