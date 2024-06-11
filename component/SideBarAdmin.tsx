"use client";

import { Sidebar } from "flowbite-react";
export function SidebarAdmin() {
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Collapse label="Quản Lý Khóa Học" className='font-bold'>
            <Sidebar.Item>
              Thêm Khóa Học
            </Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Collapse label="Quản Lý Video" className='font-bold'>
            <Sidebar.Item>
              Thêm Video
            </Sidebar.Item>
          </Sidebar.Collapse>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
