"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "flowbite-react";
import { SidebarAdmin } from "@/component/SideBarAdmin";
import HeaderAdmin from "@/component/HeaderAdmin";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { ListVideoDto } from "@/dto/course.dto";


export default function Courses() {
  const [videos, setVideos] = useState<ListVideoDto[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/videos");
        setVideos(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchData();
  }, []);
  const handleEdit = (id: number) => {
    router.push(`/courses/${id}`);
  };
  console.log(videos);
  return (
    <div className="h-screen overflow-y-hidden">
      <HeaderAdmin />
      <div className="pt-16">
        <div className="flex h-screen overflow-y-auto sticky top-16">
          <SidebarAdmin />
          <div className="overflow-x-auto table-w-80 mx-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Tên Video</Table.HeadCell>
                <Table.HeadCell>Tổng video</Table.HeadCell>
                <Table.HeadCell>Thứ tự hiện thị</Table.HeadCell>
                <Table.HeadCell>Ngày Cập Nhật</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {videos?.map((videos) => (
                  <Table.Row
                    key={videos.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {videos.title}
                    </Table.Cell>
                    <Table.Cell>{videos.display_order}</Table.Cell>
                    <Table.Cell>{videos.display_order}</Table.Cell>
                    <Table.Cell>
                      {" "}
                      {videos.updated_at
                        ? format(new Date(videos.updated_at), "dd/MM/yyyy")
                        : ""}
                    </Table.Cell>
                    <Table.Cell>
                      <a
                          onClick={() => handleEdit(videos.id)}
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"                      >
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
