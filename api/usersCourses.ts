// src/api/usersCourses.ts
import prisma from '../utils/prisma';

export const getUsersCourses = async () => {
  return await prisma.usersCourses.findMany();
};

export const getUserCourseById = async (id: number) => {
  return await prisma.usersCourses.findUnique({
    where: { id },
  });
};

export const createUserCourse = async (data: { userId: number, courseId: number, watched: number }) => {
  return await prisma.usersCourses.create({
    data,
  });
};

export const updateUserCourse = async (id: number, data: { userId?: number, courseId?: number, watched?: number }) => {
  return await prisma.usersCourses.update({
    where: { id },
    data,
  });
};

export const deleteUserCourse = async (id: number) => {
  return await prisma.usersCourses.delete({
    where: { id },
  });
};
