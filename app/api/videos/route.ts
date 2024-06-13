import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';
import path from "path";
import fs from "fs/promises";

// export async function GET() {
//   try {
//     const videos = await prisma.videos.findMany({
//       orderBy: [
//         { created_at: 'desc' }
//       ]
//     });
//     return NextResponse.json(videos);
//   } catch (error) {
//     console.error('Error fetching videos:', error);
//     return NextResponse.json({ message: 'Failed to fetch videos' }, { status: 500 });
//   }
// }

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

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const courseId = formData.get("course_id") as string;
    const description = formData.get("description") as string;
    const displayOrder = formData.get("display_order") as string;
    console.log(title, courseId, description, displayOrder);
    if (!file) {
      throw new Error("File not provided");
    }
    const uniqueFileName = `${Date.now()}_${title}.mp4`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const filePath = path.join(process.cwd(), "public", "videos", uniqueFileName);
    
    // Ensure the directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    
    // Write the file
    await fs.writeFile(filePath, buffer);

    await prisma.videos.create({
      data: {
        title: title,
        url: `/videos/${uniqueFileName}`,
        course_id: +courseId,
        updated_at: new Date(),
        created_at: new Date(),
        description: description,
        display_order: +displayOrder,
      },
    });

    return NextResponse.json({ status: "success" });
  } catch (e: any) {
    console.error("Error in file upload:", e);
    return NextResponse.json({ status: "fail", error: e.message });
  }
}
