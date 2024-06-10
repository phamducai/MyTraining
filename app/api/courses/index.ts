import { NextApiRequest, NextApiResponse } from 'next';
import { getCourses, createCourse } from '../../../api/courses';
import { CreateCourseDto } from '../../../dto/course.dto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const courses = await getCourses();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  } else if (req.method === 'POST') {
    try {
      const createCourseDto: CreateCourseDto = req.body;
      const course = await createCourse(createCourseDto);
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create course' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
