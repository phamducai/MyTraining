import { CourseDto } from "@/dto/course.dto";
import prisma from '@/utils/prisma';

const getCoursesByCategory = async (): Promise<CourseDto[]> => {
    const courses:CourseDto[] = await prisma.courses.findMany();
    return courses
  }
  
  export default getCoursesByCategory