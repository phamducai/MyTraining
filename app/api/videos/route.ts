import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const videos = await prisma.videos.findMany({
      orderBy: [
        { created_at: 'desc' }
      ]
    });
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ message: 'Failed to fetch videos'}, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, url, courseId } = await req.json();
    // const video = await prisma.videos.create({
    //   data: { title, description, url, courseId },
    // });
    return NextResponse.json("hello");
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json({ message: 'Failed to create video' }, { status: 500 });
  }
}
