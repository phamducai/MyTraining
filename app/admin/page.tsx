import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { SidebarAdmin } from "@/component/SideBarAdmin";
import HeaderAdmin from "@/component/HeaderAdmin";
import { format } from "date-fns";
import prisma from "@/utils/prisma";

export default async function Courses() {
  const courses = await prisma.courses.findMany({
    orderBy: [
      { display_order: 'asc' },
      { updated_at: 'desc' }
    ]
  });

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
                <Table.HeadCell>Thứ tự hiện thị</Table.HeadCell>
                <Table.HeadCell>Ngày Cập Nhật</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {courses.map((course) => (
                  <Table.Row
                    key={course.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {course.title}
                    </Table.Cell>
                    <Table.Cell>{course.total_videos}</Table.Cell>
                    <Table.Cell>{course.display_order}</Table.Cell>
                    <Table.Cell>
                      {course.updated_at
                        ? format(new Date(course.updated_at), "dd/MM/yyyy")
                        : ""}
                    </Table.Cell>
                    <Table.Cell>
                      <a
                        href={`/courses/${course.id}`}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
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
