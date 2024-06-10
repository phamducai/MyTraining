// src/api/courses.ts
import prisma from '../utils/prisma';

export const getCourses = async () => {
  return await prisma.course.findMany();
};

export const getCourseById = async (id: number) => {
  return await prisma.course.findUnique({
    where: { id },
  });
};

export const createCourse = async (data: { title: string, description: string, imgSrc?: string, createdBy?: number, totalVideos?: number }) => {
  return await prisma.course.create({
    data,
  });
};

export const updateCourse = async (id: number, data: { title?: string, description?: string, imgSrc?: string, createdBy?: number, totalVideos?: number }) => {
  return await prisma.course.update({
    where: { id },
    data,
  });
};

export const deleteCourse = async (id: number) => {
  return await prisma.course.delete({
    where: { id },
  });
};
