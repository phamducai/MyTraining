// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import cloudinary from '@/utils/cloudinary';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const title = formData.get('title') as string | null;
  const courseId = formData.get('course_id') as string | null;
  const description = formData.get('description') as string | null;
  const displayOrder = formData.get('display_order') as string | null;

  if (!file || !title || !courseId || !description || !displayOrder) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadPromise = new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'video' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result as { secure_url: string });
          }
        }
      );
      stream.end(buffer);
    });

    const uploadResponse = await uploadPromise;
    const fileUrl = uploadResponse.secure_url;
    console.log('File uploaded:', fileUrl);

    await prisma.videos.create({
      data: {
        url: fileUrl,
        title,
        description,
        display_order: parseInt(displayOrder, 10),
        course_id: parseInt(courseId, 10),
      },
    });

    return NextResponse.json({ message: 'File uploaded and data saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file and save data' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const courseId = url.searchParams.get('courseId');

    if (courseId) {
      if (isNaN(Number(courseId))) {
        return NextResponse.json({ message: 'Invalid course ID' }, { status: 400 });
      }

      const course = await prisma.courses.findUnique({
        where: { id: Number(courseId) },
        select: {
          title: true,
          Videos: {
            select: {
              title: true,
              url: true,
              description: true,
            },
          },
        },
      });

      if (!course) {
        return NextResponse.json({ message: 'Course not found' }, { status: 404 });
      }

      return NextResponse.json(course);
    } else {
      const videos = await prisma.videos.findMany({
        orderBy: { created_at: 'desc' },
      });
      return NextResponse.json(videos);
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ message: 'Failed to fetch videos' }, { status: 500 });
  }
}
