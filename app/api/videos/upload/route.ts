import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import prisma from '@/utils/prisma';

const UPLOAD_DIR = path.resolve(process.cwd(),"public/videos");

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
    const file = formData.get("videoFile") as Blob | null;
    const title = formData.get("title") as string;
    const courseId = formData.get("course_id") as string;
    const description = formData.get("description") as string;
    const displayOrder = formData.get("display_order") as string;
    console.log(title, courseId, description, displayOrder);
     console.log("hello1",UPLOAD_DIR);
    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const uniqueFileName = `${Date.now()}_${title}.mp4`;
    const filePath = path.resolve(UPLOAD_DIR, uniqueFileName);

    fs.writeFileSync(filePath, buffer);
    console.log("hello2");
    await prisma.videos.create({
      data: {
        title: title,
        url: `/videos/${uniqueFileName}`,
        course_id: + courseId,
        updated_at: new Date(),
        created_at: new Date(),
        description: description,
        display_order: + displayOrder,
      },
    });
    console.log("hello3");
    return NextResponse.json({
      success: true,
      name: uniqueFileName,
    });
    

  // try {
    
  // } catch (error) {
  //   console.error("Error uploading file:", error);
  //   return NextResponse.json({
  //     success: false,
  //     message: "Failed to upload file",
  //   });
  // }
};
