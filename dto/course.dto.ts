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
  