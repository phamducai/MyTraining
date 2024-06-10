// src/api/users.ts
import prisma from '../utils/prisma';

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const createUser = async (data: { name: string, email: string, password: string, role: string }) => {
  return await prisma.user.create({
    data,
  });
};

export const updateUser = async (id: number, data: { name?: string, email?: string, password?: string, role?: string }) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};
