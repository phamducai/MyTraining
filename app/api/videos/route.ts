import prisma from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Writable } from 'stream';
import { createWriteStream } from 'fs';

// // Config to disable body parsing for file uploads
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req: NextRequest) {
  const videoDir = path.join(process.cwd(), 'public/videos');

  // Ensure the videos directory exists
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File;
  const title = formData.get('title') as string;
  const courseId = formData.get('course_id') as string;
  const description = formData.get('description') as string;
  const displayOrder = formData.get('display_order') as string;

  const fileName = file.name;
  const filePath = path.join(videoDir, fileName);

  const writableStream = createWriteStream(filePath);
  const readableStream = file.stream();

  // Convert browser ReadableStream to Node.js stream
  const reader = readableStream.getReader();

  const nodeStream = new Writable({
    write(chunk, encoding, callback) {
      writableStream.write(chunk, encoding, callback);
    },
    final(callback) {
      writableStream.end(callback);
    },
  });

  async function pump() {
    const { done, value } = await reader.read();
    if (done) {
      nodeStream.end();
      return;
    }
    nodeStream.write(value);
    await pump();
  }

  await pump();

  try {
    // Lưu thông tin video vào database
    await prisma.videos.create({
      data: {
        url: `/videos/${fileName}`,
        title,
        description,
        display_order: parseInt(displayOrder, 10),
        course_id: parseInt(courseId, 10),
      },
    });
    return NextResponse.json({ message: 'File uploaded and data saved successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save data to database' }, { status: 500 });
  }
}


export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const courseId = url.searchParams.get('courseId');

    if (courseId) {
      // Nếu có courseId trong query, lấy video theo ID của khóa học
      if (isNaN(Number(courseId))) {
        return NextResponse.json({ message: 'Invalid course ID' }, { status: 400 });
      }

      const course = await prisma.courses.findUnique({
        where: {
          id: Number(courseId),
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
    } else {
      // Nếu không có courseId, trả về tất cả các video
      const videos = await prisma.videos.findMany({
        orderBy: [
          { created_at: 'desc' }
        ]
      });
      return NextResponse.json(videos);
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ message: 'Failed to fetch videos' }, { status: 500 });
  }
}
