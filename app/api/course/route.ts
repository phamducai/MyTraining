import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
      // Extracting courseId from the query parameters
    //   const { searchParams } = new URL(req.url);
      const courseId = 1001;
  
      if (isNaN(courseId)) {
        return NextResponse.json({ message: 'Invalid course ID' }, { status: 400 });
      }
  
      const course = await prisma.courses.findUnique({
        where: {
          id: courseId,
        },
        select: {
          title: true,
          Videos: {
            select: {
              title: true,
              url: true,
            },
          },
        },
      });
  
      if (!course) {
        return NextResponse.json({ message: 'Course not found' }, { status: 404 });
      }
  
      return NextResponse.json(course);
    } catch (error) {
      console.error('Error fetching course:', error);
      return NextResponse.json({ message: 'Failed to fetch course' }, { status: 500 });
    }
  }