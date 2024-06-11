"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "flowbite-react";
import { SidebarAdmin } from "@/component/SideBarAdmin";
import HeaderAdmin from "@/component/HeaderAdmin";

interface Course {
  id: number;
  title: string;
  description: string | null;
  imgSrc: string | null;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/courses");
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchData();
  }, []);
  console.log(courses);
  return (
    <div className="h-screen overflow-y-hidden">
      <HeaderAdmin />
      <div className="pt-16">
        <div className="flex h-screen overflow-y-auto sticky top-16">
          <SidebarAdmin />
          <div className="overflow-x-auto table-w-80 mx-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Tên Khóa Học</Table.HeadCell>
                <Table.HeadCell>Tổng video</Table.HeadCell>
                <Table.HeadCell>Người Tạo</Table.HeadCell>
                <Table.HeadCell>Ngày Cập Nhật</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
              {courses?.map((course) => (
                  <Table.Row
                    key={course.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {course.title}
                    </Table.Cell>
                    <Table.Cell>{course.title}</Table.Cell>
                    <Table.Cell>{course.imgSrc}</Table.Cell>
                    <Table.Cell>{course.imgSrc}</Table.Cell>
                    <Table.Cell>
                      <a
                        href={`/courses/edit/${course.id}`}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        Edit
                      </a>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
