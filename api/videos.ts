// src/api/videos.ts
import prisma from '../utils/prisma';

export const getVideos = async () => {
  return await prisma.video.findMany();
};

export const getVideoById = async (id: number) => {
  return await prisma.video.findUnique({
    where: { id },
  });
};

export const createVideo = async (data: { title: string, url: string, courseId: number }) => {
  return await prisma.video.create({
    data,
  });
};

export const updateVideo = async (id: number, data: { title?: string, url?: string, courseId?: number }) => {
  return await prisma.video.update({
    where: { id },
    data,
  });
};

export const deleteVideo = async (id: number) => {
  return await prisma.video.delete({
    where: { id },
  });
};
