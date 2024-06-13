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


