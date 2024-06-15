"use client";

import { Sidebar } from "flowbite-react";
import { useRouter } from "next/navigation";

export function SidebarAdmin() {
  const router = useRouter();

  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Collapse label="Quản Lý Khóa Học" className='font-bold'  onClick={() => router.push("/courses")}>
            <Sidebar.Item onClick={() => router.push("/courses/create")}>
              Thêm Khóa Học
            </Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Collapse label="Quản Lý Video" className='font-bold' onClick={() => router.push("/videos")}> 
            <Sidebar.Item  onClick={() => router.push("/videos/create")}>
              Thêm Video
            </Sidebar.Item>
          </Sidebar.Collapse>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
