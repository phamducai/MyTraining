import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const courses = await prisma.courses.findMany();
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ message: 'Failed to fetch courses'}, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, imgSrc, createdBy } = await req.json();
    const course = await prisma.courses.create({
      data: { title, description, imgSrc, createdBy },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ message: 'Failed to create course' }, { status: 500 });
  }
}
